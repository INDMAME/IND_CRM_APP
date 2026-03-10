import {
  ExpenseDateRangeFilter_default,
  ExpenseFilterActions_default,
  ExpenseManagedUserFilterSelect_default,
  ExpenseQuickDateFilters_default,
  buildExpenseListPayload,
  buildExpenseSheetSuggestPayload
} from "./chunks/chunk-VBW3Q4GR.js";
import {
  HistorySummary_default
} from "./chunks/chunk-7Z3NMBR5.js";
import {
  normalizeExpenseFilterSnapshot,
  useExpenseSheetsFilterCache
} from "./chunks/chunk-K3INYCYH.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-QUSEUJRZ.js";
import {
  DEFAULT_EXPENSE_STATUS_FILTER,
  getExpenseStatusBadgeClassName,
  getExpenseStatusFilterOptions,
  getExpenseStatusLabel,
  normalizeExpenseStatusFilterCode
} from "./chunks/chunk-ZN2XQFXY.js";
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
} from "./chunks/chunk-YBXWSDR4.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-YGPFKAYG.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-FRQBPU47.js";
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
} from "./chunks/chunk-YVGMYSYA.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-LADF6TNN.js";
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
      void loadList(1, nextSnapshot);
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
    if (!managementBootstrapReady) return;
    if (didRestoreOnMountRef.current) return;
    didRestoreOnMountRef.current = true;
    if (!consumeReturnFlag()) {
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
      return;
    }
    void loadList(cachedState.page, restoredFilters);
  }, [
    clearCachedState,
    consumeReturnFlag,
    defaultManagedUserId,
    loadList,
    managementBootstrapReady,
    normalizeManagedUserSnapshotForLoad,
    readCachedState,
    restoreAppliedFilters,
    restoreListSnapshot,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saXN0L0V4cGVuc2VTaGVldHNQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0RmlsdGVySW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0LnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZUZpbHRlcnNQYW5lbC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saXN0L3VzZUV4cGVuc2VTaGVldHNMaXN0RGF0YS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpc3QvdXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpc3QvZXhwZW5zZU1hbmFnZWRVc2VyU2VsZWN0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcbmltcG9ydCB7IHVzZUF1dGhDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHtcbiAgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIsXG4gIGdldEV4cGVuc2VTdGF0dXNCYWRnZUNsYXNzTmFtZSxcbiAgZ2V0RXhwZW5zZVN0YXR1c0xhYmVsLFxuICBub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSxcbn0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlU3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IEV4cGVuc2VGaWx0ZXJzUGFuZWwgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZUZpbHRlcnNQYW5lbC50c3hcIjtcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURhdGVQYXJ0cywgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBoYXNBc3NpZ25lZFZvdWNoZXIsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRzTGlzdERhdGEgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRzTGlzdERhdGEudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRzRmlsdGVyc1N0YXRlLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUudHNcIjtcbmltcG9ydCBFeHBlbnNlVGltZWxpbmVDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4XCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuaW1wb3J0IHsgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlLCBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBY3RpbmdVc2VyLnRzXCI7XG5pbXBvcnQgeyBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RvcGJhckFjdGlvblZpc2liaWxpdHkudHNcIjtcbmltcG9ydCB7XG4gIGVuc3VyZUN1cnJlbnRFeHBlbnNlTWFuYWdlZFVzZXJJbkxpc3QsXG4gIEVYUEVOU0VfU0hFRVRTX0FMTF9VU0VSU19WQUxVRSxcbiAgaXNTYW1lRXhwZW5zZU1hbmFnZWRVc2VyLFxuICBub3JtYWxpemVFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJDaGFuZ2UsXG4gIG5vcm1hbGl6ZUV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclN0YXRlLFxuICByZXNvbHZlRXhwZW5zZU1hbmFnZWRVc2VyU2VsZWN0VmFsdWUsXG4gIHJlc29sdmVFeHBlbnNlTWFuYWdlZFVzZXJTZWxlY3Rpb24sXG4gIHNob3VsZFNob3dFeHBlbnNlTWFuYWdlZFVzZXJTdW1tYXJ5LFxufSBmcm9tIFwiLi9leHBlbnNlTWFuYWdlZFVzZXJTZWxlY3Rpb24udHNcIjtcblxuY29uc3QgUEFHRV9TSVpFID0gNjtcblxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxuY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXG4gIH0pO1xufTtcblxuY29uc3QgRXhwZW5zZVNoZWV0c1BhZ2VDb250ZW50ID0gKCkgPT4ge1xuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIlZpZXdcIik7XG4gIGNvbnN0IGNhbkNyZWF0ZUV4cGVuc2UgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkFkZFwiKTtcbiAgY29uc3QgdGltZWxpbmVDb250YWluZXJSZWYgPSBSZWFjdC51c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgeyBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWFibGVTdWJvcmRpbmF0ZXMsIGNhbk1hbmFnZU90aGVyVXNlcnMsIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSB9ID0gdXNlQXV0aENvbnRleHQoKTtcbiAgY29uc3QgbWFuYWdlZFVzZXJzID0gdXNlTWVtbyhcbiAgICAoKSA9PiBlbnN1cmVDdXJyZW50RXhwZW5zZU1hbmFnZWRVc2VySW5MaXN0KEFycmF5LmlzQXJyYXkobWFuYWdlYWJsZVN1Ym9yZGluYXRlcykgPyBtYW5hZ2VhYmxlU3Vib3JkaW5hdGVzIDogW10sIGN1cnJlbnRBeFVzZXJJZCksXG4gICAgW2N1cnJlbnRBeFVzZXJJZCwgbWFuYWdlYWJsZVN1Ym9yZGluYXRlc11cbiAgKTtcbiAgY29uc3QgZGVmYXVsdE1hbmFnZWRVc2VySWQgPSB1c2VNZW1vKFxuICAgICgpID0+IHJlc29sdmVFeHBlbnNlTWFuYWdlZFVzZXJTZWxlY3Rpb24oY3VycmVudEF4VXNlcklkLCBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2VycyksXG4gICAgW2N1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzXVxuICApO1xuICBjb25zdCBzaG93TWFuYWdlZFVzZXJGaWx0ZXIgPSB0cnVlO1xuICBjb25zdCBtYW5hZ2VkVXNlckZpbHRlckRpc2FibGVkID0gIW1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSB8fCAhY2FuTWFuYWdlT3RoZXJVc2VycztcbiAgY29uc3QgbWFuYWdlZFVzZXJBbGxMYWJlbCA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Vc2VyX0FsbFwiLCBcIkFsbFwiKTtcbiAgY29uc3QgbWFuYWdlZFVzZXJBbGxPcHRpb24gPSB1c2VNZW1vKFxuICAgICgpID0+XG4gICAgICBjYW5NYW5hZ2VPdGhlclVzZXJzXG4gICAgICAgID8ge1xuICAgICAgICAgICAgdmFsdWU6IEVYUEVOU0VfU0hFRVRTX0FMTF9VU0VSU19WQUxVRSxcbiAgICAgICAgICAgIHRleHQ6IG1hbmFnZWRVc2VyQWxsTGFiZWwsXG4gICAgICAgICAgfVxuICAgICAgICA6IG51bGwsXG4gICAgW2Nhbk1hbmFnZU90aGVyVXNlcnMsIG1hbmFnZWRVc2VyQWxsTGFiZWxdXG4gICk7XG4gIGNvbnN0IG1hbmFnZWRVc2VyTGFiZWxCeUlkID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgICBtYW5hZ2VkVXNlcnMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGlkID0gc2FmZVRleHQoZW50cnkuYXhVc2VySWQpO1xuICAgICAgaWYgKCFpZCkgcmV0dXJuO1xuICAgICAgY29uc3QgbmFtZSA9IHNhZmVUZXh0KGVudHJ5Lm5hbWUpO1xuICAgICAgbWFwLnNldChpZC50b1VwcGVyQ2FzZSgpLCBuYW1lIHx8IGlkKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbWFwO1xuICB9LCBbbWFuYWdlZFVzZXJzXSk7XG5cbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxuICAgIH0pLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3Qge1xuICAgIGl0ZW1zLFxuICAgIHRvdGFsLFxuICAgIGN1cnJlbnRQYWdlLFxuICAgIGlzTG9hZGluZyxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgbG9hZExpc3QsXG4gICAgcmVzdG9yZUxpc3RTbmFwc2hvdCxcbiAgICByZXNldExpc3QsXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXRzTGlzdERhdGEoe1xuICAgIGhhc0FjY2VzcyxcbiAgICBwYWdlU2l6ZTogUEFHRV9TSVpFLFxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxuICB9KTtcblxuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgY29uc3VtZVJldHVybkZsYWcsIHNhdmVDYWNoZWRTdGF0ZSwgY2xlYXJDYWNoZWRTdGF0ZSB9ID0gdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlKCk7XG4gIGNvbnN0IGRpZFJlc3RvcmVPbk1vdW50UmVmID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYgPSBSZWFjdC51c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3Qge1xuICAgIGZyb21EYXRlLFxuICAgIHRvRGF0ZSxcbiAgICBwcm9qZWN0SWQsXG4gICAgaG9qYUdhc3Rvc0lkLFxuICAgIGN1cnJlbmN5Q29kZSxcbiAgICBtYW5hZ2VkVXNlcklkLFxuICAgIGluY2x1ZGVTdWJvcmRpbmF0ZXMsXG4gICAgc3RhdHVzRmlsdGVyLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxuICAgIGFwcGxpZWRGaWx0ZXJzLFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIGN1cnJlbnRGaWx0ZXJzLFxuICAgIHNldFByb2plY3RJZCxcbiAgICBzZXRIb2phR2FzdG9zSWQsXG4gICAgc2V0Q3VycmVuY3lDb2RlLFxuICAgIHNldE1hbmFnZWRVc2VySWQsXG4gICAgc2V0SW5jbHVkZVN1Ym9yZGluYXRlcyxcbiAgICBzZXRTdGF0dXNGaWx0ZXIsXG4gICAgb25BcHBseSxcbiAgICBvbkNsZWFyLFxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcbiAgICBvbkRhdGVSYW5nZUNoYW5nZSxcbiAgICBvbk1hbnVhbFJhbmdlQ29tcGxldGUsXG4gICAgb25RdWlja0ZpbHRlckNoYW5nZSxcbiAgICB0b2dnbGVGaWx0ZXJQYW5lbCxcbiAgfSA9IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJzU3RhdGUoe1xuICAgIG9uQXBwbHlGaWx0ZXJzOiAoc25hcHNob3QpID0+IHtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRTbmFwc2hvdCA9IG5vcm1hbGl6ZU1hbmFnZWRVc2VyU25hcHNob3RGb3JMb2FkKHNuYXBzaG90KTtcbiAgICAgIGlmIChub3JtYWxpemVkU25hcHNob3QubWFuYWdlZFVzZXJJZCkge1xuICAgICAgICBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKG5vcm1hbGl6ZWRTbmFwc2hvdC5tYW5hZ2VkVXNlcklkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xuICAgICAgfVxuICAgICAgdm9pZCBsb2FkTGlzdCgxLCBub3JtYWxpemVkU25hcHNob3QpO1xuICAgIH0sXG4gICAgb25DbGVhckZpbHRlcnM6ICgpID0+IHtcbiAgICAgIHNldE1hbmFnZWRVc2VySWQoZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICAgICAgc2V0SW5jbHVkZVN1Ym9yZGluYXRlcyhmYWxzZSk7XG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgICBjbGVhckV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUoKTtcbiAgICAgIHJlc2V0TGlzdCgpO1xuICAgIH0sXG4gICAgZGVmYXVsdE1hbmFnZWRVc2VySWQsXG4gIH0pO1xuXG4gIGNvbnN0IG5vcm1hbGl6ZU1hbmFnZWRVc2VyU25hcHNob3RGb3JMb2FkID0gdXNlQ2FsbGJhY2soXG4gICAgKHNuYXBzaG90OiB0eXBlb2YgY3VycmVudEZpbHRlcnMpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnNuYXBzaG90LFxuICAgICAgICAuLi5ub3JtYWxpemVFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTdGF0ZSh7XG4gICAgICAgICAgbWFuYWdlZFVzZXJJZDogc25hcHNob3QubWFuYWdlZFVzZXJJZCxcbiAgICAgICAgICBpbmNsdWRlU3Vib3JkaW5hdGVzOiBzbmFwc2hvdC5pbmNsdWRlU3Vib3JkaW5hdGVzLFxuICAgICAgICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICAgICAgICB1c2VyczogbWFuYWdlZFVzZXJzLFxuICAgICAgICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gICAgICAgIH0pLFxuICAgICAgfTtcbiAgICB9LFxuICAgIFtjYW5NYW5hZ2VPdGhlclVzZXJzLCBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vyc11cbiAgKTtcblxuICBjb25zdCBtYW5hZ2VkVXNlckZpbHRlclNlbGVjdFZhbHVlID0gdXNlTWVtbyhcbiAgICAoKSA9PlxuICAgICAgcmVzb2x2ZUV4cGVuc2VNYW5hZ2VkVXNlclNlbGVjdFZhbHVlKHtcbiAgICAgICAgbWFuYWdlZFVzZXJJZCxcbiAgICAgICAgaW5jbHVkZVN1Ym9yZGluYXRlcyxcbiAgICAgICAgY3VycmVudEF4VXNlcklkLFxuICAgICAgICB1c2VyczogbWFuYWdlZFVzZXJzLFxuICAgICAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICAgICAgfSksXG4gICAgW2Nhbk1hbmFnZU90aGVyVXNlcnMsIGN1cnJlbnRBeFVzZXJJZCwgaW5jbHVkZVN1Ym9yZGluYXRlcywgbWFuYWdlZFVzZXJJZCwgbWFuYWdlZFVzZXJzXVxuICApO1xuICBjb25zdCBub3JtYWxpemVkQ3VycmVudE1hbmFnZWRVc2VyRmlsdGVycyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gbm9ybWFsaXplTWFuYWdlZFVzZXJTbmFwc2hvdEZvckxvYWQoY3VycmVudEZpbHRlcnMpLFxuICAgIFtjdXJyZW50RmlsdGVycywgbm9ybWFsaXplTWFuYWdlZFVzZXJTbmFwc2hvdEZvckxvYWRdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlTWFuYWdlZFVzZXJJZENoYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBub3JtYWxpemVkTmV4dEZpbHRlciA9IG5vcm1hbGl6ZUV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlckNoYW5nZSh7XG4gICAgICAgIHJlcXVlc3RlZFZhbHVlOiB2YWx1ZSxcbiAgICAgICAgY3VycmVudEF4VXNlcklkLFxuICAgICAgICB1c2VyczogbWFuYWdlZFVzZXJzLFxuICAgICAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBub3JtYWxpemVkQ3VycmVudEZpbHRlciA9IG5vcm1hbGl6ZUV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclN0YXRlKHtcbiAgICAgICAgbWFuYWdlZFVzZXJJZCxcbiAgICAgICAgaW5jbHVkZVN1Ym9yZGluYXRlcyxcbiAgICAgICAgY3VycmVudEF4VXNlcklkLFxuICAgICAgICB1c2VyczogbWFuYWdlZFVzZXJzLFxuICAgICAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBub3JtYWxpemVkUmVxdWVzdGVkVmFsdWUgPSBzYWZlVGV4dCh2YWx1ZSk7XG4gICAgICBjb25zdCBpc1JldHVybmluZ1RvQ3VycmVudFVzZXIgPVxuICAgICAgICBub3JtYWxpemVkUmVxdWVzdGVkVmFsdWUgPT09IFwiXCIgJiZcbiAgICAgICAgIW5vcm1hbGl6ZWROZXh0RmlsdGVyLmluY2x1ZGVTdWJvcmRpbmF0ZXMgJiZcbiAgICAgICAgaXNTYW1lRXhwZW5zZU1hbmFnZWRVc2VyKG5vcm1hbGl6ZWROZXh0RmlsdGVyLm1hbmFnZWRVc2VySWQsIGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcbiAgICAgIGNvbnN0IHdhc1VzaW5nTm9uRGVmYXVsdFNlbGVjdGlvbiA9XG4gICAgICAgIG5vcm1hbGl6ZWRDdXJyZW50RmlsdGVyLmluY2x1ZGVTdWJvcmRpbmF0ZXMgfHxcbiAgICAgICAgIWlzU2FtZUV4cGVuc2VNYW5hZ2VkVXNlcihub3JtYWxpemVkQ3VycmVudEZpbHRlci5tYW5hZ2VkVXNlcklkLCBkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XG5cbiAgICAgIHNldE1hbmFnZWRVc2VySWQobm9ybWFsaXplZE5leHRGaWx0ZXIubWFuYWdlZFVzZXJJZCk7XG4gICAgICBzZXRJbmNsdWRlU3Vib3JkaW5hdGVzKG5vcm1hbGl6ZWROZXh0RmlsdGVyLmluY2x1ZGVTdWJvcmRpbmF0ZXMpO1xuICAgICAgc2V0SG9qYUdhc3Rvc0lkKFwiXCIpO1xuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuXG4gICAgICBpZiAoIXdhc1VzaW5nTm9uRGVmYXVsdFNlbGVjdGlvbiB8fCAhaXNSZXR1cm5pbmdUb0N1cnJlbnRVc2VyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV4dFNuYXBzaG90ID0gbm9ybWFsaXplTWFuYWdlZFVzZXJTbmFwc2hvdEZvckxvYWQoe1xuICAgICAgICAuLi4oYXBwbGllZEZpbHRlcnMgfHwgY3VycmVudEZpbHRlcnMpLFxuICAgICAgICBob2phR2FzdG9zSWQ6IFwiXCIsXG4gICAgICAgIC4uLm5vcm1hbGl6ZWROZXh0RmlsdGVyLFxuICAgICAgfSk7XG4gICAgICBpZiAobmV4dFNuYXBzaG90Lm1hbmFnZWRVc2VySWQpIHtcbiAgICAgICAgc2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZShuZXh0U25hcHNob3QubWFuYWdlZFVzZXJJZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbGVhckV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUoKTtcbiAgICAgIH1cbiAgICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhuZXh0U25hcHNob3QpO1xuICAgICAgdm9pZCBsb2FkTGlzdCgxLCBuZXh0U25hcHNob3QpO1xuICAgIH0sXG4gICAgW1xuICAgICAgYXBwbGllZEZpbHRlcnMsXG4gICAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSxcbiAgICAgIGN1cnJlbnRGaWx0ZXJzLFxuICAgICAgY3VycmVudEF4VXNlcklkLFxuICAgICAgZGVmYXVsdE1hbmFnZWRVc2VySWQsXG4gICAgICBpbmNsdWRlU3Vib3JkaW5hdGVzLFxuICAgICAgbG9hZExpc3QsXG4gICAgICBtYW5hZ2VkVXNlcklkLFxuICAgICAgbWFuYWdlZFVzZXJzLFxuICAgICAgbm9ybWFsaXplTWFuYWdlZFVzZXJTbmFwc2hvdEZvckxvYWQsXG4gICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMsXG4gICAgICBzZXRJbmNsdWRlU3Vib3JkaW5hdGVzLFxuICAgICAgc2V0SG9qYUdhc3Rvc0lkLFxuICAgICAgc2V0TWFuYWdlZFVzZXJJZCxcbiAgICBdXG4gICk7XG5cbiAgY29uc3QgZ29Ub0RldGFpbCA9IHVzZUNhbGxiYWNrKFxuICAgIChzaGVldElkOiBzdHJpbmcsIG93bmVyVXNlcklkOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmICghc2hlZXRJZCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBub3JtYWxpemVkU25hcHNob3QgPSBub3JtYWxpemVNYW5hZ2VkVXNlclNuYXBzaG90Rm9yTG9hZChhcHBsaWVkRmlsdGVycyB8fCBjdXJyZW50RmlsdGVycyk7XG4gICAgICBjb25zdCBkZXRhaWxPd25lclVzZXJJZCA9IG5vcm1hbGl6ZWRTbmFwc2hvdC5pbmNsdWRlU3Vib3JkaW5hdGVzXG4gICAgICAgID8gKHNhZmVUZXh0KG93bmVyVXNlcklkKSB8fCBub3JtYWxpemVkU25hcHNob3QubWFuYWdlZFVzZXJJZClcbiAgICAgICAgOiBub3JtYWxpemVkU25hcHNob3QubWFuYWdlZFVzZXJJZDtcbiAgICAgIGlmIChkZXRhaWxPd25lclVzZXJJZCkge1xuICAgICAgICBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKGRldGFpbE93bmVyVXNlcklkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xuICAgICAgfVxuICAgICAgc2F2ZUNhY2hlZFN0YXRlKHtcbiAgICAgICAgZmlsdGVyczogbm9ybWFsaXplZFNuYXBzaG90LFxuICAgICAgICBwYWdlOiBjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsXG4gICAgICAgIHNjcm9sbFk6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuc2Nyb2xsWSB8fCAwIDogMCxcbiAgICAgICAgaXRlbXMsXG4gICAgICAgIHRvdGFsLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGlkID0gZW5jb2RlVVJJQ29tcG9uZW50KHNoZWV0SWQpO1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP2hvamFHYXN0b3NJZD0ke2lkfWAsIHtcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW2FwcGxpZWRGaWx0ZXJzLCBjdXJyZW50RmlsdGVycywgY3VycmVudFBhZ2UsIGl0ZW1zLCBub3JtYWxpemVNYW5hZ2VkVXNlclNuYXBzaG90Rm9yTG9hZCwgc2F2ZUNhY2hlZFN0YXRlLCB0b3RhbF1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlU2hlZXRNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/bW9kZT1jcmVhdGVcIiwge1xuICAgICAgYnlwYXNzR3VhcmRPbmNlOiBmYWxzZSxcbiAgICB9KTtcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2VdKTtcblxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcbiAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xuICAgIGlmICghdGltZWxpbmVDb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjYXJkO1xuICB9LCBbXSk7XG5cbiAgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyh7XG4gICAgY29udGFpbmVyUmVmOiB0aW1lbGluZUNvbnRhaW5lclJlZixcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgaXRlbXMsXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXG4gIH0pO1xuXG4gIGNvbnN0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwoKHRvdGFsIHx8IDApIC8gUEFHRV9TSVpFKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkoXCJleHBlbnNlLXNoZWV0cy1saXN0LWFjdGlvbnNcIik7XG4gIH0sIFtdKTtcblxuICBjb25zdCBzdW1tYXJ5SXRlbXMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoIWFwcGxpZWRGaWx0ZXJzKSB7XG4gICAgICByZXR1cm4gW10gYXMgQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9PjtcbiAgICB9XG5cbiAgICBjb25zdCBzdW1tYXJ5OiBBcnJheTx7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0+ID0gW107XG4gICAgY29uc3QgbG9jYWxlID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCI7XG4gICAgY29uc3QgZnJvbURhdGVUZXh0ID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGFwcGxpZWRGaWx0ZXJzLmZyb21EYXRlLCBsb2NhbGUsIFwiXCIpO1xuICAgIGNvbnN0IHRvRGF0ZVRleHQgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoYXBwbGllZEZpbHRlcnMudG9EYXRlLCBsb2NhbGUsIFwiXCIpO1xuXG4gICAgaWYgKGZyb21EYXRlVGV4dCB8fCB0b0RhdGVUZXh0KSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwiZnJvbURhdGVcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpLFxuICAgICAgICB2YWx1ZTogZnJvbURhdGVUZXh0IHx8IFwiLS1cIixcbiAgICAgIH0pO1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcInRvRGF0ZVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKSxcbiAgICAgICAgdmFsdWU6IHRvRGF0ZVRleHQgfHwgXCItLVwiLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGFwcGxpZWRGaWx0ZXJzLnByb2plY3RJZC50cmltKCkpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJwcm9qZWN0XCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfUHJvamVjdFwiLCBcIlByb2plY3RcIiksXG4gICAgICAgIHZhbHVlOiBhcHBsaWVkRmlsdGVycy5wcm9qZWN0SWQudHJpbSgpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChhcHBsaWVkRmlsdGVycy5ob2phR2FzdG9zSWQudHJpbSgpKSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwic2hlZXRcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TaGVldFwiLCBcIkV4cGVuc2Ugc2hlZXRcIiksXG4gICAgICAgIHZhbHVlOiBhcHBsaWVkRmlsdGVycy5ob2phR2FzdG9zSWQudHJpbSgpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChhcHBsaWVkRmlsdGVycy5jdXJyZW5jeUNvZGUudHJpbSgpKSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwiY3VycmVuY3lcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpLFxuICAgICAgICB2YWx1ZTogYXBwbGllZEZpbHRlcnMuY3VycmVuY3lDb2RlLnRyaW0oKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBub3JtYWxpemVkTWFuYWdlZFVzZXJGaWx0ZXJzID0gbm9ybWFsaXplTWFuYWdlZFVzZXJTbmFwc2hvdEZvckxvYWQoYXBwbGllZEZpbHRlcnMpO1xuICAgIGlmIChcbiAgICAgIHNob3VsZFNob3dFeHBlbnNlTWFuYWdlZFVzZXJTdW1tYXJ5KHtcbiAgICAgICAgbWFuYWdlZFVzZXJJZDogbm9ybWFsaXplZE1hbmFnZWRVc2VyRmlsdGVycy5tYW5hZ2VkVXNlcklkLFxuICAgICAgICBpbmNsdWRlU3Vib3JkaW5hdGVzOiBub3JtYWxpemVkTWFuYWdlZFVzZXJGaWx0ZXJzLmluY2x1ZGVTdWJvcmRpbmF0ZXMsXG4gICAgICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICAgIH0pXG4gICAgKSB7XG4gICAgICBjb25zdCBtYW5hZ2VkVXNlckxhYmVsID0gbm9ybWFsaXplZE1hbmFnZWRVc2VyRmlsdGVycy5pbmNsdWRlU3Vib3JkaW5hdGVzXG4gICAgICAgID8gbWFuYWdlZFVzZXJBbGxMYWJlbFxuICAgICAgICA6IG1hbmFnZWRVc2VyTGFiZWxCeUlkLmdldChub3JtYWxpemVkTWFuYWdlZFVzZXJGaWx0ZXJzLm1hbmFnZWRVc2VySWQudG9VcHBlckNhc2UoKSkgfHxcbiAgICAgICAgICBub3JtYWxpemVkTWFuYWdlZFVzZXJGaWx0ZXJzLm1hbmFnZWRVc2VySWQ7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwibWFuYWdlZC11c2VyXCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfVXNlclwiLCBcIlVzZXJcIiksXG4gICAgICAgIHZhbHVlOiBtYW5hZ2VkVXNlckxhYmVsLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChhcHBsaWVkRmlsdGVycy5zdGF0dXNGaWx0ZXIgIT09IERFRkFVTFRfRVhQRU5TRV9TVEFUVVNfRklMVEVSKSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwic3RhdHVzXCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzXCIsIFwiRXN0YWRvXCIpLFxuICAgICAgICB2YWx1ZTogZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGFwcGxpZWRGaWx0ZXJzLnN0YXR1c0ZpbHRlciksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VtbWFyeTtcbiAgfSwgW2FwcGxpZWRGaWx0ZXJzLCBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2VyQWxsTGFiZWwsIG1hbmFnZWRVc2VyTGFiZWxCeUlkLCBub3JtYWxpemVNYW5hZ2VkVXNlclNuYXBzaG90Rm9yTG9hZF0pO1xuXG4gIGNvbnN0IHNob3dTdW1tYXJ5ID0gIXNob3dGaWx0ZXJzICYmIHN1bW1hcnlJdGVtcy5sZW5ndGggPiAwO1xuICBjb25zdCBhY3RpdmVMaXN0RmlsdGVycyA9IGFwcGxpZWRGaWx0ZXJzIHx8IGN1cnJlbnRGaWx0ZXJzO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkpIHJldHVybjtcbiAgICBpZiAoZGlkUmVzdG9yZU9uTW91bnRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQgPSB0cnVlO1xuXG4gICAgaWYgKCFjb25zdW1lUmV0dXJuRmxhZygpKSB7XG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgICBzZXRNYW5hZ2VkVXNlcklkKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcbiAgICAgIHNldEluY2x1ZGVTdWJvcmRpbmF0ZXMoZmFsc2UpO1xuICAgICAgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2FjaGVkU3RhdGUgPSByZWFkQ2FjaGVkU3RhdGUoKTtcbiAgICBpZiAoIWNhY2hlZFN0YXRlKSB7XG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgICBzZXRNYW5hZ2VkVXNlcklkKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcbiAgICAgIHNldEluY2x1ZGVTdWJvcmRpbmF0ZXMoZmFsc2UpO1xuICAgICAgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdG9yZWRGaWx0ZXJzID0ge1xuICAgICAgLi4uY2FjaGVkU3RhdGUuZmlsdGVycyxcbiAgICAgIC4uLm5vcm1hbGl6ZU1hbmFnZWRVc2VyU25hcHNob3RGb3JMb2FkKGNhY2hlZFN0YXRlLmZpbHRlcnMpLFxuICAgIH07XG4gICAgaWYgKHJlc3RvcmVkRmlsdGVycy5tYW5hZ2VkVXNlcklkKSB7XG4gICAgICBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKHJlc3RvcmVkRmlsdGVycy5tYW5hZ2VkVXNlcklkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKCk7XG4gICAgfVxuXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKHJlc3RvcmVkRmlsdGVycyk7XG4gICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLnNjcm9sbFk7XG4gICAgaWYgKGNhY2hlZFN0YXRlLml0ZW1zLmxlbmd0aCA+IDAgfHwgY2FjaGVkU3RhdGUudG90YWwgPiAwKSB7XG4gICAgICByZXN0b3JlTGlzdFNuYXBzaG90KHtcbiAgICAgICAgaXRlbXM6IGNhY2hlZFN0YXRlLml0ZW1zLFxuICAgICAgICB0b3RhbDogY2FjaGVkU3RhdGUudG90YWwsXG4gICAgICAgIHBhZ2U6IGNhY2hlZFN0YXRlLnBhZ2UsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdm9pZCBsb2FkTGlzdChjYWNoZWRTdGF0ZS5wYWdlLCByZXN0b3JlZEZpbHRlcnMpO1xuICB9LCBbXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSxcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcbiAgICBkZWZhdWx0TWFuYWdlZFVzZXJJZCxcbiAgICBsb2FkTGlzdCxcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXG4gICAgbm9ybWFsaXplTWFuYWdlZFVzZXJTbmFwc2hvdEZvckxvYWQsXG4gICAgcmVhZENhY2hlZFN0YXRlLFxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcbiAgICByZXN0b3JlTGlzdFNuYXBzaG90LFxuICAgIHNldEluY2x1ZGVTdWJvcmRpbmF0ZXMsXG4gICAgc2V0TWFuYWdlZFVzZXJJZCxcbiAgXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMb2FkaW5nKSByZXR1cm47XG4gICAgY29uc3QgcGVuZGluZ1Njcm9sbFkgPSBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50O1xuICAgIGlmIChwZW5kaW5nU2Nyb2xsWSA9PSBudWxsKSByZXR1cm47XG5cbiAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgIHRvcDogTWF0aC5tYXgoMCwgcGVuZGluZ1Njcm9sbFkpLFxuICAgICAgICBiZWhhdmlvcjogXCJhdXRvXCIsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSwgW2N1cnJlbnRQYWdlLCBpc0xvYWRpbmcsIGl0ZW1zLmxlbmd0aF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb25Ub2dnbGVGaWx0ZXJzID0gKCkgPT4ge1xuICAgICAgY29uc3Qgd2lsbE9wZW4gPSAhc2hvd0ZpbHRlcnM7XG4gICAgICB0b2dnbGVGaWx0ZXJQYW5lbCgpO1xuICAgICAgaWYgKHdpbGxPcGVuKSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uUmVmcmVzaCA9ICgpID0+IHtcbiAgICAgIGlmICghYXBwbGllZEZpbHRlcnMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2b2lkIGxvYWRMaXN0KGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSwgbm9ybWFsaXplTWFuYWdlZFVzZXJTbmFwc2hvdEZvckxvYWQoYXBwbGllZEZpbHRlcnMpKTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXNoZWV0cy10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXNoZWV0cy1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXNoZWV0cy10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImV4cGVuc2Utc2hlZXRzLXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcbiAgICB9O1xuICB9LCBbYXBwbGllZEZpbHRlcnMsIGN1cnJlbnRQYWdlLCBsb2FkTGlzdCwgbm9ybWFsaXplTWFuYWdlZFVzZXJTbmFwc2hvdEZvckxvYWQsIHNob3dGaWx0ZXJzLCB0b2dnbGVGaWx0ZXJQYW5lbF0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgIHtzaG93U3VtbWFyeSA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItY2FyZCBmaWx0ZXItY2FyZC0tc3VtbWFyeSBwLTMgc206cC00IG10LTEgbWItM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhwZW5zZS1zdW1tYXJ5LWdyaWQgZ3JpZCBncmlkLWNvbHMtMSBtaW4tWzM2MHB4XTpncmlkLWNvbHMtMiBpdGVtcy1zdGFydCBnYXAteC00IGdhcC15LTEgdGV4dC14c1wiPlxuICAgICAgICAgICAge3N1bW1hcnlJdGVtcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGtleT17YCR7aXRlbS5rZXl9LSR7aXRlbS52YWx1ZX1gfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGhpc3RvcnktZmlsdGVyLXN1bW1hcnkgaGlzdG9yeS1maWx0ZXItc3VtbWFyeS0tZ3JpZC1pdGVtIGxlYWRpbmctNSBtaW4tdy0wICR7aXRlbS5rZXkgPT09IFwibWFuYWdlZC11c2VyXCIgPyBcIm1pbi1bMzYwcHhdOmNvbC1zcGFuLTJcIiA6IFwiXCJ9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN1bW1hcnlfX2xhYmVsIGZvbnQtc2VtaWJvbGRcIj57aXRlbS5sYWJlbH06PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YGhpc3RvcnktZmlsdGVyLXN1bW1hcnlfX3ZhbHVlICR7aXRlbS5rZXkgPT09IFwibWFuYWdlZC11c2VyXCIgPyBcImJsb2NrIHRydW5jYXRlIHdoaXRlc3BhY2Utbm93cmFwXCIgOiBcImJyZWFrLXdvcmRzXCJ9YH0+XG4gICAgICAgICAgICAgICAgICB7aXRlbS52YWx1ZX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxFeHBlbnNlRmlsdGVyc1BhbmVsXG4gICAgICAgIHZpc2libGU9e3Nob3dGaWx0ZXJzfVxuICAgICAgICBzaG93TWFudWFsRGF0ZUZpbHRlcj17c2hvd01hbnVhbERhdGVGaWx0ZXJ9XG4gICAgICAgIHNob3dNYW51YWxEYXRlRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3J9XG4gICAgICAgIG1hbnVhbERhdGVBdXRvT3BlbktleT17bWFudWFsRGF0ZUF1dG9PcGVuS2V5fVxuICAgICAgICBmcm9tRGF0ZT17ZnJvbURhdGV9XG4gICAgICAgIHRvRGF0ZT17dG9EYXRlfVxuICAgICAgICBwcm9qZWN0SWQ9e3Byb2plY3RJZH1cbiAgICAgICAgaG9qYUdhc3Rvc0lkPXtob2phR2FzdG9zSWR9XG4gICAgICAgIGN1cnJlbmN5Q29kZT17Y3VycmVuY3lDb2RlfVxuICAgICAgICBtYW5hZ2VkVXNlcklkPXttYW5hZ2VkVXNlckZpbHRlclNlbGVjdFZhbHVlfVxuICAgICAgICBzaGVldExvb2t1cE1hbmFnZWRVc2VySWQ9e25vcm1hbGl6ZWRDdXJyZW50TWFuYWdlZFVzZXJGaWx0ZXJzLm1hbmFnZWRVc2VySWR9XG4gICAgICAgIGluY2x1ZGVTdWJvcmRpbmF0ZXM9e2luY2x1ZGVTdWJvcmRpbmF0ZXN9XG4gICAgICAgIG1hbmFnZWRVc2Vycz17bWFuYWdlZFVzZXJzfVxuICAgICAgICBzaG93TWFuYWdlZFVzZXJGaWx0ZXI9e3Nob3dNYW5hZ2VkVXNlckZpbHRlcn1cbiAgICAgICAgbWFuYWdlZFVzZXJGaWx0ZXJEaXNhYmxlZD17bWFuYWdlZFVzZXJGaWx0ZXJEaXNhYmxlZH1cbiAgICAgICAgbWFuYWdlZFVzZXJBbGxPcHRpb249e21hbmFnZWRVc2VyQWxsT3B0aW9ufVxuICAgICAgICBzdGF0dXNGaWx0ZXI9e3N0YXR1c0ZpbHRlcn1cbiAgICAgICAgYWN0aXZlUXVpY2tGaWx0ZXI9e2FjdGl2ZVF1aWNrRmlsdGVyfVxuICAgICAgICBvbkRhdGVSYW5nZUNoYW5nZT17b25EYXRlUmFuZ2VDaGFuZ2V9XG4gICAgICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZT17b25NYW51YWxSYW5nZUNvbXBsZXRlfVxuICAgICAgICBvblF1aWNrRmlsdGVyQ2hhbmdlPXtvblF1aWNrRmlsdGVyQ2hhbmdlfVxuICAgICAgICBvblByb2plY3RJZENoYW5nZT17c2V0UHJvamVjdElkfVxuICAgICAgICBvbkhvamFHYXN0b3NJZENoYW5nZT17c2V0SG9qYUdhc3Rvc0lkfVxuICAgICAgICBvbkN1cnJlbmN5Q29kZUNoYW5nZT17c2V0Q3VycmVuY3lDb2RlfVxuICAgICAgICBvbk1hbmFnZWRVc2VySWRDaGFuZ2U9e2hhbmRsZU1hbmFnZWRVc2VySWRDaGFuZ2V9XG4gICAgICAgIG9uU3RhdHVzRmlsdGVyQ2hhbmdlPXtzZXRTdGF0dXNGaWx0ZXJ9XG4gICAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XG4gICAgICAgIG9uQXBwbHk9e29uQXBwbHl9XG4gICAgICAvPlxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cbiAgICAgID5cbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cbiAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtlcnJvck1lc3NhZ2UgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxuXG4gICAgICB7IWlzTG9hZGluZyAmJiAhZXJyb3JNZXNzYWdlICYmIGl0ZW1zLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2luZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKX0gLz5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7IWVycm9yTWVzc2FnZSAmJiBpdGVtcy5sZW5ndGggPiAwID8gKFxuICAgICAgICA8ZGl2IHJlZj17dGltZWxpbmVDb250YWluZXJSZWZ9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveFwiPlxuICAgICAgICAgIHtpdGVtcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gc2FmZVRleHQoaXRlbS5ob2phR2FzdG9zSWQpO1xuICAgICAgICAgICAgY29uc3QgZGF0ZVBhcnRzID0gZm9ybWF0RXhwZW5zZURhdGVQYXJ0cyhcbiAgICAgICAgICAgICAgaXRlbS5jcmVhdGVkRGF0ZSxcbiAgICAgICAgICAgICAgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCIsXG4gICAgICAgICAgICAgIHsgcHJlZmVyTW9udGhGaXJzdE9uU2xhc2g6IHRydWUgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbmN5ID0gc2FmZVRleHQoaXRlbS5jdXJyZW5jeUNvZGUpO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBzYWZlVGV4dChpdGVtLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0IHZvdWNoZXIgPSBzYWZlVGV4dChpdGVtLnZvdWNoZXIpO1xuICAgICAgICAgICAgY29uc3QgdG90YWxBbW91bnRUZXh0ID0gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGl0ZW0udG90YWxBbW91bnQgPz8gbnVsbCwgY3VycmVuY3kpO1xuICAgICAgICAgICAgY29uc3QgZmFsbGJhY2tTdGF0dXNDb2RlID0gaGFzQXNzaWduZWRWb3VjaGVyKHZvdWNoZXIpID8gNCA6IDA7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNDb2RlID0gbm9ybWFsaXplRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUoaXRlbS5leHBlbnNlU2hlZXRTdGF0dXMsIGZhbGxiYWNrU3RhdHVzQ29kZSk7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNMYWJlbCA9IGdldEV4cGVuc2VTdGF0dXNMYWJlbChzdGF0dXNDb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1c0NsYXNzID0gZ2V0RXhwZW5zZVN0YXR1c0JhZGdlQ2xhc3NOYW1lKHN0YXR1c0NvZGUpO1xuICAgICAgICAgICAgY29uc3Qgb3duZXJJZCA9IHNhZmVUZXh0KGl0ZW0udXNlcklkKTtcbiAgICAgICAgICAgIGNvbnN0IG93bmVyTmFtZSA9IHNhZmVUZXh0KGl0ZW0udXNlck5hbWUpO1xuICAgICAgICAgICAgY29uc3Qgc2hvd093bmVyU3VidGl0bGUgPSBhY3RpdmVMaXN0RmlsdGVycy5pbmNsdWRlU3Vib3JkaW5hdGVzID09PSB0cnVlO1xuICAgICAgICAgICAgY29uc3Qgb3duZXJTdWJ0aXRsZSA9IHNob3dPd25lclN1YnRpdGxlICYmIG93bmVySWRcbiAgICAgICAgICAgICAgPyAob3duZXJOYW1lID8gYCR7b3duZXJOYW1lfSAoJHtvd25lcklkfSlgIDogb3duZXJJZClcbiAgICAgICAgICAgICAgOiBcIlwiO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17aWQgfHwgYCR7b3duZXJJZH0tJHt2b3VjaGVyfS0ke2l0ZW0uY3JlYXRlZERhdGV9YH0gY2xhc3NOYW1lPVwidGltZWxpbmUtaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxFeHBlbnNlVGltZWxpbmVDYXJkXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtkZXNjcmlwdGlvbiB8fCBcIi1cIn1cbiAgICAgICAgICAgICAgICAgIHN1YnRpdGxlPXtvd25lclN1YnRpdGxlfVxuICAgICAgICAgICAgICAgICAgYW1vdW50VGV4dD17dG90YWxBbW91bnRUZXh0fVxuICAgICAgICAgICAgICAgICAgb25PcGVuPXsoKSA9PiBnb1RvRGV0YWlsKGlkLCBvd25lcklkKX1cbiAgICAgICAgICAgICAgICAgIHRpdGxlQ2xhc3NOYW1lPVwiZXhwZW5zZS1zaGVldC1jYXJkX190aXRsZSB0aW1lbGluZS1uYW1lXCJcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0NsYXNzTmFtZT17c3RhdHVzQ2xhc3N9XG4gICAgICAgICAgICAgICAgICBzdGF0dXNMYWJlbD17c3RhdHVzTGFiZWx9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICA8Q29tcGFjdFBhZ2luYXRpb25cbiAgICAgICAgdG90YWxQYWdlcz17dG90YWxQYWdlc31cbiAgICAgICAgY3VycmVudFBhZ2U9e2N1cnJlbnRQYWdlfVxuICAgICAgICBsb2FkaW5nPXtpc0xvYWRpbmd9XG4gICAgICAgIG9uUGFnZUNoYW5nZT17KHBhZ2UpID0+IHtcbiAgICAgICAgICB2b2lkIGxvYWRMaXN0KHBhZ2UsIG5vcm1hbGl6ZU1hbmFnZWRVc2VyU25hcHNob3RGb3JMb2FkKGFwcGxpZWRGaWx0ZXJzIHx8IGN1cnJlbnRGaWx0ZXJzKSk7XG4gICAgICAgIH19XG4gICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cbiAgICAgIC8+XG5cbiAgICAgIHtjYW5DcmVhdGVFeHBlbnNlID8gKFxuICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b25cbiAgICAgICAgICByb3V0ZT1cIlwiXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiQ29tbW9uX0NyZWF0ZVwiLCBcIkNyZWF0ZVwiKX1cbiAgICAgICAgICBzaXplPXs3Nn1cbiAgICAgICAgICByaWdodD17MTZ9XG4gICAgICAgICAgYm90dG9tPXsyNH1cbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVPcGVuQ3JlYXRlU2hlZXRNb2RlfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2Ugc2hlZXRzIGxpc3QuXG5jb25zdCBFeHBlbnNlU2hlZXRzUGFnZSA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnMgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQ+XG4gICAgICA8RXhwZW5zZVNoZWV0c1BhZ2VDb250ZW50IC8+XG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgKTtcbn07XG5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2Utc2hlZXRzLXJvb3RcIik7XG4gIGlmICghcm9vdEVsKSByZXR1cm47XG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVNoZWV0c1BhZ2UgLz4pO1xufTtcblxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldHNQYWdlO1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlbW90ZVNlYXJjaENvbWJvYm94LCB7IHR5cGUgUmVtb3RlU2VhcmNoT3B0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9SZW1vdGVTZWFyY2hDb21ib2JveC50c3hcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGJ1aWxkRXhwZW5zZVNoZWV0U3VnZ2VzdFBheWxvYWQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVBheWxvYWRCdWlsZGVycy50c1wiO1xuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRMaXN0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcblxudHlwZSBFeHBlbnNlU2hlZXRGaWx0ZXJJbnB1dFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBtYW5hZ2VkVXNlcklkPzogc3RyaW5nO1xuICBpbmNsdWRlU3Vib3JkaW5hdGVzPzogYm9vbGVhbjtcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBlbmFibGVSZW1vdGVTdWdnZXN0aW9ucz86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xufTtcblxuY29uc3QgU0VBUkNIX1BBR0VfU0laRSA9IDIwO1xuXG5jb25zdCBmb3JtYXRTaGVldE9wdGlvblRpdGxlID0gKHNoZWV0SWQ6IHN0cmluZywgb3duZXJVc2VySWQ6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICghb3duZXJVc2VySWQpIHJldHVybiBzaGVldElkO1xuICByZXR1cm4gYCR7c2hlZXRJZH0gKCR7b3duZXJVc2VySWR9KWA7XG59O1xuXG5jb25zdCBtYXBTaGVldE9wdGlvbnMgPSAoaXRlbXM6IEV4cGVuc2VTaGVldExpc3RJdGVtRHRvW10gfCB1bmRlZmluZWQpOiBSZW1vdGVTZWFyY2hPcHRpb25bXSA9PiB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcyA6IFtdKVxuICAgIC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGlkID0gU3RyaW5nKGl0ZW0/LkhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCk7XG4gICAgICBjb25zdCBvd25lclVzZXJJZCA9IFN0cmluZyhpdGVtPy5Vc2VySWQgfHwgXCJcIikudHJpbSgpO1xuICAgICAgaWYgKCFpZCkgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogaWQsXG4gICAgICAgIHRpdGxlOiBmb3JtYXRTaGVldE9wdGlvblRpdGxlKGlkLCBvd25lclVzZXJJZCksXG4gICAgICAgIHN1YnRpdGxlOiBTdHJpbmcoaXRlbT8uRGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpIHx8IFwiLVwiLFxuICAgICAgfSBhcyBSZW1vdGVTZWFyY2hPcHRpb247XG4gICAgfSlcbiAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFJlbW90ZVNlYXJjaE9wdGlvbltdO1xufTtcblxuLy8gRXhwZW5zZSBzaGVldCBmaWx0ZXIgaW5wdXQgd2l0aCByZW1vdGUgbGlzdCBzdWdnZXN0aW9ucy5cbmNvbnN0IEV4cGVuc2VTaGVldEZpbHRlcklucHV0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgbWFuYWdlZFVzZXJJZCA9IFwiXCIsXG4gIGluY2x1ZGVTdWJvcmRpbmF0ZXMgPSBmYWxzZSxcbiAgb25DaGFuZ2UsXG4gIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zID0gdHJ1ZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbn06IEV4cGVuc2VTaGVldEZpbHRlcklucHV0UHJvcHMpID0+IHtcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XG4gIGNvbnN0IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkID0gU3RyaW5nKG1hbmFnZWRVc2VySWQgfHwgXCJcIikudHJpbSgpO1xuXG4gIGNvbnN0IGxvYWRPcHRpb25zID0gdXNlQ2FsbGJhY2soYXN5bmMgKHRlcm06IHN0cmluZywgc2lnbmFsOiBBYm9ydFNpZ25hbCk6IFByb21pc2U8UmVtb3RlU2VhcmNoT3B0aW9uW10+ID0+IHtcbiAgICBjb25zdCBwYXlsb2FkID0gYnVpbGRFeHBlbnNlU2hlZXRTdWdnZXN0UGF5bG9hZCh0ZXJtLCBTRUFSQ0hfUEFHRV9TSVpFLCAxLCBpbmNsdWRlU3Vib3JkaW5hdGVzKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0TGlzdChwYXlsb2FkLCB7XG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgIGF4VXNlcklkT3ZlcnJpZGU6IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkIHx8IHVuZGVmaW5lZCxcbiAgICAgIHNpZ25hbCxcbiAgICB9KTtcblxuICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwU2hlZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyk7XG4gIH0sIFtpbmNsdWRlU3Vib3JkaW5hdGVzLCBub3JtYWxpemVkTWFuYWdlZFVzZXJJZF0pO1xuXG4gIGNvbnN0IGxvYWRPcHRpb25zUGFnZSA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlciwgc2lnbmFsOiBBYm9ydFNpZ25hbCkgPT4ge1xuICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZEV4cGVuc2VTaGVldFN1Z2dlc3RQYXlsb2FkKHRlcm0sIHBhZ2VTaXplLCBwYWdlLCBpbmNsdWRlU3Vib3JkaW5hdGVzKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0TGlzdChwYXlsb2FkLCB7XG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgIGF4VXNlcklkT3ZlcnJpZGU6IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkIHx8IHVuZGVmaW5lZCxcbiAgICAgIHNpZ25hbCxcbiAgICB9KTtcblxuICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgdG90YWw6IDAsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogbWFwU2hlZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyksXG4gICAgICB0b3RhbDogTnVtYmVyKHJlc3BvbnNlPy5Ub3RhbCB8fCAwKSxcbiAgICB9O1xuICB9LCBbaW5jbHVkZVN1Ym9yZGluYXRlcywgbm9ybWFsaXplZE1hbmFnZWRVc2VySWRdKTtcblxuICBpZiAoIWVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zIHx8IHJlYWRPbmx5TW9kZSkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICB7c2hvd0xhYmVsID8gKFxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIiBzdHlsZT17eyBjb2xvcjogXCIjMDAyOTZiZTBcIiB9fT5cbiAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcHgtMyBweS0yIHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTkwMCBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCJcbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XG4gICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxSZW1vdGVTZWFyY2hDb21ib2JveFxuICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgb25TZWFyY2g9e2FzeW5jICh0ZXJtLCBzaWduYWwpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbG9hZE9wdGlvbnModGVybSwgc2lnbmFsKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9fVxuICAgICAgb25TZWFyY2hQYWdlPXthc3luYyAodGVybSwgcGFnZSwgcGFnZVNpemUsIHNpZ25hbCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBhd2FpdCBsb2FkT3B0aW9uc1BhZ2UodGVybSwgcGFnZSwgcGFnZVNpemUsIHNpZ25hbCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgcmV0dXJuIHsgaXRlbXM6IFtdLCB0b3RhbDogMCB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICAgIGlkQmFzZT1cImV4cGVuc2Utc2hlZXQtZmlsdGVyXCJcbiAgICAgIG1pblNlYXJjaExlbmd0aD17MH1cbiAgICAgIHBhZ2VTaXplPXtTRUFSQ0hfUEFHRV9TSVpFfVxuICAgICAgYWxsb3dFbXB0eVNlYXJjaFxuICAgICAgbG9hZE9uT3BlblxuICAgICAgaW5maW5pdGVTY3JvbGxcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxuICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXRGaWx0ZXJJbnB1dDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBERUZBVUxUX0VYUEVOU0VfU1RBVFVTX0ZJTFRFUiwgZ2V0RXhwZW5zZVN0YXR1c0ZpbHRlck9wdGlvbnMsIG5vcm1hbGl6ZUV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlU3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuXG50eXBlIEV4cGVuc2VTdGF0dXNGaWx0ZXJTZWxlY3RQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmFsdWU6IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlO1xuICBvbkNoYW5nZTogKHZhbHVlOiBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSkgPT4gdm9pZDtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG59O1xuXG4vLyBTaGFyZWQgZml4ZWQgc3RhdHVzIGZpbHRlciBzZWxlY3QgdXNpbmcgdGhlIGNhbm9uaWNhbCBzdGF0dXMgY2F0YWxvZy5cbmNvbnN0IEV4cGVuc2VTdGF0dXNGaWx0ZXJTZWxlY3QgPSAoe1xuICBsYWJlbCxcbiAgcGxhY2Vob2xkZXIsXG4gIHZhbHVlLFxuICBvbkNoYW5nZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbn06IEV4cGVuc2VTdGF0dXNGaWx0ZXJTZWxlY3RQcm9wcykgPT4ge1xuICBjb25zdCBvcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KCgpID0+IGdldEV4cGVuc2VTdGF0dXNGaWx0ZXJPcHRpb25zKCksIFtdKTtcbiAgY29uc3QgdWlWYWx1ZSA9IHZhbHVlID09PSBERUZBVUxUX0VYUEVOU0VfU1RBVFVTX0ZJTFRFUiA/IFwiXCIgOiB2YWx1ZTtcblxuICByZXR1cm4gKFxuICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgIHZhbHVlPXt1aVZhbHVlfVxuICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IG9uQ2hhbmdlKG5vcm1hbGl6ZUV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlKG5leHRWYWx1ZSwgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIpKX1cbiAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIGlkQmFzZT1cImV4cGVuc2Utc3RhdHVzLWZpbHRlclwiXG4gICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTdGF0dXNGaWx0ZXJTZWxlY3Q7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdC50c3hcIjtcbmltcG9ydCBFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyIGZyb20gXCIuL0V4cGVuc2VEYXRlUmFuZ2VGaWx0ZXIudHN4XCI7XG5pbXBvcnQgRXhwZW5zZUZpbHRlckFjdGlvbnMgZnJvbSBcIi4vRXhwZW5zZUZpbHRlckFjdGlvbnMudHN4XCI7XG5pbXBvcnQgRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdC50c3hcIjtcbmltcG9ydCBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0IGZyb20gXCIuL0V4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMgZnJvbSBcIi4vRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVNoZWV0RmlsdGVySW5wdXQgZnJvbSBcIi4vRXhwZW5zZVNoZWV0RmlsdGVySW5wdXQudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVN0YXR1c0ZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0LnRzeFwiO1xuaW1wb3J0IEhpc3RvcnlTdW1tYXJ5IGZyb20gXCIuLi8uLi92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5U3VtbWFyeS50c3hcIjtcbmltcG9ydCB0eXBlIHsgQXV0aE1hbmFnZWRVc2VyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VRdWlja0ZpbHRlcklkIH0gZnJvbSBcIi4uL2xpc3QvZXhwZW5zZUxpc3RUeXBlcy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuXG5leHBvcnQgdHlwZSB7IEV4cGVuc2VRdWlja0ZpbHRlcklkIH07XG5cbmNvbnN0IHBhcnNlSXNvRGF0ZSA9IChyYXc6IHN0cmluZyk6IERhdGUgfCBudWxsID0+IHtcbiAgaWYgKCFyYXcpIHJldHVybiBudWxsO1xuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcpLnRyaW0oKS5zcGxpdChcIlRcIilbMF07XG4gIGlmICghL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QodmFsdWUpKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gdmFsdWUuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xuICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xufTtcblxuY29uc3QgZm9ybWF0RGF0ZSA9IChyYXc6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBkYXRlID0gcGFyc2VJc29EYXRlKHJhdyk7XG4gIGlmICghZGF0ZSkgcmV0dXJuIFwiLS1cIjtcbiAgcmV0dXJuIGRhdGVcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwge1xuICAgICAgZGF5OiBcIm51bWVyaWNcIixcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICB9KVxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcbiAgICAudG9Mb3dlckNhc2UoKTtcbn07XG5cbnR5cGUgRXhwZW5zZUZpbHRlcnNQYW5lbFByb3BzID0ge1xuICB2aXNpYmxlOiBib29sZWFuO1xuICBzaG93TWFudWFsRGF0ZUZpbHRlcjogYm9vbGVhbjtcbiAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5OiBudW1iZXI7XG4gIGZyb21EYXRlOiBzdHJpbmc7XG4gIHRvRGF0ZTogc3RyaW5nO1xuICBwcm9qZWN0SWQ6IHN0cmluZztcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmc7XG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBtYW5hZ2VkVXNlcklkOiBzdHJpbmc7XG4gIHNoZWV0TG9va3VwTWFuYWdlZFVzZXJJZDogc3RyaW5nO1xuICBpbmNsdWRlU3Vib3JkaW5hdGVzOiBib29sZWFuO1xuICBtYW5hZ2VkVXNlcnM6IEF1dGhNYW5hZ2VkVXNlcltdO1xuICBzaG93TWFuYWdlZFVzZXJGaWx0ZXI6IGJvb2xlYW47XG4gIG1hbmFnZWRVc2VyRmlsdGVyRGlzYWJsZWQ6IGJvb2xlYW47XG4gIG1hbmFnZWRVc2VyQWxsT3B0aW9uPzogRXhwZW5zZVNlbGVjdE9wdGlvbiB8IG51bGw7XG4gIHN0YXR1c0ZpbHRlcjogRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGU7XG4gIGFjdGl2ZVF1aWNrRmlsdGVyOiBFeHBlbnNlUXVpY2tGaWx0ZXJJZCB8IG51bGw7XG4gIHNob3dNYW51YWxEYXRlRXJyb3I6IGJvb2xlYW47XG4gIG9uRGF0ZVJhbmdlQ2hhbmdlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uTWFudWFsUmFuZ2VDb21wbGV0ZTogKGZyb21EYXRlOiBzdHJpbmcsIHRvRGF0ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvblF1aWNrRmlsdGVyQ2hhbmdlOiAoZmlsdGVySWQ6IEV4cGVuc2VRdWlja0ZpbHRlcklkKSA9PiB2b2lkO1xuICBvblByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uSG9qYUdhc3Rvc0lkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbk1hbmFnZWRVc2VySWRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvblN0YXR1c0ZpbHRlckNoYW5nZTogKHZhbHVlOiBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSkgPT4gdm9pZDtcbiAgb25DbGVhcjogKCkgPT4gdm9pZDtcbiAgb25BcHBseTogKCkgPT4gdm9pZDtcbn07XG5cbi8vIFNoYXJlZCBleHBlbnNlIHNoZWV0IGZpbHRlciBwYW5lbCBjb21wb3NlZCBmcm9tIHJldXNhYmxlIG1vZHVsZSBjb21wb25lbnRzLlxuY29uc3QgRXhwZW5zZUZpbHRlcnNQYW5lbCA9ICh7XG4gIHZpc2libGUsXG4gIHNob3dNYW51YWxEYXRlRmlsdGVyLFxuICBtYW51YWxEYXRlQXV0b09wZW5LZXksXG4gIGZyb21EYXRlLFxuICB0b0RhdGUsXG4gIHByb2plY3RJZCxcbiAgaG9qYUdhc3Rvc0lkLFxuICBjdXJyZW5jeUNvZGUsXG4gIG1hbmFnZWRVc2VySWQsXG4gIHNoZWV0TG9va3VwTWFuYWdlZFVzZXJJZCxcbiAgaW5jbHVkZVN1Ym9yZGluYXRlcyxcbiAgbWFuYWdlZFVzZXJzLFxuICBzaG93TWFuYWdlZFVzZXJGaWx0ZXIsXG4gIG1hbmFnZWRVc2VyRmlsdGVyRGlzYWJsZWQsXG4gIG1hbmFnZWRVc2VyQWxsT3B0aW9uID0gbnVsbCxcbiAgc3RhdHVzRmlsdGVyLFxuICBhY3RpdmVRdWlja0ZpbHRlcixcbiAgc2hvd01hbnVhbERhdGVFcnJvcixcbiAgb25EYXRlUmFuZ2VDaGFuZ2UsXG4gIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcbiAgb25RdWlja0ZpbHRlckNoYW5nZSxcbiAgb25Qcm9qZWN0SWRDaGFuZ2UsXG4gIG9uSG9qYUdhc3Rvc0lkQ2hhbmdlLFxuICBvbkN1cnJlbmN5Q29kZUNoYW5nZSxcbiAgb25NYW5hZ2VkVXNlcklkQ2hhbmdlLFxuICBvblN0YXR1c0ZpbHRlckNoYW5nZSxcbiAgb25DbGVhcixcbiAgb25BcHBseSxcbn06IEV4cGVuc2VGaWx0ZXJzUGFuZWxQcm9wcykgPT4ge1xuICBpZiAoIXZpc2libGUpIHJldHVybiBudWxsO1xuICBjb25zdCBsb2NhbGUgPSBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIjtcbiAgY29uc3Qgc2hvd0lubGluZURhdGVTdW1tYXJ5ID0gIXNob3dNYW51YWxEYXRlRmlsdGVyICYmICEhZnJvbURhdGUgJiYgISF0b0RhdGU7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1leHBhbmRlZCBwLTIgc206cC0yLjUgcmVsYXRpdmVcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3RhY2sgZmxleCBmbGV4LWNvbCBzcGFjZS15LTJcIj5cbiAgICAgICAgPEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJzIGFjdGl2ZVF1aWNrRmlsdGVyPXthY3RpdmVRdWlja0ZpbHRlcn0gb25RdWlja0ZpbHRlckNoYW5nZT17b25RdWlja0ZpbHRlckNoYW5nZX0gLz5cblxuICAgICAgICB7c2hvd01hbnVhbERhdGVGaWx0ZXIgPyAoXG4gICAgICAgICAgPEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXJcbiAgICAgICAgICAgIGZyb21EYXRlPXtmcm9tRGF0ZX1cbiAgICAgICAgICAgIHRvRGF0ZT17dG9EYXRlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRGF0ZVJhbmdlQ2hhbmdlfVxuICAgICAgICAgICAgb25SYW5nZUNvbXBsZXRlPXtvbk1hbnVhbFJhbmdlQ29tcGxldGV9XG4gICAgICAgICAgICBhdXRvT3BlblJlcXVlc3RJZD17bWFudWFsRGF0ZUF1dG9PcGVuS2V5fVxuICAgICAgICAgICAgc2hvd01hbnVhbEVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yfVxuICAgICAgICAgICAgc2hvd1N0YXJ0RXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3IgJiYgIWZyb21EYXRlfVxuICAgICAgICAgICAgc2hvd0VuZEVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yICYmICF0b0RhdGV9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IHNob3dJbmxpbmVEYXRlU3VtbWFyeSA/IChcbiAgICAgICAgICA8SGlzdG9yeVN1bW1hcnlcbiAgICAgICAgICAgIHN1bW1hcnlGcm9tTGFiZWw9e2luZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpfVxuICAgICAgICAgICAgc3VtbWFyeVRvTGFiZWw9e2luZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIil9XG4gICAgICAgICAgICBmcm9tVmFsdWU9e2Zvcm1hdERhdGUoZnJvbURhdGUsIGxvY2FsZSl9XG4gICAgICAgICAgICB0b1ZhbHVlPXtmb3JtYXREYXRlKHRvRGF0ZSwgbG9jYWxlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImdhcC15LTEgdGV4dC1bMTFweF0gcHgtMVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yICR7c2hvd01hbmFnZWRVc2VyRmlsdGVyID8gXCJsZzpncmlkLWNvbHMtNVwiIDogXCJsZzpncmlkLWNvbHMtNFwifSBnYXAtMmB9PlxuICAgICAgICAgIHtzaG93TWFuYWdlZFVzZXJGaWx0ZXIgPyAoXG4gICAgICAgICAgICA8RXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0XG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfVXNlclwiLCBcIlVzZXJcIil9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfVXNlclwiLCBcIlVzZXJcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXttYW5hZ2VkVXNlcklkfVxuICAgICAgICAgICAgICB1c2Vycz17bWFuYWdlZFVzZXJzfVxuICAgICAgICAgICAgICBhbGxPcHRpb249e21hbmFnZWRVc2VyQWxsT3B0aW9ufVxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25NYW5hZ2VkVXNlcklkQ2hhbmdlfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17bWFuYWdlZFVzZXJGaWx0ZXJEaXNhYmxlZH1cbiAgICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgICAgY2xlYXJPbkVtcHR5SW5wdXRcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICA8RXhwZW5zZVNoZWV0RmlsdGVySW5wdXRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU2hlZXRcIiwgXCJFeHBlbnNlIHNoZWV0XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TaGVldFwiLCBcIkV4cGVuc2Ugc2hlZXRcIil9XG4gICAgICAgICAgICB2YWx1ZT17aG9qYUdhc3Rvc0lkfVxuICAgICAgICAgICAgbWFuYWdlZFVzZXJJZD17c2hlZXRMb29rdXBNYW5hZ2VkVXNlcklkfVxuICAgICAgICAgICAgaW5jbHVkZVN1Ym9yZGluYXRlcz17aW5jbHVkZVN1Ym9yZGluYXRlc31cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkhvamFHYXN0b3NJZENoYW5nZX1cbiAgICAgICAgICAgIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8RXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfUHJvamVjdFwiLCBcIlByb2plY3RcIil9XG4gICAgICAgICAgICB2YWx1ZT17cHJvamVjdElkfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uUHJvamVjdElkQ2hhbmdlfVxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgdmFsdWU9e2N1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkN1cnJlbmN5Q29kZUNoYW5nZX1cbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICBzaG93TG9hZGluZ1N0YXRlVGV4dD17ZmFsc2V9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxFeHBlbnNlU3RhdHVzRmlsdGVyU2VsZWN0XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1N0YXR1c1wiLCBcIkVzdGFkb1wiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzX1BsYWNlaG9sZGVyXCIsIFwiRXN0YWRvXCIpfVxuICAgICAgICAgICAgdmFsdWU9e3N0YXR1c0ZpbHRlcn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvblN0YXR1c0ZpbHRlckNoYW5nZX1cbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPEV4cGVuc2VGaWx0ZXJBY3Rpb25zXG4gICAgICAgICAgY2xlYXJMYWJlbD17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsZWFyXCIsIFwiQ2xlYXJcIil9XG4gICAgICAgICAgYXBwbHlMYWJlbD17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0FwcGx5XCIsIFwiQXBwbHlcIil9XG4gICAgICAgICAgb25DbGVhcj17b25DbGVhcn1cbiAgICAgICAgICBvbkFwcGx5PXtvbkFwcGx5fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlRmlsdGVyc1BhbmVsO1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0Q2FyZCwgRXhwZW5zZVNoZWV0TGlzdEZpbHRlcnMgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBidWlsZEV4cGVuc2VMaXN0UGF5bG9hZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlUGF5bG9hZEJ1aWxkZXJzLnRzXCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldExpc3QsIG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcblxudHlwZSBVc2VFeHBlbnNlU2hlZXRzTGlzdERhdGFBcmdzID0ge1xuICBoYXNBY2Nlc3M6IGJvb2xlYW47XG4gIHBhZ2VTaXplOiBudW1iZXI7XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gT3ducyBsaXN0IGRhdGEgZmV0Y2gsIGxvYWRpbmcgc3RhdGUsIGFuZCBwYWdpbmF0aW9uIG1ldGFkYXRhLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldHNMaXN0RGF0YSA9ICh7IGhhc0FjY2VzcywgcGFnZVNpemUsIG9uRm9yYmlkZGVuIH06IFVzZUV4cGVuc2VTaGVldHNMaXN0RGF0YUFyZ3MpID0+IHtcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRDYXJkW10+KFtdKTtcbiAgY29uc3QgW3RvdGFsLCBzZXRUb3RhbF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2N1cnJlbnRQYWdlLCBzZXRDdXJyZW50UGFnZV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIGNvbnN0IHJlc3RvcmVMaXN0U25hcHNob3QgPSB1c2VDYWxsYmFjayhcbiAgICAoc25hcHNob3Q6IHsgaXRlbXM6IEV4cGVuc2VTaGVldENhcmRbXTsgdG90YWw6IG51bWJlcjsgcGFnZTogbnVtYmVyIH0pID0+IHtcbiAgICAgIGNvbnN0IHNhZmVJdGVtcyA9IEFycmF5LmlzQXJyYXkoc25hcHNob3QuaXRlbXMpID8gc25hcHNob3QuaXRlbXMgOiBbXTtcbiAgICAgIGNvbnN0IHNhZmVUb3RhbFJhdyA9IE51bWJlcihzbmFwc2hvdC50b3RhbCk7XG4gICAgICBjb25zdCBzYWZlVG90YWwgPSBOdW1iZXIuaXNGaW5pdGUoc2FmZVRvdGFsUmF3KSAmJiBzYWZlVG90YWxSYXcgPj0gMCA/IHNhZmVUb3RhbFJhdyA6IHNhZmVJdGVtcy5sZW5ndGg7XG4gICAgICBjb25zdCBzYWZlUGFnZVJhdyA9IE51bWJlcihzbmFwc2hvdC5wYWdlKTtcbiAgICAgIGNvbnN0IHNhZmVQYWdlID0gTnVtYmVyLmlzRmluaXRlKHNhZmVQYWdlUmF3KSAmJiBzYWZlUGFnZVJhdyA+IDAgPyBNYXRoLmZsb29yKHNhZmVQYWdlUmF3KSA6IDE7XG5cbiAgICAgIHNldEl0ZW1zKHNhZmVJdGVtcyk7XG4gICAgICBzZXRUb3RhbChzYWZlVG90YWwpO1xuICAgICAgc2V0Q3VycmVudFBhZ2Uoc2FmZVBhZ2UpO1xuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICB9LFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgbG9hZExpc3QgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAocGFnZTogbnVtYmVyLCBmaWx0ZXJzOiBFeHBlbnNlU2hlZXRMaXN0RmlsdGVycykgPT4ge1xuICAgICAgaWYgKCFoYXNBY2Nlc3MpIHtcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgICBjb25zdCBwYXlsb2FkID0gYnVpbGRFeHBlbnNlTGlzdFBheWxvYWQoZmlsdGVycywgcGFnZSwgcGFnZVNpemUpO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkID0gU3RyaW5nKGZpbHRlcnM/Lm1hbmFnZWRVc2VySWQgfHwgXCJcIikudHJpbSgpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0TGlzdChwYXlsb2FkLCB7XG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgYXhVc2VySWRPdmVycmlkZTogc2VsZWN0ZWRNYW5hZ2VkVXNlcklkIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXRzLlwiKSk7XG4gICAgICAgICAgc2V0SXRlbXMoW10pO1xuICAgICAgICAgIHNldFRvdGFsKDApO1xuICAgICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5leHRJdGVtcyA9IChBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdKS5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQoaXRlbSlcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgbmV4dFRvdGFsID0gTnVtYmVyKHJlc3BvbnNlPy5Ub3RhbCA/PyBuZXh0SXRlbXMubGVuZ3RoID8/IDApO1xuICAgICAgICBzZXRJdGVtcyhuZXh0SXRlbXMpO1xuICAgICAgICBzZXRUb3RhbChuZXh0VG90YWwpO1xuICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXRzLlwiKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICAgIHNldFRvdGFsKDApO1xuICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbaGFzQWNjZXNzLCBvbkZvcmJpZGRlbiwgcGFnZVNpemVdXG4gICk7XG5cbiAgY29uc3QgcmVzZXRMaXN0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEl0ZW1zKFtdKTtcbiAgICBzZXRUb3RhbCgwKTtcbiAgICBzZXRDdXJyZW50UGFnZSgxKTtcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIGl0ZW1zLFxuICAgIHRvdGFsLFxuICAgIGN1cnJlbnRQYWdlLFxuICAgIGlzTG9hZGluZyxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgbG9hZExpc3QsXG4gICAgcmVzdG9yZUxpc3RTbmFwc2hvdCxcbiAgICByZXNldExpc3QsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlUXVpY2tGaWx0ZXJJZCwgQXBwbGllZEZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZUxpc3RUeXBlcy50c1wiO1xuaW1wb3J0IHsgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgc3RhcnRPZkRheSwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBub3JtYWxpemVFeHBlbnNlRmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi9leHBlbnNlRmlsdGVyU25hcHNob3QudHNcIjtcblxudHlwZSBVc2VFeHBlbnNlU2hlZXRzRmlsdGVyc1N0YXRlQXJncyA9IHtcbiAgb25BcHBseUZpbHRlcnM6IChzbmFwc2hvdDogQXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB2b2lkO1xuICBvbkNsZWFyRmlsdGVyczogKCkgPT4gdm9pZDtcbiAgZGVmYXVsdE1hbmFnZWRVc2VySWQ6IHN0cmluZztcbn07XG5cbi8vIE93bnMgZmlsdGVyIFVJIHN0YXRlIGFuZCBhcHBseS9jbGVhciBydWxlcyBmb3IgZXhwZW5zZSBsaXN0IHBhZ2UuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0c0ZpbHRlcnNTdGF0ZSA9ICh7XG4gIG9uQXBwbHlGaWx0ZXJzLFxuICBvbkNsZWFyRmlsdGVycyxcbiAgZGVmYXVsdE1hbmFnZWRVc2VySWQsXG59OiBVc2VFeHBlbnNlU2hlZXRzRmlsdGVyc1N0YXRlQXJncykgPT4ge1xuICBjb25zdCBbZnJvbURhdGUsIHNldEZyb21EYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbdG9EYXRlLCBzZXRUb0RhdGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtwcm9qZWN0SWQsIHNldFByb2plY3RJZF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2hvamFHYXN0b3NJZCwgc2V0SG9qYUdhc3Rvc0lkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbY3VycmVuY3lDb2RlLCBzZXRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYW5hZ2VkVXNlcklkLCBzZXRNYW5hZ2VkVXNlcklkXSA9IHVzZVN0YXRlKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcbiAgY29uc3QgW2luY2x1ZGVTdWJvcmRpbmF0ZXMsIHNldEluY2x1ZGVTdWJvcmRpbmF0ZXNdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc3RhdHVzRmlsdGVyLCBzZXRTdGF0dXNGaWx0ZXJdID0gdXNlU3RhdGU8RXhwZW5zZVN0YXR1c0ZpbHRlckNvZGU+KERFRkFVTFRfRVhQRU5TRV9TVEFUVVNfRklMVEVSKTtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlTW9kZSA9IG51bGw7XG4gIGNvbnN0IFthY3RpdmVRdWlja0ZpbHRlciwgc2V0QWN0aXZlUXVpY2tGaWx0ZXJdID0gdXNlU3RhdGU8RXhwZW5zZVF1aWNrRmlsdGVySWQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3Nob3dNYW51YWxEYXRlRmlsdGVyLCBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93TWFudWFsRGF0ZUVycm9yLCBzZXRTaG93TWFudWFsRGF0ZUVycm9yXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW21hbnVhbERhdGVBdXRvT3BlbktleSwgc2V0TWFudWFsRGF0ZUF1dG9PcGVuS2V5XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbYXBwbGllZEZpbHRlcnMsIHNldEFwcGxpZWRGaWx0ZXJzXSA9IHVzZVN0YXRlPEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd0ZpbHRlcnMsIHNldFNob3dGaWx0ZXJzXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIGNvbnN0IGN1cnJlbnRGaWx0ZXJzID0gdXNlTWVtbzxBcHBsaWVkRmlsdGVyU25hcHNob3Q+KFxuICAgICgpID0+ICh7XG4gICAgICBmcm9tRGF0ZSxcbiAgICAgIHRvRGF0ZSxcbiAgICAgIHByb2plY3RJZCxcbiAgICAgIGhvamFHYXN0b3NJZCxcbiAgICAgIGN1cnJlbmN5Q29kZSxcbiAgICAgIG1hbmFnZWRVc2VySWQ6IFN0cmluZyhtYW5hZ2VkVXNlcklkIHx8IGRlZmF1bHRNYW5hZ2VkVXNlcklkKS50cmltKCksXG4gICAgICBpbmNsdWRlU3Vib3JkaW5hdGVzLFxuICAgICAgc3RhdHVzRmlsdGVyLFxuICAgICAgZXhjaGFuZ2VSYXRlTW9kZSxcbiAgICAgIGZpbHRlcjogaG9qYUdhc3Rvc0lkLFxuICAgIH0pLFxuICAgIFtjdXJyZW5jeUNvZGUsIGRlZmF1bHRNYW5hZ2VkVXNlcklkLCBmcm9tRGF0ZSwgaG9qYUdhc3Rvc0lkLCBpbmNsdWRlU3Vib3JkaW5hdGVzLCBtYW5hZ2VkVXNlcklkLCBwcm9qZWN0SWQsIHN0YXR1c0ZpbHRlciwgdG9EYXRlXVxuICApO1xuXG4gIGNvbnN0IG9uQXBwbHkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFmcm9tRGF0ZSB8fCAhdG9EYXRlKSB7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKHRydWUpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIodHJ1ZSk7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzbmFwc2hvdDogQXBwbGllZEZpbHRlclNuYXBzaG90ID0ge1xuICAgICAgZnJvbURhdGUsXG4gICAgICB0b0RhdGUsXG4gICAgICBwcm9qZWN0SWQsXG4gICAgICBob2phR2FzdG9zSWQsXG4gICAgICBjdXJyZW5jeUNvZGUsXG4gICAgICBtYW5hZ2VkVXNlcklkOiBTdHJpbmcobWFuYWdlZFVzZXJJZCB8fCBkZWZhdWx0TWFuYWdlZFVzZXJJZCkudHJpbSgpLFxuICAgICAgaW5jbHVkZVN1Ym9yZGluYXRlcyxcbiAgICAgIHN0YXR1c0ZpbHRlcixcbiAgICAgIGV4Y2hhbmdlUmF0ZU1vZGUsXG4gICAgICBmaWx0ZXI6IGhvamFHYXN0b3NJZCxcbiAgICB9O1xuXG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgc2V0QXBwbGllZEZpbHRlcnMoc25hcHNob3QpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XG4gICAgb25BcHBseUZpbHRlcnMoc25hcHNob3QpO1xuICB9LCBbY3VycmVuY3lDb2RlLCBkZWZhdWx0TWFuYWdlZFVzZXJJZCwgZnJvbURhdGUsIGhvamFHYXN0b3NJZCwgaW5jbHVkZVN1Ym9yZGluYXRlcywgbWFuYWdlZFVzZXJJZCwgb25BcHBseUZpbHRlcnMsIHByb2plY3RJZCwgc3RhdHVzRmlsdGVyLCB0b0RhdGVdKTtcblxuICAvLyBSZWh5ZHJhdGVzIHRoZSBsaXN0IGZpbHRlcnMgZnJvbSBhIGNhY2hlZCBzbmFwc2hvdCB3aGVuIHJldHVybmluZyBmcm9tIGRldGFpbC5cbiAgY29uc3QgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzID0gdXNlQ2FsbGJhY2soKHNuYXBzaG90OiBBcHBsaWVkRmlsdGVyU25hcHNob3QpID0+IHtcbiAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZUZpbHRlclNuYXBzaG90KHNuYXBzaG90KTtcbiAgICBjb25zdCByZXN0b3JlZE1hbmFnZWRVc2VySWQgPSBTdHJpbmcobm9ybWFsaXplZC5tYW5hZ2VkVXNlcklkIHx8IGRlZmF1bHRNYW5hZ2VkVXNlcklkKS50cmltKCk7XG4gICAgc2V0RnJvbURhdGUobm9ybWFsaXplZC5mcm9tRGF0ZSk7XG4gICAgc2V0VG9EYXRlKG5vcm1hbGl6ZWQudG9EYXRlKTtcbiAgICBzZXRQcm9qZWN0SWQobm9ybWFsaXplZC5wcm9qZWN0SWQpO1xuICAgIHNldEhvamFHYXN0b3NJZChub3JtYWxpemVkLmhvamFHYXN0b3NJZCk7XG4gICAgc2V0Q3VycmVuY3lDb2RlKG5vcm1hbGl6ZWQuY3VycmVuY3lDb2RlKTtcbiAgICBzZXRNYW5hZ2VkVXNlcklkKHJlc3RvcmVkTWFuYWdlZFVzZXJJZCk7XG4gICAgc2V0SW5jbHVkZVN1Ym9yZGluYXRlcyhub3JtYWxpemVkLmluY2x1ZGVTdWJvcmRpbmF0ZXMgPT09IHRydWUpO1xuICAgIHNldFN0YXR1c0ZpbHRlcihub3JtYWxpemVkLnN0YXR1c0ZpbHRlcik7XG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgIHNldEFwcGxpZWRGaWx0ZXJzKHtcbiAgICAgIC4uLm5vcm1hbGl6ZWQsXG4gICAgICBtYW5hZ2VkVXNlcklkOiByZXN0b3JlZE1hbmFnZWRVc2VySWQsXG4gICAgfSk7XG4gICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICB9LCBbZGVmYXVsdE1hbmFnZWRVc2VySWRdKTtcblxuICBjb25zdCBvbkNsZWFyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEZyb21EYXRlKFwiXCIpO1xuICAgIHNldFRvRGF0ZShcIlwiKTtcbiAgICBzZXRQcm9qZWN0SWQoXCJcIik7XG4gICAgc2V0SG9qYUdhc3Rvc0lkKFwiXCIpO1xuICAgIHNldEN1cnJlbmN5Q29kZShcIlwiKTtcbiAgICBzZXRNYW5hZ2VkVXNlcklkKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcbiAgICBzZXRJbmNsdWRlU3Vib3JkaW5hdGVzKGZhbHNlKTtcbiAgICBzZXRTdGF0dXNGaWx0ZXIoREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXkoMCk7XG4gICAgc2V0QXBwbGllZEZpbHRlcnMobnVsbCk7XG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gICAgb25DbGVhckZpbHRlcnMoKTtcbiAgfSwgW2RlZmF1bHRNYW5hZ2VkVXNlcklkLCBvbkNsZWFyRmlsdGVyc10pO1xuXG4gIGNvbnN0IG9uRGF0ZVJhbmdlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXG4gICAgKG5leHRGcm9tRGF0ZTogc3RyaW5nLCBuZXh0VG9EYXRlOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGhhc0Z1bGxSYW5nZSA9ICEhbmV4dEZyb21EYXRlICYmICEhbmV4dFRvRGF0ZTtcbiAgICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XG4gICAgICBzZXRUb0RhdGUobmV4dFRvRGF0ZSk7XG4gICAgICBpZiAoIWhhc0Z1bGxSYW5nZSkge1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcbiAgICAgIH1cbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgaWYgKHNob3dNYW51YWxEYXRlRXJyb3IpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcighaGFzRnVsbFJhbmdlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtzaG93TWFudWFsRGF0ZUVycm9yXVxuICApO1xuXG4gIC8vIENsb3NlcyB0aGUgbWFudWFsIGRhdGUgVUkgb25jZSB0aGUgdXNlciBmaW5pc2hlcyBzZWxlY3RpbmcgYSBmdWxsIHJhbmdlLlxuICBjb25zdCBvbk1hbnVhbFJhbmdlQ29tcGxldGUgPSB1c2VDYWxsYmFjaygobmV4dEZyb21EYXRlOiBzdHJpbmcsIG5leHRUb0RhdGU6IHN0cmluZykgPT4ge1xuICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XG4gICAgc2V0VG9EYXRlKG5leHRUb0RhdGUpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG9uUXVpY2tGaWx0ZXJDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAoZmlsdGVySWQ6IEV4cGVuc2VRdWlja0ZpbHRlcklkKSA9PiB7XG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiY3VzdG9tXCIpIHtcbiAgICAgICAgLy8gVG9nZ2xlIG1hbnVhbCBkYXRlIGNvbnRyb2xzIG9uIGV2ZXJ5IERhdGUgYnV0dG9uIGNsaWNrLlxuICAgICAgICBpZiAoc2hvd01hbnVhbERhdGVGaWx0ZXIpIHtcbiAgICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKHRydWUpO1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICAgICAgLy8gQWx3YXlzIGFzayB0aGUgZGF0ZSBjb21wb25lbnQgdG8gb3BlbiB0aGUgY2FsZW5kYXIgd2hlbiBEYXRlIGlzIHByZXNzZWQuXG4gICAgICAgIHNldE1hbnVhbERhdGVBdXRvT3BlbktleSgocHJldmlvdXMpID0+IHByZXZpb3VzICsgMSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoZmlsdGVySWQpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG5cbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcbiAgICAgIGNvbnN0IG5leHRGcm9tID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtN1wiKSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gNik7XG4gICAgICB9IGVsc2UgaWYgKGZpbHRlcklkID09PSBcImRheXMtMzBcIikge1xuICAgICAgICBuZXh0RnJvbS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDI5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gODkpO1xuICAgICAgfVxuXG4gICAgICBzZXRGcm9tRGF0ZSh0b0lzb0RhdGUobmV4dEZyb20pKTtcbiAgICAgIHNldFRvRGF0ZSh0b0lzb0RhdGUodG9kYXkpKTtcbiAgICB9LFxuICAgIFtzaG93TWFudWFsRGF0ZUZpbHRlcl1cbiAgKTtcblxuICBjb25zdCB0b2dnbGVGaWx0ZXJQYW5lbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRTaG93RmlsdGVycygocHJldmlvdXMpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSAhcHJldmlvdXM7XG4gICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIGZyb21EYXRlLFxuICAgIHRvRGF0ZSxcbiAgICBwcm9qZWN0SWQsXG4gICAgaG9qYUdhc3Rvc0lkLFxuICAgIGN1cnJlbmN5Q29kZSxcbiAgICBtYW5hZ2VkVXNlcklkLFxuICAgIGluY2x1ZGVTdWJvcmRpbmF0ZXMsXG4gICAgc3RhdHVzRmlsdGVyLFxuICAgIGV4Y2hhbmdlUmF0ZU1vZGUsXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVFcnJvcixcbiAgICBtYW51YWxEYXRlQXV0b09wZW5LZXksXG4gICAgYXBwbGllZEZpbHRlcnMsXG4gICAgc2hvd0ZpbHRlcnMsXG4gICAgY3VycmVudEZpbHRlcnMsXG4gICAgc2V0UHJvamVjdElkLFxuICAgIHNldEhvamFHYXN0b3NJZCxcbiAgICBzZXRDdXJyZW5jeUNvZGUsXG4gICAgc2V0TWFuYWdlZFVzZXJJZCxcbiAgICBzZXRJbmNsdWRlU3Vib3JkaW5hdGVzLFxuICAgIHNldFN0YXR1c0ZpbHRlcixcbiAgICBvbkFwcGx5LFxuICAgIG9uQ2xlYXIsXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlLFxuICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcbiAgICBvblF1aWNrRmlsdGVyQ2hhbmdlLFxuICAgIHRvZ2dsZUZpbHRlclBhbmVsLFxuICB9O1xufTtcbiIsICJpbXBvcnQgdHlwZSB7IEF1dGhNYW5hZ2VkVXNlciB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xuXG5leHBvcnQgY29uc3QgRVhQRU5TRV9TSEVFVFNfQUxMX1VTRVJTX1ZBTFVFID0gXCJfX2V4cGVuc2Vfc2hlZXRzX2FsbF91c2Vyc19fXCI7XG5cbmNvbnN0IG5vcm1hbGl6ZVVzZXJJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xuXG4vLyBDb21wYXJlcyBBeCB1c2VyIGlkcyB3aXRoIHN0YWJsZSB0cmltbWluZyBhbmQgY2FzaW5nLlxuZXhwb3J0IGNvbnN0IGlzU2FtZUV4cGVuc2VNYW5hZ2VkVXNlciA9IChsZWZ0OiB1bmtub3duLCByaWdodDogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkTGVmdCA9IG5vcm1hbGl6ZVVzZXJJZChsZWZ0KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBub3JtYWxpemVkUmlnaHQgPSBub3JtYWxpemVVc2VySWQocmlnaHQpLnRvVXBwZXJDYXNlKCk7XG4gIHJldHVybiAhIW5vcm1hbGl6ZWRMZWZ0ICYmIG5vcm1hbGl6ZWRMZWZ0ID09PSBub3JtYWxpemVkUmlnaHQ7XG59O1xuXG4vLyBFbnN1cmVzIHRoZSBjdXJyZW50IHVzZXIgcmVtYWlucyBzZWxlY3RhYmxlIHRvZ2V0aGVyIHdpdGggZGlyZWN0IHN1Ym9yZGluYXRlcy5cbmV4cG9ydCBjb25zdCBlbnN1cmVDdXJyZW50RXhwZW5zZU1hbmFnZWRVc2VySW5MaXN0ID0gKFxuICB1c2VyczogQXV0aE1hbmFnZWRVc2VyW10sXG4gIGN1cnJlbnRBeFVzZXJJZDogdW5rbm93blxuKTogQXV0aE1hbmFnZWRVc2VyW10gPT4ge1xuICBjb25zdCBub3JtYWxpemVkQ3VycmVudCA9IG5vcm1hbGl6ZVVzZXJJZChjdXJyZW50QXhVc2VySWQpO1xuICBjb25zdCBub3JtYWxpemVkVXNlcnMgPSBBcnJheS5pc0FycmF5KHVzZXJzKSA/IHVzZXJzIDogW107XG4gIGlmICghbm9ybWFsaXplZEN1cnJlbnQpIHJldHVybiBub3JtYWxpemVkVXNlcnM7XG4gIGlmIChub3JtYWxpemVkVXNlcnMuc29tZSgoZW50cnkpID0+IGlzU2FtZUV4cGVuc2VNYW5hZ2VkVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZEN1cnJlbnQpKSkge1xuICAgIHJldHVybiBub3JtYWxpemVkVXNlcnM7XG4gIH1cblxuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIGNybVVzZXJJZDogbm9ybWFsaXplZEN1cnJlbnQsXG4gICAgICBheFVzZXJJZDogbm9ybWFsaXplZEN1cnJlbnQsXG4gICAgICBuYW1lOiBub3JtYWxpemVkQ3VycmVudCxcbiAgICB9LFxuICAgIC4uLm5vcm1hbGl6ZWRVc2VycyxcbiAgXTtcbn07XG5cbi8vIFJlc29sdmVzIGEgdmFsaWQgdXNlciBzZWxlY3Rpb24gZnJvbSB0aGUgYXZhaWxhYmxlIHVzZXIgbGlzdCBhbmQgY3VycmVudCBjb250ZXh0LlxuZXhwb3J0IGNvbnN0IHJlc29sdmVFeHBlbnNlTWFuYWdlZFVzZXJTZWxlY3Rpb24gPSAoXG4gIHJlcXVlc3RlZFVzZXJJZDogdW5rbm93bixcbiAgY3VycmVudEF4VXNlcklkOiB1bmtub3duLFxuICB1c2VyczogQXV0aE1hbmFnZWRVc2VyW11cbik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRSZXF1ZXN0ZWQgPSBub3JtYWxpemVVc2VySWQocmVxdWVzdGVkVXNlcklkKTtcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnQgPSBub3JtYWxpemVVc2VySWQoY3VycmVudEF4VXNlcklkKTtcblxuICBpZiAobm9ybWFsaXplZFJlcXVlc3RlZCkge1xuICAgIGNvbnN0IGV4YWN0ID0gdXNlcnMuZmluZCgoZW50cnkpID0+IGlzU2FtZUV4cGVuc2VNYW5hZ2VkVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZFJlcXVlc3RlZCkpO1xuICAgIGlmIChleGFjdCkgcmV0dXJuIGV4YWN0LmF4VXNlcklkO1xuICB9XG5cbiAgaWYgKG5vcm1hbGl6ZWRDdXJyZW50KSB7XG4gICAgY29uc3Qgc2VsZiA9IHVzZXJzLmZpbmQoKGVudHJ5KSA9PiBpc1NhbWVFeHBlbnNlTWFuYWdlZFVzZXIoZW50cnkuYXhVc2VySWQsIG5vcm1hbGl6ZWRDdXJyZW50KSk7XG4gICAgcmV0dXJuIHNlbGY/LmF4VXNlcklkIHx8IG5vcm1hbGl6ZWRDdXJyZW50O1xuICB9XG5cbiAgcmV0dXJuIFwiXCI7XG59O1xuXG50eXBlIE5vcm1hbGl6ZUV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclN0YXRlQXJncyA9IHtcbiAgbWFuYWdlZFVzZXJJZDogdW5rbm93bjtcbiAgaW5jbHVkZVN1Ym9yZGluYXRlczogdW5rbm93bjtcbiAgY3VycmVudEF4VXNlcklkOiB1bmtub3duO1xuICB1c2VyczogQXV0aE1hbmFnZWRVc2VyW107XG4gIGNhbk1hbmFnZU90aGVyVXNlcnM6IGJvb2xlYW47XG59O1xuXG4vLyBLZWVwcyB1c2VyIGZpbHRlciBzdGF0ZSBhbGlnbmVkIHdpdGggY3VycmVudCBjb250ZXh0IGFuZCBzdWJvcmRpbmF0ZSBhY2Nlc3MuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU3RhdGUgPSAoe1xuICBtYW5hZ2VkVXNlcklkLFxuICBpbmNsdWRlU3Vib3JkaW5hdGVzLFxuICBjdXJyZW50QXhVc2VySWQsXG4gIHVzZXJzLFxuICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxufTogTm9ybWFsaXplRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU3RhdGVBcmdzKTogeyBtYW5hZ2VkVXNlcklkOiBzdHJpbmc7IGluY2x1ZGVTdWJvcmRpbmF0ZXM6IGJvb2xlYW4gfSA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRVc2VycyA9IGVuc3VyZUN1cnJlbnRFeHBlbnNlTWFuYWdlZFVzZXJJbkxpc3QodXNlcnMsIGN1cnJlbnRBeFVzZXJJZCk7XG4gIGNvbnN0IHJlc29sdmVkTWFuYWdlZFVzZXJJZCA9IHJlc29sdmVFeHBlbnNlTWFuYWdlZFVzZXJTZWxlY3Rpb24obWFuYWdlZFVzZXJJZCwgY3VycmVudEF4VXNlcklkLCBub3JtYWxpemVkVXNlcnMpO1xuXG4gIHJldHVybiB7XG4gICAgbWFuYWdlZFVzZXJJZDogcmVzb2x2ZWRNYW5hZ2VkVXNlcklkLFxuICAgIGluY2x1ZGVTdWJvcmRpbmF0ZXM6IGNhbk1hbmFnZU90aGVyVXNlcnMgJiYgaW5jbHVkZVN1Ym9yZGluYXRlcyA9PT0gdHJ1ZSxcbiAgfTtcbn07XG5cbnR5cGUgTm9ybWFsaXplRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyQ2hhbmdlQXJncyA9IHtcbiAgcmVxdWVzdGVkVmFsdWU6IHVua25vd247XG4gIGN1cnJlbnRBeFVzZXJJZDogdW5rbm93bjtcbiAgdXNlcnM6IEF1dGhNYW5hZ2VkVXNlcltdO1xuICBjYW5NYW5hZ2VPdGhlclVzZXJzOiBib29sZWFuO1xufTtcblxuLy8gQ29udmVydHMgdGhlIHVzZXIgZmlsdGVyIFVJIHNlbGVjdGlvbiBpbnRvIHJlcXVlc3Qgc3RhdGUuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyQ2hhbmdlID0gKHtcbiAgcmVxdWVzdGVkVmFsdWUsXG4gIGN1cnJlbnRBeFVzZXJJZCxcbiAgdXNlcnMsXG4gIGNhbk1hbmFnZU90aGVyVXNlcnMsXG59OiBOb3JtYWxpemVFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJDaGFuZ2VBcmdzKTogeyBtYW5hZ2VkVXNlcklkOiBzdHJpbmc7IGluY2x1ZGVTdWJvcmRpbmF0ZXM6IGJvb2xlYW4gfSA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRSZXF1ZXN0ZWQgPSBub3JtYWxpemVVc2VySWQocmVxdWVzdGVkVmFsdWUpO1xuICBpZiAoY2FuTWFuYWdlT3RoZXJVc2VycyAmJiBub3JtYWxpemVkUmVxdWVzdGVkID09PSBFWFBFTlNFX1NIRUVUU19BTExfVVNFUlNfVkFMVUUpIHtcbiAgICBjb25zdCBub3JtYWxpemVkVXNlcnMgPSBlbnN1cmVDdXJyZW50RXhwZW5zZU1hbmFnZWRVc2VySW5MaXN0KHVzZXJzLCBjdXJyZW50QXhVc2VySWQpO1xuICAgIGNvbnN0IGN1cnJlbnRNYW5hZ2VkVXNlcklkID0gcmVzb2x2ZUV4cGVuc2VNYW5hZ2VkVXNlclNlbGVjdGlvbihjdXJyZW50QXhVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCwgbm9ybWFsaXplZFVzZXJzKTtcbiAgICByZXR1cm4ge1xuICAgICAgbWFuYWdlZFVzZXJJZDogY3VycmVudE1hbmFnZWRVc2VySWQsXG4gICAgICBpbmNsdWRlU3Vib3JkaW5hdGVzOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4gbm9ybWFsaXplRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU3RhdGUoe1xuICAgIG1hbmFnZWRVc2VySWQ6IG5vcm1hbGl6ZWRSZXF1ZXN0ZWQsXG4gICAgaW5jbHVkZVN1Ym9yZGluYXRlczogZmFsc2UsXG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIHVzZXJzLFxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gIH0pO1xufTtcblxuLy8gUmVzb2x2ZXMgdGhlIHZpc2libGUgc2VsZWN0b3IgdmFsdWUgZm9yIHRoZSBjdXJyZW50IHJlcXVlc3Qgc3RhdGUuXG5leHBvcnQgY29uc3QgcmVzb2x2ZUV4cGVuc2VNYW5hZ2VkVXNlclNlbGVjdFZhbHVlID0gKHtcbiAgbWFuYWdlZFVzZXJJZCxcbiAgaW5jbHVkZVN1Ym9yZGluYXRlcyxcbiAgY3VycmVudEF4VXNlcklkLFxuICB1c2VycyxcbiAgY2FuTWFuYWdlT3RoZXJVc2Vycyxcbn06IE5vcm1hbGl6ZUV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclN0YXRlQXJncyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTdGF0ZSh7XG4gICAgbWFuYWdlZFVzZXJJZCxcbiAgICBpbmNsdWRlU3Vib3JkaW5hdGVzLFxuICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICB1c2VycyxcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplZC5pbmNsdWRlU3Vib3JkaW5hdGVzID8gRVhQRU5TRV9TSEVFVFNfQUxMX1VTRVJTX1ZBTFVFIDogbm9ybWFsaXplZC5tYW5hZ2VkVXNlcklkO1xufTtcblxuLy8gSGlkZXMgdGhlIHVzZXIgZmlsdGVyIHN1bW1hcnkgd2hlbiB0aGUgbGlzdCBpcyBzaG93aW5nIHRoZSBjdXJyZW50IHVzZXIncyBvd24gc2hlZXRzLlxuZXhwb3J0IGNvbnN0IHNob3VsZFNob3dFeHBlbnNlTWFuYWdlZFVzZXJTdW1tYXJ5ID0gKHtcbiAgbWFuYWdlZFVzZXJJZCxcbiAgaW5jbHVkZVN1Ym9yZGluYXRlcyxcbiAgY3VycmVudEF4VXNlcklkLFxufToge1xuICBtYW5hZ2VkVXNlcklkOiB1bmtub3duO1xuICBpbmNsdWRlU3Vib3JkaW5hdGVzOiBib29sZWFuO1xuICBjdXJyZW50QXhVc2VySWQ6IHVua25vd247XG59KTogYm9vbGVhbiA9PiB7XG4gIGlmIChpbmNsdWRlU3Vib3JkaW5hdGVzKSByZXR1cm4gdHJ1ZTtcbiAgY29uc3Qgbm9ybWFsaXplZE1hbmFnZWRVc2VySWQgPSBub3JtYWxpemVVc2VySWQobWFuYWdlZFVzZXJJZCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50ID0gbm9ybWFsaXplVXNlcklkKGN1cnJlbnRBeFVzZXJJZCk7XG4gIGlmICghbm9ybWFsaXplZE1hbmFnZWRVc2VySWQpIHJldHVybiBmYWxzZTtcbiAgaWYgKCFub3JtYWxpemVkQ3VycmVudCkgcmV0dXJuIHRydWU7XG4gIHJldHVybiAhaXNTYW1lRXhwZW5zZU1hbmFnZWRVc2VyKG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkLCBub3JtYWxpemVkQ3VycmVudCk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQWlFOzs7QUNBakUsbUJBQW1DO0FBZ0c3QjtBQTVFTixJQUFNLG1CQUFtQjtBQUV6QixJQUFNLHlCQUF5QixDQUFDLFNBQWlCLGdCQUFnQztBQUMvRSxNQUFJLENBQUMsWUFBYSxRQUFPO0FBQ3pCLFNBQU8sR0FBRyxPQUFPLEtBQUssV0FBVztBQUNuQztBQUVBLElBQU0sa0JBQWtCLENBQUMsVUFBdUU7QUFDOUYsVUFBUSxNQUFNLFFBQVEsS0FBSyxJQUFJLFFBQVEsQ0FBQyxHQUNyQyxJQUFJLENBQUMsU0FBUztBQUNiLFVBQU0sS0FBSyxPQUFPLE1BQU0sZ0JBQWdCLEVBQUUsRUFBRSxLQUFLO0FBQ2pELFVBQU0sY0FBYyxPQUFPLE1BQU0sVUFBVSxFQUFFLEVBQUUsS0FBSztBQUNwRCxRQUFJLENBQUMsR0FBSSxRQUFPO0FBQ2hCLFdBQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLE9BQU8sdUJBQXVCLElBQUksV0FBVztBQUFBLE1BQzdDLFVBQVUsT0FBTyxNQUFNLGVBQWUsRUFBRSxFQUFFLEtBQUssS0FBSztBQUFBLElBQ3REO0FBQUEsRUFDRixDQUFDLEVBQ0EsT0FBTyxPQUFPO0FBQ25CO0FBR0EsSUFBTSwwQkFBMEIsQ0FBQztBQUFBLEVBQy9CO0FBQUEsRUFDQTtB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QUEsVUFDakI7QUFBQTtBQUFBLE1BQ0YsS0FWUSxNQUFNLEdBQUcsT0FBTyxJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVcsRUFXekQ7QUFBQSxJQUVKLENBQUMsR0FDSCxJQUNFO0FBQUEsSUFFSjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsUUFDQSxTQUFTO0FBQUEsUUFDVCxjQUFjLENBQUMsU0FBUztBQUN0QixlQUFLLFNBQVMsTUFBTSxvQ0FBb0Msa0JBQWtCLGNBQWMsQ0FBQztBQUFBLFFBQzNGO0FBQUEsUUFDQSxRQUFRO0FBQUE7QUFBQSxJQUNWO0FBQUEsSUFFQyxtQkFDQztBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTTtBQUFBLFFBQ04sV0FBVyxLQUFLLGlCQUFpQixRQUFRO0FBQUEsUUFDekMsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsU0FBUztBQUFBO0FBQUEsSUFDWCxJQUNFO0FBQUEsS0FDTjtBQUVKO0FBR0EsSUFBTSxvQkFBb0IsTUFBTTtBQUM5QixTQUNFLDZDQUFDLGdDQUFxQix5QkFBdUIsTUFDM0MsdURBQUMsNEJBQXlCLEdBQzVCO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxxQkFBcUI7QUFDNUQsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQyxxQkFBa0IsQ0FBRTtBQUNoRDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sNEJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJSZWFjdCJdCn0K
