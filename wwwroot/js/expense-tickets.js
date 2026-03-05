import {
  ExpenseDateRangeFilter_default,
  ExpenseFilterActions_default,
  ExpenseQuickDateFilters_default,
  buildExpenseTicketListPayload
} from "./chunks/chunk-YSMPXCOG.js";
import {
  HistorySummary_default
} from "./chunks/chunk-G7KGERNF.js";
import {
  getSessionJsonWithExpiry,
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionJsonWithExpiry,
  setSessionValueWithExpiry
} from "./chunks/chunk-7SKLSV7K.js";
import {
  getExpenseTicketStatusFilterOptions,
  getExpenseTicketStatusLabel,
  normalizeExpenseTicketStatusFilterCode
} from "./chunks/chunk-HVFEEP5R.js";
import {
  mapWindowEnumOptions
} from "./chunks/chunk-BVPBMOU4.js";
import {
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-G2ZIZZ4I.js";
import "./chunks/chunk-GFZQR6PA.js";
import {
  RemoteSearchCombobox_default
} from "./chunks/chunk-NE4KB4CT.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-CCXORWXW.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-ZQIQJJOC.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-GIUUNBHM.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-GQ2I6PU5.js";
import "./chunks/chunk-6YXFJB4W.js";
import "./chunks/chunk-K7MECJ5E.js";
import {
  configureExpenseApiAuth,
  fetchExpenseSheetTicketsList,
  formatAmountWithCurrency,
  formatExpenseDateParts,
  formatExpenseDisplayDate,
  navigateToExpenseUrl,
  safeText,
  startOfDay,
  toIsoDate
} from "./chunks/chunk-GGS3XUX2.js";
import {
  VisitasPageProviders_default
} from "./chunks/chunk-EVHUYAZN.js";
import {
  ApiFetchError,
  Spinner_default,
  canAccess,
  indT,
  showPermissionModal
} from "./chunks/chunk-PU3BESI6.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/gastos/tickets/ExpenseTicketsPage.tsx
var import_react7 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/components/ExpenseTicketsFiltersPanel.tsx
var import_react3 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/components/ExpenseProcessedByIaFilterSelect.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ExpenseProcessedByIaFilterSelect = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  showLabel = true
}) => {
  const uiValue = value === "all" ? "" : value;
  const options = (0, import_react.useMemo)(
    () => [
      { value: "all", text: indT("ExpenseSheets_Filter_Status_Both", "All") },
      { value: "yes", text: indT("Tickets_Filter_ProcessedByIA_Yes", "Yes") },
      { value: "no", text: indT("Tickets_Filter_ProcessedByIA_No", "No") }
    ],
    []
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    SelectCombobox_default,
    {
      label,
      placeholder,
      options,
      value: uiValue,
      onChange: (nextValue) => {
        if (nextValue === "yes" || nextValue === "no" || nextValue === "all") {
          onChange(nextValue);
          return;
        }
        onChange("all");
      },
      readOnly,
      disabled,
      idBase: "expense-processed-by-ia-filter",
      portalClassName: "visitas-typography",
      panelClassName: "visitas-typography",
      allowTextInput: false,
      showLabel
    }
  );
};
var ExpenseProcessedByIaFilterSelect_default = ExpenseProcessedByIaFilterSelect;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseTicketFilterKeyInput.tsx
var import_react2 = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var SEARCH_PAGE_SIZE = 30;
var buildTicketSuggestPayload = (term, page, pageSize) => {
  const safeTerm = String(term || "").trim();
  return {
    page: Number.isFinite(page) && page > 0 ? Math.floor(page) : 1,
    pageSize: Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : SEARCH_PAGE_SIZE,
    searchKey: safeTerm || void 0,
    filter: safeTerm || void 0
  };
};
var mapTicketOptions = (items) => {
  return (Array.isArray(items) ? items : []).map((item) => {
    const fileId = String(item?.FileId || "").trim();
    if (!fileId) return null;
    const description = String(item?.Description || "").trim();
    const subtitle = description || "-";
    return {
      value: fileId,
      title: fileId,
      subtitle
    };
  }).filter(Boolean);
};
var ExpenseTicketFilterKeyInput = ({
  label,
  placeholder,
  value,
  onChange,
  enableRemoteSuggestions = true,
  readOnly = false,
  disabled = false,
  showLabel = true
}) => {
  const readOnlyMode = readOnly || disabled;
  const loadOptions = (0, import_react2.useCallback)(async (term, signal) => {
    const payload = buildTicketSuggestPayload(term, 1, SEARCH_PAGE_SIZE);
    const response = await fetchExpenseSheetTicketsList(payload, {
      suppressPermissionModal: true,
      signal
    });
    if (response?.Success === false) {
      return [];
    }
    return mapTicketOptions(response?.Items);
  }, []);
  const loadOptionsPage = (0, import_react2.useCallback)(async (term, page, _pageSize, signal) => {
    const payload = buildTicketSuggestPayload(term, page, SEARCH_PAGE_SIZE);
    const response = await fetchExpenseSheetTicketsList(payload, {
      suppressPermissionModal: true,
      signal
    });
    if (response?.Success === false) {
      return {
        items: [],
        total: 0
      };
    }
    return {
      items: mapTicketOptions(response?.Items),
      total: Number(response?.Total || 0)
    };
  }, []);
  if (!enableRemoteSuggestions || readOnlyMode) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
      showLabel ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "form-label font-semibold", style: { color: "#00296be0" }, children: label }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
      idBase: "expense-ticket-filter-key",
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
var ExpenseTicketFilterKeyInput_default = ExpenseTicketFilterKeyInput;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseTicketsFiltersPanel.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
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
var ExpenseTicketsFiltersPanel = ({
  visible,
  showManualDateFilter,
  manualDateAutoOpenKey,
  fromDate,
  toDate,
  filterKey,
  currencyCode,
  statusFilter,
  gastoTypeFilter,
  processedByIaFilter,
  activeQuickFilter,
  showManualDateError,
  gastoTypeOptions,
  onDateRangeChange,
  onManualRangeComplete,
  onQuickFilterChange,
  onFilterKeyChange,
  onCurrencyCodeChange,
  onStatusFilterChange,
  onGastoTypeFilterChange,
  onProcessedByIaFilterChange,
  onClear,
  onApply
}) => {
  const statusOptions = (0, import_react3.useMemo)(() => getExpenseTicketStatusFilterOptions(), []);
  const categoryOptions = (0, import_react3.useMemo)(() => {
    return [
      { value: "", text: indT("Tickets_Filter_All", "All") },
      ...gastoTypeOptions
    ];
  }, [gastoTypeOptions]);
  if (!visible) return null;
  const locale = document?.documentElement?.lang || "es-ES";
  const showInlineDateSummary = !showManualDateFilter && !!fromDate && !!toDate;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "filter-card filter-card--expanded p-2 sm:p-2.5 relative", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "history-filter-stack flex flex-col space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseQuickDateFilters_default, { activeQuickFilter, onQuickFilterChange }),
    showManualDateFilter ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      ExpenseDateRangeFilter_default,
      {
        fromDate,
        toDate,
        onChange: onDateRangeChange,
        onRangeComplete: onManualRangeComplete,
        autoOpenRequestId: manualDateAutoOpenKey,
        showManualError: showManualDateError,
        showStartError: showManualDateError && !fromDate,
        showEndError: showManualDateError && !toDate
      }
    ) : showInlineDateSummary ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      HistorySummary_default,
      {
        summaryFromLabel: indT("History_From", "From"),
        summaryToLabel: indT("History_To", "To"),
        fromValue: formatDate(fromDate, locale),
        toValue: formatDate(toDate, locale),
        className: "gap-y-1 text-[11px] px-1"
      }
    ) : null,
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        ExpenseTicketFilterKeyInput_default,
        {
          label: indT("Tickets_Filter_FilterKey", "Ticket"),
          placeholder: indT("Tickets_Filter_FilterKey", "Ticket"),
          value: filterKey,
          onChange: onFilterKeyChange,
          enableRemoteSuggestions: true,
          showLabel: false
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        ExpenseCurrencyFilterSelect_default,
        {
          label: indT("ExpenseSheets_Filter_Currency", "Currency"),
          placeholder: indT("ExpenseSheets_Filter_Currency", "Currency"),
          value: currencyCode,
          onChange: onCurrencyCodeChange,
          showLabel: false
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        SelectCombobox_default,
        {
          label: indT("Tickets_Filter_Status", "Status"),
          placeholder: indT("Tickets_Filter_Status", "Status"),
          options: statusOptions,
          value: statusFilter,
          onChange: (nextValue) => onStatusFilterChange(normalizeExpenseTicketStatusFilterCode(nextValue, "")),
          allowTextInput: false,
          idBase: "expense-ticket-status-filter",
          portalClassName: "visitas-typography",
          panelClassName: "visitas-typography",
          showLabel: false
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        SelectCombobox_default,
        {
          label: indT("Tickets_Filter_Category", "Category"),
          placeholder: indT("Tickets_Filter_Category", "Category"),
          options: categoryOptions,
          value: gastoTypeFilter,
          onChange: (nextValue) => {
            const parsed = Number(nextValue);
            if (nextValue === "" || !Number.isInteger(parsed)) {
              onGastoTypeFilterChange("");
              return;
            }
            onGastoTypeFilterChange(parsed);
          },
          allowTextInput: false,
          idBase: "expense-ticket-gastotype-filter",
          portalClassName: "visitas-typography",
          panelClassName: "visitas-typography",
          showLabel: false
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      ExpenseProcessedByIaFilterSelect_default,
      {
        label: indT("Tickets_Filter_ProcessedByIA", "Processed by IA"),
        placeholder: indT("Tickets_Filter_ProcessedByIA", "Processed by IA"),
        value: processedByIaFilter,
        onChange: onProcessedByIaFilterChange,
        showLabel: false
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var ExpenseTicketsFiltersPanel_default = ExpenseTicketsFiltersPanel;

// Web/wwwroot/react/src/pages/gastos/tickets/useExpenseTicketsFiltersState.ts
var import_react4 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/tickets/expenseTicketFilterSnapshot.ts
var ALLOWED_GASTO_TYPES = /* @__PURE__ */ new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);
var normalizeGastoTypeFilter = (value) => {
  if (value === null || value === void 0) {
    return "";
  }
  const raw = String(value).trim();
  if (!raw) {
    return "";
  }
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || !ALLOWED_GASTO_TYPES.has(parsed)) {
    return "";
  }
  return parsed;
};
var normalizeProcessedByIaFilter = (value) => {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "yes") return "yes";
  if (normalized === "no") return "no";
  return "all";
};
var normalizeExpenseTicketFilterSnapshot = (value) => {
  return {
    fromDate: String(value?.fromDate || "").trim(),
    toDate: String(value?.toDate || "").trim(),
    filterKey: String(value?.filterKey || "").trim(),
    currencyCode: String(value?.currencyCode || "").trim(),
    statusFilter: normalizeExpenseTicketStatusFilterCode(value?.statusFilter, ""),
    gastoTypeFilter: normalizeGastoTypeFilter(value?.gastoTypeFilter),
    processedByIaFilter: normalizeProcessedByIaFilter(value?.processedByIaFilter)
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/useExpenseTicketsFiltersState.ts
var useExpenseTicketsFiltersState = ({ onApplyFilters, onClearFilters }) => {
  const [fromDate, setFromDate] = (0, import_react4.useState)("");
  const [toDate, setToDate] = (0, import_react4.useState)("");
  const [filterKey, setFilterKey] = (0, import_react4.useState)("");
  const [currencyCode, setCurrencyCode] = (0, import_react4.useState)("");
  const [statusFilter, setStatusFilter] = (0, import_react4.useState)("");
  const [gastoTypeFilter, setGastoTypeFilter] = (0, import_react4.useState)("");
  const [processedByIaFilter, setProcessedByIaFilter] = (0, import_react4.useState)("all");
  const [activeQuickFilter, setActiveQuickFilter] = (0, import_react4.useState)(null);
  const [showManualDateFilter, setShowManualDateFilter] = (0, import_react4.useState)(false);
  const [showManualDateError, setShowManualDateError] = (0, import_react4.useState)(false);
  const [manualDateAutoOpenKey, setManualDateAutoOpenKey] = (0, import_react4.useState)(0);
  const [appliedFilters, setAppliedFilters] = (0, import_react4.useState)(null);
  const [showFilters, setShowFilters] = (0, import_react4.useState)(true);
  const currentFilters = (0, import_react4.useMemo)(
    () => ({
      fromDate,
      toDate,
      filterKey: filterKey.trim(),
      currencyCode: currencyCode.trim(),
      statusFilter,
      gastoTypeFilter,
      processedByIaFilter
    }),
    [currencyCode, filterKey, fromDate, gastoTypeFilter, processedByIaFilter, statusFilter, toDate]
  );
  const onApply = (0, import_react4.useCallback)(() => {
    if (!fromDate || !toDate) {
      setShowManualDateError(true);
      setShowManualDateFilter(true);
      setActiveQuickFilter("custom");
      return;
    }
    const snapshot = {
      fromDate,
      toDate,
      filterKey: filterKey.trim(),
      currencyCode: currencyCode.trim(),
      statusFilter,
      gastoTypeFilter,
      processedByIaFilter
    };
    setShowManualDateError(false);
    setAppliedFilters(snapshot);
    setShowManualDateFilter(false);
    setShowFilters(false);
    onApplyFilters(snapshot);
  }, [currencyCode, filterKey, fromDate, gastoTypeFilter, onApplyFilters, processedByIaFilter, statusFilter, toDate]);
  const restoreAppliedFilters = (0, import_react4.useCallback)((snapshot) => {
    const normalized = normalizeExpenseTicketFilterSnapshot(snapshot);
    setFromDate(normalized.fromDate);
    setToDate(normalized.toDate);
    setFilterKey(normalized.filterKey);
    setCurrencyCode(normalized.currencyCode);
    setStatusFilter(normalized.statusFilter);
    setGastoTypeFilter(normalized.gastoTypeFilter);
    setProcessedByIaFilter(normalized.processedByIaFilter);
    setActiveQuickFilter(null);
    setShowManualDateFilter(false);
    setShowManualDateError(false);
    setAppliedFilters(normalized);
    setShowFilters(false);
  }, []);
  const onClear = (0, import_react4.useCallback)(() => {
    setFromDate("");
    setToDate("");
    setFilterKey("");
    setCurrencyCode("");
    setStatusFilter("");
    setGastoTypeFilter("");
    setProcessedByIaFilter("all");
    setActiveQuickFilter(null);
    setShowManualDateFilter(false);
    setShowManualDateError(false);
    setManualDateAutoOpenKey(0);
    setAppliedFilters(null);
    setShowFilters(true);
    onClearFilters();
  }, [onClearFilters]);
  const onDateRangeChange = (0, import_react4.useCallback)(
    (nextFromDate, nextToDate) => {
      const hasFullRange = !!nextFromDate && !!nextToDate;
      setFromDate(nextFromDate);
      setToDate(nextToDate);
      if (!hasFullRange) {
        setShowManualDateFilter(true);
      }
      setActiveQuickFilter("custom");
      if (showManualDateError) {
        setShowManualDateError(!hasFullRange);
      }
    },
    [showManualDateError]
  );
  const onManualRangeComplete = (0, import_react4.useCallback)((nextFromDate, nextToDate) => {
    setFromDate(nextFromDate);
    setToDate(nextToDate);
    setActiveQuickFilter("custom");
    setShowManualDateError(false);
    setShowManualDateFilter(false);
  }, []);
  const onQuickFilterChange = (0, import_react4.useCallback)(
    (filterId) => {
      if (filterId === "custom") {
        if (showManualDateFilter) {
          setShowManualDateFilter(false);
          setShowManualDateError(false);
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
    [showManualDateFilter]
  );
  const toggleFilterPanel = (0, import_react4.useCallback)(() => {
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
    filterKey,
    currencyCode,
    statusFilter,
    gastoTypeFilter,
    processedByIaFilter,
    activeQuickFilter,
    showManualDateFilter,
    showManualDateError,
    manualDateAutoOpenKey,
    appliedFilters,
    showFilters,
    currentFilters,
    setFilterKey,
    setCurrencyCode,
    setStatusFilter,
    setGastoTypeFilter,
    setProcessedByIaFilter,
    onApply,
    onClear,
    restoreAppliedFilters,
    onDateRangeChange,
    onManualRangeComplete,
    onQuickFilterChange,
    toggleFilterPanel
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/useExpenseTicketsListData.ts
var import_react5 = __toESM(require_react());
var ALLOWED_GASTO_TYPE_CODES = /* @__PURE__ */ new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);
var toNullableNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};
var toNullableBool = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1 ? true : value === 0 ? false : null;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true" || normalized === "1") return true;
    if (normalized === "false" || normalized === "0") return false;
  }
  return null;
};
var toNullableTicketStatus = (value) => {
  const parsed = Number(value);
  return parsed === 0 || parsed === 1 ? parsed : null;
};
var toNullableTicketGastoType = (value) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || !ALLOWED_GASTO_TYPE_CODES.has(parsed)) {
    return null;
  }
  return parsed;
};
var mapTicketItemToCard = (item) => {
  return {
    fileId: String(item?.FileId || "").trim(),
    description: String(item?.Description || "").trim(),
    status: toNullableTicketStatus(item?.Status),
    hojaGastosIdDisplay: String(item?.HojaGastosIdDisplay ?? item?.hojaGastosIdDisplay ?? "").trim(),
    processedByAI: toNullableBool(item?.ProcessedByAI),
    currencyCode: String(item?.CurrencyCode || "").trim(),
    totalAmount: toNullableNumber(item?.TotalAmount),
    createdByUserId: String(item?.CreatedByUserId || "").trim(),
    transDate: String(item?.TransDate || "").trim(),
    urlFile: String(item?.UrlFile || "").trim(),
    fileName: String(item?.FileName || "").trim(),
    gastoType: toNullableTicketGastoType(item?.GastoType ?? item?.gastoType)
  };
};
var useExpenseTicketsListData = ({ hasAccess, pageSize, onForbidden }) => {
  const [items, setItems] = (0, import_react5.useState)([]);
  const [total, setTotal] = (0, import_react5.useState)(0);
  const [currentPage, setCurrentPage] = (0, import_react5.useState)(1);
  const [isLoading, setIsLoading] = (0, import_react5.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react5.useState)("");
  const restoreListSnapshot = (0, import_react5.useCallback)(
    (snapshot) => {
      const safeItems = Array.isArray(snapshot.items) ? snapshot.items : [];
      const safeTotalRaw = Number(snapshot.total);
      const safeTotal = Number.isFinite(safeTotalRaw) && safeTotalRaw >= 0 ? safeTotalRaw : safeItems.length;
      const safePageRaw = Number(snapshot.page);
      const safePage = Number.isFinite(safePageRaw) && safePageRaw > 0 ? Math.floor(safePageRaw) : 1;
      setItems(safeItems);
      setTotal(safeTotal);
      setCurrentPage(safePage);
      setErrorMessage("");
      setIsLoading(false);
    },
    []
  );
  const loadList = (0, import_react5.useCallback)(
    async (page, filters) => {
      if (!hasAccess) {
        onForbidden();
        return;
      }
      setIsLoading(true);
      setErrorMessage("");
      try {
        const payload = buildExpenseTicketListPayload(filters, page, pageSize);
        const response = await fetchExpenseSheetTicketsList(payload, {
          suppressPermissionModal: true
        });
        if (response?.Success === false) {
          setErrorMessage(response.Message || indT("Tickets_LoadError", "Could not load tickets."));
          setItems([]);
          setTotal(0);
          setCurrentPage(page);
          return;
        }
        const mappedItems = (Array.isArray(response?.Items) ? response.Items : []).map(
          (item) => mapTicketItemToCard(item)
        );
        const responseTotal = Number(response?.Total ?? mappedItems.length ?? 0);
        const nextTotal = responseTotal;
        setItems(mappedItems);
        setTotal(nextTotal);
        setCurrentPage(page);
      } catch (error) {
        if (error instanceof ApiFetchError && error.status === 403) {
          onForbidden();
          return;
        }
        const message = error instanceof Error ? error.message : indT("Tickets_LoadError", "Could not load tickets.");
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
  const resetList = (0, import_react5.useCallback)(() => {
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
    restoreListSnapshot,
    resetList
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/useExpenseTicketsFilterCache.ts
var import_react6 = __toESM(require_react());
var EXPENSE_TICKETS_FILTER_KEY_PREFIX = "expense_tickets_filter_v1";
var EXPENSE_TICKETS_RETURN_FLAG_KEY_PREFIX = "expense_tickets_return_v1";
var EXPENSE_TICKETS_CACHE_TTL_MS = 12 * 60 * 60 * 1e3;
var ALLOWED_TICKET_GASTO_TYPES = /* @__PURE__ */ new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);
var getScopeToken = () => {
  if (typeof window === "undefined") return "session";
  const raw = String(window.__IND_ENTRA_OID__ || "").trim().toLowerCase();
  return raw || "session";
};
var getScopedKeys = () => {
  const scope = getScopeToken();
  return {
    filterKey: `${EXPENSE_TICKETS_FILTER_KEY_PREFIX}_${scope}`,
    returnFlagKey: `${EXPENSE_TICKETS_RETURN_FLAG_KEY_PREFIX}_${scope}`
  };
};
var toNullableNumber2 = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};
var normalizeStatus = (value) => {
  const parsed = Number(value);
  if (parsed === 0 || parsed === 1) return parsed;
  return null;
};
var normalizeProcessedByAi = (value) => {
  if (value === true || value === false) return value;
  if (value === 1 || value === "1" || value === "true") return true;
  if (value === 0 || value === "0" || value === "false") return false;
  return null;
};
var normalizeTicketGastoType = (value) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || !ALLOWED_TICKET_GASTO_TYPES.has(parsed)) {
    return null;
  }
  return parsed;
};
var normalizeItems = (raw) => {
  if (!Array.isArray(raw)) return [];
  return raw.map((entry) => {
    const item = entry || {};
    return {
      fileId: String(item.fileId || "").trim(),
      description: String(item.description || "").trim(),
      status: normalizeStatus(item.status),
      hojaGastosIdDisplay: String(item.hojaGastosIdDisplay || "").trim(),
      processedByAI: normalizeProcessedByAi(item.processedByAI),
      currencyCode: String(item.currencyCode || "").trim(),
      totalAmount: toNullableNumber2(item.totalAmount),
      createdByUserId: String(item.createdByUserId || "").trim(),
      transDate: String(item.transDate || "").trim(),
      urlFile: String(item.urlFile || "").trim(),
      fileName: String(item.fileName || "").trim(),
      gastoType: normalizeTicketGastoType(item.gastoType)
    };
  });
};
var normalizeState = (raw) => {
  if (!raw || typeof raw !== "object") return null;
  const pageRaw = Number(raw.page);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? Math.floor(pageRaw) : 1;
  const scrollRaw = Number(raw.scrollY);
  const scrollY = Number.isFinite(scrollRaw) && scrollRaw >= 0 ? Math.floor(scrollRaw) : 0;
  const items = normalizeItems(raw.items);
  const totalRaw = Number(raw.total);
  const total = Number.isFinite(totalRaw) && totalRaw >= 0 ? totalRaw : items.length;
  return {
    filters: normalizeExpenseTicketFilterSnapshot(raw.filters),
    page,
    scrollY,
    focusFileId: String(raw.focusFileId || "").trim(),
    items,
    total
  };
};
var useExpenseTicketsFilterCache = () => {
  const readCachedState = (0, import_react6.useCallback)(() => {
    const keys = getScopedKeys();
    const raw = getSessionJsonWithExpiry(keys.filterKey);
    return normalizeState(raw);
  }, []);
  const consumeReturnFlag = (0, import_react6.useCallback)(() => {
    const keys = getScopedKeys();
    const raw = getSessionValueWithExpiry(keys.returnFlagKey);
    if (raw === "1") {
      removeSessionValueWithExpiry(keys.returnFlagKey);
      return true;
    }
    return false;
  }, []);
  const saveCachedState = (0, import_react6.useCallback)((state) => {
    const normalized = normalizeState(state);
    if (!normalized) return;
    const keys = getScopedKeys();
    setSessionJsonWithExpiry(keys.filterKey, normalized, EXPENSE_TICKETS_CACHE_TTL_MS);
    setSessionValueWithExpiry(keys.returnFlagKey, "1", EXPENSE_TICKETS_CACHE_TTL_MS);
  }, []);
  const clearCachedState = (0, import_react6.useCallback)(() => {
    const keys = getScopedKeys();
    removeSessionValueWithExpiry(keys.filterKey);
    removeSessionValueWithExpiry(keys.returnFlagKey);
  }, []);
  return {
    readCachedState,
    consumeReturnFlag,
    saveCachedState,
    clearCachedState
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/ExpenseTicketsPage.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var PAGE_SIZE = 10;
var ALLOWED_GASTO_TYPES2 = /* @__PURE__ */ new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);
var GASTO_TYPE_LABEL_KEYS = {
  0: { key: "Enum_None", fallback: "None" },
  1: { key: "Enum_GastoType_Peaje", fallback: "Peaje" },
  2: { key: "Enum_GastoType_Parking", fallback: "Parking" },
  3: { key: "Enum_GastoType_Km", fallback: "Km" },
  4: { key: "Enum_GastoType_Desayuno", fallback: "Desayuno" },
  5: { key: "Enum_GastoType_Comida", fallback: "Comida" },
  6: { key: "Enum_GastoType_Cena", fallback: "Cena" },
  7: { key: "Enum_GastoType_Hotel", fallback: "Hotel" },
  8: { key: "Enum_GastoType_Varios", fallback: "Varios" },
  14: { key: "Enum_GastoType_Taxi", fallback: "Taxi" }
};
var bootstrapExpenseApiAuth = () => {
  configureExpenseApiAuth({
    token: safeText(window.__IND_API_TOKEN__),
    entraOid: safeText(window.__IND_ENTRA_OID__),
    appCode: safeText(window.__IND_APP_CODE__)
  });
};
var buildFallbackGastoTypeOptions = () => {
  return Object.entries(GASTO_TYPE_LABEL_KEYS).map(([code, cfg]) => ({
    value: String(code),
    text: indT(cfg.key, cfg.fallback)
  })).sort((left, right) => Number(left.value) - Number(right.value));
};
var NewTicketIcon = () => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "h-6 w-6", children: [
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 20h-5a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v2" }),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.362 11.15a3 3 0 1 0 -4.144 4.263" }),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 21v-4a2 2 0 1 1 4 0v4" }),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 19h4" }),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 15v6" })
] });
var ExpenseTicketsPageContent = () => {
  const hasAccess = canAccess("GASTOS_TICKETS", "View");
  const canCreateTicket = canAccess("GASTOS_TICKETS", "Add");
  const timelineContainerRef = import_react7.default.useRef(null);
  const cameraInputRef = import_react7.default.useRef(null);
  const galleryInputRef = import_react7.default.useRef(null);
  const didRestoreOnMountRef = import_react7.default.useRef(false);
  const didApplyQueryFilterRef = import_react7.default.useRef(false);
  const pendingScrollRestoreRef = import_react7.default.useRef(null);
  const pendingFocusFileIdRef = import_react7.default.useRef("");
  const paginationLabels = (0, import_react7.useMemo)(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last")
    }),
    []
  );
  const gastoTypeOptions = (0, import_react7.useMemo)(() => {
    const source = Array.isArray(window.__EXPENSE_GASTO_TYPES__) ? window.__EXPENSE_GASTO_TYPES__ : [];
    const mapped = mapWindowEnumOptions(source).filter((entry) => {
      const parsed = Number(entry.value);
      return Number.isInteger(parsed) && ALLOWED_GASTO_TYPES2.has(parsed);
    });
    if (mapped.length > 0) {
      return mapped.sort((left, right) => Number(left.value) - Number(right.value));
    }
    return buildFallbackGastoTypeOptions();
  }, []);
  const gastoTypeLabelMap = (0, import_react7.useMemo)(() => {
    const map = /* @__PURE__ */ new Map();
    for (const option of gastoTypeOptions) {
      map.set(String(option.value), option.text);
    }
    return map;
  }, [gastoTypeOptions]);
  const {
    items,
    total,
    currentPage,
    isLoading,
    errorMessage,
    loadList,
    restoreListSnapshot,
    resetList
  } = useExpenseTicketsListData({
    hasAccess,
    pageSize: PAGE_SIZE,
    onForbidden: showPermissionModal
  });
  const { readCachedState, consumeReturnFlag, saveCachedState, clearCachedState } = useExpenseTicketsFilterCache();
  const {
    fromDate,
    toDate,
    filterKey,
    currencyCode,
    statusFilter,
    gastoTypeFilter,
    processedByIaFilter,
    activeQuickFilter,
    showManualDateFilter,
    showManualDateError,
    manualDateAutoOpenKey,
    appliedFilters,
    showFilters,
    currentFilters,
    setFilterKey,
    setCurrencyCode,
    setStatusFilter,
    setGastoTypeFilter,
    setProcessedByIaFilter,
    onApply,
    onClear,
    restoreAppliedFilters,
    onDateRangeChange,
    onManualRangeComplete,
    onQuickFilterChange,
    toggleFilterPanel
  } = useExpenseTicketsFiltersState({
    onApplyFilters: (snapshot) => {
      void loadList(1, snapshot);
    },
    onClearFilters: () => {
      clearCachedState();
      resetList();
    }
  });
  const {
    sourcePickerOpen,
    busy: quickTicketBusy,
    progressMessage: quickTicketProgressMessage,
    errorMessage: quickTicketErrorMessage,
    hasPendingUploadRetry,
    traceList: quickTicketTraceList,
    openSourcePicker,
    closeSourcePicker,
    selectFromCamera,
    selectFromGallery,
    handleSelectedFile,
    retryPendingUpload,
    clearError: clearQuickTicketError
  } = useExpenseSheetQuickTicketFlow({
    canCreateExpense: canCreateTicket,
    isCreateMode: false,
    isSheetLocked: false,
    linkToSheet: false,
    currencyCode: currencyCode || "EUR",
    onForbidden: showPermissionModal,
    onCompleted: (result) => {
      const createdFileId = safeText(result?.fileId);
      if (!createdFileId) return;
      navigateToExpenseUrl(`/Gastos/TicketDetail?fileId=${encodeURIComponent(createdFileId)}&mode=edit`, {
        askConfirmation: false
      });
    }
  });
  const fabMenuItems = (0, import_react7.useMemo)(
    () => [
      {
        id: "new-ticket",
        label: indT("ExpenseSheets_Fab_NewTicket", "Nuevo Ticket"),
        icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(NewTicketIcon, {}),
        onClick: openSourcePicker
      }
    ],
    [openSourcePicker]
  );
  const openTicketDetail = (0, import_react7.useCallback)(
    (rawFileId) => {
      const fileId = safeText(rawFileId);
      if (!fileId) return;
      const snapshot = appliedFilters || currentFilters;
      saveCachedState({
        filters: snapshot,
        page: currentPage < 1 ? 1 : currentPage,
        scrollY: typeof window !== "undefined" ? window.scrollY || 0 : 0,
        focusFileId: fileId,
        items,
        total
      });
      navigateToExpenseUrl(`/Gastos/TicketDetail?fileId=${encodeURIComponent(fileId)}`, {
        askConfirmation: true,
        bypassGuardOnce: false
      });
    },
    [appliedFilters, currentPage, currentFilters, items, saveCachedState, total]
  );
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
  const summaryItems = (0, import_react7.useMemo)(() => {
    const snapshot = appliedFilters;
    if (!snapshot) return [];
    const summary = [];
    const locale = document?.documentElement?.lang || "es-ES";
    const fromDateText = formatExpenseDisplayDate(snapshot.fromDate, locale, "");
    const toDateText = formatExpenseDisplayDate(snapshot.toDate, locale, "");
    if (fromDateText || toDateText) {
      summary.push({
        key: "fromDate",
        label: indT("History_From", "From"),
        value: fromDateText || "--"
      });
      summary.push({
        key: "toDate",
        label: indT("History_To", "To"),
        value: toDateText || "--"
      });
    }
    if (snapshot.filterKey.trim()) {
      summary.push({
        key: "filterKey",
        label: indT("Tickets_Filter_FilterKey", "Ticket"),
        value: snapshot.filterKey.trim()
      });
    }
    if (snapshot.currencyCode.trim()) {
      summary.push({
        key: "currency",
        label: indT("ExpenseSheets_Filter_Currency", "Currency"),
        value: snapshot.currencyCode.trim()
      });
    }
    if (snapshot.statusFilter !== "") {
      summary.push({
        key: "status",
        label: indT("Tickets_Filter_Status", "Status"),
        value: getExpenseTicketStatusLabel(snapshot.statusFilter)
      });
    }
    if (snapshot.gastoTypeFilter !== "") {
      const categoryLabel = gastoTypeLabelMap.get(String(snapshot.gastoTypeFilter)) || String(snapshot.gastoTypeFilter);
      summary.push({
        key: "category",
        label: indT("Tickets_Filter_Category", "Category"),
        value: categoryLabel
      });
    }
    if (snapshot.processedByIaFilter !== "all") {
      summary.push({
        key: "processed",
        label: indT("Tickets_Filter_ProcessedByIA", "Processed by IA"),
        value: snapshot.processedByIaFilter === "yes" ? indT("Tickets_Filter_ProcessedByIA_Yes", "Yes") : indT("Tickets_Filter_ProcessedByIA_No", "No")
      });
    }
    return summary;
  }, [appliedFilters, gastoTypeLabelMap]);
  const showSummary = !showFilters && summaryItems.length > 0;
  (0, import_react7.useEffect)(() => {
    if (didApplyQueryFilterRef.current) return;
    didApplyQueryFilterRef.current = true;
    const url = new URL(window.location.href);
    const ticketFileId = safeText(url.searchParams.get("ticketFileId"));
    if (!ticketFileId) return;
    const querySnapshot = {
      fromDate: "",
      toDate: "",
      filterKey: ticketFileId,
      currencyCode: "",
      statusFilter: "",
      gastoTypeFilter: "",
      processedByIaFilter: "all"
    };
    clearCachedState();
    restoreAppliedFilters(querySnapshot);
    pendingFocusFileIdRef.current = ticketFileId;
    void loadList(1, querySnapshot);
    url.searchParams.delete("ticketFileId");
    const cleanedQuery = url.searchParams.toString();
    window.history.replaceState({}, "", cleanedQuery ? `${url.pathname}?${cleanedQuery}` : url.pathname);
  }, [clearCachedState, loadList, restoreAppliedFilters]);
  (0, import_react7.useEffect)(() => {
    if (didRestoreOnMountRef.current) return;
    didRestoreOnMountRef.current = true;
    if (!consumeReturnFlag()) {
      clearCachedState();
      return;
    }
    const cachedState = readCachedState();
    if (!cachedState) {
      clearCachedState();
      return;
    }
    restoreAppliedFilters(cachedState.filters);
    pendingScrollRestoreRef.current = cachedState.scrollY;
    pendingFocusFileIdRef.current = cachedState.focusFileId;
    if (cachedState.items.length > 0 || cachedState.total > 0) {
      restoreListSnapshot({
        items: cachedState.items,
        total: cachedState.total,
        page: cachedState.page
      });
      return;
    }
    void loadList(cachedState.page, cachedState.filters);
  }, [clearCachedState, consumeReturnFlag, loadList, readCachedState, restoreAppliedFilters, restoreListSnapshot]);
  (0, import_react7.useEffect)(() => {
    if (isLoading) return;
    if (pendingScrollRestoreRef.current == null && !pendingFocusFileIdRef.current) return;
    const pendingScrollY = pendingScrollRestoreRef.current;
    const pendingFocusFileId = pendingFocusFileIdRef.current;
    pendingScrollRestoreRef.current = null;
    pendingFocusFileIdRef.current = "";
    window.requestAnimationFrame(() => {
      if (pendingScrollY != null) {
        window.scrollTo({
          top: Math.max(0, pendingScrollY),
          behavior: "auto"
        });
      }
      if (!pendingFocusFileId || !timelineContainerRef.current) return;
      const normalizedFocusId = pendingFocusFileId.toUpperCase();
      const timelineItems = Array.from(
        timelineContainerRef.current.querySelectorAll(".timeline-item[data-ticket-file-id]")
      );
      const matchingItem = timelineItems.find((item) => {
        return safeText(item.dataset.ticketFileId).toUpperCase() === normalizedFocusId;
      });
      const targetCard = matchingItem?.querySelector(".timeline-card--clickable");
      if (!targetCard) return;
      targetCard.focus({ preventScroll: true });
    });
  }, [isLoading, items.length]);
  (0, import_react7.useEffect)(() => {
    const onToggleFilters = () => {
      const willOpen = !showFilters;
      toggleFilterPanel();
      if (willOpen) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    const onRefresh = () => {
      if (!appliedFilters?.fromDate || !appliedFilters?.toDate) {
        return;
      }
      void loadList(currentPage < 1 ? 1 : currentPage, appliedFilters);
    };
    window.addEventListener("expense-tickets-toggle-filter", onToggleFilters);
    window.addEventListener("expense-tickets-refresh", onRefresh);
    return () => {
      window.removeEventListener("expense-tickets-toggle-filter", onToggleFilters);
      window.removeEventListener("expense-tickets-refresh", onRefresh);
    };
  }, [appliedFilters, currentPage, loadList, showFilters, toggleFilterPanel]);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "input",
      {
        ref: cameraInputRef,
        type: "file",
        accept: "image/jpeg,image/jpg,image/png,image/webp",
        capture: "environment",
        className: "hidden",
        onChange: (event) => {
          const file = event.currentTarget.files?.[0] || null;
          event.currentTarget.value = "";
          void handleSelectedFile(file, "camera");
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "input",
      {
        ref: galleryInputRef,
        type: "file",
        accept: "image/jpeg,image/jpg,image/png,image/webp",
        className: "hidden",
        onChange: (event) => {
          const file = event.currentTarget.files?.[0] || null;
          event.currentTarget.value = "";
          void handleSelectedFile(file, "gallery");
        }
      }
    ),
    sourcePickerOpen ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/45 px-4 py-6", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-xl", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { className: "text-[16px] font-semibold text-slate-800", children: indT("ExpenseSheets_NewTicket_Source_Title", "Nuevo ticket") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "mt-1 text-sm text-slate-600", children: indT(
        "ExpenseSheets_NewTicket_Source_Body",
        "Selecciona una fuente para capturar o elegir la imagen del ticket."
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mt-4 grid grid-cols-1 gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            type: "button",
            className: "ind-action-btn w-full px-3 py-2 text-sm",
            onClick: () => {
              void selectFromCamera(cameraInputRef.current);
            },
            children: indT("ExpenseSheets_NewTicket_Source_Camera", "Usar camara")
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            type: "button",
            className: "ind-action-btn w-full px-3 py-2 text-sm",
            onClick: () => selectFromGallery(galleryInputRef.current),
            children: indT("ExpenseSheets_NewTicket_Source_Gallery", "Elegir imagen")
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            type: "button",
            className: "ind-action-btn w-full px-3 py-2 text-sm",
            onClick: closeSourcePicker,
            children: indT("Common_Cancel", "Cancel")
          }
        )
      ] })
    ] }) }) : null,
    quickTicketBusy ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/35 px-4", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "glass-panel shadow-card flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-700", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Spinner_default, { size: "h-5 w-5", label: indT("Common_Loading", "Loading") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: quickTicketProgressMessage || indT("Common_Loading", "Loading") })
    ] }) }) : null,
    quickTicketErrorMessage ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "glass-panel shadow-card space-y-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: quickTicketErrorMessage }),
      quickTicketTraceList.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "rounded-lg border border-rose-200 bg-white p-2 text-xs text-rose-700", children: quickTicketTraceList.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: `${entry.step}: ${entry.traceId}` }, `${entry.step}-${entry.at}`)) }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-wrap gap-2", children: [
        hasPendingUploadRetry ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            type: "button",
            className: "ind-action-btn px-3 py-1.5 text-xs",
            onClick: () => {
              void retryPendingUpload();
            },
            children: indT("ExpenseSheets_NewTicket_RetryUpload", "Reintentar upload")
          }
        ) : null,
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "ind-action-btn px-3 py-1.5 text-xs", onClick: clearQuickTicketError, children: indT("Common_Close", "Close") })
      ] })
    ] }) : null,
    showSummary ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "filter-card filter-card--summary p-3 sm:p-4 mt-1 mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "expense-summary-grid grid grid-cols-1 min-[360px]:grid-cols-2 items-start gap-x-4 gap-y-1 text-xs", children: summaryItems.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "div",
      {
        className: "history-filter-summary history-filter-summary--grid-item leading-5 min-w-0",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "history-filter-summary__label font-semibold", children: [
            item.label,
            ":"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "history-filter-summary__value break-words", children: item.value })
        ]
      },
      `${item.key}-${item.value}-${index}`
    )) }) }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      ExpenseTicketsFiltersPanel_default,
      {
        visible: showFilters,
        showManualDateFilter,
        manualDateAutoOpenKey,
        fromDate,
        toDate,
        filterKey,
        currencyCode,
        statusFilter,
        gastoTypeFilter,
        processedByIaFilter,
        activeQuickFilter,
        showManualDateError,
        gastoTypeOptions,
        onDateRangeChange,
        onManualRangeComplete,
        onQuickFilterChange,
        onFilterKeyChange: setFilterKey,
        onCurrencyCodeChange: setCurrencyCode,
        onStatusFilterChange: setStatusFilter,
        onGastoTypeFilterChange: setGastoTypeFilter,
        onProcessedByIaFilterChange: setProcessedByIaFilter,
        onClear,
        onApply
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "div",
      {
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: isLoading ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-danger", children: errorMessage }) : null,
    !isLoading && !errorMessage && items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "timeline-box timeline-empty", "data-empty-text": indT("Common_NoData", "No data") }) : null,
    !errorMessage && items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ref: timelineContainerRef, className: "timeline-box", children: items.map((item, index) => {
      const fileId = safeText(item.fileId);
      const dateParts = formatExpenseDateParts(item.transDate, document?.documentElement?.lang || "es-ES");
      const title = safeText(item.description) || safeText(item.fileName) || fileId || "-";
      const amountText = formatAmountWithCurrency(item.totalAmount ?? null, safeText(item.currencyCode));
      const statusCode = item.status;
      const statusLabel = getExpenseTicketStatusLabel(statusCode);
      const isAssignedToExpenseSheet = statusCode === 1;
      const showProcessedByAiIcon = item.processedByAI === true;
      const processedByAiLabel = indT("Tickets_Filter_ProcessedByIA", "Processed by IA");
      const gastoTypeCode = item.gastoType === null ? "" : String(item.gastoType);
      const gastoTypeLabel = gastoTypeCode ? gastoTypeLabelMap.get(gastoTypeCode) || gastoTypeCode : indT("Common_NotAvailable", "N/A");
      const cardSubtitle = gastoTypeLabel;
      const statusIcons = isAssignedToExpenseSheet || showProcessedByAiIcon ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
        isAssignedToExpenseSheet ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "expense-ticket-card__status-icon", role: "img", "aria-label": statusLabel, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "h-4 w-4", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
          }
        ) }) }) : null,
        showProcessedByAiIcon ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "span",
          {
            className: "expense-ticket-card__status-icon expense-ticket-card__status-icon--ai",
            role: "img",
            "aria-label": processedByAiLabel,
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "h-4 w-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 18l4-12l4 12" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 13h4" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 6h6" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M17 6v12" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 18h6" })
            ] })
          }
        ) : null
      ] }) : null;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "timeline-item", "data-ticket-file-id": fileId || void 0, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ExpenseTimelineCard_default,
        {
          dateParts,
          title,
          subtitle: cardSubtitle,
          amountText,
          onOpen: () => openTicketDetail(fileId),
          titleClassName: "expense-ticket-card__title timeline-name",
          statusLabel,
          statusIcon: statusIcons,
          statusIconClassName: "expense-ticket-card__status-icons"
        }
      ) }, `${fileId}-${index}`);
    }) }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      CompactPagination_default,
      {
        totalPages,
        currentPage,
        loading: isLoading,
        onPageChange: (page) => {
          if (!appliedFilters?.fromDate || !appliedFilters?.toDate) {
            return;
          }
          void loadList(page, appliedFilters);
        },
        labels: paginationLabels
      }
    ),
    canCreateTicket ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      FloatingActionButton_default,
      {
        ariaLabel: indT("ExpenseSheets_Fab_Actions", "Acciones rapidas"),
        size: 76,
        right: 16,
        bottom: 24,
        menuAriaLabel: indT("ExpenseSheets_Fab_Actions", "Acciones rapidas"),
        menuItems: fabMenuItems
      }
    ) : null
  ] });
};
var ExpenseTicketsPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(VisitasPageProviders_default, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExpenseTicketsPageContent, {}) });
};
var mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-tickets-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExpenseTicketsPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseTicketsPage_default = ExpenseTicketsPage;
export {
  ExpenseTicketsPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL0V4cGVuc2VUaWNrZXRzUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90LnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0c0xpc3REYXRhLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcbmltcG9ydCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgeyB0eXBlIEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW0gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeFwiO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TcGlubmVyLnRzeFwiO1xuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XG5pbXBvcnQgeyB1c2VUaW1lbGluZUNhcmRFZmZlY3RzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRpbWVsaW5lQ2FyZEVmZmVjdHMudHNcIjtcbmltcG9ydCBFeHBlbnNlVGltZWxpbmVDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWwgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWwudHN4XCI7XG5pbXBvcnQgeyBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgfSBmcm9tIFwiLi4vZXhwZW5zZUZvcm1hdHRlcnMudHNcIjtcbmltcG9ydCB7IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcbmltcG9ydCB7IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyBtYXBXaW5kb3dFbnVtT3B0aW9ucywgdHlwZSBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzLCBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cgfSBmcm9tIFwiLi4vZGV0YWlsL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdy50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGEudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5cbmNvbnN0IFBBR0VfU0laRSA9IDEwO1xuY29uc3QgQUxMT1dFRF9HQVNUT19UWVBFUyA9IG5ldyBTZXQ8bnVtYmVyPihbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTRdKTtcblxuY29uc3QgR0FTVE9fVFlQRV9MQUJFTF9LRVlTOiBSZWNvcmQ8bnVtYmVyLCB7IGtleTogc3RyaW5nOyBmYWxsYmFjazogc3RyaW5nIH0+ID0ge1xuICAwOiB7IGtleTogXCJFbnVtX05vbmVcIiwgZmFsbGJhY2s6IFwiTm9uZVwiIH0sXG4gIDE6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1BlYWplXCIsIGZhbGxiYWNrOiBcIlBlYWplXCIgfSxcbiAgMjogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfUGFya2luZ1wiLCBmYWxsYmFjazogXCJQYXJraW5nXCIgfSxcbiAgMzogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfS21cIiwgZmFsbGJhY2s6IFwiS21cIiB9LFxuICA0OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9EZXNheXVub1wiLCBmYWxsYmFjazogXCJEZXNheXVub1wiIH0sXG4gIDU6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0NvbWlkYVwiLCBmYWxsYmFjazogXCJDb21pZGFcIiB9LFxuICA2OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9DZW5hXCIsIGZhbGxiYWNrOiBcIkNlbmFcIiB9LFxuICA3OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9Ib3RlbFwiLCBmYWxsYmFjazogXCJIb3RlbFwiIH0sXG4gIDg6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1Zhcmlvc1wiLCBmYWxsYmFjazogXCJWYXJpb3NcIiB9LFxuICAxNDogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfVGF4aVwiLCBmYWxsYmFjazogXCJUYXhpXCIgfSxcbn07XG5cbi8vIEluaXRpYWxpemVzIGF1dGggc2VlZCBmb3IgZXhwZW5zZSBBUEkgY2FsbHMgYmVmb3JlIGlzbGFuZCBlZmZlY3RzIHJ1bi5cbmNvbnN0IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoID0gKCkgPT4ge1xuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCh7XG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXG4gICAgYXBwQ29kZTogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxuICB9KTtcbn07XG5cbmNvbnN0IGJ1aWxkRmFsbGJhY2tHYXN0b1R5cGVPcHRpb25zID0gKCk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XG4gIHJldHVybiBPYmplY3QuZW50cmllcyhHQVNUT19UWVBFX0xBQkVMX0tFWVMpXG4gICAgLm1hcCgoW2NvZGUsIGNmZ10pID0+ICh7XG4gICAgICB2YWx1ZTogU3RyaW5nKGNvZGUpLFxuICAgICAgdGV4dDogaW5kVChjZmcua2V5LCBjZmcuZmFsbGJhY2spLFxuICAgIH0pKVxuICAgIC5zb3J0KChsZWZ0LCByaWdodCkgPT4gTnVtYmVyKGxlZnQudmFsdWUpIC0gTnVtYmVyKHJpZ2h0LnZhbHVlKSk7XG59O1xuXG5jb25zdCBOZXdUaWNrZXRJY29uID0gKCkgPT4gKFxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cImgtNiB3LTZcIj5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMCAyMGgtNWEyIDIgMCAwIDEgLTIgLTJ2LTlhMiAyIDAgMCAxIDIgLTJoMWEyIDIgMCAwIDAgMiAtMmExIDEgMCAwIDEgMSAtMWg2YTEgMSAwIDAgMSAxIDFhMiAyIDAgMCAwIDIgMmgxYTIgMiAwIDAgMSAyIDJ2MlwiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQuMzYyIDExLjE1YTMgMyAwIDEgMCAtNC4xNDQgNC4yNjNcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDIxdi00YTIgMiAwIDEgMSA0IDB2NFwiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMTloNFwiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMjEgMTV2NlwiIC8+XG4gIDwvc3ZnPlxuKTtcblxuY29uc3QgRXhwZW5zZVRpY2tldHNQYWdlQ29udGVudCA9ICgpID0+IHtcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJWaWV3XCIpO1xuICBjb25zdCBjYW5DcmVhdGVUaWNrZXQgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIkFkZFwiKTtcbiAgY29uc3QgdGltZWxpbmVDb250YWluZXJSZWYgPSBSZWFjdC51c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgY2FtZXJhSW5wdXRSZWYgPSBSZWFjdC51c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBnYWxsZXJ5SW5wdXRSZWYgPSBSZWFjdC51c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBkaWRSZXN0b3JlT25Nb3VudFJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IGRpZEFwcGx5UXVlcnlGaWx0ZXJSZWYgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xuICBjb25zdCBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZiA9IFJlYWN0LnVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmID0gUmVhY3QudXNlUmVmKFwiXCIpO1xuXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxuICAgICgpID0+ICh7XG4gICAgICBmaXJzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9GaXJzdFwiLCBcIkZpcnN0XCIpLFxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXG4gICAgICBuZXh0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpLFxuICAgICAgbGFzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKSxcbiAgICB9KSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IGdhc3RvVHlwZU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4ge1xuICAgIGNvbnN0IHNvdXJjZSA9IEFycmF5LmlzQXJyYXkod2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fKSA/IHdpbmRvdy5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXyA6IFtdO1xuICAgIGNvbnN0IG1hcHBlZCA9IG1hcFdpbmRvd0VudW1PcHRpb25zKHNvdXJjZSkuZmlsdGVyKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKGVudHJ5LnZhbHVlKTtcbiAgICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgQUxMT1dFRF9HQVNUT19UWVBFUy5oYXMocGFyc2VkKTtcbiAgICB9KTtcblxuICAgIGlmIChtYXBwZWQubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIG1hcHBlZC5zb3J0KChsZWZ0LCByaWdodCkgPT4gTnVtYmVyKGxlZnQudmFsdWUpIC0gTnVtYmVyKHJpZ2h0LnZhbHVlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1aWxkRmFsbGJhY2tHYXN0b1R5cGVPcHRpb25zKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBnYXN0b1R5cGVMYWJlbE1hcCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgZ2FzdG9UeXBlT3B0aW9ucykge1xuICAgICAgbWFwLnNldChTdHJpbmcob3B0aW9uLnZhbHVlKSwgb3B0aW9uLnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gbWFwO1xuICB9LCBbZ2FzdG9UeXBlT3B0aW9uc10pO1xuXG4gIGNvbnN0IHtcbiAgICBpdGVtcyxcbiAgICB0b3RhbCxcbiAgICBjdXJyZW50UGFnZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGxvYWRMaXN0LFxuICAgIHJlc3RvcmVMaXN0U25hcHNob3QsXG4gICAgcmVzZXRMaXN0LFxuICB9ID0gdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YSh7XG4gICAgaGFzQWNjZXNzLFxuICAgIHBhZ2VTaXplOiBQQUdFX1NJWkUsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgY29uc3VtZVJldHVybkZsYWcsIHNhdmVDYWNoZWRTdGF0ZSwgY2xlYXJDYWNoZWRTdGF0ZSB9ID0gdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZSgpO1xuXG4gIGNvbnN0IHtcbiAgICBmcm9tRGF0ZSxcbiAgICB0b0RhdGUsXG4gICAgZmlsdGVyS2V5LFxuICAgIGN1cnJlbmN5Q29kZSxcbiAgICBzdGF0dXNGaWx0ZXIsXG4gICAgZ2FzdG9UeXBlRmlsdGVyLFxuICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVFcnJvcixcbiAgICBtYW51YWxEYXRlQXV0b09wZW5LZXksXG4gICAgYXBwbGllZEZpbHRlcnMsXG4gICAgc2hvd0ZpbHRlcnMsXG4gICAgY3VycmVudEZpbHRlcnMsXG4gICAgc2V0RmlsdGVyS2V5LFxuICAgIHNldEN1cnJlbmN5Q29kZSxcbiAgICBzZXRTdGF0dXNGaWx0ZXIsXG4gICAgc2V0R2FzdG9UeXBlRmlsdGVyLFxuICAgIHNldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gICAgb25BcHBseSxcbiAgICBvbkNsZWFyLFxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcbiAgICBvbkRhdGVSYW5nZUNoYW5nZSxcbiAgICBvbk1hbnVhbFJhbmdlQ29tcGxldGUsXG4gICAgb25RdWlja0ZpbHRlckNoYW5nZSxcbiAgICB0b2dnbGVGaWx0ZXJQYW5lbCxcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlKHtcbiAgICBvbkFwcGx5RmlsdGVyczogKHNuYXBzaG90KSA9PiB7XG4gICAgICB2b2lkIGxvYWRMaXN0KDEsIHNuYXBzaG90KTtcbiAgICB9LFxuICAgIG9uQ2xlYXJGaWx0ZXJzOiAoKSA9PiB7XG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgICByZXNldExpc3QoKTtcbiAgICB9LFxuICB9KTtcblxuICBjb25zdCB7XG4gICAgc291cmNlUGlja2VyT3BlbixcbiAgICBidXN5OiBxdWlja1RpY2tldEJ1c3ksXG4gICAgcHJvZ3Jlc3NNZXNzYWdlOiBxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSxcbiAgICBlcnJvck1lc3NhZ2U6IHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlLFxuICAgIGhhc1BlbmRpbmdVcGxvYWRSZXRyeSxcbiAgICB0cmFjZUxpc3Q6IHF1aWNrVGlja2V0VHJhY2VMaXN0LFxuICAgIG9wZW5Tb3VyY2VQaWNrZXIsXG4gICAgY2xvc2VTb3VyY2VQaWNrZXIsXG4gICAgc2VsZWN0RnJvbUNhbWVyYSxcbiAgICBzZWxlY3RGcm9tR2FsbGVyeSxcbiAgICBoYW5kbGVTZWxlY3RlZEZpbGUsXG4gICAgcmV0cnlQZW5kaW5nVXBsb2FkLFxuICAgIGNsZWFyRXJyb3I6IGNsZWFyUXVpY2tUaWNrZXRFcnJvcixcbiAgfSA9IHVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdyh7XG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogY2FuQ3JlYXRlVGlja2V0LFxuICAgIGlzQ3JlYXRlTW9kZTogZmFsc2UsXG4gICAgaXNTaGVldExvY2tlZDogZmFsc2UsXG4gICAgbGlua1RvU2hlZXQ6IGZhbHNlLFxuICAgIGN1cnJlbmN5Q29kZTogY3VycmVuY3lDb2RlIHx8IFwiRVVSXCIsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gICAgb25Db21wbGV0ZWQ6IChyZXN1bHQpID0+IHtcbiAgICAgIGNvbnN0IGNyZWF0ZWRGaWxlSWQgPSBzYWZlVGV4dChyZXN1bHQ/LmZpbGVJZCk7XG4gICAgICBpZiAoIWNyZWF0ZWRGaWxlSWQpIHJldHVybjtcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD9maWxlSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoY3JlYXRlZEZpbGVJZCl9Jm1vZGU9ZWRpdGAsIHtcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH0sXG4gIH0pO1xuXG4gIGNvbnN0IGZhYk1lbnVJdGVtcyA9IHVzZU1lbW88RmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbVtdPihcbiAgICAoKSA9PiBbXG4gICAgICB7XG4gICAgICAgIGlkOiBcIm5ldy10aWNrZXRcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9OZXdUaWNrZXRcIiwgXCJOdWV2byBUaWNrZXRcIiksXG4gICAgICAgIGljb246IDxOZXdUaWNrZXRJY29uIC8+LFxuICAgICAgICBvbkNsaWNrOiBvcGVuU291cmNlUGlja2VyLFxuICAgICAgfSxcbiAgICBdLFxuICAgIFtvcGVuU291cmNlUGlja2VyXVxuICApO1xuXG4gIGNvbnN0IG9wZW5UaWNrZXREZXRhaWwgPSB1c2VDYWxsYmFjayhcbiAgICAocmF3RmlsZUlkOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KHJhd0ZpbGVJZCk7XG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBzbmFwc2hvdCA9IGFwcGxpZWRGaWx0ZXJzIHx8IGN1cnJlbnRGaWx0ZXJzO1xuICAgICAgc2F2ZUNhY2hlZFN0YXRlKHtcbiAgICAgICAgZmlsdGVyczogc25hcHNob3QsXG4gICAgICAgIHBhZ2U6IGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSxcbiAgICAgICAgc2Nyb2xsWTogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5zY3JvbGxZIHx8IDAgOiAwLFxuICAgICAgICBmb2N1c0ZpbGVJZDogZmlsZUlkLFxuICAgICAgICBpdGVtcyxcbiAgICAgICAgdG90YWwsXG4gICAgICB9KTtcblxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsP2ZpbGVJZD0ke2VuY29kZVVSSUNvbXBvbmVudChmaWxlSWQpfWAsIHtcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiB0cnVlLFxuICAgICAgICBieXBhc3NHdWFyZE9uY2U6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbYXBwbGllZEZpbHRlcnMsIGN1cnJlbnRQYWdlLCBjdXJyZW50RmlsdGVycywgaXRlbXMsIHNhdmVDYWNoZWRTdGF0ZSwgdG90YWxdXG4gICk7XG5cbiAgY29uc3QgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgPSB1c2VDYWxsYmFjaygodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcbiAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBjYXJkID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XG4gICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIXRpbWVsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY2FyZDtcbiAgfSwgW10pO1xuXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoe1xuICAgIGNvbnRhaW5lclJlZjogdGltZWxpbmVDb250YWluZXJSZWYsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGl0ZW1zLFxuICAgIHJlc29sdmVDbGlja2FibGVDYXJkLFxuICB9KTtcblxuICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKCh0b3RhbCB8fCAwKSAvIFBBR0VfU0laRSk7XG5cbiAgY29uc3Qgc3VtbWFyeUl0ZW1zID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3Qgc25hcHNob3QgPSBhcHBsaWVkRmlsdGVycztcbiAgICBpZiAoIXNuYXBzaG90KSByZXR1cm4gW10gYXMgQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9PjtcblxuICAgIGNvbnN0IHN1bW1hcnk6IEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfT4gPSBbXTtcbiAgICBjb25zdCBsb2NhbGUgPSBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIjtcbiAgICBjb25zdCBmcm9tRGF0ZVRleHQgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoc25hcHNob3QuZnJvbURhdGUsIGxvY2FsZSwgXCJcIik7XG4gICAgY29uc3QgdG9EYXRlVGV4dCA9IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShzbmFwc2hvdC50b0RhdGUsIGxvY2FsZSwgXCJcIik7XG5cbiAgICBpZiAoZnJvbURhdGVUZXh0IHx8IHRvRGF0ZVRleHQpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJmcm9tRGF0ZVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIiksXG4gICAgICAgIHZhbHVlOiBmcm9tRGF0ZVRleHQgfHwgXCItLVwiLFxuICAgICAgfSk7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwidG9EYXRlXCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpLFxuICAgICAgICB2YWx1ZTogdG9EYXRlVGV4dCB8fCBcIi0tXCIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc25hcHNob3QuZmlsdGVyS2V5LnRyaW0oKSkge1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcImZpbHRlcktleVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0ZpbHRlcktleVwiLCBcIlRpY2tldFwiKSxcbiAgICAgICAgdmFsdWU6IHNuYXBzaG90LmZpbHRlcktleS50cmltKCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc25hcHNob3QuY3VycmVuY3lDb2RlLnRyaW0oKSkge1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcImN1cnJlbmN5XCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKSxcbiAgICAgICAgdmFsdWU6IHNuYXBzaG90LmN1cnJlbmN5Q29kZS50cmltKCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc25hcHNob3Quc3RhdHVzRmlsdGVyICE9PSBcIlwiKSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwic3RhdHVzXCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzXCIsIFwiU3RhdHVzXCIpLFxuICAgICAgICB2YWx1ZTogZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsKHNuYXBzaG90LnN0YXR1c0ZpbHRlciksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc25hcHNob3QuZ2FzdG9UeXBlRmlsdGVyICE9PSBcIlwiKSB7XG4gICAgICBjb25zdCBjYXRlZ29yeUxhYmVsID0gZ2FzdG9UeXBlTGFiZWxNYXAuZ2V0KFN0cmluZyhzbmFwc2hvdC5nYXN0b1R5cGVGaWx0ZXIpKSB8fCBTdHJpbmcoc25hcHNob3QuZ2FzdG9UeXBlRmlsdGVyKTtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJjYXRlZ29yeVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIiksXG4gICAgICAgIHZhbHVlOiBjYXRlZ29yeUxhYmVsLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNuYXBzaG90LnByb2Nlc3NlZEJ5SWFGaWx0ZXIgIT09IFwiYWxsXCIpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJwcm9jZXNzZWRcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBXCIsIFwiUHJvY2Vzc2VkIGJ5IElBXCIpLFxuICAgICAgICB2YWx1ZTpcbiAgICAgICAgICBzbmFwc2hvdC5wcm9jZXNzZWRCeUlhRmlsdGVyID09PSBcInllc1wiXG4gICAgICAgICAgICA/IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBX1llc1wiLCBcIlllc1wiKVxuICAgICAgICAgICAgOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9Ob1wiLCBcIk5vXCIpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1bW1hcnk7XG4gIH0sIFthcHBsaWVkRmlsdGVycywgZ2FzdG9UeXBlTGFiZWxNYXBdKTtcblxuICBjb25zdCBzaG93U3VtbWFyeSA9ICFzaG93RmlsdGVycyAmJiBzdW1tYXJ5SXRlbXMubGVuZ3RoID4gMDtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChkaWRBcHBseVF1ZXJ5RmlsdGVyUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBkaWRBcHBseVF1ZXJ5RmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xuXG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgY29uc3QgdGlja2V0RmlsZUlkID0gc2FmZVRleHQodXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJ0aWNrZXRGaWxlSWRcIikpO1xuICAgIGlmICghdGlja2V0RmlsZUlkKSByZXR1cm47XG5cbiAgICBjb25zdCBxdWVyeVNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0ge1xuICAgICAgZnJvbURhdGU6IFwiXCIsXG4gICAgICB0b0RhdGU6IFwiXCIsXG4gICAgICBmaWx0ZXJLZXk6IHRpY2tldEZpbGVJZCxcbiAgICAgIGN1cnJlbmN5Q29kZTogXCJcIixcbiAgICAgIHN0YXR1c0ZpbHRlcjogXCJcIixcbiAgICAgIGdhc3RvVHlwZUZpbHRlcjogXCJcIixcbiAgICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXI6IFwiYWxsXCIsXG4gICAgfTtcblxuICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMocXVlcnlTbmFwc2hvdCk7XG4gICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSB0aWNrZXRGaWxlSWQ7XG4gICAgdm9pZCBsb2FkTGlzdCgxLCBxdWVyeVNuYXBzaG90KTtcblxuICAgIHVybC5zZWFyY2hQYXJhbXMuZGVsZXRlKFwidGlja2V0RmlsZUlkXCIpO1xuICAgIGNvbnN0IGNsZWFuZWRRdWVyeSA9IHVybC5zZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcbiAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIFwiXCIsIGNsZWFuZWRRdWVyeSA/IGAke3VybC5wYXRobmFtZX0/JHtjbGVhbmVkUXVlcnl9YCA6IHVybC5wYXRobmFtZSk7XG4gIH0sIFtjbGVhckNhY2hlZFN0YXRlLCBsb2FkTGlzdCwgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoZGlkUmVzdG9yZU9uTW91bnRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQgPSB0cnVlO1xuXG4gICAgaWYgKCFjb25zdW1lUmV0dXJuRmxhZygpKSB7XG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2FjaGVkU3RhdGUgPSByZWFkQ2FjaGVkU3RhdGUoKTtcbiAgICBpZiAoIWNhY2hlZFN0YXRlKSB7XG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKGNhY2hlZFN0YXRlLmZpbHRlcnMpO1xuICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBjYWNoZWRTdGF0ZS5zY3JvbGxZO1xuICAgIHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50ID0gY2FjaGVkU3RhdGUuZm9jdXNGaWxlSWQ7XG4gICAgaWYgKGNhY2hlZFN0YXRlLml0ZW1zLmxlbmd0aCA+IDAgfHwgY2FjaGVkU3RhdGUudG90YWwgPiAwKSB7XG4gICAgICByZXN0b3JlTGlzdFNuYXBzaG90KHtcbiAgICAgICAgaXRlbXM6IGNhY2hlZFN0YXRlLml0ZW1zLFxuICAgICAgICB0b3RhbDogY2FjaGVkU3RhdGUudG90YWwsXG4gICAgICAgIHBhZ2U6IGNhY2hlZFN0YXRlLnBhZ2UsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdm9pZCBsb2FkTGlzdChjYWNoZWRTdGF0ZS5wYWdlLCBjYWNoZWRTdGF0ZS5maWx0ZXJzKTtcbiAgfSwgW2NsZWFyQ2FjaGVkU3RhdGUsIGNvbnN1bWVSZXR1cm5GbGFnLCBsb2FkTGlzdCwgcmVhZENhY2hlZFN0YXRlLCByZXN0b3JlQXBwbGllZEZpbHRlcnMsIHJlc3RvcmVMaXN0U25hcHNob3RdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0xvYWRpbmcpIHJldHVybjtcbiAgICBpZiAocGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9PSBudWxsICYmICFwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCkgcmV0dXJuO1xuXG4gICAgY29uc3QgcGVuZGluZ1Njcm9sbFkgPSBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50O1xuICAgIGNvbnN0IHBlbmRpbmdGb2N1c0ZpbGVJZCA9IHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50O1xuICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50ID0gXCJcIjtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgaWYgKHBlbmRpbmdTY3JvbGxZICE9IG51bGwpIHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgICB0b3A6IE1hdGgubWF4KDAsIHBlbmRpbmdTY3JvbGxZKSxcbiAgICAgICAgICBiZWhhdmlvcjogXCJhdXRvXCIsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXBlbmRpbmdGb2N1c0ZpbGVJZCB8fCAhdGltZWxpbmVDb250YWluZXJSZWYuY3VycmVudCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBub3JtYWxpemVkRm9jdXNJZCA9IHBlbmRpbmdGb2N1c0ZpbGVJZC50b1VwcGVyQ2FzZSgpO1xuICAgICAgY29uc3QgdGltZWxpbmVJdGVtcyA9IEFycmF5LmZyb20oXG4gICAgICAgIHRpbWVsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtaXRlbVtkYXRhLXRpY2tldC1maWxlLWlkXVwiKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IG1hdGNoaW5nSXRlbSA9IHRpbWVsaW5lSXRlbXMuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gc2FmZVRleHQoaXRlbS5kYXRhc2V0LnRpY2tldEZpbGVJZCkudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZEZvY3VzSWQ7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHRhcmdldENhcmQgPSBtYXRjaGluZ0l0ZW0/LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcbiAgICAgIGlmICghdGFyZ2V0Q2FyZCkgcmV0dXJuO1xuXG4gICAgICB0YXJnZXRDYXJkLmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgICB9KTtcbiAgfSwgW2lzTG9hZGluZywgaXRlbXMubGVuZ3RoXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvblRvZ2dsZUZpbHRlcnMgPSAoKSA9PiB7XG4gICAgICBjb25zdCB3aWxsT3BlbiA9ICFzaG93RmlsdGVycztcbiAgICAgIHRvZ2dsZUZpbHRlclBhbmVsKCk7XG4gICAgICBpZiAod2lsbE9wZW4pIHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHsgdG9wOiAwLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25SZWZyZXNoID0gKCkgPT4ge1xuICAgICAgaWYgKCFhcHBsaWVkRmlsdGVycz8uZnJvbURhdGUgfHwgIWFwcGxpZWRGaWx0ZXJzPy50b0RhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2b2lkIGxvYWRMaXN0KGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSwgYXBwbGllZEZpbHRlcnMpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXRpY2tldHMtcmVmcmVzaFwiLCBvblJlZnJlc2gpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXhwZW5zZS10aWNrZXRzLXRvZ2dsZS1maWx0ZXJcIiwgb25Ub2dnbGVGaWx0ZXJzKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXhwZW5zZS10aWNrZXRzLXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcbiAgICB9O1xuICB9LCBbYXBwbGllZEZpbHRlcnMsIGN1cnJlbnRQYWdlLCBsb2FkTGlzdCwgc2hvd0ZpbHRlcnMsIHRvZ2dsZUZpbHRlclBhbmVsXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgPGlucHV0XG4gICAgICAgIHJlZj17Y2FtZXJhSW5wdXRSZWZ9XG4gICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgYWNjZXB0PVwiaW1hZ2UvanBlZyxpbWFnZS9qcGcsaW1hZ2UvcG5nLGltYWdlL3dlYnBcIlxuICAgICAgICBjYXB0dXJlPVwiZW52aXJvbm1lbnRcIlxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZmlsZXM/LlswXSB8fCBudWxsO1xuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgIHZvaWQgaGFuZGxlU2VsZWN0ZWRGaWxlKGZpbGUsIFwiY2FtZXJhXCIpO1xuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIDxpbnB1dFxuICAgICAgICByZWY9e2dhbGxlcnlJbnB1dFJlZn1cbiAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICBhY2NlcHQ9XCJpbWFnZS9qcGVnLGltYWdlL2pwZyxpbWFnZS9wbmcsaW1hZ2Uvd2VicFwiXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQuY3VycmVudFRhcmdldC5maWxlcz8uWzBdIHx8IG51bGw7XG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgdm9pZCBoYW5kbGVTZWxlY3RlZEZpbGUoZmlsZSwgXCJnYWxsZXJ5XCIpO1xuICAgICAgICB9fVxuICAgICAgLz5cblxuICAgICAge3NvdXJjZVBpY2tlck9wZW4gPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTYwMDAwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1zbGF0ZS05NTAvNDUgcHgtNCBweS02XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctc20gcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgcC00IHNoYWRvdy14bFwiPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtWzE2cHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfVGl0bGVcIiwgXCJOdWV2byB0aWNrZXRcIil9XG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XG4gICAgICAgICAgICAgIHtpbmRUKFxuICAgICAgICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0JvZHlcIixcbiAgICAgICAgICAgICAgICBcIlNlbGVjY2lvbmEgdW5hIGZ1ZW50ZSBwYXJhIGNhcHR1cmFyIG8gZWxlZ2lyIGxhIGltYWdlbiBkZWwgdGlja2V0LlwiXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBncmlkIGdyaWQtY29scy0xIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHZvaWQgc2VsZWN0RnJvbUNhbWVyYShjYW1lcmFJbnB1dFJlZi5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfQ2FtZXJhXCIsIFwiVXNhciBjYW1hcmFcIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RGcm9tR2FsbGVyeShnYWxsZXJ5SW5wdXRSZWYuY3VycmVudCl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9HYWxsZXJ5XCIsIFwiRWxlZ2lyIGltYWdlblwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2Nsb3NlU291cmNlUGlja2VyfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7cXVpY2tUaWNrZXRCdXN5ID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzM1IHB4LTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlLzk1IHB4LTQgcHktMyB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCI+XG4gICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC01IHctNVwiIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfSAvPlxuICAgICAgICAgICAgPHNwYW4+e3F1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlIHx8IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7cXVpY2tUaWNrZXRFcnJvck1lc3NhZ2UgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgc3BhY2UteS0yIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctcm9zZS01MCBwLTMgdGV4dC1zbSB0ZXh0LXJvc2UtODAwXCI+XG4gICAgICAgICAgPHA+e3F1aWNrVGlja2V0RXJyb3JNZXNzYWdlfTwvcD5cbiAgICAgICAgICB7cXVpY2tUaWNrZXRUcmFjZUxpc3QubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXdoaXRlIHAtMiB0ZXh0LXhzIHRleHQtcm9zZS03MDBcIj5cbiAgICAgICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lm1hcCgoZW50cnkpID0+IChcbiAgICAgICAgICAgICAgICA8cCBrZXk9e2Ake2VudHJ5LnN0ZXB9LSR7ZW50cnkuYXR9YH0+e2Ake2VudHJ5LnN0ZXB9OiAke2VudHJ5LnRyYWNlSWR9YH08L3A+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMlwiPlxuICAgICAgICAgICAge2hhc1BlbmRpbmdVcGxvYWRSZXRyeSA/IChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHZvaWQgcmV0cnlQZW5kaW5nVXBsb2FkKCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUmV0cnlVcGxvYWRcIiwgXCJSZWludGVudGFyIHVwbG9hZFwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIiBvbkNsaWNrPXtjbGVhclF1aWNrVGlja2V0RXJyb3J9PlxuICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9DbG9zZVwiLCBcIkNsb3NlXCIpfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIHtzaG93U3VtbWFyeSA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItY2FyZCBmaWx0ZXItY2FyZC0tc3VtbWFyeSBwLTMgc206cC00IG10LTEgbWItM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhwZW5zZS1zdW1tYXJ5LWdyaWQgZ3JpZCBncmlkLWNvbHMtMSBtaW4tWzM2MHB4XTpncmlkLWNvbHMtMiBpdGVtcy1zdGFydCBnYXAteC00IGdhcC15LTEgdGV4dC14c1wiPlxuICAgICAgICAgICAge3N1bW1hcnlJdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e2Ake2l0ZW0ua2V5fS0ke2l0ZW0udmFsdWV9LSR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdW1tYXJ5IGhpc3RvcnktZmlsdGVyLXN1bW1hcnktLWdyaWQtaXRlbSBsZWFkaW5nLTUgbWluLXctMFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdW1tYXJ5X19sYWJlbCBmb250LXNlbWlib2xkXCI+e2l0ZW0ubGFiZWx9Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdW1tYXJ5X192YWx1ZSBicmVhay13b3Jkc1wiPntpdGVtLnZhbHVlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgPEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsXG4gICAgICAgIHZpc2libGU9e3Nob3dGaWx0ZXJzfVxuICAgICAgICBzaG93TWFudWFsRGF0ZUZpbHRlcj17c2hvd01hbnVhbERhdGVGaWx0ZXJ9XG4gICAgICAgIG1hbnVhbERhdGVBdXRvT3BlbktleT17bWFudWFsRGF0ZUF1dG9PcGVuS2V5fVxuICAgICAgICBmcm9tRGF0ZT17ZnJvbURhdGV9XG4gICAgICAgIHRvRGF0ZT17dG9EYXRlfVxuICAgICAgICBmaWx0ZXJLZXk9e2ZpbHRlcktleX1cbiAgICAgICAgY3VycmVuY3lDb2RlPXtjdXJyZW5jeUNvZGV9XG4gICAgICAgIHN0YXR1c0ZpbHRlcj17c3RhdHVzRmlsdGVyfVxuICAgICAgICBnYXN0b1R5cGVGaWx0ZXI9e2dhc3RvVHlwZUZpbHRlcn1cbiAgICAgICAgcHJvY2Vzc2VkQnlJYUZpbHRlcj17cHJvY2Vzc2VkQnlJYUZpbHRlcn1cbiAgICAgICAgYWN0aXZlUXVpY2tGaWx0ZXI9e2FjdGl2ZVF1aWNrRmlsdGVyfVxuICAgICAgICBzaG93TWFudWFsRGF0ZUVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yfVxuICAgICAgICBnYXN0b1R5cGVPcHRpb25zPXtnYXN0b1R5cGVPcHRpb25zfVxuICAgICAgICBvbkRhdGVSYW5nZUNoYW5nZT17b25EYXRlUmFuZ2VDaGFuZ2V9XG4gICAgICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZT17b25NYW51YWxSYW5nZUNvbXBsZXRlfVxuICAgICAgICBvblF1aWNrRmlsdGVyQ2hhbmdlPXtvblF1aWNrRmlsdGVyQ2hhbmdlfVxuICAgICAgICBvbkZpbHRlcktleUNoYW5nZT17c2V0RmlsdGVyS2V5fVxuICAgICAgICBvbkN1cnJlbmN5Q29kZUNoYW5nZT17c2V0Q3VycmVuY3lDb2RlfVxuICAgICAgICBvblN0YXR1c0ZpbHRlckNoYW5nZT17c2V0U3RhdHVzRmlsdGVyfVxuICAgICAgICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZT17c2V0R2FzdG9UeXBlRmlsdGVyfVxuICAgICAgICBvblByb2Nlc3NlZEJ5SWFGaWx0ZXJDaGFuZ2U9e3NldFByb2Nlc3NlZEJ5SWFGaWx0ZXJ9XG4gICAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XG4gICAgICAgIG9uQXBwbHk9e29uQXBwbHl9XG4gICAgICAvPlxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cbiAgICAgID5cbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cbiAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtlcnJvck1lc3NhZ2UgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxuXG4gICAgICB7IWlzTG9hZGluZyAmJiAhZXJyb3JNZXNzYWdlICYmIGl0ZW1zLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2luZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKX0gLz5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7IWVycm9yTWVzc2FnZSAmJiBpdGVtcy5sZW5ndGggPiAwID8gKFxuICAgICAgICA8ZGl2IHJlZj17dGltZWxpbmVDb250YWluZXJSZWZ9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveFwiPlxuICAgICAgICAgIHtpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChpdGVtLmZpbGVJZCk7XG4gICAgICAgICAgICBjb25zdCBkYXRlUGFydHMgPSBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzKGl0ZW0udHJhbnNEYXRlLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIik7XG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IHNhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pIHx8IHNhZmVUZXh0KGl0ZW0uZmlsZU5hbWUpIHx8IGZpbGVJZCB8fCBcIi1cIjtcbiAgICAgICAgICAgIGNvbnN0IGFtb3VudFRleHQgPSBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koaXRlbS50b3RhbEFtb3VudCA/PyBudWxsLCBzYWZlVGV4dChpdGVtLmN1cnJlbmN5Q29kZSkpO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzQ29kZSA9IGl0ZW0uc3RhdHVzO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzTGFiZWwgPSBnZXRFeHBlbnNlVGlja2V0U3RhdHVzTGFiZWwoc3RhdHVzQ29kZSk7XG4gICAgICAgICAgICBjb25zdCBpc0Fzc2lnbmVkVG9FeHBlbnNlU2hlZXQgPSBzdGF0dXNDb2RlID09PSAxO1xuICAgICAgICAgICAgY29uc3Qgc2hvd1Byb2Nlc3NlZEJ5QWlJY29uID0gaXRlbS5wcm9jZXNzZWRCeUFJID09PSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkQnlBaUxhYmVsID0gaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIik7XG4gICAgICAgICAgICBjb25zdCBnYXN0b1R5cGVDb2RlID0gaXRlbS5nYXN0b1R5cGUgPT09IG51bGwgPyBcIlwiIDogU3RyaW5nKGl0ZW0uZ2FzdG9UeXBlKTtcbiAgICAgICAgICAgIGNvbnN0IGdhc3RvVHlwZUxhYmVsID0gZ2FzdG9UeXBlQ29kZVxuICAgICAgICAgICAgICA/IGdhc3RvVHlwZUxhYmVsTWFwLmdldChnYXN0b1R5cGVDb2RlKSB8fCBnYXN0b1R5cGVDb2RlXG4gICAgICAgICAgICAgIDogaW5kVChcIkNvbW1vbl9Ob3RBdmFpbGFibGVcIiwgXCJOL0FcIik7XG4gICAgICAgICAgICBjb25zdCBjYXJkU3VidGl0bGUgPSBnYXN0b1R5cGVMYWJlbDtcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1c0ljb25zID0gaXNBc3NpZ25lZFRvRXhwZW5zZVNoZWV0IHx8IHNob3dQcm9jZXNzZWRCeUFpSWNvbiA/IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICB7aXNBc3NpZ25lZFRvRXhwZW5zZVNoZWV0ID8gKFxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb25cIiByb2xlPVwiaW1nXCIgYXJpYS1sYWJlbD17c3RhdHVzTGFiZWx9PlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTQgdy00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNMTMuMTkgOC42ODhhNC41IDQuNSAwIDAgMSAxLjI0MiA3LjI0NGwtNC41IDQuNWE0LjUgNC41IDAgMCAxLTYuMzY0LTYuMzY0bDEuNzU3LTEuNzU3bTEzLjM1LS42MjIgMS43NTctMS43NTdhNC41IDQuNSAwIDAgMC02LjM2NC02LjM2NGwtNC41IDQuNWE0LjUgNC41IDAgMCAwIDEuMjQyIDcuMjQ0XCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICB7c2hvd1Byb2Nlc3NlZEJ5QWlJY29uID8gKFxuICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb24gZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb24tLWFpXCJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cImltZ1wiXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3Byb2Nlc3NlZEJ5QWlMYWJlbH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezEuNX0gc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPVwiaC00IHctNFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTQgMThsNC0xMmw0IDEyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk02IDEzaDRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDZoNlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTcgNnYxMlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMThoNlwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICkgOiBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17YCR7ZmlsZUlkfS0ke2luZGV4fWB9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIiBkYXRhLXRpY2tldC1maWxlLWlkPXtmaWxlSWQgfHwgdW5kZWZpbmVkfT5cbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZT17Y2FyZFN1YnRpdGxlfVxuICAgICAgICAgICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cbiAgICAgICAgICAgICAgICAgIG9uT3Blbj17KCkgPT4gb3BlblRpY2tldERldGFpbChmaWxlSWQpfVxuICAgICAgICAgICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX190aXRsZSB0aW1lbGluZS1uYW1lXCJcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0xhYmVsPXtzdGF0dXNMYWJlbH1cbiAgICAgICAgICAgICAgICAgIHN0YXR1c0ljb249e3N0YXR1c0ljb25zfVxuICAgICAgICAgICAgICAgICAgc3RhdHVzSWNvbkNsYXNzTmFtZT1cImV4cGVuc2UtdGlja2V0LWNhcmRfX3N0YXR1cy1pY29uc1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICA8Q29tcGFjdFBhZ2luYXRpb25cbiAgICAgICAgdG90YWxQYWdlcz17dG90YWxQYWdlc31cbiAgICAgICAgY3VycmVudFBhZ2U9e2N1cnJlbnRQYWdlfVxuICAgICAgICBsb2FkaW5nPXtpc0xvYWRpbmd9XG4gICAgICAgIG9uUGFnZUNoYW5nZT17KHBhZ2UpID0+IHtcbiAgICAgICAgICBpZiAoIWFwcGxpZWRGaWx0ZXJzPy5mcm9tRGF0ZSB8fCAhYXBwbGllZEZpbHRlcnM/LnRvRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZvaWQgbG9hZExpc3QocGFnZSwgYXBwbGllZEZpbHRlcnMpO1xuICAgICAgICB9fVxuICAgICAgICBsYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XG4gICAgICAvPlxuXG4gICAgICB7Y2FuQ3JlYXRlVGlja2V0ID8gKFxuICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b25cbiAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgcmFwaWRhc1wiKX1cbiAgICAgICAgICBzaXplPXs3Nn1cbiAgICAgICAgICByaWdodD17MTZ9XG4gICAgICAgICAgYm90dG9tPXsyNH1cbiAgICAgICAgICBtZW51QXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJhcGlkYXNcIil9XG4gICAgICAgICAgbWVudUl0ZW1zPXtmYWJNZW51SXRlbXN9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgZXhwZW5zZSB0aWNrZXRzIGxpc3QuXG5jb25zdCBFeHBlbnNlVGlja2V0c1BhZ2UgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICAgICAgPEV4cGVuc2VUaWNrZXRzUGFnZUNvbnRlbnQgLz5cbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICApO1xufTtcblxuY29uc3QgbW91bnQgPSAoKSA9PiB7XG4gIGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoKCk7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS10aWNrZXRzLXJvb3RcIik7XG4gIGlmICghcm9vdEVsKSByZXR1cm47XG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVRpY2tldHNQYWdlIC8+KTtcbn07XG5cbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0c1BhZ2U7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgSGlzdG9yeVN1bW1hcnkgZnJvbSBcIi4uLy4uL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlTdW1tYXJ5LnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7XG4gIGdldEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJPcHRpb25zLFxuICBub3JtYWxpemVFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSxcbiAgdHlwZSBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSxcbn0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlVGlja2V0U3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyLCBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCB9IGZyb20gXCIuLi90aWNrZXRzL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXIgZnJvbSBcIi4vRXhwZW5zZURhdGVSYW5nZUZpbHRlci50c3hcIjtcbmltcG9ydCBFeHBlbnNlRmlsdGVyQWN0aW9ucyBmcm9tIFwiLi9FeHBlbnNlRmlsdGVyQWN0aW9ucy50c3hcIjtcbmltcG9ydCBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdC50c3hcIjtcbmltcG9ydCBFeHBlbnNlUXVpY2tEYXRlRmlsdGVycyBmcm9tIFwiLi9FeHBlbnNlUXVpY2tEYXRlRmlsdGVycy50c3hcIjtcbmltcG9ydCBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQgZnJvbSBcIi4vRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0LnRzeFwiO1xuXG5jb25zdCBwYXJzZUlzb0RhdGUgPSAocmF3OiBzdHJpbmcpOiBEYXRlIHwgbnVsbCA9PiB7XG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3KS50cmltKCkuc3BsaXQoXCJUXCIpWzBdO1xuICBpZiAoIS9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KHZhbHVlKSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IHZhbHVlLnNwbGl0KFwiLVwiKS5tYXAoTnVtYmVyKTtcbiAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcbn07XG5cbmNvbnN0IGZvcm1hdERhdGUgPSAocmF3OiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZGF0ZSA9IHBhcnNlSXNvRGF0ZShyYXcpO1xuICBpZiAoIWRhdGUpIHJldHVybiBcIi0tXCI7XG4gIHJldHVybiBkYXRlXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHtcbiAgICAgIGRheTogXCJudW1lcmljXCIsXG4gICAgICBtb250aDogXCJzaG9ydFwiLFxuICAgICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgfSlcbiAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXG4gICAgLnRvTG93ZXJDYXNlKCk7XG59O1xuXG50eXBlIEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsUHJvcHMgPSB7XG4gIHZpc2libGU6IGJvb2xlYW47XG4gIHNob3dNYW51YWxEYXRlRmlsdGVyOiBib29sZWFuO1xuICBtYW51YWxEYXRlQXV0b09wZW5LZXk6IG51bWJlcjtcbiAgZnJvbURhdGU6IHN0cmluZztcbiAgdG9EYXRlOiBzdHJpbmc7XG4gIGZpbHRlcktleTogc3RyaW5nO1xuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgc3RhdHVzRmlsdGVyOiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZTtcbiAgZ2FzdG9UeXBlRmlsdGVyOiBcIlwiIHwgRXhwZW5zZUdhc3RvVHlwZUNvZGU7XG4gIHByb2Nlc3NlZEJ5SWFGaWx0ZXI6IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyO1xuICBhY3RpdmVRdWlja0ZpbHRlcjogRXhwZW5zZVRpY2tldFF1aWNrRmlsdGVySWQgfCBudWxsO1xuICBzaG93TWFudWFsRGF0ZUVycm9yOiBib29sZWFuO1xuICBnYXN0b1R5cGVPcHRpb25zOiBFeHBlbnNlU2VsZWN0T3B0aW9uW107XG4gIG9uRGF0ZVJhbmdlQ2hhbmdlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uTWFudWFsUmFuZ2VDb21wbGV0ZTogKGZyb21EYXRlOiBzdHJpbmcsIHRvRGF0ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvblF1aWNrRmlsdGVyQ2hhbmdlOiAoZmlsdGVySWQ6IEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkKSA9PiB2b2lkO1xuICBvbkZpbHRlcktleUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uQ3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25TdGF0dXNGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpID0+IHZvaWQ7XG4gIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlOiAodmFsdWU6IFwiXCIgfCBFeHBlbnNlR2FzdG9UeXBlQ29kZSkgPT4gdm9pZDtcbiAgb25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlOiAodmFsdWU6IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyKSA9PiB2b2lkO1xuICBvbkNsZWFyOiAoKSA9PiB2b2lkO1xuICBvbkFwcGx5OiAoKSA9PiB2b2lkO1xufTtcblxuLy8gU2hhcmVkIHRpY2tldHMgZmlsdGVyIHBhbmVsIHdpdGggZ2xvYmFsIHF1aWNrIGRhdGUgZmlsdGVycyBhbmQgZml4ZWQgdGlja2V0IGZpbHRlcnMuXG5jb25zdCBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbCA9ICh7XG4gIHZpc2libGUsXG4gIHNob3dNYW51YWxEYXRlRmlsdGVyLFxuICBtYW51YWxEYXRlQXV0b09wZW5LZXksXG4gIGZyb21EYXRlLFxuICB0b0RhdGUsXG4gIGZpbHRlcktleSxcbiAgY3VycmVuY3lDb2RlLFxuICBzdGF0dXNGaWx0ZXIsXG4gIGdhc3RvVHlwZUZpbHRlcixcbiAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gIGdhc3RvVHlwZU9wdGlvbnMsXG4gIG9uRGF0ZVJhbmdlQ2hhbmdlLFxuICBvbk1hbnVhbFJhbmdlQ29tcGxldGUsXG4gIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXG4gIG9uRmlsdGVyS2V5Q2hhbmdlLFxuICBvbkN1cnJlbmN5Q29kZUNoYW5nZSxcbiAgb25TdGF0dXNGaWx0ZXJDaGFuZ2UsXG4gIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlLFxuICBvblByb2Nlc3NlZEJ5SWFGaWx0ZXJDaGFuZ2UsXG4gIG9uQ2xlYXIsXG4gIG9uQXBwbHksXG59OiBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbFByb3BzKSA9PiB7XG4gIGNvbnN0IHN0YXR1c09wdGlvbnMgPSB1c2VNZW1vKCgpID0+IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJPcHRpb25zKCksIFtdKTtcblxuICBjb25zdCBjYXRlZ29yeU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4ge1xuICAgIHJldHVybiBbXG4gICAgICB7IHZhbHVlOiBcIlwiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfQWxsXCIsIFwiQWxsXCIpIH0sXG4gICAgICAuLi5nYXN0b1R5cGVPcHRpb25zLFxuICAgIF07XG4gIH0sIFtnYXN0b1R5cGVPcHRpb25zXSk7XG5cbiAgaWYgKCF2aXNpYmxlKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgbG9jYWxlID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCI7XG4gIGNvbnN0IHNob3dJbmxpbmVEYXRlU3VtbWFyeSA9ICFzaG93TWFudWFsRGF0ZUZpbHRlciAmJiAhIWZyb21EYXRlICYmICEhdG9EYXRlO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItY2FyZCBmaWx0ZXItY2FyZC0tZXhwYW5kZWQgcC0yIHNtOnAtMi41IHJlbGF0aXZlXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN0YWNrIGZsZXggZmxleC1jb2wgc3BhY2UteS0yXCI+XG4gICAgICAgIDxFeHBlbnNlUXVpY2tEYXRlRmlsdGVycyBhY3RpdmVRdWlja0ZpbHRlcj17YWN0aXZlUXVpY2tGaWx0ZXJ9IG9uUXVpY2tGaWx0ZXJDaGFuZ2U9e29uUXVpY2tGaWx0ZXJDaGFuZ2V9IC8+XG5cbiAgICAgICAge3Nob3dNYW51YWxEYXRlRmlsdGVyID8gKFxuICAgICAgICAgIDxFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyXG4gICAgICAgICAgICBmcm9tRGF0ZT17ZnJvbURhdGV9XG4gICAgICAgICAgICB0b0RhdGU9e3RvRGF0ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRhdGVSYW5nZUNoYW5nZX1cbiAgICAgICAgICAgIG9uUmFuZ2VDb21wbGV0ZT17b25NYW51YWxSYW5nZUNvbXBsZXRlfVxuICAgICAgICAgICAgYXV0b09wZW5SZXF1ZXN0SWQ9e21hbnVhbERhdGVBdXRvT3BlbktleX1cbiAgICAgICAgICAgIHNob3dNYW51YWxFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvcn1cbiAgICAgICAgICAgIHNob3dTdGFydEVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yICYmICFmcm9tRGF0ZX1cbiAgICAgICAgICAgIHNob3dFbmRFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvciAmJiAhdG9EYXRlfVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBzaG93SW5saW5lRGF0ZVN1bW1hcnkgPyAoXG4gICAgICAgICAgPEhpc3RvcnlTdW1tYXJ5XG4gICAgICAgICAgICBzdW1tYXJ5RnJvbUxhYmVsPXtpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKX1cbiAgICAgICAgICAgIHN1bW1hcnlUb0xhYmVsPXtpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpfVxuICAgICAgICAgICAgZnJvbVZhbHVlPXtmb3JtYXREYXRlKGZyb21EYXRlLCBsb2NhbGUpfVxuICAgICAgICAgICAgdG9WYWx1ZT17Zm9ybWF0RGF0ZSh0b0RhdGUsIGxvY2FsZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJnYXAteS0xIHRleHQtWzExcHhdIHB4LTFcIlxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtNCBnYXAtMlwiPlxuICAgICAgICAgIDxFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfRmlsdGVyS2V5XCIsIFwiVGlja2V0XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9GaWx0ZXJLZXlcIiwgXCJUaWNrZXRcIil9XG4gICAgICAgICAgICB2YWx1ZT17ZmlsdGVyS2V5fVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRmlsdGVyS2V5Q2hhbmdlfVxuICAgICAgICAgICAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnNcbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtjdXJyZW5jeUNvZGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25DdXJyZW5jeUNvZGVDaGFuZ2V9XG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XG4gICAgICAgICAgICBvcHRpb25zPXtzdGF0dXNPcHRpb25zfVxuICAgICAgICAgICAgdmFsdWU9e3N0YXR1c0ZpbHRlcn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiBvblN0YXR1c0ZpbHRlckNoYW5nZShub3JtYWxpemVFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZShuZXh0VmFsdWUsIFwiXCIpKX1cbiAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtdGlja2V0LXN0YXR1cy1maWx0ZXJcIlxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxuICAgICAgICAgICAgb3B0aW9ucz17Y2F0ZWdvcnlPcHRpb25zfVxuICAgICAgICAgICAgdmFsdWU9e2dhc3RvVHlwZUZpbHRlcn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IE51bWJlcihuZXh0VmFsdWUpO1xuICAgICAgICAgICAgICBpZiAobmV4dFZhbHVlID09PSBcIlwiIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkpIHtcbiAgICAgICAgICAgICAgICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZShcIlwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2UocGFyc2VkIGFzIEV4cGVuc2VHYXN0b1R5cGVDb2RlKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLXRpY2tldC1nYXN0b3R5cGUtZmlsdGVyXCJcbiAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdFxuICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQVwiLCBcIlByb2Nlc3NlZCBieSBJQVwiKX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIil9XG4gICAgICAgICAgdmFsdWU9e3Byb2Nlc3NlZEJ5SWFGaWx0ZXJ9XG4gICAgICAgICAgb25DaGFuZ2U9e29uUHJvY2Vzc2VkQnlJYUZpbHRlckNoYW5nZX1cbiAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAvPlxuXG4gICAgICAgIDxFeHBlbnNlRmlsdGVyQWN0aW9uc1xuICAgICAgICAgIGNsZWFyTGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGVhclwiLCBcIkNsZWFyXCIpfVxuICAgICAgICAgIGFwcGx5TGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9BcHBseVwiLCBcIkFwcGx5XCIpfVxuICAgICAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XG4gICAgICAgICAgb25BcHBseT17b25BcHBseX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWw7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIgfSBmcm9tIFwiLi4vdGlja2V0cy9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3RQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmFsdWU6IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyO1xuICBvbkNoYW5nZTogKHZhbHVlOiBFeHBlbnNlVGlja2V0UHJvY2Vzc2VkQnlJYUZpbHRlcikgPT4gdm9pZDtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG59O1xuXG4vLyBGaXhlZCBlbnVtIHNlbGVjdCBmb3IgSUEgcHJvY2Vzc2luZyBmaWx0ZXIgd2l0aCBBbGwvWWVzL05vIG9wdGlvbnMuXG5jb25zdCBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdCA9ICh7XG4gIGxhYmVsLFxuICBwbGFjZWhvbGRlcixcbiAgdmFsdWUsXG4gIG9uQ2hhbmdlLFxuICByZWFkT25seSA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICBzaG93TGFiZWwgPSB0cnVlLFxufTogRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3RQcm9wcykgPT4ge1xuICBjb25zdCB1aVZhbHVlID0gdmFsdWUgPT09IFwiYWxsXCIgPyBcIlwiIDogdmFsdWU7XG4gIGNvbnN0IG9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXG4gICAgKCkgPT4gW1xuICAgICAgeyB2YWx1ZTogXCJhbGxcIiwgdGV4dDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1N0YXR1c19Cb3RoXCIsIFwiQWxsXCIpIH0sXG4gICAgICB7IHZhbHVlOiBcInllc1wiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9ZZXNcIiwgXCJZZXNcIikgfSxcbiAgICAgIHsgdmFsdWU6IFwibm9cIiwgdGV4dDogaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFfTm9cIiwgXCJOb1wiKSB9LFxuICAgIF0sXG4gICAgW11cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgIHZhbHVlPXt1aVZhbHVlfVxuICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IHtcbiAgICAgICAgaWYgKG5leHRWYWx1ZSA9PT0gXCJ5ZXNcIiB8fCBuZXh0VmFsdWUgPT09IFwibm9cIiB8fCBuZXh0VmFsdWUgPT09IFwiYWxsXCIpIHtcbiAgICAgICAgICBvbkNoYW5nZShuZXh0VmFsdWUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBvbkNoYW5nZShcImFsbFwiKTtcbiAgICAgIH19XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICBpZEJhc2U9XCJleHBlbnNlLXByb2Nlc3NlZC1ieS1pYS1maWx0ZXJcIlxuICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZW1vdGVTZWFyY2hDb21ib2JveCwgeyB0eXBlIFJlbW90ZVNlYXJjaE9wdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUmVtb3RlU2VhcmNoQ29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8sIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0IH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbn07XG5cbmNvbnN0IFNFQVJDSF9QQUdFX1NJWkUgPSAzMDtcblxuLy8gQnVpbGRzIG1pbmltYWwgcGF5bG9hZCBmb3IgdGlja2V0IGtleSBzdWdnZXN0aW9ucyB3aXRob3V0IGRhdGUgZmlsdGVycy5cbmNvbnN0IGJ1aWxkVGlja2V0U3VnZ2VzdFBheWxvYWQgPSAodGVybTogc3RyaW5nLCBwYWdlOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIpOiBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCA9PiB7XG4gIGNvbnN0IHNhZmVUZXJtID0gU3RyaW5nKHRlcm0gfHwgXCJcIikudHJpbSgpO1xuICByZXR1cm4ge1xuICAgIHBhZ2U6IE51bWJlci5pc0Zpbml0ZShwYWdlKSAmJiBwYWdlID4gMCA/IE1hdGguZmxvb3IocGFnZSkgOiAxLFxuICAgIHBhZ2VTaXplOiBOdW1iZXIuaXNGaW5pdGUocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCA/IE1hdGguZmxvb3IocGFnZVNpemUpIDogU0VBUkNIX1BBR0VfU0laRSxcbiAgICBzZWFyY2hLZXk6IHNhZmVUZXJtIHx8IHVuZGVmaW5lZCxcbiAgICBmaWx0ZXI6IHNhZmVUZXJtIHx8IHVuZGVmaW5lZCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcFRpY2tldE9wdGlvbnMgPSAoaXRlbXM6IEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvW10gfCB1bmRlZmluZWQpOiBSZW1vdGVTZWFyY2hPcHRpb25bXSA9PiB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcyA6IFtdKVxuICAgIC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGZpbGVJZCA9IFN0cmluZyhpdGVtPy5GaWxlSWQgfHwgXCJcIikudHJpbSgpO1xuICAgICAgaWYgKCFmaWxlSWQpIHJldHVybiBudWxsO1xuXG4gICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IFN0cmluZyhpdGVtPy5EZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XG4gICAgICBjb25zdCBzdWJ0aXRsZSA9IGRlc2NyaXB0aW9uIHx8IFwiLVwiO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IGZpbGVJZCxcbiAgICAgICAgdGl0bGU6IGZpbGVJZCxcbiAgICAgICAgc3VidGl0bGUsXG4gICAgICB9IGFzIFJlbW90ZVNlYXJjaE9wdGlvbjtcbiAgICB9KVxuICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgUmVtb3RlU2VhcmNoT3B0aW9uW107XG59O1xuXG4vLyBUaWNrZXQga2V5IGZpbHRlciBpbnB1dCB3aXRoIHJlbW90ZSBsaXN0IHN1Z2dlc3Rpb25zLlxuY29uc3QgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zID0gdHJ1ZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbn06IEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dFByb3BzKSA9PiB7XG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xuXG4gIGNvbnN0IGxvYWRPcHRpb25zID0gdXNlQ2FsbGJhY2soYXN5bmMgKHRlcm06IHN0cmluZywgc2lnbmFsOiBBYm9ydFNpZ25hbCk6IFByb21pc2U8UmVtb3RlU2VhcmNoT3B0aW9uW10+ID0+IHtcbiAgICBjb25zdCBwYXlsb2FkID0gYnVpbGRUaWNrZXRTdWdnZXN0UGF5bG9hZCh0ZXJtLCAxLCBTRUFSQ0hfUEFHRV9TSVpFKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdChwYXlsb2FkLCB7XG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgIHNpZ25hbCxcbiAgICB9KTtcblxuICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwVGlja2V0T3B0aW9ucyhyZXNwb25zZT8uSXRlbXMpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgbG9hZE9wdGlvbnNQYWdlID0gdXNlQ2FsbGJhY2soYXN5bmMgKHRlcm06IHN0cmluZywgcGFnZTogbnVtYmVyLCBfcGFnZVNpemU6IG51bWJlciwgc2lnbmFsOiBBYm9ydFNpZ25hbCkgPT4ge1xuICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZFRpY2tldFN1Z2dlc3RQYXlsb2FkKHRlcm0sIHBhZ2UsIFNFQVJDSF9QQUdFX1NJWkUpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0KHBheWxvYWQsIHtcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgc2lnbmFsLFxuICAgIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICB0b3RhbDogMCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zOiBtYXBUaWNrZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyksXG4gICAgICB0b3RhbDogTnVtYmVyKHJlc3BvbnNlPy5Ub3RhbCB8fCAwKSxcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgaWYgKCFlbmFibGVSZW1vdGVTdWdnZXN0aW9ucyB8fCByZWFkT25seU1vZGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAge3Nob3dMYWJlbCA/IChcbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgc3R5bGU9e3sgY29sb3I6IFwiIzAwMjk2YmUwXCIgfX0+XG4gICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHB4LTMgcHktMiB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgdGV4dC1zbGF0ZS05MDAgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxuICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8UmVtb3RlU2VhcmNoQ29tYm9ib3hcbiAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgIG9uU2VhcmNoPXthc3luYyAodGVybSwgc2lnbmFsKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGxvYWRPcHRpb25zKHRlcm0sIHNpZ25hbCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICAgIG9uU2VhcmNoUGFnZT17YXN5bmMgKHRlcm0sIHBhZ2UsIHBhZ2VTaXplLCBzaWduYWwpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbG9hZE9wdGlvbnNQYWdlKHRlcm0sIHBhZ2UsIHBhZ2VTaXplLCBzaWduYWwpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGl0ZW1zOiBbXSwgdG90YWw6IDAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH19XG4gICAgICBpZEJhc2U9XCJleHBlbnNlLXRpY2tldC1maWx0ZXIta2V5XCJcbiAgICAgIG1pblNlYXJjaExlbmd0aD17MH1cbiAgICAgIHBhZ2VTaXplPXtTRUFSQ0hfUEFHRV9TSVpFfVxuICAgICAgYWxsb3dFbXB0eVNlYXJjaFxuICAgICAgbG9hZE9uT3BlblxuICAgICAgaW5maW5pdGVTY3JvbGxcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxuICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQ7XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7XG4gIEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXG4gIEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkLFxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZEYXksIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90LnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGVBcmdzID0ge1xuICBvbkFwcGx5RmlsdGVyczogKHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB2b2lkO1xuICBvbkNsZWFyRmlsdGVyczogKCkgPT4gdm9pZDtcbn07XG5cbi8vIE93bnMgZmlsdGVyIFVJIHN0YXRlIGFuZCBhcHBseS9jbGVhciBydWxlcyBmb3IgZXhwZW5zZSB0aWNrZXRzIGxpc3QgcGFnZS5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZSA9ICh7IG9uQXBwbHlGaWx0ZXJzLCBvbkNsZWFyRmlsdGVycyB9OiBVc2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZUFyZ3MpID0+IHtcbiAgY29uc3QgW2Zyb21EYXRlLCBzZXRGcm9tRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3RvRGF0ZSwgc2V0VG9EYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZmlsdGVyS2V5LCBzZXRGaWx0ZXJLZXldID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtjdXJyZW5jeUNvZGUsIHNldEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3N0YXR1c0ZpbHRlciwgc2V0U3RhdHVzRmlsdGVyXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlPihcIlwiKTtcbiAgY29uc3QgW2dhc3RvVHlwZUZpbHRlciwgc2V0R2FzdG9UeXBlRmlsdGVyXSA9IHVzZVN0YXRlPFwiXCIgfCBFeHBlbnNlR2FzdG9UeXBlQ29kZT4oXCJcIik7XG4gIGNvbnN0IFtwcm9jZXNzZWRCeUlhRmlsdGVyLCBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyXSA9IHVzZVN0YXRlPFwiYWxsXCIgfCBcInllc1wiIHwgXCJub1wiPihcImFsbFwiKTtcbiAgY29uc3QgW2FjdGl2ZVF1aWNrRmlsdGVyLCBzZXRBY3RpdmVRdWlja0ZpbHRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd01hbnVhbERhdGVGaWx0ZXIsIHNldFNob3dNYW51YWxEYXRlRmlsdGVyXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dNYW51YWxEYXRlRXJyb3IsIHNldFNob3dNYW51YWxEYXRlRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWFudWFsRGF0ZUF1dG9PcGVuS2V5LCBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXldID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFthcHBsaWVkRmlsdGVycywgc2V0QXBwbGllZEZpbHRlcnNdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd0ZpbHRlcnMsIHNldFNob3dGaWx0ZXJzXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIGNvbnN0IGN1cnJlbnRGaWx0ZXJzID0gdXNlTWVtbzxFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90PihcbiAgICAoKSA9PiAoe1xuICAgICAgZnJvbURhdGUsXG4gICAgICB0b0RhdGUsXG4gICAgICBmaWx0ZXJLZXk6IGZpbHRlcktleS50cmltKCksXG4gICAgICBjdXJyZW5jeUNvZGU6IGN1cnJlbmN5Q29kZS50cmltKCksXG4gICAgICBzdGF0dXNGaWx0ZXIsXG4gICAgICBnYXN0b1R5cGVGaWx0ZXIsXG4gICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxuICAgIH0pLFxuICAgIFtjdXJyZW5jeUNvZGUsIGZpbHRlcktleSwgZnJvbURhdGUsIGdhc3RvVHlwZUZpbHRlciwgcHJvY2Vzc2VkQnlJYUZpbHRlciwgc3RhdHVzRmlsdGVyLCB0b0RhdGVdXG4gICk7XG5cbiAgY29uc3Qgb25BcHBseSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWZyb21EYXRlIHx8ICF0b0RhdGUpIHtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IodHJ1ZSk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0ge1xuICAgICAgZnJvbURhdGUsXG4gICAgICB0b0RhdGUsXG4gICAgICBmaWx0ZXJLZXk6IGZpbHRlcktleS50cmltKCksXG4gICAgICBjdXJyZW5jeUNvZGU6IGN1cnJlbmN5Q29kZS50cmltKCksXG4gICAgICBzdGF0dXNGaWx0ZXIsXG4gICAgICBnYXN0b1R5cGVGaWx0ZXIsXG4gICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxuICAgIH07XG5cbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICBzZXRBcHBsaWVkRmlsdGVycyhzbmFwc2hvdCk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcbiAgICBvbkFwcGx5RmlsdGVycyhzbmFwc2hvdCk7XG4gIH0sIFtjdXJyZW5jeUNvZGUsIGZpbHRlcktleSwgZnJvbURhdGUsIGdhc3RvVHlwZUZpbHRlciwgb25BcHBseUZpbHRlcnMsIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsIHN0YXR1c0ZpbHRlciwgdG9EYXRlXSk7XG5cbiAgLy8gUmVoeWRyYXRlcyB0aWNrZXQgZmlsdGVycyBmcm9tIGEgY2FjaGVkIHNuYXBzaG90IHdoZW4gcmV0dXJuaW5nIGZyb20gZGV0YWlsLlxuICBjb25zdCByZXN0b3JlQXBwbGllZEZpbHRlcnMgPSB1c2VDYWxsYmFjaygoc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpID0+IHtcbiAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90KHNuYXBzaG90KTtcbiAgICBzZXRGcm9tRGF0ZShub3JtYWxpemVkLmZyb21EYXRlKTtcbiAgICBzZXRUb0RhdGUobm9ybWFsaXplZC50b0RhdGUpO1xuICAgIHNldEZpbHRlcktleShub3JtYWxpemVkLmZpbHRlcktleSk7XG4gICAgc2V0Q3VycmVuY3lDb2RlKG5vcm1hbGl6ZWQuY3VycmVuY3lDb2RlKTtcbiAgICBzZXRTdGF0dXNGaWx0ZXIobm9ybWFsaXplZC5zdGF0dXNGaWx0ZXIpO1xuICAgIHNldEdhc3RvVHlwZUZpbHRlcihub3JtYWxpemVkLmdhc3RvVHlwZUZpbHRlcik7XG4gICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcihub3JtYWxpemVkLnByb2Nlc3NlZEJ5SWFGaWx0ZXIpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICBzZXRBcHBsaWVkRmlsdGVycyhub3JtYWxpemVkKTtcbiAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBvbkNsZWFyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEZyb21EYXRlKFwiXCIpO1xuICAgIHNldFRvRGF0ZShcIlwiKTtcbiAgICBzZXRGaWx0ZXJLZXkoXCJcIik7XG4gICAgc2V0Q3VycmVuY3lDb2RlKFwiXCIpO1xuICAgIHNldFN0YXR1c0ZpbHRlcihcIlwiKTtcbiAgICBzZXRHYXN0b1R5cGVGaWx0ZXIoXCJcIik7XG4gICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcihcImFsbFwiKTtcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgc2V0TWFudWFsRGF0ZUF1dG9PcGVuS2V5KDApO1xuICAgIHNldEFwcGxpZWRGaWx0ZXJzKG51bGwpO1xuICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xuICAgIG9uQ2xlYXJGaWx0ZXJzKCk7XG4gIH0sIFtvbkNsZWFyRmlsdGVyc10pO1xuXG4gIGNvbnN0IG9uRGF0ZVJhbmdlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXG4gICAgKG5leHRGcm9tRGF0ZTogc3RyaW5nLCBuZXh0VG9EYXRlOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGhhc0Z1bGxSYW5nZSA9ICEhbmV4dEZyb21EYXRlICYmICEhbmV4dFRvRGF0ZTtcbiAgICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XG4gICAgICBzZXRUb0RhdGUobmV4dFRvRGF0ZSk7XG4gICAgICBpZiAoIWhhc0Z1bGxSYW5nZSkge1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcbiAgICAgIH1cbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgaWYgKHNob3dNYW51YWxEYXRlRXJyb3IpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcighaGFzRnVsbFJhbmdlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtzaG93TWFudWFsRGF0ZUVycm9yXVxuICApO1xuXG4gIGNvbnN0IG9uTWFudWFsUmFuZ2VDb21wbGV0ZSA9IHVzZUNhbGxiYWNrKChuZXh0RnJvbURhdGU6IHN0cmluZywgbmV4dFRvRGF0ZTogc3RyaW5nKSA9PiB7XG4gICAgc2V0RnJvbURhdGUobmV4dEZyb21EYXRlKTtcbiAgICBzZXRUb0RhdGUobmV4dFRvRGF0ZSk7XG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgb25RdWlja0ZpbHRlckNoYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgIChmaWx0ZXJJZDogRXhwZW5zZVRpY2tldFF1aWNrRmlsdGVySWQpID0+IHtcbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJjdXN0b21cIikge1xuICAgICAgICBpZiAoc2hvd01hbnVhbERhdGVGaWx0ZXIpIHtcbiAgICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKHRydWUpO1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICAgICAgc2V0TWFudWFsRGF0ZUF1dG9PcGVuS2V5KChwcmV2aW91cykgPT4gcHJldmlvdXMgKyAxKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihmaWx0ZXJJZCk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcblxuICAgICAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xuICAgICAgY29uc3QgbmV4dEZyb20gPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy03XCIpIHtcbiAgICAgICAgbmV4dEZyb20uc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA2KTtcbiAgICAgIH0gZWxzZSBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy0zMFwiKSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMjkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dEZyb20uc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA4OSk7XG4gICAgICB9XG5cbiAgICAgIHNldEZyb21EYXRlKHRvSXNvRGF0ZShuZXh0RnJvbSkpO1xuICAgICAgc2V0VG9EYXRlKHRvSXNvRGF0ZSh0b2RheSkpO1xuICAgIH0sXG4gICAgW3Nob3dNYW51YWxEYXRlRmlsdGVyXVxuICApO1xuXG4gIGNvbnN0IHRvZ2dsZUZpbHRlclBhbmVsID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFNob3dGaWx0ZXJzKChwcmV2aW91cykgPT4ge1xuICAgICAgY29uc3QgbmV4dCA9ICFwcmV2aW91cztcbiAgICAgIGlmICghbmV4dCkge1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgZnJvbURhdGUsXG4gICAgdG9EYXRlLFxuICAgIGZpbHRlcktleSxcbiAgICBjdXJyZW5jeUNvZGUsXG4gICAgc3RhdHVzRmlsdGVyLFxuICAgIGdhc3RvVHlwZUZpbHRlcixcbiAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxuICAgIGFwcGxpZWRGaWx0ZXJzLFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIGN1cnJlbnRGaWx0ZXJzLFxuICAgIHNldEZpbHRlcktleSxcbiAgICBzZXRDdXJyZW5jeUNvZGUsXG4gICAgc2V0U3RhdHVzRmlsdGVyLFxuICAgIHNldEdhc3RvVHlwZUZpbHRlcixcbiAgICBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyLFxuICAgIG9uQXBwbHksXG4gICAgb25DbGVhcixcbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMsXG4gICAgb25EYXRlUmFuZ2VDaGFuZ2UsXG4gICAgb25NYW51YWxSYW5nZUNvbXBsZXRlLFxuICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXG4gICAgdG9nZ2xlRmlsdGVyUGFuZWwsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlVGlja2V0U3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcbiAgRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcblxuY29uc3QgQUxMT1dFRF9HQVNUT19UWVBFUyA9IG5ldyBTZXQ8bnVtYmVyPihbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTRdKTtcblxuY29uc3Qgbm9ybWFsaXplR2FzdG9UeXBlRmlsdGVyID0gKHZhbHVlOiB1bmtub3duKTogXCJcIiB8IEV4cGVuc2VHYXN0b1R5cGVDb2RlID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIGNvbnN0IHJhdyA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xuICBpZiAoIXJhdykge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHJhdyk7XG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpIHx8ICFBTExPV0VEX0dBU1RPX1RZUEVTLmhhcyhwYXJzZWQpKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICByZXR1cm4gcGFyc2VkIGFzIEV4cGVuc2VHYXN0b1R5cGVDb2RlO1xufTtcblxuY29uc3Qgbm9ybWFsaXplUHJvY2Vzc2VkQnlJYUZpbHRlciA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwieWVzXCIpIHJldHVybiBcInllc1wiO1xuICBpZiAobm9ybWFsaXplZCA9PT0gXCJub1wiKSByZXR1cm4gXCJub1wiO1xuICByZXR1cm4gXCJhbGxcIjtcbn07XG5cbi8vIE5vcm1hbGl6ZXMgYSB0aWNrZXQgZmlsdGVyIHNuYXBzaG90IHNvIGNhY2hlIGFuZCBVSSBzdGF0ZSB1c2Ugb25lIGNhbm9uaWNhbCBzaGFwZS5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QgPSAoXG4gIHZhbHVlOiBQYXJ0aWFsPEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3Q+IHwgbnVsbCB8IHVuZGVmaW5lZFxuKTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9PiB7XG4gIHJldHVybiB7XG4gICAgZnJvbURhdGU6IFN0cmluZyh2YWx1ZT8uZnJvbURhdGUgfHwgXCJcIikudHJpbSgpLFxuICAgIHRvRGF0ZTogU3RyaW5nKHZhbHVlPy50b0RhdGUgfHwgXCJcIikudHJpbSgpLFxuICAgIGZpbHRlcktleTogU3RyaW5nKHZhbHVlPy5maWx0ZXJLZXkgfHwgXCJcIikudHJpbSgpLFxuICAgIGN1cnJlbmN5Q29kZTogU3RyaW5nKHZhbHVlPy5jdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLFxuICAgIHN0YXR1c0ZpbHRlcjogbm9ybWFsaXplRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUodmFsdWU/LnN0YXR1c0ZpbHRlciwgXCJcIiksXG4gICAgZ2FzdG9UeXBlRmlsdGVyOiBub3JtYWxpemVHYXN0b1R5cGVGaWx0ZXIodmFsdWU/Lmdhc3RvVHlwZUZpbHRlciksXG4gICAgcHJvY2Vzc2VkQnlJYUZpbHRlcjogbm9ybWFsaXplUHJvY2Vzc2VkQnlJYUZpbHRlcih2YWx1ZT8ucHJvY2Vzc2VkQnlJYUZpbHRlciksXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IGJ1aWxkRXhwZW5zZVRpY2tldExpc3RQYXlsb2FkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VQYXlsb2FkQnVpbGRlcnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCwgRXhwZW5zZVRpY2tldENhcmQgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YUFyZ3MgPSB7XG4gIGhhc0FjY2VzczogYm9vbGVhbjtcbiAgcGFnZVNpemU6IG51bWJlcjtcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XG59O1xuY29uc3QgQUxMT1dFRF9HQVNUT19UWVBFX0NPREVTID0gbmV3IFNldDxudW1iZXI+KFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0pO1xuXG5jb25zdCB0b051bGxhYmxlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XG59O1xuXG5jb25zdCB0b051bGxhYmxlQm9vbCA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gfCBudWxsID0+IHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHJldHVybiB2YWx1ZTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHZhbHVlID09PSAxID8gdHJ1ZSA6IHZhbHVlID09PSAwID8gZmFsc2UgOiBudWxsO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IHZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChub3JtYWxpemVkID09PSBcInRydWVcIiB8fCBub3JtYWxpemVkID09PSBcIjFcIikgcmV0dXJuIHRydWU7XG4gICAgaWYgKG5vcm1hbGl6ZWQgPT09IFwiZmFsc2VcIiB8fCBub3JtYWxpemVkID09PSBcIjBcIikgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3QgdG9OdWxsYWJsZVRpY2tldFN0YXR1cyA9ICh2YWx1ZTogdW5rbm93bik6IDAgfCAxIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBwYXJzZWQgPT09IDAgfHwgcGFyc2VkID09PSAxID8gcGFyc2VkIDogbnVsbDtcbn07XG5cbmNvbnN0IHRvTnVsbGFibGVUaWNrZXRHYXN0b1R5cGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlR2FzdG9UeXBlQ29kZSB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICBpZiAoIU51bWJlci5pc0ludGVnZXIocGFyc2VkKSB8fCAhQUxMT1dFRF9HQVNUT19UWVBFX0NPREVTLmhhcyhwYXJzZWQpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gcGFyc2VkIGFzIEV4cGVuc2VHYXN0b1R5cGVDb2RlO1xufTtcblxuY29uc3QgbWFwVGlja2V0SXRlbVRvQ2FyZCA9IChpdGVtOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IEV4cGVuc2VUaWNrZXRDYXJkID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmaWxlSWQ6IFN0cmluZyhpdGVtPy5GaWxlSWQgfHwgXCJcIikudHJpbSgpLFxuICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoaXRlbT8uRGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpLFxuICAgIHN0YXR1czogdG9OdWxsYWJsZVRpY2tldFN0YXR1cyhpdGVtPy5TdGF0dXMpLFxuICAgIGhvamFHYXN0b3NJZERpc3BsYXk6IFN0cmluZyhpdGVtPy5Ib2phR2FzdG9zSWREaXNwbGF5ID8/IGl0ZW0/LmhvamFHYXN0b3NJZERpc3BsYXkgPz8gXCJcIikudHJpbSgpLFxuICAgIHByb2Nlc3NlZEJ5QUk6IHRvTnVsbGFibGVCb29sKGl0ZW0/LlByb2Nlc3NlZEJ5QUkpLFxuICAgIGN1cnJlbmN5Q29kZTogU3RyaW5nKGl0ZW0/LkN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCksXG4gICAgdG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbT8uVG90YWxBbW91bnQpLFxuICAgIGNyZWF0ZWRCeVVzZXJJZDogU3RyaW5nKGl0ZW0/LkNyZWF0ZWRCeVVzZXJJZCB8fCBcIlwiKS50cmltKCksXG4gICAgdHJhbnNEYXRlOiBTdHJpbmcoaXRlbT8uVHJhbnNEYXRlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICB1cmxGaWxlOiBTdHJpbmcoaXRlbT8uVXJsRmlsZSB8fCBcIlwiKS50cmltKCksXG4gICAgZmlsZU5hbWU6IFN0cmluZyhpdGVtPy5GaWxlTmFtZSB8fCBcIlwiKS50cmltKCksXG4gICAgZ2FzdG9UeXBlOiB0b051bGxhYmxlVGlja2V0R2FzdG9UeXBlKGl0ZW0/Lkdhc3RvVHlwZSA/PyBpdGVtPy5nYXN0b1R5cGUpLFxuICB9O1xufTtcblxuLy8gT3ducyBsaXN0IGRhdGEgZmV0Y2gsIGxvYWRpbmcgc3RhdGUsIGFuZCBwYWdpbmF0aW9uIG1ldGFkYXRhIGZvciB0aWNrZXRzLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGEgPSAoeyBoYXNBY2Nlc3MsIHBhZ2VTaXplLCBvbkZvcmJpZGRlbiB9OiBVc2VFeHBlbnNlVGlja2V0c0xpc3REYXRhQXJncykgPT4ge1xuICBjb25zdCBbaXRlbXMsIHNldEl0ZW1zXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRDYXJkW10+KFtdKTtcbiAgY29uc3QgW3RvdGFsLCBzZXRUb3RhbF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2N1cnJlbnRQYWdlLCBzZXRDdXJyZW50UGFnZV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIGNvbnN0IHJlc3RvcmVMaXN0U25hcHNob3QgPSB1c2VDYWxsYmFjayhcbiAgICAoc25hcHNob3Q6IHsgaXRlbXM6IEV4cGVuc2VUaWNrZXRDYXJkW107IHRvdGFsOiBudW1iZXI7IHBhZ2U6IG51bWJlciB9KSA9PiB7XG4gICAgICBjb25zdCBzYWZlSXRlbXMgPSBBcnJheS5pc0FycmF5KHNuYXBzaG90Lml0ZW1zKSA/IHNuYXBzaG90Lml0ZW1zIDogW107XG4gICAgICBjb25zdCBzYWZlVG90YWxSYXcgPSBOdW1iZXIoc25hcHNob3QudG90YWwpO1xuICAgICAgY29uc3Qgc2FmZVRvdGFsID0gTnVtYmVyLmlzRmluaXRlKHNhZmVUb3RhbFJhdykgJiYgc2FmZVRvdGFsUmF3ID49IDAgPyBzYWZlVG90YWxSYXcgOiBzYWZlSXRlbXMubGVuZ3RoO1xuICAgICAgY29uc3Qgc2FmZVBhZ2VSYXcgPSBOdW1iZXIoc25hcHNob3QucGFnZSk7XG4gICAgICBjb25zdCBzYWZlUGFnZSA9IE51bWJlci5pc0Zpbml0ZShzYWZlUGFnZVJhdykgJiYgc2FmZVBhZ2VSYXcgPiAwID8gTWF0aC5mbG9vcihzYWZlUGFnZVJhdykgOiAxO1xuXG4gICAgICBzZXRJdGVtcyhzYWZlSXRlbXMpO1xuICAgICAgc2V0VG90YWwoc2FmZVRvdGFsKTtcbiAgICAgIHNldEN1cnJlbnRQYWdlKHNhZmVQYWdlKTtcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgfSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IGxvYWRMaXN0ID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKHBhZ2U6IG51bWJlciwgZmlsdGVyczogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4ge1xuICAgICAgaWYgKCFoYXNBY2Nlc3MpIHtcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZEV4cGVuc2VUaWNrZXRMaXN0UGF5bG9hZChmaWx0ZXJzLCBwYWdlLCBwYWdlU2l6ZSk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdChwYXlsb2FkLCB7XG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiVGlja2V0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXRzLlwiKSk7XG4gICAgICAgICAgc2V0SXRlbXMoW10pO1xuICAgICAgICAgIHNldFRvdGFsKDApO1xuICAgICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1hcHBlZEl0ZW1zID0gKEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW10pLm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICBtYXBUaWNrZXRJdGVtVG9DYXJkKGl0ZW0gYXMgdW5rbm93biBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VUb3RhbCA9IE51bWJlcihyZXNwb25zZT8uVG90YWwgPz8gbWFwcGVkSXRlbXMubGVuZ3RoID8/IDApO1xuICAgICAgICBjb25zdCBuZXh0VG90YWwgPSByZXNwb25zZVRvdGFsO1xuXG4gICAgICAgIHNldEl0ZW1zKG1hcHBlZEl0ZW1zKTtcbiAgICAgICAgc2V0VG90YWwobmV4dFRvdGFsKTtcbiAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiVGlja2V0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXRzLlwiKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICAgIHNldFRvdGFsKDApO1xuICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbaGFzQWNjZXNzLCBvbkZvcmJpZGRlbiwgcGFnZVNpemVdXG4gICk7XG5cbiAgY29uc3QgcmVzZXRMaXN0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEl0ZW1zKFtdKTtcbiAgICBzZXRUb3RhbCgwKTtcbiAgICBzZXRDdXJyZW50UGFnZSgxKTtcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIGl0ZW1zLFxuICAgIHRvdGFsLFxuICAgIGN1cnJlbnRQYWdlLFxuICAgIGlzTG9hZGluZyxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgbG9hZExpc3QsXG4gICAgcmVzdG9yZUxpc3RTbmFwc2hvdCxcbiAgICByZXNldExpc3QsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBub3JtYWxpemVFeHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCwgRXhwZW5zZVRpY2tldENhcmQgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5pbXBvcnQge1xuICBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksXG4gIGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXG4gIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXG4gIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeSxcbiAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSxcbn0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcblxuY29uc3QgRVhQRU5TRV9USUNLRVRTX0ZJTFRFUl9LRVlfUFJFRklYID0gXCJleHBlbnNlX3RpY2tldHNfZmlsdGVyX3YxXCI7XG5jb25zdCBFWFBFTlNFX1RJQ0tFVFNfUkVUVVJOX0ZMQUdfS0VZX1BSRUZJWCA9IFwiZXhwZW5zZV90aWNrZXRzX3JldHVybl92MVwiO1xuY29uc3QgRVhQRU5TRV9USUNLRVRTX0NBQ0hFX1RUTF9NUyA9IDEyICogNjAgKiA2MCAqIDEwMDA7XG5jb25zdCBBTExPV0VEX1RJQ0tFVF9HQVNUT19UWVBFUyA9IG5ldyBTZXQ8bnVtYmVyPihbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTRdKTtcblxuZXhwb3J0IHR5cGUgRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSA9IHtcbiAgZmlsdGVyczogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdDtcbiAgcGFnZTogbnVtYmVyO1xuICBzY3JvbGxZOiBudW1iZXI7XG4gIGZvY3VzRmlsZUlkOiBzdHJpbmc7XG4gIGl0ZW1zOiBFeHBlbnNlVGlja2V0Q2FyZFtdO1xuICB0b3RhbDogbnVtYmVyO1xufTtcblxuY29uc3QgZ2V0U2NvcGVUb2tlbiA9ICgpOiBzdHJpbmcgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIFwic2Vzc2lvblwiO1xuICBjb25zdCByYXcgPSBTdHJpbmcoKHdpbmRvdyBhcyB7IF9fSU5EX0VOVFJBX09JRF9fPzogdW5rbm93biB9KS5fX0lORF9FTlRSQV9PSURfXyB8fCBcIlwiKVxuICAgIC50cmltKClcbiAgICAudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIHJhdyB8fCBcInNlc3Npb25cIjtcbn07XG5cbmNvbnN0IGdldFNjb3BlZEtleXMgPSAoKSA9PiB7XG4gIGNvbnN0IHNjb3BlID0gZ2V0U2NvcGVUb2tlbigpO1xuICByZXR1cm4ge1xuICAgIGZpbHRlcktleTogYCR7RVhQRU5TRV9USUNLRVRTX0ZJTFRFUl9LRVlfUFJFRklYfV8ke3Njb3BlfWAsXG4gICAgcmV0dXJuRmxhZ0tleTogYCR7RVhQRU5TRV9USUNLRVRTX1JFVFVSTl9GTEFHX0tFWV9QUkVGSVh9XyR7c2NvcGV9YCxcbiAgfTtcbn07XG5cbmNvbnN0IHRvTnVsbGFibGVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZVN0YXR1cyA9ICh2YWx1ZTogdW5rbm93bik6IDAgfCAxIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIGlmIChwYXJzZWQgPT09IDAgfHwgcGFyc2VkID09PSAxKSByZXR1cm4gcGFyc2VkO1xuICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZVByb2Nlc3NlZEJ5QWkgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuIHwgbnVsbCA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gZmFsc2UpIHJldHVybiB2YWx1ZTtcbiAgaWYgKHZhbHVlID09PSAxIHx8IHZhbHVlID09PSBcIjFcIiB8fCB2YWx1ZSA9PT0gXCJ0cnVlXCIpIHJldHVybiB0cnVlO1xuICBpZiAodmFsdWUgPT09IDAgfHwgdmFsdWUgPT09IFwiMFwiIHx8IHZhbHVlID09PSBcImZhbHNlXCIpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCBub3JtYWxpemVUaWNrZXRHYXN0b1R5cGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlVGlja2V0Q2FyZFtcImdhc3RvVHlwZVwiXSA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpIHx8ICFBTExPV0VEX1RJQ0tFVF9HQVNUT19UWVBFUy5oYXMocGFyc2VkKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBwYXJzZWQgYXMgRXhwZW5zZVRpY2tldENhcmRbXCJnYXN0b1R5cGVcIl07XG59O1xuXG5jb25zdCBub3JtYWxpemVJdGVtcyA9IChyYXc6IHVua25vd24pOiBFeHBlbnNlVGlja2V0Q2FyZFtdID0+IHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHJhdykpIHJldHVybiBbXTtcblxuICByZXR1cm4gcmF3Lm1hcCgoZW50cnkpID0+IHtcbiAgICBjb25zdCBpdGVtID0gKGVudHJ5IHx8IHt9KSBhcyBQYXJ0aWFsPEV4cGVuc2VUaWNrZXRDYXJkPjtcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZUlkOiBTdHJpbmcoaXRlbS5maWxlSWQgfHwgXCJcIikudHJpbSgpLFxuICAgICAgZGVzY3JpcHRpb246IFN0cmluZyhpdGVtLmRlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKSxcbiAgICAgIHN0YXR1czogbm9ybWFsaXplU3RhdHVzKGl0ZW0uc3RhdHVzKSxcbiAgICAgIGhvamFHYXN0b3NJZERpc3BsYXk6IFN0cmluZyhpdGVtLmhvamFHYXN0b3NJZERpc3BsYXkgfHwgXCJcIikudHJpbSgpLFxuICAgICAgcHJvY2Vzc2VkQnlBSTogbm9ybWFsaXplUHJvY2Vzc2VkQnlBaShpdGVtLnByb2Nlc3NlZEJ5QUkpLFxuICAgICAgY3VycmVuY3lDb2RlOiBTdHJpbmcoaXRlbS5jdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLFxuICAgICAgdG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS50b3RhbEFtb3VudCksXG4gICAgICBjcmVhdGVkQnlVc2VySWQ6IFN0cmluZyhpdGVtLmNyZWF0ZWRCeVVzZXJJZCB8fCBcIlwiKS50cmltKCksXG4gICAgICB0cmFuc0RhdGU6IFN0cmluZyhpdGVtLnRyYW5zRGF0ZSB8fCBcIlwiKS50cmltKCksXG4gICAgICB1cmxGaWxlOiBTdHJpbmcoaXRlbS51cmxGaWxlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICAgIGZpbGVOYW1lOiBTdHJpbmcoaXRlbS5maWxlTmFtZSB8fCBcIlwiKS50cmltKCksXG4gICAgICBnYXN0b1R5cGU6IG5vcm1hbGl6ZVRpY2tldEdhc3RvVHlwZShpdGVtLmdhc3RvVHlwZSksXG4gICAgfTtcbiAgfSk7XG59O1xuXG5jb25zdCBub3JtYWxpemVTdGF0ZSA9IChyYXc6IEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUgfCBudWxsKTogRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSB8IG51bGwgPT4ge1xuICBpZiAoIXJhdyB8fCB0eXBlb2YgcmF3ICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBwYWdlUmF3ID0gTnVtYmVyKHJhdy5wYWdlKTtcbiAgY29uc3QgcGFnZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlUmF3KSAmJiBwYWdlUmF3ID4gMCA/IE1hdGguZmxvb3IocGFnZVJhdykgOiAxO1xuXG4gIGNvbnN0IHNjcm9sbFJhdyA9IE51bWJlcihyYXcuc2Nyb2xsWSk7XG4gIGNvbnN0IHNjcm9sbFkgPSBOdW1iZXIuaXNGaW5pdGUoc2Nyb2xsUmF3KSAmJiBzY3JvbGxSYXcgPj0gMCA/IE1hdGguZmxvb3Ioc2Nyb2xsUmF3KSA6IDA7XG4gIGNvbnN0IGl0ZW1zID0gbm9ybWFsaXplSXRlbXMoKHJhdyBhcyB7IGl0ZW1zPzogdW5rbm93biB9KS5pdGVtcyk7XG4gIGNvbnN0IHRvdGFsUmF3ID0gTnVtYmVyKChyYXcgYXMgeyB0b3RhbD86IHVua25vd24gfSkudG90YWwpO1xuICBjb25zdCB0b3RhbCA9IE51bWJlci5pc0Zpbml0ZSh0b3RhbFJhdykgJiYgdG90YWxSYXcgPj0gMCA/IHRvdGFsUmF3IDogaXRlbXMubGVuZ3RoO1xuXG4gIHJldHVybiB7XG4gICAgZmlsdGVyczogbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90KHJhdy5maWx0ZXJzKSxcbiAgICBwYWdlLFxuICAgIHNjcm9sbFksXG4gICAgZm9jdXNGaWxlSWQ6IFN0cmluZyhyYXcuZm9jdXNGaWxlSWQgfHwgXCJcIikudHJpbSgpLFxuICAgIGl0ZW1zLFxuICAgIHRvdGFsLFxuICB9O1xufTtcblxuLy8gQ2VudHJhbGl6ZXMgY2FjaGUgcGVyc2lzdGVuY2UgZm9yIHJldHVybmluZyBmcm9tIHRpY2tldCBkZXRhaWwgdG8gbGlzdC5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlID0gKCkgPT4ge1xuICBjb25zdCByZWFkQ2FjaGVkU3RhdGUgPSB1c2VDYWxsYmFjaygoKTogRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSB8IG51bGwgPT4ge1xuICAgIGNvbnN0IGtleXMgPSBnZXRTY29wZWRLZXlzKCk7XG4gICAgY29uc3QgcmF3ID0gZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5PEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGU+KGtleXMuZmlsdGVyS2V5KTtcbiAgICByZXR1cm4gbm9ybWFsaXplU3RhdGUocmF3KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNvbnN1bWVSZXR1cm5GbGFnID0gdXNlQ2FsbGJhY2soKCk6IGJvb2xlYW4gPT4ge1xuICAgIGNvbnN0IGtleXMgPSBnZXRTY29wZWRLZXlzKCk7XG4gICAgY29uc3QgcmF3ID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXlzLnJldHVybkZsYWdLZXkpO1xuICAgIGlmIChyYXcgPT09IFwiMVwiKSB7XG4gICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleXMucmV0dXJuRmxhZ0tleSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgc2F2ZUNhY2hlZFN0YXRlID0gdXNlQ2FsbGJhY2soKHN0YXRlOiBFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlKTogdm9pZCA9PiB7XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZVN0YXRlKHN0YXRlKTtcbiAgICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybjtcblxuICAgIGNvbnN0IGtleXMgPSBnZXRTY29wZWRLZXlzKCk7XG4gICAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5KGtleXMuZmlsdGVyS2V5LCBub3JtYWxpemVkLCBFWFBFTlNFX1RJQ0tFVFNfQ0FDSEVfVFRMX01TKTtcbiAgICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleXMucmV0dXJuRmxhZ0tleSwgXCIxXCIsIEVYUEVOU0VfVElDS0VUU19DQUNIRV9UVExfTVMpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY2xlYXJDYWNoZWRTdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBrZXlzID0gZ2V0U2NvcGVkS2V5cygpO1xuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5cy5maWx0ZXJLZXkpO1xuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5cy5yZXR1cm5GbGFnS2V5KTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgcmVhZENhY2hlZFN0YXRlLFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIHNhdmVDYWNoZWRTdGF0ZSxcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxuICB9O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQXVEOzs7QUNBdkQsSUFBQUMsZ0JBQStCOzs7QUNBL0IsbUJBQStCO0FBcUMzQjtBQXBCSixJQUFNLG1DQUFtQyxDQUFDO0FBQUEsRUFDeEM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUNYLFlBQVk7QUFDZCxNQUE2QztBQUMzQyxRQUFNLFVBQVUsVUFBVSxRQUFRLEtBQUs7QUFDdkMsUUFB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WTtBQUFBLFVBQ1oscUJBQW9CO0FBQUE7QUFBQSxNQUN0QixLQVhRLEdBQUcsTUFBTSxJQUFJLEtBQUssRUFZNUI7QUFBQSxJQUVKLENBQUMsR0FDSCxJQUNFO0FBQUEsSUFFSjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsUUFDQSxTQUFTO0FBQUEsUUFDVCxjQUFjLENBQUMsU0FBUztBQUN0QixjQUFJLENBQUMsZ0JBQWdCLFlBQVksQ0FBQyxnQkFBZ0IsUUFBUTtBQUN4RDtBQUFBLFVBQ0Y7QUFFQSxlQUFLLFNBQVMsTUFBTSxjQUFjO0FBQUEsUUFDcEM7QUFBQSxRQUNBLFFBQVE7QUFBQTtBQUFBLElBQ1Y7QUFBQSxJQUVDLGtCQUNDO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxXQUFXLEtBQUssNkJBQTZCLGtCQUFrQjtBQUFBLFFBQy9ELE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLGVBQWUsS0FBSyw2QkFBNkIsa0JBQWtCO0FBQUEsUUFDbkUsV0FBVztBQUFBO0FBQUEsSUFDYixJQUNFO0FBQUEsS0FDTjtBQUVKO0FBR0EsSUFBTSxxQkFBcUIsTUFBTTtBQUMvQixTQUNFLDZDQUFDLGdDQUNDLHVEQUFDLDZCQUEwQixHQUM3QjtBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsMEJBQXdCO0FBQ3hCLFFBQU0sU0FBUyxTQUFTLGVBQWUsc0JBQXNCO0FBQzdELE1BQUksQ0FBQyxPQUFRO0FBQ2IsbUJBQWlCLFFBQVEsNkNBQUMsc0JBQW1CLENBQUU7QUFDakQ7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLDZCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgInRvTnVsbGFibGVOdW1iZXIiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIkFMTE9XRURfR0FTVE9fVFlQRVMiLCAiUmVhY3QiXQp9Cg==
