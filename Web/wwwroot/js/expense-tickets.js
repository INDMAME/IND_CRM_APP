import {
  ExpenseDateRangeFilter_default,
  ExpenseFilterActions_default,
  ExpenseManagedUserFilterSelect_default,
  ExpenseQuickDateFilters_default,
  buildExpenseTicketListPayload
} from "./chunks/chunk-HP3C7VWD.js";
import {
  HistorySummary_default
} from "./chunks/chunk-7Z3NMBR5.js";
import {
  getExpenseTicketStatusFilterOptions,
  getExpenseTicketStatusLabel,
  normalizeExpenseTicketFilterSnapshot,
  normalizeExpenseTicketStatusFilterCode,
  useExpenseTicketsFilterCache
} from "./chunks/chunk-H2H2IOIN.js";
import {
  mapWindowEnumOptions
} from "./chunks/chunk-BVPBMOU4.js";
import {
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-CMCUB77M.js";
import "./chunks/chunk-ZN2XQFXY.js";
import {
  RemoteSearchCombobox_default
} from "./chunks/chunk-LBAUQXUT.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-VE4CKH4K.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-TIY4XDZH.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-AGYAFSYB.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-CKA2QG6P.js";
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
} from "./chunks/chunk-FUOK7RBM.js";
import {
  configureExpenseApiAuth,
  createExpenseSheet,
  fetchExpenseSheetDetail,
  fetchExpenseSheetTicketsList
} from "./chunks/chunk-YVGMYSYA.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-LADF6TNN.js";
import {
  clearExpenseActingUserOverride,
  getExpenseScopeToken,
  setExpenseActingUserOverride,
  toExpenseApiDdMmYyyy
} from "./chunks/chunk-QGAYQR5R.js";
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
} from "./chunks/chunk-REMMAK3K.js";
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
  (0, import_react6.useEffect)(() => {
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
    setSelectedTicketsById({});
  }, []);
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
  const resolveActiveFilters = (0, import_react6.useCallback)(() => {
    const baseSnapshot = appliedFilters || currentFilters;
    const resolvedManagedUserId = syncManagedUserSelection(baseSnapshot.managedUserId);
    return normalizeLinkModeSnapshotForLoad({
      ...baseSnapshot,
      managedUserId: resolvedManagedUserId
    });
  }, [appliedFilters, currentFilters, normalizeLinkModeSnapshotForLoad, syncManagedUserSelection]);
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
      canProcessLinkMode && !linkSheetCheckBusy && !linkSheetLocked ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "grid grid-cols-2 gap-1.5 pt-0.5", children: [
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL0V4cGVuc2VUaWNrZXRzUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcbmltcG9ydCBDb21wYWN0UGFnaW5hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeFwiO1xuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3hcIjtcbmltcG9ydCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgeyB0eXBlIEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW0gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeFwiO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TcGlubmVyLnRzeFwiO1xuaW1wb3J0IHsgdXNlQXV0aENvbnRleHQsIHR5cGUgQXV0aE1hbmFnZWRVc2VyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XG5pbXBvcnQgeyB1c2VUaW1lbGluZUNhcmRFZmZlY3RzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRpbWVsaW5lQ2FyZEVmZmVjdHMudHNcIjtcbmltcG9ydCBFeHBlbnNlVGltZWxpbmVDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWwgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWwudHN4XCI7XG5pbXBvcnQgeyBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgfSBmcm9tIFwiLi4vZXhwZW5zZUZvcm1hdHRlcnMudHNcIjtcbmltcG9ydCB7IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcbmltcG9ydCB7IGNyZWF0ZUV4cGVuc2VTaGVldCwgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgsIGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsLCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSwgc2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQWN0aW5nVXNlci50c1wiO1xuaW1wb3J0IHsgdG9FeHBlbnNlQXBpRGRNbVl5eXkgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xuaW1wb3J0IHsgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLCBuYXZpZ2F0ZVRvRXhwZW5zZVVybCwgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuaW1wb3J0IHsgbWFwV2luZG93RW51bU9wdGlvbnMsIHR5cGUgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURhdGVQYXJ0cywgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBzYWZlVGV4dCwgc3RhcnRPZkRheSwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cgfSBmcm9tIFwiLi4vZGV0YWlsL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdy50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGEudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldENyZWF0ZUxpbmVSZXF1ZXN0IH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LCBFeHBlbnNlVGlja2V0Q2FyZCB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcbmltcG9ydCB7IHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdG9wYmFyQWN0aW9uVmlzaWJpbGl0eS50c1wiO1xuXG5jb25zdCBQQUdFX1NJWkUgPSAxMDtcbmNvbnN0IEFMTE9XRURfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XG5cbmNvbnN0IEdBU1RPX1RZUEVfTEFCRUxfS0VZUzogUmVjb3JkPG51bWJlciwgeyBrZXk6IHN0cmluZzsgZmFsbGJhY2s6IHN0cmluZyB9PiA9IHtcbiAgMDogeyBrZXk6IFwiRW51bV9Ob25lXCIsIGZhbGxiYWNrOiBcIk5vbmVcIiB9LFxuICAxOiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9QZWFqZVwiLCBmYWxsYmFjazogXCJQZWFqZVwiIH0sXG4gIDI6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1BhcmtpbmdcIiwgZmFsbGJhY2s6IFwiUGFya2luZ1wiIH0sXG4gIDM6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0ttXCIsIGZhbGxiYWNrOiBcIkttXCIgfSxcbiAgNDogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfRGVzYXl1bm9cIiwgZmFsbGJhY2s6IFwiRGVzYXl1bm9cIiB9LFxuICA1OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9Db21pZGFcIiwgZmFsbGJhY2s6IFwiQ29taWRhXCIgfSxcbiAgNjogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfQ2VuYVwiLCBmYWxsYmFjazogXCJDZW5hXCIgfSxcbiAgNzogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfSG90ZWxcIiwgZmFsbGJhY2s6IFwiSG90ZWxcIiB9LFxuICA4OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9WYXJpb3NcIiwgZmFsbGJhY2s6IFwiVmFyaW9zXCIgfSxcbiAgMTQ6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1RheGlcIiwgZmFsbGJhY2s6IFwiVGF4aVwiIH0sXG59O1xuXG5jb25zdCBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRCA9IDI7XG5jb25zdCBFWFBFTlNFX1NUQVRVU19QQUlEID0gNDtcbmNvbnN0IExJTktfTU9ERV9PUEVOX0RFVEFJTF9ERUxBWV9NUyA9IDIyMDtcbmNvbnN0IExJTktfTU9ERV9TRUxFQ1RJT05fR1VBUkRfTVMgPSAyODA7XG5cbmNvbnN0IG5vcm1hbGl6ZVVzZXJJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xuXG5jb25zdCBpc1NhbWVVc2VyID0gKGxlZnQ6IHN0cmluZywgcmlnaHQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkTGVmdCA9IG5vcm1hbGl6ZVVzZXJJZChsZWZ0KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBub3JtYWxpemVkUmlnaHQgPSBub3JtYWxpemVVc2VySWQocmlnaHQpLnRvVXBwZXJDYXNlKCk7XG4gIHJldHVybiAhIW5vcm1hbGl6ZWRMZWZ0ICYmIG5vcm1hbGl6ZWRMZWZ0ID09PSBub3JtYWxpemVkUmlnaHQ7XG59O1xuXG5jb25zdCBlbnN1cmVDdXJyZW50VXNlckluTGlzdCA9ICh1c2VyczogQXV0aE1hbmFnZWRVc2VyW10sIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nKTogQXV0aE1hbmFnZWRVc2VyW10gPT4ge1xuICBjb25zdCBub3JtYWxpemVkQ3VycmVudCA9IG5vcm1hbGl6ZVVzZXJJZChjdXJyZW50QXhVc2VySWQpO1xuICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW50KSByZXR1cm4gdXNlcnM7XG4gIGlmICh1c2Vycy5zb21lKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZEN1cnJlbnQpKSkgcmV0dXJuIHVzZXJzO1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIGNybVVzZXJJZDogbm9ybWFsaXplZEN1cnJlbnQsXG4gICAgICBheFVzZXJJZDogbm9ybWFsaXplZEN1cnJlbnQsXG4gICAgICBuYW1lOiBub3JtYWxpemVkQ3VycmVudCxcbiAgICB9LFxuICAgIC4uLnVzZXJzLFxuICBdO1xufTtcblxuY29uc3QgcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uID0gKHJlcXVlc3RlZFVzZXJJZDogc3RyaW5nLCBjdXJyZW50QXhVc2VySWQ6IHN0cmluZywgdXNlcnM6IEF1dGhNYW5hZ2VkVXNlcltdKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZFJlcXVlc3RlZCA9IG5vcm1hbGl6ZVVzZXJJZChyZXF1ZXN0ZWRVc2VySWQpO1xuICBjb25zdCBub3JtYWxpemVkQ3VycmVudCA9IG5vcm1hbGl6ZVVzZXJJZChjdXJyZW50QXhVc2VySWQpO1xuICBpZiAobm9ybWFsaXplZFJlcXVlc3RlZCkge1xuICAgIGNvbnN0IGZvdW5kID0gdXNlcnMuZmluZCgoZW50cnkpID0+IGlzU2FtZVVzZXIoZW50cnkuYXhVc2VySWQsIG5vcm1hbGl6ZWRSZXF1ZXN0ZWQpKTtcbiAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZC5heFVzZXJJZDtcbiAgfVxuICBpZiAobm9ybWFsaXplZEN1cnJlbnQpIHtcbiAgICBjb25zdCBzZWxmID0gdXNlcnMuZmluZCgoZW50cnkpID0+IGlzU2FtZVVzZXIoZW50cnkuYXhVc2VySWQsIG5vcm1hbGl6ZWRDdXJyZW50KSk7XG4gICAgcmV0dXJuIHNlbGY/LmF4VXNlcklkIHx8IG5vcm1hbGl6ZWRDdXJyZW50O1xuICB9XG4gIHJldHVybiBcIlwiO1xufTtcblxuY29uc3QgYnVpbGRMaW5rTW9kZUluaXRpYWxTbmFwc2hvdCA9IChtYW5hZ2VkVXNlcklkID0gXCJcIik6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgPT4ge1xuICBjb25zdCB0b2RheSA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoKSk7XG4gIGNvbnN0IGZyb21EYXRlID0gbmV3IERhdGUodG9kYXkpO1xuICAvLyBLZWVwIGF1dG9tYXRpYyBsaW5rLW1vZGUgbG9hZCBib3VuZGVkIHRvIGF2b2lkIGhlYXZ5IHVwc3RyZWFtIHNjYW5zLlxuICBmcm9tRGF0ZS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDI5KTtcblxuICByZXR1cm4ge1xuICAgIGZyb21EYXRlOiB0b0lzb0RhdGUoZnJvbURhdGUpLFxuICAgIHRvRGF0ZTogdG9Jc29EYXRlKHRvZGF5KSxcbiAgICBmaWx0ZXJLZXk6IFwiXCIsXG4gICAgY3VycmVuY3lDb2RlOiBcIlwiLFxuICAgIG1hbmFnZWRVc2VySWQ6IG5vcm1hbGl6ZVVzZXJJZChtYW5hZ2VkVXNlcklkKSxcbiAgICBzdGF0dXNGaWx0ZXI6IDAsXG4gICAgZ2FzdG9UeXBlRmlsdGVyOiBcIlwiLFxuICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXI6IFwiYWxsXCIsXG4gIH07XG59O1xuXG4vLyBWYWxpZGF0ZXMgd2hldGhlciBvbmUgdGlja2V0IGNhcmQgY2FuIGJlIGxpbmtlZCB0byBhbiBleHBlbnNlIHNoZWV0IGxpbmUuXG5jb25zdCBjYW5TZWxlY3RUaWNrZXRGb3JMaW5rID0gKGl0ZW06IEV4cGVuc2VUaWNrZXRDYXJkKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KGl0ZW0uZmlsZUlkKTtcbiAgaWYgKCFmaWxlSWQpIHJldHVybiBmYWxzZTtcbiAgaWYgKGl0ZW0uc3RhdHVzICE9PSAwKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgdG90YWxBbW91bnQgPSBOdW1iZXIoaXRlbS50b3RhbEFtb3VudCA/PyAwKTtcbiAgaWYgKCEodG90YWxBbW91bnQgPiAwKSkgcmV0dXJuIGZhbHNlO1xuXG4gIGNvbnN0IGdhc3RvVHlwZSA9IE51bWJlcihpdGVtLmdhc3RvVHlwZSk7XG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKGdhc3RvVHlwZSkgJiYgZ2FzdG9UeXBlID4gMDtcbn07XG5cbi8vIEluaXRpYWxpemVzIGF1dGggc2VlZCBmb3IgZXhwZW5zZSBBUEkgY2FsbHMgYmVmb3JlIGlzbGFuZCBlZmZlY3RzIHJ1bi5cbmNvbnN0IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoID0gKCkgPT4ge1xuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCh7XG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXG4gICAgYXBwQ29kZTogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxuICB9KTtcbn07XG5cbmNvbnN0IGJ1aWxkRmFsbGJhY2tHYXN0b1R5cGVPcHRpb25zID0gKCk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XG4gIHJldHVybiBPYmplY3QuZW50cmllcyhHQVNUT19UWVBFX0xBQkVMX0tFWVMpXG4gICAgLm1hcCgoW2NvZGUsIGNmZ10pID0+ICh7XG4gICAgICB2YWx1ZTogU3RyaW5nKGNvZGUpLFxuICAgICAgdGV4dDogaW5kVChjZmcua2V5LCBjZmcuZmFsbGJhY2spLFxuICAgIH0pKVxuICAgIC5zb3J0KChsZWZ0LCByaWdodCkgPT4gTnVtYmVyKGxlZnQudmFsdWUpIC0gTnVtYmVyKHJpZ2h0LnZhbHVlKSk7XG59O1xuXG5jb25zdCBOZXdUaWNrZXRJY29uID0gKCkgPT4gKFxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cImgtNiB3LTZcIj5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMCAyMGgtNWEyIDIgMCAwIDEgLTIgLTJ2LTlhMiAyIDAgMCAxIDIgLTJoMWEyIDIgMCAwIDAgMiAtMmExIDEgMCAwIDEgMSAtMWg2YTEgMSAwIDAgMSAxIDFhMiAyIDAgMCAwIDIgMmgxYTIgMiAwIDAgMSAyIDJ2MlwiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQuMzYyIDExLjE1YTMgMyAwIDEgMCAtNC4xNDQgNC4yNjNcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDIxdi00YTIgMiAwIDEgMSA0IDB2NFwiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMTloNFwiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMjEgMTV2NlwiIC8+XG4gIDwvc3ZnPlxuKTtcblxuY29uc3QgRXhwZW5zZVRpY2tldHNQYWdlQ29udGVudCA9ICgpID0+IHtcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJWaWV3XCIpO1xuICBjb25zdCBjYW5DcmVhdGVUaWNrZXQgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIkFkZFwiKTtcbiAgY29uc3QgY2FuTGlua1NoZWV0TGluZXMgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkFkZFwiKTtcbiAgY29uc3Qge1xuICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICBzdWJvcmRpbmF0ZXMsXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcbiAgICBzZXRTZWxlY3RlZE1hbmFnZWRVc2VySWQsXG4gIH0gPSB1c2VBdXRoQ29udGV4dCgpO1xuICBjb25zdCB0aW1lbGluZUNvbnRhaW5lclJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBjYW1lcmFJbnB1dFJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGdhbGxlcnlJbnB1dFJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGRpZFJlc3RvcmVPbk1vdW50UmVmID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgZGlkQXBwbHlRdWVyeUZpbHRlclJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmID0gUmVhY3QudXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBwZW5kaW5nRm9jdXNGaWxlSWRSZWYgPSBSZWFjdC51c2VSZWYoXCJcIik7XG4gIGNvbnN0IGxpbmtNb2RlU2VsZWN0aW9uSW50ZW50VW50aWxSZWYgPSBSZWFjdC51c2VSZWYoMCk7XG4gIGNvbnN0IGxpbmtNb2RlUGVuZGluZ09wZW5UaW1lclJlZiA9IFJlYWN0LnVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBsaW5rTW9kZUNvbnRleHQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICBjb25zdCBhY3Rpb24gPSBzYWZlVGV4dCh1cmwuc2VhcmNoUGFyYW1zLmdldChcImFjdGlvblwiKSkudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBob2phR2FzdG9zSWQgPSBzYWZlVGV4dCh1cmwuc2VhcmNoUGFyYW1zLmdldChcImhvamFHYXN0b3NJZFwiKSk7XG4gICAgY29uc3QgaXNMaW5rTW9kZSA9IGFjdGlvbiA9PT0gXCJsaW5rXCIgJiYgISFob2phR2FzdG9zSWQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzTGlua01vZGUsXG4gICAgICBzaGVldElkOiBob2phR2FzdG9zSWQsXG4gICAgICBmaXhlZFN0YXR1c0ZpbHRlcjogaXNMaW5rTW9kZSA/ICgwIGFzIGNvbnN0KSA6IG51bGwsXG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGlzTGlua01vZGUgPSBsaW5rTW9kZUNvbnRleHQuaXNMaW5rTW9kZTtcbiAgY29uc3QgbGlua1NoZWV0SWQgPSBsaW5rTW9kZUNvbnRleHQuc2hlZXRJZDtcbiAgY29uc3QgZml4ZWRTdGF0dXNGaWx0ZXIgPSBsaW5rTW9kZUNvbnRleHQuZml4ZWRTdGF0dXNGaWx0ZXI7XG4gIGNvbnN0IGNhblByb2Nlc3NMaW5rTW9kZSA9ICFpc0xpbmtNb2RlIHx8IGNhbkxpbmtTaGVldExpbmVzO1xuICBjb25zdCBtYW5hZ2VkVXNlcnMgPSB1c2VNZW1vKFxuICAgICgpID0+IGVuc3VyZUN1cnJlbnRVc2VySW5MaXN0KEFycmF5LmlzQXJyYXkoc3Vib3JkaW5hdGVzKSA/IHN1Ym9yZGluYXRlcyA6IFtdLCBjdXJyZW50QXhVc2VySWQpLFxuICAgIFtjdXJyZW50QXhVc2VySWQsIHN1Ym9yZGluYXRlc11cbiAgKTtcbiAgY29uc3QgZGVmYXVsdE1hbmFnZWRVc2VySWQgPSB1c2VNZW1vKFxuICAgICgpID0+IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbihjdXJyZW50QXhVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzKSxcbiAgICBbY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnNdXG4gICk7XG4gIGNvbnN0IHNob3dNYW5hZ2VkVXNlckZpbHRlciA9IGlzTGlua01vZGUgJiYgY2FuTWFuYWdlT3RoZXJVc2VycztcblxuICAvLyBLZWVwcyBsaW5rLW1vZGUgbGlzdCBxdWVyaWVzIGJvdW5kZWQgZXZlbiB3aGVuIFVJIGZpbHRlcnMgYXJlIGNsZWFyZWQuXG4gIGNvbnN0IG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkID0gdXNlQ2FsbGJhY2soXG4gICAgKHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9PiB7XG4gICAgICBpZiAoIWlzTGlua01vZGUpIHJldHVybiBzbmFwc2hvdDtcblxuICAgICAgY29uc3QgZmFsbGJhY2sgPSBidWlsZExpbmtNb2RlSW5pdGlhbFNuYXBzaG90KHNuYXBzaG90Lm1hbmFnZWRVc2VySWQpO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZEZyb21EYXRlID0gc2FmZVRleHQoc25hcHNob3QuZnJvbURhdGUpIHx8IGZhbGxiYWNrLmZyb21EYXRlO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZFRvRGF0ZSA9IHNhZmVUZXh0KHNuYXBzaG90LnRvRGF0ZSkgfHwgZmFsbGJhY2sudG9EYXRlO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZE1hbmFnZWRVc2VySWQgPSBub3JtYWxpemVVc2VySWQoc25hcHNob3QubWFuYWdlZFVzZXJJZCkgfHwgZmFsbGJhY2subWFuYWdlZFVzZXJJZDtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc25hcHNob3QsXG4gICAgICAgIGZyb21EYXRlOiBub3JtYWxpemVkRnJvbURhdGUsXG4gICAgICAgIHRvRGF0ZTogbm9ybWFsaXplZFRvRGF0ZSxcbiAgICAgICAgbWFuYWdlZFVzZXJJZDogbm9ybWFsaXplZE1hbmFnZWRVc2VySWQsXG4gICAgICAgIHN0YXR1c0ZpbHRlcjogMCxcbiAgICAgIH07XG4gICAgfSxcbiAgICBbaXNMaW5rTW9kZV1cbiAgKTtcblxuICBjb25zdCBbbGlua1NoZWV0TG9ja2VkLCBzZXRMaW5rU2hlZXRMb2NrZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbGlua1NoZWV0Q2hlY2tCdXN5LCBzZXRMaW5rU2hlZXRDaGVja0J1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbGlua0Zsb3dCdXN5LCBzZXRMaW5rRmxvd0J1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbGlua0Zsb3dTdGF0dXMsIHNldExpbmtGbG93U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbGlua0Zsb3dFcnJvciwgc2V0TGlua0Zsb3dFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3NlbGVjdGVkVGlja2V0c0J5SWQsIHNldFNlbGVjdGVkVGlja2V0c0J5SWRdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgRXhwZW5zZVRpY2tldENhcmQ+Pih7fSk7XG5cbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxuICAgIH0pLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXG4gIH0pO1xuXG4gIGNvbnN0IGdhc3RvVHlwZU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4ge1xuICAgIGNvbnN0IHNvdXJjZSA9IEFycmF5LmlzQXJyYXkod2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fKSA/IHdpbmRvdy5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXyA6IFtdO1xuICAgIGNvbnN0IG1hcHBlZCA9IG1hcFdpbmRvd0VudW1PcHRpb25zKHNvdXJjZSkuZmlsdGVyKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKGVudHJ5LnZhbHVlKTtcbiAgICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgQUxMT1dFRF9HQVNUT19UWVBFUy5oYXMocGFyc2VkKTtcbiAgICB9KTtcblxuICAgIGlmIChtYXBwZWQubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIG1hcHBlZC5zb3J0KChsZWZ0LCByaWdodCkgPT4gTnVtYmVyKGxlZnQudmFsdWUpIC0gTnVtYmVyKHJpZ2h0LnZhbHVlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1aWxkRmFsbGJhY2tHYXN0b1R5cGVPcHRpb25zKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBnYXN0b1R5cGVMYWJlbE1hcCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgZ2FzdG9UeXBlT3B0aW9ucykge1xuICAgICAgbWFwLnNldChTdHJpbmcob3B0aW9uLnZhbHVlKSwgb3B0aW9uLnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gbWFwO1xuICB9LCBbZ2FzdG9UeXBlT3B0aW9uc10pO1xuXG4gIGNvbnN0IHtcbiAgICBpdGVtcyxcbiAgICB0b3RhbCxcbiAgICBjdXJyZW50UGFnZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGxvYWRMaXN0LFxuICAgIHJlc3RvcmVMaXN0U25hcHNob3QsXG4gICAgcmVzZXRMaXN0LFxuICB9ID0gdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YSh7XG4gICAgaGFzQWNjZXNzLFxuICAgIHBhZ2VTaXplOiBQQUdFX1NJWkUsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgY29uc3VtZVJldHVybkZsYWcsIHNhdmVDYWNoZWRTdGF0ZSwgY2xlYXJDYWNoZWRTdGF0ZSB9ID0gdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZSgpO1xuICBjb25zdCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24gPSB1c2VDYWxsYmFjayhcbiAgICAocmVxdWVzdGVkVXNlcklkOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgICAgY29uc3QgcmVzb2x2ZWRVc2VySWQgPSByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24ocmVxdWVzdGVkVXNlcklkLCBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vycyk7XG4gICAgICBzZXRTZWxlY3RlZE1hbmFnZWRVc2VySWQocmVzb2x2ZWRVc2VySWQpO1xuICAgICAgaWYgKCFyZXNvbHZlZFVzZXJJZCB8fCAoY3VycmVudEF4VXNlcklkICYmIGlzU2FtZVVzZXIocmVzb2x2ZWRVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCkpKSB7XG4gICAgICAgIGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZShyZXNvbHZlZFVzZXJJZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzb2x2ZWRVc2VySWQ7XG4gICAgfSxcbiAgICBbY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnMsIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZF1cbiAgKTtcblxuICBjb25zdCB7XG4gICAgZnJvbURhdGUsXG4gICAgdG9EYXRlLFxuICAgIGZpbHRlcktleSxcbiAgICBjdXJyZW5jeUNvZGUsXG4gICAgbWFuYWdlZFVzZXJJZCxcbiAgICBzdGF0dXNGaWx0ZXIsXG4gICAgZ2FzdG9UeXBlRmlsdGVyLFxuICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVFcnJvcixcbiAgICBtYW51YWxEYXRlQXV0b09wZW5LZXksXG4gICAgYXBwbGllZEZpbHRlcnMsXG4gICAgc2hvd0ZpbHRlcnMsXG4gICAgY3VycmVudEZpbHRlcnMsXG4gICAgc2V0RmlsdGVyS2V5LFxuICAgIHNldEN1cnJlbmN5Q29kZSxcbiAgICBzZXRNYW5hZ2VkVXNlcklkLFxuICAgIHNldFN0YXR1c0ZpbHRlcixcbiAgICBzZXRHYXN0b1R5cGVGaWx0ZXIsXG4gICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgICBvbkFwcGx5LFxuICAgIG9uQ2xlYXIsXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlLFxuICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcbiAgICBvblF1aWNrRmlsdGVyQ2hhbmdlLFxuICAgIHRvZ2dsZUZpbHRlclBhbmVsLFxuICAgIHN0YXR1c0ZpbHRlckxvY2tlZCxcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlKHtcbiAgICBkZWZhdWx0TWFuYWdlZFVzZXJJZCxcbiAgICBmaXhlZFN0YXR1c0ZpbHRlcixcbiAgICBhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5OiBpc0xpbmtNb2RlLFxuICAgIG9uQXBwbHlGaWx0ZXJzOiAoc25hcHNob3QpID0+IHtcbiAgICAgIGNvbnN0IHJlc29sdmVkTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihzbmFwc2hvdC5tYW5hZ2VkVXNlcklkKTtcbiAgICAgIHZvaWQgbG9hZExpc3QoXG4gICAgICAgIDEsXG4gICAgICAgIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKHtcbiAgICAgICAgICAuLi5zbmFwc2hvdCxcbiAgICAgICAgICBtYW5hZ2VkVXNlcklkOiByZXNvbHZlZE1hbmFnZWRVc2VySWQsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0sXG4gICAgb25DbGVhckZpbHRlcnM6ICgpID0+IHtcbiAgICAgIGNvbnN0IHJlc2V0TWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihjdXJyZW50QXhVc2VySWQpO1xuICAgICAgc2V0TWFuYWdlZFVzZXJJZChyZXNldE1hbmFnZWRVc2VySWQpO1xuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuICAgICAgcmVzZXRMaXN0KCk7XG4gICAgfSxcbiAgfSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQgPSBub3JtYWxpemVVc2VySWQoZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICAgIGlmICghbm9ybWFsaXplZERlZmF1bHRNYW5hZ2VkVXNlcklkKSByZXR1cm47XG4gICAgc2V0TWFuYWdlZFVzZXJJZChub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICAgIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICB9LCBbZGVmYXVsdE1hbmFnZWRVc2VySWQsIHNldE1hbmFnZWRVc2VySWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGNhbk1hbmFnZU90aGVyVXNlcnMpIHJldHVybjtcbiAgICBjb25zdCBmYWxsYmFja01hbmFnZWRVc2VySWQgPSByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24oY3VycmVudEF4VXNlcklkLCBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vycyk7XG4gICAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnRNYW5hZ2VkVXNlcklkID0gbm9ybWFsaXplVXNlcklkKG1hbmFnZWRVc2VySWQpO1xuICAgIGlmIChpc1NhbWVVc2VyKG5vcm1hbGl6ZWRDdXJyZW50TWFuYWdlZFVzZXJJZCwgZmFsbGJhY2tNYW5hZ2VkVXNlcklkKSkgcmV0dXJuO1xuICAgIGlmICghbm9ybWFsaXplZEN1cnJlbnRNYW5hZ2VkVXNlcklkICYmICFmYWxsYmFja01hbmFnZWRVc2VySWQpIHJldHVybjtcblxuICAgIHNldE1hbmFnZWRVc2VySWQoZmFsbGJhY2tNYW5hZ2VkVXNlcklkKTtcbiAgICBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oZmFsbGJhY2tNYW5hZ2VkVXNlcklkKTtcbiAgfSwgW2Nhbk1hbmFnZU90aGVyVXNlcnMsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJJZCwgbWFuYWdlZFVzZXJzLCBzZXRNYW5hZ2VkVXNlcklkLCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb25dKTtcblxuICBjb25zdCB7XG4gICAgc291cmNlUGlja2VyT3BlbixcbiAgICBidXN5OiBxdWlja1RpY2tldEJ1c3ksXG4gICAgcHJvZ3Jlc3NNZXNzYWdlOiBxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSxcbiAgICBlcnJvck1lc3NhZ2U6IHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlLFxuICAgIGhhc1BlbmRpbmdVcGxvYWRSZXRyeSxcbiAgICB0cmFjZUxpc3Q6IHF1aWNrVGlja2V0VHJhY2VMaXN0LFxuICAgIG9wZW5Tb3VyY2VQaWNrZXIsXG4gICAgY2xvc2VTb3VyY2VQaWNrZXIsXG4gICAgc2VsZWN0RnJvbUNhbWVyYSxcbiAgICBzZWxlY3RGcm9tR2FsbGVyeSxcbiAgICBoYW5kbGVTZWxlY3RlZEZpbGUsXG4gICAgcmV0cnlQZW5kaW5nVXBsb2FkLFxuICAgIGNsZWFyRXJyb3I6IGNsZWFyUXVpY2tUaWNrZXRFcnJvcixcbiAgfSA9IHVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdyh7XG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogIWlzTGlua01vZGUgJiYgY2FuQ3JlYXRlVGlja2V0LFxuICAgIGlzQ3JlYXRlTW9kZTogZmFsc2UsXG4gICAgaXNTaGVldExvY2tlZDogZmFsc2UsXG4gICAgbGlua1RvU2hlZXQ6IGZhbHNlLFxuICAgIGF4VXNlcklkT3ZlcnJpZGU6IHNhZmVUZXh0KGN1cnJlbnRBeFVzZXJJZCksXG4gICAgY3VycmVuY3lDb2RlOiBjdXJyZW5jeUNvZGUgfHwgXCJFVVJcIixcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcbiAgICBvbkNvbXBsZXRlZDogKHJlc3VsdCkgPT4ge1xuICAgICAgY29uc3QgY3JlYXRlZEZpbGVJZCA9IHNhZmVUZXh0KHJlc3VsdD8uZmlsZUlkKTtcbiAgICAgIGlmICghY3JlYXRlZEZpbGVJZCkgcmV0dXJuO1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsP2ZpbGVJZD0ke2VuY29kZVVSSUNvbXBvbmVudChjcmVhdGVkRmlsZUlkKX0mbW9kZT1lZGl0YCwge1xuICAgICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSxcbiAgfSk7XG5cbiAgY29uc3QgZmFiTWVudUl0ZW1zID0gdXNlTWVtbzxGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW10+KFxuICAgICgpID0+XG4gICAgICBpc0xpbmtNb2RlXG4gICAgICAgID8gW11cbiAgICAgICAgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiBcIm5ldy10aWNrZXRcIixcbiAgICAgICAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9OZXdUaWNrZXRcIiwgXCJOdWV2byBUaWNrZXRcIiksXG4gICAgICAgICAgICAgIGljb246IDxOZXdUaWNrZXRJY29uIC8+LFxuICAgICAgICAgICAgICBvbkNsaWNrOiBvcGVuU291cmNlUGlja2VyLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgIFtpc0xpbmtNb2RlLCBvcGVuU291cmNlUGlja2VyXVxuICApO1xuXG4gIGNvbnN0IHNlbGVjdGVkVGlja2V0TGlzdCA9IHVzZU1lbW8oKCkgPT4gT2JqZWN0LnZhbHVlcyhzZWxlY3RlZFRpY2tldHNCeUlkKSwgW3NlbGVjdGVkVGlja2V0c0J5SWRdKTtcbiAgY29uc3Qgc2VsZWN0ZWRUaWNrZXRDb3VudCA9IHNlbGVjdGVkVGlja2V0TGlzdC5sZW5ndGg7XG4gIGNvbnN0IHNlbGVjdGVkVG90YWxBbW91bnQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gc2VsZWN0ZWRUaWNrZXRMaXN0LnJlZHVjZSgoc3VtLCBpdGVtKSA9PiB7XG4gICAgICBjb25zdCBhbW91bnQgPSBOdW1iZXIoaXRlbS50b3RhbEFtb3VudCA/PyAwKTtcbiAgICAgIHJldHVybiBhbW91bnQgPiAwID8gc3VtICsgYW1vdW50IDogc3VtO1xuICAgIH0sIDApO1xuICB9LCBbc2VsZWN0ZWRUaWNrZXRMaXN0XSk7XG4gIGNvbnN0IHNlbGVjdGVkVG90YWxBbW91bnRUZXh0ID0gdXNlTWVtbygoKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koc2VsZWN0ZWRUb3RhbEFtb3VudCwgXCJcIiksIFtzZWxlY3RlZFRvdGFsQW1vdW50XSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeShcImV4cGVuc2UtdGlja2V0cy1saXN0LWFjdGlvbnNcIik7XG4gIH0sIFtdKTtcblxuICBjb25zdCBsaW5rTW9kZUNhbmNlbE1lc3NhZ2UgPSB1c2VNZW1vKFxuICAgICgpID0+XG4gICAgICBpbmRUKFxuICAgICAgICBcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0NhbmNlbENvbmZpcm1cIixcbiAgICAgICAgXCJTZSBjYW5jZWxhcmEgZWwgcHJvY2VzbyBkZSB2aW5jdWxhY2lvbiB5IHZvbHZlcmFzIGEgbGEgaG9qYSBkZSBnYXN0b3MuIFF1aWVyZXMgY29udGludWFyP1wiXG4gICAgICApLFxuICAgIFtdXG4gICk7XG4gIGNvbnN0IG1hcmtMaW5rTW9kZVNlbGVjdGlvbkludGVudCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBsaW5rTW9kZVNlbGVjdGlvbkludGVudFVudGlsUmVmLmN1cnJlbnQgPSBEYXRlLm5vdygpICsgTElOS19NT0RFX1NFTEVDVElPTl9HVUFSRF9NUztcbiAgICBpZiAobGlua01vZGVQZW5kaW5nT3BlblRpbWVyUmVmLmN1cnJlbnQgIT0gbnVsbCkge1xuICAgICAgd2luZG93LmNsZWFyVGltZW91dChsaW5rTW9kZVBlbmRpbmdPcGVuVGltZXJSZWYuY3VycmVudCk7XG4gICAgICBsaW5rTW9kZVBlbmRpbmdPcGVuVGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3QgY2xlYXJQZW5kaW5nRGV0YWlsT3BlbiA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAobGlua01vZGVQZW5kaW5nT3BlblRpbWVyUmVmLmN1cnJlbnQgIT0gbnVsbCkge1xuICAgICAgd2luZG93LmNsZWFyVGltZW91dChsaW5rTW9kZVBlbmRpbmdPcGVuVGltZXJSZWYuY3VycmVudCk7XG4gICAgICBsaW5rTW9kZVBlbmRpbmdPcGVuVGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3Qgc2V0RmlsdGVyZWRTZWxlY3RlZFRpY2tldHMgPSB1c2VDYWxsYmFjaygocHJlZGljYXRlOiAoZW50cnk6IEV4cGVuc2VUaWNrZXRDYXJkKSA9PiBib29sZWFuKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZCgocHJldmlvdXMpID0+IHtcbiAgICAgIGNvbnN0IG5leHQ6IFJlY29yZDxzdHJpbmcsIEV4cGVuc2VUaWNrZXRDYXJkPiA9IHt9O1xuICAgICAgZm9yIChjb25zdCBbZmlsZUlkLCBpdGVtXSBvZiBPYmplY3QuZW50cmllcyhwcmV2aW91cykpIHtcbiAgICAgICAgaWYgKHByZWRpY2F0ZShpdGVtKSkge1xuICAgICAgICAgIG5leHRbZmlsZUlkXSA9IGl0ZW07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH0pO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaXNUaWNrZXRTZWxlY3RlZCA9IHVzZUNhbGxiYWNrKFxuICAgIChmaWxlSWQ6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3Qgc2FmZUZpbGVJZCA9IHNhZmVUZXh0KGZpbGVJZCk7XG4gICAgICByZXR1cm4gISFzYWZlRmlsZUlkICYmICEhc2VsZWN0ZWRUaWNrZXRzQnlJZFtzYWZlRmlsZUlkXTtcbiAgICB9LFxuICAgIFtzZWxlY3RlZFRpY2tldHNCeUlkXVxuICApO1xuXG4gIGNvbnN0IHRvZ2dsZVRpY2tldFNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKFxuICAgICh0aWNrZXQ6IEV4cGVuc2VUaWNrZXRDYXJkKSA9PiB7XG4gICAgICBpZiAoIWlzTGlua01vZGUgfHwgIWNhblByb2Nlc3NMaW5rTW9kZSB8fCBsaW5rU2hlZXRDaGVja0J1c3kgfHwgbGlua1NoZWV0TG9ja2VkIHx8IGxpbmtGbG93QnVzeSkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dCh0aWNrZXQuZmlsZUlkKTtcbiAgICAgIGlmICghZmlsZUlkKSByZXR1cm47XG4gICAgICBpZiAoIWNhblNlbGVjdFRpY2tldEZvckxpbmsodGlja2V0KSkgcmV0dXJuO1xuXG4gICAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKChwcmV2aW91cykgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2aW91cyB9O1xuICAgICAgICBpZiAobmV4dFtmaWxlSWRdKSB7XG4gICAgICAgICAgZGVsZXRlIG5leHRbZmlsZUlkXTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgICBuZXh0W2ZpbGVJZF0gPSB0aWNrZXQ7XG4gICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBbY2FuUHJvY2Vzc0xpbmtNb2RlLCBpc0xpbmtNb2RlLCBsaW5rRmxvd0J1c3ksIGxpbmtTaGVldENoZWNrQnVzeSwgbGlua1NoZWV0TG9ja2VkXVxuICApO1xuXG4gIGNvbnN0IGNsZWFyVGlja2V0U2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQoe30pO1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYXJQZW5kaW5nRGV0YWlsT3BlbigpO1xuICAgIH07XG4gIH0sIFtjbGVhclBlbmRpbmdEZXRhaWxPcGVuXSk7XG5cbiAgLy8gS2VlcHMgc2VsZWN0ZWQgY2FyZCBtZXRhZGF0YSBmcmVzaCB3aXRoIHRoZSBsYXRlc3QgbGlzdCBwYXlsb2FkLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNMaW5rTW9kZSB8fCBpdGVtcy5sZW5ndGggPCAxKSByZXR1cm47XG4gICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZCgocHJldmlvdXMpID0+IHtcbiAgICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XG4gICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2aW91cyB9O1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KGl0ZW0uZmlsZUlkKTtcbiAgICAgICAgaWYgKCFmaWxlSWQgfHwgIW5leHRbZmlsZUlkXSkgY29udGludWU7XG4gICAgICAgIG5leHRbZmlsZUlkXSA9IGl0ZW07XG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNoYW5nZWQgPyBuZXh0IDogcHJldmlvdXM7XG4gICAgfSk7XG4gIH0sIFtpc0xpbmtNb2RlLCBpdGVtc10pO1xuXG4gIGNvbnN0IHJlc29sdmVBY3RpdmVGaWx0ZXJzID0gdXNlQ2FsbGJhY2soKCk6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgPT4ge1xuICAgIGNvbnN0IGJhc2VTbmFwc2hvdCA9IGFwcGxpZWRGaWx0ZXJzIHx8IGN1cnJlbnRGaWx0ZXJzO1xuICAgIGNvbnN0IHJlc29sdmVkTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihiYXNlU25hcHNob3QubWFuYWdlZFVzZXJJZCk7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKHtcbiAgICAgIC4uLmJhc2VTbmFwc2hvdCxcbiAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc29sdmVkTWFuYWdlZFVzZXJJZCxcbiAgICB9KTtcbiAgfSwgW2FwcGxpZWRGaWx0ZXJzLCBjdXJyZW50RmlsdGVycywgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xuXG4gIGNvbnN0IGJ1aWxkRXhwZW5zZUxpbmVGcm9tVGlja2V0ID0gdXNlQ2FsbGJhY2soXG4gICAgKHRpY2tldDogRXhwZW5zZVRpY2tldENhcmQpOiBFeHBlbnNlU2hlZXRDcmVhdGVMaW5lUmVxdWVzdCB8IG51bGwgPT4ge1xuICAgICAgaWYgKCFjYW5TZWxlY3RUaWNrZXRGb3JMaW5rKHRpY2tldCkpIHJldHVybiBudWxsO1xuXG4gICAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dCh0aWNrZXQuZmlsZUlkKTtcbiAgICAgIGNvbnN0IHR5cGVWYWx1ZSA9IE51bWJlcih0aWNrZXQuZ2FzdG9UeXBlKTtcbiAgICAgIGNvbnN0IHByaWNlID0gTnVtYmVyKHRpY2tldC50b3RhbEFtb3VudCA/PyAwKTtcbiAgICAgIGNvbnN0IHRyYW5zRGF0ZSA9IHRvRXhwZW5zZUFwaURkTW1ZeXl5KHRpY2tldC50cmFuc0RhdGUpIHx8IHRvRXhwZW5zZUFwaURkTW1ZeXl5KG5ldyBEYXRlKCkpO1xuICAgICAgaWYgKCFmaWxlSWQgfHwgIU51bWJlci5pc0ludGVnZXIodHlwZVZhbHVlKSB8fCB0eXBlVmFsdWUgPD0gMCB8fCAhKHByaWNlID4gMCkgfHwgIXRyYW5zRGF0ZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHJhbnNEYXRlLFxuICAgICAgICB0eXBlVmFsdWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dCh0aWNrZXQuZGVzY3JpcHRpb24pIHx8IHNhZmVUZXh0KHRpY2tldC5maWxlTmFtZSkgfHwgaW5kVChcIlRpY2tldHNfRmlsdGVyX0ZpbHRlcktleVwiLCBcIlRpY2tldFwiKSxcbiAgICAgICAgaW50ZXJuYWNpb25hbDogZmFsc2UsXG4gICAgICAgIGZpbGVJZCxcbiAgICAgICAgdGlja2V0OiB0cnVlLFxuICAgICAgICBxdHk6IDEsXG4gICAgICAgIHByaWNlLFxuICAgICAgfTtcbiAgICB9LFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgcmV2YWxpZGF0ZUxpbmtTZWxlY3Rpb24gPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAoY2FuZGlkYXRlU2VsZWN0aW9uOiBSZWNvcmQ8c3RyaW5nLCBFeHBlbnNlVGlja2V0Q2FyZD4sIGF4VXNlcklkT3ZlcnJpZGUgPSBcIlwiKSA9PiB7XG4gICAgICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoY2FuZGlkYXRlU2VsZWN0aW9uKTtcbiAgICAgIGlmIChlbnRyaWVzLmxlbmd0aCA8IDEpIHJldHVybiB7fSBhcyBSZWNvcmQ8c3RyaW5nLCBFeHBlbnNlVGlja2V0Q2FyZD47XG5cbiAgICAgIGNvbnN0IG5leHQ6IFJlY29yZDxzdHJpbmcsIEV4cGVuc2VUaWNrZXRDYXJkPiA9IHt9O1xuICAgICAgZm9yIChjb25zdCBbZmlsZUlkLCB0aWNrZXRdIG9mIGVudHJpZXMpIHtcbiAgICAgIGNvbnN0IHNhZmVGaWxlSWQgPSBzYWZlVGV4dChmaWxlSWQpO1xuICAgICAgaWYgKCFzYWZlRmlsZUlkIHx8ICFjYW5TZWxlY3RUaWNrZXRGb3JMaW5rKHRpY2tldCkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdChcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYWdlOiAxLFxuICAgICAgICAgICAgcGFnZVNpemU6IDEwLFxuICAgICAgICAgICAgc2VhcmNoS2V5OiBzYWZlRmlsZUlkLFxuICAgICAgICAgICAgZmlsdGVyOiBzYWZlRmlsZUlkLFxuICAgICAgICAgICAgc3RhdHVzOiAwLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgICBheFVzZXJJZE92ZXJyaWRlOiBzYWZlVGV4dChheFVzZXJJZE92ZXJyaWRlKSB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBpdGVtc1JhdyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gICAgICAgIGNvbnN0IGV4aXN0c0FzUGVuZGluZyA9IGl0ZW1zUmF3LnNvbWUoKGVudHJ5KSA9PiBzYWZlVGV4dCgoZW50cnkgYXMgeyBGaWxlSWQ/OiB1bmtub3duIH0pLkZpbGVJZCkudG9VcHBlckNhc2UoKSA9PT0gc2FmZUZpbGVJZC50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgaWYgKGV4aXN0c0FzUGVuZGluZykge1xuICAgICAgICAgIG5leHRbc2FmZUZpbGVJZF0gPSB0aWNrZXQ7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBLZWVwIGNhbmRpZGF0ZSBzZWxlY3Rpb24gd2hlbiB2YWxpZGF0aW9uIGVuZHBvaW50IGlzIHRlbXBvcmFyaWx5IHVuYXZhaWxhYmxlLlxuICAgICAgICBuZXh0W3NhZmVGaWxlSWRdID0gdGlja2V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXh0O1xuICAgIH0sXG4gICAgW11cbiAgKTtcblxuICBjb25zdCBydW5UaWNrZXRMaW5rRmxvdyA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoIWlzTGlua01vZGUgfHwgIWxpbmtTaGVldElkIHx8IGxpbmtGbG93QnVzeSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAobGlua1NoZWV0TG9ja2VkIHx8ICFjYW5Qcm9jZXNzTGlua01vZGUpIHtcbiAgICAgIHNldExpbmtGbG93RXJyb3IoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1BhaWRSZWFkT25seVwiLCBcIkxhcyBob2phcyBkZSBnYXN0byBwYWdhZGFzIHNvbiBkZSBzb2xvIGxlY3R1cmEuXCIpKTtcbiAgICAgIHNldExpbmtGbG93U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9QYWlkUmVhZE9ubHlcIiwgXCJMYXMgaG9qYXMgZGUgZ2FzdG8gcGFnYWRhcyBzb24gZGUgc29sbyBsZWN0dXJhLlwiKSk7XG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VsZWN0ZWRFbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoc2VsZWN0ZWRUaWNrZXRzQnlJZCk7XG4gICAgaWYgKHNlbGVjdGVkRW50cmllcy5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aXZlRmlsdGVycyA9IHJlc29sdmVBY3RpdmVGaWx0ZXJzKCk7XG4gICAgY29uc3QgcmVxdWVzdEF4VXNlcklkID0gc2FmZVRleHQoYWN0aXZlRmlsdGVycy5tYW5hZ2VkVXNlcklkIHx8IGN1cnJlbnRBeFVzZXJJZCk7XG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPVxuICAgICAgcmVxdWVzdEF4VXNlcklkXG4gICAgICAgID8ge1xuICAgICAgICAgICAgXCJYLUlORC1BeFVzZXJJZFwiOiByZXF1ZXN0QXhVc2VySWQsXG4gICAgICAgICAgfVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIHNldExpbmtGbG93QnVzeSh0cnVlKTtcbiAgICBzZXRMaW5rRmxvd0Vycm9yKFwiXCIpO1xuICAgIHNldExpbmtGbG93U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfTGlua2luZ0xpbmVcIiwgXCJMaW5raW5nIGV4cGVuc2UgbGluZS4uLlwiKSk7XG4gICAgbGV0IHN1Y2Nlc3NDb3VudCA9IDA7XG4gICAgY29uc3QgZmFpbGVkU2VsZWN0aW9uOiBSZWNvcmQ8c3RyaW5nLCBFeHBlbnNlVGlja2V0Q2FyZD4gPSB7fTtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2VsZWN0ZWRFbnRyaWVzLmxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgICAgICBjb25zdCBbZmlsZUlkLCB0aWNrZXRdID0gc2VsZWN0ZWRFbnRyaWVzW2luZGV4XTtcbiAgICAgICAgY29uc3Qgc2FmZUZpbGVJZCA9IHNhZmVUZXh0KGZpbGVJZCk7XG4gICAgICAgIHNldExpbmtGbG93U3RhdHVzKFxuICAgICAgICAgIGAke2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfTGlua2luZ0xpbmVcIiwgXCJMaW5raW5nIGV4cGVuc2UgbGluZS4uLlwiKX0gJHtpbmRleCArIDF9LyR7c2VsZWN0ZWRFbnRyaWVzLmxlbmd0aH1gXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgbGluZVBheWxvYWQgPSBidWlsZEV4cGVuc2VMaW5lRnJvbVRpY2tldCh0aWNrZXQpO1xuICAgICAgICBpZiAoIXNhZmVGaWxlSWQgfHwgIWxpbmVQYXlsb2FkKSB7XG4gICAgICAgICAgZmFpbGVkU2VsZWN0aW9uW3NhZmVGaWxlSWQgfHwgZmlsZUlkXSA9IHRpY2tldDtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjcmVhdGVFeHBlbnNlU2hlZXQoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG1vZGU6IDIsXG4gICAgICAgICAgICAgIGV4aXN0aW5nSG9qYUdhc3Rvc0lkOiBsaW5rU2hlZXRJZCxcbiAgICAgICAgICAgICAgbGluZXM6IFtsaW5lUGF5bG9hZF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgaGVhZGVyczogcmVxdWVzdEhlYWRlcnMsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChyZXNwb25zZS5TdWNjZXNzICE9PSB0cnVlKSB7XG4gICAgICAgICAgICBmYWlsZWRTZWxlY3Rpb25bc2FmZUZpbGVJZF0gPSB0aWNrZXQ7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzdWNjZXNzQ291bnQgKz0gMTtcbiAgICAgICAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKChwcmV2aW91cykgPT4ge1xuICAgICAgICAgICAgaWYgKCFwcmV2aW91c1tzYWZlRmlsZUlkXSkgcmV0dXJuIHByZXZpb3VzO1xuICAgICAgICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldmlvdXMgfTtcbiAgICAgICAgICAgIGRlbGV0ZSBuZXh0W3NhZmVGaWxlSWRdO1xuICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIGZhaWxlZFNlbGVjdGlvbltzYWZlRmlsZUlkXSA9IHRpY2tldDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhd2FpdCBsb2FkTGlzdChjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsIGFjdGl2ZUZpbHRlcnMpO1xuICAgICAgY29uc3QgdmFsaWRhdGVkRmFpbHVyZXMgPSBhd2FpdCByZXZhbGlkYXRlTGlua1NlbGVjdGlvbihmYWlsZWRTZWxlY3Rpb24sIHJlcXVlc3RBeFVzZXJJZCk7XG4gICAgICBzZXRGaWx0ZXJlZFNlbGVjdGVkVGlja2V0cygoZW50cnkpID0+IHtcbiAgICAgICAgY29uc3Qgc2FmZUZpbGVJZCA9IHNhZmVUZXh0KGVudHJ5LmZpbGVJZCk7XG4gICAgICAgIHJldHVybiAhIXNhZmVGaWxlSWQgJiYgISF2YWxpZGF0ZWRGYWlsdXJlc1tzYWZlRmlsZUlkXTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoc3VjY2Vzc0NvdW50ID09PSBzZWxlY3RlZEVudHJpZXMubGVuZ3RoKSB7XG4gICAgICAgIHNldExpbmtGbG93U3RhdHVzKGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKSk7XG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcbiAgICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuICAgICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGxpbmtTaGVldElkKX1gLCB7XG4gICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICAgICAgICBieXBhc3NHdWFyZE9uY2U6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN1Y2Nlc3NDb3VudCA+IDApIHtcbiAgICAgICAgY29uc3QgZmFpbGVkQ291bnQgPSBzZWxlY3RlZEVudHJpZXMubGVuZ3RoIC0gc3VjY2Vzc0NvdW50O1xuICAgICAgICBjb25zdCBwYXJ0aWFsTWVzc2FnZSA9IGAke2luZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKX0gKCR7ZmFpbGVkQ291bnR9LyR7c2VsZWN0ZWRFbnRyaWVzLmxlbmd0aH0pYDtcbiAgICAgICAgc2V0TGlua0Zsb3dFcnJvcihwYXJ0aWFsTWVzc2FnZSk7XG4gICAgICAgIHNldExpbmtGbG93U3RhdHVzKHBhcnRpYWxNZXNzYWdlKTtcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwid2FybmluZ1Byb2Nlc3NcIiwgMTUwMCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmFpbHVyZU1lc3NhZ2UgPSBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIik7XG4gICAgICBzZXRMaW5rRmxvd0Vycm9yKGZhaWx1cmVNZXNzYWdlKTtcbiAgICAgIHNldExpbmtGbG93U3RhdHVzKGZhaWx1cmVNZXNzYWdlKTtcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TGlua0Zsb3dCdXN5KGZhbHNlKTtcbiAgICB9XG4gIH0sIFtcbiAgICBidWlsZEV4cGVuc2VMaW5lRnJvbVRpY2tldCxcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSxcbiAgICBjdXJyZW50UGFnZSxcbiAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgaXNMaW5rTW9kZSxcbiAgICBsaW5rRmxvd0J1c3ksXG4gICAgbGlua1NoZWV0SWQsXG4gICAgbGlua1NoZWV0TG9ja2VkLFxuICAgIGxvYWRMaXN0LFxuICAgIHJldmFsaWRhdGVMaW5rU2VsZWN0aW9uLFxuICAgIHJlc29sdmVBY3RpdmVGaWx0ZXJzLFxuICAgIHNlbGVjdGVkVGlja2V0c0J5SWQsXG4gICAgc2V0RmlsdGVyZWRTZWxlY3RlZFRpY2tldHMsXG4gIF0pO1xuXG4gIGNvbnN0IG9wZW5MaW5rQ29uZmlybU1vZGFsID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghaXNMaW5rTW9kZSB8fCBzZWxlY3RlZFRpY2tldENvdW50IDwgMSB8fCBsaW5rRmxvd0J1c3kgfHwgbGlua1NoZWV0Q2hlY2tCdXN5IHx8IGxpbmtTaGVldExvY2tlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldExpbmtGbG93RXJyb3IoXCJcIik7XG4gICAgc2V0TGlua0Zsb3dTdGF0dXMoXCJcIik7XG4gICAgb3BlbkNvbmZpcm0oe1xuICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9MaW5rQnV0dG9uXCIsIFwiVmluY3VsYXIgdGlja2V0KHMpXCIpLFxuICAgICAgbWVzc2FnZTogYCR7aW5kVChcIk5hdl9FeHBlbnNlVGlja2V0c1wiLCBcIlRpY2tldHNcIil9OiAke3NlbGVjdGVkVGlja2V0Q291bnR9XFxuJHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Ub3RhbEFtb3VudFwiLCBcIlRvdGFsIGFtb3VudFwiKX06ICR7c2VsZWN0ZWRUb3RhbEFtb3VudFRleHR9YCxcbiAgICAgIGNvbmZpcm1UZXh0OiBpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfTGlua0J1dHRvblwiLCBcIlZpbmN1bGFyIHRpY2tldChzKVwiKSxcbiAgICAgIGNhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxuICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIHJldHVybiBydW5UaWNrZXRMaW5rRmxvdygpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSwgW1xuICAgIGlzTGlua01vZGUsXG4gICAgc2VsZWN0ZWRUaWNrZXRDb3VudCxcbiAgICBsaW5rRmxvd0J1c3ksXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxuICAgIGxpbmtTaGVldExvY2tlZCxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBzZWxlY3RlZFRvdGFsQW1vdW50VGV4dCxcbiAgICBydW5UaWNrZXRMaW5rRmxvdyxcbiAgXSk7XG5cbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIHNldExpbmtGbG93RXJyb3IoXCJcIik7XG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XG4gICAgICBidXN5OiBsaW5rRmxvd0J1c3ksXG4gICAgICBvbkVycm9yOiAobWVzc2FnZSkgPT4ge1xuICAgICAgICBzZXRMaW5rRmxvd0Vycm9yKG1lc3NhZ2UpO1xuICAgICAgICBzZXRMaW5rRmxvd1N0YXR1cyhtZXNzYWdlKTtcbiAgICAgIH0sXG4gICAgICBkZWZhdWx0RXJyb3JNZXNzYWdlOiBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIiksXG4gICAgfSk7XG4gIH0sIFtoYW5kbGVDb25maXJtLCBsaW5rRmxvd0J1c3ldKTtcblxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGxpbmtGbG93QnVzeVxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxuICAgIDogIWxpbmtGbG93QnVzeSAmJiBsaW5rRmxvd0Vycm9yXG4gICAgICA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKVxuICAgICAgOiBtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKTtcblxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFsaW5rRmxvd0J1c3kgJiYgbGlua0Zsb3dFcnJvcikge1xuICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZvaWQgaGFuZGxlTW9kYWxDb25maXJtKCk7XG4gIH0sIFtjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbGlua0Zsb3dCdXN5LCBsaW5rRmxvd0Vycm9yXSk7XG5cbiAgY29uc3Qgb3BlblRpY2tldERldGFpbCA9IHVzZUNhbGxiYWNrKFxuICAgIChyYXdGaWxlSWQ6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQocmF3RmlsZUlkKTtcbiAgICAgIGlmICghZmlsZUlkKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnMgfHwgY3VycmVudEZpbHRlcnM7XG4gICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSB7XG4gICAgICAgIGZpbHRlcnM6IHNuYXBzaG90LFxuICAgICAgICBwYWdlOiBjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsXG4gICAgICAgIHNjcm9sbFk6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuc2Nyb2xsWSB8fCAwIDogMCxcbiAgICAgICAgZm9jdXNGaWxlSWQ6IGZpbGVJZCxcbiAgICAgICAgaXRlbXMsXG4gICAgICAgIHRvdGFsLFxuICAgICAgICBzZWxlY3RlZFRpY2tldHM6IHNlbGVjdGVkVGlja2V0TGlzdCxcbiAgICAgICAgbGlua01vZGVTaGVldElkOiBpc0xpbmtNb2RlID8gbGlua1NoZWV0SWQgOiBcIlwiLFxuICAgICAgfTtcblxuICAgICAgaWYgKGlzTGlua01vZGUpIHtcbiAgICAgICAgaWYgKERhdGUubm93KCkgPCBsaW5rTW9kZVNlbGVjdGlvbkludGVudFVudGlsUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICAgICAgY2xlYXJQZW5kaW5nRGV0YWlsT3BlbigpO1xuICAgICAgICBsaW5rTW9kZVBlbmRpbmdPcGVuVGltZXJSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBsaW5rTW9kZVBlbmRpbmdPcGVuVGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgaWYgKERhdGUubm93KCkgPCBsaW5rTW9kZVNlbGVjdGlvbkludGVudFVudGlsUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgICAgIHNhdmVDYWNoZWRTdGF0ZShjdXJyZW50U3RhdGUpO1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XG4gICAgICAgICAgICBmaWxlSWQsXG4gICAgICAgICAgICBvcmlnaW46IFwic2hlZXQtbGlua1wiLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChsaW5rU2hlZXRJZCkge1xuICAgICAgICAgICAgcXVlcnkuc2V0KFwic2hlZXRJZFwiLCBsaW5rU2hlZXRJZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xuICAgICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIGJ5cGFzc0d1YXJkT25jZTogdHJ1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwgTElOS19NT0RFX09QRU5fREVUQUlMX0RFTEFZX01TKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzYXZlQ2FjaGVkU3RhdGUoY3VycmVudFN0YXRlKTtcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD9maWxlSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoZmlsZUlkKX1gLCB7XG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW1xuICAgICAgYXBwbGllZEZpbHRlcnMsXG4gICAgICBjbGVhclBlbmRpbmdEZXRhaWxPcGVuLFxuICAgICAgY3VycmVudFBhZ2UsXG4gICAgICBjdXJyZW50RmlsdGVycyxcbiAgICAgIGlzTGlua01vZGUsXG4gICAgICBpdGVtcyxcbiAgICAgIGxpbmtTaGVldElkLFxuICAgICAgc2F2ZUNhY2hlZFN0YXRlLFxuICAgICAgc2VsZWN0ZWRUaWNrZXRMaXN0LFxuICAgICAgdG90YWwsXG4gICAgXVxuICApO1xuXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xuICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCF0aW1lbGluZUNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNhcmQ7XG4gIH0sIFtdKTtcblxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcbiAgICBjb250YWluZXJSZWY6IHRpbWVsaW5lQ29udGFpbmVyUmVmLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBpdGVtcyxcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcbiAgfSk7XG5cbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCgodG90YWwgfHwgMCkgLyBQQUdFX1NJWkUpO1xuXG4gIGNvbnN0IHN1bW1hcnlJdGVtcyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IHNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnM7XG4gICAgaWYgKCFzbmFwc2hvdCkgcmV0dXJuIFtdIGFzIEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfT47XG5cbiAgICBjb25zdCBzdW1tYXJ5OiBBcnJheTx7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0+ID0gW107XG4gICAgY29uc3QgbG9jYWxlID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCI7XG4gICAgY29uc3QgZnJvbURhdGVUZXh0ID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKHNuYXBzaG90LmZyb21EYXRlLCBsb2NhbGUsIFwiXCIpO1xuICAgIGNvbnN0IHRvRGF0ZVRleHQgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoc25hcHNob3QudG9EYXRlLCBsb2NhbGUsIFwiXCIpO1xuXG4gICAgaWYgKGZyb21EYXRlVGV4dCB8fCB0b0RhdGVUZXh0KSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwiZnJvbURhdGVcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpLFxuICAgICAgICB2YWx1ZTogZnJvbURhdGVUZXh0IHx8IFwiLS1cIixcbiAgICAgIH0pO1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcInRvRGF0ZVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKSxcbiAgICAgICAgdmFsdWU6IHRvRGF0ZVRleHQgfHwgXCItLVwiLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNuYXBzaG90LmZpbHRlcktleS50cmltKCkpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJmaWx0ZXJLZXlcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9GaWx0ZXJLZXlcIiwgXCJUaWNrZXRcIiksXG4gICAgICAgIHZhbHVlOiBzbmFwc2hvdC5maWx0ZXJLZXkudHJpbSgpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNuYXBzaG90LmN1cnJlbmN5Q29kZS50cmltKCkpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJjdXJyZW5jeVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIiksXG4gICAgICAgIHZhbHVlOiBzbmFwc2hvdC5jdXJyZW5jeUNvZGUudHJpbSgpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNuYXBzaG90LnN0YXR1c0ZpbHRlciAhPT0gXCJcIikge1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcInN0YXR1c1wiLFxuICAgICAgICBsYWJlbDogaW5kVChcIlRpY2tldHNfRmlsdGVyX1N0YXR1c1wiLCBcIlN0YXR1c1wiKSxcbiAgICAgICAgdmFsdWU6IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbChzbmFwc2hvdC5zdGF0dXNGaWx0ZXIpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNuYXBzaG90Lmdhc3RvVHlwZUZpbHRlciAhPT0gXCJcIikge1xuICAgICAgY29uc3QgY2F0ZWdvcnlMYWJlbCA9IGdhc3RvVHlwZUxhYmVsTWFwLmdldChTdHJpbmcoc25hcHNob3QuZ2FzdG9UeXBlRmlsdGVyKSkgfHwgU3RyaW5nKHNuYXBzaG90Lmdhc3RvVHlwZUZpbHRlcik7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwiY2F0ZWdvcnlcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpLFxuICAgICAgICB2YWx1ZTogY2F0ZWdvcnlMYWJlbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChzbmFwc2hvdC5wcm9jZXNzZWRCeUlhRmlsdGVyICE9PSBcImFsbFwiKSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwicHJvY2Vzc2VkXCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQVwiLCBcIlByb2Nlc3NlZCBieSBJQVwiKSxcbiAgICAgICAgdmFsdWU6XG4gICAgICAgICAgc25hcHNob3QucHJvY2Vzc2VkQnlJYUZpbHRlciA9PT0gXCJ5ZXNcIlxuICAgICAgICAgICAgPyBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9ZZXNcIiwgXCJZZXNcIilcbiAgICAgICAgICAgIDogaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFfTm9cIiwgXCJOb1wiKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzdW1tYXJ5O1xuICB9LCBbYXBwbGllZEZpbHRlcnMsIGdhc3RvVHlwZUxhYmVsTWFwXSk7XG5cbiAgY29uc3Qgc2hvd1N1bW1hcnkgPSAhaXNMaW5rTW9kZSAmJiAhc2hvd0ZpbHRlcnMgJiYgc3VtbWFyeUl0ZW1zLmxlbmd0aCA+IDA7XG5cbiAgLy8gVmFsaWRhdGVzIHRhcmdldCBzaGVldCBsb2NrIHN0YXRlIGJlZm9yZSBlbmFibGluZyBsaW5rIG1vZGUgYWN0aW9ucy5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzTGlua01vZGUgfHwgIWxpbmtTaGVldElkKSB7XG4gICAgICBzZXRMaW5rU2hlZXRMb2NrZWQoZmFsc2UpO1xuICAgICAgc2V0TGlua1NoZWV0Q2hlY2tCdXN5KGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFjYW5Qcm9jZXNzTGlua01vZGUpIHtcbiAgICAgIHNldExpbmtTaGVldExvY2tlZCh0cnVlKTtcbiAgICAgIHNldExpbmtTaGVldENoZWNrQnVzeShmYWxzZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgIHNldExpbmtTaGVldENoZWNrQnVzeSh0cnVlKTtcbiAgICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKGxpbmtTaGVldElkLCB7XG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY2FuY2VsbGVkKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgaGVhZGVycyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IChoZWFkZXJzWzBdIHx8IG51bGwpIGFzIHsgRXhwZW5zZVNoZWV0U3RhdHVzPzogdW5rbm93bjsgVm91Y2hlcj86IHVua25vd24gfSB8IG51bGw7XG4gICAgICAgIGNvbnN0IHN0YXR1c0NvZGUgPSBOdW1iZXIoaGVhZGVyPy5FeHBlbnNlU2hlZXRTdGF0dXMgPz8gLTEpO1xuICAgICAgICBjb25zdCB2b3VjaGVyID0gc2FmZVRleHQoaGVhZGVyPy5Wb3VjaGVyKTtcbiAgICAgICAgY29uc3QgaXNMb2NrZWQgPSBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRCB8fCBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19QQUlEIHx8ICEhdm91Y2hlcjtcbiAgICAgICAgc2V0TGlua1NoZWV0TG9ja2VkKGlzTG9ja2VkKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICBpZiAoY2FuY2VsbGVkKSByZXR1cm47XG4gICAgICAgIHNldExpbmtTaGVldExvY2tlZCh0cnVlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmICghY2FuY2VsbGVkKSB7XG4gICAgICAgICAgc2V0TGlua1NoZWV0Q2hlY2tCdXN5KGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICB9O1xuICB9LCBbY2FuUHJvY2Vzc0xpbmtNb2RlLCBpc0xpbmtNb2RlLCBsaW5rU2hlZXRJZF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc0xpbmtNb2RlKSByZXR1cm47XG4gICAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCh7XG4gICAgICBhY3RpdmU6IHRydWUsXG4gICAgICBtZXNzYWdlOiBsaW5rTW9kZUNhbmNlbE1lc3NhZ2UsXG4gICAgfSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCgpO1xuICAgIH07XG4gIH0sIFtpc0xpbmtNb2RlLCBsaW5rTW9kZUNhbmNlbE1lc3NhZ2VdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChkaWRBcHBseVF1ZXJ5RmlsdGVyUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBkaWRBcHBseVF1ZXJ5RmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgIGlmIChpc0xpbmtNb2RlKSByZXR1cm47XG5cbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICBjb25zdCB0aWNrZXRGaWxlSWQgPSBzYWZlVGV4dCh1cmwuc2VhcmNoUGFyYW1zLmdldChcInRpY2tldEZpbGVJZFwiKSk7XG4gICAgaWYgKCF0aWNrZXRGaWxlSWQpIHJldHVybjtcbiAgICBjb25zdCByZXNvbHZlZE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuXG4gICAgY29uc3QgcXVlcnlTbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9IHtcbiAgICAgIGZyb21EYXRlOiBcIlwiLFxuICAgICAgdG9EYXRlOiBcIlwiLFxuICAgICAgZmlsdGVyS2V5OiB0aWNrZXRGaWxlSWQsXG4gICAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXG4gICAgICBtYW5hZ2VkVXNlcklkOiByZXNvbHZlZE1hbmFnZWRVc2VySWQsXG4gICAgICBzdGF0dXNGaWx0ZXI6IFwiXCIsXG4gICAgICBnYXN0b1R5cGVGaWx0ZXI6IFwiXCIsXG4gICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyOiBcImFsbFwiLFxuICAgIH07XG5cbiAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKHF1ZXJ5U25hcHNob3QpO1xuICAgIHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50ID0gdGlja2V0RmlsZUlkO1xuICAgIHZvaWQgbG9hZExpc3QoMSwgcXVlcnlTbmFwc2hvdCk7XG5cbiAgICB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZShcInRpY2tldEZpbGVJZFwiKTtcbiAgICBjb25zdCBjbGVhbmVkUXVlcnkgPSB1cmwuc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBcIlwiLCBjbGVhbmVkUXVlcnkgPyBgJHt1cmwucGF0aG5hbWV9PyR7Y2xlYW5lZFF1ZXJ5fWAgOiB1cmwucGF0aG5hbWUpO1xuICB9LCBbY2xlYXJDYWNoZWRTdGF0ZSwgZGVmYXVsdE1hbmFnZWRVc2VySWQsIGlzTGlua01vZGUsIGxvYWRMaXN0LCByZXN0b3JlQXBwbGllZEZpbHRlcnMsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBkaWRSZXN0b3JlT25Nb3VudFJlZi5jdXJyZW50ID0gdHJ1ZTtcblxuICAgIGlmIChpc0xpbmtNb2RlKSB7XG4gICAgICBjb25zdCBpc1JldHVybmluZ0Zyb21EZXRhaWwgPSBjb25zdW1lUmV0dXJuRmxhZygpO1xuICAgICAgY29uc3QgY2FjaGVkU3RhdGUgPSBpc1JldHVybmluZ0Zyb21EZXRhaWwgPyByZWFkQ2FjaGVkU3RhdGUoKSA6IG51bGw7XG4gICAgICBjb25zdCBjYWNoZWRTaGVldElkID0gc2FmZVRleHQoY2FjaGVkU3RhdGU/LmxpbmtNb2RlU2hlZXRJZCk7XG4gICAgICBpZiAoY2FjaGVkU3RhdGUgJiYgY2FjaGVkU2hlZXRJZCAmJiBjYWNoZWRTaGVldElkID09PSBzYWZlVGV4dChsaW5rU2hlZXRJZCkpIHtcbiAgICAgICAgY29uc3QgcmVzdG9yZWRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGNhY2hlZFN0YXRlLmZpbHRlcnMubWFuYWdlZFVzZXJJZCk7XG4gICAgICAgIGNvbnN0IHJlc3RvcmVkRmlsdGVycyA9IHtcbiAgICAgICAgICAuLi5jYWNoZWRTdGF0ZS5maWx0ZXJzLFxuICAgICAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCxcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKHJlc3RvcmVkRmlsdGVycyk7XG4gICAgICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBjYWNoZWRTdGF0ZS5zY3JvbGxZO1xuICAgICAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLmZvY3VzRmlsZUlkO1xuICAgICAgICBjb25zdCByZXN0b3JlZFNlbGVjdGlvbjogUmVjb3JkPHN0cmluZywgRXhwZW5zZVRpY2tldENhcmQ+ID0ge307XG4gICAgICAgIGZvciAoY29uc3QgdGlja2V0IG9mIGNhY2hlZFN0YXRlLnNlbGVjdGVkVGlja2V0cykge1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkRmlsZUlkID0gc2FmZVRleHQodGlja2V0LmZpbGVJZCk7XG4gICAgICAgICAgaWYgKCFzZWxlY3RlZEZpbGVJZCkgY29udGludWU7XG4gICAgICAgICAgcmVzdG9yZWRTZWxlY3Rpb25bc2VsZWN0ZWRGaWxlSWRdID0gdGlja2V0O1xuICAgICAgICB9XG4gICAgICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQocmVzdG9yZWRTZWxlY3Rpb24pO1xuICAgICAgICBpZiAoY2FjaGVkU3RhdGUuaXRlbXMubGVuZ3RoID4gMCB8fCBjYWNoZWRTdGF0ZS50b3RhbCA+IDApIHtcbiAgICAgICAgICByZXN0b3JlTGlzdFNuYXBzaG90KHtcbiAgICAgICAgICAgIGl0ZW1zOiBjYWNoZWRTdGF0ZS5pdGVtcyxcbiAgICAgICAgICAgIHRvdGFsOiBjYWNoZWRTdGF0ZS50b3RhbCxcbiAgICAgICAgICAgIHBhZ2U6IGNhY2hlZFN0YXRlLnBhZ2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZvaWQgbG9hZExpc3QoY2FjaGVkU3RhdGUucGFnZSwgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQocmVzdG9yZWRGaWx0ZXJzKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5pdGlhbE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICAgICAgY29uc3QgbGlua1NuYXBzaG90ID0gYnVpbGRMaW5rTW9kZUluaXRpYWxTbmFwc2hvdChpbml0aWFsTWFuYWdlZFVzZXJJZCk7XG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKHt9KTtcbiAgICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhsaW5rU25hcHNob3QpO1xuICAgICAgdm9pZCBsb2FkTGlzdCgxLCBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZChsaW5rU25hcHNob3QpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWNvbnN1bWVSZXR1cm5GbGFnKCkpIHtcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjYWNoZWRTdGF0ZSA9IHJlYWRDYWNoZWRTdGF0ZSgpO1xuICAgIGlmICghY2FjaGVkU3RhdGUpIHtcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByZXN0b3JlZE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oY2FjaGVkU3RhdGUuZmlsdGVycy5tYW5hZ2VkVXNlcklkKTtcbiAgICBjb25zdCByZXN0b3JlZEZpbHRlcnMgPSB7XG4gICAgICAuLi5jYWNoZWRTdGF0ZS5maWx0ZXJzLFxuICAgICAgbWFuYWdlZFVzZXJJZDogcmVzdG9yZWRNYW5hZ2VkVXNlcklkLFxuICAgIH07XG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKHJlc3RvcmVkRmlsdGVycyk7XG4gICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLnNjcm9sbFk7XG4gICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSBjYWNoZWRTdGF0ZS5mb2N1c0ZpbGVJZDtcbiAgICBpZiAoY2FjaGVkU3RhdGUuaXRlbXMubGVuZ3RoID4gMCB8fCBjYWNoZWRTdGF0ZS50b3RhbCA+IDApIHtcbiAgICAgIHJlc3RvcmVMaXN0U25hcHNob3Qoe1xuICAgICAgICBpdGVtczogY2FjaGVkU3RhdGUuaXRlbXMsXG4gICAgICAgIHRvdGFsOiBjYWNoZWRTdGF0ZS50b3RhbCxcbiAgICAgICAgcGFnZTogY2FjaGVkU3RhdGUucGFnZSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2b2lkIGxvYWRMaXN0KGNhY2hlZFN0YXRlLnBhZ2UsIHJlc3RvcmVkRmlsdGVycyk7XG4gIH0sIFtcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxuICAgIGRlZmF1bHRNYW5hZ2VkVXNlcklkLFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIGlzTGlua01vZGUsXG4gICAgbGlua1NoZWV0SWQsXG4gICAgbG9hZExpc3QsXG4gICAgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQsXG4gICAgcmVhZENhY2hlZFN0YXRlLFxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcbiAgICByZXN0b3JlTGlzdFNuYXBzaG90LFxuICAgIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbixcbiAgXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMb2FkaW5nKSByZXR1cm47XG4gICAgaWYgKHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPT0gbnVsbCAmJiAhcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgIGNvbnN0IHBlbmRpbmdTY3JvbGxZID0gcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudDtcbiAgICBjb25zdCBwZW5kaW5nRm9jdXNGaWxlSWQgPSBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudDtcbiAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IFwiXCI7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmIChwZW5kaW5nU2Nyb2xsWSAhPSBudWxsKSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgdG9wOiBNYXRoLm1heCgwLCBwZW5kaW5nU2Nyb2xsWSksXG4gICAgICAgICAgYmVoYXZpb3I6IFwiYXV0b1wiLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFwZW5kaW5nRm9jdXNGaWxlSWQgfHwgIXRpbWVsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgY29uc3Qgbm9ybWFsaXplZEZvY3VzSWQgPSBwZW5kaW5nRm9jdXNGaWxlSWQudG9VcHBlckNhc2UoKTtcbiAgICAgIGNvbnN0IHRpbWVsaW5lSXRlbXMgPSBBcnJheS5mcm9tKFxuICAgICAgICB0aW1lbGluZUNvbnRhaW5lclJlZi5jdXJyZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWl0ZW1bZGF0YS10aWNrZXQtZmlsZS1pZF1cIilcbiAgICAgICk7XG4gICAgICBjb25zdCBtYXRjaGluZ0l0ZW0gPSB0aW1lbGluZUl0ZW1zLmZpbmQoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHNhZmVUZXh0KGl0ZW0uZGF0YXNldC50aWNrZXRGaWxlSWQpLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRGb2N1c0lkO1xuICAgICAgfSk7XG4gICAgICBjb25zdCB0YXJnZXRDYXJkID0gbWF0Y2hpbmdJdGVtPy5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XG4gICAgICBpZiAoIXRhcmdldENhcmQpIHJldHVybjtcblxuICAgICAgdGFyZ2V0Q2FyZC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gICAgfSk7XG4gIH0sIFtpc0xvYWRpbmcsIGl0ZW1zLmxlbmd0aF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb25Ub2dnbGVGaWx0ZXJzID0gKCkgPT4ge1xuICAgICAgY29uc3Qgd2lsbE9wZW4gPSAhc2hvd0ZpbHRlcnM7XG4gICAgICB0b2dnbGVGaWx0ZXJQYW5lbCgpO1xuICAgICAgaWYgKHdpbGxPcGVuKSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uUmVmcmVzaCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnMoKTtcbiAgICAgIGlmICghaXNMaW5rTW9kZSAmJiAoIXNuYXBzaG90Py5mcm9tRGF0ZSB8fCAhc25hcHNob3Q/LnRvRGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdm9pZCBsb2FkTGlzdChjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsIHNuYXBzaG90KTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXRpY2tldHMtdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXhwZW5zZS10aWNrZXRzLXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XG4gICAgfTtcbiAgfSwgW2N1cnJlbnRQYWdlLCBpc0xpbmtNb2RlLCBsb2FkTGlzdCwgcmVzb2x2ZUFjdGl2ZUZpbHRlcnMsIHNob3dGaWx0ZXJzLCB0b2dnbGVGaWx0ZXJQYW5lbF0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgIDxDb25maXJtTW9kYWxcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWxDYW5jZWxUZXh0fVxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxuICAgICAgICBidXN5PXtsaW5rRmxvd0J1c3l9XG4gICAgICAgIGVycm9yPXtsaW5rRmxvd0Vycm9yfVxuICAgICAgICBzdGF0dXM9e2xpbmtGbG93U3RhdHVzfVxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cbiAgICAgICAgb25DYW5jZWw9e2Nsb3NlQ29uZmlybX1cbiAgICAgIC8+XG5cbiAgICAgIDxpbnB1dFxuICAgICAgICByZWY9e2NhbWVyYUlucHV0UmVmfVxuICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgIGFjY2VwdD1cImltYWdlL2pwZWcsaW1hZ2UvanBnLGltYWdlL3BuZyxpbWFnZS93ZWJwXCJcbiAgICAgICAgY2FwdHVyZT1cImVudmlyb25tZW50XCJcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmZpbGVzPy5bMF0gfHwgbnVsbDtcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICB2b2lkIGhhbmRsZVNlbGVjdGVkRmlsZShmaWxlLCBcImNhbWVyYVwiKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgICA8aW5wdXRcbiAgICAgICAgcmVmPXtnYWxsZXJ5SW5wdXRSZWZ9XG4gICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgYWNjZXB0PVwiaW1hZ2UvanBlZyxpbWFnZS9qcGcsaW1hZ2UvcG5nLGltYWdlL3dlYnBcIlxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZmlsZXM/LlswXSB8fCBudWxsO1xuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgIHZvaWQgaGFuZGxlU2VsZWN0ZWRGaWxlKGZpbGUsIFwiZ2FsbGVyeVwiKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG5cbiAgICAgIHshaXNMaW5rTW9kZSAmJiBzb3VyY2VQaWNrZXJPcGVuID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzQ1IHB4LTQgcHktNlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LXNtIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHAtNCBzaGFkb3cteGxcIj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LVsxNnB4XSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX1RpdGxlXCIsIFwiTnVldm8gdGlja2V0XCIpfVxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxuICAgICAgICAgICAgICB7aW5kVChcbiAgICAgICAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9Cb2R5XCIsXG4gICAgICAgICAgICAgICAgXCJTZWxlY2Npb25hIHVuYSBmdWVudGUgcGFyYSBjYXB0dXJhciBvIGVsZWdpciBsYSBpbWFnZW4gZGVsIHRpY2tldC5cIlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgZ3JpZCBncmlkLWNvbHMtMSBnYXAtMlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB2b2lkIHNlbGVjdEZyb21DYW1lcmEoY2FtZXJhSW5wdXRSZWYuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0NhbWVyYVwiLCBcIlVzYXIgY2FtYXJhXCIpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2VsZWN0RnJvbUdhbGxlcnkoZ2FsbGVyeUlucHV0UmVmLmN1cnJlbnQpfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfR2FsbGVyeVwiLCBcIkVsZWdpciBpbWFnZW5cIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbG9zZVNvdXJjZVBpY2tlcn1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgeyFpc0xpbmtNb2RlICYmIHF1aWNrVGlja2V0QnVzeSA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTk1MC8zNSBweC00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZS85NSBweC00IHB5LTMgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNSB3LTVcIiBsYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0gLz5cbiAgICAgICAgICAgIDxzcGFuPntxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgeyFpc0xpbmtNb2RlICYmIHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIHNwYWNlLXktMiByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXJvc2UtNTAgcC0zIHRleHQtc20gdGV4dC1yb3NlLTgwMFwiPlxuICAgICAgICAgIDxwPntxdWlja1RpY2tldEVycm9yTWVzc2FnZX08L3A+XG4gICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy13aGl0ZSBwLTIgdGV4dC14cyB0ZXh0LXJvc2UtNzAwXCI+XG4gICAgICAgICAgICAgIHtxdWlja1RpY2tldFRyYWNlTGlzdC5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgICAgICAgPHAga2V5PXtgJHtlbnRyeS5zdGVwfS0ke2VudHJ5LmF0fWB9PntgJHtlbnRyeS5zdGVwfTogJHtlbnRyeS50cmFjZUlkfWB9PC9wPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTJcIj5cbiAgICAgICAgICAgIHtoYXNQZW5kaW5nVXBsb2FkUmV0cnkgPyAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB2b2lkIHJldHJ5UGVuZGluZ1VwbG9hZCgpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1JldHJ5VXBsb2FkXCIsIFwiUmVpbnRlbnRhciB1cGxvYWRcIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCIgb25DbGljaz17Y2xlYXJRdWlja1RpY2tldEVycm9yfT5cbiAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2xvc2VcIiwgXCJDbG9zZVwiKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7c2hvd1N1bW1hcnkgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLXN1bW1hcnkgcC0zIHNtOnAtNCBtdC0xIG1iLTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4cGVuc2Utc3VtbWFyeS1ncmlkIGdyaWQgZ3JpZC1jb2xzLTEgbWluLVszNjBweF06Z3JpZC1jb2xzLTIgaXRlbXMtc3RhcnQgZ2FwLXgtNCBnYXAteS0xIHRleHQteHNcIj5cbiAgICAgICAgICAgIHtzdW1tYXJ5SXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXtgJHtpdGVtLmtleX0tJHtpdGVtLnZhbHVlfS0ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeSBoaXN0b3J5LWZpbHRlci1zdW1tYXJ5LS1ncmlkLWl0ZW0gbGVhZGluZy01IG1pbi13LTBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeV9fbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpdGVtLmxhYmVsfTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeV9fdmFsdWUgYnJlYWstd29yZHNcIj57aXRlbS52YWx1ZX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbFxuICAgICAgICB2aXNpYmxlPXtzaG93RmlsdGVyc31cbiAgICAgICAgc2hvd01hbnVhbERhdGVGaWx0ZXI9e3Nob3dNYW51YWxEYXRlRmlsdGVyfVxuICAgICAgICBtYW51YWxEYXRlQXV0b09wZW5LZXk9e21hbnVhbERhdGVBdXRvT3BlbktleX1cbiAgICAgICAgZnJvbURhdGU9e2Zyb21EYXRlfVxuICAgICAgICB0b0RhdGU9e3RvRGF0ZX1cbiAgICAgICAgZmlsdGVyS2V5PXtmaWx0ZXJLZXl9XG4gICAgICAgIGN1cnJlbmN5Q29kZT17Y3VycmVuY3lDb2RlfVxuICAgICAgICBtYW5hZ2VkVXNlcklkPXttYW5hZ2VkVXNlcklkfVxuICAgICAgICBtYW5hZ2VkVXNlcnM9e21hbmFnZWRVc2Vyc31cbiAgICAgICAgc2hvd01hbmFnZWRVc2VyRmlsdGVyPXtzaG93TWFuYWdlZFVzZXJGaWx0ZXJ9XG4gICAgICAgIHN0YXR1c0ZpbHRlcj17c3RhdHVzRmlsdGVyfVxuICAgICAgICBnYXN0b1R5cGVGaWx0ZXI9e2dhc3RvVHlwZUZpbHRlcn1cbiAgICAgICAgcHJvY2Vzc2VkQnlJYUZpbHRlcj17cHJvY2Vzc2VkQnlJYUZpbHRlcn1cbiAgICAgICAgYWN0aXZlUXVpY2tGaWx0ZXI9e2FjdGl2ZVF1aWNrRmlsdGVyfVxuICAgICAgICBzaG93TWFudWFsRGF0ZUVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yfVxuICAgICAgICBzdGF0dXNGaWx0ZXJSZWFkT25seT17c3RhdHVzRmlsdGVyTG9ja2VkfVxuICAgICAgICBmaXhlZFN0YXR1c0ZpbHRlcj17Zml4ZWRTdGF0dXNGaWx0ZXJ9XG4gICAgICAgIGdhc3RvVHlwZU9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XG4gICAgICAgIG9uRGF0ZVJhbmdlQ2hhbmdlPXtvbkRhdGVSYW5nZUNoYW5nZX1cbiAgICAgICAgb25NYW51YWxSYW5nZUNvbXBsZXRlPXtvbk1hbnVhbFJhbmdlQ29tcGxldGV9XG4gICAgICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2U9e29uUXVpY2tGaWx0ZXJDaGFuZ2V9XG4gICAgICAgIG9uRmlsdGVyS2V5Q2hhbmdlPXtzZXRGaWx0ZXJLZXl9XG4gICAgICAgIG9uQ3VycmVuY3lDb2RlQ2hhbmdlPXtzZXRDdXJyZW5jeUNvZGV9XG4gICAgICAgIG9uTWFuYWdlZFVzZXJJZENoYW5nZT17c2V0TWFuYWdlZFVzZXJJZH1cbiAgICAgICAgb25TdGF0dXNGaWx0ZXJDaGFuZ2U9e3NldFN0YXR1c0ZpbHRlcn1cbiAgICAgICAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2U9e3NldEdhc3RvVHlwZUZpbHRlcn1cbiAgICAgICAgb25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlPXtzZXRQcm9jZXNzZWRCeUlhRmlsdGVyfVxuICAgICAgICBvbkNsZWFyPXtvbkNsZWFyfVxuICAgICAgICBvbkFwcGx5PXtvbkFwcGx5fVxuICAgICAgLz5cblxuICAgICAge2lzTGlua01vZGUgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIHB4LTAuNVwiPlxuICAgICAgICAgIHshY2FuUHJvY2Vzc0xpbmtNb2RlID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtcm9zZS03MDBcIj57aW5kVChcIkF1dGhfUGVybWlzc2lvbkRlbmllZF9Cb2R5XCIsIFwiTm8gcGVybWlzc2lvbi5cIil9PC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmIGxpbmtTaGVldENoZWNrQnVzeSA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfSAvPlxuICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgIHtjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiBsaW5rU2hlZXRMb2NrZWQgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1yb3NlLTcwMFwiPlxuICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1BhaWRSZWFkT25seVwiLCBcIkxhcyBob2phcyBkZSBnYXN0byBwYWdhZGFzIHNvbiBkZSBzb2xvIGxlY3R1cmEuXCIpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmICFsaW5rU2hlZXRDaGVja0J1c3kgJiYgIWxpbmtTaGVldExvY2tlZCA/IChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMS41IHB0LTAuNVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIG1pbi13LTAgcHgtMS41IHB5LTEgdGV4dC1bMTBweF0gbGVhZGluZy10aWdodCBzbTp0ZXh0LXhzXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NsZWFyVGlja2V0U2VsZWN0aW9ufVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xpbmtGbG93QnVzeSB8fCBzZWxlY3RlZFRpY2tldENvdW50IDwgMX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0NsZWFyQWxsXCIsIFwiQm9ycmFyIHRvZG9zXCIpfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIG1pbi13LTAgcHgtMS41IHB5LTEgdGV4dC1bMTBweF0gbGVhZGluZy10aWdodCBzbTp0ZXh0LXhzXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29wZW5MaW5rQ29uZmlybU1vZGFsfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xpbmtGbG93QnVzeSB8fCBzZWxlY3RlZFRpY2tldENvdW50IDwgMX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0xpbmtCdXR0b25cIiwgXCJWaW5jdWxhciB0aWNrZXQocylcIil9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCJcbiAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogaXNMb2FkaW5nID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxuICAgICAgPlxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XG4gICAgICA8L2Rpdj5cblxuICAgICAge2Vycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57ZXJyb3JNZXNzYWdlfTwvZGl2PiA6IG51bGx9XG5cbiAgICAgIHshaXNMb2FkaW5nICYmICFlcnJvck1lc3NhZ2UgJiYgaXRlbXMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveCB0aW1lbGluZS1lbXB0eVwiIGRhdGEtZW1wdHktdGV4dD17aW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpfSAvPlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIHshZXJyb3JNZXNzYWdlICYmIGl0ZW1zLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgIDxkaXYgcmVmPXt0aW1lbGluZUNvbnRhaW5lclJlZn0gY2xhc3NOYW1lPVwidGltZWxpbmUtYm94XCI+XG4gICAgICAgICAge2l0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KGl0ZW0uZmlsZUlkKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVQYXJ0cyA9IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMoaXRlbS50cmFuc0RhdGUsIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiKTtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gc2FmZVRleHQoaXRlbS5kZXNjcmlwdGlvbikgfHwgc2FmZVRleHQoaXRlbS5maWxlTmFtZSkgfHwgZmlsZUlkIHx8IFwiLVwiO1xuICAgICAgICAgICAgY29uc3QgYW1vdW50VGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShpdGVtLnRvdGFsQW1vdW50ID8/IG51bGwsIHNhZmVUZXh0KGl0ZW0uY3VycmVuY3lDb2RlKSk7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNDb2RlID0gaXRlbS5zdGF0dXM7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNMYWJlbCA9IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbChzdGF0dXNDb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IGlzQXNzaWduZWRUb0V4cGVuc2VTaGVldCA9IHN0YXR1c0NvZGUgPT09IDE7XG4gICAgICAgICAgICBjb25zdCBzaG93UHJvY2Vzc2VkQnlBaUljb24gPSBpdGVtLnByb2Nlc3NlZEJ5QUkgPT09IHRydWU7XG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGFibGVJbkxpbmtNb2RlID0gaXNMaW5rTW9kZSAmJiBjYW5TZWxlY3RUaWNrZXRGb3JMaW5rKGl0ZW0pO1xuICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZEluTGlua01vZGUgPSBpc0xpbmtNb2RlICYmIGlzVGlja2V0U2VsZWN0ZWQoZmlsZUlkKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZEJ5QWlMYWJlbCA9IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBXCIsIFwiUHJvY2Vzc2VkIGJ5IElBXCIpO1xuICAgICAgICAgICAgY29uc3QgZ2FzdG9UeXBlQ29kZSA9IGl0ZW0uZ2FzdG9UeXBlID09PSBudWxsID8gXCJcIiA6IFN0cmluZyhpdGVtLmdhc3RvVHlwZSk7XG4gICAgICAgICAgICBjb25zdCBnYXN0b1R5cGVMYWJlbCA9IGdhc3RvVHlwZUNvZGVcbiAgICAgICAgICAgICAgPyBnYXN0b1R5cGVMYWJlbE1hcC5nZXQoZ2FzdG9UeXBlQ29kZSkgfHwgZ2FzdG9UeXBlQ29kZVxuICAgICAgICAgICAgICA6IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xuICAgICAgICAgICAgY29uc3QgY2FyZFN1YnRpdGxlID0gZ2FzdG9UeXBlTGFiZWw7XG4gICAgICAgICAgICBjb25zdCBiYXNlU3RhdHVzSWNvbnMgPSBpc0Fzc2lnbmVkVG9FeHBlbnNlU2hlZXQgfHwgc2hvd1Byb2Nlc3NlZEJ5QWlJY29uID8gKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIHtpc0Fzc2lnbmVkVG9FeHBlbnNlU2hlZXQgPyAoXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvblwiIHJvbGU9XCJpbWdcIiBhcmlhLWxhYmVsPXtzdGF0dXNMYWJlbH0+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPXsxLjV9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNCB3LTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk0xMy4xOSA4LjY4OGE0LjUgNC41IDAgMCAxIDEuMjQyIDcuMjQ0bC00LjUgNC41YTQuNSA0LjUgMCAwIDEtNi4zNjQtNi4zNjRsMS43NTctMS43NTdtMTMuMzUtLjYyMiAxLjc1Ny0xLjc1N2E0LjUgNC41IDAgMCAwLTYuMzY0LTYuMzY0bC00LjUgNC41YTQuNSA0LjUgMCAwIDAgMS4yNDIgNy4yNDRcIlxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgIHtzaG93UHJvY2Vzc2VkQnlBaUljb24gPyAoXG4gICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvbiBleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvbi0tYWlcIlxuICAgICAgICAgICAgICAgICAgICByb2xlPVwiaW1nXCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17cHJvY2Vzc2VkQnlBaUxhYmVsfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTQgdy00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNNCAxOGw0LTEybDQgMTJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTYgMTNoNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgNmg2XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNyA2djEyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAxOGg2XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKSA6IG51bGw7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb25Db250cm9sID0gaXNMaW5rTW9kZSA/IChcbiAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCAtbS0xIGgtNiB3LTYgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCJcbiAgICAgICAgICAgICAgICBvblBvaW50ZXJEb3duPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgbWFya0xpbmtNb2RlU2VsZWN0aW9uSW50ZW50KCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBvbk1vdXNlRG93bj17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgIG1hcmtMaW5rTW9kZVNlbGVjdGlvbkludGVudCgpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgIG1hcmtMaW5rTW9kZVNlbGVjdGlvbkludGVudCgpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBjaGVja2VkPXtpc1NlbGVjdGVkSW5MaW5rTW9kZX1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaXNTZWxlY3RhYmxlSW5MaW5rTW9kZSB8fCBsaW5rRmxvd0J1c3kgfHwgbGlua1NoZWV0Q2hlY2tCdXN5IHx8IGxpbmtTaGVldExvY2tlZH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtNCB3LTQgY3Vyc29yLXBvaW50ZXIgYWNjZW50LXByaW1hcnkgcG9pbnRlci1ldmVudHMtYXV0b1wiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtMaW5rTW9kZVNlbGVjdGlvbkludGVudCgpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtMaW5rTW9kZVNlbGVjdGlvbkludGVudCgpO1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVUaWNrZXRTZWxlY3Rpb24oaXRlbSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1NlbGVjdFRpY2tldFwiLCBcIlNlbGVjY2lvbmFyIHRpY2tldFwiKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApIDogbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1c0ljb25zID0gaXNMaW5rTW9kZSA/IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICB7c2VsZWN0aW9uQ29udHJvbH1cbiAgICAgICAgICAgICAgICB7YmFzZVN0YXR1c0ljb25zfVxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICkgOiBiYXNlU3RhdHVzSWNvbnM7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNJY29uQ2xhc3NOYW1lID0gaXNMaW5rTW9kZVxuICAgICAgICAgICAgICA/IFwiZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb25zIHBvaW50ZXItZXZlbnRzLWF1dG9cIlxuICAgICAgICAgICAgICA6IFwiZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb25zXCI7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e2Ake2ZpbGVJZH0tJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17aXNTZWxlY3RlZEluTGlua01vZGUgPyBcInRpbWVsaW5lLWl0ZW0gcm91bmRlZC0yeGwgcmluZy0yIHJpbmctcHJpbWFyeS8zMFwiIDogXCJ0aW1lbGluZS1pdGVtXCJ9XG4gICAgICAgICAgICAgICAgZGF0YS10aWNrZXQtZmlsZS1pZD17ZmlsZUlkIHx8IHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxFeHBlbnNlVGltZWxpbmVDYXJkXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgICAgICAgICAgIHN1YnRpdGxlPXtjYXJkU3VidGl0bGV9XG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxuICAgICAgICAgICAgICAgICAgb25PcGVuPXsoKSA9PiBvcGVuVGlja2V0RGV0YWlsKGZpbGVJZCl9XG4gICAgICAgICAgICAgICAgICB0aXRsZUNsYXNzTmFtZT1cImV4cGVuc2UtdGlja2V0LWNhcmRfX3RpdGxlIHRpbWVsaW5lLW5hbWVcIlxuICAgICAgICAgICAgICAgICAgc3RhdHVzTGFiZWw9e3N0YXR1c0xhYmVsfVxuICAgICAgICAgICAgICAgICAgc3RhdHVzSWNvbj17c3RhdHVzSWNvbnN9XG4gICAgICAgICAgICAgICAgICBzdGF0dXNJY29uQ2xhc3NOYW1lPXtzdGF0dXNJY29uQ2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXG4gICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsUGFnZXN9XG4gICAgICAgIGN1cnJlbnRQYWdlPXtjdXJyZW50UGFnZX1cbiAgICAgICAgbG9hZGluZz17aXNMb2FkaW5nfVxuICAgICAgICBvblBhZ2VDaGFuZ2U9eyhwYWdlKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc25hcHNob3QgPSByZXNvbHZlQWN0aXZlRmlsdGVycygpO1xuICAgICAgICAgIGlmICghaXNMaW5rTW9kZSAmJiAoIXNuYXBzaG90Py5mcm9tRGF0ZSB8fCAhc25hcHNob3Q/LnRvRGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2b2lkIGxvYWRMaXN0KHBhZ2UsIHNuYXBzaG90KTtcbiAgICAgICAgfX1cbiAgICAgICAgbGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgLz5cblxuICAgICAge2NhbkNyZWF0ZVRpY2tldCAmJiAhaXNMaW5rTW9kZSA/IChcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJhcGlkYXNcIil9XG4gICAgICAgICAgc2l6ZT17NzZ9XG4gICAgICAgICAgcmlnaHQ9ezE2fVxuICAgICAgICAgIGJvdHRvbT17MjR9XG4gICAgICAgICAgbWVudUFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0FjdGlvbnNcIiwgXCJBY2Npb25lcyByYXBpZGFzXCIpfVxuICAgICAgICAgIG1lbnVJdGVtcz17ZmFiTWVudUl0ZW1zfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2UgdGlja2V0cyBsaXN0LlxuY29uc3QgRXhwZW5zZVRpY2tldHNQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cbiAgICAgIDxFeHBlbnNlVGlja2V0c1BhZ2VDb250ZW50IC8+XG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgKTtcbn07XG5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2UtdGlja2V0cy1yb290XCIpO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VUaWNrZXRzUGFnZSAvPik7XG59O1xuXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldHNQYWdlO1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcbmltcG9ydCB0eXBlIHsgQXV0aE1hbmFnZWRVc2VyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi4vLi4vdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVN1bW1hcnkudHN4XCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHtcbiAgZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlck9wdGlvbnMsXG4gIG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlLFxuICB0eXBlIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VUaWNrZXRTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsIEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkIH0gZnJvbSBcIi4uL3RpY2tldHMvZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZURhdGVSYW5nZUZpbHRlciBmcm9tIFwiLi9FeHBlbnNlRGF0ZVJhbmdlRmlsdGVyLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VGaWx0ZXJBY3Rpb25zIGZyb20gXCIuL0V4cGVuc2VGaWx0ZXJBY3Rpb25zLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMgZnJvbSBcIi4vRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0IGZyb20gXCIuL0V4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dC50c3hcIjtcblxuY29uc3QgcGFyc2VJc29EYXRlID0gKHJhdzogc3RyaW5nKTogRGF0ZSB8IG51bGwgPT4ge1xuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKHJhdykudHJpbSgpLnNwbGl0KFwiVFwiKVswXTtcbiAgaWYgKCEvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdCh2YWx1ZSkpIHJldHVybiBudWxsO1xuICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSB2YWx1ZS5zcGxpdChcIi1cIikubWFwKE51bWJlcik7XG4gIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG59O1xuXG5jb25zdCBmb3JtYXREYXRlID0gKHJhdzogc3RyaW5nLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGRhdGUgPSBwYXJzZUlzb0RhdGUocmF3KTtcbiAgaWYgKCFkYXRlKSByZXR1cm4gXCItLVwiO1xuICByZXR1cm4gZGF0ZVxuICAgIC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7XG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxuICAgICAgbW9udGg6IFwic2hvcnRcIixcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgIH0pXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xufTtcblxudHlwZSBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbFByb3BzID0ge1xuICB2aXNpYmxlOiBib29sZWFuO1xuICBzaG93TWFudWFsRGF0ZUZpbHRlcjogYm9vbGVhbjtcbiAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5OiBudW1iZXI7XG4gIGZyb21EYXRlOiBzdHJpbmc7XG4gIHRvRGF0ZTogc3RyaW5nO1xuICBmaWx0ZXJLZXk6IHN0cmluZztcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIG1hbmFnZWRVc2VySWQ6IHN0cmluZztcbiAgbWFuYWdlZFVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXTtcbiAgc2hvd01hbmFnZWRVc2VyRmlsdGVyOiBib29sZWFuO1xuICBzdGF0dXNGaWx0ZXI6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlO1xuICBnYXN0b1R5cGVGaWx0ZXI6IFwiXCIgfCBFeHBlbnNlR2FzdG9UeXBlQ29kZTtcbiAgcHJvY2Vzc2VkQnlJYUZpbHRlcjogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXI7XG4gIGFjdGl2ZVF1aWNrRmlsdGVyOiBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCB8IG51bGw7XG4gIHNob3dNYW51YWxEYXRlRXJyb3I6IGJvb2xlYW47XG4gIHN0YXR1c0ZpbHRlclJlYWRPbmx5PzogYm9vbGVhbjtcbiAgZml4ZWRTdGF0dXNGaWx0ZXI/OiAwIHwgMSB8IG51bGw7XG4gIGdhc3RvVHlwZU9wdGlvbnM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXTtcbiAgb25EYXRlUmFuZ2VDaGFuZ2U6IChmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25NYW51YWxSYW5nZUNvbXBsZXRlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uUXVpY2tGaWx0ZXJDaGFuZ2U6IChmaWx0ZXJJZDogRXhwZW5zZVRpY2tldFF1aWNrRmlsdGVySWQpID0+IHZvaWQ7XG4gIG9uRmlsdGVyS2V5Q2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbk1hbmFnZWRVc2VySWRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvblN0YXR1c0ZpbHRlckNoYW5nZTogKHZhbHVlOiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSkgPT4gdm9pZDtcbiAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogXCJcIiB8IEV4cGVuc2VHYXN0b1R5cGVDb2RlKSA9PiB2b2lkO1xuICBvblByb2Nlc3NlZEJ5SWFGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIpID0+IHZvaWQ7XG4gIG9uQ2xlYXI6ICgpID0+IHZvaWQ7XG4gIG9uQXBwbHk6ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBTaGFyZWQgdGlja2V0cyBmaWx0ZXIgcGFuZWwgd2l0aCBnbG9iYWwgcXVpY2sgZGF0ZSBmaWx0ZXJzIGFuZCBmaXhlZCB0aWNrZXQgZmlsdGVycy5cbmNvbnN0IEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsID0gKHtcbiAgdmlzaWJsZSxcbiAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXG4gIG1hbnVhbERhdGVBdXRvT3BlbktleSxcbiAgZnJvbURhdGUsXG4gIHRvRGF0ZSxcbiAgZmlsdGVyS2V5LFxuICBjdXJyZW5jeUNvZGUsXG4gIG1hbmFnZWRVc2VySWQsXG4gIG1hbmFnZWRVc2VycyxcbiAgc2hvd01hbmFnZWRVc2VyRmlsdGVyLFxuICBzdGF0dXNGaWx0ZXIsXG4gIGdhc3RvVHlwZUZpbHRlcixcbiAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gIHN0YXR1c0ZpbHRlclJlYWRPbmx5ID0gZmFsc2UsXG4gIGZpeGVkU3RhdHVzRmlsdGVyID0gbnVsbCxcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcbiAgb25EYXRlUmFuZ2VDaGFuZ2UsXG4gIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcbiAgb25RdWlja0ZpbHRlckNoYW5nZSxcbiAgb25GaWx0ZXJLZXlDaGFuZ2UsXG4gIG9uQ3VycmVuY3lDb2RlQ2hhbmdlLFxuICBvbk1hbmFnZWRVc2VySWRDaGFuZ2UsXG4gIG9uU3RhdHVzRmlsdGVyQ2hhbmdlLFxuICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZSxcbiAgb25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlLFxuICBvbkNsZWFyLFxuICBvbkFwcGx5LFxufTogRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWxQcm9wcykgPT4ge1xuICBjb25zdCBzdGF0dXNPcHRpb25zID0gdXNlTWVtbygoKSA9PiBnZXRFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyT3B0aW9ucygpLCBbXSk7XG5cbiAgY29uc3QgY2F0ZWdvcnlPcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KCgpID0+IHtcbiAgICByZXR1cm4gW1xuICAgICAgeyB2YWx1ZTogXCJcIiwgdGV4dDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0FsbFwiLCBcIkFsbFwiKSB9LFxuICAgICAgLi4uZ2FzdG9UeXBlT3B0aW9ucyxcbiAgICBdO1xuICB9LCBbZ2FzdG9UeXBlT3B0aW9uc10pO1xuXG4gIGlmICghdmlzaWJsZSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGxvY2FsZSA9IGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiO1xuICBjb25zdCBzaG93SW5saW5lRGF0ZVN1bW1hcnkgPSAhc2hvd01hbnVhbERhdGVGaWx0ZXIgJiYgISFmcm9tRGF0ZSAmJiAhIXRvRGF0ZTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLWV4cGFuZGVkIHAtMiBzbTpwLTIuNSByZWxhdGl2ZVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdGFjayBmbGV4IGZsZXgtY29sIHNwYWNlLXktMlwiPlxuICAgICAgICA8RXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMgYWN0aXZlUXVpY2tGaWx0ZXI9e2FjdGl2ZVF1aWNrRmlsdGVyfSBvblF1aWNrRmlsdGVyQ2hhbmdlPXtvblF1aWNrRmlsdGVyQ2hhbmdlfSAvPlxuXG4gICAgICAgIHtzaG93TWFudWFsRGF0ZUZpbHRlciA/IChcbiAgICAgICAgICA8RXhwZW5zZURhdGVSYW5nZUZpbHRlclxuICAgICAgICAgICAgZnJvbURhdGU9e2Zyb21EYXRlfVxuICAgICAgICAgICAgdG9EYXRlPXt0b0RhdGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25EYXRlUmFuZ2VDaGFuZ2V9XG4gICAgICAgICAgICBvblJhbmdlQ29tcGxldGU9e29uTWFudWFsUmFuZ2VDb21wbGV0ZX1cbiAgICAgICAgICAgIGF1dG9PcGVuUmVxdWVzdElkPXttYW51YWxEYXRlQXV0b09wZW5LZXl9XG4gICAgICAgICAgICBzaG93TWFudWFsRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3J9XG4gICAgICAgICAgICBzaG93U3RhcnRFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvciAmJiAhZnJvbURhdGV9XG4gICAgICAgICAgICBzaG93RW5kRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3IgJiYgIXRvRGF0ZX1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogc2hvd0lubGluZURhdGVTdW1tYXJ5ID8gKFxuICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxuICAgICAgICAgICAgc3VtbWFyeUZyb21MYWJlbD17aW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIil9XG4gICAgICAgICAgICBzdW1tYXJ5VG9MYWJlbD17aW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKX1cbiAgICAgICAgICAgIGZyb21WYWx1ZT17Zm9ybWF0RGF0ZShmcm9tRGF0ZSwgbG9jYWxlKX1cbiAgICAgICAgICAgIHRvVmFsdWU9e2Zvcm1hdERhdGUodG9EYXRlLCBsb2NhbGUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ2FwLXktMSB0ZXh0LVsxMXB4XSBweC0xXCJcbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgJHtzaG93TWFuYWdlZFVzZXJGaWx0ZXIgPyBcImxnOmdyaWQtY29scy02XCIgOiBcImxnOmdyaWQtY29scy01XCJ9IGdhcC0yYH0+XG4gICAgICAgICAgPEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9GaWx0ZXJLZXlcIiwgXCJUaWNrZXRcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX0ZpbHRlcktleVwiLCBcIlRpY2tldFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtmaWx0ZXJLZXl9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25GaWx0ZXJLZXlDaGFuZ2V9XG4gICAgICAgICAgICBlbmFibGVSZW1vdGVTdWdnZXN0aW9uc1xuICAgICAgICAgICAgZml4ZWRTdGF0dXNGaWx0ZXI9e2ZpeGVkU3RhdHVzRmlsdGVyfVxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgdmFsdWU9e2N1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkN1cnJlbmN5Q29kZUNoYW5nZX1cbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICBzaG93TG9hZGluZ1N0YXRlVGV4dD17ZmFsc2V9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIHtzaG93TWFuYWdlZFVzZXJGaWx0ZXIgPyAoXG4gICAgICAgICAgICA8RXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0XG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiQ29tbW9uX1VzZXJcIiwgXCJVc2VyXCIpfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkNvbW1vbl9Vc2VyXCIsIFwiVXNlclwiKX1cbiAgICAgICAgICAgICAgdmFsdWU9e21hbmFnZWRVc2VySWR9XG4gICAgICAgICAgICAgIHVzZXJzPXttYW5hZ2VkVXNlcnN9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbk1hbmFnZWRVc2VySWRDaGFuZ2V9XG4gICAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX1N0YXR1c1wiLCBcIlN0YXR1c1wiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfVxuICAgICAgICAgICAgb3B0aW9ucz17c3RhdHVzT3B0aW9uc31cbiAgICAgICAgICAgIHZhbHVlPXtzdGF0dXNGaWx0ZXJ9XG4gICAgICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4gb25TdGF0dXNGaWx0ZXJDaGFuZ2Uobm9ybWFsaXplRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUobmV4dFZhbHVlLCBcIlwiKSl9XG4gICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICAgICAgICBkaXNhYmxlZD17c3RhdHVzRmlsdGVyUmVhZE9ubHl9XG4gICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLXRpY2tldC1zdGF0dXMtZmlsdGVyXCJcbiAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cbiAgICAgICAgICAgIG9wdGlvbnM9e2NhdGVnb3J5T3B0aW9uc31cbiAgICAgICAgICAgIHZhbHVlPXtnYXN0b1R5cGVGaWx0ZXJ9XG4gICAgICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBOdW1iZXIobmV4dFZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKG5leHRWYWx1ZSA9PT0gXCJcIiB8fCAhTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpKSB7XG4gICAgICAgICAgICAgICAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2UoXCJcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlKHBhcnNlZCBhcyBFeHBlbnNlR2FzdG9UeXBlQ29kZSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS10aWNrZXQtZ2FzdG90eXBlLWZpbHRlclwiXG4gICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIil9XG4gICAgICAgICAgICB2YWx1ZT17cHJvY2Vzc2VkQnlJYUZpbHRlcn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvblByb2Nlc3NlZEJ5SWFGaWx0ZXJDaGFuZ2V9XG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxFeHBlbnNlRmlsdGVyQWN0aW9uc1xuICAgICAgICAgIGNsZWFyTGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGVhclwiLCBcIkNsZWFyXCIpfVxuICAgICAgICAgIGFwcGx5TGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9BcHBseVwiLCBcIkFwcGx5XCIpfVxuICAgICAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XG4gICAgICAgICAgb25BcHBseT17b25BcHBseX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWw7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIgfSBmcm9tIFwiLi4vdGlja2V0cy9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3RQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmFsdWU6IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyO1xuICBvbkNoYW5nZTogKHZhbHVlOiBFeHBlbnNlVGlja2V0UHJvY2Vzc2VkQnlJYUZpbHRlcikgPT4gdm9pZDtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG59O1xuXG4vLyBGaXhlZCBlbnVtIHNlbGVjdCBmb3IgSUEgcHJvY2Vzc2luZyBmaWx0ZXIgd2l0aCBBbGwvWWVzL05vIG9wdGlvbnMuXG5jb25zdCBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdCA9ICh7XG4gIGxhYmVsLFxuICBwbGFjZWhvbGRlcixcbiAgdmFsdWUsXG4gIG9uQ2hhbmdlLFxuICByZWFkT25seSA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICBzaG93TGFiZWwgPSB0cnVlLFxufTogRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3RQcm9wcykgPT4ge1xuICBjb25zdCB1aVZhbHVlID0gdmFsdWUgPT09IFwiYWxsXCIgPyBcIlwiIDogdmFsdWU7XG4gIGNvbnN0IG9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXG4gICAgKCkgPT4gW1xuICAgICAgeyB2YWx1ZTogXCJhbGxcIiwgdGV4dDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1N0YXR1c19Cb3RoXCIsIFwiQWxsXCIpIH0sXG4gICAgICB7IHZhbHVlOiBcInllc1wiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9ZZXNcIiwgXCJZZXNcIikgfSxcbiAgICAgIHsgdmFsdWU6IFwibm9cIiwgdGV4dDogaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFfTm9cIiwgXCJOb1wiKSB9LFxuICAgIF0sXG4gICAgW11cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgIHZhbHVlPXt1aVZhbHVlfVxuICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IHtcbiAgICAgICAgaWYgKG5leHRWYWx1ZSA9PT0gXCJ5ZXNcIiB8fCBuZXh0VmFsdWUgPT09IFwibm9cIiB8fCBuZXh0VmFsdWUgPT09IFwiYWxsXCIpIHtcbiAgICAgICAgICBvbkNoYW5nZShuZXh0VmFsdWUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBvbkNoYW5nZShcImFsbFwiKTtcbiAgICAgIH19XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICBpZEJhc2U9XCJleHBlbnNlLXByb2Nlc3NlZC1ieS1pYS1maWx0ZXJcIlxuICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZW1vdGVTZWFyY2hDb21ib2JveCwgeyB0eXBlIFJlbW90ZVNlYXJjaE9wdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUmVtb3RlU2VhcmNoQ29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8sIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0IH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICBmaXhlZFN0YXR1c0ZpbHRlcj86IDAgfCAxIHwgbnVsbDtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG59O1xuXG5jb25zdCBTRUFSQ0hfUEFHRV9TSVpFID0gMzA7XG5cbi8vIEJ1aWxkcyBtaW5pbWFsIHBheWxvYWQgZm9yIHRpY2tldCBrZXkgc3VnZ2VzdGlvbnMgd2l0aG91dCBkYXRlIGZpbHRlcnMuXG5jb25zdCBidWlsZFRpY2tldFN1Z2dlc3RQYXlsb2FkID0gKFxuICB0ZXJtOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemU6IG51bWJlcixcbiAgZml4ZWRTdGF0dXNGaWx0ZXI6IDAgfCAxIHwgbnVsbFxuKTogRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QgPT4ge1xuICBjb25zdCBzYWZlVGVybSA9IFN0cmluZyh0ZXJtIHx8IFwiXCIpLnRyaW0oKTtcbiAgcmV0dXJuIHtcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2UpIDogMSxcbiAgICBwYWdlU2l6ZTogTnVtYmVyLmlzRmluaXRlKHBhZ2VTaXplKSAmJiBwYWdlU2l6ZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2VTaXplKSA6IFNFQVJDSF9QQUdFX1NJWkUsXG4gICAgc2VhcmNoS2V5OiBzYWZlVGVybSB8fCB1bmRlZmluZWQsXG4gICAgZmlsdGVyOiBzYWZlVGVybSB8fCB1bmRlZmluZWQsXG4gICAgc3RhdHVzOiBmaXhlZFN0YXR1c0ZpbHRlciA9PT0gMCB8fCBmaXhlZFN0YXR1c0ZpbHRlciA9PT0gMSA/IGZpeGVkU3RhdHVzRmlsdGVyIDogdW5kZWZpbmVkLFxuICB9O1xufTtcblxuY29uc3QgbWFwVGlja2V0T3B0aW9ucyA9IChpdGVtczogRXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG9bXSB8IHVuZGVmaW5lZCk6IFJlbW90ZVNlYXJjaE9wdGlvbltdID0+IHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW10pXG4gICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgZmlsZUlkID0gU3RyaW5nKGl0ZW0/LkZpbGVJZCB8fCBcIlwiKS50cmltKCk7XG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gU3RyaW5nKGl0ZW0/LkRlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGNvbnN0IHN1YnRpdGxlID0gZGVzY3JpcHRpb24gfHwgXCItXCI7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogZmlsZUlkLFxuICAgICAgICB0aXRsZTogZmlsZUlkLFxuICAgICAgICBzdWJ0aXRsZSxcbiAgICAgIH0gYXMgUmVtb3RlU2VhcmNoT3B0aW9uO1xuICAgIH0pXG4gICAgLmZpbHRlcihCb29sZWFuKSBhcyBSZW1vdGVTZWFyY2hPcHRpb25bXTtcbn07XG5cbi8vIFRpY2tldCBrZXkgZmlsdGVyIGlucHV0IHdpdGggcmVtb3RlIGxpc3Qgc3VnZ2VzdGlvbnMuXG5jb25zdCBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQgPSAoe1xuICBsYWJlbCxcbiAgcGxhY2Vob2xkZXIsXG4gIHZhbHVlLFxuICBvbkNoYW5nZSxcbiAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnMgPSB0cnVlLFxuICBmaXhlZFN0YXR1c0ZpbHRlciA9IG51bGwsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG59OiBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXRQcm9wcykgPT4ge1xuICBjb25zdCByZWFkT25seU1vZGUgPSByZWFkT25seSB8fCBkaXNhYmxlZDtcblxuICBjb25zdCBsb2FkT3B0aW9ucyA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHNpZ25hbDogQWJvcnRTaWduYWwpOiBQcm9taXNlPFJlbW90ZVNlYXJjaE9wdGlvbltdPiA9PiB7XG4gICAgY29uc3QgcGF5bG9hZCA9IGJ1aWxkVGlja2V0U3VnZ2VzdFBheWxvYWQodGVybSwgMSwgU0VBUkNIX1BBR0VfU0laRSwgZml4ZWRTdGF0dXNGaWx0ZXIpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0KHBheWxvYWQsIHtcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgc2lnbmFsLFxuICAgIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHJldHVybiBtYXBUaWNrZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyk7XG4gIH0sIFtmaXhlZFN0YXR1c0ZpbHRlcl0pO1xuXG4gIGNvbnN0IGxvYWRPcHRpb25zUGFnZSA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHBhZ2U6IG51bWJlciwgX3BhZ2VTaXplOiBudW1iZXIsIHNpZ25hbDogQWJvcnRTaWduYWwpID0+IHtcbiAgICBjb25zdCBwYXlsb2FkID0gYnVpbGRUaWNrZXRTdWdnZXN0UGF5bG9hZCh0ZXJtLCBwYWdlLCBTRUFSQ0hfUEFHRV9TSVpFLCBmaXhlZFN0YXR1c0ZpbHRlcik7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QocGF5bG9hZCwge1xuICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICBzaWduYWwsXG4gICAgfSk7XG5cbiAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIHRvdGFsOiAwLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IG1hcFRpY2tldE9wdGlvbnMocmVzcG9uc2U/Lkl0ZW1zKSxcbiAgICAgIHRvdGFsOiBOdW1iZXIocmVzcG9uc2U/LlRvdGFsIHx8IDApLFxuICAgIH07XG4gIH0sIFtmaXhlZFN0YXR1c0ZpbHRlcl0pO1xuXG4gIGlmICghZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnMgfHwgcmVhZE9ubHlNb2RlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgIHtzaG93TGFiZWwgPyAoXG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiIHN0eWxlPXt7IGNvbG9yOiBcIiMwMDI5NmJlMFwiIH19PlxuICAgICAgICAgICAge2xhYmVsfVxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBweC0zIHB5LTIgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGVhZGluZy01IHRleHQtc2xhdGUtOTAwIGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIlxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbH1cbiAgICAgICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPFJlbW90ZVNlYXJjaENvbWJvYm94XG4gICAgICBsYWJlbD17bGFiZWx9XG4gICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICBvblNlYXJjaD17YXN5bmMgKHRlcm0sIHNpZ25hbCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBhd2FpdCBsb2FkT3B0aW9ucyh0ZXJtLCBzaWduYWwpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH19XG4gICAgICBvblNlYXJjaFBhZ2U9e2FzeW5jICh0ZXJtLCBwYWdlLCBwYWdlU2l6ZSwgc2lnbmFsKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGxvYWRPcHRpb25zUGFnZSh0ZXJtLCBwYWdlLCBwYWdlU2l6ZSwgc2lnbmFsKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBpdGVtczogW10sIHRvdGFsOiAwIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9fVxuICAgICAgaWRCYXNlPVwiZXhwZW5zZS10aWNrZXQtZmlsdGVyLWtleVwiXG4gICAgICBtaW5TZWFyY2hMZW5ndGg9ezB9XG4gICAgICBwYWdlU2l6ZT17U0VBUkNIX1BBR0VfU0laRX1cbiAgICAgIGFsbG93RW1wdHlTZWFyY2hcbiAgICAgIGxvYWRPbk9wZW5cbiAgICAgIGluZmluaXRlU2Nyb2xsXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7XG4gIEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXG4gIEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkLFxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZEYXksIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90LnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGVBcmdzID0ge1xuICBvbkFwcGx5RmlsdGVyczogKHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB2b2lkO1xuICBvbkNsZWFyRmlsdGVyczogKCkgPT4gdm9pZDtcbiAgZGVmYXVsdE1hbmFnZWRVc2VySWQ6IHN0cmluZztcbiAgZml4ZWRTdGF0dXNGaWx0ZXI/OiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSB8IG51bGw7XG4gIGFsbG93RW1wdHlEYXRlc09uQXBwbHk/OiBib29sZWFuO1xufTtcblxuLy8gT3ducyBmaWx0ZXIgVUkgc3RhdGUgYW5kIGFwcGx5L2NsZWFyIHJ1bGVzIGZvciBleHBlbnNlIHRpY2tldHMgbGlzdCBwYWdlLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlID0gKHtcbiAgb25BcHBseUZpbHRlcnMsXG4gIG9uQ2xlYXJGaWx0ZXJzLFxuICBkZWZhdWx0TWFuYWdlZFVzZXJJZCxcbiAgZml4ZWRTdGF0dXNGaWx0ZXIgPSBudWxsLFxuICBhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5ID0gZmFsc2UsXG59OiBVc2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZUFyZ3MpID0+IHtcbiAgY29uc3QgaGFzRml4ZWRTdGF0dXNGaWx0ZXIgPSBmaXhlZFN0YXR1c0ZpbHRlciA9PT0gMCB8fCBmaXhlZFN0YXR1c0ZpbHRlciA9PT0gMTtcblxuICBjb25zdCByZXNvbHZlU3RhdHVzRmlsdGVyID0gdXNlQ2FsbGJhY2soXG4gICAgKHZhbHVlOiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSk6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlID0+IHtcbiAgICAgIGlmIChoYXNGaXhlZFN0YXR1c0ZpbHRlcikge1xuICAgICAgICByZXR1cm4gZml4ZWRTdGF0dXNGaWx0ZXIgYXMgRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBbZml4ZWRTdGF0dXNGaWx0ZXIsIGhhc0ZpeGVkU3RhdHVzRmlsdGVyXVxuICApO1xuXG4gIGNvbnN0IFtmcm9tRGF0ZSwgc2V0RnJvbURhdGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFt0b0RhdGUsIHNldFRvRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2ZpbHRlcktleSwgc2V0RmlsdGVyS2V5XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbY3VycmVuY3lDb2RlLCBzZXRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYW5hZ2VkVXNlcklkLCBzZXRNYW5hZ2VkVXNlcklkXSA9IHVzZVN0YXRlKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcbiAgY29uc3QgW3N0YXR1c0ZpbHRlclJhdywgc2V0U3RhdHVzRmlsdGVyUmF3XSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlPihyZXNvbHZlU3RhdHVzRmlsdGVyKFwiXCIpKTtcbiAgY29uc3QgW2dhc3RvVHlwZUZpbHRlciwgc2V0R2FzdG9UeXBlRmlsdGVyXSA9IHVzZVN0YXRlPFwiXCIgfCBFeHBlbnNlR2FzdG9UeXBlQ29kZT4oXCJcIik7XG4gIGNvbnN0IFtwcm9jZXNzZWRCeUlhRmlsdGVyLCBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyXSA9IHVzZVN0YXRlPFwiYWxsXCIgfCBcInllc1wiIHwgXCJub1wiPihcImFsbFwiKTtcbiAgY29uc3QgW2FjdGl2ZVF1aWNrRmlsdGVyLCBzZXRBY3RpdmVRdWlja0ZpbHRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd01hbnVhbERhdGVGaWx0ZXIsIHNldFNob3dNYW51YWxEYXRlRmlsdGVyXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dNYW51YWxEYXRlRXJyb3IsIHNldFNob3dNYW51YWxEYXRlRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWFudWFsRGF0ZUF1dG9PcGVuS2V5LCBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXldID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFthcHBsaWVkRmlsdGVycywgc2V0QXBwbGllZEZpbHRlcnNdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd0ZpbHRlcnMsIHNldFNob3dGaWx0ZXJzXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFoYXNGaXhlZFN0YXR1c0ZpbHRlcikgcmV0dXJuO1xuICAgIHNldFN0YXR1c0ZpbHRlclJhdyhmaXhlZFN0YXR1c0ZpbHRlciBhcyBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSk7XG4gIH0sIFtmaXhlZFN0YXR1c0ZpbHRlciwgaGFzRml4ZWRTdGF0dXNGaWx0ZXJdKTtcblxuICBjb25zdCBzdGF0dXNGaWx0ZXIgPSByZXNvbHZlU3RhdHVzRmlsdGVyKHN0YXR1c0ZpbHRlclJhdyk7XG5cbiAgY29uc3QgY3VycmVudEZpbHRlcnMgPSB1c2VNZW1vPEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3Q+KFxuICAgICgpID0+ICh7XG4gICAgICBmcm9tRGF0ZSxcbiAgICAgIHRvRGF0ZSxcbiAgICAgIGZpbHRlcktleTogZmlsdGVyS2V5LnRyaW0oKSxcbiAgICAgIGN1cnJlbmN5Q29kZTogY3VycmVuY3lDb2RlLnRyaW0oKSxcbiAgICAgIG1hbmFnZWRVc2VySWQ6IG1hbmFnZWRVc2VySWQudHJpbSgpLFxuICAgICAgc3RhdHVzRmlsdGVyLFxuICAgICAgZ2FzdG9UeXBlRmlsdGVyLFxuICAgICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgICB9KSxcbiAgICBbY3VycmVuY3lDb2RlLCBmaWx0ZXJLZXksIGZyb21EYXRlLCBnYXN0b1R5cGVGaWx0ZXIsIG1hbmFnZWRVc2VySWQsIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsIHN0YXR1c0ZpbHRlciwgdG9EYXRlXVxuICApO1xuXG4gIGNvbnN0IHNldFN0YXR1c0ZpbHRlciA9IHVzZUNhbGxiYWNrKFxuICAgICh2YWx1ZTogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpID0+IHtcbiAgICAgIGlmIChoYXNGaXhlZFN0YXR1c0ZpbHRlcikge1xuICAgICAgICBzZXRTdGF0dXNGaWx0ZXJSYXcoZml4ZWRTdGF0dXNGaWx0ZXIgYXMgRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRTdGF0dXNGaWx0ZXJSYXcodmFsdWUpO1xuICAgIH0sXG4gICAgW2ZpeGVkU3RhdHVzRmlsdGVyLCBoYXNGaXhlZFN0YXR1c0ZpbHRlcl1cbiAgKTtcblxuICBjb25zdCBvbkFwcGx5ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghYWxsb3dFbXB0eURhdGVzT25BcHBseSAmJiAoIWZyb21EYXRlIHx8ICF0b0RhdGUpKSB7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKHRydWUpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIodHJ1ZSk7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9IHtcbiAgICAgIGZyb21EYXRlLFxuICAgICAgdG9EYXRlLFxuICAgICAgZmlsdGVyS2V5OiBmaWx0ZXJLZXkudHJpbSgpLFxuICAgICAgY3VycmVuY3lDb2RlOiBjdXJyZW5jeUNvZGUudHJpbSgpLFxuICAgICAgbWFuYWdlZFVzZXJJZDogbWFuYWdlZFVzZXJJZC50cmltKCksXG4gICAgICBzdGF0dXNGaWx0ZXIsXG4gICAgICBnYXN0b1R5cGVGaWx0ZXIsXG4gICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxuICAgIH07XG5cbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICBzZXRBcHBsaWVkRmlsdGVycyhzbmFwc2hvdCk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcbiAgICBvbkFwcGx5RmlsdGVycyhzbmFwc2hvdCk7XG4gIH0sIFtcbiAgICBhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5LFxuICAgIGN1cnJlbmN5Q29kZSxcbiAgICBmaWx0ZXJLZXksXG4gICAgZnJvbURhdGUsXG4gICAgZ2FzdG9UeXBlRmlsdGVyLFxuICAgIG1hbmFnZWRVc2VySWQsXG4gICAgb25BcHBseUZpbHRlcnMsXG4gICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgICBzdGF0dXNGaWx0ZXIsXG4gICAgdG9EYXRlLFxuICBdKTtcblxuICAvLyBSZWh5ZHJhdGVzIHRpY2tldCBmaWx0ZXJzIGZyb20gYSBjYWNoZWQgc25hcHNob3Qgd2hlbiByZXR1cm5pbmcgZnJvbSBkZXRhaWwuXG4gIGNvbnN0IHJlc3RvcmVBcHBsaWVkRmlsdGVycyA9IHVzZUNhbGxiYWNrKFxuICAgIChzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4ge1xuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdChzbmFwc2hvdCk7XG4gICAgICBjb25zdCBub3JtYWxpemVkU3RhdHVzRmlsdGVyID0gcmVzb2x2ZVN0YXR1c0ZpbHRlcihub3JtYWxpemVkLnN0YXR1c0ZpbHRlcik7XG4gICAgICBjb25zdCByZXN0b3JlZE1hbmFnZWRVc2VySWQgPSBTdHJpbmcobm9ybWFsaXplZC5tYW5hZ2VkVXNlcklkIHx8IGRlZmF1bHRNYW5hZ2VkVXNlcklkKS50cmltKCk7XG4gICAgICBzZXRGcm9tRGF0ZShub3JtYWxpemVkLmZyb21EYXRlKTtcbiAgICAgIHNldFRvRGF0ZShub3JtYWxpemVkLnRvRGF0ZSk7XG4gICAgICBzZXRGaWx0ZXJLZXkobm9ybWFsaXplZC5maWx0ZXJLZXkpO1xuICAgICAgc2V0Q3VycmVuY3lDb2RlKG5vcm1hbGl6ZWQuY3VycmVuY3lDb2RlKTtcbiAgICAgIHNldE1hbmFnZWRVc2VySWQocmVzdG9yZWRNYW5hZ2VkVXNlcklkKTtcbiAgICAgIHNldFN0YXR1c0ZpbHRlclJhdyhub3JtYWxpemVkU3RhdHVzRmlsdGVyKTtcbiAgICAgIHNldEdhc3RvVHlwZUZpbHRlcihub3JtYWxpemVkLmdhc3RvVHlwZUZpbHRlcik7XG4gICAgICBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyKG5vcm1hbGl6ZWQucHJvY2Vzc2VkQnlJYUZpbHRlcik7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgICAgc2V0QXBwbGllZEZpbHRlcnMoe1xuICAgICAgICAuLi5ub3JtYWxpemVkLFxuICAgICAgICBtYW5hZ2VkVXNlcklkOiByZXN0b3JlZE1hbmFnZWRVc2VySWQsXG4gICAgICAgIHN0YXR1c0ZpbHRlcjogbm9ybWFsaXplZFN0YXR1c0ZpbHRlcixcbiAgICAgIH0pO1xuICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICAgIH0sXG4gICAgW2RlZmF1bHRNYW5hZ2VkVXNlcklkLCByZXNvbHZlU3RhdHVzRmlsdGVyXVxuICApO1xuXG4gIGNvbnN0IG9uQ2xlYXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0RnJvbURhdGUoXCJcIik7XG4gICAgc2V0VG9EYXRlKFwiXCIpO1xuICAgIHNldEZpbHRlcktleShcIlwiKTtcbiAgICBzZXRDdXJyZW5jeUNvZGUoXCJcIik7XG4gICAgc2V0TWFuYWdlZFVzZXJJZChkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XG4gICAgc2V0U3RhdHVzRmlsdGVyUmF3KHJlc29sdmVTdGF0dXNGaWx0ZXIoXCJcIikpO1xuICAgIHNldEdhc3RvVHlwZUZpbHRlcihcIlwiKTtcbiAgICBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyKFwiYWxsXCIpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXkoMCk7XG4gICAgc2V0QXBwbGllZEZpbHRlcnMobnVsbCk7XG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gICAgb25DbGVhckZpbHRlcnMoKTtcbiAgfSwgW2RlZmF1bHRNYW5hZ2VkVXNlcklkLCBvbkNsZWFyRmlsdGVycywgcmVzb2x2ZVN0YXR1c0ZpbHRlcl0pO1xuXG4gIGNvbnN0IG9uRGF0ZVJhbmdlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXG4gICAgKG5leHRGcm9tRGF0ZTogc3RyaW5nLCBuZXh0VG9EYXRlOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGhhc0Z1bGxSYW5nZSA9ICEhbmV4dEZyb21EYXRlICYmICEhbmV4dFRvRGF0ZTtcbiAgICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XG4gICAgICBzZXRUb0RhdGUobmV4dFRvRGF0ZSk7XG4gICAgICBpZiAoIWhhc0Z1bGxSYW5nZSkge1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcbiAgICAgIH1cbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgaWYgKHNob3dNYW51YWxEYXRlRXJyb3IpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcighaGFzRnVsbFJhbmdlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtzaG93TWFudWFsRGF0ZUVycm9yXVxuICApO1xuXG4gIGNvbnN0IG9uTWFudWFsUmFuZ2VDb21wbGV0ZSA9IHVzZUNhbGxiYWNrKChuZXh0RnJvbURhdGU6IHN0cmluZywgbmV4dFRvRGF0ZTogc3RyaW5nKSA9PiB7XG4gICAgc2V0RnJvbURhdGUobmV4dEZyb21EYXRlKTtcbiAgICBzZXRUb0RhdGUobmV4dFRvRGF0ZSk7XG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgb25RdWlja0ZpbHRlckNoYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgIChmaWx0ZXJJZDogRXhwZW5zZVRpY2tldFF1aWNrRmlsdGVySWQpID0+IHtcbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJjdXN0b21cIikge1xuICAgICAgICBpZiAoc2hvd01hbnVhbERhdGVGaWx0ZXIpIHtcbiAgICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKHRydWUpO1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICAgICAgc2V0TWFudWFsRGF0ZUF1dG9PcGVuS2V5KChwcmV2aW91cykgPT4gcHJldmlvdXMgKyAxKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihmaWx0ZXJJZCk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcblxuICAgICAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xuICAgICAgY29uc3QgbmV4dEZyb20gPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy03XCIpIHtcbiAgICAgICAgbmV4dEZyb20uc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA2KTtcbiAgICAgIH0gZWxzZSBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy0zMFwiKSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMjkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dEZyb20uc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA4OSk7XG4gICAgICB9XG5cbiAgICAgIHNldEZyb21EYXRlKHRvSXNvRGF0ZShuZXh0RnJvbSkpO1xuICAgICAgc2V0VG9EYXRlKHRvSXNvRGF0ZSh0b2RheSkpO1xuICAgIH0sXG4gICAgW3Nob3dNYW51YWxEYXRlRmlsdGVyXVxuICApO1xuXG4gIGNvbnN0IHRvZ2dsZUZpbHRlclBhbmVsID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFNob3dGaWx0ZXJzKChwcmV2aW91cykgPT4ge1xuICAgICAgY29uc3QgbmV4dCA9ICFwcmV2aW91cztcbiAgICAgIGlmICghbmV4dCkge1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgZnJvbURhdGUsXG4gICAgdG9EYXRlLFxuICAgIGZpbHRlcktleSxcbiAgICBjdXJyZW5jeUNvZGUsXG4gICAgbWFuYWdlZFVzZXJJZCxcbiAgICBzdGF0dXNGaWx0ZXIsXG4gICAgZ2FzdG9UeXBlRmlsdGVyLFxuICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVFcnJvcixcbiAgICBtYW51YWxEYXRlQXV0b09wZW5LZXksXG4gICAgYXBwbGllZEZpbHRlcnMsXG4gICAgc2hvd0ZpbHRlcnMsXG4gICAgY3VycmVudEZpbHRlcnMsXG4gICAgc2V0RmlsdGVyS2V5LFxuICAgIHNldEN1cnJlbmN5Q29kZSxcbiAgICBzZXRNYW5hZ2VkVXNlcklkLFxuICAgIHNldFN0YXR1c0ZpbHRlcixcbiAgICBzZXRHYXN0b1R5cGVGaWx0ZXIsXG4gICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgICBvbkFwcGx5LFxuICAgIG9uQ2xlYXIsXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlLFxuICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcbiAgICBvblF1aWNrRmlsdGVyQ2hhbmdlLFxuICAgIHRvZ2dsZUZpbHRlclBhbmVsLFxuICAgIHN0YXR1c0ZpbHRlckxvY2tlZDogaGFzRml4ZWRTdGF0dXNGaWx0ZXIsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlU2NvcGVUb2tlbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2NvcGUudHNcIjtcbmltcG9ydCB7IGJ1aWxkRXhwZW5zZVRpY2tldExpc3RQYXlsb2FkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VQYXlsb2FkQnVpbGRlcnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCwgRXhwZW5zZVRpY2tldENhcmQgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YUFyZ3MgPSB7XG4gIGhhc0FjY2VzczogYm9vbGVhbjtcbiAgcGFnZVNpemU6IG51bWJlcjtcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XG59O1xuY29uc3QgQUxMT1dFRF9HQVNUT19UWVBFX0NPREVTID0gbmV3IFNldDxudW1iZXI+KFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0pO1xuY29uc3QgRVhQRU5TRV9USUNLRVRTX0xJU1RfQ0FDSEVfS0VZX1BSRUZJWCA9IFwiZXhwZW5zZV90aWNrZXRzX2xpc3RfdjFcIjtcbmNvbnN0IEVYUEVOU0VfVElDS0VUU19MSVNUX0NBQ0hFX1RUTF9NUyA9IDIgKiA2MCAqIDEwMDA7XG5cbnR5cGUgRXhwZW5zZVRpY2tldExpc3RDYWNoZUVudHJ5ID0ge1xuICByZXF1ZXN0S2V5OiBzdHJpbmc7XG4gIHBhZ2U6IG51bWJlcjtcbiAgdG90YWw6IG51bWJlcjtcbiAgaXRlbXM6IEV4cGVuc2VUaWNrZXRDYXJkW107XG59O1xuXG5jb25zdCB0b051bGxhYmxlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XG59O1xuXG5jb25zdCB0b051bGxhYmxlQm9vbCA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gfCBudWxsID0+IHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHJldHVybiB2YWx1ZTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHZhbHVlID09PSAxID8gdHJ1ZSA6IHZhbHVlID09PSAwID8gZmFsc2UgOiBudWxsO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IHZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChub3JtYWxpemVkID09PSBcInRydWVcIiB8fCBub3JtYWxpemVkID09PSBcIjFcIikgcmV0dXJuIHRydWU7XG4gICAgaWYgKG5vcm1hbGl6ZWQgPT09IFwiZmFsc2VcIiB8fCBub3JtYWxpemVkID09PSBcIjBcIikgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3QgdG9OdWxsYWJsZVRpY2tldFN0YXR1cyA9ICh2YWx1ZTogdW5rbm93bik6IDAgfCAxIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBwYXJzZWQgPT09IDAgfHwgcGFyc2VkID09PSAxID8gcGFyc2VkIDogbnVsbDtcbn07XG5cbmNvbnN0IHRvTnVsbGFibGVUaWNrZXRHYXN0b1R5cGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlR2FzdG9UeXBlQ29kZSB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICBpZiAoIU51bWJlci5pc0ludGVnZXIocGFyc2VkKSB8fCAhQUxMT1dFRF9HQVNUT19UWVBFX0NPREVTLmhhcyhwYXJzZWQpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gcGFyc2VkIGFzIEV4cGVuc2VHYXN0b1R5cGVDb2RlO1xufTtcblxuY29uc3QgbWFwVGlja2V0SXRlbVRvQ2FyZCA9IChpdGVtOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IEV4cGVuc2VUaWNrZXRDYXJkID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmaWxlSWQ6IFN0cmluZyhpdGVtPy5GaWxlSWQgfHwgXCJcIikudHJpbSgpLFxuICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoaXRlbT8uRGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpLFxuICAgIHN0YXR1czogdG9OdWxsYWJsZVRpY2tldFN0YXR1cyhpdGVtPy5TdGF0dXMpLFxuICAgIGhvamFHYXN0b3NJZERpc3BsYXk6IFN0cmluZyhpdGVtPy5Ib2phR2FzdG9zSWREaXNwbGF5ID8/IGl0ZW0/LmhvamFHYXN0b3NJZERpc3BsYXkgPz8gXCJcIikudHJpbSgpLFxuICAgIHByb2Nlc3NlZEJ5QUk6IHRvTnVsbGFibGVCb29sKGl0ZW0/LlByb2Nlc3NlZEJ5QUkpLFxuICAgIGN1cnJlbmN5Q29kZTogU3RyaW5nKGl0ZW0/LkN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCksXG4gICAgdG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbT8uVG90YWxBbW91bnQpLFxuICAgIGNyZWF0ZWRCeVVzZXJJZDogU3RyaW5nKGl0ZW0/LkNyZWF0ZWRCeVVzZXJJZCB8fCBcIlwiKS50cmltKCksXG4gICAgdHJhbnNEYXRlOiBTdHJpbmcoaXRlbT8uVHJhbnNEYXRlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICB1cmxGaWxlOiBTdHJpbmcoaXRlbT8uVXJsRmlsZSB8fCBcIlwiKS50cmltKCksXG4gICAgZmlsZU5hbWU6IFN0cmluZyhpdGVtPy5GaWxlTmFtZSB8fCBcIlwiKS50cmltKCksXG4gICAgZ2FzdG9UeXBlOiB0b051bGxhYmxlVGlja2V0R2FzdG9UeXBlKGl0ZW0/Lkdhc3RvVHlwZSA/PyBpdGVtPy5nYXN0b1R5cGUpLFxuICB9O1xufTtcblxuY29uc3QgZ2V0TGlzdENhY2hlU2NvcGUgPSAoKSA9PiB7XG4gIHJldHVybiBnZXRFeHBlbnNlU2NvcGVUb2tlbigpO1xufTtcblxuY29uc3QgZ2V0TGlzdENhY2hlS2V5ID0gKCkgPT4gYCR7RVhQRU5TRV9USUNLRVRTX0xJU1RfQ0FDSEVfS0VZX1BSRUZJWH1fJHtnZXRMaXN0Q2FjaGVTY29wZSgpfWA7XG5cbi8vIFJlYWRzIG9uZSBzaG9ydC1saXZlZCBsaXN0IHNuYXBzaG90IHRvIGF2b2lkIHJlcGVhdGluZyB0aGUgc2FtZSBleHBlbnNpdmUgcmVxdWVzdC5cbmNvbnN0IHJlYWRMaXN0Q2FjaGVFbnRyeSA9IChyZXF1ZXN0S2V5OiBzdHJpbmcpOiBFeHBlbnNlVGlja2V0TGlzdENhY2hlRW50cnkgfCBudWxsID0+IHtcbiAgY29uc3QgcmF3ID0gZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5PEV4cGVuc2VUaWNrZXRMaXN0Q2FjaGVFbnRyeT4oZ2V0TGlzdENhY2hlS2V5KCkpO1xuICBpZiAoIXJhdyB8fCB0eXBlb2YgcmF3ICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcbiAgaWYgKFN0cmluZyhyYXcucmVxdWVzdEtleSB8fCBcIlwiKSAhPT0gcmVxdWVzdEtleSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3Qgc2FmZUl0ZW1zID0gQXJyYXkuaXNBcnJheShyYXcuaXRlbXMpID8gcmF3Lml0ZW1zIDogW107XG4gIGNvbnN0IHRvdGFsUmF3ID0gTnVtYmVyKHJhdy50b3RhbCk7XG4gIGNvbnN0IHRvdGFsID0gTnVtYmVyLmlzRmluaXRlKHRvdGFsUmF3KSAmJiB0b3RhbFJhdyA+PSAwID8gdG90YWxSYXcgOiBzYWZlSXRlbXMubGVuZ3RoO1xuICBjb25zdCBwYWdlUmF3ID0gTnVtYmVyKHJhdy5wYWdlKTtcbiAgY29uc3QgcGFnZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlUmF3KSAmJiBwYWdlUmF3ID4gMCA/IE1hdGguZmxvb3IocGFnZVJhdykgOiAxO1xuXG4gIHJldHVybiB7XG4gICAgcmVxdWVzdEtleSxcbiAgICBwYWdlLFxuICAgIHRvdGFsLFxuICAgIGl0ZW1zOiBzYWZlSXRlbXMsXG4gIH07XG59O1xuXG5jb25zdCB3cml0ZUxpc3RDYWNoZUVudHJ5ID0gKGVudHJ5OiBFeHBlbnNlVGlja2V0TGlzdENhY2hlRW50cnkpOiB2b2lkID0+IHtcbiAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5KGdldExpc3RDYWNoZUtleSgpLCBlbnRyeSwgRVhQRU5TRV9USUNLRVRTX0xJU1RfQ0FDSEVfVFRMX01TKTtcbn07XG5cbi8vIE93bnMgbGlzdCBkYXRhIGZldGNoLCBsb2FkaW5nIHN0YXRlLCBhbmQgcGFnaW5hdGlvbiBtZXRhZGF0YSBmb3IgdGlja2V0cy5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0c0xpc3REYXRhID0gKHsgaGFzQWNjZXNzLCBwYWdlU2l6ZSwgb25Gb3JiaWRkZW4gfTogVXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YUFyZ3MpID0+IHtcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0Q2FyZFtdPihbXSk7XG4gIGNvbnN0IFt0b3RhbCwgc2V0VG90YWxdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtjdXJyZW50UGFnZSwgc2V0Q3VycmVudFBhZ2VdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RLZXlSZWYgPSB1c2VSZWYoXCJcIik7XG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RTZXFSZWYgPSB1c2VSZWYoMCk7XG5cbiAgY29uc3QgcmVzdG9yZUxpc3RTbmFwc2hvdCA9IHVzZUNhbGxiYWNrKFxuICAgIChzbmFwc2hvdDogeyBpdGVtczogRXhwZW5zZVRpY2tldENhcmRbXTsgdG90YWw6IG51bWJlcjsgcGFnZTogbnVtYmVyIH0pID0+IHtcbiAgICAgIGNvbnN0IHNhZmVJdGVtcyA9IEFycmF5LmlzQXJyYXkoc25hcHNob3QuaXRlbXMpID8gc25hcHNob3QuaXRlbXMgOiBbXTtcbiAgICAgIGNvbnN0IHNhZmVUb3RhbFJhdyA9IE51bWJlcihzbmFwc2hvdC50b3RhbCk7XG4gICAgICBjb25zdCBzYWZlVG90YWwgPSBOdW1iZXIuaXNGaW5pdGUoc2FmZVRvdGFsUmF3KSAmJiBzYWZlVG90YWxSYXcgPj0gMCA/IHNhZmVUb3RhbFJhdyA6IHNhZmVJdGVtcy5sZW5ndGg7XG4gICAgICBjb25zdCBzYWZlUGFnZVJhdyA9IE51bWJlcihzbmFwc2hvdC5wYWdlKTtcbiAgICAgIGNvbnN0IHNhZmVQYWdlID0gTnVtYmVyLmlzRmluaXRlKHNhZmVQYWdlUmF3KSAmJiBzYWZlUGFnZVJhdyA+IDAgPyBNYXRoLmZsb29yKHNhZmVQYWdlUmF3KSA6IDE7XG5cbiAgICAgIHNldEl0ZW1zKHNhZmVJdGVtcyk7XG4gICAgICBzZXRUb3RhbChzYWZlVG90YWwpO1xuICAgICAgc2V0Q3VycmVudFBhZ2Uoc2FmZVBhZ2UpO1xuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICB9LFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgbG9hZExpc3QgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAocGFnZTogbnVtYmVyLCBmaWx0ZXJzOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB7XG4gICAgICBpZiAoIWhhc0FjY2Vzcykge1xuICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZEV4cGVuc2VUaWNrZXRMaXN0UGF5bG9hZChmaWx0ZXJzLCBwYWdlLCBwYWdlU2l6ZSk7XG4gICAgICBjb25zdCBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCA9IFN0cmluZyhmaWx0ZXJzPy5tYW5hZ2VkVXNlcklkIHx8IFwiXCIpLnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgY29uc3QgcmVxdWVzdEtleSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgcGF5bG9hZCxcbiAgICAgICAgbWFuYWdlZFVzZXJJZDogbm9ybWFsaXplZE1hbmFnZWRVc2VySWQsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGNhY2hlZEVudHJ5ID0gcmVhZExpc3RDYWNoZUVudHJ5KHJlcXVlc3RLZXkpO1xuICAgICAgaWYgKGNhY2hlZEVudHJ5KSB7XG4gICAgICAgIGlmIChhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudC5hYm9ydCgpO1xuICAgICAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICAgIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9IFwiXCI7XG4gICAgICAgICAgYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdG9yZUxpc3RTbmFwc2hvdCh7XG4gICAgICAgICAgaXRlbXM6IGNhY2hlZEVudHJ5Lml0ZW1zLFxuICAgICAgICAgIHRvdGFsOiBjYWNoZWRFbnRyeS50b3RhbCxcbiAgICAgICAgICBwYWdlOiBjYWNoZWRFbnRyeS5wYWdlLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCAmJiBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPT09IHJlcXVlc3RLZXkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCkge1xuICAgICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50LmFib3J0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcbiAgICAgIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9IHJlcXVlc3RLZXk7XG4gICAgICBjb25zdCByZXF1ZXN0U2VxID0gYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50ICsgMTtcbiAgICAgIGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCA9IHJlcXVlc3RTZXE7XG5cbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0KHBheWxvYWQsIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICAgIGF4VXNlcklkT3ZlcnJpZGU6IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChyZXF1ZXN0U2VxICE9PSBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIlRpY2tldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0cy5cIikpO1xuICAgICAgICAgIHNldEl0ZW1zKFtdKTtcbiAgICAgICAgICBzZXRUb3RhbCgwKTtcbiAgICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtYXBwZWRJdGVtcyA9IChBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdKS5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgbWFwVGlja2V0SXRlbVRvQ2FyZChpdGVtIGFzIHVua25vd24gYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlVG90YWwgPSBOdW1iZXIocmVzcG9uc2U/LlRvdGFsID8/IG1hcHBlZEl0ZW1zLmxlbmd0aCA/PyAwKTtcbiAgICAgICAgY29uc3QgbmV4dFRvdGFsID0gcmVzcG9uc2VUb3RhbDtcblxuICAgICAgICB3cml0ZUxpc3RDYWNoZUVudHJ5KHtcbiAgICAgICAgICByZXF1ZXN0S2V5LFxuICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgdG90YWw6IG5leHRUb3RhbCxcbiAgICAgICAgICBpdGVtczogbWFwcGVkSXRlbXMsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldEl0ZW1zKG1hcHBlZEl0ZW1zKTtcbiAgICAgICAgc2V0VG90YWwobmV4dFRvdGFsKTtcbiAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoY29udHJvbGxlci5zaWduYWwuYWJvcnRlZCkgcmV0dXJuO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHJldHVybjtcbiAgICAgICAgaWYgKHJlcXVlc3RTZXEgIT09IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJUaWNrZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldHMuXCIpO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIHNldEl0ZW1zKFtdKTtcbiAgICAgICAgc2V0VG90YWwoMCk7XG4gICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKHJlcXVlc3RTZXEgPT09IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCkge1xuICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgW2hhc0FjY2Vzcywgb25Gb3JiaWRkZW4sIHBhZ2VTaXplLCByZXN0b3JlTGlzdFNuYXBzaG90XVxuICApO1xuXG4gIGNvbnN0IHJlc2V0TGlzdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCkge1xuICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudC5hYm9ydCgpO1xuICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPSBcIlwiO1xuICAgIH1cbiAgICBzZXRJdGVtcyhbXSk7XG4gICAgc2V0VG90YWwoMCk7XG4gICAgc2V0Q3VycmVudFBhZ2UoMSk7XG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudC5hYm9ydCgpO1xuICAgICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID0gXCJcIjtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBpdGVtcyxcbiAgICB0b3RhbCxcbiAgICBjdXJyZW50UGFnZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGxvYWRMaXN0LFxuICAgIHJlc3RvcmVM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QUVKLGFBQ0U7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUVDLFdBQVcsdUJBQXVCLHFEQUFxRDtBQUFBLFVBQ3ZGLHVCQUFxQixVQUFVO0FBQUEsVUFFL0I7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDO0FBQUEsY0FDQTtBQUFBLGNBQ0EsVUFBVTtBQUFBLGNBQ1Y7QUFBQSxjQUNBLFFBQVEsTUFBTSxpQkFBaUIsTUFBTTtBQUFBLGNBQ3JDLGdCQUFlO0FBQUEsY0FDZjtBQUFBLGNBQ0EsWUFBWTtBQUFBLGNBQ1o7QUFBQTtBQUFBLFVBQ0Y7QUFBQTtBQUFBLFFBZEssR0FBRyxNQUFNLElBQUksS0FBSztBQUFBLE1BZXpCO0FBQUEsSUFFSixDQUFDLEdBQ0gsSUFDRTtBQUFBLElBRUo7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLFFBQ0EsU0FBUztBQUFBLFFBQ1QsY0FBYyxDQUFDLFNBQVM7QUFDdEIsZ0JBQU0sV0FBVyxxQkFBcUI7QUFDdEMsY0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLFlBQVksQ0FBQyxVQUFVLFNBQVM7QUFDN0Q7QUFBQSxVQUNGO0FBRUEsZUFBSyxTQUFTLE1BQU0sUUFBUTtBQUFBLFFBQzlCO0FBQUEsUUFDQSxRQUFRO0FBQUE7QUFBQSxJQUNWO0FBQUEsSUFFQyxtQkFBbUIsQ0FBQyxhQUNuQjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsV0FBVyxLQUFLLDZCQUE2QixrQkFBa0I7QUFBQSxRQUMvRCxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixlQUFlLEtBQUssNkJBQTZCLGtCQUFrQjtBQUFBLFFBQ25FLFdBQVc7QUFBQTtBQUFBLElBQ2IsSUFDRTtBQUFBLEtBQ047QUFFSjtBQUdBLElBQU0scUJBQXFCLE1BQU07QUFDL0IsU0FDRSw2Q0FBQyxnQ0FBcUIseUJBQXVCLE1BQzNDLHVEQUFDLDZCQUEwQixHQUM3QjtBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsMEJBQXdCO0FBQ3hCLFFBQU0sU0FBUyxTQUFTLGVBQWUsc0JBQXNCO0FBQzdELE1BQUksQ0FBQyxPQUFRO0FBQ2IsbUJBQWlCLFFBQVEsNkNBQUMsc0JBQW1CLENBQUU7QUFDakQ7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLDZCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0IiwgImlzTGlua01vZGUiLCAiY2FjaGVkU3RhdGUiLCAicmVzdG9yZWRNYW5hZ2VkVXNlcklkIiwgInJlc3RvcmVkRmlsdGVycyJdCn0K
