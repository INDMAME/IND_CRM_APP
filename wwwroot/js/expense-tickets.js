import {
  ExpenseDateRangeFilter_default,
  ExpenseFilterActions_default,
  ExpenseQuickDateFilters_default,
  buildExpenseTicketListPayload
} from "./chunks/chunk-4W3I4SO4.js";
import {
  HistorySummary_default
} from "./chunks/chunk-PSIQGRBK.js";
import {
  getExpenseTicketStatusFilterOptions,
  getExpenseTicketStatusLabel,
  normalizeExpenseTicketStatusFilterCode
} from "./chunks/chunk-YK25Q5RF.js";
import {
  mapWindowEnumOptions
} from "./chunks/chunk-BVPBMOU4.js";
import {
  ExpenseCurrencyFilterSelect_default
} from "./chunks/chunk-JPVM4PLL.js";
import {
  RemoteSearchCombobox_default
} from "./chunks/chunk-FEF5YZEE.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  ExpenseTimelineCard_default
} from "./chunks/chunk-6FHEKASQ.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-XULPHUDU.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-I3FZBW7M.js";
import "./chunks/chunk-6YXFJB4W.js";
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
} from "./chunks/chunk-ZZ3K4DA3.js";
import {
  VisitasPageProviders_default
} from "./chunks/chunk-EVHUYAZN.js";
import {
  ApiFetchError,
  canAccess,
  indT,
  showPermissionModal
} from "./chunks/chunk-U25S3E2U.js";
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
var import_react6 = __toESM(require_react());

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
    onDateRangeChange,
    onManualRangeComplete,
    onQuickFilterChange,
    toggleFilterPanel
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/useExpenseTicketsListData.ts
var import_react5 = __toESM(require_react());
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
var mapTicketItemToCard = (item) => {
  const rawGastoType = toNullableNumber(item?.GastoType ?? item?.gastoType);
  const gastoType = rawGastoType === null ? null : rawGastoType;
  return {
    fileId: String(item?.FileId || "").trim(),
    description: String(item?.Description || "").trim(),
    status: toNullableNumber(item?.Status),
    hojaGastosIdDisplay: String(item?.HojaGastosIdDisplay ?? item?.hojaGastosIdDisplay ?? "").trim(),
    processedByAI: toNullableBool(item?.ProcessedByAI),
    currencyCode: String(item?.CurrencyCode || "").trim(),
    totalAmount: toNullableNumber(item?.TotalAmount),
    createdByUserId: String(item?.CreatedByUserId || "").trim(),
    transDate: String(item?.TransDate || "").trim(),
    urlFile: String(item?.UrlFile || "").trim(),
    fileName: String(item?.FileName || "").trim(),
    gastoType
  };
};
var useExpenseTicketsListData = ({ hasAccess, pageSize, onForbidden }) => {
  const [items, setItems] = (0, import_react5.useState)([]);
  const [total, setTotal] = (0, import_react5.useState)(0);
  const [currentPage, setCurrentPage] = (0, import_react5.useState)(1);
  const [isLoading, setIsLoading] = (0, import_react5.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react5.useState)("");
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
    resetList
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/ExpenseTicketsPage.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var PAGE_SIZE = 10;
var ALLOWED_GASTO_TYPES = /* @__PURE__ */ new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);
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
var ExpenseTicketsPageContent = () => {
  const hasAccess = canAccess("GASTOS_TICKETS", "View");
  const timelineContainerRef = import_react6.default.useRef(null);
  const paginationLabels = (0, import_react6.useMemo)(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last")
    }),
    []
  );
  const gastoTypeOptions = (0, import_react6.useMemo)(() => {
    const source = Array.isArray(window.__EXPENSE_GASTO_TYPES__) ? window.__EXPENSE_GASTO_TYPES__ : [];
    const mapped = mapWindowEnumOptions(source).filter((entry) => {
      const parsed = Number(entry.value);
      return Number.isInteger(parsed) && ALLOWED_GASTO_TYPES.has(parsed);
    });
    if (mapped.length > 0) {
      return mapped.sort((left, right) => Number(left.value) - Number(right.value));
    }
    return buildFallbackGastoTypeOptions();
  }, []);
  const gastoTypeLabelMap = (0, import_react6.useMemo)(() => {
    const map = /* @__PURE__ */ new Map();
    for (const option of gastoTypeOptions) {
      map.set(String(option.value), option.text);
    }
    return map;
  }, [gastoTypeOptions]);
  const { items, total, currentPage, isLoading, errorMessage, loadList, resetList } = useExpenseTicketsListData({
    hasAccess,
    pageSize: PAGE_SIZE,
    onForbidden: showPermissionModal
  });
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
    setFilterKey,
    setCurrencyCode,
    setStatusFilter,
    setGastoTypeFilter,
    setProcessedByIaFilter,
    onApply,
    onClear,
    onDateRangeChange,
    onManualRangeComplete,
    onQuickFilterChange,
    toggleFilterPanel
  } = useExpenseTicketsFiltersState({
    onApplyFilters: (snapshot) => {
      void loadList(1, snapshot);
    },
    onClearFilters: () => {
      resetList();
    }
  });
  const openTicketDetail = (0, import_react6.useCallback)((rawFileId) => {
    const fileId = safeText(rawFileId);
    if (!fileId) return;
    navigateToExpenseUrl(`/Gastos/TicketDetail?fileId=${encodeURIComponent(fileId)}`, {
      askConfirmation: true,
      bypassGuardOnce: false
    });
  }, []);
  const resolveClickableCard = (0, import_react6.useCallback)((target) => {
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
  const summaryItems = (0, import_react6.useMemo)(() => {
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
    summary.push({
      key: "status",
      label: indT("Tickets_Filter_Status", "Status"),
      value: snapshot.statusFilter === "" ? indT("Tickets_Filter_All", "All") : getExpenseTicketStatusLabel(snapshot.statusFilter)
    });
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
  (0, import_react6.useEffect)(() => {
    const onToggleFilters = () => {
      toggleFilterPanel();
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
  }, [appliedFilters, currentPage, loadList, toggleFilterPanel]);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-2", children: [
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
      const gastoTypeCode = item.gastoType === null ? "" : String(item.gastoType);
      const gastoTypeLabel = gastoTypeCode ? gastoTypeLabelMap.get(gastoTypeCode) || gastoTypeCode : "";
      const hojaGastosIdDisplay = safeText(item.hojaGastosIdDisplay);
      const subtitleParts = [];
      if (gastoTypeLabel) {
        subtitleParts.push(`${indT("Tickets_Filter_Category", "Category")}: ${gastoTypeLabel}`);
      }
      if (hojaGastosIdDisplay) {
        subtitleParts.push(
          `${indT("Tickets_Field_ExpenseSheetDisplay", "Expense sheet")}: ${hojaGastosIdDisplay}`
        );
      }
      const cardSubtitle = subtitleParts.join("   ");
      const statusIcons = isAssignedToExpenseSheet || showProcessedByAiIcon ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
        showProcessedByAiIcon ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "expense-ticket-card__status-icon", title: indT("Tickets_Filter_ProcessedByIA", "Processed by IA"), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.75",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: "h-5 w-5",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M8 16v-6a2 2 0 1 1 4 0v6" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M8 13h4" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M16 8v8" })
            ]
          }
        ) }) : null,
        isAssignedToExpenseSheet ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "expense-ticket-card__status-icon", title: statusLabel, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "h-4 w-4", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
          }
        ) }) }) : null
      ] }) : null;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "timeline-item", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
        onPageChange: (page) => {
          if (!appliedFilters?.fromDate || !appliedFilters?.toDate) {
            return;
          }
          void loadList(page, appliedFilters);
        },
        labels: paginationLabels
      }
    )
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL0V4cGVuc2VUaWNrZXRzUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcbmltcG9ydCBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbCBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbC50c3hcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlVGlja2V0U3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHsgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcbmltcG9ydCB7IG1hcFdpbmRvd0VudW1PcHRpb25zLCB0eXBlIEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMsIGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGUudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGEgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0c0xpc3REYXRhLnRzXCI7XG5cbmNvbnN0IFBBR0VfU0laRSA9IDEwO1xuY29uc3QgQUxMT1dFRF9HQVNUT19UWVBFUyA9IG5ldyBTZXQ8bnVtYmVyPihbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTRdKTtcblxuY29uc3QgR0FTVE9fVFlQRV9MQUJFTF9LRVlTOiBSZWNvcmQ8bnVtYmVyLCB7IGtleTogc3RyaW5nOyBmYWxsYmFjazogc3RyaW5nIH0+ID0ge1xuICAwOiB7IGtleTogXCJFbnVtX05vbmVcIiwgZmFsbGJhY2s6IFwiTm9uZVwiIH0sXG4gIDE6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1BlYWplXCIsIGZhbGxiYWNrOiBcIlBlYWplXCIgfSxcbiAgMjogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfUGFya2luZ1wiLCBmYWxsYmFjazogXCJQYXJraW5nXCIgfSxcbiAgMzogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfS21cIiwgZmFsbGJhY2s6IFwiS21cIiB9LFxuICA0OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9EZXNheXVub1wiLCBmYWxsYmFjazogXCJEZXNheXVub1wiIH0sXG4gIDU6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0NvbWlkYVwiLCBmYWxsYmFjazogXCJDb21pZGFcIiB9LFxuICA2OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9DZW5hXCIsIGZhbGxiYWNrOiBcIkNlbmFcIiB9LFxuICA3OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9Ib3RlbFwiLCBmYWxsYmFjazogXCJIb3RlbFwiIH0sXG4gIDg6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1Zhcmlvc1wiLCBmYWxsYmFjazogXCJWYXJpb3NcIiB9LFxuICAxNDogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfVGF4aVwiLCBmYWxsYmFjazogXCJUYXhpXCIgfSxcbn07XG5cbi8vIEluaXRpYWxpemVzIGF1dGggc2VlZCBmb3IgZXhwZW5zZSBBUEkgY2FsbHMgYmVmb3JlIGlzbGFuZCBlZmZlY3RzIHJ1bi5cbmNvbnN0IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoID0gKCkgPT4ge1xuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCh7XG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXG4gICAgYXBwQ29kZTogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxuICB9KTtcbn07XG5cbmNvbnN0IGJ1aWxkRmFsbGJhY2tHYXN0b1R5cGVPcHRpb25zID0gKCk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XG4gIHJldHVybiBPYmplY3QuZW50cmllcyhHQVNUT19UWVBFX0xBQkVMX0tFWVMpXG4gICAgLm1hcCgoW2NvZGUsIGNmZ10pID0+ICh7XG4gICAgICB2YWx1ZTogU3RyaW5nKGNvZGUpLFxuICAgICAgdGV4dDogaW5kVChjZmcua2V5LCBjZmcuZmFsbGJhY2spLFxuICAgIH0pKVxuICAgIC5zb3J0KChsZWZ0LCByaWdodCkgPT4gTnVtYmVyKGxlZnQudmFsdWUpIC0gTnVtYmVyKHJpZ2h0LnZhbHVlKSk7XG59O1xuXG5jb25zdCBFeHBlbnNlVGlja2V0c1BhZ2VDb250ZW50ID0gKCkgPT4ge1xuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIlZpZXdcIik7XG4gIGNvbnN0IHRpbWVsaW5lQ29udGFpbmVyUmVmID0gUmVhY3QudXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxuICAgIH0pLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgZ2FzdG9UeXBlT3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiB7XG4gICAgY29uc3Qgc291cmNlID0gQXJyYXkuaXNBcnJheSh3aW5kb3cuX19FWFBFTlNFX0dBU1RPX1RZUEVTX18pID8gd2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fIDogW107XG4gICAgY29uc3QgbWFwcGVkID0gbWFwV2luZG93RW51bU9wdGlvbnMoc291cmNlKS5maWx0ZXIoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBwYXJzZWQgPSBOdW1iZXIoZW50cnkudmFsdWUpO1xuICAgICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIocGFyc2VkKSAmJiBBTExPV0VEX0dBU1RPX1RZUEVTLmhhcyhwYXJzZWQpO1xuICAgIH0pO1xuXG4gICAgaWYgKG1hcHBlZC5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gbWFwcGVkLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiBOdW1iZXIobGVmdC52YWx1ZSkgLSBOdW1iZXIocmlnaHQudmFsdWUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVpbGRGYWxsYmFja0dhc3RvVHlwZU9wdGlvbnMoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGdhc3RvVHlwZUxhYmVsTWFwID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBnYXN0b1R5cGVPcHRpb25zKSB7XG4gICAgICBtYXAuc2V0KFN0cmluZyhvcHRpb24udmFsdWUpLCBvcHRpb24udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiBtYXA7XG4gIH0sIFtnYXN0b1R5cGVPcHRpb25zXSk7XG5cbiAgY29uc3QgeyBpdGVtcywgdG90YWwsIGN1cnJlbnRQYWdlLCBpc0xvYWRpbmcsIGVycm9yTWVzc2FnZSwgbG9hZExpc3QsIHJlc2V0TGlzdCB9ID0gdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YSh7XG4gICAgaGFzQWNjZXNzLFxuICAgIHBhZ2VTaXplOiBQQUdFX1NJWkUsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuXG4gIGNvbnN0IHtcbiAgICBmcm9tRGF0ZSxcbiAgICB0b0RhdGUsXG4gICAgZmlsdGVyS2V5LFxuICAgIGN1cnJlbmN5Q29kZSxcbiAgICBzdGF0dXNGaWx0ZXIsXG4gICAgZ2FzdG9UeXBlRmlsdGVyLFxuICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVFcnJvcixcbiAgICBtYW51YWxEYXRlQXV0b09wZW5LZXksXG4gICAgYXBwbGllZEZpbHRlcnMsXG4gICAgc2hvd0ZpbHRlcnMsXG4gICAgc2V0RmlsdGVyS2V5LFxuICAgIHNldEN1cnJlbmN5Q29kZSxcbiAgICBzZXRTdGF0dXNGaWx0ZXIsXG4gICAgc2V0R2FzdG9UeXBlRmlsdGVyLFxuICAgIHNldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gICAgb25BcHBseSxcbiAgICBvbkNsZWFyLFxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlLFxuICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcbiAgICBvblF1aWNrRmlsdGVyQ2hhbmdlLFxuICAgIHRvZ2dsZUZpbHRlclBhbmVsLFxuICB9ID0gdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGUoe1xuICAgIG9uQXBwbHlGaWx0ZXJzOiAoc25hcHNob3QpID0+IHtcbiAgICAgIHZvaWQgbG9hZExpc3QoMSwgc25hcHNob3QpO1xuICAgIH0sXG4gICAgb25DbGVhckZpbHRlcnM6ICgpID0+IHtcbiAgICAgIHJlc2V0TGlzdCgpO1xuICAgIH0sXG4gIH0pO1xuXG4gIGNvbnN0IG9wZW5UaWNrZXREZXRhaWwgPSB1c2VDYWxsYmFjaygocmF3RmlsZUlkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChyYXdGaWxlSWQpO1xuICAgIGlmICghZmlsZUlkKSByZXR1cm47XG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsP2ZpbGVJZD0ke2VuY29kZVVSSUNvbXBvbmVudChmaWxlSWQpfWAsIHtcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcbiAgICAgIGJ5cGFzc0d1YXJkT25jZTogZmFsc2UsXG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcbiAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xuICAgIGlmICghdGltZWxpbmVDb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjYXJkO1xuICB9LCBbXSk7XG5cbiAgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyh7XG4gICAgY29udGFpbmVyUmVmOiB0aW1lbGluZUNvbnRhaW5lclJlZixcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgaXRlbXMsXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXG4gIH0pO1xuXG4gIGNvbnN0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwoKHRvdGFsIHx8IDApIC8gUEFHRV9TSVpFKTtcblxuICBjb25zdCBzdW1tYXJ5SXRlbXMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBzbmFwc2hvdCA9IGFwcGxpZWRGaWx0ZXJzO1xuICAgIGlmICghc25hcHNob3QpIHJldHVybiBbXSBhcyBBcnJheTx7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0+O1xuXG4gICAgY29uc3Qgc3VtbWFyeTogQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9PiA9IFtdO1xuICAgIGNvbnN0IGxvY2FsZSA9IGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiO1xuICAgIGNvbnN0IGZyb21EYXRlVGV4dCA9IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShzbmFwc2hvdC5mcm9tRGF0ZSwgbG9jYWxlLCBcIlwiKTtcbiAgICBjb25zdCB0b0RhdGVUZXh0ID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKHNuYXBzaG90LnRvRGF0ZSwgbG9jYWxlLCBcIlwiKTtcblxuICAgIGlmIChmcm9tRGF0ZVRleHQgfHwgdG9EYXRlVGV4dCkge1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcImZyb21EYXRlXCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKSxcbiAgICAgICAgdmFsdWU6IGZyb21EYXRlVGV4dCB8fCBcIi0tXCIsXG4gICAgICB9KTtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJ0b0RhdGVcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIiksXG4gICAgICAgIHZhbHVlOiB0b0RhdGVUZXh0IHx8IFwiLS1cIixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChzbmFwc2hvdC5maWx0ZXJLZXkudHJpbSgpKSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwiZmlsdGVyS2V5XCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfRmlsdGVyS2V5XCIsIFwiVGlja2V0XCIpLFxuICAgICAgICB2YWx1ZTogc25hcHNob3QuZmlsdGVyS2V5LnRyaW0oKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChzbmFwc2hvdC5jdXJyZW5jeUNvZGUudHJpbSgpKSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwiY3VycmVuY3lcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpLFxuICAgICAgICB2YWx1ZTogc25hcHNob3QuY3VycmVuY3lDb2RlLnRyaW0oKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICBrZXk6IFwic3RhdHVzXCIsXG4gICAgICBsYWJlbDogaW5kVChcIlRpY2tldHNfRmlsdGVyX1N0YXR1c1wiLCBcIlN0YXR1c1wiKSxcbiAgICAgIHZhbHVlOlxuICAgICAgICBzbmFwc2hvdC5zdGF0dXNGaWx0ZXIgPT09IFwiXCJcbiAgICAgICAgICA/IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9BbGxcIiwgXCJBbGxcIilcbiAgICAgICAgICA6IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbChzbmFwc2hvdC5zdGF0dXNGaWx0ZXIpLFxuICAgIH0pO1xuXG4gICAgaWYgKHNuYXBzaG90Lmdhc3RvVHlwZUZpbHRlciAhPT0gXCJcIikge1xuICAgICAgY29uc3QgY2F0ZWdvcnlMYWJlbCA9IGdhc3RvVHlwZUxhYmVsTWFwLmdldChTdHJpbmcoc25hcHNob3QuZ2FzdG9UeXBlRmlsdGVyKSkgfHwgU3RyaW5nKHNuYXBzaG90Lmdhc3RvVHlwZUZpbHRlcik7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwiY2F0ZWdvcnlcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpLFxuICAgICAgICB2YWx1ZTogY2F0ZWdvcnlMYWJlbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChzbmFwc2hvdC5wcm9jZXNzZWRCeUlhRmlsdGVyICE9PSBcImFsbFwiKSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwicHJvY2Vzc2VkXCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQVwiLCBcIlByb2Nlc3NlZCBieSBJQVwiKSxcbiAgICAgICAgdmFsdWU6XG4gICAgICAgICAgc25hcHNob3QucHJvY2Vzc2VkQnlJYUZpbHRlciA9PT0gXCJ5ZXNcIlxuICAgICAgICAgICAgPyBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9ZZXNcIiwgXCJZZXNcIilcbiAgICAgICAgICAgIDogaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFfTm9cIiwgXCJOb1wiKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzdW1tYXJ5O1xuICB9LCBbYXBwbGllZEZpbHRlcnMsIGdhc3RvVHlwZUxhYmVsTWFwXSk7XG5cbiAgY29uc3Qgc2hvd1N1bW1hcnkgPSAhc2hvd0ZpbHRlcnMgJiYgc3VtbWFyeUl0ZW1zLmxlbmd0aCA+IDA7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvblRvZ2dsZUZpbHRlcnMgPSAoKSA9PiB7XG4gICAgICB0b2dnbGVGaWx0ZXJQYW5lbCgpO1xuICAgIH07XG5cbiAgICBjb25zdCBvblJlZnJlc2ggPSAoKSA9PiB7XG4gICAgICBpZiAoIWFwcGxpZWRGaWx0ZXJzPy5mcm9tRGF0ZSB8fCAhYXBwbGllZEZpbHRlcnM/LnRvRGF0ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZvaWQgbG9hZExpc3QoY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLCBhcHBsaWVkRmlsdGVycyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXhwZW5zZS10aWNrZXRzLXRvZ2dsZS1maWx0ZXJcIiwgb25Ub2dnbGVGaWx0ZXJzKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXRpY2tldHMtdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXRpY2tldHMtcmVmcmVzaFwiLCBvblJlZnJlc2gpO1xuICAgIH07XG4gIH0sIFthcHBsaWVkRmlsdGVycywgY3VycmVudFBhZ2UsIGxvYWRMaXN0LCB0b2dnbGVGaWx0ZXJQYW5lbF0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgIHtzaG93U3VtbWFyeSA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItY2FyZCBmaWx0ZXItY2FyZC0tc3VtbWFyeSBwLTMgc206cC00IG10LTEgbWItM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhwZW5zZS1zdW1tYXJ5LWdyaWQgZ3JpZCBncmlkLWNvbHMtMSBtaW4tWzM2MHB4XTpncmlkLWNvbHMtMiBpdGVtcy1zdGFydCBnYXAteC00IGdhcC15LTEgdGV4dC14c1wiPlxuICAgICAgICAgICAge3N1bW1hcnlJdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e2Ake2l0ZW0ua2V5fS0ke2l0ZW0udmFsdWV9LSR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdW1tYXJ5IGhpc3RvcnktZmlsdGVyLXN1bW1hcnktLWdyaWQtaXRlbSBsZWFkaW5nLTUgbWluLXctMFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdW1tYXJ5X19sYWJlbCBmb250LXNlbWlib2xkXCI+e2l0ZW0ubGFiZWx9Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdW1tYXJ5X192YWx1ZSBicmVhay13b3Jkc1wiPntpdGVtLnZhbHVlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgPEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsXG4gICAgICAgIHZpc2libGU9e3Nob3dGaWx0ZXJzfVxuICAgICAgICBzaG93TWFudWFsRGF0ZUZpbHRlcj17c2hvd01hbnVhbERhdGVGaWx0ZXJ9XG4gICAgICAgIG1hbnVhbERhdGVBdXRvT3BlbktleT17bWFudWFsRGF0ZUF1dG9PcGVuS2V5fVxuICAgICAgICBmcm9tRGF0ZT17ZnJvbURhdGV9XG4gICAgICAgIHRvRGF0ZT17dG9EYXRlfVxuICAgICAgICBmaWx0ZXJLZXk9e2ZpbHRlcktleX1cbiAgICAgICAgY3VycmVuY3lDb2RlPXtjdXJyZW5jeUNvZGV9XG4gICAgICAgIHN0YXR1c0ZpbHRlcj17c3RhdHVzRmlsdGVyfVxuICAgICAgICBnYXN0b1R5cGVGaWx0ZXI9e2dhc3RvVHlwZUZpbHRlcn1cbiAgICAgICAgcHJvY2Vzc2VkQnlJYUZpbHRlcj17cHJvY2Vzc2VkQnlJYUZpbHRlcn1cbiAgICAgICAgYWN0aXZlUXVpY2tGaWx0ZXI9e2FjdGl2ZVF1aWNrRmlsdGVyfVxuICAgICAgICBzaG93TWFudWFsRGF0ZUVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yfVxuICAgICAgICBnYXN0b1R5cGVPcHRpb25zPXtnYXN0b1R5cGVPcHRpb25zfVxuICAgICAgICBvbkRhdGVSYW5nZUNoYW5nZT17b25EYXRlUmFuZ2VDaGFuZ2V9XG4gICAgICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZT17b25NYW51YWxSYW5nZUNvbXBsZXRlfVxuICAgICAgICBvblF1aWNrRmlsdGVyQ2hhbmdlPXtvblF1aWNrRmlsdGVyQ2hhbmdlfVxuICAgICAgICBvbkZpbHRlcktleUNoYW5nZT17c2V0RmlsdGVyS2V5fVxuICAgICAgICBvbkN1cnJlbmN5Q29kZUNoYW5nZT17c2V0Q3VycmVuY3lDb2RlfVxuICAgICAgICBvblN0YXR1c0ZpbHRlckNoYW5nZT17c2V0U3RhdHVzRmlsdGVyfVxuICAgICAgICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZT17c2V0R2FzdG9UeXBlRmlsdGVyfVxuICAgICAgICBvblByb2Nlc3NlZEJ5SWFGaWx0ZXJDaGFuZ2U9e3NldFByb2Nlc3NlZEJ5SWFGaWx0ZXJ9XG4gICAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XG4gICAgICAgIG9uQXBwbHk9e29uQXBwbHl9XG4gICAgICAvPlxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cbiAgICAgID5cbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cbiAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtlcnJvck1lc3NhZ2UgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxuXG4gICAgICB7IWlzTG9hZGluZyAmJiAhZXJyb3JNZXNzYWdlICYmIGl0ZW1zLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2luZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKX0gLz5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7IWVycm9yTWVzc2FnZSAmJiBpdGVtcy5sZW5ndGggPiAwID8gKFxuICAgICAgICA8ZGl2IHJlZj17dGltZWxpbmVDb250YWluZXJSZWZ9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveFwiPlxuICAgICAgICAgIHtpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChpdGVtLmZpbGVJZCk7XG4gICAgICAgICAgICBjb25zdCBkYXRlUGFydHMgPSBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzKGl0ZW0udHJhbnNEYXRlLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIik7XG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IHNhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pIHx8IHNhZmVUZXh0KGl0ZW0uZmlsZU5hbWUpIHx8IGZpbGVJZCB8fCBcIi1cIjtcbiAgICAgICAgICAgIGNvbnN0IGFtb3VudFRleHQgPSBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koaXRlbS50b3RhbEFtb3VudCA/PyBudWxsLCBzYWZlVGV4dChpdGVtLmN1cnJlbmN5Q29kZSkpO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzQ29kZSA9IGl0ZW0uc3RhdHVzO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzTGFiZWwgPSBnZXRFeHBlbnNlVGlja2V0U3RhdHVzTGFiZWwoc3RhdHVzQ29kZSk7XG4gICAgICAgICAgICBjb25zdCBpc0Fzc2lnbmVkVG9FeHBlbnNlU2hlZXQgPSBzdGF0dXNDb2RlID09PSAxO1xuICAgICAgICAgICAgY29uc3Qgc2hvd1Byb2Nlc3NlZEJ5QWlJY29uID0gaXRlbS5wcm9jZXNzZWRCeUFJID09PSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgZ2FzdG9UeXBlQ29kZSA9IGl0ZW0uZ2FzdG9UeXBlID09PSBudWxsID8gXCJcIiA6IFN0cmluZyhpdGVtLmdhc3RvVHlwZSk7XG4gICAgICAgICAgICBjb25zdCBnYXN0b1R5cGVMYWJlbCA9IGdhc3RvVHlwZUNvZGUgPyBnYXN0b1R5cGVMYWJlbE1hcC5nZXQoZ2FzdG9UeXBlQ29kZSkgfHwgZ2FzdG9UeXBlQ29kZSA6IFwiXCI7XG4gICAgICAgICAgICBjb25zdCBob2phR2FzdG9zSWREaXNwbGF5ID0gc2FmZVRleHQoaXRlbS5ob2phR2FzdG9zSWREaXNwbGF5KTtcbiAgICAgICAgICAgIGNvbnN0IHN1YnRpdGxlUGFydHM6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICBpZiAoZ2FzdG9UeXBlTGFiZWwpIHtcbiAgICAgICAgICAgICAgc3VidGl0bGVQYXJ0cy5wdXNoKGAke2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfTogJHtnYXN0b1R5cGVMYWJlbH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChob2phR2FzdG9zSWREaXNwbGF5KSB7XG4gICAgICAgICAgICAgIHN1YnRpdGxlUGFydHMucHVzaChcbiAgICAgICAgICAgICAgICBgJHtpbmRUKFwiVGlja2V0c19GaWVsZF9FeHBlbnNlU2hlZXREaXNwbGF5XCIsIFwiRXhwZW5zZSBzaGVldFwiKX06ICR7aG9qYUdhc3Rvc0lkRGlzcGxheX1gXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjYXJkU3VidGl0bGUgPSBzdWJ0aXRsZVBhcnRzLmpvaW4oXCIgICBcIik7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNJY29ucyA9IGlzQXNzaWduZWRUb0V4cGVuc2VTaGVldCB8fCBzaG93UHJvY2Vzc2VkQnlBaUljb24gPyAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAge3Nob3dQcm9jZXNzZWRCeUFpSWNvbiA/IChcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImV4cGVuc2UtdGlja2V0LWNhcmRfX3N0YXR1cy1pY29uXCIgdGl0bGU9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBXCIsIFwiUHJvY2Vzc2VkIGJ5IElBXCIpfT5cbiAgICAgICAgICAgICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPVwiMjRcIlxuICAgICAgICAgICAgICAgICAgICAgIGhlaWdodD1cIjI0XCJcbiAgICAgICAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICAgICAgICAgICAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuNzVcIlxuICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC01IHctNVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2U9XCJub25lXCIgZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk04IDE2di02YTIgMiAwIDEgMSA0IDB2NlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk04IDEzaDRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTYgOHY4XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAge2lzQXNzaWduZWRUb0V4cGVuc2VTaGVldCA/IChcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImV4cGVuc2UtdGlja2V0LWNhcmRfX3N0YXR1cy1pY29uXCIgdGl0bGU9e3N0YXR1c0xhYmVsfT5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezEuNX0gc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPVwiaC00IHctNFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTEzLjE5IDguNjg4YTQuNSA0LjUgMCAwIDEgMS4yNDIgNy4yNDRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMS02LjM2NC02LjM2NGwxLjc1Ny0xLjc1N20xMy4zNS0uNjIyIDEuNzU3LTEuNzU3YTQuNSA0LjUgMCAwIDAtNi4zNjQtNi4zNjRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMCAxLjI0MiA3LjI0NFwiXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKSA6IG51bGw7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtgJHtmaWxlSWR9LSR7aW5kZXh9YH0gY2xhc3NOYW1lPVwidGltZWxpbmUtaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxFeHBlbnNlVGltZWxpbmVDYXJkXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgICAgICAgICAgIHN1YnRpdGxlPXtjYXJkU3VidGl0bGV9XG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxuICAgICAgICAgICAgICAgICAgb25PcGVuPXsoKSA9PiBvcGVuVGlja2V0RGV0YWlsKGZpbGVJZCl9XG4gICAgICAgICAgICAgICAgICB0aXRsZUNsYXNzTmFtZT1cImV4cGVuc2UtdGlja2V0LWNhcmRfX3RpdGxlIHRpbWVsaW5lLW5hbWVcIlxuICAgICAgICAgICAgICAgICAgc3RhdHVzTGFiZWw9e3N0YXR1c0xhYmVsfVxuICAgICAgICAgICAgICAgICAgc3RhdHVzSWNvbj17c3RhdHVzSWNvbnN9XG4gICAgICAgICAgICAgICAgICBzdGF0dXNJY29uQ2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb25zXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxuICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbFBhZ2VzfVxuICAgICAgICBjdXJyZW50UGFnZT17Y3VycmVudFBhZ2V9XG4gICAgICAgIG9uUGFnZUNoYW5nZT17KHBhZ2UpID0+IHtcbiAgICAgICAgICBpZiAoIWFwcGxpZWRGaWx0ZXJzPy5mcm9tRGF0ZSB8fCAhYXBwbGllZEZpbHRlcnM/LnRvRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZvaWQgbG9hZExpc3QocGFnZSwgYXBwbGllZEZpbHRlcnMpO1xuICAgICAgICB9fVxuICAgICAgICBsYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gTWFpbiBwYWdlIGVudHJ5IGZvciBleHBlbnNlIHRpY2tldHMgbGlzdC5cbmNvbnN0IEV4cGVuc2VUaWNrZXRzUGFnZSA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnM+XG4gICAgICA8RXhwZW5zZVRpY2tldHNQYWdlQ29udGVudCAvPlxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XG4gICk7XG59O1xuXG5jb25zdCBtb3VudCA9ICgpID0+IHtcbiAgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGgoKTtcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBlbnNlLXRpY2tldHMtcm9vdFwiKTtcbiAgaWYgKCFyb290RWwpIHJldHVybjtcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxFeHBlbnNlVGlja2V0c1BhZ2UgLz4pO1xufTtcblxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRzUGFnZTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi4vLi4vdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVN1bW1hcnkudHN4XCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHtcbiAgZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlck9wdGlvbnMsXG4gIG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlLFxuICB0eXBlIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VUaWNrZXRTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsIEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkIH0gZnJvbSBcIi4uL3RpY2tldHMvZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZURhdGVSYW5nZUZpbHRlciBmcm9tIFwiLi9FeHBlbnNlRGF0ZVJhbmdlRmlsdGVyLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VGaWx0ZXJBY3Rpb25zIGZyb20gXCIuL0V4cGVuc2VGaWx0ZXJBY3Rpb25zLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJzIGZyb20gXCIuL0V4cGVuc2VRdWlja0RhdGVGaWx0ZXJzLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dCBmcm9tIFwiLi9FeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQudHN4XCI7XG5cbmNvbnN0IHBhcnNlSXNvRGF0ZSA9IChyYXc6IHN0cmluZyk6IERhdGUgfCBudWxsID0+IHtcbiAgaWYgKCFyYXcpIHJldHVybiBudWxsO1xuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcpLnRyaW0oKS5zcGxpdChcIlRcIilbMF07XG4gIGlmICghL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QodmFsdWUpKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gdmFsdWUuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xuICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xufTtcblxuY29uc3QgZm9ybWF0RGF0ZSA9IChyYXc6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBkYXRlID0gcGFyc2VJc29EYXRlKHJhdyk7XG4gIGlmICghZGF0ZSkgcmV0dXJuIFwiLS1cIjtcbiAgcmV0dXJuIGRhdGVcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwge1xuICAgICAgZGF5OiBcIm51bWVyaWNcIixcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICB9KVxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcbiAgICAudG9Mb3dlckNhc2UoKTtcbn07XG5cbnR5cGUgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWxQcm9wcyA9IHtcbiAgdmlzaWJsZTogYm9vbGVhbjtcbiAgc2hvd01hbnVhbERhdGVGaWx0ZXI6IGJvb2xlYW47XG4gIG1hbnVhbERhdGVBdXRvT3BlbktleTogbnVtYmVyO1xuICBmcm9tRGF0ZTogc3RyaW5nO1xuICB0b0RhdGU6IHN0cmluZztcbiAgZmlsdGVyS2V5OiBzdHJpbmc7XG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBzdGF0dXNGaWx0ZXI6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlO1xuICBnYXN0b1R5cGVGaWx0ZXI6IFwiXCIgfCBFeHBlbnNlR2FzdG9UeXBlQ29kZTtcbiAgcHJvY2Vzc2VkQnlJYUZpbHRlcjogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXI7XG4gIGFjdGl2ZVF1aWNrRmlsdGVyOiBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCB8IG51bGw7XG4gIHNob3dNYW51YWxEYXRlRXJyb3I6IGJvb2xlYW47XG4gIGdhc3RvVHlwZU9wdGlvbnM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXTtcbiAgb25EYXRlUmFuZ2VDaGFuZ2U6IChmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25NYW51YWxSYW5nZUNvbXBsZXRlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uUXVpY2tGaWx0ZXJDaGFuZ2U6IChmaWx0ZXJJZDogRXhwZW5zZVRpY2tldFF1aWNrRmlsdGVySWQpID0+IHZvaWQ7XG4gIG9uRmlsdGVyS2V5Q2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvblN0YXR1c0ZpbHRlckNoYW5nZTogKHZhbHVlOiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSkgPT4gdm9pZDtcbiAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogXCJcIiB8IEV4cGVuc2VHYXN0b1R5cGVDb2RlKSA9PiB2b2lkO1xuICBvblByb2Nlc3NlZEJ5SWFGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIpID0+IHZvaWQ7XG4gIG9uQ2xlYXI6ICgpID0+IHZvaWQ7XG4gIG9uQXBwbHk6ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBTaGFyZWQgdGlja2V0cyBmaWx0ZXIgcGFuZWwgd2l0aCBnbG9iYWwgcXVpY2sgZGF0ZSBmaWx0ZXJzIGFuZCBmaXhlZCB0aWNrZXQgZmlsdGVycy5cbmNvbnN0IEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsID0gKHtcbiAgdmlzaWJsZSxcbiAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXG4gIG1hbnVhbERhdGVBdXRvT3BlbktleSxcbiAgZnJvbURhdGUsXG4gIHRvRGF0ZSxcbiAgZmlsdGVyS2V5LFxuICBjdXJyZW5jeUNvZGUsXG4gIHN0YXR1c0ZpbHRlcixcbiAgZ2FzdG9UeXBlRmlsdGVyLFxuICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxuICBhY3RpdmVRdWlja0ZpbHRlcixcbiAgc2hvd01hbnVhbERhdGVFcnJvcixcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcbiAgb25EYXRlUmFuZ2VDaGFuZ2UsXG4gIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcbiAgb25RdWlja0ZpbHRlckNoYW5nZSxcbiAgb25GaWx0ZXJLZXlDaGFuZ2UsXG4gIG9uQ3VycmVuY3lDb2RlQ2hhbmdlLFxuICBvblN0YXR1c0ZpbHRlckNoYW5nZSxcbiAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2UsXG4gIG9uUHJvY2Vzc2VkQnlJYUZpbHRlckNoYW5nZSxcbiAgb25DbGVhcixcbiAgb25BcHBseSxcbn06IEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsUHJvcHMpID0+IHtcbiAgY29uc3Qgc3RhdHVzT3B0aW9ucyA9IHVzZU1lbW8oKCkgPT4gZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlck9wdGlvbnMoKSwgW10pO1xuXG4gIGNvbnN0IGNhdGVnb3J5T3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHsgdmFsdWU6IFwiXCIsIHRleHQ6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9BbGxcIiwgXCJBbGxcIikgfSxcbiAgICAgIC4uLmdhc3RvVHlwZU9wdGlvbnMsXG4gICAgXTtcbiAgfSwgW2dhc3RvVHlwZU9wdGlvbnNdKTtcblxuICBpZiAoIXZpc2libGUpIHJldHVybiBudWxsO1xuICBjb25zdCBsb2NhbGUgPSBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIjtcbiAgY29uc3Qgc2hvd0lubGluZURhdGVTdW1tYXJ5ID0gIXNob3dNYW51YWxEYXRlRmlsdGVyICYmICEhZnJvbURhdGUgJiYgISF0b0RhdGU7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1leHBhbmRlZCBwLTIgc206cC0yLjUgcmVsYXRpdmVcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3RhY2sgZmxleCBmbGV4LWNvbCBzcGFjZS15LTJcIj5cbiAgICAgICAgPEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJzIGFjdGl2ZVF1aWNrRmlsdGVyPXthY3RpdmVRdWlja0ZpbHRlcn0gb25RdWlja0ZpbHRlckNoYW5nZT17b25RdWlja0ZpbHRlckNoYW5nZX0gLz5cblxuICAgICAgICB7c2hvd01hbnVhbERhdGVGaWx0ZXIgPyAoXG4gICAgICAgICAgPEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXJcbiAgICAgICAgICAgIGZyb21EYXRlPXtmcm9tRGF0ZX1cbiAgICAgICAgICAgIHRvRGF0ZT17dG9EYXRlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRGF0ZVJhbmdlQ2hhbmdlfVxuICAgICAgICAgICAgb25SYW5nZUNvbXBsZXRlPXtvbk1hbnVhbFJhbmdlQ29tcGxldGV9XG4gICAgICAgICAgICBhdXRvT3BlblJlcXVlc3RJZD17bWFudWFsRGF0ZUF1dG9PcGVuS2V5fVxuICAgICAgICAgICAgc2hvd01hbnVhbEVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yfVxuICAgICAgICAgICAgc2hvd1N0YXJ0RXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3IgJiYgIWZyb21EYXRlfVxuICAgICAgICAgICAgc2hvd0VuZEVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yICYmICF0b0RhdGV9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IHNob3dJbmxpbmVEYXRlU3VtbWFyeSA/IChcbiAgICAgICAgICA8SGlzdG9yeVN1bW1hcnlcbiAgICAgICAgICAgIHN1bW1hcnlGcm9tTGFiZWw9e2luZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpfVxuICAgICAgICAgICAgc3VtbWFyeVRvTGFiZWw9e2luZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIil9XG4gICAgICAgICAgICBmcm9tVmFsdWU9e2Zvcm1hdERhdGUoZnJvbURhdGUsIGxvY2FsZSl9XG4gICAgICAgICAgICB0b1ZhbHVlPXtmb3JtYXREYXRlKHRvRGF0ZSwgbG9jYWxlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImdhcC15LTEgdGV4dC1bMTFweF0gcHgtMVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy00IGdhcC0yXCI+XG4gICAgICAgICAgPEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9GaWx0ZXJLZXlcIiwgXCJUaWNrZXRcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX0ZpbHRlcktleVwiLCBcIlRpY2tldFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtmaWx0ZXJLZXl9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25GaWx0ZXJLZXlDaGFuZ2V9XG4gICAgICAgICAgICBlbmFibGVSZW1vdGVTdWdnZXN0aW9uc1xuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgdmFsdWU9e2N1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkN1cnJlbmN5Q29kZUNoYW5nZX1cbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX1N0YXR1c1wiLCBcIlN0YXR1c1wiKX1cbiAgICAgICAgICAgIG9wdGlvbnM9e3N0YXR1c09wdGlvbnN9XG4gICAgICAgICAgICB2YWx1ZT17c3RhdHVzRmlsdGVyfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IG9uU3RhdHVzRmlsdGVyQ2hhbmdlKG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlKG5leHRWYWx1ZSwgXCJcIikpfVxuICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS10aWNrZXQtc3RhdHVzLWZpbHRlclwiXG4gICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIil9XG4gICAgICAgICAgICBvcHRpb25zPXtjYXRlZ29yeU9wdGlvbnN9XG4gICAgICAgICAgICB2YWx1ZT17Z2FzdG9UeXBlRmlsdGVyfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKG5leHRWYWx1ZSk7XG4gICAgICAgICAgICAgIGlmIChuZXh0VmFsdWUgPT09IFwiXCIgfHwgIU51bWJlci5pc0ludGVnZXIocGFyc2VkKSkge1xuICAgICAgICAgICAgICAgIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlKFwiXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZShwYXJzZWQgYXMgRXhwZW5zZUdhc3RvVHlwZUNvZGUpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtdGlja2V0LWdhc3RvdHlwZS1maWx0ZXJcIlxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0XG4gICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBXCIsIFwiUHJvY2Vzc2VkIGJ5IElBXCIpfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQVwiLCBcIlByb2Nlc3NlZCBieSBJQVwiKX1cbiAgICAgICAgICB2YWx1ZT17cHJvY2Vzc2VkQnlJYUZpbHRlcn1cbiAgICAgICAgICBvbkNoYW5nZT17b25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlfVxuICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgIC8+XG5cbiAgICAgICAgPEV4cGVuc2VGaWx0ZXJBY3Rpb25zXG4gICAgICAgICAgY2xlYXJMYWJlbD17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsZWFyXCIsIFwiQ2xlYXJcIil9XG4gICAgICAgICAgYXBwbHlMYWJlbD17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0FwcGx5XCIsIFwiQXBwbHlcIil9XG4gICAgICAgICAgb25DbGVhcj17b25DbGVhcn1cbiAgICAgICAgICBvbkFwcGx5PXtvbkFwcGx5fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0UHJvY2Vzc2VkQnlJYUZpbHRlciB9IGZyb20gXCIuLi90aWNrZXRzL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcblxudHlwZSBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICB2YWx1ZTogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXI7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyKSA9PiB2b2lkO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbn07XG5cbi8vIEZpeGVkIGVudW0gc2VsZWN0IGZvciBJQSBwcm9jZXNzaW5nIGZpbHRlciB3aXRoIEFsbC9ZZXMvTm8gb3B0aW9ucy5cbmNvbnN0IEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG59OiBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdFByb3BzKSA9PiB7XG4gIGNvbnN0IHVpVmFsdWUgPSB2YWx1ZSA9PT0gXCJhbGxcIiA/IFwiXCIgOiB2YWx1ZTtcbiAgY29uc3Qgb3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPihcbiAgICAoKSA9PiBbXG4gICAgICB7IHZhbHVlOiBcImFsbFwiLCB0ZXh0OiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzX0JvdGhcIiwgXCJBbGxcIikgfSxcbiAgICAgIHsgdmFsdWU6IFwieWVzXCIsIHRleHQ6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBX1llc1wiLCBcIlllc1wiKSB9LFxuICAgICAgeyB2YWx1ZTogXCJub1wiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9Ob1wiLCBcIk5vXCIpIH0sXG4gICAgXSxcbiAgICBbXVxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPFNlbGVjdENvbWJvYm94XG4gICAgICBsYWJlbD17bGFiZWx9XG4gICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICBvcHRpb25zPXtvcHRpb25zfVxuICAgICAgdmFsdWU9e3VpVmFsdWV9XG4gICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4ge1xuICAgICAgICBpZiAobmV4dFZhbHVlID09PSBcInllc1wiIHx8IG5leHRWYWx1ZSA9PT0gXCJub1wiIHx8IG5leHRWYWx1ZSA9PT0gXCJhbGxcIikge1xuICAgICAgICAgIG9uQ2hhbmdlKG5leHRWYWx1ZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG9uQ2hhbmdlKFwiYWxsXCIpO1xuICAgICAgfX1cbiAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIGlkQmFzZT1cImV4cGVuc2UtcHJvY2Vzc2VkLWJ5LWlhLWZpbHRlclwiXG4gICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0O1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlbW90ZVNlYXJjaENvbWJvYm94LCB7IHR5cGUgUmVtb3RlU2VhcmNoT3B0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9SZW1vdGVTZWFyY2hDb21ib2JveC50c3hcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bywgRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcblxudHlwZSBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXRQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBlbmFibGVSZW1vdGVTdWdnZXN0aW9ucz86IGJvb2xlYW47XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xufTtcblxuY29uc3QgU0VBUkNIX1BBR0VfU0laRSA9IDMwO1xuXG4vLyBCdWlsZHMgbWluaW1hbCBwYXlsb2FkIGZvciB0aWNrZXQga2V5IHN1Z2dlc3Rpb25zIHdpdGhvdXQgZGF0ZSBmaWx0ZXJzLlxuY29uc3QgYnVpbGRUaWNrZXRTdWdnZXN0UGF5bG9hZCA9ICh0ZXJtOiBzdHJpbmcsIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcik6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0ID0+IHtcbiAgY29uc3Qgc2FmZVRlcm0gPSBTdHJpbmcodGVybSB8fCBcIlwiKS50cmltKCk7XG4gIHJldHVybiB7XG4gICAgcGFnZTogTnVtYmVyLmlzRmluaXRlKHBhZ2UpICYmIHBhZ2UgPiAwID8gTWF0aC5mbG9vcihwYWdlKSA6IDEsXG4gICAgcGFnZVNpemU6IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gTWF0aC5mbG9vcihwYWdlU2l6ZSkgOiBTRUFSQ0hfUEFHRV9TSVpFLFxuICAgIHNlYXJjaEtleTogc2FmZVRlcm0gfHwgdW5kZWZpbmVkLFxuICAgIGZpbHRlcjogc2FmZVRlcm0gfHwgdW5kZWZpbmVkLFxuICB9O1xufTtcblxuY29uc3QgbWFwVGlja2V0T3B0aW9ucyA9IChpdGVtczogRXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG9bXSB8IHVuZGVmaW5lZCk6IFJlbW90ZVNlYXJjaE9wdGlvbltdID0+IHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW10pXG4gICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgZmlsZUlkID0gU3RyaW5nKGl0ZW0/LkZpbGVJZCB8fCBcIlwiKS50cmltKCk7XG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gU3RyaW5nKGl0ZW0/LkRlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGNvbnN0IHN1YnRpdGxlID0gZGVzY3JpcHRpb24gfHwgXCItXCI7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogZmlsZUlkLFxuICAgICAgICB0aXRsZTogZmlsZUlkLFxuICAgICAgICBzdWJ0aXRsZSxcbiAgICAgIH0gYXMgUmVtb3RlU2VhcmNoT3B0aW9uO1xuICAgIH0pXG4gICAgLmZpbHRlcihCb29sZWFuKSBhcyBSZW1vdGVTZWFyY2hPcHRpb25bXTtcbn07XG5cbi8vIFRpY2tldCBrZXkgZmlsdGVyIGlucHV0IHdpdGggcmVtb3RlIGxpc3Qgc3VnZ2VzdGlvbnMuXG5jb25zdCBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQgPSAoe1xuICBsYWJlbCxcbiAgcGxhY2Vob2xkZXIsXG4gIHZhbHVlLFxuICBvbkNoYW5nZSxcbiAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnMgPSB0cnVlLFxuICByZWFkT25seSA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICBzaG93TGFiZWwgPSB0cnVlLFxufTogRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0UHJvcHMpID0+IHtcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XG5cbiAgY29uc3QgbG9hZE9wdGlvbnMgPSB1c2VDYWxsYmFjayhhc3luYyAodGVybTogc3RyaW5nLCBzaWduYWw6IEFib3J0U2lnbmFsKTogUHJvbWlzZTxSZW1vdGVTZWFyY2hPcHRpb25bXT4gPT4ge1xuICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZFRpY2tldFN1Z2dlc3RQYXlsb2FkKHRlcm0sIDEsIFNFQVJDSF9QQUdFX1NJWkUpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0KHBheWxvYWQsIHtcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgc2lnbmFsLFxuICAgIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHJldHVybiBtYXBUaWNrZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBsb2FkT3B0aW9uc1BhZ2UgPSB1c2VDYWxsYmFjayhhc3luYyAodGVybTogc3RyaW5nLCBwYWdlOiBudW1iZXIsIF9wYWdlU2l6ZTogbnVtYmVyLCBzaWduYWw6IEFib3J0U2lnbmFsKSA9PiB7XG4gICAgY29uc3QgcGF5bG9hZCA9IGJ1aWxkVGlja2V0U3VnZ2VzdFBheWxvYWQodGVybSwgcGFnZSwgU0VBUkNIX1BBR0VfU0laRSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QocGF5bG9hZCwge1xuICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICBzaWduYWwsXG4gICAgfSk7XG5cbiAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIHRvdGFsOiAwLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IG1hcFRpY2tldE9wdGlvbnMocmVzcG9uc2U/Lkl0ZW1zKSxcbiAgICAgIHRvdGFsOiBOdW1iZXIocmVzcG9uc2U/LlRvdGFsIHx8IDApLFxuICAgIH07XG4gIH0sIFtdKTtcblxuICBpZiAoIWVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zIHx8IHJlYWRPbmx5TW9kZSkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICB7c2hvd0xhYmVsID8gKFxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIiBzdHlsZT17eyBjb2xvcjogXCIjMDAyOTZiZTBcIiB9fT5cbiAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcHgtMyBweS0yIHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTkwMCBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCJcbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XG4gICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxSZW1vdGVTZWFyY2hDb21ib2JveFxuICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgb25TZWFyY2g9e2FzeW5jICh0ZXJtLCBzaWduYWwpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbG9hZE9wdGlvbnModGVybSwgc2lnbmFsKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9fVxuICAgICAgb25TZWFyY2hQYWdlPXthc3luYyAodGVybSwgcGFnZSwgcGFnZVNpemUsIHNpZ25hbCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBhd2FpdCBsb2FkT3B0aW9uc1BhZ2UodGVybSwgcGFnZSwgcGFnZVNpemUsIHNpZ25hbCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgcmV0dXJuIHsgaXRlbXM6IFtdLCB0b3RhbDogMCB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICAgIGlkQmFzZT1cImV4cGVuc2UtdGlja2V0LWZpbHRlci1rZXlcIlxuICAgICAgbWluU2VhcmNoTGVuZ3RoPXswfVxuICAgICAgcGFnZVNpemU9e1NFQVJDSF9QQUdFX1NJWkV9XG4gICAgICBhbGxvd0VtcHR5U2VhcmNoXG4gICAgICBsb2FkT25PcGVuXG4gICAgICBpbmZpbml0ZVNjcm9sbFxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XG4gICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dDtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcbiAgRXhwZW5zZVRpY2tldFF1aWNrRmlsdGVySWQsXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlVGlja2V0U3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHsgc3RhcnRPZkRheSwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGVBcmdzID0ge1xuICBvbkFwcGx5RmlsdGVyczogKHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB2b2lkO1xuICBvbkNsZWFyRmlsdGVyczogKCkgPT4gdm9pZDtcbn07XG5cbi8vIE93bnMgZmlsdGVyIFVJIHN0YXRlIGFuZCBhcHBseS9jbGVhciBydWxlcyBmb3IgZXhwZW5zZSB0aWNrZXRzIGxpc3QgcGFnZS5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZSA9ICh7IG9uQXBwbHlGaWx0ZXJzLCBvbkNsZWFyRmlsdGVycyB9OiBVc2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZUFyZ3MpID0+IHtcbiAgY29uc3QgW2Zyb21EYXRlLCBzZXRGcm9tRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3RvRGF0ZSwgc2V0VG9EYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZmlsdGVyS2V5LCBzZXRGaWx0ZXJLZXldID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtjdXJyZW5jeUNvZGUsIHNldEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3N0YXR1c0ZpbHRlciwgc2V0U3RhdHVzRmlsdGVyXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlPihcIlwiKTtcbiAgY29uc3QgW2dhc3RvVHlwZUZpbHRlciwgc2V0R2FzdG9UeXBlRmlsdGVyXSA9IHVzZVN0YXRlPFwiXCIgfCBFeHBlbnNlR2FzdG9UeXBlQ29kZT4oXCJcIik7XG4gIGNvbnN0IFtwcm9jZXNzZWRCeUlhRmlsdGVyLCBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyXSA9IHVzZVN0YXRlPFwiYWxsXCIgfCBcInllc1wiIHwgXCJub1wiPihcImFsbFwiKTtcbiAgY29uc3QgW2FjdGl2ZVF1aWNrRmlsdGVyLCBzZXRBY3RpdmVRdWlja0ZpbHRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd01hbnVhbERhdGVGaWx0ZXIsIHNldFNob3dNYW51YWxEYXRlRmlsdGVyXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dNYW51YWxEYXRlRXJyb3IsIHNldFNob3dNYW51YWxEYXRlRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWFudWFsRGF0ZUF1dG9PcGVuS2V5LCBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXldID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFthcHBsaWVkRmlsdGVycywgc2V0QXBwbGllZEZpbHRlcnNdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd0ZpbHRlcnMsIHNldFNob3dGaWx0ZXJzXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIGNvbnN0IGN1cnJlbnRGaWx0ZXJzID0gdXNlTWVtbzxFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90PihcbiAgICAoKSA9PiAoe1xuICAgICAgZnJvbURhdGUsXG4gICAgICB0b0RhdGUsXG4gICAgICBmaWx0ZXJLZXk6IGZpbHRlcktleS50cmltKCksXG4gICAgICBjdXJyZW5jeUNvZGU6IGN1cnJlbmN5Q29kZS50cmltKCksXG4gICAgICBzdGF0dXNGaWx0ZXIsXG4gICAgICBnYXN0b1R5cGVGaWx0ZXIsXG4gICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxuICAgIH0pLFxuICAgIFtjdXJyZW5jeUNvZGUsIGZpbHRlcktleSwgZnJvbURhdGUsIGdhc3RvVHlwZUZpbHRlciwgcHJvY2Vzc2VkQnlJYUZpbHRlciwgc3RhdHVzRmlsdGVyLCB0b0RhdGVdXG4gICk7XG5cbiAgY29uc3Qgb25BcHBseSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWZyb21EYXRlIHx8ICF0b0RhdGUpIHtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IodHJ1ZSk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0ge1xuICAgICAgZnJvbURhdGUsXG4gICAgICB0b0RhdGUsXG4gICAgICBmaWx0ZXJLZXk6IGZpbHRlcktleS50cmltKCksXG4gICAgICBjdXJyZW5jeUNvZGU6IGN1cnJlbmN5Q29kZS50cmltKCksXG4gICAgICBzdGF0dXNGaWx0ZXIsXG4gICAgICBnYXN0b1R5cGVGaWx0ZXIsXG4gICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxuICAgIH07XG5cbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICBzZXRBcHBsaWVkRmlsdGVycyhzbmFwc2hvdCk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcbiAgICBvbkFwcGx5RmlsdGVycyhzbmFwc2hvdCk7XG4gIH0sIFtjdXJyZW5jeUNvZGUsIGZpbHRlcktleSwgZnJvbURhdGUsIGdhc3RvVHlwZUZpbHRlciwgb25BcHBseUZpbHRlcnMsIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsIHN0YXR1c0ZpbHRlciwgdG9EYXRlXSk7XG5cbiAgY29uc3Qgb25DbGVhciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRGcm9tRGF0ZShcIlwiKTtcbiAgICBzZXRUb0RhdGUoXCJcIik7XG4gICAgc2V0RmlsdGVyS2V5KFwiXCIpO1xuICAgIHNldEN1cnJlbmN5Q29kZShcIlwiKTtcbiAgICBzZXRTdGF0dXNGaWx0ZXIoXCJcIik7XG4gICAgc2V0R2FzdG9UeXBlRmlsdGVyKFwiXCIpO1xuICAgIHNldFByb2Nlc3NlZEJ5SWFGaWx0ZXIoXCJhbGxcIik7XG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgIHNldE1hbnVhbERhdGVBdXRvT3BlbktleSgwKTtcbiAgICBzZXRBcHBsaWVkRmlsdGVycyhudWxsKTtcbiAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcbiAgICBvbkNsZWFyRmlsdGVycygpO1xuICB9LCBbb25DbGVhckZpbHRlcnNdKTtcblxuICBjb25zdCBvbkRhdGVSYW5nZUNoYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgIChuZXh0RnJvbURhdGU6IHN0cmluZywgbmV4dFRvRGF0ZTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBoYXNGdWxsUmFuZ2UgPSAhIW5leHRGcm9tRGF0ZSAmJiAhIW5leHRUb0RhdGU7XG4gICAgICBzZXRGcm9tRGF0ZShuZXh0RnJvbURhdGUpO1xuICAgICAgc2V0VG9EYXRlKG5leHRUb0RhdGUpO1xuICAgICAgaWYgKCFoYXNGdWxsUmFuZ2UpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIodHJ1ZSk7XG4gICAgICB9XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgIGlmIChzaG93TWFudWFsRGF0ZUVycm9yKSB7XG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoIWhhc0Z1bGxSYW5nZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbc2hvd01hbnVhbERhdGVFcnJvcl1cbiAgKTtcblxuICBjb25zdCBvbk1hbnVhbFJhbmdlQ29tcGxldGUgPSB1c2VDYWxsYmFjaygobmV4dEZyb21EYXRlOiBzdHJpbmcsIG5leHRUb0RhdGU6IHN0cmluZykgPT4ge1xuICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XG4gICAgc2V0VG9EYXRlKG5leHRUb0RhdGUpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG9uUXVpY2tGaWx0ZXJDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAoZmlsdGVySWQ6IEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkKSA9PiB7XG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiY3VzdG9tXCIpIHtcbiAgICAgICAgaWYgKHNob3dNYW51YWxEYXRlRmlsdGVyKSB7XG4gICAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgICAgIHNldE1hbnVhbERhdGVBdXRvT3BlbktleSgocHJldmlvdXMpID0+IHByZXZpb3VzICsgMSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoZmlsdGVySWQpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG5cbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcbiAgICAgIGNvbnN0IG5leHRGcm9tID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtN1wiKSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gNik7XG4gICAgICB9IGVsc2UgaWYgKGZpbHRlcklkID09PSBcImRheXMtMzBcIikge1xuICAgICAgICBuZXh0RnJvbS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDI5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gODkpO1xuICAgICAgfVxuXG4gICAgICBzZXRGcm9tRGF0ZSh0b0lzb0RhdGUobmV4dEZyb20pKTtcbiAgICAgIHNldFRvRGF0ZSh0b0lzb0RhdGUodG9kYXkpKTtcbiAgICB9LFxuICAgIFtzaG93TWFudWFsRGF0ZUZpbHRlcl1cbiAgKTtcblxuICBjb25zdCB0b2dnbGVGaWx0ZXJQYW5lbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRTaG93RmlsdGVycygocHJldmlvdXMpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSAhcHJldmlvdXM7XG4gICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIGZyb21EYXRlLFxuICAgIHRvRGF0ZSxcbiAgICBmaWx0ZXJLZXksXG4gICAgY3VycmVuY3lDb2RlLFxuICAgIHN0YXR1c0ZpbHRlcixcbiAgICBnYXN0b1R5cGVGaWx0ZXIsXG4gICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgICBhY3RpdmVRdWlja0ZpbHRlcixcbiAgICBzaG93TWFudWFsRGF0ZUZpbHRlcixcbiAgICBzaG93TWFudWFsRGF0ZUVycm9yLFxuICAgIG1hbnVhbERhdGVBdXRvT3BlbktleSxcbiAgICBhcHBsaWVkRmlsdGVycyxcbiAgICBzaG93RmlsdGVycyxcbiAgICBjdXJyZW50RmlsdGVycyxcbiAgICBzZXRGaWx0ZXJLZXksXG4gICAgc2V0Q3VycmVuY3lDb2RlLFxuICAgIHNldFN0YXR1c0ZpbHRlcixcbiAgICBzZXRHYXN0b1R5cGVGaWx0ZXIsXG4gICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgICBvbkFwcGx5LFxuICAgIG9uQ2xlYXIsXG4gICAgb25EYXRlUmFuZ2VDaGFuZ2UsXG4gICAgb25NYW51YWxSYW5nZUNvbXBsZXRlLFxuICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXG4gICAgdG9nZ2xlRmlsdGVyUGFuZWwsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IGJ1aWxkRXhwZW5zZVRpY2tldExpc3RQYXlsb2FkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VQYXlsb2FkQnVpbGRlcnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCwgRXhwZW5zZVRpY2tldENhcmQgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YUFyZ3MgPSB7XG4gIGhhc0FjY2VzczogYm9vbGVhbjtcbiAgcGFnZVNpemU6IG51bWJlcjtcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XG59O1xuXG5jb25zdCB0b051bGxhYmxlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XG59O1xuXG5jb25zdCB0b051bGxhYmxlQm9vbCA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gfCBudWxsID0+IHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHJldHVybiB2YWx1ZTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHZhbHVlID09PSAxID8gdHJ1ZSA6IHZhbHVlID09PSAwID8gZmFsc2UgOiBudWxsO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IHZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChub3JtYWxpemVkID09PSBcInRydWVcIiB8fCBub3JtYWxpemVkID09PSBcIjFcIikgcmV0dXJuIHRydWU7XG4gICAgaWYgKG5vcm1hbGl6ZWQgPT09IFwiZmFsc2VcIiB8fCBub3JtYWxpemVkID09PSBcIjBcIikgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3QgbWFwVGlja2V0SXRlbVRvQ2FyZCA9IChpdGVtOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IEV4cGVuc2VUaWNrZXRDYXJkID0+IHtcbiAgY29uc3QgcmF3R2FzdG9UeXBlID0gdG9OdWxsYWJsZU51bWJlcihpdGVtPy5HYXN0b1R5cGUgPz8gaXRlbT8uZ2FzdG9UeXBlKTtcbiAgY29uc3QgZ2FzdG9UeXBlID0gcmF3R2FzdG9UeXBlID09PSBudWxsID8gbnVsbCA6IChyYXdHYXN0b1R5cGUgYXMgRXhwZW5zZUdhc3RvVHlwZUNvZGUpO1xuICByZXR1cm4ge1xuICAgIGZpbGVJZDogU3RyaW5nKGl0ZW0/LkZpbGVJZCB8fCBcIlwiKS50cmltKCksXG4gICAgZGVzY3JpcHRpb246IFN0cmluZyhpdGVtPy5EZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXG4gICAgc3RhdHVzOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0/LlN0YXR1cyksXG4gICAgaG9qYUdhc3Rvc0lkRGlzcGxheTogU3RyaW5nKGl0ZW0/LkhvamFHYXN0b3NJZERpc3BsYXkgPz8gaXRlbT8uaG9qYUdhc3Rvc0lkRGlzcGxheSA/PyBcIlwiKS50cmltKCksXG4gICAgcHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woaXRlbT8uUHJvY2Vzc2VkQnlBSSksXG4gICAgY3VycmVuY3lDb2RlOiBTdHJpbmcoaXRlbT8uQ3VycmVuY3lDb2RlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICB0b3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtPy5Ub3RhbEFtb3VudCksXG4gICAgY3JlYXRlZEJ5VXNlcklkOiBTdHJpbmcoaXRlbT8uQ3JlYXRlZEJ5VXNlcklkIHx8IFwiXCIpLnRyaW0oKSxcbiAgICB0cmFuc0RhdGU6IFN0cmluZyhpdGVtPy5UcmFuc0RhdGUgfHwgXCJcIikudHJpbSgpLFxuICAgIHVybEZpbGU6IFN0cmluZyhpdGVtPy5VcmxGaWxlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICBmaWxlTmFtZTogU3RyaW5nKGl0ZW0/LkZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSxcbiAgICBnYXN0b1R5cGUsXG4gIH07XG59O1xuXG4vLyBPd25zIGxpc3QgZGF0YSBmZXRjaCwgbG9hZGluZyBzdGF0ZSwgYW5kIHBhZ2luYXRpb24gbWV0YWRhdGEgZm9yIHRpY2tldHMuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YSA9ICh7IGhhc0FjY2VzcywgcGFnZVNpemUsIG9uRm9yYmlkZGVuIH06IFVzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGFBcmdzKSA9PiB7XG4gIGNvbnN0IFtpdGVtcywgc2V0SXRlbXNdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldENhcmRbXT4oW10pO1xuICBjb25zdCBbdG90YWwsIHNldFRvdGFsXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbY3VycmVudFBhZ2UsIHNldEN1cnJlbnRQYWdlXSA9IHVzZVN0YXRlKDEpO1xuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgY29uc3QgbG9hZExpc3QgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAocGFnZTogbnVtYmVyLCBmaWx0ZXJzOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB7XG4gICAgICBpZiAoIWhhc0FjY2Vzcykge1xuICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGJ1aWxkRXhwZW5zZVRpY2tldExpc3RQYXlsb2FkKGZpbHRlcnMsIHBhZ2UsIHBhZ2VTaXplKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0KHBheWxvYWQsIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJUaWNrZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldHMuXCIpKTtcbiAgICAgICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICAgICAgc2V0VG90YWwoMCk7XG4gICAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWFwcGVkSXRlbXMgPSAoQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXSkubWFwKChpdGVtKSA9PlxuICAgICAgICAgIG1hcFRpY2tldEl0ZW1Ub0NhcmQoaXRlbSBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVxuICAgICAgICApO1xuICAgICAgICBjb25zdCByZXNwb25zZVRvdGFsID0gTnVtYmVyKHJlc3BvbnNlPy5Ub3RhbCA/PyBtYXBwZWRJdGVtcy5sZW5ndGggPz8gMCk7XG4gICAgICAgIGNvbnN0IG5leHRUb3RhbCA9IHJlc3BvbnNlVG90YWw7XG5cbiAgICAgICAgc2V0SXRlbXMobWFwcGVkSXRlbXMpO1xuICAgICAgICBzZXRUb3RhbChuZXh0VG90YWwpO1xuICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJUaWNrZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldHMuXCIpO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIHNldEl0ZW1zKFtdKTtcbiAgICAgICAgc2V0VG90YWwoMCk7XG4gICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtoYXNBY2Nlc3MsIG9uRm9yYmlkZGVuLCBwYWdlU2l6ZV1cbiAgKTtcblxuICBjb25zdCByZXNldExpc3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0SXRlbXMoW10pO1xuICAgIHNldFRvdGFsKDApO1xuICAgIHNldEN1cnJlbnRQYWdlKDEpO1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgaXRlbXMsXG4gICAgdG90YWwsXG4gICAgY3VycmVudFBhZ2UsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBsb2FkTGlzdCxcbiAgICByZXNldExpc3QsXG4gIH07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQXVEOzs7QUNBdkQsSUFBQUMsZ0JBQStCOzs7QUNBL0IsbUJBQStCO0FBcUMzQjtBQXBCSixJQUFNLG1DQUFtQyxDQUFDO0FBQUEsRUFDeEM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUNYLFlBQVk7QUFDZCxNQUE2QztBQUMzQyxRQUFNLFVBQVUsVUFBVSxRQUFRLEtBQUs7QUFDdkMsUUFBTSxjQUFVO0FBQUEsSUFDZCxNQUFNO0FBQUEsTUFDSixFQUFFLE9BQU8sT0FBTyxNQUFNLEtBQUssb0NBQW9DLEtBQUssRUFBRTtBQUFBLE1BQ3RFLEVBQUUsT0FBTyxPQUFPLE1BQU0sS0FBSyxvQ0FBb0MsS0FBSyxFQUFFO0FBQUEsTUFDdEUsRUFBRSxPQUFPLE1BQU0sTUFBTSxLQUFLLG1DQUFtQyxJQUFJLEVBQUU7QUFBQSxJQUNyRTtBQUFBLElBQ0EsQ0FBQztBQUFBLEVBQ0g7QUFFQSxTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxPQUFPO0FBQUEsTUFDUCxVQUFVLENBQUMsY0FBYztBQUN2QixZQUFJLGNBQWMsU0FBUyxjQUFjLFFBQVEsY0FBYyxPQUFPO0FBQ3BFLG1CQUFTLFNBQVM7QUFDbEI7QUFBQSxRQUNGO0FBQ0EsaUJBQVMsS0FBSztBQUFBLE1BQ2hCO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLFFBQU87QUFBQSxNQUNQLGlCQUFnQjtBQUFBLE1BQ2hCLGdCQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQjtBQUFBO0FBQUEsRUFDRjtBQUVKO0FBRUEsSUFBTywyQ0FBUTs7O0FDNURmLElBQUFDLGdCQUFtQztBQWtHN0IsSUFBQUMsc0JBQUE7QUFqRk4sSUFBTSxtQkFBbUI7QUFHekIsSUFBTSw0QkFBNEIsQ0FBQyxNQUFjLE1BQWMsYUFBb0Q7QUFDakgsUUFBTSxXQUFXLE9BQU8sUUFBUSxFQUFFLEVBQUUsS0FBSztBQUN6QyxTQUFPO0FBQUEsSUFDTCxNQUFNLE9BQU8sU0FBUyxJQUFJLEtBQUssT0FBTyxJQUFJLEtBQUssTUFBTSxJQUFJLElBQUk7QUFBQSxJQUM3RCxVQUFVLE9BQU8sU0FBUyxRQUFRLEtBQUssV0FBVyxJQUFJLEtBQUssTUFBTSxRQUFRLElBQUk7QUFBQSxJQUM3RSxXQUFXLFlBQVk7QUFBQSxJQUN2QixRQUFRLFlBQVk7QUFBQSxFQUN0QjtBQUNGO0FBRUEsSUFBTSxtQkFBbUIsQ0FBQyxVQUE2RTtBQUNyRyxVQUFRLE1BQU0sUUFBUSxLQUFLLElBQUksUUFBUSxDQUFDLEdBQ3JDLElBQUksQ0FBQyxTQUFTO0FBQ2IsVUFBTSxTQUFTLE9BQU8sTUFBTSxVQUFVLEVBQUUsRUFBRSxLQUFLO0FBQy9DLFFBQUksQ0FBQyxPQUFRLFFBQU87QUFFcEIsVUFBTSxjQUFjLE9BQU8sTUFBTSxlQUFlLEVBQUUsRUFBRSxLQUFLO0FBQ3pELFVBQU0sV0FBVyxlQUFlO0FBQ2hDLFdBQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQyxFQUNBLE9BQU8sT0FBTztBQUNuQjtBQUdBLElBQU0sOEJBQThCLENBQUM7QUFBQSxFQUNuQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsMEJBQTBCO0FBQUEsRUFDMUIsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUNkLE1BQXdDO0FBQ3RDLFFBQU0sZUFBZSxZQUFZO0FBRWpDLFFBQU0sa0JBQWMsMkJBQVksT0FBTyxNQUFjLFdBQXVEO0FBQzFHLFVBQU0sVUFBVSwwQkFBMEIsTUFBTSxHQUFHLGdCQUFnQjtBQUVuRSxVQUFNLFdBQVcsTUFBTSw2QkFBNkIsU0FBUztBQUFBLE1BQzNELHlCQUF5QjtBQUFBLE1BQ3pCO0FBQUEsSUFDRixDQUFDO0FBRUQsUUFBSSxVQUFVLFlBQVksT0FBTztBQUMvQixhQUFPLENBQUM7QUFBQSxJQUNWO0FBRUEsV0FBTyxpQkFBaUIsVUFBVSxLQUFLO0FBQUEsRUFDekMsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLHNCQUFrQiwyQkFBWSxPQUFPLE1BQWMsTUFBYyxXQUFtQixXQUF3QjtBQUNoSCxVQUFNLFVBQVUsMEJBQTBCLE1BQU0sTUFBTSxnQkFBZ0I7QUFFdEUsVUFBTSxXQUFXLE1BQU0sNkJBQTZCLFNBQVM7QUFBQSxNQUMzRCx5QkFBeUI7QUFBQSxNQUN6QjtBQUFBLElBQ0YsQ0FBQztBQUVELFFBQUksVUFBVSxZQUFZLE9BQU87QUFDL0IsYUFBTztBQUFBLFFBQ0wsT0FBTyxDQUFDO0FBQUEsUUFDUixPQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFFQSxXQUFPO0FBQUEsTUFDTCxPQUFPLGlCQUFpQixVQUFVLEtBQUs7QUFBQSxNQUN2QyxPQUFPLE9BQU8sVUFBVSxTQUFTLENBQUM7QUFBQSxJQUNwQztBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFFTCxNQUFJLENBQUMsMkJBQTJCLGNBQWM7QUFDNUMsV0FDRSw4Q0FBQyxTQUFJLFdBQVUsYUFDWjtBQUFBLGtCQUNDLDZDQUFDLFdBQU0sV0FBVSw0QkFBMkIsT0FBTyxFQUFFLE9BQU8sWUFBWSxHQUNyRSxpQkFDSCxJQUNFO0FBQUEsTUFDSjtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsV0FBVTtBQUFBLFVBQ1Y7QUFBQSxVQUNBLFVBQVUsQ0FBQyxVQUFVLFNBQVMsTUFBTSxPQUFPLEtBQUs7QUFBQSxVQUNoRDtBQUFBLFVBQ0EsY0FBWTtBQUFBLFVBQ1o7QUFBQSxVQUNBO0FBQUE7QUFBQSxNQUNGO0FBQUEsT0FDRjtBQUFBLEVBRUo7QUFFQSxTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsVUFBVSxPQUFPLE1BQU0sV0FBVztBQUNoQyxZQUFJO0FBQ0YsaUJBQU8sTUFBTSxZQUFZLE1BQU0sTUFBTTtBQUFBLFFBQ3ZDLFNBQVMsT0FBTztBQUNkLGNBQUksaUJBQWlCLGlCQUFpQixNQUFNLFdBQVcsS0FBSztBQUMxRCxtQkFBTyxDQUFDO0FBQUEsVUFDVjtBQUNBLGdCQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGNBQWMsT0FBTyxNQUFNLE1BQU0sVUFBVSxXQUFXO0FBQ3BELFlBQUk7QUFDRixpQkFBTyxNQUFNLGdCQUFnQixNQUFNLE1BQU0sVUFBVSxNQUFNO0FBQUEsUUFDM0QsU0FBUyxPQUFPO0FBQ2QsY0FBSSxpQkFBaUIsaUJBQWlCLE1BQU0sV0FBVyxLQUFLO0FBQzFELG1CQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsT0FBTyxFQUFFO0FBQUEsVUFDL0I7QUFDQSxnQkFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFPO0FBQUEsTUFDUCxpQkFBaUI7QUFBQSxNQUNqQixVQUFVO0FBQUEsTUFDVixrQkFBZ0I7QUFBQSxNQUNoQixZQUFVO0FBQUEsTUFDVixnQkFBYztBQUFBLE1BQ2Q7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsZ0JBQWU7QUFBQTtBQUFBLEVBQ2pCO0FBRUo7QUFFQSxJQUFPLHNDQUFROzs7QUZqRFAsSUFBQUMsc0JBQUE7QUF6RlIsSUFBTSxlQUFlLENBQUMsUUFBNkI7QUFDakQsTUFBSSxDQUFDLElBQUssUUFBTztBQUNqQixRQUFNLFFBQVEsT0FBTyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDN0MsTUFBSSxDQUFDLHNCQUFzQixLQUFLLEtBQUssRUFBRyxRQUFPO0FBQy9DLFFBQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxJQUFJLE1BQU0sTUFBTSxHQUFHLEVBQUUsSUFBSSxNQUFNO0FBQ3RELFNBQU8sSUFBSSxLQUFLLE1BQU0sUUFBUSxHQUFHLEdBQUc7QUFDdEM7QUFFQSxJQUFNLGFBQWEsQ0FBQyxLQUFhLFdBQTJCO0FBQzFELFFBQU0sT0FBTyxhQUFhLEdBQUc7QUFDN0IsTUFBSSxDQUFDLEtBQU0sUUFBTztBQUNsQixTQUFPLEtBQ0osbUJBQW1CLFFBQVE7QUFBQSxJQUMxQixLQUFLO0FBQUEsSUFDTCxPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsRUFDUixDQUFDLEVBQ0EsUUFBUSxPQUFPLEVBQUUsRUFDakIsWUFBWTtBQUNqQjtBQTZCQSxJQUFNLDZCQUE2QixDQUFDO0FBQUEsRUFDbEM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBdUM7QUFDckMsUUFBTSxvQkFBZ0IsdUJBQVEsTUFBTSxvQ0FBb0MsR0FBRyxDQUFDLENBQUM7QUFFN0UsUUFBTSxzQkFBa0IsdUJBQStCLE1BQU07QUFDM0QsV0FBTztBQUFBLE1BQ0wsRUFBRSxPQUFPLElBQUksTUFBTSxLQUFLLHNCQUFzQixLQUFLLEVBQUU7QUFBQSxNQUNyRCxHQUFHO0FBQUEsSUFDTDtBQUFBLEVBQ0YsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0FBRXJCLE1BQUksQ0FBQyxRQUFTLFFBQU87QUFDckIsUUFBTSxTQUFTLFVBQVUsaUJBQWlCLFFBQVE7QUFDbEQsUUFBTSx3QkFBd0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRXZFLFNBQ0UsNkNBQUMsU0FBSSxXQUFVLDJEQUNiLHdEQUFDLFNBQUksV0FBVSxnREFDYjtBQUFBLGlEQUFDLG1DQUF3QixtQkFBc0MscUJBQTBDO0FBQUEsSUFFeEcsdUJBQ0M7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLFFBQ0EsVUFBVTtBQUFBLFFBQ1YsaUJBQWlCO0FBQUEsUUFDakIsbUJBQW1CO0FBQUEsUUFDbkIsaUJBQWlCO0FBQUEsUUFDakIsZ0JBQWdCLHVCQUF1QixDQUFDO0FBQUEsUUFDeEMsY0FBYyx1QkFBdUIsQ0FBQztBQUFBO0FBQUEsSUFDeEMsSUFDRSx3QkFDRjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0Msa0JBQWtCLEtBQUssZ0JBQWdCLE1BQU07QUFBQSxRQUM3QyxnQkFBZ0IsS0FBSyxjQUFjLElBQUk7QUFBQSxRQUN2QyxXQUFXLFdBQVcsVUFBVSxNQUFNO0FBQUEsUUFDdEMsU0FBUyxXQUFXLFFBQVEsTUFBTTtBQUFBLFFBQ2xDLFdBQVU7QUFBQTtBQUFBLElBQ1osSUFDRTtBQUFBLElBRUosOENBQUMsU0FBSSxXQUFVLHdEQUNiO0FBQUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE9BQU8sS0FBSyw0QkFBNEIsUUFBUTtBQUFBLFVBQ2hELGFBQWEsS0FBSyw0QkFBNEIsUUFBUTtBQUFBLFVBQ3RELE9BQU87QUFBQSxVQUNQLFVBQVU7QUFBQSxVQUNWLHlCQUF1QjtBQUFBLFVBQ3ZCLFdBQVc7QUFBQTtBQUFBLE1BQ2I7QUFBQSxNQUVBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxPQUFPLEtBQUssaUNBQWlDLFVBQVU7QUFBQSxVQUN2RCxhQUFhLEtBQUssaUNBQWlDLFVBQVU7QUFBQSxVQUM3RCxPQUFPO0FBQUEsVUFDUCxVQUFVO0FBQUEsVUFDVixXQUFXO0FBQUE7QUFBQSxNQUNiO0FBQUEsTUFFQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsT0FBTyxLQUFLLHlCQUF5QixRQUFRO0FBQUEsVUFDN0MsYUFBYSxLQUFLLHlCQUF5QixRQUFRO0FBQUEsVUFDbkQsU0FBUztBQUFBLFVBQ1QsT0FBTztBQUFBLFVBQ1AsVUFBVSxDQUFDLGNBQWMscUJBQXFCLHVDQUF1QyxXQUFXLEVBQUUsQ0FBQztBQUFBLFVBQ25HLGdCQUFnQjtBQUFBLFVBQ2hCLFFBQU87QUFBQSxVQUNQLGlCQUFnQjtBQUFBLFVBQ2hCLGdCQUFlO0FBQUEsVUFDZixXQUFXO0FBQUE7QUFBQSxNQUNiO0FBQUEsTUFFQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsT0FBTyxLQUFLLDJCQUEyQixVQUFVO0FBQUEsVUFDakQsYUFBYSxLQUFLLDJCQUEyQixVQUFVO0FBQUEsVUFDdkQsU0FBUztBQUFBLFVBQ1QsT0FBTztBQUFBLFVBQ1AsVUFBVSxDQUFDLGNBQWM7QUFDdkIsa0JBQU0sU0FBUyxPQUFPLFNBQVM7QUFDL0IsZ0JBQUksY0FBYyxNQUFNLENBQUMsT0FBTyxVQUFVLE1BQU0sR0FBRztBQUNqRCxzQ0FBd0IsRUFBRTtBQUMxQjtBQUFBLFlBQ0Y7QUFDQSxvQ0FBd0IsTUFBOEI7QUFBQSxVQUN4RDtBQUFBLFVBQ0EsZ0JBQWdCO0FBQUEsVUFDaEIsUUFBTztBQUFBLFVBQ1AsaUJBQWdCO0FBQUEsVUFDaEIsZ0JBQWU7QUFBQSxVQUNmLFdBQVc7QUFBQTtBQUFBLE1BQ2I7QUFBQSxPQUNGO0FBQUEsSUFFQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTyxLQUFLLGdDQUFnQyxpQkFBaUI7QUFBQSxRQUM3RCxhQUFhLEtBQUssZ0NBQWdDLGlCQUFpQjtBQUFBLFFBQ25FLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQSxRQUNWLFdBQVc7QUFBQTtBQUFBLElBQ2I7QUFBQSxJQUVBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxZQUFZLEtBQUssd0JBQXdCLE9BQU87QUFBQSxRQUNoRCxZQUFZLEtBQUssd0JBQXdCLE9BQU87QUFBQSxRQUNoRDtBQUFBLFFBQ0E7QUFBQTtBQUFBLElBQ0Y7QUFBQSxLQUNGLEdBQ0Y7QUFFSjtBQUVBLElBQU8scUNBQVE7OztBRzFNZixJQUFBQyxnQkFBK0M7QUFleEMsSUFBTSxnQ0FBZ0MsQ0FBQyxFQUFFLGdCQUFnQixlQUFlLE1BQXlDO0FBQ3RILFFBQU0sQ0FBQyxVQUFVLFdBQVcsUUFBSSx3QkFBUyxFQUFFO0FBQzNDLFFBQU0sQ0FBQyxRQUFRLFNBQVMsUUFBSSx3QkFBUyxFQUFFO0FBQ3ZDLFFBQU0sQ0FBQyxXQUFXLFlBQVksUUFBSSx3QkFBUyxFQUFFO0FBQzdDLFFBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx3QkFBUyxFQUFFO0FBQ25ELFFBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx3QkFBd0MsRUFBRTtBQUNsRixRQUFNLENBQUMsaUJBQWlCLGtCQUFrQixRQUFJLHdCQUFvQyxFQUFFO0FBQ3BGLFFBQU0sQ0FBQyxxQkFBcUIsc0JBQXNCLFFBQUksd0JBQStCLEtBQUs7QUFDMUYsUUFBTSxDQUFDLG1CQUFtQixvQkFBb0IsUUFBSSx3QkFBNEMsSUFBSTtBQUNsRyxRQUFNLENBQUMsc0JBQXNCLHVCQUF1QixRQUFJLHdCQUFTLEtBQUs7QUFDdEUsUUFBTSxDQUFDLHFCQUFxQixzQkFBc0IsUUFBSSx3QkFBUyxLQUFLO0FBQ3BFLFFBQU0sQ0FBQyx1QkFBdUIsd0JBQXdCLFFBQUksd0JBQVMsQ0FBQztBQUNwRSxRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixRQUFJLHdCQUFvRCxJQUFJO0FBQ3BHLFFBQU0sQ0FBQyxhQUFhLGNBQWMsUUFBSSx3QkFBUyxJQUFJO0FBRW5ELFFBQU0scUJBQWlCO0FBQUEsSUFDckIsT0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsTUFDQSxXQUFXLFVBQVUsS0FBSztBQUFBLE1BQzFCLGNBQWMsYUFBYSxLQUFLO0FBQUEsTUFDaEM7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUMsY0FBYyxXQUFXLFVBQVUsaUJBQWlCLHFCQUFxQixjQUFjLE1BQU07QUFBQSxFQUNoRztBQUVBLFFBQU0sY0FBVSwyQkFBWSxNQUFNO0FBQ2hDLFFBQUksQ0FBQyxZQUFZLENBQUMsUUFBUTtBQUN4Qiw2QkFBdUIsSUFBSTtBQUMzQiw4QkFBd0IsSUFBSTtBQUM1QiwyQkFBcUIsUUFBUTtBQUM3QjtBQUFBLElBQ0Y7QUFFQSxVQUFNLFdBQStDO0FBQUEsTUFDbkQ7QUFBQSxNQUNBO0FBQUEsTUFDQSxXQUFXLFVBQVUsS0FBSztBQUFBLE1BQzFCLGNBQWMsYUFBYSxLQUFLO0FBQUEsTUFDaEM7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFFQSwyQkFBdUIsS0FBSztBQUM1QixzQkFBa0IsUUFBUTtBQUMxQiw0QkFBd0IsS0FBSztBQUM3QixtQkFBZSxLQUFLO0FBQ3BCLG1CQUFlLFFBQVE7QUFBQSxFQUN6QixHQUFHLENBQUMsY0FBYyxXQUFXLFVBQVUsaUJBQWlCLGdCQUFnQixxQkFBcUIsY0FBYyxNQUFNLENBQUM7QUFFbEgsUUFBTSxjQUFVLDJCQUFZLE1BQU07QUFDaEMsZ0JBQVksRUFBRTtBQUNkLGNBQVUsRUFBRTtBQUNaLGlCQUFhLEVBQUU7QUFDZixvQkFBZ0IsRUFBRTtBQUNsQixvQkFBZ0IsRUFBRTtBQUNsQix1QkFBbUIsRUFBRTtBQUNyQiwyQkFBdUIsS0FBSztBQUM1Qix5QkFBcUIsSUFBSTtBQUN6Qiw0QkFBd0IsS0FBSztBQUM3QiwyQkFBdUIsS0FBSztBQUM1Qiw2QkFBeUIsQ0FBQztBQUMxQixzQkFBa0IsSUFBSTtBQUN0QixtQkFBZSxJQUFJO0FBQ25CLG1CQUFlO0FBQUEsRUFDakIsR0FBRyxDQUFDLGNBQWMsQ0FBQztBQUVuQixRQUFNLHdCQUFvQjtBQUFBLElBQ3hCLENBQUMsY0FBc0IsZUFBdUI7QUFDNUMsWUFBTSxlQUFlLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3pDLGtCQUFZLFlBQVk7QUFDeEIsZ0JBQVUsVUFBVTtBQUNwQixVQUFJLENBQUMsY0FBYztBQUNqQixnQ0FBd0IsSUFBSTtBQUFBLE1BQzlCO0FBQ0EsMkJBQXFCLFFBQVE7QUFDN0IsVUFBSSxxQkFBcUI7QUFDdkIsK0JBQXVCLENBQUMsWUFBWTtBQUFBLE1BQ3RDO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQyxtQkFBbUI7QUFBQSxFQUN0QjtBQUVBLFFBQU0sNEJBQXdCLDJCQUFZLENBQUMsY0FBc0IsZUFBdUI7QUFDdEYsZ0JBQVksWUFBWTtBQUN4QixjQUFVLFVBQVU7QUFDcEIseUJBQXFCLFFBQVE7QUFDN0IsMkJBQXVCLEtBQUs7QUFDNUIsNEJBQXdCLEtBQUs7QUFBQSxFQUMvQixHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sMEJBQXNCO0FBQUEsSUFDMUIsQ0FBQyxhQUF5QztBQUN4QyxVQUFJLGFBQWEsVUFBVTtBQUN6QixZQUFJLHNCQUFzQjtBQUN4QixrQ0FBd0IsS0FBSztBQUM3QixpQ0FBdUIsS0FBSztBQUM1QjtBQUFBLFFBQ0Y7QUFFQSw2QkFBcUIsUUFBUTtBQUM3QixnQ0FBd0IsSUFBSTtBQUM1QiwrQkFBdUIsS0FBSztBQUM1QixpQ0FBeUIsQ0FBQyxhQUFhLFdBQVcsQ0FBQztBQUNuRDtBQUFBLE1BQ0Y7QUFFQSwyQkFBcUIsUUFBUTtBQUM3Qiw4QkFBd0IsS0FBSztBQUM3Qiw2QkFBdUIsS0FBSztBQUU1QixZQUFNLFFBQVEsV0FBVyxvQkFBSSxLQUFLLENBQUM7QUFDbkMsWUFBTSxXQUFXLElBQUksS0FBSyxLQUFLO0FBQy9CLFVBQUksYUFBYSxVQUFVO0FBQ3pCLGlCQUFTLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQztBQUFBLE1BQ3RDLFdBQVcsYUFBYSxXQUFXO0FBQ2pDLGlCQUFTLFFBQVEsTUFBTSxRQUFRLElBQUksRUFBRTtBQUFBLE1BQ3ZDLE9BQU87QUFDTCxpQkFBUyxRQUFRLE1BQU0sUUFBUSxJQUFJLEVBQUU7QUFBQSxNQUN2QztBQUVBLGtCQUFZLFVBQVUsUUFBUSxDQUFDO0FBQy9CLGdCQUFVLFVBQVUsS0FBSyxDQUFDO0FBQUEsSUFDNUI7QUFBQSxJQUNBLENBQUMsb0JBQW9CO0FBQUEsRUFDdkI7QUFFQSxRQUFNLHdCQUFvQiwyQkFBWSxNQUFNO0FBQzFDLG1CQUFlLENBQUMsYUFBYTtBQUMzQixZQUFNLE9BQU8sQ0FBQztBQUNkLFVBQUksQ0FBQyxNQUFNO0FBQ1QsZ0NBQXdCLEtBQUs7QUFBQSxNQUMvQjtBQUNBLGFBQU87QUFBQSxJQUNULENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxDQUFDO0FBRUwsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBQ3RMQSxJQUFBQyxnQkFBc0M7QUFjdEMsSUFBTSxtQkFBbUIsQ0FBQyxVQUFrQztBQUMxRCxRQUFNLFNBQVMsT0FBTyxLQUFLO0FBQzNCLFNBQU8sT0FBTyxTQUFTLE1BQU0sSUFBSSxTQUFTO0FBQzVDO0FBRUEsSUFBTSxpQkFBaUIsQ0FBQyxVQUFtQztBQUN6RCxNQUFJLE9BQU8sVUFBVSxVQUFXLFFBQU87QUFDdkMsTUFBSSxPQUFPLFVBQVUsU0FBVSxRQUFPLFVBQVUsSUFBSSxPQUFPLFVBQVUsSUFBSSxRQUFRO0FBQ2pGLE1BQUksT0FBTyxVQUFVLFVBQVU7QUFDN0IsVUFBTSxhQUFhLE1BQU0sS0FBSyxFQUFFLFlBQVk7QUFDNUMsUUFBSSxlQUFlLFVBQVUsZUFBZSxJQUFLLFFBQU87QUFDeEQsUUFBSSxlQUFlLFdBQVcsZUFBZSxJQUFLLFFBQU87QUFBQSxFQUMzRDtBQUNBLFNBQU87QUFDVDtBQUVBLElBQU0sc0JBQXNCLENBQUMsU0FBcUQ7QUFDaEYsUUFBTSxlQUFlLGlCQUFpQixNQUFNLGFBQWEsTUFBTSxTQUFTO0FBQ3hFLFFBQU0sWUFBWSxpQkFBaUIsT0FBTyxPQUFRO0FBQ2xELFNBQU87QUFBQSxJQUNMLFFBQVEsT0FBTyxNQUFNLFVBQVUsRUFBRSxFQUFFLEtBQUs7QUFBQSxJQUN4QyxhQUFhLE9BQU8sTUFBTSxlQUFlLEVBQUUsRUFBRSxLQUFLO0FBQUEsSUFDbEQsUUFBUSxpQkFBaUIsTUFBTSxNQUFNO0FBQUEsSUFDckMscUJBQXFCLE9BQU8sTUFBTSx1QkFBdUIsTUFBTSx1QkFBdUIsRUFBRSxFQUFFLEtBQUs7QUFBQSxJQUMvRixlQUFlLGVBQWUsTUFBTSxhQUFhO0FBQUEsSUFDakQsY0FBYyxPQUFPLE1BQU0sZ0JBQWdCLEVBQUUsRUFBRSxLQUFLO0FBQUEsSUFDcEQsYUFBYSxpQkFBaUIsTUFBTSxXQUFXO0FBQUEsSUFDL0MsaUJBQWlCLE9BQU8sTUFBTSxtQkFBbUIsRUFBRSxFQUFFLEtBQUs7QUFBQSxJQUMxRCxXQUFXLE9BQU8sTUFBTSxhQUFhLEVBQUUsRUFBRSxLQUFLO0FBQUEsSUFDOUMsU0FBUyxPQUFPLE1BQU0sV0FBVyxFQUFFLEVBQUUsS0FBSztBQUFBLElBQzFDLFVBQVUsT0FBTyxNQUFNLFlBQVksRUFBRSxFQUFFLEtBQUs7QUFBQSxJQUM1QztBQUFBLEVBQ0Y7QUFDRjtBQUdPLElBQU0sNEJBQTRCLENBQUMsRUFBRSxXQUFXLFVBQVUsWUFBWSxNQUFxQztBQUNoSCxRQUFNLENBQUMsT0FBTyxRQUFRLFFBQUksd0JBQThCLENBQUMsQ0FBQztBQUMxRCxRQUFNLENBQUMsT0FBTyxRQUFRLFFBQUksd0JBQVMsQ0FBQztBQUNwQyxRQUFNLENBQUMsYUFBYSxjQUFjLFFBQUksd0JBQVMsQ0FBQztBQUNoRCxRQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksd0JBQVMsS0FBSztBQUNoRCxRQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksd0JBQVMsRUFBRTtBQUVuRCxRQUFNLGVBQVc7QUFBQSxJQUNmLE9BQU8sTUFBYyxZQUFnRDtBQUNuRSxVQUFJLENBQUMsV0FBVztBQUNkLG9CQUFZO0FBQ1o7QUFBQSxNQUNGO0FBRUEsbUJBQWEsSUFBSTtBQUNqQixzQkFBZ0IsRUFBRTtBQUVsQixVQUFJO0FBQ0YsY0FBTSxVQUFVLDhCQUE4QixTQUFTLE1BQU0sUUFBUTtBQUNyRSxjQUFNLFdBQVcsTUFBTSw2QkFBNkIsU0FBUztBQUFBLFVBQzNELHlCQUF5QjtBQUFBLFFBQzNCLENBQUM7QUFFRCxZQUFJLFVBQVUsWUFBWSxPQUFPO0FBQy9CLDBCQUFnQixTQUFTLFdBQVcsS0FBSyxxQkFBcUIseUJBQXlCLENBQUM7QUFDeEYsbUJBQVMsQ0FBQyxDQUFDO0FBQ1gsbUJBQVMsQ0FBQztBQUNWLHlCQUFlLElBQUk7QUFDbkI7QUFBQSxRQUNGO0FBRUEsY0FBTSxlQUFlLE1BQU0sUUFBUSxVQUFVLEtBQUssSUFBSSxTQUFTLFFBQVEsQ0FBQyxHQUFHO0FBQUEsVUFBSSxDQUFDLFNBQzlFLG9CQUFvQixJQUEwQztBQUFBLFFBQ2hFO0FBQ0EsY0FBTSxnQkFBZ0IsT0FBTyxVQUFVLFNBQVMsWUFBWSxVQUFVLENBQUM7QUFDdkUsY0FBTSxZQUFZO0FBRWxCLGlCQUFTLFdBQVc7QUFDcEIsaUJBQVMsU0FBUztBQUNsQix1QkFBZSxJQUFJO0FBQUEsTUFDckIsU0FBUyxPQUFPO0FBQ2QsWUFBSSxpQkFBaUIsaUJBQWlCLE1BQU0sV0FBVyxLQUFLO0FBQzFELHNCQUFZO0FBQ1o7QUFBQSxRQUNGO0FBRUEsY0FBTSxVQUFVLGlCQUFpQixRQUFRLE1BQU0sVUFBVSxLQUFLLHFCQUFxQix5QkFBeUI7QUFDNUcsd0JBQWdCLE9BQU87QUFDdkIsaUJBQVMsQ0FBQyxDQUFDO0FBQ1gsaUJBQVMsQ0FBQztBQUNWLHVCQUFlLElBQUk7QUFBQSxNQUNyQixVQUFFO0FBQ0EscUJBQWEsS0FBSztBQUFBLE1BQ3BCO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQyxXQUFXLGFBQWEsUUFBUTtBQUFBLEVBQ25DO0FBRUEsUUFBTSxnQkFBWSwyQkFBWSxNQUFNO0FBQ2xDLGFBQVMsQ0FBQyxDQUFDO0FBQ1gsYUFBUyxDQUFDO0FBQ1YsbUJBQWUsQ0FBQztBQUNoQixvQkFBZ0IsRUFBRTtBQUFBLEVBQ3BCLEdBQUcsQ0FBQyxDQUFDO0FBRUwsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBTHVJZ0IsSUFBQUMsc0JBQUE7QUFqUGhCLElBQU0sWUFBWTtBQUNsQixJQUFNLHNCQUFzQixvQkFBSSxJQUFZLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBRTNFLElBQU0sd0JBQTJFO0FBQUEsRUFDL0UsR0FBRyxFQUFFLEtBQUssYUFBYSxVQUFVLE9BQU87QUFBQSxFQUN4QyxHQUFHLEVBQUUsS0FBSyx3QkFBd0IsVUFBVSxRQUFRO0FBQUEsRUFDcEQsR0FBRyxFQUFFLEtBQUssMEJBQTBCLFVBQVUsVUFBVTtBQUFBLEVBQ3hELEdBQUcsRUFBRSxLQUFLLHFCQUFxQixVQUFVLEtBQUs7QUFBQSxFQUM5QyxHQUFHLEVBQUUsS0FBSywyQkFBMkIsVUFBVSxXQUFXO0FBQUEsRUFDMUQsR0FBRyxFQUFFLEtBQUsseUJBQXlCLFVBQVUsU0FBUztBQUFBLEVBQ3RELEdBQUcsRUFBRSxLQUFLLHVCQUF1QixVQUFVLE9BQU87QUFBQSxFQUNsRCxHQUFHLEVBQUUsS0FBSyx3QkFBd0IsVUFBVSxRQUFRO0FBQUEsRUFDcEQsR0FBRyxFQUFFLEtBQUsseUJBQXlCLFVBQVUsU0FBUztBQUFBLEVBQ3RELElBQUksRUFBRSxLQUFLLHVCQUF1QixVQUFVLE9BQU87QUFDckQ7QUFHQSxJQUFNLDBCQUEwQixNQUFNO0FBQ3BDLDBCQUF3QjtBQUFBLElBQ3RCLE9BQU8sU0FBUyxPQUFPLGlCQUFpQjtBQUFBLElBQ3hDLFVBQVUsU0FBUyxPQUFPLGlCQUFpQjtBQUFBLElBQzNDLFNBQVMsU0FBUyxPQUFPLGdCQUFnQjtBQUFBLEVBQzNDLENBQUM7QUFDSDtBQUVBLElBQU0sZ0NBQWdDLE1BQTZCO0FBQ2pFLFNBQU8sT0FBTyxRQUFRLHFCQUFxQixFQUN4QyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsT0FBTztBQUFBLElBQ3JCLE9BQU8sT0FBTyxJQUFJO0FBQUEsSUFDbEIsTUFBTSxLQUFLLElBQUksS0FBSyxJQUFJLFFBQVE7QUFBQSxFQUNsQyxFQUFFLEVBQ0QsS0FBSyxDQUFDLE1BQU0sVUFBVSxPQUFPLEtBQUssS0FBSyxJQUFJLE9BQU8sTUFBTSxLQUFLLENBQUM7QUFDbkU7QUFFQSxJQUFNLDRCQUE0QixNQUFNO0FBQ3RDLFFBQU0sWUFBWSxVQUFVLGtCQUFrQixNQUFNO0FBQ3BELFFBQU0sdUJBQXVCLGNBQUFDLFFBQU0sT0FBOEIsSUFBSTtBQUVyRSxRQUFNLHVCQUFtQjtBQUFBLElBQ3ZCLE9BQU87QUFBQSxNQUNMLE9BQU8sS0FBSyxzQkFBc0IsT0FBTztBQUFBLE1BQ3pDLE1BQU0sS0FBSyxxQkFBcUIsVUFBVTtBQUFBLE1BQzFDLE1BQU0sS0FBSyxxQkFBcUIsTUFBTTtBQUFBLE1BQ3RDLE1BQU0sS0FBSyxxQkFBcUIsTUFBTTtBQUFBLElBQ3hDO0FBQUEsSUFDQSxDQUFDO0FBQUEsRUFDSDtBQUVBLFFBQU0sdUJBQW1CLHVCQUErQixNQUFNO0FBQzVELFVBQU0sU0FBUyxNQUFNLFFBQVEsT0FBTyx1QkFBdUIsSUFBSSxPQUFPLDBCQUEwQixDQUFDO0FBQ2pHLFVBQU0sU0FBUyxxQkFBcUIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxVQUFVO0FBQzVELFlBQU0sU0FBUyxPQUFPLE1BQU0sS0FBSztBQUNqQyxhQUFPLE9BQU8sVUFBVSxNQUFNLEtBQUssb0JBQW9CLElBQUksTUFBTTtBQUFBLElBQ25FLENBQUM7QUFFRCxRQUFJLE9BQU8sU0FBUyxHQUFHO0FBQ3JCLGFBQU8sT0FBTyxLQUFLLENBQUMsTUFBTSxVQUFVLE9BQU8sS0FBSyxLQUFLLElBQUksT0FBTyxNQUFNLEtBQUssQ0FBQztBQUFBLElBQzlFO0FBRUEsV0FBTyw4QkFBOEI7QUFBQSxFQUN2QyxHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sd0JBQW9CLHVCQUFRLE1BQU07QUFDdEMsVUFBTSxNQUFNLG9CQUFJLElBQW9CO0FBQ3BDLGVBQVcsVUFBVSxrQkFBa0I7QUFDckMsVUFBSSxJQUFJLE9BQU8sT0FBTyxLQUFLLEdBQUcsT0FBTyxJQUFJO0FBQUEsSUFDM0M7QUFDQSxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsZ0JBQWdCLENBQUM7QUFFckIsUUFBTSxFQUFFLE9BQU8sT0FBTyxhQUFhLFdBQVcsY0FBYyxVQUFVLFVBQVUsSUFBSSwwQkFBMEI7QUFBQSxJQUM1RztBQUFBLElBQ0EsVUFBVTtBQUFBLElBQ1YsYUFBYTtBQUFBLEVBQ2YsQ0FBQztBQUVELFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLElBQUksOEJBQThCO0FBQUEsSUFDaEMsZ0JBQWdCLENBQUMsYUFBYTtBQUM1QixXQUFLLFNBQVMsR0FBRyxRQUFRO0FBQUEsSUFDM0I7QUFBQSxJQUNBLGdCQUFnQixNQUFNO0FBQ3BCLGdCQUFVO0FBQUEsSUFDWjtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sdUJBQW1CLDJCQUFZLENBQUMsY0FBc0I7QUFDMUQsVUFBTSxTQUFTLFNBQVMsU0FBUztBQUNqQyxRQUFJLENBQUMsT0FBUTtBQUNiLHlCQUFxQiwrQkFBK0IsbUJBQW1CLE1BQU0sQ0FBQyxJQUFJO0FBQUEsTUFDaEYsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsSUFDbkIsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLDJCQUF1QiwyQkFBWSxDQUFDLFdBQStCO0FBQ3ZFLFVBQU0sT0FBTztBQUNiLFFBQUksQ0FBQyxRQUFRLE9BQU8sS0FBSyxZQUFZLFdBQVksUUFBTztBQUN4RCxVQUFNLE9BQU8sS0FBSyxRQUFxQiwyQkFBMkI7QUFDbEUsUUFBSSxDQUFDLEtBQU0sUUFBTztBQUNsQixRQUFJLENBQUMscUJBQXFCLFNBQVMsU0FBUyxJQUFJLEVBQUcsUUFBTztBQUMxRCxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsQ0FBQztBQUVMLHlCQUF1QjtBQUFBLElBQ3JCLGNBQWM7QUFBQSxJQUNkO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLGFBQWEsS0FBSyxNQUFNLFNBQVMsS0FBSyxTQUFTO0FBRXJELFFBQU0sbUJBQWUsdUJBQVEsTUFBTTtBQUNqQyxVQUFNLFdBQVc7QUFDakIsUUFBSSxDQUFDLFNBQVUsUUFBTyxDQUFDO0FBRXZCLFVBQU0sVUFBZ0UsQ0FBQztBQUN2RSxVQUFNLFNBQVMsVUFBVSxpQkFBaUIsUUFBUTtBQUNsRCxVQUFNLGVBQWUseUJBQXlCLFNBQVMsVUFBVSxRQUFRLEVBQUU7QUFDM0UsVUFBTSxhQUFhLHlCQUF5QixTQUFTLFFBQVEsUUFBUSxFQUFFO0FBRXZFLFFBQUksZ0JBQWdCLFlBQVk7QUFDOUIsY0FBUSxLQUFLO0FBQUEsUUFDWCxLQUFLO0FBQUEsUUFDTCxPQUFPLEtBQUssZ0JBQWdCLE1BQU07QUFBQSxRQUNsQyxPQUFPLGdCQUFnQjtBQUFBLE1BQ3pCLENBQUM7QUFDRCxjQUFRLEtBQUs7QUFBQSxRQUNYLEtBQUs7QUFBQSxRQUNMLE9BQU8sS0FBSyxjQUFjLElBQUk7QUFBQSxRQUM5QixPQUFPLGNBQWM7QUFBQSxNQUN2QixDQUFDO0FBQUEsSUFDSDtBQUVBLFFBQUksU0FBUyxVQUFVLEtBQUssR0FBRztBQUM3QixjQUFRLEtBQUs7QUFBQSxRQUNYLEtBQUs7QUFBQSxRQUNMLE9BQU8sS0FBSyw0QkFBNEIsUUFBUTtBQUFBLFFBQ2hELE9BQU8sU0FBUyxVQUFVLEtBQUs7QUFBQSxNQUNqQyxDQUFDO0FBQUEsSUFDSDtBQUVBLFFBQUksU0FBUyxhQUFhLEtBQUssR0FBRztBQUNoQyxjQUFRLEtBQUs7QUFBQSxRQUNYLEtBQUs7QUFBQSxRQUNMLE9BQU8sS0FBSyxpQ0FBaUMsVUFBVTtBQUFBLFFBQ3ZELE9BQU8sU0FBUyxhQUFhLEtBQUs7QUFBQSxNQUNwQyxDQUFDO0FBQUEsSUFDSDtBQUVBLFlBQVEsS0FBSztBQUFBLE1BQ1gsS0FBSztBQUFBLE1BQ0wsT0FBTyxLQUFLLHlCQUF5QixRQUFRO0FBQUEsTUFDN0MsT0FDRSxTQUFTLGlCQUFpQixLQUN0QixLQUFLLHNCQUFzQixLQUFLLElBQ2hDLDRCQUE0QixTQUFTLFlBQVk7QUFBQSxJQUN6RCxDQUFDO0FBRUQsUUFBSSxTQUFTLG9CQUFvQixJQUFJO0FBQ25DLFlBQU0sZ0JBQWdCLGtCQUFrQixJQUFJLE9BQU8sU0FBUyxlQUFlLENBQUMsS0FBSyxPQUFPLFNBQVMsZUFBZTtBQUNoSCxjQUFRLEtBQUs7QUFBQSxRQUNYLEtBQUs7QUFBQSxRQUNMLE9BQU8sS0FBSywyQkFBMkIsVUFBVTtBQUFBLFFBQ2pELE9BQU87QUFBQSxNQUNULENBQUM7QUFBQSxJQUNIO0FBRUEsUUFBSSxTQUFTLHdCQUF3QixPQUFPO0FBQzFDLGNBQVEsS0FBSztBQUFBLFFBQ1gsS0FBSztBQUFBLFFBQ0wsT0FBTyxLQUFLLGdDQUFnQyxpQkFBaUI7QUFBQSxRQUM3RCxPQUNFLFNBQVMsd0JBQXdCLFFBQzdCLEtBQUssb0NBQW9DLEtBQUssSUFDOUMsS0FBSyxtQ0FBbUMsSUFBSTtBQUFBLE1BQ3BELENBQUM7QUFBQSxJQUNIO0FBRUEsV0FBTztBQUFBLEVBQ1QsR0FBRyxDQUFDLGdCQUFnQixpQkFBaUIsQ0FBQztBQUV0QyxRQUFNLGNBQWMsQ0FBQyxlQUFlLGFBQWEsU0FBUztBQUUxRCwrQkFBVSxNQUFNO0FBQ2QsVUFBTSxrQkFBa0IsTUFBTTtBQUM1Qix3QkFBa0I7QUFBQSxJQUNwQjtBQUVBLFVBQU0sWUFBWSxNQUFNO0FBQ3RCLFVBQUksQ0FBQyxnQkFBZ0IsWUFBWSxDQUFDLGdCQUFnQixRQUFRO0FBQ3hEO0FBQUEsTUFDRjtBQUVBLFdBQUssU0FBUyxjQUFjLElBQUksSUFBSSxhQUFhLGNBQWM7QUFBQSxJQUNqRTtBQUVBLFdBQU8saUJBQWlCLGlDQUFpQyxlQUFlO0FBQ3hFLFdBQU8saUJBQWlCLDJCQUEyQixTQUFTO0FBRTVELFdBQU8sTUFBTTtBQUNYLGFBQU8sb0JBQW9CLGlDQUFpQyxlQUFlO0FBQzNFLGFBQU8sb0JBQW9CLDJCQUEyQixTQUFTO0FBQUEsSUFDakU7QUFBQSxFQUNGLEdBQUcsQ0FBQyxnQkFBZ0IsYUFBYSxVQUFVLGlCQUFpQixDQUFDO0FBRTdELFNBQ0UsOENBQUMsU0FBSSxXQUFVLGFBQ1o7QUFBQSxrQkFDQyw2Q0FBQyxTQUFJLFdBQVUseURBQ2IsdURBQUMsU0FBSSxXQUFVLHFHQUNaLHVCQUFhLElBQUksQ0FBQyxNQUFNLFVBQ3ZCO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFFQyxXQUFVO0FBQUEsUUFFVjtBQUFBLHdEQUFDLFVBQUssV0FBVSwrQ0FBK0M7QUFBQSxpQkFBSztBQUFBLFlBQU07QUFBQSxhQUFDO0FBQUEsVUFDM0UsNkNBQUMsVUFBSyxXQUFVLDZDQUE2QyxlQUFLLE9BQU07QUFBQTtBQUFBO0FBQUEsTUFKbkUsR0FBRyxLQUFLLEdBQUcsSUFBSSxLQUFLLEtBQUssSUFBSSxLQUFLO0FBQUEsSUFLekMsQ0FDRCxHQUNILEdBQ0YsSUFDRTtBQUFBLElBRUo7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFNBQVM7QUFBQSxRQUNUO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLG1CQUFtQjtBQUFBLFFBQ25CLHNCQUFzQjtBQUFBLFFBQ3RCLHNCQUFzQjtBQUFBLFFBQ3RCLHlCQUF5QjtBQUFBLFFBQ3pCLDZCQUE2QjtBQUFBLFFBQzdCO0FBQUEsUUFDQTtBQUFBO0FBQUEsSUFDRjtBQUFBLElBRUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVU7QUFBQSxRQUNWLE9BQU8sRUFBRSxTQUFTLFlBQVksU0FBUyxPQUFPO0FBQUEsUUFFOUM7QUFBQSx1REFBQyxTQUFJLFdBQVUsdUJBQXNCLFNBQVEsYUFBWSxNQUFLLFVBQVMsY0FBWSxLQUFLLGtCQUFrQixTQUFTLEdBQ2pILHVEQUFDLFlBQU8sV0FBVSx1QkFBc0IsSUFBRyxNQUFLLElBQUcsTUFBSyxHQUFFLEtBQUksYUFBWSxLQUFJLEdBQ2hGO0FBQUEsVUFDQyxLQUFLLGtCQUFrQixTQUFTO0FBQUE7QUFBQTtBQUFBLElBQ25DO0FBQUEsSUFFQyxlQUFlLDZDQUFDLFNBQUksV0FBVSxlQUFlLHdCQUFhLElBQVM7QUFBQSxJQUVuRSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsTUFBTSxXQUFXLElBQy9DLDZDQUFDLFNBQUksV0FBVSwrQkFBOEIsbUJBQWlCLEtBQUssaUJBQWlCLFNBQVMsR0FBRyxJQUM5RjtBQUFBLElBRUgsQ0FBQyxnQkFBZ0IsTUFBTSxTQUFTLElBQy9CLDZDQUFDLFNBQUksS0FBSyxzQkFBc0IsV0FBVSxnQkFDdkMsZ0JBQU0sSUFBSSxDQUFDLE1BQU0sVUFBVTtBQUMxQixZQUFNLFNBQVMsU0FBUyxLQUFLLE1BQU07QUFDbkMsWUFBTSxZQUFZLHVCQUF1QixLQUFLLFdBQVcsVUFBVSxpQkFBaUIsUUFBUSxPQUFPO0FBQ25HLFlBQU0sUUFBUSxTQUFTLEtBQUssV0FBVyxLQUFLLFNBQVMsS0FBSyxRQUFRLEtBQUssVUFBVTtBQUNqRixZQUFNLGFBQWEseUJBQXlCLEtBQUssZUFBZSxNQUFNLFNBQVMsS0FBSyxZQUFZLENBQUM7QUFDakcsWUFBTSxhQUFhLEtBQUs7QUFDeEIsWUFBTSxjQUFjLDRCQUE0QixVQUFVO0FBQzFELFlBQU0sMkJBQTJCLGVBQWU7QUFDaEQsWUFBTSx3QkFBd0IsS0FBSyxrQkFBa0I7QUFDckQsWUFBTSxnQkFBZ0IsS0FBSyxjQUFjLE9BQU8sS0FBSyxPQUFPLEtBQUssU0FBUztBQUMxRSxZQUFNLGlCQUFpQixnQkFBZ0Isa0JBQWtCLElBQUksYUFBYSxLQUFLLGdCQUFnQjtBQUMvRixZQUFNLHNCQUFzQixTQUFTLEtBQUssbUJBQW1CO0FBQzdELFlBQU0sZ0JBQTBCLENBQUM7QUFDakMsVUFBSSxnQkFBZ0I7QUFDbEIsc0JBQWMsS0FBSyxHQUFHLEtBQUssMkJBQTJCLFVBQVUsQ0FBQyxLQUFLLGNBQWMsRUFBRTtBQUFBLE1BQ3hGO0FBQ0EsVUFBSSxxQkFBcUI7QUFDdkIsc0JBQWM7QUFBQSxVQUNaLEdBQUcsS0FBSyxxQ0FBcUMsZUFBZSxDQUFDLEtBQUssbUJBQW1CO0FBQUEsUUFDdkY7QUFBQSxNQUNGO0FBQ0EsWUFBTSxlQUFlLGNBQWMsS0FBSyxLQUFLO0FBQzdDLFlBQU0sY0FBYyw0QkFBNEIsd0JBQzlDLDhFQUNHO0FBQUEsZ0NBQ0MsNkNBQUMsVUFBSyxXQUFVLG9DQUFtQyxPQUFPLEtBQUssZ0NBQWdDLGlCQUFpQixHQUM5RztBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsT0FBTTtBQUFBLFlBQ04sT0FBTTtBQUFBLFlBQ04sUUFBTztBQUFBLFlBQ1AsU0FBUTtBQUFBLFlBQ1IsTUFBSztBQUFBLFlBQ0wsUUFBTztBQUFBLFlBQ1AsYUFBWTtBQUFBLFlBQ1osZUFBYztBQUFBLFlBQ2QsZ0JBQWU7QUFBQSxZQUNmLFdBQVU7QUFBQSxZQUVWO0FBQUEsMkRBQUMsVUFBSyxRQUFPLFFBQU8sR0FBRSxpQkFBZ0IsTUFBSyxRQUFPO0FBQUEsY0FDbEQsNkNBQUMsVUFBSyxHQUFFLDRCQUEyQjtBQUFBLGNBQ25DLDZDQUFDLFVBQUssR0FBRSxXQUFVO0FBQUEsY0FDbEIsNkNBQUMsVUFBSyxHQUFFLFdBQVU7QUFBQTtBQUFBO0FBQUEsUUFDcEIsR0FDRixJQUNFO0FBQUEsUUFDSCwyQkFDQyw2Q0FBQyxVQUFLLFdBQVUsb0NBQW1DLE9BQU8sYUFDeEQsdURBQUMsU0FBSSxPQUFNLDhCQUE2QixNQUFLLFFBQU8sU0FBUSxhQUFZLGFBQWEsS0FBSyxRQUFPLGdCQUFlLFdBQVUsV0FDeEg7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLGVBQWM7QUFBQSxZQUNkLGdCQUFlO0FBQUEsWUFDZixHQUFFO0FBQUE7QUFBQSxRQUNKLEdBQ0YsR0FDRixJQUNFO0FBQUEsU0FDTixJQUNFO0FBRUosYUFDRSw2Q0FBQyxTQUErQixXQUFVLGlCQUN4QztBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0M7QUFBQSxVQUNBO0FBQUEsVUFDQSxVQUFVO0FBQUEsVUFDVjtBQUFBLFVBQ0EsUUFBUSxNQUFNLGlCQUFpQixNQUFNO0FBQUEsVUFDckMsZ0JBQWU7QUFBQSxVQUNmO0FBQUEsVUFDQSxZQUFZO0FBQUEsVUFDWixxQkFBb0I7QUFBQTtBQUFBLE1BQ3RCLEtBWFEsR0FBRyxNQUFNLElBQUksS0FBSyxFQVk1QjtBQUFBLElBRUosQ0FBQyxHQUNILElBQ0U7QUFBQSxJQUVKO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBLGNBQWMsQ0FBQyxTQUFTO0FBQ3RCLGNBQUksQ0FBQyxnQkFBZ0IsWUFBWSxDQUFDLGdCQUFnQixRQUFRO0FBQ3hEO0FBQUEsVUFDRjtBQUVBLGVBQUssU0FBUyxNQUFNLGNBQWM7QUFBQSxRQUNwQztBQUFBLFFBQ0EsUUFBUTtBQUFBO0FBQUEsSUFDVjtBQUFBLEtBQ0Y7QUFFSjtBQUdBLElBQU0scUJBQXFCLE1BQU07QUFDL0IsU0FDRSw2Q0FBQyxnQ0FDQyx1REFBQyw2QkFBMEIsR0FDN0I7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLHNCQUFzQjtBQUM3RCxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLHNCQUFtQixDQUFFO0FBQ2pEO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyw2QkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJSZWFjdCJdCn0K
