import {
  ExpenseDateRangeFilter_default,
  ExpenseFilterActions_default,
  ExpenseManagedUserFilterSelect_default,
  ExpenseQuickDateFilters_default,
  buildExpenseListPayload,
  buildExpenseSheetSuggestPayload
} from "./chunks/chunk-C3RCSU75.js";
import {
  HistorySummary_default
} from "./chunks/chunk-7Z3NMBR5.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-NYJJSKPB.js";
import {
  DEFAULT_EXPENSE_STATUS_FILTER,
  getExpenseStatusBadgeClassName,
  getExpenseStatusFilterOptions,
  getExpenseStatusLabel,
  normalizeExpenseStatusFilterCode
} from "./chunks/chunk-ZN2XQFXY.js";
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
  formatAmountWithCurrency,
  formatExpenseDateParts,
  formatExpenseDisplayDate,
  hasAssignedVoucher,
  navigateToExpenseUrl,
  safeText,
  startOfDay,
  toIsoDate
} from "./chunks/chunk-TWBQPWHO.js";
import {
  configureExpenseApiAuth,
  fetchExpenseSheetList,
  mapExpenseSheetListItemToCard
} from "./chunks/chunk-IDWB5SME.js";
import {
  VisitasPageProviders_default,
  getExpenseScopeToken,
  useAuthContext
} from "./chunks/chunk-FQJSMENJ.js";
import {
  clearExpenseActingUserOverride,
  setExpenseActingUserOverride
} from "./chunks/chunk-LCBK6SHP.js";
import {
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
  managedUserId,
  managedUsers,
  showManagedUserFilter,
  statusFilter,
  activeQuickFilter,
  showManualDateError,
  onDateRangeChange,
  onManualRangeComplete,
  onQuickFilterChange,
  onProjectIdChange,
  onHojaGastosIdChange,
  onCurrencyCodeChange,
  onManagedUserIdChange,
  onStatusFilterChange,
  onClear,
  onApply
}) => {
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
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: `grid grid-cols-1 sm:grid-cols-2 ${showManagedUserFilter ? "lg:grid-cols-5" : "lg:grid-cols-4"} gap-2`, children: [
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
  const restoreListSnapshot = (0, import_react3.useCallback)(
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
    restoreListSnapshot,
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
  const managedUserId = String(value?.managedUserId || "").trim();
  return {
    fromDate: String(value?.fromDate || "").trim(),
    toDate: String(value?.toDate || "").trim(),
    projectId: String(value?.projectId || "").trim(),
    hojaGastosId,
    currencyCode: String(value?.currencyCode || "").trim(),
    managedUserId,
    statusFilter,
    exchangeRateMode: null,
    filter: String(value?.filter || hojaGastosId || "").trim()
  };
};

// Web/wwwroot/react/src/pages/gastos/list/useExpenseSheetsFiltersState.ts
var useExpenseSheetsFiltersState = ({
  onApplyFilters,
  onClearFilters,
  defaultManagedUserId
}) => {
  const [fromDate, setFromDate] = (0, import_react4.useState)("");
  const [toDate, setToDate] = (0, import_react4.useState)("");
  const [projectId, setProjectId] = (0, import_react4.useState)("");
  const [hojaGastosId, setHojaGastosId] = (0, import_react4.useState)("");
  const [currencyCode, setCurrencyCode] = (0, import_react4.useState)("");
  const [managedUserId, setManagedUserId] = (0, import_react4.useState)(defaultManagedUserId);
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
      managedUserId,
      statusFilter,
      exchangeRateMode,
      filter: hojaGastosId
    }),
    [currencyCode, fromDate, hojaGastosId, managedUserId, projectId, statusFilter, toDate]
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
      managedUserId,
      statusFilter,
      exchangeRateMode,
      filter: hojaGastosId
    };
    setShowManualDateError(false);
    setAppliedFilters(snapshot);
    setShowManualDateFilter(false);
    setShowFilters(false);
    onApplyFilters(snapshot);
  }, [currencyCode, fromDate, hojaGastosId, managedUserId, onApplyFilters, projectId, statusFilter, toDate]);
  const restoreAppliedFilters = (0, import_react4.useCallback)((snapshot) => {
    const normalized = normalizeExpenseFilterSnapshot(snapshot);
    const restoredManagedUserId = String(normalized.managedUserId || defaultManagedUserId).trim();
    setFromDate(normalized.fromDate);
    setToDate(normalized.toDate);
    setProjectId(normalized.projectId);
    setHojaGastosId(normalized.hojaGastosId);
    setCurrencyCode(normalized.currencyCode);
    setManagedUserId(restoredManagedUserId);
    setStatusFilter(normalized.statusFilter);
    setActiveQuickFilter(null);
    setShowManualDateFilter(false);
    setShowManualDateError(false);
    setAppliedFilters({
      ...normalized,
      managedUserId: restoredManagedUserId
    });
    setShowFilters(false);
  }, [defaultManagedUserId]);
  const onClear = (0, import_react4.useCallback)(() => {
    setFromDate("");
    setToDate("");
    setProjectId("");
    setHojaGastosId("");
    setCurrencyCode("");
    setManagedUserId(defaultManagedUserId);
    setStatusFilter(DEFAULT_EXPENSE_STATUS_FILTER);
    setActiveQuickFilter(null);
    setShowManualDateFilter(false);
    setShowManualDateError(false);
    setManualDateAutoOpenKey(0);
    setAppliedFilters(null);
    setShowFilters(true);
    onClearFilters();
  }, [defaultManagedUserId, onClearFilters]);
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
    managedUserId,
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
    setManagedUserId,
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
var EXPENSE_SHEETS_FILTER_KEY_PREFIX = "expense_sheets_filter_v1";
var EXPENSE_SHEETS_RETURN_FLAG_KEY_PREFIX = "expense_sheets_return_v1";
var EXPENSE_SHEETS_CACHE_TTL_MS = 12 * 60 * 60 * 1e3;
var getScopeToken = () => {
  return getExpenseScopeToken();
};
var getScopedKeys = () => {
  const scope = getScopeToken();
  return {
    filterKey: `${EXPENSE_SHEETS_FILTER_KEY_PREFIX}_${scope}`,
    returnFlagKey: `${EXPENSE_SHEETS_RETURN_FLAG_KEY_PREFIX}_${scope}`
  };
};
var toNullableNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};
var normalizeItems = (raw) => {
  if (!Array.isArray(raw)) return [];
  return raw.map((entry) => {
    const item = entry || {};
    return {
      hojaGastosId: String(item.hojaGastosId || "").trim(),
      description: typeof item.description === "string" ? item.description.trim() : void 0,
      expenseSheetStatus: toNullableNumber(item.expenseSheetStatus),
      estadoComentarios: typeof item.estadoComentarios === "string" ? item.estadoComentarios.trim() : null,
      userId: typeof item.userId === "string" ? item.userId.trim() : void 0,
      voucher: typeof item.voucher === "string" ? item.voucher.trim() : void 0,
      projId: typeof item.projId === "string" ? item.projId.trim() : void 0,
      currencyCode: typeof item.currencyCode === "string" ? item.currencyCode.trim() : void 0,
      totalAmount: toNullableNumber(item.totalAmount),
      exchRate: toNullableNumber(item.exchRate),
      exchangeRateMode: toNullableNumber(item.exchangeRateMode),
      createdDate: typeof item.createdDate === "string" ? item.createdDate.trim() : void 0
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
    filters: normalizeExpenseFilterSnapshot(raw.filters),
    page,
    scrollY,
    items,
    total
  };
};
var useExpenseSheetsFilterCache = () => {
  const readCachedState = (0, import_react5.useCallback)(() => {
    const keys = getScopedKeys();
    const raw = getSessionJsonWithExpiry(keys.filterKey);
    return normalizeState(raw);
  }, []);
  const consumeReturnFlag = (0, import_react5.useCallback)(() => {
    const keys = getScopedKeys();
    const raw = getSessionValueWithExpiry(keys.returnFlagKey);
    if (raw === "1") {
      removeSessionValueWithExpiry(keys.returnFlagKey);
      return true;
    }
    return false;
  }, []);
  const saveCachedState = (0, import_react5.useCallback)((state) => {
    const normalized = normalizeState(state);
    if (!normalized) return;
    const keys = getScopedKeys();
    setSessionJsonWithExpiry(keys.filterKey, normalized, EXPENSE_SHEETS_CACHE_TTL_MS);
    setSessionValueWithExpiry(keys.returnFlagKey, "1", EXPENSE_SHEETS_CACHE_TTL_MS);
  }, []);
  const clearCachedState = (0, import_react5.useCallback)(() => {
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

// Web/wwwroot/react/src/pages/gastos/list/ExpenseSheetsPage.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var PAGE_SIZE = 6;
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
  const {
    currentAxUserId,
    selectedManagedUserId,
    subordinates,
    canManageOtherUsers,
    setSelectedManagedUserId
  } = useAuthContext();
  const managedUsers = (0, import_react6.useMemo)(
    () => ensureCurrentUserInList(Array.isArray(subordinates) ? subordinates : [], currentAxUserId),
    [currentAxUserId, subordinates]
  );
  const defaultManagedUserId = (0, import_react6.useMemo)(
    () => resolveManagedUserSelection(selectedManagedUserId, currentAxUserId, managedUsers),
    [currentAxUserId, managedUsers, selectedManagedUserId]
  );
  const managedUserLabelById = (0, import_react6.useMemo)(() => {
    const map = /* @__PURE__ */ new Map();
    managedUsers.forEach((entry) => {
      const id = normalizeUserId(entry.axUserId);
      if (!id) return;
      const name = normalizeUserId(entry.name);
      map.set(id.toUpperCase(), name || id);
    });
    return map;
  }, [managedUsers]);
  const paginationLabels = (0, import_react6.useMemo)(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last")
    }),
    []
  );
  const {
    items,
    total,
    currentPage,
    isLoading,
    errorMessage,
    loadList,
    restoreListSnapshot,
    resetList
  } = useExpenseSheetsListData({
    hasAccess,
    pageSize: PAGE_SIZE,
    onForbidden: showPermissionModal
  });
  const { readCachedState, consumeReturnFlag, saveCachedState, clearCachedState } = useExpenseSheetsFilterCache();
  const didRestoreOnMountRef = import_react6.default.useRef(false);
  const pendingScrollRestoreRef = import_react6.default.useRef(null);
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
    projectId,
    hojaGastosId,
    currencyCode,
    managedUserId,
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
    setManagedUserId,
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
      const resolvedManagedUserId = syncManagedUserSelection(snapshot.managedUserId);
      void loadList(1, {
        ...snapshot,
        managedUserId: resolvedManagedUserId
      });
    },
    onClearFilters: () => {
      const resetManagedUserId = syncManagedUserSelection(currentAxUserId);
      setManagedUserId(resetManagedUserId);
      clearCachedState();
      resetList();
    },
    defaultManagedUserId
  });
  (0, import_react6.useEffect)(() => {
    const normalizedDefaultManagedUserId = normalizeUserId(defaultManagedUserId);
    if (!normalizedDefaultManagedUserId) return;
    setManagedUserId(normalizedDefaultManagedUserId);
    syncManagedUserSelection(normalizedDefaultManagedUserId);
  }, [defaultManagedUserId, setManagedUserId, syncManagedUserSelection]);
  const goToDetail = (0, import_react6.useCallback)(
    (sheetId) => {
      if (!sheetId) return;
      const snapshot = appliedFilters || currentFilters;
      saveCachedState({
        filters: snapshot,
        page: currentPage < 1 ? 1 : currentPage,
        scrollY: typeof window !== "undefined" ? window.scrollY || 0 : 0,
        items,
        total
      });
      const id = encodeURIComponent(sheetId);
      navigateToExpenseUrl(`/Gastos/ExpenseSheetDetail?hojaGastosId=${id}`, {
        bypassGuardOnce: false
      });
    },
    [appliedFilters, currentFilters, currentPage, items, saveCachedState, total]
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
    const appliedManagedUserId = normalizeUserId(appliedFilters.managedUserId);
    if (appliedManagedUserId && (!currentAxUserId || !isSameUser(appliedManagedUserId, currentAxUserId))) {
      const managedUserLabel = managedUserLabelById.get(appliedManagedUserId.toUpperCase()) || appliedManagedUserId;
      summary.push({
        key: "managed-user",
        label: indT("Common_User", "User"),
        value: managedUserLabel
      });
    }
    if (appliedFilters.statusFilter !== DEFAULT_EXPENSE_STATUS_FILTER) {
      summary.push({
        key: "status",
        label: indT("ExpenseSheets_Filter_Status", "Estado"),
        value: getExpenseStatusLabel(appliedFilters.statusFilter)
      });
    }
    return summary;
  }, [appliedFilters, currentAxUserId, managedUserLabelById]);
  const showSummary = !showFilters && summaryItems.length > 0;
  (0, import_react6.useEffect)(() => {
    if (didRestoreOnMountRef.current) return;
    didRestoreOnMountRef.current = true;
    if (!consumeReturnFlag()) {
      clearCachedState();
      const resetManagedUserId = syncManagedUserSelection(currentAxUserId);
      setManagedUserId(resetManagedUserId);
      return;
    }
    const cachedState = readCachedState();
    if (!cachedState) {
      clearCachedState();
      const resetManagedUserId = syncManagedUserSelection(currentAxUserId);
      setManagedUserId(resetManagedUserId);
      return;
    }
    const restoredManagedUserId = syncManagedUserSelection(cachedState.filters.managedUserId);
    const restoredFilters = {
      ...cachedState.filters,
      managedUserId: restoredManagedUserId
    };
    restoreAppliedFilters(restoredFilters);
    pendingScrollRestoreRef.current = cachedState.scrollY;
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
    consumeReturnFlag,
    currentAxUserId,
    loadList,
    readCachedState,
    restoreAppliedFilters,
    restoreListSnapshot,
    setManagedUserId,
    syncManagedUserSelection
  ]);
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
      const willOpen = !showFilters;
      toggleFilterPanel();
      if (willOpen) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    const onRefresh = () => {
      if (!appliedFilters) {
        return;
      }
      const resolvedManagedUserId = syncManagedUserSelection(appliedFilters.managedUserId);
      void loadList(currentPage < 1 ? 1 : currentPage, {
        ...appliedFilters,
        managedUserId: resolvedManagedUserId
      });
    };
    window.addEventListener("expense-sheets-toggle-filter", onToggleFilters);
    window.addEventListener("expense-sheets-refresh", onRefresh);
    return () => {
      window.removeEventListener("expense-sheets-toggle-filter", onToggleFilters);
      window.removeEventListener("expense-sheets-refresh", onRefresh);
    };
  }, [appliedFilters, currentPage, loadList, showFilters, syncManagedUserSelection, toggleFilterPanel]);
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
        managedUserId,
        managedUsers,
        showManagedUserFilter: canManageOtherUsers,
        statusFilter,
        activeQuickFilter,
        onDateRangeChange,
        onManualRangeComplete,
        onQuickFilterChange,
        onProjectIdChange: setProjectId,
        onHojaGastosIdChange: setHojaGastosId,
        onCurrencyCodeChange: setCurrencyCode,
        onManagedUserIdChange: setManagedUserId,
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
      const dateParts = formatExpenseDateParts(
        item.createdDate,
        document?.documentElement?.lang || "es-ES",
        { preferMonthFirstOnSlash: true }
      );
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
        loading: isLoading,
        onPageChange: (page) => {
          const snapshot = appliedFilters || currentFilters;
          const resolvedManagedUserId = syncManagedUserSelection(snapshot.managedUserId);
          void loadList(page, {
            ...snapshot,
            managedUserId: resolvedManagedUserId
          });
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(VisitasPageProviders_default, { enableExpenseManagement: true, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExpenseSheetsPageContent, {}) });
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saXN0L0V4cGVuc2VTaGVldHNQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0RmlsdGVySW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0LnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZUZpbHRlcnNQYW5lbC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saXN0L3VzZUV4cGVuc2VTaGVldHNMaXN0RGF0YS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpc3QvdXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpc3QvZXhwZW5zZUZpbHRlclNuYXBzaG90LnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGlzdC91c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcbmltcG9ydCBDb21wYWN0UGFnaW5hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeFwiO1xuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCwgdHlwZSBBdXRoTWFuYWdlZFVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XG5pbXBvcnQge1xuICBERUZBVUxUX0VYUEVOU0VfU1RBVFVTX0ZJTFRFUixcbiAgZ2V0RXhwZW5zZVN0YXR1c0JhZGdlQ2xhc3NOYW1lLFxuICBnZXRFeHBlbnNlU3RhdHVzTGFiZWwsXG4gIG5vcm1hbGl6ZUV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgRXhwZW5zZUZpbHRlcnNQYW5lbCBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlRmlsdGVyc1BhbmVsLnRzeFwiO1xuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzLCBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIGhhc0Fzc2lnbmVkVm91Y2hlciwgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldHNMaXN0RGF0YSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldHNMaXN0RGF0YS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldHNGaWx0ZXJzU3RhdGUudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZS50c1wiO1xuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBjbGVhckV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUsIHNldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFjdGluZ1VzZXIudHNcIjtcblxuY29uc3QgUEFHRV9TSVpFID0gNjtcblxuY29uc3Qgbm9ybWFsaXplVXNlcklkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XG5cbmNvbnN0IGlzU2FtZVVzZXIgPSAobGVmdDogc3RyaW5nLCByaWdodDogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRMZWZ0ID0gbm9ybWFsaXplVXNlcklkKGxlZnQpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRSaWdodCA9IG5vcm1hbGl6ZVVzZXJJZChyaWdodCkudG9VcHBlckNhc2UoKTtcbiAgcmV0dXJuICEhbm9ybWFsaXplZExlZnQgJiYgbm9ybWFsaXplZExlZnQgPT09IG5vcm1hbGl6ZWRSaWdodDtcbn07XG5cbmNvbnN0IGVuc3VyZUN1cnJlbnRVc2VySW5MaXN0ID0gKHVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXSwgY3VycmVudEF4VXNlcklkOiBzdHJpbmcpOiBBdXRoTWFuYWdlZFVzZXJbXSA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50ID0gbm9ybWFsaXplVXNlcklkKGN1cnJlbnRBeFVzZXJJZCk7XG4gIGlmICghbm9ybWFsaXplZEN1cnJlbnQpIHJldHVybiB1c2VycztcbiAgaWYgKHVzZXJzLnNvbWUoKGVudHJ5KSA9PiBpc1NhbWVVc2VyKGVudHJ5LmF4VXNlcklkLCBub3JtYWxpemVkQ3VycmVudCkpKSByZXR1cm4gdXNlcnM7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgY3JtVXNlcklkOiBub3JtYWxpemVkQ3VycmVudCxcbiAgICAgIGF4VXNlcklkOiBub3JtYWxpemVkQ3VycmVudCxcbiAgICAgIG5hbWU6IG5vcm1hbGl6ZWRDdXJyZW50LFxuICAgIH0sXG4gICAgLi4udXNlcnMsXG4gIF07XG59O1xuXG5jb25zdCByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24gPSAocmVxdWVzdGVkVXNlcklkOiBzdHJpbmcsIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nLCB1c2VyczogQXV0aE1hbmFnZWRVc2VyW10pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkUmVxdWVzdGVkID0gbm9ybWFsaXplVXNlcklkKHJlcXVlc3RlZFVzZXJJZCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50ID0gbm9ybWFsaXplVXNlcklkKGN1cnJlbnRBeFVzZXJJZCk7XG4gIGlmIChub3JtYWxpemVkUmVxdWVzdGVkKSB7XG4gICAgY29uc3QgZm91bmQgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZFJlcXVlc3RlZCkpO1xuICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kLmF4VXNlcklkO1xuICB9XG4gIGlmIChub3JtYWxpemVkQ3VycmVudCkge1xuICAgIGNvbnN0IHNlbGYgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZEN1cnJlbnQpKTtcbiAgICByZXR1cm4gc2VsZj8uYXhVc2VySWQgfHwgbm9ybWFsaXplZEN1cnJlbnQ7XG4gIH1cbiAgcmV0dXJuIHVzZXJzWzBdPy5heFVzZXJJZCB8fCBcIlwiO1xufTtcblxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxuY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXG4gIH0pO1xufTtcblxuY29uc3QgRXhwZW5zZVNoZWV0c1BhZ2VDb250ZW50ID0gKCkgPT4ge1xuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIlZpZXdcIik7XG4gIGNvbnN0IGNhbkNyZWF0ZUV4cGVuc2UgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkFkZFwiKTtcbiAgY29uc3QgdGltZWxpbmVDb250YWluZXJSZWYgPSBSZWFjdC51c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3Qge1xuICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXG4gICAgc3Vib3JkaW5hdGVzLFxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gICAgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICB9ID0gdXNlQXV0aENvbnRleHQoKTtcbiAgY29uc3QgbWFuYWdlZFVzZXJzID0gdXNlTWVtbyhcbiAgICAoKSA9PiBlbnN1cmVDdXJyZW50VXNlckluTGlzdChBcnJheS5pc0FycmF5KHN1Ym9yZGluYXRlcykgPyBzdWJvcmRpbmF0ZXMgOiBbXSwgY3VycmVudEF4VXNlcklkKSxcbiAgICBbY3VycmVudEF4VXNlcklkLCBzdWJvcmRpbmF0ZXNdXG4gICk7XG4gIGNvbnN0IGRlZmF1bHRNYW5hZ2VkVXNlcklkID0gdXNlTWVtbyhcbiAgICAoKSA9PiByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24oc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLCBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2VycyksXG4gICAgW2N1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzLCBzZWxlY3RlZE1hbmFnZWRVc2VySWRdXG4gICk7XG4gIGNvbnN0IG1hbmFnZWRVc2VyTGFiZWxCeUlkID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgICBtYW5hZ2VkVXNlcnMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGlkID0gbm9ybWFsaXplVXNlcklkKGVudHJ5LmF4VXNlcklkKTtcbiAgICAgIGlmICghaWQpIHJldHVybjtcbiAgICAgIGNvbnN0IG5hbWUgPSBub3JtYWxpemVVc2VySWQoZW50cnkubmFtZSk7XG4gICAgICBtYXAuc2V0KGlkLnRvVXBwZXJDYXNlKCksIG5hbWUgfHwgaWQpO1xuICAgIH0pO1xuICAgIHJldHVybiBtYXA7XG4gIH0sIFttYW5hZ2VkVXNlcnNdKTtcblxuICBjb25zdCBwYWdpbmF0aW9uTGFiZWxzID0gdXNlTWVtbyhcbiAgICAoKSA9PiAoe1xuICAgICAgZmlyc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKSxcbiAgICAgIHByZXY6IGluZFQoXCJIaXN0b3J5X1BhZ2VfUHJldlwiLCBcIlByZXZpb3VzXCIpLFxuICAgICAgbmV4dDogaW5kVChcIkhpc3RvcnlfUGFnZV9OZXh0XCIsIFwiTmV4dFwiKSxcbiAgICAgIGxhc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIiksXG4gICAgfSksXG4gICAgW11cbiAgKTtcblxuICBjb25zdCB7XG4gICAgaXRlbXMsXG4gICAgdG90YWwsXG4gICAgY3VycmVudFBhZ2UsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBsb2FkTGlzdCxcbiAgICByZXN0b3JlTGlzdFNuYXBzaG90LFxuICAgIHJlc2V0TGlzdCxcbiAgfSA9IHVzZUV4cGVuc2VTaGVldHNMaXN0RGF0YSh7XG4gICAgaGFzQWNjZXNzLFxuICAgIHBhZ2VTaXplOiBQQUdFX1NJWkUsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuXG4gIGNvbnN0IHsgcmVhZENhY2hlZFN0YXRlLCBjb25zdW1lUmV0dXJuRmxhZywgc2F2ZUNhY2hlZFN0YXRlLCBjbGVhckNhY2hlZFN0YXRlIH0gPSB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUoKTtcbiAgY29uc3QgZGlkUmVzdG9yZU9uTW91bnRSZWYgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xuICBjb25zdCBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZiA9IFJlYWN0LnVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3Qgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soXG4gICAgKHJlcXVlc3RlZFVzZXJJZDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgIGNvbnN0IHJlc29sdmVkVXNlcklkID0gcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uKHJlcXVlc3RlZFVzZXJJZCwgY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnMpO1xuICAgICAgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkKHJlc29sdmVkVXNlcklkKTtcbiAgICAgIGlmICghcmVzb2x2ZWRVc2VySWQgfHwgKGN1cnJlbnRBeFVzZXJJZCAmJiBpc1NhbWVVc2VyKHJlc29sdmVkVXNlcklkLCBjdXJyZW50QXhVc2VySWQpKSkge1xuICAgICAgICBjbGVhckV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUocmVzb2x2ZWRVc2VySWQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc29sdmVkVXNlcklkO1xuICAgIH0sXG4gICAgW2N1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzLCBzZXRTZWxlY3RlZE1hbmFnZWRVc2VySWRdXG4gICk7XG5cbiAgY29uc3Qge1xuICAgIGZyb21EYXRlLFxuICAgIHRvRGF0ZSxcbiAgICBwcm9qZWN0SWQsXG4gICAgaG9qYUdhc3Rvc0lkLFxuICAgIGN1cnJlbmN5Q29kZSxcbiAgICBtYW5hZ2VkVXNlcklkLFxuICAgIHN0YXR1c0ZpbHRlcixcbiAgICBhY3RpdmVRdWlja0ZpbHRlcixcbiAgICBzaG93TWFudWFsRGF0ZUZpbHRlcixcbiAgICBzaG93TWFudWFsRGF0ZUVycm9yLFxuICAgIG1hbnVhbERhdGVBdXRvT3BlbktleSxcbiAgICBhcHBsaWVkRmlsdGVycyxcbiAgICBzaG93RmlsdGVycyxcbiAgICBjdXJyZW50RmlsdGVycyxcbiAgICBzZXRQcm9qZWN0SWQsXG4gICAgc2V0SG9qYUdhc3Rvc0lkLFxuICAgIHNldEN1cnJlbmN5Q29kZSxcbiAgICBzZXRNYW5hZ2VkVXNlcklkLFxuICAgIHNldFN0YXR1c0ZpbHRlcixcbiAgICBvbkFwcGx5LFxuICAgIG9uQ2xlYXIsXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlLFxuICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcbiAgICBvblF1aWNrRmlsdGVyQ2hhbmdlLFxuICAgIHRvZ2dsZUZpbHRlclBhbmVsLFxuICB9ID0gdXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZSh7XG4gICAgb25BcHBseUZpbHRlcnM6IChzbmFwc2hvdCkgPT4ge1xuICAgICAgY29uc3QgcmVzb2x2ZWRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKHNuYXBzaG90Lm1hbmFnZWRVc2VySWQpO1xuICAgICAgdm9pZCBsb2FkTGlzdCgxLCB7XG4gICAgICAgIC4uLnNuYXBzaG90LFxuICAgICAgICBtYW5hZ2VkVXNlcklkOiByZXNvbHZlZE1hbmFnZWRVc2VySWQsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIG9uQ2xlYXJGaWx0ZXJzOiAoKSA9PiB7XG4gICAgICBjb25zdCByZXNldE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oY3VycmVudEF4VXNlcklkKTtcbiAgICAgIHNldE1hbmFnZWRVc2VySWQocmVzZXRNYW5hZ2VkVXNlcklkKTtcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICAgIHJlc2V0TGlzdCgpO1xuICAgIH0sXG4gICAgZGVmYXVsdE1hbmFnZWRVc2VySWQsXG4gIH0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgbm9ybWFsaXplZERlZmF1bHRNYW5hZ2VkVXNlcklkID0gbm9ybWFsaXplVXNlcklkKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcbiAgICBpZiAoIW5vcm1hbGl6ZWREZWZhdWx0TWFuYWdlZFVzZXJJZCkgcmV0dXJuO1xuICAgIHNldE1hbmFnZWRVc2VySWQobm9ybWFsaXplZERlZmF1bHRNYW5hZ2VkVXNlcklkKTtcbiAgICBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24obm9ybWFsaXplZERlZmF1bHRNYW5hZ2VkVXNlcklkKTtcbiAgfSwgW2RlZmF1bHRNYW5hZ2VkVXNlcklkLCBzZXRNYW5hZ2VkVXNlcklkLCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb25dKTtcblxuICBjb25zdCBnb1RvRGV0YWlsID0gdXNlQ2FsbGJhY2soXG4gICAgKHNoZWV0SWQ6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKCFzaGVldElkKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnMgfHwgY3VycmVudEZpbHRlcnM7XG4gICAgICBzYXZlQ2FjaGVkU3RhdGUoe1xuICAgICAgICBmaWx0ZXJzOiBzbmFwc2hvdCxcbiAgICAgICAgcGFnZTogY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLFxuICAgICAgICBzY3JvbGxZOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LnNjcm9sbFkgfHwgMCA6IDAsXG4gICAgICAgIGl0ZW1zLFxuICAgICAgICB0b3RhbCxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBpZCA9IGVuY29kZVVSSUNvbXBvbmVudChzaGVldElkKTtcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtpZH1gLCB7XG4gICAgICAgIGJ5cGFzc0d1YXJkT25jZTogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFthcHBsaWVkRmlsdGVycywgY3VycmVudEZpbHRlcnMsIGN1cnJlbnRQYWdlLCBpdGVtcywgc2F2ZUNhY2hlZFN0YXRlLCB0b3RhbF1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlU2hlZXRNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/bW9kZT1jcmVhdGVcIiwge1xuICAgICAgYnlwYXNzR3VhcmRPbmNlOiBmYWxzZSxcbiAgICB9KTtcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2VdKTtcblxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcbiAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xuICAgIGlmICghdGltZWxpbmVDb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjYXJkO1xuICB9LCBbXSk7XG5cbiAgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyh7XG4gICAgY29udGFpbmVyUmVmOiB0aW1lbGluZUNvbnRhaW5lclJlZixcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgaXRlbXMsXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXG4gIH0pO1xuXG4gIGNvbnN0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwoKHRvdGFsIHx8IDApIC8gUEFHRV9TSVpFKTtcblxuICBjb25zdCBzdW1tYXJ5SXRlbXMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoIWFwcGxpZWRGaWx0ZXJzKSB7XG4gICAgICByZXR1cm4gW10gYXMgQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9PjtcbiAgICB9XG5cbiAgICBjb25zdCBzdW1tYXJ5OiBBcnJheTx7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0+ID0gW107XG4gICAgY29uc3QgbG9jYWxlID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCI7XG4gICAgY29uc3QgZnJvbURhdGVUZXh0ID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGFwcGxpZWRGaWx0ZXJzLmZyb21EYXRlLCBsb2NhbGUsIFwiXCIpO1xuICAgIGNvbnN0IHRvRGF0ZVRleHQgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoYXBwbGllZEZpbHRlcnMudG9EYXRlLCBsb2NhbGUsIFwiXCIpO1xuXG4gICAgaWYgKGZyb21EYXRlVGV4dCB8fCB0b0RhdGVUZXh0KSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwiZnJvbURhdGVcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpLFxuICAgICAgICB2YWx1ZTogZnJvbURhdGVUZXh0IHx8IFwiLS1cIixcbiAgICAgIH0pO1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcInRvRGF0ZVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKSxcbiAgICAgICAgdmFsdWU6IHRvRGF0ZVRleHQgfHwgXCItLVwiLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGFwcGxpZWRGaWx0ZXJzLnByb2plY3RJZC50cmltKCkpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJwcm9qZWN0XCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfUHJvamVjdFwiLCBcIlByb2plY3RcIiksXG4gICAgICAgIHZhbHVlOiBhcHBsaWVkRmlsdGVycy5wcm9qZWN0SWQudHJpbSgpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChhcHBsaWVkRmlsdGVycy5ob2phR2FzdG9zSWQudHJpbSgpKSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwic2hlZXRcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TaGVldFwiLCBcIkV4cGVuc2Ugc2hlZXRcIiksXG4gICAgICAgIHZhbHVlOiBhcHBsaWVkRmlsdGVycy5ob2phR2FzdG9zSWQudHJpbSgpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChhcHBsaWVkRmlsdGVycy5jdXJyZW5jeUNvZGUudHJpbSgpKSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwiY3VycmVuY3lcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpLFxuICAgICAgICB2YWx1ZTogYXBwbGllZEZpbHRlcnMuY3VycmVuY3lDb2RlLnRyaW0oKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBhcHBsaWVkTWFuYWdlZFVzZXJJZCA9IG5vcm1hbGl6ZVVzZXJJZChhcHBsaWVkRmlsdGVycy5tYW5hZ2VkVXNlcklkKTtcbiAgICBpZiAoYXBwbGllZE1hbmFnZWRVc2VySWQgJiYgKCFjdXJyZW50QXhVc2VySWQgfHwgIWlzU2FtZVVzZXIoYXBwbGllZE1hbmFnZWRVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCkpKSB7XG4gICAgICBjb25zdCBtYW5hZ2VkVXNlckxhYmVsID0gbWFuYWdlZFVzZXJMYWJlbEJ5SWQuZ2V0KGFwcGxpZWRNYW5hZ2VkVXNlcklkLnRvVXBwZXJDYXNlKCkpIHx8IGFwcGxpZWRNYW5hZ2VkVXNlcklkO1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcIm1hbmFnZWQtdXNlclwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkNvbW1vbl9Vc2VyXCIsIFwiVXNlclwiKSxcbiAgICAgICAgdmFsdWU6IG1hbmFnZWRVc2VyTGFiZWwsXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGFwcGxpZWRGaWx0ZXJzLnN0YXR1c0ZpbHRlciAhPT0gREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJzdGF0dXNcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNcIiwgXCJFc3RhZG9cIiksXG4gICAgICAgIHZhbHVlOiBnZXRFeHBlbnNlU3RhdHVzTGFiZWwoYXBwbGllZEZpbHRlcnMuc3RhdHVzRmlsdGVyKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzdW1tYXJ5O1xuICB9LCBbYXBwbGllZEZpbHRlcnMsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJMYWJlbEJ5SWRdKTtcblxuICBjb25zdCBzaG93U3VtbWFyeSA9ICFzaG93RmlsdGVycyAmJiBzdW1tYXJ5SXRlbXMubGVuZ3RoID4gMDtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChkaWRSZXN0b3JlT25Nb3VudFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgZGlkUmVzdG9yZU9uTW91bnRSZWYuY3VycmVudCA9IHRydWU7XG5cbiAgICBpZiAoIWNvbnN1bWVSZXR1cm5GbGFnKCkpIHtcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICAgIGNvbnN0IHJlc2V0TWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihjdXJyZW50QXhVc2VySWQpO1xuICAgICAgc2V0TWFuYWdlZFVzZXJJZChyZXNldE1hbmFnZWRVc2VySWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNhY2hlZFN0YXRlID0gcmVhZENhY2hlZFN0YXRlKCk7XG4gICAgaWYgKCFjYWNoZWRTdGF0ZSkge1xuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuICAgICAgY29uc3QgcmVzZXRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGN1cnJlbnRBeFVzZXJJZCk7XG4gICAgICBzZXRNYW5hZ2VkVXNlcklkKHJlc2V0TWFuYWdlZFVzZXJJZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdG9yZWRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGNhY2hlZFN0YXRlLmZpbHRlcnMubWFuYWdlZFVzZXJJZCk7XG4gICAgY29uc3QgcmVzdG9yZWRGaWx0ZXJzID0ge1xuICAgICAgLi4uY2FjaGVkU3RhdGUuZmlsdGVycyxcbiAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCxcbiAgICB9O1xuXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKHJlc3RvcmVkRmlsdGVycyk7XG4gICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLnNjcm9sbFk7XG4gICAgaWYgKGNhY2hlZFN0YXRlLml0ZW1zLmxlbmd0aCA+IDAgfHwgY2FjaGVkU3RhdGUudG90YWwgPiAwKSB7XG4gICAgICByZXN0b3JlTGlzdFNuYXBzaG90KHtcbiAgICAgICAgaXRlbXM6IGNhY2hlZFN0YXRlLml0ZW1zLFxuICAgICAgICB0b3RhbDogY2FjaGVkU3RhdGUudG90YWwsXG4gICAgICAgIHBhZ2U6IGNhY2hlZFN0YXRlLnBhZ2UsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdm9pZCBsb2FkTGlzdChjYWNoZWRTdGF0ZS5wYWdlLCByZXN0b3JlZEZpbHRlcnMpO1xuICB9LCBbXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSxcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcbiAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgbG9hZExpc3QsXG4gICAgcmVhZENhY2hlZFN0YXRlLFxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcbiAgICByZXN0b3JlTGlzdFNuYXBzaG90LFxuICAgIHNldE1hbmFnZWRVc2VySWQsXG4gICAgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uLFxuICBdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0xvYWRpbmcpIHJldHVybjtcbiAgICBjb25zdCBwZW5kaW5nU2Nyb2xsWSA9IHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQ7XG4gICAgaWYgKHBlbmRpbmdTY3JvbGxZID09IG51bGwpIHJldHVybjtcblxuICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgdG9wOiBNYXRoLm1heCgwLCBwZW5kaW5nU2Nyb2xsWSksXG4gICAgICAgIGJlaGF2aW9yOiBcImF1dG9cIixcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LCBbY3VycmVudFBhZ2UsIGlzTG9hZGluZywgaXRlbXMubGVuZ3RoXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvblRvZ2dsZUZpbHRlcnMgPSAoKSA9PiB7XG4gICAgICBjb25zdCB3aWxsT3BlbiA9ICFzaG93RmlsdGVycztcbiAgICAgIHRvZ2dsZUZpbHRlclBhbmVsKCk7XG4gICAgICBpZiAod2lsbE9wZW4pIHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHsgdG9wOiAwLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25SZWZyZXNoID0gKCkgPT4ge1xuICAgICAgaWYgKCFhcHBsaWVkRmlsdGVycykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc29sdmVkTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihhcHBsaWVkRmlsdGVycy5tYW5hZ2VkVXNlcklkKTtcbiAgICAgIHZvaWQgbG9hZExpc3QoY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLCB7XG4gICAgICAgIC4uLmFwcGxpZWRGaWx0ZXJzLFxuICAgICAgICBtYW5hZ2VkVXNlcklkOiByZXNvbHZlZE1hbmFnZWRVc2VySWQsXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXNoZWV0cy10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXNoZWV0cy1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXNoZWV0cy10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImV4cGVuc2Utc2hlZXRzLXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcbiAgICB9O1xuICB9LCBbYXBwbGllZEZpbHRlcnMsIGN1cnJlbnRQYWdlLCBsb2FkTGlzdCwgc2hvd0ZpbHRlcnMsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbiwgdG9nZ2xlRmlsdGVyUGFuZWxdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICB7c2hvd1N1bW1hcnkgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLXN1bW1hcnkgcC0zIHNtOnAtNCBtdC0xIG1iLTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4cGVuc2Utc3VtbWFyeS1ncmlkIGdyaWQgZ3JpZC1jb2xzLTEgbWluLVszNjBweF06Z3JpZC1jb2xzLTIgaXRlbXMtc3RhcnQgZ2FwLXgtNCBnYXAteS0xIHRleHQteHNcIj5cbiAgICAgICAgICAgIHtzdW1tYXJ5SXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXtgJHtpdGVtLmtleX0tJHtpdGVtLnZhbHVlfS0ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeSBoaXN0b3J5LWZpbHRlci1zdW1tYXJ5LS1ncmlkLWl0ZW0gbGVhZGluZy01IG1pbi13LTBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeV9fbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpdGVtLmxhYmVsfTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeV9fdmFsdWUgYnJlYWstd29yZHNcIj57aXRlbS52YWx1ZX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxFeHBlbnNlRmlsdGVyc1BhbmVsXG4gICAgICAgIHZpc2libGU9e3Nob3dGaWx0ZXJzfVxuICAgICAgICBzaG93TWFudWFsRGF0ZUZpbHRlcj17c2hvd01hbnVhbERhdGVGaWx0ZXJ9XG4gICAgICAgIHNob3dNYW51YWxEYXRlRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3J9XG4gICAgICAgIG1hbnVhbERhdGVBdXRvT3BlbktleT17bWFudWFsRGF0ZUF1dG9PcGVuS2V5fVxuICAgICAgICBmcm9tRGF0ZT17ZnJvbURhdGV9XG4gICAgICAgIHRvRGF0ZT17dG9EYXRlfVxuICAgICAgICBwcm9qZWN0SWQ9e3Byb2plY3RJZH1cbiAgICAgICAgaG9qYUdhc3Rvc0lkPXtob2phR2FzdG9zSWR9XG4gICAgICAgIGN1cnJlbmN5Q29kZT17Y3VycmVuY3lDb2RlfVxuICAgICAgICBtYW5hZ2VkVXNlcklkPXttYW5hZ2VkVXNlcklkfVxuICAgICAgICBtYW5hZ2VkVXNlcnM9e21hbmFnZWRVc2Vyc31cbiAgICAgICAgc2hvd01hbmFnZWRVc2VyRmlsdGVyPXtjYW5NYW5hZ2VPdGhlclVzZXJzfVxuICAgICAgICBzdGF0dXNGaWx0ZXI9e3N0YXR1c0ZpbHRlcn1cbiAgICAgICAgYWN0aXZlUXVpY2tGaWx0ZXI9e2FjdGl2ZVF1aWNrRmlsdGVyfVxuICAgICAgICBvbkRhdGVSYW5nZUNoYW5nZT17b25EYXRlUmFuZ2VDaGFuZ2V9XG4gICAgICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZT17b25NYW51YWxSYW5nZUNvbXBsZXRlfVxuICAgICAgICBvblF1aWNrRmlsdGVyQ2hhbmdlPXtvblF1aWNrRmlsdGVyQ2hhbmdlfVxuICAgICAgICBvblByb2plY3RJZENoYW5nZT17c2V0UHJvamVjdElkfVxuICAgICAgICBvbkhvamFHYXN0b3NJZENoYW5nZT17c2V0SG9qYUdhc3Rvc0lkfVxuICAgICAgICBvbkN1cnJlbmN5Q29kZUNoYW5nZT17c2V0Q3VycmVuY3lDb2RlfVxuICAgICAgICBvbk1hbmFnZWRVc2VySWRDaGFuZ2U9e3NldE1hbmFnZWRVc2VySWR9XG4gICAgICAgIG9uU3RhdHVzRmlsdGVyQ2hhbmdlPXtzZXRTdGF0dXNGaWx0ZXJ9XG4gICAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XG4gICAgICAgIG9uQXBwbHk9e29uQXBwbHl9XG4gICAgICAvPlxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cbiAgICAgID5cbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cbiAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtlcnJvck1lc3NhZ2UgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxuXG4gICAgICB7IWlzTG9hZGluZyAmJiAhZXJyb3JNZXNzYWdlICYmIGl0ZW1zLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2luZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKX0gLz5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7IWVycm9yTWVzc2FnZSAmJiBpdGVtcy5sZW5ndGggPiAwID8gKFxuICAgICAgICA8ZGl2IHJlZj17dGltZWxpbmVDb250YWluZXJSZWZ9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveFwiPlxuICAgICAgICAgIHtpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IHNhZmVUZXh0KGl0ZW0uaG9qYUdhc3Rvc0lkKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVQYXJ0cyA9IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMoXG4gICAgICAgICAgICAgIGl0ZW0uY3JlYXRlZERhdGUsXG4gICAgICAgICAgICAgIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiLFxuICAgICAgICAgICAgICB7IHByZWZlck1vbnRoRmlyc3RPblNsYXNoOiB0cnVlIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW5jeSA9IHNhZmVUZXh0KGl0ZW0uY3VycmVuY3lDb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gc2FmZVRleHQoaXRlbS5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBjb25zdCB2b3VjaGVyID0gc2FmZVRleHQoaXRlbS52b3VjaGVyKTtcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsQW1vdW50VGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShpdGVtLnRvdGFsQW1vdW50ID8/IG51bGwsIGN1cnJlbmN5KTtcbiAgICAgICAgICAgIGNvbnN0IGZhbGxiYWNrU3RhdHVzQ29kZSA9IGhhc0Fzc2lnbmVkVm91Y2hlcih2b3VjaGVyKSA/IDQgOiAwO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzQ29kZSA9IG5vcm1hbGl6ZUV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlKGl0ZW0uZXhwZW5zZVNoZWV0U3RhdHVzLCBmYWxsYmFja1N0YXR1c0NvZGUpO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzTGFiZWwgPSBnZXRFeHBlbnNlU3RhdHVzTGFiZWwoc3RhdHVzQ29kZSk7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNDbGFzcyA9IGdldEV4cGVuc2VTdGF0dXNCYWRnZUNsYXNzTmFtZShzdGF0dXNDb2RlKTtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2Ake2lkfS0ke2luZGV4fWB9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17ZGVzY3JpcHRpb24gfHwgXCItXCJ9XG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXt0b3RhbEFtb3VudFRleHR9XG4gICAgICAgICAgICAgICAgICBvbk9wZW49eygpID0+IGdvVG9EZXRhaWwoaWQpfVxuICAgICAgICAgICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJleHBlbnNlLXNoZWV0LWNhcmRfX3RpdGxlIHRpbWVsaW5lLW5hbWVcIlxuICAgICAgICAgICAgICAgICAgc3RhdHVzQ2xhc3NOYW1lPXtzdGF0dXNDbGFzc31cbiAgICAgICAgICAgICAgICAgIHN0YXR1c0xhYmVsPXtzdGF0dXNMYWJlbH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxuICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbFBhZ2VzfVxuICAgICAgICBjdXJyZW50UGFnZT17Y3VycmVudFBhZ2V9XG4gICAgICAgIGxvYWRpbmc9e2lzTG9hZGluZ31cbiAgICAgICAgb25QYWdlQ2hhbmdlPXsocGFnZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnMgfHwgY3VycmVudEZpbHRlcnM7XG4gICAgICAgICAgY29uc3QgcmVzb2x2ZWRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKHNuYXBzaG90Lm1hbmFnZWRVc2VySWQpO1xuICAgICAgICAgIHZvaWQgbG9hZExpc3QocGFnZSwge1xuICAgICAgICAgICAgLi4uc25hcHNob3QsXG4gICAgICAgICAgICBtYW5hZ2VkVXNlcklkOiByZXNvbHZlZE1hbmFnZWRVc2VySWQsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH19XG4gICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cbiAgICAgIC8+XG5cbiAgICAgIHtjYW5DcmVhdGVFeHBlbnNlID8gKFxuICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b25cbiAgICAgICAgICByb3V0ZT1cIlwiXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiQ29tbW9uX0NyZWF0ZVwiLCBcIkNyZWF0ZVwiKX1cbiAgICAgICAgICBzaXplPXs3Nn1cbiAgICAgICAgICByaWdodD17MTZ9XG4gICAgICAgICAgYm90dG9tPXsyNH1cbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVPcGVuQ3JlYXRlU2hlZXRNb2RlfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2Ugc2hlZXRzIGxpc3QuXG5jb25zdCBFeHBlbnNlU2hlZXRzUGFnZSA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnMgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQ+XG4gICAgICA8RXhwZW5zZVNoZWV0c1BhZ2VDb250ZW50IC8+XG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgKTtcbn07XG5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2Utc2hlZXRzLXJvb3RcIik7XG4gIGlmICghcm9vdEVsKSByZXR1cm47XG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVNoZWV0c1BhZ2UgLz4pO1xufTtcblxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldHNQYWdlO1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlbW90ZVNlYXJjaENvbWJvYm94LCB7IHR5cGUgUmVtb3RlU2VhcmNoT3B0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9SZW1vdGVTZWFyY2hDb21ib2JveC50c3hcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGJ1aWxkRXhwZW5zZVNoZWV0U3VnZ2VzdFBheWxvYWQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVBheWxvYWRCdWlsZGVycy50c1wiO1xuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRMaXN0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcblxudHlwZSBFeHBlbnNlU2hlZXRGaWx0ZXJJbnB1dFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zPzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG59O1xuXG5jb25zdCBTRUFSQ0hfUEFHRV9TSVpFID0gMjA7XG5cbmNvbnN0IG1hcFNoZWV0T3B0aW9ucyA9IChpdGVtczogRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG9bXSB8IHVuZGVmaW5lZCk6IFJlbW90ZVNlYXJjaE9wdGlvbltdID0+IHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW10pXG4gICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgaWQgPSBTdHJpbmcoaXRlbT8uSG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGlmICghaWQpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IGlkLFxuICAgICAgICB0aXRsZTogaWQsXG4gICAgICAgIHN1YnRpdGxlOiBTdHJpbmcoaXRlbT8uRGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpIHx8IFwiLVwiLFxuICAgICAgfSBhcyBSZW1vdGVTZWFyY2hPcHRpb247XG4gICAgfSlcbiAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFJlbW90ZVNlYXJjaE9wdGlvbltdO1xufTtcblxuLy8gRXhwZW5zZSBzaGVldCBmaWx0ZXIgaW5wdXQgd2l0aCByZW1vdGUgbGlzdCBzdWdnZXN0aW9ucy5cbmNvbnN0IEV4cGVuc2VTaGVldEZpbHRlcklucHV0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zID0gdHJ1ZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbn06IEV4cGVuc2VTaGVldEZpbHRlcklucHV0UHJvcHMpID0+IHtcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XG5cbiAgY29uc3QgbG9hZE9wdGlvbnMgPSB1c2VDYWxsYmFjayhhc3luYyAodGVybTogc3RyaW5nLCBzaWduYWw6IEFib3J0U2lnbmFsKTogUHJvbWlzZTxSZW1vdGVTZWFyY2hPcHRpb25bXT4gPT4ge1xuICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZEV4cGVuc2VTaGVldFN1Z2dlc3RQYXlsb2FkKHRlcm0sIFNFQVJDSF9QQUdFX1NJWkUsIDEpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRMaXN0KHBheWxvYWQsIHtcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgc2lnbmFsLFxuICAgIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHJldHVybiBtYXBTaGVldE9wdGlvbnMocmVzcG9uc2U/Lkl0ZW1zKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGxvYWRPcHRpb25zUGFnZSA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlciwgc2lnbmFsOiBBYm9ydFNpZ25hbCkgPT4ge1xuICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZEV4cGVuc2VTaGVldFN1Z2dlc3RQYXlsb2FkKHRlcm0sIHBhZ2VTaXplLCBwYWdlKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0TGlzdChwYXlsb2FkLCB7XG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgIHNpZ25hbCxcbiAgICB9KTtcblxuICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgdG90YWw6IDAsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogbWFwU2hlZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyksXG4gICAgICB0b3RhbDogTnVtYmVyKHJlc3BvbnNlPy5Ub3RhbCB8fCAwKSxcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgaWYgKCFlbmFibGVSZW1vdGVTdWdnZXN0aW9ucyB8fCByZWFkT25seU1vZGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAge3Nob3dMYWJlbCA/IChcbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgc3R5bGU9e3sgY29sb3I6IFwiIzAwMjk2YmUwXCIgfX0+XG4gICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHB4LTMgcHktMiB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgdGV4dC1zbGF0ZS05MDAgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxuICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8UmVtb3RlU2VhcmNoQ29tYm9ib3hcbiAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgIG9uU2VhcmNoPXthc3luYyAodGVybSwgc2lnbmFsKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGxvYWRPcHRpb25zKHRlcm0sIHNpZ25hbCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICAgIG9uU2VhcmNoUGFnZT17YXN5bmMgKHRlcm0sIHBhZ2UsIHBhZ2VTaXplLCBzaWduYWwpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbG9hZE9wdGlvbnNQYWdlKHRlcm0sIHBhZ2UsIHBhZ2VTaXplLCBzaWduYWwpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGl0ZW1zOiBbXSwgdG90YWw6IDAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH19XG4gICAgICBpZEJhc2U9XCJleHBlbnNlLXNoZWV0LWZpbHRlclwiXG4gICAgICBtaW5TZWFyY2hMZW5ndGg9ezB9XG4gICAgICBwYWdlU2l6ZT17U0VBUkNIX1BBR0VfU0laRX1cbiAgICAgIGFsbG93RW1wdHlTZWFyY2hcbiAgICAgIGxvYWRPbk9wZW5cbiAgICAgIGluZmluaXRlU2Nyb2xsXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0RmlsdGVySW5wdXQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIsIGdldEV4cGVuc2VTdGF0dXNGaWx0ZXJPcHRpb25zLCBub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVN0YXR1c0NhdGFsb2cudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcblxudHlwZSBFeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZTtcbiAgb25DaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUpID0+IHZvaWQ7XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xufTtcblxuLy8gU2hhcmVkIGZpeGVkIHN0YXR1cyBmaWx0ZXIgc2VsZWN0IHVzaW5nIHRoZSBjYW5vbmljYWwgc3RhdHVzIGNhdGFsb2cuXG5jb25zdCBFeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG59OiBFeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0UHJvcHMpID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiBnZXRFeHBlbnNlU3RhdHVzRmlsdGVyT3B0aW9ucygpLCBbXSk7XG4gIGNvbnN0IHVpVmFsdWUgPSB2YWx1ZSA9PT0gREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIgPyBcIlwiIDogdmFsdWU7XG5cbiAgcmV0dXJuIChcbiAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICB2YWx1ZT17dWlWYWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiBvbkNoYW5nZShub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZShuZXh0VmFsdWUsIERFRkFVTFRfRVhQRU5TRV9TVEFUVVNfRklMVEVSKSl9XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICBpZEJhc2U9XCJleHBlbnNlLXN0YXR1cy1maWx0ZXJcIlxuICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZURhdGVSYW5nZUZpbHRlciBmcm9tIFwiLi9FeHBlbnNlRGF0ZVJhbmdlRmlsdGVyLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VGaWx0ZXJBY3Rpb25zIGZyb20gXCIuL0V4cGVuc2VGaWx0ZXJBY3Rpb25zLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dCBmcm9tIFwiLi9FeHBlbnNlUHJvamVjdEZpbHRlcklucHV0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJzIGZyb20gXCIuL0V4cGVuc2VRdWlja0RhdGVGaWx0ZXJzLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VTaGVldEZpbHRlcklucHV0IGZyb20gXCIuL0V4cGVuc2VTaGVldEZpbHRlcklucHV0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VTdGF0dXNGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZVN0YXR1c0ZpbHRlclNlbGVjdC50c3hcIjtcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi4vLi4vdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVN1bW1hcnkudHN4XCI7XG5pbXBvcnQgdHlwZSB7IEF1dGhNYW5hZ2VkVXNlciB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlUXVpY2tGaWx0ZXJJZCB9IGZyb20gXCIuLi9saXN0L2V4cGVuc2VMaXN0VHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5cbmV4cG9ydCB0eXBlIHsgRXhwZW5zZVF1aWNrRmlsdGVySWQgfTtcblxuY29uc3QgcGFyc2VJc29EYXRlID0gKHJhdzogc3RyaW5nKTogRGF0ZSB8IG51bGwgPT4ge1xuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKHJhdykudHJpbSgpLnNwbGl0KFwiVFwiKVswXTtcbiAgaWYgKCEvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdCh2YWx1ZSkpIHJldHVybiBudWxsO1xuICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSB2YWx1ZS5zcGxpdChcIi1cIikubWFwKE51bWJlcik7XG4gIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG59O1xuXG5jb25zdCBmb3JtYXREYXRlID0gKHJhdzogc3RyaW5nLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGRhdGUgPSBwYXJzZUlzb0RhdGUocmF3KTtcbiAgaWYgKCFkYXRlKSByZXR1cm4gXCItLVwiO1xuICByZXR1cm4gZGF0ZVxuICAgIC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7XG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxuICAgICAgbW9udGg6IFwic2hvcnRcIixcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgIH0pXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xufTtcblxudHlwZSBFeHBlbnNlRmlsdGVyc1BhbmVsUHJvcHMgPSB7XG4gIHZpc2libGU6IGJvb2xlYW47XG4gIHNob3dNYW51YWxEYXRlRmlsdGVyOiBib29sZWFuO1xuICBtYW51YWxEYXRlQXV0b09wZW5LZXk6IG51bWJlcjtcbiAgZnJvbURhdGU6IHN0cmluZztcbiAgdG9EYXRlOiBzdHJpbmc7XG4gIHByb2plY3RJZDogc3RyaW5nO1xuICBob2phR2FzdG9zSWQ6IHN0cmluZztcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIG1hbmFnZWRVc2VySWQ6IHN0cmluZztcbiAgbWFuYWdlZFVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXTtcbiAgc2hvd01hbmFnZWRVc2VyRmlsdGVyOiBib29sZWFuO1xuICBzdGF0dXNGaWx0ZXI6IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlO1xuICBhY3RpdmVRdWlja0ZpbHRlcjogRXhwZW5zZVF1aWNrRmlsdGVySWQgfCBudWxsO1xuICBzaG93TWFudWFsRGF0ZUVycm9yOiBib29sZWFuO1xuICBvbkRhdGVSYW5nZUNoYW5nZTogKGZyb21EYXRlOiBzdHJpbmcsIHRvRGF0ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbk1hbnVhbFJhbmdlQ29tcGxldGU6IChmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25RdWlja0ZpbHRlckNoYW5nZTogKGZpbHRlcklkOiBFeHBlbnNlUXVpY2tGaWx0ZXJJZCkgPT4gdm9pZDtcbiAgb25Qcm9qZWN0SWRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkhvamFHYXN0b3NJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uQ3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25NYW5hZ2VkVXNlcklkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25TdGF0dXNGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUpID0+IHZvaWQ7XG4gIG9uQ2xlYXI6ICgpID0+IHZvaWQ7XG4gIG9uQXBwbHk6ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBTaGFyZWQgZXhwZW5zZSBzaGVldCBmaWx0ZXIgcGFuZWwgY29tcG9zZWQgZnJvbSByZXVzYWJsZSBtb2R1bGUgY29tcG9uZW50cy5cbmNvbnN0IEV4cGVuc2VGaWx0ZXJzUGFuZWwgPSAoe1xuICB2aXNpYmxlLFxuICBzaG93TWFudWFsRGF0ZUZpbHRlcixcbiAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxuICBmcm9tRGF0ZSxcbiAgdG9EYXRlLFxuICBwcm9qZWN0SWQsXG4gIGhvamFHYXN0b3NJZCxcbiAgY3VycmVuY3lDb2RlLFxuICBtYW5hZ2VkVXNlcklkLFxuICBtYW5hZ2VkVXNlcnMsXG4gIHNob3dNYW5hZ2VkVXNlckZpbHRlcixcbiAgc3RhdHVzRmlsdGVyLFxuICBhY3RpdmVRdWlja0ZpbHRlcixcbiAgc2hvd01hbnVhbERhdGVFcnJvcixcbiAgb25EYXRlUmFuZ2VDaGFuZ2UsXG4gIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcbiAgb25RdWlja0ZpbHRlckNoYW5nZSxcbiAgb25Qcm9qZWN0SWRDaGFuZ2UsXG4gIG9uSG9qYUdhc3Rvc0lkQ2hhbmdlLFxuICBvbkN1cnJlbmN5Q29kZUNoYW5nZSxcbiAgb25NYW5hZ2VkVXNlcklkQ2hhbmdlLFxuICBvblN0YXR1c0ZpbHRlckNoYW5nZSxcbiAgb25DbGVhcixcbiAgb25BcHBseSxcbn06IEV4cGVuc2VGaWx0ZXJzUGFuZWxQcm9wcykgPT4ge1xuICBpZiAoIXZpc2libGUpIHJldHVybiBudWxsO1xuICBjb25zdCBsb2NhbGUgPSBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIjtcbiAgY29uc3Qgc2hvd0lubGluZURhdGVTdW1tYXJ5ID0gIXNob3dNYW51YWxEYXRlRmlsdGVyICYmICEhZnJvbURhdGUgJiYgISF0b0RhdGU7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1leHBhbmRlZCBwLTIgc206cC0yLjUgcmVsYXRpdmVcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3RhY2sgZmxleCBmbGV4LWNvbCBzcGFjZS15LTJcIj5cbiAgICAgICAgPEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJzIGFjdGl2ZVF1aWNrRmlsdGVyPXthY3RpdmVRdWlja0ZpbHRlcn0gb25RdWlja0ZpbHRlckNoYW5nZT17b25RdWlja0ZpbHRlckNoYW5nZX0gLz5cblxuICAgICAgICB7c2hvd01hbnVhbERhdGVGaWx0ZXIgPyAoXG4gICAgICAgICAgPEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXJcbiAgICAgICAgICAgIGZyb21EYXRlPXtmcm9tRGF0ZX1cbiAgICAgICAgICAgIHRvRGF0ZT17dG9EYXRlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRGF0ZVJhbmdlQ2hhbmdlfVxuICAgICAgICAgICAgb25SYW5nZUNvbXBsZXRlPXtvbk1hbnVhbFJhbmdlQ29tcGxldGV9XG4gICAgICAgICAgICBhdXRvT3BlblJlcXVlc3RJZD17bWFudWFsRGF0ZUF1dG9PcGVuS2V5fVxuICAgICAgICAgICAgc2hvd01hbnVhbEVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yfVxuICAgICAgICAgICAgc2hvd1N0YXJ0RXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3IgJiYgIWZyb21EYXRlfVxuICAgICAgICAgICAgc2hvd0VuZEVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yICYmICF0b0RhdGV9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IHNob3dJbmxpbmVEYXRlU3VtbWFyeSA/IChcbiAgICAgICAgICA8SGlzdG9yeVN1bW1hcnlcbiAgICAgICAgICAgIHN1bW1hcnlGcm9tTGFiZWw9e2luZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpfVxuICAgICAgICAgICAgc3VtbWFyeVRvTGFiZWw9e2luZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIil9XG4gICAgICAgICAgICBmcm9tVmFsdWU9e2Zvcm1hdERhdGUoZnJvbURhdGUsIGxvY2FsZSl9XG4gICAgICAgICAgICB0b1ZhbHVlPXtmb3JtYXREYXRlKHRvRGF0ZSwgbG9jYWxlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImdhcC15LTEgdGV4dC1bMTFweF0gcHgtMVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yICR7c2hvd01hbmFnZWRVc2VyRmlsdGVyID8gXCJsZzpncmlkLWNvbHMtNVwiIDogXCJsZzpncmlkLWNvbHMtNFwifSBnYXAtMmB9PlxuICAgICAgICAgIDxFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtwcm9qZWN0SWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25Qcm9qZWN0SWRDaGFuZ2V9XG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8RXhwZW5zZVNoZWV0RmlsdGVySW5wdXRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU2hlZXRcIiwgXCJFeHBlbnNlIHNoZWV0XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TaGVldFwiLCBcIkV4cGVuc2Ugc2hlZXRcIil9XG4gICAgICAgICAgICB2YWx1ZT17aG9qYUdhc3Rvc0lkfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uSG9qYUdhc3Rvc0lkQ2hhbmdlfVxuICAgICAgICAgICAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnNcbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtjdXJyZW5jeUNvZGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25DdXJyZW5jeUNvZGVDaGFuZ2V9XG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgc2hvd0xvYWRpbmdTdGF0ZVRleHQ9e2ZhbHNlfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICB7c2hvd01hbmFnZWRVc2VyRmlsdGVyID8gKFxuICAgICAgICAgICAgPEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkNvbW1vbl9Vc2VyXCIsIFwiVXNlclwiKX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJDb21tb25fVXNlclwiLCBcIlVzZXJcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXttYW5hZ2VkVXNlcklkfVxuICAgICAgICAgICAgICB1c2Vycz17bWFuYWdlZFVzZXJzfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25NYW5hZ2VkVXNlcklkQ2hhbmdlfVxuICAgICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgIDxFeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1N0YXR1c1wiLCBcIkVzdGFkb1wiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzX1BsYWNlaG9sZGVyXCIsIFwiRXN0YWRvXCIpfVxuICAgICAgICAgICAgdmFsdWU9e3N0YXR1c0ZpbHRlcn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvblN0YXR1c0ZpbHRlckNoYW5nZX1cbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPEV4cGVuc2VGaWx0ZXJBY3Rpb25zXG4gICAgICAgICAgY2xlYXJMYWJlbD17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsZWFyXCIsIFwiQ2xlYXJcIil9XG4gICAgICAgICAgYXBwbHlMYWJlbD17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0FwcGx5XCIsIFwiQXBwbHlcIil9XG4gICAgICAgICAgb25DbGVhcj17b25DbGVhcn1cbiAgICAgICAgICBvbkFwcGx5PXtvbkFwcGx5fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlRmlsdGVyc1BhbmVsO1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0Q2FyZCwgRXhwZW5zZVNoZWV0TGlzdEZpbHRlcnMgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBidWlsZEV4cGVuc2VMaXN0UGF5bG9hZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlUGF5bG9hZEJ1aWxkZXJzLnRzXCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldExpc3QsIG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcblxudHlwZSBVc2VFeHBlbnNlU2hlZXRzTGlzdERhdGFBcmdzID0ge1xuICBoYXNBY2Nlc3M6IGJvb2xlYW47XG4gIHBhZ2VTaXplOiBudW1iZXI7XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gT3ducyBsaXN0IGRhdGEgZmV0Y2gsIGxvYWRpbmcgc3RhdGUsIGFuZCBwYWdpbmF0aW9uIG1ldGFkYXRhLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldHNMaXN0RGF0YSA9ICh7IGhhc0FjY2VzcywgcGFnZVNpemUsIG9uRm9yYmlkZGVuIH06IFVzZUV4cGVuc2VTaGVldHNMaXN0RGF0YUFyZ3MpID0+IHtcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRDYXJkW10+KFtdKTtcbiAgY29uc3QgW3RvdGFsLCBzZXRUb3RhbF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2N1cnJlbnRQYWdlLCBzZXRDdXJyZW50UGFnZV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIGNvbnN0IHJlc3RvcmVMaXN0U25hcHNob3QgPSB1c2VDYWxsYmFjayhcbiAgICAoc25hcHNob3Q6IHsgaXRlbXM6IEV4cGVuc2VTaGVldENhcmRbXTsgdG90YWw6IG51bWJlcjsgcGFnZTogbnVtYmVyIH0pID0+IHtcbiAgICAgIGNvbnN0IHNhZmVJdGVtcyA9IEFycmF5LmlzQXJyYXkoc25hcHNob3QuaXRlbXMpID8gc25hcHNob3QuaXRlbXMgOiBbXTtcbiAgICAgIGNvbnN0IHNhZmVUb3RhbFJhdyA9IE51bWJlcihzbmFwc2hvdC50b3RhbCk7XG4gICAgICBjb25zdCBzYWZlVG90YWwgPSBOdW1iZXIuaXNGaW5pdGUoc2FmZVRvdGFsUmF3KSAmJiBzYWZlVG90YWxSYXcgPj0gMCA/IHNhZmVUb3RhbFJhdyA6IHNhZmVJdGVtcy5sZW5ndGg7XG4gICAgICBjb25zdCBzYWZlUGFnZVJhdyA9IE51bWJlcihzbmFwc2hvdC5wYWdlKTtcbiAgICAgIGNvbnN0IHNhZmVQYWdlID0gTnVtYmVyLmlzRmluaXRlKHNhZmVQYWdlUmF3KSAmJiBzYWZlUGFnZVJhdyA+IDAgPyBNYXRoLmZsb29yKHNhZmVQYWdlUmF3KSA6IDE7XG5cbiAgICAgIHNldEl0ZW1zKHNhZmVJdGVtcyk7XG4gICAgICBzZXRUb3RhbChzYWZlVG90YWwpO1xuICAgICAgc2V0Q3VycmVudFBhZ2Uoc2FmZVBhZ2UpO1xuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICB9LFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgbG9hZExpc3QgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAocGFnZTogbnVtYmVyLCBmaWx0ZXJzOiBFeHBlbnNlU2hlZXRMaXN0RmlsdGVycykgPT4ge1xuICAgICAgaWYgKCFoYXNBY2Nlc3MpIHtcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgICBjb25zdCBwYXlsb2FkID0gYnVpbGRFeHBlbnNlTGlzdFBheWxvYWQoZmlsdGVycywgcGFnZSwgcGFnZVNpemUpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0TGlzdChwYXlsb2FkLCB7XG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0cy5cIikpO1xuICAgICAgICAgIHNldEl0ZW1zKFtdKTtcbiAgICAgICAgICBzZXRUb3RhbCgwKTtcbiAgICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXh0SXRlbXMgPSAoQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXSkubWFwKChpdGVtKSA9PlxuICAgICAgICAgIG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkKGl0ZW0pXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG5leHRUb3RhbCA9IE51bWJlcihyZXNwb25zZT8uVG90YWwgPz8gbmV4dEl0ZW1zLmxlbmd0aCA/PyAwKTtcbiAgICAgICAgc2V0SXRlbXMobmV4dEl0ZW1zKTtcbiAgICAgICAgc2V0VG90YWwobmV4dFRvdGFsKTtcbiAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0cy5cIik7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgc2V0SXRlbXMoW10pO1xuICAgICAgICBzZXRUb3RhbCgwKTtcbiAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2hhc0FjY2Vzcywgb25Gb3JiaWRkZW4sIHBhZ2VTaXplXVxuICApO1xuXG4gIGNvbnN0IHJlc2V0TGlzdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRJdGVtcyhbXSk7XG4gICAgc2V0VG90YWwoMCk7XG4gICAgc2V0Q3VycmVudFBhZ2UoMSk7XG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBpdGVtcyxcbiAgICB0b3RhbCxcbiAgICBjdXJyZW50UGFnZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGxvYWRMaXN0LFxuICAgIHJlc3RvcmVMaXN0U25hcHNob3QsXG4gICAgcmVzZXRMaXN0LFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVF1aWNrRmlsdGVySWQsIEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuL2V4cGVuc2VMaXN0VHlwZXMudHNcIjtcbmltcG9ydCB7IERFRkFVTFRfRVhQRU5TRV9TVEFUVVNfRklMVEVSIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlU3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZEYXksIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplRXhwZW5zZUZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZUZpbHRlclNuYXBzaG90LnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZUFyZ3MgPSB7XG4gIG9uQXBwbHlGaWx0ZXJzOiAoc25hcHNob3Q6IEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4gdm9pZDtcbiAgb25DbGVhckZpbHRlcnM6ICgpID0+IHZvaWQ7XG4gIGRlZmF1bHRNYW5hZ2VkVXNlcklkOiBzdHJpbmc7XG59O1xuXG4vLyBPd25zIGZpbHRlciBVSSBzdGF0ZSBhbmQgYXBwbHkvY2xlYXIgcnVsZXMgZm9yIGV4cGVuc2UgbGlzdCBwYWdlLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJzU3RhdGUgPSAoe1xuICBvbkFwcGx5RmlsdGVycyxcbiAgb25DbGVhckZpbHRlcnMsXG4gIGRlZmF1bHRNYW5hZ2VkVXNlcklkLFxufTogVXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZUFyZ3MpID0+IHtcbiAgY29uc3QgW2Zyb21EYXRlLCBzZXRGcm9tRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3RvRGF0ZSwgc2V0VG9EYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbcHJvamVjdElkLCBzZXRQcm9qZWN0SWRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtob2phR2FzdG9zSWQsIHNldEhvamFHYXN0b3NJZF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2N1cnJlbmN5Q29kZSwgc2V0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFuYWdlZFVzZXJJZCwgc2V0TWFuYWdlZFVzZXJJZF0gPSB1c2VTdGF0ZShkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XG4gIGNvbnN0IFtzdGF0dXNGaWx0ZXIsIHNldFN0YXR1c0ZpbHRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZT4oREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIpO1xuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlID0gbnVsbDtcbiAgY29uc3QgW2FjdGl2ZVF1aWNrRmlsdGVyLCBzZXRBY3RpdmVRdWlja0ZpbHRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlUXVpY2tGaWx0ZXJJZCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd01hbnVhbERhdGVGaWx0ZXIsIHNldFNob3dNYW51YWxEYXRlRmlsdGVyXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dNYW51YWxEYXRlRXJyb3IsIHNldFNob3dNYW51YWxEYXRlRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWFudWFsRGF0ZUF1dG9PcGVuS2V5LCBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXldID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFthcHBsaWVkRmlsdGVycywgc2V0QXBwbGllZEZpbHRlcnNdID0gdXNlU3RhdGU8QXBwbGllZEZpbHRlclNuYXBzaG90IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzaG93RmlsdGVycywgc2V0U2hvd0ZpbHRlcnNdID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgY29uc3QgY3VycmVudEZpbHRlcnMgPSB1c2VNZW1vPEFwcGxpZWRGaWx0ZXJTbmFwc2hvdD4oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZyb21EYXRlLFxuICAgICAgdG9EYXRlLFxuICAgICAgcHJvamVjdElkLFxuICAgICAgaG9qYUdhc3Rvc0lkLFxuICAgICAgY3VycmVuY3lDb2RlLFxuICAgICAgbWFuYWdlZFVzZXJJZCxcbiAgICAgIHN0YXR1c0ZpbHRlcixcbiAgICAgIGV4Y2hhbmdlUmF0ZU1vZGUsXG4gICAgICBmaWx0ZXI6IGhvamFHYXN0b3NJZCxcbiAgICB9KSxcbiAgICBbY3VycmVuY3lDb2RlLCBmcm9tRGF0ZSwgaG9qYUdhc3Rvc0lkLCBtYW5hZ2VkVXNlcklkLCBwcm9qZWN0SWQsIHN0YXR1c0ZpbHRlciwgdG9EYXRlXVxuICApO1xuXG4gIGNvbnN0IG9uQXBwbHkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFmcm9tRGF0ZSB8fCAhdG9EYXRlKSB7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKHRydWUpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIodHJ1ZSk7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzbmFwc2hvdDogQXBwbGllZEZpbHRlclNuYXBzaG90ID0ge1xuICAgICAgZnJvbURhdGUsXG4gICAgICB0b0RhdGUsXG4gICAgICBwcm9qZWN0SWQsXG4gICAgICBob2phR2FzdG9zSWQsXG4gICAgICBjdXJyZW5jeUNvZGUsXG4gICAgICBtYW5hZ2VkVXNlcklkLFxuICAgICAgc3RhdHVzRmlsdGVyLFxuICAgICAgZXhjaGFuZ2VSYXRlTW9kZSxcbiAgICAgIGZpbHRlcjogaG9qYUdhc3Rvc0lkLFxuICAgIH07XG5cbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICBzZXRBcHBsaWVkRmlsdGVycyhzbmFwc2hvdCk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcbiAgICBvbkFwcGx5RmlsdGVycyhzbmFwc2hvdCk7XG4gIH0sIFtjdXJyZW5jeUNvZGUsIGZyb21EYXRlLCBob2phR2FzdG9zSWQsIG1hbmFnZWRVc2VySWQsIG9uQXBwbHlGaWx0ZXJzLCBwcm9qZWN0SWQsIHN0YXR1c0ZpbHRlciwgdG9EYXRlXSk7XG5cbiAgLy8gUmVoeWRyYXRlcyB0aGUgbGlzdCBmaWx0ZXJzIGZyb20gYSBjYWNoZWQgc25hcHNob3Qgd2hlbiByZXR1cm5pbmcgZnJvbSBkZXRhaWwuXG4gIGNvbnN0IHJlc3RvcmVBcHBsaWVkRmlsdGVycyA9IHVzZUNhbGxiYWNrKChzbmFwc2hvdDogQXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB7XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VGaWx0ZXJTbmFwc2hvdChzbmFwc2hvdCk7XG4gICAgY29uc3QgcmVzdG9yZWRNYW5hZ2VkVXNlcklkID0gU3RyaW5nKG5vcm1hbGl6ZWQubWFuYWdlZFVzZXJJZCB8fCBkZWZhdWx0TWFuYWdlZFVzZXJJZCkudHJpbSgpO1xuICAgIHNldEZyb21EYXRlKG5vcm1hbGl6ZWQuZnJvbURhdGUpO1xuICAgIHNldFRvRGF0ZShub3JtYWxpemVkLnRvRGF0ZSk7XG4gICAgc2V0UHJvamVjdElkKG5vcm1hbGl6ZWQucHJvamVjdElkKTtcbiAgICBzZXRIb2phR2FzdG9zSWQobm9ybWFsaXplZC5ob2phR2FzdG9zSWQpO1xuICAgIHNldEN1cnJlbmN5Q29kZShub3JtYWxpemVkLmN1cnJlbmN5Q29kZSk7XG4gICAgc2V0TWFuYWdlZFVzZXJJZChyZXN0b3JlZE1hbmFnZWRVc2VySWQpO1xuICAgIHNldFN0YXR1c0ZpbHRlcihub3JtYWxpemVkLnN0YXR1c0ZpbHRlcik7XG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgIHNldEFwcGxpZWRGaWx0ZXJzKHtcbiAgICAgIC4uLm5vcm1hbGl6ZWQsXG4gICAgICBtYW5hZ2VkVXNlcklkOiByZXN0b3JlZE1hbmFnZWRVc2VySWQsXG4gICAgfSk7XG4gICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICB9LCBbZGVmYXVsdE1hbmFnZWRVc2VySWRdKTtcblxuICBjb25zdCBvbkNsZWFyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEZyb21EYXRlKFwiXCIpO1xuICAgIHNldFRvRGF0ZShcIlwiKTtcbiAgICBzZXRQcm9qZWN0SWQoXCJcIik7XG4gICAgc2V0SG9qYUdhc3Rvc0lkKFwiXCIpO1xuICAgIHNldEN1cnJlbmN5Q29kZShcIlwiKTtcbiAgICBzZXRNYW5hZ2VkVXNlcklkKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcbiAgICBzZXRTdGF0dXNGaWx0ZXIoREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXkoMCk7XG4gICAgc2V0QXBwbGllZEZpbHRlcnMobnVsbCk7XG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gICAgb25DbGVhckZpbHRlcnMoKTtcbiAgfSwgW2RlZmF1bHRNYW5hZ2VkVXNlcklkLCBvbkNsZWFyRmlsdGVyc10pO1xuXG4gIGNvbnN0IG9uRGF0ZVJhbmdlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXG4gICAgKG5leHRGcm9tRGF0ZTogc3RyaW5nLCBuZXh0VG9EYXRlOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGhhc0Z1bGxSYW5nZSA9ICEhbmV4dEZyb21EYXRlICYmICEhbmV4dFRvRGF0ZTtcbiAgICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XG4gICAgICBzZXRUb0RhdGUobmV4dFRvRGF0ZSk7XG4gICAgICBpZiAoIWhhc0Z1bGxSYW5nZSkge1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcbiAgICAgIH1cbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgaWYgKHNob3dNYW51YWxEYXRlRXJyb3IpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcighaGFzRnVsbFJhbmdlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtzaG93TWFudWFsRGF0ZUVycm9yXVxuICApO1xuXG4gIC8vIENsb3NlcyB0aGUgbWFudWFsIGRhdGUgVUkgb25jZSB0aGUgdXNlciBmaW5pc2hlcyBzZWxlY3RpbmcgYSBmdWxsIHJhbmdlLlxuICBjb25zdCBvbk1hbnVhbFJhbmdlQ29tcGxldGUgPSB1c2VDYWxsYmFjaygobmV4dEZyb21EYXRlOiBzdHJpbmcsIG5leHRUb0RhdGU6IHN0cmluZykgPT4ge1xuICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XG4gICAgc2V0VG9EYXRlKG5leHRUb0RhdGUpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG9uUXVpY2tGaWx0ZXJDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAoZmlsdGVySWQ6IEV4cGVuc2VRdWlja0ZpbHRlcklkKSA9PiB7XG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiY3VzdG9tXCIpIHtcbiAgICAgICAgLy8gVG9nZ2xlIG1hbnVhbCBkYXRlIGNvbnRyb2xzIG9uIGV2ZXJ5IERhdGUgYnV0dG9uIGNsaWNrLlxuICAgICAgICBpZiAoc2hvd01hbnVhbERhdGVGaWx0ZXIpIHtcbiAgICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKHRydWUpO1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICAgICAgLy8gQWx3YXlzIGFzayB0aGUgZGF0ZSBjb21wb25lbnQgdG8gb3BlbiB0aGUgY2FsZW5kYXIgd2hlbiBEYXRlIGlzIHByZXNzZWQuXG4gICAgICAgIHNldE1hbnVhbERhdGVBdXRvT3BlbktleSgocHJldmlvdXMpID0+IHByZXZpb3VzICsgMSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoZmlsdGVySWQpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG5cbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcbiAgICAgIGNvbnN0IG5leHRGcm9tID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtN1wiKSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gNik7XG4gICAgICB9IGVsc2UgaWYgKGZpbHRlcklkID09PSBcImRheXMtMzBcIikge1xuICAgICAgICBuZXh0RnJvbS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDI5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gODkpO1xuICAgICAgfVxuXG4gICAgICBzZXRGcm9tRGF0ZSh0b0lzb0RhdGUobmV4dEZyb20pKTtcbiAgICAgIHNldFRvRGF0ZSh0b0lzb0RhdGUodG9kYXkpKTtcbiAgICB9LFxuICAgIFtzaG93TWFudWFsRGF0ZUZpbHRlcl1cbiAgKTtcblxuICBjb25zdCB0b2dnbGVGaWx0ZXJQYW5lbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRTaG93RmlsdGVycygocHJldmlvdXMpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSAhcHJldmlvdXM7XG4gICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIGZyb21EYXRlLFxuICAgIHRvRGF0ZSxcbiAgICBwcm9qZWN0SWQsXG4gICAgaG9qYUdhc3Rvc0lkLFxuICAgIGN1cnJlbmN5Q29kZSxcbiAgICBtYW5hZ2VkVXNlcklkLFxuICAgIHN0YXR1c0ZpbHRlcixcbiAgICBleGNoYW5nZVJhdGVNb2RlLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxuICAgIGFwcGxpZWRGaWx0ZXJzLFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIGN1cnJlbnRGaWx0ZXJzLFxuICAgIHNldFByb2plY3RJZCxcbiAgICBzZXRIb2phR2FzdG9zSWQsXG4gICAgc2V0Q3VycmVuY3lDb2RlLFxuICAgIHNldE1hbmFnZWRVc2VySWQsXG4gICAgc2V0U3RhdHVzRmlsdGVyLFxuICAgIG9uQXBwbHksXG4gICAgb25DbGVhcixcbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMsXG4gICAgb25EYXRlUmFuZ2VDaGFuZ2UsXG4gICAgb25NYW51YWxSYW5nZUNvbXBsZXRlLFxuICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXG4gICAgdG9nZ2xlRmlsdGVyUGFuZWwsXG4gIH07XG59O1xuIiwgImltcG9ydCB0eXBlIHsgQXBwbGllZEZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZUxpc3RUeXBlcy50c1wiO1xuaW1wb3J0IHsgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIsIG5vcm1hbGl6ZUV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlU3RhdHVzQ2F0YWxvZy50c1wiO1xuXG4vLyBOb3JtYWxpemVzIGFuIGV4cGVuc2UgZmlsdGVyIHNuYXBzaG90IHNvIGNhY2hlIGFuZCBVSSB1c2Ugb25lIGNhbm9uaWNhbCBzaGFwZS5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlRmlsdGVyU25hcHNob3QgPSAoXG4gIHZhbHVlOiBQYXJ0aWFsPEFwcGxpZWRGaWx0ZXJTbmFwc2hvdD4gfCBudWxsIHwgdW5kZWZpbmVkXG4pOiBBcHBsaWVkRmlsdGVyU25hcHNob3QgPT4ge1xuICBjb25zdCBleHBlbnNlU2hlZXRTdGF0dXNSYXcgPSBOdW1iZXIoXG4gICAgKHZhbHVlIGFzIHsgZXhwZW5zZVNoZWV0U3RhdHVzPzogdW5rbm93biB9IHwgbnVsbCB8IHVuZGVmaW5lZCk/LmV4cGVuc2VTaGVldFN0YXR1c1xuICApO1xuICBjb25zdCBiaWxsZWRNb2RlUmF3ID0gTnVtYmVyKCh2YWx1ZSBhcyB7IGJpbGxlZE1vZGU/OiB1bmtub3duIH0gfCBudWxsIHwgdW5kZWZpbmVkKT8uYmlsbGVkTW9kZSk7XG4gIGNvbnN0IGhhc0V4cGxpY2l0U3RhdHVzID0gTnVtYmVyLmlzSW50ZWdlcihleHBlbnNlU2hlZXRTdGF0dXNSYXcpICYmIGV4cGVuc2VTaGVldFN0YXR1c1JhdyA+PSAwICYmIGV4cGVuc2VTaGVldFN0YXR1c1JhdyA8PSA0O1xuICBjb25zdCBsZWdhY3lTdGF0dXNGYWxsYmFjayA9IGJpbGxlZE1vZGVSYXcgPT09IDEgPyA0IDogYmlsbGVkTW9kZVJhdyA9PT0gMCA/IDAgOiBERUZBVUxUX0VYUEVOU0VfU1RBVFVTX0ZJTFRFUjtcbiAgY29uc3Qgc3RhdHVzRmlsdGVyID0gbm9ybWFsaXplRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUoXG4gICAgaGFzRXhwbGljaXRTdGF0dXMgPyBleHBlbnNlU2hlZXRTdGF0dXNSYXcgOiB2YWx1ZT8uc3RhdHVzRmlsdGVyLFxuICAgIGxlZ2FjeVN0YXR1c0ZhbGxiYWNrXG4gICk7XG4gIGNvbnN0IGhvamFHYXN0b3NJZCA9IFN0cmluZyh2YWx1ZT8uaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKTtcbiAgY29uc3QgbWFuYWdlZFVzZXJJZCA9IFN0cmluZygodmFsdWUgYXMgeyBtYW5hZ2VkVXNlcklkPzogdW5rbm93biB9IHwgbnVsbCB8IHVuZGVmaW5lZCk/Lm1hbmFnZWRVc2VySWQgfHwgXCJcIikudHJpbSgpO1xuXG4gIHJldHVybiB7XG4gICAgZnJvbURhdGU6IFN0cmluZyh2YWx1ZT8uZnJvbURhdGUgfHwgXCJcIikudHJpbSgpLFxuICAgIHRvRGF0ZTogU3RyaW5nKHZhbHVlPy50b0RhdGUgfHwgXCJcIikudHJpbSgpLFxuICAgIHByb2plY3RJZDogU3RyaW5nKHZhbHVlPy5wcm9qZWN0SWQgfHwgXCJcIikudHJpbSgpLFxuICAgIGhvamFHYXN0b3NJZCxcbiAgICBjdXJyZW5jeUNvZGU6IFN0cmluZyh2YWx1ZT8uY3VycmVuY3lDb2RlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICBtYW5hZ2VkVXNlcklkLFxuICAgIHN0YXR1c0ZpbHRlcixcbiAgICBleGNoYW5nZVJhdGVNb2RlOiBudWxsLFxuICAgIGZpbHRlcjogU3RyaW5nKHZhbHVlPy5maWx0ZXIgfHwgaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgQXBwbGllZEZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZUxpc3RUeXBlcy50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplRXhwZW5zZUZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZUZpbHRlclNuYXBzaG90LnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldENhcmQgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQge1xuICBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksXG4gIGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXG4gIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXG4gIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeSxcbiAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSxcbn0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcbmltcG9ydCB7IGdldEV4cGVuc2VTY29wZVRva2VuIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTY29wZS50c1wiO1xuXG5jb25zdCBFWFBFTlNFX1NIRUVUU19GSUxURVJfS0VZX1BSRUZJWCA9IFwiZXhwZW5zZV9zaGVldHNfZmlsdGVyX3YxXCI7XG5jb25zdCBFWFBFTlNFX1NIRUVUU19SRVRVUk5fRkxBR19LRVlfUFJFRklYID0gXCJleHBlbnNlX3NoZWV0c19yZXR1cm5fdjFcIjtcbmNvbnN0IEVYUEVOU0VfU0hFRVRTX0NBQ0hFX1RUTF9NUyA9IDEyICogNjAgKiA2MCAqIDEwMDA7XG5cbmV4cG9ydCB0eXBlIEV4cGVuc2VTaGVldHNDYWNoZWRTdGF0ZSA9IHtcbiAgZmlsdGVyczogQXBwbGllZEZpbHRlclNuYXBzaG90O1xuICBwYWdlOiBudW1iZXI7XG4gIHNjcm9sbFk6IG51bWJlcjtcbiAgaXRlbXM6IEV4cGVuc2VTaGVldENhcmRbXTtcbiAgdG90YWw6IG51bWJlcjtcbn07XG5cbmNvbnN0IGdldFNjb3BlVG9rZW4gPSAoKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGdldEV4cGVuc2VTY29wZVRva2VuKCk7XG59O1xuXG5jb25zdCBnZXRTY29wZWRLZXlzID0gKCkgPT4ge1xuICBjb25zdCBzY29wZSA9IGdldFNjb3BlVG9rZW4oKTtcbiAgcmV0dXJuIHtcbiAgICBmaWx0ZXJLZXk6IGAke0VYUEVOU0VfU0hFRVRTX0ZJTFRFUl9LRVlfUFJFRklYfV8ke3Njb3BlfWAsXG4gICAgcmV0dXJuRmxhZ0tleTogYCR7RVhQRU5TRV9TSEVFVFNfUkVUVVJOX0ZMQUdfS0VZX1BSRUZJWH1fJHtzY29wZX1gLFxuICB9O1xufTtcblxuY29uc3QgdG9OdWxsYWJsZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xufTtcblxuY29uc3Qgbm9ybWFsaXplSXRlbXMgPSAocmF3OiB1bmtub3duKTogRXhwZW5zZVNoZWV0Q2FyZFtdID0+IHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHJhdykpIHJldHVybiBbXTtcblxuICByZXR1cm4gcmF3Lm1hcCgoZW50cnkpID0+IHtcbiAgICBjb25zdCBpdGVtID0gKGVudHJ5IHx8IHt9KSBhcyBQYXJ0aWFsPEV4cGVuc2VTaGVldENhcmQ+O1xuICAgIHJldHVybiB7XG4gICAgICBob2phR2FzdG9zSWQ6IFN0cmluZyhpdGVtLmhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCksXG4gICAgICBkZXNjcmlwdGlvbjogdHlwZW9mIGl0ZW0uZGVzY3JpcHRpb24gPT09IFwic3RyaW5nXCIgPyBpdGVtLmRlc2NyaXB0aW9uLnRyaW0oKSA6IHVuZGVmaW5lZCxcbiAgICAgIGV4cGVuc2VTaGVldFN0YXR1czogdG9OdWxsYWJsZU51bWJlcihpdGVtLmV4cGVuc2VTaGVldFN0YXR1cyksXG4gICAgICBlc3RhZG9Db21lbnRhcmlvczogdHlwZW9mIGl0ZW0uZXN0YWRvQ29tZW50YXJpb3MgPT09IFwic3RyaW5nXCIgPyBpdGVtLmVzdGFkb0NvbWVudGFyaW9zLnRyaW0oKSA6IG51bGwsXG4gICAgICB1c2VySWQ6IHR5cGVvZiBpdGVtLnVzZXJJZCA9PT0gXCJzdHJpbmdcIiA/IGl0ZW0udXNlcklkLnRyaW0oKSA6IHVuZGVmaW5lZCxcbiAgICAgIHZvdWNoZXI6IHR5cGVvZiBpdGVtLnZvdWNoZXIgPT09IFwic3RyaW5nXCIgPyBpdGVtLnZvdWNoZXIudHJpbSgpIDogdW5kZWZpbmVkLFxuICAgICAgcHJvaklkOiB0eXBlb2YgaXRlbS5wcm9qSWQgPT09IFwic3RyaW5nXCIgPyBpdGVtLnByb2pJZC50cmltKCkgOiB1bmRlZmluZWQsXG4gICAgICBjdXJyZW5jeUNvZGU6IHR5cGVvZiBpdGVtLmN1cnJlbmN5Q29kZSA9PT0gXCJzdHJpbmdcIiA/IGl0ZW0uY3VycmVuY3lDb2RlLnRyaW0oKSA6IHVuZGVmaW5lZCxcbiAgICAgIHRvdGFsQW1vdW50OiB0b051bGxhYmxlTnVtYmVyKGl0ZW0udG90YWxBbW91bnQpLFxuICAgICAgZXhjaFJhdGU6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5leGNoUmF0ZSksXG4gICAgICBleGNoYW5nZVJhdGVNb2RlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhjaGFuZ2VSYXRlTW9kZSksXG4gICAgICBjcmVhdGVkRGF0ZTogdHlwZW9mIGl0ZW0uY3JlYXRlZERhdGUgPT09IFwic3RyaW5nXCIgPyBpdGVtLmNyZWF0ZWREYXRlLnRyaW0oKSA6IHVuZGVmaW5lZCxcbiAgICB9O1xuICB9KTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZVN0YXRlID0gKHJhdzogRXhwZW5zZVNoZWV0c0NhY2hlZFN0YXRlIHwgbnVsbCk6IEV4cGVuc2VTaGVldHNDYWNoZWRTdGF0ZSB8IG51bGwgPT4ge1xuICBpZiAoIXJhdyB8fCB0eXBlb2YgcmF3ICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBwYWdlUmF3ID0gTnVtYmVyKHJhdy5wYWdlKTtcbiAgY29uc3QgcGFnZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlUmF3KSAmJiBwYWdlUmF3ID4gMCA/IE1hdGguZmxvb3IocGFnZVJhdykgOiAxO1xuXG4gIGNvbnN0IHNjcm9sbFJhdyA9IE51bWJlcihyYXcuc2Nyb2xsWSk7XG4gIGNvbnN0IHNjcm9sbFkgPSBOdW1iZXIuaXNGaW5pdGUoc2Nyb2xsUmF3KSAmJiBzY3JvbGxSYXcgPj0gMCA/IE1hdGguZmxvb3Ioc2Nyb2xsUmF3KSA6IDA7XG4gIGNvbnN0IGl0ZW1zID0gbm9ybWFsaXplSXRlbXMoKHJhdyBhcyB7IGl0ZW1zPzogdW5rbm93biB9KS5pdGVtcyk7XG4gIGNvbnN0IHRvdGFsUmF3ID0gTnVtYmVyKChyYXcgYXMgeyB0b3RhbD86IHVua25vd24gfSkudG90YWwpO1xuICBjb25zdCB0b3RhbCA9IE51bWJlci5pc0Zpbml0ZSh0b3RhbFJhdykgJiYgdG90YWxSYXcgPj0gMCA/IHRvdGFsUmF3IDogaXRlbXMubGVuZ3RoO1xuXG4gIHJldHVybiB7XG4gICAgZmlsdGVyczogbm9ybWFsaXplRXhwZW5zZUZpbHRlclNuYXBzaG90KHJhdy5maWx0ZXJzKSxcbiAgICBwYWdlLFxuICAgIHNjcm9sbFksXG4gICAgaXRlbXMsXG4gICAgdG90YWwsXG4gIH07XG59O1xuXG4vLyBDZW50cmFsaXplcyBjYWNoZSBwZXJzaXN0ZW5jZSBmb3IgcmV0dXJuaW5nIGZyb20gZXhwZW5zZSBkZXRhaWwgdG8gbGlzdC5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUgPSAoKSA9PiB7XG4gIGNvbnN0IHJlYWRDYWNoZWRTdGF0ZSA9IHVzZUNhbGxiYWNrKCgpOiBFeHBlbnNlU2hlZXRzQ2FjaGVkU3RhdGUgfCBudWxsID0+IHtcbiAgICBjb25zdCBrZXlzID0gZ2V0U2NvcGVkS2V5cygpO1xuICAgIGNvbnN0IHJhdyA9IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeTxFeHBlbnNlU2hlZXRzQ2FjaGVkU3RhdGU+KGtleXMuZmlsdGVyS2V5KTtcbiAgICByZXR1cm4gbm9ybWFsaXplU3RhdGUocmF3KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNvbnN1bWVSZXR1cm5GbGFnID0gdXNlQ2FsbGJhY2soKCk6IGJvb2xlYW4gPT4ge1xuICAgIGNvbnN0IGtleXMgPSBnZXRTY29wZWRLZXlzKCk7XG4gICAgY29uc3QgcmF3ID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXlzLnJldHVybkZsYWdLZXkpO1xuICAgIGlmIChyYXcgPT09IFwiMVwiKSB7XG4gICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleXMucmV0dXJuRmxhZ0tleSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgc2F2ZUNhY2hlZFN0YXRlID0gdXNlQ2FsbGJhY2soKHN0YXRlOiBFeHBlbnNlU2hlZXRzQ2FjaGVkU3RhdGUpOiB2b2lkID0+IHtcbiAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplU3RhdGUoc3RhdGUpO1xuICAgIGlmICghbm9ybWFsaXplZCkgcmV0dXJuO1xuXG4gICAgY29uc3Qga2V5cyA9IGdldFNjb3BlZEtleXMoKTtcbiAgICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkoa2V5cy5maWx0ZXJLZXksIG5vcm1hbGl6ZWQsIEVYUEVOU0VfU0hFRVRTX0NBQ0hFX1RUTF9NUyk7XG4gICAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXlzLnJldHVybkZsYWdLZXksIFwiMVwiLCBFWFBFTlNFX1NIRUVUU19DQUNIRV9UVExfTVMpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY2xlYXJDYWNoZWRTdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBrZXlzID0gZ2V0U2NvcGVkS2V5cygpO1xuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5cy5maWx0ZXJLZXkpO1xuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5cy5yZXR1cm5GbGFnS2V5KTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgcmVhZENhY2hlZFN0YXRlLFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIHNhdmVDYWNoZWRTdGF0ZSxcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxuICB9O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUF1RDs7O0FDQXZELG1CQUFtQztBQW1GN0I7QUFqRU4sSUFBTSxtQkFBbUI7QUFFekIsSUFBTSxrQkFBa0IsQ0FBQyxVQUF1RTtBQUM5RixVQUFRLE1BQU0sUUFBUSxLQUFLLElBQUksUUFBUSxDQUFDLEdBQ3JDLElBQUksQ0FBQyxTQUFTO0FBQ2IsVUFBTSxLQUFLLE9BQU8sTUFBTSxnQkFBZ0IsRUFBRSxFQUFFLEtBQUs7QUFDakQsUUFBSSxDQUFDLEdBQUksUUFBTztBQUNoQixXQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxVQUFVLE9BQU8sTUFBTSxlQUFlLEVBQUUsRUFBRSxLQUFLLEtBQUs7QUFBQSxJQUN0RDtBQUFBLEVBQ0YsQ0FBQyxFQUNBLE9BQU8sT0FBTztBQUNuQjtBQUdBLElBQU0sMEJBQTBCLENBQUM7QUFBQSxFQUMvQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsMEJBQTBCO0FBQUEsRUFDMUIsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUNkLE1BQW9DO0FBQ2xDLFFBQU0sZUFBZSxZQUFZO0FBRWpDLFFBQU0sa0JBQWMsMEJBQVksT0FBTyxNQUFjLFdBQXVEO0FBQzFHLFVBQU0sVUFBVSxnQ0FBZ0MsTUFBTSxrQkFBa0IsQ0FBQztBQUN6RSxVQUFNLFdBQVcsTUFBTSxzQkFBc0IsU0FBUztBQUFBLE1BQ3BELHlCQUF5QjtBQUFBLE1BQ3pCO0FBQUEsSUFDRixDQUFDO0FBRUQsUUFBSSxV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QjtBQUFBLFVBQ2pCO0FBQUE7QUFBQSxNQUNGLEtBVFEsR0FBRyxFQUFFLElBQUksS0FBSyxFQVV4QjtBQUFBLElBRUosQ0FBQyxHQUNILElBQ0U7QUFBQSxJQUVKO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBLFNBQVM7QUFBQSxRQUNULGNBQWMsQ0FBQyxTQUFTO0FBQ3RCLGdCQUFNLFdBQVcsa0JBQWtCO0FBQ25DLGdCQUFNLHdCQUF3Qix5QkFBeUIsU0FBUyxhQUFhO0FBQzdFLGVBQUssU0FBUyxNQUFNO0FBQUEsWUFDbEIsR0FBRztBQUFBLFlBQ0gsZUFBZTtBQUFBLFVBQ2pCLENBQUM7QUFBQSxRQUNIO0FBQUEsUUFDQSxRQUFRO0FBQUE7QUFBQSxJQUNWO0FBQUEsSUFFQyxtQkFDQztBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTTtBQUFBLFFBQ04sV0FBVyxLQUFLLGlCQUFpQixRQUFRO0FBQUEsUUFDekMsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsU0FBUztBQUFBO0FBQUEsSUFDWCxJQUNFO0FBQUEsS0FDTjtBQUVKO0FBR0EsSUFBTSxvQkFBb0IsTUFBTTtBQUM5QixTQUNFLDZDQUFDLGdDQUFxQix5QkFBdUIsTUFDM0MsdURBQUMsNEJBQXlCLEdBQzVCO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxxQkFBcUI7QUFDNUQsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQyxxQkFBa0IsQ0FBRTtBQUNoRDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sNEJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiXQp9Cg==
