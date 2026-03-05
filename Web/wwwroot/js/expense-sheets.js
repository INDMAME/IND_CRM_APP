import {
  ExpenseDateRangeFilter_default,
  ExpenseFilterActions_default,
  ExpenseQuickDateFilters_default,
  buildExpenseListPayload,
  buildExpenseSheetSuggestPayload
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
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-YJQJ6JSM.js";
import {
  DEFAULT_EXPENSE_STATUS_FILTER,
  getExpenseStatusBadgeClassName,
  getExpenseStatusFilterOptions,
  getExpenseStatusLabel,
  normalizeExpenseStatusFilterCode
} from "./chunks/chunk-GFZQR6PA.js";
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
import {
  configureExpenseApiAuth,
  fetchExpenseSheetList,
  formatAmountWithCurrency,
  formatExpenseDateParts,
  formatExpenseDisplayDate,
  hasAssignedVoucher,
  mapExpenseSheetListItemToCard,
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
var EXPENSE_SHEETS_FILTER_KEY_PREFIX = "expense_sheets_filter_v1";
var EXPENSE_SHEETS_RETURN_FLAG_KEY_PREFIX = "expense_sheets_return_v1";
var EXPENSE_SHEETS_CACHE_TTL_MS = 12 * 60 * 60 * 1e3;
var getScopeToken = () => {
  if (typeof window === "undefined") return "session";
  const raw = String(window.__IND_ENTRA_OID__ || "").trim().toLowerCase();
  return raw || "session";
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
    if (appliedFilters.statusFilter !== DEFAULT_EXPENSE_STATUS_FILTER) {
      summary.push({
        key: "status",
        label: indT("ExpenseSheets_Filter_Status", "Estado"),
        value: getExpenseStatusLabel(appliedFilters.statusFilter)
      });
    }
    return summary;
  }, [appliedFilters]);
  const showSummary = !showFilters && summaryItems.length > 0;
  (0, import_react6.useEffect)(() => {
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
      void loadList(currentPage < 1 ? 1 : currentPage, appliedFilters);
    };
    window.addEventListener("expense-sheets-toggle-filter", onToggleFilters);
    window.addEventListener("expense-sheets-refresh", onRefresh);
    return () => {
      window.removeEventListener("expense-sheets-toggle-filter", onToggleFilters);
      window.removeEventListener("expense-sheets-refresh", onRefresh);
    };
  }, [appliedFilters, currentPage, loadList, showFilters, toggleFilterPanel]);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saXN0L0V4cGVuc2VTaGVldHNQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0RmlsdGVySW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0LnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZUZpbHRlcnNQYW5lbC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saXN0L3VzZUV4cGVuc2VTaGVldHNMaXN0RGF0YS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpc3QvdXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpc3QvZXhwZW5zZUZpbHRlclNuYXBzaG90LnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGlzdC91c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcbmltcG9ydCBDb21wYWN0UGFnaW5hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeFwiO1xuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHtcbiAgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIsXG4gIGdldEV4cGVuc2VTdGF0dXNCYWRnZUNsYXNzTmFtZSxcbiAgZ2V0RXhwZW5zZVN0YXR1c0xhYmVsLFxuICBub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSxcbn0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlU3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IEV4cGVuc2VGaWx0ZXJzUGFuZWwgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZUZpbHRlcnNQYW5lbC50c3hcIjtcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURhdGVQYXJ0cywgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBoYXNBc3NpZ25lZFZvdWNoZXIsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRzTGlzdERhdGEgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRzTGlzdERhdGEudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRzRmlsdGVyc1N0YXRlLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUudHNcIjtcbmltcG9ydCBFeHBlbnNlVGltZWxpbmVDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4XCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuaW1wb3J0IHsgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuXG5jb25zdCBQQUdFX1NJWkUgPSA2O1xuXG4vLyBJbml0aWFsaXplcyBhdXRoIHNlZWQgZm9yIGV4cGVuc2UgQVBJIGNhbGxzIGJlZm9yZSBpc2xhbmQgZWZmZWN0cyBydW4uXG5jb25zdCBib290c3RyYXBFeHBlbnNlQXBpQXV0aCA9ICgpID0+IHtcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgoe1xuICAgIHRva2VuOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxuICAgIGVudHJhT2lkOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcbiAgfSk7XG59O1xuXG5jb25zdCBFeHBlbnNlU2hlZXRzUGFnZUNvbnRlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiVmlld1wiKTtcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZSA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiQWRkXCIpO1xuICBjb25zdCB0aW1lbGluZUNvbnRhaW5lclJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxuICAgICgpID0+ICh7XG4gICAgICBmaXJzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9GaXJzdFwiLCBcIkZpcnN0XCIpLFxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXG4gICAgICBuZXh0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpLFxuICAgICAgbGFzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKSxcbiAgICB9KSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IHtcbiAgICBpdGVtcyxcbiAgICB0b3RhbCxcbiAgICBjdXJyZW50UGFnZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGxvYWRMaXN0LFxuICAgIHJlc3RvcmVMaXN0U25hcHNob3QsXG4gICAgcmVzZXRMaXN0LFxuICB9ID0gdXNlRXhwZW5zZVNoZWV0c0xpc3REYXRhKHtcbiAgICBoYXNBY2Nlc3MsXG4gICAgcGFnZVNpemU6IFBBR0VfU0laRSxcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcbiAgfSk7XG5cbiAgY29uc3QgeyByZWFkQ2FjaGVkU3RhdGUsIGNvbnN1bWVSZXR1cm5GbGFnLCBzYXZlQ2FjaGVkU3RhdGUsIGNsZWFyQ2FjaGVkU3RhdGUgfSA9IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSgpO1xuICBjb25zdCBkaWRSZXN0b3JlT25Nb3VudFJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmID0gUmVhY3QudXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IHtcbiAgICBmcm9tRGF0ZSxcbiAgICB0b0RhdGUsXG4gICAgcHJvamVjdElkLFxuICAgIGhvamFHYXN0b3NJZCxcbiAgICBjdXJyZW5jeUNvZGUsXG4gICAgc3RhdHVzRmlsdGVyLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxuICAgIGFwcGxpZWRGaWx0ZXJzLFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIGN1cnJlbnRGaWx0ZXJzLFxuICAgIHNldFByb2plY3RJZCxcbiAgICBzZXRIb2phR2FzdG9zSWQsXG4gICAgc2V0Q3VycmVuY3lDb2RlLFxuICAgIHNldFN0YXR1c0ZpbHRlcixcbiAgICBvbkFwcGx5LFxuICAgIG9uQ2xlYXIsXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlLFxuICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcbiAgICBvblF1aWNrRmlsdGVyQ2hhbmdlLFxuICAgIHRvZ2dsZUZpbHRlclBhbmVsLFxuICB9ID0gdXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZSh7XG4gICAgb25BcHBseUZpbHRlcnM6IChzbmFwc2hvdCkgPT4ge1xuICAgICAgdm9pZCBsb2FkTGlzdCgxLCBzbmFwc2hvdCk7XG4gICAgfSxcbiAgICBvbkNsZWFyRmlsdGVyczogKCkgPT4ge1xuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuICAgICAgcmVzZXRMaXN0KCk7XG4gICAgfSxcbiAgfSk7XG5cbiAgY29uc3QgZ29Ub0RldGFpbCA9IHVzZUNhbGxiYWNrKFxuICAgIChzaGVldElkOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmICghc2hlZXRJZCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBzbmFwc2hvdCA9IGFwcGxpZWRGaWx0ZXJzIHx8IGN1cnJlbnRGaWx0ZXJzO1xuICAgICAgc2F2ZUNhY2hlZFN0YXRlKHtcbiAgICAgICAgZmlsdGVyczogc25hcHNob3QsXG4gICAgICAgIHBhZ2U6IGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSxcbiAgICAgICAgc2Nyb2xsWTogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5zY3JvbGxZIHx8IDAgOiAwLFxuICAgICAgICBpdGVtcyxcbiAgICAgICAgdG90YWwsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgaWQgPSBlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCk7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7aWR9YCwge1xuICAgICAgICBieXBhc3NHdWFyZE9uY2U6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbYXBwbGllZEZpbHRlcnMsIGN1cnJlbnRGaWx0ZXJzLCBjdXJyZW50UGFnZSwgaXRlbXMsIHNhdmVDYWNoZWRTdGF0ZSwgdG90YWxdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlT3BlbkNyZWF0ZVNoZWV0TW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP21vZGU9Y3JlYXRlXCIsIHtcbiAgICAgIGJ5cGFzc0d1YXJkT25jZTogZmFsc2UsXG4gICAgfSk7XG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlXSk7XG5cbiAgY29uc3QgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgPSB1c2VDYWxsYmFjaygodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcbiAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBjYXJkID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XG4gICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIXRpbWVsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY2FyZDtcbiAgfSwgW10pO1xuXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoe1xuICAgIGNvbnRhaW5lclJlZjogdGltZWxpbmVDb250YWluZXJSZWYsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGl0ZW1zLFxuICAgIHJlc29sdmVDbGlja2FibGVDYXJkLFxuICB9KTtcblxuICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKCh0b3RhbCB8fCAwKSAvIFBBR0VfU0laRSk7XG5cbiAgY29uc3Qgc3VtbWFyeUl0ZW1zID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKCFhcHBsaWVkRmlsdGVycykge1xuICAgICAgcmV0dXJuIFtdIGFzIEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfT47XG4gICAgfVxuXG4gICAgY29uc3Qgc3VtbWFyeTogQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9PiA9IFtdO1xuICAgIGNvbnN0IGxvY2FsZSA9IGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiO1xuICAgIGNvbnN0IGZyb21EYXRlVGV4dCA9IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShhcHBsaWVkRmlsdGVycy5mcm9tRGF0ZSwgbG9jYWxlLCBcIlwiKTtcbiAgICBjb25zdCB0b0RhdGVUZXh0ID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGFwcGxpZWRGaWx0ZXJzLnRvRGF0ZSwgbG9jYWxlLCBcIlwiKTtcblxuICAgIGlmIChmcm9tRGF0ZVRleHQgfHwgdG9EYXRlVGV4dCkge1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcImZyb21EYXRlXCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKSxcbiAgICAgICAgdmFsdWU6IGZyb21EYXRlVGV4dCB8fCBcIi0tXCIsXG4gICAgICB9KTtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJ0b0RhdGVcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIiksXG4gICAgICAgIHZhbHVlOiB0b0RhdGVUZXh0IHx8IFwiLS1cIixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChhcHBsaWVkRmlsdGVycy5wcm9qZWN0SWQudHJpbSgpKSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwicHJvamVjdFwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpLFxuICAgICAgICB2YWx1ZTogYXBwbGllZEZpbHRlcnMucHJvamVjdElkLnRyaW0oKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoYXBwbGllZEZpbHRlcnMuaG9qYUdhc3Rvc0lkLnRyaW0oKSkge1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcInNoZWV0XCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU2hlZXRcIiwgXCJFeHBlbnNlIHNoZWV0XCIpLFxuICAgICAgICB2YWx1ZTogYXBwbGllZEZpbHRlcnMuaG9qYUdhc3Rvc0lkLnRyaW0oKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoYXBwbGllZEZpbHRlcnMuY3VycmVuY3lDb2RlLnRyaW0oKSkge1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcImN1cnJlbmN5XCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKSxcbiAgICAgICAgdmFsdWU6IGFwcGxpZWRGaWx0ZXJzLmN1cnJlbmN5Q29kZS50cmltKCksXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGFwcGxpZWRGaWx0ZXJzLnN0YXR1c0ZpbHRlciAhPT0gREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJzdGF0dXNcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNcIiwgXCJFc3RhZG9cIiksXG4gICAgICAgIHZhbHVlOiBnZXRFeHBlbnNlU3RhdHVzTGFiZWwoYXBwbGllZEZpbHRlcnMuc3RhdHVzRmlsdGVyKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzdW1tYXJ5O1xuICB9LCBbYXBwbGllZEZpbHRlcnNdKTtcblxuICBjb25zdCBzaG93U3VtbWFyeSA9ICFzaG93RmlsdGVycyAmJiBzdW1tYXJ5SXRlbXMubGVuZ3RoID4gMDtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChkaWRSZXN0b3JlT25Nb3VudFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgZGlkUmVzdG9yZU9uTW91bnRSZWYuY3VycmVudCA9IHRydWU7XG5cbiAgICBpZiAoIWNvbnN1bWVSZXR1cm5GbGFnKCkpIHtcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjYWNoZWRTdGF0ZSA9IHJlYWRDYWNoZWRTdGF0ZSgpO1xuICAgIGlmICghY2FjaGVkU3RhdGUpIHtcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMoY2FjaGVkU3RhdGUuZmlsdGVycyk7XG4gICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLnNjcm9sbFk7XG4gICAgaWYgKGNhY2hlZFN0YXRlLml0ZW1zLmxlbmd0aCA+IDAgfHwgY2FjaGVkU3RhdGUudG90YWwgPiAwKSB7XG4gICAgICByZXN0b3JlTGlzdFNuYXBzaG90KHtcbiAgICAgICAgaXRlbXM6IGNhY2hlZFN0YXRlLml0ZW1zLFxuICAgICAgICB0b3RhbDogY2FjaGVkU3RhdGUudG90YWwsXG4gICAgICAgIHBhZ2U6IGNhY2hlZFN0YXRlLnBhZ2UsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdm9pZCBsb2FkTGlzdChjYWNoZWRTdGF0ZS5wYWdlLCBjYWNoZWRTdGF0ZS5maWx0ZXJzKTtcbiAgfSwgW2NsZWFyQ2FjaGVkU3RhdGUsIGNvbnN1bWVSZXR1cm5GbGFnLCBsb2FkTGlzdCwgcmVhZENhY2hlZFN0YXRlLCByZXN0b3JlQXBwbGllZEZpbHRlcnMsIHJlc3RvcmVMaXN0U25hcHNob3RdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0xvYWRpbmcpIHJldHVybjtcbiAgICBjb25zdCBwZW5kaW5nU2Nyb2xsWSA9IHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQ7XG4gICAgaWYgKHBlbmRpbmdTY3JvbGxZID09IG51bGwpIHJldHVybjtcblxuICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgdG9wOiBNYXRoLm1heCgwLCBwZW5kaW5nU2Nyb2xsWSksXG4gICAgICAgIGJlaGF2aW9yOiBcImF1dG9cIixcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LCBbY3VycmVudFBhZ2UsIGlzTG9hZGluZywgaXRlbXMubGVuZ3RoXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvblRvZ2dsZUZpbHRlcnMgPSAoKSA9PiB7XG4gICAgICBjb25zdCB3aWxsT3BlbiA9ICFzaG93RmlsdGVycztcbiAgICAgIHRvZ2dsZUZpbHRlclBhbmVsKCk7XG4gICAgICBpZiAod2lsbE9wZW4pIHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHsgdG9wOiAwLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25SZWZyZXNoID0gKCkgPT4ge1xuICAgICAgaWYgKCFhcHBsaWVkRmlsdGVycykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZvaWQgbG9hZExpc3QoY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLCBhcHBsaWVkRmlsdGVycyk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXhwZW5zZS1zaGVldHMtdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXhwZW5zZS1zaGVldHMtcmVmcmVzaFwiLCBvblJlZnJlc2gpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXhwZW5zZS1zaGVldHMtdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXNoZWV0cy1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XG4gICAgfTtcbiAgfSwgW2FwcGxpZWRGaWx0ZXJzLCBjdXJyZW50UGFnZSwgbG9hZExpc3QsIHNob3dGaWx0ZXJzLCB0b2dnbGVGaWx0ZXJQYW5lbF0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgIHtzaG93U3VtbWFyeSA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItY2FyZCBmaWx0ZXItY2FyZC0tc3VtbWFyeSBwLTMgc206cC00IG10LTEgbWItM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhwZW5zZS1zdW1tYXJ5LWdyaWQgZ3JpZCBncmlkLWNvbHMtMSBtaW4tWzM2MHB4XTpncmlkLWNvbHMtMiBpdGVtcy1zdGFydCBnYXAteC00IGdhcC15LTEgdGV4dC14c1wiPlxuICAgICAgICAgICAge3N1bW1hcnlJdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e2Ake2l0ZW0ua2V5fS0ke2l0ZW0udmFsdWV9LSR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdW1tYXJ5IGhpc3RvcnktZmlsdGVyLXN1bW1hcnktLWdyaWQtaXRlbSBsZWFkaW5nLTUgbWluLXctMFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdW1tYXJ5X19sYWJlbCBmb250LXNlbWlib2xkXCI+e2l0ZW0ubGFiZWx9Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdW1tYXJ5X192YWx1ZSBicmVhay13b3Jkc1wiPntpdGVtLnZhbHVlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgPEV4cGVuc2VGaWx0ZXJzUGFuZWxcbiAgICAgICAgdmlzaWJsZT17c2hvd0ZpbHRlcnN9XG4gICAgICAgIHNob3dNYW51YWxEYXRlRmlsdGVyPXtzaG93TWFudWFsRGF0ZUZpbHRlcn1cbiAgICAgICAgc2hvd01hbnVhbERhdGVFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvcn1cbiAgICAgICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5PXttYW51YWxEYXRlQXV0b09wZW5LZXl9XG4gICAgICAgIGZyb21EYXRlPXtmcm9tRGF0ZX1cbiAgICAgICAgdG9EYXRlPXt0b0RhdGV9XG4gICAgICAgIHByb2plY3RJZD17cHJvamVjdElkfVxuICAgICAgICBob2phR2FzdG9zSWQ9e2hvamFHYXN0b3NJZH1cbiAgICAgICAgY3VycmVuY3lDb2RlPXtjdXJyZW5jeUNvZGV9XG4gICAgICAgIHN0YXR1c0ZpbHRlcj17c3RhdHVzRmlsdGVyfVxuICAgICAgICBhY3RpdmVRdWlja0ZpbHRlcj17YWN0aXZlUXVpY2tGaWx0ZXJ9XG4gICAgICAgIG9uRGF0ZVJhbmdlQ2hhbmdlPXtvbkRhdGVSYW5nZUNoYW5nZX1cbiAgICAgICAgb25NYW51YWxSYW5nZUNvbXBsZXRlPXtvbk1hbnVhbFJhbmdlQ29tcGxldGV9XG4gICAgICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2U9e29uUXVpY2tGaWx0ZXJDaGFuZ2V9XG4gICAgICAgIG9uUHJvamVjdElkQ2hhbmdlPXtzZXRQcm9qZWN0SWR9XG4gICAgICAgIG9uSG9qYUdhc3Rvc0lkQ2hhbmdlPXtzZXRIb2phR2FzdG9zSWR9XG4gICAgICAgIG9uQ3VycmVuY3lDb2RlQ2hhbmdlPXtzZXRDdXJyZW5jeUNvZGV9XG4gICAgICAgIG9uU3RhdHVzRmlsdGVyQ2hhbmdlPXtzZXRTdGF0dXNGaWx0ZXJ9XG4gICAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XG4gICAgICAgIG9uQXBwbHk9e29uQXBwbHl9XG4gICAgICAvPlxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cbiAgICAgID5cbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cbiAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtlcnJvck1lc3NhZ2UgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxuXG4gICAgICB7IWlzTG9hZGluZyAmJiAhZXJyb3JNZXNzYWdlICYmIGl0ZW1zLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2luZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKX0gLz5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7IWVycm9yTWVzc2FnZSAmJiBpdGVtcy5sZW5ndGggPiAwID8gKFxuICAgICAgICA8ZGl2IHJlZj17dGltZWxpbmVDb250YWluZXJSZWZ9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveFwiPlxuICAgICAgICAgIHtpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IHNhZmVUZXh0KGl0ZW0uaG9qYUdhc3Rvc0lkKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVQYXJ0cyA9IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMoXG4gICAgICAgICAgICAgIGl0ZW0uY3JlYXRlZERhdGUsXG4gICAgICAgICAgICAgIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiLFxuICAgICAgICAgICAgICB7IHByZWZlck1vbnRoRmlyc3RPblNsYXNoOiB0cnVlIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW5jeSA9IHNhZmVUZXh0KGl0ZW0uY3VycmVuY3lDb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gc2FmZVRleHQoaXRlbS5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBjb25zdCB2b3VjaGVyID0gc2FmZVRleHQoaXRlbS52b3VjaGVyKTtcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsQW1vdW50VGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShpdGVtLnRvdGFsQW1vdW50ID8/IG51bGwsIGN1cnJlbmN5KTtcbiAgICAgICAgICAgIGNvbnN0IGZhbGxiYWNrU3RhdHVzQ29kZSA9IGhhc0Fzc2lnbmVkVm91Y2hlcih2b3VjaGVyKSA/IDQgOiAwO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzQ29kZSA9IG5vcm1hbGl6ZUV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlKGl0ZW0uZXhwZW5zZVNoZWV0U3RhdHVzLCBmYWxsYmFja1N0YXR1c0NvZGUpO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzTGFiZWwgPSBnZXRFeHBlbnNlU3RhdHVzTGFiZWwoc3RhdHVzQ29kZSk7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNDbGFzcyA9IGdldEV4cGVuc2VTdGF0dXNCYWRnZUNsYXNzTmFtZShzdGF0dXNDb2RlKTtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2Ake2lkfS0ke2luZGV4fWB9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17ZGVzY3JpcHRpb24gfHwgXCItXCJ9XG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXt0b3RhbEFtb3VudFRleHR9XG4gICAgICAgICAgICAgICAgICBvbk9wZW49eygpID0+IGdvVG9EZXRhaWwoaWQpfVxuICAgICAgICAgICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJleHBlbnNlLXNoZWV0LWNhcmRfX3RpdGxlIHRpbWVsaW5lLW5hbWVcIlxuICAgICAgICAgICAgICAgICAgc3RhdHVzQ2xhc3NOYW1lPXtzdGF0dXNDbGFzc31cbiAgICAgICAgICAgICAgICAgIHN0YXR1c0xhYmVsPXtzdGF0dXNMYWJlbH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxuICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbFBhZ2VzfVxuICAgICAgICBjdXJyZW50UGFnZT17Y3VycmVudFBhZ2V9XG4gICAgICAgIGxvYWRpbmc9e2lzTG9hZGluZ31cbiAgICAgICAgb25QYWdlQ2hhbmdlPXsocGFnZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnMgfHwgY3VycmVudEZpbHRlcnM7XG4gICAgICAgICAgdm9pZCBsb2FkTGlzdChwYWdlLCBzbmFwc2hvdCk7XG4gICAgICAgIH19XG4gICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cbiAgICAgIC8+XG5cbiAgICAgIHtjYW5DcmVhdGVFeHBlbnNlID8gKFxuICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b25cbiAgICAgICAgICByb3V0ZT1cIlwiXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiQ29tbW9uX0NyZWF0ZVwiLCBcIkNyZWF0ZVwiKX1cbiAgICAgICAgICBzaXplPXs3Nn1cbiAgICAgICAgICByaWdodD17MTZ9XG4gICAgICAgICAgYm90dG9tPXsyNH1cbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVPcGVuQ3JlYXRlU2hlZXRNb2RlfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2Ugc2hlZXRzIGxpc3QuXG5jb25zdCBFeHBlbnNlU2hlZXRzUGFnZSA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnM+XG4gICAgICA8RXhwZW5zZVNoZWV0c1BhZ2VDb250ZW50IC8+XG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgKTtcbn07XG5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2Utc2hlZXRzLXJvb3RcIik7XG4gIGlmICghcm9vdEVsKSByZXR1cm47XG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVNoZWV0c1BhZ2UgLz4pO1xufTtcblxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldHNQYWdlO1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlbW90ZVNlYXJjaENvbWJvYm94LCB7IHR5cGUgUmVtb3RlU2VhcmNoT3B0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9SZW1vdGVTZWFyY2hDb21ib2JveC50c3hcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGJ1aWxkRXhwZW5zZVNoZWV0U3VnZ2VzdFBheWxvYWQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVBheWxvYWRCdWlsZGVycy50c1wiO1xuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRMaXN0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcblxudHlwZSBFeHBlbnNlU2hlZXRGaWx0ZXJJbnB1dFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zPzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG59O1xuXG5jb25zdCBTRUFSQ0hfUEFHRV9TSVpFID0gMjA7XG5cbmNvbnN0IG1hcFNoZWV0T3B0aW9ucyA9IChpdGVtczogRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG9bXSB8IHVuZGVmaW5lZCk6IFJlbW90ZVNlYXJjaE9wdGlvbltdID0+IHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW10pXG4gICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgaWQgPSBTdHJpbmcoaXRlbT8uSG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGlmICghaWQpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IGlkLFxuICAgICAgICB0aXRsZTogaWQsXG4gICAgICAgIHN1YnRpdGxlOiBTdHJpbmcoaXRlbT8uRGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpIHx8IFwiLVwiLFxuICAgICAgfSBhcyBSZW1vdGVTZWFyY2hPcHRpb247XG4gICAgfSlcbiAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFJlbW90ZVNlYXJjaE9wdGlvbltdO1xufTtcblxuLy8gRXhwZW5zZSBzaGVldCBmaWx0ZXIgaW5wdXQgd2l0aCByZW1vdGUgbGlzdCBzdWdnZXN0aW9ucy5cbmNvbnN0IEV4cGVuc2VTaGVldEZpbHRlcklucHV0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zID0gdHJ1ZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbn06IEV4cGVuc2VTaGVldEZpbHRlcklucHV0UHJvcHMpID0+IHtcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XG5cbiAgY29uc3QgbG9hZE9wdGlvbnMgPSB1c2VDYWxsYmFjayhhc3luYyAodGVybTogc3RyaW5nLCBzaWduYWw6IEFib3J0U2lnbmFsKTogUHJvbWlzZTxSZW1vdGVTZWFyY2hPcHRpb25bXT4gPT4ge1xuICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZEV4cGVuc2VTaGVldFN1Z2dlc3RQYXlsb2FkKHRlcm0sIFNFQVJDSF9QQUdFX1NJWkUsIDEpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRMaXN0KHBheWxvYWQsIHtcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgc2lnbmFsLFxuICAgIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHJldHVybiBtYXBTaGVldE9wdGlvbnMocmVzcG9uc2U/Lkl0ZW1zKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGxvYWRPcHRpb25zUGFnZSA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlciwgc2lnbmFsOiBBYm9ydFNpZ25hbCkgPT4ge1xuICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZEV4cGVuc2VTaGVldFN1Z2dlc3RQYXlsb2FkKHRlcm0sIHBhZ2VTaXplLCBwYWdlKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0TGlzdChwYXlsb2FkLCB7XG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgIHNpZ25hbCxcbiAgICB9KTtcblxuICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgdG90YWw6IDAsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogbWFwU2hlZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyksXG4gICAgICB0b3RhbDogTnVtYmVyKHJlc3BvbnNlPy5Ub3RhbCB8fCAwKSxcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgaWYgKCFlbmFibGVSZW1vdGVTdWdnZXN0aW9ucyB8fCByZWFkT25seU1vZGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAge3Nob3dMYWJlbCA/IChcbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgc3R5bGU9e3sgY29sb3I6IFwiIzAwMjk2YmUwXCIgfX0+XG4gICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHB4LTMgcHktMiB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgdGV4dC1zbGF0ZS05MDAgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxuICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8UmVtb3RlU2VhcmNoQ29tYm9ib3hcbiAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgIG9uU2VhcmNoPXthc3luYyAodGVybSwgc2lnbmFsKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGxvYWRPcHRpb25zKHRlcm0sIHNpZ25hbCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICAgIG9uU2VhcmNoUGFnZT17YXN5bmMgKHRlcm0sIHBhZ2UsIHBhZ2VTaXplLCBzaWduYWwpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbG9hZE9wdGlvbnNQYWdlKHRlcm0sIHBhZ2UsIHBhZ2VTaXplLCBzaWduYWwpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGl0ZW1zOiBbXSwgdG90YWw6IDAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH19XG4gICAgICBpZEJhc2U9XCJleHBlbnNlLXNoZWV0LWZpbHRlclwiXG4gICAgICBtaW5TZWFyY2hMZW5ndGg9ezB9XG4gICAgICBwYWdlU2l6ZT17U0VBUkNIX1BBR0VfU0laRX1cbiAgICAgIGFsbG93RW1wdHlTZWFyY2hcbiAgICAgIGxvYWRPbk9wZW5cbiAgICAgIGluZmluaXRlU2Nyb2xsXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0RmlsdGVySW5wdXQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIsIGdldEV4cGVuc2VTdGF0dXNGaWx0ZXJPcHRpb25zLCBub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVN0YXR1c0NhdGFsb2cudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcblxudHlwZSBFeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZTtcbiAgb25DaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUpID0+IHZvaWQ7XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xufTtcblxuLy8gU2hhcmVkIGZpeGVkIHN0YXR1cyBmaWx0ZXIgc2VsZWN0IHVzaW5nIHRoZSBjYW5vbmljYWwgc3RhdHVzIGNhdGFsb2cuXG5jb25zdCBFeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG59OiBFeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0UHJvcHMpID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiBnZXRFeHBlbnNlU3RhdHVzRmlsdGVyT3B0aW9ucygpLCBbXSk7XG4gIGNvbnN0IHVpVmFsdWUgPSB2YWx1ZSA9PT0gREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIgPyBcIlwiIDogdmFsdWU7XG5cbiAgcmV0dXJuIChcbiAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICB2YWx1ZT17dWlWYWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiBvbkNoYW5nZShub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZShuZXh0VmFsdWUsIERFRkFVTFRfRVhQRU5TRV9TVEFUVVNfRklMVEVSKSl9XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICBpZEJhc2U9XCJleHBlbnNlLXN0YXR1cy1maWx0ZXJcIlxuICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZURhdGVSYW5nZUZpbHRlciBmcm9tIFwiLi9FeHBlbnNlRGF0ZVJhbmdlRmlsdGVyLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VGaWx0ZXJBY3Rpb25zIGZyb20gXCIuL0V4cGVuc2VGaWx0ZXJBY3Rpb25zLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQgZnJvbSBcIi4vRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dC50c3hcIjtcbmltcG9ydCBFeHBlbnNlUXVpY2tEYXRlRmlsdGVycyBmcm9tIFwiLi9FeHBlbnNlUXVpY2tEYXRlRmlsdGVycy50c3hcIjtcbmltcG9ydCBFeHBlbnNlU2hlZXRGaWx0ZXJJbnB1dCBmcm9tIFwiLi9FeHBlbnNlU2hlZXRGaWx0ZXJJbnB1dC50c3hcIjtcbmltcG9ydCBFeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VTdGF0dXNGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgSGlzdG9yeVN1bW1hcnkgZnJvbSBcIi4uLy4uL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlTdW1tYXJ5LnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlUXVpY2tGaWx0ZXJJZCB9IGZyb20gXCIuLi9saXN0L2V4cGVuc2VMaXN0VHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5cbmV4cG9ydCB0eXBlIHsgRXhwZW5zZVF1aWNrRmlsdGVySWQgfTtcblxuY29uc3QgcGFyc2VJc29EYXRlID0gKHJhdzogc3RyaW5nKTogRGF0ZSB8IG51bGwgPT4ge1xuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKHJhdykudHJpbSgpLnNwbGl0KFwiVFwiKVswXTtcbiAgaWYgKCEvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdCh2YWx1ZSkpIHJldHVybiBudWxsO1xuICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSB2YWx1ZS5zcGxpdChcIi1cIikubWFwKE51bWJlcik7XG4gIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG59O1xuXG5jb25zdCBmb3JtYXREYXRlID0gKHJhdzogc3RyaW5nLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGRhdGUgPSBwYXJzZUlzb0RhdGUocmF3KTtcbiAgaWYgKCFkYXRlKSByZXR1cm4gXCItLVwiO1xuICByZXR1cm4gZGF0ZVxuICAgIC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7XG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxuICAgICAgbW9udGg6IFwic2hvcnRcIixcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgIH0pXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xufTtcblxudHlwZSBFeHBlbnNlRmlsdGVyc1BhbmVsUHJvcHMgPSB7XG4gIHZpc2libGU6IGJvb2xlYW47XG4gIHNob3dNYW51YWxEYXRlRmlsdGVyOiBib29sZWFuO1xuICBtYW51YWxEYXRlQXV0b09wZW5LZXk6IG51bWJlcjtcbiAgZnJvbURhdGU6IHN0cmluZztcbiAgdG9EYXRlOiBzdHJpbmc7XG4gIHByb2plY3RJZDogc3RyaW5nO1xuICBob2phR2FzdG9zSWQ6IHN0cmluZztcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIHN0YXR1c0ZpbHRlcjogRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGU7XG4gIGFjdGl2ZVF1aWNrRmlsdGVyOiBFeHBlbnNlUXVpY2tGaWx0ZXJJZCB8IG51bGw7XG4gIHNob3dNYW51YWxEYXRlRXJyb3I6IGJvb2xlYW47XG4gIG9uRGF0ZVJhbmdlQ2hhbmdlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uTWFudWFsUmFuZ2VDb21wbGV0ZTogKGZyb21EYXRlOiBzdHJpbmcsIHRvRGF0ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvblF1aWNrRmlsdGVyQ2hhbmdlOiAoZmlsdGVySWQ6IEV4cGVuc2VRdWlja0ZpbHRlcklkKSA9PiB2b2lkO1xuICBvblByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uSG9qYUdhc3Rvc0lkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvblN0YXR1c0ZpbHRlckNoYW5nZTogKHZhbHVlOiBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSkgPT4gdm9pZDtcbiAgb25DbGVhcjogKCkgPT4gdm9pZDtcbiAgb25BcHBseTogKCkgPT4gdm9pZDtcbn07XG5cbi8vIFNoYXJlZCBleHBlbnNlIHNoZWV0IGZpbHRlciBwYW5lbCBjb21wb3NlZCBmcm9tIHJldXNhYmxlIG1vZHVsZSBjb21wb25lbnRzLlxuY29uc3QgRXhwZW5zZUZpbHRlcnNQYW5lbCA9ICh7XG4gIHZpc2libGUsXG4gIHNob3dNYW51YWxEYXRlRmlsdGVyLFxuICBtYW51YWxEYXRlQXV0b09wZW5LZXksXG4gIGZyb21EYXRlLFxuICB0b0RhdGUsXG4gIHByb2plY3RJZCxcbiAgaG9qYUdhc3Rvc0lkLFxuICBjdXJyZW5jeUNvZGUsXG4gIHN0YXR1c0ZpbHRlcixcbiAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gIG9uRGF0ZVJhbmdlQ2hhbmdlLFxuICBvbk1hbnVhbFJhbmdlQ29tcGxldGUsXG4gIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXG4gIG9uUHJvamVjdElkQ2hhbmdlLFxuICBvbkhvamFHYXN0b3NJZENoYW5nZSxcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2UsXG4gIG9uU3RhdHVzRmlsdGVyQ2hhbmdlLFxuICBvbkNsZWFyLFxuICBvbkFwcGx5LFxufTogRXhwZW5zZUZpbHRlcnNQYW5lbFByb3BzKSA9PiB7XG4gIGlmICghdmlzaWJsZSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGxvY2FsZSA9IGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiO1xuICBjb25zdCBzaG93SW5saW5lRGF0ZVN1bW1hcnkgPSAhc2hvd01hbnVhbERhdGVGaWx0ZXIgJiYgISFmcm9tRGF0ZSAmJiAhIXRvRGF0ZTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLWV4cGFuZGVkIHAtMiBzbTpwLTIuNSByZWxhdGl2ZVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdGFjayBmbGV4IGZsZXgtY29sIHNwYWNlLXktMlwiPlxuICAgICAgICA8RXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMgYWN0aXZlUXVpY2tGaWx0ZXI9e2FjdGl2ZVF1aWNrRmlsdGVyfSBvblF1aWNrRmlsdGVyQ2hhbmdlPXtvblF1aWNrRmlsdGVyQ2hhbmdlfSAvPlxuXG4gICAgICAgIHtzaG93TWFudWFsRGF0ZUZpbHRlciA/IChcbiAgICAgICAgICA8RXhwZW5zZURhdGVSYW5nZUZpbHRlclxuICAgICAgICAgICAgZnJvbURhdGU9e2Zyb21EYXRlfVxuICAgICAgICAgICAgdG9EYXRlPXt0b0RhdGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25EYXRlUmFuZ2VDaGFuZ2V9XG4gICAgICAgICAgICBvblJhbmdlQ29tcGxldGU9e29uTWFudWFsUmFuZ2VDb21wbGV0ZX1cbiAgICAgICAgICAgIGF1dG9PcGVuUmVxdWVzdElkPXttYW51YWxEYXRlQXV0b09wZW5LZXl9XG4gICAgICAgICAgICBzaG93TWFudWFsRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3J9XG4gICAgICAgICAgICBzaG93U3RhcnRFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvciAmJiAhZnJvbURhdGV9XG4gICAgICAgICAgICBzaG93RW5kRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3IgJiYgIXRvRGF0ZX1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogc2hvd0lubGluZURhdGVTdW1tYXJ5ID8gKFxuICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxuICAgICAgICAgICAgc3VtbWFyeUZyb21MYWJlbD17aW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIil9XG4gICAgICAgICAgICBzdW1tYXJ5VG9MYWJlbD17aW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKX1cbiAgICAgICAgICAgIGZyb21WYWx1ZT17Zm9ybWF0RGF0ZShmcm9tRGF0ZSwgbG9jYWxlKX1cbiAgICAgICAgICAgIHRvVmFsdWU9e2Zvcm1hdERhdGUodG9EYXRlLCBsb2NhbGUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ2FwLXktMSB0ZXh0LVsxMXB4XSBweC0xXCJcbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTQgZ2FwLTJcIj5cbiAgICAgICAgICA8RXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfUHJvamVjdFwiLCBcIlByb2plY3RcIil9XG4gICAgICAgICAgICB2YWx1ZT17cHJvamVjdElkfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uUHJvamVjdElkQ2hhbmdlfVxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEV4cGVuc2VTaGVldEZpbHRlcklucHV0XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1NoZWV0XCIsIFwiRXhwZW5zZSBzaGVldFwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU2hlZXRcIiwgXCJFeHBlbnNlIHNoZWV0XCIpfVxuICAgICAgICAgICAgdmFsdWU9e2hvamFHYXN0b3NJZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkhvamFHYXN0b3NJZENoYW5nZX1cbiAgICAgICAgICAgIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XG4gICAgICAgICAgICB2YWx1ZT17Y3VycmVuY3lDb2RlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uQ3VycmVuY3lDb2RlQ2hhbmdlfVxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEV4cGVuc2VTdGF0dXNGaWx0ZXJTZWxlY3RcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzXCIsIFwiRXN0YWRvXCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNfUGxhY2Vob2xkZXJcIiwgXCJFc3RhZG9cIil9XG4gICAgICAgICAgICB2YWx1ZT17c3RhdHVzRmlsdGVyfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uU3RhdHVzRmlsdGVyQ2hhbmdlfVxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8RXhwZW5zZUZpbHRlckFjdGlvbnNcbiAgICAgICAgICBjbGVhckxhYmVsPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xlYXJcIiwgXCJDbGVhclwiKX1cbiAgICAgICAgICBhcHBseUxhYmVsPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQXBwbHlcIiwgXCJBcHBseVwiKX1cbiAgICAgICAgICBvbkNsZWFyPXtvbkNsZWFyfVxuICAgICAgICAgIG9uQXBwbHk9e29uQXBwbHl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VGaWx0ZXJzUGFuZWw7XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRDYXJkLCBFeHBlbnNlU2hlZXRMaXN0RmlsdGVycyB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGJ1aWxkRXhwZW5zZUxpc3RQYXlsb2FkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VQYXlsb2FkQnVpbGRlcnMudHNcIjtcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0TGlzdCwgbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VTaGVldHNMaXN0RGF0YUFyZ3MgPSB7XG4gIGhhc0FjY2VzczogYm9vbGVhbjtcbiAgcGFnZVNpemU6IG51bWJlcjtcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBPd25zIGxpc3QgZGF0YSBmZXRjaCwgbG9hZGluZyBzdGF0ZSwgYW5kIHBhZ2luYXRpb24gbWV0YWRhdGEuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0c0xpc3REYXRhID0gKHsgaGFzQWNjZXNzLCBwYWdlU2l6ZSwgb25Gb3JiaWRkZW4gfTogVXNlRXhwZW5zZVNoZWV0c0xpc3REYXRhQXJncykgPT4ge1xuICBjb25zdCBbaXRlbXMsIHNldEl0ZW1zXSA9IHVzZVN0YXRlPEV4cGVuc2VTaGVldENhcmRbXT4oW10pO1xuICBjb25zdCBbdG90YWwsIHNldFRvdGFsXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbY3VycmVudFBhZ2UsIHNldEN1cnJlbnRQYWdlXSA9IHVzZVN0YXRlKDEpO1xuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgY29uc3QgcmVzdG9yZUxpc3RTbmFwc2hvdCA9IHVzZUNhbGxiYWNrKFxuICAgIChzbmFwc2hvdDogeyBpdGVtczogRXhwZW5zZVNoZWV0Q2FyZFtdOyB0b3RhbDogbnVtYmVyOyBwYWdlOiBudW1iZXIgfSkgPT4ge1xuICAgICAgY29uc3Qgc2FmZUl0ZW1zID0gQXJyYXkuaXNBcnJheShzbmFwc2hvdC5pdGVtcykgPyBzbmFwc2hvdC5pdGVtcyA6IFtdO1xuICAgICAgY29uc3Qgc2FmZVRvdGFsUmF3ID0gTnVtYmVyKHNuYXBzaG90LnRvdGFsKTtcbiAgICAgIGNvbnN0IHNhZmVUb3RhbCA9IE51bWJlci5pc0Zpbml0ZShzYWZlVG90YWxSYXcpICYmIHNhZmVUb3RhbFJhdyA+PSAwID8gc2FmZVRvdGFsUmF3IDogc2FmZUl0ZW1zLmxlbmd0aDtcbiAgICAgIGNvbnN0IHNhZmVQYWdlUmF3ID0gTnVtYmVyKHNuYXBzaG90LnBhZ2UpO1xuICAgICAgY29uc3Qgc2FmZVBhZ2UgPSBOdW1iZXIuaXNGaW5pdGUoc2FmZVBhZ2VSYXcpICYmIHNhZmVQYWdlUmF3ID4gMCA/IE1hdGguZmxvb3Ioc2FmZVBhZ2VSYXcpIDogMTtcblxuICAgICAgc2V0SXRlbXMoc2FmZUl0ZW1zKTtcbiAgICAgIHNldFRvdGFsKHNhZmVUb3RhbCk7XG4gICAgICBzZXRDdXJyZW50UGFnZShzYWZlUGFnZSk7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgIH0sXG4gICAgW11cbiAgKTtcblxuICBjb25zdCBsb2FkTGlzdCA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChwYWdlOiBudW1iZXIsIGZpbHRlcnM6IEV4cGVuc2VTaGVldExpc3RGaWx0ZXJzKSA9PiB7XG4gICAgICBpZiAoIWhhc0FjY2Vzcykge1xuICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZEV4cGVuc2VMaXN0UGF5bG9hZChmaWx0ZXJzLCBwYWdlLCBwYWdlU2l6ZSk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRMaXN0KHBheWxvYWQsIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXRzLlwiKSk7XG4gICAgICAgICAgc2V0SXRlbXMoW10pO1xuICAgICAgICAgIHNldFRvdGFsKDApO1xuICAgICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5leHRJdGVtcyA9IChBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdKS5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQoaXRlbSlcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgbmV4dFRvdGFsID0gTnVtYmVyKHJlc3BvbnNlPy5Ub3RhbCA/PyBuZXh0SXRlbXMubGVuZ3RoID8/IDApO1xuICAgICAgICBzZXRJdGVtcyhuZXh0SXRlbXMpO1xuICAgICAgICBzZXRUb3RhbChuZXh0VG90YWwpO1xuICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXRzLlwiKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICAgIHNldFRvdGFsKDApO1xuICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbaGFzQWNjZXNzLCBvbkZvcmJpZGRlbiwgcGFnZVNpemVdXG4gICk7XG5cbiAgY29uc3QgcmVzZXRMaXN0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEl0ZW1zKFtdKTtcbiAgICBzZXRUb3RhbCgwKTtcbiAgICBzZXRDdXJyZW50UGFnZSgxKTtcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIGl0ZW1zLFxuICAgIHRvdGFsLFxuICAgIGN1cnJlbnRQYWdlLFxuICAgIGlzTG9hZGluZyxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgbG9hZExpc3QsXG4gICAgcmVzdG9yZUxpc3RTbmFwc2hvdCxcbiAgICByZXNldExpc3QsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlUXVpY2tGaWx0ZXJJZCwgQXBwbGllZEZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZUxpc3RUeXBlcy50c1wiO1xuaW1wb3J0IHsgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgc3RhcnRPZkRheSwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBub3JtYWxpemVFeHBlbnNlRmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi9leHBlbnNlRmlsdGVyU25hcHNob3QudHNcIjtcblxudHlwZSBVc2VFeHBlbnNlU2hlZXRzRmlsdGVyc1N0YXRlQXJncyA9IHtcbiAgb25BcHBseUZpbHRlcnM6IChzbmFwc2hvdDogQXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB2b2lkO1xuICBvbkNsZWFyRmlsdGVyczogKCkgPT4gdm9pZDtcbn07XG5cbi8vIE93bnMgZmlsdGVyIFVJIHN0YXRlIGFuZCBhcHBseS9jbGVhciBydWxlcyBmb3IgZXhwZW5zZSBsaXN0IHBhZ2UuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZSA9ICh7IG9uQXBwbHlGaWx0ZXJzLCBvbkNsZWFyRmlsdGVycyB9OiBVc2VFeHBlbnNlU2hlZXRzRmlsdGVyc1N0YXRlQXJncykgPT4ge1xuICBjb25zdCBbZnJvbURhdGUsIHNldEZyb21EYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbdG9EYXRlLCBzZXRUb0RhdGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtwcm9qZWN0SWQsIHNldFByb2plY3RJZF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2hvamFHYXN0b3NJZCwgc2V0SG9qYUdhc3Rvc0lkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbY3VycmVuY3lDb2RlLCBzZXRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtzdGF0dXNGaWx0ZXIsIHNldFN0YXR1c0ZpbHRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZT4oREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIpO1xuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlID0gbnVsbDtcbiAgY29uc3QgW2FjdGl2ZVF1aWNrRmlsdGVyLCBzZXRBY3RpdmVRdWlja0ZpbHRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlUXVpY2tGaWx0ZXJJZCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd01hbnVhbERhdGVGaWx0ZXIsIHNldFNob3dNYW51YWxEYXRlRmlsdGVyXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dNYW51YWxEYXRlRXJyb3IsIHNldFNob3dNYW51YWxEYXRlRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWFudWFsRGF0ZUF1dG9PcGVuS2V5LCBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXldID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFthcHBsaWVkRmlsdGVycywgc2V0QXBwbGllZEZpbHRlcnNdID0gdXNlU3RhdGU8QXBwbGllZEZpbHRlclNuYXBzaG90IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzaG93RmlsdGVycywgc2V0U2hvd0ZpbHRlcnNdID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgY29uc3QgY3VycmVudEZpbHRlcnMgPSB1c2VNZW1vPEFwcGxpZWRGaWx0ZXJTbmFwc2hvdD4oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZyb21EYXRlLFxuICAgICAgdG9EYXRlLFxuICAgICAgcHJvamVjdElkLFxuICAgICAgaG9qYUdhc3Rvc0lkLFxuICAgICAgY3VycmVuY3lDb2RlLFxuICAgICAgc3RhdHVzRmlsdGVyLFxuICAgICAgZXhjaGFuZ2VSYXRlTW9kZSxcbiAgICAgIGZpbHRlcjogaG9qYUdhc3Rvc0lkLFxuICAgIH0pLFxuICAgIFtjdXJyZW5jeUNvZGUsIGZyb21EYXRlLCBob2phR2FzdG9zSWQsIHByb2plY3RJZCwgc3RhdHVzRmlsdGVyLCB0b0RhdGVdXG4gICk7XG5cbiAgY29uc3Qgb25BcHBseSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWZyb21EYXRlIHx8ICF0b0RhdGUpIHtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IodHJ1ZSk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNuYXBzaG90OiBBcHBsaWVkRmlsdGVyU25hcHNob3QgPSB7XG4gICAgICBmcm9tRGF0ZSxcbiAgICAgIHRvRGF0ZSxcbiAgICAgIHByb2plY3RJZCxcbiAgICAgIGhvamFHYXN0b3NJZCxcbiAgICAgIGN1cnJlbmN5Q29kZSxcbiAgICAgIHN0YXR1c0ZpbHRlcixcbiAgICAgIGV4Y2hhbmdlUmF0ZU1vZGUsXG4gICAgICBmaWx0ZXI6IGhvamFHYXN0b3NJZCxcbiAgICB9O1xuXG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgc2V0QXBwbGllZEZpbHRlcnMoc25hcHNob3QpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XG4gICAgb25BcHBseUZpbHRlcnMoc25hcHNob3QpO1xuICB9LCBbY3VycmVuY3lDb2RlLCBmcm9tRGF0ZSwgaG9qYUdhc3Rvc0lkLCBvbkFwcGx5RmlsdGVycywgcHJvamVjdElkLCBzdGF0dXNGaWx0ZXIsIHRvRGF0ZV0pO1xuXG4gIC8vIFJlaHlkcmF0ZXMgdGhlIGxpc3QgZmlsdGVycyBmcm9tIGEgY2FjaGVkIHNuYXBzaG90IHdoZW4gcmV0dXJuaW5nIGZyb20gZGV0YWlsLlxuICBjb25zdCByZXN0b3JlQXBwbGllZEZpbHRlcnMgPSB1c2VDYWxsYmFjaygoc25hcHNob3Q6IEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4ge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlRmlsdGVyU25hcHNob3Qoc25hcHNob3QpO1xuICAgIHNldEZyb21EYXRlKG5vcm1hbGl6ZWQuZnJvbURhdGUpO1xuICAgIHNldFRvRGF0ZShub3JtYWxpemVkLnRvRGF0ZSk7XG4gICAgc2V0UHJvamVjdElkKG5vcm1hbGl6ZWQucHJvamVjdElkKTtcbiAgICBzZXRIb2phR2FzdG9zSWQobm9ybWFsaXplZC5ob2phR2FzdG9zSWQpO1xuICAgIHNldEN1cnJlbmN5Q29kZShub3JtYWxpemVkLmN1cnJlbmN5Q29kZSk7XG4gICAgc2V0U3RhdHVzRmlsdGVyKG5vcm1hbGl6ZWQuc3RhdHVzRmlsdGVyKTtcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgc2V0QXBwbGllZEZpbHRlcnMobm9ybWFsaXplZCk7XG4gICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgb25DbGVhciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRGcm9tRGF0ZShcIlwiKTtcbiAgICBzZXRUb0RhdGUoXCJcIik7XG4gICAgc2V0UHJvamVjdElkKFwiXCIpO1xuICAgIHNldEhvamFHYXN0b3NJZChcIlwiKTtcbiAgICBzZXRDdXJyZW5jeUNvZGUoXCJcIik7XG4gICAgc2V0U3RhdHVzRmlsdGVyKERFRkFVTFRfRVhQRU5TRV9TVEFUVVNfRklMVEVSKTtcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgc2V0TWFudWFsRGF0ZUF1dG9PcGVuS2V5KDApO1xuICAgIHNldEFwcGxpZWRGaWx0ZXJzKG51bGwpO1xuICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xuICAgIG9uQ2xlYXJGaWx0ZXJzKCk7XG4gIH0sIFtvbkNsZWFyRmlsdGVyc10pO1xuXG4gIGNvbnN0IG9uRGF0ZVJhbmdlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXG4gICAgKG5leHRGcm9tRGF0ZTogc3RyaW5nLCBuZXh0VG9EYXRlOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGhhc0Z1bGxSYW5nZSA9ICEhbmV4dEZyb21EYXRlICYmICEhbmV4dFRvRGF0ZTtcbiAgICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XG4gICAgICBzZXRUb0RhdGUobmV4dFRvRGF0ZSk7XG4gICAgICBpZiAoIWhhc0Z1bGxSYW5nZSkge1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcbiAgICAgIH1cbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgaWYgKHNob3dNYW51YWxEYXRlRXJyb3IpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcighaGFzRnVsbFJhbmdlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtzaG93TWFudWFsRGF0ZUVycm9yXVxuICApO1xuXG4gIC8vIENsb3NlcyB0aGUgbWFudWFsIGRhdGUgVUkgb25jZSB0aGUgdXNlciBmaW5pc2hlcyBzZWxlY3RpbmcgYSBmdWxsIHJhbmdlLlxuICBjb25zdCBvbk1hbnVhbFJhbmdlQ29tcGxldGUgPSB1c2VDYWxsYmFjaygobmV4dEZyb21EYXRlOiBzdHJpbmcsIG5leHRUb0RhdGU6IHN0cmluZykgPT4ge1xuICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XG4gICAgc2V0VG9EYXRlKG5leHRUb0RhdGUpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG9uUXVpY2tGaWx0ZXJDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAoZmlsdGVySWQ6IEV4cGVuc2VRdWlja0ZpbHRlcklkKSA9PiB7XG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiY3VzdG9tXCIpIHtcbiAgICAgICAgLy8gVG9nZ2xlIG1hbnVhbCBkYXRlIGNvbnRyb2xzIG9uIGV2ZXJ5IERhdGUgYnV0dG9uIGNsaWNrLlxuICAgICAgICBpZiAoc2hvd01hbnVhbERhdGVGaWx0ZXIpIHtcbiAgICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKHRydWUpO1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICAgICAgLy8gQWx3YXlzIGFzayB0aGUgZGF0ZSBjb21wb25lbnQgdG8gb3BlbiB0aGUgY2FsZW5kYXIgd2hlbiBEYXRlIGlzIHByZXNzZWQuXG4gICAgICAgIHNldE1hbnVhbERhdGVBdXRvT3BlbktleSgocHJldmlvdXMpID0+IHByZXZpb3VzICsgMSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoZmlsdGVySWQpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG5cbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcbiAgICAgIGNvbnN0IG5leHRGcm9tID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtN1wiKSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gNik7XG4gICAgICB9IGVsc2UgaWYgKGZpbHRlcklkID09PSBcImRheXMtMzBcIikge1xuICAgICAgICBuZXh0RnJvbS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDI5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gODkpO1xuICAgICAgfVxuXG4gICAgICBzZXRGcm9tRGF0ZSh0b0lzb0RhdGUobmV4dEZyb20pKTtcbiAgICAgIHNldFRvRGF0ZSh0b0lzb0RhdGUodG9kYXkpKTtcbiAgICB9LFxuICAgIFtzaG93TWFudWFsRGF0ZUZpbHRlcl1cbiAgKTtcblxuICBjb25zdCB0b2dnbGVGaWx0ZXJQYW5lbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRTaG93RmlsdGVycygocHJldmlvdXMpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSAhcHJldmlvdXM7XG4gICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIGZyb21EYXRlLFxuICAgIHRvRGF0ZSxcbiAgICBwcm9qZWN0SWQsXG4gICAgaG9qYUdhc3Rvc0lkLFxuICAgIGN1cnJlbmN5Q29kZSxcbiAgICBzdGF0dXNGaWx0ZXIsXG4gICAgZXhjaGFuZ2VSYXRlTW9kZSxcbiAgICBhY3RpdmVRdWlja0ZpbHRlcixcbiAgICBzaG93TWFudWFsRGF0ZUZpbHRlcixcbiAgICBzaG93TWFudWFsRGF0ZUVycm9yLFxuICAgIG1hbnVhbERhdGVBdXRvT3BlbktleSxcbiAgICBhcHBsaWVkRmlsdGVycyxcbiAgICBzaG93RmlsdGVycyxcbiAgICBjdXJyZW50RmlsdGVycyxcbiAgICBzZXRQcm9qZWN0SWQsXG4gICAgc2V0SG9qYUdhc3Rvc0lkLFxuICAgIHNldEN1cnJlbmN5Q29kZSxcbiAgICBzZXRTdGF0dXNGaWx0ZXIsXG4gICAgb25BcHBseSxcbiAgICBvbkNsZWFyLFxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcbiAgICBvbkRhdGVSYW5nZUNoYW5nZSxcbiAgICBvbk1hbnVhbFJhbmdlQ29tcGxldGUsXG4gICAgb25RdWlja0ZpbHRlckNoYW5nZSxcbiAgICB0b2dnbGVGaWx0ZXJQYW5lbCxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBBcHBsaWVkRmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi9leHBlbnNlTGlzdFR5cGVzLnRzXCI7XG5pbXBvcnQgeyBERUZBVUxUX0VYUEVOU0VfU1RBVFVTX0ZJTFRFUiwgbm9ybWFsaXplRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XG5cbi8vIE5vcm1hbGl6ZXMgYW4gZXhwZW5zZSBmaWx0ZXIgc25hcHNob3Qgc28gY2FjaGUgYW5kIFVJIHVzZSBvbmUgY2Fub25pY2FsIHNoYXBlLlxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VGaWx0ZXJTbmFwc2hvdCA9IChcbiAgdmFsdWU6IFBhcnRpYWw8QXBwbGllZEZpbHRlclNuYXBzaG90PiB8IG51bGwgfCB1bmRlZmluZWRcbik6IEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9PiB7XG4gIGNvbnN0IGV4cGVuc2VTaGVldFN0YXR1c1JhdyA9IE51bWJlcihcbiAgICAodmFsdWUgYXMgeyBleHBlbnNlU2hlZXRTdGF0dXM/OiB1bmtub3duIH0gfCBudWxsIHwgdW5kZWZpbmVkKT8uZXhwZW5zZVNoZWV0U3RhdHVzXG4gICk7XG4gIGNvbnN0IGJpbGxlZE1vZGVSYXcgPSBOdW1iZXIoKHZhbHVlIGFzIHsgYmlsbGVkTW9kZT86IHVua25vd24gfSB8IG51bGwgfCB1bmRlZmluZWQpPy5iaWxsZWRNb2RlKTtcbiAgY29uc3QgaGFzRXhwbGljaXRTdGF0dXMgPSBOdW1iZXIuaXNJbnRlZ2VyKGV4cGVuc2VTaGVldFN0YXR1c1JhdykgJiYgZXhwZW5zZVNoZWV0U3RhdHVzUmF3ID49IDAgJiYgZXhwZW5zZVNoZWV0U3RhdHVzUmF3IDw9IDQ7XG4gIGNvbnN0IGxlZ2FjeVN0YXR1c0ZhbGxiYWNrID0gYmlsbGVkTW9kZVJhdyA9PT0gMSA/IDQgOiBiaWxsZWRNb2RlUmF3ID09PSAwID8gMCA6IERFRkFVTFRfRVhQRU5TRV9TVEFUVVNfRklMVEVSO1xuICBjb25zdCBzdGF0dXNGaWx0ZXIgPSBub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZShcbiAgICBoYXNFeHBsaWNpdFN0YXR1cyA/IGV4cGVuc2VTaGVldFN0YXR1c1JhdyA6IHZhbHVlPy5zdGF0dXNGaWx0ZXIsXG4gICAgbGVnYWN5U3RhdHVzRmFsbGJhY2tcbiAgKTtcbiAgY29uc3QgaG9qYUdhc3Rvc0lkID0gU3RyaW5nKHZhbHVlPy5ob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpO1xuXG4gIHJldHVybiB7XG4gICAgZnJvbURhdGU6IFN0cmluZyh2YWx1ZT8uZnJvbURhdGUgfHwgXCJcIikudHJpbSgpLFxuICAgIHRvRGF0ZTogU3RyaW5nKHZhbHVlPy50b0RhdGUgfHwgXCJcIikudHJpbSgpLFxuICAgIHByb2plY3RJZDogU3RyaW5nKHZhbHVlPy5wcm9qZWN0SWQgfHwgXCJcIikudHJpbSgpLFxuICAgIGhvamFHYXN0b3NJZCxcbiAgICBjdXJyZW5jeUNvZGU6IFN0cmluZyh2YWx1ZT8uY3VycmVuY3lDb2RlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICBzdGF0dXNGaWx0ZXIsXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogbnVsbCxcbiAgICBmaWx0ZXI6IFN0cmluZyh2YWx1ZT8uZmlsdGVyIHx8IGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCksXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7IEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuL2V4cGVuc2VMaXN0VHlwZXMudHNcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuL2V4cGVuc2VGaWx0ZXJTbmFwc2hvdC50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRDYXJkIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHtcbiAgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LFxuICBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LFxuICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LFxuICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksXG4gIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXG59IGZyb20gXCIuLi8uLi8uLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XG5cbmNvbnN0IEVYUEVOU0VfU0hFRVRTX0ZJTFRFUl9LRVlfUFJFRklYID0gXCJleHBlbnNlX3NoZWV0c19maWx0ZXJfdjFcIjtcbmNvbnN0IEVYUEVOU0VfU0hFRVRTX1JFVFVSTl9GTEFHX0tFWV9QUkVGSVggPSBcImV4cGVuc2Vfc2hlZXRzX3JldHVybl92MVwiO1xuY29uc3QgRVhQRU5TRV9TSEVFVFNfQ0FDSEVfVFRMX01TID0gMTIgKiA2MCAqIDYwICogMTAwMDtcblxuZXhwb3J0IHR5cGUgRXhwZW5zZVNoZWV0c0NhY2hlZFN0YXRlID0ge1xuICBmaWx0ZXJzOiBBcHBsaWVkRmlsdGVyU25hcHNob3Q7XG4gIHBhZ2U6IG51bWJlcjtcbiAgc2Nyb2xsWTogbnVtYmVyO1xuICBpdGVtczogRXhwZW5zZVNoZWV0Q2FyZFtdO1xuICB0b3RhbDogbnVtYmVyO1xufTtcblxuY29uc3QgZ2V0U2NvcGVUb2tlbiA9ICgpOiBzdHJpbmcgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIFwic2Vzc2lvblwiO1xuICBjb25zdCByYXcgPSBTdHJpbmcoKHdpbmRvdyBhcyB7IF9fSU5EX0VOVFJBX09JRF9fPzogdW5rbm93biB9KS5fX0lORF9FTlRSQV9PSURfXyB8fCBcIlwiKVxuICAgIC50cmltKClcbiAgICAudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIHJhdyB8fCBcInNlc3Npb25cIjtcbn07XG5cbmNvbnN0IGdldFNjb3BlZEtleXMgPSAoKSA9PiB7XG4gIGNvbnN0IHNjb3BlID0gZ2V0U2NvcGVUb2tlbigpO1xuICByZXR1cm4ge1xuICAgIGZpbHRlcktleTogYCR7RVhQRU5TRV9TSEVFVFNfRklMVEVSX0tFWV9QUkVGSVh9XyR7c2NvcGV9YCxcbiAgICByZXR1cm5GbGFnS2V5OiBgJHtFWFBFTlNFX1NIRUVUU19SRVRVUk5fRkxBR19LRVlfUFJFRklYfV8ke3Njb3BlfWAsXG4gIH07XG59O1xuXG5jb25zdCB0b051bGxhYmxlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XG59O1xuXG5jb25zdCBub3JtYWxpemVJdGVtcyA9IChyYXc6IHVua25vd24pOiBFeHBlbnNlU2hlZXRDYXJkW10gPT4ge1xuICBpZiAoIUFycmF5LmlzQXJyYXkocmF3KSkgcmV0dXJuIFtdO1xuXG4gIHJldHVybiByYXcubWFwKChlbnRyeSkgPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSAoZW50cnkgfHwge30pIGFzIFBhcnRpYWw8RXhwZW5zZVNoZWV0Q2FyZD47XG4gICAgcmV0dXJuIHtcbiAgICAgIGhvamFHYXN0b3NJZDogU3RyaW5nKGl0ZW0uaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSxcbiAgICAgIGRlc2NyaXB0aW9uOiB0eXBlb2YgaXRlbS5kZXNjcmlwdGlvbiA9PT0gXCJzdHJpbmdcIiA/IGl0ZW0uZGVzY3JpcHRpb24udHJpbSgpIDogdW5kZWZpbmVkLFxuICAgICAgZXhwZW5zZVNoZWV0U3RhdHVzOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhwZW5zZVNoZWV0U3RhdHVzKSxcbiAgICAgIGVzdGFkb0NvbWVudGFyaW9zOiB0eXBlb2YgaXRlbS5lc3RhZG9Db21lbnRhcmlvcyA9PT0gXCJzdHJpbmdcIiA/IGl0ZW0uZXN0YWRvQ29tZW50YXJpb3MudHJpbSgpIDogbnVsbCxcbiAgICAgIHVzZXJJZDogdHlwZW9mIGl0ZW0udXNlcklkID09PSBcInN0cmluZ1wiID8gaXRlbS51c2VySWQudHJpbSgpIDogdW5kZWZpbmVkLFxuICAgICAgdm91Y2hlcjogdHlwZW9mIGl0ZW0udm91Y2hlciA9PT0gXCJzdHJpbmdcIiA/IGl0ZW0udm91Y2hlci50cmltKCkgOiB1bmRlZmluZWQsXG4gICAgICBwcm9qSWQ6IHR5cGVvZiBpdGVtLnByb2pJZCA9PT0gXCJzdHJpbmdcIiA/IGl0ZW0ucHJvaklkLnRyaW0oKSA6IHVuZGVmaW5lZCxcbiAgICAgIGN1cnJlbmN5Q29kZTogdHlwZW9mIGl0ZW0uY3VycmVuY3lDb2RlID09PSBcInN0cmluZ1wiID8gaXRlbS5jdXJyZW5jeUNvZGUudHJpbSgpIDogdW5kZWZpbmVkLFxuICAgICAgdG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS50b3RhbEFtb3VudCksXG4gICAgICBleGNoUmF0ZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLmV4Y2hSYXRlKSxcbiAgICAgIGV4Y2hhbmdlUmF0ZU1vZGU6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5leGNoYW5nZVJhdGVNb2RlKSxcbiAgICAgIGNyZWF0ZWREYXRlOiB0eXBlb2YgaXRlbS5jcmVhdGVkRGF0ZSA9PT0gXCJzdHJpbmdcIiA/IGl0ZW0uY3JlYXRlZERhdGUudHJpbSgpIDogdW5kZWZpbmVkLFxuICAgIH07XG4gIH0pO1xufTtcblxuY29uc3Qgbm9ybWFsaXplU3RhdGUgPSAocmF3OiBFeHBlbnNlU2hlZXRzQ2FjaGVkU3RhdGUgfCBudWxsKTogRXhwZW5zZVNoZWV0c0NhY2hlZFN0YXRlIHwgbnVsbCA9PiB7XG4gIGlmICghcmF3IHx8IHR5cGVvZiByYXcgIT09IFwib2JqZWN0XCIpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHBhZ2VSYXcgPSBOdW1iZXIocmF3LnBhZ2UpO1xuICBjb25zdCBwYWdlID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VSYXcpICYmIHBhZ2VSYXcgPiAwID8gTWF0aC5mbG9vcihwYWdlUmF3KSA6IDE7XG5cbiAgY29uc3Qgc2Nyb2xsUmF3ID0gTnVtYmVyKHJhdy5zY3JvbGxZKTtcbiAgY29uc3Qgc2Nyb2xsWSA9IE51bWJlci5pc0Zpbml0ZShzY3JvbGxSYXcpICYmIHNjcm9sbFJhdyA+PSAwID8gTWF0aC5mbG9vcihzY3JvbGxSYXcpIDogMDtcbiAgY29uc3QgaXRlbXMgPSBub3JtYWxpemVJdGVtcygocmF3IGFzIHsgaXRlbXM/OiB1bmtub3duIH0pLml0ZW1zKTtcbiAgY29uc3QgdG90YWxSYXcgPSBOdW1iZXIoKHJhdyBhcyB7IHRvdGFsPzogdW5rbm93biB9KS50b3RhbCk7XG4gIGNvbnN0IHRvdGFsID0gTnVtYmVyLmlzRmluaXRlKHRvdGFsUmF3KSAmJiB0b3RhbFJhdyA+PSAwID8gdG90YWxSYXcgOiBpdGVtcy5sZW5ndGg7XG5cbiAgcmV0dXJuIHtcbiAgICBmaWx0ZXJzOiBub3JtYWxpemVFeHBlbnNlRmlsdGVyU25hcHNob3QocmF3LmZpbHRlcnMpLFxuICAgIHBhZ2UsXG4gICAgc2Nyb2xsWSxcbiAgICBpdGVtcyxcbiAgICB0b3RhbCxcbiAgfTtcbn07XG5cbi8vIENlbnRyYWxpemVzIGNhY2hlIHBlcnNpc3RlbmNlIGZvciByZXR1cm5pbmcgZnJvbSBleHBlbnNlIGRldGFpbCB0byBsaXN0LlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSA9ICgpID0+IHtcbiAgY29uc3QgcmVhZENhY2hlZFN0YXRlID0gdXNlQ2FsbGJhY2soKCk6IEV4cGVuc2VTaGVldHNDYWNoZWRTdGF0ZSB8IG51bGwgPT4ge1xuICAgIGNvbnN0IGtleXMgPSBnZXRTY29wZWRLZXlzKCk7XG4gICAgY29uc3QgcmF3ID0gZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5PEV4cGVuc2VTaGVldHNDYWNoZWRTdGF0ZT4oa2V5cy5maWx0ZXJLZXkpO1xuICAgIHJldHVybiBub3JtYWxpemVTdGF0ZShyYXcpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY29uc3VtZVJldHVybkZsYWcgPSB1c2VDYWxsYmFjaygoKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3Qga2V5cyA9IGdldFNjb3BlZEtleXMoKTtcbiAgICBjb25zdCByYXcgPSBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleXMucmV0dXJuRmxhZ0tleSk7XG4gICAgaWYgKHJhdyA9PT0gXCIxXCIpIHtcbiAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5cy5yZXR1cm5GbGFnS2V5KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sIFtdKTtcblxuICBjb25zdCBzYXZlQ2FjaGVkU3RhdGUgPSB1c2VDYWxsYmFjaygoc3RhdGU6IEV4cGVuc2VTaGVldHNDYWNoZWRTdGF0ZSk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVTdGF0ZShzdGF0ZSk7XG4gICAgaWYgKCFub3JtYWxpemVkKSByZXR1cm47XG5cbiAgICBjb25zdCBrZXlzID0gZ2V0U2NvcGVkS2V5cygpO1xuICAgIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeShrZXlzLmZpbHRlcktleSwgbm9ybWFsaXplZCwgRVhQRU5TRV9TSEVFVFNfQ0FDSEVfVFRMX01TKTtcbiAgICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleXMucmV0dXJuRmxhZ0tleSwgXCIxXCIsIEVYUEVOU0VfU0hFRVRTX0NBQ0hFX1RUTF9NUyk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBjbGVhckNhY2hlZFN0YXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IGtleXMgPSBnZXRTY29wZWRLZXlzKCk7XG4gICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXlzLmZpbHRlcktleSk7XG4gICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXlzLnJldHVybkZsYWdLZXkpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIHtcbiAgICByZWFkQ2FjaGVkU3RhdGUsXG4gICAgY29uc3VtZVJldHVybkZsYWcsXG4gICAgc2F2ZUNhY2hlZFN0YXRlLFxuICAgIGNsZWFyQ2FjaGVkU3RhdGUsXG4gIH07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUF1RDs7O0FDQXZELG1CQUFtQztBQW1GN0I7QUFqRU4sSUFBTSxtQkFBbUI7QUFFekIsSUFBTSxrQkFBa0IsQ0FBQyxVQUF1RTtBQUM5RixVQUFRLE1BQU0sUUFBUSxLQUFLLElBQUksUUFBUSxDQUFDLEdBQ3JDLElBQUksQ0FBQyxTQUFTO0FBQ2IsVUFBTSxLQUFLLE9BQU8sTUFBTSxnQkFBZ0IsRUFBRSxFQUFFLEtBQUs7QUFDakQsUUFBSSxDQUFDLEdBQUksUUFBTztBQUNoQixXQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxVQUFVLE9BQU8sTUFBTSxlQUFlLEVBQUUsRUFBRSxLQUFLLEtBQUs7QUFBQSxJQUN0RDtBQUFBLEVBQ0YsQ0FBQyxFQUNBLE9BQU8sT0FBTztBQUNuQjtBQUdBLElBQU0sMEJBQTBCLENBQUM7QUFBQSxFQUMvQjtBQUFBLEVBQ0E7QUFBQSxFQUNB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Q3RCLGdCQUFNLFdBQVcsa0JBQWtCO0FBQ25DLGVBQUssU0FBUyxNQUFNLFFBQVE7QUFBQSxRQUM5QjtBQUFBLFFBQ0EsUUFBUTtBQUFBO0FBQUEsSUFDVjtBQUFBLElBRUMsbUJBQ0M7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE9BQU07QUFBQSxRQUNOLFdBQVcsS0FBSyxpQkFBaUIsUUFBUTtBQUFBLFFBQ3pDLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQTtBQUFBLElBQ1gsSUFDRTtBQUFBLEtBQ047QUFFSjtBQUdBLElBQU0sb0JBQW9CLE1BQU07QUFDOUIsU0FDRSw2Q0FBQyxnQ0FDQyx1REFBQyw0QkFBeUIsR0FDNUI7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLHFCQUFxQjtBQUM1RCxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLHFCQUFrQixDQUFFO0FBQ2hEO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyw0QkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJSZWFjdCJdCn0K
