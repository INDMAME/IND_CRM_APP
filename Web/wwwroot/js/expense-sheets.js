import {
  ExpenseDateRangeFilter_default,
  ExpenseFilterActions_default,
  buildExpenseListPayload,
  buildExpenseSheetSuggestPayload
} from "./chunks/chunk-R3AKK37F.js";
import {
  FilterButton_default,
  HistorySummary_default
} from "./chunks/chunk-K3YT7KGG.js";
import {
  DEFAULT_EXPENSE_STATUS_FILTER,
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default,
  getExpenseStatusBadgeClassName,
  getExpenseStatusFilterOptions,
  getExpenseStatusLabel,
  normalizeExpenseStatusFilterCode
} from "./chunks/chunk-T6LHHTEC.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-S2MQ33XX.js";
import {
  ExpenseProjectFilterInput_default,
  navigateToExpenseUrl
} from "./chunks/chunk-65QINMTM.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-3H4F5G6V.js";
import {
  RemoteSearchCombobox_default,
  configureExpenseApiAuth,
  fetchExpenseSheetList,
  formatAmountWithCurrency,
  formatExpenseDateParts,
  formatExpenseDisplayDate,
  hasAssignedVoucher,
  mapExpenseSheetListItemToCard,
  safeText,
  startOfDay,
  toIsoDate
} from "./chunks/chunk-BDACNERN.js";
import {
  SelectCombobox_default,
  VisitasPageProviders_default
} from "./chunks/chunk-DY5H5SRS.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  ApiFetchError,
  canAccess,
  indT,
  showPermissionModal
} from "./chunks/chunk-TAYDLPRE.js";
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
var import_react6 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/components/ExpenseSheetFilterInput.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var SEARCH_PAGE_SIZE = 20;
var mapSheetOptions = (items) => {
  return (Array.isArray(items) ? items : []).map((item) => {
    const id = String(item?.HojaGastosId || "").trim();
    if (!id) return null;
    return {
      value: id,
      title: id,
      subtitle: String(item?.Description || "").trim() || "-"
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
  const loadOptions = (0, import_react.useCallback)(async (term, signal) => {
    const payload = buildExpenseSheetSuggestPayload(term, SEARCH_PAGE_SIZE, 1);
    const response = await fetchExpenseSheetList(payload, {
      suppressPermissionModal: true,
      signal
    });
    if (response?.Success === false) {
      return [];
    }
    return mapSheetOptions(response?.Items);
  }, []);
  const loadOptionsPage = (0, import_react.useCallback)(async (term, page, pageSize, signal) => {
    const payload = buildExpenseSheetSuggestPayload(term, pageSize, page);
    const response = await fetchExpenseSheetList(payload, {
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
      items: mapSheetOptions(response?.Items),
      total: Number(response?.Total || 0)
    };
  }, []);
  if (!enableRemoteSuggestions || readOnlyMode) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-2", children: [
      showLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", style: { color: "#00296be0" }, children: label }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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

// Web/wwwroot/react/src/pages/gastos/components/ExpenseStatusFilterSelect.tsx
var import_react2 = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ExpenseStatusFilterSelect = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  showLabel = true
}) => {
  const options = (0, import_react2.useMemo)(() => getExpenseStatusFilterOptions(), []);
  const uiValue = value === DEFAULT_EXPENSE_STATUS_FILTER ? "" : value;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    SelectCombobox_default,
    {
      label,
      placeholder,
      options,
      value: uiValue,
      onChange: (nextValue) => onChange(normalizeExpenseStatusFilterCode(nextValue, DEFAULT_EXPENSE_STATUS_FILTER)),
      readOnly,
      disabled,
      idBase: "expense-status-filter",
      portalClassName: "visitas-typography",
      panelClassName: "visitas-typography",
      allowTextInput: false,
      showLabel
    }
  );
};
var ExpenseStatusFilterSelect_default = ExpenseStatusFilterSelect;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseFiltersPanel.tsx
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
var ExpenseFiltersPanel = ({
  visible,
  showManualDateFilter,
  manualDateAutoOpenKey,
  fromDate,
  toDate,
  projectId,
  hojaGastosId,
  currencyCode,
  statusFilter,
  activeQuickFilter,
  showManualDateError,
  onDateRangeChange,
  onManualRangeComplete,
  onQuickFilterChange,
  onProjectIdChange,
  onHojaGastosIdChange,
  onCurrencyCodeChange,
  onStatusFilterChange,
  onClear,
  onApply
}) => {
  if (!visible) return null;
  const locale = document?.documentElement?.lang || "es-ES";
  const showInlineDateSummary = !showManualDateFilter && !!fromDate && !!toDate;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "filter-card filter-card--expanded p-2 sm:p-2.5 relative", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "history-filter-stack flex flex-col space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-2 gap-2 history-quick-filters", "aria-label": indT("History_Filter_Date", "Date"), children: [
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
    ] }),
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
        ExpenseProjectFilterInput_default,
        {
          label: indT("ExpenseSheets_Filter_Project", "Project"),
          placeholder: indT("ExpenseSheets_Filter_Project", "Project"),
          value: projectId,
          onChange: onProjectIdChange,
          showLabel: false
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        ExpenseStatusFilterSelect_default,
        {
          label: indT("ExpenseSheets_Filter_Status", "Estado"),
          placeholder: indT("ExpenseSheets_Filter_Status_Placeholder", "Estado"),
          value: statusFilter,
          onChange: onStatusFilterChange,
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
var ExpenseFiltersPanel_default = ExpenseFiltersPanel;

// Web/wwwroot/react/src/pages/gastos/list/useExpenseSheetsListData.ts
var import_react3 = __toESM(require_react());
var useExpenseSheetsListData = ({ hasAccess, pageSize, onForbidden }) => {
  const [items, setItems] = (0, import_react3.useState)([]);
  const [total, setTotal] = (0, import_react3.useState)(0);
  const [currentPage, setCurrentPage] = (0, import_react3.useState)(1);
  const [isLoading, setIsLoading] = (0, import_react3.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react3.useState)("");
  const loadList = (0, import_react3.useCallback)(
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
        if (response?.Success === false) {
          setErrorMessage(response.Message || indT("ExpenseSheets_LoadError", "Could not load expense sheets."));
          setItems([]);
          setTotal(0);
          setCurrentPage(page);
          return;
        }
        const nextItems = (Array.isArray(response?.Items) ? response.Items : []).map(
          (item) => mapExpenseSheetListItemToCard(item)
        );
        const nextTotal = Number(response?.Total ?? nextItems.length ?? 0);
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
  const resetList = (0, import_react3.useCallback)(() => {
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
var import_react4 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/list/expenseFilterSnapshot.ts
var normalizeExpenseFilterSnapshot = (value) => {
  const expenseSheetStatusRaw = Number(
    value?.expenseSheetStatus
  );
  const billedModeRaw = Number(value?.billedMode);
  const hasExplicitStatus = Number.isInteger(expenseSheetStatusRaw) && expenseSheetStatusRaw >= 0 && expenseSheetStatusRaw <= 4;
  const legacyStatusFallback = billedModeRaw === 1 ? 4 : billedModeRaw === 0 ? 0 : DEFAULT_EXPENSE_STATUS_FILTER;
  const statusFilter = normalizeExpenseStatusFilterCode(
    hasExplicitStatus ? expenseSheetStatusRaw : value?.statusFilter,
    legacyStatusFallback
  );
  const hojaGastosId = String(value?.hojaGastosId || "").trim();
  return {
    fromDate: String(value?.fromDate || "").trim(),
    toDate: String(value?.toDate || "").trim(),
    projectId: String(value?.projectId || "").trim(),
    hojaGastosId,
    currencyCode: String(value?.currencyCode || "").trim(),
    statusFilter,
    exchangeRateMode: null,
    filter: String(value?.filter || hojaGastosId || "").trim()
  };
};

// Web/wwwroot/react/src/pages/gastos/list/useExpenseSheetsFiltersState.ts
var useExpenseSheetsFiltersState = ({ onApplyFilters, onClearFilters }) => {
  const [fromDate, setFromDate] = (0, import_react4.useState)("");
  const [toDate, setToDate] = (0, import_react4.useState)("");
  const [projectId, setProjectId] = (0, import_react4.useState)("");
  const [hojaGastosId, setHojaGastosId] = (0, import_react4.useState)("");
  const [currencyCode, setCurrencyCode] = (0, import_react4.useState)("");
  const [statusFilter, setStatusFilter] = (0, import_react4.useState)(DEFAULT_EXPENSE_STATUS_FILTER);
  const exchangeRateMode = null;
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
      projectId,
      hojaGastosId,
      currencyCode,
      statusFilter,
      exchangeRateMode,
      filter: hojaGastosId
    }),
    [currencyCode, fromDate, hojaGastosId, projectId, statusFilter, toDate]
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
      projectId,
      hojaGastosId,
      currencyCode,
      statusFilter,
      exchangeRateMode,
      filter: hojaGastosId
    };
    setShowManualDateError(false);
    setAppliedFilters(snapshot);
    setShowManualDateFilter(false);
    setShowFilters(false);
    onApplyFilters(snapshot);
  }, [currencyCode, fromDate, hojaGastosId, onApplyFilters, projectId, statusFilter, toDate]);
  const restoreAppliedFilters = (0, import_react4.useCallback)((snapshot) => {
    const normalized = normalizeExpenseFilterSnapshot(snapshot);
    setFromDate(normalized.fromDate);
    setToDate(normalized.toDate);
    setProjectId(normalized.projectId);
    setHojaGastosId(normalized.hojaGastosId);
    setCurrencyCode(normalized.currencyCode);
    setStatusFilter(normalized.statusFilter);
    setActiveQuickFilter(null);
    setShowManualDateFilter(false);
    setShowManualDateError(false);
    setAppliedFilters(normalized);
    setShowFilters(false);
  }, []);
  const onClear = (0, import_react4.useCallback)(() => {
    setFromDate("");
    setToDate("");
    setProjectId("");
    setHojaGastosId("");
    setCurrencyCode("");
    setStatusFilter(DEFAULT_EXPENSE_STATUS_FILTER);
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
    projectId,
    hojaGastosId,
    currencyCode,
    statusFilter,
    exchangeRateMode,
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
    setStatusFilter,
    onApply,
    onClear,
    restoreAppliedFilters,
    onDateRangeChange,
    onManualRangeComplete,
    onQuickFilterChange,
    toggleFilterPanel
  };
};

// Web/wwwroot/react/src/pages/gastos/list/useExpenseSheetsFilterCache.ts
var import_react5 = __toESM(require_react());
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
  const readCachedState = (0, import_react5.useCallback)(() => {
    const raw = getSessionJsonWithExpiry(EXPENSE_SHEETS_FILTER_KEY);
    return normalizeState(raw);
  }, []);
  const consumeReturnFlag = (0, import_react5.useCallback)(() => {
    const raw = getSessionValueWithExpiry(EXPENSE_SHEETS_RETURN_FLAG_KEY);
    if (raw === "1") {
      removeSessionValueWithExpiry(EXPENSE_SHEETS_RETURN_FLAG_KEY);
      return true;
    }
    return false;
  }, []);
  const saveCachedState = (0, import_react5.useCallback)((state) => {
    const normalized = normalizeState(state);
    if (!normalized) return;
    setSessionJsonWithExpiry(EXPENSE_SHEETS_FILTER_KEY, normalized, EXPENSE_SHEETS_CACHE_TTL_MS);
    setSessionValueWithExpiry(EXPENSE_SHEETS_RETURN_FLAG_KEY, "1", EXPENSE_SHEETS_CACHE_TTL_MS);
  }, []);
  const clearCachedState = (0, import_react5.useCallback)(() => {
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
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var PAGE_SIZE = 6;
var bootstrapExpenseApiAuth = () => {
  configureExpenseApiAuth({
    token: safeText(window.__IND_API_TOKEN__),
    entraOid: safeText(window.__IND_ENTRA_OID__),
    appCode: safeText(window.__IND_APP_CODE__)
  });
};
var ExpenseSheetsPageContent = () => {
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const canCreateExpense = canAccess("GASTOS_HOJA_GASTO", "Add");
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
  const { items, total, currentPage, isLoading, errorMessage, loadList, resetList } = useExpenseSheetsListData({
    hasAccess,
    pageSize: PAGE_SIZE,
    onForbidden: showPermissionModal
  });
  const { readCachedState, consumeReturnFlag, saveCachedState, clearCachedState } = useExpenseSheetsFilterCache();
  const didRestoreOnMountRef = import_react6.default.useRef(false);
  const pendingScrollRestoreRef = import_react6.default.useRef(null);
  const {
    fromDate,
    toDate,
    projectId,
    hojaGastosId,
    currencyCode,
    statusFilter,
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
    setStatusFilter,
    onApply,
    onClear,
    restoreAppliedFilters,
    onDateRangeChange,
    onManualRangeComplete,
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
  const goToDetail = (0, import_react6.useCallback)(
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
  const handleOpenCreateSheetMode = (0, import_react6.useCallback)(() => {
    if (!canCreateExpense) {
      showPermissionModal();
      return;
    }
    navigateToExpenseUrl("/Gastos/ExpenseSheetDetail?mode=create", {
      bypassGuardOnce: false
    });
  }, [canCreateExpense]);
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
    if (!appliedFilters) {
      return [];
    }
    const summary = [];
    const locale = document?.documentElement?.lang || "es-ES";
    const fromDateText = formatExpenseDisplayDate(appliedFilters.fromDate, locale, "");
    const toDateText = formatExpenseDisplayDate(appliedFilters.toDate, locale, "");
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
    if (appliedFilters.projectId.trim()) {
      summary.push({
        key: "project",
        label: indT("ExpenseSheets_Filter_Project", "Project"),
        value: appliedFilters.projectId.trim()
      });
    }
    if (appliedFilters.hojaGastosId.trim()) {
      summary.push({
        key: "sheet",
        label: indT("ExpenseSheets_Filter_Sheet", "Expense sheet"),
        value: appliedFilters.hojaGastosId.trim()
      });
    }
    if (appliedFilters.currencyCode.trim()) {
      summary.push({
        key: "currency",
        label: indT("ExpenseSheets_Filter_Currency", "Currency"),
        value: appliedFilters.currencyCode.trim()
      });
    }
    summary.push({
      key: "status",
      label: indT("ExpenseSheets_Filter_Status", "Estado"),
      value: getExpenseStatusLabel(appliedFilters.statusFilter)
    });
    return summary;
  }, [appliedFilters]);
  const showSummary = !showFilters && summaryItems.length > 0;
  (0, import_react6.useEffect)(() => {
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
  (0, import_react6.useEffect)(() => {
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
  (0, import_react6.useEffect)(() => {
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
        statusFilter,
        activeQuickFilter,
        onDateRangeChange,
        onManualRangeComplete,
        onQuickFilterChange,
        onProjectIdChange: setProjectId,
        onHojaGastosIdChange: setHojaGastosId,
        onCurrencyCodeChange: setCurrencyCode,
        onStatusFilterChange: setStatusFilter,
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
      const id = safeText(item.hojaGastosId);
      const dateParts = formatExpenseDateParts(item.createdDate, document?.documentElement?.lang || "es-ES");
      const currency = safeText(item.currencyCode);
      const description = safeText(item.description);
      const voucher = safeText(item.voucher);
      const totalAmountText = formatAmountWithCurrency(item.totalAmount ?? null, currency);
      const fallbackStatusCode = hasAssignedVoucher(voucher) ? 4 : 0;
      const statusCode = normalizeExpenseStatusFilterCode(item.expenseSheetStatus, fallbackStatusCode);
      const statusLabel = getExpenseStatusLabel(statusCode);
      const statusClass = getExpenseStatusBadgeClassName(statusCode);
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "timeline-item", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
    canCreateExpense ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(VisitasPageProviders_default, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExpenseSheetsPageContent, {}) });
};
var mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-sheets-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExpenseSheetsPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseSheetsPage_default = ExpenseSheetsPage;
export {
  ExpenseSheetsPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saXN0L0V4cGVuc2VTaGVldHNQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0RmlsdGVySW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0LnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZUZpbHRlcnNQYW5lbC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saXN0L3VzZUV4cGVuc2VTaGVldHNMaXN0RGF0YS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpc3QvdXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpc3QvZXhwZW5zZUZpbHRlclNuYXBzaG90LnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGlzdC91c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcbmltcG9ydCBDb21wYWN0UGFnaW5hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeFwiO1xuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHtcbiAgZ2V0RXhwZW5zZVN0YXR1c0JhZGdlQ2xhc3NOYW1lLFxuICBnZXRFeHBlbnNlU3RhdHVzTGFiZWwsXG4gIG5vcm1hbGl6ZUV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgRXhwZW5zZUZpbHRlcnNQYW5lbCBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlRmlsdGVyc1BhbmVsLnRzeFwiO1xuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzLCBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIGhhc0Fzc2lnbmVkVm91Y2hlciwgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldHNMaXN0RGF0YSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldHNMaXN0RGF0YS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldHNGaWx0ZXJzU3RhdGUudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZS50c1wiO1xuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5cbmNvbnN0IFBBR0VfU0laRSA9IDY7XG5cbi8vIEluaXRpYWxpemVzIGF1dGggc2VlZCBmb3IgZXhwZW5zZSBBUEkgY2FsbHMgYmVmb3JlIGlzbGFuZCBlZmZlY3RzIHJ1bi5cbmNvbnN0IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoID0gKCkgPT4ge1xuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCh7XG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXG4gICAgYXBwQ29kZTogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxuICB9KTtcbn07XG5cbmNvbnN0IEV4cGVuc2VTaGVldHNQYWdlQ29udGVudCA9ICgpID0+IHtcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJWaWV3XCIpO1xuICBjb25zdCBjYW5DcmVhdGVFeHBlbnNlID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJBZGRcIik7XG4gIGNvbnN0IHRpbWVsaW5lQ29udGFpbmVyUmVmID0gUmVhY3QudXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxuICAgIH0pLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgeyBpdGVtcywgdG90YWwsIGN1cnJlbnRQYWdlLCBpc0xvYWRpbmcsIGVycm9yTWVzc2FnZSwgbG9hZExpc3QsIHJlc2V0TGlzdCB9ID0gdXNlRXhwZW5zZVNoZWV0c0xpc3REYXRhKHtcbiAgICBoYXNBY2Nlc3MsXG4gICAgcGFnZVNpemU6IFBBR0VfU0laRSxcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcbiAgfSk7XG5cbiAgY29uc3QgeyByZWFkQ2FjaGVkU3RhdGUsIGNvbnN1bWVSZXR1cm5GbGFnLCBzYXZlQ2FjaGVkU3RhdGUsIGNsZWFyQ2FjaGVkU3RhdGUgfSA9IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSgpO1xuICBjb25zdCBkaWRSZXN0b3JlT25Nb3VudFJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmID0gUmVhY3QudXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IHtcbiAgICBmcm9tRGF0ZSxcbiAgICB0b0RhdGUsXG4gICAgcHJvamVjdElkLFxuICAgIGhvamFHYXN0b3NJZCxcbiAgICBjdXJyZW5jeUNvZGUsXG4gICAgc3RhdHVzRmlsdGVyLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxuICAgIGFwcGxpZWRGaWx0ZXJzLFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIGN1cnJlbnRGaWx0ZXJzLFxuICAgIHNldFByb2plY3RJZCxcbiAgICBzZXRIb2phR2FzdG9zSWQsXG4gICAgc2V0Q3VycmVuY3lDb2RlLFxuICAgIHNldFN0YXR1c0ZpbHRlcixcbiAgICBvbkFwcGx5LFxuICAgIG9uQ2xlYXIsXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlLFxuICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcbiAgICBvblF1aWNrRmlsdGVyQ2hhbmdlLFxuICAgIHRvZ2dsZUZpbHRlclBhbmVsLFxuICB9ID0gdXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZSh7XG4gICAgb25BcHBseUZpbHRlcnM6IChzbmFwc2hvdCkgPT4ge1xuICAgICAgdm9pZCBsb2FkTGlzdCgxLCBzbmFwc2hvdCk7XG4gICAgfSxcbiAgICBvbkNsZWFyRmlsdGVyczogKCkgPT4ge1xuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuICAgICAgcmVzZXRMaXN0KCk7XG4gICAgfSxcbiAgfSk7XG5cbiAgY29uc3QgZ29Ub0RldGFpbCA9IHVzZUNhbGxiYWNrKFxuICAgIChzaGVldElkOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmICghc2hlZXRJZCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBzbmFwc2hvdCA9IGFwcGxpZWRGaWx0ZXJzIHx8IGN1cnJlbnRGaWx0ZXJzO1xuICAgICAgc2F2ZUNhY2hlZFN0YXRlKHtcbiAgICAgICAgZmlsdGVyczogc25hcHNob3QsXG4gICAgICAgIHBhZ2U6IGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSxcbiAgICAgICAgc2Nyb2xsWTogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5zY3JvbGxZIHx8IDAgOiAwLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGlkID0gZW5jb2RlVVJJQ29tcG9uZW50KHNoZWV0SWQpO1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP2hvamFHYXN0b3NJZD0ke2lkfWAsIHtcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW2FwcGxpZWRGaWx0ZXJzLCBjdXJyZW50RmlsdGVycywgY3VycmVudFBhZ2UsIHNhdmVDYWNoZWRTdGF0ZV1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlU2hlZXRNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/bW9kZT1jcmVhdGVcIiwge1xuICAgICAgYnlwYXNzR3VhcmRPbmNlOiBmYWxzZSxcbiAgICB9KTtcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2VdKTtcblxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcbiAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xuICAgIGlmICghdGltZWxpbmVDb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjYXJkO1xuICB9LCBbXSk7XG5cbiAgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyh7XG4gICAgY29udGFpbmVyUmVmOiB0aW1lbGluZUNvbnRhaW5lclJlZixcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgaXRlbXMsXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXG4gIH0pO1xuXG4gIGNvbnN0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwoKHRvdGFsIHx8IDApIC8gUEFHRV9TSVpFKTtcblxuICBjb25zdCBzdW1tYXJ5SXRlbXMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoIWFwcGxpZWRGaWx0ZXJzKSB7XG4gICAgICByZXR1cm4gW10gYXMgQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9PjtcbiAgICB9XG5cbiAgICBjb25zdCBzdW1tYXJ5OiBBcnJheTx7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0+ID0gW107XG4gICAgY29uc3QgbG9jYWxlID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCI7XG4gICAgY29uc3QgZnJvbURhdGVUZXh0ID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGFwcGxpZWRGaWx0ZXJzLmZyb21EYXRlLCBsb2NhbGUsIFwiXCIpO1xuICAgIGNvbnN0IHRvRGF0ZVRleHQgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoYXBwbGllZEZpbHRlcnMudG9EYXRlLCBsb2NhbGUsIFwiXCIpO1xuXG4gICAgaWYgKGZyb21EYXRlVGV4dCB8fCB0b0RhdGVUZXh0KSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwiZnJvbURhdGVcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpLFxuICAgICAgICB2YWx1ZTogZnJvbURhdGVUZXh0IHx8IFwiLS1cIixcbiAgICAgIH0pO1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcInRvRGF0ZVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKSxcbiAgICAgICAgdmFsdWU6IHRvRGF0ZVRleHQgfHwgXCItLVwiLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGFwcGxpZWRGaWx0ZXJzLnByb2plY3RJZC50cmltKCkpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJwcm9qZWN0XCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfUHJvamVjdFwiLCBcIlByb2plY3RcIiksXG4gICAgICAgIHZhbHVlOiBhcHBsaWVkRmlsdGVycy5wcm9qZWN0SWQudHJpbSgpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChhcHBsaWVkRmlsdGVycy5ob2phR2FzdG9zSWQudHJpbSgpKSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwic2hlZXRcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TaGVldFwiLCBcIkV4cGVuc2Ugc2hlZXRcIiksXG4gICAgICAgIHZhbHVlOiBhcHBsaWVkRmlsdGVycy5ob2phR2FzdG9zSWQudHJpbSgpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChhcHBsaWVkRmlsdGVycy5jdXJyZW5jeUNvZGUudHJpbSgpKSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwiY3VycmVuY3lcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpLFxuICAgICAgICB2YWx1ZTogYXBwbGllZEZpbHRlcnMuY3VycmVuY3lDb2RlLnRyaW0oKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAga2V5OiBcInN0YXR1c1wiLFxuICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNcIiwgXCJFc3RhZG9cIiksXG4gICAgICB2YWx1ZTogZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGFwcGxpZWRGaWx0ZXJzLnN0YXR1c0ZpbHRlciksXG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3VtbWFyeTtcbiAgfSwgW2FwcGxpZWRGaWx0ZXJzXSk7XG5cbiAgY29uc3Qgc2hvd1N1bW1hcnkgPSAhc2hvd0ZpbHRlcnMgJiYgc3VtbWFyeUl0ZW1zLmxlbmd0aCA+IDA7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoZGlkUmVzdG9yZU9uTW91bnRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQgPSB0cnVlO1xuXG4gICAgaWYgKCFjb25zdW1lUmV0dXJuRmxhZygpKSByZXR1cm47XG5cbiAgICBjb25zdCBjYWNoZWRTdGF0ZSA9IHJlYWRDYWNoZWRTdGF0ZSgpO1xuICAgIGlmICghY2FjaGVkU3RhdGUpIHtcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMoY2FjaGVkU3RhdGUuZmlsdGVycyk7XG4gICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLnNjcm9sbFk7XG4gICAgdm9pZCBsb2FkTGlzdChjYWNoZWRTdGF0ZS5wYWdlLCBjYWNoZWRTdGF0ZS5maWx0ZXJzKTtcbiAgfSwgW2NsZWFyQ2FjaGVkU3RhdGUsIGNvbnN1bWVSZXR1cm5GbGFnLCBsb2FkTGlzdCwgcmVhZENhY2hlZFN0YXRlLCByZXN0b3JlQXBwbGllZEZpbHRlcnNdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0xvYWRpbmcpIHJldHVybjtcbiAgICBjb25zdCBwZW5kaW5nU2Nyb2xsWSA9IHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQ7XG4gICAgaWYgKHBlbmRpbmdTY3JvbGxZID09IG51bGwpIHJldHVybjtcblxuICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgdG9wOiBNYXRoLm1heCgwLCBwZW5kaW5nU2Nyb2xsWSksXG4gICAgICAgIGJlaGF2aW9yOiBcImF1dG9cIixcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LCBbY3VycmVudFBhZ2UsIGlzTG9hZGluZywgaXRlbXMubGVuZ3RoXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvblRvZ2dsZUZpbHRlcnMgPSAoKSA9PiB7XG4gICAgICB0b2dnbGVGaWx0ZXJQYW5lbCgpO1xuICAgIH07XG5cbiAgICBjb25zdCBvblJlZnJlc2ggPSAoKSA9PiB7XG4gICAgICBpZiAoIWFwcGxpZWRGaWx0ZXJzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdm9pZCBsb2FkTGlzdChjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsIGFwcGxpZWRGaWx0ZXJzKTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXNoZWV0cy10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXNoZWV0cy1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXNoZWV0cy10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImV4cGVuc2Utc2hlZXRzLXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcbiAgICB9O1xuICB9LCBbYXBwbGllZEZpbHRlcnMsIGN1cnJlbnRQYWdlLCBsb2FkTGlzdCwgdG9nZ2xlRmlsdGVyUGFuZWxdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICB7c2hvd1N1bW1hcnkgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLXN1bW1hcnkgcC0zIHNtOnAtNCBtdC0xIG1iLTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4cGVuc2Utc3VtbWFyeS1ncmlkIGdyaWQgZ3JpZC1jb2xzLTEgbWluLVszNjBweF06Z3JpZC1jb2xzLTIgaXRlbXMtc3RhcnQgZ2FwLXgtNCBnYXAteS0xIHRleHQteHNcIj5cbiAgICAgICAgICAgIHtzdW1tYXJ5SXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXtgJHtpdGVtLmtleX0tJHtpdGVtLnZhbHVlfS0ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeSBoaXN0b3J5LWZpbHRlci1zdW1tYXJ5LS1ncmlkLWl0ZW0gbGVhZGluZy01IG1pbi13LTBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeV9fbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpdGVtLmxhYmVsfTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeV9fdmFsdWUgYnJlYWstd29yZHNcIj57aXRlbS52YWx1ZX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxFeHBlbnNlRmlsdGVyc1BhbmVsXG4gICAgICAgIHZpc2libGU9e3Nob3dGaWx0ZXJzfVxuICAgICAgICBzaG93TWFudWFsRGF0ZUZpbHRlcj17c2hvd01hbnVhbERhdGVGaWx0ZXJ9XG4gICAgICAgIHNob3dNYW51YWxEYXRlRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3J9XG4gICAgICAgIG1hbnVhbERhdGVBdXRvT3BlbktleT17bWFudWFsRGF0ZUF1dG9PcGVuS2V5fVxuICAgICAgICBmcm9tRGF0ZT17ZnJvbURhdGV9XG4gICAgICAgIHRvRGF0ZT17dG9EYXRlfVxuICAgICAgICBwcm9qZWN0SWQ9e3Byb2plY3RJZH1cbiAgICAgICAgaG9qYUdhc3Rvc0lkPXtob2phR2FzdG9zSWR9XG4gICAgICAgIGN1cnJlbmN5Q29kZT17Y3VycmVuY3lDb2RlfVxuICAgICAgICBzdGF0dXNGaWx0ZXI9e3N0YXR1c0ZpbHRlcn1cbiAgICAgICAgYWN0aXZlUXVpY2tGaWx0ZXI9e2FjdGl2ZVF1aWNrRmlsdGVyfVxuICAgICAgICBvbkRhdGVSYW5nZUNoYW5nZT17b25EYXRlUmFuZ2VDaGFuZ2V9XG4gICAgICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZT17b25NYW51YWxSYW5nZUNvbXBsZXRlfVxuICAgICAgICBvblF1aWNrRmlsdGVyQ2hhbmdlPXtvblF1aWNrRmlsdGVyQ2hhbmdlfVxuICAgICAgICBvblByb2plY3RJZENoYW5nZT17c2V0UHJvamVjdElkfVxuICAgICAgICBvbkhvamFHYXN0b3NJZENoYW5nZT17c2V0SG9qYUdhc3Rvc0lkfVxuICAgICAgICBvbkN1cnJlbmN5Q29kZUNoYW5nZT17c2V0Q3VycmVuY3lDb2RlfVxuICAgICAgICBvblN0YXR1c0ZpbHRlckNoYW5nZT17c2V0U3RhdHVzRmlsdGVyfVxuICAgICAgICBvbkNsZWFyPXtvbkNsZWFyfVxuICAgICAgICBvbkFwcGx5PXtvbkFwcGx5fVxuICAgICAgLz5cblxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBpc0xvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XG4gICAgICA+XG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7ZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntlcnJvck1lc3NhZ2V9PC9kaXY+IDogbnVsbH1cblxuICAgICAgeyFpc0xvYWRpbmcgJiYgIWVycm9yTWVzc2FnZSAmJiBpdGVtcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtYm94IHRpbWVsaW5lLWVtcHR5XCIgZGF0YS1lbXB0eS10ZXh0PXtpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIil9IC8+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgeyFlcnJvck1lc3NhZ2UgJiYgaXRlbXMubGVuZ3RoID4gMCA/IChcbiAgICAgICAgPGRpdiByZWY9e3RpbWVsaW5lQ29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cbiAgICAgICAgICB7aXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaWQgPSBzYWZlVGV4dChpdGVtLmhvamFHYXN0b3NJZCk7XG4gICAgICAgICAgICBjb25zdCBkYXRlUGFydHMgPSBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzKGl0ZW0uY3JlYXRlZERhdGUsIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbmN5ID0gc2FmZVRleHQoaXRlbS5jdXJyZW5jeUNvZGUpO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBzYWZlVGV4dChpdGVtLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0IHZvdWNoZXIgPSBzYWZlVGV4dChpdGVtLnZvdWNoZXIpO1xuICAgICAgICAgICAgY29uc3QgdG90YWxBbW91bnRUZXh0ID0gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGl0ZW0udG90YWxBbW91bnQgPz8gbnVsbCwgY3VycmVuY3kpO1xuICAgICAgICAgICAgY29uc3QgZmFsbGJhY2tTdGF0dXNDb2RlID0gaGFzQXNzaWduZWRWb3VjaGVyKHZvdWNoZXIpID8gNCA6IDA7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNDb2RlID0gbm9ybWFsaXplRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUoaXRlbS5leHBlbnNlU2hlZXRTdGF0dXMsIGZhbGxiYWNrU3RhdHVzQ29kZSk7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNMYWJlbCA9IGdldEV4cGVuc2VTdGF0dXNMYWJlbChzdGF0dXNDb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1c0NsYXNzID0gZ2V0RXhwZW5zZVN0YXR1c0JhZGdlQ2xhc3NOYW1lKHN0YXR1c0NvZGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17YCR7aWR9LSR7aW5kZXh9YH0gY2xhc3NOYW1lPVwidGltZWxpbmUtaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxFeHBlbnNlVGltZWxpbmVDYXJkXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtkZXNjcmlwdGlvbiB8fCBcIi1cIn1cbiAgICAgICAgICAgICAgICAgIGFtb3VudFRleHQ9e3RvdGFsQW1vdW50VGV4dH1cbiAgICAgICAgICAgICAgICAgIG9uT3Blbj17KCkgPT4gZ29Ub0RldGFpbChpZCl9XG4gICAgICAgICAgICAgICAgICB0aXRsZUNsYXNzTmFtZT1cImV4cGVuc2Utc2hlZXQtY2FyZF9fdGl0bGUgdGltZWxpbmUtbmFtZVwiXG4gICAgICAgICAgICAgICAgICBzdGF0dXNDbGFzc05hbWU9e3N0YXR1c0NsYXNzfVxuICAgICAgICAgICAgICAgICAgc3RhdHVzTGFiZWw9e3N0YXR1c0xhYmVsfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXG4gICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsUGFnZXN9XG4gICAgICAgIGN1cnJlbnRQYWdlPXtjdXJyZW50UGFnZX1cbiAgICAgICAgb25QYWdlQ2hhbmdlPXsocGFnZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnMgfHwgY3VycmVudEZpbHRlcnM7XG4gICAgICAgICAgdm9pZCBsb2FkTGlzdChwYWdlLCBzbmFwc2hvdCk7XG4gICAgICAgIH19XG4gICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cbiAgICAgIC8+XG5cbiAgICAgIHtjYW5DcmVhdGVFeHBlbnNlID8gKFxuICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b25cbiAgICAgICAgICByb3V0ZT1cIlwiXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiQ29tbW9uX0NyZWF0ZVwiLCBcIkNyZWF0ZVwiKX1cbiAgICAgICAgICBzaXplPXs3Nn1cbiAgICAgICAgICByaWdodD17MTZ9XG4gICAgICAgICAgYm90dG9tPXsyNH1cbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVPcGVuQ3JlYXRlU2hlZXRNb2RlfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2Ugc2hlZXRzIGxpc3QuXG5jb25zdCBFeHBlbnNlU2hlZXRzUGFnZSA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnM+XG4gICAgICA8RXhwZW5zZVNoZWV0c1BhZ2VDb250ZW50IC8+XG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgKTtcbn07XG5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2Utc2hlZXRzLXJvb3RcIik7XG4gIGlmICghcm9vdEVsKSByZXR1cm47XG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVNoZWV0c1BhZ2UgLz4pO1xufTtcblxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldHNQYWdlO1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlbW90ZVNlYXJjaENvbWJvYm94LCB7IHR5cGUgUmVtb3RlU2VhcmNoT3B0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9SZW1vdGVTZWFyY2hDb21ib2JveC50c3hcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGJ1aWxkRXhwZW5zZVNoZWV0U3VnZ2VzdFBheWxvYWQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVBheWxvYWRCdWlsZGVycy50c1wiO1xuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRMaXN0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcblxudHlwZSBFeHBlbnNlU2hlZXRGaWx0ZXJJbnB1dFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zPzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG59O1xuXG5jb25zdCBTRUFSQ0hfUEFHRV9TSVpFID0gMjA7XG5cbmNvbnN0IG1hcFNoZWV0T3B0aW9ucyA9IChpdGVtczogRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG9bXSB8IHVuZGVmaW5lZCk6IFJlbW90ZVNlYXJjaE9wdGlvbltdID0+IHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW10pXG4gICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgaWQgPSBTdHJpbmcoaXRlbT8uSG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGlmICghaWQpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IGlkLFxuICAgICAgICB0aXRsZTogaWQsXG4gICAgICAgIHN1YnRpdGxlOiBTdHJpbmcoaXRlbT8uRGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpIHx8IFwiLVwiLFxuICAgICAgfSBhcyBSZW1vdGVTZWFyY2hPcHRpb247XG4gICAgfSlcbiAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFJlbW90ZVNlYXJjaE9wdGlvbltdO1xufTtcblxuLy8gRXhwZW5zZSBzaGVldCBmaWx0ZXIgaW5wdXQgd2l0aCByZW1vdGUgbGlzdCBzdWdnZXN0aW9ucy5cbmNvbnN0IEV4cGVuc2VTaGVldEZpbHRlcklucHV0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zID0gdHJ1ZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbn06IEV4cGVuc2VTaGVldEZpbHRlcklucHV0UHJvcHMpID0+IHtcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XG5cbiAgY29uc3QgbG9hZE9wdGlvbnMgPSB1c2VDYWxsYmFjayhhc3luYyAodGVybTogc3RyaW5nLCBzaWduYWw6IEFib3J0U2lnbmFsKTogUHJvbWlzZTxSZW1vdGVTZWFyY2hPcHRpb25bXT4gPT4ge1xuICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZEV4cGVuc2VTaGVldFN1Z2dlc3RQYXlsb2FkKHRlcm0sIFNFQVJDSF9QQUdFX1NJWkUsIDEpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRMaXN0KHBheWxvYWQsIHtcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgc2lnbmFsLFxuICAgIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHJldHVybiBtYXBTaGVldE9wdGlvbnMocmVzcG9uc2U/Lkl0ZW1zKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGxvYWRPcHRpb25zUGFnZSA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlciwgc2lnbmFsOiBBYm9ydFNpZ25hbCkgPT4ge1xuICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZEV4cGVuc2VTaGVldFN1Z2dlc3RQYXlsb2FkKHRlcm0sIHBhZ2VTaXplLCBwYWdlKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0TGlzdChwYXlsb2FkLCB7XG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgIHNpZ25hbCxcbiAgICB9KTtcblxuICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgdG90YWw6IDAsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogbWFwU2hlZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyksXG4gICAgICB0b3RhbDogTnVtYmVyKHJlc3BvbnNlPy5Ub3RhbCB8fCAwKSxcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgaWYgKCFlbmFibGVSZW1vdGVTdWdnZXN0aW9ucyB8fCByZWFkT25seU1vZGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAge3Nob3dMYWJlbCA/IChcbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgc3R5bGU9e3sgY29sb3I6IFwiIzAwMjk2YmUwXCIgfX0+XG4gICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHB4LTMgcHktMiB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgdGV4dC1zbGF0ZS05MDAgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxuICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8UmVtb3RlU2VhcmNoQ29tYm9ib3hcbiAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgIG9uU2VhcmNoPXthc3luYyAodGVybSwgc2lnbmFsKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGxvYWRPcHRpb25zKHRlcm0sIHNpZ25hbCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICAgIG9uU2VhcmNoUGFnZT17YXN5bmMgKHRlcm0sIHBhZ2UsIHBhZ2VTaXplLCBzaWduYWwpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbG9hZE9wdGlvbnNQYWdlKHRlcm0sIHBhZ2UsIHBhZ2VTaXplLCBzaWduYWwpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGl0ZW1zOiBbXSwgdG90YWw6IDAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH19XG4gICAgICBpZEJhc2U9XCJleHBlbnNlLXNoZWV0LWZpbHRlclwiXG4gICAgICBtaW5TZWFyY2hMZW5ndGg9ezB9XG4gICAgICBwYWdlU2l6ZT17U0VBUkNIX1BBR0VfU0laRX1cbiAgICAgIGFsbG93RW1wdHlTZWFyY2hcbiAgICAgIGxvYWRPbk9wZW5cbiAgICAgIGluZmluaXRlU2Nyb2xsXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0RmlsdGVySW5wdXQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIsIGdldEV4cGVuc2VTdGF0dXNGaWx0ZXJPcHRpb25zLCBub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVN0YXR1c0NhdGFsb2cudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcblxudHlwZSBFeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZTtcbiAgb25DaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUpID0+IHZvaWQ7XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xufTtcblxuLy8gU2hhcmVkIGZpeGVkIHN0YXR1cyBmaWx0ZXIgc2VsZWN0IHVzaW5nIHRoZSBjYW5vbmljYWwgc3RhdHVzIGNhdGFsb2cuXG5jb25zdCBFeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG59OiBFeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0UHJvcHMpID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiBnZXRFeHBlbnNlU3RhdHVzRmlsdGVyT3B0aW9ucygpLCBbXSk7XG4gIGNvbnN0IHVpVmFsdWUgPSB2YWx1ZSA9PT0gREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIgPyBcIlwiIDogdmFsdWU7XG5cbiAgcmV0dXJuIChcbiAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICB2YWx1ZT17dWlWYWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiBvbkNoYW5nZShub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZShuZXh0VmFsdWUsIERFRkFVTFRfRVhQRU5TRV9TVEFUVVNfRklMVEVSKSl9XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICBpZEJhc2U9XCJleHBlbnNlLXN0YXR1cy1maWx0ZXJcIlxuICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBGaWx0ZXJCdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GaWx0ZXJCdXR0b24udHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXIgZnJvbSBcIi4vRXhwZW5zZURhdGVSYW5nZUZpbHRlci50c3hcIjtcbmltcG9ydCBFeHBlbnNlRmlsdGVyQWN0aW9ucyBmcm9tIFwiLi9FeHBlbnNlRmlsdGVyQWN0aW9ucy50c3hcIjtcbmltcG9ydCBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0IGZyb20gXCIuL0V4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVNoZWV0RmlsdGVySW5wdXQgZnJvbSBcIi4vRXhwZW5zZVNoZWV0RmlsdGVySW5wdXQudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVN0YXR1c0ZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0LnRzeFwiO1xuaW1wb3J0IEhpc3RvcnlTdW1tYXJ5IGZyb20gXCIuLi8uLi92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5U3VtbWFyeS50c3hcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVF1aWNrRmlsdGVySWQgfSBmcm9tIFwiLi4vbGlzdC9leHBlbnNlTGlzdFR5cGVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuXG5leHBvcnQgdHlwZSB7IEV4cGVuc2VRdWlja0ZpbHRlcklkIH07XG5cbmNvbnN0IHBhcnNlSXNvRGF0ZSA9IChyYXc6IHN0cmluZyk6IERhdGUgfCBudWxsID0+IHtcbiAgaWYgKCFyYXcpIHJldHVybiBudWxsO1xuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcpLnRyaW0oKS5zcGxpdChcIlRcIilbMF07XG4gIGlmICghL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QodmFsdWUpKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gdmFsdWUuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xuICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xufTtcblxuY29uc3QgZm9ybWF0RGF0ZSA9IChyYXc6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBkYXRlID0gcGFyc2VJc29EYXRlKHJhdyk7XG4gIGlmICghZGF0ZSkgcmV0dXJuIFwiLS1cIjtcbiAgcmV0dXJuIGRhdGVcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwge1xuICAgICAgZGF5OiBcIm51bWVyaWNcIixcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICB9KVxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcbiAgICAudG9Mb3dlckNhc2UoKTtcbn07XG5cbnR5cGUgRXhwZW5zZUZpbHRlcnNQYW5lbFByb3BzID0ge1xuICB2aXNpYmxlOiBib29sZWFuO1xuICBzaG93TWFudWFsRGF0ZUZpbHRlcjogYm9vbGVhbjtcbiAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5OiBudW1iZXI7XG4gIGZyb21EYXRlOiBzdHJpbmc7XG4gIHRvRGF0ZTogc3RyaW5nO1xuICBwcm9qZWN0SWQ6IHN0cmluZztcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmc7XG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBzdGF0dXNGaWx0ZXI6IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlO1xuICBhY3RpdmVRdWlja0ZpbHRlcjogRXhwZW5zZVF1aWNrRmlsdGVySWQgfCBudWxsO1xuICBzaG93TWFudWFsRGF0ZUVycm9yOiBib29sZWFuO1xuICBvbkRhdGVSYW5nZUNoYW5nZTogKGZyb21EYXRlOiBzdHJpbmcsIHRvRGF0ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbk1hbnVhbFJhbmdlQ29tcGxldGU6IChmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25RdWlja0ZpbHRlckNoYW5nZTogKGZpbHRlcklkOiBFeHBlbnNlUXVpY2tGaWx0ZXJJZCkgPT4gdm9pZDtcbiAgb25Qcm9qZWN0SWRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkhvamFHYXN0b3NJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uQ3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25TdGF0dXNGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUpID0+IHZvaWQ7XG4gIG9uQ2xlYXI6ICgpID0+IHZvaWQ7XG4gIG9uQXBwbHk6ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBTaGFyZWQgZXhwZW5zZSBzaGVldCBmaWx0ZXIgcGFuZWwgY29tcG9zZWQgZnJvbSByZXVzYWJsZSBtb2R1bGUgY29tcG9uZW50cy5cbmNvbnN0IEV4cGVuc2VGaWx0ZXJzUGFuZWwgPSAoe1xuICB2aXNpYmxlLFxuICBzaG93TWFudWFsRGF0ZUZpbHRlcixcbiAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxuICBmcm9tRGF0ZSxcbiAgdG9EYXRlLFxuICBwcm9qZWN0SWQsXG4gIGhvamFHYXN0b3NJZCxcbiAgY3VycmVuY3lDb2RlLFxuICBzdGF0dXNGaWx0ZXIsXG4gIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICBzaG93TWFudWFsRGF0ZUVycm9yLFxuICBvbkRhdGVSYW5nZUNoYW5nZSxcbiAgb25NYW51YWxSYW5nZUNvbXBsZXRlLFxuICBvblF1aWNrRmlsdGVyQ2hhbmdlLFxuICBvblByb2plY3RJZENoYW5nZSxcbiAgb25Ib2phR2FzdG9zSWRDaGFuZ2UsXG4gIG9uQ3VycmVuY3lDb2RlQ2hhbmdlLFxuICBvblN0YXR1c0ZpbHRlckNoYW5nZSxcbiAgb25DbGVhcixcbiAgb25BcHBseSxcbn06IEV4cGVuc2VGaWx0ZXJzUGFuZWxQcm9wcykgPT4ge1xuICBpZiAoIXZpc2libGUpIHJldHVybiBudWxsO1xuICBjb25zdCBsb2NhbGUgPSBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIjtcbiAgY29uc3Qgc2hvd0lubGluZURhdGVTdW1tYXJ5ID0gIXNob3dNYW51YWxEYXRlRmlsdGVyICYmICEhZnJvbURhdGUgJiYgISF0b0RhdGU7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1leHBhbmRlZCBwLTIgc206cC0yLjUgcmVsYXRpdmVcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3RhY2sgZmxleCBmbGV4LWNvbCBzcGFjZS15LTJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yIGhpc3RvcnktcXVpY2stZmlsdGVyc1wiIGFyaWEtbGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9EYXRlXCIsIFwiRGF0ZVwiKX0+XG4gICAgICAgICAgPEZpbHRlckJ1dHRvblxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJIaXN0b3J5X1F1aWNrX0N1c3RvbVwiLCBcIkRhdGVcIil9XG4gICAgICAgICAgICBhY3RpdmU9e2FjdGl2ZVF1aWNrRmlsdGVyID09PSBcImN1c3RvbVwifVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uUXVpY2tGaWx0ZXJDaGFuZ2UoXCJjdXN0b21cIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8RmlsdGVyQnV0dG9uXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkhpc3RvcnlfUXVpY2tfN0RheXNcIiwgXCI3IGRheXNcIil9XG4gICAgICAgICAgICBhY3RpdmU9e2FjdGl2ZVF1aWNrRmlsdGVyID09PSBcImRheXMtN1wifVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uUXVpY2tGaWx0ZXJDaGFuZ2UoXCJkYXlzLTdcIil9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8RmlsdGVyQnV0dG9uXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkhpc3RvcnlfUXVpY2tfMzBEYXlzXCIsIFwiMzAgZGF5c1wiKX1cbiAgICAgICAgICAgIGFjdGl2ZT17YWN0aXZlUXVpY2tGaWx0ZXIgPT09IFwiZGF5cy0zMFwifVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uUXVpY2tGaWx0ZXJDaGFuZ2UoXCJkYXlzLTMwXCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEZpbHRlckJ1dHRvblxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJIaXN0b3J5X1F1aWNrXzkwRGF5c1wiLCBcIjkwIGRheXNcIil9XG4gICAgICAgICAgICBhY3RpdmU9e2FjdGl2ZVF1aWNrRmlsdGVyID09PSBcImRheXMtOTBcIn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblF1aWNrRmlsdGVyQ2hhbmdlKFwiZGF5cy05MFwiKX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7c2hvd01hbnVhbERhdGVGaWx0ZXIgPyAoXG4gICAgICAgICAgPEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXJcbiAgICAgICAgICAgIGZyb21EYXRlPXtmcm9tRGF0ZX1cbiAgICAgICAgICAgIHRvRGF0ZT17dG9EYXRlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRGF0ZVJhbmdlQ2hhbmdlfVxuICAgICAgICAgICAgb25SYW5nZUNvbXBsZXRlPXtvbk1hbnVhbFJhbmdlQ29tcGxldGV9XG4gICAgICAgICAgICBhdXRvT3BlblJlcXVlc3RJZD17bWFudWFsRGF0ZUF1dG9PcGVuS2V5fVxuICAgICAgICAgICAgc2hvd01hbnVhbEVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yfVxuICAgICAgICAgICAgc2hvd1N0YXJ0RXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3IgJiYgIWZyb21EYXRlfVxuICAgICAgICAgICAgc2hvd0VuZEVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yICYmICF0b0RhdGV9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IHNob3dJbmxpbmVEYXRlU3VtbWFyeSA/IChcbiAgICAgICAgICA8SGlzdG9yeVN1bW1hcnlcbiAgICAgICAgICAgIHN1bW1hcnlGcm9tTGFiZWw9e2luZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpfVxuICAgICAgICAgICAgc3VtbWFyeVRvTGFiZWw9e2luZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIil9XG4gICAgICAgICAgICBmcm9tVmFsdWU9e2Zvcm1hdERhdGUoZnJvbURhdGUsIGxvY2FsZSl9XG4gICAgICAgICAgICB0b1ZhbHVlPXtmb3JtYXREYXRlKHRvRGF0ZSwgbG9jYWxlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImdhcC15LTEgdGV4dC1bMTFweF0gcHgtMVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy00IGdhcC0yXCI+XG4gICAgICAgICAgPEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfUHJvamVjdFwiLCBcIlByb2plY3RcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxuICAgICAgICAgICAgdmFsdWU9e3Byb2plY3RJZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvblByb2plY3RJZENoYW5nZX1cbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxFeHBlbnNlU2hlZXRGaWx0ZXJJbnB1dFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TaGVldFwiLCBcIkV4cGVuc2Ugc2hlZXRcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1NoZWV0XCIsIFwiRXhwZW5zZSBzaGVldFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtob2phR2FzdG9zSWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25Ib2phR2FzdG9zSWRDaGFuZ2V9XG4gICAgICAgICAgICBlbmFibGVSZW1vdGVTdWdnZXN0aW9uc1xuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgdmFsdWU9e2N1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkN1cnJlbmN5Q29kZUNoYW5nZX1cbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxFeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1N0YXR1c1wiLCBcIkVzdGFkb1wiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzX1BsYWNlaG9sZGVyXCIsIFwiRXN0YWRvXCIpfVxuICAgICAgICAgICAgdmFsdWU9e3N0YXR1c0ZpbHRlcn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvblN0YXR1c0ZpbHRlckNoYW5nZX1cbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPEV4cGVuc2VGaWx0ZXJBY3Rpb25zXG4gICAgICAgICAgY2xlYXJMYWJlbD17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsZWFyXCIsIFwiQ2xlYXJcIil9XG4gICAgICAgICAgYXBwbHlMYWJlbD17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0FwcGx5XCIsIFwiQXBwbHlcIil9XG4gICAgICAgICAgb25DbGVhcj17b25DbGVhcn1cbiAgICAgICAgICBvbkFwcGx5PXtvbkFwcGx5fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlRmlsdGVyc1BhbmVsO1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0Q2FyZCwgRXhwZW5zZVNoZWV0TGlzdEZpbHRlcnMgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBidWlsZEV4cGVuc2VMaXN0UGF5bG9hZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlUGF5bG9hZEJ1aWxkZXJzLnRzXCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldExpc3QsIG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcblxudHlwZSBVc2VFeHBlbnNlU2hlZXRzTGlzdERhdGFBcmdzID0ge1xuICBoYXNBY2Nlc3M6IGJvb2xlYW47XG4gIHBhZ2VTaXplOiBudW1iZXI7XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gT3ducyBsaXN0IGRhdGEgZmV0Y2gsIGxvYWRpbmcgc3RhdGUsIGFuZCBwYWdpbmF0aW9uIG1ldGFkYXRhLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldHNMaXN0RGF0YSA9ICh7IGhhc0FjY2VzcywgcGFnZVNpemUsIG9uRm9yYmlkZGVuIH06IFVzZUV4cGVuc2VTaGVldHNMaXN0RGF0YUFyZ3MpID0+IHtcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRDYXJkW10+KFtdKTtcbiAgY29uc3QgW3RvdGFsLCBzZXRUb3RhbF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2N1cnJlbnRQYWdlLCBzZXRDdXJyZW50UGFnZV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIGNvbnN0IGxvYWRMaXN0ID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKHBhZ2U6IG51bWJlciwgZmlsdGVyczogRXhwZW5zZVNoZWV0TGlzdEZpbHRlcnMpID0+IHtcbiAgICAgIGlmICghaGFzQWNjZXNzKSB7XG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgICAgY29uc3QgcGF5bG9hZCA9IGJ1aWxkRXhwZW5zZUxpc3RQYXlsb2FkKGZpbHRlcnMsIHBhZ2UsIHBhZ2VTaXplKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldExpc3QocGF5bG9hZCwge1xuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldHMuXCIpKTtcbiAgICAgICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICAgICAgc2V0VG90YWwoMCk7XG4gICAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV4dEl0ZW1zID0gKEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW10pLm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZChpdGVtKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBuZXh0VG90YWwgPSBOdW1iZXIocmVzcG9uc2U/LlRvdGFsID8/IG5leHRJdGVtcy5sZW5ndGggPz8gMCk7XG4gICAgICAgIHNldEl0ZW1zKG5leHRJdGVtcyk7XG4gICAgICAgIHNldFRvdGFsKG5leHRUb3RhbCk7XG4gICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldHMuXCIpO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIHNldEl0ZW1zKFtdKTtcbiAgICAgICAgc2V0VG90YWwoMCk7XG4gICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtoYXNBY2Nlc3MsIG9uRm9yYmlkZGVuLCBwYWdlU2l6ZV1cbiAgKTtcblxuICBjb25zdCByZXNldExpc3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0SXRlbXMoW10pO1xuICAgIHNldFRvdGFsKDApO1xuICAgIHNldEN1cnJlbnRQYWdlKDEpO1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgaXRlbXMsXG4gICAgdG90YWwsXG4gICAgY3VycmVudFBhZ2UsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBsb2FkTGlzdCxcbiAgICByZXNldExpc3QsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlUXVpY2tGaWx0ZXJJZCwgQXBwbGllZEZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZUxpc3RUeXBlcy50c1wiO1xuaW1wb3J0IHsgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgc3RhcnRPZkRheSwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBub3JtYWxpemVFeHBlbnNlRmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi9leHBlbnNlRmlsdGVyU25hcHNob3QudHNcIjtcblxudHlwZSBVc2VFeHBlbnNlU2hlZXRzRmlsdGVyc1N0YXRlQXJncyA9IHtcbiAgb25BcHBseUZpbHRlcnM6IChzbmFwc2hvdDogQXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB2b2lkO1xuICBvbkNsZWFyRmlsdGVyczogKCkgPT4gdm9pZDtcbn07XG5cbi8vIE93bnMgZmlsdGVyIFVJIHN0YXRlIGFuZCBhcHBseS9jbGVhciBydWxlcyBmb3IgZXhwZW5zZSBsaXN0IHBhZ2UuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZSA9ICh7IG9uQXBwbHlGaWx0ZXJzLCBvbkNsZWFyRmlsdGVycyB9OiBVc2VFeHBlbnNlU2hlZXRzRmlsdGVyc1N0YXRlQXJncykgPT4ge1xuICBjb25zdCBbZnJvbURhdGUsIHNldEZyb21EYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbdG9EYXRlLCBzZXRUb0RhdGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtwcm9qZWN0SWQsIHNldFByb2plY3RJZF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2hvamFHYXN0b3NJZCwgc2V0SG9qYUdhc3Rvc0lkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbY3VycmVuY3lDb2RlLCBzZXRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtzdGF0dXNGaWx0ZXIsIHNldFN0YXR1c0ZpbHRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZT4oREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIpO1xuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlID0gbnVsbDtcbiAgY29uc3QgW2FjdGl2ZVF1aWNrRmlsdGVyLCBzZXRBY3RpdmVRdWlja0ZpbHRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlUXVpY2tGaWx0ZXJJZCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd01hbnVhbERhdGVGaWx0ZXIsIHNldFNob3dNYW51YWxEYXRlRmlsdGVyXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dNYW51YWxEYXRlRXJyb3IsIHNldFNob3dNYW51YWxEYXRlRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWFudWFsRGF0ZUF1dG9PcGVuS2V5LCBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXldID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFthcHBsaWVkRmlsdGVycywgc2V0QXBwbGllZEZpbHRlcnNdID0gdXNlU3RhdGU8QXBwbGllZEZpbHRlclNuYXBzaG90IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzaG93RmlsdGVycywgc2V0U2hvd0ZpbHRlcnNdID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgY29uc3QgY3VycmVudEZpbHRlcnMgPSB1c2VNZW1vPEFwcGxpZWRGaWx0ZXJTbmFwc2hvdD4oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZyb21EYXRlLFxuICAgICAgdG9EYXRlLFxuICAgICAgcHJvamVjdElkLFxuICAgICAgaG9qYUdhc3Rvc0lkLFxuICAgICAgY3VycmVuY3lDb2RlLFxuICAgICAgc3RhdHVzRmlsdGVyLFxuICAgICAgZXhjaGFuZ2VSYXRlTW9kZSxcbiAgICAgIGZpbHRlcjogaG9qYUdhc3Rvc0lkLFxuICAgIH0pLFxuICAgIFtjdXJyZW5jeUNvZGUsIGZyb21EYXRlLCBob2phR2FzdG9zSWQsIHByb2plY3RJZCwgc3RhdHVzRmlsdGVyLCB0b0RhdGVdXG4gICk7XG5cbiAgY29uc3Qgb25BcHBseSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWZyb21EYXRlIHx8ICF0b0RhdGUpIHtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IodHJ1ZSk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNuYXBzaG90OiBBcHBsaWVkRmlsdGVyU25hcHNob3QgPSB7XG4gICAgICBmcm9tRGF0ZSxcbiAgICAgIHRvRGF0ZSxcbiAgICAgIHByb2plY3RJZCxcbiAgICAgIGhvamFHYXN0b3NJZCxcbiAgICAgIGN1cnJlbmN5Q29kZSxcbiAgICAgIHN0YXR1c0ZpbHRlcixcbiAgICAgIGV4Y2hhbmdlUmF0ZU1vZGUsXG4gICAgICBmaWx0ZXI6IGhvamFHYXN0b3NJZCxcbiAgICB9O1xuXG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgc2V0QXBwbGllZEZpbHRlcnMoc25hcHNob3QpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XG4gICAgb25BcHBseUZpbHRlcnMoc25hcHNob3QpO1xuICB9LCBbY3VycmVuY3lDb2RlLCBmcm9tRGF0ZSwgaG9qYUdhc3Rvc0lkLCBvbkFwcGx5RmlsdGVycywgcHJvamVjdElkLCBzdGF0dXNGaWx0ZXIsIHRvRGF0ZV0pO1xuXG4gIC8vIFJlaHlkcmF0ZXMgdGhlIGxpc3QgZmlsdGVycyBmcm9tIGEgY2FjaGVkIHNuYXBzaG90IHdoZW4gcmV0dXJuaW5nIGZyb20gZGV0YWlsLlxuICBjb25zdCByZXN0b3JlQXBwbGllZEZpbHRlcnMgPSB1c2VDYWxsYmFjaygoc25hcHNob3Q6IEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4ge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlRmlsdGVyU25hcHNob3Qoc25hcHNob3QpO1xuICAgIHNldEZyb21EYXRlKG5vcm1hbGl6ZWQuZnJvbURhdGUpO1xuICAgIHNldFRvRGF0ZShub3JtYWxpemVkLnRvRGF0ZSk7XG4gICAgc2V0UHJvamVjdElkKG5vcm1hbGl6ZWQucHJvamVjdElkKTtcbiAgICBzZXRIb2phR2FzdG9zSWQobm9ybWFsaXplZC5ob2phR2FzdG9zSWQpO1xuICAgIHNldEN1cnJlbmN5Q29kZShub3JtYWxpemVkLmN1cnJlbmN5Q29kZSk7XG4gICAgc2V0U3RhdHVzRmlsdGVyKG5vcm1hbGl6ZWQuc3RhdHVzRmlsdGVyKTtcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgc2V0QXBwbGllZEZpbHRlcnMobm9ybWFsaXplZCk7XG4gICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgb25DbGVhciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRGcm9tRGF0ZShcIlwiKTtcbiAgICBzZXRUb0RhdGUoXCJcIik7XG4gICAgc2V0UHJvamVjdElkKFwiXCIpO1xuICAgIHNldEhvamFHYXN0b3NJZChcIlwiKTtcbiAgICBzZXRDdXJyZW5jeUNvZGUoXCJcIik7XG4gICAgc2V0U3RhdHVzRmlsdGVyKERFRkFVTFRfRVhQRU5TRV9TVEFUVVNfRklMVEVSKTtcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgc2V0TWFudWFsRGF0ZUF1dG9PcGVuS2V5KDApO1xuICAgIHNldEFwcGxpZWRGaWx0ZXJzKG51bGwpO1xuICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xuICAgIG9uQ2xlYXJGaWx0ZXJzKCk7XG4gIH0sIFtvbkNsZWFyRmlsdGVyc10pO1xuXG4gIGNvbnN0IG9uRGF0ZVJhbmdlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXG4gICAgKG5leHRGcm9tRGF0ZTogc3RyaW5nLCBuZXh0VG9EYXRlOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGhhc0Z1bGxSYW5nZSA9ICEhbmV4dEZyb21EYXRlICYmICEhbmV4dFRvRGF0ZTtcbiAgICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XG4gICAgICBzZXRUb0RhdGUobmV4dFRvRGF0ZSk7XG4gICAgICBpZiAoIWhhc0Z1bGxSYW5nZSkge1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcbiAgICAgIH1cbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgaWYgKHNob3dNYW51YWxEYXRlRXJyb3IpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcighaGFzRnVsbFJhbmdlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtzaG93TWFudWFsRGF0ZUVycm9yXVxuICApO1xuXG4gIC8vIENsb3NlcyB0aGUgbWFudWFsIGRhdGUgVUkgb25jZSB0aGUgdXNlciBmaW5pc2hlcyBzZWxlY3RpbmcgYSBmdWxsIHJhbmdlLlxuICBjb25zdCBvbk1hbnVhbFJhbmdlQ29tcGxldGUgPSB1c2VDYWxsYmFjaygobmV4dEZyb21EYXRlOiBzdHJpbmcsIG5leHRUb0RhdGU6IHN0cmluZykgPT4ge1xuICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XG4gICAgc2V0VG9EYXRlKG5leHRUb0RhdGUpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG9uUXVpY2tGaWx0ZXJDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAoZmlsdGVySWQ6IEV4cGVuc2VRdWlja0ZpbHRlcklkKSA9PiB7XG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiY3VzdG9tXCIpIHtcbiAgICAgICAgLy8gVG9nZ2xlIG1hbnVhbCBkYXRlIGNvbnRyb2xzIG9uIGV2ZXJ5IERhdGUgYnV0dG9uIGNsaWNrLlxuICAgICAgICBpZiAoc2hvd01hbnVhbERhdGVGaWx0ZXIpIHtcbiAgICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKHRydWUpO1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICAgICAgLy8gQWx3YXlzIGFzayB0aGUgZGF0ZSBjb21wb25lbnQgdG8gb3BlbiB0aGUgY2FsZW5kYXIgd2hlbiBEYXRlIGlzIHByZXNzZWQuXG4gICAgICAgIHNldE1hbnVhbERhdGVBdXRvT3BlbktleSgocHJldmlvdXMpID0+IHByZXZpb3VzICsgMSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoZmlsdGVySWQpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG5cbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcbiAgICAgIGNvbnN0IG5leHRGcm9tID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtN1wiKSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gNik7XG4gICAgICB9IGVsc2UgaWYgKGZpbHRlcklkID09PSBcImRheXMtMzBcIikge1xuICAgICAgICBuZXh0RnJvbS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDI5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gODkpO1xuICAgICAgfVxuXG4gICAgICBzZXRGcm9tRGF0ZSh0b0lzb0RhdGUobmV4dEZyb20pKTtcbiAgICAgIHNldFRvRGF0ZSh0b0lzb0RhdGUodG9kYXkpKTtcbiAgICB9LFxuICAgIFtzaG93TWFudWFsRGF0ZUZpbHRlcl1cbiAgKTtcblxuICBjb25zdCB0b2dnbGVGaWx0ZXJQYW5lbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRTaG93RmlsdGVycygocHJldmlvdXMpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSAhcHJldmlvdXM7XG4gICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIGZyb21EYXRlLFxuICAgIHRvRGF0ZSxcbiAgICBwcm9qZWN0SWQsXG4gICAgaG9qYUdhc3Rvc0lkLFxuICAgIGN1cnJlbmN5Q29kZSxcbiAgICBzdGF0dXNGaWx0ZXIsXG4gICAgZXhjaGFuZ2VSYXRlTW9kZSxcbiAgICBhY3RpdmVRdWlja0ZpbHRlcixcbiAgICBzaG93TWFudWFsRGF0ZUZpbHRlcixcbiAgICBzaG93TWFudWFsRGF0ZUVycm9yLFxuICAgIG1hbnVhbERhdGVBdXRvT3BlbktleSxcbiAgICBhcHBsaWVkRmlsdGVycyxcbiAgICBzaG93RmlsdGVycyxcbiAgICBjdXJyZW50RmlsdGVycyxcbiAgICBzZXRQcm9qZWN0SWQsXG4gICAgc2V0SG9qYUdhc3Rvc0lkLFxuICAgIHNldEN1cnJlbmN5Q29kZSxcbiAgICBzZXRTdGF0dXNGaWx0ZXIsXG4gICAgb25BcHBseSxcbiAgICBvbkNsZWFyLFxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcbiAgICBvbkRhdGVSYW5nZUNoYW5nZSxcbiAgICBvbk1hbnVhbFJhbmdlQ29tcGxldGUsXG4gICAgb25RdWlja0ZpbHRlckNoYW5nZSxcbiAgICB0b2dnbGVGaWx0ZXJQYW5lbCxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBBcHBsaWVkRmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi9leHBlbnNlTGlzdFR5cGVzLnRzXCI7XG5pbXBvcnQgeyBERUZBVUxUX0VYUEVOU0VfU1RBVFVTX0ZJTFRFUiwgbm9ybWFsaXplRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XG5cbi8vIE5vcm1hbGl6ZXMgYW4gZXhwZW5zZSBmaWx0ZXIgc25hcHNob3Qgc28gY2FjaGUgYW5kIFVJIHVzZSBvbmUgY2Fub25pY2FsIHNoYXBlLlxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VGaWx0ZXJTbmFwc2hvdCA9IChcbiAgdmFsdWU6IFBhcnRpYWw8QXBwbGllZEZpbHRlclNuYXBzaG90PiB8IG51bGwgfCB1bmRlZmluZWRcbik6IEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9PiB7XG4gIGNvbnN0IGV4cGVuc2VTaGVldFN0YXR1c1JhdyA9IE51bWJlcihcbiAgICAodmFsdWUgYXMgeyBleHBlbnNlU2hlZXRTdGF0dXM/OiB1bmtub3duIH0gfCBudWxsIHwgdW5kZWZpbmVkKT8uZXhwZW5zZVNoZWV0U3RhdHVzXG4gICk7XG4gIGNvbnN0IGJpbGxlZE1vZGVSYXcgPSBOdW1iZXIoKHZhbHVlIGFzIHsgYmlsbGVkTW9kZT86IHVua25vd24gfSB8IG51bGwgfCB1bmRlZmluZWQpPy5iaWxsZWRNb2RlKTtcbiAgY29uc3QgaGFzRXhwbGljaXRTdGF0dXMgPSBOdW1iZXIuaXNJbnRlZ2VyKGV4cGVuc2VTaGVldFN0YXR1c1JhdykgJiYgZXhwZW5zZVNoZWV0U3RhdHVzUmF3ID49IDAgJiYgZXhwZW5zZVNoZWV0U3RhdHVzUmF3IDw9IDQ7XG4gIGNvbnN0IGxlZ2FjeVN0YXR1c0ZhbGxiYWNrID0gYmlsbGVkTW9kZVJhdyA9PT0gMSA/IDQgOiBiaWxsZWRNb2RlUmF3ID09PSAwID8gMCA6IERFRkFVTFRfRVhQRU5TRV9TVEFUVVNfRklMVEVSO1xuICBjb25zdCBzdGF0dXNGaWx0ZXIgPSBub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZShcbiAgICBoYXNFeHBsaWNpdFN0YXR1cyA/IGV4cGVuc2VTaGVldFN0YXR1c1JhdyA6IHZhbHVlPy5zdGF0dXNGaWx0ZXIsXG4gICAgbGVnYWN5U3RhdHVzRmFsbGJhY2tcbiAgKTtcbiAgY29uc3QgaG9qYUdhc3Rvc0lkID0gU3RyaW5nKHZhbHVlPy5ob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpO1xuXG4gIHJldHVybiB7XG4gICAgZnJvbURhdGU6IFN0cmluZyh2YWx1ZT8uZnJvbURhdGUgfHwgXCJcIikudHJpbSgpLFxuICAgIHRvRGF0ZTogU3RyaW5nKHZhbHVlPy50b0RhdGUgfHwgXCJcIikudHJpbSgpLFxuICAgIHByb2plY3RJZDogU3RyaW5nKHZhbHVlPy5wcm9qZWN0SWQgfHwgXCJcIikudHJpbSgpLFxuICAgIGhvamFHYXN0b3NJZCxcbiAgICBjdXJyZW5jeUNvZGU6IFN0cmluZyh2YWx1ZT8uY3VycmVuY3lDb2RlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICBzdGF0dXNGaWx0ZXIsXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogbnVsbCxcbiAgICBmaWx0ZXI6IFN0cmluZyh2YWx1ZT8uZmlsdGVyIHx8IGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCksXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7IEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuL2V4cGVuc2VMaXN0VHlwZXMudHNcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuL2V4cGVuc2VGaWx0ZXJTbmFwc2hvdC50c1wiO1xuaW1wb3J0IHtcbiAgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LFxuICBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LFxuICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LFxuICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksXG4gIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXG59IGZyb20gXCIuLi8uLi8uLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XG5cbmNvbnN0IEVYUEVOU0VfU0hFRVRTX0ZJTFRFUl9LRVkgPSBcImV4cGVuc2Vfc2hlZXRzX2ZpbHRlcl92MVwiO1xuY29uc3QgRVhQRU5TRV9TSEVFVFNfUkVUVVJOX0ZMQUdfS0VZID0gXCJleHBlbnNlX3NoZWV0c19yZXR1cm5fdjFcIjtcbmNvbnN0IEVYUEVOU0VfU0hFRVRTX0NBQ0hFX1RUTF9NUyA9IDEyICogNjAgKiA2MCAqIDEwMDA7XG5cbmV4cG9ydCB0eXBlIEV4cGVuc2VTaGVldHNDYWNoZWRTdGF0ZSA9IHtcbiAgZmlsdGVyczogQXBwbGllZEZpbHRlclNuYXBzaG90O1xuICBwYWdlOiBudW1iZXI7XG4gIHNjcm9sbFk6IG51bWJlcjtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZVN0YXRlID0gKHJhdzogRXhwZW5zZVNoZWV0c0NhY2hlZFN0YXRlIHwgbnVsbCk6IEV4cGVuc2VTaGVldHNDYWNoZWRTdGF0ZSB8IG51bGwgPT4ge1xuICBpZiAoIXJhdyB8fCB0eXBlb2YgcmF3ICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBwYWdlUmF3ID0gTnVtYmVyKHJhdy5wYWdlKTtcbiAgY29uc3QgcGFnZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlUmF3KSAmJiBwYWdlUmF3ID4gMCA/IE1hdGguZmxvb3IocGFnZVJhdykgOiAxO1xuXG4gIGNvbnN0IHNjcm9sbFJhdyA9IE51bWJlcihyYXcuc2Nyb2xsWSk7XG4gIGNvbnN0IHNjcm9sbFkgPSBOdW1iZXIuaXNGaW5pdGUoc2Nyb2xsUmF3KSAmJiBzY3JvbGxSYXcgPj0gMCA/IE1hdGguZmxvb3Ioc2Nyb2xsUmF3KSA6IDA7XG5cbiAgcmV0dXJuIHtcbiAgICBmaWx0ZXJzOiBub3JtYWxpemVFeHBlbnNlRmlsdGVyU25hcHNob3QocmF3LmZpbHRlcnMpLFxuICAgIHBhZ2UsXG4gICAgc2Nyb2xsWSxcbiAgfTtcbn07XG5cbi8vIENlbnRyYWxpemVzIGNhY2hlIHBlcnNpc3RlbmNlIGZvciByZXR1cm5pbmcgZnJvbSBleHBlbnNlIGRldGFpbCB0byBsaXN0LlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSA9ICgpID0+IHtcbiAgY29uc3QgcmVhZENhY2hlZFN0YXRlID0gdXNlQ2FsbGJhY2soKCk6IEV4cGVuc2VTaGVldHNDYWNoZWRTdGF0ZSB8IG51bGwgPT4ge1xuICAgIGNvbnN0IHJhdyA9IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeTxFeHBlbnNlU2hlZXRzQ2FjaGVkU3RhdGU+KEVYUEVOU0VfU0hFRVRTX0ZJTFRFUl9LRVkpO1xuICAgIHJldHVybiBub3JtYWxpemVTdGF0ZShyYXcpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY29uc3VtZVJldHVybkZsYWcgPSB1c2VDYWxsYmFjaygoKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgcmF3ID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShFWFBFTlNFX1NIRUVUU19SRVRVUk5fRkxBR19LRVkpO1xuICAgIGlmIChyYXcgPT09IFwiMVwiKSB7XG4gICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEVYUEVOU0VfU0hFRVRTX1JFVFVSTl9GTEFHX0tFWSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgc2F2ZUNhY2hlZFN0YXRlID0gdXNlQ2FsbGJhY2soKHN0YXRlOiBFeHBlbnNlU2hlZXRzQ2FjaGVkU3RhdGUpOiB2b2lkID0+IHtcbiAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplU3RhdGUoc3RhdGUpO1xuICAgIGlmICghbm9ybWFsaXplZCkgcmV0dXJuO1xuXG4gICAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5KEVYUEVOU0VfU0hFRVRTX0ZJTFRFUl9LRVksIG5vcm1hbGl6ZWQsIEVYUEVOU0VfU0hFRVRTX0NBQ0hFX1RUTF9NUyk7XG4gICAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShFWFBFTlNFX1NIRUVUU19SRVRVUk5fRkxBR19LRVksIFwiMVwiLCBFWFBFTlNFX1NIRUVUU19DQUNIRV9UVExfTVMpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY2xlYXJDYWNoZWRTdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KEVYUEVOU0VfU0hFRVRTX0ZJTFRFUl9LRVkpO1xuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoRVhQRU5TRV9TSEVFVFNfUkVUVVJOX0ZMQUdfS0VZKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgcmVhZENhY2hlZFN0YXRlLFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIHNhdmVDYWNoZWRTdGF0ZSxcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxuICB9O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUF1RDs7O0FDQXZELG1CQUFtQztBQW1GN0I7QUFqRU4sSUFBTSxtQkFBbUI7QUFFekIsSUFBTSxrQkFBa0IsQ0FBQyxVQUF1RTtBQUM5RixVQUFRLE1BQU0sUUFBUSxLQUFLLElBQUksUUFBUSxDQUFDLEdBQ3JDLElBQUksQ0FBQyxTQUFTO0FBQ2IsVUFBTSxLQUFLLE9BQU8sTUFBTSxnQkFBZ0IsRUFBRSxFQUFFLEtBQUs7QUFDakQsUUFBSSxDQUFDLEdBQUksUUFBTztBQUNoQixXQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxVQUFVLE9BQU8sTUFBTSxlQUFlLEVBQUUsRUFBRSxLQUFLLEtBQUs7QUFBQSxJQUN0RDtBQUFBLEVBQ0YsQ0FBQyxFQUNBLE9BQU8sT0FBTztBQUNuQjtBQUdBLElBQU0sMEJBQTBCLENBQUM7QUFBQSxFQUMvQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsMEJBQTBCO0FBQUEsRUFDMUIsV0FBVztB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eEI7QUFBQSxJQUVKLENBQUMsR0FDSCxJQUNFO0FBQUEsSUFFSjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsUUFDQSxjQUFjLENBQUMsU0FBUztBQUN0QixnQkFBTSxXQUFXLGtCQUFrQjtBQUNuQyxlQUFLLFNBQVMsTUFBTSxRQUFRO0FBQUEsUUFDOUI7QUFBQSxRQUNBLFFBQVE7QUFBQTtBQUFBLElBQ1Y7QUFBQSxJQUVDLG1CQUNDO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFNO0FBQUEsUUFDTixXQUFXLEtBQUssaUJBQWlCLFFBQVE7QUFBQSxRQUN6QyxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUE7QUFBQSxJQUNYLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLG9CQUFvQixNQUFNO0FBQzlCLFNBQ0UsNkNBQUMsZ0NBQ0MsdURBQUMsNEJBQXlCLEdBQzVCO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxxQkFBcUI7QUFDNUQsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQyxxQkFBa0IsQ0FBRTtBQUNoRDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sNEJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiXQp9Cg==
