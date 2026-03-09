import {
  ExpenseDateRangeFilter_default,
  ExpenseFilterActions_default,
  ExpenseManagedUserFilterSelect_default,
  ExpenseQuickDateFilters_default,
  buildExpenseListPayload,
  buildExpenseSheetSuggestPayload
} from "./chunks/chunk-RUEV7LNH.js";
import {
  HistorySummary_default
} from "./chunks/chunk-7Z3NMBR5.js";
import {
  normalizeExpenseFilterSnapshot,
  useExpenseSheetsFilterCache
} from "./chunks/chunk-WKVYIU5K.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-5RX6JT22.js";
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
} from "./chunks/chunk-NKPACNDZ.js";
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
} from "./chunks/chunk-FUOK7RBM.js";
import {
  configureExpenseApiAuth,
  fetchExpenseSheetList,
  mapExpenseSheetListItemToCard
} from "./chunks/chunk-SAOIE2GK.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-7GJWN6F3.js";
import {
  clearExpenseActingUserOverride,
  setExpenseActingUserOverride
} from "./chunks/chunk-QGAYQR5R.js";
import {
  setTopbarActionGroupReady
} from "./chunks/chunk-6G7EOWHU.js";
import {
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
import "./chunks/chunk-7SKLSV7K.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/gastos/list/ExpenseSheetsPage.tsx
var import_react5 = __toESM(require_react());

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
  managedUserId = "",
  onChange,
  enableRemoteSuggestions = true,
  disabled = false,
  readOnly = false,
  showLabel = true
}) => {
  const readOnlyMode = readOnly || disabled;
  const normalizedManagedUserId = String(managedUserId || "").trim();
  const loadOptions = (0, import_react.useCallback)(async (term, signal) => {
    const payload = buildExpenseSheetSuggestPayload(term, SEARCH_PAGE_SIZE, 1);
    const response = await fetchExpenseSheetList(payload, {
      suppressPermissionModal: true,
      axUserIdOverride: normalizedManagedUserId || void 0,
      signal
    });
    if (response?.Success === false) {
      return [];
    }
    return mapSheetOptions(response?.Items);
  }, [normalizedManagedUserId]);
  const loadOptionsPage = (0, import_react.useCallback)(async (term, page, pageSize, signal) => {
    const payload = buildExpenseSheetSuggestPayload(term, pageSize, page);
    const response = await fetchExpenseSheetList(payload, {
      suppressPermissionModal: true,
      axUserIdOverride: normalizedManagedUserId || void 0,
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
  }, [normalizedManagedUserId]);
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
          managedUserId,
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
          label: indT("ExpenseSheets_Filter_User", "User"),
          placeholder: indT("ExpenseSheets_Filter_User", "User"),
          value: managedUserId,
          users: managedUsers,
          onChange: onManagedUserIdChange,
          showLabel: false,
          clearOnEmptyInput: true
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
      const selectedManagedUserId = String(filters?.managedUserId || "").trim();
      try {
        const response = await fetchExpenseSheetList(payload, {
          suppressPermissionModal: true,
          axUserIdOverride: selectedManagedUserId || void 0
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

// Web/wwwroot/react/src/pages/gastos/list/ExpenseSheetsPage.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var PAGE_SIZE = 6;
var FAB_BASE_BOTTOM = 24;
var FAB_CLEARANCE = 24;
var FAB_GAP = 12;
var normalizeUserId = (value) => String(value || "").trim();
var isSameUser = (left, right) => {
  const normalizedLeft = normalizeUserId(left).toUpperCase();
  const normalizedRight = normalizeUserId(right).toUpperCase();
  return !!normalizedLeft && normalizedLeft === normalizedRight;
};
var resolveManagedUserSelection = (requestedUserId, users) => {
  const normalizedRequested = normalizeUserId(requestedUserId);
  if (!normalizedRequested) return "";
  const found = users.find((entry) => isSameUser(entry.axUserId, normalizedRequested));
  return found?.axUserId || "";
};
var normalizeManagedUserFilterValue = (value, users) => {
  const normalized = normalizeUserId(value);
  if (!normalized) return "";
  const directMatch = users.find((entry) => isSameUser(entry.axUserId, normalized));
  if (directMatch) return directMatch.axUserId;
  const valueToken = normalized.split("-")[0]?.trim() || normalized;
  const tokenMatch = users.find((entry) => isSameUser(entry.axUserId, valueToken));
  if (tokenMatch) return tokenMatch.axUserId;
  return valueToken;
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
  const timelineContainerRef = import_react5.default.useRef(null);
  const paginationRef = import_react5.default.useRef(null);
  const [fabBottom, setFabBottom] = (0, import_react5.useState)(FAB_BASE_BOTTOM);
  const { manageableSubordinates } = useAuthContext();
  const managedUsers = (0, import_react5.useMemo)(
    () => Array.isArray(manageableSubordinates) ? manageableSubordinates : [],
    [manageableSubordinates]
  );
  const showManagedUserFilter = managedUsers.length > 0;
  const managedUserLabelById = (0, import_react5.useMemo)(() => {
    const map = /* @__PURE__ */ new Map();
    managedUsers.forEach((entry) => {
      const id = normalizeUserId(entry.axUserId);
      if (!id) return;
      const name = normalizeUserId(entry.name);
      map.set(id.toUpperCase(), name || id);
    });
    return map;
  }, [managedUsers]);
  const paginationLabels = (0, import_react5.useMemo)(
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
  const didRestoreOnMountRef = import_react5.default.useRef(false);
  const pendingScrollRestoreRef = import_react5.default.useRef(null);
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
      const resolvedManagedUserId = normalizeManagedUserFilterValue(snapshot.managedUserId, managedUsers);
      if (resolvedManagedUserId) {
        setExpenseActingUserOverride(resolvedManagedUserId);
      } else {
        clearExpenseActingUserOverride();
      }
      void loadList(1, {
        ...snapshot,
        managedUserId: resolvedManagedUserId
      });
    },
    onClearFilters: () => {
      setManagedUserId("");
      clearCachedState();
      clearExpenseActingUserOverride();
      resetList();
    },
    defaultManagedUserId: ""
  });
  const handleManagedUserIdChange = (0, import_react5.useCallback)(
    (value) => {
      const normalizedValue = normalizeManagedUserFilterValue(value, managedUsers);
      const wasManagedUserSelected = !!normalizeUserId(managedUserId);
      const shouldAutoApplyClear = wasManagedUserSelected && !normalizedValue;
      setManagedUserId(normalizedValue);
      clearCachedState();
      if (!shouldAutoApplyClear) {
        return;
      }
      const nextSnapshot = {
        ...appliedFilters || currentFilters,
        managedUserId: ""
      };
      clearExpenseActingUserOverride();
      restoreAppliedFilters(nextSnapshot);
      void loadList(1, nextSnapshot);
    },
    [
      appliedFilters,
      clearCachedState,
      currentFilters,
      loadList,
      managedUserId,
      managedUsers,
      restoreAppliedFilters,
      setManagedUserId
    ]
  );
  const goToDetail = (0, import_react5.useCallback)(
    (sheetId) => {
      if (!sheetId) return;
      const snapshot = appliedFilters || currentFilters;
      const resolvedManagedUserId = normalizeManagedUserFilterValue(snapshot.managedUserId, managedUsers);
      const normalizedSnapshot = {
        ...snapshot,
        managedUserId: resolvedManagedUserId
      };
      if (resolvedManagedUserId) {
        setExpenseActingUserOverride(resolvedManagedUserId);
      } else {
        clearExpenseActingUserOverride();
      }
      saveCachedState({
        filters: normalizedSnapshot,
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
    [appliedFilters, currentFilters, currentPage, items, managedUsers, saveCachedState, total]
  );
  const handleOpenCreateSheetMode = (0, import_react5.useCallback)(() => {
    if (!canCreateExpense) {
      showPermissionModal();
      return;
    }
    navigateToExpenseUrl("/Gastos/ExpenseSheetDetail?mode=create", {
      bypassGuardOnce: false
    });
  }, [canCreateExpense]);
  const resolveClickableCard = (0, import_react5.useCallback)((target) => {
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
  (0, import_react5.useEffect)(() => {
    setTopbarActionGroupReady("expense-sheets-list-actions");
  }, []);
  const updateFabBottom = (0, import_react5.useCallback)(() => {
    if (!paginationRef.current || totalPages <= 1) {
      setFabBottom(FAB_BASE_BOTTOM);
      return;
    }
    const height = paginationRef.current.offsetHeight || 0;
    const nextBottom = Math.max(FAB_BASE_BOTTOM, height + FAB_CLEARANCE + FAB_GAP);
    setFabBottom((previous) => Math.abs(previous - nextBottom) < 1 ? previous : nextBottom);
  }, [totalPages]);
  (0, import_react5.useEffect)(() => {
    updateFabBottom();
    let observer = null;
    const paginationEl = paginationRef.current;
    if (paginationEl && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => updateFabBottom());
      observer.observe(paginationEl);
    }
    window.addEventListener("resize", updateFabBottom);
    return () => {
      window.removeEventListener("resize", updateFabBottom);
      if (observer) observer.disconnect();
    };
  }, [updateFabBottom]);
  const summaryItems = (0, import_react5.useMemo)(() => {
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
    if (appliedManagedUserId) {
      const managedUserLabel = managedUserLabelById.get(appliedManagedUserId.toUpperCase()) || appliedManagedUserId;
      summary.push({
        key: "managed-user",
        label: indT("ExpenseSheets_Filter_User", "User"),
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
  }, [appliedFilters, managedUserLabelById]);
  const showSummary = !showFilters && summaryItems.length > 0;
  (0, import_react5.useEffect)(() => {
    if (didRestoreOnMountRef.current) return;
    didRestoreOnMountRef.current = true;
    if (!consumeReturnFlag()) {
      clearCachedState();
      setManagedUserId("");
      clearExpenseActingUserOverride();
      return;
    }
    const cachedState = readCachedState();
    if (!cachedState) {
      clearCachedState();
      setManagedUserId("");
      clearExpenseActingUserOverride();
      return;
    }
    const restoredManagedUserId = resolveManagedUserSelection(cachedState.filters.managedUserId, managedUsers);
    const restoredFilters = {
      ...cachedState.filters,
      managedUserId: restoredManagedUserId
    };
    if (restoredManagedUserId) {
      setExpenseActingUserOverride(restoredManagedUserId);
    } else {
      clearExpenseActingUserOverride();
    }
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
    loadList,
    managedUsers,
    readCachedState,
    restoreAppliedFilters,
    restoreListSnapshot,
    setManagedUserId
  ]);
  (0, import_react5.useEffect)(() => {
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
  (0, import_react5.useEffect)(() => {
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
      const resolvedManagedUserId = normalizeManagedUserFilterValue(appliedFilters.managedUserId, managedUsers);
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
  }, [appliedFilters, currentPage, loadList, managedUsers, showFilters, toggleFilterPanel]);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-2", children: [
    showSummary ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "filter-card filter-card--summary p-3 sm:p-4 mt-1 mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "expense-summary-grid grid grid-cols-1 min-[360px]:grid-cols-2 items-start gap-x-4 gap-y-1 text-xs", children: summaryItems.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "div",
      {
        className: `history-filter-summary history-filter-summary--grid-item leading-5 min-w-0 ${item.key === "managed-user" ? "min-[360px]:col-span-2" : ""}`,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "history-filter-summary__label font-semibold", children: [
            item.label,
            ":"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: `history-filter-summary__value ${item.key === "managed-user" ? "block truncate whitespace-nowrap" : "break-words"}`, children: item.value })
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
        showManagedUserFilter,
        statusFilter,
        activeQuickFilter,
        onDateRangeChange,
        onManualRangeComplete,
        onQuickFilterChange,
        onProjectIdChange: setProjectId,
        onHojaGastosIdChange: setHojaGastosId,
        onCurrencyCodeChange: setCurrencyCode,
        onManagedUserIdChange: handleManagedUserIdChange,
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
        ref: paginationRef,
        totalPages,
        currentPage,
        loading: isLoading,
        onPageChange: (page) => {
          const snapshot = appliedFilters || currentFilters;
          const resolvedManagedUserId = normalizeManagedUserFilterValue(snapshot.managedUserId, managedUsers);
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
        bottom: fabBottom,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saXN0L0V4cGVuc2VTaGVldHNQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0RmlsdGVySW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0LnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZUZpbHRlcnNQYW5lbC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saXN0L3VzZUV4cGVuc2VTaGVldHNMaXN0RGF0YS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpc3QvdXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcbmltcG9ydCBDb21wYWN0UGFnaW5hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeFwiO1xuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCwgdHlwZSBBdXRoTWFuYWdlZFVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XG5pbXBvcnQge1xuICBERUZBVUxUX0VYUEVOU0VfU1RBVFVTX0ZJTFRFUixcbiAgZ2V0RXhwZW5zZVN0YXR1c0JhZGdlQ2xhc3NOYW1lLFxuICBnZXRFeHBlbnNlU3RhdHVzTGFiZWwsXG4gIG5vcm1hbGl6ZUV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgRXhwZW5zZUZpbHRlcnNQYW5lbCBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlRmlsdGVyc1BhbmVsLnRzeFwiO1xuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzLCBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIGhhc0Fzc2lnbmVkVm91Y2hlciwgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldHNMaXN0RGF0YSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldHNMaXN0RGF0YS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldHNGaWx0ZXJzU3RhdGUudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZS50c1wiO1xuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBjbGVhckV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUsIHNldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFjdGluZ1VzZXIudHNcIjtcbmltcG9ydCB7IHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdG9wYmFyQWN0aW9uVmlzaWJpbGl0eS50c1wiO1xuXG5jb25zdCBQQUdFX1NJWkUgPSA2O1xuY29uc3QgRkFCX0JBU0VfQk9UVE9NID0gMjQ7XG5jb25zdCBGQUJfQ0xFQVJBTkNFID0gMjQ7XG5jb25zdCBGQUJfR0FQID0gMTI7XG5cbmNvbnN0IG5vcm1hbGl6ZVVzZXJJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xuXG5jb25zdCBpc1NhbWVVc2VyID0gKGxlZnQ6IHN0cmluZywgcmlnaHQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkTGVmdCA9IG5vcm1hbGl6ZVVzZXJJZChsZWZ0KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBub3JtYWxpemVkUmlnaHQgPSBub3JtYWxpemVVc2VySWQocmlnaHQpLnRvVXBwZXJDYXNlKCk7XG4gIHJldHVybiAhIW5vcm1hbGl6ZWRMZWZ0ICYmIG5vcm1hbGl6ZWRMZWZ0ID09PSBub3JtYWxpemVkUmlnaHQ7XG59O1xuXG5jb25zdCByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24gPSAocmVxdWVzdGVkVXNlcklkOiBzdHJpbmcsIHVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXSk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRSZXF1ZXN0ZWQgPSBub3JtYWxpemVVc2VySWQocmVxdWVzdGVkVXNlcklkKTtcbiAgaWYgKCFub3JtYWxpemVkUmVxdWVzdGVkKSByZXR1cm4gXCJcIjtcbiAgY29uc3QgZm91bmQgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZFJlcXVlc3RlZCkpO1xuICByZXR1cm4gZm91bmQ/LmF4VXNlcklkIHx8IFwiXCI7XG59O1xuXG5jb25zdCBub3JtYWxpemVNYW5hZ2VkVXNlckZpbHRlclZhbHVlID0gKHZhbHVlOiB1bmtub3duLCB1c2VyczogQXV0aE1hbmFnZWRVc2VyW10pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplVXNlcklkKHZhbHVlKTtcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gXCJcIjtcblxuICBjb25zdCBkaXJlY3RNYXRjaCA9IHVzZXJzLmZpbmQoKGVudHJ5KSA9PiBpc1NhbWVVc2VyKGVudHJ5LmF4VXNlcklkLCBub3JtYWxpemVkKSk7XG4gIGlmIChkaXJlY3RNYXRjaCkgcmV0dXJuIGRpcmVjdE1hdGNoLmF4VXNlcklkO1xuXG4gIGNvbnN0IHZhbHVlVG9rZW4gPSBub3JtYWxpemVkLnNwbGl0KFwiLVwiKVswXT8udHJpbSgpIHx8IG5vcm1hbGl6ZWQ7XG4gIGNvbnN0IHRva2VuTWF0Y2ggPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgdmFsdWVUb2tlbikpO1xuICBpZiAodG9rZW5NYXRjaCkgcmV0dXJuIHRva2VuTWF0Y2guYXhVc2VySWQ7XG5cbiAgcmV0dXJuIHZhbHVlVG9rZW47XG59O1xuXG4vLyBJbml0aWFsaXplcyBhdXRoIHNlZWQgZm9yIGV4cGVuc2UgQVBJIGNhbGxzIGJlZm9yZSBpc2xhbmQgZWZmZWN0cyBydW4uXG5jb25zdCBib290c3RyYXBFeHBlbnNlQXBpQXV0aCA9ICgpID0+IHtcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgoe1xuICAgIHRva2VuOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxuICAgIGVudHJhT2lkOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcbiAgfSk7XG59O1xuXG5jb25zdCBFeHBlbnNlU2hlZXRzUGFnZUNvbnRlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiVmlld1wiKTtcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZSA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiQWRkXCIpO1xuICBjb25zdCB0aW1lbGluZUNvbnRhaW5lclJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBwYWdpbmF0aW9uUmVmID0gUmVhY3QudXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtmYWJCb3R0b20sIHNldEZhYkJvdHRvbV0gPSB1c2VTdGF0ZShGQUJfQkFTRV9CT1RUT00pO1xuICBjb25zdCB7IG1hbmFnZWFibGVTdWJvcmRpbmF0ZXMgfSA9IHVzZUF1dGhDb250ZXh0KCk7XG4gIGNvbnN0IG1hbmFnZWRVc2VycyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKEFycmF5LmlzQXJyYXkobWFuYWdlYWJsZVN1Ym9yZGluYXRlcykgPyBtYW5hZ2VhYmxlU3Vib3JkaW5hdGVzIDogW10pLFxuICAgIFttYW5hZ2VhYmxlU3Vib3JkaW5hdGVzXVxuICApO1xuICBjb25zdCBzaG93TWFuYWdlZFVzZXJGaWx0ZXIgPSBtYW5hZ2VkVXNlcnMubGVuZ3RoID4gMDtcbiAgY29uc3QgbWFuYWdlZFVzZXJMYWJlbEJ5SWQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICAgIG1hbmFnZWRVc2Vycy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgaWQgPSBub3JtYWxpemVVc2VySWQoZW50cnkuYXhVc2VySWQpO1xuICAgICAgaWYgKCFpZCkgcmV0dXJuO1xuICAgICAgY29uc3QgbmFtZSA9IG5vcm1hbGl6ZVVzZXJJZChlbnRyeS5uYW1lKTtcbiAgICAgIG1hcC5zZXQoaWQudG9VcHBlckNhc2UoKSwgbmFtZSB8fCBpZCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG1hcDtcbiAgfSwgW21hbmFnZWRVc2Vyc10pO1xuXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxuICAgICgpID0+ICh7XG4gICAgICBmaXJzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9GaXJzdFwiLCBcIkZpcnN0XCIpLFxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXG4gICAgICBuZXh0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpLFxuICAgICAgbGFzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKSxcbiAgICB9KSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IHtcbiAgICBpdGVtcyxcbiAgICB0b3RhbCxcbiAgICBjdXJyZW50UGFnZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGxvYWRMaXN0LFxuICAgIHJlc3RvcmVMaXN0U25hcHNob3QsXG4gICAgcmVzZXRMaXN0LFxuICB9ID0gdXNlRXhwZW5zZVNoZWV0c0xpc3REYXRhKHtcbiAgICBoYXNBY2Nlc3MsXG4gICAgcGFnZVNpemU6IFBBR0VfU0laRSxcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcbiAgfSk7XG5cbiAgY29uc3QgeyByZWFkQ2FjaGVkU3RhdGUsIGNvbnN1bWVSZXR1cm5GbGFnLCBzYXZlQ2FjaGVkU3RhdGUsIGNsZWFyQ2FjaGVkU3RhdGUgfSA9IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSgpO1xuICBjb25zdCBkaWRSZXN0b3JlT25Nb3VudFJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmID0gUmVhY3QudXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IHtcbiAgICBmcm9tRGF0ZSxcbiAgICB0b0RhdGUsXG4gICAgcHJvamVjdElkLFxuICAgIGhvamFHYXN0b3NJZCxcbiAgICBjdXJyZW5jeUNvZGUsXG4gICAgbWFuYWdlZFVzZXJJZCxcbiAgICBzdGF0dXNGaWx0ZXIsXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVFcnJvcixcbiAgICBtYW51YWxEYXRlQXV0b09wZW5LZXksXG4gICAgYXBwbGllZEZpbHRlcnMsXG4gICAgc2hvd0ZpbHRlcnMsXG4gICAgY3VycmVudEZpbHRlcnMsXG4gICAgc2V0UHJvamVjdElkLFxuICAgIHNldEhvamFHYXN0b3NJZCxcbiAgICBzZXRDdXJyZW5jeUNvZGUsXG4gICAgc2V0TWFuYWdlZFVzZXJJZCxcbiAgICBzZXRTdGF0dXNGaWx0ZXIsXG4gICAgb25BcHBseSxcbiAgICBvbkNsZWFyLFxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcbiAgICBvbkRhdGVSYW5nZUNoYW5nZSxcbiAgICBvbk1hbnVhbFJhbmdlQ29tcGxldGUsXG4gICAgb25RdWlja0ZpbHRlckNoYW5nZSxcbiAgICB0b2dnbGVGaWx0ZXJQYW5lbCxcbiAgfSA9IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJzU3RhdGUoe1xuICAgIG9uQXBwbHlGaWx0ZXJzOiAoc25hcHNob3QpID0+IHtcbiAgICAgIGNvbnN0IHJlc29sdmVkTWFuYWdlZFVzZXJJZCA9IG5vcm1hbGl6ZU1hbmFnZWRVc2VyRmlsdGVyVmFsdWUoc25hcHNob3QubWFuYWdlZFVzZXJJZCwgbWFuYWdlZFVzZXJzKTtcbiAgICAgIGlmIChyZXNvbHZlZE1hbmFnZWRVc2VySWQpIHtcbiAgICAgICAgc2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZShyZXNvbHZlZE1hbmFnZWRVc2VySWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKCk7XG4gICAgICB9XG4gICAgICB2b2lkIGxvYWRMaXN0KDEsIHtcbiAgICAgICAgLi4uc25hcHNob3QsXG4gICAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc29sdmVkTWFuYWdlZFVzZXJJZCxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb25DbGVhckZpbHRlcnM6ICgpID0+IHtcbiAgICAgIHNldE1hbmFnZWRVc2VySWQoXCJcIik7XG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgICBjbGVhckV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUoKTtcbiAgICAgIHJlc2V0TGlzdCgpO1xuICAgIH0sXG4gICAgZGVmYXVsdE1hbmFnZWRVc2VySWQ6IFwiXCIsXG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZU1hbmFnZWRVc2VySWRDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3Qgbm9ybWFsaXplZFZhbHVlID0gbm9ybWFsaXplTWFuYWdlZFVzZXJGaWx0ZXJWYWx1ZSh2YWx1ZSwgbWFuYWdlZFVzZXJzKTtcbiAgICAgIGNvbnN0IHdhc01hbmFnZWRVc2VyU2VsZWN0ZWQgPSAhIW5vcm1hbGl6ZVVzZXJJZChtYW5hZ2VkVXNlcklkKTtcbiAgICAgIGNvbnN0IHNob3VsZEF1dG9BcHBseUNsZWFyID0gd2FzTWFuYWdlZFVzZXJTZWxlY3RlZCAmJiAhbm9ybWFsaXplZFZhbHVlO1xuICAgICAgc2V0TWFuYWdlZFVzZXJJZChub3JtYWxpemVkVmFsdWUpO1xuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuXG4gICAgICBpZiAoIXNob3VsZEF1dG9BcHBseUNsZWFyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV4dFNuYXBzaG90ID0ge1xuICAgICAgICAuLi4oYXBwbGllZEZpbHRlcnMgfHwgY3VycmVudEZpbHRlcnMpLFxuICAgICAgICBtYW5hZ2VkVXNlcklkOiBcIlwiLFxuICAgICAgfTtcbiAgICAgIGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xuICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKG5leHRTbmFwc2hvdCk7XG4gICAgICB2b2lkIGxvYWRMaXN0KDEsIG5leHRTbmFwc2hvdCk7XG4gICAgfSxcbiAgICBbXG4gICAgICBhcHBsaWVkRmlsdGVycyxcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUsXG4gICAgICBjdXJyZW50RmlsdGVycyxcbiAgICAgIGxvYWRMaXN0LFxuICAgICAgbWFuYWdlZFVzZXJJZCxcbiAgICAgIG1hbmFnZWRVc2VycyxcbiAgICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcbiAgICAgIHNldE1hbmFnZWRVc2VySWQsXG4gICAgXVxuICApO1xuXG4gIGNvbnN0IGdvVG9EZXRhaWwgPSB1c2VDYWxsYmFjayhcbiAgICAoc2hlZXRJZDogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoIXNoZWV0SWQpIHJldHVybjtcblxuICAgICAgY29uc3Qgc25hcHNob3QgPSBhcHBsaWVkRmlsdGVycyB8fCBjdXJyZW50RmlsdGVycztcbiAgICAgIGNvbnN0IHJlc29sdmVkTWFuYWdlZFVzZXJJZCA9IG5vcm1hbGl6ZU1hbmFnZWRVc2VyRmlsdGVyVmFsdWUoc25hcHNob3QubWFuYWdlZFVzZXJJZCwgbWFuYWdlZFVzZXJzKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRTbmFwc2hvdCA9IHtcbiAgICAgICAgLi4uc25hcHNob3QsXG4gICAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc29sdmVkTWFuYWdlZFVzZXJJZCxcbiAgICAgIH07XG4gICAgICBpZiAocmVzb2x2ZWRNYW5hZ2VkVXNlcklkKSB7XG4gICAgICAgIHNldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUocmVzb2x2ZWRNYW5hZ2VkVXNlcklkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xuICAgICAgfVxuICAgICAgc2F2ZUNhY2hlZFN0YXRlKHtcbiAgICAgICAgZmlsdGVyczogbm9ybWFsaXplZFNuYXBzaG90LFxuICAgICAgICBwYWdlOiBjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsXG4gICAgICAgIHNjcm9sbFk6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuc2Nyb2xsWSB8fCAwIDogMCxcbiAgICAgICAgaXRlbXMsXG4gICAgICAgIHRvdGFsLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGlkID0gZW5jb2RlVVJJQ29tcG9uZW50KHNoZWV0SWQpO1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP2hvamFHYXN0b3NJZD0ke2lkfWAsIHtcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW2FwcGxpZWRGaWx0ZXJzLCBjdXJyZW50RmlsdGVycywgY3VycmVudFBhZ2UsIGl0ZW1zLCBtYW5hZ2VkVXNlcnMsIHNhdmVDYWNoZWRTdGF0ZSwgdG90YWxdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlT3BlbkNyZWF0ZVNoZWV0TW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP21vZGU9Y3JlYXRlXCIsIHtcbiAgICAgIGJ5cGFzc0d1YXJkT25jZTogZmFsc2UsXG4gICAgfSk7XG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlXSk7XG5cbiAgY29uc3QgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgPSB1c2VDYWxsYmFjaygodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcbiAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBjYXJkID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XG4gICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIXRpbWVsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY2FyZDtcbiAgfSwgW10pO1xuXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoe1xuICAgIGNvbnRhaW5lclJlZjogdGltZWxpbmVDb250YWluZXJSZWYsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGl0ZW1zLFxuICAgIHJlc29sdmVDbGlja2FibGVDYXJkLFxuICB9KTtcblxuICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKCh0b3RhbCB8fCAwKSAvIFBBR0VfU0laRSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5KFwiZXhwZW5zZS1zaGVldHMtbGlzdC1hY3Rpb25zXCIpO1xuICB9LCBbXSk7XG5cbiAgLy8gS2VlcCB0aGUgZmxvYXRpbmcgYWN0aW9uIGJ1dHRvbiBjbGVhciBvZiBwYWdpbmF0aW9uIGNvbnRyb2xzIG9uIHNtYWxsIHNjcmVlbnMuXG4gIGNvbnN0IHVwZGF0ZUZhYkJvdHRvbSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIXBhZ2luYXRpb25SZWYuY3VycmVudCB8fCB0b3RhbFBhZ2VzIDw9IDEpIHtcbiAgICAgIHNldEZhYkJvdHRvbShGQUJfQkFTRV9CT1RUT00pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGhlaWdodCA9IHBhZ2luYXRpb25SZWYuY3VycmVudC5vZmZzZXRIZWlnaHQgfHwgMDtcbiAgICBjb25zdCBuZXh0Qm90dG9tID0gTWF0aC5tYXgoRkFCX0JBU0VfQk9UVE9NLCBoZWlnaHQgKyBGQUJfQ0xFQVJBTkNFICsgRkFCX0dBUCk7XG4gICAgc2V0RmFiQm90dG9tKChwcmV2aW91cykgPT4gKE1hdGguYWJzKHByZXZpb3VzIC0gbmV4dEJvdHRvbSkgPCAxID8gcHJldmlvdXMgOiBuZXh0Qm90dG9tKSk7XG4gIH0sIFt0b3RhbFBhZ2VzXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB1cGRhdGVGYWJCb3R0b20oKTtcblxuICAgIGxldCBvYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXIgfCBudWxsID0gbnVsbDtcbiAgICBjb25zdCBwYWdpbmF0aW9uRWwgPSBwYWdpbmF0aW9uUmVmLmN1cnJlbnQ7XG4gICAgaWYgKHBhZ2luYXRpb25FbCAmJiB0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHVwZGF0ZUZhYkJvdHRvbSgpKTtcbiAgICAgIG9ic2VydmVyLm9ic2VydmUocGFnaW5hdGlvbkVsKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGVGYWJCb3R0b20pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGVGYWJCb3R0b20pO1xuICAgICAgaWYgKG9ic2VydmVyKSBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfTtcbiAgfSwgW3VwZGF0ZUZhYkJvdHRvbV0pO1xuXG4gIGNvbnN0IHN1bW1hcnlJdGVtcyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmICghYXBwbGllZEZpbHRlcnMpIHtcbiAgICAgIHJldHVybiBbXSBhcyBBcnJheTx7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0+O1xuICAgIH1cblxuICAgIGNvbnN0IHN1bW1hcnk6IEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfT4gPSBbXTtcbiAgICBjb25zdCBsb2NhbGUgPSBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIjtcbiAgICBjb25zdCBmcm9tRGF0ZVRleHQgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoYXBwbGllZEZpbHRlcnMuZnJvbURhdGUsIGxvY2FsZSwgXCJcIik7XG4gICAgY29uc3QgdG9EYXRlVGV4dCA9IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShhcHBsaWVkRmlsdGVycy50b0RhdGUsIGxvY2FsZSwgXCJcIik7XG5cbiAgICBpZiAoZnJvbURhdGVUZXh0IHx8IHRvRGF0ZVRleHQpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJmcm9tRGF0ZVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIiksXG4gICAgICAgIHZhbHVlOiBmcm9tRGF0ZVRleHQgfHwgXCItLVwiLFxuICAgICAgfSk7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwidG9EYXRlXCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpLFxuICAgICAgICB2YWx1ZTogdG9EYXRlVGV4dCB8fCBcIi0tXCIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoYXBwbGllZEZpbHRlcnMucHJvamVjdElkLnRyaW0oKSkge1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcInByb2plY3RcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKSxcbiAgICAgICAgdmFsdWU6IGFwcGxpZWRGaWx0ZXJzLnByb2plY3RJZC50cmltKCksXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGFwcGxpZWRGaWx0ZXJzLmhvamFHYXN0b3NJZC50cmltKCkpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJzaGVldFwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1NoZWV0XCIsIFwiRXhwZW5zZSBzaGVldFwiKSxcbiAgICAgICAgdmFsdWU6IGFwcGxpZWRGaWx0ZXJzLmhvamFHYXN0b3NJZC50cmltKCksXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGFwcGxpZWRGaWx0ZXJzLmN1cnJlbmN5Q29kZS50cmltKCkpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJjdXJyZW5jeVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIiksXG4gICAgICAgIHZhbHVlOiBhcHBsaWVkRmlsdGVycy5jdXJyZW5jeUNvZGUudHJpbSgpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IGFwcGxpZWRNYW5hZ2VkVXNlcklkID0gbm9ybWFsaXplVXNlcklkKGFwcGxpZWRGaWx0ZXJzLm1hbmFnZWRVc2VySWQpO1xuICAgIGlmIChhcHBsaWVkTWFuYWdlZFVzZXJJZCkge1xuICAgICAgY29uc3QgbWFuYWdlZFVzZXJMYWJlbCA9IG1hbmFnZWRVc2VyTGFiZWxCeUlkLmdldChhcHBsaWVkTWFuYWdlZFVzZXJJZC50b1VwcGVyQ2FzZSgpKSB8fCBhcHBsaWVkTWFuYWdlZFVzZXJJZDtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJtYW5hZ2VkLXVzZXJcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Vc2VyXCIsIFwiVXNlclwiKSxcbiAgICAgICAgdmFsdWU6IG1hbmFnZWRVc2VyTGFiZWwsXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGFwcGxpZWRGaWx0ZXJzLnN0YXR1c0ZpbHRlciAhPT0gREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJzdGF0dXNcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNcIiwgXCJFc3RhZG9cIiksXG4gICAgICAgIHZhbHVlOiBnZXRFeHBlbnNlU3RhdHVzTGFiZWwoYXBwbGllZEZpbHRlcnMuc3RhdHVzRmlsdGVyKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzdW1tYXJ5O1xuICB9LCBbYXBwbGllZEZpbHRlcnMsIG1hbmFnZWRVc2VyTGFiZWxCeUlkXSk7XG5cbiAgY29uc3Qgc2hvd1N1bW1hcnkgPSAhc2hvd0ZpbHRlcnMgJiYgc3VtbWFyeUl0ZW1zLmxlbmd0aCA+IDA7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoZGlkUmVzdG9yZU9uTW91bnRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQgPSB0cnVlO1xuXG4gICAgaWYgKCFjb25zdW1lUmV0dXJuRmxhZygpKSB7XG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgICBzZXRNYW5hZ2VkVXNlcklkKFwiXCIpO1xuICAgICAgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2FjaGVkU3RhdGUgPSByZWFkQ2FjaGVkU3RhdGUoKTtcbiAgICBpZiAoIWNhY2hlZFN0YXRlKSB7XG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgICBzZXRNYW5hZ2VkVXNlcklkKFwiXCIpO1xuICAgICAgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdG9yZWRNYW5hZ2VkVXNlcklkID0gcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uKGNhY2hlZFN0YXRlLmZpbHRlcnMubWFuYWdlZFVzZXJJZCwgbWFuYWdlZFVzZXJzKTtcbiAgICBjb25zdCByZXN0b3JlZEZpbHRlcnMgPSB7XG4gICAgICAuLi5jYWNoZWRTdGF0ZS5maWx0ZXJzLFxuICAgICAgbWFuYWdlZFVzZXJJZDogcmVzdG9yZWRNYW5hZ2VkVXNlcklkLFxuICAgIH07XG4gICAgaWYgKHJlc3RvcmVkTWFuYWdlZFVzZXJJZCkge1xuICAgICAgc2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZShyZXN0b3JlZE1hbmFnZWRVc2VySWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjbGVhckV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUoKTtcbiAgICB9XG5cbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMocmVzdG9yZWRGaWx0ZXJzKTtcbiAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gY2FjaGVkU3RhdGUuc2Nyb2xsWTtcbiAgICBpZiAoY2FjaGVkU3RhdGUuaXRlbXMubGVuZ3RoID4gMCB8fCBjYWNoZWRTdGF0ZS50b3RhbCA+IDApIHtcbiAgICAgIHJlc3RvcmVMaXN0U25hcHNob3Qoe1xuICAgICAgICBpdGVtczogY2FjaGVkU3RhdGUuaXRlbXMsXG4gICAgICAgIHRvdGFsOiBjYWNoZWRTdGF0ZS50b3RhbCxcbiAgICAgICAgcGFnZTogY2FjaGVkU3RhdGUucGFnZSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2b2lkIGxvYWRMaXN0KGNhY2hlZFN0YXRlLnBhZ2UsIHJlc3RvcmVkRmlsdGVycyk7XG4gIH0sIFtcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIGxvYWRMaXN0LFxuICAgIG1hbmFnZWRVc2VycyxcbiAgICByZWFkQ2FjaGVkU3RhdGUsXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxuICAgIHJlc3RvcmVMaXN0U25hcHNob3QsXG4gICAgc2V0TWFuYWdlZFVzZXJJZCxcbiAgXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMb2FkaW5nKSByZXR1cm47XG4gICAgY29uc3QgcGVuZGluZ1Njcm9sbFkgPSBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50O1xuICAgIGlmIChwZW5kaW5nU2Nyb2xsWSA9PSBudWxsKSByZXR1cm47XG5cbiAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgIHRvcDogTWF0aC5tYXgoMCwgcGVuZGluZ1Njcm9sbFkpLFxuICAgICAgICBiZWhhdmlvcjogXCJhdXRvXCIsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSwgW2N1cnJlbnRQYWdlLCBpc0xvYWRpbmcsIGl0ZW1zLmxlbmd0aF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb25Ub2dnbGVGaWx0ZXJzID0gKCkgPT4ge1xuICAgICAgY29uc3Qgd2lsbE9wZW4gPSAhc2hvd0ZpbHRlcnM7XG4gICAgICB0b2dnbGVGaWx0ZXJQYW5lbCgpO1xuICAgICAgaWYgKHdpbGxPcGVuKSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uUmVmcmVzaCA9ICgpID0+IHtcbiAgICAgIGlmICghYXBwbGllZEZpbHRlcnMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXNvbHZlZE1hbmFnZWRVc2VySWQgPSBub3JtYWxpemVNYW5hZ2VkVXNlckZpbHRlclZhbHVlKGFwcGxpZWRGaWx0ZXJzLm1hbmFnZWRVc2VySWQsIG1hbmFnZWRVc2Vycyk7XG4gICAgICB2b2lkIGxvYWRMaXN0KGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSwge1xuICAgICAgICAuLi5hcHBsaWVkRmlsdGVycyxcbiAgICAgICAgbWFuYWdlZFVzZXJJZDogcmVzb2x2ZWRNYW5hZ2VkVXNlcklkLFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXhwZW5zZS1zaGVldHMtdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXhwZW5zZS1zaGVldHMtcmVmcmVzaFwiLCBvblJlZnJlc2gpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXhwZW5zZS1zaGVldHMtdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXNoZWV0cy1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XG4gICAgfTtcbiAgfSwgW2FwcGxpZWRGaWx0ZXJzLCBjdXJyZW50UGFnZSwgbG9hZExpc3QsIG1hbmFnZWRVc2Vycywgc2hvd0ZpbHRlcnMsIHRvZ2dsZUZpbHRlclBhbmVsXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAge3Nob3dTdW1tYXJ5ID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1zdW1tYXJ5IHAtMyBzbTpwLTQgbXQtMSBtYi0zXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJleHBlbnNlLXN1bW1hcnktZ3JpZCBncmlkIGdyaWQtY29scy0xIG1pbi1bMzYwcHhdOmdyaWQtY29scy0yIGl0ZW1zLXN0YXJ0IGdhcC14LTQgZ2FwLXktMSB0ZXh0LXhzXCI+XG4gICAgICAgICAgICB7c3VtbWFyeUl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGtleT17YCR7aXRlbS5rZXl9LSR7aXRlbS52YWx1ZX0tJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGhpc3RvcnktZmlsdGVyLXN1bW1hcnkgaGlzdG9yeS1maWx0ZXItc3VtbWFyeS0tZ3JpZC1pdGVtIGxlYWRpbmctNSBtaW4tdy0wICR7aXRlbS5rZXkgPT09IFwibWFuYWdlZC11c2VyXCIgPyBcIm1pbi1bMzYwcHhdOmNvbC1zcGFuLTJcIiA6IFwiXCJ9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN1bW1hcnlfX2xhYmVsIGZvbnQtc2VtaWJvbGRcIj57aXRlbS5sYWJlbH06PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YGhpc3RvcnktZmlsdGVyLXN1bW1hcnlfX3ZhbHVlICR7aXRlbS5rZXkgPT09IFwibWFuYWdlZC11c2VyXCIgPyBcImJsb2NrIHRydW5jYXRlIHdoaXRlc3BhY2Utbm93cmFwXCIgOiBcImJyZWFrLXdvcmRzXCJ9YH0+XG4gICAgICAgICAgICAgICAgICB7aXRlbS52YWx1ZX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxFeHBlbnNlRmlsdGVyc1BhbmVsXG4gICAgICAgIHZpc2libGU9e3Nob3dGaWx0ZXJzfVxuICAgICAgICBzaG93TWFudWFsRGF0ZUZpbHRlcj17c2hvd01hbnVhbERhdGVGaWx0ZXJ9XG4gICAgICAgIHNob3dNYW51YWxEYXRlRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3J9XG4gICAgICAgIG1hbnVhbERhdGVBdXRvT3BlbktleT17bWFudWFsRGF0ZUF1dG9PcGVuS2V5fVxuICAgICAgICBmcm9tRGF0ZT17ZnJvbURhdGV9XG4gICAgICAgIHRvRGF0ZT17dG9EYXRlfVxuICAgICAgICBwcm9qZWN0SWQ9e3Byb2plY3RJZH1cbiAgICAgICAgaG9qYUdhc3Rvc0lkPXtob2phR2FzdG9zSWR9XG4gICAgICAgIGN1cnJlbmN5Q29kZT17Y3VycmVuY3lDb2RlfVxuICAgICAgICBtYW5hZ2VkVXNlcklkPXttYW5hZ2VkVXNlcklkfVxuICAgICAgICBtYW5hZ2VkVXNlcnM9e21hbmFnZWRVc2Vyc31cbiAgICAgICAgc2hvd01hbmFnZWRVc2VyRmlsdGVyPXtzaG93TWFuYWdlZFVzZXJGaWx0ZXJ9XG4gICAgICAgIHN0YXR1c0ZpbHRlcj17c3RhdHVzRmlsdGVyfVxuICAgICAgICBhY3RpdmVRdWlja0ZpbHRlcj17YWN0aXZlUXVpY2tGaWx0ZXJ9XG4gICAgICAgIG9uRGF0ZVJhbmdlQ2hhbmdlPXtvbkRhdGVSYW5nZUNoYW5nZX1cbiAgICAgICAgb25NYW51YWxSYW5nZUNvbXBsZXRlPXtvbk1hbnVhbFJhbmdlQ29tcGxldGV9XG4gICAgICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2U9e29uUXVpY2tGaWx0ZXJDaGFuZ2V9XG4gICAgICAgIG9uUHJvamVjdElkQ2hhbmdlPXtzZXRQcm9qZWN0SWR9XG4gICAgICAgIG9uSG9qYUdhc3Rvc0lkQ2hhbmdlPXtzZXRIb2phR2FzdG9zSWR9XG4gICAgICAgIG9uQ3VycmVuY3lDb2RlQ2hhbmdlPXtzZXRDdXJyZW5jeUNvZGV9XG4gICAgICAgIG9uTWFuYWdlZFVzZXJJZENoYW5nZT17aGFuZGxlTWFuYWdlZFVzZXJJZENoYW5nZX1cbiAgICAgICAgb25TdGF0dXNGaWx0ZXJDaGFuZ2U9e3NldFN0YXR1c0ZpbHRlcn1cbiAgICAgICAgb25DbGVhcj17b25DbGVhcn1cbiAgICAgICAgb25BcHBseT17b25BcHBseX1cbiAgICAgIC8+XG5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCJcbiAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogaXNMb2FkaW5nID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxuICAgICAgPlxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XG4gICAgICA8L2Rpdj5cblxuICAgICAge2Vycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57ZXJyb3JNZXNzYWdlfTwvZGl2PiA6IG51bGx9XG5cbiAgICAgIHshaXNMb2FkaW5nICYmICFlcnJvck1lc3NhZ2UgJiYgaXRlbXMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveCB0aW1lbGluZS1lbXB0eVwiIGRhdGEtZW1wdHktdGV4dD17aW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpfSAvPlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIHshZXJyb3JNZXNzYWdlICYmIGl0ZW1zLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgIDxkaXYgcmVmPXt0aW1lbGluZUNvbnRhaW5lclJlZn0gY2xhc3NOYW1lPVwidGltZWxpbmUtYm94XCI+XG4gICAgICAgICAge2l0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gc2FmZVRleHQoaXRlbS5ob2phR2FzdG9zSWQpO1xuICAgICAgICAgICAgY29uc3QgZGF0ZVBhcnRzID0gZm9ybWF0RXhwZW5zZURhdGVQYXJ0cyhcbiAgICAgICAgICAgICAgaXRlbS5jcmVhdGVkRGF0ZSxcbiAgICAgICAgICAgICAgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCIsXG4gICAgICAgICAgICAgIHsgcHJlZmVyTW9udGhGaXJzdE9uU2xhc2g6IHRydWUgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbmN5ID0gc2FmZVRleHQoaXRlbS5jdXJyZW5jeUNvZGUpO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBzYWZlVGV4dChpdGVtLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0IHZvdWNoZXIgPSBzYWZlVGV4dChpdGVtLnZvdWNoZXIpO1xuICAgICAgICAgICAgY29uc3QgdG90YWxBbW91bnRUZXh0ID0gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGl0ZW0udG90YWxBbW91bnQgPz8gbnVsbCwgY3VycmVuY3kpO1xuICAgICAgICAgICAgY29uc3QgZmFsbGJhY2tTdGF0dXNDb2RlID0gaGFzQXNzaWduZWRWb3VjaGVyKHZvdWNoZXIpID8gNCA6IDA7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNDb2RlID0gbm9ybWFsaXplRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUoaXRlbS5leHBlbnNlU2hlZXRTdGF0dXMsIGZhbGxiYWNrU3RhdHVzQ29kZSk7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNMYWJlbCA9IGdldEV4cGVuc2VTdGF0dXNMYWJlbChzdGF0dXNDb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1c0NsYXNzID0gZ2V0RXhwZW5zZVN0YXR1c0JhZGdlQ2xhc3NOYW1lKHN0YXR1c0NvZGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17YCR7aWR9LSR7aW5kZXh9YH0gY2xhc3NOYW1lPVwidGltZWxpbmUtaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxFeHBlbnNlVGltZWxpbmVDYXJkXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtkZXNjcmlwdGlvbiB8fCBcIi1cIn1cbiAgICAgICAgICAgICAgICAgIGFtb3VudFRleHQ9e3RvdGFsQW1vdW50VGV4dH1cbiAgICAgICAgICAgICAgICAgIG9uT3Blbj17KCkgPT4gZ29Ub0RldGFpbChpZCl9XG4gICAgICAgICAgICAgICAgICB0aXRsZUNsYXNzTmFtZT1cImV4cGVuc2Utc2hlZXQtY2FyZF9fdGl0bGUgdGltZWxpbmUtbmFtZVwiXG4gICAgICAgICAgICAgICAgICBzdGF0dXNDbGFzc05hbWU9e3N0YXR1c0NsYXNzfVxuICAgICAgICAgICAgICAgICAgc3RhdHVzTGFiZWw9e3N0YXR1c0xhYmVsfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXG4gICAgICAgIHJlZj17cGFnaW5hdGlvblJlZn1cbiAgICAgICAgdG90YWxQYWdlcz17dG90YWxQYWdlc31cbiAgICAgICAgY3VycmVudFBhZ2U9e2N1cnJlbnRQYWdlfVxuICAgICAgICBsb2FkaW5nPXtpc0xvYWRpbmd9XG4gICAgICAgIG9uUGFnZUNoYW5nZT17KHBhZ2UpID0+IHtcbiAgICAgICAgICBjb25zdCBzbmFwc2hvdCA9IGFwcGxpZWRGaWx0ZXJzIHx8IGN1cnJlbnRGaWx0ZXJzO1xuICAgICAgICAgIGNvbnN0IHJlc29sdmVkTWFuYWdlZFVzZXJJZCA9IG5vcm1hbGl6ZU1hbmFnZWRVc2VyRmlsdGVyVmFsdWUoc25hcHNob3QubWFuYWdlZFVzZXJJZCwgbWFuYWdlZFVzZXJzKTtcbiAgICAgICAgICB2b2lkIGxvYWRMaXN0KHBhZ2UsIHtcbiAgICAgICAgICAgIC4uLnNuYXBzaG90LFxuICAgICAgICAgICAgbWFuYWdlZFVzZXJJZDogcmVzb2x2ZWRNYW5hZ2VkVXNlcklkLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9fVxuICAgICAgICBsYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XG4gICAgICAvPlxuXG4gICAgICB7Y2FuQ3JlYXRlRXhwZW5zZSA/IChcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXG4gICAgICAgICAgcm91dGU9XCJcIlxuICAgICAgICAgIGFyaWFMYWJlbD17aW5kVChcIkNvbW1vbl9DcmVhdGVcIiwgXCJDcmVhdGVcIil9XG4gICAgICAgICAgc2l6ZT17NzZ9XG4gICAgICAgICAgcmlnaHQ9ezE2fVxuICAgICAgICAgIGJvdHRvbT17ZmFiQm90dG9tfVxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZU9wZW5DcmVhdGVTaGVldE1vZGV9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgZXhwZW5zZSBzaGVldHMgbGlzdC5cbmNvbnN0IEV4cGVuc2VTaGVldHNQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cbiAgICAgIDxFeHBlbnNlU2hlZXRzUGFnZUNvbnRlbnQgLz5cbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICApO1xufTtcblxuY29uc3QgbW91bnQgPSAoKSA9PiB7XG4gIGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoKCk7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS1zaGVldHMtcm9vdFwiKTtcbiAgaWYgKCFyb290RWwpIHJldHVybjtcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxFeHBlbnNlU2hlZXRzUGFnZSAvPik7XG59O1xuXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0c1BhZ2U7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVtb3RlU2VhcmNoQ29tYm9ib3gsIHsgdHlwZSBSZW1vdGVTZWFyY2hPcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1JlbW90ZVNlYXJjaENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldExpc3RJdGVtRHRvIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgYnVpbGRFeHBlbnNlU2hlZXRTdWdnZXN0UGF5bG9hZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlUGF5bG9hZEJ1aWxkZXJzLnRzXCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldExpc3QgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuXG50eXBlIEV4cGVuc2VTaGVldEZpbHRlcklucHV0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG1hbmFnZWRVc2VySWQ/OiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbn07XG5cbmNvbnN0IFNFQVJDSF9QQUdFX1NJWkUgPSAyMDtcblxuY29uc3QgbWFwU2hlZXRPcHRpb25zID0gKGl0ZW1zOiBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0b1tdIHwgdW5kZWZpbmVkKTogUmVtb3RlU2VhcmNoT3B0aW9uW10gPT4ge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkoaXRlbXMpID8gaXRlbXMgOiBbXSlcbiAgICAubWFwKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBpZCA9IFN0cmluZyhpdGVtPy5Ib2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpO1xuICAgICAgaWYgKCFpZCkgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogaWQsXG4gICAgICAgIHRpdGxlOiBpZCxcbiAgICAgICAgc3VidGl0bGU6IFN0cmluZyhpdGVtPy5EZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCkgfHwgXCItXCIsXG4gICAgICB9IGFzIFJlbW90ZVNlYXJjaE9wdGlvbjtcbiAgICB9KVxuICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgUmVtb3RlU2VhcmNoT3B0aW9uW107XG59O1xuXG4vLyBFeHBlbnNlIHNoZWV0IGZpbHRlciBpbnB1dCB3aXRoIHJlbW90ZSBsaXN0IHN1Z2dlc3Rpb25zLlxuY29uc3QgRXhwZW5zZVNoZWV0RmlsdGVySW5wdXQgPSAoe1xuICBsYWJlbCxcbiAgcGxhY2Vob2xkZXIsXG4gIHZhbHVlLFxuICBtYW5hZ2VkVXNlcklkID0gXCJcIixcbiAgb25DaGFuZ2UsXG4gIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zID0gdHJ1ZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbn06IEV4cGVuc2VTaGVldEZpbHRlcklucHV0UHJvcHMpID0+IHtcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XG4gIGNvbnN0IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkID0gU3RyaW5nKG1hbmFnZWRVc2VySWQgfHwgXCJcIikudHJpbSgpO1xuXG4gIGNvbnN0IGxvYWRPcHRpb25zID0gdXNlQ2FsbGJhY2soYXN5bmMgKHRlcm06IHN0cmluZywgc2lnbmFsOiBBYm9ydFNpZ25hbCk6IFByb21pc2U8UmVtb3RlU2VhcmNoT3B0aW9uW10+ID0+IHtcbiAgICBjb25zdCBwYXlsb2FkID0gYnVpbGRFeHBlbnNlU2hlZXRTdWdnZXN0UGF5bG9hZCh0ZXJtLCBTRUFSQ0hfUEFHRV9TSVpFLCAxKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0TGlzdChwYXlsb2FkLCB7XG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgIGF4VXNlcklkT3ZlcnJpZGU6IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkIHx8IHVuZGVmaW5lZCxcbiAgICAgIHNpZ25hbCxcbiAgICB9KTtcblxuICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwU2hlZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyk7XG4gIH0sIFtub3JtYWxpemVkTWFuYWdlZFVzZXJJZF0pO1xuXG4gIGNvbnN0IGxvYWRPcHRpb25zUGFnZSA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlciwgc2lnbmFsOiBBYm9ydFNpZ25hbCkgPT4ge1xuICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZEV4cGVuc2VTaGVldFN1Z2dlc3RQYXlsb2FkKHRlcm0sIHBhZ2VTaXplLCBwYWdlKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0TGlzdChwYXlsb2FkLCB7XG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgIGF4VXNlcklkT3ZlcnJpZGU6IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkIHx8IHVuZGVmaW5lZCxcbiAgICAgIHNpZ25hbCxcbiAgICB9KTtcblxuICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgdG90YWw6IDAsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogbWFwU2hlZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyksXG4gICAgICB0b3RhbDogTnVtYmVyKHJlc3BvbnNlPy5Ub3RhbCB8fCAwKSxcbiAgICB9O1xuICB9LCBbbm9ybWFsaXplZE1hbmFnZWRVc2VySWRdKTtcblxuICBpZiAoIWVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zIHx8IHJlYWRPbmx5TW9kZSkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICB7c2hvd0xhYmVsID8gKFxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIiBzdHlsZT17eyBjb2xvcjogXCIjMDAyOTZiZTBcIiB9fT5cbiAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcHgtMyBweS0yIHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTkwMCBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCJcbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XG4gICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxSZW1vdGVTZWFyY2hDb21ib2JveFxuICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgb25TZWFyY2g9e2FzeW5jICh0ZXJtLCBzaWduYWwpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbG9hZE9wdGlvbnModGVybSwgc2lnbmFsKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9fVxuICAgICAgb25TZWFyY2hQYWdlPXthc3luYyAodGVybSwgcGFnZSwgcGFnZVNpemUsIHNpZ25hbCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBhd2FpdCBsb2FkT3B0aW9uc1BhZ2UodGVybSwgcGFnZSwgcGFnZVNpemUsIHNpZ25hbCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgcmV0dXJuIHsgaXRlbXM6IFtdLCB0b3RhbDogMCB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICAgIGlkQmFzZT1cImV4cGVuc2Utc2hlZXQtZmlsdGVyXCJcbiAgICAgIG1pblNlYXJjaExlbmd0aD17MH1cbiAgICAgIHBhZ2VTaXplPXtTRUFSQ0hfUEFHRV9TSVpFfVxuICAgICAgYWxsb3dFbXB0eVNlYXJjaFxuICAgICAgbG9hZE9uT3BlblxuICAgICAgaW5maW5pdGVTY3JvbGxcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxuICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXRGaWx0ZXJJbnB1dDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBERUZBVUxUX0VYUEVOU0VfU1RBVFVTX0ZJTFRFUiwgZ2V0RXhwZW5zZVN0YXR1c0ZpbHRlck9wdGlvbnMsIG5vcm1hbGl6ZUV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlU3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuXG50eXBlIEV4cGVuc2VTdGF0dXNGaWx0ZXJTZWxlY3RQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmFsdWU6IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlO1xuICBvbkNoYW5nZTogKHZhbHVlOiBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSkgPT4gdm9pZDtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG59O1xuXG4vLyBTaGFyZWQgZml4ZWQgc3RhdHVzIGZpbHRlciBzZWxlY3QgdXNpbmcgdGhlIGNhbm9uaWNhbCBzdGF0dXMgY2F0YWxvZy5cbmNvbnN0IEV4cGVuc2VTdGF0dXNGaWx0ZXJTZWxlY3QgPSAoe1xuICBsYWJlbCxcbiAgcGxhY2Vob2xkZXIsXG4gIHZhbHVlLFxuICBvbkNoYW5nZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbn06IEV4cGVuc2VTdGF0dXNGaWx0ZXJTZWxlY3RQcm9wcykgPT4ge1xuICBjb25zdCBvcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KCgpID0+IGdldEV4cGVuc2VTdGF0dXNGaWx0ZXJPcHRpb25zKCksIFtdKTtcbiAgY29uc3QgdWlWYWx1ZSA9IHZhbHVlID09PSBERUZBVUxUX0VYUEVOU0VfU1RBVFVTX0ZJTFRFUiA/IFwiXCIgOiB2YWx1ZTtcblxuICByZXR1cm4gKFxuICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgIHZhbHVlPXt1aVZhbHVlfVxuICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IG9uQ2hhbmdlKG5vcm1hbGl6ZUV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlKG5leHRWYWx1ZSwgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIpKX1cbiAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIGlkQmFzZT1cImV4cGVuc2Utc3RhdHVzLWZpbHRlclwiXG4gICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTdGF0dXNGaWx0ZXJTZWxlY3Q7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdC50c3hcIjtcbmltcG9ydCBFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyIGZyb20gXCIuL0V4cGVuc2VEYXRlUmFuZ2VGaWx0ZXIudHN4XCI7XG5pbXBvcnQgRXhwZW5zZUZpbHRlckFjdGlvbnMgZnJvbSBcIi4vRXhwZW5zZUZpbHRlckFjdGlvbnMudHN4XCI7XG5pbXBvcnQgRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdC50c3hcIjtcbmltcG9ydCBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0IGZyb20gXCIuL0V4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMgZnJvbSBcIi4vRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVNoZWV0RmlsdGVySW5wdXQgZnJvbSBcIi4vRXhwZW5zZVNoZWV0RmlsdGVySW5wdXQudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVN0YXR1c0ZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0LnRzeFwiO1xuaW1wb3J0IEhpc3RvcnlTdW1tYXJ5IGZyb20gXCIuLi8uLi92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5U3VtbWFyeS50c3hcIjtcbmltcG9ydCB0eXBlIHsgQXV0aE1hbmFnZWRVc2VyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VRdWlja0ZpbHRlcklkIH0gZnJvbSBcIi4uL2xpc3QvZXhwZW5zZUxpc3RUeXBlcy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcblxuZXhwb3J0IHR5cGUgeyBFeHBlbnNlUXVpY2tGaWx0ZXJJZCB9O1xuXG5jb25zdCBwYXJzZUlzb0RhdGUgPSAocmF3OiBzdHJpbmcpOiBEYXRlIHwgbnVsbCA9PiB7XG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3KS50cmltKCkuc3BsaXQoXCJUXCIpWzBdO1xuICBpZiAoIS9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KHZhbHVlKSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IHZhbHVlLnNwbGl0KFwiLVwiKS5tYXAoTnVtYmVyKTtcbiAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcbn07XG5cbmNvbnN0IGZvcm1hdERhdGUgPSAocmF3OiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZGF0ZSA9IHBhcnNlSXNvRGF0ZShyYXcpO1xuICBpZiAoIWRhdGUpIHJldHVybiBcIi0tXCI7XG4gIHJldHVybiBkYXRlXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHtcbiAgICAgIGRheTogXCJudW1lcmljXCIsXG4gICAgICBtb250aDogXCJzaG9ydFwiLFxuICAgICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgfSlcbiAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXG4gICAgLnRvTG93ZXJDYXNlKCk7XG59O1xuXG50eXBlIEV4cGVuc2VGaWx0ZXJzUGFuZWxQcm9wcyA9IHtcbiAgdmlzaWJsZTogYm9vbGVhbjtcbiAgc2hvd01hbnVhbERhdGVGaWx0ZXI6IGJvb2xlYW47XG4gIG1hbnVhbERhdGVBdXRvT3BlbktleTogbnVtYmVyO1xuICBmcm9tRGF0ZTogc3RyaW5nO1xuICB0b0RhdGU6IHN0cmluZztcbiAgcHJvamVjdElkOiBzdHJpbmc7XG4gIGhvamFHYXN0b3NJZDogc3RyaW5nO1xuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgbWFuYWdlZFVzZXJJZDogc3RyaW5nO1xuICBtYW5hZ2VkVXNlcnM6IEF1dGhNYW5hZ2VkVXNlcltdO1xuICBzaG93TWFuYWdlZFVzZXJGaWx0ZXI6IGJvb2xlYW47XG4gIHN0YXR1c0ZpbHRlcjogRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGU7XG4gIGFjdGl2ZVF1aWNrRmlsdGVyOiBFeHBlbnNlUXVpY2tGaWx0ZXJJZCB8IG51bGw7XG4gIHNob3dNYW51YWxEYXRlRXJyb3I6IGJvb2xlYW47XG4gIG9uRGF0ZVJhbmdlQ2hhbmdlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uTWFudWFsUmFuZ2VDb21wbGV0ZTogKGZyb21EYXRlOiBzdHJpbmcsIHRvRGF0ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvblF1aWNrRmlsdGVyQ2hhbmdlOiAoZmlsdGVySWQ6IEV4cGVuc2VRdWlja0ZpbHRlcklkKSA9PiB2b2lkO1xuICBvblByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uSG9qYUdhc3Rvc0lkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbk1hbmFnZWRVc2VySWRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvblN0YXR1c0ZpbHRlckNoYW5nZTogKHZhbHVlOiBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSkgPT4gdm9pZDtcbiAgb25DbGVhcjogKCkgPT4gdm9pZDtcbiAgb25BcHBseTogKCkgPT4gdm9pZDtcbn07XG5cbi8vIFNoYXJlZCBleHBlbnNlIHNoZWV0IGZpbHRlciBwYW5lbCBjb21wb3NlZCBmcm9tIHJldXNhYmxlIG1vZHVsZSBjb21wb25lbnRzLlxuY29uc3QgRXhwZW5zZUZpbHRlcnNQYW5lbCA9ICh7XG4gIHZpc2libGUsXG4gIHNob3dNYW51YWxEYXRlRmlsdGVyLFxuICBtYW51YWxEYXRlQXV0b09wZW5LZXksXG4gIGZyb21EYXRlLFxuICB0b0RhdGUsXG4gIHByb2plY3RJZCxcbiAgaG9qYUdhc3Rvc0lkLFxuICBjdXJyZW5jeUNvZGUsXG4gIG1hbmFnZWRVc2VySWQsXG4gIG1hbmFnZWRVc2VycyxcbiAgc2hvd01hbmFnZWRVc2VyRmlsdGVyLFxuICBzdGF0dXNGaWx0ZXIsXG4gIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICBzaG93TWFudWFsRGF0ZUVycm9yLFxuICBvbkRhdGVSYW5nZUNoYW5nZSxcbiAgb25NYW51YWxSYW5nZUNvbXBsZXRlLFxuICBvblF1aWNrRmlsdGVyQ2hhbmdlLFxuICBvblByb2plY3RJZENoYW5nZSxcbiAgb25Ib2phR2FzdG9zSWRDaGFuZ2UsXG4gIG9uQ3VycmVuY3lDb2RlQ2hhbmdlLFxuICBvbk1hbmFnZWRVc2VySWRDaGFuZ2UsXG4gIG9uU3RhdHVzRmlsdGVyQ2hhbmdlLFxuICBvbkNsZWFyLFxuICBvbkFwcGx5LFxufTogRXhwZW5zZUZpbHRlcnNQYW5lbFByb3BzKSA9PiB7XG4gIGlmICghdmlzaWJsZSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGxvY2FsZSA9IGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiO1xuICBjb25zdCBzaG93SW5saW5lRGF0ZVN1bW1hcnkgPSAhc2hvd01hbnVhbERhdGVGaWx0ZXIgJiYgISFmcm9tRGF0ZSAmJiAhIXRvRGF0ZTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLWV4cGFuZGVkIHAtMiBzbTpwLTIuNSByZWxhdGl2ZVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdGFjayBmbGV4IGZsZXgtY29sIHNwYWNlLXktMlwiPlxuICAgICAgICA8RXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMgYWN0aXZlUXVpY2tGaWx0ZXI9e2FjdGl2ZVF1aWNrRmlsdGVyfSBvblF1aWNrRmlsdGVyQ2hhbmdlPXtvblF1aWNrRmlsdGVyQ2hhbmdlfSAvPlxuXG4gICAgICAgIHtzaG93TWFudWFsRGF0ZUZpbHRlciA/IChcbiAgICAgICAgICA8RXhwZW5zZURhdGVSYW5nZUZpbHRlclxuICAgICAgICAgICAgZnJvbURhdGU9e2Zyb21EYXRlfVxuICAgICAgICAgICAgdG9EYXRlPXt0b0RhdGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25EYXRlUmFuZ2VDaGFuZ2V9XG4gICAgICAgICAgICBvblJhbmdlQ29tcGxldGU9e29uTWFudWFsUmFuZ2VDb21wbGV0ZX1cbiAgICAgICAgICAgIGF1dG9PcGVuUmVxdWVzdElkPXttYW51YWxEYXRlQXV0b09wZW5LZXl9XG4gICAgICAgICAgICBzaG93TWFudWFsRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3J9XG4gICAgICAgICAgICBzaG93U3RhcnRFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvciAmJiAhZnJvbURhdGV9XG4gICAgICAgICAgICBzaG93RW5kRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3IgJiYgIXRvRGF0ZX1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogc2hvd0lubGluZURhdGVTdW1tYXJ5ID8gKFxuICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxuICAgICAgICAgICAgc3VtbWFyeUZyb21MYWJlbD17aW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIil9XG4gICAgICAgICAgICBzdW1tYXJ5VG9MYWJlbD17aW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKX1cbiAgICAgICAgICAgIGZyb21WYWx1ZT17Zm9ybWF0RGF0ZShmcm9tRGF0ZSwgbG9jYWxlKX1cbiAgICAgICAgICAgIHRvVmFsdWU9e2Zvcm1hdERhdGUodG9EYXRlLCBsb2NhbGUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ2FwLXktMSB0ZXh0LVsxMXB4XSBweC0xXCJcbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgJHtzaG93TWFuYWdlZFVzZXJGaWx0ZXIgPyBcImxnOmdyaWQtY29scy01XCIgOiBcImxnOmdyaWQtY29scy00XCJ9IGdhcC0yYH0+XG4gICAgICAgICAgPEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfUHJvamVjdFwiLCBcIlByb2plY3RcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxuICAgICAgICAgICAgdmFsdWU9e3Byb2plY3RJZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvblByb2plY3RJZENoYW5nZX1cbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxFeHBlbnNlU2hlZXRGaWx0ZXJJbnB1dFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TaGVldFwiLCBcIkV4cGVuc2Ugc2hlZXRcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1NoZWV0XCIsIFwiRXhwZW5zZSBzaGVldFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtob2phR2FzdG9zSWR9XG4gICAgICAgICAgICBtYW5hZ2VkVXNlcklkPXttYW5hZ2VkVXNlcklkfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uSG9qYUdhc3Rvc0lkQ2hhbmdlfVxuICAgICAgICAgICAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnNcbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtjdXJyZW5jeUNvZGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25DdXJyZW5jeUNvZGVDaGFuZ2V9XG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgc2hvd0xvYWRpbmdTdGF0ZVRleHQ9e2ZhbHNlfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICB7c2hvd01hbmFnZWRVc2VyRmlsdGVyID8gKFxuICAgICAgICAgICAgPEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1VzZXJcIiwgXCJVc2VyXCIpfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1VzZXJcIiwgXCJVc2VyXCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17bWFuYWdlZFVzZXJJZH1cbiAgICAgICAgICAgICAgdXNlcnM9e21hbmFnZWRVc2Vyc31cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uTWFuYWdlZFVzZXJJZENoYW5nZX1cbiAgICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgICAgY2xlYXJPbkVtcHR5SW5wdXRcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICA8RXhwZW5zZVN0YXR1c0ZpbHRlclNlbGVjdFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNcIiwgXCJFc3RhZG9cIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1N0YXR1c19QbGFjZWhvbGRlclwiLCBcIkVzdGFkb1wiKX1cbiAgICAgICAgICAgIHZhbHVlPXtzdGF0dXNGaWx0ZXJ9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25TdGF0dXNGaWx0ZXJDaGFuZ2V9XG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxFeHBlbnNlRmlsdGVyQWN0aW9uc1xuICAgICAgICAgIGNsZWFyTGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGVhclwiLCBcIkNsZWFyXCIpfVxuICAgICAgICAgIGFwcGx5TGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9BcHBseVwiLCBcIkFwcGx5XCIpfVxuICAgICAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XG4gICAgICAgICAgb25BcHBseT17b25BcHBseX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUZpbHRlcnNQYW5lbDtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldENhcmQsIEV4cGVuc2VTaGVldExpc3RGaWx0ZXJzIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgYnVpbGRFeHBlbnNlTGlzdFBheWxvYWQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVBheWxvYWRCdWlsZGVycy50c1wiO1xuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRMaXN0LCBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVNoZWV0c0xpc3REYXRhQXJncyA9IHtcbiAgaGFzQWNjZXNzOiBib29sZWFuO1xuICBwYWdlU2l6ZTogbnVtYmVyO1xuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcbn07XG5cbi8vIE93bnMgbGlzdCBkYXRhIGZldGNoLCBsb2FkaW5nIHN0YXRlLCBhbmQgcGFnaW5hdGlvbiBtZXRhZGF0YS5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRzTGlzdERhdGEgPSAoeyBoYXNBY2Nlc3MsIHBhZ2VTaXplLCBvbkZvcmJpZGRlbiB9OiBVc2VFeHBlbnNlU2hlZXRzTGlzdERhdGFBcmdzKSA9PiB7XG4gIGNvbnN0IFtpdGVtcywgc2V0SXRlbXNdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0Q2FyZFtdPihbXSk7XG4gIGNvbnN0IFt0b3RhbCwgc2V0VG90YWxdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtjdXJyZW50UGFnZSwgc2V0Q3VycmVudFBhZ2VdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICBjb25zdCByZXN0b3JlTGlzdFNuYXBzaG90ID0gdXNlQ2FsbGJhY2soXG4gICAgKHNuYXBzaG90OiB7IGl0ZW1zOiBFeHBlbnNlU2hlZXRDYXJkW107IHRvdGFsOiBudW1iZXI7IHBhZ2U6IG51bWJlciB9KSA9PiB7XG4gICAgICBjb25zdCBzYWZlSXRlbXMgPSBBcnJheS5pc0FycmF5KHNuYXBzaG90Lml0ZW1zKSA/IHNuYXBzaG90Lml0ZW1zIDogW107XG4gICAgICBjb25zdCBzYWZlVG90YWxSYXcgPSBOdW1iZXIoc25hcHNob3QudG90YWwpO1xuICAgICAgY29uc3Qgc2FmZVRvdGFsID0gTnVtYmVyLmlzRmluaXRlKHNhZmVUb3RhbFJhdykgJiYgc2FmZVRvdGFsUmF3ID49IDAgPyBzYWZlVG90YWxSYXcgOiBzYWZlSXRlbXMubGVuZ3RoO1xuICAgICAgY29uc3Qgc2FmZVBhZ2VSYXcgPSBOdW1iZXIoc25hcHNob3QucGFnZSk7XG4gICAgICBjb25zdCBzYWZlUGFnZSA9IE51bWJlci5pc0Zpbml0ZShzYWZlUGFnZVJhdykgJiYgc2FmZVBhZ2VSYXcgPiAwID8gTWF0aC5mbG9vcihzYWZlUGFnZVJhdykgOiAxO1xuXG4gICAgICBzZXRJdGVtcyhzYWZlSXRlbXMpO1xuICAgICAgc2V0VG90YWwoc2FmZVRvdGFsKTtcbiAgICAgIHNldEN1cnJlbnRQYWdlKHNhZmVQYWdlKTtcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgfSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IGxvYWRMaXN0ID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKHBhZ2U6IG51bWJlciwgZmlsdGVyczogRXhwZW5zZVNoZWV0TGlzdEZpbHRlcnMpID0+IHtcbiAgICAgIGlmICghaGFzQWNjZXNzKSB7XG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgICAgY29uc3QgcGF5bG9hZCA9IGJ1aWxkRXhwZW5zZUxpc3RQYXlsb2FkKGZpbHRlcnMsIHBhZ2UsIHBhZ2VTaXplKTtcbiAgICAgIGNvbnN0IHNlbGVjdGVkTWFuYWdlZFVzZXJJZCA9IFN0cmluZyhmaWx0ZXJzPy5tYW5hZ2VkVXNlcklkIHx8IFwiXCIpLnRyaW0oKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldExpc3QocGF5bG9hZCwge1xuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgIGF4VXNlcklkT3ZlcnJpZGU6IHNlbGVjdGVkTWFuYWdlZFVzZXJJZCB8fCB1bmRlZmluZWQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0cy5cIikpO1xuICAgICAgICAgIHNldEl0ZW1zKFtdKTtcbiAgICAgICAgICBzZXRUb3RhbCgwKTtcbiAgICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXh0SXRlbXMgPSAoQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXSkubWFwKChpdGVtKSA9PlxuICAgICAgICAgIG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkKGl0ZW0pXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG5leHRUb3RhbCA9IE51bWJlcihyZXNwb25zZT8uVG90YWwgPz8gbmV4dEl0ZW1zLmxlbmd0aCA/PyAwKTtcbiAgICAgICAgc2V0SXRlbXMobmV4dEl0ZW1zKTtcbiAgICAgICAgc2V0VG90YWwobmV4dFRvdGFsKTtcbiAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0cy5cIik7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgc2V0SXRlbXMoW10pO1xuICAgICAgICBzZXRUb3RhbCgwKTtcbiAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2hhc0FjY2Vzcywgb25Gb3JiaWRkZW4sIHBhZ2VTaXplXVxuICApO1xuXG4gIGNvbnN0IHJlc2V0TGlzdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRJdGVtcyhbXSk7XG4gICAgc2V0VG90YWwoMCk7XG4gICAgc2V0Q3VycmVudFBhZ2UoMSk7XG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBpdGVtcyxcbiAgICB0b3RhbCxcbiAgICBjdXJyZW50UGFnZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGxvYWRMaXN0LFxuICAgIHJlc3RvcmVMaXN0U25hcHNob3QsXG4gICAgcmVzZXRMaXN0LFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVF1aWNrRmlsdGVySWQsIEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuL2V4cGVuc2VMaXN0VHlwZXMudHNcIjtcbmltcG9ydCB7IERFRkFVTFRfRVhQRU5TRV9TVEFUVVNfRklMVEVSIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlU3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZEYXksIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplRXhwZW5zZUZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZUZpbHRlclNuYXBzaG90LnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZUFyZ3MgPSB7XG4gIG9uQXBwbHlGaWx0ZXJzOiAoc25hcHNob3Q6IEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4gdm9pZDtcbiAgb25DbGVhckZpbHRlcnM6ICgpID0+IHZvaWQ7XG4gIGRlZmF1bHRNYW5hZ2VkVXNlcklkOiBzdHJpbmc7XG59O1xuXG4vLyBPd25zIGZpbHRlciBVSSBzdGF0ZSBhbmQgYXBwbHkvY2xlYXIgcnVsZXMgZm9yIGV4cGVuc2UgbGlzdCBwYWdlLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJzU3RhdGUgPSAoe1xuICBvbkFwcGx5RmlsdGVycyxcbiAgb25DbGVhckZpbHRlcnMsXG4gIGRlZmF1bHRNYW5hZ2VkVXNlcklkLFxufTogVXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZUFyZ3MpID0+IHtcbiAgY29uc3QgW2Zyb21EYXRlLCBzZXRGcm9tRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3RvRGF0ZSwgc2V0VG9EYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbcHJvamVjdElkLCBzZXRQcm9qZWN0SWRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtob2phR2FzdG9zSWQsIHNldEhvamFHYXN0b3NJZF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2N1cnJlbmN5Q29kZSwgc2V0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFuYWdlZFVzZXJJZCwgc2V0TWFuYWdlZFVzZXJJZF0gPSB1c2VTdGF0ZShkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XG4gIGNvbnN0IFtzdGF0dXNGaWx0ZXIsIHNldFN0YXR1c0ZpbHRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZT4oREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIpO1xuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlID0gbnVsbDtcbiAgY29uc3QgW2FjdGl2ZVF1aWNrRmlsdGVyLCBzZXRBY3RpdmVRdWlja0ZpbHRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlUXVpY2tGaWx0ZXJJZCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd01hbnVhbERhdGVGaWx0ZXIsIHNldFNob3dNYW51YWxEYXRlRmlsdGVyXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dNYW51YWxEYXRlRXJyb3IsIHNldFNob3dNYW51YWxEYXRlRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWFudWFsRGF0ZUF1dG9PcGVuS2V5LCBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXldID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFthcHBsaWVkRmlsdGVycywgc2V0QXBwbGllZEZpbHRlcnNdID0gdXNlU3RhdGU8QXBwbGllZEZpbHRlclNuYXBzaG90IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzaG93RmlsdGVycywgc2V0U2hvd0ZpbHRlcnNdID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgY29uc3QgY3VycmVudEZpbHRlcnMgPSB1c2VNZW1vPEFwcGxpZWRGaWx0ZXJTbmFwc2hvdD4oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZyb21EYXRlLFxuICAgICAgdG9EYXRlLFxuICAgICAgcHJvamVjdElkLFxuICAgICAgaG9qYUdhc3Rvc0lkLFxuICAgICAgY3VycmVuY3lDb2RlLFxuICAgICAgbWFuYWdlZFVzZXJJZCxcbiAgICAgIHN0YXR1c0ZpbHRlcixcbiAgICAgIGV4Y2hhbmdlUmF0ZU1vZGUsXG4gICAgICBmaWx0ZXI6IGhvamFHYXN0b3NJZCxcbiAgICB9KSxcbiAgICBbY3VycmVuY3lDb2RlLCBmcm9tRGF0ZSwgaG9qYUdhc3Rvc0lkLCBtYW5hZ2VkVXNlcklkLCBwcm9qZWN0SWQsIHN0YXR1c0ZpbHRlciwgdG9EYXRlXVxuICApO1xuXG4gIGNvbnN0IG9uQXBwbHkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFmcm9tRGF0ZSB8fCAhdG9EYXRlKSB7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKHRydWUpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIodHJ1ZSk7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzbmFwc2hvdDogQXBwbGllZEZpbHRlclNuYXBzaG90ID0ge1xuICAgICAgZnJvbURhdGUsXG4gICAgICB0b0RhdGUsXG4gICAgICBwcm9qZWN0SWQsXG4gICAgICBob2phR2FzdG9zSWQsXG4gICAgICBjdXJyZW5jeUNvZGUsXG4gICAgICBtYW5hZ2VkVXNlcklkLFxuICAgICAgc3RhdHVzRmlsdGVyLFxuICAgICAgZXhjaGFuZ2VSYXRlTW9kZSxcbiAgICAgIGZpbHRlcjogaG9qYUdhc3Rvc0lkLFxuICAgIH07XG5cbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICBzZXRBcHBsaWVkRmlsdGVycyhzbmFwc2hvdCk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcbiAgICBvbkFwcGx5RmlsdGVycyhzbmFwc2hvdCk7XG4gIH0sIFtjdXJyZW5jeUNvZGUsIGZyb21EYXRlLCBob2phR2FzdG9zSWQsIG1hbmFnZWRVc2VySWQsIG9uQXBwbHlGaWx0ZXJzLCBwcm9qZWN0SWQsIHN0YXR1c0ZpbHRlciwgdG9EYXRlXSk7XG5cbiAgLy8gUmVoeWRyYXRlcyB0aGUgbGlzdCBmaWx0ZXJzIGZyb20gYSBjYWNoZWQgc25hcHNob3Qgd2hlbiByZXR1cm5pbmcgZnJvbSBkZXRhaWwuXG4gIGNvbnN0IHJlc3RvcmVBcHBsaWVkRmlsdGVycyA9IHVzZUNhbGxiYWNrKChzbmFwc2hvdDogQXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB7XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VGaWx0ZXJTbmFwc2hvdChzbmFwc2hvdCk7XG4gICAgY29uc3QgcmVzdG9yZWRNYW5hZ2VkVXNlcklkID0gU3RyaW5nKG5vcm1hbGl6ZWQubWFuYWdlZFVzZXJJZCB8fCBkZWZhdWx0TWFuYWdlZFVzZXJJZCkudHJpbSgpO1xuICAgIHNldEZyb21EYXRlKG5vcm1hbGl6ZWQuZnJvbURhdGUpO1xuICAgIHNldFRvRGF0ZShub3JtYWxpemVkLnRvRGF0ZSk7XG4gICAgc2V0UHJvamVjdElkKG5vcm1hbGl6ZWQucHJvamVjdElkKTtcbiAgICBzZXRIb2phR2FzdG9zSWQobm9ybWFsaXplZC5ob2phR2FzdG9zSWQpO1xuICAgIHNldEN1cnJlbmN5Q29kZShub3JtYWxpemVkLmN1cnJlbmN5Q29kZSk7XG4gICAgc2V0TWFuYWdlZFVzZXJJZChyZXN0b3JlZE1hbmFnZWRVc2VySWQpO1xuICAgIHNldFN0YXR1c0ZpbHRlcihub3JtYWxpemVkLnN0YXR1c0ZpbHRlcik7XG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgIHNldEFwcGxpZWRGaWx0ZXJzKHtcbiAgICAgIC4uLm5vcm1hbGl6ZWQsXG4gICAgICBtYW5hZ2VkVXNlcklkOiByZXN0b3JlZE1hbmFnZWRVc2VySWQsXG4gICAgfSk7XG4gICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICB9LCBbZGVmYXVsdE1hbmFnZWRVc2VySWRdKTtcblxuICBjb25zdCBvbkNsZWFyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEZyb21EYXRlKFwiXCIpO1xuICAgIHNldFRvRGF0ZShcIlwiKTtcbiAgICBzZXRQcm9qZWN0SWQoXCJcIik7XG4gICAgc2V0SG9qYUdhc3Rvc0lkKFwiXCIpO1xuICAgIHNldEN1cnJlbmN5Q29kZShcIlwiKTtcbiAgICBzZXRNYW5hZ2VkVXNlcklkKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcbiAgICBzZXRTdGF0dXNGaWx0ZXIoREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXkoMCk7XG4gICAgc2V0QXBwbGllZEZpbHRlcnMobnVsbCk7XG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gICAgb25DbGVhckZpbHRlcnMoKTtcbiAgfSwgW2RlZmF1bHRNYW5hZ2VkVXNlcklkLCBvbkNsZWFyRmlsdGVyc10pO1xuXG4gIGNvbnN0IG9uRGF0ZVJhbmdlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXG4gICAgKG5leHRGcm9tRGF0ZTogc3RyaW5nLCBuZXh0VG9EYXRlOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGhhc0Z1bGxSYW5nZSA9ICEhbmV4dEZyb21EYXRlICYmICEhbmV4dFRvRGF0ZTtcbiAgICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XG4gICAgICBzZXRUb0RhdGUobmV4dFRvRGF0ZSk7XG4gICAgICBpZiAoIWhhc0Z1bGxSYW5nZSkge1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcbiAgICAgIH1cbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgaWYgKHNob3dNYW51YWxEYXRlRXJyb3IpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcighaGFzRnVsbFJhbmdlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtzaG93TWFudWFsRGF0ZUVycm9yXVxuICApO1xuXG4gIC8vIENsb3NlcyB0aGUgbWFudWFsIGRhdGUgVUkgb25jZSB0aGUgdXNlciBmaW5pc2hlcyBzZWxlY3RpbmcgYSBmdWxsIHJhbmdlLlxuICBjb25zdCBvbk1hbnVhbFJhbmdlQ29tcGxldGUgPSB1c2VDYWxsYmFjaygobmV4dEZyb21EYXRlOiBzdHJpbmcsIG5leHRUb0RhdGU6IHN0cmluZykgPT4ge1xuICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XG4gICAgc2V0VG9EYXRlKG5leHRUb0RhdGUpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG9uUXVpY2tGaWx0ZXJDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAoZmlsdGVySWQ6IEV4cGVuc2VRdWlja0ZpbHRlcklkKSA9PiB7XG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiY3VzdG9tXCIpIHtcbiAgICAgICAgLy8gVG9nZ2xlIG1hbnVhbCBkYXRlIGNvbnRyb2xzIG9uIGV2ZXJ5IERhdGUgYnV0dG9uIGNsaWNrLlxuICAgICAgICBpZiAoc2hvd01hbnVhbERhdGVGaWx0ZXIpIHtcbiAgICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKHRydWUpO1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICAgICAgLy8gQWx3YXlzIGFzayB0aGUgZGF0ZSBjb21wb25lbnQgdG8gb3BlbiB0aGUgY2FsZW5kYXIgd2hlbiBEYXRlIGlzIHByZXNzZWQuXG4gICAgICAgIHNldE1hbnVhbERhdGVBdXRvT3BlbktleSgocHJldmlvdXMpID0+IHByZXZpb3VzICsgMSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoZmlsdGVySWQpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG5cbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcbiAgICAgIGNvbnN0IG5leHRGcm9tID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtN1wiKSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gNik7XG4gICAgICB9IGVsc2UgaWYgKGZpbHRlcklkID09PSBcImRheXMtMzBcIikge1xuICAgICAgICBuZXh0RnJvbS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDI5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gODkpO1xuICAgICAgfVxuXG4gICAgICBzZXRGcm9tRGF0ZSh0b0lzb0RhdGUobmV4dEZyb20pKTtcbiAgICAgIHNldFRvRGF0ZSh0b0lzb0RhdGUodG9kYXkpKTtcbiAgICB9LFxuICAgIFtzaG93TWFudWFsRGF0ZUZpbHRlcl1cbiAgKTtcblxuICBjb25zdCB0b2dnbGVGaWx0ZXJQYW5lbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRTaG93RmlsdGVycygocHJldmlvdXMpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSAhcHJldmlvdXM7XG4gICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIGZyb21EYXRlLFxuICAgIHRvRGF0ZSxcbiAgICBwcm9qZWN0SWQsXG4gICAgaG9qYUdhc3Rvc0lkLFxuICAgIGN1cnJlbmN5Q29kZSxcbiAgICBtYW5hZ2VkVXNlcklkLFxuICAgIHN0YXR1c0ZpbHRlcixcbiAgICBleGNoYW5nZVJhdGVNb2RlLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxuICAgIGFwcGxpZWRGaWx0ZXJzLFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIGN1cnJlbnRGaWx0ZXJzLFxuICAgIHNldFByb2plY3RJZCxcbiAgICBzZXRIb2phR2FzdG9zSWQsXG4gICAgc2V0Q3VycmVuY3lDb2RlLFxuICAgIHNldE1hbmFnZWRVc2VySWQsXG4gICAgc2V0U3RhdHVzRmlsdGVyLFxuICAgIG9uQXBwbHksXG4gICAgb25DbGVhcixcbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMsXG4gICAgb25EYXRlUmFuZ2VDaGFuZ2UsXG4gICAgb25NYW51YWxSYW5nZUNvbXBsZXRlLFxuICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXG4gICAgdG9nZ2xlRmlsdGVyUGFuZWwsXG4gIH07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQWlFOzs7QUNBakUsbUJBQW1DO0FBd0Y3QjtBQXJFTixJQUFNLG1CQUFtQjtBQUV6QixJQUFNLGtCQUFrQixDQUFDLFVBQXVFO0FBQzlGLFVBQVEsTUFBTSxRQUFRLEtBQUssSUFBSSxRQUFRLENBQUMsR0FDckMsSUFBSSxDQUFDLFNBQVM7QUFDYixVQUFNLEtBQUssT0FBTyxNQUFNLGdCQUFnQixFQUFFLEVBQUUsS0FBSztBQUNqRCxRQUFJLENBQUMsR0FBSSxRQUFPO0FBQ2hCLFdBQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLFVBQVUsT0FBTyxNQUFNLGVBQWUsRUFBRSxFQUFFLEtBQUssS0FBSztBQUFBLElBQ3REO0FBQUEsRUFDRixDQUFDLEVBQ0EsT0FBTyxPQUFPO0FBQ25CO0FBR0EsSUFBTSwwQkFBMEIsQ0FBQztBQUFBLEVB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aUJBQ3BDO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQztBQUFBLFVBQ0EsT0FBTyxlQUFlO0FBQUEsVUFDdEIsWUFBWTtBQUFBLFVBQ1osUUFBUSxNQUFNLFdBQVcsRUFBRTtBQUFBLFVBQzNCLGdCQUFlO0FBQUEsVUFDZixpQkFBaUI7QUFBQSxVQUNqQjtBQUFBO0FBQUEsTUFDRixLQVRRLEdBQUcsRUFBRSxJQUFJLEtBQUssRUFVeEI7QUFBQSxJQUVKLENBQUMsR0FDSCxJQUNFO0FBQUEsSUFFSjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsS0FBSztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsUUFDQSxTQUFTO0FBQUEsUUFDVCxjQUFjLENBQUMsU0FBUztBQUN0QixnQkFBTSxXQUFXLGtCQUFrQjtBQUNuQyxnQkFBTSx3QkFBd0IsZ0NBQWdDLFNBQVMsZUFBZSxZQUFZO0FBQ2xHLGVBQUssU0FBUyxNQUFNO0FBQUEsWUFDbEIsR0FBRztBQUFBLFlBQ0gsZUFBZTtBQUFBLFVBQ2pCLENBQUM7QUFBQSxRQUNIO0FBQUEsUUFDQSxRQUFRO0FBQUE7QUFBQSxJQUNWO0FBQUEsSUFFQyxtQkFDQztBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTTtBQUFBLFFBQ04sV0FBVyxLQUFLLGlCQUFpQixRQUFRO0FBQUEsUUFDekMsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsU0FBUztBQUFBO0FBQUEsSUFDWCxJQUNFO0FBQUEsS0FDTjtBQUVKO0FBR0EsSUFBTSxvQkFBb0IsTUFBTTtBQUM5QixTQUNFLDZDQUFDLGdDQUFxQix5QkFBdUIsTUFDM0MsdURBQUMsNEJBQXlCLEdBQzVCO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxxQkFBcUI7QUFDNUQsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQyxxQkFBa0IsQ0FBRTtBQUNoRDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sNEJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJSZWFjdCJdCn0K
