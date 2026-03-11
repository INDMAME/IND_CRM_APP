import {
  ExpenseDateRangeFilter_default,
  ExpenseFilterActions_default,
  ExpenseManagedUserFilterSelect_default,
  ExpenseQuickDateFilters_default,
  buildExpenseTicketListPayload
} from "./chunks/chunk-VBW3Q4GR.js";
import {
  HistorySummary_default
} from "./chunks/chunk-7Z3NMBR5.js";
import {
  getExpenseTicketStatusFilterOptions,
  getExpenseTicketStatusLabel,
  normalizeExpenseTicketFilterSnapshot,
  normalizeExpenseTicketStatusFilterCode,
  useExpenseTicketsFilterCache
} from "./chunks/chunk-5L4ACMZN.js";
import {
  mapWindowEnumOptions
} from "./chunks/chunk-BVPBMOU4.js";
import {
  PageBottomActionButton,
  PageBottomActions_default,
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-GG7UXVCB.js";
import "./chunks/chunk-ZN2XQFXY.js";
import {
  RemoteSearchCombobox_default
} from "./chunks/chunk-PAD7VA7I.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-QGBVJNF4.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-TEDCGD4B.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-YGPFKAYG.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-FRQBPU47.js";
import "./chunks/chunk-6YXFJB4W.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-JR3OAOOU.js";
import {
  flashActionMark
} from "./chunks/chunk-K7MECJ5E.js";
import {
  clearExpenseNavigationGuard,
  formatAmountWithCurrency,
  formatExpenseDateParts,
  formatExpenseDisplayDate,
  navigateToExpenseUrl,
  safeText,
  setExpenseNavigationGuard,
  startOfDay,
  toIsoDate
} from "./chunks/chunk-2VZI2ZK6.js";
import {
  configureExpenseApiAuth,
  createExpenseSheet,
  fetchExpenseSheetDetail,
  fetchExpenseSheetTicketsList
} from "./chunks/chunk-TDJIA4I6.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-2YFZMKVX.js";
import {
  clearExpenseActingUserOverride,
  getExpenseScopeToken,
  setExpenseActingUserOverride,
  toExpenseApiDdMmYyyy
} from "./chunks/chunk-VU42CDR5.js";
import {
  setTopbarActionGroupReady
} from "./chunks/chunk-6G7EOWHU.js";
import {
  Spinner_default,
  canAccess,
  indT,
  showPermissionModal
} from "./chunks/chunk-BYICIYT4.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-BWM3JLWG.js";
import {
  ApiFetchError
} from "./chunks/chunk-IKHTGBEE.js";
import {
  getSessionJsonWithExpiry,
  setSessionJsonWithExpiry
} from "./chunks/chunk-7SKLSV7K.js";
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
      { value: "all", text: indT("Tickets_Filter_All", "All") },
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
var buildTicketSuggestPayload = (term, page, pageSize, fixedStatusFilter) => {
  const safeTerm = String(term || "").trim();
  return {
    page: Number.isFinite(page) && page > 0 ? Math.floor(page) : 1,
    pageSize: Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : SEARCH_PAGE_SIZE,
    searchKey: safeTerm || void 0,
    filter: safeTerm || void 0,
    status: fixedStatusFilter === 0 || fixedStatusFilter === 1 ? fixedStatusFilter : void 0
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
  fixedStatusFilter = null,
  readOnly = false,
  disabled = false,
  showLabel = true
}) => {
  const readOnlyMode = readOnly || disabled;
  const loadOptions = (0, import_react2.useCallback)(async (term, signal) => {
    const payload = buildTicketSuggestPayload(term, 1, SEARCH_PAGE_SIZE, fixedStatusFilter);
    const response = await fetchExpenseSheetTicketsList(payload, {
      suppressPermissionModal: true,
      signal
    });
    if (response?.Success === false) {
      return [];
    }
    return mapTicketOptions(response?.Items);
  }, [fixedStatusFilter]);
  const loadOptionsPage = (0, import_react2.useCallback)(async (term, page, _pageSize, signal) => {
    const payload = buildTicketSuggestPayload(term, page, SEARCH_PAGE_SIZE, fixedStatusFilter);
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
  }, [fixedStatusFilter]);
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
  managedUserId,
  managedUsers,
  showManagedUserFilter,
  statusFilter,
  gastoTypeFilter,
  processedByIaFilter,
  activeQuickFilter,
  showManualDateError,
  statusFilterReadOnly = false,
  fixedStatusFilter = null,
  gastoTypeOptions,
  onDateRangeChange,
  onManualRangeComplete,
  onQuickFilterChange,
  onFilterKeyChange,
  onCurrencyCodeChange,
  onManagedUserIdChange,
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
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: `grid grid-cols-1 sm:grid-cols-2 ${showManagedUserFilter ? "lg:grid-cols-6" : "lg:grid-cols-5"} gap-2`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        ExpenseTicketFilterKeyInput_default,
        {
          label: indT("Tickets_Filter_FilterKey", "Ticket"),
          placeholder: indT("Tickets_Filter_FilterKey", "Ticket"),
          value: filterKey,
          onChange: onFilterKeyChange,
          enableRemoteSuggestions: true,
          fixedStatusFilter,
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
          showLabel: false,
          showLoadingStateText: false
        }
      ),
      showManagedUserFilter ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        ExpenseManagedUserFilterSelect_default,
        {
          label: indT("Common_User", "User"),
          placeholder: indT("Common_User", "User"),
          value: managedUserId,
          users: managedUsers,
          onChange: onManagedUserIdChange,
          showLabel: false
        }
      ) : null,
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        SelectCombobox_default,
        {
          label: indT("Tickets_Filter_Status", "Status"),
          placeholder: indT("Tickets_Filter_Status", "Status"),
          options: statusOptions,
          value: statusFilter,
          onChange: (nextValue) => onStatusFilterChange(normalizeExpenseTicketStatusFilterCode(nextValue, "")),
          allowTextInput: false,
          disabled: statusFilterReadOnly,
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
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        ExpenseProcessedByIaFilterSelect_default,
        {
          label: indT("Tickets_Filter_ProcessedByIA", "Processed by IA"),
          placeholder: indT("Tickets_Filter_ProcessedByIA", "Processed by IA"),
          value: processedByIaFilter,
          onChange: onProcessedByIaFilterChange,
          showLabel: false
        }
      )
    ] }),
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
var useExpenseTicketsFiltersState = ({
  onApplyFilters,
  onClearFilters,
  defaultManagedUserId,
  fixedStatusFilter = null,
  allowEmptyDatesOnApply = false
}) => {
  const hasFixedStatusFilter = fixedStatusFilter === 0 || fixedStatusFilter === 1;
  const resolveStatusFilter = (0, import_react4.useCallback)(
    (value) => {
      if (hasFixedStatusFilter) {
        return fixedStatusFilter;
      }
      return value;
    },
    [fixedStatusFilter, hasFixedStatusFilter]
  );
  const [fromDate, setFromDate] = (0, import_react4.useState)("");
  const [toDate, setToDate] = (0, import_react4.useState)("");
  const [filterKey, setFilterKey] = (0, import_react4.useState)("");
  const [currencyCode, setCurrencyCode] = (0, import_react4.useState)("");
  const [managedUserId, setManagedUserId] = (0, import_react4.useState)(defaultManagedUserId);
  const [statusFilterRaw, setStatusFilterRaw] = (0, import_react4.useState)(resolveStatusFilter(""));
  const [gastoTypeFilter, setGastoTypeFilter] = (0, import_react4.useState)("");
  const [processedByIaFilter, setProcessedByIaFilter] = (0, import_react4.useState)("all");
  const [activeQuickFilter, setActiveQuickFilter] = (0, import_react4.useState)(null);
  const [showManualDateFilter, setShowManualDateFilter] = (0, import_react4.useState)(false);
  const [showManualDateError, setShowManualDateError] = (0, import_react4.useState)(false);
  const [manualDateAutoOpenKey, setManualDateAutoOpenKey] = (0, import_react4.useState)(0);
  const [appliedFilters, setAppliedFilters] = (0, import_react4.useState)(null);
  const [showFilters, setShowFilters] = (0, import_react4.useState)(true);
  (0, import_react4.useEffect)(() => {
    if (!hasFixedStatusFilter) return;
    setStatusFilterRaw(fixedStatusFilter);
  }, [fixedStatusFilter, hasFixedStatusFilter]);
  const statusFilter = resolveStatusFilter(statusFilterRaw);
  const currentFilters = (0, import_react4.useMemo)(
    () => ({
      fromDate,
      toDate,
      filterKey: filterKey.trim(),
      currencyCode: currencyCode.trim(),
      managedUserId: managedUserId.trim(),
      statusFilter,
      gastoTypeFilter,
      processedByIaFilter
    }),
    [currencyCode, filterKey, fromDate, gastoTypeFilter, managedUserId, processedByIaFilter, statusFilter, toDate]
  );
  const setStatusFilter = (0, import_react4.useCallback)(
    (value) => {
      if (hasFixedStatusFilter) {
        setStatusFilterRaw(fixedStatusFilter);
        return;
      }
      setStatusFilterRaw(value);
    },
    [fixedStatusFilter, hasFixedStatusFilter]
  );
  const onApply = (0, import_react4.useCallback)(() => {
    if (!allowEmptyDatesOnApply && (!fromDate || !toDate)) {
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
      managedUserId: managedUserId.trim(),
      statusFilter,
      gastoTypeFilter,
      processedByIaFilter
    };
    setShowManualDateError(false);
    setAppliedFilters(snapshot);
    setShowManualDateFilter(false);
    setShowFilters(false);
    onApplyFilters(snapshot);
  }, [
    allowEmptyDatesOnApply,
    currencyCode,
    filterKey,
    fromDate,
    gastoTypeFilter,
    managedUserId,
    onApplyFilters,
    processedByIaFilter,
    statusFilter,
    toDate
  ]);
  const restoreAppliedFilters = (0, import_react4.useCallback)(
    (snapshot) => {
      const normalized = normalizeExpenseTicketFilterSnapshot(snapshot);
      const normalizedStatusFilter = resolveStatusFilter(normalized.statusFilter);
      const restoredManagedUserId = String(normalized.managedUserId || defaultManagedUserId).trim();
      setFromDate(normalized.fromDate);
      setToDate(normalized.toDate);
      setFilterKey(normalized.filterKey);
      setCurrencyCode(normalized.currencyCode);
      setManagedUserId(restoredManagedUserId);
      setStatusFilterRaw(normalizedStatusFilter);
      setGastoTypeFilter(normalized.gastoTypeFilter);
      setProcessedByIaFilter(normalized.processedByIaFilter);
      setActiveQuickFilter(null);
      setShowManualDateFilter(false);
      setShowManualDateError(false);
      setAppliedFilters({
        ...normalized,
        managedUserId: restoredManagedUserId,
        statusFilter: normalizedStatusFilter
      });
      setShowFilters(false);
    },
    [defaultManagedUserId, resolveStatusFilter]
  );
  const onClear = (0, import_react4.useCallback)(() => {
    setFromDate("");
    setToDate("");
    setFilterKey("");
    setCurrencyCode("");
    setManagedUserId(defaultManagedUserId);
    setStatusFilterRaw(resolveStatusFilter(""));
    setGastoTypeFilter("");
    setProcessedByIaFilter("all");
    setActiveQuickFilter(null);
    setShowManualDateFilter(false);
    setShowManualDateError(false);
    setManualDateAutoOpenKey(0);
    setAppliedFilters(null);
    setShowFilters(true);
    onClearFilters();
  }, [defaultManagedUserId, onClearFilters, resolveStatusFilter]);
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
    managedUserId,
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
    setManagedUserId,
    setStatusFilter,
    setGastoTypeFilter,
    setProcessedByIaFilter,
    onApply,
    onClear,
    restoreAppliedFilters,
    onDateRangeChange,
    onManualRangeComplete,
    onQuickFilterChange,
    toggleFilterPanel,
    statusFilterLocked: hasFixedStatusFilter
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/useExpenseTicketsListData.ts
var import_react5 = __toESM(require_react());
var ALLOWED_GASTO_TYPE_CODES = /* @__PURE__ */ new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);
var EXPENSE_TICKETS_LIST_CACHE_KEY_PREFIX = "expense_tickets_list_v1";
var EXPENSE_TICKETS_LIST_CACHE_TTL_MS = 2 * 60 * 1e3;
var BULK_SELECTION_PAGE_SIZE = 200;
var BULK_SELECTION_CONCURRENCY = 4;
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
var getListCacheScope = () => {
  return getExpenseScopeToken();
};
var getListCacheKey = () => `${EXPENSE_TICKETS_LIST_CACHE_KEY_PREFIX}_${getListCacheScope()}`;
var readListCacheEntry = (requestKey) => {
  const raw = getSessionJsonWithExpiry(getListCacheKey());
  if (!raw || typeof raw !== "object") return null;
  if (String(raw.requestKey || "") !== requestKey) return null;
  const safeItems = Array.isArray(raw.items) ? raw.items : [];
  const totalRaw = Number(raw.total);
  const total = Number.isFinite(totalRaw) && totalRaw >= 0 ? totalRaw : safeItems.length;
  const pageRaw = Number(raw.page);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? Math.floor(pageRaw) : 1;
  return {
    requestKey,
    page,
    total,
    items: safeItems
  };
};
var writeListCacheEntry = (entry) => {
  setSessionJsonWithExpiry(getListCacheKey(), entry, EXPENSE_TICKETS_LIST_CACHE_TTL_MS);
};
var useExpenseTicketsListData = ({ hasAccess, pageSize, onForbidden }) => {
  const [items, setItems] = (0, import_react5.useState)([]);
  const [total, setTotal] = (0, import_react5.useState)(0);
  const [currentPage, setCurrentPage] = (0, import_react5.useState)(1);
  const [isLoading, setIsLoading] = (0, import_react5.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react5.useState)("");
  const activeRequestControllerRef = (0, import_react5.useRef)(null);
  const activeRequestKeyRef = (0, import_react5.useRef)("");
  const activeRequestSeqRef = (0, import_react5.useRef)(0);
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
      const payload = buildExpenseTicketListPayload(filters, page, pageSize);
      const normalizedManagedUserId = String(filters?.managedUserId || "").trim().toUpperCase();
      const requestKey = JSON.stringify({
        payload,
        managedUserId: normalizedManagedUserId
      });
      const cachedEntry = readListCacheEntry(requestKey);
      if (cachedEntry) {
        if (activeRequestControllerRef.current) {
          activeRequestControllerRef.current.abort();
          activeRequestControllerRef.current = null;
          activeRequestKeyRef.current = "";
          activeRequestSeqRef.current += 1;
        }
        restoreListSnapshot({
          items: cachedEntry.items,
          total: cachedEntry.total,
          page: cachedEntry.page
        });
        return;
      }
      if (activeRequestControllerRef.current && activeRequestKeyRef.current === requestKey) {
        return;
      }
      if (activeRequestControllerRef.current) {
        activeRequestControllerRef.current.abort();
      }
      const controller = new AbortController();
      activeRequestControllerRef.current = controller;
      activeRequestKeyRef.current = requestKey;
      const requestSeq = activeRequestSeqRef.current + 1;
      activeRequestSeqRef.current = requestSeq;
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await fetchExpenseSheetTicketsList(payload, {
          suppressPermissionModal: true,
          signal: controller.signal,
          axUserIdOverride: normalizedManagedUserId || void 0
        });
        if (requestSeq !== activeRequestSeqRef.current) return;
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
        writeListCacheEntry({
          requestKey,
          page,
          total: nextTotal,
          items: mappedItems
        });
        setItems(mappedItems);
        setTotal(nextTotal);
        setCurrentPage(page);
      } catch (error) {
        if (controller.signal.aborted) return;
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (requestSeq !== activeRequestSeqRef.current) return;
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
        if (requestSeq === activeRequestSeqRef.current) {
          setIsLoading(false);
          activeRequestControllerRef.current = null;
          activeRequestKeyRef.current = "";
        }
      }
    },
    [hasAccess, onForbidden, pageSize, restoreListSnapshot]
  );
  const loadAllMatchingTickets = (0, import_react5.useCallback)(
    async (filters, axUserIdOverride = "") => {
      if (!hasAccess) {
        onForbidden();
        return [];
      }
      const normalizedAxUserIdOverride = String(axUserIdOverride || "").trim().toUpperCase();
      const ticketMap = /* @__PURE__ */ new Map();
      const fetchPage = async (page) => {
        const payload = buildExpenseTicketListPayload(filters, page, BULK_SELECTION_PAGE_SIZE);
        const response = await fetchExpenseSheetTicketsList(payload, {
          suppressPermissionModal: true,
          axUserIdOverride: normalizedAxUserIdOverride || void 0
        });
        const sourceItems = Array.isArray(response?.Items) ? response.Items : [];
        if (response?.Success === false && sourceItems.length < 1) {
          throw new Error(response.Message || indT("Tickets_LoadError", "Could not load tickets."));
        }
        return {
          items: sourceItems.map((item) => mapTicketItemToCard(item)),
          total: Number(response?.Total ?? sourceItems.length ?? 0)
        };
      };
      try {
        const firstPage = await fetchPage(1);
        for (const item of firstPage.items) {
          const normalizedFileId = String(item.fileId || "").trim().toUpperCase();
          if (!normalizedFileId) continue;
          ticketMap.set(normalizedFileId, item);
        }
        const resolvedTotal = firstPage.total > 0 ? firstPage.total : firstPage.items.length;
        const totalPages = Math.max(1, Math.ceil(resolvedTotal / BULK_SELECTION_PAGE_SIZE));
        const remainingPages = Array.from({ length: Math.max(0, totalPages - 1) }, (_value, index) => index + 2);
        for (let index = 0; index < remainingPages.length; index += BULK_SELECTION_CONCURRENCY) {
          const pageChunk = remainingPages.slice(index, index + BULK_SELECTION_CONCURRENCY);
          const pageResults = await Promise.all(pageChunk.map((page) => fetchPage(page)));
          for (const pageResult of pageResults) {
            for (const item of pageResult.items) {
              const normalizedFileId = String(item.fileId || "").trim().toUpperCase();
              if (!normalizedFileId) continue;
              ticketMap.set(normalizedFileId, item);
            }
          }
        }
        return Array.from(ticketMap.values());
      } catch (error) {
        if (error instanceof ApiFetchError && error.status === 403) {
          onForbidden();
          return [];
        }
        throw error;
      }
    },
    [hasAccess, onForbidden]
  );
  const resetList = (0, import_react5.useCallback)(() => {
    if (activeRequestControllerRef.current) {
      activeRequestControllerRef.current.abort();
      activeRequestControllerRef.current = null;
      activeRequestKeyRef.current = "";
    }
    setItems([]);
    setTotal(0);
    setCurrentPage(1);
    setErrorMessage("");
  }, []);
  (0, import_react5.useEffect)(() => {
    return () => {
      if (activeRequestControllerRef.current) {
        activeRequestControllerRef.current.abort();
        activeRequestControllerRef.current = null;
        activeRequestKeyRef.current = "";
      }
    };
  }, []);
  return {
    items,
    total,
    currentPage,
    isLoading,
    errorMessage,
    loadList,
    loadAllMatchingTickets,
    restoreListSnapshot,
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
var EXPENSE_STATUS_APPROVED = 2;
var EXPENSE_STATUS_PAID = 4;
var LINK_MODE_OPEN_DETAIL_DELAY_MS = 220;
var LINK_MODE_SELECTION_GUARD_MS = 280;
var normalizeUserId = (value) => String(value || "").trim();
var isSameUser = (left, right) => {
  const normalizedLeft = normalizeUserId(left).toUpperCase();
  const normalizedRight = normalizeUserId(right).toUpperCase();
  return !!normalizedLeft && normalizedLeft === normalizedRight;
};
var ensureCurrentUserInList = (users, currentAxUserId) => {
  const normalizedCurrent = normalizeUserId(currentAxUserId);
  if (!normalizedCurrent) return users;
  if (users.some((entry) => isSameUser(entry.axUserId, normalizedCurrent))) return users;
  return [
    {
      crmUserId: normalizedCurrent,
      axUserId: normalizedCurrent,
      name: normalizedCurrent
    },
    ...users
  ];
};
var resolveManagedUserSelection = (requestedUserId, currentAxUserId, users) => {
  const normalizedRequested = normalizeUserId(requestedUserId);
  const normalizedCurrent = normalizeUserId(currentAxUserId);
  if (normalizedRequested) {
    const found = users.find((entry) => isSameUser(entry.axUserId, normalizedRequested));
    if (found) return found.axUserId;
  }
  if (normalizedCurrent) {
    const self = users.find((entry) => isSameUser(entry.axUserId, normalizedCurrent));
    return self?.axUserId || normalizedCurrent;
  }
  return "";
};
var buildLinkModeInitialSnapshot = (managedUserId = "") => {
  const today = startOfDay(/* @__PURE__ */ new Date());
  const fromDate = new Date(today);
  fromDate.setDate(today.getDate() - 29);
  return {
    fromDate: toIsoDate(fromDate),
    toDate: toIsoDate(today),
    filterKey: "",
    currencyCode: "",
    managedUserId: normalizeUserId(managedUserId),
    statusFilter: 0,
    gastoTypeFilter: "",
    processedByIaFilter: "all"
  };
};
var canSelectTicketForLink = (item) => {
  const fileId = safeText(item.fileId);
  if (!fileId) return false;
  if (item.status !== 0) return false;
  const totalAmount = Number(item.totalAmount ?? 0);
  if (!(totalAmount > 0)) return false;
  const gastoType = Number(item.gastoType);
  return Number.isInteger(gastoType) && gastoType > 0;
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
  const canLinkSheetLines = canAccess("GASTOS_HOJA_GASTO", "Add");
  const {
    currentAxUserId,
    subordinates,
    canManageOtherUsers,
    setSelectedManagedUserId
  } = useAuthContext();
  const timelineContainerRef = import_react6.default.useRef(null);
  const cameraInputRef = import_react6.default.useRef(null);
  const galleryInputRef = import_react6.default.useRef(null);
  const didRestoreOnMountRef = import_react6.default.useRef(false);
  const didApplyQueryFilterRef = import_react6.default.useRef(false);
  const pendingScrollRestoreRef = import_react6.default.useRef(null);
  const pendingFocusFileIdRef = import_react6.default.useRef("");
  const linkModeSelectionIntentUntilRef = import_react6.default.useRef(0);
  const linkModePendingOpenTimerRef = import_react6.default.useRef(null);
  const linkModeContext = (0, import_react6.useMemo)(() => {
    const url = new URL(window.location.href);
    const action = safeText(url.searchParams.get("action")).toLowerCase();
    const hojaGastosId = safeText(url.searchParams.get("hojaGastosId"));
    const isLinkMode2 = action === "link" && !!hojaGastosId;
    return {
      isLinkMode: isLinkMode2,
      sheetId: hojaGastosId,
      fixedStatusFilter: isLinkMode2 ? 0 : null
    };
  }, []);
  const isLinkMode = linkModeContext.isLinkMode;
  const linkSheetId = linkModeContext.sheetId;
  const fixedStatusFilter = linkModeContext.fixedStatusFilter;
  const canProcessLinkMode = !isLinkMode || canLinkSheetLines;
  const managedUsers = (0, import_react6.useMemo)(
    () => ensureCurrentUserInList(Array.isArray(subordinates) ? subordinates : [], currentAxUserId),
    [currentAxUserId, subordinates]
  );
  const defaultManagedUserId = (0, import_react6.useMemo)(
    () => resolveManagedUserSelection(currentAxUserId, currentAxUserId, managedUsers),
    [currentAxUserId, managedUsers]
  );
  const showManagedUserFilter = isLinkMode && canManageOtherUsers;
  const normalizeLinkModeSnapshotForLoad = (0, import_react6.useCallback)(
    (snapshot) => {
      if (!isLinkMode) return snapshot;
      const fallback = buildLinkModeInitialSnapshot(snapshot.managedUserId);
      const normalizedFromDate = safeText(snapshot.fromDate) || fallback.fromDate;
      const normalizedToDate = safeText(snapshot.toDate) || fallback.toDate;
      const normalizedManagedUserId = normalizeUserId(snapshot.managedUserId) || fallback.managedUserId;
      return {
        ...snapshot,
        fromDate: normalizedFromDate,
        toDate: normalizedToDate,
        managedUserId: normalizedManagedUserId,
        statusFilter: 0
      };
    },
    [isLinkMode]
  );
  const [linkSheetLocked, setLinkSheetLocked] = (0, import_react6.useState)(false);
  const [linkSheetCheckBusy, setLinkSheetCheckBusy] = (0, import_react6.useState)(false);
  const [linkFlowBusy, setLinkFlowBusy] = (0, import_react6.useState)(false);
  const [linkFlowStatus, setLinkFlowStatus] = (0, import_react6.useState)("");
  const [linkFlowError, setLinkFlowError] = (0, import_react6.useState)("");
  const [selectAllBusy, setSelectAllBusy] = (0, import_react6.useState)(false);
  const [selectAllError, setSelectAllError] = (0, import_react6.useState)("");
  const [selectedTicketsById, setSelectedTicketsById] = (0, import_react6.useState)({});
  const paginationLabels = (0, import_react6.useMemo)(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last")
    }),
    []
  );
  const { modal, openConfirm, closeConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "OK"),
    defaultCancelText: indT("Confirm_No", "Cancel")
  });
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
  const {
    items,
    total,
    currentPage,
    isLoading,
    errorMessage,
    loadList,
    loadAllMatchingTickets,
    restoreListSnapshot,
    resetList
  } = useExpenseTicketsListData({
    hasAccess,
    pageSize: PAGE_SIZE,
    onForbidden: showPermissionModal
  });
  const { readCachedState, consumeReturnFlag, saveCachedState, clearCachedState } = useExpenseTicketsFilterCache();
  const syncManagedUserSelection = (0, import_react6.useCallback)(
    (requestedUserId) => {
      const resolvedUserId = resolveManagedUserSelection(requestedUserId, currentAxUserId, managedUsers);
      setSelectedManagedUserId(resolvedUserId);
      if (!resolvedUserId || currentAxUserId && isSameUser(resolvedUserId, currentAxUserId)) {
        clearExpenseActingUserOverride();
      } else {
        setExpenseActingUserOverride(resolvedUserId);
      }
      return resolvedUserId;
    },
    [currentAxUserId, managedUsers, setSelectedManagedUserId]
  );
  const {
    fromDate,
    toDate,
    filterKey,
    currencyCode,
    managedUserId,
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
    setManagedUserId,
    setStatusFilter,
    setGastoTypeFilter,
    setProcessedByIaFilter,
    onApply,
    onClear,
    restoreAppliedFilters,
    onDateRangeChange,
    onManualRangeComplete,
    onQuickFilterChange,
    toggleFilterPanel,
    statusFilterLocked
  } = useExpenseTicketsFiltersState({
    defaultManagedUserId,
    fixedStatusFilter,
    allowEmptyDatesOnApply: isLinkMode,
    onApplyFilters: (snapshot) => {
      const resolvedManagedUserId = syncManagedUserSelection(snapshot.managedUserId);
      void loadList(
        1,
        normalizeLinkModeSnapshotForLoad({
          ...snapshot,
          managedUserId: resolvedManagedUserId
        })
      );
    },
    onClearFilters: () => {
      const resetManagedUserId = syncManagedUserSelection(currentAxUserId);
      setManagedUserId(resetManagedUserId);
      clearCachedState();
      resetList();
    }
  });
  (0, import_react6.useEffect)(() => {
    const normalizedDefaultManagedUserId = normalizeUserId(defaultManagedUserId);
    if (!normalizedDefaultManagedUserId) return;
    setManagedUserId(normalizedDefaultManagedUserId);
    syncManagedUserSelection(normalizedDefaultManagedUserId);
  }, [defaultManagedUserId, setManagedUserId, syncManagedUserSelection]);
  (0, import_react6.useEffect)(() => {
    if (canManageOtherUsers) return;
    const fallbackManagedUserId = resolveManagedUserSelection(currentAxUserId, currentAxUserId, managedUsers);
    const normalizedCurrentManagedUserId = normalizeUserId(managedUserId);
    if (isSameUser(normalizedCurrentManagedUserId, fallbackManagedUserId)) return;
    if (!normalizedCurrentManagedUserId && !fallbackManagedUserId) return;
    setManagedUserId(fallbackManagedUserId);
    syncManagedUserSelection(fallbackManagedUserId);
  }, [canManageOtherUsers, currentAxUserId, managedUserId, managedUsers, setManagedUserId, syncManagedUserSelection]);
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
    canCreateExpense: !isLinkMode && canCreateTicket,
    isCreateMode: false,
    isSheetLocked: false,
    linkToSheet: false,
    axUserIdOverride: safeText(currentAxUserId),
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
  const fabMenuItems = (0, import_react6.useMemo)(
    () => isLinkMode ? [] : [
      {
        id: "new-ticket",
        label: indT("ExpenseSheets_Fab_NewTicket", "Nuevo Ticket"),
        icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(NewTicketIcon, {}),
        onClick: openSourcePicker
      }
    ],
    [isLinkMode, openSourcePicker]
  );
  const selectedTicketList = (0, import_react6.useMemo)(() => Object.values(selectedTicketsById), [selectedTicketsById]);
  const selectedTicketCount = selectedTicketList.length;
  const selectedTotalAmount = (0, import_react6.useMemo)(() => {
    return selectedTicketList.reduce((sum, item) => {
      const amount = Number(item.totalAmount ?? 0);
      return amount > 0 ? sum + amount : sum;
    }, 0);
  }, [selectedTicketList]);
  const selectedTotalAmountText = (0, import_react6.useMemo)(() => formatAmountWithCurrency(selectedTotalAmount, ""), [selectedTotalAmount]);
  (0, import_react6.useLayoutEffect)(() => {
    setTopbarActionGroupReady("expense-tickets-list-actions");
  }, []);
  const linkModeCancelMessage = (0, import_react6.useMemo)(
    () => indT(
      "ExpenseTickets_LinkMode_CancelConfirm",
      "Se cancelara el proceso de vinculacion y volveras a la hoja de gastos. Quieres continuar?"
    ),
    []
  );
  const markLinkModeSelectionIntent = (0, import_react6.useCallback)(() => {
    linkModeSelectionIntentUntilRef.current = Date.now() + LINK_MODE_SELECTION_GUARD_MS;
    if (linkModePendingOpenTimerRef.current != null) {
      window.clearTimeout(linkModePendingOpenTimerRef.current);
      linkModePendingOpenTimerRef.current = null;
    }
  }, []);
  const clearPendingDetailOpen = (0, import_react6.useCallback)(() => {
    if (linkModePendingOpenTimerRef.current != null) {
      window.clearTimeout(linkModePendingOpenTimerRef.current);
      linkModePendingOpenTimerRef.current = null;
    }
  }, []);
  const setFilteredSelectedTickets = (0, import_react6.useCallback)((predicate) => {
    setSelectedTicketsById((previous) => {
      const next = {};
      for (const [fileId, item] of Object.entries(previous)) {
        if (predicate(item)) {
          next[fileId] = item;
        }
      }
      return next;
    });
  }, []);
  const isTicketSelected = (0, import_react6.useCallback)(
    (fileId) => {
      const safeFileId = safeText(fileId);
      return !!safeFileId && !!selectedTicketsById[safeFileId];
    },
    [selectedTicketsById]
  );
  const toggleTicketSelection = (0, import_react6.useCallback)(
    (ticket) => {
      if (!isLinkMode || !canProcessLinkMode || linkSheetCheckBusy || linkSheetLocked || linkFlowBusy) return;
      const fileId = safeText(ticket.fileId);
      if (!fileId) return;
      if (!canSelectTicketForLink(ticket)) return;
      setSelectedTicketsById((previous) => {
        const next = { ...previous };
        if (next[fileId]) {
          delete next[fileId];
          return next;
        }
        next[fileId] = ticket;
        return next;
      });
    },
    [canProcessLinkMode, isLinkMode, linkFlowBusy, linkSheetCheckBusy, linkSheetLocked]
  );
  const clearTicketSelection = (0, import_react6.useCallback)(() => {
    setSelectAllError("");
    setSelectedTicketsById({});
  }, []);
  const resolveActiveFilters = (0, import_react6.useCallback)(() => {
    const baseSnapshot = appliedFilters || currentFilters;
    const resolvedManagedUserId = syncManagedUserSelection(baseSnapshot.managedUserId);
    return normalizeLinkModeSnapshotForLoad({
      ...baseSnapshot,
      managedUserId: resolvedManagedUserId
    });
  }, [appliedFilters, currentFilters, normalizeLinkModeSnapshotForLoad, syncManagedUserSelection]);
  const selectAllMatchingTickets = (0, import_react6.useCallback)(async () => {
    if (!isLinkMode || !canProcessLinkMode || linkSheetCheckBusy || linkSheetLocked || linkFlowBusy || selectAllBusy) {
      return;
    }
    setSelectAllBusy(true);
    setSelectAllError("");
    try {
      const activeFilters = resolveActiveFilters();
      const requestAxUserId = safeText(activeFilters.managedUserId || currentAxUserId);
      const allMatchingTickets = await loadAllMatchingTickets(activeFilters, requestAxUserId);
      setSelectedTicketsById((previous) => {
        const next = { ...previous };
        for (const ticket of allMatchingTickets) {
          if (!canSelectTicketForLink(ticket)) continue;
          const fileId = safeText(ticket.fileId);
          if (!fileId) continue;
          next[fileId] = ticket;
        }
        return next;
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : indT("Tickets_LoadError", "Could not load tickets.");
      setSelectAllError(message);
    } finally {
      setSelectAllBusy(false);
    }
  }, [
    canProcessLinkMode,
    currentAxUserId,
    isLinkMode,
    linkFlowBusy,
    linkSheetCheckBusy,
    linkSheetLocked,
    loadAllMatchingTickets,
    resolveActiveFilters,
    selectAllBusy
  ]);
  (0, import_react6.useEffect)(() => {
    return () => {
      clearPendingDetailOpen();
    };
  }, [clearPendingDetailOpen]);
  (0, import_react6.useEffect)(() => {
    if (!isLinkMode || items.length < 1) return;
    setSelectedTicketsById((previous) => {
      let changed = false;
      const next = { ...previous };
      for (const item of items) {
        const fileId = safeText(item.fileId);
        if (!fileId || !next[fileId]) continue;
        next[fileId] = item;
        changed = true;
      }
      return changed ? next : previous;
    });
  }, [isLinkMode, items]);
  const buildExpenseLineFromTicket = (0, import_react6.useCallback)(
    (ticket) => {
      if (!canSelectTicketForLink(ticket)) return null;
      const fileId = safeText(ticket.fileId);
      const typeValue = Number(ticket.gastoType);
      const price = Number(ticket.totalAmount ?? 0);
      const transDate = toExpenseApiDdMmYyyy(ticket.transDate) || toExpenseApiDdMmYyyy(/* @__PURE__ */ new Date());
      if (!fileId || !Number.isInteger(typeValue) || typeValue <= 0 || !(price > 0) || !transDate) {
        return null;
      }
      return {
        transDate,
        typeValue,
        description: safeText(ticket.description) || safeText(ticket.fileName) || indT("Tickets_Filter_FilterKey", "Ticket"),
        internacional: false,
        fileId,
        ticket: true,
        qty: 1,
        price
      };
    },
    []
  );
  const revalidateLinkSelection = (0, import_react6.useCallback)(
    async (candidateSelection, axUserIdOverride = "") => {
      const entries = Object.entries(candidateSelection);
      if (entries.length < 1) return {};
      const next = {};
      for (const [fileId, ticket] of entries) {
        const safeFileId = safeText(fileId);
        if (!safeFileId || !canSelectTicketForLink(ticket)) {
          continue;
        }
        try {
          const response = await fetchExpenseSheetTicketsList(
            {
              page: 1,
              pageSize: 10,
              searchKey: safeFileId,
              filter: safeFileId,
              status: 0
            },
            {
              suppressPermissionModal: true,
              axUserIdOverride: safeText(axUserIdOverride) || void 0
            }
          );
          const itemsRaw = Array.isArray(response?.Items) ? response.Items : [];
          const existsAsPending = itemsRaw.some((entry) => safeText(entry.FileId).toUpperCase() === safeFileId.toUpperCase());
          if (existsAsPending) {
            next[safeFileId] = ticket;
          }
        } catch {
          next[safeFileId] = ticket;
        }
      }
      return next;
    },
    []
  );
  const runTicketLinkFlow = (0, import_react6.useCallback)(async () => {
    if (!isLinkMode || !linkSheetId || linkFlowBusy) {
      return false;
    }
    if (linkSheetLocked || !canProcessLinkMode) {
      setLinkFlowError(indT("ExpenseSheets_Detail_PaidReadOnly", "Las hojas de gasto pagadas son de solo lectura."));
      setLinkFlowStatus(indT("ExpenseSheets_Detail_PaidReadOnly", "Las hojas de gasto pagadas son de solo lectura."));
      flashActionMark("errorProcess", 1500);
      return false;
    }
    const selectedEntries = Object.entries(selectedTicketsById);
    if (selectedEntries.length < 1) {
      return false;
    }
    const activeFilters = resolveActiveFilters();
    const requestAxUserId = safeText(activeFilters.managedUserId || currentAxUserId);
    const requestHeaders = requestAxUserId ? {
      "X-IND-AxUserId": requestAxUserId
    } : void 0;
    setLinkFlowBusy(true);
    setLinkFlowError("");
    setLinkFlowStatus(indT("ExpenseSheets_NewTicket_Status_LinkingLine", "Linking expense line..."));
    let successCount = 0;
    const failedSelection = {};
    try {
      for (let index = 0; index < selectedEntries.length; index += 1) {
        const [fileId, ticket] = selectedEntries[index];
        const safeFileId = safeText(fileId);
        setLinkFlowStatus(
          `${indT("ExpenseSheets_NewTicket_Status_LinkingLine", "Linking expense line...")} ${index + 1}/${selectedEntries.length}`
        );
        const linePayload = buildExpenseLineFromTicket(ticket);
        if (!safeFileId || !linePayload) {
          failedSelection[safeFileId || fileId] = ticket;
          continue;
        }
        try {
          const response = await createExpenseSheet(
            {
              mode: 2,
              existingHojaGastosId: linkSheetId,
              lines: [linePayload]
            },
            {
              suppressPermissionModal: true,
              headers: requestHeaders
            }
          );
          if (response.Success !== true) {
            failedSelection[safeFileId] = ticket;
            continue;
          }
          successCount += 1;
          setSelectedTicketsById((previous) => {
            if (!previous[safeFileId]) return previous;
            const next = { ...previous };
            delete next[safeFileId];
            return next;
          });
        } catch {
          failedSelection[safeFileId] = ticket;
        }
      }
      await loadList(currentPage < 1 ? 1 : currentPage, activeFilters);
      const validatedFailures = await revalidateLinkSelection(failedSelection, requestAxUserId);
      setFilteredSelectedTickets((entry) => {
        const safeFileId = safeText(entry.fileId);
        return !!safeFileId && !!validatedFailures[safeFileId];
      });
      if (successCount === selectedEntries.length) {
        setLinkFlowStatus(indT("Common_OK", "OK"));
        flashActionMark("okProcess", 1200);
        clearCachedState();
        navigateToExpenseUrl(`/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(linkSheetId)}`, {
          askConfirmation: false,
          bypassGuardOnce: true
        });
        return true;
      }
      if (successCount > 0) {
        const failedCount = selectedEntries.length - successCount;
        const partialMessage = `${indT("Api_RequestFailed", "Request failed.")} (${failedCount}/${selectedEntries.length})`;
        setLinkFlowError(partialMessage);
        setLinkFlowStatus(partialMessage);
        flashActionMark("warningProcess", 1500);
        return false;
      }
      const failureMessage = indT("Api_RequestFailed", "Request failed.");
      setLinkFlowError(failureMessage);
      setLinkFlowStatus(failureMessage);
      flashActionMark("errorProcess", 1500);
      return false;
    } finally {
      setLinkFlowBusy(false);
    }
  }, [
    buildExpenseLineFromTicket,
    canProcessLinkMode,
    clearCachedState,
    currentPage,
    currentAxUserId,
    isLinkMode,
    linkFlowBusy,
    linkSheetId,
    linkSheetLocked,
    loadList,
    revalidateLinkSelection,
    resolveActiveFilters,
    selectedTicketsById,
    setFilteredSelectedTickets
  ]);
  const openLinkConfirmModal = (0, import_react6.useCallback)(() => {
    if (!isLinkMode || selectedTicketCount < 1 || linkFlowBusy || linkSheetCheckBusy || linkSheetLocked) {
      return;
    }
    setLinkFlowError("");
    setLinkFlowStatus("");
    openConfirm({
      title: indT("ExpenseTickets_LinkMode_LinkButton", "Vincular ticket(s)"),
      message: `${indT("Nav_ExpenseTickets", "Tickets")}: ${selectedTicketCount}
${indT("ExpenseSheets_Field_TotalAmount", "Total amount")}: ${selectedTotalAmountText}`,
      confirmText: indT("ExpenseTickets_LinkMode_LinkButton", "Vincular ticket(s)"),
      cancelText: indT("Confirm_No", "Cancel"),
      onConfirm: async () => {
        return runTicketLinkFlow();
      }
    });
  }, [
    isLinkMode,
    selectedTicketCount,
    linkFlowBusy,
    linkSheetCheckBusy,
    linkSheetLocked,
    openConfirm,
    selectedTotalAmountText,
    runTicketLinkFlow
  ]);
  const handleModalConfirm = (0, import_react6.useCallback)(async () => {
    setLinkFlowError("");
    await handleConfirm({
      busy: linkFlowBusy,
      onError: (message) => {
        setLinkFlowError(message);
        setLinkFlowStatus(message);
      },
      defaultErrorMessage: indT("Api_RequestFailed", "Request failed.")
    });
  }, [handleConfirm, linkFlowBusy]);
  const modalLoadingText = indT("Common_Loading", "Loading");
  const modalCancelText = modal.cancelText || indT("Confirm_No", "Cancel");
  const modalConfirmText = linkFlowBusy ? modalLoadingText : !linkFlowBusy && linkFlowError ? indT("Common_OK", "OK") : modal.confirmText || indT("Confirm_Yes", "OK");
  const handleModalButtonConfirm = (0, import_react6.useCallback)(() => {
    if (!linkFlowBusy && linkFlowError) {
      closeConfirm();
      return;
    }
    void handleModalConfirm();
  }, [closeConfirm, handleModalConfirm, linkFlowBusy, linkFlowError]);
  const openTicketDetail = (0, import_react6.useCallback)(
    (rawFileId) => {
      const fileId = safeText(rawFileId);
      if (!fileId) return;
      const snapshot = appliedFilters || currentFilters;
      const currentState = {
        filters: snapshot,
        page: currentPage < 1 ? 1 : currentPage,
        scrollY: typeof window !== "undefined" ? window.scrollY || 0 : 0,
        focusFileId: fileId,
        items,
        total,
        selectedTickets: selectedTicketList,
        linkModeSheetId: isLinkMode ? linkSheetId : ""
      };
      if (isLinkMode) {
        if (Date.now() < linkModeSelectionIntentUntilRef.current) return;
        clearPendingDetailOpen();
        linkModePendingOpenTimerRef.current = window.setTimeout(() => {
          linkModePendingOpenTimerRef.current = null;
          if (Date.now() < linkModeSelectionIntentUntilRef.current) return;
          saveCachedState(currentState);
          const query = new URLSearchParams({
            fileId,
            origin: "sheet-link"
          });
          if (linkSheetId) {
            query.set("sheetId", linkSheetId);
          }
          navigateToExpenseUrl(`/Gastos/TicketDetail?${query.toString()}`, {
            askConfirmation: false,
            bypassGuardOnce: true
          });
        }, LINK_MODE_OPEN_DETAIL_DELAY_MS);
        return;
      }
      saveCachedState(currentState);
      navigateToExpenseUrl(`/Gastos/TicketDetail?fileId=${encodeURIComponent(fileId)}`, {
        askConfirmation: true,
        bypassGuardOnce: false
      });
    },
    [
      appliedFilters,
      clearPendingDetailOpen,
      currentPage,
      currentFilters,
      isLinkMode,
      items,
      linkSheetId,
      saveCachedState,
      selectedTicketList,
      total
    ]
  );
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
  const showSummary = !isLinkMode && !showFilters && summaryItems.length > 0;
  (0, import_react6.useEffect)(() => {
    if (!isLinkMode || !linkSheetId) {
      setLinkSheetLocked(false);
      setLinkSheetCheckBusy(false);
      return;
    }
    if (!canProcessLinkMode) {
      setLinkSheetLocked(true);
      setLinkSheetCheckBusy(false);
      return;
    }
    let cancelled = false;
    setLinkSheetCheckBusy(true);
    void (async () => {
      try {
        const response = await fetchExpenseSheetDetail(linkSheetId, {
          suppressPermissionModal: true
        });
        if (cancelled) return;
        const headers = Array.isArray(response?.Items) ? response.Items : [];
        const header = headers[0] || null;
        const statusCode = Number(header?.ExpenseSheetStatus ?? -1);
        const voucher = safeText(header?.Voucher);
        const isLocked = statusCode === EXPENSE_STATUS_APPROVED || statusCode === EXPENSE_STATUS_PAID || !!voucher;
        setLinkSheetLocked(isLocked);
      } catch {
        if (cancelled) return;
        setLinkSheetLocked(true);
      } finally {
        if (!cancelled) {
          setLinkSheetCheckBusy(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [canProcessLinkMode, isLinkMode, linkSheetId]);
  (0, import_react6.useEffect)(() => {
    if (!isLinkMode) return;
    setExpenseNavigationGuard({
      active: true,
      message: linkModeCancelMessage
    });
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [isLinkMode, linkModeCancelMessage]);
  (0, import_react6.useEffect)(() => {
    if (didApplyQueryFilterRef.current) return;
    didApplyQueryFilterRef.current = true;
    if (isLinkMode) return;
    const url = new URL(window.location.href);
    const ticketFileId = safeText(url.searchParams.get("ticketFileId"));
    if (!ticketFileId) return;
    const resolvedManagedUserId = syncManagedUserSelection(defaultManagedUserId);
    const querySnapshot = {
      fromDate: "",
      toDate: "",
      filterKey: ticketFileId,
      currencyCode: "",
      managedUserId: resolvedManagedUserId,
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
  }, [clearCachedState, defaultManagedUserId, isLinkMode, loadList, restoreAppliedFilters, syncManagedUserSelection]);
  (0, import_react6.useEffect)(() => {
    if (didRestoreOnMountRef.current) return;
    didRestoreOnMountRef.current = true;
    if (isLinkMode) {
      const isReturningFromDetail = consumeReturnFlag();
      const cachedState2 = isReturningFromDetail ? readCachedState() : null;
      const cachedSheetId = safeText(cachedState2?.linkModeSheetId);
      if (cachedState2 && cachedSheetId && cachedSheetId === safeText(linkSheetId)) {
        const restoredManagedUserId2 = syncManagedUserSelection(cachedState2.filters.managedUserId);
        const restoredFilters2 = {
          ...cachedState2.filters,
          managedUserId: restoredManagedUserId2
        };
        restoreAppliedFilters(restoredFilters2);
        pendingScrollRestoreRef.current = cachedState2.scrollY;
        pendingFocusFileIdRef.current = cachedState2.focusFileId;
        const restoredSelection = {};
        for (const ticket of cachedState2.selectedTickets) {
          const selectedFileId = safeText(ticket.fileId);
          if (!selectedFileId) continue;
          restoredSelection[selectedFileId] = ticket;
        }
        setSelectedTicketsById(restoredSelection);
        if (cachedState2.items.length > 0 || cachedState2.total > 0) {
          restoreListSnapshot({
            items: cachedState2.items,
            total: cachedState2.total,
            page: cachedState2.page
          });
          return;
        }
        void loadList(cachedState2.page, normalizeLinkModeSnapshotForLoad(restoredFilters2));
        return;
      }
      const initialManagedUserId = syncManagedUserSelection(defaultManagedUserId);
      const linkSnapshot = buildLinkModeInitialSnapshot(initialManagedUserId);
      clearCachedState();
      setSelectedTicketsById({});
      restoreAppliedFilters(linkSnapshot);
      void loadList(1, normalizeLinkModeSnapshotForLoad(linkSnapshot));
      return;
    }
    if (!consumeReturnFlag()) {
      clearCachedState();
      return;
    }
    const cachedState = readCachedState();
    if (!cachedState) {
      clearCachedState();
      return;
    }
    const restoredManagedUserId = syncManagedUserSelection(cachedState.filters.managedUserId);
    const restoredFilters = {
      ...cachedState.filters,
      managedUserId: restoredManagedUserId
    };
    restoreAppliedFilters(restoredFilters);
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
    void loadList(cachedState.page, restoredFilters);
  }, [
    clearCachedState,
    defaultManagedUserId,
    consumeReturnFlag,
    isLinkMode,
    linkSheetId,
    loadList,
    normalizeLinkModeSnapshotForLoad,
    readCachedState,
    restoreAppliedFilters,
    restoreListSnapshot,
    syncManagedUserSelection
  ]);
  (0, import_react6.useEffect)(() => {
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
  (0, import_react6.useEffect)(() => {
    const onToggleFilters = () => {
      const willOpen = !showFilters;
      toggleFilterPanel();
      if (willOpen) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    const onRefresh = () => {
      const snapshot = resolveActiveFilters();
      if (!isLinkMode && (!snapshot?.fromDate || !snapshot?.toDate)) {
        return;
      }
      void loadList(currentPage < 1 ? 1 : currentPage, snapshot);
    };
    window.addEventListener("expense-tickets-toggle-filter", onToggleFilters);
    window.addEventListener("expense-tickets-refresh", onRefresh);
    return () => {
      window.removeEventListener("expense-tickets-toggle-filter", onToggleFilters);
      window.removeEventListener("expense-tickets-refresh", onRefresh);
    };
  }, [currentPage, isLinkMode, loadList, resolveActiveFilters, showFilters, toggleFilterPanel]);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      ConfirmModal,
      {
        open: modal.open,
        title: modal.title,
        message: modal.message,
        confirmText: modalConfirmText,
        cancelText: modalCancelText,
        loadingText: modalLoadingText,
        showCancel: modal.showCancel,
        showConfirm: modal.showConfirm,
        busy: linkFlowBusy,
        error: linkFlowError,
        status: linkFlowStatus,
        onConfirm: handleModalButtonConfirm,
        onCancel: closeConfirm
      }
    ),
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
    !isLinkMode && sourcePickerOpen ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/45 px-4 py-6", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-xl", children: [
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
    !isLinkMode && quickTicketBusy ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/35 px-4", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "glass-panel shadow-card flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-700", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Spinner_default, { size: "h-5 w-5", label: indT("Common_Loading", "Loading") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: quickTicketProgressMessage || indT("Common_Loading", "Loading") })
    ] }) }) : null,
    !isLinkMode && quickTicketErrorMessage ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "glass-panel shadow-card space-y-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800", children: [
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
    showSummary ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "filter-card filter-card--summary p-3 sm:p-4 mt-1 mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "expense-summary-grid grid grid-cols-1 min-[360px]:grid-cols-2 items-start gap-x-4 gap-y-1 text-xs", children: summaryItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
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
      item.key
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
        managedUserId,
        managedUsers,
        showManagedUserFilter,
        statusFilter,
        gastoTypeFilter,
        processedByIaFilter,
        activeQuickFilter,
        showManualDateError,
        statusFilterReadOnly: statusFilterLocked,
        fixedStatusFilter,
        gastoTypeOptions,
        onDateRangeChange,
        onManualRangeComplete,
        onQuickFilterChange,
        onFilterKeyChange: setFilterKey,
        onCurrencyCodeChange: setCurrencyCode,
        onManagedUserIdChange: setManagedUserId,
        onStatusFilterChange: setStatusFilter,
        onGastoTypeFilterChange: setGastoTypeFilter,
        onProcessedByIaFilterChange: setProcessedByIaFilter,
        onClear,
        onApply
      }
    ),
    isLinkMode ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-2 px-0.5", children: [
      !canProcessLinkMode ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-sm text-rose-700", children: indT("Auth_PermissionDenied_Body", "No permission.") }) : null,
      canProcessLinkMode && linkSheetCheckBusy ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-2 text-sm text-slate-700", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Spinner_default, { size: "h-4 w-4", label: indT("Common_Loading", "Loading") }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: indT("Common_Loading", "Loading") })
      ] }) : null,
      canProcessLinkMode && !linkSheetCheckBusy && selectAllBusy ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-2 text-sm text-slate-700", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Spinner_default, { size: "h-4 w-4", label: indT("Common_Loading", "Loading") }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: indT("Common_Loading", "Loading") })
      ] }) : null,
      canProcessLinkMode && !linkSheetCheckBusy && linkSheetLocked ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-sm text-rose-700", children: indT("ExpenseSheets_Detail_PaidReadOnly", "Las hojas de gasto pagadas son de solo lectura.") }) : null,
      canProcessLinkMode && !linkSheetCheckBusy && !linkSheetLocked && selectAllError ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-sm text-rose-700", children: selectAllError }) : null,
      canProcessLinkMode && !linkSheetCheckBusy && !linkSheetLocked ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "grid grid-cols-2 gap-1.5 pt-0.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            type: "button",
            className: "ind-action-btn w-full min-w-0 px-1.5 py-1 text-[10px] leading-tight sm:text-xs",
            onClick: () => {
              void selectAllMatchingTickets();
            },
            disabled: linkFlowBusy || selectAllBusy || total < 1,
            children: indT("ExpenseTickets_LinkMode_SelectAll", "Seleccionar todo")
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            type: "button",
            className: "ind-action-btn w-full min-w-0 px-1.5 py-1 text-[10px] leading-tight sm:text-xs",
            onClick: clearTicketSelection,
            disabled: linkFlowBusy || selectAllBusy || selectedTicketCount < 1,
            children: indT("ExpenseTickets_LinkMode_ClearAll", "Borrar seleccion")
          }
        )
      ] }) }) : null
    ] }) : null,
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
    !errorMessage && items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ref: timelineContainerRef, className: "timeline-box", children: items.map((item) => {
      const fileId = safeText(item.fileId);
      const dateParts = formatExpenseDateParts(item.transDate, document?.documentElement?.lang || "es-ES");
      const title = safeText(item.description) || safeText(item.fileName) || fileId || "-";
      const amountText = formatAmountWithCurrency(item.totalAmount ?? null, safeText(item.currencyCode));
      const statusCode = item.status;
      const statusLabel = getExpenseTicketStatusLabel(statusCode);
      const isAssignedToExpenseSheet = statusCode === 1;
      const showProcessedByAiIcon = item.processedByAI === true;
      const isSelectableInLinkMode = isLinkMode && canSelectTicketForLink(item);
      const isSelectedInLinkMode = isLinkMode && isTicketSelected(fileId);
      const processedByAiLabel = indT("Tickets_Filter_ProcessedByIA", "Processed by IA");
      const gastoTypeCode = item.gastoType === null ? "" : String(item.gastoType);
      const gastoTypeLabel = gastoTypeCode ? gastoTypeLabelMap.get(gastoTypeCode) || gastoTypeCode : indT("Common_NotAvailable", "N/A");
      const cardSubtitle = gastoTypeLabel;
      const baseStatusIcons = isAssignedToExpenseSheet || showProcessedByAiIcon ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
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
      const selectionControl = isLinkMode ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "inline-flex -m-1 h-6 w-6 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "input",
        {
          type: "checkbox",
          checked: isSelectedInLinkMode,
          disabled: !isSelectableInLinkMode || linkFlowBusy || linkSheetCheckBusy || linkSheetLocked,
          className: "h-4 w-4 cursor-pointer accent-primary pointer-events-auto",
          onPointerDown: (event) => {
            event.stopPropagation();
            markLinkModeSelectionIntent();
          },
          onMouseDown: (event) => {
            event.stopPropagation();
            markLinkModeSelectionIntent();
          },
          onClick: (event) => {
            event.stopPropagation();
            markLinkModeSelectionIntent();
          },
          onChange: () => {
            markLinkModeSelectionIntent();
            toggleTicketSelection(item);
          },
          "aria-label": indT("ExpenseTickets_LinkMode_SelectTicket", "Seleccionar ticket")
        }
      ) }) : null;
      const statusIcons = isLinkMode ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
        selectionControl,
        baseStatusIcons
      ] }) : baseStatusIcons;
      const statusIconClassName = isLinkMode ? "expense-ticket-card__status-icons pointer-events-auto" : "expense-ticket-card__status-icons";
      const ticketCardKey = fileId || `${safeText(item.fileName)}-${safeText(item.transDate)}-${safeText(item.description)}-${String(item.totalAmount ?? "")}`;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "div",
        {
          className: isSelectedInLinkMode ? "timeline-item rounded-2xl ring-2 ring-primary/30" : "timeline-item",
          "data-ticket-file-id": fileId || void 0,
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
              statusIconClassName
            }
          )
        },
        ticketCardKey
      );
    }) }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      CompactPagination_default,
      {
        totalPages,
        currentPage,
        loading: isLoading,
        onPageChange: (page) => {
          const snapshot = resolveActiveFilters();
          if (!isLinkMode && (!snapshot?.fromDate || !snapshot?.toDate)) {
            return;
          }
          void loadList(page, snapshot);
        },
        labels: paginationLabels
      }
    ),
    isLinkMode && canProcessLinkMode && !linkSheetCheckBusy && !linkSheetLocked ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(PageBottomActions_default, { ariaLabel: indT("ExpenseTickets_LinkMode_LinkButton", "Vincular ticket(s)"), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      PageBottomActionButton,
      {
        label: indT("ExpenseTickets_LinkMode_LinkButton", "Vincular ticket(s)"),
        onClick: openLinkConfirmModal,
        disabled: linkFlowBusy || selectAllBusy || selectedTicketCount < 1
      }
    ) }) : null,
    canCreateTicket && !isLinkMode ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(VisitasPageProviders_default, { enableExpenseManagement: true, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExpenseTicketsPageContent, {}) });
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL0V4cGVuc2VUaWNrZXRzUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZUxheW91dEVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uLCB7IHR5cGUgRmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbSB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgUGFnZUJvdHRvbUFjdGlvbnMsIHsgUGFnZUJvdHRvbUFjdGlvbkJ1dHRvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUGFnZUJvdHRvbUFjdGlvbnMudHN4XCI7XG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4XCI7XG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCwgdHlwZSBBdXRoTWFuYWdlZFVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcbmltcG9ydCBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbCBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbC50c3hcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlVGlja2V0U3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHsgY3JlYXRlRXhwZW5zZVNoZWV0LCBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCwgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwsIGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlLCBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBY3RpbmdVc2VyLnRzXCI7XG5pbXBvcnQgeyB0b0V4cGVuc2VBcGlEZE1tWXl5eSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsIG5hdmlnYXRlVG9FeHBlbnNlVXJsLCBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyBtYXBXaW5kb3dFbnVtT3B0aW9ucywgdHlwZSBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzLCBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIHNhZmVUZXh0LCBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0RmxvdyB9IGZyb20gXCIuLi9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93LnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0xpc3REYXRhIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0Q3JlYXRlTGluZVJlcXVlc3QgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsIEV4cGVuc2VUaWNrZXRDYXJkIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xuaW1wb3J0IHsgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeSBhcyByZXZlYWxUb3BiYXJBY3Rpb25Hcm91cCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy90b3BiYXJBY3Rpb25WaXNpYmlsaXR5LnRzXCI7XG5cbmNvbnN0IFBBR0VfU0laRSA9IDEwO1xuY29uc3QgQUxMT1dFRF9HQVNUT19UWVBFUyA9IG5ldyBTZXQ8bnVtYmVyPihbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTRdKTtcblxuY29uc3QgR0FTVE9fVFlQRV9MQUJFTF9LRVlTOiBSZWNvcmQ8bnVtYmVyLCB7IGtleTogc3RyaW5nOyBmYWxsYmFjazogc3RyaW5nIH0+ID0ge1xuICAwOiB7IGtleTogXCJFbnVtX05vbmVcIiwgZmFsbGJhY2s6IFwiTm9uZVwiIH0sXG4gIDE6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1BlYWplXCIsIGZhbGxiYWNrOiBcIlBlYWplXCIgfSxcbiAgMjogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfUGFya2luZ1wiLCBmYWxsYmFjazogXCJQYXJraW5nXCIgfSxcbiAgMzogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfS21cIiwgZmFsbGJhY2s6IFwiS21cIiB9LFxuICA0OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9EZXNheXVub1wiLCBmYWxsYmFjazogXCJEZXNheXVub1wiIH0sXG4gIDU6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0NvbWlkYVwiLCBmYWxsYmFjazogXCJDb21pZGFcIiB9LFxuICA2OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9DZW5hXCIsIGZhbGxiYWNrOiBcIkNlbmFcIiB9LFxuICA3OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9Ib3RlbFwiLCBmYWxsYmFjazogXCJIb3RlbFwiIH0sXG4gIDg6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1Zhcmlvc1wiLCBmYWxsYmFjazogXCJWYXJpb3NcIiB9LFxuICAxNDogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfVGF4aVwiLCBmYWxsYmFjazogXCJUYXhpXCIgfSxcbn07XG5cbmNvbnN0IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkVEID0gMjtcbmNvbnN0IEVYUEVOU0VfU1RBVFVTX1BBSUQgPSA0O1xuY29uc3QgTElOS19NT0RFX09QRU5fREVUQUlMX0RFTEFZX01TID0gMjIwO1xuY29uc3QgTElOS19NT0RFX1NFTEVDVElPTl9HVUFSRF9NUyA9IDI4MDtcblxuY29uc3Qgbm9ybWFsaXplVXNlcklkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XG5cbmNvbnN0IGlzU2FtZVVzZXIgPSAobGVmdDogc3RyaW5nLCByaWdodDogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRMZWZ0ID0gbm9ybWFsaXplVXNlcklkKGxlZnQpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRSaWdodCA9IG5vcm1hbGl6ZVVzZXJJZChyaWdodCkudG9VcHBlckNhc2UoKTtcbiAgcmV0dXJuICEhbm9ybWFsaXplZExlZnQgJiYgbm9ybWFsaXplZExlZnQgPT09IG5vcm1hbGl6ZWRSaWdodDtcbn07XG5cbmNvbnN0IGVuc3VyZUN1cnJlbnRVc2VySW5MaXN0ID0gKHVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXSwgY3VycmVudEF4VXNlcklkOiBzdHJpbmcpOiBBdXRoTWFuYWdlZFVzZXJbXSA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50ID0gbm9ybWFsaXplVXNlcklkKGN1cnJlbnRBeFVzZXJJZCk7XG4gIGlmICghbm9ybWFsaXplZEN1cnJlbnQpIHJldHVybiB1c2VycztcbiAgaWYgKHVzZXJzLnNvbWUoKGVudHJ5KSA9PiBpc1NhbWVVc2VyKGVudHJ5LmF4VXNlcklkLCBub3JtYWxpemVkQ3VycmVudCkpKSByZXR1cm4gdXNlcnM7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgY3JtVXNlcklkOiBub3JtYWxpemVkQ3VycmVudCxcbiAgICAgIGF4VXNlcklkOiBub3JtYWxpemVkQ3VycmVudCxcbiAgICAgIG5hbWU6IG5vcm1hbGl6ZWRDdXJyZW50LFxuICAgIH0sXG4gICAgLi4udXNlcnMsXG4gIF07XG59O1xuXG5jb25zdCByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24gPSAocmVxdWVzdGVkVXNlcklkOiBzdHJpbmcsIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nLCB1c2VyczogQXV0aE1hbmFnZWRVc2VyW10pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkUmVxdWVzdGVkID0gbm9ybWFsaXplVXNlcklkKHJlcXVlc3RlZFVzZXJJZCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50ID0gbm9ybWFsaXplVXNlcklkKGN1cnJlbnRBeFVzZXJJZCk7XG4gIGlmIChub3JtYWxpemVkUmVxdWVzdGVkKSB7XG4gICAgY29uc3QgZm91bmQgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZFJlcXVlc3RlZCkpO1xuICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kLmF4VXNlcklkO1xuICB9XG4gIGlmIChub3JtYWxpemVkQ3VycmVudCkge1xuICAgIGNvbnN0IHNlbGYgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZEN1cnJlbnQpKTtcbiAgICByZXR1cm4gc2VsZj8uYXhVc2VySWQgfHwgbm9ybWFsaXplZEN1cnJlbnQ7XG4gIH1cbiAgcmV0dXJuIFwiXCI7XG59O1xuXG5jb25zdCBidWlsZExpbmtNb2RlSW5pdGlhbFNuYXBzaG90ID0gKG1hbmFnZWRVc2VySWQgPSBcIlwiKTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9PiB7XG4gIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcbiAgY29uc3QgZnJvbURhdGUgPSBuZXcgRGF0ZSh0b2RheSk7XG4gIC8vIEtlZXAgYXV0b21hdGljIGxpbmstbW9kZSBsb2FkIGJvdW5kZWQgdG8gYXZvaWQgaGVhdnkgdXBzdHJlYW0gc2NhbnMuXG4gIGZyb21EYXRlLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMjkpO1xuXG4gIHJldHVybiB7XG4gICAgZnJvbURhdGU6IHRvSXNvRGF0ZShmcm9tRGF0ZSksXG4gICAgdG9EYXRlOiB0b0lzb0RhdGUodG9kYXkpLFxuICAgIGZpbHRlcktleTogXCJcIixcbiAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXG4gICAgbWFuYWdlZFVzZXJJZDogbm9ybWFsaXplVXNlcklkKG1hbmFnZWRVc2VySWQpLFxuICAgIHN0YXR1c0ZpbHRlcjogMCxcbiAgICBnYXN0b1R5cGVGaWx0ZXI6IFwiXCIsXG4gICAgcHJvY2Vzc2VkQnlJYUZpbHRlcjogXCJhbGxcIixcbiAgfTtcbn07XG5cbi8vIFZhbGlkYXRlcyB3aGV0aGVyIG9uZSB0aWNrZXQgY2FyZCBjYW4gYmUgbGlua2VkIHRvIGFuIGV4cGVuc2Ugc2hlZXQgbGluZS5cbmNvbnN0IGNhblNlbGVjdFRpY2tldEZvckxpbmsgPSAoaXRlbTogRXhwZW5zZVRpY2tldENhcmQpOiBib29sZWFuID0+IHtcbiAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQoaXRlbS5maWxlSWQpO1xuICBpZiAoIWZpbGVJZCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoaXRlbS5zdGF0dXMgIT09IDApIHJldHVybiBmYWxzZTtcblxuICBjb25zdCB0b3RhbEFtb3VudCA9IE51bWJlcihpdGVtLnRvdGFsQW1vdW50ID8/IDApO1xuICBpZiAoISh0b3RhbEFtb3VudCA+IDApKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgZ2FzdG9UeXBlID0gTnVtYmVyKGl0ZW0uZ2FzdG9UeXBlKTtcbiAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIoZ2FzdG9UeXBlKSAmJiBnYXN0b1R5cGUgPiAwO1xufTtcblxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxuY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXG4gIH0pO1xufTtcblxuY29uc3QgYnVpbGRGYWxsYmFja0dhc3RvVHlwZU9wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKEdBU1RPX1RZUEVfTEFCRUxfS0VZUylcbiAgICAubWFwKChbY29kZSwgY2ZnXSkgPT4gKHtcbiAgICAgIHZhbHVlOiBTdHJpbmcoY29kZSksXG4gICAgICB0ZXh0OiBpbmRUKGNmZy5rZXksIGNmZy5mYWxsYmFjayksXG4gICAgfSkpXG4gICAgLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiBOdW1iZXIobGVmdC52YWx1ZSkgLSBOdW1iZXIocmlnaHQudmFsdWUpKTtcbn07XG5cbmNvbnN0IE5ld1RpY2tldEljb24gPSAoKSA9PiAoXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwiaC02IHctNlwiPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTEwIDIwaC01YTIgMiAwIDAgMSAtMiAtMnYtOWEyIDIgMCAwIDEgMiAtMmgxYTIgMiAwIDAgMCAyIC0yYTEgMSAwIDAgMSAxIC0xaDZhMSAxIDAgMCAxIDEgMWEyIDIgMCAwIDAgMiAyaDFhMiAyIDAgMCAxIDIgMnYyXCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNC4zNjIgMTEuMTVhMyAzIDAgMSAwIC00LjE0NCA0LjI2M1wiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMjF2LTRhMiAyIDAgMSAxIDQgMHY0XCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAxOWg0XCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0yMSAxNXY2XCIgLz5cbiAgPC9zdmc+XG4pO1xuXG5jb25zdCBFeHBlbnNlVGlja2V0c1BhZ2VDb250ZW50ID0gKCkgPT4ge1xuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIlZpZXdcIik7XG4gIGNvbnN0IGNhbkNyZWF0ZVRpY2tldCA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiQWRkXCIpO1xuICBjb25zdCBjYW5MaW5rU2hlZXRMaW5lcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiQWRkXCIpO1xuICBjb25zdCB7XG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIHN1Ym9yZGluYXRlcyxcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICAgIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcbiAgfSA9IHVzZUF1dGhDb250ZXh0KCk7XG4gIGNvbnN0IHRpbWVsaW5lQ29udGFpbmVyUmVmID0gUmVhY3QudXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGNhbWVyYUlucHV0UmVmID0gUmVhY3QudXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgZ2FsbGVyeUlucHV0UmVmID0gUmVhY3QudXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgZGlkUmVzdG9yZU9uTW91bnRSZWYgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xuICBjb25zdCBkaWRBcHBseVF1ZXJ5RmlsdGVyUmVmID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYgPSBSZWFjdC51c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHBlbmRpbmdGb2N1c0ZpbGVJZFJlZiA9IFJlYWN0LnVzZVJlZihcIlwiKTtcbiAgY29uc3QgbGlua01vZGVTZWxlY3Rpb25JbnRlbnRVbnRpbFJlZiA9IFJlYWN0LnVzZVJlZigwKTtcbiAgY29uc3QgbGlua01vZGVQZW5kaW5nT3BlblRpbWVyUmVmID0gUmVhY3QudXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IGxpbmtNb2RlQ29udGV4dCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIGNvbnN0IGFjdGlvbiA9IHNhZmVUZXh0KHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwiYWN0aW9uXCIpKS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGhvamFHYXN0b3NJZCA9IHNhZmVUZXh0KHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwiaG9qYUdhc3Rvc0lkXCIpKTtcbiAgICBjb25zdCBpc0xpbmtNb2RlID0gYWN0aW9uID09PSBcImxpbmtcIiAmJiAhIWhvamFHYXN0b3NJZDtcbiAgICByZXR1cm4ge1xuICAgICAgaXNMaW5rTW9kZSxcbiAgICAgIHNoZWV0SWQ6IGhvamFHYXN0b3NJZCxcbiAgICAgIGZpeGVkU3RhdHVzRmlsdGVyOiBpc0xpbmtNb2RlID8gKDAgYXMgY29uc3QpIDogbnVsbCxcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaXNMaW5rTW9kZSA9IGxpbmtNb2RlQ29udGV4dC5pc0xpbmtNb2RlO1xuICBjb25zdCBsaW5rU2hlZXRJZCA9IGxpbmtNb2RlQ29udGV4dC5zaGVldElkO1xuICBjb25zdCBmaXhlZFN0YXR1c0ZpbHRlciA9IGxpbmtNb2RlQ29udGV4dC5maXhlZFN0YXR1c0ZpbHRlcjtcbiAgY29uc3QgY2FuUHJvY2Vzc0xpbmtNb2RlID0gIWlzTGlua01vZGUgfHwgY2FuTGlua1NoZWV0TGluZXM7XG4gIGNvbnN0IG1hbmFnZWRVc2VycyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gZW5zdXJlQ3VycmVudFVzZXJJbkxpc3QoQXJyYXkuaXNBcnJheShzdWJvcmRpbmF0ZXMpID8gc3Vib3JkaW5hdGVzIDogW10sIGN1cnJlbnRBeFVzZXJJZCksXG4gICAgW2N1cnJlbnRBeFVzZXJJZCwgc3Vib3JkaW5hdGVzXVxuICApO1xuICBjb25zdCBkZWZhdWx0TWFuYWdlZFVzZXJJZCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uKGN1cnJlbnRBeFVzZXJJZCwgY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnMpLFxuICAgIFtjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vyc11cbiAgKTtcbiAgY29uc3Qgc2hvd01hbmFnZWRVc2VyRmlsdGVyID0gaXNMaW5rTW9kZSAmJiBjYW5NYW5hZ2VPdGhlclVzZXJzO1xuXG4gIC8vIEtlZXBzIGxpbmstbW9kZSBsaXN0IHF1ZXJpZXMgYm91bmRlZCBldmVuIHdoZW4gVUkgZmlsdGVycyBhcmUgY2xlYXJlZC5cbiAgY29uc3Qgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQgPSB1c2VDYWxsYmFjayhcbiAgICAoc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0+IHtcbiAgICAgIGlmICghaXNMaW5rTW9kZSkgcmV0dXJuIHNuYXBzaG90O1xuXG4gICAgICBjb25zdCBmYWxsYmFjayA9IGJ1aWxkTGlua01vZGVJbml0aWFsU25hcHNob3Qoc25hcHNob3QubWFuYWdlZFVzZXJJZCk7XG4gICAgICBjb25zdCBub3JtYWxpemVkRnJvbURhdGUgPSBzYWZlVGV4dChzbmFwc2hvdC5mcm9tRGF0ZSkgfHwgZmFsbGJhY2suZnJvbURhdGU7XG4gICAgICBjb25zdCBub3JtYWxpemVkVG9EYXRlID0gc2FmZVRleHQoc25hcHNob3QudG9EYXRlKSB8fCBmYWxsYmFjay50b0RhdGU7XG4gICAgICBjb25zdCBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCA9IG5vcm1hbGl6ZVVzZXJJZChzbmFwc2hvdC5tYW5hZ2VkVXNlcklkKSB8fCBmYWxsYmFjay5tYW5hZ2VkVXNlcklkO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zbmFwc2hvdCxcbiAgICAgICAgZnJvbURhdGU6IG5vcm1hbGl6ZWRGcm9tRGF0ZSxcbiAgICAgICAgdG9EYXRlOiBub3JtYWxpemVkVG9EYXRlLFxuICAgICAgICBtYW5hZ2VkVXNlcklkOiBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCxcbiAgICAgICAgc3RhdHVzRmlsdGVyOiAwLFxuICAgICAgfTtcbiAgICB9LFxuICAgIFtpc0xpbmtNb2RlXVxuICApO1xuXG4gIGNvbnN0IFtsaW5rU2hlZXRMb2NrZWQsIHNldExpbmtTaGVldExvY2tlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsaW5rU2hlZXRDaGVja0J1c3ksIHNldExpbmtTaGVldENoZWNrQnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsaW5rRmxvd0J1c3ksIHNldExpbmtGbG93QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsaW5rRmxvd1N0YXR1cywgc2V0TGlua0Zsb3dTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtsaW5rRmxvd0Vycm9yLCBzZXRMaW5rRmxvd0Vycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbc2VsZWN0QWxsQnVzeSwgc2V0U2VsZWN0QWxsQnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzZWxlY3RBbGxFcnJvciwgc2V0U2VsZWN0QWxsRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtzZWxlY3RlZFRpY2tldHNCeUlkLCBzZXRTZWxlY3RlZFRpY2tldHNCeUlkXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIEV4cGVuc2VUaWNrZXRDYXJkPj4oe30pO1xuXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxuICAgICgpID0+ICh7XG4gICAgICBmaXJzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9GaXJzdFwiLCBcIkZpcnN0XCIpLFxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXG4gICAgICBuZXh0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpLFxuICAgICAgbGFzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKSxcbiAgICB9KSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxuICB9KTtcblxuICBjb25zdCBnYXN0b1R5cGVPcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KCgpID0+IHtcbiAgICBjb25zdCBzb3VyY2UgPSBBcnJheS5pc0FycmF5KHdpbmRvdy5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXykgPyB3aW5kb3cuX19FWFBFTlNFX0dBU1RPX1RZUEVTX18gOiBbXTtcbiAgICBjb25zdCBtYXBwZWQgPSBtYXBXaW5kb3dFbnVtT3B0aW9ucyhzb3VyY2UpLmZpbHRlcigoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IE51bWJlcihlbnRyeS52YWx1ZSk7XG4gICAgICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpICYmIEFMTE9XRURfR0FTVE9fVFlQRVMuaGFzKHBhcnNlZCk7XG4gICAgfSk7XG5cbiAgICBpZiAobWFwcGVkLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBtYXBwZWQuc29ydCgobGVmdCwgcmlnaHQpID0+IE51bWJlcihsZWZ0LnZhbHVlKSAtIE51bWJlcihyaWdodC52YWx1ZSkpO1xuICAgIH1cblxuICAgIHJldHVybiBidWlsZEZhbGxiYWNrR2FzdG9UeXBlT3B0aW9ucygpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgZ2FzdG9UeXBlTGFiZWxNYXAgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIGdhc3RvVHlwZU9wdGlvbnMpIHtcbiAgICAgIG1hcC5zZXQoU3RyaW5nKG9wdGlvbi52YWx1ZSksIG9wdGlvbi50ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIG1hcDtcbiAgfSwgW2dhc3RvVHlwZU9wdGlvbnNdKTtcblxuICBjb25zdCB7XG4gICAgaXRlbXMsXG4gICAgdG90YWwsXG4gICAgY3VycmVudFBhZ2UsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBsb2FkTGlzdCxcbiAgICBsb2FkQWxsTWF0Y2hpbmdUaWNrZXRzLFxuICAgIHJlc3RvcmVMaXN0U25hcHNob3QsXG4gICAgcmVzZXRMaXN0LFxuICB9ID0gdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YSh7XG4gICAgaGFzQWNjZXNzLFxuICAgIHBhZ2VTaXplOiBQQUdFX1NJWkUsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgY29uc3VtZVJldHVybkZsYWcsIHNhdmVDYWNoZWRTdGF0ZSwgY2xlYXJDYWNoZWRTdGF0ZSB9ID0gdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZSgpO1xuICBjb25zdCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24gPSB1c2VDYWxsYmFjayhcbiAgICAocmVxdWVzdGVkVXNlcklkOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgICAgY29uc3QgcmVzb2x2ZWRVc2VySWQgPSByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24ocmVxdWVzdGVkVXNlcklkLCBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vycyk7XG4gICAgICBzZXRTZWxlY3RlZE1hbmFnZWRVc2VySWQocmVzb2x2ZWRVc2VySWQpO1xuICAgICAgaWYgKCFyZXNvbHZlZFVzZXJJZCB8fCAoY3VycmVudEF4VXNlcklkICYmIGlzU2FtZVVzZXIocmVzb2x2ZWRVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCkpKSB7XG4gICAgICAgIGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZShyZXNvbHZlZFVzZXJJZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzb2x2ZWRVc2VySWQ7XG4gICAgfSxcbiAgICBbY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnMsIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZF1cbiAgKTtcblxuICBjb25zdCB7XG4gICAgZnJvbURhdGUsXG4gICAgdG9EYXRlLFxuICAgIGZpbHRlcktleSxcbiAgICBjdXJyZW5jeUNvZGUsXG4gICAgbWFuYWdlZFVzZXJJZCxcbiAgICBzdGF0dXNGaWx0ZXIsXG4gICAgZ2FzdG9UeXBlRmlsdGVyLFxuICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVFcnJvcixcbiAgICBtYW51YWxEYXRlQXV0b09wZW5LZXksXG4gICAgYXBwbGllZEZpbHRlcnMsXG4gICAgc2hvd0ZpbHRlcnMsXG4gICAgY3VycmVudEZpbHRlcnMsXG4gICAgc2V0RmlsdGVyS2V5LFxuICAgIHNldEN1cnJlbmN5Q29kZSxcbiAgICBzZXRNYW5hZ2VkVXNlcklkLFxuICAgIHNldFN0YXR1c0ZpbHRlcixcbiAgICBzZXRHYXN0b1R5cGVGaWx0ZXIsXG4gICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgICBvbkFwcGx5LFxuICAgIG9uQ2xlYXIsXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlLFxuICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcbiAgICBvblF1aWNrRmlsdGVyQ2hhbmdlLFxuICAgIHRvZ2dsZUZpbHRlclBhbmVsLFxuICAgIHN0YXR1c0ZpbHRlckxvY2tlZCxcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlKHtcbiAgICBkZWZhdWx0TWFuYWdlZFVzZXJJZCxcbiAgICBmaXhlZFN0YXR1c0ZpbHRlcixcbiAgICBhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5OiBpc0xpbmtNb2RlLFxuICAgIG9uQXBwbHlGaWx0ZXJzOiAoc25hcHNob3QpID0+IHtcbiAgICAgIGNvbnN0IHJlc29sdmVkTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihzbmFwc2hvdC5tYW5hZ2VkVXNlcklkKTtcbiAgICAgIHZvaWQgbG9hZExpc3QoXG4gICAgICAgIDEsXG4gICAgICAgIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKHtcbiAgICAgICAgICAuLi5zbmFwc2hvdCxcbiAgICAgICAgICBtYW5hZ2VkVXNlcklkOiByZXNvbHZlZE1hbmFnZWRVc2VySWQsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0sXG4gICAgb25DbGVhckZpbHRlcnM6ICgpID0+IHtcbiAgICAgIGNvbnN0IHJlc2V0TWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihjdXJyZW50QXhVc2VySWQpO1xuICAgICAgc2V0TWFuYWdlZFVzZXJJZChyZXNldE1hbmFnZWRVc2VySWQpO1xuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuICAgICAgcmVzZXRMaXN0KCk7XG4gICAgfSxcbiAgfSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQgPSBub3JtYWxpemVVc2VySWQoZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICAgIGlmICghbm9ybWFsaXplZERlZmF1bHRNYW5hZ2VkVXNlcklkKSByZXR1cm47XG4gICAgc2V0TWFuYWdlZFVzZXJJZChub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICAgIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICB9LCBbZGVmYXVsdE1hbmFnZWRVc2VySWQsIHNldE1hbmFnZWRVc2VySWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGNhbk1hbmFnZU90aGVyVXNlcnMpIHJldHVybjtcbiAgICBjb25zdCBmYWxsYmFja01hbmFnZWRVc2VySWQgPSByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24oY3VycmVudEF4VXNlcklkLCBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vycyk7XG4gICAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnRNYW5hZ2VkVXNlcklkID0gbm9ybWFsaXplVXNlcklkKG1hbmFnZWRVc2VySWQpO1xuICAgIGlmIChpc1NhbWVVc2VyKG5vcm1hbGl6ZWRDdXJyZW50TWFuYWdlZFVzZXJJZCwgZmFsbGJhY2tNYW5hZ2VkVXNlcklkKSkgcmV0dXJuO1xuICAgIGlmICghbm9ybWFsaXplZEN1cnJlbnRNYW5hZ2VkVXNlcklkICYmICFmYWxsYmFja01hbmFnZWRVc2VySWQpIHJldHVybjtcblxuICAgIHNldE1hbmFnZWRVc2VySWQoZmFsbGJhY2tNYW5hZ2VkVXNlcklkKTtcbiAgICBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oZmFsbGJhY2tNYW5hZ2VkVXNlcklkKTtcbiAgfSwgW2Nhbk1hbmFnZU90aGVyVXNlcnMsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJJZCwgbWFuYWdlZFVzZXJzLCBzZXRNYW5hZ2VkVXNlcklkLCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb25dKTtcblxuICBjb25zdCB7XG4gICAgc291cmNlUGlja2VyT3BlbixcbiAgICBidXN5OiBxdWlja1RpY2tldEJ1c3ksXG4gICAgcHJvZ3Jlc3NNZXNzYWdlOiBxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSxcbiAgICBlcnJvck1lc3NhZ2U6IHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlLFxuICAgIGhhc1BlbmRpbmdVcGxvYWRSZXRyeSxcbiAgICB0cmFjZUxpc3Q6IHF1aWNrVGlja2V0VHJhY2VMaXN0LFxuICAgIG9wZW5Tb3VyY2VQaWNrZXIsXG4gICAgY2xvc2VTb3VyY2VQaWNrZXIsXG4gICAgc2VsZWN0RnJvbUNhbWVyYSxcbiAgICBzZWxlY3RGcm9tR2FsbGVyeSxcbiAgICBoYW5kbGVTZWxlY3RlZEZpbGUsXG4gICAgcmV0cnlQZW5kaW5nVXBsb2FkLFxuICAgIGNsZWFyRXJyb3I6IGNsZWFyUXVpY2tUaWNrZXRFcnJvcixcbiAgfSA9IHVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdyh7XG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogIWlzTGlua01vZGUgJiYgY2FuQ3JlYXRlVGlja2V0LFxuICAgIGlzQ3JlYXRlTW9kZTogZmFsc2UsXG4gICAgaXNTaGVldExvY2tlZDogZmFsc2UsXG4gICAgbGlua1RvU2hlZXQ6IGZhbHNlLFxuICAgIGF4VXNlcklkT3ZlcnJpZGU6IHNhZmVUZXh0KGN1cnJlbnRBeFVzZXJJZCksXG4gICAgY3VycmVuY3lDb2RlOiBjdXJyZW5jeUNvZGUgfHwgXCJFVVJcIixcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcbiAgICBvbkNvbXBsZXRlZDogKHJlc3VsdCkgPT4ge1xuICAgICAgY29uc3QgY3JlYXRlZEZpbGVJZCA9IHNhZmVUZXh0KHJlc3VsdD8uZmlsZUlkKTtcbiAgICAgIGlmICghY3JlYXRlZEZpbGVJZCkgcmV0dXJuO1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsP2ZpbGVJZD0ke2VuY29kZVVSSUNvbXBvbmVudChjcmVhdGVkRmlsZUlkKX0mbW9kZT1lZGl0YCwge1xuICAgICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSxcbiAgfSk7XG5cbiAgY29uc3QgZmFiTWVudUl0ZW1zID0gdXNlTWVtbzxGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW10+KFxuICAgICgpID0+XG4gICAgICBpc0xpbmtNb2RlXG4gICAgICAgID8gW11cbiAgICAgICAgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiBcIm5ldy10aWNrZXRcIixcbiAgICAgICAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9OZXdUaWNrZXRcIiwgXCJOdWV2byBUaWNrZXRcIiksXG4gICAgICAgICAgICAgIGljb246IDxOZXdUaWNrZXRJY29uIC8+LFxuICAgICAgICAgICAgICBvbkNsaWNrOiBvcGVuU291cmNlUGlja2VyLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgIFtpc0xpbmtNb2RlLCBvcGVuU291cmNlUGlja2VyXVxuICApO1xuXG4gIGNvbnN0IHNlbGVjdGVkVGlja2V0TGlzdCA9IHVzZU1lbW8oKCkgPT4gT2JqZWN0LnZhbHVlcyhzZWxlY3RlZFRpY2tldHNCeUlkKSwgW3NlbGVjdGVkVGlja2V0c0J5SWRdKTtcbiAgY29uc3Qgc2VsZWN0ZWRUaWNrZXRDb3VudCA9IHNlbGVjdGVkVGlja2V0TGlzdC5sZW5ndGg7XG4gIGNvbnN0IHNlbGVjdGVkVG90YWxBbW91bnQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gc2VsZWN0ZWRUaWNrZXRMaXN0LnJlZHVjZSgoc3VtLCBpdGVtKSA9PiB7XG4gICAgICBjb25zdCBhbW91bnQgPSBOdW1iZXIoaXRlbS50b3RhbEFtb3VudCA/PyAwKTtcbiAgICAgIHJldHVybiBhbW91bnQgPiAwID8gc3VtICsgYW1vdW50IDogc3VtO1xuICAgIH0sIDApO1xuICB9LCBbc2VsZWN0ZWRUaWNrZXRMaXN0XSk7XG4gIGNvbnN0IHNlbGVjdGVkVG90YWxBbW91bnRUZXh0ID0gdXNlTWVtbygoKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koc2VsZWN0ZWRUb3RhbEFtb3VudCwgXCJcIiksIFtzZWxlY3RlZFRvdGFsQW1vdW50XSk7XG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgcmV2ZWFsVG9wYmFyQWN0aW9uR3JvdXAoXCJleHBlbnNlLXRpY2tldHMtbGlzdC1hY3Rpb25zXCIpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgbGlua01vZGVDYW5jZWxNZXNzYWdlID0gdXNlTWVtbyhcbiAgICAoKSA9PlxuICAgICAgaW5kVChcbiAgICAgICAgXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9DYW5jZWxDb25maXJtXCIsXG4gICAgICAgIFwiU2UgY2FuY2VsYXJhIGVsIHByb2Nlc28gZGUgdmluY3VsYWNpb24geSB2b2x2ZXJhcyBhIGxhIGhvamEgZGUgZ2FzdG9zLiBRdWllcmVzIGNvbnRpbnVhcj9cIlxuICAgICAgKSxcbiAgICBbXVxuICApO1xuICBjb25zdCBtYXJrTGlua01vZGVTZWxlY3Rpb25JbnRlbnQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgbGlua01vZGVTZWxlY3Rpb25JbnRlbnRVbnRpbFJlZi5jdXJyZW50ID0gRGF0ZS5ub3coKSArIExJTktfTU9ERV9TRUxFQ1RJT05fR1VBUkRfTVM7XG4gICAgaWYgKGxpbmtNb2RlUGVuZGluZ09wZW5UaW1lclJlZi5jdXJyZW50ICE9IG51bGwpIHtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQobGlua01vZGVQZW5kaW5nT3BlblRpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgbGlua01vZGVQZW5kaW5nT3BlblRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNsZWFyUGVuZGluZ0RldGFpbE9wZW4gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGxpbmtNb2RlUGVuZGluZ09wZW5UaW1lclJlZi5jdXJyZW50ICE9IG51bGwpIHtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQobGlua01vZGVQZW5kaW5nT3BlblRpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgbGlua01vZGVQZW5kaW5nT3BlblRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IHNldEZpbHRlcmVkU2VsZWN0ZWRUaWNrZXRzID0gdXNlQ2FsbGJhY2soKHByZWRpY2F0ZTogKGVudHJ5OiBFeHBlbnNlVGlja2V0Q2FyZCkgPT4gYm9vbGVhbikgPT4ge1xuICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQoKHByZXZpb3VzKSA9PiB7XG4gICAgICBjb25zdCBuZXh0OiBSZWNvcmQ8c3RyaW5nLCBFeHBlbnNlVGlja2V0Q2FyZD4gPSB7fTtcbiAgICAgIGZvciAoY29uc3QgW2ZpbGVJZCwgaXRlbV0gb2YgT2JqZWN0LmVudHJpZXMocHJldmlvdXMpKSB7XG4gICAgICAgIGlmIChwcmVkaWNhdGUoaXRlbSkpIHtcbiAgICAgICAgICBuZXh0W2ZpbGVJZF0gPSBpdGVtO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGlzVGlja2V0U2VsZWN0ZWQgPSB1c2VDYWxsYmFjayhcbiAgICAoZmlsZUlkOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHNhZmVGaWxlSWQgPSBzYWZlVGV4dChmaWxlSWQpO1xuICAgICAgcmV0dXJuICEhc2FmZUZpbGVJZCAmJiAhIXNlbGVjdGVkVGlja2V0c0J5SWRbc2FmZUZpbGVJZF07XG4gICAgfSxcbiAgICBbc2VsZWN0ZWRUaWNrZXRzQnlJZF1cbiAgKTtcblxuICBjb25zdCB0b2dnbGVUaWNrZXRTZWxlY3Rpb24gPSB1c2VDYWxsYmFjayhcbiAgICAodGlja2V0OiBFeHBlbnNlVGlja2V0Q2FyZCkgPT4ge1xuICAgICAgaWYgKCFpc0xpbmtNb2RlIHx8ICFjYW5Qcm9jZXNzTGlua01vZGUgfHwgbGlua1NoZWV0Q2hlY2tCdXN5IHx8IGxpbmtTaGVldExvY2tlZCB8fCBsaW5rRmxvd0J1c3kpIHJldHVybjtcblxuICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQodGlja2V0LmZpbGVJZCk7XG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xuICAgICAgaWYgKCFjYW5TZWxlY3RUaWNrZXRGb3JMaW5rKHRpY2tldCkpIHJldHVybjtcblxuICAgICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZCgocHJldmlvdXMpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldmlvdXMgfTtcbiAgICAgICAgaWYgKG5leHRbZmlsZUlkXSkge1xuICAgICAgICAgIGRlbGV0ZSBuZXh0W2ZpbGVJZF07XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dFtmaWxlSWRdID0gdGlja2V0O1xuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW2NhblByb2Nlc3NMaW5rTW9kZSwgaXNMaW5rTW9kZSwgbGlua0Zsb3dCdXN5LCBsaW5rU2hlZXRDaGVja0J1c3ksIGxpbmtTaGVldExvY2tlZF1cbiAgKTtcblxuICBjb25zdCBjbGVhclRpY2tldFNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRTZWxlY3RBbGxFcnJvcihcIlwiKTtcbiAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKHt9KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHJlc29sdmVBY3RpdmVGaWx0ZXJzID0gdXNlQ2FsbGJhY2soKCk6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgPT4ge1xuICAgIGNvbnN0IGJhc2VTbmFwc2hvdCA9IGFwcGxpZWRGaWx0ZXJzIHx8IGN1cnJlbnRGaWx0ZXJzO1xuICAgIGNvbnN0IHJlc29sdmVkTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihiYXNlU25hcHNob3QubWFuYWdlZFVzZXJJZCk7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKHtcbiAgICAgIC4uLmJhc2VTbmFwc2hvdCxcbiAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc29sdmVkTWFuYWdlZFVzZXJJZCxcbiAgICB9KTtcbiAgfSwgW2FwcGxpZWRGaWx0ZXJzLCBjdXJyZW50RmlsdGVycywgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xuXG4gIC8vIFNlbGVjdHMgZXZlcnkgdGlja2V0IHRoYXQgbWF0Y2hlcyB0aGUgYWN0aXZlIGZpbHRlcnMsIG5vdCBvbmx5IHRoZSB2aXNpYmxlIHBhZ2UuXG4gIGNvbnN0IHNlbGVjdEFsbE1hdGNoaW5nVGlja2V0cyA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoIWlzTGlua01vZGUgfHwgIWNhblByb2Nlc3NMaW5rTW9kZSB8fCBsaW5rU2hlZXRDaGVja0J1c3kgfHwgbGlua1NoZWV0TG9ja2VkIHx8IGxpbmtGbG93QnVzeSB8fCBzZWxlY3RBbGxCdXN5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0U2VsZWN0QWxsQnVzeSh0cnVlKTtcbiAgICBzZXRTZWxlY3RBbGxFcnJvcihcIlwiKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBhY3RpdmVGaWx0ZXJzID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnMoKTtcbiAgICAgIGNvbnN0IHJlcXVlc3RBeFVzZXJJZCA9IHNhZmVUZXh0KGFjdGl2ZUZpbHRlcnMubWFuYWdlZFVzZXJJZCB8fCBjdXJyZW50QXhVc2VySWQpO1xuICAgICAgY29uc3QgYWxsTWF0Y2hpbmdUaWNrZXRzID0gYXdhaXQgbG9hZEFsbE1hdGNoaW5nVGlja2V0cyhhY3RpdmVGaWx0ZXJzLCByZXF1ZXN0QXhVc2VySWQpO1xuXG4gICAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKChwcmV2aW91cykgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2aW91cyB9O1xuICAgICAgICBmb3IgKGNvbnN0IHRpY2tldCBvZiBhbGxNYXRjaGluZ1RpY2tldHMpIHtcbiAgICAgICAgICBpZiAoIWNhblNlbGVjdFRpY2tldEZvckxpbmsodGlja2V0KSkgY29udGludWU7XG4gICAgICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQodGlja2V0LmZpbGVJZCk7XG4gICAgICAgICAgaWYgKCFmaWxlSWQpIGNvbnRpbnVlO1xuICAgICAgICAgIG5leHRbZmlsZUlkXSA9IHRpY2tldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiVGlja2V0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXRzLlwiKTtcbiAgICAgIHNldFNlbGVjdEFsbEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRTZWxlY3RBbGxCdXN5KGZhbHNlKTtcbiAgICB9XG4gIH0sIFtcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIGlzTGlua01vZGUsXG4gICAgbGlua0Zsb3dCdXN5LFxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcbiAgICBsaW5rU2hlZXRMb2NrZWQsXG4gICAgbG9hZEFsbE1hdGNoaW5nVGlja2V0cyxcbiAgICByZXNvbHZlQWN0aXZlRmlsdGVycyxcbiAgICBzZWxlY3RBbGxCdXN5LFxuICBdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhclBlbmRpbmdEZXRhaWxPcGVuKCk7XG4gICAgfTtcbiAgfSwgW2NsZWFyUGVuZGluZ0RldGFpbE9wZW5dKTtcblxuICAvLyBLZWVwcyBzZWxlY3RlZCBjYXJkIG1ldGFkYXRhIGZyZXNoIHdpdGggdGhlIGxhdGVzdCBsaXN0IHBheWxvYWQuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc0xpbmtNb2RlIHx8IGl0ZW1zLmxlbmd0aCA8IDEpIHJldHVybjtcbiAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKChwcmV2aW91cykgPT4ge1xuICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXZpb3VzIH07XG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQoaXRlbS5maWxlSWQpO1xuICAgICAgICBpZiAoIWZpbGVJZCB8fCAhbmV4dFtmaWxlSWRdKSBjb250aW51ZTtcbiAgICAgICAgbmV4dFtmaWxlSWRdID0gaXRlbTtcbiAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2hhbmdlZCA/IG5leHQgOiBwcmV2aW91cztcbiAgICB9KTtcbiAgfSwgW2lzTGlua01vZGUsIGl0ZW1zXSk7XG5cbiAgY29uc3QgYnVpbGRFeHBlbnNlTGluZUZyb21UaWNrZXQgPSB1c2VDYWxsYmFjayhcbiAgICAodGlja2V0OiBFeHBlbnNlVGlja2V0Q2FyZCk6IEV4cGVuc2VTaGVldENyZWF0ZUxpbmVSZXF1ZXN0IHwgbnVsbCA9PiB7XG4gICAgICBpZiAoIWNhblNlbGVjdFRpY2tldEZvckxpbmsodGlja2V0KSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KHRpY2tldC5maWxlSWQpO1xuICAgICAgY29uc3QgdHlwZVZhbHVlID0gTnVtYmVyKHRpY2tldC5nYXN0b1R5cGUpO1xuICAgICAgY29uc3QgcHJpY2UgPSBOdW1iZXIodGlja2V0LnRvdGFsQW1vdW50ID8/IDApO1xuICAgICAgY29uc3QgdHJhbnNEYXRlID0gdG9FeHBlbnNlQXBpRGRNbVl5eXkodGlja2V0LnRyYW5zRGF0ZSkgfHwgdG9FeHBlbnNlQXBpRGRNbVl5eXkobmV3IERhdGUoKSk7XG4gICAgICBpZiAoIWZpbGVJZCB8fCAhTnVtYmVyLmlzSW50ZWdlcih0eXBlVmFsdWUpIHx8IHR5cGVWYWx1ZSA8PSAwIHx8ICEocHJpY2UgPiAwKSB8fCAhdHJhbnNEYXRlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0cmFuc0RhdGUsXG4gICAgICAgIHR5cGVWYWx1ZSxcbiAgICAgICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KHRpY2tldC5kZXNjcmlwdGlvbikgfHwgc2FmZVRleHQodGlja2V0LmZpbGVOYW1lKSB8fCBpbmRUKFwiVGlja2V0c19GaWx0ZXJfRmlsdGVyS2V5XCIsIFwiVGlja2V0XCIpLFxuICAgICAgICBpbnRlcm5hY2lvbmFsOiBmYWxzZSxcbiAgICAgICAgZmlsZUlkLFxuICAgICAgICB0aWNrZXQ6IHRydWUsXG4gICAgICAgIHF0eTogMSxcbiAgICAgICAgcHJpY2UsXG4gICAgICB9O1xuICAgIH0sXG4gICAgW11cbiAgKTtcblxuICBjb25zdCByZXZhbGlkYXRlTGlua1NlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChjYW5kaWRhdGVTZWxlY3Rpb246IFJlY29yZDxzdHJpbmcsIEV4cGVuc2VUaWNrZXRDYXJkPiwgYXhVc2VySWRPdmVycmlkZSA9IFwiXCIpID0+IHtcbiAgICAgIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhjYW5kaWRhdGVTZWxlY3Rpb24pO1xuICAgICAgaWYgKGVudHJpZXMubGVuZ3RoIDwgMSkgcmV0dXJuIHt9IGFzIFJlY29yZDxzdHJpbmcsIEV4cGVuc2VUaWNrZXRDYXJkPjtcblxuICAgICAgY29uc3QgbmV4dDogUmVjb3JkPHN0cmluZywgRXhwZW5zZVRpY2tldENhcmQ+ID0ge307XG4gICAgICBmb3IgKGNvbnN0IFtmaWxlSWQsIHRpY2tldF0gb2YgZW50cmllcykge1xuICAgICAgY29uc3Qgc2FmZUZpbGVJZCA9IHNhZmVUZXh0KGZpbGVJZCk7XG4gICAgICBpZiAoIXNhZmVGaWxlSWQgfHwgIWNhblNlbGVjdFRpY2tldEZvckxpbmsodGlja2V0KSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0KFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBhZ2U6IDEsXG4gICAgICAgICAgICBwYWdlU2l6ZTogMTAsXG4gICAgICAgICAgICBzZWFyY2hLZXk6IHNhZmVGaWxlSWQsXG4gICAgICAgICAgICBmaWx0ZXI6IHNhZmVGaWxlSWQsXG4gICAgICAgICAgICBzdGF0dXM6IDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIGF4VXNlcklkT3ZlcnJpZGU6IHNhZmVUZXh0KGF4VXNlcklkT3ZlcnJpZGUpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGl0ZW1zUmF3ID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcbiAgICAgICAgY29uc3QgZXhpc3RzQXNQZW5kaW5nID0gaXRlbXNSYXcuc29tZSgoZW50cnkpID0+IHNhZmVUZXh0KChlbnRyeSBhcyB7IEZpbGVJZD86IHVua25vd24gfSkuRmlsZUlkKS50b1VwcGVyQ2FzZSgpID09PSBzYWZlRmlsZUlkLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICBpZiAoZXhpc3RzQXNQZW5kaW5nKSB7XG4gICAgICAgICAgbmV4dFtzYWZlRmlsZUlkXSA9IHRpY2tldDtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIEtlZXAgY2FuZGlkYXRlIHNlbGVjdGlvbiB3aGVuIHZhbGlkYXRpb24gZW5kcG9pbnQgaXMgdGVtcG9yYXJpbHkgdW5hdmFpbGFibGUuXG4gICAgICAgIG5leHRbc2FmZUZpbGVJZF0gPSB0aWNrZXQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQ7XG4gICAgfSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IHJ1blRpY2tldExpbmtGbG93ID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmICghaXNMaW5rTW9kZSB8fCAhbGlua1NoZWV0SWQgfHwgbGlua0Zsb3dCdXN5KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChsaW5rU2hlZXRMb2NrZWQgfHwgIWNhblByb2Nlc3NMaW5rTW9kZSkge1xuICAgICAgc2V0TGlua0Zsb3dFcnJvcihpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUGFpZFJlYWRPbmx5XCIsIFwiTGFzIGhvamFzIGRlIGdhc3RvIHBhZ2FkYXMgc29uIGRlIHNvbG8gbGVjdHVyYS5cIikpO1xuICAgICAgc2V0TGlua0Zsb3dTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1BhaWRSZWFkT25seVwiLCBcIkxhcyBob2phcyBkZSBnYXN0byBwYWdhZGFzIHNvbiBkZSBzb2xvIGxlY3R1cmEuXCIpKTtcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RlZEVudHJpZXMgPSBPYmplY3QuZW50cmllcyhzZWxlY3RlZFRpY2tldHNCeUlkKTtcbiAgICBpZiAoc2VsZWN0ZWRFbnRyaWVzLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmVGaWx0ZXJzID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnMoKTtcbiAgICBjb25zdCByZXF1ZXN0QXhVc2VySWQgPSBzYWZlVGV4dChhY3RpdmVGaWx0ZXJzLm1hbmFnZWRVc2VySWQgfHwgY3VycmVudEF4VXNlcklkKTtcbiAgICBjb25zdCByZXF1ZXN0SGVhZGVycyA9XG4gICAgICByZXF1ZXN0QXhVc2VySWRcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBcIlgtSU5ELUF4VXNlcklkXCI6IHJlcXVlc3RBeFVzZXJJZCxcbiAgICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgc2V0TGlua0Zsb3dCdXN5KHRydWUpO1xuICAgIHNldExpbmtGbG93RXJyb3IoXCJcIik7XG4gICAgc2V0TGlua0Zsb3dTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19MaW5raW5nTGluZVwiLCBcIkxpbmtpbmcgZXhwZW5zZSBsaW5lLi4uXCIpKTtcbiAgICBsZXQgc3VjY2Vzc0NvdW50ID0gMDtcbiAgICBjb25zdCBmYWlsZWRTZWxlY3Rpb246IFJlY29yZDxzdHJpbmcsIEV4cGVuc2VUaWNrZXRDYXJkPiA9IHt9O1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzZWxlY3RlZEVudHJpZXMubGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgICAgIGNvbnN0IFtmaWxlSWQsIHRpY2tldF0gPSBzZWxlY3RlZEVudHJpZXNbaW5kZXhdO1xuICAgICAgICBjb25zdCBzYWZlRmlsZUlkID0gc2FmZVRleHQoZmlsZUlkKTtcbiAgICAgICAgc2V0TGlua0Zsb3dTdGF0dXMoXG4gICAgICAgICAgYCR7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19MaW5raW5nTGluZVwiLCBcIkxpbmtpbmcgZXhwZW5zZSBsaW5lLi4uXCIpfSAke2luZGV4ICsgMX0vJHtzZWxlY3RlZEVudHJpZXMubGVuZ3RofWBcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBsaW5lUGF5bG9hZCA9IGJ1aWxkRXhwZW5zZUxpbmVGcm9tVGlja2V0KHRpY2tldCk7XG4gICAgICAgIGlmICghc2FmZUZpbGVJZCB8fCAhbGluZVBheWxvYWQpIHtcbiAgICAgICAgICBmYWlsZWRTZWxlY3Rpb25bc2FmZUZpbGVJZCB8fCBmaWxlSWRdID0gdGlja2V0O1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNyZWF0ZUV4cGVuc2VTaGVldChcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbW9kZTogMixcbiAgICAgICAgICAgICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IGxpbmtTaGVldElkLFxuICAgICAgICAgICAgICBsaW5lczogW2xpbmVQYXlsb2FkXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgICBoZWFkZXJzOiByZXF1ZXN0SGVhZGVycyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKHJlc3BvbnNlLlN1Y2Nlc3MgIT09IHRydWUpIHtcbiAgICAgICAgICAgIGZhaWxlZFNlbGVjdGlvbltzYWZlRmlsZUlkXSA9IHRpY2tldDtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHN1Y2Nlc3NDb3VudCArPSAxO1xuICAgICAgICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQoKHByZXZpb3VzKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXByZXZpb3VzW3NhZmVGaWxlSWRdKSByZXR1cm4gcHJldmlvdXM7XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2aW91cyB9O1xuICAgICAgICAgICAgZGVsZXRlIG5leHRbc2FmZUZpbGVJZF07XG4gICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgZmFpbGVkU2VsZWN0aW9uW3NhZmVGaWxlSWRdID0gdGlja2V0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IGxvYWRMaXN0KGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSwgYWN0aXZlRmlsdGVycyk7XG4gICAgICBjb25zdCB2YWxpZGF0ZWRGYWlsdXJlcyA9IGF3YWl0IHJldmFsaWRhdGVMaW5rU2VsZWN0aW9uKGZhaWxlZFNlbGVjdGlvbiwgcmVxdWVzdEF4VXNlcklkKTtcbiAgICAgIHNldEZpbHRlcmVkU2VsZWN0ZWRUaWNrZXRzKChlbnRyeSkgPT4ge1xuICAgICAgICBjb25zdCBzYWZlRmlsZUlkID0gc2FmZVRleHQoZW50cnkuZmlsZUlkKTtcbiAgICAgICAgcmV0dXJuICEhc2FmZUZpbGVJZCAmJiAhIXZhbGlkYXRlZEZhaWx1cmVzW3NhZmVGaWxlSWRdO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChzdWNjZXNzQ291bnQgPT09IHNlbGVjdGVkRW50cmllcy5sZW5ndGgpIHtcbiAgICAgICAgc2V0TGlua0Zsb3dTdGF0dXMoaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpKTtcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tQcm9jZXNzXCIsIDEyMDApO1xuICAgICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQobGlua1NoZWV0SWQpfWAsIHtcbiAgICAgICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxuICAgICAgICAgIGJ5cGFzc0d1YXJkT25jZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3VjY2Vzc0NvdW50ID4gMCkge1xuICAgICAgICBjb25zdCBmYWlsZWRDb3VudCA9IHNlbGVjdGVkRW50cmllcy5sZW5ndGggLSBzdWNjZXNzQ291bnQ7XG4gICAgICAgIGNvbnN0IHBhcnRpYWxNZXNzYWdlID0gYCR7aW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpfSAoJHtmYWlsZWRDb3VudH0vJHtzZWxlY3RlZEVudHJpZXMubGVuZ3RofSlgO1xuICAgICAgICBzZXRMaW5rRmxvd0Vycm9yKHBhcnRpYWxNZXNzYWdlKTtcbiAgICAgICAgc2V0TGlua0Zsb3dTdGF0dXMocGFydGlhbE1lc3NhZ2UpO1xuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJ3YXJuaW5nUHJvY2Vzc1wiLCAxNTAwKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmYWlsdXJlTWVzc2FnZSA9IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcbiAgICAgIHNldExpbmtGbG93RXJyb3IoZmFpbHVyZU1lc3NhZ2UpO1xuICAgICAgc2V0TGlua0Zsb3dTdGF0dXMoZmFpbHVyZU1lc3NhZ2UpO1xuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMaW5rRmxvd0J1c3koZmFsc2UpO1xuICAgIH1cbiAgfSwgW1xuICAgIGJ1aWxkRXhwZW5zZUxpbmVGcm9tVGlja2V0LFxuICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxuICAgIGN1cnJlbnRQYWdlLFxuICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICBpc0xpbmtNb2RlLFxuICAgIGxpbmtGbG93QnVzeSxcbiAgICBsaW5rU2hlZXRJZCxcbiAgICBsaW5rU2hlZXRMb2NrZWQsXG4gICAgbG9hZExpc3QsXG4gICAgcmV2YWxpZGF0ZUxpbmtTZWxlY3Rpb24sXG4gICAgcmVzb2x2ZUFjdGl2ZUZpbHRlcnMsXG4gICAgc2VsZWN0ZWRUaWNrZXRzQnlJZCxcbiAgICBzZXRGaWx0ZXJlZFNlbGVjdGVkVGlja2V0cyxcbiAgXSk7XG5cbiAgY29uc3Qgb3BlbkxpbmtDb25maXJtTW9kYWwgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFpc0xpbmtNb2RlIHx8IHNlbGVjdGVkVGlja2V0Q291bnQgPCAxIHx8IGxpbmtGbG93QnVzeSB8fCBsaW5rU2hlZXRDaGVja0J1c3kgfHwgbGlua1NoZWV0TG9ja2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0TGlua0Zsb3dFcnJvcihcIlwiKTtcbiAgICBzZXRMaW5rRmxvd1N0YXR1cyhcIlwiKTtcbiAgICBvcGVuQ29uZmlybSh7XG4gICAgICB0aXRsZTogaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0xpbmtCdXR0b25cIiwgXCJWaW5jdWxhciB0aWNrZXQocylcIiksXG4gICAgICBtZXNzYWdlOiBgJHtpbmRUKFwiTmF2X0V4cGVuc2VUaWNrZXRzXCIsIFwiVGlja2V0c1wiKX06ICR7c2VsZWN0ZWRUaWNrZXRDb3VudH1cXG4ke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1RvdGFsQW1vdW50XCIsIFwiVG90YWwgYW1vdW50XCIpfTogJHtzZWxlY3RlZFRvdGFsQW1vdW50VGV4dH1gLFxuICAgICAgY29uZmlybVRleHQ6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9MaW5rQnV0dG9uXCIsIFwiVmluY3VsYXIgdGlja2V0KHMpXCIpLFxuICAgICAgY2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXG4gICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHJ1blRpY2tldExpbmtGbG93KCk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9LCBbXG4gICAgaXNMaW5rTW9kZSxcbiAgICBzZWxlY3RlZFRpY2tldENvdW50LFxuICAgIGxpbmtGbG93QnVzeSxcbiAgICBsaW5rU2hlZXRDaGVja0J1c3ksXG4gICAgbGlua1NoZWV0TG9ja2VkLFxuICAgIG9wZW5Db25maXJtLFxuICAgIHNlbGVjdGVkVG90YWxBbW91bnRUZXh0LFxuICAgIHJ1blRpY2tldExpbmtGbG93LFxuICBdKTtcblxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgc2V0TGlua0Zsb3dFcnJvcihcIlwiKTtcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcbiAgICAgIGJ1c3k6IGxpbmtGbG93QnVzeSxcbiAgICAgIG9uRXJyb3I6IChtZXNzYWdlKSA9PiB7XG4gICAgICAgIHNldExpbmtGbG93RXJyb3IobWVzc2FnZSk7XG4gICAgICAgIHNldExpbmtGbG93U3RhdHVzKG1lc3NhZ2UpO1xuICAgICAgfSxcbiAgICAgIGRlZmF1bHRFcnJvck1lc3NhZ2U6IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSxcbiAgICB9KTtcbiAgfSwgW2hhbmRsZUNvbmZpcm0sIGxpbmtGbG93QnVzeV0pO1xuXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpO1xuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gbGlua0Zsb3dCdXN5XG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XG4gICAgOiAhbGlua0Zsb3dCdXN5ICYmIGxpbmtGbG93RXJyb3JcbiAgICAgID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpXG4gICAgICA6IG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpO1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWxpbmtGbG93QnVzeSAmJiBsaW5rRmxvd0Vycm9yKSB7XG4gICAgICBjbG9zZUNvbmZpcm0oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdm9pZCBoYW5kbGVNb2RhbENvbmZpcm0oKTtcbiAgfSwgW2Nsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtLCBsaW5rRmxvd0J1c3ksIGxpbmtGbG93RXJyb3JdKTtcblxuICBjb25zdCBvcGVuVGlja2V0RGV0YWlsID0gdXNlQ2FsbGJhY2soXG4gICAgKHJhd0ZpbGVJZDogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChyYXdGaWxlSWQpO1xuICAgICAgaWYgKCFmaWxlSWQpIHJldHVybjtcblxuICAgICAgY29uc3Qgc25hcHNob3QgPSBhcHBsaWVkRmlsdGVycyB8fCBjdXJyZW50RmlsdGVycztcbiAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHtcbiAgICAgICAgZmlsdGVyczogc25hcHNob3QsXG4gICAgICAgIHBhZ2U6IGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSxcbiAgICAgICAgc2Nyb2xsWTogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5zY3JvbGxZIHx8IDAgOiAwLFxuICAgICAgICBmb2N1c0ZpbGVJZDogZmlsZUlkLFxuICAgICAgICBpdGVtcyxcbiAgICAgICAgdG90YWwsXG4gICAgICAgIHNlbGVjdGVkVGlja2V0czogc2VsZWN0ZWRUaWNrZXRMaXN0LFxuICAgICAgICBsaW5rTW9kZVNoZWV0SWQ6IGlzTGlua01vZGUgPyBsaW5rU2hlZXRJZCA6IFwiXCIsXG4gICAgICB9O1xuXG4gICAgICBpZiAoaXNMaW5rTW9kZSkge1xuICAgICAgICBpZiAoRGF0ZS5ub3coKSA8IGxpbmtNb2RlU2VsZWN0aW9uSW50ZW50VW50aWxSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgICAgICBjbGVhclBlbmRpbmdEZXRhaWxPcGVuKCk7XG4gICAgICAgIGxpbmtNb2RlUGVuZGluZ09wZW5UaW1lclJlZi5jdXJyZW50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGxpbmtNb2RlUGVuZGluZ09wZW5UaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgICBpZiAoRGF0ZS5ub3coKSA8IGxpbmtNb2RlU2VsZWN0aW9uSW50ZW50VW50aWxSZWYuY3VycmVudCkgcmV0dXJuO1xuXG4gICAgICAgICAgc2F2ZUNhY2hlZFN0YXRlKGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgICAgICAgIGZpbGVJZCxcbiAgICAgICAgICAgIG9yaWdpbjogXCJzaGVldC1saW5rXCIsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGxpbmtTaGVldElkKSB7XG4gICAgICAgICAgICBxdWVyeS5zZXQoXCJzaGVldElkXCIsIGxpbmtTaGVldElkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XG4gICAgICAgICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxuICAgICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LCBMSU5LX01PREVfT1BFTl9ERVRBSUxfREVMQVlfTVMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNhdmVDYWNoZWRTdGF0ZShjdXJyZW50U3RhdGUpO1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsP2ZpbGVJZD0ke2VuY29kZVVSSUNvbXBvbmVudChmaWxlSWQpfWAsIHtcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiB0cnVlLFxuICAgICAgICBieXBhc3NHdWFyZE9uY2U6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbXG4gICAgICBhcHBsaWVkRmlsdGVycyxcbiAgICAgIGNsZWFyUGVuZGluZ0RldGFpbE9wZW4sXG4gICAgICBjdXJyZW50UGFnZSxcbiAgICAgIGN1cnJlbnRGaWx0ZXJzLFxuICAgICAgaXNMaW5rTW9kZSxcbiAgICAgIGl0ZW1zLFxuICAgICAgbGlua1NoZWV0SWQsXG4gICAgICBzYXZlQ2FjaGVkU3RhdGUsXG4gICAgICBzZWxlY3RlZFRpY2tldExpc3QsXG4gICAgICB0b3RhbCxcbiAgICBdXG4gICk7XG5cbiAgY29uc3QgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgPSB1c2VDYWxsYmFjaygodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcbiAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBjYXJkID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XG4gICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIXRpbWVsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY2FyZDtcbiAgfSwgW10pO1xuXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoe1xuICAgIGNvbnRhaW5lclJlZjogdGltZWxpbmVDb250YWluZXJSZWYsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGl0ZW1zLFxuICAgIHJlc29sdmVDbGlja2FibGVDYXJkLFxuICB9KTtcblxuICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKCh0b3RhbCB8fCAwKSAvIFBBR0VfU0laRSk7XG5cbiAgY29uc3Qgc3VtbWFyeUl0ZW1zID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3Qgc25hcHNob3QgPSBhcHBsaWVkRmlsdGVycztcbiAgICBpZiAoIXNuYXBzaG90KSByZXR1cm4gW10gYXMgQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9PjtcblxuICAgIGNvbnN0IHN1bW1hcnk6IEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfT4gPSBbXTtcbiAgICBjb25zdCBsb2NhbGUgPSBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIjtcbiAgICBjb25zdCBmcm9tRGF0ZVRleHQgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoc25hcHNob3QuZnJvbURhdGUsIGxvY2FsZSwgXCJcIik7XG4gICAgY29uc3QgdG9EYXRlVGV4dCA9IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShzbmFwc2hvdC50b0RhdGUsIGxvY2FsZSwgXCJcIik7XG5cbiAgICBpZiAoZnJvbURhdGVUZXh0IHx8IHRvRGF0ZVRleHQpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJmcm9tRGF0ZVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIiksXG4gICAgICAgIHZhbHVlOiBmcm9tRGF0ZVRleHQgfHwgXCItLVwiLFxuICAgICAgfSk7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwidG9EYXRlXCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpLFxuICAgICAgICB2YWx1ZTogdG9EYXRlVGV4dCB8fCBcIi0tXCIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc25hcHNob3QuZmlsdGVyS2V5LnRyaW0oKSkge1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcImZpbHRlcktleVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0ZpbHRlcktleVwiLCBcIlRpY2tldFwiKSxcbiAgICAgICAgdmFsdWU6IHNuYXBzaG90LmZpbHRlcktleS50cmltKCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc25hcHNob3QuY3VycmVuY3lDb2RlLnRyaW0oKSkge1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcImN1cnJlbmN5XCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKSxcbiAgICAgICAgdmFsdWU6IHNuYXBzaG90LmN1cnJlbmN5Q29kZS50cmltKCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc25hcHNob3Quc3RhdHVzRmlsdGVyICE9PSBcIlwiKSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwic3RhdHVzXCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzXCIsIFwiU3RhdHVzXCIpLFxuICAgICAgICB2YWx1ZTogZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsKHNuYXBzaG90LnN0YXR1c0ZpbHRlciksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc25hcHNob3QuZ2FzdG9UeXBlRmlsdGVyICE9PSBcIlwiKSB7XG4gICAgICBjb25zdCBjYXRlZ29yeUxhYmVsID0gZ2FzdG9UeXBlTGFiZWxNYXAuZ2V0KFN0cmluZyhzbmFwc2hvdC5nYXN0b1R5cGVGaWx0ZXIpKSB8fCBTdHJpbmcoc25hcHNob3QuZ2FzdG9UeXBlRmlsdGVyKTtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJjYXRlZ29yeVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIiksXG4gICAgICAgIHZhbHVlOiBjYXRlZ29yeUxhYmVsLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNuYXBzaG90LnByb2Nlc3NlZEJ5SWFGaWx0ZXIgIT09IFwiYWxsXCIpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJwcm9jZXNzZWRcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBXCIsIFwiUHJvY2Vzc2VkIGJ5IElBXCIpLFxuICAgICAgICB2YWx1ZTpcbiAgICAgICAgICBzbmFwc2hvdC5wcm9jZXNzZWRCeUlhRmlsdGVyID09PSBcInllc1wiXG4gICAgICAgICAgICA/IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBX1llc1wiLCBcIlllc1wiKVxuICAgICAgICAgICAgOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9Ob1wiLCBcIk5vXCIpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1bW1hcnk7XG4gIH0sIFthcHBsaWVkRmlsdGVycywgZ2FzdG9UeXBlTGFiZWxNYXBdKTtcblxuICBjb25zdCBzaG93U3VtbWFyeSA9ICFpc0xpbmtNb2RlICYmICFzaG93RmlsdGVycyAmJiBzdW1tYXJ5SXRlbXMubGVuZ3RoID4gMDtcblxuICAvLyBWYWxpZGF0ZXMgdGFyZ2V0IHNoZWV0IGxvY2sgc3RhdGUgYmVmb3JlIGVuYWJsaW5nIGxpbmsgbW9kZSBhY3Rpb25zLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNMaW5rTW9kZSB8fCAhbGlua1NoZWV0SWQpIHtcbiAgICAgIHNldExpbmtTaGVldExvY2tlZChmYWxzZSk7XG4gICAgICBzZXRMaW5rU2hlZXRDaGVja0J1c3koZmFsc2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWNhblByb2Nlc3NMaW5rTW9kZSkge1xuICAgICAgc2V0TGlua1NoZWV0TG9ja2VkKHRydWUpO1xuICAgICAgc2V0TGlua1NoZWV0Q2hlY2tCdXN5KGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgc2V0TGlua1NoZWV0Q2hlY2tCdXN5KHRydWUpO1xuICAgIHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwobGlua1NoZWV0SWQsIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcblxuICAgICAgICBjb25zdCBoZWFkZXJzID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gKGhlYWRlcnNbMF0gfHwgbnVsbCkgYXMgeyBFeHBlbnNlU2hlZXRTdGF0dXM/OiB1bmtub3duOyBWb3VjaGVyPzogdW5rbm93biB9IHwgbnVsbDtcbiAgICAgICAgY29uc3Qgc3RhdHVzQ29kZSA9IE51bWJlcihoZWFkZXI/LkV4cGVuc2VTaGVldFN0YXR1cyA/PyAtMSk7XG4gICAgICAgIGNvbnN0IHZvdWNoZXIgPSBzYWZlVGV4dChoZWFkZXI/LlZvdWNoZXIpO1xuICAgICAgICBjb25zdCBpc0xvY2tlZCA9IHN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkVEIHx8IHN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX1BBSUQgfHwgISF2b3VjaGVyO1xuICAgICAgICBzZXRMaW5rU2hlZXRMb2NrZWQoaXNMb2NrZWQpO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgc2V0TGlua1NoZWV0TG9ja2VkKHRydWUpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKCFjYW5jZWxsZWQpIHtcbiAgICAgICAgICBzZXRMaW5rU2hlZXRDaGVja0J1c3koZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjYW5jZWxsZWQgPSB0cnVlO1xuICAgIH07XG4gIH0sIFtjYW5Qcm9jZXNzTGlua01vZGUsIGlzTGlua01vZGUsIGxpbmtTaGVldElkXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzTGlua01vZGUpIHJldHVybjtcbiAgICBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKHtcbiAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgIG1lc3NhZ2U6IGxpbmtNb2RlQ2FuY2VsTWVzc2FnZSxcbiAgICB9KTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKCk7XG4gICAgfTtcbiAgfSwgW2lzTGlua01vZGUsIGxpbmtNb2RlQ2FuY2VsTWVzc2FnZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGRpZEFwcGx5UXVlcnlGaWx0ZXJSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGRpZEFwcGx5UXVlcnlGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XG4gICAgaWYgKGlzTGlua01vZGUpIHJldHVybjtcblxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIGNvbnN0IHRpY2tldEZpbGVJZCA9IHNhZmVUZXh0KHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwidGlja2V0RmlsZUlkXCIpKTtcbiAgICBpZiAoIXRpY2tldEZpbGVJZCkgcmV0dXJuO1xuICAgIGNvbnN0IHJlc29sdmVkTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XG5cbiAgICBjb25zdCBxdWVyeVNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0ge1xuICAgICAgZnJvbURhdGU6IFwiXCIsXG4gICAgICB0b0RhdGU6IFwiXCIsXG4gICAgICBmaWx0ZXJLZXk6IHRpY2tldEZpbGVJZCxcbiAgICAgIGN1cnJlbmN5Q29kZTogXCJcIixcbiAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc29sdmVkTWFuYWdlZFVzZXJJZCxcbiAgICAgIHN0YXR1c0ZpbHRlcjogXCJcIixcbiAgICAgIGdhc3RvVHlwZUZpbHRlcjogXCJcIixcbiAgICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXI6IFwiYWxsXCIsXG4gICAgfTtcblxuICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMocXVlcnlTbmFwc2hvdCk7XG4gICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSB0aWNrZXRGaWxlSWQ7XG4gICAgdm9pZCBsb2FkTGlzdCgxLCBxdWVyeVNuYXBzaG90KTtcblxuICAgIHVybC5zZWFyY2hQYXJhbXMuZGVsZXRlKFwidGlja2V0RmlsZUlkXCIpO1xuICAgIGNvbnN0IGNsZWFuZWRRdWVyeSA9IHVybC5zZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcbiAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIFwiXCIsIGNsZWFuZWRRdWVyeSA/IGAke3VybC5wYXRobmFtZX0/JHtjbGVhbmVkUXVlcnl9YCA6IHVybC5wYXRobmFtZSk7XG4gIH0sIFtjbGVhckNhY2hlZFN0YXRlLCBkZWZhdWx0TWFuYWdlZFVzZXJJZCwgaXNMaW5rTW9kZSwgbG9hZExpc3QsIHJlc3RvcmVBcHBsaWVkRmlsdGVycywgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoZGlkUmVzdG9yZU9uTW91bnRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQgPSB0cnVlO1xuXG4gICAgaWYgKGlzTGlua01vZGUpIHtcbiAgICAgIGNvbnN0IGlzUmV0dXJuaW5nRnJvbURldGFpbCA9IGNvbnN1bWVSZXR1cm5GbGFnKCk7XG4gICAgICBjb25zdCBjYWNoZWRTdGF0ZSA9IGlzUmV0dXJuaW5nRnJvbURldGFpbCA/IHJlYWRDYWNoZWRTdGF0ZSgpIDogbnVsbDtcbiAgICAgIGNvbnN0IGNhY2hlZFNoZWV0SWQgPSBzYWZlVGV4dChjYWNoZWRTdGF0ZT8ubGlua01vZGVTaGVldElkKTtcbiAgICAgIGlmIChjYWNoZWRTdGF0ZSAmJiBjYWNoZWRTaGVldElkICYmIGNhY2hlZFNoZWV0SWQgPT09IHNhZmVUZXh0KGxpbmtTaGVldElkKSkge1xuICAgICAgICBjb25zdCByZXN0b3JlZE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oY2FjaGVkU3RhdGUuZmlsdGVycy5tYW5hZ2VkVXNlcklkKTtcbiAgICAgICAgY29uc3QgcmVzdG9yZWRGaWx0ZXJzID0ge1xuICAgICAgICAgIC4uLmNhY2hlZFN0YXRlLmZpbHRlcnMsXG4gICAgICAgICAgbWFuYWdlZFVzZXJJZDogcmVzdG9yZWRNYW5hZ2VkVXNlcklkLFxuICAgICAgICB9O1xuICAgICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMocmVzdG9yZWRGaWx0ZXJzKTtcbiAgICAgICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLnNjcm9sbFk7XG4gICAgICAgIHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50ID0gY2FjaGVkU3RhdGUuZm9jdXNGaWxlSWQ7XG4gICAgICAgIGNvbnN0IHJlc3RvcmVkU2VsZWN0aW9uOiBSZWNvcmQ8c3RyaW5nLCBFeHBlbnNlVGlja2V0Q2FyZD4gPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCB0aWNrZXQgb2YgY2FjaGVkU3RhdGUuc2VsZWN0ZWRUaWNrZXRzKSB7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRGaWxlSWQgPSBzYWZlVGV4dCh0aWNrZXQuZmlsZUlkKTtcbiAgICAgICAgICBpZiAoIXNlbGVjdGVkRmlsZUlkKSBjb250aW51ZTtcbiAgICAgICAgICByZXN0b3JlZFNlbGVjdGlvbltzZWxlY3RlZEZpbGVJZF0gPSB0aWNrZXQ7XG4gICAgICAgIH1cbiAgICAgICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZChyZXN0b3JlZFNlbGVjdGlvbik7XG4gICAgICAgIGlmIChjYWNoZWRTdGF0ZS5pdGVtcy5sZW5ndGggPiAwIHx8IGNhY2hlZFN0YXRlLnRvdGFsID4gMCkge1xuICAgICAgICAgIHJlc3RvcmVMaXN0U25hcHNob3Qoe1xuICAgICAgICAgICAgaXRlbXM6IGNhY2hlZFN0YXRlLml0ZW1zLFxuICAgICAgICAgICAgdG90YWw6IGNhY2hlZFN0YXRlLnRvdGFsLFxuICAgICAgICAgICAgcGFnZTogY2FjaGVkU3RhdGUucGFnZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdm9pZCBsb2FkTGlzdChjYWNoZWRTdGF0ZS5wYWdlLCBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZChyZXN0b3JlZEZpbHRlcnMpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpbml0aWFsTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XG4gICAgICBjb25zdCBsaW5rU25hcHNob3QgPSBidWlsZExpbmtNb2RlSW5pdGlhbFNuYXBzaG90KGluaXRpYWxNYW5hZ2VkVXNlcklkKTtcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQoe30pO1xuICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKGxpbmtTbmFwc2hvdCk7XG4gICAgICB2b2lkIGxvYWRMaXN0KDEsIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKGxpbmtTbmFwc2hvdCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghY29uc3VtZVJldHVybkZsYWcoKSkge1xuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNhY2hlZFN0YXRlID0gcmVhZENhY2hlZFN0YXRlKCk7XG4gICAgaWYgKCFjYWNoZWRTdGF0ZSkge1xuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihjYWNoZWRTdGF0ZS5maWx0ZXJzLm1hbmFnZWRVc2VySWQpO1xuICAgIGNvbnN0IHJlc3RvcmVkRmlsdGVycyA9IHtcbiAgICAgIC4uLmNhY2hlZFN0YXRlLmZpbHRlcnMsXG4gICAgICBtYW5hZ2VkVXNlcklkOiByZXN0b3JlZE1hbmFnZWRVc2VySWQsXG4gICAgfTtcbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMocmVzdG9yZWRGaWx0ZXJzKTtcbiAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gY2FjaGVkU3RhdGUuc2Nyb2xsWTtcbiAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLmZvY3VzRmlsZUlkO1xuICAgIGlmIChjYWNoZWRTdGF0ZS5pdGVtcy5sZW5ndGggPiAwIHx8IGNhY2hlZFN0YXRlLnRvdGFsID4gMCkge1xuICAgICAgcmVzdG9yZUxpc3RTbmFwc2hvdCh7XG4gICAgICAgIGl0ZW1zOiBjYWNoZWRTdGF0ZS5pdGVtcyxcbiAgICAgICAgdG90YWw6IGNhY2hlZFN0YXRlLnRvdGFsLFxuICAgICAgICBwYWdlOiBjYWNoZWRTdGF0ZS5wYWdlLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZvaWQgbG9hZExpc3QoY2FjaGVkU3RhdGUucGFnZSwgcmVzdG9yZWRGaWx0ZXJzKTtcbiAgfSwgW1xuICAgIGNsZWFyQ2FjaGVkU3RhdGUsXG4gICAgZGVmYXVsdE1hbmFnZWRVc2VySWQsXG4gICAgY29uc3VtZVJldHVybkZsYWcsXG4gICAgaXNMaW5rTW9kZSxcbiAgICBsaW5rU2hlZXRJZCxcbiAgICBsb2FkTGlzdCxcbiAgICBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZCxcbiAgICByZWFkQ2FjaGVkU3RhdGUsXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxuICAgIHJlc3RvcmVMaXN0U25hcHNob3QsXG4gICAgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uLFxuICBdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0xvYWRpbmcpIHJldHVybjtcbiAgICBpZiAocGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9PSBudWxsICYmICFwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCkgcmV0dXJuO1xuXG4gICAgY29uc3QgcGVuZGluZ1Njcm9sbFkgPSBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50O1xuICAgIGNvbnN0IHBlbmRpbmdGb2N1c0ZpbGVJZCA9IHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50O1xuICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50ID0gXCJcIjtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgaWYgKHBlbmRpbmdTY3JvbGxZICE9IG51bGwpIHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgICB0b3A6IE1hdGgubWF4KDAsIHBlbmRpbmdTY3JvbGxZKSxcbiAgICAgICAgICBiZWhhdmlvcjogXCJhdXRvXCIsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXBlbmRpbmdGb2N1c0ZpbGVJZCB8fCAhdGltZWxpbmVDb250YWluZXJSZWYuY3VycmVudCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBub3JtYWxpemVkRm9jdXNJZCA9IHBlbmRpbmdGb2N1c0ZpbGVJZC50b1VwcGVyQ2FzZSgpO1xuICAgICAgY29uc3QgdGltZWxpbmVJdGVtcyA9IEFycmF5LmZyb20oXG4gICAgICAgIHRpbWVsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtaXRlbVtkYXRhLXRpY2tldC1maWxlLWlkXVwiKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IG1hdGNoaW5nSXRlbSA9IHRpbWVsaW5lSXRlbXMuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gc2FmZVRleHQoaXRlbS5kYXRhc2V0LnRpY2tldEZpbGVJZCkudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZEZvY3VzSWQ7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHRhcmdldENhcmQgPSBtYXRjaGluZ0l0ZW0/LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcbiAgICAgIGlmICghdGFyZ2V0Q2FyZCkgcmV0dXJuO1xuXG4gICAgICB0YXJnZXRDYXJkLmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgICB9KTtcbiAgfSwgW2lzTG9hZGluZywgaXRlbXMubGVuZ3RoXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvblRvZ2dsZUZpbHRlcnMgPSAoKSA9PiB7XG4gICAgICBjb25zdCB3aWxsT3BlbiA9ICFzaG93RmlsdGVycztcbiAgICAgIHRvZ2dsZUZpbHRlclBhbmVsKCk7XG4gICAgICBpZiAod2lsbE9wZW4pIHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHsgdG9wOiAwLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25SZWZyZXNoID0gKCkgPT4ge1xuICAgICAgY29uc3Qgc25hcHNob3QgPSByZXNvbHZlQWN0aXZlRmlsdGVycygpO1xuICAgICAgaWYgKCFpc0xpbmtNb2RlICYmICghc25hcHNob3Q/LmZyb21EYXRlIHx8ICFzbmFwc2hvdD8udG9EYXRlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2b2lkIGxvYWRMaXN0KGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSwgc25hcHNob3QpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXRpY2tldHMtcmVmcmVzaFwiLCBvblJlZnJlc2gpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXhwZW5zZS10aWNrZXRzLXRvZ2dsZS1maWx0ZXJcIiwgb25Ub2dnbGVGaWx0ZXJzKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXhwZW5zZS10aWNrZXRzLXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcbiAgICB9O1xuICB9LCBbY3VycmVudFBhZ2UsIGlzTGlua01vZGUsIGxvYWRMaXN0LCByZXNvbHZlQWN0aXZlRmlsdGVycywgc2hvd0ZpbHRlcnMsIHRvZ2dsZUZpbHRlclBhbmVsXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgPENvbmZpcm1Nb2RhbFxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XG4gICAgICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbENhbmNlbFRleHR9XG4gICAgICAgIGxvYWRpbmdUZXh0PXttb2RhbExvYWRpbmdUZXh0fVxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XG4gICAgICAgIGJ1c3k9e2xpbmtGbG93QnVzeX1cbiAgICAgICAgZXJyb3I9e2xpbmtGbG93RXJyb3J9XG4gICAgICAgIHN0YXR1cz17bGlua0Zsb3dTdGF0dXN9XG4gICAgICAgIG9uQ29uZmlybT17aGFuZGxlTW9kYWxCdXR0b25Db25maXJtfVxuICAgICAgICBvbkNhbmNlbD17Y2xvc2VDb25maXJtfVxuICAgICAgLz5cblxuICAgICAgPGlucHV0XG4gICAgICAgIHJlZj17Y2FtZXJhSW5wdXRSZWZ9XG4gICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgYWNjZXB0PVwiaW1hZ2UvanBlZyxpbWFnZS9qcGcsaW1hZ2UvcG5nLGltYWdlL3dlYnBcIlxuICAgICAgICBjYXB0dXJlPVwiZW52aXJvbm1lbnRcIlxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZmlsZXM/LlswXSB8fCBudWxsO1xuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgIHZvaWQgaGFuZGxlU2VsZWN0ZWRGaWxlKGZpbGUsIFwiY2FtZXJhXCIpO1xuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIDxpbnB1dFxuICAgICAgICByZWY9e2dhbGxlcnlJbnB1dFJlZn1cbiAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICBhY2NlcHQ9XCJpbWFnZS9qcGVnLGltYWdlL2pwZyxpbWFnZS9wbmcsaW1hZ2Uvd2VicFwiXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQuY3VycmVudFRhcmdldC5maWxlcz8uWzBdIHx8IG51bGw7XG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgdm9pZCBoYW5kbGVTZWxlY3RlZEZpbGUoZmlsZSwgXCJnYWxsZXJ5XCIpO1xuICAgICAgICB9fVxuICAgICAgLz5cblxuICAgICAgeyFpc0xpbmtNb2RlICYmIHNvdXJjZVBpY2tlck9wZW4gPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTYwMDAwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1zbGF0ZS05NTAvNDUgcHgtNCBweS02XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctc20gcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgcC00IHNoYWRvdy14bFwiPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtWzE2cHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfVGl0bGVcIiwgXCJOdWV2byB0aWNrZXRcIil9XG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XG4gICAgICAgICAgICAgIHtpbmRUKFxuICAgICAgICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0JvZHlcIixcbiAgICAgICAgICAgICAgICBcIlNlbGVjY2lvbmEgdW5hIGZ1ZW50ZSBwYXJhIGNhcHR1cmFyIG8gZWxlZ2lyIGxhIGltYWdlbiBkZWwgdGlja2V0LlwiXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBncmlkIGdyaWQtY29scy0xIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHZvaWQgc2VsZWN0RnJvbUNhbWVyYShjYW1lcmFJbnB1dFJlZi5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfQ2FtZXJhXCIsIFwiVXNhciBjYW1hcmFcIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RGcm9tR2FsbGVyeShnYWxsZXJ5SW5wdXRSZWYuY3VycmVudCl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9HYWxsZXJ5XCIsIFwiRWxlZ2lyIGltYWdlblwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2Nsb3NlU291cmNlUGlja2VyfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7IWlzTGlua01vZGUgJiYgcXVpY2tUaWNrZXRCdXN5ID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzM1IHB4LTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlLzk1IHB4LTQgcHktMyB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCI+XG4gICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC01IHctNVwiIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfSAvPlxuICAgICAgICAgICAgPHNwYW4+e3F1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlIHx8IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7IWlzTGlua01vZGUgJiYgcXVpY2tUaWNrZXRFcnJvck1lc3NhZ2UgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgc3BhY2UteS0yIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctcm9zZS01MCBwLTMgdGV4dC1zbSB0ZXh0LXJvc2UtODAwXCI+XG4gICAgICAgICAgPHA+e3F1aWNrVGlja2V0RXJyb3JNZXNzYWdlfTwvcD5cbiAgICAgICAgICB7cXVpY2tUaWNrZXRUcmFjZUxpc3QubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXdoaXRlIHAtMiB0ZXh0LXhzIHRleHQtcm9zZS03MDBcIj5cbiAgICAgICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lm1hcCgoZW50cnkpID0+IChcbiAgICAgICAgICAgICAgICA8cCBrZXk9e2Ake2VudHJ5LnN0ZXB9LSR7ZW50cnkuYXR9YH0+e2Ake2VudHJ5LnN0ZXB9OiAke2VudHJ5LnRyYWNlSWR9YH08L3A+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMlwiPlxuICAgICAgICAgICAge2hhc1BlbmRpbmdVcGxvYWRSZXRyeSA/IChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHZvaWQgcmV0cnlQZW5kaW5nVXBsb2FkKCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUmV0cnlVcGxvYWRcIiwgXCJSZWludGVudGFyIHVwbG9hZFwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIiBvbkNsaWNrPXtjbGVhclF1aWNrVGlja2V0RXJyb3J9PlxuICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9DbG9zZVwiLCBcIkNsb3NlXCIpfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIHtzaG93U3VtbWFyeSA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItY2FyZCBmaWx0ZXItY2FyZC0tc3VtbWFyeSBwLTMgc206cC00IG10LTEgbWItM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhwZW5zZS1zdW1tYXJ5LWdyaWQgZ3JpZCBncmlkLWNvbHMtMSBtaW4tWzM2MHB4XTpncmlkLWNvbHMtMiBpdGVtcy1zdGFydCBnYXAteC00IGdhcC15LTEgdGV4dC14c1wiPlxuICAgICAgICAgICAge3N1bW1hcnlJdGVtcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGtleT17aXRlbS5rZXl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeSBoaXN0b3J5LWZpbHRlci1zdW1tYXJ5LS1ncmlkLWl0ZW0gbGVhZGluZy01IG1pbi13LTBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeV9fbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpdGVtLmxhYmVsfTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeV9fdmFsdWUgYnJlYWstd29yZHNcIj57aXRlbS52YWx1ZX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbFxuICAgICAgICB2aXNpYmxlPXtzaG93RmlsdGVyc31cbiAgICAgICAgc2hvd01hbnVhbERhdGVGaWx0ZXI9e3Nob3dNYW51YWxEYXRlRmlsdGVyfVxuICAgICAgICBtYW51YWxEYXRlQXV0b09wZW5LZXk9e21hbnVhbERhdGVBdXRvT3BlbktleX1cbiAgICAgICAgZnJvbURhdGU9e2Zyb21EYXRlfVxuICAgICAgICB0b0RhdGU9e3RvRGF0ZX1cbiAgICAgICAgZmlsdGVyS2V5PXtmaWx0ZXJLZXl9XG4gICAgICAgIGN1cnJlbmN5Q29kZT17Y3VycmVuY3lDb2RlfVxuICAgICAgICBtYW5hZ2VkVXNlcklkPXttYW5hZ2VkVXNlcklkfVxuICAgICAgICBtYW5hZ2VkVXNlcnM9e21hbmFnZWRVc2Vyc31cbiAgICAgICAgc2hvd01hbmFnZWRVc2VyRmlsdGVyPXtzaG93TWFuYWdlZFVzZXJGaWx0ZXJ9XG4gICAgICAgIHN0YXR1c0ZpbHRlcj17c3RhdHVzRmlsdGVyfVxuICAgICAgICBnYXN0b1R5cGVGaWx0ZXI9e2dhc3RvVHlwZUZpbHRlcn1cbiAgICAgICAgcHJvY2Vzc2VkQnlJYUZpbHRlcj17cHJvY2Vzc2VkQnlJYUZpbHRlcn1cbiAgICAgICAgYWN0aXZlUXVpY2tGaWx0ZXI9e2FjdGl2ZVF1aWNrRmlsdGVyfVxuICAgICAgICBzaG93TWFudWFsRGF0ZUVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yfVxuICAgICAgICBzdGF0dXNGaWx0ZXJSZWFkT25seT17c3RhdHVzRmlsdGVyTG9ja2VkfVxuICAgICAgICBmaXhlZFN0YXR1c0ZpbHRlcj17Zml4ZWRTdGF0dXNGaWx0ZXJ9XG4gICAgICAgIGdhc3RvVHlwZU9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XG4gICAgICAgIG9uRGF0ZVJhbmdlQ2hhbmdlPXtvbkRhdGVSYW5nZUNoYW5nZX1cbiAgICAgICAgb25NYW51YWxSYW5nZUNvbXBsZXRlPXtvbk1hbnVhbFJhbmdlQ29tcGxldGV9XG4gICAgICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2U9e29uUXVpY2tGaWx0ZXJDaGFuZ2V9XG4gICAgICAgIG9uRmlsdGVyS2V5Q2hhbmdlPXtzZXRGaWx0ZXJLZXl9XG4gICAgICAgIG9uQ3VycmVuY3lDb2RlQ2hhbmdlPXtzZXRDdXJyZW5jeUNvZGV9XG4gICAgICAgIG9uTWFuYWdlZFVzZXJJZENoYW5nZT17c2V0TWFuYWdlZFVzZXJJZH1cbiAgICAgICAgb25TdGF0dXNGaWx0ZXJDaGFuZ2U9e3NldFN0YXR1c0ZpbHRlcn1cbiAgICAgICAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2U9e3NldEdhc3RvVHlwZUZpbHRlcn1cbiAgICAgICAgb25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlPXtzZXRQcm9jZXNzZWRCeUlhRmlsdGVyfVxuICAgICAgICBvbkNsZWFyPXtvbkNsZWFyfVxuICAgICAgICBvbkFwcGx5PXtvbkFwcGx5fVxuICAgICAgLz5cblxuICAgICAge2lzTGlua01vZGUgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIHB4LTAuNVwiPlxuICAgICAgICAgIHshY2FuUHJvY2Vzc0xpbmtNb2RlID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtcm9zZS03MDBcIj57aW5kVChcIkF1dGhfUGVybWlzc2lvbkRlbmllZF9Cb2R5XCIsIFwiTm8gcGVybWlzc2lvbi5cIil9PC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmIGxpbmtTaGVldENoZWNrQnVzeSA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfSAvPlxuICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgIHtjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiBzZWxlY3RBbGxCdXN5ID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCI+XG4gICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9IC8+XG4gICAgICAgICAgICAgIDxzcGFuPntpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAge2NhblByb2Nlc3NMaW5rTW9kZSAmJiAhbGlua1NoZWV0Q2hlY2tCdXN5ICYmIGxpbmtTaGVldExvY2tlZCA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXJvc2UtNzAwXCI+XG4gICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUGFpZFJlYWRPbmx5XCIsIFwiTGFzIGhvamFzIGRlIGdhc3RvIHBhZ2FkYXMgc29uIGRlIHNvbG8gbGVjdHVyYS5cIil9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgIHtjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiAhbGlua1NoZWV0TG9ja2VkICYmIHNlbGVjdEFsbEVycm9yID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtcm9zZS03MDBcIj57c2VsZWN0QWxsRXJyb3J9PC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmICFsaW5rU2hlZXRDaGVja0J1c3kgJiYgIWxpbmtTaGVldExvY2tlZCA/IChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMS41IHB0LTAuNVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIG1pbi13LTAgcHgtMS41IHB5LTEgdGV4dC1bMTBweF0gbGVhZGluZy10aWdodCBzbTp0ZXh0LXhzXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBzZWxlY3RBbGxNYXRjaGluZ1RpY2tldHMoKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17bGlua0Zsb3dCdXN5IHx8IHNlbGVjdEFsbEJ1c3kgfHwgdG90YWwgPCAxfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfU2VsZWN0QWxsXCIsIFwiU2VsZWNjaW9uYXIgdG9kb1wiKX1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBtaW4tdy0wIHB4LTEuNSBweS0xIHRleHQtWzEwcHhdIGxlYWRpbmctdGlnaHQgc206dGV4dC14c1wiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbGVhclRpY2tldFNlbGVjdGlvbn1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtsaW5rRmxvd0J1c3kgfHwgc2VsZWN0QWxsQnVzeSB8fCBzZWxlY3RlZFRpY2tldENvdW50IDwgMX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0NsZWFyQWxsXCIsIFwiQm9ycmFyIHNlbGVjY2lvblwiKX1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBpc0xvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XG4gICAgICA+XG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7ZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntlcnJvck1lc3NhZ2V9PC9kaXY+IDogbnVsbH1cblxuICAgICAgeyFpc0xvYWRpbmcgJiYgIWVycm9yTWVzc2FnZSAmJiBpdGVtcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtYm94IHRpbWVsaW5lLWVtcHR5XCIgZGF0YS1lbXB0eS10ZXh0PXtpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIil9IC8+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgeyFlcnJvck1lc3NhZ2UgJiYgaXRlbXMubGVuZ3RoID4gMCA/IChcbiAgICAgICAgPGRpdiByZWY9e3RpbWVsaW5lQ29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cbiAgICAgICAgICB7aXRlbXMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChpdGVtLmZpbGVJZCk7XG4gICAgICAgICAgICBjb25zdCBkYXRlUGFydHMgPSBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzKGl0ZW0udHJhbnNEYXRlLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIik7XG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IHNhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pIHx8IHNhZmVUZXh0KGl0ZW0uZmlsZU5hbWUpIHx8IGZpbGVJZCB8fCBcIi1cIjtcbiAgICAgICAgICAgIGNvbnN0IGFtb3VudFRleHQgPSBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koaXRlbS50b3RhbEFtb3VudCA/PyBudWxsLCBzYWZlVGV4dChpdGVtLmN1cnJlbmN5Q29kZSkpO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzQ29kZSA9IGl0ZW0uc3RhdHVzO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzTGFiZWwgPSBnZXRFeHBlbnNlVGlja2V0U3RhdHVzTGFiZWwoc3RhdHVzQ29kZSk7XG4gICAgICAgICAgICBjb25zdCBpc0Fzc2lnbmVkVG9FeHBlbnNlU2hlZXQgPSBzdGF0dXNDb2RlID09PSAxO1xuICAgICAgICAgICAgY29uc3Qgc2hvd1Byb2Nlc3NlZEJ5QWlJY29uID0gaXRlbS5wcm9jZXNzZWRCeUFJID09PSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RhYmxlSW5MaW5rTW9kZSA9IGlzTGlua01vZGUgJiYgY2FuU2VsZWN0VGlja2V0Rm9yTGluayhpdGVtKTtcbiAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWRJbkxpbmtNb2RlID0gaXNMaW5rTW9kZSAmJiBpc1RpY2tldFNlbGVjdGVkKGZpbGVJZCk7XG4gICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRCeUFpTGFiZWwgPSBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQVwiLCBcIlByb2Nlc3NlZCBieSBJQVwiKTtcbiAgICAgICAgICAgIGNvbnN0IGdhc3RvVHlwZUNvZGUgPSBpdGVtLmdhc3RvVHlwZSA9PT0gbnVsbCA/IFwiXCIgOiBTdHJpbmcoaXRlbS5nYXN0b1R5cGUpO1xuICAgICAgICAgICAgY29uc3QgZ2FzdG9UeXBlTGFiZWwgPSBnYXN0b1R5cGVDb2RlXG4gICAgICAgICAgICAgID8gZ2FzdG9UeXBlTGFiZWxNYXAuZ2V0KGdhc3RvVHlwZUNvZGUpIHx8IGdhc3RvVHlwZUNvZGVcbiAgICAgICAgICAgICAgOiBpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRTdWJ0aXRsZSA9IGdhc3RvVHlwZUxhYmVsO1xuICAgICAgICAgICAgY29uc3QgYmFzZVN0YXR1c0ljb25zID0gaXNBc3NpZ25lZFRvRXhwZW5zZVNoZWV0IHx8IHNob3dQcm9jZXNzZWRCeUFpSWNvbiA/IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICB7aXNBc3NpZ25lZFRvRXhwZW5zZVNoZWV0ID8gKFxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb25cIiByb2xlPVwiaW1nXCIgYXJpYS1sYWJlbD17c3RhdHVzTGFiZWx9PlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTQgdy00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNMTMuMTkgOC42ODhhNC41IDQuNSAwIDAgMSAxLjI0MiA3LjI0NGwtNC41IDQuNWE0LjUgNC41IDAgMCAxLTYuMzY0LTYuMzY0bDEuNzU3LTEuNzU3bTEzLjM1LS42MjIgMS43NTctMS43NTdhNC41IDQuNSAwIDAgMC02LjM2NC02LjM2NGwtNC41IDQuNWE0LjUgNC41IDAgMCAwIDEuMjQyIDcuMjQ0XCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICB7c2hvd1Byb2Nlc3NlZEJ5QWlJY29uID8gKFxuICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb24gZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb24tLWFpXCJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cImltZ1wiXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3Byb2Nlc3NlZEJ5QWlMYWJlbH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezEuNX0gc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPVwiaC00IHctNFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTQgMThsNC0xMmw0IDEyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk02IDEzaDRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDZoNlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTcgNnYxMlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMThoNlwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICkgOiBudWxsO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uQ29udHJvbCA9IGlzTGlua01vZGUgPyAoXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IC1tLTEgaC02IHctNiBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBjaGVja2VkPXtpc1NlbGVjdGVkSW5MaW5rTW9kZX1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaXNTZWxlY3RhYmxlSW5MaW5rTW9kZSB8fCBsaW5rRmxvd0J1c3kgfHwgbGlua1NoZWV0Q2hlY2tCdXN5IHx8IGxpbmtTaGVldExvY2tlZH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtNCB3LTQgY3Vyc29yLXBvaW50ZXIgYWNjZW50LXByaW1hcnkgcG9pbnRlci1ldmVudHMtYXV0b1wiXG4gICAgICAgICAgICAgICAgICBvblBvaW50ZXJEb3duPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtMaW5rTW9kZVNlbGVjdGlvbkludGVudCgpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIG9uTW91c2VEb3duPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtMaW5rTW9kZVNlbGVjdGlvbkludGVudCgpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgbWFya0xpbmtNb2RlU2VsZWN0aW9uSW50ZW50KCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbWFya0xpbmtNb2RlU2VsZWN0aW9uSW50ZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZVRpY2tldFNlbGVjdGlvbihpdGVtKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfU2VsZWN0VGlja2V0XCIsIFwiU2VsZWNjaW9uYXIgdGlja2V0XCIpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICkgOiBudWxsO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzSWNvbnMgPSBpc0xpbmtNb2RlID8gKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIHtzZWxlY3Rpb25Db250cm9sfVxuICAgICAgICAgICAgICAgIHtiYXNlU3RhdHVzSWNvbnN9XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKSA6IGJhc2VTdGF0dXNJY29ucztcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1c0ljb25DbGFzc05hbWUgPSBpc0xpbmtNb2RlXG4gICAgICAgICAgICAgID8gXCJleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvbnMgcG9pbnRlci1ldmVudHMtYXV0b1wiXG4gICAgICAgICAgICAgIDogXCJleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvbnNcIjtcbiAgICAgICAgICAgIGNvbnN0IHRpY2tldENhcmRLZXkgPVxuICAgICAgICAgICAgICBmaWxlSWQgfHxcbiAgICAgICAgICAgICAgYCR7c2FmZVRleHQoaXRlbS5maWxlTmFtZSl9LSR7c2FmZVRleHQoaXRlbS50cmFuc0RhdGUpfS0ke3NhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pfS0ke1N0cmluZyhpdGVtLnRvdGFsQW1vdW50ID8/IFwiXCIpfWA7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e3RpY2tldENhcmRLZXl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtpc1NlbGVjdGVkSW5MaW5rTW9kZSA/IFwidGltZWxpbmUtaXRlbSByb3VuZGVkLTJ4bCByaW5nLTIgcmluZy1wcmltYXJ5LzMwXCIgOiBcInRpbWVsaW5lLWl0ZW1cIn1cbiAgICAgICAgICAgICAgICBkYXRhLXRpY2tldC1maWxlLWlkPXtmaWxlSWQgfHwgdW5kZWZpbmVkfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPEV4cGVuc2VUaW1lbGluZUNhcmRcbiAgICAgICAgICAgICAgICAgIGRhdGVQYXJ0cz17ZGF0ZVBhcnRzfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgICAgICAgICAgc3VidGl0bGU9e2NhcmRTdWJ0aXRsZX1cbiAgICAgICAgICAgICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XG4gICAgICAgICAgICAgICAgICBvbk9wZW49eygpID0+IG9wZW5UaWNrZXREZXRhaWwoZmlsZUlkKX1cbiAgICAgICAgICAgICAgICAgIHRpdGxlQ2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fdGl0bGUgdGltZWxpbmUtbmFtZVwiXG4gICAgICAgICAgICAgICAgICBzdGF0dXNMYWJlbD17c3RhdHVzTGFiZWx9XG4gICAgICAgICAgICAgICAgICBzdGF0dXNJY29uPXtzdGF0dXNJY29uc31cbiAgICAgICAgICAgICAgICAgIHN0YXR1c0ljb25DbGFzc05hbWU9e3N0YXR1c0ljb25DbGFzc05hbWV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICA8Q29tcGFjdFBhZ2luYXRpb25cbiAgICAgICAgdG90YWxQYWdlcz17dG90YWxQYWdlc31cbiAgICAgICAgY3VycmVudFBhZ2U9e2N1cnJlbnRQYWdlfVxuICAgICAgICBsb2FkaW5nPXtpc0xvYWRpbmd9XG4gICAgICAgIG9uUGFnZUNoYW5nZT17KHBhZ2UpID0+IHtcbiAgICAgICAgICBjb25zdCBzbmFwc2hvdCA9IHJlc29sdmVBY3RpdmVGaWx0ZXJzKCk7XG4gICAgICAgICAgaWYgKCFpc0xpbmtNb2RlICYmICghc25hcHNob3Q/LmZyb21EYXRlIHx8ICFzbmFwc2hvdD8udG9EYXRlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZvaWQgbG9hZExpc3QocGFnZSwgc25hcHNob3QpO1xuICAgICAgICB9fVxuICAgICAgICBsYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XG4gICAgICAvPlxuXG4gICAgICB7aXNMaW5rTW9kZSAmJiBjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiAhbGlua1NoZWV0TG9ja2VkID8gKFxuICAgICAgICA8UGFnZUJvdHRvbUFjdGlvbnMgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfTGlua0J1dHRvblwiLCBcIlZpbmN1bGFyIHRpY2tldChzKVwiKX0+XG4gICAgICAgICAgPFBhZ2VCb3R0b21BY3Rpb25CdXR0b25cbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfTGlua0J1dHRvblwiLCBcIlZpbmN1bGFyIHRpY2tldChzKVwiKX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e29wZW5MaW5rQ29uZmlybU1vZGFsfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2xpbmtGbG93QnVzeSB8fCBzZWxlY3RBbGxCdXN5IHx8IHNlbGVjdGVkVGlja2V0Q291bnQgPCAxfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvUGFnZUJvdHRvbUFjdGlvbnM+XG4gICAgICApIDogbnVsbH1cblxuICAgICAge2NhbkNyZWF0ZVRpY2tldCAmJiAhaXNMaW5rTW9kZSA/IChcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJhcGlkYXNcIil9XG4gICAgICAgICAgc2l6ZT17NzZ9XG4gICAgICAgICAgcmlnaHQ9ezE2fVxuICAgICAgICAgIGJvdHRvbT17MjR9XG4gICAgICAgICAgbWVudUFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0FjdGlvbnNcIiwgXCJBY2Npb25lcyByYXBpZGFzXCIpfVxuICAgICAgICAgIG1lbnVJdGVtcz17ZmFiTWVudUl0ZW1zfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2UgdGlja2V0cyBsaXN0LlxuY29uc3QgRXhwZW5zZVRpY2tldHNQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cbiAgICAgIDxFeHBlbnNlVGlja2V0c1BhZ2VDb250ZW50IC8+XG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgKTtcbn07XG5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2UtdGlja2V0cy1yb290XCIpO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VUaWNrZXRzUGFnZSAvPik7XG59O1xuXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldHNQYWdlO1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcbmltcG9ydCB0eXBlIHsgQXV0aE1hbmFnZWRVc2VyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi4vLi4vdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVN1bW1hcnkudHN4XCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHtcbiAgZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlck9wdGlvbnMsXG4gIG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlLFxuICB0eXBlIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VUaWNrZXRTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsIEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkIH0gZnJvbSBcIi4uL3RpY2tldHMvZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZURhdGVSYW5nZUZpbHRlciBmcm9tIFwiLi9FeHBlbnNlRGF0ZVJhbmdlRmlsdGVyLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VGaWx0ZXJBY3Rpb25zIGZyb20gXCIuL0V4cGVuc2VGaWx0ZXJBY3Rpb25zLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMgZnJvbSBcIi4vRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0IGZyb20gXCIuL0V4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dC50c3hcIjtcblxuY29uc3QgcGFyc2VJc29EYXRlID0gKHJhdzogc3RyaW5nKTogRGF0ZSB8IG51bGwgPT4ge1xuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKHJhdykudHJpbSgpLnNwbGl0KFwiVFwiKVswXTtcbiAgaWYgKCEvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdCh2YWx1ZSkpIHJldHVybiBudWxsO1xuICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSB2YWx1ZS5zcGxpdChcIi1cIikubWFwKE51bWJlcik7XG4gIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG59O1xuXG5jb25zdCBmb3JtYXREYXRlID0gKHJhdzogc3RyaW5nLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGRhdGUgPSBwYXJzZUlzb0RhdGUocmF3KTtcbiAgaWYgKCFkYXRlKSByZXR1cm4gXCItLVwiO1xuICByZXR1cm4gZGF0ZVxuICAgIC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7XG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxuICAgICAgbW9udGg6IFwic2hvcnRcIixcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgIH0pXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xufTtcblxudHlwZSBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbFByb3BzID0ge1xuICB2aXNpYmxlOiBib29sZWFuO1xuICBzaG93TWFudWFsRGF0ZUZpbHRlcjogYm9vbGVhbjtcbiAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5OiBudW1iZXI7XG4gIGZyb21EYXRlOiBzdHJpbmc7XG4gIHRvRGF0ZTogc3RyaW5nO1xuICBmaWx0ZXJLZXk6IHN0cmluZztcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIG1hbmFnZWRVc2VySWQ6IHN0cmluZztcbiAgbWFuYWdlZFVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXTtcbiAgc2hvd01hbmFnZWRVc2VyRmlsdGVyOiBib29sZWFuO1xuICBzdGF0dXNGaWx0ZXI6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlO1xuICBnYXN0b1R5cGVGaWx0ZXI6IFwiXCIgfCBFeHBlbnNlR2FzdG9UeXBlQ29kZTtcbiAgcHJvY2Vzc2VkQnlJYUZpbHRlcjogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXI7XG4gIGFjdGl2ZVF1aWNrRmlsdGVyOiBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCB8IG51bGw7XG4gIHNob3dNYW51YWxEYXRlRXJyb3I6IGJvb2xlYW47XG4gIHN0YXR1c0ZpbHRlclJlYWRPbmx5PzogYm9vbGVhbjtcbiAgZml4ZWRTdGF0dXNGaWx0ZXI/OiAwIHwgMSB8IG51bGw7XG4gIGdhc3RvVHlwZU9wdGlvbnM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXTtcbiAgb25EYXRlUmFuZ2VDaGFuZ2U6IChmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25NYW51YWxSYW5nZUNvbXBsZXRlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uUXVpY2tGaWx0ZXJDaGFuZ2U6IChmaWx0ZXJJZDogRXhwZW5zZVRpY2tldFF1aWNrRmlsdGVySWQpID0+IHZvaWQ7XG4gIG9uRmlsdGVyS2V5Q2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbk1hbmFnZWRVc2VySWRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvblN0YXR1c0ZpbHRlckNoYW5nZTogKHZhbHVlOiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSkgPT4gdm9pZDtcbiAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogXCJcIiB8IEV4cGVuc2VHYXN0b1R5cGVDb2RlKSA9PiB2b2lkO1xuICBvblByb2Nlc3NlZEJ5SWFGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIpID0+IHZvaWQ7XG4gIG9uQ2xlYXI6ICgpID0+IHZvaWQ7XG4gIG9uQXBwbHk6ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBTaGFyZWQgdGlja2V0cyBmaWx0ZXIgcGFuZWwgd2l0aCBnbG9iYWwgcXVpY2sgZGF0ZSBmaWx0ZXJzIGFuZCBmaXhlZCB0aWNrZXQgZmlsdGVycy5cbmNvbnN0IEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsID0gKHtcbiAgdmlzaWJsZSxcbiAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXG4gIG1hbnVhbERhdGVBdXRvT3BlbktleSxcbiAgZnJvbURhdGUsXG4gIHRvRGF0ZSxcbiAgZmlsdGVyS2V5LFxuICBjdXJyZW5jeUNvZGUsXG4gIG1hbmFnZWRVc2VySWQsXG4gIG1hbmFnZWRVc2VycyxcbiAgc2hvd01hbmFnZWRVc2VyRmlsdGVyLFxuICBzdGF0dXNGaWx0ZXIsXG4gIGdhc3RvVHlwZUZpbHRlcixcbiAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gIHN0YXR1c0ZpbHRlclJlYWRPbmx5ID0gZmFsc2UsXG4gIGZpeGVkU3RhdHVzRmlsdGVyID0gbnVsbCxcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcbiAgb25EYXRlUmFuZ2VDaGFuZ2UsXG4gIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcbiAgb25RdWlja0ZpbHRlckNoYW5nZSxcbiAgb25GaWx0ZXJLZXlDaGFuZ2UsXG4gIG9uQ3VycmVuY3lDb2RlQ2hhbmdlLFxuICBvbk1hbmFnZWRVc2VySWRDaGFuZ2UsXG4gIG9uU3RhdHVzRmlsdGVyQ2hhbmdlLFxuICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZSxcbiAgb25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlLFxuICBvbkNsZWFyLFxuICBvbkFwcGx5LFxufTogRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWxQcm9wcykgPT4ge1xuICBjb25zdCBzdGF0dXNPcHRpb25zID0gdXNlTWVtbygoKSA9PiBnZXRFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyT3B0aW9ucygpLCBbXSk7XG5cbiAgY29uc3QgY2F0ZWdvcnlPcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KCgpID0+IHtcbiAgICByZXR1cm4gW1xuICAgICAgeyB2YWx1ZTogXCJcIiwgdGV4dDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0FsbFwiLCBcIkFsbFwiKSB9LFxuICAgICAgLi4uZ2FzdG9UeXBlT3B0aW9ucyxcbiAgICBdO1xuICB9LCBbZ2FzdG9UeXBlT3B0aW9uc10pO1xuXG4gIGlmICghdmlzaWJsZSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGxvY2FsZSA9IGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiO1xuICBjb25zdCBzaG93SW5saW5lRGF0ZVN1bW1hcnkgPSAhc2hvd01hbnVhbERhdGVGaWx0ZXIgJiYgISFmcm9tRGF0ZSAmJiAhIXRvRGF0ZTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLWV4cGFuZGVkIHAtMiBzbTpwLTIuNSByZWxhdGl2ZVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdGFjayBmbGV4IGZsZXgtY29sIHNwYWNlLXktMlwiPlxuICAgICAgICA8RXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMgYWN0aXZlUXVpY2tGaWx0ZXI9e2FjdGl2ZVF1aWNrRmlsdGVyfSBvblF1aWNrRmlsdGVyQ2hhbmdlPXtvblF1aWNrRmlsdGVyQ2hhbmdlfSAvPlxuXG4gICAgICAgIHtzaG93TWFudWFsRGF0ZUZpbHRlciA/IChcbiAgICAgICAgICA8RXhwZW5zZURhdGVSYW5nZUZpbHRlclxuICAgICAgICAgICAgZnJvbURhdGU9e2Zyb21EYXRlfVxuICAgICAgICAgICAgdG9EYXRlPXt0b0RhdGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25EYXRlUmFuZ2VDaGFuZ2V9XG4gICAgICAgICAgICBvblJhbmdlQ29tcGxldGU9e29uTWFudWFsUmFuZ2VDb21wbGV0ZX1cbiAgICAgICAgICAgIGF1dG9PcGVuUmVxdWVzdElkPXttYW51YWxEYXRlQXV0b09wZW5LZXl9XG4gICAgICAgICAgICBzaG93TWFudWFsRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3J9XG4gICAgICAgICAgICBzaG93U3RhcnRFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvciAmJiAhZnJvbURhdGV9XG4gICAgICAgICAgICBzaG93RW5kRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3IgJiYgIXRvRGF0ZX1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogc2hvd0lubGluZURhdGVTdW1tYXJ5ID8gKFxuICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxuICAgICAgICAgICAgc3VtbWFyeUZyb21MYWJlbD17aW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIil9XG4gICAgICAgICAgICBzdW1tYXJ5VG9MYWJlbD17aW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKX1cbiAgICAgICAgICAgIGZyb21WYWx1ZT17Zm9ybWF0RGF0ZShmcm9tRGF0ZSwgbG9jYWxlKX1cbiAgICAgICAgICAgIHRvVmFsdWU9e2Zvcm1hdERhdGUodG9EYXRlLCBsb2NhbGUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ2FwLXktMSB0ZXh0LVsxMXB4XSBweC0xXCJcbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgJHtzaG93TWFuYWdlZFVzZXJGaWx0ZXIgPyBcImxnOmdyaWQtY29scy02XCIgOiBcImxnOmdyaWQtY29scy01XCJ9IGdhcC0yYH0+XG4gICAgICAgICAgPEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9GaWx0ZXJLZXlcIiwgXCJUaWNrZXRcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX0ZpbHRlcktleVwiLCBcIlRpY2tldFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtmaWx0ZXJLZXl9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25GaWx0ZXJLZXlDaGFuZ2V9XG4gICAgICAgICAgICBlbmFibGVSZW1vdGVTdWdnZXN0aW9uc1xuICAgICAgICAgICAgZml4ZWRTdGF0dXNGaWx0ZXI9e2ZpeGVkU3RhdHVzRmlsdGVyfVxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgdmFsdWU9e2N1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkN1cnJlbmN5Q29kZUNoYW5nZX1cbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICBzaG93TG9hZGluZ1N0YXRlVGV4dD17ZmFsc2V9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIHtzaG93TWFuYWdlZFVzZXJGaWx0ZXIgPyAoXG4gICAgICAgICAgICA8RXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0XG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiQ29tbW9uX1VzZXJcIiwgXCJVc2VyXCIpfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkNvbW1vbl9Vc2VyXCIsIFwiVXNlclwiKX1cbiAgICAgICAgICAgICAgdmFsdWU9e21hbmFnZWRVc2VySWR9XG4gICAgICAgICAgICAgIHVzZXJzPXttYW5hZ2VkVXNlcnN9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbk1hbmFnZWRVc2VySWRDaGFuZ2V9XG4gICAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX1N0YXR1c1wiLCBcIlN0YXR1c1wiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfVxuICAgICAgICAgICAgb3B0aW9ucz17c3RhdHVzT3B0aW9uc31cbiAgICAgICAgICAgIHZhbHVlPXtzdGF0dXNGaWx0ZXJ9XG4gICAgICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4gb25TdGF0dXNGaWx0ZXJDaGFuZ2Uobm9ybWFsaXplRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUobmV4dFZhbHVlLCBcIlwiKSl9XG4gICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICAgICAgICBkaXNhYmxlZD17c3RhdHVzRmlsdGVyUmVhZE9ubHl9XG4gICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLXRpY2tldC1zdGF0dXMtZmlsdGVyXCJcbiAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cbiAgICAgICAgICAgIG9wdGlvbnM9e2NhdGVnb3J5T3B0aW9uc31cbiAgICAgICAgICAgIHZhbHVlPXtnYXN0b1R5cGVGaWx0ZXJ9XG4gICAgICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBOdW1iZXIobmV4dFZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKG5leHRWYWx1ZSA9PT0gXCJcIiB8fCAhTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpKSB7XG4gICAgICAgICAgICAgICAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2UoXCJcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlKHBhcnNlZCBhcyBFeHBlbnNlR2FzdG9UeXBlQ29kZSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS10aWNrZXQtZ2FzdG90eXBlLWZpbHRlclwiXG4gICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIil9XG4gICAgICAgICAgICB2YWx1ZT17cHJvY2Vzc2VkQnlJYUZpbHRlcn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvblByb2Nlc3NlZEJ5SWFGaWx0ZXJDaGFuZ2V9XG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxFeHBlbnNlRmlsdGVyQWN0aW9uc1xuICAgICAgICAgIGNsZWFyTGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGVhclwiLCBcIkNsZWFyXCIpfVxuICAgICAgICAgIGFwcGx5TGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9BcHBseVwiLCBcIkFwcGx5XCIpfVxuICAgICAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XG4gICAgICAgICAgb25BcHBseT17b25BcHBseX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWw7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIgfSBmcm9tIFwiLi4vdGlja2V0cy9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3RQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmFsdWU6IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyO1xuICBvbkNoYW5nZTogKHZhbHVlOiBFeHBlbnNlVGlja2V0UHJvY2Vzc2VkQnlJYUZpbHRlcikgPT4gdm9pZDtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG59O1xuXG4vLyBGaXhlZCBlbnVtIHNlbGVjdCBmb3IgSUEgcHJvY2Vzc2luZyBmaWx0ZXIgd2l0aCBBbGwvWWVzL05vIG9wdGlvbnMuXG5jb25zdCBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdCA9ICh7XG4gIGxhYmVsLFxuICBwbGFjZWhvbGRlcixcbiAgdmFsdWUsXG4gIG9uQ2hhbmdlLFxuICByZWFkT25seSA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICBzaG93TGFiZWwgPSB0cnVlLFxufTogRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3RQcm9wcykgPT4ge1xuICBjb25zdCB1aVZhbHVlID0gdmFsdWUgPT09IFwiYWxsXCIgPyBcIlwiIDogdmFsdWU7XG4gIGNvbnN0IG9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXG4gICAgKCkgPT4gW1xuICAgICAgeyB2YWx1ZTogXCJhbGxcIiwgdGV4dDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0FsbFwiLCBcIkFsbFwiKSB9LFxuICAgICAgeyB2YWx1ZTogXCJ5ZXNcIiwgdGV4dDogaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFfWWVzXCIsIFwiWWVzXCIpIH0sXG4gICAgICB7IHZhbHVlOiBcIm5vXCIsIHRleHQ6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBX05vXCIsIFwiTm9cIikgfSxcbiAgICBdLFxuICAgIFtdXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICB2YWx1ZT17dWlWYWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChuZXh0VmFsdWUgPT09IFwieWVzXCIgfHwgbmV4dFZhbHVlID09PSBcIm5vXCIgfHwgbmV4dFZhbHVlID09PSBcImFsbFwiKSB7XG4gICAgICAgICAgb25DaGFuZ2UobmV4dFZhbHVlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgb25DaGFuZ2UoXCJhbGxcIik7XG4gICAgICB9fVxuICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgaWRCYXNlPVwiZXhwZW5zZS1wcm9jZXNzZWQtYnktaWEtZmlsdGVyXCJcbiAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3Q7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVtb3RlU2VhcmNoQ29tYm9ib3gsIHsgdHlwZSBSZW1vdGVTZWFyY2hPcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1JlbW90ZVNlYXJjaENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvLCBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuXG50eXBlIEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zPzogYm9vbGVhbjtcbiAgZml4ZWRTdGF0dXNGaWx0ZXI/OiAwIHwgMSB8IG51bGw7XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xufTtcblxuY29uc3QgU0VBUkNIX1BBR0VfU0laRSA9IDMwO1xuXG4vLyBCdWlsZHMgbWluaW1hbCBwYXlsb2FkIGZvciB0aWNrZXQga2V5IHN1Z2dlc3Rpb25zIHdpdGhvdXQgZGF0ZSBmaWx0ZXJzLlxuY29uc3QgYnVpbGRUaWNrZXRTdWdnZXN0UGF5bG9hZCA9IChcbiAgdGVybTogc3RyaW5nLFxuICBwYWdlOiBudW1iZXIsXG4gIHBhZ2VTaXplOiBudW1iZXIsXG4gIGZpeGVkU3RhdHVzRmlsdGVyOiAwIHwgMSB8IG51bGxcbik6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0ID0+IHtcbiAgY29uc3Qgc2FmZVRlcm0gPSBTdHJpbmcodGVybSB8fCBcIlwiKS50cmltKCk7XG4gIHJldHVybiB7XG4gICAgcGFnZTogTnVtYmVyLmlzRmluaXRlKHBhZ2UpICYmIHBhZ2UgPiAwID8gTWF0aC5mbG9vcihwYWdlKSA6IDEsXG4gICAgcGFnZVNpemU6IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gTWF0aC5mbG9vcihwYWdlU2l6ZSkgOiBTRUFSQ0hfUEFHRV9TSVpFLFxuICAgIHNlYXJjaEtleTogc2FmZVRlcm0gfHwgdW5kZWZpbmVkLFxuICAgIGZpbHRlcjogc2FmZVRlcm0gfHwgdW5kZWZpbmVkLFxuICAgIHN0YXR1czogZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDAgfHwgZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDEgPyBmaXhlZFN0YXR1c0ZpbHRlciA6IHVuZGVmaW5lZCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcFRpY2tldE9wdGlvbnMgPSAoaXRlbXM6IEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvW10gfCB1bmRlZmluZWQpOiBSZW1vdGVTZWFyY2hPcHRpb25bXSA9PiB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcyA6IFtdKVxuICAgIC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGZpbGVJZCA9IFN0cmluZyhpdGVtPy5GaWxlSWQgfHwgXCJcIikudHJpbSgpO1xuICAgICAgaWYgKCFmaWxlSWQpIHJldHVybiBudWxsO1xuXG4gICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IFN0cmluZyhpdGVtPy5EZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XG4gICAgICBjb25zdCBzdWJ0aXRsZSA9IGRlc2NyaXB0aW9uIHx8IFwiLVwiO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IGZpbGVJZCxcbiAgICAgICAgdGl0bGU6IGZpbGVJZCxcbiAgICAgICAgc3VidGl0bGUsXG4gICAgICB9IGFzIFJlbW90ZVNlYXJjaE9wdGlvbjtcbiAgICB9KVxuICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgUmVtb3RlU2VhcmNoT3B0aW9uW107XG59O1xuXG4vLyBUaWNrZXQga2V5IGZpbHRlciBpbnB1dCB3aXRoIHJlbW90ZSBsaXN0IHN1Z2dlc3Rpb25zLlxuY29uc3QgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zID0gdHJ1ZSxcbiAgZml4ZWRTdGF0dXNGaWx0ZXIgPSBudWxsLFxuICByZWFkT25seSA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICBzaG93TGFiZWwgPSB0cnVlLFxufTogRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0UHJvcHMpID0+IHtcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XG5cbiAgY29uc3QgbG9hZE9wdGlvbnMgPSB1c2VDYWxsYmFjayhhc3luYyAodGVybTogc3RyaW5nLCBzaWduYWw6IEFib3J0U2lnbmFsKTogUHJvbWlzZTxSZW1vdGVTZWFyY2hPcHRpb25bXT4gPT4ge1xuICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZFRpY2tldFN1Z2dlc3RQYXlsb2FkKHRlcm0sIDEsIFNFQVJDSF9QQUdFX1NJWkUsIGZpeGVkU3RhdHVzRmlsdGVyKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdChwYXlsb2FkLCB7XG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgIHNpZ25hbCxcbiAgICB9KTtcblxuICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwVGlja2V0T3B0aW9ucyhyZXNwb25zZT8uSXRlbXMpO1xuICB9LCBbZml4ZWRTdGF0dXNGaWx0ZXJdKTtcblxuICBjb25zdCBsb2FkT3B0aW9uc1BhZ2UgPSB1c2VDYWxsYmFjayhhc3luYyAodGVybTogc3RyaW5nLCBwYWdlOiBudW1iZXIsIF9wYWdlU2l6ZTogbnVtYmVyLCBzaWduYWw6IEFib3J0U2lnbmFsKSA9PiB7XG4gICAgY29uc3QgcGF5bG9hZCA9IGJ1aWxkVGlja2V0U3VnZ2VzdFBheWxvYWQodGVybSwgcGFnZSwgU0VBUkNIX1BBR0VfU0laRSwgZml4ZWRTdGF0dXNGaWx0ZXIpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0KHBheWxvYWQsIHtcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgc2lnbmFsLFxuICAgIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICB0b3RhbDogMCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zOiBtYXBUaWNrZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyksXG4gICAgICB0b3RhbDogTnVtYmVyKHJlc3BvbnNlPy5Ub3RhbCB8fCAwKSxcbiAgICB9O1xuICB9LCBbZml4ZWRTdGF0dXNGaWx0ZXJdKTtcblxuICBpZiAoIWVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zIHx8IHJlYWRPbmx5TW9kZSkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICB7c2hvd0xhYmVsID8gKFxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIiBzdHlsZT17eyBjb2xvcjogXCIjMDAyOTZiZTBcIiB9fT5cbiAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcHgtMyBweS0yIHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTkwMCBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCJcbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XG4gICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxSZW1vdGVTZWFyY2hDb21ib2JveFxuICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgb25TZWFyY2g9e2FzeW5jICh0ZXJtLCBzaWduYWwpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbG9hZE9wdGlvbnModGVybSwgc2lnbmFsKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9fVxuICAgICAgb25TZWFyY2hQYWdlPXthc3luYyAodGVybSwgcGFnZSwgcGFnZVNpemUsIHNpZ25hbCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBhd2FpdCBsb2FkT3B0aW9uc1BhZ2UodGVybSwgcGFnZSwgcGFnZVNpemUsIHNpZ25hbCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgcmV0dXJuIHsgaXRlbXM6IFtdLCB0b3RhbDogMCB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICAgIGlkQmFzZT1cImV4cGVuc2UtdGlja2V0LWZpbHRlci1rZXlcIlxuICAgICAgbWluU2VhcmNoTGVuZ3RoPXswfVxuICAgICAgcGFnZVNpemU9e1NFQVJDSF9QQUdFX1NJWkV9XG4gICAgICBhbGxvd0VtcHR5U2VhcmNoXG4gICAgICBsb2FkT25PcGVuXG4gICAgICBpbmZpbml0ZVNjcm9sbFxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XG4gICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dDtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUge1xuICBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxuICBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCxcbn0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VUaWNrZXRTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgeyBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdC50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlQXJncyA9IHtcbiAgb25BcHBseUZpbHRlcnM6IChzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4gdm9pZDtcbiAgb25DbGVhckZpbHRlcnM6ICgpID0+IHZvaWQ7XG4gIGRlZmF1bHRNYW5hZ2VkVXNlcklkOiBzdHJpbmc7XG4gIGZpeGVkU3RhdHVzRmlsdGVyPzogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUgfCBudWxsO1xuICBhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5PzogYm9vbGVhbjtcbn07XG5cbi8vIE93bnMgZmlsdGVyIFVJIHN0YXRlIGFuZCBhcHBseS9jbGVhciBydWxlcyBmb3IgZXhwZW5zZSB0aWNrZXRzIGxpc3QgcGFnZS5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZSA9ICh7XG4gIG9uQXBwbHlGaWx0ZXJzLFxuICBvbkNsZWFyRmlsdGVycyxcbiAgZGVmYXVsdE1hbmFnZWRVc2VySWQsXG4gIGZpeGVkU3RhdHVzRmlsdGVyID0gbnVsbCxcbiAgYWxsb3dFbXB0eURhdGVzT25BcHBseSA9IGZhbHNlLFxufTogVXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGVBcmdzKSA9PiB7XG4gIGNvbnN0IGhhc0ZpeGVkU3RhdHVzRmlsdGVyID0gZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDAgfHwgZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDE7XG5cbiAgY29uc3QgcmVzb2x2ZVN0YXR1c0ZpbHRlciA9IHVzZUNhbGxiYWNrKFxuICAgICh2YWx1ZTogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpOiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSA9PiB7XG4gICAgICBpZiAoaGFzRml4ZWRTdGF0dXNGaWx0ZXIpIHtcbiAgICAgICAgcmV0dXJuIGZpeGVkU3RhdHVzRmlsdGVyIGFzIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgW2ZpeGVkU3RhdHVzRmlsdGVyLCBoYXNGaXhlZFN0YXR1c0ZpbHRlcl1cbiAgKTtcblxuICBjb25zdCBbZnJvbURhdGUsIHNldEZyb21EYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbdG9EYXRlLCBzZXRUb0RhdGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtmaWx0ZXJLZXksIHNldEZpbHRlcktleV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2N1cnJlbmN5Q29kZSwgc2V0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFuYWdlZFVzZXJJZCwgc2V0TWFuYWdlZFVzZXJJZF0gPSB1c2VTdGF0ZShkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XG4gIGNvbnN0IFtzdGF0dXNGaWx0ZXJSYXcsIHNldFN0YXR1c0ZpbHRlclJhd10gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZT4ocmVzb2x2ZVN0YXR1c0ZpbHRlcihcIlwiKSk7XG4gIGNvbnN0IFtnYXN0b1R5cGVGaWx0ZXIsIHNldEdhc3RvVHlwZUZpbHRlcl0gPSB1c2VTdGF0ZTxcIlwiIHwgRXhwZW5zZUdhc3RvVHlwZUNvZGU+KFwiXCIpO1xuICBjb25zdCBbcHJvY2Vzc2VkQnlJYUZpbHRlciwgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcl0gPSB1c2VTdGF0ZTxcImFsbFwiIHwgXCJ5ZXNcIiB8IFwibm9cIj4oXCJhbGxcIik7XG4gIGNvbnN0IFthY3RpdmVRdWlja0ZpbHRlciwgc2V0QWN0aXZlUXVpY2tGaWx0ZXJdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldFF1aWNrRmlsdGVySWQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3Nob3dNYW51YWxEYXRlRmlsdGVyLCBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93TWFudWFsRGF0ZUVycm9yLCBzZXRTaG93TWFudWFsRGF0ZUVycm9yXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW21hbnVhbERhdGVBdXRvT3BlbktleSwgc2V0TWFudWFsRGF0ZUF1dG9PcGVuS2V5XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbYXBwbGllZEZpbHRlcnMsIHNldEFwcGxpZWRGaWx0ZXJzXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3Nob3dGaWx0ZXJzLCBzZXRTaG93RmlsdGVyc10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaGFzRml4ZWRTdGF0dXNGaWx0ZXIpIHJldHVybjtcbiAgICBzZXRTdGF0dXNGaWx0ZXJSYXcoZml4ZWRTdGF0dXNGaWx0ZXIgYXMgRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpO1xuICB9LCBbZml4ZWRTdGF0dXNGaWx0ZXIsIGhhc0ZpeGVkU3RhdHVzRmlsdGVyXSk7XG5cbiAgY29uc3Qgc3RhdHVzRmlsdGVyID0gcmVzb2x2ZVN0YXR1c0ZpbHRlcihzdGF0dXNGaWx0ZXJSYXcpO1xuXG4gIGNvbnN0IGN1cnJlbnRGaWx0ZXJzID0gdXNlTWVtbzxFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90PihcbiAgICAoKSA9PiAoe1xuICAgICAgZnJvbURhdGUsXG4gICAgICB0b0RhdGUsXG4gICAgICBmaWx0ZXJLZXk6IGZpbHRlcktleS50cmltKCksXG4gICAgICBjdXJyZW5jeUNvZGU6IGN1cnJlbmN5Q29kZS50cmltKCksXG4gICAgICBtYW5hZ2VkVXNlcklkOiBtYW5hZ2VkVXNlcklkLnRyaW0oKSxcbiAgICAgIHN0YXR1c0ZpbHRlcixcbiAgICAgIGdhc3RvVHlwZUZpbHRlcixcbiAgICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gICAgfSksXG4gICAgW2N1cnJlbmN5Q29kZSwgZmlsdGVyS2V5LCBmcm9tRGF0ZSwgZ2FzdG9UeXBlRmlsdGVyLCBtYW5hZ2VkVXNlcklkLCBwcm9jZXNzZWRCeUlhRmlsdGVyLCBzdGF0dXNGaWx0ZXIsIHRvRGF0ZV1cbiAgKTtcblxuICBjb25zdCBzZXRTdGF0dXNGaWx0ZXIgPSB1c2VDYWxsYmFjayhcbiAgICAodmFsdWU6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlKSA9PiB7XG4gICAgICBpZiAoaGFzRml4ZWRTdGF0dXNGaWx0ZXIpIHtcbiAgICAgICAgc2V0U3RhdHVzRmlsdGVyUmF3KGZpeGVkU3RhdHVzRmlsdGVyIGFzIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2V0U3RhdHVzRmlsdGVyUmF3KHZhbHVlKTtcbiAgICB9LFxuICAgIFtmaXhlZFN0YXR1c0ZpbHRlciwgaGFzRml4ZWRTdGF0dXNGaWx0ZXJdXG4gICk7XG5cbiAgY29uc3Qgb25BcHBseSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWFsbG93RW1wdHlEYXRlc09uQXBwbHkgJiYgKCFmcm9tRGF0ZSB8fCAhdG9EYXRlKSkge1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcih0cnVlKTtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKHRydWUpO1xuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgPSB7XG4gICAgICBmcm9tRGF0ZSxcbiAgICAgIHRvRGF0ZSxcbiAgICAgIGZpbHRlcktleTogZmlsdGVyS2V5LnRyaW0oKSxcbiAgICAgIGN1cnJlbmN5Q29kZTogY3VycmVuY3lDb2RlLnRyaW0oKSxcbiAgICAgIG1hbmFnZWRVc2VySWQ6IG1hbmFnZWRVc2VySWQudHJpbSgpLFxuICAgICAgc3RhdHVzRmlsdGVyLFxuICAgICAgZ2FzdG9UeXBlRmlsdGVyLFxuICAgICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgICB9O1xuXG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgc2V0QXBwbGllZEZpbHRlcnMoc25hcHNob3QpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XG4gICAgb25BcHBseUZpbHRlcnMoc25hcHNob3QpO1xuICB9LCBbXG4gICAgYWxsb3dFbXB0eURhdGVzT25BcHBseSxcbiAgICBjdXJyZW5jeUNvZGUsXG4gICAgZmlsdGVyS2V5LFxuICAgIGZyb21EYXRlLFxuICAgIGdhc3RvVHlwZUZpbHRlcixcbiAgICBtYW5hZ2VkVXNlcklkLFxuICAgIG9uQXBwbHlGaWx0ZXJzLFxuICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gICAgc3RhdHVzRmlsdGVyLFxuICAgIHRvRGF0ZSxcbiAgXSk7XG5cbiAgLy8gUmVoeWRyYXRlcyB0aWNrZXQgZmlsdGVycyBmcm9tIGEgY2FjaGVkIHNuYXBzaG90IHdoZW4gcmV0dXJuaW5nIGZyb20gZGV0YWlsLlxuICBjb25zdCByZXN0b3JlQXBwbGllZEZpbHRlcnMgPSB1c2VDYWxsYmFjayhcbiAgICAoc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpID0+IHtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3Qoc25hcHNob3QpO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZFN0YXR1c0ZpbHRlciA9IHJlc29sdmVTdGF0dXNGaWx0ZXIobm9ybWFsaXplZC5zdGF0dXNGaWx0ZXIpO1xuICAgICAgY29uc3QgcmVzdG9yZWRNYW5hZ2VkVXNlcklkID0gU3RyaW5nKG5vcm1hbGl6ZWQubWFuYWdlZFVzZXJJZCB8fCBkZWZhdWx0TWFuYWdlZFVzZXJJZCkudHJpbSgpO1xuICAgICAgc2V0RnJvbURhdGUobm9ybWFsaXplZC5mcm9tRGF0ZSk7XG4gICAgICBzZXRUb0RhdGUobm9ybWFsaXplZC50b0RhdGUpO1xuICAgICAgc2V0RmlsdGVyS2V5KG5vcm1hbGl6ZWQuZmlsdGVyS2V5KTtcbiAgICAgIHNldEN1cnJlbmN5Q29kZShub3JtYWxpemVkLmN1cnJlbmN5Q29kZSk7XG4gICAgICBzZXRNYW5hZ2VkVXNlcklkKHJlc3RvcmVkTWFuYWdlZFVzZXJJZCk7XG4gICAgICBzZXRTdGF0dXNGaWx0ZXJSYXcobm9ybWFsaXplZFN0YXR1c0ZpbHRlcik7XG4gICAgICBzZXRHYXN0b1R5cGVGaWx0ZXIobm9ybWFsaXplZC5nYXN0b1R5cGVGaWx0ZXIpO1xuICAgICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcihub3JtYWxpemVkLnByb2Nlc3NlZEJ5SWFGaWx0ZXIpO1xuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICAgIHNldEFwcGxpZWRGaWx0ZXJzKHtcbiAgICAgICAgLi4ubm9ybWFsaXplZCxcbiAgICAgICAgbWFuYWdlZFVzZXJJZDogcmVzdG9yZWRNYW5hZ2VkVXNlcklkLFxuICAgICAgICBzdGF0dXNGaWx0ZXI6IG5vcm1hbGl6ZWRTdGF0dXNGaWx0ZXIsXG4gICAgICB9KTtcbiAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcbiAgICB9LFxuICAgIFtkZWZhdWx0TWFuYWdlZFVzZXJJZCwgcmVzb2x2ZVN0YXR1c0ZpbHRlcl1cbiAgKTtcblxuICBjb25zdCBvbkNsZWFyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEZyb21EYXRlKFwiXCIpO1xuICAgIHNldFRvRGF0ZShcIlwiKTtcbiAgICBzZXRGaWx0ZXJLZXkoXCJcIik7XG4gICAgc2V0Q3VycmVuY3lDb2RlKFwiXCIpO1xuICAgIHNldE1hbmFnZWRVc2VySWQoZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICAgIHNldFN0YXR1c0ZpbHRlclJhdyhyZXNvbHZlU3RhdHVzRmlsdGVyKFwiXCIpKTtcbiAgICBzZXRHYXN0b1R5cGVGaWx0ZXIoXCJcIik7XG4gICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcihcImFsbFwiKTtcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgc2V0TWFudWFsRGF0ZUF1dG9PcGVuS2V5KDApO1xuICAgIHNldEFwcGxpZWRGaWx0ZXJzKG51bGwpO1xuICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xuICAgIG9uQ2xlYXJGaWx0ZXJzKCk7XG4gIH0sIFtkZWZhdWx0TWFuYWdlZFVzZXJJZCwgb25DbGVhckZpbHRlcnMsIHJlc29sdmVTdGF0dXNGaWx0ZXJdKTtcblxuICBjb25zdCBvbkRhdGVSYW5nZUNoYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgIChuZXh0RnJvbURhdGU6IHN0cmluZywgbmV4dFRvRGF0ZTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBoYXNGdWxsUmFuZ2UgPSAhIW5leHRGcm9tRGF0ZSAmJiAhIW5leHRUb0RhdGU7XG4gICAgICBzZXRGcm9tRGF0ZShuZXh0RnJvbURhdGUpO1xuICAgICAgc2V0VG9EYXRlKG5leHRUb0RhdGUpO1xuICAgICAgaWYgKCFoYXNGdWxsUmFuZ2UpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIodHJ1ZSk7XG4gICAgICB9XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgIGlmIChzaG93TWFudWFsRGF0ZUVycm9yKSB7XG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoIWhhc0Z1bGxSYW5nZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbc2hvd01hbnVhbERhdGVFcnJvcl1cbiAgKTtcblxuICBjb25zdCBvbk1hbnVhbFJhbmdlQ29tcGxldGUgPSB1c2VDYWxsYmFjaygobmV4dEZyb21EYXRlOiBzdHJpbmcsIG5leHRUb0RhdGU6IHN0cmluZykgPT4ge1xuICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XG4gICAgc2V0VG9EYXRlKG5leHRUb0RhdGUpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG9uUXVpY2tGaWx0ZXJDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAoZmlsdGVySWQ6IEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkKSA9PiB7XG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiY3VzdG9tXCIpIHtcbiAgICAgICAgaWYgKHNob3dNYW51YWxEYXRlRmlsdGVyKSB7XG4gICAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgICAgIHNldE1hbnVhbERhdGVBdXRvT3BlbktleSgocHJldmlvdXMpID0+IHByZXZpb3VzICsgMSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoZmlsdGVySWQpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG5cbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcbiAgICAgIGNvbnN0IG5leHRGcm9tID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtN1wiKSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gNik7XG4gICAgICB9IGVsc2UgaWYgKGZpbHRlcklkID09PSBcImRheXMtMzBcIikge1xuICAgICAgICBuZXh0RnJvbS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDI5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gODkpO1xuICAgICAgfVxuXG4gICAgICBzZXRGcm9tRGF0ZSh0b0lzb0RhdGUobmV4dEZyb20pKTtcbiAgICAgIHNldFRvRGF0ZSh0b0lzb0RhdGUodG9kYXkpKTtcbiAgICB9LFxuICAgIFtzaG93TWFudWFsRGF0ZUZpbHRlcl1cbiAgKTtcblxuICBjb25zdCB0b2dnbGVGaWx0ZXJQYW5lbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRTaG93RmlsdGVycygocHJldmlvdXMpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSAhcHJldmlvdXM7XG4gICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIGZyb21EYXRlLFxuICAgIHRvRGF0ZSxcbiAgICBmaWx0ZXJLZXksXG4gICAgY3VycmVuY3lDb2RlLFxuICAgIG1hbmFnZWRVc2VySWQsXG4gICAgc3RhdHVzRmlsdGVyLFxuICAgIGdhc3RvVHlwZUZpbHRlcixcbiAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxuICAgIGFwcGxpZWRGaWx0ZXJzLFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIGN1cnJlbnRGaWx0ZXJzLFxuICAgIHNldEZpbHRlcktleSxcbiAgICBzZXRDdXJyZW5jeUNvZGUsXG4gICAgc2V0TWFuYWdlZFVzZXJJZCxcbiAgICBzZXRTdGF0dXNGaWx0ZXIsXG4gICAgc2V0R2FzdG9UeXBlRmlsdGVyLFxuICAgIHNldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gICAgb25BcHBseSxcbiAgICBvbkNsZWFyLFxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcbiAgICBvbkRhdGVSYW5nZUNoYW5nZSxcbiAgICBvbk1hbnVhbFJhbmdlQ29tcGxldGUsXG4gICAgb25RdWlja0ZpbHRlckNoYW5nZSxcbiAgICB0b2dnbGVGaWx0ZXJQYW5lbCxcbiAgICBzdGF0dXNGaWx0ZXJMb2NrZWQ6IGhhc0ZpeGVkU3RhdHVzRmlsdGVyLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LCBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvc2Vzc2lvbkV4cGlyeS50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZVNjb3BlVG9rZW4gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNjb3BlLnRzXCI7XG5pbXBvcnQgeyBidWlsZEV4cGVuc2VUaWNrZXRMaXN0UGF5bG9hZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlUGF5bG9hZEJ1aWxkZXJzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsIEV4cGVuc2VUaWNrZXRDYXJkIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGFBcmdzID0ge1xuICBoYXNBY2Nlc3M6IGJvb2xlYW47XG4gIHBhZ2VTaXplOiBudW1iZXI7XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xufTtcbmNvbnN0IEFMTE9XRURfR0FTVE9fVFlQRV9DT0RFUyA9IG5ldyBTZXQ8bnVtYmVyPihbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTRdKTtcbmNvbnN0IEVYUEVOU0VfVElDS0VUU19MSVNUX0NBQ0hFX0tFWV9QUkVGSVggPSBcImV4cGVuc2VfdGlja2V0c19saXN0X3YxXCI7XG5jb25zdCBFWFBFTlNFX1RJQ0tFVFNfTElTVF9DQUNIRV9UVExfTVMgPSAyICogNjAgKiAxMDAwO1xuY29uc3QgQlVMS19TRUxFQ1RJT05fUEFHRV9TSVpFID0gMjAwO1xuY29uc3QgQlVMS19TRUxFQ1RJT05fQ09OQ1VSUkVOQ1kgPSA0O1xuXG50eXBlIEV4cGVuc2VUaWNrZXRMaXN0Q2FjaGVFbnRyeSA9IHtcbiAgcmVxdWVzdEtleTogc3RyaW5nO1xuICBwYWdlOiBudW1iZXI7XG4gIHRvdGFsOiBudW1iZXI7XG4gIGl0ZW1zOiBFeHBlbnNlVGlja2V0Q2FyZFtdO1xufTtcblxuY29uc3QgdG9OdWxsYWJsZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xufTtcblxuY29uc3QgdG9OdWxsYWJsZUJvb2wgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuIHwgbnVsbCA9PiB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSByZXR1cm4gdmFsdWU7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHJldHVybiB2YWx1ZSA9PT0gMSA/IHRydWUgOiB2YWx1ZSA9PT0gMCA/IGZhbHNlIDogbnVsbDtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB2YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAobm9ybWFsaXplZCA9PT0gXCJ0cnVlXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIxXCIpIHJldHVybiB0cnVlO1xuICAgIGlmIChub3JtYWxpemVkID09PSBcImZhbHNlXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIwXCIpIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IHRvTnVsbGFibGVUaWNrZXRTdGF0dXMgPSAodmFsdWU6IHVua25vd24pOiAwIHwgMSB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICByZXR1cm4gcGFyc2VkID09PSAwIHx8IHBhcnNlZCA9PT0gMSA/IHBhcnNlZCA6IG51bGw7XG59O1xuXG5jb25zdCB0b051bGxhYmxlVGlja2V0R2FzdG9UeXBlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZUdhc3RvVHlwZUNvZGUgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgfHwgIUFMTE9XRURfR0FTVE9fVFlQRV9DT0RFUy5oYXMocGFyc2VkKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlZCBhcyBFeHBlbnNlR2FzdG9UeXBlQ29kZTtcbn07XG5cbmNvbnN0IG1hcFRpY2tldEl0ZW1Ub0NhcmQgPSAoaXRlbTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBFeHBlbnNlVGlja2V0Q2FyZCA9PiB7XG4gIHJldHVybiB7XG4gICAgZmlsZUlkOiBTdHJpbmcoaXRlbT8uRmlsZUlkIHx8IFwiXCIpLnRyaW0oKSxcbiAgICBkZXNjcmlwdGlvbjogU3RyaW5nKGl0ZW0/LkRlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKSxcbiAgICBzdGF0dXM6IHRvTnVsbGFibGVUaWNrZXRTdGF0dXMoaXRlbT8uU3RhdHVzKSxcbiAgICBob2phR2FzdG9zSWREaXNwbGF5OiBTdHJpbmcoaXRlbT8uSG9qYUdhc3Rvc0lkRGlzcGxheSA/PyBpdGVtPy5ob2phR2FzdG9zSWREaXNwbGF5ID8/IFwiXCIpLnRyaW0oKSxcbiAgICBwcm9jZXNzZWRCeUFJOiB0b051bGxhYmxlQm9vbChpdGVtPy5Qcm9jZXNzZWRCeUFJKSxcbiAgICBjdXJyZW5jeUNvZGU6IFN0cmluZyhpdGVtPy5DdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLFxuICAgIHRvdGFsQW1vdW50OiB0b051bGxhYmxlTnVtYmVyKGl0ZW0/LlRvdGFsQW1vdW50KSxcbiAgICBjcmVhdGVkQnlVc2VySWQ6IFN0cmluZyhpdGVtPy5DcmVhdGVkQnlVc2VySWQgfHwgXCJcIikudHJpbSgpLFxuICAgIHRyYW5zRGF0ZTogU3RyaW5nKGl0ZW0/LlRyYW5zRGF0ZSB8fCBcIlwiKS50cmltKCksXG4gICAgdXJsRmlsZTogU3RyaW5nKGl0ZW0/LlVybEZpbGUgfHwgXCJcIikudHJpbSgpLFxuICAgIGZpbGVOYW1lOiBTdHJpbmcoaXRlbT8uRmlsZU5hbWUgfHwgXCJcIikudHJpbSgpLFxuICAgIGdhc3RvVHlwZTogdG9OdWxsYWJsZVRpY2tldEdhc3RvVHlwZShpdGVtPy5HYXN0b1R5cGUgPz8gaXRlbT8uZ2FzdG9UeXBlKSxcbiAgfTtcbn07XG5cbmNvbnN0IGdldExpc3RDYWNoZVNjb3BlID0gKCkgPT4ge1xuICByZXR1cm4gZ2V0RXhwZW5zZVNjb3BlVG9rZW4oKTtcbn07XG5cbmNvbnN0IGdldExpc3RDYWNoZUtleSA9ICgpID0+IGAke0VYUEVOU0VfVElDS0VUU19MSVNUX0NBQ0hFX0tFWV9QUkVGSVh9XyR7Z2V0TGlzdENhY2hlU2NvcGUoKX1gO1xuXG4vLyBSZWFkcyBvbmUgc2hvcnQtbGl2ZWQgbGlzdCBzbmFwc2hvdCB0byBhdm9pZCByZXBlYXRpbmcgdGhlIHNhbWUgZXhwZW5zaXZlIHJlcXVlc3QuXG5jb25zdCByZWFkTGlzdENhY2hlRW50cnkgPSAocmVxdWVzdEtleTogc3RyaW5nKTogRXhwZW5zZVRpY2tldExpc3RDYWNoZUVudHJ5IHwgbnVsbCA9PiB7XG4gIGNvbnN0IHJhdyA9IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeTxFeHBlbnNlVGlja2V0TGlzdENhY2hlRW50cnk+KGdldExpc3RDYWNoZUtleSgpKTtcbiAgaWYgKCFyYXcgfHwgdHlwZW9mIHJhdyAhPT0gXCJvYmplY3RcIikgcmV0dXJuIG51bGw7XG4gIGlmIChTdHJpbmcocmF3LnJlcXVlc3RLZXkgfHwgXCJcIikgIT09IHJlcXVlc3RLZXkpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHNhZmVJdGVtcyA9IEFycmF5LmlzQXJyYXkocmF3Lml0ZW1zKSA/IHJhdy5pdGVtcyA6IFtdO1xuICBjb25zdCB0b3RhbFJhdyA9IE51bWJlcihyYXcudG90YWwpO1xuICBjb25zdCB0b3RhbCA9IE51bWJlci5pc0Zpbml0ZSh0b3RhbFJhdykgJiYgdG90YWxSYXcgPj0gMCA/IHRvdGFsUmF3IDogc2FmZUl0ZW1zLmxlbmd0aDtcbiAgY29uc3QgcGFnZVJhdyA9IE51bWJlcihyYXcucGFnZSk7XG4gIGNvbnN0IHBhZ2UgPSBOdW1iZXIuaXNGaW5pdGUocGFnZVJhdykgJiYgcGFnZVJhdyA+IDAgPyBNYXRoLmZsb29yKHBhZ2VSYXcpIDogMTtcblxuICByZXR1cm4ge1xuICAgIHJlcXVlc3RLZXksXG4gICAgcGFnZSxcbiAgICB0b3RhbCxcbiAgICBpdGVtczogc2FmZUl0ZW1zLFxuICB9O1xufTtcblxuY29uc3Qgd3JpdGVMaXN0Q2FjaGVFbnRyeSA9IChlbnRyeTogRXhwZW5zZVRpY2tldExpc3RDYWNoZUVudHJ5KTogdm9pZCA9PiB7XG4gIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeShnZXRMaXN0Q2FjaGVLZXkoKSwgZW50cnksIEVYUEVOU0VfVElDS0VUU19MSVNUX0NBQ0hFX1RUTF9NUyk7XG59O1xuXG4vLyBPd25zIGxpc3QgZGF0YSBmZXRjaCwgbG9hZGluZyBzdGF0ZSwgYW5kIHBhZ2luYXRpb24gbWV0YWRhdGEgZm9yIHRpY2tldHMuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YSA9ICh7IGhhc0FjY2VzcywgcGFnZVNpemUsIG9uRm9yYmlkZGVuIH06IFVzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGFBcmdzKSA9PiB7XG4gIGNvbnN0IFtpdGVtcywgc2V0SXRlbXNdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldENhcmRbXT4oW10pO1xuICBjb25zdCBbdG90YWwsIHNldFRvdGFsXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbY3VycmVudFBhZ2UsIHNldEN1cnJlbnRQYWdlXSA9IHVzZVN0YXRlKDEpO1xuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmID0gdXNlUmVmPEFib3J0Q29udHJvbGxlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBhY3RpdmVSZXF1ZXN0S2V5UmVmID0gdXNlUmVmKFwiXCIpO1xuICBjb25zdCBhY3RpdmVSZXF1ZXN0U2VxUmVmID0gdXNlUmVmKDApO1xuXG4gIGNvbnN0IHJlc3RvcmVMaXN0U25hcHNob3QgPSB1c2VDYWxsYmFjayhcbiAgICAoc25hcHNob3Q6IHsgaXRlbXM6IEV4cGVuc2VUaWNrZXRDYXJkW107IHRvdGFsOiBudW1iZXI7IHBhZ2U6IG51bWJlciB9KSA9PiB7XG4gICAgICBjb25zdCBzYWZlSXRlbXMgPSBBcnJheS5pc0FycmF5KHNuYXBzaG90Lml0ZW1zKSA/IHNuYXBzaG90Lml0ZW1zIDogW107XG4gICAgICBjb25zdCBzYWZlVG90YWxSYXcgPSBOdW1iZXIoc25hcHNob3QudG90YWwpO1xuICAgICAgY29uc3Qgc2FmZVRvdGFsID0gTnVtYmVyLmlzRmluaXRlKHNhZmVUb3RhbFJhdykgJiYgc2FmZVRvdGFsUmF3ID49IDAgPyBzYWZlVG90YWxSYXcgOiBzYWZlSXRlbXMubGVuZ3RoO1xuICAgICAgY29uc3Qgc2FmZVBhZ2VSYXcgPSBOdW1iZXIoc25hcHNob3QucGFnZSk7XG4gICAgICBjb25zdCBzYWZlUGFnZSA9IE51bWJlci5pc0Zpbml0ZShzYWZlUGFnZVJhdykgJiYgc2FmZVBhZ2VSYXcgPiAwID8gTWF0aC5mbG9vcihzYWZlUGFnZVJhdykgOiAxO1xuXG4gICAgICBzZXRJdGVtcyhzYWZlSXRlbXMpO1xuICAgICAgc2V0VG90YWwoc2FmZVRvdGFsKTtcbiAgICAgIHNldEN1cnJlbnRQYWdlKHNhZmVQYWdlKTtcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgfSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IGxvYWRMaXN0ID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKHBhZ2U6IG51bWJlciwgZmlsdGVyczogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4ge1xuICAgICAgaWYgKCFoYXNBY2Nlc3MpIHtcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXlsb2FkID0gYnVpbGRFeHBlbnNlVGlja2V0TGlzdFBheWxvYWQoZmlsdGVycywgcGFnZSwgcGFnZVNpemUpO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZE1hbmFnZWRVc2VySWQgPSBTdHJpbmcoZmlsdGVycz8ubWFuYWdlZFVzZXJJZCB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcbiAgICAgIGNvbnN0IHJlcXVlc3RLZXkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHBheWxvYWQsXG4gICAgICAgIG1hbmFnZWRVc2VySWQ6IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBjYWNoZWRFbnRyeSA9IHJlYWRMaXN0Q2FjaGVFbnRyeShyZXF1ZXN0S2V5KTtcbiAgICAgIGlmIChjYWNoZWRFbnRyeSkge1xuICAgICAgICBpZiAoYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCkge1xuICAgICAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQuYWJvcnQoKTtcbiAgICAgICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgICBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPSBcIlwiO1xuICAgICAgICAgIGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJlc3RvcmVMaXN0U25hcHNob3Qoe1xuICAgICAgICAgIGl0ZW1zOiBjYWNoZWRFbnRyeS5pdGVtcyxcbiAgICAgICAgICB0b3RhbDogY2FjaGVkRW50cnkudG90YWwsXG4gICAgICAgICAgcGFnZTogY2FjaGVkRW50cnkucGFnZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgJiYgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID09PSByZXF1ZXN0S2V5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudC5hYm9ydCgpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XG4gICAgICBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPSByZXF1ZXN0S2V5O1xuICAgICAgY29uc3QgcmVxdWVzdFNlcSA9IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCArIDE7XG4gICAgICBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQgPSByZXF1ZXN0U2VxO1xuXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdChwYXlsb2FkLCB7XG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICAgICAgICBheFVzZXJJZE92ZXJyaWRlOiBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCB8fCB1bmRlZmluZWQsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocmVxdWVzdFNlcSAhPT0gYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50KSByZXR1cm47XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJUaWNrZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldHMuXCIpKTtcbiAgICAgICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICAgICAgc2V0VG90YWwoMCk7XG4gICAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWFwcGVkSXRlbXMgPSAoQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXSkubWFwKChpdGVtKSA9PlxuICAgICAgICAgIG1hcFRpY2tldEl0ZW1Ub0NhcmQoaXRlbSBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVxuICAgICAgICApO1xuICAgICAgICBjb25zdCByZXNwb25zZVRvdGFsID0gTnVtYmVyKHJlc3BvbnNlPy5Ub3RhbCA/PyBtYXBwZWRJdGVtcy5sZW5ndGggPz8gMCk7XG4gICAgICAgIGNvbnN0IG5leHRUb3RhbCA9IHJlc3BvbnNlVG90YWw7XG5cbiAgICAgICAgd3JpdGVMaXN0Q2FjaGVFbnRyeSh7XG4gICAgICAgICAgcmVxdWVzdEtleSxcbiAgICAgICAgICBwYWdlLFxuICAgICAgICAgIHRvdGFsOiBuZXh0VG90YWwsXG4gICAgICAgICAgaXRlbXM6IG1hcHBlZEl0ZW1zLFxuICAgICAgICB9KTtcblxuICAgICAgICBzZXRJdGVtcyhtYXBwZWRJdGVtcyk7XG4gICAgICAgIHNldFRvdGFsKG5leHRUb3RhbCk7XG4gICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGNvbnRyb2xsZXIuc2lnbmFsLmFib3J0ZWQpIHJldHVybjtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSByZXR1cm47XG4gICAgICAgIGlmIChyZXF1ZXN0U2VxICE9PSBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiVGlja2V0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXRzLlwiKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICAgIHNldFRvdGFsKDApO1xuICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChyZXF1ZXN0U2VxID09PSBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICAgIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFtoYXNBY2Nlc3MsIG9uRm9yYmlkZGVuLCBwYWdlU2l6ZSwgcmVzdG9yZUxpc3RTbmFwc2hvdF1cbiAgKTtcblxuICAvLyBMb2FkcyB0aGUgZnVsbCBmaWx0ZXJlZCB0aWNrZXQgcmVzdWx0IHNldCBmb3IgdHJ1ZSBzZWxlY3QtYWxsIGJlaGF2aW9yLlxuICBjb25zdCBsb2FkQWxsTWF0Y2hpbmdUaWNrZXRzID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKFxuICAgICAgZmlsdGVyczogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcbiAgICAgIGF4VXNlcklkT3ZlcnJpZGUgPSBcIlwiXG4gICAgKTogUHJvbWlzZTxFeHBlbnNlVGlja2V0Q2FyZFtdPiA9PiB7XG4gICAgICBpZiAoIWhhc0FjY2Vzcykge1xuICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRBeFVzZXJJZE92ZXJyaWRlID0gU3RyaW5nKGF4VXNlcklkT3ZlcnJpZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG4gICAgICBjb25zdCB0aWNrZXRNYXAgPSBuZXcgTWFwPHN0cmluZywgRXhwZW5zZVRpY2tldENhcmQ+KCk7XG5cbiAgICAgIGNvbnN0IGZldGNoUGFnZSA9IGFzeW5jIChwYWdlOiBudW1iZXIpOiBQcm9taXNlPHsgaXRlbXM6IEV4cGVuc2VUaWNrZXRDYXJkW107IHRvdGFsOiBudW1iZXIgfT4gPT4ge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0gYnVpbGRFeHBlbnNlVGlja2V0TGlzdFBheWxvYWQoZmlsdGVycywgcGFnZSwgQlVMS19TRUxFQ1RJT05fUEFHRV9TSVpFKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0KHBheWxvYWQsIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICBheFVzZXJJZE92ZXJyaWRlOiBub3JtYWxpemVkQXhVc2VySWRPdmVycmlkZSB8fCB1bmRlZmluZWQsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBzb3VyY2VJdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UgJiYgc291cmNlSXRlbXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJUaWNrZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldHMuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaXRlbXM6IHNvdXJjZUl0ZW1zLm1hcCgoaXRlbSkgPT4gbWFwVGlja2V0SXRlbVRvQ2FyZChpdGVtIGFzIHVua25vd24gYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pKSxcbiAgICAgICAgICB0b3RhbDogTnVtYmVyKHJlc3BvbnNlPy5Ub3RhbCA/PyBzb3VyY2VJdGVtcy5sZW5ndGggPz8gMCksXG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBmaXJzdFBhZ2UgPSBhd2FpdCBmZXRjaFBhZ2UoMSk7XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBmaXJzdFBhZ2UuaXRlbXMpIHtcbiAgICAgICAgICBjb25zdCBub3JtYWxpemVkRmlsZUlkID0gU3RyaW5nKGl0ZW0uZmlsZUlkIHx8IFwiXCIpLnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgIGlmICghbm9ybWFsaXplZEZpbGVJZCkgY29udGludWU7XG4gICAgICAgICAgdGlja2V0TWFwLnNldChub3JtYWxpemVkRmlsZUlkLCBpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc29sdmVkVG90YWwgPSBmaXJzdFBhZ2UudG90YWwgPiAwID8gZmlyc3RQYWdlLnRvdGFsIDogZmlyc3RQYWdlLml0ZW1zLmxlbmd0aDtcbiAgICAgICAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGgubWF4KDEsIE1hdGguY2VpbChyZXNvbHZlZFRvdGFsIC8gQlVMS19TRUxFQ1RJT05fUEFHRV9TSVpFKSk7XG4gICAgICAgIGNvbnN0IHJlbWFpbmluZ1BhZ2VzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogTWF0aC5tYXgoMCwgdG90YWxQYWdlcyAtIDEpIH0sIChfdmFsdWUsIGluZGV4KSA9PiBpbmRleCArIDIpO1xuXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCByZW1haW5pbmdQYWdlcy5sZW5ndGg7IGluZGV4ICs9IEJVTEtfU0VMRUNUSU9OX0NPTkNVUlJFTkNZKSB7XG4gICAgICAgICAgY29uc3QgcGFnZUNodW5rID0gcmVtYWluaW5nUGFnZXMuc2xpY2UoaW5kZXgsIGluZGV4ICsgQlVMS19TRUxFQ1RJT05fQ09OQ1VSUkVOQ1kpO1xuICAgICAgICAgIGNvbnN0IHBhZ2VSZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwocGFnZUNodW5rLm1hcCgocGFnZSkgPT4gZmV0Y2hQYWdlKHBhZ2UpKSk7XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IHBhZ2VSZXN1bHQgb2YgcGFnZVJlc3VsdHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBwYWdlUmVzdWx0Lml0ZW1zKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRGaWxlSWQgPSBTdHJpbmcoaXRlbS5maWxlSWQgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgIGlmICghbm9ybWFsaXplZEZpbGVJZCkgY29udGludWU7XG4gICAgICAgICAgICAgIHRpY2tldE1hcC5zZXQobm9ybWFsaXplZEZpbGVJZCwgaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGlja2V0TWFwLnZhbHVlcygpKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2hhc0FjY2Vzcywgb25Gb3JiaWRkZW5dXG4gICk7XG5cbiAgY29uc3QgcmVzZXRMaXN0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50KSB7XG4gICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50LmFib3J0KCk7XG4gICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9IFwiXCI7XG4gICAgfVxuICAgIHNldEl0ZW1zKFtdKTtcbiAgICBzZXRUb3RhbCgwKTtcbiAgICBzZXRDdXJyZW50UGFnZSgxKTtcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCkge1xuICAgICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50LmFib3J0KCk7XG4gICAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPSBcIlwiO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIGl0ZW1zLFxuICAgIHRvdGFsLFxuICAgIGN1cnJlbnRQYWdlLFxuICAgIGlzTG9hZGluZyxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgbG9hZExpc3QsXG4gICAgbG9hZEFsbE1hdGNoaW5nVGlja2V0cyxcbiAgICByZXN0b3JlTGlzdFNuYXBzaG90LFxuICAgIHJlc2V0TGlzdCxcbiAgfTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQWtGOzs7QUNBbEYsSUFBQUMsZ0JBQStCOzs7QUNBL0IsbUJBQStCO0FBcUMzQjtBQXBCSixJQUFNLG1DQUFtQyxDQUFDO0FBQUEsRUFDeEM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUNYLFlBQVk7QUFDZCxNQUE2QztBQUMzQyxRQUFNLFVBQVUsVUFBVSxRQUFRLEtBQUs7QUFDdkMsUUFBTSxjQUFVO0FBQUEsSUFD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QUE7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLFFBQ0EsU0FBUztBQUFBLFFBQ1QsY0FBYyxDQUFDLFNBQVM7QUFDdEIsZ0JBQU0sV0FBVyxxQkFBcUI7QUFDdEMsY0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLFlBQVksQ0FBQyxVQUFVLFNBQVM7QUFDN0Q7QUFBQSxVQUNGO0FBRUEsZUFBSyxTQUFTLE1BQU0sUUFBUTtBQUFBLFFBQzlCO0FBQUEsUUFDQSxRQUFRO0FBQUE7QUFBQSxJQUNWO0FBQUEsSUFFQyxjQUFjLHNCQUFzQixDQUFDLHNCQUFzQixDQUFDLGtCQUMzRCw2Q0FBQyw2QkFBa0IsV0FBVyxLQUFLLHNDQUFzQyxvQkFBb0IsR0FDM0Y7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE9BQU8sS0FBSyxzQ0FBc0Msb0JBQW9CO0FBQUEsUUFDdEUsU0FBUztBQUFBLFFBQ1QsVUFBVSxnQkFBZ0IsaUJBQWlCLHNCQUFzQjtBQUFBO0FBQUEsSUFDbkUsR0FDRixJQUNFO0FBQUEsSUFFSCxtQkFBbUIsQ0FBQyxhQUNuQjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsV0FBVyxLQUFLLDZCQUE2QixrQkFBa0I7QUFBQSxRQUMvRCxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixlQUFlLEtBQUssNkJBQTZCLGtCQUFrQjtBQUFBLFFBQ25FLFdBQVc7QUFBQTtBQUFBLElBQ2IsSUFDRTtBQUFBLEtBQ047QUFFSjtBQUdBLElBQU0scUJBQXFCLE1BQU07QUFDL0IsU0FDRSw2Q0FBQyxnQ0FBcUIseUJBQXVCLE1BQzNDLHVEQUFDLDZCQUEwQixHQUM3QjtBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsMEJBQXdCO0FBQ3hCLFFBQU0sU0FBUyxTQUFTLGVBQWUsc0JBQXNCO0FBQzdELE1BQUksQ0FBQyxPQUFRO0FBQ2IsbUJBQWlCLFFBQVEsNkNBQUMsc0JBQW1CLENBQUU7QUFDakQ7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLDZCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0IiwgImlzTGlua01vZGUiLCAiY2FjaGVkU3RhdGUiLCAicmVzdG9yZWRNYW5hZ2VkVXNlcklkIiwgInJlc3RvcmVkRmlsdGVycyJdCn0K
