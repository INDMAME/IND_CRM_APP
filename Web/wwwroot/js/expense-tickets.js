import {
  ExpenseDateRangeFilter_default,
  ExpenseFilterActions_default,
  ExpenseManagedUserFilterSelect_default,
  ExpenseQuickDateFilters_default,
  buildExpenseTicketListPayload
} from "./chunks/chunk-C3RCSU75.js";
import {
  HistorySummary_default
} from "./chunks/chunk-7Z3NMBR5.js";
import {
  getExpenseTicketStatusFilterOptions,
  getExpenseTicketStatusLabel,
  normalizeExpenseTicketStatusFilterCode
} from "./chunks/chunk-BBSOJ6P2.js";
import {
  mapWindowEnumOptions
} from "./chunks/chunk-BVPBMOU4.js";
import {
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-GGLWCDII.js";
import "./chunks/chunk-ZN2XQFXY.js";
import {
  RemoteSearchCombobox_default
} from "./chunks/chunk-LBAUQXUT.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-CCXORWXW.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-OQYUG3ZL.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-AGYAFSYB.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-BZQM6LH3.js";
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
} from "./chunks/chunk-TWBQPWHO.js";
import {
  configureExpenseApiAuth,
  createExpenseSheet,
  fetchExpenseSheetDetail,
  fetchExpenseSheetTicketsList
} from "./chunks/chunk-IDWB5SME.js";
import {
  VisitasPageProviders_default,
  getExpenseScopeToken,
  useAuthContext
} from "./chunks/chunk-FQJSMENJ.js";
import {
  clearExpenseActingUserOverride,
  setExpenseActingUserOverride,
  toExpenseApiDdMmYyyy
} from "./chunks/chunk-LCBK6SHP.js";
import {
  Spinner_default,
  canAccess,
  indT,
  showPermissionModal
} from "./chunks/chunk-BYICIYT4.js";
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
  ApiFetchError
} from "./chunks/chunk-REMMAK3K.js";
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
    managedUserId: String(value?.managedUserId || "").trim(),
    statusFilter: normalizeExpenseTicketStatusFilterCode(value?.statusFilter, ""),
    gastoTypeFilter: normalizeGastoTypeFilter(value?.gastoTypeFilter),
    processedByIaFilter: normalizeProcessedByIaFilter(value?.processedByIaFilter)
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/useExpenseTicketsFiltersState.ts
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
          signal: controller.signal
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
  return getExpenseScopeToken();
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
  const selectedTickets = normalizeItems(raw.selectedTickets);
  const totalRaw = Number(raw.total);
  const total = Number.isFinite(totalRaw) && totalRaw >= 0 ? totalRaw : items.length;
  return {
    filters: normalizeExpenseTicketFilterSnapshot(raw.filters),
    page,
    scrollY,
    focusFileId: String(raw.focusFileId || "").trim(),
    items,
    selectedTickets,
    total,
    linkModeSheetId: String(raw.linkModeSheetId || "").trim()
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
  return users[0]?.axUserId || "";
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
    selectedManagedUserId,
    subordinates,
    canManageOtherUsers,
    setSelectedManagedUserId
  } = useAuthContext();
  const timelineContainerRef = import_react7.default.useRef(null);
  const cameraInputRef = import_react7.default.useRef(null);
  const galleryInputRef = import_react7.default.useRef(null);
  const didRestoreOnMountRef = import_react7.default.useRef(false);
  const didApplyQueryFilterRef = import_react7.default.useRef(false);
  const pendingScrollRestoreRef = import_react7.default.useRef(null);
  const pendingFocusFileIdRef = import_react7.default.useRef("");
  const linkModeSelectionIntentUntilRef = import_react7.default.useRef(0);
  const linkModePendingOpenTimerRef = import_react7.default.useRef(null);
  const linkModeContext = (0, import_react7.useMemo)(() => {
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
  const managedUsers = (0, import_react7.useMemo)(
    () => ensureCurrentUserInList(Array.isArray(subordinates) ? subordinates : [], currentAxUserId),
    [currentAxUserId, subordinates]
  );
  const defaultManagedUserId = (0, import_react7.useMemo)(
    () => resolveManagedUserSelection(selectedManagedUserId, currentAxUserId, managedUsers),
    [currentAxUserId, managedUsers, selectedManagedUserId]
  );
  const showManagedUserFilter = isLinkMode && canManageOtherUsers;
  const normalizeLinkModeSnapshotForLoad = (0, import_react7.useCallback)(
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
  const [linkSheetLocked, setLinkSheetLocked] = (0, import_react7.useState)(false);
  const [linkSheetCheckBusy, setLinkSheetCheckBusy] = (0, import_react7.useState)(false);
  const [linkFlowBusy, setLinkFlowBusy] = (0, import_react7.useState)(false);
  const [linkFlowStatus, setLinkFlowStatus] = (0, import_react7.useState)("");
  const [linkFlowError, setLinkFlowError] = (0, import_react7.useState)("");
  const [selectedTicketsById, setSelectedTicketsById] = (0, import_react7.useState)({});
  const paginationLabels = (0, import_react7.useMemo)(
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
  const syncManagedUserSelection = (0, import_react7.useCallback)(
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
  (0, import_react7.useEffect)(() => {
    const normalizedDefaultManagedUserId = normalizeUserId(defaultManagedUserId);
    if (!normalizedDefaultManagedUserId) return;
    setManagedUserId(normalizedDefaultManagedUserId);
    syncManagedUserSelection(normalizedDefaultManagedUserId);
  }, [defaultManagedUserId, setManagedUserId, syncManagedUserSelection]);
  (0, import_react7.useEffect)(() => {
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
  const selectedTicketList = (0, import_react7.useMemo)(() => Object.values(selectedTicketsById), [selectedTicketsById]);
  const selectedTicketCount = selectedTicketList.length;
  const selectedTotalAmount = (0, import_react7.useMemo)(() => {
    return selectedTicketList.reduce((sum, item) => {
      const amount = Number(item.totalAmount ?? 0);
      return amount > 0 ? sum + amount : sum;
    }, 0);
  }, [selectedTicketList]);
  const selectedTotalAmountText = (0, import_react7.useMemo)(() => formatAmountWithCurrency(selectedTotalAmount, ""), [selectedTotalAmount]);
  const selectableVisibleTickets = (0, import_react7.useMemo)(() => {
    return items.filter((item) => canSelectTicketForLink(item));
  }, [items]);
  const visibleSelectableCount = selectableVisibleTickets.length;
  const linkModeCancelMessage = (0, import_react7.useMemo)(
    () => indT(
      "ExpenseTickets_LinkMode_CancelConfirm",
      "Se cancelara el proceso de vinculacion y volveras a la hoja de gastos. Quieres continuar?"
    ),
    []
  );
  const markLinkModeSelectionIntent = (0, import_react7.useCallback)(() => {
    linkModeSelectionIntentUntilRef.current = Date.now() + LINK_MODE_SELECTION_GUARD_MS;
    if (linkModePendingOpenTimerRef.current != null) {
      window.clearTimeout(linkModePendingOpenTimerRef.current);
      linkModePendingOpenTimerRef.current = null;
    }
  }, []);
  const clearPendingDetailOpen = (0, import_react7.useCallback)(() => {
    if (linkModePendingOpenTimerRef.current != null) {
      window.clearTimeout(linkModePendingOpenTimerRef.current);
      linkModePendingOpenTimerRef.current = null;
    }
  }, []);
  const setFilteredSelectedTickets = (0, import_react7.useCallback)((predicate) => {
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
  const isTicketSelected = (0, import_react7.useCallback)(
    (fileId) => {
      const safeFileId = safeText(fileId);
      return !!safeFileId && !!selectedTicketsById[safeFileId];
    },
    [selectedTicketsById]
  );
  const toggleTicketSelection = (0, import_react7.useCallback)(
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
  const clearTicketSelection = (0, import_react7.useCallback)(() => {
    setSelectedTicketsById({});
  }, []);
  const selectVisibleTickets = (0, import_react7.useCallback)(() => {
    if (visibleSelectableCount < 1) return;
    setSelectedTicketsById((previous) => {
      const next = { ...previous };
      for (const ticket of selectableVisibleTickets) {
        const fileId = safeText(ticket.fileId);
        if (!fileId) continue;
        next[fileId] = ticket;
      }
      return next;
    });
  }, [selectableVisibleTickets, visibleSelectableCount]);
  (0, import_react7.useEffect)(() => {
    return () => {
      clearPendingDetailOpen();
    };
  }, [clearPendingDetailOpen]);
  (0, import_react7.useEffect)(() => {
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
  const resolveActiveFilters = (0, import_react7.useCallback)(() => {
    const baseSnapshot = appliedFilters || currentFilters;
    const resolvedManagedUserId = syncManagedUserSelection(baseSnapshot.managedUserId);
    return normalizeLinkModeSnapshotForLoad({
      ...baseSnapshot,
      managedUserId: resolvedManagedUserId
    });
  }, [appliedFilters, currentFilters, normalizeLinkModeSnapshotForLoad, syncManagedUserSelection]);
  const buildExpenseLineFromTicket = (0, import_react7.useCallback)(
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
  const revalidateLinkSelection = (0, import_react7.useCallback)(async (candidateSelection) => {
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
            suppressPermissionModal: true
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
  }, []);
  const runTicketLinkFlow = (0, import_react7.useCallback)(async () => {
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
              suppressPermissionModal: true
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
      const snapshot = resolveActiveFilters();
      await loadList(currentPage < 1 ? 1 : currentPage, snapshot);
      const validatedFailures = await revalidateLinkSelection(failedSelection);
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
  const openLinkConfirmModal = (0, import_react7.useCallback)(() => {
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
  const handleModalConfirm = (0, import_react7.useCallback)(async () => {
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
  const handleModalButtonConfirm = (0, import_react7.useCallback)(() => {
    if (!linkFlowBusy && linkFlowError) {
      closeConfirm();
      return;
    }
    void handleModalConfirm();
  }, [closeConfirm, handleModalConfirm, linkFlowBusy, linkFlowError]);
  const openTicketDetail = (0, import_react7.useCallback)(
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
  const showSummary = !isLinkMode && !showFilters && summaryItems.length > 0;
  (0, import_react7.useEffect)(() => {
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
  (0, import_react7.useEffect)(() => {
    if (!isLinkMode) return;
    setExpenseNavigationGuard({
      active: true,
      message: linkModeCancelMessage
    });
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [isLinkMode, linkModeCancelMessage]);
  (0, import_react7.useEffect)(() => {
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
  (0, import_react7.useEffect)(() => {
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
      canProcessLinkMode && !linkSheetCheckBusy && linkSheetLocked ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-sm text-rose-700", children: indT("ExpenseSheets_Detail_PaidReadOnly", "Las hojas de gasto pagadas son de solo lectura.") }) : null,
      canProcessLinkMode && !linkSheetCheckBusy && !linkSheetLocked ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "grid grid-cols-3 gap-1.5 pt-0.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            type: "button",
            className: "ind-action-btn w-full min-w-0 px-1.5 py-1 text-[10px] leading-tight sm:text-xs",
            onClick: selectVisibleTickets,
            disabled: linkFlowBusy || visibleSelectableCount < 1,
            children: indT("ExpenseTickets_LinkMode_SelectAll", "Seleccionar todos")
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            type: "button",
            className: "ind-action-btn w-full min-w-0 px-1.5 py-1 text-[10px] leading-tight sm:text-xs",
            onClick: clearTicketSelection,
            disabled: linkFlowBusy || selectedTicketCount < 1,
            children: indT("ExpenseTickets_LinkMode_ClearAll", "Borrar todos")
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            type: "button",
            className: "ind-action-btn w-full min-w-0 px-1.5 py-1 text-[10px] leading-tight sm:text-xs",
            onClick: openLinkConfirmModal,
            disabled: linkFlowBusy || selectedTicketCount < 1,
            children: indT("ExpenseTickets_LinkMode_LinkButton", "Vincular ticket(s)")
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
    !errorMessage && items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ref: timelineContainerRef, className: "timeline-box", children: items.map((item, index) => {
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
      const selectionControl = isLinkMode ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "span",
        {
          className: "inline-flex -m-1 h-6 w-6 items-center justify-center",
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
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "input",
            {
              type: "checkbox",
              checked: isSelectedInLinkMode,
              disabled: !isSelectableInLinkMode || linkFlowBusy || linkSheetCheckBusy || linkSheetLocked,
              className: "h-4 w-4 cursor-pointer accent-primary pointer-events-auto",
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
          )
        }
      ) : null;
      const statusIcons = isLinkMode ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
        selectionControl,
        baseStatusIcons
      ] }) : baseStatusIcons;
      const statusIconClassName = isLinkMode ? "expense-ticket-card__status-icons pointer-events-auto" : "expense-ticket-card__status-icons";
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
        `${fileId}-${index}`
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL0V4cGVuc2VUaWNrZXRzUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90LnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0c0xpc3REYXRhLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uLCB7IHR5cGUgRmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbSB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4XCI7XG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCwgdHlwZSBBdXRoTWFuYWdlZFVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcbmltcG9ydCBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbCBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbC50c3hcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlVGlja2V0U3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHsgY3JlYXRlRXhwZW5zZVNoZWV0LCBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCwgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwsIGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlLCBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBY3RpbmdVc2VyLnRzXCI7XG5pbXBvcnQgeyB0b0V4cGVuc2VBcGlEZE1tWXl5eSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsIG5hdmlnYXRlVG9FeHBlbnNlVXJsLCBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyBtYXBXaW5kb3dFbnVtT3B0aW9ucywgdHlwZSBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzLCBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIHNhZmVUZXh0LCBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0RmxvdyB9IGZyb20gXCIuLi9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93LnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0xpc3REYXRhIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0Q3JlYXRlTGluZVJlcXVlc3QgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsIEV4cGVuc2VUaWNrZXRDYXJkIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xuXG5jb25zdCBQQUdFX1NJWkUgPSAxMDtcbmNvbnN0IEFMTE9XRURfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XG5cbmNvbnN0IEdBU1RPX1RZUEVfTEFCRUxfS0VZUzogUmVjb3JkPG51bWJlciwgeyBrZXk6IHN0cmluZzsgZmFsbGJhY2s6IHN0cmluZyB9PiA9IHtcbiAgMDogeyBrZXk6IFwiRW51bV9Ob25lXCIsIGZhbGxiYWNrOiBcIk5vbmVcIiB9LFxuICAxOiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9QZWFqZVwiLCBmYWxsYmFjazogXCJQZWFqZVwiIH0sXG4gIDI6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1BhcmtpbmdcIiwgZmFsbGJhY2s6IFwiUGFya2luZ1wiIH0sXG4gIDM6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0ttXCIsIGZhbGxiYWNrOiBcIkttXCIgfSxcbiAgNDogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfRGVzYXl1bm9cIiwgZmFsbGJhY2s6IFwiRGVzYXl1bm9cIiB9LFxuICA1OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9Db21pZGFcIiwgZmFsbGJhY2s6IFwiQ29taWRhXCIgfSxcbiAgNjogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfQ2VuYVwiLCBmYWxsYmFjazogXCJDZW5hXCIgfSxcbiAgNzogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfSG90ZWxcIiwgZmFsbGJhY2s6IFwiSG90ZWxcIiB9LFxuICA4OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9WYXJpb3NcIiwgZmFsbGJhY2s6IFwiVmFyaW9zXCIgfSxcbiAgMTQ6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1RheGlcIiwgZmFsbGJhY2s6IFwiVGF4aVwiIH0sXG59O1xuXG5jb25zdCBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRCA9IDI7XG5jb25zdCBFWFBFTlNFX1NUQVRVU19QQUlEID0gNDtcbmNvbnN0IExJTktfTU9ERV9PUEVOX0RFVEFJTF9ERUxBWV9NUyA9IDIyMDtcbmNvbnN0IExJTktfTU9ERV9TRUxFQ1RJT05fR1VBUkRfTVMgPSAyODA7XG5cbmNvbnN0IG5vcm1hbGl6ZVVzZXJJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xuXG5jb25zdCBpc1NhbWVVc2VyID0gKGxlZnQ6IHN0cmluZywgcmlnaHQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkTGVmdCA9IG5vcm1hbGl6ZVVzZXJJZChsZWZ0KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBub3JtYWxpemVkUmlnaHQgPSBub3JtYWxpemVVc2VySWQocmlnaHQpLnRvVXBwZXJDYXNlKCk7XG4gIHJldHVybiAhIW5vcm1hbGl6ZWRMZWZ0ICYmIG5vcm1hbGl6ZWRMZWZ0ID09PSBub3JtYWxpemVkUmlnaHQ7XG59O1xuXG5jb25zdCBlbnN1cmVDdXJyZW50VXNlckluTGlzdCA9ICh1c2VyczogQXV0aE1hbmFnZWRVc2VyW10sIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nKTogQXV0aE1hbmFnZWRVc2VyW10gPT4ge1xuICBjb25zdCBub3JtYWxpemVkQ3VycmVudCA9IG5vcm1hbGl6ZVVzZXJJZChjdXJyZW50QXhVc2VySWQpO1xuICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW50KSByZXR1cm4gdXNlcnM7XG4gIGlmICh1c2Vycy5zb21lKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZEN1cnJlbnQpKSkgcmV0dXJuIHVzZXJzO1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIGNybVVzZXJJZDogbm9ybWFsaXplZEN1cnJlbnQsXG4gICAgICBheFVzZXJJZDogbm9ybWFsaXplZEN1cnJlbnQsXG4gICAgICBuYW1lOiBub3JtYWxpemVkQ3VycmVudCxcbiAgICB9LFxuICAgIC4uLnVzZXJzLFxuICBdO1xufTtcblxuY29uc3QgcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uID0gKHJlcXVlc3RlZFVzZXJJZDogc3RyaW5nLCBjdXJyZW50QXhVc2VySWQ6IHN0cmluZywgdXNlcnM6IEF1dGhNYW5hZ2VkVXNlcltdKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZFJlcXVlc3RlZCA9IG5vcm1hbGl6ZVVzZXJJZChyZXF1ZXN0ZWRVc2VySWQpO1xuICBjb25zdCBub3JtYWxpemVkQ3VycmVudCA9IG5vcm1hbGl6ZVVzZXJJZChjdXJyZW50QXhVc2VySWQpO1xuICBpZiAobm9ybWFsaXplZFJlcXVlc3RlZCkge1xuICAgIGNvbnN0IGZvdW5kID0gdXNlcnMuZmluZCgoZW50cnkpID0+IGlzU2FtZVVzZXIoZW50cnkuYXhVc2VySWQsIG5vcm1hbGl6ZWRSZXF1ZXN0ZWQpKTtcbiAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZC5heFVzZXJJZDtcbiAgfVxuICBpZiAobm9ybWFsaXplZEN1cnJlbnQpIHtcbiAgICBjb25zdCBzZWxmID0gdXNlcnMuZmluZCgoZW50cnkpID0+IGlzU2FtZVVzZXIoZW50cnkuYXhVc2VySWQsIG5vcm1hbGl6ZWRDdXJyZW50KSk7XG4gICAgcmV0dXJuIHNlbGY/LmF4VXNlcklkIHx8IG5vcm1hbGl6ZWRDdXJyZW50O1xuICB9XG4gIHJldHVybiB1c2Vyc1swXT8uYXhVc2VySWQgfHwgXCJcIjtcbn07XG5cbmNvbnN0IGJ1aWxkTGlua01vZGVJbml0aWFsU25hcHNob3QgPSAobWFuYWdlZFVzZXJJZCA9IFwiXCIpOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0+IHtcbiAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xuICBjb25zdCBmcm9tRGF0ZSA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgLy8gS2VlcCBhdXRvbWF0aWMgbGluay1tb2RlIGxvYWQgYm91bmRlZCB0byBhdm9pZCBoZWF2eSB1cHN0cmVhbSBzY2Fucy5cbiAgZnJvbURhdGUuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAyOSk7XG5cbiAgcmV0dXJuIHtcbiAgICBmcm9tRGF0ZTogdG9Jc29EYXRlKGZyb21EYXRlKSxcbiAgICB0b0RhdGU6IHRvSXNvRGF0ZSh0b2RheSksXG4gICAgZmlsdGVyS2V5OiBcIlwiLFxuICAgIGN1cnJlbmN5Q29kZTogXCJcIixcbiAgICBtYW5hZ2VkVXNlcklkOiBub3JtYWxpemVVc2VySWQobWFuYWdlZFVzZXJJZCksXG4gICAgc3RhdHVzRmlsdGVyOiAwLFxuICAgIGdhc3RvVHlwZUZpbHRlcjogXCJcIixcbiAgICBwcm9jZXNzZWRCeUlhRmlsdGVyOiBcImFsbFwiLFxuICB9O1xufTtcblxuLy8gVmFsaWRhdGVzIHdoZXRoZXIgb25lIHRpY2tldCBjYXJkIGNhbiBiZSBsaW5rZWQgdG8gYW4gZXhwZW5zZSBzaGVldCBsaW5lLlxuY29uc3QgY2FuU2VsZWN0VGlja2V0Rm9yTGluayA9IChpdGVtOiBFeHBlbnNlVGlja2V0Q2FyZCk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChpdGVtLmZpbGVJZCk7XG4gIGlmICghZmlsZUlkKSByZXR1cm4gZmFsc2U7XG4gIGlmIChpdGVtLnN0YXR1cyAhPT0gMCkgcmV0dXJuIGZhbHNlO1xuXG4gIGNvbnN0IHRvdGFsQW1vdW50ID0gTnVtYmVyKGl0ZW0udG90YWxBbW91bnQgPz8gMCk7XG4gIGlmICghKHRvdGFsQW1vdW50ID4gMCkpIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBnYXN0b1R5cGUgPSBOdW1iZXIoaXRlbS5nYXN0b1R5cGUpO1xuICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihnYXN0b1R5cGUpICYmIGdhc3RvVHlwZSA+IDA7XG59O1xuXG4vLyBJbml0aWFsaXplcyBhdXRoIHNlZWQgZm9yIGV4cGVuc2UgQVBJIGNhbGxzIGJlZm9yZSBpc2xhbmQgZWZmZWN0cyBydW4uXG5jb25zdCBib290c3RyYXBFeHBlbnNlQXBpQXV0aCA9ICgpID0+IHtcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgoe1xuICAgIHRva2VuOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxuICAgIGVudHJhT2lkOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcbiAgfSk7XG59O1xuXG5jb25zdCBidWlsZEZhbGxiYWNrR2FzdG9UeXBlT3B0aW9ucyA9ICgpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xuICByZXR1cm4gT2JqZWN0LmVudHJpZXMoR0FTVE9fVFlQRV9MQUJFTF9LRVlTKVxuICAgIC5tYXAoKFtjb2RlLCBjZmddKSA9PiAoe1xuICAgICAgdmFsdWU6IFN0cmluZyhjb2RlKSxcbiAgICAgIHRleHQ6IGluZFQoY2ZnLmtleSwgY2ZnLmZhbGxiYWNrKSxcbiAgICB9KSlcbiAgICAuc29ydCgobGVmdCwgcmlnaHQpID0+IE51bWJlcihsZWZ0LnZhbHVlKSAtIE51bWJlcihyaWdodC52YWx1ZSkpO1xufTtcblxuY29uc3QgTmV3VGlja2V0SWNvbiA9ICgpID0+IChcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD17MS41fSBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzc05hbWU9XCJoLTYgdy02XCI+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTAgMjBoLTVhMiAyIDAgMCAxIC0yIC0ydi05YTIgMiAwIDAgMSAyIC0yaDFhMiAyIDAgMCAwIDIgLTJhMSAxIDAgMCAxIDEgLTFoNmExIDEgMCAwIDEgMSAxYTIgMiAwIDAgMCAyIDJoMWEyIDIgMCAwIDEgMiAydjJcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0LjM2MiAxMS4xNWEzIDMgMCAxIDAgLTQuMTQ0IDQuMjYzXCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAyMXYtNGEyIDIgMCAxIDEgNCAwdjRcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDE5aDRcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTIxIDE1djZcIiAvPlxuICA8L3N2Zz5cbik7XG5cbmNvbnN0IEV4cGVuc2VUaWNrZXRzUGFnZUNvbnRlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiVmlld1wiKTtcbiAgY29uc3QgY2FuQ3JlYXRlVGlja2V0ID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJBZGRcIik7XG4gIGNvbnN0IGNhbkxpbmtTaGVldExpbmVzID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJBZGRcIik7XG4gIGNvbnN0IHtcbiAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgIHN1Ym9yZGluYXRlcyxcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICAgIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcbiAgfSA9IHVzZUF1dGhDb250ZXh0KCk7XG4gIGNvbnN0IHRpbWVsaW5lQ29udGFpbmVyUmVmID0gUmVhY3QudXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGNhbWVyYUlucHV0UmVmID0gUmVhY3QudXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgZ2FsbGVyeUlucHV0UmVmID0gUmVhY3QudXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgZGlkUmVzdG9yZU9uTW91bnRSZWYgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xuICBjb25zdCBkaWRBcHBseVF1ZXJ5RmlsdGVyUmVmID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYgPSBSZWFjdC51c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHBlbmRpbmdGb2N1c0ZpbGVJZFJlZiA9IFJlYWN0LnVzZVJlZihcIlwiKTtcbiAgY29uc3QgbGlua01vZGVTZWxlY3Rpb25JbnRlbnRVbnRpbFJlZiA9IFJlYWN0LnVzZVJlZigwKTtcbiAgY29uc3QgbGlua01vZGVQZW5kaW5nT3BlblRpbWVyUmVmID0gUmVhY3QudXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IGxpbmtNb2RlQ29udGV4dCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIGNvbnN0IGFjdGlvbiA9IHNhZmVUZXh0KHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwiYWN0aW9uXCIpKS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGhvamFHYXN0b3NJZCA9IHNhZmVUZXh0KHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwiaG9qYUdhc3Rvc0lkXCIpKTtcbiAgICBjb25zdCBpc0xpbmtNb2RlID0gYWN0aW9uID09PSBcImxpbmtcIiAmJiAhIWhvamFHYXN0b3NJZDtcbiAgICByZXR1cm4ge1xuICAgICAgaXNMaW5rTW9kZSxcbiAgICAgIHNoZWV0SWQ6IGhvamFHYXN0b3NJZCxcbiAgICAgIGZpeGVkU3RhdHVzRmlsdGVyOiBpc0xpbmtNb2RlID8gKDAgYXMgY29uc3QpIDogbnVsbCxcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaXNMaW5rTW9kZSA9IGxpbmtNb2RlQ29udGV4dC5pc0xpbmtNb2RlO1xuICBjb25zdCBsaW5rU2hlZXRJZCA9IGxpbmtNb2RlQ29udGV4dC5zaGVldElkO1xuICBjb25zdCBmaXhlZFN0YXR1c0ZpbHRlciA9IGxpbmtNb2RlQ29udGV4dC5maXhlZFN0YXR1c0ZpbHRlcjtcbiAgY29uc3QgY2FuUHJvY2Vzc0xpbmtNb2RlID0gIWlzTGlua01vZGUgfHwgY2FuTGlua1NoZWV0TGluZXM7XG4gIGNvbnN0IG1hbmFnZWRVc2VycyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gZW5zdXJlQ3VycmVudFVzZXJJbkxpc3QoQXJyYXkuaXNBcnJheShzdWJvcmRpbmF0ZXMpID8gc3Vib3JkaW5hdGVzIDogW10sIGN1cnJlbnRBeFVzZXJJZCksXG4gICAgW2N1cnJlbnRBeFVzZXJJZCwgc3Vib3JkaW5hdGVzXVxuICApO1xuICBjb25zdCBkZWZhdWx0TWFuYWdlZFVzZXJJZCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uKHNlbGVjdGVkTWFuYWdlZFVzZXJJZCwgY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnMpLFxuICAgIFtjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vycywgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkXVxuICApO1xuICBjb25zdCBzaG93TWFuYWdlZFVzZXJGaWx0ZXIgPSBpc0xpbmtNb2RlICYmIGNhbk1hbmFnZU90aGVyVXNlcnM7XG5cbiAgLy8gS2VlcHMgbGluay1tb2RlIGxpc3QgcXVlcmllcyBib3VuZGVkIGV2ZW4gd2hlbiBVSSBmaWx0ZXJzIGFyZSBjbGVhcmVkLlxuICBjb25zdCBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZCA9IHVzZUNhbGxiYWNrKFxuICAgIChzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCk6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgPT4ge1xuICAgICAgaWYgKCFpc0xpbmtNb2RlKSByZXR1cm4gc25hcHNob3Q7XG5cbiAgICAgIGNvbnN0IGZhbGxiYWNrID0gYnVpbGRMaW5rTW9kZUluaXRpYWxTbmFwc2hvdChzbmFwc2hvdC5tYW5hZ2VkVXNlcklkKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRGcm9tRGF0ZSA9IHNhZmVUZXh0KHNuYXBzaG90LmZyb21EYXRlKSB8fCBmYWxsYmFjay5mcm9tRGF0ZTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRUb0RhdGUgPSBzYWZlVGV4dChzbmFwc2hvdC50b0RhdGUpIHx8IGZhbGxiYWNrLnRvRGF0ZTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkID0gbm9ybWFsaXplVXNlcklkKHNuYXBzaG90Lm1hbmFnZWRVc2VySWQpIHx8IGZhbGxiYWNrLm1hbmFnZWRVc2VySWQ7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnNuYXBzaG90LFxuICAgICAgICBmcm9tRGF0ZTogbm9ybWFsaXplZEZyb21EYXRlLFxuICAgICAgICB0b0RhdGU6IG5vcm1hbGl6ZWRUb0RhdGUsXG4gICAgICAgIG1hbmFnZWRVc2VySWQ6IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkLFxuICAgICAgICBzdGF0dXNGaWx0ZXI6IDAsXG4gICAgICB9O1xuICAgIH0sXG4gICAgW2lzTGlua01vZGVdXG4gICk7XG5cbiAgY29uc3QgW2xpbmtTaGVldExvY2tlZCwgc2V0TGlua1NoZWV0TG9ja2VkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2xpbmtTaGVldENoZWNrQnVzeSwgc2V0TGlua1NoZWV0Q2hlY2tCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2xpbmtGbG93QnVzeSwgc2V0TGlua0Zsb3dCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2xpbmtGbG93U3RhdHVzLCBzZXRMaW5rRmxvd1N0YXR1c10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2xpbmtGbG93RXJyb3IsIHNldExpbmtGbG93RXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtzZWxlY3RlZFRpY2tldHNCeUlkLCBzZXRTZWxlY3RlZFRpY2tldHNCeUlkXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIEV4cGVuc2VUaWNrZXRDYXJkPj4oe30pO1xuXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxuICAgICgpID0+ICh7XG4gICAgICBmaXJzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9GaXJzdFwiLCBcIkZpcnN0XCIpLFxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXG4gICAgICBuZXh0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpLFxuICAgICAgbGFzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKSxcbiAgICB9KSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxuICB9KTtcblxuICBjb25zdCBnYXN0b1R5cGVPcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KCgpID0+IHtcbiAgICBjb25zdCBzb3VyY2UgPSBBcnJheS5pc0FycmF5KHdpbmRvdy5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXykgPyB3aW5kb3cuX19FWFBFTlNFX0dBU1RPX1RZUEVTX18gOiBbXTtcbiAgICBjb25zdCBtYXBwZWQgPSBtYXBXaW5kb3dFbnVtT3B0aW9ucyhzb3VyY2UpLmZpbHRlcigoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IE51bWJlcihlbnRyeS52YWx1ZSk7XG4gICAgICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpICYmIEFMTE9XRURfR0FTVE9fVFlQRVMuaGFzKHBhcnNlZCk7XG4gICAgfSk7XG5cbiAgICBpZiAobWFwcGVkLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBtYXBwZWQuc29ydCgobGVmdCwgcmlnaHQpID0+IE51bWJlcihsZWZ0LnZhbHVlKSAtIE51bWJlcihyaWdodC52YWx1ZSkpO1xuICAgIH1cblxuICAgIHJldHVybiBidWlsZEZhbGxiYWNrR2FzdG9UeXBlT3B0aW9ucygpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgZ2FzdG9UeXBlTGFiZWxNYXAgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIGdhc3RvVHlwZU9wdGlvbnMpIHtcbiAgICAgIG1hcC5zZXQoU3RyaW5nKG9wdGlvbi52YWx1ZSksIG9wdGlvbi50ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIG1hcDtcbiAgfSwgW2dhc3RvVHlwZU9wdGlvbnNdKTtcblxuICBjb25zdCB7XG4gICAgaXRlbXMsXG4gICAgdG90YWwsXG4gICAgY3VycmVudFBhZ2UsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBsb2FkTGlzdCxcbiAgICByZXN0b3JlTGlzdFNuYXBzaG90LFxuICAgIHJlc2V0TGlzdCxcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGEoe1xuICAgIGhhc0FjY2VzcyxcbiAgICBwYWdlU2l6ZTogUEFHRV9TSVpFLFxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxuICB9KTtcbiAgY29uc3QgeyByZWFkQ2FjaGVkU3RhdGUsIGNvbnN1bWVSZXR1cm5GbGFnLCBzYXZlQ2FjaGVkU3RhdGUsIGNsZWFyQ2FjaGVkU3RhdGUgfSA9IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUoKTtcbiAgY29uc3Qgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soXG4gICAgKHJlcXVlc3RlZFVzZXJJZDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgIGNvbnN0IHJlc29sdmVkVXNlcklkID0gcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uKHJlcXVlc3RlZFVzZXJJZCwgY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnMpO1xuICAgICAgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkKHJlc29sdmVkVXNlcklkKTtcbiAgICAgIGlmICghcmVzb2x2ZWRVc2VySWQgfHwgKGN1cnJlbnRBeFVzZXJJZCAmJiBpc1NhbWVVc2VyKHJlc29sdmVkVXNlcklkLCBjdXJyZW50QXhVc2VySWQpKSkge1xuICAgICAgICBjbGVhckV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUocmVzb2x2ZWRVc2VySWQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc29sdmVkVXNlcklkO1xuICAgIH0sXG4gICAgW2N1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzLCBzZXRTZWxlY3RlZE1hbmFnZWRVc2VySWRdXG4gICk7XG5cbiAgY29uc3Qge1xuICAgIGZyb21EYXRlLFxuICAgIHRvRGF0ZSxcbiAgICBmaWx0ZXJLZXksXG4gICAgY3VycmVuY3lDb2RlLFxuICAgIG1hbmFnZWRVc2VySWQsXG4gICAgc3RhdHVzRmlsdGVyLFxuICAgIGdhc3RvVHlwZUZpbHRlcixcbiAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxuICAgIGFwcGxpZWRGaWx0ZXJzLFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIGN1cnJlbnRGaWx0ZXJzLFxuICAgIHNldEZpbHRlcktleSxcbiAgICBzZXRDdXJyZW5jeUNvZGUsXG4gICAgc2V0TWFuYWdlZFVzZXJJZCxcbiAgICBzZXRTdGF0dXNGaWx0ZXIsXG4gICAgc2V0R2FzdG9UeXBlRmlsdGVyLFxuICAgIHNldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gICAgb25BcHBseSxcbiAgICBvbkNsZWFyLFxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcbiAgICBvbkRhdGVSYW5nZUNoYW5nZSxcbiAgICBvbk1hbnVhbFJhbmdlQ29tcGxldGUsXG4gICAgb25RdWlja0ZpbHRlckNoYW5nZSxcbiAgICB0b2dnbGVGaWx0ZXJQYW5lbCxcbiAgICBzdGF0dXNGaWx0ZXJMb2NrZWQsXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZSh7XG4gICAgZGVmYXVsdE1hbmFnZWRVc2VySWQsXG4gICAgZml4ZWRTdGF0dXNGaWx0ZXIsXG4gICAgYWxsb3dFbXB0eURhdGVzT25BcHBseTogaXNMaW5rTW9kZSxcbiAgICBvbkFwcGx5RmlsdGVyczogKHNuYXBzaG90KSA9PiB7XG4gICAgICBjb25zdCByZXNvbHZlZE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oc25hcHNob3QubWFuYWdlZFVzZXJJZCk7XG4gICAgICB2b2lkIGxvYWRMaXN0KFxuICAgICAgICAxLFxuICAgICAgICBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZCh7XG4gICAgICAgICAgLi4uc25hcHNob3QsXG4gICAgICAgICAgbWFuYWdlZFVzZXJJZDogcmVzb2x2ZWRNYW5hZ2VkVXNlcklkLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9LFxuICAgIG9uQ2xlYXJGaWx0ZXJzOiAoKSA9PiB7XG4gICAgICBjb25zdCByZXNldE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oY3VycmVudEF4VXNlcklkKTtcbiAgICAgIHNldE1hbmFnZWRVc2VySWQocmVzZXRNYW5hZ2VkVXNlcklkKTtcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICAgIHJlc2V0TGlzdCgpO1xuICAgIH0sXG4gIH0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgbm9ybWFsaXplZERlZmF1bHRNYW5hZ2VkVXNlcklkID0gbm9ybWFsaXplVXNlcklkKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcbiAgICBpZiAoIW5vcm1hbGl6ZWREZWZhdWx0TWFuYWdlZFVzZXJJZCkgcmV0dXJuO1xuICAgIHNldE1hbmFnZWRVc2VySWQobm9ybWFsaXplZERlZmF1bHRNYW5hZ2VkVXNlcklkKTtcbiAgICBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24obm9ybWFsaXplZERlZmF1bHRNYW5hZ2VkVXNlcklkKTtcbiAgfSwgW2RlZmF1bHRNYW5hZ2VkVXNlcklkLCBzZXRNYW5hZ2VkVXNlcklkLCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb25dKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChjYW5NYW5hZ2VPdGhlclVzZXJzKSByZXR1cm47XG4gICAgY29uc3QgZmFsbGJhY2tNYW5hZ2VkVXNlcklkID0gcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uKGN1cnJlbnRBeFVzZXJJZCwgY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnMpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50TWFuYWdlZFVzZXJJZCA9IG5vcm1hbGl6ZVVzZXJJZChtYW5hZ2VkVXNlcklkKTtcbiAgICBpZiAoaXNTYW1lVXNlcihub3JtYWxpemVkQ3VycmVudE1hbmFnZWRVc2VySWQsIGZhbGxiYWNrTWFuYWdlZFVzZXJJZCkpIHJldHVybjtcbiAgICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW50TWFuYWdlZFVzZXJJZCAmJiAhZmFsbGJhY2tNYW5hZ2VkVXNlcklkKSByZXR1cm47XG5cbiAgICBzZXRNYW5hZ2VkVXNlcklkKGZhbGxiYWNrTWFuYWdlZFVzZXJJZCk7XG4gICAgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGZhbGxiYWNrTWFuYWdlZFVzZXJJZCk7XG4gIH0sIFtjYW5NYW5hZ2VPdGhlclVzZXJzLCBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2VySWQsIG1hbmFnZWRVc2Vycywgc2V0TWFuYWdlZFVzZXJJZCwgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXSk7XG5cbiAgY29uc3Qge1xuICAgIHNvdXJjZVBpY2tlck9wZW4sXG4gICAgYnVzeTogcXVpY2tUaWNrZXRCdXN5LFxuICAgIHByb2dyZXNzTWVzc2FnZTogcXVpY2tUaWNrZXRQcm9ncmVzc01lc3NhZ2UsXG4gICAgZXJyb3JNZXNzYWdlOiBxdWlja1RpY2tldEVycm9yTWVzc2FnZSxcbiAgICBoYXNQZW5kaW5nVXBsb2FkUmV0cnksXG4gICAgdHJhY2VMaXN0OiBxdWlja1RpY2tldFRyYWNlTGlzdCxcbiAgICBvcGVuU291cmNlUGlja2VyLFxuICAgIGNsb3NlU291cmNlUGlja2VyLFxuICAgIHNlbGVjdEZyb21DYW1lcmEsXG4gICAgc2VsZWN0RnJvbUdhbGxlcnksXG4gICAgaGFuZGxlU2VsZWN0ZWRGaWxlLFxuICAgIHJldHJ5UGVuZGluZ1VwbG9hZCxcbiAgICBjbGVhckVycm9yOiBjbGVhclF1aWNrVGlja2V0RXJyb3IsXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3coe1xuICAgIGNhbkNyZWF0ZUV4cGVuc2U6ICFpc0xpbmtNb2RlICYmIGNhbkNyZWF0ZVRpY2tldCxcbiAgICBpc0NyZWF0ZU1vZGU6IGZhbHNlLFxuICAgIGlzU2hlZXRMb2NrZWQ6IGZhbHNlLFxuICAgIGxpbmtUb1NoZWV0OiBmYWxzZSxcbiAgICBjdXJyZW5jeUNvZGU6IGN1cnJlbmN5Q29kZSB8fCBcIkVVUlwiLFxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxuICAgIG9uQ29tcGxldGVkOiAocmVzdWx0KSA9PiB7XG4gICAgICBjb25zdCBjcmVhdGVkRmlsZUlkID0gc2FmZVRleHQocmVzdWx0Py5maWxlSWQpO1xuICAgICAgaWYgKCFjcmVhdGVkRmlsZUlkKSByZXR1cm47XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/ZmlsZUlkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNyZWF0ZWRGaWxlSWQpfSZtb2RlPWVkaXRgLCB7XG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9LFxuICB9KTtcblxuICBjb25zdCBmYWJNZW51SXRlbXMgPSB1c2VNZW1vPEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW1bXT4oXG4gICAgKCkgPT5cbiAgICAgIGlzTGlua01vZGVcbiAgICAgICAgPyBbXVxuICAgICAgICA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IFwibmV3LXRpY2tldFwiLFxuICAgICAgICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX05ld1RpY2tldFwiLCBcIk51ZXZvIFRpY2tldFwiKSxcbiAgICAgICAgICAgICAgaWNvbjogPE5ld1RpY2tldEljb24gLz4sXG4gICAgICAgICAgICAgIG9uQ2xpY2s6IG9wZW5Tb3VyY2VQaWNrZXIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgW2lzTGlua01vZGUsIG9wZW5Tb3VyY2VQaWNrZXJdXG4gICk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRUaWNrZXRMaXN0ID0gdXNlTWVtbygoKSA9PiBPYmplY3QudmFsdWVzKHNlbGVjdGVkVGlja2V0c0J5SWQpLCBbc2VsZWN0ZWRUaWNrZXRzQnlJZF0pO1xuICBjb25zdCBzZWxlY3RlZFRpY2tldENvdW50ID0gc2VsZWN0ZWRUaWNrZXRMaXN0Lmxlbmd0aDtcbiAgY29uc3Qgc2VsZWN0ZWRUb3RhbEFtb3VudCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBzZWxlY3RlZFRpY2tldExpc3QucmVkdWNlKChzdW0sIGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGFtb3VudCA9IE51bWJlcihpdGVtLnRvdGFsQW1vdW50ID8/IDApO1xuICAgICAgcmV0dXJuIGFtb3VudCA+IDAgPyBzdW0gKyBhbW91bnQgOiBzdW07XG4gICAgfSwgMCk7XG4gIH0sIFtzZWxlY3RlZFRpY2tldExpc3RdKTtcbiAgY29uc3Qgc2VsZWN0ZWRUb3RhbEFtb3VudFRleHQgPSB1c2VNZW1vKCgpID0+IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShzZWxlY3RlZFRvdGFsQW1vdW50LCBcIlwiKSwgW3NlbGVjdGVkVG90YWxBbW91bnRdKTtcbiAgY29uc3Qgc2VsZWN0YWJsZVZpc2libGVUaWNrZXRzID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIGl0ZW1zLmZpbHRlcigoaXRlbSkgPT4gY2FuU2VsZWN0VGlja2V0Rm9yTGluayhpdGVtKSk7XG4gIH0sIFtpdGVtc10pO1xuICBjb25zdCB2aXNpYmxlU2VsZWN0YWJsZUNvdW50ID0gc2VsZWN0YWJsZVZpc2libGVUaWNrZXRzLmxlbmd0aDtcbiAgY29uc3QgbGlua01vZGVDYW5jZWxNZXNzYWdlID0gdXNlTWVtbyhcbiAgICAoKSA9PlxuICAgICAgaW5kVChcbiAgICAgICAgXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9DYW5jZWxDb25maXJtXCIsXG4gICAgICAgIFwiU2UgY2FuY2VsYXJhIGVsIHByb2Nlc28gZGUgdmluY3VsYWNpb24geSB2b2x2ZXJhcyBhIGxhIGhvamEgZGUgZ2FzdG9zLiBRdWllcmVzIGNvbnRpbnVhcj9cIlxuICAgICAgKSxcbiAgICBbXVxuICApO1xuICBjb25zdCBtYXJrTGlua01vZGVTZWxlY3Rpb25JbnRlbnQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgbGlua01vZGVTZWxlY3Rpb25JbnRlbnRVbnRpbFJlZi5jdXJyZW50ID0gRGF0ZS5ub3coKSArIExJTktfTU9ERV9TRUxFQ1RJT05fR1VBUkRfTVM7XG4gICAgaWYgKGxpbmtNb2RlUGVuZGluZ09wZW5UaW1lclJlZi5jdXJyZW50ICE9IG51bGwpIHtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQobGlua01vZGVQZW5kaW5nT3BlblRpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgbGlua01vZGVQZW5kaW5nT3BlblRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNsZWFyUGVuZGluZ0RldGFpbE9wZW4gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGxpbmtNb2RlUGVuZGluZ09wZW5UaW1lclJlZi5jdXJyZW50ICE9IG51bGwpIHtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQobGlua01vZGVQZW5kaW5nT3BlblRpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgbGlua01vZGVQZW5kaW5nT3BlblRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IHNldEZpbHRlcmVkU2VsZWN0ZWRUaWNrZXRzID0gdXNlQ2FsbGJhY2soKHByZWRpY2F0ZTogKGVudHJ5OiBFeHBlbnNlVGlja2V0Q2FyZCkgPT4gYm9vbGVhbikgPT4ge1xuICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQoKHByZXZpb3VzKSA9PiB7XG4gICAgICBjb25zdCBuZXh0OiBSZWNvcmQ8c3RyaW5nLCBFeHBlbnNlVGlja2V0Q2FyZD4gPSB7fTtcbiAgICAgIGZvciAoY29uc3QgW2ZpbGVJZCwgaXRlbV0gb2YgT2JqZWN0LmVudHJpZXMocHJldmlvdXMpKSB7XG4gICAgICAgIGlmIChwcmVkaWNhdGUoaXRlbSkpIHtcbiAgICAgICAgICBuZXh0W2ZpbGVJZF0gPSBpdGVtO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGlzVGlja2V0U2VsZWN0ZWQgPSB1c2VDYWxsYmFjayhcbiAgICAoZmlsZUlkOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHNhZmVGaWxlSWQgPSBzYWZlVGV4dChmaWxlSWQpO1xuICAgICAgcmV0dXJuICEhc2FmZUZpbGVJZCAmJiAhIXNlbGVjdGVkVGlja2V0c0J5SWRbc2FmZUZpbGVJZF07XG4gICAgfSxcbiAgICBbc2VsZWN0ZWRUaWNrZXRzQnlJZF1cbiAgKTtcblxuICBjb25zdCB0b2dnbGVUaWNrZXRTZWxlY3Rpb24gPSB1c2VDYWxsYmFjayhcbiAgICAodGlja2V0OiBFeHBlbnNlVGlja2V0Q2FyZCkgPT4ge1xuICAgICAgaWYgKCFpc0xpbmtNb2RlIHx8ICFjYW5Qcm9jZXNzTGlua01vZGUgfHwgbGlua1NoZWV0Q2hlY2tCdXN5IHx8IGxpbmtTaGVldExvY2tlZCB8fCBsaW5rRmxvd0J1c3kpIHJldHVybjtcblxuICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQodGlja2V0LmZpbGVJZCk7XG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xuICAgICAgaWYgKCFjYW5TZWxlY3RUaWNrZXRGb3JMaW5rKHRpY2tldCkpIHJldHVybjtcblxuICAgICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZCgocHJldmlvdXMpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldmlvdXMgfTtcbiAgICAgICAgaWYgKG5leHRbZmlsZUlkXSkge1xuICAgICAgICAgIGRlbGV0ZSBuZXh0W2ZpbGVJZF07XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dFtmaWxlSWRdID0gdGlja2V0O1xuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW2NhblByb2Nlc3NMaW5rTW9kZSwgaXNMaW5rTW9kZSwgbGlua0Zsb3dCdXN5LCBsaW5rU2hlZXRDaGVja0J1c3ksIGxpbmtTaGVldExvY2tlZF1cbiAgKTtcblxuICBjb25zdCBjbGVhclRpY2tldFNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKHt9KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHNlbGVjdFZpc2libGVUaWNrZXRzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICh2aXNpYmxlU2VsZWN0YWJsZUNvdW50IDwgMSkgcmV0dXJuO1xuICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQoKHByZXZpb3VzKSA9PiB7XG4gICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2aW91cyB9O1xuICAgICAgZm9yIChjb25zdCB0aWNrZXQgb2Ygc2VsZWN0YWJsZVZpc2libGVUaWNrZXRzKSB7XG4gICAgICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KHRpY2tldC5maWxlSWQpO1xuICAgICAgICBpZiAoIWZpbGVJZCkgY29udGludWU7XG4gICAgICAgIG5leHRbZmlsZUlkXSA9IHRpY2tldDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH0pO1xuICB9LCBbc2VsZWN0YWJsZVZpc2libGVUaWNrZXRzLCB2aXNpYmxlU2VsZWN0YWJsZUNvdW50XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYXJQZW5kaW5nRGV0YWlsT3BlbigpO1xuICAgIH07XG4gIH0sIFtjbGVhclBlbmRpbmdEZXRhaWxPcGVuXSk7XG5cbiAgLy8gS2VlcHMgc2VsZWN0ZWQgY2FyZCBtZXRhZGF0YSBmcmVzaCB3aXRoIHRoZSBsYXRlc3QgbGlzdCBwYXlsb2FkLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNMaW5rTW9kZSB8fCBpdGVtcy5sZW5ndGggPCAxKSByZXR1cm47XG4gICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZCgocHJldmlvdXMpID0+IHtcbiAgICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XG4gICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2aW91cyB9O1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KGl0ZW0uZmlsZUlkKTtcbiAgICAgICAgaWYgKCFmaWxlSWQgfHwgIW5leHRbZmlsZUlkXSkgY29udGludWU7XG4gICAgICAgIG5leHRbZmlsZUlkXSA9IGl0ZW07XG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNoYW5nZWQgPyBuZXh0IDogcHJldmlvdXM7XG4gICAgfSk7XG4gIH0sIFtpc0xpbmtNb2RlLCBpdGVtc10pO1xuXG4gIGNvbnN0IHJlc29sdmVBY3RpdmVGaWx0ZXJzID0gdXNlQ2FsbGJhY2soKCk6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgPT4ge1xuICAgIGNvbnN0IGJhc2VTbmFwc2hvdCA9IGFwcGxpZWRGaWx0ZXJzIHx8IGN1cnJlbnRGaWx0ZXJzO1xuICAgIGNvbnN0IHJlc29sdmVkTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihiYXNlU25hcHNob3QubWFuYWdlZFVzZXJJZCk7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKHtcbiAgICAgIC4uLmJhc2VTbmFwc2hvdCxcbiAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc29sdmVkTWFuYWdlZFVzZXJJZCxcbiAgICB9KTtcbiAgfSwgW2FwcGxpZWRGaWx0ZXJzLCBjdXJyZW50RmlsdGVycywgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xuXG4gIGNvbnN0IGJ1aWxkRXhwZW5zZUxpbmVGcm9tVGlja2V0ID0gdXNlQ2FsbGJhY2soXG4gICAgKHRpY2tldDogRXhwZW5zZVRpY2tldENhcmQpOiBFeHBlbnNlU2hlZXRDcmVhdGVMaW5lUmVxdWVzdCB8IG51bGwgPT4ge1xuICAgICAgaWYgKCFjYW5TZWxlY3RUaWNrZXRGb3JMaW5rKHRpY2tldCkpIHJldHVybiBudWxsO1xuXG4gICAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dCh0aWNrZXQuZmlsZUlkKTtcbiAgICAgIGNvbnN0IHR5cGVWYWx1ZSA9IE51bWJlcih0aWNrZXQuZ2FzdG9UeXBlKTtcbiAgICAgIGNvbnN0IHByaWNlID0gTnVtYmVyKHRpY2tldC50b3RhbEFtb3VudCA/PyAwKTtcbiAgICAgIGNvbnN0IHRyYW5zRGF0ZSA9IHRvRXhwZW5zZUFwaURkTW1ZeXl5KHRpY2tldC50cmFuc0RhdGUpIHx8IHRvRXhwZW5zZUFwaURkTW1ZeXl5KG5ldyBEYXRlKCkpO1xuICAgICAgaWYgKCFmaWxlSWQgfHwgIU51bWJlci5pc0ludGVnZXIodHlwZVZhbHVlKSB8fCB0eXBlVmFsdWUgPD0gMCB8fCAhKHByaWNlID4gMCkgfHwgIXRyYW5zRGF0ZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHJhbnNEYXRlLFxuICAgICAgICB0eXBlVmFsdWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dCh0aWNrZXQuZGVzY3JpcHRpb24pIHx8IHNhZmVUZXh0KHRpY2tldC5maWxlTmFtZSkgfHwgaW5kVChcIlRpY2tldHNfRmlsdGVyX0ZpbHRlcktleVwiLCBcIlRpY2tldFwiKSxcbiAgICAgICAgaW50ZXJuYWNpb25hbDogZmFsc2UsXG4gICAgICAgIGZpbGVJZCxcbiAgICAgICAgdGlja2V0OiB0cnVlLFxuICAgICAgICBxdHk6IDEsXG4gICAgICAgIHByaWNlLFxuICAgICAgfTtcbiAgICB9LFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgcmV2YWxpZGF0ZUxpbmtTZWxlY3Rpb24gPSB1c2VDYWxsYmFjayhhc3luYyAoY2FuZGlkYXRlU2VsZWN0aW9uOiBSZWNvcmQ8c3RyaW5nLCBFeHBlbnNlVGlja2V0Q2FyZD4pID0+IHtcbiAgICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoY2FuZGlkYXRlU2VsZWN0aW9uKTtcbiAgICBpZiAoZW50cmllcy5sZW5ndGggPCAxKSByZXR1cm4ge30gYXMgUmVjb3JkPHN0cmluZywgRXhwZW5zZVRpY2tldENhcmQ+O1xuXG4gICAgY29uc3QgbmV4dDogUmVjb3JkPHN0cmluZywgRXhwZW5zZVRpY2tldENhcmQ+ID0ge307XG4gICAgZm9yIChjb25zdCBbZmlsZUlkLCB0aWNrZXRdIG9mIGVudHJpZXMpIHtcbiAgICAgIGNvbnN0IHNhZmVGaWxlSWQgPSBzYWZlVGV4dChmaWxlSWQpO1xuICAgICAgaWYgKCFzYWZlRmlsZUlkIHx8ICFjYW5TZWxlY3RUaWNrZXRGb3JMaW5rKHRpY2tldCkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdChcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYWdlOiAxLFxuICAgICAgICAgICAgcGFnZVNpemU6IDEwLFxuICAgICAgICAgICAgc2VhcmNoS2V5OiBzYWZlRmlsZUlkLFxuICAgICAgICAgICAgZmlsdGVyOiBzYWZlRmlsZUlkLFxuICAgICAgICAgICAgc3RhdHVzOiAwLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBpdGVtc1JhdyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gICAgICAgIGNvbnN0IGV4aXN0c0FzUGVuZGluZyA9IGl0ZW1zUmF3LnNvbWUoKGVudHJ5KSA9PiBzYWZlVGV4dCgoZW50cnkgYXMgeyBGaWxlSWQ/OiB1bmtub3duIH0pLkZpbGVJZCkudG9VcHBlckNhc2UoKSA9PT0gc2FmZUZpbGVJZC50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgaWYgKGV4aXN0c0FzUGVuZGluZykge1xuICAgICAgICAgIG5leHRbc2FmZUZpbGVJZF0gPSB0aWNrZXQ7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBLZWVwIGNhbmRpZGF0ZSBzZWxlY3Rpb24gd2hlbiB2YWxpZGF0aW9uIGVuZHBvaW50IGlzIHRlbXBvcmFyaWx5IHVuYXZhaWxhYmxlLlxuICAgICAgICBuZXh0W3NhZmVGaWxlSWRdID0gdGlja2V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXh0O1xuICB9LCBbXSk7XG5cbiAgY29uc3QgcnVuVGlja2V0TGlua0Zsb3cgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFpc0xpbmtNb2RlIHx8ICFsaW5rU2hlZXRJZCB8fCBsaW5rRmxvd0J1c3kpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGxpbmtTaGVldExvY2tlZCB8fCAhY2FuUHJvY2Vzc0xpbmtNb2RlKSB7XG4gICAgICBzZXRMaW5rRmxvd0Vycm9yKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9QYWlkUmVhZE9ubHlcIiwgXCJMYXMgaG9qYXMgZGUgZ2FzdG8gcGFnYWRhcyBzb24gZGUgc29sbyBsZWN0dXJhLlwiKSk7XG4gICAgICBzZXRMaW5rRmxvd1N0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUGFpZFJlYWRPbmx5XCIsIFwiTGFzIGhvamFzIGRlIGdhc3RvIHBhZ2FkYXMgc29uIGRlIHNvbG8gbGVjdHVyYS5cIikpO1xuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHNlbGVjdGVkRW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHNlbGVjdGVkVGlja2V0c0J5SWQpO1xuICAgIGlmIChzZWxlY3RlZEVudHJpZXMubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHNldExpbmtGbG93QnVzeSh0cnVlKTtcbiAgICBzZXRMaW5rRmxvd0Vycm9yKFwiXCIpO1xuICAgIHNldExpbmtGbG93U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfTGlua2luZ0xpbmVcIiwgXCJMaW5raW5nIGV4cGVuc2UgbGluZS4uLlwiKSk7XG4gICAgbGV0IHN1Y2Nlc3NDb3VudCA9IDA7XG4gICAgY29uc3QgZmFpbGVkU2VsZWN0aW9uOiBSZWNvcmQ8c3RyaW5nLCBFeHBlbnNlVGlja2V0Q2FyZD4gPSB7fTtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2VsZWN0ZWRFbnRyaWVzLmxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgICAgICBjb25zdCBbZmlsZUlkLCB0aWNrZXRdID0gc2VsZWN0ZWRFbnRyaWVzW2luZGV4XTtcbiAgICAgICAgY29uc3Qgc2FmZUZpbGVJZCA9IHNhZmVUZXh0KGZpbGVJZCk7XG4gICAgICAgIHNldExpbmtGbG93U3RhdHVzKFxuICAgICAgICAgIGAke2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfTGlua2luZ0xpbmVcIiwgXCJMaW5raW5nIGV4cGVuc2UgbGluZS4uLlwiKX0gJHtpbmRleCArIDF9LyR7c2VsZWN0ZWRFbnRyaWVzLmxlbmd0aH1gXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgbGluZVBheWxvYWQgPSBidWlsZEV4cGVuc2VMaW5lRnJvbVRpY2tldCh0aWNrZXQpO1xuICAgICAgICBpZiAoIXNhZmVGaWxlSWQgfHwgIWxpbmVQYXlsb2FkKSB7XG4gICAgICAgICAgZmFpbGVkU2VsZWN0aW9uW3NhZmVGaWxlSWQgfHwgZmlsZUlkXSA9IHRpY2tldDtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjcmVhdGVFeHBlbnNlU2hlZXQoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG1vZGU6IDIsXG4gICAgICAgICAgICAgIGV4aXN0aW5nSG9qYUdhc3Rvc0lkOiBsaW5rU2hlZXRJZCxcbiAgICAgICAgICAgICAgbGluZXM6IFtsaW5lUGF5bG9hZF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKHJlc3BvbnNlLlN1Y2Nlc3MgIT09IHRydWUpIHtcbiAgICAgICAgICAgIGZhaWxlZFNlbGVjdGlvbltzYWZlRmlsZUlkXSA9IHRpY2tldDtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHN1Y2Nlc3NDb3VudCArPSAxO1xuICAgICAgICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQoKHByZXZpb3VzKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXByZXZpb3VzW3NhZmVGaWxlSWRdKSByZXR1cm4gcHJldmlvdXM7XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2aW91cyB9O1xuICAgICAgICAgICAgZGVsZXRlIG5leHRbc2FmZUZpbGVJZF07XG4gICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgZmFpbGVkU2VsZWN0aW9uW3NhZmVGaWxlSWRdID0gdGlja2V0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnMoKTtcbiAgICAgIGF3YWl0IGxvYWRMaXN0KGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSwgc25hcHNob3QpO1xuICAgICAgY29uc3QgdmFsaWRhdGVkRmFpbHVyZXMgPSBhd2FpdCByZXZhbGlkYXRlTGlua1NlbGVjdGlvbihmYWlsZWRTZWxlY3Rpb24pO1xuICAgICAgc2V0RmlsdGVyZWRTZWxlY3RlZFRpY2tldHMoKGVudHJ5KSA9PiB7XG4gICAgICAgIGNvbnN0IHNhZmVGaWxlSWQgPSBzYWZlVGV4dChlbnRyeS5maWxlSWQpO1xuICAgICAgICByZXR1cm4gISFzYWZlRmlsZUlkICYmICEhdmFsaWRhdGVkRmFpbHVyZXNbc2FmZUZpbGVJZF07XG4gICAgICB9KTtcblxuICAgICAgaWYgKHN1Y2Nlc3NDb3VudCA9PT0gc2VsZWN0ZWRFbnRyaWVzLmxlbmd0aCkge1xuICAgICAgICBzZXRMaW5rRmxvd1N0YXR1cyhpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIikpO1xuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgMTIwMCk7XG4gICAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChsaW5rU2hlZXRJZCl9YCwge1xuICAgICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdWNjZXNzQ291bnQgPiAwKSB7XG4gICAgICAgIGNvbnN0IGZhaWxlZENvdW50ID0gc2VsZWN0ZWRFbnRyaWVzLmxlbmd0aCAtIHN1Y2Nlc3NDb3VudDtcbiAgICAgICAgY29uc3QgcGFydGlhbE1lc3NhZ2UgPSBgJHtpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIil9ICgke2ZhaWxlZENvdW50fS8ke3NlbGVjdGVkRW50cmllcy5sZW5ndGh9KWA7XG4gICAgICAgIHNldExpbmtGbG93RXJyb3IocGFydGlhbE1lc3NhZ2UpO1xuICAgICAgICBzZXRMaW5rRmxvd1N0YXR1cyhwYXJ0aWFsTWVzc2FnZSk7XG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIndhcm5pbmdQcm9jZXNzXCIsIDE1MDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZhaWx1cmVNZXNzYWdlID0gaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpO1xuICAgICAgc2V0TGlua0Zsb3dFcnJvcihmYWlsdXJlTWVzc2FnZSk7XG4gICAgICBzZXRMaW5rRmxvd1N0YXR1cyhmYWlsdXJlTWVzc2FnZSk7XG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExpbmtGbG93QnVzeShmYWxzZSk7XG4gICAgfVxuICB9LCBbXG4gICAgYnVpbGRFeHBlbnNlTGluZUZyb21UaWNrZXQsXG4gICAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxuICAgIGNsZWFyQ2FjaGVkU3RhdGUsXG4gICAgY3VycmVudFBhZ2UsXG4gICAgaXNMaW5rTW9kZSxcbiAgICBsaW5rRmxvd0J1c3ksXG4gICAgbGlua1NoZWV0SWQsXG4gICAgbGlua1NoZWV0TG9ja2VkLFxuICAgIGxvYWRMaXN0LFxuICAgIHJldmFsaWRhdGVMaW5rU2VsZWN0aW9uLFxuICAgIHJlc29sdmVBY3RpdmVGaWx0ZXJzLFxuICAgIHNlbGVjdGVkVGlja2V0c0J5SWQsXG4gICAgc2V0RmlsdGVyZWRTZWxlY3RlZFRpY2tldHMsXG4gIF0pO1xuXG4gIGNvbnN0IG9wZW5MaW5rQ29uZmlybU1vZGFsID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghaXNMaW5rTW9kZSB8fCBzZWxlY3RlZFRpY2tldENvdW50IDwgMSB8fCBsaW5rRmxvd0J1c3kgfHwgbGlua1NoZWV0Q2hlY2tCdXN5IHx8IGxpbmtTaGVldExvY2tlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldExpbmtGbG93RXJyb3IoXCJcIik7XG4gICAgc2V0TGlua0Zsb3dTdGF0dXMoXCJcIik7XG4gICAgb3BlbkNvbmZpcm0oe1xuICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9MaW5rQnV0dG9uXCIsIFwiVmluY3VsYXIgdGlja2V0KHMpXCIpLFxuICAgICAgbWVzc2FnZTogYCR7aW5kVChcIk5hdl9FeHBlbnNlVGlja2V0c1wiLCBcIlRpY2tldHNcIil9OiAke3NlbGVjdGVkVGlja2V0Q291bnR9XFxuJHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Ub3RhbEFtb3VudFwiLCBcIlRvdGFsIGFtb3VudFwiKX06ICR7c2VsZWN0ZWRUb3RhbEFtb3VudFRleHR9YCxcbiAgICAgIGNvbmZpcm1UZXh0OiBpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfTGlua0J1dHRvblwiLCBcIlZpbmN1bGFyIHRpY2tldChzKVwiKSxcbiAgICAgIGNhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxuICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIHJldHVybiBydW5UaWNrZXRMaW5rRmxvdygpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSwgW1xuICAgIGlzTGlua01vZGUsXG4gICAgc2VsZWN0ZWRUaWNrZXRDb3VudCxcbiAgICBsaW5rRmxvd0J1c3ksXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxuICAgIGxpbmtTaGVldExvY2tlZCxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBzZWxlY3RlZFRvdGFsQW1vdW50VGV4dCxcbiAgICBydW5UaWNrZXRMaW5rRmxvdyxcbiAgXSk7XG5cbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIHNldExpbmtGbG93RXJyb3IoXCJcIik7XG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XG4gICAgICBidXN5OiBsaW5rRmxvd0J1c3ksXG4gICAgICBvbkVycm9yOiAobWVzc2FnZSkgPT4ge1xuICAgICAgICBzZXRMaW5rRmxvd0Vycm9yKG1lc3NhZ2UpO1xuICAgICAgICBzZXRMaW5rRmxvd1N0YXR1cyhtZXNzYWdlKTtcbiAgICAgIH0sXG4gICAgICBkZWZhdWx0RXJyb3JNZXNzYWdlOiBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIiksXG4gICAgfSk7XG4gIH0sIFtoYW5kbGVDb25maXJtLCBsaW5rRmxvd0J1c3ldKTtcblxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGxpbmtGbG93QnVzeVxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxuICAgIDogIWxpbmtGbG93QnVzeSAmJiBsaW5rRmxvd0Vycm9yXG4gICAgICA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKVxuICAgICAgOiBtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKTtcblxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFsaW5rRmxvd0J1c3kgJiYgbGlua0Zsb3dFcnJvcikge1xuICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZvaWQgaGFuZGxlTW9kYWxDb25maXJtKCk7XG4gIH0sIFtjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbGlua0Zsb3dCdXN5LCBsaW5rRmxvd0Vycm9yXSk7XG5cbiAgY29uc3Qgb3BlblRpY2tldERldGFpbCA9IHVzZUNhbGxiYWNrKFxuICAgIChyYXdGaWxlSWQ6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQocmF3RmlsZUlkKTtcbiAgICAgIGlmICghZmlsZUlkKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnMgfHwgY3VycmVudEZpbHRlcnM7XG4gICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSB7XG4gICAgICAgIGZpbHRlcnM6IHNuYXBzaG90LFxuICAgICAgICBwYWdlOiBjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsXG4gICAgICAgIHNjcm9sbFk6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuc2Nyb2xsWSB8fCAwIDogMCxcbiAgICAgICAgZm9jdXNGaWxlSWQ6IGZpbGVJZCxcbiAgICAgICAgaXRlbXMsXG4gICAgICAgIHRvdGFsLFxuICAgICAgICBzZWxlY3RlZFRpY2tldHM6IHNlbGVjdGVkVGlja2V0TGlzdCxcbiAgICAgICAgbGlua01vZGVTaGVldElkOiBpc0xpbmtNb2RlID8gbGlua1NoZWV0SWQgOiBcIlwiLFxuICAgICAgfTtcblxuICAgICAgaWYgKGlzTGlua01vZGUpIHtcbiAgICAgICAgaWYgKERhdGUubm93KCkgPCBsaW5rTW9kZVNlbGVjdGlvbkludGVudFVudGlsUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICAgICAgY2xlYXJQZW5kaW5nRGV0YWlsT3BlbigpO1xuICAgICAgICBsaW5rTW9kZVBlbmRpbmdPcGVuVGltZXJSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBsaW5rTW9kZVBlbmRpbmdPcGVuVGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgaWYgKERhdGUubm93KCkgPCBsaW5rTW9kZVNlbGVjdGlvbkludGVudFVudGlsUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgICAgIHNhdmVDYWNoZWRTdGF0ZShjdXJyZW50U3RhdGUpO1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XG4gICAgICAgICAgICBmaWxlSWQsXG4gICAgICAgICAgICBvcmlnaW46IFwic2hlZXQtbGlua1wiLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChsaW5rU2hlZXRJZCkge1xuICAgICAgICAgICAgcXVlcnkuc2V0KFwic2hlZXRJZFwiLCBsaW5rU2hlZXRJZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xuICAgICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIGJ5cGFzc0d1YXJkT25jZTogdHJ1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwgTElOS19NT0RFX09QRU5fREVUQUlMX0RFTEFZX01TKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzYXZlQ2FjaGVkU3RhdGUoY3VycmVudFN0YXRlKTtcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD9maWxlSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoZmlsZUlkKX1gLCB7XG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW1xuICAgICAgYXBwbGllZEZpbHRlcnMsXG4gICAgICBjbGVhclBlbmRpbmdEZXRhaWxPcGVuLFxuICAgICAgY3VycmVudFBhZ2UsXG4gICAgICBjdXJyZW50RmlsdGVycyxcbiAgICAgIGlzTGlua01vZGUsXG4gICAgICBpdGVtcyxcbiAgICAgIGxpbmtTaGVldElkLFxuICAgICAgc2F2ZUNhY2hlZFN0YXRlLFxuICAgICAgc2VsZWN0ZWRUaWNrZXRMaXN0LFxuICAgICAgdG90YWwsXG4gICAgXVxuICApO1xuXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xuICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCF0aW1lbGluZUNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNhcmQ7XG4gIH0sIFtdKTtcblxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcbiAgICBjb250YWluZXJSZWY6IHRpbWVsaW5lQ29udGFpbmVyUmVmLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBpdGVtcyxcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcbiAgfSk7XG5cbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCgodG90YWwgfHwgMCkgLyBQQUdFX1NJWkUpO1xuXG4gIGNvbnN0IHN1bW1hcnlJdGVtcyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IHNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnM7XG4gICAgaWYgKCFzbmFwc2hvdCkgcmV0dXJuIFtdIGFzIEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfT47XG5cbiAgICBjb25zdCBzdW1tYXJ5OiBBcnJheTx7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0+ID0gW107XG4gICAgY29uc3QgbG9jYWxlID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCI7XG4gICAgY29uc3QgZnJvbURhdGVUZXh0ID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKHNuYXBzaG90LmZyb21EYXRlLCBsb2NhbGUsIFwiXCIpO1xuICAgIGNvbnN0IHRvRGF0ZVRleHQgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoc25hcHNob3QudG9EYXRlLCBsb2NhbGUsIFwiXCIpO1xuXG4gICAgaWYgKGZyb21EYXRlVGV4dCB8fCB0b0RhdGVUZXh0KSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwiZnJvbURhdGVcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpLFxuICAgICAgICB2YWx1ZTogZnJvbURhdGVUZXh0IHx8IFwiLS1cIixcbiAgICAgIH0pO1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcInRvRGF0ZVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKSxcbiAgICAgICAgdmFsdWU6IHRvRGF0ZVRleHQgfHwgXCItLVwiLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNuYXBzaG90LmZpbHRlcktleS50cmltKCkpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJmaWx0ZXJLZXlcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9GaWx0ZXJLZXlcIiwgXCJUaWNrZXRcIiksXG4gICAgICAgIHZhbHVlOiBzbmFwc2hvdC5maWx0ZXJLZXkudHJpbSgpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNuYXBzaG90LmN1cnJlbmN5Q29kZS50cmltKCkpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJjdXJyZW5jeVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIiksXG4gICAgICAgIHZhbHVlOiBzbmFwc2hvdC5jdXJyZW5jeUNvZGUudHJpbSgpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNuYXBzaG90LnN0YXR1c0ZpbHRlciAhPT0gXCJcIikge1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcInN0YXR1c1wiLFxuICAgICAgICBsYWJlbDogaW5kVChcIlRpY2tldHNfRmlsdGVyX1N0YXR1c1wiLCBcIlN0YXR1c1wiKSxcbiAgICAgICAgdmFsdWU6IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbChzbmFwc2hvdC5zdGF0dXNGaWx0ZXIpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNuYXBzaG90Lmdhc3RvVHlwZUZpbHRlciAhPT0gXCJcIikge1xuICAgICAgY29uc3QgY2F0ZWdvcnlMYWJlbCA9IGdhc3RvVHlwZUxhYmVsTWFwLmdldChTdHJpbmcoc25hcHNob3QuZ2FzdG9UeXBlRmlsdGVyKSkgfHwgU3RyaW5nKHNuYXBzaG90Lmdhc3RvVHlwZUZpbHRlcik7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwiY2F0ZWdvcnlcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpLFxuICAgICAgICB2YWx1ZTogY2F0ZWdvcnlMYWJlbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChzbmFwc2hvdC5wcm9jZXNzZWRCeUlhRmlsdGVyICE9PSBcImFsbFwiKSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwicHJvY2Vzc2VkXCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQVwiLCBcIlByb2Nlc3NlZCBieSBJQVwiKSxcbiAgICAgICAgdmFsdWU6XG4gICAgICAgICAgc25hcHNob3QucHJvY2Vzc2VkQnlJYUZpbHRlciA9PT0gXCJ5ZXNcIlxuICAgICAgICAgICAgPyBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9ZZXNcIiwgXCJZZXNcIilcbiAgICAgICAgICAgIDogaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFfTm9cIiwgXCJOb1wiKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzdW1tYXJ5O1xuICB9LCBbYXBwbGllZEZpbHRlcnMsIGdhc3RvVHlwZUxhYmVsTWFwXSk7XG5cbiAgY29uc3Qgc2hvd1N1bW1hcnkgPSAhaXNMaW5rTW9kZSAmJiAhc2hvd0ZpbHRlcnMgJiYgc3VtbWFyeUl0ZW1zLmxlbmd0aCA+IDA7XG5cbiAgLy8gVmFsaWRhdGVzIHRhcmdldCBzaGVldCBsb2NrIHN0YXRlIGJlZm9yZSBlbmFibGluZyBsaW5rIG1vZGUgYWN0aW9ucy5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzTGlua01vZGUgfHwgIWxpbmtTaGVldElkKSB7XG4gICAgICBzZXRMaW5rU2hlZXRMb2NrZWQoZmFsc2UpO1xuICAgICAgc2V0TGlua1NoZWV0Q2hlY2tCdXN5KGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFjYW5Qcm9jZXNzTGlua01vZGUpIHtcbiAgICAgIHNldExpbmtTaGVldExvY2tlZCh0cnVlKTtcbiAgICAgIHNldExpbmtTaGVldENoZWNrQnVzeShmYWxzZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgIHNldExpbmtTaGVldENoZWNrQnVzeSh0cnVlKTtcbiAgICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKGxpbmtTaGVldElkLCB7XG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY2FuY2VsbGVkKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgaGVhZGVycyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IChoZWFkZXJzWzBdIHx8IG51bGwpIGFzIHsgRXhwZW5zZVNoZWV0U3RhdHVzPzogdW5rbm93bjsgVm91Y2hlcj86IHVua25vd24gfSB8IG51bGw7XG4gICAgICAgIGNvbnN0IHN0YXR1c0NvZGUgPSBOdW1iZXIoaGVhZGVyPy5FeHBlbnNlU2hlZXRTdGF0dXMgPz8gLTEpO1xuICAgICAgICBjb25zdCB2b3VjaGVyID0gc2FmZVRleHQoaGVhZGVyPy5Wb3VjaGVyKTtcbiAgICAgICAgY29uc3QgaXNMb2NrZWQgPSBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRCB8fCBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19QQUlEIHx8ICEhdm91Y2hlcjtcbiAgICAgICAgc2V0TGlua1NoZWV0TG9ja2VkKGlzTG9ja2VkKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICBpZiAoY2FuY2VsbGVkKSByZXR1cm47XG4gICAgICAgIHNldExpbmtTaGVldExvY2tlZCh0cnVlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmICghY2FuY2VsbGVkKSB7XG4gICAgICAgICAgc2V0TGlua1NoZWV0Q2hlY2tCdXN5KGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICB9O1xuICB9LCBbY2FuUHJvY2Vzc0xpbmtNb2RlLCBpc0xpbmtNb2RlLCBsaW5rU2hlZXRJZF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc0xpbmtNb2RlKSByZXR1cm47XG4gICAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCh7XG4gICAgICBhY3RpdmU6IHRydWUsXG4gICAgICBtZXNzYWdlOiBsaW5rTW9kZUNhbmNlbE1lc3NhZ2UsXG4gICAgfSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCgpO1xuICAgIH07XG4gIH0sIFtpc0xpbmtNb2RlLCBsaW5rTW9kZUNhbmNlbE1lc3NhZ2VdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChkaWRBcHBseVF1ZXJ5RmlsdGVyUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBkaWRBcHBseVF1ZXJ5RmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgIGlmIChpc0xpbmtNb2RlKSByZXR1cm47XG5cbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICBjb25zdCB0aWNrZXRGaWxlSWQgPSBzYWZlVGV4dCh1cmwuc2VhcmNoUGFyYW1zLmdldChcInRpY2tldEZpbGVJZFwiKSk7XG4gICAgaWYgKCF0aWNrZXRGaWxlSWQpIHJldHVybjtcbiAgICBjb25zdCByZXNvbHZlZE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuXG4gICAgY29uc3QgcXVlcnlTbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9IHtcbiAgICAgIGZyb21EYXRlOiBcIlwiLFxuICAgICAgdG9EYXRlOiBcIlwiLFxuICAgICAgZmlsdGVyS2V5OiB0aWNrZXRGaWxlSWQsXG4gICAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXG4gICAgICBtYW5hZ2VkVXNlcklkOiByZXNvbHZlZE1hbmFnZWRVc2VySWQsXG4gICAgICBzdGF0dXNGaWx0ZXI6IFwiXCIsXG4gICAgICBnYXN0b1R5cGVGaWx0ZXI6IFwiXCIsXG4gICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyOiBcImFsbFwiLFxuICAgIH07XG5cbiAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKHF1ZXJ5U25hcHNob3QpO1xuICAgIHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50ID0gdGlja2V0RmlsZUlkO1xuICAgIHZvaWQgbG9hZExpc3QoMSwgcXVlcnlTbmFwc2hvdCk7XG5cbiAgICB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZShcInRpY2tldEZpbGVJZFwiKTtcbiAgICBjb25zdCBjbGVhbmVkUXVlcnkgPSB1cmwuc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBcIlwiLCBjbGVhbmVkUXVlcnkgPyBgJHt1cmwucGF0aG5hbWV9PyR7Y2xlYW5lZFF1ZXJ5fWAgOiB1cmwucGF0aG5hbWUpO1xuICB9LCBbY2xlYXJDYWNoZWRTdGF0ZSwgZGVmYXVsdE1hbmFnZWRVc2VySWQsIGlzTGlua01vZGUsIGxvYWRMaXN0LCByZXN0b3JlQXBwbGllZEZpbHRlcnMsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBkaWRSZXN0b3JlT25Nb3VudFJlZi5jdXJyZW50ID0gdHJ1ZTtcblxuICAgIGlmIChpc0xpbmtNb2RlKSB7XG4gICAgICBjb25zdCBpc1JldHVybmluZ0Zyb21EZXRhaWwgPSBjb25zdW1lUmV0dXJuRmxhZygpO1xuICAgICAgY29uc3QgY2FjaGVkU3RhdGUgPSBpc1JldHVybmluZ0Zyb21EZXRhaWwgPyByZWFkQ2FjaGVkU3RhdGUoKSA6IG51bGw7XG4gICAgICBjb25zdCBjYWNoZWRTaGVldElkID0gc2FmZVRleHQoY2FjaGVkU3RhdGU/LmxpbmtNb2RlU2hlZXRJZCk7XG4gICAgICBpZiAoY2FjaGVkU3RhdGUgJiYgY2FjaGVkU2hlZXRJZCAmJiBjYWNoZWRTaGVldElkID09PSBzYWZlVGV4dChsaW5rU2hlZXRJZCkpIHtcbiAgICAgICAgY29uc3QgcmVzdG9yZWRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGNhY2hlZFN0YXRlLmZpbHRlcnMubWFuYWdlZFVzZXJJZCk7XG4gICAgICAgIGNvbnN0IHJlc3RvcmVkRmlsdGVycyA9IHtcbiAgICAgICAgICAuLi5jYWNoZWRTdGF0ZS5maWx0ZXJzLFxuICAgICAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCxcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKHJlc3RvcmVkRmlsdGVycyk7XG4gICAgICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBjYWNoZWRTdGF0ZS5zY3JvbGxZO1xuICAgICAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLmZvY3VzRmlsZUlkO1xuICAgICAgICBjb25zdCByZXN0b3JlZFNlbGVjdGlvbjogUmVjb3JkPHN0cmluZywgRXhwZW5zZVRpY2tldENhcmQ+ID0ge307XG4gICAgICAgIGZvciAoY29uc3QgdGlja2V0IG9mIGNhY2hlZFN0YXRlLnNlbGVjdGVkVGlja2V0cykge1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkRmlsZUlkID0gc2FmZVRleHQodGlja2V0LmZpbGVJZCk7XG4gICAgICAgICAgaWYgKCFzZWxlY3RlZEZpbGVJZCkgY29udGludWU7XG4gICAgICAgICAgcmVzdG9yZWRTZWxlY3Rpb25bc2VsZWN0ZWRGaWxlSWRdID0gdGlja2V0O1xuICAgICAgICB9XG4gICAgICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQocmVzdG9yZWRTZWxlY3Rpb24pO1xuICAgICAgICBpZiAoY2FjaGVkU3RhdGUuaXRlbXMubGVuZ3RoID4gMCB8fCBjYWNoZWRTdGF0ZS50b3RhbCA+IDApIHtcbiAgICAgICAgICByZXN0b3JlTGlzdFNuYXBzaG90KHtcbiAgICAgICAgICAgIGl0ZW1zOiBjYWNoZWRTdGF0ZS5pdGVtcyxcbiAgICAgICAgICAgIHRvdGFsOiBjYWNoZWRTdGF0ZS50b3RhbCxcbiAgICAgICAgICAgIHBhZ2U6IGNhY2hlZFN0YXRlLnBhZ2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZvaWQgbG9hZExpc3QoY2FjaGVkU3RhdGUucGFnZSwgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQocmVzdG9yZWRGaWx0ZXJzKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5pdGlhbE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICAgICAgY29uc3QgbGlua1NuYXBzaG90ID0gYnVpbGRMaW5rTW9kZUluaXRpYWxTbmFwc2hvdChpbml0aWFsTWFuYWdlZFVzZXJJZCk7XG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKHt9KTtcbiAgICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhsaW5rU25hcHNob3QpO1xuICAgICAgdm9pZCBsb2FkTGlzdCgxLCBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZChsaW5rU25hcHNob3QpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWNvbnN1bWVSZXR1cm5GbGFnKCkpIHtcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjYWNoZWRTdGF0ZSA9IHJlYWRDYWNoZWRTdGF0ZSgpO1xuICAgIGlmICghY2FjaGVkU3RhdGUpIHtcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByZXN0b3JlZE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oY2FjaGVkU3RhdGUuZmlsdGVycy5tYW5hZ2VkVXNlcklkKTtcbiAgICBjb25zdCByZXN0b3JlZEZpbHRlcnMgPSB7XG4gICAgICAuLi5jYWNoZWRTdGF0ZS5maWx0ZXJzLFxuICAgICAgbWFuYWdlZFVzZXJJZDogcmVzdG9yZWRNYW5hZ2VkVXNlcklkLFxuICAgIH07XG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKHJlc3RvcmVkRmlsdGVycyk7XG4gICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLnNjcm9sbFk7XG4gICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSBjYWNoZWRTdGF0ZS5mb2N1c0ZpbGVJZDtcbiAgICBpZiAoY2FjaGVkU3RhdGUuaXRlbXMubGVuZ3RoID4gMCB8fCBjYWNoZWRTdGF0ZS50b3RhbCA+IDApIHtcbiAgICAgIHJlc3RvcmVMaXN0U25hcHNob3Qoe1xuICAgICAgICBpdGVtczogY2FjaGVkU3RhdGUuaXRlbXMsXG4gICAgICAgIHRvdGFsOiBjYWNoZWRTdGF0ZS50b3RhbCxcbiAgICAgICAgcGFnZTogY2FjaGVkU3RhdGUucGFnZSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2b2lkIGxvYWRMaXN0KGNhY2hlZFN0YXRlLnBhZ2UsIHJlc3RvcmVkRmlsdGVycyk7XG4gIH0sIFtcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxuICAgIGRlZmF1bHRNYW5hZ2VkVXNlcklkLFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIGlzTGlua01vZGUsXG4gICAgbGlua1NoZWV0SWQsXG4gICAgbG9hZExpc3QsXG4gICAgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQsXG4gICAgcmVhZENhY2hlZFN0YXRlLFxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcbiAgICByZXN0b3JlTGlzdFNuYXBzaG90LFxuICAgIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbixcbiAgXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMb2FkaW5nKSByZXR1cm47XG4gICAgaWYgKHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPT0gbnVsbCAmJiAhcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgIGNvbnN0IHBlbmRpbmdTY3JvbGxZID0gcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudDtcbiAgICBjb25zdCBwZW5kaW5nRm9jdXNGaWxlSWQgPSBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudDtcbiAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IFwiXCI7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmIChwZW5kaW5nU2Nyb2xsWSAhPSBudWxsKSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgdG9wOiBNYXRoLm1heCgwLCBwZW5kaW5nU2Nyb2xsWSksXG4gICAgICAgICAgYmVoYXZpb3I6IFwiYXV0b1wiLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFwZW5kaW5nRm9jdXNGaWxlSWQgfHwgIXRpbWVsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgY29uc3Qgbm9ybWFsaXplZEZvY3VzSWQgPSBwZW5kaW5nRm9jdXNGaWxlSWQudG9VcHBlckNhc2UoKTtcbiAgICAgIGNvbnN0IHRpbWVsaW5lSXRlbXMgPSBBcnJheS5mcm9tKFxuICAgICAgICB0aW1lbGluZUNvbnRhaW5lclJlZi5jdXJyZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWl0ZW1bZGF0YS10aWNrZXQtZmlsZS1pZF1cIilcbiAgICAgICk7XG4gICAgICBjb25zdCBtYXRjaGluZ0l0ZW0gPSB0aW1lbGluZUl0ZW1zLmZpbmQoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHNhZmVUZXh0KGl0ZW0uZGF0YXNldC50aWNrZXRGaWxlSWQpLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRGb2N1c0lkO1xuICAgICAgfSk7XG4gICAgICBjb25zdCB0YXJnZXRDYXJkID0gbWF0Y2hpbmdJdGVtPy5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XG4gICAgICBpZiAoIXRhcmdldENhcmQpIHJldHVybjtcblxuICAgICAgdGFyZ2V0Q2FyZC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gICAgfSk7XG4gIH0sIFtpc0xvYWRpbmcsIGl0ZW1zLmxlbmd0aF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb25Ub2dnbGVGaWx0ZXJzID0gKCkgPT4ge1xuICAgICAgY29uc3Qgd2lsbE9wZW4gPSAhc2hvd0ZpbHRlcnM7XG4gICAgICB0b2dnbGVGaWx0ZXJQYW5lbCgpO1xuICAgICAgaWYgKHdpbGxPcGVuKSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uUmVmcmVzaCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnMoKTtcbiAgICAgIGlmICghaXNMaW5rTW9kZSAmJiAoIXNuYXBzaG90Py5mcm9tRGF0ZSB8fCAhc25hcHNob3Q/LnRvRGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdm9pZCBsb2FkTGlzdChjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsIHNuYXBzaG90KTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXRpY2tldHMtdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXhwZW5zZS10aWNrZXRzLXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XG4gICAgfTtcbiAgfSwgW2N1cnJlbnRQYWdlLCBpc0xpbmtNb2RlLCBsb2FkTGlzdCwgcmVzb2x2ZUFjdGl2ZUZpbHRlcnMsIHNob3dGaWx0ZXJzLCB0b2dnbGVGaWx0ZXJQYW5lbF0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgIDxDb25maXJtTW9kYWxcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWxDYW5jZWxUZXh0fVxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxuICAgICAgICBidXN5PXtsaW5rRmxvd0J1c3l9XG4gICAgICAgIGVycm9yPXtsaW5rRmxvd0Vycm9yfVxuICAgICAgICBzdGF0dXM9e2xpbmtGbG93U3RhdHVzfVxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cbiAgICAgICAgb25DYW5jZWw9e2Nsb3NlQ29uZmlybX1cbiAgICAgIC8+XG5cbiAgICAgIDxpbnB1dFxuICAgICAgICByZWY9e2NhbWVyYUlucHV0UmVmfVxuICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgIGFjY2VwdD1cImltYWdlL2pwZWcsaW1hZ2UvanBnLGltYWdlL3BuZyxpbWFnZS93ZWJwXCJcbiAgICAgICAgY2FwdHVyZT1cImVudmlyb25tZW50XCJcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmZpbGVzPy5bMF0gfHwgbnVsbDtcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICB2b2lkIGhhbmRsZVNlbGVjdGVkRmlsZShmaWxlLCBcImNhbWVyYVwiKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgICA8aW5wdXRcbiAgICAgICAgcmVmPXtnYWxsZXJ5SW5wdXRSZWZ9XG4gICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgYWNjZXB0PVwiaW1hZ2UvanBlZyxpbWFnZS9qcGcsaW1hZ2UvcG5nLGltYWdlL3dlYnBcIlxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZmlsZXM/LlswXSB8fCBudWxsO1xuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgIHZvaWQgaGFuZGxlU2VsZWN0ZWRGaWxlKGZpbGUsIFwiZ2FsbGVyeVwiKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG5cbiAgICAgIHshaXNMaW5rTW9kZSAmJiBzb3VyY2VQaWNrZXJPcGVuID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzQ1IHB4LTQgcHktNlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LXNtIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHAtNCBzaGFkb3cteGxcIj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LVsxNnB4XSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX1RpdGxlXCIsIFwiTnVldm8gdGlja2V0XCIpfVxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxuICAgICAgICAgICAgICB7aW5kVChcbiAgICAgICAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9Cb2R5XCIsXG4gICAgICAgICAgICAgICAgXCJTZWxlY2Npb25hIHVuYSBmdWVudGUgcGFyYSBjYXB0dXJhciBvIGVsZWdpciBsYSBpbWFnZW4gZGVsIHRpY2tldC5cIlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgZ3JpZCBncmlkLWNvbHMtMSBnYXAtMlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB2b2lkIHNlbGVjdEZyb21DYW1lcmEoY2FtZXJhSW5wdXRSZWYuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0NhbWVyYVwiLCBcIlVzYXIgY2FtYXJhXCIpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2VsZWN0RnJvbUdhbGxlcnkoZ2FsbGVyeUlucHV0UmVmLmN1cnJlbnQpfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfR2FsbGVyeVwiLCBcIkVsZWdpciBpbWFnZW5cIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbG9zZVNvdXJjZVBpY2tlcn1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgeyFpc0xpbmtNb2RlICYmIHF1aWNrVGlja2V0QnVzeSA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTk1MC8zNSBweC00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZS85NSBweC00IHB5LTMgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNSB3LTVcIiBsYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0gLz5cbiAgICAgICAgICAgIDxzcGFuPntxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgeyFpc0xpbmtNb2RlICYmIHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIHNwYWNlLXktMiByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXJvc2UtNTAgcC0zIHRleHQtc20gdGV4dC1yb3NlLTgwMFwiPlxuICAgICAgICAgIDxwPntxdWlja1RpY2tldEVycm9yTWVzc2FnZX08L3A+XG4gICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy13aGl0ZSBwLTIgdGV4dC14cyB0ZXh0LXJvc2UtNzAwXCI+XG4gICAgICAgICAgICAgIHtxdWlja1RpY2tldFRyYWNlTGlzdC5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgICAgICAgPHAga2V5PXtgJHtlbnRyeS5zdGVwfS0ke2VudHJ5LmF0fWB9PntgJHtlbnRyeS5zdGVwfTogJHtlbnRyeS50cmFjZUlkfWB9PC9wPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTJcIj5cbiAgICAgICAgICAgIHtoYXNQZW5kaW5nVXBsb2FkUmV0cnkgPyAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB2b2lkIHJldHJ5UGVuZGluZ1VwbG9hZCgpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1JldHJ5VXBsb2FkXCIsIFwiUmVpbnRlbnRhciB1cGxvYWRcIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCIgb25DbGljaz17Y2xlYXJRdWlja1RpY2tldEVycm9yfT5cbiAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2xvc2VcIiwgXCJDbG9zZVwiKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7c2hvd1N1bW1hcnkgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLXN1bW1hcnkgcC0zIHNtOnAtNCBtdC0xIG1iLTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4cGVuc2Utc3VtbWFyeS1ncmlkIGdyaWQgZ3JpZC1jb2xzLTEgbWluLVszNjBweF06Z3JpZC1jb2xzLTIgaXRlbXMtc3RhcnQgZ2FwLXgtNCBnYXAteS0xIHRleHQteHNcIj5cbiAgICAgICAgICAgIHtzdW1tYXJ5SXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXtgJHtpdGVtLmtleX0tJHtpdGVtLnZhbHVlfS0ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeSBoaXN0b3J5LWZpbHRlci1zdW1tYXJ5LS1ncmlkLWl0ZW0gbGVhZGluZy01IG1pbi13LTBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeV9fbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpdGVtLmxhYmVsfTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeV9fdmFsdWUgYnJlYWstd29yZHNcIj57aXRlbS52YWx1ZX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbFxuICAgICAgICB2aXNpYmxlPXtzaG93RmlsdGVyc31cbiAgICAgICAgc2hvd01hbnVhbERhdGVGaWx0ZXI9e3Nob3dNYW51YWxEYXRlRmlsdGVyfVxuICAgICAgICBtYW51YWxEYXRlQXV0b09wZW5LZXk9e21hbnVhbERhdGVBdXRvT3BlbktleX1cbiAgICAgICAgZnJvbURhdGU9e2Zyb21EYXRlfVxuICAgICAgICB0b0RhdGU9e3RvRGF0ZX1cbiAgICAgICAgZmlsdGVyS2V5PXtmaWx0ZXJLZXl9XG4gICAgICAgIGN1cnJlbmN5Q29kZT17Y3VycmVuY3lDb2RlfVxuICAgICAgICBtYW5hZ2VkVXNlcklkPXttYW5hZ2VkVXNlcklkfVxuICAgICAgICBtYW5hZ2VkVXNlcnM9e21hbmFnZWRVc2Vyc31cbiAgICAgICAgc2hvd01hbmFnZWRVc2VyRmlsdGVyPXtzaG93TWFuYWdlZFVzZXJGaWx0ZXJ9XG4gICAgICAgIHN0YXR1c0ZpbHRlcj17c3RhdHVzRmlsdGVyfVxuICAgICAgICBnYXN0b1R5cGVGaWx0ZXI9e2dhc3RvVHlwZUZpbHRlcn1cbiAgICAgICAgcHJvY2Vzc2VkQnlJYUZpbHRlcj17cHJvY2Vzc2VkQnlJYUZpbHRlcn1cbiAgICAgICAgYWN0aXZlUXVpY2tGaWx0ZXI9e2FjdGl2ZVF1aWNrRmlsdGVyfVxuICAgICAgICBzaG93TWFudWFsRGF0ZUVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yfVxuICAgICAgICBzdGF0dXNGaWx0ZXJSZWFkT25seT17c3RhdHVzRmlsdGVyTG9ja2VkfVxuICAgICAgICBmaXhlZFN0YXR1c0ZpbHRlcj17Zml4ZWRTdGF0dXNGaWx0ZXJ9XG4gICAgICAgIGdhc3RvVHlwZU9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XG4gICAgICAgIG9uRGF0ZVJhbmdlQ2hhbmdlPXtvbkRhdGVSYW5nZUNoYW5nZX1cbiAgICAgICAgb25NYW51YWxSYW5nZUNvbXBsZXRlPXtvbk1hbnVhbFJhbmdlQ29tcGxldGV9XG4gICAgICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2U9e29uUXVpY2tGaWx0ZXJDaGFuZ2V9XG4gICAgICAgIG9uRmlsdGVyS2V5Q2hhbmdlPXtzZXRGaWx0ZXJLZXl9XG4gICAgICAgIG9uQ3VycmVuY3lDb2RlQ2hhbmdlPXtzZXRDdXJyZW5jeUNvZGV9XG4gICAgICAgIG9uTWFuYWdlZFVzZXJJZENoYW5nZT17c2V0TWFuYWdlZFVzZXJJZH1cbiAgICAgICAgb25TdGF0dXNGaWx0ZXJDaGFuZ2U9e3NldFN0YXR1c0ZpbHRlcn1cbiAgICAgICAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2U9e3NldEdhc3RvVHlwZUZpbHRlcn1cbiAgICAgICAgb25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlPXtzZXRQcm9jZXNzZWRCeUlhRmlsdGVyfVxuICAgICAgICBvbkNsZWFyPXtvbkNsZWFyfVxuICAgICAgICBvbkFwcGx5PXtvbkFwcGx5fVxuICAgICAgLz5cblxuICAgICAge2lzTGlua01vZGUgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIHB4LTAuNVwiPlxuICAgICAgICAgIHshY2FuUHJvY2Vzc0xpbmtNb2RlID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtcm9zZS03MDBcIj57aW5kVChcIkF1dGhfUGVybWlzc2lvbkRlbmllZF9Cb2R5XCIsIFwiTm8gcGVybWlzc2lvbi5cIil9PC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmIGxpbmtTaGVldENoZWNrQnVzeSA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfSAvPlxuICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgIHtjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiBsaW5rU2hlZXRMb2NrZWQgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1yb3NlLTcwMFwiPlxuICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1BhaWRSZWFkT25seVwiLCBcIkxhcyBob2phcyBkZSBnYXN0byBwYWdhZGFzIHNvbiBkZSBzb2xvIGxlY3R1cmEuXCIpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmICFsaW5rU2hlZXRDaGVja0J1c3kgJiYgIWxpbmtTaGVldExvY2tlZCA/IChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMyBnYXAtMS41IHB0LTAuNVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIG1pbi13LTAgcHgtMS41IHB5LTEgdGV4dC1bMTBweF0gbGVhZGluZy10aWdodCBzbTp0ZXh0LXhzXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3NlbGVjdFZpc2libGVUaWNrZXRzfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xpbmtGbG93QnVzeSB8fCB2aXNpYmxlU2VsZWN0YWJsZUNvdW50IDwgMX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1NlbGVjdEFsbFwiLCBcIlNlbGVjY2lvbmFyIHRvZG9zXCIpfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIG1pbi13LTAgcHgtMS41IHB5LTEgdGV4dC1bMTBweF0gbGVhZGluZy10aWdodCBzbTp0ZXh0LXhzXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NsZWFyVGlja2V0U2VsZWN0aW9ufVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xpbmtGbG93QnVzeSB8fCBzZWxlY3RlZFRpY2tldENvdW50IDwgMX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0NsZWFyQWxsXCIsIFwiQm9ycmFyIHRvZG9zXCIpfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIG1pbi13LTAgcHgtMS41IHB5LTEgdGV4dC1bMTBweF0gbGVhZGluZy10aWdodCBzbTp0ZXh0LXhzXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29wZW5MaW5rQ29uZmlybU1vZGFsfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xpbmtGbG93QnVzeSB8fCBzZWxlY3RlZFRpY2tldENvdW50IDwgMX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0xpbmtCdXR0b25cIiwgXCJWaW5jdWxhciB0aWNrZXQocylcIil9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCJcbiAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogaXNMb2FkaW5nID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxuICAgICAgPlxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XG4gICAgICA8L2Rpdj5cblxuICAgICAge2Vycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57ZXJyb3JNZXNzYWdlfTwvZGl2PiA6IG51bGx9XG5cbiAgICAgIHshaXNMb2FkaW5nICYmICFlcnJvck1lc3NhZ2UgJiYgaXRlbXMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveCB0aW1lbGluZS1lbXB0eVwiIGRhdGEtZW1wdHktdGV4dD17aW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpfSAvPlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIHshZXJyb3JNZXNzYWdlICYmIGl0ZW1zLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgIDxkaXYgcmVmPXt0aW1lbGluZUNvbnRhaW5lclJlZn0gY2xhc3NOYW1lPVwidGltZWxpbmUtYm94XCI+XG4gICAgICAgICAge2l0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KGl0ZW0uZmlsZUlkKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVQYXJ0cyA9IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMoaXRlbS50cmFuc0RhdGUsIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiKTtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gc2FmZVRleHQoaXRlbS5kZXNjcmlwdGlvbikgfHwgc2FmZVRleHQoaXRlbS5maWxlTmFtZSkgfHwgZmlsZUlkIHx8IFwiLVwiO1xuICAgICAgICAgICAgY29uc3QgYW1vdW50VGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShpdGVtLnRvdGFsQW1vdW50ID8/IG51bGwsIHNhZmVUZXh0KGl0ZW0uY3VycmVuY3lDb2RlKSk7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNDb2RlID0gaXRlbS5zdGF0dXM7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNMYWJlbCA9IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbChzdGF0dXNDb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IGlzQXNzaWduZWRUb0V4cGVuc2VTaGVldCA9IHN0YXR1c0NvZGUgPT09IDE7XG4gICAgICAgICAgICBjb25zdCBzaG93UHJvY2Vzc2VkQnlBaUljb24gPSBpdGVtLnByb2Nlc3NlZEJ5QUkgPT09IHRydWU7XG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGFibGVJbkxpbmtNb2RlID0gaXNMaW5rTW9kZSAmJiBjYW5TZWxlY3RUaWNrZXRGb3JMaW5rKGl0ZW0pO1xuICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZEluTGlua01vZGUgPSBpc0xpbmtNb2RlICYmIGlzVGlja2V0U2VsZWN0ZWQoZmlsZUlkKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZEJ5QWlMYWJlbCA9IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBXCIsIFwiUHJvY2Vzc2VkIGJ5IElBXCIpO1xuICAgICAgICAgICAgY29uc3QgZ2FzdG9UeXBlQ29kZSA9IGl0ZW0uZ2FzdG9UeXBlID09PSBudWxsID8gXCJcIiA6IFN0cmluZyhpdGVtLmdhc3RvVHlwZSk7XG4gICAgICAgICAgICBjb25zdCBnYXN0b1R5cGVMYWJlbCA9IGdhc3RvVHlwZUNvZGVcbiAgICAgICAgICAgICAgPyBnYXN0b1R5cGVMYWJlbE1hcC5nZXQoZ2FzdG9UeXBlQ29kZSkgfHwgZ2FzdG9UeXBlQ29kZVxuICAgICAgICAgICAgICA6IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xuICAgICAgICAgICAgY29uc3QgY2FyZFN1YnRpdGxlID0gZ2FzdG9UeXBlTGFiZWw7XG4gICAgICAgICAgICBjb25zdCBiYXNlU3RhdHVzSWNvbnMgPSBpc0Fzc2lnbmVkVG9FeHBlbnNlU2hlZXQgfHwgc2hvd1Byb2Nlc3NlZEJ5QWlJY29uID8gKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIHtpc0Fzc2lnbmVkVG9FeHBlbnNlU2hlZXQgPyAoXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvblwiIHJvbGU9XCJpbWdcIiBhcmlhLWxhYmVsPXtzdGF0dXNMYWJlbH0+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPXsxLjV9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNCB3LTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk0xMy4xOSA4LjY4OGE0LjUgNC41IDAgMCAxIDEuMjQyIDcuMjQ0bC00LjUgNC41YTQuNSA0LjUgMCAwIDEtNi4zNjQtNi4zNjRsMS43NTctMS43NTdtMTMuMzUtLjYyMiAxLjc1Ny0xLjc1N2E0LjUgNC41IDAgMCAwLTYuMzY0LTYuMzY0bC00LjUgNC41YTQuNSA0LjUgMCAwIDAgMS4yNDIgNy4yNDRcIlxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgIHtzaG93UHJvY2Vzc2VkQnlBaUljb24gPyAoXG4gICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvbiBleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvbi0tYWlcIlxuICAgICAgICAgICAgICAgICAgICByb2xlPVwiaW1nXCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17cHJvY2Vzc2VkQnlBaUxhYmVsfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTQgdy00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNNCAxOGw0LTEybDQgMTJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTYgMTNoNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgNmg2XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNyA2djEyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAxOGg2XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKSA6IG51bGw7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb25Db250cm9sID0gaXNMaW5rTW9kZSA/IChcbiAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCAtbS0xIGgtNiB3LTYgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCJcbiAgICAgICAgICAgICAgICBvblBvaW50ZXJEb3duPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgbWFya0xpbmtNb2RlU2VsZWN0aW9uSW50ZW50KCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBvbk1vdXNlRG93bj17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgIG1hcmtMaW5rTW9kZVNlbGVjdGlvbkludGVudCgpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgIG1hcmtMaW5rTW9kZVNlbGVjdGlvbkludGVudCgpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBjaGVja2VkPXtpc1NlbGVjdGVkSW5MaW5rTW9kZX1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaXNTZWxlY3RhYmxlSW5MaW5rTW9kZSB8fCBsaW5rRmxvd0J1c3kgfHwgbGlua1NoZWV0Q2hlY2tCdXN5IHx8IGxpbmtTaGVldExvY2tlZH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtNCB3LTQgY3Vyc29yLXBvaW50ZXIgYWNjZW50LXByaW1hcnkgcG9pbnRlci1ldmVudHMtYXV0b1wiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtMaW5rTW9kZVNlbGVjdGlvbkludGVudCgpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtMaW5rTW9kZVNlbGVjdGlvbkludGVudCgpO1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVUaWNrZXRTZWxlY3Rpb24oaXRlbSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1NlbGVjdFRpY2tldFwiLCBcIlNlbGVjY2lvbmFyIHRpY2tldFwiKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApIDogbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1c0ljb25zID0gaXNMaW5rTW9kZSA/IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICB7c2VsZWN0aW9uQ29udHJvbH1cbiAgICAgICAgICAgICAgICB7YmFzZVN0YXR1c0ljb25zfVxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICkgOiBiYXNlU3RhdHVzSWNvbnM7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNJY29uQ2xhc3NOYW1lID0gaXNMaW5rTW9kZVxuICAgICAgICAgICAgICA/IFwiZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb25zIHBvaW50ZXItZXZlbnRzLWF1dG9cIlxuICAgICAgICAgICAgICA6IFwiZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb25zXCI7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e2Ake2ZpbGVJZH0tJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17aXNTZWxlY3RlZEluTGlua01vZGUgPyBcInRpbWVsaW5lLWl0ZW0gcm91bmRlZC0yeGwgcmluZy0yIHJpbmctcHJpbWFyeS8zMFwiIDogXCJ0aW1lbGluZS1pdGVtXCJ9XG4gICAgICAgICAgICAgICAgZGF0YS10aWNrZXQtZmlsZS1pZD17ZmlsZUlkIHx8IHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxFeHBlbnNlVGltZWxpbmVDYXJkXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgICAgICAgICAgIHN1YnRpdGxlPXtjYXJkU3VidGl0bGV9XG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxuICAgICAgICAgICAgICAgICAgb25PcGVuPXsoKSA9PiBvcGVuVGlja2V0RGV0YWlsKGZpbGVJZCl9XG4gICAgICAgICAgICAgICAgICB0aXRsZUNsYXNzTmFtZT1cImV4cGVuc2UtdGlja2V0LWNhcmRfX3RpdGxlIHRpbWVsaW5lLW5hbWVcIlxuICAgICAgICAgICAgICAgICAgc3RhdHVzTGFiZWw9e3N0YXR1c0xhYmVsfVxuICAgICAgICAgICAgICAgICAgc3RhdHVzSWNvbj17c3RhdHVzSWNvbnN9XG4gICAgICAgICAgICAgICAgICBzdGF0dXNJY29uQ2xhc3NOYW1lPXtzdGF0dXNJY29uQ2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXG4gICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsUGFnZXN9XG4gICAgICAgIGN1cnJlbnRQYWdlPXtjdXJyZW50UGFnZX1cbiAgICAgICAgbG9hZGluZz17aXNMb2FkaW5nfVxuICAgICAgICBvblBhZ2VDaGFuZ2U9eyhwYWdlKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc25hcHNob3QgPSByZXNvbHZlQWN0aXZlRmlsdGVycygpO1xuICAgICAgICAgIGlmICghaXNMaW5rTW9kZSAmJiAoIXNuYXBzaG90Py5mcm9tRGF0ZSB8fCAhc25hcHNob3Q/LnRvRGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2b2lkIGxvYWRMaXN0KHBhZ2UsIHNuYXBzaG90KTtcbiAgICAgICAgfX1cbiAgICAgICAgbGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgLz5cblxuICAgICAge2NhbkNyZWF0ZVRpY2tldCAmJiAhaXNMaW5rTW9kZSA/IChcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJhcGlkYXNcIil9XG4gICAgICAgICAgc2l6ZT17NzZ9XG4gICAgICAgICAgcmlnaHQ9ezE2fVxuICAgICAgICAgIGJvdHRvbT17MjR9XG4gICAgICAgICAgbWVudUFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0FjdGlvbnNcIiwgXCJBY2Npb25lcyByYXBpZGFzXCIpfVxuICAgICAgICAgIG1lbnVJdGVtcz17ZmFiTWVudUl0ZW1zfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2UgdGlja2V0cyBsaXN0LlxuY29uc3QgRXhwZW5zZVRpY2tldHNQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cbiAgICAgIDxFeHBlbnNlVGlja2V0c1BhZ2VDb250ZW50IC8+XG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgKTtcbn07XG5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2UtdGlja2V0cy1yb290XCIpO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VUaWNrZXRzUGFnZSAvPik7XG59O1xuXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldHNQYWdlO1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcbmltcG9ydCB0eXBlIHsgQXV0aE1hbmFnZWRVc2VyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi4vLi4vdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVN1bW1hcnkudHN4XCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHtcbiAgZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlck9wdGlvbnMsXG4gIG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlLFxuICB0eXBlIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VUaWNrZXRTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsIEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkIH0gZnJvbSBcIi4uL3RpY2tldHMvZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZURhdGVSYW5nZUZpbHRlciBmcm9tIFwiLi9FeHBlbnNlRGF0ZVJhbmdlRmlsdGVyLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VGaWx0ZXJBY3Rpb25zIGZyb20gXCIuL0V4cGVuc2VGaWx0ZXJBY3Rpb25zLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMgZnJvbSBcIi4vRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0IGZyb20gXCIuL0V4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dC50c3hcIjtcblxuY29uc3QgcGFyc2VJc29EYXRlID0gKHJhdzogc3RyaW5nKTogRGF0ZSB8IG51bGwgPT4ge1xuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKHJhdykudHJpbSgpLnNwbGl0KFwiVFwiKVswXTtcbiAgaWYgKCEvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdCh2YWx1ZSkpIHJldHVybiBudWxsO1xuICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSB2YWx1ZS5zcGxpdChcIi1cIikubWFwKE51bWJlcik7XG4gIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG59O1xuXG5jb25zdCBmb3JtYXREYXRlID0gKHJhdzogc3RyaW5nLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGRhdGUgPSBwYXJzZUlzb0RhdGUocmF3KTtcbiAgaWYgKCFkYXRlKSByZXR1cm4gXCItLVwiO1xuICByZXR1cm4gZGF0ZVxuICAgIC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7XG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxuICAgICAgbW9udGg6IFwic2hvcnRcIixcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgIH0pXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xufTtcblxudHlwZSBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbFByb3BzID0ge1xuICB2aXNpYmxlOiBib29sZWFuO1xuICBzaG93TWFudWFsRGF0ZUZpbHRlcjogYm9vbGVhbjtcbiAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5OiBudW1iZXI7XG4gIGZyb21EYXRlOiBzdHJpbmc7XG4gIHRvRGF0ZTogc3RyaW5nO1xuICBmaWx0ZXJLZXk6IHN0cmluZztcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIG1hbmFnZWRVc2VySWQ6IHN0cmluZztcbiAgbWFuYWdlZFVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXTtcbiAgc2hvd01hbmFnZWRVc2VyRmlsdGVyOiBib29sZWFuO1xuICBzdGF0dXNGaWx0ZXI6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlO1xuICBnYXN0b1R5cGVGaWx0ZXI6IFwiXCIgfCBFeHBlbnNlR2FzdG9UeXBlQ29kZTtcbiAgcHJvY2Vzc2VkQnlJYUZpbHRlcjogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXI7XG4gIGFjdGl2ZVF1aWNrRmlsdGVyOiBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCB8IG51bGw7XG4gIHNob3dNYW51YWxEYXRlRXJyb3I6IGJvb2xlYW47XG4gIHN0YXR1c0ZpbHRlclJlYWRPbmx5PzogYm9vbGVhbjtcbiAgZml4ZWRTdGF0dXNGaWx0ZXI/OiAwIHwgMSB8IG51bGw7XG4gIGdhc3RvVHlwZU9wdGlvbnM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXTtcbiAgb25EYXRlUmFuZ2VDaGFuZ2U6IChmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25NYW51YWxSYW5nZUNvbXBsZXRlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uUXVpY2tGaWx0ZXJDaGFuZ2U6IChmaWx0ZXJJZDogRXhwZW5zZVRpY2tldFF1aWNrRmlsdGVySWQpID0+IHZvaWQ7XG4gIG9uRmlsdGVyS2V5Q2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbk1hbmFnZWRVc2VySWRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvblN0YXR1c0ZpbHRlckNoYW5nZTogKHZhbHVlOiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSkgPT4gdm9pZDtcbiAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogXCJcIiB8IEV4cGVuc2VHYXN0b1R5cGVDb2RlKSA9PiB2b2lkO1xuICBvblByb2Nlc3NlZEJ5SWFGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIpID0+IHZvaWQ7XG4gIG9uQ2xlYXI6ICgpID0+IHZvaWQ7XG4gIG9uQXBwbHk6ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBTaGFyZWQgdGlja2V0cyBmaWx0ZXIgcGFuZWwgd2l0aCBnbG9iYWwgcXVpY2sgZGF0ZSBmaWx0ZXJzIGFuZCBmaXhlZCB0aWNrZXQgZmlsdGVycy5cbmNvbnN0IEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsID0gKHtcbiAgdmlzaWJsZSxcbiAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXG4gIG1hbnVhbERhdGVBdXRvT3BlbktleSxcbiAgZnJvbURhdGUsXG4gIHRvRGF0ZSxcbiAgZmlsdGVyS2V5LFxuICBjdXJyZW5jeUNvZGUsXG4gIG1hbmFnZWRVc2VySWQsXG4gIG1hbmFnZWRVc2VycyxcbiAgc2hvd01hbmFnZWRVc2VyRmlsdGVyLFxuICBzdGF0dXNGaWx0ZXIsXG4gIGdhc3RvVHlwZUZpbHRlcixcbiAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gIHN0YXR1c0ZpbHRlclJlYWRPbmx5ID0gZmFsc2UsXG4gIGZpeGVkU3RhdHVzRmlsdGVyID0gbnVsbCxcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcbiAgb25EYXRlUmFuZ2VDaGFuZ2UsXG4gIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcbiAgb25RdWlja0ZpbHRlckNoYW5nZSxcbiAgb25GaWx0ZXJLZXlDaGFuZ2UsXG4gIG9uQ3VycmVuY3lDb2RlQ2hhbmdlLFxuICBvbk1hbmFnZWRVc2VySWRDaGFuZ2UsXG4gIG9uU3RhdHVzRmlsdGVyQ2hhbmdlLFxuICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZSxcbiAgb25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlLFxuICBvbkNsZWFyLFxuICBvbkFwcGx5LFxufTogRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWxQcm9wcykgPT4ge1xuICBjb25zdCBzdGF0dXNPcHRpb25zID0gdXNlTWVtbygoKSA9PiBnZXRFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyT3B0aW9ucygpLCBbXSk7XG5cbiAgY29uc3QgY2F0ZWdvcnlPcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KCgpID0+IHtcbiAgICByZXR1cm4gW1xuICAgICAgeyB2YWx1ZTogXCJcIiwgdGV4dDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0FsbFwiLCBcIkFsbFwiKSB9LFxuICAgICAgLi4uZ2FzdG9UeXBlT3B0aW9ucyxcbiAgICBdO1xuICB9LCBbZ2FzdG9UeXBlT3B0aW9uc10pO1xuXG4gIGlmICghdmlzaWJsZSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGxvY2FsZSA9IGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiO1xuICBjb25zdCBzaG93SW5saW5lRGF0ZVN1bW1hcnkgPSAhc2hvd01hbnVhbERhdGVGaWx0ZXIgJiYgISFmcm9tRGF0ZSAmJiAhIXRvRGF0ZTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLWV4cGFuZGVkIHAtMiBzbTpwLTIuNSByZWxhdGl2ZVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdGFjayBmbGV4IGZsZXgtY29sIHNwYWNlLXktMlwiPlxuICAgICAgICA8RXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMgYWN0aXZlUXVpY2tGaWx0ZXI9e2FjdGl2ZVF1aWNrRmlsdGVyfSBvblF1aWNrRmlsdGVyQ2hhbmdlPXtvblF1aWNrRmlsdGVyQ2hhbmdlfSAvPlxuXG4gICAgICAgIHtzaG93TWFudWFsRGF0ZUZpbHRlciA/IChcbiAgICAgICAgICA8RXhwZW5zZURhdGVSYW5nZUZpbHRlclxuICAgICAgICAgICAgZnJvbURhdGU9e2Zyb21EYXRlfVxuICAgICAgICAgICAgdG9EYXRlPXt0b0RhdGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25EYXRlUmFuZ2VDaGFuZ2V9XG4gICAgICAgICAgICBvblJhbmdlQ29tcGxldGU9e29uTWFudWFsUmFuZ2VDb21wbGV0ZX1cbiAgICAgICAgICAgIGF1dG9PcGVuUmVxdWVzdElkPXttYW51YWxEYXRlQXV0b09wZW5LZXl9XG4gICAgICAgICAgICBzaG93TWFudWFsRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3J9XG4gICAgICAgICAgICBzaG93U3RhcnRFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvciAmJiAhZnJvbURhdGV9XG4gICAgICAgICAgICBzaG93RW5kRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3IgJiYgIXRvRGF0ZX1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogc2hvd0lubGluZURhdGVTdW1tYXJ5ID8gKFxuICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxuICAgICAgICAgICAgc3VtbWFyeUZyb21MYWJlbD17aW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIil9XG4gICAgICAgICAgICBzdW1tYXJ5VG9MYWJlbD17aW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKX1cbiAgICAgICAgICAgIGZyb21WYWx1ZT17Zm9ybWF0RGF0ZShmcm9tRGF0ZSwgbG9jYWxlKX1cbiAgICAgICAgICAgIHRvVmFsdWU9e2Zvcm1hdERhdGUodG9EYXRlLCBsb2NhbGUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ2FwLXktMSB0ZXh0LVsxMXB4XSBweC0xXCJcbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgJHtzaG93TWFuYWdlZFVzZXJGaWx0ZXIgPyBcImxnOmdyaWQtY29scy02XCIgOiBcImxnOmdyaWQtY29scy01XCJ9IGdhcC0yYH0+XG4gICAgICAgICAgPEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9GaWx0ZXJLZXlcIiwgXCJUaWNrZXRcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX0ZpbHRlcktleVwiLCBcIlRpY2tldFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtmaWx0ZXJLZXl9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25GaWx0ZXJLZXlDaGFuZ2V9XG4gICAgICAgICAgICBlbmFibGVSZW1vdGVTdWdnZXN0aW9uc1xuICAgICAgICAgICAgZml4ZWRTdGF0dXNGaWx0ZXI9e2ZpeGVkU3RhdHVzRmlsdGVyfVxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgdmFsdWU9e2N1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkN1cnJlbmN5Q29kZUNoYW5nZX1cbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICBzaG93TG9hZGluZ1N0YXRlVGV4dD17ZmFsc2V9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIHtzaG93TWFuYWdlZFVzZXJGaWx0ZXIgPyAoXG4gICAgICAgICAgICA8RXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0XG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiQ29tbW9uX1VzZXJcIiwgXCJVc2VyXCIpfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkNvbW1vbl9Vc2VyXCIsIFwiVXNlclwiKX1cbiAgICAgICAgICAgICAgdmFsdWU9e21hbmFnZWRVc2VySWR9XG4gICAgICAgICAgICAgIHVzZXJzPXttYW5hZ2VkVXNlcnN9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbk1hbmFnZWRVc2VySWRDaGFuZ2V9XG4gICAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX1N0YXR1c1wiLCBcIlN0YXR1c1wiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfVxuICAgICAgICAgICAgb3B0aW9ucz17c3RhdHVzT3B0aW9uc31cbiAgICAgICAgICAgIHZhbHVlPXtzdGF0dXNGaWx0ZXJ9XG4gICAgICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4gb25TdGF0dXNGaWx0ZXJDaGFuZ2Uobm9ybWFsaXplRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUobmV4dFZhbHVlLCBcIlwiKSl9XG4gICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICAgICAgICBkaXNhYmxlZD17c3RhdHVzRmlsdGVyUmVhZE9ubHl9XG4gICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLXRpY2tldC1zdGF0dXMtZmlsdGVyXCJcbiAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cbiAgICAgICAgICAgIG9wdGlvbnM9e2NhdGVnb3J5T3B0aW9uc31cbiAgICAgICAgICAgIHZhbHVlPXtnYXN0b1R5cGVGaWx0ZXJ9XG4gICAgICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBOdW1iZXIobmV4dFZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKG5leHRWYWx1ZSA9PT0gXCJcIiB8fCAhTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpKSB7XG4gICAgICAgICAgICAgICAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2UoXCJcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlKHBhcnNlZCBhcyBFeHBlbnNlR2FzdG9UeXBlQ29kZSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS10aWNrZXQtZ2FzdG90eXBlLWZpbHRlclwiXG4gICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIil9XG4gICAgICAgICAgICB2YWx1ZT17cHJvY2Vzc2VkQnlJYUZpbHRlcn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvblByb2Nlc3NlZEJ5SWFGaWx0ZXJDaGFuZ2V9XG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxFeHBlbnNlRmlsdGVyQWN0aW9uc1xuICAgICAgICAgIGNsZWFyTGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGVhclwiLCBcIkNsZWFyXCIpfVxuICAgICAgICAgIGFwcGx5TGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9BcHBseVwiLCBcIkFwcGx5XCIpfVxuICAgICAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XG4gICAgICAgICAgb25BcHBseT17b25BcHBseX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWw7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIgfSBmcm9tIFwiLi4vdGlja2V0cy9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3RQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmFsdWU6IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyO1xuICBvbkNoYW5nZTogKHZhbHVlOiBFeHBlbnNlVGlja2V0UHJvY2Vzc2VkQnlJYUZpbHRlcikgPT4gdm9pZDtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG59O1xuXG4vLyBGaXhlZCBlbnVtIHNlbGVjdCBmb3IgSUEgcHJvY2Vzc2luZyBmaWx0ZXIgd2l0aCBBbGwvWWVzL05vIG9wdGlvbnMuXG5jb25zdCBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdCA9ICh7XG4gIGxhYmVsLFxuICBwbGFjZWhvbGRlcixcbiAgdmFsdWUsXG4gIG9uQ2hhbmdlLFxuICByZWFkT25seSA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICBzaG93TGFiZWwgPSB0cnVlLFxufTogRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3RQcm9wcykgPT4ge1xuICBjb25zdCB1aVZhbHVlID0gdmFsdWUgPT09IFwiYWxsXCIgPyBcIlwiIDogdmFsdWU7XG4gIGNvbnN0IG9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXG4gICAgKCkgPT4gW1xuICAgICAgeyB2YWx1ZTogXCJhbGxcIiwgdGV4dDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1N0YXR1c19Cb3RoXCIsIFwiQWxsXCIpIH0sXG4gICAgICB7IHZhbHVlOiBcInllc1wiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9ZZXNcIiwgXCJZZXNcIikgfSxcbiAgICAgIHsgdmFsdWU6IFwibm9cIiwgdGV4dDogaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFfTm9cIiwgXCJOb1wiKSB9LFxuICAgIF0sXG4gICAgW11cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgIHZhbHVlPXt1aVZhbHVlfVxuICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IHtcbiAgICAgICAgaWYgKG5leHRWYWx1ZSA9PT0gXCJ5ZXNcIiB8fCBuZXh0VmFsdWUgPT09IFwibm9cIiB8fCBuZXh0VmFsdWUgPT09IFwiYWxsXCIpIHtcbiAgICAgICAgICBvbkNoYW5nZShuZXh0VmFsdWUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBvbkNoYW5nZShcImFsbFwiKTtcbiAgICAgIH19XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICBpZEJhc2U9XCJleHBlbnNlLXByb2Nlc3NlZC1ieS1pYS1maWx0ZXJcIlxuICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZW1vdGVTZWFyY2hDb21ib2JveCwgeyB0eXBlIFJlbW90ZVNlYXJjaE9wdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUmVtb3RlU2VhcmNoQ29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8sIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0IH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICBmaXhlZFN0YXR1c0ZpbHRlcj86IDAgfCAxIHwgbnVsbDtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG59O1xuXG5jb25zdCBTRUFSQ0hfUEFHRV9TSVpFID0gMzA7XG5cbi8vIEJ1aWxkcyBtaW5pbWFsIHBheWxvYWQgZm9yIHRpY2tldCBrZXkgc3VnZ2VzdGlvbnMgd2l0aG91dCBkYXRlIGZpbHRlcnMuXG5jb25zdCBidWlsZFRpY2tldFN1Z2dlc3RQYXlsb2FkID0gKFxuICB0ZXJtOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemU6IG51bWJlcixcbiAgZml4ZWRTdGF0dXNGaWx0ZXI6IDAgfCAxIHwgbnVsbFxuKTogRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QgPT4ge1xuICBjb25zdCBzYWZlVGVybSA9IFN0cmluZyh0ZXJtIHx8IFwiXCIpLnRyaW0oKTtcbiAgcmV0dXJuIHtcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2UpIDogMSxcbiAgICBwYWdlU2l6ZTogTnVtYmVyLmlzRmluaXRlKHBhZ2VTaXplKSAmJiBwYWdlU2l6ZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2VTaXplKSA6IFNFQVJDSF9QQUdFX1NJWkUsXG4gICAgc2VhcmNoS2V5OiBzYWZlVGVybSB8fCB1bmRlZmluZWQsXG4gICAgZmlsdGVyOiBzYWZlVGVybSB8fCB1bmRlZmluZWQsXG4gICAgc3RhdHVzOiBmaXhlZFN0YXR1c0ZpbHRlciA9PT0gMCB8fCBmaXhlZFN0YXR1c0ZpbHRlciA9PT0gMSA/IGZpeGVkU3RhdHVzRmlsdGVyIDogdW5kZWZpbmVkLFxuICB9O1xufTtcblxuY29uc3QgbWFwVGlja2V0T3B0aW9ucyA9IChpdGVtczogRXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG9bXSB8IHVuZGVmaW5lZCk6IFJlbW90ZVNlYXJjaE9wdGlvbltdID0+IHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW10pXG4gICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgZmlsZUlkID0gU3RyaW5nKGl0ZW0/LkZpbGVJZCB8fCBcIlwiKS50cmltKCk7XG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gU3RyaW5nKGl0ZW0/LkRlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGNvbnN0IHN1YnRpdGxlID0gZGVzY3JpcHRpb24gfHwgXCItXCI7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogZmlsZUlkLFxuICAgICAgICB0aXRsZTogZmlsZUlkLFxuICAgICAgICBzdWJ0aXRsZSxcbiAgICAgIH0gYXMgUmVtb3RlU2VhcmNoT3B0aW9uO1xuICAgIH0pXG4gICAgLmZpbHRlcihCb29sZWFuKSBhcyBSZW1vdGVTZWFyY2hPcHRpb25bXTtcbn07XG5cbi8vIFRpY2tldCBrZXkgZmlsdGVyIGlucHV0IHdpdGggcmVtb3RlIGxpc3Qgc3VnZ2VzdGlvbnMuXG5jb25zdCBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQgPSAoe1xuICBsYWJlbCxcbiAgcGxhY2Vob2xkZXIsXG4gIHZhbHVlLFxuICBvbkNoYW5nZSxcbiAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnMgPSB0cnVlLFxuICBmaXhlZFN0YXR1c0ZpbHRlciA9IG51bGwsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG59OiBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXRQcm9wcykgPT4ge1xuICBjb25zdCByZWFkT25seU1vZGUgPSByZWFkT25seSB8fCBkaXNhYmxlZDtcblxuICBjb25zdCBsb2FkT3B0aW9ucyA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHNpZ25hbDogQWJvcnRTaWduYWwpOiBQcm9taXNlPFJlbW90ZVNlYXJjaE9wdGlvbltdPiA9PiB7XG4gICAgY29uc3QgcGF5bG9hZCA9IGJ1aWxkVGlja2V0U3VnZ2VzdFBheWxvYWQodGVybSwgMSwgU0VBUkNIX1BBR0VfU0laRSwgZml4ZWRTdGF0dXNGaWx0ZXIpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0KHBheWxvYWQsIHtcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgc2lnbmFsLFxuICAgIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHJldHVybiBtYXBUaWNrZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyk7XG4gIH0sIFtmaXhlZFN0YXR1c0ZpbHRlcl0pO1xuXG4gIGNvbnN0IGxvYWRPcHRpb25zUGFnZSA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHBhZ2U6IG51bWJlciwgX3BhZ2VTaXplOiBudW1iZXIsIHNpZ25hbDogQWJvcnRTaWduYWwpID0+IHtcbiAgICBjb25zdCBwYXlsb2FkID0gYnVpbGRUaWNrZXRTdWdnZXN0UGF5bG9hZCh0ZXJtLCBwYWdlLCBTRUFSQ0hfUEFHRV9TSVpFLCBmaXhlZFN0YXR1c0ZpbHRlcik7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QocGF5bG9hZCwge1xuICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICBzaWduYWwsXG4gICAgfSk7XG5cbiAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIHRvdGFsOiAwLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IG1hcFRpY2tldE9wdGlvbnMocmVzcG9uc2U/Lkl0ZW1zKSxcbiAgICAgIHRvdGFsOiBOdW1iZXIocmVzcG9uc2U/LlRvdGFsIHx8IDApLFxuICAgIH07XG4gIH0sIFtmaXhlZFN0YXR1c0ZpbHRlcl0pO1xuXG4gIGlmICghZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnMgfHwgcmVhZE9ubHlNb2RlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgIHtzaG93TGFiZWwgPyAoXG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiIHN0eWxlPXt7IGNvbG9yOiBcIiMwMDI5NmJlMFwiIH19PlxuICAgICAgICAgICAge2xhYmVsfVxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBweC0zIHB5LTIgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGVhZGluZy01IHRleHQtc2xhdGUtOTAwIGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIlxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbH1cbiAgICAgICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPFJlbW90ZVNlYXJjaENvbWJvYm94XG4gICAgICBsYWJlbD17bGFiZWx9XG4gICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICBvblNlYXJjaD17YXN5bmMgKHRlcm0sIHNpZ25hbCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBhd2FpdCBsb2FkT3B0aW9ucyh0ZXJtLCBzaWduYWwpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH19XG4gICAgICBvblNlYXJjaFBhZ2U9e2FzeW5jICh0ZXJtLCBwYWdlLCBwYWdlU2l6ZSwgc2lnbmFsKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGxvYWRPcHRpb25zUGFnZSh0ZXJtLCBwYWdlLCBwYWdlU2l6ZSwgc2lnbmFsKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBpdGVtczogW10sIHRvdGFsOiAwIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9fVxuICAgICAgaWRCYXNlPVwiZXhwZW5zZS10aWNrZXQtZmlsdGVyLWtleVwiXG4gICAgICBtaW5TZWFyY2hMZW5ndGg9ezB9XG4gICAgICBwYWdlU2l6ZT17U0VBUkNIX1BBR0VfU0laRX1cbiAgICAgIGFsbG93RW1wdHlTZWFyY2hcbiAgICAgIGxvYWRPbk9wZW5cbiAgICAgIGluZmluaXRlU2Nyb2xsXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7XG4gIEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXG4gIEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkLFxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZEYXksIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90LnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGVBcmdzID0ge1xuICBvbkFwcGx5RmlsdGVyczogKHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB2b2lkO1xuICBvbkNsZWFyRmlsdGVyczogKCkgPT4gdm9pZDtcbiAgZGVmYXVsdE1hbmFnZWRVc2VySWQ6IHN0cmluZztcbiAgZml4ZWRTdGF0dXNGaWx0ZXI/OiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSB8IG51bGw7XG4gIGFsbG93RW1wdHlEYXRlc09uQXBwbHk/OiBib29sZWFuO1xufTtcblxuLy8gT3ducyBmaWx0ZXIgVUkgc3RhdGUgYW5kIGFwcGx5L2NsZWFyIHJ1bGVzIGZvciBleHBlbnNlIHRpY2tldHMgbGlzdCBwYWdlLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlID0gKHtcbiAgb25BcHBseUZpbHRlcnMsXG4gIG9uQ2xlYXJGaWx0ZXJzLFxuICBkZWZhdWx0TWFuYWdlZFVzZXJJZCxcbiAgZml4ZWRTdGF0dXNGaWx0ZXIgPSBudWxsLFxuICBhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5ID0gZmFsc2UsXG59OiBVc2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZUFyZ3MpID0+IHtcbiAgY29uc3QgaGFzRml4ZWRTdGF0dXNGaWx0ZXIgPSBmaXhlZFN0YXR1c0ZpbHRlciA9PT0gMCB8fCBmaXhlZFN0YXR1c0ZpbHRlciA9PT0gMTtcblxuICBjb25zdCByZXNvbHZlU3RhdHVzRmlsdGVyID0gdXNlQ2FsbGJhY2soXG4gICAgKHZhbHVlOiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSk6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlID0+IHtcbiAgICAgIGlmIChoYXNGaXhlZFN0YXR1c0ZpbHRlcikge1xuICAgICAgICByZXR1cm4gZml4ZWRTdGF0dXNGaWx0ZXIgYXMgRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBbZml4ZWRTdGF0dXNGaWx0ZXIsIGhhc0ZpeGVkU3RhdHVzRmlsdGVyXVxuICApO1xuXG4gIGNvbnN0IFtmcm9tRGF0ZSwgc2V0RnJvbURhdGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFt0b0RhdGUsIHNldFRvRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2ZpbHRlcktleSwgc2V0RmlsdGVyS2V5XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbY3VycmVuY3lDb2RlLCBzZXRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYW5hZ2VkVXNlcklkLCBzZXRNYW5hZ2VkVXNlcklkXSA9IHVzZVN0YXRlKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcbiAgY29uc3QgW3N0YXR1c0ZpbHRlclJhdywgc2V0U3RhdHVzRmlsdGVyUmF3XSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlPihyZXNvbHZlU3RhdHVzRmlsdGVyKFwiXCIpKTtcbiAgY29uc3QgW2dhc3RvVHlwZUZpbHRlciwgc2V0R2FzdG9UeXBlRmlsdGVyXSA9IHVzZVN0YXRlPFwiXCIgfCBFeHBlbnNlR2FzdG9UeXBlQ29kZT4oXCJcIik7XG4gIGNvbnN0IFtwcm9jZXNzZWRCeUlhRmlsdGVyLCBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyXSA9IHVzZVN0YXRlPFwiYWxsXCIgfCBcInllc1wiIHwgXCJub1wiPihcImFsbFwiKTtcbiAgY29uc3QgW2FjdGl2ZVF1aWNrRmlsdGVyLCBzZXRBY3RpdmVRdWlja0ZpbHRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd01hbnVhbERhdGVGaWx0ZXIsIHNldFNob3dNYW51YWxEYXRlRmlsdGVyXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dNYW51YWxEYXRlRXJyb3IsIHNldFNob3dNYW51YWxEYXRlRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWFudWFsRGF0ZUF1dG9PcGVuS2V5LCBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXldID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFthcHBsaWVkRmlsdGVycywgc2V0QXBwbGllZEZpbHRlcnNdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd0ZpbHRlcnMsIHNldFNob3dGaWx0ZXJzXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFoYXNGaXhlZFN0YXR1c0ZpbHRlcikgcmV0dXJuO1xuICAgIHNldFN0YXR1c0ZpbHRlclJhdyhmaXhlZFN0YXR1c0ZpbHRlciBhcyBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSk7XG4gIH0sIFtmaXhlZFN0YXR1c0ZpbHRlciwgaGFzRml4ZWRTdGF0dXNGaWx0ZXJdKTtcblxuICBjb25zdCBzdGF0dXNGaWx0ZXIgPSByZXNvbHZlU3RhdHVzRmlsdGVyKHN0YXR1c0ZpbHRlclJhdyk7XG5cbiAgY29uc3QgY3VycmVudEZpbHRlcnMgPSB1c2VNZW1vPEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3Q+KFxuICAgICgpID0+ICh7XG4gICAgICBmcm9tRGF0ZSxcbiAgICAgIHRvRGF0ZSxcbiAgICAgIGZpbHRlcktleTogZmlsdGVyS2V5LnRyaW0oKSxcbiAgICAgIGN1cnJlbmN5Q29kZTogY3VycmVuY3lDb2RlLnRyaW0oKSxcbiAgICAgIG1hbmFnZWRVc2VySWQ6IG1hbmFnZWRVc2VySWQudHJpbSgpLFxuICAgICAgc3RhdHVzRmlsdGVyLFxuICAgICAgZ2FzdG9UeXBlRmlsdGVyLFxuICAgICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgICB9KSxcbiAgICBbY3VycmVuY3lDb2RlLCBmaWx0ZXJLZXksIGZyb21EYXRlLCBnYXN0b1R5cGVGaWx0ZXIsIG1hbmFnZWRVc2VySWQsIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsIHN0YXR1c0ZpbHRlciwgdG9EYXRlXVxuICApO1xuXG4gIGNvbnN0IHNldFN0YXR1c0ZpbHRlciA9IHVzZUNhbGxiYWNrKFxuICAgICh2YWx1ZTogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpID0+IHtcbiAgICAgIGlmIChoYXNGaXhlZFN0YXR1c0ZpbHRlcikge1xuICAgICAgICBzZXRTdGF0dXNGaWx0ZXJSYXcoZml4ZWRTdGF0dXNGaWx0ZXIgYXMgRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRTdGF0dXNGaWx0ZXJSYXcodmFsdWUpO1xuICAgIH0sXG4gICAgW2ZpeGVkU3RhdHVzRmlsdGVyLCBoYXNGaXhlZFN0YXR1c0ZpbHRlcl1cbiAgKTtcblxuICBjb25zdCBvbkFwcGx5ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghYWxsb3dFbXB0eURhdGVzT25BcHBseSAmJiAoIWZyb21EYXRlIHx8ICF0b0RhdGUpKSB7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKHRydWUpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIodHJ1ZSk7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9IHtcbiAgICAgIGZyb21EYXRlLFxuICAgICAgdG9EYXRlLFxuICAgICAgZmlsdGVyS2V5OiBmaWx0ZXJLZXkudHJpbSgpLFxuICAgICAgY3VycmVuY3lDb2RlOiBjdXJyZW5jeUNvZGUudHJpbSgpLFxuICAgICAgbWFuYWdlZFVzZXJJZDogbWFuYWdlZFVzZXJJZC50cmltKCksXG4gICAgICBzdGF0dXNGaWx0ZXIsXG4gICAgICBnYXN0b1R5cGVGaWx0ZXIsXG4gICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxuICAgIH07XG5cbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICBzZXRBcHBsaWVkRmlsdGVycyhzbmFwc2hvdCk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcbiAgICBvbkFwcGx5RmlsdGVycyhzbmFwc2hvdCk7XG4gIH0sIFtcbiAgICBhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5LFxuICAgIGN1cnJlbmN5Q29kZSxcbiAgICBmaWx0ZXJLZXksXG4gICAgZnJvbURhdGUsXG4gICAgZ2FzdG9UeXBlRmlsdGVyLFxuICAgIG1hbmFnZWRVc2VySWQsXG4gICAgb25BcHBseUZpbHRlcnMsXG4gICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgICBzdGF0dXNGaWx0ZXIsXG4gICAgdG9EYXRlLFxuICBdKTtcblxuICAvLyBSZWh5ZHJhdGVzIHRpY2tldCBmaWx0ZXJzIGZyb20gYSBjYWNoZWQgc25hcHNob3Qgd2hlbiByZXR1cm5pbmcgZnJvbSBkZXRhaWwuXG4gIGNvbnN0IHJlc3RvcmVBcHBsaWVkRmlsdGVycyA9IHVzZUNhbGxiYWNrKFxuICAgIChzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4ge1xuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdChzbmFwc2hvdCk7XG4gICAgICBjb25zdCBub3JtYWxpemVkU3RhdHVzRmlsdGVyID0gcmVzb2x2ZVN0YXR1c0ZpbHRlcihub3JtYWxpemVkLnN0YXR1c0ZpbHRlcik7XG4gICAgICBjb25zdCByZXN0b3JlZE1hbmFnZWRVc2VySWQgPSBTdHJpbmcobm9ybWFsaXplZC5tYW5hZ2VkVXNlcklkIHx8IGRlZmF1bHRNYW5hZ2VkVXNlcklkKS50cmltKCk7XG4gICAgICBzZXRGcm9tRGF0ZShub3JtYWxpemVkLmZyb21EYXRlKTtcbiAgICAgIHNldFRvRGF0ZShub3JtYWxpemVkLnRvRGF0ZSk7XG4gICAgICBzZXRGaWx0ZXJLZXkobm9ybWFsaXplZC5maWx0ZXJLZXkpO1xuICAgICAgc2V0Q3VycmVuY3lDb2RlKG5vcm1hbGl6ZWQuY3VycmVuY3lDb2RlKTtcbiAgICAgIHNldE1hbmFnZWRVc2VySWQocmVzdG9yZWRNYW5hZ2VkVXNlcklkKTtcbiAgICAgIHNldFN0YXR1c0ZpbHRlclJhdyhub3JtYWxpemVkU3RhdHVzRmlsdGVyKTtcbiAgICAgIHNldEdhc3RvVHlwZUZpbHRlcihub3JtYWxpemVkLmdhc3RvVHlwZUZpbHRlcik7XG4gICAgICBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyKG5vcm1hbGl6ZWQucHJvY2Vzc2VkQnlJYUZpbHRlcik7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgICAgc2V0QXBwbGllZEZpbHRlcnMoe1xuICAgICAgICAuLi5ub3JtYWxpemVkLFxuICAgICAgICBtYW5hZ2VkVXNlcklkOiByZXN0b3JlZE1hbmFnZWRVc2VySWQsXG4gICAgICAgIHN0YXR1c0ZpbHRlcjogbm9ybWFsaXplZFN0YXR1c0ZpbHRlcixcbiAgICAgIH0pO1xuICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICAgIH0sXG4gICAgW2RlZmF1bHRNYW5hZ2VkVXNlcklkLCByZXNvbHZlU3RhdHVzRmlsdGVyXVxuICApO1xuXG4gIGNvbnN0IG9uQ2xlYXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0RnJvbURhdGUoXCJcIik7XG4gICAgc2V0VG9EYXRlKFwiXCIpO1xuICAgIHNldEZpbHRlcktleShcIlwiKTtcbiAgICBzZXRDdXJyZW5jeUNvZGUoXCJcIik7XG4gICAgc2V0TWFuYWdlZFVzZXJJZChkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XG4gICAgc2V0U3RhdHVzRmlsdGVyUmF3KHJlc29sdmVTdGF0dXNGaWx0ZXIoXCJcIikpO1xuICAgIHNldEdhc3RvVHlwZUZpbHRlcihcIlwiKTtcbiAgICBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyKFwiYWxsXCIpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXkoMCk7XG4gICAgc2V0QXBwbGllZEZpbHRlcnMobnVsbCk7XG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gICAgb25DbGVhckZpbHRlcnMoKTtcbiAgfSwgW2RlZmF1bHRNYW5hZ2VkVXNlcklkLCBvbkNsZWFyRmlsdGVycywgcmVzb2x2ZVN0YXR1c0ZpbHRlcl0pO1xuXG4gIGNvbnN0IG9uRGF0ZVJhbmdlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXG4gICAgKG5leHRGcm9tRGF0ZTogc3RyaW5nLCBuZXh0VG9EYXRlOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGhhc0Z1bGxSYW5nZSA9ICEhbmV4dEZyb21EYXRlICYmICEhbmV4dFRvRGF0ZTtcbiAgICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XG4gICAgICBzZXRUb0RhdGUobmV4dFRvRGF0ZSk7XG4gICAgICBpZiAoIWhhc0Z1bGxSYW5nZSkge1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcbiAgICAgIH1cbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgaWYgKHNob3dNYW51YWxEYXRlRXJyb3IpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcighaGFzRnVsbFJhbmdlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtzaG93TWFudWFsRGF0ZUVycm9yXVxuICApO1xuXG4gIGNvbnN0IG9uTWFudWFsUmFuZ2VDb21wbGV0ZSA9IHVzZUNhbGxiYWNrKChuZXh0RnJvbURhdGU6IHN0cmluZywgbmV4dFRvRGF0ZTogc3RyaW5nKSA9PiB7XG4gICAgc2V0RnJvbURhdGUobmV4dEZyb21EYXRlKTtcbiAgICBzZXRUb0RhdGUobmV4dFRvRGF0ZSk7XG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgb25RdWlja0ZpbHRlckNoYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgIChmaWx0ZXJJZDogRXhwZW5zZVRpY2tldFF1aWNrRmlsdGVySWQpID0+IHtcbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJjdXN0b21cIikge1xuICAgICAgICBpZiAoc2hvd01hbnVhbERhdGVGaWx0ZXIpIHtcbiAgICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKHRydWUpO1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICAgICAgc2V0TWFudWFsRGF0ZUF1dG9PcGVuS2V5KChwcmV2aW91cykgPT4gcHJldmlvdXMgKyAxKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihmaWx0ZXJJZCk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcblxuICAgICAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xuICAgICAgY29uc3QgbmV4dEZyb20gPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy03XCIpIHtcbiAgICAgICAgbmV4dEZyb20uc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA2KTtcbiAgICAgIH0gZWxzZSBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy0zMFwiKSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMjkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dEZyb20uc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA4OSk7XG4gICAgICB9XG5cbiAgICAgIHNldEZyb21EYXRlKHRvSXNvRGF0ZShuZXh0RnJvbSkpO1xuICAgICAgc2V0VG9EYXRlKHRvSXNvRGF0ZSh0b2RheSkpO1xuICAgIH0sXG4gICAgW3Nob3dNYW51YWxEYXRlRmlsdGVyXVxuICApO1xuXG4gIGNvbnN0IHRvZ2dsZUZpbHRlclBhbmVsID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFNob3dGaWx0ZXJzKChwcmV2aW91cykgPT4ge1xuICAgICAgY29uc3QgbmV4dCA9ICFwcmV2aW91cztcbiAgICAgIGlmICghbmV4dCkge1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgZnJvbURhdGUsXG4gICAgdG9EYXRlLFxuICAgIGZpbHRlcktleSxcbiAgICBjdXJyZW5jeUNvZGUsXG4gICAgbWFuYWdlZFVzZXJJZCxcbiAgICBzdGF0dXNGaWx0ZXIsXG4gICAgZ2FzdG9UeXBlRmlsdGVyLFxuICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVFcnJvcixcbiAgICBtYW51YWxEYXRlQXV0b09wZW5LZXksXG4gICAgYXBwbGllZEZpbHRlcnMsXG4gICAgc2hvd0ZpbHRlcnMsXG4gICAgY3VycmVudEZpbHRlcnMsXG4gICAgc2V0RmlsdGVyS2V5LFxuICAgIHNldEN1cnJlbmN5Q29kZSxcbiAgICBzZXRNYW5hZ2VkVXNlcklkLFxuICAgIHNldFN0YXR1c0ZpbHRlcixcbiAgICBzZXRHYXN0b1R5cGVGaWx0ZXIsXG4gICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgICBvbkFwcGx5LFxuICAgIG9uQ2xlYXIsXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlLFxuICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcbiAgICBvblF1aWNrRmlsdGVyQ2hhbmdlLFxuICAgIHRvZ2dsZUZpbHRlclBhbmVsLFxuICAgIHN0YXR1c0ZpbHRlckxvY2tlZDogaGFzRml4ZWRTdGF0dXNGaWx0ZXIsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlVGlja2V0U3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcbiAgRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcblxuY29uc3QgQUxMT1dFRF9HQVNUT19UWVBFUyA9IG5ldyBTZXQ8bnVtYmVyPihbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTRdKTtcblxuY29uc3Qgbm9ybWFsaXplR2FzdG9UeXBlRmlsdGVyID0gKHZhbHVlOiB1bmtub3duKTogXCJcIiB8IEV4cGVuc2VHYXN0b1R5cGVDb2RlID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIGNvbnN0IHJhdyA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xuICBpZiAoIXJhdykge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHJhdyk7XG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpIHx8ICFBTExPV0VEX0dBU1RPX1RZUEVTLmhhcyhwYXJzZWQpKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICByZXR1cm4gcGFyc2VkIGFzIEV4cGVuc2VHYXN0b1R5cGVDb2RlO1xufTtcblxuY29uc3Qgbm9ybWFsaXplUHJvY2Vzc2VkQnlJYUZpbHRlciA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwieWVzXCIpIHJldHVybiBcInllc1wiO1xuICBpZiAobm9ybWFsaXplZCA9PT0gXCJub1wiKSByZXR1cm4gXCJub1wiO1xuICByZXR1cm4gXCJhbGxcIjtcbn07XG5cbi8vIE5vcm1hbGl6ZXMgYSB0aWNrZXQgZmlsdGVyIHNuYXBzaG90IHNvIGNhY2hlIGFuZCBVSSBzdGF0ZSB1c2Ugb25lIGNhbm9uaWNhbCBzaGFwZS5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QgPSAoXG4gIHZhbHVlOiBQYXJ0aWFsPEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3Q+IHwgbnVsbCB8IHVuZGVmaW5lZFxuKTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9PiB7XG4gIHJldHVybiB7XG4gICAgZnJvbURhdGU6IFN0cmluZyh2YWx1ZT8uZnJvbURhdGUgfHwgXCJcIikudHJpbSgpLFxuICAgIHRvRGF0ZTogU3RyaW5nKHZhbHVlPy50b0RhdGUgfHwgXCJcIikudHJpbSgpLFxuICAgIGZpbHRlcktleTogU3RyaW5nKHZhbHVlPy5maWx0ZXJLZXkgfHwgXCJcIikudHJpbSgpLFxuICAgIGN1cnJlbmN5Q29kZTogU3RyaW5nKHZhbHVlPy5jdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLFxuICAgIG1hbmFnZWRVc2VySWQ6IFN0cmluZyh2YWx1ZT8ubWFuYWdlZFVzZXJJZCB8fCBcIlwiKS50cmltKCksXG4gICAgc3RhdHVzRmlsdGVyOiBub3JtYWxpemVFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSh2YWx1ZT8uc3RhdHVzRmlsdGVyLCBcIlwiKSxcbiAgICBnYXN0b1R5cGVGaWx0ZXI6IG5vcm1hbGl6ZUdhc3RvVHlwZUZpbHRlcih2YWx1ZT8uZ2FzdG9UeXBlRmlsdGVyKSxcbiAgICBwcm9jZXNzZWRCeUlhRmlsdGVyOiBub3JtYWxpemVQcm9jZXNzZWRCeUlhRmlsdGVyKHZhbHVlPy5wcm9jZXNzZWRCeUlhRmlsdGVyKSxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeSwgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IGdldEV4cGVuc2VTY29wZVRva2VuIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTY29wZS50c1wiO1xuaW1wb3J0IHsgYnVpbGRFeHBlbnNlVGlja2V0TGlzdFBheWxvYWQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVBheWxvYWRCdWlsZGVycy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LCBFeHBlbnNlVGlja2V0Q2FyZCB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcblxudHlwZSBVc2VFeHBlbnNlVGlja2V0c0xpc3REYXRhQXJncyA9IHtcbiAgaGFzQWNjZXNzOiBib29sZWFuO1xuICBwYWdlU2l6ZTogbnVtYmVyO1xuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcbn07XG5jb25zdCBBTExPV0VEX0dBU1RPX1RZUEVfQ09ERVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XG5jb25zdCBFWFBFTlNFX1RJQ0tFVFNfTElTVF9DQUNIRV9LRVlfUFJFRklYID0gXCJleHBlbnNlX3RpY2tldHNfbGlzdF92MVwiO1xuY29uc3QgRVhQRU5TRV9USUNLRVRTX0xJU1RfQ0FDSEVfVFRMX01TID0gMiAqIDYwICogMTAwMDtcblxudHlwZSBFeHBlbnNlVGlja2V0TGlzdENhY2hlRW50cnkgPSB7XG4gIHJlcXVlc3RLZXk6IHN0cmluZztcbiAgcGFnZTogbnVtYmVyO1xuICB0b3RhbDogbnVtYmVyO1xuICBpdGVtczogRXhwZW5zZVRpY2tldENhcmRbXTtcbn07XG5cbmNvbnN0IHRvTnVsbGFibGVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcbn07XG5cbmNvbnN0IHRvTnVsbGFibGVCb29sID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB8IG51bGwgPT4ge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikgcmV0dXJuIHZhbHVlO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSByZXR1cm4gdmFsdWUgPT09IDEgPyB0cnVlIDogdmFsdWUgPT09IDAgPyBmYWxzZSA6IG51bGw7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBjb25zdCBub3JtYWxpemVkID0gdmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKG5vcm1hbGl6ZWQgPT09IFwidHJ1ZVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwiMVwiKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAobm9ybWFsaXplZCA9PT0gXCJmYWxzZVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwiMFwiKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCB0b051bGxhYmxlVGlja2V0U3RhdHVzID0gKHZhbHVlOiB1bmtub3duKTogMCB8IDEgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIHBhcnNlZCA9PT0gMCB8fCBwYXJzZWQgPT09IDEgPyBwYXJzZWQgOiBudWxsO1xufTtcblxuY29uc3QgdG9OdWxsYWJsZVRpY2tldEdhc3RvVHlwZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VHYXN0b1R5cGVDb2RlIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpIHx8ICFBTExPV0VEX0dBU1RPX1RZUEVfQ09ERVMuaGFzKHBhcnNlZCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBwYXJzZWQgYXMgRXhwZW5zZUdhc3RvVHlwZUNvZGU7XG59O1xuXG5jb25zdCBtYXBUaWNrZXRJdGVtVG9DYXJkID0gKGl0ZW06IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogRXhwZW5zZVRpY2tldENhcmQgPT4ge1xuICByZXR1cm4ge1xuICAgIGZpbGVJZDogU3RyaW5nKGl0ZW0/LkZpbGVJZCB8fCBcIlwiKS50cmltKCksXG4gICAgZGVzY3JpcHRpb246IFN0cmluZyhpdGVtPy5EZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXG4gICAgc3RhdHVzOiB0b051bGxhYmxlVGlja2V0U3RhdHVzKGl0ZW0/LlN0YXR1cyksXG4gICAgaG9qYUdhc3Rvc0lkRGlzcGxheTogU3RyaW5nKGl0ZW0/LkhvamFHYXN0b3NJZERpc3BsYXkgPz8gaXRlbT8uaG9qYUdhc3Rvc0lkRGlzcGxheSA/PyBcIlwiKS50cmltKCksXG4gICAgcHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woaXRlbT8uUHJvY2Vzc2VkQnlBSSksXG4gICAgY3VycmVuY3lDb2RlOiBTdHJpbmcoaXRlbT8uQ3VycmVuY3lDb2RlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICB0b3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtPy5Ub3RhbEFtb3VudCksXG4gICAgY3JlYXRlZEJ5VXNlcklkOiBTdHJpbmcoaXRlbT8uQ3JlYXRlZEJ5VXNlcklkIHx8IFwiXCIpLnRyaW0oKSxcbiAgICB0cmFuc0RhdGU6IFN0cmluZyhpdGVtPy5UcmFuc0RhdGUgfHwgXCJcIikudHJpbSgpLFxuICAgIHVybEZpbGU6IFN0cmluZyhpdGVtPy5VcmxGaWxlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICBmaWxlTmFtZTogU3RyaW5nKGl0ZW0/LkZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSxcbiAgICBnYXN0b1R5cGU6IHRvTnVsbGFibGVUaWNrZXRHYXN0b1R5cGUoaXRlbT8uR2FzdG9UeXBlID8/IGl0ZW0/Lmdhc3RvVHlwZSksXG4gIH07XG59O1xuXG5jb25zdCBnZXRMaXN0Q2FjaGVTY29wZSA9ICgpID0+IHtcbiAgcmV0dXJuIGdldEV4cGVuc2VTY29wZVRva2VuKCk7XG59O1xuXG5jb25zdCBnZXRMaXN0Q2FjaGVLZXkgPSAoKSA9PiBgJHtFWFBFTlNFX1RJQ0tFVFNfTElTVF9DQUNIRV9LRVlfUFJFRklYfV8ke2dldExpc3RDYWNoZVNjb3BlKCl9YDtcblxuLy8gUmVhZHMgb25lIHNob3J0LWxpdmVkIGxpc3Qgc25hcHNob3QgdG8gYXZvaWQgcmVwZWF0aW5nIHRoZSBzYW1lIGV4cGVuc2l2ZSByZXF1ZXN0LlxuY29uc3QgcmVhZExpc3RDYWNoZUVudHJ5ID0gKHJlcXVlc3RLZXk6IHN0cmluZyk6IEV4cGVuc2VUaWNrZXRMaXN0Q2FjaGVFbnRyeSB8IG51bGwgPT4ge1xuICBjb25zdCByYXcgPSBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnk8RXhwZW5zZVRpY2tldExpc3RDYWNoZUVudHJ5PihnZXRMaXN0Q2FjaGVLZXkoKSk7XG4gIGlmICghcmF3IHx8IHR5cGVvZiByYXcgIT09IFwib2JqZWN0XCIpIHJldHVybiBudWxsO1xuICBpZiAoU3RyaW5nKHJhdy5yZXF1ZXN0S2V5IHx8IFwiXCIpICE9PSByZXF1ZXN0S2V5KSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBzYWZlSXRlbXMgPSBBcnJheS5pc0FycmF5KHJhdy5pdGVtcykgPyByYXcuaXRlbXMgOiBbXTtcbiAgY29uc3QgdG90YWxSYXcgPSBOdW1iZXIocmF3LnRvdGFsKTtcbiAgY29uc3QgdG90YWwgPSBOdW1iZXIuaXNGaW5pdGUodG90YWxSYXcpICYmIHRvdGFsUmF3ID49IDAgPyB0b3RhbFJhdyA6IHNhZmVJdGVtcy5sZW5ndGg7XG4gIGNvbnN0IHBhZ2VSYXcgPSBOdW1iZXIocmF3LnBhZ2UpO1xuICBjb25zdCBwYWdlID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VSYXcpICYmIHBhZ2VSYXcgPiAwID8gTWF0aC5mbG9vcihwYWdlUmF3KSA6IDE7XG5cbiAgcmV0dXJuIHtcbiAgICByZXF1ZXN0S2V5LFxuICAgIHBhZ2UsXG4gICAgdG90YWwsXG4gICAgaXRlbXM6IHNhZmVJdGVtcyxcbiAgfTtcbn07XG5cbmNvbnN0IHdyaXRlTGlzdENhY2hlRW50cnkgPSAoZW50cnk6IEV4cGVuc2VUaWNrZXRMaXN0Q2FjaGVFbnRyeSk6IHZvaWQgPT4ge1xuICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkoZ2V0TGlzdENhY2hlS2V5KCksIGVudHJ5LCBFWFBFTlNFX1RJQ0tFVFNfTElTVF9DQUNIRV9UVExfTVMpO1xufTtcblxuLy8gT3ducyBsaXN0IGRhdGEgZmV0Y2gsIGxvYWRpbmcgc3RhdGUsIGFuZCBwYWdpbmF0aW9uIG1ldGFkYXRhIGZvciB0aWNrZXRzLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGEgPSAoeyBoYXNBY2Nlc3MsIHBhZ2VTaXplLCBvbkZvcmJpZGRlbiB9OiBVc2VFeHBlbnNlVGlja2V0c0xpc3REYXRhQXJncykgPT4ge1xuICBjb25zdCBbaXRlbXMsIHNldEl0ZW1zXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRDYXJkW10+KFtdKTtcbiAgY29uc3QgW3RvdGFsLCBzZXRUb3RhbF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2N1cnJlbnRQYWdlLCBzZXRDdXJyZW50UGFnZV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZiA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgYWN0aXZlUmVxdWVzdEtleVJlZiA9IHVzZVJlZihcIlwiKTtcbiAgY29uc3QgYWN0aXZlUmVxdWVzdFNlcVJlZiA9IHVzZVJlZigwKTtcblxuICBjb25zdCByZXN0b3JlTGlzdFNuYXBzaG90ID0gdXNlQ2FsbGJhY2soXG4gICAgKHNuYXBzaG90OiB7IGl0ZW1zOiBFeHBlbnNlVGlja2V0Q2FyZFtdOyB0b3RhbDogbnVtYmVyOyBwYWdlOiBudW1iZXIgfSkgPT4ge1xuICAgICAgY29uc3Qgc2FmZUl0ZW1zID0gQXJyYXkuaXNBcnJheShzbmFwc2hvdC5pdGVtcykgPyBzbmFwc2hvdC5pdGVtcyA6IFtdO1xuICAgICAgY29uc3Qgc2FmZVRvdGFsUmF3ID0gTnVtYmVyKHNuYXBzaG90LnRvdGFsKTtcbiAgICAgIGNvbnN0IHNhZmVUb3RhbCA9IE51bWJlci5pc0Zpbml0ZShzYWZlVG90YWxSYXcpICYmIHNhZmVUb3RhbFJhdyA+PSAwID8gc2FmZVRvdGFsUmF3IDogc2FmZUl0ZW1zLmxlbmd0aDtcbiAgICAgIGNvbnN0IHNhZmVQYWdlUmF3ID0gTnVtYmVyKHNuYXBzaG90LnBhZ2UpO1xuICAgICAgY29uc3Qgc2FmZVBhZ2UgPSBOdW1iZXIuaXNGaW5pdGUoc2FmZVBhZ2VSYXcpICYmIHNhZmVQYWdlUmF3ID4gMCA/IE1hdGguZmxvb3Ioc2FmZVBhZ2VSYXcpIDogMTtcblxuICAgICAgc2V0SXRlbXMoc2FmZUl0ZW1zKTtcbiAgICAgIHNldFRvdGFsKHNhZmVUb3RhbCk7XG4gICAgICBzZXRDdXJyZW50UGFnZShzYWZlUGFnZSk7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgIH0sXG4gICAgW11cbiAgKTtcblxuICBjb25zdCBsb2FkTGlzdCA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChwYWdlOiBudW1iZXIsIGZpbHRlcnM6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpID0+IHtcbiAgICAgIGlmICghaGFzQWNjZXNzKSB7XG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGF5bG9hZCA9IGJ1aWxkRXhwZW5zZVRpY2tldExpc3RQYXlsb2FkKGZpbHRlcnMsIHBhZ2UsIHBhZ2VTaXplKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkID0gU3RyaW5nKGZpbHRlcnM/Lm1hbmFnZWRVc2VySWQgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG4gICAgICBjb25zdCByZXF1ZXN0S2V5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBwYXlsb2FkLFxuICAgICAgICBtYW5hZ2VkVXNlcklkOiBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgY2FjaGVkRW50cnkgPSByZWFkTGlzdENhY2hlRW50cnkocmVxdWVzdEtleSk7XG4gICAgICBpZiAoY2FjaGVkRW50cnkpIHtcbiAgICAgICAgaWYgKGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50LmFib3J0KCk7XG4gICAgICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID0gXCJcIjtcbiAgICAgICAgICBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXN0b3JlTGlzdFNuYXBzaG90KHtcbiAgICAgICAgICBpdGVtczogY2FjaGVkRW50cnkuaXRlbXMsXG4gICAgICAgICAgdG90YWw6IGNhY2hlZEVudHJ5LnRvdGFsLFxuICAgICAgICAgIHBhZ2U6IGNhY2hlZEVudHJ5LnBhZ2UsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ICYmIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9PT0gcmVxdWVzdEtleSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50KSB7XG4gICAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQuYWJvcnQoKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgPSBjb250cm9sbGVyO1xuICAgICAgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID0gcmVxdWVzdEtleTtcbiAgICAgIGNvbnN0IHJlcXVlc3RTZXEgPSBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQgKyAxO1xuICAgICAgYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50ID0gcmVxdWVzdFNlcTtcblxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QocGF5bG9hZCwge1xuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocmVxdWVzdFNlcSAhPT0gYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50KSByZXR1cm47XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJUaWNrZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldHMuXCIpKTtcbiAgICAgICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICAgICAgc2V0VG90YWwoMCk7XG4gICAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWFwcGVkSXRlbXMgPSAoQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXSkubWFwKChpdGVtKSA9PlxuICAgICAgICAgIG1hcFRpY2tldEl0ZW1Ub0NhcmQoaXRlbSBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVxuICAgICAgICApO1xuICAgICAgICBjb25zdCByZXNwb25zZVRvdGFsID0gTnVtYmVyKHJlc3BvbnNlPy5Ub3RhbCA/PyBtYXBwZWRJdGVtcy5sZW5ndGggPz8gMCk7XG4gICAgICAgIGNvbnN0IG5leHRUb3RhbCA9IHJlc3BvbnNlVG90YWw7XG5cbiAgICAgICAgd3JpdGVMaXN0Q2FjaGVFbnRyeSh7XG4gICAgICAgICAgcmVxdWVzdEtleSxcbiAgICAgICAgICBwYWdlLFxuICAgICAgICAgIHRvdGFsOiBuZXh0VG90YWwsXG4gICAgICAgICAgaXRlbXM6IG1hcHBlZEl0ZW1zLFxuICAgICAgICB9KTtcblxuICAgICAgICBzZXRJdGVtcyhtYXBwZWRJdGVtcyk7XG4gICAgICAgIHNldFRvdGFsKG5leHRUb3RhbCk7XG4gICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGNvbnRyb2xsZXIuc2lnbmFsLmFib3J0ZWQpIHJldHVybjtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSByZXR1cm47XG4gICAgICAgIGlmIChyZXF1ZXN0U2VxICE9PSBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiVGlja2V0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXRzLlwiKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICAgIHNldFRvdGFsKDApO1xuICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChyZXF1ZXN0U2VxID09PSBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICAgIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFtoYXNBY2Nlc3MsIG9uRm9yYmlkZGVuLCBwYWdlU2l6ZSwgcmVzdG9yZUxpc3RTbmFwc2hvdF1cbiAgKTtcblxuICBjb25zdCByZXNldExpc3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQpIHtcbiAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQuYWJvcnQoKTtcbiAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID0gXCJcIjtcbiAgICB9XG4gICAgc2V0SXRlbXMoW10pO1xuICAgIHNldFRvdGFsKDApO1xuICAgIHNldEN1cnJlbnRQYWdlKDEpO1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50KSB7XG4gICAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQuYWJvcnQoKTtcbiAgICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9IFwiXCI7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgaXRlbXMsXG4gICAgdG90YWwsXG4gICAgY3VycmVudFBhZ2UsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBsb2FkTGlzdCxcbiAgICByZXN0b3JlTGlzdFNuYXBzaG90LFxuICAgIHJlc2V0TGlzdCxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdC50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LCBFeHBlbnNlVGlja2V0Q2FyZCB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcbmltcG9ydCB7XG4gIGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeSxcbiAgZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSxcbiAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeSxcbiAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LFxuICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LFxufSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvc2Vzc2lvbkV4cGlyeS50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZVNjb3BlVG9rZW4gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNjb3BlLnRzXCI7XG5cbmNvbnN0IEVYUEVOU0VfVElDS0VUU19GSUxURVJfS0VZX1BSRUZJWCA9IFwiZXhwZW5zZV90aWNrZXRzX2ZpbHRlcl92MVwiO1xuY29uc3QgRVhQRU5TRV9USUNLRVRTX1JFVFVSTl9GTEFHX0tFWV9QUkVGSVggPSBcImV4cGVuc2VfdGlja2V0c19yZXR1cm5fdjFcIjtcbmNvbnN0IEVYUEVOU0VfVElDS0VUU19DQUNIRV9UVExfTVMgPSAxMiAqIDYwICogNjAgKiAxMDAwO1xuY29uc3QgQUxMT1dFRF9USUNLRVRfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XG5cbmV4cG9ydCB0eXBlIEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUgPSB7XG4gIGZpbHRlcnM6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3Q7XG4gIHBhZ2U6IG51bWJlcjtcbiAgc2Nyb2xsWTogbnVtYmVyO1xuICBmb2N1c0ZpbGVJZDogc3RyaW5nO1xuICBpdGVtczogRXhwZW5zZVRpY2tldENhcmRbXTtcbiAgc2VsZWN0ZWRUaWNrZXRzOiBFeHBlbnNlVGlja2V0Q2FyZFtdO1xuICB0b3RhbDogbnVtYmVyO1xuICBsaW5rTW9kZVNoZWV0SWQ6IHN0cmluZztcbn07XG5cbmNvbnN0IGdldFNjb3BlVG9rZW4gPSAoKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGdldEV4cGVuc2VTY29wZVRva2VuKCk7XG59O1xuXG5jb25zdCBnZXRTY29wZWRLZXlzID0gKCkgPT4ge1xuICBjb25zdCBzY29wZSA9IGdldFNjb3BlVG9rZW4oKTtcbiAgcmV0dXJuIHtcbiAgICBmaWx0ZXJLZXk6IGAke0VYUEVOU0VfVElDS0VUU19GSUxURVJfS0VZX1BSRUZJWH1fJHtzY29wZX1gLFxuICAgIHJldHVybkZsYWdLZXk6IGAke0VYUEVOU0VfVElDS0VUU19SRVRVUk5fRkxBR19LRVlfUFJFRklYfV8ke3Njb3BlfWAsXG4gIH07XG59O1xuXG5jb25zdCB0b051bGxhYmxlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XG59O1xuXG5jb25zdCBub3JtYWxpemVTdGF0dXMgPSAodmFsdWU6IHVua25vd24pOiAwIHwgMSB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICBpZiAocGFyc2VkID09PSAwIHx8IHBhcnNlZCA9PT0gMSkgcmV0dXJuIHBhcnNlZDtcbiAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCBub3JtYWxpemVQcm9jZXNzZWRCeUFpID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB8IG51bGwgPT4ge1xuICBpZiAodmFsdWUgPT09IHRydWUgfHwgdmFsdWUgPT09IGZhbHNlKSByZXR1cm4gdmFsdWU7XG4gIGlmICh2YWx1ZSA9PT0gMSB8fCB2YWx1ZSA9PT0gXCIxXCIgfHwgdmFsdWUgPT09IFwidHJ1ZVwiKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKHZhbHVlID09PSAwIHx8IHZhbHVlID09PSBcIjBcIiB8fCB2YWx1ZSA9PT0gXCJmYWxzZVwiKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3Qgbm9ybWFsaXplVGlja2V0R2FzdG9UeXBlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZVRpY2tldENhcmRbXCJnYXN0b1R5cGVcIl0gPT4ge1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICBpZiAoIU51bWJlci5pc0ludGVnZXIocGFyc2VkKSB8fCAhQUxMT1dFRF9USUNLRVRfR0FTVE9fVFlQRVMuaGFzKHBhcnNlZCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gcGFyc2VkIGFzIEV4cGVuc2VUaWNrZXRDYXJkW1wiZ2FzdG9UeXBlXCJdO1xufTtcblxuY29uc3Qgbm9ybWFsaXplSXRlbXMgPSAocmF3OiB1bmtub3duKTogRXhwZW5zZVRpY2tldENhcmRbXSA9PiB7XG4gIGlmICghQXJyYXkuaXNBcnJheShyYXcpKSByZXR1cm4gW107XG5cbiAgcmV0dXJuIHJhdy5tYXAoKGVudHJ5KSA9PiB7XG4gICAgY29uc3QgaXRlbSA9IChlbnRyeSB8fCB7fSkgYXMgUGFydGlhbDxFeHBlbnNlVGlja2V0Q2FyZD47XG4gICAgcmV0dXJuIHtcbiAgICAgIGZpbGVJZDogU3RyaW5nKGl0ZW0uZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSxcbiAgICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoaXRlbS5kZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXG4gICAgICBzdGF0dXM6IG5vcm1hbGl6ZVN0YXR1cyhpdGVtLnN0YXR1cyksXG4gICAgICBob2phR2FzdG9zSWREaXNwbGF5OiBTdHJpbmcoaXRlbS5ob2phR2FzdG9zSWREaXNwbGF5IHx8IFwiXCIpLnRyaW0oKSxcbiAgICAgIHByb2Nlc3NlZEJ5QUk6IG5vcm1hbGl6ZVByb2Nlc3NlZEJ5QWkoaXRlbS5wcm9jZXNzZWRCeUFJKSxcbiAgICAgIGN1cnJlbmN5Q29kZTogU3RyaW5nKGl0ZW0uY3VycmVuY3lDb2RlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICAgIHRvdGFsQW1vdW50OiB0b051bGxhYmxlTnVtYmVyKGl0ZW0udG90YWxBbW91bnQpLFxuICAgICAgY3JlYXRlZEJ5VXNlcklkOiBTdHJpbmcoaXRlbS5jcmVhdGVkQnlVc2VySWQgfHwgXCJcIikudHJpbSgpLFxuICAgICAgdHJhbnNEYXRlOiBTdHJpbmcoaXRlbS50cmFuc0RhdGUgfHwgXCJcIikudHJpbSgpLFxuICAgICAgdXJsRmlsZTogU3RyaW5nKGl0ZW0udXJsRmlsZSB8fCBcIlwiKS50cmltKCksXG4gICAgICBmaWxlTmFtZTogU3RyaW5nKGl0ZW0uZmlsZU5hbWUgfHwgXCJcIikudHJpbSgpLFxuICAgICAgZ2FzdG9UeXBlOiBub3JtYWxpemVUaWNrZXRHYXN0b1R5cGUoaXRlbS5nYXN0b1R5cGUpLFxuICAgIH07XG4gIH0pO1xufTtcblxuY29uc3Qgbm9ybWFsaXplU3RhdGUgPSAocmF3OiBFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlIHwgbnVsbCk6IEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUgfCBudWxsID0+IHtcbiAgaWYgKCFyYXcgfHwgdHlwZW9mIHJhdyAhPT0gXCJvYmplY3RcIikgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgcGFnZVJhdyA9IE51bWJlcihyYXcucGFnZSk7XG4gIGNvbnN0IHBhZ2UgPSBOdW1iZXIuaXNGaW5pdGUocGFnZVJhdykgJiYgcGFnZVJhdyA+IDAgPyBNYXRoLmZsb29yKHBhZ2VSYXcpIDogMTtcblxuICBjb25zdCBzY3JvbGxSYXcgPSBOdW1iZXIocmF3LnNjcm9sbFkpO1xuICBjb25zdCBzY3JvbGxZID0gTnVtYmVyLmlzRmluaXRlKHNjcm9sbFJhdykgJiYgc2Nyb2xsUmF3ID49IDAgPyBNYXRoLmZsb29yKHNjcm9sbFJhdykgOiAwO1xuICBjb25zdCBpdGVtcyA9IG5vcm1hbGl6ZUl0ZW1zKChyYXcgYXMgeyBpdGVtcz86IHVua25vd24gfSkuaXRlbXMpO1xuICBjb25zdCBzZWxlY3RlZFRpY2tldHMgPSBub3JtYWxpemVJdGVtcygocmF3IGFzIHsgc2VsZWN0ZWRUaWNrZXRzPzogdW5rbm93biB9KS5zZWxlY3RlZFRpY2tldHMpO1xuICBjb25zdCB0b3RhbFJhdyA9IE51bWJlcigocmF3IGFzIHsgdG90YWw/OiB1bmtub3duIH0pLnRvdGFsKTtcbiAgY29uc3QgdG90YWwgPSBOdW1iZXIuaXNGaW5pdGUodG90YWxSYXcpICYmIHRvdGFsUmF3ID49IDAgPyB0b3RhbFJhdyA6IGl0ZW1zLmxlbmd0aDtcblxuICByZXR1cm4ge1xuICAgIGZpbHRlcnM6IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdChyYXcuZmlsdGVycyksXG4gICAgcGFnZSxcbiAgICBzY3JvbGxZLFxuICAgIGZvY3VzRmlsZUlkOiBTdHJpbmcocmF3LmZvY3VzRmlsZUlkIHx8IFwiXCIpLnRyaW0oKSxcbiAgICBpdGVtcyxcbiAgICBzZWxlY3RlZFRpY2tldHMsXG4gICAgdG90YWwsXG4gICAgbGlua01vZGVTaGVldElkOiBTdHJpbmcoKHJhdyBhcyB7IGxpbmtNb2RlU2hlZXRJZD86IHVua25vd24gfSkubGlua01vZGVTaGVldElkIHx8IFwiXCIpLnRyaW0oKSxcbiAgfTtcbn07XG5cbi8vIENlbnRyYWxpemVzIGNhY2hlIHBlcnNpc3RlbmNlIGZvciByZXR1cm5pbmcgZnJvbSB0aWNrZXQgZGV0YWlsIHRvIGxpc3QuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZSA9ICgpID0+IHtcbiAgY29uc3QgcmVhZENhY2hlZFN0YXRlID0gdXNlQ2FsbGJhY2soKCk6IEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUgfCBudWxsID0+IHtcbiAgICBjb25zdCBrZXlzID0gZ2V0U2NvcGVkS2V5cygpO1xuICAgIGNvbnN0IHJhdyA9IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeTxFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlPihrZXlzLmZpbHRlcktleSk7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZVN0YXRlKHJhdyk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBjb25zdW1lUmV0dXJuRmxhZyA9IHVzZUNhbGxiYWNrKCgpOiBib29sZWFuID0+IHtcbiAgICBjb25zdCBrZXlzID0gZ2V0U2NvcGVkS2V5cygpO1xuICAgIGNvbnN0IHJhdyA9IGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5cy5yZXR1cm5GbGFnS2V5KTtcbiAgICBpZiAocmF3ID09PSBcIjFcIikge1xuICAgICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXlzLnJldHVybkZsYWdLZXkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHNhdmVDYWNoZWRTdGF0ZSA9IHVzZUNhbGxiYWNrKChzdGF0ZTogRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVTdGF0ZShzdGF0ZSk7XG4gICAgaWYgKCFub3JtYWxpemVkKSByZXR1cm47XG5cbiAgICBjb25zdCBrZXlzID0gZ2V0U2NvcGVkS2V5cygpO1xuICAgIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeShrZXlzLmZpbHRlcktleSwgbm9ybWFsaXplZCwgRVhQRU5TRV9USUNLRVRTX0NBQ0hFX1RUTF9NUyk7XG4gICAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXlzLnJldHVybkZsYWdLZXksIFwiMVwiLCBFWFBFTlNFX1RJQ0tFVFNfQ0FDSEVfVFRMX01TKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNsZWFyQ2FjaGVkU3RhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3Qga2V5cyA9IGdldFNjb3BlZEtleXMoKTtcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleXMuZmlsdGVyS2V5KTtcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleXMucmV0dXJuRmxhZ0tleSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIHJlYWRDYWNoZWRTdGF0ZSxcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcbiAgICBzYXZlQ2FjaGVkU3RhdGUsXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSxcbiAgfTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBaUU7OztBQ0FqRSxJQUFBQyxnQkFBK0I7OztBQ0EvQixtQkFBK0I7QUFxQzNCO0FBcEJKLElBQU0sbUNBQW1DLENBQUM7QUFBQSxFQUN4QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUNkLE1BQTZDO0FBQzNDLFFBQU0sVUFBVSxVQUFVLFFBQVEsS0FBSztBQUN2QyxRQUFNLGNBQVU7QUFBQSxJQUNkLE1BQU07QUFBQSxNQUNKLEVBQUUsT0FBTyxPQUFPLE1BQU0sS0FBSyxvQ0FBb0MsS0FBSyxFQUFFO0FBQUEsTUFDdEUsRUFBRSxPQUFPLE9BQU8sTUFBTSxLQUFLLG9DQUFvQyxLQUFLLEVBQUU7QUFBQSxNQUN0RSxFQUFFLE9BQU8sTUFBTSxNQUFNLEtBQUssbUNBQW1DLElBQUksRUFBRTtBQUFBLElBQ3JFO0FBQUEsSUFDQSxDQUFDO0FBQUEsRUFDSDtBQUVBLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLE9BQU87QUFBQSxNQUNQLFVBQVUsQ0FBQyxjQUFjO0FBQ3ZCLFlBQUksY0FBYyxTQUFTLGNBQWMsUUFBUSxjQUFjLE9BQU87QUFDcEUsbUJBQVMsU0FBUztBQUNsQjtBQUFBLFFBQ0Y7QUFDQSxpQkFBUyxLQUFLO0FBQUEsTUFDaEI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsUUFBTztBQUFBLE1BQ1AsaUJBQWdCO0FBQUEsTUFDaEIsZ0JBQWU7QUFBQSxNQUNmLGdC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QztBQUFBLFFBQ0E7QUFBQSxRQUNBLFNBQVM7QUFBQSxRQUNULGNBQWMsQ0FBQyxTQUFTO0FBQ3RCLGdCQUFNLFdBQVcscUJBQXFCO0FBQ3RDLGNBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxZQUFZLENBQUMsVUFBVSxTQUFTO0FBQzdEO0FBQUEsVUFDRjtBQUVBLGVBQUssU0FBUyxNQUFNLFFBQVE7QUFBQSxRQUM5QjtBQUFBLFFBQ0EsUUFBUTtBQUFBO0FBQUEsSUFDVjtBQUFBLElBRUMsbUJBQW1CLENBQUMsYUFDbkI7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVcsS0FBSyw2QkFBNkIsa0JBQWtCO0FBQUEsUUFDL0QsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsZUFBZSxLQUFLLDZCQUE2QixrQkFBa0I7QUFBQSxRQUNuRSxXQUFXO0FBQUE7QUFBQSxJQUNiLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLHFCQUFxQixNQUFNO0FBQy9CLFNBQ0UsNkNBQUMsZ0NBQXFCLHlCQUF1QixNQUMzQyx1REFBQyw2QkFBMEIsR0FDN0I7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLHNCQUFzQjtBQUM3RCxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLHNCQUFtQixDQUFFO0FBQ2pEO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyw2QkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJ0b051bGxhYmxlTnVtYmVyIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJBTExPV0VEX0dBU1RPX1RZUEVTIiwgIlJlYWN0IiwgImlzTGlua01vZGUiLCAiY2FjaGVkU3RhdGUiLCAicmVzdG9yZWRNYW5hZ2VkVXNlcklkIiwgInJlc3RvcmVkRmlsdGVycyJdCn0K
