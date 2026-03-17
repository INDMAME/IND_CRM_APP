import {
  CheckIcon_default
} from "./chunks/chunk-UZXCWQLB.js";
import {
  ExpenseDateRangeFilter_default,
  ExpenseFilterActions_default,
  ExpenseManagedUserFilterSelect_default,
  ExpenseQuickDateFilters_default,
  buildExpenseTicketLinkBulkFilters,
  buildExpenseTicketLinkListPayload,
  buildExpenseTicketListPayload,
  hasExpenseReturnReferrer,
  isExpenseAbortLikeError,
  isExpenseHistoryBackForwardNavigation,
  runExpenseReadRequestWithRetry
} from "./chunks/chunk-N335R5NI.js";
import {
  HistorySummary_default
} from "./chunks/chunk-7Z3NMBR5.js";
import {
  getExpenseTicketStatusFilterOptions,
  getExpenseTicketStatusLabel,
  normalizeExpenseTicketFilterSnapshot,
  normalizeExpenseTicketStatusFilterCode,
  useExpenseTicketsFilterCache
} from "./chunks/chunk-X5P6FFET.js";
import {
  mapWindowEnumOptions
} from "./chunks/chunk-BVPBMOU4.js";
import {
  ExpenseQuickTicketProgressOverlay_default,
  PageBottomActionButton,
  PageBottomActions_default,
  TICKET_IMAGE_ACCEPT_ATTRIBUTE,
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-2QTOYRKC.js";
import {
  resolveExpenseSheetDetailPolicy
} from "./chunks/chunk-YSFQS4W5.js";
import "./chunks/chunk-W2YOA3BT.js";
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
  buildExpenseSheetDetailUrl,
  clearExpenseTicketReturnContext,
  isManagingOtherExpenseRecord,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-BYJNWY32.js";
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
  hasAssignedVoucher,
  navigateToExpenseUrl,
  safeText,
  setExpenseNavigationGuard,
  startOfDay,
  toIsoDate
} from "./chunks/chunk-JWQJTNB4.js";
import {
  configureExpenseApiAuth,
  fetchExpenseSheetDetail,
  fetchExpenseSheetTicketLinkList,
  fetchExpenseSheetTicketsList,
  linkExpenseSheetTicketsBulk,
  mapExpenseSheetHeader
} from "./chunks/chunk-CNJSX7GH.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-YRLD2CA7.js";
import {
  clearExpenseActingUserOverride,
  getExpenseScopeToken,
  setExpenseActingUserOverride,
  toExpenseIsoDate
} from "./chunks/chunk-KTF6MF2Z.js";
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
  removeSessionValueWithExpiry,
  setSessionJsonWithExpiry
} from "./chunks/chunk-7SKLSV7K.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/gastos/tickets/ExpenseTicketsPage.tsx
var import_react10 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/components/ExpenseTicketLinkTimelineItem.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ExpenseTicketLinkTimelineItem = ({
  fileId,
  dateParts,
  title,
  subtitle,
  amountText,
  isSelected,
  isSelectable,
  selectionDisabled,
  selectLabel,
  onOpenDetail,
  onToggleSelect
}) => {
  const canToggleSelection = isSelectable && !selectionDisabled;
  const handleOpenDetail = (0, import_react.useCallback)(() => {
    onOpenDetail();
  }, [onOpenDetail]);
  const handleToggleSelection = (0, import_react.useCallback)(() => {
    if (!canToggleSelection) return;
    onToggleSelect();
  }, [canToggleSelection, onToggleSelect]);
  const selectionIndicatorToneClassName = isSelected ? "border-primary bg-primary text-white shadow-sm" : canToggleSelection ? "border-slate-300 bg-white text-transparent group-hover:border-primary group-hover:bg-primary/5" : "border-slate-200 bg-slate-100 text-transparent";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: isSelected ? "timeline-item rounded-[5px] ring-2 ring-primary/30" : "timeline-item",
      "data-ticket-file-id": fileId || void 0,
      "data-ticket-selected": isSelected ? "true" : "false",
      "data-ticket-selectable": canToggleSelection ? "true" : "false",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ExpenseTimelineCard_default,
          {
            dateParts,
            title,
            subtitle,
            amountText,
            onOpen: handleOpenDetail,
            titleClassName: "expense-ticket-card__title timeline-name",
            interactionProps: {
              "aria-label": title,
              onContextMenu: (event) => {
                event.preventDefault();
              }
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            "aria-label": selectLabel,
            "aria-pressed": isSelected,
            title: selectLabel,
            disabled: !canToggleSelection,
            onClick: handleToggleSelection,
            className: "group absolute inset-y-0 right-0 z-10 flex w-[4.25rem] items-start justify-end rounded-r-[5px] bg-transparent p-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 disabled:cursor-not-allowed sm:w-[4.75rem]",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "span",
              {
                className: `flex h-[30px] w-[30px] items-center justify-center rounded-[5px] border transition ${selectionIndicatorToneClassName}`,
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon_default, { className: "h-[20px] w-[20px]", strokeWidth: 2.3, "aria-hidden": "true" })
              }
            )
          }
        )
      ] })
    }
  );
};
var ExpenseTicketLinkTimelineItem_default = ExpenseTicketLinkTimelineItem;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseTicketLinkBulkSummary.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ExpenseTicketLinkIssueList = ({ items, title, toneClassName }) => {
  if (items.length < 1) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `rounded-2xl border p-3 ${toneClassName}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sm font-semibold", children: title }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mt-2 space-y-2", children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "div",
      {
        className: "rounded-xl border border-current/15 bg-white/80 p-2 text-xs",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "font-semibold", children: [
              indT("Tickets_Filter_FilterKey", "Ticket"),
              ":"
            ] }),
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: item.ticketId || "-" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "mt-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "font-semibold", children: [
              indT("ExpenseTickets_LinkMode_ResultReason", "Motivo"),
              ":"
            ] }),
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: item.reason || "-" })
          ] })
        ]
      },
      `${item.ticketId || "unknown"}-${item.reason || "no-reason"}`
    )) })
  ] });
};
var ExpenseTicketLinkBulkSummary = ({ result }) => {
  if (!result) return null;
  const summaryRows = [
    {
      key: "requested",
      label: indT("ExpenseTickets_LinkMode_ResultRequested", "Solicitados"),
      value: result.requestedCount
    },
    {
      key: "linked",
      label: indT("ExpenseTickets_LinkMode_ResultLinked", "Vinculados"),
      value: result.linkedCount
    },
    {
      key: "skipped",
      label: indT("ExpenseTickets_LinkMode_ResultSkipped", "Omitidos"),
      value: result.skippedCount
    },
    {
      key: "failed",
      label: indT("ExpenseTickets_LinkMode_ResultFailed", "Fallidos"),
      value: result.failedCount
    }
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "glass-panel shadow-card space-y-3 rounded-2xl border border-slate-200 bg-white/95 p-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sm font-semibold text-slate-900", children: indT("ExpenseTickets_LinkMode_ResultTitle", "Resultado de vinculaci\xF3n") }),
      result.expenseSheetId ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "mt-1 text-xs text-slate-600", children: [
        indT("ExpenseSheets_Filter_Sheet", "Expense sheet"),
        ": ",
        result.expenseSheetId
      ] }) : null
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-4", children: summaryRows.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500", children: item.label }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "mt-1 text-xl font-semibold text-primary", children: item.value })
    ] }, item.key)) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-1 gap-3 lg:grid-cols-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        ExpenseTicketLinkIssueList,
        {
          title: indT("ExpenseTickets_LinkMode_ResultSkipped", "Omitidos"),
          items: Array.isArray(result.skipped) ? result.skipped : [],
          toneClassName: "border-amber-200 bg-amber-50 text-amber-900"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        ExpenseTicketLinkIssueList,
        {
          title: indT("ExpenseTickets_LinkMode_ResultFailed", "Fallidos"),
          items: Array.isArray(result.failed) ? result.failed : [],
          toneClassName: "border-rose-200 bg-rose-50 text-rose-900"
        }
      )
    ] })
  ] });
};
var ExpenseTicketLinkBulkSummary_default = ExpenseTicketLinkBulkSummary;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseTicketsFiltersPanel.tsx
var import_react4 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/components/ExpenseProcessedByIaFilterSelect.tsx
var import_react2 = __toESM(require_react());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
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
  const options = (0, import_react2.useMemo)(
    () => [
      { value: "all", text: indT("Tickets_Filter_All", "All") },
      { value: "yes", text: indT("Tickets_Filter_ProcessedByIA_Yes", "Yes") },
      { value: "no", text: indT("Tickets_Filter_ProcessedByIA_No", "No") }
    ],
    []
  );
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var import_react3 = __toESM(require_react());
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var SEARCH_PAGE_SIZE = 30;
var buildTicketSuggestPayload = (term, page, pageSize, fixedStatusFilter, createdDateFrom, createdDateTo) => {
  const safeTerm = String(term || "").trim();
  const basePayload = {
    page: Number.isFinite(page) && page > 0 ? Math.floor(page) : 1,
    pageSize: Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : SEARCH_PAGE_SIZE,
    createdDateFrom: createdDateFrom || void 0,
    createdDateTo: createdDateTo || void 0,
    searchKey: safeTerm || void 0,
    filter: safeTerm || void 0
  };
  if (fixedStatusFilter === 0 || fixedStatusFilter === 1) {
    return {
      ...basePayload,
      status: fixedStatusFilter
    };
  }
  return basePayload;
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
  mode = "general",
  createdDateFrom = "",
  createdDateTo = "",
  enableRemoteSuggestions = true,
  fixedStatusFilter = null,
  readOnly = false,
  disabled = false,
  showLabel = true
}) => {
  const readOnlyMode = readOnly || disabled;
  const loadOptions = (0, import_react3.useCallback)(async (term, signal) => {
    const payload = buildTicketSuggestPayload(term, 1, SEARCH_PAGE_SIZE, fixedStatusFilter, createdDateFrom, createdDateTo);
    const response = mode === "link" ? await fetchExpenseSheetTicketLinkList(payload, {
      suppressPermissionModal: true,
      signal
    }) : await fetchExpenseSheetTicketsList(payload, {
      suppressPermissionModal: true,
      signal
    });
    if (response?.Success === false) {
      return [];
    }
    return mapTicketOptions(response?.Items);
  }, [createdDateFrom, createdDateTo, fixedStatusFilter, mode]);
  const loadOptionsPage = (0, import_react3.useCallback)(async (term, page, _pageSize, signal) => {
    const payload = buildTicketSuggestPayload(
      term,
      page,
      SEARCH_PAGE_SIZE,
      fixedStatusFilter,
      createdDateFrom,
      createdDateTo
    );
    const response = mode === "link" ? await fetchExpenseSheetTicketLinkList(payload, {
      suppressPermissionModal: true,
      signal
    }) : await fetchExpenseSheetTicketsList(payload, {
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
  }, [createdDateFrom, createdDateTo, fixedStatusFilter, mode]);
  if (!enableRemoteSuggestions || readOnlyMode) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-2", children: [
      showLabel ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("label", { className: "form-label font-semibold", style: { color: "#00296be0" }, children: label }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
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
  mode,
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
  const statusOptions = (0, import_react4.useMemo)(() => getExpenseTicketStatusFilterOptions(), []);
  const categoryOptions = (0, import_react4.useMemo)(() => {
    return [
      { value: "", text: indT("Tickets_Filter_All", "All") },
      ...gastoTypeOptions
    ];
  }, [gastoTypeOptions]);
  if (!visible) return null;
  const locale = document?.documentElement?.lang || "es-ES";
  const showInlineDateSummary = !showManualDateFilter && !!fromDate && !!toDate;
  const showStatusFilter = mode === "general";
  const desktopColumnsClassName = showManagedUserFilter ? showStatusFilter ? "lg:grid-cols-6" : "lg:grid-cols-5" : showStatusFilter ? "lg:grid-cols-5" : "lg:grid-cols-4";
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "filter-card filter-card--expanded p-2 sm:p-2.5 relative", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "history-filter-stack flex flex-col space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ExpenseQuickDateFilters_default, { activeQuickFilter, onQuickFilterChange }),
    showManualDateFilter ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
    ) : showInlineDateSummary ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      HistorySummary_default,
      {
        summaryFromLabel: indT("History_From", "From"),
        summaryToLabel: indT("History_To", "To"),
        fromValue: formatDate(fromDate, locale),
        toValue: formatDate(toDate, locale),
        className: "gap-y-1 text-[11px] px-1"
      }
    ) : null,
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: `grid grid-cols-1 sm:grid-cols-2 ${desktopColumnsClassName} gap-2`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        ExpenseTicketFilterKeyInput_default,
        {
          label: indT("Tickets_Filter_FilterKey", "Ticket"),
          placeholder: indT("Tickets_Filter_FilterKey", "Ticket"),
          value: filterKey,
          onChange: onFilterKeyChange,
          mode,
          createdDateFrom: fromDate,
          createdDateTo: toDate,
          enableRemoteSuggestions: true,
          fixedStatusFilter: mode === "general" ? fixedStatusFilter : null,
          showLabel: false
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
      showManagedUserFilter ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
      showStatusFilter ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
      ) : null,
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
var import_react5 = __toESM(require_react());
var useExpenseTicketsFiltersState = ({
  onApplyFilters,
  onClearFilters,
  defaultManagedUserId,
  fixedStatusFilter = null,
  allowEmptyDatesOnApply = false
}) => {
  const hasFixedStatusFilter = fixedStatusFilter === 0 || fixedStatusFilter === 1;
  const resolveStatusFilter = (0, import_react5.useCallback)(
    (value) => {
      if (hasFixedStatusFilter) {
        return fixedStatusFilter;
      }
      return value;
    },
    [fixedStatusFilter, hasFixedStatusFilter]
  );
  const [fromDate, setFromDate] = (0, import_react5.useState)("");
  const [toDate, setToDate] = (0, import_react5.useState)("");
  const [filterKey, setFilterKey] = (0, import_react5.useState)("");
  const [currencyCode, setCurrencyCode] = (0, import_react5.useState)("");
  const [managedUserId, setManagedUserId] = (0, import_react5.useState)(defaultManagedUserId);
  const [statusFilterRaw, setStatusFilterRaw] = (0, import_react5.useState)(resolveStatusFilter(""));
  const [gastoTypeFilter, setGastoTypeFilter] = (0, import_react5.useState)("");
  const [processedByIaFilter, setProcessedByIaFilter] = (0, import_react5.useState)("all");
  const [activeQuickFilter, setActiveQuickFilter] = (0, import_react5.useState)(null);
  const [showManualDateFilter, setShowManualDateFilter] = (0, import_react5.useState)(false);
  const [showManualDateError, setShowManualDateError] = (0, import_react5.useState)(false);
  const [manualDateAutoOpenKey, setManualDateAutoOpenKey] = (0, import_react5.useState)(0);
  const [appliedFilters, setAppliedFilters] = (0, import_react5.useState)(null);
  const [showFilters, setShowFilters] = (0, import_react5.useState)(true);
  (0, import_react5.useEffect)(() => {
    if (!hasFixedStatusFilter) return;
    setStatusFilterRaw(fixedStatusFilter);
  }, [fixedStatusFilter, hasFixedStatusFilter]);
  const statusFilter = resolveStatusFilter(statusFilterRaw);
  const currentFilters = (0, import_react5.useMemo)(
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
  const setStatusFilter = (0, import_react5.useCallback)(
    (value) => {
      if (hasFixedStatusFilter) {
        setStatusFilterRaw(fixedStatusFilter);
        return;
      }
      setStatusFilterRaw(value);
    },
    [fixedStatusFilter, hasFixedStatusFilter]
  );
  const onApply = (0, import_react5.useCallback)(() => {
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
  const restoreAppliedFilters = (0, import_react5.useCallback)(
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
  const onClear = (0, import_react5.useCallback)(() => {
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
  const onDateRangeChange = (0, import_react5.useCallback)(
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
  const onManualRangeComplete = (0, import_react5.useCallback)((nextFromDate, nextToDate) => {
    setFromDate(nextFromDate);
    setToDate(nextToDate);
    setActiveQuickFilter("custom");
    setShowManualDateError(false);
    setShowManualDateFilter(false);
  }, []);
  const onQuickFilterChange = (0, import_react5.useCallback)(
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
  const toggleFilterPanel = (0, import_react5.useCallback)(() => {
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
var import_react6 = __toESM(require_react());
var ALLOWED_GASTO_TYPE_CODES = /* @__PURE__ */ new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);
var EXPENSE_TICKETS_LIST_LOG_PREFIX = "[expense-tickets:list]";
var logExpenseTicketsListInfo = (...args) => {
  if (typeof console !== "undefined" && typeof console.info === "function") {
    console.info(EXPENSE_TICKETS_LIST_LOG_PREFIX, ...args);
  }
};
var logExpenseTicketsListWarn = (...args) => {
  if (typeof console !== "undefined" && typeof console.warn === "function") {
    console.warn(EXPENSE_TICKETS_LIST_LOG_PREFIX, ...args);
  }
};
var logExpenseTicketsListError = (...args) => {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(EXPENSE_TICKETS_LIST_LOG_PREFIX, ...args);
  }
};
var buildExpenseTicketsDebugStack = (label) => {
  if (typeof Error !== "function") return "";
  const rawStack = new Error(label).stack;
  if (typeof rawStack !== "string" || !rawStack.trim()) return "";
  return rawStack.split("\n").slice(0, 6).join("\n");
};
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
    kind: "general",
    fileId: String(item?.FileId || "").trim(),
    description: String(item?.Description || "").trim(),
    status: toNullableTicketStatus(item?.Status),
    processedByAI: toNullableBool(item?.ProcessedByAI),
    currencyCode: String(item?.CurrencyCode || "").trim(),
    totalAmount: toNullableNumber(item?.TotalAmount),
    transDate: String(item?.TransDate || "").trim(),
    fileName: String(item?.FileName || "").trim(),
    gastoType: toNullableTicketGastoType(item?.GastoType ?? item?.gastoType)
  };
};
var mapTicketLinkItemToCard = (item) => {
  return {
    kind: "link",
    fileId: String(item?.FileId || "").trim(),
    description: String(item?.Description || "").trim(),
    processedByAI: toNullableBool(item?.ProcessedByAI),
    currencyCode: String(item?.CurrencyCode || "").trim(),
    totalAmount: toNullableNumber(item?.TotalAmount),
    transDate: String(item?.TransDate || "").trim(),
    fileName: String(item?.FileName || "").trim(),
    gastoType: toNullableTicketGastoType(item?.GastoType ?? item?.gastoType)
  };
};
var useExpenseTicketsListData = ({ hasAccess, pageSize, mode, onForbidden }) => {
  const [items, setItems] = (0, import_react6.useState)([]);
  const [total, setTotal] = (0, import_react6.useState)(0);
  const [currentPage, setCurrentPage] = (0, import_react6.useState)(1);
  const [isLoading, setIsLoading] = (0, import_react6.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react6.useState)("");
  const activeRequestControllerRef = (0, import_react6.useRef)(null);
  const activeRequestKeyRef = (0, import_react6.useRef)("");
  const activeRequestSeqRef = (0, import_react6.useRef)(0);
  const restoreListSnapshot = (0, import_react6.useCallback)(
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
  const loadList = (0, import_react6.useCallback)(
    async (page, filters) => {
      logExpenseTicketsListInfo("loadList:requested", {
        page,
        mode,
        hasAccess,
        filters
      });
      if (!hasAccess) {
        logExpenseTicketsListWarn("loadList:blocked-no-access", {
          page,
          mode
        });
        onForbidden();
        return;
      }
      const payload = mode === "link" ? buildExpenseTicketLinkListPayload(filters, page, pageSize) : buildExpenseTicketListPayload(filters, page, pageSize);
      const normalizedManagedUserId = String(filters?.managedUserId || "").trim().toUpperCase();
      const requestKey = JSON.stringify({ mode, payload, managedUserId: normalizedManagedUserId });
      if (activeRequestControllerRef.current && activeRequestKeyRef.current === requestKey) {
        logExpenseTicketsListWarn("loadList:skip-duplicate-request", {
          page,
          mode,
          requestKey
        });
        return;
      }
      if (activeRequestControllerRef.current) {
        logExpenseTicketsListInfo("loadList:abort-previous-request", {
          previousRequestKey: activeRequestKeyRef.current,
          previousRequestSeq: activeRequestSeqRef.current,
          stack: buildExpenseTicketsDebugStack("loadList:abort-previous-request")
        });
        activeRequestControllerRef.current.abort();
      }
      const controller = new AbortController();
      activeRequestControllerRef.current = controller;
      activeRequestKeyRef.current = requestKey;
      const requestSeq = activeRequestSeqRef.current + 1;
      activeRequestSeqRef.current = requestSeq;
      const handleAbortSignal = () => {
        logExpenseTicketsListWarn("loadList:signal-abort-event", {
          page,
          mode,
          requestSeq,
          requestKey,
          signalAborted: controller.signal.aborted,
          signalReason: "reason" in controller.signal ? controller.signal.reason ?? null : null
        });
      };
      controller.signal.addEventListener("abort", handleAbortSignal, { once: true });
      setIsLoading(true);
      setErrorMessage("");
      logExpenseTicketsListInfo("loadList:fetch-start", {
        page,
        mode,
        normalizedManagedUserId,
        payload,
        requestKey,
        requestSeq
      });
      try {
        const response = await runExpenseReadRequestWithRetry(
          () => mode === "link" ? fetchExpenseSheetTicketLinkList(payload, {
            suppressPermissionModal: true,
            signal: controller.signal,
            axUserIdOverride: normalizedManagedUserId || void 0
          }) : fetchExpenseSheetTicketsList(payload, {
            suppressPermissionModal: true,
            signal: controller.signal,
            axUserIdOverride: normalizedManagedUserId || void 0
          }),
          {
            signal: controller.signal
          }
        );
        logExpenseTicketsListInfo("loadList:fetch-finished", {
          page,
          mode,
          requestSeq,
          success: response?.Success,
          total: response?.Total,
          items: Array.isArray(response?.Items) ? response.Items.length : 0
        });
        if (requestSeq !== activeRequestSeqRef.current) return;
        if (response?.Success === false) {
          logExpenseTicketsListWarn("loadList:api-unsuccessful", {
            page,
            mode,
            message: response.Message
          });
          setErrorMessage(response.Message || indT("Tickets_LoadError", "Could not load tickets."));
          setItems([]);
          setTotal(0);
          setCurrentPage(page);
          return;
        }
        const sourceItems = Array.isArray(response?.Items) ? response.Items : [];
        const mappedItems = sourceItems.map(
          (item) => mode === "link" ? mapTicketLinkItemToCard(item) : mapTicketItemToCard(item)
        );
        const responseTotal = Number(response?.Total ?? mappedItems.length ?? 0);
        setItems(mappedItems);
        setTotal(responseTotal);
        setCurrentPage(page);
      } catch (error) {
        if (requestSeq !== activeRequestSeqRef.current) return;
        if (isExpenseAbortLikeError(error, controller.signal)) {
          logExpenseTicketsListWarn("loadList:aborted", {
            page,
            mode,
            requestSeq,
            message: error instanceof Error ? error.message : error
          });
          return;
        }
        if (error instanceof ApiFetchError && error.status === 403) {
          logExpenseTicketsListWarn("loadList:forbidden", {
            page,
            mode,
            requestSeq
          });
          onForbidden();
          return;
        }
        logExpenseTicketsListError("loadList:failed", {
          page,
          mode,
          requestSeq,
          message: error instanceof Error ? error.message : error
        });
        const message = error instanceof Error ? error.message : indT("Tickets_LoadError", "Could not load tickets.");
        setErrorMessage(message);
        setItems([]);
        setTotal(0);
        setCurrentPage(page);
      } finally {
        controller.signal.removeEventListener("abort", handleAbortSignal);
        if (requestSeq === activeRequestSeqRef.current) {
          logExpenseTicketsListInfo("loadList:finalize", {
            page,
            mode,
            requestSeq
          });
          setIsLoading(false);
          activeRequestControllerRef.current = null;
          activeRequestKeyRef.current = "";
        }
      }
    },
    [hasAccess, mode, onForbidden, pageSize]
  );
  const resetList = (0, import_react6.useCallback)((source = "unknown") => {
    if (activeRequestControllerRef.current) {
      logExpenseTicketsListWarn("resetList:abort-active-request", {
        source,
        activeRequestKey: activeRequestKeyRef.current,
        activeRequestSeq: activeRequestSeqRef.current,
        stack: buildExpenseTicketsDebugStack(`resetList:${source}`)
      });
      activeRequestControllerRef.current.abort();
      activeRequestControllerRef.current = null;
      activeRequestKeyRef.current = "";
    }
    logExpenseTicketsListInfo("resetList:clear-state", {
      source
    });
    setItems([]);
    setTotal(0);
    setCurrentPage(1);
    setErrorMessage("");
  }, []);
  const clearListCache = (0, import_react6.useCallback)(() => {
  }, []);
  (0, import_react6.useEffect)(() => {
    return () => {
      if (activeRequestControllerRef.current) {
        logExpenseTicketsListWarn("cleanup:abort-active-request", {
          activeRequestKey: activeRequestKeyRef.current,
          activeRequestSeq: activeRequestSeqRef.current,
          stack: buildExpenseTicketsDebugStack("cleanup:abort-active-request")
        });
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
    resetList,
    clearListCache
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/expenseTicketLinkReturnState.ts
var EXPENSE_TICKET_LINK_RETURN_STATE_KEY_PREFIX = "expense_ticket_link_return_state_v1";
var EXPENSE_TICKET_LINK_RETURN_STATE_TTL_MS = 12 * 60 * 60 * 1e3;
var ALLOWED_TICKET_GASTO_TYPES = /* @__PURE__ */ new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);
var getScopedKey = () => {
  return `${EXPENSE_TICKET_LINK_RETURN_STATE_KEY_PREFIX}_${getExpenseScopeToken()}`;
};
var normalizeFileId = (value) => {
  return String(value || "").trim();
};
var normalizeProcessedByAi = (value) => {
  if (value === true || value === false) return value;
  if (value === 1 || value === "1" || value === "true") return true;
  if (value === 0 || value === "0" || value === "false") return false;
  return null;
};
var normalizeNullableNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};
var normalizeTicketGastoType = (value) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || !ALLOWED_TICKET_GASTO_TYPES.has(parsed)) {
    return null;
  }
  return parsed;
};
var normalizeSelectionMode = (value) => {
  return value === "filtered" ? "filtered" : "selected";
};
var normalizeSelectedTickets = (value) => {
  if (!Array.isArray(value)) return [];
  const items = /* @__PURE__ */ new Map();
  for (const entry of value) {
    const item = entry || {};
    const fileId = normalizeFileId(item.fileId);
    if (!fileId) continue;
    items.set(fileId, {
      kind: "link",
      fileId,
      description: String(item.description || "").trim(),
      processedByAI: normalizeProcessedByAi(item.processedByAI),
      currencyCode: String(item.currencyCode || "").trim(),
      totalAmount: normalizeNullableNumber(item.totalAmount),
      transDate: String(item.transDate || "").trim(),
      fileName: String(item.fileName || "").trim(),
      gastoType: normalizeTicketGastoType(item.gastoType)
    });
  }
  return Array.from(items.values());
};
var normalizeExcludedIds = (value) => {
  if (!Array.isArray(value)) return [];
  const ids = /* @__PURE__ */ new Set();
  for (const entry of value) {
    const fileId = normalizeFileId(entry);
    if (!fileId) continue;
    ids.add(fileId);
  }
  return Array.from(ids);
};
var normalizeNonNegativeInteger = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : fallback;
};
var normalizeExpenseTicketLinkReturnState = (value) => {
  if (!value || typeof value !== "object") return null;
  const payload = value;
  const sheetId = String(payload.sheetId || "").trim();
  if (!sheetId) return null;
  return {
    sheetId,
    page: Math.max(1, normalizeNonNegativeInteger(payload.page, 1)),
    scrollY: normalizeNonNegativeInteger(payload.scrollY),
    focusFileId: normalizeFileId(payload.focusFileId),
    filters: normalizeExpenseTicketFilterSnapshot(payload.filters),
    selectionMode: normalizeSelectionMode(payload.selectionMode),
    selectedTickets: normalizeSelectedTickets(payload.selectedTickets),
    excludedIds: normalizeExcludedIds(payload.excludedIds),
    filteredSelectionFilters: payload.filteredSelectionFilters ? normalizeExpenseTicketFilterSnapshot(payload.filteredSelectionFilters) : null,
    filteredSelectionTotal: normalizeNonNegativeInteger(payload.filteredSelectionTotal)
  };
};
var readExpenseTicketLinkReturnState = (sheetId) => {
  const stored = normalizeExpenseTicketLinkReturnState(
    getSessionJsonWithExpiry(getScopedKey())
  );
  if (!stored) return null;
  const safeSheetId = String(sheetId || "").trim();
  if (!safeSheetId) return stored;
  return stored.sheetId.toUpperCase() === safeSheetId.toUpperCase() ? stored : null;
};
var saveExpenseTicketLinkReturnState = (value) => {
  const normalized = normalizeExpenseTicketLinkReturnState(value);
  if (!normalized) {
    clearExpenseTicketLinkReturnState();
    return null;
  }
  setSessionJsonWithExpiry(getScopedKey(), normalized, EXPENSE_TICKET_LINK_RETURN_STATE_TTL_MS);
  return normalized;
};
var clearExpenseTicketLinkReturnState = () => {
  removeSessionValueWithExpiry(getScopedKey());
};

// Web/wwwroot/react/src/pages/gastos/tickets/useExpenseTicketLinkSelection.ts
var import_react7 = __toESM(require_react());
var normalizeFileId2 = (value) => String(value || "").trim();
var normalizeSelectionMode2 = (value) => {
  return value === "filtered" ? "filtered" : "selected";
};
var normalizeExcludedIds2 = (value) => {
  if (!Array.isArray(value)) return [];
  const ids = /* @__PURE__ */ new Set();
  for (const entry of value) {
    const fileId = normalizeFileId2(entry);
    if (!fileId) continue;
    ids.add(fileId);
  }
  return Array.from(ids);
};
var toSelectedMap = (items) => {
  const next = {};
  for (const item of items) {
    const fileId = normalizeFileId2(item.fileId);
    if (!fileId) continue;
    next[fileId] = item;
  }
  return next;
};
var useExpenseTicketLinkSelection = () => {
  const [selectionMode, setSelectionMode] = (0, import_react7.useState)("selected");
  const [selectedTicketsById, setSelectedTicketsById] = (0, import_react7.useState)({});
  const [excludedIds, setExcludedIds] = (0, import_react7.useState)([]);
  const [filteredSnapshot, setFilteredSnapshot] = (0, import_react7.useState)(null);
  const [filteredTotalCount, setFilteredTotalCount] = (0, import_react7.useState)(0);
  const selectedTickets = (0, import_react7.useMemo)(() => Object.values(selectedTicketsById), [selectedTicketsById]);
  const excludedIdSet = (0, import_react7.useMemo)(() => new Set(excludedIds), [excludedIds]);
  const isFilteredSelectionActive = selectionMode === "filtered" && !!filteredSnapshot;
  const clearSelection = (0, import_react7.useCallback)(() => {
    setSelectionMode("selected");
    setSelectedTicketsById({});
    setExcludedIds([]);
    setFilteredSnapshot(null);
    setFilteredTotalCount(0);
  }, []);
  const restoreSelection = (0, import_react7.useCallback)((state) => {
    if (!state) {
      clearSelection();
      return;
    }
    const normalizedMode = normalizeSelectionMode2(state.selectionMode);
    const normalizedSelectedTickets = Array.isArray(state.selectedTickets) ? state.selectedTickets : [];
    const normalizedSnapshot = state.filteredSnapshot || null;
    const normalizedExcludedIds = normalizeExcludedIds2(state.excludedIds);
    const normalizedFilteredTotal = Number.isFinite(Number(state.filteredTotalCount)) ? Math.max(0, Math.floor(Number(state.filteredTotalCount))) : 0;
    setSelectionMode(normalizedMode === "filtered" && normalizedSnapshot ? "filtered" : "selected");
    setSelectedTicketsById(toSelectedMap(normalizedSelectedTickets));
    setExcludedIds(normalizedMode === "filtered" ? normalizedExcludedIds : []);
    setFilteredSnapshot(normalizedMode === "filtered" ? normalizedSnapshot : null);
    setFilteredTotalCount(normalizedMode === "filtered" ? normalizedFilteredTotal : 0);
  }, [clearSelection]);
  const selectAllByFilters = (0, import_react7.useCallback)((snapshot, totalCount) => {
    setSelectionMode("filtered");
    setSelectedTicketsById({});
    setExcludedIds([]);
    setFilteredSnapshot(snapshot);
    setFilteredTotalCount(Number.isFinite(totalCount) ? Math.max(0, Math.floor(totalCount)) : 0);
  }, []);
  const isSelected = (0, import_react7.useCallback)(
    (fileId) => {
      const safeFileId = normalizeFileId2(fileId);
      if (!safeFileId) return false;
      if (isFilteredSelectionActive) {
        return !excludedIdSet.has(safeFileId);
      }
      return !!selectedTicketsById[safeFileId];
    },
    [excludedIdSet, isFilteredSelectionActive, selectedTicketsById]
  );
  const toggleTicket = (0, import_react7.useCallback)(
    (ticket) => {
      const fileId = normalizeFileId2(ticket.fileId);
      if (!fileId) return;
      if (isFilteredSelectionActive) {
        setExcludedIds((previous) => {
          const next = new Set(previous);
          if (next.has(fileId)) {
            next.delete(fileId);
          } else {
            next.add(fileId);
          }
          return Array.from(next);
        });
        return;
      }
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
    [isFilteredSelectionActive]
  );
  const hydrateVisibleTickets = (0, import_react7.useCallback)((items) => {
    if (selectionMode !== "selected" || items.length < 1) return;
    setSelectedTicketsById((previous) => {
      let changed = false;
      const next = { ...previous };
      for (const item of items) {
        const fileId = normalizeFileId2(item.fileId);
        if (!fileId || !next[fileId]) continue;
        next[fileId] = item;
        changed = true;
      }
      return changed ? next : previous;
    });
  }, [selectionMode]);
  const resolveSelectedCount = (0, import_react7.useCallback)(
    (fallbackTotalCount = 0) => {
      if (!isFilteredSelectionActive) {
        return selectedTickets.length;
      }
      const baseCount = filteredTotalCount > 0 ? filteredTotalCount : Math.max(0, Math.floor(fallbackTotalCount));
      return Math.max(0, baseCount - excludedIds.length);
    },
    [excludedIds.length, filteredTotalCount, isFilteredSelectionActive, selectedTickets.length]
  );
  return {
    selectionMode,
    selectedTickets,
    excludedIds,
    filteredSnapshot,
    filteredTotalCount,
    isFilteredSelectionActive,
    isSelected,
    toggleTicket,
    clearSelection,
    restoreSelection,
    selectAllByFilters,
    hydrateVisibleTickets,
    resolveSelectedCount
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/useExpenseTicketAutomaticLoad.ts
var import_react8 = __toESM(require_react());
var automaticLoadReducer = (state, action) => {
  switch (action.type) {
    case "schedule":
      return action.request;
    case "clear":
      return null;
    case "disable_link_wait":
      return state ? { ...state, waitForLinkModeSheetReady: false } : null;
    default:
      return state;
  }
};
var EXPENSE_TICKETS_AUTO_LOAD_LOG_PREFIX = "[expense-tickets:auto-load]";
var logExpenseTicketsAutoLoadInfo = (...args) => {
  if (typeof console !== "undefined" && typeof console.info === "function") {
    console.info(EXPENSE_TICKETS_AUTO_LOAD_LOG_PREFIX, ...args);
  }
};
var logExpenseTicketsAutoLoadWarn = (...args) => {
  if (typeof console !== "undefined" && typeof console.warn === "function") {
    console.warn(EXPENSE_TICKETS_AUTO_LOAD_LOG_PREFIX, ...args);
  }
};
var useExpenseTicketAutomaticLoad = ({
  isLinkMode,
  canProcessLinkMode,
  linkSheetCheckBusy,
  linkSheetLocked,
  clearListCache,
  resetList,
  loadList
}) => {
  const [pendingAutomaticLoad, dispatch] = (0, import_react8.useReducer)(automaticLoadReducer, null);
  const runAutomaticListLoad = (0, import_react8.useCallback)(
    (page, snapshot, options = {}) => {
      logExpenseTicketsAutoLoadInfo("runAutomaticListLoad:schedule", {
        page,
        snapshot,
        options
      });
      dispatch({
        type: "schedule",
        request: {
          page,
          snapshot,
          clearCache: options.clearCache === true,
          resetBeforeLoad: options.resetBeforeLoad === true,
          waitForLinkModeSheetReady: options.waitForLinkModeSheetReady === true
        }
      });
    },
    []
  );
  (0, import_react8.useEffect)(() => {
    if (!pendingAutomaticLoad) return;
    if (pendingAutomaticLoad.waitForLinkModeSheetReady) {
      if (!isLinkMode) {
        logExpenseTicketsAutoLoadWarn("pendingAutomaticLoad:disable-link-wait", {
          page: pendingAutomaticLoad.page
        });
        dispatch({ type: "disable_link_wait" });
        return;
      }
      if (!canProcessLinkMode || linkSheetCheckBusy) {
        logExpenseTicketsAutoLoadInfo("pendingAutomaticLoad:waiting-link-mode-ready", {
          page: pendingAutomaticLoad.page,
          canProcessLinkMode,
          linkSheetCheckBusy
        });
        return;
      }
      if (linkSheetLocked) {
        logExpenseTicketsAutoLoadWarn("pendingAutomaticLoad:clear-link-locked", {
          page: pendingAutomaticLoad.page
        });
        dispatch({ type: "clear" });
        return;
      }
    }
    const { page, snapshot, clearCache, resetBeforeLoad } = pendingAutomaticLoad;
    dispatch({ type: "clear" });
    logExpenseTicketsAutoLoadInfo("pendingAutomaticLoad:execute", {
      page,
      snapshot,
      clearCache,
      resetBeforeLoad
    });
    if (clearCache) {
      clearListCache();
    }
    if (resetBeforeLoad) {
      resetList("automatic-load:reset-before-load");
    }
    void loadList(page, snapshot);
  }, [
    canProcessLinkMode,
    clearListCache,
    isLinkMode,
    linkSheetCheckBusy,
    linkSheetLocked,
    loadList,
    pendingAutomaticLoad,
    resetList
  ]);
  return {
    runAutomaticListLoad
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/useExpenseTicketLinkSheetGate.ts
var import_react9 = __toESM(require_react());
var EXPENSE_STATUS_PAID = 4;
var INITIAL_LINK_SHEET_GATE_STATE = {
  linkSheetLocked: false,
  linkSheetBlockedMessage: "",
  linkSheetCheckBusy: false
};
var linkSheetGateReducer = (state, action) => {
  switch (action.type) {
    case "replace":
      return action.nextState;
    case "patch":
      return {
        ...state,
        ...action.patch
      };
    default:
      return state;
  }
};
var useExpenseTicketLinkSheetGate = ({
  isLinkMode,
  linkSheetId,
  canProcessLinkMode,
  allowSelfManagement,
  canManageOtherUsers,
  currentAxUserId,
  currentCrmUserId,
  selectedManagedUserId,
  resolveBlockedMessage
}) => {
  const [state, dispatch] = (0, import_react9.useReducer)(linkSheetGateReducer, INITIAL_LINK_SHEET_GATE_STATE);
  (0, import_react9.useEffect)(() => {
    if (!isLinkMode || !linkSheetId) {
      dispatch({
        type: "replace",
        nextState: INITIAL_LINK_SHEET_GATE_STATE
      });
      return;
    }
    if (!canProcessLinkMode) {
      dispatch({
        type: "replace",
        nextState: {
          linkSheetLocked: true,
          linkSheetBlockedMessage: indT("Auth_PermissionDenied_Body", "No permission."),
          linkSheetCheckBusy: false
        }
      });
      return;
    }
    let cancelled = false;
    dispatch({
      type: "patch",
      patch: {
        linkSheetCheckBusy: true
      }
    });
    void (async () => {
      try {
        const response = await fetchExpenseSheetDetail(linkSheetId, {
          suppressPermissionModal: true
        });
        if (cancelled) return;
        if (response?.Success === false) {
          dispatch({
            type: "replace",
            nextState: {
              linkSheetLocked: true,
              linkSheetBlockedMessage: safeText(response.Message) || indT("ExpenseSheets_LoadError", "Could not load expense sheet detail."),
              linkSheetCheckBusy: false
            }
          });
          return;
        }
        const headers = Array.isArray(response?.Items) ? response.Items : [];
        const selectedSheet = headers.find(
          (entry) => safeText(entry?.HojaGastosId).toUpperCase() === linkSheetId.toUpperCase()
        ) || headers[0] || null;
        if (!selectedSheet) {
          dispatch({
            type: "replace",
            nextState: {
              linkSheetLocked: true,
              linkSheetBlockedMessage: indT("ExpenseSheets_NotFound", "Expense sheet was not found."),
              linkSheetCheckBusy: false
            }
          });
          return;
        }
        const mappedHeader = mapExpenseSheetHeader(selectedSheet);
        const statusCode = typeof mappedHeader.expenseSheetStatus === "number" ? mappedHeader.expenseSheetStatus : null;
        const isPaid = statusCode === EXPENSE_STATUS_PAID || hasAssignedVoucher(mappedHeader.voucher);
        const isManagingOtherUser = isManagingOtherExpenseRecord({
          canManageOtherUsers,
          currentAxUserId,
          currentCrmUserId,
          selectedManagedUserId,
          recordOwnerUserId: mappedHeader.userId,
          isCreateMode: false
        });
        const detailPolicy = resolveExpenseSheetDetailPolicy({
          statusCode,
          isManagingOtherUser,
          allowSelfManagement,
          isPaid
        });
        const isLocked = detailPolicy.interactionMode !== "full_edit";
        dispatch({
          type: "replace",
          nextState: {
            linkSheetLocked: isLocked,
            linkSheetBlockedMessage: isLocked ? resolveBlockedMessage(isPaid) : "",
            linkSheetCheckBusy: false
          }
        });
      } catch (error) {
        if (cancelled) return;
        if (isExpenseAbortLikeError(error)) {
          dispatch({
            type: "patch",
            patch: {
              linkSheetCheckBusy: false
            }
          });
          return;
        }
        dispatch({
          type: "replace",
          nextState: {
            linkSheetLocked: true,
            linkSheetBlockedMessage: error instanceof ApiFetchError && error.status === 403 ? indT("Auth_PermissionDenied_Body", "No permission.") : error instanceof Error ? error.message : indT("ExpenseSheets_LoadError", "Could not load expense sheet detail."),
            linkSheetCheckBusy: false
          }
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [
    allowSelfManagement,
    canManageOtherUsers,
    canProcessLinkMode,
    currentAxUserId,
    currentCrmUserId,
    isLinkMode,
    linkSheetId,
    resolveBlockedMessage,
    selectedManagedUserId
  ]);
  return state;
};

// Web/wwwroot/react/src/pages/gastos/tickets/ExpenseTicketsPage.tsx
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
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
var resolveLinkModeBlockedMessage = (isPaid) => {
  if (isPaid) {
    return indT("ExpenseSheets_Detail_PaidReadOnly", "Las hojas de gasto pagadas son de solo lectura.");
  }
  return indT("ExpenseSheets_Detail_ReadOnlyByStatus", "No se puede editar esta hoja de gastos en el estado actual.");
};
var EXPENSE_TICKETS_LOG_PREFIX = "[expense-tickets]";
var logExpenseTicketsInfo = (...args) => {
  if (typeof console !== "undefined" && typeof console.info === "function") {
    console.info(EXPENSE_TICKETS_LOG_PREFIX, ...args);
  }
};
var logExpenseTicketsWarn = (...args) => {
  if (typeof console !== "undefined" && typeof console.warn === "function") {
    console.warn(EXPENSE_TICKETS_LOG_PREFIX, ...args);
  }
};
var resolveCreatedTicketFilterDate = (value) => {
  return toExpenseIsoDate(value) || toExpenseIsoDate(/* @__PURE__ */ new Date());
};
var canSelectTicketForLink = (item) => {
  const fileId = safeText(item.fileId);
  return !!fileId;
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
var NewTicketIcon = () => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "h-6 w-6", children: [
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 20h-5a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v2" }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.362 11.15a3 3 0 1 0 -4.144 4.263" }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 21v-4a2 2 0 1 1 4 0v4" }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 19h4" }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 15v6" })
] });
var ExpenseTicketsPageContent = () => {
  const hasAccess = canAccess("GASTOS_TICKETS", "View");
  const canCreateTicket = canAccess("GASTOS_TICKETS", "Add");
  const canLinkSheetLines = canAccess("GASTOS_HOJA_GASTO", "Add");
  const {
    currentAxUserId,
    currentCrmUserId,
    subordinates,
    canManageOtherUsers,
    setSelectedManagedUserId,
    managementBootstrapReady,
    selectedManagedUserId,
    allowSelfManagement
  } = useAuthContext();
  const timelineContainerRef = import_react10.default.useRef(null);
  const cameraInputRef = import_react10.default.useRef(null);
  const galleryInputRef = import_react10.default.useRef(null);
  const didRestoreOnMountRef = import_react10.default.useRef(false);
  const pendingScrollRestoreRef = import_react10.default.useRef(null);
  const pendingFocusFileIdRef = import_react10.default.useRef("");
  const linkModeContext = (0, import_react10.useMemo)(() => {
    const url = new URL(window.location.href);
    const action = safeText(url.searchParams.get("action")).toLowerCase();
    const hojaGastosId = safeText(url.searchParams.get("hojaGastosId"));
    const isLinkMode2 = action === "link" && !!hojaGastosId;
    return {
      isLinkMode: isLinkMode2,
      sheetId: hojaGastosId,
      sheetOrigin: isLinkMode2 ? "sheet-link" : !!hojaGastosId ? "sheet-create" : null,
      fixedStatusFilter: isLinkMode2 ? 0 : null
    };
  }, []);
  const isLinkMode = linkModeContext.isLinkMode;
  const linkSheetId = linkModeContext.sheetId;
  const sheetCallerOrigin = linkModeContext.sheetOrigin;
  const hasSheetCallerContext = !!linkSheetId && !!sheetCallerOrigin;
  const fixedStatusFilter = linkModeContext.fixedStatusFilter;
  const canProcessLinkMode = !isLinkMode || canLinkSheetLines;
  const managedUsers = (0, import_react10.useMemo)(
    () => ensureCurrentUserInList(Array.isArray(subordinates) ? subordinates : [], currentAxUserId),
    [currentAxUserId, subordinates]
  );
  const defaultManagedUserId = (0, import_react10.useMemo)(
    () => resolveManagedUserSelection(currentAxUserId, currentAxUserId, managedUsers),
    [currentAxUserId, managedUsers]
  );
  const showManagedUserFilter = isLinkMode && canManageOtherUsers;
  const normalizeLinkModeSnapshotForLoad = (0, import_react10.useCallback)(
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
  const [linkFlowBusy, setLinkFlowBusy] = (0, import_react10.useState)(false);
  const [linkFlowStatus, setLinkFlowStatus] = (0, import_react10.useState)("");
  const [linkFlowError, setLinkFlowError] = (0, import_react10.useState)("");
  const [selectAllBusy, setSelectAllBusy] = (0, import_react10.useState)(false);
  const [selectAllError, setSelectAllError] = (0, import_react10.useState)("");
  const [linkBulkResult, setLinkBulkResult] = (0, import_react10.useState)(null);
  const paginationLabels = (0, import_react10.useMemo)(
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
  const gastoTypeOptions = (0, import_react10.useMemo)(() => {
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
  const gastoTypeLabelMap = (0, import_react10.useMemo)(() => {
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
    resetList,
    clearListCache
  } = useExpenseTicketsListData({
    hasAccess,
    pageSize: PAGE_SIZE,
    mode: isLinkMode ? "link" : "general",
    onForbidden: showPermissionModal
  });
  const { readCachedState, consumeReturnFlag, consumeReturnMode, saveCachedState, clearCachedState } = useExpenseTicketsFilterCache();
  const {
    selectionMode,
    selectedTickets,
    excludedIds,
    filteredSnapshot,
    filteredTotalCount,
    isFilteredSelectionActive,
    isSelected: isLinkTicketSelected,
    toggleTicket: toggleLinkTicketSelection,
    clearSelection: clearLinkTicketSelection,
    restoreSelection: restoreLinkTicketSelection,
    selectAllByFilters,
    hydrateVisibleTickets,
    resolveSelectedCount
  } = useExpenseTicketLinkSelection();
  const syncManagedUserSelection = (0, import_react10.useCallback)(
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
    linkSheetLocked,
    linkSheetBlockedMessage,
    linkSheetCheckBusy
  } = useExpenseTicketLinkSheetGate({
    isLinkMode,
    linkSheetId,
    canProcessLinkMode,
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    resolveBlockedMessage: resolveLinkModeBlockedMessage
  });
  const { runAutomaticListLoad } = useExpenseTicketAutomaticLoad({
    isLinkMode,
    canProcessLinkMode,
    linkSheetCheckBusy,
    linkSheetLocked,
    clearListCache,
    resetList,
    loadList
  });
  const buildInitialLinkModeSnapshot = (0, import_react10.useCallback)(() => {
    const initialManagedUserId = syncManagedUserSelection(defaultManagedUserId);
    return buildLinkModeInitialSnapshot(initialManagedUserId);
  }, [defaultManagedUserId, syncManagedUserSelection]);
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
      setLinkBulkResult(null);
      clearLinkTicketSelection();
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
      setLinkBulkResult(null);
      clearLinkTicketSelection();
      clearCachedState();
      if (isLinkMode) {
        const linkSnapshot = buildInitialLinkModeSnapshot();
        restoreAppliedFilters(linkSnapshot);
        runAutomaticListLoad(1, normalizeLinkModeSnapshotForLoad(linkSnapshot), {
          clearCache: true,
          resetBeforeLoad: true,
          waitForLinkModeSheetReady: true
        });
        return;
      }
      const resetManagedUserId = syncManagedUserSelection(currentAxUserId);
      setManagedUserId(resetManagedUserId);
      resetList("clear-filters");
    }
  });
  (0, import_react10.useEffect)(() => {
    const normalizedDefaultManagedUserId = normalizeUserId(defaultManagedUserId);
    if (!normalizedDefaultManagedUserId) return;
    setManagedUserId(normalizedDefaultManagedUserId);
    syncManagedUserSelection(normalizedDefaultManagedUserId);
  }, [defaultManagedUserId, setManagedUserId, syncManagedUserSelection]);
  (0, import_react10.useEffect)(() => {
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
    progressStages: quickTicketProgressStages,
    progressElapsedMs: quickTicketElapsedMs,
    errorMessage: quickTicketErrorMessage,
    attemptId: quickTicketAttemptId,
    hasPendingUploadRetry,
    hasPartialTicketFailure,
    traceList: quickTicketTraceList,
    openSourcePicker,
    closeSourcePicker,
    selectFromCamera,
    selectFromGallery,
    handleSelectedFile,
    retryPendingUpload,
    openCreatedTicket,
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
      if (hasSheetCallerContext && sheetCallerOrigin) {
        saveExpenseTicketReturnContext({
          fileId: createdFileId,
          sheetId: linkSheetId,
          origin: sheetCallerOrigin
        });
        const query = new URLSearchParams({
          fileId: createdFileId,
          mode: "edit",
          origin: sheetCallerOrigin,
          sheetId: linkSheetId
        });
        navigateToExpenseUrl(`/Gastos/TicketDetail?${query.toString()}`, {
          askConfirmation: false
        });
        return;
      }
      clearExpenseTicketReturnContext();
      navigateToExpenseUrl(`/Gastos/TicketDetail?fileId=${encodeURIComponent(createdFileId)}&mode=edit&origin=ticket-create`, {
        askConfirmation: false
      });
    }
  });
  const fabMenuItems = (0, import_react10.useMemo)(
    () => isLinkMode ? [] : [
      {
        id: "new-ticket",
        label: indT("ExpenseSheets_Fab_NewTicket", "Nuevo Ticket"),
        icon: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(NewTicketIcon, {}),
        onClick: openSourcePicker
      }
    ],
    [isLinkMode, openSourcePicker]
  );
  const selectedTicketCount = resolveSelectedCount(total);
  const selectedTotalAmount = (0, import_react10.useMemo)(() => {
    return selectedTickets.reduce((sum, item) => {
      const amount = Number(item.totalAmount ?? 0);
      return amount > 0 ? sum + amount : sum;
    }, 0);
  }, [selectedTickets]);
  const selectedTotalAmountText = (0, import_react10.useMemo)(() => formatAmountWithCurrency(selectedTotalAmount, ""), [selectedTotalAmount]);
  (0, import_react10.useLayoutEffect)(() => {
    setTopbarActionGroupReady("expense-tickets-list-actions");
  }, []);
  const linkModeCancelMessage = (0, import_react10.useMemo)(
    () => indT(
      "ExpenseTickets_LinkMode_CancelConfirm",
      "Se cancelar\xE1 el proceso de vinculaci\xF3n y volver\xE1s a la hoja de gastos. \xBFQuieres continuar?"
    ),
    []
  );
  const applyCreatedTicketReturn = (0, import_react10.useCallback)(
    (ticketFileId, ticketDateValue) => {
      const ticketDate = resolveCreatedTicketFilterDate(ticketDateValue);
      const createdTicketManagedUserId = normalizeUserId(currentAxUserId);
      const resolvedManagedUserId = createdTicketManagedUserId ? syncManagedUserSelection(createdTicketManagedUserId) : "";
      const querySnapshot = {
        fromDate: ticketDate,
        toDate: ticketDate,
        filterKey: ticketFileId,
        currencyCode: "",
        managedUserId: resolvedManagedUserId,
        statusFilter: "",
        gastoTypeFilter: "",
        processedByIaFilter: "all"
      };
      logExpenseTicketsInfo("applyCreatedTicketReturn:start", {
        ticketFileId,
        ticketDateValue,
        ticketDate,
        currentAxUserId,
        createdTicketManagedUserId,
        resolvedManagedUserId,
        querySnapshot
      });
      clearCachedState();
      restoreAppliedFilters(querySnapshot);
      pendingFocusFileIdRef.current = ticketFileId;
      clearListCache();
      resetList("created-ticket-return");
      logExpenseTicketsInfo("applyCreatedTicketReturn:loadList", {
        page: 1,
        querySnapshot
      });
      void loadList(1, querySnapshot);
      const url = new URL(window.location.href);
      url.searchParams.delete("ticketFileId");
      url.searchParams.delete("ticketDate");
      const cleanedQuery = url.searchParams.toString();
      window.history.replaceState({}, "", cleanedQuery ? `${url.pathname}?${cleanedQuery}` : url.pathname);
    },
    [
      clearCachedState,
      clearListCache,
      currentAxUserId,
      loadList,
      resetList,
      restoreAppliedFilters,
      syncManagedUserSelection
    ]
  );
  const restoreLinkModeReturnState = (0, import_react10.useCallback)(
    (cachedState) => {
      const restoredManagedUserId = syncManagedUserSelection(cachedState.filters.managedUserId);
      const restoredFilters = {
        ...cachedState.filters,
        managedUserId: restoredManagedUserId
      };
      restoreAppliedFilters(restoredFilters);
      pendingScrollRestoreRef.current = cachedState.scrollY;
      pendingFocusFileIdRef.current = cachedState.focusFileId;
      restoreLinkTicketSelection({
        selectionMode: cachedState.selectionMode,
        selectedTickets: cachedState.selectedTickets,
        excludedIds: cachedState.excludedIds,
        filteredSnapshot: cachedState.filteredSelectionFilters,
        filteredTotalCount: cachedState.filteredSelectionTotal
      });
      if (cachedState.items.length > 0 || cachedState.total > 0) {
        restoreListSnapshot({
          items: cachedState.items,
          total: cachedState.total,
          page: cachedState.page
        });
      }
      runAutomaticListLoad(cachedState.page, normalizeLinkModeSnapshotForLoad(restoredFilters), {
        clearCache: true,
        waitForLinkModeSheetReady: true
      });
    },
    [
      normalizeLinkModeSnapshotForLoad,
      restoreAppliedFilters,
      restoreLinkTicketSelection,
      restoreListSnapshot,
      runAutomaticListLoad,
      syncManagedUserSelection
    ]
  );
  const restoreInitialLinkModeState = (0, import_react10.useCallback)(() => {
    const linkSnapshot = buildInitialLinkModeSnapshot();
    clearCachedState();
    clearExpenseTicketLinkReturnState();
    clearLinkTicketSelection();
    setLinkBulkResult(null);
    restoreAppliedFilters(linkSnapshot);
    runAutomaticListLoad(1, normalizeLinkModeSnapshotForLoad(linkSnapshot), {
      clearCache: true,
      resetBeforeLoad: true,
      waitForLinkModeSheetReady: true
    });
  }, [
    buildInitialLinkModeSnapshot,
    clearCachedState,
    clearExpenseTicketLinkReturnState,
    clearLinkTicketSelection,
    normalizeLinkModeSnapshotForLoad,
    restoreAppliedFilters,
    runAutomaticListLoad
  ]);
  const restoreStandardReturnState = (0, import_react10.useCallback)(
    (cachedState) => {
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
      }
      runAutomaticListLoad(cachedState.page, restoredFilters, {
        clearCache: true
      });
    },
    [restoreAppliedFilters, restoreListSnapshot, runAutomaticListLoad, syncManagedUserSelection]
  );
  const restoreDeleteReturnState = (0, import_react10.useCallback)(() => {
    clearCachedState();
    clearExpenseTicketLinkReturnState();
    pendingScrollRestoreRef.current = null;
    pendingFocusFileIdRef.current = "";
    clearLinkTicketSelection();
    setLinkBulkResult(null);
    onClear();
  }, [clearCachedState, clearExpenseTicketLinkReturnState, clearLinkTicketSelection, onClear]);
  const toggleTicketSelection = (0, import_react10.useCallback)(
    (ticket) => {
      if (!isLinkMode || !canProcessLinkMode || linkSheetCheckBusy || linkSheetLocked || linkFlowBusy) return;
      if (ticket.kind !== "link") return;
      const fileId = safeText(ticket.fileId);
      if (!fileId) return;
      if (!canSelectTicketForLink(ticket)) return;
      setLinkBulkResult(null);
      toggleLinkTicketSelection(ticket);
    },
    [canProcessLinkMode, isLinkMode, linkFlowBusy, linkSheetCheckBusy, linkSheetLocked, toggleLinkTicketSelection]
  );
  const clearTicketSelection = (0, import_react10.useCallback)(() => {
    setSelectAllError("");
    setLinkBulkResult(null);
    clearLinkTicketSelection();
  }, [clearLinkTicketSelection]);
  const resolveActiveFilters = (0, import_react10.useCallback)(() => {
    const baseSnapshot = appliedFilters || currentFilters;
    const resolvedManagedUserId = syncManagedUserSelection(baseSnapshot.managedUserId);
    return normalizeLinkModeSnapshotForLoad({
      ...baseSnapshot,
      managedUserId: resolvedManagedUserId
    });
  }, [appliedFilters, currentFilters, normalizeLinkModeSnapshotForLoad, syncManagedUserSelection]);
  const selectAllMatchingTickets = (0, import_react10.useCallback)(async () => {
    if (!isLinkMode || !canProcessLinkMode || linkSheetCheckBusy || linkSheetLocked || linkFlowBusy || selectAllBusy) {
      return;
    }
    setSelectAllBusy(true);
    setSelectAllError("");
    setLinkBulkResult(null);
    try {
      const activeFilters = resolveActiveFilters();
      selectAllByFilters(activeFilters, total);
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
    resolveActiveFilters,
    selectAllByFilters,
    selectAllBusy,
    total
  ]);
  (0, import_react10.useEffect)(() => {
    if (!isLinkMode || items.length < 1) return;
    hydrateVisibleTickets(items.filter((item) => item.kind === "link"));
  }, [hydrateVisibleTickets, isLinkMode, items]);
  const runTicketLinkFlow = (0, import_react10.useCallback)(async () => {
    if (!isLinkMode || !linkSheetId || linkFlowBusy) {
      return false;
    }
    if (linkSheetLocked || !canProcessLinkMode) {
      const blockedMessage = linkSheetBlockedMessage || indT("ExpenseSheets_Detail_ReadOnlyByStatus", "No se puede editar esta hoja de gastos en el estado actual.");
      setLinkFlowError(blockedMessage);
      setLinkFlowStatus(blockedMessage);
      flashActionMark("errorProcess", 1500);
      return false;
    }
    const selectedCount = resolveSelectedCount(total);
    if (selectedCount < 1) {
      return false;
    }
    const activeFilters = resolveActiveFilters();
    const requestAxUserId = safeText(activeFilters.managedUserId || currentAxUserId);
    setLinkFlowBusy(true);
    setLinkFlowError("");
    setLinkBulkResult(null);
    setLinkFlowStatus(indT("ExpenseSheets_NewTicket_Status_LinkingLine", "Linking expense line..."));
    try {
      const response = await linkExpenseSheetTicketsBulk(
        isFilteredSelectionActive ? {
          expenseSheetId: linkSheetId,
          selectionMode: "filtered",
          filters: buildExpenseTicketLinkBulkFilters(filteredSnapshot || activeFilters),
          excludedIds
        } : {
          expenseSheetId: linkSheetId,
          selectionMode: "selected",
          ticketIds: selectedTickets.map((item) => safeText(item.fileId)).filter(Boolean)
        },
        {
          suppressPermissionModal: true,
          axUserIdOverride: requestAxUserId || void 0
        }
      );
      const result = response.Data || null;
      if (!result) {
        const failureMessage = response.Message || indT("Api_RequestFailed", "Request failed.");
        setLinkFlowError(failureMessage);
        setLinkFlowStatus(failureMessage);
        flashActionMark("errorProcess", 1500);
        return false;
      }
      setLinkBulkResult(result);
      if (result.linkedCount > 0) {
        clearTicketSelection();
        clearCachedState();
        clearExpenseTicketLinkReturnState();
        clearExpenseTicketReturnContext();
        const successMark = result.failedCount > 0 || result.skippedCount > 0 ? "warningProcess" : "okProcess";
        flashActionMark(successMark, successMark === "okProcess" ? 1200 : 1500);
        navigateToExpenseUrl(buildExpenseSheetDetailUrl(linkSheetId), {
          askConfirmation: false,
          bypassGuardOnce: true
        });
        return true;
      }
      await loadList(currentPage < 1 ? 1 : currentPage, activeFilters);
      if (result.failedCount > 0 && result.linkedCount < 1) {
        const failureMessage = response.Message || indT("Api_RequestFailed", "Request failed.");
        setLinkFlowStatus(failureMessage);
        flashActionMark("errorProcess", 1500);
        return true;
      }
      if (result.failedCount > 0 || result.skippedCount > 0) {
        setLinkFlowStatus(response.Message || indT("Common_OK", "OK"));
        flashActionMark("warningProcess", 1500);
        return true;
      }
      setLinkFlowStatus(response.Message || indT("Common_OK", "OK"));
      flashActionMark("okProcess", 1200);
      return true;
    } catch (error) {
      const failureMessage = error instanceof Error ? error.message : indT("Api_RequestFailed", "Request failed.");
      setLinkFlowError(failureMessage);
      setLinkFlowStatus(failureMessage);
      flashActionMark("errorProcess", 1500);
      return false;
    } finally {
      setLinkFlowBusy(false);
    }
  }, [
    buildExpenseSheetDetailUrl,
    canProcessLinkMode,
    clearCachedState,
    clearTicketSelection,
    currentPage,
    currentAxUserId,
    excludedIds,
    filteredSnapshot,
    isLinkMode,
    isFilteredSelectionActive,
    linkFlowBusy,
    linkSheetId,
    linkSheetBlockedMessage,
    linkSheetLocked,
    loadList,
    resolveActiveFilters,
    resolveSelectedCount,
    selectedTickets,
    total
  ]);
  const openLinkConfirmModal = (0, import_react10.useCallback)(() => {
    if (!isLinkMode || selectedTicketCount < 1 || linkFlowBusy || linkSheetCheckBusy || linkSheetLocked) {
      return;
    }
    setLinkFlowError("");
    setLinkFlowStatus("");
    openConfirm({
      title: indT("ExpenseTickets_LinkMode_LinkButton", "Vincular ticket(s)"),
      message: isFilteredSelectionActive ? `${indT("Nav_ExpenseTickets", "Tickets")}: ${selectedTicketCount}` : `${indT("Nav_ExpenseTickets", "Tickets")}: ${selectedTicketCount}
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
    isFilteredSelectionActive,
    openConfirm,
    selectedTotalAmountText,
    runTicketLinkFlow
  ]);
  const handleModalConfirm = (0, import_react10.useCallback)(async () => {
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
  const handleModalButtonConfirm = (0, import_react10.useCallback)(() => {
    if (!linkFlowBusy && linkFlowError) {
      closeConfirm();
      return;
    }
    void handleModalConfirm();
  }, [closeConfirm, handleModalConfirm, linkFlowBusy, linkFlowError]);
  const openTicketDetail = (0, import_react10.useCallback)(
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
        selectedTickets,
        linkModeSheetId: isLinkMode ? linkSheetId : "",
        selectionMode,
        excludedIds,
        filteredSelectionFilters: filteredSnapshot,
        filteredSelectionTotal: filteredTotalCount
      };
      if (isLinkMode) {
        saveCachedState(currentState);
        saveExpenseTicketLinkReturnState({
          sheetId: linkSheetId,
          page: currentState.page,
          scrollY: currentState.scrollY,
          focusFileId: fileId,
          filters: snapshot,
          selectionMode,
          selectedTickets,
          excludedIds,
          filteredSelectionFilters: filteredSnapshot,
          filteredSelectionTotal: filteredTotalCount
        });
        const query = new URLSearchParams({
          fileId
        });
        if (hasSheetCallerContext && sheetCallerOrigin) {
          saveExpenseTicketReturnContext({
            fileId,
            sheetId: linkSheetId,
            origin: sheetCallerOrigin
          });
          query.set("origin", sheetCallerOrigin);
          query.set("sheetId", linkSheetId);
        }
        navigateToExpenseUrl(`/Gastos/TicketDetail?${query.toString()}`, {
          askConfirmation: false,
          bypassGuardOnce: true
        });
        return;
      }
      saveCachedState(currentState);
      if (hasSheetCallerContext && sheetCallerOrigin) {
        saveExpenseTicketReturnContext({
          fileId,
          sheetId: linkSheetId,
          origin: sheetCallerOrigin
        });
        const query = new URLSearchParams({
          fileId,
          origin: sheetCallerOrigin,
          sheetId: linkSheetId
        });
        navigateToExpenseUrl(`/Gastos/TicketDetail?${query.toString()}`, {
          askConfirmation: true,
          bypassGuardOnce: false
        });
        return;
      }
      clearExpenseTicketReturnContext();
      navigateToExpenseUrl(`/Gastos/TicketDetail?fileId=${encodeURIComponent(fileId)}`, {
        askConfirmation: true,
        bypassGuardOnce: false
      });
    },
    [
      appliedFilters,
      currentPage,
      currentFilters,
      hasSheetCallerContext,
      linkSheetId,
      isLinkMode,
      items,
      filteredTotalCount,
      filteredSnapshot,
      excludedIds,
      sheetCallerOrigin,
      saveCachedState,
      saveExpenseTicketLinkReturnState,
      selectedTickets,
      selectionMode,
      total
    ]
  );
  const resolveClickableCard = (0, import_react10.useCallback)((target) => {
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
  const showListLoading = isLoading;
  const linkModeSelectionButtonsDisabled = linkFlowBusy || selectAllBusy || isLoading;
  const summaryItems = (0, import_react10.useMemo)(() => {
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
  (0, import_react10.useEffect)(() => {
    if (!isLinkMode) return;
    setExpenseNavigationGuard({
      active: true,
      message: linkModeCancelMessage
    });
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [isLinkMode, linkModeCancelMessage]);
  (0, import_react10.useEffect)(() => {
    logExpenseTicketsInfo("mountRestoreEffect:enter", {
      url: typeof window !== "undefined" ? window.location.href : "",
      didRestoreOnMount: didRestoreOnMountRef.current,
      hasAccess,
      isLinkMode,
      managementBootstrapReady
    });
    if (didRestoreOnMountRef.current) {
      logExpenseTicketsWarn("mountRestoreEffect:skip-already-restored");
      return;
    }
    if (!hasAccess) {
      logExpenseTicketsWarn("mountRestoreEffect:skip-no-access");
      return;
    }
    if (!isLinkMode) {
      const url = new URL(window.location.href);
      const ticketFileId = safeText(url.searchParams.get("ticketFileId"));
      if (ticketFileId) {
        logExpenseTicketsInfo("mountRestoreEffect:ticket-create-return-detected", {
          ticketFileId,
          ticketDate: url.searchParams.get("ticketDate")
        });
        didRestoreOnMountRef.current = true;
        applyCreatedTicketReturn(ticketFileId, url.searchParams.get("ticketDate"));
        return;
      }
    }
    if (!managementBootstrapReady) {
      logExpenseTicketsWarn("mountRestoreEffect:waiting-management-bootstrap");
      return;
    }
    didRestoreOnMountRef.current = true;
    const isHistoryBackForward = isExpenseHistoryBackForwardNavigation();
    const isReturnFromTicketDetail = hasExpenseReturnReferrer([
      "/Gastos/TicketDetail",
      "/Gastos/TicketLineDetail"
    ]);
    const returnMode = consumeReturnMode();
    const hasReturnFlag = consumeReturnFlag();
    logExpenseTicketsInfo("mountRestoreEffect:resolved-return-state", {
      isHistoryBackForward,
      isReturnFromTicketDetail,
      returnMode,
      hasReturnFlag,
      isLinkMode
    });
    if (returnMode === "reset_filters" && hasReturnFlag) {
      logExpenseTicketsInfo("mountRestoreEffect:restore-delete-return");
      restoreDeleteReturnState();
      return;
    }
    if (isLinkMode) {
      const isReturningFromDetail = hasReturnFlag || isHistoryBackForward || isReturnFromTicketDetail;
      const cachedState2 = isReturningFromDetail ? readCachedState() : null;
      const cachedSheetId = safeText(cachedState2?.linkModeSheetId);
      if (cachedState2 && cachedSheetId && cachedSheetId === safeText(linkSheetId)) {
        logExpenseTicketsInfo("mountRestoreEffect:restore-link-mode-cache", {
          cachedSheetId,
          page: cachedState2.page
        });
        clearExpenseTicketLinkReturnState();
        restoreLinkModeReturnState(cachedState2);
        return;
      }
      const linkReturnState = isReturningFromDetail ? readExpenseTicketLinkReturnState(linkSheetId) : null;
      if (linkReturnState) {
        logExpenseTicketsInfo("mountRestoreEffect:restore-link-mode-return-state", {
          sheetId: linkReturnState.sheetId,
          page: linkReturnState.page
        });
        clearExpenseTicketLinkReturnState();
        restoreLinkModeReturnState({
          filters: linkReturnState.filters,
          page: linkReturnState.page,
          scrollY: linkReturnState.scrollY,
          focusFileId: linkReturnState.focusFileId,
          items: [],
          selectedTickets: linkReturnState.selectedTickets,
          total: 0,
          linkModeSheetId: linkReturnState.sheetId,
          selectionMode: linkReturnState.selectionMode,
          excludedIds: linkReturnState.excludedIds,
          filteredSelectionFilters: linkReturnState.filteredSelectionFilters,
          filteredSelectionTotal: linkReturnState.filteredSelectionTotal
        });
        return;
      }
      logExpenseTicketsInfo("mountRestoreEffect:restore-initial-link-mode");
      restoreInitialLinkModeState();
      return;
    }
    if (!hasReturnFlag && !isHistoryBackForward && !isReturnFromTicketDetail) {
      logExpenseTicketsInfo("mountRestoreEffect:clear-cache-no-return-context");
      clearCachedState();
      return;
    }
    const cachedState = readCachedState();
    if (!cachedState) {
      logExpenseTicketsWarn("mountRestoreEffect:no-cached-state");
      clearCachedState();
      return;
    }
    logExpenseTicketsInfo("mountRestoreEffect:restore-standard-cache", {
      page: cachedState.page,
      focusFileId: cachedState.focusFileId
    });
    restoreStandardReturnState(cachedState);
  }, [
    applyCreatedTicketReturn,
    clearCachedState,
    clearExpenseTicketLinkReturnState,
    consumeReturnFlag,
    consumeReturnMode,
    hasAccess,
    isLinkMode,
    linkSheetId,
    managementBootstrapReady,
    readCachedState,
    readExpenseTicketLinkReturnState,
    restoreDeleteReturnState,
    restoreInitialLinkModeState,
    restoreLinkModeReturnState,
    restoreStandardReturnState
  ]);
  (0, import_react10.useEffect)(() => {
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
  (0, import_react10.useEffect)(() => {
    if (!managementBootstrapReady || !hasAccess) return;
    const handlePageShow = (event) => {
      if (!event.persisted && !isExpenseHistoryBackForwardNavigation()) return;
      const snapshot = resolveActiveFilters();
      if (!isLinkMode && (!snapshot.fromDate || !snapshot.toDate)) {
        return;
      }
      runAutomaticListLoad(currentPage < 1 ? 1 : currentPage, snapshot, {
        clearCache: true
      });
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [currentPage, hasAccess, isLinkMode, managementBootstrapReady, resolveActiveFilters, runAutomaticListLoad]);
  (0, import_react10.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "input",
      {
        ref: cameraInputRef,
        type: "file",
        accept: TICKET_IMAGE_ACCEPT_ATTRIBUTE,
        capture: "environment",
        className: "hidden",
        onChange: (event) => {
          const file = event.currentTarget.files?.[0] || null;
          event.currentTarget.value = "";
          void handleSelectedFile(file, "camera");
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "input",
      {
        ref: galleryInputRef,
        type: "file",
        accept: TICKET_IMAGE_ACCEPT_ATTRIBUTE,
        className: "hidden",
        onChange: (event) => {
          const file = event.currentTarget.files?.[0] || null;
          event.currentTarget.value = "";
          void handleSelectedFile(file, "gallery");
        }
      }
    ),
    !isLinkMode && sourcePickerOpen ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/45 px-4 py-6", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-xl", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { className: "text-[16px] font-semibold text-slate-800", children: indT("ExpenseSheets_NewTicket_Source_Title", "Nuevo ticket") }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mt-1 text-sm text-slate-600", children: indT(
        "ExpenseSheets_NewTicket_Source_Body",
        "Selecciona una fuente para capturar o elegir la imagen del ticket."
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "mt-4 grid grid-cols-1 gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "button",
          {
            type: "button",
            className: "ind-action-btn w-full px-3 py-2 text-sm",
            onClick: () => {
              void selectFromCamera(cameraInputRef.current);
            },
            children: indT("ExpenseSheets_NewTicket_Source_Camera", "Usar c\xE1mara")
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "button",
          {
            type: "button",
            className: "ind-action-btn w-full px-3 py-2 text-sm",
            onClick: () => selectFromGallery(galleryInputRef.current),
            children: indT("ExpenseSheets_NewTicket_Source_Gallery", "Elegir imagen")
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
    !isLinkMode ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      ExpenseQuickTicketProgressOverlay_default,
      {
        open: quickTicketBusy,
        title: indT("ExpenseSheets_NewTicket_Progress_Title", "Processing ticket"),
        summary: quickTicketProgressMessage || indT("Common_Loading", "Loading"),
        elapsedMs: quickTicketElapsedMs,
        stages: quickTicketProgressStages
      }
    ) : null,
    !isLinkMode && quickTicketErrorMessage ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "div",
      {
        className: hasPartialTicketFailure ? "glass-panel shadow-card space-y-2 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900" : "glass-panel shadow-card space-y-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: quickTicketErrorMessage }),
          quickTicketAttemptId ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "p",
            {
              className: hasPartialTicketFailure ? "rounded-lg border border-amber-200 bg-white px-2 py-1 font-mono text-[11px] text-amber-900 break-all" : "rounded-lg border border-rose-200 bg-white px-2 py-1 font-mono text-[11px] text-rose-800 break-all",
              children: `attemptId: ${quickTicketAttemptId}`
            }
          ) : null,
          quickTicketTraceList.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "div",
            {
              className: hasPartialTicketFailure ? "rounded-lg border border-amber-200 bg-white p-2 text-xs text-amber-800" : "rounded-lg border border-rose-200 bg-white p-2 text-xs text-rose-700",
              children: quickTicketTraceList.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: `${entry.step}: ${entry.traceId}` }, `${entry.step}-${entry.at}`))
            }
          ) : null,
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-wrap gap-2", children: [
            hasPartialTicketFailure ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "ind-action-btn px-3 py-1.5 text-xs", onClick: openCreatedTicket, children: indT("ExpenseSheets_NewTicket_OpenCreatedTicket", "Open created ticket") }) : null,
            hasPendingUploadRetry ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "ind-action-btn px-3 py-1.5 text-xs", onClick: clearQuickTicketError, children: indT("Common_Close", "Close") })
          ] })
        ]
      }
    ) : null,
    showSummary ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "filter-card filter-card--summary p-3 sm:p-4 mt-1 mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "expense-summary-grid grid grid-cols-1 min-[360px]:grid-cols-2 items-start gap-x-4 gap-y-1 text-xs", children: summaryItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "div",
      {
        className: "history-filter-summary history-filter-summary--grid-item leading-5 min-w-0",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "history-filter-summary__label font-semibold", children: [
            item.label,
            ":"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "history-filter-summary__value break-words", children: item.value })
        ]
      },
      item.key
    )) }) }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      ExpenseTicketsFiltersPanel_default,
      {
        mode: isLinkMode ? "link" : "general",
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
    isLinkMode ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "space-y-2 px-0.5", children: [
      !canProcessLinkMode ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "text-sm text-rose-700", children: indT("Auth_PermissionDenied_Body", "No permission.") }) : null,
      canProcessLinkMode && linkSheetCheckBusy ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-2 text-sm text-slate-700", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Spinner_default, { size: "h-4 w-4", label: indT("Common_Loading", "Loading") }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: indT("Common_Loading", "Loading") })
      ] }) : null,
      canProcessLinkMode && !linkSheetCheckBusy && selectAllBusy ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-2 text-sm text-slate-700", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Spinner_default, { size: "h-4 w-4", label: indT("Common_Loading", "Loading") }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: indT("Common_Loading", "Loading") })
      ] }) : null,
      canProcessLinkMode && !linkSheetCheckBusy && linkSheetLocked ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "text-sm text-rose-700", children: linkSheetBlockedMessage || indT("ExpenseSheets_Detail_ReadOnlyByStatus", "No se puede editar esta hoja de gastos en el estado actual.") }) : null,
      canProcessLinkMode && !linkSheetCheckBusy && !linkSheetLocked && selectAllError ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "text-sm text-rose-700", children: selectAllError }) : null,
      canProcessLinkMode && !linkSheetCheckBusy && !linkSheetLocked ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_runtime6.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "mb-5 grid grid-cols-2 gap-1.5 pt-0.5 sm:mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "button",
          {
            type: "button",
            className: "ind-action-btn w-full min-w-0 px-1.5 py-1 text-[10px] leading-tight sm:text-xs",
            onClick: () => {
              void selectAllMatchingTickets();
            },
            disabled: linkModeSelectionButtonsDisabled || total < 1,
            children: indT("ExpenseTickets_LinkMode_SelectAll", "Seleccionar todo")
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "button",
          {
            type: "button",
            className: "ind-action-btn w-full min-w-0 px-1.5 py-1 text-[10px] leading-tight sm:text-xs",
            onClick: clearTicketSelection,
            disabled: linkModeSelectionButtonsDisabled || selectedTicketCount < 1,
            children: indT("ExpenseTickets_LinkMode_ClearAll", "Borrar selecci\xF3n")
          }
        )
      ] }) }) : null
    ] }) : null,
    isLinkMode ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ExpenseTicketLinkBulkSummary_default, { result: linkBulkResult }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "div",
      {
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: showListLoading ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "text-danger", children: errorMessage }) : null,
    !showListLoading && !errorMessage && items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "timeline-box timeline-empty", "data-empty-text": indT("Common_NoData", "No data") }) : null,
    !errorMessage && items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { ref: timelineContainerRef, className: "timeline-box", children: items.map((item) => {
      const fileId = safeText(item.fileId);
      const dateParts = formatExpenseDateParts(item.transDate, document?.documentElement?.lang || "es-ES");
      const title = safeText(item.description) || safeText(item.fileName) || fileId || "-";
      const amountText = formatAmountWithCurrency(item.totalAmount ?? null, safeText(item.currencyCode));
      const statusCode = item.kind === "general" ? item.status : null;
      const statusLabel = statusCode === null ? void 0 : getExpenseTicketStatusLabel(statusCode);
      const isAssignedToExpenseSheet = statusCode === 1;
      const showProcessedByAiIcon = item.processedByAI === true;
      const isSelectableInLinkMode = isLinkMode && canSelectTicketForLink(item);
      const isSelectedInLinkMode = isLinkMode && isLinkTicketSelected(fileId);
      const processedByAiLabel = indT("Tickets_Filter_ProcessedByIA", "Processed by IA");
      const selectTicketLabel = indT("ExpenseTickets_LinkMode_SelectTicket", "Seleccionar ticket");
      const gastoTypeCode = item.gastoType === null ? "" : String(item.gastoType);
      const gastoTypeLabel = gastoTypeCode ? gastoTypeLabelMap.get(gastoTypeCode) || gastoTypeCode : indT("Common_NotAvailable", "N/A");
      const cardSubtitle = gastoTypeLabel;
      const ticketCardKey = fileId || `${safeText(item.fileName)}-${safeText(item.transDate)}-${safeText(item.description)}-${String(item.totalAmount ?? "")}`;
      if (isLinkMode && item.kind === "link") {
        return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          ExpenseTicketLinkTimelineItem_default,
          {
            fileId,
            dateParts,
            title,
            subtitle: cardSubtitle,
            amountText,
            isSelected: isSelectedInLinkMode,
            isSelectable: isSelectableInLinkMode,
            selectionDisabled: linkFlowBusy || linkSheetCheckBusy || linkSheetLocked,
            selectLabel: selectTicketLabel,
            onOpenDetail: () => openTicketDetail(fileId),
            onToggleSelect: () => toggleTicketSelection(item)
          },
          ticketCardKey
        );
      }
      const baseStatusIcons = isAssignedToExpenseSheet || showProcessedByAiIcon ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
        isAssignedToExpenseSheet ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "expense-ticket-card__status-icon", role: "img", "aria-label": statusLabel, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "h-4 w-4", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
          }
        ) }) }) : null,
        showProcessedByAiIcon ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "span",
          {
            className: "expense-ticket-card__status-icon expense-ticket-card__status-icon--ai",
            role: "img",
            "aria-label": processedByAiLabel,
            children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "h-4 w-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 18l4-12l4 12" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 13h4" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 6h6" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M17 6v12" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 18h6" })
            ] })
          }
        ) : null
      ] }) : null;
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "div",
        {
          className: "timeline-item",
          "data-ticket-file-id": fileId || void 0,
          children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            ExpenseTimelineCard_default,
            {
              dateParts,
              title,
              subtitle: cardSubtitle,
              amountText,
              onOpen: () => openTicketDetail(fileId),
              titleClassName: "expense-ticket-card__title timeline-name",
              statusLabel,
              statusIcon: baseStatusIcons,
              statusIconClassName: "expense-ticket-card__status-icons"
            }
          )
        },
        ticketCardKey
      );
    }) }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
    isLinkMode && canProcessLinkMode && !linkSheetCheckBusy && !linkSheetLocked ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(PageBottomActions_default, { ariaLabel: indT("ExpenseTickets_LinkMode_LinkButton", "Vincular ticket(s)"), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      PageBottomActionButton,
      {
        label: indT("ExpenseTickets_LinkMode_LinkButton", "Vincular ticket(s)"),
        onClick: openLinkConfirmModal,
        disabled: linkFlowBusy || selectAllBusy || selectedTicketCount < 1
      }
    ) }) : null,
    canCreateTicket && !isLinkMode ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      FloatingActionButton_default,
      {
        ariaLabel: indT("ExpenseSheets_Fab_Actions", "Acciones r\xE1pidas"),
        size: 76,
        right: 16,
        bottom: 24,
        menuAriaLabel: indT("ExpenseSheets_Fab_Actions", "Acciones r\xE1pidas"),
        menuItems: fabMenuItems
      }
    ) : null
  ] });
};
var ExpenseTicketsPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(VisitasPageProviders_default, { enableExpenseManagement: true, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ExpenseTicketsPageContent, {}) });
};
var mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-tickets-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ExpenseTicketsPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseTicketsPage_default = ExpenseTicketsPage;
export {
  ExpenseTicketsPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL0V4cGVuc2VUaWNrZXRzUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL3VzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZUxheW91dEVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uLCB7IHR5cGUgRmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbSB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgUGFnZUJvdHRvbUFjdGlvbnMsIHsgUGFnZUJvdHRvbUFjdGlvbkJ1dHRvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUGFnZUJvdHRvbUFjdGlvbnMudHN4XCI7XG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4XCI7XG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCwgdHlwZSBBdXRoTWFuYWdlZFVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcbmltcG9ydCBFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbS50c3hcIjtcbmltcG9ydCBFeHBlbnNlVGlja2V0TGlua0J1bGtTdW1tYXJ5IGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5rQnVsa1N1bW1hcnkudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWwgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWwudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5IGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheS50c3hcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlVGlja2V0U3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHtcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgsXG4gIGxpbmtFeHBlbnNlU2hlZXRUaWNrZXRzQnVsayxcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSwgc2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQWN0aW5nVXNlci50c1wiO1xuaW1wb3J0IHsgdG9FeHBlbnNlSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsIG5hdmlnYXRlVG9FeHBlbnNlVXJsLCBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyBtYXBXaW5kb3dFbnVtT3B0aW9ucywgdHlwZSBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5pbXBvcnQge1xuICBidWlsZEV4cGVuc2VTaGVldERldGFpbFVybCxcbiAgY2xlYXJFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcbiAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcbmltcG9ydCB7IGhhc0V4cGVuc2VSZXR1cm5SZWZlcnJlciwgaXNFeHBlbnNlSGlzdG9yeUJhY2tGb3J3YXJkTmF2aWdhdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlSGlzdG9yeU5hdmlnYXRpb24udHNcIjtcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMsIGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgc2FmZVRleHQsIHN0YXJ0T2ZEYXksIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93IH0gZnJvbSBcIi4uL2RldGFpbC91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cudHNcIjtcbmltcG9ydCB7IFRJQ0tFVF9JTUFHRV9BQ0NFUFRfQVRUUklCVVRFIH0gZnJvbSBcIi4uL2RldGFpbC91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dDb3JlLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0xpc3REYXRhIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZSwgdHlwZSBFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZS50c1wiO1xuaW1wb3J0IHtcbiAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxuICByZWFkRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSxcbiAgc2F2ZUV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUudHNcIjtcbmltcG9ydCB7IGJ1aWxkRXhwZW5zZVRpY2tldExpbmtCdWxrRmlsdGVycyB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlUGF5bG9hZEJ1aWxkZXJzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHR5cGUge1xuICBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxuICBFeHBlbnNlVGlja2V0TGlua0NhcmQsXG4gIEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW0sXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb24udHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWQudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldExpbmtTaGVldEdhdGUudHNcIjtcbmltcG9ydCB7IHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkgYXMgcmV2ZWFsVG9wYmFyQWN0aW9uR3JvdXAgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdG9wYmFyQWN0aW9uVmlzaWJpbGl0eS50c1wiO1xuXG5jb25zdCBQQUdFX1NJWkUgPSAxMDtcbmNvbnN0IEFMTE9XRURfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XG5cbmNvbnN0IEdBU1RPX1RZUEVfTEFCRUxfS0VZUzogUmVjb3JkPG51bWJlciwgeyBrZXk6IHN0cmluZzsgZmFsbGJhY2s6IHN0cmluZyB9PiA9IHtcbiAgMDogeyBrZXk6IFwiRW51bV9Ob25lXCIsIGZhbGxiYWNrOiBcIk5vbmVcIiB9LFxuICAxOiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9QZWFqZVwiLCBmYWxsYmFjazogXCJQZWFqZVwiIH0sXG4gIDI6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1BhcmtpbmdcIiwgZmFsbGJhY2s6IFwiUGFya2luZ1wiIH0sXG4gIDM6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0ttXCIsIGZhbGxiYWNrOiBcIkttXCIgfSxcbiAgNDogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfRGVzYXl1bm9cIiwgZmFsbGJhY2s6IFwiRGVzYXl1bm9cIiB9LFxuICA1OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9Db21pZGFcIiwgZmFsbGJhY2s6IFwiQ29taWRhXCIgfSxcbiAgNjogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfQ2VuYVwiLCBmYWxsYmFjazogXCJDZW5hXCIgfSxcbiAgNzogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfSG90ZWxcIiwgZmFsbGJhY2s6IFwiSG90ZWxcIiB9LFxuICA4OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9WYXJpb3NcIiwgZmFsbGJhY2s6IFwiVmFyaW9zXCIgfSxcbiAgMTQ6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1RheGlcIiwgZmFsbGJhY2s6IFwiVGF4aVwiIH0sXG59O1xuXG5jb25zdCBub3JtYWxpemVVc2VySWQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcblxuY29uc3QgaXNTYW1lVXNlciA9IChsZWZ0OiBzdHJpbmcsIHJpZ2h0OiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZExlZnQgPSBub3JtYWxpemVVc2VySWQobGVmdCkudG9VcHBlckNhc2UoKTtcbiAgY29uc3Qgbm9ybWFsaXplZFJpZ2h0ID0gbm9ybWFsaXplVXNlcklkKHJpZ2h0KS50b1VwcGVyQ2FzZSgpO1xuICByZXR1cm4gISFub3JtYWxpemVkTGVmdCAmJiBub3JtYWxpemVkTGVmdCA9PT0gbm9ybWFsaXplZFJpZ2h0O1xufTtcblxuY29uc3QgZW5zdXJlQ3VycmVudFVzZXJJbkxpc3QgPSAodXNlcnM6IEF1dGhNYW5hZ2VkVXNlcltdLCBjdXJyZW50QXhVc2VySWQ6IHN0cmluZyk6IEF1dGhNYW5hZ2VkVXNlcltdID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnQgPSBub3JtYWxpemVVc2VySWQoY3VycmVudEF4VXNlcklkKTtcbiAgaWYgKCFub3JtYWxpemVkQ3VycmVudCkgcmV0dXJuIHVzZXJzO1xuICBpZiAodXNlcnMuc29tZSgoZW50cnkpID0+IGlzU2FtZVVzZXIoZW50cnkuYXhVc2VySWQsIG5vcm1hbGl6ZWRDdXJyZW50KSkpIHJldHVybiB1c2VycztcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBjcm1Vc2VySWQ6IG5vcm1hbGl6ZWRDdXJyZW50LFxuICAgICAgYXhVc2VySWQ6IG5vcm1hbGl6ZWRDdXJyZW50LFxuICAgICAgbmFtZTogbm9ybWFsaXplZEN1cnJlbnQsXG4gICAgfSxcbiAgICAuLi51c2VycyxcbiAgXTtcbn07XG5cbmNvbnN0IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbiA9IChyZXF1ZXN0ZWRVc2VySWQ6IHN0cmluZywgY3VycmVudEF4VXNlcklkOiBzdHJpbmcsIHVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXSk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRSZXF1ZXN0ZWQgPSBub3JtYWxpemVVc2VySWQocmVxdWVzdGVkVXNlcklkKTtcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnQgPSBub3JtYWxpemVVc2VySWQoY3VycmVudEF4VXNlcklkKTtcbiAgaWYgKG5vcm1hbGl6ZWRSZXF1ZXN0ZWQpIHtcbiAgICBjb25zdCBmb3VuZCA9IHVzZXJzLmZpbmQoKGVudHJ5KSA9PiBpc1NhbWVVc2VyKGVudHJ5LmF4VXNlcklkLCBub3JtYWxpemVkUmVxdWVzdGVkKSk7XG4gICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQuYXhVc2VySWQ7XG4gIH1cbiAgaWYgKG5vcm1hbGl6ZWRDdXJyZW50KSB7XG4gICAgY29uc3Qgc2VsZiA9IHVzZXJzLmZpbmQoKGVudHJ5KSA9PiBpc1NhbWVVc2VyKGVudHJ5LmF4VXNlcklkLCBub3JtYWxpemVkQ3VycmVudCkpO1xuICAgIHJldHVybiBzZWxmPy5heFVzZXJJZCB8fCBub3JtYWxpemVkQ3VycmVudDtcbiAgfVxuICByZXR1cm4gXCJcIjtcbn07XG5cbmNvbnN0IGJ1aWxkTGlua01vZGVJbml0aWFsU25hcHNob3QgPSAobWFuYWdlZFVzZXJJZCA9IFwiXCIpOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0+IHtcbiAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xuICBjb25zdCBmcm9tRGF0ZSA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgLy8gS2VlcCBhdXRvbWF0aWMgbGluay1tb2RlIGxvYWQgYm91bmRlZCB0byBhdm9pZCBoZWF2eSB1cHN0cmVhbSBzY2Fucy5cbiAgZnJvbURhdGUuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAyOSk7XG5cbiAgcmV0dXJuIHtcbiAgICBmcm9tRGF0ZTogdG9Jc29EYXRlKGZyb21EYXRlKSxcbiAgICB0b0RhdGU6IHRvSXNvRGF0ZSh0b2RheSksXG4gICAgZmlsdGVyS2V5OiBcIlwiLFxuICAgIGN1cnJlbmN5Q29kZTogXCJcIixcbiAgICBtYW5hZ2VkVXNlcklkOiBub3JtYWxpemVVc2VySWQobWFuYWdlZFVzZXJJZCksXG4gICAgc3RhdHVzRmlsdGVyOiAwLFxuICAgIGdhc3RvVHlwZUZpbHRlcjogXCJcIixcbiAgICBwcm9jZXNzZWRCeUlhRmlsdGVyOiBcImFsbFwiLFxuICB9O1xufTtcblxuY29uc3QgcmVzb2x2ZUxpbmtNb2RlQmxvY2tlZE1lc3NhZ2UgPSAoaXNQYWlkOiBib29sZWFuKTogc3RyaW5nID0+IHtcbiAgaWYgKGlzUGFpZCkge1xuICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUGFpZFJlYWRPbmx5XCIsIFwiTGFzIGhvamFzIGRlIGdhc3RvIHBhZ2FkYXMgc29uIGRlIHNvbG8gbGVjdHVyYS5cIik7XG4gIH1cblxuICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1JlYWRPbmx5QnlTdGF0dXNcIiwgXCJObyBzZSBwdWVkZSBlZGl0YXIgZXN0YSBob2phIGRlIGdhc3RvcyBlbiBlbCBlc3RhZG8gYWN0dWFsLlwiKTtcbn07XG5cbmNvbnN0IEVYUEVOU0VfVElDS0VUU19MT0dfUFJFRklYID0gXCJbZXhwZW5zZS10aWNrZXRzXVwiO1xuXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c0luZm8gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS5pbmZvID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBjb25zb2xlLmluZm8oRVhQRU5TRV9USUNLRVRTX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xuICB9XG59O1xuXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c1dhcm4gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS53YXJuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBjb25zb2xlLndhcm4oRVhQRU5TRV9USUNLRVRTX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xuICB9XG59O1xuXG4vLyBLZWVwcyBjcmVhdGVkLXRpY2tldCByZXR1cm4gZmlsdGVycyBib3VuZCB0byBvbmUgdmFsaWQgbGlzdCBkYXRlLlxuY29uc3QgcmVzb2x2ZUNyZWF0ZWRUaWNrZXRGaWx0ZXJEYXRlID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIHRvRXhwZW5zZUlzb0RhdGUodmFsdWUpIHx8IHRvRXhwZW5zZUlzb0RhdGUobmV3IERhdGUoKSk7XG59O1xuXG4vLyBWYWxpZGF0ZXMgd2hldGhlciBvbmUgdGlja2V0IGNhcmQgY2FuIHBhcnRpY2lwYXRlIGluIGJ1bGsgbGluayBtb2RlLlxuY29uc3QgY2FuU2VsZWN0VGlja2V0Rm9yTGluayA9IChpdGVtOiBFeHBlbnNlVGlja2V0TGlzdFBhZ2VJdGVtKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KGl0ZW0uZmlsZUlkKTtcbiAgcmV0dXJuICEhZmlsZUlkO1xufTtcblxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxuY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXG4gIH0pO1xufTtcblxuY29uc3QgYnVpbGRGYWxsYmFja0dhc3RvVHlwZU9wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKEdBU1RPX1RZUEVfTEFCRUxfS0VZUylcbiAgICAubWFwKChbY29kZSwgY2ZnXSkgPT4gKHtcbiAgICAgIHZhbHVlOiBTdHJpbmcoY29kZSksXG4gICAgICB0ZXh0OiBpbmRUKGNmZy5rZXksIGNmZy5mYWxsYmFjayksXG4gICAgfSkpXG4gICAgLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiBOdW1iZXIobGVmdC52YWx1ZSkgLSBOdW1iZXIocmlnaHQudmFsdWUpKTtcbn07XG5cbmNvbnN0IE5ld1RpY2tldEljb24gPSAoKSA9PiAoXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwiaC02IHctNlwiPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTEwIDIwaC01YTIgMiAwIDAgMSAtMiAtMnYtOWEyIDIgMCAwIDEgMiAtMmgxYTIgMiAwIDAgMCAyIC0yYTEgMSAwIDAgMSAxIC0xaDZhMSAxIDAgMCAxIDEgMWEyIDIgMCAwIDAgMiAyaDFhMiAyIDAgMCAxIDIgMnYyXCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNC4zNjIgMTEuMTVhMyAzIDAgMSAwIC00LjE0NCA0LjI2M1wiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMjF2LTRhMiAyIDAgMSAxIDQgMHY0XCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAxOWg0XCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0yMSAxNXY2XCIgLz5cbiAgPC9zdmc+XG4pO1xuXG5jb25zdCBFeHBlbnNlVGlja2V0c1BhZ2VDb250ZW50ID0gKCkgPT4ge1xuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIlZpZXdcIik7XG4gIGNvbnN0IGNhbkNyZWF0ZVRpY2tldCA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiQWRkXCIpO1xuICBjb25zdCBjYW5MaW5rU2hlZXRMaW5lcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiQWRkXCIpO1xuICBjb25zdCB7XG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgc3Vib3JkaW5hdGVzLFxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gICAgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcbiAgfSA9IHVzZUF1dGhDb250ZXh0KCk7XG4gIGNvbnN0IHRpbWVsaW5lQ29udGFpbmVyUmVmID0gUmVhY3QudXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGNhbWVyYUlucHV0UmVmID0gUmVhY3QudXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgZ2FsbGVyeUlucHV0UmVmID0gUmVhY3QudXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgZGlkUmVzdG9yZU9uTW91bnRSZWYgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xuICBjb25zdCBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZiA9IFJlYWN0LnVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmID0gUmVhY3QudXNlUmVmKFwiXCIpO1xuICBjb25zdCBsaW5rTW9kZUNvbnRleHQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICBjb25zdCBhY3Rpb24gPSBzYWZlVGV4dCh1cmwuc2VhcmNoUGFyYW1zLmdldChcImFjdGlvblwiKSkudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBob2phR2FzdG9zSWQgPSBzYWZlVGV4dCh1cmwuc2VhcmNoUGFyYW1zLmdldChcImhvamFHYXN0b3NJZFwiKSk7XG4gICAgY29uc3QgaXNMaW5rTW9kZSA9IGFjdGlvbiA9PT0gXCJsaW5rXCIgJiYgISFob2phR2FzdG9zSWQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzTGlua01vZGUsXG4gICAgICBzaGVldElkOiBob2phR2FzdG9zSWQsXG4gICAgICBzaGVldE9yaWdpbjogaXNMaW5rTW9kZSA/IChcInNoZWV0LWxpbmtcIiBhcyBjb25zdCkgOiAoISFob2phR2FzdG9zSWQgPyAoXCJzaGVldC1jcmVhdGVcIiBhcyBjb25zdCkgOiBudWxsKSxcbiAgICAgIGZpeGVkU3RhdHVzRmlsdGVyOiBpc0xpbmtNb2RlID8gKDAgYXMgY29uc3QpIDogbnVsbCxcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaXNMaW5rTW9kZSA9IGxpbmtNb2RlQ29udGV4dC5pc0xpbmtNb2RlO1xuICBjb25zdCBsaW5rU2hlZXRJZCA9IGxpbmtNb2RlQ29udGV4dC5zaGVldElkO1xuICBjb25zdCBzaGVldENhbGxlck9yaWdpbiA9IGxpbmtNb2RlQ29udGV4dC5zaGVldE9yaWdpbjtcbiAgY29uc3QgaGFzU2hlZXRDYWxsZXJDb250ZXh0ID0gISFsaW5rU2hlZXRJZCAmJiAhIXNoZWV0Q2FsbGVyT3JpZ2luO1xuICBjb25zdCBmaXhlZFN0YXR1c0ZpbHRlciA9IGxpbmtNb2RlQ29udGV4dC5maXhlZFN0YXR1c0ZpbHRlcjtcbiAgY29uc3QgY2FuUHJvY2Vzc0xpbmtNb2RlID0gIWlzTGlua01vZGUgfHwgY2FuTGlua1NoZWV0TGluZXM7XG4gIGNvbnN0IG1hbmFnZWRVc2VycyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gZW5zdXJlQ3VycmVudFVzZXJJbkxpc3QoQXJyYXkuaXNBcnJheShzdWJvcmRpbmF0ZXMpID8gc3Vib3JkaW5hdGVzIDogW10sIGN1cnJlbnRBeFVzZXJJZCksXG4gICAgW2N1cnJlbnRBeFVzZXJJZCwgc3Vib3JkaW5hdGVzXVxuICApO1xuICBjb25zdCBkZWZhdWx0TWFuYWdlZFVzZXJJZCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uKGN1cnJlbnRBeFVzZXJJZCwgY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnMpLFxuICAgIFtjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vyc11cbiAgKTtcbiAgY29uc3Qgc2hvd01hbmFnZWRVc2VyRmlsdGVyID0gaXNMaW5rTW9kZSAmJiBjYW5NYW5hZ2VPdGhlclVzZXJzO1xuXG4gIC8vIEtlZXBzIGxpbmstbW9kZSBsaXN0IHF1ZXJpZXMgYm91bmRlZCBldmVuIHdoZW4gVUkgZmlsdGVycyBhcmUgY2xlYXJlZC5cbiAgY29uc3Qgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQgPSB1c2VDYWxsYmFjayhcbiAgICAoc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0+IHtcbiAgICAgIGlmICghaXNMaW5rTW9kZSkgcmV0dXJuIHNuYXBzaG90O1xuXG4gICAgICBjb25zdCBmYWxsYmFjayA9IGJ1aWxkTGlua01vZGVJbml0aWFsU25hcHNob3Qoc25hcHNob3QubWFuYWdlZFVzZXJJZCk7XG4gICAgICBjb25zdCBub3JtYWxpemVkRnJvbURhdGUgPSBzYWZlVGV4dChzbmFwc2hvdC5mcm9tRGF0ZSkgfHwgZmFsbGJhY2suZnJvbURhdGU7XG4gICAgICBjb25zdCBub3JtYWxpemVkVG9EYXRlID0gc2FmZVRleHQoc25hcHNob3QudG9EYXRlKSB8fCBmYWxsYmFjay50b0RhdGU7XG4gICAgICBjb25zdCBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCA9IG5vcm1hbGl6ZVVzZXJJZChzbmFwc2hvdC5tYW5hZ2VkVXNlcklkKSB8fCBmYWxsYmFjay5tYW5hZ2VkVXNlcklkO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zbmFwc2hvdCxcbiAgICAgICAgZnJvbURhdGU6IG5vcm1hbGl6ZWRGcm9tRGF0ZSxcbiAgICAgICAgdG9EYXRlOiBub3JtYWxpemVkVG9EYXRlLFxuICAgICAgICBtYW5hZ2VkVXNlcklkOiBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCxcbiAgICAgICAgc3RhdHVzRmlsdGVyOiAwLFxuICAgICAgfTtcbiAgICB9LFxuICAgIFtpc0xpbmtNb2RlXVxuICApO1xuXG4gIGNvbnN0IFtsaW5rRmxvd0J1c3ksIHNldExpbmtGbG93QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsaW5rRmxvd1N0YXR1cywgc2V0TGlua0Zsb3dTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtsaW5rRmxvd0Vycm9yLCBzZXRMaW5rRmxvd0Vycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbc2VsZWN0QWxsQnVzeSwgc2V0U2VsZWN0QWxsQnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzZWxlY3RBbGxFcnJvciwgc2V0U2VsZWN0QWxsRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtsaW5rQnVsa1Jlc3VsdCwgc2V0TGlua0J1bGtSZXN1bHRdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXN1bHREdG8gfCBudWxsPihudWxsKTtcblxuICBjb25zdCBwYWdpbmF0aW9uTGFiZWxzID0gdXNlTWVtbyhcbiAgICAoKSA9PiAoe1xuICAgICAgZmlyc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKSxcbiAgICAgIHByZXY6IGluZFQoXCJIaXN0b3J5X1BhZ2VfUHJldlwiLCBcIlByZXZpb3VzXCIpLFxuICAgICAgbmV4dDogaW5kVChcIkhpc3RvcnlfUGFnZV9OZXh0XCIsIFwiTmV4dFwiKSxcbiAgICAgIGxhc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIiksXG4gICAgfSksXG4gICAgW11cbiAgKTtcblxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcbiAgICBkZWZhdWx0Q29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpLFxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKSxcbiAgfSk7XG5cbiAgY29uc3QgZ2FzdG9UeXBlT3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiB7XG4gICAgY29uc3Qgc291cmNlID0gQXJyYXkuaXNBcnJheSh3aW5kb3cuX19FWFBFTlNFX0dBU1RPX1RZUEVTX18pID8gd2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fIDogW107XG4gICAgY29uc3QgbWFwcGVkID0gbWFwV2luZG93RW51bU9wdGlvbnMoc291cmNlKS5maWx0ZXIoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBwYXJzZWQgPSBOdW1iZXIoZW50cnkudmFsdWUpO1xuICAgICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIocGFyc2VkKSAmJiBBTExPV0VEX0dBU1RPX1RZUEVTLmhhcyhwYXJzZWQpO1xuICAgIH0pO1xuXG4gICAgaWYgKG1hcHBlZC5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gbWFwcGVkLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiBOdW1iZXIobGVmdC52YWx1ZSkgLSBOdW1iZXIocmlnaHQudmFsdWUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVpbGRGYWxsYmFja0dhc3RvVHlwZU9wdGlvbnMoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGdhc3RvVHlwZUxhYmVsTWFwID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBnYXN0b1R5cGVPcHRpb25zKSB7XG4gICAgICBtYXAuc2V0KFN0cmluZyhvcHRpb24udmFsdWUpLCBvcHRpb24udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiBtYXA7XG4gIH0sIFtnYXN0b1R5cGVPcHRpb25zXSk7XG5cbiAgY29uc3Qge1xuICAgIGl0ZW1zLFxuICAgIHRvdGFsLFxuICAgIGN1cnJlbnRQYWdlLFxuICAgIGlzTG9hZGluZyxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgbG9hZExpc3QsXG4gICAgcmVzdG9yZUxpc3RTbmFwc2hvdCxcbiAgICByZXNldExpc3QsXG4gICAgY2xlYXJMaXN0Q2FjaGUsXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0c0xpc3REYXRhKHtcbiAgICBoYXNBY2Nlc3MsXG4gICAgcGFnZVNpemU6IFBBR0VfU0laRSxcbiAgICBtb2RlOiBpc0xpbmtNb2RlID8gXCJsaW5rXCIgOiBcImdlbmVyYWxcIixcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcbiAgfSk7XG4gIGNvbnN0IHsgcmVhZENhY2hlZFN0YXRlLCBjb25zdW1lUmV0dXJuRmxhZywgY29uc3VtZVJldHVybk1vZGUsIHNhdmVDYWNoZWRTdGF0ZSwgY2xlYXJDYWNoZWRTdGF0ZSB9ID0gdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZSgpO1xuICBjb25zdCB7XG4gICAgc2VsZWN0aW9uTW9kZSxcbiAgICBzZWxlY3RlZFRpY2tldHMsXG4gICAgZXhjbHVkZWRJZHMsXG4gICAgZmlsdGVyZWRTbmFwc2hvdCxcbiAgICBmaWx0ZXJlZFRvdGFsQ291bnQsXG4gICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSxcbiAgICBpc1NlbGVjdGVkOiBpc0xpbmtUaWNrZXRTZWxlY3RlZCxcbiAgICB0b2dnbGVUaWNrZXQ6IHRvZ2dsZUxpbmtUaWNrZXRTZWxlY3Rpb24sXG4gICAgY2xlYXJTZWxlY3Rpb246IGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbixcbiAgICByZXN0b3JlU2VsZWN0aW9uOiByZXN0b3JlTGlua1RpY2tldFNlbGVjdGlvbixcbiAgICBzZWxlY3RBbGxCeUZpbHRlcnMsXG4gICAgaHlkcmF0ZVZpc2libGVUaWNrZXRzLFxuICAgIHJlc29sdmVTZWxlY3RlZENvdW50LFxuICB9ID0gdXNlRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb24oKTtcbiAgY29uc3Qgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soXG4gICAgKHJlcXVlc3RlZFVzZXJJZDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgIGNvbnN0IHJlc29sdmVkVXNlcklkID0gcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uKHJlcXVlc3RlZFVzZXJJZCwgY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnMpO1xuICAgICAgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkKHJlc29sdmVkVXNlcklkKTtcbiAgICAgIGlmICghcmVzb2x2ZWRVc2VySWQgfHwgKGN1cnJlbnRBeFVzZXJJZCAmJiBpc1NhbWVVc2VyKHJlc29sdmVkVXNlcklkLCBjdXJyZW50QXhVc2VySWQpKSkge1xuICAgICAgICBjbGVhckV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUocmVzb2x2ZWRVc2VySWQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc29sdmVkVXNlcklkO1xuICAgIH0sXG4gICAgW2N1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzLCBzZXRTZWxlY3RlZE1hbmFnZWRVc2VySWRdXG4gICk7XG4gIGNvbnN0IHtcbiAgICBsaW5rU2hlZXRMb2NrZWQsXG4gICAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UsXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxuICB9ID0gdXNlRXhwZW5zZVRpY2tldExpbmtTaGVldEdhdGUoe1xuICAgIGlzTGlua01vZGUsXG4gICAgbGlua1NoZWV0SWQsXG4gICAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcbiAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgY3VycmVudENybVVzZXJJZCxcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXG4gICAgcmVzb2x2ZUJsb2NrZWRNZXNzYWdlOiByZXNvbHZlTGlua01vZGVCbG9ja2VkTWVzc2FnZSxcbiAgfSk7XG4gIGNvbnN0IHsgcnVuQXV0b21hdGljTGlzdExvYWQgfSA9IHVzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkKHtcbiAgICBpc0xpbmtNb2RlLFxuICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcbiAgICBsaW5rU2hlZXRDaGVja0J1c3ksXG4gICAgbGlua1NoZWV0TG9ja2VkLFxuICAgIGNsZWFyTGlzdENhY2hlLFxuICAgIHJlc2V0TGlzdCxcbiAgICBsb2FkTGlzdCxcbiAgfSk7XG4gIGNvbnN0IGJ1aWxkSW5pdGlhbExpbmtNb2RlU25hcHNob3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgaW5pdGlhbE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICAgIHJldHVybiBidWlsZExpbmtNb2RlSW5pdGlhbFNuYXBzaG90KGluaXRpYWxNYW5hZ2VkVXNlcklkKTtcbiAgfSwgW2RlZmF1bHRNYW5hZ2VkVXNlcklkLCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb25dKTtcblxuICBjb25zdCB7XG4gICAgZnJvbURhdGUsXG4gICAgdG9EYXRlLFxuICAgIGZpbHRlcktleSxcbiAgICBjdXJyZW5jeUNvZGUsXG4gICAgbWFuYWdlZFVzZXJJZCxcbiAgICBzdGF0dXNGaWx0ZXIsXG4gICAgZ2FzdG9UeXBlRmlsdGVyLFxuICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVFcnJvcixcbiAgICBtYW51YWxEYXRlQXV0b09wZW5LZXksXG4gICAgYXBwbGllZEZpbHRlcnMsXG4gICAgc2hvd0ZpbHRlcnMsXG4gICAgY3VycmVudEZpbHRlcnMsXG4gICAgc2V0RmlsdGVyS2V5LFxuICAgIHNldEN1cnJlbmN5Q29kZSxcbiAgICBzZXRNYW5hZ2VkVXNlcklkLFxuICAgIHNldFN0YXR1c0ZpbHRlcixcbiAgICBzZXRHYXN0b1R5cGVGaWx0ZXIsXG4gICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgICBvbkFwcGx5LFxuICAgIG9uQ2xlYXIsXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlLFxuICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcbiAgICBvblF1aWNrRmlsdGVyQ2hhbmdlLFxuICAgIHRvZ2dsZUZpbHRlclBhbmVsLFxuICAgIHN0YXR1c0ZpbHRlckxvY2tlZCxcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlKHtcbiAgICBkZWZhdWx0TWFuYWdlZFVzZXJJZCxcbiAgICBmaXhlZFN0YXR1c0ZpbHRlcixcbiAgICBhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5OiBpc0xpbmtNb2RlLFxuICAgIG9uQXBwbHlGaWx0ZXJzOiAoc25hcHNob3QpID0+IHtcbiAgICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xuICAgICAgY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uKCk7XG4gICAgICBjb25zdCByZXNvbHZlZE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oc25hcHNob3QubWFuYWdlZFVzZXJJZCk7XG4gICAgICB2b2lkIGxvYWRMaXN0KFxuICAgICAgICAxLFxuICAgICAgICBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZCh7XG4gICAgICAgICAgLi4uc25hcHNob3QsXG4gICAgICAgICAgbWFuYWdlZFVzZXJJZDogcmVzb2x2ZWRNYW5hZ2VkVXNlcklkLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9LFxuICAgIG9uQ2xlYXJGaWx0ZXJzOiAoKSA9PiB7XG4gICAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcbiAgICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbigpO1xuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuICAgICAgaWYgKGlzTGlua01vZGUpIHtcbiAgICAgICAgY29uc3QgbGlua1NuYXBzaG90ID0gYnVpbGRJbml0aWFsTGlua01vZGVTbmFwc2hvdCgpO1xuICAgICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMobGlua1NuYXBzaG90KTtcbiAgICAgICAgcnVuQXV0b21hdGljTGlzdExvYWQoMSwgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQobGlua1NuYXBzaG90KSwge1xuICAgICAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXG4gICAgICAgICAgcmVzZXRCZWZvcmVMb2FkOiB0cnVlLFxuICAgICAgICAgIHdhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHk6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc2V0TWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihjdXJyZW50QXhVc2VySWQpO1xuICAgICAgc2V0TWFuYWdlZFVzZXJJZChyZXNldE1hbmFnZWRVc2VySWQpO1xuICAgICAgcmVzZXRMaXN0KFwiY2xlYXItZmlsdGVyc1wiKTtcbiAgICB9LFxuICB9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWREZWZhdWx0TWFuYWdlZFVzZXJJZCA9IG5vcm1hbGl6ZVVzZXJJZChkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XG4gICAgaWYgKCFub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQpIHJldHVybjtcbiAgICBzZXRNYW5hZ2VkVXNlcklkKG5vcm1hbGl6ZWREZWZhdWx0TWFuYWdlZFVzZXJJZCk7XG4gICAgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKG5vcm1hbGl6ZWREZWZhdWx0TWFuYWdlZFVzZXJJZCk7XG4gIH0sIFtkZWZhdWx0TWFuYWdlZFVzZXJJZCwgc2V0TWFuYWdlZFVzZXJJZCwgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoY2FuTWFuYWdlT3RoZXJVc2VycykgcmV0dXJuO1xuICAgIGNvbnN0IGZhbGxiYWNrTWFuYWdlZFVzZXJJZCA9IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbihjdXJyZW50QXhVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzKTtcbiAgICBjb25zdCBub3JtYWxpemVkQ3VycmVudE1hbmFnZWRVc2VySWQgPSBub3JtYWxpemVVc2VySWQobWFuYWdlZFVzZXJJZCk7XG4gICAgaWYgKGlzU2FtZVVzZXIobm9ybWFsaXplZEN1cnJlbnRNYW5hZ2VkVXNlcklkLCBmYWxsYmFja01hbmFnZWRVc2VySWQpKSByZXR1cm47XG4gICAgaWYgKCFub3JtYWxpemVkQ3VycmVudE1hbmFnZWRVc2VySWQgJiYgIWZhbGxiYWNrTWFuYWdlZFVzZXJJZCkgcmV0dXJuO1xuXG4gICAgc2V0TWFuYWdlZFVzZXJJZChmYWxsYmFja01hbmFnZWRVc2VySWQpO1xuICAgIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihmYWxsYmFja01hbmFnZWRVc2VySWQpO1xuICB9LCBbY2FuTWFuYWdlT3RoZXJVc2VycywgY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcklkLCBtYW5hZ2VkVXNlcnMsIHNldE1hbmFnZWRVc2VySWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xuXG4gIGNvbnN0IHtcbiAgICBzb3VyY2VQaWNrZXJPcGVuLFxuICAgIGJ1c3k6IHF1aWNrVGlja2V0QnVzeSxcbiAgICBwcm9ncmVzc01lc3NhZ2U6IHF1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlLFxuICAgIHByb2dyZXNzU3RhZ2VzOiBxdWlja1RpY2tldFByb2dyZXNzU3RhZ2VzLFxuICAgIHByb2dyZXNzRWxhcHNlZE1zOiBxdWlja1RpY2tldEVsYXBzZWRNcyxcbiAgICBlcnJvck1lc3NhZ2U6IHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlLFxuICAgIGF0dGVtcHRJZDogcXVpY2tUaWNrZXRBdHRlbXB0SWQsXG4gICAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5LFxuICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlLFxuICAgIHRyYWNlTGlzdDogcXVpY2tUaWNrZXRUcmFjZUxpc3QsXG4gICAgb3BlblNvdXJjZVBpY2tlcixcbiAgICBjbG9zZVNvdXJjZVBpY2tlcixcbiAgICBzZWxlY3RGcm9tQ2FtZXJhLFxuICAgIHNlbGVjdEZyb21HYWxsZXJ5LFxuICAgIGhhbmRsZVNlbGVjdGVkRmlsZSxcbiAgICByZXRyeVBlbmRpbmdVcGxvYWQsXG4gICAgb3BlbkNyZWF0ZWRUaWNrZXQsXG4gICAgY2xlYXJFcnJvcjogY2xlYXJRdWlja1RpY2tldEVycm9yLFxuICB9ID0gdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93KHtcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiAhaXNMaW5rTW9kZSAmJiBjYW5DcmVhdGVUaWNrZXQsXG4gICAgaXNDcmVhdGVNb2RlOiBmYWxzZSxcbiAgICBpc1NoZWV0TG9ja2VkOiBmYWxzZSxcbiAgICBsaW5rVG9TaGVldDogZmFsc2UsXG4gICAgYXhVc2VySWRPdmVycmlkZTogc2FmZVRleHQoY3VycmVudEF4VXNlcklkKSxcbiAgICBjdXJyZW5jeUNvZGU6IGN1cnJlbmN5Q29kZSB8fCBcIkVVUlwiLFxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxuICAgIG9uQ29tcGxldGVkOiAocmVzdWx0KSA9PiB7XG4gICAgICBjb25zdCBjcmVhdGVkRmlsZUlkID0gc2FmZVRleHQocmVzdWx0Py5maWxlSWQpO1xuICAgICAgaWYgKCFjcmVhdGVkRmlsZUlkKSByZXR1cm47XG5cbiAgICAgIGlmIChoYXNTaGVldENhbGxlckNvbnRleHQgJiYgc2hlZXRDYWxsZXJPcmlnaW4pIHtcbiAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcbiAgICAgICAgICBmaWxlSWQ6IGNyZWF0ZWRGaWxlSWQsXG4gICAgICAgICAgc2hlZXRJZDogbGlua1NoZWV0SWQsXG4gICAgICAgICAgb3JpZ2luOiBzaGVldENhbGxlck9yaWdpbixcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XG4gICAgICAgICAgZmlsZUlkOiBjcmVhdGVkRmlsZUlkLFxuICAgICAgICAgIG1vZGU6IFwiZWRpdFwiLFxuICAgICAgICAgIG9yaWdpbjogc2hlZXRDYWxsZXJPcmlnaW4sXG4gICAgICAgICAgc2hlZXRJZDogbGlua1NoZWV0SWQsXG4gICAgICAgIH0pO1xuICAgICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcbiAgICAgICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjbGVhckV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KCk7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/ZmlsZUlkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNyZWF0ZWRGaWxlSWQpfSZtb2RlPWVkaXQmb3JpZ2luPXRpY2tldC1jcmVhdGVgLCB7XG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9LFxuICB9KTtcblxuICBjb25zdCBmYWJNZW51SXRlbXMgPSB1c2VNZW1vPEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW1bXT4oXG4gICAgKCkgPT5cbiAgICAgIGlzTGlua01vZGVcbiAgICAgICAgPyBbXVxuICAgICAgICA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IFwibmV3LXRpY2tldFwiLFxuICAgICAgICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX05ld1RpY2tldFwiLCBcIk51ZXZvIFRpY2tldFwiKSxcbiAgICAgICAgICAgICAgaWNvbjogPE5ld1RpY2tldEljb24gLz4sXG4gICAgICAgICAgICAgIG9uQ2xpY2s6IG9wZW5Tb3VyY2VQaWNrZXIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgW2lzTGlua01vZGUsIG9wZW5Tb3VyY2VQaWNrZXJdXG4gICk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRUaWNrZXRDb3VudCA9IHJlc29sdmVTZWxlY3RlZENvdW50KHRvdGFsKTtcbiAgY29uc3Qgc2VsZWN0ZWRUb3RhbEFtb3VudCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBzZWxlY3RlZFRpY2tldHMucmVkdWNlKChzdW0sIGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGFtb3VudCA9IE51bWJlcihpdGVtLnRvdGFsQW1vdW50ID8/IDApO1xuICAgICAgcmV0dXJuIGFtb3VudCA+IDAgPyBzdW0gKyBhbW91bnQgOiBzdW07XG4gICAgfSwgMCk7XG4gIH0sIFtzZWxlY3RlZFRpY2tldHNdKTtcbiAgY29uc3Qgc2VsZWN0ZWRUb3RhbEFtb3VudFRleHQgPSB1c2VNZW1vKCgpID0+IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShzZWxlY3RlZFRvdGFsQW1vdW50LCBcIlwiKSwgW3NlbGVjdGVkVG90YWxBbW91bnRdKTtcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICByZXZlYWxUb3BiYXJBY3Rpb25Hcm91cChcImV4cGVuc2UtdGlja2V0cy1saXN0LWFjdGlvbnNcIik7XG4gIH0sIFtdKTtcblxuICBjb25zdCBsaW5rTW9kZUNhbmNlbE1lc3NhZ2UgPSB1c2VNZW1vKFxuICAgICgpID0+XG4gICAgICBpbmRUKFxuICAgICAgICBcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0NhbmNlbENvbmZpcm1cIixcbiAgICAgICAgXCJTZSBjYW5jZWxhclx1MDBFMSBlbCBwcm9jZXNvIGRlIHZpbmN1bGFjaVx1MDBGM24geSB2b2x2ZXJcdTAwRTFzIGEgbGEgaG9qYSBkZSBnYXN0b3MuIFx1MDBCRlF1aWVyZXMgY29udGludWFyP1wiXG4gICAgICApLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuID0gdXNlQ2FsbGJhY2soXG4gICAgKHRpY2tldEZpbGVJZDogc3RyaW5nLCB0aWNrZXREYXRlVmFsdWU6IHVua25vd24pID0+IHtcbiAgICAgIGNvbnN0IHRpY2tldERhdGUgPSByZXNvbHZlQ3JlYXRlZFRpY2tldEZpbHRlckRhdGUodGlja2V0RGF0ZVZhbHVlKTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRUaWNrZXRNYW5hZ2VkVXNlcklkID0gbm9ybWFsaXplVXNlcklkKGN1cnJlbnRBeFVzZXJJZCk7XG4gICAgICBjb25zdCByZXNvbHZlZE1hbmFnZWRVc2VySWQgPSBjcmVhdGVkVGlja2V0TWFuYWdlZFVzZXJJZFxuICAgICAgICA/IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihjcmVhdGVkVGlja2V0TWFuYWdlZFVzZXJJZClcbiAgICAgICAgOiBcIlwiO1xuXG4gICAgICBjb25zdCBxdWVyeVNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0ge1xuICAgICAgICBmcm9tRGF0ZTogdGlja2V0RGF0ZSxcbiAgICAgICAgdG9EYXRlOiB0aWNrZXREYXRlLFxuICAgICAgICBmaWx0ZXJLZXk6IHRpY2tldEZpbGVJZCxcbiAgICAgICAgY3VycmVuY3lDb2RlOiBcIlwiLFxuICAgICAgICBtYW5hZ2VkVXNlcklkOiByZXNvbHZlZE1hbmFnZWRVc2VySWQsXG4gICAgICAgIHN0YXR1c0ZpbHRlcjogXCJcIixcbiAgICAgICAgZ2FzdG9UeXBlRmlsdGVyOiBcIlwiLFxuICAgICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyOiBcImFsbFwiLFxuICAgICAgfTtcblxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwiYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuOnN0YXJ0XCIsIHtcbiAgICAgICAgdGlja2V0RmlsZUlkLFxuICAgICAgICB0aWNrZXREYXRlVmFsdWUsXG4gICAgICAgIHRpY2tldERhdGUsXG4gICAgICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICAgICAgY3JlYXRlZFRpY2tldE1hbmFnZWRVc2VySWQsXG4gICAgICAgIHJlc29sdmVkTWFuYWdlZFVzZXJJZCxcbiAgICAgICAgcXVlcnlTbmFwc2hvdCxcbiAgICAgIH0pO1xuXG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMocXVlcnlTbmFwc2hvdCk7XG4gICAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IHRpY2tldEZpbGVJZDtcbiAgICAgIGNsZWFyTGlzdENhY2hlKCk7XG4gICAgICByZXNldExpc3QoXCJjcmVhdGVkLXRpY2tldC1yZXR1cm5cIik7XG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJhcHBseUNyZWF0ZWRUaWNrZXRSZXR1cm46bG9hZExpc3RcIiwge1xuICAgICAgICBwYWdlOiAxLFxuICAgICAgICBxdWVyeVNuYXBzaG90LFxuICAgICAgfSk7XG4gICAgICB2b2lkIGxvYWRMaXN0KDEsIHF1ZXJ5U25hcHNob3QpO1xuXG4gICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgIHVybC5zZWFyY2hQYXJhbXMuZGVsZXRlKFwidGlja2V0RmlsZUlkXCIpO1xuICAgICAgdXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoXCJ0aWNrZXREYXRlXCIpO1xuICAgICAgY29uc3QgY2xlYW5lZFF1ZXJ5ID0gdXJsLnNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xuICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBcIlwiLCBjbGVhbmVkUXVlcnkgPyBgJHt1cmwucGF0aG5hbWV9PyR7Y2xlYW5lZFF1ZXJ5fWAgOiB1cmwucGF0aG5hbWUpO1xuICAgIH0sXG4gICAgW1xuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSxcbiAgICAgIGNsZWFyTGlzdENhY2hlLFxuICAgICAgY3VycmVudEF4VXNlcklkLFxuICAgICAgbG9hZExpc3QsXG4gICAgICByZXNldExpc3QsXG4gICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMsXG4gICAgICBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24sXG4gICAgXVxuICApO1xuXG4gIGNvbnN0IHJlc3RvcmVMaW5rTW9kZVJldHVyblN0YXRlID0gdXNlQ2FsbGJhY2soXG4gICAgKGNhY2hlZFN0YXRlOiBFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlKSA9PiB7XG4gICAgICBjb25zdCByZXN0b3JlZE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oY2FjaGVkU3RhdGUuZmlsdGVycy5tYW5hZ2VkVXNlcklkKTtcbiAgICAgIGNvbnN0IHJlc3RvcmVkRmlsdGVycyA9IHtcbiAgICAgICAgLi4uY2FjaGVkU3RhdGUuZmlsdGVycyxcbiAgICAgICAgbWFuYWdlZFVzZXJJZDogcmVzdG9yZWRNYW5hZ2VkVXNlcklkLFxuICAgICAgfTtcblxuICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKHJlc3RvcmVkRmlsdGVycyk7XG4gICAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gY2FjaGVkU3RhdGUuc2Nyb2xsWTtcbiAgICAgIHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50ID0gY2FjaGVkU3RhdGUuZm9jdXNGaWxlSWQ7XG4gICAgICByZXN0b3JlTGlua1RpY2tldFNlbGVjdGlvbih7XG4gICAgICAgIHNlbGVjdGlvbk1vZGU6IGNhY2hlZFN0YXRlLnNlbGVjdGlvbk1vZGUsXG4gICAgICAgIHNlbGVjdGVkVGlja2V0czogY2FjaGVkU3RhdGUuc2VsZWN0ZWRUaWNrZXRzLFxuICAgICAgICBleGNsdWRlZElkczogY2FjaGVkU3RhdGUuZXhjbHVkZWRJZHMsXG4gICAgICAgIGZpbHRlcmVkU25hcHNob3Q6IGNhY2hlZFN0YXRlLmZpbHRlcmVkU2VsZWN0aW9uRmlsdGVycyxcbiAgICAgICAgZmlsdGVyZWRUb3RhbENvdW50OiBjYWNoZWRTdGF0ZS5maWx0ZXJlZFNlbGVjdGlvblRvdGFsLFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChjYWNoZWRTdGF0ZS5pdGVtcy5sZW5ndGggPiAwIHx8IGNhY2hlZFN0YXRlLnRvdGFsID4gMCkge1xuICAgICAgICByZXN0b3JlTGlzdFNuYXBzaG90KHtcbiAgICAgICAgICBpdGVtczogY2FjaGVkU3RhdGUuaXRlbXMsXG4gICAgICAgICAgdG90YWw6IGNhY2hlZFN0YXRlLnRvdGFsLFxuICAgICAgICAgIHBhZ2U6IGNhY2hlZFN0YXRlLnBhZ2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBydW5BdXRvbWF0aWNMaXN0TG9hZChjYWNoZWRTdGF0ZS5wYWdlLCBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZChyZXN0b3JlZEZpbHRlcnMpLCB7XG4gICAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXG4gICAgICAgIHdhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHk6IHRydWUsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtcbiAgICAgIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkLFxuICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxuICAgICAgcmVzdG9yZUxpbmtUaWNrZXRTZWxlY3Rpb24sXG4gICAgICByZXN0b3JlTGlzdFNuYXBzaG90LFxuICAgICAgcnVuQXV0b21hdGljTGlzdExvYWQsXG4gICAgICBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24sXG4gICAgXVxuICApO1xuXG4gIGNvbnN0IHJlc3RvcmVJbml0aWFsTGlua01vZGVTdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBsaW5rU25hcHNob3QgPSBidWlsZEluaXRpYWxMaW5rTW9kZVNuYXBzaG90KCk7XG4gICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xuICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbigpO1xuICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhsaW5rU25hcHNob3QpO1xuICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkKDEsIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKGxpbmtTbmFwc2hvdCksIHtcbiAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXG4gICAgICByZXNldEJlZm9yZUxvYWQ6IHRydWUsXG4gICAgICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiB0cnVlLFxuICAgIH0pO1xuICB9LCBbXG4gICAgYnVpbGRJbml0aWFsTGlua01vZGVTbmFwc2hvdCxcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSxcbiAgICBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24sXG4gICAgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQsXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxuICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkLFxuICBdKTtcblxuICBjb25zdCByZXN0b3JlU3RhbmRhcmRSZXR1cm5TdGF0ZSA9IHVzZUNhbGxiYWNrKFxuICAgIChjYWNoZWRTdGF0ZTogRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSkgPT4ge1xuICAgICAgY29uc3QgcmVzdG9yZWRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGNhY2hlZFN0YXRlLmZpbHRlcnMubWFuYWdlZFVzZXJJZCk7XG4gICAgICBjb25zdCByZXN0b3JlZEZpbHRlcnMgPSB7XG4gICAgICAgIC4uLmNhY2hlZFN0YXRlLmZpbHRlcnMsXG4gICAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCxcbiAgICAgIH07XG5cbiAgICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhyZXN0b3JlZEZpbHRlcnMpO1xuICAgICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLnNjcm9sbFk7XG4gICAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLmZvY3VzRmlsZUlkO1xuXG4gICAgICBpZiAoY2FjaGVkU3RhdGUuaXRlbXMubGVuZ3RoID4gMCB8fCBjYWNoZWRTdGF0ZS50b3RhbCA+IDApIHtcbiAgICAgICAgcmVzdG9yZUxpc3RTbmFwc2hvdCh7XG4gICAgICAgICAgaXRlbXM6IGNhY2hlZFN0YXRlLml0ZW1zLFxuICAgICAgICAgIHRvdGFsOiBjYWNoZWRTdGF0ZS50b3RhbCxcbiAgICAgICAgICBwYWdlOiBjYWNoZWRTdGF0ZS5wYWdlLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcnVuQXV0b21hdGljTGlzdExvYWQoY2FjaGVkU3RhdGUucGFnZSwgcmVzdG9yZWRGaWx0ZXJzLCB7XG4gICAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtyZXN0b3JlQXBwbGllZEZpbHRlcnMsIHJlc3RvcmVMaXN0U25hcHNob3QsIHJ1bkF1dG9tYXRpY0xpc3RMb2FkLCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb25dXG4gICk7XG5cbiAgLy8gS2VlcHMgZGVsZXRlIHJldHVybiBleHBsaWNpdDogYmxhbmsgZmlsdGVycywgb3BlbiBwYW5lbCwgYW5kIG5vIGF1dG9tYXRpYyByZWxvYWQuXG4gIGNvbnN0IHJlc3RvcmVEZWxldGVSZXR1cm5TdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKCk7XG4gICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IG51bGw7XG4gICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSBcIlwiO1xuICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbigpO1xuICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xuICAgIG9uQ2xlYXIoKTtcbiAgfSwgW2NsZWFyQ2FjaGVkU3RhdGUsIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSwgY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uLCBvbkNsZWFyXSk7XG5cbiAgY29uc3QgdG9nZ2xlVGlja2V0U2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soXG4gICAgKHRpY2tldDogRXhwZW5zZVRpY2tldExpc3RQYWdlSXRlbSkgPT4ge1xuICAgICAgaWYgKCFpc0xpbmtNb2RlIHx8ICFjYW5Qcm9jZXNzTGlua01vZGUgfHwgbGlua1NoZWV0Q2hlY2tCdXN5IHx8IGxpbmtTaGVldExvY2tlZCB8fCBsaW5rRmxvd0J1c3kpIHJldHVybjtcbiAgICAgIGlmICh0aWNrZXQua2luZCAhPT0gXCJsaW5rXCIpIHJldHVybjtcblxuICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQodGlja2V0LmZpbGVJZCk7XG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xuICAgICAgaWYgKCFjYW5TZWxlY3RUaWNrZXRGb3JMaW5rKHRpY2tldCkpIHJldHVybjtcblxuICAgICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XG4gICAgICB0b2dnbGVMaW5rVGlja2V0U2VsZWN0aW9uKHRpY2tldCk7XG4gICAgfSxcbiAgICBbY2FuUHJvY2Vzc0xpbmtNb2RlLCBpc0xpbmtNb2RlLCBsaW5rRmxvd0J1c3ksIGxpbmtTaGVldENoZWNrQnVzeSwgbGlua1NoZWV0TG9ja2VkLCB0b2dnbGVMaW5rVGlja2V0U2VsZWN0aW9uXVxuICApO1xuXG4gIGNvbnN0IGNsZWFyVGlja2V0U2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFNlbGVjdEFsbEVycm9yKFwiXCIpO1xuICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xuICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbigpO1xuICB9LCBbY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uXSk7XG5cbiAgY29uc3QgcmVzb2x2ZUFjdGl2ZUZpbHRlcnMgPSB1c2VDYWxsYmFjaygoKTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9PiB7XG4gICAgY29uc3QgYmFzZVNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnMgfHwgY3VycmVudEZpbHRlcnM7XG4gICAgY29uc3QgcmVzb2x2ZWRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGJhc2VTbmFwc2hvdC5tYW5hZ2VkVXNlcklkKTtcbiAgICByZXR1cm4gbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQoe1xuICAgICAgLi4uYmFzZVNuYXBzaG90LFxuICAgICAgbWFuYWdlZFVzZXJJZDogcmVzb2x2ZWRNYW5hZ2VkVXNlcklkLFxuICAgIH0pO1xuICB9LCBbYXBwbGllZEZpbHRlcnMsIGN1cnJlbnRGaWx0ZXJzLCBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZCwgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXSk7XG5cbiAgLy8gQWN0aXZhdGVzIGJhY2tlbmQtZHJpdmVuIGZpbHRlcmVkIHNlbGVjdGlvbiBmb3IgdGhlIGN1cnJlbnQgZmlsdGVyIHNuYXBzaG90LlxuICBjb25zdCBzZWxlY3RBbGxNYXRjaGluZ1RpY2tldHMgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFpc0xpbmtNb2RlIHx8ICFjYW5Qcm9jZXNzTGlua01vZGUgfHwgbGlua1NoZWV0Q2hlY2tCdXN5IHx8IGxpbmtTaGVldExvY2tlZCB8fCBsaW5rRmxvd0J1c3kgfHwgc2VsZWN0QWxsQnVzeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldFNlbGVjdEFsbEJ1c3kodHJ1ZSk7XG4gICAgc2V0U2VsZWN0QWxsRXJyb3IoXCJcIik7XG4gICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgYWN0aXZlRmlsdGVycyA9IHJlc29sdmVBY3RpdmVGaWx0ZXJzKCk7XG4gICAgICBzZWxlY3RBbGxCeUZpbHRlcnMoYWN0aXZlRmlsdGVycywgdG90YWwpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiVGlja2V0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXRzLlwiKTtcbiAgICAgIHNldFNlbGVjdEFsbEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRTZWxlY3RBbGxCdXN5KGZhbHNlKTtcbiAgICB9XG4gIH0sIFtcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIGlzTGlua01vZGUsXG4gICAgbGlua0Zsb3dCdXN5LFxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcbiAgICBsaW5rU2hlZXRMb2NrZWQsXG4gICAgcmVzb2x2ZUFjdGl2ZUZpbHRlcnMsXG4gICAgc2VsZWN0QWxsQnlGaWx0ZXJzLFxuICAgIHNlbGVjdEFsbEJ1c3ksXG4gICAgdG90YWwsXG4gIF0pO1xuXG4gIC8vIEtlZXBzIHNlbGVjdGVkIGNhcmQgbWV0YWRhdGEgZnJlc2ggd2l0aCB0aGUgbGF0ZXN0IGxpc3QgcGF5bG9hZC5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzTGlua01vZGUgfHwgaXRlbXMubGVuZ3RoIDwgMSkgcmV0dXJuO1xuICAgIGh5ZHJhdGVWaXNpYmxlVGlja2V0cyhpdGVtcy5maWx0ZXIoKGl0ZW0pOiBpdGVtIGlzIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCA9PiBpdGVtLmtpbmQgPT09IFwibGlua1wiKSk7XG4gIH0sIFtoeWRyYXRlVmlzaWJsZVRpY2tldHMsIGlzTGlua01vZGUsIGl0ZW1zXSk7XG5cbiAgY29uc3QgcnVuVGlja2V0TGlua0Zsb3cgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFpc0xpbmtNb2RlIHx8ICFsaW5rU2hlZXRJZCB8fCBsaW5rRmxvd0J1c3kpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGxpbmtTaGVldExvY2tlZCB8fCAhY2FuUHJvY2Vzc0xpbmtNb2RlKSB7XG4gICAgICBjb25zdCBibG9ja2VkTWVzc2FnZSA9XG4gICAgICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlIHx8XG4gICAgICAgIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9SZWFkT25seUJ5U3RhdHVzXCIsIFwiTm8gc2UgcHVlZGUgZWRpdGFyIGVzdGEgaG9qYSBkZSBnYXN0b3MgZW4gZWwgZXN0YWRvIGFjdHVhbC5cIik7XG4gICAgICBzZXRMaW5rRmxvd0Vycm9yKGJsb2NrZWRNZXNzYWdlKTtcbiAgICAgIHNldExpbmtGbG93U3RhdHVzKGJsb2NrZWRNZXNzYWdlKTtcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RlZENvdW50ID0gcmVzb2x2ZVNlbGVjdGVkQ291bnQodG90YWwpO1xuICAgIGlmIChzZWxlY3RlZENvdW50IDwgMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2ZUZpbHRlcnMgPSByZXNvbHZlQWN0aXZlRmlsdGVycygpO1xuICAgIGNvbnN0IHJlcXVlc3RBeFVzZXJJZCA9IHNhZmVUZXh0KGFjdGl2ZUZpbHRlcnMubWFuYWdlZFVzZXJJZCB8fCBjdXJyZW50QXhVc2VySWQpO1xuXG4gICAgc2V0TGlua0Zsb3dCdXN5KHRydWUpO1xuICAgIHNldExpbmtGbG93RXJyb3IoXCJcIik7XG4gICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XG4gICAgc2V0TGlua0Zsb3dTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19MaW5raW5nTGluZVwiLCBcIkxpbmtpbmcgZXhwZW5zZSBsaW5lLi4uXCIpKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGxpbmtFeHBlbnNlU2hlZXRUaWNrZXRzQnVsayhcbiAgICAgICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZVxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgICBleHBlbnNlU2hlZXRJZDogbGlua1NoZWV0SWQsXG4gICAgICAgICAgICAgIHNlbGVjdGlvbk1vZGU6IFwiZmlsdGVyZWRcIixcbiAgICAgICAgICAgICAgZmlsdGVyczogYnVpbGRFeHBlbnNlVGlja2V0TGlua0J1bGtGaWx0ZXJzKGZpbHRlcmVkU25hcHNob3QgfHwgYWN0aXZlRmlsdGVycyksXG4gICAgICAgICAgICAgIGV4Y2x1ZGVkSWRzLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIDoge1xuICAgICAgICAgICAgICBleHBlbnNlU2hlZXRJZDogbGlua1NoZWV0SWQsXG4gICAgICAgICAgICAgIHNlbGVjdGlvbk1vZGU6IFwic2VsZWN0ZWRcIixcbiAgICAgICAgICAgICAgdGlja2V0SWRzOiBzZWxlY3RlZFRpY2tldHMubWFwKChpdGVtKSA9PiBzYWZlVGV4dChpdGVtLmZpbGVJZCkpLmZpbHRlcihCb29sZWFuKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICBheFVzZXJJZE92ZXJyaWRlOiByZXF1ZXN0QXhVc2VySWQgfHwgdW5kZWZpbmVkLFxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuRGF0YSB8fCBudWxsO1xuICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgY29uc3QgZmFpbHVyZU1lc3NhZ2UgPSByZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcbiAgICAgICAgc2V0TGlua0Zsb3dFcnJvcihmYWlsdXJlTWVzc2FnZSk7XG4gICAgICAgIHNldExpbmtGbG93U3RhdHVzKGZhaWx1cmVNZXNzYWdlKTtcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHNldExpbmtCdWxrUmVzdWx0KHJlc3VsdCk7XG5cbiAgICAgIGlmIChyZXN1bHQubGlua2VkQ291bnQgPiAwKSB7XG4gICAgICAgIGNsZWFyVGlja2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICAgICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKCk7XG4gICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoKTtcbiAgICAgICAgY29uc3Qgc3VjY2Vzc01hcmsgPSByZXN1bHQuZmFpbGVkQ291bnQgPiAwIHx8IHJlc3VsdC5za2lwcGVkQ291bnQgPiAwID8gXCJ3YXJuaW5nUHJvY2Vzc1wiIDogXCJva1Byb2Nlc3NcIjtcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKHN1Y2Nlc3NNYXJrLCBzdWNjZXNzTWFyayA9PT0gXCJva1Byb2Nlc3NcIiA/IDEyMDAgOiAxNTAwKTtcbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwobGlua1NoZWV0SWQpLCB7XG4gICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICAgICAgICBieXBhc3NHdWFyZE9uY2U6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgbG9hZExpc3QoY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLCBhY3RpdmVGaWx0ZXJzKTtcblxuICAgICAgaWYgKHJlc3VsdC5mYWlsZWRDb3VudCA+IDAgJiYgcmVzdWx0LmxpbmtlZENvdW50IDwgMSkge1xuICAgICAgICBjb25zdCBmYWlsdXJlTWVzc2FnZSA9IHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpO1xuICAgICAgICBzZXRMaW5rRmxvd1N0YXR1cyhmYWlsdXJlTWVzc2FnZSk7XG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN1bHQuZmFpbGVkQ291bnQgPiAwIHx8IHJlc3VsdC5za2lwcGVkQ291bnQgPiAwKSB7XG4gICAgICAgIHNldExpbmtGbG93U3RhdHVzKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpKTtcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwid2FybmluZ1Byb2Nlc3NcIiwgMTUwMCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBzZXRMaW5rRmxvd1N0YXR1cyhyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKSk7XG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgMTIwMCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgZmFpbHVyZU1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcbiAgICAgIHNldExpbmtGbG93RXJyb3IoZmFpbHVyZU1lc3NhZ2UpO1xuICAgICAgc2V0TGlua0Zsb3dTdGF0dXMoZmFpbHVyZU1lc3NhZ2UpO1xuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMaW5rRmxvd0J1c3koZmFsc2UpO1xuICAgIH1cbiAgfSwgW1xuICAgIGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsLFxuICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxuICAgIGNsZWFyVGlja2V0U2VsZWN0aW9uLFxuICAgIGN1cnJlbnRQYWdlLFxuICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICBleGNsdWRlZElkcyxcbiAgICBmaWx0ZXJlZFNuYXBzaG90LFxuICAgIGlzTGlua01vZGUsXG4gICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSxcbiAgICBsaW5rRmxvd0J1c3ksXG4gICAgbGlua1NoZWV0SWQsXG4gICAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UsXG4gICAgbGlua1NoZWV0TG9ja2VkLFxuICAgIGxvYWRMaXN0LFxuICAgIHJlc29sdmVBY3RpdmVGaWx0ZXJzLFxuICAgIHJlc29sdmVTZWxlY3RlZENvdW50LFxuICAgIHNlbGVjdGVkVGlja2V0cyxcbiAgICB0b3RhbCxcbiAgXSk7XG5cbiAgY29uc3Qgb3BlbkxpbmtDb25maXJtTW9kYWwgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFpc0xpbmtNb2RlIHx8IHNlbGVjdGVkVGlja2V0Q291bnQgPCAxIHx8IGxpbmtGbG93QnVzeSB8fCBsaW5rU2hlZXRDaGVja0J1c3kgfHwgbGlua1NoZWV0TG9ja2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0TGlua0Zsb3dFcnJvcihcIlwiKTtcbiAgICBzZXRMaW5rRmxvd1N0YXR1cyhcIlwiKTtcbiAgICBvcGVuQ29uZmlybSh7XG4gICAgICB0aXRsZTogaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0xpbmtCdXR0b25cIiwgXCJWaW5jdWxhciB0aWNrZXQocylcIiksXG4gICAgICBtZXNzYWdlOiBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlXG4gICAgICAgID8gYCR7aW5kVChcIk5hdl9FeHBlbnNlVGlja2V0c1wiLCBcIlRpY2tldHNcIil9OiAke3NlbGVjdGVkVGlja2V0Q291bnR9YFxuICAgICAgICA6IGAke2luZFQoXCJOYXZfRXhwZW5zZVRpY2tldHNcIiwgXCJUaWNrZXRzXCIpfTogJHtzZWxlY3RlZFRpY2tldENvdW50fVxcbiR7aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVG90YWxBbW91bnRcIiwgXCJUb3RhbCBhbW91bnRcIil9OiAke3NlbGVjdGVkVG90YWxBbW91bnRUZXh0fWAsXG4gICAgICBjb25maXJtVGV4dDogaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0xpbmtCdXR0b25cIiwgXCJWaW5jdWxhciB0aWNrZXQocylcIiksXG4gICAgICBjYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKSxcbiAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xuICAgICAgICByZXR1cm4gcnVuVGlja2V0TGlua0Zsb3coKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sIFtcbiAgICBpc0xpbmtNb2RlLFxuICAgIHNlbGVjdGVkVGlja2V0Q291bnQsXG4gICAgbGlua0Zsb3dCdXN5LFxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcbiAgICBsaW5rU2hlZXRMb2NrZWQsXG4gICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBzZWxlY3RlZFRvdGFsQW1vdW50VGV4dCxcbiAgICBydW5UaWNrZXRMaW5rRmxvdyxcbiAgXSk7XG5cbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIHNldExpbmtGbG93RXJyb3IoXCJcIik7XG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XG4gICAgICBidXN5OiBsaW5rRmxvd0J1c3ksXG4gICAgICBvbkVycm9yOiAobWVzc2FnZSkgPT4ge1xuICAgICAgICBzZXRMaW5rRmxvd0Vycm9yKG1lc3NhZ2UpO1xuICAgICAgICBzZXRMaW5rRmxvd1N0YXR1cyhtZXNzYWdlKTtcbiAgICAgIH0sXG4gICAgICBkZWZhdWx0RXJyb3JNZXNzYWdlOiBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIiksXG4gICAgfSk7XG4gIH0sIFtoYW5kbGVDb25maXJtLCBsaW5rRmxvd0J1c3ldKTtcblxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGxpbmtGbG93QnVzeVxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxuICAgIDogIWxpbmtGbG93QnVzeSAmJiBsaW5rRmxvd0Vycm9yXG4gICAgICA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKVxuICAgICAgOiBtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKTtcblxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFsaW5rRmxvd0J1c3kgJiYgbGlua0Zsb3dFcnJvcikge1xuICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZvaWQgaGFuZGxlTW9kYWxDb25maXJtKCk7XG4gIH0sIFtjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbGlua0Zsb3dCdXN5LCBsaW5rRmxvd0Vycm9yXSk7XG5cbiAgY29uc3Qgb3BlblRpY2tldERldGFpbCA9IHVzZUNhbGxiYWNrKFxuICAgIChyYXdGaWxlSWQ6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQocmF3RmlsZUlkKTtcbiAgICAgIGlmICghZmlsZUlkKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnMgfHwgY3VycmVudEZpbHRlcnM7XG4gICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSB7XG4gICAgICAgIGZpbHRlcnM6IHNuYXBzaG90LFxuICAgICAgICBwYWdlOiBjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsXG4gICAgICAgIHNjcm9sbFk6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuc2Nyb2xsWSB8fCAwIDogMCxcbiAgICAgICAgZm9jdXNGaWxlSWQ6IGZpbGVJZCxcbiAgICAgICAgaXRlbXMsXG4gICAgICAgIHRvdGFsLFxuICAgICAgICBzZWxlY3RlZFRpY2tldHMsXG4gICAgICAgIGxpbmtNb2RlU2hlZXRJZDogaXNMaW5rTW9kZSA/IGxpbmtTaGVldElkIDogXCJcIixcbiAgICAgICAgc2VsZWN0aW9uTW9kZSxcbiAgICAgICAgZXhjbHVkZWRJZHMsXG4gICAgICAgIGZpbHRlcmVkU2VsZWN0aW9uRmlsdGVyczogZmlsdGVyZWRTbmFwc2hvdCxcbiAgICAgICAgZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbDogZmlsdGVyZWRUb3RhbENvdW50LFxuICAgICAgfTtcblxuICAgICAgaWYgKGlzTGlua01vZGUpIHtcbiAgICAgICAgc2F2ZUNhY2hlZFN0YXRlKGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgIHNhdmVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKHtcbiAgICAgICAgICBzaGVldElkOiBsaW5rU2hlZXRJZCxcbiAgICAgICAgICBwYWdlOiBjdXJyZW50U3RhdGUucGFnZSxcbiAgICAgICAgICBzY3JvbGxZOiBjdXJyZW50U3RhdGUuc2Nyb2xsWSxcbiAgICAgICAgICBmb2N1c0ZpbGVJZDogZmlsZUlkLFxuICAgICAgICAgIGZpbHRlcnM6IHNuYXBzaG90LFxuICAgICAgICAgIHNlbGVjdGlvbk1vZGUsXG4gICAgICAgICAgc2VsZWN0ZWRUaWNrZXRzLFxuICAgICAgICAgIGV4Y2x1ZGVkSWRzLFxuICAgICAgICAgIGZpbHRlcmVkU2VsZWN0aW9uRmlsdGVyczogZmlsdGVyZWRTbmFwc2hvdCxcbiAgICAgICAgICBmaWx0ZXJlZFNlbGVjdGlvblRvdGFsOiBmaWx0ZXJlZFRvdGFsQ291bnQsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgICAgICAgIGZpbGVJZCxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChoYXNTaGVldENhbGxlckNvbnRleHQgJiYgc2hlZXRDYWxsZXJPcmlnaW4pIHtcbiAgICAgICAgICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoe1xuICAgICAgICAgICAgZmlsZUlkLFxuICAgICAgICAgICAgc2hlZXRJZDogbGlua1NoZWV0SWQsXG4gICAgICAgICAgICBvcmlnaW46IHNoZWV0Q2FsbGVyT3JpZ2luLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHF1ZXJ5LnNldChcIm9yaWdpblwiLCBzaGVldENhbGxlck9yaWdpbik7XG4gICAgICAgICAgcXVlcnkuc2V0KFwic2hlZXRJZFwiLCBsaW5rU2hlZXRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XG4gICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICAgICAgICBieXBhc3NHdWFyZE9uY2U6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNhdmVDYWNoZWRTdGF0ZShjdXJyZW50U3RhdGUpO1xuICAgICAgaWYgKGhhc1NoZWV0Q2FsbGVyQ29udGV4dCAmJiBzaGVldENhbGxlck9yaWdpbikge1xuICAgICAgICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoe1xuICAgICAgICAgIGZpbGVJZCxcbiAgICAgICAgICBzaGVldElkOiBsaW5rU2hlZXRJZCxcbiAgICAgICAgICBvcmlnaW46IHNoZWV0Q2FsbGVyT3JpZ2luLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgICAgICBmaWxlSWQsXG4gICAgICAgICAgb3JpZ2luOiBzaGVldENhbGxlck9yaWdpbixcbiAgICAgICAgICBzaGVldElkOiBsaW5rU2hlZXRJZCxcbiAgICAgICAgfSk7XG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xuICAgICAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcbiAgICAgICAgICBieXBhc3NHdWFyZE9uY2U6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjbGVhckV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KCk7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/ZmlsZUlkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGZpbGVJZCl9YCwge1xuICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXG4gICAgICAgIGJ5cGFzc0d1YXJkT25jZTogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtcbiAgICAgIGFwcGxpZWRGaWx0ZXJzLFxuICAgICAgY3VycmVudFBhZ2UsXG4gICAgICBjdXJyZW50RmlsdGVycyxcbiAgICAgIGhhc1NoZWV0Q2FsbGVyQ29udGV4dCxcbiAgICAgIGxpbmtTaGVldElkLFxuICAgICAgaXNMaW5rTW9kZSxcbiAgICAgIGl0ZW1zLFxuICAgICAgZmlsdGVyZWRUb3RhbENvdW50LFxuICAgICAgZmlsdGVyZWRTbmFwc2hvdCxcbiAgICAgIGV4Y2x1ZGVkSWRzLFxuICAgICAgc2hlZXRDYWxsZXJPcmlnaW4sXG4gICAgICBzYXZlQ2FjaGVkU3RhdGUsXG4gICAgICBzYXZlRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSxcbiAgICAgIHNlbGVjdGVkVGlja2V0cyxcbiAgICAgIHNlbGVjdGlvbk1vZGUsXG4gICAgICB0b3RhbCxcbiAgICBdXG4gICk7XG5cbiAgY29uc3QgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgPSB1c2VDYWxsYmFjaygodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcbiAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBjYXJkID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XG4gICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIXRpbWVsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY2FyZDtcbiAgfSwgW10pO1xuXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoe1xuICAgIGNvbnRhaW5lclJlZjogdGltZWxpbmVDb250YWluZXJSZWYsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGl0ZW1zLFxuICAgIHJlc29sdmVDbGlja2FibGVDYXJkLFxuICB9KTtcblxuICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKCh0b3RhbCB8fCAwKSAvIFBBR0VfU0laRSk7XG4gIGNvbnN0IHNob3dMaXN0TG9hZGluZyA9IGlzTG9hZGluZztcbiAgY29uc3QgbGlua01vZGVTZWxlY3Rpb25CdXR0b25zRGlzYWJsZWQgPSBsaW5rRmxvd0J1c3kgfHwgc2VsZWN0QWxsQnVzeSB8fCBpc0xvYWRpbmc7XG5cbiAgY29uc3Qgc3VtbWFyeUl0ZW1zID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3Qgc25hcHNob3QgPSBhcHBsaWVkRmlsdGVycztcbiAgICBpZiAoIXNuYXBzaG90KSByZXR1cm4gW10gYXMgQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9PjtcblxuICAgIGNvbnN0IHN1bW1hcnk6IEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfT4gPSBbXTtcbiAgICBjb25zdCBsb2NhbGUgPSBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIjtcbiAgICBjb25zdCBmcm9tRGF0ZVRleHQgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoc25hcHNob3QuZnJvbURhdGUsIGxvY2FsZSwgXCJcIik7XG4gICAgY29uc3QgdG9EYXRlVGV4dCA9IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShzbmFwc2hvdC50b0RhdGUsIGxvY2FsZSwgXCJcIik7XG5cbiAgICBpZiAoZnJvbURhdGVUZXh0IHx8IHRvRGF0ZVRleHQpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJmcm9tRGF0ZVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIiksXG4gICAgICAgIHZhbHVlOiBmcm9tRGF0ZVRleHQgfHwgXCItLVwiLFxuICAgICAgfSk7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwidG9EYXRlXCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpLFxuICAgICAgICB2YWx1ZTogdG9EYXRlVGV4dCB8fCBcIi0tXCIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc25hcHNob3QuZmlsdGVyS2V5LnRyaW0oKSkge1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcImZpbHRlcktleVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0ZpbHRlcktleVwiLCBcIlRpY2tldFwiKSxcbiAgICAgICAgdmFsdWU6IHNuYXBzaG90LmZpbHRlcktleS50cmltKCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc25hcHNob3QuY3VycmVuY3lDb2RlLnRyaW0oKSkge1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcImN1cnJlbmN5XCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKSxcbiAgICAgICAgdmFsdWU6IHNuYXBzaG90LmN1cnJlbmN5Q29kZS50cmltKCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc25hcHNob3Quc3RhdHVzRmlsdGVyICE9PSBcIlwiKSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwic3RhdHVzXCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzXCIsIFwiU3RhdHVzXCIpLFxuICAgICAgICB2YWx1ZTogZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsKHNuYXBzaG90LnN0YXR1c0ZpbHRlciksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc25hcHNob3QuZ2FzdG9UeXBlRmlsdGVyICE9PSBcIlwiKSB7XG4gICAgICBjb25zdCBjYXRlZ29yeUxhYmVsID0gZ2FzdG9UeXBlTGFiZWxNYXAuZ2V0KFN0cmluZyhzbmFwc2hvdC5nYXN0b1R5cGVGaWx0ZXIpKSB8fCBTdHJpbmcoc25hcHNob3QuZ2FzdG9UeXBlRmlsdGVyKTtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJjYXRlZ29yeVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIiksXG4gICAgICAgIHZhbHVlOiBjYXRlZ29yeUxhYmVsLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNuYXBzaG90LnByb2Nlc3NlZEJ5SWFGaWx0ZXIgIT09IFwiYWxsXCIpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJwcm9jZXNzZWRcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBXCIsIFwiUHJvY2Vzc2VkIGJ5IElBXCIpLFxuICAgICAgICB2YWx1ZTpcbiAgICAgICAgICBzbmFwc2hvdC5wcm9jZXNzZWRCeUlhRmlsdGVyID09PSBcInllc1wiXG4gICAgICAgICAgICA/IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBX1llc1wiLCBcIlllc1wiKVxuICAgICAgICAgICAgOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9Ob1wiLCBcIk5vXCIpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1bW1hcnk7XG4gIH0sIFthcHBsaWVkRmlsdGVycywgZ2FzdG9UeXBlTGFiZWxNYXBdKTtcblxuICBjb25zdCBzaG93U3VtbWFyeSA9ICFpc0xpbmtNb2RlICYmICFzaG93RmlsdGVycyAmJiBzdW1tYXJ5SXRlbXMubGVuZ3RoID4gMDtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNMaW5rTW9kZSkgcmV0dXJuO1xuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoe1xuICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgbWVzc2FnZTogbGlua01vZGVDYW5jZWxNZXNzYWdlLFxuICAgIH0pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcbiAgICB9O1xuICB9LCBbaXNMaW5rTW9kZSwgbGlua01vZGVDYW5jZWxNZXNzYWdlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6ZW50ZXJcIiwge1xuICAgICAgdXJsOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LmxvY2F0aW9uLmhyZWYgOiBcIlwiLFxuICAgICAgZGlkUmVzdG9yZU9uTW91bnQ6IGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQsXG4gICAgICBoYXNBY2Nlc3MsXG4gICAgICBpc0xpbmtNb2RlLFxuICAgICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxuICAgIH0pO1xuICAgIGlmIChkaWRSZXN0b3JlT25Nb3VudFJlZi5jdXJyZW50KSB7XG4gICAgICBsb2dFeHBlbnNlVGlja2V0c1dhcm4oXCJtb3VudFJlc3RvcmVFZmZlY3Q6c2tpcC1hbHJlYWR5LXJlc3RvcmVkXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWhhc0FjY2Vzcykge1xuICAgICAgbG9nRXhwZW5zZVRpY2tldHNXYXJuKFwibW91bnRSZXN0b3JlRWZmZWN0OnNraXAtbm8tYWNjZXNzXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghaXNMaW5rTW9kZSkge1xuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICBjb25zdCB0aWNrZXRGaWxlSWQgPSBzYWZlVGV4dCh1cmwuc2VhcmNoUGFyYW1zLmdldChcInRpY2tldEZpbGVJZFwiKSk7XG4gICAgICBpZiAodGlja2V0RmlsZUlkKSB7XG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDp0aWNrZXQtY3JlYXRlLXJldHVybi1kZXRlY3RlZFwiLCB7XG4gICAgICAgICAgdGlja2V0RmlsZUlkLFxuICAgICAgICAgIHRpY2tldERhdGU6IHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwidGlja2V0RGF0ZVwiKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICBhcHBseUNyZWF0ZWRUaWNrZXRSZXR1cm4odGlja2V0RmlsZUlkLCB1cmwuc2VhcmNoUGFyYW1zLmdldChcInRpY2tldERhdGVcIikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkpIHtcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzV2FybihcIm1vdW50UmVzdG9yZUVmZmVjdDp3YWl0aW5nLW1hbmFnZW1lbnQtYm9vdHN0cmFwXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkaWRSZXN0b3JlT25Nb3VudFJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICBjb25zdCBpc0hpc3RvcnlCYWNrRm9yd2FyZCA9IGlzRXhwZW5zZUhpc3RvcnlCYWNrRm9yd2FyZE5hdmlnYXRpb24oKTtcbiAgICBjb25zdCBpc1JldHVybkZyb21UaWNrZXREZXRhaWwgPSBoYXNFeHBlbnNlUmV0dXJuUmVmZXJyZXIoW1xuICAgICAgXCIvR2FzdG9zL1RpY2tldERldGFpbFwiLFxuICAgICAgXCIvR2FzdG9zL1RpY2tldExpbmVEZXRhaWxcIixcbiAgICBdKTtcbiAgICBjb25zdCByZXR1cm5Nb2RlID0gY29uc3VtZVJldHVybk1vZGUoKTtcbiAgICBjb25zdCBoYXNSZXR1cm5GbGFnID0gY29uc3VtZVJldHVybkZsYWcoKTtcblxuICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXNvbHZlZC1yZXR1cm4tc3RhdGVcIiwge1xuICAgICAgaXNIaXN0b3J5QmFja0ZvcndhcmQsXG4gICAgICBpc1JldHVybkZyb21UaWNrZXREZXRhaWwsXG4gICAgICByZXR1cm5Nb2RlLFxuICAgICAgaGFzUmV0dXJuRmxhZyxcbiAgICAgIGlzTGlua01vZGUsXG4gICAgfSk7XG5cbiAgICBpZiAocmV0dXJuTW9kZSA9PT0gXCJyZXNldF9maWx0ZXJzXCIgJiYgaGFzUmV0dXJuRmxhZykge1xuICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OnJlc3RvcmUtZGVsZXRlLXJldHVyblwiKTtcbiAgICAgIHJlc3RvcmVEZWxldGVSZXR1cm5TdGF0ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc0xpbmtNb2RlKSB7XG4gICAgICBjb25zdCBpc1JldHVybmluZ0Zyb21EZXRhaWwgPSBoYXNSZXR1cm5GbGFnIHx8IGlzSGlzdG9yeUJhY2tGb3J3YXJkIHx8IGlzUmV0dXJuRnJvbVRpY2tldERldGFpbDtcbiAgICAgIGNvbnN0IGNhY2hlZFN0YXRlID0gaXNSZXR1cm5pbmdGcm9tRGV0YWlsID8gcmVhZENhY2hlZFN0YXRlKCkgOiBudWxsO1xuICAgICAgY29uc3QgY2FjaGVkU2hlZXRJZCA9IHNhZmVUZXh0KGNhY2hlZFN0YXRlPy5saW5rTW9kZVNoZWV0SWQpO1xuICAgICAgaWYgKGNhY2hlZFN0YXRlICYmIGNhY2hlZFNoZWV0SWQgJiYgY2FjaGVkU2hlZXRJZCA9PT0gc2FmZVRleHQobGlua1NoZWV0SWQpKSB7XG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXN0b3JlLWxpbmstbW9kZS1jYWNoZVwiLCB7XG4gICAgICAgICAgY2FjaGVkU2hlZXRJZCxcbiAgICAgICAgICBwYWdlOiBjYWNoZWRTdGF0ZS5wYWdlLFxuICAgICAgICB9KTtcbiAgICAgICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKCk7XG4gICAgICAgIHJlc3RvcmVMaW5rTW9kZVJldHVyblN0YXRlKGNhY2hlZFN0YXRlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBsaW5rUmV0dXJuU3RhdGUgPSBpc1JldHVybmluZ0Zyb21EZXRhaWwgPyByZWFkRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZShsaW5rU2hlZXRJZCkgOiBudWxsO1xuICAgICAgaWYgKGxpbmtSZXR1cm5TdGF0ZSkge1xuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6cmVzdG9yZS1saW5rLW1vZGUtcmV0dXJuLXN0YXRlXCIsIHtcbiAgICAgICAgICBzaGVldElkOiBsaW5rUmV0dXJuU3RhdGUuc2hlZXRJZCxcbiAgICAgICAgICBwYWdlOiBsaW5rUmV0dXJuU3RhdGUucGFnZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xuICAgICAgICByZXN0b3JlTGlua01vZGVSZXR1cm5TdGF0ZSh7XG4gICAgICAgICAgZmlsdGVyczogbGlua1JldHVyblN0YXRlLmZpbHRlcnMsXG4gICAgICAgICAgcGFnZTogbGlua1JldHVyblN0YXRlLnBhZ2UsXG4gICAgICAgICAgc2Nyb2xsWTogbGlua1JldHVyblN0YXRlLnNjcm9sbFksXG4gICAgICAgICAgZm9jdXNGaWxlSWQ6IGxpbmtSZXR1cm5TdGF0ZS5mb2N1c0ZpbGVJZCxcbiAgICAgICAgICBpdGVtczogW10sXG4gICAgICAgICAgc2VsZWN0ZWRUaWNrZXRzOiBsaW5rUmV0dXJuU3RhdGUuc2VsZWN0ZWRUaWNrZXRzLFxuICAgICAgICAgIHRvdGFsOiAwLFxuICAgICAgICAgIGxpbmtNb2RlU2hlZXRJZDogbGlua1JldHVyblN0YXRlLnNoZWV0SWQsXG4gICAgICAgICAgc2VsZWN0aW9uTW9kZTogbGlua1JldHVyblN0YXRlLnNlbGVjdGlvbk1vZGUsXG4gICAgICAgICAgZXhjbHVkZWRJZHM6IGxpbmtSZXR1cm5TdGF0ZS5leGNsdWRlZElkcyxcbiAgICAgICAgICBmaWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnM6IGxpbmtSZXR1cm5TdGF0ZS5maWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnMsXG4gICAgICAgICAgZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbDogbGlua1JldHVyblN0YXRlLmZpbHRlcmVkU2VsZWN0aW9uVG90YWwsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXN0b3JlLWluaXRpYWwtbGluay1tb2RlXCIpO1xuICAgICAgcmVzdG9yZUluaXRpYWxMaW5rTW9kZVN0YXRlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFoYXNSZXR1cm5GbGFnICYmICFpc0hpc3RvcnlCYWNrRm9yd2FyZCAmJiAhaXNSZXR1cm5Gcm9tVGlja2V0RGV0YWlsKSB7XG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6Y2xlYXItY2FjaGUtbm8tcmV0dXJuLWNvbnRleHRcIik7XG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2FjaGVkU3RhdGUgPSByZWFkQ2FjaGVkU3RhdGUoKTtcbiAgICBpZiAoIWNhY2hlZFN0YXRlKSB7XG4gICAgICBsb2dFeHBlbnNlVGlja2V0c1dhcm4oXCJtb3VudFJlc3RvcmVFZmZlY3Q6bm8tY2FjaGVkLXN0YXRlXCIpO1xuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXN0b3JlLXN0YW5kYXJkLWNhY2hlXCIsIHtcbiAgICAgIHBhZ2U6IGNhY2hlZFN0YXRlLnBhZ2UsXG4gICAgICBmb2N1c0ZpbGVJZDogY2FjaGVkU3RhdGUuZm9jdXNGaWxlSWQsXG4gICAgfSk7XG4gICAgcmVzdG9yZVN0YW5kYXJkUmV0dXJuU3RhdGUoY2FjaGVkU3RhdGUpO1xuICB9LCBbXG4gICAgYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuLFxuICAgIGNsZWFyQ2FjaGVkU3RhdGUsXG4gICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIGNvbnN1bWVSZXR1cm5Nb2RlLFxuICAgIGhhc0FjY2VzcyxcbiAgICBpc0xpbmtNb2RlLFxuICAgIGxpbmtTaGVldElkLFxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcbiAgICByZWFkQ2FjaGVkU3RhdGUsXG4gICAgcmVhZEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsXG4gICAgcmVzdG9yZURlbGV0ZVJldHVyblN0YXRlLFxuICAgIHJlc3RvcmVJbml0aWFsTGlua01vZGVTdGF0ZSxcbiAgICByZXN0b3JlTGlua01vZGVSZXR1cm5TdGF0ZSxcbiAgICByZXN0b3JlU3RhbmRhcmRSZXR1cm5TdGF0ZSxcbiAgXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMb2FkaW5nKSByZXR1cm47XG4gICAgaWYgKHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPT0gbnVsbCAmJiAhcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgIGNvbnN0IHBlbmRpbmdTY3JvbGxZID0gcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudDtcbiAgICBjb25zdCBwZW5kaW5nRm9jdXNGaWxlSWQgPSBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudDtcbiAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IFwiXCI7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmIChwZW5kaW5nU2Nyb2xsWSAhPSBudWxsKSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgdG9wOiBNYXRoLm1heCgwLCBwZW5kaW5nU2Nyb2xsWSksXG4gICAgICAgICAgYmVoYXZpb3I6IFwiYXV0b1wiLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFwZW5kaW5nRm9jdXNGaWxlSWQgfHwgIXRpbWVsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgY29uc3Qgbm9ybWFsaXplZEZvY3VzSWQgPSBwZW5kaW5nRm9jdXNGaWxlSWQudG9VcHBlckNhc2UoKTtcbiAgICAgIGNvbnN0IHRpbWVsaW5lSXRlbXMgPSBBcnJheS5mcm9tKFxuICAgICAgICB0aW1lbGluZUNvbnRhaW5lclJlZi5jdXJyZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWl0ZW1bZGF0YS10aWNrZXQtZmlsZS1pZF1cIilcbiAgICAgICk7XG4gICAgICBjb25zdCBtYXRjaGluZ0l0ZW0gPSB0aW1lbGluZUl0ZW1zLmZpbmQoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHNhZmVUZXh0KGl0ZW0uZGF0YXNldC50aWNrZXRGaWxlSWQpLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRGb2N1c0lkO1xuICAgICAgfSk7XG4gICAgICBjb25zdCB0YXJnZXRDYXJkID0gbWF0Y2hpbmdJdGVtPy5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XG4gICAgICBpZiAoIXRhcmdldENhcmQpIHJldHVybjtcblxuICAgICAgdGFyZ2V0Q2FyZC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gICAgfSk7XG4gIH0sIFtpc0xvYWRpbmcsIGl0ZW1zLmxlbmd0aF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkgfHwgIWhhc0FjY2VzcykgcmV0dXJuO1xuXG4gICAgY29uc3QgaGFuZGxlUGFnZVNob3cgPSAoZXZlbnQ6IFBhZ2VUcmFuc2l0aW9uRXZlbnQpID0+IHtcbiAgICAgIGlmICghZXZlbnQucGVyc2lzdGVkICYmICFpc0V4cGVuc2VIaXN0b3J5QmFja0ZvcndhcmROYXZpZ2F0aW9uKCkpIHJldHVybjtcblxuICAgICAgY29uc3Qgc25hcHNob3QgPSByZXNvbHZlQWN0aXZlRmlsdGVycygpO1xuICAgICAgaWYgKCFpc0xpbmtNb2RlICYmICghc25hcHNob3QuZnJvbURhdGUgfHwgIXNuYXBzaG90LnRvRGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBydW5BdXRvbWF0aWNMaXN0TG9hZChjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsIHNuYXBzaG90LCB7XG4gICAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBoYW5kbGVQYWdlU2hvdyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgaGFuZGxlUGFnZVNob3cpO1xuICAgIH07XG4gIH0sIFtjdXJyZW50UGFnZSwgaGFzQWNjZXNzLCBpc0xpbmtNb2RlLCBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksIHJlc29sdmVBY3RpdmVGaWx0ZXJzLCBydW5BdXRvbWF0aWNMaXN0TG9hZF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb25Ub2dnbGVGaWx0ZXJzID0gKCkgPT4ge1xuICAgICAgY29uc3Qgd2lsbE9wZW4gPSAhc2hvd0ZpbHRlcnM7XG4gICAgICB0b2dnbGVGaWx0ZXJQYW5lbCgpO1xuICAgICAgaWYgKHdpbGxPcGVuKSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uUmVmcmVzaCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnMoKTtcbiAgICAgIGlmICghaXNMaW5rTW9kZSAmJiAoIXNuYXBzaG90Py5mcm9tRGF0ZSB8fCAhc25hcHNob3Q/LnRvRGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdm9pZCBsb2FkTGlzdChjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsIHNuYXBzaG90KTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXRpY2tldHMtdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXhwZW5zZS10aWNrZXRzLXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XG4gICAgfTtcbiAgfSwgW2N1cnJlbnRQYWdlLCBpc0xpbmtNb2RlLCBsb2FkTGlzdCwgcmVzb2x2ZUFjdGl2ZUZpbHRlcnMsIHNob3dGaWx0ZXJzLCB0b2dnbGVGaWx0ZXJQYW5lbF0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgIDxDb25maXJtTW9kYWxcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWxDYW5jZWxUZXh0fVxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxuICAgICAgICBidXN5PXtsaW5rRmxvd0J1c3l9XG4gICAgICAgIGVycm9yPXtsaW5rRmxvd0Vycm9yfVxuICAgICAgICBzdGF0dXM9e2xpbmtGbG93U3RhdHVzfVxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cbiAgICAgICAgb25DYW5jZWw9e2Nsb3NlQ29uZmlybX1cbiAgICAgIC8+XG5cbiAgICAgIDxpbnB1dFxuICAgICAgICByZWY9e2NhbWVyYUlucHV0UmVmfVxuICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgIGFjY2VwdD17VElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEV9XG4gICAgICAgIGNhcHR1cmU9XCJlbnZpcm9ubWVudFwiXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQuY3VycmVudFRhcmdldC5maWxlcz8uWzBdIHx8IG51bGw7XG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgdm9pZCBoYW5kbGVTZWxlY3RlZEZpbGUoZmlsZSwgXCJjYW1lcmFcIik7XG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAgPGlucHV0XG4gICAgICAgIHJlZj17Z2FsbGVyeUlucHV0UmVmfVxuICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgIGFjY2VwdD17VElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEV9XG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQuY3VycmVudFRhcmdldC5maWxlcz8uWzBdIHx8IG51bGw7XG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgdm9pZCBoYW5kbGVTZWxlY3RlZEZpbGUoZmlsZSwgXCJnYWxsZXJ5XCIpO1xuICAgICAgICB9fVxuICAgICAgLz5cblxuICAgICAgeyFpc0xpbmtNb2RlICYmIHNvdXJjZVBpY2tlck9wZW4gPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTYwMDAwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1zbGF0ZS05NTAvNDUgcHgtNCBweS02XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctc20gcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgcC00IHNoYWRvdy14bFwiPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtWzE2cHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfVGl0bGVcIiwgXCJOdWV2byB0aWNrZXRcIil9XG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XG4gICAgICAgICAgICAgIHtpbmRUKFxuICAgICAgICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0JvZHlcIixcbiAgICAgICAgICAgICAgICBcIlNlbGVjY2lvbmEgdW5hIGZ1ZW50ZSBwYXJhIGNhcHR1cmFyIG8gZWxlZ2lyIGxhIGltYWdlbiBkZWwgdGlja2V0LlwiXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBncmlkIGdyaWQtY29scy0xIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHZvaWQgc2VsZWN0RnJvbUNhbWVyYShjYW1lcmFJbnB1dFJlZi5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfQ2FtZXJhXCIsIFwiVXNhciBjXHUwMEUxbWFyYVwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNlbGVjdEZyb21HYWxsZXJ5KGdhbGxlcnlJbnB1dFJlZi5jdXJyZW50KX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0dhbGxlcnlcIiwgXCJFbGVnaXIgaW1hZ2VuXCIpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17Y2xvc2VTb3VyY2VQaWNrZXJ9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIHshaXNMaW5rTW9kZSA/IChcbiAgICAgICAgPEV4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheVxuICAgICAgICAgIG9wZW49e3F1aWNrVGlja2V0QnVzeX1cbiAgICAgICAgICB0aXRsZT17aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX1RpdGxlXCIsIFwiUHJvY2Vzc2luZyB0aWNrZXRcIil9XG4gICAgICAgICAgc3VtbWFyeT17cXVpY2tUaWNrZXRQcm9ncmVzc01lc3NhZ2UgfHwgaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cbiAgICAgICAgICBlbGFwc2VkTXM9e3F1aWNrVGlja2V0RWxhcHNlZE1zfVxuICAgICAgICAgIHN0YWdlcz17cXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlc31cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7IWlzTGlua01vZGUgJiYgcXVpY2tUaWNrZXRFcnJvck1lc3NhZ2UgPyAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmVcbiAgICAgICAgICAgICAgPyBcImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIHNwYWNlLXktMiByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBiZy1hbWJlci01MCBwLTMgdGV4dC1zbSB0ZXh0LWFtYmVyLTkwMFwiXG4gICAgICAgICAgICAgIDogXCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTIgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy1yb3NlLTUwIHAtMyB0ZXh0LXNtIHRleHQtcm9zZS04MDBcIlxuICAgICAgICAgIH1cbiAgICAgICAgPlxuICAgICAgICAgIDxwPntxdWlja1RpY2tldEVycm9yTWVzc2FnZX08L3A+XG4gICAgICAgICAge3F1aWNrVGlja2V0QXR0ZW1wdElkID8gKFxuICAgICAgICAgICAgPHBcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZVxuICAgICAgICAgICAgICAgICAgPyBcInJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1hbWJlci0yMDAgYmctd2hpdGUgcHgtMiBweS0xIGZvbnQtbW9ubyB0ZXh0LVsxMXB4XSB0ZXh0LWFtYmVyLTkwMCBicmVhay1hbGxcIlxuICAgICAgICAgICAgICAgICAgOiBcInJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy13aGl0ZSBweC0yIHB5LTEgZm9udC1tb25vIHRleHQtWzExcHhdIHRleHQtcm9zZS04MDAgYnJlYWstYWxsXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7YGF0dGVtcHRJZDogJHtxdWlja1RpY2tldEF0dGVtcHRJZH1gfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIHtxdWlja1RpY2tldFRyYWNlTGlzdC5sZW5ndGggPiAwID8gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlXG4gICAgICAgICAgICAgICAgICA/IFwicm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBiZy13aGl0ZSBwLTIgdGV4dC14cyB0ZXh0LWFtYmVyLTgwMFwiXG4gICAgICAgICAgICAgICAgICA6IFwicm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXdoaXRlIHAtMiB0ZXh0LXhzIHRleHQtcm9zZS03MDBcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtxdWlja1RpY2tldFRyYWNlTGlzdC5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgICAgICAgPHAga2V5PXtgJHtlbnRyeS5zdGVwfS0ke2VudHJ5LmF0fWB9PntgJHtlbnRyeS5zdGVwfTogJHtlbnRyeS50cmFjZUlkfWB9PC9wPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTJcIj5cbiAgICAgICAgICAgIHtoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZSA/IChcbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiIG9uQ2xpY2s9e29wZW5DcmVhdGVkVGlja2V0fT5cbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X09wZW5DcmVhdGVkVGlja2V0XCIsIFwiT3BlbiBjcmVhdGVkIHRpY2tldFwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIHtoYXNQZW5kaW5nVXBsb2FkUmV0cnkgPyAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB2b2lkIHJldHJ5UGVuZGluZ1VwbG9hZCgpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1JldHJ5VXBsb2FkXCIsIFwiUmVpbnRlbnRhciB1cGxvYWRcIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCIgb25DbGljaz17Y2xlYXJRdWlja1RpY2tldEVycm9yfT5cbiAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2xvc2VcIiwgXCJDbG9zZVwiKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7c2hvd1N1bW1hcnkgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLXN1bW1hcnkgcC0zIHNtOnAtNCBtdC0xIG1iLTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4cGVuc2Utc3VtbWFyeS1ncmlkIGdyaWQgZ3JpZC1jb2xzLTEgbWluLVszNjBweF06Z3JpZC1jb2xzLTIgaXRlbXMtc3RhcnQgZ2FwLXgtNCBnYXAteS0xIHRleHQteHNcIj5cbiAgICAgICAgICAgIHtzdW1tYXJ5SXRlbXMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e2l0ZW0ua2V5fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN1bW1hcnkgaGlzdG9yeS1maWx0ZXItc3VtbWFyeS0tZ3JpZC1pdGVtIGxlYWRpbmctNSBtaW4tdy0wXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN1bW1hcnlfX2xhYmVsIGZvbnQtc2VtaWJvbGRcIj57aXRlbS5sYWJlbH06PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN1bW1hcnlfX3ZhbHVlIGJyZWFrLXdvcmRzXCI+e2l0ZW0udmFsdWV9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICA8RXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWxcbiAgICAgICAgbW9kZT17aXNMaW5rTW9kZSA/IFwibGlua1wiIDogXCJnZW5lcmFsXCJ9XG4gICAgICAgIHZpc2libGU9e3Nob3dGaWx0ZXJzfVxuICAgICAgICBzaG93TWFudWFsRGF0ZUZpbHRlcj17c2hvd01hbnVhbERhdGVGaWx0ZXJ9XG4gICAgICAgIG1hbnVhbERhdGVBdXRvT3BlbktleT17bWFudWFsRGF0ZUF1dG9PcGVuS2V5fVxuICAgICAgICBmcm9tRGF0ZT17ZnJvbURhdGV9XG4gICAgICAgIHRvRGF0ZT17dG9EYXRlfVxuICAgICAgICBmaWx0ZXJLZXk9e2ZpbHRlcktleX1cbiAgICAgICAgY3VycmVuY3lDb2RlPXtjdXJyZW5jeUNvZGV9XG4gICAgICAgIG1hbmFnZWRVc2VySWQ9e21hbmFnZWRVc2VySWR9XG4gICAgICAgIG1hbmFnZWRVc2Vycz17bWFuYWdlZFVzZXJzfVxuICAgICAgICBzaG93TWFuYWdlZFVzZXJGaWx0ZXI9e3Nob3dNYW5hZ2VkVXNlckZpbHRlcn1cbiAgICAgICAgc3RhdHVzRmlsdGVyPXtzdGF0dXNGaWx0ZXJ9XG4gICAgICAgIGdhc3RvVHlwZUZpbHRlcj17Z2FzdG9UeXBlRmlsdGVyfVxuICAgICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyPXtwcm9jZXNzZWRCeUlhRmlsdGVyfVxuICAgICAgICBhY3RpdmVRdWlja0ZpbHRlcj17YWN0aXZlUXVpY2tGaWx0ZXJ9XG4gICAgICAgIHNob3dNYW51YWxEYXRlRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3J9XG4gICAgICAgIHN0YXR1c0ZpbHRlclJlYWRPbmx5PXtzdGF0dXNGaWx0ZXJMb2NrZWR9XG4gICAgICAgIGZpeGVkU3RhdHVzRmlsdGVyPXtmaXhlZFN0YXR1c0ZpbHRlcn1cbiAgICAgICAgZ2FzdG9UeXBlT3B0aW9ucz17Z2FzdG9UeXBlT3B0aW9uc31cbiAgICAgICAgb25EYXRlUmFuZ2VDaGFuZ2U9e29uRGF0ZVJhbmdlQ2hhbmdlfVxuICAgICAgICBvbk1hbnVhbFJhbmdlQ29tcGxldGU9e29uTWFudWFsUmFuZ2VDb21wbGV0ZX1cbiAgICAgICAgb25RdWlja0ZpbHRlckNoYW5nZT17b25RdWlja0ZpbHRlckNoYW5nZX1cbiAgICAgICAgb25GaWx0ZXJLZXlDaGFuZ2U9e3NldEZpbHRlcktleX1cbiAgICAgICAgb25DdXJyZW5jeUNvZGVDaGFuZ2U9e3NldEN1cnJlbmN5Q29kZX1cbiAgICAgICAgb25NYW5hZ2VkVXNlcklkQ2hhbmdlPXtzZXRNYW5hZ2VkVXNlcklkfVxuICAgICAgICBvblN0YXR1c0ZpbHRlckNoYW5nZT17c2V0U3RhdHVzRmlsdGVyfVxuICAgICAgICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZT17c2V0R2FzdG9UeXBlRmlsdGVyfVxuICAgICAgICBvblByb2Nlc3NlZEJ5SWFGaWx0ZXJDaGFuZ2U9e3NldFByb2Nlc3NlZEJ5SWFGaWx0ZXJ9XG4gICAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XG4gICAgICAgIG9uQXBwbHk9e29uQXBwbHl9XG4gICAgICAvPlxuXG4gICAgICB7aXNMaW5rTW9kZSA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgcHgtMC41XCI+XG4gICAgICAgICAgeyFjYW5Qcm9jZXNzTGlua01vZGUgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1yb3NlLTcwMFwiPntpbmRUKFwiQXV0aF9QZXJtaXNzaW9uRGVuaWVkX0JvZHlcIiwgXCJObyBwZXJtaXNzaW9uLlwiKX08L2Rpdj5cbiAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgIHtjYW5Qcm9jZXNzTGlua01vZGUgJiYgbGlua1NoZWV0Q2hlY2tCdXN5ID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCI+XG4gICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9IC8+XG4gICAgICAgICAgICAgIDxzcGFuPntpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAge2NhblByb2Nlc3NMaW5rTW9kZSAmJiAhbGlua1NoZWV0Q2hlY2tCdXN5ICYmIHNlbGVjdEFsbEJ1c3kgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIj5cbiAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNCB3LTRcIiBsYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0gLz5cbiAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmICFsaW5rU2hlZXRDaGVja0J1c3kgJiYgbGlua1NoZWV0TG9ja2VkID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtcm9zZS03MDBcIj5cbiAgICAgICAgICAgICAge2xpbmtTaGVldEJsb2NrZWRNZXNzYWdlIHx8XG4gICAgICAgICAgICAgICAgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1JlYWRPbmx5QnlTdGF0dXNcIiwgXCJObyBzZSBwdWVkZSBlZGl0YXIgZXN0YSBob2phIGRlIGdhc3RvcyBlbiBlbCBlc3RhZG8gYWN0dWFsLlwiKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAge2NhblByb2Nlc3NMaW5rTW9kZSAmJiAhbGlua1NoZWV0Q2hlY2tCdXN5ICYmICFsaW5rU2hlZXRMb2NrZWQgJiYgc2VsZWN0QWxsRXJyb3IgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1yb3NlLTcwMFwiPntzZWxlY3RBbGxFcnJvcn08L2Rpdj5cbiAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgIHtjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiAhbGlua1NoZWV0TG9ja2VkID8gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi01IGdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTEuNSBwdC0wLjUgc206bWItNlwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIG1pbi13LTAgcHgtMS41IHB5LTEgdGV4dC1bMTBweF0gbGVhZGluZy10aWdodCBzbTp0ZXh0LXhzXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBzZWxlY3RBbGxNYXRjaGluZ1RpY2tldHMoKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17bGlua01vZGVTZWxlY3Rpb25CdXR0b25zRGlzYWJsZWQgfHwgdG90YWwgPCAxfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfU2VsZWN0QWxsXCIsIFwiU2VsZWNjaW9uYXIgdG9kb1wiKX1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBtaW4tdy0wIHB4LTEuNSBweS0xIHRleHQtWzEwcHhdIGxlYWRpbmctdGlnaHQgc206dGV4dC14c1wiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbGVhclRpY2tldFNlbGVjdGlvbn1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtsaW5rTW9kZVNlbGVjdGlvbkJ1dHRvbnNEaXNhYmxlZCB8fCBzZWxlY3RlZFRpY2tldENvdW50IDwgMX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0NsZWFyQWxsXCIsIFwiQm9ycmFyIHNlbGVjY2lcdTAwRjNuXCIpfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7aXNMaW5rTW9kZSA/IDxFeHBlbnNlVGlja2V0TGlua0J1bGtTdW1tYXJ5IHJlc3VsdD17bGlua0J1bGtSZXN1bHR9IC8+IDogbnVsbH1cblxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBzaG93TGlzdExvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XG4gICAgICA+XG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7ZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntlcnJvck1lc3NhZ2V9PC9kaXY+IDogbnVsbH1cblxuICAgICAgeyFzaG93TGlzdExvYWRpbmcgJiYgIWVycm9yTWVzc2FnZSAmJiBpdGVtcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtYm94IHRpbWVsaW5lLWVtcHR5XCIgZGF0YS1lbXB0eS10ZXh0PXtpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIil9IC8+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgeyFlcnJvck1lc3NhZ2UgJiYgaXRlbXMubGVuZ3RoID4gMCA/IChcbiAgICAgICAgPGRpdiByZWY9e3RpbWVsaW5lQ29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cbiAgICAgICAgICB7aXRlbXMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChpdGVtLmZpbGVJZCk7XG4gICAgICAgICAgICBjb25zdCBkYXRlUGFydHMgPSBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzKGl0ZW0udHJhbnNEYXRlLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIik7XG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IHNhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pIHx8IHNhZmVUZXh0KGl0ZW0uZmlsZU5hbWUpIHx8IGZpbGVJZCB8fCBcIi1cIjtcbiAgICAgICAgICAgIGNvbnN0IGFtb3VudFRleHQgPSBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koaXRlbS50b3RhbEFtb3VudCA/PyBudWxsLCBzYWZlVGV4dChpdGVtLmN1cnJlbmN5Q29kZSkpO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzQ29kZSA9IGl0ZW0ua2luZCA9PT0gXCJnZW5lcmFsXCIgPyBpdGVtLnN0YXR1cyA6IG51bGw7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNMYWJlbCA9IHN0YXR1c0NvZGUgPT09IG51bGwgPyB1bmRlZmluZWQgOiBnZXRFeHBlbnNlVGlja2V0U3RhdHVzTGFiZWwoc3RhdHVzQ29kZSk7XG4gICAgICAgICAgICBjb25zdCBpc0Fzc2lnbmVkVG9FeHBlbnNlU2hlZXQgPSBzdGF0dXNDb2RlID09PSAxO1xuICAgICAgICAgICAgY29uc3Qgc2hvd1Byb2Nlc3NlZEJ5QWlJY29uID0gaXRlbS5wcm9jZXNzZWRCeUFJID09PSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RhYmxlSW5MaW5rTW9kZSA9IGlzTGlua01vZGUgJiYgY2FuU2VsZWN0VGlja2V0Rm9yTGluayhpdGVtKTtcbiAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWRJbkxpbmtNb2RlID0gaXNMaW5rTW9kZSAmJiBpc0xpbmtUaWNrZXRTZWxlY3RlZChmaWxlSWQpO1xuICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkQnlBaUxhYmVsID0gaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIik7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RUaWNrZXRMYWJlbCA9IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9TZWxlY3RUaWNrZXRcIiwgXCJTZWxlY2Npb25hciB0aWNrZXRcIik7XG4gICAgICAgICAgICBjb25zdCBnYXN0b1R5cGVDb2RlID0gaXRlbS5nYXN0b1R5cGUgPT09IG51bGwgPyBcIlwiIDogU3RyaW5nKGl0ZW0uZ2FzdG9UeXBlKTtcbiAgICAgICAgICAgIGNvbnN0IGdhc3RvVHlwZUxhYmVsID0gZ2FzdG9UeXBlQ29kZVxuICAgICAgICAgICAgICA/IGdhc3RvVHlwZUxhYmVsTWFwLmdldChnYXN0b1R5cGVDb2RlKSB8fCBnYXN0b1R5cGVDb2RlXG4gICAgICAgICAgICAgIDogaW5kVChcIkNvbW1vbl9Ob3RBdmFpbGFibGVcIiwgXCJOL0FcIik7XG4gICAgICAgICAgICBjb25zdCBjYXJkU3VidGl0bGUgPSBnYXN0b1R5cGVMYWJlbDtcbiAgICAgICAgICAgIGNvbnN0IHRpY2tldENhcmRLZXkgPVxuICAgICAgICAgICAgICBmaWxlSWQgfHxcbiAgICAgICAgICAgICAgYCR7c2FmZVRleHQoaXRlbS5maWxlTmFtZSl9LSR7c2FmZVRleHQoaXRlbS50cmFuc0RhdGUpfS0ke3NhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pfS0ke1N0cmluZyhpdGVtLnRvdGFsQW1vdW50ID8/IFwiXCIpfWA7XG5cbiAgICAgICAgICAgIGlmIChpc0xpbmtNb2RlICYmIGl0ZW0ua2luZCA9PT0gXCJsaW5rXCIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpY2tldExpbmtUaW1lbGluZUl0ZW1cbiAgICAgICAgICAgICAgICAgIGtleT17dGlja2V0Q2FyZEtleX1cbiAgICAgICAgICAgICAgICAgIGZpbGVJZD17ZmlsZUlkfVxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZT17Y2FyZFN1YnRpdGxlfVxuICAgICAgICAgICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cbiAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ9e2lzU2VsZWN0ZWRJbkxpbmtNb2RlfVxuICAgICAgICAgICAgICAgICAgaXNTZWxlY3RhYmxlPXtpc1NlbGVjdGFibGVJbkxpbmtNb2RlfVxuICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uRGlzYWJsZWQ9e2xpbmtGbG93QnVzeSB8fCBsaW5rU2hlZXRDaGVja0J1c3kgfHwgbGlua1NoZWV0TG9ja2VkfVxuICAgICAgICAgICAgICAgICAgc2VsZWN0TGFiZWw9e3NlbGVjdFRpY2tldExhYmVsfVxuICAgICAgICAgICAgICAgICAgb25PcGVuRGV0YWlsPXsoKSA9PiBvcGVuVGlja2V0RGV0YWlsKGZpbGVJZCl9XG4gICAgICAgICAgICAgICAgICBvblRvZ2dsZVNlbGVjdD17KCkgPT4gdG9nZ2xlVGlja2V0U2VsZWN0aW9uKGl0ZW0pfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGJhc2VTdGF0dXNJY29ucyA9IGlzQXNzaWduZWRUb0V4cGVuc2VTaGVldCB8fCBzaG93UHJvY2Vzc2VkQnlBaUljb24gPyAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAge2lzQXNzaWduZWRUb0V4cGVuc2VTaGVldCA/IChcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImV4cGVuc2UtdGlja2V0LWNhcmRfX3N0YXR1cy1pY29uXCIgcm9sZT1cImltZ1wiIGFyaWEtbGFiZWw9e3N0YXR1c0xhYmVsfT5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezEuNX0gc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPVwiaC00IHctNFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTEzLjE5IDguNjg4YTQuNSA0LjUgMCAwIDEgMS4yNDIgNy4yNDRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMS02LjM2NC02LjM2NGwxLjc1Ny0xLjc1N20xMy4zNS0uNjIyIDEuNzU3LTEuNzU3YTQuNSA0LjUgMCAwIDAtNi4zNjQtNi4zNjRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMCAxLjI0MiA3LjI0NFwiXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAge3Nob3dQcm9jZXNzZWRCeUFpSWNvbiA/IChcbiAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImV4cGVuc2UtdGlja2V0LWNhcmRfX3N0YXR1cy1pY29uIGV4cGVuc2UtdGlja2V0LWNhcmRfX3N0YXR1cy1pY29uLS1haVwiXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJpbWdcIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtwcm9jZXNzZWRCeUFpTGFiZWx9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPXsxLjV9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNCB3LTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk00IDE4bDQtMTJsNCAxMlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNNiAxM2g0XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCA2aDZcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE3IDZ2MTJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDE4aDZcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApIDogbnVsbDtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGtleT17dGlja2V0Q2FyZEtleX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0aW1lbGluZS1pdGVtXCJcbiAgICAgICAgICAgICAgICBkYXRhLXRpY2tldC1maWxlLWlkPXtmaWxlSWQgfHwgdW5kZWZpbmVkfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPEV4cGVuc2VUaW1lbGluZUNhcmRcbiAgICAgICAgICAgICAgICAgIGRhdGVQYXJ0cz17ZGF0ZVBhcnRzfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgICAgICAgICAgc3VidGl0bGU9e2NhcmRTdWJ0aXRsZX1cbiAgICAgICAgICAgICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XG4gICAgICAgICAgICAgICAgICBvbk9wZW49eygpID0+IG9wZW5UaWNrZXREZXRhaWwoZmlsZUlkKX1cbiAgICAgICAgICAgICAgICAgIHRpdGxlQ2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fdGl0bGUgdGltZWxpbmUtbmFtZVwiXG4gICAgICAgICAgICAgICAgICBzdGF0dXNMYWJlbD17c3RhdHVzTGFiZWx9XG4gICAgICAgICAgICAgICAgICBzdGF0dXNJY29uPXtiYXNlU3RhdHVzSWNvbnN9XG4gICAgICAgICAgICAgICAgICBzdGF0dXNJY29uQ2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb25zXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxuICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbFBhZ2VzfVxuICAgICAgICBjdXJyZW50UGFnZT17Y3VycmVudFBhZ2V9XG4gICAgICAgIGxvYWRpbmc9e2lzTG9hZGluZ31cbiAgICAgICAgb25QYWdlQ2hhbmdlPXsocGFnZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNuYXBzaG90ID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnMoKTtcbiAgICAgICAgICBpZiAoIWlzTGlua01vZGUgJiYgKCFzbmFwc2hvdD8uZnJvbURhdGUgfHwgIXNuYXBzaG90Py50b0RhdGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdm9pZCBsb2FkTGlzdChwYWdlLCBzbmFwc2hvdCk7XG4gICAgICAgIH19XG4gICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cbiAgICAgIC8+XG5cbiAgICAgIHtpc0xpbmtNb2RlICYmIGNhblByb2Nlc3NMaW5rTW9kZSAmJiAhbGlua1NoZWV0Q2hlY2tCdXN5ICYmICFsaW5rU2hlZXRMb2NrZWQgPyAoXG4gICAgICAgIDxQYWdlQm90dG9tQWN0aW9ucyBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9MaW5rQnV0dG9uXCIsIFwiVmluY3VsYXIgdGlja2V0KHMpXCIpfT5cbiAgICAgICAgICA8UGFnZUJvdHRvbUFjdGlvbkJ1dHRvblxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9MaW5rQnV0dG9uXCIsIFwiVmluY3VsYXIgdGlja2V0KHMpXCIpfVxuICAgICAgICAgICAgb25DbGljaz17b3BlbkxpbmtDb25maXJtTW9kYWx9XG4gICAgICAgICAgICBkaXNhYmxlZD17bGlua0Zsb3dCdXN5IHx8IHNlbGVjdEFsbEJ1c3kgfHwgc2VsZWN0ZWRUaWNrZXRDb3VudCA8IDF9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9QYWdlQm90dG9tQWN0aW9ucz5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7Y2FuQ3JlYXRlVGlja2V0ICYmICFpc0xpbmtNb2RlID8gKFxuICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b25cbiAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgclx1MDBFMXBpZGFzXCIpfVxuICAgICAgICAgIHNpemU9ezc2fVxuICAgICAgICAgIHJpZ2h0PXsxNn1cbiAgICAgICAgICBib3R0b209ezI0fVxuICAgICAgICAgIG1lbnVBcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgclx1MDBFMXBpZGFzXCIpfVxuICAgICAgICAgIG1lbnVJdGVtcz17ZmFiTWVudUl0ZW1zfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2UgdGlja2V0cyBsaXN0LlxuY29uc3QgRXhwZW5zZVRpY2tldHNQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cbiAgICAgIDxFeHBlbnNlVGlja2V0c1BhZ2VDb250ZW50IC8+XG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgKTtcbn07XG5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2UtdGlja2V0cy1yb290XCIpO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VUaWNrZXRzUGFnZSAvPik7XG59O1xuXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldHNQYWdlO1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQ2hlY2tJY29uIH0gZnJvbSBcIkBoZXJvaWNvbnMvcmVhY3QvMjQvb3V0bGluZVwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlRGF0ZVBhcnRzIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgRXhwZW5zZVRpbWVsaW5lQ2FyZCBmcm9tIFwiLi9FeHBlbnNlVGltZWxpbmVDYXJkLnRzeFwiO1xuXG50eXBlIEV4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtUHJvcHMgPSB7XG4gIGZpbGVJZDogc3RyaW5nO1xuICBkYXRlUGFydHM6IEV4cGVuc2VEYXRlUGFydHM7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHN1YnRpdGxlOiBzdHJpbmc7XG4gIGFtb3VudFRleHQ6IHN0cmluZztcbiAgaXNTZWxlY3RlZDogYm9vbGVhbjtcbiAgaXNTZWxlY3RhYmxlOiBib29sZWFuO1xuICBzZWxlY3Rpb25EaXNhYmxlZDogYm9vbGVhbjtcbiAgc2VsZWN0TGFiZWw6IHN0cmluZztcbiAgb25PcGVuRGV0YWlsOiAoKSA9PiB2b2lkO1xuICBvblRvZ2dsZVNlbGVjdDogKCkgPT4gdm9pZDtcbn07XG5cbi8vIExpbmstbW9kZSB0aWNrZXQgY2FyZDogY2VudGVyIG9wZW5zIHRoZSByZWFkLW9ubHkgZGV0YWlsIGFuZCB0aGUgcmlnaHQgcmFpbCB0b2dnbGVzIHNlbGVjdGlvbi5cbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtID0gKHtcbiAgZmlsZUlkLFxuICBkYXRlUGFydHMsXG4gIHRpdGxlLFxuICBzdWJ0aXRsZSxcbiAgYW1vdW50VGV4dCxcbiAgaXNTZWxlY3RlZCxcbiAgaXNTZWxlY3RhYmxlLFxuICBzZWxlY3Rpb25EaXNhYmxlZCxcbiAgc2VsZWN0TGFiZWwsXG4gIG9uT3BlbkRldGFpbCxcbiAgb25Ub2dnbGVTZWxlY3QsXG59OiBFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbVByb3BzKSA9PiB7XG4gIGNvbnN0IGNhblRvZ2dsZVNlbGVjdGlvbiA9IGlzU2VsZWN0YWJsZSAmJiAhc2VsZWN0aW9uRGlzYWJsZWQ7XG5cbiAgY29uc3QgaGFuZGxlT3BlbkRldGFpbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBvbk9wZW5EZXRhaWwoKTtcbiAgfSwgW29uT3BlbkRldGFpbF0pO1xuXG4gIGNvbnN0IGhhbmRsZVRvZ2dsZVNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWNhblRvZ2dsZVNlbGVjdGlvbikgcmV0dXJuO1xuICAgIG9uVG9nZ2xlU2VsZWN0KCk7XG4gIH0sIFtjYW5Ub2dnbGVTZWxlY3Rpb24sIG9uVG9nZ2xlU2VsZWN0XSk7XG5cbiAgY29uc3Qgc2VsZWN0aW9uSW5kaWNhdG9yVG9uZUNsYXNzTmFtZSA9IGlzU2VsZWN0ZWRcbiAgICA/IFwiYm9yZGVyLXByaW1hcnkgYmctcHJpbWFyeSB0ZXh0LXdoaXRlIHNoYWRvdy1zbVwiXG4gICAgOiBjYW5Ub2dnbGVTZWxlY3Rpb25cbiAgICAgID8gXCJib3JkZXItc2xhdGUtMzAwIGJnLXdoaXRlIHRleHQtdHJhbnNwYXJlbnQgZ3JvdXAtaG92ZXI6Ym9yZGVyLXByaW1hcnkgZ3JvdXAtaG92ZXI6YmctcHJpbWFyeS81XCJcbiAgICAgIDogXCJib3JkZXItc2xhdGUtMjAwIGJnLXNsYXRlLTEwMCB0ZXh0LXRyYW5zcGFyZW50XCI7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2lzU2VsZWN0ZWQgPyBcInRpbWVsaW5lLWl0ZW0gcm91bmRlZC1bNXB4XSByaW5nLTIgcmluZy1wcmltYXJ5LzMwXCIgOiBcInRpbWVsaW5lLWl0ZW1cIn1cbiAgICAgIGRhdGEtdGlja2V0LWZpbGUtaWQ9e2ZpbGVJZCB8fCB1bmRlZmluZWR9XG4gICAgICBkYXRhLXRpY2tldC1zZWxlY3RlZD17aXNTZWxlY3RlZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwifVxuICAgICAgZGF0YS10aWNrZXQtc2VsZWN0YWJsZT17Y2FuVG9nZ2xlU2VsZWN0aW9uID8gXCJ0cnVlXCIgOiBcImZhbHNlXCJ9XG4gICAgPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxuICAgICAgICAgIGRhdGVQYXJ0cz17ZGF0ZVBhcnRzfVxuICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgICBzdWJ0aXRsZT17c3VidGl0bGV9XG4gICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cbiAgICAgICAgICBvbk9wZW49e2hhbmRsZU9wZW5EZXRhaWx9XG4gICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX190aXRsZSB0aW1lbGluZS1uYW1lXCJcbiAgICAgICAgICBpbnRlcmFjdGlvblByb3BzPXt7XG4gICAgICAgICAgICBcImFyaWEtbGFiZWxcIjogdGl0bGUsXG4gICAgICAgICAgICBvbkNvbnRleHRNZW51OiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgYXJpYS1sYWJlbD17c2VsZWN0TGFiZWx9XG4gICAgICAgICAgYXJpYS1wcmVzc2VkPXtpc1NlbGVjdGVkfVxuICAgICAgICAgIHRpdGxlPXtzZWxlY3RMYWJlbH1cbiAgICAgICAgICBkaXNhYmxlZD17IWNhblRvZ2dsZVNlbGVjdGlvbn1cbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVUb2dnbGVTZWxlY3Rpb259XG4gICAgICAgICAgY2xhc3NOYW1lPVwiZ3JvdXAgYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTAgei0xMCBmbGV4IHctWzQuMjVyZW1dIGl0ZW1zLXN0YXJ0IGp1c3RpZnktZW5kIHJvdW5kZWQtci1bNXB4XSBiZy10cmFuc3BhcmVudCBwLTEuNSB0cmFuc2l0aW9uIGZvY3VzLXZpc2libGU6b3V0bGluZS1ub25lIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy1wcmltYXJ5LzM1IGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBzbTp3LVs0Ljc1cmVtXVwiXG4gICAgICAgID5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBoLVszMHB4XSB3LVszMHB4XSBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bNXB4XSBib3JkZXIgdHJhbnNpdGlvbiAke3NlbGVjdGlvbkluZGljYXRvclRvbmVDbGFzc05hbWV9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Q2hlY2tJY29uIGNsYXNzTmFtZT1cImgtWzIwcHhdIHctWzIwcHhdXCIgc3Ryb2tlV2lkdGg9ezIuM30gYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeVByb3BzID0ge1xuICByZXN1bHQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvIHwgbnVsbDtcbn07XG5cbnR5cGUgRXhwZW5zZVRpY2tldExpbmtJc3N1ZUxpc3RQcm9wcyA9IHtcbiAgaXRlbXM6IEFycmF5PHsgdGlja2V0SWQ6IHN0cmluZzsgcmVhc29uOiBzdHJpbmcgfT47XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHRvbmVDbGFzc05hbWU6IHN0cmluZztcbn07XG5cbi8vIFJlbmRlcnMgb25lIHNraXBwZWQgb3IgZmFpbGVkIHRpY2tldCBsaXN0IHdpdGggc3RhYmxlIGtleXMuXG5jb25zdCBFeHBlbnNlVGlja2V0TGlua0lzc3VlTGlzdCA9ICh7IGl0ZW1zLCB0aXRsZSwgdG9uZUNsYXNzTmFtZSB9OiBFeHBlbnNlVGlja2V0TGlua0lzc3VlTGlzdFByb3BzKSA9PiB7XG4gIGlmIChpdGVtcy5sZW5ndGggPCAxKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtgcm91bmRlZC0yeGwgYm9yZGVyIHAtMyAke3RvbmVDbGFzc05hbWV9YH0+XG4gICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGRcIj57dGl0bGV9PC9wPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yIHNwYWNlLXktMlwiPlxuICAgICAgICB7aXRlbXMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAga2V5PXtgJHtpdGVtLnRpY2tldElkIHx8IFwidW5rbm93blwifS0ke2l0ZW0ucmVhc29uIHx8IFwibm8tcmVhc29uXCJ9YH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1jdXJyZW50LzE1IGJnLXdoaXRlLzgwIHAtMiB0ZXh0LXhzXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiVGlja2V0c19GaWx0ZXJfRmlsdGVyS2V5XCIsIFwiVGlja2V0XCIpfTo8L3NwYW4+e1wiIFwifVxuICAgICAgICAgICAgICA8c3Bhbj57aXRlbS50aWNrZXRJZCB8fCBcIi1cIn08L3NwYW4+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdFJlYXNvblwiLCBcIk1vdGl2b1wiKX06PC9zcGFuPntcIiBcIn1cbiAgICAgICAgICAgICAgPHNwYW4+e2l0ZW0ucmVhc29uIHx8IFwiLVwifTwvc3Bhbj5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbi8vIFNob3dzIHRoZSBiYWNrZW5kIGJ1bGstbGluayByZXN1bHQgc3VtbWFyeSwgaW5jbHVkaW5nIHBhcnRpYWwgc2tpcHBlZCBhbmQgZmFpbGVkIHJlYXNvbnMuXG5jb25zdCBFeHBlbnNlVGlja2V0TGlua0J1bGtTdW1tYXJ5ID0gKHsgcmVzdWx0IH06IEV4cGVuc2VUaWNrZXRMaW5rQnVsa1N1bW1hcnlQcm9wcykgPT4ge1xuICBpZiAoIXJlc3VsdCkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3Qgc3VtbWFyeVJvd3MgPSBbXG4gICAge1xuICAgICAga2V5OiBcInJlcXVlc3RlZFwiLFxuICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRSZXF1ZXN0ZWRcIiwgXCJTb2xpY2l0YWRvc1wiKSxcbiAgICAgIHZhbHVlOiByZXN1bHQucmVxdWVzdGVkQ291bnQsXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6IFwibGlua2VkXCIsXG4gICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdExpbmtlZFwiLCBcIlZpbmN1bGFkb3NcIiksXG4gICAgICB2YWx1ZTogcmVzdWx0LmxpbmtlZENvdW50LFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiBcInNraXBwZWRcIixcbiAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0U2tpcHBlZFwiLCBcIk9taXRpZG9zXCIpLFxuICAgICAgdmFsdWU6IHJlc3VsdC5za2lwcGVkQ291bnQsXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6IFwiZmFpbGVkXCIsXG4gICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdEZhaWxlZFwiLCBcIkZhbGxpZG9zXCIpLFxuICAgICAgdmFsdWU6IHJlc3VsdC5mYWlsZWRDb3VudCxcbiAgICB9LFxuICBdO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTMgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUvOTUgcC0zXCI+XG4gICAgICA8ZGl2PlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDBcIj5cbiAgICAgICAgICB7aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdFRpdGxlXCIsIFwiUmVzdWx0YWRvIGRlIHZpbmN1bGFjaVx1MDBGM25cIil9XG4gICAgICAgIDwvcD5cbiAgICAgICAge3Jlc3VsdC5leHBlbnNlU2hlZXRJZCA/IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xIHRleHQteHMgdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU2hlZXRcIiwgXCJFeHBlbnNlIHNoZWV0XCIpfToge3Jlc3VsdC5leHBlbnNlU2hlZXRJZH1cbiAgICAgICAgICA8L3A+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBzbTpncmlkLWNvbHMtNFwiPlxuICAgICAgICB7c3VtbWFyeVJvd3MubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgPGRpdiBrZXk9e2l0ZW0ua2V5fSBjbGFzc05hbWU9XCJyb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy1zbGF0ZS01MCBweC0zIHB5LTIgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLVswLjE0ZW1dIHRleHQtc2xhdGUtNTAwXCI+e2l0ZW0ubGFiZWx9PC9wPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXhsIGZvbnQtc2VtaWJvbGQgdGV4dC1wcmltYXJ5XCI+e2l0ZW0udmFsdWV9PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgZ2FwLTMgbGc6Z3JpZC1jb2xzLTJcIj5cbiAgICAgICAgPEV4cGVuc2VUaWNrZXRMaW5rSXNzdWVMaXN0XG4gICAgICAgICAgdGl0bGU9e2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRTa2lwcGVkXCIsIFwiT21pdGlkb3NcIil9XG4gICAgICAgICAgaXRlbXM9e0FycmF5LmlzQXJyYXkocmVzdWx0LnNraXBwZWQpID8gcmVzdWx0LnNraXBwZWQgOiBbXX1cbiAgICAgICAgICB0b25lQ2xhc3NOYW1lPVwiYm9yZGVyLWFtYmVyLTIwMCBiZy1hbWJlci01MCB0ZXh0LWFtYmVyLTkwMFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxFeHBlbnNlVGlja2V0TGlua0lzc3VlTGlzdFxuICAgICAgICAgIHRpdGxlPXtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0RmFpbGVkXCIsIFwiRmFsbGlkb3NcIil9XG4gICAgICAgICAgaXRlbXM9e0FycmF5LmlzQXJyYXkocmVzdWx0LmZhaWxlZCkgPyByZXN1bHQuZmFpbGVkIDogW119XG4gICAgICAgICAgdG9uZUNsYXNzTmFtZT1cImJvcmRlci1yb3NlLTIwMCBiZy1yb3NlLTUwIHRleHQtcm9zZS05MDBcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0TGlua0J1bGtTdW1tYXJ5O1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcbmltcG9ydCB0eXBlIHsgQXV0aE1hbmFnZWRVc2VyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi4vLi4vdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVN1bW1hcnkudHN4XCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHtcbiAgZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlck9wdGlvbnMsXG4gIG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlLFxuICB0eXBlIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VUaWNrZXRTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsIEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkIH0gZnJvbSBcIi4uL3RpY2tldHMvZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZURhdGVSYW5nZUZpbHRlciBmcm9tIFwiLi9FeHBlbnNlRGF0ZVJhbmdlRmlsdGVyLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VGaWx0ZXJBY3Rpb25zIGZyb20gXCIuL0V4cGVuc2VGaWx0ZXJBY3Rpb25zLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMgZnJvbSBcIi4vRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0IGZyb20gXCIuL0V4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dC50c3hcIjtcblxuY29uc3QgcGFyc2VJc29EYXRlID0gKHJhdzogc3RyaW5nKTogRGF0ZSB8IG51bGwgPT4ge1xuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKHJhdykudHJpbSgpLnNwbGl0KFwiVFwiKVswXTtcbiAgaWYgKCEvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdCh2YWx1ZSkpIHJldHVybiBudWxsO1xuICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSB2YWx1ZS5zcGxpdChcIi1cIikubWFwKE51bWJlcik7XG4gIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG59O1xuXG5jb25zdCBmb3JtYXREYXRlID0gKHJhdzogc3RyaW5nLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGRhdGUgPSBwYXJzZUlzb0RhdGUocmF3KTtcbiAgaWYgKCFkYXRlKSByZXR1cm4gXCItLVwiO1xuICByZXR1cm4gZGF0ZVxuICAgIC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7XG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxuICAgICAgbW9udGg6IFwic2hvcnRcIixcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgIH0pXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xufTtcblxudHlwZSBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbFByb3BzID0ge1xuICBtb2RlOiBcImdlbmVyYWxcIiB8IFwibGlua1wiO1xuICB2aXNpYmxlOiBib29sZWFuO1xuICBzaG93TWFudWFsRGF0ZUZpbHRlcjogYm9vbGVhbjtcbiAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5OiBudW1iZXI7XG4gIGZyb21EYXRlOiBzdHJpbmc7XG4gIHRvRGF0ZTogc3RyaW5nO1xuICBmaWx0ZXJLZXk6IHN0cmluZztcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIG1hbmFnZWRVc2VySWQ6IHN0cmluZztcbiAgbWFuYWdlZFVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXTtcbiAgc2hvd01hbmFnZWRVc2VyRmlsdGVyOiBib29sZWFuO1xuICBzdGF0dXNGaWx0ZXI6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlO1xuICBnYXN0b1R5cGVGaWx0ZXI6IFwiXCIgfCBFeHBlbnNlR2FzdG9UeXBlQ29kZTtcbiAgcHJvY2Vzc2VkQnlJYUZpbHRlcjogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXI7XG4gIGFjdGl2ZVF1aWNrRmlsdGVyOiBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCB8IG51bGw7XG4gIHNob3dNYW51YWxEYXRlRXJyb3I6IGJvb2xlYW47XG4gIHN0YXR1c0ZpbHRlclJlYWRPbmx5PzogYm9vbGVhbjtcbiAgZml4ZWRTdGF0dXNGaWx0ZXI/OiAwIHwgMSB8IG51bGw7XG4gIGdhc3RvVHlwZU9wdGlvbnM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXTtcbiAgb25EYXRlUmFuZ2VDaGFuZ2U6IChmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25NYW51YWxSYW5nZUNvbXBsZXRlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uUXVpY2tGaWx0ZXJDaGFuZ2U6IChmaWx0ZXJJZDogRXhwZW5zZVRpY2tldFF1aWNrRmlsdGVySWQpID0+IHZvaWQ7XG4gIG9uRmlsdGVyS2V5Q2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbk1hbmFnZWRVc2VySWRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvblN0YXR1c0ZpbHRlckNoYW5nZTogKHZhbHVlOiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSkgPT4gdm9pZDtcbiAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogXCJcIiB8IEV4cGVuc2VHYXN0b1R5cGVDb2RlKSA9PiB2b2lkO1xuICBvblByb2Nlc3NlZEJ5SWFGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIpID0+IHZvaWQ7XG4gIG9uQ2xlYXI6ICgpID0+IHZvaWQ7XG4gIG9uQXBwbHk6ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBTaGFyZWQgdGlja2V0cyBmaWx0ZXIgcGFuZWwgd2l0aCBnbG9iYWwgcXVpY2sgZGF0ZSBmaWx0ZXJzIGFuZCBmaXhlZCB0aWNrZXQgZmlsdGVycy5cbmNvbnN0IEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsID0gKHtcbiAgbW9kZSxcbiAgdmlzaWJsZSxcbiAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXG4gIG1hbnVhbERhdGVBdXRvT3BlbktleSxcbiAgZnJvbURhdGUsXG4gIHRvRGF0ZSxcbiAgZmlsdGVyS2V5LFxuICBjdXJyZW5jeUNvZGUsXG4gIG1hbmFnZWRVc2VySWQsXG4gIG1hbmFnZWRVc2VycyxcbiAgc2hvd01hbmFnZWRVc2VyRmlsdGVyLFxuICBzdGF0dXNGaWx0ZXIsXG4gIGdhc3RvVHlwZUZpbHRlcixcbiAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gIHN0YXR1c0ZpbHRlclJlYWRPbmx5ID0gZmFsc2UsXG4gIGZpeGVkU3RhdHVzRmlsdGVyID0gbnVsbCxcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcbiAgb25EYXRlUmFuZ2VDaGFuZ2UsXG4gIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcbiAgb25RdWlja0ZpbHRlckNoYW5nZSxcbiAgb25GaWx0ZXJLZXlDaGFuZ2UsXG4gIG9uQ3VycmVuY3lDb2RlQ2hhbmdlLFxuICBvbk1hbmFnZWRVc2VySWRDaGFuZ2UsXG4gIG9uU3RhdHVzRmlsdGVyQ2hhbmdlLFxuICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZSxcbiAgb25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlLFxuICBvbkNsZWFyLFxuICBvbkFwcGx5LFxufTogRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWxQcm9wcykgPT4ge1xuICBjb25zdCBzdGF0dXNPcHRpb25zID0gdXNlTWVtbygoKSA9PiBnZXRFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyT3B0aW9ucygpLCBbXSk7XG5cbiAgY29uc3QgY2F0ZWdvcnlPcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KCgpID0+IHtcbiAgICByZXR1cm4gW1xuICAgICAgeyB2YWx1ZTogXCJcIiwgdGV4dDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0FsbFwiLCBcIkFsbFwiKSB9LFxuICAgICAgLi4uZ2FzdG9UeXBlT3B0aW9ucyxcbiAgICBdO1xuICB9LCBbZ2FzdG9UeXBlT3B0aW9uc10pO1xuXG4gIGlmICghdmlzaWJsZSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGxvY2FsZSA9IGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiO1xuICBjb25zdCBzaG93SW5saW5lRGF0ZVN1bW1hcnkgPSAhc2hvd01hbnVhbERhdGVGaWx0ZXIgJiYgISFmcm9tRGF0ZSAmJiAhIXRvRGF0ZTtcbiAgY29uc3Qgc2hvd1N0YXR1c0ZpbHRlciA9IG1vZGUgPT09IFwiZ2VuZXJhbFwiO1xuICBjb25zdCBkZXNrdG9wQ29sdW1uc0NsYXNzTmFtZSA9IHNob3dNYW5hZ2VkVXNlckZpbHRlclxuICAgID8gKHNob3dTdGF0dXNGaWx0ZXIgPyBcImxnOmdyaWQtY29scy02XCIgOiBcImxnOmdyaWQtY29scy01XCIpXG4gICAgOiAoc2hvd1N0YXR1c0ZpbHRlciA/IFwibGc6Z3JpZC1jb2xzLTVcIiA6IFwibGc6Z3JpZC1jb2xzLTRcIik7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1leHBhbmRlZCBwLTIgc206cC0yLjUgcmVsYXRpdmVcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3RhY2sgZmxleCBmbGV4LWNvbCBzcGFjZS15LTJcIj5cbiAgICAgICAgPEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJzIGFjdGl2ZVF1aWNrRmlsdGVyPXthY3RpdmVRdWlja0ZpbHRlcn0gb25RdWlja0ZpbHRlckNoYW5nZT17b25RdWlja0ZpbHRlckNoYW5nZX0gLz5cblxuICAgICAgICB7c2hvd01hbnVhbERhdGVGaWx0ZXIgPyAoXG4gICAgICAgICAgPEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXJcbiAgICAgICAgICAgIGZyb21EYXRlPXtmcm9tRGF0ZX1cbiAgICAgICAgICAgIHRvRGF0ZT17dG9EYXRlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRGF0ZVJhbmdlQ2hhbmdlfVxuICAgICAgICAgICAgb25SYW5nZUNvbXBsZXRlPXtvbk1hbnVhbFJhbmdlQ29tcGxldGV9XG4gICAgICAgICAgICBhdXRvT3BlblJlcXVlc3RJZD17bWFudWFsRGF0ZUF1dG9PcGVuS2V5fVxuICAgICAgICAgICAgc2hvd01hbnVhbEVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yfVxuICAgICAgICAgICAgc2hvd1N0YXJ0RXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3IgJiYgIWZyb21EYXRlfVxuICAgICAgICAgICAgc2hvd0VuZEVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yICYmICF0b0RhdGV9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IHNob3dJbmxpbmVEYXRlU3VtbWFyeSA/IChcbiAgICAgICAgICA8SGlzdG9yeVN1bW1hcnlcbiAgICAgICAgICAgIHN1bW1hcnlGcm9tTGFiZWw9e2luZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpfVxuICAgICAgICAgICAgc3VtbWFyeVRvTGFiZWw9e2luZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIil9XG4gICAgICAgICAgICBmcm9tVmFsdWU9e2Zvcm1hdERhdGUoZnJvbURhdGUsIGxvY2FsZSl9XG4gICAgICAgICAgICB0b1ZhbHVlPXtmb3JtYXREYXRlKHRvRGF0ZSwgbG9jYWxlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImdhcC15LTEgdGV4dC1bMTFweF0gcHgtMVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yICR7ZGVza3RvcENvbHVtbnNDbGFzc05hbWV9IGdhcC0yYH0+XG4gICAgICAgICAgPEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9GaWx0ZXJLZXlcIiwgXCJUaWNrZXRcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX0ZpbHRlcktleVwiLCBcIlRpY2tldFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtmaWx0ZXJLZXl9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25GaWx0ZXJLZXlDaGFuZ2V9XG4gICAgICAgICAgICBtb2RlPXttb2RlfVxuICAgICAgICAgICAgY3JlYXRlZERhdGVGcm9tPXtmcm9tRGF0ZX1cbiAgICAgICAgICAgIGNyZWF0ZWREYXRlVG89e3RvRGF0ZX1cbiAgICAgICAgICAgIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zXG4gICAgICAgICAgICBmaXhlZFN0YXR1c0ZpbHRlcj17bW9kZSA9PT0gXCJnZW5lcmFsXCIgPyBmaXhlZFN0YXR1c0ZpbHRlciA6IG51bGx9XG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XG4gICAgICAgICAgICB2YWx1ZT17Y3VycmVuY3lDb2RlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uQ3VycmVuY3lDb2RlQ2hhbmdlfVxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgIHNob3dMb2FkaW5nU3RhdGVUZXh0PXtmYWxzZX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAge3Nob3dNYW5hZ2VkVXNlckZpbHRlciA/IChcbiAgICAgICAgICAgIDxFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3RcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJDb21tb25fVXNlclwiLCBcIlVzZXJcIil9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiQ29tbW9uX1VzZXJcIiwgXCJVc2VyXCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17bWFuYWdlZFVzZXJJZH1cbiAgICAgICAgICAgICAgdXNlcnM9e21hbmFnZWRVc2Vyc31cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uTWFuYWdlZFVzZXJJZENoYW5nZX1cbiAgICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICB7c2hvd1N0YXR1c0ZpbHRlciA/IChcbiAgICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX1N0YXR1c1wiLCBcIlN0YXR1c1wiKX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XG4gICAgICAgICAgICAgIG9wdGlvbnM9e3N0YXR1c09wdGlvbnN9XG4gICAgICAgICAgICAgIHZhbHVlPXtzdGF0dXNGaWx0ZXJ9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiBvblN0YXR1c0ZpbHRlckNoYW5nZShub3JtYWxpemVFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZShuZXh0VmFsdWUsIFwiXCIpKX1cbiAgICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17c3RhdHVzRmlsdGVyUmVhZE9ubHl9XG4gICAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtdGlja2V0LXN0YXR1cy1maWx0ZXJcIlxuICAgICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIil9XG4gICAgICAgICAgICBvcHRpb25zPXtjYXRlZ29yeU9wdGlvbnN9XG4gICAgICAgICAgICB2YWx1ZT17Z2FzdG9UeXBlRmlsdGVyfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKG5leHRWYWx1ZSk7XG4gICAgICAgICAgICAgIGlmIChuZXh0VmFsdWUgPT09IFwiXCIgfHwgIU51bWJlci5pc0ludGVnZXIocGFyc2VkKSkge1xuICAgICAgICAgICAgICAgIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlKFwiXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZShwYXJzZWQgYXMgRXhwZW5zZUdhc3RvVHlwZUNvZGUpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtdGlja2V0LWdhc3RvdHlwZS1maWx0ZXJcIlxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBXCIsIFwiUHJvY2Vzc2VkIGJ5IElBXCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBXCIsIFwiUHJvY2Vzc2VkIGJ5IElBXCIpfVxuICAgICAgICAgICAgdmFsdWU9e3Byb2Nlc3NlZEJ5SWFGaWx0ZXJ9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlfVxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8RXhwZW5zZUZpbHRlckFjdGlvbnNcbiAgICAgICAgICBjbGVhckxhYmVsPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xlYXJcIiwgXCJDbGVhclwiKX1cbiAgICAgICAgICBhcHBseUxhYmVsPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQXBwbHlcIiwgXCJBcHBseVwiKX1cbiAgICAgICAgICBvbkNsZWFyPXtvbkNsZWFyfVxuICAgICAgICAgIG9uQXBwbHk9e29uQXBwbHl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsO1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyIH0gZnJvbSBcIi4uL3RpY2tldHMvZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xuXG50eXBlIEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBFeHBlbnNlVGlja2V0UHJvY2Vzc2VkQnlJYUZpbHRlcjtcbiAgb25DaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIpID0+IHZvaWQ7XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xufTtcblxuLy8gRml4ZWQgZW51bSBzZWxlY3QgZm9yIElBIHByb2Nlc3NpbmcgZmlsdGVyIHdpdGggQWxsL1llcy9ObyBvcHRpb25zLlxuY29uc3QgRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QgPSAoe1xuICBsYWJlbCxcbiAgcGxhY2Vob2xkZXIsXG4gIHZhbHVlLFxuICBvbkNoYW5nZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbn06IEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0UHJvcHMpID0+IHtcbiAgY29uc3QgdWlWYWx1ZSA9IHZhbHVlID09PSBcImFsbFwiID8gXCJcIiA6IHZhbHVlO1xuICBjb25zdCBvcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFxuICAgICgpID0+IFtcbiAgICAgIHsgdmFsdWU6IFwiYWxsXCIsIHRleHQ6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9BbGxcIiwgXCJBbGxcIikgfSxcbiAgICAgIHsgdmFsdWU6IFwieWVzXCIsIHRleHQ6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBX1llc1wiLCBcIlllc1wiKSB9LFxuICAgICAgeyB2YWx1ZTogXCJub1wiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9Ob1wiLCBcIk5vXCIpIH0sXG4gICAgXSxcbiAgICBbXVxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPFNlbGVjdENvbWJvYm94XG4gICAgICBsYWJlbD17bGFiZWx9XG4gICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICBvcHRpb25zPXtvcHRpb25zfVxuICAgICAgdmFsdWU9e3VpVmFsdWV9XG4gICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4ge1xuICAgICAgICBpZiAobmV4dFZhbHVlID09PSBcInllc1wiIHx8IG5leHRWYWx1ZSA9PT0gXCJub1wiIHx8IG5leHRWYWx1ZSA9PT0gXCJhbGxcIikge1xuICAgICAgICAgIG9uQ2hhbmdlKG5leHRWYWx1ZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG9uQ2hhbmdlKFwiYWxsXCIpO1xuICAgICAgfX1cbiAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIGlkQmFzZT1cImV4cGVuc2UtcHJvY2Vzc2VkLWJ5LWlhLWZpbHRlclwiXG4gICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0O1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlbW90ZVNlYXJjaENvbWJvYm94LCB7IHR5cGUgUmVtb3RlU2VhcmNoT3B0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9SZW1vdGVTZWFyY2hDb21ib2JveC50c3hcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHR5cGUge1xuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdEl0ZW1EdG8sXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8sXG4gIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LFxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0LCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcblxudHlwZSBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXRQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBtb2RlPzogXCJnZW5lcmFsXCIgfCBcImxpbmtcIjtcbiAgY3JlYXRlZERhdGVGcm9tPzogc3RyaW5nO1xuICBjcmVhdGVkRGF0ZVRvPzogc3RyaW5nO1xuICBlbmFibGVSZW1vdGVTdWdnZXN0aW9ucz86IGJvb2xlYW47XG4gIGZpeGVkU3RhdHVzRmlsdGVyPzogMCB8IDEgfCBudWxsO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbn07XG5cbmNvbnN0IFNFQVJDSF9QQUdFX1NJWkUgPSAzMDtcblxuLy8gQnVpbGRzIG1pbmltYWwgcGF5bG9hZCBmb3IgdGlja2V0IGtleSBzdWdnZXN0aW9ucyB3aXRob3V0IGRhdGUgZmlsdGVycy5cbmNvbnN0IGJ1aWxkVGlja2V0U3VnZ2VzdFBheWxvYWQgPSAoXG4gIHRlcm06IHN0cmluZyxcbiAgcGFnZTogbnVtYmVyLFxuICBwYWdlU2l6ZTogbnVtYmVyLFxuICBmaXhlZFN0YXR1c0ZpbHRlcjogMCB8IDEgfCBudWxsLFxuICBjcmVhdGVkRGF0ZUZyb206IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgY3JlYXRlZERhdGVUbzogc3RyaW5nIHwgdW5kZWZpbmVkXG4pOiBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCB8IEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCA9PiB7XG4gIGNvbnN0IHNhZmVUZXJtID0gU3RyaW5nKHRlcm0gfHwgXCJcIikudHJpbSgpO1xuICBjb25zdCBiYXNlUGF5bG9hZCA9IHtcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2UpIDogMSxcbiAgICBwYWdlU2l6ZTogTnVtYmVyLmlzRmluaXRlKHBhZ2VTaXplKSAmJiBwYWdlU2l6ZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2VTaXplKSA6IFNFQVJDSF9QQUdFX1NJWkUsXG4gICAgY3JlYXRlZERhdGVGcm9tOiBjcmVhdGVkRGF0ZUZyb20gfHwgdW5kZWZpbmVkLFxuICAgIGNyZWF0ZWREYXRlVG86IGNyZWF0ZWREYXRlVG8gfHwgdW5kZWZpbmVkLFxuICAgIHNlYXJjaEtleTogc2FmZVRlcm0gfHwgdW5kZWZpbmVkLFxuICAgIGZpbHRlcjogc2FmZVRlcm0gfHwgdW5kZWZpbmVkLFxuICB9O1xuXG4gIGlmIChmaXhlZFN0YXR1c0ZpbHRlciA9PT0gMCB8fCBmaXhlZFN0YXR1c0ZpbHRlciA9PT0gMSkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5iYXNlUGF5bG9hZCxcbiAgICAgIHN0YXR1czogZml4ZWRTdGF0dXNGaWx0ZXIsXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBiYXNlUGF5bG9hZDtcbn07XG5cbmNvbnN0IG1hcFRpY2tldE9wdGlvbnMgPSAoXG4gIGl0ZW1zOiBBcnJheTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0byB8IEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0bz4gfCB1bmRlZmluZWRcbik6IFJlbW90ZVNlYXJjaE9wdGlvbltdID0+IHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW10pXG4gICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgZmlsZUlkID0gU3RyaW5nKGl0ZW0/LkZpbGVJZCB8fCBcIlwiKS50cmltKCk7XG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gU3RyaW5nKGl0ZW0/LkRlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGNvbnN0IHN1YnRpdGxlID0gZGVzY3JpcHRpb24gfHwgXCItXCI7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogZmlsZUlkLFxuICAgICAgICB0aXRsZTogZmlsZUlkLFxuICAgICAgICBzdWJ0aXRsZSxcbiAgICAgIH0gYXMgUmVtb3RlU2VhcmNoT3B0aW9uO1xuICAgIH0pXG4gICAgLmZpbHRlcihCb29sZWFuKSBhcyBSZW1vdGVTZWFyY2hPcHRpb25bXTtcbn07XG5cbi8vIFRpY2tldCBrZXkgZmlsdGVyIGlucHV0IHdpdGggcmVtb3RlIGxpc3Qgc3VnZ2VzdGlvbnMuXG5jb25zdCBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQgPSAoe1xuICBsYWJlbCxcbiAgcGxhY2Vob2xkZXIsXG4gIHZhbHVlLFxuICBvbkNoYW5nZSxcbiAgbW9kZSA9IFwiZ2VuZXJhbFwiLFxuICBjcmVhdGVkRGF0ZUZyb20gPSBcIlwiLFxuICBjcmVhdGVkRGF0ZVRvID0gXCJcIixcbiAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnMgPSB0cnVlLFxuICBmaXhlZFN0YXR1c0ZpbHRlciA9IG51bGwsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG59OiBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXRQcm9wcykgPT4ge1xuICBjb25zdCByZWFkT25seU1vZGUgPSByZWFkT25seSB8fCBkaXNhYmxlZDtcblxuICBjb25zdCBsb2FkT3B0aW9ucyA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHNpZ25hbDogQWJvcnRTaWduYWwpOiBQcm9taXNlPFJlbW90ZVNlYXJjaE9wdGlvbltdPiA9PiB7XG4gICAgY29uc3QgcGF5bG9hZCA9IGJ1aWxkVGlja2V0U3VnZ2VzdFBheWxvYWQodGVybSwgMSwgU0VBUkNIX1BBR0VfU0laRSwgZml4ZWRTdGF0dXNGaWx0ZXIsIGNyZWF0ZWREYXRlRnJvbSwgY3JlYXRlZERhdGVUbyk7XG4gICAgY29uc3QgcmVzcG9uc2UgPVxuICAgICAgbW9kZSA9PT0gXCJsaW5rXCJcbiAgICAgICAgPyBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0KHBheWxvYWQgYXMgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RSZXF1ZXN0LCB7XG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHNpZ25hbCxcbiAgICAgICAgICB9KVxuICAgICAgICA6IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QocGF5bG9hZCBhcyBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCwge1xuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgICBzaWduYWwsXG4gICAgICAgICAgfSk7XG5cbiAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcFRpY2tldE9wdGlvbnMocmVzcG9uc2U/Lkl0ZW1zKTtcbiAgfSwgW2NyZWF0ZWREYXRlRnJvbSwgY3JlYXRlZERhdGVUbywgZml4ZWRTdGF0dXNGaWx0ZXIsIG1vZGVdKTtcblxuICBjb25zdCBsb2FkT3B0aW9uc1BhZ2UgPSB1c2VDYWxsYmFjayhhc3luYyAodGVybTogc3RyaW5nLCBwYWdlOiBudW1iZXIsIF9wYWdlU2l6ZTogbnVtYmVyLCBzaWduYWw6IEFib3J0U2lnbmFsKSA9PiB7XG4gICAgY29uc3QgcGF5bG9hZCA9IGJ1aWxkVGlja2V0U3VnZ2VzdFBheWxvYWQoXG4gICAgICB0ZXJtLFxuICAgICAgcGFnZSxcbiAgICAgIFNFQVJDSF9QQUdFX1NJWkUsXG4gICAgICBmaXhlZFN0YXR1c0ZpbHRlcixcbiAgICAgIGNyZWF0ZWREYXRlRnJvbSxcbiAgICAgIGNyZWF0ZWREYXRlVG9cbiAgICApO1xuICAgIGNvbnN0IHJlc3BvbnNlID1cbiAgICAgIG1vZGUgPT09IFwibGlua1wiXG4gICAgICAgID8gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdChwYXlsb2FkIGFzIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCwge1xuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgICBzaWduYWwsXG4gICAgICAgICAgfSlcbiAgICAgICAgOiBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0KHBheWxvYWQgYXMgRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsIHtcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgc2lnbmFsLFxuICAgICAgICAgIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICB0b3RhbDogMCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zOiBtYXBUaWNrZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyksXG4gICAgICB0b3RhbDogTnVtYmVyKHJlc3BvbnNlPy5Ub3RhbCB8fCAwKSxcbiAgICB9O1xuICB9LCBbY3JlYXRlZERhdGVGcm9tLCBjcmVhdGVkRGF0ZVRvLCBmaXhlZFN0YXR1c0ZpbHRlciwgbW9kZV0pO1xuXG4gIGlmICghZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnMgfHwgcmVhZE9ubHlNb2RlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgIHtzaG93TGFiZWwgPyAoXG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiIHN0eWxlPXt7IGNvbG9yOiBcIiMwMDI5NmJlMFwiIH19PlxuICAgICAgICAgICAge2xhYmVsfVxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBweC0zIHB5LTIgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGVhZGluZy01IHRleHQtc2xhdGUtOTAwIGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIlxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbH1cbiAgICAgICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPFJlbW90ZVNlYXJjaENvbWJvYm94XG4gICAgICBsYWJlbD17bGFiZWx9XG4gICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICBvblNlYXJjaD17YXN5bmMgKHRlcm0sIHNpZ25hbCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBhd2FpdCBsb2FkT3B0aW9ucyh0ZXJtLCBzaWduYWwpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH19XG4gICAgICBvblNlYXJjaFBhZ2U9e2FzeW5jICh0ZXJtLCBwYWdlLCBwYWdlU2l6ZSwgc2lnbmFsKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGxvYWRPcHRpb25zUGFnZSh0ZXJtLCBwYWdlLCBwYWdlU2l6ZSwgc2lnbmFsKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBpdGVtczogW10sIHRvdGFsOiAwIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9fVxuICAgICAgaWRCYXNlPVwiZXhwZW5zZS10aWNrZXQtZmlsdGVyLWtleVwiXG4gICAgICBtaW5TZWFyY2hMZW5ndGg9ezB9XG4gICAgICBwYWdlU2l6ZT17U0VBUkNIX1BBR0VfU0laRX1cbiAgICAgIGFsbG93RW1wdHlTZWFyY2hcbiAgICAgIGxvYWRPbk9wZW5cbiAgICAgIGluZmluaXRlU2Nyb2xsXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7XG4gIEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXG4gIEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkLFxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZEYXksIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90LnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGVBcmdzID0ge1xuICBvbkFwcGx5RmlsdGVyczogKHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB2b2lkO1xuICBvbkNsZWFyRmlsdGVyczogKCkgPT4gdm9pZDtcbiAgZGVmYXVsdE1hbmFnZWRVc2VySWQ6IHN0cmluZztcbiAgZml4ZWRTdGF0dXNGaWx0ZXI/OiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSB8IG51bGw7XG4gIGFsbG93RW1wdHlEYXRlc09uQXBwbHk/OiBib29sZWFuO1xufTtcblxuLy8gT3ducyBmaWx0ZXIgVUkgc3RhdGUgYW5kIGFwcGx5L2NsZWFyIHJ1bGVzIGZvciBleHBlbnNlIHRpY2tldHMgbGlzdCBwYWdlLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlID0gKHtcbiAgb25BcHBseUZpbHRlcnMsXG4gIG9uQ2xlYXJGaWx0ZXJzLFxuICBkZWZhdWx0TWFuYWdlZFVzZXJJZCxcbiAgZml4ZWRTdGF0dXNGaWx0ZXIgPSBudWxsLFxuICBhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5ID0gZmFsc2UsXG59OiBVc2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZUFyZ3MpID0+IHtcbiAgY29uc3QgaGFzRml4ZWRTdGF0dXNGaWx0ZXIgPSBmaXhlZFN0YXR1c0ZpbHRlciA9PT0gMCB8fCBmaXhlZFN0YXR1c0ZpbHRlciA9PT0gMTtcblxuICBjb25zdCByZXNvbHZlU3RhdHVzRmlsdGVyID0gdXNlQ2FsbGJhY2soXG4gICAgKHZhbHVlOiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSk6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlID0+IHtcbiAgICAgIGlmIChoYXNGaXhlZFN0YXR1c0ZpbHRlcikge1xuICAgICAgICByZXR1cm4gZml4ZWRTdGF0dXNGaWx0ZXIgYXMgRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBbZml4ZWRTdGF0dXNGaWx0ZXIsIGhhc0ZpeGVkU3RhdHVzRmlsdGVyXVxuICApO1xuXG4gIGNvbnN0IFtmcm9tRGF0ZSwgc2V0RnJvbURhdGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFt0b0RhdGUsIHNldFRvRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2ZpbHRlcktleSwgc2V0RmlsdGVyS2V5XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbY3VycmVuY3lDb2RlLCBzZXRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFttYW5hZ2VkVXNlcklkLCBzZXRNYW5hZ2VkVXNlcklkXSA9IHVzZVN0YXRlKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcbiAgY29uc3QgW3N0YXR1c0ZpbHRlclJhdywgc2V0U3RhdHVzRmlsdGVyUmF3XSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlPihyZXNvbHZlU3RhdHVzRmlsdGVyKFwiXCIpKTtcbiAgY29uc3QgW2dhc3RvVHlwZUZpbHRlciwgc2V0R2FzdG9UeXBlRmlsdGVyXSA9IHVzZVN0YXRlPFwiXCIgfCBFeHBlbnNlR2FzdG9UeXBlQ29kZT4oXCJcIik7XG4gIGNvbnN0IFtwcm9jZXNzZWRCeUlhRmlsdGVyLCBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyXSA9IHVzZVN0YXRlPFwiYWxsXCIgfCBcInllc1wiIHwgXCJub1wiPihcImFsbFwiKTtcbiAgY29uc3QgW2FjdGl2ZVF1aWNrRmlsdGVyLCBzZXRBY3RpdmVRdWlja0ZpbHRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd01hbnVhbERhdGVGaWx0ZXIsIHNldFNob3dNYW51YWxEYXRlRmlsdGVyXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dNYW51YWxEYXRlRXJyb3IsIHNldFNob3dNYW51YWxEYXRlRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWFudWFsRGF0ZUF1dG9PcGVuS2V5LCBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXldID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFthcHBsaWVkRmlsdGVycywgc2V0QXBwbGllZEZpbHRlcnNdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd0ZpbHRlcnMsIHNldFNob3dGaWx0ZXJzXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFoYXNGaXhlZFN0YXR1c0ZpbHRlcikgcmV0dXJuO1xuICAgIHNldFN0YXR1c0ZpbHRlclJhdyhmaXhlZFN0YXR1c0ZpbHRlciBhcyBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSk7XG4gIH0sIFtmaXhlZFN0YXR1c0ZpbHRlciwgaGFzRml4ZWRTdGF0dXNGaWx0ZXJdKTtcblxuICBjb25zdCBzdGF0dXNGaWx0ZXIgPSByZXNvbHZlU3RhdHVzRmlsdGVyKHN0YXR1c0ZpbHRlclJhdyk7XG5cbiAgY29uc3QgY3VycmVudEZpbHRlcnMgPSB1c2VNZW1vPEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3Q+KFxuICAgICgpID0+ICh7XG4gICAgICBmcm9tRGF0ZSxcbiAgICAgIHRvRGF0ZSxcbiAgICAgIGZpbHRlcktleTogZmlsdGVyS2V5LnRyaW0oKSxcbiAgICAgIGN1cnJlbmN5Q29kZTogY3VycmVuY3lDb2RlLnRyaW0oKSxcbiAgICAgIG1hbmFnZWRVc2VySWQ6IG1hbmFnZWRVc2VySWQudHJpbSgpLFxuICAgICAgc3RhdHVzRmlsdGVyLFxuICAgICAgZ2FzdG9UeXBlRmlsdGVyLFxuICAgICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgICB9KSxcbiAgICBbY3VycmVuY3lDb2RlLCBmaWx0ZXJLZXksIGZyb21EYXRlLCBnYXN0b1R5cGVGaWx0ZXIsIG1hbmFnZWRVc2VySWQsIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsIHN0YXR1c0ZpbHRlciwgdG9EYXRlXVxuICApO1xuXG4gIGNvbnN0IHNldFN0YXR1c0ZpbHRlciA9IHVzZUNhbGxiYWNrKFxuICAgICh2YWx1ZTogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpID0+IHtcbiAgICAgIGlmIChoYXNGaXhlZFN0YXR1c0ZpbHRlcikge1xuICAgICAgICBzZXRTdGF0dXNGaWx0ZXJSYXcoZml4ZWRTdGF0dXNGaWx0ZXIgYXMgRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRTdGF0dXNGaWx0ZXJSYXcodmFsdWUpO1xuICAgIH0sXG4gICAgW2ZpeGVkU3RhdHVzRmlsdGVyLCBoYXNGaXhlZFN0YXR1c0ZpbHRlcl1cbiAgKTtcblxuICBjb25zdCBvbkFwcGx5ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghYWxsb3dFbXB0eURhdGVzT25BcHBseSAmJiAoIWZyb21EYXRlIHx8ICF0b0RhdGUpKSB7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKHRydWUpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIodHJ1ZSk7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9IHtcbiAgICAgIGZyb21EYXRlLFxuICAgICAgdG9EYXRlLFxuICAgICAgZmlsdGVyS2V5OiBmaWx0ZXJLZXkudHJpbSgpLFxuICAgICAgY3VycmVuY3lDb2RlOiBjdXJyZW5jeUNvZGUudHJpbSgpLFxuICAgICAgbWFuYWdlZFVzZXJJZDogbWFuYWdlZFVzZXJJZC50cmltKCksXG4gICAgICBzdGF0dXNGaWx0ZXIsXG4gICAgICBnYXN0b1R5cGVGaWx0ZXIsXG4gICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxuICAgIH07XG5cbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICBzZXRBcHBsaWVkRmlsdGVycyhzbmFwc2hvdCk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcbiAgICBvbkFwcGx5RmlsdGVycyhzbmFwc2hvdCk7XG4gIH0sIFtcbiAgICBhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5LFxuICAgIGN1cnJlbmN5Q29kZSxcbiAgICBmaWx0ZXJLZXksXG4gICAgZnJvbURhdGUsXG4gICAgZ2FzdG9UeXBlRmlsdGVyLFxuICAgIG1hbmFnZWRVc2VySWQsXG4gICAgb25BcHBseUZpbHRlcnMsXG4gICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgICBzdGF0dXNGaWx0ZXIsXG4gICAgdG9EYXRlLFxuICBdKTtcblxuICAvLyBSZWh5ZHJhdGVzIHRpY2tldCBmaWx0ZXJzIGZyb20gYSBjYWNoZWQgc25hcHNob3Qgd2hlbiByZXR1cm5pbmcgZnJvbSBkZXRhaWwuXG4gIGNvbnN0IHJlc3RvcmVBcHBsaWVkRmlsdGVycyA9IHVzZUNhbGxiYWNrKFxuICAgIChzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4ge1xuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdChzbmFwc2hvdCk7XG4gICAgICBjb25zdCBub3JtYWxpemVkU3RhdHVzRmlsdGVyID0gcmVzb2x2ZVN0YXR1c0ZpbHRlcihub3JtYWxpemVkLnN0YXR1c0ZpbHRlcik7XG4gICAgICBjb25zdCByZXN0b3JlZE1hbmFnZWRVc2VySWQgPSBTdHJpbmcobm9ybWFsaXplZC5tYW5hZ2VkVXNlcklkIHx8IGRlZmF1bHRNYW5hZ2VkVXNlcklkKS50cmltKCk7XG4gICAgICBzZXRGcm9tRGF0ZShub3JtYWxpemVkLmZyb21EYXRlKTtcbiAgICAgIHNldFRvRGF0ZShub3JtYWxpemVkLnRvRGF0ZSk7XG4gICAgICBzZXRGaWx0ZXJLZXkobm9ybWFsaXplZC5maWx0ZXJLZXkpO1xuICAgICAgc2V0Q3VycmVuY3lDb2RlKG5vcm1hbGl6ZWQuY3VycmVuY3lDb2RlKTtcbiAgICAgIHNldE1hbmFnZWRVc2VySWQocmVzdG9yZWRNYW5hZ2VkVXNlcklkKTtcbiAgICAgIHNldFN0YXR1c0ZpbHRlclJhdyhub3JtYWxpemVkU3RhdHVzRmlsdGVyKTtcbiAgICAgIHNldEdhc3RvVHlwZUZpbHRlcihub3JtYWxpemVkLmdhc3RvVHlwZUZpbHRlcik7XG4gICAgICBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyKG5vcm1hbGl6ZWQucHJvY2Vzc2VkQnlJYUZpbHRlcik7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgICAgc2V0QXBwbGllZEZpbHRlcnMoe1xuICAgICAgICAuLi5ub3JtYWxpemVkLFxuICAgICAgICBtYW5hZ2VkVXNlcklkOiByZXN0b3JlZE1hbmFnZWRVc2VySWQsXG4gICAgICAgIHN0YXR1c0ZpbHRlcjogbm9ybWFsaXplZFN0YXR1c0ZpbHRlcixcbiAgICAgIH0pO1xuICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICAgIH0sXG4gICAgW2RlZmF1bHRNYW5hZ2VkVXNlcklkLCByZXNvbHZlU3RhdHVzRmlsdGVyXVxuICApO1xuXG4gIGNvbnN0IG9uQ2xlYXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0RnJvbURhdGUoXCJcIik7XG4gICAgc2V0VG9EYXRlKFwiXCIpO1xuICAgIHNldEZpbHRlcktleShcIlwiKTtcbiAgICBzZXRDdXJyZW5jeUNvZGUoXCJcIik7XG4gICAgc2V0TWFuYWdlZFVzZXJJZChkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XG4gICAgc2V0U3RhdHVzRmlsdGVyUmF3KHJlc29sdmVTdGF0dXNGaWx0ZXIoXCJcIikpO1xuICAgIHNldEdhc3RvVHlwZUZpbHRlcihcIlwiKTtcbiAgICBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyKFwiYWxsXCIpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXkoMCk7XG4gICAgc2V0QXBwbGllZEZpbHRlcnMobnVsbCk7XG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gICAgb25DbGVhckZpbHRlcnMoKTtcbiAgfSwgW2RlZmF1bHRNYW5hZ2VkVXNlcklkLCBvbkNsZWFyRmlsdGVycywgcmVzb2x2ZVN0YXR1c0ZpbHRlcl0pO1xuXG4gIGNvbnN0IG9uRGF0ZVJhbmdlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXG4gICAgKG5leHRGcm9tRGF0ZTogc3RyaW5nLCBuZXh0VG9EYXRlOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGhhc0Z1bGxSYW5nZSA9ICEhbmV4dEZyb21EYXRlICYmICEhbmV4dFRvRGF0ZTtcbiAgICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XG4gICAgICBzZXRUb0RhdGUobmV4dFRvRGF0ZSk7XG4gICAgICBpZiAoIWhhc0Z1bGxSYW5nZSkge1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcbiAgICAgIH1cbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgaWYgKHNob3dNYW51YWxEYXRlRXJyb3IpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcighaGFzRnVsbFJhbmdlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtzaG93TWFudWFsRGF0ZUVycm9yXVxuICApO1xuXG4gIGNvbnN0IG9uTWFudWFsUmFuZ2VDb21wbGV0ZSA9IHVzZUNhbGxiYWNrKChuZXh0RnJvbURhdGU6IHN0cmluZywgbmV4dFRvRGF0ZTogc3RyaW5nKSA9PiB7XG4gICAgc2V0RnJvbURhdGUobmV4dEZyb21EYXRlKTtcbiAgICBzZXRUb0RhdGUobmV4dFRvRGF0ZSk7XG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgb25RdWlja0ZpbHRlckNoYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgIChmaWx0ZXJJZDogRXhwZW5zZVRpY2tldFF1aWNrRmlsdGVySWQpID0+IHtcbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJjdXN0b21cIikge1xuICAgICAgICBpZiAoc2hvd01hbnVhbERhdGVGaWx0ZXIpIHtcbiAgICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKHRydWUpO1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICAgICAgc2V0TWFudWFsRGF0ZUF1dG9PcGVuS2V5KChwcmV2aW91cykgPT4gcHJldmlvdXMgKyAxKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihmaWx0ZXJJZCk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcblxuICAgICAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xuICAgICAgY29uc3QgbmV4dEZyb20gPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy03XCIpIHtcbiAgICAgICAgbmV4dEZyb20uc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA2KTtcbiAgICAgIH0gZWxzZSBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy0zMFwiKSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMjkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dEZyb20uc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA4OSk7XG4gICAgICB9XG5cbiAgICAgIHNldEZyb21EYXRlKHRvSXNvRGF0ZShuZXh0RnJvbSkpO1xuICAgICAgc2V0VG9EYXRlKHRvSXNvRGF0ZSh0b2RheSkpO1xuICAgIH0sXG4gICAgW3Nob3dNYW51YWxEYXRlRmlsdGVyXVxuICApO1xuXG4gIGNvbnN0IHRvZ2dsZUZpbHRlclBhbmVsID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFNob3dGaWx0ZXJzKChwcmV2aW91cykgPT4ge1xuICAgICAgY29uc3QgbmV4dCA9ICFwcmV2aW91cztcbiAgICAgIGlmICghbmV4dCkge1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgZnJvbURhdGUsXG4gICAgdG9EYXRlLFxuICAgIGZpbHRlcktleSxcbiAgICBjdXJyZW5jeUNvZGUsXG4gICAgbWFuYWdlZFVzZXJJZCxcbiAgICBzdGF0dXNGaWx0ZXIsXG4gICAgZ2FzdG9UeXBlRmlsdGVyLFxuICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXG4gICAgc2hvd01hbnVhbERhdGVFcnJvcixcbiAgICBtYW51YWxEYXRlQXV0b09wZW5LZXksXG4gICAgYXBwbGllZEZpbHRlcnMsXG4gICAgc2hvd0ZpbHRlcnMsXG4gICAgY3VycmVudEZpbHRlcnMsXG4gICAgc2V0RmlsdGVyS2V5LFxuICAgIHNldEN1cnJlbmN5Q29kZSxcbiAgICBzZXRNYW5hZ2VkVXNlcklkLFxuICAgIHNldFN0YXR1c0ZpbHRlcixcbiAgICBzZXRHYXN0b1R5cGVGaWx0ZXIsXG4gICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgICBvbkFwcGx5LFxuICAgIG9uQ2xlYXIsXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlLFxuICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcbiAgICBvblF1aWNrRmlsdGVyQ2hhbmdlLFxuICAgIHRvZ2dsZUZpbHRlclBhbmVsLFxuICAgIHN0YXR1c0ZpbHRlckxvY2tlZDogaGFzRml4ZWRTdGF0dXNGaWx0ZXIsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdCwgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBpc0V4cGVuc2VBYm9ydExpa2VFcnJvciwgcnVuRXhwZW5zZVJlYWRSZXF1ZXN0V2l0aFJldHJ5IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VSZXF1ZXN0UmV0cnkudHNcIjtcbmltcG9ydCB7XG4gIGJ1aWxkRXhwZW5zZVRpY2tldExpbmtMaXN0UGF5bG9hZCxcbiAgYnVpbGRFeHBlbnNlVGlja2V0TGlzdFBheWxvYWQsXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlUGF5bG9hZEJ1aWxkZXJzLnRzXCI7XG5pbXBvcnQgdHlwZSB7XG4gIEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXG4gIEV4cGVuc2VUaWNrZXRDYXJkLFxuICBFeHBlbnNlVGlja2V0TGlua0NhcmQsXG4gIEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW0sXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcblxudHlwZSBVc2VFeHBlbnNlVGlja2V0c0xpc3REYXRhQXJncyA9IHtcbiAgaGFzQWNjZXNzOiBib29sZWFuO1xuICBwYWdlU2l6ZTogbnVtYmVyO1xuICBtb2RlOiBcImdlbmVyYWxcIiB8IFwibGlua1wiO1xuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcbn07XG5cbmNvbnN0IEFMTE9XRURfR0FTVE9fVFlQRV9DT0RFUyA9IG5ldyBTZXQ8bnVtYmVyPihbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTRdKTtcbmNvbnN0IEVYUEVOU0VfVElDS0VUU19MSVNUX0xPR19QUkVGSVggPSBcIltleHBlbnNlLXRpY2tldHM6bGlzdF1cIjtcblxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLmluZm8gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGNvbnNvbGUuaW5mbyhFWFBFTlNFX1RJQ0tFVFNfTElTVF9MT0dfUFJFRklYLCAuLi5hcmdzKTtcbiAgfVxufTtcblxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybiA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLndhcm4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGNvbnNvbGUud2FybihFWFBFTlNFX1RJQ0tFVFNfTElTVF9MT0dfUFJFRklYLCAuLi5hcmdzKTtcbiAgfVxufTtcblxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNMaXN0RXJyb3IgPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY29uc29sZS5lcnJvcihFWFBFTlNFX1RJQ0tFVFNfTElTVF9MT0dfUFJFRklYLCAuLi5hcmdzKTtcbiAgfVxufTtcblxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0c0RlYnVnU3RhY2sgPSAobGFiZWw6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICh0eXBlb2YgRXJyb3IgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFwiXCI7XG4gIGNvbnN0IHJhd1N0YWNrID0gbmV3IEVycm9yKGxhYmVsKS5zdGFjaztcbiAgaWYgKHR5cGVvZiByYXdTdGFjayAhPT0gXCJzdHJpbmdcIiB8fCAhcmF3U3RhY2sudHJpbSgpKSByZXR1cm4gXCJcIjtcbiAgcmV0dXJuIHJhd1N0YWNrXG4gICAgLnNwbGl0KFwiXFxuXCIpXG4gICAgLnNsaWNlKDAsIDYpXG4gICAgLmpvaW4oXCJcXG5cIik7XG59O1xuXG5jb25zdCB0b051bGxhYmxlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XG59O1xuXG5jb25zdCB0b051bGxhYmxlQm9vbCA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gfCBudWxsID0+IHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHJldHVybiB2YWx1ZTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHZhbHVlID09PSAxID8gdHJ1ZSA6IHZhbHVlID09PSAwID8gZmFsc2UgOiBudWxsO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IHZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChub3JtYWxpemVkID09PSBcInRydWVcIiB8fCBub3JtYWxpemVkID09PSBcIjFcIikgcmV0dXJuIHRydWU7XG4gICAgaWYgKG5vcm1hbGl6ZWQgPT09IFwiZmFsc2VcIiB8fCBub3JtYWxpemVkID09PSBcIjBcIikgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3QgdG9OdWxsYWJsZVRpY2tldFN0YXR1cyA9ICh2YWx1ZTogdW5rbm93bik6IDAgfCAxIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBwYXJzZWQgPT09IDAgfHwgcGFyc2VkID09PSAxID8gcGFyc2VkIDogbnVsbDtcbn07XG5cbmNvbnN0IHRvTnVsbGFibGVUaWNrZXRHYXN0b1R5cGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlR2FzdG9UeXBlQ29kZSB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICBpZiAoIU51bWJlci5pc0ludGVnZXIocGFyc2VkKSB8fCAhQUxMT1dFRF9HQVNUT19UWVBFX0NPREVTLmhhcyhwYXJzZWQpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gcGFyc2VkIGFzIEV4cGVuc2VHYXN0b1R5cGVDb2RlO1xufTtcblxuY29uc3QgbWFwVGlja2V0SXRlbVRvQ2FyZCA9IChpdGVtOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IEV4cGVuc2VUaWNrZXRDYXJkID0+IHtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiBcImdlbmVyYWxcIixcbiAgICBmaWxlSWQ6IFN0cmluZyhpdGVtPy5GaWxlSWQgfHwgXCJcIikudHJpbSgpLFxuICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoaXRlbT8uRGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpLFxuICAgIHN0YXR1czogdG9OdWxsYWJsZVRpY2tldFN0YXR1cyhpdGVtPy5TdGF0dXMpLFxuICAgIHByb2Nlc3NlZEJ5QUk6IHRvTnVsbGFibGVCb29sKGl0ZW0/LlByb2Nlc3NlZEJ5QUkpLFxuICAgIGN1cnJlbmN5Q29kZTogU3RyaW5nKGl0ZW0/LkN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCksXG4gICAgdG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbT8uVG90YWxBbW91bnQpLFxuICAgIHRyYW5zRGF0ZTogU3RyaW5nKGl0ZW0/LlRyYW5zRGF0ZSB8fCBcIlwiKS50cmltKCksXG4gICAgZmlsZU5hbWU6IFN0cmluZyhpdGVtPy5GaWxlTmFtZSB8fCBcIlwiKS50cmltKCksXG4gICAgZ2FzdG9UeXBlOiB0b051bGxhYmxlVGlja2V0R2FzdG9UeXBlKGl0ZW0/Lkdhc3RvVHlwZSA/PyBpdGVtPy5nYXN0b1R5cGUpLFxuICB9O1xufTtcblxuY29uc3QgbWFwVGlja2V0TGlua0l0ZW1Ub0NhcmQgPSAoaXRlbTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBFeHBlbnNlVGlja2V0TGlua0NhcmQgPT4ge1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IFwibGlua1wiLFxuICAgIGZpbGVJZDogU3RyaW5nKGl0ZW0/LkZpbGVJZCB8fCBcIlwiKS50cmltKCksXG4gICAgZGVzY3JpcHRpb246IFN0cmluZyhpdGVtPy5EZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXG4gICAgcHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woaXRlbT8uUHJvY2Vzc2VkQnlBSSksXG4gICAgY3VycmVuY3lDb2RlOiBTdHJpbmcoaXRlbT8uQ3VycmVuY3lDb2RlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICB0b3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtPy5Ub3RhbEFtb3VudCksXG4gICAgdHJhbnNEYXRlOiBTdHJpbmcoaXRlbT8uVHJhbnNEYXRlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICBmaWxlTmFtZTogU3RyaW5nKGl0ZW0/LkZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSxcbiAgICBnYXN0b1R5cGU6IHRvTnVsbGFibGVUaWNrZXRHYXN0b1R5cGUoaXRlbT8uR2FzdG9UeXBlID8/IGl0ZW0/Lmdhc3RvVHlwZSksXG4gIH07XG59O1xuXG4vLyBPd25zIGxpc3QgZGF0YSBmZXRjaCwgbG9hZGluZyBzdGF0ZSwgYW5kIHBhZ2luYXRpb24gbWV0YWRhdGEgZm9yIHRpY2tldHMuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YSA9ICh7IGhhc0FjY2VzcywgcGFnZVNpemUsIG1vZGUsIG9uRm9yYmlkZGVuIH06IFVzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGFBcmdzKSA9PiB7XG4gIGNvbnN0IFtpdGVtcywgc2V0SXRlbXNdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldExpc3RQYWdlSXRlbVtdPihbXSk7XG4gIGNvbnN0IFt0b3RhbCwgc2V0VG90YWxdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtjdXJyZW50UGFnZSwgc2V0Q3VycmVudFBhZ2VdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RLZXlSZWYgPSB1c2VSZWYoXCJcIik7XG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RTZXFSZWYgPSB1c2VSZWYoMCk7XG5cbiAgY29uc3QgcmVzdG9yZUxpc3RTbmFwc2hvdCA9IHVzZUNhbGxiYWNrKFxuICAgIChzbmFwc2hvdDogeyBpdGVtczogRXhwZW5zZVRpY2tldExpc3RQYWdlSXRlbVtdOyB0b3RhbDogbnVtYmVyOyBwYWdlOiBudW1iZXIgfSkgPT4ge1xuICAgICAgY29uc3Qgc2FmZUl0ZW1zID0gQXJyYXkuaXNBcnJheShzbmFwc2hvdC5pdGVtcykgPyBzbmFwc2hvdC5pdGVtcyA6IFtdO1xuICAgICAgY29uc3Qgc2FmZVRvdGFsUmF3ID0gTnVtYmVyKHNuYXBzaG90LnRvdGFsKTtcbiAgICAgIGNvbnN0IHNhZmVUb3RhbCA9IE51bWJlci5pc0Zpbml0ZShzYWZlVG90YWxSYXcpICYmIHNhZmVUb3RhbFJhdyA+PSAwID8gc2FmZVRvdGFsUmF3IDogc2FmZUl0ZW1zLmxlbmd0aDtcbiAgICAgIGNvbnN0IHNhZmVQYWdlUmF3ID0gTnVtYmVyKHNuYXBzaG90LnBhZ2UpO1xuICAgICAgY29uc3Qgc2FmZVBhZ2UgPSBOdW1iZXIuaXNGaW5pdGUoc2FmZVBhZ2VSYXcpICYmIHNhZmVQYWdlUmF3ID4gMCA/IE1hdGguZmxvb3Ioc2FmZVBhZ2VSYXcpIDogMTtcblxuICAgICAgc2V0SXRlbXMoc2FmZUl0ZW1zKTtcbiAgICAgIHNldFRvdGFsKHNhZmVUb3RhbCk7XG4gICAgICBzZXRDdXJyZW50UGFnZShzYWZlUGFnZSk7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgIH0sXG4gICAgW11cbiAgKTtcblxuICBjb25zdCBsb2FkTGlzdCA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChwYWdlOiBudW1iZXIsIGZpbHRlcnM6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpID0+IHtcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8oXCJsb2FkTGlzdDpyZXF1ZXN0ZWRcIiwge1xuICAgICAgICBwYWdlLFxuICAgICAgICBtb2RlLFxuICAgICAgICBoYXNBY2Nlc3MsXG4gICAgICAgIGZpbHRlcnMsXG4gICAgICB9KTtcbiAgICAgIGlmICghaGFzQWNjZXNzKSB7XG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJsb2FkTGlzdDpibG9ja2VkLW5vLWFjY2Vzc1wiLCB7XG4gICAgICAgICAgcGFnZSxcbiAgICAgICAgICBtb2RlLFxuICAgICAgICB9KTtcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXlsb2FkID1cbiAgICAgICAgbW9kZSA9PT0gXCJsaW5rXCJcbiAgICAgICAgICA/IGJ1aWxkRXhwZW5zZVRpY2tldExpbmtMaXN0UGF5bG9hZChmaWx0ZXJzLCBwYWdlLCBwYWdlU2l6ZSlcbiAgICAgICAgICA6IGJ1aWxkRXhwZW5zZVRpY2tldExpc3RQYXlsb2FkKGZpbHRlcnMsIHBhZ2UsIHBhZ2VTaXplKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkID0gU3RyaW5nKGZpbHRlcnM/Lm1hbmFnZWRVc2VySWQgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG4gICAgICBjb25zdCByZXF1ZXN0S2V5ID0gSlNPTi5zdHJpbmdpZnkoeyBtb2RlLCBwYXlsb2FkLCBtYW5hZ2VkVXNlcklkOiBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCB9KTtcblxuICAgICAgaWYgKGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgJiYgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID09PSByZXF1ZXN0S2V5KSB7XG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJsb2FkTGlzdDpza2lwLWR1cGxpY2F0ZS1yZXF1ZXN0XCIsIHtcbiAgICAgICAgICBwYWdlLFxuICAgICAgICAgIG1vZGUsXG4gICAgICAgICAgcmVxdWVzdEtleSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyhcImxvYWRMaXN0OmFib3J0LXByZXZpb3VzLXJlcXVlc3RcIiwge1xuICAgICAgICAgIHByZXZpb3VzUmVxdWVzdEtleTogYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50LFxuICAgICAgICAgIHByZXZpb3VzUmVxdWVzdFNlcTogYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50LFxuICAgICAgICAgIHN0YWNrOiBidWlsZEV4cGVuc2VUaWNrZXRzRGVidWdTdGFjayhcImxvYWRMaXN0OmFib3J0LXByZXZpb3VzLXJlcXVlc3RcIiksXG4gICAgICAgIH0pO1xuICAgICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50LmFib3J0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcbiAgICAgIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9IHJlcXVlc3RLZXk7XG4gICAgICBjb25zdCByZXF1ZXN0U2VxID0gYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50ICsgMTtcbiAgICAgIGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCA9IHJlcXVlc3RTZXE7XG4gICAgICBjb25zdCBoYW5kbGVBYm9ydFNpZ25hbCA9ICgpID0+IHtcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImxvYWRMaXN0OnNpZ25hbC1hYm9ydC1ldmVudFwiLCB7XG4gICAgICAgICAgcGFnZSxcbiAgICAgICAgICBtb2RlLFxuICAgICAgICAgIHJlcXVlc3RTZXEsXG4gICAgICAgICAgcmVxdWVzdEtleSxcbiAgICAgICAgICBzaWduYWxBYm9ydGVkOiBjb250cm9sbGVyLnNpZ25hbC5hYm9ydGVkLFxuICAgICAgICAgIHNpZ25hbFJlYXNvbjpcbiAgICAgICAgICAgIFwicmVhc29uXCIgaW4gY29udHJvbGxlci5zaWduYWxcbiAgICAgICAgICAgICAgPyAoKGNvbnRyb2xsZXIuc2lnbmFsIGFzIEFib3J0U2lnbmFsICYgeyByZWFzb24/OiB1bmtub3duIH0pLnJlYXNvbiA/PyBudWxsKVxuICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIGNvbnRyb2xsZXIuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBoYW5kbGVBYm9ydFNpZ25hbCwgeyBvbmNlOiB0cnVlIH0pO1xuXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RJbmZvKFwibG9hZExpc3Q6ZmV0Y2gtc3RhcnRcIiwge1xuICAgICAgICBwYWdlLFxuICAgICAgICBtb2RlLFxuICAgICAgICBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCxcbiAgICAgICAgcGF5bG9hZCxcbiAgICAgICAgcmVxdWVzdEtleSxcbiAgICAgICAgcmVxdWVzdFNlcSxcbiAgICAgIH0pO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJ1bkV4cGVuc2VSZWFkUmVxdWVzdFdpdGhSZXRyeShcbiAgICAgICAgICAoKSA9PlxuICAgICAgICAgICAgbW9kZSA9PT0gXCJsaW5rXCJcbiAgICAgICAgICAgICAgPyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0KHBheWxvYWQsIHtcbiAgICAgICAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICAgICAgICAgICAgICAgIGF4VXNlcklkT3ZlcnJpZGU6IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICA6IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QocGF5bG9hZCwge1xuICAgICAgICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICAgICAgICAgICAgYXhVc2VySWRPdmVycmlkZTogbm9ybWFsaXplZE1hbmFnZWRVc2VySWQgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RJbmZvKFwibG9hZExpc3Q6ZmV0Y2gtZmluaXNoZWRcIiwge1xuICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgbW9kZSxcbiAgICAgICAgICByZXF1ZXN0U2VxLFxuICAgICAgICAgIHN1Y2Nlc3M6IHJlc3BvbnNlPy5TdWNjZXNzLFxuICAgICAgICAgIHRvdGFsOiByZXNwb25zZT8uVG90YWwsXG4gICAgICAgICAgaXRlbXM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zLmxlbmd0aCA6IDAsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocmVxdWVzdFNlcSAhPT0gYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50KSByZXR1cm47XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJsb2FkTGlzdDphcGktdW5zdWNjZXNzZnVsXCIsIHtcbiAgICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgICBtb2RlLFxuICAgICAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuTWVzc2FnZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiVGlja2V0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXRzLlwiKSk7XG4gICAgICAgICAgc2V0SXRlbXMoW10pO1xuICAgICAgICAgIHNldFRvdGFsKDApO1xuICAgICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNvdXJjZUl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcbiAgICAgICAgY29uc3QgbWFwcGVkSXRlbXMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgbW9kZSA9PT0gXCJsaW5rXCJcbiAgICAgICAgICAgID8gbWFwVGlja2V0TGlua0l0ZW1Ub0NhcmQoaXRlbSBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVxuICAgICAgICAgICAgOiBtYXBUaWNrZXRJdGVtVG9DYXJkKGl0ZW0gYXMgdW5rbm93biBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VUb3RhbCA9IE51bWJlcihyZXNwb25zZT8uVG90YWwgPz8gbWFwcGVkSXRlbXMubGVuZ3RoID8/IDApO1xuXG4gICAgICAgIHNldEl0ZW1zKG1hcHBlZEl0ZW1zKTtcbiAgICAgICAgc2V0VG90YWwocmVzcG9uc2VUb3RhbCk7XG4gICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKHJlcXVlc3RTZXEgIT09IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgICAgICBpZiAoaXNFeHBlbnNlQWJvcnRMaWtlRXJyb3IoZXJyb3IsIGNvbnRyb2xsZXIuc2lnbmFsKSkge1xuICAgICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJsb2FkTGlzdDphYm9ydGVkXCIsIHtcbiAgICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgICBtb2RlLFxuICAgICAgICAgICAgcmVxdWVzdFNlcSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogZXJyb3IsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJsb2FkTGlzdDpmb3JiaWRkZW5cIiwge1xuICAgICAgICAgICAgcGFnZSxcbiAgICAgICAgICAgIG1vZGUsXG4gICAgICAgICAgICByZXF1ZXN0U2VxLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0RXJyb3IoXCJsb2FkTGlzdDpmYWlsZWRcIiwge1xuICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgbW9kZSxcbiAgICAgICAgICByZXF1ZXN0U2VxLFxuICAgICAgICAgIG1lc3NhZ2U6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogZXJyb3IsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiVGlja2V0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXRzLlwiKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICAgIHNldFRvdGFsKDApO1xuICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGNvbnRyb2xsZXIuc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBoYW5kbGVBYm9ydFNpZ25hbCk7XG4gICAgICAgIGlmIChyZXF1ZXN0U2VxID09PSBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RJbmZvKFwibG9hZExpc3Q6ZmluYWxpemVcIiwge1xuICAgICAgICAgICAgcGFnZSxcbiAgICAgICAgICAgIG1vZGUsXG4gICAgICAgICAgICByZXF1ZXN0U2VxLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgW2hhc0FjY2VzcywgbW9kZSwgb25Gb3JiaWRkZW4sIHBhZ2VTaXplXVxuICApO1xuXG4gIGNvbnN0IHJlc2V0TGlzdCA9IHVzZUNhbGxiYWNrKChzb3VyY2UgPSBcInVua25vd25cIikgPT4ge1xuICAgIGlmIChhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50KSB7XG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwicmVzZXRMaXN0OmFib3J0LWFjdGl2ZS1yZXF1ZXN0XCIsIHtcbiAgICAgICAgc291cmNlLFxuICAgICAgICBhY3RpdmVSZXF1ZXN0S2V5OiBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQsXG4gICAgICAgIGFjdGl2ZVJlcXVlc3RTZXE6IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCxcbiAgICAgICAgc3RhY2s6IGJ1aWxkRXhwZW5zZVRpY2tldHNEZWJ1Z1N0YWNrKGByZXNldExpc3Q6JHtzb3VyY2V9YCksXG4gICAgICB9KTtcbiAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQuYWJvcnQoKTtcbiAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID0gXCJcIjtcbiAgICB9XG4gICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyhcInJlc2V0TGlzdDpjbGVhci1zdGF0ZVwiLCB7XG4gICAgICBzb3VyY2UsXG4gICAgfSk7XG4gICAgc2V0SXRlbXMoW10pO1xuICAgIHNldFRvdGFsKDApO1xuICAgIHNldEN1cnJlbnRQYWdlKDEpO1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNsZWFyTGlzdENhY2hlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIC8vIFRpY2tldCBsaXN0IGF1dG8tbG9hZCBtdXN0IGFsd2F5cyBoaXQgdGhlIGxpdmUgZW5kcG9pbnQuXG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCkge1xuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwiY2xlYW51cDphYm9ydC1hY3RpdmUtcmVxdWVzdFwiLCB7XG4gICAgICAgICAgYWN0aXZlUmVxdWVzdEtleTogYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50LFxuICAgICAgICAgIGFjdGl2ZVJlcXVlc3RTZXE6IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCxcbiAgICAgICAgICBzdGFjazogYnVpbGRFeHBlbnNlVGlja2V0c0RlYnVnU3RhY2soXCJjbGVhbnVwOmFib3J0LWFjdGl2ZS1yZXF1ZXN0XCIpLFxuICAgICAgICB9KTtcbiAgICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudC5hYm9ydCgpO1xuICAgICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID0gXCJcIjtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBpdGVtcyxcbiAgICB0b3RhbCxcbiAgICBjdXJyZW50UGFnZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGxvYWRMaXN0LFxuICAgIHJlc3RvcmVMaXN0U25hcHNob3QsXG4gICAgcmVzZXRMaXN0LFxuICAgIGNsZWFyTGlzdENhY2hlLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyBub3JtYWxpemVFeHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QudHNcIjtcbmltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcbiAgRXhwZW5zZVRpY2tldExpbmtDYXJkLFxuICBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGUsXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcbmltcG9ydCB7IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeSwgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcbmltcG9ydCB7IGdldEV4cGVuc2VTY29wZVRva2VuIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTY29wZS50c1wiO1xuXG5jb25zdCBFWFBFTlNFX1RJQ0tFVF9MSU5LX1JFVFVSTl9TVEFURV9LRVlfUFJFRklYID0gXCJleHBlbnNlX3RpY2tldF9saW5rX3JldHVybl9zdGF0ZV92MVwiO1xuY29uc3QgRVhQRU5TRV9USUNLRVRfTElOS19SRVRVUk5fU1RBVEVfVFRMX01TID0gMTIgKiA2MCAqIDYwICogMTAwMDtcbmNvbnN0IEFMTE9XRURfVElDS0VUX0dBU1RPX1RZUEVTID0gbmV3IFNldDxudW1iZXI+KFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0pO1xuXG5leHBvcnQgdHlwZSBFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlID0ge1xuICBzaGVldElkOiBzdHJpbmc7XG4gIHBhZ2U6IG51bWJlcjtcbiAgc2Nyb2xsWTogbnVtYmVyO1xuICBmb2N1c0ZpbGVJZDogc3RyaW5nO1xuICBmaWx0ZXJzOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90O1xuICBzZWxlY3Rpb25Nb2RlOiBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGU7XG4gIHNlbGVjdGVkVGlja2V0czogRXhwZW5zZVRpY2tldExpbmtDYXJkW107XG4gIGV4Y2x1ZGVkSWRzOiBzdHJpbmdbXTtcbiAgZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90IHwgbnVsbDtcbiAgZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbDogbnVtYmVyO1xufTtcblxuY29uc3QgZ2V0U2NvcGVkS2V5ID0gKCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBgJHtFWFBFTlNFX1RJQ0tFVF9MSU5LX1JFVFVSTl9TVEFURV9LRVlfUFJFRklYfV8ke2dldEV4cGVuc2VTY29wZVRva2VuKCl9YDtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUZpbGVJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIHJldHVybiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xufTtcblxuY29uc3Qgbm9ybWFsaXplUHJvY2Vzc2VkQnlBaSA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gfCBudWxsID0+IHtcbiAgaWYgKHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBmYWxzZSkgcmV0dXJuIHZhbHVlO1xuICBpZiAodmFsdWUgPT09IDEgfHwgdmFsdWUgPT09IFwiMVwiIHx8IHZhbHVlID09PSBcInRydWVcIikgcmV0dXJuIHRydWU7XG4gIGlmICh2YWx1ZSA9PT0gMCB8fCB2YWx1ZSA9PT0gXCIwXCIgfHwgdmFsdWUgPT09IFwiZmFsc2VcIikgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZU51bGxhYmxlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XG59O1xuXG5jb25zdCBub3JtYWxpemVUaWNrZXRHYXN0b1R5cGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlVGlja2V0TGlua0NhcmRbXCJnYXN0b1R5cGVcIl0gPT4ge1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICBpZiAoIU51bWJlci5pc0ludGVnZXIocGFyc2VkKSB8fCAhQUxMT1dFRF9USUNLRVRfR0FTVE9fVFlQRVMuaGFzKHBhcnNlZCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gcGFyc2VkIGFzIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtcImdhc3RvVHlwZVwiXTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZVNlbGVjdGlvbk1vZGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGUgPT4ge1xuICByZXR1cm4gdmFsdWUgPT09IFwiZmlsdGVyZWRcIiA/IFwiZmlsdGVyZWRcIiA6IFwic2VsZWN0ZWRcIjtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZVNlbGVjdGVkVGlja2V0cyA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtdID0+IHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IGl0ZW1zID0gbmV3IE1hcDxzdHJpbmcsIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZD4oKTtcbiAgZm9yIChjb25zdCBlbnRyeSBvZiB2YWx1ZSkge1xuICAgIGNvbnN0IGl0ZW0gPSAoZW50cnkgfHwge30pIGFzIFBhcnRpYWw8RXhwZW5zZVRpY2tldExpbmtDYXJkPjtcbiAgICBjb25zdCBmaWxlSWQgPSBub3JtYWxpemVGaWxlSWQoaXRlbS5maWxlSWQpO1xuICAgIGlmICghZmlsZUlkKSBjb250aW51ZTtcblxuICAgIGl0ZW1zLnNldChmaWxlSWQsIHtcbiAgICAgIGtpbmQ6IFwibGlua1wiLFxuICAgICAgZmlsZUlkLFxuICAgICAgZGVzY3JpcHRpb246IFN0cmluZyhpdGVtLmRlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKSxcbiAgICAgIHByb2Nlc3NlZEJ5QUk6IG5vcm1hbGl6ZVByb2Nlc3NlZEJ5QWkoaXRlbS5wcm9jZXNzZWRCeUFJKSxcbiAgICAgIGN1cnJlbmN5Q29kZTogU3RyaW5nKGl0ZW0uY3VycmVuY3lDb2RlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICAgIHRvdGFsQW1vdW50OiBub3JtYWxpemVOdWxsYWJsZU51bWJlcihpdGVtLnRvdGFsQW1vdW50KSxcbiAgICAgIHRyYW5zRGF0ZTogU3RyaW5nKGl0ZW0udHJhbnNEYXRlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICAgIGZpbGVOYW1lOiBTdHJpbmcoaXRlbS5maWxlTmFtZSB8fCBcIlwiKS50cmltKCksXG4gICAgICBnYXN0b1R5cGU6IG5vcm1hbGl6ZVRpY2tldEdhc3RvVHlwZShpdGVtLmdhc3RvVHlwZSksXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gQXJyYXkuZnJvbShpdGVtcy52YWx1ZXMoKSk7XG59O1xuXG5jb25zdCBub3JtYWxpemVFeGNsdWRlZElkcyA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZ1tdID0+IHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IGlkcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBmb3IgKGNvbnN0IGVudHJ5IG9mIHZhbHVlKSB7XG4gICAgY29uc3QgZmlsZUlkID0gbm9ybWFsaXplRmlsZUlkKGVudHJ5KTtcbiAgICBpZiAoIWZpbGVJZCkgY29udGludWU7XG4gICAgaWRzLmFkZChmaWxlSWQpO1xuICB9XG5cbiAgcmV0dXJuIEFycmF5LmZyb20oaWRzKTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZU5vbk5lZ2F0aXZlSW50ZWdlciA9ICh2YWx1ZTogdW5rbm93biwgZmFsbGJhY2sgPSAwKTogbnVtYmVyID0+IHtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpICYmIHBhcnNlZCA+PSAwID8gTWF0aC5mbG9vcihwYXJzZWQpIDogZmFsbGJhY2s7XG59O1xuXG4vLyBOb3JtYWxpemVzIHRoZSBsaW5rLW1vZGUgdGlja2V0IHJldHVybiBzdGF0ZSBzbyBiYWNrIG5hdmlnYXRpb24gY2FuIHJlc3RvcmUgZmlsdGVycyBhbmQgc2VsZWN0aW9uIHNhZmVseS5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSB8IG51bGwgPT4ge1xuICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgcGF5bG9hZCA9IHZhbHVlIGFzIFBhcnRpYWw8RXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZT47XG4gIGNvbnN0IHNoZWV0SWQgPSBTdHJpbmcocGF5bG9hZC5zaGVldElkIHx8IFwiXCIpLnRyaW0oKTtcbiAgaWYgKCFzaGVldElkKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4ge1xuICAgIHNoZWV0SWQsXG4gICAgcGFnZTogTWF0aC5tYXgoMSwgbm9ybWFsaXplTm9uTmVnYXRpdmVJbnRlZ2VyKHBheWxvYWQucGFnZSwgMSkpLFxuICAgIHNjcm9sbFk6IG5vcm1hbGl6ZU5vbk5lZ2F0aXZlSW50ZWdlcihwYXlsb2FkLnNjcm9sbFkpLFxuICAgIGZvY3VzRmlsZUlkOiBub3JtYWxpemVGaWxlSWQocGF5bG9hZC5mb2N1c0ZpbGVJZCksXG4gICAgZmlsdGVyczogbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90KHBheWxvYWQuZmlsdGVycyksXG4gICAgc2VsZWN0aW9uTW9kZTogbm9ybWFsaXplU2VsZWN0aW9uTW9kZShwYXlsb2FkLnNlbGVjdGlvbk1vZGUpLFxuICAgIHNlbGVjdGVkVGlja2V0czogbm9ybWFsaXplU2VsZWN0ZWRUaWNrZXRzKHBheWxvYWQuc2VsZWN0ZWRUaWNrZXRzKSxcbiAgICBleGNsdWRlZElkczogbm9ybWFsaXplRXhjbHVkZWRJZHMocGF5bG9hZC5leGNsdWRlZElkcyksXG4gICAgZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzOiBwYXlsb2FkLmZpbHRlcmVkU2VsZWN0aW9uRmlsdGVyc1xuICAgICAgPyBub3JtYWxpemVFeHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QocGF5bG9hZC5maWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnMpXG4gICAgICA6IG51bGwsXG4gICAgZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbDogbm9ybWFsaXplTm9uTmVnYXRpdmVJbnRlZ2VyKHBheWxvYWQuZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbCksXG4gIH07XG59O1xuXG4vLyBSZWFkcyBhIHN0b3JlZCBsaW5rLW1vZGUgcmV0dXJuIHN0YXRlIHdoZW4gaXQgc3RpbGwgbWF0Y2hlcyB0aGUgYWN0aXZlIGV4cGVuc2Ugc2hlZXQuXG5leHBvcnQgY29uc3QgcmVhZEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgPSAoc2hlZXRJZD86IHVua25vd24pOiBFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHN0b3JlZCA9IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoXG4gICAgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5PEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGU+KGdldFNjb3BlZEtleSgpKVxuICApO1xuICBpZiAoIXN0b3JlZCkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBTdHJpbmcoc2hlZXRJZCB8fCBcIlwiKS50cmltKCk7XG4gIGlmICghc2FmZVNoZWV0SWQpIHJldHVybiBzdG9yZWQ7XG4gIHJldHVybiBzdG9yZWQuc2hlZXRJZC50b1VwcGVyQ2FzZSgpID09PSBzYWZlU2hlZXRJZC50b1VwcGVyQ2FzZSgpID8gc3RvcmVkIDogbnVsbDtcbn07XG5cbi8vIFBlcnNpc3RzIHRoZSBtaW5pbXVtIGxpbmstbW9kZSBzdGF0ZSByZXF1aXJlZCB0byByZXR1cm4gZnJvbSB0aWNrZXQgZGV0YWlsIHdpdGhvdXQgbG9zaW5nIHNlbGVjdGlvbi5cbmV4cG9ydCBjb25zdCBzYXZlRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSA9IChcbiAgdmFsdWU6IEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgfCBudWxsIHwgdW5kZWZpbmVkXG4pOiBFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlIHwgbnVsbCA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKHZhbHVlKTtcbiAgaWYgKCFub3JtYWxpemVkKSB7XG4gICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkoZ2V0U2NvcGVkS2V5KCksIG5vcm1hbGl6ZWQsIEVYUEVOU0VfVElDS0VUX0xJTktfUkVUVVJOX1NUQVRFX1RUTF9NUyk7XG4gIHJldHVybiBub3JtYWxpemVkO1xufTtcblxuLy8gQ2xlYXJzIGFueSBzdG9yZWQgbGluay1tb2RlIHJldHVybiBzdGF0ZSBmb3IgdGhlIGN1cnJlbnQgZXhwZW5zZSBzY29wZS5cbmV4cG9ydCBjb25zdCBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgPSAoKTogdm9pZCA9PiB7XG4gIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoZ2V0U2NvcGVkS2V5KCkpO1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcbiAgRXhwZW5zZVRpY2tldExpbmtDYXJkLFxuICBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGUsXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcblxuZXhwb3J0IHR5cGUgRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25TdGF0ZSA9IHtcbiAgc2VsZWN0aW9uTW9kZTogRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25Nb2RlO1xuICBzZWxlY3RlZFRpY2tldHM6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtdO1xuICBleGNsdWRlZElkczogc3RyaW5nW107XG4gIGZpbHRlcmVkU25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfCBudWxsO1xuICBmaWx0ZXJlZFRvdGFsQ291bnQ6IG51bWJlcjtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUZpbGVJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xuXG5jb25zdCBub3JtYWxpemVTZWxlY3Rpb25Nb2RlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25Nb2RlID0+IHtcbiAgcmV0dXJuIHZhbHVlID09PSBcImZpbHRlcmVkXCIgPyBcImZpbHRlcmVkXCIgOiBcInNlbGVjdGVkXCI7XG59O1xuXG5jb25zdCBub3JtYWxpemVFeGNsdWRlZElkcyA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZ1tdID0+IHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IGlkcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBmb3IgKGNvbnN0IGVudHJ5IG9mIHZhbHVlKSB7XG4gICAgY29uc3QgZmlsZUlkID0gbm9ybWFsaXplRmlsZUlkKGVudHJ5KTtcbiAgICBpZiAoIWZpbGVJZCkgY29udGludWU7XG4gICAgaWRzLmFkZChmaWxlSWQpO1xuICB9XG5cbiAgcmV0dXJuIEFycmF5LmZyb20oaWRzKTtcbn07XG5cbmNvbnN0IHRvU2VsZWN0ZWRNYXAgPSAoaXRlbXM6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtdKTogUmVjb3JkPHN0cmluZywgRXhwZW5zZVRpY2tldExpbmtDYXJkPiA9PiB7XG4gIGNvbnN0IG5leHQ6IFJlY29yZDxzdHJpbmcsIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZD4gPSB7fTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgY29uc3QgZmlsZUlkID0gbm9ybWFsaXplRmlsZUlkKGl0ZW0uZmlsZUlkKTtcbiAgICBpZiAoIWZpbGVJZCkgY29udGludWU7XG4gICAgbmV4dFtmaWxlSWRdID0gaXRlbTtcbiAgfVxuICByZXR1cm4gbmV4dDtcbn07XG5cbi8vIEtlZXBzIGxpbmstbW9kZSB0aWNrZXQgc2VsZWN0aW9uIHN0YWJsZSBhY3Jvc3MgcGFnaW5nLCBmaWx0ZXJlZCBzZWxlY3QtYWxsLCBhbmQgZGV0YWlsIHJldHVybnMuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb24gPSAoKSA9PiB7XG4gIGNvbnN0IFtzZWxlY3Rpb25Nb2RlLCBzZXRTZWxlY3Rpb25Nb2RlXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZT4oXCJzZWxlY3RlZFwiKTtcbiAgY29uc3QgW3NlbGVjdGVkVGlja2V0c0J5SWQsIHNldFNlbGVjdGVkVGlja2V0c0J5SWRdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgRXhwZW5zZVRpY2tldExpbmtDYXJkPj4oe30pO1xuICBjb25zdCBbZXhjbHVkZWRJZHMsIHNldEV4Y2x1ZGVkSWRzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXSk7XG4gIGNvbnN0IFtmaWx0ZXJlZFNuYXBzaG90LCBzZXRGaWx0ZXJlZFNuYXBzaG90XSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2ZpbHRlcmVkVG90YWxDb3VudCwgc2V0RmlsdGVyZWRUb3RhbENvdW50XSA9IHVzZVN0YXRlKDApO1xuXG4gIGNvbnN0IHNlbGVjdGVkVGlja2V0cyA9IHVzZU1lbW8oKCkgPT4gT2JqZWN0LnZhbHVlcyhzZWxlY3RlZFRpY2tldHNCeUlkKSwgW3NlbGVjdGVkVGlja2V0c0J5SWRdKTtcbiAgY29uc3QgZXhjbHVkZWRJZFNldCA9IHVzZU1lbW8oKCkgPT4gbmV3IFNldChleGNsdWRlZElkcyksIFtleGNsdWRlZElkc10pO1xuICBjb25zdCBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlID0gc2VsZWN0aW9uTW9kZSA9PT0gXCJmaWx0ZXJlZFwiICYmICEhZmlsdGVyZWRTbmFwc2hvdDtcblxuICBjb25zdCBjbGVhclNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRTZWxlY3Rpb25Nb2RlKFwic2VsZWN0ZWRcIik7XG4gICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZCh7fSk7XG4gICAgc2V0RXhjbHVkZWRJZHMoW10pO1xuICAgIHNldEZpbHRlcmVkU25hcHNob3QobnVsbCk7XG4gICAgc2V0RmlsdGVyZWRUb3RhbENvdW50KDApO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgcmVzdG9yZVNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKChzdGF0ZTogRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25TdGF0ZSB8IG51bGwgfCB1bmRlZmluZWQpID0+IHtcbiAgICBpZiAoIXN0YXRlKSB7XG4gICAgICBjbGVhclNlbGVjdGlvbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5vcm1hbGl6ZWRNb2RlID0gbm9ybWFsaXplU2VsZWN0aW9uTW9kZShzdGF0ZS5zZWxlY3Rpb25Nb2RlKTtcbiAgICBjb25zdCBub3JtYWxpemVkU2VsZWN0ZWRUaWNrZXRzID0gQXJyYXkuaXNBcnJheShzdGF0ZS5zZWxlY3RlZFRpY2tldHMpID8gc3RhdGUuc2VsZWN0ZWRUaWNrZXRzIDogW107XG4gICAgY29uc3Qgbm9ybWFsaXplZFNuYXBzaG90ID0gc3RhdGUuZmlsdGVyZWRTbmFwc2hvdCB8fCBudWxsO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRFeGNsdWRlZElkcyA9IG5vcm1hbGl6ZUV4Y2x1ZGVkSWRzKHN0YXRlLmV4Y2x1ZGVkSWRzKTtcbiAgICBjb25zdCBub3JtYWxpemVkRmlsdGVyZWRUb3RhbCA9IE51bWJlci5pc0Zpbml0ZShOdW1iZXIoc3RhdGUuZmlsdGVyZWRUb3RhbENvdW50KSlcbiAgICAgID8gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihOdW1iZXIoc3RhdGUuZmlsdGVyZWRUb3RhbENvdW50KSkpXG4gICAgICA6IDA7XG5cbiAgICBzZXRTZWxlY3Rpb25Nb2RlKG5vcm1hbGl6ZWRNb2RlID09PSBcImZpbHRlcmVkXCIgJiYgbm9ybWFsaXplZFNuYXBzaG90ID8gXCJmaWx0ZXJlZFwiIDogXCJzZWxlY3RlZFwiKTtcbiAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKHRvU2VsZWN0ZWRNYXAobm9ybWFsaXplZFNlbGVjdGVkVGlja2V0cykpO1xuICAgIHNldEV4Y2x1ZGVkSWRzKG5vcm1hbGl6ZWRNb2RlID09PSBcImZpbHRlcmVkXCIgPyBub3JtYWxpemVkRXhjbHVkZWRJZHMgOiBbXSk7XG4gICAgc2V0RmlsdGVyZWRTbmFwc2hvdChub3JtYWxpemVkTW9kZSA9PT0gXCJmaWx0ZXJlZFwiID8gbm9ybWFsaXplZFNuYXBzaG90IDogbnVsbCk7XG4gICAgc2V0RmlsdGVyZWRUb3RhbENvdW50KG5vcm1hbGl6ZWRNb2RlID09PSBcImZpbHRlcmVkXCIgPyBub3JtYWxpemVkRmlsdGVyZWRUb3RhbCA6IDApO1xuICB9LCBbY2xlYXJTZWxlY3Rpb25dKTtcblxuICBjb25zdCBzZWxlY3RBbGxCeUZpbHRlcnMgPSB1c2VDYWxsYmFjaygoc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsIHRvdGFsQ291bnQ6IG51bWJlcikgPT4ge1xuICAgIHNldFNlbGVjdGlvbk1vZGUoXCJmaWx0ZXJlZFwiKTtcbiAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKHt9KTtcbiAgICBzZXRFeGNsdWRlZElkcyhbXSk7XG4gICAgc2V0RmlsdGVyZWRTbmFwc2hvdChzbmFwc2hvdCk7XG4gICAgc2V0RmlsdGVyZWRUb3RhbENvdW50KE51bWJlci5pc0Zpbml0ZSh0b3RhbENvdW50KSA/IE1hdGgubWF4KDAsIE1hdGguZmxvb3IodG90YWxDb3VudCkpIDogMCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBpc1NlbGVjdGVkID0gdXNlQ2FsbGJhY2soXG4gICAgKGZpbGVJZDogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBzYWZlRmlsZUlkID0gbm9ybWFsaXplRmlsZUlkKGZpbGVJZCk7XG4gICAgICBpZiAoIXNhZmVGaWxlSWQpIHJldHVybiBmYWxzZTtcblxuICAgICAgaWYgKGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuICFleGNsdWRlZElkU2V0LmhhcyhzYWZlRmlsZUlkKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICEhc2VsZWN0ZWRUaWNrZXRzQnlJZFtzYWZlRmlsZUlkXTtcbiAgICB9LFxuICAgIFtleGNsdWRlZElkU2V0LCBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlLCBzZWxlY3RlZFRpY2tldHNCeUlkXVxuICApO1xuXG4gIGNvbnN0IHRvZ2dsZVRpY2tldCA9IHVzZUNhbGxiYWNrKFxuICAgICh0aWNrZXQ6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCkgPT4ge1xuICAgICAgY29uc3QgZmlsZUlkID0gbm9ybWFsaXplRmlsZUlkKHRpY2tldC5maWxlSWQpO1xuICAgICAgaWYgKCFmaWxlSWQpIHJldHVybjtcblxuICAgICAgaWYgKGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUpIHtcbiAgICAgICAgc2V0RXhjbHVkZWRJZHMoKHByZXZpb3VzKSA9PiB7XG4gICAgICAgICAgY29uc3QgbmV4dCA9IG5ldyBTZXQocHJldmlvdXMpO1xuICAgICAgICAgIGlmIChuZXh0LmhhcyhmaWxlSWQpKSB7XG4gICAgICAgICAgICBuZXh0LmRlbGV0ZShmaWxlSWQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0LmFkZChmaWxlSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShuZXh0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZCgocHJldmlvdXMpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldmlvdXMgfTtcbiAgICAgICAgaWYgKG5leHRbZmlsZUlkXSkge1xuICAgICAgICAgIGRlbGV0ZSBuZXh0W2ZpbGVJZF07XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dFtmaWxlSWRdID0gdGlja2V0O1xuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW2lzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmVdXG4gICk7XG5cbiAgY29uc3QgaHlkcmF0ZVZpc2libGVUaWNrZXRzID0gdXNlQ2FsbGJhY2soKGl0ZW1zOiBFeHBlbnNlVGlja2V0TGlua0NhcmRbXSkgPT4ge1xuICAgIGlmIChzZWxlY3Rpb25Nb2RlICE9PSBcInNlbGVjdGVkXCIgfHwgaXRlbXMubGVuZ3RoIDwgMSkgcmV0dXJuO1xuXG4gICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZCgocHJldmlvdXMpID0+IHtcbiAgICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XG4gICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2aW91cyB9O1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGNvbnN0IGZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZChpdGVtLmZpbGVJZCk7XG4gICAgICAgIGlmICghZmlsZUlkIHx8ICFuZXh0W2ZpbGVJZF0pIGNvbnRpbnVlO1xuICAgICAgICBuZXh0W2ZpbGVJZF0gPSBpdGVtO1xuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjaGFuZ2VkID8gbmV4dCA6IHByZXZpb3VzO1xuICAgIH0pO1xuICB9LCBbc2VsZWN0aW9uTW9kZV0pO1xuXG4gIGNvbnN0IHJlc29sdmVTZWxlY3RlZENvdW50ID0gdXNlQ2FsbGJhY2soXG4gICAgKGZhbGxiYWNrVG90YWxDb3VudCA9IDApOiBudW1iZXIgPT4ge1xuICAgICAgaWYgKCFpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZFRpY2tldHMubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBiYXNlQ291bnQgPSBmaWx0ZXJlZFRvdGFsQ291bnQgPiAwID8gZmlsdGVyZWRUb3RhbENvdW50IDogTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihmYWxsYmFja1RvdGFsQ291bnQpKTtcbiAgICAgIHJldHVybiBNYXRoLm1heCgwLCBiYXNlQ291bnQgLSBleGNsdWRlZElkcy5sZW5ndGgpO1xuICAgIH0sXG4gICAgW2V4Y2x1ZGVkSWRzLmxlbmd0aCwgZmlsdGVyZWRUb3RhbENvdW50LCBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlLCBzZWxlY3RlZFRpY2tldHMubGVuZ3RoXVxuICApO1xuXG4gIHJldHVybiB7XG4gICAgc2VsZWN0aW9uTW9kZSxcbiAgICBzZWxlY3RlZFRpY2tldHMsXG4gICAgZXhjbHVkZWRJZHMsXG4gICAgZmlsdGVyZWRTbmFwc2hvdCxcbiAgICBmaWx0ZXJlZFRvdGFsQ291bnQsXG4gICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSxcbiAgICBpc1NlbGVjdGVkLFxuICAgIHRvZ2dsZVRpY2tldCxcbiAgICBjbGVhclNlbGVjdGlvbixcbiAgICByZXN0b3JlU2VsZWN0aW9uLFxuICAgIHNlbGVjdEFsbEJ5RmlsdGVycyxcbiAgICBoeWRyYXRlVmlzaWJsZVRpY2tldHMsXG4gICAgcmVzb2x2ZVNlbGVjdGVkQ291bnQsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZHVjZXIgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcblxudHlwZSBFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZFJlcXVlc3QgPSB7XG4gIHBhZ2U6IG51bWJlcjtcbiAgc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3Q7XG4gIGNsZWFyQ2FjaGU6IGJvb2xlYW47XG4gIHJlc2V0QmVmb3JlTG9hZDogYm9vbGVhbjtcbiAgd2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeTogYm9vbGVhbjtcbn07XG5cbnR5cGUgQXV0b21hdGljTG9hZEFjdGlvbiA9XG4gIHwge1xuICAgICAgdHlwZTogXCJzY2hlZHVsZVwiO1xuICAgICAgcmVxdWVzdDogRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRSZXF1ZXN0O1xuICAgIH1cbiAgfCB7XG4gICAgICB0eXBlOiBcImNsZWFyXCI7XG4gICAgfVxuICB8IHtcbiAgICAgIHR5cGU6IFwiZGlzYWJsZV9saW5rX3dhaXRcIjtcbiAgICB9O1xuXG5jb25zdCBhdXRvbWF0aWNMb2FkUmVkdWNlciA9IChcbiAgc3RhdGU6IEV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkUmVxdWVzdCB8IG51bGwsXG4gIGFjdGlvbjogQXV0b21hdGljTG9hZEFjdGlvblxuKTogRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRSZXF1ZXN0IHwgbnVsbCA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFwic2NoZWR1bGVcIjpcbiAgICAgIHJldHVybiBhY3Rpb24ucmVxdWVzdDtcbiAgICBjYXNlIFwiY2xlYXJcIjpcbiAgICAgIHJldHVybiBudWxsO1xuICAgIGNhc2UgXCJkaXNhYmxlX2xpbmtfd2FpdFwiOlxuICAgICAgcmV0dXJuIHN0YXRlID8geyAuLi5zdGF0ZSwgd2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeTogZmFsc2UgfSA6IG51bGw7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxudHlwZSBVc2VFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZEFyZ3MgPSB7XG4gIGlzTGlua01vZGU6IGJvb2xlYW47XG4gIGNhblByb2Nlc3NMaW5rTW9kZTogYm9vbGVhbjtcbiAgbGlua1NoZWV0Q2hlY2tCdXN5OiBib29sZWFuO1xuICBsaW5rU2hlZXRMb2NrZWQ6IGJvb2xlYW47XG4gIGNsZWFyTGlzdENhY2hlOiAoKSA9PiB2b2lkO1xuICByZXNldExpc3Q6IChzb3VyY2U/OiBzdHJpbmcpID0+IHZvaWQ7XG4gIGxvYWRMaXN0OiAocGFnZTogbnVtYmVyLCBzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4gUHJvbWlzZTx2b2lkPjtcbn07XG5cbmNvbnN0IEVYUEVOU0VfVElDS0VUU19BVVRPX0xPQURfTE9HX1BSRUZJWCA9IFwiW2V4cGVuc2UtdGlja2V0czphdXRvLWxvYWRdXCI7XG5cbmNvbnN0IGxvZ0V4cGVuc2VUaWNrZXRzQXV0b0xvYWRJbmZvID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUuaW5mbyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY29uc29sZS5pbmZvKEVYUEVOU0VfVElDS0VUU19BVVRPX0xPQURfTE9HX1BSRUZJWCwgLi4uYXJncyk7XG4gIH1cbn07XG5cbmNvbnN0IGxvZ0V4cGVuc2VUaWNrZXRzQXV0b0xvYWRXYXJuID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUud2FybiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY29uc29sZS53YXJuKEVYUEVOU0VfVElDS0VUU19BVVRPX0xPQURfTE9HX1BSRUZJWCwgLi4uYXJncyk7XG4gIH1cbn07XG5cbi8vIFF1ZXVlcyBvbmUgdGlja2V0IGxpc3QgcmVsb2FkIGFuZCByZWxlYXNlcyBpdCBvbmx5IHdoZW4gbGluay1tb2RlIHByZWNvbmRpdGlvbnMgYXJlIHJlYWR5LlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkID0gKHtcbiAgaXNMaW5rTW9kZSxcbiAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxuICBsaW5rU2hlZXRDaGVja0J1c3ksXG4gIGxpbmtTaGVldExvY2tlZCxcbiAgY2xlYXJMaXN0Q2FjaGUsXG4gIHJlc2V0TGlzdCxcbiAgbG9hZExpc3QsXG59OiBVc2VFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZEFyZ3MpID0+IHtcbiAgY29uc3QgW3BlbmRpbmdBdXRvbWF0aWNMb2FkLCBkaXNwYXRjaF0gPSB1c2VSZWR1Y2VyKGF1dG9tYXRpY0xvYWRSZWR1Y2VyLCBudWxsKTtcblxuICBjb25zdCBydW5BdXRvbWF0aWNMaXN0TG9hZCA9IHVzZUNhbGxiYWNrKFxuICAgIChcbiAgICAgIHBhZ2U6IG51bWJlcixcbiAgICAgIHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjbGVhckNhY2hlPzogYm9vbGVhbjtcbiAgICAgICAgcmVzZXRCZWZvcmVMb2FkPzogYm9vbGVhbjtcbiAgICAgICAgd2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeT86IGJvb2xlYW47XG4gICAgICB9ID0ge31cbiAgICApID0+IHtcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzQXV0b0xvYWRJbmZvKFwicnVuQXV0b21hdGljTGlzdExvYWQ6c2NoZWR1bGVcIiwge1xuICAgICAgICBwYWdlLFxuICAgICAgICBzbmFwc2hvdCxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgIH0pO1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBcInNjaGVkdWxlXCIsXG4gICAgICAgIHJlcXVlc3Q6IHtcbiAgICAgICAgICBwYWdlLFxuICAgICAgICAgIHNuYXBzaG90LFxuICAgICAgICAgIGNsZWFyQ2FjaGU6IG9wdGlvbnMuY2xlYXJDYWNoZSA9PT0gdHJ1ZSxcbiAgICAgICAgICByZXNldEJlZm9yZUxvYWQ6IG9wdGlvbnMucmVzZXRCZWZvcmVMb2FkID09PSB0cnVlLFxuICAgICAgICAgIHdhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHk6IG9wdGlvbnMud2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeSA9PT0gdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW11cbiAgKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghcGVuZGluZ0F1dG9tYXRpY0xvYWQpIHJldHVybjtcblxuICAgIGlmIChwZW5kaW5nQXV0b21hdGljTG9hZC53YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5KSB7XG4gICAgICBpZiAoIWlzTGlua01vZGUpIHtcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZFdhcm4oXCJwZW5kaW5nQXV0b21hdGljTG9hZDpkaXNhYmxlLWxpbmstd2FpdFwiLCB7XG4gICAgICAgICAgcGFnZTogcGVuZGluZ0F1dG9tYXRpY0xvYWQucGFnZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJkaXNhYmxlX2xpbmtfd2FpdFwiIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghY2FuUHJvY2Vzc0xpbmtNb2RlIHx8IGxpbmtTaGVldENoZWNrQnVzeSkge1xuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkSW5mbyhcInBlbmRpbmdBdXRvbWF0aWNMb2FkOndhaXRpbmctbGluay1tb2RlLXJlYWR5XCIsIHtcbiAgICAgICAgICBwYWdlOiBwZW5kaW5nQXV0b21hdGljTG9hZC5wYWdlLFxuICAgICAgICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcbiAgICAgICAgICBsaW5rU2hlZXRDaGVja0J1c3ksXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChsaW5rU2hlZXRMb2NrZWQpIHtcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZFdhcm4oXCJwZW5kaW5nQXV0b21hdGljTG9hZDpjbGVhci1saW5rLWxvY2tlZFwiLCB7XG4gICAgICAgICAgcGFnZTogcGVuZGluZ0F1dG9tYXRpY0xvYWQucGFnZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJjbGVhclwiIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgeyBwYWdlLCBzbmFwc2hvdCwgY2xlYXJDYWNoZSwgcmVzZXRCZWZvcmVMb2FkIH0gPSBwZW5kaW5nQXV0b21hdGljTG9hZDtcbiAgICBkaXNwYXRjaCh7IHR5cGU6IFwiY2xlYXJcIiB9KTtcbiAgICBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkSW5mbyhcInBlbmRpbmdBdXRvbWF0aWNMb2FkOmV4ZWN1dGVcIiwge1xuICAgICAgcGFnZSxcbiAgICAgIHNuYXBzaG90LFxuICAgICAgY2xlYXJDYWNoZSxcbiAgICAgIHJlc2V0QmVmb3JlTG9hZCxcbiAgICB9KTtcblxuICAgIGlmIChjbGVhckNhY2hlKSB7XG4gICAgICBjbGVhckxpc3RDYWNoZSgpO1xuICAgIH1cblxuICAgIGlmIChyZXNldEJlZm9yZUxvYWQpIHtcbiAgICAgIHJlc2V0TGlzdChcImF1dG9tYXRpYy1sb2FkOnJlc2V0LWJlZm9yZS1sb2FkXCIpO1xuICAgIH1cblxuICAgIHZvaWQgbG9hZExpc3QocGFnZSwgc25hcHNob3QpO1xuICB9LCBbXG4gICAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxuICAgIGNsZWFyTGlzdENhY2hlLFxuICAgIGlzTGlua01vZGUsXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxuICAgIGxpbmtTaGVldExvY2tlZCxcbiAgICBsb2FkTGlzdCxcbiAgICBwZW5kaW5nQXV0b21hdGljTG9hZCxcbiAgICByZXNldExpc3QsXG4gIF0pO1xuXG4gIHJldHVybiB7XG4gICAgcnVuQXV0b21hdGljTGlzdExvYWQsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVkdWNlciB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsLCBtYXBFeHBlbnNlU2hlZXRIZWFkZXIgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgaXNFeHBlbnNlQWJvcnRMaWtlRXJyb3IgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVJlcXVlc3RSZXRyeS50c1wiO1xuaW1wb3J0IHsgaGFzQXNzaWduZWRWb3VjaGVyLCBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgcmVzb2x2ZUV4cGVuc2VTaGVldERldGFpbFBvbGljeSB9IGZyb20gXCIuLi9kZXRhaWwvZXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5LnRzXCI7XG5pbXBvcnQgeyBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VNYW5hZ2VkVXNlclNjb3BlLnRzXCI7XG5cbmNvbnN0IEVYUEVOU0VfU1RBVFVTX1BBSUQgPSA0O1xuXG50eXBlIExpbmtTaGVldEdhdGVTdGF0ZSA9IHtcbiAgbGlua1NoZWV0TG9ja2VkOiBib29sZWFuO1xuICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZTogc3RyaW5nO1xuICBsaW5rU2hlZXRDaGVja0J1c3k6IGJvb2xlYW47XG59O1xuXG50eXBlIExpbmtTaGVldEdhdGVBY3Rpb24gPVxuICB8IHtcbiAgICAgIHR5cGU6IFwicmVwbGFjZVwiO1xuICAgICAgbmV4dFN0YXRlOiBMaW5rU2hlZXRHYXRlU3RhdGU7XG4gICAgfVxuICB8IHtcbiAgICAgIHR5cGU6IFwicGF0Y2hcIjtcbiAgICAgIHBhdGNoOiBQYXJ0aWFsPExpbmtTaGVldEdhdGVTdGF0ZT47XG4gICAgfTtcblxudHlwZSBVc2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZUFyZ3MgPSB7XG4gIGlzTGlua01vZGU6IGJvb2xlYW47XG4gIGxpbmtTaGVldElkOiBzdHJpbmc7XG4gIGNhblByb2Nlc3NMaW5rTW9kZTogYm9vbGVhbjtcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcbiAgY2FuTWFuYWdlT3RoZXJVc2VyczogYm9vbGVhbjtcbiAgY3VycmVudEF4VXNlcklkOiBzdHJpbmc7XG4gIGN1cnJlbnRDcm1Vc2VySWQ6IHN0cmluZztcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkOiBzdHJpbmc7XG4gIHJlc29sdmVCbG9ja2VkTWVzc2FnZTogKGlzUGFpZDogYm9vbGVhbikgPT4gc3RyaW5nO1xufTtcblxuY29uc3QgSU5JVElBTF9MSU5LX1NIRUVUX0dBVEVfU1RBVEU6IExpbmtTaGVldEdhdGVTdGF0ZSA9IHtcbiAgbGlua1NoZWV0TG9ja2VkOiBmYWxzZSxcbiAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2U6IFwiXCIsXG4gIGxpbmtTaGVldENoZWNrQnVzeTogZmFsc2UsXG59O1xuXG5jb25zdCBsaW5rU2hlZXRHYXRlUmVkdWNlciA9IChzdGF0ZTogTGlua1NoZWV0R2F0ZVN0YXRlLCBhY3Rpb246IExpbmtTaGVldEdhdGVBY3Rpb24pOiBMaW5rU2hlZXRHYXRlU3RhdGUgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBcInJlcGxhY2VcIjpcbiAgICAgIHJldHVybiBhY3Rpb24ubmV4dFN0YXRlO1xuICAgIGNhc2UgXCJwYXRjaFwiOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIC4uLmFjdGlvbi5wYXRjaCxcbiAgICAgIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxuLy8gVmFsaWRhdGVzIHRoZSB0YXJnZXQgc2hlZXQgc3RhdGUgYmVmb3JlIGxpbmstbW9kZSBhY3Rpb25zIGNhbiBydW4uXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldExpbmtTaGVldEdhdGUgPSAoe1xuICBpc0xpbmtNb2RlLFxuICBsaW5rU2hlZXRJZCxcbiAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxuICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxuICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICBjdXJyZW50QXhVc2VySWQsXG4gIGN1cnJlbnRDcm1Vc2VySWQsXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcbiAgcmVzb2x2ZUJsb2NrZWRNZXNzYWdlLFxufTogVXNlRXhwZW5zZVRpY2tldExpbmtTaGVldEdhdGVBcmdzKSA9PiB7XG4gIGNvbnN0IFtzdGF0ZSwgZGlzcGF0Y2hdID0gdXNlUmVkdWNlcihsaW5rU2hlZXRHYXRlUmVkdWNlciwgSU5JVElBTF9MSU5LX1NIRUVUX0dBVEVfU1RBVEUpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc0xpbmtNb2RlIHx8ICFsaW5rU2hlZXRJZCkge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBcInJlcGxhY2VcIixcbiAgICAgICAgbmV4dFN0YXRlOiBJTklUSUFMX0xJTktfU0hFRVRfR0FURV9TVEFURSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghY2FuUHJvY2Vzc0xpbmtNb2RlKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFwicmVwbGFjZVwiLFxuICAgICAgICBuZXh0U3RhdGU6IHtcbiAgICAgICAgICBsaW5rU2hlZXRMb2NrZWQ6IHRydWUsXG4gICAgICAgICAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2U6IGluZFQoXCJBdXRoX1Blcm1pc3Npb25EZW5pZWRfQm9keVwiLCBcIk5vIHBlcm1pc3Npb24uXCIpLFxuICAgICAgICAgIGxpbmtTaGVldENoZWNrQnVzeTogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogXCJwYXRjaFwiLFxuICAgICAgcGF0Y2g6IHtcbiAgICAgICAgbGlua1NoZWV0Q2hlY2tCdXN5OiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwobGlua1NoZWV0SWQsIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcblxuICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogXCJyZXBsYWNlXCIsXG4gICAgICAgICAgICBuZXh0U3RhdGU6IHtcbiAgICAgICAgICAgICAgbGlua1NoZWV0TG9ja2VkOiB0cnVlLFxuICAgICAgICAgICAgICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZTpcbiAgICAgICAgICAgICAgICBzYWZlVGV4dChyZXNwb25zZS5NZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0IGRldGFpbC5cIiksXG4gICAgICAgICAgICAgIGxpbmtTaGVldENoZWNrQnVzeTogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xuICAgICAgICBjb25zdCBzZWxlY3RlZFNoZWV0ID1cbiAgICAgICAgICBoZWFkZXJzLmZpbmQoXG4gICAgICAgICAgICAoZW50cnkpID0+XG4gICAgICAgICAgICAgIHNhZmVUZXh0KChlbnRyeSBhcyB7IEhvamFHYXN0b3NJZD86IHVua25vd24gfSk/LkhvamFHYXN0b3NJZCkudG9VcHBlckNhc2UoKSA9PT0gbGlua1NoZWV0SWQudG9VcHBlckNhc2UoKVxuICAgICAgICAgICkgfHxcbiAgICAgICAgICBoZWFkZXJzWzBdIHx8XG4gICAgICAgICAgbnVsbDtcblxuICAgICAgICBpZiAoIXNlbGVjdGVkU2hlZXQpIHtcbiAgICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBcInJlcGxhY2VcIixcbiAgICAgICAgICAgIG5leHRTdGF0ZToge1xuICAgICAgICAgICAgICBsaW5rU2hlZXRMb2NrZWQ6IHRydWUsXG4gICAgICAgICAgICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgd2FzIG5vdCBmb3VuZC5cIiksXG4gICAgICAgICAgICAgIGxpbmtTaGVldENoZWNrQnVzeTogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1hcHBlZEhlYWRlciA9IG1hcEV4cGVuc2VTaGVldEhlYWRlcihzZWxlY3RlZFNoZWV0KTtcbiAgICAgICAgY29uc3Qgc3RhdHVzQ29kZSA9IHR5cGVvZiBtYXBwZWRIZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzID09PSBcIm51bWJlclwiID8gbWFwcGVkSGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA6IG51bGw7XG4gICAgICAgIGNvbnN0IGlzUGFpZCA9IHN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX1BBSUQgfHwgaGFzQXNzaWduZWRWb3VjaGVyKG1hcHBlZEhlYWRlci52b3VjaGVyKTtcbiAgICAgICAgY29uc3QgaXNNYW5hZ2luZ090aGVyVXNlciA9IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQoe1xuICAgICAgICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gICAgICAgICAgY3VycmVudEF4VXNlcklkLFxuICAgICAgICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgICAgICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgICAgICAgIHJlY29yZE93bmVyVXNlcklkOiBtYXBwZWRIZWFkZXIudXNlcklkLFxuICAgICAgICAgIGlzQ3JlYXRlTW9kZTogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBkZXRhaWxQb2xpY3kgPSByZXNvbHZlRXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5KHtcbiAgICAgICAgICBzdGF0dXNDb2RlLFxuICAgICAgICAgIGlzTWFuYWdpbmdPdGhlclVzZXIsXG4gICAgICAgICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcbiAgICAgICAgICBpc1BhaWQsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBpc0xvY2tlZCA9IGRldGFpbFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgIT09IFwiZnVsbF9lZGl0XCI7XG5cbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgIHR5cGU6IFwicmVwbGFjZVwiLFxuICAgICAgICAgIG5leHRTdGF0ZToge1xuICAgICAgICAgICAgbGlua1NoZWV0TG9ja2VkOiBpc0xvY2tlZCxcbiAgICAgICAgICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlOiBpc0xvY2tlZCA/IHJlc29sdmVCbG9ja2VkTWVzc2FnZShpc1BhaWQpIDogXCJcIixcbiAgICAgICAgICAgIGxpbmtTaGVldENoZWNrQnVzeTogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoY2FuY2VsbGVkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKGlzRXhwZW5zZUFib3J0TGlrZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IFwicGF0Y2hcIixcbiAgICAgICAgICAgIHBhdGNoOiB7XG4gICAgICAgICAgICAgIGxpbmtTaGVldENoZWNrQnVzeTogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICB0eXBlOiBcInJlcGxhY2VcIixcbiAgICAgICAgICBuZXh0U3RhdGU6IHtcbiAgICAgICAgICAgIGxpbmtTaGVldExvY2tlZDogdHJ1ZSxcbiAgICAgICAgICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlOlxuICAgICAgICAgICAgICBlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDNcbiAgICAgICAgICAgICAgICA/IGluZFQoXCJBdXRoX1Blcm1pc3Npb25EZW5pZWRfQm9keVwiLCBcIk5vIHBlcm1pc3Npb24uXCIpXG4gICAgICAgICAgICAgICAgOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yXG4gICAgICAgICAgICAgICAgICA/IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpLFxuICAgICAgICAgICAgbGlua1NoZWV0Q2hlY2tCdXN5OiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KSgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgfTtcbiAgfSwgW1xuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgaXNMaW5rTW9kZSxcbiAgICBsaW5rU2hlZXRJZCxcbiAgICByZXNvbHZlQmxvY2tlZE1lc3NhZ2UsXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICBdKTtcblxuICByZXR1cm4gc3RhdGU7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGlCQUFrRjs7O0FDQWxGLG1CQUFtQztBQXlEN0I7QUFyQ04sSUFBTSxnQ0FBZ0MsQ0FBQztBQUFBLEVBQ3JDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQTBDO0FBQ3hDLFFBQU0scUJBQXFCLGdCQUFnQixDQUFDO0FBRTVDLFFBQU0sdUJBQW1CLDBCQUFZLE1BQU07QUFDekMsaUJBQWE7QUFBQSxFQUNmLEdBQUcsQ0FBQyxZQUFZLENBQUM7QUFFakIsUUFBTSw0QkFBd0IsMEJBQVksTUFBTTtBQUM5QyxRQUFJLENBQUMsbUJBQW9CO0FBQ3pCLG1CQUFlO0FBQUEsRUFDakIsR0FBRyxDQUFDLG9CQUFvQixjQUFjLENBQUM7QUFFdkMsUUFBTSxrQ0FBa0MsYUFDcEMsbURBQ0EscUJBQ0UsbUdBQ0E7QUFFTixTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxXQUFXLGFBQWEsdURBQXVEO0FBQUEsTUFDL0UsdUJBQXFCLFVBQVU7QUFBQSxNQUMvQix3QkFBc0IsYUFBYSxTQUFTO0FBQUEsTUFDNUMsMEJBQXdCLHFCQUFxQixTQUFTO0FBQUEsTUFFdEQsdURBQUMsU0FBSSxXQUFVLFlBQ2I7QUFBQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0M7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBLFFBQVE7QUFBQSxZQUNSLGdCQUFlO0FBQUEsWUFDZixrQkFBa0I7QUFBQSxjQUNoQixjQUFjO0FBQUEsY0FDZCxlQUFlLENBQUMsVUFBVTtBQUN4QixzQkFBTSxlQUFlO0FBQUEsY0FDdkI7QUFBQSxZQUNGO0FBQUE7QUFBQSxRQUNGO0FBQUEsUUFFQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsY0FBWTtBQUFBLFlBQ1osZ0JBQWM7QUFBQSxZQUNkLE9BQU87QUFBQSxZQUNQLFVBQVUsQ0FBQztBQUFBLFlBQ1gsU0FBUztBQUFBLFlBQ1QsV0FBVTtBQUFBLFlBRVY7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxXQUFXLHNGQUFzRiwrQkFBK0I7QUFBQSxnQkFFaEksc0RBQUMscUJBQVUsV0FBVSxxQkFBb0IsYUFBYSxLQUFLLGVBQVksUUFBTztBQUFBO0FBQUEsWUFDaEY7QUFBQTtBQUFBLFFBQ0Y7QUFBQSxTQUNGO0FBQUE7QUFBQSxFQUNGO0FBRUo7QUFFQSxJQUFPLHdDQUFROzs7QUN6RVQsSUFBQUMsc0JBQUE7QUFMTixJQUFNLDZCQUE2QixDQUFDLEVBQUUsT0FBTyxPQUFPLGNBQWMsTUFBdUM7QUFDdkcsTUFBSSxNQUFNLFNBQVMsRUFBRyxRQUFPO0FBRTdCLFNBQ0UsOENBQUMsU0FBSSxXQUFXLDBCQUEwQixhQUFhLElBQ3JEO0FBQUEsaURBQUMsT0FBRSxXQUFVLHlCQUF5QixpQkFBTTtBQUFBLElBQzVDLDZDQUFDLFNBQUksV0FBVSxrQkFDWixnQkFBTSxJQUFJLENBQUMsU0FDVjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBRUMsV0FBVTtBQUFBLFFBRVY7QUFBQSx3REFBQyxPQUNDO0FBQUEsMERBQUMsVUFBSyxXQUFVLGlCQUFpQjtBQUFBLG1CQUFLLDRCQUE0QixRQUFRO0FBQUEsY0FBRTtBQUFBLGVBQUM7QUFBQSxZQUFRO0FBQUEsWUFDckYsNkNBQUMsVUFBTSxlQUFLLFlBQVksS0FBSTtBQUFBLGFBQzlCO0FBQUEsVUFDQSw4Q0FBQyxPQUFFLFdBQVUsUUFDWDtBQUFBLDBEQUFDLFVBQUssV0FBVSxpQkFBaUI7QUFBQSxtQkFBSyx3Q0FBd0MsUUFBUTtBQUFBLGNBQUU7QUFBQSxlQUFDO0FBQUEsWUFBUTtBQUFBLFlBQ2pHLDZDQUFDLFVBQU0sZUFBSyxVQUFVLEtBQUk7QUFBQSxhQUM1QjtBQUFBO0FBQUE7QUFBQSxNQVZLLEdBQUcsS0FBSyxZQUFZLFNBQVMsSUFBSSxLQUFLLFVBQVUsV0FBVztBQUFBLElBV2xFLENBQ0QsR0FDSDtBQUFBLEtBQ0Y7QUFFSjtBQUdBLElBQU0sK0JBQStCLENBQUMsRUFBRSxPQUFPLE1BQXlDO0FBQ3RGLE1BQUksQ0FBQyxPQUFRLFFBQU87QUFFcEIsUUFBTSxjQUFjO0FBQUEsSUFDbEI7QUFBQSxNQUNFLEtBQUs7QUFBQSxNQUNMLE9BQU8sS0FBSywyQ0FBMkMsYUFBYTtBQUFBLE1BQ3BFLE9BQU8sT0FBTztBQUFBLElBQ2hCO0FBQUEsSUFDQTtBQUFBLE1BQ0UsS0FBSztBQUFBLE1BQ0wsT0FBTyxLQUFLLHdDQUF3QyxZQUFZO0FBQUEsTUFDaEUsT0FBTyxPQUFPO0FBQUEsSUFDaEI7QUFBQSxJQUNBO0FBQUEsTUFDRSxLQUFLO0FBQUEsTUFDTCxPQUFPLEtBQUsseUNBQXlDLFVBQVU7QUFBQSxNQUMvRCxPQUFPLE9BQU87QUFBQSxJQUNoQjtBQUFBLElBQ0E7QUFBQSxNQUNFLEtBQUs7QUFBQSxNQUNMLE9BQU8sS0FBSyx3Q0FBd0MsVUFBVTtBQUFBLE1BQzlELE9BQU8sT0FBTztBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUVBLFNBQ0UsOENBQUMsU0FBSSxXQUFVLHlGQUNiO0FBQUEsa0RBQUMsU0FDQztBQUFBLG1EQUFDLE9BQUUsV0FBVSx3Q0FDVixlQUFLLHVDQUF1Qyw2QkFBMEIsR0FDekU7QUFBQSxNQUNDLE9BQU8saUJBQ04sOENBQUMsT0FBRSxXQUFVLCtCQUNWO0FBQUEsYUFBSyw4QkFBOEIsZUFBZTtBQUFBLFFBQUU7QUFBQSxRQUFHLE9BQU87QUFBQSxTQUNqRSxJQUNFO0FBQUEsT0FDTjtBQUFBLElBRUEsNkNBQUMsU0FBSSxXQUFVLHlDQUNaLHNCQUFZLElBQUksQ0FBQyxTQUNoQiw4Q0FBQyxTQUFtQixXQUFVLHlFQUM1QjtBQUFBLG1EQUFDLE9BQUUsV0FBVSx3RUFBd0UsZUFBSyxPQUFNO0FBQUEsTUFDaEcsNkNBQUMsT0FBRSxXQUFVLDJDQUEyQyxlQUFLLE9BQU07QUFBQSxTQUYzRCxLQUFLLEdBR2YsQ0FDRCxHQUNIO0FBQUEsSUFFQSw4Q0FBQyxTQUFJLFdBQVUseUNBQ2I7QUFBQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsT0FBTyxLQUFLLHlDQUF5QyxVQUFVO0FBQUEsVUFDL0QsT0FBTyxNQUFNLFFBQVEsT0FBTyxPQUFPLElBQUksT0FBTyxVQUFVLENBQUM7QUFBQSxVQUN6RCxlQUFjO0FBQUE7QUFBQSxNQUNoQjtBQUFBLE1BQ0E7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE9BQU8sS0FBSyx3Q0FBd0MsVUFBVTtBQUFBLFVBQzlELE9BQU8sTUFBTSxRQUFRLE9BQU8sTUFBTSxJQUFJLE9BQU8sU0FBUyxDQUFDO0FBQUEsVUFDdkQsZUFBYztBQUFBO0FBQUEsTUFDaEI7QUFBQSxPQUNGO0FBQUEsS0FDRjtBQUVKO0FBRUEsSUFBTyx1Q0FBUTs7O0FDM0dmLElBQUFDLGdCQUErQjs7O0FDQS9CLElBQUFDLGdCQUErQjtBQXFDM0IsSUFBQUMsc0JBQUE7QUFwQkosSUFBTSxtQ0FBbUMsQ0FBQztBQUFBLEVBQ3hDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQ2QsTUFBNkM7QUFDM0MsUUFBTSxVQUFVLFVBQVUsUUFBUSxLQUFLO0FBQ3ZDLFFBQU0sY0FBVTtBQUFBLElBQ2QsTUFBTTtBQUFBLE1BQ0osRUFBRSxPQUFPLE9BQU8sTUFBTSxLQUFLLHNCQUFzQixLQUFLLEVBQUU7QUFBQSxNQUN4RCxFQUFFLE9BQU8sT0FBTyxNQUFNLEtBQUssb0NBQW9DLEtBQUssRUFBRTtBQUFBLE1BQ3RFLEVBQUUsT0FBTyxNQUFNLE1BQU0sS0FBSyxtQ0FBbUMsSUFBSSxFQUFFO0FBQUEsSUFDckU7QUFBQSxJQUNBLENBQUM7QUFBQSxFQUNIO0FBRUEsU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0M7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsT0FBTztBQUFBLE1BQ1AsVUFBVSxDQUFDLGNBQWM7QUFDdkIsWUFBSSxjQUFjLFNBQVMsY0FBYyxRQUFRLGNBQWMsT0FBTztBQUNwRSxtQkFBUyxTQUFTO0FBQ2xCO0FBQUEsUUFDRjtBQUNBLGlCQUFTLEtBQUs7QUFBQSxNQUNoQjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxRQUFPO0FBQUEsTUFDUCxpQkFBZ0I7QUFBQSxNQUNoQixnQkFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEI7QUFBQTtBQUFBLEVBQ0Y7QUFFSjtBQUVBLElBQU8sMkNBQVE7OztBQzVEZixJQUFBQyxnQkFBbUM7QUFvSjdCLElBQUFDLHNCQUFBO0FBMUhOLElBQU0sbUJBQW1CO0FBR3pCLElBQU0sNEJBQTRCLENBQ2hDLE1BQ0EsTUFDQSxVQUNBLG1CQUNBLGlCQUNBLGtCQUNzRTtBQUN0RSxRQUFNLFdBQVcsT0FBTyxRQUFRLEVBQUUsRUFBRSxLQUFLO0FBQ3pDLFFBQU0sY0FBYztBQUFBLElBQ2xCLE1BQU0sT0FBTyxTQUFTLElBQUksS0FBSyxPQUFPLElBQUksS0FBSyxNQUFNLElBQUksSUFBSTtBQUFBLElBQzdELFVBQVUsT0FBTyxTQUFTLFFBQVEsS0FBSyxXQUFXLElBQUksS0FBSyxNQUFNLFFBQVEsSUFBSTtBQUFBLElBQzdFLGlCQUFpQixtQkFBbUI7QUFBQSxJQUNwQyxlQUFlLGlCQUFpQjtBQUFBLElBQ2hDLFdBQVcsWUFBWTtBQUFBLElBQ3ZCLFFBQVEsWUFBWTtBQUFBLEVBQ3RCO0FBRUEsTUFBSSxzQkFBc0IsS0FBSyxzQkFBc0IsR0FBRztBQUN0RCxXQUFPO0FBQUEsTUFDTCxHQUFHO0FBQUEsTUFDSCxRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7QUFFQSxJQUFNLG1CQUFtQixDQUN2QixVQUN5QjtBQUN6QixVQUFRLE1BQU0sUUFBUSxLQUFLLElBQUksUUFBUSxDQUFDLEdBQ3JDLElBQUksQ0FBQyxTQUFTO0FBQ2IsVUFBTSxTQUFTLE9BQU8sTUFBTSxVQUFVLEVBQUUsRUFBRSxLQUFLO0FBQy9DLFFBQUksQ0FBQyxPQUFRLFFBQU87QUFFcEIsVUFBTSxjQUFjLE9BQU8sTUFBTSxlQUFlLEVBQUUsRUFBRSxLQUFLO0FBQ3pELFVBQU0sV0FBVyxlQUFlO0FBQ2hDLFdBQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQyxFQUNBLE9BQU8sT0FBTztBQUNuQjtBQUdBLElBQU0sOEJBQThCLENBQUM7QUFBQSxFQUNuQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsT0FBTztBQUFBLEVBQ1Asa0JBQWtCO0FBQUEsRUFDbEIsZ0JBQWdCO0FBQUEsRUFDaEIsMEJBQTBCO0FBQUEsRUFDMUIsb0JBQW9CO0FBQUEsRUFDcEIsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUNkLE1BQXdDO0FBQ3RDLFFBQU0sZUFBZSxZQUFZO0FBRWpDLFFBQU0sa0JBQWMsMkJBQVksT0FBTyxNQUFjLFdBQXVEO0FBQzFHLFVBQU0sVUFBVSwwQkFBMEIsTUFBTSxHQUFHLGtCQUFrQixtQkFBbUIsaUJBQWlCLGFBQWE7QUFDdEgsVUFBTSxXQUNKLFNBQVMsU0FDTCxNQUFNLGdDQUFnQyxTQUE4QztBQUFBLE1BQ2xGLHlCQUF5QjtBQUFBLE1BQ3pCO0FBQUEsSUFDRixDQUFDLElBQ0QsTUFBTSw2QkFBNkIsU0FBMEM7QUFBQSxNQUMzRSx5QkFBeUI7QUFBQSxNQUN6QjtBQUFBLElBQ0YsQ0FBQztBQUVQLFFBQUksVUFBVSxZQUFZLE9BQU87QUFDL0IsYUFBTyxDQUFDO0FBQUEsSUFDVjtBQUVBLFdBQU8saUJBQWlCLFVBQVUsS0FBSztBQUFBLEVBQ3pDLEdBQUcsQ0FBQyxpQkFBaUIsZUFBZSxtQkFBbUIsSUFBSSxDQUFDO0FBRTVELFFBQU0sc0JBQWtCLDJCQUFZLE9BQU8sTUFBYyxNQUFjLFdBQW1CLFdBQXdCO0FBQ2hILFVBQU0sVUFBVTtBQUFBLE1BQ2Q7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFDQSxVQUFNLFdBQ0osU0FBUyxTQUNMLE1BQU0sZ0NBQWdDLFNBQThDO0FBQUEsTUFDbEYseUJBQXlCO0FBQUEsTUFDekI7QUFBQSxJQUNGLENBQUMsSUFDRCxNQUFNLDZCQUE2QixTQUEwQztBQUFBLE1BQzNFLHlCQUF5QjtBQUFBLE1BQ3pCO0FBQUEsSUFDRixDQUFDO0FBRVAsUUFBSSxVQUFVLFlBQVksT0FBTztBQUMvQixhQUFPO0FBQUEsUUFDTCxPQUFPLENBQUM7QUFBQSxRQUNSLE9BQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUVBLFdBQU87QUFBQSxNQUNMLE9BQU8saUJBQWlCLFVBQVUsS0FBSztBQUFBLE1BQ3ZDLE9BQU8sT0FBTyxVQUFVLFNBQVMsQ0FBQztBQUFBLElBQ3BDO0FBQUEsRUFDRixHQUFHLENBQUMsaUJBQWlCLGVBQWUsbUJBQW1CLElBQUksQ0FBQztBQUU1RCxNQUFJLENBQUMsMkJBQTJCLGNBQWM7QUFDNUMsV0FDRSw4Q0FBQyxTQUFJLFdBQVUsYUFDWjtBQUFBLGtCQUNDLDZDQUFDLFdBQU0sV0FBVSw0QkFBMkIsT0FBTyxFQUFFLE9BQU8sWUFBWSxHQUNyRSxpQkFDSCxJQUNFO0FBQUEsTUFDSjtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsV0FBVTtBQUFBLFVBQ1Y7QUFBQSxVQUNBLFVBQVUsQ0FBQyxVQUFVLFNBQVMsTUFBTSxPQUFPLEtBQUs7QUFBQSxVQUNoRDtBQUFBLFVBQ0EsY0FBWTtBQUFBLFVBQ1o7QUFBQSxVQUNBO0FBQUE7QUFBQSxNQUNGO0FBQUEsT0FDRjtBQUFBLEVBRUo7QUFFQSxTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsVUFBVSxPQUFPLE1BQU0sV0FBVztBQUNoQyxZQUFJO0FBQ0YsaUJBQU8sTUFBTSxZQUFZLE1BQU0sTUFBTTtBQUFBLFFBQ3ZDLFNBQVMsT0FBTztBQUNkLGNBQUksaUJBQWlCLGlCQUFpQixNQUFNLFdBQVcsS0FBSztBQUMxRCxtQkFBTyxDQUFDO0FBQUEsVUFDVjtBQUNBLGdCQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGNBQWMsT0FBTyxNQUFNLE1BQU0sVUFBVSxXQUFXO0FBQ3BELFlBQUk7QUFDRixpQkFBTyxNQUFNLGdCQUFnQixNQUFNLE1BQU0sVUFBVSxNQUFNO0FBQUEsUUFDM0QsU0FBUyxPQUFPO0FBQ2QsY0FBSSxpQkFBaUIsaUJBQWlCLE1BQU0sV0FBVyxLQUFLO0FBQzFELG1CQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsT0FBTyxFQUFFO0FBQUEsVUFDL0I7QUFDQSxnQkFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFPO0FBQUEsTUFDUCxpQkFBaUI7QUFBQSxNQUNqQixVQUFVO0FBQUEsTUFDVixrQkFBZ0I7QUFBQSxNQUNoQixZQUFVO0FBQUEsTUFDVixnQkFBYztBQUFBLE1BQ2Q7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsZ0JBQWU7QUFBQTtBQUFBLEVBQ2pCO0FBRUo7QUFFQSxJQUFPLHNDQUFROzs7QUYvRVAsSUFBQUMsc0JBQUE7QUEzR1IsSUFBTSxlQUFlLENBQUMsUUFBNkI7QUFDakQsTUFBSSxDQUFDLElBQUssUUFBTztBQUNqQixRQUFNLFFBQVEsT0FBTyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDN0MsTUFBSSxDQUFDLHNCQUFzQixLQUFLLEtBQUssRUFBRyxRQUFPO0FBQy9DLFFBQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxJQUFJLE1BQU0sTUFBTSxHQUFHLEVBQUUsSUFBSSxNQUFNO0FBQ3RELFNBQU8sSUFBSSxLQUFLLE1BQU0sUUFBUSxHQUFHLEdBQUc7QUFDdEM7QUFFQSxJQUFNLGFBQWEsQ0FBQyxLQUFhLFdBQTJCO0FBQzFELFFBQU0sT0FBTyxhQUFhLEdBQUc7QUFDN0IsTUFBSSxDQUFDLEtBQU0sUUFBTztBQUNsQixTQUFPLEtBQ0osbUJBQW1CLFFBQVE7QUFBQSxJQUMxQixLQUFLO0FBQUEsSUFDTCxPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsRUFDUixDQUFDLEVBQ0EsUUFBUSxPQUFPLEVBQUUsRUFDakIsWUFBWTtBQUNqQjtBQW9DQSxJQUFNLDZCQUE2QixDQUFDO0FBQUEsRUFDbEM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLHVCQUF1QjtBQUFBLEVBQ3ZCLG9CQUFvQjtBQUFBLEVBQ3BCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUF1QztBQUNyQyxRQUFNLG9CQUFnQix1QkFBUSxNQUFNLG9DQUFvQyxHQUFHLENBQUMsQ0FBQztBQUU3RSxRQUFNLHNCQUFrQix1QkFBK0IsTUFBTTtBQUMzRCxXQUFPO0FBQUEsTUFDTCxFQUFFLE9BQU8sSUFBSSxNQUFNLEtBQUssc0JBQXNCLEtBQUssRUFBRTtBQUFBLE1BQ3JELEdBQUc7QUFBQSxJQUNMO0FBQUEsRUFDRixHQUFHLENBQUMsZ0JBQWdCLENBQUM7QUFFckIsTUFBSSxDQUFDLFFBQVMsUUFBTztBQUNyQixRQUFNLFNBQVMsVUFBVSxpQkFBaUIsUUFBUTtBQUNsRCxRQUFNLHdCQUF3QixDQUFDLHdCQUF3QixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdkUsUUFBTSxtQkFBbUIsU0FBUztBQUNsQyxRQUFNLDBCQUEwQix3QkFDM0IsbUJBQW1CLG1CQUFtQixtQkFDdEMsbUJBQW1CLG1CQUFtQjtBQUUzQyxTQUNFLDZDQUFDLFNBQUksV0FBVSwyREFDYix3REFBQyxTQUFJLFdBQVUsZ0RBQ2I7QUFBQSxpREFBQyxtQ0FBd0IsbUJBQXNDLHFCQUEwQztBQUFBLElBRXhHLHVCQUNDO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBLFVBQVU7QUFBQSxRQUNWLGlCQUFpQjtBQUFBLFFBQ2pCLG1CQUFtQjtBQUFBLFFBQ25CLGlCQUFpQjtBQUFBLFFBQ2pCLGdCQUFnQix1QkFBdUIsQ0FBQztBQUFBLFFBQ3hDLGNBQWMsdUJBQXVCLENBQUM7QUFBQTtBQUFBLElBQ3hDLElBQ0Usd0JBQ0Y7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLGtCQUFrQixLQUFLLGdCQUFnQixNQUFNO0FBQUEsUUFDN0MsZ0JBQWdCLEtBQUssY0FBYyxJQUFJO0FBQUEsUUFDdkMsV0FBVyxXQUFXLFVBQVUsTUFBTTtBQUFBLFFBQ3RDLFNBQVMsV0FBVyxRQUFRLE1BQU07QUFBQSxRQUNsQyxXQUFVO0FBQUE7QUFBQSxJQUNaLElBQ0U7QUFBQSxJQUVKLDhDQUFDLFNBQUksV0FBVyxtQ0FBbUMsdUJBQXVCLFVBQ3hFO0FBQUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE9BQU8sS0FBSyw0QkFBNEIsUUFBUTtBQUFBLFVBQ2hELGFBQWEsS0FBSyw0QkFBNEIsUUFBUTtBQUFBLFVBQ3RELE9BQU87QUFBQSxVQUNQLFVBQVU7QUFBQSxVQUNWO0FBQUEsVUFDQSxpQkFBaUI7QUFBQSxVQUNqQixlQUFlO0FBQUEsVUFDZix5QkFBdUI7QUFBQSxVQUN2QixtQkFBbUIsU0FBUyxZQUFZLG9CQUFvQjtBQUFBLFVBQzVELFdBQVc7QUFBQTtBQUFBLE1BQ2I7QUFBQSxNQUVBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxPQUFPLEtBQUssaUNBQWlDLFVBQVU7QUFBQSxVQUN2RCxhQUFhLEtBQUssaUNBQWlDLFVBQVU7QUFBQSxVQUM3RCxPQUFPO0FBQUEsVUFDUCxVQUFVO0FBQUEsVUFDVixXQUFXO0FBQUEsVUFDWCxzQkFBc0I7QUFBQTtBQUFBLE1BQ3hCO0FBQUEsTUFFQyx3QkFDQztBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsT0FBTyxLQUFLLGVBQWUsTUFBTTtBQUFBLFVBQ2pDLGFBQWEsS0FBSyxlQUFlLE1BQU07QUFBQSxVQUN2QyxPQUFPO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxVQUFVO0FBQUEsVUFDVixXQUFXO0FBQUE7QUFBQSxNQUNiLElBQ0U7QUFBQSxNQUVILG1CQUNDO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxPQUFPLEtBQUsseUJBQXlCLFFBQVE7QUFBQSxVQUM3QyxhQUFhLEtBQUsseUJBQXlCLFFBQVE7QUFBQSxVQUNuRCxTQUFTO0FBQUEsVUFDVCxPQUFPO0FBQUEsVUFDUCxVQUFVLENBQUMsY0FBYyxxQkFBcUIsdUNBQXVDLFdBQVcsRUFBRSxDQUFDO0FBQUEsVUFDbkcsZ0JBQWdCO0FBQUEsVUFDaEIsVUFBVTtBQUFBLFVBQ1YsUUFBTztBQUFBLFVBQ1AsaUJBQWdCO0FBQUEsVUFDaEIsZ0JBQWU7QUFBQSxVQUNmLFdBQVc7QUFBQTtBQUFBLE1BQ2IsSUFDRTtBQUFBLE1BRUo7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE9BQU8sS0FBSywyQkFBMkIsVUFBVTtBQUFBLFVBQ2pELGFBQWEsS0FBSywyQkFBMkIsVUFBVTtBQUFBLFVBQ3ZELFNBQVM7QUFBQSxVQUNULE9BQU87QUFBQSxVQUNQLFVBQVUsQ0FBQyxjQUFjO0FBQ3ZCLGtCQUFNLFNBQVMsT0FBTyxTQUFTO0FBQy9CLGdCQUFJLGNBQWMsTUFBTSxDQUFDLE9BQU8sVUFBVSxNQUFNLEdBQUc7QUFDakQsc0NBQXdCLEVBQUU7QUFDMUI7QUFBQSxZQUNGO0FBQ0Esb0NBQXdCLE1BQThCO0FBQUEsVUFDeEQ7QUFBQSxVQUNBLGdCQUFnQjtBQUFBLFVBQ2hCLFFBQU87QUFBQSxVQUNQLGlCQUFnQjtBQUFBLFVBQ2hCLGdCQUFlO0FBQUEsVUFDZixXQUFXO0FBQUE7QUFBQSxNQUNiO0FBQUEsTUFFQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsT0FBTyxLQUFLLGdDQUFnQyxpQkFBaUI7QUFBQSxVQUM3RCxhQUFhLEtBQUssZ0NBQWdDLGlCQUFpQjtBQUFBLFVBQ25FLE9BQU87QUFBQSxVQUNQLFVBQVU7QUFBQSxVQUNWLFdBQVc7QUFBQTtBQUFBLE1BQ2I7QUFBQSxPQUNGO0FBQUEsSUFFQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsWUFBWSxLQUFLLHdCQUF3QixPQUFPO0FBQUEsUUFDaEQsWUFBWSxLQUFLLHdCQUF3QixPQUFPO0FBQUEsUUFDaEQ7QUFBQSxRQUNBO0FBQUE7QUFBQSxJQUNGO0FBQUEsS0FDRixHQUNGO0FBRUo7QUFFQSxJQUFPLHFDQUFROzs7QUdqUGYsSUFBQUMsZ0JBQTBEO0FBbUJuRCxJQUFNLGdDQUFnQyxDQUFDO0FBQUEsRUFDNUM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0Esb0JBQW9CO0FBQUEsRUFDcEIseUJBQXlCO0FBQzNCLE1BQXlDO0FBQ3ZDLFFBQU0sdUJBQXVCLHNCQUFzQixLQUFLLHNCQUFzQjtBQUU5RSxRQUFNLDBCQUFzQjtBQUFBLElBQzFCLENBQUMsVUFBd0U7QUFDdkUsVUFBSSxzQkFBc0I7QUFDeEIsZUFBTztBQUFBLE1BQ1Q7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsQ0FBQyxtQkFBbUIsb0JBQW9CO0FBQUEsRUFDMUM7QUFFQSxRQUFNLENBQUMsVUFBVSxXQUFXLFFBQUksd0JBQVMsRUFBRTtBQUMzQyxRQUFNLENBQUMsUUFBUSxTQUFTLFFBQUksd0JBQVMsRUFBRTtBQUN2QyxRQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksd0JBQVMsRUFBRTtBQUM3QyxRQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksd0JBQVMsRUFBRTtBQUNuRCxRQUFNLENBQUMsZUFBZSxnQkFBZ0IsUUFBSSx3QkFBUyxvQkFBb0I7QUFDdkUsUUFBTSxDQUFDLGlCQUFpQixrQkFBa0IsUUFBSSx3QkFBd0Msb0JBQW9CLEVBQUUsQ0FBQztBQUM3RyxRQUFNLENBQUMsaUJBQWlCLGtCQUFrQixRQUFJLHdCQUFvQyxFQUFFO0FBQ3BGLFFBQU0sQ0FBQyxxQkFBcUIsc0JBQXNCLFFBQUksd0JBQStCLEtBQUs7QUFDMUYsUUFBTSxDQUFDLG1CQUFtQixvQkFBb0IsUUFBSSx3QkFBNEMsSUFBSTtBQUNsRyxRQUFNLENBQUMsc0JBQXNCLHVCQUF1QixRQUFJLHdCQUFTLEtBQUs7QUFDdEUsUUFBTSxDQUFDLHFCQUFxQixzQkFBc0IsUUFBSSx3QkFBUyxLQUFLO0FBQ3BFLFFBQU0sQ0FBQyx1QkFBdUIsd0JBQXdCLFFBQUksd0JBQVMsQ0FBQztBQUNwRSxRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixRQUFJLHdCQUFvRCxJQUFJO0FBQ3BHLFFBQU0sQ0FBQyxhQUFhLGNBQWMsUUFBSSx3QkFBUyxJQUFJO0FBRW5ELCtCQUFVLE1BQU07QUFDZCxRQUFJLENBQUMscUJBQXNCO0FBQzNCLHVCQUFtQixpQkFBa0Q7QUFBQSxFQUN2RSxHQUFHLENBQUMsbUJBQW1CLG9CQUFvQixDQUFDO0FBRTVDLFFBQU0sZUFBZSxvQkFBb0IsZUFBZTtBQUV4RCxRQUFNLHFCQUFpQjtBQUFBLElBQ3JCLE9BQU87QUFBQSxNQUNMO0FBQUEsTUFDQTtBQUFBLE1BQ0EsV0FBVyxVQUFVLEtBQUs7QUFBQSxNQUMxQixjQUFjLGFBQWEsS0FBSztBQUFBLE1BQ2hDLGVBQWUsY0FBYyxLQUFLO0FBQUEsTUFDbEM7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUMsY0FBYyxXQUFXLFVBQVUsaUJBQWlCLGVBQWUscUJBQXFCLGNBQWMsTUFBTTtBQUFBLEVBQy9HO0FBRUEsUUFBTSxzQkFBa0I7QUFBQSxJQUN0QixDQUFDLFVBQXlDO0FBQ3hDLFVBQUksc0JBQXNCO0FBQ3hCLDJCQUFtQixpQkFBa0Q7QUFDckU7QUFBQSxNQUNGO0FBQ0EseUJBQW1CLEtBQUs7QUFBQSxJQUMxQjtBQUFBLElBQ0EsQ0FBQyxtQkFBbUIsb0JBQW9CO0FBQUEsRUFDMUM7QUFFQSxRQUFNLGNBQVUsMkJBQVksTUFBTTtBQUNoQyxRQUFJLENBQUMsMkJBQTJCLENBQUMsWUFBWSxDQUFDLFNBQVM7QUFDckQsNkJBQXVCLElBQUk7QUFDM0IsOEJBQXdCLElBQUk7QUFDNUIsMkJBQXFCLFFBQVE7QUFDN0I7QUFBQSxJQUNGO0FBRUEsVUFBTSxXQUErQztBQUFBLE1BQ25EO0FBQUEsTUFDQTtBQUFBLE1BQ0EsV0FBVyxVQUFVLEtBQUs7QUFBQSxNQUMxQixjQUFjLGFBQWEsS0FBSztBQUFBLE1BQ2hDLGVBQWUsY0FBYyxLQUFLO0FBQUEsTUFDbEM7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFFQSwyQkFBdUIsS0FBSztBQUM1QixzQkFBa0IsUUFBUTtBQUMxQiw0QkFBd0IsS0FBSztBQUM3QixtQkFBZSxLQUFLO0FBQ3BCLG1CQUFlLFFBQVE7QUFBQSxFQUN6QixHQUFHO0FBQUEsSUFDRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUdELFFBQU0sNEJBQXdCO0FBQUEsSUFDNUIsQ0FBQyxhQUFpRDtBQUNoRCxZQUFNLGFBQWEscUNBQXFDLFFBQVE7QUFDaEUsWUFBTSx5QkFBeUIsb0JBQW9CLFdBQVcsWUFBWTtBQUMxRSxZQUFNLHdCQUF3QixPQUFPLFdBQVcsaUJBQWlCLG9CQUFvQixFQUFFLEtBQUs7QUFDNUYsa0JBQVksV0FBVyxRQUFRO0FBQy9CLGdCQUFVLFdBQVcsTUFBTTtBQUMzQixtQkFBYSxXQUFXLFNBQVM7QUFDakMsc0JBQWdCLFdBQVcsWUFBWTtBQUN2Qyx1QkFBaUIscUJBQXFCO0FBQ3RDLHlCQUFtQixzQkFBc0I7QUFDekMseUJBQW1CLFdBQVcsZUFBZTtBQUM3Qyw2QkFBdUIsV0FBVyxtQkFBbUI7QUFDckQsMkJBQXFCLElBQUk7QUFDekIsOEJBQXdCLEtBQUs7QUFDN0IsNkJBQXVCLEtBQUs7QUFDNUIsd0JBQWtCO0FBQUEsUUFDaEIsR0FBRztBQUFBLFFBQ0gsZUFBZTtBQUFBLFFBQ2YsY0FBYztBQUFBLE1BQ2hCLENBQUM7QUFDRCxxQkFBZSxLQUFLO0FBQUEsSUFDdEI7QUFBQSxJQUNBLENBQUMsc0JBQXNCLG1CQUFtQjtBQUFBLEVBQzVDO0FBRUEsUUFBTSxjQUFVLDJCQUFZLE1BQU07QUFDaEMsZ0JBQVksRUFBRTtBQUNkLGNBQVUsRUFBRTtBQUNaLGlCQUFhLEVBQUU7QUFDZixvQkFBZ0IsRUFBRTtBQUNsQixxQkFBaUIsb0JBQW9CO0FBQ3JDLHVCQUFtQixvQkFBb0IsRUFBRSxDQUFDO0FBQzFDLHVCQUFtQixFQUFFO0FBQ3JCLDJCQUF1QixLQUFLO0FBQzVCLHlCQUFxQixJQUFJO0FBQ3pCLDRCQUF3QixLQUFLO0FBQzdCLDJCQUF1QixLQUFLO0FBQzVCLDZCQUF5QixDQUFDO0FBQzFCLHNCQUFrQixJQUFJO0FBQ3RCLG1CQUFlLElBQUk7QUFDbkIsbUJBQWU7QUFBQSxFQUNqQixHQUFHLENBQUMsc0JBQXNCLGdCQUFnQixtQkFBbUIsQ0FBQztBQUU5RCxRQUFNLHdCQUFvQjtBQUFBLElBQ3hCLENBQUMsY0FBc0IsZUFBdUI7QUFDNUMsWUFBTSxlQUFlLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3pDLGtCQUFZLFlBQVk7QUFDeEIsZ0JBQVUsVUFBVTtBQUNwQixVQUFJLENBQUMsY0FBYztBQUNqQixnQ0FBd0IsSUFBSTtBQUFBLE1BQzlCO0FBQ0EsMkJBQXFCLFFBQVE7QUFDN0IsVUFBSSxxQkFBcUI7QUFDdkIsK0JBQXVCLENBQUMsWUFBWTtBQUFBLE1BQ3RDO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQyxtQkFBbUI7QUFBQSxFQUN0QjtBQUVBLFFBQU0sNEJBQXdCLDJCQUFZLENBQUMsY0FBc0IsZUFBdUI7QUFDdEYsZ0JBQVksWUFBWTtBQUN4QixjQUFVLFVBQVU7QUFDcEIseUJBQXFCLFFBQVE7QUFDN0IsMkJBQXVCLEtBQUs7QUFDNUIsNEJBQXdCLEtBQUs7QUFBQSxFQUMvQixHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sMEJBQXNCO0FBQUEsSUFDMUIsQ0FBQyxhQUF5QztBQUN4QyxVQUFJLGFBQWEsVUFBVTtBQUN6QixZQUFJLHNCQUFzQjtBQUN4QixrQ0FBd0IsS0FBSztBQUM3QixpQ0FBdUIsS0FBSztBQUM1QjtBQUFBLFFBQ0Y7QUFFQSw2QkFBcUIsUUFBUTtBQUM3QixnQ0FBd0IsSUFBSTtBQUM1QiwrQkFBdUIsS0FBSztBQUM1QixpQ0FBeUIsQ0FBQyxhQUFhLFdBQVcsQ0FBQztBQUNuRDtBQUFBLE1BQ0Y7QUFFQSwyQkFBcUIsUUFBUTtBQUM3Qiw4QkFBd0IsS0FBSztBQUM3Qiw2QkFBdUIsS0FBSztBQUU1QixZQUFNLFFBQVEsV0FBVyxvQkFBSSxLQUFLLENBQUM7QUFDbkMsWUFBTSxXQUFXLElBQUksS0FBSyxLQUFLO0FBQy9CLFVBQUksYUFBYSxVQUFVO0FBQ3pCLGlCQUFTLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQztBQUFBLE1BQ3RDLFdBQVcsYUFBYSxXQUFXO0FBQ2pDLGlCQUFTLFFBQVEsTUFBTSxRQUFRLElBQUksRUFBRTtBQUFBLE1BQ3ZDLE9BQU87QUFDTCxpQkFBUyxRQUFRLE1BQU0sUUFBUSxJQUFJLEVBQUU7QUFBQSxNQUN2QztBQUVBLGtCQUFZLFVBQVUsUUFBUSxDQUFDO0FBQy9CLGdCQUFVLFVBQVUsS0FBSyxDQUFDO0FBQUEsSUFDNUI7QUFBQSxJQUNBLENBQUMsb0JBQW9CO0FBQUEsRUFDdkI7QUFFQSxRQUFNLHdCQUFvQiwyQkFBWSxNQUFNO0FBQzFDLG1CQUFlLENBQUMsYUFBYTtBQUMzQixZQUFNLE9BQU8sQ0FBQztBQUNkLFVBQUksQ0FBQyxNQUFNO0FBQ1QsZ0NBQXdCLEtBQUs7QUFBQSxNQUMvQjtBQUNBLGFBQU87QUFBQSxJQUNULENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxDQUFDO0FBRUwsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLG9CQUFvQjtBQUFBLEVBQ3RCO0FBQ0Y7OztBQzVRQSxJQUFBQyxnQkFBeUQ7QUF3QnpELElBQU0sMkJBQTJCLG9CQUFJLElBQVksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDaEYsSUFBTSxrQ0FBa0M7QUFFeEMsSUFBTSw0QkFBNEIsSUFBSSxTQUFvQjtBQUN4RCxNQUFJLE9BQU8sWUFBWSxlQUFlLE9BQU8sUUFBUSxTQUFTLFlBQVk7QUFDeEUsWUFBUSxLQUFLLGlDQUFpQyxHQUFHLElBQUk7QUFBQSxFQUN2RDtBQUNGO0FBRUEsSUFBTSw0QkFBNEIsSUFBSSxTQUFvQjtBQUN4RCxNQUFJLE9BQU8sWUFBWSxlQUFlLE9BQU8sUUFBUSxTQUFTLFlBQVk7QUFDeEUsWUFBUSxLQUFLLGlDQUFpQyxHQUFHLElBQUk7QUFBQSxFQUN2RDtBQUNGO0FBRUEsSUFBTSw2QkFBNkIsSUFBSSxTQUFvQjtBQUN6RCxNQUFJLE9BQU8sWUFBWSxlQUFlLE9BQU8sUUFBUSxVQUFVLFlBQVk7QUFDekUsWUFBUSxNQUFNLGlDQUFpQyxHQUFHLElBQUk7QUFBQSxFQUN4RDtBQUNGO0FBRUEsSUFBTSxnQ0FBZ0MsQ0FBQyxVQUEwQjtBQUMvRCxNQUFJLE9BQU8sVUFBVSxXQUFZLFFBQU87QUFDeEMsUUFBTSxXQUFXLElBQUksTUFBTSxLQUFLLEVBQUU7QUFDbEMsTUFBSSxPQUFPLGFBQWEsWUFBWSxDQUFDLFNBQVMsS0FBSyxFQUFHLFFBQU87QUFDN0QsU0FBTyxTQUNKLE1BQU0sSUFBSSxFQUNWLE1BQU0sR0FBRyxDQUFDLEVBQ1YsS0FBSyxJQUFJO0FBQ2Q7QUFFQSxJQUFNLG1CQUFtQixDQUFDLFVBQWtDO0FBQzFELFFBQU0sU0FBUyxPQUFPLEtBQUs7QUFDM0IsU0FBTyxPQUFPLFNBQVMsTUFBTSxJQUFJLFNBQVM7QUFDNUM7QUFFQSxJQUFNLGlCQUFpQixDQUFDLFVBQW1DO0FBQ3pELE1BQUksT0FBTyxVQUFVLFVBQVcsUUFBTztBQUN2QyxNQUFJLE9BQU8sVUFBVSxTQUFVLFFBQU8sVUFBVSxJQUFJLE9BQU8sVUFBVSxJQUFJLFFBQVE7QUFDakYsTUFBSSxPQUFPLFVBQVUsVUFBVTtBQUM3QixVQUFNLGFBQWEsTUFBTSxLQUFLLEVBQUUsWUFBWTtBQUM1QyxRQUFJLGVBQWUsVUFBVSxlQUFlLElBQUssUUFBTztBQUN4RCxRQUFJLGVBQWUsV0FBVyxlQUFlLElBQUssUUFBTztBQUFBLEVBQzNEO0FBQ0EsU0FBTztBQUNUO0FBRUEsSUFBTSx5QkFBeUIsQ0FBQyxVQUFpQztBQUMvRCxRQUFNLFNBQVMsT0FBTyxLQUFLO0FBQzNCLFNBQU8sV0FBVyxLQUFLLFdBQVcsSUFBSSxTQUFTO0FBQ2pEO0FBRUEsSUFBTSw0QkFBNEIsQ0FBQyxVQUFnRDtBQUNqRixRQUFNLFNBQVMsT0FBTyxLQUFLO0FBQzNCLE1BQUksQ0FBQyxPQUFPLFVBQVUsTUFBTSxLQUFLLENBQUMseUJBQXlCLElBQUksTUFBTSxHQUFHO0FBQ3RFLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FBTztBQUNUO0FBRUEsSUFBTSxzQkFBc0IsQ0FBQyxTQUFxRDtBQUNoRixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixRQUFRLE9BQU8sTUFBTSxVQUFVLEVBQUUsRUFBRSxLQUFLO0FBQUEsSUFDeEMsYUFBYSxPQUFPLE1BQU0sZUFBZSxFQUFFLEVBQUUsS0FBSztBQUFBLElBQ2xELFFBQVEsdUJBQXVCLE1BQU0sTUFBTTtBQUFBLElBQzNDLGVBQWUsZUFBZSxNQUFNLGFBQWE7QUFBQSxJQUNqRCxjQUFjLE9BQU8sTUFBTSxnQkFBZ0IsRUFBRSxFQUFFLEtBQUs7QUFBQSxJQUNwRCxhQUFhLGlCQUFpQixNQUFNLFdBQVc7QUFBQSxJQUMvQyxXQUFXLE9BQU8sTUFBTSxhQUFhLEVBQUUsRUFBRSxLQUFLO0FBQUEsSUFDOUMsVUFBVSxPQUFPLE1BQU0sWUFBWSxFQUFFLEVBQUUsS0FBSztBQUFBLElBQzVDLFdBQVcsMEJBQTBCLE1BQU0sYUFBYSxNQUFNLFNBQVM7QUFBQSxFQUN6RTtBQUNGO0FBRUEsSUFBTSwwQkFBMEIsQ0FBQyxTQUF5RDtBQUN4RixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixRQUFRLE9BQU8sTUFBTSxVQUFVLEVBQUUsRUFBRSxLQUFLO0FBQUEsSUFDeEMsYUFBYSxPQUFPLE1BQU0sZUFBZSxFQUFFLEVBQUUsS0FBSztBQUFBLElBQ2xELGVBQWUsZUFBZSxNQUFNLGFBQWE7QUFBQSxJQUNqRCxjQUFjLE9BQU8sTUFBTSxnQkFBZ0IsRUFBRSxFQUFFLEtBQUs7QUFBQSxJQUNwRCxhQUFhLGlCQUFpQixNQUFNLFdBQVc7QUFBQSxJQUMvQyxXQUFXLE9BQU8sTUFBTSxhQUFhLEVBQUUsRUFBRSxLQUFLO0FBQUEsSUFDOUMsVUFBVSxPQUFPLE1BQU0sWUFBWSxFQUFFLEVBQUUsS0FBSztBQUFBLElBQzVDLFdBQVcsMEJBQTBCLE1BQU0sYUFBYSxNQUFNLFNBQVM7QUFBQSxFQUN6RTtBQUNGO0FBR08sSUFBTSw0QkFBNEIsQ0FBQyxFQUFFLFdBQVcsVUFBVSxNQUFNLFlBQVksTUFBcUM7QUFDdEgsUUFBTSxDQUFDLE9BQU8sUUFBUSxRQUFJLHdCQUFzQyxDQUFDLENBQUM7QUFDbEUsUUFBTSxDQUFDLE9BQU8sUUFBUSxRQUFJLHdCQUFTLENBQUM7QUFDcEMsUUFBTSxDQUFDLGFBQWEsY0FBYyxRQUFJLHdCQUFTLENBQUM7QUFDaEQsUUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHdCQUFTLEtBQUs7QUFDaEQsUUFBTSxDQUFDLGNBQWMsZUFBZSxRQUFJLHdCQUFTLEVBQUU7QUFDbkQsUUFBTSxpQ0FBNkIsc0JBQStCLElBQUk7QUFDdEUsUUFBTSwwQkFBc0Isc0JBQU8sRUFBRTtBQUNyQyxRQUFNLDBCQUFzQixzQkFBTyxDQUFDO0FBRXBDLFFBQU0sMEJBQXNCO0FBQUEsSUFDMUIsQ0FBQyxhQUFrRjtBQUNqRixZQUFNLFlBQVksTUFBTSxRQUFRLFNBQVMsS0FBSyxJQUFJLFNBQVMsUUFBUSxDQUFDO0FBQ3BFLFlBQU0sZUFBZSxPQUFPLFNBQVMsS0FBSztBQUMxQyxZQUFNLFlBQVksT0FBTyxTQUFTLFlBQVksS0FBSyxnQkFBZ0IsSUFBSSxlQUFlLFVBQVU7QUFDaEcsWUFBTSxjQUFjLE9BQU8sU0FBUyxJQUFJO0FBQ3hDLFlBQU0sV0FBVyxPQUFPLFNBQVMsV0FBVyxLQUFLLGNBQWMsSUFBSSxLQUFLLE1BQU0sV0FBVyxJQUFJO0FBRTdGLGVBQVMsU0FBUztBQUNsQixlQUFTLFNBQVM7QUFDbEIscUJBQWUsUUFBUTtBQUN2QixzQkFBZ0IsRUFBRTtBQUNsQixtQkFBYSxLQUFLO0FBQUEsSUFDcEI7QUFBQSxJQUNBLENBQUM7QUFBQSxFQUNIO0FBRUEsUUFBTSxlQUFXO0FBQUEsSUFDZixPQUFPLE1BQWMsWUFBZ0Q7QUFDbkUsZ0NBQTBCLHNCQUFzQjtBQUFBLFFBQzlDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRixDQUFDO0FBQ0QsVUFBSSxDQUFDLFdBQVc7QUFDZCxrQ0FBMEIsOEJBQThCO0FBQUEsVUFDdEQ7QUFBQSxVQUNBO0FBQUEsUUFDRixDQUFDO0FBQ0Qsb0JBQVk7QUFDWjtBQUFBLE1BQ0Y7QUFFQSxZQUFNLFVBQ0osU0FBUyxTQUNMLGtDQUFrQyxTQUFTLE1BQU0sUUFBUSxJQUN6RCw4QkFBOEIsU0FBUyxNQUFNLFFBQVE7QUFDM0QsWUFBTSwwQkFBMEIsT0FBTyxTQUFTLGlCQUFpQixFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVk7QUFDeEYsWUFBTSxhQUFhLEtBQUssVUFBVSxFQUFFLE1BQU0sU0FBUyxlQUFlLHdCQUF3QixDQUFDO0FBRTNGLFVBQUksMkJBQTJCLFdBQVcsb0JBQW9CLFlBQVksWUFBWTtBQUNwRixrQ0FBMEIsbUNBQW1DO0FBQUEsVUFDM0Q7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0YsQ0FBQztBQUNEO0FBQUEsTUFDRjtBQUVBLFVBQUksMkJBQTJCLFNBQVM7QUFDdEMsa0NBQTBCLG1DQUFtQztBQUFBLFVBQzNELG9CQUFvQixvQkFBb0I7QUFBQSxVQUN4QyxvQkFBb0Isb0JBQW9CO0FBQUEsVUFDeEMsT0FBTyw4QkFBOEIsaUNBQWlDO0FBQUEsUUFDeEUsQ0FBQztBQUNELG1DQUEyQixRQUFRLE1BQU07QUFBQSxNQUMzQztBQUVBLFlBQU0sYUFBYSxJQUFJLGdCQUFnQjtBQUN2QyxpQ0FBMkIsVUFBVTtBQUNyQywwQkFBb0IsVUFBVTtBQUM5QixZQUFNLGFBQWEsb0JBQW9CLFVBQVU7QUFDakQsMEJBQW9CLFVBQVU7QUFDOUIsWUFBTSxvQkFBb0IsTUFBTTtBQUM5QixrQ0FBMEIsK0JBQStCO0FBQUEsVUFDdkQ7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBLGVBQWUsV0FBVyxPQUFPO0FBQUEsVUFDakMsY0FDRSxZQUFZLFdBQVcsU0FDakIsV0FBVyxPQUE4QyxVQUFVLE9BQ3JFO0FBQUEsUUFDUixDQUFDO0FBQUEsTUFDSDtBQUNBLGlCQUFXLE9BQU8saUJBQWlCLFNBQVMsbUJBQW1CLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFN0UsbUJBQWEsSUFBSTtBQUNqQixzQkFBZ0IsRUFBRTtBQUNsQixnQ0FBMEIsd0JBQXdCO0FBQUEsUUFDaEQ7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0YsQ0FBQztBQUVELFVBQUk7QUFDRixjQUFNLFdBQVcsTUFBTTtBQUFBLFVBQ3JCLE1BQ0UsU0FBUyxTQUNMLGdDQUFnQyxTQUFTO0FBQUEsWUFDdkMseUJBQXlCO0FBQUEsWUFDekIsUUFBUSxXQUFXO0FBQUEsWUFDbkIsa0JBQWtCLDJCQUEyQjtBQUFBLFVBQy9DLENBQUMsSUFDRCw2QkFBNkIsU0FBUztBQUFBLFlBQ3BDLHlCQUF5QjtBQUFBLFlBQ3pCLFFBQVEsV0FBVztBQUFBLFlBQ25CLGtCQUFrQiwyQkFBMkI7QUFBQSxVQUMvQyxDQUFDO0FBQUEsVUFDUDtBQUFBLFlBQ0UsUUFBUSxXQUFXO0FBQUEsVUFDckI7QUFBQSxRQUNGO0FBQ0Esa0NBQTBCLDJCQUEyQjtBQUFBLFVBQ25EO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBLFNBQVMsVUFBVTtBQUFBLFVBQ25CLE9BQU8sVUFBVTtBQUFBLFVBQ2pCLE9BQU8sTUFBTSxRQUFRLFVBQVUsS0FBSyxJQUFJLFNBQVMsTUFBTSxTQUFTO0FBQUEsUUFDbEUsQ0FBQztBQUNELFlBQUksZUFBZSxvQkFBb0IsUUFBUztBQUVoRCxZQUFJLFVBQVUsWUFBWSxPQUFPO0FBQy9CLG9DQUEwQiw2QkFBNkI7QUFBQSxZQUNyRDtBQUFBLFlBQ0E7QUFBQSxZQUNBLFNBQVMsU0FBUztBQUFBLFVBQ3BCLENBQUM7QUFDRCwwQkFBZ0IsU0FBUyxXQUFXLEtBQUsscUJBQXFCLHlCQUF5QixDQUFDO0FBQ3hGLG1CQUFTLENBQUMsQ0FBQztBQUNYLG1CQUFTLENBQUM7QUFDVix5QkFBZSxJQUFJO0FBQ25CO0FBQUEsUUFDRjtBQUVBLGNBQU0sY0FBYyxNQUFNLFFBQVEsVUFBVSxLQUFLLElBQUksU0FBUyxRQUFRLENBQUM7QUFDdkUsY0FBTSxjQUFjLFlBQVk7QUFBQSxVQUFJLENBQUMsU0FDbkMsU0FBUyxTQUNMLHdCQUF3QixJQUEwQyxJQUNsRSxvQkFBb0IsSUFBMEM7QUFBQSxRQUNwRTtBQUNBLGNBQU0sZ0JBQWdCLE9BQU8sVUFBVSxTQUFTLFlBQVksVUFBVSxDQUFDO0FBRXZFLGlCQUFTLFdBQVc7QUFDcEIsaUJBQVMsYUFBYTtBQUN0Qix1QkFBZSxJQUFJO0FBQUEsTUFDckIsU0FBUyxPQUFPO0FBQ2QsWUFBSSxlQUFlLG9CQUFvQixRQUFTO0FBQ2hELFlBQUksd0JBQXdCLE9BQU8sV0FBVyxNQUFNLEdBQUc7QUFDckQsb0NBQTBCLG9CQUFvQjtBQUFBLFlBQzVDO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBLFNBQVMsaUJBQWlCLFFBQVEsTUFBTSxVQUFVO0FBQUEsVUFDcEQsQ0FBQztBQUNEO0FBQUEsUUFDRjtBQUVBLFlBQUksaUJBQWlCLGlCQUFpQixNQUFNLFdBQVcsS0FBSztBQUMxRCxvQ0FBMEIsc0JBQXNCO0FBQUEsWUFDOUM7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0YsQ0FBQztBQUNELHNCQUFZO0FBQ1o7QUFBQSxRQUNGO0FBRUEsbUNBQTJCLG1CQUFtQjtBQUFBLFVBQzVDO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBLFNBQVMsaUJBQWlCLFFBQVEsTUFBTSxVQUFVO0FBQUEsUUFDcEQsQ0FBQztBQUNELGNBQU0sVUFBVSxpQkFBaUIsUUFBUSxNQUFNLFVBQVUsS0FBSyxxQkFBcUIseUJBQXlCO0FBQzVHLHdCQUFnQixPQUFPO0FBQ3ZCLGlCQUFTLENBQUMsQ0FBQztBQUNYLGlCQUFTLENBQUM7QUFDVix1QkFBZSxJQUFJO0FBQUEsTUFDckIsVUFBRTtBQUNBLG1CQUFXLE9BQU8sb0JBQW9CLFNBQVMsaUJBQWlCO0FBQ2hFLFlBQUksZUFBZSxvQkFBb0IsU0FBUztBQUM5QyxvQ0FBMEIscUJBQXFCO0FBQUEsWUFDN0M7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0YsQ0FBQztBQUNELHVCQUFhLEtBQUs7QUFDbEIscUNBQTJCLFVBQVU7QUFDckMsOEJBQW9CLFVBQVU7QUFBQSxRQUNoQztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxDQUFDLFdBQVcsTUFBTSxhQUFhLFFBQVE7QUFBQSxFQUN6QztBQUVBLFFBQU0sZ0JBQVksMkJBQVksQ0FBQyxTQUFTLGNBQWM7QUFDcEQsUUFBSSwyQkFBMkIsU0FBUztBQUN0QyxnQ0FBMEIsa0NBQWtDO0FBQUEsUUFDMUQ7QUFBQSxRQUNBLGtCQUFrQixvQkFBb0I7QUFBQSxRQUN0QyxrQkFBa0Isb0JBQW9CO0FBQUEsUUFDdEMsT0FBTyw4QkFBOEIsYUFBYSxNQUFNLEVBQUU7QUFBQSxNQUM1RCxDQUFDO0FBQ0QsaUNBQTJCLFFBQVEsTUFBTTtBQUN6QyxpQ0FBMkIsVUFBVTtBQUNyQywwQkFBb0IsVUFBVTtBQUFBLElBQ2hDO0FBQ0EsOEJBQTBCLHlCQUF5QjtBQUFBLE1BQ2pEO0FBQUEsSUFDRixDQUFDO0FBQ0QsYUFBUyxDQUFDLENBQUM7QUFDWCxhQUFTLENBQUM7QUFDVixtQkFBZSxDQUFDO0FBQ2hCLG9CQUFnQixFQUFFO0FBQUEsRUFDcEIsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLHFCQUFpQiwyQkFBWSxNQUFNO0FBQUEsRUFFekMsR0FBRyxDQUFDLENBQUM7QUFFTCwrQkFBVSxNQUFNO0FBQ2QsV0FBTyxNQUFNO0FBQ1gsVUFBSSwyQkFBMkIsU0FBUztBQUN0QyxrQ0FBMEIsZ0NBQWdDO0FBQUEsVUFDeEQsa0JBQWtCLG9CQUFvQjtBQUFBLFVBQ3RDLGtCQUFrQixvQkFBb0I7QUFBQSxVQUN0QyxPQUFPLDhCQUE4Qiw4QkFBOEI7QUFBQSxRQUNyRSxDQUFDO0FBQ0QsbUNBQTJCLFFBQVEsTUFBTTtBQUN6QyxtQ0FBMkIsVUFBVTtBQUNyQyw0QkFBb0IsVUFBVTtBQUFBLE1BQ2hDO0FBQUEsSUFDRjtBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFFTCxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGOzs7QUN2V0EsSUFBTSw4Q0FBOEM7QUFDcEQsSUFBTSwwQ0FBMEMsS0FBSyxLQUFLLEtBQUs7QUFDL0QsSUFBTSw2QkFBNkIsb0JBQUksSUFBWSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQWVsRixJQUFNLGVBQWUsTUFBYztBQUNqQyxTQUFPLEdBQUcsMkNBQTJDLElBQUkscUJBQXFCLENBQUM7QUFDakY7QUFFQSxJQUFNLGtCQUFrQixDQUFDLFVBQTJCO0FBQ2xELFNBQU8sT0FBTyxTQUFTLEVBQUUsRUFBRSxLQUFLO0FBQ2xDO0FBRUEsSUFBTSx5QkFBeUIsQ0FBQyxVQUFtQztBQUNqRSxNQUFJLFVBQVUsUUFBUSxVQUFVLE1BQU8sUUFBTztBQUM5QyxNQUFJLFVBQVUsS0FBSyxVQUFVLE9BQU8sVUFBVSxPQUFRLFFBQU87QUFDN0QsTUFBSSxVQUFVLEtBQUssVUFBVSxPQUFPLFVBQVUsUUFBUyxRQUFPO0FBQzlELFNBQU87QUFDVDtBQUVBLElBQU0sMEJBQTBCLENBQUMsVUFBa0M7QUFDakUsUUFBTSxTQUFTLE9BQU8sS0FBSztBQUMzQixTQUFPLE9BQU8sU0FBUyxNQUFNLElBQUksU0FBUztBQUM1QztBQUVBLElBQU0sMkJBQTJCLENBQUMsVUFBdUQ7QUFDdkYsUUFBTSxTQUFTLE9BQU8sS0FBSztBQUMzQixNQUFJLENBQUMsT0FBTyxVQUFVLE1BQU0sS0FBSyxDQUFDLDJCQUEyQixJQUFJLE1BQU0sR0FBRztBQUN4RSxXQUFPO0FBQUEsRUFDVDtBQUNBLFNBQU87QUFDVDtBQUVBLElBQU0seUJBQXlCLENBQUMsVUFBbUQ7QUFDakYsU0FBTyxVQUFVLGFBQWEsYUFBYTtBQUM3QztBQUVBLElBQU0sMkJBQTJCLENBQUMsVUFBNEM7QUFDNUUsTUFBSSxDQUFDLE1BQU0sUUFBUSxLQUFLLEVBQUcsUUFBTyxDQUFDO0FBRW5DLFFBQU0sUUFBUSxvQkFBSSxJQUFtQztBQUNyRCxhQUFXLFNBQVMsT0FBTztBQUN6QixVQUFNLE9BQVEsU0FBUyxDQUFDO0FBQ3hCLFVBQU0sU0FBUyxnQkFBZ0IsS0FBSyxNQUFNO0FBQzFDLFFBQUksQ0FBQyxPQUFRO0FBRWIsVUFBTSxJQUFJLFFBQVE7QUFBQSxNQUNoQixNQUFNO0FBQUEsTUFDTjtBQUFBLE1BQ0EsYUFBYSxPQUFPLEtBQUssZUFBZSxFQUFFLEVBQUUsS0FBSztBQUFBLE1BQ2pELGVBQWUsdUJBQXVCLEtBQUssYUFBYTtBQUFBLE1BQ3hELGNBQWMsT0FBTyxLQUFLLGdCQUFnQixFQUFFLEVBQUUsS0FBSztBQUFBLE1BQ25ELGFBQWEsd0JBQXdCLEtBQUssV0FBVztBQUFBLE1BQ3JELFdBQVcsT0FBTyxLQUFLLGFBQWEsRUFBRSxFQUFFLEtBQUs7QUFBQSxNQUM3QyxVQUFVLE9BQU8sS0FBSyxZQUFZLEVBQUUsRUFBRSxLQUFLO0FBQUEsTUFDM0MsV0FBVyx5QkFBeUIsS0FBSyxTQUFTO0FBQUEsSUFDcEQsQ0FBQztBQUFBLEVBQ0g7QUFFQSxTQUFPLE1BQU0sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUNsQztBQUVBLElBQU0sdUJBQXVCLENBQUMsVUFBNkI7QUFDekQsTUFBSSxDQUFDLE1BQU0sUUFBUSxLQUFLLEVBQUcsUUFBTyxDQUFDO0FBRW5DLFFBQU0sTUFBTSxvQkFBSSxJQUFZO0FBQzVCLGFBQVcsU0FBUyxPQUFPO0FBQ3pCLFVBQU0sU0FBUyxnQkFBZ0IsS0FBSztBQUNwQyxRQUFJLENBQUMsT0FBUTtBQUNiLFFBQUksSUFBSSxNQUFNO0FBQUEsRUFDaEI7QUFFQSxTQUFPLE1BQU0sS0FBSyxHQUFHO0FBQ3ZCO0FBRUEsSUFBTSw4QkFBOEIsQ0FBQyxPQUFnQixXQUFXLE1BQWM7QUFDNUUsUUFBTSxTQUFTLE9BQU8sS0FBSztBQUMzQixTQUFPLE9BQU8sU0FBUyxNQUFNLEtBQUssVUFBVSxJQUFJLEtBQUssTUFBTSxNQUFNLElBQUk7QUFDdkU7QUFHTyxJQUFNLHdDQUF3QyxDQUFDLFVBQXdEO0FBQzVHLE1BQUksQ0FBQyxTQUFTLE9BQU8sVUFBVSxTQUFVLFFBQU87QUFFaEQsUUFBTSxVQUFVO0FBQ2hCLFFBQU0sVUFBVSxPQUFPLFFBQVEsV0FBVyxFQUFFLEVBQUUsS0FBSztBQUNuRCxNQUFJLENBQUMsUUFBUyxRQUFPO0FBRXJCLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQSxNQUFNLEtBQUssSUFBSSxHQUFHLDRCQUE0QixRQUFRLE1BQU0sQ0FBQyxDQUFDO0FBQUEsSUFDOUQsU0FBUyw0QkFBNEIsUUFBUSxPQUFPO0FBQUEsSUFDcEQsYUFBYSxnQkFBZ0IsUUFBUSxXQUFXO0FBQUEsSUFDaEQsU0FBUyxxQ0FBcUMsUUFBUSxPQUFPO0FBQUEsSUFDN0QsZUFBZSx1QkFBdUIsUUFBUSxhQUFhO0FBQUEsSUFDM0QsaUJBQWlCLHlCQUF5QixRQUFRLGVBQWU7QUFBQSxJQUNqRSxhQUFhLHFCQUFxQixRQUFRLFdBQVc7QUFBQSxJQUNyRCwwQkFBMEIsUUFBUSwyQkFDOUIscUNBQXFDLFFBQVEsd0JBQXdCLElBQ3JFO0FBQUEsSUFDSix3QkFBd0IsNEJBQTRCLFFBQVEsc0JBQXNCO0FBQUEsRUFDcEY7QUFDRjtBQUdPLElBQU0sbUNBQW1DLENBQUMsWUFBMkQ7QUFDMUcsUUFBTSxTQUFTO0FBQUEsSUFDYix5QkFBdUQsYUFBYSxDQUFDO0FBQUEsRUFDdkU7QUFDQSxNQUFJLENBQUMsT0FBUSxRQUFPO0FBRXBCLFFBQU0sY0FBYyxPQUFPLFdBQVcsRUFBRSxFQUFFLEtBQUs7QUFDL0MsTUFBSSxDQUFDLFlBQWEsUUFBTztBQUN6QixTQUFPLE9BQU8sUUFBUSxZQUFZLE1BQU0sWUFBWSxZQUFZLElBQUksU0FBUztBQUMvRTtBQUdPLElBQU0sbUNBQW1DLENBQzlDLFVBQ3dDO0FBQ3hDLFFBQU0sYUFBYSxzQ0FBc0MsS0FBSztBQUM5RCxNQUFJLENBQUMsWUFBWTtBQUNmLHNDQUFrQztBQUNsQyxXQUFPO0FBQUEsRUFDVDtBQUVBLDJCQUF5QixhQUFhLEdBQUcsWUFBWSx1Q0FBdUM7QUFDNUYsU0FBTztBQUNUO0FBR08sSUFBTSxvQ0FBb0MsTUFBWTtBQUMzRCwrQkFBNkIsYUFBYSxDQUFDO0FBQzdDOzs7QUMxSkEsSUFBQUMsZ0JBQStDO0FBZS9DLElBQU1DLG1CQUFrQixDQUFDLFVBQTJCLE9BQU8sU0FBUyxFQUFFLEVBQUUsS0FBSztBQUU3RSxJQUFNQywwQkFBeUIsQ0FBQyxVQUFtRDtBQUNqRixTQUFPLFVBQVUsYUFBYSxhQUFhO0FBQzdDO0FBRUEsSUFBTUMsd0JBQXVCLENBQUMsVUFBNkI7QUFDekQsTUFBSSxDQUFDLE1BQU0sUUFBUSxLQUFLLEVBQUcsUUFBTyxDQUFDO0FBRW5DLFFBQU0sTUFBTSxvQkFBSSxJQUFZO0FBQzVCLGFBQVcsU0FBUyxPQUFPO0FBQ3pCLFVBQU0sU0FBU0YsaUJBQWdCLEtBQUs7QUFDcEMsUUFBSSxDQUFDLE9BQVE7QUFDYixRQUFJLElBQUksTUFBTTtBQUFBLEVBQ2hCO0FBRUEsU0FBTyxNQUFNLEtBQUssR0FBRztBQUN2QjtBQUVBLElBQU0sZ0JBQWdCLENBQUMsVUFBMEU7QUFDL0YsUUFBTSxPQUE4QyxDQUFDO0FBQ3JELGFBQVcsUUFBUSxPQUFPO0FBQ3hCLFVBQU0sU0FBU0EsaUJBQWdCLEtBQUssTUFBTTtBQUMxQyxRQUFJLENBQUMsT0FBUTtBQUNiLFNBQUssTUFBTSxJQUFJO0FBQUEsRUFDakI7QUFDQSxTQUFPO0FBQ1Q7QUFHTyxJQUFNLGdDQUFnQyxNQUFNO0FBQ2pELFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixRQUFJLHdCQUF5QyxVQUFVO0FBQzdGLFFBQU0sQ0FBQyxxQkFBcUIsc0JBQXNCLFFBQUksd0JBQWdELENBQUMsQ0FBQztBQUN4RyxRQUFNLENBQUMsYUFBYSxjQUFjLFFBQUksd0JBQW1CLENBQUMsQ0FBQztBQUMzRCxRQUFNLENBQUMsa0JBQWtCLG1CQUFtQixRQUFJLHdCQUFvRCxJQUFJO0FBQ3hHLFFBQU0sQ0FBQyxvQkFBb0IscUJBQXFCLFFBQUksd0JBQVMsQ0FBQztBQUU5RCxRQUFNLHNCQUFrQix1QkFBUSxNQUFNLE9BQU8sT0FBTyxtQkFBbUIsR0FBRyxDQUFDLG1CQUFtQixDQUFDO0FBQy9GLFFBQU0sb0JBQWdCLHVCQUFRLE1BQU0sSUFBSSxJQUFJLFdBQVcsR0FBRyxDQUFDLFdBQVcsQ0FBQztBQUN2RSxRQUFNLDRCQUE0QixrQkFBa0IsY0FBYyxDQUFDLENBQUM7QUFFcEUsUUFBTSxxQkFBaUIsMkJBQVksTUFBTTtBQUN2QyxxQkFBaUIsVUFBVTtBQUMzQiwyQkFBdUIsQ0FBQyxDQUFDO0FBQ3pCLG1CQUFlLENBQUMsQ0FBQztBQUNqQix3QkFBb0IsSUFBSTtBQUN4QiwwQkFBc0IsQ0FBQztBQUFBLEVBQ3pCLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSx1QkFBbUIsMkJBQVksQ0FBQyxVQUE4RDtBQUNsRyxRQUFJLENBQUMsT0FBTztBQUNWLHFCQUFlO0FBQ2Y7QUFBQSxJQUNGO0FBRUEsVUFBTSxpQkFBaUJDLHdCQUF1QixNQUFNLGFBQWE7QUFDakUsVUFBTSw0QkFBNEIsTUFBTSxRQUFRLE1BQU0sZUFBZSxJQUFJLE1BQU0sa0JBQWtCLENBQUM7QUFDbEcsVUFBTSxxQkFBcUIsTUFBTSxvQkFBb0I7QUFDckQsVUFBTSx3QkFBd0JDLHNCQUFxQixNQUFNLFdBQVc7QUFDcEUsVUFBTSwwQkFBMEIsT0FBTyxTQUFTLE9BQU8sTUFBTSxrQkFBa0IsQ0FBQyxJQUM1RSxLQUFLLElBQUksR0FBRyxLQUFLLE1BQU0sT0FBTyxNQUFNLGtCQUFrQixDQUFDLENBQUMsSUFDeEQ7QUFFSixxQkFBaUIsbUJBQW1CLGNBQWMscUJBQXFCLGFBQWEsVUFBVTtBQUM5RiwyQkFBdUIsY0FBYyx5QkFBeUIsQ0FBQztBQUMvRCxtQkFBZSxtQkFBbUIsYUFBYSx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3pFLHdCQUFvQixtQkFBbUIsYUFBYSxxQkFBcUIsSUFBSTtBQUM3RSwwQkFBc0IsbUJBQW1CLGFBQWEsMEJBQTBCLENBQUM7QUFBQSxFQUNuRixHQUFHLENBQUMsY0FBYyxDQUFDO0FBRW5CLFFBQU0seUJBQXFCLDJCQUFZLENBQUMsVUFBOEMsZUFBdUI7QUFDM0cscUJBQWlCLFVBQVU7QUFDM0IsMkJBQXVCLENBQUMsQ0FBQztBQUN6QixtQkFBZSxDQUFDLENBQUM7QUFDakIsd0JBQW9CLFFBQVE7QUFDNUIsMEJBQXNCLE9BQU8sU0FBUyxVQUFVLElBQUksS0FBSyxJQUFJLEdBQUcsS0FBSyxNQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUM7QUFBQSxFQUM3RixHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0saUJBQWE7QUFBQSxJQUNqQixDQUFDLFdBQW1CO0FBQ2xCLFlBQU0sYUFBYUYsaUJBQWdCLE1BQU07QUFDekMsVUFBSSxDQUFDLFdBQVksUUFBTztBQUV4QixVQUFJLDJCQUEyQjtBQUM3QixlQUFPLENBQUMsY0FBYyxJQUFJLFVBQVU7QUFBQSxNQUN0QztBQUVBLGFBQU8sQ0FBQyxDQUFDLG9CQUFvQixVQUFVO0FBQUEsSUFDekM7QUFBQSxJQUNBLENBQUMsZUFBZSwyQkFBMkIsbUJBQW1CO0FBQUEsRUFDaEU7QUFFQSxRQUFNLG1CQUFlO0FBQUEsSUFDbkIsQ0FBQyxXQUFrQztBQUNqQyxZQUFNLFNBQVNBLGlCQUFnQixPQUFPLE1BQU07QUFDNUMsVUFBSSxDQUFDLE9BQVE7QUFFYixVQUFJLDJCQUEyQjtBQUM3Qix1QkFBZSxDQUFDLGFBQWE7QUFDM0IsZ0JBQU0sT0FBTyxJQUFJLElBQUksUUFBUTtBQUM3QixjQUFJLEtBQUssSUFBSSxNQUFNLEdBQUc7QUFDcEIsaUJBQUssT0FBTyxNQUFNO0FBQUEsVUFDcEIsT0FBTztBQUNMLGlCQUFLLElBQUksTUFBTTtBQUFBLFVBQ2pCO0FBQ0EsaUJBQU8sTUFBTSxLQUFLLElBQUk7QUFBQSxRQUN4QixDQUFDO0FBQ0Q7QUFBQSxNQUNGO0FBRUEsNkJBQXVCLENBQUMsYUFBYTtBQUNuQyxjQUFNLE9BQU8sRUFBRSxHQUFHLFNBQVM7QUFDM0IsWUFBSSxLQUFLLE1BQU0sR0FBRztBQUNoQixpQkFBTyxLQUFLLE1BQU07QUFDbEIsaUJBQU87QUFBQSxRQUNUO0FBQ0EsYUFBSyxNQUFNLElBQUk7QUFDZixlQUFPO0FBQUEsTUFDVCxDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsQ0FBQyx5QkFBeUI7QUFBQSxFQUM1QjtBQUVBLFFBQU0sNEJBQXdCLDJCQUFZLENBQUMsVUFBbUM7QUFDNUUsUUFBSSxrQkFBa0IsY0FBYyxNQUFNLFNBQVMsRUFBRztBQUV0RCwyQkFBdUIsQ0FBQyxhQUFhO0FBQ25DLFVBQUksVUFBVTtBQUNkLFlBQU0sT0FBTyxFQUFFLEdBQUcsU0FBUztBQUMzQixpQkFBVyxRQUFRLE9BQU87QUFDeEIsY0FBTSxTQUFTQSxpQkFBZ0IsS0FBSyxNQUFNO0FBQzFDLFlBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxNQUFNLEVBQUc7QUFDOUIsYUFBSyxNQUFNLElBQUk7QUFDZixrQkFBVTtBQUFBLE1BQ1o7QUFDQSxhQUFPLFVBQVUsT0FBTztBQUFBLElBQzFCLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxhQUFhLENBQUM7QUFFbEIsUUFBTSwyQkFBdUI7QUFBQSxJQUMzQixDQUFDLHFCQUFxQixNQUFjO0FBQ2xDLFVBQUksQ0FBQywyQkFBMkI7QUFDOUIsZUFBTyxnQkFBZ0I7QUFBQSxNQUN6QjtBQUVBLFlBQU0sWUFBWSxxQkFBcUIsSUFBSSxxQkFBcUIsS0FBSyxJQUFJLEdBQUcsS0FBSyxNQUFNLGtCQUFrQixDQUFDO0FBQzFHLGFBQU8sS0FBSyxJQUFJLEdBQUcsWUFBWSxZQUFZLE1BQU07QUFBQSxJQUNuRDtBQUFBLElBQ0EsQ0FBQyxZQUFZLFFBQVEsb0JBQW9CLDJCQUEyQixnQkFBZ0IsTUFBTTtBQUFBLEVBQzVGO0FBRUEsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBQ3JMQSxJQUFBRyxnQkFBbUQ7QUF1Qm5ELElBQU0sdUJBQXVCLENBQzNCLE9BQ0EsV0FDNkM7QUFDN0MsVUFBUSxPQUFPLE1BQU07QUFBQSxJQUNuQixLQUFLO0FBQ0gsYUFBTyxPQUFPO0FBQUEsSUFDaEIsS0FBSztBQUNILGFBQU87QUFBQSxJQUNULEtBQUs7QUFDSCxhQUFPLFFBQVEsRUFBRSxHQUFHLE9BQU8sMkJBQTJCLE1BQU0sSUFBSTtBQUFBLElBQ2xFO0FBQ0UsYUFBTztBQUFBLEVBQ1g7QUFDRjtBQVlBLElBQU0sdUNBQXVDO0FBRTdDLElBQU0sZ0NBQWdDLElBQUksU0FBb0I7QUFDNUQsTUFBSSxPQUFPLFlBQVksZUFBZSxPQUFPLFFBQVEsU0FBUyxZQUFZO0FBQ3hFLFlBQVEsS0FBSyxzQ0FBc0MsR0FBRyxJQUFJO0FBQUEsRUFDNUQ7QUFDRjtBQUVBLElBQU0sZ0NBQWdDLElBQUksU0FBb0I7QUFDNUQsTUFBSSxPQUFPLFlBQVksZUFBZSxPQUFPLFFBQVEsU0FBUyxZQUFZO0FBQ3hFLFlBQVEsS0FBSyxzQ0FBc0MsR0FBRyxJQUFJO0FBQUEsRUFDNUQ7QUFDRjtBQUdPLElBQU0sZ0NBQWdDLENBQUM7QUFBQSxFQUM1QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQXlDO0FBQ3ZDLFFBQU0sQ0FBQyxzQkFBc0IsUUFBUSxRQUFJLDBCQUFXLHNCQUFzQixJQUFJO0FBRTlFLFFBQU0sMkJBQXVCO0FBQUEsSUFDM0IsQ0FDRSxNQUNBLFVBQ0EsVUFJSSxDQUFDLE1BQ0Y7QUFDSCxvQ0FBOEIsaUNBQWlDO0FBQUEsUUFDN0Q7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0YsQ0FBQztBQUNELGVBQVM7QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0EsWUFBWSxRQUFRLGVBQWU7QUFBQSxVQUNuQyxpQkFBaUIsUUFBUSxvQkFBb0I7QUFBQSxVQUM3QywyQkFBMkIsUUFBUSw4QkFBOEI7QUFBQSxRQUNuRTtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLENBQUM7QUFBQSxFQUNIO0FBRUEsK0JBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxxQkFBc0I7QUFFM0IsUUFBSSxxQkFBcUIsMkJBQTJCO0FBQ2xELFVBQUksQ0FBQyxZQUFZO0FBQ2Ysc0NBQThCLDBDQUEwQztBQUFBLFVBQ3RFLE1BQU0scUJBQXFCO0FBQUEsUUFDN0IsQ0FBQztBQUNELGlCQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0QztBQUFBLE1BQ0Y7QUFFQSxVQUFJLENBQUMsc0JBQXNCLG9CQUFvQjtBQUM3QyxzQ0FBOEIsZ0RBQWdEO0FBQUEsVUFDNUUsTUFBTSxxQkFBcUI7QUFBQSxVQUMzQjtBQUFBLFVBQ0E7QUFBQSxRQUNGLENBQUM7QUFDRDtBQUFBLE1BQ0Y7QUFFQSxVQUFJLGlCQUFpQjtBQUNuQixzQ0FBOEIsMENBQTBDO0FBQUEsVUFDdEUsTUFBTSxxQkFBcUI7QUFBQSxRQUM3QixDQUFDO0FBQ0QsaUJBQVMsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUMxQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsVUFBTSxFQUFFLE1BQU0sVUFBVSxZQUFZLGdCQUFnQixJQUFJO0FBQ3hELGFBQVMsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUMxQixrQ0FBOEIsZ0NBQWdDO0FBQUEsTUFDNUQ7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFFRCxRQUFJLFlBQVk7QUFDZCxxQkFBZTtBQUFBLElBQ2pCO0FBRUEsUUFBSSxpQkFBaUI7QUFDbkIsZ0JBQVUsa0NBQWtDO0FBQUEsSUFDOUM7QUFFQSxTQUFLLFNBQVMsTUFBTSxRQUFRO0FBQUEsRUFDOUIsR0FBRztBQUFBLElBQ0Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsU0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQ0Y7OztBQ3RLQSxJQUFBQyxnQkFBc0M7QUFTdEMsSUFBTSxzQkFBc0I7QUE4QjVCLElBQU0sZ0NBQW9EO0FBQUEsRUFDeEQsaUJBQWlCO0FBQUEsRUFDakIseUJBQXlCO0FBQUEsRUFDekIsb0JBQW9CO0FBQ3RCO0FBRUEsSUFBTSx1QkFBdUIsQ0FBQyxPQUEyQixXQUFvRDtBQUMzRyxVQUFRLE9BQU8sTUFBTTtBQUFBLElBQ25CLEtBQUs7QUFDSCxhQUFPLE9BQU87QUFBQSxJQUNoQixLQUFLO0FBQ0gsYUFBTztBQUFBLFFBQ0wsR0FBRztBQUFBLFFBQ0gsR0FBRyxPQUFPO0FBQUEsTUFDWjtBQUFBLElBQ0Y7QUFDRSxhQUFPO0FBQUEsRUFDWDtBQUNGO0FBR08sSUFBTSxnQ0FBZ0MsQ0FBQztBQUFBLEVBQzVDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUF5QztBQUN2QyxRQUFNLENBQUMsT0FBTyxRQUFRLFFBQUksMEJBQVcsc0JBQXNCLDZCQUE2QjtBQUV4RiwrQkFBVSxNQUFNO0FBQ2QsUUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhO0FBQy9CLGVBQVM7QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFdBQVc7QUFBQSxNQUNiLENBQUM7QUFDRDtBQUFBLElBQ0Y7QUFFQSxRQUFJLENBQUMsb0JBQW9CO0FBQ3ZCLGVBQVM7QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFdBQVc7QUFBQSxVQUNULGlCQUFpQjtBQUFBLFVBQ2pCLHlCQUF5QixLQUFLLDhCQUE4QixnQkFBZ0I7QUFBQSxVQUM1RSxvQkFBb0I7QUFBQSxRQUN0QjtBQUFBLE1BQ0YsQ0FBQztBQUNEO0FBQUEsSUFDRjtBQUVBLFFBQUksWUFBWTtBQUNoQixhQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxvQkFBb0I7QUFBQSxNQUN0QjtBQUFBLElBQ0YsQ0FBQztBQUVELFVBQU0sWUFBWTtBQUNoQixVQUFJO0FBQ0YsY0FBTSxXQUFXLE1BQU0sd0JBQXdCLGFBQWE7QUFBQSxVQUMxRCx5QkFBeUI7QUFBQSxRQUMzQixDQUFDO0FBQ0QsWUFBSSxVQUFXO0FBRWYsWUFBSSxVQUFVLFlBQVksT0FBTztBQUMvQixtQkFBUztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sV0FBVztBQUFBLGNBQ1QsaUJBQWlCO0FBQUEsY0FDakIseUJBQ0UsU0FBUyxTQUFTLE9BQU8sS0FBSyxLQUFLLDJCQUEyQixzQ0FBc0M7QUFBQSxjQUN0RyxvQkFBb0I7QUFBQSxZQUN0QjtBQUFBLFVBQ0YsQ0FBQztBQUNEO0FBQUEsUUFDRjtBQUVBLGNBQU0sVUFBVSxNQUFNLFFBQVEsVUFBVSxLQUFLLElBQUksU0FBUyxRQUFRLENBQUM7QUFDbkUsY0FBTSxnQkFDSixRQUFRO0FBQUEsVUFDTixDQUFDLFVBQ0MsU0FBVSxPQUFzQyxZQUFZLEVBQUUsWUFBWSxNQUFNLFlBQVksWUFBWTtBQUFBLFFBQzVHLEtBQ0EsUUFBUSxDQUFDLEtBQ1Q7QUFFRixZQUFJLENBQUMsZUFBZTtBQUNsQixtQkFBUztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sV0FBVztBQUFBLGNBQ1QsaUJBQWlCO0FBQUEsY0FDakIseUJBQXlCLEtBQUssMEJBQTBCLDhCQUE4QjtBQUFBLGNBQ3RGLG9CQUFvQjtBQUFBLFlBQ3RCO0FBQUEsVUFDRixDQUFDO0FBQ0Q7QUFBQSxRQUNGO0FBRUEsY0FBTSxlQUFlLHNCQUFzQixhQUFhO0FBQ3hELGNBQU0sYUFBYSxPQUFPLGFBQWEsdUJBQXVCLFdBQVcsYUFBYSxxQkFBcUI7QUFDM0csY0FBTSxTQUFTLGVBQWUsdUJBQXVCLG1CQUFtQixhQUFhLE9BQU87QUFDNUYsY0FBTSxzQkFBc0IsNkJBQTZCO0FBQUEsVUFDdkQ7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBLG1CQUFtQixhQUFhO0FBQUEsVUFDaEMsY0FBYztBQUFBLFFBQ2hCLENBQUM7QUFDRCxjQUFNLGVBQWUsZ0NBQWdDO0FBQUEsVUFDbkQ7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGLENBQUM7QUFDRCxjQUFNLFdBQVcsYUFBYSxvQkFBb0I7QUFFbEQsaUJBQVM7QUFBQSxVQUNQLE1BQU07QUFBQSxVQUNOLFdBQVc7QUFBQSxZQUNULGlCQUFpQjtBQUFBLFlBQ2pCLHlCQUF5QixXQUFXLHNCQUFzQixNQUFNLElBQUk7QUFBQSxZQUNwRSxvQkFBb0I7QUFBQSxVQUN0QjtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0gsU0FBUyxPQUFPO0FBQ2QsWUFBSSxVQUFXO0FBRWYsWUFBSSx3QkFBd0IsS0FBSyxHQUFHO0FBQ2xDLG1CQUFTO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTCxvQkFBb0I7QUFBQSxZQUN0QjtBQUFBLFVBQ0YsQ0FBQztBQUNEO0FBQUEsUUFDRjtBQUVBLGlCQUFTO0FBQUEsVUFDUCxNQUFNO0FBQUEsVUFDTixXQUFXO0FBQUEsWUFDVCxpQkFBaUI7QUFBQSxZQUNqQix5QkFDRSxpQkFBaUIsaUJBQWlCLE1BQU0sV0FBVyxNQUMvQyxLQUFLLDhCQUE4QixnQkFBZ0IsSUFDbkQsaUJBQWlCLFFBQ2YsTUFBTSxVQUNOLEtBQUssMkJBQTJCLHNDQUFzQztBQUFBLFlBQzlFLG9CQUFvQjtBQUFBLFVBQ3RCO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0YsR0FBRztBQUVILFdBQU8sTUFBTTtBQUNYLGtCQUFZO0FBQUEsSUFDZDtBQUFBLEVBQ0YsR0FBRztBQUFBLElBQ0Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFNBQU87QUFDVDs7O0FYbkNFLElBQUFDLHNCQUFBO0FBMUhGLElBQU0sWUFBWTtBQUNsQixJQUFNLHNCQUFzQixvQkFBSSxJQUFZLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBRTNFLElBQU0sd0JBQTJFO0FBQUEsRUFDL0UsR0FBRyxFQUFFLEtBQUssYUFBYSxVQUFVLE9BQU87QUFBQSxFQUN4QyxHQUFHLEVBQUUsS0FBSyx3QkFBd0IsVUFBVSxRQUFRO0FBQUEsRUFDcEQsR0FBRyxFQUFFLEtBQUssMEJBQTBCLFVBQVUsVUFBVTtBQUFBLEVBQ3hELEdBQUcsRUFBRSxLQUFLLHFCQUFxQixVQUFVLEtBQUs7QUFBQSxFQUM5QyxHQUFHLEVBQUUsS0FBSywyQkFBMkIsVUFBVSxXQUFXO0FBQUEsRUFDMUQsR0FBRyxFQUFFLEtBQUsseUJBQXlCLFVBQVUsU0FBUztBQUFBLEVBQ3RELEdBQUcsRUFBRSxLQUFLLHVCQUF1QixVQUFVLE9BQU87QUFBQSxFQUNsRCxHQUFHLEVBQUUsS0FBSyx3QkFBd0IsVUFBVSxRQUFRO0FBQUEsRUFDcEQsR0FBRyxFQUFFLEtBQUsseUJBQXlCLFVBQVUsU0FBUztBQUFBLEVBQ3RELElBQUksRUFBRSxLQUFLLHVCQUF1QixVQUFVLE9BQU87QUFDckQ7QUFFQSxJQUFNLGtCQUFrQixDQUFDLFVBQTJCLE9BQU8sU0FBUyxFQUFFLEVBQUUsS0FBSztBQUU3RSxJQUFNLGFBQWEsQ0FBQyxNQUFjLFVBQTJCO0FBQzNELFFBQU0saUJBQWlCLGdCQUFnQixJQUFJLEVBQUUsWUFBWTtBQUN6RCxRQUFNLGtCQUFrQixnQkFBZ0IsS0FBSyxFQUFFLFlBQVk7QUFDM0QsU0FBTyxDQUFDLENBQUMsa0JBQWtCLG1CQUFtQjtBQUNoRDtBQUVBLElBQU0sMEJBQTBCLENBQUMsT0FBMEIsb0JBQStDO0FBQ3hHLFFBQU0sb0JBQW9CLGdCQUFnQixlQUFlO0FBQ3pELE1BQUksQ0FBQyxrQkFBbUIsUUFBTztBQUMvQixNQUFJLE1BQU0sS0FBSyxDQUFDLFVBQVUsV0FBVyxNQUFNLFVBQVUsaUJBQWlCLENBQUMsRUFBRyxRQUFPO0FBQ2pGLFNBQU87QUFBQSxJQUNMO0FBQUEsTUFDRSxXQUFXO0FBQUEsTUFDWCxVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsR0FBRztBQUFBLEVBQ0w7QUFDRjtBQUVBLElBQU0sOEJBQThCLENBQUMsaUJBQXlCLGlCQUF5QixVQUFxQztBQUMxSCxRQUFNLHNCQUFzQixnQkFBZ0IsZUFBZTtBQUMzRCxRQUFNLG9CQUFvQixnQkFBZ0IsZUFBZTtBQUN6RCxNQUFJLHFCQUFxQjtBQUN2QixVQUFNLFFBQVEsTUFBTSxLQUFLLENBQUMsVUFBVSxXQUFXLE1BQU0sVUFBVSxtQkFBbUIsQ0FBQztBQUNuRixRQUFJLE1BQU8sUUFBTyxNQUFNO0FBQUEsRUFDMUI7QUFDQSxNQUFJLG1CQUFtQjtBQUNyQixVQUFNLE9BQU8sTUFBTSxLQUFLLENBQUMsVUFBVSxXQUFXLE1BQU0sVUFBVSxpQkFBaUIsQ0FBQztBQUNoRixXQUFPLE1BQU0sWUFBWTtBQUFBLEVBQzNCO0FBQ0EsU0FBTztBQUNUO0FBRUEsSUFBTSwrQkFBK0IsQ0FBQyxnQkFBZ0IsT0FBMkM7QUFDL0YsUUFBTSxRQUFRLFdBQVcsb0JBQUksS0FBSyxDQUFDO0FBQ25DLFFBQU0sV0FBVyxJQUFJLEtBQUssS0FBSztBQUUvQixXQUFTLFFBQVEsTUFBTSxRQUFRLElBQUksRUFBRTtBQUVyQyxTQUFPO0FBQUEsSUFDTCxVQUFVLFVBQVUsUUFBUTtBQUFBLElBQzVCLFFBQVEsVUFBVSxLQUFLO0FBQUEsSUFDdkIsV0FBVztBQUFBLElBQ1gsY0FBYztBQUFBLElBQ2QsZUFBZSxnQkFBZ0IsYUFBYTtBQUFBLElBQzVDLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLHFCQUFxQjtBQUFBLEVBQ3ZCO0FBQ0Y7QUFFQSxJQUFNLGdDQUFnQyxDQUFDLFdBQTRCO0FBQ2pFLE1BQUksUUFBUTtBQUNWLFdBQU8sS0FBSyxxQ0FBcUMsaURBQWlEO0FBQUEsRUFDcEc7QUFFQSxTQUFPLEtBQUsseUNBQXlDLDZEQUE2RDtBQUNwSDtBQUVBLElBQU0sNkJBQTZCO0FBRW5DLElBQU0sd0JBQXdCLElBQUksU0FBb0I7QUFDcEQsTUFBSSxPQUFPLFlBQVksZUFBZSxPQUFPLFFBQVEsU0FBUyxZQUFZO0FBQ3hFLFlBQVEsS0FBSyw0QkFBNEIsR0FBRyxJQUFJO0FBQUEsRUFDbEQ7QUFDRjtBQUVBLElBQU0sd0JBQXdCLElBQUksU0FBb0I7QUFDcEQsTUFBSSxPQUFPLFlBQVksZUFBZSxPQUFPLFFBQVEsU0FBUyxZQUFZO0FBQ3hFLFlBQVEsS0FBSyw0QkFBNEIsR0FBRyxJQUFJO0FBQUEsRUFDbEQ7QUFDRjtBQUdBLElBQU0saUNBQWlDLENBQUMsVUFBMkI7QUFDakUsU0FBTyxpQkFBaUIsS0FBSyxLQUFLLGlCQUFpQixvQkFBSSxLQUFLLENBQUM7QUFDL0Q7QUFHQSxJQUFNLHlCQUF5QixDQUFDLFNBQTZDO0FBQzNFLFFBQU0sU0FBUyxTQUFTLEtBQUssTUFBTTtBQUNuQyxTQUFPLENBQUMsQ0FBQztBQUNYO0FBR0EsSUFBTSwwQkFBMEIsTUFBTTtBQUNwQywwQkFBd0I7QUFBQSxJQUN0QixPQUFPLFNBQVMsT0FBTyxpQkFBaUI7QUFBQSxJQUN4QyxVQUFVLFNBQVMsT0FBTyxpQkFBaUI7QUFBQSxJQUMzQyxTQUFTLFNBQVMsT0FBTyxnQkFBZ0I7QUFBQSxFQUMzQyxDQUFDO0FBQ0g7QUFFQSxJQUFNLGdDQUFnQyxNQUE2QjtBQUNqRSxTQUFPLE9BQU8sUUFBUSxxQkFBcUIsRUFDeEMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLE9BQU87QUFBQSxJQUNyQixPQUFPLE9BQU8sSUFBSTtBQUFBLElBQ2xCLE1BQU0sS0FBSyxJQUFJLEtBQUssSUFBSSxRQUFRO0FBQUEsRUFDbEMsRUFBRSxFQUNELEtBQUssQ0FBQyxNQUFNLFVBQVUsT0FBTyxLQUFLLEtBQUssSUFBSSxPQUFPLE1BQU0sS0FBSyxDQUFDO0FBQ25FO0FBRUEsSUFBTSxnQkFBZ0IsTUFDcEIsOENBQUMsU0FBSSxTQUFRLGFBQVksTUFBSyxRQUFPLFFBQU8sZ0JBQWUsYUFBYSxLQUFLLGVBQVksUUFBTyxXQUFVLFdBQ3hHO0FBQUEsK0NBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLCtIQUE4SDtBQUFBLEVBQ25MLDZDQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSx3Q0FBdUM7QUFBQSxFQUM1Riw2Q0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsNkJBQTRCO0FBQUEsRUFDakYsNkNBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLFlBQVc7QUFBQSxFQUNoRSw2Q0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsWUFBVztBQUFBLEdBQ2xFO0FBR0YsSUFBTSw0QkFBNEIsTUFBTTtBQUN0QyxRQUFNLFlBQVksVUFBVSxrQkFBa0IsTUFBTTtBQUNwRCxRQUFNLGtCQUFrQixVQUFVLGtCQUFrQixLQUFLO0FBQ3pELFFBQU0sb0JBQW9CLFVBQVUscUJBQXFCLEtBQUs7QUFDOUQsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixJQUFJLGVBQWU7QUFDbkIsUUFBTSx1QkFBdUIsZUFBQUMsUUFBTSxPQUE4QixJQUFJO0FBQ3JFLFFBQU0saUJBQWlCLGVBQUFBLFFBQU0sT0FBZ0MsSUFBSTtBQUNqRSxRQUFNLGtCQUFrQixlQUFBQSxRQUFNLE9BQWdDLElBQUk7QUFDbEUsUUFBTSx1QkFBdUIsZUFBQUEsUUFBTSxPQUFPLEtBQUs7QUFDL0MsUUFBTSwwQkFBMEIsZUFBQUEsUUFBTSxPQUFzQixJQUFJO0FBQ2hFLFFBQU0sd0JBQXdCLGVBQUFBLFFBQU0sT0FBTyxFQUFFO0FBQzdDLFFBQU0sc0JBQWtCLHdCQUFRLE1BQU07QUFDcEMsVUFBTSxNQUFNLElBQUksSUFBSSxPQUFPLFNBQVMsSUFBSTtBQUN4QyxVQUFNLFNBQVMsU0FBUyxJQUFJLGFBQWEsSUFBSSxRQUFRLENBQUMsRUFBRSxZQUFZO0FBQ3BFLFVBQU0sZUFBZSxTQUFTLElBQUksYUFBYSxJQUFJLGNBQWMsQ0FBQztBQUNsRSxVQUFNQyxjQUFhLFdBQVcsVUFBVSxDQUFDLENBQUM7QUFDMUMsV0FBTztBQUFBLE1BQ0wsWUFBQUE7QUFBQSxNQUNBLFNBQVM7QUFBQSxNQUNULGFBQWFBLGNBQWMsZUFBMEIsQ0FBQyxDQUFDLGVBQWdCLGlCQUEyQjtBQUFBLE1BQ2xHLG1CQUFtQkEsY0FBYyxJQUFjO0FBQUEsSUFDakQ7QUFBQSxFQUNGLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxhQUFhLGdCQUFnQjtBQUNuQyxRQUFNLGNBQWMsZ0JBQWdCO0FBQ3BDLFFBQU0sb0JBQW9CLGdCQUFnQjtBQUMxQyxRQUFNLHdCQUF3QixDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDakQsUUFBTSxvQkFBb0IsZ0JBQWdCO0FBQzFDLFFBQU0scUJBQXFCLENBQUMsY0FBYztBQUMxQyxRQUFNLG1CQUFlO0FBQUEsSUFDbkIsTUFBTSx3QkFBd0IsTUFBTSxRQUFRLFlBQVksSUFBSSxlQUFlLENBQUMsR0FBRyxlQUFlO0FBQUEsSUFDOUYsQ0FBQyxpQkFBaUIsWUFBWTtBQUFBLEVBQ2hDO0FBQ0EsUUFBTSwyQkFBdUI7QUFBQSxJQUMzQixNQUFNLDRCQUE0QixpQkFBaUIsaUJBQWlCLFlBQVk7QUFBQSxJQUNoRixDQUFDLGlCQUFpQixZQUFZO0FBQUEsRUFDaEM7QUFDQSxRQUFNLHdCQUF3QixjQUFjO0FBRzVDLFFBQU0sdUNBQW1DO0FBQUEsSUFDdkMsQ0FBQyxhQUFxRjtBQUNwRixVQUFJLENBQUMsV0FBWSxRQUFPO0FBRXhCLFlBQU0sV0FBVyw2QkFBNkIsU0FBUyxhQUFhO0FBQ3BFLFlBQU0scUJBQXFCLFNBQVMsU0FBUyxRQUFRLEtBQUssU0FBUztBQUNuRSxZQUFNLG1CQUFtQixTQUFTLFNBQVMsTUFBTSxLQUFLLFNBQVM7QUFDL0QsWUFBTSwwQkFBMEIsZ0JBQWdCLFNBQVMsYUFBYSxLQUFLLFNBQVM7QUFFcEYsYUFBTztBQUFBLFFBQ0wsR0FBRztBQUFBLFFBQ0gsVUFBVTtBQUFBLFFBQ1YsUUFBUTtBQUFBLFFBQ1IsZUFBZTtBQUFBLFFBQ2YsY0FBYztBQUFBLE1BQ2hCO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQyxVQUFVO0FBQUEsRUFDYjtBQUVBLFFBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx5QkFBUyxLQUFLO0FBQ3RELFFBQU0sQ0FBQyxnQkFBZ0IsaUJBQWlCLFFBQUkseUJBQVMsRUFBRTtBQUN2RCxRQUFNLENBQUMsZUFBZSxnQkFBZ0IsUUFBSSx5QkFBUyxFQUFFO0FBQ3JELFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixRQUFJLHlCQUFTLEtBQUs7QUFDeEQsUUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsUUFBSSx5QkFBUyxFQUFFO0FBQ3ZELFFBQU0sQ0FBQyxnQkFBZ0IsaUJBQWlCLFFBQUkseUJBQXFELElBQUk7QUFFckcsUUFBTSx1QkFBbUI7QUFBQSxJQUN2QixPQUFPO0FBQUEsTUFDTCxPQUFPLEtBQUssc0JBQXNCLE9BQU87QUFBQSxNQUN6QyxNQUFNLEtBQUsscUJBQXFCLFVBQVU7QUFBQSxNQUMxQyxNQUFNLEtBQUsscUJBQXFCLE1BQU07QUFBQSxNQUN0QyxNQUFNLEtBQUsscUJBQXFCLE1BQU07QUFBQSxJQUN4QztBQUFBLElBQ0EsQ0FBQztBQUFBLEVBQ0g7QUFFQSxRQUFNLEVBQUUsT0FBTyxhQUFhLGNBQWMsY0FBYyxJQUFJLGlCQUFpQjtBQUFBLElBQzNFLG9CQUFvQixLQUFLLGVBQWUsSUFBSTtBQUFBLElBQzVDLG1CQUFtQixLQUFLLGNBQWMsUUFBUTtBQUFBLEVBQ2hELENBQUM7QUFFRCxRQUFNLHVCQUFtQix3QkFBK0IsTUFBTTtBQUM1RCxVQUFNLFNBQVMsTUFBTSxRQUFRLE9BQU8sdUJBQXVCLElBQUksT0FBTywwQkFBMEIsQ0FBQztBQUNqRyxVQUFNLFNBQVMscUJBQXFCLE1BQU0sRUFBRSxPQUFPLENBQUMsVUFBVTtBQUM1RCxZQUFNLFNBQVMsT0FBTyxNQUFNLEtBQUs7QUFDakMsYUFBTyxPQUFPLFVBQVUsTUFBTSxLQUFLLG9CQUFvQixJQUFJLE1BQU07QUFBQSxJQUNuRSxDQUFDO0FBRUQsUUFBSSxPQUFPLFNBQVMsR0FBRztBQUNyQixhQUFPLE9BQU8sS0FBSyxDQUFDLE1BQU0sVUFBVSxPQUFPLEtBQUssS0FBSyxJQUFJLE9BQU8sTUFBTSxLQUFLLENBQUM7QUFBQSxJQUM5RTtBQUVBLFdBQU8sOEJBQThCO0FBQUEsRUFDdkMsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLHdCQUFvQix3QkFBUSxNQUFNO0FBQ3RDLFVBQU0sTUFBTSxvQkFBSSxJQUFvQjtBQUNwQyxlQUFXLFVBQVUsa0JBQWtCO0FBQ3JDLFVBQUksSUFBSSxPQUFPLE9BQU8sS0FBSyxHQUFHLE9BQU8sSUFBSTtBQUFBLElBQzNDO0FBQ0EsV0FBTztBQUFBLEVBQ1QsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0FBRXJCLFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLElBQUksMEJBQTBCO0FBQUEsSUFDNUI7QUFBQSxJQUNBLFVBQVU7QUFBQSxJQUNWLE1BQU0sYUFBYSxTQUFTO0FBQUEsSUFDNUIsYUFBYTtBQUFBLEVBQ2YsQ0FBQztBQUNELFFBQU0sRUFBRSxpQkFBaUIsbUJBQW1CLG1CQUFtQixpQkFBaUIsaUJBQWlCLElBQUksNkJBQTZCO0FBQ2xJLFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFlBQVk7QUFBQSxJQUNaLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLElBQUksOEJBQThCO0FBQ2xDLFFBQU0sK0JBQTJCO0FBQUEsSUFDL0IsQ0FBQyxvQkFBb0M7QUFDbkMsWUFBTSxpQkFBaUIsNEJBQTRCLGlCQUFpQixpQkFBaUIsWUFBWTtBQUNqRywrQkFBeUIsY0FBYztBQUN2QyxVQUFJLENBQUMsa0JBQW1CLG1CQUFtQixXQUFXLGdCQUFnQixlQUFlLEdBQUk7QUFDdkYsdUNBQStCO0FBQUEsTUFDakMsT0FBTztBQUNMLHFDQUE2QixjQUFjO0FBQUEsTUFDN0M7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsQ0FBQyxpQkFBaUIsY0FBYyx3QkFBd0I7QUFBQSxFQUMxRDtBQUNBLFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLElBQUksOEJBQThCO0FBQUEsSUFDaEM7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxFQUN6QixDQUFDO0FBQ0QsUUFBTSxFQUFFLHFCQUFxQixJQUFJLDhCQUE4QjtBQUFBLElBQzdEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBQ0QsUUFBTSxtQ0FBK0IsNEJBQVksTUFBTTtBQUNyRCxVQUFNLHVCQUF1Qix5QkFBeUIsb0JBQW9CO0FBQzFFLFdBQU8sNkJBQTZCLG9CQUFvQjtBQUFBLEVBQzFELEdBQUcsQ0FBQyxzQkFBc0Isd0JBQXdCLENBQUM7QUFFbkQsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixJQUFJLDhCQUE4QjtBQUFBLElBQ2hDO0FBQUEsSUFDQTtBQUFBLElBQ0Esd0JBQXdCO0FBQUEsSUFDeEIsZ0JBQWdCLENBQUMsYUFBYTtBQUM1Qix3QkFBa0IsSUFBSTtBQUN0QiwrQkFBeUI7QUFDekIsWUFBTSx3QkFBd0IseUJBQXlCLFNBQVMsYUFBYTtBQUM3RSxXQUFLO0FBQUEsUUFDSDtBQUFBLFFBQ0EsaUNBQWlDO0FBQUEsVUFDL0IsR0FBRztBQUFBLFVBQ0gsZUFBZTtBQUFBLFFBQ2pCLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLElBQ0EsZ0JBQWdCLE1BQU07QUFDcEIsd0JBQWtCLElBQUk7QUFDdEIsK0JBQXlCO0FBQ3pCLHVCQUFpQjtBQUNqQixVQUFJLFlBQVk7QUFDZCxjQUFNLGVBQWUsNkJBQTZCO0FBQ2xELDhCQUFzQixZQUFZO0FBQ2xDLDZCQUFxQixHQUFHLGlDQUFpQyxZQUFZLEdBQUc7QUFBQSxVQUN0RSxZQUFZO0FBQUEsVUFDWixpQkFBaUI7QUFBQSxVQUNqQiwyQkFBMkI7QUFBQSxRQUM3QixDQUFDO0FBQ0Q7QUFBQSxNQUNGO0FBRUEsWUFBTSxxQkFBcUIseUJBQXlCLGVBQWU7QUFDbkUsdUJBQWlCLGtCQUFrQjtBQUNuQyxnQkFBVSxlQUFlO0FBQUEsSUFDM0I7QUFBQSxFQUNGLENBQUM7QUFFRCxnQ0FBVSxNQUFNO0FBQ2QsVUFBTSxpQ0FBaUMsZ0JBQWdCLG9CQUFvQjtBQUMzRSxRQUFJLENBQUMsK0JBQWdDO0FBQ3JDLHFCQUFpQiw4QkFBOEI7QUFDL0MsNkJBQXlCLDhCQUE4QjtBQUFBLEVBQ3pELEdBQUcsQ0FBQyxzQkFBc0Isa0JBQWtCLHdCQUF3QixDQUFDO0FBRXJFLGdDQUFVLE1BQU07QUFDZCxRQUFJLG9CQUFxQjtBQUN6QixVQUFNLHdCQUF3Qiw0QkFBNEIsaUJBQWlCLGlCQUFpQixZQUFZO0FBQ3hHLFVBQU0saUNBQWlDLGdCQUFnQixhQUFhO0FBQ3BFLFFBQUksV0FBVyxnQ0FBZ0MscUJBQXFCLEVBQUc7QUFDdkUsUUFBSSxDQUFDLGtDQUFrQyxDQUFDLHNCQUF1QjtBQUUvRCxxQkFBaUIscUJBQXFCO0FBQ3RDLDZCQUF5QixxQkFBcUI7QUFBQSxFQUNoRCxHQUFHLENBQUMscUJBQXFCLGlCQUFpQixlQUFlLGNBQWMsa0JBQWtCLHdCQUF3QixDQUFDO0FBRWxILFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQSxNQUFNO0FBQUEsSUFDTixpQkFBaUI7QUFBQSxJQUNqQixnQkFBZ0I7QUFBQSxJQUNoQixtQkFBbUI7QUFBQSxJQUNuQixjQUFjO0FBQUEsSUFDZCxXQUFXO0FBQUEsSUFDWDtBQUFBLElBQ0E7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxZQUFZO0FBQUEsRUFDZCxJQUFJLCtCQUErQjtBQUFBLElBQ2pDLGtCQUFrQixDQUFDLGNBQWM7QUFBQSxJQUNqQyxjQUFjO0FBQUEsSUFDZCxlQUFlO0FBQUEsSUFDZixhQUFhO0FBQUEsSUFDYixrQkFBa0IsU0FBUyxlQUFlO0FBQUEsSUFDMUMsY0FBYyxnQkFBZ0I7QUFBQSxJQUM5QixhQUFhO0FBQUEsSUFDYixhQUFhLENBQUMsV0FBVztBQUN2QixZQUFNLGdCQUFnQixTQUFTLFFBQVEsTUFBTTtBQUM3QyxVQUFJLENBQUMsY0FBZTtBQUVwQixVQUFJLHlCQUF5QixtQkFBbUI7QUFDOUMsdUNBQStCO0FBQUEsVUFDN0IsUUFBUTtBQUFBLFVBQ1IsU0FBUztBQUFBLFVBQ1QsUUFBUTtBQUFBLFFBQ1YsQ0FBQztBQUNELGNBQU0sUUFBUSxJQUFJLGdCQUFnQjtBQUFBLFVBQ2hDLFFBQVE7QUFBQSxVQUNSLE1BQU07QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLFNBQVM7QUFBQSxRQUNYLENBQUM7QUFDRCw2QkFBcUIsd0JBQXdCLE1BQU0sU0FBUyxDQUFDLElBQUk7QUFBQSxVQUMvRCxpQkFBaUI7QUFBQSxRQUNuQixDQUFDO0FBQ0Q7QUFBQSxNQUNGO0FBRUEsc0NBQWdDO0FBQ2hDLDJCQUFxQiwrQkFBK0IsbUJBQW1CLGFBQWEsQ0FBQyxtQ0FBbUM7QUFBQSxRQUN0SCxpQkFBaUI7QUFBQSxNQUNuQixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sbUJBQWU7QUFBQSxJQUNuQixNQUNFLGFBQ0ksQ0FBQyxJQUNEO0FBQUEsTUFDRTtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osT0FBTyxLQUFLLCtCQUErQixjQUFjO0FBQUEsUUFDekQsTUFBTSw2Q0FBQyxpQkFBYztBQUFBLFFBQ3JCLFNBQVM7QUFBQSxNQUNYO0FBQUEsSUFDRjtBQUFBLElBQ04sQ0FBQyxZQUFZLGdCQUFnQjtBQUFBLEVBQy9CO0FBRUEsUUFBTSxzQkFBc0IscUJBQXFCLEtBQUs7QUFDdEQsUUFBTSwwQkFBc0Isd0JBQVEsTUFBTTtBQUN4QyxXQUFPLGdCQUFnQixPQUFPLENBQUMsS0FBSyxTQUFTO0FBQzNDLFlBQU0sU0FBUyxPQUFPLEtBQUssZUFBZSxDQUFDO0FBQzNDLGFBQU8sU0FBUyxJQUFJLE1BQU0sU0FBUztBQUFBLElBQ3JDLEdBQUcsQ0FBQztBQUFBLEVBQ04sR0FBRyxDQUFDLGVBQWUsQ0FBQztBQUNwQixRQUFNLDhCQUEwQix3QkFBUSxNQUFNLHlCQUF5QixxQkFBcUIsRUFBRSxHQUFHLENBQUMsbUJBQW1CLENBQUM7QUFDdEgsc0NBQWdCLE1BQU07QUFDcEIsOEJBQXdCLDhCQUE4QjtBQUFBLEVBQ3hELEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSw0QkFBd0I7QUFBQSxJQUM1QixNQUNFO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUVBLFFBQU0sK0JBQTJCO0FBQUEsSUFDL0IsQ0FBQyxjQUFzQixvQkFBNkI7QUFDbEQsWUFBTSxhQUFhLCtCQUErQixlQUFlO0FBQ2pFLFlBQU0sNkJBQTZCLGdCQUFnQixlQUFlO0FBQ2xFLFlBQU0sd0JBQXdCLDZCQUMxQix5QkFBeUIsMEJBQTBCLElBQ25EO0FBRUosWUFBTSxnQkFBb0Q7QUFBQSxRQUN4RCxVQUFVO0FBQUEsUUFDVixRQUFRO0FBQUEsUUFDUixXQUFXO0FBQUEsUUFDWCxjQUFjO0FBQUEsUUFDZCxlQUFlO0FBQUEsUUFDZixjQUFjO0FBQUEsUUFDZCxpQkFBaUI7QUFBQSxRQUNqQixxQkFBcUI7QUFBQSxNQUN2QjtBQUVBLDRCQUFzQixrQ0FBa0M7QUFBQSxRQUN0RDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0YsQ0FBQztBQUVELHVCQUFpQjtBQUNqQiw0QkFBc0IsYUFBYTtBQUNuQyw0QkFBc0IsVUFBVTtBQUNoQyxxQkFBZTtBQUNmLGdCQUFVLHVCQUF1QjtBQUNqQyw0QkFBc0IscUNBQXFDO0FBQUEsUUFDekQsTUFBTTtBQUFBLFFBQ047QUFBQSxNQUNGLENBQUM7QUFDRCxXQUFLLFNBQVMsR0FBRyxhQUFhO0FBRTlCLFlBQU0sTUFBTSxJQUFJLElBQUksT0FBTyxTQUFTLElBQUk7QUFDeEMsVUFBSSxhQUFhLE9BQU8sY0FBYztBQUN0QyxVQUFJLGFBQWEsT0FBTyxZQUFZO0FBQ3BDLFlBQU0sZUFBZSxJQUFJLGFBQWEsU0FBUztBQUMvQyxhQUFPLFFBQVEsYUFBYSxDQUFDLEdBQUcsSUFBSSxlQUFlLEdBQUcsSUFBSSxRQUFRLElBQUksWUFBWSxLQUFLLElBQUksUUFBUTtBQUFBLElBQ3JHO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLFFBQU0saUNBQTZCO0FBQUEsSUFDakMsQ0FBQyxnQkFBMkM7QUFDMUMsWUFBTSx3QkFBd0IseUJBQXlCLFlBQVksUUFBUSxhQUFhO0FBQ3hGLFlBQU0sa0JBQWtCO0FBQUEsUUFDdEIsR0FBRyxZQUFZO0FBQUEsUUFDZixlQUFlO0FBQUEsTUFDakI7QUFFQSw0QkFBc0IsZUFBZTtBQUNyQyw4QkFBd0IsVUFBVSxZQUFZO0FBQzlDLDRCQUFzQixVQUFVLFlBQVk7QUFDNUMsaUNBQTJCO0FBQUEsUUFDekIsZUFBZSxZQUFZO0FBQUEsUUFDM0IsaUJBQWlCLFlBQVk7QUFBQSxRQUM3QixhQUFhLFlBQVk7QUFBQSxRQUN6QixrQkFBa0IsWUFBWTtBQUFBLFFBQzlCLG9CQUFvQixZQUFZO0FBQUEsTUFDbEMsQ0FBQztBQUVELFVBQUksWUFBWSxNQUFNLFNBQVMsS0FBSyxZQUFZLFFBQVEsR0FBRztBQUN6RCw0QkFBb0I7QUFBQSxVQUNsQixPQUFPLFlBQVk7QUFBQSxVQUNuQixPQUFPLFlBQVk7QUFBQSxVQUNuQixNQUFNLFlBQVk7QUFBQSxRQUNwQixDQUFDO0FBQUEsTUFDSDtBQUVBLDJCQUFxQixZQUFZLE1BQU0saUNBQWlDLGVBQWUsR0FBRztBQUFBLFFBQ3hGLFlBQVk7QUFBQSxRQUNaLDJCQUEyQjtBQUFBLE1BQzdCLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxrQ0FBOEIsNEJBQVksTUFBTTtBQUNwRCxVQUFNLGVBQWUsNkJBQTZCO0FBQ2xELHFCQUFpQjtBQUNqQixzQ0FBa0M7QUFDbEMsNkJBQXlCO0FBQ3pCLHNCQUFrQixJQUFJO0FBQ3RCLDBCQUFzQixZQUFZO0FBQ2xDLHlCQUFxQixHQUFHLGlDQUFpQyxZQUFZLEdBQUc7QUFBQSxNQUN0RSxZQUFZO0FBQUEsTUFDWixpQkFBaUI7QUFBQSxNQUNqQiwyQkFBMkI7QUFBQSxJQUM3QixDQUFDO0FBQUEsRUFDSCxHQUFHO0FBQUEsSUFDRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0saUNBQTZCO0FBQUEsSUFDakMsQ0FBQyxnQkFBMkM7QUFDMUMsWUFBTSx3QkFBd0IseUJBQXlCLFlBQVksUUFBUSxhQUFhO0FBQ3hGLFlBQU0sa0JBQWtCO0FBQUEsUUFDdEIsR0FBRyxZQUFZO0FBQUEsUUFDZixlQUFlO0FBQUEsTUFDakI7QUFFQSw0QkFBc0IsZUFBZTtBQUNyQyw4QkFBd0IsVUFBVSxZQUFZO0FBQzlDLDRCQUFzQixVQUFVLFlBQVk7QUFFNUMsVUFBSSxZQUFZLE1BQU0sU0FBUyxLQUFLLFlBQVksUUFBUSxHQUFHO0FBQ3pELDRCQUFvQjtBQUFBLFVBQ2xCLE9BQU8sWUFBWTtBQUFBLFVBQ25CLE9BQU8sWUFBWTtBQUFBLFVBQ25CLE1BQU0sWUFBWTtBQUFBLFFBQ3BCLENBQUM7QUFBQSxNQUNIO0FBRUEsMkJBQXFCLFlBQVksTUFBTSxpQkFBaUI7QUFBQSxRQUN0RCxZQUFZO0FBQUEsTUFDZCxDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsQ0FBQyx1QkFBdUIscUJBQXFCLHNCQUFzQix3QkFBd0I7QUFBQSxFQUM3RjtBQUdBLFFBQU0sK0JBQTJCLDRCQUFZLE1BQU07QUFDakQscUJBQWlCO0FBQ2pCLHNDQUFrQztBQUNsQyw0QkFBd0IsVUFBVTtBQUNsQywwQkFBc0IsVUFBVTtBQUNoQyw2QkFBeUI7QUFDekIsc0JBQWtCLElBQUk7QUFDdEIsWUFBUTtBQUFBLEVBQ1YsR0FBRyxDQUFDLGtCQUFrQixtQ0FBbUMsMEJBQTBCLE9BQU8sQ0FBQztBQUUzRixRQUFNLDRCQUF3QjtBQUFBLElBQzVCLENBQUMsV0FBc0M7QUFDckMsVUFBSSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0Isc0JBQXNCLG1CQUFtQixhQUFjO0FBQ2pHLFVBQUksT0FBTyxTQUFTLE9BQVE7QUFFNUIsWUFBTSxTQUFTLFNBQVMsT0FBTyxNQUFNO0FBQ3JDLFVBQUksQ0FBQyxPQUFRO0FBQ2IsVUFBSSxDQUFDLHVCQUF1QixNQUFNLEVBQUc7QUFFckMsd0JBQWtCLElBQUk7QUFDdEIsZ0NBQTBCLE1BQU07QUFBQSxJQUNsQztBQUFBLElBQ0EsQ0FBQyxvQkFBb0IsWUFBWSxjQUFjLG9CQUFvQixpQkFBaUIseUJBQXlCO0FBQUEsRUFDL0c7QUFFQSxRQUFNLDJCQUF1Qiw0QkFBWSxNQUFNO0FBQzdDLHNCQUFrQixFQUFFO0FBQ3BCLHNCQUFrQixJQUFJO0FBQ3RCLDZCQUF5QjtBQUFBLEVBQzNCLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQztBQUU3QixRQUFNLDJCQUF1Qiw0QkFBWSxNQUEwQztBQUNqRixVQUFNLGVBQWUsa0JBQWtCO0FBQ3ZDLFVBQU0sd0JBQXdCLHlCQUF5QixhQUFhLGFBQWE7QUFDakYsV0FBTyxpQ0FBaUM7QUFBQSxNQUN0QyxHQUFHO0FBQUEsTUFDSCxlQUFlO0FBQUEsSUFDakIsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLGdCQUFnQixnQkFBZ0Isa0NBQWtDLHdCQUF3QixDQUFDO0FBRy9GLFFBQU0sK0JBQTJCLDRCQUFZLFlBQVk7QUFDdkQsUUFBSSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0Isc0JBQXNCLG1CQUFtQixnQkFBZ0IsZUFBZTtBQUNoSDtBQUFBLElBQ0Y7QUFFQSxxQkFBaUIsSUFBSTtBQUNyQixzQkFBa0IsRUFBRTtBQUNwQixzQkFBa0IsSUFBSTtBQUV0QixRQUFJO0FBQ0YsWUFBTSxnQkFBZ0IscUJBQXFCO0FBQzNDLHlCQUFtQixlQUFlLEtBQUs7QUFBQSxJQUN6QyxTQUFTLE9BQU87QUFDZCxZQUFNLFVBQVUsaUJBQWlCLFFBQVEsTUFBTSxVQUFVLEtBQUsscUJBQXFCLHlCQUF5QjtBQUM1Ryx3QkFBa0IsT0FBTztBQUFBLElBQzNCLFVBQUU7QUFDQSx1QkFBaUIsS0FBSztBQUFBLElBQ3hCO0FBQUEsRUFDRixHQUFHO0FBQUEsSUFDRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUdELGdDQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsY0FBYyxNQUFNLFNBQVMsRUFBRztBQUNyQywwQkFBc0IsTUFBTSxPQUFPLENBQUMsU0FBd0MsS0FBSyxTQUFTLE1BQU0sQ0FBQztBQUFBLEVBQ25HLEdBQUcsQ0FBQyx1QkFBdUIsWUFBWSxLQUFLLENBQUM7QUFFN0MsUUFBTSx3QkFBb0IsNEJBQVksWUFBWTtBQUNoRCxRQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsY0FBYztBQUMvQyxhQUFPO0FBQUEsSUFDVDtBQUNBLFFBQUksbUJBQW1CLENBQUMsb0JBQW9CO0FBQzFDLFlBQU0saUJBQ0osMkJBQ0EsS0FBSyx5Q0FBeUMsNkRBQTZEO0FBQzdHLHVCQUFpQixjQUFjO0FBQy9CLHdCQUFrQixjQUFjO0FBQ2hDLHNCQUFnQixnQkFBZ0IsSUFBSTtBQUNwQyxhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sZ0JBQWdCLHFCQUFxQixLQUFLO0FBQ2hELFFBQUksZ0JBQWdCLEdBQUc7QUFDckIsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLGdCQUFnQixxQkFBcUI7QUFDM0MsVUFBTSxrQkFBa0IsU0FBUyxjQUFjLGlCQUFpQixlQUFlO0FBRS9FLG9CQUFnQixJQUFJO0FBQ3BCLHFCQUFpQixFQUFFO0FBQ25CLHNCQUFrQixJQUFJO0FBQ3RCLHNCQUFrQixLQUFLLDhDQUE4Qyx5QkFBeUIsQ0FBQztBQUUvRixRQUFJO0FBQ0YsWUFBTSxXQUFXLE1BQU07QUFBQSxRQUNyQiw0QkFDSTtBQUFBLFVBQ0UsZ0JBQWdCO0FBQUEsVUFDaEIsZUFBZTtBQUFBLFVBQ2YsU0FBUyxrQ0FBa0Msb0JBQW9CLGFBQWE7QUFBQSxVQUM1RTtBQUFBLFFBQ0YsSUFDQTtBQUFBLFVBQ0UsZ0JBQWdCO0FBQUEsVUFDaEIsZUFBZTtBQUFBLFVBQ2YsV0FBVyxnQkFBZ0IsSUFBSSxDQUFDLFNBQVMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxFQUFFLE9BQU8sT0FBTztBQUFBLFFBQ2hGO0FBQUEsUUFDSjtBQUFBLFVBQ0UseUJBQXlCO0FBQUEsVUFDekIsa0JBQWtCLG1CQUFtQjtBQUFBLFFBQ3ZDO0FBQUEsTUFDRjtBQUNBLFlBQU0sU0FBUyxTQUFTLFFBQVE7QUFDaEMsVUFBSSxDQUFDLFFBQVE7QUFDWCxjQUFNLGlCQUFpQixTQUFTLFdBQVcsS0FBSyxxQkFBcUIsaUJBQWlCO0FBQ3RGLHlCQUFpQixjQUFjO0FBQy9CLDBCQUFrQixjQUFjO0FBQ2hDLHdCQUFnQixnQkFBZ0IsSUFBSTtBQUNwQyxlQUFPO0FBQUEsTUFDVDtBQUVBLHdCQUFrQixNQUFNO0FBRXhCLFVBQUksT0FBTyxjQUFjLEdBQUc7QUFDMUIsNkJBQXFCO0FBQ3JCLHlCQUFpQjtBQUNqQiwwQ0FBa0M7QUFDbEMsd0NBQWdDO0FBQ2hDLGNBQU0sY0FBYyxPQUFPLGNBQWMsS0FBSyxPQUFPLGVBQWUsSUFBSSxtQkFBbUI7QUFDM0Ysd0JBQWdCLGFBQWEsZ0JBQWdCLGNBQWMsT0FBTyxJQUFJO0FBQ3RFLDZCQUFxQiwyQkFBMkIsV0FBVyxHQUFHO0FBQUEsVUFDNUQsaUJBQWlCO0FBQUEsVUFDakIsaUJBQWlCO0FBQUEsUUFDbkIsQ0FBQztBQUNELGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxTQUFTLGNBQWMsSUFBSSxJQUFJLGFBQWEsYUFBYTtBQUUvRCxVQUFJLE9BQU8sY0FBYyxLQUFLLE9BQU8sY0FBYyxHQUFHO0FBQ3BELGNBQU0saUJBQWlCLFNBQVMsV0FBVyxLQUFLLHFCQUFxQixpQkFBaUI7QUFDdEYsMEJBQWtCLGNBQWM7QUFDaEMsd0JBQWdCLGdCQUFnQixJQUFJO0FBQ3BDLGVBQU87QUFBQSxNQUNUO0FBRUEsVUFBSSxPQUFPLGNBQWMsS0FBSyxPQUFPLGVBQWUsR0FBRztBQUNyRCwwQkFBa0IsU0FBUyxXQUFXLEtBQUssYUFBYSxJQUFJLENBQUM7QUFDN0Qsd0JBQWdCLGtCQUFrQixJQUFJO0FBQ3RDLGVBQU87QUFBQSxNQUNUO0FBRUEsd0JBQWtCLFNBQVMsV0FBVyxLQUFLLGFBQWEsSUFBSSxDQUFDO0FBQzdELHNCQUFnQixhQUFhLElBQUk7QUFDakMsYUFBTztBQUFBLElBQ1QsU0FBUyxPQUFPO0FBQ2QsWUFBTSxpQkFBaUIsaUJBQWlCLFFBQVEsTUFBTSxVQUFVLEtBQUsscUJBQXFCLGlCQUFpQjtBQUMzRyx1QkFBaUIsY0FBYztBQUMvQix3QkFBa0IsY0FBYztBQUNoQyxzQkFBZ0IsZ0JBQWdCLElBQUk7QUFDcEMsYUFBTztBQUFBLElBQ1QsVUFBRTtBQUNBLHNCQUFnQixLQUFLO0FBQUEsSUFDdkI7QUFBQSxFQUNGLEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSwyQkFBdUIsNEJBQVksTUFBTTtBQUM3QyxRQUFJLENBQUMsY0FBYyxzQkFBc0IsS0FBSyxnQkFBZ0Isc0JBQXNCLGlCQUFpQjtBQUNuRztBQUFBLElBQ0Y7QUFFQSxxQkFBaUIsRUFBRTtBQUNuQixzQkFBa0IsRUFBRTtBQUNwQixnQkFBWTtBQUFBLE1BQ1YsT0FBTyxLQUFLLHNDQUFzQyxvQkFBb0I7QUFBQSxNQUN0RSxTQUFTLDRCQUNMLEdBQUcsS0FBSyxzQkFBc0IsU0FBUyxDQUFDLEtBQUssbUJBQW1CLEtBQ2hFLEdBQUcsS0FBSyxzQkFBc0IsU0FBUyxDQUFDLEtBQUssbUJBQW1CO0FBQUEsRUFBSyxLQUFLLG1DQUFtQyxjQUFjLENBQUMsS0FBSyx1QkFBdUI7QUFBQSxNQUM1SixhQUFhLEtBQUssc0NBQXNDLG9CQUFvQjtBQUFBLE1BQzVFLFlBQVksS0FBSyxjQUFjLFFBQVE7QUFBQSxNQUN2QyxXQUFXLFlBQVk7QUFDckIsZUFBTyxrQkFBa0I7QUFBQSxNQUMzQjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsR0FBRztBQUFBLElBQ0Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0seUJBQXFCLDRCQUFZLFlBQVk7QUFDakQscUJBQWlCLEVBQUU7QUFDbkIsVUFBTSxjQUFjO0FBQUEsTUFDbEIsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLFlBQVk7QUFDcEIseUJBQWlCLE9BQU87QUFDeEIsMEJBQWtCLE9BQU87QUFBQSxNQUMzQjtBQUFBLE1BQ0EscUJBQXFCLEtBQUsscUJBQXFCLGlCQUFpQjtBQUFBLElBQ2xFLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxlQUFlLFlBQVksQ0FBQztBQUVoQyxRQUFNLG1CQUFtQixLQUFLLGtCQUFrQixTQUFTO0FBQ3pELFFBQU0sa0JBQWtCLE1BQU0sY0FBYyxLQUFLLGNBQWMsUUFBUTtBQUN2RSxRQUFNLG1CQUFtQixlQUNyQixtQkFDQSxDQUFDLGdCQUFnQixnQkFDZixLQUFLLGFBQWEsSUFBSSxJQUN0QixNQUFNLGVBQWUsS0FBSyxlQUFlLElBQUk7QUFFbkQsUUFBTSwrQkFBMkIsNEJBQVksTUFBTTtBQUNqRCxRQUFJLENBQUMsZ0JBQWdCLGVBQWU7QUFDbEMsbUJBQWE7QUFDYjtBQUFBLElBQ0Y7QUFDQSxTQUFLLG1CQUFtQjtBQUFBLEVBQzFCLEdBQUcsQ0FBQyxjQUFjLG9CQUFvQixjQUFjLGFBQWEsQ0FBQztBQUVsRSxRQUFNLHVCQUFtQjtBQUFBLElBQ3ZCLENBQUMsY0FBc0I7QUFDckIsWUFBTSxTQUFTLFNBQVMsU0FBUztBQUNqQyxVQUFJLENBQUMsT0FBUTtBQUViLFlBQU0sV0FBVyxrQkFBa0I7QUFDbkMsWUFBTSxlQUFlO0FBQUEsUUFDbkIsU0FBUztBQUFBLFFBQ1QsTUFBTSxjQUFjLElBQUksSUFBSTtBQUFBLFFBQzVCLFNBQVMsT0FBTyxXQUFXLGNBQWMsT0FBTyxXQUFXLElBQUk7QUFBQSxRQUMvRCxhQUFhO0FBQUEsUUFDYjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxpQkFBaUIsYUFBYSxjQUFjO0FBQUEsUUFDNUM7QUFBQSxRQUNBO0FBQUEsUUFDQSwwQkFBMEI7QUFBQSxRQUMxQix3QkFBd0I7QUFBQSxNQUMxQjtBQUVBLFVBQUksWUFBWTtBQUNkLHdCQUFnQixZQUFZO0FBQzVCLHlDQUFpQztBQUFBLFVBQy9CLFNBQVM7QUFBQSxVQUNULE1BQU0sYUFBYTtBQUFBLFVBQ25CLFNBQVMsYUFBYTtBQUFBLFVBQ3RCLGFBQWE7QUFBQSxVQUNiLFNBQVM7QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBLDBCQUEwQjtBQUFBLFVBQzFCLHdCQUF3QjtBQUFBLFFBQzFCLENBQUM7QUFDRCxjQUFNLFFBQVEsSUFBSSxnQkFBZ0I7QUFBQSxVQUNoQztBQUFBLFFBQ0YsQ0FBQztBQUNELFlBQUkseUJBQXlCLG1CQUFtQjtBQUM5Qyx5Q0FBK0I7QUFBQSxZQUM3QjtBQUFBLFlBQ0EsU0FBUztBQUFBLFlBQ1QsUUFBUTtBQUFBLFVBQ1YsQ0FBQztBQUNELGdCQUFNLElBQUksVUFBVSxpQkFBaUI7QUFDckMsZ0JBQU0sSUFBSSxXQUFXLFdBQVc7QUFBQSxRQUNsQztBQUNBLDZCQUFxQix3QkFBd0IsTUFBTSxTQUFTLENBQUMsSUFBSTtBQUFBLFVBQy9ELGlCQUFpQjtBQUFBLFVBQ2pCLGlCQUFpQjtBQUFBLFFBQ25CLENBQUM7QUFDRDtBQUFBLE1BQ0Y7QUFFQSxzQkFBZ0IsWUFBWTtBQUM1QixVQUFJLHlCQUF5QixtQkFBbUI7QUFDOUMsdUNBQStCO0FBQUEsVUFDN0I7QUFBQSxVQUNBLFNBQVM7QUFBQSxVQUNULFFBQVE7QUFBQSxRQUNWLENBQUM7QUFDRCxjQUFNLFFBQVEsSUFBSSxnQkFBZ0I7QUFBQSxVQUNoQztBQUFBLFVBQ0EsUUFBUTtBQUFBLFVBQ1IsU0FBUztBQUFBLFFBQ1gsQ0FBQztBQUNELDZCQUFxQix3QkFBd0IsTUFBTSxTQUFTLENBQUMsSUFBSTtBQUFBLFVBQy9ELGlCQUFpQjtBQUFBLFVBQ2pCLGlCQUFpQjtBQUFBLFFBQ25CLENBQUM7QUFDRDtBQUFBLE1BQ0Y7QUFFQSxzQ0FBZ0M7QUFDaEMsMkJBQXFCLCtCQUErQixtQkFBbUIsTUFBTSxDQUFDLElBQUk7QUFBQSxRQUNoRixpQkFBaUI7QUFBQSxRQUNqQixpQkFBaUI7QUFBQSxNQUNuQixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLDJCQUF1Qiw0QkFBWSxDQUFDLFdBQStCO0FBQ3ZFLFVBQU0sT0FBTztBQUNiLFFBQUksQ0FBQyxRQUFRLE9BQU8sS0FBSyxZQUFZLFdBQVksUUFBTztBQUN4RCxVQUFNLE9BQU8sS0FBSyxRQUFxQiwyQkFBMkI7QUFDbEUsUUFBSSxDQUFDLEtBQU0sUUFBTztBQUNsQixRQUFJLENBQUMscUJBQXFCLFNBQVMsU0FBUyxJQUFJLEVBQUcsUUFBTztBQUMxRCxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsQ0FBQztBQUVMLHlCQUF1QjtBQUFBLElBQ3JCLGNBQWM7QUFBQSxJQUNkO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLGFBQWEsS0FBSyxNQUFNLFNBQVMsS0FBSyxTQUFTO0FBQ3JELFFBQU0sa0JBQWtCO0FBQ3hCLFFBQU0sbUNBQW1DLGdCQUFnQixpQkFBaUI7QUFFMUUsUUFBTSxtQkFBZSx3QkFBUSxNQUFNO0FBQ2pDLFVBQU0sV0FBVztBQUNqQixRQUFJLENBQUMsU0FBVSxRQUFPLENBQUM7QUFFdkIsVUFBTSxVQUFnRSxDQUFDO0FBQ3ZFLFVBQU0sU0FBUyxVQUFVLGlCQUFpQixRQUFRO0FBQ2xELFVBQU0sZUFBZSx5QkFBeUIsU0FBUyxVQUFVLFFBQVEsRUFBRTtBQUMzRSxVQUFNLGFBQWEseUJBQXlCLFNBQVMsUUFBUSxRQUFRLEVBQUU7QUFFdkUsUUFBSSxnQkFBZ0IsWUFBWTtBQUM5QixjQUFRLEtBQUs7QUFBQSxRQUNYLEtBQUs7QUFBQSxRQUNMLE9BQU8sS0FBSyxnQkFBZ0IsTUFBTTtBQUFBLFFBQ2xDLE9BQU8sZ0JBQWdCO0FBQUEsTUFDekIsQ0FBQztBQUNELGNBQVEsS0FBSztBQUFBLFFBQ1gsS0FBSztBQUFBLFFBQ0wsT0FBTyxLQUFLLGNBQWMsSUFBSTtBQUFBLFFBQzlCLE9BQU8sY0FBYztBQUFBLE1BQ3ZCLENBQUM7QUFBQSxJQUNIO0FBRUEsUUFBSSxTQUFTLFVBQVUsS0FBSyxHQUFHO0FBQzdCLGNBQVEsS0FBSztBQUFBLFFBQ1gsS0FBSztBQUFBLFFBQ0wsT0FBTyxLQUFLLDRCQUE0QixRQUFRO0FBQUEsUUFDaEQsT0FBTyxTQUFTLFVBQVUsS0FBSztBQUFBLE1BQ2pDLENBQUM7QUFBQSxJQUNIO0FBRUEsUUFBSSxTQUFTLGFBQWEsS0FBSyxHQUFHO0FBQ2hDLGNBQVEsS0FBSztBQUFBLFFBQ1gsS0FBSztBQUFBLFFBQ0wsT0FBTyxLQUFLLGlDQUFpQyxVQUFVO0FBQUEsUUFDdkQsT0FBTyxTQUFTLGFBQWEsS0FBSztBQUFBLE1BQ3BDLENBQUM7QUFBQSxJQUNIO0FBRUEsUUFBSSxTQUFTLGlCQUFpQixJQUFJO0FBQ2hDLGNBQVEsS0FBSztBQUFBLFFBQ1gsS0FBSztBQUFBLFFBQ0wsT0FBTyxLQUFLLHlCQUF5QixRQUFRO0FBQUEsUUFDN0MsT0FBTyw0QkFBNEIsU0FBUyxZQUFZO0FBQUEsTUFDMUQsQ0FBQztBQUFBLElBQ0g7QUFFQSxRQUFJLFNBQVMsb0JBQW9CLElBQUk7QUFDbkMsWUFBTSxnQkFBZ0Isa0JBQWtCLElBQUksT0FBTyxTQUFTLGVBQWUsQ0FBQyxLQUFLLE9BQU8sU0FBUyxlQUFlO0FBQ2hILGNBQVEsS0FBSztBQUFBLFFBQ1gsS0FBSztBQUFBLFFBQ0wsT0FBTyxLQUFLLDJCQUEyQixVQUFVO0FBQUEsUUFDakQsT0FBTztBQUFBLE1BQ1QsQ0FBQztBQUFBLElBQ0g7QUFFQSxRQUFJLFNBQVMsd0JBQXdCLE9BQU87QUFDMUMsY0FBUSxLQUFLO0FBQUEsUUFDWCxLQUFLO0FBQUEsUUFDTCxPQUFPLEtBQUssZ0NBQWdDLGlCQUFpQjtBQUFBLFFBQzdELE9BQ0UsU0FBUyx3QkFBd0IsUUFDN0IsS0FBSyxvQ0FBb0MsS0FBSyxJQUM5QyxLQUFLLG1DQUFtQyxJQUFJO0FBQUEsTUFDcEQsQ0FBQztBQUFBLElBQ0g7QUFFQSxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsZ0JBQWdCLGlCQUFpQixDQUFDO0FBRXRDLFFBQU0sY0FBYyxDQUFDLGNBQWMsQ0FBQyxlQUFlLGFBQWEsU0FBUztBQUV6RSxnQ0FBVSxNQUFNO0FBQ2QsUUFBSSxDQUFDLFdBQVk7QUFDakIsOEJBQTBCO0FBQUEsTUFDeEIsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLElBQ1gsQ0FBQztBQUNELFdBQU8sTUFBTTtBQUNYLGtDQUE0QjtBQUFBLElBQzlCO0FBQUEsRUFDRixHQUFHLENBQUMsWUFBWSxxQkFBcUIsQ0FBQztBQUV0QyxnQ0FBVSxNQUFNO0FBQ2QsMEJBQXNCLDRCQUE0QjtBQUFBLE1BQ2hELEtBQUssT0FBTyxXQUFXLGNBQWMsT0FBTyxTQUFTLE9BQU87QUFBQSxNQUM1RCxtQkFBbUIscUJBQXFCO0FBQUEsTUFDeEM7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUNELFFBQUkscUJBQXFCLFNBQVM7QUFDaEMsNEJBQXNCLDBDQUEwQztBQUNoRTtBQUFBLElBQ0Y7QUFDQSxRQUFJLENBQUMsV0FBVztBQUNkLDRCQUFzQixtQ0FBbUM7QUFDekQ7QUFBQSxJQUNGO0FBRUEsUUFBSSxDQUFDLFlBQVk7QUFDZixZQUFNLE1BQU0sSUFBSSxJQUFJLE9BQU8sU0FBUyxJQUFJO0FBQ3hDLFlBQU0sZUFBZSxTQUFTLElBQUksYUFBYSxJQUFJLGNBQWMsQ0FBQztBQUNsRSxVQUFJLGNBQWM7QUFDaEIsOEJBQXNCLG9EQUFvRDtBQUFBLFVBQ3hFO0FBQUEsVUFDQSxZQUFZLElBQUksYUFBYSxJQUFJLFlBQVk7QUFBQSxRQUMvQyxDQUFDO0FBQ0QsNkJBQXFCLFVBQVU7QUFDL0IsaUNBQXlCLGNBQWMsSUFBSSxhQUFhLElBQUksWUFBWSxDQUFDO0FBQ3pFO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxRQUFJLENBQUMsMEJBQTBCO0FBQzdCLDRCQUFzQixpREFBaUQ7QUFDdkU7QUFBQSxJQUNGO0FBQ0EseUJBQXFCLFVBQVU7QUFDL0IsVUFBTSx1QkFBdUIsc0NBQXNDO0FBQ25FLFVBQU0sMkJBQTJCLHlCQUF5QjtBQUFBLE1BQ3hEO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUNELFVBQU0sYUFBYSxrQkFBa0I7QUFDckMsVUFBTSxnQkFBZ0Isa0JBQWtCO0FBRXhDLDBCQUFzQiw0Q0FBNEM7QUFBQSxNQUNoRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFFRCxRQUFJLGVBQWUsbUJBQW1CLGVBQWU7QUFDbkQsNEJBQXNCLDBDQUEwQztBQUNoRSwrQkFBeUI7QUFDekI7QUFBQSxJQUNGO0FBRUEsUUFBSSxZQUFZO0FBQ2QsWUFBTSx3QkFBd0IsaUJBQWlCLHdCQUF3QjtBQUN2RSxZQUFNQyxlQUFjLHdCQUF3QixnQkFBZ0IsSUFBSTtBQUNoRSxZQUFNLGdCQUFnQixTQUFTQSxjQUFhLGVBQWU7QUFDM0QsVUFBSUEsZ0JBQWUsaUJBQWlCLGtCQUFrQixTQUFTLFdBQVcsR0FBRztBQUMzRSw4QkFBc0IsOENBQThDO0FBQUEsVUFDbEU7QUFBQSxVQUNBLE1BQU1BLGFBQVk7QUFBQSxRQUNwQixDQUFDO0FBQ0QsMENBQWtDO0FBQ2xDLG1DQUEyQkEsWUFBVztBQUN0QztBQUFBLE1BQ0Y7QUFFQSxZQUFNLGtCQUFrQix3QkFBd0IsaUNBQWlDLFdBQVcsSUFBSTtBQUNoRyxVQUFJLGlCQUFpQjtBQUNuQiw4QkFBc0IscURBQXFEO0FBQUEsVUFDekUsU0FBUyxnQkFBZ0I7QUFBQSxVQUN6QixNQUFNLGdCQUFnQjtBQUFBLFFBQ3hCLENBQUM7QUFDRCwwQ0FBa0M7QUFDbEMsbUNBQTJCO0FBQUEsVUFDekIsU0FBUyxnQkFBZ0I7QUFBQSxVQUN6QixNQUFNLGdCQUFnQjtBQUFBLFVBQ3RCLFNBQVMsZ0JBQWdCO0FBQUEsVUFDekIsYUFBYSxnQkFBZ0I7QUFBQSxVQUM3QixPQUFPLENBQUM7QUFBQSxVQUNSLGlCQUFpQixnQkFBZ0I7QUFBQSxVQUNqQyxPQUFPO0FBQUEsVUFDUCxpQkFBaUIsZ0JBQWdCO0FBQUEsVUFDakMsZUFBZSxnQkFBZ0I7QUFBQSxVQUMvQixhQUFhLGdCQUFnQjtBQUFBLFVBQzdCLDBCQUEwQixnQkFBZ0I7QUFBQSxVQUMxQyx3QkFBd0IsZ0JBQWdCO0FBQUEsUUFDMUMsQ0FBQztBQUNEO0FBQUEsTUFDRjtBQUVBLDRCQUFzQiw4Q0FBOEM7QUFDcEUsa0NBQTRCO0FBQzVCO0FBQUEsSUFDRjtBQUVBLFFBQUksQ0FBQyxpQkFBaUIsQ0FBQyx3QkFBd0IsQ0FBQywwQkFBMEI7QUFDeEUsNEJBQXNCLGtEQUFrRDtBQUN4RSx1QkFBaUI7QUFDakI7QUFBQSxJQUNGO0FBRUEsVUFBTSxjQUFjLGdCQUFnQjtBQUNwQyxRQUFJLENBQUMsYUFBYTtBQUNoQiw0QkFBc0Isb0NBQW9DO0FBQzFELHVCQUFpQjtBQUNqQjtBQUFBLElBQ0Y7QUFFQSwwQkFBc0IsNkNBQTZDO0FBQUEsTUFDakUsTUFBTSxZQUFZO0FBQUEsTUFDbEIsYUFBYSxZQUFZO0FBQUEsSUFDM0IsQ0FBQztBQUNELCtCQUEyQixXQUFXO0FBQUEsRUFDeEMsR0FBRztBQUFBLElBQ0Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELGdDQUFVLE1BQU07QUFDZCxRQUFJLFVBQVc7QUFDZixRQUFJLHdCQUF3QixXQUFXLFFBQVEsQ0FBQyxzQkFBc0IsUUFBUztBQUUvRSxVQUFNLGlCQUFpQix3QkFBd0I7QUFDL0MsVUFBTSxxQkFBcUIsc0JBQXNCO0FBQ2pELDRCQUF3QixVQUFVO0FBQ2xDLDBCQUFzQixVQUFVO0FBRWhDLFdBQU8sc0JBQXNCLE1BQU07QUFDakMsVUFBSSxrQkFBa0IsTUFBTTtBQUMxQixlQUFPLFNBQVM7QUFBQSxVQUNkLEtBQUssS0FBSyxJQUFJLEdBQUcsY0FBYztBQUFBLFVBQy9CLFVBQVU7QUFBQSxRQUNaLENBQUM7QUFBQSxNQUNIO0FBRUEsVUFBSSxDQUFDLHNCQUFzQixDQUFDLHFCQUFxQixRQUFTO0FBRTFELFlBQU0sb0JBQW9CLG1CQUFtQixZQUFZO0FBQ3pELFlBQU0sZ0JBQWdCLE1BQU07QUFBQSxRQUMxQixxQkFBcUIsUUFBUSxpQkFBOEIscUNBQXFDO0FBQUEsTUFDbEc7QUFDQSxZQUFNLGVBQWUsY0FBYyxLQUFLLENBQUMsU0FBUztBQUNoRCxlQUFPLFNBQVMsS0FBSyxRQUFRLFlBQVksRUFBRSxZQUFZLE1BQU07QUFBQSxNQUMvRCxDQUFDO0FBQ0QsWUFBTSxhQUFhLGNBQWMsY0FBMkIsMkJBQTJCO0FBQ3ZGLFVBQUksQ0FBQyxXQUFZO0FBRWpCLGlCQUFXLE1BQU0sRUFBRSxlQUFlLEtBQUssQ0FBQztBQUFBLElBQzFDLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxXQUFXLE1BQU0sTUFBTSxDQUFDO0FBRTVCLGdDQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsNEJBQTRCLENBQUMsVUFBVztBQUU3QyxVQUFNLGlCQUFpQixDQUFDLFVBQStCO0FBQ3JELFVBQUksQ0FBQyxNQUFNLGFBQWEsQ0FBQyxzQ0FBc0MsRUFBRztBQUVsRSxZQUFNLFdBQVcscUJBQXFCO0FBQ3RDLFVBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxZQUFZLENBQUMsU0FBUyxTQUFTO0FBQzNEO0FBQUEsTUFDRjtBQUVBLDJCQUFxQixjQUFjLElBQUksSUFBSSxhQUFhLFVBQVU7QUFBQSxRQUNoRSxZQUFZO0FBQUEsTUFDZCxDQUFDO0FBQUEsSUFDSDtBQUVBLFdBQU8saUJBQWlCLFlBQVksY0FBYztBQUNsRCxXQUFPLE1BQU07QUFDWCxhQUFPLG9CQUFvQixZQUFZLGNBQWM7QUFBQSxJQUN2RDtBQUFBLEVBQ0YsR0FBRyxDQUFDLGFBQWEsV0FBVyxZQUFZLDBCQUEwQixzQkFBc0Isb0JBQW9CLENBQUM7QUFFN0csZ0NBQVUsTUFBTTtBQUNkLFVBQU0sa0JBQWtCLE1BQU07QUFDNUIsWUFBTSxXQUFXLENBQUM7QUFDbEIsd0JBQWtCO0FBQ2xCLFVBQUksVUFBVTtBQUNaLGVBQU8sU0FBUyxFQUFFLEtBQUssR0FBRyxVQUFVLFNBQVMsQ0FBQztBQUFBLE1BQ2hEO0FBQUEsSUFDRjtBQUVBLFVBQU0sWUFBWSxNQUFNO0FBQ3RCLFlBQU0sV0FBVyxxQkFBcUI7QUFDdEMsVUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLFlBQVksQ0FBQyxVQUFVLFNBQVM7QUFDN0Q7QUFBQSxNQUNGO0FBQ0EsV0FBSyxTQUFTLGNBQWMsSUFBSSxJQUFJLGFBQWEsUUFBUTtBQUFBLElBQzNEO0FBRUEsV0FBTyxpQkFBaUIsaUNBQWlDLGVBQWU7QUFDeEUsV0FBTyxpQkFBaUIsMkJBQTJCLFNBQVM7QUFFNUQsV0FBTyxNQUFNO0FBQ1gsYUFBTyxvQkFBb0IsaUNBQWlDLGVBQWU7QUFDM0UsYUFBTyxvQkFBb0IsMkJBQTJCLFNBQVM7QUFBQSxJQUNqRTtBQUFBLEVBQ0YsR0FBRyxDQUFDLGFBQWEsWUFBWSxVQUFVLHNCQUFzQixhQUFhLGlCQUFpQixDQUFDO0FBRTVGLFNBQ0UsOENBQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsTUFBTSxNQUFNO0FBQUEsUUFDWixPQUFPLE1BQU07QUFBQSxRQUNiLFNBQVMsTUFBTTtBQUFBLFFBQ2YsYUFBYTtBQUFBLFFBQ2IsWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsWUFBWSxNQUFNO0FBQUEsUUFDbEIsYUFBYSxNQUFNO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsV0FBVztBQUFBLFFBQ1gsVUFBVTtBQUFBO0FBQUEsSUFDWjtBQUFBLElBRUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLEtBQUs7QUFBQSxRQUNMLE1BQUs7QUFBQSxRQUNMLFFBQVE7QUFBQSxRQUNSLFNBQVE7QUFBQSxRQUNSLFdBQVU7QUFBQSxRQUNWLFVBQVUsQ0FBQyxVQUFVO0FBQ25CLGdCQUFNLE9BQU8sTUFBTSxjQUFjLFFBQVEsQ0FBQyxLQUFLO0FBQy9DLGdCQUFNLGNBQWMsUUFBUTtBQUM1QixlQUFLLG1CQUFtQixNQUFNLFFBQVE7QUFBQSxRQUN4QztBQUFBO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLEtBQUs7QUFBQSxRQUNMLE1BQUs7QUFBQSxRQUNMLFFBQVE7QUFBQSxRQUNSLFdBQVU7QUFBQSxRQUNWLFVBQVUsQ0FBQyxVQUFVO0FBQ25CLGdCQUFNLE9BQU8sTUFBTSxjQUFjLFFBQVEsQ0FBQyxLQUFLO0FBQy9DLGdCQUFNLGNBQWMsUUFBUTtBQUM1QixlQUFLLG1CQUFtQixNQUFNLFNBQVM7QUFBQSxRQUN6QztBQUFBO0FBQUEsSUFDRjtBQUFBLElBRUMsQ0FBQyxjQUFjLG1CQUNkLDZDQUFDLFNBQUksV0FBVSxxRkFDYix3REFBQyxTQUFJLFdBQVUsOEVBQ2I7QUFBQSxtREFBQyxRQUFHLFdBQVUsNENBQ1gsZUFBSyx3Q0FBd0MsY0FBYyxHQUM5RDtBQUFBLE1BQ0EsNkNBQUMsT0FBRSxXQUFVLCtCQUNWO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxNQUNGLEdBQ0Y7QUFBQSxNQUVBLDhDQUFDLFNBQUksV0FBVSwrQkFDYjtBQUFBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxNQUFLO0FBQUEsWUFDTCxXQUFVO0FBQUEsWUFDVixTQUFTLE1BQU07QUFDYixtQkFBSyxpQkFBaUIsZUFBZSxPQUFPO0FBQUEsWUFDOUM7QUFBQSxZQUVDLGVBQUsseUNBQXlDLGdCQUFhO0FBQUE7QUFBQSxRQUM5RDtBQUFBLFFBQ0E7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLE1BQUs7QUFBQSxZQUNMLFdBQVU7QUFBQSxZQUNWLFNBQVMsTUFBTSxrQkFBa0IsZ0JBQWdCLE9BQU87QUFBQSxZQUV2RCxlQUFLLDBDQUEwQyxlQUFlO0FBQUE7QUFBQSxRQUNqRTtBQUFBLFFBQ0E7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLE1BQUs7QUFBQSxZQUNMLFdBQVU7QUFBQSxZQUNWLFNBQVM7QUFBQSxZQUVSLGVBQUssaUJBQWlCLFFBQVE7QUFBQTtBQUFBLFFBQ2pDO0FBQUEsU0FDRjtBQUFBLE9BQ0YsR0FDRixJQUNFO0FBQUEsSUFFSCxDQUFDLGFBQ0E7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE1BQU07QUFBQSxRQUNOLE9BQU8sS0FBSywwQ0FBMEMsbUJBQW1CO0FBQUEsUUFDekUsU0FBUyw4QkFBOEIsS0FBSyxrQkFBa0IsU0FBUztBQUFBLFFBQ3ZFLFdBQVc7QUFBQSxRQUNYLFFBQVE7QUFBQTtBQUFBLElBQ1YsSUFDRTtBQUFBLElBRUgsQ0FBQyxjQUFjLDBCQUNkO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxXQUNFLDBCQUNJLGlIQUNBO0FBQUEsUUFHTjtBQUFBLHVEQUFDLE9BQUcsbUNBQXdCO0FBQUEsVUFDM0IsdUJBQ0M7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFdBQ0UsMEJBQ0kseUdBQ0E7QUFBQSxjQUdMLHdCQUFjLG9CQUFvQjtBQUFBO0FBQUEsVUFDckMsSUFDRTtBQUFBLFVBQ0gscUJBQXFCLFNBQVMsSUFDN0I7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFdBQ0UsMEJBQ0ksMkVBQ0E7QUFBQSxjQUdMLCtCQUFxQixJQUFJLENBQUMsVUFDekIsNkNBQUMsT0FBcUMsYUFBRyxNQUFNLElBQUksS0FBSyxNQUFNLE9BQU8sTUFBN0QsR0FBRyxNQUFNLElBQUksSUFBSSxNQUFNLEVBQUUsRUFBdUMsQ0FDekU7QUFBQTtBQUFBLFVBQ0gsSUFDRTtBQUFBLFVBQ0osOENBQUMsU0FBSSxXQUFVLHdCQUNaO0FBQUEsc0NBQ0MsNkNBQUMsWUFBTyxNQUFLLFVBQVMsV0FBVSxzQ0FBcUMsU0FBUyxtQkFDM0UsZUFBSyw2Q0FBNkMscUJBQXFCLEdBQzFFLElBQ0U7QUFBQSxZQUNILHdCQUNDO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0MsTUFBSztBQUFBLGdCQUNMLFdBQVU7QUFBQSxnQkFDVixTQUFTLE1BQU07QUFDYix1QkFBSyxtQkFBbUI7QUFBQSxnQkFDMUI7QUFBQSxnQkFFQyxlQUFLLHVDQUF1QyxtQkFBbUI7QUFBQTtBQUFBLFlBQ2xFLElBQ0U7QUFBQSxZQUNKLDZDQUFDLFlBQU8sTUFBSyxVQUFTLFdBQVUsc0NBQXFDLFNBQVMsdUJBQzNFLGVBQUssZ0JBQWdCLE9BQU8sR0FDL0I7QUFBQSxhQUNGO0FBQUE7QUFBQTtBQUFBLElBQ0YsSUFDRTtBQUFBLElBRUgsY0FDQyw2Q0FBQyxTQUFJLFdBQVUseURBQ2IsdURBQUMsU0FBSSxXQUFVLHFHQUNaLHVCQUFhLElBQUksQ0FBQyxTQUNqQjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBRUMsV0FBVTtBQUFBLFFBRVY7QUFBQSx3REFBQyxVQUFLLFdBQVUsK0NBQStDO0FBQUEsaUJBQUs7QUFBQSxZQUFNO0FBQUEsYUFBQztBQUFBLFVBQzNFLDZDQUFDLFVBQUssV0FBVSw2Q0FBNkMsZUFBSyxPQUFNO0FBQUE7QUFBQTtBQUFBLE1BSm5FLEtBQUs7QUFBQSxJQUtaLENBQ0QsR0FDSCxHQUNGLElBQ0U7QUFBQSxJQUVKO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxNQUFNLGFBQWEsU0FBUztBQUFBLFFBQzVCLFNBQVM7QUFBQSxRQUNUO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0Esc0JBQXNCO0FBQUEsUUFDdEI7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxtQkFBbUI7QUFBQSxRQUNuQixzQkFBc0I7QUFBQSxRQUN0Qix1QkFBdUI7QUFBQSxRQUN2QixzQkFBc0I7QUFBQSxRQUN0Qix5QkFBeUI7QUFBQSxRQUN6Qiw2QkFBNkI7QUFBQSxRQUM3QjtBQUFBLFFBQ0E7QUFBQTtBQUFBLElBQ0Y7QUFBQSxJQUVDLGFBQ0MsOENBQUMsU0FBSSxXQUFVLG9CQUNaO0FBQUEsT0FBQyxxQkFDQSw2Q0FBQyxTQUFJLFdBQVUseUJBQXlCLGVBQUssOEJBQThCLGdCQUFnQixHQUFFLElBQzNGO0FBQUEsTUFFSCxzQkFBc0IscUJBQ3JCLDhDQUFDLFNBQUksV0FBVSxrREFDYjtBQUFBLHFEQUFDLG1CQUFRLE1BQUssV0FBVSxPQUFPLEtBQUssa0JBQWtCLFNBQVMsR0FBRztBQUFBLFFBQ2xFLDZDQUFDLFVBQU0sZUFBSyxrQkFBa0IsU0FBUyxHQUFFO0FBQUEsU0FDM0MsSUFDRTtBQUFBLE1BRUgsc0JBQXNCLENBQUMsc0JBQXNCLGdCQUM1Qyw4Q0FBQyxTQUFJLFdBQVUsa0RBQ2I7QUFBQSxxREFBQyxtQkFBUSxNQUFLLFdBQVUsT0FBTyxLQUFLLGtCQUFrQixTQUFTLEdBQUc7QUFBQSxRQUNsRSw2Q0FBQyxVQUFNLGVBQUssa0JBQWtCLFNBQVMsR0FBRTtBQUFBLFNBQzNDLElBQ0U7QUFBQSxNQUVILHNCQUFzQixDQUFDLHNCQUFzQixrQkFDNUMsNkNBQUMsU0FBSSxXQUFVLHlCQUNaLHFDQUNDLEtBQUsseUNBQXlDLDZEQUE2RCxHQUMvRyxJQUNFO0FBQUEsTUFFSCxzQkFBc0IsQ0FBQyxzQkFBc0IsQ0FBQyxtQkFBbUIsaUJBQ2hFLDZDQUFDLFNBQUksV0FBVSx5QkFBeUIsMEJBQWUsSUFDckQ7QUFBQSxNQUVILHNCQUFzQixDQUFDLHNCQUFzQixDQUFDLGtCQUM3Qyw2RUFDRSx3REFBQyxTQUFJLFdBQVUsZ0RBQ2I7QUFBQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsV0FBVTtBQUFBLFlBQ1YsU0FBUyxNQUFNO0FBQ2IsbUJBQUsseUJBQXlCO0FBQUEsWUFDaEM7QUFBQSxZQUNBLFVBQVUsb0NBQW9DLFFBQVE7QUFBQSxZQUVyRCxlQUFLLHFDQUFxQyxrQkFBa0I7QUFBQTtBQUFBLFFBQy9EO0FBQUEsUUFDQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsV0FBVTtBQUFBLFlBQ1YsU0FBUztBQUFBLFlBQ1QsVUFBVSxvQ0FBb0Msc0JBQXNCO0FBQUEsWUFFbkUsZUFBSyxvQ0FBb0MscUJBQWtCO0FBQUE7QUFBQSxRQUM5RDtBQUFBLFNBQ0YsR0FDRixJQUNFO0FBQUEsT0FDTixJQUNFO0FBQUEsSUFFSCxhQUFhLDZDQUFDLHdDQUE2QixRQUFRLGdCQUFnQixJQUFLO0FBQUEsSUFFekU7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVU7QUFBQSxRQUNWLE9BQU8sRUFBRSxTQUFTLGtCQUFrQixTQUFTLE9BQU87QUFBQSxRQUVwRDtBQUFBLHVEQUFDLFNBQUksV0FBVSx1QkFBc0IsU0FBUSxhQUFZLE1BQUssVUFBUyxjQUFZLEtBQUssa0JBQWtCLFNBQVMsR0FDakgsdURBQUMsWUFBTyxXQUFVLHVCQUFzQixJQUFHLE1BQUssSUFBRyxNQUFLLEdBQUUsS0FBSSxhQUFZLEtBQUksR0FDaEY7QUFBQSxVQUNDLEtBQUssa0JBQWtCLFNBQVM7QUFBQTtBQUFBO0FBQUEsSUFDbkM7QUFBQSxJQUVDLGVBQWUsNkNBQUMsU0FBSSxXQUFVLGVBQWUsd0JBQWEsSUFBUztBQUFBLElBRW5FLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLE1BQU0sV0FBVyxJQUNyRCw2Q0FBQyxTQUFJLFdBQVUsK0JBQThCLG1CQUFpQixLQUFLLGlCQUFpQixTQUFTLEdBQUcsSUFDOUY7QUFBQSxJQUVILENBQUMsZ0JBQWdCLE1BQU0sU0FBUyxJQUMvQiw2Q0FBQyxTQUFJLEtBQUssc0JBQXNCLFdBQVUsZ0JBQ3ZDLGdCQUFNLElBQUksQ0FBQyxTQUFTO0FBQ25CLFlBQU0sU0FBUyxTQUFTLEtBQUssTUFBTTtBQUNuQyxZQUFNLFlBQVksdUJBQXVCLEtBQUssV0FBVyxVQUFVLGlCQUFpQixRQUFRLE9BQU87QUFDbkcsWUFBTSxRQUFRLFNBQVMsS0FBSyxXQUFXLEtBQUssU0FBUyxLQUFLLFFBQVEsS0FBSyxVQUFVO0FBQ2pGLFlBQU0sYUFBYSx5QkFBeUIsS0FBSyxlQUFlLE1BQU0sU0FBUyxLQUFLLFlBQVksQ0FBQztBQUNqRyxZQUFNLGFBQWEsS0FBSyxTQUFTLFlBQVksS0FBSyxTQUFTO0FBQzNELFlBQU0sY0FBYyxlQUFlLE9BQU8sU0FBWSw0QkFBNEIsVUFBVTtBQUM1RixZQUFNLDJCQUEyQixlQUFlO0FBQ2hELFlBQU0sd0JBQXdCLEtBQUssa0JBQWtCO0FBQ3JELFlBQU0seUJBQXlCLGNBQWMsdUJBQXVCLElBQUk7QUFDeEUsWUFBTSx1QkFBdUIsY0FBYyxxQkFBcUIsTUFBTTtBQUN0RSxZQUFNLHFCQUFxQixLQUFLLGdDQUFnQyxpQkFBaUI7QUFDakYsWUFBTSxvQkFBb0IsS0FBSyx3Q0FBd0Msb0JBQW9CO0FBQzNGLFlBQU0sZ0JBQWdCLEtBQUssY0FBYyxPQUFPLEtBQUssT0FBTyxLQUFLLFNBQVM7QUFDMUUsWUFBTSxpQkFBaUIsZ0JBQ25CLGtCQUFrQixJQUFJLGFBQWEsS0FBSyxnQkFDeEMsS0FBSyx1QkFBdUIsS0FBSztBQUNyQyxZQUFNLGVBQWU7QUFDckIsWUFBTSxnQkFDSixVQUNBLEdBQUcsU0FBUyxLQUFLLFFBQVEsQ0FBQyxJQUFJLFNBQVMsS0FBSyxTQUFTLENBQUMsSUFBSSxTQUFTLEtBQUssV0FBVyxDQUFDLElBQUksT0FBTyxLQUFLLGVBQWUsRUFBRSxDQUFDO0FBRXhILFVBQUksY0FBYyxLQUFLLFNBQVMsUUFBUTtBQUN0QyxlQUNFO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFFQztBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQSxVQUFVO0FBQUEsWUFDVjtBQUFBLFlBQ0EsWUFBWTtBQUFBLFlBQ1osY0FBYztBQUFBLFlBQ2QsbUJBQW1CLGdCQUFnQixzQkFBc0I7QUFBQSxZQUN6RCxhQUFhO0FBQUEsWUFDYixjQUFjLE1BQU0saUJBQWlCLE1BQU07QUFBQSxZQUMzQyxnQkFBZ0IsTUFBTSxzQkFBc0IsSUFBSTtBQUFBO0FBQUEsVUFYM0M7QUFBQSxRQVlQO0FBQUEsTUFFSjtBQUVBLFlBQU0sa0JBQWtCLDRCQUE0Qix3QkFDbEQsOEVBQ0c7QUFBQSxtQ0FDQyw2Q0FBQyxVQUFLLFdBQVUsb0NBQW1DLE1BQUssT0FBTSxjQUFZLGFBQ3hFLHVEQUFDLFNBQUksT0FBTSw4QkFBNkIsTUFBSyxRQUFPLFNBQVEsYUFBWSxhQUFhLEtBQUssUUFBTyxnQkFBZSxXQUFVLFdBQ3hIO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxlQUFjO0FBQUEsWUFDZCxnQkFBZTtBQUFBLFlBQ2YsR0FBRTtBQUFBO0FBQUEsUUFDSixHQUNGLEdBQ0YsSUFDRTtBQUFBLFFBQ0gsd0JBQ0M7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLFdBQVU7QUFBQSxZQUNWLE1BQUs7QUFBQSxZQUNMLGNBQVk7QUFBQSxZQUVaLHdEQUFDLFNBQUksT0FBTSw4QkFBNkIsTUFBSyxRQUFPLFNBQVEsYUFBWSxhQUFhLEtBQUssUUFBTyxnQkFBZSxXQUFVLFdBQ3hIO0FBQUEsMkRBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLG1CQUFrQjtBQUFBLGNBQ3ZFLDZDQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSxXQUFVO0FBQUEsY0FDL0QsNkNBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLFdBQVU7QUFBQSxjQUMvRCw2Q0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsWUFBVztBQUFBLGNBQ2hFLDZDQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSxZQUFXO0FBQUEsZUFDbEU7QUFBQTtBQUFBLFFBQ0YsSUFDRTtBQUFBLFNBQ04sSUFDRTtBQUVKLGFBQ0U7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUVDLFdBQVU7QUFBQSxVQUNWLHVCQUFxQixVQUFVO0FBQUEsVUFFL0I7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDO0FBQUEsY0FDQTtBQUFBLGNBQ0EsVUFBVTtBQUFBLGNBQ1Y7QUFBQSxjQUNBLFFBQVEsTUFBTSxpQkFBaUIsTUFBTTtBQUFBLGNBQ3JDLGdCQUFlO0FBQUEsY0FDZjtBQUFBLGNBQ0EsWUFBWTtBQUFBLGNBQ1oscUJBQW9CO0FBQUE7QUFBQSxVQUN0QjtBQUFBO0FBQUEsUUFkSztBQUFBLE1BZVA7QUFBQSxJQUVKLENBQUMsR0FDSCxJQUNFO0FBQUEsSUFFSjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsUUFDQSxTQUFTO0FBQUEsUUFDVCxjQUFjLENBQUMsU0FBUztBQUN0QixnQkFBTSxXQUFXLHFCQUFxQjtBQUN0QyxjQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsWUFBWSxDQUFDLFVBQVUsU0FBUztBQUM3RDtBQUFBLFVBQ0Y7QUFFQSxlQUFLLFNBQVMsTUFBTSxRQUFRO0FBQUEsUUFDOUI7QUFBQSxRQUNBLFFBQVE7QUFBQTtBQUFBLElBQ1Y7QUFBQSxJQUVDLGNBQWMsc0JBQXNCLENBQUMsc0JBQXNCLENBQUMsa0JBQzNELDZDQUFDLDZCQUFrQixXQUFXLEtBQUssc0NBQXNDLG9CQUFvQixHQUMzRjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTyxLQUFLLHNDQUFzQyxvQkFBb0I7QUFBQSxRQUN0RSxTQUFTO0FBQUEsUUFDVCxVQUFVLGdCQUFnQixpQkFBaUIsc0JBQXNCO0FBQUE7QUFBQSxJQUNuRSxHQUNGLElBQ0U7QUFBQSxJQUVILG1CQUFtQixDQUFDLGFBQ25CO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxXQUFXLEtBQUssNkJBQTZCLHFCQUFrQjtBQUFBLFFBQy9ELE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLGVBQWUsS0FBSyw2QkFBNkIscUJBQWtCO0FBQUEsUUFDbkUsV0FBVztBQUFBO0FBQUEsSUFDYixJQUNFO0FBQUEsS0FDTjtBQUVKO0FBR0EsSUFBTSxxQkFBcUIsTUFBTTtBQUMvQixTQUNFLDZDQUFDLGdDQUFxQix5QkFBdUIsTUFDM0MsdURBQUMsNkJBQTBCLEdBQzdCO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxzQkFBc0I7QUFDN0QsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQyxzQkFBbUIsQ0FBRTtBQUNqRDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sNkJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAibm9ybWFsaXplRmlsZUlkIiwgIm5vcm1hbGl6ZVNlbGVjdGlvbk1vZGUiLCAibm9ybWFsaXplRXhjbHVkZWRJZHMiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiLCAiaXNMaW5rTW9kZSIsICJjYWNoZWRTdGF0ZSJdCn0K
