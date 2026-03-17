import {
  ExpenseDateRangeFilter_default,
  ExpenseFilterActions_default,
  ExpenseManagedUserFilterSelect_default,
  ExpenseQuickDateFilters_default,
  buildExpenseListPayload,
  buildExpenseSheetSuggestPayload,
  hasExpenseReturnReferrer,
  isExpenseAbortLikeError,
  isExpenseHistoryBackForwardNavigation,
  runExpenseReadRequestWithRetry
} from "./chunks/chunk-N335R5NI.js";
import {
  HistorySummary_default
} from "./chunks/chunk-7Z3NMBR5.js";
import {
  normalizeExpenseFilterSnapshot,
  useExpenseSheetsFilterCache
} from "./chunks/chunk-2GJBCQBO.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-AEUWWHOM.js";
import {
  DEFAULT_EXPENSE_STATUS_FILTER,
  getExpenseStatusBadgeClassName,
  getExpenseStatusFilterOptions,
  getExpenseStatusLabel,
  normalizeExpenseStatusFilterCode
} from "./chunks/chunk-W2YOA3BT.js";
import {
  RemoteSearchCombobox_default
} from "./chunks/chunk-ASLVMCBT.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-QGBVJNF4.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-4PPSRAOM.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-JR7YV7OS.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-FRQBPU47.js";
import "./chunks/chunk-AXUPQW6N.js";
import {
  formatAmountWithCurrency,
  formatExpenseDateParts,
  formatExpenseDisplayDate,
  hasAssignedVoucher,
  navigateToExpenseUrl,
  safeText,
  startOfDay,
  toIsoDate
} from "./chunks/chunk-JWQJTNB4.js";
import {
  configureExpenseApiAuth,
  fetchExpenseSheetList,
  mapExpenseSheetListItemToCard
} from "./chunks/chunk-CNJSX7GH.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-YRLD2CA7.js";
import {
  clearExpenseActingUserOverride,
  setExpenseActingUserOverride
} from "./chunks/chunk-KTF6MF2Z.js";
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
} from "./chunks/chunk-IKHTGBEE.js";
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
var formatSheetOptionTitle = (sheetId, ownerUserId) => {
  if (!ownerUserId) return sheetId;
  return `${sheetId} (${ownerUserId})`;
};
var mapSheetOptions = (items) => {
  return (Array.isArray(items) ? items : []).map((item) => {
    const id = String(item?.HojaGastosId || "").trim();
    const ownerUserId = String(item?.UserId || "").trim();
    if (!id) return null;
    return {
      value: id,
      title: formatSheetOptionTitle(id, ownerUserId),
      subtitle: String(item?.Description || "").trim() || "-"
    };
  }).filter(Boolean);
};
var ExpenseSheetFilterInput = ({
  label,
  placeholder,
  value,
  managedUserId = "",
  includeSubordinates = false,
  onChange,
  enableRemoteSuggestions = true,
  disabled = false,
  readOnly = false,
  showLabel = true
}) => {
  const readOnlyMode = readOnly || disabled;
  const normalizedManagedUserId = String(managedUserId || "").trim();
  const loadOptions = (0, import_react.useCallback)(async (term, signal) => {
    const payload = buildExpenseSheetSuggestPayload(term, SEARCH_PAGE_SIZE, 1, includeSubordinates);
    const response = await fetchExpenseSheetList(payload, {
      suppressPermissionModal: true,
      axUserIdOverride: normalizedManagedUserId || void 0,
      signal
    });
    if (response?.Success === false) {
      return [];
    }
    return mapSheetOptions(response?.Items);
  }, [includeSubordinates, normalizedManagedUserId]);
  const loadOptionsPage = (0, import_react.useCallback)(async (term, page, pageSize, signal) => {
    const payload = buildExpenseSheetSuggestPayload(term, pageSize, page, includeSubordinates);
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
  }, [includeSubordinates, normalizedManagedUserId]);
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
  sheetLookupManagedUserId,
  includeSubordinates,
  managedUsers,
  showManagedUserFilter,
  managedUserFilterDisabled,
  managedUserAllOption = null,
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
      showManagedUserFilter ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        ExpenseManagedUserFilterSelect_default,
        {
          label: indT("ExpenseSheets_Filter_User", "User"),
          placeholder: indT("ExpenseSheets_Filter_User", "User"),
          value: managedUserId,
          users: managedUsers,
          allOption: managedUserAllOption,
          onChange: onManagedUserIdChange,
          disabled: managedUserFilterDisabled,
          showLabel: false,
          clearOnEmptyInput: true
        }
      ) : null,
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        ExpenseSheetFilterInput_default,
        {
          label: indT("ExpenseSheets_Filter_Sheet", "Expense sheet"),
          placeholder: indT("ExpenseSheets_Filter_Sheet", "Expense sheet"),
          value: hojaGastosId,
          managedUserId: sheetLookupManagedUserId,
          includeSubordinates,
          onChange: onHojaGastosIdChange,
          enableRemoteSuggestions: true,
          showLabel: false
        }
      ),
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
  const activeRequestControllerRef = (0, import_react3.useRef)(null);
  const activeRequestSeqRef = (0, import_react3.useRef)(0);
  (0, import_react3.useEffect)(() => {
    return () => {
      activeRequestSeqRef.current += 1;
      if (!activeRequestControllerRef.current) return;
      activeRequestControllerRef.current.abort();
      activeRequestControllerRef.current = null;
    };
  }, []);
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
      if (activeRequestControllerRef.current) {
        activeRequestControllerRef.current.abort();
      }
      const controller = new AbortController();
      activeRequestControllerRef.current = controller;
      const requestSeq = activeRequestSeqRef.current + 1;
      activeRequestSeqRef.current = requestSeq;
      setIsLoading(true);
      setErrorMessage("");
      const payload = buildExpenseListPayload(filters, page, pageSize);
      const selectedManagedUserId = String(filters?.managedUserId || "").trim();
      try {
        const response = await runExpenseReadRequestWithRetry(
          () => fetchExpenseSheetList(payload, {
            suppressPermissionModal: true,
            signal: controller.signal,
            axUserIdOverride: selectedManagedUserId || void 0
          }),
          {
            signal: controller.signal
          }
        );
        if (requestSeq !== activeRequestSeqRef.current) return;
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
        if (requestSeq !== activeRequestSeqRef.current) return;
        if (isExpenseAbortLikeError(error, controller.signal)) return;
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
        if (requestSeq === activeRequestSeqRef.current) {
          setIsLoading(false);
          activeRequestControllerRef.current = null;
        }
      }
    },
    [hasAccess, onForbidden, pageSize]
  );
  const resetList = (0, import_react3.useCallback)(() => {
    activeRequestSeqRef.current += 1;
    if (activeRequestControllerRef.current) {
      activeRequestControllerRef.current.abort();
      activeRequestControllerRef.current = null;
    }
    setItems([]);
    setTotal(0);
    setCurrentPage(1);
    setErrorMessage("");
    setIsLoading(false);
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
  const [includeSubordinates, setIncludeSubordinates] = (0, import_react4.useState)(false);
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
      managedUserId: String(managedUserId || defaultManagedUserId).trim(),
      includeSubordinates,
      statusFilter,
      exchangeRateMode,
      filter: hojaGastosId
    }),
    [currencyCode, defaultManagedUserId, fromDate, hojaGastosId, includeSubordinates, managedUserId, projectId, statusFilter, toDate]
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
      managedUserId: String(managedUserId || defaultManagedUserId).trim(),
      includeSubordinates,
      statusFilter,
      exchangeRateMode,
      filter: hojaGastosId
    };
    setShowManualDateError(false);
    setAppliedFilters(snapshot);
    setShowManualDateFilter(false);
    setShowFilters(false);
    onApplyFilters(snapshot);
  }, [currencyCode, defaultManagedUserId, fromDate, hojaGastosId, includeSubordinates, managedUserId, onApplyFilters, projectId, statusFilter, toDate]);
  const restoreAppliedFilters = (0, import_react4.useCallback)((snapshot) => {
    const normalized = normalizeExpenseFilterSnapshot(snapshot);
    const restoredManagedUserId = String(normalized.managedUserId || defaultManagedUserId).trim();
    setFromDate(normalized.fromDate);
    setToDate(normalized.toDate);
    setProjectId(normalized.projectId);
    setHojaGastosId(normalized.hojaGastosId);
    setCurrencyCode(normalized.currencyCode);
    setManagedUserId(restoredManagedUserId);
    setIncludeSubordinates(normalized.includeSubordinates === true);
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
    setIncludeSubordinates(false);
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
    includeSubordinates,
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
    setIncludeSubordinates,
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

// Web/wwwroot/react/src/pages/gastos/list/expenseManagedUserSelection.ts
var EXPENSE_SHEETS_ALL_USERS_VALUE = "__expense_sheets_all_users__";
var normalizeUserId = (value) => String(value || "").trim();
var isSameExpenseManagedUser = (left, right) => {
  const normalizedLeft = normalizeUserId(left).toUpperCase();
  const normalizedRight = normalizeUserId(right).toUpperCase();
  return !!normalizedLeft && normalizedLeft === normalizedRight;
};
var ensureCurrentExpenseManagedUserInList = (users, currentAxUserId) => {
  const normalizedCurrent = normalizeUserId(currentAxUserId);
  const normalizedUsers = Array.isArray(users) ? users : [];
  if (!normalizedCurrent) return normalizedUsers;
  if (normalizedUsers.some((entry) => isSameExpenseManagedUser(entry.axUserId, normalizedCurrent))) {
    return normalizedUsers;
  }
  return [
    {
      crmUserId: normalizedCurrent,
      axUserId: normalizedCurrent,
      name: normalizedCurrent
    },
    ...normalizedUsers
  ];
};
var resolveExpenseManagedUserSelection = (requestedUserId, currentAxUserId, users) => {
  const normalizedRequested = normalizeUserId(requestedUserId);
  const normalizedCurrent = normalizeUserId(currentAxUserId);
  if (normalizedRequested) {
    const exact = users.find((entry) => isSameExpenseManagedUser(entry.axUserId, normalizedRequested));
    if (exact) return exact.axUserId;
  }
  if (normalizedCurrent) {
    const self = users.find((entry) => isSameExpenseManagedUser(entry.axUserId, normalizedCurrent));
    return self?.axUserId || normalizedCurrent;
  }
  return "";
};
var normalizeExpenseManagedUserFilterState = ({
  managedUserId,
  includeSubordinates,
  currentAxUserId,
  users,
  canManageOtherUsers
}) => {
  const normalizedUsers = ensureCurrentExpenseManagedUserInList(users, currentAxUserId);
  const resolvedManagedUserId = resolveExpenseManagedUserSelection(managedUserId, currentAxUserId, normalizedUsers);
  return {
    managedUserId: resolvedManagedUserId,
    includeSubordinates: canManageOtherUsers && includeSubordinates === true
  };
};
var normalizeExpenseManagedUserFilterChange = ({
  requestedValue,
  currentAxUserId,
  users,
  canManageOtherUsers
}) => {
  const normalizedRequested = normalizeUserId(requestedValue);
  if (canManageOtherUsers && normalizedRequested === EXPENSE_SHEETS_ALL_USERS_VALUE) {
    const normalizedUsers = ensureCurrentExpenseManagedUserInList(users, currentAxUserId);
    const currentManagedUserId = resolveExpenseManagedUserSelection(currentAxUserId, currentAxUserId, normalizedUsers);
    return {
      managedUserId: currentManagedUserId,
      includeSubordinates: true
    };
  }
  return normalizeExpenseManagedUserFilterState({
    managedUserId: normalizedRequested,
    includeSubordinates: false,
    currentAxUserId,
    users,
    canManageOtherUsers
  });
};
var resolveExpenseManagedUserSelectValue = ({
  managedUserId,
  includeSubordinates,
  currentAxUserId,
  users,
  canManageOtherUsers
}) => {
  const normalized = normalizeExpenseManagedUserFilterState({
    managedUserId,
    includeSubordinates,
    currentAxUserId,
    users,
    canManageOtherUsers
  });
  return normalized.includeSubordinates ? EXPENSE_SHEETS_ALL_USERS_VALUE : normalized.managedUserId;
};
var shouldShowExpenseManagedUserSummary = ({
  managedUserId,
  includeSubordinates,
  currentAxUserId
}) => {
  if (includeSubordinates) return true;
  const normalizedManagedUserId = normalizeUserId(managedUserId);
  const normalizedCurrent = normalizeUserId(currentAxUserId);
  if (!normalizedManagedUserId) return false;
  if (!normalizedCurrent) return true;
  return !isSameExpenseManagedUser(normalizedManagedUserId, normalizedCurrent);
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
  const timelineContainerRef = import_react5.default.useRef(null);
  const { currentAxUserId, manageableSubordinates, canManageOtherUsers, managementBootstrapReady } = useAuthContext();
  const managedUsers = (0, import_react5.useMemo)(
    () => ensureCurrentExpenseManagedUserInList(Array.isArray(manageableSubordinates) ? manageableSubordinates : [], currentAxUserId),
    [currentAxUserId, manageableSubordinates]
  );
  const defaultManagedUserId = (0, import_react5.useMemo)(
    () => resolveExpenseManagedUserSelection(currentAxUserId, currentAxUserId, managedUsers),
    [currentAxUserId, managedUsers]
  );
  const showManagedUserFilter = true;
  const managedUserFilterDisabled = !managementBootstrapReady || !canManageOtherUsers;
  const managedUserAllLabel = indT("ExpenseSheets_Filter_User_All", "All");
  const managedUserAllOption = (0, import_react5.useMemo)(
    () => canManageOtherUsers ? {
      value: EXPENSE_SHEETS_ALL_USERS_VALUE,
      text: managedUserAllLabel
    } : null,
    [canManageOtherUsers, managedUserAllLabel]
  );
  const managedUserLabelById = (0, import_react5.useMemo)(() => {
    const map = /* @__PURE__ */ new Map();
    managedUsers.forEach((entry) => {
      const id = safeText(entry.axUserId);
      if (!id) return;
      const name = safeText(entry.name);
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
  const pendingAutomaticLoadTimerRef = import_react5.default.useRef(null);
  const {
    fromDate,
    toDate,
    projectId,
    hojaGastosId,
    currencyCode,
    managedUserId,
    includeSubordinates,
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
    setIncludeSubordinates,
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
      const normalizedSnapshot = normalizeManagedUserSnapshotForLoad(snapshot);
      if (normalizedSnapshot.managedUserId) {
        setExpenseActingUserOverride(normalizedSnapshot.managedUserId);
      } else {
        clearExpenseActingUserOverride();
      }
      void loadList(1, normalizedSnapshot);
    },
    onClearFilters: () => {
      setManagedUserId(defaultManagedUserId);
      setIncludeSubordinates(false);
      clearCachedState();
      clearExpenseActingUserOverride();
      resetList();
    },
    defaultManagedUserId
  });
  const normalizeManagedUserSnapshotForLoad = (0, import_react5.useCallback)(
    (snapshot) => {
      return {
        ...snapshot,
        ...normalizeExpenseManagedUserFilterState({
          managedUserId: snapshot.managedUserId,
          includeSubordinates: snapshot.includeSubordinates,
          currentAxUserId,
          users: managedUsers,
          canManageOtherUsers
        })
      };
    },
    [canManageOtherUsers, currentAxUserId, managedUsers]
  );
  const managedUserFilterSelectValue = (0, import_react5.useMemo)(
    () => resolveExpenseManagedUserSelectValue({
      managedUserId,
      includeSubordinates,
      currentAxUserId,
      users: managedUsers,
      canManageOtherUsers
    }),
    [canManageOtherUsers, currentAxUserId, includeSubordinates, managedUserId, managedUsers]
  );
  const normalizedCurrentManagedUserFilters = (0, import_react5.useMemo)(
    () => normalizeManagedUserSnapshotForLoad(currentFilters),
    [currentFilters, normalizeManagedUserSnapshotForLoad]
  );
  const runAutomaticListLoad = (0, import_react5.useCallback)(
    (page, snapshot, options = {}) => {
      if (pendingAutomaticLoadTimerRef.current != null) {
        window.clearTimeout(pendingAutomaticLoadTimerRef.current);
      }
      pendingAutomaticLoadTimerRef.current = window.setTimeout(() => {
        pendingAutomaticLoadTimerRef.current = null;
        if (options.resetBeforeLoad) {
          resetList();
        }
        void loadList(page, snapshot);
      }, 0);
    },
    [loadList, resetList]
  );
  (0, import_react5.useEffect)(() => {
    return () => {
      if (pendingAutomaticLoadTimerRef.current != null) {
        window.clearTimeout(pendingAutomaticLoadTimerRef.current);
        pendingAutomaticLoadTimerRef.current = null;
      }
    };
  }, []);
  const handleManagedUserIdChange = (0, import_react5.useCallback)(
    (value) => {
      const normalizedNextFilter = normalizeExpenseManagedUserFilterChange({
        requestedValue: value,
        currentAxUserId,
        users: managedUsers,
        canManageOtherUsers
      });
      const normalizedCurrentFilter = normalizeExpenseManagedUserFilterState({
        managedUserId,
        includeSubordinates,
        currentAxUserId,
        users: managedUsers,
        canManageOtherUsers
      });
      const normalizedRequestedValue = safeText(value);
      const isReturningToCurrentUser = normalizedRequestedValue === "" && !normalizedNextFilter.includeSubordinates && isSameExpenseManagedUser(normalizedNextFilter.managedUserId, defaultManagedUserId);
      const wasUsingNonDefaultSelection = normalizedCurrentFilter.includeSubordinates || !isSameExpenseManagedUser(normalizedCurrentFilter.managedUserId, defaultManagedUserId);
      setManagedUserId(normalizedNextFilter.managedUserId);
      setIncludeSubordinates(normalizedNextFilter.includeSubordinates);
      setHojaGastosId("");
      clearCachedState();
      if (!wasUsingNonDefaultSelection || !isReturningToCurrentUser) {
        return;
      }
      const nextSnapshot = normalizeManagedUserSnapshotForLoad({
        ...appliedFilters || currentFilters,
        hojaGastosId: "",
        ...normalizedNextFilter
      });
      if (nextSnapshot.managedUserId) {
        setExpenseActingUserOverride(nextSnapshot.managedUserId);
      } else {
        clearExpenseActingUserOverride();
      }
      restoreAppliedFilters(nextSnapshot);
      runAutomaticListLoad(1, nextSnapshot);
    },
    [
      appliedFilters,
      canManageOtherUsers,
      clearCachedState,
      currentFilters,
      currentAxUserId,
      defaultManagedUserId,
      includeSubordinates,
      loadList,
      managedUserId,
      managedUsers,
      normalizeManagedUserSnapshotForLoad,
      restoreAppliedFilters,
      runAutomaticListLoad,
      setIncludeSubordinates,
      setHojaGastosId,
      setManagedUserId
    ]
  );
  const goToDetail = (0, import_react5.useCallback)(
    (sheetId, ownerUserId) => {
      if (!sheetId) return;
      const normalizedSnapshot = normalizeManagedUserSnapshotForLoad(appliedFilters || currentFilters);
      const detailOwnerUserId = normalizedSnapshot.includeSubordinates ? safeText(ownerUserId) || normalizedSnapshot.managedUserId : normalizedSnapshot.managedUserId;
      if (detailOwnerUserId) {
        setExpenseActingUserOverride(detailOwnerUserId);
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
    [appliedFilters, currentFilters, currentPage, items, normalizeManagedUserSnapshotForLoad, saveCachedState, total]
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
    const normalizedManagedUserFilters = normalizeManagedUserSnapshotForLoad(appliedFilters);
    if (shouldShowExpenseManagedUserSummary({
      managedUserId: normalizedManagedUserFilters.managedUserId,
      includeSubordinates: normalizedManagedUserFilters.includeSubordinates,
      currentAxUserId
    })) {
      const managedUserLabel = normalizedManagedUserFilters.includeSubordinates ? managedUserAllLabel : managedUserLabelById.get(normalizedManagedUserFilters.managedUserId.toUpperCase()) || normalizedManagedUserFilters.managedUserId;
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
  }, [appliedFilters, currentAxUserId, managedUserAllLabel, managedUserLabelById, normalizeManagedUserSnapshotForLoad]);
  const showSummary = !showFilters && summaryItems.length > 0;
  const activeListFilters = appliedFilters || currentFilters;
  (0, import_react5.useEffect)(() => {
    if (!managementBootstrapReady || !hasAccess) return;
    if (didRestoreOnMountRef.current) return;
    didRestoreOnMountRef.current = true;
    const isHistoryBackForward = isExpenseHistoryBackForwardNavigation();
    const isReturnFromExpenseDetail = hasExpenseReturnReferrer([
      "/Gastos/ExpenseSheetDetail",
      "/Gastos/ExpenseLineDetail"
    ]);
    if (!consumeReturnFlag() && !isHistoryBackForward && !isReturnFromExpenseDetail) {
      clearCachedState();
      setManagedUserId(defaultManagedUserId);
      setIncludeSubordinates(false);
      clearExpenseActingUserOverride();
      return;
    }
    const cachedState = readCachedState();
    if (!cachedState) {
      clearCachedState();
      setManagedUserId(defaultManagedUserId);
      setIncludeSubordinates(false);
      clearExpenseActingUserOverride();
      return;
    }
    const restoredFilters = {
      ...cachedState.filters,
      ...normalizeManagedUserSnapshotForLoad(cachedState.filters)
    };
    if (restoredFilters.managedUserId) {
      setExpenseActingUserOverride(restoredFilters.managedUserId);
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
    }
    runAutomaticListLoad(cachedState.page, restoredFilters);
  }, [
    clearCachedState,
    consumeReturnFlag,
    defaultManagedUserId,
    hasAccess,
    loadList,
    managementBootstrapReady,
    normalizeManagedUserSnapshotForLoad,
    readCachedState,
    restoreAppliedFilters,
    restoreListSnapshot,
    runAutomaticListLoad,
    setIncludeSubordinates,
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
    if (!managementBootstrapReady || !hasAccess) return;
    const handlePageShow = (event) => {
      if (!event.persisted && !isExpenseHistoryBackForwardNavigation()) return;
      const snapshot = normalizeManagedUserSnapshotForLoad(appliedFilters || currentFilters);
      if (snapshot.managedUserId) {
        setExpenseActingUserOverride(snapshot.managedUserId);
      } else {
        clearExpenseActingUserOverride();
      }
      runAutomaticListLoad(currentPage < 1 ? 1 : currentPage, snapshot);
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [
    appliedFilters,
    clearExpenseActingUserOverride,
    currentFilters,
    currentPage,
    hasAccess,
    managementBootstrapReady,
    normalizeManagedUserSnapshotForLoad,
    runAutomaticListLoad
  ]);
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
      void loadList(currentPage < 1 ? 1 : currentPage, normalizeManagedUserSnapshotForLoad(appliedFilters));
    };
    window.addEventListener("expense-sheets-toggle-filter", onToggleFilters);
    window.addEventListener("expense-sheets-refresh", onRefresh);
    return () => {
      window.removeEventListener("expense-sheets-toggle-filter", onToggleFilters);
      window.removeEventListener("expense-sheets-refresh", onRefresh);
    };
  }, [appliedFilters, currentPage, loadList, normalizeManagedUserSnapshotForLoad, showFilters, toggleFilterPanel]);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-2", children: [
    showSummary ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "filter-card filter-card--summary p-3 sm:p-4 mt-1 mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "expense-summary-grid grid grid-cols-1 min-[360px]:grid-cols-2 items-start gap-x-4 gap-y-1 text-xs", children: summaryItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
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
      `${item.key}-${item.value}`
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
        managedUserId: managedUserFilterSelectValue,
        sheetLookupManagedUserId: normalizedCurrentManagedUserFilters.managedUserId,
        includeSubordinates,
        managedUsers,
        showManagedUserFilter,
        managedUserFilterDisabled,
        managedUserAllOption,
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
    !errorMessage && items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ref: timelineContainerRef, className: "timeline-box", children: items.map((item) => {
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
      const ownerId = safeText(item.userId);
      const ownerName = safeText(item.userName);
      const showOwnerSubtitle = activeListFilters.includeSubordinates === true;
      const ownerSubtitle = showOwnerSubtitle && ownerId ? ownerName ? `${ownerName} (${ownerId})` : ownerId : "";
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "timeline-item", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ExpenseTimelineCard_default,
        {
          dateParts,
          title: description || "-",
          subtitle: ownerSubtitle,
          amountText: totalAmountText,
          onOpen: () => goToDetail(id, ownerId),
          titleClassName: "expense-sheet-card__title timeline-name",
          statusClassName: statusClass,
          statusLabel
        }
      ) }, id || `${ownerId}-${voucher}-${item.createdDate}`);
    }) }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      CompactPagination_default,
      {
        totalPages,
        currentPage,
        loading: isLoading,
        onPageChange: (page) => {
          void loadList(page, normalizeManagedUserSnapshotForLoad(appliedFilters || currentFilters));
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saXN0L0V4cGVuc2VTaGVldHNQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0RmlsdGVySW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0LnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZUZpbHRlcnNQYW5lbC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saXN0L3VzZUV4cGVuc2VTaGVldHNMaXN0RGF0YS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpc3QvdXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpc3QvZXhwZW5zZU1hbmFnZWRVc2VyU2VsZWN0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcbmltcG9ydCB7IHVzZUF1dGhDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHtcbiAgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIsXG4gIGdldEV4cGVuc2VTdGF0dXNCYWRnZUNsYXNzTmFtZSxcbiAgZ2V0RXhwZW5zZVN0YXR1c0xhYmVsLFxuICBub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSxcbn0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlU3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IEV4cGVuc2VGaWx0ZXJzUGFuZWwgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZUZpbHRlcnNQYW5lbC50c3hcIjtcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURhdGVQYXJ0cywgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBoYXNBc3NpZ25lZFZvdWNoZXIsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRzTGlzdERhdGEgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRzTGlzdERhdGEudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRzRmlsdGVyc1N0YXRlLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUudHNcIjtcbmltcG9ydCBFeHBlbnNlVGltZWxpbmVDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4XCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuaW1wb3J0IHsgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlLCBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBY3RpbmdVc2VyLnRzXCI7XG5pbXBvcnQgeyBoYXNFeHBlbnNlUmV0dXJuUmVmZXJyZXIsIGlzRXhwZW5zZUhpc3RvcnlCYWNrRm9yd2FyZE5hdmlnYXRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUhpc3RvcnlOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RvcGJhckFjdGlvblZpc2liaWxpdHkudHNcIjtcbmltcG9ydCB7XG4gIGVuc3VyZUN1cnJlbnRFeHBlbnNlTWFuYWdlZFVzZXJJbkxpc3QsXG4gIEVYUEVOU0VfU0hFRVRTX0FMTF9VU0VSU19WQUxVRSxcbiAgaXNTYW1lRXhwZW5zZU1hbmFnZWRVc2VyLFxuICBub3JtYWxpemVFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJDaGFuZ2UsXG4gIG5vcm1hbGl6ZUV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclN0YXRlLFxuICByZXNvbHZlRXhwZW5zZU1hbmFnZWRVc2VyU2VsZWN0VmFsdWUsXG4gIHJlc29sdmVFeHBlbnNlTWFuYWdlZFVzZXJTZWxlY3Rpb24sXG4gIHNob3VsZFNob3dFeHBlbnNlTWFuYWdlZFVzZXJTdW1tYXJ5LFxufSBmcm9tIFwiLi9leHBlbnNlTWFuYWdlZFVzZXJTZWxlY3Rpb24udHNcIjtcblxuY29uc3QgUEFHRV9TSVpFID0gNjtcblxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxuY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXG4gIH0pO1xufTtcblxuY29uc3QgRXhwZW5zZVNoZWV0c1BhZ2VDb250ZW50ID0gKCkgPT4ge1xuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIlZpZXdcIik7XG4gIGNvbnN0IGNhbkNyZWF0ZUV4cGVuc2UgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkFkZFwiKTtcbiAgY29uc3QgdGltZWxpbmVDb250YWluZXJSZWYgPSBSZWFjdC51c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgeyBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWFibGVTdWJvcmRpbmF0ZXMsIGNhbk1hbmFnZU90aGVyVXNlcnMsIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSB9ID0gdXNlQXV0aENvbnRleHQoKTtcbiAgY29uc3QgbWFuYWdlZFVzZXJzID0gdXNlTWVtbyhcbiAgICAoKSA9PiBlbnN1cmVDdXJyZW50RXhwZW5zZU1hbmFnZWRVc2VySW5MaXN0KEFycmF5LmlzQXJyYXkobWFuYWdlYWJsZVN1Ym9yZGluYXRlcykgPyBtYW5hZ2VhYmxlU3Vib3JkaW5hdGVzIDogW10sIGN1cnJlbnRBeFVzZXJJZCksXG4gICAgW2N1cnJlbnRBeFVzZXJJZCwgbWFuYWdlYWJsZVN1Ym9yZGluYXRlc11cbiAgKTtcbiAgY29uc3QgZGVmYXVsdE1hbmFnZWRVc2VySWQgPSB1c2VNZW1vKFxuICAgICgpID0+IHJlc29sdmVFeHBlbnNlTWFuYWdlZFVzZXJTZWxlY3Rpb24oY3VycmVudEF4VXNlcklkLCBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2VycyksXG4gICAgW2N1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzXVxuICApO1xuICBjb25zdCBzaG93TWFuYWdlZFVzZXJGaWx0ZXIgPSB0cnVlO1xuICBjb25zdCBtYW5hZ2VkVXNlckZpbHRlckRpc2FibGVkID0gIW1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSB8fCAhY2FuTWFuYWdlT3RoZXJVc2VycztcbiAgY29uc3QgbWFuYWdlZFVzZXJBbGxMYWJlbCA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Vc2VyX0FsbFwiLCBcIkFsbFwiKTtcbiAgY29uc3QgbWFuYWdlZFVzZXJBbGxPcHRpb24gPSB1c2VNZW1vKFxuICAgICgpID0+XG4gICAgICBjYW5NYW5hZ2VPdGhlclVzZXJzXG4gICAgICAgID8ge1xuICAgICAgICAgICAgdmFsdWU6IEVYUEVOU0VfU0hFRVRTX0FMTF9VU0VSU19WQUxVRSxcbiAgICAgICAgICAgIHRleHQ6IG1hbmFnZWRVc2VyQWxsTGFiZWwsXG4gICAgICAgICAgfVxuICAgICAgICA6IG51bGwsXG4gICAgW2Nhbk1hbmFnZU90aGVyVXNlcnMsIG1hbmFnZWRVc2VyQWxsTGFiZWxdXG4gICk7XG4gIGNvbnN0IG1hbmFnZWRVc2VyTGFiZWxCeUlkID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgICBtYW5hZ2VkVXNlcnMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGlkID0gc2FmZVRleHQoZW50cnkuYXhVc2VySWQpO1xuICAgICAgaWYgKCFpZCkgcmV0dXJuO1xuICAgICAgY29uc3QgbmFtZSA9IHNhZmVUZXh0KGVudHJ5Lm5hbWUpO1xuICAgICAgbWFwLnNldChpZC50b1VwcGVyQ2FzZSgpLCBuYW1lIHx8IGlkKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbWFwO1xuICB9LCBbbWFuYWdlZFVzZXJzXSk7XG5cbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxuICAgIH0pLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3Qge1xuICAgIGl0ZW1zLFxuICAgIHRvdGFsLFxuICAgIGN1cnJlbnRQYWdlLFxuICAgIGlzTG9hZGluZyxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgbG9hZExpc3QsXG4gICAgcmVzdG9yZUxpc3RTbmFwc2hvdCxcbiAgICByZXNldExpc3QsXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXRzTGlzdERhdGEoe1xuICAgIGhhc0FjY2VzcyxcbiAgICBwYWdlU2l6ZTogUEFHRV9TSVpFLFxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxuICB9KTtcblxuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgY29uc3VtZVJldHVybkZsYWcsIHNhdmVDYWNoZWRTdGF0ZSwgY2xlYXJDYWNoZWRTdGF0ZSB9ID0gdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlKCk7XG4gIGNvbnN0IGRpZFJlc3RvcmVPbk1vdW50UmVmID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYgPSBSZWFjdC51c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHBlbmRpbmdBdXRvbWF0aWNMb2FkVGltZXJSZWYgPSBSZWFjdC51c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3Qge1xuICAgIGZyb21EYXRlLFxuICAgIHRvRGF0ZSxcbiAgICBwcm9qZWN0SWQsXG4gICAgaG9qYUdhc3Rvc0lkLFxuICAgIGN1cnJlbmN5Q29kZSxcbiAgICBtYW5hZ2VkVXNlcklkLFxuICAgIGluY2x1ZGVTdWJvcmRpbmF0ZXMsXG4gICAgc3RhdHVzRmlsdGVyLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxuICAgIGFwcGxpZWRGaWx0ZXJzLFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIGN1cnJlbnRGaWx0ZXJzLFxuICAgIHNldFByb2plY3RJZCxcbiAgICBzZXRIb2phR2FzdG9zSWQsXG4gICAgc2V0Q3VycmVuY3lDb2RlLFxuICAgIHNldE1hbmFnZWRVc2VySWQsXG4gICAgc2V0SW5jbHVkZVN1Ym9yZGluYXRlcyxcbiAgICBzZXRTdGF0dXNGaWx0ZXIsXG4gICAgb25BcHBseSxcbiAgICBvbkNsZWFyLFxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcbiAgICBvbkRhdGVSYW5nZUNoYW5nZSxcbiAgICBvbk1hbnVhbFJhbmdlQ29tcGxldGUsXG4gICAgb25RdWlja0ZpbHRlckNoYW5nZSxcbiAgICB0b2dnbGVGaWx0ZXJQYW5lbCxcbiAgfSA9IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJzU3RhdGUoe1xuICAgIG9uQXBwbHlGaWx0ZXJzOiAoc25hcHNob3QpID0+IHtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRTbmFwc2hvdCA9IG5vcm1hbGl6ZU1hbmFnZWRVc2VyU25hcHNob3RGb3JMb2FkKHNuYXBzaG90KTtcbiAgICAgIGlmIChub3JtYWxpemVkU25hcHNob3QubWFuYWdlZFVzZXJJZCkge1xuICAgICAgICBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKG5vcm1hbGl6ZWRTbmFwc2hvdC5tYW5hZ2VkVXNlcklkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xuICAgICAgfVxuICAgICAgdm9pZCBsb2FkTGlzdCgxLCBub3JtYWxpemVkU25hcHNob3QpO1xuICAgIH0sXG4gICAgb25DbGVhckZpbHRlcnM6ICgpID0+IHtcbiAgICAgIHNldE1hbmFnZWRVc2VySWQoZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICAgICAgc2V0SW5jbHVkZVN1Ym9yZGluYXRlcyhmYWxzZSk7XG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgICBjbGVhckV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUoKTtcbiAgICAgIHJlc2V0TGlzdCgpO1xuICAgIH0sXG4gICAgZGVmYXVsdE1hbmFnZWRVc2VySWQsXG4gIH0pO1xuXG4gIGNvbnN0IG5vcm1hbGl6ZU1hbmFnZWRVc2VyU25hcHNob3RGb3JMb2FkID0gdXNlQ2FsbGJhY2soXG4gICAgKHNuYXBzaG90OiB0eXBlb2YgY3VycmVudEZpbHRlcnMpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnNuYXBzaG90LFxuICAgICAgICAuLi5ub3JtYWxpemVFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTdGF0ZSh7XG4gICAgICAgICAgbWFuYWdlZFVzZXJJZDogc25hcHNob3QubWFuYWdlZFVzZXJJZCxcbiAgICAgICAgICBpbmNsdWRlU3Vib3JkaW5hdGVzOiBzbmFwc2hvdC5pbmNsdWRlU3Vib3JkaW5hdGVzLFxuICAgICAgICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICAgICAgICB1c2VyczogbWFuYWdlZFVzZXJzLFxuICAgICAgICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gICAgICAgIH0pLFxuICAgICAgfTtcbiAgICB9LFxuICAgIFtjYW5NYW5hZ2VPdGhlclVzZXJzLCBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vyc11cbiAgKTtcblxuICBjb25zdCBtYW5hZ2VkVXNlckZpbHRlclNlbGVjdFZhbHVlID0gdXNlTWVtbyhcbiAgICAoKSA9PlxuICAgICAgcmVzb2x2ZUV4cGVuc2VNYW5hZ2VkVXNlclNlbGVjdFZhbHVlKHtcbiAgICAgICAgbWFuYWdlZFVzZXJJZCxcbiAgICAgICAgaW5jbHVkZVN1Ym9yZGluYXRlcyxcbiAgICAgICAgY3VycmVudEF4VXNlcklkLFxuICAgICAgICB1c2VyczogbWFuYWdlZFVzZXJzLFxuICAgICAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICAgICAgfSksXG4gICAgW2Nhbk1hbmFnZU90aGVyVXNlcnMsIGN1cnJlbnRBeFVzZXJJZCwgaW5jbHVkZVN1Ym9yZGluYXRlcywgbWFuYWdlZFVzZXJJZCwgbWFuYWdlZFVzZXJzXVxuICApO1xuICBjb25zdCBub3JtYWxpemVkQ3VycmVudE1hbmFnZWRVc2VyRmlsdGVycyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gbm9ybWFsaXplTWFuYWdlZFVzZXJTbmFwc2hvdEZvckxvYWQoY3VycmVudEZpbHRlcnMpLFxuICAgIFtjdXJyZW50RmlsdGVycywgbm9ybWFsaXplTWFuYWdlZFVzZXJTbmFwc2hvdEZvckxvYWRdXG4gICk7XG5cbiAgLy8gS2VlcHMgcmV0dXJuLXRvLWxpc3QgZmxvd3MgY29uc2lzdGVudCBieSBhbHdheXMgcmUtcnVubmluZyB0aGUgbGl2ZSBxdWVyeS5cbiAgY29uc3QgcnVuQXV0b21hdGljTGlzdExvYWQgPSB1c2VDYWxsYmFjayhcbiAgICAoXG4gICAgICBwYWdlOiBudW1iZXIsXG4gICAgICBzbmFwc2hvdDogdHlwZW9mIGN1cnJlbnRGaWx0ZXJzLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICByZXNldEJlZm9yZUxvYWQ/OiBib29sZWFuO1xuICAgICAgfSA9IHt9XG4gICAgKSA9PiB7XG4gICAgICBpZiAocGVuZGluZ0F1dG9tYXRpY0xvYWRUaW1lclJlZi5jdXJyZW50ICE9IG51bGwpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChwZW5kaW5nQXV0b21hdGljTG9hZFRpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgfVxuXG4gICAgICBwZW5kaW5nQXV0b21hdGljTG9hZFRpbWVyUmVmLmN1cnJlbnQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHBlbmRpbmdBdXRvbWF0aWNMb2FkVGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgIGlmIChvcHRpb25zLnJlc2V0QmVmb3JlTG9hZCkge1xuICAgICAgICAgIHJlc2V0TGlzdCgpO1xuICAgICAgICB9XG4gICAgICAgIHZvaWQgbG9hZExpc3QocGFnZSwgc25hcHNob3QpO1xuICAgICAgfSwgMCk7XG4gICAgfSxcbiAgICBbbG9hZExpc3QsIHJlc2V0TGlzdF1cbiAgKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAocGVuZGluZ0F1dG9tYXRpY0xvYWRUaW1lclJlZi5jdXJyZW50ICE9IG51bGwpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChwZW5kaW5nQXV0b21hdGljTG9hZFRpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgICBwZW5kaW5nQXV0b21hdGljTG9hZFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVNYW5hZ2VkVXNlcklkQ2hhbmdlID0gdXNlQ2FsbGJhY2soXG4gICAgKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWROZXh0RmlsdGVyID0gbm9ybWFsaXplRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyQ2hhbmdlKHtcbiAgICAgICAgcmVxdWVzdGVkVmFsdWU6IHZhbHVlLFxuICAgICAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgICAgIHVzZXJzOiBtYW5hZ2VkVXNlcnMsXG4gICAgICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50RmlsdGVyID0gbm9ybWFsaXplRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU3RhdGUoe1xuICAgICAgICBtYW5hZ2VkVXNlcklkLFxuICAgICAgICBpbmNsdWRlU3Vib3JkaW5hdGVzLFxuICAgICAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgICAgIHVzZXJzOiBtYW5hZ2VkVXNlcnMsXG4gICAgICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRSZXF1ZXN0ZWRWYWx1ZSA9IHNhZmVUZXh0KHZhbHVlKTtcbiAgICAgIGNvbnN0IGlzUmV0dXJuaW5nVG9DdXJyZW50VXNlciA9XG4gICAgICAgIG5vcm1hbGl6ZWRSZXF1ZXN0ZWRWYWx1ZSA9PT0gXCJcIiAmJlxuICAgICAgICAhbm9ybWFsaXplZE5leHRGaWx0ZXIuaW5jbHVkZVN1Ym9yZGluYXRlcyAmJlxuICAgICAgICBpc1NhbWVFeHBlbnNlTWFuYWdlZFVzZXIobm9ybWFsaXplZE5leHRGaWx0ZXIubWFuYWdlZFVzZXJJZCwgZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICAgICAgY29uc3Qgd2FzVXNpbmdOb25EZWZhdWx0U2VsZWN0aW9uID1cbiAgICAgICAgbm9ybWFsaXplZEN1cnJlbnRGaWx0ZXIuaW5jbHVkZVN1Ym9yZGluYXRlcyB8fFxuICAgICAgICAhaXNTYW1lRXhwZW5zZU1hbmFnZWRVc2VyKG5vcm1hbGl6ZWRDdXJyZW50RmlsdGVyLm1hbmFnZWRVc2VySWQsIGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcblxuICAgICAgc2V0TWFuYWdlZFVzZXJJZChub3JtYWxpemVkTmV4dEZpbHRlci5tYW5hZ2VkVXNlcklkKTtcbiAgICAgIHNldEluY2x1ZGVTdWJvcmRpbmF0ZXMobm9ybWFsaXplZE5leHRGaWx0ZXIuaW5jbHVkZVN1Ym9yZGluYXRlcyk7XG4gICAgICBzZXRIb2phR2FzdG9zSWQoXCJcIik7XG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG5cbiAgICAgIGlmICghd2FzVXNpbmdOb25EZWZhdWx0U2VsZWN0aW9uIHx8ICFpc1JldHVybmluZ1RvQ3VycmVudFVzZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXh0U25hcHNob3QgPSBub3JtYWxpemVNYW5hZ2VkVXNlclNuYXBzaG90Rm9yTG9hZCh7XG4gICAgICAgIC4uLihhcHBsaWVkRmlsdGVycyB8fCBjdXJyZW50RmlsdGVycyksXG4gICAgICAgIGhvamFHYXN0b3NJZDogXCJcIixcbiAgICAgICAgLi4ubm9ybWFsaXplZE5leHRGaWx0ZXIsXG4gICAgICB9KTtcbiAgICAgIGlmIChuZXh0U25hcHNob3QubWFuYWdlZFVzZXJJZCkge1xuICAgICAgICBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKG5leHRTbmFwc2hvdC5tYW5hZ2VkVXNlcklkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xuICAgICAgfVxuICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKG5leHRTbmFwc2hvdCk7XG4gICAgICBydW5BdXRvbWF0aWNMaXN0TG9hZCgxLCBuZXh0U25hcHNob3QpO1xuICAgIH0sXG4gICAgW1xuICAgICAgYXBwbGllZEZpbHRlcnMsXG4gICAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSxcbiAgICAgIGN1cnJlbnRGaWx0ZXJzLFxuICAgICAgY3VycmVudEF4VXNlcklkLFxuICAgICAgZGVmYXVsdE1hbmFnZWRVc2VySWQsXG4gICAgICBpbmNsdWRlU3Vib3JkaW5hdGVzLFxuICAgICAgbG9hZExpc3QsXG4gICAgICBtYW5hZ2VkVXNlcklkLFxuICAgICAgbWFuYWdlZFVzZXJzLFxuICAgICAgbm9ybWFsaXplTWFuYWdlZFVzZXJTbmFwc2hvdEZvckxvYWQsXG4gICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMsXG4gICAgICBydW5BdXRvbWF0aWNMaXN0TG9hZCxcbiAgICAgIHNldEluY2x1ZGVTdWJvcmRpbmF0ZXMsXG4gICAgICBzZXRIb2phR2FzdG9zSWQsXG4gICAgICBzZXRNYW5hZ2VkVXNlcklkLFxuICAgIF1cbiAgKTtcblxuICBjb25zdCBnb1RvRGV0YWlsID0gdXNlQ2FsbGJhY2soXG4gICAgKHNoZWV0SWQ6IHN0cmluZywgb3duZXJVc2VySWQ6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKCFzaGVldElkKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRTbmFwc2hvdCA9IG5vcm1hbGl6ZU1hbmFnZWRVc2VyU25hcHNob3RGb3JMb2FkKGFwcGxpZWRGaWx0ZXJzIHx8IGN1cnJlbnRGaWx0ZXJzKTtcbiAgICAgIGNvbnN0IGRldGFpbE93bmVyVXNlcklkID0gbm9ybWFsaXplZFNuYXBzaG90LmluY2x1ZGVTdWJvcmRpbmF0ZXNcbiAgICAgICAgPyAoc2FmZVRleHQob3duZXJVc2VySWQpIHx8IG5vcm1hbGl6ZWRTbmFwc2hvdC5tYW5hZ2VkVXNlcklkKVxuICAgICAgICA6IG5vcm1hbGl6ZWRTbmFwc2hvdC5tYW5hZ2VkVXNlcklkO1xuICAgICAgaWYgKGRldGFpbE93bmVyVXNlcklkKSB7XG4gICAgICAgIHNldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUoZGV0YWlsT3duZXJVc2VySWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKCk7XG4gICAgICB9XG4gICAgICBzYXZlQ2FjaGVkU3RhdGUoe1xuICAgICAgICBmaWx0ZXJzOiBub3JtYWxpemVkU25hcHNob3QsXG4gICAgICAgIHBhZ2U6IGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSxcbiAgICAgICAgc2Nyb2xsWTogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5zY3JvbGxZIHx8IDAgOiAwLFxuICAgICAgICBpdGVtcyxcbiAgICAgICAgdG90YWwsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgaWQgPSBlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCk7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7aWR9YCwge1xuICAgICAgICBieXBhc3NHdWFyZE9uY2U6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbYXBwbGllZEZpbHRlcnMsIGN1cnJlbnRGaWx0ZXJzLCBjdXJyZW50UGFnZSwgaXRlbXMsIG5vcm1hbGl6ZU1hbmFnZWRVc2VyU25hcHNob3RGb3JMb2FkLCBzYXZlQ2FjaGVkU3RhdGUsIHRvdGFsXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZU9wZW5DcmVhdGVTaGVldE1vZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlKSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9tb2RlPWNyZWF0ZVwiLCB7XG4gICAgICBieXBhc3NHdWFyZE9uY2U6IGZhbHNlLFxuICAgIH0pO1xuICB9LCBbY2FuQ3JlYXRlRXhwZW5zZV0pO1xuXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xuICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCF0aW1lbGluZUNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNhcmQ7XG4gIH0sIFtdKTtcblxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcbiAgICBjb250YWluZXJSZWY6IHRpbWVsaW5lQ29udGFpbmVyUmVmLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBpdGVtcyxcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcbiAgfSk7XG5cbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCgodG90YWwgfHwgMCkgLyBQQUdFX1NJWkUpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeShcImV4cGVuc2Utc2hlZXRzLWxpc3QtYWN0aW9uc1wiKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHN1bW1hcnlJdGVtcyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmICghYXBwbGllZEZpbHRlcnMpIHtcbiAgICAgIHJldHVybiBbXSBhcyBBcnJheTx7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0+O1xuICAgIH1cblxuICAgIGNvbnN0IHN1bW1hcnk6IEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfT4gPSBbXTtcbiAgICBjb25zdCBsb2NhbGUgPSBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIjtcbiAgICBjb25zdCBmcm9tRGF0ZVRleHQgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoYXBwbGllZEZpbHRlcnMuZnJvbURhdGUsIGxvY2FsZSwgXCJcIik7XG4gICAgY29uc3QgdG9EYXRlVGV4dCA9IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShhcHBsaWVkRmlsdGVycy50b0RhdGUsIGxvY2FsZSwgXCJcIik7XG5cbiAgICBpZiAoZnJvbURhdGVUZXh0IHx8IHRvRGF0ZVRleHQpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJmcm9tRGF0ZVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIiksXG4gICAgICAgIHZhbHVlOiBmcm9tRGF0ZVRleHQgfHwgXCItLVwiLFxuICAgICAgfSk7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwidG9EYXRlXCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpLFxuICAgICAgICB2YWx1ZTogdG9EYXRlVGV4dCB8fCBcIi0tXCIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoYXBwbGllZEZpbHRlcnMucHJvamVjdElkLnRyaW0oKSkge1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcInByb2plY3RcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKSxcbiAgICAgICAgdmFsdWU6IGFwcGxpZWRGaWx0ZXJzLnByb2plY3RJZC50cmltKCksXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGFwcGxpZWRGaWx0ZXJzLmhvamFHYXN0b3NJZC50cmltKCkpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJzaGVldFwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1NoZWV0XCIsIFwiRXhwZW5zZSBzaGVldFwiKSxcbiAgICAgICAgdmFsdWU6IGFwcGxpZWRGaWx0ZXJzLmhvamFHYXN0b3NJZC50cmltKCksXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGFwcGxpZWRGaWx0ZXJzLmN1cnJlbmN5Q29kZS50cmltKCkpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJjdXJyZW5jeVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIiksXG4gICAgICAgIHZhbHVlOiBhcHBsaWVkRmlsdGVycy5jdXJyZW5jeUNvZGUudHJpbSgpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlckZpbHRlcnMgPSBub3JtYWxpemVNYW5hZ2VkVXNlclNuYXBzaG90Rm9yTG9hZChhcHBsaWVkRmlsdGVycyk7XG4gICAgaWYgKFxuICAgICAgc2hvdWxkU2hvd0V4cGVuc2VNYW5hZ2VkVXNlclN1bW1hcnkoe1xuICAgICAgICBtYW5hZ2VkVXNlcklkOiBub3JtYWxpemVkTWFuYWdlZFVzZXJGaWx0ZXJzLm1hbmFnZWRVc2VySWQsXG4gICAgICAgIGluY2x1ZGVTdWJvcmRpbmF0ZXM6IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlckZpbHRlcnMuaW5jbHVkZVN1Ym9yZGluYXRlcyxcbiAgICAgICAgY3VycmVudEF4VXNlcklkLFxuICAgICAgfSlcbiAgICApIHtcbiAgICAgIGNvbnN0IG1hbmFnZWRVc2VyTGFiZWwgPSBub3JtYWxpemVkTWFuYWdlZFVzZXJGaWx0ZXJzLmluY2x1ZGVTdWJvcmRpbmF0ZXNcbiAgICAgICAgPyBtYW5hZ2VkVXNlckFsbExhYmVsXG4gICAgICAgIDogbWFuYWdlZFVzZXJMYWJlbEJ5SWQuZ2V0KG5vcm1hbGl6ZWRNYW5hZ2VkVXNlckZpbHRlcnMubWFuYWdlZFVzZXJJZC50b1VwcGVyQ2FzZSgpKSB8fFxuICAgICAgICAgIG5vcm1hbGl6ZWRNYW5hZ2VkVXNlckZpbHRlcnMubWFuYWdlZFVzZXJJZDtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJtYW5hZ2VkLXVzZXJcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Vc2VyXCIsIFwiVXNlclwiKSxcbiAgICAgICAgdmFsdWU6IG1hbmFnZWRVc2VyTGFiZWwsXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGFwcGxpZWRGaWx0ZXJzLnN0YXR1c0ZpbHRlciAhPT0gREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJzdGF0dXNcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNcIiwgXCJFc3RhZG9cIiksXG4gICAgICAgIHZhbHVlOiBnZXRFeHBlbnNlU3RhdHVzTGFiZWwoYXBwbGllZEZpbHRlcnMuc3RhdHVzRmlsdGVyKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzdW1tYXJ5O1xuICB9LCBbYXBwbGllZEZpbHRlcnMsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJBbGxMYWJlbCwgbWFuYWdlZFVzZXJMYWJlbEJ5SWQsIG5vcm1hbGl6ZU1hbmFnZWRVc2VyU25hcHNob3RGb3JMb2FkXSk7XG5cbiAgY29uc3Qgc2hvd1N1bW1hcnkgPSAhc2hvd0ZpbHRlcnMgJiYgc3VtbWFyeUl0ZW1zLmxlbmd0aCA+IDA7XG4gIGNvbnN0IGFjdGl2ZUxpc3RGaWx0ZXJzID0gYXBwbGllZEZpbHRlcnMgfHwgY3VycmVudEZpbHRlcnM7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIW1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSB8fCAhaGFzQWNjZXNzKSByZXR1cm47XG4gICAgaWYgKGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBkaWRSZXN0b3JlT25Nb3VudFJlZi5jdXJyZW50ID0gdHJ1ZTtcblxuICAgIGNvbnN0IGlzSGlzdG9yeUJhY2tGb3J3YXJkID0gaXNFeHBlbnNlSGlzdG9yeUJhY2tGb3J3YXJkTmF2aWdhdGlvbigpO1xuICAgIGNvbnN0IGlzUmV0dXJuRnJvbUV4cGVuc2VEZXRhaWwgPSBoYXNFeHBlbnNlUmV0dXJuUmVmZXJyZXIoW1xuICAgICAgXCIvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbFwiLFxuICAgICAgXCIvR2FzdG9zL0V4cGVuc2VMaW5lRGV0YWlsXCIsXG4gICAgXSk7XG4gICAgaWYgKCFjb25zdW1lUmV0dXJuRmxhZygpICYmICFpc0hpc3RvcnlCYWNrRm9yd2FyZCAmJiAhaXNSZXR1cm5Gcm9tRXhwZW5zZURldGFpbCkge1xuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuICAgICAgc2V0TWFuYWdlZFVzZXJJZChkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XG4gICAgICBzZXRJbmNsdWRlU3Vib3JkaW5hdGVzKGZhbHNlKTtcbiAgICAgIGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNhY2hlZFN0YXRlID0gcmVhZENhY2hlZFN0YXRlKCk7XG4gICAgaWYgKCFjYWNoZWRTdGF0ZSkge1xuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuICAgICAgc2V0TWFuYWdlZFVzZXJJZChkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XG4gICAgICBzZXRJbmNsdWRlU3Vib3JkaW5hdGVzKGZhbHNlKTtcbiAgICAgIGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3RvcmVkRmlsdGVycyA9IHtcbiAgICAgIC4uLmNhY2hlZFN0YXRlLmZpbHRlcnMsXG4gICAgICAuLi5ub3JtYWxpemVNYW5hZ2VkVXNlclNuYXBzaG90Rm9yTG9hZChjYWNoZWRTdGF0ZS5maWx0ZXJzKSxcbiAgICB9O1xuICAgIGlmIChyZXN0b3JlZEZpbHRlcnMubWFuYWdlZFVzZXJJZCkge1xuICAgICAgc2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZShyZXN0b3JlZEZpbHRlcnMubWFuYWdlZFVzZXJJZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xuICAgIH1cblxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhyZXN0b3JlZEZpbHRlcnMpO1xuICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBjYWNoZWRTdGF0ZS5zY3JvbGxZO1xuICAgIGlmIChjYWNoZWRTdGF0ZS5pdGVtcy5sZW5ndGggPiAwIHx8IGNhY2hlZFN0YXRlLnRvdGFsID4gMCkge1xuICAgICAgcmVzdG9yZUxpc3RTbmFwc2hvdCh7XG4gICAgICAgIGl0ZW1zOiBjYWNoZWRTdGF0ZS5pdGVtcyxcbiAgICAgICAgdG90YWw6IGNhY2hlZFN0YXRlLnRvdGFsLFxuICAgICAgICBwYWdlOiBjYWNoZWRTdGF0ZS5wYWdlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkKGNhY2hlZFN0YXRlLnBhZ2UsIHJlc3RvcmVkRmlsdGVycyk7XG4gIH0sIFtcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIGRlZmF1bHRNYW5hZ2VkVXNlcklkLFxuICAgIGhhc0FjY2VzcyxcbiAgICBsb2FkTGlzdCxcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXG4gICAgbm9ybWFsaXplTWFuYWdlZFVzZXJTbmFwc2hvdEZvckxvYWQsXG4gICAgcmVhZENhY2hlZFN0YXRlLFxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcbiAgICByZXN0b3JlTGlzdFNuYXBzaG90LFxuICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkLFxuICAgIHNldEluY2x1ZGVTdWJvcmRpbmF0ZXMsXG4gICAgc2V0TWFuYWdlZFVzZXJJZCxcbiAgXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMb2FkaW5nKSByZXR1cm47XG4gICAgY29uc3QgcGVuZGluZ1Njcm9sbFkgPSBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50O1xuICAgIGlmIChwZW5kaW5nU2Nyb2xsWSA9PSBudWxsKSByZXR1cm47XG5cbiAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgIHRvcDogTWF0aC5tYXgoMCwgcGVuZGluZ1Njcm9sbFkpLFxuICAgICAgICBiZWhhdmlvcjogXCJhdXRvXCIsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSwgW2N1cnJlbnRQYWdlLCBpc0xvYWRpbmcsIGl0ZW1zLmxlbmd0aF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkgfHwgIWhhc0FjY2VzcykgcmV0dXJuO1xuXG4gICAgY29uc3QgaGFuZGxlUGFnZVNob3cgPSAoZXZlbnQ6IFBhZ2VUcmFuc2l0aW9uRXZlbnQpID0+IHtcbiAgICAgIGlmICghZXZlbnQucGVyc2lzdGVkICYmICFpc0V4cGVuc2VIaXN0b3J5QmFja0ZvcndhcmROYXZpZ2F0aW9uKCkpIHJldHVybjtcblxuICAgICAgY29uc3Qgc25hcHNob3QgPSBub3JtYWxpemVNYW5hZ2VkVXNlclNuYXBzaG90Rm9yTG9hZChhcHBsaWVkRmlsdGVycyB8fCBjdXJyZW50RmlsdGVycyk7XG4gICAgICBpZiAoc25hcHNob3QubWFuYWdlZFVzZXJJZCkge1xuICAgICAgICBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKHNuYXBzaG90Lm1hbmFnZWRVc2VySWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKCk7XG4gICAgICB9XG5cbiAgICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkKGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSwgc25hcHNob3QpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIGhhbmRsZVBhZ2VTaG93KTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBoYW5kbGVQYWdlU2hvdyk7XG4gICAgfTtcbiAgfSwgW1xuICAgIGFwcGxpZWRGaWx0ZXJzLFxuICAgIGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSxcbiAgICBjdXJyZW50RmlsdGVycyxcbiAgICBjdXJyZW50UGFnZSxcbiAgICBoYXNBY2Nlc3MsXG4gICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxuICAgIG5vcm1hbGl6ZU1hbmFnZWRVc2VyU25hcHNob3RGb3JMb2FkLFxuICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkLFxuICBdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG9uVG9nZ2xlRmlsdGVycyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHdpbGxPcGVuID0gIXNob3dGaWx0ZXJzO1xuICAgICAgdG9nZ2xlRmlsdGVyUGFuZWwoKTtcbiAgICAgIGlmICh3aWxsT3Blbikge1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oeyB0b3A6IDAsIGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvblJlZnJlc2ggPSAoKSA9PiB7XG4gICAgICBpZiAoIWFwcGxpZWRGaWx0ZXJzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdm9pZCBsb2FkTGlzdChjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsIG5vcm1hbGl6ZU1hbmFnZWRVc2VyU25hcHNob3RGb3JMb2FkKGFwcGxpZWRGaWx0ZXJzKSk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXhwZW5zZS1zaGVldHMtdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXhwZW5zZS1zaGVldHMtcmVmcmVzaFwiLCBvblJlZnJlc2gpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXhwZW5zZS1zaGVldHMtdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXNoZWV0cy1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XG4gICAgfTtcbiAgfSwgW2FwcGxpZWRGaWx0ZXJzLCBjdXJyZW50UGFnZSwgbG9hZExpc3QsIG5vcm1hbGl6ZU1hbmFnZWRVc2VyU25hcHNob3RGb3JMb2FkLCBzaG93RmlsdGVycywgdG9nZ2xlRmlsdGVyUGFuZWxdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICB7c2hvd1N1bW1hcnkgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLXN1bW1hcnkgcC0zIHNtOnAtNCBtdC0xIG1iLTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4cGVuc2Utc3VtbWFyeS1ncmlkIGdyaWQgZ3JpZC1jb2xzLTEgbWluLVszNjBweF06Z3JpZC1jb2xzLTIgaXRlbXMtc3RhcnQgZ2FwLXgtNCBnYXAteS0xIHRleHQteHNcIj5cbiAgICAgICAgICAgIHtzdW1tYXJ5SXRlbXMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e2Ake2l0ZW0ua2V5fS0ke2l0ZW0udmFsdWV9YH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BoaXN0b3J5LWZpbHRlci1zdW1tYXJ5IGhpc3RvcnktZmlsdGVyLXN1bW1hcnktLWdyaWQtaXRlbSBsZWFkaW5nLTUgbWluLXctMCAke2l0ZW0ua2V5ID09PSBcIm1hbmFnZWQtdXNlclwiID8gXCJtaW4tWzM2MHB4XTpjb2wtc3Bhbi0yXCIgOiBcIlwifWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdW1tYXJ5X19sYWJlbCBmb250LXNlbWlib2xkXCI+e2l0ZW0ubGFiZWx9Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BoaXN0b3J5LWZpbHRlci1zdW1tYXJ5X192YWx1ZSAke2l0ZW0ua2V5ID09PSBcIm1hbmFnZWQtdXNlclwiID8gXCJibG9jayB0cnVuY2F0ZSB3aGl0ZXNwYWNlLW5vd3JhcFwiIDogXCJicmVhay13b3Jkc1wifWB9PlxuICAgICAgICAgICAgICAgICAge2l0ZW0udmFsdWV9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICA8RXhwZW5zZUZpbHRlcnNQYW5lbFxuICAgICAgICB2aXNpYmxlPXtzaG93RmlsdGVyc31cbiAgICAgICAgc2hvd01hbnVhbERhdGVGaWx0ZXI9e3Nob3dNYW51YWxEYXRlRmlsdGVyfVxuICAgICAgICBzaG93TWFudWFsRGF0ZUVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yfVxuICAgICAgICBtYW51YWxEYXRlQXV0b09wZW5LZXk9e21hbnVhbERhdGVBdXRvT3BlbktleX1cbiAgICAgICAgZnJvbURhdGU9e2Zyb21EYXRlfVxuICAgICAgICB0b0RhdGU9e3RvRGF0ZX1cbiAgICAgICAgcHJvamVjdElkPXtwcm9qZWN0SWR9XG4gICAgICAgIGhvamFHYXN0b3NJZD17aG9qYUdhc3Rvc0lkfVxuICAgICAgICBjdXJyZW5jeUNvZGU9e2N1cnJlbmN5Q29kZX1cbiAgICAgICAgbWFuYWdlZFVzZXJJZD17bWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3RWYWx1ZX1cbiAgICAgICAgc2hlZXRMb29rdXBNYW5hZ2VkVXNlcklkPXtub3JtYWxpemVkQ3VycmVudE1hbmFnZWRVc2VyRmlsdGVycy5tYW5hZ2VkVXNlcklkfVxuICAgICAgICBpbmNsdWRlU3Vib3JkaW5hdGVzPXtpbmNsdWRlU3Vib3JkaW5hdGVzfVxuICAgICAgICBtYW5hZ2VkVXNlcnM9e21hbmFnZWRVc2Vyc31cbiAgICAgICAgc2hvd01hbmFnZWRVc2VyRmlsdGVyPXtzaG93TWFuYWdlZFVzZXJGaWx0ZXJ9XG4gICAgICAgIG1hbmFnZWRVc2VyRmlsdGVyRGlzYWJsZWQ9e21hbmFnZWRVc2VyRmlsdGVyRGlzYWJsZWR9XG4gICAgICAgIG1hbmFnZWRVc2VyQWxsT3B0aW9uPXttYW5hZ2VkVXNlckFsbE9wdGlvbn1cbiAgICAgICAgc3RhdHVzRmlsdGVyPXtzdGF0dXNGaWx0ZXJ9XG4gICAgICAgIGFjdGl2ZVF1aWNrRmlsdGVyPXthY3RpdmVRdWlja0ZpbHRlcn1cbiAgICAgICAgb25EYXRlUmFuZ2VDaGFuZ2U9e29uRGF0ZVJhbmdlQ2hhbmdlfVxuICAgICAgICBvbk1hbnVhbFJhbmdlQ29tcGxldGU9e29uTWFudWFsUmFuZ2VDb21wbGV0ZX1cbiAgICAgICAgb25RdWlja0ZpbHRlckNoYW5nZT17b25RdWlja0ZpbHRlckNoYW5nZX1cbiAgICAgICAgb25Qcm9qZWN0SWRDaGFuZ2U9e3NldFByb2plY3RJZH1cbiAgICAgICAgb25Ib2phR2FzdG9zSWRDaGFuZ2U9e3NldEhvamFHYXN0b3NJZH1cbiAgICAgICAgb25DdXJyZW5jeUNvZGVDaGFuZ2U9e3NldEN1cnJlbmN5Q29kZX1cbiAgICAgICAgb25NYW5hZ2VkVXNlcklkQ2hhbmdlPXtoYW5kbGVNYW5hZ2VkVXNlcklkQ2hhbmdlfVxuICAgICAgICBvblN0YXR1c0ZpbHRlckNoYW5nZT17c2V0U3RhdHVzRmlsdGVyfVxuICAgICAgICBvbkNsZWFyPXtvbkNsZWFyfVxuICAgICAgICBvbkFwcGx5PXtvbkFwcGx5fVxuICAgICAgLz5cblxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBpc0xvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XG4gICAgICA+XG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7ZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntlcnJvck1lc3NhZ2V9PC9kaXY+IDogbnVsbH1cblxuICAgICAgeyFpc0xvYWRpbmcgJiYgIWVycm9yTWVzc2FnZSAmJiBpdGVtcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtYm94IHRpbWVsaW5lLWVtcHR5XCIgZGF0YS1lbXB0eS10ZXh0PXtpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIil9IC8+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgeyFlcnJvck1lc3NhZ2UgJiYgaXRlbXMubGVuZ3RoID4gMCA/IChcbiAgICAgICAgPGRpdiByZWY9e3RpbWVsaW5lQ29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cbiAgICAgICAgICB7aXRlbXMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IHNhZmVUZXh0KGl0ZW0uaG9qYUdhc3Rvc0lkKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVQYXJ0cyA9IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMoXG4gICAgICAgICAgICAgIGl0ZW0uY3JlYXRlZERhdGUsXG4gICAgICAgICAgICAgIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiLFxuICAgICAgICAgICAgICB7IHByZWZlck1vbnRoRmlyc3RPblNsYXNoOiB0cnVlIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW5jeSA9IHNhZmVUZXh0KGl0ZW0uY3VycmVuY3lDb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gc2FmZVRleHQoaXRlbS5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBjb25zdCB2b3VjaGVyID0gc2FmZVRleHQoaXRlbS52b3VjaGVyKTtcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsQW1vdW50VGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShpdGVtLnRvdGFsQW1vdW50ID8/IG51bGwsIGN1cnJlbmN5KTtcbiAgICAgICAgICAgIGNvbnN0IGZhbGxiYWNrU3RhdHVzQ29kZSA9IGhhc0Fzc2lnbmVkVm91Y2hlcih2b3VjaGVyKSA/IDQgOiAwO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzQ29kZSA9IG5vcm1hbGl6ZUV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlKGl0ZW0uZXhwZW5zZVNoZWV0U3RhdHVzLCBmYWxsYmFja1N0YXR1c0NvZGUpO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzTGFiZWwgPSBnZXRFeHBlbnNlU3RhdHVzTGFiZWwoc3RhdHVzQ29kZSk7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNDbGFzcyA9IGdldEV4cGVuc2VTdGF0dXNCYWRnZUNsYXNzTmFtZShzdGF0dXNDb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IG93bmVySWQgPSBzYWZlVGV4dChpdGVtLnVzZXJJZCk7XG4gICAgICAgICAgICBjb25zdCBvd25lck5hbWUgPSBzYWZlVGV4dChpdGVtLnVzZXJOYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IHNob3dPd25lclN1YnRpdGxlID0gYWN0aXZlTGlzdEZpbHRlcnMuaW5jbHVkZVN1Ym9yZGluYXRlcyA9PT0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IG93bmVyU3VidGl0bGUgPSBzaG93T3duZXJTdWJ0aXRsZSAmJiBvd25lcklkXG4gICAgICAgICAgICAgID8gKG93bmVyTmFtZSA/IGAke293bmVyTmFtZX0gKCR7b3duZXJJZH0pYCA6IG93bmVySWQpXG4gICAgICAgICAgICAgIDogXCJcIjtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2lkIHx8IGAke293bmVySWR9LSR7dm91Y2hlcn0tJHtpdGVtLmNyZWF0ZWREYXRlfWB9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17ZGVzY3JpcHRpb24gfHwgXCItXCJ9XG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZT17b3duZXJTdWJ0aXRsZX1cbiAgICAgICAgICAgICAgICAgIGFtb3VudFRleHQ9e3RvdGFsQW1vdW50VGV4dH1cbiAgICAgICAgICAgICAgICAgIG9uT3Blbj17KCkgPT4gZ29Ub0RldGFpbChpZCwgb3duZXJJZCl9XG4gICAgICAgICAgICAgICAgICB0aXRsZUNsYXNzTmFtZT1cImV4cGVuc2Utc2hlZXQtY2FyZF9fdGl0bGUgdGltZWxpbmUtbmFtZVwiXG4gICAgICAgICAgICAgICAgICBzdGF0dXNDbGFzc05hbWU9e3N0YXR1c0NsYXNzfVxuICAgICAgICAgICAgICAgICAgc3RhdHVzTGFiZWw9e3N0YXR1c0xhYmVsfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXG4gICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsUGFnZXN9XG4gICAgICAgIGN1cnJlbnRQYWdlPXtjdXJyZW50UGFnZX1cbiAgICAgICAgbG9hZGluZz17aXNMb2FkaW5nfVxuICAgICAgICBvblBhZ2VDaGFuZ2U9eyhwYWdlKSA9PiB7XG4gICAgICAgICAgdm9pZCBsb2FkTGlzdChwYWdlLCBub3JtYWxpemVNYW5hZ2VkVXNlclNuYXBzaG90Rm9yTG9hZChhcHBsaWVkRmlsdGVycyB8fCBjdXJyZW50RmlsdGVycykpO1xuICAgICAgICB9fVxuICAgICAgICBsYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XG4gICAgICAvPlxuXG4gICAgICB7Y2FuQ3JlYXRlRXhwZW5zZSA/IChcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXG4gICAgICAgICAgcm91dGU9XCJcIlxuICAgICAgICAgIGFyaWFMYWJlbD17aW5kVChcIkNvbW1vbl9DcmVhdGVcIiwgXCJDcmVhdGVcIil9XG4gICAgICAgICAgc2l6ZT17NzZ9XG4gICAgICAgICAgcmlnaHQ9ezE2fVxuICAgICAgICAgIGJvdHRvbT17MjR9XG4gICAgICAgICAgb25DbGljaz17aGFuZGxlT3BlbkNyZWF0ZVNoZWV0TW9kZX1cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gTWFpbiBwYWdlIGVudHJ5IGZvciBleHBlbnNlIHNoZWV0cyBsaXN0LlxuY29uc3QgRXhwZW5zZVNoZWV0c1BhZ2UgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzIGVuYWJsZUV4cGVuc2VNYW5hZ2VtZW50PlxuICAgICAgPEV4cGVuc2VTaGVldHNQYWdlQ29udGVudCAvPlxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XG4gICk7XG59O1xuXG5jb25zdCBtb3VudCA9ICgpID0+IHtcbiAgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGgoKTtcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBlbnNlLXNoZWV0cy1yb290XCIpO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VTaGVldHNQYWdlIC8+KTtcbn07XG5cbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXRzUGFnZTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZW1vdGVTZWFyY2hDb21ib2JveCwgeyB0eXBlIFJlbW90ZVNlYXJjaE9wdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUmVtb3RlU2VhcmNoQ29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8gfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBidWlsZEV4cGVuc2VTaGVldFN1Z2dlc3RQYXlsb2FkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VQYXlsb2FkQnVpbGRlcnMudHNcIjtcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0TGlzdCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVNoZWV0RmlsdGVySW5wdXRQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgbWFuYWdlZFVzZXJJZD86IHN0cmluZztcbiAgaW5jbHVkZVN1Ym9yZGluYXRlcz86IGJvb2xlYW47XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbn07XG5cbmNvbnN0IFNFQVJDSF9QQUdFX1NJWkUgPSAyMDtcblxuY29uc3QgZm9ybWF0U2hlZXRPcHRpb25UaXRsZSA9IChzaGVldElkOiBzdHJpbmcsIG93bmVyVXNlcklkOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAoIW93bmVyVXNlcklkKSByZXR1cm4gc2hlZXRJZDtcbiAgcmV0dXJuIGAke3NoZWV0SWR9ICgke293bmVyVXNlcklkfSlgO1xufTtcblxuY29uc3QgbWFwU2hlZXRPcHRpb25zID0gKGl0ZW1zOiBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0b1tdIHwgdW5kZWZpbmVkKTogUmVtb3RlU2VhcmNoT3B0aW9uW10gPT4ge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkoaXRlbXMpID8gaXRlbXMgOiBbXSlcbiAgICAubWFwKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBpZCA9IFN0cmluZyhpdGVtPy5Ib2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpO1xuICAgICAgY29uc3Qgb3duZXJVc2VySWQgPSBTdHJpbmcoaXRlbT8uVXNlcklkIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGlmICghaWQpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IGlkLFxuICAgICAgICB0aXRsZTogZm9ybWF0U2hlZXRPcHRpb25UaXRsZShpZCwgb3duZXJVc2VySWQpLFxuICAgICAgICBzdWJ0aXRsZTogU3RyaW5nKGl0ZW0/LkRlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKSB8fCBcIi1cIixcbiAgICAgIH0gYXMgUmVtb3RlU2VhcmNoT3B0aW9uO1xuICAgIH0pXG4gICAgLmZpbHRlcihCb29sZWFuKSBhcyBSZW1vdGVTZWFyY2hPcHRpb25bXTtcbn07XG5cbi8vIEV4cGVuc2Ugc2hlZXQgZmlsdGVyIGlucHV0IHdpdGggcmVtb3RlIGxpc3Qgc3VnZ2VzdGlvbnMuXG5jb25zdCBFeHBlbnNlU2hlZXRGaWx0ZXJJbnB1dCA9ICh7XG4gIGxhYmVsLFxuICBwbGFjZWhvbGRlcixcbiAgdmFsdWUsXG4gIG1hbmFnZWRVc2VySWQgPSBcIlwiLFxuICBpbmNsdWRlU3Vib3JkaW5hdGVzID0gZmFsc2UsXG4gIG9uQ2hhbmdlLFxuICBlbmFibGVSZW1vdGVTdWdnZXN0aW9ucyA9IHRydWUsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG59OiBFeHBlbnNlU2hlZXRGaWx0ZXJJbnB1dFByb3BzKSA9PiB7XG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xuICBjb25zdCBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCA9IFN0cmluZyhtYW5hZ2VkVXNlcklkIHx8IFwiXCIpLnRyaW0oKTtcblxuICBjb25zdCBsb2FkT3B0aW9ucyA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHNpZ25hbDogQWJvcnRTaWduYWwpOiBQcm9taXNlPFJlbW90ZVNlYXJjaE9wdGlvbltdPiA9PiB7XG4gICAgY29uc3QgcGF5bG9hZCA9IGJ1aWxkRXhwZW5zZVNoZWV0U3VnZ2VzdFBheWxvYWQodGVybSwgU0VBUkNIX1BBR0VfU0laRSwgMSwgaW5jbHVkZVN1Ym9yZGluYXRlcyk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldExpc3QocGF5bG9hZCwge1xuICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICBheFVzZXJJZE92ZXJyaWRlOiBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCB8fCB1bmRlZmluZWQsXG4gICAgICBzaWduYWwsXG4gICAgfSk7XG5cbiAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcFNoZWV0T3B0aW9ucyhyZXNwb25zZT8uSXRlbXMpO1xuICB9LCBbaW5jbHVkZVN1Ym9yZGluYXRlcywgbm9ybWFsaXplZE1hbmFnZWRVc2VySWRdKTtcblxuICBjb25zdCBsb2FkT3B0aW9uc1BhZ2UgPSB1c2VDYWxsYmFjayhhc3luYyAodGVybTogc3RyaW5nLCBwYWdlOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIsIHNpZ25hbDogQWJvcnRTaWduYWwpID0+IHtcbiAgICBjb25zdCBwYXlsb2FkID0gYnVpbGRFeHBlbnNlU2hlZXRTdWdnZXN0UGF5bG9hZCh0ZXJtLCBwYWdlU2l6ZSwgcGFnZSwgaW5jbHVkZVN1Ym9yZGluYXRlcyk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldExpc3QocGF5bG9hZCwge1xuICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICBheFVzZXJJZE92ZXJyaWRlOiBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCB8fCB1bmRlZmluZWQsXG4gICAgICBzaWduYWwsXG4gICAgfSk7XG5cbiAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIHRvdGFsOiAwLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IG1hcFNoZWV0T3B0aW9ucyhyZXNwb25zZT8uSXRlbXMpLFxuICAgICAgdG90YWw6IE51bWJlcihyZXNwb25zZT8uVG90YWwgfHwgMCksXG4gICAgfTtcbiAgfSwgW2luY2x1ZGVTdWJvcmRpbmF0ZXMsIG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkXSk7XG5cbiAgaWYgKCFlbmFibGVSZW1vdGVTdWdnZXN0aW9ucyB8fCByZWFkT25seU1vZGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAge3Nob3dMYWJlbCA/IChcbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgc3R5bGU9e3sgY29sb3I6IFwiIzAwMjk2YmUwXCIgfX0+XG4gICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHB4LTMgcHktMiB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgdGV4dC1zbGF0ZS05MDAgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxuICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8UmVtb3RlU2VhcmNoQ29tYm9ib3hcbiAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgIG9uU2VhcmNoPXthc3luYyAodGVybSwgc2lnbmFsKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGxvYWRPcHRpb25zKHRlcm0sIHNpZ25hbCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICAgIG9uU2VhcmNoUGFnZT17YXN5bmMgKHRlcm0sIHBhZ2UsIHBhZ2VTaXplLCBzaWduYWwpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbG9hZE9wdGlvbnNQYWdlKHRlcm0sIHBhZ2UsIHBhZ2VTaXplLCBzaWduYWwpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGl0ZW1zOiBbXSwgdG90YWw6IDAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH19XG4gICAgICBpZEJhc2U9XCJleHBlbnNlLXNoZWV0LWZpbHRlclwiXG4gICAgICBtaW5TZWFyY2hMZW5ndGg9ezB9XG4gICAgICBwYWdlU2l6ZT17U0VBUkNIX1BBR0VfU0laRX1cbiAgICAgIGFsbG93RW1wdHlTZWFyY2hcbiAgICAgIGxvYWRPbk9wZW5cbiAgICAgIGluZmluaXRlU2Nyb2xsXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0RmlsdGVySW5wdXQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIsIGdldEV4cGVuc2VTdGF0dXNGaWx0ZXJPcHRpb25zLCBub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVN0YXR1c0NhdGFsb2cudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcblxudHlwZSBFeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZTtcbiAgb25DaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUpID0+IHZvaWQ7XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xufTtcblxuLy8gU2hhcmVkIGZpeGVkIHN0YXR1cyBmaWx0ZXIgc2VsZWN0IHVzaW5nIHRoZSBjYW5vbmljYWwgc3RhdHVzIGNhdGFsb2cuXG5jb25zdCBFeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG59OiBFeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0UHJvcHMpID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiBnZXRFeHBlbnNlU3RhdHVzRmlsdGVyT3B0aW9ucygpLCBbXSk7XG4gIGNvbnN0IHVpVmFsdWUgPSB2YWx1ZSA9PT0gREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIgPyBcIlwiIDogdmFsdWU7XG5cbiAgcmV0dXJuIChcbiAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICB2YWx1ZT17dWlWYWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiBvbkNoYW5nZShub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZShuZXh0VmFsdWUsIERFRkFVTFRfRVhQRU5TRV9TVEFUVVNfRklMVEVSKSl9XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICBpZEJhc2U9XCJleHBlbnNlLXN0YXR1cy1maWx0ZXJcIlxuICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZURhdGVSYW5nZUZpbHRlciBmcm9tIFwiLi9FeHBlbnNlRGF0ZVJhbmdlRmlsdGVyLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VGaWx0ZXJBY3Rpb25zIGZyb20gXCIuL0V4cGVuc2VGaWx0ZXJBY3Rpb25zLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dCBmcm9tIFwiLi9FeHBlbnNlUHJvamVjdEZpbHRlcklucHV0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJzIGZyb20gXCIuL0V4cGVuc2VRdWlja0RhdGVGaWx0ZXJzLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VTaGVldEZpbHRlcklucHV0IGZyb20gXCIuL0V4cGVuc2VTaGVldEZpbHRlcklucHV0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VTdGF0dXNGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZVN0YXR1c0ZpbHRlclNlbGVjdC50c3hcIjtcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi4vLi4vdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVN1bW1hcnkudHN4XCI7XG5pbXBvcnQgdHlwZSB7IEF1dGhNYW5hZ2VkVXNlciB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlUXVpY2tGaWx0ZXJJZCB9IGZyb20gXCIuLi9saXN0L2V4cGVuc2VMaXN0VHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcblxuZXhwb3J0IHR5cGUgeyBFeHBlbnNlUXVpY2tGaWx0ZXJJZCB9O1xuXG5jb25zdCBwYXJzZUlzb0RhdGUgPSAocmF3OiBzdHJpbmcpOiBEYXRlIHwgbnVsbCA9PiB7XG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3KS50cmltKCkuc3BsaXQoXCJUXCIpWzBdO1xuICBpZiAoIS9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KHZhbHVlKSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IHZhbHVlLnNwbGl0KFwiLVwiKS5tYXAoTnVtYmVyKTtcbiAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcbn07XG5cbmNvbnN0IGZvcm1hdERhdGUgPSAocmF3OiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZGF0ZSA9IHBhcnNlSXNvRGF0ZShyYXcpO1xuICBpZiAoIWRhdGUpIHJldHVybiBcIi0tXCI7XG4gIHJldHVybiBkYXRlXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHtcbiAgICAgIGRheTogXCJudW1lcmljXCIsXG4gICAgICBtb250aDogXCJzaG9ydFwiLFxuICAgICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgfSlcbiAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXG4gICAgLnRvTG93ZXJDYXNlKCk7XG59O1xuXG50eXBlIEV4cGVuc2VGaWx0ZXJzUGFuZWxQcm9wcyA9IHtcbiAgdmlzaWJsZTogYm9vbGVhbjtcbiAgc2hvd01hbnVhbERhdGVGaWx0ZXI6IGJvb2xlYW47XG4gIG1hbnVhbERhdGVBdXRvT3BlbktleTogbnVtYmVyO1xuICBmcm9tRGF0ZTogc3RyaW5nO1xuICB0b0RhdGU6IHN0cmluZztcbiAgcHJvamVjdElkOiBzdHJpbmc7XG4gIGhvamFHYXN0b3NJZDogc3RyaW5nO1xuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgbWFuYWdlZFVzZXJJZDogc3RyaW5nO1xuICBzaGVldExvb2t1cE1hbmFnZWRVc2VySWQ6IHN0cmluZztcbiAgaW5jbHVkZVN1Ym9yZGluYXRlczogYm9vbGVhbjtcbiAgbWFuYWdlZFVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXTtcbiAgc2hvd01hbmFnZWRVc2VyRmlsdGVyOiBib29sZWFuO1xuICBtYW5hZ2VkVXNlckZpbHRlckRpc2FibGVkOiBib29sZWFuO1xuICBtYW5hZ2VkVXNlckFsbE9wdGlvbj86IEV4cGVuc2VTZWxlY3RPcHRpb24gfCBudWxsO1xuICBzdGF0dXNGaWx0ZXI6IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlO1xuICBhY3RpdmVRdWlja0ZpbHRlcjogRXhwZW5zZVF1aWNrRmlsdGVySWQgfCBudWxsO1xuICBzaG93TWFudWFsRGF0ZUVycm9yOiBib29sZWFuO1xuICBvbkRhdGVSYW5nZUNoYW5nZTogKGZyb21EYXRlOiBzdHJpbmcsIHRvRGF0ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbk1hbnVhbFJhbmdlQ29tcGxldGU6IChmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25RdWlja0ZpbHRlckNoYW5nZTogKGZpbHRlcklkOiBFeHBlbnNlUXVpY2tGaWx0ZXJJZCkgPT4gdm9pZDtcbiAgb25Qcm9qZWN0SWRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkhvamFHYXN0b3NJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uQ3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25NYW5hZ2VkVXNlcklkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25TdGF0dXNGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUpID0+IHZvaWQ7XG4gIG9uQ2xlYXI6ICgpID0+IHZvaWQ7XG4gIG9uQXBwbHk6ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBTaGFyZWQgZXhwZW5zZSBzaGVldCBmaWx0ZXIgcGFuZWwgY29tcG9zZWQgZnJvbSByZXVzYWJsZSBtb2R1bGUgY29tcG9uZW50cy5cbmNvbnN0IEV4cGVuc2VGaWx0ZXJzUGFuZWwgPSAoe1xuICB2aXNpYmxlLFxuICBzaG93TWFudWFsRGF0ZUZpbHRlcixcbiAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxuICBmcm9tRGF0ZSxcbiAgdG9EYXRlLFxuICBwcm9qZWN0SWQsXG4gIGhvamFHYXN0b3NJZCxcbiAgY3VycmVuY3lDb2RlLFxuICBtYW5hZ2VkVXNlcklkLFxuICBzaGVldExvb2t1cE1hbmFnZWRVc2VySWQsXG4gIGluY2x1ZGVTdWJvcmRpbmF0ZXMsXG4gIG1hbmFnZWRVc2VycyxcbiAgc2hvd01hbmFnZWRVc2VyRmlsdGVyLFxuICBtYW5hZ2VkVXNlckZpbHRlckRpc2FibGVkLFxuICBtYW5hZ2VkVXNlckFsbE9wdGlvbiA9IG51bGwsXG4gIHN0YXR1c0ZpbHRlcixcbiAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gIG9uRGF0ZVJhbmdlQ2hhbmdlLFxuICBvbk1hbnVhbFJhbmdlQ29tcGxldGUsXG4gIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXG4gIG9uUHJvamVjdElkQ2hhbmdlLFxuICBvbkhvamFHYXN0b3NJZENoYW5nZSxcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2UsXG4gIG9uTWFuYWdlZFVzZXJJZENoYW5nZSxcbiAgb25TdGF0dXNGaWx0ZXJDaGFuZ2UsXG4gIG9uQ2xlYXIsXG4gIG9uQXBwbHksXG59OiBFeHBlbnNlRmlsdGVyc1BhbmVsUHJvcHMpID0+IHtcbiAgaWYgKCF2aXNpYmxlKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgbG9jYWxlID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCI7XG4gIGNvbnN0IHNob3dJbmxpbmVEYXRlU3VtbWFyeSA9ICFzaG93TWFudWFsRGF0ZUZpbHRlciAmJiAhIWZyb21EYXRlICYmICEhdG9EYXRlO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItY2FyZCBmaWx0ZXItY2FyZC0tZXhwYW5kZWQgcC0yIHNtOnAtMi41IHJlbGF0aXZlXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN0YWNrIGZsZXggZmxleC1jb2wgc3BhY2UteS0yXCI+XG4gICAgICAgIDxFeHBlbnNlUXVpY2tEYXRlRmlsdGVycyBhY3RpdmVRdWlja0ZpbHRlcj17YWN0aXZlUXVpY2tGaWx0ZXJ9IG9uUXVpY2tGaWx0ZXJDaGFuZ2U9e29uUXVpY2tGaWx0ZXJDaGFuZ2V9IC8+XG5cbiAgICAgICAge3Nob3dNYW51YWxEYXRlRmlsdGVyID8gKFxuICAgICAgICAgIDxFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyXG4gICAgICAgICAgICBmcm9tRGF0ZT17ZnJvbURhdGV9XG4gICAgICAgICAgICB0b0RhdGU9e3RvRGF0ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRhdGVSYW5nZUNoYW5nZX1cbiAgICAgICAgICAgIG9uUmFuZ2VDb21wbGV0ZT17b25NYW51YWxSYW5nZUNvbXBsZXRlfVxuICAgICAgICAgICAgYXV0b09wZW5SZXF1ZXN0SWQ9e21hbnVhbERhdGVBdXRvT3BlbktleX1cbiAgICAgICAgICAgIHNob3dNYW51YWxFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvcn1cbiAgICAgICAgICAgIHNob3dTdGFydEVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yICYmICFmcm9tRGF0ZX1cbiAgICAgICAgICAgIHNob3dFbmRFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvciAmJiAhdG9EYXRlfVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBzaG93SW5saW5lRGF0ZVN1bW1hcnkgPyAoXG4gICAgICAgICAgPEhpc3RvcnlTdW1tYXJ5XG4gICAgICAgICAgICBzdW1tYXJ5RnJvbUxhYmVsPXtpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKX1cbiAgICAgICAgICAgIHN1bW1hcnlUb0xhYmVsPXtpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpfVxuICAgICAgICAgICAgZnJvbVZhbHVlPXtmb3JtYXREYXRlKGZyb21EYXRlLCBsb2NhbGUpfVxuICAgICAgICAgICAgdG9WYWx1ZT17Zm9ybWF0RGF0ZSh0b0RhdGUsIGxvY2FsZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJnYXAteS0xIHRleHQtWzExcHhdIHB4LTFcIlxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiAke3Nob3dNYW5hZ2VkVXNlckZpbHRlciA/IFwibGc6Z3JpZC1jb2xzLTVcIiA6IFwibGc6Z3JpZC1jb2xzLTRcIn0gZ2FwLTJgfT5cbiAgICAgICAgICB7c2hvd01hbmFnZWRVc2VyRmlsdGVyID8gKFxuICAgICAgICAgICAgPEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1VzZXJcIiwgXCJVc2VyXCIpfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1VzZXJcIiwgXCJVc2VyXCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17bWFuYWdlZFVzZXJJZH1cbiAgICAgICAgICAgICAgdXNlcnM9e21hbmFnZWRVc2Vyc31cbiAgICAgICAgICAgICAgYWxsT3B0aW9uPXttYW5hZ2VkVXNlckFsbE9wdGlvbn1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uTWFuYWdlZFVzZXJJZENoYW5nZX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e21hbmFnZWRVc2VyRmlsdGVyRGlzYWJsZWR9XG4gICAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgIGNsZWFyT25FbXB0eUlucHV0XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAgPEV4cGVuc2VTaGVldEZpbHRlcklucHV0XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1NoZWV0XCIsIFwiRXhwZW5zZSBzaGVldFwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU2hlZXRcIiwgXCJFeHBlbnNlIHNoZWV0XCIpfVxuICAgICAgICAgICAgdmFsdWU9e2hvamFHYXN0b3NJZH1cbiAgICAgICAgICAgIG1hbmFnZWRVc2VySWQ9e3NoZWV0TG9va3VwTWFuYWdlZFVzZXJJZH1cbiAgICAgICAgICAgIGluY2x1ZGVTdWJvcmRpbmF0ZXM9e2luY2x1ZGVTdWJvcmRpbmF0ZXN9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25Ib2phR2FzdG9zSWRDaGFuZ2V9XG4gICAgICAgICAgICBlbmFibGVSZW1vdGVTdWdnZXN0aW9uc1xuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfUHJvamVjdFwiLCBcIlByb2plY3RcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxuICAgICAgICAgICAgdmFsdWU9e3Byb2plY3RJZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvblByb2plY3RJZENoYW5nZX1cbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtjdXJyZW5jeUNvZGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25DdXJyZW5jeUNvZGVDaGFuZ2V9XG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgc2hvd0xvYWRpbmdTdGF0ZVRleHQ9e2ZhbHNlfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8RXhwZW5zZVN0YXR1c0ZpbHRlclNlbGVjdFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNcIiwgXCJFc3RhZG9cIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1N0YXR1c19QbGFjZWhvbGRlclwiLCBcIkVzdGFkb1wiKX1cbiAgICAgICAgICAgIHZhbHVlPXtzdGF0dXNGaWx0ZXJ9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25TdGF0dXNGaWx0ZXJDaGFuZ2V9XG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxFeHBlbnNlRmlsdGVyQWN0aW9uc1xuICAgICAgICAgIGNsZWFyTGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGVhclwiLCBcIkNsZWFyXCIpfVxuICAgICAgICAgIGFwcGx5TGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9BcHBseVwiLCBcIkFwcGx5XCIpfVxuICAgICAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XG4gICAgICAgICAgb25BcHBseT17b25BcHBseX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUZpbHRlcnNQYW5lbDtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRDYXJkLCBFeHBlbnNlU2hlZXRMaXN0RmlsdGVycyB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGJ1aWxkRXhwZW5zZUxpc3RQYXlsb2FkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VQYXlsb2FkQnVpbGRlcnMudHNcIjtcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0TGlzdCwgbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgaXNFeHBlbnNlQWJvcnRMaWtlRXJyb3IsIHJ1bkV4cGVuc2VSZWFkUmVxdWVzdFdpdGhSZXRyeSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlUmVxdWVzdFJldHJ5LnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVNoZWV0c0xpc3REYXRhQXJncyA9IHtcbiAgaGFzQWNjZXNzOiBib29sZWFuO1xuICBwYWdlU2l6ZTogbnVtYmVyO1xuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcbn07XG5cbi8vIE93bnMgbGlzdCBkYXRhIGZldGNoLCBsb2FkaW5nIHN0YXRlLCBhbmQgcGFnaW5hdGlvbiBtZXRhZGF0YS5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRzTGlzdERhdGEgPSAoeyBoYXNBY2Nlc3MsIHBhZ2VTaXplLCBvbkZvcmJpZGRlbiB9OiBVc2VFeHBlbnNlU2hlZXRzTGlzdERhdGFBcmdzKSA9PiB7XG4gIGNvbnN0IFtpdGVtcywgc2V0SXRlbXNdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0Q2FyZFtdPihbXSk7XG4gIGNvbnN0IFt0b3RhbCwgc2V0VG90YWxdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtjdXJyZW50UGFnZSwgc2V0Q3VycmVudFBhZ2VdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RTZXFSZWYgPSB1c2VSZWYoMCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50ICs9IDE7XG4gICAgICBpZiAoIWFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQuYWJvcnQoKTtcbiAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICBjb25zdCByZXN0b3JlTGlzdFNuYXBzaG90ID0gdXNlQ2FsbGJhY2soXG4gICAgKHNuYXBzaG90OiB7IGl0ZW1zOiBFeHBlbnNlU2hlZXRDYXJkW107IHRvdGFsOiBudW1iZXI7IHBhZ2U6IG51bWJlciB9KSA9PiB7XG4gICAgICBjb25zdCBzYWZlSXRlbXMgPSBBcnJheS5pc0FycmF5KHNuYXBzaG90Lml0ZW1zKSA/IHNuYXBzaG90Lml0ZW1zIDogW107XG4gICAgICBjb25zdCBzYWZlVG90YWxSYXcgPSBOdW1iZXIoc25hcHNob3QudG90YWwpO1xuICAgICAgY29uc3Qgc2FmZVRvdGFsID0gTnVtYmVyLmlzRmluaXRlKHNhZmVUb3RhbFJhdykgJiYgc2FmZVRvdGFsUmF3ID49IDAgPyBzYWZlVG90YWxSYXcgOiBzYWZlSXRlbXMubGVuZ3RoO1xuICAgICAgY29uc3Qgc2FmZVBhZ2VSYXcgPSBOdW1iZXIoc25hcHNob3QucGFnZSk7XG4gICAgICBjb25zdCBzYWZlUGFnZSA9IE51bWJlci5pc0Zpbml0ZShzYWZlUGFnZVJhdykgJiYgc2FmZVBhZ2VSYXcgPiAwID8gTWF0aC5mbG9vcihzYWZlUGFnZVJhdykgOiAxO1xuXG4gICAgICBzZXRJdGVtcyhzYWZlSXRlbXMpO1xuICAgICAgc2V0VG90YWwoc2FmZVRvdGFsKTtcbiAgICAgIHNldEN1cnJlbnRQYWdlKHNhZmVQYWdlKTtcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgfSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IGxvYWRMaXN0ID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKHBhZ2U6IG51bWJlciwgZmlsdGVyczogRXhwZW5zZVNoZWV0TGlzdEZpbHRlcnMpID0+IHtcbiAgICAgIGlmICghaGFzQWNjZXNzKSB7XG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudC5hYm9ydCgpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XG4gICAgICBjb25zdCByZXF1ZXN0U2VxID0gYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50ICsgMTtcbiAgICAgIGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCA9IHJlcXVlc3RTZXE7XG5cbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZEV4cGVuc2VMaXN0UGF5bG9hZChmaWx0ZXJzLCBwYWdlLCBwYWdlU2l6ZSk7XG4gICAgICBjb25zdCBzZWxlY3RlZE1hbmFnZWRVc2VySWQgPSBTdHJpbmcoZmlsdGVycz8ubWFuYWdlZFVzZXJJZCB8fCBcIlwiKS50cmltKCk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcnVuRXhwZW5zZVJlYWRSZXF1ZXN0V2l0aFJldHJ5KFxuICAgICAgICAgICgpID0+XG4gICAgICAgICAgICBmZXRjaEV4cGVuc2VTaGVldExpc3QocGF5bG9hZCwge1xuICAgICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICAgICAgICAgICAgYXhVc2VySWRPdmVycmlkZTogc2VsZWN0ZWRNYW5hZ2VkVXNlcklkIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBpZiAocmVxdWVzdFNlcSAhPT0gYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50KSByZXR1cm47XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXRzLlwiKSk7XG4gICAgICAgICAgc2V0SXRlbXMoW10pO1xuICAgICAgICAgIHNldFRvdGFsKDApO1xuICAgICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5leHRJdGVtcyA9IChBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdKS5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQoaXRlbSlcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgbmV4dFRvdGFsID0gTnVtYmVyKHJlc3BvbnNlPy5Ub3RhbCA/PyBuZXh0SXRlbXMubGVuZ3RoID8/IDApO1xuICAgICAgICBzZXRJdGVtcyhuZXh0SXRlbXMpO1xuICAgICAgICBzZXRUb3RhbChuZXh0VG90YWwpO1xuICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChyZXF1ZXN0U2VxICE9PSBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICAgICAgaWYgKGlzRXhwZW5zZUFib3J0TGlrZUVycm9yKGVycm9yLCBjb250cm9sbGVyLnNpZ25hbCkpIHJldHVybjtcblxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0cy5cIik7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgc2V0SXRlbXMoW10pO1xuICAgICAgICBzZXRUb3RhbCgwKTtcbiAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAocmVxdWVzdFNlcSA9PT0gYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgW2hhc0FjY2Vzcywgb25Gb3JiaWRkZW4sIHBhZ2VTaXplXVxuICApO1xuXG4gIGNvbnN0IHJlc2V0TGlzdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQgKz0gMTtcbiAgICBpZiAoYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCkge1xuICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudC5hYm9ydCgpO1xuICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICAgIHNldEl0ZW1zKFtdKTtcbiAgICBzZXRUb3RhbCgwKTtcbiAgICBzZXRDdXJyZW50UGFnZSgxKTtcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgaXRlbXMsXG4gICAgdG90YWwsXG4gICAgY3VycmVudFBhZ2UsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBsb2FkTGlzdCxcbiAgICByZXN0b3JlTGlzdFNuYXBzaG90LFxuICAgIHJlc2V0TGlzdCxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VRdWlja0ZpbHRlcklkLCBBcHBsaWVkRmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi9leHBlbnNlTGlzdFR5cGVzLnRzXCI7XG5pbXBvcnQgeyBERUZBVUxUX0VYUEVOU0VfU1RBVFVTX0ZJTFRFUiB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVN0YXR1c0NhdGFsb2cudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuL2V4cGVuc2VGaWx0ZXJTbmFwc2hvdC50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VTaGVldHNGaWx0ZXJzU3RhdGVBcmdzID0ge1xuICBvbkFwcGx5RmlsdGVyczogKHNuYXBzaG90OiBBcHBsaWVkRmlsdGVyU25hcHNob3QpID0+IHZvaWQ7XG4gIG9uQ2xlYXJGaWx0ZXJzOiAoKSA9PiB2b2lkO1xuICBkZWZhdWx0TWFuYWdlZFVzZXJJZDogc3RyaW5nO1xufTtcblxuLy8gT3ducyBmaWx0ZXIgVUkgc3RhdGUgYW5kIGFwcGx5L2NsZWFyIHJ1bGVzIGZvciBleHBlbnNlIGxpc3QgcGFnZS5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyc1N0YXRlID0gKHtcbiAgb25BcHBseUZpbHRlcnMsXG4gIG9uQ2xlYXJGaWx0ZXJzLFxuICBkZWZhdWx0TWFuYWdlZFVzZXJJZCxcbn06IFVzZUV4cGVuc2VTaGVldHNGaWx0ZXJzU3RhdGVBcmdzKSA9PiB7XG4gIGNvbnN0IFtmcm9tRGF0ZSwgc2V0RnJvbURhdGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFt0b0RhdGUsIHNldFRvRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3Byb2plY3RJZCwgc2V0UHJvamVjdElkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbaG9qYUdhc3Rvc0lkLCBzZXRIb2phR2FzdG9zSWRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtjdXJyZW5jeUNvZGUsIHNldEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hbmFnZWRVc2VySWQsIHNldE1hbmFnZWRVc2VySWRdID0gdXNlU3RhdGUoZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICBjb25zdCBbaW5jbHVkZVN1Ym9yZGluYXRlcywgc2V0SW5jbHVkZVN1Ym9yZGluYXRlc10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzdGF0dXNGaWx0ZXIsIHNldFN0YXR1c0ZpbHRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZT4oREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIpO1xuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlID0gbnVsbDtcbiAgY29uc3QgW2FjdGl2ZVF1aWNrRmlsdGVyLCBzZXRBY3RpdmVRdWlja0ZpbHRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlUXVpY2tGaWx0ZXJJZCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd01hbnVhbERhdGVGaWx0ZXIsIHNldFNob3dNYW51YWxEYXRlRmlsdGVyXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dNYW51YWxEYXRlRXJyb3IsIHNldFNob3dNYW51YWxEYXRlRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWFudWFsRGF0ZUF1dG9PcGVuS2V5LCBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXldID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFthcHBsaWVkRmlsdGVycywgc2V0QXBwbGllZEZpbHRlcnNdID0gdXNlU3RhdGU8QXBwbGllZEZpbHRlclNuYXBzaG90IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzaG93RmlsdGVycywgc2V0U2hvd0ZpbHRlcnNdID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgY29uc3QgY3VycmVudEZpbHRlcnMgPSB1c2VNZW1vPEFwcGxpZWRGaWx0ZXJTbmFwc2hvdD4oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZyb21EYXRlLFxuICAgICAgdG9EYXRlLFxuICAgICAgcHJvamVjdElkLFxuICAgICAgaG9qYUdhc3Rvc0lkLFxuICAgICAgY3VycmVuY3lDb2RlLFxuICAgICAgbWFuYWdlZFVzZXJJZDogU3RyaW5nKG1hbmFnZWRVc2VySWQgfHwgZGVmYXVsdE1hbmFnZWRVc2VySWQpLnRyaW0oKSxcbiAgICAgIGluY2x1ZGVTdWJvcmRpbmF0ZXMsXG4gICAgICBzdGF0dXNGaWx0ZXIsXG4gICAgICBleGNoYW5nZVJhdGVNb2RlLFxuICAgICAgZmlsdGVyOiBob2phR2FzdG9zSWQsXG4gICAgfSksXG4gICAgW2N1cnJlbmN5Q29kZSwgZGVmYXVsdE1hbmFnZWRVc2VySWQsIGZyb21EYXRlLCBob2phR2FzdG9zSWQsIGluY2x1ZGVTdWJvcmRpbmF0ZXMsIG1hbmFnZWRVc2VySWQsIHByb2plY3RJZCwgc3RhdHVzRmlsdGVyLCB0b0RhdGVdXG4gICk7XG5cbiAgY29uc3Qgb25BcHBseSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWZyb21EYXRlIHx8ICF0b0RhdGUpIHtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IodHJ1ZSk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNuYXBzaG90OiBBcHBsaWVkRmlsdGVyU25hcHNob3QgPSB7XG4gICAgICBmcm9tRGF0ZSxcbiAgICAgIHRvRGF0ZSxcbiAgICAgIHByb2plY3RJZCxcbiAgICAgIGhvamFHYXN0b3NJZCxcbiAgICAgIGN1cnJlbmN5Q29kZSxcbiAgICAgIG1hbmFnZWRVc2VySWQ6IFN0cmluZyhtYW5hZ2VkVXNlcklkIHx8IGRlZmF1bHRNYW5hZ2VkVXNlcklkKS50cmltKCksXG4gICAgICBpbmNsdWRlU3Vib3JkaW5hdGVzLFxuICAgICAgc3RhdHVzRmlsdGVyLFxuICAgICAgZXhjaGFuZ2VSYXRlTW9kZSxcbiAgICAgIGZpbHRlcjogaG9qYUdhc3Rvc0lkLFxuICAgIH07XG5cbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICBzZXRBcHBsaWVkRmlsdGVycyhzbmFwc2hvdCk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcbiAgICBvbkFwcGx5RmlsdGVycyhzbmFwc2hvdCk7XG4gIH0sIFtjdXJyZW5jeUNvZGUsIGRlZmF1bHRNYW5hZ2VkVXNlcklkLCBmcm9tRGF0ZSwgaG9qYUdhc3Rvc0lkLCBpbmNsdWRlU3Vib3JkaW5hdGVzLCBtYW5hZ2VkVXNlcklkLCBvbkFwcGx5RmlsdGVycywgcHJvamVjdElkLCBzdGF0dXNGaWx0ZXIsIHRvRGF0ZV0pO1xuXG4gIC8vIFJlaHlkcmF0ZXMgdGhlIGxpc3QgZmlsdGVycyBmcm9tIGEgY2FjaGVkIHNuYXBzaG90IHdoZW4gcmV0dXJuaW5nIGZyb20gZGV0YWlsLlxuICBjb25zdCByZXN0b3JlQXBwbGllZEZpbHRlcnMgPSB1c2VDYWxsYmFjaygoc25hcHNob3Q6IEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4ge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlRmlsdGVyU25hcHNob3Qoc25hcHNob3QpO1xuICAgIGNvbnN0IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCA9IFN0cmluZyhub3JtYWxpemVkLm1hbmFnZWRVc2VySWQgfHwgZGVmYXVsdE1hbmFnZWRVc2VySWQpLnRyaW0oKTtcbiAgICBzZXRGcm9tRGF0ZShub3JtYWxpemVkLmZyb21EYXRlKTtcbiAgICBzZXRUb0RhdGUobm9ybWFsaXplZC50b0RhdGUpO1xuICAgIHNldFByb2plY3RJZChub3JtYWxpemVkLnByb2plY3RJZCk7XG4gICAgc2V0SG9qYUdhc3Rvc0lkKG5vcm1hbGl6ZWQuaG9qYUdhc3Rvc0lkKTtcbiAgICBzZXRDdXJyZW5jeUNvZGUobm9ybWFsaXplZC5jdXJyZW5jeUNvZGUpO1xuICAgIHNldE1hbmFnZWRVc2VySWQocmVzdG9yZWRNYW5hZ2VkVXNlcklkKTtcbiAgICBzZXRJbmNsdWRlU3Vib3JkaW5hdGVzKG5vcm1hbGl6ZWQuaW5jbHVkZVN1Ym9yZGluYXRlcyA9PT0gdHJ1ZSk7XG4gICAgc2V0U3RhdHVzRmlsdGVyKG5vcm1hbGl6ZWQuc3RhdHVzRmlsdGVyKTtcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgc2V0QXBwbGllZEZpbHRlcnMoe1xuICAgICAgLi4ubm9ybWFsaXplZCxcbiAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCxcbiAgICB9KTtcbiAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XG4gIH0sIFtkZWZhdWx0TWFuYWdlZFVzZXJJZF0pO1xuXG4gIGNvbnN0IG9uQ2xlYXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0RnJvbURhdGUoXCJcIik7XG4gICAgc2V0VG9EYXRlKFwiXCIpO1xuICAgIHNldFByb2plY3RJZChcIlwiKTtcbiAgICBzZXRIb2phR2FzdG9zSWQoXCJcIik7XG4gICAgc2V0Q3VycmVuY3lDb2RlKFwiXCIpO1xuICAgIHNldE1hbmFnZWRVc2VySWQoZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICAgIHNldEluY2x1ZGVTdWJvcmRpbmF0ZXMoZmFsc2UpO1xuICAgIHNldFN0YXR1c0ZpbHRlcihERUZBVUxUX0VYUEVOU0VfU1RBVFVTX0ZJTFRFUik7XG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgIHNldE1hbnVhbERhdGVBdXRvT3BlbktleSgwKTtcbiAgICBzZXRBcHBsaWVkRmlsdGVycyhudWxsKTtcbiAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcbiAgICBvbkNsZWFyRmlsdGVycygpO1xuICB9LCBbZGVmYXVsdE1hbmFnZWRVc2VySWQsIG9uQ2xlYXJGaWx0ZXJzXSk7XG5cbiAgY29uc3Qgb25EYXRlUmFuZ2VDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAobmV4dEZyb21EYXRlOiBzdHJpbmcsIG5leHRUb0RhdGU6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgaGFzRnVsbFJhbmdlID0gISFuZXh0RnJvbURhdGUgJiYgISFuZXh0VG9EYXRlO1xuICAgICAgc2V0RnJvbURhdGUobmV4dEZyb21EYXRlKTtcbiAgICAgIHNldFRvRGF0ZShuZXh0VG9EYXRlKTtcbiAgICAgIGlmICghaGFzRnVsbFJhbmdlKSB7XG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKHRydWUpO1xuICAgICAgfVxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgICBpZiAoc2hvd01hbnVhbERhdGVFcnJvcikge1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKCFoYXNGdWxsUmFuZ2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW3Nob3dNYW51YWxEYXRlRXJyb3JdXG4gICk7XG5cbiAgLy8gQ2xvc2VzIHRoZSBtYW51YWwgZGF0ZSBVSSBvbmNlIHRoZSB1c2VyIGZpbmlzaGVzIHNlbGVjdGluZyBhIGZ1bGwgcmFuZ2UuXG4gIGNvbnN0IG9uTWFudWFsUmFuZ2VDb21wbGV0ZSA9IHVzZUNhbGxiYWNrKChuZXh0RnJvbURhdGU6IHN0cmluZywgbmV4dFRvRGF0ZTogc3RyaW5nKSA9PiB7XG4gICAgc2V0RnJvbURhdGUobmV4dEZyb21EYXRlKTtcbiAgICBzZXRUb0RhdGUobmV4dFRvRGF0ZSk7XG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgb25RdWlja0ZpbHRlckNoYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgIChmaWx0ZXJJZDogRXhwZW5zZVF1aWNrRmlsdGVySWQpID0+IHtcbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJjdXN0b21cIikge1xuICAgICAgICAvLyBUb2dnbGUgbWFudWFsIGRhdGUgY29udHJvbHMgb24gZXZlcnkgRGF0ZSBidXR0b24gY2xpY2suXG4gICAgICAgIGlmIChzaG93TWFudWFsRGF0ZUZpbHRlcikge1xuICAgICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIodHJ1ZSk7XG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgICAgICAvLyBBbHdheXMgYXNrIHRoZSBkYXRlIGNvbXBvbmVudCB0byBvcGVuIHRoZSBjYWxlbmRhciB3aGVuIERhdGUgaXMgcHJlc3NlZC5cbiAgICAgICAgc2V0TWFudWFsRGF0ZUF1dG9PcGVuS2V5KChwcmV2aW91cykgPT4gcHJldmlvdXMgKyAxKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihmaWx0ZXJJZCk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcblxuICAgICAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xuICAgICAgY29uc3QgbmV4dEZyb20gPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy03XCIpIHtcbiAgICAgICAgbmV4dEZyb20uc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA2KTtcbiAgICAgIH0gZWxzZSBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy0zMFwiKSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMjkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dEZyb20uc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA4OSk7XG4gICAgICB9XG5cbiAgICAgIHNldEZyb21EYXRlKHRvSXNvRGF0ZShuZXh0RnJvbSkpO1xuICAgICAgc2V0VG9EYXRlKHRvSXNvRGF0ZSh0b2RheSkpO1xuICAgIH0sXG4gICAgW3Nob3dNYW51YWxEYXRlRmlsdGVyXVxuICApO1xuXG4gIGNvbnN0IHRvZ2dsZUZpbHRlclBhbmVsID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFNob3dGaWx0ZXJzKChwcmV2aW91cykgPT4ge1xuICAgICAgY29uc3QgbmV4dCA9ICFwcmV2aW91cztcbiAgICAgIGlmICghbmV4dCkge1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgZnJvbURhdGUsXG4gICAgdG9EYXRlLFxuICAgIHByb2plY3RJZCxcbiAgICBob2phR2FzdG9zSWQsXG4gICAgY3VycmVuY3lDb2RlLFxuICAgIG1hbmFnZWRVc2VySWQsXG4gICAgaW5jbHVkZVN1Ym9yZGluYXRlcyxcbiAgICBzdGF0dXNGaWx0ZXIsXG4gICAgZXhjaGFuZ2VSYXRlTW9kZSxcbiAgICBhY3RpdmVRdWlja0ZpbHRlcixcbiAgICBzaG93TWFudWFsRGF0ZUZpbHRlcixcbiAgICBzaG93TWFudWFsRGF0ZUVycm9yLFxuICAgIG1hbnVhbERhdGVBdXRvT3BlbktleSxcbiAgICBhcHBsaWVkRmlsdGVycyxcbiAgICBzaG93RmlsdGVycyxcbiAgICBjdXJyZW50RmlsdGVycyxcbiAgICBzZXRQcm9qZWN0SWQsXG4gICAgc2V0SG9qYUdhc3Rvc0lkLFxuICAgIHNldEN1cnJlbmN5Q29kZSxcbiAgICBzZXRNYW5hZ2VkVXNlcklkLFxuICAgIHNldEluY2x1ZGVTdWJvcmRpbmF0ZXMsXG4gICAgc2V0U3RhdHVzRmlsdGVyLFxuICAgIG9uQXBwbHksXG4gICAgb25DbGVhcixcbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMsXG4gICAgb25EYXRlUmFuZ2VDaGFuZ2UsXG4gICAgb25NYW51YWxSYW5nZUNvbXBsZXRlLFxuICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXG4gICAgdG9nZ2xlRmlsdGVyUGFuZWwsXG4gIH07XG59O1xuIiwgImltcG9ydCB0eXBlIHsgQXV0aE1hbmFnZWRVc2VyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XG5cbmV4cG9ydCBjb25zdCBFWFBFTlNFX1NIRUVUU19BTExfVVNFUlNfVkFMVUUgPSBcIl9fZXhwZW5zZV9zaGVldHNfYWxsX3VzZXJzX19cIjtcblxuY29uc3Qgbm9ybWFsaXplVXNlcklkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XG5cbi8vIENvbXBhcmVzIEF4IHVzZXIgaWRzIHdpdGggc3RhYmxlIHRyaW1taW5nIGFuZCBjYXNpbmcuXG5leHBvcnQgY29uc3QgaXNTYW1lRXhwZW5zZU1hbmFnZWRVc2VyID0gKGxlZnQ6IHVua25vd24sIHJpZ2h0OiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRMZWZ0ID0gbm9ybWFsaXplVXNlcklkKGxlZnQpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRSaWdodCA9IG5vcm1hbGl6ZVVzZXJJZChyaWdodCkudG9VcHBlckNhc2UoKTtcbiAgcmV0dXJuICEhbm9ybWFsaXplZExlZnQgJiYgbm9ybWFsaXplZExlZnQgPT09IG5vcm1hbGl6ZWRSaWdodDtcbn07XG5cbi8vIEVuc3VyZXMgdGhlIGN1cnJlbnQgdXNlciByZW1haW5zIHNlbGVjdGFibGUgdG9nZXRoZXIgd2l0aCBkaXJlY3Qgc3Vib3JkaW5hdGVzLlxuZXhwb3J0IGNvbnN0IGVuc3VyZUN1cnJlbnRFeHBlbnNlTWFuYWdlZFVzZXJJbkxpc3QgPSAoXG4gIHVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXSxcbiAgY3VycmVudEF4VXNlcklkOiB1bmtub3duXG4pOiBBdXRoTWFuYWdlZFVzZXJbXSA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50ID0gbm9ybWFsaXplVXNlcklkKGN1cnJlbnRBeFVzZXJJZCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRVc2VycyA9IEFycmF5LmlzQXJyYXkodXNlcnMpID8gdXNlcnMgOiBbXTtcbiAgaWYgKCFub3JtYWxpemVkQ3VycmVudCkgcmV0dXJuIG5vcm1hbGl6ZWRVc2VycztcbiAgaWYgKG5vcm1hbGl6ZWRVc2Vycy5zb21lKChlbnRyeSkgPT4gaXNTYW1lRXhwZW5zZU1hbmFnZWRVc2VyKGVudHJ5LmF4VXNlcklkLCBub3JtYWxpemVkQ3VycmVudCkpKSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWRVc2VycztcbiAgfVxuXG4gIHJldHVybiBbXG4gICAge1xuICAgICAgY3JtVXNlcklkOiBub3JtYWxpemVkQ3VycmVudCxcbiAgICAgIGF4VXNlcklkOiBub3JtYWxpemVkQ3VycmVudCxcbiAgICAgIG5hbWU6IG5vcm1hbGl6ZWRDdXJyZW50LFxuICAgIH0sXG4gICAgLi4ubm9ybWFsaXplZFVzZXJzLFxuICBdO1xufTtcblxuLy8gUmVzb2x2ZXMgYSB2YWxpZCB1c2VyIHNlbGVjdGlvbiBmcm9tIHRoZSBhdmFpbGFibGUgdXNlciBsaXN0IGFuZCBjdXJyZW50IGNvbnRleHQuXG5leHBvcnQgY29uc3QgcmVzb2x2ZUV4cGVuc2VNYW5hZ2VkVXNlclNlbGVjdGlvbiA9IChcbiAgcmVxdWVzdGVkVXNlcklkOiB1bmtub3duLFxuICBjdXJyZW50QXhVc2VySWQ6IHVua25vd24sXG4gIHVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXVxuKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZFJlcXVlc3RlZCA9IG5vcm1hbGl6ZVVzZXJJZChyZXF1ZXN0ZWRVc2VySWQpO1xuICBjb25zdCBub3JtYWxpemVkQ3VycmVudCA9IG5vcm1hbGl6ZVVzZXJJZChjdXJyZW50QXhVc2VySWQpO1xuXG4gIGlmIChub3JtYWxpemVkUmVxdWVzdGVkKSB7XG4gICAgY29uc3QgZXhhY3QgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lRXhwZW5zZU1hbmFnZWRVc2VyKGVudHJ5LmF4VXNlcklkLCBub3JtYWxpemVkUmVxdWVzdGVkKSk7XG4gICAgaWYgKGV4YWN0KSByZXR1cm4gZXhhY3QuYXhVc2VySWQ7XG4gIH1cblxuICBpZiAobm9ybWFsaXplZEN1cnJlbnQpIHtcbiAgICBjb25zdCBzZWxmID0gdXNlcnMuZmluZCgoZW50cnkpID0+IGlzU2FtZUV4cGVuc2VNYW5hZ2VkVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZEN1cnJlbnQpKTtcbiAgICByZXR1cm4gc2VsZj8uYXhVc2VySWQgfHwgbm9ybWFsaXplZEN1cnJlbnQ7XG4gIH1cblxuICByZXR1cm4gXCJcIjtcbn07XG5cbnR5cGUgTm9ybWFsaXplRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU3RhdGVBcmdzID0ge1xuICBtYW5hZ2VkVXNlcklkOiB1bmtub3duO1xuICBpbmNsdWRlU3Vib3JkaW5hdGVzOiB1bmtub3duO1xuICBjdXJyZW50QXhVc2VySWQ6IHVua25vd247XG4gIHVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXTtcbiAgY2FuTWFuYWdlT3RoZXJVc2VyczogYm9vbGVhbjtcbn07XG5cbi8vIEtlZXBzIHVzZXIgZmlsdGVyIHN0YXRlIGFsaWduZWQgd2l0aCBjdXJyZW50IGNvbnRleHQgYW5kIHN1Ym9yZGluYXRlIGFjY2Vzcy5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTdGF0ZSA9ICh7XG4gIG1hbmFnZWRVc2VySWQsXG4gIGluY2x1ZGVTdWJvcmRpbmF0ZXMsXG4gIGN1cnJlbnRBeFVzZXJJZCxcbiAgdXNlcnMsXG4gIGNhbk1hbmFnZU90aGVyVXNlcnMsXG59OiBOb3JtYWxpemVFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTdGF0ZUFyZ3MpOiB7IG1hbmFnZWRVc2VySWQ6IHN0cmluZzsgaW5jbHVkZVN1Ym9yZGluYXRlczogYm9vbGVhbiB9ID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZFVzZXJzID0gZW5zdXJlQ3VycmVudEV4cGVuc2VNYW5hZ2VkVXNlckluTGlzdCh1c2VycywgY3VycmVudEF4VXNlcklkKTtcbiAgY29uc3QgcmVzb2x2ZWRNYW5hZ2VkVXNlcklkID0gcmVzb2x2ZUV4cGVuc2VNYW5hZ2VkVXNlclNlbGVjdGlvbihtYW5hZ2VkVXNlcklkLCBjdXJyZW50QXhVc2VySWQsIG5vcm1hbGl6ZWRVc2Vycyk7XG5cbiAgcmV0dXJuIHtcbiAgICBtYW5hZ2VkVXNlcklkOiByZXNvbHZlZE1hbmFnZWRVc2VySWQsXG4gICAgaW5jbHVkZVN1Ym9yZGluYXRlczogY2FuTWFuYWdlT3RoZXJVc2VycyAmJiBpbmNsdWRlU3Vib3JkaW5hdGVzID09PSB0cnVlLFxuICB9O1xufTtcblxudHlwZSBOb3JtYWxpemVFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJDaGFuZ2VBcmdzID0ge1xuICByZXF1ZXN0ZWRWYWx1ZTogdW5rbm93bjtcbiAgY3VycmVudEF4VXNlcklkOiB1bmtub3duO1xuICB1c2VyczogQXV0aE1hbmFnZWRVc2VyW107XG4gIGNhbk1hbmFnZU90aGVyVXNlcnM6IGJvb2xlYW47XG59O1xuXG4vLyBDb252ZXJ0cyB0aGUgdXNlciBmaWx0ZXIgVUkgc2VsZWN0aW9uIGludG8gcmVxdWVzdCBzdGF0ZS5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJDaGFuZ2UgPSAoe1xuICByZXF1ZXN0ZWRWYWx1ZSxcbiAgY3VycmVudEF4VXNlcklkLFxuICB1c2VycyxcbiAgY2FuTWFuYWdlT3RoZXJVc2Vycyxcbn06IE5vcm1hbGl6ZUV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlckNoYW5nZUFyZ3MpOiB7IG1hbmFnZWRVc2VySWQ6IHN0cmluZzsgaW5jbHVkZVN1Ym9yZGluYXRlczogYm9vbGVhbiB9ID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZFJlcXVlc3RlZCA9IG5vcm1hbGl6ZVVzZXJJZChyZXF1ZXN0ZWRWYWx1ZSk7XG4gIGlmIChjYW5NYW5hZ2VPdGhlclVzZXJzICYmIG5vcm1hbGl6ZWRSZXF1ZXN0ZWQgPT09IEVYUEVOU0VfU0hFRVRTX0FMTF9VU0VSU19WQUxVRSkge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRVc2VycyA9IGVuc3VyZUN1cnJlbnRFeHBlbnNlTWFuYWdlZFVzZXJJbkxpc3QodXNlcnMsIGN1cnJlbnRBeFVzZXJJZCk7XG4gICAgY29uc3QgY3VycmVudE1hbmFnZWRVc2VySWQgPSByZXNvbHZlRXhwZW5zZU1hbmFnZWRVc2VyU2VsZWN0aW9uKGN1cnJlbnRBeFVzZXJJZCwgY3VycmVudEF4VXNlcklkLCBub3JtYWxpemVkVXNlcnMpO1xuICAgIHJldHVybiB7XG4gICAgICBtYW5hZ2VkVXNlcklkOiBjdXJyZW50TWFuYWdlZFVzZXJJZCxcbiAgICAgIGluY2x1ZGVTdWJvcmRpbmF0ZXM6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBub3JtYWxpemVFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTdGF0ZSh7XG4gICAgbWFuYWdlZFVzZXJJZDogbm9ybWFsaXplZFJlcXVlc3RlZCxcbiAgICBpbmNsdWRlU3Vib3JkaW5hdGVzOiBmYWxzZSxcbiAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgdXNlcnMsXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcbiAgfSk7XG59O1xuXG4vLyBSZXNvbHZlcyB0aGUgdmlzaWJsZSBzZWxlY3RvciB2YWx1ZSBmb3IgdGhlIGN1cnJlbnQgcmVxdWVzdCBzdGF0ZS5cbmV4cG9ydCBjb25zdCByZXNvbHZlRXhwZW5zZU1hbmFnZWRVc2VyU2VsZWN0VmFsdWUgPSAoe1xuICBtYW5hZ2VkVXNlcklkLFxuICBpbmNsdWRlU3Vib3JkaW5hdGVzLFxuICBjdXJyZW50QXhVc2VySWQsXG4gIHVzZXJzLFxuICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxufTogTm9ybWFsaXplRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU3RhdGVBcmdzKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclN0YXRlKHtcbiAgICBtYW5hZ2VkVXNlcklkLFxuICAgIGluY2x1ZGVTdWJvcmRpbmF0ZXMsXG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIHVzZXJzLFxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVkLmluY2x1ZGVTdWJvcmRpbmF0ZXMgPyBFWFBFTlNFX1NIRUVUU19BTExfVVNFUlNfVkFMVUUgOiBub3JtYWxpemVkLm1hbmFnZWRVc2VySWQ7XG59O1xuXG4vLyBIaWRlcyB0aGUgdXNlciBmaWx0ZXIgc3VtbWFyeSB3aGVuIHRoZSBsaXN0IGlzIHNob3dpbmcgdGhlIGN1cnJlbnQgdXNlcidzIG93biBzaGVldHMuXG5leHBvcnQgY29uc3Qgc2hvdWxkU2hvd0V4cGVuc2VNYW5hZ2VkVXNlclN1bW1hcnkgPSAoe1xuICBtYW5hZ2VkVXNlcklkLFxuICBpbmNsdWRlU3Vib3JkaW5hdGVzLFxuICBjdXJyZW50QXhVc2VySWQsXG59OiB7XG4gIG1hbmFnZWRVc2VySWQ6IHVua25vd247XG4gIGluY2x1ZGVTdWJvcmRpbmF0ZXM6IGJvb2xlYW47XG4gIGN1cnJlbnRBeFVzZXJJZDogdW5rbm93bjtcbn0pOiBib29sZWFuID0+IHtcbiAgaWYgKGluY2x1ZGVTdWJvcmRpbmF0ZXMpIHJldHVybiB0cnVlO1xuICBjb25zdCBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCA9IG5vcm1hbGl6ZVVzZXJJZChtYW5hZ2VkVXNlcklkKTtcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnQgPSBub3JtYWxpemVVc2VySWQoY3VycmVudEF4VXNlcklkKTtcbiAgaWYgKCFub3JtYWxpemVkTWFuYWdlZFVzZXJJZCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW50KSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuICFpc1NhbWVFeHBlbnNlTWFuYWdlZFVzZXIobm9ybWFsaXplZE1hbmFnZWRVc2VySWQsIG5vcm1hbGl6ZWRDdXJyZW50KTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQWlFOzs7QUNBakUsbUJBQW1DO0FBZ0c3QjtBQTVFTixJQUFNLG1CQUFtQjtBQUV6QixJQUFNLHlCQUF5QixDQUFDLFNBQWlCLGdCQUFnQztBQUMv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ZSxNQUFNLFFBQVE7QUFDbkYsWUFBTSxxQkFBcUIsbUJBQW1CLE9BQU8sSUFBSSxJQUFJO0FBQzdELFlBQU0sYUFBYSxpQ0FBaUMsS0FBSyxvQkFBb0Isa0JBQWtCO0FBQy9GLFlBQU0sY0FBYyxzQkFBc0IsVUFBVTtBQUNwRCxZQUFNLGNBQWMsK0JBQStCLFVBQVU7QUFDN0QsWUFBTSxVQUFVLFNBQVMsS0FBSyxNQUFNO0FBQ3BDLFlBQU0sWUFBWSxTQUFTLEtBQUssUUFBUTtBQUN4QyxZQUFNLG9CQUFvQixrQkFBa0Isd0JBQXdCO0FBQ3BFLFlBQU0sZ0JBQWdCLHFCQUFxQixVQUN0QyxZQUFZLEdBQUcsU0FBUyxLQUFLLE9BQU8sTUFBTSxVQUMzQztBQUVKLGFBQ0UsNkNBQUMsU0FBNEQsV0FBVSxpQkFDckU7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDO0FBQUEsVUFDQSxPQUFPLGVBQWU7QUFBQSxVQUN0QixVQUFVO0FBQUEsVUFDVixZQUFZO0FBQUEsVUFDWixRQUFRLE1BQU0sV0FBVyxJQUFJLE9BQU87QUFBQSxVQUNwQyxnQkFBZTtBQUFBLFVBQ2YsaUJBQWlCO0FBQUEsVUFDakI7QUFBQTtBQUFBLE1BQ0YsS0FWUSxNQUFNLEdBQUcsT0FBTyxJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVcsRUFXekQ7QUFBQSxJQUVKLENBQUMsR0FDSCxJQUNFO0FBQUEsSUFFSjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsUUFDQSxTQUFTO0FBQUEsUUFDVCxjQUFjLENBQUMsU0FBUztBQUN0QixlQUFLLFNBQVMsTUFBTSxvQ0FBb0Msa0JBQWtCLGNBQWMsQ0FBQztBQUFBLFFBQzNGO0FBQUEsUUFDQSxRQUFRO0FBQUE7QUFBQSxJQUNWO0FBQUEsSUFFQyxtQkFDQztBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTTtBQUFBLFFBQ04sV0FBVyxLQUFLLGlCQUFpQixRQUFRO0FBQUEsUUFDekMsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsU0FBUztBQUFBO0FBQUEsSUFDWCxJQUNFO0FBQUEsS0FDTjtBQUVKO0FBR0EsSUFBTSxvQkFBb0IsTUFBTTtBQUM5QixTQUNFLDZDQUFDLGdDQUFxQix5QkFBdUIsTUFDM0MsdURBQUMsNEJBQXlCLEdBQzVCO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxxQkFBcUI7QUFDNUQsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQyxxQkFBa0IsQ0FBRTtBQUNoRDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sNEJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJSZWFjdCJdCn0K
