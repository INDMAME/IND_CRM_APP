import {
  ExpenseDateRangeFilter_default,
  ExpenseFilterActions_default,
  ExpenseManagedUserFilterSelect_default,
  ExpenseQuickDateFilters_default,
  buildExpenseTicketLinkBulkFilters,
  buildExpenseTicketLinkListPayload,
  buildExpenseTicketListPayload,
  hasExpenseReturnReferrer,
  isExpenseHistoryBackForwardNavigation,
  resolveExpenseQuickDateFilterFromRange
} from "./chunks/chunk-SXSHZWQU.js";
import {
  CheckIcon_default
} from "./chunks/chunk-SZH7644I.js";
import {
  HistorySummary_default
} from "./chunks/chunk-KXW5U6SP.js";
import "./chunks/chunk-DG56V5LO.js";
import {
  getExpenseTicketStatusFilterOptions,
  getExpenseTicketStatusLabel,
  normalizeExpenseTicketFilterSnapshot,
  normalizeExpenseTicketStatusFilterCode,
  useExpenseTicketsFilterCache
} from "./chunks/chunk-KSHBY5Q3.js";
import {
  ExpenseCurrencyFilterSelect_default
} from "./chunks/chunk-NQ4U2E7D.js";
import {
  useExpenseTicketLinkSheetGate
} from "./chunks/chunk-HTWIUBNH.js";
import {
  isExpenseAbortLikeError,
  runExpenseReadRequestWithRetry
} from "./chunks/chunk-2H26NNTY.js";
import {
  ExpenseQuickTicketProgressOverlay_default,
  PageBottomActionButton,
  PageBottomActions_default,
  TICKET_IMAGE_ACCEPT_ATTRIBUTE,
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-6XXQ6TON.js";
import "./chunks/chunk-M3X3ULOE.js";
import "./chunks/chunk-CI3J3X7E.js";
import {
  ExpenseTimelineCard_default,
  RemoteSearchCombobox_default
} from "./chunks/chunk-KLQHZ5CJ.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-LZSH3IN4.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-GLDIL3AG.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-SSILOGLX.js";
import {
  EXPENSE_TICKET_LINK_FAILURE_REPAIR_INTENT,
  buildExpenseSheetDetailUrl,
  clearExpenseTicketReturnContext,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-COCWZQGI.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-SMHFZFDC.js";
import {
  flashActionMark
} from "./chunks/chunk-CBDB7NMA.js";
import {
  clearExpenseNavigationGuard,
  formatAmountWithCurrency,
  navigateToExpenseUrl,
  setExpenseNavigationGuard
} from "./chunks/chunk-DDCTTA2H.js";
import {
  configureExpenseApiAuth,
  fetchExpenseSheetTicketLinkList,
  fetchExpenseSheetTicketsList,
  formatExpenseDateParts,
  formatExpenseDisplayDate,
  getExpenseSheetDefaultCurrencyCode,
  getVisibleReimbursableTotal,
  linkExpenseSheetTicketsBulk,
  safeText,
  startOfDay,
  toIsoDate
} from "./chunks/chunk-63PNSQ5Z.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-4B23OARV.js";
import {
  clearExpenseActingUserOverride,
  getExpenseGastoTypeOptions,
  getExpenseScopeToken,
  setExpenseActingUserOverride,
  toExpenseGastoTypeCode
} from "./chunks/chunk-UYN2TXUI.js";
import {
  setTopbarActionGroupReady
} from "./chunks/chunk-ZBKHPZJX.js";
import "./chunks/chunk-DY2B5JHI.js";
import {
  Spinner_default,
  canAccess,
  showPermissionModal
} from "./chunks/chunk-UNQYUM6B.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-2NKOKBT5.js";
import {
  ApiFetchError,
  indT
} from "./chunks/chunk-PNIKV5DC.js";
import {
  getSessionJsonWithExpiry,
  removeSessionValueWithExpiry,
  setSessionJsonWithExpiry
} from "./chunks/chunk-6HGCHSZG.js";
import {
  __toESM
} from "./chunks/chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/pages/gastos/tickets/ExpenseTicketsPage.tsx
var import_react9 = __toESM(require_react());

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
      className: isSelected ? "timeline-item rounded-[var(--radius-xl)] ring-2 ring-primary/30" : "timeline-item",
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
            className: "group absolute inset-y-0 right-0 z-10 flex w-[4.25rem] items-start justify-end rounded-r-[var(--radius-xl)] bg-transparent p-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 disabled:cursor-not-allowed sm:w-[4.75rem]",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "span",
              {
                className: `flex h-[30px] w-[30px] items-center justify-center rounded-[var(--radius-xl)] border transition ${selectionIndicatorToneClassName}`,
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `rounded-[var(--radius-xl)] border p-3 ${toneClassName}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sm font-semibold", children: title }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mt-2 space-y-2", children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "div",
      {
        className: "rounded-[var(--radius-xl)] border border-current/15 bg-white/80 p-2 text-xs",
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "glass-panel shadow-card space-y-3 rounded-[var(--radius-xl)] border border-slate-200 bg-white/95 p-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sm font-semibold text-slate-900", children: indT("ExpenseTickets_LinkMode_ResultTitle", "Resultado de vinculaci\xF3n") }),
      result.expenseSheetId ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "mt-1 text-xs text-slate-600", children: [
        indT("ExpenseSheets_Filter_Sheet", "Expense sheet"),
        ": ",
        result.expenseSheetId
      ] }) : null
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-4", children: summaryRows.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "rounded-[var(--radius-xl)] border border-slate-200 bg-slate-50 px-3 py-2 text-center", children: [
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
          className: "w-full rounded-[var(--radius-xl)] border border-slate-200 px-3 py-2 text-sm sm:text-base leading-5 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary",
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
  currentAxUserId,
  currentUserName,
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
          currentAxUserId,
          currentUserName,
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
      const restoredQuickFilter = resolveExpenseQuickDateFilterFromRange(normalized.fromDate, normalized.toDate);
      setFromDate(normalized.fromDate);
      setToDate(normalized.toDate);
      setFilterKey(normalized.filterKey);
      setCurrencyCode(normalized.currencyCode);
      setManagedUserId(restoredManagedUserId);
      setStatusFilterRaw(normalizedStatusFilter);
      setGastoTypeFilter(normalized.gastoTypeFilter);
      setProcessedByIaFilter(normalized.processedByIaFilter);
      setActiveQuickFilter(restoredQuickFilter);
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
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
};
var toNullableTicketGastoType = (value) => {
  return toExpenseGastoTypeCode(value);
};
var mapTicketItemToCard = (item) => {
  return {
    kind: "general",
    fileId: String(item?.FileId || "").trim(),
    description: String(item?.Description || "").trim(),
    status: toNullableTicketStatus(item?.Status),
    processedByAI: toNullableBool(item?.ProcessedByAI),
    currencyCode: String(item?.CurrencyCode || "").trim(),
    totalAmount: getVisibleReimbursableTotal({
      TotalAmountMST: toNullableNumber(item?.TotalAmountMST),
      TotalAmountCurrency: toNullableNumber(item?.TotalAmountCurrency),
      TotalAmount: toNullableNumber(item?.TotalAmount)
    }),
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
    totalAmount: getVisibleReimbursableTotal({
      TotalAmountMST: toNullableNumber(item?.TotalAmountMST),
      TotalAmountCurrency: toNullableNumber(item?.TotalAmountCurrency),
      TotalAmount: toNullableNumber(item?.TotalAmount)
    }),
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
  return toExpenseGastoTypeCode(value);
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

// Web/wwwroot/react/src/pages/gastos/tickets/ExpenseTicketsPage.tsx
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var PAGE_SIZE = 10;
var normalizeUserId = (value) => String(value || "").trim();
var isSameUser = (left, right) => {
  const normalizedLeft = normalizeUserId(left).toUpperCase();
  const normalizedRight = normalizeUserId(right).toUpperCase();
  return !!normalizedLeft && normalizedLeft === normalizedRight;
};
var ensureCurrentUserInList = (users, currentAxUserId, currentUserName = "") => {
  const normalizedCurrent = normalizeUserId(currentAxUserId);
  const normalizedCurrentName = normalizeUserId(currentUserName);
  if (!normalizedCurrent) return users;
  if (users.some((entry) => isSameUser(entry.axUserId, normalizedCurrent))) {
    return users.map((entry) => {
      if (!isSameUser(entry.axUserId, normalizedCurrent)) return entry;
      return {
        ...entry,
        name: normalizedCurrentName || normalizeUserId(entry.name) || normalizedCurrent,
        userName: normalizedCurrentName || entry.userName
      };
    });
  }
  return [
    {
      crmUserId: normalizedCurrent,
      axUserId: normalizedCurrent,
      name: normalizedCurrentName || normalizedCurrent,
      userName: normalizedCurrentName || void 0
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
var NewTicketIcon = () => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "size-6", children: [
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
  const [reimbursementCurrencyCode, setReimbursementCurrencyCode] = (0, import_react9.useState)("EUR");
  const {
    currentAxUserId,
    currentUserName,
    currentCrmUserId,
    subordinates,
    canManageOtherUsers,
    setSelectedManagedUserId,
    managementBootstrapReady,
    selectedManagedUserId,
    allowSelfManagement
  } = useAuthContext();
  const timelineContainerRef = import_react9.default.useRef(null);
  const cameraInputRef = import_react9.default.useRef(null);
  const galleryInputRef = import_react9.default.useRef(null);
  const didRestoreOnMountRef = import_react9.default.useRef(false);
  const pendingScrollRestoreRef = import_react9.default.useRef(null);
  const pendingFocusFileIdRef = import_react9.default.useRef("");
  const linkModeContext = (0, import_react9.useMemo)(() => {
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
  const managedUsers = (0, import_react9.useMemo)(
    () => ensureCurrentUserInList(Array.isArray(subordinates) ? subordinates : [], currentAxUserId, currentUserName),
    [currentAxUserId, currentUserName, subordinates]
  );
  const defaultManagedUserId = (0, import_react9.useMemo)(
    () => resolveManagedUserSelection(currentAxUserId, currentAxUserId, managedUsers),
    [currentAxUserId, managedUsers]
  );
  const showManagedUserFilter = isLinkMode && canManageOtherUsers;
  const normalizeLinkModeSnapshotForLoad = (0, import_react9.useCallback)(
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
  const [linkFlowBusy, setLinkFlowBusy] = (0, import_react9.useState)(false);
  const [linkFlowStatus, setLinkFlowStatus] = (0, import_react9.useState)("");
  const [linkFlowError, setLinkFlowError] = (0, import_react9.useState)("");
  const [selectAllBusy, setSelectAllBusy] = (0, import_react9.useState)(false);
  const [selectAllError, setSelectAllError] = (0, import_react9.useState)("");
  const [linkBulkResult, setLinkBulkResult] = (0, import_react9.useState)(null);
  const failedLinkTicketIds = (0, import_react9.useMemo)(() => {
    const failedItems = Array.isArray(linkBulkResult?.failed) ? linkBulkResult.failed : [];
    return new Set(
      failedItems.flatMap((item) => {
        const ticketId = safeText(item?.ticketId).toUpperCase();
        return ticketId ? [ticketId] : [];
      })
    );
  }, [linkBulkResult]);
  const paginationLabels = (0, import_react9.useMemo)(
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
  const gastoTypeOptions = (0, import_react9.useMemo)(() => getExpenseGastoTypeOptions(), []);
  const gastoTypeLabelMap = (0, import_react9.useMemo)(() => {
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
  const syncManagedUserSelection = (0, import_react9.useCallback)(
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
  const buildInitialLinkModeSnapshot = (0, import_react9.useCallback)(() => {
    const initialManagedUserId = syncManagedUserSelection(defaultManagedUserId);
    return buildLinkModeInitialSnapshot(initialManagedUserId);
  }, [defaultManagedUserId, syncManagedUserSelection]);
  const buildInitialStandardSnapshot = (0, import_react9.useCallback)(() => {
    const today = startOfDay(/* @__PURE__ */ new Date());
    const fromDate2 = new Date(today);
    fromDate2.setDate(today.getDate() - 89);
    const initialManagedUserId = syncManagedUserSelection(defaultManagedUserId);
    return {
      fromDate: toIsoDate(fromDate2),
      toDate: toIsoDate(today),
      filterKey: "",
      currencyCode: "",
      managedUserId: initialManagedUserId,
      statusFilter: "",
      gastoTypeFilter: "",
      processedByIaFilter: "all"
    };
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
  (0, import_react9.useEffect)(() => {
    const normalizedDefaultManagedUserId = normalizeUserId(defaultManagedUserId);
    if (!normalizedDefaultManagedUserId) return;
    setManagedUserId(normalizedDefaultManagedUserId);
    syncManagedUserSelection(normalizedDefaultManagedUserId);
  }, [defaultManagedUserId, setManagedUserId, syncManagedUserSelection]);
  (0, import_react9.useEffect)(() => {
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
  const fabMenuItems = (0, import_react9.useMemo)(
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
  const selectedTotalAmountText = (0, import_react9.useMemo)(() => {
    let totalAmount = 0;
    selectedTickets.forEach((item) => {
      const amount = Number(item.totalAmount ?? 0);
      if (!Number.isFinite(amount)) return;
      totalAmount += amount;
    });
    return formatAmountWithCurrency(totalAmount, reimbursementCurrencyCode);
  }, [reimbursementCurrencyCode, selectedTickets]);
  (0, import_react9.useEffect)(() => {
    let cancelled = false;
    getExpenseSheetDefaultCurrencyCode().then((currency) => {
      if (cancelled) return;
      const normalizedCurrency = safeText(currency).toUpperCase();
      if (normalizedCurrency) {
        setReimbursementCurrencyCode(normalizedCurrency);
      }
    }).catch(() => {
    });
    return () => {
      cancelled = true;
    };
  }, []);
  (0, import_react9.useLayoutEffect)(() => {
    setTopbarActionGroupReady("expense-tickets-list-actions");
  }, []);
  const linkModeCancelMessage = (0, import_react9.useMemo)(
    () => indT(
      "ExpenseTickets_LinkMode_CancelConfirm",
      "Se cancelar\xE1 el proceso de vinculaci\xF3n y volver\xE1s a la hoja de gastos. \xBFQuieres continuar?"
    ),
    []
  );
  const applyCreatedTicketReturn = (0, import_react9.useCallback)(
    (ticketFileId, ticketDateValue) => {
      const initialSnapshot = buildInitialStandardSnapshot();
      logExpenseTicketsInfo("applyCreatedTicketReturn:start", {
        ticketFileId,
        ticketDateValue,
        currentAxUserId,
        initialSnapshot
      });
      clearCachedState();
      pendingScrollRestoreRef.current = null;
      pendingFocusFileIdRef.current = "";
      restoreAppliedFilters(initialSnapshot);
      clearListCache();
      resetList("created-ticket-return");
      logExpenseTicketsInfo("applyCreatedTicketReturn:loadList", {
        page: 1,
        initialSnapshot
      });
      void loadList(1, initialSnapshot);
      const url = new URL(window.location.href);
      url.searchParams.delete("ticketFileId");
      url.searchParams.delete("ticketDate");
      const cleanedQuery = url.searchParams.toString();
      window.history.replaceState({}, "", cleanedQuery ? `${url.pathname}?${cleanedQuery}` : url.pathname);
    },
    [
      buildInitialStandardSnapshot,
      clearCachedState,
      clearListCache,
      currentAxUserId,
      loadList,
      resetList,
      restoreAppliedFilters
    ]
  );
  const restoreLinkModeReturnState = (0, import_react9.useCallback)(
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
  const restoreInitialLinkModeState = (0, import_react9.useCallback)(() => {
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
  const restoreInitialStandardState = (0, import_react9.useCallback)(() => {
    const initialSnapshot = buildInitialStandardSnapshot();
    clearCachedState();
    clearExpenseTicketLinkReturnState();
    pendingScrollRestoreRef.current = null;
    pendingFocusFileIdRef.current = "";
    restoreAppliedFilters(initialSnapshot);
    runAutomaticListLoad(1, initialSnapshot, {
      clearCache: true,
      resetBeforeLoad: true
    });
  }, [
    buildInitialStandardSnapshot,
    clearCachedState,
    clearExpenseTicketLinkReturnState,
    restoreAppliedFilters,
    runAutomaticListLoad
  ]);
  const restoreStandardReturnState = (0, import_react9.useCallback)(
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
  const restoreDeleteReturnState = (0, import_react9.useCallback)(() => {
    clearCachedState();
    clearExpenseTicketLinkReturnState();
    pendingScrollRestoreRef.current = null;
    pendingFocusFileIdRef.current = "";
    clearLinkTicketSelection();
    setLinkBulkResult(null);
    onClear();
  }, [clearCachedState, clearExpenseTicketLinkReturnState, clearLinkTicketSelection, onClear]);
  const toggleTicketSelection = (0, import_react9.useCallback)(
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
  const clearTicketSelection = (0, import_react9.useCallback)(() => {
    setSelectAllError("");
    setLinkBulkResult(null);
    clearLinkTicketSelection();
  }, [clearLinkTicketSelection]);
  const resolveActiveFilters = (0, import_react9.useCallback)(() => {
    const baseSnapshot = appliedFilters || currentFilters;
    const resolvedManagedUserId = syncManagedUserSelection(baseSnapshot.managedUserId);
    return normalizeLinkModeSnapshotForLoad({
      ...baseSnapshot,
      managedUserId: resolvedManagedUserId
    });
  }, [appliedFilters, currentFilters, normalizeLinkModeSnapshotForLoad, syncManagedUserSelection]);
  const resolveActiveFiltersEvent = (0, import_react9.useEffectEvent)(resolveActiveFilters);
  const selectAllMatchingTickets = (0, import_react9.useCallback)(async () => {
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
  (0, import_react9.useEffect)(() => {
    if (!isLinkMode || items.length < 1) return;
    hydrateVisibleTickets(items.filter((item) => item.kind === "link"));
  }, [hydrateVisibleTickets, isLinkMode, items]);
  const runTicketLinkFlow = (0, import_react9.useCallback)(async () => {
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
          ticketIds: selectedTickets.flatMap((item) => {
            const fileId = safeText(item.fileId);
            return fileId ? [fileId] : [];
          })
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
      if (result.failedCount > 0 && result.linkedCount < 1) {
        const failureMessage = response.Message || indT("Api_RequestFailed", "Request failed.");
        setLinkFlowStatus(failureMessage);
        flashActionMark("errorProcess", 1500);
        await loadList(currentPage < 1 ? 1 : currentPage, activeFilters);
        return true;
      }
      if (result.failedCount > 0 || result.skippedCount > 0) {
        setLinkFlowStatus(response.Message || indT("Common_OK", "OK"));
        flashActionMark("warningProcess", 1500);
        await loadList(currentPage < 1 ? 1 : currentPage, activeFilters);
        return true;
      }
      setLinkFlowStatus(response.Message || indT("Common_OK", "OK"));
      flashActionMark("okProcess", 1200);
      await loadList(currentPage < 1 ? 1 : currentPage, activeFilters);
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
  const openLinkConfirmModal = (0, import_react9.useCallback)(() => {
    if (!isLinkMode || selectedTicketCount < 1 || linkFlowBusy || linkSheetCheckBusy || linkSheetLocked) {
      return;
    }
    setLinkFlowError("");
    setLinkFlowStatus("");
    openConfirm({
      title: indT("ExpenseTickets_LinkMode_LinkButton", "Vincular ticket(s)"),
      message: isFilteredSelectionActive ? `${indT("Nav_ExpenseTickets", "Tickets")}: ${selectedTicketCount}` : `${indT("Nav_ExpenseTickets", "Tickets")}: ${selectedTicketCount}
${indT("ExpenseSheets_Field_TotalAmount", "Reimbursement amount")}: ${selectedTotalAmountText}`,
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
  const handleModalConfirm = (0, import_react9.useCallback)(async () => {
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
  const handleModalButtonConfirm = (0, import_react9.useCallback)(() => {
    if (!linkFlowBusy && linkFlowError) {
      closeConfirm();
      return;
    }
    void handleModalConfirm();
  }, [closeConfirm, handleModalConfirm, linkFlowBusy, linkFlowError]);
  const openTicketDetail = (0, import_react9.useCallback)(
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
        const shouldOpenFailedTicketInEditMode = failedLinkTicketIds.has(fileId.toUpperCase());
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
        if (shouldOpenFailedTicketInEditMode) {
          query.set("mode", "edit");
          query.set("intent", EXPENSE_TICKET_LINK_FAILURE_REPAIR_INTENT);
        }
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
      failedLinkTicketIds,
      sheetCallerOrigin,
      saveCachedState,
      saveExpenseTicketLinkReturnState,
      selectedTickets,
      selectionMode,
      total
    ]
  );
  const resolveClickableCard = (0, import_react9.useCallback)((target) => {
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
  const summaryItems = (0, import_react9.useMemo)(() => {
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
  (0, import_react9.useEffect)(() => {
    if (!isLinkMode) return;
    setExpenseNavigationGuard({
      active: true,
      message: linkModeCancelMessage
    });
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [isLinkMode, linkModeCancelMessage]);
  (0, import_react9.useEffect)(() => {
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
      logExpenseTicketsInfo("mountRestoreEffect:restore-initial-standard-state");
      restoreInitialStandardState();
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
    restoreInitialStandardState,
    restoreLinkModeReturnState,
    restoreStandardReturnState
  ]);
  (0, import_react9.useEffect)(() => {
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
  (0, import_react9.useEffect)(() => {
    if (!managementBootstrapReady || !hasAccess) return;
    const handlePageShow = (event) => {
      if (!event.persisted && !isExpenseHistoryBackForwardNavigation()) return;
      const snapshot = resolveActiveFiltersEvent();
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
  }, [currentPage, hasAccess, isLinkMode, managementBootstrapReady, runAutomaticListLoad]);
  (0, import_react9.useEffect)(() => {
    const onToggleFilters = () => {
      const willOpen = !showFilters;
      toggleFilterPanel();
      if (willOpen) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    const onRefresh = () => {
      const snapshot = resolveActiveFiltersEvent();
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
  }, [currentPage, isLinkMode, loadList, showFilters, toggleFilterPanel]);
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
    !isLinkMode && sourcePickerOpen ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/45 px-4 py-6", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "w-full max-w-sm rounded-[var(--radius-xl)] border border-slate-200 bg-white p-4 shadow-xl", children: [
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
        className: hasPartialTicketFailure ? "glass-panel shadow-card space-y-2 rounded-[var(--radius-xl)] border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900" : "glass-panel shadow-card space-y-2 rounded-[var(--radius-xl)] border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: quickTicketErrorMessage }),
          quickTicketAttemptId ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "p",
            {
              className: hasPartialTicketFailure ? "rounded-[var(--radius-xl)] border border-amber-200 bg-white px-2 py-1 font-mono text-[11px] text-amber-900 break-all" : "rounded-[var(--radius-xl)] border border-rose-200 bg-white px-2 py-1 font-mono text-[11px] text-rose-800 break-all",
              children: `attemptId: ${quickTicketAttemptId}`
            }
          ) : null,
          quickTicketTraceList.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "div",
            {
              className: hasPartialTicketFailure ? "rounded-[var(--radius-xl)] border border-amber-200 bg-white p-2 text-xs text-amber-800" : "rounded-[var(--radius-xl)] border border-rose-200 bg-white p-2 text-xs text-rose-700",
              children: quickTicketTraceList.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: `${entry.step}: ${entry.traceId}` }, `${entry.step}-${entry.at}`))
            }
          ) : null,
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-wrap gap-2", children: [
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
        currentAxUserId,
        currentUserName,
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
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { className: "ind-spinner size-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
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
      const amountText = formatAmountWithCurrency(item.totalAmount ?? null, reimbursementCurrencyCode);
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
        isAssignedToExpenseSheet ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "expense-ticket-card__status-icon", role: "img", "aria-label": statusLabel, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-4", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
            children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-4", children: [
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL0V4cGVuc2VUaWNrZXRzUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL3VzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlRWZmZWN0RXZlbnQsIHVzZUxheW91dEVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCBDb21wYWN0UGFnaW5hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24sIHsgdHlwZSBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IFBhZ2VCb3R0b21BY3Rpb25zLCB7IFBhZ2VCb3R0b21BY3Rpb25CdXR0b24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1BhZ2VCb3R0b21BY3Rpb25zLnRzeFwiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4XCI7XHJcbmltcG9ydCB7IHVzZUF1dGhDb250ZXh0LCB0eXBlIEF1dGhNYW5hZ2VkVXNlciB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcclxuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xyXG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlVGltZWxpbmVDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbS50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRMaW5rQnVsa1N1bW1hcnkgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeS50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5IGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheS50c3hcIjtcclxuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcclxuaW1wb3J0IHtcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgsXG4gIGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUsXG4gIGxpbmtFeHBlbnNlU2hlZXRUaWNrZXRzQnVsayxcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSwgc2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQWN0aW5nVXNlci50c1wiO1xyXG5pbXBvcnQgeyBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsIG5hdmlnYXRlVG9FeHBlbnNlVXJsLCBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VHYXN0b1R5cGVPcHRpb25zIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlR2FzdG9UeXBlQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcclxuaW1wb3J0IHtcbiAgYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwsXG4gIGNsZWFyRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXG4gIEVYUEVOU0VfVElDS0VUX0xJTktfRkFJTFVSRV9SRVBBSVJfSU5URU5ULFxuICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dC50c1wiO1xuaW1wb3J0IHsgaGFzRXhwZW5zZVJldHVyblJlZmVycmVyLCBpc0V4cGVuc2VIaXN0b3J5QmFja0ZvcndhcmROYXZpZ2F0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VIaXN0b3J5TmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzLCBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIHNhZmVUZXh0LCBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93IH0gZnJvbSBcIi4uL2RldGFpbC91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cudHNcIjtcclxuaW1wb3J0IHsgVElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEUgfSBmcm9tIFwiLi4vZGV0YWlsL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvd0NvcmUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0xpc3REYXRhIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlLCB0eXBlIEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG4gIHJlYWRFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG4gIHNhdmVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgYnVpbGRFeHBlbnNlVGlja2V0TGlua0J1bGtGaWx0ZXJzIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VQYXlsb2FkQnVpbGRlcnMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0byB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXHJcbiAgRXhwZW5zZVRpY2tldExpbmtDYXJkLFxyXG4gIEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW0sXHJcbn0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbiB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWQudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldExpbmtTaGVldEdhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZS50c1wiO1xyXG5pbXBvcnQgeyBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5IGFzIHJldmVhbFRvcGJhckFjdGlvbkdyb3VwIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RvcGJhckFjdGlvblZpc2liaWxpdHkudHNcIjtcclxuXHJcbmNvbnN0IFBBR0VfU0laRSA9IDEwO1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVXNlcklkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XHJcblxyXG5jb25zdCBpc1NhbWVVc2VyID0gKGxlZnQ6IHN0cmluZywgcmlnaHQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRMZWZ0ID0gbm9ybWFsaXplVXNlcklkKGxlZnQpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFJpZ2h0ID0gbm9ybWFsaXplVXNlcklkKHJpZ2h0KS50b1VwcGVyQ2FzZSgpO1xyXG4gIHJldHVybiAhIW5vcm1hbGl6ZWRMZWZ0ICYmIG5vcm1hbGl6ZWRMZWZ0ID09PSBub3JtYWxpemVkUmlnaHQ7XHJcbn07XHJcblxyXG5jb25zdCBlbnN1cmVDdXJyZW50VXNlckluTGlzdCA9IChcbiAgdXNlcnM6IEF1dGhNYW5hZ2VkVXNlcltdLFxuICBjdXJyZW50QXhVc2VySWQ6IHN0cmluZyxcbiAgY3VycmVudFVzZXJOYW1lID0gXCJcIlxuKTogQXV0aE1hbmFnZWRVc2VyW10gPT4ge1xuICBjb25zdCBub3JtYWxpemVkQ3VycmVudCA9IG5vcm1hbGl6ZVVzZXJJZChjdXJyZW50QXhVc2VySWQpO1xuICBjb25zdCBub3JtYWxpemVkQ3VycmVudE5hbWUgPSBub3JtYWxpemVVc2VySWQoY3VycmVudFVzZXJOYW1lKTtcbiAgaWYgKCFub3JtYWxpemVkQ3VycmVudCkgcmV0dXJuIHVzZXJzO1xuICBpZiAodXNlcnMuc29tZSgoZW50cnkpID0+IGlzU2FtZVVzZXIoZW50cnkuYXhVc2VySWQsIG5vcm1hbGl6ZWRDdXJyZW50KSkpIHtcbiAgICByZXR1cm4gdXNlcnMubWFwKChlbnRyeSkgPT4ge1xuICAgICAgaWYgKCFpc1NhbWVVc2VyKGVudHJ5LmF4VXNlcklkLCBub3JtYWxpemVkQ3VycmVudCkpIHJldHVybiBlbnRyeTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmVudHJ5LFxuICAgICAgICBuYW1lOiBub3JtYWxpemVkQ3VycmVudE5hbWUgfHwgbm9ybWFsaXplVXNlcklkKGVudHJ5Lm5hbWUpIHx8IG5vcm1hbGl6ZWRDdXJyZW50LFxuICAgICAgICB1c2VyTmFtZTogbm9ybWFsaXplZEN1cnJlbnROYW1lIHx8IGVudHJ5LnVzZXJOYW1lLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIGNybVVzZXJJZDogbm9ybWFsaXplZEN1cnJlbnQsXG4gICAgICBheFVzZXJJZDogbm9ybWFsaXplZEN1cnJlbnQsXG4gICAgICBuYW1lOiBub3JtYWxpemVkQ3VycmVudE5hbWUgfHwgbm9ybWFsaXplZEN1cnJlbnQsXG4gICAgICB1c2VyTmFtZTogbm9ybWFsaXplZEN1cnJlbnROYW1lIHx8IHVuZGVmaW5lZCxcbiAgICB9LFxuICAgIC4uLnVzZXJzLFxuICBdO1xufTtcclxuXHJcbmNvbnN0IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbiA9IChyZXF1ZXN0ZWRVc2VySWQ6IHN0cmluZywgY3VycmVudEF4VXNlcklkOiBzdHJpbmcsIHVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFJlcXVlc3RlZCA9IG5vcm1hbGl6ZVVzZXJJZChyZXF1ZXN0ZWRVc2VySWQpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50ID0gbm9ybWFsaXplVXNlcklkKGN1cnJlbnRBeFVzZXJJZCk7XHJcbiAgaWYgKG5vcm1hbGl6ZWRSZXF1ZXN0ZWQpIHtcclxuICAgIGNvbnN0IGZvdW5kID0gdXNlcnMuZmluZCgoZW50cnkpID0+IGlzU2FtZVVzZXIoZW50cnkuYXhVc2VySWQsIG5vcm1hbGl6ZWRSZXF1ZXN0ZWQpKTtcclxuICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kLmF4VXNlcklkO1xyXG4gIH1cclxuICBpZiAobm9ybWFsaXplZEN1cnJlbnQpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZEN1cnJlbnQpKTtcclxuICAgIHJldHVybiBzZWxmPy5heFVzZXJJZCB8fCBub3JtYWxpemVkQ3VycmVudDtcclxuICB9XHJcbiAgcmV0dXJuIFwiXCI7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZExpbmtNb2RlSW5pdGlhbFNuYXBzaG90ID0gKG1hbmFnZWRVc2VySWQgPSBcIlwiKTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9PiB7XHJcbiAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xyXG4gIGNvbnN0IGZyb21EYXRlID0gbmV3IERhdGUodG9kYXkpO1xyXG4gIC8vIEtlZXAgYXV0b21hdGljIGxpbmstbW9kZSBsb2FkIGJvdW5kZWQgdG8gYXZvaWQgaGVhdnkgdXBzdHJlYW0gc2NhbnMuXHJcbiAgZnJvbURhdGUuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAyOSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBmcm9tRGF0ZTogdG9Jc29EYXRlKGZyb21EYXRlKSxcclxuICAgIHRvRGF0ZTogdG9Jc29EYXRlKHRvZGF5KSxcclxuICAgIGZpbHRlcktleTogXCJcIixcclxuICAgIGN1cnJlbmN5Q29kZTogXCJcIixcclxuICAgIG1hbmFnZWRVc2VySWQ6IG5vcm1hbGl6ZVVzZXJJZChtYW5hZ2VkVXNlcklkKSxcclxuICAgIHN0YXR1c0ZpbHRlcjogMCxcclxuICAgIGdhc3RvVHlwZUZpbHRlcjogXCJcIixcclxuICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXI6IFwiYWxsXCIsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVMaW5rTW9kZUJsb2NrZWRNZXNzYWdlID0gKGlzUGFpZDogYm9vbGVhbik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKGlzUGFpZCkge1xyXG4gICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9QYWlkUmVhZE9ubHlcIiwgXCJMYXMgaG9qYXMgZGUgZ2FzdG8gcGFnYWRhcyBzb24gZGUgc29sbyBsZWN0dXJhLlwiKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUmVhZE9ubHlCeVN0YXR1c1wiLCBcIk5vIHNlIHB1ZWRlIGVkaXRhciBlc3RhIGhvamEgZGUgZ2FzdG9zIGVuIGVsIGVzdGFkbyBhY3R1YWwuXCIpO1xyXG59O1xyXG5cclxuY29uc3QgRVhQRU5TRV9USUNLRVRTX0xPR19QUkVGSVggPSBcIltleHBlbnNlLXRpY2tldHNdXCI7XHJcblxyXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c0luZm8gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLmluZm8gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS5pbmZvKEVYUEVOU0VfVElDS0VUU19MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c1dhcm4gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLndhcm4gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS53YXJuKEVYUEVOU0VfVElDS0VUU19MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBWYWxpZGF0ZXMgd2hldGhlciBvbmUgdGlja2V0IGNhcmQgY2FuIHBhcnRpY2lwYXRlIGluIGJ1bGsgbGluayBtb2RlLlxyXG5jb25zdCBjYW5TZWxlY3RUaWNrZXRGb3JMaW5rID0gKGl0ZW06IEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW0pOiBib29sZWFuID0+IHtcclxuICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChpdGVtLmZpbGVJZCk7XHJcbiAgcmV0dXJuICEhZmlsZUlkO1xyXG59O1xyXG5cclxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxyXG5jb25zdCBib290c3RyYXBFeHBlbnNlQXBpQXV0aCA9ICgpID0+IHtcclxuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCh7XHJcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcclxuICAgIGVudHJhT2lkOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxyXG4gICAgYXBwQ29kZTogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgTmV3VGlja2V0SWNvbiA9ICgpID0+IChcclxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cInNpemUtNlwiPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTAgMjBoLTVhMiAyIDAgMCAxIC0yIC0ydi05YTIgMiAwIDAgMSAyIC0yaDFhMiAyIDAgMCAwIDIgLTJhMSAxIDAgMCAxIDEgLTFoNmExIDEgMCAwIDEgMSAxYTIgMiAwIDAgMCAyIDJoMWEyIDIgMCAwIDEgMiAydjJcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQuMzYyIDExLjE1YTMgMyAwIDEgMCAtNC4xNDQgNC4yNjNcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMjF2LTRhMiAyIDAgMSAxIDQgMHY0XCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDE5aDRcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMjEgMTV2NlwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBFeHBlbnNlVGlja2V0c1BhZ2VDb250ZW50ID0gKCkgPT4ge1xyXG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiVmlld1wiKTtcbiAgY29uc3QgY2FuQ3JlYXRlVGlja2V0ID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJBZGRcIik7XG4gIGNvbnN0IGNhbkxpbmtTaGVldExpbmVzID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJBZGRcIik7XG4gIGNvbnN0IFtyZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlLCBzZXRSZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiRVVSXCIpO1xuICBjb25zdCB7XHJcbiAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgY3VycmVudFVzZXJOYW1lLFxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgc3Vib3JkaW5hdGVzLFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgfSA9IHVzZUF1dGhDb250ZXh0KCk7XHJcbiAgY29uc3QgdGltZWxpbmVDb250YWluZXJSZWYgPSBSZWFjdC51c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBjYW1lcmFJbnB1dFJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgZ2FsbGVyeUlucHV0UmVmID0gUmVhY3QudXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBkaWRSZXN0b3JlT25Nb3VudFJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XHJcbiAgY29uc3QgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYgPSBSZWFjdC51c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmID0gUmVhY3QudXNlUmVmKFwiXCIpO1xyXG4gIGNvbnN0IGxpbmtNb2RlQ29udGV4dCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICBjb25zdCBhY3Rpb24gPSBzYWZlVGV4dCh1cmwuc2VhcmNoUGFyYW1zLmdldChcImFjdGlvblwiKSkudG9Mb3dlckNhc2UoKTtcclxuICAgIGNvbnN0IGhvamFHYXN0b3NJZCA9IHNhZmVUZXh0KHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwiaG9qYUdhc3Rvc0lkXCIpKTtcclxuICAgIGNvbnN0IGlzTGlua01vZGUgPSBhY3Rpb24gPT09IFwibGlua1wiICYmICEhaG9qYUdhc3Rvc0lkO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaXNMaW5rTW9kZSxcclxuICAgICAgc2hlZXRJZDogaG9qYUdhc3Rvc0lkLFxyXG4gICAgICBzaGVldE9yaWdpbjogaXNMaW5rTW9kZSA/IChcInNoZWV0LWxpbmtcIiBhcyBjb25zdCkgOiAoISFob2phR2FzdG9zSWQgPyAoXCJzaGVldC1jcmVhdGVcIiBhcyBjb25zdCkgOiBudWxsKSxcclxuICAgICAgZml4ZWRTdGF0dXNGaWx0ZXI6IGlzTGlua01vZGUgPyAoMCBhcyBjb25zdCkgOiBudWxsLFxyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGlzTGlua01vZGUgPSBsaW5rTW9kZUNvbnRleHQuaXNMaW5rTW9kZTtcclxuICBjb25zdCBsaW5rU2hlZXRJZCA9IGxpbmtNb2RlQ29udGV4dC5zaGVldElkO1xyXG4gIGNvbnN0IHNoZWV0Q2FsbGVyT3JpZ2luID0gbGlua01vZGVDb250ZXh0LnNoZWV0T3JpZ2luO1xyXG4gIGNvbnN0IGhhc1NoZWV0Q2FsbGVyQ29udGV4dCA9ICEhbGlua1NoZWV0SWQgJiYgISFzaGVldENhbGxlck9yaWdpbjtcclxuICBjb25zdCBmaXhlZFN0YXR1c0ZpbHRlciA9IGxpbmtNb2RlQ29udGV4dC5maXhlZFN0YXR1c0ZpbHRlcjtcclxuICBjb25zdCBjYW5Qcm9jZXNzTGlua01vZGUgPSAhaXNMaW5rTW9kZSB8fCBjYW5MaW5rU2hlZXRMaW5lcztcclxuICBjb25zdCBtYW5hZ2VkVXNlcnMgPSB1c2VNZW1vKFxuICAgICgpID0+IGVuc3VyZUN1cnJlbnRVc2VySW5MaXN0KEFycmF5LmlzQXJyYXkoc3Vib3JkaW5hdGVzKSA/IHN1Ym9yZGluYXRlcyA6IFtdLCBjdXJyZW50QXhVc2VySWQsIGN1cnJlbnRVc2VyTmFtZSksXG4gICAgW2N1cnJlbnRBeFVzZXJJZCwgY3VycmVudFVzZXJOYW1lLCBzdWJvcmRpbmF0ZXNdXG4gICk7XG4gIGNvbnN0IGRlZmF1bHRNYW5hZ2VkVXNlcklkID0gdXNlTWVtbyhcclxuICAgICgpID0+IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbihjdXJyZW50QXhVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzKSxcclxuICAgIFtjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vyc11cclxuICApO1xyXG4gIGNvbnN0IHNob3dNYW5hZ2VkVXNlckZpbHRlciA9IGlzTGlua01vZGUgJiYgY2FuTWFuYWdlT3RoZXJVc2VycztcclxuXHJcbiAgLy8gS2VlcHMgbGluay1tb2RlIGxpc3QgcXVlcmllcyBib3VuZGVkIGV2ZW4gd2hlbiBVSSBmaWx0ZXJzIGFyZSBjbGVhcmVkLlxyXG4gIGNvbnN0IG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0+IHtcclxuICAgICAgaWYgKCFpc0xpbmtNb2RlKSByZXR1cm4gc25hcHNob3Q7XHJcblxyXG4gICAgICBjb25zdCBmYWxsYmFjayA9IGJ1aWxkTGlua01vZGVJbml0aWFsU25hcHNob3Qoc25hcHNob3QubWFuYWdlZFVzZXJJZCk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRGcm9tRGF0ZSA9IHNhZmVUZXh0KHNuYXBzaG90LmZyb21EYXRlKSB8fCBmYWxsYmFjay5mcm9tRGF0ZTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZFRvRGF0ZSA9IHNhZmVUZXh0KHNuYXBzaG90LnRvRGF0ZSkgfHwgZmFsbGJhY2sudG9EYXRlO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCA9IG5vcm1hbGl6ZVVzZXJJZChzbmFwc2hvdC5tYW5hZ2VkVXNlcklkKSB8fCBmYWxsYmFjay5tYW5hZ2VkVXNlcklkO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zbmFwc2hvdCxcclxuICAgICAgICBmcm9tRGF0ZTogbm9ybWFsaXplZEZyb21EYXRlLFxyXG4gICAgICAgIHRvRGF0ZTogbm9ybWFsaXplZFRvRGF0ZSxcclxuICAgICAgICBtYW5hZ2VkVXNlcklkOiBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgICBzdGF0dXNGaWx0ZXI6IDAsXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgW2lzTGlua01vZGVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgW2xpbmtGbG93QnVzeSwgc2V0TGlua0Zsb3dCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbGlua0Zsb3dTdGF0dXMsIHNldExpbmtGbG93U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtsaW5rRmxvd0Vycm9yLCBzZXRMaW5rRmxvd0Vycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtzZWxlY3RBbGxCdXN5LCBzZXRTZWxlY3RBbGxCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3NlbGVjdEFsbEVycm9yLCBzZXRTZWxlY3RBbGxFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2xpbmtCdWxrUmVzdWx0LCBzZXRMaW5rQnVsa1Jlc3VsdF0gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0byB8IG51bGw+KG51bGwpO1xuICBjb25zdCBmYWlsZWRMaW5rVGlja2V0SWRzID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgZmFpbGVkSXRlbXMgPSBBcnJheS5pc0FycmF5KGxpbmtCdWxrUmVzdWx0Py5mYWlsZWQpID8gbGlua0J1bGtSZXN1bHQuZmFpbGVkIDogW107XG4gICAgcmV0dXJuIG5ldyBTZXQoXG4gICAgICBmYWlsZWRJdGVtcy5mbGF0TWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHRpY2tldElkID0gc2FmZVRleHQoaXRlbT8udGlja2V0SWQpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiB0aWNrZXRJZCA/IFt0aWNrZXRJZF0gOiBbXTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfSwgW2xpbmtCdWxrUmVzdWx0XSk7XG5cclxuICBjb25zdCBwYWdpbmF0aW9uTGFiZWxzID0gdXNlTWVtbyhcclxuICAgICgpID0+ICh7XHJcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXHJcbiAgICAgIHByZXY6IGluZFQoXCJIaXN0b3J5X1BhZ2VfUHJldlwiLCBcIlByZXZpb3VzXCIpLFxyXG4gICAgICBuZXh0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpLFxyXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxyXG4gICAgfSksXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xyXG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcclxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZ2FzdG9UeXBlT3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiBnZXRFeHBlbnNlR2FzdG9UeXBlT3B0aW9ucygpLCBbXSk7XHJcblxyXG4gIGNvbnN0IGdhc3RvVHlwZUxhYmVsTWFwID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xyXG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgZ2FzdG9UeXBlT3B0aW9ucykge1xyXG4gICAgICBtYXAuc2V0KFN0cmluZyhvcHRpb24udmFsdWUpLCBvcHRpb24udGV4dCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWFwO1xyXG4gIH0sIFtnYXN0b1R5cGVPcHRpb25zXSk7XHJcblxyXG4gIGNvbnN0IHtcclxuICAgIGl0ZW1zLFxyXG4gICAgdG90YWwsXHJcbiAgICBjdXJyZW50UGFnZSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGxvYWRMaXN0LFxyXG4gICAgcmVzdG9yZUxpc3RTbmFwc2hvdCxcclxuICAgIHJlc2V0TGlzdCxcclxuICAgIGNsZWFyTGlzdENhY2hlLFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0c0xpc3REYXRhKHtcclxuICAgIGhhc0FjY2VzcyxcclxuICAgIHBhZ2VTaXplOiBQQUdFX1NJWkUsXHJcbiAgICBtb2RlOiBpc0xpbmtNb2RlID8gXCJsaW5rXCIgOiBcImdlbmVyYWxcIixcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gIH0pO1xyXG4gIGNvbnN0IHsgcmVhZENhY2hlZFN0YXRlLCBjb25zdW1lUmV0dXJuRmxhZywgY29uc3VtZVJldHVybk1vZGUsIHNhdmVDYWNoZWRTdGF0ZSwgY2xlYXJDYWNoZWRTdGF0ZSB9ID0gdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZSgpO1xyXG4gIGNvbnN0IHtcclxuICAgIHNlbGVjdGlvbk1vZGUsXHJcbiAgICBzZWxlY3RlZFRpY2tldHMsXHJcbiAgICBleGNsdWRlZElkcyxcclxuICAgIGZpbHRlcmVkU25hcHNob3QsXHJcbiAgICBmaWx0ZXJlZFRvdGFsQ291bnQsXHJcbiAgICBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlLFxyXG4gICAgaXNTZWxlY3RlZDogaXNMaW5rVGlja2V0U2VsZWN0ZWQsXHJcbiAgICB0b2dnbGVUaWNrZXQ6IHRvZ2dsZUxpbmtUaWNrZXRTZWxlY3Rpb24sXHJcbiAgICBjbGVhclNlbGVjdGlvbjogY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uLFxyXG4gICAgcmVzdG9yZVNlbGVjdGlvbjogcmVzdG9yZUxpbmtUaWNrZXRTZWxlY3Rpb24sXHJcbiAgICBzZWxlY3RBbGxCeUZpbHRlcnMsXHJcbiAgICBoeWRyYXRlVmlzaWJsZVRpY2tldHMsXHJcbiAgICByZXNvbHZlU2VsZWN0ZWRDb3VudCxcclxuICB9ID0gdXNlRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb24oKTtcclxuICBjb25zdCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24gPSB1c2VDYWxsYmFjayhcclxuICAgIChyZXF1ZXN0ZWRVc2VySWQ6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc29sdmVkVXNlcklkID0gcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uKHJlcXVlc3RlZFVzZXJJZCwgY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnMpO1xyXG4gICAgICBzZXRTZWxlY3RlZE1hbmFnZWRVc2VySWQocmVzb2x2ZWRVc2VySWQpO1xyXG4gICAgICBpZiAoIXJlc29sdmVkVXNlcklkIHx8IChjdXJyZW50QXhVc2VySWQgJiYgaXNTYW1lVXNlcihyZXNvbHZlZFVzZXJJZCwgY3VycmVudEF4VXNlcklkKSkpIHtcclxuICAgICAgICBjbGVhckV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKHJlc29sdmVkVXNlcklkKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzb2x2ZWRVc2VySWQ7XHJcbiAgICB9LFxyXG4gICAgW2N1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzLCBzZXRTZWxlY3RlZE1hbmFnZWRVc2VySWRdXHJcbiAgKTtcclxuICBjb25zdCB7XHJcbiAgICBsaW5rU2hlZXRMb2NrZWQsXHJcbiAgICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZSxcclxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcclxuICB9ID0gdXNlRXhwZW5zZVRpY2tldExpbmtTaGVldEdhdGUoe1xyXG4gICAgaXNMaW5rTW9kZSxcclxuICAgIGxpbmtTaGVldElkLFxyXG4gICAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgcmVzb2x2ZUJsb2NrZWRNZXNzYWdlOiByZXNvbHZlTGlua01vZGVCbG9ja2VkTWVzc2FnZSxcclxuICB9KTtcclxuICBjb25zdCB7IHJ1bkF1dG9tYXRpY0xpc3RMb2FkIH0gPSB1c2VFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZCh7XHJcbiAgICBpc0xpbmtNb2RlLFxyXG4gICAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxyXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gICAgbGlua1NoZWV0TG9ja2VkLFxyXG4gICAgY2xlYXJMaXN0Q2FjaGUsXHJcbiAgICByZXNldExpc3QsXHJcbiAgICBsb2FkTGlzdCxcclxuICB9KTtcclxuICBjb25zdCBidWlsZEluaXRpYWxMaW5rTW9kZVNuYXBzaG90ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgaW5pdGlhbE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xyXG4gICAgcmV0dXJuIGJ1aWxkTGlua01vZGVJbml0aWFsU25hcHNob3QoaW5pdGlhbE1hbmFnZWRVc2VySWQpO1xyXG4gIH0sIFtkZWZhdWx0TWFuYWdlZFVzZXJJZCwgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXSk7XHJcblxyXG4gIGNvbnN0IGJ1aWxkSW5pdGlhbFN0YW5kYXJkU25hcHNob3QgPSB1c2VDYWxsYmFjaygoKTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9PiB7XHJcbiAgICBjb25zdCB0b2RheSA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoKSk7XHJcbiAgICBjb25zdCBmcm9tRGF0ZSA9IG5ldyBEYXRlKHRvZGF5KTtcclxuICAgIGZyb21EYXRlLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gODkpO1xyXG4gICAgY29uc3QgaW5pdGlhbE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZyb21EYXRlOiB0b0lzb0RhdGUoZnJvbURhdGUpLFxyXG4gICAgICB0b0RhdGU6IHRvSXNvRGF0ZSh0b2RheSksXHJcbiAgICAgIGZpbHRlcktleTogXCJcIixcclxuICAgICAgY3VycmVuY3lDb2RlOiBcIlwiLFxyXG4gICAgICBtYW5hZ2VkVXNlcklkOiBpbml0aWFsTWFuYWdlZFVzZXJJZCxcclxuICAgICAgc3RhdHVzRmlsdGVyOiBcIlwiLFxyXG4gICAgICBnYXN0b1R5cGVGaWx0ZXI6IFwiXCIsXHJcbiAgICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXI6IFwiYWxsXCIsXHJcbiAgICB9O1xyXG4gIH0sIFtkZWZhdWx0TWFuYWdlZFVzZXJJZCwgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXSk7XHJcblxyXG4gIGNvbnN0IHtcclxuICAgIGZyb21EYXRlLFxyXG4gICAgdG9EYXRlLFxyXG4gICAgZmlsdGVyS2V5LFxyXG4gICAgY3VycmVuY3lDb2RlLFxyXG4gICAgbWFuYWdlZFVzZXJJZCxcclxuICAgIHN0YXR1c0ZpbHRlcixcclxuICAgIGdhc3RvVHlwZUZpbHRlcixcclxuICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXHJcbiAgICBhY3RpdmVRdWlja0ZpbHRlcixcclxuICAgIHNob3dNYW51YWxEYXRlRmlsdGVyLFxyXG4gICAgc2hvd01hbnVhbERhdGVFcnJvcixcclxuICAgIG1hbnVhbERhdGVBdXRvT3BlbktleSxcclxuICAgIGFwcGxpZWRGaWx0ZXJzLFxyXG4gICAgc2hvd0ZpbHRlcnMsXHJcbiAgICBjdXJyZW50RmlsdGVycyxcclxuICAgIHNldEZpbHRlcktleSxcclxuICAgIHNldEN1cnJlbmN5Q29kZSxcclxuICAgIHNldE1hbmFnZWRVc2VySWQsXHJcbiAgICBzZXRTdGF0dXNGaWx0ZXIsXHJcbiAgICBzZXRHYXN0b1R5cGVGaWx0ZXIsXHJcbiAgICBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyLFxyXG4gICAgb25BcHBseSxcclxuICAgIG9uQ2xlYXIsXHJcbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMsXHJcbiAgICBvbkRhdGVSYW5nZUNoYW5nZSxcclxuICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcclxuICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXHJcbiAgICB0b2dnbGVGaWx0ZXJQYW5lbCxcclxuICAgIHN0YXR1c0ZpbHRlckxvY2tlZCxcclxuICB9ID0gdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGUoe1xyXG4gICAgZGVmYXVsdE1hbmFnZWRVc2VySWQsXHJcbiAgICBmaXhlZFN0YXR1c0ZpbHRlcixcclxuICAgIGFsbG93RW1wdHlEYXRlc09uQXBwbHk6IGlzTGlua01vZGUsXHJcbiAgICBvbkFwcGx5RmlsdGVyczogKHNuYXBzaG90KSA9PiB7XHJcbiAgICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xyXG4gICAgICBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24oKTtcclxuICAgICAgY29uc3QgcmVzb2x2ZWRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKHNuYXBzaG90Lm1hbmFnZWRVc2VySWQpO1xyXG4gICAgICB2b2lkIGxvYWRMaXN0KFxyXG4gICAgICAgIDEsXHJcbiAgICAgICAgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQoe1xyXG4gICAgICAgICAgLi4uc25hcHNob3QsXHJcbiAgICAgICAgICBtYW5hZ2VkVXNlcklkOiByZXNvbHZlZE1hbmFnZWRVc2VySWQsXHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH0sXHJcbiAgICBvbkNsZWFyRmlsdGVyczogKCkgPT4ge1xyXG4gICAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcclxuICAgICAgY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcclxuICAgICAgaWYgKGlzTGlua01vZGUpIHtcclxuICAgICAgICBjb25zdCBsaW5rU25hcHNob3QgPSBidWlsZEluaXRpYWxMaW5rTW9kZVNuYXBzaG90KCk7XHJcbiAgICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKGxpbmtTbmFwc2hvdCk7XHJcbiAgICAgICAgcnVuQXV0b21hdGljTGlzdExvYWQoMSwgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQobGlua1NuYXBzaG90KSwge1xyXG4gICAgICAgICAgY2xlYXJDYWNoZTogdHJ1ZSxcclxuICAgICAgICAgIHJlc2V0QmVmb3JlTG9hZDogdHJ1ZSxcclxuICAgICAgICAgIHdhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHk6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByZXNldE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oY3VycmVudEF4VXNlcklkKTtcclxuICAgICAgc2V0TWFuYWdlZFVzZXJJZChyZXNldE1hbmFnZWRVc2VySWQpO1xyXG4gICAgICByZXNldExpc3QoXCJjbGVhci1maWx0ZXJzXCIpO1xyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWREZWZhdWx0TWFuYWdlZFVzZXJJZCA9IG5vcm1hbGl6ZVVzZXJJZChkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XHJcbiAgICBpZiAoIW5vcm1hbGl6ZWREZWZhdWx0TWFuYWdlZFVzZXJJZCkgcmV0dXJuO1xyXG4gICAgc2V0TWFuYWdlZFVzZXJJZChub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQpO1xyXG4gICAgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKG5vcm1hbGl6ZWREZWZhdWx0TWFuYWdlZFVzZXJJZCk7XHJcbiAgfSwgW2RlZmF1bHRNYW5hZ2VkVXNlcklkLCBzZXRNYW5hZ2VkVXNlcklkLCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb25dKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChjYW5NYW5hZ2VPdGhlclVzZXJzKSByZXR1cm47XHJcbiAgICBjb25zdCBmYWxsYmFja01hbmFnZWRVc2VySWQgPSByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24oY3VycmVudEF4VXNlcklkLCBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vycyk7XHJcbiAgICBjb25zdCBub3JtYWxpemVkQ3VycmVudE1hbmFnZWRVc2VySWQgPSBub3JtYWxpemVVc2VySWQobWFuYWdlZFVzZXJJZCk7XHJcbiAgICBpZiAoaXNTYW1lVXNlcihub3JtYWxpemVkQ3VycmVudE1hbmFnZWRVc2VySWQsIGZhbGxiYWNrTWFuYWdlZFVzZXJJZCkpIHJldHVybjtcclxuICAgIGlmICghbm9ybWFsaXplZEN1cnJlbnRNYW5hZ2VkVXNlcklkICYmICFmYWxsYmFja01hbmFnZWRVc2VySWQpIHJldHVybjtcclxuXHJcbiAgICBzZXRNYW5hZ2VkVXNlcklkKGZhbGxiYWNrTWFuYWdlZFVzZXJJZCk7XHJcbiAgICBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oZmFsbGJhY2tNYW5hZ2VkVXNlcklkKTtcclxuICB9LCBbY2FuTWFuYWdlT3RoZXJVc2VycywgY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcklkLCBtYW5hZ2VkVXNlcnMsIHNldE1hbmFnZWRVc2VySWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xyXG5cclxuICBjb25zdCB7XHJcbiAgICBzb3VyY2VQaWNrZXJPcGVuLFxyXG4gICAgYnVzeTogcXVpY2tUaWNrZXRCdXN5LFxyXG4gICAgcHJvZ3Jlc3NNZXNzYWdlOiBxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSxcclxuICAgIHByb2dyZXNzU3RhZ2VzOiBxdWlja1RpY2tldFByb2dyZXNzU3RhZ2VzLFxyXG4gICAgcHJvZ3Jlc3NFbGFwc2VkTXM6IHF1aWNrVGlja2V0RWxhcHNlZE1zLFxyXG4gICAgZXJyb3JNZXNzYWdlOiBxdWlja1RpY2tldEVycm9yTWVzc2FnZSxcclxuICAgIGF0dGVtcHRJZDogcXVpY2tUaWNrZXRBdHRlbXB0SWQsXHJcbiAgICBoYXNQZW5kaW5nVXBsb2FkUmV0cnksXHJcbiAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZSxcclxuICAgIHRyYWNlTGlzdDogcXVpY2tUaWNrZXRUcmFjZUxpc3QsXHJcbiAgICBvcGVuU291cmNlUGlja2VyLFxyXG4gICAgY2xvc2VTb3VyY2VQaWNrZXIsXHJcbiAgICBzZWxlY3RGcm9tQ2FtZXJhLFxyXG4gICAgc2VsZWN0RnJvbUdhbGxlcnksXHJcbiAgICBoYW5kbGVTZWxlY3RlZEZpbGUsXHJcbiAgICByZXRyeVBlbmRpbmdVcGxvYWQsXHJcbiAgICBjbGVhckVycm9yOiBjbGVhclF1aWNrVGlja2V0RXJyb3IsXHJcbiAgfSA9IHVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdyh7XHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiAhaXNMaW5rTW9kZSAmJiBjYW5DcmVhdGVUaWNrZXQsXHJcbiAgICBpc0NyZWF0ZU1vZGU6IGZhbHNlLFxyXG4gICAgaXNTaGVldExvY2tlZDogZmFsc2UsXHJcbiAgICBsaW5rVG9TaGVldDogZmFsc2UsXHJcbiAgICBheFVzZXJJZE92ZXJyaWRlOiBzYWZlVGV4dChjdXJyZW50QXhVc2VySWQpLFxyXG4gICAgY3VycmVuY3lDb2RlOiBjdXJyZW5jeUNvZGUgfHwgXCJFVVJcIixcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gICAgb25Db21wbGV0ZWQ6IChyZXN1bHQpID0+IHtcclxuICAgICAgY29uc3QgY3JlYXRlZEZpbGVJZCA9IHNhZmVUZXh0KHJlc3VsdD8uZmlsZUlkKTtcclxuICAgICAgaWYgKCFjcmVhdGVkRmlsZUlkKSByZXR1cm47XHJcblxyXG4gICAgICBpZiAoaGFzU2hlZXRDYWxsZXJDb250ZXh0ICYmIHNoZWV0Q2FsbGVyT3JpZ2luKSB7XHJcbiAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcclxuICAgICAgICAgIGZpbGVJZDogY3JlYXRlZEZpbGVJZCxcclxuICAgICAgICAgIHNoZWV0SWQ6IGxpbmtTaGVldElkLFxyXG4gICAgICAgICAgb3JpZ2luOiBzaGVldENhbGxlck9yaWdpbixcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICAgICAgZmlsZUlkOiBjcmVhdGVkRmlsZUlkLFxyXG4gICAgICAgICAgbW9kZTogXCJlZGl0XCIsXHJcbiAgICAgICAgICBvcmlnaW46IHNoZWV0Q2FsbGVyT3JpZ2luLFxyXG4gICAgICAgICAgc2hlZXRJZDogbGlua1NoZWV0SWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAgICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY2xlYXJFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCgpO1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/ZmlsZUlkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNyZWF0ZWRGaWxlSWQpfSZtb2RlPWVkaXQmb3JpZ2luPXRpY2tldC1jcmVhdGVgLCB7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBmYWJNZW51SXRlbXMgPSB1c2VNZW1vPEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW1bXT4oXHJcbiAgICAoKSA9PlxyXG4gICAgICBpc0xpbmtNb2RlXHJcbiAgICAgICAgPyBbXVxyXG4gICAgICAgIDogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaWQ6IFwibmV3LXRpY2tldFwiLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfTmV3VGlja2V0XCIsIFwiTnVldm8gVGlja2V0XCIpLFxyXG4gICAgICAgICAgICAgIGljb246IDxOZXdUaWNrZXRJY29uIC8+LFxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s6IG9wZW5Tb3VyY2VQaWNrZXIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdLFxyXG4gICAgW2lzTGlua01vZGUsIG9wZW5Tb3VyY2VQaWNrZXJdXHJcbiAgKTtcblxuICBjb25zdCBzZWxlY3RlZFRpY2tldENvdW50ID0gcmVzb2x2ZVNlbGVjdGVkQ291bnQodG90YWwpO1xuICBjb25zdCBzZWxlY3RlZFRvdGFsQW1vdW50VGV4dCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGxldCB0b3RhbEFtb3VudCA9IDA7XG5cbiAgICBzZWxlY3RlZFRpY2tldHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgYW1vdW50ID0gTnVtYmVyKGl0ZW0udG90YWxBbW91bnQgPz8gMCk7XG4gICAgICBpZiAoIU51bWJlci5pc0Zpbml0ZShhbW91bnQpKSByZXR1cm47XG4gICAgICB0b3RhbEFtb3VudCArPSBhbW91bnQ7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KHRvdGFsQW1vdW50LCByZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlKTtcbiAgfSwgW3JlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGUsIHNlbGVjdGVkVGlja2V0c10pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBjYW5jZWxsZWQgPSBmYWxzZTtcblxuICAgIGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUoKVxuICAgICAgLnRoZW4oKGN1cnJlbmN5KSA9PiB7XG4gICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbmN5ID0gc2FmZVRleHQoY3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIGlmIChub3JtYWxpemVkQ3VycmVuY3kpIHtcbiAgICAgICAgICBzZXRSZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlKG5vcm1hbGl6ZWRDdXJyZW5jeSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAvLyBLZWVwIHRoZSBkZWZhdWx0IE1TVCBsYWJlbCBpZiB0aGUgdXNlciBjb250ZXh0IGVuZHBvaW50IGlzIHVuYXZhaWxhYmxlLlxuICAgICAgfSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICB9O1xuICB9LCBbXSk7XG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XHJcbiAgICByZXZlYWxUb3BiYXJBY3Rpb25Hcm91cChcImV4cGVuc2UtdGlja2V0cy1saXN0LWFjdGlvbnNcIik7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBsaW5rTW9kZUNhbmNlbE1lc3NhZ2UgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT5cclxuICAgICAgaW5kVChcclxuICAgICAgICBcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0NhbmNlbENvbmZpcm1cIixcclxuICAgICAgICBcIlNlIGNhbmNlbGFyXHUwMEUxIGVsIHByb2Nlc28gZGUgdmluY3VsYWNpXHUwMEYzbiB5IHZvbHZlclx1MDBFMXMgYSBsYSBob2phIGRlIGdhc3Rvcy4gXHUwMEJGUXVpZXJlcyBjb250aW51YXI/XCJcclxuICAgICAgKSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodGlja2V0RmlsZUlkOiBzdHJpbmcsIHRpY2tldERhdGVWYWx1ZTogdW5rbm93bikgPT4ge1xyXG4gICAgICBjb25zdCBpbml0aWFsU25hcHNob3QgPSBidWlsZEluaXRpYWxTdGFuZGFyZFNuYXBzaG90KCk7XHJcblxyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJhcHBseUNyZWF0ZWRUaWNrZXRSZXR1cm46c3RhcnRcIiwge1xyXG4gICAgICAgIHRpY2tldEZpbGVJZCxcclxuICAgICAgICB0aWNrZXREYXRlVmFsdWUsXHJcbiAgICAgICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgICAgIGluaXRpYWxTbmFwc2hvdCxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XHJcbiAgICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhpbml0aWFsU25hcHNob3QpO1xyXG4gICAgICBjbGVhckxpc3RDYWNoZSgpO1xyXG4gICAgICByZXNldExpc3QoXCJjcmVhdGVkLXRpY2tldC1yZXR1cm5cIik7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcImFwcGx5Q3JlYXRlZFRpY2tldFJldHVybjpsb2FkTGlzdFwiLCB7XHJcbiAgICAgICAgcGFnZTogMSxcclxuICAgICAgICBpbml0aWFsU25hcHNob3QsXHJcbiAgICAgIH0pO1xyXG4gICAgICB2b2lkIGxvYWRMaXN0KDEsIGluaXRpYWxTbmFwc2hvdCk7XHJcblxyXG4gICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgdXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoXCJ0aWNrZXRGaWxlSWRcIik7XHJcbiAgICAgIHVybC5zZWFyY2hQYXJhbXMuZGVsZXRlKFwidGlja2V0RGF0ZVwiKTtcclxuICAgICAgY29uc3QgY2xlYW5lZFF1ZXJ5ID0gdXJsLnNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xyXG4gICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIFwiXCIsIGNsZWFuZWRRdWVyeSA/IGAke3VybC5wYXRobmFtZX0/JHtjbGVhbmVkUXVlcnl9YCA6IHVybC5wYXRobmFtZSk7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBidWlsZEluaXRpYWxTdGFuZGFyZFNuYXBzaG90LFxyXG4gICAgICBjbGVhckNhY2hlZFN0YXRlLFxyXG4gICAgICBjbGVhckxpc3RDYWNoZSxcclxuICAgICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgICBsb2FkTGlzdCxcclxuICAgICAgcmVzZXRMaXN0LFxyXG4gICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMsXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgcmVzdG9yZUxpbmtNb2RlUmV0dXJuU3RhdGUgPSB1c2VDYWxsYmFjayhcclxuICAgIChjYWNoZWRTdGF0ZTogRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSkgPT4ge1xyXG4gICAgICBjb25zdCByZXN0b3JlZE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oY2FjaGVkU3RhdGUuZmlsdGVycy5tYW5hZ2VkVXNlcklkKTtcclxuICAgICAgY29uc3QgcmVzdG9yZWRGaWx0ZXJzID0ge1xyXG4gICAgICAgIC4uLmNhY2hlZFN0YXRlLmZpbHRlcnMsXHJcbiAgICAgICAgbWFuYWdlZFVzZXJJZDogcmVzdG9yZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKHJlc3RvcmVkRmlsdGVycyk7XHJcbiAgICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBjYWNoZWRTdGF0ZS5zY3JvbGxZO1xyXG4gICAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLmZvY3VzRmlsZUlkO1xyXG4gICAgICByZXN0b3JlTGlua1RpY2tldFNlbGVjdGlvbih7XHJcbiAgICAgICAgc2VsZWN0aW9uTW9kZTogY2FjaGVkU3RhdGUuc2VsZWN0aW9uTW9kZSxcclxuICAgICAgICBzZWxlY3RlZFRpY2tldHM6IGNhY2hlZFN0YXRlLnNlbGVjdGVkVGlja2V0cyxcclxuICAgICAgICBleGNsdWRlZElkczogY2FjaGVkU3RhdGUuZXhjbHVkZWRJZHMsXHJcbiAgICAgICAgZmlsdGVyZWRTbmFwc2hvdDogY2FjaGVkU3RhdGUuZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzLFxyXG4gICAgICAgIGZpbHRlcmVkVG90YWxDb3VudDogY2FjaGVkU3RhdGUuZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbCxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoY2FjaGVkU3RhdGUuaXRlbXMubGVuZ3RoID4gMCB8fCBjYWNoZWRTdGF0ZS50b3RhbCA+IDApIHtcclxuICAgICAgICByZXN0b3JlTGlzdFNuYXBzaG90KHtcclxuICAgICAgICAgIGl0ZW1zOiBjYWNoZWRTdGF0ZS5pdGVtcyxcclxuICAgICAgICAgIHRvdGFsOiBjYWNoZWRTdGF0ZS50b3RhbCxcclxuICAgICAgICAgIHBhZ2U6IGNhY2hlZFN0YXRlLnBhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkKGNhY2hlZFN0YXRlLnBhZ2UsIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKHJlc3RvcmVkRmlsdGVycyksIHtcclxuICAgICAgICBjbGVhckNhY2hlOiB0cnVlLFxyXG4gICAgICAgIHdhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHk6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQsXHJcbiAgICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcclxuICAgICAgcmVzdG9yZUxpbmtUaWNrZXRTZWxlY3Rpb24sXHJcbiAgICAgIHJlc3RvcmVMaXN0U25hcHNob3QsXHJcbiAgICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkLFxyXG4gICAgICBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24sXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgcmVzdG9yZUluaXRpYWxMaW5rTW9kZVN0YXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgbGlua1NuYXBzaG90ID0gYnVpbGRJbml0aWFsTGlua01vZGVTbmFwc2hvdCgpO1xyXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xyXG4gICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKCk7XHJcbiAgICBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24oKTtcclxuICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xyXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKGxpbmtTbmFwc2hvdCk7XHJcbiAgICBydW5BdXRvbWF0aWNMaXN0TG9hZCgxLCBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZChsaW5rU25hcHNob3QpLCB7XHJcbiAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXHJcbiAgICAgIHJlc2V0QmVmb3JlTG9hZDogdHJ1ZSxcclxuICAgICAgd2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeTogdHJ1ZSxcclxuICAgIH0pO1xyXG4gIH0sIFtcclxuICAgIGJ1aWxkSW5pdGlhbExpbmtNb2RlU25hcHNob3QsXHJcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxyXG4gICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG4gICAgY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uLFxyXG4gICAgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQsXHJcbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMsXHJcbiAgICBydW5BdXRvbWF0aWNMaXN0TG9hZCxcclxuICBdKTtcclxuXHJcbiAgLy8gQXBwbGllcyBkZWZhdWx0IGZpcnN0LWVudHJ5IGZpbHRlcnMgZm9yIHRoZSBzdGFuZGFyZCB0aWNrZXRzIGxpc3Qgb25seS5cclxuICBjb25zdCByZXN0b3JlSW5pdGlhbFN0YW5kYXJkU3RhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBpbml0aWFsU25hcHNob3QgPSBidWlsZEluaXRpYWxTdGFuZGFyZFNuYXBzaG90KCk7XHJcbiAgICBjbGVhckNhY2hlZFN0YXRlKCk7XHJcbiAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoKTtcclxuICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKGluaXRpYWxTbmFwc2hvdCk7XHJcbiAgICBydW5BdXRvbWF0aWNMaXN0TG9hZCgxLCBpbml0aWFsU25hcHNob3QsIHtcclxuICAgICAgY2xlYXJDYWNoZTogdHJ1ZSxcclxuICAgICAgcmVzZXRCZWZvcmVMb2FkOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgfSwgW1xyXG4gICAgYnVpbGRJbml0aWFsU3RhbmRhcmRTbmFwc2hvdCxcclxuICAgIGNsZWFyQ2FjaGVkU3RhdGUsXHJcbiAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsXHJcbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMsXHJcbiAgICBydW5BdXRvbWF0aWNMaXN0TG9hZCxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgcmVzdG9yZVN0YW5kYXJkUmV0dXJuU3RhdGUgPSB1c2VDYWxsYmFjayhcclxuICAgIChjYWNoZWRTdGF0ZTogRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSkgPT4ge1xyXG4gICAgICBjb25zdCByZXN0b3JlZE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oY2FjaGVkU3RhdGUuZmlsdGVycy5tYW5hZ2VkVXNlcklkKTtcclxuICAgICAgY29uc3QgcmVzdG9yZWRGaWx0ZXJzID0ge1xyXG4gICAgICAgIC4uLmNhY2hlZFN0YXRlLmZpbHRlcnMsXHJcbiAgICAgICAgbWFuYWdlZFVzZXJJZDogcmVzdG9yZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKHJlc3RvcmVkRmlsdGVycyk7XHJcbiAgICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBjYWNoZWRTdGF0ZS5zY3JvbGxZO1xyXG4gICAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLmZvY3VzRmlsZUlkO1xyXG5cclxuICAgICAgaWYgKGNhY2hlZFN0YXRlLml0ZW1zLmxlbmd0aCA+IDAgfHwgY2FjaGVkU3RhdGUudG90YWwgPiAwKSB7XHJcbiAgICAgICAgcmVzdG9yZUxpc3RTbmFwc2hvdCh7XHJcbiAgICAgICAgICBpdGVtczogY2FjaGVkU3RhdGUuaXRlbXMsXHJcbiAgICAgICAgICB0b3RhbDogY2FjaGVkU3RhdGUudG90YWwsXHJcbiAgICAgICAgICBwYWdlOiBjYWNoZWRTdGF0ZS5wYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBydW5BdXRvbWF0aWNMaXN0TG9hZChjYWNoZWRTdGF0ZS5wYWdlLCByZXN0b3JlZEZpbHRlcnMsIHtcclxuICAgICAgICBjbGVhckNhY2hlOiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLCByZXN0b3JlTGlzdFNuYXBzaG90LCBydW5BdXRvbWF0aWNMaXN0TG9hZCwgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXVxyXG4gICk7XHJcblxyXG4gIC8vIEtlZXBzIGRlbGV0ZSByZXR1cm4gZXhwbGljaXQ6IGJsYW5rIGZpbHRlcnMsIG9wZW4gcGFuZWwsIGFuZCBubyBhdXRvbWF0aWMgcmVsb2FkLlxyXG4gIGNvbnN0IHJlc3RvcmVEZWxldGVSZXR1cm5TdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcclxuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xyXG4gICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24oKTtcclxuICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xyXG4gICAgb25DbGVhcigpO1xyXG4gIH0sIFtjbGVhckNhY2hlZFN0YXRlLCBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbiwgb25DbGVhcl0pO1xyXG5cclxuICBjb25zdCB0b2dnbGVUaWNrZXRTZWxlY3Rpb24gPSB1c2VDYWxsYmFjayhcclxuICAgICh0aWNrZXQ6IEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW0pID0+IHtcclxuICAgICAgaWYgKCFpc0xpbmtNb2RlIHx8ICFjYW5Qcm9jZXNzTGlua01vZGUgfHwgbGlua1NoZWV0Q2hlY2tCdXN5IHx8IGxpbmtTaGVldExvY2tlZCB8fCBsaW5rRmxvd0J1c3kpIHJldHVybjtcclxuICAgICAgaWYgKHRpY2tldC5raW5kICE9PSBcImxpbmtcIikgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQodGlja2V0LmZpbGVJZCk7XHJcbiAgICAgIGlmICghZmlsZUlkKSByZXR1cm47XHJcbiAgICAgIGlmICghY2FuU2VsZWN0VGlja2V0Rm9yTGluayh0aWNrZXQpKSByZXR1cm47XHJcblxyXG4gICAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcclxuICAgICAgdG9nZ2xlTGlua1RpY2tldFNlbGVjdGlvbih0aWNrZXQpO1xyXG4gICAgfSxcclxuICAgIFtjYW5Qcm9jZXNzTGlua01vZGUsIGlzTGlua01vZGUsIGxpbmtGbG93QnVzeSwgbGlua1NoZWV0Q2hlY2tCdXN5LCBsaW5rU2hlZXRMb2NrZWQsIHRvZ2dsZUxpbmtUaWNrZXRTZWxlY3Rpb25dXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgY2xlYXJUaWNrZXRTZWxlY3Rpb24gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRTZWxlY3RBbGxFcnJvcihcIlwiKTtcclxuICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xyXG4gICAgY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uKCk7XHJcbiAgfSwgW2NsZWFyTGlua1RpY2tldFNlbGVjdGlvbl0pO1xyXG5cclxuICBjb25zdCByZXNvbHZlQWN0aXZlRmlsdGVycyA9IHVzZUNhbGxiYWNrKCgpOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0+IHtcclxuICAgIGNvbnN0IGJhc2VTbmFwc2hvdCA9IGFwcGxpZWRGaWx0ZXJzIHx8IGN1cnJlbnRGaWx0ZXJzO1xyXG4gICAgY29uc3QgcmVzb2x2ZWRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGJhc2VTbmFwc2hvdC5tYW5hZ2VkVXNlcklkKTtcclxuICAgIHJldHVybiBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZCh7XHJcbiAgICAgIC4uLmJhc2VTbmFwc2hvdCxcclxuICAgICAgbWFuYWdlZFVzZXJJZDogcmVzb2x2ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgfSk7XHJcbiAgfSwgW2FwcGxpZWRGaWx0ZXJzLCBjdXJyZW50RmlsdGVycywgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xyXG4gIGNvbnN0IHJlc29sdmVBY3RpdmVGaWx0ZXJzRXZlbnQgPSB1c2VFZmZlY3RFdmVudChyZXNvbHZlQWN0aXZlRmlsdGVycyk7XHJcblxyXG4gIC8vIEFjdGl2YXRlcyBiYWNrZW5kLWRyaXZlbiBmaWx0ZXJlZCBzZWxlY3Rpb24gZm9yIHRoZSBjdXJyZW50IGZpbHRlciBzbmFwc2hvdC5cclxuICBjb25zdCBzZWxlY3RBbGxNYXRjaGluZ1RpY2tldHMgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoIWlzTGlua01vZGUgfHwgIWNhblByb2Nlc3NMaW5rTW9kZSB8fCBsaW5rU2hlZXRDaGVja0J1c3kgfHwgbGlua1NoZWV0TG9ja2VkIHx8IGxpbmtGbG93QnVzeSB8fCBzZWxlY3RBbGxCdXN5KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTZWxlY3RBbGxCdXN5KHRydWUpO1xyXG4gICAgc2V0U2VsZWN0QWxsRXJyb3IoXCJcIik7XHJcbiAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBhY3RpdmVGaWx0ZXJzID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnMoKTtcclxuICAgICAgc2VsZWN0QWxsQnlGaWx0ZXJzKGFjdGl2ZUZpbHRlcnMsIHRvdGFsKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJUaWNrZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldHMuXCIpO1xyXG4gICAgICBzZXRTZWxlY3RBbGxFcnJvcihtZXNzYWdlKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldFNlbGVjdEFsbEJ1c3koZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtcclxuICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGlzTGlua01vZGUsXHJcbiAgICBsaW5rRmxvd0J1c3ksXHJcbiAgICBsaW5rU2hlZXRDaGVja0J1c3ksXHJcbiAgICBsaW5rU2hlZXRMb2NrZWQsXHJcbiAgICByZXNvbHZlQWN0aXZlRmlsdGVycyxcclxuICAgIHNlbGVjdEFsbEJ5RmlsdGVycyxcclxuICAgIHNlbGVjdEFsbEJ1c3ksXHJcbiAgICB0b3RhbCxcclxuICBdKTtcclxuXHJcbiAgLy8gS2VlcHMgc2VsZWN0ZWQgY2FyZCBtZXRhZGF0YSBmcmVzaCB3aXRoIHRoZSBsYXRlc3QgbGlzdCBwYXlsb2FkLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWlzTGlua01vZGUgfHwgaXRlbXMubGVuZ3RoIDwgMSkgcmV0dXJuO1xyXG4gICAgaHlkcmF0ZVZpc2libGVUaWNrZXRzKGl0ZW1zLmZpbHRlcigoaXRlbSk6IGl0ZW0gaXMgRXhwZW5zZVRpY2tldExpbmtDYXJkID0+IGl0ZW0ua2luZCA9PT0gXCJsaW5rXCIpKTtcclxuICB9LCBbaHlkcmF0ZVZpc2libGVUaWNrZXRzLCBpc0xpbmtNb2RlLCBpdGVtc10pO1xyXG5cclxuICBjb25zdCBydW5UaWNrZXRMaW5rRmxvdyA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmICghaXNMaW5rTW9kZSB8fCAhbGlua1NoZWV0SWQgfHwgbGlua0Zsb3dCdXN5KSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChsaW5rU2hlZXRMb2NrZWQgfHwgIWNhblByb2Nlc3NMaW5rTW9kZSkge1xyXG4gICAgICBjb25zdCBibG9ja2VkTWVzc2FnZSA9XHJcbiAgICAgICAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UgfHxcclxuICAgICAgICBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUmVhZE9ubHlCeVN0YXR1c1wiLCBcIk5vIHNlIHB1ZWRlIGVkaXRhciBlc3RhIGhvamEgZGUgZ2FzdG9zIGVuIGVsIGVzdGFkbyBhY3R1YWwuXCIpO1xyXG4gICAgICBzZXRMaW5rRmxvd0Vycm9yKGJsb2NrZWRNZXNzYWdlKTtcclxuICAgICAgc2V0TGlua0Zsb3dTdGF0dXMoYmxvY2tlZE1lc3NhZ2UpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZWxlY3RlZENvdW50ID0gcmVzb2x2ZVNlbGVjdGVkQ291bnQodG90YWwpO1xyXG4gICAgaWYgKHNlbGVjdGVkQ291bnQgPCAxKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhY3RpdmVGaWx0ZXJzID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnMoKTtcclxuICAgIGNvbnN0IHJlcXVlc3RBeFVzZXJJZCA9IHNhZmVUZXh0KGFjdGl2ZUZpbHRlcnMubWFuYWdlZFVzZXJJZCB8fCBjdXJyZW50QXhVc2VySWQpO1xyXG5cclxuICAgIHNldExpbmtGbG93QnVzeSh0cnVlKTtcclxuICAgIHNldExpbmtGbG93RXJyb3IoXCJcIik7XHJcbiAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcclxuICAgIHNldExpbmtGbG93U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfTGlua2luZ0xpbmVcIiwgXCJMaW5raW5nIGV4cGVuc2UgbGluZS4uLlwiKSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBsaW5rRXhwZW5zZVNoZWV0VGlja2V0c0J1bGsoXHJcbiAgICAgICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZVxyXG4gICAgICAgICAgPyB7XHJcbiAgICAgICAgICAgICAgZXhwZW5zZVNoZWV0SWQ6IGxpbmtTaGVldElkLFxyXG4gICAgICAgICAgICAgIHNlbGVjdGlvbk1vZGU6IFwiZmlsdGVyZWRcIixcclxuICAgICAgICAgICAgICBmaWx0ZXJzOiBidWlsZEV4cGVuc2VUaWNrZXRMaW5rQnVsa0ZpbHRlcnMoZmlsdGVyZWRTbmFwc2hvdCB8fCBhY3RpdmVGaWx0ZXJzKSxcclxuICAgICAgICAgICAgICBleGNsdWRlZElkcyxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgOiB7XHJcbiAgICAgICAgICAgICAgZXhwZW5zZVNoZWV0SWQ6IGxpbmtTaGVldElkLFxyXG4gICAgICAgICAgICAgIHNlbGVjdGlvbk1vZGU6IFwic2VsZWN0ZWRcIixcclxuICAgICAgICAgICAgICB0aWNrZXRJZHM6IHNlbGVjdGVkVGlja2V0cy5mbGF0TWFwKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChpdGVtLmZpbGVJZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsZUlkID8gW2ZpbGVJZF0gOiBbXTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgIGF4VXNlcklkT3ZlcnJpZGU6IHJlcXVlc3RBeFVzZXJJZCB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5EYXRhIHx8IG51bGw7XHJcbiAgICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgY29uc3QgZmFpbHVyZU1lc3NhZ2UgPSByZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcclxuICAgICAgICBzZXRMaW5rRmxvd0Vycm9yKGZhaWx1cmVNZXNzYWdlKTtcclxuICAgICAgICBzZXRMaW5rRmxvd1N0YXR1cyhmYWlsdXJlTWVzc2FnZSk7XHJcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0TGlua0J1bGtSZXN1bHQocmVzdWx0KTtcclxuXHJcbiAgICAgIGlmIChyZXN1bHQubGlua2VkQ291bnQgPiAwKSB7XHJcbiAgICAgICAgY2xlYXJUaWNrZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XHJcbiAgICAgICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKCk7XHJcbiAgICAgICAgY2xlYXJFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCgpO1xyXG4gICAgICAgIGNvbnN0IHN1Y2Nlc3NNYXJrID0gcmVzdWx0LmZhaWxlZENvdW50ID4gMCB8fCByZXN1bHQuc2tpcHBlZENvdW50ID4gMCA/IFwid2FybmluZ1Byb2Nlc3NcIiA6IFwib2tQcm9jZXNzXCI7XHJcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKHN1Y2Nlc3NNYXJrLCBzdWNjZXNzTWFyayA9PT0gXCJva1Byb2Nlc3NcIiA/IDEyMDAgOiAxNTAwKTtcclxuICAgICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChidWlsZEV4cGVuc2VTaGVldERldGFpbFVybChsaW5rU2hlZXRJZCksIHtcclxuICAgICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICBieXBhc3NHdWFyZE9uY2U6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyZXN1bHQuZmFpbGVkQ291bnQgPiAwICYmIHJlc3VsdC5saW5rZWRDb3VudCA8IDEpIHtcclxuICAgICAgICBjb25zdCBmYWlsdXJlTWVzc2FnZSA9IHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpO1xyXG4gICAgICAgIHNldExpbmtGbG93U3RhdHVzKGZhaWx1cmVNZXNzYWdlKTtcclxuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgICAgYXdhaXQgbG9hZExpc3QoY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLCBhY3RpdmVGaWx0ZXJzKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHJlc3VsdC5mYWlsZWRDb3VudCA+IDAgfHwgcmVzdWx0LnNraXBwZWRDb3VudCA+IDApIHtcclxuICAgICAgICBzZXRMaW5rRmxvd1N0YXR1cyhyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKSk7XHJcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwid2FybmluZ1Byb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgICAgYXdhaXQgbG9hZExpc3QoY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLCBhY3RpdmVGaWx0ZXJzKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0TGlua0Zsb3dTdGF0dXMocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIikpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgMTIwMCk7XHJcbiAgICAgIGF3YWl0IGxvYWRMaXN0KGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSwgYWN0aXZlRmlsdGVycyk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc3QgZmFpbHVyZU1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcclxuICAgICAgc2V0TGlua0Zsb3dFcnJvcihmYWlsdXJlTWVzc2FnZSk7XHJcbiAgICAgIHNldExpbmtGbG93U3RhdHVzKGZhaWx1cmVNZXNzYWdlKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRMaW5rRmxvd0J1c3koZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtcclxuICAgIGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsLFxyXG4gICAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxyXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSxcclxuICAgIGNsZWFyVGlja2V0U2VsZWN0aW9uLFxyXG4gICAgY3VycmVudFBhZ2UsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBleGNsdWRlZElkcyxcclxuICAgIGZpbHRlcmVkU25hcHNob3QsXHJcbiAgICBpc0xpbmtNb2RlLFxyXG4gICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSxcclxuICAgIGxpbmtGbG93QnVzeSxcclxuICAgIGxpbmtTaGVldElkLFxyXG4gICAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UsXHJcbiAgICBsaW5rU2hlZXRMb2NrZWQsXHJcbiAgICBsb2FkTGlzdCxcclxuICAgIHJlc29sdmVBY3RpdmVGaWx0ZXJzLFxyXG4gICAgcmVzb2x2ZVNlbGVjdGVkQ291bnQsXHJcbiAgICBzZWxlY3RlZFRpY2tldHMsXHJcbiAgICB0b3RhbCxcclxuICBdKTtcclxuXHJcbiAgY29uc3Qgb3BlbkxpbmtDb25maXJtTW9kYWwgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWlzTGlua01vZGUgfHwgc2VsZWN0ZWRUaWNrZXRDb3VudCA8IDEgfHwgbGlua0Zsb3dCdXN5IHx8IGxpbmtTaGVldENoZWNrQnVzeSB8fCBsaW5rU2hlZXRMb2NrZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldExpbmtGbG93RXJyb3IoXCJcIik7XHJcbiAgICBzZXRMaW5rRmxvd1N0YXR1cyhcIlwiKTtcclxuICAgIG9wZW5Db25maXJtKHtcclxuICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9MaW5rQnV0dG9uXCIsIFwiVmluY3VsYXIgdGlja2V0KHMpXCIpLFxyXG4gICAgICBtZXNzYWdlOiBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlXHJcbiAgICAgICAgPyBgJHtpbmRUKFwiTmF2X0V4cGVuc2VUaWNrZXRzXCIsIFwiVGlja2V0c1wiKX06ICR7c2VsZWN0ZWRUaWNrZXRDb3VudH1gXHJcbiAgICAgICAgOiBgJHtpbmRUKFwiTmF2X0V4cGVuc2VUaWNrZXRzXCIsIFwiVGlja2V0c1wiKX06ICR7c2VsZWN0ZWRUaWNrZXRDb3VudH1cXG4ke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1RvdGFsQW1vdW50XCIsIFwiUmVpbWJ1cnNlbWVudCBhbW91bnRcIil9OiAke3NlbGVjdGVkVG90YWxBbW91bnRUZXh0fWAsXG4gICAgICBjb25maXJtVGV4dDogaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0xpbmtCdXR0b25cIiwgXCJWaW5jdWxhciB0aWNrZXQocylcIiksXHJcbiAgICAgIGNhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxyXG4gICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcclxuICAgICAgICByZXR1cm4gcnVuVGlja2V0TGlua0Zsb3coKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0sIFtcclxuICAgIGlzTGlua01vZGUsXHJcbiAgICBzZWxlY3RlZFRpY2tldENvdW50LFxyXG4gICAgbGlua0Zsb3dCdXN5LFxyXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gICAgbGlua1NoZWV0TG9ja2VkLFxyXG4gICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgc2VsZWN0ZWRUb3RhbEFtb3VudFRleHQsXHJcbiAgICBydW5UaWNrZXRMaW5rRmxvdyxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TGlua0Zsb3dFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5OiBsaW5rRmxvd0J1c3ksXHJcbiAgICAgIG9uRXJyb3I6IChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgc2V0TGlua0Zsb3dFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICBzZXRMaW5rRmxvd1N0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgfSxcclxuICAgICAgZGVmYXVsdEVycm9yTWVzc2FnZTogaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpLFxyXG4gICAgfSk7XHJcbiAgfSwgW2hhbmRsZUNvbmZpcm0sIGxpbmtGbG93QnVzeV0pO1xyXG5cclxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcclxuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBsaW5rRmxvd0J1c3lcclxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxyXG4gICAgOiAhbGlua0Zsb3dCdXN5ICYmIGxpbmtGbG93RXJyb3JcclxuICAgICAgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIilcclxuICAgICAgOiBtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFsaW5rRmxvd0J1c3kgJiYgbGlua0Zsb3dFcnJvcikge1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdm9pZCBoYW5kbGVNb2RhbENvbmZpcm0oKTtcclxuICB9LCBbY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm0sIGxpbmtGbG93QnVzeSwgbGlua0Zsb3dFcnJvcl0pO1xyXG5cclxuICBjb25zdCBvcGVuVGlja2V0RGV0YWlsID0gdXNlQ2FsbGJhY2soXHJcbiAgICAocmF3RmlsZUlkOiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQocmF3RmlsZUlkKTtcclxuICAgICAgaWYgKCFmaWxlSWQpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnMgfHwgY3VycmVudEZpbHRlcnM7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHtcclxuICAgICAgICBmaWx0ZXJzOiBzbmFwc2hvdCxcclxuICAgICAgICBwYWdlOiBjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsXHJcbiAgICAgICAgc2Nyb2xsWTogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5zY3JvbGxZIHx8IDAgOiAwLFxyXG4gICAgICAgIGZvY3VzRmlsZUlkOiBmaWxlSWQsXHJcbiAgICAgICAgaXRlbXMsXHJcbiAgICAgICAgdG90YWwsXHJcbiAgICAgICAgc2VsZWN0ZWRUaWNrZXRzLFxyXG4gICAgICAgIGxpbmtNb2RlU2hlZXRJZDogaXNMaW5rTW9kZSA/IGxpbmtTaGVldElkIDogXCJcIixcclxuICAgICAgICBzZWxlY3Rpb25Nb2RlLFxyXG4gICAgICAgIGV4Y2x1ZGVkSWRzLFxyXG4gICAgICAgIGZpbHRlcmVkU2VsZWN0aW9uRmlsdGVyczogZmlsdGVyZWRTbmFwc2hvdCxcclxuICAgICAgICBmaWx0ZXJlZFNlbGVjdGlvblRvdGFsOiBmaWx0ZXJlZFRvdGFsQ291bnQsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoaXNMaW5rTW9kZSkge1xuICAgICAgICBjb25zdCBzaG91bGRPcGVuRmFpbGVkVGlja2V0SW5FZGl0TW9kZSA9IGZhaWxlZExpbmtUaWNrZXRJZHMuaGFzKGZpbGVJZC50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgc2F2ZUNhY2hlZFN0YXRlKGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgIHNhdmVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKHtcbiAgICAgICAgICBzaGVldElkOiBsaW5rU2hlZXRJZCxcbiAgICAgICAgICBwYWdlOiBjdXJyZW50U3RhdGUucGFnZSxcclxuICAgICAgICAgIHNjcm9sbFk6IGN1cnJlbnRTdGF0ZS5zY3JvbGxZLFxyXG4gICAgICAgICAgZm9jdXNGaWxlSWQ6IGZpbGVJZCxcclxuICAgICAgICAgIGZpbHRlcnM6IHNuYXBzaG90LFxyXG4gICAgICAgICAgc2VsZWN0aW9uTW9kZSxcclxuICAgICAgICAgIHNlbGVjdGVkVGlja2V0cyxcclxuICAgICAgICAgIGV4Y2x1ZGVkSWRzLFxyXG4gICAgICAgICAgZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzOiBmaWx0ZXJlZFNuYXBzaG90LFxyXG4gICAgICAgICAgZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbDogZmlsdGVyZWRUb3RhbENvdW50LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XG4gICAgICAgICAgZmlsZUlkLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHNob3VsZE9wZW5GYWlsZWRUaWNrZXRJbkVkaXRNb2RlKSB7XG4gICAgICAgICAgcXVlcnkuc2V0KFwibW9kZVwiLCBcImVkaXRcIik7XG4gICAgICAgICAgcXVlcnkuc2V0KFwiaW50ZW50XCIsIEVYUEVOU0VfVElDS0VUX0xJTktfRkFJTFVSRV9SRVBBSVJfSU5URU5UKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzU2hlZXRDYWxsZXJDb250ZXh0ICYmIHNoZWV0Q2FsbGVyT3JpZ2luKSB7XG4gICAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcbiAgICAgICAgICAgIGZpbGVJZCxcbiAgICAgICAgICAgIHNoZWV0SWQ6IGxpbmtTaGVldElkLFxyXG4gICAgICAgICAgICBvcmlnaW46IHNoZWV0Q2FsbGVyT3JpZ2luLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBxdWVyeS5zZXQoXCJvcmlnaW5cIiwgc2hlZXRDYWxsZXJPcmlnaW4pO1xyXG4gICAgICAgICAgcXVlcnkuc2V0KFwic2hlZXRJZFwiLCBsaW5rU2hlZXRJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcclxuICAgICAgICAgIGJ5cGFzc0d1YXJkT25jZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNhdmVDYWNoZWRTdGF0ZShjdXJyZW50U3RhdGUpO1xyXG4gICAgICBpZiAoaGFzU2hlZXRDYWxsZXJDb250ZXh0ICYmIHNoZWV0Q2FsbGVyT3JpZ2luKSB7XHJcbiAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcclxuICAgICAgICAgIGZpbGVJZCxcclxuICAgICAgICAgIHNoZWV0SWQ6IGxpbmtTaGVldElkLFxyXG4gICAgICAgICAgb3JpZ2luOiBzaGVldENhbGxlck9yaWdpbixcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgICAgb3JpZ2luOiBzaGVldENhbGxlck9yaWdpbixcclxuICAgICAgICAgIHNoZWV0SWQ6IGxpbmtTaGVldElkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiBmYWxzZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoKTtcclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsP2ZpbGVJZD0ke2VuY29kZVVSSUNvbXBvbmVudChmaWxlSWQpfWAsIHtcclxuICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXHJcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBhcHBsaWVkRmlsdGVycyxcclxuICAgICAgY3VycmVudFBhZ2UsXHJcbiAgICAgIGN1cnJlbnRGaWx0ZXJzLFxyXG4gICAgICBoYXNTaGVldENhbGxlckNvbnRleHQsXHJcbiAgICAgIGxpbmtTaGVldElkLFxyXG4gICAgICBpc0xpbmtNb2RlLFxyXG4gICAgICBpdGVtcyxcclxuICAgICAgZmlsdGVyZWRUb3RhbENvdW50LFxuICAgICAgZmlsdGVyZWRTbmFwc2hvdCxcbiAgICAgIGV4Y2x1ZGVkSWRzLFxuICAgICAgZmFpbGVkTGlua1RpY2tldElkcyxcbiAgICAgIHNoZWV0Q2FsbGVyT3JpZ2luLFxuICAgICAgc2F2ZUNhY2hlZFN0YXRlLFxuICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsXHJcbiAgICAgIHNlbGVjdGVkVGlja2V0cyxcclxuICAgICAgc2VsZWN0aW9uTW9kZSxcclxuICAgICAgdG90YWwsXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgPSB1c2VDYWxsYmFjaygodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcclxuICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XHJcbiAgICBjb25zdCBjYXJkID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XHJcbiAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xyXG4gICAgaWYgKCF0aW1lbGluZUNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gY2FyZDtcclxuICB9LCBbXSk7XHJcblxyXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoe1xyXG4gICAgY29udGFpbmVyUmVmOiB0aW1lbGluZUNvbnRhaW5lclJlZixcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGl0ZW1zLFxyXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwoKHRvdGFsIHx8IDApIC8gUEFHRV9TSVpFKTtcclxuICBjb25zdCBzaG93TGlzdExvYWRpbmcgPSBpc0xvYWRpbmc7XHJcbiAgY29uc3QgbGlua01vZGVTZWxlY3Rpb25CdXR0b25zRGlzYWJsZWQgPSBsaW5rRmxvd0J1c3kgfHwgc2VsZWN0QWxsQnVzeSB8fCBpc0xvYWRpbmc7XHJcblxyXG4gIGNvbnN0IHN1bW1hcnlJdGVtcyA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3Qgc25hcHNob3QgPSBhcHBsaWVkRmlsdGVycztcclxuICAgIGlmICghc25hcHNob3QpIHJldHVybiBbXSBhcyBBcnJheTx7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0+O1xyXG5cclxuICAgIGNvbnN0IHN1bW1hcnk6IEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfT4gPSBbXTtcclxuICAgIGNvbnN0IGxvY2FsZSA9IGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiO1xyXG4gICAgY29uc3QgZnJvbURhdGVUZXh0ID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKHNuYXBzaG90LmZyb21EYXRlLCBsb2NhbGUsIFwiXCIpO1xyXG4gICAgY29uc3QgdG9EYXRlVGV4dCA9IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShzbmFwc2hvdC50b0RhdGUsIGxvY2FsZSwgXCJcIik7XHJcblxyXG4gICAgaWYgKGZyb21EYXRlVGV4dCB8fCB0b0RhdGVUZXh0KSB7XHJcbiAgICAgIHN1bW1hcnkucHVzaCh7XHJcbiAgICAgICAga2V5OiBcImZyb21EYXRlXCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpLFxyXG4gICAgICAgIHZhbHVlOiBmcm9tRGF0ZVRleHQgfHwgXCItLVwiLFxyXG4gICAgICB9KTtcclxuICAgICAgc3VtbWFyeS5wdXNoKHtcclxuICAgICAgICBrZXk6IFwidG9EYXRlXCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIiksXHJcbiAgICAgICAgdmFsdWU6IHRvRGF0ZVRleHQgfHwgXCItLVwiLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc25hcHNob3QuZmlsdGVyS2V5LnRyaW0oKSkge1xyXG4gICAgICBzdW1tYXJ5LnB1c2goe1xyXG4gICAgICAgIGtleTogXCJmaWx0ZXJLZXlcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0ZpbHRlcktleVwiLCBcIlRpY2tldFwiKSxcclxuICAgICAgICB2YWx1ZTogc25hcHNob3QuZmlsdGVyS2V5LnRyaW0oKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNuYXBzaG90LmN1cnJlbmN5Q29kZS50cmltKCkpIHtcclxuICAgICAgc3VtbWFyeS5wdXNoKHtcclxuICAgICAgICBrZXk6IFwiY3VycmVuY3lcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIiksXHJcbiAgICAgICAgdmFsdWU6IHNuYXBzaG90LmN1cnJlbmN5Q29kZS50cmltKCksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzbmFwc2hvdC5zdGF0dXNGaWx0ZXIgIT09IFwiXCIpIHtcclxuICAgICAgc3VtbWFyeS5wdXNoKHtcclxuICAgICAgICBrZXk6IFwic3RhdHVzXCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9TdGF0dXNcIiwgXCJTdGF0dXNcIiksXHJcbiAgICAgICAgdmFsdWU6IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbChzbmFwc2hvdC5zdGF0dXNGaWx0ZXIpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc25hcHNob3QuZ2FzdG9UeXBlRmlsdGVyICE9PSBcIlwiKSB7XHJcbiAgICAgIGNvbnN0IGNhdGVnb3J5TGFiZWwgPSBnYXN0b1R5cGVMYWJlbE1hcC5nZXQoU3RyaW5nKHNuYXBzaG90Lmdhc3RvVHlwZUZpbHRlcikpIHx8IFN0cmluZyhzbmFwc2hvdC5nYXN0b1R5cGVGaWx0ZXIpO1xyXG4gICAgICBzdW1tYXJ5LnB1c2goe1xyXG4gICAgICAgIGtleTogXCJjYXRlZ29yeVwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKSxcclxuICAgICAgICB2YWx1ZTogY2F0ZWdvcnlMYWJlbCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNuYXBzaG90LnByb2Nlc3NlZEJ5SWFGaWx0ZXIgIT09IFwiYWxsXCIpIHtcclxuICAgICAgc3VtbWFyeS5wdXNoKHtcclxuICAgICAgICBrZXk6IFwicHJvY2Vzc2VkXCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBXCIsIFwiUHJvY2Vzc2VkIGJ5IElBXCIpLFxyXG4gICAgICAgIHZhbHVlOlxyXG4gICAgICAgICAgc25hcHNob3QucHJvY2Vzc2VkQnlJYUZpbHRlciA9PT0gXCJ5ZXNcIlxyXG4gICAgICAgICAgICA/IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBX1llc1wiLCBcIlllc1wiKVxyXG4gICAgICAgICAgICA6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBX05vXCIsIFwiTm9cIiksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdW1tYXJ5O1xyXG4gIH0sIFthcHBsaWVkRmlsdGVycywgZ2FzdG9UeXBlTGFiZWxNYXBdKTtcclxuXHJcbiAgY29uc3Qgc2hvd1N1bW1hcnkgPSAhaXNMaW5rTW9kZSAmJiAhc2hvd0ZpbHRlcnMgJiYgc3VtbWFyeUl0ZW1zLmxlbmd0aCA+IDA7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWlzTGlua01vZGUpIHJldHVybjtcclxuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoe1xyXG4gICAgICBhY3RpdmU6IHRydWUsXHJcbiAgICAgIG1lc3NhZ2U6IGxpbmtNb2RlQ2FuY2VsTWVzc2FnZSxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtpc0xpbmtNb2RlLCBsaW5rTW9kZUNhbmNlbE1lc3NhZ2VdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDplbnRlclwiLCB7XHJcbiAgICAgIHVybDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5sb2NhdGlvbi5ocmVmIDogXCJcIixcclxuICAgICAgZGlkUmVzdG9yZU9uTW91bnQ6IGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQsXHJcbiAgICAgIGhhc0FjY2VzcyxcclxuICAgICAgaXNMaW5rTW9kZSxcclxuICAgICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gICAgfSk7XHJcbiAgICBpZiAoZGlkUmVzdG9yZU9uTW91bnRSZWYuY3VycmVudCkge1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c1dhcm4oXCJtb3VudFJlc3RvcmVFZmZlY3Q6c2tpcC1hbHJlYWR5LXJlc3RvcmVkXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoIWhhc0FjY2Vzcykge1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c1dhcm4oXCJtb3VudFJlc3RvcmVFZmZlY3Q6c2tpcC1uby1hY2Nlc3NcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWlzTGlua01vZGUpIHtcclxuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgIGNvbnN0IHRpY2tldEZpbGVJZCA9IHNhZmVUZXh0KHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwidGlja2V0RmlsZUlkXCIpKTtcclxuICAgICAgaWYgKHRpY2tldEZpbGVJZCkge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDp0aWNrZXQtY3JlYXRlLXJldHVybi1kZXRlY3RlZFwiLCB7XHJcbiAgICAgICAgICB0aWNrZXRGaWxlSWQsXHJcbiAgICAgICAgICB0aWNrZXREYXRlOiB1cmwuc2VhcmNoUGFyYW1zLmdldChcInRpY2tldERhdGVcIiksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGlkUmVzdG9yZU9uTW91bnRSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICAgICAgYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuKHRpY2tldEZpbGVJZCwgdXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJ0aWNrZXREYXRlXCIpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIW1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSkge1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c1dhcm4oXCJtb3VudFJlc3RvcmVFZmZlY3Q6d2FpdGluZy1tYW5hZ2VtZW50LWJvb3RzdHJhcFwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZGlkUmVzdG9yZU9uTW91bnRSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICBjb25zdCBpc0hpc3RvcnlCYWNrRm9yd2FyZCA9IGlzRXhwZW5zZUhpc3RvcnlCYWNrRm9yd2FyZE5hdmlnYXRpb24oKTtcclxuICAgIGNvbnN0IGlzUmV0dXJuRnJvbVRpY2tldERldGFpbCA9IGhhc0V4cGVuc2VSZXR1cm5SZWZlcnJlcihbXHJcbiAgICAgIFwiL0dhc3Rvcy9UaWNrZXREZXRhaWxcIixcclxuICAgICAgXCIvR2FzdG9zL1RpY2tldExpbmVEZXRhaWxcIixcclxuICAgIF0pO1xyXG4gICAgY29uc3QgcmV0dXJuTW9kZSA9IGNvbnN1bWVSZXR1cm5Nb2RlKCk7XHJcbiAgICBjb25zdCBoYXNSZXR1cm5GbGFnID0gY29uc3VtZVJldHVybkZsYWcoKTtcclxuXHJcbiAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6cmVzb2x2ZWQtcmV0dXJuLXN0YXRlXCIsIHtcclxuICAgICAgaXNIaXN0b3J5QmFja0ZvcndhcmQsXHJcbiAgICAgIGlzUmV0dXJuRnJvbVRpY2tldERldGFpbCxcclxuICAgICAgcmV0dXJuTW9kZSxcclxuICAgICAgaGFzUmV0dXJuRmxhZyxcclxuICAgICAgaXNMaW5rTW9kZSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXR1cm5Nb2RlID09PSBcInJlc2V0X2ZpbHRlcnNcIiAmJiBoYXNSZXR1cm5GbGFnKSB7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXN0b3JlLWRlbGV0ZS1yZXR1cm5cIik7XHJcbiAgICAgIHJlc3RvcmVEZWxldGVSZXR1cm5TdGF0ZSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzTGlua01vZGUpIHtcclxuICAgICAgY29uc3QgaXNSZXR1cm5pbmdGcm9tRGV0YWlsID0gaGFzUmV0dXJuRmxhZyB8fCBpc0hpc3RvcnlCYWNrRm9yd2FyZCB8fCBpc1JldHVybkZyb21UaWNrZXREZXRhaWw7XHJcbiAgICAgIGNvbnN0IGNhY2hlZFN0YXRlID0gaXNSZXR1cm5pbmdGcm9tRGV0YWlsID8gcmVhZENhY2hlZFN0YXRlKCkgOiBudWxsO1xyXG4gICAgICBjb25zdCBjYWNoZWRTaGVldElkID0gc2FmZVRleHQoY2FjaGVkU3RhdGU/LmxpbmtNb2RlU2hlZXRJZCk7XHJcbiAgICAgIGlmIChjYWNoZWRTdGF0ZSAmJiBjYWNoZWRTaGVldElkICYmIGNhY2hlZFNoZWV0SWQgPT09IHNhZmVUZXh0KGxpbmtTaGVldElkKSkge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXN0b3JlLWxpbmstbW9kZS1jYWNoZVwiLCB7XHJcbiAgICAgICAgICBjYWNoZWRTaGVldElkLFxyXG4gICAgICAgICAgcGFnZTogY2FjaGVkU3RhdGUucGFnZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoKTtcclxuICAgICAgICByZXN0b3JlTGlua01vZGVSZXR1cm5TdGF0ZShjYWNoZWRTdGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBsaW5rUmV0dXJuU3RhdGUgPSBpc1JldHVybmluZ0Zyb21EZXRhaWwgPyByZWFkRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZShsaW5rU2hlZXRJZCkgOiBudWxsO1xyXG4gICAgICBpZiAobGlua1JldHVyblN0YXRlKSB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OnJlc3RvcmUtbGluay1tb2RlLXJldHVybi1zdGF0ZVwiLCB7XHJcbiAgICAgICAgICBzaGVldElkOiBsaW5rUmV0dXJuU3RhdGUuc2hlZXRJZCxcclxuICAgICAgICAgIHBhZ2U6IGxpbmtSZXR1cm5TdGF0ZS5wYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xyXG4gICAgICAgIHJlc3RvcmVMaW5rTW9kZVJldHVyblN0YXRlKHtcclxuICAgICAgICAgIGZpbHRlcnM6IGxpbmtSZXR1cm5TdGF0ZS5maWx0ZXJzLFxyXG4gICAgICAgICAgcGFnZTogbGlua1JldHVyblN0YXRlLnBhZ2UsXHJcbiAgICAgICAgICBzY3JvbGxZOiBsaW5rUmV0dXJuU3RhdGUuc2Nyb2xsWSxcclxuICAgICAgICAgIGZvY3VzRmlsZUlkOiBsaW5rUmV0dXJuU3RhdGUuZm9jdXNGaWxlSWQsXHJcbiAgICAgICAgICBpdGVtczogW10sXHJcbiAgICAgICAgICBzZWxlY3RlZFRpY2tldHM6IGxpbmtSZXR1cm5TdGF0ZS5zZWxlY3RlZFRpY2tldHMsXHJcbiAgICAgICAgICB0b3RhbDogMCxcclxuICAgICAgICAgIGxpbmtNb2RlU2hlZXRJZDogbGlua1JldHVyblN0YXRlLnNoZWV0SWQsXHJcbiAgICAgICAgICBzZWxlY3Rpb25Nb2RlOiBsaW5rUmV0dXJuU3RhdGUuc2VsZWN0aW9uTW9kZSxcclxuICAgICAgICAgIGV4Y2x1ZGVkSWRzOiBsaW5rUmV0dXJuU3RhdGUuZXhjbHVkZWRJZHMsXHJcbiAgICAgICAgICBmaWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnM6IGxpbmtSZXR1cm5TdGF0ZS5maWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnMsXHJcbiAgICAgICAgICBmaWx0ZXJlZFNlbGVjdGlvblRvdGFsOiBsaW5rUmV0dXJuU3RhdGUuZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbCxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXN0b3JlLWluaXRpYWwtbGluay1tb2RlXCIpO1xyXG4gICAgICByZXN0b3JlSW5pdGlhbExpbmtNb2RlU3RhdGUoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaGFzUmV0dXJuRmxhZyAmJiAhaXNIaXN0b3J5QmFja0ZvcndhcmQgJiYgIWlzUmV0dXJuRnJvbVRpY2tldERldGFpbCkge1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6cmVzdG9yZS1pbml0aWFsLXN0YW5kYXJkLXN0YXRlXCIpO1xyXG4gICAgICByZXN0b3JlSW5pdGlhbFN0YW5kYXJkU3RhdGUoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNhY2hlZFN0YXRlID0gcmVhZENhY2hlZFN0YXRlKCk7XHJcbiAgICBpZiAoIWNhY2hlZFN0YXRlKSB7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzV2FybihcIm1vdW50UmVzdG9yZUVmZmVjdDpuby1jYWNoZWQtc3RhdGVcIik7XHJcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXN0b3JlLXN0YW5kYXJkLWNhY2hlXCIsIHtcclxuICAgICAgcGFnZTogY2FjaGVkU3RhdGUucGFnZSxcclxuICAgICAgZm9jdXNGaWxlSWQ6IGNhY2hlZFN0YXRlLmZvY3VzRmlsZUlkLFxyXG4gICAgfSk7XHJcbiAgICByZXN0b3JlU3RhbmRhcmRSZXR1cm5TdGF0ZShjYWNoZWRTdGF0ZSk7XHJcbiAgfSwgW1xyXG4gICAgYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuLFxyXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSxcclxuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSxcclxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxyXG4gICAgY29uc3VtZVJldHVybk1vZGUsXHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBpc0xpbmtNb2RlLFxyXG4gICAgbGlua1NoZWV0SWQsXHJcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgICByZWFkQ2FjaGVkU3RhdGUsXHJcbiAgICByZWFkRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSxcclxuICAgIHJlc3RvcmVEZWxldGVSZXR1cm5TdGF0ZSxcclxuICAgIHJlc3RvcmVJbml0aWFsTGlua01vZGVTdGF0ZSxcclxuICAgIHJlc3RvcmVJbml0aWFsU3RhbmRhcmRTdGF0ZSxcclxuICAgIHJlc3RvcmVMaW5rTW9kZVJldHVyblN0YXRlLFxyXG4gICAgcmVzdG9yZVN0YW5kYXJkUmV0dXJuU3RhdGUsXHJcbiAgXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoaXNMb2FkaW5nKSByZXR1cm47XHJcbiAgICBpZiAocGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9PSBudWxsICYmICFwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHBlbmRpbmdTY3JvbGxZID0gcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudDtcclxuICAgIGNvbnN0IHBlbmRpbmdGb2N1c0ZpbGVJZCA9IHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50O1xyXG4gICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IFwiXCI7XHJcblxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgIGlmIChwZW5kaW5nU2Nyb2xsWSAhPSBudWxsKSB7XHJcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcclxuICAgICAgICAgIHRvcDogTWF0aC5tYXgoMCwgcGVuZGluZ1Njcm9sbFkpLFxyXG4gICAgICAgICAgYmVoYXZpb3I6IFwiYXV0b1wiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXBlbmRpbmdGb2N1c0ZpbGVJZCB8fCAhdGltZWxpbmVDb250YWluZXJSZWYuY3VycmVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEZvY3VzSWQgPSBwZW5kaW5nRm9jdXNGaWxlSWQudG9VcHBlckNhc2UoKTtcclxuICAgICAgY29uc3QgdGltZWxpbmVJdGVtcyA9IEFycmF5LmZyb20oXHJcbiAgICAgICAgdGltZWxpbmVDb250YWluZXJSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1pdGVtW2RhdGEtdGlja2V0LWZpbGUtaWRdXCIpXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG1hdGNoaW5nSXRlbSA9IHRpbWVsaW5lSXRlbXMuZmluZCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzYWZlVGV4dChpdGVtLmRhdGFzZXQudGlja2V0RmlsZUlkKS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkRm9jdXNJZDtcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnN0IHRhcmdldENhcmQgPSBtYXRjaGluZ0l0ZW0/LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcclxuICAgICAgaWYgKCF0YXJnZXRDYXJkKSByZXR1cm47XHJcblxyXG4gICAgICB0YXJnZXRDYXJkLmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcclxuICAgIH0pO1xyXG4gIH0sIFtpc0xvYWRpbmcsIGl0ZW1zLmxlbmd0aF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkgfHwgIWhhc0FjY2VzcykgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVBhZ2VTaG93ID0gKGV2ZW50OiBQYWdlVHJhbnNpdGlvbkV2ZW50KSA9PiB7XHJcbiAgICAgIGlmICghZXZlbnQucGVyc2lzdGVkICYmICFpc0V4cGVuc2VIaXN0b3J5QmFja0ZvcndhcmROYXZpZ2F0aW9uKCkpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnNFdmVudCgpO1xyXG4gICAgICBpZiAoIWlzTGlua01vZGUgJiYgKCFzbmFwc2hvdC5mcm9tRGF0ZSB8fCAhc25hcHNob3QudG9EYXRlKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcnVuQXV0b21hdGljTGlzdExvYWQoY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLCBzbmFwc2hvdCwge1xyXG4gICAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIGhhbmRsZVBhZ2VTaG93KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgaGFuZGxlUGFnZVNob3cpO1xyXG4gICAgfTtcclxuICB9LCBbY3VycmVudFBhZ2UsIGhhc0FjY2VzcywgaXNMaW5rTW9kZSwgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LCBydW5BdXRvbWF0aWNMaXN0TG9hZF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgb25Ub2dnbGVGaWx0ZXJzID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCB3aWxsT3BlbiA9ICFzaG93RmlsdGVycztcclxuICAgICAgdG9nZ2xlRmlsdGVyUGFuZWwoKTtcclxuICAgICAgaWYgKHdpbGxPcGVuKSB7XHJcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHsgdG9wOiAwLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvblJlZnJlc2ggPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnNFdmVudCgpO1xyXG4gICAgICBpZiAoIWlzTGlua01vZGUgJiYgKCFzbmFwc2hvdD8uZnJvbURhdGUgfHwgIXNuYXBzaG90Py50b0RhdGUpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHZvaWQgbG9hZExpc3QoY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLCBzbmFwc2hvdCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXhwZW5zZS10aWNrZXRzLXRvZ2dsZS1maWx0ZXJcIiwgb25Ub2dnbGVGaWx0ZXJzKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXhwZW5zZS10aWNrZXRzLXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXhwZW5zZS10aWNrZXRzLXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcclxuICAgIH07XHJcbiAgfSwgW2N1cnJlbnRQYWdlLCBpc0xpbmtNb2RlLCBsb2FkTGlzdCwgc2hvd0ZpbHRlcnMsIHRvZ2dsZUZpbHRlclBhbmVsXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxyXG4gICAgICA8Q29uZmlybU1vZGFsXHJcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cclxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XHJcbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cclxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbENhbmNlbFRleHR9XHJcbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XHJcbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cclxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XHJcbiAgICAgICAgYnVzeT17bGlua0Zsb3dCdXN5fVxyXG4gICAgICAgIGVycm9yPXtsaW5rRmxvd0Vycm9yfVxyXG4gICAgICAgIHN0YXR1cz17bGlua0Zsb3dTdGF0dXN9XHJcbiAgICAgICAgb25Db25maXJtPXtoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm19XHJcbiAgICAgICAgb25DYW5jZWw9e2Nsb3NlQ29uZmlybX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxpbnB1dFxyXG4gICAgICAgIHJlZj17Y2FtZXJhSW5wdXRSZWZ9XHJcbiAgICAgICAgdHlwZT1cImZpbGVcIlxyXG4gICAgICAgIGFjY2VwdD17VElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEV9XHJcbiAgICAgICAgY2FwdHVyZT1cImVudmlyb25tZW50XCJcclxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxyXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmZpbGVzPy5bMF0gfHwgbnVsbDtcclxuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgdm9pZCBoYW5kbGVTZWxlY3RlZEZpbGUoZmlsZSwgXCJjYW1lcmFcIik7XHJcbiAgICAgICAgfX1cclxuICAgICAgLz5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgcmVmPXtnYWxsZXJ5SW5wdXRSZWZ9XHJcbiAgICAgICAgdHlwZT1cImZpbGVcIlxyXG4gICAgICAgIGFjY2VwdD17VElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEV9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcclxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQuY3VycmVudFRhcmdldC5maWxlcz8uWzBdIHx8IG51bGw7XHJcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgIHZvaWQgaGFuZGxlU2VsZWN0ZWRGaWxlKGZpbGUsIFwiZ2FsbGVyeVwiKTtcclxuICAgICAgICB9fVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgeyFpc0xpbmtNb2RlICYmIHNvdXJjZVBpY2tlck9wZW4gPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTk1MC80NSBweC00IHB5LTZcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LXNtIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHAtNCBzaGFkb3cteGxcIj5cclxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtWzE2cHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS04MDBcIj5cclxuICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9UaXRsZVwiLCBcIk51ZXZvIHRpY2tldFwiKX1cclxuICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgICAge2luZFQoXHJcbiAgICAgICAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9Cb2R5XCIsXHJcbiAgICAgICAgICAgICAgICBcIlNlbGVjY2lvbmEgdW5hIGZ1ZW50ZSBwYXJhIGNhcHR1cmFyIG8gZWxlZ2lyIGxhIGltYWdlbiBkZWwgdGlja2V0LlwiXHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9wPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IGdyaWQgZ3JpZC1jb2xzLTEgZ2FwLTJcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZvaWQgc2VsZWN0RnJvbUNhbWVyYShjYW1lcmFJbnB1dFJlZi5jdXJyZW50KTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfQ2FtZXJhXCIsIFwiVXNhciBjXHUwMEUxbWFyYVwiKX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RGcm9tR2FsbGVyeShnYWxsZXJ5SW5wdXRSZWYuY3VycmVudCl9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfR2FsbGVyeVwiLCBcIkVsZWdpciBpbWFnZW5cIil9XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17Y2xvc2VTb3VyY2VQaWNrZXJ9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHshaXNMaW5rTW9kZSA/IChcclxuICAgICAgICA8RXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5XHJcbiAgICAgICAgICBvcGVuPXtxdWlja1RpY2tldEJ1c3l9XHJcbiAgICAgICAgICB0aXRsZT17aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX1RpdGxlXCIsIFwiUHJvY2Vzc2luZyB0aWNrZXRcIil9XHJcbiAgICAgICAgICBzdW1tYXJ5PXtxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICAgICAgZWxhcHNlZE1zPXtxdWlja1RpY2tldEVsYXBzZWRNc31cclxuICAgICAgICAgIHN0YWdlcz17cXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlc31cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHshaXNMaW5rTW9kZSAmJiBxdWlja1RpY2tldEVycm9yTWVzc2FnZSA/IChcclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZVxyXG4gICAgICAgICAgICAgID8gXCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1hbWJlci0yMDAgYmctYW1iZXItNTAgcC0zIHRleHQtc20gdGV4dC1hbWJlci05MDBcIlxyXG4gICAgICAgICAgICAgIDogXCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy1yb3NlLTUwIHAtMyB0ZXh0LXNtIHRleHQtcm9zZS04MDBcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxwPntxdWlja1RpY2tldEVycm9yTWVzc2FnZX08L3A+XHJcbiAgICAgICAgICB7cXVpY2tUaWNrZXRBdHRlbXB0SWQgPyAoXHJcbiAgICAgICAgICAgIDxwXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcclxuICAgICAgICAgICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlXHJcbiAgICAgICAgICAgICAgICAgID8gXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBiZy13aGl0ZSBweC0yIHB5LTEgZm9udC1tb25vIHRleHQtWzExcHhdIHRleHQtYW1iZXItOTAwIGJyZWFrLWFsbFwiXHJcbiAgICAgICAgICAgICAgICAgIDogXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXdoaXRlIHB4LTIgcHktMSBmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1yb3NlLTgwMCBicmVhay1hbGxcIlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtgYXR0ZW1wdElkOiAke3F1aWNrVGlja2V0QXR0ZW1wdElkfWB9XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmVcclxuICAgICAgICAgICAgICAgICAgPyBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItYW1iZXItMjAwIGJnLXdoaXRlIHAtMiB0ZXh0LXhzIHRleHQtYW1iZXItODAwXCJcclxuICAgICAgICAgICAgICAgICAgOiBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctd2hpdGUgcC0yIHRleHQteHMgdGV4dC1yb3NlLTcwMFwiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lm1hcCgoZW50cnkpID0+IChcclxuICAgICAgICAgICAgICAgIDxwIGtleT17YCR7ZW50cnkuc3RlcH0tJHtlbnRyeS5hdH1gfT57YCR7ZW50cnkuc3RlcH06ICR7ZW50cnkudHJhY2VJZH1gfTwvcD5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTJcIj5cclxuICAgICAgICAgICAge2hhc1BlbmRpbmdVcGxvYWRSZXRyeSA/IChcclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB2b2lkIHJldHJ5UGVuZGluZ1VwbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1JldHJ5VXBsb2FkXCIsIFwiUmVpbnRlbnRhciB1cGxvYWRcIil9XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCIgb25DbGljaz17Y2xlYXJRdWlja1RpY2tldEVycm9yfT5cclxuICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9DbG9zZVwiLCBcIkNsb3NlXCIpfVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHtzaG93U3VtbWFyeSA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1zdW1tYXJ5IHAtMyBzbTpwLTQgbXQtMSBtYi0zXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4cGVuc2Utc3VtbWFyeS1ncmlkIGdyaWQgZ3JpZC1jb2xzLTEgbWluLVszNjBweF06Z3JpZC1jb2xzLTIgaXRlbXMtc3RhcnQgZ2FwLXgtNCBnYXAteS0xIHRleHQteHNcIj5cclxuICAgICAgICAgICAge3N1bW1hcnlJdGVtcy5tYXAoKGl0ZW0pID0+IChcclxuICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICBrZXk9e2l0ZW0ua2V5fVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeSBoaXN0b3J5LWZpbHRlci1zdW1tYXJ5LS1ncmlkLWl0ZW0gbGVhZGluZy01IG1pbi13LTBcIlxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN1bW1hcnlfX2xhYmVsIGZvbnQtc2VtaWJvbGRcIj57aXRlbS5sYWJlbH06PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeV9fdmFsdWUgYnJlYWstd29yZHNcIj57aXRlbS52YWx1ZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgPEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsXHJcbiAgICAgICAgbW9kZT17aXNMaW5rTW9kZSA/IFwibGlua1wiIDogXCJnZW5lcmFsXCJ9XHJcbiAgICAgICAgdmlzaWJsZT17c2hvd0ZpbHRlcnN9XHJcbiAgICAgICAgc2hvd01hbnVhbERhdGVGaWx0ZXI9e3Nob3dNYW51YWxEYXRlRmlsdGVyfVxyXG4gICAgICAgIG1hbnVhbERhdGVBdXRvT3BlbktleT17bWFudWFsRGF0ZUF1dG9PcGVuS2V5fVxyXG4gICAgICAgIGZyb21EYXRlPXtmcm9tRGF0ZX1cclxuICAgICAgICB0b0RhdGU9e3RvRGF0ZX1cclxuICAgICAgICBmaWx0ZXJLZXk9e2ZpbHRlcktleX1cclxuICAgICAgICBjdXJyZW5jeUNvZGU9e2N1cnJlbmN5Q29kZX1cbiAgICAgICAgbWFuYWdlZFVzZXJJZD17bWFuYWdlZFVzZXJJZH1cbiAgICAgICAgbWFuYWdlZFVzZXJzPXttYW5hZ2VkVXNlcnN9XG4gICAgICAgIGN1cnJlbnRBeFVzZXJJZD17Y3VycmVudEF4VXNlcklkfVxuICAgICAgICBjdXJyZW50VXNlck5hbWU9e2N1cnJlbnRVc2VyTmFtZX1cbiAgICAgICAgc2hvd01hbmFnZWRVc2VyRmlsdGVyPXtzaG93TWFuYWdlZFVzZXJGaWx0ZXJ9XG4gICAgICAgIHN0YXR1c0ZpbHRlcj17c3RhdHVzRmlsdGVyfVxyXG4gICAgICAgIGdhc3RvVHlwZUZpbHRlcj17Z2FzdG9UeXBlRmlsdGVyfVxyXG4gICAgICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXI9e3Byb2Nlc3NlZEJ5SWFGaWx0ZXJ9XHJcbiAgICAgICAgYWN0aXZlUXVpY2tGaWx0ZXI9e2FjdGl2ZVF1aWNrRmlsdGVyfVxyXG4gICAgICAgIHNob3dNYW51YWxEYXRlRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3J9XHJcbiAgICAgICAgc3RhdHVzRmlsdGVyUmVhZE9ubHk9e3N0YXR1c0ZpbHRlckxvY2tlZH1cclxuICAgICAgICBmaXhlZFN0YXR1c0ZpbHRlcj17Zml4ZWRTdGF0dXNGaWx0ZXJ9XHJcbiAgICAgICAgZ2FzdG9UeXBlT3B0aW9ucz17Z2FzdG9UeXBlT3B0aW9uc31cclxuICAgICAgICBvbkRhdGVSYW5nZUNoYW5nZT17b25EYXRlUmFuZ2VDaGFuZ2V9XHJcbiAgICAgICAgb25NYW51YWxSYW5nZUNvbXBsZXRlPXtvbk1hbnVhbFJhbmdlQ29tcGxldGV9XHJcbiAgICAgICAgb25RdWlja0ZpbHRlckNoYW5nZT17b25RdWlja0ZpbHRlckNoYW5nZX1cclxuICAgICAgICBvbkZpbHRlcktleUNoYW5nZT17c2V0RmlsdGVyS2V5fVxyXG4gICAgICAgIG9uQ3VycmVuY3lDb2RlQ2hhbmdlPXtzZXRDdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgb25NYW5hZ2VkVXNlcklkQ2hhbmdlPXtzZXRNYW5hZ2VkVXNlcklkfVxyXG4gICAgICAgIG9uU3RhdHVzRmlsdGVyQ2hhbmdlPXtzZXRTdGF0dXNGaWx0ZXJ9XHJcbiAgICAgICAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2U9e3NldEdhc3RvVHlwZUZpbHRlcn1cclxuICAgICAgICBvblByb2Nlc3NlZEJ5SWFGaWx0ZXJDaGFuZ2U9e3NldFByb2Nlc3NlZEJ5SWFGaWx0ZXJ9XHJcbiAgICAgICAgb25DbGVhcj17b25DbGVhcn1cclxuICAgICAgICBvbkFwcGx5PXtvbkFwcGx5fVxyXG4gICAgICAvPlxyXG5cclxuICAgICAge2lzTGlua01vZGUgPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgcHgtMC41XCI+XHJcbiAgICAgICAgICB7IWNhblByb2Nlc3NMaW5rTW9kZSA/IChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtcm9zZS03MDBcIj57aW5kVChcIkF1dGhfUGVybWlzc2lvbkRlbmllZF9Cb2R5XCIsIFwiTm8gcGVybWlzc2lvbi5cIil9PC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmIGxpbmtTaGVldENoZWNrQnVzeSA/IChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCI+XHJcbiAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNCB3LTRcIiBsYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0gLz5cclxuICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAge2NhblByb2Nlc3NMaW5rTW9kZSAmJiAhbGlua1NoZWV0Q2hlY2tCdXN5ICYmIHNlbGVjdEFsbEJ1c3kgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiPlxyXG4gICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9IC8+XHJcbiAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgIHtjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiBsaW5rU2hlZXRMb2NrZWQgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXJvc2UtNzAwXCI+XHJcbiAgICAgICAgICAgICAge2xpbmtTaGVldEJsb2NrZWRNZXNzYWdlIHx8XHJcbiAgICAgICAgICAgICAgICBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUmVhZE9ubHlCeVN0YXR1c1wiLCBcIk5vIHNlIHB1ZWRlIGVkaXRhciBlc3RhIGhvamEgZGUgZ2FzdG9zIGVuIGVsIGVzdGFkbyBhY3R1YWwuXCIpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgIHtjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiAhbGlua1NoZWV0TG9ja2VkICYmIHNlbGVjdEFsbEVycm9yID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1yb3NlLTcwMFwiPntzZWxlY3RBbGxFcnJvcn08L2Rpdj5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgIHtjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiAhbGlua1NoZWV0TG9ja2VkID8gKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNSBncmlkIGdyaWQtY29scy0yIGdhcC0xLjUgcHQtMC41IHNtOm1iLTZcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBtaW4tdy0wIHB4LTEuNSBweS0xIHRleHQtWzEwcHhdIGxlYWRpbmctdGlnaHQgc206dGV4dC14c1wiXHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2b2lkIHNlbGVjdEFsbE1hdGNoaW5nVGlja2V0cygpO1xyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17bGlua01vZGVTZWxlY3Rpb25CdXR0b25zRGlzYWJsZWQgfHwgdG90YWwgPCAxfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1NlbGVjdEFsbFwiLCBcIlNlbGVjY2lvbmFyIHRvZG9cIil9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBtaW4tdy0wIHB4LTEuNSBweS0xIHRleHQtWzEwcHhdIGxlYWRpbmctdGlnaHQgc206dGV4dC14c1wiXHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NsZWFyVGlja2V0U2VsZWN0aW9ufVxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17bGlua01vZGVTZWxlY3Rpb25CdXR0b25zRGlzYWJsZWQgfHwgc2VsZWN0ZWRUaWNrZXRDb3VudCA8IDF9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfQ2xlYXJBbGxcIiwgXCJCb3JyYXIgc2VsZWNjaVx1MDBGM25cIil9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICB7aXNMaW5rTW9kZSA/IDxFeHBlbnNlVGlja2V0TGlua0J1bGtTdW1tYXJ5IHJlc3VsdD17bGlua0J1bGtSZXN1bHR9IC8+IDogbnVsbH1cclxuXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxyXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IHNob3dMaXN0TG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgc2l6ZS01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cclxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtlcnJvck1lc3NhZ2UgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxyXG5cclxuICAgICAgeyFzaG93TGlzdExvYWRpbmcgJiYgIWVycm9yTWVzc2FnZSAmJiBpdGVtcy5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2luZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKX0gLz5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICB7IWVycm9yTWVzc2FnZSAmJiBpdGVtcy5sZW5ndGggPiAwID8gKFxyXG4gICAgICAgIDxkaXYgcmVmPXt0aW1lbGluZUNvbnRhaW5lclJlZn0gY2xhc3NOYW1lPVwidGltZWxpbmUtYm94XCI+XHJcbiAgICAgICAgICB7aXRlbXMubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KGl0ZW0uZmlsZUlkKTtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZVBhcnRzID0gZm9ybWF0RXhwZW5zZURhdGVQYXJ0cyhpdGVtLnRyYW5zRGF0ZSwgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCIpO1xyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IHNhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pIHx8IHNhZmVUZXh0KGl0ZW0uZmlsZU5hbWUpIHx8IGZpbGVJZCB8fCBcIi1cIjtcclxuICAgICAgICAgICAgY29uc3QgYW1vdW50VGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShpdGVtLnRvdGFsQW1vdW50ID8/IG51bGwsIHJlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGUpO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzQ29kZSA9IGl0ZW0ua2luZCA9PT0gXCJnZW5lcmFsXCIgPyBpdGVtLnN0YXR1cyA6IG51bGw7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1c0xhYmVsID0gc3RhdHVzQ29kZSA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbChzdGF0dXNDb2RlKTtcclxuICAgICAgICAgICAgY29uc3QgaXNBc3NpZ25lZFRvRXhwZW5zZVNoZWV0ID0gc3RhdHVzQ29kZSA9PT0gMTtcclxuICAgICAgICAgICAgY29uc3Qgc2hvd1Byb2Nlc3NlZEJ5QWlJY29uID0gaXRlbS5wcm9jZXNzZWRCeUFJID09PSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGFibGVJbkxpbmtNb2RlID0gaXNMaW5rTW9kZSAmJiBjYW5TZWxlY3RUaWNrZXRGb3JMaW5rKGl0ZW0pO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkSW5MaW5rTW9kZSA9IGlzTGlua01vZGUgJiYgaXNMaW5rVGlja2V0U2VsZWN0ZWQoZmlsZUlkKTtcclxuICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkQnlBaUxhYmVsID0gaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdFRpY2tldExhYmVsID0gaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1NlbGVjdFRpY2tldFwiLCBcIlNlbGVjY2lvbmFyIHRpY2tldFwiKTtcclxuICAgICAgICAgICAgY29uc3QgZ2FzdG9UeXBlQ29kZSA9IGl0ZW0uZ2FzdG9UeXBlID09PSBudWxsID8gXCJcIiA6IFN0cmluZyhpdGVtLmdhc3RvVHlwZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGdhc3RvVHlwZUxhYmVsID0gZ2FzdG9UeXBlQ29kZVxyXG4gICAgICAgICAgICAgID8gZ2FzdG9UeXBlTGFiZWxNYXAuZ2V0KGdhc3RvVHlwZUNvZGUpIHx8IGdhc3RvVHlwZUNvZGVcclxuICAgICAgICAgICAgICA6IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBjYXJkU3VidGl0bGUgPSBnYXN0b1R5cGVMYWJlbDtcclxuICAgICAgICAgICAgY29uc3QgdGlja2V0Q2FyZEtleSA9XHJcbiAgICAgICAgICAgICAgZmlsZUlkIHx8XHJcbiAgICAgICAgICAgICAgYCR7c2FmZVRleHQoaXRlbS5maWxlTmFtZSl9LSR7c2FmZVRleHQoaXRlbS50cmFuc0RhdGUpfS0ke3NhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pfS0ke1N0cmluZyhpdGVtLnRvdGFsQW1vdW50ID8/IFwiXCIpfWA7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNMaW5rTW9kZSAmJiBpdGVtLmtpbmQgPT09IFwibGlua1wiKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbVxyXG4gICAgICAgICAgICAgICAgICBrZXk9e3RpY2tldENhcmRLZXl9XHJcbiAgICAgICAgICAgICAgICAgIGZpbGVJZD17ZmlsZUlkfVxyXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxyXG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZT17Y2FyZFN1YnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxyXG4gICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkPXtpc1NlbGVjdGVkSW5MaW5rTW9kZX1cclxuICAgICAgICAgICAgICAgICAgaXNTZWxlY3RhYmxlPXtpc1NlbGVjdGFibGVJbkxpbmtNb2RlfVxyXG4gICAgICAgICAgICAgICAgICBzZWxlY3Rpb25EaXNhYmxlZD17bGlua0Zsb3dCdXN5IHx8IGxpbmtTaGVldENoZWNrQnVzeSB8fCBsaW5rU2hlZXRMb2NrZWR9XHJcbiAgICAgICAgICAgICAgICAgIHNlbGVjdExhYmVsPXtzZWxlY3RUaWNrZXRMYWJlbH1cclxuICAgICAgICAgICAgICAgICAgb25PcGVuRGV0YWlsPXsoKSA9PiBvcGVuVGlja2V0RGV0YWlsKGZpbGVJZCl9XHJcbiAgICAgICAgICAgICAgICAgIG9uVG9nZ2xlU2VsZWN0PXsoKSA9PiB0b2dnbGVUaWNrZXRTZWxlY3Rpb24oaXRlbSl9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJhc2VTdGF0dXNJY29ucyA9IGlzQXNzaWduZWRUb0V4cGVuc2VTaGVldCB8fCBzaG93UHJvY2Vzc2VkQnlBaUljb24gPyAoXHJcbiAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIHtpc0Fzc2lnbmVkVG9FeHBlbnNlU2hlZXQgPyAoXHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImV4cGVuc2UtdGlja2V0LWNhcmRfX3N0YXR1cy1pY29uXCIgcm9sZT1cImltZ1wiIGFyaWEtbGFiZWw9e3N0YXR1c0xhYmVsfT5cclxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJzaXplLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTEzLjE5IDguNjg4YTQuNSA0LjUgMCAwIDEgMS4yNDIgNy4yNDRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMS02LjM2NC02LjM2NGwxLjc1Ny0xLjc1N20xMy4zNS0uNjIyIDEuNzU3LTEuNzU3YTQuNSA0LjUgMCAwIDAtNi4zNjQtNi4zNjRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMCAxLjI0MiA3LjI0NFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgICAgIHtzaG93UHJvY2Vzc2VkQnlBaUljb24gPyAoXHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb24gZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb24tLWFpXCJcclxuICAgICAgICAgICAgICAgICAgICByb2xlPVwiaW1nXCJcclxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtwcm9jZXNzZWRCeUFpTGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJzaXplLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTQgMThsNC0xMmw0IDEyXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTYgMTNoNFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCA2aDZcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTcgNnYxMlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAxOGg2XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICkgOiBudWxsO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICBrZXk9e3RpY2tldENhcmRLZXl9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0aW1lbGluZS1pdGVtXCJcclxuICAgICAgICAgICAgICAgIGRhdGEtdGlja2V0LWZpbGUtaWQ9e2ZpbGVJZCB8fCB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPEV4cGVuc2VUaW1lbGluZUNhcmRcclxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cclxuICAgICAgICAgICAgICAgICAgc3VidGl0bGU9e2NhcmRTdWJ0aXRsZX1cclxuICAgICAgICAgICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cclxuICAgICAgICAgICAgICAgICAgb25PcGVuPXsoKSA9PiBvcGVuVGlja2V0RGV0YWlsKGZpbGVJZCl9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlQ2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fdGl0bGUgdGltZWxpbmUtbmFtZVwiXHJcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0xhYmVsPXtzdGF0dXNMYWJlbH1cclxuICAgICAgICAgICAgICAgICAgc3RhdHVzSWNvbj17YmFzZVN0YXR1c0ljb25zfVxyXG4gICAgICAgICAgICAgICAgICBzdGF0dXNJY29uQ2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb25zXCJcclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICA8Q29tcGFjdFBhZ2luYXRpb25cclxuICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbFBhZ2VzfVxyXG4gICAgICAgIGN1cnJlbnRQYWdlPXtjdXJyZW50UGFnZX1cclxuICAgICAgICBsb2FkaW5nPXtpc0xvYWRpbmd9XHJcbiAgICAgICAgb25QYWdlQ2hhbmdlPXsocGFnZSkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgc25hcHNob3QgPSByZXNvbHZlQWN0aXZlRmlsdGVycygpO1xyXG4gICAgICAgICAgaWYgKCFpc0xpbmtNb2RlICYmICghc25hcHNob3Q/LmZyb21EYXRlIHx8ICFzbmFwc2hvdD8udG9EYXRlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdm9pZCBsb2FkTGlzdChwYWdlLCBzbmFwc2hvdCk7XHJcbiAgICAgICAgfX1cclxuICAgICAgICBsYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICB7aXNMaW5rTW9kZSAmJiBjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiAhbGlua1NoZWV0TG9ja2VkID8gKFxyXG4gICAgICAgIDxQYWdlQm90dG9tQWN0aW9ucyBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9MaW5rQnV0dG9uXCIsIFwiVmluY3VsYXIgdGlja2V0KHMpXCIpfT5cclxuICAgICAgICAgIDxQYWdlQm90dG9tQWN0aW9uQnV0dG9uXHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfTGlua0J1dHRvblwiLCBcIlZpbmN1bGFyIHRpY2tldChzKVwiKX1cclxuICAgICAgICAgICAgb25DbGljaz17b3BlbkxpbmtDb25maXJtTW9kYWx9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtsaW5rRmxvd0J1c3kgfHwgc2VsZWN0QWxsQnVzeSB8fCBzZWxlY3RlZFRpY2tldENvdW50IDwgMX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9QYWdlQm90dG9tQWN0aW9ucz5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICB7Y2FuQ3JlYXRlVGlja2V0ICYmICFpc0xpbmtNb2RlID8gKFxyXG4gICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxyXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJcdTAwRTFwaWRhc1wiKX1cclxuICAgICAgICAgIHNpemU9ezc2fVxyXG4gICAgICAgICAgcmlnaHQ9ezE2fVxyXG4gICAgICAgICAgYm90dG9tPXsyNH1cclxuICAgICAgICAgIG1lbnVBcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgclx1MDBFMXBpZGFzXCIpfVxyXG4gICAgICAgICAgbWVudUl0ZW1zPXtmYWJNZW51SXRlbXN9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gTWFpbiBwYWdlIGVudHJ5IGZvciBleHBlbnNlIHRpY2tldHMgbGlzdC5cclxuY29uc3QgRXhwZW5zZVRpY2tldHNQYWdlID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnMgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQ+XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0c1BhZ2VDb250ZW50IC8+XHJcbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS10aWNrZXRzLXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VUaWNrZXRzUGFnZSAvPik7XHJcbn07XHJcblxyXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRzUGFnZTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBDaGVja0ljb24gfSBmcm9tIFwiQGhlcm9pY29ucy9yZWFjdC8yNC9vdXRsaW5lXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZURhdGVQYXJ0cyB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVRpbWVsaW5lQ2FyZCBmcm9tIFwiLi9FeHBlbnNlVGltZWxpbmVDYXJkLnRzeFwiO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbVByb3BzID0ge1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGRhdGVQYXJ0czogRXhwZW5zZURhdGVQYXJ0cztcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIHN1YnRpdGxlOiBzdHJpbmc7XHJcbiAgYW1vdW50VGV4dDogc3RyaW5nO1xyXG4gIGlzU2VsZWN0ZWQ6IGJvb2xlYW47XHJcbiAgaXNTZWxlY3RhYmxlOiBib29sZWFuO1xyXG4gIHNlbGVjdGlvbkRpc2FibGVkOiBib29sZWFuO1xyXG4gIHNlbGVjdExhYmVsOiBzdHJpbmc7XHJcbiAgb25PcGVuRGV0YWlsOiAoKSA9PiB2b2lkO1xyXG4gIG9uVG9nZ2xlU2VsZWN0OiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gTGluay1tb2RlIHRpY2tldCBjYXJkOiBjZW50ZXIgb3BlbnMgZGV0YWlsIGFuZCB0aGUgcmlnaHQgcmFpbCB0b2dnbGVzIHNlbGVjdGlvbi5cbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtID0gKHtcclxuICBmaWxlSWQsXHJcbiAgZGF0ZVBhcnRzLFxyXG4gIHRpdGxlLFxyXG4gIHN1YnRpdGxlLFxyXG4gIGFtb3VudFRleHQsXHJcbiAgaXNTZWxlY3RlZCxcclxuICBpc1NlbGVjdGFibGUsXHJcbiAgc2VsZWN0aW9uRGlzYWJsZWQsXHJcbiAgc2VsZWN0TGFiZWwsXHJcbiAgb25PcGVuRGV0YWlsLFxyXG4gIG9uVG9nZ2xlU2VsZWN0LFxyXG59OiBFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbVByb3BzKSA9PiB7XHJcbiAgY29uc3QgY2FuVG9nZ2xlU2VsZWN0aW9uID0gaXNTZWxlY3RhYmxlICYmICFzZWxlY3Rpb25EaXNhYmxlZDtcclxuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkRldGFpbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIG9uT3BlbkRldGFpbCgpO1xyXG4gIH0sIFtvbk9wZW5EZXRhaWxdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVG9nZ2xlU2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFjYW5Ub2dnbGVTZWxlY3Rpb24pIHJldHVybjtcclxuICAgIG9uVG9nZ2xlU2VsZWN0KCk7XHJcbiAgfSwgW2NhblRvZ2dsZVNlbGVjdGlvbiwgb25Ub2dnbGVTZWxlY3RdKTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0aW9uSW5kaWNhdG9yVG9uZUNsYXNzTmFtZSA9IGlzU2VsZWN0ZWRcclxuICAgID8gXCJib3JkZXItcHJpbWFyeSBiZy1wcmltYXJ5IHRleHQtd2hpdGUgc2hhZG93LXNtXCJcclxuICAgIDogY2FuVG9nZ2xlU2VsZWN0aW9uXHJcbiAgICAgID8gXCJib3JkZXItc2xhdGUtMzAwIGJnLXdoaXRlIHRleHQtdHJhbnNwYXJlbnQgZ3JvdXAtaG92ZXI6Ym9yZGVyLXByaW1hcnkgZ3JvdXAtaG92ZXI6YmctcHJpbWFyeS81XCJcclxuICAgICAgOiBcImJvcmRlci1zbGF0ZS0yMDAgYmctc2xhdGUtMTAwIHRleHQtdHJhbnNwYXJlbnRcIjtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgY2xhc3NOYW1lPXtpc1NlbGVjdGVkID8gXCJ0aW1lbGluZS1pdGVtIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIHJpbmctMiByaW5nLXByaW1hcnkvMzBcIiA6IFwidGltZWxpbmUtaXRlbVwifVxuICAgICAgZGF0YS10aWNrZXQtZmlsZS1pZD17ZmlsZUlkIHx8IHVuZGVmaW5lZH1cclxuICAgICAgZGF0YS10aWNrZXQtc2VsZWN0ZWQ9e2lzU2VsZWN0ZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIn1cclxuICAgICAgZGF0YS10aWNrZXQtc2VsZWN0YWJsZT17Y2FuVG9nZ2xlU2VsZWN0aW9uID8gXCJ0cnVlXCIgOiBcImZhbHNlXCJ9XHJcbiAgICA+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxyXG4gICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XHJcbiAgICAgICAgICB0aXRsZT17dGl0bGV9XHJcbiAgICAgICAgICBzdWJ0aXRsZT17c3VidGl0bGV9XHJcbiAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxyXG4gICAgICAgICAgb25PcGVuPXtoYW5kbGVPcGVuRGV0YWlsfVxyXG4gICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX190aXRsZSB0aW1lbGluZS1uYW1lXCJcclxuICAgICAgICAgIGludGVyYWN0aW9uUHJvcHM9e3tcclxuICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IHRpdGxlLFxyXG4gICAgICAgICAgICBvbkNvbnRleHRNZW51OiAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgIGFyaWEtbGFiZWw9e3NlbGVjdExhYmVsfVxyXG4gICAgICAgICAgYXJpYS1wcmVzc2VkPXtpc1NlbGVjdGVkfVxyXG4gICAgICAgICAgdGl0bGU9e3NlbGVjdExhYmVsfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9eyFjYW5Ub2dnbGVTZWxlY3Rpb259XHJcbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVUb2dnbGVTZWxlY3Rpb259XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJncm91cCBhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCB6LTEwIGZsZXggdy1bNC4yNXJlbV0gaXRlbXMtc3RhcnQganVzdGlmeS1lbmQgcm91bmRlZC1yLVt2YXIoLS1yYWRpdXMteGwpXSBiZy10cmFuc3BhcmVudCBwLTEuNSB0cmFuc2l0aW9uIGZvY3VzLXZpc2libGU6b3V0bGluZS1ub25lIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy1wcmltYXJ5LzM1IGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBzbTp3LVs0Ljc1cmVtXVwiXG4gICAgICAgID5cclxuICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaC1bMzBweF0gdy1bMzBweF0gaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciB0cmFuc2l0aW9uICR7c2VsZWN0aW9uSW5kaWNhdG9yVG9uZUNsYXNzTmFtZX1gfVxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPENoZWNrSWNvbiBjbGFzc05hbWU9XCJoLVsyMHB4XSB3LVsyMHB4XVwiIHN0cm9rZVdpZHRoPXsyLjN9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeVByb3BzID0ge1xyXG4gIHJlc3VsdDogRXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXN1bHREdG8gfCBudWxsO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0TGlua0lzc3VlTGlzdFByb3BzID0ge1xyXG4gIGl0ZW1zOiBBcnJheTx7IHRpY2tldElkOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nIH0+O1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgdG9uZUNsYXNzTmFtZTogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyBvbmUgc2tpcHBlZCBvciBmYWlsZWQgdGlja2V0IGxpc3Qgd2l0aCBzdGFibGUga2V5cy5cclxuY29uc3QgRXhwZW5zZVRpY2tldExpbmtJc3N1ZUxpc3QgPSAoeyBpdGVtcywgdGl0bGUsIHRvbmVDbGFzc05hbWUgfTogRXhwZW5zZVRpY2tldExpbmtJc3N1ZUxpc3RQcm9wcykgPT4ge1xyXG4gIGlmIChpdGVtcy5sZW5ndGggPCAxKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIHAtMyAke3RvbmVDbGFzc05hbWV9YH0+XG4gICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGRcIj57dGl0bGV9PC9wPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIgc3BhY2UteS0yXCI+XHJcbiAgICAgICAge2l0ZW1zLm1hcCgoaXRlbSkgPT4gKFxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBrZXk9e2Ake2l0ZW0udGlja2V0SWQgfHwgXCJ1bmtub3duXCJ9LSR7aXRlbS5yZWFzb24gfHwgXCJuby1yZWFzb25cIn1gfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLWN1cnJlbnQvMTUgYmctd2hpdGUvODAgcC0yIHRleHQteHNcIlxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiVGlja2V0c19GaWx0ZXJfRmlsdGVyS2V5XCIsIFwiVGlja2V0XCIpfTo8L3NwYW4+e1wiIFwifVxyXG4gICAgICAgICAgICAgIDxzcGFuPntpdGVtLnRpY2tldElkIHx8IFwiLVwifTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0UmVhc29uXCIsIFwiTW90aXZvXCIpfTo8L3NwYW4+e1wiIFwifVxyXG4gICAgICAgICAgICAgIDxzcGFuPntpdGVtLnJlYXNvbiB8fCBcIi1cIn08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBTaG93cyB0aGUgYmFja2VuZCBidWxrLWxpbmsgcmVzdWx0IHN1bW1hcnksIGluY2x1ZGluZyBwYXJ0aWFsIHNraXBwZWQgYW5kIGZhaWxlZCByZWFzb25zLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0TGlua0J1bGtTdW1tYXJ5ID0gKHsgcmVzdWx0IH06IEV4cGVuc2VUaWNrZXRMaW5rQnVsa1N1bW1hcnlQcm9wcykgPT4ge1xyXG4gIGlmICghcmVzdWx0KSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3Qgc3VtbWFyeVJvd3MgPSBbXHJcbiAgICB7XHJcbiAgICAgIGtleTogXCJyZXF1ZXN0ZWRcIixcclxuICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRSZXF1ZXN0ZWRcIiwgXCJTb2xpY2l0YWRvc1wiKSxcclxuICAgICAgdmFsdWU6IHJlc3VsdC5yZXF1ZXN0ZWRDb3VudCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGtleTogXCJsaW5rZWRcIixcclxuICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRMaW5rZWRcIiwgXCJWaW5jdWxhZG9zXCIpLFxyXG4gICAgICB2YWx1ZTogcmVzdWx0LmxpbmtlZENvdW50LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAga2V5OiBcInNraXBwZWRcIixcclxuICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRTa2lwcGVkXCIsIFwiT21pdGlkb3NcIiksXHJcbiAgICAgIHZhbHVlOiByZXN1bHQuc2tpcHBlZENvdW50LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAga2V5OiBcImZhaWxlZFwiLFxyXG4gICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdEZhaWxlZFwiLCBcIkZhbGxpZG9zXCIpLFxyXG4gICAgICB2YWx1ZTogcmVzdWx0LmZhaWxlZENvdW50LFxyXG4gICAgfSxcclxuICBdO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTMgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUvOTUgcC0zXCI+XG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTkwMFwiPlxyXG4gICAgICAgICAge2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRUaXRsZVwiLCBcIlJlc3VsdGFkbyBkZSB2aW5jdWxhY2lcdTAwRjNuXCIpfVxyXG4gICAgICAgIDwvcD5cclxuICAgICAgICB7cmVzdWx0LmV4cGVuc2VTaGVldElkID8gKFxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXhzIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU2hlZXRcIiwgXCJFeHBlbnNlIHNoZWV0XCIpfToge3Jlc3VsdC5leHBlbnNlU2hlZXRJZH1cclxuICAgICAgICAgIDwvcD5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgc206Z3JpZC1jb2xzLTRcIj5cclxuICAgICAgICB7c3VtbWFyeVJvd3MubWFwKChpdGVtKSA9PiAoXHJcbiAgICAgICAgICA8ZGl2IGtleT17aXRlbS5rZXl9IGNsYXNzTmFtZT1cInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXNsYXRlLTUwIHB4LTMgcHktMiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMTRlbV0gdGV4dC1zbGF0ZS01MDBcIj57aXRlbS5sYWJlbH08L3A+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC14bCBmb250LXNlbWlib2xkIHRleHQtcHJpbWFyeVwiPntpdGVtLnZhbHVlfTwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBnYXAtMyBsZzpncmlkLWNvbHMtMlwiPlxyXG4gICAgICAgIDxFeHBlbnNlVGlja2V0TGlua0lzc3VlTGlzdFxyXG4gICAgICAgICAgdGl0bGU9e2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRTa2lwcGVkXCIsIFwiT21pdGlkb3NcIil9XHJcbiAgICAgICAgICBpdGVtcz17QXJyYXkuaXNBcnJheShyZXN1bHQuc2tpcHBlZCkgPyByZXN1bHQuc2tpcHBlZCA6IFtdfVxyXG4gICAgICAgICAgdG9uZUNsYXNzTmFtZT1cImJvcmRlci1hbWJlci0yMDAgYmctYW1iZXItNTAgdGV4dC1hbWJlci05MDBcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPEV4cGVuc2VUaWNrZXRMaW5rSXNzdWVMaXN0XHJcbiAgICAgICAgICB0aXRsZT17aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdEZhaWxlZFwiLCBcIkZhbGxpZG9zXCIpfVxyXG4gICAgICAgICAgaXRlbXM9e0FycmF5LmlzQXJyYXkocmVzdWx0LmZhaWxlZCkgPyByZXN1bHQuZmFpbGVkIDogW119XHJcbiAgICAgICAgICB0b25lQ2xhc3NOYW1lPVwiYm9yZGVyLXJvc2UtMjAwIGJnLXJvc2UtNTAgdGV4dC1yb3NlLTkwMFwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgdHlwZSB7IEF1dGhNYW5hZ2VkVXNlciB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IEhpc3RvcnlTdW1tYXJ5IGZyb20gXCIuLi8uLi92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5U3VtbWFyeS50c3hcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHtcclxuICBnZXRFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyT3B0aW9ucyxcclxuICBub3JtYWxpemVFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSxcclxuICB0eXBlIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlLFxyXG59IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsIEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkIH0gZnJvbSBcIi4uL3RpY2tldHMvZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXIgZnJvbSBcIi4vRXhwZW5zZURhdGVSYW5nZUZpbHRlci50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VGaWx0ZXJBY3Rpb25zIGZyb20gXCIuL0V4cGVuc2VGaWx0ZXJBY3Rpb25zLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMgZnJvbSBcIi4vRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQgZnJvbSBcIi4vRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0LnRzeFwiO1xyXG5cclxuY29uc3QgcGFyc2VJc29EYXRlID0gKHJhdzogc3RyaW5nKTogRGF0ZSB8IG51bGwgPT4ge1xyXG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcclxuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcpLnRyaW0oKS5zcGxpdChcIlRcIilbMF07XHJcbiAgaWYgKCEvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdCh2YWx1ZSkpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IHZhbHVlLnNwbGl0KFwiLVwiKS5tYXAoTnVtYmVyKTtcclxuICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0RGF0ZSA9IChyYXc6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGRhdGUgPSBwYXJzZUlzb0RhdGUocmF3KTtcclxuICBpZiAoIWRhdGUpIHJldHVybiBcIi0tXCI7XHJcbiAgcmV0dXJuIGRhdGVcclxuICAgIC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7XHJcbiAgICAgIGRheTogXCJudW1lcmljXCIsXHJcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXHJcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxyXG4gICAgfSlcclxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcclxuICAgIC50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbFByb3BzID0ge1xyXG4gIG1vZGU6IFwiZ2VuZXJhbFwiIHwgXCJsaW5rXCI7XHJcbiAgdmlzaWJsZTogYm9vbGVhbjtcclxuICBzaG93TWFudWFsRGF0ZUZpbHRlcjogYm9vbGVhbjtcclxuICBtYW51YWxEYXRlQXV0b09wZW5LZXk6IG51bWJlcjtcclxuICBmcm9tRGF0ZTogc3RyaW5nO1xyXG4gIHRvRGF0ZTogc3RyaW5nO1xyXG4gIGZpbHRlcktleTogc3RyaW5nO1xyXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIG1hbmFnZWRVc2VySWQ6IHN0cmluZztcbiAgbWFuYWdlZFVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXTtcbiAgY3VycmVudEF4VXNlcklkOiBzdHJpbmc7XG4gIGN1cnJlbnRVc2VyTmFtZTogc3RyaW5nO1xuICBzaG93TWFuYWdlZFVzZXJGaWx0ZXI6IGJvb2xlYW47XG4gIHN0YXR1c0ZpbHRlcjogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGU7XHJcbiAgZ2FzdG9UeXBlRmlsdGVyOiBcIlwiIHwgRXhwZW5zZUdhc3RvVHlwZUNvZGU7XHJcbiAgcHJvY2Vzc2VkQnlJYUZpbHRlcjogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXI7XHJcbiAgYWN0aXZlUXVpY2tGaWx0ZXI6IEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkIHwgbnVsbDtcclxuICBzaG93TWFudWFsRGF0ZUVycm9yOiBib29sZWFuO1xyXG4gIHN0YXR1c0ZpbHRlclJlYWRPbmx5PzogYm9vbGVhbjtcclxuICBmaXhlZFN0YXR1c0ZpbHRlcj86IDAgfCAxIHwgbnVsbDtcclxuICBnYXN0b1R5cGVPcHRpb25zOiBFeHBlbnNlU2VsZWN0T3B0aW9uW107XHJcbiAgb25EYXRlUmFuZ2VDaGFuZ2U6IChmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbk1hbnVhbFJhbmdlQ29tcGxldGU6IChmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvblF1aWNrRmlsdGVyQ2hhbmdlOiAoZmlsdGVySWQ6IEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkKSA9PiB2b2lkO1xyXG4gIG9uRmlsdGVyS2V5Q2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25NYW5hZ2VkVXNlcklkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvblN0YXR1c0ZpbHRlckNoYW5nZTogKHZhbHVlOiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSkgPT4gdm9pZDtcclxuICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZTogKHZhbHVlOiBcIlwiIHwgRXhwZW5zZUdhc3RvVHlwZUNvZGUpID0+IHZvaWQ7XHJcbiAgb25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlOiAodmFsdWU6IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyKSA9PiB2b2lkO1xyXG4gIG9uQ2xlYXI6ICgpID0+IHZvaWQ7XHJcbiAgb25BcHBseTogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIFNoYXJlZCB0aWNrZXRzIGZpbHRlciBwYW5lbCB3aXRoIGdsb2JhbCBxdWljayBkYXRlIGZpbHRlcnMgYW5kIGZpeGVkIHRpY2tldCBmaWx0ZXJzLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbCA9ICh7XHJcbiAgbW9kZSxcclxuICB2aXNpYmxlLFxyXG4gIHNob3dNYW51YWxEYXRlRmlsdGVyLFxyXG4gIG1hbnVhbERhdGVBdXRvT3BlbktleSxcclxuICBmcm9tRGF0ZSxcclxuICB0b0RhdGUsXHJcbiAgZmlsdGVyS2V5LFxyXG4gIGN1cnJlbmN5Q29kZSxcclxuICBtYW5hZ2VkVXNlcklkLFxuICBtYW5hZ2VkVXNlcnMsXG4gIGN1cnJlbnRBeFVzZXJJZCxcbiAgY3VycmVudFVzZXJOYW1lLFxuICBzaG93TWFuYWdlZFVzZXJGaWx0ZXIsXG4gIHN0YXR1c0ZpbHRlcixcclxuICBnYXN0b1R5cGVGaWx0ZXIsXHJcbiAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICBhY3RpdmVRdWlja0ZpbHRlcixcclxuICBzaG93TWFudWFsRGF0ZUVycm9yLFxyXG4gIHN0YXR1c0ZpbHRlclJlYWRPbmx5ID0gZmFsc2UsXHJcbiAgZml4ZWRTdGF0dXNGaWx0ZXIgPSBudWxsLFxyXG4gIGdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgb25EYXRlUmFuZ2VDaGFuZ2UsXHJcbiAgb25NYW51YWxSYW5nZUNvbXBsZXRlLFxyXG4gIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXHJcbiAgb25GaWx0ZXJLZXlDaGFuZ2UsXHJcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2UsXHJcbiAgb25NYW5hZ2VkVXNlcklkQ2hhbmdlLFxyXG4gIG9uU3RhdHVzRmlsdGVyQ2hhbmdlLFxyXG4gIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlLFxyXG4gIG9uUHJvY2Vzc2VkQnlJYUZpbHRlckNoYW5nZSxcclxuICBvbkNsZWFyLFxyXG4gIG9uQXBwbHksXHJcbn06IEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsUHJvcHMpID0+IHtcclxuICBjb25zdCBzdGF0dXNPcHRpb25zID0gdXNlTWVtbygoKSA9PiBnZXRFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyT3B0aW9ucygpLCBbXSk7XHJcblxyXG4gIGNvbnN0IGNhdGVnb3J5T3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7IHZhbHVlOiBcIlwiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfQWxsXCIsIFwiQWxsXCIpIH0sXHJcbiAgICAgIC4uLmdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgICBdO1xyXG4gIH0sIFtnYXN0b1R5cGVPcHRpb25zXSk7XHJcblxyXG4gIGlmICghdmlzaWJsZSkgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgbG9jYWxlID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCI7XHJcbiAgY29uc3Qgc2hvd0lubGluZURhdGVTdW1tYXJ5ID0gIXNob3dNYW51YWxEYXRlRmlsdGVyICYmICEhZnJvbURhdGUgJiYgISF0b0RhdGU7XHJcbiAgY29uc3Qgc2hvd1N0YXR1c0ZpbHRlciA9IG1vZGUgPT09IFwiZ2VuZXJhbFwiO1xyXG4gIGNvbnN0IGRlc2t0b3BDb2x1bW5zQ2xhc3NOYW1lID0gc2hvd01hbmFnZWRVc2VyRmlsdGVyXHJcbiAgICA/IChzaG93U3RhdHVzRmlsdGVyID8gXCJsZzpncmlkLWNvbHMtNlwiIDogXCJsZzpncmlkLWNvbHMtNVwiKVxyXG4gICAgOiAoc2hvd1N0YXR1c0ZpbHRlciA/IFwibGc6Z3JpZC1jb2xzLTVcIiA6IFwibGc6Z3JpZC1jb2xzLTRcIik7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1leHBhbmRlZCBwLTIgc206cC0yLjUgcmVsYXRpdmVcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdGFjayBmbGV4IGZsZXgtY29sIHNwYWNlLXktMlwiPlxyXG4gICAgICAgIDxFeHBlbnNlUXVpY2tEYXRlRmlsdGVycyBhY3RpdmVRdWlja0ZpbHRlcj17YWN0aXZlUXVpY2tGaWx0ZXJ9IG9uUXVpY2tGaWx0ZXJDaGFuZ2U9e29uUXVpY2tGaWx0ZXJDaGFuZ2V9IC8+XHJcblxyXG4gICAgICAgIHtzaG93TWFudWFsRGF0ZUZpbHRlciA/IChcclxuICAgICAgICAgIDxFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyXHJcbiAgICAgICAgICAgIGZyb21EYXRlPXtmcm9tRGF0ZX1cclxuICAgICAgICAgICAgdG9EYXRlPXt0b0RhdGV9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRhdGVSYW5nZUNoYW5nZX1cclxuICAgICAgICAgICAgb25SYW5nZUNvbXBsZXRlPXtvbk1hbnVhbFJhbmdlQ29tcGxldGV9XHJcbiAgICAgICAgICAgIGF1dG9PcGVuUmVxdWVzdElkPXttYW51YWxEYXRlQXV0b09wZW5LZXl9XHJcbiAgICAgICAgICAgIHNob3dNYW51YWxFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvcn1cclxuICAgICAgICAgICAgc2hvd1N0YXJ0RXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3IgJiYgIWZyb21EYXRlfVxyXG4gICAgICAgICAgICBzaG93RW5kRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3IgJiYgIXRvRGF0ZX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IHNob3dJbmxpbmVEYXRlU3VtbWFyeSA/IChcclxuICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxyXG4gICAgICAgICAgICBzdW1tYXJ5RnJvbUxhYmVsPXtpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKX1cclxuICAgICAgICAgICAgc3VtbWFyeVRvTGFiZWw9e2luZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIil9XHJcbiAgICAgICAgICAgIGZyb21WYWx1ZT17Zm9ybWF0RGF0ZShmcm9tRGF0ZSwgbG9jYWxlKX1cclxuICAgICAgICAgICAgdG9WYWx1ZT17Zm9ybWF0RGF0ZSh0b0RhdGUsIGxvY2FsZSl9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImdhcC15LTEgdGV4dC1bMTFweF0gcHgtMVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgJHtkZXNrdG9wQ29sdW1uc0NsYXNzTmFtZX0gZ2FwLTJgfT5cclxuICAgICAgICAgIDxFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9GaWx0ZXJLZXlcIiwgXCJUaWNrZXRcIil9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfRmlsdGVyS2V5XCIsIFwiVGlja2V0XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17ZmlsdGVyS2V5fVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25GaWx0ZXJLZXlDaGFuZ2V9XHJcbiAgICAgICAgICAgIG1vZGU9e21vZGV9XHJcbiAgICAgICAgICAgIGNyZWF0ZWREYXRlRnJvbT17ZnJvbURhdGV9XHJcbiAgICAgICAgICAgIGNyZWF0ZWREYXRlVG89e3RvRGF0ZX1cclxuICAgICAgICAgICAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnNcclxuICAgICAgICAgICAgZml4ZWRTdGF0dXNGaWx0ZXI9e21vZGUgPT09IFwiZ2VuZXJhbFwiID8gZml4ZWRTdGF0dXNGaWx0ZXIgOiBudWxsfVxyXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17Y3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25DdXJyZW5jeUNvZGVDaGFuZ2V9XHJcbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAgIHNob3dMb2FkaW5nU3RhdGVUZXh0PXtmYWxzZX1cclxuICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAge3Nob3dNYW5hZ2VkVXNlckZpbHRlciA/IChcclxuICAgICAgICAgICAgPEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiQ29tbW9uX1VzZXJcIiwgXCJVc2VyXCIpfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiQ29tbW9uX1VzZXJcIiwgXCJVc2VyXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXttYW5hZ2VkVXNlcklkfVxuICAgICAgICAgICAgICB1c2Vycz17bWFuYWdlZFVzZXJzfVxuICAgICAgICAgICAgICBjdXJyZW50QXhVc2VySWQ9e2N1cnJlbnRBeFVzZXJJZH1cbiAgICAgICAgICAgICAgY3VycmVudFVzZXJOYW1lPXtjdXJyZW50VXNlck5hbWV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbk1hbmFnZWRVc2VySWRDaGFuZ2V9XG4gICAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICB7c2hvd1N0YXR1c0ZpbHRlciA/IChcclxuICAgICAgICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XHJcbiAgICAgICAgICAgICAgb3B0aW9ucz17c3RhdHVzT3B0aW9uc31cclxuICAgICAgICAgICAgICB2YWx1ZT17c3RhdHVzRmlsdGVyfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiBvblN0YXR1c0ZpbHRlckNoYW5nZShub3JtYWxpemVFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZShuZXh0VmFsdWUsIFwiXCIpKX1cclxuICAgICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e3N0YXR1c0ZpbHRlclJlYWRPbmx5fVxyXG4gICAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtdGlja2V0LXN0YXR1cy1maWx0ZXJcIlxyXG4gICAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIil9XHJcbiAgICAgICAgICAgIG9wdGlvbnM9e2NhdGVnb3J5T3B0aW9uc31cclxuICAgICAgICAgICAgdmFsdWU9e2dhc3RvVHlwZUZpbHRlcn1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBOdW1iZXIobmV4dFZhbHVlKTtcclxuICAgICAgICAgICAgICBpZiAobmV4dFZhbHVlID09PSBcIlwiIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkpIHtcclxuICAgICAgICAgICAgICAgIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZShwYXJzZWQgYXMgRXhwZW5zZUdhc3RvVHlwZUNvZGUpO1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XHJcbiAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtdGlja2V0LWdhc3RvdHlwZS1maWx0ZXJcIlxyXG4gICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgIDxFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIil9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQVwiLCBcIlByb2Nlc3NlZCBieSBJQVwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e3Byb2Nlc3NlZEJ5SWFGaWx0ZXJ9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvblByb2Nlc3NlZEJ5SWFGaWx0ZXJDaGFuZ2V9XHJcbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8RXhwZW5zZUZpbHRlckFjdGlvbnNcclxuICAgICAgICAgIGNsZWFyTGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGVhclwiLCBcIkNsZWFyXCIpfVxyXG4gICAgICAgICAgYXBwbHlMYWJlbD17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0FwcGx5XCIsIFwiQXBwbHlcIil9XHJcbiAgICAgICAgICBvbkNsZWFyPXtvbkNsZWFyfVxyXG4gICAgICAgICAgb25BcHBseT17b25BcHBseX1cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbDtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIgfSBmcm9tIFwiLi4vdGlja2V0cy9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0UHJvcHMgPSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG4gIHZhbHVlOiBFeHBlbnNlVGlja2V0UHJvY2Vzc2VkQnlJYUZpbHRlcjtcclxuICBvbkNoYW5nZTogKHZhbHVlOiBFeHBlbnNlVGlja2V0UHJvY2Vzc2VkQnlJYUZpbHRlcikgPT4gdm9pZDtcclxuICByZWFkT25seT86IGJvb2xlYW47XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIHNob3dMYWJlbD86IGJvb2xlYW47XHJcbn07XHJcblxyXG4vLyBGaXhlZCBlbnVtIHNlbGVjdCBmb3IgSUEgcHJvY2Vzc2luZyBmaWx0ZXIgd2l0aCBBbGwvWWVzL05vIG9wdGlvbnMuXHJcbmNvbnN0IEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0ID0gKHtcclxuICBsYWJlbCxcclxuICBwbGFjZWhvbGRlcixcclxuICB2YWx1ZSxcclxuICBvbkNoYW5nZSxcclxuICByZWFkT25seSA9IGZhbHNlLFxyXG4gIGRpc2FibGVkID0gZmFsc2UsXHJcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcclxufTogRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3RQcm9wcykgPT4ge1xyXG4gIGNvbnN0IHVpVmFsdWUgPSB2YWx1ZSA9PT0gXCJhbGxcIiA/IFwiXCIgOiB2YWx1ZTtcclxuICBjb25zdCBvcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFxyXG4gICAgKCkgPT4gW1xyXG4gICAgICB7IHZhbHVlOiBcImFsbFwiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfQWxsXCIsIFwiQWxsXCIpIH0sXHJcbiAgICAgIHsgdmFsdWU6IFwieWVzXCIsIHRleHQ6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBX1llc1wiLCBcIlllc1wiKSB9LFxyXG4gICAgICB7IHZhbHVlOiBcIm5vXCIsIHRleHQ6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBX05vXCIsIFwiTm9cIikgfSxcclxuICAgIF0sXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgbGFiZWw9e2xhYmVsfVxyXG4gICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XHJcbiAgICAgIG9wdGlvbnM9e29wdGlvbnN9XHJcbiAgICAgIHZhbHVlPXt1aVZhbHVlfVxyXG4gICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmIChuZXh0VmFsdWUgPT09IFwieWVzXCIgfHwgbmV4dFZhbHVlID09PSBcIm5vXCIgfHwgbmV4dFZhbHVlID09PSBcImFsbFwiKSB7XHJcbiAgICAgICAgICBvbkNoYW5nZShuZXh0VmFsdWUpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvbkNoYW5nZShcImFsbFwiKTtcclxuICAgICAgfX1cclxuICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxyXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgIGlkQmFzZT1cImV4cGVuc2UtcHJvY2Vzc2VkLWJ5LWlhLWZpbHRlclwiXHJcbiAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxyXG4gICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cclxuICAgIC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0O1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBSZW1vdGVTZWFyY2hDb21ib2JveCwgeyB0eXBlIFJlbW90ZVNlYXJjaE9wdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUmVtb3RlU2VhcmNoQ29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3QsIGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXRQcm9wcyA9IHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgbW9kZT86IFwiZ2VuZXJhbFwiIHwgXCJsaW5rXCI7XHJcbiAgY3JlYXRlZERhdGVGcm9tPzogc3RyaW5nO1xyXG4gIGNyZWF0ZWREYXRlVG8/OiBzdHJpbmc7XHJcbiAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xyXG4gIGZpeGVkU3RhdHVzRmlsdGVyPzogMCB8IDEgfCBudWxsO1xyXG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcclxufTtcclxuXHJcbmNvbnN0IFNFQVJDSF9QQUdFX1NJWkUgPSAzMDtcclxuXHJcbi8vIEJ1aWxkcyBtaW5pbWFsIHBheWxvYWQgZm9yIHRpY2tldCBrZXkgc3VnZ2VzdGlvbnMgd2l0aG91dCBkYXRlIGZpbHRlcnMuXHJcbmNvbnN0IGJ1aWxkVGlja2V0U3VnZ2VzdFBheWxvYWQgPSAoXHJcbiAgdGVybTogc3RyaW5nLFxyXG4gIHBhZ2U6IG51bWJlcixcclxuICBwYWdlU2l6ZTogbnVtYmVyLFxyXG4gIGZpeGVkU3RhdHVzRmlsdGVyOiAwIHwgMSB8IG51bGwsXHJcbiAgY3JlYXRlZERhdGVGcm9tOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgY3JlYXRlZERhdGVUbzogc3RyaW5nIHwgdW5kZWZpbmVkXHJcbik6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0IHwgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RSZXF1ZXN0ID0+IHtcclxuICBjb25zdCBzYWZlVGVybSA9IFN0cmluZyh0ZXJtIHx8IFwiXCIpLnRyaW0oKTtcclxuICBjb25zdCBiYXNlUGF5bG9hZCA9IHtcclxuICAgIHBhZ2U6IE51bWJlci5pc0Zpbml0ZShwYWdlKSAmJiBwYWdlID4gMCA/IE1hdGguZmxvb3IocGFnZSkgOiAxLFxyXG4gICAgcGFnZVNpemU6IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gTWF0aC5mbG9vcihwYWdlU2l6ZSkgOiBTRUFSQ0hfUEFHRV9TSVpFLFxyXG4gICAgY3JlYXRlZERhdGVGcm9tOiBjcmVhdGVkRGF0ZUZyb20gfHwgdW5kZWZpbmVkLFxyXG4gICAgY3JlYXRlZERhdGVUbzogY3JlYXRlZERhdGVUbyB8fCB1bmRlZmluZWQsXHJcbiAgICBzZWFyY2hLZXk6IHNhZmVUZXJtIHx8IHVuZGVmaW5lZCxcclxuICAgIGZpbHRlcjogc2FmZVRlcm0gfHwgdW5kZWZpbmVkLFxyXG4gIH07XHJcblxyXG4gIGlmIChmaXhlZFN0YXR1c0ZpbHRlciA9PT0gMCB8fCBmaXhlZFN0YXR1c0ZpbHRlciA9PT0gMSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4uYmFzZVBheWxvYWQsXHJcbiAgICAgIHN0YXR1czogZml4ZWRTdGF0dXNGaWx0ZXIsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGJhc2VQYXlsb2FkO1xyXG59O1xyXG5cclxuY29uc3QgbWFwVGlja2V0T3B0aW9ucyA9IChcclxuICBpdGVtczogQXJyYXk8RXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8gfCBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdEl0ZW1EdG8+IHwgdW5kZWZpbmVkXHJcbik6IFJlbW90ZVNlYXJjaE9wdGlvbltdID0+IHtcclxuICByZXR1cm4gKEFycmF5LmlzQXJyYXkoaXRlbXMpID8gaXRlbXMgOiBbXSlcclxuICAgIC5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgY29uc3QgZmlsZUlkID0gU3RyaW5nKGl0ZW0/LkZpbGVJZCB8fCBcIlwiKS50cmltKCk7XHJcbiAgICAgIGlmICghZmlsZUlkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gU3RyaW5nKGl0ZW0/LkRlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgICAgY29uc3Qgc3VidGl0bGUgPSBkZXNjcmlwdGlvbiB8fCBcIi1cIjtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB2YWx1ZTogZmlsZUlkLFxyXG4gICAgICAgIHRpdGxlOiBmaWxlSWQsXHJcbiAgICAgICAgc3VidGl0bGUsXHJcbiAgICAgIH0gYXMgUmVtb3RlU2VhcmNoT3B0aW9uO1xyXG4gICAgfSlcclxuICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgUmVtb3RlU2VhcmNoT3B0aW9uW107XHJcbn07XHJcblxyXG4vLyBUaWNrZXQga2V5IGZpbHRlciBpbnB1dCB3aXRoIHJlbW90ZSBsaXN0IHN1Z2dlc3Rpb25zLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQgPSAoe1xyXG4gIGxhYmVsLFxyXG4gIHBsYWNlaG9sZGVyLFxyXG4gIHZhbHVlLFxyXG4gIG9uQ2hhbmdlLFxyXG4gIG1vZGUgPSBcImdlbmVyYWxcIixcclxuICBjcmVhdGVkRGF0ZUZyb20gPSBcIlwiLFxyXG4gIGNyZWF0ZWREYXRlVG8gPSBcIlwiLFxyXG4gIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zID0gdHJ1ZSxcclxuICBmaXhlZFN0YXR1c0ZpbHRlciA9IG51bGwsXHJcbiAgcmVhZE9ubHkgPSBmYWxzZSxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIHNob3dMYWJlbCA9IHRydWUsXHJcbn06IEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dFByb3BzKSA9PiB7XHJcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XHJcblxyXG4gIGNvbnN0IGxvYWRPcHRpb25zID0gdXNlQ2FsbGJhY2soYXN5bmMgKHRlcm06IHN0cmluZywgc2lnbmFsOiBBYm9ydFNpZ25hbCk6IFByb21pc2U8UmVtb3RlU2VhcmNoT3B0aW9uW10+ID0+IHtcclxuICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZFRpY2tldFN1Z2dlc3RQYXlsb2FkKHRlcm0sIDEsIFNFQVJDSF9QQUdFX1NJWkUsIGZpeGVkU3RhdHVzRmlsdGVyLCBjcmVhdGVkRGF0ZUZyb20sIGNyZWF0ZWREYXRlVG8pO1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPVxyXG4gICAgICBtb2RlID09PSBcImxpbmtcIlxyXG4gICAgICAgID8gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdChwYXlsb2FkIGFzIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCwge1xyXG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgc2lnbmFsLFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICA6IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QocGF5bG9hZCBhcyBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCwge1xyXG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgc2lnbmFsLFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1hcFRpY2tldE9wdGlvbnMocmVzcG9uc2U/Lkl0ZW1zKTtcclxuICB9LCBbY3JlYXRlZERhdGVGcm9tLCBjcmVhdGVkRGF0ZVRvLCBmaXhlZFN0YXR1c0ZpbHRlciwgbW9kZV0pO1xyXG5cclxuICBjb25zdCBsb2FkT3B0aW9uc1BhZ2UgPSB1c2VDYWxsYmFjayhhc3luYyAodGVybTogc3RyaW5nLCBwYWdlOiBudW1iZXIsIF9wYWdlU2l6ZTogbnVtYmVyLCBzaWduYWw6IEFib3J0U2lnbmFsKSA9PiB7XHJcbiAgICBjb25zdCBwYXlsb2FkID0gYnVpbGRUaWNrZXRTdWdnZXN0UGF5bG9hZChcclxuICAgICAgdGVybSxcclxuICAgICAgcGFnZSxcclxuICAgICAgU0VBUkNIX1BBR0VfU0laRSxcclxuICAgICAgZml4ZWRTdGF0dXNGaWx0ZXIsXHJcbiAgICAgIGNyZWF0ZWREYXRlRnJvbSxcclxuICAgICAgY3JlYXRlZERhdGVUb1xyXG4gICAgKTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID1cclxuICAgICAgbW9kZSA9PT0gXCJsaW5rXCJcclxuICAgICAgICA/IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3QocGF5bG9hZCBhcyBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QsIHtcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIHNpZ25hbCxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgOiBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0KHBheWxvYWQgYXMgRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsIHtcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIHNpZ25hbCxcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpdGVtczogW10sXHJcbiAgICAgICAgdG90YWw6IDAsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaXRlbXM6IG1hcFRpY2tldE9wdGlvbnMocmVzcG9uc2U/Lkl0ZW1zKSxcclxuICAgICAgdG90YWw6IE51bWJlcihyZXNwb25zZT8uVG90YWwgfHwgMCksXHJcbiAgICB9O1xyXG4gIH0sIFtjcmVhdGVkRGF0ZUZyb20sIGNyZWF0ZWREYXRlVG8sIGZpeGVkU3RhdHVzRmlsdGVyLCBtb2RlXSk7XHJcblxyXG4gIGlmICghZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnMgfHwgcmVhZE9ubHlNb2RlKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxyXG4gICAgICAgIHtzaG93TGFiZWwgPyAoXHJcbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgc3R5bGU9e3sgY29sb3I6IFwiIzAwMjk2YmUwXCIgfX0+XHJcbiAgICAgICAgICAgIHtsYWJlbH1cclxuICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcHgtMyBweS0yIHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTkwMCBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCJcbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XHJcbiAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XHJcbiAgICAgICAgICByZWFkT25seT17cmVhZE9ubHl9XHJcbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxSZW1vdGVTZWFyY2hDb21ib2JveFxyXG4gICAgICBsYWJlbD17bGFiZWx9XHJcbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuICAgICAgdmFsdWU9e3ZhbHVlfVxyXG4gICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XHJcbiAgICAgIG9uU2VhcmNoPXthc3luYyAodGVybSwgc2lnbmFsKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHJldHVybiBhd2FpdCBsb2FkT3B0aW9ucyh0ZXJtLCBzaWduYWwpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgICAgfX1cclxuICAgICAgb25TZWFyY2hQYWdlPXthc3luYyAodGVybSwgcGFnZSwgcGFnZVNpemUsIHNpZ25hbCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbG9hZE9wdGlvbnNQYWdlKHRlcm0sIHBhZ2UsIHBhZ2VTaXplLCBzaWduYWwpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGl0ZW1zOiBbXSwgdG90YWw6IDAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgICAgfX1cclxuICAgICAgaWRCYXNlPVwiZXhwZW5zZS10aWNrZXQtZmlsdGVyLWtleVwiXHJcbiAgICAgIG1pblNlYXJjaExlbmd0aD17MH1cclxuICAgICAgcGFnZVNpemU9e1NFQVJDSF9QQUdFX1NJWkV9XHJcbiAgICAgIGFsbG93RW1wdHlTZWFyY2hcclxuICAgICAgbG9hZE9uT3BlblxyXG4gICAgICBpbmZpbml0ZVNjcm9sbFxyXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cclxuICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XHJcbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgIC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dDtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxyXG4gIEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkLFxyXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZEYXksIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgcmVzb2x2ZUV4cGVuc2VRdWlja0RhdGVGaWx0ZXJGcm9tUmFuZ2UgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVF1aWNrRGF0ZUZpbHRlclN0YXRlLnRzXCI7XG5pbXBvcnQgeyBub3JtYWxpemVFeHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QudHNcIjtcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlQXJncyA9IHtcclxuICBvbkFwcGx5RmlsdGVyczogKHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB2b2lkO1xyXG4gIG9uQ2xlYXJGaWx0ZXJzOiAoKSA9PiB2b2lkO1xyXG4gIGRlZmF1bHRNYW5hZ2VkVXNlcklkOiBzdHJpbmc7XHJcbiAgZml4ZWRTdGF0dXNGaWx0ZXI/OiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSB8IG51bGw7XHJcbiAgYWxsb3dFbXB0eURhdGVzT25BcHBseT86IGJvb2xlYW47XHJcbn07XHJcblxyXG4vLyBPd25zIGZpbHRlciBVSSBzdGF0ZSBhbmQgYXBwbHkvY2xlYXIgcnVsZXMgZm9yIGV4cGVuc2UgdGlja2V0cyBsaXN0IHBhZ2UuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZSA9ICh7XHJcbiAgb25BcHBseUZpbHRlcnMsXHJcbiAgb25DbGVhckZpbHRlcnMsXHJcbiAgZGVmYXVsdE1hbmFnZWRVc2VySWQsXHJcbiAgZml4ZWRTdGF0dXNGaWx0ZXIgPSBudWxsLFxyXG4gIGFsbG93RW1wdHlEYXRlc09uQXBwbHkgPSBmYWxzZSxcclxufTogVXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGVBcmdzKSA9PiB7XHJcbiAgY29uc3QgaGFzRml4ZWRTdGF0dXNGaWx0ZXIgPSBmaXhlZFN0YXR1c0ZpbHRlciA9PT0gMCB8fCBmaXhlZFN0YXR1c0ZpbHRlciA9PT0gMTtcclxuXHJcbiAgY29uc3QgcmVzb2x2ZVN0YXR1c0ZpbHRlciA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHZhbHVlOiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSk6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlID0+IHtcclxuICAgICAgaWYgKGhhc0ZpeGVkU3RhdHVzRmlsdGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGZpeGVkU3RhdHVzRmlsdGVyIGFzIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH0sXHJcbiAgICBbZml4ZWRTdGF0dXNGaWx0ZXIsIGhhc0ZpeGVkU3RhdHVzRmlsdGVyXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IFtmcm9tRGF0ZSwgc2V0RnJvbURhdGVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3RvRGF0ZSwgc2V0VG9EYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtmaWx0ZXJLZXksIHNldEZpbHRlcktleV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbY3VycmVuY3lDb2RlLCBzZXRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW21hbmFnZWRVc2VySWQsIHNldE1hbmFnZWRVc2VySWRdID0gdXNlU3RhdGUoZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xyXG4gIGNvbnN0IFtzdGF0dXNGaWx0ZXJSYXcsIHNldFN0YXR1c0ZpbHRlclJhd10gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZT4ocmVzb2x2ZVN0YXR1c0ZpbHRlcihcIlwiKSk7XHJcbiAgY29uc3QgW2dhc3RvVHlwZUZpbHRlciwgc2V0R2FzdG9UeXBlRmlsdGVyXSA9IHVzZVN0YXRlPFwiXCIgfCBFeHBlbnNlR2FzdG9UeXBlQ29kZT4oXCJcIik7XHJcbiAgY29uc3QgW3Byb2Nlc3NlZEJ5SWFGaWx0ZXIsIHNldFByb2Nlc3NlZEJ5SWFGaWx0ZXJdID0gdXNlU3RhdGU8XCJhbGxcIiB8IFwieWVzXCIgfCBcIm5vXCI+KFwiYWxsXCIpO1xyXG4gIGNvbnN0IFthY3RpdmVRdWlja0ZpbHRlciwgc2V0QWN0aXZlUXVpY2tGaWx0ZXJdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldFF1aWNrRmlsdGVySWQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbc2hvd01hbnVhbERhdGVGaWx0ZXIsIHNldFNob3dNYW51YWxEYXRlRmlsdGVyXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2hvd01hbnVhbERhdGVFcnJvciwgc2V0U2hvd01hbnVhbERhdGVFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW21hbnVhbERhdGVBdXRvT3BlbktleSwgc2V0TWFudWFsRGF0ZUF1dG9PcGVuS2V5XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFthcHBsaWVkRmlsdGVycywgc2V0QXBwbGllZEZpbHRlcnNdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtzaG93RmlsdGVycywgc2V0U2hvd0ZpbHRlcnNdID0gdXNlU3RhdGUodHJ1ZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWhhc0ZpeGVkU3RhdHVzRmlsdGVyKSByZXR1cm47XHJcbiAgICBzZXRTdGF0dXNGaWx0ZXJSYXcoZml4ZWRTdGF0dXNGaWx0ZXIgYXMgRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpO1xyXG4gIH0sIFtmaXhlZFN0YXR1c0ZpbHRlciwgaGFzRml4ZWRTdGF0dXNGaWx0ZXJdKTtcclxuXHJcbiAgY29uc3Qgc3RhdHVzRmlsdGVyID0gcmVzb2x2ZVN0YXR1c0ZpbHRlcihzdGF0dXNGaWx0ZXJSYXcpO1xyXG5cclxuICBjb25zdCBjdXJyZW50RmlsdGVycyA9IHVzZU1lbW88RXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdD4oXHJcbiAgICAoKSA9PiAoe1xyXG4gICAgICBmcm9tRGF0ZSxcclxuICAgICAgdG9EYXRlLFxyXG4gICAgICBmaWx0ZXJLZXk6IGZpbHRlcktleS50cmltKCksXHJcbiAgICAgIGN1cnJlbmN5Q29kZTogY3VycmVuY3lDb2RlLnRyaW0oKSxcclxuICAgICAgbWFuYWdlZFVzZXJJZDogbWFuYWdlZFVzZXJJZC50cmltKCksXHJcbiAgICAgIHN0YXR1c0ZpbHRlcixcclxuICAgICAgZ2FzdG9UeXBlRmlsdGVyLFxyXG4gICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxyXG4gICAgfSksXHJcbiAgICBbY3VycmVuY3lDb2RlLCBmaWx0ZXJLZXksIGZyb21EYXRlLCBnYXN0b1R5cGVGaWx0ZXIsIG1hbmFnZWRVc2VySWQsIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsIHN0YXR1c0ZpbHRlciwgdG9EYXRlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldFN0YXR1c0ZpbHRlciA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHZhbHVlOiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSkgPT4ge1xyXG4gICAgICBpZiAoaGFzRml4ZWRTdGF0dXNGaWx0ZXIpIHtcclxuICAgICAgICBzZXRTdGF0dXNGaWx0ZXJSYXcoZml4ZWRTdGF0dXNGaWx0ZXIgYXMgRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBzZXRTdGF0dXNGaWx0ZXJSYXcodmFsdWUpO1xyXG4gICAgfSxcclxuICAgIFtmaXhlZFN0YXR1c0ZpbHRlciwgaGFzRml4ZWRTdGF0dXNGaWx0ZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb25BcHBseSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghYWxsb3dFbXB0eURhdGVzT25BcHBseSAmJiAoIWZyb21EYXRlIHx8ICF0b0RhdGUpKSB7XHJcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IodHJ1ZSk7XHJcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKHRydWUpO1xyXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0ge1xyXG4gICAgICBmcm9tRGF0ZSxcclxuICAgICAgdG9EYXRlLFxyXG4gICAgICBmaWx0ZXJLZXk6IGZpbHRlcktleS50cmltKCksXHJcbiAgICAgIGN1cnJlbmN5Q29kZTogY3VycmVuY3lDb2RlLnRyaW0oKSxcclxuICAgICAgbWFuYWdlZFVzZXJJZDogbWFuYWdlZFVzZXJJZC50cmltKCksXHJcbiAgICAgIHN0YXR1c0ZpbHRlcixcclxuICAgICAgZ2FzdG9UeXBlRmlsdGVyLFxyXG4gICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxyXG4gICAgfTtcclxuXHJcbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcclxuICAgIHNldEFwcGxpZWRGaWx0ZXJzKHNuYXBzaG90KTtcclxuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcclxuICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcclxuICAgIG9uQXBwbHlGaWx0ZXJzKHNuYXBzaG90KTtcclxuICB9LCBbXHJcbiAgICBhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5LFxyXG4gICAgY3VycmVuY3lDb2RlLFxyXG4gICAgZmlsdGVyS2V5LFxyXG4gICAgZnJvbURhdGUsXHJcbiAgICBnYXN0b1R5cGVGaWx0ZXIsXHJcbiAgICBtYW5hZ2VkVXNlcklkLFxyXG4gICAgb25BcHBseUZpbHRlcnMsXHJcbiAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxyXG4gICAgc3RhdHVzRmlsdGVyLFxyXG4gICAgdG9EYXRlLFxyXG4gIF0pO1xyXG5cclxuICAvLyBSZWh5ZHJhdGVzIHRpY2tldCBmaWx0ZXJzIGZyb20gYSBjYWNoZWQgc25hcHNob3Qgd2hlbiByZXR1cm5pbmcgZnJvbSBkZXRhaWwuXHJcbiAgY29uc3QgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpID0+IHtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3Qoc25hcHNob3QpO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZFN0YXR1c0ZpbHRlciA9IHJlc29sdmVTdGF0dXNGaWx0ZXIobm9ybWFsaXplZC5zdGF0dXNGaWx0ZXIpO1xuICAgICAgY29uc3QgcmVzdG9yZWRNYW5hZ2VkVXNlcklkID0gU3RyaW5nKG5vcm1hbGl6ZWQubWFuYWdlZFVzZXJJZCB8fCBkZWZhdWx0TWFuYWdlZFVzZXJJZCkudHJpbSgpO1xuICAgICAgY29uc3QgcmVzdG9yZWRRdWlja0ZpbHRlciA9IHJlc29sdmVFeHBlbnNlUXVpY2tEYXRlRmlsdGVyRnJvbVJhbmdlKG5vcm1hbGl6ZWQuZnJvbURhdGUsIG5vcm1hbGl6ZWQudG9EYXRlKTtcbiAgICAgIHNldEZyb21EYXRlKG5vcm1hbGl6ZWQuZnJvbURhdGUpO1xuICAgICAgc2V0VG9EYXRlKG5vcm1hbGl6ZWQudG9EYXRlKTtcbiAgICAgIHNldEZpbHRlcktleShub3JtYWxpemVkLmZpbHRlcktleSk7XG4gICAgICBzZXRDdXJyZW5jeUNvZGUobm9ybWFsaXplZC5jdXJyZW5jeUNvZGUpO1xuICAgICAgc2V0TWFuYWdlZFVzZXJJZChyZXN0b3JlZE1hbmFnZWRVc2VySWQpO1xuICAgICAgc2V0U3RhdHVzRmlsdGVyUmF3KG5vcm1hbGl6ZWRTdGF0dXNGaWx0ZXIpO1xuICAgICAgc2V0R2FzdG9UeXBlRmlsdGVyKG5vcm1hbGl6ZWQuZ2FzdG9UeXBlRmlsdGVyKTtcbiAgICAgIHNldFByb2Nlc3NlZEJ5SWFGaWx0ZXIobm9ybWFsaXplZC5wcm9jZXNzZWRCeUlhRmlsdGVyKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKHJlc3RvcmVkUXVpY2tGaWx0ZXIpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgICBzZXRBcHBsaWVkRmlsdGVycyh7XG4gICAgICAgIC4uLm5vcm1hbGl6ZWQsXHJcbiAgICAgICAgbWFuYWdlZFVzZXJJZDogcmVzdG9yZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgICAgIHN0YXR1c0ZpbHRlcjogbm9ybWFsaXplZFN0YXR1c0ZpbHRlcixcclxuICAgICAgfSk7XHJcbiAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICBbZGVmYXVsdE1hbmFnZWRVc2VySWQsIHJlc29sdmVTdGF0dXNGaWx0ZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb25DbGVhciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldEZyb21EYXRlKFwiXCIpO1xyXG4gICAgc2V0VG9EYXRlKFwiXCIpO1xyXG4gICAgc2V0RmlsdGVyS2V5KFwiXCIpO1xyXG4gICAgc2V0Q3VycmVuY3lDb2RlKFwiXCIpO1xyXG4gICAgc2V0TWFuYWdlZFVzZXJJZChkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XHJcbiAgICBzZXRTdGF0dXNGaWx0ZXJSYXcocmVzb2x2ZVN0YXR1c0ZpbHRlcihcIlwiKSk7XHJcbiAgICBzZXRHYXN0b1R5cGVGaWx0ZXIoXCJcIik7XHJcbiAgICBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyKFwiYWxsXCIpO1xyXG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XHJcbiAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XHJcbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcclxuICAgIHNldE1hbnVhbERhdGVBdXRvT3BlbktleSgwKTtcclxuICAgIHNldEFwcGxpZWRGaWx0ZXJzKG51bGwpO1xyXG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XHJcbiAgICBvbkNsZWFyRmlsdGVycygpO1xyXG4gIH0sIFtkZWZhdWx0TWFuYWdlZFVzZXJJZCwgb25DbGVhckZpbHRlcnMsIHJlc29sdmVTdGF0dXNGaWx0ZXJdKTtcclxuXHJcbiAgY29uc3Qgb25EYXRlUmFuZ2VDaGFuZ2UgPSB1c2VDYWxsYmFjayhcclxuICAgIChuZXh0RnJvbURhdGU6IHN0cmluZywgbmV4dFRvRGF0ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IGhhc0Z1bGxSYW5nZSA9ICEhbmV4dEZyb21EYXRlICYmICEhbmV4dFRvRGF0ZTtcclxuICAgICAgc2V0RnJvbURhdGUobmV4dEZyb21EYXRlKTtcclxuICAgICAgc2V0VG9EYXRlKG5leHRUb0RhdGUpO1xyXG4gICAgICBpZiAoIWhhc0Z1bGxSYW5nZSkge1xyXG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKHRydWUpO1xyXG4gICAgICB9XHJcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xyXG4gICAgICBpZiAoc2hvd01hbnVhbERhdGVFcnJvcikge1xyXG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoIWhhc0Z1bGxSYW5nZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbc2hvd01hbnVhbERhdGVFcnJvcl1cclxuICApO1xyXG5cclxuICBjb25zdCBvbk1hbnVhbFJhbmdlQ29tcGxldGUgPSB1c2VDYWxsYmFjaygobmV4dEZyb21EYXRlOiBzdHJpbmcsIG5leHRUb0RhdGU6IHN0cmluZykgPT4ge1xyXG4gICAgc2V0RnJvbURhdGUobmV4dEZyb21EYXRlKTtcclxuICAgIHNldFRvRGF0ZShuZXh0VG9EYXRlKTtcclxuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xyXG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XHJcbiAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBvblF1aWNrRmlsdGVyQ2hhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZmlsdGVySWQ6IEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkKSA9PiB7XHJcbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJjdXN0b21cIikge1xyXG4gICAgICAgIGlmIChzaG93TWFudWFsRGF0ZUZpbHRlcikge1xyXG4gICAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xyXG4gICAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcclxuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcclxuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcclxuICAgICAgICBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXkoKHByZXZpb3VzKSA9PiBwcmV2aW91cyArIDEpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoZmlsdGVySWQpO1xyXG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XHJcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xyXG5cclxuICAgICAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xyXG4gICAgICBjb25zdCBuZXh0RnJvbSA9IG5ldyBEYXRlKHRvZGF5KTtcclxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtN1wiKSB7XHJcbiAgICAgICAgbmV4dEZyb20uc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA2KTtcclxuICAgICAgfSBlbHNlIGlmIChmaWx0ZXJJZCA9PT0gXCJkYXlzLTMwXCIpIHtcclxuICAgICAgICBuZXh0RnJvbS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDI5KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXh0RnJvbS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDg5KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0RnJvbURhdGUodG9Jc29EYXRlKG5leHRGcm9tKSk7XHJcbiAgICAgIHNldFRvRGF0ZSh0b0lzb0RhdGUodG9kYXkpKTtcclxuICAgIH0sXHJcbiAgICBbc2hvd01hbnVhbERhdGVGaWx0ZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgdG9nZ2xlRmlsdGVyUGFuZWwgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRTaG93RmlsdGVycygocHJldmlvdXMpID0+IHtcclxuICAgICAgY29uc3QgbmV4dCA9ICFwcmV2aW91cztcclxuICAgICAgaWYgKCFuZXh0KSB7XHJcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZnJvbURhdGUsXHJcbiAgICB0b0RhdGUsXHJcbiAgICBmaWx0ZXJLZXksXHJcbiAgICBjdXJyZW5jeUNvZGUsXHJcbiAgICBtYW5hZ2VkVXNlcklkLFxyXG4gICAgc3RhdHVzRmlsdGVyLFxyXG4gICAgZ2FzdG9UeXBlRmlsdGVyLFxyXG4gICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxyXG4gICAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXHJcbiAgICBzaG93TWFudWFsRGF0ZUVycm9yLFxyXG4gICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxyXG4gICAgYXBwbGllZEZpbHRlcnMsXHJcbiAgICBzaG93RmlsdGVycyxcclxuICAgIGN1cnJlbnRGaWx0ZXJzLFxyXG4gICAgc2V0RmlsdGVyS2V5LFxyXG4gICAgc2V0Q3VycmVuY3lDb2RlLFxyXG4gICAgc2V0TWFuYWdlZFVzZXJJZCxcclxuICAgIHNldFN0YXR1c0ZpbHRlcixcclxuICAgIHNldEdhc3RvVHlwZUZpbHRlcixcclxuICAgIHNldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsXHJcbiAgICBvbkFwcGx5LFxyXG4gICAgb25DbGVhcixcclxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcclxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlLFxyXG4gICAgb25NYW51YWxSYW5nZUNvbXBsZXRlLFxyXG4gICAgb25RdWlja0ZpbHRlckNoYW5nZSxcclxuICAgIHRvZ2dsZUZpbHRlclBhbmVsLFxyXG4gICAgc3RhdHVzRmlsdGVyTG9ja2VkOiBoYXNGaXhlZFN0YXR1c0ZpbHRlcixcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VHYXN0b1R5cGVDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3QsIGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgZ2V0VmlzaWJsZVJlaW1idXJzYWJsZVRvdGFsIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VWaXNpYmxlVG90YWxzLnRzXCI7XG5pbXBvcnQgeyBpc0V4cGVuc2VBYm9ydExpa2VFcnJvciwgcnVuRXhwZW5zZVJlYWRSZXF1ZXN0V2l0aFJldHJ5IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VSZXF1ZXN0UmV0cnkudHNcIjtcclxuaW1wb3J0IHtcclxuICBidWlsZEV4cGVuc2VUaWNrZXRMaW5rTGlzdFBheWxvYWQsXHJcbiAgYnVpbGRFeHBlbnNlVGlja2V0TGlzdFBheWxvYWQsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VQYXlsb2FkQnVpbGRlcnMudHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXHJcbiAgRXhwZW5zZVRpY2tldENhcmQsXHJcbiAgRXhwZW5zZVRpY2tldExpbmtDYXJkLFxyXG4gIEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW0sXHJcbn0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0c0xpc3REYXRhQXJncyA9IHtcclxuICBoYXNBY2Nlc3M6IGJvb2xlYW47XHJcbiAgcGFnZVNpemU6IG51bWJlcjtcclxuICBtb2RlOiBcImdlbmVyYWxcIiB8IFwibGlua1wiO1xyXG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuY29uc3QgRVhQRU5TRV9USUNLRVRTX0xJU1RfTE9HX1BSRUZJWCA9IFwiW2V4cGVuc2UtdGlja2V0czpsaXN0XVwiO1xyXG5cclxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUuaW5mbyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLmluZm8oRVhQRU5TRV9USUNLRVRTX0xJU1RfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybiA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUud2FybiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLndhcm4oRVhQRU5TRV9USUNLRVRTX0xJU1RfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNMaXN0RXJyb3IgPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoRVhQRU5TRV9USUNLRVRTX0xJU1RfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0c0RlYnVnU3RhY2sgPSAobGFiZWw6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHR5cGVvZiBFcnJvciAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gXCJcIjtcclxuICBjb25zdCByYXdTdGFjayA9IG5ldyBFcnJvcihsYWJlbCkuc3RhY2s7XHJcbiAgaWYgKHR5cGVvZiByYXdTdGFjayAhPT0gXCJzdHJpbmdcIiB8fCAhcmF3U3RhY2sudHJpbSgpKSByZXR1cm4gXCJcIjtcclxuICByZXR1cm4gcmF3U3RhY2tcclxuICAgIC5zcGxpdChcIlxcblwiKVxyXG4gICAgLnNsaWNlKDAsIDYpXHJcbiAgICAuam9pbihcIlxcblwiKTtcclxufTtcclxuXHJcbmNvbnN0IHRvTnVsbGFibGVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCB0b051bGxhYmxlQm9vbCA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gfCBudWxsID0+IHtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikgcmV0dXJuIHZhbHVlO1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHJldHVybiB2YWx1ZSA9PT0gMSA/IHRydWUgOiB2YWx1ZSA9PT0gMCA/IGZhbHNlIDogbnVsbDtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBjb25zdCBub3JtYWxpemVkID0gdmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAobm9ybWFsaXplZCA9PT0gXCJ0cnVlXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIxXCIpIHJldHVybiB0cnVlO1xyXG4gICAgaWYgKG5vcm1hbGl6ZWQgPT09IFwiZmFsc2VcIiB8fCBub3JtYWxpemVkID09PSBcIjBcIikgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IHRvTnVsbGFibGVUaWNrZXRTdGF0dXMgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgcGFyc2VkID49IDAgPyBwYXJzZWQgOiBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgdG9OdWxsYWJsZVRpY2tldEdhc3RvVHlwZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VHYXN0b1R5cGVDb2RlIHwgbnVsbCA9PiB7XHJcbiAgcmV0dXJuIHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUodmFsdWUpO1xyXG59O1xyXG5cclxuY29uc3QgbWFwVGlja2V0SXRlbVRvQ2FyZCA9IChpdGVtOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IEV4cGVuc2VUaWNrZXRDYXJkID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAga2luZDogXCJnZW5lcmFsXCIsXHJcbiAgICBmaWxlSWQ6IFN0cmluZyhpdGVtPy5GaWxlSWQgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgZGVzY3JpcHRpb246IFN0cmluZyhpdGVtPy5EZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXHJcbiAgICBzdGF0dXM6IHRvTnVsbGFibGVUaWNrZXRTdGF0dXMoaXRlbT8uU3RhdHVzKSxcclxuICAgIHByb2Nlc3NlZEJ5QUk6IHRvTnVsbGFibGVCb29sKGl0ZW0/LlByb2Nlc3NlZEJ5QUkpLFxyXG4gICAgY3VycmVuY3lDb2RlOiBTdHJpbmcoaXRlbT8uQ3VycmVuY3lDb2RlIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgIHRvdGFsQW1vdW50OiBnZXRWaXNpYmxlUmVpbWJ1cnNhYmxlVG90YWwoe1xuICAgICAgVG90YWxBbW91bnRNU1Q6IHRvTnVsbGFibGVOdW1iZXIoaXRlbT8uVG90YWxBbW91bnRNU1QpLFxuICAgICAgVG90YWxBbW91bnRDdXJyZW5jeTogdG9OdWxsYWJsZU51bWJlcihpdGVtPy5Ub3RhbEFtb3VudEN1cnJlbmN5KSxcbiAgICAgIFRvdGFsQW1vdW50OiB0b051bGxhYmxlTnVtYmVyKGl0ZW0/LlRvdGFsQW1vdW50KSxcbiAgICB9KSxcbiAgICB0cmFuc0RhdGU6IFN0cmluZyhpdGVtPy5UcmFuc0RhdGUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgZmlsZU5hbWU6IFN0cmluZyhpdGVtPy5GaWxlTmFtZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICBnYXN0b1R5cGU6IHRvTnVsbGFibGVUaWNrZXRHYXN0b1R5cGUoaXRlbT8uR2FzdG9UeXBlID8/IGl0ZW0/Lmdhc3RvVHlwZSksXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IG1hcFRpY2tldExpbmtJdGVtVG9DYXJkID0gKGl0ZW06IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogRXhwZW5zZVRpY2tldExpbmtDYXJkID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAga2luZDogXCJsaW5rXCIsXHJcbiAgICBmaWxlSWQ6IFN0cmluZyhpdGVtPy5GaWxlSWQgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgZGVzY3JpcHRpb246IFN0cmluZyhpdGVtPy5EZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXHJcbiAgICBwcm9jZXNzZWRCeUFJOiB0b051bGxhYmxlQm9vbChpdGVtPy5Qcm9jZXNzZWRCeUFJKSxcclxuICAgIGN1cnJlbmN5Q29kZTogU3RyaW5nKGl0ZW0/LkN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICB0b3RhbEFtb3VudDogZ2V0VmlzaWJsZVJlaW1idXJzYWJsZVRvdGFsKHtcbiAgICAgIFRvdGFsQW1vdW50TVNUOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0/LlRvdGFsQW1vdW50TVNUKSxcbiAgICAgIFRvdGFsQW1vdW50Q3VycmVuY3k6IHRvTnVsbGFibGVOdW1iZXIoaXRlbT8uVG90YWxBbW91bnRDdXJyZW5jeSksXG4gICAgICBUb3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtPy5Ub3RhbEFtb3VudCksXG4gICAgfSksXG4gICAgdHJhbnNEYXRlOiBTdHJpbmcoaXRlbT8uVHJhbnNEYXRlIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgIGZpbGVOYW1lOiBTdHJpbmcoaXRlbT8uRmlsZU5hbWUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgZ2FzdG9UeXBlOiB0b051bGxhYmxlVGlja2V0R2FzdG9UeXBlKGl0ZW0/Lkdhc3RvVHlwZSA/PyBpdGVtPy5nYXN0b1R5cGUpLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBPd25zIGxpc3QgZGF0YSBmZXRjaCwgbG9hZGluZyBzdGF0ZSwgYW5kIHBhZ2luYXRpb24gbWV0YWRhdGEgZm9yIHRpY2tldHMuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0c0xpc3REYXRhID0gKHsgaGFzQWNjZXNzLCBwYWdlU2l6ZSwgbW9kZSwgb25Gb3JiaWRkZW4gfTogVXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YUFyZ3MpID0+IHtcclxuICBjb25zdCBbaXRlbXMsIHNldEl0ZW1zXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW1bXT4oW10pO1xyXG4gIGNvbnN0IFt0b3RhbCwgc2V0VG90YWxdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW2N1cnJlbnRQYWdlLCBzZXRDdXJyZW50UGFnZV0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZiA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBhY3RpdmVSZXF1ZXN0S2V5UmVmID0gdXNlUmVmKFwiXCIpO1xyXG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RTZXFSZWYgPSB1c2VSZWYoMCk7XHJcblxyXG4gIGNvbnN0IHJlc3RvcmVMaXN0U25hcHNob3QgPSB1c2VDYWxsYmFjayhcclxuICAgIChzbmFwc2hvdDogeyBpdGVtczogRXhwZW5zZVRpY2tldExpc3RQYWdlSXRlbVtdOyB0b3RhbDogbnVtYmVyOyBwYWdlOiBudW1iZXIgfSkgPT4ge1xyXG4gICAgICBjb25zdCBzYWZlSXRlbXMgPSBBcnJheS5pc0FycmF5KHNuYXBzaG90Lml0ZW1zKSA/IHNuYXBzaG90Lml0ZW1zIDogW107XHJcbiAgICAgIGNvbnN0IHNhZmVUb3RhbFJhdyA9IE51bWJlcihzbmFwc2hvdC50b3RhbCk7XHJcbiAgICAgIGNvbnN0IHNhZmVUb3RhbCA9IE51bWJlci5pc0Zpbml0ZShzYWZlVG90YWxSYXcpICYmIHNhZmVUb3RhbFJhdyA+PSAwID8gc2FmZVRvdGFsUmF3IDogc2FmZUl0ZW1zLmxlbmd0aDtcclxuICAgICAgY29uc3Qgc2FmZVBhZ2VSYXcgPSBOdW1iZXIoc25hcHNob3QucGFnZSk7XHJcbiAgICAgIGNvbnN0IHNhZmVQYWdlID0gTnVtYmVyLmlzRmluaXRlKHNhZmVQYWdlUmF3KSAmJiBzYWZlUGFnZVJhdyA+IDAgPyBNYXRoLmZsb29yKHNhZmVQYWdlUmF3KSA6IDE7XHJcblxyXG4gICAgICBzZXRJdGVtcyhzYWZlSXRlbXMpO1xyXG4gICAgICBzZXRUb3RhbChzYWZlVG90YWwpO1xyXG4gICAgICBzZXRDdXJyZW50UGFnZShzYWZlUGFnZSk7XHJcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGxvYWRMaXN0ID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAocGFnZTogbnVtYmVyLCBmaWx0ZXJzOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8oXCJsb2FkTGlzdDpyZXF1ZXN0ZWRcIiwge1xyXG4gICAgICAgIHBhZ2UsXHJcbiAgICAgICAgbW9kZSxcclxuICAgICAgICBoYXNBY2Nlc3MsXHJcbiAgICAgICAgZmlsdGVycyxcclxuICAgICAgfSk7XHJcbiAgICAgIGlmICghaGFzQWNjZXNzKSB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImxvYWRMaXN0OmJsb2NrZWQtbm8tYWNjZXNzXCIsIHtcclxuICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICBtb2RlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwYXlsb2FkID1cclxuICAgICAgICBtb2RlID09PSBcImxpbmtcIlxyXG4gICAgICAgICAgPyBidWlsZEV4cGVuc2VUaWNrZXRMaW5rTGlzdFBheWxvYWQoZmlsdGVycywgcGFnZSwgcGFnZVNpemUpXHJcbiAgICAgICAgICA6IGJ1aWxkRXhwZW5zZVRpY2tldExpc3RQYXlsb2FkKGZpbHRlcnMsIHBhZ2UsIHBhZ2VTaXplKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZE1hbmFnZWRVc2VySWQgPSBTdHJpbmcoZmlsdGVycz8ubWFuYWdlZFVzZXJJZCB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxuICAgICAgY29uc3QgcmVxdWVzdEtleSA9IEpTT04uc3RyaW5naWZ5KHsgbW9kZSwgcGF5bG9hZCwgbWFuYWdlZFVzZXJJZDogbm9ybWFsaXplZE1hbmFnZWRVc2VySWQgfSk7XHJcblxyXG4gICAgICBpZiAoYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCAmJiBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPT09IHJlcXVlc3RLZXkpIHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwibG9hZExpc3Q6c2tpcC1kdXBsaWNhdGUtcmVxdWVzdFwiLCB7XHJcbiAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgbW9kZSxcclxuICAgICAgICAgIHJlcXVlc3RLZXksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCkge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8oXCJsb2FkTGlzdDphYm9ydC1wcmV2aW91cy1yZXF1ZXN0XCIsIHtcclxuICAgICAgICAgIHByZXZpb3VzUmVxdWVzdEtleTogYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50LFxyXG4gICAgICAgICAgcHJldmlvdXNSZXF1ZXN0U2VxOiBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQsXHJcbiAgICAgICAgICBzdGFjazogYnVpbGRFeHBlbnNlVGlja2V0c0RlYnVnU3RhY2soXCJsb2FkTGlzdDphYm9ydC1wcmV2aW91cy1yZXF1ZXN0XCIpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQuYWJvcnQoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XHJcbiAgICAgIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9IHJlcXVlc3RLZXk7XHJcbiAgICAgIGNvbnN0IHJlcXVlc3RTZXEgPSBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQgKyAxO1xyXG4gICAgICBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQgPSByZXF1ZXN0U2VxO1xyXG4gICAgICBjb25zdCBoYW5kbGVBYm9ydFNpZ25hbCA9ICgpID0+IHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwibG9hZExpc3Q6c2lnbmFsLWFib3J0LWV2ZW50XCIsIHtcclxuICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICBtb2RlLFxyXG4gICAgICAgICAgcmVxdWVzdFNlcSxcclxuICAgICAgICAgIHJlcXVlc3RLZXksXHJcbiAgICAgICAgICBzaWduYWxBYm9ydGVkOiBjb250cm9sbGVyLnNpZ25hbC5hYm9ydGVkLFxyXG4gICAgICAgICAgc2lnbmFsUmVhc29uOlxyXG4gICAgICAgICAgICBcInJlYXNvblwiIGluIGNvbnRyb2xsZXIuc2lnbmFsXHJcbiAgICAgICAgICAgICAgPyAoKGNvbnRyb2xsZXIuc2lnbmFsIGFzIEFib3J0U2lnbmFsICYgeyByZWFzb24/OiB1bmtub3duIH0pLnJlYXNvbiA/PyBudWxsKVxyXG4gICAgICAgICAgICAgIDogbnVsbCxcclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuICAgICAgY29udHJvbGxlci5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0U2lnbmFsLCB7IG9uY2U6IHRydWUgfSk7XHJcblxyXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyhcImxvYWRMaXN0OmZldGNoLXN0YXJ0XCIsIHtcclxuICAgICAgICBwYWdlLFxyXG4gICAgICAgIG1vZGUsXHJcbiAgICAgICAgbm9ybWFsaXplZE1hbmFnZWRVc2VySWQsXHJcbiAgICAgICAgcGF5bG9hZCxcclxuICAgICAgICByZXF1ZXN0S2V5LFxyXG4gICAgICAgIHJlcXVlc3RTZXEsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJ1bkV4cGVuc2VSZWFkUmVxdWVzdFdpdGhSZXRyeShcclxuICAgICAgICAgICgpID0+XHJcbiAgICAgICAgICAgIG1vZGUgPT09IFwibGlua1wiXHJcbiAgICAgICAgICAgICAgPyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0KHBheWxvYWQsIHtcclxuICAgICAgICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgICAgICAgICAgICAgIGF4VXNlcklkT3ZlcnJpZGU6IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgOiBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0KHBheWxvYWQsIHtcclxuICAgICAgICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgICAgICAgICAgICAgIGF4VXNlcklkT3ZlcnJpZGU6IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyhcImxvYWRMaXN0OmZldGNoLWZpbmlzaGVkXCIsIHtcclxuICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICBtb2RlLFxyXG4gICAgICAgICAgcmVxdWVzdFNlcSxcclxuICAgICAgICAgIHN1Y2Nlc3M6IHJlc3BvbnNlPy5TdWNjZXNzLFxyXG4gICAgICAgICAgdG90YWw6IHJlc3BvbnNlPy5Ub3RhbCxcclxuICAgICAgICAgIGl0ZW1zOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcy5sZW5ndGggOiAwLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChyZXF1ZXN0U2VxICE9PSBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImxvYWRMaXN0OmFwaS11bnN1Y2Nlc3NmdWxcIiwge1xyXG4gICAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgICBtb2RlLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5NZXNzYWdlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiVGlja2V0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXRzLlwiKSk7XHJcbiAgICAgICAgICBzZXRJdGVtcyhbXSk7XHJcbiAgICAgICAgICBzZXRUb3RhbCgwKTtcclxuICAgICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc291cmNlSXRlbXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xyXG4gICAgICAgIGNvbnN0IG1hcHBlZEl0ZW1zID0gc291cmNlSXRlbXMubWFwKChpdGVtKSA9PlxyXG4gICAgICAgICAgbW9kZSA9PT0gXCJsaW5rXCJcclxuICAgICAgICAgICAgPyBtYXBUaWNrZXRMaW5rSXRlbVRvQ2FyZChpdGVtIGFzIHVua25vd24gYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pXHJcbiAgICAgICAgICAgIDogbWFwVGlja2V0SXRlbVRvQ2FyZChpdGVtIGFzIHVua25vd24gYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCByZXNwb25zZVRvdGFsID0gTnVtYmVyKHJlc3BvbnNlPy5Ub3RhbCA/PyBtYXBwZWRJdGVtcy5sZW5ndGggPz8gMCk7XHJcblxyXG4gICAgICAgIHNldEl0ZW1zKG1hcHBlZEl0ZW1zKTtcclxuICAgICAgICBzZXRUb3RhbChyZXNwb25zZVRvdGFsKTtcclxuICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAocmVxdWVzdFNlcSAhPT0gYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICAgICAgaWYgKGlzRXhwZW5zZUFib3J0TGlrZUVycm9yKGVycm9yLCBjb250cm9sbGVyLnNpZ25hbCkpIHtcclxuICAgICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJsb2FkTGlzdDphYm9ydGVkXCIsIHtcclxuICAgICAgICAgICAgcGFnZSxcclxuICAgICAgICAgICAgbW9kZSxcclxuICAgICAgICAgICAgcmVxdWVzdFNlcSxcclxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvcixcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImxvYWRMaXN0OmZvcmJpZGRlblwiLCB7XHJcbiAgICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICAgIG1vZGUsXHJcbiAgICAgICAgICAgIHJlcXVlc3RTZXEsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RFcnJvcihcImxvYWRMaXN0OmZhaWxlZFwiLCB7XHJcbiAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgbW9kZSxcclxuICAgICAgICAgIHJlcXVlc3RTZXEsXHJcbiAgICAgICAgICBtZXNzYWdlOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGVycm9yLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJUaWNrZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldHMuXCIpO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShtZXNzYWdlKTtcclxuICAgICAgICBzZXRJdGVtcyhbXSk7XHJcbiAgICAgICAgc2V0VG90YWwoMCk7XHJcbiAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgY29udHJvbGxlci5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0U2lnbmFsKTtcclxuICAgICAgICBpZiAocmVxdWVzdFNlcSA9PT0gYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RJbmZvKFwibG9hZExpc3Q6ZmluYWxpemVcIiwge1xyXG4gICAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgICBtb2RlLFxyXG4gICAgICAgICAgICByZXF1ZXN0U2VxLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgICBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtoYXNBY2Nlc3MsIG1vZGUsIG9uRm9yYmlkZGVuLCBwYWdlU2l6ZV1cclxuICApO1xyXG5cclxuICBjb25zdCByZXNldExpc3QgPSB1c2VDYWxsYmFjaygoc291cmNlID0gXCJ1bmtub3duXCIpID0+IHtcclxuICAgIGlmIChhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJyZXNldExpc3Q6YWJvcnQtYWN0aXZlLXJlcXVlc3RcIiwge1xyXG4gICAgICAgIHNvdXJjZSxcclxuICAgICAgICBhY3RpdmVSZXF1ZXN0S2V5OiBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQsXHJcbiAgICAgICAgYWN0aXZlUmVxdWVzdFNlcTogYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50LFxyXG4gICAgICAgIHN0YWNrOiBidWlsZEV4cGVuc2VUaWNrZXRzRGVidWdTdGFjayhgcmVzZXRMaXN0OiR7c291cmNlfWApLFxyXG4gICAgICB9KTtcclxuICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudC5hYm9ydCgpO1xyXG4gICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID0gXCJcIjtcclxuICAgIH1cclxuICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8oXCJyZXNldExpc3Q6Y2xlYXItc3RhdGVcIiwge1xyXG4gICAgICBzb3VyY2UsXHJcbiAgICB9KTtcclxuICAgIHNldEl0ZW1zKFtdKTtcclxuICAgIHNldFRvdGFsKDApO1xyXG4gICAgc2V0Q3VycmVudFBhZ2UoMSk7XHJcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjbGVhckxpc3RDYWNoZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIC8vIFRpY2tldCBsaXN0IGF1dG8tbG9hZCBtdXN0IGFsd2F5cyBoaXQgdGhlIGxpdmUgZW5kcG9pbnQuXHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaWYgKGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwiY2xlYW51cDphYm9ydC1hY3RpdmUtcmVxdWVzdFwiLCB7XHJcbiAgICAgICAgICBhY3RpdmVSZXF1ZXN0S2V5OiBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQsXHJcbiAgICAgICAgICBhY3RpdmVSZXF1ZXN0U2VxOiBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQsXHJcbiAgICAgICAgICBzdGFjazogYnVpbGRFeHBlbnNlVGlja2V0c0RlYnVnU3RhY2soXCJjbGVhbnVwOmFib3J0LWFjdGl2ZS1yZXF1ZXN0XCIpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQuYWJvcnQoKTtcclxuICAgICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGl0ZW1zLFxyXG4gICAgdG90YWwsXHJcbiAgICBjdXJyZW50UGFnZSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGxvYWRMaXN0LFxyXG4gICAgcmVzdG9yZUxpc3RTbmFwc2hvdCxcclxuICAgIHJlc2V0TGlzdCxcclxuICAgIGNsZWFyTGlzdENhY2hlLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyBub3JtYWxpemVFeHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QudHNcIjtcclxuaW1wb3J0IHsgdG9FeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZUdhc3RvVHlwZUNhdGFsb2cudHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXHJcbiAgRXhwZW5zZVRpY2tldExpbmtDYXJkLFxyXG4gIEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZSxcclxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeSwgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZVNjb3BlVG9rZW4gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNjb3BlLnRzXCI7XHJcblxyXG5jb25zdCBFWFBFTlNFX1RJQ0tFVF9MSU5LX1JFVFVSTl9TVEFURV9LRVlfUFJFRklYID0gXCJleHBlbnNlX3RpY2tldF9saW5rX3JldHVybl9zdGF0ZV92MVwiO1xyXG5jb25zdCBFWFBFTlNFX1RJQ0tFVF9MSU5LX1JFVFVSTl9TVEFURV9UVExfTVMgPSAxMiAqIDYwICogNjAgKiAxMDAwO1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSA9IHtcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgcGFnZTogbnVtYmVyO1xyXG4gIHNjcm9sbFk6IG51bWJlcjtcclxuICBmb2N1c0ZpbGVJZDogc3RyaW5nO1xyXG4gIGZpbHRlcnM6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3Q7XHJcbiAgc2VsZWN0aW9uTW9kZTogRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25Nb2RlO1xyXG4gIHNlbGVjdGVkVGlja2V0czogRXhwZW5zZVRpY2tldExpbmtDYXJkW107XHJcbiAgZXhjbHVkZWRJZHM6IHN0cmluZ1tdO1xyXG4gIGZpbHRlcmVkU2VsZWN0aW9uRmlsdGVyczogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB8IG51bGw7XHJcbiAgZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbDogbnVtYmVyO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0U2NvcGVkS2V5ID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGAke0VYUEVOU0VfVElDS0VUX0xJTktfUkVUVVJOX1NUQVRFX0tFWV9QUkVGSVh9XyR7Z2V0RXhwZW5zZVNjb3BlVG9rZW4oKX1gO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplRmlsZUlkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVByb2Nlc3NlZEJ5QWkgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBmYWxzZSkgcmV0dXJuIHZhbHVlO1xyXG4gIGlmICh2YWx1ZSA9PT0gMSB8fCB2YWx1ZSA9PT0gXCIxXCIgfHwgdmFsdWUgPT09IFwidHJ1ZVwiKSByZXR1cm4gdHJ1ZTtcclxuICBpZiAodmFsdWUgPT09IDAgfHwgdmFsdWUgPT09IFwiMFwiIHx8IHZhbHVlID09PSBcImZhbHNlXCIpIHJldHVybiBmYWxzZTtcclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZU51bGxhYmxlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVGlja2V0R2FzdG9UeXBlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZVRpY2tldExpbmtDYXJkW1wiZ2FzdG9UeXBlXCJdID0+IHtcclxuICByZXR1cm4gdG9FeHBlbnNlR2FzdG9UeXBlQ29kZSh2YWx1ZSkgYXMgRXhwZW5zZVRpY2tldExpbmtDYXJkW1wiZ2FzdG9UeXBlXCJdO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplU2VsZWN0aW9uTW9kZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZSA9PiB7XHJcbiAgcmV0dXJuIHZhbHVlID09PSBcImZpbHRlcmVkXCIgPyBcImZpbHRlcmVkXCIgOiBcInNlbGVjdGVkXCI7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVTZWxlY3RlZFRpY2tldHMgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlVGlja2V0TGlua0NhcmRbXSA9PiB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIFtdO1xyXG5cclxuICBjb25zdCBpdGVtcyA9IG5ldyBNYXA8c3RyaW5nLCBFeHBlbnNlVGlja2V0TGlua0NhcmQ+KCk7XHJcbiAgZm9yIChjb25zdCBlbnRyeSBvZiB2YWx1ZSkge1xyXG4gICAgY29uc3QgaXRlbSA9IChlbnRyeSB8fCB7fSkgYXMgUGFydGlhbDxFeHBlbnNlVGlja2V0TGlua0NhcmQ+O1xyXG4gICAgY29uc3QgZmlsZUlkID0gbm9ybWFsaXplRmlsZUlkKGl0ZW0uZmlsZUlkKTtcclxuICAgIGlmICghZmlsZUlkKSBjb250aW51ZTtcclxuXHJcbiAgICBpdGVtcy5zZXQoZmlsZUlkLCB7XHJcbiAgICAgIGtpbmQ6IFwibGlua1wiLFxyXG4gICAgICBmaWxlSWQsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoaXRlbS5kZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXHJcbiAgICAgIHByb2Nlc3NlZEJ5QUk6IG5vcm1hbGl6ZVByb2Nlc3NlZEJ5QWkoaXRlbS5wcm9jZXNzZWRCeUFJKSxcclxuICAgICAgY3VycmVuY3lDb2RlOiBTdHJpbmcoaXRlbS5jdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgICB0b3RhbEFtb3VudDogbm9ybWFsaXplTnVsbGFibGVOdW1iZXIoaXRlbS50b3RhbEFtb3VudCksXHJcbiAgICAgIHRyYW5zRGF0ZTogU3RyaW5nKGl0ZW0udHJhbnNEYXRlIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgICAgZmlsZU5hbWU6IFN0cmluZyhpdGVtLmZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgICAgZ2FzdG9UeXBlOiBub3JtYWxpemVUaWNrZXRHYXN0b1R5cGUoaXRlbS5nYXN0b1R5cGUpLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gQXJyYXkuZnJvbShpdGVtcy52YWx1ZXMoKSk7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVFeGNsdWRlZElkcyA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZ1tdID0+IHtcclxuICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gW107XHJcblxyXG4gIGNvbnN0IGlkcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG4gIGZvciAoY29uc3QgZW50cnkgb2YgdmFsdWUpIHtcclxuICAgIGNvbnN0IGZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZChlbnRyeSk7XHJcbiAgICBpZiAoIWZpbGVJZCkgY29udGludWU7XHJcbiAgICBpZHMuYWRkKGZpbGVJZCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gQXJyYXkuZnJvbShpZHMpO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplTm9uTmVnYXRpdmVJbnRlZ2VyID0gKHZhbHVlOiB1bmtub3duLCBmYWxsYmFjayA9IDApOiBudW1iZXIgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpICYmIHBhcnNlZCA+PSAwID8gTWF0aC5mbG9vcihwYXJzZWQpIDogZmFsbGJhY2s7XHJcbn07XHJcblxyXG4vLyBOb3JtYWxpemVzIHRoZSBsaW5rLW1vZGUgdGlja2V0IHJldHVybiBzdGF0ZSBzbyBiYWNrIG5hdmlnYXRpb24gY2FuIHJlc3RvcmUgZmlsdGVycyBhbmQgc2VsZWN0aW9uIHNhZmVseS5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlIHwgbnVsbCA9PiB7XHJcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBwYXlsb2FkID0gdmFsdWUgYXMgUGFydGlhbDxFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlPjtcclxuICBjb25zdCBzaGVldElkID0gU3RyaW5nKHBheWxvYWQuc2hlZXRJZCB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCFzaGVldElkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNoZWV0SWQsXHJcbiAgICBwYWdlOiBNYXRoLm1heCgxLCBub3JtYWxpemVOb25OZWdhdGl2ZUludGVnZXIocGF5bG9hZC5wYWdlLCAxKSksXHJcbiAgICBzY3JvbGxZOiBub3JtYWxpemVOb25OZWdhdGl2ZUludGVnZXIocGF5bG9hZC5zY3JvbGxZKSxcclxuICAgIGZvY3VzRmlsZUlkOiBub3JtYWxpemVGaWxlSWQocGF5bG9hZC5mb2N1c0ZpbGVJZCksXHJcbiAgICBmaWx0ZXJzOiBub3JtYWxpemVFeHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QocGF5bG9hZC5maWx0ZXJzKSxcclxuICAgIHNlbGVjdGlvbk1vZGU6IG5vcm1hbGl6ZVNlbGVjdGlvbk1vZGUocGF5bG9hZC5zZWxlY3Rpb25Nb2RlKSxcclxuICAgIHNlbGVjdGVkVGlja2V0czogbm9ybWFsaXplU2VsZWN0ZWRUaWNrZXRzKHBheWxvYWQuc2VsZWN0ZWRUaWNrZXRzKSxcclxuICAgIGV4Y2x1ZGVkSWRzOiBub3JtYWxpemVFeGNsdWRlZElkcyhwYXlsb2FkLmV4Y2x1ZGVkSWRzKSxcclxuICAgIGZpbHRlcmVkU2VsZWN0aW9uRmlsdGVyczogcGF5bG9hZC5maWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnNcclxuICAgICAgPyBub3JtYWxpemVFeHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QocGF5bG9hZC5maWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnMpXHJcbiAgICAgIDogbnVsbCxcclxuICAgIGZpbHRlcmVkU2VsZWN0aW9uVG90YWw6IG5vcm1hbGl6ZU5vbk5lZ2F0aXZlSW50ZWdlcihwYXlsb2FkLmZpbHRlcmVkU2VsZWN0aW9uVG90YWwpLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBSZWFkcyBhIHN0b3JlZCBsaW5rLW1vZGUgcmV0dXJuIHN0YXRlIHdoZW4gaXQgc3RpbGwgbWF0Y2hlcyB0aGUgYWN0aXZlIGV4cGVuc2Ugc2hlZXQuXHJcbmV4cG9ydCBjb25zdCByZWFkRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSA9IChzaGVldElkPzogdW5rbm93bik6IEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgfCBudWxsID0+IHtcclxuICBjb25zdCBzdG9yZWQgPSBub3JtYWxpemVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKFxyXG4gICAgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5PEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGU+KGdldFNjb3BlZEtleSgpKVxyXG4gICk7XHJcbiAgaWYgKCFzdG9yZWQpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBzYWZlU2hlZXRJZCA9IFN0cmluZyhzaGVldElkIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXNhZmVTaGVldElkKSByZXR1cm4gc3RvcmVkO1xyXG4gIHJldHVybiBzdG9yZWQuc2hlZXRJZC50b1VwcGVyQ2FzZSgpID09PSBzYWZlU2hlZXRJZC50b1VwcGVyQ2FzZSgpID8gc3RvcmVkIDogbnVsbDtcclxufTtcclxuXHJcbi8vIFBlcnNpc3RzIHRoZSBtaW5pbXVtIGxpbmstbW9kZSBzdGF0ZSByZXF1aXJlZCB0byByZXR1cm4gZnJvbSB0aWNrZXQgZGV0YWlsIHdpdGhvdXQgbG9zaW5nIHNlbGVjdGlvbi5cclxuZXhwb3J0IGNvbnN0IHNhdmVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlID0gKFxyXG4gIHZhbHVlOiBFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlIHwgbnVsbCB8IHVuZGVmaW5lZFxyXG4pOiBFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlIHwgbnVsbCA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUodmFsdWUpO1xyXG4gIGlmICghbm9ybWFsaXplZCkge1xyXG4gICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKCk7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeShnZXRTY29wZWRLZXkoKSwgbm9ybWFsaXplZCwgRVhQRU5TRV9USUNLRVRfTElOS19SRVRVUk5fU1RBVEVfVFRMX01TKTtcclxuICByZXR1cm4gbm9ybWFsaXplZDtcclxufTtcclxuXHJcbi8vIENsZWFycyBhbnkgc3RvcmVkIGxpbmstbW9kZSByZXR1cm4gc3RhdGUgZm9yIHRoZSBjdXJyZW50IGV4cGVuc2Ugc2NvcGUuXHJcbmV4cG9ydCBjb25zdCBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgPSAoKTogdm9pZCA9PiB7XHJcbiAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShnZXRTY29wZWRLZXkoKSk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXHJcbiAgRXhwZW5zZVRpY2tldExpbmtDYXJkLFxyXG4gIEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZSxcclxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvblN0YXRlID0ge1xyXG4gIHNlbGVjdGlvbk1vZGU6IEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZTtcclxuICBzZWxlY3RlZFRpY2tldHM6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtdO1xyXG4gIGV4Y2x1ZGVkSWRzOiBzdHJpbmdbXTtcclxuICBmaWx0ZXJlZFNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90IHwgbnVsbDtcclxuICBmaWx0ZXJlZFRvdGFsQ291bnQ6IG51bWJlcjtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUZpbGVJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xyXG5cclxuY29uc3Qgbm9ybWFsaXplU2VsZWN0aW9uTW9kZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZSA9PiB7XHJcbiAgcmV0dXJuIHZhbHVlID09PSBcImZpbHRlcmVkXCIgPyBcImZpbHRlcmVkXCIgOiBcInNlbGVjdGVkXCI7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVFeGNsdWRlZElkcyA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZ1tdID0+IHtcclxuICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gW107XHJcblxyXG4gIGNvbnN0IGlkcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG4gIGZvciAoY29uc3QgZW50cnkgb2YgdmFsdWUpIHtcclxuICAgIGNvbnN0IGZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZChlbnRyeSk7XHJcbiAgICBpZiAoIWZpbGVJZCkgY29udGludWU7XHJcbiAgICBpZHMuYWRkKGZpbGVJZCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gQXJyYXkuZnJvbShpZHMpO1xyXG59O1xyXG5cclxuY29uc3QgdG9TZWxlY3RlZE1hcCA9IChpdGVtczogRXhwZW5zZVRpY2tldExpbmtDYXJkW10pOiBSZWNvcmQ8c3RyaW5nLCBFeHBlbnNlVGlja2V0TGlua0NhcmQ+ID0+IHtcclxuICBjb25zdCBuZXh0OiBSZWNvcmQ8c3RyaW5nLCBFeHBlbnNlVGlja2V0TGlua0NhcmQ+ID0ge307XHJcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XHJcbiAgICBjb25zdCBmaWxlSWQgPSBub3JtYWxpemVGaWxlSWQoaXRlbS5maWxlSWQpO1xyXG4gICAgaWYgKCFmaWxlSWQpIGNvbnRpbnVlO1xyXG4gICAgbmV4dFtmaWxlSWRdID0gaXRlbTtcclxuICB9XHJcbiAgcmV0dXJuIG5leHQ7XHJcbn07XHJcblxyXG4vLyBLZWVwcyBsaW5rLW1vZGUgdGlja2V0IHNlbGVjdGlvbiBzdGFibGUgYWNyb3NzIHBhZ2luZywgZmlsdGVyZWQgc2VsZWN0LWFsbCwgYW5kIGRldGFpbCByZXR1cm5zLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgY29uc3QgW3NlbGVjdGlvbk1vZGUsIHNldFNlbGVjdGlvbk1vZGVdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25Nb2RlPihcInNlbGVjdGVkXCIpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZFRpY2tldHNCeUlkLCBzZXRTZWxlY3RlZFRpY2tldHNCeUlkXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZD4+KHt9KTtcclxuICBjb25zdCBbZXhjbHVkZWRJZHMsIHNldEV4Y2x1ZGVkSWRzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXSk7XHJcbiAgY29uc3QgW2ZpbHRlcmVkU25hcHNob3QsIHNldEZpbHRlcmVkU25hcHNob3RdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtmaWx0ZXJlZFRvdGFsQ291bnQsIHNldEZpbHRlcmVkVG90YWxDb3VudF0gPSB1c2VTdGF0ZSgwKTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0ZWRUaWNrZXRzID0gdXNlTWVtbygoKSA9PiBPYmplY3QudmFsdWVzKHNlbGVjdGVkVGlja2V0c0J5SWQpLCBbc2VsZWN0ZWRUaWNrZXRzQnlJZF0pO1xyXG4gIGNvbnN0IGV4Y2x1ZGVkSWRTZXQgPSB1c2VNZW1vKCgpID0+IG5ldyBTZXQoZXhjbHVkZWRJZHMpLCBbZXhjbHVkZWRJZHNdKTtcclxuICBjb25zdCBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlID0gc2VsZWN0aW9uTW9kZSA9PT0gXCJmaWx0ZXJlZFwiICYmICEhZmlsdGVyZWRTbmFwc2hvdDtcclxuXHJcbiAgY29uc3QgY2xlYXJTZWxlY3Rpb24gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRTZWxlY3Rpb25Nb2RlKFwic2VsZWN0ZWRcIik7XHJcbiAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKHt9KTtcclxuICAgIHNldEV4Y2x1ZGVkSWRzKFtdKTtcclxuICAgIHNldEZpbHRlcmVkU25hcHNob3QobnVsbCk7XHJcbiAgICBzZXRGaWx0ZXJlZFRvdGFsQ291bnQoMCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCByZXN0b3JlU2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soKHN0YXRlOiBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvblN0YXRlIHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4ge1xyXG4gICAgaWYgKCFzdGF0ZSkge1xyXG4gICAgICBjbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgbm9ybWFsaXplZE1vZGUgPSBub3JtYWxpemVTZWxlY3Rpb25Nb2RlKHN0YXRlLnNlbGVjdGlvbk1vZGUpO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZFNlbGVjdGVkVGlja2V0cyA9IEFycmF5LmlzQXJyYXkoc3RhdGUuc2VsZWN0ZWRUaWNrZXRzKSA/IHN0YXRlLnNlbGVjdGVkVGlja2V0cyA6IFtdO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZFNuYXBzaG90ID0gc3RhdGUuZmlsdGVyZWRTbmFwc2hvdCB8fCBudWxsO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZEV4Y2x1ZGVkSWRzID0gbm9ybWFsaXplRXhjbHVkZWRJZHMoc3RhdGUuZXhjbHVkZWRJZHMpO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZEZpbHRlcmVkVG90YWwgPSBOdW1iZXIuaXNGaW5pdGUoTnVtYmVyKHN0YXRlLmZpbHRlcmVkVG90YWxDb3VudCkpXHJcbiAgICAgID8gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihOdW1iZXIoc3RhdGUuZmlsdGVyZWRUb3RhbENvdW50KSkpXHJcbiAgICAgIDogMDtcclxuXHJcbiAgICBzZXRTZWxlY3Rpb25Nb2RlKG5vcm1hbGl6ZWRNb2RlID09PSBcImZpbHRlcmVkXCIgJiYgbm9ybWFsaXplZFNuYXBzaG90ID8gXCJmaWx0ZXJlZFwiIDogXCJzZWxlY3RlZFwiKTtcclxuICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQodG9TZWxlY3RlZE1hcChub3JtYWxpemVkU2VsZWN0ZWRUaWNrZXRzKSk7XHJcbiAgICBzZXRFeGNsdWRlZElkcyhub3JtYWxpemVkTW9kZSA9PT0gXCJmaWx0ZXJlZFwiID8gbm9ybWFsaXplZEV4Y2x1ZGVkSWRzIDogW10pO1xyXG4gICAgc2V0RmlsdGVyZWRTbmFwc2hvdChub3JtYWxpemVkTW9kZSA9PT0gXCJmaWx0ZXJlZFwiID8gbm9ybWFsaXplZFNuYXBzaG90IDogbnVsbCk7XHJcbiAgICBzZXRGaWx0ZXJlZFRvdGFsQ291bnQobm9ybWFsaXplZE1vZGUgPT09IFwiZmlsdGVyZWRcIiA/IG5vcm1hbGl6ZWRGaWx0ZXJlZFRvdGFsIDogMCk7XHJcbiAgfSwgW2NsZWFyU2VsZWN0aW9uXSk7XHJcblxyXG4gIGNvbnN0IHNlbGVjdEFsbEJ5RmlsdGVycyA9IHVzZUNhbGxiYWNrKChzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCwgdG90YWxDb3VudDogbnVtYmVyKSA9PiB7XHJcbiAgICBzZXRTZWxlY3Rpb25Nb2RlKFwiZmlsdGVyZWRcIik7XHJcbiAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKHt9KTtcclxuICAgIHNldEV4Y2x1ZGVkSWRzKFtdKTtcclxuICAgIHNldEZpbHRlcmVkU25hcHNob3Qoc25hcHNob3QpO1xyXG4gICAgc2V0RmlsdGVyZWRUb3RhbENvdW50KE51bWJlci5pc0Zpbml0ZSh0b3RhbENvdW50KSA/IE1hdGgubWF4KDAsIE1hdGguZmxvb3IodG90YWxDb3VudCkpIDogMCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBpc1NlbGVjdGVkID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZmlsZUlkOiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3Qgc2FmZUZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZChmaWxlSWQpO1xyXG4gICAgICBpZiAoIXNhZmVGaWxlSWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgIGlmIChpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlKSB7XHJcbiAgICAgICAgcmV0dXJuICFleGNsdWRlZElkU2V0LmhhcyhzYWZlRmlsZUlkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuICEhc2VsZWN0ZWRUaWNrZXRzQnlJZFtzYWZlRmlsZUlkXTtcclxuICAgIH0sXHJcbiAgICBbZXhjbHVkZWRJZFNldCwgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSwgc2VsZWN0ZWRUaWNrZXRzQnlJZF1cclxuICApO1xyXG5cclxuICBjb25zdCB0b2dnbGVUaWNrZXQgPSB1c2VDYWxsYmFjayhcclxuICAgICh0aWNrZXQ6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCkgPT4ge1xyXG4gICAgICBjb25zdCBmaWxlSWQgPSBub3JtYWxpemVGaWxlSWQodGlja2V0LmZpbGVJZCk7XHJcbiAgICAgIGlmICghZmlsZUlkKSByZXR1cm47XHJcblxyXG4gICAgICBpZiAoaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSkge1xyXG4gICAgICAgIHNldEV4Y2x1ZGVkSWRzKChwcmV2aW91cykgPT4ge1xyXG4gICAgICAgICAgY29uc3QgbmV4dCA9IG5ldyBTZXQocHJldmlvdXMpO1xyXG4gICAgICAgICAgaWYgKG5leHQuaGFzKGZpbGVJZCkpIHtcclxuICAgICAgICAgICAgbmV4dC5kZWxldGUoZmlsZUlkKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5leHQuYWRkKGZpbGVJZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShuZXh0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldmlvdXMgfTtcclxuICAgICAgICBpZiAobmV4dFtmaWxlSWRdKSB7XHJcbiAgICAgICAgICBkZWxldGUgbmV4dFtmaWxlSWRdO1xyXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5leHRbZmlsZUlkXSA9IHRpY2tldDtcclxuICAgICAgICByZXR1cm4gbmV4dDtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW2lzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaHlkcmF0ZVZpc2libGVUaWNrZXRzID0gdXNlQ2FsbGJhY2soKGl0ZW1zOiBFeHBlbnNlVGlja2V0TGlua0NhcmRbXSkgPT4ge1xyXG4gICAgaWYgKHNlbGVjdGlvbk1vZGUgIT09IFwic2VsZWN0ZWRcIiB8fCBpdGVtcy5sZW5ndGggPCAxKSByZXR1cm47XHJcblxyXG4gICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZCgocHJldmlvdXMpID0+IHtcclxuICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldmlvdXMgfTtcclxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XHJcbiAgICAgICAgY29uc3QgZmlsZUlkID0gbm9ybWFsaXplRmlsZUlkKGl0ZW0uZmlsZUlkKTtcclxuICAgICAgICBpZiAoIWZpbGVJZCB8fCAhbmV4dFtmaWxlSWRdKSBjb250aW51ZTtcclxuICAgICAgICBuZXh0W2ZpbGVJZF0gPSBpdGVtO1xyXG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjaGFuZ2VkID8gbmV4dCA6IHByZXZpb3VzO1xyXG4gICAgfSk7XHJcbiAgfSwgW3NlbGVjdGlvbk1vZGVdKTtcclxuXHJcbiAgY29uc3QgcmVzb2x2ZVNlbGVjdGVkQ291bnQgPSB1c2VDYWxsYmFjayhcclxuICAgIChmYWxsYmFja1RvdGFsQ291bnQgPSAwKTogbnVtYmVyID0+IHtcclxuICAgICAgaWYgKCFpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkVGlja2V0cy5sZW5ndGg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGJhc2VDb3VudCA9IGZpbHRlcmVkVG90YWxDb3VudCA+IDAgPyBmaWx0ZXJlZFRvdGFsQ291bnQgOiBNYXRoLm1heCgwLCBNYXRoLmZsb29yKGZhbGxiYWNrVG90YWxDb3VudCkpO1xyXG4gICAgICByZXR1cm4gTWF0aC5tYXgoMCwgYmFzZUNvdW50IC0gZXhjbHVkZWRJZHMubGVuZ3RoKTtcclxuICAgIH0sXHJcbiAgICBbZXhjbHVkZWRJZHMubGVuZ3RoLCBmaWx0ZXJlZFRvdGFsQ291bnQsIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUsIHNlbGVjdGVkVGlja2V0cy5sZW5ndGhdXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNlbGVjdGlvbk1vZGUsXHJcbiAgICBzZWxlY3RlZFRpY2tldHMsXHJcbiAgICBleGNsdWRlZElkcyxcclxuICAgIGZpbHRlcmVkU25hcHNob3QsXHJcbiAgICBmaWx0ZXJlZFRvdGFsQ291bnQsXHJcbiAgICBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlLFxyXG4gICAgaXNTZWxlY3RlZCxcclxuICAgIHRvZ2dsZVRpY2tldCxcclxuICAgIGNsZWFyU2VsZWN0aW9uLFxyXG4gICAgcmVzdG9yZVNlbGVjdGlvbixcclxuICAgIHNlbGVjdEFsbEJ5RmlsdGVycyxcclxuICAgIGh5ZHJhdGVWaXNpYmxlVGlja2V0cyxcclxuICAgIHJlc29sdmVTZWxlY3RlZENvdW50LFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWR1Y2VyIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRSZXF1ZXN0ID0ge1xyXG4gIHBhZ2U6IG51bWJlcjtcclxuICBzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdDtcclxuICBjbGVhckNhY2hlOiBib29sZWFuO1xyXG4gIHJlc2V0QmVmb3JlTG9hZDogYm9vbGVhbjtcclxuICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBBdXRvbWF0aWNMb2FkQWN0aW9uID1cclxuICB8IHtcclxuICAgICAgdHlwZTogXCJzY2hlZHVsZVwiO1xyXG4gICAgICByZXF1ZXN0OiBFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZFJlcXVlc3Q7XHJcbiAgICB9XHJcbiAgfCB7XHJcbiAgICAgIHR5cGU6IFwiY2xlYXJcIjtcclxuICAgIH1cclxuICB8IHtcclxuICAgICAgdHlwZTogXCJkaXNhYmxlX2xpbmtfd2FpdFwiO1xyXG4gICAgfTtcclxuXHJcbmNvbnN0IGF1dG9tYXRpY0xvYWRSZWR1Y2VyID0gKFxyXG4gIHN0YXRlOiBFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZFJlcXVlc3QgfCBudWxsLFxyXG4gIGFjdGlvbjogQXV0b21hdGljTG9hZEFjdGlvblxyXG4pOiBFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZFJlcXVlc3QgfCBudWxsID0+IHtcclxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICBjYXNlIFwic2NoZWR1bGVcIjpcclxuICAgICAgcmV0dXJuIGFjdGlvbi5yZXF1ZXN0O1xyXG4gICAgY2FzZSBcImNsZWFyXCI6XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgY2FzZSBcImRpc2FibGVfbGlua193YWl0XCI6XHJcbiAgICAgIHJldHVybiBzdGF0ZSA/IHsgLi4uc3RhdGUsIHdhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHk6IGZhbHNlIH0gOiBudWxsO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxufTtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRBcmdzID0ge1xyXG4gIGlzTGlua01vZGU6IGJvb2xlYW47XHJcbiAgY2FuUHJvY2Vzc0xpbmtNb2RlOiBib29sZWFuO1xyXG4gIGxpbmtTaGVldENoZWNrQnVzeTogYm9vbGVhbjtcclxuICBsaW5rU2hlZXRMb2NrZWQ6IGJvb2xlYW47XHJcbiAgY2xlYXJMaXN0Q2FjaGU6ICgpID0+IHZvaWQ7XHJcbiAgcmVzZXRMaXN0OiAoc291cmNlPzogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGxvYWRMaXN0OiAocGFnZTogbnVtYmVyLCBzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4gUHJvbWlzZTx2b2lkPjtcclxufTtcclxuXHJcbmNvbnN0IEVYUEVOU0VfVElDS0VUU19BVVRPX0xPQURfTE9HX1BSRUZJWCA9IFwiW2V4cGVuc2UtdGlja2V0czphdXRvLWxvYWRdXCI7XHJcblxyXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkSW5mbyA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUuaW5mbyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLmluZm8oRVhQRU5TRV9USUNLRVRTX0FVVE9fTE9BRF9MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkV2FybiA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUud2FybiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLndhcm4oRVhQRU5TRV9USUNLRVRTX0FVVE9fTE9BRF9MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBRdWV1ZXMgb25lIHRpY2tldCBsaXN0IHJlbG9hZCBhbmQgcmVsZWFzZXMgaXQgb25seSB3aGVuIGxpbmstbW9kZSBwcmVjb25kaXRpb25zIGFyZSByZWFkeS5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkID0gKHtcclxuICBpc0xpbmtNb2RlLFxyXG4gIGNhblByb2Nlc3NMaW5rTW9kZSxcclxuICBsaW5rU2hlZXRDaGVja0J1c3ksXHJcbiAgbGlua1NoZWV0TG9ja2VkLFxyXG4gIGNsZWFyTGlzdENhY2hlLFxyXG4gIHJlc2V0TGlzdCxcclxuICBsb2FkTGlzdCxcclxufTogVXNlRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRBcmdzKSA9PiB7XHJcbiAgY29uc3QgW3BlbmRpbmdBdXRvbWF0aWNMb2FkLCBkaXNwYXRjaF0gPSB1c2VSZWR1Y2VyKGF1dG9tYXRpY0xvYWRSZWR1Y2VyLCBudWxsKTtcclxuXHJcbiAgY29uc3QgcnVuQXV0b21hdGljTGlzdExvYWQgPSB1c2VDYWxsYmFjayhcclxuICAgIChcclxuICAgICAgcGFnZTogbnVtYmVyLFxyXG4gICAgICBzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcclxuICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgIGNsZWFyQ2FjaGU/OiBib29sZWFuO1xyXG4gICAgICAgIHJlc2V0QmVmb3JlTG9hZD86IGJvb2xlYW47XHJcbiAgICAgICAgd2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeT86IGJvb2xlYW47XHJcbiAgICAgIH0gPSB7fVxyXG4gICAgKSA9PiB7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzQXV0b0xvYWRJbmZvKFwicnVuQXV0b21hdGljTGlzdExvYWQ6c2NoZWR1bGVcIiwge1xyXG4gICAgICAgIHBhZ2UsXHJcbiAgICAgICAgc25hcHNob3QsXHJcbiAgICAgICAgb3B0aW9ucyxcclxuICAgICAgfSk7XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcInNjaGVkdWxlXCIsXHJcbiAgICAgICAgcmVxdWVzdDoge1xyXG4gICAgICAgICAgcGFnZSxcclxuICAgICAgICAgIHNuYXBzaG90LFxyXG4gICAgICAgICAgY2xlYXJDYWNoZTogb3B0aW9ucy5jbGVhckNhY2hlID09PSB0cnVlLFxyXG4gICAgICAgICAgcmVzZXRCZWZvcmVMb2FkOiBvcHRpb25zLnJlc2V0QmVmb3JlTG9hZCA9PT0gdHJ1ZSxcclxuICAgICAgICAgIHdhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHk6IG9wdGlvbnMud2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeSA9PT0gdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXBlbmRpbmdBdXRvbWF0aWNMb2FkKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHBlbmRpbmdBdXRvbWF0aWNMb2FkLndhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHkpIHtcclxuICAgICAgaWYgKCFpc0xpbmtNb2RlKSB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZFdhcm4oXCJwZW5kaW5nQXV0b21hdGljTG9hZDpkaXNhYmxlLWxpbmstd2FpdFwiLCB7XHJcbiAgICAgICAgICBwYWdlOiBwZW5kaW5nQXV0b21hdGljTG9hZC5wYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJkaXNhYmxlX2xpbmtfd2FpdFwiIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFjYW5Qcm9jZXNzTGlua01vZGUgfHwgbGlua1NoZWV0Q2hlY2tCdXN5KSB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZEluZm8oXCJwZW5kaW5nQXV0b21hdGljTG9hZDp3YWl0aW5nLWxpbmstbW9kZS1yZWFkeVwiLCB7XHJcbiAgICAgICAgICBwYWdlOiBwZW5kaW5nQXV0b21hdGljTG9hZC5wYWdlLFxyXG4gICAgICAgICAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxyXG4gICAgICAgICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGxpbmtTaGVldExvY2tlZCkge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzQXV0b0xvYWRXYXJuKFwicGVuZGluZ0F1dG9tYXRpY0xvYWQ6Y2xlYXItbGluay1sb2NrZWRcIiwge1xyXG4gICAgICAgICAgcGFnZTogcGVuZGluZ0F1dG9tYXRpY0xvYWQucGFnZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IFwiY2xlYXJcIiB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IHBhZ2UsIHNuYXBzaG90LCBjbGVhckNhY2hlLCByZXNldEJlZm9yZUxvYWQgfSA9IHBlbmRpbmdBdXRvbWF0aWNMb2FkO1xyXG4gICAgZGlzcGF0Y2goeyB0eXBlOiBcImNsZWFyXCIgfSk7XHJcbiAgICBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkSW5mbyhcInBlbmRpbmdBdXRvbWF0aWNMb2FkOmV4ZWN1dGVcIiwge1xyXG4gICAgICBwYWdlLFxyXG4gICAgICBzbmFwc2hvdCxcclxuICAgICAgY2xlYXJDYWNoZSxcclxuICAgICAgcmVzZXRCZWZvcmVMb2FkLFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGNsZWFyQ2FjaGUpIHtcclxuICAgICAgY2xlYXJMaXN0Q2FjaGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzZXRCZWZvcmVMb2FkKSB7XHJcbiAgICAgIHJlc2V0TGlzdChcImF1dG9tYXRpYy1sb2FkOnJlc2V0LWJlZm9yZS1sb2FkXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHZvaWQgbG9hZExpc3QocGFnZSwgc25hcHNob3QpO1xyXG4gIH0sIFtcclxuICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcclxuICAgIGNsZWFyTGlzdENhY2hlLFxyXG4gICAgaXNMaW5rTW9kZSxcclxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcclxuICAgIGxpbmtTaGVldExvY2tlZCxcclxuICAgIGxvYWRMaXN0LFxyXG4gICAgcGVuZGluZ0F1dG9tYXRpY0xvYWQsXHJcbiAgICByZXNldExpc3QsXHJcbiAgXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBydW5BdXRvbWF0aWNMaXN0TG9hZCxcclxuICB9O1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBa0c7OztBQ0FsRyxtQkFBbUM7QUF5RDdCO0FBckNOLElBQU0sZ0NBQWdDLENBQUM7QUFBQSxFQUNyQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUEwQztBQUN4QyxRQUFNLHFCQUFxQixnQkFBZ0IsQ0FBQztBQUU1QyxRQUFNLHVCQUFtQiwwQkFBWSxNQUFNO0FBQ3pDLGlCQUFhO0FBQUEsRUFDZixHQUFHLENBQUMsWUFBWSxDQUFDO0FBRWpCLFFBQU0sNEJBQXdCLDBCQUFZLE1BQU07QUFDOUMsUUFBSSxDQUFDLG1CQUFvQjtBQUN6QixtQkFBZTtBQUFBLEVBQ2pCLEdBQUcsQ0FBQyxvQkFBb0IsY0FBYyxDQUFDO0FBRXZDLFFBQU0sa0NBQWtDLGFBQ3BDLG1EQUNBLHFCQUNFLG1HQUNBO0FBRU4sU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsV0FBVyxhQUFhLG9FQUFvRTtBQUFBLE1BQzVGLHVCQUFxQixVQUFVO0FBQUEsTUFDL0Isd0JBQXNCLGFBQWEsU0FBUztBQUFBLE1BQzVDLDBCQUF3QixxQkFBcUIsU0FBUztBQUFBLE1BRXRELHVEQUFDLFNBQUksV0FBVSxZQUNiO0FBQUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQSxRQUFRO0FBQUEsWUFDUixnQkFBZTtBQUFBLFlBQ2Ysa0JBQWtCO0FBQUEsY0FDaEIsY0FBYztBQUFBLGNBQ2QsZUFBZSxDQUFDLFVBQVU7QUFDeEIsc0JBQU0sZUFBZTtBQUFBLGNBQ3ZCO0FBQUEsWUFDRjtBQUFBO0FBQUEsUUFDRjtBQUFBLFFBRUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLE1BQUs7QUFBQSxZQUNMLGNBQVk7QUFBQSxZQUNaLGdCQUFjO0FBQUEsWUFDZCxPQUFPO0FBQUEsWUFDUCxVQUFVLENBQUM7QUFBQSxZQUNYLFNBQVM7QUFBQSxZQUNULFdBQVU7QUFBQSxZQUVWO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0MsV0FBVyxtR0FBbUcsK0JBQStCO0FBQUEsZ0JBRTdJLHNEQUFDLHFCQUFVLFdBQVUscUJBQW9CLGFBQWEsS0FBSyxlQUFZLFFBQU87QUFBQTtBQUFBLFlBQ2hGO0FBQUE7QUFBQSxRQUNGO0FBQUEsU0FDRjtBQUFBO0FBQUEsRUFDRjtBQUVKO0FBRUEsSUFBTyx3Q0FBUTs7O0FDekVULElBQUFDLHNCQUFBO0FBTE4sSUFBTSw2QkFBNkIsQ0FBQyxFQUFFLE9BQU8sT0FBTyxjQUFjLE1BQXVDO0FBQ3ZHLE1BQUksTUFBTSxTQUFTLEVBQUcsUUFBTztBQUU3QixTQUNFLDhDQUFDLFNBQUksV0FBVyx5Q0FBeUMsYUFBYSxJQUNwRTtBQUFBLGlEQUFDLE9BQUUsV0FBVSx5QkFBeUIsaUJBQU07QUFBQSxJQUM1Qyw2Q0FBQyxTQUFJLFdBQVUsa0JBQ1osZ0JBQU0sSUFBSSxDQUFDLFNBQ1Y7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUVDLFdBQVU7QUFBQSxRQUVWO0FBQUEsd0RBQUMsT0FDQztBQUFBLDBEQUFDLFVBQUssV0FBVSxpQkFBaUI7QUFBQSxtQkFBSyw0QkFBNEIsUUFBUTtBQUFBLGNBQUU7QUFBQSxlQUFDO0FBQUEsWUFBUTtBQUFBLFlBQ3JGLDZDQUFDLFVBQU0sZUFBSyxZQUFZLEtBQUk7QUFBQSxhQUM5QjtBQUFBLFVBQ0EsOENBQUMsT0FBRSxXQUFVLFFBQ1g7QUFBQSwwREFBQyxVQUFLLFdBQVUsaUJBQWlCO0FBQUEsbUJBQUssd0NBQXdDLFFBQVE7QUFBQSxjQUFFO0FBQUEsZUFBQztBQUFBLFlBQVE7QUFBQSxZQUNqRyw2Q0FBQyxVQUFNLGVBQUssVUFBVSxLQUFJO0FBQUEsYUFDNUI7QUFBQTtBQUFBO0FBQUEsTUFWSyxHQUFHLEtBQUssWUFBWSxTQUFTLElBQUksS0FBSyxVQUFVLFdBQVc7QUFBQSxJQVdsRSxDQUNELEdBQ0g7QUFBQSxLQUNGO0FBRUo7QUFHQSxJQUFNLCtCQUErQixDQUFDLEVBQUUsT0FBTyxNQUF5QztBQUN0RixNQUFJLENBQUMsT0FBUSxRQUFPO0FBRXBCLFFBQU0sY0FBYztBQUFBLElBQ2xCO0FBQUEsTUFDRSxLQUFLO0FBQUEsTUFDTCxPQUFPLEtBQUssMkNBQTJDLGFBQWE7QUFBQSxNQUNwRSxPQUFPLE9BQU87QUFBQSxJQUNoQjtBQUFBLElBQ0E7QUFBQSxNQUNFLEtBQUs7QUFBQSxNQUNMLE9BQU8sS0FBSyx3Q0FBd0MsWUFBWTtBQUFBLE1BQ2hFLE9BQU8sT0FBTztBQUFBLElBQ2hCO0FBQUEsSUFDQTtBQUFBLE1BQ0UsS0FBSztBQUFBLE1BQ0wsT0FBTyxLQUFLLHlDQUF5QyxVQUFVO0FBQUEsTUFDL0QsT0FBTyxPQUFPO0FBQUEsSUFDaEI7QUFBQSxJQUNBO0FBQUEsTUFDRSxLQUFLO0FBQUEsTUFDTCxPQUFPLEtBQUssd0NBQXdDLFVBQVU7QUFBQSxNQUM5RCxPQUFPLE9BQU87QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFFQSxTQUNFLDhDQUFDLFNBQUksV0FBVSx3R0FDYjtBQUFBLGtEQUFDLFNBQ0M7QUFBQSxtREFBQyxPQUFFLFdBQVUsd0NBQ1YsZUFBSyx1Q0FBdUMsNkJBQTBCLEdBQ3pFO0FBQUEsTUFDQyxPQUFPLGlCQUNOLDhDQUFDLE9BQUUsV0FBVSwrQkFDVjtBQUFBLGFBQUssOEJBQThCLGVBQWU7QUFBQSxRQUFFO0FBQUEsUUFBRyxPQUFPO0FBQUEsU0FDakUsSUFDRTtBQUFBLE9BQ047QUFBQSxJQUVBLDZDQUFDLFNBQUksV0FBVSx5Q0FDWixzQkFBWSxJQUFJLENBQUMsU0FDaEIsOENBQUMsU0FBbUIsV0FBVSx3RkFDNUI7QUFBQSxtREFBQyxPQUFFLFdBQVUsd0VBQXdFLGVBQUssT0FBTTtBQUFBLE1BQ2hHLDZDQUFDLE9BQUUsV0FBVSwyQ0FBMkMsZUFBSyxPQUFNO0FBQUEsU0FGM0QsS0FBSyxHQUdmLENBQ0QsR0FDSDtBQUFBLElBRUEsOENBQUMsU0FBSSxXQUFVLHlDQUNiO0FBQUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE9BQU8sS0FBSyx5Q0FBeUMsVUFBVTtBQUFBLFVBQy9ELE9BQU8sTUFBTSxRQUFRLE9BQU8sT0FBTyxJQUFJLE9BQU8sVUFBVSxDQUFDO0FBQUEsVUFDekQsZUFBYztBQUFBO0FBQUEsTUFDaEI7QUFBQSxNQUNBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxPQUFPLEtBQUssd0NBQXdDLFVBQVU7QUFBQSxVQUM5RCxPQUFPLE1BQU0sUUFBUSxPQUFPLE1BQU0sSUFBSSxPQUFPLFNBQVMsQ0FBQztBQUFBLFVBQ3ZELGVBQWM7QUFBQTtBQUFBLE1BQ2hCO0FBQUEsT0FDRjtBQUFBLEtBQ0Y7QUFFSjtBQUVBLElBQU8sdUNBQVE7OztBQzNHZixJQUFBQyxnQkFBK0I7OztBQ0EvQixJQUFBQyxnQkFBK0I7QUFxQzNCLElBQUFDLHNCQUFBO0FBcEJKLElBQU0sbUNBQW1DLENBQUM7QUFBQSxFQUN4QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUNkLE1BQTZDO0FBQzNDLFFBQU0sVUFBVSxVQUFVLFFBQVEsS0FBSztBQUN2QyxRQUFNLGNBQVU7QUFBQSxJQUNkLE1BQU07QUFBQSxNQUNKLEVBQUUsT0FBTyxPQUFPLE1BQU0sS0FBSyxzQkFBc0IsS0FBSyxFQUFFO0FBQUEsTUFDeEQsRUFBRSxPQUFPLE9BQU8sTUFBTSxLQUFLLG9DQUFvQyxLQUFLLEVBQUU7QUFBQSxNQUN0RSxFQUFFLE9BQU8sTUFBTSxNQUFNLEtBQUssbUNBQW1DLElBQUksRUFBRTtBQUFBLElBQ3JFO0FBQUEsSUFDQSxDQUFDO0FBQUEsRUFDSDtBQUVBLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLE9BQU87QUFBQSxNQUNQLFVBQVUsQ0FBQyxjQUFjO0FBQ3ZCLFlBQUksY0FBYyxTQUFTLGNBQWMsUUFBUSxjQUFjLE9BQU87QUFDcEUsbUJBQVMsU0FBUztBQUNsQjtBQUFBLFFBQ0Y7QUFDQSxpQkFBUyxLQUFLO0FBQUEsTUFDaEI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsUUFBTztBQUFBLE1BQ1AsaUJBQWdCO0FBQUEsTUFDaEIsZ0JBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCO0FBQUE7QUFBQSxFQUNGO0FBRUo7QUFFQSxJQUFPLDJDQUFROzs7QUM1RGYsSUFBQUMsZ0JBQW1DO0FBb0o3QixJQUFBQyxzQkFBQTtBQTFITixJQUFNLG1CQUFtQjtBQUd6QixJQUFNLDRCQUE0QixDQUNoQyxNQUNBLE1BQ0EsVUFDQSxtQkFDQSxpQkFDQSxrQkFDc0U7QUFDdEUsUUFBTSxXQUFXLE9BQU8sUUFBUSxFQUFFLEVBQUUsS0FBSztBQUN6QyxRQUFNLGNBQWM7QUFBQSxJQUNsQixNQUFNLE9BQU8sU0FBUyxJQUFJLEtBQUssT0FBTyxJQUFJLEtBQUssTUFBTSxJQUFJLElBQUk7QUFBQSxJQUM3RCxVQUFVLE9BQU8sU0FBUyxRQUFRLEtBQUssV0FBVyxJQUFJLEtBQUssTUFBTSxRQUFRLElBQUk7QUFBQSxJQUM3RSxpQkFBaUIsbUJBQW1CO0FBQUEsSUFDcEMsZUFBZSxpQkFBaUI7QUFBQSxJQUNoQyxXQUFXLFlBQVk7QUFBQSxJQUN2QixRQUFRLFlBQVk7QUFBQSxFQUN0QjtBQUVBLE1BQUksc0JBQXNCLEtBQUssc0JBQXNCLEdBQUc7QUFDdEQsV0FBTztBQUFBLE1BQ0wsR0FBRztBQUFBLE1BQ0gsUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNUO0FBRUEsSUFBTSxtQkFBbUIsQ0FDdkIsVUFDeUI7QUFDekIsVUFBUSxNQUFNLFFBQVEsS0FBSyxJQUFJLFFBQVEsQ0FBQyxHQUNyQyxJQUFJLENBQUMsU0FBUztBQUNiLFVBQU0sU0FBUyxPQUFPLE1BQU0sVUFBVSxFQUFFLEVBQUUsS0FBSztBQUMvQyxRQUFJLENBQUMsT0FBUSxRQUFPO0FBRXBCLFVBQU0sY0FBYyxPQUFPLE1BQU0sZUFBZSxFQUFFLEVBQUUsS0FBSztBQUN6RCxVQUFNLFdBQVcsZUFBZTtBQUNoQyxXQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUDtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUMsRUFDQSxPQUFPLE9BQU87QUFDbkI7QUFHQSxJQUFNLDhCQUE4QixDQUFDO0FBQUEsRUFDbkM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLE9BQU87QUFBQSxFQUNQLGtCQUFrQjtBQUFBLEVBQ2xCLGdCQUFnQjtBQUFBLEVBQ2hCLDBCQUEwQjtBQUFBLEVBQzFCLG9CQUFvQjtBQUFBLEVBQ3BCLFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUNYLFlBQVk7QUFDZCxNQUF3QztBQUN0QyxRQUFNLGVBQWUsWUFBWTtBQUVqQyxRQUFNLGtCQUFjLDJCQUFZLE9BQU8sTUFBYyxXQUF1RDtBQUMxRyxVQUFNLFVBQVUsMEJBQTBCLE1BQU0sR0FBRyxrQkFBa0IsbUJBQW1CLGlCQUFpQixhQUFhO0FBQ3RILFVBQU0sV0FDSixTQUFTLFNBQ0wsTUFBTSxnQ0FBZ0MsU0FBOEM7QUFBQSxNQUNsRix5QkFBeUI7QUFBQSxNQUN6QjtBQUFBLElBQ0YsQ0FBQyxJQUNELE1BQU0sNkJBQTZCLFNBQTBDO0FBQUEsTUFDM0UseUJBQXlCO0FBQUEsTUFDekI7QUFBQSxJQUNGLENBQUM7QUFFUCxRQUFJLFVBQVUsWUFBWSxPQUFPO0FBQy9CLGFBQU8sQ0FBQztBQUFBLElBQ1Y7QUFFQSxXQUFPLGlCQUFpQixVQUFVLEtBQUs7QUFBQSxFQUN6QyxHQUFHLENBQUMsaUJBQWlCLGVBQWUsbUJBQW1CLElBQUksQ0FBQztBQUU1RCxRQUFNLHNCQUFrQiwyQkFBWSxPQUFPLE1BQWMsTUFBYyxXQUFtQixXQUF3QjtBQUNoSCxVQUFNLFVBQVU7QUFBQSxNQUNkO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQ0EsVUFBTSxXQUNKLFNBQVMsU0FDTCxNQUFNLGdDQUFnQyxTQUE4QztBQUFBLE1BQ2xGLHlCQUF5QjtBQUFBLE1BQ3pCO0FBQUEsSUFDRixDQUFDLElBQ0QsTUFBTSw2QkFBNkIsU0FBMEM7QUFBQSxNQUMzRSx5QkFBeUI7QUFBQSxNQUN6QjtBQUFBLElBQ0YsQ0FBQztBQUVQLFFBQUksVUFBVSxZQUFZLE9BQU87QUFDL0IsYUFBTztBQUFBLFFBQ0wsT0FBTyxDQUFDO0FBQUEsUUFDUixPQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFFQSxXQUFPO0FBQUEsTUFDTCxPQUFPLGlCQUFpQixVQUFVLEtBQUs7QUFBQSxNQUN2QyxPQUFPLE9BQU8sVUFBVSxTQUFTLENBQUM7QUFBQSxJQUNwQztBQUFBLEVBQ0YsR0FBRyxDQUFDLGlCQUFpQixlQUFlLG1CQUFtQixJQUFJLENBQUM7QUFFNUQsTUFBSSxDQUFDLDJCQUEyQixjQUFjO0FBQzVDLFdBQ0UsOENBQUMsU0FBSSxXQUFVLGFBQ1o7QUFBQSxrQkFDQyw2Q0FBQyxXQUFNLFdBQVUsNEJBQTJCLE9BQU8sRUFBRSxPQUFPLFlBQVksR0FDckUsaUJBQ0gsSUFDRTtBQUFBLE1BQ0o7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLFdBQVU7QUFBQSxVQUNWO0FBQUEsVUFDQSxVQUFVLENBQUMsVUFBVSxTQUFTLE1BQU0sT0FBTyxLQUFLO0FBQUEsVUFDaEQ7QUFBQSxVQUNBLGNBQVk7QUFBQSxVQUNaO0FBQUEsVUFDQTtBQUFBO0FBQUEsTUFDRjtBQUFBLE9BQ0Y7QUFBQSxFQUVKO0FBRUEsU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0M7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLFVBQVUsT0FBTyxNQUFNLFdBQVc7QUFDaEMsWUFBSTtBQUNGLGlCQUFPLE1BQU0sWUFBWSxNQUFNLE1BQU07QUFBQSxRQUN2QyxTQUFTLE9BQU87QUFDZCxjQUFJLGlCQUFpQixpQkFBaUIsTUFBTSxXQUFXLEtBQUs7QUFDMUQsbUJBQU8sQ0FBQztBQUFBLFVBQ1Y7QUFDQSxnQkFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsTUFDQSxjQUFjLE9BQU8sTUFBTSxNQUFNLFVBQVUsV0FBVztBQUNwRCxZQUFJO0FBQ0YsaUJBQU8sTUFBTSxnQkFBZ0IsTUFBTSxNQUFNLFVBQVUsTUFBTTtBQUFBLFFBQzNELFNBQVMsT0FBTztBQUNkLGNBQUksaUJBQWlCLGlCQUFpQixNQUFNLFdBQVcsS0FBSztBQUMxRCxtQkFBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLE9BQU8sRUFBRTtBQUFBLFVBQy9CO0FBQ0EsZ0JBQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBTztBQUFBLE1BQ1AsaUJBQWlCO0FBQUEsTUFDakIsVUFBVTtBQUFBLE1BQ1Ysa0JBQWdCO0FBQUEsTUFDaEIsWUFBVTtBQUFBLE1BQ1YsZ0JBQWM7QUFBQSxNQUNkO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLGdCQUFlO0FBQUE7QUFBQSxFQUNqQjtBQUVKO0FBRUEsSUFBTyxzQ0FBUTs7O0FGM0VQLElBQUFDLHNCQUFBO0FBL0dSLElBQU0sZUFBZSxDQUFDLFFBQTZCO0FBQ2pELE1BQUksQ0FBQyxJQUFLLFFBQU87QUFDakIsUUFBTSxRQUFRLE9BQU8sR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQzdDLE1BQUksQ0FBQyxzQkFBc0IsS0FBSyxLQUFLLEVBQUcsUUFBTztBQUMvQyxRQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxNQUFNLE1BQU0sR0FBRyxFQUFFLElBQUksTUFBTTtBQUN0RCxTQUFPLElBQUksS0FBSyxNQUFNLFFBQVEsR0FBRyxHQUFHO0FBQ3RDO0FBRUEsSUFBTSxhQUFhLENBQUMsS0FBYSxXQUEyQjtBQUMxRCxRQUFNLE9BQU8sYUFBYSxHQUFHO0FBQzdCLE1BQUksQ0FBQyxLQUFNLFFBQU87QUFDbEIsU0FBTyxLQUNKLG1CQUFtQixRQUFRO0FBQUEsSUFDMUIsS0FBSztBQUFBLElBQ0wsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1IsQ0FBQyxFQUNBLFFBQVEsT0FBTyxFQUFFLEVBQ2pCLFlBQVk7QUFDakI7QUFzQ0EsSUFBTSw2QkFBNkIsQ0FBQztBQUFBLEVBQ2xDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLHVCQUF1QjtBQUFBLEVBQ3ZCLG9CQUFvQjtBQUFBLEVBQ3BCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUF1QztBQUNyQyxRQUFNLG9CQUFnQix1QkFBUSxNQUFNLG9DQUFvQyxHQUFHLENBQUMsQ0FBQztBQUU3RSxRQUFNLHNCQUFrQix1QkFBK0IsTUFBTTtBQUMzRCxXQUFPO0FBQUEsTUFDTCxFQUFFLE9BQU8sSUFBSSxNQUFNLEtBQUssc0JBQXNCLEtBQUssRUFBRTtBQUFBLE1BQ3JELEdBQUc7QUFBQSxJQUNMO0FBQUEsRUFDRixHQUFHLENBQUMsZ0JBQWdCLENBQUM7QUFFckIsTUFBSSxDQUFDLFFBQVMsUUFBTztBQUNyQixRQUFNLFNBQVMsVUFBVSxpQkFBaUIsUUFBUTtBQUNsRCxRQUFNLHdCQUF3QixDQUFDLHdCQUF3QixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdkUsUUFBTSxtQkFBbUIsU0FBUztBQUNsQyxRQUFNLDBCQUEwQix3QkFDM0IsbUJBQW1CLG1CQUFtQixtQkFDdEMsbUJBQW1CLG1CQUFtQjtBQUUzQyxTQUNFLDZDQUFDLFNBQUksV0FBVSwyREFDYix3REFBQyxTQUFJLFdBQVUsZ0RBQ2I7QUFBQSxpREFBQyxtQ0FBd0IsbUJBQXNDLHFCQUEwQztBQUFBLElBRXhHLHVCQUNDO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBLFVBQVU7QUFBQSxRQUNWLGlCQUFpQjtBQUFBLFFBQ2pCLG1CQUFtQjtBQUFBLFFBQ25CLGlCQUFpQjtBQUFBLFFBQ2pCLGdCQUFnQix1QkFBdUIsQ0FBQztBQUFBLFFBQ3hDLGNBQWMsdUJBQXVCLENBQUM7QUFBQTtBQUFBLElBQ3hDLElBQ0Usd0JBQ0Y7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLGtCQUFrQixLQUFLLGdCQUFnQixNQUFNO0FBQUEsUUFDN0MsZ0JBQWdCLEtBQUssY0FBYyxJQUFJO0FBQUEsUUFDdkMsV0FBVyxXQUFXLFVBQVUsTUFBTTtBQUFBLFFBQ3RDLFNBQVMsV0FBVyxRQUFRLE1BQU07QUFBQSxRQUNsQyxXQUFVO0FBQUE7QUFBQSxJQUNaLElBQ0U7QUFBQSxJQUVKLDhDQUFDLFNBQUksV0FBVyxtQ0FBbUMsdUJBQXVCLFVBQ3hFO0FBQUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE9BQU8sS0FBSyw0QkFBNEIsUUFBUTtBQUFBLFVBQ2hELGFBQWEsS0FBSyw0QkFBNEIsUUFBUTtBQUFBLFVBQ3RELE9BQU87QUFBQSxVQUNQLFVBQVU7QUFBQSxVQUNWO0FBQUEsVUFDQSxpQkFBaUI7QUFBQSxVQUNqQixlQUFlO0FBQUEsVUFDZix5QkFBdUI7QUFBQSxVQUN2QixtQkFBbUIsU0FBUyxZQUFZLG9CQUFvQjtBQUFBLFVBQzVELFdBQVc7QUFBQTtBQUFBLE1BQ2I7QUFBQSxNQUVBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxPQUFPLEtBQUssaUNBQWlDLFVBQVU7QUFBQSxVQUN2RCxhQUFhLEtBQUssaUNBQWlDLFVBQVU7QUFBQSxVQUM3RCxPQUFPO0FBQUEsVUFDUCxVQUFVO0FBQUEsVUFDVixXQUFXO0FBQUEsVUFDWCxzQkFBc0I7QUFBQTtBQUFBLE1BQ3hCO0FBQUEsTUFFQyx3QkFDQztBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsT0FBTyxLQUFLLGVBQWUsTUFBTTtBQUFBLFVBQ2pDLGFBQWEsS0FBSyxlQUFlLE1BQU07QUFBQSxVQUN2QyxPQUFPO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBLFVBQVU7QUFBQSxVQUNWLFdBQVc7QUFBQTtBQUFBLE1BQ2IsSUFDRTtBQUFBLE1BRUgsbUJBQ0M7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE9BQU8sS0FBSyx5QkFBeUIsUUFBUTtBQUFBLFVBQzdDLGFBQWEsS0FBSyx5QkFBeUIsUUFBUTtBQUFBLFVBQ25ELFNBQVM7QUFBQSxVQUNULE9BQU87QUFBQSxVQUNQLFVBQVUsQ0FBQyxjQUFjLHFCQUFxQix1Q0FBdUMsV0FBVyxFQUFFLENBQUM7QUFBQSxVQUNuRyxnQkFBZ0I7QUFBQSxVQUNoQixVQUFVO0FBQUEsVUFDVixRQUFPO0FBQUEsVUFDUCxpQkFBZ0I7QUFBQSxVQUNoQixnQkFBZTtBQUFBLFVBQ2YsV0FBVztBQUFBO0FBQUEsTUFDYixJQUNFO0FBQUEsTUFFSjtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsT0FBTyxLQUFLLDJCQUEyQixVQUFVO0FBQUEsVUFDakQsYUFBYSxLQUFLLDJCQUEyQixVQUFVO0FBQUEsVUFDdkQsU0FBUztBQUFBLFVBQ1QsT0FBTztBQUFBLFVBQ1AsVUFBVSxDQUFDLGNBQWM7QUFDdkIsa0JBQU0sU0FBUyxPQUFPLFNBQVM7QUFDL0IsZ0JBQUksY0FBYyxNQUFNLENBQUMsT0FBTyxVQUFVLE1BQU0sR0FBRztBQUNqRCxzQ0FBd0IsRUFBRTtBQUMxQjtBQUFBLFlBQ0Y7QUFDQSxvQ0FBd0IsTUFBOEI7QUFBQSxVQUN4RDtBQUFBLFVBQ0EsZ0JBQWdCO0FBQUEsVUFDaEIsUUFBTztBQUFBLFVBQ1AsaUJBQWdCO0FBQUEsVUFDaEIsZ0JBQWU7QUFBQSxVQUNmLFdBQVc7QUFBQTtBQUFBLE1BQ2I7QUFBQSxNQUVBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxPQUFPLEtBQUssZ0NBQWdDLGlCQUFpQjtBQUFBLFVBQzdELGFBQWEsS0FBSyxnQ0FBZ0MsaUJBQWlCO0FBQUEsVUFDbkUsT0FBTztBQUFBLFVBQ1AsVUFBVTtBQUFBLFVBQ1YsV0FBVztBQUFBO0FBQUEsTUFDYjtBQUFBLE9BQ0Y7QUFBQSxJQUVBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxZQUFZLEtBQUssd0JBQXdCLE9BQU87QUFBQSxRQUNoRCxZQUFZLEtBQUssd0JBQXdCLE9BQU87QUFBQSxRQUNoRDtBQUFBLFFBQ0E7QUFBQTtBQUFBLElBQ0Y7QUFBQSxLQUNGLEdBQ0Y7QUFFSjtBQUVBLElBQU8scUNBQVE7OztBR3ZQZixJQUFBQyxnQkFBMEQ7QUFvQm5ELElBQU0sZ0NBQWdDLENBQUM7QUFBQSxFQUM1QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxvQkFBb0I7QUFBQSxFQUNwQix5QkFBeUI7QUFDM0IsTUFBeUM7QUFDdkMsUUFBTSx1QkFBdUIsc0JBQXNCLEtBQUssc0JBQXNCO0FBRTlFLFFBQU0sMEJBQXNCO0FBQUEsSUFDMUIsQ0FBQyxVQUF3RTtBQUN2RSxVQUFJLHNCQUFzQjtBQUN4QixlQUFPO0FBQUEsTUFDVDtBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxDQUFDLG1CQUFtQixvQkFBb0I7QUFBQSxFQUMxQztBQUVBLFFBQU0sQ0FBQyxVQUFVLFdBQVcsUUFBSSx3QkFBUyxFQUFFO0FBQzNDLFFBQU0sQ0FBQyxRQUFRLFNBQVMsUUFBSSx3QkFBUyxFQUFFO0FBQ3ZDLFFBQU0sQ0FBQyxXQUFXLFlBQVksUUFBSSx3QkFBUyxFQUFFO0FBQzdDLFFBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx3QkFBUyxFQUFFO0FBQ25ELFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixRQUFJLHdCQUFTLG9CQUFvQjtBQUN2RSxRQUFNLENBQUMsaUJBQWlCLGtCQUFrQixRQUFJLHdCQUF3QyxvQkFBb0IsRUFBRSxDQUFDO0FBQzdHLFFBQU0sQ0FBQyxpQkFBaUIsa0JBQWtCLFFBQUksd0JBQW9DLEVBQUU7QUFDcEYsUUFBTSxDQUFDLHFCQUFxQixzQkFBc0IsUUFBSSx3QkFBK0IsS0FBSztBQUMxRixRQUFNLENBQUMsbUJBQW1CLG9CQUFvQixRQUFJLHdCQUE0QyxJQUFJO0FBQ2xHLFFBQU0sQ0FBQyxzQkFBc0IsdUJBQXVCLFFBQUksd0JBQVMsS0FBSztBQUN0RSxRQUFNLENBQUMscUJBQXFCLHNCQUFzQixRQUFJLHdCQUFTLEtBQUs7QUFDcEUsUUFBTSxDQUFDLHVCQUF1Qix3QkFBd0IsUUFBSSx3QkFBUyxDQUFDO0FBQ3BFLFFBQU0sQ0FBQyxnQkFBZ0IsaUJBQWlCLFFBQUksd0JBQW9ELElBQUk7QUFDcEcsUUFBTSxDQUFDLGFBQWEsY0FBYyxRQUFJLHdCQUFTLElBQUk7QUFFbkQsK0JBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxxQkFBc0I7QUFDM0IsdUJBQW1CLGlCQUFrRDtBQUFBLEVBQ3ZFLEdBQUcsQ0FBQyxtQkFBbUIsb0JBQW9CLENBQUM7QUFFNUMsUUFBTSxlQUFlLG9CQUFvQixlQUFlO0FBRXhELFFBQU0scUJBQWlCO0FBQUEsSUFDckIsT0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsTUFDQSxXQUFXLFVBQVUsS0FBSztBQUFBLE1BQzFCLGNBQWMsYUFBYSxLQUFLO0FBQUEsTUFDaEMsZUFBZSxjQUFjLEtBQUs7QUFBQSxNQUNsQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQyxjQUFjLFdBQVcsVUFBVSxpQkFBaUIsZUFBZSxxQkFBcUIsY0FBYyxNQUFNO0FBQUEsRUFDL0c7QUFFQSxRQUFNLHNCQUFrQjtBQUFBLElBQ3RCLENBQUMsVUFBeUM7QUFDeEMsVUFBSSxzQkFBc0I7QUFDeEIsMkJBQW1CLGlCQUFrRDtBQUNyRTtBQUFBLE1BQ0Y7QUFDQSx5QkFBbUIsS0FBSztBQUFBLElBQzFCO0FBQUEsSUFDQSxDQUFDLG1CQUFtQixvQkFBb0I7QUFBQSxFQUMxQztBQUVBLFFBQU0sY0FBVSwyQkFBWSxNQUFNO0FBQ2hDLFFBQUksQ0FBQywyQkFBMkIsQ0FBQyxZQUFZLENBQUMsU0FBUztBQUNyRCw2QkFBdUIsSUFBSTtBQUMzQiw4QkFBd0IsSUFBSTtBQUM1QiwyQkFBcUIsUUFBUTtBQUM3QjtBQUFBLElBQ0Y7QUFFQSxVQUFNLFdBQStDO0FBQUEsTUFDbkQ7QUFBQSxNQUNBO0FBQUEsTUFDQSxXQUFXLFVBQVUsS0FBSztBQUFBLE1BQzFCLGNBQWMsYUFBYSxLQUFLO0FBQUEsTUFDaEMsZUFBZSxjQUFjLEtBQUs7QUFBQSxNQUNsQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUVBLDJCQUF1QixLQUFLO0FBQzVCLHNCQUFrQixRQUFRO0FBQzFCLDRCQUF3QixLQUFLO0FBQzdCLG1CQUFlLEtBQUs7QUFDcEIsbUJBQWUsUUFBUTtBQUFBLEVBQ3pCLEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBR0QsUUFBTSw0QkFBd0I7QUFBQSxJQUM1QixDQUFDLGFBQWlEO0FBQ2hELFlBQU0sYUFBYSxxQ0FBcUMsUUFBUTtBQUNoRSxZQUFNLHlCQUF5QixvQkFBb0IsV0FBVyxZQUFZO0FBQzFFLFlBQU0sd0JBQXdCLE9BQU8sV0FBVyxpQkFBaUIsb0JBQW9CLEVBQUUsS0FBSztBQUM1RixZQUFNLHNCQUFzQix1Q0FBdUMsV0FBVyxVQUFVLFdBQVcsTUFBTTtBQUN6RyxrQkFBWSxXQUFXLFFBQVE7QUFDL0IsZ0JBQVUsV0FBVyxNQUFNO0FBQzNCLG1CQUFhLFdBQVcsU0FBUztBQUNqQyxzQkFBZ0IsV0FBVyxZQUFZO0FBQ3ZDLHVCQUFpQixxQkFBcUI7QUFDdEMseUJBQW1CLHNCQUFzQjtBQUN6Qyx5QkFBbUIsV0FBVyxlQUFlO0FBQzdDLDZCQUF1QixXQUFXLG1CQUFtQjtBQUNyRCwyQkFBcUIsbUJBQW1CO0FBQ3hDLDhCQUF3QixLQUFLO0FBQzdCLDZCQUF1QixLQUFLO0FBQzVCLHdCQUFrQjtBQUFBLFFBQ2hCLEdBQUc7QUFBQSxRQUNILGVBQWU7QUFBQSxRQUNmLGNBQWM7QUFBQSxNQUNoQixDQUFDO0FBQ0QscUJBQWUsS0FBSztBQUFBLElBQ3RCO0FBQUEsSUFDQSxDQUFDLHNCQUFzQixtQkFBbUI7QUFBQSxFQUM1QztBQUVBLFFBQU0sY0FBVSwyQkFBWSxNQUFNO0FBQ2hDLGdCQUFZLEVBQUU7QUFDZCxjQUFVLEVBQUU7QUFDWixpQkFBYSxFQUFFO0FBQ2Ysb0JBQWdCLEVBQUU7QUFDbEIscUJBQWlCLG9CQUFvQjtBQUNyQyx1QkFBbUIsb0JBQW9CLEVBQUUsQ0FBQztBQUMxQyx1QkFBbUIsRUFBRTtBQUNyQiwyQkFBdUIsS0FBSztBQUM1Qix5QkFBcUIsSUFBSTtBQUN6Qiw0QkFBd0IsS0FBSztBQUM3QiwyQkFBdUIsS0FBSztBQUM1Qiw2QkFBeUIsQ0FBQztBQUMxQixzQkFBa0IsSUFBSTtBQUN0QixtQkFBZSxJQUFJO0FBQ25CLG1CQUFlO0FBQUEsRUFDakIsR0FBRyxDQUFDLHNCQUFzQixnQkFBZ0IsbUJBQW1CLENBQUM7QUFFOUQsUUFBTSx3QkFBb0I7QUFBQSxJQUN4QixDQUFDLGNBQXNCLGVBQXVCO0FBQzVDLFlBQU0sZUFBZSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN6QyxrQkFBWSxZQUFZO0FBQ3hCLGdCQUFVLFVBQVU7QUFDcEIsVUFBSSxDQUFDLGNBQWM7QUFDakIsZ0NBQXdCLElBQUk7QUFBQSxNQUM5QjtBQUNBLDJCQUFxQixRQUFRO0FBQzdCLFVBQUkscUJBQXFCO0FBQ3ZCLCtCQUF1QixDQUFDLFlBQVk7QUFBQSxNQUN0QztBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUMsbUJBQW1CO0FBQUEsRUFDdEI7QUFFQSxRQUFNLDRCQUF3QiwyQkFBWSxDQUFDLGNBQXNCLGVBQXVCO0FBQ3RGLGdCQUFZLFlBQVk7QUFDeEIsY0FBVSxVQUFVO0FBQ3BCLHlCQUFxQixRQUFRO0FBQzdCLDJCQUF1QixLQUFLO0FBQzVCLDRCQUF3QixLQUFLO0FBQUEsRUFDL0IsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLDBCQUFzQjtBQUFBLElBQzFCLENBQUMsYUFBeUM7QUFDeEMsVUFBSSxhQUFhLFVBQVU7QUFDekIsWUFBSSxzQkFBc0I7QUFDeEIsa0NBQXdCLEtBQUs7QUFDN0IsaUNBQXVCLEtBQUs7QUFDNUI7QUFBQSxRQUNGO0FBRUEsNkJBQXFCLFFBQVE7QUFDN0IsZ0NBQXdCLElBQUk7QUFDNUIsK0JBQXVCLEtBQUs7QUFDNUIsaUNBQXlCLENBQUMsYUFBYSxXQUFXLENBQUM7QUFDbkQ7QUFBQSxNQUNGO0FBRUEsMkJBQXFCLFFBQVE7QUFDN0IsOEJBQXdCLEtBQUs7QUFDN0IsNkJBQXVCLEtBQUs7QUFFNUIsWUFBTSxRQUFRLFdBQVcsb0JBQUksS0FBSyxDQUFDO0FBQ25DLFlBQU0sV0FBVyxJQUFJLEtBQUssS0FBSztBQUMvQixVQUFJLGFBQWEsVUFBVTtBQUN6QixpQkFBUyxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFBQSxNQUN0QyxXQUFXLGFBQWEsV0FBVztBQUNqQyxpQkFBUyxRQUFRLE1BQU0sUUFBUSxJQUFJLEVBQUU7QUFBQSxNQUN2QyxPQUFPO0FBQ0wsaUJBQVMsUUFBUSxNQUFNLFFBQVEsSUFBSSxFQUFFO0FBQUEsTUFDdkM7QUFFQSxrQkFBWSxVQUFVLFFBQVEsQ0FBQztBQUMvQixnQkFBVSxVQUFVLEtBQUssQ0FBQztBQUFBLElBQzVCO0FBQUEsSUFDQSxDQUFDLG9CQUFvQjtBQUFBLEVBQ3ZCO0FBRUEsUUFBTSx3QkFBb0IsMkJBQVksTUFBTTtBQUMxQyxtQkFBZSxDQUFDLGFBQWE7QUFDM0IsWUFBTSxPQUFPLENBQUM7QUFDZCxVQUFJLENBQUMsTUFBTTtBQUNULGdDQUF3QixLQUFLO0FBQUEsTUFDL0I7QUFDQSxhQUFPO0FBQUEsSUFDVCxDQUFDO0FBQUEsRUFDSCxHQUFHLENBQUMsQ0FBQztBQUVMLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxvQkFBb0I7QUFBQSxFQUN0QjtBQUNGOzs7QUM5UUEsSUFBQUMsZ0JBQXlEO0FBMEJ6RCxJQUFNLGtDQUFrQztBQUV4QyxJQUFNLDRCQUE0QixJQUFJLFNBQW9CO0FBQ3hELE1BQUksT0FBTyxZQUFZLGVBQWUsT0FBTyxRQUFRLFNBQVMsWUFBWTtBQUN4RSxZQUFRLEtBQUssaUNBQWlDLEdBQUcsSUFBSTtBQUFBLEVBQ3ZEO0FBQ0Y7QUFFQSxJQUFNLDRCQUE0QixJQUFJLFNBQW9CO0FBQ3hELE1BQUksT0FBTyxZQUFZLGVBQWUsT0FBTyxRQUFRLFNBQVMsWUFBWTtBQUN4RSxZQUFRLEtBQUssaUNBQWlDLEdBQUcsSUFBSTtBQUFBLEVBQ3ZEO0FBQ0Y7QUFFQSxJQUFNLDZCQUE2QixJQUFJLFNBQW9CO0FBQ3pELE1BQUksT0FBTyxZQUFZLGVBQWUsT0FBTyxRQUFRLFVBQVUsWUFBWTtBQUN6RSxZQUFRLE1BQU0saUNBQWlDLEdBQUcsSUFBSTtBQUFBLEVBQ3hEO0FBQ0Y7QUFFQSxJQUFNLGdDQUFnQyxDQUFDLFVBQTBCO0FBQy9ELE1BQUksT0FBTyxVQUFVLFdBQVksUUFBTztBQUN4QyxRQUFNLFdBQVcsSUFBSSxNQUFNLEtBQUssRUFBRTtBQUNsQyxNQUFJLE9BQU8sYUFBYSxZQUFZLENBQUMsU0FBUyxLQUFLLEVBQUcsUUFBTztBQUM3RCxTQUFPLFNBQ0osTUFBTSxJQUFJLEVBQ1YsTUFBTSxHQUFHLENBQUMsRUFDVixLQUFLLElBQUk7QUFDZDtBQUVBLElBQU0sbUJBQW1CLENBQUMsVUFBa0M7QUFDMUQsUUFBTSxTQUFTLE9BQU8sS0FBSztBQUMzQixTQUFPLE9BQU8sU0FBUyxNQUFNLElBQUksU0FBUztBQUM1QztBQUVBLElBQU0saUJBQWlCLENBQUMsVUFBbUM7QUFDekQsTUFBSSxPQUFPLFVBQVUsVUFBVyxRQUFPO0FBQ3ZDLE1BQUksT0FBTyxVQUFVLFNBQVUsUUFBTyxVQUFVLElBQUksT0FBTyxVQUFVLElBQUksUUFBUTtBQUNqRixNQUFJLE9BQU8sVUFBVSxVQUFVO0FBQzdCLFVBQU0sYUFBYSxNQUFNLEtBQUssRUFBRSxZQUFZO0FBQzVDLFFBQUksZUFBZSxVQUFVLGVBQWUsSUFBSyxRQUFPO0FBQ3hELFFBQUksZUFBZSxXQUFXLGVBQWUsSUFBSyxRQUFPO0FBQUEsRUFDM0Q7QUFDQSxTQUFPO0FBQ1Q7QUFFQSxJQUFNLHlCQUF5QixDQUFDLFVBQWtDO0FBQ2hFLFFBQU0sU0FBUyxPQUFPLEtBQUs7QUFDM0IsU0FBTyxPQUFPLFVBQVUsTUFBTSxLQUFLLFVBQVUsSUFBSSxTQUFTO0FBQzVEO0FBRUEsSUFBTSw0QkFBNEIsQ0FBQyxVQUFnRDtBQUNqRixTQUFPLHVCQUF1QixLQUFLO0FBQ3JDO0FBRUEsSUFBTSxzQkFBc0IsQ0FBQyxTQUFxRDtBQUNoRixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixRQUFRLE9BQU8sTUFBTSxVQUFVLEVBQUUsRUFBRSxLQUFLO0FBQUEsSUFDeEMsYUFBYSxPQUFPLE1BQU0sZUFBZSxFQUFFLEVBQUUsS0FBSztBQUFBLElBQ2xELFFBQVEsdUJBQXVCLE1BQU0sTUFBTTtBQUFBLElBQzNDLGVBQWUsZUFBZSxNQUFNLGFBQWE7QUFBQSxJQUNqRCxjQUFjLE9BQU8sTUFBTSxnQkFBZ0IsRUFBRSxFQUFFLEtBQUs7QUFBQSxJQUNwRCxhQUFhLDRCQUE0QjtBQUFBLE1BQ3ZDLGdCQUFnQixpQkFBaUIsTUFBTSxjQUFjO0FBQUEsTUFDckQscUJBQXFCLGlCQUFpQixNQUFNLG1CQUFtQjtBQUFBLE1BQy9ELGFBQWEsaUJBQWlCLE1BQU0sV0FBVztBQUFBLElBQ2pELENBQUM7QUFBQSxJQUNELFdBQVcsT0FBTyxNQUFNLGFBQWEsRUFBRSxFQUFFLEtBQUs7QUFBQSxJQUM5QyxVQUFVLE9BQU8sTUFBTSxZQUFZLEVBQUUsRUFBRSxLQUFLO0FBQUEsSUFDNUMsV0FBVywwQkFBMEIsTUFBTSxhQUFhLE1BQU0sU0FBUztBQUFBLEVBQ3pFO0FBQ0Y7QUFFQSxJQUFNLDBCQUEwQixDQUFDLFNBQXlEO0FBQ3hGLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFFBQVEsT0FBTyxNQUFNLFVBQVUsRUFBRSxFQUFFLEtBQUs7QUFBQSxJQUN4QyxhQUFhLE9BQU8sTUFBTSxlQUFlLEVBQUUsRUFBRSxLQUFLO0FBQUEsSUFDbEQsZUFBZSxlQUFlLE1BQU0sYUFBYTtBQUFBLElBQ2pELGNBQWMsT0FBTyxNQUFNLGdCQUFnQixFQUFFLEVBQUUsS0FBSztBQUFBLElBQ3BELGFBQWEsNEJBQTRCO0FBQUEsTUFDdkMsZ0JBQWdCLGlCQUFpQixNQUFNLGNBQWM7QUFBQSxNQUNyRCxxQkFBcUIsaUJBQWlCLE1BQU0sbUJBQW1CO0FBQUEsTUFDL0QsYUFBYSxpQkFBaUIsTUFBTSxXQUFXO0FBQUEsSUFDakQsQ0FBQztBQUFBLElBQ0QsV0FBVyxPQUFPLE1BQU0sYUFBYSxFQUFFLEVBQUUsS0FBSztBQUFBLElBQzlDLFVBQVUsT0FBTyxNQUFNLFlBQVksRUFBRSxFQUFFLEtBQUs7QUFBQSxJQUM1QyxXQUFXLDBCQUEwQixNQUFNLGFBQWEsTUFBTSxTQUFTO0FBQUEsRUFDekU7QUFDRjtBQUdPLElBQU0sNEJBQTRCLENBQUMsRUFBRSxXQUFXLFVBQVUsTUFBTSxZQUFZLE1BQXFDO0FBQ3RILFFBQU0sQ0FBQyxPQUFPLFFBQVEsUUFBSSx3QkFBc0MsQ0FBQyxDQUFDO0FBQ2xFLFFBQU0sQ0FBQyxPQUFPLFFBQVEsUUFBSSx3QkFBUyxDQUFDO0FBQ3BDLFFBQU0sQ0FBQyxhQUFhLGNBQWMsUUFBSSx3QkFBUyxDQUFDO0FBQ2hELFFBQU0sQ0FBQyxXQUFXLFlBQVksUUFBSSx3QkFBUyxLQUFLO0FBQ2hELFFBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx3QkFBUyxFQUFFO0FBQ25ELFFBQU0saUNBQTZCLHNCQUErQixJQUFJO0FBQ3RFLFFBQU0sMEJBQXNCLHNCQUFPLEVBQUU7QUFDckMsUUFBTSwwQkFBc0Isc0JBQU8sQ0FBQztBQUVwQyxRQUFNLDBCQUFzQjtBQUFBLElBQzFCLENBQUMsYUFBa0Y7QUFDakYsWUFBTSxZQUFZLE1BQU0sUUFBUSxTQUFTLEtBQUssSUFBSSxTQUFTLFFBQVEsQ0FBQztBQUNwRSxZQUFNLGVBQWUsT0FBTyxTQUFTLEtBQUs7QUFDMUMsWUFBTSxZQUFZLE9BQU8sU0FBUyxZQUFZLEtBQUssZ0JBQWdCLElBQUksZUFBZSxVQUFVO0FBQ2hHLFlBQU0sY0FBYyxPQUFPLFNBQVMsSUFBSTtBQUN4QyxZQUFNLFdBQVcsT0FBTyxTQUFTLFdBQVcsS0FBSyxjQUFjLElBQUksS0FBSyxNQUFNLFdBQVcsSUFBSTtBQUU3RixlQUFTLFNBQVM7QUFDbEIsZUFBUyxTQUFTO0FBQ2xCLHFCQUFlLFFBQVE7QUFDdkIsc0JBQWdCLEVBQUU7QUFDbEIsbUJBQWEsS0FBSztBQUFBLElBQ3BCO0FBQUEsSUFDQSxDQUFDO0FBQUEsRUFDSDtBQUVBLFFBQU0sZUFBVztBQUFBLElBQ2YsT0FBTyxNQUFjLFlBQWdEO0FBQ25FLGdDQUEwQixzQkFBc0I7QUFBQSxRQUM5QztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0YsQ0FBQztBQUNELFVBQUksQ0FBQyxXQUFXO0FBQ2Qsa0NBQTBCLDhCQUE4QjtBQUFBLFVBQ3REO0FBQUEsVUFDQTtBQUFBLFFBQ0YsQ0FBQztBQUNELG9CQUFZO0FBQ1o7QUFBQSxNQUNGO0FBRUEsWUFBTSxVQUNKLFNBQVMsU0FDTCxrQ0FBa0MsU0FBUyxNQUFNLFFBQVEsSUFDekQsOEJBQThCLFNBQVMsTUFBTSxRQUFRO0FBQzNELFlBQU0sMEJBQTBCLE9BQU8sU0FBUyxpQkFBaUIsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZO0FBQ3hGLFlBQU0sYUFBYSxLQUFLLFVBQVUsRUFBRSxNQUFNLFNBQVMsZUFBZSx3QkFBd0IsQ0FBQztBQUUzRixVQUFJLDJCQUEyQixXQUFXLG9CQUFvQixZQUFZLFlBQVk7QUFDcEYsa0NBQTBCLG1DQUFtQztBQUFBLFVBQzNEO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGLENBQUM7QUFDRDtBQUFBLE1BQ0Y7QUFFQSxVQUFJLDJCQUEyQixTQUFTO0FBQ3RDLGtDQUEwQixtQ0FBbUM7QUFBQSxVQUMzRCxvQkFBb0Isb0JBQW9CO0FBQUEsVUFDeEMsb0JBQW9CLG9CQUFvQjtBQUFBLFVBQ3hDLE9BQU8sOEJBQThCLGlDQUFpQztBQUFBLFFBQ3hFLENBQUM7QUFDRCxtQ0FBMkIsUUFBUSxNQUFNO0FBQUEsTUFDM0M7QUFFQSxZQUFNLGFBQWEsSUFBSSxnQkFBZ0I7QUFDdkMsaUNBQTJCLFVBQVU7QUFDckMsMEJBQW9CLFVBQVU7QUFDOUIsWUFBTSxhQUFhLG9CQUFvQixVQUFVO0FBQ2pELDBCQUFvQixVQUFVO0FBQzlCLFlBQU0sb0JBQW9CLE1BQU07QUFDOUIsa0NBQTBCLCtCQUErQjtBQUFBLFVBQ3ZEO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQSxlQUFlLFdBQVcsT0FBTztBQUFBLFVBQ2pDLGNBQ0UsWUFBWSxXQUFXLFNBQ2pCLFdBQVcsT0FBOEMsVUFBVSxPQUNyRTtBQUFBLFFBQ1IsQ0FBQztBQUFBLE1BQ0g7QUFDQSxpQkFBVyxPQUFPLGlCQUFpQixTQUFTLG1CQUFtQixFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTdFLG1CQUFhLElBQUk7QUFDakIsc0JBQWdCLEVBQUU7QUFDbEIsZ0NBQTBCLHdCQUF3QjtBQUFBLFFBQ2hEO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGLENBQUM7QUFFRCxVQUFJO0FBQ0YsY0FBTSxXQUFXLE1BQU07QUFBQSxVQUNyQixNQUNFLFNBQVMsU0FDTCxnQ0FBZ0MsU0FBUztBQUFBLFlBQ3ZDLHlCQUF5QjtBQUFBLFlBQ3pCLFFBQVEsV0FBVztBQUFBLFlBQ25CLGtCQUFrQiwyQkFBMkI7QUFBQSxVQUMvQyxDQUFDLElBQ0QsNkJBQTZCLFNBQVM7QUFBQSxZQUNwQyx5QkFBeUI7QUFBQSxZQUN6QixRQUFRLFdBQVc7QUFBQSxZQUNuQixrQkFBa0IsMkJBQTJCO0FBQUEsVUFDL0MsQ0FBQztBQUFBLFVBQ1A7QUFBQSxZQUNFLFFBQVEsV0FBVztBQUFBLFVBQ3JCO0FBQUEsUUFDRjtBQUNBLGtDQUEwQiwyQkFBMkI7QUFBQSxVQUNuRDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQSxTQUFTLFVBQVU7QUFBQSxVQUNuQixPQUFPLFVBQVU7QUFBQSxVQUNqQixPQUFPLE1BQU0sUUFBUSxVQUFVLEtBQUssSUFBSSxTQUFTLE1BQU0sU0FBUztBQUFBLFFBQ2xFLENBQUM7QUFDRCxZQUFJLGVBQWUsb0JBQW9CLFFBQVM7QUFFaEQsWUFBSSxVQUFVLFlBQVksT0FBTztBQUMvQixvQ0FBMEIsNkJBQTZCO0FBQUEsWUFDckQ7QUFBQSxZQUNBO0FBQUEsWUFDQSxTQUFTLFNBQVM7QUFBQSxVQUNwQixDQUFDO0FBQ0QsMEJBQWdCLFNBQVMsV0FBVyxLQUFLLHFCQUFxQix5QkFBeUIsQ0FBQztBQUN4RixtQkFBUyxDQUFDLENBQUM7QUFDWCxtQkFBUyxDQUFDO0FBQ1YseUJBQWUsSUFBSTtBQUNuQjtBQUFBLFFBQ0Y7QUFFQSxjQUFNLGNBQWMsTUFBTSxRQUFRLFVBQVUsS0FBSyxJQUFJLFNBQVMsUUFBUSxDQUFDO0FBQ3ZFLGNBQU0sY0FBYyxZQUFZO0FBQUEsVUFBSSxDQUFDLFNBQ25DLFNBQVMsU0FDTCx3QkFBd0IsSUFBMEMsSUFDbEUsb0JBQW9CLElBQTBDO0FBQUEsUUFDcEU7QUFDQSxjQUFNLGdCQUFnQixPQUFPLFVBQVUsU0FBUyxZQUFZLFVBQVUsQ0FBQztBQUV2RSxpQkFBUyxXQUFXO0FBQ3BCLGlCQUFTLGFBQWE7QUFDdEIsdUJBQWUsSUFBSTtBQUFBLE1BQ3JCLFNBQVMsT0FBTztBQUNkLFlBQUksZUFBZSxvQkFBb0IsUUFBUztBQUNoRCxZQUFJLHdCQUF3QixPQUFPLFdBQVcsTUFBTSxHQUFHO0FBQ3JELG9DQUEwQixvQkFBb0I7QUFBQSxZQUM1QztBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQSxTQUFTLGlCQUFpQixRQUFRLE1BQU0sVUFBVTtBQUFBLFVBQ3BELENBQUM7QUFDRDtBQUFBLFFBQ0Y7QUFFQSxZQUFJLGlCQUFpQixpQkFBaUIsTUFBTSxXQUFXLEtBQUs7QUFDMUQsb0NBQTBCLHNCQUFzQjtBQUFBLFlBQzlDO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGLENBQUM7QUFDRCxzQkFBWTtBQUNaO0FBQUEsUUFDRjtBQUVBLG1DQUEyQixtQkFBbUI7QUFBQSxVQUM1QztBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQSxTQUFTLGlCQUFpQixRQUFRLE1BQU0sVUFBVTtBQUFBLFFBQ3BELENBQUM7QUFDRCxjQUFNLFVBQVUsaUJBQWlCLFFBQVEsTUFBTSxVQUFVLEtBQUsscUJBQXFCLHlCQUF5QjtBQUM1Ryx3QkFBZ0IsT0FBTztBQUN2QixpQkFBUyxDQUFDLENBQUM7QUFDWCxpQkFBUyxDQUFDO0FBQ1YsdUJBQWUsSUFBSTtBQUFBLE1BQ3JCLFVBQUU7QUFDQSxtQkFBVyxPQUFPLG9CQUFvQixTQUFTLGlCQUFpQjtBQUNoRSxZQUFJLGVBQWUsb0JBQW9CLFNBQVM7QUFDOUMsb0NBQTBCLHFCQUFxQjtBQUFBLFlBQzdDO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGLENBQUM7QUFDRCx1QkFBYSxLQUFLO0FBQ2xCLHFDQUEyQixVQUFVO0FBQ3JDLDhCQUFvQixVQUFVO0FBQUEsUUFDaEM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQyxXQUFXLE1BQU0sYUFBYSxRQUFRO0FBQUEsRUFDekM7QUFFQSxRQUFNLGdCQUFZLDJCQUFZLENBQUMsU0FBUyxjQUFjO0FBQ3BELFFBQUksMkJBQTJCLFNBQVM7QUFDdEMsZ0NBQTBCLGtDQUFrQztBQUFBLFFBQzFEO0FBQUEsUUFDQSxrQkFBa0Isb0JBQW9CO0FBQUEsUUFDdEMsa0JBQWtCLG9CQUFvQjtBQUFBLFFBQ3RDLE9BQU8sOEJBQThCLGFBQWEsTUFBTSxFQUFFO0FBQUEsTUFDNUQsQ0FBQztBQUNELGlDQUEyQixRQUFRLE1BQU07QUFDekMsaUNBQTJCLFVBQVU7QUFDckMsMEJBQW9CLFVBQVU7QUFBQSxJQUNoQztBQUNBLDhCQUEwQix5QkFBeUI7QUFBQSxNQUNqRDtBQUFBLElBQ0YsQ0FBQztBQUNELGFBQVMsQ0FBQyxDQUFDO0FBQ1gsYUFBUyxDQUFDO0FBQ1YsbUJBQWUsQ0FBQztBQUNoQixvQkFBZ0IsRUFBRTtBQUFBLEVBQ3BCLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxxQkFBaUIsMkJBQVksTUFBTTtBQUFBLEVBRXpDLEdBQUcsQ0FBQyxDQUFDO0FBRUwsK0JBQVUsTUFBTTtBQUNkLFdBQU8sTUFBTTtBQUNYLFVBQUksMkJBQTJCLFNBQVM7QUFDdEMsa0NBQTBCLGdDQUFnQztBQUFBLFVBQ3hELGtCQUFrQixvQkFBb0I7QUFBQSxVQUN0QyxrQkFBa0Isb0JBQW9CO0FBQUEsVUFDdEMsT0FBTyw4QkFBOEIsOEJBQThCO0FBQUEsUUFDckUsQ0FBQztBQUNELG1DQUEyQixRQUFRLE1BQU07QUFDekMsbUNBQTJCLFVBQVU7QUFDckMsNEJBQW9CLFVBQVU7QUFBQSxNQUNoQztBQUFBLElBQ0Y7QUFBQSxFQUNGLEdBQUcsQ0FBQyxDQUFDO0FBRUwsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjs7O0FDMVdBLElBQU0sOENBQThDO0FBQ3BELElBQU0sMENBQTBDLEtBQUssS0FBSyxLQUFLO0FBZS9ELElBQU0sZUFBZSxNQUFjO0FBQ2pDLFNBQU8sR0FBRywyQ0FBMkMsSUFBSSxxQkFBcUIsQ0FBQztBQUNqRjtBQUVBLElBQU0sa0JBQWtCLENBQUMsVUFBMkI7QUFDbEQsU0FBTyxPQUFPLFNBQVMsRUFBRSxFQUFFLEtBQUs7QUFDbEM7QUFFQSxJQUFNLHlCQUF5QixDQUFDLFVBQW1DO0FBQ2pFLE1BQUksVUFBVSxRQUFRLFVBQVUsTUFBTyxRQUFPO0FBQzlDLE1BQUksVUFBVSxLQUFLLFVBQVUsT0FBTyxVQUFVLE9BQVEsUUFBTztBQUM3RCxNQUFJLFVBQVUsS0FBSyxVQUFVLE9BQU8sVUFBVSxRQUFTLFFBQU87QUFDOUQsU0FBTztBQUNUO0FBRUEsSUFBTSwwQkFBMEIsQ0FBQyxVQUFrQztBQUNqRSxRQUFNLFNBQVMsT0FBTyxLQUFLO0FBQzNCLFNBQU8sT0FBTyxTQUFTLE1BQU0sSUFBSSxTQUFTO0FBQzVDO0FBRUEsSUFBTSwyQkFBMkIsQ0FBQyxVQUF1RDtBQUN2RixTQUFPLHVCQUF1QixLQUFLO0FBQ3JDO0FBRUEsSUFBTSx5QkFBeUIsQ0FBQyxVQUFtRDtBQUNqRixTQUFPLFVBQVUsYUFBYSxhQUFhO0FBQzdDO0FBRUEsSUFBTSwyQkFBMkIsQ0FBQyxVQUE0QztBQUM1RSxNQUFJLENBQUMsTUFBTSxRQUFRLEtBQUssRUFBRyxRQUFPLENBQUM7QUFFbkMsUUFBTSxRQUFRLG9CQUFJLElBQW1DO0FBQ3JELGFBQVcsU0FBUyxPQUFPO0FBQ3pCLFVBQU0sT0FBUSxTQUFTLENBQUM7QUFDeEIsVUFBTSxTQUFTLGdCQUFnQixLQUFLLE1BQU07QUFDMUMsUUFBSSxDQUFDLE9BQVE7QUFFYixVQUFNLElBQUksUUFBUTtBQUFBLE1BQ2hCLE1BQU07QUFBQSxNQUNOO0FBQUEsTUFDQSxhQUFhLE9BQU8sS0FBSyxlQUFlLEVBQUUsRUFBRSxLQUFLO0FBQUEsTUFDakQsZUFBZSx1QkFBdUIsS0FBSyxhQUFhO0FBQUEsTUFDeEQsY0FBYyxPQUFPLEtBQUssZ0JBQWdCLEVBQUUsRUFBRSxLQUFLO0FBQUEsTUFDbkQsYUFBYSx3QkFBd0IsS0FBSyxXQUFXO0FBQUEsTUFDckQsV0FBVyxPQUFPLEtBQUssYUFBYSxFQUFFLEVBQUUsS0FBSztBQUFBLE1BQzdDLFVBQVUsT0FBTyxLQUFLLFlBQVksRUFBRSxFQUFFLEtBQUs7QUFBQSxNQUMzQyxXQUFXLHlCQUF5QixLQUFLLFNBQVM7QUFBQSxJQUNwRCxDQUFDO0FBQUEsRUFDSDtBQUVBLFNBQU8sTUFBTSxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQ2xDO0FBRUEsSUFBTSx1QkFBdUIsQ0FBQyxVQUE2QjtBQUN6RCxNQUFJLENBQUMsTUFBTSxRQUFRLEtBQUssRUFBRyxRQUFPLENBQUM7QUFFbkMsUUFBTSxNQUFNLG9CQUFJLElBQVk7QUFDNUIsYUFBVyxTQUFTLE9BQU87QUFDekIsVUFBTSxTQUFTLGdCQUFnQixLQUFLO0FBQ3BDLFFBQUksQ0FBQyxPQUFRO0FBQ2IsUUFBSSxJQUFJLE1BQU07QUFBQSxFQUNoQjtBQUVBLFNBQU8sTUFBTSxLQUFLLEdBQUc7QUFDdkI7QUFFQSxJQUFNLDhCQUE4QixDQUFDLE9BQWdCLFdBQVcsTUFBYztBQUM1RSxRQUFNLFNBQVMsT0FBTyxLQUFLO0FBQzNCLFNBQU8sT0FBTyxTQUFTLE1BQU0sS0FBSyxVQUFVLElBQUksS0FBSyxNQUFNLE1BQU0sSUFBSTtBQUN2RTtBQUdPLElBQU0sd0NBQXdDLENBQUMsVUFBd0Q7QUFDNUcsTUFBSSxDQUFDLFNBQVMsT0FBTyxVQUFVLFNBQVUsUUFBTztBQUVoRCxRQUFNLFVBQVU7QUFDaEIsUUFBTSxVQUFVLE9BQU8sUUFBUSxXQUFXLEVBQUUsRUFBRSxLQUFLO0FBQ25ELE1BQUksQ0FBQyxRQUFTLFFBQU87QUFFckIsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBLE1BQU0sS0FBSyxJQUFJLEdBQUcsNEJBQTRCLFFBQVEsTUFBTSxDQUFDLENBQUM7QUFBQSxJQUM5RCxTQUFTLDRCQUE0QixRQUFRLE9BQU87QUFBQSxJQUNwRCxhQUFhLGdCQUFnQixRQUFRLFdBQVc7QUFBQSxJQUNoRCxTQUFTLHFDQUFxQyxRQUFRLE9BQU87QUFBQSxJQUM3RCxlQUFlLHVCQUF1QixRQUFRLGFBQWE7QUFBQSxJQUMzRCxpQkFBaUIseUJBQXlCLFFBQVEsZUFBZTtBQUFBLElBQ2pFLGFBQWEscUJBQXFCLFFBQVEsV0FBVztBQUFBLElBQ3JELDBCQUEwQixRQUFRLDJCQUM5QixxQ0FBcUMsUUFBUSx3QkFBd0IsSUFDckU7QUFBQSxJQUNKLHdCQUF3Qiw0QkFBNEIsUUFBUSxzQkFBc0I7QUFBQSxFQUNwRjtBQUNGO0FBR08sSUFBTSxtQ0FBbUMsQ0FBQyxZQUEyRDtBQUMxRyxRQUFNLFNBQVM7QUFBQSxJQUNiLHlCQUF1RCxhQUFhLENBQUM7QUFBQSxFQUN2RTtBQUNBLE1BQUksQ0FBQyxPQUFRLFFBQU87QUFFcEIsUUFBTSxjQUFjLE9BQU8sV0FBVyxFQUFFLEVBQUUsS0FBSztBQUMvQyxNQUFJLENBQUMsWUFBYSxRQUFPO0FBQ3pCLFNBQU8sT0FBTyxRQUFRLFlBQVksTUFBTSxZQUFZLFlBQVksSUFBSSxTQUFTO0FBQy9FO0FBR08sSUFBTSxtQ0FBbUMsQ0FDOUMsVUFDd0M7QUFDeEMsUUFBTSxhQUFhLHNDQUFzQyxLQUFLO0FBQzlELE1BQUksQ0FBQyxZQUFZO0FBQ2Ysc0NBQWtDO0FBQ2xDLFdBQU87QUFBQSxFQUNUO0FBRUEsMkJBQXlCLGFBQWEsR0FBRyxZQUFZLHVDQUF1QztBQUM1RixTQUFPO0FBQ1Q7QUFHTyxJQUFNLG9DQUFvQyxNQUFZO0FBQzNELCtCQUE2QixhQUFhLENBQUM7QUFDN0M7OztBQ3RKQSxJQUFBQyxnQkFBK0M7QUFlL0MsSUFBTUMsbUJBQWtCLENBQUMsVUFBMkIsT0FBTyxTQUFTLEVBQUUsRUFBRSxLQUFLO0FBRTdFLElBQU1DLDBCQUF5QixDQUFDLFVBQW1EO0FBQ2pGLFNBQU8sVUFBVSxhQUFhLGFBQWE7QUFDN0M7QUFFQSxJQUFNQyx3QkFBdUIsQ0FBQyxVQUE2QjtBQUN6RCxNQUFJLENBQUMsTUFBTSxRQUFRLEtBQUssRUFBRyxRQUFPLENBQUM7QUFFbkMsUUFBTSxNQUFNLG9CQUFJLElBQVk7QUFDNUIsYUFBVyxTQUFTLE9BQU87QUFDekIsVUFBTSxTQUFTRixpQkFBZ0IsS0FBSztBQUNwQyxRQUFJLENBQUMsT0FBUTtBQUNiLFFBQUksSUFBSSxNQUFNO0FBQUEsRUFDaEI7QUFFQSxTQUFPLE1BQU0sS0FBSyxHQUFHO0FBQ3ZCO0FBRUEsSUFBTSxnQkFBZ0IsQ0FBQyxVQUEwRTtBQUMvRixRQUFNLE9BQThDLENBQUM7QUFDckQsYUFBVyxRQUFRLE9BQU87QUFDeEIsVUFBTSxTQUFTQSxpQkFBZ0IsS0FBSyxNQUFNO0FBQzFDLFFBQUksQ0FBQyxPQUFRO0FBQ2IsU0FBSyxNQUFNLElBQUk7QUFBQSxFQUNqQjtBQUNBLFNBQU87QUFDVDtBQUdPLElBQU0sZ0NBQWdDLE1BQU07QUFDakQsUUFBTSxDQUFDLGVBQWUsZ0JBQWdCLFFBQUksd0JBQXlDLFVBQVU7QUFDN0YsUUFBTSxDQUFDLHFCQUFxQixzQkFBc0IsUUFBSSx3QkFBZ0QsQ0FBQyxDQUFDO0FBQ3hHLFFBQU0sQ0FBQyxhQUFhLGNBQWMsUUFBSSx3QkFBbUIsQ0FBQyxDQUFDO0FBQzNELFFBQU0sQ0FBQyxrQkFBa0IsbUJBQW1CLFFBQUksd0JBQW9ELElBQUk7QUFDeEcsUUFBTSxDQUFDLG9CQUFvQixxQkFBcUIsUUFBSSx3QkFBUyxDQUFDO0FBRTlELFFBQU0sc0JBQWtCLHVCQUFRLE1BQU0sT0FBTyxPQUFPLG1CQUFtQixHQUFHLENBQUMsbUJBQW1CLENBQUM7QUFDL0YsUUFBTSxvQkFBZ0IsdUJBQVEsTUFBTSxJQUFJLElBQUksV0FBVyxHQUFHLENBQUMsV0FBVyxDQUFDO0FBQ3ZFLFFBQU0sNEJBQTRCLGtCQUFrQixjQUFjLENBQUMsQ0FBQztBQUVwRSxRQUFNLHFCQUFpQiwyQkFBWSxNQUFNO0FBQ3ZDLHFCQUFpQixVQUFVO0FBQzNCLDJCQUF1QixDQUFDLENBQUM7QUFDekIsbUJBQWUsQ0FBQyxDQUFDO0FBQ2pCLHdCQUFvQixJQUFJO0FBQ3hCLDBCQUFzQixDQUFDO0FBQUEsRUFDekIsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLHVCQUFtQiwyQkFBWSxDQUFDLFVBQThEO0FBQ2xHLFFBQUksQ0FBQyxPQUFPO0FBQ1YscUJBQWU7QUFDZjtBQUFBLElBQ0Y7QUFFQSxVQUFNLGlCQUFpQkMsd0JBQXVCLE1BQU0sYUFBYTtBQUNqRSxVQUFNLDRCQUE0QixNQUFNLFFBQVEsTUFBTSxlQUFlLElBQUksTUFBTSxrQkFBa0IsQ0FBQztBQUNsRyxVQUFNLHFCQUFxQixNQUFNLG9CQUFvQjtBQUNyRCxVQUFNLHdCQUF3QkMsc0JBQXFCLE1BQU0sV0FBVztBQUNwRSxVQUFNLDBCQUEwQixPQUFPLFNBQVMsT0FBTyxNQUFNLGtCQUFrQixDQUFDLElBQzVFLEtBQUssSUFBSSxHQUFHLEtBQUssTUFBTSxPQUFPLE1BQU0sa0JBQWtCLENBQUMsQ0FBQyxJQUN4RDtBQUVKLHFCQUFpQixtQkFBbUIsY0FBYyxxQkFBcUIsYUFBYSxVQUFVO0FBQzlGLDJCQUF1QixjQUFjLHlCQUF5QixDQUFDO0FBQy9ELG1CQUFlLG1CQUFtQixhQUFhLHdCQUF3QixDQUFDLENBQUM7QUFDekUsd0JBQW9CLG1CQUFtQixhQUFhLHFCQUFxQixJQUFJO0FBQzdFLDBCQUFzQixtQkFBbUIsYUFBYSwwQkFBMEIsQ0FBQztBQUFBLEVBQ25GLEdBQUcsQ0FBQyxjQUFjLENBQUM7QUFFbkIsUUFBTSx5QkFBcUIsMkJBQVksQ0FBQyxVQUE4QyxlQUF1QjtBQUMzRyxxQkFBaUIsVUFBVTtBQUMzQiwyQkFBdUIsQ0FBQyxDQUFDO0FBQ3pCLG1CQUFlLENBQUMsQ0FBQztBQUNqQix3QkFBb0IsUUFBUTtBQUM1QiwwQkFBc0IsT0FBTyxTQUFTLFVBQVUsSUFBSSxLQUFLLElBQUksR0FBRyxLQUFLLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FBQztBQUFBLEVBQzdGLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxpQkFBYTtBQUFBLElBQ2pCLENBQUMsV0FBbUI7QUFDbEIsWUFBTSxhQUFhRixpQkFBZ0IsTUFBTTtBQUN6QyxVQUFJLENBQUMsV0FBWSxRQUFPO0FBRXhCLFVBQUksMkJBQTJCO0FBQzdCLGVBQU8sQ0FBQyxjQUFjLElBQUksVUFBVTtBQUFBLE1BQ3RDO0FBRUEsYUFBTyxDQUFDLENBQUMsb0JBQW9CLFVBQVU7QUFBQSxJQUN6QztBQUFBLElBQ0EsQ0FBQyxlQUFlLDJCQUEyQixtQkFBbUI7QUFBQSxFQUNoRTtBQUVBLFFBQU0sbUJBQWU7QUFBQSxJQUNuQixDQUFDLFdBQWtDO0FBQ2pDLFlBQU0sU0FBU0EsaUJBQWdCLE9BQU8sTUFBTTtBQUM1QyxVQUFJLENBQUMsT0FBUTtBQUViLFVBQUksMkJBQTJCO0FBQzdCLHVCQUFlLENBQUMsYUFBYTtBQUMzQixnQkFBTSxPQUFPLElBQUksSUFBSSxRQUFRO0FBQzdCLGNBQUksS0FBSyxJQUFJLE1BQU0sR0FBRztBQUNwQixpQkFBSyxPQUFPLE1BQU07QUFBQSxVQUNwQixPQUFPO0FBQ0wsaUJBQUssSUFBSSxNQUFNO0FBQUEsVUFDakI7QUFDQSxpQkFBTyxNQUFNLEtBQUssSUFBSTtBQUFBLFFBQ3hCLENBQUM7QUFDRDtBQUFBLE1BQ0Y7QUFFQSw2QkFBdUIsQ0FBQyxhQUFhO0FBQ25DLGNBQU0sT0FBTyxFQUFFLEdBQUcsU0FBUztBQUMzQixZQUFJLEtBQUssTUFBTSxHQUFHO0FBQ2hCLGlCQUFPLEtBQUssTUFBTTtBQUNsQixpQkFBTztBQUFBLFFBQ1Q7QUFDQSxhQUFLLE1BQU0sSUFBSTtBQUNmLGVBQU87QUFBQSxNQUNULENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxDQUFDLHlCQUF5QjtBQUFBLEVBQzVCO0FBRUEsUUFBTSw0QkFBd0IsMkJBQVksQ0FBQyxVQUFtQztBQUM1RSxRQUFJLGtCQUFrQixjQUFjLE1BQU0sU0FBUyxFQUFHO0FBRXRELDJCQUF1QixDQUFDLGFBQWE7QUFDbkMsVUFBSSxVQUFVO0FBQ2QsWUFBTSxPQUFPLEVBQUUsR0FBRyxTQUFTO0FBQzNCLGlCQUFXLFFBQVEsT0FBTztBQUN4QixjQUFNLFNBQVNBLGlCQUFnQixLQUFLLE1BQU07QUFDMUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLE1BQU0sRUFBRztBQUM5QixhQUFLLE1BQU0sSUFBSTtBQUNmLGtCQUFVO0FBQUEsTUFDWjtBQUNBLGFBQU8sVUFBVSxPQUFPO0FBQUEsSUFDMUIsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLGFBQWEsQ0FBQztBQUVsQixRQUFNLDJCQUF1QjtBQUFBLElBQzNCLENBQUMscUJBQXFCLE1BQWM7QUFDbEMsVUFBSSxDQUFDLDJCQUEyQjtBQUM5QixlQUFPLGdCQUFnQjtBQUFBLE1BQ3pCO0FBRUEsWUFBTSxZQUFZLHFCQUFxQixJQUFJLHFCQUFxQixLQUFLLElBQUksR0FBRyxLQUFLLE1BQU0sa0JBQWtCLENBQUM7QUFDMUcsYUFBTyxLQUFLLElBQUksR0FBRyxZQUFZLFlBQVksTUFBTTtBQUFBLElBQ25EO0FBQUEsSUFDQSxDQUFDLFlBQVksUUFBUSxvQkFBb0IsMkJBQTJCLGdCQUFnQixNQUFNO0FBQUEsRUFDNUY7QUFFQSxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjs7O0FDckxBLElBQUFHLGdCQUFtRDtBQXVCbkQsSUFBTSx1QkFBdUIsQ0FDM0IsT0FDQSxXQUM2QztBQUM3QyxVQUFRLE9BQU8sTUFBTTtBQUFBLElBQ25CLEtBQUs7QUFDSCxhQUFPLE9BQU87QUFBQSxJQUNoQixLQUFLO0FBQ0gsYUFBTztBQUFBLElBQ1QsS0FBSztBQUNILGFBQU8sUUFBUSxFQUFFLEdBQUcsT0FBTywyQkFBMkIsTUFBTSxJQUFJO0FBQUEsSUFDbEU7QUFDRSxhQUFPO0FBQUEsRUFDWDtBQUNGO0FBWUEsSUFBTSx1Q0FBdUM7QUFFN0MsSUFBTSxnQ0FBZ0MsSUFBSSxTQUFvQjtBQUM1RCxNQUFJLE9BQU8sWUFBWSxlQUFlLE9BQU8sUUFBUSxTQUFTLFlBQVk7QUFDeEUsWUFBUSxLQUFLLHNDQUFzQyxHQUFHLElBQUk7QUFBQSxFQUM1RDtBQUNGO0FBRUEsSUFBTSxnQ0FBZ0MsSUFBSSxTQUFvQjtBQUM1RCxNQUFJLE9BQU8sWUFBWSxlQUFlLE9BQU8sUUFBUSxTQUFTLFlBQVk7QUFDeEUsWUFBUSxLQUFLLHNDQUFzQyxHQUFHLElBQUk7QUFBQSxFQUM1RDtBQUNGO0FBR08sSUFBTSxnQ0FBZ0MsQ0FBQztBQUFBLEVBQzVDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBeUM7QUFDdkMsUUFBTSxDQUFDLHNCQUFzQixRQUFRLFFBQUksMEJBQVcsc0JBQXNCLElBQUk7QUFFOUUsUUFBTSwyQkFBdUI7QUFBQSxJQUMzQixDQUNFLE1BQ0EsVUFDQSxVQUlJLENBQUMsTUFDRjtBQUNILG9DQUE4QixpQ0FBaUM7QUFBQSxRQUM3RDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRixDQUFDO0FBQ0QsZUFBUztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQSxZQUFZLFFBQVEsZUFBZTtBQUFBLFVBQ25DLGlCQUFpQixRQUFRLG9CQUFvQjtBQUFBLFVBQzdDLDJCQUEyQixRQUFRLDhCQUE4QjtBQUFBLFFBQ25FO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsQ0FBQztBQUFBLEVBQ0g7QUFFQSwrQkFBVSxNQUFNO0FBQ2QsUUFBSSxDQUFDLHFCQUFzQjtBQUUzQixRQUFJLHFCQUFxQiwyQkFBMkI7QUFDbEQsVUFBSSxDQUFDLFlBQVk7QUFDZixzQ0FBOEIsMENBQTBDO0FBQUEsVUFDdEUsTUFBTSxxQkFBcUI7QUFBQSxRQUM3QixDQUFDO0FBQ0QsaUJBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RDO0FBQUEsTUFDRjtBQUVBLFVBQUksQ0FBQyxzQkFBc0Isb0JBQW9CO0FBQzdDLHNDQUE4QixnREFBZ0Q7QUFBQSxVQUM1RSxNQUFNLHFCQUFxQjtBQUFBLFVBQzNCO0FBQUEsVUFDQTtBQUFBLFFBQ0YsQ0FBQztBQUNEO0FBQUEsTUFDRjtBQUVBLFVBQUksaUJBQWlCO0FBQ25CLHNDQUE4QiwwQ0FBMEM7QUFBQSxVQUN0RSxNQUFNLHFCQUFxQjtBQUFBLFFBQzdCLENBQUM7QUFDRCxpQkFBUyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzFCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxVQUFNLEVBQUUsTUFBTSxVQUFVLFlBQVksZ0JBQWdCLElBQUk7QUFDeEQsYUFBUyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzFCLGtDQUE4QixnQ0FBZ0M7QUFBQSxNQUM1RDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUVELFFBQUksWUFBWTtBQUNkLHFCQUFlO0FBQUEsSUFDakI7QUFFQSxRQUFJLGlCQUFpQjtBQUNuQixnQkFBVSxrQ0FBa0M7QUFBQSxJQUM5QztBQUVBLFNBQUssU0FBUyxNQUFNLFFBQVE7QUFBQSxFQUM5QixHQUFHO0FBQUEsSUFDRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxTQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFDRjs7O0FWR0UsSUFBQUMsc0JBQUE7QUE3R0YsSUFBTSxZQUFZO0FBRWxCLElBQU0sa0JBQWtCLENBQUMsVUFBMkIsT0FBTyxTQUFTLEVBQUUsRUFBRSxLQUFLO0FBRTdFLElBQU0sYUFBYSxDQUFDLE1BQWMsVUFBMkI7QUFDM0QsUUFBTSxpQkFBaUIsZ0JBQWdCLElBQUksRUFBRSxZQUFZO0FBQ3pELFFBQU0sa0JBQWtCLGdCQUFnQixLQUFLLEVBQUUsWUFBWTtBQUMzRCxTQUFPLENBQUMsQ0FBQyxrQkFBa0IsbUJBQW1CO0FBQ2hEO0FBRUEsSUFBTSwwQkFBMEIsQ0FDOUIsT0FDQSxpQkFDQSxrQkFBa0IsT0FDSTtBQUN0QixRQUFNLG9CQUFvQixnQkFBZ0IsZUFBZTtBQUN6RCxRQUFNLHdCQUF3QixnQkFBZ0IsZUFBZTtBQUM3RCxNQUFJLENBQUMsa0JBQW1CLFFBQU87QUFDL0IsTUFBSSxNQUFNLEtBQUssQ0FBQyxVQUFVLFdBQVcsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEdBQUc7QUFDeEUsV0FBTyxNQUFNLElBQUksQ0FBQyxVQUFVO0FBQzFCLFVBQUksQ0FBQyxXQUFXLE1BQU0sVUFBVSxpQkFBaUIsRUFBRyxRQUFPO0FBQzNELGFBQU87QUFBQSxRQUNMLEdBQUc7QUFBQSxRQUNILE1BQU0seUJBQXlCLGdCQUFnQixNQUFNLElBQUksS0FBSztBQUFBLFFBQzlELFVBQVUseUJBQXlCLE1BQU07QUFBQSxNQUMzQztBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDQSxTQUFPO0FBQUEsSUFDTDtBQUFBLE1BQ0UsV0FBVztBQUFBLE1BQ1gsVUFBVTtBQUFBLE1BQ1YsTUFBTSx5QkFBeUI7QUFBQSxNQUMvQixVQUFVLHlCQUF5QjtBQUFBLElBQ3JDO0FBQUEsSUFDQSxHQUFHO0FBQUEsRUFDTDtBQUNGO0FBRUEsSUFBTSw4QkFBOEIsQ0FBQyxpQkFBeUIsaUJBQXlCLFVBQXFDO0FBQzFILFFBQU0sc0JBQXNCLGdCQUFnQixlQUFlO0FBQzNELFFBQU0sb0JBQW9CLGdCQUFnQixlQUFlO0FBQ3pELE1BQUkscUJBQXFCO0FBQ3ZCLFVBQU0sUUFBUSxNQUFNLEtBQUssQ0FBQyxVQUFVLFdBQVcsTUFBTSxVQUFVLG1CQUFtQixDQUFDO0FBQ25GLFFBQUksTUFBTyxRQUFPLE1BQU07QUFBQSxFQUMxQjtBQUNBLE1BQUksbUJBQW1CO0FBQ3JCLFVBQU0sT0FBTyxNQUFNLEtBQUssQ0FBQyxVQUFVLFdBQVcsTUFBTSxVQUFVLGlCQUFpQixDQUFDO0FBQ2hGLFdBQU8sTUFBTSxZQUFZO0FBQUEsRUFDM0I7QUFDQSxTQUFPO0FBQ1Q7QUFFQSxJQUFNLCtCQUErQixDQUFDLGdCQUFnQixPQUEyQztBQUMvRixRQUFNLFFBQVEsV0FBVyxvQkFBSSxLQUFLLENBQUM7QUFDbkMsUUFBTSxXQUFXLElBQUksS0FBSyxLQUFLO0FBRS9CLFdBQVMsUUFBUSxNQUFNLFFBQVEsSUFBSSxFQUFFO0FBRXJDLFNBQU87QUFBQSxJQUNMLFVBQVUsVUFBVSxRQUFRO0FBQUEsSUFDNUIsUUFBUSxVQUFVLEtBQUs7QUFBQSxJQUN2QixXQUFXO0FBQUEsSUFDWCxjQUFjO0FBQUEsSUFDZCxlQUFlLGdCQUFnQixhQUFhO0FBQUEsSUFDNUMsY0FBYztBQUFBLElBQ2QsaUJBQWlCO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsRUFDdkI7QUFDRjtBQUVBLElBQU0sZ0NBQWdDLENBQUMsV0FBNEI7QUFDakUsTUFBSSxRQUFRO0FBQ1YsV0FBTyxLQUFLLHFDQUFxQyxpREFBaUQ7QUFBQSxFQUNwRztBQUVBLFNBQU8sS0FBSyx5Q0FBeUMsNkRBQTZEO0FBQ3BIO0FBRUEsSUFBTSw2QkFBNkI7QUFFbkMsSUFBTSx3QkFBd0IsSUFBSSxTQUFvQjtBQUNwRCxNQUFJLE9BQU8sWUFBWSxlQUFlLE9BQU8sUUFBUSxTQUFTLFlBQVk7QUFDeEUsWUFBUSxLQUFLLDRCQUE0QixHQUFHLElBQUk7QUFBQSxFQUNsRDtBQUNGO0FBRUEsSUFBTSx3QkFBd0IsSUFBSSxTQUFvQjtBQUNwRCxNQUFJLE9BQU8sWUFBWSxlQUFlLE9BQU8sUUFBUSxTQUFTLFlBQVk7QUFDeEUsWUFBUSxLQUFLLDRCQUE0QixHQUFHLElBQUk7QUFBQSxFQUNsRDtBQUNGO0FBR0EsSUFBTSx5QkFBeUIsQ0FBQyxTQUE2QztBQUMzRSxRQUFNLFNBQVMsU0FBUyxLQUFLLE1BQU07QUFDbkMsU0FBTyxDQUFDLENBQUM7QUFDWDtBQUdBLElBQU0sMEJBQTBCLE1BQU07QUFDcEMsMEJBQXdCO0FBQUEsSUFDdEIsT0FBTyxTQUFTLE9BQU8saUJBQWlCO0FBQUEsSUFDeEMsVUFBVSxTQUFTLE9BQU8saUJBQWlCO0FBQUEsSUFDM0MsU0FBUyxTQUFTLE9BQU8sZ0JBQWdCO0FBQUEsRUFDM0MsQ0FBQztBQUNIO0FBRUEsSUFBTSxnQkFBZ0IsTUFDcEIsOENBQUMsU0FBSSxTQUFRLGFBQVksTUFBSyxRQUFPLFFBQU8sZ0JBQWUsYUFBYSxLQUFLLGVBQVksUUFBTyxXQUFVLFVBQ3hHO0FBQUEsK0NBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLCtIQUE4SDtBQUFBLEVBQ25MLDZDQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSx3Q0FBdUM7QUFBQSxFQUM1Riw2Q0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsNkJBQTRCO0FBQUEsRUFDakYsNkNBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLFlBQVc7QUFBQSxFQUNoRSw2Q0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsWUFBVztBQUFBLEdBQ2xFO0FBR0YsSUFBTSw0QkFBNEIsTUFBTTtBQUN0QyxRQUFNLFlBQVksVUFBVSxrQkFBa0IsTUFBTTtBQUNwRCxRQUFNLGtCQUFrQixVQUFVLGtCQUFrQixLQUFLO0FBQ3pELFFBQU0sb0JBQW9CLFVBQVUscUJBQXFCLEtBQUs7QUFDOUQsUUFBTSxDQUFDLDJCQUEyQiw0QkFBNEIsUUFBSSx3QkFBUyxLQUFLO0FBQ2hGLFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLElBQUksZUFBZTtBQUNuQixRQUFNLHVCQUF1QixjQUFBQyxRQUFNLE9BQThCLElBQUk7QUFDckUsUUFBTSxpQkFBaUIsY0FBQUEsUUFBTSxPQUFnQyxJQUFJO0FBQ2pFLFFBQU0sa0JBQWtCLGNBQUFBLFFBQU0sT0FBZ0MsSUFBSTtBQUNsRSxRQUFNLHVCQUF1QixjQUFBQSxRQUFNLE9BQU8sS0FBSztBQUMvQyxRQUFNLDBCQUEwQixjQUFBQSxRQUFNLE9BQXNCLElBQUk7QUFDaEUsUUFBTSx3QkFBd0IsY0FBQUEsUUFBTSxPQUFPLEVBQUU7QUFDN0MsUUFBTSxzQkFBa0IsdUJBQVEsTUFBTTtBQUNwQyxVQUFNLE1BQU0sSUFBSSxJQUFJLE9BQU8sU0FBUyxJQUFJO0FBQ3hDLFVBQU0sU0FBUyxTQUFTLElBQUksYUFBYSxJQUFJLFFBQVEsQ0FBQyxFQUFFLFlBQVk7QUFDcEUsVUFBTSxlQUFlLFNBQVMsSUFBSSxhQUFhLElBQUksY0FBYyxDQUFDO0FBQ2xFLFVBQU1DLGNBQWEsV0FBVyxVQUFVLENBQUMsQ0FBQztBQUMxQyxXQUFPO0FBQUEsTUFDTCxZQUFBQTtBQUFBLE1BQ0EsU0FBUztBQUFBLE1BQ1QsYUFBYUEsY0FBYyxlQUEwQixDQUFDLENBQUMsZUFBZ0IsaUJBQTJCO0FBQUEsTUFDbEcsbUJBQW1CQSxjQUFjLElBQWM7QUFBQSxJQUNqRDtBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLGFBQWEsZ0JBQWdCO0FBQ25DLFFBQU0sY0FBYyxnQkFBZ0I7QUFDcEMsUUFBTSxvQkFBb0IsZ0JBQWdCO0FBQzFDLFFBQU0sd0JBQXdCLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNqRCxRQUFNLG9CQUFvQixnQkFBZ0I7QUFDMUMsUUFBTSxxQkFBcUIsQ0FBQyxjQUFjO0FBQzFDLFFBQU0sbUJBQWU7QUFBQSxJQUNuQixNQUFNLHdCQUF3QixNQUFNLFFBQVEsWUFBWSxJQUFJLGVBQWUsQ0FBQyxHQUFHLGlCQUFpQixlQUFlO0FBQUEsSUFDL0csQ0FBQyxpQkFBaUIsaUJBQWlCLFlBQVk7QUFBQSxFQUNqRDtBQUNBLFFBQU0sMkJBQXVCO0FBQUEsSUFDM0IsTUFBTSw0QkFBNEIsaUJBQWlCLGlCQUFpQixZQUFZO0FBQUEsSUFDaEYsQ0FBQyxpQkFBaUIsWUFBWTtBQUFBLEVBQ2hDO0FBQ0EsUUFBTSx3QkFBd0IsY0FBYztBQUc1QyxRQUFNLHVDQUFtQztBQUFBLElBQ3ZDLENBQUMsYUFBcUY7QUFDcEYsVUFBSSxDQUFDLFdBQVksUUFBTztBQUV4QixZQUFNLFdBQVcsNkJBQTZCLFNBQVMsYUFBYTtBQUNwRSxZQUFNLHFCQUFxQixTQUFTLFNBQVMsUUFBUSxLQUFLLFNBQVM7QUFDbkUsWUFBTSxtQkFBbUIsU0FBUyxTQUFTLE1BQU0sS0FBSyxTQUFTO0FBQy9ELFlBQU0sMEJBQTBCLGdCQUFnQixTQUFTLGFBQWEsS0FBSyxTQUFTO0FBRXBGLGFBQU87QUFBQSxRQUNMLEdBQUc7QUFBQSxRQUNILFVBQVU7QUFBQSxRQUNWLFFBQVE7QUFBQSxRQUNSLGVBQWU7QUFBQSxRQUNmLGNBQWM7QUFBQSxNQUNoQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUMsVUFBVTtBQUFBLEVBQ2I7QUFFQSxRQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksd0JBQVMsS0FBSztBQUN0RCxRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixRQUFJLHdCQUFTLEVBQUU7QUFDdkQsUUFBTSxDQUFDLGVBQWUsZ0JBQWdCLFFBQUksd0JBQVMsRUFBRTtBQUNyRCxRQUFNLENBQUMsZUFBZSxnQkFBZ0IsUUFBSSx3QkFBUyxLQUFLO0FBQ3hELFFBQU0sQ0FBQyxnQkFBZ0IsaUJBQWlCLFFBQUksd0JBQVMsRUFBRTtBQUN2RCxRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixRQUFJLHdCQUFxRCxJQUFJO0FBQ3JHLFFBQU0sMEJBQXNCLHVCQUFRLE1BQU07QUFDeEMsVUFBTSxjQUFjLE1BQU0sUUFBUSxnQkFBZ0IsTUFBTSxJQUFJLGVBQWUsU0FBUyxDQUFDO0FBQ3JGLFdBQU8sSUFBSTtBQUFBLE1BQ1QsWUFBWSxRQUFRLENBQUMsU0FBUztBQUM1QixjQUFNLFdBQVcsU0FBUyxNQUFNLFFBQVEsRUFBRSxZQUFZO0FBQ3RELGVBQU8sV0FBVyxDQUFDLFFBQVEsSUFBSSxDQUFDO0FBQUEsTUFDbEMsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGLEdBQUcsQ0FBQyxjQUFjLENBQUM7QUFFbkIsUUFBTSx1QkFBbUI7QUFBQSxJQUN2QixPQUFPO0FBQUEsTUFDTCxPQUFPLEtBQUssc0JBQXNCLE9BQU87QUFBQSxNQUN6QyxNQUFNLEtBQUsscUJBQXFCLFVBQVU7QUFBQSxNQUMxQyxNQUFNLEtBQUsscUJBQXFCLE1BQU07QUFBQSxNQUN0QyxNQUFNLEtBQUsscUJBQXFCLE1BQU07QUFBQSxJQUN4QztBQUFBLElBQ0EsQ0FBQztBQUFBLEVBQ0g7QUFFQSxRQUFNLEVBQUUsT0FBTyxhQUFhLGNBQWMsY0FBYyxJQUFJLGlCQUFpQjtBQUFBLElBQzNFLG9CQUFvQixLQUFLLGVBQWUsSUFBSTtBQUFBLElBQzVDLG1CQUFtQixLQUFLLGNBQWMsUUFBUTtBQUFBLEVBQ2hELENBQUM7QUFFRCxRQUFNLHVCQUFtQix1QkFBK0IsTUFBTSwyQkFBMkIsR0FBRyxDQUFDLENBQUM7QUFFOUYsUUFBTSx3QkFBb0IsdUJBQVEsTUFBTTtBQUN0QyxVQUFNLE1BQU0sb0JBQUksSUFBb0I7QUFDcEMsZUFBVyxVQUFVLGtCQUFrQjtBQUNyQyxVQUFJLElBQUksT0FBTyxPQUFPLEtBQUssR0FBRyxPQUFPLElBQUk7QUFBQSxJQUMzQztBQUNBLFdBQU87QUFBQSxFQUNULEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztBQUVyQixRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixJQUFJLDBCQUEwQjtBQUFBLElBQzVCO0FBQUEsSUFDQSxVQUFVO0FBQUEsSUFDVixNQUFNLGFBQWEsU0FBUztBQUFBLElBQzVCLGFBQWE7QUFBQSxFQUNmLENBQUM7QUFDRCxRQUFNLEVBQUUsaUJBQWlCLG1CQUFtQixtQkFBbUIsaUJBQWlCLGlCQUFpQixJQUFJLDZCQUE2QjtBQUNsSSxRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxZQUFZO0FBQUEsSUFDWixjQUFjO0FBQUEsSUFDZCxnQkFBZ0I7QUFBQSxJQUNoQixrQkFBa0I7QUFBQSxJQUNsQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixJQUFJLDhCQUE4QjtBQUNsQyxRQUFNLCtCQUEyQjtBQUFBLElBQy9CLENBQUMsb0JBQW9DO0FBQ25DLFlBQU0saUJBQWlCLDRCQUE0QixpQkFBaUIsaUJBQWlCLFlBQVk7QUFDakcsK0JBQXlCLGNBQWM7QUFDdkMsVUFBSSxDQUFDLGtCQUFtQixtQkFBbUIsV0FBVyxnQkFBZ0IsZUFBZSxHQUFJO0FBQ3ZGLHVDQUErQjtBQUFBLE1BQ2pDLE9BQU87QUFDTCxxQ0FBNkIsY0FBYztBQUFBLE1BQzdDO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLENBQUMsaUJBQWlCLGNBQWMsd0JBQXdCO0FBQUEsRUFDMUQ7QUFDQSxRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixJQUFJLDhCQUE4QjtBQUFBLElBQ2hDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsdUJBQXVCO0FBQUEsRUFDekIsQ0FBQztBQUNELFFBQU0sRUFBRSxxQkFBcUIsSUFBSSw4QkFBOEI7QUFBQSxJQUM3RDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUNELFFBQU0sbUNBQStCLDJCQUFZLE1BQU07QUFDckQsVUFBTSx1QkFBdUIseUJBQXlCLG9CQUFvQjtBQUMxRSxXQUFPLDZCQUE2QixvQkFBb0I7QUFBQSxFQUMxRCxHQUFHLENBQUMsc0JBQXNCLHdCQUF3QixDQUFDO0FBRW5ELFFBQU0sbUNBQStCLDJCQUFZLE1BQTBDO0FBQ3pGLFVBQU0sUUFBUSxXQUFXLG9CQUFJLEtBQUssQ0FBQztBQUNuQyxVQUFNQyxZQUFXLElBQUksS0FBSyxLQUFLO0FBQy9CLElBQUFBLFVBQVMsUUFBUSxNQUFNLFFBQVEsSUFBSSxFQUFFO0FBQ3JDLFVBQU0sdUJBQXVCLHlCQUF5QixvQkFBb0I7QUFFMUUsV0FBTztBQUFBLE1BQ0wsVUFBVSxVQUFVQSxTQUFRO0FBQUEsTUFDNUIsUUFBUSxVQUFVLEtBQUs7QUFBQSxNQUN2QixXQUFXO0FBQUEsTUFDWCxjQUFjO0FBQUEsTUFDZCxlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsTUFDZCxpQkFBaUI7QUFBQSxNQUNqQixxQkFBcUI7QUFBQSxJQUN2QjtBQUFBLEVBQ0YsR0FBRyxDQUFDLHNCQUFzQix3QkFBd0IsQ0FBQztBQUVuRCxRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLElBQUksOEJBQThCO0FBQUEsSUFDaEM7QUFBQSxJQUNBO0FBQUEsSUFDQSx3QkFBd0I7QUFBQSxJQUN4QixnQkFBZ0IsQ0FBQyxhQUFhO0FBQzVCLHdCQUFrQixJQUFJO0FBQ3RCLCtCQUF5QjtBQUN6QixZQUFNLHdCQUF3Qix5QkFBeUIsU0FBUyxhQUFhO0FBQzdFLFdBQUs7QUFBQSxRQUNIO0FBQUEsUUFDQSxpQ0FBaUM7QUFBQSxVQUMvQixHQUFHO0FBQUEsVUFDSCxlQUFlO0FBQUEsUUFDakIsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBQUEsSUFDQSxnQkFBZ0IsTUFBTTtBQUNwQix3QkFBa0IsSUFBSTtBQUN0QiwrQkFBeUI7QUFDekIsdUJBQWlCO0FBQ2pCLFVBQUksWUFBWTtBQUNkLGNBQU0sZUFBZSw2QkFBNkI7QUFDbEQsOEJBQXNCLFlBQVk7QUFDbEMsNkJBQXFCLEdBQUcsaUNBQWlDLFlBQVksR0FBRztBQUFBLFVBQ3RFLFlBQVk7QUFBQSxVQUNaLGlCQUFpQjtBQUFBLFVBQ2pCLDJCQUEyQjtBQUFBLFFBQzdCLENBQUM7QUFDRDtBQUFBLE1BQ0Y7QUFFQSxZQUFNLHFCQUFxQix5QkFBeUIsZUFBZTtBQUNuRSx1QkFBaUIsa0JBQWtCO0FBQ25DLGdCQUFVLGVBQWU7QUFBQSxJQUMzQjtBQUFBLEVBQ0YsQ0FBQztBQUVELCtCQUFVLE1BQU07QUFDZCxVQUFNLGlDQUFpQyxnQkFBZ0Isb0JBQW9CO0FBQzNFLFFBQUksQ0FBQywrQkFBZ0M7QUFDckMscUJBQWlCLDhCQUE4QjtBQUMvQyw2QkFBeUIsOEJBQThCO0FBQUEsRUFDekQsR0FBRyxDQUFDLHNCQUFzQixrQkFBa0Isd0JBQXdCLENBQUM7QUFFckUsK0JBQVUsTUFBTTtBQUNkLFFBQUksb0JBQXFCO0FBQ3pCLFVBQU0sd0JBQXdCLDRCQUE0QixpQkFBaUIsaUJBQWlCLFlBQVk7QUFDeEcsVUFBTSxpQ0FBaUMsZ0JBQWdCLGFBQWE7QUFDcEUsUUFBSSxXQUFXLGdDQUFnQyxxQkFBcUIsRUFBRztBQUN2RSxRQUFJLENBQUMsa0NBQWtDLENBQUMsc0JBQXVCO0FBRS9ELHFCQUFpQixxQkFBcUI7QUFDdEMsNkJBQXlCLHFCQUFxQjtBQUFBLEVBQ2hELEdBQUcsQ0FBQyxxQkFBcUIsaUJBQWlCLGVBQWUsY0FBYyxrQkFBa0Isd0JBQXdCLENBQUM7QUFFbEgsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBLE1BQU07QUFBQSxJQUNOLGlCQUFpQjtBQUFBLElBQ2pCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLGNBQWM7QUFBQSxJQUNkLFdBQVc7QUFBQSxJQUNYO0FBQUEsSUFDQTtBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1g7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsWUFBWTtBQUFBLEVBQ2QsSUFBSSwrQkFBK0I7QUFBQSxJQUNqQyxrQkFBa0IsQ0FBQyxjQUFjO0FBQUEsSUFDakMsY0FBYztBQUFBLElBQ2QsZUFBZTtBQUFBLElBQ2YsYUFBYTtBQUFBLElBQ2Isa0JBQWtCLFNBQVMsZUFBZTtBQUFBLElBQzFDLGNBQWMsZ0JBQWdCO0FBQUEsSUFDOUIsYUFBYTtBQUFBLElBQ2IsYUFBYSxDQUFDLFdBQVc7QUFDdkIsWUFBTSxnQkFBZ0IsU0FBUyxRQUFRLE1BQU07QUFDN0MsVUFBSSxDQUFDLGNBQWU7QUFFcEIsVUFBSSx5QkFBeUIsbUJBQW1CO0FBQzlDLHVDQUErQjtBQUFBLFVBQzdCLFFBQVE7QUFBQSxVQUNSLFNBQVM7QUFBQSxVQUNULFFBQVE7QUFBQSxRQUNWLENBQUM7QUFDRCxjQUFNLFFBQVEsSUFBSSxnQkFBZ0I7QUFBQSxVQUNoQyxRQUFRO0FBQUEsVUFDUixNQUFNO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixTQUFTO0FBQUEsUUFDWCxDQUFDO0FBQ0QsNkJBQXFCLHdCQUF3QixNQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQUEsVUFDL0QsaUJBQWlCO0FBQUEsUUFDbkIsQ0FBQztBQUNEO0FBQUEsTUFDRjtBQUVBLHNDQUFnQztBQUNoQywyQkFBcUIsK0JBQStCLG1CQUFtQixhQUFhLENBQUMsbUNBQW1DO0FBQUEsUUFDdEgsaUJBQWlCO0FBQUEsTUFDbkIsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLG1CQUFlO0FBQUEsSUFDbkIsTUFDRSxhQUNJLENBQUMsSUFDRDtBQUFBLE1BQ0U7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLE9BQU8sS0FBSywrQkFBK0IsY0FBYztBQUFBLFFBQ3pELE1BQU0sNkNBQUMsaUJBQWM7QUFBQSxRQUNyQixTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFBQSxJQUNOLENBQUMsWUFBWSxnQkFBZ0I7QUFBQSxFQUMvQjtBQUVBLFFBQU0sc0JBQXNCLHFCQUFxQixLQUFLO0FBQ3RELFFBQU0sOEJBQTBCLHVCQUFRLE1BQU07QUFDNUMsUUFBSSxjQUFjO0FBRWxCLG9CQUFnQixRQUFRLENBQUMsU0FBUztBQUNoQyxZQUFNLFNBQVMsT0FBTyxLQUFLLGVBQWUsQ0FBQztBQUMzQyxVQUFJLENBQUMsT0FBTyxTQUFTLE1BQU0sRUFBRztBQUM5QixxQkFBZTtBQUFBLElBQ2pCLENBQUM7QUFFRCxXQUFPLHlCQUF5QixhQUFhLHlCQUF5QjtBQUFBLEVBQ3hFLEdBQUcsQ0FBQywyQkFBMkIsZUFBZSxDQUFDO0FBQy9DLCtCQUFVLE1BQU07QUFDZCxRQUFJLFlBQVk7QUFFaEIsdUNBQW1DLEVBQ2hDLEtBQUssQ0FBQyxhQUFhO0FBQ2xCLFVBQUksVUFBVztBQUNmLFlBQU0scUJBQXFCLFNBQVMsUUFBUSxFQUFFLFlBQVk7QUFDMUQsVUFBSSxvQkFBb0I7QUFDdEIscUNBQTZCLGtCQUFrQjtBQUFBLE1BQ2pEO0FBQUEsSUFDRixDQUFDLEVBQ0EsTUFBTSxNQUFNO0FBQUEsSUFFYixDQUFDO0FBRUgsV0FBTyxNQUFNO0FBQ1gsa0JBQVk7QUFBQSxJQUNkO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUNMLHFDQUFnQixNQUFNO0FBQ3BCLDhCQUF3Qiw4QkFBOEI7QUFBQSxFQUN4RCxHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sNEJBQXdCO0FBQUEsSUFDNUIsTUFDRTtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFFQSxRQUFNLCtCQUEyQjtBQUFBLElBQy9CLENBQUMsY0FBc0Isb0JBQTZCO0FBQ2xELFlBQU0sa0JBQWtCLDZCQUE2QjtBQUVyRCw0QkFBc0Isa0NBQWtDO0FBQUEsUUFDdEQ7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGLENBQUM7QUFFRCx1QkFBaUI7QUFDakIsOEJBQXdCLFVBQVU7QUFDbEMsNEJBQXNCLFVBQVU7QUFDaEMsNEJBQXNCLGVBQWU7QUFDckMscUJBQWU7QUFDZixnQkFBVSx1QkFBdUI7QUFDakMsNEJBQXNCLHFDQUFxQztBQUFBLFFBQ3pELE1BQU07QUFBQSxRQUNOO0FBQUEsTUFDRixDQUFDO0FBQ0QsV0FBSyxTQUFTLEdBQUcsZUFBZTtBQUVoQyxZQUFNLE1BQU0sSUFBSSxJQUFJLE9BQU8sU0FBUyxJQUFJO0FBQ3hDLFVBQUksYUFBYSxPQUFPLGNBQWM7QUFDdEMsVUFBSSxhQUFhLE9BQU8sWUFBWTtBQUNwQyxZQUFNLGVBQWUsSUFBSSxhQUFhLFNBQVM7QUFDL0MsYUFBTyxRQUFRLGFBQWEsQ0FBQyxHQUFHLElBQUksZUFBZSxHQUFHLElBQUksUUFBUSxJQUFJLFlBQVksS0FBSyxJQUFJLFFBQVE7QUFBQSxJQUNyRztBQUFBLElBQ0E7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLGlDQUE2QjtBQUFBLElBQ2pDLENBQUMsZ0JBQTJDO0FBQzFDLFlBQU0sd0JBQXdCLHlCQUF5QixZQUFZLFFBQVEsYUFBYTtBQUN4RixZQUFNLGtCQUFrQjtBQUFBLFFBQ3RCLEdBQUcsWUFBWTtBQUFBLFFBQ2YsZUFBZTtBQUFBLE1BQ2pCO0FBRUEsNEJBQXNCLGVBQWU7QUFDckMsOEJBQXdCLFVBQVUsWUFBWTtBQUM5Qyw0QkFBc0IsVUFBVSxZQUFZO0FBQzVDLGlDQUEyQjtBQUFBLFFBQ3pCLGVBQWUsWUFBWTtBQUFBLFFBQzNCLGlCQUFpQixZQUFZO0FBQUEsUUFDN0IsYUFBYSxZQUFZO0FBQUEsUUFDekIsa0JBQWtCLFlBQVk7QUFBQSxRQUM5QixvQkFBb0IsWUFBWTtBQUFBLE1BQ2xDLENBQUM7QUFFRCxVQUFJLFlBQVksTUFBTSxTQUFTLEtBQUssWUFBWSxRQUFRLEdBQUc7QUFDekQsNEJBQW9CO0FBQUEsVUFDbEIsT0FBTyxZQUFZO0FBQUEsVUFDbkIsT0FBTyxZQUFZO0FBQUEsVUFDbkIsTUFBTSxZQUFZO0FBQUEsUUFDcEIsQ0FBQztBQUFBLE1BQ0g7QUFFQSwyQkFBcUIsWUFBWSxNQUFNLGlDQUFpQyxlQUFlLEdBQUc7QUFBQSxRQUN4RixZQUFZO0FBQUEsUUFDWiwyQkFBMkI7QUFBQSxNQUM3QixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLFFBQU0sa0NBQThCLDJCQUFZLE1BQU07QUFDcEQsVUFBTSxlQUFlLDZCQUE2QjtBQUNsRCxxQkFBaUI7QUFDakIsc0NBQWtDO0FBQ2xDLDZCQUF5QjtBQUN6QixzQkFBa0IsSUFBSTtBQUN0QiwwQkFBc0IsWUFBWTtBQUNsQyx5QkFBcUIsR0FBRyxpQ0FBaUMsWUFBWSxHQUFHO0FBQUEsTUFDdEUsWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsMkJBQTJCO0FBQUEsSUFDN0IsQ0FBQztBQUFBLEVBQ0gsR0FBRztBQUFBLElBQ0Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFHRCxRQUFNLGtDQUE4QiwyQkFBWSxNQUFNO0FBQ3BELFVBQU0sa0JBQWtCLDZCQUE2QjtBQUNyRCxxQkFBaUI7QUFDakIsc0NBQWtDO0FBQ2xDLDRCQUF3QixVQUFVO0FBQ2xDLDBCQUFzQixVQUFVO0FBQ2hDLDBCQUFzQixlQUFlO0FBQ3JDLHlCQUFxQixHQUFHLGlCQUFpQjtBQUFBLE1BQ3ZDLFlBQVk7QUFBQSxNQUNaLGlCQUFpQjtBQUFBLElBQ25CLENBQUM7QUFBQSxFQUNILEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0saUNBQTZCO0FBQUEsSUFDakMsQ0FBQyxnQkFBMkM7QUFDMUMsWUFBTSx3QkFBd0IseUJBQXlCLFlBQVksUUFBUSxhQUFhO0FBQ3hGLFlBQU0sa0JBQWtCO0FBQUEsUUFDdEIsR0FBRyxZQUFZO0FBQUEsUUFDZixlQUFlO0FBQUEsTUFDakI7QUFFQSw0QkFBc0IsZUFBZTtBQUNyQyw4QkFBd0IsVUFBVSxZQUFZO0FBQzlDLDRCQUFzQixVQUFVLFlBQVk7QUFFNUMsVUFBSSxZQUFZLE1BQU0sU0FBUyxLQUFLLFlBQVksUUFBUSxHQUFHO0FBQ3pELDRCQUFvQjtBQUFBLFVBQ2xCLE9BQU8sWUFBWTtBQUFBLFVBQ25CLE9BQU8sWUFBWTtBQUFBLFVBQ25CLE1BQU0sWUFBWTtBQUFBLFFBQ3BCLENBQUM7QUFBQSxNQUNIO0FBRUEsMkJBQXFCLFlBQVksTUFBTSxpQkFBaUI7QUFBQSxRQUN0RCxZQUFZO0FBQUEsTUFDZCxDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsQ0FBQyx1QkFBdUIscUJBQXFCLHNCQUFzQix3QkFBd0I7QUFBQSxFQUM3RjtBQUdBLFFBQU0sK0JBQTJCLDJCQUFZLE1BQU07QUFDakQscUJBQWlCO0FBQ2pCLHNDQUFrQztBQUNsQyw0QkFBd0IsVUFBVTtBQUNsQywwQkFBc0IsVUFBVTtBQUNoQyw2QkFBeUI7QUFDekIsc0JBQWtCLElBQUk7QUFDdEIsWUFBUTtBQUFBLEVBQ1YsR0FBRyxDQUFDLGtCQUFrQixtQ0FBbUMsMEJBQTBCLE9BQU8sQ0FBQztBQUUzRixRQUFNLDRCQUF3QjtBQUFBLElBQzVCLENBQUMsV0FBc0M7QUFDckMsVUFBSSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0Isc0JBQXNCLG1CQUFtQixhQUFjO0FBQ2pHLFVBQUksT0FBTyxTQUFTLE9BQVE7QUFFNUIsWUFBTSxTQUFTLFNBQVMsT0FBTyxNQUFNO0FBQ3JDLFVBQUksQ0FBQyxPQUFRO0FBQ2IsVUFBSSxDQUFDLHVCQUF1QixNQUFNLEVBQUc7QUFFckMsd0JBQWtCLElBQUk7QUFDdEIsZ0NBQTBCLE1BQU07QUFBQSxJQUNsQztBQUFBLElBQ0EsQ0FBQyxvQkFBb0IsWUFBWSxjQUFjLG9CQUFvQixpQkFBaUIseUJBQXlCO0FBQUEsRUFDL0c7QUFFQSxRQUFNLDJCQUF1QiwyQkFBWSxNQUFNO0FBQzdDLHNCQUFrQixFQUFFO0FBQ3BCLHNCQUFrQixJQUFJO0FBQ3RCLDZCQUF5QjtBQUFBLEVBQzNCLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQztBQUU3QixRQUFNLDJCQUF1QiwyQkFBWSxNQUEwQztBQUNqRixVQUFNLGVBQWUsa0JBQWtCO0FBQ3ZDLFVBQU0sd0JBQXdCLHlCQUF5QixhQUFhLGFBQWE7QUFDakYsV0FBTyxpQ0FBaUM7QUFBQSxNQUN0QyxHQUFHO0FBQUEsTUFDSCxlQUFlO0FBQUEsSUFDakIsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLGdCQUFnQixnQkFBZ0Isa0NBQWtDLHdCQUF3QixDQUFDO0FBQy9GLFFBQU0sZ0NBQTRCLDhCQUFlLG9CQUFvQjtBQUdyRSxRQUFNLCtCQUEyQiwyQkFBWSxZQUFZO0FBQ3ZELFFBQUksQ0FBQyxjQUFjLENBQUMsc0JBQXNCLHNCQUFzQixtQkFBbUIsZ0JBQWdCLGVBQWU7QUFDaEg7QUFBQSxJQUNGO0FBRUEscUJBQWlCLElBQUk7QUFDckIsc0JBQWtCLEVBQUU7QUFDcEIsc0JBQWtCLElBQUk7QUFFdEIsUUFBSTtBQUNGLFlBQU0sZ0JBQWdCLHFCQUFxQjtBQUMzQyx5QkFBbUIsZUFBZSxLQUFLO0FBQUEsSUFDekMsU0FBUyxPQUFPO0FBQ2QsWUFBTSxVQUFVLGlCQUFpQixRQUFRLE1BQU0sVUFBVSxLQUFLLHFCQUFxQix5QkFBeUI7QUFDNUcsd0JBQWtCLE9BQU87QUFBQSxJQUMzQixVQUFFO0FBQ0EsdUJBQWlCLEtBQUs7QUFBQSxJQUN4QjtBQUFBLEVBQ0YsR0FBRztBQUFBLElBQ0Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFHRCwrQkFBVSxNQUFNO0FBQ2QsUUFBSSxDQUFDLGNBQWMsTUFBTSxTQUFTLEVBQUc7QUFDckMsMEJBQXNCLE1BQU0sT0FBTyxDQUFDLFNBQXdDLEtBQUssU0FBUyxNQUFNLENBQUM7QUFBQSxFQUNuRyxHQUFHLENBQUMsdUJBQXVCLFlBQVksS0FBSyxDQUFDO0FBRTdDLFFBQU0sd0JBQW9CLDJCQUFZLFlBQVk7QUFDaEQsUUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLGNBQWM7QUFDL0MsYUFBTztBQUFBLElBQ1Q7QUFDQSxRQUFJLG1CQUFtQixDQUFDLG9CQUFvQjtBQUMxQyxZQUFNLGlCQUNKLDJCQUNBLEtBQUsseUNBQXlDLDZEQUE2RDtBQUM3Ryx1QkFBaUIsY0FBYztBQUMvQix3QkFBa0IsY0FBYztBQUNoQyxzQkFBZ0IsZ0JBQWdCLElBQUk7QUFDcEMsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLGdCQUFnQixxQkFBcUIsS0FBSztBQUNoRCxRQUFJLGdCQUFnQixHQUFHO0FBQ3JCLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxnQkFBZ0IscUJBQXFCO0FBQzNDLFVBQU0sa0JBQWtCLFNBQVMsY0FBYyxpQkFBaUIsZUFBZTtBQUUvRSxvQkFBZ0IsSUFBSTtBQUNwQixxQkFBaUIsRUFBRTtBQUNuQixzQkFBa0IsSUFBSTtBQUN0QixzQkFBa0IsS0FBSyw4Q0FBOEMseUJBQXlCLENBQUM7QUFFL0YsUUFBSTtBQUNGLFlBQU0sV0FBVyxNQUFNO0FBQUEsUUFDckIsNEJBQ0k7QUFBQSxVQUNFLGdCQUFnQjtBQUFBLFVBQ2hCLGVBQWU7QUFBQSxVQUNmLFNBQVMsa0NBQWtDLG9CQUFvQixhQUFhO0FBQUEsVUFDNUU7QUFBQSxRQUNGLElBQ0E7QUFBQSxVQUNFLGdCQUFnQjtBQUFBLFVBQ2hCLGVBQWU7QUFBQSxVQUNmLFdBQVcsZ0JBQWdCLFFBQVEsQ0FBQyxTQUFTO0FBQzNDLGtCQUFNLFNBQVMsU0FBUyxLQUFLLE1BQU07QUFDbkMsbUJBQU8sU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDO0FBQUEsVUFDOUIsQ0FBQztBQUFBLFFBQ0g7QUFBQSxRQUNKO0FBQUEsVUFDRSx5QkFBeUI7QUFBQSxVQUN6QixrQkFBa0IsbUJBQW1CO0FBQUEsUUFDdkM7QUFBQSxNQUNGO0FBQ0EsWUFBTSxTQUFTLFNBQVMsUUFBUTtBQUNoQyxVQUFJLENBQUMsUUFBUTtBQUNYLGNBQU0saUJBQWlCLFNBQVMsV0FBVyxLQUFLLHFCQUFxQixpQkFBaUI7QUFDdEYseUJBQWlCLGNBQWM7QUFDL0IsMEJBQWtCLGNBQWM7QUFDaEMsd0JBQWdCLGdCQUFnQixJQUFJO0FBQ3BDLGVBQU87QUFBQSxNQUNUO0FBRUEsd0JBQWtCLE1BQU07QUFFeEIsVUFBSSxPQUFPLGNBQWMsR0FBRztBQUMxQiw2QkFBcUI7QUFDckIseUJBQWlCO0FBQ2pCLDBDQUFrQztBQUNsQyx3Q0FBZ0M7QUFDaEMsY0FBTSxjQUFjLE9BQU8sY0FBYyxLQUFLLE9BQU8sZUFBZSxJQUFJLG1CQUFtQjtBQUMzRix3QkFBZ0IsYUFBYSxnQkFBZ0IsY0FBYyxPQUFPLElBQUk7QUFDdEUsNkJBQXFCLDJCQUEyQixXQUFXLEdBQUc7QUFBQSxVQUM1RCxpQkFBaUI7QUFBQSxVQUNqQixpQkFBaUI7QUFBQSxRQUNuQixDQUFDO0FBQ0QsZUFBTztBQUFBLE1BQ1Q7QUFFQSxVQUFJLE9BQU8sY0FBYyxLQUFLLE9BQU8sY0FBYyxHQUFHO0FBQ3BELGNBQU0saUJBQWlCLFNBQVMsV0FBVyxLQUFLLHFCQUFxQixpQkFBaUI7QUFDdEYsMEJBQWtCLGNBQWM7QUFDaEMsd0JBQWdCLGdCQUFnQixJQUFJO0FBQ3BDLGNBQU0sU0FBUyxjQUFjLElBQUksSUFBSSxhQUFhLGFBQWE7QUFDL0QsZUFBTztBQUFBLE1BQ1Q7QUFFQSxVQUFJLE9BQU8sY0FBYyxLQUFLLE9BQU8sZUFBZSxHQUFHO0FBQ3JELDBCQUFrQixTQUFTLFdBQVcsS0FBSyxhQUFhLElBQUksQ0FBQztBQUM3RCx3QkFBZ0Isa0JBQWtCLElBQUk7QUFDdEMsY0FBTSxTQUFTLGNBQWMsSUFBSSxJQUFJLGFBQWEsYUFBYTtBQUMvRCxlQUFPO0FBQUEsTUFDVDtBQUVBLHdCQUFrQixTQUFTLFdBQVcsS0FBSyxhQUFhLElBQUksQ0FBQztBQUM3RCxzQkFBZ0IsYUFBYSxJQUFJO0FBQ2pDLFlBQU0sU0FBUyxjQUFjLElBQUksSUFBSSxhQUFhLGFBQWE7QUFDL0QsYUFBTztBQUFBLElBQ1QsU0FBUyxPQUFPO0FBQ2QsWUFBTSxpQkFBaUIsaUJBQWlCLFFBQVEsTUFBTSxVQUFVLEtBQUsscUJBQXFCLGlCQUFpQjtBQUMzRyx1QkFBaUIsY0FBYztBQUMvQix3QkFBa0IsY0FBYztBQUNoQyxzQkFBZ0IsZ0JBQWdCLElBQUk7QUFDcEMsYUFBTztBQUFBLElBQ1QsVUFBRTtBQUNBLHNCQUFnQixLQUFLO0FBQUEsSUFDdkI7QUFBQSxFQUNGLEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSwyQkFBdUIsMkJBQVksTUFBTTtBQUM3QyxRQUFJLENBQUMsY0FBYyxzQkFBc0IsS0FBSyxnQkFBZ0Isc0JBQXNCLGlCQUFpQjtBQUNuRztBQUFBLElBQ0Y7QUFFQSxxQkFBaUIsRUFBRTtBQUNuQixzQkFBa0IsRUFBRTtBQUNwQixnQkFBWTtBQUFBLE1BQ1YsT0FBTyxLQUFLLHNDQUFzQyxvQkFBb0I7QUFBQSxNQUN0RSxTQUFTLDRCQUNMLEdBQUcsS0FBSyxzQkFBc0IsU0FBUyxDQUFDLEtBQUssbUJBQW1CLEtBQ2hFLEdBQUcsS0FBSyxzQkFBc0IsU0FBUyxDQUFDLEtBQUssbUJBQW1CO0FBQUEsRUFBSyxLQUFLLG1DQUFtQyxzQkFBc0IsQ0FBQyxLQUFLLHVCQUF1QjtBQUFBLE1BQ3BLLGFBQWEsS0FBSyxzQ0FBc0Msb0JBQW9CO0FBQUEsTUFDNUUsWUFBWSxLQUFLLGNBQWMsUUFBUTtBQUFBLE1BQ3ZDLFdBQVcsWUFBWTtBQUNyQixlQUFPLGtCQUFrQjtBQUFBLE1BQzNCO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxHQUFHO0FBQUEsSUFDRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSx5QkFBcUIsMkJBQVksWUFBWTtBQUNqRCxxQkFBaUIsRUFBRTtBQUNuQixVQUFNLGNBQWM7QUFBQSxNQUNsQixNQUFNO0FBQUEsTUFDTixTQUFTLENBQUMsWUFBWTtBQUNwQix5QkFBaUIsT0FBTztBQUN4QiwwQkFBa0IsT0FBTztBQUFBLE1BQzNCO0FBQUEsTUFDQSxxQkFBcUIsS0FBSyxxQkFBcUIsaUJBQWlCO0FBQUEsSUFDbEUsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLGVBQWUsWUFBWSxDQUFDO0FBRWhDLFFBQU0sbUJBQW1CLEtBQUssa0JBQWtCLFNBQVM7QUFDekQsUUFBTSxrQkFBa0IsTUFBTSxjQUFjLEtBQUssY0FBYyxRQUFRO0FBQ3ZFLFFBQU0sbUJBQW1CLGVBQ3JCLG1CQUNBLENBQUMsZ0JBQWdCLGdCQUNmLEtBQUssYUFBYSxJQUFJLElBQ3RCLE1BQU0sZUFBZSxLQUFLLGVBQWUsSUFBSTtBQUVuRCxRQUFNLCtCQUEyQiwyQkFBWSxNQUFNO0FBQ2pELFFBQUksQ0FBQyxnQkFBZ0IsZUFBZTtBQUNsQyxtQkFBYTtBQUNiO0FBQUEsSUFDRjtBQUNBLFNBQUssbUJBQW1CO0FBQUEsRUFDMUIsR0FBRyxDQUFDLGNBQWMsb0JBQW9CLGNBQWMsYUFBYSxDQUFDO0FBRWxFLFFBQU0sdUJBQW1CO0FBQUEsSUFDdkIsQ0FBQyxjQUFzQjtBQUNyQixZQUFNLFNBQVMsU0FBUyxTQUFTO0FBQ2pDLFVBQUksQ0FBQyxPQUFRO0FBRWIsWUFBTSxXQUFXLGtCQUFrQjtBQUNuQyxZQUFNLGVBQWU7QUFBQSxRQUNuQixTQUFTO0FBQUEsUUFDVCxNQUFNLGNBQWMsSUFBSSxJQUFJO0FBQUEsUUFDNUIsU0FBUyxPQUFPLFdBQVcsY0FBYyxPQUFPLFdBQVcsSUFBSTtBQUFBLFFBQy9ELGFBQWE7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLGlCQUFpQixhQUFhLGNBQWM7QUFBQSxRQUM1QztBQUFBLFFBQ0E7QUFBQSxRQUNBLDBCQUEwQjtBQUFBLFFBQzFCLHdCQUF3QjtBQUFBLE1BQzFCO0FBRUEsVUFBSSxZQUFZO0FBQ2QsY0FBTSxtQ0FBbUMsb0JBQW9CLElBQUksT0FBTyxZQUFZLENBQUM7QUFDckYsd0JBQWdCLFlBQVk7QUFDNUIseUNBQWlDO0FBQUEsVUFDL0IsU0FBUztBQUFBLFVBQ1QsTUFBTSxhQUFhO0FBQUEsVUFDbkIsU0FBUyxhQUFhO0FBQUEsVUFDdEIsYUFBYTtBQUFBLFVBQ2IsU0FBUztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsMEJBQTBCO0FBQUEsVUFDMUIsd0JBQXdCO0FBQUEsUUFDMUIsQ0FBQztBQUNELGNBQU0sUUFBUSxJQUFJLGdCQUFnQjtBQUFBLFVBQ2hDO0FBQUEsUUFDRixDQUFDO0FBQ0QsWUFBSSxrQ0FBa0M7QUFDcEMsZ0JBQU0sSUFBSSxRQUFRLE1BQU07QUFDeEIsZ0JBQU0sSUFBSSxVQUFVLHlDQUF5QztBQUFBLFFBQy9EO0FBQ0EsWUFBSSx5QkFBeUIsbUJBQW1CO0FBQzlDLHlDQUErQjtBQUFBLFlBQzdCO0FBQUEsWUFDQSxTQUFTO0FBQUEsWUFDVCxRQUFRO0FBQUEsVUFDVixDQUFDO0FBQ0QsZ0JBQU0sSUFBSSxVQUFVLGlCQUFpQjtBQUNyQyxnQkFBTSxJQUFJLFdBQVcsV0FBVztBQUFBLFFBQ2xDO0FBQ0EsNkJBQXFCLHdCQUF3QixNQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQUEsVUFDL0QsaUJBQWlCO0FBQUEsVUFDakIsaUJBQWlCO0FBQUEsUUFDbkIsQ0FBQztBQUNEO0FBQUEsTUFDRjtBQUVBLHNCQUFnQixZQUFZO0FBQzVCLFVBQUkseUJBQXlCLG1CQUFtQjtBQUM5Qyx1Q0FBK0I7QUFBQSxVQUM3QjtBQUFBLFVBQ0EsU0FBUztBQUFBLFVBQ1QsUUFBUTtBQUFBLFFBQ1YsQ0FBQztBQUNELGNBQU0sUUFBUSxJQUFJLGdCQUFnQjtBQUFBLFVBQ2hDO0FBQUEsVUFDQSxRQUFRO0FBQUEsVUFDUixTQUFTO0FBQUEsUUFDWCxDQUFDO0FBQ0QsNkJBQXFCLHdCQUF3QixNQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQUEsVUFDL0QsaUJBQWlCO0FBQUEsVUFDakIsaUJBQWlCO0FBQUEsUUFDbkIsQ0FBQztBQUNEO0FBQUEsTUFDRjtBQUVBLHNDQUFnQztBQUNoQywyQkFBcUIsK0JBQStCLG1CQUFtQixNQUFNLENBQUMsSUFBSTtBQUFBLFFBQ2hGLGlCQUFpQjtBQUFBLFFBQ2pCLGlCQUFpQjtBQUFBLE1BQ25CLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLDJCQUF1QiwyQkFBWSxDQUFDLFdBQStCO0FBQ3ZFLFVBQU0sT0FBTztBQUNiLFFBQUksQ0FBQyxRQUFRLE9BQU8sS0FBSyxZQUFZLFdBQVksUUFBTztBQUN4RCxVQUFNLE9BQU8sS0FBSyxRQUFxQiwyQkFBMkI7QUFDbEUsUUFBSSxDQUFDLEtBQU0sUUFBTztBQUNsQixRQUFJLENBQUMscUJBQXFCLFNBQVMsU0FBUyxJQUFJLEVBQUcsUUFBTztBQUMxRCxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsQ0FBQztBQUVMLHlCQUF1QjtBQUFBLElBQ3JCLGNBQWM7QUFBQSxJQUNkO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLGFBQWEsS0FBSyxNQUFNLFNBQVMsS0FBSyxTQUFTO0FBQ3JELFFBQU0sa0JBQWtCO0FBQ3hCLFFBQU0sbUNBQW1DLGdCQUFnQixpQkFBaUI7QUFFMUUsUUFBTSxtQkFBZSx1QkFBUSxNQUFNO0FBQ2pDLFVBQU0sV0FBVztBQUNqQixRQUFJLENBQUMsU0FBVSxRQUFPLENBQUM7QUFFdkIsVUFBTSxVQUFnRSxDQUFDO0FBQ3ZFLFVBQU0sU0FBUyxVQUFVLGlCQUFpQixRQUFRO0FBQ2xELFVBQU0sZUFBZSx5QkFBeUIsU0FBUyxVQUFVLFFBQVEsRUFBRTtBQUMzRSxVQUFNLGFBQWEseUJBQXlCLFNBQVMsUUFBUSxRQUFRLEVBQUU7QUFFdkUsUUFBSSxnQkFBZ0IsWUFBWTtBQUM5QixjQUFRLEtBQUs7QUFBQSxRQUNYLEtBQUs7QUFBQSxRQUNMLE9BQU8sS0FBSyxnQkFBZ0IsTUFBTTtBQUFBLFFBQ2xDLE9BQU8sZ0JBQWdCO0FBQUEsTUFDekIsQ0FBQztBQUNELGNBQVEsS0FBSztBQUFBLFFBQ1gsS0FBSztBQUFBLFFBQ0wsT0FBTyxLQUFLLGNBQWMsSUFBSTtBQUFBLFFBQzlCLE9BQU8sY0FBYztBQUFBLE1BQ3ZCLENBQUM7QUFBQSxJQUNIO0FBRUEsUUFBSSxTQUFTLFVBQVUsS0FBSyxHQUFHO0FBQzdCLGNBQVEsS0FBSztBQUFBLFFBQ1gsS0FBSztBQUFBLFFBQ0wsT0FBTyxLQUFLLDRCQUE0QixRQUFRO0FBQUEsUUFDaEQsT0FBTyxTQUFTLFVBQVUsS0FBSztBQUFBLE1BQ2pDLENBQUM7QUFBQSxJQUNIO0FBRUEsUUFBSSxTQUFTLGFBQWEsS0FBSyxHQUFHO0FBQ2hDLGNBQVEsS0FBSztBQUFBLFFBQ1gsS0FBSztBQUFBLFFBQ0wsT0FBTyxLQUFLLGlDQUFpQyxVQUFVO0FBQUEsUUFDdkQsT0FBTyxTQUFTLGFBQWEsS0FBSztBQUFBLE1BQ3BDLENBQUM7QUFBQSxJQUNIO0FBRUEsUUFBSSxTQUFTLGlCQUFpQixJQUFJO0FBQ2hDLGNBQVEsS0FBSztBQUFBLFFBQ1gsS0FBSztBQUFBLFFBQ0wsT0FBTyxLQUFLLHlCQUF5QixRQUFRO0FBQUEsUUFDN0MsT0FBTyw0QkFBNEIsU0FBUyxZQUFZO0FBQUEsTUFDMUQsQ0FBQztBQUFBLElBQ0g7QUFFQSxRQUFJLFNBQVMsb0JBQW9CLElBQUk7QUFDbkMsWUFBTSxnQkFBZ0Isa0JBQWtCLElBQUksT0FBTyxTQUFTLGVBQWUsQ0FBQyxLQUFLLE9BQU8sU0FBUyxlQUFlO0FBQ2hILGNBQVEsS0FBSztBQUFBLFFBQ1gsS0FBSztBQUFBLFFBQ0wsT0FBTyxLQUFLLDJCQUEyQixVQUFVO0FBQUEsUUFDakQsT0FBTztBQUFBLE1BQ1QsQ0FBQztBQUFBLElBQ0g7QUFFQSxRQUFJLFNBQVMsd0JBQXdCLE9BQU87QUFDMUMsY0FBUSxLQUFLO0FBQUEsUUFDWCxLQUFLO0FBQUEsUUFDTCxPQUFPLEtBQUssZ0NBQWdDLGlCQUFpQjtBQUFBLFFBQzdELE9BQ0UsU0FBUyx3QkFBd0IsUUFDN0IsS0FBSyxvQ0FBb0MsS0FBSyxJQUM5QyxLQUFLLG1DQUFtQyxJQUFJO0FBQUEsTUFDcEQsQ0FBQztBQUFBLElBQ0g7QUFFQSxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsZ0JBQWdCLGlCQUFpQixDQUFDO0FBRXRDLFFBQU0sY0FBYyxDQUFDLGNBQWMsQ0FBQyxlQUFlLGFBQWEsU0FBUztBQUV6RSwrQkFBVSxNQUFNO0FBQ2QsUUFBSSxDQUFDLFdBQVk7QUFDakIsOEJBQTBCO0FBQUEsTUFDeEIsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLElBQ1gsQ0FBQztBQUNELFdBQU8sTUFBTTtBQUNYLGtDQUE0QjtBQUFBLElBQzlCO0FBQUEsRUFDRixHQUFHLENBQUMsWUFBWSxxQkFBcUIsQ0FBQztBQUV0QywrQkFBVSxNQUFNO0FBQ2QsMEJBQXNCLDRCQUE0QjtBQUFBLE1BQ2hELEtBQUssT0FBTyxXQUFXLGNBQWMsT0FBTyxTQUFTLE9BQU87QUFBQSxNQUM1RCxtQkFBbUIscUJBQXFCO0FBQUEsTUFDeEM7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUNELFFBQUkscUJBQXFCLFNBQVM7QUFDaEMsNEJBQXNCLDBDQUEwQztBQUNoRTtBQUFBLElBQ0Y7QUFDQSxRQUFJLENBQUMsV0FBVztBQUNkLDRCQUFzQixtQ0FBbUM7QUFDekQ7QUFBQSxJQUNGO0FBRUEsUUFBSSxDQUFDLFlBQVk7QUFDZixZQUFNLE1BQU0sSUFBSSxJQUFJLE9BQU8sU0FBUyxJQUFJO0FBQ3hDLFlBQU0sZUFBZSxTQUFTLElBQUksYUFBYSxJQUFJLGNBQWMsQ0FBQztBQUNsRSxVQUFJLGNBQWM7QUFDaEIsOEJBQXNCLG9EQUFvRDtBQUFBLFVBQ3hFO0FBQUEsVUFDQSxZQUFZLElBQUksYUFBYSxJQUFJLFlBQVk7QUFBQSxRQUMvQyxDQUFDO0FBQ0QsNkJBQXFCLFVBQVU7QUFDL0IsaUNBQXlCLGNBQWMsSUFBSSxhQUFhLElBQUksWUFBWSxDQUFDO0FBQ3pFO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxRQUFJLENBQUMsMEJBQTBCO0FBQzdCLDRCQUFzQixpREFBaUQ7QUFDdkU7QUFBQSxJQUNGO0FBQ0EseUJBQXFCLFVBQVU7QUFDL0IsVUFBTSx1QkFBdUIsc0NBQXNDO0FBQ25FLFVBQU0sMkJBQTJCLHlCQUF5QjtBQUFBLE1BQ3hEO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUNELFVBQU0sYUFBYSxrQkFBa0I7QUFDckMsVUFBTSxnQkFBZ0Isa0JBQWtCO0FBRXhDLDBCQUFzQiw0Q0FBNEM7QUFBQSxNQUNoRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFFRCxRQUFJLGVBQWUsbUJBQW1CLGVBQWU7QUFDbkQsNEJBQXNCLDBDQUEwQztBQUNoRSwrQkFBeUI7QUFDekI7QUFBQSxJQUNGO0FBRUEsUUFBSSxZQUFZO0FBQ2QsWUFBTSx3QkFBd0IsaUJBQWlCLHdCQUF3QjtBQUN2RSxZQUFNQyxlQUFjLHdCQUF3QixnQkFBZ0IsSUFBSTtBQUNoRSxZQUFNLGdCQUFnQixTQUFTQSxjQUFhLGVBQWU7QUFDM0QsVUFBSUEsZ0JBQWUsaUJBQWlCLGtCQUFrQixTQUFTLFdBQVcsR0FBRztBQUMzRSw4QkFBc0IsOENBQThDO0FBQUEsVUFDbEU7QUFBQSxVQUNBLE1BQU1BLGFBQVk7QUFBQSxRQUNwQixDQUFDO0FBQ0QsMENBQWtDO0FBQ2xDLG1DQUEyQkEsWUFBVztBQUN0QztBQUFBLE1BQ0Y7QUFFQSxZQUFNLGtCQUFrQix3QkFBd0IsaUNBQWlDLFdBQVcsSUFBSTtBQUNoRyxVQUFJLGlCQUFpQjtBQUNuQiw4QkFBc0IscURBQXFEO0FBQUEsVUFDekUsU0FBUyxnQkFBZ0I7QUFBQSxVQUN6QixNQUFNLGdCQUFnQjtBQUFBLFFBQ3hCLENBQUM7QUFDRCwwQ0FBa0M7QUFDbEMsbUNBQTJCO0FBQUEsVUFDekIsU0FBUyxnQkFBZ0I7QUFBQSxVQUN6QixNQUFNLGdCQUFnQjtBQUFBLFVBQ3RCLFNBQVMsZ0JBQWdCO0FBQUEsVUFDekIsYUFBYSxnQkFBZ0I7QUFBQSxVQUM3QixPQUFPLENBQUM7QUFBQSxVQUNSLGlCQUFpQixnQkFBZ0I7QUFBQSxVQUNqQyxPQUFPO0FBQUEsVUFDUCxpQkFBaUIsZ0JBQWdCO0FBQUEsVUFDakMsZUFBZSxnQkFBZ0I7QUFBQSxVQUMvQixhQUFhLGdCQUFnQjtBQUFBLFVBQzdCLDBCQUEwQixnQkFBZ0I7QUFBQSxVQUMxQyx3QkFBd0IsZ0JBQWdCO0FBQUEsUUFDMUMsQ0FBQztBQUNEO0FBQUEsTUFDRjtBQUVBLDRCQUFzQiw4Q0FBOEM7QUFDcEUsa0NBQTRCO0FBQzVCO0FBQUEsSUFDRjtBQUVBLFFBQUksQ0FBQyxpQkFBaUIsQ0FBQyx3QkFBd0IsQ0FBQywwQkFBMEI7QUFDeEUsNEJBQXNCLG1EQUFtRDtBQUN6RSxrQ0FBNEI7QUFDNUI7QUFBQSxJQUNGO0FBRUEsVUFBTSxjQUFjLGdCQUFnQjtBQUNwQyxRQUFJLENBQUMsYUFBYTtBQUNoQiw0QkFBc0Isb0NBQW9DO0FBQzFELHVCQUFpQjtBQUNqQjtBQUFBLElBQ0Y7QUFFQSwwQkFBc0IsNkNBQTZDO0FBQUEsTUFDakUsTUFBTSxZQUFZO0FBQUEsTUFDbEIsYUFBYSxZQUFZO0FBQUEsSUFDM0IsQ0FBQztBQUNELCtCQUEyQixXQUFXO0FBQUEsRUFDeEMsR0FBRztBQUFBLElBQ0Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCwrQkFBVSxNQUFNO0FBQ2QsUUFBSSxVQUFXO0FBQ2YsUUFBSSx3QkFBd0IsV0FBVyxRQUFRLENBQUMsc0JBQXNCLFFBQVM7QUFFL0UsVUFBTSxpQkFBaUIsd0JBQXdCO0FBQy9DLFVBQU0scUJBQXFCLHNCQUFzQjtBQUNqRCw0QkFBd0IsVUFBVTtBQUNsQywwQkFBc0IsVUFBVTtBQUVoQyxXQUFPLHNCQUFzQixNQUFNO0FBQ2pDLFVBQUksa0JBQWtCLE1BQU07QUFDMUIsZUFBTyxTQUFTO0FBQUEsVUFDZCxLQUFLLEtBQUssSUFBSSxHQUFHLGNBQWM7QUFBQSxVQUMvQixVQUFVO0FBQUEsUUFDWixDQUFDO0FBQUEsTUFDSDtBQUVBLFVBQUksQ0FBQyxzQkFBc0IsQ0FBQyxxQkFBcUIsUUFBUztBQUUxRCxZQUFNLG9CQUFvQixtQkFBbUIsWUFBWTtBQUN6RCxZQUFNLGdCQUFnQixNQUFNO0FBQUEsUUFDMUIscUJBQXFCLFFBQVEsaUJBQThCLHFDQUFxQztBQUFBLE1BQ2xHO0FBQ0EsWUFBTSxlQUFlLGNBQWMsS0FBSyxDQUFDLFNBQVM7QUFDaEQsZUFBTyxTQUFTLEtBQUssUUFBUSxZQUFZLEVBQUUsWUFBWSxNQUFNO0FBQUEsTUFDL0QsQ0FBQztBQUNELFlBQU0sYUFBYSxjQUFjLGNBQTJCLDJCQUEyQjtBQUN2RixVQUFJLENBQUMsV0FBWTtBQUVqQixpQkFBVyxNQUFNLEVBQUUsZUFBZSxLQUFLLENBQUM7QUFBQSxJQUMxQyxDQUFDO0FBQUEsRUFDSCxHQUFHLENBQUMsV0FBVyxNQUFNLE1BQU0sQ0FBQztBQUU1QiwrQkFBVSxNQUFNO0FBQ2QsUUFBSSxDQUFDLDRCQUE0QixDQUFDLFVBQVc7QUFFN0MsVUFBTSxpQkFBaUIsQ0FBQyxVQUErQjtBQUNyRCxVQUFJLENBQUMsTUFBTSxhQUFhLENBQUMsc0NBQXNDLEVBQUc7QUFFbEUsWUFBTSxXQUFXLDBCQUEwQjtBQUMzQyxVQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsWUFBWSxDQUFDLFNBQVMsU0FBUztBQUMzRDtBQUFBLE1BQ0Y7QUFFQSwyQkFBcUIsY0FBYyxJQUFJLElBQUksYUFBYSxVQUFVO0FBQUEsUUFDaEUsWUFBWTtBQUFBLE1BQ2QsQ0FBQztBQUFBLElBQ0g7QUFFQSxXQUFPLGlCQUFpQixZQUFZLGNBQWM7QUFDbEQsV0FBTyxNQUFNO0FBQ1gsYUFBTyxvQkFBb0IsWUFBWSxjQUFjO0FBQUEsSUFDdkQ7QUFBQSxFQUNGLEdBQUcsQ0FBQyxhQUFhLFdBQVcsWUFBWSwwQkFBMEIsb0JBQW9CLENBQUM7QUFFdkYsK0JBQVUsTUFBTTtBQUNkLFVBQU0sa0JBQWtCLE1BQU07QUFDNUIsWUFBTSxXQUFXLENBQUM7QUFDbEIsd0JBQWtCO0FBQ2xCLFVBQUksVUFBVTtBQUNaLGVBQU8sU0FBUyxFQUFFLEtBQUssR0FBRyxVQUFVLFNBQVMsQ0FBQztBQUFBLE1BQ2hEO0FBQUEsSUFDRjtBQUVBLFVBQU0sWUFBWSxNQUFNO0FBQ3RCLFlBQU0sV0FBVywwQkFBMEI7QUFDM0MsVUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLFlBQVksQ0FBQyxVQUFVLFNBQVM7QUFDN0Q7QUFBQSxNQUNGO0FBQ0EsV0FBSyxTQUFTLGNBQWMsSUFBSSxJQUFJLGFBQWEsUUFBUTtBQUFBLElBQzNEO0FBRUEsV0FBTyxpQkFBaUIsaUNBQWlDLGVBQWU7QUFDeEUsV0FBTyxpQkFBaUIsMkJBQTJCLFNBQVM7QUFFNUQsV0FBTyxNQUFNO0FBQ1gsYUFBTyxvQkFBb0IsaUNBQWlDLGVBQWU7QUFDM0UsYUFBTyxvQkFBb0IsMkJBQTJCLFNBQVM7QUFBQSxJQUNqRTtBQUFBLEVBQ0YsR0FBRyxDQUFDLGFBQWEsWUFBWSxVQUFVLGFBQWEsaUJBQWlCLENBQUM7QUFFdEUsU0FDRSw4Q0FBQyxTQUFJLFdBQVUsYUFDYjtBQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxNQUFNLE1BQU07QUFBQSxRQUNaLE9BQU8sTUFBTTtBQUFBLFFBQ2IsU0FBUyxNQUFNO0FBQUEsUUFDZixhQUFhO0FBQUEsUUFDYixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixZQUFZLE1BQU07QUFBQSxRQUNsQixhQUFhLE1BQU07QUFBQSxRQUNuQixNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixXQUFXO0FBQUEsUUFDWCxVQUFVO0FBQUE7QUFBQSxJQUNaO0FBQUEsSUFFQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsS0FBSztBQUFBLFFBQ0wsTUFBSztBQUFBLFFBQ0wsUUFBUTtBQUFBLFFBQ1IsU0FBUTtBQUFBLFFBQ1IsV0FBVTtBQUFBLFFBQ1YsVUFBVSxDQUFDLFVBQVU7QUFDbkIsZ0JBQU0sT0FBTyxNQUFNLGNBQWMsUUFBUSxDQUFDLEtBQUs7QUFDL0MsZ0JBQU0sY0FBYyxRQUFRO0FBQzVCLGVBQUssbUJBQW1CLE1BQU0sUUFBUTtBQUFBLFFBQ3hDO0FBQUE7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsS0FBSztBQUFBLFFBQ0wsTUFBSztBQUFBLFFBQ0wsUUFBUTtBQUFBLFFBQ1IsV0FBVTtBQUFBLFFBQ1YsVUFBVSxDQUFDLFVBQVU7QUFDbkIsZ0JBQU0sT0FBTyxNQUFNLGNBQWMsUUFBUSxDQUFDLEtBQUs7QUFDL0MsZ0JBQU0sY0FBYyxRQUFRO0FBQzVCLGVBQUssbUJBQW1CLE1BQU0sU0FBUztBQUFBLFFBQ3pDO0FBQUE7QUFBQSxJQUNGO0FBQUEsSUFFQyxDQUFDLGNBQWMsbUJBQ2QsNkNBQUMsU0FBSSxXQUFVLHFGQUNiLHdEQUFDLFNBQUksV0FBVSw2RkFDYjtBQUFBLG1EQUFDLFFBQUcsV0FBVSw0Q0FDWCxlQUFLLHdDQUF3QyxjQUFjLEdBQzlEO0FBQUEsTUFDQSw2Q0FBQyxPQUFFLFdBQVUsK0JBQ1Y7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLE1BQ0YsR0FDRjtBQUFBLE1BRUEsOENBQUMsU0FBSSxXQUFVLCtCQUNiO0FBQUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLE1BQUs7QUFBQSxZQUNMLFdBQVU7QUFBQSxZQUNWLFNBQVMsTUFBTTtBQUNiLG1CQUFLLGlCQUFpQixlQUFlLE9BQU87QUFBQSxZQUM5QztBQUFBLFlBRUMsZUFBSyx5Q0FBeUMsZ0JBQWE7QUFBQTtBQUFBLFFBQzlEO0FBQUEsUUFDQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsV0FBVTtBQUFBLFlBQ1YsU0FBUyxNQUFNLGtCQUFrQixnQkFBZ0IsT0FBTztBQUFBLFlBRXZELGVBQUssMENBQTBDLGVBQWU7QUFBQTtBQUFBLFFBQ2pFO0FBQUEsUUFDQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsV0FBVTtBQUFBLFlBQ1YsU0FBUztBQUFBLFlBRVIsZUFBSyxpQkFBaUIsUUFBUTtBQUFBO0FBQUEsUUFDakM7QUFBQSxTQUNGO0FBQUEsT0FDRixHQUNGLElBQ0U7QUFBQSxJQUVILENBQUMsYUFDQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsTUFBTTtBQUFBLFFBQ04sT0FBTyxLQUFLLDBDQUEwQyxtQkFBbUI7QUFBQSxRQUN6RSxTQUFTLDhCQUE4QixLQUFLLGtCQUFrQixTQUFTO0FBQUEsUUFDdkUsV0FBVztBQUFBLFFBQ1gsUUFBUTtBQUFBO0FBQUEsSUFDVixJQUNFO0FBQUEsSUFFSCxDQUFDLGNBQWMsMEJBQ2Q7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQ0UsMEJBQ0ksZ0lBQ0E7QUFBQSxRQUdOO0FBQUEsdURBQUMsT0FBRyxtQ0FBd0I7QUFBQSxVQUMzQix1QkFDQztBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsV0FDRSwwQkFDSSx5SEFDQTtBQUFBLGNBR0wsd0JBQWMsb0JBQW9CO0FBQUE7QUFBQSxVQUNyQyxJQUNFO0FBQUEsVUFDSCxxQkFBcUIsU0FBUyxJQUM3QjtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsV0FDRSwwQkFDSSwyRkFDQTtBQUFBLGNBR0wsK0JBQXFCLElBQUksQ0FBQyxVQUN6Qiw2Q0FBQyxPQUFxQyxhQUFHLE1BQU0sSUFBSSxLQUFLLE1BQU0sT0FBTyxNQUE3RCxHQUFHLE1BQU0sSUFBSSxJQUFJLE1BQU0sRUFBRSxFQUF1QyxDQUN6RTtBQUFBO0FBQUEsVUFDSCxJQUNFO0FBQUEsVUFDSiw4Q0FBQyxTQUFJLFdBQVUsd0JBQ1o7QUFBQSxvQ0FDQztBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUNDLE1BQUs7QUFBQSxnQkFDTCxXQUFVO0FBQUEsZ0JBQ1YsU0FBUyxNQUFNO0FBQ2IsdUJBQUssbUJBQW1CO0FBQUEsZ0JBQzFCO0FBQUEsZ0JBRUMsZUFBSyx1Q0FBdUMsbUJBQW1CO0FBQUE7QUFBQSxZQUNsRSxJQUNFO0FBQUEsWUFDSiw2Q0FBQyxZQUFPLE1BQUssVUFBUyxXQUFVLHNDQUFxQyxTQUFTLHVCQUMzRSxlQUFLLGdCQUFnQixPQUFPLEdBQy9CO0FBQUEsYUFDRjtBQUFBO0FBQUE7QUFBQSxJQUNGLElBQ0U7QUFBQSxJQUVILGNBQ0MsNkNBQUMsU0FBSSxXQUFVLHlEQUNiLHVEQUFDLFNBQUksV0FBVSxxR0FDWix1QkFBYSxJQUFJLENBQUMsU0FDakI7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUVDLFdBQVU7QUFBQSxRQUVWO0FBQUEsd0RBQUMsVUFBSyxXQUFVLCtDQUErQztBQUFBLGlCQUFLO0FBQUEsWUFBTTtBQUFBLGFBQUM7QUFBQSxVQUMzRSw2Q0FBQyxVQUFLLFdBQVUsNkNBQTZDLGVBQUssT0FBTTtBQUFBO0FBQUE7QUFBQSxNQUpuRSxLQUFLO0FBQUEsSUFLWixDQUNELEdBQ0gsR0FDRixJQUNFO0FBQUEsSUFFSjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsTUFBTSxhQUFhLFNBQVM7QUFBQSxRQUM1QixTQUFTO0FBQUEsUUFDVDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0Esc0JBQXNCO0FBQUEsUUFDdEI7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxtQkFBbUI7QUFBQSxRQUNuQixzQkFBc0I7QUFBQSxRQUN0Qix1QkFBdUI7QUFBQSxRQUN2QixzQkFBc0I7QUFBQSxRQUN0Qix5QkFBeUI7QUFBQSxRQUN6Qiw2QkFBNkI7QUFBQSxRQUM3QjtBQUFBLFFBQ0E7QUFBQTtBQUFBLElBQ0Y7QUFBQSxJQUVDLGFBQ0MsOENBQUMsU0FBSSxXQUFVLG9CQUNaO0FBQUEsT0FBQyxxQkFDQSw2Q0FBQyxTQUFJLFdBQVUseUJBQXlCLGVBQUssOEJBQThCLGdCQUFnQixHQUFFLElBQzNGO0FBQUEsTUFFSCxzQkFBc0IscUJBQ3JCLDhDQUFDLFNBQUksV0FBVSxrREFDYjtBQUFBLHFEQUFDLG1CQUFRLE1BQUssV0FBVSxPQUFPLEtBQUssa0JBQWtCLFNBQVMsR0FBRztBQUFBLFFBQ2xFLDZDQUFDLFVBQU0sZUFBSyxrQkFBa0IsU0FBUyxHQUFFO0FBQUEsU0FDM0MsSUFDRTtBQUFBLE1BRUgsc0JBQXNCLENBQUMsc0JBQXNCLGdCQUM1Qyw4Q0FBQyxTQUFJLFdBQVUsa0RBQ2I7QUFBQSxxREFBQyxtQkFBUSxNQUFLLFdBQVUsT0FBTyxLQUFLLGtCQUFrQixTQUFTLEdBQUc7QUFBQSxRQUNsRSw2Q0FBQyxVQUFNLGVBQUssa0JBQWtCLFNBQVMsR0FBRTtBQUFBLFNBQzNDLElBQ0U7QUFBQSxNQUVILHNCQUFzQixDQUFDLHNCQUFzQixrQkFDNUMsNkNBQUMsU0FBSSxXQUFVLHlCQUNaLHFDQUNDLEtBQUsseUNBQXlDLDZEQUE2RCxHQUMvRyxJQUNFO0FBQUEsTUFFSCxzQkFBc0IsQ0FBQyxzQkFBc0IsQ0FBQyxtQkFBbUIsaUJBQ2hFLDZDQUFDLFNBQUksV0FBVSx5QkFBeUIsMEJBQWUsSUFDckQ7QUFBQSxNQUVILHNCQUFzQixDQUFDLHNCQUFzQixDQUFDLGtCQUM3Qyw2RUFDRSx3REFBQyxTQUFJLFdBQVUsZ0RBQ2I7QUFBQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsV0FBVTtBQUFBLFlBQ1YsU0FBUyxNQUFNO0FBQ2IsbUJBQUsseUJBQXlCO0FBQUEsWUFDaEM7QUFBQSxZQUNBLFVBQVUsb0NBQW9DLFFBQVE7QUFBQSxZQUVyRCxlQUFLLHFDQUFxQyxrQkFBa0I7QUFBQTtBQUFBLFFBQy9EO0FBQUEsUUFDQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsV0FBVTtBQUFBLFlBQ1YsU0FBUztBQUFBLFlBQ1QsVUFBVSxvQ0FBb0Msc0JBQXNCO0FBQUEsWUFFbkUsZUFBSyxvQ0FBb0MscUJBQWtCO0FBQUE7QUFBQSxRQUM5RDtBQUFBLFNBQ0YsR0FDRixJQUNFO0FBQUEsT0FDTixJQUNFO0FBQUEsSUFFSCxhQUFhLDZDQUFDLHdDQUE2QixRQUFRLGdCQUFnQixJQUFLO0FBQUEsSUFFekU7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVU7QUFBQSxRQUNWLE9BQU8sRUFBRSxTQUFTLGtCQUFrQixTQUFTLE9BQU87QUFBQSxRQUVwRDtBQUFBLHVEQUFDLFNBQUksV0FBVSxzQkFBcUIsU0FBUSxhQUFZLE1BQUssVUFBUyxjQUFZLEtBQUssa0JBQWtCLFNBQVMsR0FDaEgsdURBQUMsWUFBTyxXQUFVLHVCQUFzQixJQUFHLE1BQUssSUFBRyxNQUFLLEdBQUUsS0FBSSxhQUFZLEtBQUksR0FDaEY7QUFBQSxVQUNDLEtBQUssa0JBQWtCLFNBQVM7QUFBQTtBQUFBO0FBQUEsSUFDbkM7QUFBQSxJQUVDLGVBQWUsNkNBQUMsU0FBSSxXQUFVLGVBQWUsd0JBQWEsSUFBUztBQUFBLElBRW5FLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLE1BQU0sV0FBVyxJQUNyRCw2Q0FBQyxTQUFJLFdBQVUsK0JBQThCLG1CQUFpQixLQUFLLGlCQUFpQixTQUFTLEdBQUcsSUFDOUY7QUFBQSxJQUVILENBQUMsZ0JBQWdCLE1BQU0sU0FBUyxJQUMvQiw2Q0FBQyxTQUFJLEtBQUssc0JBQXNCLFdBQVUsZ0JBQ3ZDLGdCQUFNLElBQUksQ0FBQyxTQUFTO0FBQ25CLFlBQU0sU0FBUyxTQUFTLEtBQUssTUFBTTtBQUNuQyxZQUFNLFlBQVksdUJBQXVCLEtBQUssV0FBVyxVQUFVLGlCQUFpQixRQUFRLE9BQU87QUFDbkcsWUFBTSxRQUFRLFNBQVMsS0FBSyxXQUFXLEtBQUssU0FBUyxLQUFLLFFBQVEsS0FBSyxVQUFVO0FBQ2pGLFlBQU0sYUFBYSx5QkFBeUIsS0FBSyxlQUFlLE1BQU0seUJBQXlCO0FBQy9GLFlBQU0sYUFBYSxLQUFLLFNBQVMsWUFBWSxLQUFLLFNBQVM7QUFDM0QsWUFBTSxjQUFjLGVBQWUsT0FBTyxTQUFZLDRCQUE0QixVQUFVO0FBQzVGLFlBQU0sMkJBQTJCLGVBQWU7QUFDaEQsWUFBTSx3QkFBd0IsS0FBSyxrQkFBa0I7QUFDckQsWUFBTSx5QkFBeUIsY0FBYyx1QkFBdUIsSUFBSTtBQUN4RSxZQUFNLHVCQUF1QixjQUFjLHFCQUFxQixNQUFNO0FBQ3RFLFlBQU0scUJBQXFCLEtBQUssZ0NBQWdDLGlCQUFpQjtBQUNqRixZQUFNLG9CQUFvQixLQUFLLHdDQUF3QyxvQkFBb0I7QUFDM0YsWUFBTSxnQkFBZ0IsS0FBSyxjQUFjLE9BQU8sS0FBSyxPQUFPLEtBQUssU0FBUztBQUMxRSxZQUFNLGlCQUFpQixnQkFDbkIsa0JBQWtCLElBQUksYUFBYSxLQUFLLGdCQUN4QyxLQUFLLHVCQUF1QixLQUFLO0FBQ3JDLFlBQU0sZUFBZTtBQUNyQixZQUFNLGdCQUNKLFVBQ0EsR0FBRyxTQUFTLEtBQUssUUFBUSxDQUFDLElBQUksU0FBUyxLQUFLLFNBQVMsQ0FBQyxJQUFJLFNBQVMsS0FBSyxXQUFXLENBQUMsSUFBSSxPQUFPLEtBQUssZUFBZSxFQUFFLENBQUM7QUFFeEgsVUFBSSxjQUFjLEtBQUssU0FBUyxRQUFRO0FBQ3RDLGVBQ0U7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUVDO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBLFVBQVU7QUFBQSxZQUNWO0FBQUEsWUFDQSxZQUFZO0FBQUEsWUFDWixjQUFjO0FBQUEsWUFDZCxtQkFBbUIsZ0JBQWdCLHNCQUFzQjtBQUFBLFlBQ3pELGFBQWE7QUFBQSxZQUNiLGNBQWMsTUFBTSxpQkFBaUIsTUFBTTtBQUFBLFlBQzNDLGdCQUFnQixNQUFNLHNCQUFzQixJQUFJO0FBQUE7QUFBQSxVQVgzQztBQUFBLFFBWVA7QUFBQSxNQUVKO0FBRUEsWUFBTSxrQkFBa0IsNEJBQTRCLHdCQUNsRCw4RUFDRztBQUFBLG1DQUNDLDZDQUFDLFVBQUssV0FBVSxvQ0FBbUMsTUFBSyxPQUFNLGNBQVksYUFDeEUsdURBQUMsU0FBSSxPQUFNLDhCQUE2QixNQUFLLFFBQU8sU0FBUSxhQUFZLGFBQWEsS0FBSyxRQUFPLGdCQUFlLFdBQVUsVUFDeEg7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLGVBQWM7QUFBQSxZQUNkLGdCQUFlO0FBQUEsWUFDZixHQUFFO0FBQUE7QUFBQSxRQUNKLEdBQ0YsR0FDRixJQUNFO0FBQUEsUUFDSCx3QkFDQztBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsV0FBVTtBQUFBLFlBQ1YsTUFBSztBQUFBLFlBQ0wsY0FBWTtBQUFBLFlBRVosd0RBQUMsU0FBSSxPQUFNLDhCQUE2QixNQUFLLFFBQU8sU0FBUSxhQUFZLGFBQWEsS0FBSyxRQUFPLGdCQUFlLFdBQVUsVUFDeEg7QUFBQSwyREFBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsbUJBQWtCO0FBQUEsY0FDdkUsNkNBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLFdBQVU7QUFBQSxjQUMvRCw2Q0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsV0FBVTtBQUFBLGNBQy9ELDZDQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSxZQUFXO0FBQUEsY0FDaEUsNkNBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLFlBQVc7QUFBQSxlQUNsRTtBQUFBO0FBQUEsUUFDRixJQUNFO0FBQUEsU0FDTixJQUNFO0FBRUosYUFDRTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBRUMsV0FBVTtBQUFBLFVBQ1YsdUJBQXFCLFVBQVU7QUFBQSxVQUUvQjtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0M7QUFBQSxjQUNBO0FBQUEsY0FDQSxVQUFVO0FBQUEsY0FDVjtBQUFBLGNBQ0EsUUFBUSxNQUFNLGlCQUFpQixNQUFNO0FBQUEsY0FDckMsZ0JBQWU7QUFBQSxjQUNmO0FBQUEsY0FDQSxZQUFZO0FBQUEsY0FDWixxQkFBb0I7QUFBQTtBQUFBLFVBQ3RCO0FBQUE7QUFBQSxRQWRLO0FBQUEsTUFlUDtBQUFBLElBRUosQ0FBQyxHQUNILElBQ0U7QUFBQSxJQUVKO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBLFNBQVM7QUFBQSxRQUNULGNBQWMsQ0FBQyxTQUFTO0FBQ3RCLGdCQUFNLFdBQVcscUJBQXFCO0FBQ3RDLGNBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxZQUFZLENBQUMsVUFBVSxTQUFTO0FBQzdEO0FBQUEsVUFDRjtBQUVBLGVBQUssU0FBUyxNQUFNLFFBQVE7QUFBQSxRQUM5QjtBQUFBLFFBQ0EsUUFBUTtBQUFBO0FBQUEsSUFDVjtBQUFBLElBRUMsY0FBYyxzQkFBc0IsQ0FBQyxzQkFBc0IsQ0FBQyxrQkFDM0QsNkNBQUMsNkJBQWtCLFdBQVcsS0FBSyxzQ0FBc0Msb0JBQW9CLEdBQzNGO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFPLEtBQUssc0NBQXNDLG9CQUFvQjtBQUFBLFFBQ3RFLFNBQVM7QUFBQSxRQUNULFVBQVUsZ0JBQWdCLGlCQUFpQixzQkFBc0I7QUFBQTtBQUFBLElBQ25FLEdBQ0YsSUFDRTtBQUFBLElBRUgsbUJBQW1CLENBQUMsYUFDbkI7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVcsS0FBSyw2QkFBNkIscUJBQWtCO0FBQUEsUUFDL0QsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsZUFBZSxLQUFLLDZCQUE2QixxQkFBa0I7QUFBQSxRQUNuRSxXQUFXO0FBQUE7QUFBQSxJQUNiLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLHFCQUFxQixNQUFNO0FBQy9CLFNBQ0UsNkNBQUMsZ0NBQXFCLHlCQUF1QixNQUMzQyx1REFBQyw2QkFBMEIsR0FDN0I7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLHNCQUFzQjtBQUM3RCxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLHNCQUFtQixDQUFFO0FBQ2pEO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyw2QkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJub3JtYWxpemVGaWxlSWQiLCAibm9ybWFsaXplU2VsZWN0aW9uTW9kZSIsICJub3JtYWxpemVFeGNsdWRlZElkcyIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0IiwgImlzTGlua01vZGUiLCAiZnJvbURhdGUiLCAiY2FjaGVkU3RhdGUiXQp9Cg==
