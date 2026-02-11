import {
  SelectCombobox_default
} from "./chunks/chunk-BA7FE3CF.js";
import {
  ActionButton_default,
  FilterButton_default,
  HistoryManualDatePicker_default,
  HistorySummary_default
} from "./chunks/chunk-GVEQUIU7.js";
import {
  handleComboboxKeyDown
} from "./chunks/chunk-6HMZLOGF.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  Spinner_default,
  useOutsideClick
} from "./chunks/chunk-YSYVIEZS.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-T2VTIR7R.js";
import {
  classNames
} from "./chunks/chunk-LKHWXI2V.js";
import {
  formatAmountWithCurrency,
  formatExpenseDateParts,
  parseExpenseDate,
  safeText,
  startOfDay,
  toIsoDate
} from "./chunks/chunk-MXXP6OB3.js";
import {
  VisitasPageProviders_default
} from "./chunks/chunk-HGSHEZXJ.js";
import {
  ApiFetchError,
  canAccess,
  fetchJson,
  indT,
  showPermissionModal
} from "./chunks/chunk-V2CDSLX2.js";
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
var import_react9 = __toESM(require_react());

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
      { value: 0, text: indT("ExpenseSheets_Filter_Status_Unbilled", "No Pagado") },
      { value: 1, text: indT("ExpenseSheets_Filter_Status_Billed", "Pagado") },
      { value: 2, text: indT("ExpenseSheets_Filter_Status_Both", "Ambos") }
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

// Web/wwwroot/react/src/pages/gastos/components/ExpenseCurrencyFilterSelect.tsx
var import_react2 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/constants/currencyCodes.ts
var expenseCurrencyCodes = [
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "AOA",
  "ARS",
  "AUD",
  "AWG",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BOV",
  "BRL",
  "BSD",
  "BTN",
  "BWP",
  "BYN",
  "BZD",
  "CAD",
  "CDF",
  "CHE",
  "CHF",
  "CHW",
  "CLF",
  "CLP",
  "CNY",
  "COP",
  "COU",
  "CRC",
  "CUC",
  "CUP",
  "CVE",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ERN",
  "ETB",
  "EUR",
  "FJD",
  "FKP",
  "GBP",
  "GEL",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "IQD",
  "IRR",
  "ISK",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "KMF",
  "KPW",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "LYD",
  "MAD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRU",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MXV",
  "MYR",
  "MZN",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLE",
  "SOS",
  "SRD",
  "SSP",
  "STN",
  "SVC",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "USD",
  "USN",
  "UYI",
  "UYU",
  "UZS",
  "VED",
  "VEF",
  "VND",
  "VUV",
  "WST",
  "XAF",
  "XCD",
  "XCG",
  "XDR",
  "XOF",
  "XPF",
  "XSU",
  "XUA",
  "YER",
  "ZAR",
  "ZMW",
  "ZWL"
];
var expenseCurrencyOptions = expenseCurrencyCodes.map((code) => ({ value: code, text: code }));

// Web/wwwroot/react/src/pages/gastos/components/ExpenseCurrencyFilterSelect.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ExpenseCurrencyFilterSelect = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  showLabel = true
}) => {
  const readOnlyMode = readOnly || disabled;
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";
  const [query, setQuery] = (0, import_react2.useState)(value || "");
  const [open, setOpen] = (0, import_react2.useState)(false);
  const [activeIndex, setActiveIndex] = (0, import_react2.useState)(0);
  const containerRef = (0, import_react2.useRef)(null);
  const boxRef = (0, import_react2.useRef)(null);
  const listRef = (0, import_react2.useRef)(null);
  useOutsideClick([containerRef, listRef], () => setOpen(false));
  (0, import_react2.useEffect)(() => {
    setQuery(value || "");
  }, [value]);
  const filtered = (0, import_react2.useMemo)(() => {
    const term = query.trim().toUpperCase();
    if (!term) return expenseCurrencyOptions;
    return expenseCurrencyOptions.filter((option) => option.value.includes(term));
  }, [query]);
  (0, import_react2.useEffect)(() => {
    setActiveIndex(0);
  }, [filtered.length, query]);
  const selectOption = (currencyCode) => {
    const nextValue = String(currencyCode || "").trim().toUpperCase();
    setQuery(nextValue);
    onChange(nextValue);
    setOpen(false);
  };
  const listId = "expense-currency-filter-options";
  const activeId = open && filtered[activeIndex] ? `expense-currency-filter-opt-${filtered[activeIndex].value}` : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", ref: containerRef, children: [
    showLabel ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "form-label font-semibold", style: { color: "#00296be0" }, children: label }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "div",
        {
          ref: boxRef,
          className: classNames(
            "relative w-full rounded-xl bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm",
            readOnlyMode ? "ind-readonly-field" : ""
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "input",
              {
                className: classNames(
                  "w-full rounded-xl border px-3 py-2 pr-10 text-sm sm:text-base leading-5 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed",
                  "border-slate-200 focus:ring-primary focus:border-primary",
                  readOnlyMode ? "ind-readonly-field" : "text-slate-900"
                ),
                style: { color: valueColor },
                value: query,
                onChange: (event) => {
                  const nextValue = event.target.value.toUpperCase();
                  setQuery(nextValue);
                  const trimmed = nextValue.trim();
                  if (!trimmed) {
                    onChange("");
                    setOpen(false);
                    return;
                  }
                  const exact = expenseCurrencyOptions.find((option) => option.value === trimmed);
                  if (exact) {
                    onChange(exact.value);
                  } else {
                    onChange(trimmed);
                  }
                  setOpen(true);
                },
                onFocus: () => {
                  if (!readOnlyMode) {
                    setOpen(true);
                  }
                },
                onKeyDown: (event) => handleComboboxKeyDown(event, {
                  isOpen: open,
                  setOpen,
                  optionCount: filtered.length,
                  setActiveIndex,
                  onEnterWhenOpen: () => selectOption(filtered[activeIndex]?.value || filtered[0]?.value || ""),
                  onEnterWhenClosed: () => setOpen(filtered.length > 0),
                  openOnArrow: true
                }),
                placeholder,
                readOnly,
                disabled,
                "aria-label": label,
                role: "combobox",
                "aria-expanded": open,
                "aria-controls": listId,
                "aria-activedescendant": activeId
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "absolute inset-y-0 right-0 flex items-center gap-1 pr-2", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                className: "flex items-center p-1.5 text-slate-500 hover:text-slate-600",
                onClick: () => {
                  if (readOnlyMode) return;
                  setOpen((previous) => !previous);
                },
                "aria-label": open ? indT("Dropdown_HideOptions", "Hide options") : indT("Dropdown_ShowOptions", "Show options"),
                disabled: readOnlyMode,
                children: open ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ChevronUpSvg, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ChevronDownSvg, { className: "h-5 w-5" })
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        FloatingList_default,
        {
          anchorRef: boxRef,
          open,
          zIndex: 36e4,
          maxHeightClass: "max-h-72",
          role: "listbox",
          roundedClass: "rounded-xl",
          panelClassName: "visitas-typography",
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { id: listId, ref: listRef, children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_NoData", "No data") }) : filtered.map((option, index) => {
            const isActive = index === activeIndex;
            return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                id: `expense-currency-filter-opt-${option.value}`,
                role: "option",
                "aria-selected": isActive,
                className: classNames(
                  "relative flex w-full cursor-default select-none items-center py-2 px-3 text-left text-sm",
                  isActive ? "bg-primary text-white" : "text-slate-900"
                ),
                onMouseEnter: () => setActiveIndex(index),
                onClick: () => selectOption(option.value),
                children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-medium", children: option.text })
              },
              option.value
            );
          }) })
        }
      )
    ] })
  ] });
};
var ExpenseCurrencyFilterSelect_default = ExpenseCurrencyFilterSelect;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseDateRangeFilter.tsx
var import_react3 = __toESM(require_react());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var pad = (n) => n.toString().padStart(2, "0");
var toIso = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
var parseIso = (value) => {
  if (!value) return null;
  const trimmed = String(value).trim();
  if (!trimmed) return null;
  const datePart = trimmed.split("T")[0].split(" ")[0];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(datePart)) return null;
  const [year, month, day] = datePart.split("-").map(Number);
  return new Date(year, month - 1, day);
};
var focusSection = (container, section) => {
  if (!container) return;
  const target = container.querySelector(`[data-section="${section}"]`);
  if (!target) return;
  window.requestAnimationFrame(() => target.focus());
};
var sameDay = (a, b) => !!(a && b && a.getTime() === b.getTime());
var isBefore = (a, b) => !!(a && b && a.getTime() < b.getTime());
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
var formatDisplay = (date, locale) => {
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
var getUiLocale = () => {
  const fromHtml = typeof document !== "undefined" ? document.documentElement.lang : "";
  return fromHtml && String(fromHtml).trim() ? fromHtml : "es-ES";
};
var buildDayCells = (cells, startDate, endDate, hoverDate, selectingStep) => {
  const previewEnd = endDate || (selectingStep === "end" ? hoverDate : null);
  return cells.map((cell, index) => {
    if (cell.isEmpty || !cell.date) {
      return { key: `empty-${index}`, isEmpty: true };
    }
    const dateObj = cell.date;
    const isStart = sameDay(dateObj, startDate);
    const isEnd = sameDay(dateObj, endDate);
    const inRange = startDate && previewEnd && isBefore(startDate, dateObj) && isBefore(dateObj, previewEnd);
    const hoverRange = startDate && !endDate && hoverDate && isBefore(startDate, dateObj) && isBefore(dateObj, hoverDate);
    const disabled = selectingStep === "end" && !!startDate && isBefore(dateObj, startDate);
    const isToday = sameDay(dateObj, /* @__PURE__ */ new Date());
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
var ExpenseDateRangeFilter = ({
  fromDate,
  toDate,
  onChange,
  autoOpenRequestId = 0,
  showManualError = false,
  showStartError = false,
  showEndError = false
}) => {
  const locale = (0, import_react3.useMemo)(() => getUiLocale(), []);
  const activatorRef = (0, import_react3.useRef)(null);
  const popoverRef = (0, import_react3.useRef)(null);
  const [startDate, setStartDate] = (0, import_react3.useState)(() => parseIso(fromDate));
  const [endDate, setEndDate] = (0, import_react3.useState)(() => parseIso(toDate));
  const [hoverDate, setHoverDate] = (0, import_react3.useState)(null);
  const [selectingStep, setSelectingStep] = (0, import_react3.useState)("start");
  const [isOpen, setIsOpen] = (0, import_react3.useState)(false);
  const now = (0, import_react3.useMemo)(() => /* @__PURE__ */ new Date(), []);
  const [currentMonth, setCurrentMonth] = (0, import_react3.useState)((parseIso(fromDate) || now).getMonth());
  const [currentYear, setCurrentYear] = (0, import_react3.useState)((parseIso(fromDate) || now).getFullYear());
  (0, import_react3.useEffect)(() => {
    setStartDate(parseIso(fromDate));
  }, [fromDate]);
  (0, import_react3.useEffect)(() => {
    setEndDate(parseIso(toDate));
  }, [toDate]);
  (0, import_react3.useEffect)(() => {
    onChange(startDate ? toIso(startDate) : "", endDate ? toIso(endDate) : "");
  }, [startDate, endDate, onChange]);
  (0, import_react3.useEffect)(() => {
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
  const openPopover = (0, import_react3.useCallback)(
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
  (0, import_react3.useEffect)(() => {
    if (autoOpenRequestId <= 0) return;
    setSelectingStep("start");
    setIsOpen(true);
    setHoverDate(null);
    const base = startDate || endDate || now;
    setCurrentMonth(base.getMonth());
    setCurrentYear(base.getFullYear());
  }, [autoOpenRequestId]);
  const onActivatorKeyDown = (0, import_react3.useCallback)(
    (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openPopover("start");
    },
    [openPopover]
  );
  const onSectionKeyDown = (0, import_react3.useCallback)(
    (event, section) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openPopover(section);
    },
    [openPopover]
  );
  const onClear = (0, import_react3.useCallback)((event) => {
    event.preventDefault();
    event.stopPropagation();
    setStartDate(null);
    setEndDate(null);
    setHoverDate(null);
    setSelectingStep("start");
  }, []);
  const onPrevMonth = (0, import_react3.useCallback)((event) => {
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
  const onNextMonth = (0, import_react3.useCallback)((event) => {
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
  const onDayClick = (0, import_react3.useCallback)(
    (day) => {
      if (!day.date || day.disabled) return;
      const nextDate = new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate());
      if (!startDate || selectingStep === "start") {
        setStartDate(nextDate);
        if (endDate && isBefore(endDate, nextDate)) {
          setEndDate(null);
        }
        setSelectingStep("end");
        setCurrentMonth(nextDate.getMonth());
        setCurrentYear(nextDate.getFullYear());
        focusSection(activatorRef.current, "end");
        return;
      }
      if (selectingStep === "end") {
        if (isBefore(nextDate, startDate)) {
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
  const onDayHover = (0, import_react3.useCallback)(
    (day) => {
      if (!day.date || selectingStep !== "end" || !startDate) return;
      setHoverDate(new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate()));
    },
    [selectingStep, startDate]
  );
  const onGridMouseLeave = (0, import_react3.useCallback)(() => {
    setHoverDate(null);
  }, []);
  const calendar = (0, import_react3.useMemo)(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const offset = (firstDay.getDay() + 6) % 7;
    const cells = [];
    for (let index = 0; index < offset; index += 1) {
      cells.push({ date: null, iso: "", isEmpty: true });
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const dateObj = new Date(currentYear, currentMonth, day);
      cells.push({ date: dateObj, iso: toIso(dateObj), isEmpty: false });
    }
    return {
      monthLabel: formatMonthLabel(firstDay, locale),
      cells
    };
  }, [currentMonth, currentYear, locale]);
  const dayCells = (0, import_react3.useMemo)(
    () => buildDayCells(calendar.cells, startDate, endDate, hoverDate, selectingStep),
    [calendar.cells, endDate, hoverDate, selectingStep, startDate]
  );
  const labelFrom = toSentenceCase(indT("History_From", "From"), locale);
  const labelTo = toSentenceCase(indT("History_To", "To"), locale);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
      startDateText: startDate ? formatDisplay(startDate, locale) : indT("History_AddDate", "Add date"),
      endDateText: endDate ? formatDisplay(endDate, locale) : indT("History_AddDate", "Add date"),
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
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var ExpenseFilterActions = ({
  clearLabel,
  applyLabel,
  onClear,
  onApply
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mt-1 grid grid-cols-2 gap-2 history-filter-actions", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ActionButton_default, { label: clearLabel, className: "w-full", onClick: onClear }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ActionButton_default, { label: applyLabel, className: "w-full", onClick: onApply })
  ] });
};
var ExpenseFilterActions_default = ExpenseFilterActions;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseProjectFilterInput.tsx
var import_react5 = __toESM(require_react());

// Web/wwwroot/react/src/components/commons/RemoteSearchCombobox.tsx
var import_react4 = __toESM(require_react());
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var uniqueByValue = (items) => {
  const map = /* @__PURE__ */ new Map();
  for (const item of items || []) {
    const key = String(item.value || "").trim();
    if (!key) continue;
    if (map.has(key)) continue;
    map.set(key, {
      value: key,
      title: String(item.title || "").trim(),
      subtitle: String(item.subtitle || "").trim()
    });
  }
  return Array.from(map.values());
};
var RemoteSearchCombobox = ({
  label,
  placeholder,
  value,
  onChange,
  onSearch,
  idBase,
  minSearchLength = 2,
  disabled = false,
  readOnly = false,
  showLabel = true,
  panelClassName = "visitas-typography"
}) => {
  const readOnlyMode = readOnly || disabled;
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";
  const [query, setQuery] = (0, import_react4.useState)(value || "");
  const [options, setOptions] = (0, import_react4.useState)([]);
  const [open, setOpen] = (0, import_react4.useState)(false);
  const [loading, setLoading] = (0, import_react4.useState)(false);
  const [activeIndex, setActiveIndex] = (0, import_react4.useState)(0);
  const [lastSearchedTerm, setLastSearchedTerm] = (0, import_react4.useState)("");
  const abortRef = (0, import_react4.useRef)(null);
  const containerRef = (0, import_react4.useRef)(null);
  const boxRef = (0, import_react4.useRef)(null);
  const listRef = (0, import_react4.useRef)(null);
  useOutsideClick([containerRef, listRef], () => setOpen(false));
  (0, import_react4.useEffect)(() => {
    setQuery(value || "");
  }, [value]);
  (0, import_react4.useEffect)(() => {
    return () => {
      abortRef.current?.abort();
      abortRef.current = null;
    };
  }, []);
  const filtered = (0, import_react4.useMemo)(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter((option) => {
      const valueText = option.value.toLowerCase();
      const titleText = String(option.title || "").toLowerCase();
      const subtitleText = String(option.subtitle || "").toLowerCase();
      return valueText.includes(q) || titleText.includes(q) || subtitleText.includes(q);
    });
  }, [options, query]);
  (0, import_react4.useEffect)(() => {
    setActiveIndex(0);
  }, [filtered.length, query]);
  const runSearch = (0, import_react4.useCallback)(async () => {
    if (readOnlyMode || loading) return;
    const term = query.trim();
    const termKey = term.toLowerCase();
    if (term.length < minSearchLength) {
      setOptions([]);
      setOpen(false);
      setLastSearchedTerm("");
      return;
    }
    if (termKey === lastSearchedTerm && options.length > 0) {
      setOpen(true);
      return;
    }
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    try {
      const response = await onSearch(term, controller.signal);
      const next = uniqueByValue(response || []);
      setOptions(next);
      setLastSearchedTerm(termKey);
      setOpen(true);
    } catch {
      setOptions([]);
      setLastSearchedTerm(termKey);
      setOpen(true);
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
      }
      setLoading(false);
    }
  }, [lastSearchedTerm, loading, minSearchLength, onSearch, options.length, query, readOnlyMode]);
  const selectOption = (option) => {
    const nextValue = String(option.value || "").trim();
    setQuery(nextValue);
    onChange(nextValue);
    setLastSearchedTerm(nextValue.toLowerCase());
    setOpen(false);
  };
  const queryKey = query.trim().toLowerCase();
  const showSearchIcon = !readOnlyMode && !loading && queryKey.length >= minSearchLength && queryKey !== lastSearchedTerm;
  const listId = `${idBase}-options`;
  const activeId = open && filtered[activeIndex] ? `${idBase}-opt-${filtered[activeIndex].value}` : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-2", ref: containerRef, children: [
    showLabel ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("label", { className: "form-label font-semibold", style: { color: "#00296be0" }, children: label }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
        "div",
        {
          ref: boxRef,
          className: classNames(
            "relative w-full rounded-xl bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm",
            readOnlyMode ? "ind-readonly-field" : ""
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "input",
              {
                className: classNames(
                  "w-full rounded-xl border px-3 py-2 pr-20 text-sm sm:text-base leading-5 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed",
                  "border-slate-200 focus:ring-primary focus:border-primary",
                  readOnlyMode ? "ind-readonly-field" : "text-slate-900"
                ),
                style: { color: valueColor },
                value: query,
                onChange: (event) => {
                  const nextValue = event.target.value;
                  setQuery(nextValue);
                  onChange(nextValue);
                  if (nextValue.trim().toLowerCase() !== lastSearchedTerm) {
                    setOpen(false);
                  }
                },
                onFocus: () => {
                  if (!readOnlyMode && filtered.length > 0) {
                    setOpen(true);
                  }
                },
                onKeyDown: (event) => handleComboboxKeyDown(event, {
                  isOpen: open,
                  setOpen,
                  optionCount: filtered.length,
                  setActiveIndex,
                  onEnterWhenOpen: () => {
                    if (filtered.length > 0) {
                      selectOption(filtered[activeIndex] ?? filtered[0]);
                      return;
                    }
                    void runSearch();
                  },
                  onEnterWhenClosed: () => {
                    void runSearch();
                  },
                  openOnArrow: true
                }),
                placeholder,
                readOnly,
                disabled,
                "aria-label": label,
                role: "combobox",
                "aria-expanded": open,
                "aria-controls": listId,
                "aria-activedescendant": activeId
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "absolute inset-y-0 right-0 flex items-center gap-1 pr-2", children: [
              loading ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "flex items-center px-1.5", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Spinner_default, { size: "h-4 w-4" }) }) : null,
              showSearchIcon ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "button",
                {
                  type: "button",
                  className: "flex items-center p-1.5 text-slate-400 hover:text-slate-500",
                  onClick: () => {
                    void runSearch();
                  },
                  "aria-label": indT("Common_Search", "Search"),
                  disabled: readOnlyMode,
                  children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "h-5 w-5", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) })
                }
              ) : null,
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "button",
                {
                  type: "button",
                  className: "flex items-center p-1.5 text-slate-500 hover:text-slate-600",
                  onClick: () => {
                    if (readOnlyMode) return;
                    if (open) {
                      setOpen(false);
                      return;
                    }
                    if (filtered.length > 0) {
                      setOpen(true);
                    }
                  },
                  "aria-label": open ? indT("Dropdown_HideOptions", "Hide options") : indT("Dropdown_ShowOptions", "Show options"),
                  disabled: readOnlyMode,
                  children: open ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ChevronUpSvg, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ChevronDownSvg, { className: "h-5 w-5" })
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        FloatingList_default,
        {
          anchorRef: boxRef,
          open,
          zIndex: 36e4,
          maxHeightClass: "max-h-72",
          role: "listbox",
          roundedClass: "rounded-xl",
          panelClassName,
          children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { id: listId, ref: listRef, children: loading ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_Loading", "Loading") }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_NoData", "No data") }) : filtered.map((option, index) => {
            const isActive = index === activeIndex;
            const optionId = option.value || `${index}`;
            return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "button",
              {
                type: "button",
                id: `${idBase}-opt-${optionId}`,
                role: "option",
                "aria-selected": isActive,
                className: classNames(
                  "relative flex w-full cursor-default select-none items-start py-2 px-3 text-left text-sm",
                  isActive ? "bg-primary text-white" : "text-slate-900"
                ),
                onMouseEnter: () => setActiveIndex(index),
                onClick: () => selectOption(option),
                children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "flex flex-col", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "font-medium", children: option.title || option.value }),
                  option.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: classNames("text-xs", isActive ? "text-white/90" : "text-slate-500"), children: option.subtitle }) : null
                ] })
              },
              optionId
            );
          }) })
        }
      )
    ] })
  ] });
};
var RemoteSearchCombobox_default = RemoteSearchCombobox;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseProjectFilterInput.tsx
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var SEARCH_PAGE_SIZE = 20;
var ExpenseProjectFilterInput = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  showLabel = true
}) => {
  const loadOptions = (0, import_react5.useCallback)(async (term, signal) => {
    const url = `/Gastos/GetProjectsForDropdown?term=${encodeURIComponent(term)}&page=1&pageSize=${SEARCH_PAGE_SIZE}`;
    const response = await fetchJson(url, {
      signal,
      suppressPermissionModal: true
    });
    return (Array.isArray(response?.items) ? response.items : []).map((item) => {
      const valueText = String(item?.value || "").trim();
      if (!valueText) return null;
      const subtitle = String(item?.text || "").trim();
      return {
        value: valueText,
        title: valueText,
        subtitle: subtitle || "-"
      };
    }).filter(Boolean);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    RemoteSearchCombobox_default,
    {
      label,
      placeholder,
      value,
      onChange,
      onSearch: loadOptions,
      idBase: "expense-project-filter",
      minSearchLength: 2,
      disabled,
      readOnly,
      showLabel,
      panelClassName: "visitas-typography"
    }
  );
};
var ExpenseProjectFilterInput_default = ExpenseProjectFilterInput;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseSheetFilterInput.tsx
var import_react6 = __toESM(require_react());

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
var buildExpenseSheetSuggestPayload = (term, pageSize = DEFAULT_SUGGEST_PAGE_SIZE) => {
  const safeTerm = String(term || "").trim();
  const nextPageSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : DEFAULT_SUGGEST_PAGE_SIZE;
  return {
    filter: safeTerm,
    billedMode: 2,
    fromDate: "",
    toDate: "",
    projectId: "",
    hojaGastosId: "",
    currencyCode: "",
    page: 1,
    pageSize: nextPageSize
  };
};

// Web/wwwroot/react/src/pages/gastos/components/ExpenseSheetFilterInput.tsx
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var SEARCH_PAGE_SIZE2 = 50;
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
  const loadOptions = (0, import_react6.useCallback)(async (term, signal) => {
    const payload = buildExpenseSheetSuggestPayload(term, SEARCH_PAGE_SIZE2);
    const response = await fetchJson("/Gastos/ListExpenseSheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      suppressPermissionModal: true,
      signal
    });
    return (Array.isArray(response?.items) ? response.items : []).map((item) => {
      const id = String(item?.hojaGastosId || "").trim();
      if (!id) return null;
      return {
        value: id,
        title: id,
        subtitle: String(item?.description || "").trim() || "-"
      };
    }).filter(Boolean);
  }, []);
  if (!enableRemoteSuggestions || readOnlyMode) {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "space-y-2", children: [
      showLabel ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("label", { className: "form-label font-semibold", style: { color: "#00296be0" }, children: label }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
      idBase: "expense-sheet-filter",
      minSearchLength: 2,
      disabled,
      readOnly,
      showLabel,
      panelClassName: "visitas-typography"
    }
  );
};
var ExpenseSheetFilterInput_default = ExpenseSheetFilterInput;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseFiltersPanel.tsx
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
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
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "filter-card filter-card--expanded p-2 sm:p-2.5 relative", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "history-filter-stack flex flex-col space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "grid grid-cols-2 gap-2 history-quick-filters", "aria-label": indT("History_Filter_Date", "Date"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        FilterButton_default,
        {
          label: indT("History_Quick_Custom", "Date"),
          active: activeQuickFilter === "custom",
          className: "w-full",
          onClick: () => onQuickFilterChange("custom")
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        FilterButton_default,
        {
          label: indT("History_Quick_7Days", "7 days"),
          active: activeQuickFilter === "days-7",
          className: "w-full",
          onClick: () => onQuickFilterChange("days-7")
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        FilterButton_default,
        {
          label: indT("History_Quick_30Days", "30 days"),
          active: activeQuickFilter === "days-30",
          className: "w-full",
          onClick: () => onQuickFilterChange("days-30")
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        FilterButton_default,
        {
          label: indT("History_Quick_90Days", "90 days"),
          active: activeQuickFilter === "days-90",
          className: "w-full",
          onClick: () => onQuickFilterChange("days-90")
        }
      )
    ] }),
    showManualDateFilter ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
    ) : showInlineDateSummary ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      HistorySummary_default,
      {
        summaryFromLabel: indT("History_From", "From"),
        summaryToLabel: indT("History_To", "To"),
        fromValue: formatDate(fromDate, locale),
        toValue: formatDate(toDate, locale),
        className: "gap-y-1 text-[11px] px-1"
      }
    ) : null,
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        ExpenseProjectFilterInput_default,
        {
          label: indT("ExpenseSheets_Filter_Project", "Project"),
          placeholder: indT("ExpenseSheets_Filter_Project", "Project"),
          value: projectId,
          onChange: onProjectIdChange,
          showLabel: false
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        ExpenseCurrencyFilterSelect_default,
        {
          label: indT("ExpenseSheets_Filter_Currency", "Currency"),
          placeholder: indT("ExpenseSheets_Filter_Currency", "Currency"),
          value: currencyCode,
          onChange: onCurrencyCodeChange,
          showLabel: false
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
var import_react7 = __toESM(require_react());
var useExpenseSheetsListData = ({ hasAccess, pageSize, onForbidden }) => {
  const [items, setItems] = (0, import_react7.useState)([]);
  const [total, setTotal] = (0, import_react7.useState)(0);
  const [currentPage, setCurrentPage] = (0, import_react7.useState)(1);
  const [isLoading, setIsLoading] = (0, import_react7.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react7.useState)("");
  const loadList = (0, import_react7.useCallback)(
    async (page, filters) => {
      if (!hasAccess) {
        onForbidden();
        return;
      }
      setIsLoading(true);
      setErrorMessage("");
      const payload = buildExpenseListPayload(filters, page, pageSize);
      try {
        const response = await fetchJson("/Gastos/ListExpenseSheets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
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
  const resetList = (0, import_react7.useCallback)(() => {
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
var import_react8 = __toESM(require_react());
var useExpenseSheetsFiltersState = ({ onApplyFilters, onClearFilters }) => {
  const [fromDate, setFromDate] = (0, import_react8.useState)("");
  const [toDate, setToDate] = (0, import_react8.useState)("");
  const [projectId, setProjectId] = (0, import_react8.useState)("");
  const [hojaGastosId, setHojaGastosId] = (0, import_react8.useState)("");
  const [currencyCode, setCurrencyCode] = (0, import_react8.useState)("");
  const [billedMode, setBilledMode] = (0, import_react8.useState)(2);
  const [activeQuickFilter, setActiveQuickFilter] = (0, import_react8.useState)(null);
  const [showManualDateFilter, setShowManualDateFilter] = (0, import_react8.useState)(false);
  const [showManualDateError, setShowManualDateError] = (0, import_react8.useState)(false);
  const [manualDateAutoOpenKey, setManualDateAutoOpenKey] = (0, import_react8.useState)(0);
  const [appliedFilters, setAppliedFilters] = (0, import_react8.useState)(null);
  const [showFilters, setShowFilters] = (0, import_react8.useState)(true);
  const currentFilters = (0, import_react8.useMemo)(
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
  const onApply = (0, import_react8.useCallback)(() => {
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
  const onClear = (0, import_react8.useCallback)(() => {
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
  const onDateRangeChange = (0, import_react8.useCallback)(
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
  const onQuickFilterChange = (0, import_react8.useCallback)(
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
  const toggleFilterPanel = (0, import_react8.useCallback)(() => {
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
    onDateRangeChange,
    onQuickFilterChange,
    toggleFilterPanel
  };
};

// Web/wwwroot/react/src/pages/gastos/list/ExpenseSheetsPage.tsx
var import_jsx_runtime9 = __toESM(require_jsx_runtime());
var PAGE_SIZE = 6;
var ExpenseSheetsPageContent = () => {
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const timelineContainerRef = import_react9.default.useRef(null);
  const paginationLabels = (0, import_react9.useMemo)(
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
    onDateRangeChange,
    onQuickFilterChange,
    toggleFilterPanel
  } = useExpenseSheetsFiltersState({
    onApplyFilters: (snapshot) => {
      void loadList(1, snapshot);
    },
    onClearFilters: resetList
  });
  const goToDetail = (0, import_react9.useCallback)((sheetId) => {
    if (!sheetId) return;
    const id = encodeURIComponent(sheetId);
    window.location.href = `/Gastos/ExpenseSheetDetail?hojaGastosId=${id}`;
  }, []);
  const resolveClickableCard = (0, import_react9.useCallback)((target) => {
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
  const summaryDate = (0, import_react9.useMemo)(() => {
    if (!appliedFilters) return null;
    const locale = document?.documentElement?.lang || "es-ES";
    const fromDateText = parseExpenseDate(appliedFilters.fromDate)?.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" }).replace(/\./g, "").toLowerCase();
    const toDateText = parseExpenseDate(appliedFilters.toDate)?.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" }).replace(/\./g, "").toLowerCase();
    if (!fromDateText && !toDateText) return null;
    return {
      fromValue: fromDateText || "--",
      toValue: toDateText || "--"
    };
  }, [appliedFilters]);
  const summaryItems = (0, import_react9.useMemo)(() => {
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
  (0, import_react9.useEffect)(() => {
    const onToggleFilters = () => {
      toggleFilterPanel();
    };
    const onRefresh = () => {
      const snapshot = appliedFilters || currentFilters;
      void loadList(currentPage < 1 ? 1 : currentPage, snapshot);
    };
    window.addEventListener("expense-sheets-toggle-filter", onToggleFilters);
    window.addEventListener("expense-sheets-refresh", onRefresh);
    return () => {
      window.removeEventListener("expense-sheets-toggle-filter", onToggleFilters);
      window.removeEventListener("expense-sheets-refresh", onRefresh);
    };
  }, [appliedFilters, currentFilters, currentPage, loadList, toggleFilterPanel]);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "space-y-2", children: [
    showSummary ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "filter-card filter-card--summary p-3 sm:p-4 mt-1 mb-3", children: [
      summaryDate ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        HistorySummary_default,
        {
          summaryFromLabel: indT("History_From", "From"),
          summaryToLabel: indT("History_To", "To"),
          fromValue: summaryDate.fromValue,
          toValue: summaryDate.toValue,
          className: "gap-y-1 text-[11px]"
        }
      ) : null,
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: `flex flex-col items-start gap-y-1 text-xs ${summaryDate ? "mt-1" : ""}`.trim(), children: summaryItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "history-filter-summary leading-5", children: item }, item)) })
    ] }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
      "div",
      {
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: isLoading ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "text-danger", children: errorMessage }) : null,
    !isLoading && !errorMessage && items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "timeline-box timeline-empty", "data-empty-text": indT("Common_NoData", "No data") }) : null,
    !errorMessage && items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { ref: timelineContainerRef, className: "timeline-box", children: items.map((item, index) => {
      const id = safeText(item.hojaGastosId);
      const dateParts = formatExpenseDateParts(item.createdDate || item.transDate, document?.documentElement?.lang || "es-ES");
      const currency = safeText(item.currencyCode);
      const description = safeText(item.description);
      const voucher = safeText(item.voucher);
      const totalAmountText = formatAmountWithCurrency(item.totalAmountMST ?? null, currency);
      const isBilled = voucher !== "";
      const statusLabel = isBilled ? indT("ExpenseSheets_Filter_Status_Billed", "Pagado") : indT("ExpenseSheets_Filter_Status_Unbilled", "No Pagado");
      const statusClass = isBilled ? "expense-sheet-card__status expense-sheet-card__status--billed" : "expense-sheet-card__status expense-sheet-card__status--unbilled";
      return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "timeline-item", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
        "div",
        {
          className: "timeline-card timeline-card--clickable",
          role: "button",
          tabIndex: 0,
          onClick: () => goToDetail(id),
          onKeyDown: (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              goToDetail(id);
            }
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "timeline-date-panel flex flex-col items-center justify-center gap-1 px-3 py-3 bg-slate-50 border-r border-slate-200 text-slate-600", children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "text-xs font-semibold tracking-[0.2em] text-slate-500", children: dateParts.year }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500", children: dateParts.month }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "text-2xl font-semibold text-primary", children: dateParts.day })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "timeline-card__content flex-1 py-3 px-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: statusClass, title: statusLabel, "aria-label": statusLabel }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "expense-sheet-card__title timeline-name", "data-fulltext": description || "-", children: description || "-" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "expense-sheet-card__amount", "data-fulltext": totalAmountText, children: totalAmountText })
            ] })
          ]
        }
      ) }, `${id}-${index}`);
    }) }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
    )
  ] });
};
var ExpenseSheetsPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(VisitasPageProviders_default, { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ExpenseSheetsPageContent, {}) });
};
var mount = () => {
  const rootEl = document.getElementById("expense-sheets-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ExpenseSheetsPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseSheetsPage_default = ExpenseSheetsPage;
export {
  ExpenseSheetsPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saXN0L0V4cGVuc2VTaGVldHNQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZUJpbGxlZE1vZGVGaWx0ZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2N1cnJlbmN5Q29kZXMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VEYXRlUmFuZ2VGaWx0ZXIudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlRmlsdGVyQWN0aW9ucy50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvUmVtb3RlU2VhcmNoQ29tYm9ib3gudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlU2hlZXRGaWx0ZXJJbnB1dC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlUGF5bG9hZEJ1aWxkZXJzLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlRmlsdGVyc1BhbmVsLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpc3QvdXNlRXhwZW5zZVNoZWV0c0xpc3REYXRhLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGlzdC91c2VFeHBlbnNlU2hlZXRzRmlsdGVyc1N0YXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XG5pbXBvcnQgRXhwZW5zZUZpbHRlcnNQYW5lbCBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlRmlsdGVyc1BhbmVsLnRzeFwiO1xuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XG5pbXBvcnQgSGlzdG9yeVN1bW1hcnkgZnJvbSBcIi4uLy4uL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlTdW1tYXJ5LnRzeFwiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURhdGVQYXJ0cywgcGFyc2VFeHBlbnNlRGF0ZSwgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldHNMaXN0RGF0YSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldHNMaXN0RGF0YS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldHNGaWx0ZXJzU3RhdGUudHNcIjtcblxuY29uc3QgUEFHRV9TSVpFID0gNjtcblxuY29uc3QgRXhwZW5zZVNoZWV0c1BhZ2VDb250ZW50ID0gKCkgPT4ge1xuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIlZpZXdcIik7XG4gIGNvbnN0IHRpbWVsaW5lQ29udGFpbmVyUmVmID0gUmVhY3QudXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxuICAgIH0pLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgeyBpdGVtcywgdG90YWwsIGN1cnJlbnRQYWdlLCBpc0xvYWRpbmcsIGVycm9yTWVzc2FnZSwgbG9hZExpc3QsIHJlc2V0TGlzdCB9ID0gdXNlRXhwZW5zZVNoZWV0c0xpc3REYXRhKHtcbiAgICBoYXNBY2Nlc3MsXG4gICAgcGFnZVNpemU6IFBBR0VfU0laRSxcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcbiAgfSk7XG5cbiAgY29uc3Qge1xuICAgIGZyb21EYXRlLFxuICAgIHRvRGF0ZSxcbiAgICBwcm9qZWN0SWQsXG4gICAgaG9qYUdhc3Rvc0lkLFxuICAgIGN1cnJlbmN5Q29kZSxcbiAgICBiaWxsZWRNb2RlLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxuICAgIGFwcGxpZWRGaWx0ZXJzLFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIGN1cnJlbnRGaWx0ZXJzLFxuICAgIHNldFByb2plY3RJZCxcbiAgICBzZXRIb2phR2FzdG9zSWQsXG4gICAgc2V0Q3VycmVuY3lDb2RlLFxuICAgIHNldEJpbGxlZE1vZGUsXG4gICAgb25BcHBseSxcbiAgICBvbkNsZWFyLFxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlLFxuICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXG4gICAgdG9nZ2xlRmlsdGVyUGFuZWwsXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyc1N0YXRlKHtcbiAgICBvbkFwcGx5RmlsdGVyczogKHNuYXBzaG90KSA9PiB7XG4gICAgICB2b2lkIGxvYWRMaXN0KDEsIHNuYXBzaG90KTtcbiAgICB9LFxuICAgIG9uQ2xlYXJGaWx0ZXJzOiByZXNldExpc3QsXG4gIH0pO1xuXG4gIGNvbnN0IGdvVG9EZXRhaWwgPSB1c2VDYWxsYmFjaygoc2hlZXRJZDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKCFzaGVldElkKSByZXR1cm47XG4gICAgY29uc3QgaWQgPSBlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCk7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7aWR9YDtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xuICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCF0aW1lbGluZUNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNhcmQ7XG4gIH0sIFtdKTtcblxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcbiAgICBjb250YWluZXJSZWY6IHRpbWVsaW5lQ29udGFpbmVyUmVmLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBpdGVtcyxcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcbiAgfSk7XG5cbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCgodG90YWwgfHwgMCkgLyBQQUdFX1NJWkUpO1xuXG4gIGNvbnN0IHN1bW1hcnlEYXRlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKCFhcHBsaWVkRmlsdGVycykgcmV0dXJuIG51bGwgYXMgeyBmcm9tVmFsdWU6IHN0cmluZzsgdG9WYWx1ZTogc3RyaW5nIH0gfCBudWxsO1xuXG4gICAgY29uc3QgbG9jYWxlID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCI7XG4gICAgY29uc3QgZnJvbURhdGVUZXh0ID0gcGFyc2VFeHBlbnNlRGF0ZShhcHBsaWVkRmlsdGVycy5mcm9tRGF0ZSlcbiAgICAgID8udG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBkYXk6IFwibnVtZXJpY1wiLCBtb250aDogXCJzaG9ydFwiLCB5ZWFyOiBcIm51bWVyaWNcIiB9KVxuICAgICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxuICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgdG9EYXRlVGV4dCA9IHBhcnNlRXhwZW5zZURhdGUoYXBwbGllZEZpbHRlcnMudG9EYXRlKVxuICAgICAgPy50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IGRheTogXCJudW1lcmljXCIsIG1vbnRoOiBcInNob3J0XCIsIHllYXI6IFwibnVtZXJpY1wiIH0pXG4gICAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXG4gICAgICAudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmICghZnJvbURhdGVUZXh0ICYmICF0b0RhdGVUZXh0KSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4ge1xuICAgICAgZnJvbVZhbHVlOiBmcm9tRGF0ZVRleHQgfHwgXCItLVwiLFxuICAgICAgdG9WYWx1ZTogdG9EYXRlVGV4dCB8fCBcIi0tXCIsXG4gICAgfTtcbiAgfSwgW2FwcGxpZWRGaWx0ZXJzXSk7XG5cbiAgY29uc3Qgc3VtbWFyeUl0ZW1zID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKCFhcHBsaWVkRmlsdGVycykgcmV0dXJuIFtdIGFzIHN0cmluZ1tdO1xuXG4gICAgY29uc3Qgc3VtbWFyeTogc3RyaW5nW10gPSBbXTtcbiAgICBpZiAoYXBwbGllZEZpbHRlcnMucHJvamVjdElkLnRyaW0oKSkge1xuICAgICAgc3VtbWFyeS5wdXNoKGAke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX06ICR7YXBwbGllZEZpbHRlcnMucHJvamVjdElkLnRyaW0oKX1gKTtcbiAgICB9XG4gICAgaWYgKGFwcGxpZWRGaWx0ZXJzLmhvamFHYXN0b3NJZC50cmltKCkpIHtcbiAgICAgIHN1bW1hcnkucHVzaChgJHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU2hlZXRcIiwgXCJFeHBlbnNlIHNoZWV0XCIpfTogJHthcHBsaWVkRmlsdGVycy5ob2phR2FzdG9zSWQudHJpbSgpfWApO1xuICAgIH1cbiAgICBpZiAoYXBwbGllZEZpbHRlcnMuY3VycmVuY3lDb2RlLnRyaW0oKSkge1xuICAgICAgc3VtbWFyeS5wdXNoKGAke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfTogJHthcHBsaWVkRmlsdGVycy5jdXJyZW5jeUNvZGUudHJpbSgpfWApO1xuICAgIH1cbiAgICBzdW1tYXJ5LnB1c2goXG4gICAgICBgJHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzXCIsIFwiRXN0YWRvXCIpfTogJHtcbiAgICAgICAgYXBwbGllZEZpbHRlcnMuYmlsbGVkTW9kZSA9PT0gMVxuICAgICAgICAgID8gaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1N0YXR1c19CaWxsZWRcIiwgXCJQYWdhZG9cIilcbiAgICAgICAgICA6IGFwcGxpZWRGaWx0ZXJzLmJpbGxlZE1vZGUgPT09IDJcbiAgICAgICAgICAgID8gaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1N0YXR1c19Cb3RoXCIsIFwiQW1ib3NcIilcbiAgICAgICAgICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1N0YXR1c19VbmJpbGxlZFwiLCBcIk5vIFBhZ2Fkb1wiKVxuICAgICAgfWBcbiAgICApO1xuXG4gICAgcmV0dXJuIHN1bW1hcnk7XG4gIH0sIFthcHBsaWVkRmlsdGVyc10pO1xuXG4gIGNvbnN0IHNob3dTdW1tYXJ5ID0gIXNob3dGaWx0ZXJzICYmICghIXN1bW1hcnlEYXRlIHx8IHN1bW1hcnlJdGVtcy5sZW5ndGggPiAwKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG9uVG9nZ2xlRmlsdGVycyA9ICgpID0+IHtcbiAgICAgIHRvZ2dsZUZpbHRlclBhbmVsKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uUmVmcmVzaCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnMgfHwgY3VycmVudEZpbHRlcnM7XG4gICAgICB2b2lkIGxvYWRMaXN0KGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSwgc25hcHNob3QpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImV4cGVuc2Utc2hlZXRzLXRvZ2dsZS1maWx0ZXJcIiwgb25Ub2dnbGVGaWx0ZXJzKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImV4cGVuc2Utc2hlZXRzLXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImV4cGVuc2Utc2hlZXRzLXRvZ2dsZS1maWx0ZXJcIiwgb25Ub2dnbGVGaWx0ZXJzKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXhwZW5zZS1zaGVldHMtcmVmcmVzaFwiLCBvblJlZnJlc2gpO1xuICAgIH07XG4gIH0sIFthcHBsaWVkRmlsdGVycywgY3VycmVudEZpbHRlcnMsIGN1cnJlbnRQYWdlLCBsb2FkTGlzdCwgdG9nZ2xlRmlsdGVyUGFuZWxdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICB7c2hvd1N1bW1hcnkgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLXN1bW1hcnkgcC0zIHNtOnAtNCBtdC0xIG1iLTNcIj5cbiAgICAgICAgICB7c3VtbWFyeURhdGUgPyAoXG4gICAgICAgICAgICA8SGlzdG9yeVN1bW1hcnlcbiAgICAgICAgICAgICAgc3VtbWFyeUZyb21MYWJlbD17aW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIil9XG4gICAgICAgICAgICAgIHN1bW1hcnlUb0xhYmVsPXtpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpfVxuICAgICAgICAgICAgICBmcm9tVmFsdWU9e3N1bW1hcnlEYXRlLmZyb21WYWx1ZX1cbiAgICAgICAgICAgICAgdG9WYWx1ZT17c3VtbWFyeURhdGUudG9WYWx1ZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ2FwLXktMSB0ZXh0LVsxMXB4XVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBmbGV4LWNvbCBpdGVtcy1zdGFydCBnYXAteS0xIHRleHQteHMgJHtzdW1tYXJ5RGF0ZSA/IFwibXQtMVwiIDogXCJcIn1gLnRyaW0oKX0+XG4gICAgICAgICAgICB7c3VtbWFyeUl0ZW1zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17aXRlbX0gY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeSBsZWFkaW5nLTVcIj5cbiAgICAgICAgICAgICAgICB7aXRlbX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgPEV4cGVuc2VGaWx0ZXJzUGFuZWxcbiAgICAgICAgdmlzaWJsZT17c2hvd0ZpbHRlcnN9XG4gICAgICAgIHNob3dNYW51YWxEYXRlRmlsdGVyPXtzaG93TWFudWFsRGF0ZUZpbHRlcn1cbiAgICAgICAgc2hvd01hbnVhbERhdGVFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvcn1cbiAgICAgICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5PXttYW51YWxEYXRlQXV0b09wZW5LZXl9XG4gICAgICAgIGZyb21EYXRlPXtmcm9tRGF0ZX1cbiAgICAgICAgdG9EYXRlPXt0b0RhdGV9XG4gICAgICAgIHByb2plY3RJZD17cHJvamVjdElkfVxuICAgICAgICBob2phR2FzdG9zSWQ9e2hvamFHYXN0b3NJZH1cbiAgICAgICAgY3VycmVuY3lDb2RlPXtjdXJyZW5jeUNvZGV9XG4gICAgICAgIGJpbGxlZE1vZGU9e2JpbGxlZE1vZGV9XG4gICAgICAgIGFjdGl2ZVF1aWNrRmlsdGVyPXthY3RpdmVRdWlja0ZpbHRlcn1cbiAgICAgICAgb25EYXRlUmFuZ2VDaGFuZ2U9e29uRGF0ZVJhbmdlQ2hhbmdlfVxuICAgICAgICBvblF1aWNrRmlsdGVyQ2hhbmdlPXtvblF1aWNrRmlsdGVyQ2hhbmdlfVxuICAgICAgICBvblByb2plY3RJZENoYW5nZT17c2V0UHJvamVjdElkfVxuICAgICAgICBvbkhvamFHYXN0b3NJZENoYW5nZT17c2V0SG9qYUdhc3Rvc0lkfVxuICAgICAgICBvbkN1cnJlbmN5Q29kZUNoYW5nZT17c2V0Q3VycmVuY3lDb2RlfVxuICAgICAgICBvbkJpbGxlZE1vZGVDaGFuZ2U9e3NldEJpbGxlZE1vZGV9XG4gICAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XG4gICAgICAgIG9uQXBwbHk9e29uQXBwbHl9XG4gICAgICAvPlxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cbiAgICAgID5cbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cbiAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtlcnJvck1lc3NhZ2UgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxuXG4gICAgICB7IWlzTG9hZGluZyAmJiAhZXJyb3JNZXNzYWdlICYmIGl0ZW1zLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2luZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKX0gLz5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7IWVycm9yTWVzc2FnZSAmJiBpdGVtcy5sZW5ndGggPiAwID8gKFxuICAgICAgICA8ZGl2IHJlZj17dGltZWxpbmVDb250YWluZXJSZWZ9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveFwiPlxuICAgICAgICAgIHtpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IHNhZmVUZXh0KGl0ZW0uaG9qYUdhc3Rvc0lkKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVQYXJ0cyA9IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMoaXRlbS5jcmVhdGVkRGF0ZSB8fCBpdGVtLnRyYW5zRGF0ZSwgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCIpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVuY3kgPSBzYWZlVGV4dChpdGVtLmN1cnJlbmN5Q29kZSk7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHNhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgY29uc3Qgdm91Y2hlciA9IHNhZmVUZXh0KGl0ZW0udm91Y2hlcik7XG4gICAgICAgICAgICBjb25zdCB0b3RhbEFtb3VudFRleHQgPSBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koaXRlbS50b3RhbEFtb3VudE1TVCA/PyBudWxsLCBjdXJyZW5jeSk7XG4gICAgICAgICAgICBjb25zdCBpc0JpbGxlZCA9IHZvdWNoZXIgIT09IFwiXCI7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNMYWJlbCA9IGlzQmlsbGVkXG4gICAgICAgICAgICAgID8gaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1N0YXR1c19CaWxsZWRcIiwgXCJQYWdhZG9cIilcbiAgICAgICAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzX1VuYmlsbGVkXCIsIFwiTm8gUGFnYWRvXCIpO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzQ2xhc3MgPSBpc0JpbGxlZFxuICAgICAgICAgICAgICA/IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMgZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMtLWJpbGxlZFwiXG4gICAgICAgICAgICAgIDogXCJleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cyBleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cy0tdW5iaWxsZWRcIjtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2Ake2lkfS0ke2luZGV4fWB9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0aW1lbGluZS1jYXJkIHRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiXG4gICAgICAgICAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZ29Ub0RldGFpbChpZCl9XG4gICAgICAgICAgICAgICAgICBvbktleURvd249eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIgfHwgZXZlbnQua2V5ID09PSBcIiBcIikge1xuICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgZ29Ub0RldGFpbChpZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1kYXRlLXBhbmVsIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIHB4LTMgcHktMyBiZy1zbGF0ZS01MCBib3JkZXItciBib3JkZXItc2xhdGUtMjAwIHRleHQtc2xhdGUtNjAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRyYWNraW5nLVswLjJlbV0gdGV4dC1zbGF0ZS01MDBcIj57ZGF0ZVBhcnRzLnllYXJ9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHVwcGVyY2FzZSB0cmFja2luZy1bMC4yZW1dIHRleHQtc2xhdGUtNTAwXCI+e2RhdGVQYXJ0cy5tb250aH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LXNlbWlib2xkIHRleHQtcHJpbWFyeVwiPntkYXRlUGFydHMuZGF5fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWNhcmRfX2NvbnRlbnQgZmxleC0xIHB5LTMgcHgtNFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0YXR1c0NsYXNzfSB0aXRsZT17c3RhdHVzTGFiZWx9IGFyaWEtbGFiZWw9e3N0YXR1c0xhYmVsfSAvPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJleHBlbnNlLXNoZWV0LWNhcmRfX3RpdGxlIHRpbWVsaW5lLW5hbWVcIiBkYXRhLWZ1bGx0ZXh0PXtkZXNjcmlwdGlvbiB8fCBcIi1cIn0+XG4gICAgICAgICAgICAgICAgICAgICAge2Rlc2NyaXB0aW9uIHx8IFwiLVwifVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImV4cGVuc2Utc2hlZXQtY2FyZF9fYW1vdW50XCIgZGF0YS1mdWxsdGV4dD17dG90YWxBbW91bnRUZXh0fT5cbiAgICAgICAgICAgICAgICAgICAgICB7dG90YWxBbW91bnRUZXh0fVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICA8Q29tcGFjdFBhZ2luYXRpb25cbiAgICAgICAgdG90YWxQYWdlcz17dG90YWxQYWdlc31cbiAgICAgICAgY3VycmVudFBhZ2U9e2N1cnJlbnRQYWdlfVxuICAgICAgICBvblBhZ2VDaGFuZ2U9eyhwYWdlKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc25hcHNob3QgPSBhcHBsaWVkRmlsdGVycyB8fCBjdXJyZW50RmlsdGVycztcbiAgICAgICAgICB2b2lkIGxvYWRMaXN0KHBhZ2UsIHNuYXBzaG90KTtcbiAgICAgICAgfX1cbiAgICAgICAgbGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgZXhwZW5zZSBzaGVldHMgbGlzdC5cbmNvbnN0IEV4cGVuc2VTaGVldHNQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgICAgIDxFeHBlbnNlU2hlZXRzUGFnZUNvbnRlbnQgLz5cbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICApO1xufTtcblxuY29uc3QgbW91bnQgPSAoKSA9PiB7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS1zaGVldHMtcm9vdFwiKTtcbiAgaWYgKCFyb290RWwpIHJldHVybjtcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxFeHBlbnNlU2hlZXRzUGFnZSAvPik7XG59O1xuXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0c1BhZ2U7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbnR5cGUgRXhwZW5zZUJpbGxlZE1vZGVGaWx0ZXJTZWxlY3RQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmFsdWU6IG51bWJlcjtcbiAgb25DaGFuZ2U6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbn07XG5cbi8vIFNoYXJlZCBiaWxsZWQgbW9kZSBmaWx0ZXIgZm9yIGV4cGVuc2Ugc2hlZXQgbGlzdCByZXF1ZXN0cy5cbmNvbnN0IEV4cGVuc2VCaWxsZWRNb2RlRmlsdGVyU2VsZWN0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG59OiBFeHBlbnNlQmlsbGVkTW9kZUZpbHRlclNlbGVjdFByb3BzKSA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSB1c2VNZW1vKFxuICAgICgpID0+IFtcbiAgICAgIHsgdmFsdWU6IDAsIHRleHQ6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNfVW5iaWxsZWRcIiwgXCJObyBQYWdhZG9cIikgfSxcbiAgICAgIHsgdmFsdWU6IDEsIHRleHQ6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNfQmlsbGVkXCIsIFwiUGFnYWRvXCIpIH0sXG4gICAgICB7IHZhbHVlOiAyLCB0ZXh0OiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzX0JvdGhcIiwgXCJBbWJvc1wiKSB9LFxuICAgIF0sXG4gICAgW11cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IE51bWJlcihuZXh0VmFsdWUpO1xuICAgICAgICBpZiAocGFyc2VkID09PSAwIHx8IHBhcnNlZCA9PT0gMSB8fCBwYXJzZWQgPT09IDIpIHtcbiAgICAgICAgICBvbkNoYW5nZShwYXJzZWQpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBvbkNoYW5nZSgyKTtcbiAgICAgIH19XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICBpZEJhc2U9XCJleHBlbnNlLWJpbGxlZC1tb2RlXCJcbiAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUJpbGxlZE1vZGVGaWx0ZXJTZWxlY3Q7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEZsb2F0aW5nTGlzdCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nTGlzdC50c3hcIjtcbmltcG9ydCB7IENoZXZyb25Eb3duU3ZnLCBDaGV2cm9uVXBTdmcgfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL2NoZXZyb25zLnRzeFwiO1xuaW1wb3J0IHsgaGFuZGxlQ29tYm9ib3hLZXlEb3duIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNvbWJvYm94S2V5Ym9hcmQudHNcIjtcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBleHBlbnNlQ3VycmVuY3lPcHRpb25zIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9jdXJyZW5jeUNvZGVzLnRzXCI7XG5cbnR5cGUgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG59O1xuXG4vLyBTaGFyZWQgZml4ZWQgY3VycmVuY3kgY29tYm9ib3ggd2l0aCBsb2NhbCBpbnN0YW50IHNlYXJjaCBmb3IgZXhwZW5zZSBmaWx0ZXJzLlxuY29uc3QgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG59OiBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RQcm9wcykgPT4ge1xuICBjb25zdCByZWFkT25seU1vZGUgPSByZWFkT25seSB8fCBkaXNhYmxlZDtcbiAgY29uc3QgdmFsdWVDb2xvciA9IHJlYWRPbmx5TW9kZSA/IFwiIzY0NzQ4YlwiIDogXCIjMDAyOTZiZTBcIjtcbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSB1c2VTdGF0ZSh2YWx1ZSB8fCBcIlwiKTtcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYWN0aXZlSW5kZXgsIHNldEFjdGl2ZUluZGV4XSA9IHVzZVN0YXRlKDApO1xuXG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBib3hSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgbGlzdFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIHVzZU91dHNpZGVDbGljayhbY29udGFpbmVyUmVmLCBsaXN0UmVmXSwgKCkgPT4gc2V0T3BlbihmYWxzZSkpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0UXVlcnkodmFsdWUgfHwgXCJcIik7XG4gIH0sIFt2YWx1ZV0pO1xuXG4gIGNvbnN0IGZpbHRlcmVkID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgdGVybSA9IHF1ZXJ5LnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xuICAgIGlmICghdGVybSkgcmV0dXJuIGV4cGVuc2VDdXJyZW5jeU9wdGlvbnM7XG4gICAgcmV0dXJuIGV4cGVuc2VDdXJyZW5jeU9wdGlvbnMuZmlsdGVyKChvcHRpb24pID0+IG9wdGlvbi52YWx1ZS5pbmNsdWRlcyh0ZXJtKSk7XG4gIH0sIFtxdWVyeV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0QWN0aXZlSW5kZXgoMCk7XG4gIH0sIFtmaWx0ZXJlZC5sZW5ndGgsIHF1ZXJ5XSk7XG5cbiAgY29uc3Qgc2VsZWN0T3B0aW9uID0gKGN1cnJlbmN5Q29kZTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgbmV4dFZhbHVlID0gU3RyaW5nKGN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcbiAgICBzZXRRdWVyeShuZXh0VmFsdWUpO1xuICAgIG9uQ2hhbmdlKG5leHRWYWx1ZSk7XG4gICAgc2V0T3BlbihmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgbGlzdElkID0gXCJleHBlbnNlLWN1cnJlbmN5LWZpbHRlci1vcHRpb25zXCI7XG4gIGNvbnN0IGFjdGl2ZUlkID0gb3BlbiAmJiBmaWx0ZXJlZFthY3RpdmVJbmRleF1cbiAgICA/IGBleHBlbnNlLWN1cnJlbmN5LWZpbHRlci1vcHQtJHtmaWx0ZXJlZFthY3RpdmVJbmRleF0udmFsdWV9YFxuICAgIDogdW5kZWZpbmVkO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIiByZWY9e2NvbnRhaW5lclJlZn0+XG4gICAgICB7c2hvd0xhYmVsID8gKFxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgc3R5bGU9e3sgY29sb3I6IFwiIzAwMjk2YmUwXCIgfX0+XG4gICAgICAgICAge2xhYmVsfVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgKSA6IG51bGx9XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e2JveFJlZn1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICBcInJlbGF0aXZlIHctZnVsbCByb3VuZGVkLXhsIGJnLXdoaXRlIHRleHQtbGVmdCBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctMiBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLW9mZnNldC13aGl0ZSBzbTp0ZXh0LXNtXCIsXG4gICAgICAgICAgICByZWFkT25seU1vZGUgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIlxuICAgICAgICAgICl9XG4gICAgICAgID5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgXCJ3LWZ1bGwgcm91bmRlZC14bCBib3JkZXIgcHgtMyBweS0yIHByLTEwIHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZGlzYWJsZWQ6Ymctc2xhdGUtMTAwIGRpc2FibGVkOnRleHQtc2xhdGUtNTAwIGRpc2FibGVkOmJvcmRlci1zbGF0ZS0yMDAgZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkXCIsXG4gICAgICAgICAgICAgIFwiYm9yZGVyLXNsYXRlLTIwMCBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIixcbiAgICAgICAgICAgICAgcmVhZE9ubHlNb2RlID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiB2YWx1ZUNvbG9yIH19XG4gICAgICAgICAgICB2YWx1ZT17cXVlcnl9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG5leHRWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICBzZXRRdWVyeShuZXh0VmFsdWUpO1xuXG4gICAgICAgICAgICAgIGNvbnN0IHRyaW1tZWQgPSBuZXh0VmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgICBpZiAoIXRyaW1tZWQpIHtcbiAgICAgICAgICAgICAgICBvbkNoYW5nZShcIlwiKTtcbiAgICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCBleGFjdCA9IGV4cGVuc2VDdXJyZW5jeU9wdGlvbnMuZmluZCgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUgPT09IHRyaW1tZWQpO1xuICAgICAgICAgICAgICBpZiAoZXhhY3QpIHtcbiAgICAgICAgICAgICAgICBvbkNoYW5nZShleGFjdC52YWx1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb25DaGFuZ2UodHJpbW1lZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkZvY3VzPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghcmVhZE9ubHlNb2RlKSB7XG4gICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17KGV2ZW50KSA9PlxuICAgICAgICAgICAgICBoYW5kbGVDb21ib2JveEtleURvd24oZXZlbnQsIHtcbiAgICAgICAgICAgICAgICBpc09wZW46IG9wZW4sXG4gICAgICAgICAgICAgICAgc2V0T3BlbixcbiAgICAgICAgICAgICAgICBvcHRpb25Db3VudDogZmlsdGVyZWQubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHNldEFjdGl2ZUluZGV4LFxuICAgICAgICAgICAgICAgIG9uRW50ZXJXaGVuT3BlbjogKCkgPT4gc2VsZWN0T3B0aW9uKGZpbHRlcmVkW2FjdGl2ZUluZGV4XT8udmFsdWUgfHwgZmlsdGVyZWRbMF0/LnZhbHVlIHx8IFwiXCIpLFxuICAgICAgICAgICAgICAgIG9uRW50ZXJXaGVuQ2xvc2VkOiAoKSA9PiBzZXRPcGVuKGZpbHRlcmVkLmxlbmd0aCA+IDApLFxuICAgICAgICAgICAgICAgIG9wZW5PbkFycm93OiB0cnVlLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XG4gICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cbiAgICAgICAgICAgIGFyaWEtY29udHJvbHM9e2xpc3RJZH1cbiAgICAgICAgICAgIGFyaWEtYWN0aXZlZGVzY2VuZGFudD17YWN0aXZlSWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHByLTJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtNjAwXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZWFkT25seU1vZGUpIHJldHVybjtcbiAgICAgICAgICAgICAgICBzZXRPcGVuKChwcmV2aW91cykgPT4gIXByZXZpb3VzKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17b3BlbiA/IGluZFQoXCJEcm9wZG93bl9IaWRlT3B0aW9uc1wiLCBcIkhpZGUgb3B0aW9uc1wiKSA6IGluZFQoXCJEcm9wZG93bl9TaG93T3B0aW9uc1wiLCBcIlNob3cgb3B0aW9uc1wiKX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e3JlYWRPbmx5TW9kZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge29wZW4gPyA8Q2hldnJvblVwU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPiA6IDxDaGV2cm9uRG93blN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxGbG9hdGluZ0xpc3RcbiAgICAgICAgICBhbmNob3JSZWY9e2JveFJlZn1cbiAgICAgICAgICBvcGVuPXtvcGVufVxuICAgICAgICAgIHpJbmRleD17MzYwMDAwfVxuICAgICAgICAgIG1heEhlaWdodENsYXNzPVwibWF4LWgtNzJcIlxuICAgICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgICAgICAgICByb3VuZGVkQ2xhc3M9XCJyb3VuZGVkLXhsXCJcbiAgICAgICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGlkPXtsaXN0SWR9IHJlZj17bGlzdFJlZn0+XG4gICAgICAgICAgICB7ZmlsdGVyZWQubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+e2luZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKX08L2Rpdj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIGZpbHRlcmVkLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaW5kZXggPT09IGFjdGl2ZUluZGV4O1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBrZXk9e29wdGlvbi52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BleHBlbnNlLWN1cnJlbmN5LWZpbHRlci1vcHQtJHtvcHRpb24udmFsdWV9YH1cbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e2lzQWN0aXZlfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICAgXCJyZWxhdGl2ZSBmbGV4IHctZnVsbCBjdXJzb3ItZGVmYXVsdCBzZWxlY3Qtbm9uZSBpdGVtcy1jZW50ZXIgcHktMiBweC0zIHRleHQtbGVmdCB0ZXh0LXNtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwiXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0QWN0aXZlSW5kZXgoaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RPcHRpb24ob3B0aW9uLnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tZWRpdW1cIj57b3B0aW9uLnRleHR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvRmxvYXRpbmdMaXN0PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3Q7XG5cclxuIiwgIlx1RkVGRi8vIEZpeGVkIElTTy1saWtlIGN1cnJlbmN5IGNvZGUgbGlzdCBmb3IgRXhwZW5zZSBTaGVldHMgZmlsdGVycy5cclxuLy8gU291cmNlOiBodHRwczovL3d3dy5pYmFuLmNvbS9jdXJyZW5jeS1jb2RlcyAocmV0cmlldmVkIDIwMjYtMDItMTApLlxyXG5leHBvcnQgY29uc3QgZXhwZW5zZUN1cnJlbmN5Q29kZXM6IHN0cmluZ1tdID0gW1xyXG4gIFwiQUVEXCIsXHJcbiAgXCJBRk5cIixcclxuICBcIkFMTFwiLFxyXG4gIFwiQU1EXCIsXHJcbiAgXCJBT0FcIixcclxuICBcIkFSU1wiLFxyXG4gIFwiQVVEXCIsXHJcbiAgXCJBV0dcIixcclxuICBcIkFaTlwiLFxyXG4gIFwiQkFNXCIsXHJcbiAgXCJCQkRcIixcclxuICBcIkJEVFwiLFxyXG4gIFwiQkhEXCIsXHJcbiAgXCJCSUZcIixcclxuICBcIkJNRFwiLFxyXG4gIFwiQk5EXCIsXHJcbiAgXCJCT0JcIixcclxuICBcIkJPVlwiLFxyXG4gIFwiQlJMXCIsXHJcbiAgXCJCU0RcIixcclxuICBcIkJUTlwiLFxyXG4gIFwiQldQXCIsXHJcbiAgXCJCWU5cIixcclxuICBcIkJaRFwiLFxyXG4gIFwiQ0FEXCIsXHJcbiAgXCJDREZcIixcclxuICBcIkNIRVwiLFxyXG4gIFwiQ0hGXCIsXHJcbiAgXCJDSFdcIixcclxuICBcIkNMRlwiLFxyXG4gIFwiQ0xQXCIsXHJcbiAgXCJDTllcIixcclxuICBcIkNPUFwiLFxyXG4gIFwiQ09VXCIsXHJcbiAgXCJDUkNcIixcclxuICBcIkNVQ1wiLFxyXG4gIFwiQ1VQXCIsXHJcbiAgXCJDVkVcIixcclxuICBcIkNaS1wiLFxyXG4gIFwiREpGXCIsXHJcbiAgXCJES0tcIixcclxuICBcIkRPUFwiLFxyXG4gIFwiRFpEXCIsXHJcbiAgXCJFR1BcIixcclxuICBcIkVSTlwiLFxyXG4gIFwiRVRCXCIsXHJcbiAgXCJFVVJcIixcclxuICBcIkZKRFwiLFxyXG4gIFwiRktQXCIsXHJcbiAgXCJHQlBcIixcclxuICBcIkdFTFwiLFxyXG4gIFwiR0hTXCIsXHJcbiAgXCJHSVBcIixcclxuICBcIkdNRFwiLFxyXG4gIFwiR05GXCIsXHJcbiAgXCJHVFFcIixcclxuICBcIkdZRFwiLFxyXG4gIFwiSEtEXCIsXHJcbiAgXCJITkxcIixcclxuICBcIkhUR1wiLFxyXG4gIFwiSFVGXCIsXHJcbiAgXCJJRFJcIixcclxuICBcIklMU1wiLFxyXG4gIFwiSU5SXCIsXHJcbiAgXCJJUURcIixcclxuICBcIklSUlwiLFxyXG4gIFwiSVNLXCIsXHJcbiAgXCJKTURcIixcclxuICBcIkpPRFwiLFxyXG4gIFwiSlBZXCIsXHJcbiAgXCJLRVNcIixcclxuICBcIktHU1wiLFxyXG4gIFwiS0hSXCIsXHJcbiAgXCJLTUZcIixcclxuICBcIktQV1wiLFxyXG4gIFwiS1JXXCIsXHJcbiAgXCJLV0RcIixcclxuICBcIktZRFwiLFxyXG4gIFwiS1pUXCIsXHJcbiAgXCJMQUtcIixcclxuICBcIkxCUFwiLFxyXG4gIFwiTEtSXCIsXHJcbiAgXCJMUkRcIixcclxuICBcIkxTTFwiLFxyXG4gIFwiTFlEXCIsXHJcbiAgXCJNQURcIixcclxuICBcIk1ETFwiLFxyXG4gIFwiTUdBXCIsXHJcbiAgXCJNS0RcIixcclxuICBcIk1NS1wiLFxyXG4gIFwiTU5UXCIsXHJcbiAgXCJNT1BcIixcclxuICBcIk1SVVwiLFxyXG4gIFwiTVVSXCIsXHJcbiAgXCJNVlJcIixcclxuICBcIk1XS1wiLFxyXG4gIFwiTVhOXCIsXHJcbiAgXCJNWFZcIixcclxuICBcIk1ZUlwiLFxyXG4gIFwiTVpOXCIsXHJcbiAgXCJOQURcIixcclxuICBcIk5HTlwiLFxyXG4gIFwiTklPXCIsXHJcbiAgXCJOT0tcIixcclxuICBcIk5QUlwiLFxyXG4gIFwiTlpEXCIsXHJcbiAgXCJPTVJcIixcclxuICBcIlBBQlwiLFxyXG4gIFwiUEVOXCIsXHJcbiAgXCJQR0tcIixcclxuICBcIlBIUFwiLFxyXG4gIFwiUEtSXCIsXHJcbiAgXCJQTE5cIixcclxuICBcIlBZR1wiLFxyXG4gIFwiUUFSXCIsXHJcbiAgXCJST05cIixcclxuICBcIlJTRFwiLFxyXG4gIFwiUlVCXCIsXHJcbiAgXCJSV0ZcIixcclxuICBcIlNBUlwiLFxyXG4gIFwiU0JEXCIsXHJcbiAgXCJTQ1JcIixcclxuICBcIlNER1wiLFxyXG4gIFwiU0VLXCIsXHJcbiAgXCJTR0RcIixcclxuICBcIlNIUFwiLFxyXG4gIFwiU0xFXCIsXHJcbiAgXCJTT1NcIixcclxuICBcIlNSRFwiLFxyXG4gIFwiU1NQXCIsXHJcbiAgXCJTVE5cIixcclxuICBcIlNWQ1wiLFxyXG4gIFwiU1lQXCIsXHJcbiAgXCJTWkxcIixcclxuICBcIlRIQlwiLFxyXG4gIFwiVEpTXCIsXHJcbiAgXCJUTVRcIixcclxuICBcIlRORFwiLFxyXG4gIFwiVE9QXCIsXHJcbiAgXCJUUllcIixcclxuICBcIlRURFwiLFxyXG4gIFwiVFdEXCIsXHJcbiAgXCJUWlNcIixcclxuICBcIlVBSFwiLFxyXG4gIFwiVUdYXCIsXHJcbiAgXCJVU0RcIixcclxuICBcIlVTTlwiLFxyXG4gIFwiVVlJXCIsXHJcbiAgXCJVWVVcIixcclxuICBcIlVaU1wiLFxyXG4gIFwiVkVEXCIsXHJcbiAgXCJWRUZcIixcclxuICBcIlZORFwiLFxyXG4gIFwiVlVWXCIsXHJcbiAgXCJXU1RcIixcclxuICBcIlhBRlwiLFxyXG4gIFwiWENEXCIsXHJcbiAgXCJYQ0dcIixcclxuICBcIlhEUlwiLFxyXG4gIFwiWE9GXCIsXHJcbiAgXCJYUEZcIixcclxuICBcIlhTVVwiLFxyXG4gIFwiWFVBXCIsXHJcbiAgXCJZRVJcIixcclxuICBcIlpBUlwiLFxyXG4gIFwiWk1XXCIsXHJcbiAgXCJaV0xcIixcclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCBleHBlbnNlQ3VycmVuY3lPcHRpb25zID0gZXhwZW5zZUN1cnJlbmN5Q29kZXMubWFwKChjb2RlKSA9PiAoeyB2YWx1ZTogY29kZSwgdGV4dDogY29kZSB9KSk7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCBIaXN0b3J5TWFudWFsRGF0ZVBpY2tlciwge1xuICBIaXN0b3J5TWFudWFsRGF5Q2VsbCxcbn0gZnJvbSBcIi4uLy4uL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlNYW51YWxEYXRlUGlja2VyLnRzeFwiO1xuXG50eXBlIEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXJQcm9wcyA9IHtcbiAgZnJvbURhdGU6IHN0cmluZztcbiAgdG9EYXRlOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGF1dG9PcGVuUmVxdWVzdElkPzogbnVtYmVyO1xuICBzaG93TWFudWFsRXJyb3I/OiBib29sZWFuO1xuICBzaG93U3RhcnRFcnJvcj86IGJvb2xlYW47XG4gIHNob3dFbmRFcnJvcj86IGJvb2xlYW47XG59O1xuXG50eXBlIENhbGVuZGFyQ2VsbCA9IHtcbiAgZGF0ZTogRGF0ZSB8IG51bGw7XG4gIGlzbzogc3RyaW5nO1xuICBpc0VtcHR5OiBib29sZWFuO1xufTtcblxuY29uc3QgcGFkID0gKG46IG51bWJlcikgPT4gbi50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcblxuY29uc3QgdG9Jc28gPSAoZGF0ZTogRGF0ZSkgPT4gYCR7ZGF0ZS5nZXRGdWxsWWVhcigpfS0ke3BhZChkYXRlLmdldE1vbnRoKCkgKyAxKX0tJHtwYWQoZGF0ZS5nZXREYXRlKCkpfWA7XG5cbmNvbnN0IHBhcnNlSXNvID0gKHZhbHVlOiBzdHJpbmcpOiBEYXRlIHwgbnVsbCA9PiB7XG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xuICBjb25zdCB0cmltbWVkID0gU3RyaW5nKHZhbHVlKS50cmltKCk7XG4gIGlmICghdHJpbW1lZCkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgZGF0ZVBhcnQgPSB0cmltbWVkLnNwbGl0KFwiVFwiKVswXS5zcGxpdChcIiBcIilbMF07XG4gIGlmICghL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QoZGF0ZVBhcnQpKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSBkYXRlUGFydC5zcGxpdChcIi1cIikubWFwKE51bWJlcik7XG4gIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG59O1xuXG5jb25zdCBmb2N1c1NlY3Rpb24gPSAoY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCB8IG51bGwsIHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHtcbiAgaWYgKCFjb250YWluZXIpIHJldHVybjtcbiAgY29uc3QgdGFyZ2V0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KGBbZGF0YS1zZWN0aW9uPVwiJHtzZWN0aW9ufVwiXWApO1xuICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRhcmdldC5mb2N1cygpKTtcbn07XG5cbmNvbnN0IHNhbWVEYXkgPSAoYTogRGF0ZSB8IG51bGwsIGI6IERhdGUgfCBudWxsKSA9PiAhIShhICYmIGIgJiYgYS5nZXRUaW1lKCkgPT09IGIuZ2V0VGltZSgpKTtcbmNvbnN0IGlzQmVmb3JlID0gKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCkgPT4gISEoYSAmJiBiICYmIGEuZ2V0VGltZSgpIDwgYi5nZXRUaW1lKCkpO1xuXG5jb25zdCB0b1RpdGxlQ2FzZSA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xuICBjb25zdCBsb3dlciA9IHZhbHVlLnRvTG9jYWxlTG93ZXJDYXNlKGxvY2FsZSk7XG4gIHJldHVybiBsb3dlclswXS50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpICsgbG93ZXIuc2xpY2UoMSk7XG59O1xuXG5jb25zdCB0b1NlbnRlbmNlQ2FzZSA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xuICBjb25zdCB0cmltbWVkID0gdmFsdWUudHJpbSgpO1xuICBpZiAoIXRyaW1tZWQpIHJldHVybiB0cmltbWVkO1xuICBjb25zdCBsb3dlciA9IHRyaW1tZWQudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKTtcbiAgcmV0dXJuIGxvd2VyWzBdLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSkgKyBsb3dlci5zbGljZSgxKTtcbn07XG5cbmNvbnN0IGZvcm1hdERpc3BsYXkgPSAoZGF0ZTogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gZGF0ZVxuICAgIC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7XG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxuICAgICAgbW9udGg6IFwic2hvcnRcIixcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgIH0pXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xufTtcblxuY29uc3QgZm9ybWF0TW9udGhMYWJlbCA9IChkYXRlOiBEYXRlLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG1vbnRoTmFtZSA9IGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJsb25nXCIgfSk7XG4gIHJldHVybiBgJHt0b1RpdGxlQ2FzZShtb250aE5hbWUsIGxvY2FsZSl9ICR7ZGF0ZS5nZXRGdWxsWWVhcigpfWA7XG59O1xuXG5jb25zdCBnZXRVaUxvY2FsZSA9ICgpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBmcm9tSHRtbCA9IHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nIDogXCJcIjtcbiAgcmV0dXJuIGZyb21IdG1sICYmIFN0cmluZyhmcm9tSHRtbCkudHJpbSgpID8gZnJvbUh0bWwgOiBcImVzLUVTXCI7XG59O1xuXG5jb25zdCBidWlsZERheUNlbGxzID0gKFxuICBjZWxsczogQ2FsZW5kYXJDZWxsW10sXG4gIHN0YXJ0RGF0ZTogRGF0ZSB8IG51bGwsXG4gIGVuZERhdGU6IERhdGUgfCBudWxsLFxuICBob3ZlckRhdGU6IERhdGUgfCBudWxsLFxuICBzZWxlY3RpbmdTdGVwOiBcInN0YXJ0XCIgfCBcImVuZFwiIHwgXCJkb25lXCJcbik6IEhpc3RvcnlNYW51YWxEYXlDZWxsW10gPT4ge1xuICBjb25zdCBwcmV2aWV3RW5kID0gZW5kRGF0ZSB8fCAoc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiA/IGhvdmVyRGF0ZSA6IG51bGwpO1xuXG4gIHJldHVybiBjZWxscy5tYXAoKGNlbGwsIGluZGV4KSA9PiB7XG4gICAgaWYgKGNlbGwuaXNFbXB0eSB8fCAhY2VsbC5kYXRlKSB7XG4gICAgICByZXR1cm4geyBrZXk6IGBlbXB0eS0ke2luZGV4fWAsIGlzRW1wdHk6IHRydWUgfTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRlT2JqID0gY2VsbC5kYXRlO1xuICAgIGNvbnN0IGlzU3RhcnQgPSBzYW1lRGF5KGRhdGVPYmosIHN0YXJ0RGF0ZSk7XG4gICAgY29uc3QgaXNFbmQgPSBzYW1lRGF5KGRhdGVPYmosIGVuZERhdGUpO1xuICAgIGNvbnN0IGluUmFuZ2UgPSBzdGFydERhdGUgJiYgcHJldmlld0VuZCAmJiBpc0JlZm9yZShzdGFydERhdGUsIGRhdGVPYmopICYmIGlzQmVmb3JlKGRhdGVPYmosIHByZXZpZXdFbmQpO1xuICAgIGNvbnN0IGhvdmVyUmFuZ2UgPSBzdGFydERhdGUgJiYgIWVuZERhdGUgJiYgaG92ZXJEYXRlICYmIGlzQmVmb3JlKHN0YXJ0RGF0ZSwgZGF0ZU9iaikgJiYgaXNCZWZvcmUoZGF0ZU9iaiwgaG92ZXJEYXRlKTtcbiAgICBjb25zdCBkaXNhYmxlZCA9IHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIgJiYgISFzdGFydERhdGUgJiYgaXNCZWZvcmUoZGF0ZU9iaiwgc3RhcnREYXRlKTtcbiAgICBjb25zdCBpc1RvZGF5ID0gc2FtZURheShkYXRlT2JqLCBuZXcgRGF0ZSgpKTtcblxuICAgIHJldHVybiB7XG4gICAgICBrZXk6IGNlbGwuaXNvLFxuICAgICAgaXNFbXB0eTogZmFsc2UsXG4gICAgICBkYXRlOiBkYXRlT2JqLFxuICAgICAgaXNvOiBjZWxsLmlzbyxcbiAgICAgIGRheUxhYmVsOiBkYXRlT2JqLmdldERhdGUoKSxcbiAgICAgIGRheUNsYXNzOiBjbGFzc05hbWVzKFxuICAgICAgICBcImRycC1kYXlcIixcbiAgICAgICAgaXNTdGFydCA/IFwic3RhcnQgcmFuZ2Utc3RhcnRcIiA6IFwiXCIsXG4gICAgICAgIGlzRW5kID8gXCJlbmQgcmFuZ2UtZW5kXCIgOiBcIlwiLFxuICAgICAgICBpblJhbmdlID8gXCJpbi1yYW5nZVwiIDogXCJcIixcbiAgICAgICAgaG92ZXJSYW5nZSA/IFwiaG92ZXItcmFuZ2VcIiA6IFwiXCIsXG4gICAgICAgIGRpc2FibGVkID8gXCJkaXNhYmxlZFwiIDogXCJcIixcbiAgICAgICAgaXNUb2RheSA/IFwidG9kYXlcIiA6IFwiXCJcbiAgICAgICksXG4gICAgICBkaXNhYmxlZCxcbiAgICB9O1xuICB9KTtcbn07XG5cbi8vIFNoYXJlZCBkYXRlIHJhbmdlIHBpY2tlciBmb3IgZXhwZW5zZSBmaWx0ZXJzIGJhc2VkIG9uIHRoZSBoaXN0b3J5IGRhdGUgY29tcG9uZW50LlxuY29uc3QgRXhwZW5zZURhdGVSYW5nZUZpbHRlciA9ICh7XG4gIGZyb21EYXRlLFxuICB0b0RhdGUsXG4gIG9uQ2hhbmdlLFxuICBhdXRvT3BlblJlcXVlc3RJZCA9IDAsXG4gIHNob3dNYW51YWxFcnJvciA9IGZhbHNlLFxuICBzaG93U3RhcnRFcnJvciA9IGZhbHNlLFxuICBzaG93RW5kRXJyb3IgPSBmYWxzZSxcbn06IEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXJQcm9wcykgPT4ge1xuICBjb25zdCBsb2NhbGUgPSB1c2VNZW1vKCgpID0+IGdldFVpTG9jYWxlKCksIFtdKTtcbiAgY29uc3QgYWN0aXZhdG9yUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHBvcG92ZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBbc3RhcnREYXRlLCBzZXRTdGFydERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KCgpID0+IHBhcnNlSXNvKGZyb21EYXRlKSk7XG4gIGNvbnN0IFtlbmREYXRlLCBzZXRFbmREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPigoKSA9PiBwYXJzZUlzbyh0b0RhdGUpKTtcbiAgY29uc3QgW2hvdmVyRGF0ZSwgc2V0SG92ZXJEYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3NlbGVjdGluZ1N0ZXAsIHNldFNlbGVjdGluZ1N0ZXBdID0gdXNlU3RhdGU8XCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiPihcInN0YXJ0XCIpO1xuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IG5vdyA9IHVzZU1lbW8oKCkgPT4gbmV3IERhdGUoKSwgW10pO1xuICBjb25zdCBbY3VycmVudE1vbnRoLCBzZXRDdXJyZW50TW9udGhdID0gdXNlU3RhdGUoKHBhcnNlSXNvKGZyb21EYXRlKSB8fCBub3cpLmdldE1vbnRoKCkpO1xuICBjb25zdCBbY3VycmVudFllYXIsIHNldEN1cnJlbnRZZWFyXSA9IHVzZVN0YXRlKChwYXJzZUlzbyhmcm9tRGF0ZSkgfHwgbm93KS5nZXRGdWxsWWVhcigpKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldFN0YXJ0RGF0ZShwYXJzZUlzbyhmcm9tRGF0ZSkpO1xuICB9LCBbZnJvbURhdGVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldEVuZERhdGUocGFyc2VJc28odG9EYXRlKSk7XG4gIH0sIFt0b0RhdGVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG9uQ2hhbmdlKHN0YXJ0RGF0ZSA/IHRvSXNvKHN0YXJ0RGF0ZSkgOiBcIlwiLCBlbmREYXRlID8gdG9Jc28oZW5kRGF0ZSkgOiBcIlwiKTtcbiAgfSwgW3N0YXJ0RGF0ZSwgZW5kRGF0ZSwgb25DaGFuZ2VdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNPcGVuKSByZXR1cm47XG5cbiAgICBjb25zdCBoYW5kbGVPdXRzaWRlID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgTm9kZSB8IG51bGw7XG4gICAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuICAgICAgaWYgKHBvcG92ZXJSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSkgcmV0dXJuO1xuICAgICAgaWYgKGFjdGl2YXRvclJlZi5jdXJyZW50Py5jb250YWlucyh0YXJnZXQpKSByZXR1cm47XG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGUpO1xuICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGUpO1xuICB9LCBbaXNPcGVuXSk7XG5cbiAgY29uc3Qgb3BlblBvcG92ZXIgPSB1c2VDYWxsYmFjayhcbiAgICAoc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4ge1xuICAgICAgc2V0U2VsZWN0aW5nU3RlcChzZWN0aW9uKTtcbiAgICAgIHNldElzT3Blbih0cnVlKTtcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcblxuICAgICAgY29uc3QgYmFzZSA9IHNlY3Rpb24gPT09IFwic3RhcnRcIiA/IHN0YXJ0RGF0ZSB8fCBlbmREYXRlIHx8IG5vdyA6IGVuZERhdGUgfHwgc3RhcnREYXRlIHx8IG5vdztcbiAgICAgIHNldEN1cnJlbnRNb250aChiYXNlLmdldE1vbnRoKCkpO1xuICAgICAgc2V0Q3VycmVudFllYXIoYmFzZS5nZXRGdWxsWWVhcigpKTtcbiAgICB9LFxuICAgIFtlbmREYXRlLCBub3csIHN0YXJ0RGF0ZV1cbiAgKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChhdXRvT3BlblJlcXVlc3RJZCA8PSAwKSByZXR1cm47XG4gICAgc2V0U2VsZWN0aW5nU3RlcChcInN0YXJ0XCIpO1xuICAgIHNldElzT3Blbih0cnVlKTtcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgY29uc3QgYmFzZSA9IHN0YXJ0RGF0ZSB8fCBlbmREYXRlIHx8IG5vdztcbiAgICBzZXRDdXJyZW50TW9udGgoYmFzZS5nZXRNb250aCgpKTtcbiAgICBzZXRDdXJyZW50WWVhcihiYXNlLmdldEZ1bGxZZWFyKCkpO1xuICB9LCBbYXV0b09wZW5SZXF1ZXN0SWRdKTtcblxuICBjb25zdCBvbkFjdGl2YXRvcktleURvd24gPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSBcIkVudGVyXCIgJiYgZXZlbnQua2V5ICE9PSBcIiBcIikgcmV0dXJuO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG9wZW5Qb3BvdmVyKFwic3RhcnRcIik7XG4gICAgfSxcbiAgICBbb3BlblBvcG92ZXJdXG4gICk7XG5cbiAgY29uc3Qgb25TZWN0aW9uS2V5RG93biA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4sIHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgIT09IFwiRW50ZXJcIiAmJiBldmVudC5rZXkgIT09IFwiIFwiKSByZXR1cm47XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgb3BlblBvcG92ZXIoc2VjdGlvbik7XG4gICAgfSxcbiAgICBbb3BlblBvcG92ZXJdXG4gICk7XG5cbiAgY29uc3Qgb25DbGVhciA9IHVzZUNhbGxiYWNrKChldmVudDogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgc2V0U3RhcnREYXRlKG51bGwpO1xuICAgIHNldEVuZERhdGUobnVsbCk7XG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG9uUHJldk1vbnRoID0gdXNlQ2FsbGJhY2soKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHNldEN1cnJlbnRNb250aCgocHJldmlvdXMpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSBwcmV2aW91cyAtIDE7XG4gICAgICBpZiAobmV4dCA8IDApIHtcbiAgICAgICAgc2V0Q3VycmVudFllYXIoKHllYXIpID0+IHllYXIgLSAxKTtcbiAgICAgICAgcmV0dXJuIDExO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBvbk5leHRNb250aCA9IHVzZUNhbGxiYWNrKChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBzZXRDdXJyZW50TW9udGgoKHByZXZpb3VzKSA9PiB7XG4gICAgICBjb25zdCBuZXh0ID0gcHJldmlvdXMgKyAxO1xuICAgICAgaWYgKG5leHQgPiAxMSkge1xuICAgICAgICBzZXRDdXJyZW50WWVhcigoeWVhcikgPT4geWVhciArIDEpO1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH0pO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgb25EYXlDbGljayA9IHVzZUNhbGxiYWNrKFxuICAgIChkYXk6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB7XG4gICAgICBpZiAoIWRheS5kYXRlIHx8IGRheS5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBuZXh0RGF0ZSA9IG5ldyBEYXRlKGRheS5kYXRlLmdldEZ1bGxZZWFyKCksIGRheS5kYXRlLmdldE1vbnRoKCksIGRheS5kYXRlLmdldERhdGUoKSk7XG5cbiAgICAgIGlmICghc3RhcnREYXRlIHx8IHNlbGVjdGluZ1N0ZXAgPT09IFwic3RhcnRcIikge1xuICAgICAgICBzZXRTdGFydERhdGUobmV4dERhdGUpO1xuICAgICAgICBpZiAoZW5kRGF0ZSAmJiBpc0JlZm9yZShlbmREYXRlLCBuZXh0RGF0ZSkpIHtcbiAgICAgICAgICBzZXRFbmREYXRlKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XG4gICAgICAgIHNldEN1cnJlbnRNb250aChuZXh0RGF0ZS5nZXRNb250aCgpKTtcbiAgICAgICAgc2V0Q3VycmVudFllYXIobmV4dERhdGUuZ2V0RnVsbFllYXIoKSk7XG4gICAgICAgIGZvY3VzU2VjdGlvbihhY3RpdmF0b3JSZWYuY3VycmVudCwgXCJlbmRcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIpIHtcbiAgICAgICAgaWYgKGlzQmVmb3JlKG5leHREYXRlLCBzdGFydERhdGUpKSB7XG4gICAgICAgICAgc2V0RW5kRGF0ZShzdGFydERhdGUpO1xuICAgICAgICAgIHNldFN0YXJ0RGF0ZShuZXh0RGF0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0RW5kRGF0ZShuZXh0RGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImRvbmVcIik7XG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtlbmREYXRlLCBzZWxlY3RpbmdTdGVwLCBzdGFydERhdGVdXG4gICk7XG5cbiAgY29uc3Qgb25EYXlIb3ZlciA9IHVzZUNhbGxiYWNrKFxuICAgIChkYXk6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB7XG4gICAgICBpZiAoIWRheS5kYXRlIHx8IHNlbGVjdGluZ1N0ZXAgIT09IFwiZW5kXCIgfHwgIXN0YXJ0RGF0ZSkgcmV0dXJuO1xuICAgICAgc2V0SG92ZXJEYXRlKG5ldyBEYXRlKGRheS5kYXRlLmdldEZ1bGxZZWFyKCksIGRheS5kYXRlLmdldE1vbnRoKCksIGRheS5kYXRlLmdldERhdGUoKSkpO1xuICAgIH0sXG4gICAgW3NlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZV1cbiAgKTtcblxuICBjb25zdCBvbkdyaWRNb3VzZUxlYXZlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNhbGVuZGFyID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgZmlyc3REYXkgPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoLCAxKTtcbiAgICBjb25zdCBkYXlzSW5Nb250aCA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGggKyAxLCAwKS5nZXREYXRlKCk7XG4gICAgY29uc3Qgb2Zmc2V0ID0gKGZpcnN0RGF5LmdldERheSgpICsgNikgJSA3O1xuICAgIGNvbnN0IGNlbGxzOiBDYWxlbmRhckNlbGxbXSA9IFtdO1xuXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG9mZnNldDsgaW5kZXggKz0gMSkge1xuICAgICAgY2VsbHMucHVzaCh7IGRhdGU6IG51bGwsIGlzbzogXCJcIiwgaXNFbXB0eTogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBkYXkgPSAxOyBkYXkgPD0gZGF5c0luTW9udGg7IGRheSArPSAxKSB7XG4gICAgICBjb25zdCBkYXRlT2JqID0gbmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCwgZGF5KTtcbiAgICAgIGNlbGxzLnB1c2goeyBkYXRlOiBkYXRlT2JqLCBpc286IHRvSXNvKGRhdGVPYmopLCBpc0VtcHR5OiBmYWxzZSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbW9udGhMYWJlbDogZm9ybWF0TW9udGhMYWJlbChmaXJzdERheSwgbG9jYWxlKSxcbiAgICAgIGNlbGxzLFxuICAgIH07XG4gIH0sIFtjdXJyZW50TW9udGgsIGN1cnJlbnRZZWFyLCBsb2NhbGVdKTtcblxuICBjb25zdCBkYXlDZWxscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gYnVpbGREYXlDZWxscyhjYWxlbmRhci5jZWxscywgc3RhcnREYXRlLCBlbmREYXRlLCBob3ZlckRhdGUsIHNlbGVjdGluZ1N0ZXApLFxuICAgIFtjYWxlbmRhci5jZWxscywgZW5kRGF0ZSwgaG92ZXJEYXRlLCBzZWxlY3RpbmdTdGVwLCBzdGFydERhdGVdXG4gICk7XG5cbiAgY29uc3QgbGFiZWxGcm9tID0gdG9TZW50ZW5jZUNhc2UoaW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIiksIGxvY2FsZSk7XG4gIGNvbnN0IGxhYmVsVG8gPSB0b1NlbnRlbmNlQ2FzZShpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpLCBsb2NhbGUpO1xuXG4gIHJldHVybiAoXG4gICAgPEhpc3RvcnlNYW51YWxEYXRlUGlja2VyXG4gICAgICBhY3RpdmF0b3JSZWY9e2FjdGl2YXRvclJlZn1cbiAgICAgIHBvcG92ZXJSZWY9e3BvcG92ZXJSZWZ9XG4gICAgICBzaG93TWFudWFsRXJyb3I9e3Nob3dNYW51YWxFcnJvcn1cbiAgICAgIHNob3dTdGFydEVycm9yPXtzaG93U3RhcnRFcnJvcn1cbiAgICAgIHNob3dFbmRFcnJvcj17c2hvd0VuZEVycm9yfVxuICAgICAgZmlsdGVyVGl0bGU9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9EYXRlXCIsIFwiRGF0ZVwiKX1cbiAgICAgIGlzT3Blbj17aXNPcGVufVxuICAgICAgc2VsZWN0aW5nU3RlcD17c2VsZWN0aW5nU3RlcH1cbiAgICAgIGxhYmVsRnJvbT17bGFiZWxGcm9tfVxuICAgICAgbGFiZWxUbz17bGFiZWxUb31cbiAgICAgIHN0YXJ0RGF0ZVRleHQ9e3N0YXJ0RGF0ZSA/IGZvcm1hdERpc3BsYXkoc3RhcnREYXRlLCBsb2NhbGUpIDogaW5kVChcIkhpc3RvcnlfQWRkRGF0ZVwiLCBcIkFkZCBkYXRlXCIpfVxuICAgICAgZW5kRGF0ZVRleHQ9e2VuZERhdGUgPyBmb3JtYXREaXNwbGF5KGVuZERhdGUsIGxvY2FsZSkgOiBpbmRUKFwiSGlzdG9yeV9BZGREYXRlXCIsIFwiQWRkIGRhdGVcIil9XG4gICAgICBjbGVhclJhbmdlTGFiZWw9e2luZFQoXCJIaXN0b3J5X0NsZWFyUmFuZ2VcIiwgXCJDbGVhciByYW5nZVwiKX1cbiAgICAgIGhhc1NlbGVjdGVkUmFuZ2U9eyEhc3RhcnREYXRlIHx8ICEhZW5kRGF0ZX1cbiAgICAgIG1vbnRoTGFiZWw9e2NhbGVuZGFyLm1vbnRoTGFiZWx9XG4gICAgICB3ZWVrRGF5TGFiZWxzPXtbXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9Nb25cIiwgXCJNb25cIiksXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9UdWVcIiwgXCJUdWVcIiksXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9XZWRcIiwgXCJXZWRcIiksXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9UaHVcIiwgXCJUaHVcIiksXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9GcmlcIiwgXCJGcmlcIiksXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9TYXRcIiwgXCJTYXRcIiksXG4gICAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9TdW5cIiwgXCJTdW5cIiksXG4gICAgICBdfVxuICAgICAgc3RhdHVzVGV4dD17XG4gICAgICAgIHNlbGVjdGluZ1N0ZXAgPT09IFwic3RhcnRcIlxuICAgICAgICAgID8gaW5kVChcIkhpc3RvcnlfU3RhdHVzX1NlbGVjdFN0YXJ0XCIsIFwiU2VsZWN0IHN0YXJ0IGRhdGVcIilcbiAgICAgICAgICA6IGluZFQoXCJIaXN0b3J5X1N0YXR1c19TZWxlY3RFbmRcIiwgXCJTZWxlY3QgZW5kIGRhdGVcIilcbiAgICAgIH1cbiAgICAgIGRheUNlbGxzPXtkYXlDZWxsc31cbiAgICAgIHByZXZNb250aExhYmVsPXtpbmRUKFwiSGlzdG9yeV9QcmV2TW9udGhcIiwgXCJQcmV2aW91cyBtb250aFwiKX1cbiAgICAgIG5leHRNb250aExhYmVsPXtpbmRUKFwiSGlzdG9yeV9OZXh0TW9udGhcIiwgXCJOZXh0IG1vbnRoXCIpfVxuICAgICAgb25PcGVuUG9wb3Zlcj17b3BlblBvcG92ZXJ9XG4gICAgICBvbkFjdGl2YXRvcktleURvd249e29uQWN0aXZhdG9yS2V5RG93bn1cbiAgICAgIG9uU2VjdGlvbktleURvd249e29uU2VjdGlvbktleURvd259XG4gICAgICBvbkNsZWFyPXtvbkNsZWFyfVxuICAgICAgb25QcmV2TW9udGg9e29uUHJldk1vbnRofVxuICAgICAgb25OZXh0TW9udGg9e29uTmV4dE1vbnRofVxuICAgICAgb25HcmlkTW91c2VMZWF2ZT17b25HcmlkTW91c2VMZWF2ZX1cbiAgICAgIG9uRGF5Q2xpY2s9e29uRGF5Q2xpY2t9XG4gICAgICBvbkRheUhvdmVyPXtvbkRheUhvdmVyfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyO1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9BY3Rpb25CdXR0b24udHN4XCI7XG5cbnR5cGUgRXhwZW5zZUZpbHRlckFjdGlvbnNQcm9wcyA9IHtcbiAgY2xlYXJMYWJlbDogc3RyaW5nO1xuICBhcHBseUxhYmVsOiBzdHJpbmc7XG4gIG9uQ2xlYXI6ICgpID0+IHZvaWQ7XG4gIG9uQXBwbHk6ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBTaGFyZWQgYXBwbHkvY2xlYXIgYWN0aW9uIHJvdyBmb3IgZXhwZW5zZSBzaGVldCBmaWx0ZXJzLlxuY29uc3QgRXhwZW5zZUZpbHRlckFjdGlvbnMgPSAoe1xuICBjbGVhckxhYmVsLFxuICBhcHBseUxhYmVsLFxuICBvbkNsZWFyLFxuICBvbkFwcGx5LFxufTogRXhwZW5zZUZpbHRlckFjdGlvbnNQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMSBncmlkIGdyaWQtY29scy0yIGdhcC0yIGhpc3RvcnktZmlsdGVyLWFjdGlvbnNcIj5cbiAgICAgIDxBY3Rpb25CdXR0b24gbGFiZWw9e2NsZWFyTGFiZWx9IGNsYXNzTmFtZT1cInctZnVsbFwiIG9uQ2xpY2s9e29uQ2xlYXJ9IC8+XG4gICAgICA8QWN0aW9uQnV0dG9uIGxhYmVsPXthcHBseUxhYmVsfSBjbGFzc05hbWU9XCJ3LWZ1bGxcIiBvbkNsaWNrPXtvbkFwcGx5fSAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUZpbHRlckFjdGlvbnM7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVtb3RlU2VhcmNoQ29tYm9ib3gsIHsgdHlwZSBSZW1vdGVTZWFyY2hPcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1JlbW90ZVNlYXJjaENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgZmV0Y2hKc29uIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcblxudHlwZSBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG59O1xuXG50eXBlIFByb2plY3REcm9wZG93blJlc3BvbnNlID0ge1xuICBpdGVtcz86IEFycmF5PHsgdmFsdWU/OiBzdHJpbmc7IHRleHQ/OiBzdHJpbmcgfT47XG59O1xuXG5jb25zdCBTRUFSQ0hfUEFHRV9TSVpFID0gMjA7XG5cbi8vIFByb2plY3QgZmlsdGVyIGlucHV0IGJhY2tlZCBieSByZW1vdGUgZHJvcGRvd24gc3VnZ2VzdGlvbnMuXG5jb25zdCBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG59OiBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0UHJvcHMpID0+IHtcbiAgY29uc3QgbG9hZE9wdGlvbnMgPSB1c2VDYWxsYmFjayhhc3luYyAodGVybTogc3RyaW5nLCBzaWduYWw6IEFib3J0U2lnbmFsKTogUHJvbWlzZTxSZW1vdGVTZWFyY2hPcHRpb25bXT4gPT4ge1xuICAgIGNvbnN0IHVybCA9IGAvR2FzdG9zL0dldFByb2plY3RzRm9yRHJvcGRvd24/dGVybT0ke2VuY29kZVVSSUNvbXBvbmVudCh0ZXJtKX0mcGFnZT0xJnBhZ2VTaXplPSR7U0VBUkNIX1BBR0VfU0laRX1gO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPFByb2plY3REcm9wZG93blJlc3BvbnNlPih1cmwsIHtcbiAgICAgIHNpZ25hbCxcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIChBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5pdGVtcykgPyByZXNwb25zZS5pdGVtcyA6IFtdKVxuICAgICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZVRleHQgPSBTdHJpbmcoaXRlbT8udmFsdWUgfHwgXCJcIikudHJpbSgpO1xuICAgICAgICBpZiAoIXZhbHVlVGV4dCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IHN1YnRpdGxlID0gU3RyaW5nKGl0ZW0/LnRleHQgfHwgXCJcIikudHJpbSgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHZhbHVlOiB2YWx1ZVRleHQsXG4gICAgICAgICAgdGl0bGU6IHZhbHVlVGV4dCxcbiAgICAgICAgICBzdWJ0aXRsZTogc3VidGl0bGUgfHwgXCItXCIsXG4gICAgICAgIH0gYXMgUmVtb3RlU2VhcmNoT3B0aW9uO1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgUmVtb3RlU2VhcmNoT3B0aW9uW107XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxSZW1vdGVTZWFyY2hDb21ib2JveFxuICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgb25TZWFyY2g9e2xvYWRPcHRpb25zfVxuICAgICAgaWRCYXNlPVwiZXhwZW5zZS1wcm9qZWN0LWZpbHRlclwiXG4gICAgICBtaW5TZWFyY2hMZW5ndGg9ezJ9XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEZsb2F0aW5nTGlzdCBmcm9tIFwiLi9GbG9hdGluZ0xpc3QudHN4XCI7XG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi9TcGlubmVyLnRzeFwiO1xuaW1wb3J0IHsgQ2hldnJvbkRvd25TdmcsIENoZXZyb25VcFN2ZyB9IGZyb20gXCIuL2NoZXZyb25zLnRzeFwiO1xuaW1wb3J0IHsgaGFuZGxlQ29tYm9ib3hLZXlEb3duIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUNvbWJvYm94S2V5Ym9hcmQudHNcIjtcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbmV4cG9ydCB0eXBlIFJlbW90ZVNlYXJjaE9wdGlvbiA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIHN1YnRpdGxlPzogc3RyaW5nO1xufTtcblxudHlwZSBSZW1vdGVTZWFyY2hDb21ib2JveFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uU2VhcmNoOiAodGVybTogc3RyaW5nLCBzaWduYWw6IEFib3J0U2lnbmFsKSA9PiBQcm9taXNlPFJlbW90ZVNlYXJjaE9wdGlvbltdPjtcbiAgaWRCYXNlOiBzdHJpbmc7XG4gIG1pblNlYXJjaExlbmd0aD86IG51bWJlcjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG4gIHBhbmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xufTtcblxuY29uc3QgdW5pcXVlQnlWYWx1ZSA9IChpdGVtczogUmVtb3RlU2VhcmNoT3B0aW9uW10pOiBSZW1vdGVTZWFyY2hPcHRpb25bXSA9PiB7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBSZW1vdGVTZWFyY2hPcHRpb24+KCk7XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcyB8fCBbXSkge1xuICAgIGNvbnN0IGtleSA9IFN0cmluZyhpdGVtLnZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBpZiAoIWtleSkgY29udGludWU7XG4gICAgaWYgKG1hcC5oYXMoa2V5KSkgY29udGludWU7XG4gICAgbWFwLnNldChrZXksIHtcbiAgICAgIHZhbHVlOiBrZXksXG4gICAgICB0aXRsZTogU3RyaW5nKGl0ZW0udGl0bGUgfHwgXCJcIikudHJpbSgpLFxuICAgICAgc3VidGl0bGU6IFN0cmluZyhpdGVtLnN1YnRpdGxlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gQXJyYXkuZnJvbShtYXAudmFsdWVzKCkpO1xufTtcblxuLy8gR2VuZXJpYyByZW1vdGUtc2VhcmNoIGNvbWJvYm94IHRoYXQgZmV0Y2hlcyBvcHRpb25zIG9ubHkgb24gRW50ZXIgb3Igc2VhcmNoIGljb24uXG5jb25zdCBSZW1vdGVTZWFyY2hDb21ib2JveCA9ICh7XG4gIGxhYmVsLFxuICBwbGFjZWhvbGRlcixcbiAgdmFsdWUsXG4gIG9uQ2hhbmdlLFxuICBvblNlYXJjaCxcbiAgaWRCYXNlLFxuICBtaW5TZWFyY2hMZW5ndGggPSAyLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICByZWFkT25seSA9IGZhbHNlLFxuICBzaG93TGFiZWwgPSB0cnVlLFxuICBwYW5lbENsYXNzTmFtZSA9IFwidmlzaXRhcy10eXBvZ3JhcGh5XCIsXG59OiBSZW1vdGVTZWFyY2hDb21ib2JveFByb3BzKSA9PiB7XG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xuICBjb25zdCB2YWx1ZUNvbG9yID0gcmVhZE9ubHlNb2RlID8gXCIjNjQ3NDhiXCIgOiBcIiMwMDI5NmJlMFwiO1xuICBjb25zdCBbcXVlcnksIHNldFF1ZXJ5XSA9IHVzZVN0YXRlKHZhbHVlIHx8IFwiXCIpO1xuICBjb25zdCBbb3B0aW9ucywgc2V0T3B0aW9uc10gPSB1c2VTdGF0ZTxSZW1vdGVTZWFyY2hPcHRpb25bXT4oW10pO1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2FjdGl2ZUluZGV4LCBzZXRBY3RpdmVJbmRleF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2xhc3RTZWFyY2hlZFRlcm0sIHNldExhc3RTZWFyY2hlZFRlcm1dID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgY29uc3QgYWJvcnRSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBib3hSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgbGlzdFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIHVzZU91dHNpZGVDbGljayhbY29udGFpbmVyUmVmLCBsaXN0UmVmXSwgKCkgPT4gc2V0T3BlbihmYWxzZSkpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0UXVlcnkodmFsdWUgfHwgXCJcIik7XG4gIH0sIFt2YWx1ZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQ/LmFib3J0KCk7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgY29uc3QgZmlsdGVyZWQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoIXF1ZXJ5LnRyaW0oKSkgcmV0dXJuIG9wdGlvbnM7XG4gICAgY29uc3QgcSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBvcHRpb25zLmZpbHRlcigob3B0aW9uKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZVRleHQgPSBvcHRpb24udmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHRpdGxlVGV4dCA9IFN0cmluZyhvcHRpb24udGl0bGUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHN1YnRpdGxlVGV4dCA9IFN0cmluZyhvcHRpb24uc3VidGl0bGUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgIHJldHVybiB2YWx1ZVRleHQuaW5jbHVkZXMocSkgfHwgdGl0bGVUZXh0LmluY2x1ZGVzKHEpIHx8IHN1YnRpdGxlVGV4dC5pbmNsdWRlcyhxKTtcbiAgICB9KTtcbiAgfSwgW29wdGlvbnMsIHF1ZXJ5XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRBY3RpdmVJbmRleCgwKTtcbiAgfSwgW2ZpbHRlcmVkLmxlbmd0aCwgcXVlcnldKTtcblxuICBjb25zdCBydW5TZWFyY2ggPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKHJlYWRPbmx5TW9kZSB8fCBsb2FkaW5nKSByZXR1cm47XG4gICAgY29uc3QgdGVybSA9IHF1ZXJ5LnRyaW0oKTtcbiAgICBjb25zdCB0ZXJtS2V5ID0gdGVybS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKHRlcm0ubGVuZ3RoIDwgbWluU2VhcmNoTGVuZ3RoKSB7XG4gICAgICBzZXRPcHRpb25zKFtdKTtcbiAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgc2V0TGFzdFNlYXJjaGVkVGVybShcIlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGVybUtleSA9PT0gbGFzdFNlYXJjaGVkVGVybSAmJiBvcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYWJvcnRSZWYuY3VycmVudD8uYWJvcnQoKTtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgIGFib3J0UmVmLmN1cnJlbnQgPSBjb250cm9sbGVyO1xuICAgIHNldExvYWRpbmcodHJ1ZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBvblNlYXJjaCh0ZXJtLCBjb250cm9sbGVyLnNpZ25hbCk7XG4gICAgICBjb25zdCBuZXh0ID0gdW5pcXVlQnlWYWx1ZShyZXNwb25zZSB8fCBbXSk7XG4gICAgICBzZXRPcHRpb25zKG5leHQpO1xuICAgICAgc2V0TGFzdFNlYXJjaGVkVGVybSh0ZXJtS2V5KTtcbiAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICBzZXRPcHRpb25zKFtdKTtcbiAgICAgIHNldExhc3RTZWFyY2hlZFRlcm0odGVybUtleSk7XG4gICAgICBzZXRPcGVuKHRydWUpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoYWJvcnRSZWYuY3VycmVudCA9PT0gY29udHJvbGxlcikge1xuICAgICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfSwgW2xhc3RTZWFyY2hlZFRlcm0sIGxvYWRpbmcsIG1pblNlYXJjaExlbmd0aCwgb25TZWFyY2gsIG9wdGlvbnMubGVuZ3RoLCBxdWVyeSwgcmVhZE9ubHlNb2RlXSk7XG5cbiAgY29uc3Qgc2VsZWN0T3B0aW9uID0gKG9wdGlvbjogUmVtb3RlU2VhcmNoT3B0aW9uKSA9PiB7XG4gICAgY29uc3QgbmV4dFZhbHVlID0gU3RyaW5nKG9wdGlvbi52YWx1ZSB8fCBcIlwiKS50cmltKCk7XG4gICAgc2V0UXVlcnkobmV4dFZhbHVlKTtcbiAgICBvbkNoYW5nZShuZXh0VmFsdWUpO1xuICAgIHNldExhc3RTZWFyY2hlZFRlcm0obmV4dFZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuICAgIHNldE9wZW4oZmFsc2UpO1xuICB9O1xuXG4gIGNvbnN0IHF1ZXJ5S2V5ID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IHNob3dTZWFyY2hJY29uID1cbiAgICAhcmVhZE9ubHlNb2RlICYmXG4gICAgIWxvYWRpbmcgJiZcbiAgICBxdWVyeUtleS5sZW5ndGggPj0gbWluU2VhcmNoTGVuZ3RoICYmXG4gICAgcXVlcnlLZXkgIT09IGxhc3RTZWFyY2hlZFRlcm07XG5cbiAgY29uc3QgbGlzdElkID0gYCR7aWRCYXNlfS1vcHRpb25zYDtcbiAgY29uc3QgYWN0aXZlSWQgPSBvcGVuICYmIGZpbHRlcmVkW2FjdGl2ZUluZGV4XSA/IGAke2lkQmFzZX0tb3B0LSR7ZmlsdGVyZWRbYWN0aXZlSW5kZXhdLnZhbHVlfWAgOiB1bmRlZmluZWQ7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiIHJlZj17Y29udGFpbmVyUmVmfT5cbiAgICAgIHtzaG93TGFiZWwgPyAoXG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIiBzdHlsZT17eyBjb2xvcjogXCIjMDAyOTZiZTBcIiB9fT5cbiAgICAgICAgICB7bGFiZWx9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICApIDogbnVsbH1cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17Ym94UmVmfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgIFwicmVsYXRpdmUgdy1mdWxsIHJvdW5kZWQteGwgYmctd2hpdGUgdGV4dC1sZWZ0IGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy0yIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctb2Zmc2V0LXdoaXRlIHNtOnRleHQtc21cIixcbiAgICAgICAgICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiXG4gICAgICAgICAgKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICBcInctZnVsbCByb3VuZGVkLXhsIGJvcmRlciBweC0zIHB5LTIgcHItMjAgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGVhZGluZy01IGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMiBkaXNhYmxlZDpiZy1zbGF0ZS0xMDAgZGlzYWJsZWQ6dGV4dC1zbGF0ZS01MDAgZGlzYWJsZWQ6Ym9yZGVyLXNsYXRlLTIwMCBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWRcIixcbiAgICAgICAgICAgICAgXCJib3JkZXItc2xhdGUtMjAwIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiLFxuICAgICAgICAgICAgICByZWFkT25seU1vZGUgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwiXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IHZhbHVlQ29sb3IgfX1cbiAgICAgICAgICAgIHZhbHVlPXtxdWVyeX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbmV4dFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICBzZXRRdWVyeShuZXh0VmFsdWUpO1xuICAgICAgICAgICAgICBvbkNoYW5nZShuZXh0VmFsdWUpO1xuICAgICAgICAgICAgICBpZiAobmV4dFZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpICE9PSBsYXN0U2VhcmNoZWRUZXJtKSB7XG4gICAgICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkZvY3VzPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghcmVhZE9ubHlNb2RlICYmIGZpbHRlcmVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXsoZXZlbnQpID0+XG4gICAgICAgICAgICAgIGhhbmRsZUNvbWJvYm94S2V5RG93bihldmVudCwge1xuICAgICAgICAgICAgICAgIGlzT3Blbjogb3BlbixcbiAgICAgICAgICAgICAgICBzZXRPcGVuLFxuICAgICAgICAgICAgICAgIG9wdGlvbkNvdW50OiBmaWx0ZXJlZC5sZW5ndGgsXG4gICAgICAgICAgICAgICAgc2V0QWN0aXZlSW5kZXgsXG4gICAgICAgICAgICAgICAgb25FbnRlcldoZW5PcGVuOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb24oZmlsdGVyZWRbYWN0aXZlSW5kZXhdID8/IGZpbHRlcmVkWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgdm9pZCBydW5TZWFyY2goKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uRW50ZXJXaGVuQ2xvc2VkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB2b2lkIHJ1blNlYXJjaCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3Blbk9uQXJyb3c6IHRydWUsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbH1cbiAgICAgICAgICAgIHJvbGU9XCJjb21ib2JveFwiXG4gICAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtvcGVufVxuICAgICAgICAgICAgYXJpYS1jb250cm9scz17bGlzdElkfVxuICAgICAgICAgICAgYXJpYS1hY3RpdmVkZXNjZW5kYW50PXthY3RpdmVJZH1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBwci0yXCI+XG4gICAgICAgICAgICB7bG9hZGluZyA/IChcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcHgtMS41XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNCB3LTRcIiAvPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgICAge3Nob3dTZWFyY2hJY29uID8gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcC0xLjUgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS01MDBcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHZvaWQgcnVuU2VhcmNoKCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX1NlYXJjaFwiLCBcIlNlYXJjaFwiKX1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17cmVhZE9ubHlNb2RlfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezEuNX0gc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPVwiaC01IHctNVwiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTUuNzUgMTUuNzUtMi40ODktMi40ODltMCAwYTMuMzc1IDMuMzc1IDAgMSAwLTQuNzczLTQuNzczIDMuMzc1IDMuMzc1IDAgMCAwIDQuNzc0IDQuNzc0Wk0yMSAxMmE5IDkgMCAxIDEtMTggMCA5IDkgMCAwIDEgMTggMFpcIiAvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBwLTEuNSB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTYwMFwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVhZE9ubHlNb2RlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKG9wZW4pIHtcbiAgICAgICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e29wZW4gPyBpbmRUKFwiRHJvcGRvd25fSGlkZU9wdGlvbnNcIiwgXCJIaWRlIG9wdGlvbnNcIikgOiBpbmRUKFwiRHJvcGRvd25fU2hvd09wdGlvbnNcIiwgXCJTaG93IG9wdGlvbnNcIil9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtyZWFkT25seU1vZGV9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtvcGVuID8gPENoZXZyb25VcFN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz4gOiA8Q2hldnJvbkRvd25TdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+fVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8RmxvYXRpbmdMaXN0XG4gICAgICAgICAgYW5jaG9yUmVmPXtib3hSZWZ9XG4gICAgICAgICAgb3Blbj17b3Blbn1cbiAgICAgICAgICB6SW5kZXg9ezM2MDAwMH1cbiAgICAgICAgICBtYXhIZWlnaHRDbGFzcz1cIm1heC1oLTcyXCJcbiAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgcm91bmRlZENsYXNzPVwicm91bmRlZC14bFwiXG4gICAgICAgICAgcGFuZWxDbGFzc05hbWU9e3BhbmVsQ2xhc3NOYW1lfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBpZD17bGlzdElkfSByZWY9e2xpc3RSZWZ9PlxuICAgICAgICAgICAge2xvYWRpbmcgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L2Rpdj5cbiAgICAgICAgICAgICkgOiBmaWx0ZXJlZC5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57aW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpfTwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgZmlsdGVyZWQubWFwKChvcHRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpbmRleCA9PT0gYWN0aXZlSW5kZXg7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uSWQgPSBvcHRpb24udmFsdWUgfHwgYCR7aW5kZXh9YDtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtvcHRpb25JZH1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2lkQmFzZX0tb3B0LSR7b3B0aW9uSWR9YH1cbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e2lzQWN0aXZlfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICAgXCJyZWxhdGl2ZSBmbGV4IHctZnVsbCBjdXJzb3ItZGVmYXVsdCBzZWxlY3Qtbm9uZSBpdGVtcy1zdGFydCBweS0yIHB4LTMgdGV4dC1sZWZ0IHRleHQtc21cIixcbiAgICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCIgOiBcInRleHQtc2xhdGUtOTAwXCJcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNlbGVjdE9wdGlvbihvcHRpb24pfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tZWRpdW1cIj57b3B0aW9uLnRpdGxlIHx8IG9wdGlvbi52YWx1ZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAge29wdGlvbi5zdWJ0aXRsZSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInRleHQteHNcIiwgaXNBY3RpdmUgPyBcInRleHQtd2hpdGUvOTBcIiA6IFwidGV4dC1zbGF0ZS01MDBcIil9PntvcHRpb24uc3VidGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9GbG9hdGluZ0xpc3Q+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJlbW90ZVNlYXJjaENvbWJvYm94O1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlbW90ZVNlYXJjaENvbWJvYm94LCB7IHR5cGUgUmVtb3RlU2VhcmNoT3B0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9SZW1vdGVTZWFyY2hDb21ib2JveC50c3hcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IsIGZldGNoSnNvbiB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldExpc3RSZXNwb25zZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGJ1aWxkRXhwZW5zZVNoZWV0U3VnZ2VzdFBheWxvYWQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVBheWxvYWRCdWlsZGVycy50c1wiO1xuXG50eXBlIEV4cGVuc2VTaGVldEZpbHRlcklucHV0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbn07XG5cbmNvbnN0IFNFQVJDSF9QQUdFX1NJWkUgPSA1MDtcblxuLy8gRXhwZW5zZSBzaGVldCBmaWx0ZXIgaW5wdXQgd2l0aCByZW1vdGUgbGlzdCBzdWdnZXN0aW9ucy5cbmNvbnN0IEV4cGVuc2VTaGVldEZpbHRlcklucHV0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zID0gdHJ1ZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbn06IEV4cGVuc2VTaGVldEZpbHRlcklucHV0UHJvcHMpID0+IHtcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XG5cbiAgY29uc3QgbG9hZE9wdGlvbnMgPSB1c2VDYWxsYmFjayhhc3luYyAodGVybTogc3RyaW5nLCBzaWduYWw6IEFib3J0U2lnbmFsKTogUHJvbWlzZTxSZW1vdGVTZWFyY2hPcHRpb25bXT4gPT4ge1xuICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZEV4cGVuc2VTaGVldFN1Z2dlc3RQYXlsb2FkKHRlcm0sIFNFQVJDSF9QQUdFX1NJWkUpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEV4cGVuc2VTaGVldExpc3RSZXNwb25zZT4oXCIvR2FzdG9zL0xpc3RFeHBlbnNlU2hlZXRzXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgc2lnbmFsLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIChBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5pdGVtcykgPyByZXNwb25zZS5pdGVtcyA6IFtdKVxuICAgICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBpZCA9IFN0cmluZyhpdGVtPy5ob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpO1xuICAgICAgICBpZiAoIWlkKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogaWQsXG4gICAgICAgICAgdGl0bGU6IGlkLFxuICAgICAgICAgIHN1YnRpdGxlOiBTdHJpbmcoaXRlbT8uZGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpIHx8IFwiLVwiLFxuICAgICAgICB9IGFzIFJlbW90ZVNlYXJjaE9wdGlvbjtcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFJlbW90ZVNlYXJjaE9wdGlvbltdO1xuICB9LCBbXSk7XG5cbiAgaWYgKCFlbmFibGVSZW1vdGVTdWdnZXN0aW9ucyB8fCByZWFkT25seU1vZGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAge3Nob3dMYWJlbCA/IChcbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgc3R5bGU9e3sgY29sb3I6IFwiIzAwMjk2YmUwXCIgfX0+XG4gICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHB4LTMgcHktMiB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgdGV4dC1zbGF0ZS05MDAgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxuICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8UmVtb3RlU2VhcmNoQ29tYm9ib3hcbiAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgIG9uU2VhcmNoPXthc3luYyAodGVybSwgc2lnbmFsKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGxvYWRPcHRpb25zKHRlcm0sIHNpZ25hbCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICAgIGlkQmFzZT1cImV4cGVuc2Utc2hlZXQtZmlsdGVyXCJcbiAgICAgIG1pblNlYXJjaExlbmd0aD17Mn1cbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxuICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXRGaWx0ZXJJbnB1dDtcbiIsICJpbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldExpc3RGaWx0ZXJzLCBFeHBlbnNlU2hlZXRMaXN0UmVxdWVzdCB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcblxuY29uc3QgREVGQVVMVF9TVUdHRVNUX1BBR0VfU0laRSA9IDUwO1xuXG4vLyBCdWlsZCBsaXN0IHBheWxvYWQgZm9yIC9HYXN0b3MvTGlzdEV4cGVuc2VTaGVldHMgZnJvbSBjdXJyZW50IGZpbHRlciBzdGF0ZS5cbmV4cG9ydCBjb25zdCBidWlsZEV4cGVuc2VMaXN0UGF5bG9hZCA9IChcbiAgZmlsdGVyczogRXhwZW5zZVNoZWV0TGlzdEZpbHRlcnMsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemU6IG51bWJlclxuKTogRXhwZW5zZVNoZWV0TGlzdFJlcXVlc3QgPT4ge1xuICBjb25zdCBuZXh0UGFnZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlKSAmJiBwYWdlID4gMCA/IHBhZ2UgOiAxO1xuICBjb25zdCBuZXh0UGFnZVNpemUgPSBOdW1iZXIuaXNGaW5pdGUocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCA/IHBhZ2VTaXplIDogREVGQVVMVF9TVUdHRVNUX1BBR0VfU0laRTtcbiAgY29uc3Qgc2FmZUZpbHRlciA9IFN0cmluZyhmaWx0ZXJzLmZpbHRlciB8fCBmaWx0ZXJzLmhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCk7XG5cbiAgcmV0dXJuIHtcbiAgICBmaWx0ZXI6IHNhZmVGaWx0ZXIsXG4gICAgYmlsbGVkTW9kZTogZmlsdGVycy5iaWxsZWRNb2RlLFxuICAgIGZyb21EYXRlOiBmaWx0ZXJzLmZyb21EYXRlLFxuICAgIHRvRGF0ZTogZmlsdGVycy50b0RhdGUsXG4gICAgcHJvamVjdElkOiBmaWx0ZXJzLnByb2plY3RJZCxcbiAgICBob2phR2FzdG9zSWQ6IGZpbHRlcnMuaG9qYUdhc3Rvc0lkLFxuICAgIGN1cnJlbmN5Q29kZTogZmlsdGVycy5jdXJyZW5jeUNvZGUsXG4gICAgcGFnZTogbmV4dFBhZ2UsXG4gICAgcGFnZVNpemU6IG5leHRQYWdlU2l6ZSxcbiAgfTtcbn07XG5cbi8vIEJ1aWxkIHN1Z2dlc3Rpb24gcGF5bG9hZCBmb3IgZXhwZW5zZSBzaGVldCBkcm9wZG93biBzZWFyY2guXG5leHBvcnQgY29uc3QgYnVpbGRFeHBlbnNlU2hlZXRTdWdnZXN0UGF5bG9hZCA9IChcbiAgdGVybTogc3RyaW5nLFxuICBwYWdlU2l6ZSA9IERFRkFVTFRfU1VHR0VTVF9QQUdFX1NJWkVcbik6IEV4cGVuc2VTaGVldExpc3RSZXF1ZXN0ID0+IHtcbiAgY29uc3Qgc2FmZVRlcm0gPSBTdHJpbmcodGVybSB8fCBcIlwiKS50cmltKCk7XG4gIGNvbnN0IG5leHRQYWdlU2l6ZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gcGFnZVNpemUgOiBERUZBVUxUX1NVR0dFU1RfUEFHRV9TSVpFO1xuXG4gIHJldHVybiB7XG4gICAgZmlsdGVyOiBzYWZlVGVybSxcbiAgICBiaWxsZWRNb2RlOiAyLFxuICAgIGZyb21EYXRlOiBcIlwiLFxuICAgIHRvRGF0ZTogXCJcIixcbiAgICBwcm9qZWN0SWQ6IFwiXCIsXG4gICAgaG9qYUdhc3Rvc0lkOiBcIlwiLFxuICAgIGN1cnJlbmN5Q29kZTogXCJcIixcbiAgICBwYWdlOiAxLFxuICAgIHBhZ2VTaXplOiBuZXh0UGFnZVNpemUsXG4gIH07XG59O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBGaWx0ZXJCdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GaWx0ZXJCdXR0b24udHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCBFeHBlbnNlQmlsbGVkTW9kZUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQmlsbGVkTW9kZUZpbHRlclNlbGVjdC50c3hcIjtcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXIgZnJvbSBcIi4vRXhwZW5zZURhdGVSYW5nZUZpbHRlci50c3hcIjtcbmltcG9ydCBFeHBlbnNlRmlsdGVyQWN0aW9ucyBmcm9tIFwiLi9FeHBlbnNlRmlsdGVyQWN0aW9ucy50c3hcIjtcbmltcG9ydCBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0IGZyb20gXCIuL0V4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVNoZWV0RmlsdGVySW5wdXQgZnJvbSBcIi4vRXhwZW5zZVNoZWV0RmlsdGVySW5wdXQudHN4XCI7XG5pbXBvcnQgSGlzdG9yeVN1bW1hcnkgZnJvbSBcIi4uLy4uL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlTdW1tYXJ5LnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlUXVpY2tGaWx0ZXJJZCB9IGZyb20gXCIuLi9saXN0L2V4cGVuc2VMaXN0VHlwZXMudHNcIjtcblxuZXhwb3J0IHR5cGUgeyBFeHBlbnNlUXVpY2tGaWx0ZXJJZCB9O1xuXG5jb25zdCBwYXJzZUlzb0RhdGUgPSAocmF3OiBzdHJpbmcpOiBEYXRlIHwgbnVsbCA9PiB7XG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3KS50cmltKCkuc3BsaXQoXCJUXCIpWzBdO1xuICBpZiAoIS9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KHZhbHVlKSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IHZhbHVlLnNwbGl0KFwiLVwiKS5tYXAoTnVtYmVyKTtcbiAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcbn07XG5cbmNvbnN0IGZvcm1hdERhdGUgPSAocmF3OiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZGF0ZSA9IHBhcnNlSXNvRGF0ZShyYXcpO1xuICBpZiAoIWRhdGUpIHJldHVybiBcIi0tXCI7XG4gIHJldHVybiBkYXRlXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHtcbiAgICAgIGRheTogXCJudW1lcmljXCIsXG4gICAgICBtb250aDogXCJzaG9ydFwiLFxuICAgICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgfSlcbiAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXG4gICAgLnRvTG93ZXJDYXNlKCk7XG59O1xuXG50eXBlIEV4cGVuc2VGaWx0ZXJzUGFuZWxQcm9wcyA9IHtcbiAgdmlzaWJsZTogYm9vbGVhbjtcbiAgc2hvd01hbnVhbERhdGVGaWx0ZXI6IGJvb2xlYW47XG4gIG1hbnVhbERhdGVBdXRvT3BlbktleTogbnVtYmVyO1xuICBmcm9tRGF0ZTogc3RyaW5nO1xuICB0b0RhdGU6IHN0cmluZztcbiAgcHJvamVjdElkOiBzdHJpbmc7XG4gIGhvamFHYXN0b3NJZDogc3RyaW5nO1xuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgYmlsbGVkTW9kZTogbnVtYmVyO1xuICBhY3RpdmVRdWlja0ZpbHRlcjogRXhwZW5zZVF1aWNrRmlsdGVySWQgfCBudWxsO1xuICBzaG93TWFudWFsRGF0ZUVycm9yOiBib29sZWFuO1xuICBvbkRhdGVSYW5nZUNoYW5nZTogKGZyb21EYXRlOiBzdHJpbmcsIHRvRGF0ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvblF1aWNrRmlsdGVyQ2hhbmdlOiAoZmlsdGVySWQ6IEV4cGVuc2VRdWlja0ZpbHRlcklkKSA9PiB2b2lkO1xuICBvblByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uSG9qYUdhc3Rvc0lkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkJpbGxlZE1vZGVDaGFuZ2U6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xuICBvbkNsZWFyOiAoKSA9PiB2b2lkO1xuICBvbkFwcGx5OiAoKSA9PiB2b2lkO1xufTtcblxuLy8gU2hhcmVkIGV4cGVuc2Ugc2hlZXQgZmlsdGVyIHBhbmVsIGNvbXBvc2VkIGZyb20gcmV1c2FibGUgbW9kdWxlIGNvbXBvbmVudHMuXG5jb25zdCBFeHBlbnNlRmlsdGVyc1BhbmVsID0gKHtcbiAgdmlzaWJsZSxcbiAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXG4gIG1hbnVhbERhdGVBdXRvT3BlbktleSxcbiAgZnJvbURhdGUsXG4gIHRvRGF0ZSxcbiAgcHJvamVjdElkLFxuICBob2phR2FzdG9zSWQsXG4gIGN1cnJlbmN5Q29kZSxcbiAgYmlsbGVkTW9kZSxcbiAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gIG9uRGF0ZVJhbmdlQ2hhbmdlLFxuICBvblF1aWNrRmlsdGVyQ2hhbmdlLFxuICBvblByb2plY3RJZENoYW5nZSxcbiAgb25Ib2phR2FzdG9zSWRDaGFuZ2UsXG4gIG9uQ3VycmVuY3lDb2RlQ2hhbmdlLFxuICBvbkJpbGxlZE1vZGVDaGFuZ2UsXG4gIG9uQ2xlYXIsXG4gIG9uQXBwbHksXG59OiBFeHBlbnNlRmlsdGVyc1BhbmVsUHJvcHMpID0+IHtcbiAgaWYgKCF2aXNpYmxlKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgbG9jYWxlID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCI7XG4gIGNvbnN0IHNob3dJbmxpbmVEYXRlU3VtbWFyeSA9ICFzaG93TWFudWFsRGF0ZUZpbHRlciAmJiAhIWZyb21EYXRlICYmICEhdG9EYXRlO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItY2FyZCBmaWx0ZXItY2FyZC0tZXhwYW5kZWQgcC0yIHNtOnAtMi41IHJlbGF0aXZlXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN0YWNrIGZsZXggZmxleC1jb2wgc3BhY2UteS0yXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBoaXN0b3J5LXF1aWNrLWZpbHRlcnNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfRGF0ZVwiLCBcIkRhdGVcIil9PlxuICAgICAgICAgIDxGaWx0ZXJCdXR0b25cbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiSGlzdG9yeV9RdWlja19DdXN0b21cIiwgXCJEYXRlXCIpfVxuICAgICAgICAgICAgYWN0aXZlPXthY3RpdmVRdWlja0ZpbHRlciA9PT0gXCJjdXN0b21cIn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblF1aWNrRmlsdGVyQ2hhbmdlKFwiY3VzdG9tXCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEZpbHRlckJ1dHRvblxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJIaXN0b3J5X1F1aWNrXzdEYXlzXCIsIFwiNyBkYXlzXCIpfVxuICAgICAgICAgICAgYWN0aXZlPXthY3RpdmVRdWlja0ZpbHRlciA9PT0gXCJkYXlzLTdcIn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblF1aWNrRmlsdGVyQ2hhbmdlKFwiZGF5cy03XCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEZpbHRlckJ1dHRvblxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJIaXN0b3J5X1F1aWNrXzMwRGF5c1wiLCBcIjMwIGRheXNcIil9XG4gICAgICAgICAgICBhY3RpdmU9e2FjdGl2ZVF1aWNrRmlsdGVyID09PSBcImRheXMtMzBcIn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblF1aWNrRmlsdGVyQ2hhbmdlKFwiZGF5cy0zMFwiKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxGaWx0ZXJCdXR0b25cbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiSGlzdG9yeV9RdWlja185MERheXNcIiwgXCI5MCBkYXlzXCIpfVxuICAgICAgICAgICAgYWN0aXZlPXthY3RpdmVRdWlja0ZpbHRlciA9PT0gXCJkYXlzLTkwXCJ9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25RdWlja0ZpbHRlckNoYW5nZShcImRheXMtOTBcIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAge3Nob3dNYW51YWxEYXRlRmlsdGVyID8gKFxuICAgICAgICAgIDxFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyXG4gICAgICAgICAgICBmcm9tRGF0ZT17ZnJvbURhdGV9XG4gICAgICAgICAgICB0b0RhdGU9e3RvRGF0ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRhdGVSYW5nZUNoYW5nZX1cbiAgICAgICAgICAgIGF1dG9PcGVuUmVxdWVzdElkPXttYW51YWxEYXRlQXV0b09wZW5LZXl9XG4gICAgICAgICAgICBzaG93TWFudWFsRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3J9XG4gICAgICAgICAgICBzaG93U3RhcnRFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvciAmJiAhZnJvbURhdGV9XG4gICAgICAgICAgICBzaG93RW5kRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3IgJiYgIXRvRGF0ZX1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogc2hvd0lubGluZURhdGVTdW1tYXJ5ID8gKFxuICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxuICAgICAgICAgICAgc3VtbWFyeUZyb21MYWJlbD17aW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIil9XG4gICAgICAgICAgICBzdW1tYXJ5VG9MYWJlbD17aW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKX1cbiAgICAgICAgICAgIGZyb21WYWx1ZT17Zm9ybWF0RGF0ZShmcm9tRGF0ZSwgbG9jYWxlKX1cbiAgICAgICAgICAgIHRvVmFsdWU9e2Zvcm1hdERhdGUodG9EYXRlLCBsb2NhbGUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ2FwLXktMSB0ZXh0LVsxMXB4XSBweC0xXCJcbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTQgZ2FwLTJcIj5cbiAgICAgICAgICA8RXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfUHJvamVjdFwiLCBcIlByb2plY3RcIil9XG4gICAgICAgICAgICB2YWx1ZT17cHJvamVjdElkfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uUHJvamVjdElkQ2hhbmdlfVxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEV4cGVuc2VTaGVldEZpbHRlcklucHV0XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1NoZWV0XCIsIFwiRXhwZW5zZSBzaGVldFwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU2hlZXRcIiwgXCJFeHBlbnNlIHNoZWV0XCIpfVxuICAgICAgICAgICAgdmFsdWU9e2hvamFHYXN0b3NJZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkhvamFHYXN0b3NJZENoYW5nZX1cbiAgICAgICAgICAgIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XG4gICAgICAgICAgICB2YWx1ZT17Y3VycmVuY3lDb2RlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uQ3VycmVuY3lDb2RlQ2hhbmdlfVxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEV4cGVuc2VCaWxsZWRNb2RlRmlsdGVyU2VsZWN0XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1N0YXR1c1wiLCBcIkVzdGFkb1wiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzXCIsIFwiRXN0YWRvXCIpfVxuICAgICAgICAgICAgdmFsdWU9e2JpbGxlZE1vZGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25CaWxsZWRNb2RlQ2hhbmdlfVxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8RXhwZW5zZUZpbHRlckFjdGlvbnNcbiAgICAgICAgICBjbGVhckxhYmVsPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xlYXJcIiwgXCJDbGVhclwiKX1cbiAgICAgICAgICBhcHBseUxhYmVsPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQXBwbHlcIiwgXCJBcHBseVwiKX1cbiAgICAgICAgICBvbkNsZWFyPXtvbkNsZWFyfVxuICAgICAgICAgIG9uQXBwbHk9e29uQXBwbHl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VGaWx0ZXJzUGFuZWw7XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yLCBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldENhcmQsIEV4cGVuc2VTaGVldExpc3RGaWx0ZXJzLCBFeHBlbnNlU2hlZXRMaXN0UmVzcG9uc2UgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBidWlsZEV4cGVuc2VMaXN0UGF5bG9hZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlUGF5bG9hZEJ1aWxkZXJzLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVNoZWV0c0xpc3REYXRhQXJncyA9IHtcbiAgaGFzQWNjZXNzOiBib29sZWFuO1xuICBwYWdlU2l6ZTogbnVtYmVyO1xuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcbn07XG5cbi8vIE93bnMgbGlzdCBkYXRhIGZldGNoLCBsb2FkaW5nIHN0YXRlLCBhbmQgcGFnaW5hdGlvbiBtZXRhZGF0YS5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRzTGlzdERhdGEgPSAoeyBoYXNBY2Nlc3MsIHBhZ2VTaXplLCBvbkZvcmJpZGRlbiB9OiBVc2VFeHBlbnNlU2hlZXRzTGlzdERhdGFBcmdzKSA9PiB7XG4gIGNvbnN0IFtpdGVtcywgc2V0SXRlbXNdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0Q2FyZFtdPihbXSk7XG4gIGNvbnN0IFt0b3RhbCwgc2V0VG90YWxdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtjdXJyZW50UGFnZSwgc2V0Q3VycmVudFBhZ2VdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICBjb25zdCBsb2FkTGlzdCA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChwYWdlOiBudW1iZXIsIGZpbHRlcnM6IEV4cGVuc2VTaGVldExpc3RGaWx0ZXJzKSA9PiB7XG4gICAgICBpZiAoIWhhc0FjY2Vzcykge1xuICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZEV4cGVuc2VMaXN0UGF5bG9hZChmaWx0ZXJzLCBwYWdlLCBwYWdlU2l6ZSk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEV4cGVuc2VTaGVldExpc3RSZXNwb25zZT4oXCIvR2FzdG9zL0xpc3RFeHBlbnNlU2hlZXRzXCIsIHtcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlPy5zdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZS5tZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXRzLlwiKSk7XG4gICAgICAgICAgc2V0SXRlbXMoW10pO1xuICAgICAgICAgIHNldFRvdGFsKDApO1xuICAgICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5leHRJdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lml0ZW1zKSA/IHJlc3BvbnNlLml0ZW1zIDogW107XG4gICAgICAgIGNvbnN0IG5leHRUb3RhbCA9IE51bWJlcihyZXNwb25zZT8udG90YWwgfHwgbmV4dEl0ZW1zLmxlbmd0aCB8fCAwKTtcbiAgICAgICAgc2V0SXRlbXMobmV4dEl0ZW1zKTtcbiAgICAgICAgc2V0VG90YWwobmV4dFRvdGFsKTtcbiAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0cy5cIik7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgc2V0SXRlbXMoW10pO1xuICAgICAgICBzZXRUb3RhbCgwKTtcbiAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2hhc0FjY2Vzcywgb25Gb3JiaWRkZW4sIHBhZ2VTaXplXVxuICApO1xuXG4gIGNvbnN0IHJlc2V0TGlzdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRJdGVtcyhbXSk7XG4gICAgc2V0VG90YWwoMCk7XG4gICAgc2V0Q3VycmVudFBhZ2UoMSk7XG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBpdGVtcyxcbiAgICB0b3RhbCxcbiAgICBjdXJyZW50UGFnZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGxvYWRMaXN0LFxuICAgIHJlc2V0TGlzdCxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VRdWlja0ZpbHRlcklkLCBBcHBsaWVkRmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi9leHBlbnNlTGlzdFR5cGVzLnRzXCI7XG5pbXBvcnQgeyBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcblxudHlwZSBVc2VFeHBlbnNlU2hlZXRzRmlsdGVyc1N0YXRlQXJncyA9IHtcbiAgb25BcHBseUZpbHRlcnM6IChzbmFwc2hvdDogQXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB2b2lkO1xuICBvbkNsZWFyRmlsdGVyczogKCkgPT4gdm9pZDtcbn07XG5cbi8vIE93bnMgZmlsdGVyIFVJIHN0YXRlIGFuZCBhcHBseS9jbGVhciBydWxlcyBmb3IgZXhwZW5zZSBsaXN0IHBhZ2UuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZSA9ICh7IG9uQXBwbHlGaWx0ZXJzLCBvbkNsZWFyRmlsdGVycyB9OiBVc2VFeHBlbnNlU2hlZXRzRmlsdGVyc1N0YXRlQXJncykgPT4ge1xuICBjb25zdCBbZnJvbURhdGUsIHNldEZyb21EYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbdG9EYXRlLCBzZXRUb0RhdGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtwcm9qZWN0SWQsIHNldFByb2plY3RJZF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2hvamFHYXN0b3NJZCwgc2V0SG9qYUdhc3Rvc0lkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbY3VycmVuY3lDb2RlLCBzZXRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtiaWxsZWRNb2RlLCBzZXRCaWxsZWRNb2RlXSA9IHVzZVN0YXRlKDIpO1xuICBjb25zdCBbYWN0aXZlUXVpY2tGaWx0ZXIsIHNldEFjdGl2ZVF1aWNrRmlsdGVyXSA9IHVzZVN0YXRlPEV4cGVuc2VRdWlja0ZpbHRlcklkIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzaG93TWFudWFsRGF0ZUZpbHRlciwgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXJdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd01hbnVhbERhdGVFcnJvciwgc2V0U2hvd01hbnVhbERhdGVFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttYW51YWxEYXRlQXV0b09wZW5LZXksIHNldE1hbnVhbERhdGVBdXRvT3BlbktleV0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2FwcGxpZWRGaWx0ZXJzLCBzZXRBcHBsaWVkRmlsdGVyc10gPSB1c2VTdGF0ZTxBcHBsaWVkRmlsdGVyU25hcHNob3QgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3Nob3dGaWx0ZXJzLCBzZXRTaG93RmlsdGVyc10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICBjb25zdCBjdXJyZW50RmlsdGVycyA9IHVzZU1lbW88QXBwbGllZEZpbHRlclNuYXBzaG90PihcbiAgICAoKSA9PiAoe1xuICAgICAgZnJvbURhdGUsXG4gICAgICB0b0RhdGUsXG4gICAgICBwcm9qZWN0SWQsXG4gICAgICBob2phR2FzdG9zSWQsXG4gICAgICBjdXJyZW5jeUNvZGUsXG4gICAgICBiaWxsZWRNb2RlLFxuICAgICAgZmlsdGVyOiBob2phR2FzdG9zSWQsXG4gICAgfSksXG4gICAgW2JpbGxlZE1vZGUsIGN1cnJlbmN5Q29kZSwgZnJvbURhdGUsIGhvamFHYXN0b3NJZCwgcHJvamVjdElkLCB0b0RhdGVdXG4gICk7XG5cbiAgY29uc3Qgb25BcHBseSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWZyb21EYXRlIHx8ICF0b0RhdGUpIHtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IodHJ1ZSk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNuYXBzaG90OiBBcHBsaWVkRmlsdGVyU25hcHNob3QgPSB7XG4gICAgICBmcm9tRGF0ZSxcbiAgICAgIHRvRGF0ZSxcbiAgICAgIHByb2plY3RJZCxcbiAgICAgIGhvamFHYXN0b3NJZCxcbiAgICAgIGN1cnJlbmN5Q29kZSxcbiAgICAgIGJpbGxlZE1vZGUsXG4gICAgICBmaWx0ZXI6IGhvamFHYXN0b3NJZCxcbiAgICB9O1xuXG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgc2V0QXBwbGllZEZpbHRlcnMoc25hcHNob3QpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XG4gICAgb25BcHBseUZpbHRlcnMoc25hcHNob3QpO1xuICB9LCBbYmlsbGVkTW9kZSwgY3VycmVuY3lDb2RlLCBmcm9tRGF0ZSwgaG9qYUdhc3Rvc0lkLCBvbkFwcGx5RmlsdGVycywgcHJvamVjdElkLCB0b0RhdGVdKTtcblxuICBjb25zdCBvbkNsZWFyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEZyb21EYXRlKFwiXCIpO1xuICAgIHNldFRvRGF0ZShcIlwiKTtcbiAgICBzZXRQcm9qZWN0SWQoXCJcIik7XG4gICAgc2V0SG9qYUdhc3Rvc0lkKFwiXCIpO1xuICAgIHNldEN1cnJlbmN5Q29kZShcIlwiKTtcbiAgICBzZXRCaWxsZWRNb2RlKDIpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXkoMCk7XG4gICAgc2V0QXBwbGllZEZpbHRlcnMobnVsbCk7XG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gICAgb25DbGVhckZpbHRlcnMoKTtcbiAgfSwgW29uQ2xlYXJGaWx0ZXJzXSk7XG5cbiAgY29uc3Qgb25EYXRlUmFuZ2VDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAobmV4dEZyb21EYXRlOiBzdHJpbmcsIG5leHRUb0RhdGU6IHN0cmluZykgPT4ge1xuICAgICAgc2V0RnJvbURhdGUobmV4dEZyb21EYXRlKTtcbiAgICAgIHNldFRvRGF0ZShuZXh0VG9EYXRlKTtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKHRydWUpO1xuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgICBpZiAoc2hvd01hbnVhbERhdGVFcnJvcikge1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKCEobmV4dEZyb21EYXRlICYmIG5leHRUb0RhdGUpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtzaG93TWFudWFsRGF0ZUVycm9yXVxuICApO1xuXG4gIGNvbnN0IG9uUXVpY2tGaWx0ZXJDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAoZmlsdGVySWQ6IEV4cGVuc2VRdWlja0ZpbHRlcklkKSA9PiB7XG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiY3VzdG9tXCIpIHtcbiAgICAgICAgaWYgKHNob3dNYW51YWxEYXRlRmlsdGVyKSB7XG4gICAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgICAgICAgIGlmICghZnJvbURhdGUgfHwgIXRvRGF0ZSkge1xuICAgICAgICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgICAgIHNldE1hbnVhbERhdGVBdXRvT3BlbktleSgocHJldmlvdXMpID0+IHByZXZpb3VzICsgMSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoZmlsdGVySWQpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG5cbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcbiAgICAgIGNvbnN0IG5leHRGcm9tID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtN1wiKSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gNik7XG4gICAgICB9IGVsc2UgaWYgKGZpbHRlcklkID09PSBcImRheXMtMzBcIikge1xuICAgICAgICBuZXh0RnJvbS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDI5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gODkpO1xuICAgICAgfVxuXG4gICAgICBzZXRGcm9tRGF0ZSh0b0lzb0RhdGUobmV4dEZyb20pKTtcbiAgICAgIHNldFRvRGF0ZSh0b0lzb0RhdGUodG9kYXkpKTtcbiAgICB9LFxuICAgIFtmcm9tRGF0ZSwgc2hvd01hbnVhbERhdGVGaWx0ZXIsIHRvRGF0ZV1cbiAgKTtcblxuICBjb25zdCB0b2dnbGVGaWx0ZXJQYW5lbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRTaG93RmlsdGVycygocHJldmlvdXMpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSAhcHJldmlvdXM7XG4gICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIGZyb21EYXRlLFxuICAgIHRvRGF0ZSxcbiAgICBwcm9qZWN0SWQsXG4gICAgaG9qYUdhc3Rvc0lkLFxuICAgIGN1cnJlbmN5Q29kZSxcbiAgICBiaWxsZWRNb2RlLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxuICAgIGFwcGxpZWRGaWx0ZXJzLFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIGN1cnJlbnRGaWx0ZXJzLFxuICAgIHNldFByb2plY3RJZCxcbiAgICBzZXRIb2phR2FzdG9zSWQsXG4gICAgc2V0Q3VycmVuY3lDb2RlLFxuICAgIHNldEJpbGxlZE1vZGUsXG4gICAgb25BcHBseSxcbiAgICBvbkNsZWFyLFxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlLFxuICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXG4gICAgdG9nZ2xlRmlsdGVyUGFuZWwsXG4gIH07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUF1RDs7O0FDQXZELG1CQUErQjtBQWtDM0I7QUFuQkosSUFBTSxnQ0FBZ0MsQ0FBQztBQUFBLEVBQ3JDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQ2QsTUFBMEM7QUFDeEMsUUFBTSxjQUFVO0FBQUEsSUFDZCxNQUFNO0FBQUEsTUFDSixFQUFFLE9BQU8sR0FBRyxNQUFNLEtBQUssd0NBQXdDLFdBQVcsRUFBRTtBQUFBLE1BQzVFLEVBQUUsT0FBTyxHQUFHLE1BQU0sS0FBSyxzQ0FBc0MsUUFBUSxFQUFFO0FBQUEsTUFDdkUsRUFBRSxPQUFPLEdBQUcsTUFBTSxLQUFLLG9DQUFvQyxPQUFPLEVBQUU7QUFBQSxJQUN0RTtBQUFBLElBQ0EsQ0FBQztBQUFBLEVBQ0g7QUFFQSxTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsVUFBVSxDQUFDLGNBQWM7QUFDdkIsY0FBTSxTQUFTLE9BQU8sU0FBUztBQUMvQixZQUFJLFdBQVcsS0FBSyxXQUFXLEtBQUssV0FBVyxHQUFHO0FBQ2hELG1CQUFTLE1BQU07QUFDZjtBQUFBLFFBQ0Y7QUFDQSxpQkFBUyxDQUFDO0FBQUEsTUFDWjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxRQUFPO0FBQUEsTUFDUCxpQkFBZ0I7QUFBQSxNQUNoQixnQkFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEI7QUFBQTtBQUFBLEVBQ0Y7QUFFSjtBQUVBLElBQU8sd0NBQVE7OztBQzFEZixJQUFBQyxnQkFBNEQ7OztBQ0VyRCxJQUFNLHVCQUFpQztBQUFBLEVBQzVDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtB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RUo7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLFFBQ0EsY0FBYyxDQUFDLFNBQVM7QUFDdEIsZ0JBQU0sV0FBVyxrQkFBa0I7QUFDbkMsZUFBSyxTQUFTLE1BQU0sUUFBUTtBQUFBLFFBQzlCO0FBQUEsUUFDQSxRQUFRO0FBQUE7QUFBQSxJQUNWO0FBQUEsS0FDRjtBQUVKO0FBR0EsSUFBTSxvQkFBb0IsTUFBTTtBQUM5QixTQUNFLDZDQUFDLGdDQUNDLHVEQUFDLDRCQUF5QixHQUM1QjtBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxxQkFBcUI7QUFDNUQsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQyxxQkFBa0IsQ0FBRTtBQUNoRDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sNEJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlNFQVJDSF9QQUdFX1NJWkUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0Il0KfQo=
