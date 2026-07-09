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
} from "./chunks/chunk-ZI7HEKLS.js";
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
  buildExpenseSheetDetailUrl,
  clearExpenseTicketReturnContext,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-3FZNNGIE.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL0V4cGVuc2VUaWNrZXRzUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL3VzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlRWZmZWN0RXZlbnQsIHVzZUxheW91dEVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCBDb21wYWN0UGFnaW5hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24sIHsgdHlwZSBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IFBhZ2VCb3R0b21BY3Rpb25zLCB7IFBhZ2VCb3R0b21BY3Rpb25CdXR0b24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1BhZ2VCb3R0b21BY3Rpb25zLnRzeFwiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4XCI7XHJcbmltcG9ydCB7IHVzZUF1dGhDb250ZXh0LCB0eXBlIEF1dGhNYW5hZ2VkVXNlciB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcclxuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xyXG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlVGltZWxpbmVDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbS50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRMaW5rQnVsa1N1bW1hcnkgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeS50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5IGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheS50c3hcIjtcclxuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcclxuaW1wb3J0IHtcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgsXG4gIGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUsXG4gIGxpbmtFeHBlbnNlU2hlZXRUaWNrZXRzQnVsayxcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSwgc2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQWN0aW5nVXNlci50c1wiO1xyXG5pbXBvcnQgeyBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsIG5hdmlnYXRlVG9FeHBlbnNlVXJsLCBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VHYXN0b1R5cGVPcHRpb25zIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlR2FzdG9UeXBlQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcclxuaW1wb3J0IHtcclxuICBidWlsZEV4cGVuc2VTaGVldERldGFpbFVybCxcclxuICBjbGVhckV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgaGFzRXhwZW5zZVJldHVyblJlZmVycmVyLCBpc0V4cGVuc2VIaXN0b3J5QmFja0ZvcndhcmROYXZpZ2F0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VIaXN0b3J5TmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzLCBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIHNhZmVUZXh0LCBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93IH0gZnJvbSBcIi4uL2RldGFpbC91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cudHNcIjtcclxuaW1wb3J0IHsgVElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEUgfSBmcm9tIFwiLi4vZGV0YWlsL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvd0NvcmUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0xpc3REYXRhIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlLCB0eXBlIEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG4gIHJlYWRFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG4gIHNhdmVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgYnVpbGRFeHBlbnNlVGlja2V0TGlua0J1bGtGaWx0ZXJzIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VQYXlsb2FkQnVpbGRlcnMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0byB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXHJcbiAgRXhwZW5zZVRpY2tldExpbmtDYXJkLFxyXG4gIEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW0sXHJcbn0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbiB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWQudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldExpbmtTaGVldEdhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZS50c1wiO1xyXG5pbXBvcnQgeyBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5IGFzIHJldmVhbFRvcGJhckFjdGlvbkdyb3VwIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RvcGJhckFjdGlvblZpc2liaWxpdHkudHNcIjtcclxuXHJcbmNvbnN0IFBBR0VfU0laRSA9IDEwO1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVXNlcklkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XHJcblxyXG5jb25zdCBpc1NhbWVVc2VyID0gKGxlZnQ6IHN0cmluZywgcmlnaHQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRMZWZ0ID0gbm9ybWFsaXplVXNlcklkKGxlZnQpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFJpZ2h0ID0gbm9ybWFsaXplVXNlcklkKHJpZ2h0KS50b1VwcGVyQ2FzZSgpO1xyXG4gIHJldHVybiAhIW5vcm1hbGl6ZWRMZWZ0ICYmIG5vcm1hbGl6ZWRMZWZ0ID09PSBub3JtYWxpemVkUmlnaHQ7XHJcbn07XHJcblxyXG5jb25zdCBlbnN1cmVDdXJyZW50VXNlckluTGlzdCA9IChcbiAgdXNlcnM6IEF1dGhNYW5hZ2VkVXNlcltdLFxuICBjdXJyZW50QXhVc2VySWQ6IHN0cmluZyxcbiAgY3VycmVudFVzZXJOYW1lID0gXCJcIlxuKTogQXV0aE1hbmFnZWRVc2VyW10gPT4ge1xuICBjb25zdCBub3JtYWxpemVkQ3VycmVudCA9IG5vcm1hbGl6ZVVzZXJJZChjdXJyZW50QXhVc2VySWQpO1xuICBjb25zdCBub3JtYWxpemVkQ3VycmVudE5hbWUgPSBub3JtYWxpemVVc2VySWQoY3VycmVudFVzZXJOYW1lKTtcbiAgaWYgKCFub3JtYWxpemVkQ3VycmVudCkgcmV0dXJuIHVzZXJzO1xuICBpZiAodXNlcnMuc29tZSgoZW50cnkpID0+IGlzU2FtZVVzZXIoZW50cnkuYXhVc2VySWQsIG5vcm1hbGl6ZWRDdXJyZW50KSkpIHtcbiAgICByZXR1cm4gdXNlcnMubWFwKChlbnRyeSkgPT4ge1xuICAgICAgaWYgKCFpc1NhbWVVc2VyKGVudHJ5LmF4VXNlcklkLCBub3JtYWxpemVkQ3VycmVudCkpIHJldHVybiBlbnRyeTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmVudHJ5LFxuICAgICAgICBuYW1lOiBub3JtYWxpemVkQ3VycmVudE5hbWUgfHwgbm9ybWFsaXplVXNlcklkKGVudHJ5Lm5hbWUpIHx8IG5vcm1hbGl6ZWRDdXJyZW50LFxuICAgICAgICB1c2VyTmFtZTogbm9ybWFsaXplZEN1cnJlbnROYW1lIHx8IGVudHJ5LnVzZXJOYW1lLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIGNybVVzZXJJZDogbm9ybWFsaXplZEN1cnJlbnQsXG4gICAgICBheFVzZXJJZDogbm9ybWFsaXplZEN1cnJlbnQsXG4gICAgICBuYW1lOiBub3JtYWxpemVkQ3VycmVudE5hbWUgfHwgbm9ybWFsaXplZEN1cnJlbnQsXG4gICAgICB1c2VyTmFtZTogbm9ybWFsaXplZEN1cnJlbnROYW1lIHx8IHVuZGVmaW5lZCxcbiAgICB9LFxuICAgIC4uLnVzZXJzLFxuICBdO1xufTtcclxuXHJcbmNvbnN0IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbiA9IChyZXF1ZXN0ZWRVc2VySWQ6IHN0cmluZywgY3VycmVudEF4VXNlcklkOiBzdHJpbmcsIHVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFJlcXVlc3RlZCA9IG5vcm1hbGl6ZVVzZXJJZChyZXF1ZXN0ZWRVc2VySWQpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50ID0gbm9ybWFsaXplVXNlcklkKGN1cnJlbnRBeFVzZXJJZCk7XHJcbiAgaWYgKG5vcm1hbGl6ZWRSZXF1ZXN0ZWQpIHtcclxuICAgIGNvbnN0IGZvdW5kID0gdXNlcnMuZmluZCgoZW50cnkpID0+IGlzU2FtZVVzZXIoZW50cnkuYXhVc2VySWQsIG5vcm1hbGl6ZWRSZXF1ZXN0ZWQpKTtcclxuICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kLmF4VXNlcklkO1xyXG4gIH1cclxuICBpZiAobm9ybWFsaXplZEN1cnJlbnQpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZEN1cnJlbnQpKTtcclxuICAgIHJldHVybiBzZWxmPy5heFVzZXJJZCB8fCBub3JtYWxpemVkQ3VycmVudDtcclxuICB9XHJcbiAgcmV0dXJuIFwiXCI7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZExpbmtNb2RlSW5pdGlhbFNuYXBzaG90ID0gKG1hbmFnZWRVc2VySWQgPSBcIlwiKTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9PiB7XHJcbiAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xyXG4gIGNvbnN0IGZyb21EYXRlID0gbmV3IERhdGUodG9kYXkpO1xyXG4gIC8vIEtlZXAgYXV0b21hdGljIGxpbmstbW9kZSBsb2FkIGJvdW5kZWQgdG8gYXZvaWQgaGVhdnkgdXBzdHJlYW0gc2NhbnMuXHJcbiAgZnJvbURhdGUuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAyOSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBmcm9tRGF0ZTogdG9Jc29EYXRlKGZyb21EYXRlKSxcclxuICAgIHRvRGF0ZTogdG9Jc29EYXRlKHRvZGF5KSxcclxuICAgIGZpbHRlcktleTogXCJcIixcclxuICAgIGN1cnJlbmN5Q29kZTogXCJcIixcclxuICAgIG1hbmFnZWRVc2VySWQ6IG5vcm1hbGl6ZVVzZXJJZChtYW5hZ2VkVXNlcklkKSxcclxuICAgIHN0YXR1c0ZpbHRlcjogMCxcclxuICAgIGdhc3RvVHlwZUZpbHRlcjogXCJcIixcclxuICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXI6IFwiYWxsXCIsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVMaW5rTW9kZUJsb2NrZWRNZXNzYWdlID0gKGlzUGFpZDogYm9vbGVhbik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKGlzUGFpZCkge1xyXG4gICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9QYWlkUmVhZE9ubHlcIiwgXCJMYXMgaG9qYXMgZGUgZ2FzdG8gcGFnYWRhcyBzb24gZGUgc29sbyBsZWN0dXJhLlwiKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUmVhZE9ubHlCeVN0YXR1c1wiLCBcIk5vIHNlIHB1ZWRlIGVkaXRhciBlc3RhIGhvamEgZGUgZ2FzdG9zIGVuIGVsIGVzdGFkbyBhY3R1YWwuXCIpO1xyXG59O1xyXG5cclxuY29uc3QgRVhQRU5TRV9USUNLRVRTX0xPR19QUkVGSVggPSBcIltleHBlbnNlLXRpY2tldHNdXCI7XHJcblxyXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c0luZm8gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLmluZm8gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS5pbmZvKEVYUEVOU0VfVElDS0VUU19MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c1dhcm4gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLndhcm4gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS53YXJuKEVYUEVOU0VfVElDS0VUU19MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBWYWxpZGF0ZXMgd2hldGhlciBvbmUgdGlja2V0IGNhcmQgY2FuIHBhcnRpY2lwYXRlIGluIGJ1bGsgbGluayBtb2RlLlxyXG5jb25zdCBjYW5TZWxlY3RUaWNrZXRGb3JMaW5rID0gKGl0ZW06IEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW0pOiBib29sZWFuID0+IHtcclxuICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChpdGVtLmZpbGVJZCk7XHJcbiAgcmV0dXJuICEhZmlsZUlkO1xyXG59O1xyXG5cclxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxyXG5jb25zdCBib290c3RyYXBFeHBlbnNlQXBpQXV0aCA9ICgpID0+IHtcclxuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCh7XHJcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcclxuICAgIGVudHJhT2lkOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxyXG4gICAgYXBwQ29kZTogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgTmV3VGlja2V0SWNvbiA9ICgpID0+IChcclxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cInNpemUtNlwiPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTAgMjBoLTVhMiAyIDAgMCAxIC0yIC0ydi05YTIgMiAwIDAgMSAyIC0yaDFhMiAyIDAgMCAwIDIgLTJhMSAxIDAgMCAxIDEgLTFoNmExIDEgMCAwIDEgMSAxYTIgMiAwIDAgMCAyIDJoMWEyIDIgMCAwIDEgMiAydjJcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQuMzYyIDExLjE1YTMgMyAwIDEgMCAtNC4xNDQgNC4yNjNcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMjF2LTRhMiAyIDAgMSAxIDQgMHY0XCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDE5aDRcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMjEgMTV2NlwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBFeHBlbnNlVGlja2V0c1BhZ2VDb250ZW50ID0gKCkgPT4ge1xyXG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiVmlld1wiKTtcbiAgY29uc3QgY2FuQ3JlYXRlVGlja2V0ID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJBZGRcIik7XG4gIGNvbnN0IGNhbkxpbmtTaGVldExpbmVzID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJBZGRcIik7XG4gIGNvbnN0IFtyZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlLCBzZXRSZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiRVVSXCIpO1xuICBjb25zdCB7XHJcbiAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgY3VycmVudFVzZXJOYW1lLFxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgc3Vib3JkaW5hdGVzLFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgfSA9IHVzZUF1dGhDb250ZXh0KCk7XHJcbiAgY29uc3QgdGltZWxpbmVDb250YWluZXJSZWYgPSBSZWFjdC51c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBjYW1lcmFJbnB1dFJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgZ2FsbGVyeUlucHV0UmVmID0gUmVhY3QudXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBkaWRSZXN0b3JlT25Nb3VudFJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XHJcbiAgY29uc3QgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYgPSBSZWFjdC51c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmID0gUmVhY3QudXNlUmVmKFwiXCIpO1xyXG4gIGNvbnN0IGxpbmtNb2RlQ29udGV4dCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICBjb25zdCBhY3Rpb24gPSBzYWZlVGV4dCh1cmwuc2VhcmNoUGFyYW1zLmdldChcImFjdGlvblwiKSkudG9Mb3dlckNhc2UoKTtcclxuICAgIGNvbnN0IGhvamFHYXN0b3NJZCA9IHNhZmVUZXh0KHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwiaG9qYUdhc3Rvc0lkXCIpKTtcclxuICAgIGNvbnN0IGlzTGlua01vZGUgPSBhY3Rpb24gPT09IFwibGlua1wiICYmICEhaG9qYUdhc3Rvc0lkO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaXNMaW5rTW9kZSxcclxuICAgICAgc2hlZXRJZDogaG9qYUdhc3Rvc0lkLFxyXG4gICAgICBzaGVldE9yaWdpbjogaXNMaW5rTW9kZSA/IChcInNoZWV0LWxpbmtcIiBhcyBjb25zdCkgOiAoISFob2phR2FzdG9zSWQgPyAoXCJzaGVldC1jcmVhdGVcIiBhcyBjb25zdCkgOiBudWxsKSxcclxuICAgICAgZml4ZWRTdGF0dXNGaWx0ZXI6IGlzTGlua01vZGUgPyAoMCBhcyBjb25zdCkgOiBudWxsLFxyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGlzTGlua01vZGUgPSBsaW5rTW9kZUNvbnRleHQuaXNMaW5rTW9kZTtcclxuICBjb25zdCBsaW5rU2hlZXRJZCA9IGxpbmtNb2RlQ29udGV4dC5zaGVldElkO1xyXG4gIGNvbnN0IHNoZWV0Q2FsbGVyT3JpZ2luID0gbGlua01vZGVDb250ZXh0LnNoZWV0T3JpZ2luO1xyXG4gIGNvbnN0IGhhc1NoZWV0Q2FsbGVyQ29udGV4dCA9ICEhbGlua1NoZWV0SWQgJiYgISFzaGVldENhbGxlck9yaWdpbjtcclxuICBjb25zdCBmaXhlZFN0YXR1c0ZpbHRlciA9IGxpbmtNb2RlQ29udGV4dC5maXhlZFN0YXR1c0ZpbHRlcjtcclxuICBjb25zdCBjYW5Qcm9jZXNzTGlua01vZGUgPSAhaXNMaW5rTW9kZSB8fCBjYW5MaW5rU2hlZXRMaW5lcztcclxuICBjb25zdCBtYW5hZ2VkVXNlcnMgPSB1c2VNZW1vKFxuICAgICgpID0+IGVuc3VyZUN1cnJlbnRVc2VySW5MaXN0KEFycmF5LmlzQXJyYXkoc3Vib3JkaW5hdGVzKSA/IHN1Ym9yZGluYXRlcyA6IFtdLCBjdXJyZW50QXhVc2VySWQsIGN1cnJlbnRVc2VyTmFtZSksXG4gICAgW2N1cnJlbnRBeFVzZXJJZCwgY3VycmVudFVzZXJOYW1lLCBzdWJvcmRpbmF0ZXNdXG4gICk7XG4gIGNvbnN0IGRlZmF1bHRNYW5hZ2VkVXNlcklkID0gdXNlTWVtbyhcclxuICAgICgpID0+IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbihjdXJyZW50QXhVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzKSxcclxuICAgIFtjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vyc11cclxuICApO1xyXG4gIGNvbnN0IHNob3dNYW5hZ2VkVXNlckZpbHRlciA9IGlzTGlua01vZGUgJiYgY2FuTWFuYWdlT3RoZXJVc2VycztcclxuXHJcbiAgLy8gS2VlcHMgbGluay1tb2RlIGxpc3QgcXVlcmllcyBib3VuZGVkIGV2ZW4gd2hlbiBVSSBmaWx0ZXJzIGFyZSBjbGVhcmVkLlxyXG4gIGNvbnN0IG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0+IHtcclxuICAgICAgaWYgKCFpc0xpbmtNb2RlKSByZXR1cm4gc25hcHNob3Q7XHJcblxyXG4gICAgICBjb25zdCBmYWxsYmFjayA9IGJ1aWxkTGlua01vZGVJbml0aWFsU25hcHNob3Qoc25hcHNob3QubWFuYWdlZFVzZXJJZCk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRGcm9tRGF0ZSA9IHNhZmVUZXh0KHNuYXBzaG90LmZyb21EYXRlKSB8fCBmYWxsYmFjay5mcm9tRGF0ZTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZFRvRGF0ZSA9IHNhZmVUZXh0KHNuYXBzaG90LnRvRGF0ZSkgfHwgZmFsbGJhY2sudG9EYXRlO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCA9IG5vcm1hbGl6ZVVzZXJJZChzbmFwc2hvdC5tYW5hZ2VkVXNlcklkKSB8fCBmYWxsYmFjay5tYW5hZ2VkVXNlcklkO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zbmFwc2hvdCxcclxuICAgICAgICBmcm9tRGF0ZTogbm9ybWFsaXplZEZyb21EYXRlLFxyXG4gICAgICAgIHRvRGF0ZTogbm9ybWFsaXplZFRvRGF0ZSxcclxuICAgICAgICBtYW5hZ2VkVXNlcklkOiBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgICBzdGF0dXNGaWx0ZXI6IDAsXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgW2lzTGlua01vZGVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgW2xpbmtGbG93QnVzeSwgc2V0TGlua0Zsb3dCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbGlua0Zsb3dTdGF0dXMsIHNldExpbmtGbG93U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtsaW5rRmxvd0Vycm9yLCBzZXRMaW5rRmxvd0Vycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtzZWxlY3RBbGxCdXN5LCBzZXRTZWxlY3RBbGxCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2VsZWN0QWxsRXJyb3IsIHNldFNlbGVjdEFsbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtsaW5rQnVsa1Jlc3VsdCwgc2V0TGlua0J1bGtSZXN1bHRdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXN1bHREdG8gfCBudWxsPihudWxsKTtcclxuXHJcbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiAoe1xyXG4gICAgICBmaXJzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9GaXJzdFwiLCBcIkZpcnN0XCIpLFxyXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcclxuICAgICAgbmV4dDogaW5kVChcIkhpc3RvcnlfUGFnZV9OZXh0XCIsIFwiTmV4dFwiKSxcclxuICAgICAgbGFzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKSxcclxuICAgIH0pLFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGdhc3RvVHlwZU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4gZ2V0RXhwZW5zZUdhc3RvVHlwZU9wdGlvbnMoKSwgW10pO1xyXG5cclxuICBjb25zdCBnYXN0b1R5cGVMYWJlbE1hcCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcclxuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIGdhc3RvVHlwZU9wdGlvbnMpIHtcclxuICAgICAgbWFwLnNldChTdHJpbmcob3B0aW9uLnZhbHVlKSwgb3B0aW9uLnRleHQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1hcDtcclxuICB9LCBbZ2FzdG9UeXBlT3B0aW9uc10pO1xyXG5cclxuICBjb25zdCB7XHJcbiAgICBpdGVtcyxcclxuICAgIHRvdGFsLFxyXG4gICAgY3VycmVudFBhZ2UsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBsb2FkTGlzdCxcclxuICAgIHJlc3RvcmVMaXN0U25hcHNob3QsXHJcbiAgICByZXNldExpc3QsXHJcbiAgICBjbGVhckxpc3RDYWNoZSxcclxuICB9ID0gdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YSh7XHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBwYWdlU2l6ZTogUEFHRV9TSVpFLFxyXG4gICAgbW9kZTogaXNMaW5rTW9kZSA/IFwibGlua1wiIDogXCJnZW5lcmFsXCIsXHJcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICB9KTtcclxuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgY29uc3VtZVJldHVybkZsYWcsIGNvbnN1bWVSZXR1cm5Nb2RlLCBzYXZlQ2FjaGVkU3RhdGUsIGNsZWFyQ2FjaGVkU3RhdGUgfSA9IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUoKTtcclxuICBjb25zdCB7XHJcbiAgICBzZWxlY3Rpb25Nb2RlLFxyXG4gICAgc2VsZWN0ZWRUaWNrZXRzLFxyXG4gICAgZXhjbHVkZWRJZHMsXHJcbiAgICBmaWx0ZXJlZFNuYXBzaG90LFxyXG4gICAgZmlsdGVyZWRUb3RhbENvdW50LFxyXG4gICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSxcclxuICAgIGlzU2VsZWN0ZWQ6IGlzTGlua1RpY2tldFNlbGVjdGVkLFxyXG4gICAgdG9nZ2xlVGlja2V0OiB0b2dnbGVMaW5rVGlja2V0U2VsZWN0aW9uLFxyXG4gICAgY2xlYXJTZWxlY3Rpb246IGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbixcclxuICAgIHJlc3RvcmVTZWxlY3Rpb246IHJlc3RvcmVMaW5rVGlja2V0U2VsZWN0aW9uLFxyXG4gICAgc2VsZWN0QWxsQnlGaWx0ZXJzLFxyXG4gICAgaHlkcmF0ZVZpc2libGVUaWNrZXRzLFxyXG4gICAgcmVzb2x2ZVNlbGVjdGVkQ291bnQsXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uKCk7XHJcbiAgY29uc3Qgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soXHJcbiAgICAocmVxdWVzdGVkVXNlcklkOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gICAgICBjb25zdCByZXNvbHZlZFVzZXJJZCA9IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbihyZXF1ZXN0ZWRVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzKTtcclxuICAgICAgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkKHJlc29sdmVkVXNlcklkKTtcclxuICAgICAgaWYgKCFyZXNvbHZlZFVzZXJJZCB8fCAoY3VycmVudEF4VXNlcklkICYmIGlzU2FtZVVzZXIocmVzb2x2ZWRVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCkpKSB7XHJcbiAgICAgICAgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZShyZXNvbHZlZFVzZXJJZCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlc29sdmVkVXNlcklkO1xyXG4gICAgfSxcclxuICAgIFtjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vycywgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkXVxyXG4gICk7XHJcbiAgY29uc3Qge1xyXG4gICAgbGlua1NoZWV0TG9ja2VkLFxyXG4gICAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UsXHJcbiAgICBsaW5rU2hlZXRDaGVja0J1c3ksXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlKHtcclxuICAgIGlzTGlua01vZGUsXHJcbiAgICBsaW5rU2hlZXRJZCxcclxuICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHJlc29sdmVCbG9ja2VkTWVzc2FnZTogcmVzb2x2ZUxpbmtNb2RlQmxvY2tlZE1lc3NhZ2UsXHJcbiAgfSk7XHJcbiAgY29uc3QgeyBydW5BdXRvbWF0aWNMaXN0TG9hZCB9ID0gdXNlRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWQoe1xyXG4gICAgaXNMaW5rTW9kZSxcclxuICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcclxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcclxuICAgIGxpbmtTaGVldExvY2tlZCxcclxuICAgIGNsZWFyTGlzdENhY2hlLFxyXG4gICAgcmVzZXRMaXN0LFxyXG4gICAgbG9hZExpc3QsXHJcbiAgfSk7XHJcbiAgY29uc3QgYnVpbGRJbml0aWFsTGlua01vZGVTbmFwc2hvdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGluaXRpYWxNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcclxuICAgIHJldHVybiBidWlsZExpbmtNb2RlSW5pdGlhbFNuYXBzaG90KGluaXRpYWxNYW5hZ2VkVXNlcklkKTtcclxuICB9LCBbZGVmYXVsdE1hbmFnZWRVc2VySWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xyXG5cclxuICBjb25zdCBidWlsZEluaXRpYWxTdGFuZGFyZFNuYXBzaG90ID0gdXNlQ2FsbGJhY2soKCk6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgPT4ge1xyXG4gICAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xyXG4gICAgY29uc3QgZnJvbURhdGUgPSBuZXcgRGF0ZSh0b2RheSk7XHJcbiAgICBmcm9tRGF0ZS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDg5KTtcclxuICAgIGNvbnN0IGluaXRpYWxNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBmcm9tRGF0ZTogdG9Jc29EYXRlKGZyb21EYXRlKSxcclxuICAgICAgdG9EYXRlOiB0b0lzb0RhdGUodG9kYXkpLFxyXG4gICAgICBmaWx0ZXJLZXk6IFwiXCIsXHJcbiAgICAgIGN1cnJlbmN5Q29kZTogXCJcIixcclxuICAgICAgbWFuYWdlZFVzZXJJZDogaW5pdGlhbE1hbmFnZWRVc2VySWQsXHJcbiAgICAgIHN0YXR1c0ZpbHRlcjogXCJcIixcclxuICAgICAgZ2FzdG9UeXBlRmlsdGVyOiBcIlwiLFxyXG4gICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyOiBcImFsbFwiLFxyXG4gICAgfTtcclxuICB9LCBbZGVmYXVsdE1hbmFnZWRVc2VySWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xyXG5cclxuICBjb25zdCB7XHJcbiAgICBmcm9tRGF0ZSxcclxuICAgIHRvRGF0ZSxcclxuICAgIGZpbHRlcktleSxcclxuICAgIGN1cnJlbmN5Q29kZSxcclxuICAgIG1hbmFnZWRVc2VySWQsXHJcbiAgICBzdGF0dXNGaWx0ZXIsXHJcbiAgICBnYXN0b1R5cGVGaWx0ZXIsXHJcbiAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxyXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXHJcbiAgICBzaG93TWFudWFsRGF0ZUZpbHRlcixcclxuICAgIHNob3dNYW51YWxEYXRlRXJyb3IsXHJcbiAgICBtYW51YWxEYXRlQXV0b09wZW5LZXksXHJcbiAgICBhcHBsaWVkRmlsdGVycyxcclxuICAgIHNob3dGaWx0ZXJzLFxyXG4gICAgY3VycmVudEZpbHRlcnMsXHJcbiAgICBzZXRGaWx0ZXJLZXksXHJcbiAgICBzZXRDdXJyZW5jeUNvZGUsXHJcbiAgICBzZXRNYW5hZ2VkVXNlcklkLFxyXG4gICAgc2V0U3RhdHVzRmlsdGVyLFxyXG4gICAgc2V0R2FzdG9UeXBlRmlsdGVyLFxyXG4gICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICAgIG9uQXBwbHksXHJcbiAgICBvbkNsZWFyLFxyXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxyXG4gICAgb25EYXRlUmFuZ2VDaGFuZ2UsXHJcbiAgICBvbk1hbnVhbFJhbmdlQ29tcGxldGUsXHJcbiAgICBvblF1aWNrRmlsdGVyQ2hhbmdlLFxyXG4gICAgdG9nZ2xlRmlsdGVyUGFuZWwsXHJcbiAgICBzdGF0dXNGaWx0ZXJMb2NrZWQsXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlKHtcclxuICAgIGRlZmF1bHRNYW5hZ2VkVXNlcklkLFxyXG4gICAgZml4ZWRTdGF0dXNGaWx0ZXIsXHJcbiAgICBhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5OiBpc0xpbmtNb2RlLFxyXG4gICAgb25BcHBseUZpbHRlcnM6IChzbmFwc2hvdCkgPT4ge1xyXG4gICAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcclxuICAgICAgY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgIGNvbnN0IHJlc29sdmVkTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihzbmFwc2hvdC5tYW5hZ2VkVXNlcklkKTtcclxuICAgICAgdm9pZCBsb2FkTGlzdChcclxuICAgICAgICAxLFxyXG4gICAgICAgIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKHtcclxuICAgICAgICAgIC4uLnNuYXBzaG90LFxyXG4gICAgICAgICAgbWFuYWdlZFVzZXJJZDogcmVzb2x2ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgb25DbGVhckZpbHRlcnM6ICgpID0+IHtcclxuICAgICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XHJcbiAgICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbigpO1xyXG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XHJcbiAgICAgIGlmIChpc0xpbmtNb2RlKSB7XHJcbiAgICAgICAgY29uc3QgbGlua1NuYXBzaG90ID0gYnVpbGRJbml0aWFsTGlua01vZGVTbmFwc2hvdCgpO1xyXG4gICAgICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhsaW5rU25hcHNob3QpO1xyXG4gICAgICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkKDEsIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKGxpbmtTbmFwc2hvdCksIHtcclxuICAgICAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXHJcbiAgICAgICAgICByZXNldEJlZm9yZUxvYWQ6IHRydWUsXHJcbiAgICAgICAgICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVzZXRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGN1cnJlbnRBeFVzZXJJZCk7XHJcbiAgICAgIHNldE1hbmFnZWRVc2VySWQocmVzZXRNYW5hZ2VkVXNlcklkKTtcclxuICAgICAgcmVzZXRMaXN0KFwiY2xlYXItZmlsdGVyc1wiKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQgPSBub3JtYWxpemVVc2VySWQoZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xyXG4gICAgaWYgKCFub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQpIHJldHVybjtcclxuICAgIHNldE1hbmFnZWRVc2VySWQobm9ybWFsaXplZERlZmF1bHRNYW5hZ2VkVXNlcklkKTtcclxuICAgIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQpO1xyXG4gIH0sIFtkZWZhdWx0TWFuYWdlZFVzZXJJZCwgc2V0TWFuYWdlZFVzZXJJZCwgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoY2FuTWFuYWdlT3RoZXJVc2VycykgcmV0dXJuO1xyXG4gICAgY29uc3QgZmFsbGJhY2tNYW5hZ2VkVXNlcklkID0gcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uKGN1cnJlbnRBeFVzZXJJZCwgY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnMpO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnRNYW5hZ2VkVXNlcklkID0gbm9ybWFsaXplVXNlcklkKG1hbmFnZWRVc2VySWQpO1xyXG4gICAgaWYgKGlzU2FtZVVzZXIobm9ybWFsaXplZEN1cnJlbnRNYW5hZ2VkVXNlcklkLCBmYWxsYmFja01hbmFnZWRVc2VySWQpKSByZXR1cm47XHJcbiAgICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW50TWFuYWdlZFVzZXJJZCAmJiAhZmFsbGJhY2tNYW5hZ2VkVXNlcklkKSByZXR1cm47XHJcblxyXG4gICAgc2V0TWFuYWdlZFVzZXJJZChmYWxsYmFja01hbmFnZWRVc2VySWQpO1xyXG4gICAgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGZhbGxiYWNrTWFuYWdlZFVzZXJJZCk7XHJcbiAgfSwgW2Nhbk1hbmFnZU90aGVyVXNlcnMsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJJZCwgbWFuYWdlZFVzZXJzLCBzZXRNYW5hZ2VkVXNlcklkLCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb25dKTtcclxuXHJcbiAgY29uc3Qge1xyXG4gICAgc291cmNlUGlja2VyT3BlbixcclxuICAgIGJ1c3k6IHF1aWNrVGlja2V0QnVzeSxcclxuICAgIHByb2dyZXNzTWVzc2FnZTogcXVpY2tUaWNrZXRQcm9ncmVzc01lc3NhZ2UsXHJcbiAgICBwcm9ncmVzc1N0YWdlczogcXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlcyxcclxuICAgIHByb2dyZXNzRWxhcHNlZE1zOiBxdWlja1RpY2tldEVsYXBzZWRNcyxcclxuICAgIGVycm9yTWVzc2FnZTogcXVpY2tUaWNrZXRFcnJvck1lc3NhZ2UsXHJcbiAgICBhdHRlbXB0SWQ6IHF1aWNrVGlja2V0QXR0ZW1wdElkLFxyXG4gICAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5LFxyXG4gICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmUsXHJcbiAgICB0cmFjZUxpc3Q6IHF1aWNrVGlja2V0VHJhY2VMaXN0LFxyXG4gICAgb3BlblNvdXJjZVBpY2tlcixcclxuICAgIGNsb3NlU291cmNlUGlja2VyLFxyXG4gICAgc2VsZWN0RnJvbUNhbWVyYSxcclxuICAgIHNlbGVjdEZyb21HYWxsZXJ5LFxyXG4gICAgaGFuZGxlU2VsZWN0ZWRGaWxlLFxyXG4gICAgcmV0cnlQZW5kaW5nVXBsb2FkLFxyXG4gICAgY2xlYXJFcnJvcjogY2xlYXJRdWlja1RpY2tldEVycm9yLFxyXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3coe1xyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogIWlzTGlua01vZGUgJiYgY2FuQ3JlYXRlVGlja2V0LFxyXG4gICAgaXNDcmVhdGVNb2RlOiBmYWxzZSxcclxuICAgIGlzU2hlZXRMb2NrZWQ6IGZhbHNlLFxyXG4gICAgbGlua1RvU2hlZXQ6IGZhbHNlLFxyXG4gICAgYXhVc2VySWRPdmVycmlkZTogc2FmZVRleHQoY3VycmVudEF4VXNlcklkKSxcclxuICAgIGN1cnJlbmN5Q29kZTogY3VycmVuY3lDb2RlIHx8IFwiRVVSXCIsXHJcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICAgIG9uQ29tcGxldGVkOiAocmVzdWx0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNyZWF0ZWRGaWxlSWQgPSBzYWZlVGV4dChyZXN1bHQ/LmZpbGVJZCk7XHJcbiAgICAgIGlmICghY3JlYXRlZEZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgaWYgKGhhc1NoZWV0Q2FsbGVyQ29udGV4dCAmJiBzaGVldENhbGxlck9yaWdpbikge1xyXG4gICAgICAgIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCh7XHJcbiAgICAgICAgICBmaWxlSWQ6IGNyZWF0ZWRGaWxlSWQsXHJcbiAgICAgICAgICBzaGVldElkOiBsaW5rU2hlZXRJZCxcclxuICAgICAgICAgIG9yaWdpbjogc2hlZXRDYWxsZXJPcmlnaW4sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICAgIGZpbGVJZDogY3JlYXRlZEZpbGVJZCxcclxuICAgICAgICAgIG1vZGU6IFwiZWRpdFwiLFxyXG4gICAgICAgICAgb3JpZ2luOiBzaGVldENhbGxlck9yaWdpbixcclxuICAgICAgICAgIHNoZWV0SWQ6IGxpbmtTaGVldElkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoKTtcclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsP2ZpbGVJZD0ke2VuY29kZVVSSUNvbXBvbmVudChjcmVhdGVkRmlsZUlkKX0mbW9kZT1lZGl0Jm9yaWdpbj10aWNrZXQtY3JlYXRlYCwge1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZmFiTWVudUl0ZW1zID0gdXNlTWVtbzxGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW10+KFxyXG4gICAgKCkgPT5cclxuICAgICAgaXNMaW5rTW9kZVxyXG4gICAgICAgID8gW11cclxuICAgICAgICA6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGlkOiBcIm5ldy10aWNrZXRcIixcclxuICAgICAgICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX05ld1RpY2tldFwiLCBcIk51ZXZvIFRpY2tldFwiKSxcclxuICAgICAgICAgICAgICBpY29uOiA8TmV3VGlja2V0SWNvbiAvPixcclxuICAgICAgICAgICAgICBvbkNsaWNrOiBvcGVuU291cmNlUGlja2VyLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgXSxcclxuICAgIFtpc0xpbmtNb2RlLCBvcGVuU291cmNlUGlja2VyXVxyXG4gICk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRUaWNrZXRDb3VudCA9IHJlc29sdmVTZWxlY3RlZENvdW50KHRvdGFsKTtcbiAgY29uc3Qgc2VsZWN0ZWRUb3RhbEFtb3VudFRleHQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBsZXQgdG90YWxBbW91bnQgPSAwO1xuXG4gICAgc2VsZWN0ZWRUaWNrZXRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGFtb3VudCA9IE51bWJlcihpdGVtLnRvdGFsQW1vdW50ID8/IDApO1xuICAgICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUoYW1vdW50KSkgcmV0dXJuO1xuICAgICAgdG90YWxBbW91bnQgKz0gYW1vdW50O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSh0b3RhbEFtb3VudCwgcmVpbWJ1cnNlbWVudEN1cnJlbmN5Q29kZSk7XG4gIH0sIFtyZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlLCBzZWxlY3RlZFRpY2tldHNdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2U7XG5cbiAgICBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlKClcbiAgICAgIC50aGVuKChjdXJyZW5jeSkgPT4ge1xuICAgICAgICBpZiAoY2FuY2VsbGVkKSByZXR1cm47XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW5jeSA9IHNhZmVUZXh0KGN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBpZiAobm9ybWFsaXplZEN1cnJlbmN5KSB7XG4gICAgICAgICAgc2V0UmVpbWJ1cnNlbWVudEN1cnJlbmN5Q29kZShub3JtYWxpemVkQ3VycmVuY3kpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgLy8gS2VlcCB0aGUgZGVmYXVsdCBNU1QgbGFiZWwgaWYgdGhlIHVzZXIgY29udGV4dCBlbmRwb2ludCBpcyB1bmF2YWlsYWJsZS5cbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgfTtcbiAgfSwgW10pO1xuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xyXG4gICAgcmV2ZWFsVG9wYmFyQWN0aW9uR3JvdXAoXCJleHBlbnNlLXRpY2tldHMtbGlzdC1hY3Rpb25zXCIpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgbGlua01vZGVDYW5jZWxNZXNzYWdlID0gdXNlTWVtbyhcclxuICAgICgpID0+XHJcbiAgICAgIGluZFQoXHJcbiAgICAgICAgXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9DYW5jZWxDb25maXJtXCIsXHJcbiAgICAgICAgXCJTZSBjYW5jZWxhclx1MDBFMSBlbCBwcm9jZXNvIGRlIHZpbmN1bGFjaVx1MDBGM24geSB2b2x2ZXJcdTAwRTFzIGEgbGEgaG9qYSBkZSBnYXN0b3MuIFx1MDBCRlF1aWVyZXMgY29udGludWFyP1wiXHJcbiAgICAgICksXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGFwcGx5Q3JlYXRlZFRpY2tldFJldHVybiA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHRpY2tldEZpbGVJZDogc3RyaW5nLCB0aWNrZXREYXRlVmFsdWU6IHVua25vd24pID0+IHtcclxuICAgICAgY29uc3QgaW5pdGlhbFNuYXBzaG90ID0gYnVpbGRJbml0aWFsU3RhbmRhcmRTbmFwc2hvdCgpO1xyXG5cclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwiYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuOnN0YXJ0XCIsIHtcclxuICAgICAgICB0aWNrZXRGaWxlSWQsXHJcbiAgICAgICAgdGlja2V0RGF0ZVZhbHVlLFxyXG4gICAgICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgICAgICBpbml0aWFsU25hcHNob3QsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xyXG4gICAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMoaW5pdGlhbFNuYXBzaG90KTtcclxuICAgICAgY2xlYXJMaXN0Q2FjaGUoKTtcclxuICAgICAgcmVzZXRMaXN0KFwiY3JlYXRlZC10aWNrZXQtcmV0dXJuXCIpO1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJhcHBseUNyZWF0ZWRUaWNrZXRSZXR1cm46bG9hZExpc3RcIiwge1xyXG4gICAgICAgIHBhZ2U6IDEsXHJcbiAgICAgICAgaW5pdGlhbFNuYXBzaG90LFxyXG4gICAgICB9KTtcclxuICAgICAgdm9pZCBsb2FkTGlzdCgxLCBpbml0aWFsU25hcHNob3QpO1xyXG5cclxuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgIHVybC5zZWFyY2hQYXJhbXMuZGVsZXRlKFwidGlja2V0RmlsZUlkXCIpO1xyXG4gICAgICB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZShcInRpY2tldERhdGVcIik7XHJcbiAgICAgIGNvbnN0IGNsZWFuZWRRdWVyeSA9IHVybC5zZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcclxuICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBcIlwiLCBjbGVhbmVkUXVlcnkgPyBgJHt1cmwucGF0aG5hbWV9PyR7Y2xlYW5lZFF1ZXJ5fWAgOiB1cmwucGF0aG5hbWUpO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgYnVpbGRJbml0aWFsU3RhbmRhcmRTbmFwc2hvdCxcclxuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSxcclxuICAgICAgY2xlYXJMaXN0Q2FjaGUsXHJcbiAgICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgICAgbG9hZExpc3QsXHJcbiAgICAgIHJlc2V0TGlzdCxcclxuICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHJlc3RvcmVMaW5rTW9kZVJldHVyblN0YXRlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoY2FjaGVkU3RhdGU6IEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUpID0+IHtcclxuICAgICAgY29uc3QgcmVzdG9yZWRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGNhY2hlZFN0YXRlLmZpbHRlcnMubWFuYWdlZFVzZXJJZCk7XHJcbiAgICAgIGNvbnN0IHJlc3RvcmVkRmlsdGVycyA9IHtcclxuICAgICAgICAuLi5jYWNoZWRTdGF0ZS5maWx0ZXJzLFxyXG4gICAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhyZXN0b3JlZEZpbHRlcnMpO1xyXG4gICAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gY2FjaGVkU3RhdGUuc2Nyb2xsWTtcclxuICAgICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSBjYWNoZWRTdGF0ZS5mb2N1c0ZpbGVJZDtcclxuICAgICAgcmVzdG9yZUxpbmtUaWNrZXRTZWxlY3Rpb24oe1xyXG4gICAgICAgIHNlbGVjdGlvbk1vZGU6IGNhY2hlZFN0YXRlLnNlbGVjdGlvbk1vZGUsXHJcbiAgICAgICAgc2VsZWN0ZWRUaWNrZXRzOiBjYWNoZWRTdGF0ZS5zZWxlY3RlZFRpY2tldHMsXHJcbiAgICAgICAgZXhjbHVkZWRJZHM6IGNhY2hlZFN0YXRlLmV4Y2x1ZGVkSWRzLFxyXG4gICAgICAgIGZpbHRlcmVkU25hcHNob3Q6IGNhY2hlZFN0YXRlLmZpbHRlcmVkU2VsZWN0aW9uRmlsdGVycyxcclxuICAgICAgICBmaWx0ZXJlZFRvdGFsQ291bnQ6IGNhY2hlZFN0YXRlLmZpbHRlcmVkU2VsZWN0aW9uVG90YWwsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKGNhY2hlZFN0YXRlLml0ZW1zLmxlbmd0aCA+IDAgfHwgY2FjaGVkU3RhdGUudG90YWwgPiAwKSB7XHJcbiAgICAgICAgcmVzdG9yZUxpc3RTbmFwc2hvdCh7XHJcbiAgICAgICAgICBpdGVtczogY2FjaGVkU3RhdGUuaXRlbXMsXHJcbiAgICAgICAgICB0b3RhbDogY2FjaGVkU3RhdGUudG90YWwsXHJcbiAgICAgICAgICBwYWdlOiBjYWNoZWRTdGF0ZS5wYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBydW5BdXRvbWF0aWNMaXN0TG9hZChjYWNoZWRTdGF0ZS5wYWdlLCBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZChyZXN0b3JlZEZpbHRlcnMpLCB7XHJcbiAgICAgICAgY2xlYXJDYWNoZTogdHJ1ZSxcclxuICAgICAgICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkLFxyXG4gICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMsXHJcbiAgICAgIHJlc3RvcmVMaW5rVGlja2V0U2VsZWN0aW9uLFxyXG4gICAgICByZXN0b3JlTGlzdFNuYXBzaG90LFxyXG4gICAgICBydW5BdXRvbWF0aWNMaXN0TG9hZCxcclxuICAgICAgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHJlc3RvcmVJbml0aWFsTGlua01vZGVTdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGxpbmtTbmFwc2hvdCA9IGJ1aWxkSW5pdGlhbExpbmtNb2RlU25hcHNob3QoKTtcclxuICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcclxuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xyXG4gICAgY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uKCk7XHJcbiAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcclxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhsaW5rU25hcHNob3QpO1xyXG4gICAgcnVuQXV0b21hdGljTGlzdExvYWQoMSwgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQobGlua1NuYXBzaG90KSwge1xyXG4gICAgICBjbGVhckNhY2hlOiB0cnVlLFxyXG4gICAgICByZXNldEJlZm9yZUxvYWQ6IHRydWUsXHJcbiAgICAgIHdhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHk6IHRydWUsXHJcbiAgICB9KTtcclxuICB9LCBbXHJcbiAgICBidWlsZEluaXRpYWxMaW5rTW9kZVNuYXBzaG90LFxyXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSxcclxuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSxcclxuICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbixcclxuICAgIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkLFxyXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxyXG4gICAgcnVuQXV0b21hdGljTGlzdExvYWQsXHJcbiAgXSk7XHJcblxyXG4gIC8vIEFwcGxpZXMgZGVmYXVsdCBmaXJzdC1lbnRyeSBmaWx0ZXJzIGZvciB0aGUgc3RhbmRhcmQgdGlja2V0cyBsaXN0IG9ubHkuXHJcbiAgY29uc3QgcmVzdG9yZUluaXRpYWxTdGFuZGFyZFN0YXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgaW5pdGlhbFNuYXBzaG90ID0gYnVpbGRJbml0aWFsU3RhbmRhcmRTbmFwc2hvdCgpO1xyXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xyXG4gICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKCk7XHJcbiAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50ID0gXCJcIjtcclxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhpbml0aWFsU25hcHNob3QpO1xyXG4gICAgcnVuQXV0b21hdGljTGlzdExvYWQoMSwgaW5pdGlhbFNuYXBzaG90LCB7XHJcbiAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXHJcbiAgICAgIHJlc2V0QmVmb3JlTG9hZDogdHJ1ZSxcclxuICAgIH0pO1xyXG4gIH0sIFtcclxuICAgIGJ1aWxkSW5pdGlhbFN0YW5kYXJkU25hcHNob3QsXHJcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxyXG4gICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxyXG4gICAgcnVuQXV0b21hdGljTGlzdExvYWQsXHJcbiAgXSk7XHJcblxyXG4gIGNvbnN0IHJlc3RvcmVTdGFuZGFyZFJldHVyblN0YXRlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoY2FjaGVkU3RhdGU6IEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUpID0+IHtcclxuICAgICAgY29uc3QgcmVzdG9yZWRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGNhY2hlZFN0YXRlLmZpbHRlcnMubWFuYWdlZFVzZXJJZCk7XHJcbiAgICAgIGNvbnN0IHJlc3RvcmVkRmlsdGVycyA9IHtcclxuICAgICAgICAuLi5jYWNoZWRTdGF0ZS5maWx0ZXJzLFxyXG4gICAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhyZXN0b3JlZEZpbHRlcnMpO1xyXG4gICAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gY2FjaGVkU3RhdGUuc2Nyb2xsWTtcclxuICAgICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSBjYWNoZWRTdGF0ZS5mb2N1c0ZpbGVJZDtcclxuXHJcbiAgICAgIGlmIChjYWNoZWRTdGF0ZS5pdGVtcy5sZW5ndGggPiAwIHx8IGNhY2hlZFN0YXRlLnRvdGFsID4gMCkge1xyXG4gICAgICAgIHJlc3RvcmVMaXN0U25hcHNob3Qoe1xyXG4gICAgICAgICAgaXRlbXM6IGNhY2hlZFN0YXRlLml0ZW1zLFxyXG4gICAgICAgICAgdG90YWw6IGNhY2hlZFN0YXRlLnRvdGFsLFxyXG4gICAgICAgICAgcGFnZTogY2FjaGVkU3RhdGUucGFnZSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcnVuQXV0b21hdGljTGlzdExvYWQoY2FjaGVkU3RhdGUucGFnZSwgcmVzdG9yZWRGaWx0ZXJzLCB7XHJcbiAgICAgICAgY2xlYXJDYWNoZTogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW3Jlc3RvcmVBcHBsaWVkRmlsdGVycywgcmVzdG9yZUxpc3RTbmFwc2hvdCwgcnVuQXV0b21hdGljTGlzdExvYWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl1cclxuICApO1xyXG5cclxuICAvLyBLZWVwcyBkZWxldGUgcmV0dXJuIGV4cGxpY2l0OiBibGFuayBmaWx0ZXJzLCBvcGVuIHBhbmVsLCBhbmQgbm8gYXV0b21hdGljIHJlbG9hZC5cclxuICBjb25zdCByZXN0b3JlRGVsZXRlUmV0dXJuU3RhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjbGVhckNhY2hlZFN0YXRlKCk7XHJcbiAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoKTtcclxuICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uKCk7XHJcbiAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcclxuICAgIG9uQ2xlYXIoKTtcclxuICB9LCBbY2xlYXJDYWNoZWRTdGF0ZSwgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLCBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24sIG9uQ2xlYXJdKTtcclxuXHJcbiAgY29uc3QgdG9nZ2xlVGlja2V0U2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodGlja2V0OiBFeHBlbnNlVGlja2V0TGlzdFBhZ2VJdGVtKSA9PiB7XHJcbiAgICAgIGlmICghaXNMaW5rTW9kZSB8fCAhY2FuUHJvY2Vzc0xpbmtNb2RlIHx8IGxpbmtTaGVldENoZWNrQnVzeSB8fCBsaW5rU2hlZXRMb2NrZWQgfHwgbGlua0Zsb3dCdXN5KSByZXR1cm47XHJcbiAgICAgIGlmICh0aWNrZXQua2luZCAhPT0gXCJsaW5rXCIpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KHRpY2tldC5maWxlSWQpO1xyXG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xyXG4gICAgICBpZiAoIWNhblNlbGVjdFRpY2tldEZvckxpbmsodGlja2V0KSkgcmV0dXJuO1xyXG5cclxuICAgICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XHJcbiAgICAgIHRvZ2dsZUxpbmtUaWNrZXRTZWxlY3Rpb24odGlja2V0KTtcclxuICAgIH0sXHJcbiAgICBbY2FuUHJvY2Vzc0xpbmtNb2RlLCBpc0xpbmtNb2RlLCBsaW5rRmxvd0J1c3ksIGxpbmtTaGVldENoZWNrQnVzeSwgbGlua1NoZWV0TG9ja2VkLCB0b2dnbGVMaW5rVGlja2V0U2VsZWN0aW9uXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGNsZWFyVGlja2V0U2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0U2VsZWN0QWxsRXJyb3IoXCJcIik7XHJcbiAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcclxuICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbigpO1xyXG4gIH0sIFtjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb25dKTtcclxuXHJcbiAgY29uc3QgcmVzb2x2ZUFjdGl2ZUZpbHRlcnMgPSB1c2VDYWxsYmFjaygoKTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9PiB7XHJcbiAgICBjb25zdCBiYXNlU25hcHNob3QgPSBhcHBsaWVkRmlsdGVycyB8fCBjdXJyZW50RmlsdGVycztcclxuICAgIGNvbnN0IHJlc29sdmVkTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihiYXNlU25hcHNob3QubWFuYWdlZFVzZXJJZCk7XHJcbiAgICByZXR1cm4gbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQoe1xyXG4gICAgICAuLi5iYXNlU25hcHNob3QsXHJcbiAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc29sdmVkTWFuYWdlZFVzZXJJZCxcclxuICAgIH0pO1xyXG4gIH0sIFthcHBsaWVkRmlsdGVycywgY3VycmVudEZpbHRlcnMsIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkLCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb25dKTtcclxuICBjb25zdCByZXNvbHZlQWN0aXZlRmlsdGVyc0V2ZW50ID0gdXNlRWZmZWN0RXZlbnQocmVzb2x2ZUFjdGl2ZUZpbHRlcnMpO1xyXG5cclxuICAvLyBBY3RpdmF0ZXMgYmFja2VuZC1kcml2ZW4gZmlsdGVyZWQgc2VsZWN0aW9uIGZvciB0aGUgY3VycmVudCBmaWx0ZXIgc25hcHNob3QuXHJcbiAgY29uc3Qgc2VsZWN0QWxsTWF0Y2hpbmdUaWNrZXRzID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKCFpc0xpbmtNb2RlIHx8ICFjYW5Qcm9jZXNzTGlua01vZGUgfHwgbGlua1NoZWV0Q2hlY2tCdXN5IHx8IGxpbmtTaGVldExvY2tlZCB8fCBsaW5rRmxvd0J1c3kgfHwgc2VsZWN0QWxsQnVzeSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2VsZWN0QWxsQnVzeSh0cnVlKTtcclxuICAgIHNldFNlbGVjdEFsbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgYWN0aXZlRmlsdGVycyA9IHJlc29sdmVBY3RpdmVGaWx0ZXJzKCk7XHJcbiAgICAgIHNlbGVjdEFsbEJ5RmlsdGVycyhhY3RpdmVGaWx0ZXJzLCB0b3RhbCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiVGlja2V0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXRzLlwiKTtcclxuICAgICAgc2V0U2VsZWN0QWxsRXJyb3IobWVzc2FnZSk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRTZWxlY3RBbGxCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbXHJcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBpc0xpbmtNb2RlLFxyXG4gICAgbGlua0Zsb3dCdXN5LFxyXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gICAgbGlua1NoZWV0TG9ja2VkLFxyXG4gICAgcmVzb2x2ZUFjdGl2ZUZpbHRlcnMsXHJcbiAgICBzZWxlY3RBbGxCeUZpbHRlcnMsXHJcbiAgICBzZWxlY3RBbGxCdXN5LFxyXG4gICAgdG90YWwsXHJcbiAgXSk7XHJcblxyXG4gIC8vIEtlZXBzIHNlbGVjdGVkIGNhcmQgbWV0YWRhdGEgZnJlc2ggd2l0aCB0aGUgbGF0ZXN0IGxpc3QgcGF5bG9hZC5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc0xpbmtNb2RlIHx8IGl0ZW1zLmxlbmd0aCA8IDEpIHJldHVybjtcclxuICAgIGh5ZHJhdGVWaXNpYmxlVGlja2V0cyhpdGVtcy5maWx0ZXIoKGl0ZW0pOiBpdGVtIGlzIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCA9PiBpdGVtLmtpbmQgPT09IFwibGlua1wiKSk7XHJcbiAgfSwgW2h5ZHJhdGVWaXNpYmxlVGlja2V0cywgaXNMaW5rTW9kZSwgaXRlbXNdKTtcclxuXHJcbiAgY29uc3QgcnVuVGlja2V0TGlua0Zsb3cgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoIWlzTGlua01vZGUgfHwgIWxpbmtTaGVldElkIHx8IGxpbmtGbG93QnVzeSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAobGlua1NoZWV0TG9ja2VkIHx8ICFjYW5Qcm9jZXNzTGlua01vZGUpIHtcclxuICAgICAgY29uc3QgYmxvY2tlZE1lc3NhZ2UgPVxyXG4gICAgICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlIHx8XHJcbiAgICAgICAgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1JlYWRPbmx5QnlTdGF0dXNcIiwgXCJObyBzZSBwdWVkZSBlZGl0YXIgZXN0YSBob2phIGRlIGdhc3RvcyBlbiBlbCBlc3RhZG8gYWN0dWFsLlwiKTtcclxuICAgICAgc2V0TGlua0Zsb3dFcnJvcihibG9ja2VkTWVzc2FnZSk7XHJcbiAgICAgIHNldExpbmtGbG93U3RhdHVzKGJsb2NrZWRNZXNzYWdlKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0ZWRDb3VudCA9IHJlc29sdmVTZWxlY3RlZENvdW50KHRvdGFsKTtcclxuICAgIGlmIChzZWxlY3RlZENvdW50IDwgMSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWN0aXZlRmlsdGVycyA9IHJlc29sdmVBY3RpdmVGaWx0ZXJzKCk7XHJcbiAgICBjb25zdCByZXF1ZXN0QXhVc2VySWQgPSBzYWZlVGV4dChhY3RpdmVGaWx0ZXJzLm1hbmFnZWRVc2VySWQgfHwgY3VycmVudEF4VXNlcklkKTtcclxuXHJcbiAgICBzZXRMaW5rRmxvd0J1c3kodHJ1ZSk7XHJcbiAgICBzZXRMaW5rRmxvd0Vycm9yKFwiXCIpO1xyXG4gICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XHJcbiAgICBzZXRMaW5rRmxvd1N0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0xpbmtpbmdMaW5lXCIsIFwiTGlua2luZyBleHBlbnNlIGxpbmUuLi5cIikpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbGlua0V4cGVuc2VTaGVldFRpY2tldHNCdWxrKFxyXG4gICAgICAgIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmVcclxuICAgICAgICAgID8ge1xyXG4gICAgICAgICAgICAgIGV4cGVuc2VTaGVldElkOiBsaW5rU2hlZXRJZCxcclxuICAgICAgICAgICAgICBzZWxlY3Rpb25Nb2RlOiBcImZpbHRlcmVkXCIsXHJcbiAgICAgICAgICAgICAgZmlsdGVyczogYnVpbGRFeHBlbnNlVGlja2V0TGlua0J1bGtGaWx0ZXJzKGZpbHRlcmVkU25hcHNob3QgfHwgYWN0aXZlRmlsdGVycyksXHJcbiAgICAgICAgICAgICAgZXhjbHVkZWRJZHMsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIDoge1xyXG4gICAgICAgICAgICAgIGV4cGVuc2VTaGVldElkOiBsaW5rU2hlZXRJZCxcclxuICAgICAgICAgICAgICBzZWxlY3Rpb25Nb2RlOiBcInNlbGVjdGVkXCIsXHJcbiAgICAgICAgICAgICAgdGlja2V0SWRzOiBzZWxlY3RlZFRpY2tldHMuZmxhdE1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQoaXRlbS5maWxlSWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbGVJZCA/IFtmaWxlSWRdIDogW107XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICBheFVzZXJJZE92ZXJyaWRlOiByZXF1ZXN0QXhVc2VySWQgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuRGF0YSB8fCBudWxsO1xyXG4gICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgIGNvbnN0IGZhaWx1cmVNZXNzYWdlID0gcmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIik7XHJcbiAgICAgICAgc2V0TGlua0Zsb3dFcnJvcihmYWlsdXJlTWVzc2FnZSk7XHJcbiAgICAgICAgc2V0TGlua0Zsb3dTdGF0dXMoZmFpbHVyZU1lc3NhZ2UpO1xyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldExpbmtCdWxrUmVzdWx0KHJlc3VsdCk7XHJcblxyXG4gICAgICBpZiAocmVzdWx0LmxpbmtlZENvdW50ID4gMCkge1xyXG4gICAgICAgIGNsZWFyVGlja2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xyXG4gICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xyXG4gICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoKTtcclxuICAgICAgICBjb25zdCBzdWNjZXNzTWFyayA9IHJlc3VsdC5mYWlsZWRDb3VudCA+IDAgfHwgcmVzdWx0LnNraXBwZWRDb3VudCA+IDAgPyBcIndhcm5pbmdQcm9jZXNzXCIgOiBcIm9rUHJvY2Vzc1wiO1xyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhzdWNjZXNzTWFyaywgc3VjY2Vzc01hcmsgPT09IFwib2tQcm9jZXNzXCIgPyAxMjAwIDogMTUwMCk7XHJcbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwobGlua1NoZWV0SWQpLCB7XHJcbiAgICAgICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxyXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocmVzdWx0LmZhaWxlZENvdW50ID4gMCAmJiByZXN1bHQubGlua2VkQ291bnQgPCAxKSB7XHJcbiAgICAgICAgY29uc3QgZmFpbHVyZU1lc3NhZ2UgPSByZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcclxuICAgICAgICBzZXRMaW5rRmxvd1N0YXR1cyhmYWlsdXJlTWVzc2FnZSk7XHJcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICAgIGF3YWl0IGxvYWRMaXN0KGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSwgYWN0aXZlRmlsdGVycyk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyZXN1bHQuZmFpbGVkQ291bnQgPiAwIHx8IHJlc3VsdC5za2lwcGVkQ291bnQgPiAwKSB7XHJcbiAgICAgICAgc2V0TGlua0Zsb3dTdGF0dXMocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIikpO1xyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIndhcm5pbmdQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICAgIGF3YWl0IGxvYWRMaXN0KGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSwgYWN0aXZlRmlsdGVycyk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldExpbmtGbG93U3RhdHVzKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tQcm9jZXNzXCIsIDEyMDApO1xyXG4gICAgICBhd2FpdCBsb2FkTGlzdChjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsIGFjdGl2ZUZpbHRlcnMpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnN0IGZhaWx1cmVNZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIik7XHJcbiAgICAgIHNldExpbmtGbG93RXJyb3IoZmFpbHVyZU1lc3NhZ2UpO1xyXG4gICAgICBzZXRMaW5rRmxvd1N0YXR1cyhmYWlsdXJlTWVzc2FnZSk7XHJcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0TGlua0Zsb3dCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbXHJcbiAgICBidWlsZEV4cGVuc2VTaGVldERldGFpbFVybCxcclxuICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcclxuICAgIGNsZWFyQ2FjaGVkU3RhdGUsXHJcbiAgICBjbGVhclRpY2tldFNlbGVjdGlvbixcclxuICAgIGN1cnJlbnRQYWdlLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgZXhjbHVkZWRJZHMsXHJcbiAgICBmaWx0ZXJlZFNuYXBzaG90LFxyXG4gICAgaXNMaW5rTW9kZSxcclxuICAgIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUsXHJcbiAgICBsaW5rRmxvd0J1c3ksXHJcbiAgICBsaW5rU2hlZXRJZCxcclxuICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlLFxyXG4gICAgbGlua1NoZWV0TG9ja2VkLFxyXG4gICAgbG9hZExpc3QsXHJcbiAgICByZXNvbHZlQWN0aXZlRmlsdGVycyxcclxuICAgIHJlc29sdmVTZWxlY3RlZENvdW50LFxyXG4gICAgc2VsZWN0ZWRUaWNrZXRzLFxyXG4gICAgdG90YWwsXHJcbiAgXSk7XHJcblxyXG4gIGNvbnN0IG9wZW5MaW5rQ29uZmlybU1vZGFsID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFpc0xpbmtNb2RlIHx8IHNlbGVjdGVkVGlja2V0Q291bnQgPCAxIHx8IGxpbmtGbG93QnVzeSB8fCBsaW5rU2hlZXRDaGVja0J1c3kgfHwgbGlua1NoZWV0TG9ja2VkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRMaW5rRmxvd0Vycm9yKFwiXCIpO1xyXG4gICAgc2V0TGlua0Zsb3dTdGF0dXMoXCJcIik7XHJcbiAgICBvcGVuQ29uZmlybSh7XHJcbiAgICAgIHRpdGxlOiBpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfTGlua0J1dHRvblwiLCBcIlZpbmN1bGFyIHRpY2tldChzKVwiKSxcclxuICAgICAgbWVzc2FnZTogaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZVxyXG4gICAgICAgID8gYCR7aW5kVChcIk5hdl9FeHBlbnNlVGlja2V0c1wiLCBcIlRpY2tldHNcIil9OiAke3NlbGVjdGVkVGlja2V0Q291bnR9YFxyXG4gICAgICAgIDogYCR7aW5kVChcIk5hdl9FeHBlbnNlVGlja2V0c1wiLCBcIlRpY2tldHNcIil9OiAke3NlbGVjdGVkVGlja2V0Q291bnR9XFxuJHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Ub3RhbEFtb3VudFwiLCBcIlJlaW1idXJzZW1lbnQgYW1vdW50XCIpfTogJHtzZWxlY3RlZFRvdGFsQW1vdW50VGV4dH1gLFxuICAgICAgY29uZmlybVRleHQ6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9MaW5rQnV0dG9uXCIsIFwiVmluY3VsYXIgdGlja2V0KHMpXCIpLFxyXG4gICAgICBjYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKSxcclxuICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJ1blRpY2tldExpbmtGbG93KCk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LCBbXHJcbiAgICBpc0xpbmtNb2RlLFxyXG4gICAgc2VsZWN0ZWRUaWNrZXRDb3VudCxcclxuICAgIGxpbmtGbG93QnVzeSxcclxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcclxuICAgIGxpbmtTaGVldExvY2tlZCxcclxuICAgIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUsXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIHNlbGVjdGVkVG90YWxBbW91bnRUZXh0LFxyXG4gICAgcnVuVGlja2V0TGlua0Zsb3csXHJcbiAgXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIHNldExpbmtGbG93RXJyb3IoXCJcIik7XHJcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcclxuICAgICAgYnVzeTogbGlua0Zsb3dCdXN5LFxyXG4gICAgICBvbkVycm9yOiAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIHNldExpbmtGbG93RXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgc2V0TGlua0Zsb3dTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGRlZmF1bHRFcnJvck1lc3NhZ2U6IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSxcclxuICAgIH0pO1xyXG4gIH0sIFtoYW5kbGVDb25maXJtLCBsaW5rRmxvd0J1c3ldKTtcclxuXHJcbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XHJcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcclxuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gbGlua0Zsb3dCdXN5XHJcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcclxuICAgIDogIWxpbmtGbG93QnVzeSAmJiBsaW5rRmxvd0Vycm9yXHJcbiAgICAgID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpXHJcbiAgICAgIDogbW9kYWwuY29uZmlybVRleHQgfHwgaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIik7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghbGlua0Zsb3dCdXN5ICYmIGxpbmtGbG93RXJyb3IpIHtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZvaWQgaGFuZGxlTW9kYWxDb25maXJtKCk7XHJcbiAgfSwgW2Nsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtLCBsaW5rRmxvd0J1c3ksIGxpbmtGbG93RXJyb3JdKTtcclxuXHJcbiAgY29uc3Qgb3BlblRpY2tldERldGFpbCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHJhd0ZpbGVJZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KHJhd0ZpbGVJZCk7XHJcbiAgICAgIGlmICghZmlsZUlkKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBzbmFwc2hvdCA9IGFwcGxpZWRGaWx0ZXJzIHx8IGN1cnJlbnRGaWx0ZXJzO1xyXG4gICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSB7XHJcbiAgICAgICAgZmlsdGVyczogc25hcHNob3QsXHJcbiAgICAgICAgcGFnZTogY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLFxyXG4gICAgICAgIHNjcm9sbFk6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuc2Nyb2xsWSB8fCAwIDogMCxcclxuICAgICAgICBmb2N1c0ZpbGVJZDogZmlsZUlkLFxyXG4gICAgICAgIGl0ZW1zLFxyXG4gICAgICAgIHRvdGFsLFxyXG4gICAgICAgIHNlbGVjdGVkVGlja2V0cyxcclxuICAgICAgICBsaW5rTW9kZVNoZWV0SWQ6IGlzTGlua01vZGUgPyBsaW5rU2hlZXRJZCA6IFwiXCIsXHJcbiAgICAgICAgc2VsZWN0aW9uTW9kZSxcclxuICAgICAgICBleGNsdWRlZElkcyxcclxuICAgICAgICBmaWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnM6IGZpbHRlcmVkU25hcHNob3QsXHJcbiAgICAgICAgZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbDogZmlsdGVyZWRUb3RhbENvdW50LFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKGlzTGlua01vZGUpIHtcclxuICAgICAgICBzYXZlQ2FjaGVkU3RhdGUoY3VycmVudFN0YXRlKTtcclxuICAgICAgICBzYXZlRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSh7XHJcbiAgICAgICAgICBzaGVldElkOiBsaW5rU2hlZXRJZCxcclxuICAgICAgICAgIHBhZ2U6IGN1cnJlbnRTdGF0ZS5wYWdlLFxyXG4gICAgICAgICAgc2Nyb2xsWTogY3VycmVudFN0YXRlLnNjcm9sbFksXHJcbiAgICAgICAgICBmb2N1c0ZpbGVJZDogZmlsZUlkLFxyXG4gICAgICAgICAgZmlsdGVyczogc25hcHNob3QsXHJcbiAgICAgICAgICBzZWxlY3Rpb25Nb2RlLFxyXG4gICAgICAgICAgc2VsZWN0ZWRUaWNrZXRzLFxyXG4gICAgICAgICAgZXhjbHVkZWRJZHMsXHJcbiAgICAgICAgICBmaWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnM6IGZpbHRlcmVkU25hcHNob3QsXHJcbiAgICAgICAgICBmaWx0ZXJlZFNlbGVjdGlvblRvdGFsOiBmaWx0ZXJlZFRvdGFsQ291bnQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICAgIGZpbGVJZCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaGFzU2hlZXRDYWxsZXJDb250ZXh0ICYmIHNoZWV0Q2FsbGVyT3JpZ2luKSB7XHJcbiAgICAgICAgICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoe1xyXG4gICAgICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgICAgIHNoZWV0SWQ6IGxpbmtTaGVldElkLFxyXG4gICAgICAgICAgICBvcmlnaW46IHNoZWV0Q2FsbGVyT3JpZ2luLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBxdWVyeS5zZXQoXCJvcmlnaW5cIiwgc2hlZXRDYWxsZXJPcmlnaW4pO1xyXG4gICAgICAgICAgcXVlcnkuc2V0KFwic2hlZXRJZFwiLCBsaW5rU2hlZXRJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcclxuICAgICAgICAgIGJ5cGFzc0d1YXJkT25jZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNhdmVDYWNoZWRTdGF0ZShjdXJyZW50U3RhdGUpO1xyXG4gICAgICBpZiAoaGFzU2hlZXRDYWxsZXJDb250ZXh0ICYmIHNoZWV0Q2FsbGVyT3JpZ2luKSB7XHJcbiAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcclxuICAgICAgICAgIGZpbGVJZCxcclxuICAgICAgICAgIHNoZWV0SWQ6IGxpbmtTaGVldElkLFxyXG4gICAgICAgICAgb3JpZ2luOiBzaGVldENhbGxlck9yaWdpbixcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgICAgb3JpZ2luOiBzaGVldENhbGxlck9yaWdpbixcclxuICAgICAgICAgIHNoZWV0SWQ6IGxpbmtTaGVldElkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiBmYWxzZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoKTtcclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsP2ZpbGVJZD0ke2VuY29kZVVSSUNvbXBvbmVudChmaWxlSWQpfWAsIHtcclxuICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXHJcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBhcHBsaWVkRmlsdGVycyxcclxuICAgICAgY3VycmVudFBhZ2UsXHJcbiAgICAgIGN1cnJlbnRGaWx0ZXJzLFxyXG4gICAgICBoYXNTaGVldENhbGxlckNvbnRleHQsXHJcbiAgICAgIGxpbmtTaGVldElkLFxyXG4gICAgICBpc0xpbmtNb2RlLFxyXG4gICAgICBpdGVtcyxcclxuICAgICAgZmlsdGVyZWRUb3RhbENvdW50LFxyXG4gICAgICBmaWx0ZXJlZFNuYXBzaG90LFxyXG4gICAgICBleGNsdWRlZElkcyxcclxuICAgICAgc2hlZXRDYWxsZXJPcmlnaW4sXHJcbiAgICAgIHNhdmVDYWNoZWRTdGF0ZSxcclxuICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsXHJcbiAgICAgIHNlbGVjdGVkVGlja2V0cyxcclxuICAgICAgc2VsZWN0aW9uTW9kZSxcclxuICAgICAgdG90YWwsXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgPSB1c2VDYWxsYmFjaygodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcclxuICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XHJcbiAgICBjb25zdCBjYXJkID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XHJcbiAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xyXG4gICAgaWYgKCF0aW1lbGluZUNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gY2FyZDtcclxuICB9LCBbXSk7XHJcblxyXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoe1xyXG4gICAgY29udGFpbmVyUmVmOiB0aW1lbGluZUNvbnRhaW5lclJlZixcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGl0ZW1zLFxyXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwoKHRvdGFsIHx8IDApIC8gUEFHRV9TSVpFKTtcclxuICBjb25zdCBzaG93TGlzdExvYWRpbmcgPSBpc0xvYWRpbmc7XHJcbiAgY29uc3QgbGlua01vZGVTZWxlY3Rpb25CdXR0b25zRGlzYWJsZWQgPSBsaW5rRmxvd0J1c3kgfHwgc2VsZWN0QWxsQnVzeSB8fCBpc0xvYWRpbmc7XHJcblxyXG4gIGNvbnN0IHN1bW1hcnlJdGVtcyA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3Qgc25hcHNob3QgPSBhcHBsaWVkRmlsdGVycztcclxuICAgIGlmICghc25hcHNob3QpIHJldHVybiBbXSBhcyBBcnJheTx7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0+O1xyXG5cclxuICAgIGNvbnN0IHN1bW1hcnk6IEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfT4gPSBbXTtcclxuICAgIGNvbnN0IGxvY2FsZSA9IGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiO1xyXG4gICAgY29uc3QgZnJvbURhdGVUZXh0ID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKHNuYXBzaG90LmZyb21EYXRlLCBsb2NhbGUsIFwiXCIpO1xyXG4gICAgY29uc3QgdG9EYXRlVGV4dCA9IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShzbmFwc2hvdC50b0RhdGUsIGxvY2FsZSwgXCJcIik7XHJcblxyXG4gICAgaWYgKGZyb21EYXRlVGV4dCB8fCB0b0RhdGVUZXh0KSB7XHJcbiAgICAgIHN1bW1hcnkucHVzaCh7XHJcbiAgICAgICAga2V5OiBcImZyb21EYXRlXCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpLFxyXG4gICAgICAgIHZhbHVlOiBmcm9tRGF0ZVRleHQgfHwgXCItLVwiLFxyXG4gICAgICB9KTtcclxuICAgICAgc3VtbWFyeS5wdXNoKHtcclxuICAgICAgICBrZXk6IFwidG9EYXRlXCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIiksXHJcbiAgICAgICAgdmFsdWU6IHRvRGF0ZVRleHQgfHwgXCItLVwiLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc25hcHNob3QuZmlsdGVyS2V5LnRyaW0oKSkge1xyXG4gICAgICBzdW1tYXJ5LnB1c2goe1xyXG4gICAgICAgIGtleTogXCJmaWx0ZXJLZXlcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0ZpbHRlcktleVwiLCBcIlRpY2tldFwiKSxcclxuICAgICAgICB2YWx1ZTogc25hcHNob3QuZmlsdGVyS2V5LnRyaW0oKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNuYXBzaG90LmN1cnJlbmN5Q29kZS50cmltKCkpIHtcclxuICAgICAgc3VtbWFyeS5wdXNoKHtcclxuICAgICAgICBrZXk6IFwiY3VycmVuY3lcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIiksXHJcbiAgICAgICAgdmFsdWU6IHNuYXBzaG90LmN1cnJlbmN5Q29kZS50cmltKCksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzbmFwc2hvdC5zdGF0dXNGaWx0ZXIgIT09IFwiXCIpIHtcclxuICAgICAgc3VtbWFyeS5wdXNoKHtcclxuICAgICAgICBrZXk6IFwic3RhdHVzXCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9TdGF0dXNcIiwgXCJTdGF0dXNcIiksXHJcbiAgICAgICAgdmFsdWU6IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbChzbmFwc2hvdC5zdGF0dXNGaWx0ZXIpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc25hcHNob3QuZ2FzdG9UeXBlRmlsdGVyICE9PSBcIlwiKSB7XHJcbiAgICAgIGNvbnN0IGNhdGVnb3J5TGFiZWwgPSBnYXN0b1R5cGVMYWJlbE1hcC5nZXQoU3RyaW5nKHNuYXBzaG90Lmdhc3RvVHlwZUZpbHRlcikpIHx8IFN0cmluZyhzbmFwc2hvdC5nYXN0b1R5cGVGaWx0ZXIpO1xyXG4gICAgICBzdW1tYXJ5LnB1c2goe1xyXG4gICAgICAgIGtleTogXCJjYXRlZ29yeVwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKSxcclxuICAgICAgICB2YWx1ZTogY2F0ZWdvcnlMYWJlbCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNuYXBzaG90LnByb2Nlc3NlZEJ5SWFGaWx0ZXIgIT09IFwiYWxsXCIpIHtcclxuICAgICAgc3VtbWFyeS5wdXNoKHtcclxuICAgICAgICBrZXk6IFwicHJvY2Vzc2VkXCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBXCIsIFwiUHJvY2Vzc2VkIGJ5IElBXCIpLFxyXG4gICAgICAgIHZhbHVlOlxyXG4gICAgICAgICAgc25hcHNob3QucHJvY2Vzc2VkQnlJYUZpbHRlciA9PT0gXCJ5ZXNcIlxyXG4gICAgICAgICAgICA/IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBX1llc1wiLCBcIlllc1wiKVxyXG4gICAgICAgICAgICA6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBX05vXCIsIFwiTm9cIiksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdW1tYXJ5O1xyXG4gIH0sIFthcHBsaWVkRmlsdGVycywgZ2FzdG9UeXBlTGFiZWxNYXBdKTtcclxuXHJcbiAgY29uc3Qgc2hvd1N1bW1hcnkgPSAhaXNMaW5rTW9kZSAmJiAhc2hvd0ZpbHRlcnMgJiYgc3VtbWFyeUl0ZW1zLmxlbmd0aCA+IDA7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWlzTGlua01vZGUpIHJldHVybjtcclxuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoe1xyXG4gICAgICBhY3RpdmU6IHRydWUsXHJcbiAgICAgIG1lc3NhZ2U6IGxpbmtNb2RlQ2FuY2VsTWVzc2FnZSxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtpc0xpbmtNb2RlLCBsaW5rTW9kZUNhbmNlbE1lc3NhZ2VdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDplbnRlclwiLCB7XHJcbiAgICAgIHVybDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5sb2NhdGlvbi5ocmVmIDogXCJcIixcclxuICAgICAgZGlkUmVzdG9yZU9uTW91bnQ6IGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQsXHJcbiAgICAgIGhhc0FjY2VzcyxcclxuICAgICAgaXNMaW5rTW9kZSxcclxuICAgICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gICAgfSk7XHJcbiAgICBpZiAoZGlkUmVzdG9yZU9uTW91bnRSZWYuY3VycmVudCkge1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c1dhcm4oXCJtb3VudFJlc3RvcmVFZmZlY3Q6c2tpcC1hbHJlYWR5LXJlc3RvcmVkXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoIWhhc0FjY2Vzcykge1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c1dhcm4oXCJtb3VudFJlc3RvcmVFZmZlY3Q6c2tpcC1uby1hY2Nlc3NcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWlzTGlua01vZGUpIHtcclxuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgIGNvbnN0IHRpY2tldEZpbGVJZCA9IHNhZmVUZXh0KHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwidGlja2V0RmlsZUlkXCIpKTtcclxuICAgICAgaWYgKHRpY2tldEZpbGVJZCkge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDp0aWNrZXQtY3JlYXRlLXJldHVybi1kZXRlY3RlZFwiLCB7XHJcbiAgICAgICAgICB0aWNrZXRGaWxlSWQsXHJcbiAgICAgICAgICB0aWNrZXREYXRlOiB1cmwuc2VhcmNoUGFyYW1zLmdldChcInRpY2tldERhdGVcIiksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGlkUmVzdG9yZU9uTW91bnRSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICAgICAgYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuKHRpY2tldEZpbGVJZCwgdXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJ0aWNrZXREYXRlXCIpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIW1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSkge1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c1dhcm4oXCJtb3VudFJlc3RvcmVFZmZlY3Q6d2FpdGluZy1tYW5hZ2VtZW50LWJvb3RzdHJhcFwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZGlkUmVzdG9yZU9uTW91bnRSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICBjb25zdCBpc0hpc3RvcnlCYWNrRm9yd2FyZCA9IGlzRXhwZW5zZUhpc3RvcnlCYWNrRm9yd2FyZE5hdmlnYXRpb24oKTtcclxuICAgIGNvbnN0IGlzUmV0dXJuRnJvbVRpY2tldERldGFpbCA9IGhhc0V4cGVuc2VSZXR1cm5SZWZlcnJlcihbXHJcbiAgICAgIFwiL0dhc3Rvcy9UaWNrZXREZXRhaWxcIixcclxuICAgICAgXCIvR2FzdG9zL1RpY2tldExpbmVEZXRhaWxcIixcclxuICAgIF0pO1xyXG4gICAgY29uc3QgcmV0dXJuTW9kZSA9IGNvbnN1bWVSZXR1cm5Nb2RlKCk7XHJcbiAgICBjb25zdCBoYXNSZXR1cm5GbGFnID0gY29uc3VtZVJldHVybkZsYWcoKTtcclxuXHJcbiAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6cmVzb2x2ZWQtcmV0dXJuLXN0YXRlXCIsIHtcclxuICAgICAgaXNIaXN0b3J5QmFja0ZvcndhcmQsXHJcbiAgICAgIGlzUmV0dXJuRnJvbVRpY2tldERldGFpbCxcclxuICAgICAgcmV0dXJuTW9kZSxcclxuICAgICAgaGFzUmV0dXJuRmxhZyxcclxuICAgICAgaXNMaW5rTW9kZSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXR1cm5Nb2RlID09PSBcInJlc2V0X2ZpbHRlcnNcIiAmJiBoYXNSZXR1cm5GbGFnKSB7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXN0b3JlLWRlbGV0ZS1yZXR1cm5cIik7XHJcbiAgICAgIHJlc3RvcmVEZWxldGVSZXR1cm5TdGF0ZSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzTGlua01vZGUpIHtcclxuICAgICAgY29uc3QgaXNSZXR1cm5pbmdGcm9tRGV0YWlsID0gaGFzUmV0dXJuRmxhZyB8fCBpc0hpc3RvcnlCYWNrRm9yd2FyZCB8fCBpc1JldHVybkZyb21UaWNrZXREZXRhaWw7XHJcbiAgICAgIGNvbnN0IGNhY2hlZFN0YXRlID0gaXNSZXR1cm5pbmdGcm9tRGV0YWlsID8gcmVhZENhY2hlZFN0YXRlKCkgOiBudWxsO1xyXG4gICAgICBjb25zdCBjYWNoZWRTaGVldElkID0gc2FmZVRleHQoY2FjaGVkU3RhdGU/LmxpbmtNb2RlU2hlZXRJZCk7XHJcbiAgICAgIGlmIChjYWNoZWRTdGF0ZSAmJiBjYWNoZWRTaGVldElkICYmIGNhY2hlZFNoZWV0SWQgPT09IHNhZmVUZXh0KGxpbmtTaGVldElkKSkge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXN0b3JlLWxpbmstbW9kZS1jYWNoZVwiLCB7XHJcbiAgICAgICAgICBjYWNoZWRTaGVldElkLFxyXG4gICAgICAgICAgcGFnZTogY2FjaGVkU3RhdGUucGFnZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoKTtcclxuICAgICAgICByZXN0b3JlTGlua01vZGVSZXR1cm5TdGF0ZShjYWNoZWRTdGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBsaW5rUmV0dXJuU3RhdGUgPSBpc1JldHVybmluZ0Zyb21EZXRhaWwgPyByZWFkRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZShsaW5rU2hlZXRJZCkgOiBudWxsO1xyXG4gICAgICBpZiAobGlua1JldHVyblN0YXRlKSB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OnJlc3RvcmUtbGluay1tb2RlLXJldHVybi1zdGF0ZVwiLCB7XHJcbiAgICAgICAgICBzaGVldElkOiBsaW5rUmV0dXJuU3RhdGUuc2hlZXRJZCxcclxuICAgICAgICAgIHBhZ2U6IGxpbmtSZXR1cm5TdGF0ZS5wYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xyXG4gICAgICAgIHJlc3RvcmVMaW5rTW9kZVJldHVyblN0YXRlKHtcclxuICAgICAgICAgIGZpbHRlcnM6IGxpbmtSZXR1cm5TdGF0ZS5maWx0ZXJzLFxyXG4gICAgICAgICAgcGFnZTogbGlua1JldHVyblN0YXRlLnBhZ2UsXHJcbiAgICAgICAgICBzY3JvbGxZOiBsaW5rUmV0dXJuU3RhdGUuc2Nyb2xsWSxcclxuICAgICAgICAgIGZvY3VzRmlsZUlkOiBsaW5rUmV0dXJuU3RhdGUuZm9jdXNGaWxlSWQsXHJcbiAgICAgICAgICBpdGVtczogW10sXHJcbiAgICAgICAgICBzZWxlY3RlZFRpY2tldHM6IGxpbmtSZXR1cm5TdGF0ZS5zZWxlY3RlZFRpY2tldHMsXHJcbiAgICAgICAgICB0b3RhbDogMCxcclxuICAgICAgICAgIGxpbmtNb2RlU2hlZXRJZDogbGlua1JldHVyblN0YXRlLnNoZWV0SWQsXHJcbiAgICAgICAgICBzZWxlY3Rpb25Nb2RlOiBsaW5rUmV0dXJuU3RhdGUuc2VsZWN0aW9uTW9kZSxcclxuICAgICAgICAgIGV4Y2x1ZGVkSWRzOiBsaW5rUmV0dXJuU3RhdGUuZXhjbHVkZWRJZHMsXHJcbiAgICAgICAgICBmaWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnM6IGxpbmtSZXR1cm5TdGF0ZS5maWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnMsXHJcbiAgICAgICAgICBmaWx0ZXJlZFNlbGVjdGlvblRvdGFsOiBsaW5rUmV0dXJuU3RhdGUuZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbCxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXN0b3JlLWluaXRpYWwtbGluay1tb2RlXCIpO1xyXG4gICAgICByZXN0b3JlSW5pdGlhbExpbmtNb2RlU3RhdGUoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaGFzUmV0dXJuRmxhZyAmJiAhaXNIaXN0b3J5QmFja0ZvcndhcmQgJiYgIWlzUmV0dXJuRnJvbVRpY2tldERldGFpbCkge1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6cmVzdG9yZS1pbml0aWFsLXN0YW5kYXJkLXN0YXRlXCIpO1xyXG4gICAgICByZXN0b3JlSW5pdGlhbFN0YW5kYXJkU3RhdGUoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNhY2hlZFN0YXRlID0gcmVhZENhY2hlZFN0YXRlKCk7XHJcbiAgICBpZiAoIWNhY2hlZFN0YXRlKSB7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzV2FybihcIm1vdW50UmVzdG9yZUVmZmVjdDpuby1jYWNoZWQtc3RhdGVcIik7XHJcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXN0b3JlLXN0YW5kYXJkLWNhY2hlXCIsIHtcclxuICAgICAgcGFnZTogY2FjaGVkU3RhdGUucGFnZSxcclxuICAgICAgZm9jdXNGaWxlSWQ6IGNhY2hlZFN0YXRlLmZvY3VzRmlsZUlkLFxyXG4gICAgfSk7XHJcbiAgICByZXN0b3JlU3RhbmRhcmRSZXR1cm5TdGF0ZShjYWNoZWRTdGF0ZSk7XHJcbiAgfSwgW1xyXG4gICAgYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuLFxyXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSxcclxuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSxcclxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxyXG4gICAgY29uc3VtZVJldHVybk1vZGUsXHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBpc0xpbmtNb2RlLFxyXG4gICAgbGlua1NoZWV0SWQsXHJcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgICByZWFkQ2FjaGVkU3RhdGUsXHJcbiAgICByZWFkRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSxcclxuICAgIHJlc3RvcmVEZWxldGVSZXR1cm5TdGF0ZSxcclxuICAgIHJlc3RvcmVJbml0aWFsTGlua01vZGVTdGF0ZSxcclxuICAgIHJlc3RvcmVJbml0aWFsU3RhbmRhcmRTdGF0ZSxcclxuICAgIHJlc3RvcmVMaW5rTW9kZVJldHVyblN0YXRlLFxyXG4gICAgcmVzdG9yZVN0YW5kYXJkUmV0dXJuU3RhdGUsXHJcbiAgXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoaXNMb2FkaW5nKSByZXR1cm47XHJcbiAgICBpZiAocGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9PSBudWxsICYmICFwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHBlbmRpbmdTY3JvbGxZID0gcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudDtcclxuICAgIGNvbnN0IHBlbmRpbmdGb2N1c0ZpbGVJZCA9IHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50O1xyXG4gICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IFwiXCI7XHJcblxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgIGlmIChwZW5kaW5nU2Nyb2xsWSAhPSBudWxsKSB7XHJcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcclxuICAgICAgICAgIHRvcDogTWF0aC5tYXgoMCwgcGVuZGluZ1Njcm9sbFkpLFxyXG4gICAgICAgICAgYmVoYXZpb3I6IFwiYXV0b1wiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXBlbmRpbmdGb2N1c0ZpbGVJZCB8fCAhdGltZWxpbmVDb250YWluZXJSZWYuY3VycmVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEZvY3VzSWQgPSBwZW5kaW5nRm9jdXNGaWxlSWQudG9VcHBlckNhc2UoKTtcclxuICAgICAgY29uc3QgdGltZWxpbmVJdGVtcyA9IEFycmF5LmZyb20oXHJcbiAgICAgICAgdGltZWxpbmVDb250YWluZXJSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1pdGVtW2RhdGEtdGlja2V0LWZpbGUtaWRdXCIpXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG1hdGNoaW5nSXRlbSA9IHRpbWVsaW5lSXRlbXMuZmluZCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzYWZlVGV4dChpdGVtLmRhdGFzZXQudGlja2V0RmlsZUlkKS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkRm9jdXNJZDtcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnN0IHRhcmdldENhcmQgPSBtYXRjaGluZ0l0ZW0/LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcclxuICAgICAgaWYgKCF0YXJnZXRDYXJkKSByZXR1cm47XHJcblxyXG4gICAgICB0YXJnZXRDYXJkLmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcclxuICAgIH0pO1xyXG4gIH0sIFtpc0xvYWRpbmcsIGl0ZW1zLmxlbmd0aF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkgfHwgIWhhc0FjY2VzcykgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVBhZ2VTaG93ID0gKGV2ZW50OiBQYWdlVHJhbnNpdGlvbkV2ZW50KSA9PiB7XHJcbiAgICAgIGlmICghZXZlbnQucGVyc2lzdGVkICYmICFpc0V4cGVuc2VIaXN0b3J5QmFja0ZvcndhcmROYXZpZ2F0aW9uKCkpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnNFdmVudCgpO1xyXG4gICAgICBpZiAoIWlzTGlua01vZGUgJiYgKCFzbmFwc2hvdC5mcm9tRGF0ZSB8fCAhc25hcHNob3QudG9EYXRlKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcnVuQXV0b21hdGljTGlzdExvYWQoY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLCBzbmFwc2hvdCwge1xyXG4gICAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIGhhbmRsZVBhZ2VTaG93KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgaGFuZGxlUGFnZVNob3cpO1xyXG4gICAgfTtcclxuICB9LCBbY3VycmVudFBhZ2UsIGhhc0FjY2VzcywgaXNMaW5rTW9kZSwgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LCBydW5BdXRvbWF0aWNMaXN0TG9hZF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgb25Ub2dnbGVGaWx0ZXJzID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCB3aWxsT3BlbiA9ICFzaG93RmlsdGVycztcclxuICAgICAgdG9nZ2xlRmlsdGVyUGFuZWwoKTtcclxuICAgICAgaWYgKHdpbGxPcGVuKSB7XHJcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHsgdG9wOiAwLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvblJlZnJlc2ggPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnNFdmVudCgpO1xyXG4gICAgICBpZiAoIWlzTGlua01vZGUgJiYgKCFzbmFwc2hvdD8uZnJvbURhdGUgfHwgIXNuYXBzaG90Py50b0RhdGUpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHZvaWQgbG9hZExpc3QoY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLCBzbmFwc2hvdCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXhwZW5zZS10aWNrZXRzLXRvZ2dsZS1maWx0ZXJcIiwgb25Ub2dnbGVGaWx0ZXJzKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXhwZW5zZS10aWNrZXRzLXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXhwZW5zZS10aWNrZXRzLXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcclxuICAgIH07XHJcbiAgfSwgW2N1cnJlbnRQYWdlLCBpc0xpbmtNb2RlLCBsb2FkTGlzdCwgc2hvd0ZpbHRlcnMsIHRvZ2dsZUZpbHRlclBhbmVsXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxyXG4gICAgICA8Q29uZmlybU1vZGFsXHJcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cclxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XHJcbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cclxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbENhbmNlbFRleHR9XHJcbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XHJcbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cclxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XHJcbiAgICAgICAgYnVzeT17bGlua0Zsb3dCdXN5fVxyXG4gICAgICAgIGVycm9yPXtsaW5rRmxvd0Vycm9yfVxyXG4gICAgICAgIHN0YXR1cz17bGlua0Zsb3dTdGF0dXN9XHJcbiAgICAgICAgb25Db25maXJtPXtoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm19XHJcbiAgICAgICAgb25DYW5jZWw9e2Nsb3NlQ29uZmlybX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxpbnB1dFxyXG4gICAgICAgIHJlZj17Y2FtZXJhSW5wdXRSZWZ9XHJcbiAgICAgICAgdHlwZT1cImZpbGVcIlxyXG4gICAgICAgIGFjY2VwdD17VElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEV9XHJcbiAgICAgICAgY2FwdHVyZT1cImVudmlyb25tZW50XCJcclxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxyXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmZpbGVzPy5bMF0gfHwgbnVsbDtcclxuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgdm9pZCBoYW5kbGVTZWxlY3RlZEZpbGUoZmlsZSwgXCJjYW1lcmFcIik7XHJcbiAgICAgICAgfX1cclxuICAgICAgLz5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgcmVmPXtnYWxsZXJ5SW5wdXRSZWZ9XHJcbiAgICAgICAgdHlwZT1cImZpbGVcIlxyXG4gICAgICAgIGFjY2VwdD17VElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEV9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcclxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQuY3VycmVudFRhcmdldC5maWxlcz8uWzBdIHx8IG51bGw7XHJcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgIHZvaWQgaGFuZGxlU2VsZWN0ZWRGaWxlKGZpbGUsIFwiZ2FsbGVyeVwiKTtcclxuICAgICAgICB9fVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgeyFpc0xpbmtNb2RlICYmIHNvdXJjZVBpY2tlck9wZW4gPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTk1MC80NSBweC00IHB5LTZcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LXNtIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHAtNCBzaGFkb3cteGxcIj5cclxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtWzE2cHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS04MDBcIj5cclxuICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9UaXRsZVwiLCBcIk51ZXZvIHRpY2tldFwiKX1cclxuICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgICAge2luZFQoXHJcbiAgICAgICAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9Cb2R5XCIsXHJcbiAgICAgICAgICAgICAgICBcIlNlbGVjY2lvbmEgdW5hIGZ1ZW50ZSBwYXJhIGNhcHR1cmFyIG8gZWxlZ2lyIGxhIGltYWdlbiBkZWwgdGlja2V0LlwiXHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9wPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IGdyaWQgZ3JpZC1jb2xzLTEgZ2FwLTJcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZvaWQgc2VsZWN0RnJvbUNhbWVyYShjYW1lcmFJbnB1dFJlZi5jdXJyZW50KTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfQ2FtZXJhXCIsIFwiVXNhciBjXHUwMEUxbWFyYVwiKX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RGcm9tR2FsbGVyeShnYWxsZXJ5SW5wdXRSZWYuY3VycmVudCl9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfR2FsbGVyeVwiLCBcIkVsZWdpciBpbWFnZW5cIil9XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17Y2xvc2VTb3VyY2VQaWNrZXJ9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHshaXNMaW5rTW9kZSA/IChcclxuICAgICAgICA8RXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5XHJcbiAgICAgICAgICBvcGVuPXtxdWlja1RpY2tldEJ1c3l9XHJcbiAgICAgICAgICB0aXRsZT17aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX1RpdGxlXCIsIFwiUHJvY2Vzc2luZyB0aWNrZXRcIil9XHJcbiAgICAgICAgICBzdW1tYXJ5PXtxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICAgICAgZWxhcHNlZE1zPXtxdWlja1RpY2tldEVsYXBzZWRNc31cclxuICAgICAgICAgIHN0YWdlcz17cXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlc31cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHshaXNMaW5rTW9kZSAmJiBxdWlja1RpY2tldEVycm9yTWVzc2FnZSA/IChcclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZVxyXG4gICAgICAgICAgICAgID8gXCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1hbWJlci0yMDAgYmctYW1iZXItNTAgcC0zIHRleHQtc20gdGV4dC1hbWJlci05MDBcIlxyXG4gICAgICAgICAgICAgIDogXCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy1yb3NlLTUwIHAtMyB0ZXh0LXNtIHRleHQtcm9zZS04MDBcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxwPntxdWlja1RpY2tldEVycm9yTWVzc2FnZX08L3A+XHJcbiAgICAgICAgICB7cXVpY2tUaWNrZXRBdHRlbXB0SWQgPyAoXHJcbiAgICAgICAgICAgIDxwXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcclxuICAgICAgICAgICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlXHJcbiAgICAgICAgICAgICAgICAgID8gXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBiZy13aGl0ZSBweC0yIHB5LTEgZm9udC1tb25vIHRleHQtWzExcHhdIHRleHQtYW1iZXItOTAwIGJyZWFrLWFsbFwiXHJcbiAgICAgICAgICAgICAgICAgIDogXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXdoaXRlIHB4LTIgcHktMSBmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1yb3NlLTgwMCBicmVhay1hbGxcIlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtgYXR0ZW1wdElkOiAke3F1aWNrVGlja2V0QXR0ZW1wdElkfWB9XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmVcclxuICAgICAgICAgICAgICAgICAgPyBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItYW1iZXItMjAwIGJnLXdoaXRlIHAtMiB0ZXh0LXhzIHRleHQtYW1iZXItODAwXCJcclxuICAgICAgICAgICAgICAgICAgOiBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctd2hpdGUgcC0yIHRleHQteHMgdGV4dC1yb3NlLTcwMFwiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lm1hcCgoZW50cnkpID0+IChcclxuICAgICAgICAgICAgICAgIDxwIGtleT17YCR7ZW50cnkuc3RlcH0tJHtlbnRyeS5hdH1gfT57YCR7ZW50cnkuc3RlcH06ICR7ZW50cnkudHJhY2VJZH1gfTwvcD5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTJcIj5cclxuICAgICAgICAgICAge2hhc1BlbmRpbmdVcGxvYWRSZXRyeSA/IChcclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB2b2lkIHJldHJ5UGVuZGluZ1VwbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1JldHJ5VXBsb2FkXCIsIFwiUmVpbnRlbnRhciB1cGxvYWRcIil9XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCIgb25DbGljaz17Y2xlYXJRdWlja1RpY2tldEVycm9yfT5cclxuICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9DbG9zZVwiLCBcIkNsb3NlXCIpfVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHtzaG93U3VtbWFyeSA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1zdW1tYXJ5IHAtMyBzbTpwLTQgbXQtMSBtYi0zXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4cGVuc2Utc3VtbWFyeS1ncmlkIGdyaWQgZ3JpZC1jb2xzLTEgbWluLVszNjBweF06Z3JpZC1jb2xzLTIgaXRlbXMtc3RhcnQgZ2FwLXgtNCBnYXAteS0xIHRleHQteHNcIj5cclxuICAgICAgICAgICAge3N1bW1hcnlJdGVtcy5tYXAoKGl0ZW0pID0+IChcclxuICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICBrZXk9e2l0ZW0ua2V5fVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeSBoaXN0b3J5LWZpbHRlci1zdW1tYXJ5LS1ncmlkLWl0ZW0gbGVhZGluZy01IG1pbi13LTBcIlxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN1bW1hcnlfX2xhYmVsIGZvbnQtc2VtaWJvbGRcIj57aXRlbS5sYWJlbH06PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeV9fdmFsdWUgYnJlYWstd29yZHNcIj57aXRlbS52YWx1ZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgPEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsXHJcbiAgICAgICAgbW9kZT17aXNMaW5rTW9kZSA/IFwibGlua1wiIDogXCJnZW5lcmFsXCJ9XHJcbiAgICAgICAgdmlzaWJsZT17c2hvd0ZpbHRlcnN9XHJcbiAgICAgICAgc2hvd01hbnVhbERhdGVGaWx0ZXI9e3Nob3dNYW51YWxEYXRlRmlsdGVyfVxyXG4gICAgICAgIG1hbnVhbERhdGVBdXRvT3BlbktleT17bWFudWFsRGF0ZUF1dG9PcGVuS2V5fVxyXG4gICAgICAgIGZyb21EYXRlPXtmcm9tRGF0ZX1cclxuICAgICAgICB0b0RhdGU9e3RvRGF0ZX1cclxuICAgICAgICBmaWx0ZXJLZXk9e2ZpbHRlcktleX1cclxuICAgICAgICBjdXJyZW5jeUNvZGU9e2N1cnJlbmN5Q29kZX1cbiAgICAgICAgbWFuYWdlZFVzZXJJZD17bWFuYWdlZFVzZXJJZH1cbiAgICAgICAgbWFuYWdlZFVzZXJzPXttYW5hZ2VkVXNlcnN9XG4gICAgICAgIGN1cnJlbnRBeFVzZXJJZD17Y3VycmVudEF4VXNlcklkfVxuICAgICAgICBjdXJyZW50VXNlck5hbWU9e2N1cnJlbnRVc2VyTmFtZX1cbiAgICAgICAgc2hvd01hbmFnZWRVc2VyRmlsdGVyPXtzaG93TWFuYWdlZFVzZXJGaWx0ZXJ9XG4gICAgICAgIHN0YXR1c0ZpbHRlcj17c3RhdHVzRmlsdGVyfVxyXG4gICAgICAgIGdhc3RvVHlwZUZpbHRlcj17Z2FzdG9UeXBlRmlsdGVyfVxyXG4gICAgICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXI9e3Byb2Nlc3NlZEJ5SWFGaWx0ZXJ9XHJcbiAgICAgICAgYWN0aXZlUXVpY2tGaWx0ZXI9e2FjdGl2ZVF1aWNrRmlsdGVyfVxyXG4gICAgICAgIHNob3dNYW51YWxEYXRlRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3J9XHJcbiAgICAgICAgc3RhdHVzRmlsdGVyUmVhZE9ubHk9e3N0YXR1c0ZpbHRlckxvY2tlZH1cclxuICAgICAgICBmaXhlZFN0YXR1c0ZpbHRlcj17Zml4ZWRTdGF0dXNGaWx0ZXJ9XHJcbiAgICAgICAgZ2FzdG9UeXBlT3B0aW9ucz17Z2FzdG9UeXBlT3B0aW9uc31cclxuICAgICAgICBvbkRhdGVSYW5nZUNoYW5nZT17b25EYXRlUmFuZ2VDaGFuZ2V9XHJcbiAgICAgICAgb25NYW51YWxSYW5nZUNvbXBsZXRlPXtvbk1hbnVhbFJhbmdlQ29tcGxldGV9XHJcbiAgICAgICAgb25RdWlja0ZpbHRlckNoYW5nZT17b25RdWlja0ZpbHRlckNoYW5nZX1cclxuICAgICAgICBvbkZpbHRlcktleUNoYW5nZT17c2V0RmlsdGVyS2V5fVxyXG4gICAgICAgIG9uQ3VycmVuY3lDb2RlQ2hhbmdlPXtzZXRDdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgb25NYW5hZ2VkVXNlcklkQ2hhbmdlPXtzZXRNYW5hZ2VkVXNlcklkfVxyXG4gICAgICAgIG9uU3RhdHVzRmlsdGVyQ2hhbmdlPXtzZXRTdGF0dXNGaWx0ZXJ9XHJcbiAgICAgICAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2U9e3NldEdhc3RvVHlwZUZpbHRlcn1cclxuICAgICAgICBvblByb2Nlc3NlZEJ5SWFGaWx0ZXJDaGFuZ2U9e3NldFByb2Nlc3NlZEJ5SWFGaWx0ZXJ9XHJcbiAgICAgICAgb25DbGVhcj17b25DbGVhcn1cclxuICAgICAgICBvbkFwcGx5PXtvbkFwcGx5fVxyXG4gICAgICAvPlxyXG5cclxuICAgICAge2lzTGlua01vZGUgPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgcHgtMC41XCI+XHJcbiAgICAgICAgICB7IWNhblByb2Nlc3NMaW5rTW9kZSA/IChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtcm9zZS03MDBcIj57aW5kVChcIkF1dGhfUGVybWlzc2lvbkRlbmllZF9Cb2R5XCIsIFwiTm8gcGVybWlzc2lvbi5cIil9PC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmIGxpbmtTaGVldENoZWNrQnVzeSA/IChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCI+XHJcbiAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNCB3LTRcIiBsYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0gLz5cclxuICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAge2NhblByb2Nlc3NMaW5rTW9kZSAmJiAhbGlua1NoZWV0Q2hlY2tCdXN5ICYmIHNlbGVjdEFsbEJ1c3kgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiPlxyXG4gICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9IC8+XHJcbiAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgIHtjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiBsaW5rU2hlZXRMb2NrZWQgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXJvc2UtNzAwXCI+XHJcbiAgICAgICAgICAgICAge2xpbmtTaGVldEJsb2NrZWRNZXNzYWdlIHx8XHJcbiAgICAgICAgICAgICAgICBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUmVhZE9ubHlCeVN0YXR1c1wiLCBcIk5vIHNlIHB1ZWRlIGVkaXRhciBlc3RhIGhvamEgZGUgZ2FzdG9zIGVuIGVsIGVzdGFkbyBhY3R1YWwuXCIpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgIHtjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiAhbGlua1NoZWV0TG9ja2VkICYmIHNlbGVjdEFsbEVycm9yID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1yb3NlLTcwMFwiPntzZWxlY3RBbGxFcnJvcn08L2Rpdj5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgIHtjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiAhbGlua1NoZWV0TG9ja2VkID8gKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNSBncmlkIGdyaWQtY29scy0yIGdhcC0xLjUgcHQtMC41IHNtOm1iLTZcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBtaW4tdy0wIHB4LTEuNSBweS0xIHRleHQtWzEwcHhdIGxlYWRpbmctdGlnaHQgc206dGV4dC14c1wiXHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2b2lkIHNlbGVjdEFsbE1hdGNoaW5nVGlja2V0cygpO1xyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17bGlua01vZGVTZWxlY3Rpb25CdXR0b25zRGlzYWJsZWQgfHwgdG90YWwgPCAxfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1NlbGVjdEFsbFwiLCBcIlNlbGVjY2lvbmFyIHRvZG9cIil9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBtaW4tdy0wIHB4LTEuNSBweS0xIHRleHQtWzEwcHhdIGxlYWRpbmctdGlnaHQgc206dGV4dC14c1wiXHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NsZWFyVGlja2V0U2VsZWN0aW9ufVxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17bGlua01vZGVTZWxlY3Rpb25CdXR0b25zRGlzYWJsZWQgfHwgc2VsZWN0ZWRUaWNrZXRDb3VudCA8IDF9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfQ2xlYXJBbGxcIiwgXCJCb3JyYXIgc2VsZWNjaVx1MDBGM25cIil9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICB7aXNMaW5rTW9kZSA/IDxFeHBlbnNlVGlja2V0TGlua0J1bGtTdW1tYXJ5IHJlc3VsdD17bGlua0J1bGtSZXN1bHR9IC8+IDogbnVsbH1cclxuXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxyXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IHNob3dMaXN0TG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgc2l6ZS01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cclxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtlcnJvck1lc3NhZ2UgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxyXG5cclxuICAgICAgeyFzaG93TGlzdExvYWRpbmcgJiYgIWVycm9yTWVzc2FnZSAmJiBpdGVtcy5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2luZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKX0gLz5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICB7IWVycm9yTWVzc2FnZSAmJiBpdGVtcy5sZW5ndGggPiAwID8gKFxyXG4gICAgICAgIDxkaXYgcmVmPXt0aW1lbGluZUNvbnRhaW5lclJlZn0gY2xhc3NOYW1lPVwidGltZWxpbmUtYm94XCI+XHJcbiAgICAgICAgICB7aXRlbXMubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KGl0ZW0uZmlsZUlkKTtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZVBhcnRzID0gZm9ybWF0RXhwZW5zZURhdGVQYXJ0cyhpdGVtLnRyYW5zRGF0ZSwgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCIpO1xyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IHNhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pIHx8IHNhZmVUZXh0KGl0ZW0uZmlsZU5hbWUpIHx8IGZpbGVJZCB8fCBcIi1cIjtcclxuICAgICAgICAgICAgY29uc3QgYW1vdW50VGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShpdGVtLnRvdGFsQW1vdW50ID8/IG51bGwsIHJlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGUpO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzQ29kZSA9IGl0ZW0ua2luZCA9PT0gXCJnZW5lcmFsXCIgPyBpdGVtLnN0YXR1cyA6IG51bGw7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1c0xhYmVsID0gc3RhdHVzQ29kZSA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbChzdGF0dXNDb2RlKTtcclxuICAgICAgICAgICAgY29uc3QgaXNBc3NpZ25lZFRvRXhwZW5zZVNoZWV0ID0gc3RhdHVzQ29kZSA9PT0gMTtcclxuICAgICAgICAgICAgY29uc3Qgc2hvd1Byb2Nlc3NlZEJ5QWlJY29uID0gaXRlbS5wcm9jZXNzZWRCeUFJID09PSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGFibGVJbkxpbmtNb2RlID0gaXNMaW5rTW9kZSAmJiBjYW5TZWxlY3RUaWNrZXRGb3JMaW5rKGl0ZW0pO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkSW5MaW5rTW9kZSA9IGlzTGlua01vZGUgJiYgaXNMaW5rVGlja2V0U2VsZWN0ZWQoZmlsZUlkKTtcclxuICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkQnlBaUxhYmVsID0gaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdFRpY2tldExhYmVsID0gaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1NlbGVjdFRpY2tldFwiLCBcIlNlbGVjY2lvbmFyIHRpY2tldFwiKTtcclxuICAgICAgICAgICAgY29uc3QgZ2FzdG9UeXBlQ29kZSA9IGl0ZW0uZ2FzdG9UeXBlID09PSBudWxsID8gXCJcIiA6IFN0cmluZyhpdGVtLmdhc3RvVHlwZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGdhc3RvVHlwZUxhYmVsID0gZ2FzdG9UeXBlQ29kZVxyXG4gICAgICAgICAgICAgID8gZ2FzdG9UeXBlTGFiZWxNYXAuZ2V0KGdhc3RvVHlwZUNvZGUpIHx8IGdhc3RvVHlwZUNvZGVcclxuICAgICAgICAgICAgICA6IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBjYXJkU3VidGl0bGUgPSBnYXN0b1R5cGVMYWJlbDtcclxuICAgICAgICAgICAgY29uc3QgdGlja2V0Q2FyZEtleSA9XHJcbiAgICAgICAgICAgICAgZmlsZUlkIHx8XHJcbiAgICAgICAgICAgICAgYCR7c2FmZVRleHQoaXRlbS5maWxlTmFtZSl9LSR7c2FmZVRleHQoaXRlbS50cmFuc0RhdGUpfS0ke3NhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pfS0ke1N0cmluZyhpdGVtLnRvdGFsQW1vdW50ID8/IFwiXCIpfWA7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNMaW5rTW9kZSAmJiBpdGVtLmtpbmQgPT09IFwibGlua1wiKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbVxyXG4gICAgICAgICAgICAgICAgICBrZXk9e3RpY2tldENhcmRLZXl9XHJcbiAgICAgICAgICAgICAgICAgIGZpbGVJZD17ZmlsZUlkfVxyXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxyXG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZT17Y2FyZFN1YnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxyXG4gICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkPXtpc1NlbGVjdGVkSW5MaW5rTW9kZX1cclxuICAgICAgICAgICAgICAgICAgaXNTZWxlY3RhYmxlPXtpc1NlbGVjdGFibGVJbkxpbmtNb2RlfVxyXG4gICAgICAgICAgICAgICAgICBzZWxlY3Rpb25EaXNhYmxlZD17bGlua0Zsb3dCdXN5IHx8IGxpbmtTaGVldENoZWNrQnVzeSB8fCBsaW5rU2hlZXRMb2NrZWR9XHJcbiAgICAgICAgICAgICAgICAgIHNlbGVjdExhYmVsPXtzZWxlY3RUaWNrZXRMYWJlbH1cclxuICAgICAgICAgICAgICAgICAgb25PcGVuRGV0YWlsPXsoKSA9PiBvcGVuVGlja2V0RGV0YWlsKGZpbGVJZCl9XHJcbiAgICAgICAgICAgICAgICAgIG9uVG9nZ2xlU2VsZWN0PXsoKSA9PiB0b2dnbGVUaWNrZXRTZWxlY3Rpb24oaXRlbSl9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJhc2VTdGF0dXNJY29ucyA9IGlzQXNzaWduZWRUb0V4cGVuc2VTaGVldCB8fCBzaG93UHJvY2Vzc2VkQnlBaUljb24gPyAoXHJcbiAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIHtpc0Fzc2lnbmVkVG9FeHBlbnNlU2hlZXQgPyAoXHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImV4cGVuc2UtdGlja2V0LWNhcmRfX3N0YXR1cy1pY29uXCIgcm9sZT1cImltZ1wiIGFyaWEtbGFiZWw9e3N0YXR1c0xhYmVsfT5cclxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJzaXplLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTEzLjE5IDguNjg4YTQuNSA0LjUgMCAwIDEgMS4yNDIgNy4yNDRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMS02LjM2NC02LjM2NGwxLjc1Ny0xLjc1N20xMy4zNS0uNjIyIDEuNzU3LTEuNzU3YTQuNSA0LjUgMCAwIDAtNi4zNjQtNi4zNjRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMCAxLjI0MiA3LjI0NFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgICAgIHtzaG93UHJvY2Vzc2VkQnlBaUljb24gPyAoXHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb24gZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb24tLWFpXCJcclxuICAgICAgICAgICAgICAgICAgICByb2xlPVwiaW1nXCJcclxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtwcm9jZXNzZWRCeUFpTGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJzaXplLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTQgMThsNC0xMmw0IDEyXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTYgMTNoNFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCA2aDZcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTcgNnYxMlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAxOGg2XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICkgOiBudWxsO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICBrZXk9e3RpY2tldENhcmRLZXl9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0aW1lbGluZS1pdGVtXCJcclxuICAgICAgICAgICAgICAgIGRhdGEtdGlja2V0LWZpbGUtaWQ9e2ZpbGVJZCB8fCB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPEV4cGVuc2VUaW1lbGluZUNhcmRcclxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cclxuICAgICAgICAgICAgICAgICAgc3VidGl0bGU9e2NhcmRTdWJ0aXRsZX1cclxuICAgICAgICAgICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cclxuICAgICAgICAgICAgICAgICAgb25PcGVuPXsoKSA9PiBvcGVuVGlja2V0RGV0YWlsKGZpbGVJZCl9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlQ2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fdGl0bGUgdGltZWxpbmUtbmFtZVwiXHJcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0xhYmVsPXtzdGF0dXNMYWJlbH1cclxuICAgICAgICAgICAgICAgICAgc3RhdHVzSWNvbj17YmFzZVN0YXR1c0ljb25zfVxyXG4gICAgICAgICAgICAgICAgICBzdGF0dXNJY29uQ2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb25zXCJcclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICA8Q29tcGFjdFBhZ2luYXRpb25cclxuICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbFBhZ2VzfVxyXG4gICAgICAgIGN1cnJlbnRQYWdlPXtjdXJyZW50UGFnZX1cclxuICAgICAgICBsb2FkaW5nPXtpc0xvYWRpbmd9XHJcbiAgICAgICAgb25QYWdlQ2hhbmdlPXsocGFnZSkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgc25hcHNob3QgPSByZXNvbHZlQWN0aXZlRmlsdGVycygpO1xyXG4gICAgICAgICAgaWYgKCFpc0xpbmtNb2RlICYmICghc25hcHNob3Q/LmZyb21EYXRlIHx8ICFzbmFwc2hvdD8udG9EYXRlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdm9pZCBsb2FkTGlzdChwYWdlLCBzbmFwc2hvdCk7XHJcbiAgICAgICAgfX1cclxuICAgICAgICBsYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICB7aXNMaW5rTW9kZSAmJiBjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiAhbGlua1NoZWV0TG9ja2VkID8gKFxyXG4gICAgICAgIDxQYWdlQm90dG9tQWN0aW9ucyBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9MaW5rQnV0dG9uXCIsIFwiVmluY3VsYXIgdGlja2V0KHMpXCIpfT5cclxuICAgICAgICAgIDxQYWdlQm90dG9tQWN0aW9uQnV0dG9uXHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfTGlua0J1dHRvblwiLCBcIlZpbmN1bGFyIHRpY2tldChzKVwiKX1cclxuICAgICAgICAgICAgb25DbGljaz17b3BlbkxpbmtDb25maXJtTW9kYWx9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtsaW5rRmxvd0J1c3kgfHwgc2VsZWN0QWxsQnVzeSB8fCBzZWxlY3RlZFRpY2tldENvdW50IDwgMX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9QYWdlQm90dG9tQWN0aW9ucz5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICB7Y2FuQ3JlYXRlVGlja2V0ICYmICFpc0xpbmtNb2RlID8gKFxyXG4gICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxyXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJcdTAwRTFwaWRhc1wiKX1cclxuICAgICAgICAgIHNpemU9ezc2fVxyXG4gICAgICAgICAgcmlnaHQ9ezE2fVxyXG4gICAgICAgICAgYm90dG9tPXsyNH1cclxuICAgICAgICAgIG1lbnVBcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgclx1MDBFMXBpZGFzXCIpfVxyXG4gICAgICAgICAgbWVudUl0ZW1zPXtmYWJNZW51SXRlbXN9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gTWFpbiBwYWdlIGVudHJ5IGZvciBleHBlbnNlIHRpY2tldHMgbGlzdC5cclxuY29uc3QgRXhwZW5zZVRpY2tldHNQYWdlID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnMgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQ+XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0c1BhZ2VDb250ZW50IC8+XHJcbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS10aWNrZXRzLXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VUaWNrZXRzUGFnZSAvPik7XHJcbn07XHJcblxyXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRzUGFnZTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBDaGVja0ljb24gfSBmcm9tIFwiQGhlcm9pY29ucy9yZWFjdC8yNC9vdXRsaW5lXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZURhdGVQYXJ0cyB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVRpbWVsaW5lQ2FyZCBmcm9tIFwiLi9FeHBlbnNlVGltZWxpbmVDYXJkLnRzeFwiO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbVByb3BzID0ge1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGRhdGVQYXJ0czogRXhwZW5zZURhdGVQYXJ0cztcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIHN1YnRpdGxlOiBzdHJpbmc7XHJcbiAgYW1vdW50VGV4dDogc3RyaW5nO1xyXG4gIGlzU2VsZWN0ZWQ6IGJvb2xlYW47XHJcbiAgaXNTZWxlY3RhYmxlOiBib29sZWFuO1xyXG4gIHNlbGVjdGlvbkRpc2FibGVkOiBib29sZWFuO1xyXG4gIHNlbGVjdExhYmVsOiBzdHJpbmc7XHJcbiAgb25PcGVuRGV0YWlsOiAoKSA9PiB2b2lkO1xyXG4gIG9uVG9nZ2xlU2VsZWN0OiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gTGluay1tb2RlIHRpY2tldCBjYXJkOiBjZW50ZXIgb3BlbnMgdGhlIHJlYWQtb25seSBkZXRhaWwgYW5kIHRoZSByaWdodCByYWlsIHRvZ2dsZXMgc2VsZWN0aW9uLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbSA9ICh7XHJcbiAgZmlsZUlkLFxyXG4gIGRhdGVQYXJ0cyxcclxuICB0aXRsZSxcclxuICBzdWJ0aXRsZSxcclxuICBhbW91bnRUZXh0LFxyXG4gIGlzU2VsZWN0ZWQsXHJcbiAgaXNTZWxlY3RhYmxlLFxyXG4gIHNlbGVjdGlvbkRpc2FibGVkLFxyXG4gIHNlbGVjdExhYmVsLFxyXG4gIG9uT3BlbkRldGFpbCxcclxuICBvblRvZ2dsZVNlbGVjdCxcclxufTogRXhwZW5zZVRpY2tldExpbmtUaW1lbGluZUl0ZW1Qcm9wcykgPT4ge1xyXG4gIGNvbnN0IGNhblRvZ2dsZVNlbGVjdGlvbiA9IGlzU2VsZWN0YWJsZSAmJiAhc2VsZWN0aW9uRGlzYWJsZWQ7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU9wZW5EZXRhaWwgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBvbk9wZW5EZXRhaWwoKTtcclxuICB9LCBbb25PcGVuRGV0YWlsXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVRvZ2dsZVNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghY2FuVG9nZ2xlU2VsZWN0aW9uKSByZXR1cm47XHJcbiAgICBvblRvZ2dsZVNlbGVjdCgpO1xyXG4gIH0sIFtjYW5Ub2dnbGVTZWxlY3Rpb24sIG9uVG9nZ2xlU2VsZWN0XSk7XHJcblxyXG4gIGNvbnN0IHNlbGVjdGlvbkluZGljYXRvclRvbmVDbGFzc05hbWUgPSBpc1NlbGVjdGVkXHJcbiAgICA/IFwiYm9yZGVyLXByaW1hcnkgYmctcHJpbWFyeSB0ZXh0LXdoaXRlIHNoYWRvdy1zbVwiXHJcbiAgICA6IGNhblRvZ2dsZVNlbGVjdGlvblxyXG4gICAgICA/IFwiYm9yZGVyLXNsYXRlLTMwMCBiZy13aGl0ZSB0ZXh0LXRyYW5zcGFyZW50IGdyb3VwLWhvdmVyOmJvcmRlci1wcmltYXJ5IGdyb3VwLWhvdmVyOmJnLXByaW1hcnkvNVwiXHJcbiAgICAgIDogXCJib3JkZXItc2xhdGUtMjAwIGJnLXNsYXRlLTEwMCB0ZXh0LXRyYW5zcGFyZW50XCI7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzTmFtZT17aXNTZWxlY3RlZCA/IFwidGltZWxpbmUtaXRlbSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSByaW5nLTIgcmluZy1wcmltYXJ5LzMwXCIgOiBcInRpbWVsaW5lLWl0ZW1cIn1cbiAgICAgIGRhdGEtdGlja2V0LWZpbGUtaWQ9e2ZpbGVJZCB8fCB1bmRlZmluZWR9XHJcbiAgICAgIGRhdGEtdGlja2V0LXNlbGVjdGVkPXtpc1NlbGVjdGVkID8gXCJ0cnVlXCIgOiBcImZhbHNlXCJ9XHJcbiAgICAgIGRhdGEtdGlja2V0LXNlbGVjdGFibGU9e2NhblRvZ2dsZVNlbGVjdGlvbiA/IFwidHJ1ZVwiIDogXCJmYWxzZVwifVxyXG4gICAgPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XHJcbiAgICAgICAgPEV4cGVuc2VUaW1lbGluZUNhcmRcclxuICAgICAgICAgIGRhdGVQYXJ0cz17ZGF0ZVBhcnRzfVxyXG4gICAgICAgICAgdGl0bGU9e3RpdGxlfVxyXG4gICAgICAgICAgc3VidGl0bGU9e3N1YnRpdGxlfVxyXG4gICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cclxuICAgICAgICAgIG9uT3Blbj17aGFuZGxlT3BlbkRldGFpbH1cclxuICAgICAgICAgIHRpdGxlQ2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fdGl0bGUgdGltZWxpbmUtbmFtZVwiXHJcbiAgICAgICAgICBpbnRlcmFjdGlvblByb3BzPXt7XHJcbiAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiB0aXRsZSxcclxuICAgICAgICAgICAgb25Db250ZXh0TWVudTogKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgLz5cclxuXHJcbiAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICBhcmlhLWxhYmVsPXtzZWxlY3RMYWJlbH1cclxuICAgICAgICAgIGFyaWEtcHJlc3NlZD17aXNTZWxlY3RlZH1cclxuICAgICAgICAgIHRpdGxlPXtzZWxlY3RMYWJlbH1cclxuICAgICAgICAgIGRpc2FibGVkPXshY2FuVG9nZ2xlU2VsZWN0aW9ufVxyXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlVG9nZ2xlU2VsZWN0aW9ufVxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZ3JvdXAgYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTAgei0xMCBmbGV4IHctWzQuMjVyZW1dIGl0ZW1zLXN0YXJ0IGp1c3RpZnktZW5kIHJvdW5kZWQtci1bdmFyKC0tcmFkaXVzLXhsKV0gYmctdHJhbnNwYXJlbnQgcC0xLjUgdHJhbnNpdGlvbiBmb2N1cy12aXNpYmxlOm91dGxpbmUtbm9uZSBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctcHJpbWFyeS8zNSBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWQgc206dy1bNC43NXJlbV1cIlxuICAgICAgICA+XHJcbiAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGgtWzMwcHhdIHctWzMwcHhdIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgdHJhbnNpdGlvbiAke3NlbGVjdGlvbkluZGljYXRvclRvbmVDbGFzc05hbWV9YH1cbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxDaGVja0ljb24gY2xhc3NOYW1lPVwiaC1bMjBweF0gdy1bMjBweF1cIiBzdHJva2VXaWR0aD17Mi4zfSBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0byB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXRMaW5rQnVsa1N1bW1hcnlQcm9wcyA9IHtcclxuICByZXN1bHQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvIHwgbnVsbDtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldExpbmtJc3N1ZUxpc3RQcm9wcyA9IHtcclxuICBpdGVtczogQXJyYXk8eyB0aWNrZXRJZDogc3RyaW5nOyByZWFzb246IHN0cmluZyB9PjtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIHRvbmVDbGFzc05hbWU6IHN0cmluZztcclxufTtcclxuXHJcbi8vIFJlbmRlcnMgb25lIHNraXBwZWQgb3IgZmFpbGVkIHRpY2tldCBsaXN0IHdpdGggc3RhYmxlIGtleXMuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5rSXNzdWVMaXN0ID0gKHsgaXRlbXMsIHRpdGxlLCB0b25lQ2xhc3NOYW1lIH06IEV4cGVuc2VUaWNrZXRMaW5rSXNzdWVMaXN0UHJvcHMpID0+IHtcclxuICBpZiAoaXRlbXMubGVuZ3RoIDwgMSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17YHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBwLTMgJHt0b25lQ2xhc3NOYW1lfWB9PlxuICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LXNlbWlib2xkXCI+e3RpdGxlfTwvcD5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yIHNwYWNlLXktMlwiPlxyXG4gICAgICAgIHtpdGVtcy5tYXAoKGl0ZW0pID0+IChcclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAga2V5PXtgJHtpdGVtLnRpY2tldElkIHx8IFwidW5rbm93blwifS0ke2l0ZW0ucmVhc29uIHx8IFwibm8tcmVhc29uXCJ9YH1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1jdXJyZW50LzE1IGJnLXdoaXRlLzgwIHAtMiB0ZXh0LXhzXCJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGRcIj57aW5kVChcIlRpY2tldHNfRmlsdGVyX0ZpbHRlcktleVwiLCBcIlRpY2tldFwiKX06PC9zcGFuPntcIiBcIn1cclxuICAgICAgICAgICAgICA8c3Bhbj57aXRlbS50aWNrZXRJZCB8fCBcIi1cIn08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMVwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdFJlYXNvblwiLCBcIk1vdGl2b1wiKX06PC9zcGFuPntcIiBcIn1cclxuICAgICAgICAgICAgICA8c3Bhbj57aXRlbS5yZWFzb24gfHwgXCItXCJ9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gU2hvd3MgdGhlIGJhY2tlbmQgYnVsay1saW5rIHJlc3VsdCBzdW1tYXJ5LCBpbmNsdWRpbmcgcGFydGlhbCBza2lwcGVkIGFuZCBmYWlsZWQgcmVhc29ucy5cclxuY29uc3QgRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeSA9ICh7IHJlc3VsdCB9OiBFeHBlbnNlVGlja2V0TGlua0J1bGtTdW1tYXJ5UHJvcHMpID0+IHtcclxuICBpZiAoIXJlc3VsdCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IHN1bW1hcnlSb3dzID0gW1xyXG4gICAge1xyXG4gICAgICBrZXk6IFwicmVxdWVzdGVkXCIsXHJcbiAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0UmVxdWVzdGVkXCIsIFwiU29saWNpdGFkb3NcIiksXHJcbiAgICAgIHZhbHVlOiByZXN1bHQucmVxdWVzdGVkQ291bnQsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBrZXk6IFwibGlua2VkXCIsXHJcbiAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0TGlua2VkXCIsIFwiVmluY3VsYWRvc1wiKSxcclxuICAgICAgdmFsdWU6IHJlc3VsdC5saW5rZWRDb3VudCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGtleTogXCJza2lwcGVkXCIsXHJcbiAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0U2tpcHBlZFwiLCBcIk9taXRpZG9zXCIpLFxyXG4gICAgICB2YWx1ZTogcmVzdWx0LnNraXBwZWRDb3VudCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGtleTogXCJmYWlsZWRcIixcclxuICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRGYWlsZWRcIiwgXCJGYWxsaWRvc1wiKSxcclxuICAgICAgdmFsdWU6IHJlc3VsdC5mYWlsZWRDb3VudCxcclxuICAgIH0sXHJcbiAgXTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgc3BhY2UteS0zIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlLzk1IHAtM1wiPlxuICAgICAgPGRpdj5cclxuICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDBcIj5cclxuICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0VGl0bGVcIiwgXCJSZXN1bHRhZG8gZGUgdmluY3VsYWNpXHUwMEYzblwiKX1cclxuICAgICAgICA8L3A+XHJcbiAgICAgICAge3Jlc3VsdC5leHBlbnNlU2hlZXRJZCA/IChcclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC14cyB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1NoZWV0XCIsIFwiRXhwZW5zZSBzaGVldFwiKX06IHtyZXN1bHQuZXhwZW5zZVNoZWV0SWR9XHJcbiAgICAgICAgICA8L3A+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yIHNtOmdyaWQtY29scy00XCI+XHJcbiAgICAgICAge3N1bW1hcnlSb3dzLm1hcCgoaXRlbSkgPT4gKFxyXG4gICAgICAgICAgPGRpdiBrZXk9e2l0ZW0ua2V5fSBjbGFzc05hbWU9XCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy1zbGF0ZS01MCBweC0zIHB5LTIgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLVswLjE0ZW1dIHRleHQtc2xhdGUtNTAwXCI+e2l0ZW0ubGFiZWx9PC9wPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xIHRleHQteGwgZm9udC1zZW1pYm9sZCB0ZXh0LXByaW1hcnlcIj57aXRlbS52YWx1ZX08L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApKX1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgZ2FwLTMgbGc6Z3JpZC1jb2xzLTJcIj5cclxuICAgICAgICA8RXhwZW5zZVRpY2tldExpbmtJc3N1ZUxpc3RcclxuICAgICAgICAgIHRpdGxlPXtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0U2tpcHBlZFwiLCBcIk9taXRpZG9zXCIpfVxyXG4gICAgICAgICAgaXRlbXM9e0FycmF5LmlzQXJyYXkocmVzdWx0LnNraXBwZWQpID8gcmVzdWx0LnNraXBwZWQgOiBbXX1cclxuICAgICAgICAgIHRvbmVDbGFzc05hbWU9XCJib3JkZXItYW1iZXItMjAwIGJnLWFtYmVyLTUwIHRleHQtYW1iZXItOTAwXCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIDxFeHBlbnNlVGlja2V0TGlua0lzc3VlTGlzdFxyXG4gICAgICAgICAgdGl0bGU9e2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRGYWlsZWRcIiwgXCJGYWxsaWRvc1wiKX1cclxuICAgICAgICAgIGl0ZW1zPXtBcnJheS5pc0FycmF5KHJlc3VsdC5mYWlsZWQpID8gcmVzdWx0LmZhaWxlZCA6IFtdfVxyXG4gICAgICAgICAgdG9uZUNsYXNzTmFtZT1cImJvcmRlci1yb3NlLTIwMCBiZy1yb3NlLTUwIHRleHQtcm9zZS05MDBcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRMaW5rQnVsa1N1bW1hcnk7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IHR5cGUgeyBBdXRoTWFuYWdlZFVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi4vLi4vdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVN1bW1hcnkudHN4XCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlck9wdGlvbnMsXHJcbiAgbm9ybWFsaXplRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUsXHJcbiAgdHlwZSBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSxcclxufSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VUaWNrZXRTdGF0dXNDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyLCBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCB9IGZyb20gXCIuLi90aWNrZXRzL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyIGZyb20gXCIuL0V4cGVuc2VEYXRlUmFuZ2VGaWx0ZXIudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlRmlsdGVyQWN0aW9ucyBmcm9tIFwiLi9FeHBlbnNlRmlsdGVyQWN0aW9ucy50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3QudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJzIGZyb20gXCIuL0V4cGVuc2VRdWlja0RhdGVGaWx0ZXJzLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0IGZyb20gXCIuL0V4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dC50c3hcIjtcclxuXHJcbmNvbnN0IHBhcnNlSXNvRGF0ZSA9IChyYXc6IHN0cmluZyk6IERhdGUgfCBudWxsID0+IHtcclxuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3KS50cmltKCkuc3BsaXQoXCJUXCIpWzBdO1xyXG4gIGlmICghL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QodmFsdWUpKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSB2YWx1ZS5zcGxpdChcIi1cIikubWFwKE51bWJlcik7XHJcbiAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdERhdGUgPSAocmF3OiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBkYXRlID0gcGFyc2VJc29EYXRlKHJhdyk7XHJcbiAgaWYgKCFkYXRlKSByZXR1cm4gXCItLVwiO1xyXG4gIHJldHVybiBkYXRlXHJcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwge1xyXG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxyXG4gICAgICBtb250aDogXCJzaG9ydFwiLFxyXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcclxuICAgIH0pXHJcbiAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXHJcbiAgICAudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWxQcm9wcyA9IHtcclxuICBtb2RlOiBcImdlbmVyYWxcIiB8IFwibGlua1wiO1xyXG4gIHZpc2libGU6IGJvb2xlYW47XHJcbiAgc2hvd01hbnVhbERhdGVGaWx0ZXI6IGJvb2xlYW47XHJcbiAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5OiBudW1iZXI7XHJcbiAgZnJvbURhdGU6IHN0cmluZztcclxuICB0b0RhdGU6IHN0cmluZztcclxuICBmaWx0ZXJLZXk6IHN0cmluZztcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBtYW5hZ2VkVXNlcklkOiBzdHJpbmc7XG4gIG1hbmFnZWRVc2VyczogQXV0aE1hbmFnZWRVc2VyW107XG4gIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nO1xuICBjdXJyZW50VXNlck5hbWU6IHN0cmluZztcbiAgc2hvd01hbmFnZWRVc2VyRmlsdGVyOiBib29sZWFuO1xuICBzdGF0dXNGaWx0ZXI6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlO1xyXG4gIGdhc3RvVHlwZUZpbHRlcjogXCJcIiB8IEV4cGVuc2VHYXN0b1R5cGVDb2RlO1xyXG4gIHByb2Nlc3NlZEJ5SWFGaWx0ZXI6IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyO1xyXG4gIGFjdGl2ZVF1aWNrRmlsdGVyOiBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCB8IG51bGw7XHJcbiAgc2hvd01hbnVhbERhdGVFcnJvcjogYm9vbGVhbjtcclxuICBzdGF0dXNGaWx0ZXJSZWFkT25seT86IGJvb2xlYW47XHJcbiAgZml4ZWRTdGF0dXNGaWx0ZXI/OiAwIHwgMSB8IG51bGw7XHJcbiAgZ2FzdG9UeXBlT3B0aW9uczogRXhwZW5zZVNlbGVjdE9wdGlvbltdO1xyXG4gIG9uRGF0ZVJhbmdlQ2hhbmdlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25NYW51YWxSYW5nZUNvbXBsZXRlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25RdWlja0ZpbHRlckNoYW5nZTogKGZpbHRlcklkOiBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCkgPT4gdm9pZDtcclxuICBvbkZpbHRlcktleUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uTWFuYWdlZFVzZXJJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25TdGF0dXNGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpID0+IHZvaWQ7XHJcbiAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogXCJcIiB8IEV4cGVuc2VHYXN0b1R5cGVDb2RlKSA9PiB2b2lkO1xyXG4gIG9uUHJvY2Vzc2VkQnlJYUZpbHRlckNoYW5nZTogKHZhbHVlOiBFeHBlbnNlVGlja2V0UHJvY2Vzc2VkQnlJYUZpbHRlcikgPT4gdm9pZDtcclxuICBvbkNsZWFyOiAoKSA9PiB2b2lkO1xyXG4gIG9uQXBwbHk6ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBTaGFyZWQgdGlja2V0cyBmaWx0ZXIgcGFuZWwgd2l0aCBnbG9iYWwgcXVpY2sgZGF0ZSBmaWx0ZXJzIGFuZCBmaXhlZCB0aWNrZXQgZmlsdGVycy5cclxuY29uc3QgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWwgPSAoe1xyXG4gIG1vZGUsXHJcbiAgdmlzaWJsZSxcclxuICBzaG93TWFudWFsRGF0ZUZpbHRlcixcclxuICBtYW51YWxEYXRlQXV0b09wZW5LZXksXHJcbiAgZnJvbURhdGUsXHJcbiAgdG9EYXRlLFxyXG4gIGZpbHRlcktleSxcclxuICBjdXJyZW5jeUNvZGUsXHJcbiAgbWFuYWdlZFVzZXJJZCxcbiAgbWFuYWdlZFVzZXJzLFxuICBjdXJyZW50QXhVc2VySWQsXG4gIGN1cnJlbnRVc2VyTmFtZSxcbiAgc2hvd01hbmFnZWRVc2VyRmlsdGVyLFxuICBzdGF0dXNGaWx0ZXIsXHJcbiAgZ2FzdG9UeXBlRmlsdGVyLFxyXG4gIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXHJcbiAgYWN0aXZlUXVpY2tGaWx0ZXIsXHJcbiAgc2hvd01hbnVhbERhdGVFcnJvcixcclxuICBzdGF0dXNGaWx0ZXJSZWFkT25seSA9IGZhbHNlLFxyXG4gIGZpeGVkU3RhdHVzRmlsdGVyID0gbnVsbCxcclxuICBnYXN0b1R5cGVPcHRpb25zLFxyXG4gIG9uRGF0ZVJhbmdlQ2hhbmdlLFxyXG4gIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcclxuICBvblF1aWNrRmlsdGVyQ2hhbmdlLFxyXG4gIG9uRmlsdGVyS2V5Q2hhbmdlLFxyXG4gIG9uQ3VycmVuY3lDb2RlQ2hhbmdlLFxyXG4gIG9uTWFuYWdlZFVzZXJJZENoYW5nZSxcclxuICBvblN0YXR1c0ZpbHRlckNoYW5nZSxcclxuICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZSxcclxuICBvblByb2Nlc3NlZEJ5SWFGaWx0ZXJDaGFuZ2UsXHJcbiAgb25DbGVhcixcclxuICBvbkFwcGx5LFxyXG59OiBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbFByb3BzKSA9PiB7XHJcbiAgY29uc3Qgc3RhdHVzT3B0aW9ucyA9IHVzZU1lbW8oKCkgPT4gZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlck9wdGlvbnMoKSwgW10pO1xyXG5cclxuICBjb25zdCBjYXRlZ29yeU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4ge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgeyB2YWx1ZTogXCJcIiwgdGV4dDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0FsbFwiLCBcIkFsbFwiKSB9LFxyXG4gICAgICAuLi5nYXN0b1R5cGVPcHRpb25zLFxyXG4gICAgXTtcclxuICB9LCBbZ2FzdG9UeXBlT3B0aW9uc10pO1xyXG5cclxuICBpZiAoIXZpc2libGUpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IGxvY2FsZSA9IGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiO1xyXG4gIGNvbnN0IHNob3dJbmxpbmVEYXRlU3VtbWFyeSA9ICFzaG93TWFudWFsRGF0ZUZpbHRlciAmJiAhIWZyb21EYXRlICYmICEhdG9EYXRlO1xyXG4gIGNvbnN0IHNob3dTdGF0dXNGaWx0ZXIgPSBtb2RlID09PSBcImdlbmVyYWxcIjtcclxuICBjb25zdCBkZXNrdG9wQ29sdW1uc0NsYXNzTmFtZSA9IHNob3dNYW5hZ2VkVXNlckZpbHRlclxyXG4gICAgPyAoc2hvd1N0YXR1c0ZpbHRlciA/IFwibGc6Z3JpZC1jb2xzLTZcIiA6IFwibGc6Z3JpZC1jb2xzLTVcIilcclxuICAgIDogKHNob3dTdGF0dXNGaWx0ZXIgPyBcImxnOmdyaWQtY29scy01XCIgOiBcImxnOmdyaWQtY29scy00XCIpO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItY2FyZCBmaWx0ZXItY2FyZC0tZXhwYW5kZWQgcC0yIHNtOnAtMi41IHJlbGF0aXZlXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3RhY2sgZmxleCBmbGV4LWNvbCBzcGFjZS15LTJcIj5cclxuICAgICAgICA8RXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMgYWN0aXZlUXVpY2tGaWx0ZXI9e2FjdGl2ZVF1aWNrRmlsdGVyfSBvblF1aWNrRmlsdGVyQ2hhbmdlPXtvblF1aWNrRmlsdGVyQ2hhbmdlfSAvPlxyXG5cclxuICAgICAgICB7c2hvd01hbnVhbERhdGVGaWx0ZXIgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZURhdGVSYW5nZUZpbHRlclxyXG4gICAgICAgICAgICBmcm9tRGF0ZT17ZnJvbURhdGV9XHJcbiAgICAgICAgICAgIHRvRGF0ZT17dG9EYXRlfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25EYXRlUmFuZ2VDaGFuZ2V9XHJcbiAgICAgICAgICAgIG9uUmFuZ2VDb21wbGV0ZT17b25NYW51YWxSYW5nZUNvbXBsZXRlfVxyXG4gICAgICAgICAgICBhdXRvT3BlblJlcXVlc3RJZD17bWFudWFsRGF0ZUF1dG9PcGVuS2V5fVxyXG4gICAgICAgICAgICBzaG93TWFudWFsRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3J9XHJcbiAgICAgICAgICAgIHNob3dTdGFydEVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yICYmICFmcm9tRGF0ZX1cclxuICAgICAgICAgICAgc2hvd0VuZEVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yICYmICF0b0RhdGV9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiBzaG93SW5saW5lRGF0ZVN1bW1hcnkgPyAoXHJcbiAgICAgICAgICA8SGlzdG9yeVN1bW1hcnlcclxuICAgICAgICAgICAgc3VtbWFyeUZyb21MYWJlbD17aW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIil9XHJcbiAgICAgICAgICAgIHN1bW1hcnlUb0xhYmVsPXtpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpfVxyXG4gICAgICAgICAgICBmcm9tVmFsdWU9e2Zvcm1hdERhdGUoZnJvbURhdGUsIGxvY2FsZSl9XHJcbiAgICAgICAgICAgIHRvVmFsdWU9e2Zvcm1hdERhdGUodG9EYXRlLCBsb2NhbGUpfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJnYXAteS0xIHRleHQtWzExcHhdIHB4LTFcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yICR7ZGVza3RvcENvbHVtbnNDbGFzc05hbWV9IGdhcC0yYH0+XHJcbiAgICAgICAgICA8RXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfRmlsdGVyS2V5XCIsIFwiVGlja2V0XCIpfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX0ZpbHRlcktleVwiLCBcIlRpY2tldFwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2ZpbHRlcktleX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRmlsdGVyS2V5Q2hhbmdlfVxyXG4gICAgICAgICAgICBtb2RlPXttb2RlfVxyXG4gICAgICAgICAgICBjcmVhdGVkRGF0ZUZyb209e2Zyb21EYXRlfVxyXG4gICAgICAgICAgICBjcmVhdGVkRGF0ZVRvPXt0b0RhdGV9XHJcbiAgICAgICAgICAgIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zXHJcbiAgICAgICAgICAgIGZpeGVkU3RhdHVzRmlsdGVyPXttb2RlID09PSBcImdlbmVyYWxcIiA/IGZpeGVkU3RhdHVzRmlsdGVyIDogbnVsbH1cclxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cclxuICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgPEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2N1cnJlbmN5Q29kZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e29uQ3VycmVuY3lDb2RlQ2hhbmdlfVxyXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgICBzaG93TG9hZGluZ1N0YXRlVGV4dD17ZmFsc2V9XHJcbiAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgIHtzaG93TWFuYWdlZFVzZXJGaWx0ZXIgPyAoXHJcbiAgICAgICAgICAgIDxFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3RcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkNvbW1vbl9Vc2VyXCIsIFwiVXNlclwiKX1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkNvbW1vbl9Vc2VyXCIsIFwiVXNlclwiKX1cclxuICAgICAgICAgICAgICB2YWx1ZT17bWFuYWdlZFVzZXJJZH1cbiAgICAgICAgICAgICAgdXNlcnM9e21hbmFnZWRVc2Vyc31cbiAgICAgICAgICAgICAgY3VycmVudEF4VXNlcklkPXtjdXJyZW50QXhVc2VySWR9XG4gICAgICAgICAgICAgIGN1cnJlbnRVc2VyTmFtZT17Y3VycmVudFVzZXJOYW1lfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25NYW5hZ2VkVXNlcklkQ2hhbmdlfVxuICAgICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAge3Nob3dTdGF0dXNGaWx0ZXIgPyAoXHJcbiAgICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfVxyXG4gICAgICAgICAgICAgIG9wdGlvbnM9e3N0YXR1c09wdGlvbnN9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e3N0YXR1c0ZpbHRlcn1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4gb25TdGF0dXNGaWx0ZXJDaGFuZ2Uobm9ybWFsaXplRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUobmV4dFZhbHVlLCBcIlwiKSl9XHJcbiAgICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtzdGF0dXNGaWx0ZXJSZWFkT25seX1cclxuICAgICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLXRpY2tldC1zdGF0dXMtZmlsdGVyXCJcclxuICAgICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxyXG4gICAgICAgICAgICBvcHRpb25zPXtjYXRlZ29yeU9wdGlvbnN9XHJcbiAgICAgICAgICAgIHZhbHVlPXtnYXN0b1R5cGVGaWx0ZXJ9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKG5leHRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgaWYgKG5leHRWYWx1ZSA9PT0gXCJcIiB8fCAhTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpKSB7XHJcbiAgICAgICAgICAgICAgICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZShcIlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2UocGFyc2VkIGFzIEV4cGVuc2VHYXN0b1R5cGVDb2RlKTtcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxyXG4gICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLXRpY2tldC1nYXN0b3R5cGUtZmlsdGVyXCJcclxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8RXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3RcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBXCIsIFwiUHJvY2Vzc2VkIGJ5IElBXCIpfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtwcm9jZXNzZWRCeUlhRmlsdGVyfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlfVxyXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPEV4cGVuc2VGaWx0ZXJBY3Rpb25zXHJcbiAgICAgICAgICBjbGVhckxhYmVsPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xlYXJcIiwgXCJDbGVhclwiKX1cclxuICAgICAgICAgIGFwcGx5TGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9BcHBseVwiLCBcIkFwcGx5XCIpfVxyXG4gICAgICAgICAgb25DbGVhcj17b25DbGVhcn1cclxuICAgICAgICAgIG9uQXBwbHk9e29uQXBwbHl9XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWw7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyIH0gZnJvbSBcIi4uL3RpY2tldHMvZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdFByb3BzID0ge1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuICB2YWx1ZTogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXI7XHJcbiAgb25DaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIpID0+IHZvaWQ7XHJcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBzaG93TGFiZWw/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gRml4ZWQgZW51bSBzZWxlY3QgZm9yIElBIHByb2Nlc3NpbmcgZmlsdGVyIHdpdGggQWxsL1llcy9ObyBvcHRpb25zLlxyXG5jb25zdCBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdCA9ICh7XHJcbiAgbGFiZWwsXHJcbiAgcGxhY2Vob2xkZXIsXHJcbiAgdmFsdWUsXHJcbiAgb25DaGFuZ2UsXHJcbiAgcmVhZE9ubHkgPSBmYWxzZSxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIHNob3dMYWJlbCA9IHRydWUsXHJcbn06IEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0UHJvcHMpID0+IHtcclxuICBjb25zdCB1aVZhbHVlID0gdmFsdWUgPT09IFwiYWxsXCIgPyBcIlwiIDogdmFsdWU7XHJcbiAgY29uc3Qgb3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPihcclxuICAgICgpID0+IFtcclxuICAgICAgeyB2YWx1ZTogXCJhbGxcIiwgdGV4dDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0FsbFwiLCBcIkFsbFwiKSB9LFxyXG4gICAgICB7IHZhbHVlOiBcInllc1wiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9ZZXNcIiwgXCJZZXNcIikgfSxcclxuICAgICAgeyB2YWx1ZTogXCJub1wiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9Ob1wiLCBcIk5vXCIpIH0sXHJcbiAgICBdLFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgIGxhYmVsPXtsYWJlbH1cclxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICBvcHRpb25zPXtvcHRpb25zfVxyXG4gICAgICB2YWx1ZT17dWlWYWx1ZX1cclxuICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IHtcclxuICAgICAgICBpZiAobmV4dFZhbHVlID09PSBcInllc1wiIHx8IG5leHRWYWx1ZSA9PT0gXCJub1wiIHx8IG5leHRWYWx1ZSA9PT0gXCJhbGxcIikge1xyXG4gICAgICAgICAgb25DaGFuZ2UobmV4dFZhbHVlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgb25DaGFuZ2UoXCJhbGxcIik7XHJcbiAgICAgIH19XHJcbiAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICBpZEJhc2U9XCJleHBlbnNlLXByb2Nlc3NlZC1ieS1pYS1maWx0ZXJcIlxyXG4gICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cclxuICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XHJcbiAgICAvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdDtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUmVtb3RlU2VhcmNoQ29tYm9ib3gsIHsgdHlwZSBSZW1vdGVTZWFyY2hPcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1JlbW90ZVNlYXJjaENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8sXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsXHJcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0LCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0UHJvcHMgPSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG1vZGU/OiBcImdlbmVyYWxcIiB8IFwibGlua1wiO1xyXG4gIGNyZWF0ZWREYXRlRnJvbT86IHN0cmluZztcclxuICBjcmVhdGVkRGF0ZVRvPzogc3RyaW5nO1xyXG4gIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zPzogYm9vbGVhbjtcclxuICBmaXhlZFN0YXR1c0ZpbHRlcj86IDAgfCAxIHwgbnVsbDtcclxuICByZWFkT25seT86IGJvb2xlYW47XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIHNob3dMYWJlbD86IGJvb2xlYW47XHJcbn07XHJcblxyXG5jb25zdCBTRUFSQ0hfUEFHRV9TSVpFID0gMzA7XHJcblxyXG4vLyBCdWlsZHMgbWluaW1hbCBwYXlsb2FkIGZvciB0aWNrZXQga2V5IHN1Z2dlc3Rpb25zIHdpdGhvdXQgZGF0ZSBmaWx0ZXJzLlxyXG5jb25zdCBidWlsZFRpY2tldFN1Z2dlc3RQYXlsb2FkID0gKFxyXG4gIHRlcm06IHN0cmluZyxcclxuICBwYWdlOiBudW1iZXIsXHJcbiAgcGFnZVNpemU6IG51bWJlcixcclxuICBmaXhlZFN0YXR1c0ZpbHRlcjogMCB8IDEgfCBudWxsLFxyXG4gIGNyZWF0ZWREYXRlRnJvbTogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gIGNyZWF0ZWREYXRlVG86IHN0cmluZyB8IHVuZGVmaW5lZFxyXG4pOiBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCB8IEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCA9PiB7XHJcbiAgY29uc3Qgc2FmZVRlcm0gPSBTdHJpbmcodGVybSB8fCBcIlwiKS50cmltKCk7XHJcbiAgY29uc3QgYmFzZVBheWxvYWQgPSB7XHJcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2UpIDogMSxcclxuICAgIHBhZ2VTaXplOiBOdW1iZXIuaXNGaW5pdGUocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCA/IE1hdGguZmxvb3IocGFnZVNpemUpIDogU0VBUkNIX1BBR0VfU0laRSxcclxuICAgIGNyZWF0ZWREYXRlRnJvbTogY3JlYXRlZERhdGVGcm9tIHx8IHVuZGVmaW5lZCxcclxuICAgIGNyZWF0ZWREYXRlVG86IGNyZWF0ZWREYXRlVG8gfHwgdW5kZWZpbmVkLFxyXG4gICAgc2VhcmNoS2V5OiBzYWZlVGVybSB8fCB1bmRlZmluZWQsXHJcbiAgICBmaWx0ZXI6IHNhZmVUZXJtIHx8IHVuZGVmaW5lZCxcclxuICB9O1xyXG5cclxuICBpZiAoZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDAgfHwgZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDEpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIC4uLmJhc2VQYXlsb2FkLFxyXG4gICAgICBzdGF0dXM6IGZpeGVkU3RhdHVzRmlsdGVyLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiBiYXNlUGF5bG9hZDtcclxufTtcclxuXHJcbmNvbnN0IG1hcFRpY2tldE9wdGlvbnMgPSAoXHJcbiAgaXRlbXM6IEFycmF5PEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvIHwgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvPiB8IHVuZGVmaW5lZFxyXG4pOiBSZW1vdGVTZWFyY2hPcHRpb25bXSA9PiB7XHJcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW10pXHJcbiAgICAubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGZpbGVJZCA9IFN0cmluZyhpdGVtPy5GaWxlSWQgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IFN0cmluZyhpdGVtPy5EZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IHN1YnRpdGxlID0gZGVzY3JpcHRpb24gfHwgXCItXCI7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdmFsdWU6IGZpbGVJZCxcclxuICAgICAgICB0aXRsZTogZmlsZUlkLFxyXG4gICAgICAgIHN1YnRpdGxlLFxyXG4gICAgICB9IGFzIFJlbW90ZVNlYXJjaE9wdGlvbjtcclxuICAgIH0pXHJcbiAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFJlbW90ZVNlYXJjaE9wdGlvbltdO1xyXG59O1xyXG5cclxuLy8gVGlja2V0IGtleSBmaWx0ZXIgaW5wdXQgd2l0aCByZW1vdGUgbGlzdCBzdWdnZXN0aW9ucy5cclxuY29uc3QgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0ID0gKHtcclxuICBsYWJlbCxcclxuICBwbGFjZWhvbGRlcixcclxuICB2YWx1ZSxcclxuICBvbkNoYW5nZSxcclxuICBtb2RlID0gXCJnZW5lcmFsXCIsXHJcbiAgY3JlYXRlZERhdGVGcm9tID0gXCJcIixcclxuICBjcmVhdGVkRGF0ZVRvID0gXCJcIixcclxuICBlbmFibGVSZW1vdGVTdWdnZXN0aW9ucyA9IHRydWUsXHJcbiAgZml4ZWRTdGF0dXNGaWx0ZXIgPSBudWxsLFxyXG4gIHJlYWRPbmx5ID0gZmFsc2UsXHJcbiAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICBzaG93TGFiZWwgPSB0cnVlLFxyXG59OiBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXRQcm9wcykgPT4ge1xyXG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xyXG5cclxuICBjb25zdCBsb2FkT3B0aW9ucyA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHNpZ25hbDogQWJvcnRTaWduYWwpOiBQcm9taXNlPFJlbW90ZVNlYXJjaE9wdGlvbltdPiA9PiB7XHJcbiAgICBjb25zdCBwYXlsb2FkID0gYnVpbGRUaWNrZXRTdWdnZXN0UGF5bG9hZCh0ZXJtLCAxLCBTRUFSQ0hfUEFHRV9TSVpFLCBmaXhlZFN0YXR1c0ZpbHRlciwgY3JlYXRlZERhdGVGcm9tLCBjcmVhdGVkRGF0ZVRvKTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID1cclxuICAgICAgbW9kZSA9PT0gXCJsaW5rXCJcclxuICAgICAgICA/IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3QocGF5bG9hZCBhcyBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QsIHtcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIHNpZ25hbCxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgOiBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0KHBheWxvYWQgYXMgRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsIHtcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIHNpZ25hbCxcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtYXBUaWNrZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyk7XHJcbiAgfSwgW2NyZWF0ZWREYXRlRnJvbSwgY3JlYXRlZERhdGVUbywgZml4ZWRTdGF0dXNGaWx0ZXIsIG1vZGVdKTtcclxuXHJcbiAgY29uc3QgbG9hZE9wdGlvbnNQYWdlID0gdXNlQ2FsbGJhY2soYXN5bmMgKHRlcm06IHN0cmluZywgcGFnZTogbnVtYmVyLCBfcGFnZVNpemU6IG51bWJlciwgc2lnbmFsOiBBYm9ydFNpZ25hbCkgPT4ge1xyXG4gICAgY29uc3QgcGF5bG9hZCA9IGJ1aWxkVGlja2V0U3VnZ2VzdFBheWxvYWQoXHJcbiAgICAgIHRlcm0sXHJcbiAgICAgIHBhZ2UsXHJcbiAgICAgIFNFQVJDSF9QQUdFX1NJWkUsXHJcbiAgICAgIGZpeGVkU3RhdHVzRmlsdGVyLFxyXG4gICAgICBjcmVhdGVkRGF0ZUZyb20sXHJcbiAgICAgIGNyZWF0ZWREYXRlVG9cclxuICAgICk7XHJcbiAgICBjb25zdCByZXNwb25zZSA9XHJcbiAgICAgIG1vZGUgPT09IFwibGlua1wiXHJcbiAgICAgICAgPyBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0KHBheWxvYWQgYXMgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RSZXF1ZXN0LCB7XHJcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICBzaWduYWwsXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIDogYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdChwYXlsb2FkIGFzIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LCB7XHJcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICBzaWduYWwsXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaXRlbXM6IFtdLFxyXG4gICAgICAgIHRvdGFsOiAwLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGl0ZW1zOiBtYXBUaWNrZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyksXHJcbiAgICAgIHRvdGFsOiBOdW1iZXIocmVzcG9uc2U/LlRvdGFsIHx8IDApLFxyXG4gICAgfTtcclxuICB9LCBbY3JlYXRlZERhdGVGcm9tLCBjcmVhdGVkRGF0ZVRvLCBmaXhlZFN0YXR1c0ZpbHRlciwgbW9kZV0pO1xyXG5cclxuICBpZiAoIWVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zIHx8IHJlYWRPbmx5TW9kZSkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cclxuICAgICAgICB7c2hvd0xhYmVsID8gKFxyXG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiIHN0eWxlPXt7IGNvbG9yOiBcIiMwMDI5NmJlMFwiIH19PlxyXG4gICAgICAgICAgICB7bGFiZWx9XHJcbiAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHB4LTMgcHktMiB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgdGV4dC1zbGF0ZS05MDAgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxyXG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxyXG4gICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8UmVtb3RlU2VhcmNoQ29tYm9ib3hcclxuICAgICAgbGFiZWw9e2xhYmVsfVxyXG4gICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XHJcbiAgICAgIHZhbHVlPXt2YWx1ZX1cclxuICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxyXG4gICAgICBvblNlYXJjaD17YXN5bmMgKHRlcm0sIHNpZ25hbCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbG9hZE9wdGlvbnModGVybSwgc2lnbmFsKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgIH19XHJcbiAgICAgIG9uU2VhcmNoUGFnZT17YXN5bmMgKHRlcm0sIHBhZ2UsIHBhZ2VTaXplLCBzaWduYWwpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGxvYWRPcHRpb25zUGFnZSh0ZXJtLCBwYWdlLCBwYWdlU2l6ZSwgc2lnbmFsKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgICByZXR1cm4geyBpdGVtczogW10sIHRvdGFsOiAwIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgIH19XHJcbiAgICAgIGlkQmFzZT1cImV4cGVuc2UtdGlja2V0LWZpbHRlci1rZXlcIlxyXG4gICAgICBtaW5TZWFyY2hMZW5ndGg9ezB9XHJcbiAgICAgIHBhZ2VTaXplPXtTRUFSQ0hfUEFHRV9TSVpFfVxyXG4gICAgICBhbGxvd0VtcHR5U2VhcmNoXHJcbiAgICAgIGxvYWRPbk9wZW5cclxuICAgICAgaW5maW5pdGVTY3JvbGxcclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XHJcbiAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxyXG4gICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQ7XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcclxuICBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCxcclxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VUaWNrZXRTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgeyBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IHJlc29sdmVFeHBlbnNlUXVpY2tEYXRlRmlsdGVyRnJvbVJhbmdlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VRdWlja0RhdGVGaWx0ZXJTdGF0ZS50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90LnRzXCI7XG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZUFyZ3MgPSB7XHJcbiAgb25BcHBseUZpbHRlcnM6IChzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4gdm9pZDtcclxuICBvbkNsZWFyRmlsdGVyczogKCkgPT4gdm9pZDtcclxuICBkZWZhdWx0TWFuYWdlZFVzZXJJZDogc3RyaW5nO1xyXG4gIGZpeGVkU3RhdHVzRmlsdGVyPzogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUgfCBudWxsO1xyXG4gIGFsbG93RW1wdHlEYXRlc09uQXBwbHk/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gT3ducyBmaWx0ZXIgVUkgc3RhdGUgYW5kIGFwcGx5L2NsZWFyIHJ1bGVzIGZvciBleHBlbnNlIHRpY2tldHMgbGlzdCBwYWdlLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGUgPSAoe1xyXG4gIG9uQXBwbHlGaWx0ZXJzLFxyXG4gIG9uQ2xlYXJGaWx0ZXJzLFxyXG4gIGRlZmF1bHRNYW5hZ2VkVXNlcklkLFxyXG4gIGZpeGVkU3RhdHVzRmlsdGVyID0gbnVsbCxcclxuICBhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5ID0gZmFsc2UsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlQXJncykgPT4ge1xyXG4gIGNvbnN0IGhhc0ZpeGVkU3RhdHVzRmlsdGVyID0gZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDAgfHwgZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDE7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVTdGF0dXNGaWx0ZXIgPSB1c2VDYWxsYmFjayhcclxuICAgICh2YWx1ZTogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpOiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSA9PiB7XHJcbiAgICAgIGlmIChoYXNGaXhlZFN0YXR1c0ZpbHRlcikge1xyXG4gICAgICAgIHJldHVybiBmaXhlZFN0YXR1c0ZpbHRlciBhcyBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9LFxyXG4gICAgW2ZpeGVkU3RhdHVzRmlsdGVyLCBoYXNGaXhlZFN0YXR1c0ZpbHRlcl1cclxuICApO1xyXG5cclxuICBjb25zdCBbZnJvbURhdGUsIHNldEZyb21EYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFt0b0RhdGUsIHNldFRvRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZmlsdGVyS2V5LCBzZXRGaWx0ZXJLZXldID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2N1cnJlbmN5Q29kZSwgc2V0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFttYW5hZ2VkVXNlcklkLCBzZXRNYW5hZ2VkVXNlcklkXSA9IHVzZVN0YXRlKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcclxuICBjb25zdCBbc3RhdHVzRmlsdGVyUmF3LCBzZXRTdGF0dXNGaWx0ZXJSYXddID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGU+KHJlc29sdmVTdGF0dXNGaWx0ZXIoXCJcIikpO1xyXG4gIGNvbnN0IFtnYXN0b1R5cGVGaWx0ZXIsIHNldEdhc3RvVHlwZUZpbHRlcl0gPSB1c2VTdGF0ZTxcIlwiIHwgRXhwZW5zZUdhc3RvVHlwZUNvZGU+KFwiXCIpO1xyXG4gIGNvbnN0IFtwcm9jZXNzZWRCeUlhRmlsdGVyLCBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyXSA9IHVzZVN0YXRlPFwiYWxsXCIgfCBcInllc1wiIHwgXCJub1wiPihcImFsbFwiKTtcclxuICBjb25zdCBbYWN0aXZlUXVpY2tGaWx0ZXIsIHNldEFjdGl2ZVF1aWNrRmlsdGVyXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW3Nob3dNYW51YWxEYXRlRmlsdGVyLCBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3Nob3dNYW51YWxEYXRlRXJyb3IsIHNldFNob3dNYW51YWxEYXRlRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttYW51YWxEYXRlQXV0b09wZW5LZXksIHNldE1hbnVhbERhdGVBdXRvT3BlbktleV0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbYXBwbGllZEZpbHRlcnMsIHNldEFwcGxpZWRGaWx0ZXJzXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbc2hvd0ZpbHRlcnMsIHNldFNob3dGaWx0ZXJzXSA9IHVzZVN0YXRlKHRydWUpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFoYXNGaXhlZFN0YXR1c0ZpbHRlcikgcmV0dXJuO1xyXG4gICAgc2V0U3RhdHVzRmlsdGVyUmF3KGZpeGVkU3RhdHVzRmlsdGVyIGFzIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlKTtcclxuICB9LCBbZml4ZWRTdGF0dXNGaWx0ZXIsIGhhc0ZpeGVkU3RhdHVzRmlsdGVyXSk7XHJcblxyXG4gIGNvbnN0IHN0YXR1c0ZpbHRlciA9IHJlc29sdmVTdGF0dXNGaWx0ZXIoc3RhdHVzRmlsdGVyUmF3KTtcclxuXHJcbiAgY29uc3QgY3VycmVudEZpbHRlcnMgPSB1c2VNZW1vPEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3Q+KFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgZnJvbURhdGUsXHJcbiAgICAgIHRvRGF0ZSxcclxuICAgICAgZmlsdGVyS2V5OiBmaWx0ZXJLZXkudHJpbSgpLFxyXG4gICAgICBjdXJyZW5jeUNvZGU6IGN1cnJlbmN5Q29kZS50cmltKCksXHJcbiAgICAgIG1hbmFnZWRVc2VySWQ6IG1hbmFnZWRVc2VySWQudHJpbSgpLFxyXG4gICAgICBzdGF0dXNGaWx0ZXIsXHJcbiAgICAgIGdhc3RvVHlwZUZpbHRlcixcclxuICAgICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICAgIH0pLFxyXG4gICAgW2N1cnJlbmN5Q29kZSwgZmlsdGVyS2V5LCBmcm9tRGF0ZSwgZ2FzdG9UeXBlRmlsdGVyLCBtYW5hZ2VkVXNlcklkLCBwcm9jZXNzZWRCeUlhRmlsdGVyLCBzdGF0dXNGaWx0ZXIsIHRvRGF0ZV1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRTdGF0dXNGaWx0ZXIgPSB1c2VDYWxsYmFjayhcclxuICAgICh2YWx1ZTogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpID0+IHtcclxuICAgICAgaWYgKGhhc0ZpeGVkU3RhdHVzRmlsdGVyKSB7XHJcbiAgICAgICAgc2V0U3RhdHVzRmlsdGVyUmF3KGZpeGVkU3RhdHVzRmlsdGVyIGFzIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgc2V0U3RhdHVzRmlsdGVyUmF3KHZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBbZml4ZWRTdGF0dXNGaWx0ZXIsIGhhc0ZpeGVkU3RhdHVzRmlsdGVyXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG9uQXBwbHkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWFsbG93RW1wdHlEYXRlc09uQXBwbHkgJiYgKCFmcm9tRGF0ZSB8fCAhdG9EYXRlKSkge1xyXG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKHRydWUpO1xyXG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcclxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9IHtcclxuICAgICAgZnJvbURhdGUsXHJcbiAgICAgIHRvRGF0ZSxcclxuICAgICAgZmlsdGVyS2V5OiBmaWx0ZXJLZXkudHJpbSgpLFxyXG4gICAgICBjdXJyZW5jeUNvZGU6IGN1cnJlbmN5Q29kZS50cmltKCksXHJcbiAgICAgIG1hbmFnZWRVc2VySWQ6IG1hbmFnZWRVc2VySWQudHJpbSgpLFxyXG4gICAgICBzdGF0dXNGaWx0ZXIsXHJcbiAgICAgIGdhc3RvVHlwZUZpbHRlcixcclxuICAgICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICAgIH07XHJcblxyXG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XHJcbiAgICBzZXRBcHBsaWVkRmlsdGVycyhzbmFwc2hvdCk7XHJcbiAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XHJcbiAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XHJcbiAgICBvbkFwcGx5RmlsdGVycyhzbmFwc2hvdCk7XHJcbiAgfSwgW1xyXG4gICAgYWxsb3dFbXB0eURhdGVzT25BcHBseSxcclxuICAgIGN1cnJlbmN5Q29kZSxcclxuICAgIGZpbHRlcktleSxcclxuICAgIGZyb21EYXRlLFxyXG4gICAgZ2FzdG9UeXBlRmlsdGVyLFxyXG4gICAgbWFuYWdlZFVzZXJJZCxcclxuICAgIG9uQXBwbHlGaWx0ZXJzLFxyXG4gICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICAgIHN0YXR1c0ZpbHRlcixcclxuICAgIHRvRGF0ZSxcclxuICBdKTtcclxuXHJcbiAgLy8gUmVoeWRyYXRlcyB0aWNrZXQgZmlsdGVycyBmcm9tIGEgY2FjaGVkIHNuYXBzaG90IHdoZW4gcmV0dXJuaW5nIGZyb20gZGV0YWlsLlxyXG4gIGNvbnN0IHJlc3RvcmVBcHBsaWVkRmlsdGVycyA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB7XG4gICAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90KHNuYXBzaG90KTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRTdGF0dXNGaWx0ZXIgPSByZXNvbHZlU3RhdHVzRmlsdGVyKG5vcm1hbGl6ZWQuc3RhdHVzRmlsdGVyKTtcbiAgICAgIGNvbnN0IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCA9IFN0cmluZyhub3JtYWxpemVkLm1hbmFnZWRVc2VySWQgfHwgZGVmYXVsdE1hbmFnZWRVc2VySWQpLnRyaW0oKTtcbiAgICAgIGNvbnN0IHJlc3RvcmVkUXVpY2tGaWx0ZXIgPSByZXNvbHZlRXhwZW5zZVF1aWNrRGF0ZUZpbHRlckZyb21SYW5nZShub3JtYWxpemVkLmZyb21EYXRlLCBub3JtYWxpemVkLnRvRGF0ZSk7XG4gICAgICBzZXRGcm9tRGF0ZShub3JtYWxpemVkLmZyb21EYXRlKTtcbiAgICAgIHNldFRvRGF0ZShub3JtYWxpemVkLnRvRGF0ZSk7XG4gICAgICBzZXRGaWx0ZXJLZXkobm9ybWFsaXplZC5maWx0ZXJLZXkpO1xuICAgICAgc2V0Q3VycmVuY3lDb2RlKG5vcm1hbGl6ZWQuY3VycmVuY3lDb2RlKTtcbiAgICAgIHNldE1hbmFnZWRVc2VySWQocmVzdG9yZWRNYW5hZ2VkVXNlcklkKTtcbiAgICAgIHNldFN0YXR1c0ZpbHRlclJhdyhub3JtYWxpemVkU3RhdHVzRmlsdGVyKTtcbiAgICAgIHNldEdhc3RvVHlwZUZpbHRlcihub3JtYWxpemVkLmdhc3RvVHlwZUZpbHRlcik7XG4gICAgICBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyKG5vcm1hbGl6ZWQucHJvY2Vzc2VkQnlJYUZpbHRlcik7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihyZXN0b3JlZFF1aWNrRmlsdGVyKTtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgICAgc2V0QXBwbGllZEZpbHRlcnMoe1xuICAgICAgICAuLi5ub3JtYWxpemVkLFxyXG4gICAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgICBzdGF0dXNGaWx0ZXI6IG5vcm1hbGl6ZWRTdGF0dXNGaWx0ZXIsXHJcbiAgICAgIH0pO1xyXG4gICAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgW2RlZmF1bHRNYW5hZ2VkVXNlcklkLCByZXNvbHZlU3RhdHVzRmlsdGVyXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG9uQ2xlYXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRGcm9tRGF0ZShcIlwiKTtcclxuICAgIHNldFRvRGF0ZShcIlwiKTtcclxuICAgIHNldEZpbHRlcktleShcIlwiKTtcclxuICAgIHNldEN1cnJlbmN5Q29kZShcIlwiKTtcclxuICAgIHNldE1hbmFnZWRVc2VySWQoZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xyXG4gICAgc2V0U3RhdHVzRmlsdGVyUmF3KHJlc29sdmVTdGF0dXNGaWx0ZXIoXCJcIikpO1xyXG4gICAgc2V0R2FzdG9UeXBlRmlsdGVyKFwiXCIpO1xyXG4gICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcihcImFsbFwiKTtcclxuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xyXG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xyXG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XHJcbiAgICBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXkoMCk7XHJcbiAgICBzZXRBcHBsaWVkRmlsdGVycyhudWxsKTtcclxuICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xyXG4gICAgb25DbGVhckZpbHRlcnMoKTtcclxuICB9LCBbZGVmYXVsdE1hbmFnZWRVc2VySWQsIG9uQ2xlYXJGaWx0ZXJzLCByZXNvbHZlU3RhdHVzRmlsdGVyXSk7XHJcblxyXG4gIGNvbnN0IG9uRGF0ZVJhbmdlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAobmV4dEZyb21EYXRlOiBzdHJpbmcsIG5leHRUb0RhdGU6IHN0cmluZykgPT4ge1xyXG4gICAgICBjb25zdCBoYXNGdWxsUmFuZ2UgPSAhIW5leHRGcm9tRGF0ZSAmJiAhIW5leHRUb0RhdGU7XHJcbiAgICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XHJcbiAgICAgIHNldFRvRGF0ZShuZXh0VG9EYXRlKTtcclxuICAgICAgaWYgKCFoYXNGdWxsUmFuZ2UpIHtcclxuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcclxuICAgICAgfVxyXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcclxuICAgICAgaWYgKHNob3dNYW51YWxEYXRlRXJyb3IpIHtcclxuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKCFoYXNGdWxsUmFuZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW3Nob3dNYW51YWxEYXRlRXJyb3JdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb25NYW51YWxSYW5nZUNvbXBsZXRlID0gdXNlQ2FsbGJhY2soKG5leHRGcm9tRGF0ZTogc3RyaW5nLCBuZXh0VG9EYXRlOiBzdHJpbmcpID0+IHtcclxuICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XHJcbiAgICBzZXRUb0RhdGUobmV4dFRvRGF0ZSk7XHJcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcclxuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xyXG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgb25RdWlja0ZpbHRlckNoYW5nZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGZpbHRlcklkOiBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCkgPT4ge1xyXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiY3VzdG9tXCIpIHtcclxuICAgICAgICBpZiAoc2hvd01hbnVhbERhdGVGaWx0ZXIpIHtcclxuICAgICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcclxuICAgICAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XHJcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIodHJ1ZSk7XHJcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XHJcbiAgICAgICAgc2V0TWFudWFsRGF0ZUF1dG9PcGVuS2V5KChwcmV2aW91cykgPT4gcHJldmlvdXMgKyAxKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKGZpbHRlcklkKTtcclxuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xyXG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcclxuXHJcbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcclxuICAgICAgY29uc3QgbmV4dEZyb20gPSBuZXcgRGF0ZSh0b2RheSk7XHJcbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJkYXlzLTdcIikge1xyXG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gNik7XHJcbiAgICAgIH0gZWxzZSBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy0zMFwiKSB7XHJcbiAgICAgICAgbmV4dEZyb20uc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAyOSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV4dEZyb20uc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA4OSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldEZyb21EYXRlKHRvSXNvRGF0ZShuZXh0RnJvbSkpO1xyXG4gICAgICBzZXRUb0RhdGUodG9Jc29EYXRlKHRvZGF5KSk7XHJcbiAgICB9LFxyXG4gICAgW3Nob3dNYW51YWxEYXRlRmlsdGVyXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHRvZ2dsZUZpbHRlclBhbmVsID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0U2hvd0ZpbHRlcnMoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5leHQgPSAhcHJldmlvdXM7XHJcbiAgICAgIGlmICghbmV4dCkge1xyXG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmV4dDtcclxuICAgIH0pO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGZyb21EYXRlLFxyXG4gICAgdG9EYXRlLFxyXG4gICAgZmlsdGVyS2V5LFxyXG4gICAgY3VycmVuY3lDb2RlLFxyXG4gICAgbWFuYWdlZFVzZXJJZCxcclxuICAgIHN0YXR1c0ZpbHRlcixcclxuICAgIGdhc3RvVHlwZUZpbHRlcixcclxuICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXHJcbiAgICBhY3RpdmVRdWlja0ZpbHRlcixcclxuICAgIHNob3dNYW51YWxEYXRlRmlsdGVyLFxyXG4gICAgc2hvd01hbnVhbERhdGVFcnJvcixcclxuICAgIG1hbnVhbERhdGVBdXRvT3BlbktleSxcclxuICAgIGFwcGxpZWRGaWx0ZXJzLFxyXG4gICAgc2hvd0ZpbHRlcnMsXHJcbiAgICBjdXJyZW50RmlsdGVycyxcclxuICAgIHNldEZpbHRlcktleSxcclxuICAgIHNldEN1cnJlbmN5Q29kZSxcclxuICAgIHNldE1hbmFnZWRVc2VySWQsXHJcbiAgICBzZXRTdGF0dXNGaWx0ZXIsXHJcbiAgICBzZXRHYXN0b1R5cGVGaWx0ZXIsXHJcbiAgICBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyLFxyXG4gICAgb25BcHBseSxcclxuICAgIG9uQ2xlYXIsXHJcbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMsXHJcbiAgICBvbkRhdGVSYW5nZUNoYW5nZSxcclxuICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcclxuICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXHJcbiAgICB0b2dnbGVGaWx0ZXJQYW5lbCxcclxuICAgIHN0YXR1c0ZpbHRlckxvY2tlZDogaGFzRml4ZWRTdGF0dXNGaWx0ZXIsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlR2FzdG9UeXBlQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0LCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IGdldFZpc2libGVSZWltYnVyc2FibGVUb3RhbCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVmlzaWJsZVRvdGFscy50c1wiO1xuaW1wb3J0IHsgaXNFeHBlbnNlQWJvcnRMaWtlRXJyb3IsIHJ1bkV4cGVuc2VSZWFkUmVxdWVzdFdpdGhSZXRyeSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlUmVxdWVzdFJldHJ5LnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgYnVpbGRFeHBlbnNlVGlja2V0TGlua0xpc3RQYXlsb2FkLFxyXG4gIGJ1aWxkRXhwZW5zZVRpY2tldExpc3RQYXlsb2FkLFxyXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlUGF5bG9hZEJ1aWxkZXJzLnRzXCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxyXG4gIEV4cGVuc2VUaWNrZXRDYXJkLFxyXG4gIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCxcclxuICBFeHBlbnNlVGlja2V0TGlzdFBhZ2VJdGVtLFxyXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YUFyZ3MgPSB7XHJcbiAgaGFzQWNjZXNzOiBib29sZWFuO1xyXG4gIHBhZ2VTaXplOiBudW1iZXI7XHJcbiAgbW9kZTogXCJnZW5lcmFsXCIgfCBcImxpbmtcIjtcclxuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IEVYUEVOU0VfVElDS0VUU19MSVNUX0xPR19QUkVGSVggPSBcIltleHBlbnNlLXRpY2tldHM6bGlzdF1cIjtcclxuXHJcbmNvbnN0IGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLmluZm8gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS5pbmZvKEVYUEVOU0VfVElDS0VUU19MSVNUX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLndhcm4gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS53YXJuKEVYUEVOU0VfVElDS0VUU19MSVNUX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEVycm9yID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xyXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKEVYUEVOU0VfVElDS0VUU19MSVNUX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRXhwZW5zZVRpY2tldHNEZWJ1Z1N0YWNrID0gKGxhYmVsOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICh0eXBlb2YgRXJyb3IgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFwiXCI7XHJcbiAgY29uc3QgcmF3U3RhY2sgPSBuZXcgRXJyb3IobGFiZWwpLnN0YWNrO1xyXG4gIGlmICh0eXBlb2YgcmF3U3RhY2sgIT09IFwic3RyaW5nXCIgfHwgIXJhd1N0YWNrLnRyaW0oKSkgcmV0dXJuIFwiXCI7XHJcbiAgcmV0dXJuIHJhd1N0YWNrXHJcbiAgICAuc3BsaXQoXCJcXG5cIilcclxuICAgIC5zbGljZSgwLCA2KVxyXG4gICAgLmpvaW4oXCJcXG5cIik7XHJcbn07XHJcblxyXG5jb25zdCB0b051bGxhYmxlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgdG9OdWxsYWJsZUJvb2wgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHJldHVybiB2YWx1ZTtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSByZXR1cm4gdmFsdWUgPT09IDEgPyB0cnVlIDogdmFsdWUgPT09IDAgPyBmYWxzZSA6IG51bGw7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IHZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKG5vcm1hbGl6ZWQgPT09IFwidHJ1ZVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwiMVwiKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmIChub3JtYWxpemVkID09PSBcImZhbHNlXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIwXCIpIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5jb25zdCB0b051bGxhYmxlVGlja2V0U3RhdHVzID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpICYmIHBhcnNlZCA+PSAwID8gcGFyc2VkIDogbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IHRvTnVsbGFibGVUaWNrZXRHYXN0b1R5cGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlR2FzdG9UeXBlQ29kZSB8IG51bGwgPT4ge1xyXG4gIHJldHVybiB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlKHZhbHVlKTtcclxufTtcclxuXHJcbmNvbnN0IG1hcFRpY2tldEl0ZW1Ub0NhcmQgPSAoaXRlbTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBFeHBlbnNlVGlja2V0Q2FyZCA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGtpbmQ6IFwiZ2VuZXJhbFwiLFxyXG4gICAgZmlsZUlkOiBTdHJpbmcoaXRlbT8uRmlsZUlkIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoaXRlbT8uRGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpLFxyXG4gICAgc3RhdHVzOiB0b051bGxhYmxlVGlja2V0U3RhdHVzKGl0ZW0/LlN0YXR1cyksXHJcbiAgICBwcm9jZXNzZWRCeUFJOiB0b051bGxhYmxlQm9vbChpdGVtPy5Qcm9jZXNzZWRCeUFJKSxcclxuICAgIGN1cnJlbmN5Q29kZTogU3RyaW5nKGl0ZW0/LkN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICB0b3RhbEFtb3VudDogZ2V0VmlzaWJsZVJlaW1idXJzYWJsZVRvdGFsKHtcbiAgICAgIFRvdGFsQW1vdW50TVNUOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0/LlRvdGFsQW1vdW50TVNUKSxcbiAgICAgIFRvdGFsQW1vdW50Q3VycmVuY3k6IHRvTnVsbGFibGVOdW1iZXIoaXRlbT8uVG90YWxBbW91bnRDdXJyZW5jeSksXG4gICAgICBUb3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtPy5Ub3RhbEFtb3VudCksXG4gICAgfSksXG4gICAgdHJhbnNEYXRlOiBTdHJpbmcoaXRlbT8uVHJhbnNEYXRlIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgIGZpbGVOYW1lOiBTdHJpbmcoaXRlbT8uRmlsZU5hbWUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgZ2FzdG9UeXBlOiB0b051bGxhYmxlVGlja2V0R2FzdG9UeXBlKGl0ZW0/Lkdhc3RvVHlwZSA/PyBpdGVtPy5nYXN0b1R5cGUpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBtYXBUaWNrZXRMaW5rSXRlbVRvQ2FyZCA9IChpdGVtOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGtpbmQ6IFwibGlua1wiLFxyXG4gICAgZmlsZUlkOiBTdHJpbmcoaXRlbT8uRmlsZUlkIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoaXRlbT8uRGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpLFxyXG4gICAgcHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woaXRlbT8uUHJvY2Vzc2VkQnlBSSksXHJcbiAgICBjdXJyZW5jeUNvZGU6IFN0cmluZyhpdGVtPy5DdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgdG90YWxBbW91bnQ6IGdldFZpc2libGVSZWltYnVyc2FibGVUb3RhbCh7XG4gICAgICBUb3RhbEFtb3VudE1TVDogdG9OdWxsYWJsZU51bWJlcihpdGVtPy5Ub3RhbEFtb3VudE1TVCksXG4gICAgICBUb3RhbEFtb3VudEN1cnJlbmN5OiB0b051bGxhYmxlTnVtYmVyKGl0ZW0/LlRvdGFsQW1vdW50Q3VycmVuY3kpLFxuICAgICAgVG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbT8uVG90YWxBbW91bnQpLFxuICAgIH0pLFxuICAgIHRyYW5zRGF0ZTogU3RyaW5nKGl0ZW0/LlRyYW5zRGF0ZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICBmaWxlTmFtZTogU3RyaW5nKGl0ZW0/LkZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgIGdhc3RvVHlwZTogdG9OdWxsYWJsZVRpY2tldEdhc3RvVHlwZShpdGVtPy5HYXN0b1R5cGUgPz8gaXRlbT8uZ2FzdG9UeXBlKSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gT3ducyBsaXN0IGRhdGEgZmV0Y2gsIGxvYWRpbmcgc3RhdGUsIGFuZCBwYWdpbmF0aW9uIG1ldGFkYXRhIGZvciB0aWNrZXRzLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YSA9ICh7IGhhc0FjY2VzcywgcGFnZVNpemUsIG1vZGUsIG9uRm9yYmlkZGVuIH06IFVzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGFBcmdzKSA9PiB7XHJcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0TGlzdFBhZ2VJdGVtW10+KFtdKTtcclxuICBjb25zdCBbdG90YWwsIHNldFRvdGFsXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtjdXJyZW50UGFnZSwgc2V0Q3VycmVudFBhZ2VdID0gdXNlU3RhdGUoMSk7XHJcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgYWN0aXZlUmVxdWVzdEtleVJlZiA9IHVzZVJlZihcIlwiKTtcclxuICBjb25zdCBhY3RpdmVSZXF1ZXN0U2VxUmVmID0gdXNlUmVmKDApO1xyXG5cclxuICBjb25zdCByZXN0b3JlTGlzdFNuYXBzaG90ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoc25hcHNob3Q6IHsgaXRlbXM6IEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW1bXTsgdG90YWw6IG51bWJlcjsgcGFnZTogbnVtYmVyIH0pID0+IHtcclxuICAgICAgY29uc3Qgc2FmZUl0ZW1zID0gQXJyYXkuaXNBcnJheShzbmFwc2hvdC5pdGVtcykgPyBzbmFwc2hvdC5pdGVtcyA6IFtdO1xyXG4gICAgICBjb25zdCBzYWZlVG90YWxSYXcgPSBOdW1iZXIoc25hcHNob3QudG90YWwpO1xyXG4gICAgICBjb25zdCBzYWZlVG90YWwgPSBOdW1iZXIuaXNGaW5pdGUoc2FmZVRvdGFsUmF3KSAmJiBzYWZlVG90YWxSYXcgPj0gMCA/IHNhZmVUb3RhbFJhdyA6IHNhZmVJdGVtcy5sZW5ndGg7XHJcbiAgICAgIGNvbnN0IHNhZmVQYWdlUmF3ID0gTnVtYmVyKHNuYXBzaG90LnBhZ2UpO1xyXG4gICAgICBjb25zdCBzYWZlUGFnZSA9IE51bWJlci5pc0Zpbml0ZShzYWZlUGFnZVJhdykgJiYgc2FmZVBhZ2VSYXcgPiAwID8gTWF0aC5mbG9vcihzYWZlUGFnZVJhdykgOiAxO1xyXG5cclxuICAgICAgc2V0SXRlbXMoc2FmZUl0ZW1zKTtcclxuICAgICAgc2V0VG90YWwoc2FmZVRvdGFsKTtcclxuICAgICAgc2V0Q3VycmVudFBhZ2Uoc2FmZVBhZ2UpO1xyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICBjb25zdCBsb2FkTGlzdCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKHBhZ2U6IG51bWJlciwgZmlsdGVyczogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4ge1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RJbmZvKFwibG9hZExpc3Q6cmVxdWVzdGVkXCIsIHtcclxuICAgICAgICBwYWdlLFxyXG4gICAgICAgIG1vZGUsXHJcbiAgICAgICAgaGFzQWNjZXNzLFxyXG4gICAgICAgIGZpbHRlcnMsXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoIWhhc0FjY2Vzcykge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJsb2FkTGlzdDpibG9ja2VkLW5vLWFjY2Vzc1wiLCB7XHJcbiAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgbW9kZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcGF5bG9hZCA9XHJcbiAgICAgICAgbW9kZSA9PT0gXCJsaW5rXCJcclxuICAgICAgICAgID8gYnVpbGRFeHBlbnNlVGlja2V0TGlua0xpc3RQYXlsb2FkKGZpbHRlcnMsIHBhZ2UsIHBhZ2VTaXplKVxyXG4gICAgICAgICAgOiBidWlsZEV4cGVuc2VUaWNrZXRMaXN0UGF5bG9hZChmaWx0ZXJzLCBwYWdlLCBwYWdlU2l6ZSk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkID0gU3RyaW5nKGZpbHRlcnM/Lm1hbmFnZWRVc2VySWQgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgIGNvbnN0IHJlcXVlc3RLZXkgPSBKU09OLnN0cmluZ2lmeSh7IG1vZGUsIHBheWxvYWQsIG1hbmFnZWRVc2VySWQ6IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkIH0pO1xyXG5cclxuICAgICAgaWYgKGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgJiYgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID09PSByZXF1ZXN0S2V5KSB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImxvYWRMaXN0OnNraXAtZHVwbGljYXRlLXJlcXVlc3RcIiwge1xyXG4gICAgICAgICAgcGFnZSxcclxuICAgICAgICAgIG1vZGUsXHJcbiAgICAgICAgICByZXF1ZXN0S2V5LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RJbmZvKFwibG9hZExpc3Q6YWJvcnQtcHJldmlvdXMtcmVxdWVzdFwiLCB7XHJcbiAgICAgICAgICBwcmV2aW91c1JlcXVlc3RLZXk6IGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCxcclxuICAgICAgICAgIHByZXZpb3VzUmVxdWVzdFNlcTogYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50LFxyXG4gICAgICAgICAgc3RhY2s6IGJ1aWxkRXhwZW5zZVRpY2tldHNEZWJ1Z1N0YWNrKFwibG9hZExpc3Q6YWJvcnQtcHJldmlvdXMtcmVxdWVzdFwiKSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50LmFib3J0KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcbiAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgPSBjb250cm9sbGVyO1xyXG4gICAgICBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPSByZXF1ZXN0S2V5O1xyXG4gICAgICBjb25zdCByZXF1ZXN0U2VxID0gYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50ICsgMTtcclxuICAgICAgYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50ID0gcmVxdWVzdFNlcTtcclxuICAgICAgY29uc3QgaGFuZGxlQWJvcnRTaWduYWwgPSAoKSA9PiB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImxvYWRMaXN0OnNpZ25hbC1hYm9ydC1ldmVudFwiLCB7XHJcbiAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgbW9kZSxcclxuICAgICAgICAgIHJlcXVlc3RTZXEsXHJcbiAgICAgICAgICByZXF1ZXN0S2V5LFxyXG4gICAgICAgICAgc2lnbmFsQWJvcnRlZDogY29udHJvbGxlci5zaWduYWwuYWJvcnRlZCxcclxuICAgICAgICAgIHNpZ25hbFJlYXNvbjpcclxuICAgICAgICAgICAgXCJyZWFzb25cIiBpbiBjb250cm9sbGVyLnNpZ25hbFxyXG4gICAgICAgICAgICAgID8gKChjb250cm9sbGVyLnNpZ25hbCBhcyBBYm9ydFNpZ25hbCAmIHsgcmVhc29uPzogdW5rbm93biB9KS5yZWFzb24gPz8gbnVsbClcclxuICAgICAgICAgICAgICA6IG51bGwsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnRyb2xsZXIuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBoYW5kbGVBYm9ydFNpZ25hbCwgeyBvbmNlOiB0cnVlIH0pO1xyXG5cclxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8oXCJsb2FkTGlzdDpmZXRjaC1zdGFydFwiLCB7XHJcbiAgICAgICAgcGFnZSxcclxuICAgICAgICBtb2RlLFxyXG4gICAgICAgIG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgICAgIHBheWxvYWQsXHJcbiAgICAgICAgcmVxdWVzdEtleSxcclxuICAgICAgICByZXF1ZXN0U2VxLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBydW5FeHBlbnNlUmVhZFJlcXVlc3RXaXRoUmV0cnkoXHJcbiAgICAgICAgICAoKSA9PlxyXG4gICAgICAgICAgICBtb2RlID09PSBcImxpbmtcIlxyXG4gICAgICAgICAgICAgID8gZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdChwYXlsb2FkLCB7XHJcbiAgICAgICAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgICAgICAgICAgICBheFVzZXJJZE92ZXJyaWRlOiBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIDogZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdChwYXlsb2FkLCB7XHJcbiAgICAgICAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgICAgICAgICAgICBheFVzZXJJZE92ZXJyaWRlOiBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8oXCJsb2FkTGlzdDpmZXRjaC1maW5pc2hlZFwiLCB7XHJcbiAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgbW9kZSxcclxuICAgICAgICAgIHJlcXVlc3RTZXEsXHJcbiAgICAgICAgICBzdWNjZXNzOiByZXNwb25zZT8uU3VjY2VzcyxcclxuICAgICAgICAgIHRvdGFsOiByZXNwb25zZT8uVG90YWwsXHJcbiAgICAgICAgICBpdGVtczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMubGVuZ3RoIDogMCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAocmVxdWVzdFNlcSAhPT0gYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJsb2FkTGlzdDphcGktdW5zdWNjZXNzZnVsXCIsIHtcclxuICAgICAgICAgICAgcGFnZSxcclxuICAgICAgICAgICAgbW9kZSxcclxuICAgICAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuTWVzc2FnZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIlRpY2tldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0cy5cIikpO1xyXG4gICAgICAgICAgc2V0SXRlbXMoW10pO1xyXG4gICAgICAgICAgc2V0VG90YWwoMCk7XHJcbiAgICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNvdXJjZUl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICAgICAgICBjb25zdCBtYXBwZWRJdGVtcyA9IHNvdXJjZUl0ZW1zLm1hcCgoaXRlbSkgPT5cclxuICAgICAgICAgIG1vZGUgPT09IFwibGlua1wiXHJcbiAgICAgICAgICAgID8gbWFwVGlja2V0TGlua0l0ZW1Ub0NhcmQoaXRlbSBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVxyXG4gICAgICAgICAgICA6IG1hcFRpY2tldEl0ZW1Ub0NhcmQoaXRlbSBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2VUb3RhbCA9IE51bWJlcihyZXNwb25zZT8uVG90YWwgPz8gbWFwcGVkSXRlbXMubGVuZ3RoID8/IDApO1xyXG5cclxuICAgICAgICBzZXRJdGVtcyhtYXBwZWRJdGVtcyk7XHJcbiAgICAgICAgc2V0VG90YWwocmVzcG9uc2VUb3RhbCk7XHJcbiAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKHJlcXVlc3RTZXEgIT09IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChpc0V4cGVuc2VBYm9ydExpa2VFcnJvcihlcnJvciwgY29udHJvbGxlci5zaWduYWwpKSB7XHJcbiAgICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwibG9hZExpc3Q6YWJvcnRlZFwiLCB7XHJcbiAgICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICAgIG1vZGUsXHJcbiAgICAgICAgICAgIHJlcXVlc3RTZXEsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogZXJyb3IsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJsb2FkTGlzdDpmb3JiaWRkZW5cIiwge1xyXG4gICAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgICBtb2RlLFxyXG4gICAgICAgICAgICByZXF1ZXN0U2VxLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0RXJyb3IoXCJsb2FkTGlzdDpmYWlsZWRcIiwge1xyXG4gICAgICAgICAgcGFnZSxcclxuICAgICAgICAgIG1vZGUsXHJcbiAgICAgICAgICByZXF1ZXN0U2VxLFxyXG4gICAgICAgICAgbWVzc2FnZTogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvcixcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiVGlja2V0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXRzLlwiKTtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICAgICAgc2V0SXRlbXMoW10pO1xyXG4gICAgICAgIHNldFRvdGFsKDApO1xyXG4gICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIGNvbnRyb2xsZXIuc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBoYW5kbGVBYm9ydFNpZ25hbCk7XHJcbiAgICAgICAgaWYgKHJlcXVlc3RTZXEgPT09IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyhcImxvYWRMaXN0OmZpbmFsaXplXCIsIHtcclxuICAgICAgICAgICAgcGFnZSxcclxuICAgICAgICAgICAgbW9kZSxcclxuICAgICAgICAgICAgcmVxdWVzdFNlcSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbaGFzQWNjZXNzLCBtb2RlLCBvbkZvcmJpZGRlbiwgcGFnZVNpemVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgcmVzZXRMaXN0ID0gdXNlQ2FsbGJhY2soKHNvdXJjZSA9IFwidW5rbm93blwiKSA9PiB7XHJcbiAgICBpZiAoYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCkge1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwicmVzZXRMaXN0OmFib3J0LWFjdGl2ZS1yZXF1ZXN0XCIsIHtcclxuICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgYWN0aXZlUmVxdWVzdEtleTogYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50LFxyXG4gICAgICAgIGFjdGl2ZVJlcXVlc3RTZXE6IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCxcclxuICAgICAgICBzdGFjazogYnVpbGRFeHBlbnNlVGlja2V0c0RlYnVnU3RhY2soYHJlc2V0TGlzdDoke3NvdXJjZX1gKSxcclxuICAgICAgfSk7XHJcbiAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQuYWJvcnQoKTtcclxuICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RJbmZvKFwicmVzZXRMaXN0OmNsZWFyLXN0YXRlXCIsIHtcclxuICAgICAgc291cmNlLFxyXG4gICAgfSk7XHJcbiAgICBzZXRJdGVtcyhbXSk7XHJcbiAgICBzZXRUb3RhbCgwKTtcclxuICAgIHNldEN1cnJlbnRQYWdlKDEpO1xyXG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgY2xlYXJMaXN0Q2FjaGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICAvLyBUaWNrZXQgbGlzdCBhdXRvLWxvYWQgbXVzdCBhbHdheXMgaGl0IHRoZSBsaXZlIGVuZHBvaW50LlxyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlmIChhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImNsZWFudXA6YWJvcnQtYWN0aXZlLXJlcXVlc3RcIiwge1xyXG4gICAgICAgICAgYWN0aXZlUmVxdWVzdEtleTogYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50LFxyXG4gICAgICAgICAgYWN0aXZlUmVxdWVzdFNlcTogYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50LFxyXG4gICAgICAgICAgc3RhY2s6IGJ1aWxkRXhwZW5zZVRpY2tldHNEZWJ1Z1N0YWNrKFwiY2xlYW51cDphYm9ydC1hY3RpdmUtcmVxdWVzdFwiKSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50LmFib3J0KCk7XHJcbiAgICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID0gXCJcIjtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpdGVtcyxcclxuICAgIHRvdGFsLFxyXG4gICAgY3VycmVudFBhZ2UsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBsb2FkTGlzdCxcclxuICAgIHJlc3RvcmVMaXN0U25hcHNob3QsXHJcbiAgICByZXNldExpc3QsXHJcbiAgICBjbGVhckxpc3RDYWNoZSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90LnRzXCI7XHJcbmltcG9ydCB7IHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VHYXN0b1R5cGVDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxyXG4gIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCxcclxuICBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGUsXHJcbn0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnksIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VTY29wZVRva2VuIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTY29wZS50c1wiO1xyXG5cclxuY29uc3QgRVhQRU5TRV9USUNLRVRfTElOS19SRVRVUk5fU1RBVEVfS0VZX1BSRUZJWCA9IFwiZXhwZW5zZV90aWNrZXRfbGlua19yZXR1cm5fc3RhdGVfdjFcIjtcclxuY29uc3QgRVhQRU5TRV9USUNLRVRfTElOS19SRVRVUk5fU1RBVEVfVFRMX01TID0gMTIgKiA2MCAqIDYwICogMTAwMDtcclxuXHJcbmV4cG9ydCB0eXBlIEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgPSB7XHJcbiAgc2hlZXRJZDogc3RyaW5nO1xyXG4gIHBhZ2U6IG51bWJlcjtcclxuICBzY3JvbGxZOiBudW1iZXI7XHJcbiAgZm9jdXNGaWxlSWQ6IHN0cmluZztcclxuICBmaWx0ZXJzOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90O1xyXG4gIHNlbGVjdGlvbk1vZGU6IEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZTtcclxuICBzZWxlY3RlZFRpY2tldHM6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtdO1xyXG4gIGV4Y2x1ZGVkSWRzOiBzdHJpbmdbXTtcclxuICBmaWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnM6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfCBudWxsO1xyXG4gIGZpbHRlcmVkU2VsZWN0aW9uVG90YWw6IG51bWJlcjtcclxufTtcclxuXHJcbmNvbnN0IGdldFNjb3BlZEtleSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBgJHtFWFBFTlNFX1RJQ0tFVF9MSU5LX1JFVFVSTl9TVEFURV9LRVlfUFJFRklYfV8ke2dldEV4cGVuc2VTY29wZVRva2VuKCl9YDtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUZpbGVJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVQcm9jZXNzZWRCeUFpID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB8IG51bGwgPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gZmFsc2UpIHJldHVybiB2YWx1ZTtcclxuICBpZiAodmFsdWUgPT09IDEgfHwgdmFsdWUgPT09IFwiMVwiIHx8IHZhbHVlID09PSBcInRydWVcIikgcmV0dXJuIHRydWU7XHJcbiAgaWYgKHZhbHVlID09PSAwIHx8IHZhbHVlID09PSBcIjBcIiB8fCB2YWx1ZSA9PT0gXCJmYWxzZVwiKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVOdWxsYWJsZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldEdhc3RvVHlwZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtcImdhc3RvVHlwZVwiXSA9PiB7XHJcbiAgcmV0dXJuIHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUodmFsdWUpIGFzIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtcImdhc3RvVHlwZVwiXTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVNlbGVjdGlvbk1vZGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGUgPT4ge1xyXG4gIHJldHVybiB2YWx1ZSA9PT0gXCJmaWx0ZXJlZFwiID8gXCJmaWx0ZXJlZFwiIDogXCJzZWxlY3RlZFwiO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplU2VsZWN0ZWRUaWNrZXRzID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZVRpY2tldExpbmtDYXJkW10gPT4ge1xyXG4gIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiBbXTtcclxuXHJcbiAgY29uc3QgaXRlbXMgPSBuZXcgTWFwPHN0cmluZywgRXhwZW5zZVRpY2tldExpbmtDYXJkPigpO1xyXG4gIGZvciAoY29uc3QgZW50cnkgb2YgdmFsdWUpIHtcclxuICAgIGNvbnN0IGl0ZW0gPSAoZW50cnkgfHwge30pIGFzIFBhcnRpYWw8RXhwZW5zZVRpY2tldExpbmtDYXJkPjtcclxuICAgIGNvbnN0IGZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZChpdGVtLmZpbGVJZCk7XHJcbiAgICBpZiAoIWZpbGVJZCkgY29udGludWU7XHJcblxyXG4gICAgaXRlbXMuc2V0KGZpbGVJZCwge1xyXG4gICAgICBraW5kOiBcImxpbmtcIixcclxuICAgICAgZmlsZUlkLFxyXG4gICAgICBkZXNjcmlwdGlvbjogU3RyaW5nKGl0ZW0uZGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpLFxyXG4gICAgICBwcm9jZXNzZWRCeUFJOiBub3JtYWxpemVQcm9jZXNzZWRCeUFpKGl0ZW0ucHJvY2Vzc2VkQnlBSSksXHJcbiAgICAgIGN1cnJlbmN5Q29kZTogU3RyaW5nKGl0ZW0uY3VycmVuY3lDb2RlIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgICAgdG90YWxBbW91bnQ6IG5vcm1hbGl6ZU51bGxhYmxlTnVtYmVyKGl0ZW0udG90YWxBbW91bnQpLFxyXG4gICAgICB0cmFuc0RhdGU6IFN0cmluZyhpdGVtLnRyYW5zRGF0ZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICAgIGZpbGVOYW1lOiBTdHJpbmcoaXRlbS5maWxlTmFtZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICAgIGdhc3RvVHlwZTogbm9ybWFsaXplVGlja2V0R2FzdG9UeXBlKGl0ZW0uZ2FzdG9UeXBlKSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIEFycmF5LmZyb20oaXRlbXMudmFsdWVzKCkpO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplRXhjbHVkZWRJZHMgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmdbXSA9PiB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIFtdO1xyXG5cclxuICBjb25zdCBpZHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcclxuICBmb3IgKGNvbnN0IGVudHJ5IG9mIHZhbHVlKSB7XHJcbiAgICBjb25zdCBmaWxlSWQgPSBub3JtYWxpemVGaWxlSWQoZW50cnkpO1xyXG4gICAgaWYgKCFmaWxlSWQpIGNvbnRpbnVlO1xyXG4gICAgaWRzLmFkZChmaWxlSWQpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIEFycmF5LmZyb20oaWRzKTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZU5vbk5lZ2F0aXZlSW50ZWdlciA9ICh2YWx1ZTogdW5rbm93biwgZmFsbGJhY2sgPSAwKTogbnVtYmVyID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSAmJiBwYXJzZWQgPj0gMCA/IE1hdGguZmxvb3IocGFyc2VkKSA6IGZhbGxiYWNrO1xyXG59O1xyXG5cclxuLy8gTm9ybWFsaXplcyB0aGUgbGluay1tb2RlIHRpY2tldCByZXR1cm4gc3RhdGUgc28gYmFjayBuYXZpZ2F0aW9uIGNhbiByZXN0b3JlIGZpbHRlcnMgYW5kIHNlbGVjdGlvbiBzYWZlbHkuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSB8IG51bGwgPT4ge1xyXG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgcGF5bG9hZCA9IHZhbHVlIGFzIFBhcnRpYWw8RXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZT47XHJcbiAgY29uc3Qgc2hlZXRJZCA9IFN0cmluZyhwYXlsb2FkLnNoZWV0SWQgfHwgXCJcIikudHJpbSgpO1xyXG4gIGlmICghc2hlZXRJZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzaGVldElkLFxyXG4gICAgcGFnZTogTWF0aC5tYXgoMSwgbm9ybWFsaXplTm9uTmVnYXRpdmVJbnRlZ2VyKHBheWxvYWQucGFnZSwgMSkpLFxyXG4gICAgc2Nyb2xsWTogbm9ybWFsaXplTm9uTmVnYXRpdmVJbnRlZ2VyKHBheWxvYWQuc2Nyb2xsWSksXHJcbiAgICBmb2N1c0ZpbGVJZDogbm9ybWFsaXplRmlsZUlkKHBheWxvYWQuZm9jdXNGaWxlSWQpLFxyXG4gICAgZmlsdGVyczogbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90KHBheWxvYWQuZmlsdGVycyksXHJcbiAgICBzZWxlY3Rpb25Nb2RlOiBub3JtYWxpemVTZWxlY3Rpb25Nb2RlKHBheWxvYWQuc2VsZWN0aW9uTW9kZSksXHJcbiAgICBzZWxlY3RlZFRpY2tldHM6IG5vcm1hbGl6ZVNlbGVjdGVkVGlja2V0cyhwYXlsb2FkLnNlbGVjdGVkVGlja2V0cyksXHJcbiAgICBleGNsdWRlZElkczogbm9ybWFsaXplRXhjbHVkZWRJZHMocGF5bG9hZC5leGNsdWRlZElkcyksXHJcbiAgICBmaWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnM6IHBheWxvYWQuZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzXHJcbiAgICAgID8gbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90KHBheWxvYWQuZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzKVxyXG4gICAgICA6IG51bGwsXHJcbiAgICBmaWx0ZXJlZFNlbGVjdGlvblRvdGFsOiBub3JtYWxpemVOb25OZWdhdGl2ZUludGVnZXIocGF5bG9hZC5maWx0ZXJlZFNlbGVjdGlvblRvdGFsKSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gUmVhZHMgYSBzdG9yZWQgbGluay1tb2RlIHJldHVybiBzdGF0ZSB3aGVuIGl0IHN0aWxsIG1hdGNoZXMgdGhlIGFjdGl2ZSBleHBlbnNlIHNoZWV0LlxyXG5leHBvcnQgY29uc3QgcmVhZEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgPSAoc2hlZXRJZD86IHVua25vd24pOiBFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlIHwgbnVsbCA9PiB7XHJcbiAgY29uc3Qgc3RvcmVkID0gbm9ybWFsaXplRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZShcclxuICAgIGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeTxFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlPihnZXRTY29wZWRLZXkoKSlcclxuICApO1xyXG4gIGlmICghc3RvcmVkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBTdHJpbmcoc2hlZXRJZCB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCFzYWZlU2hlZXRJZCkgcmV0dXJuIHN0b3JlZDtcclxuICByZXR1cm4gc3RvcmVkLnNoZWV0SWQudG9VcHBlckNhc2UoKSA9PT0gc2FmZVNoZWV0SWQudG9VcHBlckNhc2UoKSA/IHN0b3JlZCA6IG51bGw7XHJcbn07XHJcblxyXG4vLyBQZXJzaXN0cyB0aGUgbWluaW11bSBsaW5rLW1vZGUgc3RhdGUgcmVxdWlyZWQgdG8gcmV0dXJuIGZyb20gdGlja2V0IGRldGFpbCB3aXRob3V0IGxvc2luZyBzZWxlY3Rpb24uXHJcbmV4cG9ydCBjb25zdCBzYXZlRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSA9IChcclxuICB2YWx1ZTogRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSB8IG51bGwgfCB1bmRlZmluZWRcclxuKTogRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKHZhbHVlKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHtcclxuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkoZ2V0U2NvcGVkS2V5KCksIG5vcm1hbGl6ZWQsIEVYUEVOU0VfVElDS0VUX0xJTktfUkVUVVJOX1NUQVRFX1RUTF9NUyk7XHJcbiAgcmV0dXJuIG5vcm1hbGl6ZWQ7XHJcbn07XHJcblxyXG4vLyBDbGVhcnMgYW55IHN0b3JlZCBsaW5rLW1vZGUgcmV0dXJuIHN0YXRlIGZvciB0aGUgY3VycmVudCBleHBlbnNlIHNjb3BlLlxyXG5leHBvcnQgY29uc3QgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlID0gKCk6IHZvaWQgPT4ge1xyXG4gIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoZ2V0U2NvcGVkS2V5KCkpO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxyXG4gIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCxcclxuICBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGUsXHJcbn0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25TdGF0ZSA9IHtcclxuICBzZWxlY3Rpb25Nb2RlOiBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGU7XHJcbiAgc2VsZWN0ZWRUaWNrZXRzOiBFeHBlbnNlVGlja2V0TGlua0NhcmRbXTtcclxuICBleGNsdWRlZElkczogc3RyaW5nW107XHJcbiAgZmlsdGVyZWRTbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB8IG51bGw7XHJcbiAgZmlsdGVyZWRUb3RhbENvdW50OiBudW1iZXI7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVGaWxlSWQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVNlbGVjdGlvbk1vZGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGUgPT4ge1xyXG4gIHJldHVybiB2YWx1ZSA9PT0gXCJmaWx0ZXJlZFwiID8gXCJmaWx0ZXJlZFwiIDogXCJzZWxlY3RlZFwiO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplRXhjbHVkZWRJZHMgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmdbXSA9PiB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIFtdO1xyXG5cclxuICBjb25zdCBpZHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcclxuICBmb3IgKGNvbnN0IGVudHJ5IG9mIHZhbHVlKSB7XHJcbiAgICBjb25zdCBmaWxlSWQgPSBub3JtYWxpemVGaWxlSWQoZW50cnkpO1xyXG4gICAgaWYgKCFmaWxlSWQpIGNvbnRpbnVlO1xyXG4gICAgaWRzLmFkZChmaWxlSWQpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIEFycmF5LmZyb20oaWRzKTtcclxufTtcclxuXHJcbmNvbnN0IHRvU2VsZWN0ZWRNYXAgPSAoaXRlbXM6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtdKTogUmVjb3JkPHN0cmluZywgRXhwZW5zZVRpY2tldExpbmtDYXJkPiA9PiB7XHJcbiAgY29uc3QgbmV4dDogUmVjb3JkPHN0cmluZywgRXhwZW5zZVRpY2tldExpbmtDYXJkPiA9IHt9O1xyXG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xyXG4gICAgY29uc3QgZmlsZUlkID0gbm9ybWFsaXplRmlsZUlkKGl0ZW0uZmlsZUlkKTtcclxuICAgIGlmICghZmlsZUlkKSBjb250aW51ZTtcclxuICAgIG5leHRbZmlsZUlkXSA9IGl0ZW07XHJcbiAgfVxyXG4gIHJldHVybiBuZXh0O1xyXG59O1xyXG5cclxuLy8gS2VlcHMgbGluay1tb2RlIHRpY2tldCBzZWxlY3Rpb24gc3RhYmxlIGFjcm9zcyBwYWdpbmcsIGZpbHRlcmVkIHNlbGVjdC1hbGwsIGFuZCBkZXRhaWwgcmV0dXJucy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uID0gKCkgPT4ge1xyXG4gIGNvbnN0IFtzZWxlY3Rpb25Nb2RlLCBzZXRTZWxlY3Rpb25Nb2RlXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZT4oXCJzZWxlY3RlZFwiKTtcclxuICBjb25zdCBbc2VsZWN0ZWRUaWNrZXRzQnlJZCwgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZF0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBFeHBlbnNlVGlja2V0TGlua0NhcmQ+Pih7fSk7XHJcbiAgY29uc3QgW2V4Y2x1ZGVkSWRzLCBzZXRFeGNsdWRlZElkc10gPSB1c2VTdGF0ZTxzdHJpbmdbXT4oW10pO1xyXG4gIGNvbnN0IFtmaWx0ZXJlZFNuYXBzaG90LCBzZXRGaWx0ZXJlZFNuYXBzaG90XSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbZmlsdGVyZWRUb3RhbENvdW50LCBzZXRGaWx0ZXJlZFRvdGFsQ291bnRdID0gdXNlU3RhdGUoMCk7XHJcblxyXG4gIGNvbnN0IHNlbGVjdGVkVGlja2V0cyA9IHVzZU1lbW8oKCkgPT4gT2JqZWN0LnZhbHVlcyhzZWxlY3RlZFRpY2tldHNCeUlkKSwgW3NlbGVjdGVkVGlja2V0c0J5SWRdKTtcclxuICBjb25zdCBleGNsdWRlZElkU2V0ID0gdXNlTWVtbygoKSA9PiBuZXcgU2V0KGV4Y2x1ZGVkSWRzKSwgW2V4Y2x1ZGVkSWRzXSk7XHJcbiAgY29uc3QgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSA9IHNlbGVjdGlvbk1vZGUgPT09IFwiZmlsdGVyZWRcIiAmJiAhIWZpbHRlcmVkU25hcHNob3Q7XHJcblxyXG4gIGNvbnN0IGNsZWFyU2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0U2VsZWN0aW9uTW9kZShcInNlbGVjdGVkXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZCh7fSk7XHJcbiAgICBzZXRFeGNsdWRlZElkcyhbXSk7XHJcbiAgICBzZXRGaWx0ZXJlZFNuYXBzaG90KG51bGwpO1xyXG4gICAgc2V0RmlsdGVyZWRUb3RhbENvdW50KDApO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgcmVzdG9yZVNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKChzdGF0ZTogRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25TdGF0ZSB8IG51bGwgfCB1bmRlZmluZWQpID0+IHtcclxuICAgIGlmICghc3RhdGUpIHtcclxuICAgICAgY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRNb2RlID0gbm9ybWFsaXplU2VsZWN0aW9uTW9kZShzdGF0ZS5zZWxlY3Rpb25Nb2RlKTtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRTZWxlY3RlZFRpY2tldHMgPSBBcnJheS5pc0FycmF5KHN0YXRlLnNlbGVjdGVkVGlja2V0cykgPyBzdGF0ZS5zZWxlY3RlZFRpY2tldHMgOiBbXTtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRTbmFwc2hvdCA9IHN0YXRlLmZpbHRlcmVkU25hcHNob3QgfHwgbnVsbDtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRFeGNsdWRlZElkcyA9IG5vcm1hbGl6ZUV4Y2x1ZGVkSWRzKHN0YXRlLmV4Y2x1ZGVkSWRzKTtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRGaWx0ZXJlZFRvdGFsID0gTnVtYmVyLmlzRmluaXRlKE51bWJlcihzdGF0ZS5maWx0ZXJlZFRvdGFsQ291bnQpKVxyXG4gICAgICA/IE1hdGgubWF4KDAsIE1hdGguZmxvb3IoTnVtYmVyKHN0YXRlLmZpbHRlcmVkVG90YWxDb3VudCkpKVxyXG4gICAgICA6IDA7XHJcblxyXG4gICAgc2V0U2VsZWN0aW9uTW9kZShub3JtYWxpemVkTW9kZSA9PT0gXCJmaWx0ZXJlZFwiICYmIG5vcm1hbGl6ZWRTbmFwc2hvdCA/IFwiZmlsdGVyZWRcIiA6IFwic2VsZWN0ZWRcIik7XHJcbiAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKHRvU2VsZWN0ZWRNYXAobm9ybWFsaXplZFNlbGVjdGVkVGlja2V0cykpO1xyXG4gICAgc2V0RXhjbHVkZWRJZHMobm9ybWFsaXplZE1vZGUgPT09IFwiZmlsdGVyZWRcIiA/IG5vcm1hbGl6ZWRFeGNsdWRlZElkcyA6IFtdKTtcclxuICAgIHNldEZpbHRlcmVkU25hcHNob3Qobm9ybWFsaXplZE1vZGUgPT09IFwiZmlsdGVyZWRcIiA/IG5vcm1hbGl6ZWRTbmFwc2hvdCA6IG51bGwpO1xyXG4gICAgc2V0RmlsdGVyZWRUb3RhbENvdW50KG5vcm1hbGl6ZWRNb2RlID09PSBcImZpbHRlcmVkXCIgPyBub3JtYWxpemVkRmlsdGVyZWRUb3RhbCA6IDApO1xyXG4gIH0sIFtjbGVhclNlbGVjdGlvbl0pO1xyXG5cclxuICBjb25zdCBzZWxlY3RBbGxCeUZpbHRlcnMgPSB1c2VDYWxsYmFjaygoc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsIHRvdGFsQ291bnQ6IG51bWJlcikgPT4ge1xyXG4gICAgc2V0U2VsZWN0aW9uTW9kZShcImZpbHRlcmVkXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZCh7fSk7XHJcbiAgICBzZXRFeGNsdWRlZElkcyhbXSk7XHJcbiAgICBzZXRGaWx0ZXJlZFNuYXBzaG90KHNuYXBzaG90KTtcclxuICAgIHNldEZpbHRlcmVkVG90YWxDb3VudChOdW1iZXIuaXNGaW5pdGUodG90YWxDb3VudCkgPyBNYXRoLm1heCgwLCBNYXRoLmZsb29yKHRvdGFsQ291bnQpKSA6IDApO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaXNTZWxlY3RlZCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGZpbGVJZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNhZmVGaWxlSWQgPSBub3JtYWxpemVGaWxlSWQoZmlsZUlkKTtcclxuICAgICAgaWYgKCFzYWZlRmlsZUlkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICBpZiAoaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSkge1xyXG4gICAgICAgIHJldHVybiAhZXhjbHVkZWRJZFNldC5oYXMoc2FmZUZpbGVJZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAhIXNlbGVjdGVkVGlja2V0c0J5SWRbc2FmZUZpbGVJZF07XHJcbiAgICB9LFxyXG4gICAgW2V4Y2x1ZGVkSWRTZXQsIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUsIHNlbGVjdGVkVGlja2V0c0J5SWRdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgdG9nZ2xlVGlja2V0ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodGlja2V0OiBFeHBlbnNlVGlja2V0TGlua0NhcmQpID0+IHtcclxuICAgICAgY29uc3QgZmlsZUlkID0gbm9ybWFsaXplRmlsZUlkKHRpY2tldC5maWxlSWQpO1xyXG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgaWYgKGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUpIHtcclxuICAgICAgICBzZXRFeGNsdWRlZElkcygocHJldmlvdXMpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG5leHQgPSBuZXcgU2V0KHByZXZpb3VzKTtcclxuICAgICAgICAgIGlmIChuZXh0LmhhcyhmaWxlSWQpKSB7XHJcbiAgICAgICAgICAgIG5leHQuZGVsZXRlKGZpbGVJZCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXh0LmFkZChmaWxlSWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV4dCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKChwcmV2aW91cykgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXZpb3VzIH07XHJcbiAgICAgICAgaWYgKG5leHRbZmlsZUlkXSkge1xyXG4gICAgICAgICAgZGVsZXRlIG5leHRbZmlsZUlkXTtcclxuICAgICAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBuZXh0W2ZpbGVJZF0gPSB0aWNrZXQ7XHJcbiAgICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGh5ZHJhdGVWaXNpYmxlVGlja2V0cyA9IHVzZUNhbGxiYWNrKChpdGVtczogRXhwZW5zZVRpY2tldExpbmtDYXJkW10pID0+IHtcclxuICAgIGlmIChzZWxlY3Rpb25Nb2RlICE9PSBcInNlbGVjdGVkXCIgfHwgaXRlbXMubGVuZ3RoIDwgMSkgcmV0dXJuO1xyXG5cclxuICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXZpb3VzIH07XHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xyXG4gICAgICAgIGNvbnN0IGZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZChpdGVtLmZpbGVJZCk7XHJcbiAgICAgICAgaWYgKCFmaWxlSWQgfHwgIW5leHRbZmlsZUlkXSkgY29udGludWU7XHJcbiAgICAgICAgbmV4dFtmaWxlSWRdID0gaXRlbTtcclxuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gY2hhbmdlZCA/IG5leHQgOiBwcmV2aW91cztcclxuICAgIH0pO1xyXG4gIH0sIFtzZWxlY3Rpb25Nb2RlXSk7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVTZWxlY3RlZENvdW50ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZmFsbGJhY2tUb3RhbENvdW50ID0gMCk6IG51bWJlciA9PiB7XHJcbiAgICAgIGlmICghaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSkge1xyXG4gICAgICAgIHJldHVybiBzZWxlY3RlZFRpY2tldHMubGVuZ3RoO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBiYXNlQ291bnQgPSBmaWx0ZXJlZFRvdGFsQ291bnQgPiAwID8gZmlsdGVyZWRUb3RhbENvdW50IDogTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihmYWxsYmFja1RvdGFsQ291bnQpKTtcclxuICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIGJhc2VDb3VudCAtIGV4Y2x1ZGVkSWRzLmxlbmd0aCk7XHJcbiAgICB9LFxyXG4gICAgW2V4Y2x1ZGVkSWRzLmxlbmd0aCwgZmlsdGVyZWRUb3RhbENvdW50LCBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlLCBzZWxlY3RlZFRpY2tldHMubGVuZ3RoXVxyXG4gICk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzZWxlY3Rpb25Nb2RlLFxyXG4gICAgc2VsZWN0ZWRUaWNrZXRzLFxyXG4gICAgZXhjbHVkZWRJZHMsXHJcbiAgICBmaWx0ZXJlZFNuYXBzaG90LFxyXG4gICAgZmlsdGVyZWRUb3RhbENvdW50LFxyXG4gICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSxcclxuICAgIGlzU2VsZWN0ZWQsXHJcbiAgICB0b2dnbGVUaWNrZXQsXHJcbiAgICBjbGVhclNlbGVjdGlvbixcclxuICAgIHJlc3RvcmVTZWxlY3Rpb24sXHJcbiAgICBzZWxlY3RBbGxCeUZpbHRlcnMsXHJcbiAgICBoeWRyYXRlVmlzaWJsZVRpY2tldHMsXHJcbiAgICByZXNvbHZlU2VsZWN0ZWRDb3VudCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVkdWNlciB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkUmVxdWVzdCA9IHtcclxuICBwYWdlOiBudW1iZXI7XHJcbiAgc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3Q7XHJcbiAgY2xlYXJDYWNoZTogYm9vbGVhbjtcclxuICByZXNldEJlZm9yZUxvYWQ6IGJvb2xlYW47XHJcbiAgd2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeTogYm9vbGVhbjtcclxufTtcclxuXHJcbnR5cGUgQXV0b21hdGljTG9hZEFjdGlvbiA9XHJcbiAgfCB7XHJcbiAgICAgIHR5cGU6IFwic2NoZWR1bGVcIjtcclxuICAgICAgcmVxdWVzdDogRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRSZXF1ZXN0O1xyXG4gICAgfVxyXG4gIHwge1xyXG4gICAgICB0eXBlOiBcImNsZWFyXCI7XHJcbiAgICB9XHJcbiAgfCB7XHJcbiAgICAgIHR5cGU6IFwiZGlzYWJsZV9saW5rX3dhaXRcIjtcclxuICAgIH07XHJcblxyXG5jb25zdCBhdXRvbWF0aWNMb2FkUmVkdWNlciA9IChcclxuICBzdGF0ZTogRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRSZXF1ZXN0IHwgbnVsbCxcclxuICBhY3Rpb246IEF1dG9tYXRpY0xvYWRBY3Rpb25cclxuKTogRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRSZXF1ZXN0IHwgbnVsbCA9PiB7XHJcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgY2FzZSBcInNjaGVkdWxlXCI6XHJcbiAgICAgIHJldHVybiBhY3Rpb24ucmVxdWVzdDtcclxuICAgIGNhc2UgXCJjbGVhclwiOlxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIGNhc2UgXCJkaXNhYmxlX2xpbmtfd2FpdFwiOlxyXG4gICAgICByZXR1cm4gc3RhdGUgPyB7IC4uLnN0YXRlLCB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiBmYWxzZSB9IDogbnVsbDtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBzdGF0ZTtcclxuICB9XHJcbn07XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkQXJncyA9IHtcclxuICBpc0xpbmtNb2RlOiBib29sZWFuO1xyXG4gIGNhblByb2Nlc3NMaW5rTW9kZTogYm9vbGVhbjtcclxuICBsaW5rU2hlZXRDaGVja0J1c3k6IGJvb2xlYW47XHJcbiAgbGlua1NoZWV0TG9ja2VkOiBib29sZWFuO1xyXG4gIGNsZWFyTGlzdENhY2hlOiAoKSA9PiB2b2lkO1xyXG4gIHJlc2V0TGlzdDogKHNvdXJjZT86IHN0cmluZykgPT4gdm9pZDtcclxuICBsb2FkTGlzdDogKHBhZ2U6IG51bWJlciwgc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpID0+IFByb21pc2U8dm9pZD47XHJcbn07XHJcblxyXG5jb25zdCBFWFBFTlNFX1RJQ0tFVFNfQVVUT19MT0FEX0xPR19QUkVGSVggPSBcIltleHBlbnNlLXRpY2tldHM6YXV0by1sb2FkXVwiO1xyXG5cclxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZEluZm8gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLmluZm8gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS5pbmZvKEVYUEVOU0VfVElDS0VUU19BVVRPX0xPQURfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZFdhcm4gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLndhcm4gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS53YXJuKEVYUEVOU0VfVElDS0VUU19BVVRPX0xPQURfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gUXVldWVzIG9uZSB0aWNrZXQgbGlzdCByZWxvYWQgYW5kIHJlbGVhc2VzIGl0IG9ubHkgd2hlbiBsaW5rLW1vZGUgcHJlY29uZGl0aW9ucyBhcmUgcmVhZHkuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZCA9ICh7XHJcbiAgaXNMaW5rTW9kZSxcclxuICBjYW5Qcm9jZXNzTGlua01vZGUsXHJcbiAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gIGxpbmtTaGVldExvY2tlZCxcclxuICBjbGVhckxpc3RDYWNoZSxcclxuICByZXNldExpc3QsXHJcbiAgbG9hZExpc3QsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkQXJncykgPT4ge1xyXG4gIGNvbnN0IFtwZW5kaW5nQXV0b21hdGljTG9hZCwgZGlzcGF0Y2hdID0gdXNlUmVkdWNlcihhdXRvbWF0aWNMb2FkUmVkdWNlciwgbnVsbCk7XHJcblxyXG4gIGNvbnN0IHJ1bkF1dG9tYXRpY0xpc3RMb2FkID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoXHJcbiAgICAgIHBhZ2U6IG51bWJlcixcclxuICAgICAgc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICBjbGVhckNhY2hlPzogYm9vbGVhbjtcclxuICAgICAgICByZXNldEJlZm9yZUxvYWQ/OiBib29sZWFuO1xyXG4gICAgICAgIHdhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHk/OiBib29sZWFuO1xyXG4gICAgICB9ID0ge31cclxuICAgICkgPT4ge1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkSW5mbyhcInJ1bkF1dG9tYXRpY0xpc3RMb2FkOnNjaGVkdWxlXCIsIHtcclxuICAgICAgICBwYWdlLFxyXG4gICAgICAgIHNuYXBzaG90LFxyXG4gICAgICAgIG9wdGlvbnMsXHJcbiAgICAgIH0pO1xyXG4gICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJzY2hlZHVsZVwiLFxyXG4gICAgICAgIHJlcXVlc3Q6IHtcclxuICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICBzbmFwc2hvdCxcclxuICAgICAgICAgIGNsZWFyQ2FjaGU6IG9wdGlvbnMuY2xlYXJDYWNoZSA9PT0gdHJ1ZSxcclxuICAgICAgICAgIHJlc2V0QmVmb3JlTG9hZDogb3B0aW9ucy5yZXNldEJlZm9yZUxvYWQgPT09IHRydWUsXHJcbiAgICAgICAgICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiBvcHRpb25zLndhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHkgPT09IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFwZW5kaW5nQXV0b21hdGljTG9hZCkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChwZW5kaW5nQXV0b21hdGljTG9hZC53YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5KSB7XHJcbiAgICAgIGlmICghaXNMaW5rTW9kZSkge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzQXV0b0xvYWRXYXJuKFwicGVuZGluZ0F1dG9tYXRpY0xvYWQ6ZGlzYWJsZS1saW5rLXdhaXRcIiwge1xyXG4gICAgICAgICAgcGFnZTogcGVuZGluZ0F1dG9tYXRpY0xvYWQucGFnZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IFwiZGlzYWJsZV9saW5rX3dhaXRcIiB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghY2FuUHJvY2Vzc0xpbmtNb2RlIHx8IGxpbmtTaGVldENoZWNrQnVzeSkge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzQXV0b0xvYWRJbmZvKFwicGVuZGluZ0F1dG9tYXRpY0xvYWQ6d2FpdGluZy1saW5rLW1vZGUtcmVhZHlcIiwge1xyXG4gICAgICAgICAgcGFnZTogcGVuZGluZ0F1dG9tYXRpY0xvYWQucGFnZSxcclxuICAgICAgICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcclxuICAgICAgICAgIGxpbmtTaGVldENoZWNrQnVzeSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChsaW5rU2hlZXRMb2NrZWQpIHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkV2FybihcInBlbmRpbmdBdXRvbWF0aWNMb2FkOmNsZWFyLWxpbmstbG9ja2VkXCIsIHtcclxuICAgICAgICAgIHBhZ2U6IHBlbmRpbmdBdXRvbWF0aWNMb2FkLnBhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcImNsZWFyXCIgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyBwYWdlLCBzbmFwc2hvdCwgY2xlYXJDYWNoZSwgcmVzZXRCZWZvcmVMb2FkIH0gPSBwZW5kaW5nQXV0b21hdGljTG9hZDtcclxuICAgIGRpc3BhdGNoKHsgdHlwZTogXCJjbGVhclwiIH0pO1xyXG4gICAgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZEluZm8oXCJwZW5kaW5nQXV0b21hdGljTG9hZDpleGVjdXRlXCIsIHtcclxuICAgICAgcGFnZSxcclxuICAgICAgc25hcHNob3QsXHJcbiAgICAgIGNsZWFyQ2FjaGUsXHJcbiAgICAgIHJlc2V0QmVmb3JlTG9hZCxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChjbGVhckNhY2hlKSB7XHJcbiAgICAgIGNsZWFyTGlzdENhY2hlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlc2V0QmVmb3JlTG9hZCkge1xyXG4gICAgICByZXNldExpc3QoXCJhdXRvbWF0aWMtbG9hZDpyZXNldC1iZWZvcmUtbG9hZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICB2b2lkIGxvYWRMaXN0KHBhZ2UsIHNuYXBzaG90KTtcclxuICB9LCBbXHJcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXHJcbiAgICBjbGVhckxpc3RDYWNoZSxcclxuICAgIGlzTGlua01vZGUsXHJcbiAgICBsaW5rU2hlZXRDaGVja0J1c3ksXHJcbiAgICBsaW5rU2hlZXRMb2NrZWQsXHJcbiAgICBsb2FkTGlzdCxcclxuICAgIHBlbmRpbmdBdXRvbWF0aWNMb2FkLFxyXG4gICAgcmVzZXRMaXN0LFxyXG4gIF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcnVuQXV0b21hdGljTGlzdExvYWQsXHJcbiAgfTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBa0c7OztBQ0FsRyxtQkFBbUM7QUF5RDdCO0FBckNOLElBQU0sZ0NBQWdDLENBQUM7QUFBQSxFQUNyQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUEwQztBQUN4QyxRQUFNLHFCQUFxQixnQkFBZ0IsQ0FBQztBQUU1QyxRQUFNLHVCQUFtQiwwQkFBWSxNQUFNO0FBQ3pDLGlCQUFhO0FBQUEsRUFDZixHQUFHLENBQUMsWUFBWSxDQUFDO0FBRWpCLFFBQU0sNEJBQXdCLDBCQUFZLE1BQU07QUFDOUMsUUFBSSxDQUFDLG1CQUFvQjtBQUN6QixtQkFBZTtBQUFBLEVBQ2pCLEdBQUcsQ0FBQyxvQkFBb0IsY0FBYyxDQUFDO0FBRXZDLFFBQU0sa0NBQWtDLGFBQ3BDLG1EQUNBLHFCQUNFLG1HQUNBO0FBRU4sU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsV0FBVyxhQUFhLG9FQUFvRTtBQUFBLE1BQzVGLHVCQUFxQixVQUFVO0FBQUEsTUFDL0Isd0JBQXNCLGFBQWEsU0FBUztBQUFBLE1BQzVDLDBCQUF3QixxQkFBcUIsU0FBUztBQUFBLE1BRXRELHVEQUFDLFNBQUksV0FBVSxZQUNiO0FBQUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQSxRQUFRO0FBQUEsWUFDUixnQkFBZTtBQUFBLFlBQ2Ysa0JBQWtCO0FBQUEsY0FDaEIsY0FBYztBQUFBLGNBQ2QsZUFBZSxDQUFDLFVBQVU7QUFDeEIsc0JBQU0sZUFBZTtBQUFBLGNBQ3ZCO0FBQUEsWUFDRjtBQUFBO0FBQUEsUUFDRjtBQUFBLFFBRUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLE1BQUs7QUFBQSxZQUNMLGNBQVk7QUFBQSxZQUNaLGdCQUFjO0FBQUEsWUFDZCxPQUFPO0FBQUEsWUFDUCxVQUFVLENBQUM7QUFBQSxZQUNYLFNBQVM7QUFBQSxZQUNULFdBQVU7QUFBQSxZQUVWO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0MsV0FBVyxtR0FBbUcsK0JBQStCO0FBQUEsZ0JBRTdJLHNEQUFDLHFCQUFVLFdBQVUscUJBQW9CLGFBQWEsS0FBSyxlQUFZLFFBQU87QUFBQTtBQUFBLFlBQ2hGO0FBQUE7QUFBQSxRQUNGO0FBQUEsU0FDRjtBQUFBO0FBQUEsRUFDRjtBQUVKO0FBRUEsSUFBTyx3Q0FBUTs7O0FDekVULElBQUFDLHNCQUFBO0FBTE4sSUFBTSw2QkFBNkIsQ0FBQyxFQUFFLE9BQU8sT0FBTyxjQUFjLE1BQXVDO0FBQ3ZHLE1BQUksTUFBTSxTQUFTLEVBQUcsUUFBTztBQUU3QixTQUNFLDhDQUFDLFNBQUksV0FBVyx5Q0FBeUMsYUFBYSxJQUNwRTtBQUFBLGlEQUFDLE9BQUUsV0FBVSx5QkFBeUIsaUJBQU07QUFBQSxJQUM1Qyw2Q0FBQyxTQUFJLFdBQVUsa0JBQ1osZ0JBQU0sSUFBSSxDQUFDLFNBQ1Y7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUVDLFdBQVU7QUFBQSxRQUVWO0FBQUEsd0RBQUMsT0FDQztBQUFBLDBEQUFDLFVBQUssV0FBVSxpQkFBaUI7QUFBQSxtQkFBSyw0QkFBNEIsUUFBUTtBQUFBLGNBQUU7QUFBQSxlQUFDO0FBQUEsWUFBUTtBQUFBLFlBQ3JGLDZDQUFDLFVBQU0sZUFBSyxZQUFZLEtBQUk7QUFBQSxhQUM5QjtBQUFBLFVBQ0EsOENBQUMsT0FBRSxXQUFVLFFBQ1g7QUFBQSwwREFBQyxVQUFLLFdBQVUsaUJBQWlCO0FBQUEsbUJBQUssd0NBQXdDLFFBQVE7QUFBQSxjQUFFO0FBQUEsZUFBQztBQUFBLFlBQVE7QUFBQSxZQUNqRyw2Q0FBQyxVQUFNLGVBQUssVUFBVSxLQUFJO0FBQUEsYUFDNUI7QUFBQTtBQUFBO0FBQUEsTUFWSyxHQUFHLEtBQUssWUFBWSxTQUFTLElBQUksS0FBSyxVQUFVLFdBQVc7QUFBQSxJQVdsRSxDQUNELEdBQ0g7QUFBQSxLQUNGO0FBRUo7QUFHQSxJQUFNLCtCQUErQixDQUFDLEVBQUUsT0FBTyxNQUF5QztBQUN0RixNQUFJLENBQUMsT0FBUSxRQUFPO0FBRXBCLFFBQU0sY0FBYztBQUFBLElBQ2xCO0FBQUEsTUFDRSxLQUFLO0FBQUEsTUFDTCxPQUFPLEtBQUssMkNBQTJDLGFBQWE7QUFBQSxNQUNwRSxPQUFPLE9BQU87QUFBQSxJQUNoQjtBQUFBLElBQ0E7QUFBQSxNQUNFLEtBQUs7QUFBQSxNQUNMLE9BQU8sS0FBSyx3Q0FBd0MsWUFBWTtBQUFBLE1BQ2hFLE9BQU8sT0FBTztBQUFBLElBQ2hCO0FBQUEsSUFDQTtBQUFBLE1BQ0UsS0FBSztBQUFBLE1BQ0wsT0FBTyxLQUFLLHlDQUF5QyxVQUFVO0FBQUEsTUFDL0QsT0FBTyxPQUFPO0FBQUEsSUFDaEI7QUFBQSxJQUNBO0FBQUEsTUFDRSxLQUFLO0FBQUEsTUFDTCxPQUFPLEtBQUssd0NBQXdDLFVBQVU7QUFBQSxNQUM5RCxPQUFPLE9BQU87QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFFQSxTQUNFLDhDQUFDLFNBQUksV0FBVSx3R0FDYjtBQUFBLGtEQUFDLFNBQ0M7QUFBQSxtREFBQyxPQUFFLFdBQVUsd0NBQ1YsZUFBSyx1Q0FBdUMsNkJBQTBCLEdBQ3pFO0FBQUEsTUFDQyxPQUFPLGlCQUNOLDhDQUFDLE9BQUUsV0FBVSwrQkFDVjtBQUFBLGFBQUssOEJBQThCLGVBQWU7QUFBQSxRQUFFO0FBQUEsUUFBRyxPQUFPO0FBQUEsU0FDakUsSUFDRTtBQUFBLE9BQ047QUFBQSxJQUVBLDZDQUFDLFNBQUksV0FBVSx5Q0FDWixzQkFBWSxJQUFJLENBQUMsU0FDaEIsOENBQUMsU0FBbUIsV0FBVSx3RkFDNUI7QUFBQSxtREFBQyxPQUFFLFdBQVUsd0VBQXdFLGVBQUssT0FBTTtBQUFBLE1BQ2hHLDZDQUFDLE9BQUUsV0FBVSwyQ0FBMkMsZUFBSyxPQUFNO0FBQUEsU0FGM0QsS0FBSyxHQUdmLENBQ0QsR0FDSDtBQUFBLElBRUEsOENBQUMsU0FBSSxXQUFVLHlDQUNiO0FBQUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE9BQU8sS0FBSyx5Q0FBeUMsVUFBVTtBQUFBLFVBQy9ELE9BQU8sTUFBTSxRQUFRLE9BQU8sT0FBTyxJQUFJLE9BQU8sVUFBVSxDQUFDO0FBQUEsVUFDekQsZUFBYztBQUFBO0FBQUEsTUFDaEI7QUFBQSxNQUNBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxPQUFPLEtBQUssd0NBQXdDLFVBQVU7QUFBQSxVQUM5RCxPQUFPLE1BQU0sUUFBUSxPQUFPLE1BQU0sSUFBSSxPQUFPLFNBQVMsQ0FBQztBQUFBLFVBQ3ZELGVBQWM7QUFBQTtBQUFBLE1BQ2hCO0FBQUEsT0FDRjtBQUFBLEtBQ0Y7QUFFSjtBQUVBLElBQU8sdUNBQVE7OztBQzNHZixJQUFBQyxnQkFBK0I7OztBQ0EvQixJQUFBQyxnQkFBK0I7QUFxQzNCLElBQUFDLHNCQUFBO0FBcEJKLElBQU0sbUNBQW1DLENBQUM7QUFBQSxFQUN4QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUNkLE1BQTZDO0FBQzNDLFFBQU0sVUFBVSxVQUFVLFFBQVEsS0FBSztBQUN2QyxRQUFNLGNBQVU7QUFBQSxJQUNkLE1BQU07QUFBQSxNQUNKLEVBQUUsT0FBTyxPQUFPLE1BQU0sS0FBSyxzQkFBc0IsS0FBSyxFQUFFO0FBQUEsTUFDeEQsRUFBRSxPQUFPLE9BQU8sTUFBTSxLQUFLLG9DQUFvQyxLQUFLLEVBQUU7QUFBQSxNQUN0RSxFQUFFLE9BQU8sTUFBTSxNQUFNLEtBQUssbUNBQW1DLElBQUksRUFBRTtBQUFBLElBQ3JFO0FBQUEsSUFDQSxDQUFDO0FBQUEsRUFDSDtBQUVBLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLE9BQU87QUFBQSxNQUNQLFVBQVUsQ0FBQyxjQUFjO0FBQ3ZCLFlBQUksY0FBYyxTQUFTLGNBQWMsUUFBUSxjQUFjLE9BQU87QUFDcEUsbUJBQVMsU0FBUztBQUNsQjtBQUFBLFFBQ0Y7QUFDQSxpQkFBUyxLQUFLO0FBQUEsTUFDaEI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsUUFBTztBQUFBLE1BQ1AsaUJBQWdCO0FBQUEsTUFDaEIsZ0JBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCO0FBQUE7QUFBQSxFQUNGO0FBRUo7QUFFQSxJQUFPLDJDQUFROzs7QUM1RGYsSUFBQUMsZ0JBQW1DO0FBb0o3QixJQUFBQyxzQkFBQTtBQTFITixJQUFNLG1CQUFtQjtBQUd6QixJQUFNLDRCQUE0QixDQUNoQyxNQUNBLE1BQ0EsVUFDQSxtQkFDQSxpQkFDQSxrQkFDc0U7QUFDdEUsUUFBTSxXQUFXLE9BQU8sUUFBUSxFQUFFLEVBQUUsS0FBSztBQUN6QyxRQUFNLGNBQWM7QUFBQSxJQUNsQixNQUFNLE9BQU8sU0FBUyxJQUFJLEtBQUssT0FBTyxJQUFJLEtBQUssTUFBTSxJQUFJLElBQUk7QUFBQSxJQUM3RCxVQUFVLE9BQU8sU0FBUyxRQUFRLEtBQUssV0FBVyxJQUFJLEtBQUssTUFBTSxRQUFRLElBQUk7QUFBQSxJQUM3RSxpQkFBaUIsbUJBQW1CO0FBQUEsSUFDcEMsZUFBZSxpQkFBaUI7QUFBQSxJQUNoQyxXQUFXLFlBQVk7QUFBQSxJQUN2QixRQUFRLFlBQVk7QUFBQSxFQUN0QjtBQUVBLE1BQUksc0JBQXNCLEtBQUssc0JBQXNCLEdBQUc7QUFDdEQsV0FBTztBQUFBLE1BQ0wsR0FBRztBQUFBLE1BQ0gsUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNUO0FBRUEsSUFBTSxtQkFBbUIsQ0FDdkIsVUFDeUI7QUFDekIsVUFBUSxNQUFNLFFBQVEsS0FBSyxJQUFJLFFBQVEsQ0FBQyxHQUNyQyxJQUFJLENBQUMsU0FBUztBQUNiLFVBQU0sU0FBUyxPQUFPLE1BQU0sVUFBVSxFQUFFLEVBQUUsS0FBSztBQUMvQyxRQUFJLENBQUMsT0FBUSxRQUFPO0FBRXBCLFVBQU0sY0FBYyxPQUFPLE1BQU0sZUFBZSxFQUFFLEVBQUUsS0FBSztBQUN6RCxVQUFNLFdBQVcsZUFBZTtBQUNoQyxXQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUDtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUMsRUFDQSxPQUFPLE9BQU87QUFDbkI7QUFHQSxJQUFNLDhCQUE4QixDQUFDO0FBQUEsRUFDbkM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLE9BQU87QUFBQSxFQUNQLGtCQUFrQjtBQUFBLEVBQ2xCLGdCQUFnQjtBQUFBLEVBQ2hCLDBCQUEwQjtBQUFBLEVBQzFCLG9CQUFvQjtBQUFBLEVBQ3BCLFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUNYLFlBQVk7QUFDZCxNQUF3QztBQUN0QyxRQUFNLGVBQWUsWUFBWTtBQUVqQyxRQUFNLGtCQUFjLDJCQUFZLE9BQU8sTUFBYyxXQUF1RDtBQUMxRyxVQUFNLFVBQVUsMEJBQTBCLE1BQU0sR0FBRyxrQkFBa0IsbUJBQW1CLGlCQUFpQixhQUFhO0FBQ3RILFVBQU0sV0FDSixTQUFTLFNBQ0wsTUFBTSxnQ0FBZ0MsU0FBOEM7QUFBQSxNQUNsRix5QkFBeUI7QUFBQSxNQUN6QjtBQUFBLElBQ0YsQ0FBQyxJQUNELE1BQU0sNkJBQTZCLFNBQTBDO0FBQUEsTUFDM0UseUJBQXlCO0FBQUEsTUFDekI7QUFBQSxJQUNGLENBQUM7QUFFUCxRQUFJLFVBQVUsWUFBWSxPQUFPO0FBQy9CLGFBQU8sQ0FBQztBQUFBLElBQ1Y7QUFFQSxXQUFPLGlCQUFpQixVQUFVLEtBQUs7QUFBQSxFQUN6QyxHQUFHLENBQUMsaUJBQWlCLGVBQWUsbUJBQW1CLElBQUksQ0FBQztBQUU1RCxRQUFNLHNCQUFrQiwyQkFBWSxPQUFPLE1BQWMsTUFBYyxXQUFtQixXQUF3QjtBQUNoSCxVQUFNLFVBQVU7QUFBQSxNQUNkO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQ0EsVUFBTSxXQUNKLFNBQVMsU0FDTCxNQUFNLGdDQUFnQyxTQUE4QztBQUFBLE1BQ2xGLHlCQUF5QjtBQUFBLE1BQ3pCO0FBQUEsSUFDRixDQUFDLElBQ0QsTUFBTSw2QkFBNkIsU0FBMEM7QUFBQSxNQUMzRSx5QkFBeUI7QUFBQSxNQUN6QjtBQUFBLElBQ0YsQ0FBQztBQUVQLFFBQUksVUFBVSxZQUFZLE9BQU87QUFDL0IsYUFBTztBQUFBLFFBQ0wsT0FBTyxDQUFDO0FBQUEsUUFDUixPQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFFQSxXQUFPO0FBQUEsTUFDTCxPQUFPLGlCQUFpQixVQUFVLEtBQUs7QUFBQSxNQUN2QyxPQUFPLE9BQU8sVUFBVSxTQUFTLENBQUM7QUFBQSxJQUNwQztBQUFBLEVBQ0YsR0FBRyxDQUFDLGlCQUFpQixlQUFlLG1CQUFtQixJQUFJLENBQUM7QUFFNUQsTUFBSSxDQUFDLDJCQUEyQixjQUFjO0FBQzVDLFdBQ0UsOENBQUMsU0FBSSxXQUFVLGFBQ1o7QUFBQSxrQkFDQyw2Q0FBQyxXQUFNLFdBQVUsNEJBQTJCLE9BQU8sRUFBRSxPQUFPLFlBQVksR0FDckUsaUJBQ0gsSUFDRTtBQUFBLE1BQ0o7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLFdBQVU7QUFBQSxVQUNWO0FBQUEsVUFDQSxVQUFVLENBQUMsVUFBVSxTQUFTLE1BQU0sT0FBTyxLQUFLO0FBQUEsVUFDaEQ7QUFBQSxVQUNBLGNBQVk7QUFBQSxVQUNaO0FBQUEsVUFDQTtBQUFBO0FBQUEsTUFDRjtBQUFBLE9BQ0Y7QUFBQSxFQUVKO0FBRUEsU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0M7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLFVBQVUsT0FBTyxNQUFNLFdBQVc7QUFDaEMsWUFBSTtBQUNGLGlCQUFPLE1BQU0sWUFBWSxNQUFNLE1BQU07QUFBQSxRQUN2QyxTQUFTLE9BQU87QUFDZCxjQUFJLGlCQUFpQixpQkFBaUIsTUFBTSxXQUFXLEtBQUs7QUFDMUQsbUJBQU8sQ0FBQztBQUFBLFVBQ1Y7QUFDQSxnQkFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsTUFDQSxjQUFjLE9BQU8sTUFBTSxNQUFNLFVBQVUsV0FBVztBQUNwRCxZQUFJO0FBQ0YsaUJBQU8sTUFBTSxnQkFBZ0IsTUFBTSxNQUFNLFVBQVUsTUFBTTtBQUFBLFFBQzNELFNBQVMsT0FBTztBQUNkLGNBQUksaUJBQWlCLGlCQUFpQixNQUFNLFdBQVcsS0FBSztBQUMxRCxtQkFBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLE9BQU8sRUFBRTtBQUFBLFVBQy9CO0FBQ0EsZ0JBQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBTztBQUFBLE1BQ1AsaUJBQWlCO0FBQUEsTUFDakIsVUFBVTtBQUFBLE1BQ1Ysa0JBQWdCO0FBQUEsTUFDaEIsWUFBVTtBQUFBLE1BQ1YsZ0JBQWM7QUFBQSxNQUNkO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLGdCQUFlO0FBQUE7QUFBQSxFQUNqQjtBQUVKO0FBRUEsSUFBTyxzQ0FBUTs7O0FGM0VQLElBQUFDLHNCQUFBO0FBL0dSLElBQU0sZUFBZSxDQUFDLFFBQTZCO0FBQ2pELE1BQUksQ0FBQyxJQUFLLFFBQU87QUFDakIsUUFBTSxRQUFRLE9BQU8sR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQzdDLE1BQUksQ0FBQyxzQkFBc0IsS0FBSyxLQUFLLEVBQUcsUUFBTztBQUMvQyxRQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxNQUFNLE1BQU0sR0FBRyxFQUFFLElBQUksTUFBTTtBQUN0RCxTQUFPLElBQUksS0FBSyxNQUFNLFFBQVEsR0FBRyxHQUFHO0FBQ3RDO0FBRUEsSUFBTSxhQUFhLENBQUMsS0FBYSxXQUEyQjtBQUMxRCxRQUFNLE9BQU8sYUFBYSxHQUFHO0FBQzdCLE1BQUksQ0FBQyxLQUFNLFFBQU87QUFDbEIsU0FBTyxLQUNKLG1CQUFtQixRQUFRO0FBQUEsSUFDMUIsS0FBSztBQUFBLElBQ0wsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1IsQ0FBQyxFQUNBLFFBQVEsT0FBTyxFQUFFLEVBQ2pCLFlBQVk7QUFDakI7QUFzQ0EsSUFBTSw2QkFBNkIsQ0FBQztBQUFBLEVBQ2xDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLHVCQUF1QjtBQUFBLEVBQ3ZCLG9CQUFvQjtBQUFBLEVBQ3BCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUF1QztBQUNyQyxRQUFNLG9CQUFnQix1QkFBUSxNQUFNLG9DQUFvQyxHQUFHLENBQUMsQ0FBQztBQUU3RSxRQUFNLHNCQUFrQix1QkFBK0IsTUFBTTtBQUMzRCxXQUFPO0FBQUEsTUFDTCxFQUFFLE9BQU8sSUFBSSxNQUFNLEtBQUssc0JBQXNCLEtBQUssRUFBRTtBQUFBLE1BQ3JELEdBQUc7QUFBQSxJQUNMO0FBQUEsRUFDRixHQUFHLENBQUMsZ0JBQWdCLENBQUM7QUFFckIsTUFBSSxDQUFDLFFBQVMsUUFBTztBQUNyQixRQUFNLFNBQVMsVUFBVSxpQkFBaUIsUUFBUTtBQUNsRCxRQUFNLHdCQUF3QixDQUFDLHdCQUF3QixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdkUsUUFBTSxtQkFBbUIsU0FBUztBQUNsQyxRQUFNLDBCQUEwQix3QkFDM0IsbUJBQW1CLG1CQUFtQixtQkFDdEMsbUJBQW1CLG1CQUFtQjtBQUUzQyxTQUNFLDZDQUFDLFNBQUksV0FBVSwyREFDYix3REFBQyxTQUFJLFdBQVUsZ0RBQ2I7QUFBQSxpREFBQyxtQ0FBd0IsbUJBQXNDLHFCQUEwQztBQUFBLElBRXhHLHVCQUNDO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBLFVBQVU7QUFBQSxRQUNWLGlCQUFpQjtBQUFBLFFBQ2pCLG1CQUFtQjtBQUFBLFFBQ25CLGlCQUFpQjtBQUFBLFFBQ2pCLGdCQUFnQix1QkFBdUIsQ0FBQztBQUFBLFFBQ3hDLGNBQWMsdUJBQXVCLENBQUM7QUFBQTtBQUFBLElBQ3hDLElBQ0Usd0JBQ0Y7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLGtCQUFrQixLQUFLLGdCQUFnQixNQUFNO0FBQUEsUUFDN0MsZ0JBQWdCLEtBQUssY0FBYyxJQUFJO0FBQUEsUUFDdkMsV0FBVyxXQUFXLFVBQVUsTUFBTTtBQUFBLFFBQ3RDLFNBQVMsV0FBVyxRQUFRLE1BQU07QUFBQSxRQUNsQyxXQUFVO0FBQUE7QUFBQSxJQUNaLElBQ0U7QUFBQSxJQUVKLDhDQUFDLFNBQUksV0FBVyxtQ0FBbUMsdUJBQXVCLFVBQ3hFO0FBQUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE9BQU8sS0FBSyw0QkFBNEIsUUFBUTtBQUFBLFVBQ2hELGFBQWEsS0FBSyw0QkFBNEIsUUFBUTtBQUFBLFVBQ3RELE9BQU87QUFBQSxVQUNQLFVBQVU7QUFBQSxVQUNWO0FBQUEsVUFDQSxpQkFBaUI7QUFBQSxVQUNqQixlQUFlO0FBQUEsVUFDZix5QkFBdUI7QUFBQSxVQUN2QixtQkFBbUIsU0FBUyxZQUFZLG9CQUFvQjtBQUFBLFVBQzVELFdBQVc7QUFBQTtBQUFBLE1BQ2I7QUFBQSxNQUVBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxPQUFPLEtBQUssaUNBQWlDLFVBQVU7QUFBQSxVQUN2RCxhQUFhLEtBQUssaUNBQWlDLFVBQVU7QUFBQSxVQUM3RCxPQUFPO0FBQUEsVUFDUCxVQUFVO0FBQUEsVUFDVixXQUFXO0FBQUEsVUFDWCxzQkFBc0I7QUFBQTtBQUFBLE1BQ3hCO0FBQUEsTUFFQyx3QkFDQztBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsT0FBTyxLQUFLLGVBQWUsTUFBTTtBQUFBLFVBQ2pDLGFBQWEsS0FBSyxlQUFlLE1BQU07QUFBQSxVQUN2QyxPQUFPO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBLFVBQVU7QUFBQSxVQUNWLFdBQVc7QUFBQTtBQUFBLE1BQ2IsSUFDRTtBQUFBLE1BRUgsbUJBQ0M7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE9BQU8sS0FBSyx5QkFBeUIsUUFBUTtBQUFBLFVBQzdDLGFBQWEsS0FBSyx5QkFBeUIsUUFBUTtBQUFBLFVBQ25ELFNBQVM7QUFBQSxVQUNULE9BQU87QUFBQSxVQUNQLFVBQVUsQ0FBQyxjQUFjLHFCQUFxQix1Q0FBdUMsV0FBVyxFQUFFLENBQUM7QUFBQSxVQUNuRyxnQkFBZ0I7QUFBQSxVQUNoQixVQUFVO0FBQUEsVUFDVixRQUFPO0FBQUEsVUFDUCxpQkFBZ0I7QUFBQSxVQUNoQixnQkFBZTtBQUFBLFVBQ2YsV0FBVztBQUFBO0FBQUEsTUFDYixJQUNFO0FBQUEsTUFFSjtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsT0FBTyxLQUFLLDJCQUEyQixVQUFVO0FBQUEsVUFDakQsYUFBYSxLQUFLLDJCQUEyQixVQUFVO0FBQUEsVUFDdkQsU0FBUztBQUFBLFVBQ1QsT0FBTztBQUFBLFVBQ1AsVUFBVSxDQUFDLGNBQWM7QUFDdkIsa0JBQU0sU0FBUyxPQUFPLFNBQVM7QUFDL0IsZ0JBQUksY0FBYyxNQUFNLENBQUMsT0FBTyxVQUFVLE1BQU0sR0FBRztBQUNqRCxzQ0FBd0IsRUFBRTtBQUMxQjtBQUFBLFlBQ0Y7QUFDQSxvQ0FBd0IsTUFBOEI7QUFBQSxVQUN4RDtBQUFBLFVBQ0EsZ0JBQWdCO0FBQUEsVUFDaEIsUUFBTztBQUFBLFVBQ1AsaUJBQWdCO0FBQUEsVUFDaEIsZ0JBQWU7QUFBQSxVQUNmLFdBQVc7QUFBQTtBQUFBLE1BQ2I7QUFBQSxNQUVBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxPQUFPLEtBQUssZ0NBQWdDLGlCQUFpQjtBQUFBLFVBQzdELGFBQWEsS0FBSyxnQ0FBZ0MsaUJBQWlCO0FBQUEsVUFDbkUsT0FBTztBQUFBLFVBQ1AsVUFBVTtBQUFBLFVBQ1YsV0FBVztBQUFBO0FBQUEsTUFDYjtBQUFBLE9BQ0Y7QUFBQSxJQUVBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxZQUFZLEtBQUssd0JBQXdCLE9BQU87QUFBQSxRQUNoRCxZQUFZLEtBQUssd0JBQXdCLE9BQU87QUFBQSxRQUNoRDtBQUFBLFFBQ0E7QUFBQTtBQUFBLElBQ0Y7QUFBQSxLQUNGLEdBQ0Y7QUFFSjtBQUVBLElBQU8scUNBQVE7OztBR3ZQZixJQUFBQyxnQkFBMEQ7QUFvQm5ELElBQU0sZ0NBQWdDLENBQUM7QUFBQSxFQUM1QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxvQkFBb0I7QUFBQSxFQUNwQix5QkFBeUI7QUFDM0IsTUFBeUM7QUFDdkMsUUFBTSx1QkFBdUIsc0JBQXNCLEtBQUssc0JBQXNCO0FBRTlFLFFBQU0sMEJBQXNCO0FBQUEsSUFDMUIsQ0FBQyxVQUF3RTtBQUN2RSxVQUFJLHNCQUFzQjtBQUN4QixlQUFPO0FBQUEsTUFDVDtBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxDQUFDLG1CQUFtQixvQkFBb0I7QUFBQSxFQUMxQztBQUVBLFFBQU0sQ0FBQyxVQUFVLFdBQVcsUUFBSSx3QkFBUyxFQUFFO0FBQzNDLFFBQU0sQ0FBQyxRQUFRLFNBQVMsUUFBSSx3QkFBUyxFQUFFO0FBQ3ZDLFFBQU0sQ0FBQyxXQUFXLFlBQVksUUFBSSx3QkFBUyxFQUFFO0FBQzdDLFFBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx3QkFBUyxFQUFFO0FBQ25ELFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixRQUFJLHdCQUFTLG9CQUFvQjtBQUN2RSxRQUFNLENBQUMsaUJBQWlCLGtCQUFrQixRQUFJLHdCQUF3QyxvQkFBb0IsRUFBRSxDQUFDO0FBQzdHLFFBQU0sQ0FBQyxpQkFBaUIsa0JBQWtCLFFBQUksd0JBQW9DLEVBQUU7QUFDcEYsUUFBTSxDQUFDLHFCQUFxQixzQkFBc0IsUUFBSSx3QkFBK0IsS0FBSztBQUMxRixRQUFNLENBQUMsbUJBQW1CLG9CQUFvQixRQUFJLHdCQUE0QyxJQUFJO0FBQ2xHLFFBQU0sQ0FBQyxzQkFBc0IsdUJBQXVCLFFBQUksd0JBQVMsS0FBSztBQUN0RSxRQUFNLENBQUMscUJBQXFCLHNCQUFzQixRQUFJLHdCQUFTLEtBQUs7QUFDcEUsUUFBTSxDQUFDLHVCQUF1Qix3QkFBd0IsUUFBSSx3QkFBUyxDQUFDO0FBQ3BFLFFBQU0sQ0FBQyxnQkFBZ0IsaUJBQWlCLFFBQUksd0JBQW9ELElBQUk7QUFDcEcsUUFBTSxDQUFDLGFBQWEsY0FBYyxRQUFJLHdCQUFTLElBQUk7QUFFbkQsK0JBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxxQkFBc0I7QUFDM0IsdUJBQW1CLGlCQUFrRDtBQUFBLEVBQ3ZFLEdBQUcsQ0FBQyxtQkFBbUIsb0JBQW9CLENBQUM7QUFFNUMsUUFBTSxlQUFlLG9CQUFvQixlQUFlO0FBRXhELFFBQU0scUJBQWlCO0FBQUEsSUFDckIsT0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsTUFDQSxXQUFXLFVBQVUsS0FBSztBQUFBLE1BQzFCLGNBQWMsYUFBYSxLQUFLO0FBQUEsTUFDaEMsZUFBZSxjQUFjLEtBQUs7QUFBQSxNQUNsQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQyxjQUFjLFdBQVcsVUFBVSxpQkFBaUIsZUFBZSxxQkFBcUIsY0FBYyxNQUFNO0FBQUEsRUFDL0c7QUFFQSxRQUFNLHNCQUFrQjtBQUFBLElBQ3RCLENBQUMsVUFBeUM7QUFDeEMsVUFBSSxzQkFBc0I7QUFDeEIsMkJBQW1CLGlCQUFrRDtBQUNyRTtBQUFBLE1BQ0Y7QUFDQSx5QkFBbUIsS0FBSztBQUFBLElBQzFCO0FBQUEsSUFDQSxDQUFDLG1CQUFtQixvQkFBb0I7QUFBQSxFQUMxQztBQUVBLFFBQU0sY0FBVSwyQkFBWSxNQUFNO0FBQ2hDLFFBQUksQ0FBQywyQkFBMkIsQ0FBQyxZQUFZLENBQUMsU0FBUztBQUNyRCw2QkFBdUIsSUFBSTtBQUMzQiw4QkFBd0IsSUFBSTtBQUM1QiwyQkFBcUIsUUFBUTtBQUM3QjtBQUFBLElBQ0Y7QUFFQSxVQUFNLFdBQStDO0FBQUEsTUFDbkQ7QUFBQSxNQUNBO0FBQUEsTUFDQSxXQUFXLFVBQVUsS0FBSztBQUFBLE1BQzFCLGNBQWMsYUFBYSxLQUFLO0FBQUEsTUFDaEMsZUFBZSxjQUFjLEtBQUs7QUFBQSxNQUNsQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUVBLDJCQUF1QixLQUFLO0FBQzVCLHNCQUFrQixRQUFRO0FBQzFCLDRCQUF3QixLQUFLO0FBQzdCLG1CQUFlLEtBQUs7QUFDcEIsbUJBQWUsUUFBUTtBQUFBLEVBQ3pCLEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBR0QsUUFBTSw0QkFBd0I7QUFBQSxJQUM1QixDQUFDLGFBQWlEO0FBQ2hELFlBQU0sYUFBYSxxQ0FBcUMsUUFBUTtBQUNoRSxZQUFNLHlCQUF5QixvQkFBb0IsV0FBVyxZQUFZO0FBQzFFLFlBQU0sd0JBQXdCLE9BQU8sV0FBVyxpQkFBaUIsb0JBQW9CLEVBQUUsS0FBSztBQUM1RixZQUFNLHNCQUFzQix1Q0FBdUMsV0FBVyxVQUFVLFdBQVcsTUFBTTtBQUN6RyxrQkFBWSxXQUFXLFFBQVE7QUFDL0IsZ0JBQVUsV0FBVyxNQUFNO0FBQzNCLG1CQUFhLFdBQVcsU0FBUztBQUNqQyxzQkFBZ0IsV0FBVyxZQUFZO0FBQ3ZDLHVCQUFpQixxQkFBcUI7QUFDdEMseUJBQW1CLHNCQUFzQjtBQUN6Qyx5QkFBbUIsV0FBVyxlQUFlO0FBQzdDLDZCQUF1QixXQUFXLG1CQUFtQjtBQUNyRCwyQkFBcUIsbUJBQW1CO0FBQ3hDLDhCQUF3QixLQUFLO0FBQzdCLDZCQUF1QixLQUFLO0FBQzVCLHdCQUFrQjtBQUFBLFFBQ2hCLEdBQUc7QUFBQSxRQUNILGVBQWU7QUFBQSxRQUNmLGNBQWM7QUFBQSxNQUNoQixDQUFDO0FBQ0QscUJBQWUsS0FBSztBQUFBLElBQ3RCO0FBQUEsSUFDQSxDQUFDLHNCQUFzQixtQkFBbUI7QUFBQSxFQUM1QztBQUVBLFFBQU0sY0FBVSwyQkFBWSxNQUFNO0FBQ2hDLGdCQUFZLEVBQUU7QUFDZCxjQUFVLEVBQUU7QUFDWixpQkFBYSxFQUFFO0FBQ2Ysb0JBQWdCLEVBQUU7QUFDbEIscUJBQWlCLG9CQUFvQjtBQUNyQyx1QkFBbUIsb0JBQW9CLEVBQUUsQ0FBQztBQUMxQyx1QkFBbUIsRUFBRTtBQUNyQiwyQkFBdUIsS0FBSztBQUM1Qix5QkFBcUIsSUFBSTtBQUN6Qiw0QkFBd0IsS0FBSztBQUM3QiwyQkFBdUIsS0FBSztBQUM1Qiw2QkFBeUIsQ0FBQztBQUMxQixzQkFBa0IsSUFBSTtBQUN0QixtQkFBZSxJQUFJO0FBQ25CLG1CQUFlO0FBQUEsRUFDakIsR0FBRyxDQUFDLHNCQUFzQixnQkFBZ0IsbUJBQW1CLENBQUM7QUFFOUQsUUFBTSx3QkFBb0I7QUFBQSxJQUN4QixDQUFDLGNBQXNCLGVBQXVCO0FBQzVDLFlBQU0sZUFBZSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN6QyxrQkFBWSxZQUFZO0FBQ3hCLGdCQUFVLFVBQVU7QUFDcEIsVUFBSSxDQUFDLGNBQWM7QUFDakIsZ0NBQXdCLElBQUk7QUFBQSxNQUM5QjtBQUNBLDJCQUFxQixRQUFRO0FBQzdCLFVBQUkscUJBQXFCO0FBQ3ZCLCtCQUF1QixDQUFDLFlBQVk7QUFBQSxNQUN0QztBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUMsbUJBQW1CO0FBQUEsRUFDdEI7QUFFQSxRQUFNLDRCQUF3QiwyQkFBWSxDQUFDLGNBQXNCLGVBQXVCO0FBQ3RGLGdCQUFZLFlBQVk7QUFDeEIsY0FBVSxVQUFVO0FBQ3BCLHlCQUFxQixRQUFRO0FBQzdCLDJCQUF1QixLQUFLO0FBQzVCLDRCQUF3QixLQUFLO0FBQUEsRUFDL0IsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLDBCQUFzQjtBQUFBLElBQzFCLENBQUMsYUFBeUM7QUFDeEMsVUFBSSxhQUFhLFVBQVU7QUFDekIsWUFBSSxzQkFBc0I7QUFDeEIsa0NBQXdCLEtBQUs7QUFDN0IsaUNBQXVCLEtBQUs7QUFDNUI7QUFBQSxRQUNGO0FBRUEsNkJBQXFCLFFBQVE7QUFDN0IsZ0NBQXdCLElBQUk7QUFDNUIsK0JBQXVCLEtBQUs7QUFDNUIsaUNBQXlCLENBQUMsYUFBYSxXQUFXLENBQUM7QUFDbkQ7QUFBQSxNQUNGO0FBRUEsMkJBQXFCLFFBQVE7QUFDN0IsOEJBQXdCLEtBQUs7QUFDN0IsNkJBQXVCLEtBQUs7QUFFNUIsWUFBTSxRQUFRLFdBQVcsb0JBQUksS0FBSyxDQUFDO0FBQ25DLFlBQU0sV0FBVyxJQUFJLEtBQUssS0FBSztBQUMvQixVQUFJLGFBQWEsVUFBVTtBQUN6QixpQkFBUyxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFBQSxNQUN0QyxXQUFXLGFBQWEsV0FBVztBQUNqQyxpQkFBUyxRQUFRLE1BQU0sUUFBUSxJQUFJLEVBQUU7QUFBQSxNQUN2QyxPQUFPO0FBQ0wsaUJBQVMsUUFBUSxNQUFNLFFBQVEsSUFBSSxFQUFFO0FBQUEsTUFDdkM7QUFFQSxrQkFBWSxVQUFVLFFBQVEsQ0FBQztBQUMvQixnQkFBVSxVQUFVLEtBQUssQ0FBQztBQUFBLElBQzVCO0FBQUEsSUFDQSxDQUFDLG9CQUFvQjtBQUFBLEVBQ3ZCO0FBRUEsUUFBTSx3QkFBb0IsMkJBQVksTUFBTTtBQUMxQyxtQkFBZSxDQUFDLGFBQWE7QUFDM0IsWUFBTSxPQUFPLENBQUM7QUFDZCxVQUFJLENBQUMsTUFBTTtBQUNULGdDQUF3QixLQUFLO0FBQUEsTUFDL0I7QUFDQSxhQUFPO0FBQUEsSUFDVCxDQUFDO0FBQUEsRUFDSCxHQUFHLENBQUMsQ0FBQztBQUVMLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxvQkFBb0I7QUFBQSxFQUN0QjtBQUNGOzs7QUM5UUEsSUFBQUMsZ0JBQXlEO0FBMEJ6RCxJQUFNLGtDQUFrQztBQUV4QyxJQUFNLDRCQUE0QixJQUFJLFNBQW9CO0FBQ3hELE1BQUksT0FBTyxZQUFZLGVBQWUsT0FBTyxRQUFRLFNBQVMsWUFBWTtBQUN4RSxZQUFRLEtBQUssaUNBQWlDLEdBQUcsSUFBSTtBQUFBLEVBQ3ZEO0FBQ0Y7QUFFQSxJQUFNLDRCQUE0QixJQUFJLFNBQW9CO0FBQ3hELE1BQUksT0FBTyxZQUFZLGVBQWUsT0FBTyxRQUFRLFNBQVMsWUFBWTtBQUN4RSxZQUFRLEtBQUssaUNBQWlDLEdBQUcsSUFBSTtBQUFBLEVBQ3ZEO0FBQ0Y7QUFFQSxJQUFNLDZCQUE2QixJQUFJLFNBQW9CO0FBQ3pELE1BQUksT0FBTyxZQUFZLGVBQWUsT0FBTyxRQUFRLFVBQVUsWUFBWTtBQUN6RSxZQUFRLE1BQU0saUNBQWlDLEdBQUcsSUFBSTtBQUFBLEVBQ3hEO0FBQ0Y7QUFFQSxJQUFNLGdDQUFnQyxDQUFDLFVBQTBCO0FBQy9ELE1BQUksT0FBTyxVQUFVLFdBQVksUUFBTztBQUN4QyxRQUFNLFdBQVcsSUFBSSxNQUFNLEtBQUssRUFBRTtBQUNsQyxNQUFJLE9BQU8sYUFBYSxZQUFZLENBQUMsU0FBUyxLQUFLLEVBQUcsUUFBTztBQUM3RCxTQUFPLFNBQ0osTUFBTSxJQUFJLEVBQ1YsTUFBTSxHQUFHLENBQUMsRUFDVixLQUFLLElBQUk7QUFDZDtBQUVBLElBQU0sbUJBQW1CLENBQUMsVUFBa0M7QUFDMUQsUUFBTSxTQUFTLE9BQU8sS0FBSztBQUMzQixTQUFPLE9BQU8sU0FBUyxNQUFNLElBQUksU0FBUztBQUM1QztBQUVBLElBQU0saUJBQWlCLENBQUMsVUFBbUM7QUFDekQsTUFBSSxPQUFPLFVBQVUsVUFBVyxRQUFPO0FBQ3ZDLE1BQUksT0FBTyxVQUFVLFNBQVUsUUFBTyxVQUFVLElBQUksT0FBTyxVQUFVLElBQUksUUFBUTtBQUNqRixNQUFJLE9BQU8sVUFBVSxVQUFVO0FBQzdCLFVBQU0sYUFBYSxNQUFNLEtBQUssRUFBRSxZQUFZO0FBQzVDLFFBQUksZUFBZSxVQUFVLGVBQWUsSUFBSyxRQUFPO0FBQ3hELFFBQUksZUFBZSxXQUFXLGVBQWUsSUFBSyxRQUFPO0FBQUEsRUFDM0Q7QUFDQSxTQUFPO0FBQ1Q7QUFFQSxJQUFNLHlCQUF5QixDQUFDLFVBQWtDO0FBQ2hFLFFBQU0sU0FBUyxPQUFPLEtBQUs7QUFDM0IsU0FBTyxPQUFPLFVBQVUsTUFBTSxLQUFLLFVBQVUsSUFBSSxTQUFTO0FBQzVEO0FBRUEsSUFBTSw0QkFBNEIsQ0FBQyxVQUFnRDtBQUNqRixTQUFPLHVCQUF1QixLQUFLO0FBQ3JDO0FBRUEsSUFBTSxzQkFBc0IsQ0FBQyxTQUFxRDtBQUNoRixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixRQUFRLE9BQU8sTUFBTSxVQUFVLEVBQUUsRUFBRSxLQUFLO0FBQUEsSUFDeEMsYUFBYSxPQUFPLE1BQU0sZUFBZSxFQUFFLEVBQUUsS0FBSztBQUFBLElBQ2xELFFBQVEsdUJBQXVCLE1BQU0sTUFBTTtBQUFBLElBQzNDLGVBQWUsZUFBZSxNQUFNLGFBQWE7QUFBQSxJQUNqRCxjQUFjLE9BQU8sTUFBTSxnQkFBZ0IsRUFBRSxFQUFFLEtBQUs7QUFBQSxJQUNwRCxhQUFhLDRCQUE0QjtBQUFBLE1BQ3ZDLGdCQUFnQixpQkFBaUIsTUFBTSxjQUFjO0FBQUEsTUFDckQscUJBQXFCLGlCQUFpQixNQUFNLG1CQUFtQjtBQUFBLE1BQy9ELGFBQWEsaUJBQWlCLE1BQU0sV0FBVztBQUFBLElBQ2pELENBQUM7QUFBQSxJQUNELFdBQVcsT0FBTyxNQUFNLGFBQWEsRUFBRSxFQUFFLEtBQUs7QUFBQSxJQUM5QyxVQUFVLE9BQU8sTUFBTSxZQUFZLEVBQUUsRUFBRSxLQUFLO0FBQUEsSUFDNUMsV0FBVywwQkFBMEIsTUFBTSxhQUFhLE1BQU0sU0FBUztBQUFBLEVBQ3pFO0FBQ0Y7QUFFQSxJQUFNLDBCQUEwQixDQUFDLFNBQXlEO0FBQ3hGLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFFBQVEsT0FBTyxNQUFNLFVBQVUsRUFBRSxFQUFFLEtBQUs7QUFBQSxJQUN4QyxhQUFhLE9BQU8sTUFBTSxlQUFlLEVBQUUsRUFBRSxLQUFLO0FBQUEsSUFDbEQsZUFBZSxlQUFlLE1BQU0sYUFBYTtBQUFBLElBQ2pELGNBQWMsT0FBTyxNQUFNLGdCQUFnQixFQUFFLEVBQUUsS0FBSztBQUFBLElBQ3BELGFBQWEsNEJBQTRCO0FBQUEsTUFDdkMsZ0JBQWdCLGlCQUFpQixNQUFNLGNBQWM7QUFBQSxNQUNyRCxxQkFBcUIsaUJBQWlCLE1BQU0sbUJBQW1CO0FBQUEsTUFDL0QsYUFBYSxpQkFBaUIsTUFBTSxXQUFXO0FBQUEsSUFDakQsQ0FBQztBQUFBLElBQ0QsV0FBVyxPQUFPLE1BQU0sYUFBYSxFQUFFLEVBQUUsS0FBSztBQUFBLElBQzlDLFVBQVUsT0FBTyxNQUFNLFlBQVksRUFBRSxFQUFFLEtBQUs7QUFBQSxJQUM1QyxXQUFXLDBCQUEwQixNQUFNLGFBQWEsTUFBTSxTQUFTO0FBQUEsRUFDekU7QUFDRjtBQUdPLElBQU0sNEJBQTRCLENBQUMsRUFBRSxXQUFXLFVBQVUsTUFBTSxZQUFZLE1BQXFDO0FBQ3RILFFBQU0sQ0FBQyxPQUFPLFFBQVEsUUFBSSx3QkFBc0MsQ0FBQyxDQUFDO0FBQ2xFLFFBQU0sQ0FBQyxPQUFPLFFBQVEsUUFBSSx3QkFBUyxDQUFDO0FBQ3BDLFFBQU0sQ0FBQyxhQUFhLGNBQWMsUUFBSSx3QkFBUyxDQUFDO0FBQ2hELFFBQU0sQ0FBQyxXQUFXLFlBQVksUUFBSSx3QkFBUyxLQUFLO0FBQ2hELFFBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx3QkFBUyxFQUFFO0FBQ25ELFFBQU0saUNBQTZCLHNCQUErQixJQUFJO0FBQ3RFLFFBQU0sMEJBQXNCLHNCQUFPLEVBQUU7QUFDckMsUUFBTSwwQkFBc0Isc0JBQU8sQ0FBQztBQUVwQyxRQUFNLDBCQUFzQjtBQUFBLElBQzFCLENBQUMsYUFBa0Y7QUFDakYsWUFBTSxZQUFZLE1BQU0sUUFBUSxTQUFTLEtBQUssSUFBSSxTQUFTLFFBQVEsQ0FBQztBQUNwRSxZQUFNLGVBQWUsT0FBTyxTQUFTLEtBQUs7QUFDMUMsWUFBTSxZQUFZLE9BQU8sU0FBUyxZQUFZLEtBQUssZ0JBQWdCLElBQUksZUFBZSxVQUFVO0FBQ2hHLFlBQU0sY0FBYyxPQUFPLFNBQVMsSUFBSTtBQUN4QyxZQUFNLFdBQVcsT0FBTyxTQUFTLFdBQVcsS0FBSyxjQUFjLElBQUksS0FBSyxNQUFNLFdBQVcsSUFBSTtBQUU3RixlQUFTLFNBQVM7QUFDbEIsZUFBUyxTQUFTO0FBQ2xCLHFCQUFlLFFBQVE7QUFDdkIsc0JBQWdCLEVBQUU7QUFDbEIsbUJBQWEsS0FBSztBQUFBLElBQ3BCO0FBQUEsSUFDQSxDQUFDO0FBQUEsRUFDSDtBQUVBLFFBQU0sZUFBVztBQUFBLElBQ2YsT0FBTyxNQUFjLFlBQWdEO0FBQ25FLGdDQUEwQixzQkFBc0I7QUFBQSxRQUM5QztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0YsQ0FBQztBQUNELFVBQUksQ0FBQyxXQUFXO0FBQ2Qsa0NBQTBCLDhCQUE4QjtBQUFBLFVBQ3REO0FBQUEsVUFDQTtBQUFBLFFBQ0YsQ0FBQztBQUNELG9CQUFZO0FBQ1o7QUFBQSxNQUNGO0FBRUEsWUFBTSxVQUNKLFNBQVMsU0FDTCxrQ0FBa0MsU0FBUyxNQUFNLFFBQVEsSUFDekQsOEJBQThCLFNBQVMsTUFBTSxRQUFRO0FBQzNELFlBQU0sMEJBQTBCLE9BQU8sU0FBUyxpQkFBaUIsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZO0FBQ3hGLFlBQU0sYUFBYSxLQUFLLFVBQVUsRUFBRSxNQUFNLFNBQVMsZUFBZSx3QkFBd0IsQ0FBQztBQUUzRixVQUFJLDJCQUEyQixXQUFXLG9CQUFvQixZQUFZLFlBQVk7QUFDcEYsa0NBQTBCLG1DQUFtQztBQUFBLFVBQzNEO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGLENBQUM7QUFDRDtBQUFBLE1BQ0Y7QUFFQSxVQUFJLDJCQUEyQixTQUFTO0FBQ3RDLGtDQUEwQixtQ0FBbUM7QUFBQSxVQUMzRCxvQkFBb0Isb0JBQW9CO0FBQUEsVUFDeEMsb0JBQW9CLG9CQUFvQjtBQUFBLFVBQ3hDLE9BQU8sOEJBQThCLGlDQUFpQztBQUFBLFFBQ3hFLENBQUM7QUFDRCxtQ0FBMkIsUUFBUSxNQUFNO0FBQUEsTUFDM0M7QUFFQSxZQUFNLGFBQWEsSUFBSSxnQkFBZ0I7QUFDdkMsaUNBQTJCLFVBQVU7QUFDckMsMEJBQW9CLFVBQVU7QUFDOUIsWUFBTSxhQUFhLG9CQUFvQixVQUFVO0FBQ2pELDBCQUFvQixVQUFVO0FBQzlCLFlBQU0sb0JBQW9CLE1BQU07QUFDOUIsa0NBQTBCLCtCQUErQjtBQUFBLFVBQ3ZEO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQSxlQUFlLFdBQVcsT0FBTztBQUFBLFVBQ2pDLGNBQ0UsWUFBWSxXQUFXLFNBQ2pCLFdBQVcsT0FBOEMsVUFBVSxPQUNyRTtBQUFBLFFBQ1IsQ0FBQztBQUFBLE1BQ0g7QUFDQSxpQkFBVyxPQUFPLGlCQUFpQixTQUFTLG1CQUFtQixFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTdFLG1CQUFhLElBQUk7QUFDakIsc0JBQWdCLEVBQUU7QUFDbEIsZ0NBQTBCLHdCQUF3QjtBQUFBLFFBQ2hEO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGLENBQUM7QUFFRCxVQUFJO0FBQ0YsY0FBTSxXQUFXLE1BQU07QUFBQSxVQUNyQixNQUNFLFNBQVMsU0FDTCxnQ0FBZ0MsU0FBUztBQUFBLFlBQ3ZDLHlCQUF5QjtBQUFBLFlBQ3pCLFFBQVEsV0FBVztBQUFBLFlBQ25CLGtCQUFrQiwyQkFBMkI7QUFBQSxVQUMvQyxDQUFDLElBQ0QsNkJBQTZCLFNBQVM7QUFBQSxZQUNwQyx5QkFBeUI7QUFBQSxZQUN6QixRQUFRLFdBQVc7QUFBQSxZQUNuQixrQkFBa0IsMkJBQTJCO0FBQUEsVUFDL0MsQ0FBQztBQUFBLFVBQ1A7QUFBQSxZQUNFLFFBQVEsV0FBVztBQUFBLFVBQ3JCO0FBQUEsUUFDRjtBQUNBLGtDQUEwQiwyQkFBMkI7QUFBQSxVQUNuRDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQSxTQUFTLFVBQVU7QUFBQSxVQUNuQixPQUFPLFVBQVU7QUFBQSxVQUNqQixPQUFPLE1BQU0sUUFBUSxVQUFVLEtBQUssSUFBSSxTQUFTLE1BQU0sU0FBUztBQUFBLFFBQ2xFLENBQUM7QUFDRCxZQUFJLGVBQWUsb0JBQW9CLFFBQVM7QUFFaEQsWUFBSSxVQUFVLFlBQVksT0FBTztBQUMvQixvQ0FBMEIsNkJBQTZCO0FBQUEsWUFDckQ7QUFBQSxZQUNBO0FBQUEsWUFDQSxTQUFTLFNBQVM7QUFBQSxVQUNwQixDQUFDO0FBQ0QsMEJBQWdCLFNBQVMsV0FBVyxLQUFLLHFCQUFxQix5QkFBeUIsQ0FBQztBQUN4RixtQkFBUyxDQUFDLENBQUM7QUFDWCxtQkFBUyxDQUFDO0FBQ1YseUJBQWUsSUFBSTtBQUNuQjtBQUFBLFFBQ0Y7QUFFQSxjQUFNLGNBQWMsTUFBTSxRQUFRLFVBQVUsS0FBSyxJQUFJLFNBQVMsUUFBUSxDQUFDO0FBQ3ZFLGNBQU0sY0FBYyxZQUFZO0FBQUEsVUFBSSxDQUFDLFNBQ25DLFNBQVMsU0FDTCx3QkFBd0IsSUFBMEMsSUFDbEUsb0JBQW9CLElBQTBDO0FBQUEsUUFDcEU7QUFDQSxjQUFNLGdCQUFnQixPQUFPLFVBQVUsU0FBUyxZQUFZLFVBQVUsQ0FBQztBQUV2RSxpQkFBUyxXQUFXO0FBQ3BCLGlCQUFTLGFBQWE7QUFDdEIsdUJBQWUsSUFBSTtBQUFBLE1BQ3JCLFNBQVMsT0FBTztBQUNkLFlBQUksZUFBZSxvQkFBb0IsUUFBUztBQUNoRCxZQUFJLHdCQUF3QixPQUFPLFdBQVcsTUFBTSxHQUFHO0FBQ3JELG9DQUEwQixvQkFBb0I7QUFBQSxZQUM1QztBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQSxTQUFTLGlCQUFpQixRQUFRLE1BQU0sVUFBVTtBQUFBLFVBQ3BELENBQUM7QUFDRDtBQUFBLFFBQ0Y7QUFFQSxZQUFJLGlCQUFpQixpQkFBaUIsTUFBTSxXQUFXLEtBQUs7QUFDMUQsb0NBQTBCLHNCQUFzQjtBQUFBLFlBQzlDO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGLENBQUM7QUFDRCxzQkFBWTtBQUNaO0FBQUEsUUFDRjtBQUVBLG1DQUEyQixtQkFBbUI7QUFBQSxVQUM1QztBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQSxTQUFTLGlCQUFpQixRQUFRLE1BQU0sVUFBVTtBQUFBLFFBQ3BELENBQUM7QUFDRCxjQUFNLFVBQVUsaUJBQWlCLFFBQVEsTUFBTSxVQUFVLEtBQUsscUJBQXFCLHlCQUF5QjtBQUM1Ryx3QkFBZ0IsT0FBTztBQUN2QixpQkFBUyxDQUFDLENBQUM7QUFDWCxpQkFBUyxDQUFDO0FBQ1YsdUJBQWUsSUFBSTtBQUFBLE1BQ3JCLFVBQUU7QUFDQSxtQkFBVyxPQUFPLG9CQUFvQixTQUFTLGlCQUFpQjtBQUNoRSxZQUFJLGVBQWUsb0JBQW9CLFNBQVM7QUFDOUMsb0NBQTBCLHFCQUFxQjtBQUFBLFlBQzdDO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGLENBQUM7QUFDRCx1QkFBYSxLQUFLO0FBQ2xCLHFDQUEyQixVQUFVO0FBQ3JDLDhCQUFvQixVQUFVO0FBQUEsUUFDaEM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQyxXQUFXLE1BQU0sYUFBYSxRQUFRO0FBQUEsRUFDekM7QUFFQSxRQUFNLGdCQUFZLDJCQUFZLENBQUMsU0FBUyxjQUFjO0FBQ3BELFFBQUksMkJBQTJCLFNBQVM7QUFDdEMsZ0NBQTBCLGtDQUFrQztBQUFBLFFBQzFEO0FBQUEsUUFDQSxrQkFBa0Isb0JBQW9CO0FBQUEsUUFDdEMsa0JBQWtCLG9CQUFvQjtBQUFBLFFBQ3RDLE9BQU8sOEJBQThCLGFBQWEsTUFBTSxFQUFFO0FBQUEsTUFDNUQsQ0FBQztBQUNELGlDQUEyQixRQUFRLE1BQU07QUFDekMsaUNBQTJCLFVBQVU7QUFDckMsMEJBQW9CLFVBQVU7QUFBQSxJQUNoQztBQUNBLDhCQUEwQix5QkFBeUI7QUFBQSxNQUNqRDtBQUFBLElBQ0YsQ0FBQztBQUNELGFBQVMsQ0FBQyxDQUFDO0FBQ1gsYUFBUyxDQUFDO0FBQ1YsbUJBQWUsQ0FBQztBQUNoQixvQkFBZ0IsRUFBRTtBQUFBLEVBQ3BCLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxxQkFBaUIsMkJBQVksTUFBTTtBQUFBLEVBRXpDLEdBQUcsQ0FBQyxDQUFDO0FBRUwsK0JBQVUsTUFBTTtBQUNkLFdBQU8sTUFBTTtBQUNYLFVBQUksMkJBQTJCLFNBQVM7QUFDdEMsa0NBQTBCLGdDQUFnQztBQUFBLFVBQ3hELGtCQUFrQixvQkFBb0I7QUFBQSxVQUN0QyxrQkFBa0Isb0JBQW9CO0FBQUEsVUFDdEMsT0FBTyw4QkFBOEIsOEJBQThCO0FBQUEsUUFDckUsQ0FBQztBQUNELG1DQUEyQixRQUFRLE1BQU07QUFDekMsbUNBQTJCLFVBQVU7QUFDckMsNEJBQW9CLFVBQVU7QUFBQSxNQUNoQztBQUFBLElBQ0Y7QUFBQSxFQUNGLEdBQUcsQ0FBQyxDQUFDO0FBRUwsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjs7O0FDMVdBLElBQU0sOENBQThDO0FBQ3BELElBQU0sMENBQTBDLEtBQUssS0FBSyxLQUFLO0FBZS9ELElBQU0sZUFBZSxNQUFjO0FBQ2pDLFNBQU8sR0FBRywyQ0FBMkMsSUFBSSxxQkFBcUIsQ0FBQztBQUNqRjtBQUVBLElBQU0sa0JBQWtCLENBQUMsVUFBMkI7QUFDbEQsU0FBTyxPQUFPLFNBQVMsRUFBRSxFQUFFLEtBQUs7QUFDbEM7QUFFQSxJQUFNLHlCQUF5QixDQUFDLFVBQW1DO0FBQ2pFLE1BQUksVUFBVSxRQUFRLFVBQVUsTUFBTyxRQUFPO0FBQzlDLE1BQUksVUFBVSxLQUFLLFVBQVUsT0FBTyxVQUFVLE9BQVEsUUFBTztBQUM3RCxNQUFJLFVBQVUsS0FBSyxVQUFVLE9BQU8sVUFBVSxRQUFTLFFBQU87QUFDOUQsU0FBTztBQUNUO0FBRUEsSUFBTSwwQkFBMEIsQ0FBQyxVQUFrQztBQUNqRSxRQUFNLFNBQVMsT0FBTyxLQUFLO0FBQzNCLFNBQU8sT0FBTyxTQUFTLE1BQU0sSUFBSSxTQUFTO0FBQzVDO0FBRUEsSUFBTSwyQkFBMkIsQ0FBQyxVQUF1RDtBQUN2RixTQUFPLHVCQUF1QixLQUFLO0FBQ3JDO0FBRUEsSUFBTSx5QkFBeUIsQ0FBQyxVQUFtRDtBQUNqRixTQUFPLFVBQVUsYUFBYSxhQUFhO0FBQzdDO0FBRUEsSUFBTSwyQkFBMkIsQ0FBQyxVQUE0QztBQUM1RSxNQUFJLENBQUMsTUFBTSxRQUFRLEtBQUssRUFBRyxRQUFPLENBQUM7QUFFbkMsUUFBTSxRQUFRLG9CQUFJLElBQW1DO0FBQ3JELGFBQVcsU0FBUyxPQUFPO0FBQ3pCLFVBQU0sT0FBUSxTQUFTLENBQUM7QUFDeEIsVUFBTSxTQUFTLGdCQUFnQixLQUFLLE1BQU07QUFDMUMsUUFBSSxDQUFDLE9BQVE7QUFFYixVQUFNLElBQUksUUFBUTtBQUFBLE1BQ2hCLE1BQU07QUFBQSxNQUNOO0FBQUEsTUFDQSxhQUFhLE9BQU8sS0FBSyxlQUFlLEVBQUUsRUFBRSxLQUFLO0FBQUEsTUFDakQsZUFBZSx1QkFBdUIsS0FBSyxhQUFhO0FBQUEsTUFDeEQsY0FBYyxPQUFPLEtBQUssZ0JBQWdCLEVBQUUsRUFBRSxLQUFLO0FBQUEsTUFDbkQsYUFBYSx3QkFBd0IsS0FBSyxXQUFXO0FBQUEsTUFDckQsV0FBVyxPQUFPLEtBQUssYUFBYSxFQUFFLEVBQUUsS0FBSztBQUFBLE1BQzdDLFVBQVUsT0FBTyxLQUFLLFlBQVksRUFBRSxFQUFFLEtBQUs7QUFBQSxNQUMzQyxXQUFXLHlCQUF5QixLQUFLLFNBQVM7QUFBQSxJQUNwRCxDQUFDO0FBQUEsRUFDSDtBQUVBLFNBQU8sTUFBTSxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQ2xDO0FBRUEsSUFBTSx1QkFBdUIsQ0FBQyxVQUE2QjtBQUN6RCxNQUFJLENBQUMsTUFBTSxRQUFRLEtBQUssRUFBRyxRQUFPLENBQUM7QUFFbkMsUUFBTSxNQUFNLG9CQUFJLElBQVk7QUFDNUIsYUFBVyxTQUFTLE9BQU87QUFDekIsVUFBTSxTQUFTLGdCQUFnQixLQUFLO0FBQ3BDLFFBQUksQ0FBQyxPQUFRO0FBQ2IsUUFBSSxJQUFJLE1BQU07QUFBQSxFQUNoQjtBQUVBLFNBQU8sTUFBTSxLQUFLLEdBQUc7QUFDdkI7QUFFQSxJQUFNLDhCQUE4QixDQUFDLE9BQWdCLFdBQVcsTUFBYztBQUM1RSxRQUFNLFNBQVMsT0FBTyxLQUFLO0FBQzNCLFNBQU8sT0FBTyxTQUFTLE1BQU0sS0FBSyxVQUFVLElBQUksS0FBSyxNQUFNLE1BQU0sSUFBSTtBQUN2RTtBQUdPLElBQU0sd0NBQXdDLENBQUMsVUFBd0Q7QUFDNUcsTUFBSSxDQUFDLFNBQVMsT0FBTyxVQUFVLFNBQVUsUUFBTztBQUVoRCxRQUFNLFVBQVU7QUFDaEIsUUFBTSxVQUFVLE9BQU8sUUFBUSxXQUFXLEVBQUUsRUFBRSxLQUFLO0FBQ25ELE1BQUksQ0FBQyxRQUFTLFFBQU87QUFFckIsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBLE1BQU0sS0FBSyxJQUFJLEdBQUcsNEJBQTRCLFFBQVEsTUFBTSxDQUFDLENBQUM7QUFBQSxJQUM5RCxTQUFTLDRCQUE0QixRQUFRLE9BQU87QUFBQSxJQUNwRCxhQUFhLGdCQUFnQixRQUFRLFdBQVc7QUFBQSxJQUNoRCxTQUFTLHFDQUFxQyxRQUFRLE9BQU87QUFBQSxJQUM3RCxlQUFlLHVCQUF1QixRQUFRLGFBQWE7QUFBQSxJQUMzRCxpQkFBaUIseUJBQXlCLFFBQVEsZUFBZTtBQUFBLElBQ2pFLGFBQWEscUJBQXFCLFFBQVEsV0FBVztBQUFBLElBQ3JELDBCQUEwQixRQUFRLDJCQUM5QixxQ0FBcUMsUUFBUSx3QkFBd0IsSUFDckU7QUFBQSxJQUNKLHdCQUF3Qiw0QkFBNEIsUUFBUSxzQkFBc0I7QUFBQSxFQUNwRjtBQUNGO0FBR08sSUFBTSxtQ0FBbUMsQ0FBQyxZQUEyRDtBQUMxRyxRQUFNLFNBQVM7QUFBQSxJQUNiLHlCQUF1RCxhQUFhLENBQUM7QUFBQSxFQUN2RTtBQUNBLE1BQUksQ0FBQyxPQUFRLFFBQU87QUFFcEIsUUFBTSxjQUFjLE9BQU8sV0FBVyxFQUFFLEVBQUUsS0FBSztBQUMvQyxNQUFJLENBQUMsWUFBYSxRQUFPO0FBQ3pCLFNBQU8sT0FBTyxRQUFRLFlBQVksTUFBTSxZQUFZLFlBQVksSUFBSSxTQUFTO0FBQy9FO0FBR08sSUFBTSxtQ0FBbUMsQ0FDOUMsVUFDd0M7QUFDeEMsUUFBTSxhQUFhLHNDQUFzQyxLQUFLO0FBQzlELE1BQUksQ0FBQyxZQUFZO0FBQ2Ysc0NBQWtDO0FBQ2xDLFdBQU87QUFBQSxFQUNUO0FBRUEsMkJBQXlCLGFBQWEsR0FBRyxZQUFZLHVDQUF1QztBQUM1RixTQUFPO0FBQ1Q7QUFHTyxJQUFNLG9DQUFvQyxNQUFZO0FBQzNELCtCQUE2QixhQUFhLENBQUM7QUFDN0M7OztBQ3RKQSxJQUFBQyxnQkFBK0M7QUFlL0MsSUFBTUMsbUJBQWtCLENBQUMsVUFBMkIsT0FBTyxTQUFTLEVBQUUsRUFBRSxLQUFLO0FBRTdFLElBQU1DLDBCQUF5QixDQUFDLFVBQW1EO0FBQ2pGLFNBQU8sVUFBVSxhQUFhLGFBQWE7QUFDN0M7QUFFQSxJQUFNQyx3QkFBdUIsQ0FBQyxVQUE2QjtBQUN6RCxNQUFJLENBQUMsTUFBTSxRQUFRLEtBQUssRUFBRyxRQUFPLENBQUM7QUFFbkMsUUFBTSxNQUFNLG9CQUFJLElBQVk7QUFDNUIsYUFBVyxTQUFTLE9BQU87QUFDekIsVUFBTSxTQUFTRixpQkFBZ0IsS0FBSztBQUNwQyxRQUFJLENBQUMsT0FBUTtBQUNiLFFBQUksSUFBSSxNQUFNO0FBQUEsRUFDaEI7QUFFQSxTQUFPLE1BQU0sS0FBSyxHQUFHO0FBQ3ZCO0FBRUEsSUFBTSxnQkFBZ0IsQ0FBQyxVQUEwRTtBQUMvRixRQUFNLE9BQThDLENBQUM7QUFDckQsYUFBVyxRQUFRLE9BQU87QUFDeEIsVUFBTSxTQUFTQSxpQkFBZ0IsS0FBSyxNQUFNO0FBQzFDLFFBQUksQ0FBQyxPQUFRO0FBQ2IsU0FBSyxNQUFNLElBQUk7QUFBQSxFQUNqQjtBQUNBLFNBQU87QUFDVDtBQUdPLElBQU0sZ0NBQWdDLE1BQU07QUFDakQsUUFBTSxDQUFDLGVBQWUsZ0JBQWdCLFFBQUksd0JBQXlDLFVBQVU7QUFDN0YsUUFBTSxDQUFDLHFCQUFxQixzQkFBc0IsUUFBSSx3QkFBZ0QsQ0FBQyxDQUFDO0FBQ3hHLFFBQU0sQ0FBQyxhQUFhLGNBQWMsUUFBSSx3QkFBbUIsQ0FBQyxDQUFDO0FBQzNELFFBQU0sQ0FBQyxrQkFBa0IsbUJBQW1CLFFBQUksd0JBQW9ELElBQUk7QUFDeEcsUUFBTSxDQUFDLG9CQUFvQixxQkFBcUIsUUFBSSx3QkFBUyxDQUFDO0FBRTlELFFBQU0sc0JBQWtCLHVCQUFRLE1BQU0sT0FBTyxPQUFPLG1CQUFtQixHQUFHLENBQUMsbUJBQW1CLENBQUM7QUFDL0YsUUFBTSxvQkFBZ0IsdUJBQVEsTUFBTSxJQUFJLElBQUksV0FBVyxHQUFHLENBQUMsV0FBVyxDQUFDO0FBQ3ZFLFFBQU0sNEJBQTRCLGtCQUFrQixjQUFjLENBQUMsQ0FBQztBQUVwRSxRQUFNLHFCQUFpQiwyQkFBWSxNQUFNO0FBQ3ZDLHFCQUFpQixVQUFVO0FBQzNCLDJCQUF1QixDQUFDLENBQUM7QUFDekIsbUJBQWUsQ0FBQyxDQUFDO0FBQ2pCLHdCQUFvQixJQUFJO0FBQ3hCLDBCQUFzQixDQUFDO0FBQUEsRUFDekIsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLHVCQUFtQiwyQkFBWSxDQUFDLFVBQThEO0FBQ2xHLFFBQUksQ0FBQyxPQUFPO0FBQ1YscUJBQWU7QUFDZjtBQUFBLElBQ0Y7QUFFQSxVQUFNLGlCQUFpQkMsd0JBQXVCLE1BQU0sYUFBYTtBQUNqRSxVQUFNLDRCQUE0QixNQUFNLFFBQVEsTUFBTSxlQUFlLElBQUksTUFBTSxrQkFBa0IsQ0FBQztBQUNsRyxVQUFNLHFCQUFxQixNQUFNLG9CQUFvQjtBQUNyRCxVQUFNLHdCQUF3QkMsc0JBQXFCLE1BQU0sV0FBVztBQUNwRSxVQUFNLDBCQUEwQixPQUFPLFNBQVMsT0FBTyxNQUFNLGtCQUFrQixDQUFDLElBQzVFLEtBQUssSUFBSSxHQUFHLEtBQUssTUFBTSxPQUFPLE1BQU0sa0JBQWtCLENBQUMsQ0FBQyxJQUN4RDtBQUVKLHFCQUFpQixtQkFBbUIsY0FBYyxxQkFBcUIsYUFBYSxVQUFVO0FBQzlGLDJCQUF1QixjQUFjLHlCQUF5QixDQUFDO0FBQy9ELG1CQUFlLG1CQUFtQixhQUFhLHdCQUF3QixDQUFDLENBQUM7QUFDekUsd0JBQW9CLG1CQUFtQixhQUFhLHFCQUFxQixJQUFJO0FBQzdFLDBCQUFzQixtQkFBbUIsYUFBYSwwQkFBMEIsQ0FBQztBQUFBLEVBQ25GLEdBQUcsQ0FBQyxjQUFjLENBQUM7QUFFbkIsUUFBTSx5QkFBcUIsMkJBQVksQ0FBQyxVQUE4QyxlQUF1QjtBQUMzRyxxQkFBaUIsVUFBVTtBQUMzQiwyQkFBdUIsQ0FBQyxDQUFDO0FBQ3pCLG1CQUFlLENBQUMsQ0FBQztBQUNqQix3QkFBb0IsUUFBUTtBQUM1QiwwQkFBc0IsT0FBTyxTQUFTLFVBQVUsSUFBSSxLQUFLLElBQUksR0FBRyxLQUFLLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FBQztBQUFBLEVBQzdGLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxpQkFBYTtBQUFBLElBQ2pCLENBQUMsV0FBbUI7QUFDbEIsWUFBTSxhQUFhRixpQkFBZ0IsTUFBTTtBQUN6QyxVQUFJLENBQUMsV0FBWSxRQUFPO0FBRXhCLFVBQUksMkJBQTJCO0FBQzdCLGVBQU8sQ0FBQyxjQUFjLElBQUksVUFBVTtBQUFBLE1BQ3RDO0FBRUEsYUFBTyxDQUFDLENBQUMsb0JBQW9CLFVBQVU7QUFBQSxJQUN6QztBQUFBLElBQ0EsQ0FBQyxlQUFlLDJCQUEyQixtQkFBbUI7QUFBQSxFQUNoRTtBQUVBLFFBQU0sbUJBQWU7QUFBQSxJQUNuQixDQUFDLFdBQWtDO0FBQ2pDLFlBQU0sU0FBU0EsaUJBQWdCLE9BQU8sTUFBTTtBQUM1QyxVQUFJLENBQUMsT0FBUTtBQUViLFVBQUksMkJBQTJCO0FBQzdCLHVCQUFlLENBQUMsYUFBYTtBQUMzQixnQkFBTSxPQUFPLElBQUksSUFBSSxRQUFRO0FBQzdCLGNBQUksS0FBSyxJQUFJLE1BQU0sR0FBRztBQUNwQixpQkFBSyxPQUFPLE1BQU07QUFBQSxVQUNwQixPQUFPO0FBQ0wsaUJBQUssSUFBSSxNQUFNO0FBQUEsVUFDakI7QUFDQSxpQkFBTyxNQUFNLEtBQUssSUFBSTtBQUFBLFFBQ3hCLENBQUM7QUFDRDtBQUFBLE1BQ0Y7QUFFQSw2QkFBdUIsQ0FBQyxhQUFhO0FBQ25DLGNBQU0sT0FBTyxFQUFFLEdBQUcsU0FBUztBQUMzQixZQUFJLEtBQUssTUFBTSxHQUFHO0FBQ2hCLGlCQUFPLEtBQUssTUFBTTtBQUNsQixpQkFBTztBQUFBLFFBQ1Q7QUFDQSxhQUFLLE1BQU0sSUFBSTtBQUNmLGVBQU87QUFBQSxNQUNULENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxDQUFDLHlCQUF5QjtBQUFBLEVBQzVCO0FBRUEsUUFBTSw0QkFBd0IsMkJBQVksQ0FBQyxVQUFtQztBQUM1RSxRQUFJLGtCQUFrQixjQUFjLE1BQU0sU0FBUyxFQUFHO0FBRXRELDJCQUF1QixDQUFDLGFBQWE7QUFDbkMsVUFBSSxVQUFVO0FBQ2QsWUFBTSxPQUFPLEVBQUUsR0FBRyxTQUFTO0FBQzNCLGlCQUFXLFFBQVEsT0FBTztBQUN4QixjQUFNLFNBQVNBLGlCQUFnQixLQUFLLE1BQU07QUFDMUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLE1BQU0sRUFBRztBQUM5QixhQUFLLE1BQU0sSUFBSTtBQUNmLGtCQUFVO0FBQUEsTUFDWjtBQUNBLGFBQU8sVUFBVSxPQUFPO0FBQUEsSUFDMUIsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLGFBQWEsQ0FBQztBQUVsQixRQUFNLDJCQUF1QjtBQUFBLElBQzNCLENBQUMscUJBQXFCLE1BQWM7QUFDbEMsVUFBSSxDQUFDLDJCQUEyQjtBQUM5QixlQUFPLGdCQUFnQjtBQUFBLE1BQ3pCO0FBRUEsWUFBTSxZQUFZLHFCQUFxQixJQUFJLHFCQUFxQixLQUFLLElBQUksR0FBRyxLQUFLLE1BQU0sa0JBQWtCLENBQUM7QUFDMUcsYUFBTyxLQUFLLElBQUksR0FBRyxZQUFZLFlBQVksTUFBTTtBQUFBLElBQ25EO0FBQUEsSUFDQSxDQUFDLFlBQVksUUFBUSxvQkFBb0IsMkJBQTJCLGdCQUFnQixNQUFNO0FBQUEsRUFDNUY7QUFFQSxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjs7O0FDckxBLElBQUFHLGdCQUFtRDtBQXVCbkQsSUFBTSx1QkFBdUIsQ0FDM0IsT0FDQSxXQUM2QztBQUM3QyxVQUFRLE9BQU8sTUFBTTtBQUFBLElBQ25CLEtBQUs7QUFDSCxhQUFPLE9BQU87QUFBQSxJQUNoQixLQUFLO0FBQ0gsYUFBTztBQUFBLElBQ1QsS0FBSztBQUNILGFBQU8sUUFBUSxFQUFFLEdBQUcsT0FBTywyQkFBMkIsTUFBTSxJQUFJO0FBQUEsSUFDbEU7QUFDRSxhQUFPO0FBQUEsRUFDWDtBQUNGO0FBWUEsSUFBTSx1Q0FBdUM7QUFFN0MsSUFBTSxnQ0FBZ0MsSUFBSSxTQUFvQjtBQUM1RCxNQUFJLE9BQU8sWUFBWSxlQUFlLE9BQU8sUUFBUSxTQUFTLFlBQVk7QUFDeEUsWUFBUSxLQUFLLHNDQUFzQyxHQUFHLElBQUk7QUFBQSxFQUM1RDtBQUNGO0FBRUEsSUFBTSxnQ0FBZ0MsSUFBSSxTQUFvQjtBQUM1RCxNQUFJLE9BQU8sWUFBWSxlQUFlLE9BQU8sUUFBUSxTQUFTLFlBQVk7QUFDeEUsWUFBUSxLQUFLLHNDQUFzQyxHQUFHLElBQUk7QUFBQSxFQUM1RDtBQUNGO0FBR08sSUFBTSxnQ0FBZ0MsQ0FBQztBQUFBLEVBQzVDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBeUM7QUFDdkMsUUFBTSxDQUFDLHNCQUFzQixRQUFRLFFBQUksMEJBQVcsc0JBQXNCLElBQUk7QUFFOUUsUUFBTSwyQkFBdUI7QUFBQSxJQUMzQixDQUNFLE1BQ0EsVUFDQSxVQUlJLENBQUMsTUFDRjtBQUNILG9DQUE4QixpQ0FBaUM7QUFBQSxRQUM3RDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRixDQUFDO0FBQ0QsZUFBUztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQSxZQUFZLFFBQVEsZUFBZTtBQUFBLFVBQ25DLGlCQUFpQixRQUFRLG9CQUFvQjtBQUFBLFVBQzdDLDJCQUEyQixRQUFRLDhCQUE4QjtBQUFBLFFBQ25FO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsQ0FBQztBQUFBLEVBQ0g7QUFFQSwrQkFBVSxNQUFNO0FBQ2QsUUFBSSxDQUFDLHFCQUFzQjtBQUUzQixRQUFJLHFCQUFxQiwyQkFBMkI7QUFDbEQsVUFBSSxDQUFDLFlBQVk7QUFDZixzQ0FBOEIsMENBQTBDO0FBQUEsVUFDdEUsTUFBTSxxQkFBcUI7QUFBQSxRQUM3QixDQUFDO0FBQ0QsaUJBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RDO0FBQUEsTUFDRjtBQUVBLFVBQUksQ0FBQyxzQkFBc0Isb0JBQW9CO0FBQzdDLHNDQUE4QixnREFBZ0Q7QUFBQSxVQUM1RSxNQUFNLHFCQUFxQjtBQUFBLFVBQzNCO0FBQUEsVUFDQTtBQUFBLFFBQ0YsQ0FBQztBQUNEO0FBQUEsTUFDRjtBQUVBLFVBQUksaUJBQWlCO0FBQ25CLHNDQUE4QiwwQ0FBMEM7QUFBQSxVQUN0RSxNQUFNLHFCQUFxQjtBQUFBLFFBQzdCLENBQUM7QUFDRCxpQkFBUyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzFCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxVQUFNLEVBQUUsTUFBTSxVQUFVLFlBQVksZ0JBQWdCLElBQUk7QUFDeEQsYUFBUyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzFCLGtDQUE4QixnQ0FBZ0M7QUFBQSxNQUM1RDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUVELFFBQUksWUFBWTtBQUNkLHFCQUFlO0FBQUEsSUFDakI7QUFFQSxRQUFJLGlCQUFpQjtBQUNuQixnQkFBVSxrQ0FBa0M7QUFBQSxJQUM5QztBQUVBLFNBQUssU0FBUyxNQUFNLFFBQVE7QUFBQSxFQUM5QixHQUFHO0FBQUEsSUFDRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxTQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFDRjs7O0FWRUUsSUFBQUMsc0JBQUE7QUE3R0YsSUFBTSxZQUFZO0FBRWxCLElBQU0sa0JBQWtCLENBQUMsVUFBMkIsT0FBTyxTQUFTLEVBQUUsRUFBRSxLQUFLO0FBRTdFLElBQU0sYUFBYSxDQUFDLE1BQWMsVUFBMkI7QUFDM0QsUUFBTSxpQkFBaUIsZ0JBQWdCLElBQUksRUFBRSxZQUFZO0FBQ3pELFFBQU0sa0JBQWtCLGdCQUFnQixLQUFLLEVBQUUsWUFBWTtBQUMzRCxTQUFPLENBQUMsQ0FBQyxrQkFBa0IsbUJBQW1CO0FBQ2hEO0FBRUEsSUFBTSwwQkFBMEIsQ0FDOUIsT0FDQSxpQkFDQSxrQkFBa0IsT0FDSTtBQUN0QixRQUFNLG9CQUFvQixnQkFBZ0IsZUFBZTtBQUN6RCxRQUFNLHdCQUF3QixnQkFBZ0IsZUFBZTtBQUM3RCxNQUFJLENBQUMsa0JBQW1CLFFBQU87QUFDL0IsTUFBSSxNQUFNLEtBQUssQ0FBQyxVQUFVLFdBQVcsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEdBQUc7QUFDeEUsV0FBTyxNQUFNLElBQUksQ0FBQyxVQUFVO0FBQzFCLFVBQUksQ0FBQyxXQUFXLE1BQU0sVUFBVSxpQkFBaUIsRUFBRyxRQUFPO0FBQzNELGFBQU87QUFBQSxRQUNMLEdBQUc7QUFBQSxRQUNILE1BQU0seUJBQXlCLGdCQUFnQixNQUFNLElBQUksS0FBSztBQUFBLFFBQzlELFVBQVUseUJBQXlCLE1BQU07QUFBQSxNQUMzQztBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDQSxTQUFPO0FBQUEsSUFDTDtBQUFBLE1BQ0UsV0FBVztBQUFBLE1BQ1gsVUFBVTtBQUFBLE1BQ1YsTUFBTSx5QkFBeUI7QUFBQSxNQUMvQixVQUFVLHlCQUF5QjtBQUFBLElBQ3JDO0FBQUEsSUFDQSxHQUFHO0FBQUEsRUFDTDtBQUNGO0FBRUEsSUFBTSw4QkFBOEIsQ0FBQyxpQkFBeUIsaUJBQXlCLFVBQXFDO0FBQzFILFFBQU0sc0JBQXNCLGdCQUFnQixlQUFlO0FBQzNELFFBQU0sb0JBQW9CLGdCQUFnQixlQUFlO0FBQ3pELE1BQUkscUJBQXFCO0FBQ3ZCLFVBQU0sUUFBUSxNQUFNLEtBQUssQ0FBQyxVQUFVLFdBQVcsTUFBTSxVQUFVLG1CQUFtQixDQUFDO0FBQ25GLFFBQUksTUFBTyxRQUFPLE1BQU07QUFBQSxFQUMxQjtBQUNBLE1BQUksbUJBQW1CO0FBQ3JCLFVBQU0sT0FBTyxNQUFNLEtBQUssQ0FBQyxVQUFVLFdBQVcsTUFBTSxVQUFVLGlCQUFpQixDQUFDO0FBQ2hGLFdBQU8sTUFBTSxZQUFZO0FBQUEsRUFDM0I7QUFDQSxTQUFPO0FBQ1Q7QUFFQSxJQUFNLCtCQUErQixDQUFDLGdCQUFnQixPQUEyQztBQUMvRixRQUFNLFFBQVEsV0FBVyxvQkFBSSxLQUFLLENBQUM7QUFDbkMsUUFBTSxXQUFXLElBQUksS0FBSyxLQUFLO0FBRS9CLFdBQVMsUUFBUSxNQUFNLFFBQVEsSUFBSSxFQUFFO0FBRXJDLFNBQU87QUFBQSxJQUNMLFVBQVUsVUFBVSxRQUFRO0FBQUEsSUFDNUIsUUFBUSxVQUFVLEtBQUs7QUFBQSxJQUN2QixXQUFXO0FBQUEsSUFDWCxjQUFjO0FBQUEsSUFDZCxlQUFlLGdCQUFnQixhQUFhO0FBQUEsSUFDNUMsY0FBYztBQUFBLElBQ2QsaUJBQWlCO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsRUFDdkI7QUFDRjtBQUVBLElBQU0sZ0NBQWdDLENBQUMsV0FBNEI7QUFDakUsTUFBSSxRQUFRO0FBQ1YsV0FBTyxLQUFLLHFDQUFxQyxpREFBaUQ7QUFBQSxFQUNwRztBQUVBLFNBQU8sS0FBSyx5Q0FBeUMsNkRBQTZEO0FBQ3BIO0FBRUEsSUFBTSw2QkFBNkI7QUFFbkMsSUFBTSx3QkFBd0IsSUFBSSxTQUFvQjtBQUNwRCxNQUFJLE9BQU8sWUFBWSxlQUFlLE9BQU8sUUFBUSxTQUFTLFlBQVk7QUFDeEUsWUFBUSxLQUFLLDRCQUE0QixHQUFHLElBQUk7QUFBQSxFQUNsRDtBQUNGO0FBRUEsSUFBTSx3QkFBd0IsSUFBSSxTQUFvQjtBQUNwRCxNQUFJLE9BQU8sWUFBWSxlQUFlLE9BQU8sUUFBUSxTQUFTLFlBQVk7QUFDeEUsWUFBUSxLQUFLLDRCQUE0QixHQUFHLElBQUk7QUFBQSxFQUNsRDtBQUNGO0FBR0EsSUFBTSx5QkFBeUIsQ0FBQyxTQUE2QztBQUMzRSxRQUFNLFNBQVMsU0FBUyxLQUFLLE1BQU07QUFDbkMsU0FBTyxDQUFDLENBQUM7QUFDWDtBQUdBLElBQU0sMEJBQTBCLE1BQU07QUFDcEMsMEJBQXdCO0FBQUEsSUFDdEIsT0FBTyxTQUFTLE9BQU8saUJBQWlCO0FBQUEsSUFDeEMsVUFBVSxTQUFTLE9BQU8saUJBQWlCO0FBQUEsSUFDM0MsU0FBUyxTQUFTLE9BQU8sZ0JBQWdCO0FBQUEsRUFDM0MsQ0FBQztBQUNIO0FBRUEsSUFBTSxnQkFBZ0IsTUFDcEIsOENBQUMsU0FBSSxTQUFRLGFBQVksTUFBSyxRQUFPLFFBQU8sZ0JBQWUsYUFBYSxLQUFLLGVBQVksUUFBTyxXQUFVLFVBQ3hHO0FBQUEsK0NBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLCtIQUE4SDtBQUFBLEVBQ25MLDZDQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSx3Q0FBdUM7QUFBQSxFQUM1Riw2Q0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsNkJBQTRCO0FBQUEsRUFDakYsNkNBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLFlBQVc7QUFBQSxFQUNoRSw2Q0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsWUFBVztBQUFBLEdBQ2xFO0FBR0YsSUFBTSw0QkFBNEIsTUFBTTtBQUN0QyxRQUFNLFlBQVksVUFBVSxrQkFBa0IsTUFBTTtBQUNwRCxRQUFNLGtCQUFrQixVQUFVLGtCQUFrQixLQUFLO0FBQ3pELFFBQU0sb0JBQW9CLFVBQVUscUJBQXFCLEtBQUs7QUFDOUQsUUFBTSxDQUFDLDJCQUEyQiw0QkFBNEIsUUFBSSx3QkFBUyxLQUFLO0FBQ2hGLFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLElBQUksZUFBZTtBQUNuQixRQUFNLHVCQUF1QixjQUFBQyxRQUFNLE9BQThCLElBQUk7QUFDckUsUUFBTSxpQkFBaUIsY0FBQUEsUUFBTSxPQUFnQyxJQUFJO0FBQ2pFLFFBQU0sa0JBQWtCLGNBQUFBLFFBQU0sT0FBZ0MsSUFBSTtBQUNsRSxRQUFNLHVCQUF1QixjQUFBQSxRQUFNLE9BQU8sS0FBSztBQUMvQyxRQUFNLDBCQUEwQixjQUFBQSxRQUFNLE9BQXNCLElBQUk7QUFDaEUsUUFBTSx3QkFBd0IsY0FBQUEsUUFBTSxPQUFPLEVBQUU7QUFDN0MsUUFBTSxzQkFBa0IsdUJBQVEsTUFBTTtBQUNwQyxVQUFNLE1BQU0sSUFBSSxJQUFJLE9BQU8sU0FBUyxJQUFJO0FBQ3hDLFVBQU0sU0FBUyxTQUFTLElBQUksYUFBYSxJQUFJLFFBQVEsQ0FBQyxFQUFFLFlBQVk7QUFDcEUsVUFBTSxlQUFlLFNBQVMsSUFBSSxhQUFhLElBQUksY0FBYyxDQUFDO0FBQ2xFLFVBQU1DLGNBQWEsV0FBVyxVQUFVLENBQUMsQ0FBQztBQUMxQyxXQUFPO0FBQUEsTUFDTCxZQUFBQTtBQUFBLE1BQ0EsU0FBUztBQUFBLE1BQ1QsYUFBYUEsY0FBYyxlQUEwQixDQUFDLENBQUMsZUFBZ0IsaUJBQTJCO0FBQUEsTUFDbEcsbUJBQW1CQSxjQUFjLElBQWM7QUFBQSxJQUNqRDtBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLGFBQWEsZ0JBQWdCO0FBQ25DLFFBQU0sY0FBYyxnQkFBZ0I7QUFDcEMsUUFBTSxvQkFBb0IsZ0JBQWdCO0FBQzFDLFFBQU0sd0JBQXdCLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNqRCxRQUFNLG9CQUFvQixnQkFBZ0I7QUFDMUMsUUFBTSxxQkFBcUIsQ0FBQyxjQUFjO0FBQzFDLFFBQU0sbUJBQWU7QUFBQSxJQUNuQixNQUFNLHdCQUF3QixNQUFNLFFBQVEsWUFBWSxJQUFJLGVBQWUsQ0FBQyxHQUFHLGlCQUFpQixlQUFlO0FBQUEsSUFDL0csQ0FBQyxpQkFBaUIsaUJBQWlCLFlBQVk7QUFBQSxFQUNqRDtBQUNBLFFBQU0sMkJBQXVCO0FBQUEsSUFDM0IsTUFBTSw0QkFBNEIsaUJBQWlCLGlCQUFpQixZQUFZO0FBQUEsSUFDaEYsQ0FBQyxpQkFBaUIsWUFBWTtBQUFBLEVBQ2hDO0FBQ0EsUUFBTSx3QkFBd0IsY0FBYztBQUc1QyxRQUFNLHVDQUFtQztBQUFBLElBQ3ZDLENBQUMsYUFBcUY7QUFDcEYsVUFBSSxDQUFDLFdBQVksUUFBTztBQUV4QixZQUFNLFdBQVcsNkJBQTZCLFNBQVMsYUFBYTtBQUNwRSxZQUFNLHFCQUFxQixTQUFTLFNBQVMsUUFBUSxLQUFLLFNBQVM7QUFDbkUsWUFBTSxtQkFBbUIsU0FBUyxTQUFTLE1BQU0sS0FBSyxTQUFTO0FBQy9ELFlBQU0sMEJBQTBCLGdCQUFnQixTQUFTLGFBQWEsS0FBSyxTQUFTO0FBRXBGLGFBQU87QUFBQSxRQUNMLEdBQUc7QUFBQSxRQUNILFVBQVU7QUFBQSxRQUNWLFFBQVE7QUFBQSxRQUNSLGVBQWU7QUFBQSxRQUNmLGNBQWM7QUFBQSxNQUNoQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUMsVUFBVTtBQUFBLEVBQ2I7QUFFQSxRQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksd0JBQVMsS0FBSztBQUN0RCxRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixRQUFJLHdCQUFTLEVBQUU7QUFDdkQsUUFBTSxDQUFDLGVBQWUsZ0JBQWdCLFFBQUksd0JBQVMsRUFBRTtBQUNyRCxRQUFNLENBQUMsZUFBZSxnQkFBZ0IsUUFBSSx3QkFBUyxLQUFLO0FBQ3hELFFBQU0sQ0FBQyxnQkFBZ0IsaUJBQWlCLFFBQUksd0JBQVMsRUFBRTtBQUN2RCxRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixRQUFJLHdCQUFxRCxJQUFJO0FBRXJHLFFBQU0sdUJBQW1CO0FBQUEsSUFDdkIsT0FBTztBQUFBLE1BQ0wsT0FBTyxLQUFLLHNCQUFzQixPQUFPO0FBQUEsTUFDekMsTUFBTSxLQUFLLHFCQUFxQixVQUFVO0FBQUEsTUFDMUMsTUFBTSxLQUFLLHFCQUFxQixNQUFNO0FBQUEsTUFDdEMsTUFBTSxLQUFLLHFCQUFxQixNQUFNO0FBQUEsSUFDeEM7QUFBQSxJQUNBLENBQUM7QUFBQSxFQUNIO0FBRUEsUUFBTSxFQUFFLE9BQU8sYUFBYSxjQUFjLGNBQWMsSUFBSSxpQkFBaUI7QUFBQSxJQUMzRSxvQkFBb0IsS0FBSyxlQUFlLElBQUk7QUFBQSxJQUM1QyxtQkFBbUIsS0FBSyxjQUFjLFFBQVE7QUFBQSxFQUNoRCxDQUFDO0FBRUQsUUFBTSx1QkFBbUIsdUJBQStCLE1BQU0sMkJBQTJCLEdBQUcsQ0FBQyxDQUFDO0FBRTlGLFFBQU0sd0JBQW9CLHVCQUFRLE1BQU07QUFDdEMsVUFBTSxNQUFNLG9CQUFJLElBQW9CO0FBQ3BDLGVBQVcsVUFBVSxrQkFBa0I7QUFDckMsVUFBSSxJQUFJLE9BQU8sT0FBTyxLQUFLLEdBQUcsT0FBTyxJQUFJO0FBQUEsSUFDM0M7QUFDQSxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsZ0JBQWdCLENBQUM7QUFFckIsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsSUFBSSwwQkFBMEI7QUFBQSxJQUM1QjtBQUFBLElBQ0EsVUFBVTtBQUFBLElBQ1YsTUFBTSxhQUFhLFNBQVM7QUFBQSxJQUM1QixhQUFhO0FBQUEsRUFDZixDQUFDO0FBQ0QsUUFBTSxFQUFFLGlCQUFpQixtQkFBbUIsbUJBQW1CLGlCQUFpQixpQkFBaUIsSUFBSSw2QkFBNkI7QUFDbEksUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsWUFBWTtBQUFBLElBQ1osY0FBYztBQUFBLElBQ2QsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsSUFBSSw4QkFBOEI7QUFDbEMsUUFBTSwrQkFBMkI7QUFBQSxJQUMvQixDQUFDLG9CQUFvQztBQUNuQyxZQUFNLGlCQUFpQiw0QkFBNEIsaUJBQWlCLGlCQUFpQixZQUFZO0FBQ2pHLCtCQUF5QixjQUFjO0FBQ3ZDLFVBQUksQ0FBQyxrQkFBbUIsbUJBQW1CLFdBQVcsZ0JBQWdCLGVBQWUsR0FBSTtBQUN2Rix1Q0FBK0I7QUFBQSxNQUNqQyxPQUFPO0FBQ0wscUNBQTZCLGNBQWM7QUFBQSxNQUM3QztBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxDQUFDLGlCQUFpQixjQUFjLHdCQUF3QjtBQUFBLEVBQzFEO0FBQ0EsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsSUFBSSw4QkFBOEI7QUFBQSxJQUNoQztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLHVCQUF1QjtBQUFBLEVBQ3pCLENBQUM7QUFDRCxRQUFNLEVBQUUscUJBQXFCLElBQUksOEJBQThCO0FBQUEsSUFDN0Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFDRCxRQUFNLG1DQUErQiwyQkFBWSxNQUFNO0FBQ3JELFVBQU0sdUJBQXVCLHlCQUF5QixvQkFBb0I7QUFDMUUsV0FBTyw2QkFBNkIsb0JBQW9CO0FBQUEsRUFDMUQsR0FBRyxDQUFDLHNCQUFzQix3QkFBd0IsQ0FBQztBQUVuRCxRQUFNLG1DQUErQiwyQkFBWSxNQUEwQztBQUN6RixVQUFNLFFBQVEsV0FBVyxvQkFBSSxLQUFLLENBQUM7QUFDbkMsVUFBTUMsWUFBVyxJQUFJLEtBQUssS0FBSztBQUMvQixJQUFBQSxVQUFTLFFBQVEsTUFBTSxRQUFRLElBQUksRUFBRTtBQUNyQyxVQUFNLHVCQUF1Qix5QkFBeUIsb0JBQW9CO0FBRTFFLFdBQU87QUFBQSxNQUNMLFVBQVUsVUFBVUEsU0FBUTtBQUFBLE1BQzVCLFFBQVEsVUFBVSxLQUFLO0FBQUEsTUFDdkIsV0FBVztBQUFBLE1BQ1gsY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsaUJBQWlCO0FBQUEsTUFDakIscUJBQXFCO0FBQUEsSUFDdkI7QUFBQSxFQUNGLEdBQUcsQ0FBQyxzQkFBc0Isd0JBQXdCLENBQUM7QUFFbkQsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixJQUFJLDhCQUE4QjtBQUFBLElBQ2hDO0FBQUEsSUFDQTtBQUFBLElBQ0Esd0JBQXdCO0FBQUEsSUFDeEIsZ0JBQWdCLENBQUMsYUFBYTtBQUM1Qix3QkFBa0IsSUFBSTtBQUN0QiwrQkFBeUI7QUFDekIsWUFBTSx3QkFBd0IseUJBQXlCLFNBQVMsYUFBYTtBQUM3RSxXQUFLO0FBQUEsUUFDSDtBQUFBLFFBQ0EsaUNBQWlDO0FBQUEsVUFDL0IsR0FBRztBQUFBLFVBQ0gsZUFBZTtBQUFBLFFBQ2pCLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLElBQ0EsZ0JBQWdCLE1BQU07QUFDcEIsd0JBQWtCLElBQUk7QUFDdEIsK0JBQXlCO0FBQ3pCLHVCQUFpQjtBQUNqQixVQUFJLFlBQVk7QUFDZCxjQUFNLGVBQWUsNkJBQTZCO0FBQ2xELDhCQUFzQixZQUFZO0FBQ2xDLDZCQUFxQixHQUFHLGlDQUFpQyxZQUFZLEdBQUc7QUFBQSxVQUN0RSxZQUFZO0FBQUEsVUFDWixpQkFBaUI7QUFBQSxVQUNqQiwyQkFBMkI7QUFBQSxRQUM3QixDQUFDO0FBQ0Q7QUFBQSxNQUNGO0FBRUEsWUFBTSxxQkFBcUIseUJBQXlCLGVBQWU7QUFDbkUsdUJBQWlCLGtCQUFrQjtBQUNuQyxnQkFBVSxlQUFlO0FBQUEsSUFDM0I7QUFBQSxFQUNGLENBQUM7QUFFRCwrQkFBVSxNQUFNO0FBQ2QsVUFBTSxpQ0FBaUMsZ0JBQWdCLG9CQUFvQjtBQUMzRSxRQUFJLENBQUMsK0JBQWdDO0FBQ3JDLHFCQUFpQiw4QkFBOEI7QUFDL0MsNkJBQXlCLDhCQUE4QjtBQUFBLEVBQ3pELEdBQUcsQ0FBQyxzQkFBc0Isa0JBQWtCLHdCQUF3QixDQUFDO0FBRXJFLCtCQUFVLE1BQU07QUFDZCxRQUFJLG9CQUFxQjtBQUN6QixVQUFNLHdCQUF3Qiw0QkFBNEIsaUJBQWlCLGlCQUFpQixZQUFZO0FBQ3hHLFVBQU0saUNBQWlDLGdCQUFnQixhQUFhO0FBQ3BFLFFBQUksV0FBVyxnQ0FBZ0MscUJBQXFCLEVBQUc7QUFDdkUsUUFBSSxDQUFDLGtDQUFrQyxDQUFDLHNCQUF1QjtBQUUvRCxxQkFBaUIscUJBQXFCO0FBQ3RDLDZCQUF5QixxQkFBcUI7QUFBQSxFQUNoRCxHQUFHLENBQUMscUJBQXFCLGlCQUFpQixlQUFlLGNBQWMsa0JBQWtCLHdCQUF3QixDQUFDO0FBRWxILFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQSxNQUFNO0FBQUEsSUFDTixpQkFBaUI7QUFBQSxJQUNqQixnQkFBZ0I7QUFBQSxJQUNoQixtQkFBbUI7QUFBQSxJQUNuQixjQUFjO0FBQUEsSUFDZCxXQUFXO0FBQUEsSUFDWDtBQUFBLElBQ0E7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFlBQVk7QUFBQSxFQUNkLElBQUksK0JBQStCO0FBQUEsSUFDakMsa0JBQWtCLENBQUMsY0FBYztBQUFBLElBQ2pDLGNBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxJQUNmLGFBQWE7QUFBQSxJQUNiLGtCQUFrQixTQUFTLGVBQWU7QUFBQSxJQUMxQyxjQUFjLGdCQUFnQjtBQUFBLElBQzlCLGFBQWE7QUFBQSxJQUNiLGFBQWEsQ0FBQyxXQUFXO0FBQ3ZCLFlBQU0sZ0JBQWdCLFNBQVMsUUFBUSxNQUFNO0FBQzdDLFVBQUksQ0FBQyxjQUFlO0FBRXBCLFVBQUkseUJBQXlCLG1CQUFtQjtBQUM5Qyx1Q0FBK0I7QUFBQSxVQUM3QixRQUFRO0FBQUEsVUFDUixTQUFTO0FBQUEsVUFDVCxRQUFRO0FBQUEsUUFDVixDQUFDO0FBQ0QsY0FBTSxRQUFRLElBQUksZ0JBQWdCO0FBQUEsVUFDaEMsUUFBUTtBQUFBLFVBQ1IsTUFBTTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsU0FBUztBQUFBLFFBQ1gsQ0FBQztBQUNELDZCQUFxQix3QkFBd0IsTUFBTSxTQUFTLENBQUMsSUFBSTtBQUFBLFVBQy9ELGlCQUFpQjtBQUFBLFFBQ25CLENBQUM7QUFDRDtBQUFBLE1BQ0Y7QUFFQSxzQ0FBZ0M7QUFDaEMsMkJBQXFCLCtCQUErQixtQkFBbUIsYUFBYSxDQUFDLG1DQUFtQztBQUFBLFFBQ3RILGlCQUFpQjtBQUFBLE1BQ25CLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSxtQkFBZTtBQUFBLElBQ25CLE1BQ0UsYUFDSSxDQUFDLElBQ0Q7QUFBQSxNQUNFO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixPQUFPLEtBQUssK0JBQStCLGNBQWM7QUFBQSxRQUN6RCxNQUFNLDZDQUFDLGlCQUFjO0FBQUEsUUFDckIsU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGO0FBQUEsSUFDTixDQUFDLFlBQVksZ0JBQWdCO0FBQUEsRUFDL0I7QUFFQSxRQUFNLHNCQUFzQixxQkFBcUIsS0FBSztBQUN0RCxRQUFNLDhCQUEwQix1QkFBUSxNQUFNO0FBQzVDLFFBQUksY0FBYztBQUVsQixvQkFBZ0IsUUFBUSxDQUFDLFNBQVM7QUFDaEMsWUFBTSxTQUFTLE9BQU8sS0FBSyxlQUFlLENBQUM7QUFDM0MsVUFBSSxDQUFDLE9BQU8sU0FBUyxNQUFNLEVBQUc7QUFDOUIscUJBQWU7QUFBQSxJQUNqQixDQUFDO0FBRUQsV0FBTyx5QkFBeUIsYUFBYSx5QkFBeUI7QUFBQSxFQUN4RSxHQUFHLENBQUMsMkJBQTJCLGVBQWUsQ0FBQztBQUMvQywrQkFBVSxNQUFNO0FBQ2QsUUFBSSxZQUFZO0FBRWhCLHVDQUFtQyxFQUNoQyxLQUFLLENBQUMsYUFBYTtBQUNsQixVQUFJLFVBQVc7QUFDZixZQUFNLHFCQUFxQixTQUFTLFFBQVEsRUFBRSxZQUFZO0FBQzFELFVBQUksb0JBQW9CO0FBQ3RCLHFDQUE2QixrQkFBa0I7QUFBQSxNQUNqRDtBQUFBLElBQ0YsQ0FBQyxFQUNBLE1BQU0sTUFBTTtBQUFBLElBRWIsQ0FBQztBQUVILFdBQU8sTUFBTTtBQUNYLGtCQUFZO0FBQUEsSUFDZDtBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFDTCxxQ0FBZ0IsTUFBTTtBQUNwQiw4QkFBd0IsOEJBQThCO0FBQUEsRUFDeEQsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLDRCQUF3QjtBQUFBLElBQzVCLE1BQ0U7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBRUEsUUFBTSwrQkFBMkI7QUFBQSxJQUMvQixDQUFDLGNBQXNCLG9CQUE2QjtBQUNsRCxZQUFNLGtCQUFrQiw2QkFBNkI7QUFFckQsNEJBQXNCLGtDQUFrQztBQUFBLFFBQ3REO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRixDQUFDO0FBRUQsdUJBQWlCO0FBQ2pCLDhCQUF3QixVQUFVO0FBQ2xDLDRCQUFzQixVQUFVO0FBQ2hDLDRCQUFzQixlQUFlO0FBQ3JDLHFCQUFlO0FBQ2YsZ0JBQVUsdUJBQXVCO0FBQ2pDLDRCQUFzQixxQ0FBcUM7QUFBQSxRQUN6RCxNQUFNO0FBQUEsUUFDTjtBQUFBLE1BQ0YsQ0FBQztBQUNELFdBQUssU0FBUyxHQUFHLGVBQWU7QUFFaEMsWUFBTSxNQUFNLElBQUksSUFBSSxPQUFPLFNBQVMsSUFBSTtBQUN4QyxVQUFJLGFBQWEsT0FBTyxjQUFjO0FBQ3RDLFVBQUksYUFBYSxPQUFPLFlBQVk7QUFDcEMsWUFBTSxlQUFlLElBQUksYUFBYSxTQUFTO0FBQy9DLGFBQU8sUUFBUSxhQUFhLENBQUMsR0FBRyxJQUFJLGVBQWUsR0FBRyxJQUFJLFFBQVEsSUFBSSxZQUFZLEtBQUssSUFBSSxRQUFRO0FBQUEsSUFDckc7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxpQ0FBNkI7QUFBQSxJQUNqQyxDQUFDLGdCQUEyQztBQUMxQyxZQUFNLHdCQUF3Qix5QkFBeUIsWUFBWSxRQUFRLGFBQWE7QUFDeEYsWUFBTSxrQkFBa0I7QUFBQSxRQUN0QixHQUFHLFlBQVk7QUFBQSxRQUNmLGVBQWU7QUFBQSxNQUNqQjtBQUVBLDRCQUFzQixlQUFlO0FBQ3JDLDhCQUF3QixVQUFVLFlBQVk7QUFDOUMsNEJBQXNCLFVBQVUsWUFBWTtBQUM1QyxpQ0FBMkI7QUFBQSxRQUN6QixlQUFlLFlBQVk7QUFBQSxRQUMzQixpQkFBaUIsWUFBWTtBQUFBLFFBQzdCLGFBQWEsWUFBWTtBQUFBLFFBQ3pCLGtCQUFrQixZQUFZO0FBQUEsUUFDOUIsb0JBQW9CLFlBQVk7QUFBQSxNQUNsQyxDQUFDO0FBRUQsVUFBSSxZQUFZLE1BQU0sU0FBUyxLQUFLLFlBQVksUUFBUSxHQUFHO0FBQ3pELDRCQUFvQjtBQUFBLFVBQ2xCLE9BQU8sWUFBWTtBQUFBLFVBQ25CLE9BQU8sWUFBWTtBQUFBLFVBQ25CLE1BQU0sWUFBWTtBQUFBLFFBQ3BCLENBQUM7QUFBQSxNQUNIO0FBRUEsMkJBQXFCLFlBQVksTUFBTSxpQ0FBaUMsZUFBZSxHQUFHO0FBQUEsUUFDeEYsWUFBWTtBQUFBLFFBQ1osMkJBQTJCO0FBQUEsTUFDN0IsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLGtDQUE4QiwyQkFBWSxNQUFNO0FBQ3BELFVBQU0sZUFBZSw2QkFBNkI7QUFDbEQscUJBQWlCO0FBQ2pCLHNDQUFrQztBQUNsQyw2QkFBeUI7QUFDekIsc0JBQWtCLElBQUk7QUFDdEIsMEJBQXNCLFlBQVk7QUFDbEMseUJBQXFCLEdBQUcsaUNBQWlDLFlBQVksR0FBRztBQUFBLE1BQ3RFLFlBQVk7QUFBQSxNQUNaLGlCQUFpQjtBQUFBLE1BQ2pCLDJCQUEyQjtBQUFBLElBQzdCLENBQUM7QUFBQSxFQUNILEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBR0QsUUFBTSxrQ0FBOEIsMkJBQVksTUFBTTtBQUNwRCxVQUFNLGtCQUFrQiw2QkFBNkI7QUFDckQscUJBQWlCO0FBQ2pCLHNDQUFrQztBQUNsQyw0QkFBd0IsVUFBVTtBQUNsQywwQkFBc0IsVUFBVTtBQUNoQywwQkFBc0IsZUFBZTtBQUNyQyx5QkFBcUIsR0FBRyxpQkFBaUI7QUFBQSxNQUN2QyxZQUFZO0FBQUEsTUFDWixpQkFBaUI7QUFBQSxJQUNuQixDQUFDO0FBQUEsRUFDSCxHQUFHO0FBQUEsSUFDRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLGlDQUE2QjtBQUFBLElBQ2pDLENBQUMsZ0JBQTJDO0FBQzFDLFlBQU0sd0JBQXdCLHlCQUF5QixZQUFZLFFBQVEsYUFBYTtBQUN4RixZQUFNLGtCQUFrQjtBQUFBLFFBQ3RCLEdBQUcsWUFBWTtBQUFBLFFBQ2YsZUFBZTtBQUFBLE1BQ2pCO0FBRUEsNEJBQXNCLGVBQWU7QUFDckMsOEJBQXdCLFVBQVUsWUFBWTtBQUM5Qyw0QkFBc0IsVUFBVSxZQUFZO0FBRTVDLFVBQUksWUFBWSxNQUFNLFNBQVMsS0FBSyxZQUFZLFFBQVEsR0FBRztBQUN6RCw0QkFBb0I7QUFBQSxVQUNsQixPQUFPLFlBQVk7QUFBQSxVQUNuQixPQUFPLFlBQVk7QUFBQSxVQUNuQixNQUFNLFlBQVk7QUFBQSxRQUNwQixDQUFDO0FBQUEsTUFDSDtBQUVBLDJCQUFxQixZQUFZLE1BQU0saUJBQWlCO0FBQUEsUUFDdEQsWUFBWTtBQUFBLE1BQ2QsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLENBQUMsdUJBQXVCLHFCQUFxQixzQkFBc0Isd0JBQXdCO0FBQUEsRUFDN0Y7QUFHQSxRQUFNLCtCQUEyQiwyQkFBWSxNQUFNO0FBQ2pELHFCQUFpQjtBQUNqQixzQ0FBa0M7QUFDbEMsNEJBQXdCLFVBQVU7QUFDbEMsMEJBQXNCLFVBQVU7QUFDaEMsNkJBQXlCO0FBQ3pCLHNCQUFrQixJQUFJO0FBQ3RCLFlBQVE7QUFBQSxFQUNWLEdBQUcsQ0FBQyxrQkFBa0IsbUNBQW1DLDBCQUEwQixPQUFPLENBQUM7QUFFM0YsUUFBTSw0QkFBd0I7QUFBQSxJQUM1QixDQUFDLFdBQXNDO0FBQ3JDLFVBQUksQ0FBQyxjQUFjLENBQUMsc0JBQXNCLHNCQUFzQixtQkFBbUIsYUFBYztBQUNqRyxVQUFJLE9BQU8sU0FBUyxPQUFRO0FBRTVCLFlBQU0sU0FBUyxTQUFTLE9BQU8sTUFBTTtBQUNyQyxVQUFJLENBQUMsT0FBUTtBQUNiLFVBQUksQ0FBQyx1QkFBdUIsTUFBTSxFQUFHO0FBRXJDLHdCQUFrQixJQUFJO0FBQ3RCLGdDQUEwQixNQUFNO0FBQUEsSUFDbEM7QUFBQSxJQUNBLENBQUMsb0JBQW9CLFlBQVksY0FBYyxvQkFBb0IsaUJBQWlCLHlCQUF5QjtBQUFBLEVBQy9HO0FBRUEsUUFBTSwyQkFBdUIsMkJBQVksTUFBTTtBQUM3QyxzQkFBa0IsRUFBRTtBQUNwQixzQkFBa0IsSUFBSTtBQUN0Qiw2QkFBeUI7QUFBQSxFQUMzQixHQUFHLENBQUMsd0JBQXdCLENBQUM7QUFFN0IsUUFBTSwyQkFBdUIsMkJBQVksTUFBMEM7QUFDakYsVUFBTSxlQUFlLGtCQUFrQjtBQUN2QyxVQUFNLHdCQUF3Qix5QkFBeUIsYUFBYSxhQUFhO0FBQ2pGLFdBQU8saUNBQWlDO0FBQUEsTUFDdEMsR0FBRztBQUFBLE1BQ0gsZUFBZTtBQUFBLElBQ2pCLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxnQkFBZ0IsZ0JBQWdCLGtDQUFrQyx3QkFBd0IsQ0FBQztBQUMvRixRQUFNLGdDQUE0Qiw4QkFBZSxvQkFBb0I7QUFHckUsUUFBTSwrQkFBMkIsMkJBQVksWUFBWTtBQUN2RCxRQUFJLENBQUMsY0FBYyxDQUFDLHNCQUFzQixzQkFBc0IsbUJBQW1CLGdCQUFnQixlQUFlO0FBQ2hIO0FBQUEsSUFDRjtBQUVBLHFCQUFpQixJQUFJO0FBQ3JCLHNCQUFrQixFQUFFO0FBQ3BCLHNCQUFrQixJQUFJO0FBRXRCLFFBQUk7QUFDRixZQUFNLGdCQUFnQixxQkFBcUI7QUFDM0MseUJBQW1CLGVBQWUsS0FBSztBQUFBLElBQ3pDLFNBQVMsT0FBTztBQUNkLFlBQU0sVUFBVSxpQkFBaUIsUUFBUSxNQUFNLFVBQVUsS0FBSyxxQkFBcUIseUJBQXlCO0FBQzVHLHdCQUFrQixPQUFPO0FBQUEsSUFDM0IsVUFBRTtBQUNBLHVCQUFpQixLQUFLO0FBQUEsSUFDeEI7QUFBQSxFQUNGLEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBR0QsK0JBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxjQUFjLE1BQU0sU0FBUyxFQUFHO0FBQ3JDLDBCQUFzQixNQUFNLE9BQU8sQ0FBQyxTQUF3QyxLQUFLLFNBQVMsTUFBTSxDQUFDO0FBQUEsRUFDbkcsR0FBRyxDQUFDLHVCQUF1QixZQUFZLEtBQUssQ0FBQztBQUU3QyxRQUFNLHdCQUFvQiwyQkFBWSxZQUFZO0FBQ2hELFFBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxjQUFjO0FBQy9DLGFBQU87QUFBQSxJQUNUO0FBQ0EsUUFBSSxtQkFBbUIsQ0FBQyxvQkFBb0I7QUFDMUMsWUFBTSxpQkFDSiwyQkFDQSxLQUFLLHlDQUF5Qyw2REFBNkQ7QUFDN0csdUJBQWlCLGNBQWM7QUFDL0Isd0JBQWtCLGNBQWM7QUFDaEMsc0JBQWdCLGdCQUFnQixJQUFJO0FBQ3BDLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxnQkFBZ0IscUJBQXFCLEtBQUs7QUFDaEQsUUFBSSxnQkFBZ0IsR0FBRztBQUNyQixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sZ0JBQWdCLHFCQUFxQjtBQUMzQyxVQUFNLGtCQUFrQixTQUFTLGNBQWMsaUJBQWlCLGVBQWU7QUFFL0Usb0JBQWdCLElBQUk7QUFDcEIscUJBQWlCLEVBQUU7QUFDbkIsc0JBQWtCLElBQUk7QUFDdEIsc0JBQWtCLEtBQUssOENBQThDLHlCQUF5QixDQUFDO0FBRS9GLFFBQUk7QUFDRixZQUFNLFdBQVcsTUFBTTtBQUFBLFFBQ3JCLDRCQUNJO0FBQUEsVUFDRSxnQkFBZ0I7QUFBQSxVQUNoQixlQUFlO0FBQUEsVUFDZixTQUFTLGtDQUFrQyxvQkFBb0IsYUFBYTtBQUFBLFVBQzVFO0FBQUEsUUFDRixJQUNBO0FBQUEsVUFDRSxnQkFBZ0I7QUFBQSxVQUNoQixlQUFlO0FBQUEsVUFDZixXQUFXLGdCQUFnQixRQUFRLENBQUMsU0FBUztBQUMzQyxrQkFBTSxTQUFTLFNBQVMsS0FBSyxNQUFNO0FBQ25DLG1CQUFPLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQztBQUFBLFVBQzlCLENBQUM7QUFBQSxRQUNIO0FBQUEsUUFDSjtBQUFBLFVBQ0UseUJBQXlCO0FBQUEsVUFDekIsa0JBQWtCLG1CQUFtQjtBQUFBLFFBQ3ZDO0FBQUEsTUFDRjtBQUNBLFlBQU0sU0FBUyxTQUFTLFFBQVE7QUFDaEMsVUFBSSxDQUFDLFFBQVE7QUFDWCxjQUFNLGlCQUFpQixTQUFTLFdBQVcsS0FBSyxxQkFBcUIsaUJBQWlCO0FBQ3RGLHlCQUFpQixjQUFjO0FBQy9CLDBCQUFrQixjQUFjO0FBQ2hDLHdCQUFnQixnQkFBZ0IsSUFBSTtBQUNwQyxlQUFPO0FBQUEsTUFDVDtBQUVBLHdCQUFrQixNQUFNO0FBRXhCLFVBQUksT0FBTyxjQUFjLEdBQUc7QUFDMUIsNkJBQXFCO0FBQ3JCLHlCQUFpQjtBQUNqQiwwQ0FBa0M7QUFDbEMsd0NBQWdDO0FBQ2hDLGNBQU0sY0FBYyxPQUFPLGNBQWMsS0FBSyxPQUFPLGVBQWUsSUFBSSxtQkFBbUI7QUFDM0Ysd0JBQWdCLGFBQWEsZ0JBQWdCLGNBQWMsT0FBTyxJQUFJO0FBQ3RFLDZCQUFxQiwyQkFBMkIsV0FBVyxHQUFHO0FBQUEsVUFDNUQsaUJBQWlCO0FBQUEsVUFDakIsaUJBQWlCO0FBQUEsUUFDbkIsQ0FBQztBQUNELGVBQU87QUFBQSxNQUNUO0FBRUEsVUFBSSxPQUFPLGNBQWMsS0FBSyxPQUFPLGNBQWMsR0FBRztBQUNwRCxjQUFNLGlCQUFpQixTQUFTLFdBQVcsS0FBSyxxQkFBcUIsaUJBQWlCO0FBQ3RGLDBCQUFrQixjQUFjO0FBQ2hDLHdCQUFnQixnQkFBZ0IsSUFBSTtBQUNwQyxjQUFNLFNBQVMsY0FBYyxJQUFJLElBQUksYUFBYSxhQUFhO0FBQy9ELGVBQU87QUFBQSxNQUNUO0FBRUEsVUFBSSxPQUFPLGNBQWMsS0FBSyxPQUFPLGVBQWUsR0FBRztBQUNyRCwwQkFBa0IsU0FBUyxXQUFXLEtBQUssYUFBYSxJQUFJLENBQUM7QUFDN0Qsd0JBQWdCLGtCQUFrQixJQUFJO0FBQ3RDLGNBQU0sU0FBUyxjQUFjLElBQUksSUFBSSxhQUFhLGFBQWE7QUFDL0QsZUFBTztBQUFBLE1BQ1Q7QUFFQSx3QkFBa0IsU0FBUyxXQUFXLEtBQUssYUFBYSxJQUFJLENBQUM7QUFDN0Qsc0JBQWdCLGFBQWEsSUFBSTtBQUNqQyxZQUFNLFNBQVMsY0FBYyxJQUFJLElBQUksYUFBYSxhQUFhO0FBQy9ELGFBQU87QUFBQSxJQUNULFNBQVMsT0FBTztBQUNkLFlBQU0saUJBQWlCLGlCQUFpQixRQUFRLE1BQU0sVUFBVSxLQUFLLHFCQUFxQixpQkFBaUI7QUFDM0csdUJBQWlCLGNBQWM7QUFDL0Isd0JBQWtCLGNBQWM7QUFDaEMsc0JBQWdCLGdCQUFnQixJQUFJO0FBQ3BDLGFBQU87QUFBQSxJQUNULFVBQUU7QUFDQSxzQkFBZ0IsS0FBSztBQUFBLElBQ3ZCO0FBQUEsRUFDRixHQUFHO0FBQUEsSUFDRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sMkJBQXVCLDJCQUFZLE1BQU07QUFDN0MsUUFBSSxDQUFDLGNBQWMsc0JBQXNCLEtBQUssZ0JBQWdCLHNCQUFzQixpQkFBaUI7QUFDbkc7QUFBQSxJQUNGO0FBRUEscUJBQWlCLEVBQUU7QUFDbkIsc0JBQWtCLEVBQUU7QUFDcEIsZ0JBQVk7QUFBQSxNQUNWLE9BQU8sS0FBSyxzQ0FBc0Msb0JBQW9CO0FBQUEsTUFDdEUsU0FBUyw0QkFDTCxHQUFHLEtBQUssc0JBQXNCLFNBQVMsQ0FBQyxLQUFLLG1CQUFtQixLQUNoRSxHQUFHLEtBQUssc0JBQXNCLFNBQVMsQ0FBQyxLQUFLLG1CQUFtQjtBQUFBLEVBQUssS0FBSyxtQ0FBbUMsc0JBQXNCLENBQUMsS0FBSyx1QkFBdUI7QUFBQSxNQUNwSyxhQUFhLEtBQUssc0NBQXNDLG9CQUFvQjtBQUFBLE1BQzVFLFlBQVksS0FBSyxjQUFjLFFBQVE7QUFBQSxNQUN2QyxXQUFXLFlBQVk7QUFDckIsZUFBTyxrQkFBa0I7QUFBQSxNQUMzQjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsR0FBRztBQUFBLElBQ0Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0seUJBQXFCLDJCQUFZLFlBQVk7QUFDakQscUJBQWlCLEVBQUU7QUFDbkIsVUFBTSxjQUFjO0FBQUEsTUFDbEIsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLFlBQVk7QUFDcEIseUJBQWlCLE9BQU87QUFDeEIsMEJBQWtCLE9BQU87QUFBQSxNQUMzQjtBQUFBLE1BQ0EscUJBQXFCLEtBQUsscUJBQXFCLGlCQUFpQjtBQUFBLElBQ2xFLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxlQUFlLFlBQVksQ0FBQztBQUVoQyxRQUFNLG1CQUFtQixLQUFLLGtCQUFrQixTQUFTO0FBQ3pELFFBQU0sa0JBQWtCLE1BQU0sY0FBYyxLQUFLLGNBQWMsUUFBUTtBQUN2RSxRQUFNLG1CQUFtQixlQUNyQixtQkFDQSxDQUFDLGdCQUFnQixnQkFDZixLQUFLLGFBQWEsSUFBSSxJQUN0QixNQUFNLGVBQWUsS0FBSyxlQUFlLElBQUk7QUFFbkQsUUFBTSwrQkFBMkIsMkJBQVksTUFBTTtBQUNqRCxRQUFJLENBQUMsZ0JBQWdCLGVBQWU7QUFDbEMsbUJBQWE7QUFDYjtBQUFBLElBQ0Y7QUFDQSxTQUFLLG1CQUFtQjtBQUFBLEVBQzFCLEdBQUcsQ0FBQyxjQUFjLG9CQUFvQixjQUFjLGFBQWEsQ0FBQztBQUVsRSxRQUFNLHVCQUFtQjtBQUFBLElBQ3ZCLENBQUMsY0FBc0I7QUFDckIsWUFBTSxTQUFTLFNBQVMsU0FBUztBQUNqQyxVQUFJLENBQUMsT0FBUTtBQUViLFlBQU0sV0FBVyxrQkFBa0I7QUFDbkMsWUFBTSxlQUFlO0FBQUEsUUFDbkIsU0FBUztBQUFBLFFBQ1QsTUFBTSxjQUFjLElBQUksSUFBSTtBQUFBLFFBQzVCLFNBQVMsT0FBTyxXQUFXLGNBQWMsT0FBTyxXQUFXLElBQUk7QUFBQSxRQUMvRCxhQUFhO0FBQUEsUUFDYjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxpQkFBaUIsYUFBYSxjQUFjO0FBQUEsUUFDNUM7QUFBQSxRQUNBO0FBQUEsUUFDQSwwQkFBMEI7QUFBQSxRQUMxQix3QkFBd0I7QUFBQSxNQUMxQjtBQUVBLFVBQUksWUFBWTtBQUNkLHdCQUFnQixZQUFZO0FBQzVCLHlDQUFpQztBQUFBLFVBQy9CLFNBQVM7QUFBQSxVQUNULE1BQU0sYUFBYTtBQUFBLFVBQ25CLFNBQVMsYUFBYTtBQUFBLFVBQ3RCLGFBQWE7QUFBQSxVQUNiLFNBQVM7QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBLDBCQUEwQjtBQUFBLFVBQzFCLHdCQUF3QjtBQUFBLFFBQzFCLENBQUM7QUFDRCxjQUFNLFFBQVEsSUFBSSxnQkFBZ0I7QUFBQSxVQUNoQztBQUFBLFFBQ0YsQ0FBQztBQUNELFlBQUkseUJBQXlCLG1CQUFtQjtBQUM5Qyx5Q0FBK0I7QUFBQSxZQUM3QjtBQUFBLFlBQ0EsU0FBUztBQUFBLFlBQ1QsUUFBUTtBQUFBLFVBQ1YsQ0FBQztBQUNELGdCQUFNLElBQUksVUFBVSxpQkFBaUI7QUFDckMsZ0JBQU0sSUFBSSxXQUFXLFdBQVc7QUFBQSxRQUNsQztBQUNBLDZCQUFxQix3QkFBd0IsTUFBTSxTQUFTLENBQUMsSUFBSTtBQUFBLFVBQy9ELGlCQUFpQjtBQUFBLFVBQ2pCLGlCQUFpQjtBQUFBLFFBQ25CLENBQUM7QUFDRDtBQUFBLE1BQ0Y7QUFFQSxzQkFBZ0IsWUFBWTtBQUM1QixVQUFJLHlCQUF5QixtQkFBbUI7QUFDOUMsdUNBQStCO0FBQUEsVUFDN0I7QUFBQSxVQUNBLFNBQVM7QUFBQSxVQUNULFFBQVE7QUFBQSxRQUNWLENBQUM7QUFDRCxjQUFNLFFBQVEsSUFBSSxnQkFBZ0I7QUFBQSxVQUNoQztBQUFBLFVBQ0EsUUFBUTtBQUFBLFVBQ1IsU0FBUztBQUFBLFFBQ1gsQ0FBQztBQUNELDZCQUFxQix3QkFBd0IsTUFBTSxTQUFTLENBQUMsSUFBSTtBQUFBLFVBQy9ELGlCQUFpQjtBQUFBLFVBQ2pCLGlCQUFpQjtBQUFBLFFBQ25CLENBQUM7QUFDRDtBQUFBLE1BQ0Y7QUFFQSxzQ0FBZ0M7QUFDaEMsMkJBQXFCLCtCQUErQixtQkFBbUIsTUFBTSxDQUFDLElBQUk7QUFBQSxRQUNoRixpQkFBaUI7QUFBQSxRQUNqQixpQkFBaUI7QUFBQSxNQUNuQixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLDJCQUF1QiwyQkFBWSxDQUFDLFdBQStCO0FBQ3ZFLFVBQU0sT0FBTztBQUNiLFFBQUksQ0FBQyxRQUFRLE9BQU8sS0FBSyxZQUFZLFdBQVksUUFBTztBQUN4RCxVQUFNLE9BQU8sS0FBSyxRQUFxQiwyQkFBMkI7QUFDbEUsUUFBSSxDQUFDLEtBQU0sUUFBTztBQUNsQixRQUFJLENBQUMscUJBQXFCLFNBQVMsU0FBUyxJQUFJLEVBQUcsUUFBTztBQUMxRCxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsQ0FBQztBQUVMLHlCQUF1QjtBQUFBLElBQ3JCLGNBQWM7QUFBQSxJQUNkO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLGFBQWEsS0FBSyxNQUFNLFNBQVMsS0FBSyxTQUFTO0FBQ3JELFFBQU0sa0JBQWtCO0FBQ3hCLFFBQU0sbUNBQW1DLGdCQUFnQixpQkFBaUI7QUFFMUUsUUFBTSxtQkFBZSx1QkFBUSxNQUFNO0FBQ2pDLFVBQU0sV0FBVztBQUNqQixRQUFJLENBQUMsU0FBVSxRQUFPLENBQUM7QUFFdkIsVUFBTSxVQUFnRSxDQUFDO0FBQ3ZFLFVBQU0sU0FBUyxVQUFVLGlCQUFpQixRQUFRO0FBQ2xELFVBQU0sZUFBZSx5QkFBeUIsU0FBUyxVQUFVLFFBQVEsRUFBRTtBQUMzRSxVQUFNLGFBQWEseUJBQXlCLFNBQVMsUUFBUSxRQUFRLEVBQUU7QUFFdkUsUUFBSSxnQkFBZ0IsWUFBWTtBQUM5QixjQUFRLEtBQUs7QUFBQSxRQUNYLEtBQUs7QUFBQSxRQUNMLE9BQU8sS0FBSyxnQkFBZ0IsTUFBTTtBQUFBLFFBQ2xDLE9BQU8sZ0JBQWdCO0FBQUEsTUFDekIsQ0FBQztBQUNELGNBQVEsS0FBSztBQUFBLFFBQ1gsS0FBSztBQUFBLFFBQ0wsT0FBTyxLQUFLLGNBQWMsSUFBSTtBQUFBLFFBQzlCLE9BQU8sY0FBYztBQUFBLE1BQ3ZCLENBQUM7QUFBQSxJQUNIO0FBRUEsUUFBSSxTQUFTLFVBQVUsS0FBSyxHQUFHO0FBQzdCLGNBQVEsS0FBSztBQUFBLFFBQ1gsS0FBSztBQUFBLFFBQ0wsT0FBTyxLQUFLLDRCQUE0QixRQUFRO0FBQUEsUUFDaEQsT0FBTyxTQUFTLFVBQVUsS0FBSztBQUFBLE1BQ2pDLENBQUM7QUFBQSxJQUNIO0FBRUEsUUFBSSxTQUFTLGFBQWEsS0FBSyxHQUFHO0FBQ2hDLGNBQVEsS0FBSztBQUFBLFFBQ1gsS0FBSztBQUFBLFFBQ0wsT0FBTyxLQUFLLGlDQUFpQyxVQUFVO0FBQUEsUUFDdkQsT0FBTyxTQUFTLGFBQWEsS0FBSztBQUFBLE1BQ3BDLENBQUM7QUFBQSxJQUNIO0FBRUEsUUFBSSxTQUFTLGlCQUFpQixJQUFJO0FBQ2hDLGNBQVEsS0FBSztBQUFBLFFBQ1gsS0FBSztBQUFBLFFBQ0wsT0FBTyxLQUFLLHlCQUF5QixRQUFRO0FBQUEsUUFDN0MsT0FBTyw0QkFBNEIsU0FBUyxZQUFZO0FBQUEsTUFDMUQsQ0FBQztBQUFBLElBQ0g7QUFFQSxRQUFJLFNBQVMsb0JBQW9CLElBQUk7QUFDbkMsWUFBTSxnQkFBZ0Isa0JBQWtCLElBQUksT0FBTyxTQUFTLGVBQWUsQ0FBQyxLQUFLLE9BQU8sU0FBUyxlQUFlO0FBQ2hILGNBQVEsS0FBSztBQUFBLFFBQ1gsS0FBSztBQUFBLFFBQ0wsT0FBTyxLQUFLLDJCQUEyQixVQUFVO0FBQUEsUUFDakQsT0FBTztBQUFBLE1BQ1QsQ0FBQztBQUFBLElBQ0g7QUFFQSxRQUFJLFNBQVMsd0JBQXdCLE9BQU87QUFDMUMsY0FBUSxLQUFLO0FBQUEsUUFDWCxLQUFLO0FBQUEsUUFDTCxPQUFPLEtBQUssZ0NBQWdDLGlCQUFpQjtBQUFBLFFBQzdELE9BQ0UsU0FBUyx3QkFBd0IsUUFDN0IsS0FBSyxvQ0FBb0MsS0FBSyxJQUM5QyxLQUFLLG1DQUFtQyxJQUFJO0FBQUEsTUFDcEQsQ0FBQztBQUFBLElBQ0g7QUFFQSxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsZ0JBQWdCLGlCQUFpQixDQUFDO0FBRXRDLFFBQU0sY0FBYyxDQUFDLGNBQWMsQ0FBQyxlQUFlLGFBQWEsU0FBUztBQUV6RSwrQkFBVSxNQUFNO0FBQ2QsUUFBSSxDQUFDLFdBQVk7QUFDakIsOEJBQTBCO0FBQUEsTUFDeEIsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLElBQ1gsQ0FBQztBQUNELFdBQU8sTUFBTTtBQUNYLGtDQUE0QjtBQUFBLElBQzlCO0FBQUEsRUFDRixHQUFHLENBQUMsWUFBWSxxQkFBcUIsQ0FBQztBQUV0QywrQkFBVSxNQUFNO0FBQ2QsMEJBQXNCLDRCQUE0QjtBQUFBLE1BQ2hELEtBQUssT0FBTyxXQUFXLGNBQWMsT0FBTyxTQUFTLE9BQU87QUFBQSxNQUM1RCxtQkFBbUIscUJBQXFCO0FBQUEsTUFDeEM7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUNELFFBQUkscUJBQXFCLFNBQVM7QUFDaEMsNEJBQXNCLDBDQUEwQztBQUNoRTtBQUFBLElBQ0Y7QUFDQSxRQUFJLENBQUMsV0FBVztBQUNkLDRCQUFzQixtQ0FBbUM7QUFDekQ7QUFBQSxJQUNGO0FBRUEsUUFBSSxDQUFDLFlBQVk7QUFDZixZQUFNLE1BQU0sSUFBSSxJQUFJLE9BQU8sU0FBUyxJQUFJO0FBQ3hDLFlBQU0sZUFBZSxTQUFTLElBQUksYUFBYSxJQUFJLGNBQWMsQ0FBQztBQUNsRSxVQUFJLGNBQWM7QUFDaEIsOEJBQXNCLG9EQUFvRDtBQUFBLFVBQ3hFO0FBQUEsVUFDQSxZQUFZLElBQUksYUFBYSxJQUFJLFlBQVk7QUFBQSxRQUMvQyxDQUFDO0FBQ0QsNkJBQXFCLFVBQVU7QUFDL0IsaUNBQXlCLGNBQWMsSUFBSSxhQUFhLElBQUksWUFBWSxDQUFDO0FBQ3pFO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxRQUFJLENBQUMsMEJBQTBCO0FBQzdCLDRCQUFzQixpREFBaUQ7QUFDdkU7QUFBQSxJQUNGO0FBQ0EseUJBQXFCLFVBQVU7QUFDL0IsVUFBTSx1QkFBdUIsc0NBQXNDO0FBQ25FLFVBQU0sMkJBQTJCLHlCQUF5QjtBQUFBLE1BQ3hEO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUNELFVBQU0sYUFBYSxrQkFBa0I7QUFDckMsVUFBTSxnQkFBZ0Isa0JBQWtCO0FBRXhDLDBCQUFzQiw0Q0FBNEM7QUFBQSxNQUNoRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFFRCxRQUFJLGVBQWUsbUJBQW1CLGVBQWU7QUFDbkQsNEJBQXNCLDBDQUEwQztBQUNoRSwrQkFBeUI7QUFDekI7QUFBQSxJQUNGO0FBRUEsUUFBSSxZQUFZO0FBQ2QsWUFBTSx3QkFBd0IsaUJBQWlCLHdCQUF3QjtBQUN2RSxZQUFNQyxlQUFjLHdCQUF3QixnQkFBZ0IsSUFBSTtBQUNoRSxZQUFNLGdCQUFnQixTQUFTQSxjQUFhLGVBQWU7QUFDM0QsVUFBSUEsZ0JBQWUsaUJBQWlCLGtCQUFrQixTQUFTLFdBQVcsR0FBRztBQUMzRSw4QkFBc0IsOENBQThDO0FBQUEsVUFDbEU7QUFBQSxVQUNBLE1BQU1BLGFBQVk7QUFBQSxRQUNwQixDQUFDO0FBQ0QsMENBQWtDO0FBQ2xDLG1DQUEyQkEsWUFBVztBQUN0QztBQUFBLE1BQ0Y7QUFFQSxZQUFNLGtCQUFrQix3QkFBd0IsaUNBQWlDLFdBQVcsSUFBSTtBQUNoRyxVQUFJLGlCQUFpQjtBQUNuQiw4QkFBc0IscURBQXFEO0FBQUEsVUFDekUsU0FBUyxnQkFBZ0I7QUFBQSxVQUN6QixNQUFNLGdCQUFnQjtBQUFBLFFBQ3hCLENBQUM7QUFDRCwwQ0FBa0M7QUFDbEMsbUNBQTJCO0FBQUEsVUFDekIsU0FBUyxnQkFBZ0I7QUFBQSxVQUN6QixNQUFNLGdCQUFnQjtBQUFBLFVBQ3RCLFNBQVMsZ0JBQWdCO0FBQUEsVUFDekIsYUFBYSxnQkFBZ0I7QUFBQSxVQUM3QixPQUFPLENBQUM7QUFBQSxVQUNSLGlCQUFpQixnQkFBZ0I7QUFBQSxVQUNqQyxPQUFPO0FBQUEsVUFDUCxpQkFBaUIsZ0JBQWdCO0FBQUEsVUFDakMsZUFBZSxnQkFBZ0I7QUFBQSxVQUMvQixhQUFhLGdCQUFnQjtBQUFBLFVBQzdCLDBCQUEwQixnQkFBZ0I7QUFBQSxVQUMxQyx3QkFBd0IsZ0JBQWdCO0FBQUEsUUFDMUMsQ0FBQztBQUNEO0FBQUEsTUFDRjtBQUVBLDRCQUFzQiw4Q0FBOEM7QUFDcEUsa0NBQTRCO0FBQzVCO0FBQUEsSUFDRjtBQUVBLFFBQUksQ0FBQyxpQkFBaUIsQ0FBQyx3QkFBd0IsQ0FBQywwQkFBMEI7QUFDeEUsNEJBQXNCLG1EQUFtRDtBQUN6RSxrQ0FBNEI7QUFDNUI7QUFBQSxJQUNGO0FBRUEsVUFBTSxjQUFjLGdCQUFnQjtBQUNwQyxRQUFJLENBQUMsYUFBYTtBQUNoQiw0QkFBc0Isb0NBQW9DO0FBQzFELHVCQUFpQjtBQUNqQjtBQUFBLElBQ0Y7QUFFQSwwQkFBc0IsNkNBQTZDO0FBQUEsTUFDakUsTUFBTSxZQUFZO0FBQUEsTUFDbEIsYUFBYSxZQUFZO0FBQUEsSUFDM0IsQ0FBQztBQUNELCtCQUEyQixXQUFXO0FBQUEsRUFDeEMsR0FBRztBQUFBLElBQ0Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCwrQkFBVSxNQUFNO0FBQ2QsUUFBSSxVQUFXO0FBQ2YsUUFBSSx3QkFBd0IsV0FBVyxRQUFRLENBQUMsc0JBQXNCLFFBQVM7QUFFL0UsVUFBTSxpQkFBaUIsd0JBQXdCO0FBQy9DLFVBQU0scUJBQXFCLHNCQUFzQjtBQUNqRCw0QkFBd0IsVUFBVTtBQUNsQywwQkFBc0IsVUFBVTtBQUVoQyxXQUFPLHNCQUFzQixNQUFNO0FBQ2pDLFVBQUksa0JBQWtCLE1BQU07QUFDMUIsZUFBTyxTQUFTO0FBQUEsVUFDZCxLQUFLLEtBQUssSUFBSSxHQUFHLGNBQWM7QUFBQSxVQUMvQixVQUFVO0FBQUEsUUFDWixDQUFDO0FBQUEsTUFDSDtBQUVBLFVBQUksQ0FBQyxzQkFBc0IsQ0FBQyxxQkFBcUIsUUFBUztBQUUxRCxZQUFNLG9CQUFvQixtQkFBbUIsWUFBWTtBQUN6RCxZQUFNLGdCQUFnQixNQUFNO0FBQUEsUUFDMUIscUJBQXFCLFFBQVEsaUJBQThCLHFDQUFxQztBQUFBLE1BQ2xHO0FBQ0EsWUFBTSxlQUFlLGNBQWMsS0FBSyxDQUFDLFNBQVM7QUFDaEQsZUFBTyxTQUFTLEtBQUssUUFBUSxZQUFZLEVBQUUsWUFBWSxNQUFNO0FBQUEsTUFDL0QsQ0FBQztBQUNELFlBQU0sYUFBYSxjQUFjLGNBQTJCLDJCQUEyQjtBQUN2RixVQUFJLENBQUMsV0FBWTtBQUVqQixpQkFBVyxNQUFNLEVBQUUsZUFBZSxLQUFLLENBQUM7QUFBQSxJQUMxQyxDQUFDO0FBQUEsRUFDSCxHQUFHLENBQUMsV0FBVyxNQUFNLE1BQU0sQ0FBQztBQUU1QiwrQkFBVSxNQUFNO0FBQ2QsUUFBSSxDQUFDLDRCQUE0QixDQUFDLFVBQVc7QUFFN0MsVUFBTSxpQkFBaUIsQ0FBQyxVQUErQjtBQUNyRCxVQUFJLENBQUMsTUFBTSxhQUFhLENBQUMsc0NBQXNDLEVBQUc7QUFFbEUsWUFBTSxXQUFXLDBCQUEwQjtBQUMzQyxVQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsWUFBWSxDQUFDLFNBQVMsU0FBUztBQUMzRDtBQUFBLE1BQ0Y7QUFFQSwyQkFBcUIsY0FBYyxJQUFJLElBQUksYUFBYSxVQUFVO0FBQUEsUUFDaEUsWUFBWTtBQUFBLE1BQ2QsQ0FBQztBQUFBLElBQ0g7QUFFQSxXQUFPLGlCQUFpQixZQUFZLGNBQWM7QUFDbEQsV0FBTyxNQUFNO0FBQ1gsYUFBTyxvQkFBb0IsWUFBWSxjQUFjO0FBQUEsSUFDdkQ7QUFBQSxFQUNGLEdBQUcsQ0FBQyxhQUFhLFdBQVcsWUFBWSwwQkFBMEIsb0JBQW9CLENBQUM7QUFFdkYsK0JBQVUsTUFBTTtBQUNkLFVBQU0sa0JBQWtCLE1BQU07QUFDNUIsWUFBTSxXQUFXLENBQUM7QUFDbEIsd0JBQWtCO0FBQ2xCLFVBQUksVUFBVTtBQUNaLGVBQU8sU0FBUyxFQUFFLEtBQUssR0FBRyxVQUFVLFNBQVMsQ0FBQztBQUFBLE1BQ2hEO0FBQUEsSUFDRjtBQUVBLFVBQU0sWUFBWSxNQUFNO0FBQ3RCLFlBQU0sV0FBVywwQkFBMEI7QUFDM0MsVUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLFlBQVksQ0FBQyxVQUFVLFNBQVM7QUFDN0Q7QUFBQSxNQUNGO0FBQ0EsV0FBSyxTQUFTLGNBQWMsSUFBSSxJQUFJLGFBQWEsUUFBUTtBQUFBLElBQzNEO0FBRUEsV0FBTyxpQkFBaUIsaUNBQWlDLGVBQWU7QUFDeEUsV0FBTyxpQkFBaUIsMkJBQTJCLFNBQVM7QUFFNUQsV0FBTyxNQUFNO0FBQ1gsYUFBTyxvQkFBb0IsaUNBQWlDLGVBQWU7QUFDM0UsYUFBTyxvQkFBb0IsMkJBQTJCLFNBQVM7QUFBQSxJQUNqRTtBQUFBLEVBQ0YsR0FBRyxDQUFDLGFBQWEsWUFBWSxVQUFVLGFBQWEsaUJBQWlCLENBQUM7QUFFdEUsU0FDRSw4Q0FBQyxTQUFJLFdBQVUsYUFDYjtBQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxNQUFNLE1BQU07QUFBQSxRQUNaLE9BQU8sTUFBTTtBQUFBLFFBQ2IsU0FBUyxNQUFNO0FBQUEsUUFDZixhQUFhO0FBQUEsUUFDYixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixZQUFZLE1BQU07QUFBQSxRQUNsQixhQUFhLE1BQU07QUFBQSxRQUNuQixNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixXQUFXO0FBQUEsUUFDWCxVQUFVO0FBQUE7QUFBQSxJQUNaO0FBQUEsSUFFQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsS0FBSztBQUFBLFFBQ0wsTUFBSztBQUFBLFFBQ0wsUUFBUTtBQUFBLFFBQ1IsU0FBUTtBQUFBLFFBQ1IsV0FBVTtBQUFBLFFBQ1YsVUFBVSxDQUFDLFVBQVU7QUFDbkIsZ0JBQU0sT0FBTyxNQUFNLGNBQWMsUUFBUSxDQUFDLEtBQUs7QUFDL0MsZ0JBQU0sY0FBYyxRQUFRO0FBQzVCLGVBQUssbUJBQW1CLE1BQU0sUUFBUTtBQUFBLFFBQ3hDO0FBQUE7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsS0FBSztBQUFBLFFBQ0wsTUFBSztBQUFBLFFBQ0wsUUFBUTtBQUFBLFFBQ1IsV0FBVTtBQUFBLFFBQ1YsVUFBVSxDQUFDLFVBQVU7QUFDbkIsZ0JBQU0sT0FBTyxNQUFNLGNBQWMsUUFBUSxDQUFDLEtBQUs7QUFDL0MsZ0JBQU0sY0FBYyxRQUFRO0FBQzVCLGVBQUssbUJBQW1CLE1BQU0sU0FBUztBQUFBLFFBQ3pDO0FBQUE7QUFBQSxJQUNGO0FBQUEsSUFFQyxDQUFDLGNBQWMsbUJBQ2QsNkNBQUMsU0FBSSxXQUFVLHFGQUNiLHdEQUFDLFNBQUksV0FBVSw2RkFDYjtBQUFBLG1EQUFDLFFBQUcsV0FBVSw0Q0FDWCxlQUFLLHdDQUF3QyxjQUFjLEdBQzlEO0FBQUEsTUFDQSw2Q0FBQyxPQUFFLFdBQVUsK0JBQ1Y7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLE1BQ0YsR0FDRjtBQUFBLE1BRUEsOENBQUMsU0FBSSxXQUFVLCtCQUNiO0FBQUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLE1BQUs7QUFBQSxZQUNMLFdBQVU7QUFBQSxZQUNWLFNBQVMsTUFBTTtBQUNiLG1CQUFLLGlCQUFpQixlQUFlLE9BQU87QUFBQSxZQUM5QztBQUFBLFlBRUMsZUFBSyx5Q0FBeUMsZ0JBQWE7QUFBQTtBQUFBLFFBQzlEO0FBQUEsUUFDQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsV0FBVTtBQUFBLFlBQ1YsU0FBUyxNQUFNLGtCQUFrQixnQkFBZ0IsT0FBTztBQUFBLFlBRXZELGVBQUssMENBQTBDLGVBQWU7QUFBQTtBQUFBLFFBQ2pFO0FBQUEsUUFDQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsV0FBVTtBQUFBLFlBQ1YsU0FBUztBQUFBLFlBRVIsZUFBSyxpQkFBaUIsUUFBUTtBQUFBO0FBQUEsUUFDakM7QUFBQSxTQUNGO0FBQUEsT0FDRixHQUNGLElBQ0U7QUFBQSxJQUVILENBQUMsYUFDQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsTUFBTTtBQUFBLFFBQ04sT0FBTyxLQUFLLDBDQUEwQyxtQkFBbUI7QUFBQSxRQUN6RSxTQUFTLDhCQUE4QixLQUFLLGtCQUFrQixTQUFTO0FBQUEsUUFDdkUsV0FBVztBQUFBLFFBQ1gsUUFBUTtBQUFBO0FBQUEsSUFDVixJQUNFO0FBQUEsSUFFSCxDQUFDLGNBQWMsMEJBQ2Q7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQ0UsMEJBQ0ksZ0lBQ0E7QUFBQSxRQUdOO0FBQUEsdURBQUMsT0FBRyxtQ0FBd0I7QUFBQSxVQUMzQix1QkFDQztBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsV0FDRSwwQkFDSSx5SEFDQTtBQUFBLGNBR0wsd0JBQWMsb0JBQW9CO0FBQUE7QUFBQSxVQUNyQyxJQUNFO0FBQUEsVUFDSCxxQkFBcUIsU0FBUyxJQUM3QjtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsV0FDRSwwQkFDSSwyRkFDQTtBQUFBLGNBR0wsK0JBQXFCLElBQUksQ0FBQyxVQUN6Qiw2Q0FBQyxPQUFxQyxhQUFHLE1BQU0sSUFBSSxLQUFLLE1BQU0sT0FBTyxNQUE3RCxHQUFHLE1BQU0sSUFBSSxJQUFJLE1BQU0sRUFBRSxFQUF1QyxDQUN6RTtBQUFBO0FBQUEsVUFDSCxJQUNFO0FBQUEsVUFDSiw4Q0FBQyxTQUFJLFdBQVUsd0JBQ1o7QUFBQSxvQ0FDQztBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUNDLE1BQUs7QUFBQSxnQkFDTCxXQUFVO0FBQUEsZ0JBQ1YsU0FBUyxNQUFNO0FBQ2IsdUJBQUssbUJBQW1CO0FBQUEsZ0JBQzFCO0FBQUEsZ0JBRUMsZUFBSyx1Q0FBdUMsbUJBQW1CO0FBQUE7QUFBQSxZQUNsRSxJQUNFO0FBQUEsWUFDSiw2Q0FBQyxZQUFPLE1BQUssVUFBUyxXQUFVLHNDQUFxQyxTQUFTLHVCQUMzRSxlQUFLLGdCQUFnQixPQUFPLEdBQy9CO0FBQUEsYUFDRjtBQUFBO0FBQUE7QUFBQSxJQUNGLElBQ0U7QUFBQSxJQUVILGNBQ0MsNkNBQUMsU0FBSSxXQUFVLHlEQUNiLHVEQUFDLFNBQUksV0FBVSxxR0FDWix1QkFBYSxJQUFJLENBQUMsU0FDakI7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUVDLFdBQVU7QUFBQSxRQUVWO0FBQUEsd0RBQUMsVUFBSyxXQUFVLCtDQUErQztBQUFBLGlCQUFLO0FBQUEsWUFBTTtBQUFBLGFBQUM7QUFBQSxVQUMzRSw2Q0FBQyxVQUFLLFdBQVUsNkNBQTZDLGVBQUssT0FBTTtBQUFBO0FBQUE7QUFBQSxNQUpuRSxLQUFLO0FBQUEsSUFLWixDQUNELEdBQ0gsR0FDRixJQUNFO0FBQUEsSUFFSjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsTUFBTSxhQUFhLFNBQVM7QUFBQSxRQUM1QixTQUFTO0FBQUEsUUFDVDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0Esc0JBQXNCO0FBQUEsUUFDdEI7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxtQkFBbUI7QUFBQSxRQUNuQixzQkFBc0I7QUFBQSxRQUN0Qix1QkFBdUI7QUFBQSxRQUN2QixzQkFBc0I7QUFBQSxRQUN0Qix5QkFBeUI7QUFBQSxRQUN6Qiw2QkFBNkI7QUFBQSxRQUM3QjtBQUFBLFFBQ0E7QUFBQTtBQUFBLElBQ0Y7QUFBQSxJQUVDLGFBQ0MsOENBQUMsU0FBSSxXQUFVLG9CQUNaO0FBQUEsT0FBQyxxQkFDQSw2Q0FBQyxTQUFJLFdBQVUseUJBQXlCLGVBQUssOEJBQThCLGdCQUFnQixHQUFFLElBQzNGO0FBQUEsTUFFSCxzQkFBc0IscUJBQ3JCLDhDQUFDLFNBQUksV0FBVSxrREFDYjtBQUFBLHFEQUFDLG1CQUFRLE1BQUssV0FBVSxPQUFPLEtBQUssa0JBQWtCLFNBQVMsR0FBRztBQUFBLFFBQ2xFLDZDQUFDLFVBQU0sZUFBSyxrQkFBa0IsU0FBUyxHQUFFO0FBQUEsU0FDM0MsSUFDRTtBQUFBLE1BRUgsc0JBQXNCLENBQUMsc0JBQXNCLGdCQUM1Qyw4Q0FBQyxTQUFJLFdBQVUsa0RBQ2I7QUFBQSxxREFBQyxtQkFBUSxNQUFLLFdBQVUsT0FBTyxLQUFLLGtCQUFrQixTQUFTLEdBQUc7QUFBQSxRQUNsRSw2Q0FBQyxVQUFNLGVBQUssa0JBQWtCLFNBQVMsR0FBRTtBQUFBLFNBQzNDLElBQ0U7QUFBQSxNQUVILHNCQUFzQixDQUFDLHNCQUFzQixrQkFDNUMsNkNBQUMsU0FBSSxXQUFVLHlCQUNaLHFDQUNDLEtBQUsseUNBQXlDLDZEQUE2RCxHQUMvRyxJQUNFO0FBQUEsTUFFSCxzQkFBc0IsQ0FBQyxzQkFBc0IsQ0FBQyxtQkFBbUIsaUJBQ2hFLDZDQUFDLFNBQUksV0FBVSx5QkFBeUIsMEJBQWUsSUFDckQ7QUFBQSxNQUVILHNCQUFzQixDQUFDLHNCQUFzQixDQUFDLGtCQUM3Qyw2RUFDRSx3REFBQyxTQUFJLFdBQVUsZ0RBQ2I7QUFBQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsV0FBVTtBQUFBLFlBQ1YsU0FBUyxNQUFNO0FBQ2IsbUJBQUsseUJBQXlCO0FBQUEsWUFDaEM7QUFBQSxZQUNBLFVBQVUsb0NBQW9DLFFBQVE7QUFBQSxZQUVyRCxlQUFLLHFDQUFxQyxrQkFBa0I7QUFBQTtBQUFBLFFBQy9EO0FBQUEsUUFDQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsV0FBVTtBQUFBLFlBQ1YsU0FBUztBQUFBLFlBQ1QsVUFBVSxvQ0FBb0Msc0JBQXNCO0FBQUEsWUFFbkUsZUFBSyxvQ0FBb0MscUJBQWtCO0FBQUE7QUFBQSxRQUM5RDtBQUFBLFNBQ0YsR0FDRixJQUNFO0FBQUEsT0FDTixJQUNFO0FBQUEsSUFFSCxhQUFhLDZDQUFDLHdDQUE2QixRQUFRLGdCQUFnQixJQUFLO0FBQUEsSUFFekU7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVU7QUFBQSxRQUNWLE9BQU8sRUFBRSxTQUFTLGtCQUFrQixTQUFTLE9BQU87QUFBQSxRQUVwRDtBQUFBLHVEQUFDLFNBQUksV0FBVSxzQkFBcUIsU0FBUSxhQUFZLE1BQUssVUFBUyxjQUFZLEtBQUssa0JBQWtCLFNBQVMsR0FDaEgsdURBQUMsWUFBTyxXQUFVLHVCQUFzQixJQUFHLE1BQUssSUFBRyxNQUFLLEdBQUUsS0FBSSxhQUFZLEtBQUksR0FDaEY7QUFBQSxVQUNDLEtBQUssa0JBQWtCLFNBQVM7QUFBQTtBQUFBO0FBQUEsSUFDbkM7QUFBQSxJQUVDLGVBQWUsNkNBQUMsU0FBSSxXQUFVLGVBQWUsd0JBQWEsSUFBUztBQUFBLElBRW5FLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLE1BQU0sV0FBVyxJQUNyRCw2Q0FBQyxTQUFJLFdBQVUsK0JBQThCLG1CQUFpQixLQUFLLGlCQUFpQixTQUFTLEdBQUcsSUFDOUY7QUFBQSxJQUVILENBQUMsZ0JBQWdCLE1BQU0sU0FBUyxJQUMvQiw2Q0FBQyxTQUFJLEtBQUssc0JBQXNCLFdBQVUsZ0JBQ3ZDLGdCQUFNLElBQUksQ0FBQyxTQUFTO0FBQ25CLFlBQU0sU0FBUyxTQUFTLEtBQUssTUFBTTtBQUNuQyxZQUFNLFlBQVksdUJBQXVCLEtBQUssV0FBVyxVQUFVLGlCQUFpQixRQUFRLE9BQU87QUFDbkcsWUFBTSxRQUFRLFNBQVMsS0FBSyxXQUFXLEtBQUssU0FBUyxLQUFLLFFBQVEsS0FBSyxVQUFVO0FBQ2pGLFlBQU0sYUFBYSx5QkFBeUIsS0FBSyxlQUFlLE1BQU0seUJBQXlCO0FBQy9GLFlBQU0sYUFBYSxLQUFLLFNBQVMsWUFBWSxLQUFLLFNBQVM7QUFDM0QsWUFBTSxjQUFjLGVBQWUsT0FBTyxTQUFZLDRCQUE0QixVQUFVO0FBQzVGLFlBQU0sMkJBQTJCLGVBQWU7QUFDaEQsWUFBTSx3QkFBd0IsS0FBSyxrQkFBa0I7QUFDckQsWUFBTSx5QkFBeUIsY0FBYyx1QkFBdUIsSUFBSTtBQUN4RSxZQUFNLHVCQUF1QixjQUFjLHFCQUFxQixNQUFNO0FBQ3RFLFlBQU0scUJBQXFCLEtBQUssZ0NBQWdDLGlCQUFpQjtBQUNqRixZQUFNLG9CQUFvQixLQUFLLHdDQUF3QyxvQkFBb0I7QUFDM0YsWUFBTSxnQkFBZ0IsS0FBSyxjQUFjLE9BQU8sS0FBSyxPQUFPLEtBQUssU0FBUztBQUMxRSxZQUFNLGlCQUFpQixnQkFDbkIsa0JBQWtCLElBQUksYUFBYSxLQUFLLGdCQUN4QyxLQUFLLHVCQUF1QixLQUFLO0FBQ3JDLFlBQU0sZUFBZTtBQUNyQixZQUFNLGdCQUNKLFVBQ0EsR0FBRyxTQUFTLEtBQUssUUFBUSxDQUFDLElBQUksU0FBUyxLQUFLLFNBQVMsQ0FBQyxJQUFJLFNBQVMsS0FBSyxXQUFXLENBQUMsSUFBSSxPQUFPLEtBQUssZUFBZSxFQUFFLENBQUM7QUFFeEgsVUFBSSxjQUFjLEtBQUssU0FBUyxRQUFRO0FBQ3RDLGVBQ0U7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUVDO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBLFVBQVU7QUFBQSxZQUNWO0FBQUEsWUFDQSxZQUFZO0FBQUEsWUFDWixjQUFjO0FBQUEsWUFDZCxtQkFBbUIsZ0JBQWdCLHNCQUFzQjtBQUFBLFlBQ3pELGFBQWE7QUFBQSxZQUNiLGNBQWMsTUFBTSxpQkFBaUIsTUFBTTtBQUFBLFlBQzNDLGdCQUFnQixNQUFNLHNCQUFzQixJQUFJO0FBQUE7QUFBQSxVQVgzQztBQUFBLFFBWVA7QUFBQSxNQUVKO0FBRUEsWUFBTSxrQkFBa0IsNEJBQTRCLHdCQUNsRCw4RUFDRztBQUFBLG1DQUNDLDZDQUFDLFVBQUssV0FBVSxvQ0FBbUMsTUFBSyxPQUFNLGNBQVksYUFDeEUsdURBQUMsU0FBSSxPQUFNLDhCQUE2QixNQUFLLFFBQU8sU0FBUSxhQUFZLGFBQWEsS0FBSyxRQUFPLGdCQUFlLFdBQVUsVUFDeEg7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLGVBQWM7QUFBQSxZQUNkLGdCQUFlO0FBQUEsWUFDZixHQUFFO0FBQUE7QUFBQSxRQUNKLEdBQ0YsR0FDRixJQUNFO0FBQUEsUUFDSCx3QkFDQztBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsV0FBVTtBQUFBLFlBQ1YsTUFBSztBQUFBLFlBQ0wsY0FBWTtBQUFBLFlBRVosd0RBQUMsU0FBSSxPQUFNLDhCQUE2QixNQUFLLFFBQU8sU0FBUSxhQUFZLGFBQWEsS0FBSyxRQUFPLGdCQUFlLFdBQVUsVUFDeEg7QUFBQSwyREFBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsbUJBQWtCO0FBQUEsY0FDdkUsNkNBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLFdBQVU7QUFBQSxjQUMvRCw2Q0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsV0FBVTtBQUFBLGNBQy9ELDZDQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSxZQUFXO0FBQUEsY0FDaEUsNkNBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLFlBQVc7QUFBQSxlQUNsRTtBQUFBO0FBQUEsUUFDRixJQUNFO0FBQUEsU0FDTixJQUNFO0FBRUosYUFDRTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBRUMsV0FBVTtBQUFBLFVBQ1YsdUJBQXFCLFVBQVU7QUFBQSxVQUUvQjtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0M7QUFBQSxjQUNBO0FBQUEsY0FDQSxVQUFVO0FBQUEsY0FDVjtBQUFBLGNBQ0EsUUFBUSxNQUFNLGlCQUFpQixNQUFNO0FBQUEsY0FDckMsZ0JBQWU7QUFBQSxjQUNmO0FBQUEsY0FDQSxZQUFZO0FBQUEsY0FDWixxQkFBb0I7QUFBQTtBQUFBLFVBQ3RCO0FBQUE7QUFBQSxRQWRLO0FBQUEsTUFlUDtBQUFBLElBRUosQ0FBQyxHQUNILElBQ0U7QUFBQSxJQUVKO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBLFNBQVM7QUFBQSxRQUNULGNBQWMsQ0FBQyxTQUFTO0FBQ3RCLGdCQUFNLFdBQVcscUJBQXFCO0FBQ3RDLGNBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxZQUFZLENBQUMsVUFBVSxTQUFTO0FBQzdEO0FBQUEsVUFDRjtBQUVBLGVBQUssU0FBUyxNQUFNLFFBQVE7QUFBQSxRQUM5QjtBQUFBLFFBQ0EsUUFBUTtBQUFBO0FBQUEsSUFDVjtBQUFBLElBRUMsY0FBYyxzQkFBc0IsQ0FBQyxzQkFBc0IsQ0FBQyxrQkFDM0QsNkNBQUMsNkJBQWtCLFdBQVcsS0FBSyxzQ0FBc0Msb0JBQW9CLEdBQzNGO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFPLEtBQUssc0NBQXNDLG9CQUFvQjtBQUFBLFFBQ3RFLFNBQVM7QUFBQSxRQUNULFVBQVUsZ0JBQWdCLGlCQUFpQixzQkFBc0I7QUFBQTtBQUFBLElBQ25FLEdBQ0YsSUFDRTtBQUFBLElBRUgsbUJBQW1CLENBQUMsYUFDbkI7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVcsS0FBSyw2QkFBNkIscUJBQWtCO0FBQUEsUUFDL0QsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsZUFBZSxLQUFLLDZCQUE2QixxQkFBa0I7QUFBQSxRQUNuRSxXQUFXO0FBQUE7QUFBQSxJQUNiLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLHFCQUFxQixNQUFNO0FBQy9CLFNBQ0UsNkNBQUMsZ0NBQXFCLHlCQUF1QixNQUMzQyx1REFBQyw2QkFBMEIsR0FDN0I7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLHNCQUFzQjtBQUM3RCxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLHNCQUFtQixDQUFFO0FBQ2pEO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyw2QkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJub3JtYWxpemVGaWxlSWQiLCAibm9ybWFsaXplU2VsZWN0aW9uTW9kZSIsICJub3JtYWxpemVFeGNsdWRlZElkcyIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0IiwgImlzTGlua01vZGUiLCAiZnJvbURhdGUiLCAiY2FjaGVkU3RhdGUiXQp9Cg==
