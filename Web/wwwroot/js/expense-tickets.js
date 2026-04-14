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
} from "./chunks/chunk-DC3DZGKB.js";
import {
  CheckIcon_default
} from "./chunks/chunk-WYCUWPMC.js";
import {
  HistorySummary_default
} from "./chunks/chunk-XY7C6JC3.js";
import {
  getExpenseTicketStatusFilterOptions,
  getExpenseTicketStatusLabel,
  normalizeExpenseTicketFilterSnapshot,
  normalizeExpenseTicketStatusFilterCode,
  useExpenseTicketsFilterCache
} from "./chunks/chunk-HD7PRUDB.js";
import {
  mapWindowEnumOptions
} from "./chunks/chunk-YM2TI2W6.js";
import {
  ExpenseQuickTicketProgressOverlay_default,
  PageBottomActionButton,
  PageBottomActions_default,
  TICKET_IMAGE_ACCEPT_ATTRIBUTE,
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-VADOTFDH.js";
import {
  resolveExpenseSheetDetailPolicy
} from "./chunks/chunk-JXC4T3HC.js";
import "./chunks/chunk-6IISIQEI.js";
import {
  RemoteSearchCombobox_default
} from "./chunks/chunk-DYOWCOBG.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-LZSH3IN4.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-NJCZVPWB.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-S6U6GZC2.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-C2QA25S4.js";
import "./chunks/chunk-OSBLOXTE.js";
import {
  buildExpenseSheetDetailUrl,
  clearExpenseTicketReturnContext,
  isManagingOtherExpenseRecord,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-6VGTOKC7.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-ZHUOZUVW.js";
import {
  flashActionMark
} from "./chunks/chunk-CBDB7NMA.js";
import {
  clearExpenseNavigationGuard,
  formatAmountWithCurrency,
  navigateToExpenseUrl,
  setExpenseNavigationGuard
} from "./chunks/chunk-S4F4JMPK.js";
import {
  configureExpenseApiAuth,
  fetchExpenseSheetDetail,
  fetchExpenseSheetTicketLinkList,
  fetchExpenseSheetTicketsList,
  formatExpenseDateParts,
  formatExpenseDisplayDate,
  hasAssignedVoucher,
  linkExpenseSheetTicketsBulk,
  mapExpenseSheetHeader,
  safeText,
  startOfDay,
  toIsoDate
} from "./chunks/chunk-IUMLRTMN.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-5DDPA4B2.js";
import {
  clearExpenseActingUserOverride,
  getExpenseScopeToken,
  setExpenseActingUserOverride,
  toExpenseIsoDate
} from "./chunks/chunk-7CXSZQJB.js";
import {
  setTopbarActionGroupReady
} from "./chunks/chunk-ZBKHPZJX.js";
import {
  Spinner_default,
  canAccess,
  showPermissionModal
} from "./chunks/chunk-ZHH4AWW7.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-2NKOKBT5.js";
import {
  ApiFetchError,
  indT
} from "./chunks/chunk-5TAE4PEJ.js";
import {
  getSessionJsonWithExpiry,
  removeSessionValueWithExpiry,
  setSessionJsonWithExpiry
} from "./chunks/chunk-6HGCHSZG.js";
import {
  __toESM
} from "./chunks/chunk-W7NC74ZX.js";

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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL0V4cGVuc2VUaWNrZXRzUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL3VzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZUxheW91dEVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCBDb21wYWN0UGFnaW5hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24sIHsgdHlwZSBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IFBhZ2VCb3R0b21BY3Rpb25zLCB7IFBhZ2VCb3R0b21BY3Rpb25CdXR0b24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1BhZ2VCb3R0b21BY3Rpb25zLnRzeFwiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4XCI7XHJcbmltcG9ydCB7IHVzZUF1dGhDb250ZXh0LCB0eXBlIEF1dGhNYW5hZ2VkVXNlciB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcclxuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xyXG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlVGltZWxpbmVDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbS50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRMaW5rQnVsa1N1bW1hcnkgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeS50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5IGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheS50c3hcIjtcclxuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcclxuaW1wb3J0IHtcclxuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCxcclxuICBsaW5rRXhwZW5zZVNoZWV0VGlja2V0c0J1bGssXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlLCBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBY3RpbmdVc2VyLnRzXCI7XHJcbmltcG9ydCB7IHRvRXhwZW5zZUlzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsIG5hdmlnYXRlVG9FeHBlbnNlVXJsLCBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IG1hcFdpbmRvd0VudW1PcHRpb25zLCB0eXBlIEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcclxuaW1wb3J0IHtcclxuICBidWlsZEV4cGVuc2VTaGVldERldGFpbFVybCxcclxuICBjbGVhckV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgaGFzRXhwZW5zZVJldHVyblJlZmVycmVyLCBpc0V4cGVuc2VIaXN0b3J5QmFja0ZvcndhcmROYXZpZ2F0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VIaXN0b3J5TmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzLCBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIHNhZmVUZXh0LCBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93IH0gZnJvbSBcIi4uL2RldGFpbC91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cudHNcIjtcclxuaW1wb3J0IHsgVElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEUgfSBmcm9tIFwiLi4vZGV0YWlsL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvd0NvcmUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0xpc3REYXRhIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlLCB0eXBlIEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG4gIHJlYWRFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG4gIHNhdmVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgYnVpbGRFeHBlbnNlVGlja2V0TGlua0J1bGtGaWx0ZXJzIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VQYXlsb2FkQnVpbGRlcnMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0byB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXHJcbiAgRXhwZW5zZVRpY2tldExpbmtDYXJkLFxyXG4gIEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW0sXHJcbn0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbiB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWQudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldExpbmtTaGVldEdhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZS50c1wiO1xyXG5pbXBvcnQgeyBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5IGFzIHJldmVhbFRvcGJhckFjdGlvbkdyb3VwIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RvcGJhckFjdGlvblZpc2liaWxpdHkudHNcIjtcclxuXHJcbmNvbnN0IFBBR0VfU0laRSA9IDEwO1xyXG5jb25zdCBBTExPV0VEX0dBU1RPX1RZUEVTID0gbmV3IFNldDxudW1iZXI+KFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0pO1xyXG5cclxuY29uc3QgR0FTVE9fVFlQRV9MQUJFTF9LRVlTOiBSZWNvcmQ8bnVtYmVyLCB7IGtleTogc3RyaW5nOyBmYWxsYmFjazogc3RyaW5nIH0+ID0ge1xyXG4gIDA6IHsga2V5OiBcIkVudW1fTm9uZVwiLCBmYWxsYmFjazogXCJOb25lXCIgfSxcclxuICAxOiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9QZWFqZVwiLCBmYWxsYmFjazogXCJQZWFqZVwiIH0sXHJcbiAgMjogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfUGFya2luZ1wiLCBmYWxsYmFjazogXCJQYXJraW5nXCIgfSxcclxuICAzOiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9LbVwiLCBmYWxsYmFjazogXCJLbVwiIH0sXHJcbiAgNDogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfRGVzYXl1bm9cIiwgZmFsbGJhY2s6IFwiRGVzYXl1bm9cIiB9LFxyXG4gIDU6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0NvbWlkYVwiLCBmYWxsYmFjazogXCJDb21pZGFcIiB9LFxyXG4gIDY6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0NlbmFcIiwgZmFsbGJhY2s6IFwiQ2VuYVwiIH0sXHJcbiAgNzogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfSG90ZWxcIiwgZmFsbGJhY2s6IFwiSG90ZWxcIiB9LFxyXG4gIDg6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1Zhcmlvc1wiLCBmYWxsYmFjazogXCJWYXJpb3NcIiB9LFxyXG4gIDE0OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9UYXhpXCIsIGZhbGxiYWNrOiBcIlRheGlcIiB9LFxyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVXNlcklkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XHJcblxyXG5jb25zdCBpc1NhbWVVc2VyID0gKGxlZnQ6IHN0cmluZywgcmlnaHQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRMZWZ0ID0gbm9ybWFsaXplVXNlcklkKGxlZnQpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFJpZ2h0ID0gbm9ybWFsaXplVXNlcklkKHJpZ2h0KS50b1VwcGVyQ2FzZSgpO1xyXG4gIHJldHVybiAhIW5vcm1hbGl6ZWRMZWZ0ICYmIG5vcm1hbGl6ZWRMZWZ0ID09PSBub3JtYWxpemVkUmlnaHQ7XHJcbn07XHJcblxyXG5jb25zdCBlbnN1cmVDdXJyZW50VXNlckluTGlzdCA9ICh1c2VyczogQXV0aE1hbmFnZWRVc2VyW10sIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nKTogQXV0aE1hbmFnZWRVc2VyW10gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50ID0gbm9ybWFsaXplVXNlcklkKGN1cnJlbnRBeFVzZXJJZCk7XHJcbiAgaWYgKCFub3JtYWxpemVkQ3VycmVudCkgcmV0dXJuIHVzZXJzO1xyXG4gIGlmICh1c2Vycy5zb21lKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZEN1cnJlbnQpKSkgcmV0dXJuIHVzZXJzO1xyXG4gIHJldHVybiBbXHJcbiAgICB7XHJcbiAgICAgIGNybVVzZXJJZDogbm9ybWFsaXplZEN1cnJlbnQsXHJcbiAgICAgIGF4VXNlcklkOiBub3JtYWxpemVkQ3VycmVudCxcclxuICAgICAgbmFtZTogbm9ybWFsaXplZEN1cnJlbnQsXHJcbiAgICB9LFxyXG4gICAgLi4udXNlcnMsXHJcbiAgXTtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbiA9IChyZXF1ZXN0ZWRVc2VySWQ6IHN0cmluZywgY3VycmVudEF4VXNlcklkOiBzdHJpbmcsIHVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFJlcXVlc3RlZCA9IG5vcm1hbGl6ZVVzZXJJZChyZXF1ZXN0ZWRVc2VySWQpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50ID0gbm9ybWFsaXplVXNlcklkKGN1cnJlbnRBeFVzZXJJZCk7XHJcbiAgaWYgKG5vcm1hbGl6ZWRSZXF1ZXN0ZWQpIHtcclxuICAgIGNvbnN0IGZvdW5kID0gdXNlcnMuZmluZCgoZW50cnkpID0+IGlzU2FtZVVzZXIoZW50cnkuYXhVc2VySWQsIG5vcm1hbGl6ZWRSZXF1ZXN0ZWQpKTtcclxuICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kLmF4VXNlcklkO1xyXG4gIH1cclxuICBpZiAobm9ybWFsaXplZEN1cnJlbnQpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZEN1cnJlbnQpKTtcclxuICAgIHJldHVybiBzZWxmPy5heFVzZXJJZCB8fCBub3JtYWxpemVkQ3VycmVudDtcclxuICB9XHJcbiAgcmV0dXJuIFwiXCI7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZExpbmtNb2RlSW5pdGlhbFNuYXBzaG90ID0gKG1hbmFnZWRVc2VySWQgPSBcIlwiKTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9PiB7XHJcbiAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xyXG4gIGNvbnN0IGZyb21EYXRlID0gbmV3IERhdGUodG9kYXkpO1xyXG4gIC8vIEtlZXAgYXV0b21hdGljIGxpbmstbW9kZSBsb2FkIGJvdW5kZWQgdG8gYXZvaWQgaGVhdnkgdXBzdHJlYW0gc2NhbnMuXHJcbiAgZnJvbURhdGUuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAyOSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBmcm9tRGF0ZTogdG9Jc29EYXRlKGZyb21EYXRlKSxcclxuICAgIHRvRGF0ZTogdG9Jc29EYXRlKHRvZGF5KSxcclxuICAgIGZpbHRlcktleTogXCJcIixcclxuICAgIGN1cnJlbmN5Q29kZTogXCJcIixcclxuICAgIG1hbmFnZWRVc2VySWQ6IG5vcm1hbGl6ZVVzZXJJZChtYW5hZ2VkVXNlcklkKSxcclxuICAgIHN0YXR1c0ZpbHRlcjogMCxcclxuICAgIGdhc3RvVHlwZUZpbHRlcjogXCJcIixcclxuICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXI6IFwiYWxsXCIsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVMaW5rTW9kZUJsb2NrZWRNZXNzYWdlID0gKGlzUGFpZDogYm9vbGVhbik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKGlzUGFpZCkge1xyXG4gICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9QYWlkUmVhZE9ubHlcIiwgXCJMYXMgaG9qYXMgZGUgZ2FzdG8gcGFnYWRhcyBzb24gZGUgc29sbyBsZWN0dXJhLlwiKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUmVhZE9ubHlCeVN0YXR1c1wiLCBcIk5vIHNlIHB1ZWRlIGVkaXRhciBlc3RhIGhvamEgZGUgZ2FzdG9zIGVuIGVsIGVzdGFkbyBhY3R1YWwuXCIpO1xyXG59O1xyXG5cclxuY29uc3QgRVhQRU5TRV9USUNLRVRTX0xPR19QUkVGSVggPSBcIltleHBlbnNlLXRpY2tldHNdXCI7XHJcblxyXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c0luZm8gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLmluZm8gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS5pbmZvKEVYUEVOU0VfVElDS0VUU19MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c1dhcm4gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLndhcm4gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS53YXJuKEVYUEVOU0VfVElDS0VUU19MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBLZWVwcyBjcmVhdGVkLXRpY2tldCByZXR1cm4gZmlsdGVycyBib3VuZCB0byBvbmUgdmFsaWQgbGlzdCBkYXRlLlxyXG5jb25zdCByZXNvbHZlQ3JlYXRlZFRpY2tldEZpbHRlckRhdGUgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiB0b0V4cGVuc2VJc29EYXRlKHZhbHVlKSB8fCB0b0V4cGVuc2VJc29EYXRlKG5ldyBEYXRlKCkpO1xyXG59O1xyXG5cclxuLy8gVmFsaWRhdGVzIHdoZXRoZXIgb25lIHRpY2tldCBjYXJkIGNhbiBwYXJ0aWNpcGF0ZSBpbiBidWxrIGxpbmsgbW9kZS5cclxuY29uc3QgY2FuU2VsZWN0VGlja2V0Rm9yTGluayA9IChpdGVtOiBFeHBlbnNlVGlja2V0TGlzdFBhZ2VJdGVtKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQoaXRlbS5maWxlSWQpO1xyXG4gIHJldHVybiAhIWZpbGVJZDtcclxufTtcclxuXHJcbi8vIEluaXRpYWxpemVzIGF1dGggc2VlZCBmb3IgZXhwZW5zZSBBUEkgY2FsbHMgYmVmb3JlIGlzbGFuZCBlZmZlY3RzIHJ1bi5cclxuY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XHJcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgoe1xyXG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXHJcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcclxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRmFsbGJhY2tHYXN0b1R5cGVPcHRpb25zID0gKCk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XHJcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKEdBU1RPX1RZUEVfTEFCRUxfS0VZUylcclxuICAgIC5tYXAoKFtjb2RlLCBjZmddKSA9PiAoe1xyXG4gICAgICB2YWx1ZTogU3RyaW5nKGNvZGUpLFxyXG4gICAgICB0ZXh0OiBpbmRUKGNmZy5rZXksIGNmZy5mYWxsYmFjayksXHJcbiAgICB9KSlcclxuICAgIC5zb3J0KChsZWZ0LCByaWdodCkgPT4gTnVtYmVyKGxlZnQudmFsdWUpIC0gTnVtYmVyKHJpZ2h0LnZhbHVlKSk7XHJcbn07XHJcblxyXG5jb25zdCBOZXdUaWNrZXRJY29uID0gKCkgPT4gKFxyXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwiaC02IHctNlwiPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTAgMjBoLTVhMiAyIDAgMCAxIC0yIC0ydi05YTIgMiAwIDAgMSAyIC0yaDFhMiAyIDAgMCAwIDIgLTJhMSAxIDAgMCAxIDEgLTFoNmExIDEgMCAwIDEgMSAxYTIgMiAwIDAgMCAyIDJoMWEyIDIgMCAwIDEgMiAydjJcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQuMzYyIDExLjE1YTMgMyAwIDEgMCAtNC4xNDQgNC4yNjNcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMjF2LTRhMiAyIDAgMSAxIDQgMHY0XCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDE5aDRcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMjEgMTV2NlwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBFeHBlbnNlVGlja2V0c1BhZ2VDb250ZW50ID0gKCkgPT4ge1xyXG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiVmlld1wiKTtcclxuICBjb25zdCBjYW5DcmVhdGVUaWNrZXQgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIkFkZFwiKTtcclxuICBjb25zdCBjYW5MaW5rU2hlZXRMaW5lcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiQWRkXCIpO1xyXG4gIGNvbnN0IHtcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzdWJvcmRpbmF0ZXMsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICB9ID0gdXNlQXV0aENvbnRleHQoKTtcclxuICBjb25zdCB0aW1lbGluZUNvbnRhaW5lclJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGNhbWVyYUlucHV0UmVmID0gUmVhY3QudXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBnYWxsZXJ5SW5wdXRSZWYgPSBSZWFjdC51c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGRpZFJlc3RvcmVPbk1vdW50UmVmID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcclxuICBjb25zdCBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZiA9IFJlYWN0LnVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBwZW5kaW5nRm9jdXNGaWxlSWRSZWYgPSBSZWFjdC51c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgbGlua01vZGVDb250ZXh0ID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgIGNvbnN0IGFjdGlvbiA9IHNhZmVUZXh0KHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwiYWN0aW9uXCIpKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgY29uc3QgaG9qYUdhc3Rvc0lkID0gc2FmZVRleHQodXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJob2phR2FzdG9zSWRcIikpO1xyXG4gICAgY29uc3QgaXNMaW5rTW9kZSA9IGFjdGlvbiA9PT0gXCJsaW5rXCIgJiYgISFob2phR2FzdG9zSWQ7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpc0xpbmtNb2RlLFxyXG4gICAgICBzaGVldElkOiBob2phR2FzdG9zSWQsXHJcbiAgICAgIHNoZWV0T3JpZ2luOiBpc0xpbmtNb2RlID8gKFwic2hlZXQtbGlua1wiIGFzIGNvbnN0KSA6ICghIWhvamFHYXN0b3NJZCA/IChcInNoZWV0LWNyZWF0ZVwiIGFzIGNvbnN0KSA6IG51bGwpLFxyXG4gICAgICBmaXhlZFN0YXR1c0ZpbHRlcjogaXNMaW5rTW9kZSA/ICgwIGFzIGNvbnN0KSA6IG51bGwsXHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaXNMaW5rTW9kZSA9IGxpbmtNb2RlQ29udGV4dC5pc0xpbmtNb2RlO1xyXG4gIGNvbnN0IGxpbmtTaGVldElkID0gbGlua01vZGVDb250ZXh0LnNoZWV0SWQ7XHJcbiAgY29uc3Qgc2hlZXRDYWxsZXJPcmlnaW4gPSBsaW5rTW9kZUNvbnRleHQuc2hlZXRPcmlnaW47XHJcbiAgY29uc3QgaGFzU2hlZXRDYWxsZXJDb250ZXh0ID0gISFsaW5rU2hlZXRJZCAmJiAhIXNoZWV0Q2FsbGVyT3JpZ2luO1xyXG4gIGNvbnN0IGZpeGVkU3RhdHVzRmlsdGVyID0gbGlua01vZGVDb250ZXh0LmZpeGVkU3RhdHVzRmlsdGVyO1xyXG4gIGNvbnN0IGNhblByb2Nlc3NMaW5rTW9kZSA9ICFpc0xpbmtNb2RlIHx8IGNhbkxpbmtTaGVldExpbmVzO1xyXG4gIGNvbnN0IG1hbmFnZWRVc2VycyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBlbnN1cmVDdXJyZW50VXNlckluTGlzdChBcnJheS5pc0FycmF5KHN1Ym9yZGluYXRlcykgPyBzdWJvcmRpbmF0ZXMgOiBbXSwgY3VycmVudEF4VXNlcklkKSxcclxuICAgIFtjdXJyZW50QXhVc2VySWQsIHN1Ym9yZGluYXRlc11cclxuICApO1xyXG4gIGNvbnN0IGRlZmF1bHRNYW5hZ2VkVXNlcklkID0gdXNlTWVtbyhcclxuICAgICgpID0+IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbihjdXJyZW50QXhVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzKSxcclxuICAgIFtjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vyc11cclxuICApO1xyXG4gIGNvbnN0IHNob3dNYW5hZ2VkVXNlckZpbHRlciA9IGlzTGlua01vZGUgJiYgY2FuTWFuYWdlT3RoZXJVc2VycztcclxuXHJcbiAgLy8gS2VlcHMgbGluay1tb2RlIGxpc3QgcXVlcmllcyBib3VuZGVkIGV2ZW4gd2hlbiBVSSBmaWx0ZXJzIGFyZSBjbGVhcmVkLlxyXG4gIGNvbnN0IG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0+IHtcclxuICAgICAgaWYgKCFpc0xpbmtNb2RlKSByZXR1cm4gc25hcHNob3Q7XHJcblxyXG4gICAgICBjb25zdCBmYWxsYmFjayA9IGJ1aWxkTGlua01vZGVJbml0aWFsU25hcHNob3Qoc25hcHNob3QubWFuYWdlZFVzZXJJZCk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRGcm9tRGF0ZSA9IHNhZmVUZXh0KHNuYXBzaG90LmZyb21EYXRlKSB8fCBmYWxsYmFjay5mcm9tRGF0ZTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZFRvRGF0ZSA9IHNhZmVUZXh0KHNuYXBzaG90LnRvRGF0ZSkgfHwgZmFsbGJhY2sudG9EYXRlO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCA9IG5vcm1hbGl6ZVVzZXJJZChzbmFwc2hvdC5tYW5hZ2VkVXNlcklkKSB8fCBmYWxsYmFjay5tYW5hZ2VkVXNlcklkO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zbmFwc2hvdCxcclxuICAgICAgICBmcm9tRGF0ZTogbm9ybWFsaXplZEZyb21EYXRlLFxyXG4gICAgICAgIHRvRGF0ZTogbm9ybWFsaXplZFRvRGF0ZSxcclxuICAgICAgICBtYW5hZ2VkVXNlcklkOiBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgICBzdGF0dXNGaWx0ZXI6IDAsXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgW2lzTGlua01vZGVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgW2xpbmtGbG93QnVzeSwgc2V0TGlua0Zsb3dCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbGlua0Zsb3dTdGF0dXMsIHNldExpbmtGbG93U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtsaW5rRmxvd0Vycm9yLCBzZXRMaW5rRmxvd0Vycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtzZWxlY3RBbGxCdXN5LCBzZXRTZWxlY3RBbGxCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2VsZWN0QWxsRXJyb3IsIHNldFNlbGVjdEFsbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtsaW5rQnVsa1Jlc3VsdCwgc2V0TGlua0J1bGtSZXN1bHRdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXN1bHREdG8gfCBudWxsPihudWxsKTtcclxuXHJcbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiAoe1xyXG4gICAgICBmaXJzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9GaXJzdFwiLCBcIkZpcnN0XCIpLFxyXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcclxuICAgICAgbmV4dDogaW5kVChcIkhpc3RvcnlfUGFnZV9OZXh0XCIsIFwiTmV4dFwiKSxcclxuICAgICAgbGFzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKSxcclxuICAgIH0pLFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGdhc3RvVHlwZU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4ge1xyXG4gICAgY29uc3Qgc291cmNlID0gQXJyYXkuaXNBcnJheSh3aW5kb3cuX19FWFBFTlNFX0dBU1RPX1RZUEVTX18pID8gd2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fIDogW107XHJcbiAgICBjb25zdCBtYXBwZWQgPSBtYXBXaW5kb3dFbnVtT3B0aW9ucyhzb3VyY2UpLmZpbHRlcigoZW50cnkpID0+IHtcclxuICAgICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKGVudHJ5LnZhbHVlKTtcclxuICAgICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIocGFyc2VkKSAmJiBBTExPV0VEX0dBU1RPX1RZUEVTLmhhcyhwYXJzZWQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKG1hcHBlZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBtYXBwZWQuc29ydCgobGVmdCwgcmlnaHQpID0+IE51bWJlcihsZWZ0LnZhbHVlKSAtIE51bWJlcihyaWdodC52YWx1ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBidWlsZEZhbGxiYWNrR2FzdG9UeXBlT3B0aW9ucygpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgZ2FzdG9UeXBlTGFiZWxNYXAgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XHJcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBnYXN0b1R5cGVPcHRpb25zKSB7XHJcbiAgICAgIG1hcC5zZXQoU3RyaW5nKG9wdGlvbi52YWx1ZSksIG9wdGlvbi50ZXh0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBtYXA7XHJcbiAgfSwgW2dhc3RvVHlwZU9wdGlvbnNdKTtcclxuXHJcbiAgY29uc3Qge1xyXG4gICAgaXRlbXMsXHJcbiAgICB0b3RhbCxcclxuICAgIGN1cnJlbnRQYWdlLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgbG9hZExpc3QsXHJcbiAgICByZXN0b3JlTGlzdFNuYXBzaG90LFxyXG4gICAgcmVzZXRMaXN0LFxyXG4gICAgY2xlYXJMaXN0Q2FjaGUsXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGEoe1xyXG4gICAgaGFzQWNjZXNzLFxyXG4gICAgcGFnZVNpemU6IFBBR0VfU0laRSxcclxuICAgIG1vZGU6IGlzTGlua01vZGUgPyBcImxpbmtcIiA6IFwiZ2VuZXJhbFwiLFxyXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXHJcbiAgfSk7XHJcbiAgY29uc3QgeyByZWFkQ2FjaGVkU3RhdGUsIGNvbnN1bWVSZXR1cm5GbGFnLCBjb25zdW1lUmV0dXJuTW9kZSwgc2F2ZUNhY2hlZFN0YXRlLCBjbGVhckNhY2hlZFN0YXRlIH0gPSB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlKCk7XHJcbiAgY29uc3Qge1xyXG4gICAgc2VsZWN0aW9uTW9kZSxcclxuICAgIHNlbGVjdGVkVGlja2V0cyxcclxuICAgIGV4Y2x1ZGVkSWRzLFxyXG4gICAgZmlsdGVyZWRTbmFwc2hvdCxcclxuICAgIGZpbHRlcmVkVG90YWxDb3VudCxcclxuICAgIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUsXHJcbiAgICBpc1NlbGVjdGVkOiBpc0xpbmtUaWNrZXRTZWxlY3RlZCxcclxuICAgIHRvZ2dsZVRpY2tldDogdG9nZ2xlTGlua1RpY2tldFNlbGVjdGlvbixcclxuICAgIGNsZWFyU2VsZWN0aW9uOiBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24sXHJcbiAgICByZXN0b3JlU2VsZWN0aW9uOiByZXN0b3JlTGlua1RpY2tldFNlbGVjdGlvbixcclxuICAgIHNlbGVjdEFsbEJ5RmlsdGVycyxcclxuICAgIGh5ZHJhdGVWaXNpYmxlVGlja2V0cyxcclxuICAgIHJlc29sdmVTZWxlY3RlZENvdW50LFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbigpO1xyXG4gIGNvbnN0IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHJlcXVlc3RlZFVzZXJJZDogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICAgICAgY29uc3QgcmVzb2x2ZWRVc2VySWQgPSByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24ocmVxdWVzdGVkVXNlcklkLCBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vycyk7XHJcbiAgICAgIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZChyZXNvbHZlZFVzZXJJZCk7XHJcbiAgICAgIGlmICghcmVzb2x2ZWRVc2VySWQgfHwgKGN1cnJlbnRBeFVzZXJJZCAmJiBpc1NhbWVVc2VyKHJlc29sdmVkVXNlcklkLCBjdXJyZW50QXhVc2VySWQpKSkge1xyXG4gICAgICAgIGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUocmVzb2x2ZWRVc2VySWQpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXNvbHZlZFVzZXJJZDtcclxuICAgIH0sXHJcbiAgICBbY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnMsIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZF1cclxuICApO1xyXG4gIGNvbnN0IHtcclxuICAgIGxpbmtTaGVldExvY2tlZCxcclxuICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlLFxyXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZSh7XHJcbiAgICBpc0xpbmtNb2RlLFxyXG4gICAgbGlua1NoZWV0SWQsXHJcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICByZXNvbHZlQmxvY2tlZE1lc3NhZ2U6IHJlc29sdmVMaW5rTW9kZUJsb2NrZWRNZXNzYWdlLFxyXG4gIH0pO1xyXG4gIGNvbnN0IHsgcnVuQXV0b21hdGljTGlzdExvYWQgfSA9IHVzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkKHtcclxuICAgIGlzTGlua01vZGUsXHJcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXHJcbiAgICBsaW5rU2hlZXRDaGVja0J1c3ksXHJcbiAgICBsaW5rU2hlZXRMb2NrZWQsXHJcbiAgICBjbGVhckxpc3RDYWNoZSxcclxuICAgIHJlc2V0TGlzdCxcclxuICAgIGxvYWRMaXN0LFxyXG4gIH0pO1xyXG4gIGNvbnN0IGJ1aWxkSW5pdGlhbExpbmtNb2RlU25hcHNob3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBpbml0aWFsTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XHJcbiAgICByZXR1cm4gYnVpbGRMaW5rTW9kZUluaXRpYWxTbmFwc2hvdChpbml0aWFsTWFuYWdlZFVzZXJJZCk7XHJcbiAgfSwgW2RlZmF1bHRNYW5hZ2VkVXNlcklkLCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb25dKTtcclxuXHJcbiAgY29uc3Qge1xyXG4gICAgZnJvbURhdGUsXHJcbiAgICB0b0RhdGUsXHJcbiAgICBmaWx0ZXJLZXksXHJcbiAgICBjdXJyZW5jeUNvZGUsXHJcbiAgICBtYW5hZ2VkVXNlcklkLFxyXG4gICAgc3RhdHVzRmlsdGVyLFxyXG4gICAgZ2FzdG9UeXBlRmlsdGVyLFxyXG4gICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxyXG4gICAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXHJcbiAgICBzaG93TWFudWFsRGF0ZUVycm9yLFxyXG4gICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxyXG4gICAgYXBwbGllZEZpbHRlcnMsXHJcbiAgICBzaG93RmlsdGVycyxcclxuICAgIGN1cnJlbnRGaWx0ZXJzLFxyXG4gICAgc2V0RmlsdGVyS2V5LFxyXG4gICAgc2V0Q3VycmVuY3lDb2RlLFxyXG4gICAgc2V0TWFuYWdlZFVzZXJJZCxcclxuICAgIHNldFN0YXR1c0ZpbHRlcixcclxuICAgIHNldEdhc3RvVHlwZUZpbHRlcixcclxuICAgIHNldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsXHJcbiAgICBvbkFwcGx5LFxyXG4gICAgb25DbGVhcixcclxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcclxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlLFxyXG4gICAgb25NYW51YWxSYW5nZUNvbXBsZXRlLFxyXG4gICAgb25RdWlja0ZpbHRlckNoYW5nZSxcclxuICAgIHRvZ2dsZUZpbHRlclBhbmVsLFxyXG4gICAgc3RhdHVzRmlsdGVyTG9ja2VkLFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZSh7XHJcbiAgICBkZWZhdWx0TWFuYWdlZFVzZXJJZCxcclxuICAgIGZpeGVkU3RhdHVzRmlsdGVyLFxyXG4gICAgYWxsb3dFbXB0eURhdGVzT25BcHBseTogaXNMaW5rTW9kZSxcclxuICAgIG9uQXBwbHlGaWx0ZXJzOiAoc25hcHNob3QpID0+IHtcclxuICAgICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XHJcbiAgICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbigpO1xyXG4gICAgICBjb25zdCByZXNvbHZlZE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oc25hcHNob3QubWFuYWdlZFVzZXJJZCk7XHJcbiAgICAgIHZvaWQgbG9hZExpc3QoXHJcbiAgICAgICAgMSxcclxuICAgICAgICBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZCh7XHJcbiAgICAgICAgICAuLi5zbmFwc2hvdCxcclxuICAgICAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc29sdmVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfSxcclxuICAgIG9uQ2xlYXJGaWx0ZXJzOiAoKSA9PiB7XHJcbiAgICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xyXG4gICAgICBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24oKTtcclxuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xyXG4gICAgICBpZiAoaXNMaW5rTW9kZSkge1xyXG4gICAgICAgIGNvbnN0IGxpbmtTbmFwc2hvdCA9IGJ1aWxkSW5pdGlhbExpbmtNb2RlU25hcHNob3QoKTtcclxuICAgICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMobGlua1NuYXBzaG90KTtcclxuICAgICAgICBydW5BdXRvbWF0aWNMaXN0TG9hZCgxLCBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZChsaW5rU25hcHNob3QpLCB7XHJcbiAgICAgICAgICBjbGVhckNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgcmVzZXRCZWZvcmVMb2FkOiB0cnVlLFxyXG4gICAgICAgICAgd2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJlc2V0TWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihjdXJyZW50QXhVc2VySWQpO1xyXG4gICAgICBzZXRNYW5hZ2VkVXNlcklkKHJlc2V0TWFuYWdlZFVzZXJJZCk7XHJcbiAgICAgIHJlc2V0TGlzdChcImNsZWFyLWZpbHRlcnNcIik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZERlZmF1bHRNYW5hZ2VkVXNlcklkID0gbm9ybWFsaXplVXNlcklkKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcclxuICAgIGlmICghbm9ybWFsaXplZERlZmF1bHRNYW5hZ2VkVXNlcklkKSByZXR1cm47XHJcbiAgICBzZXRNYW5hZ2VkVXNlcklkKG5vcm1hbGl6ZWREZWZhdWx0TWFuYWdlZFVzZXJJZCk7XHJcbiAgICBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24obm9ybWFsaXplZERlZmF1bHRNYW5hZ2VkVXNlcklkKTtcclxuICB9LCBbZGVmYXVsdE1hbmFnZWRVc2VySWQsIHNldE1hbmFnZWRVc2VySWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGNhbk1hbmFnZU90aGVyVXNlcnMpIHJldHVybjtcclxuICAgIGNvbnN0IGZhbGxiYWNrTWFuYWdlZFVzZXJJZCA9IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbihjdXJyZW50QXhVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzKTtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50TWFuYWdlZFVzZXJJZCA9IG5vcm1hbGl6ZVVzZXJJZChtYW5hZ2VkVXNlcklkKTtcclxuICAgIGlmIChpc1NhbWVVc2VyKG5vcm1hbGl6ZWRDdXJyZW50TWFuYWdlZFVzZXJJZCwgZmFsbGJhY2tNYW5hZ2VkVXNlcklkKSkgcmV0dXJuO1xyXG4gICAgaWYgKCFub3JtYWxpemVkQ3VycmVudE1hbmFnZWRVc2VySWQgJiYgIWZhbGxiYWNrTWFuYWdlZFVzZXJJZCkgcmV0dXJuO1xyXG5cclxuICAgIHNldE1hbmFnZWRVc2VySWQoZmFsbGJhY2tNYW5hZ2VkVXNlcklkKTtcclxuICAgIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihmYWxsYmFja01hbmFnZWRVc2VySWQpO1xyXG4gIH0sIFtjYW5NYW5hZ2VPdGhlclVzZXJzLCBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2VySWQsIG1hbmFnZWRVc2Vycywgc2V0TWFuYWdlZFVzZXJJZCwgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXSk7XHJcblxyXG4gIGNvbnN0IHtcclxuICAgIHNvdXJjZVBpY2tlck9wZW4sXHJcbiAgICBidXN5OiBxdWlja1RpY2tldEJ1c3ksXHJcbiAgICBwcm9ncmVzc01lc3NhZ2U6IHF1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlLFxyXG4gICAgcHJvZ3Jlc3NTdGFnZXM6IHF1aWNrVGlja2V0UHJvZ3Jlc3NTdGFnZXMsXHJcbiAgICBwcm9ncmVzc0VsYXBzZWRNczogcXVpY2tUaWNrZXRFbGFwc2VkTXMsXHJcbiAgICBlcnJvck1lc3NhZ2U6IHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlLFxyXG4gICAgYXR0ZW1wdElkOiBxdWlja1RpY2tldEF0dGVtcHRJZCxcclxuICAgIGhhc1BlbmRpbmdVcGxvYWRSZXRyeSxcclxuICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlLFxyXG4gICAgdHJhY2VMaXN0OiBxdWlja1RpY2tldFRyYWNlTGlzdCxcclxuICAgIG9wZW5Tb3VyY2VQaWNrZXIsXHJcbiAgICBjbG9zZVNvdXJjZVBpY2tlcixcclxuICAgIHNlbGVjdEZyb21DYW1lcmEsXHJcbiAgICBzZWxlY3RGcm9tR2FsbGVyeSxcclxuICAgIGhhbmRsZVNlbGVjdGVkRmlsZSxcclxuICAgIHJldHJ5UGVuZGluZ1VwbG9hZCxcclxuICAgIG9wZW5DcmVhdGVkVGlja2V0LFxyXG4gICAgY2xlYXJFcnJvcjogY2xlYXJRdWlja1RpY2tldEVycm9yLFxyXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3coe1xyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogIWlzTGlua01vZGUgJiYgY2FuQ3JlYXRlVGlja2V0LFxyXG4gICAgaXNDcmVhdGVNb2RlOiBmYWxzZSxcclxuICAgIGlzU2hlZXRMb2NrZWQ6IGZhbHNlLFxyXG4gICAgbGlua1RvU2hlZXQ6IGZhbHNlLFxyXG4gICAgYXhVc2VySWRPdmVycmlkZTogc2FmZVRleHQoY3VycmVudEF4VXNlcklkKSxcclxuICAgIGN1cnJlbmN5Q29kZTogY3VycmVuY3lDb2RlIHx8IFwiRVVSXCIsXHJcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICAgIG9uQ29tcGxldGVkOiAocmVzdWx0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNyZWF0ZWRGaWxlSWQgPSBzYWZlVGV4dChyZXN1bHQ/LmZpbGVJZCk7XHJcbiAgICAgIGlmICghY3JlYXRlZEZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgaWYgKGhhc1NoZWV0Q2FsbGVyQ29udGV4dCAmJiBzaGVldENhbGxlck9yaWdpbikge1xyXG4gICAgICAgIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCh7XHJcbiAgICAgICAgICBmaWxlSWQ6IGNyZWF0ZWRGaWxlSWQsXHJcbiAgICAgICAgICBzaGVldElkOiBsaW5rU2hlZXRJZCxcclxuICAgICAgICAgIG9yaWdpbjogc2hlZXRDYWxsZXJPcmlnaW4sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICAgIGZpbGVJZDogY3JlYXRlZEZpbGVJZCxcclxuICAgICAgICAgIG1vZGU6IFwiZWRpdFwiLFxyXG4gICAgICAgICAgb3JpZ2luOiBzaGVldENhbGxlck9yaWdpbixcclxuICAgICAgICAgIHNoZWV0SWQ6IGxpbmtTaGVldElkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoKTtcclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsP2ZpbGVJZD0ke2VuY29kZVVSSUNvbXBvbmVudChjcmVhdGVkRmlsZUlkKX0mbW9kZT1lZGl0Jm9yaWdpbj10aWNrZXQtY3JlYXRlYCwge1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZmFiTWVudUl0ZW1zID0gdXNlTWVtbzxGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW10+KFxyXG4gICAgKCkgPT5cclxuICAgICAgaXNMaW5rTW9kZVxyXG4gICAgICAgID8gW11cclxuICAgICAgICA6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGlkOiBcIm5ldy10aWNrZXRcIixcclxuICAgICAgICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX05ld1RpY2tldFwiLCBcIk51ZXZvIFRpY2tldFwiKSxcclxuICAgICAgICAgICAgICBpY29uOiA8TmV3VGlja2V0SWNvbiAvPixcclxuICAgICAgICAgICAgICBvbkNsaWNrOiBvcGVuU291cmNlUGlja2VyLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgXSxcclxuICAgIFtpc0xpbmtNb2RlLCBvcGVuU291cmNlUGlja2VyXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNlbGVjdGVkVGlja2V0Q291bnQgPSByZXNvbHZlU2VsZWN0ZWRDb3VudCh0b3RhbCk7XHJcbiAgY29uc3Qgc2VsZWN0ZWRUb3RhbEFtb3VudCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgcmV0dXJuIHNlbGVjdGVkVGlja2V0cy5yZWR1Y2UoKHN1bSwgaXRlbSkgPT4ge1xyXG4gICAgICBjb25zdCBhbW91bnQgPSBOdW1iZXIoaXRlbS50b3RhbEFtb3VudCA/PyAwKTtcclxuICAgICAgcmV0dXJuIGFtb3VudCA+IDAgPyBzdW0gKyBhbW91bnQgOiBzdW07XHJcbiAgICB9LCAwKTtcclxuICB9LCBbc2VsZWN0ZWRUaWNrZXRzXSk7XHJcbiAgY29uc3Qgc2VsZWN0ZWRUb3RhbEFtb3VudFRleHQgPSB1c2VNZW1vKCgpID0+IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShzZWxlY3RlZFRvdGFsQW1vdW50LCBcIlwiKSwgW3NlbGVjdGVkVG90YWxBbW91bnRdKTtcclxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xyXG4gICAgcmV2ZWFsVG9wYmFyQWN0aW9uR3JvdXAoXCJleHBlbnNlLXRpY2tldHMtbGlzdC1hY3Rpb25zXCIpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgbGlua01vZGVDYW5jZWxNZXNzYWdlID0gdXNlTWVtbyhcclxuICAgICgpID0+XHJcbiAgICAgIGluZFQoXHJcbiAgICAgICAgXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9DYW5jZWxDb25maXJtXCIsXHJcbiAgICAgICAgXCJTZSBjYW5jZWxhclx1MDBFMSBlbCBwcm9jZXNvIGRlIHZpbmN1bGFjaVx1MDBGM24geSB2b2x2ZXJcdTAwRTFzIGEgbGEgaG9qYSBkZSBnYXN0b3MuIFx1MDBCRlF1aWVyZXMgY29udGludWFyP1wiXHJcbiAgICAgICksXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGFwcGx5Q3JlYXRlZFRpY2tldFJldHVybiA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHRpY2tldEZpbGVJZDogc3RyaW5nLCB0aWNrZXREYXRlVmFsdWU6IHVua25vd24pID0+IHtcclxuICAgICAgY29uc3QgdGlja2V0RGF0ZSA9IHJlc29sdmVDcmVhdGVkVGlja2V0RmlsdGVyRGF0ZSh0aWNrZXREYXRlVmFsdWUpO1xyXG4gICAgICBjb25zdCBjcmVhdGVkVGlja2V0TWFuYWdlZFVzZXJJZCA9IG5vcm1hbGl6ZVVzZXJJZChjdXJyZW50QXhVc2VySWQpO1xyXG4gICAgICBjb25zdCByZXNvbHZlZE1hbmFnZWRVc2VySWQgPSBjcmVhdGVkVGlja2V0TWFuYWdlZFVzZXJJZFxyXG4gICAgICAgID8gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGNyZWF0ZWRUaWNrZXRNYW5hZ2VkVXNlcklkKVxyXG4gICAgICAgIDogXCJcIjtcclxuXHJcbiAgICAgIGNvbnN0IHF1ZXJ5U25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgPSB7XHJcbiAgICAgICAgZnJvbURhdGU6IHRpY2tldERhdGUsXHJcbiAgICAgICAgdG9EYXRlOiB0aWNrZXREYXRlLFxyXG4gICAgICAgIGZpbHRlcktleTogdGlja2V0RmlsZUlkLFxyXG4gICAgICAgIGN1cnJlbmN5Q29kZTogXCJcIixcclxuICAgICAgICBtYW5hZ2VkVXNlcklkOiByZXNvbHZlZE1hbmFnZWRVc2VySWQsXHJcbiAgICAgICAgc3RhdHVzRmlsdGVyOiBcIlwiLFxyXG4gICAgICAgIGdhc3RvVHlwZUZpbHRlcjogXCJcIixcclxuICAgICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyOiBcImFsbFwiLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwiYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuOnN0YXJ0XCIsIHtcclxuICAgICAgICB0aWNrZXRGaWxlSWQsXHJcbiAgICAgICAgdGlja2V0RGF0ZVZhbHVlLFxyXG4gICAgICAgIHRpY2tldERhdGUsXHJcbiAgICAgICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgICAgIGNyZWF0ZWRUaWNrZXRNYW5hZ2VkVXNlcklkLFxyXG4gICAgICAgIHJlc29sdmVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgICBxdWVyeVNuYXBzaG90LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcclxuICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKHF1ZXJ5U25hcHNob3QpO1xyXG4gICAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IHRpY2tldEZpbGVJZDtcclxuICAgICAgY2xlYXJMaXN0Q2FjaGUoKTtcclxuICAgICAgcmVzZXRMaXN0KFwiY3JlYXRlZC10aWNrZXQtcmV0dXJuXCIpO1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJhcHBseUNyZWF0ZWRUaWNrZXRSZXR1cm46bG9hZExpc3RcIiwge1xyXG4gICAgICAgIHBhZ2U6IDEsXHJcbiAgICAgICAgcXVlcnlTbmFwc2hvdCxcclxuICAgICAgfSk7XHJcbiAgICAgIHZvaWQgbG9hZExpc3QoMSwgcXVlcnlTbmFwc2hvdCk7XHJcblxyXG4gICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgdXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoXCJ0aWNrZXRGaWxlSWRcIik7XHJcbiAgICAgIHVybC5zZWFyY2hQYXJhbXMuZGVsZXRlKFwidGlja2V0RGF0ZVwiKTtcclxuICAgICAgY29uc3QgY2xlYW5lZFF1ZXJ5ID0gdXJsLnNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xyXG4gICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIFwiXCIsIGNsZWFuZWRRdWVyeSA/IGAke3VybC5wYXRobmFtZX0/JHtjbGVhbmVkUXVlcnl9YCA6IHVybC5wYXRobmFtZSk7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBjbGVhckNhY2hlZFN0YXRlLFxyXG4gICAgICBjbGVhckxpc3RDYWNoZSxcclxuICAgICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgICBsb2FkTGlzdCxcclxuICAgICAgcmVzZXRMaXN0LFxyXG4gICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMsXHJcbiAgICAgIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbixcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCByZXN0b3JlTGlua01vZGVSZXR1cm5TdGF0ZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGNhY2hlZFN0YXRlOiBFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihjYWNoZWRTdGF0ZS5maWx0ZXJzLm1hbmFnZWRVc2VySWQpO1xyXG4gICAgICBjb25zdCByZXN0b3JlZEZpbHRlcnMgPSB7XHJcbiAgICAgICAgLi4uY2FjaGVkU3RhdGUuZmlsdGVycyxcclxuICAgICAgICBtYW5hZ2VkVXNlcklkOiByZXN0b3JlZE1hbmFnZWRVc2VySWQsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMocmVzdG9yZWRGaWx0ZXJzKTtcclxuICAgICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLnNjcm9sbFk7XHJcbiAgICAgIHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50ID0gY2FjaGVkU3RhdGUuZm9jdXNGaWxlSWQ7XHJcbiAgICAgIHJlc3RvcmVMaW5rVGlja2V0U2VsZWN0aW9uKHtcclxuICAgICAgICBzZWxlY3Rpb25Nb2RlOiBjYWNoZWRTdGF0ZS5zZWxlY3Rpb25Nb2RlLFxyXG4gICAgICAgIHNlbGVjdGVkVGlja2V0czogY2FjaGVkU3RhdGUuc2VsZWN0ZWRUaWNrZXRzLFxyXG4gICAgICAgIGV4Y2x1ZGVkSWRzOiBjYWNoZWRTdGF0ZS5leGNsdWRlZElkcyxcclxuICAgICAgICBmaWx0ZXJlZFNuYXBzaG90OiBjYWNoZWRTdGF0ZS5maWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnMsXHJcbiAgICAgICAgZmlsdGVyZWRUb3RhbENvdW50OiBjYWNoZWRTdGF0ZS5maWx0ZXJlZFNlbGVjdGlvblRvdGFsLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChjYWNoZWRTdGF0ZS5pdGVtcy5sZW5ndGggPiAwIHx8IGNhY2hlZFN0YXRlLnRvdGFsID4gMCkge1xyXG4gICAgICAgIHJlc3RvcmVMaXN0U25hcHNob3Qoe1xyXG4gICAgICAgICAgaXRlbXM6IGNhY2hlZFN0YXRlLml0ZW1zLFxyXG4gICAgICAgICAgdG90YWw6IGNhY2hlZFN0YXRlLnRvdGFsLFxyXG4gICAgICAgICAgcGFnZTogY2FjaGVkU3RhdGUucGFnZSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcnVuQXV0b21hdGljTGlzdExvYWQoY2FjaGVkU3RhdGUucGFnZSwgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQocmVzdG9yZWRGaWx0ZXJzKSwge1xyXG4gICAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXHJcbiAgICAgICAgd2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeTogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZCxcclxuICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxyXG4gICAgICByZXN0b3JlTGlua1RpY2tldFNlbGVjdGlvbixcclxuICAgICAgcmVzdG9yZUxpc3RTbmFwc2hvdCxcclxuICAgICAgcnVuQXV0b21hdGljTGlzdExvYWQsXHJcbiAgICAgIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbixcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCByZXN0b3JlSW5pdGlhbExpbmtNb2RlU3RhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBsaW5rU25hcHNob3QgPSBidWlsZEluaXRpYWxMaW5rTW9kZVNuYXBzaG90KCk7XHJcbiAgICBjbGVhckNhY2hlZFN0YXRlKCk7XHJcbiAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoKTtcclxuICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbigpO1xyXG4gICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XHJcbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMobGlua1NuYXBzaG90KTtcclxuICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkKDEsIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKGxpbmtTbmFwc2hvdCksIHtcclxuICAgICAgY2xlYXJDYWNoZTogdHJ1ZSxcclxuICAgICAgcmVzZXRCZWZvcmVMb2FkOiB0cnVlLFxyXG4gICAgICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgfSwgW1xyXG4gICAgYnVpbGRJbml0aWFsTGlua01vZGVTbmFwc2hvdCxcclxuICAgIGNsZWFyQ2FjaGVkU3RhdGUsXHJcbiAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsXHJcbiAgICBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24sXHJcbiAgICBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZCxcclxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcclxuICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCByZXN0b3JlU3RhbmRhcmRSZXR1cm5TdGF0ZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGNhY2hlZFN0YXRlOiBFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihjYWNoZWRTdGF0ZS5maWx0ZXJzLm1hbmFnZWRVc2VySWQpO1xyXG4gICAgICBjb25zdCByZXN0b3JlZEZpbHRlcnMgPSB7XHJcbiAgICAgICAgLi4uY2FjaGVkU3RhdGUuZmlsdGVycyxcclxuICAgICAgICBtYW5hZ2VkVXNlcklkOiByZXN0b3JlZE1hbmFnZWRVc2VySWQsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMocmVzdG9yZWRGaWx0ZXJzKTtcclxuICAgICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLnNjcm9sbFk7XHJcbiAgICAgIHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50ID0gY2FjaGVkU3RhdGUuZm9jdXNGaWxlSWQ7XHJcblxyXG4gICAgICBpZiAoY2FjaGVkU3RhdGUuaXRlbXMubGVuZ3RoID4gMCB8fCBjYWNoZWRTdGF0ZS50b3RhbCA+IDApIHtcclxuICAgICAgICByZXN0b3JlTGlzdFNuYXBzaG90KHtcclxuICAgICAgICAgIGl0ZW1zOiBjYWNoZWRTdGF0ZS5pdGVtcyxcclxuICAgICAgICAgIHRvdGFsOiBjYWNoZWRTdGF0ZS50b3RhbCxcclxuICAgICAgICAgIHBhZ2U6IGNhY2hlZFN0YXRlLnBhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkKGNhY2hlZFN0YXRlLnBhZ2UsIHJlc3RvcmVkRmlsdGVycywge1xyXG4gICAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtyZXN0b3JlQXBwbGllZEZpbHRlcnMsIHJlc3RvcmVMaXN0U25hcHNob3QsIHJ1bkF1dG9tYXRpY0xpc3RMb2FkLCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb25dXHJcbiAgKTtcclxuXHJcbiAgLy8gS2VlcHMgZGVsZXRlIHJldHVybiBleHBsaWNpdDogYmxhbmsgZmlsdGVycywgb3BlbiBwYW5lbCwgYW5kIG5vIGF1dG9tYXRpYyByZWxvYWQuXHJcbiAgY29uc3QgcmVzdG9yZURlbGV0ZVJldHVyblN0YXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xyXG4gICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKCk7XHJcbiAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50ID0gXCJcIjtcclxuICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbigpO1xyXG4gICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XHJcbiAgICBvbkNsZWFyKCk7XHJcbiAgfSwgW2NsZWFyQ2FjaGVkU3RhdGUsIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSwgY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uLCBvbkNsZWFyXSk7XHJcblxyXG4gIGNvbnN0IHRvZ2dsZVRpY2tldFNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHRpY2tldDogRXhwZW5zZVRpY2tldExpc3RQYWdlSXRlbSkgPT4ge1xyXG4gICAgICBpZiAoIWlzTGlua01vZGUgfHwgIWNhblByb2Nlc3NMaW5rTW9kZSB8fCBsaW5rU2hlZXRDaGVja0J1c3kgfHwgbGlua1NoZWV0TG9ja2VkIHx8IGxpbmtGbG93QnVzeSkgcmV0dXJuO1xyXG4gICAgICBpZiAodGlja2V0LmtpbmQgIT09IFwibGlua1wiKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dCh0aWNrZXQuZmlsZUlkKTtcclxuICAgICAgaWYgKCFmaWxlSWQpIHJldHVybjtcclxuICAgICAgaWYgKCFjYW5TZWxlY3RUaWNrZXRGb3JMaW5rKHRpY2tldCkpIHJldHVybjtcclxuXHJcbiAgICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xyXG4gICAgICB0b2dnbGVMaW5rVGlja2V0U2VsZWN0aW9uKHRpY2tldCk7XHJcbiAgICB9LFxyXG4gICAgW2NhblByb2Nlc3NMaW5rTW9kZSwgaXNMaW5rTW9kZSwgbGlua0Zsb3dCdXN5LCBsaW5rU2hlZXRDaGVja0J1c3ksIGxpbmtTaGVldExvY2tlZCwgdG9nZ2xlTGlua1RpY2tldFNlbGVjdGlvbl1cclxuICApO1xyXG5cclxuICBjb25zdCBjbGVhclRpY2tldFNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFNlbGVjdEFsbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XHJcbiAgICBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24oKTtcclxuICB9LCBbY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uXSk7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVBY3RpdmVGaWx0ZXJzID0gdXNlQ2FsbGJhY2soKCk6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgPT4ge1xyXG4gICAgY29uc3QgYmFzZVNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnMgfHwgY3VycmVudEZpbHRlcnM7XHJcbiAgICBjb25zdCByZXNvbHZlZE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oYmFzZVNuYXBzaG90Lm1hbmFnZWRVc2VySWQpO1xyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKHtcclxuICAgICAgLi4uYmFzZVNuYXBzaG90LFxyXG4gICAgICBtYW5hZ2VkVXNlcklkOiByZXNvbHZlZE1hbmFnZWRVc2VySWQsXHJcbiAgICB9KTtcclxuICB9LCBbYXBwbGllZEZpbHRlcnMsIGN1cnJlbnRGaWx0ZXJzLCBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZCwgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXSk7XHJcblxyXG4gIC8vIEFjdGl2YXRlcyBiYWNrZW5kLWRyaXZlbiBmaWx0ZXJlZCBzZWxlY3Rpb24gZm9yIHRoZSBjdXJyZW50IGZpbHRlciBzbmFwc2hvdC5cclxuICBjb25zdCBzZWxlY3RBbGxNYXRjaGluZ1RpY2tldHMgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoIWlzTGlua01vZGUgfHwgIWNhblByb2Nlc3NMaW5rTW9kZSB8fCBsaW5rU2hlZXRDaGVja0J1c3kgfHwgbGlua1NoZWV0TG9ja2VkIHx8IGxpbmtGbG93QnVzeSB8fCBzZWxlY3RBbGxCdXN5KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTZWxlY3RBbGxCdXN5KHRydWUpO1xyXG4gICAgc2V0U2VsZWN0QWxsRXJyb3IoXCJcIik7XHJcbiAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBhY3RpdmVGaWx0ZXJzID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnMoKTtcclxuICAgICAgc2VsZWN0QWxsQnlGaWx0ZXJzKGFjdGl2ZUZpbHRlcnMsIHRvdGFsKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJUaWNrZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldHMuXCIpO1xyXG4gICAgICBzZXRTZWxlY3RBbGxFcnJvcihtZXNzYWdlKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldFNlbGVjdEFsbEJ1c3koZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtcclxuICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGlzTGlua01vZGUsXHJcbiAgICBsaW5rRmxvd0J1c3ksXHJcbiAgICBsaW5rU2hlZXRDaGVja0J1c3ksXHJcbiAgICBsaW5rU2hlZXRMb2NrZWQsXHJcbiAgICByZXNvbHZlQWN0aXZlRmlsdGVycyxcclxuICAgIHNlbGVjdEFsbEJ5RmlsdGVycyxcclxuICAgIHNlbGVjdEFsbEJ1c3ksXHJcbiAgICB0b3RhbCxcclxuICBdKTtcclxuXHJcbiAgLy8gS2VlcHMgc2VsZWN0ZWQgY2FyZCBtZXRhZGF0YSBmcmVzaCB3aXRoIHRoZSBsYXRlc3QgbGlzdCBwYXlsb2FkLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWlzTGlua01vZGUgfHwgaXRlbXMubGVuZ3RoIDwgMSkgcmV0dXJuO1xyXG4gICAgaHlkcmF0ZVZpc2libGVUaWNrZXRzKGl0ZW1zLmZpbHRlcigoaXRlbSk6IGl0ZW0gaXMgRXhwZW5zZVRpY2tldExpbmtDYXJkID0+IGl0ZW0ua2luZCA9PT0gXCJsaW5rXCIpKTtcclxuICB9LCBbaHlkcmF0ZVZpc2libGVUaWNrZXRzLCBpc0xpbmtNb2RlLCBpdGVtc10pO1xyXG5cclxuICBjb25zdCBydW5UaWNrZXRMaW5rRmxvdyA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmICghaXNMaW5rTW9kZSB8fCAhbGlua1NoZWV0SWQgfHwgbGlua0Zsb3dCdXN5KSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChsaW5rU2hlZXRMb2NrZWQgfHwgIWNhblByb2Nlc3NMaW5rTW9kZSkge1xyXG4gICAgICBjb25zdCBibG9ja2VkTWVzc2FnZSA9XHJcbiAgICAgICAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UgfHxcclxuICAgICAgICBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUmVhZE9ubHlCeVN0YXR1c1wiLCBcIk5vIHNlIHB1ZWRlIGVkaXRhciBlc3RhIGhvamEgZGUgZ2FzdG9zIGVuIGVsIGVzdGFkbyBhY3R1YWwuXCIpO1xyXG4gICAgICBzZXRMaW5rRmxvd0Vycm9yKGJsb2NrZWRNZXNzYWdlKTtcclxuICAgICAgc2V0TGlua0Zsb3dTdGF0dXMoYmxvY2tlZE1lc3NhZ2UpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZWxlY3RlZENvdW50ID0gcmVzb2x2ZVNlbGVjdGVkQ291bnQodG90YWwpO1xyXG4gICAgaWYgKHNlbGVjdGVkQ291bnQgPCAxKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhY3RpdmVGaWx0ZXJzID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnMoKTtcclxuICAgIGNvbnN0IHJlcXVlc3RBeFVzZXJJZCA9IHNhZmVUZXh0KGFjdGl2ZUZpbHRlcnMubWFuYWdlZFVzZXJJZCB8fCBjdXJyZW50QXhVc2VySWQpO1xyXG5cclxuICAgIHNldExpbmtGbG93QnVzeSh0cnVlKTtcclxuICAgIHNldExpbmtGbG93RXJyb3IoXCJcIik7XHJcbiAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcclxuICAgIHNldExpbmtGbG93U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfTGlua2luZ0xpbmVcIiwgXCJMaW5raW5nIGV4cGVuc2UgbGluZS4uLlwiKSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBsaW5rRXhwZW5zZVNoZWV0VGlja2V0c0J1bGsoXHJcbiAgICAgICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZVxyXG4gICAgICAgICAgPyB7XHJcbiAgICAgICAgICAgICAgZXhwZW5zZVNoZWV0SWQ6IGxpbmtTaGVldElkLFxyXG4gICAgICAgICAgICAgIHNlbGVjdGlvbk1vZGU6IFwiZmlsdGVyZWRcIixcclxuICAgICAgICAgICAgICBmaWx0ZXJzOiBidWlsZEV4cGVuc2VUaWNrZXRMaW5rQnVsa0ZpbHRlcnMoZmlsdGVyZWRTbmFwc2hvdCB8fCBhY3RpdmVGaWx0ZXJzKSxcclxuICAgICAgICAgICAgICBleGNsdWRlZElkcyxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgOiB7XHJcbiAgICAgICAgICAgICAgZXhwZW5zZVNoZWV0SWQ6IGxpbmtTaGVldElkLFxyXG4gICAgICAgICAgICAgIHNlbGVjdGlvbk1vZGU6IFwic2VsZWN0ZWRcIixcclxuICAgICAgICAgICAgICB0aWNrZXRJZHM6IHNlbGVjdGVkVGlja2V0cy5tYXAoKGl0ZW0pID0+IHNhZmVUZXh0KGl0ZW0uZmlsZUlkKSkuZmlsdGVyKEJvb2xlYW4pLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgYXhVc2VySWRPdmVycmlkZTogcmVxdWVzdEF4VXNlcklkIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLkRhdGEgfHwgbnVsbDtcclxuICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICBjb25zdCBmYWlsdXJlTWVzc2FnZSA9IHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpO1xyXG4gICAgICAgIHNldExpbmtGbG93RXJyb3IoZmFpbHVyZU1lc3NhZ2UpO1xyXG4gICAgICAgIHNldExpbmtGbG93U3RhdHVzKGZhaWx1cmVNZXNzYWdlKTtcclxuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRMaW5rQnVsa1Jlc3VsdChyZXN1bHQpO1xyXG5cclxuICAgICAgaWYgKHJlc3VsdC5saW5rZWRDb3VudCA+IDApIHtcclxuICAgICAgICBjbGVhclRpY2tldFNlbGVjdGlvbigpO1xyXG4gICAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcclxuICAgICAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoKTtcclxuICAgICAgICBjbGVhckV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KCk7XHJcbiAgICAgICAgY29uc3Qgc3VjY2Vzc01hcmsgPSByZXN1bHQuZmFpbGVkQ291bnQgPiAwIHx8IHJlc3VsdC5za2lwcGVkQ291bnQgPiAwID8gXCJ3YXJuaW5nUHJvY2Vzc1wiIDogXCJva1Byb2Nlc3NcIjtcclxuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoc3VjY2Vzc01hcmssIHN1Y2Nlc3NNYXJrID09PSBcIm9rUHJvY2Vzc1wiID8gMTIwMCA6IDE1MDApO1xyXG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsKGxpbmtTaGVldElkKSwge1xyXG4gICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcclxuICAgICAgICAgIGJ5cGFzc0d1YXJkT25jZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYXdhaXQgbG9hZExpc3QoY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLCBhY3RpdmVGaWx0ZXJzKTtcclxuXHJcbiAgICAgIGlmIChyZXN1bHQuZmFpbGVkQ291bnQgPiAwICYmIHJlc3VsdC5saW5rZWRDb3VudCA8IDEpIHtcclxuICAgICAgICBjb25zdCBmYWlsdXJlTWVzc2FnZSA9IHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpO1xyXG4gICAgICAgIHNldExpbmtGbG93U3RhdHVzKGZhaWx1cmVNZXNzYWdlKTtcclxuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyZXN1bHQuZmFpbGVkQ291bnQgPiAwIHx8IHJlc3VsdC5za2lwcGVkQ291bnQgPiAwKSB7XHJcbiAgICAgICAgc2V0TGlua0Zsb3dTdGF0dXMocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIikpO1xyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIndhcm5pbmdQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRMaW5rRmxvd1N0YXR1cyhyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKSk7XHJcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zdCBmYWlsdXJlTWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpO1xyXG4gICAgICBzZXRMaW5rRmxvd0Vycm9yKGZhaWx1cmVNZXNzYWdlKTtcclxuICAgICAgc2V0TGlua0Zsb3dTdGF0dXMoZmFpbHVyZU1lc3NhZ2UpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldExpbmtGbG93QnVzeShmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW1xyXG4gICAgYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwsXHJcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXHJcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxyXG4gICAgY2xlYXJUaWNrZXRTZWxlY3Rpb24sXHJcbiAgICBjdXJyZW50UGFnZSxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGV4Y2x1ZGVkSWRzLFxyXG4gICAgZmlsdGVyZWRTbmFwc2hvdCxcclxuICAgIGlzTGlua01vZGUsXHJcbiAgICBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlLFxyXG4gICAgbGlua0Zsb3dCdXN5LFxyXG4gICAgbGlua1NoZWV0SWQsXHJcbiAgICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZSxcclxuICAgIGxpbmtTaGVldExvY2tlZCxcclxuICAgIGxvYWRMaXN0LFxyXG4gICAgcmVzb2x2ZUFjdGl2ZUZpbHRlcnMsXHJcbiAgICByZXNvbHZlU2VsZWN0ZWRDb3VudCxcclxuICAgIHNlbGVjdGVkVGlja2V0cyxcclxuICAgIHRvdGFsLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBvcGVuTGlua0NvbmZpcm1Nb2RhbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghaXNMaW5rTW9kZSB8fCBzZWxlY3RlZFRpY2tldENvdW50IDwgMSB8fCBsaW5rRmxvd0J1c3kgfHwgbGlua1NoZWV0Q2hlY2tCdXN5IHx8IGxpbmtTaGVldExvY2tlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TGlua0Zsb3dFcnJvcihcIlwiKTtcclxuICAgIHNldExpbmtGbG93U3RhdHVzKFwiXCIpO1xyXG4gICAgb3BlbkNvbmZpcm0oe1xyXG4gICAgICB0aXRsZTogaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0xpbmtCdXR0b25cIiwgXCJWaW5jdWxhciB0aWNrZXQocylcIiksXHJcbiAgICAgIG1lc3NhZ2U6IGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmVcclxuICAgICAgICA/IGAke2luZFQoXCJOYXZfRXhwZW5zZVRpY2tldHNcIiwgXCJUaWNrZXRzXCIpfTogJHtzZWxlY3RlZFRpY2tldENvdW50fWBcclxuICAgICAgICA6IGAke2luZFQoXCJOYXZfRXhwZW5zZVRpY2tldHNcIiwgXCJUaWNrZXRzXCIpfTogJHtzZWxlY3RlZFRpY2tldENvdW50fVxcbiR7aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVG90YWxBbW91bnRcIiwgXCJUb3RhbCBhbW91bnRcIil9OiAke3NlbGVjdGVkVG90YWxBbW91bnRUZXh0fWAsXHJcbiAgICAgIGNvbmZpcm1UZXh0OiBpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfTGlua0J1dHRvblwiLCBcIlZpbmN1bGFyIHRpY2tldChzKVwiKSxcclxuICAgICAgY2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXHJcbiAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBydW5UaWNrZXRMaW5rRmxvdygpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSwgW1xyXG4gICAgaXNMaW5rTW9kZSxcclxuICAgIHNlbGVjdGVkVGlja2V0Q291bnQsXHJcbiAgICBsaW5rRmxvd0J1c3ksXHJcbiAgICBsaW5rU2hlZXRDaGVja0J1c3ksXHJcbiAgICBsaW5rU2hlZXRMb2NrZWQsXHJcbiAgICBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBzZWxlY3RlZFRvdGFsQW1vdW50VGV4dCxcclxuICAgIHJ1blRpY2tldExpbmtGbG93LFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRMaW5rRmxvd0Vycm9yKFwiXCIpO1xyXG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XHJcbiAgICAgIGJ1c3k6IGxpbmtGbG93QnVzeSxcclxuICAgICAgb25FcnJvcjogKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBzZXRMaW5rRmxvd0Vycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgIHNldExpbmtGbG93U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICB9LFxyXG4gICAgICBkZWZhdWx0RXJyb3JNZXNzYWdlOiBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIiksXHJcbiAgICB9KTtcclxuICB9LCBbaGFuZGxlQ29uZmlybSwgbGlua0Zsb3dCdXN5XSk7XHJcblxyXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XHJcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGxpbmtGbG93QnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICFsaW5rRmxvd0J1c3kgJiYgbGlua0Zsb3dFcnJvclxyXG4gICAgICA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKVxyXG4gICAgICA6IG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWxpbmtGbG93QnVzeSAmJiBsaW5rRmxvd0Vycm9yKSB7XHJcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2b2lkIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xyXG4gIH0sIFtjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbGlua0Zsb3dCdXN5LCBsaW5rRmxvd0Vycm9yXSk7XHJcblxyXG4gIGNvbnN0IG9wZW5UaWNrZXREZXRhaWwgPSB1c2VDYWxsYmFjayhcclxuICAgIChyYXdGaWxlSWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChyYXdGaWxlSWQpO1xyXG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3Qgc25hcHNob3QgPSBhcHBsaWVkRmlsdGVycyB8fCBjdXJyZW50RmlsdGVycztcclxuICAgICAgY29uc3QgY3VycmVudFN0YXRlID0ge1xyXG4gICAgICAgIGZpbHRlcnM6IHNuYXBzaG90LFxyXG4gICAgICAgIHBhZ2U6IGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSxcclxuICAgICAgICBzY3JvbGxZOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LnNjcm9sbFkgfHwgMCA6IDAsXHJcbiAgICAgICAgZm9jdXNGaWxlSWQ6IGZpbGVJZCxcclxuICAgICAgICBpdGVtcyxcclxuICAgICAgICB0b3RhbCxcclxuICAgICAgICBzZWxlY3RlZFRpY2tldHMsXHJcbiAgICAgICAgbGlua01vZGVTaGVldElkOiBpc0xpbmtNb2RlID8gbGlua1NoZWV0SWQgOiBcIlwiLFxyXG4gICAgICAgIHNlbGVjdGlvbk1vZGUsXHJcbiAgICAgICAgZXhjbHVkZWRJZHMsXHJcbiAgICAgICAgZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzOiBmaWx0ZXJlZFNuYXBzaG90LFxyXG4gICAgICAgIGZpbHRlcmVkU2VsZWN0aW9uVG90YWw6IGZpbHRlcmVkVG90YWxDb3VudCxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChpc0xpbmtNb2RlKSB7XHJcbiAgICAgICAgc2F2ZUNhY2hlZFN0YXRlKGN1cnJlbnRTdGF0ZSk7XHJcbiAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoe1xyXG4gICAgICAgICAgc2hlZXRJZDogbGlua1NoZWV0SWQsXHJcbiAgICAgICAgICBwYWdlOiBjdXJyZW50U3RhdGUucGFnZSxcclxuICAgICAgICAgIHNjcm9sbFk6IGN1cnJlbnRTdGF0ZS5zY3JvbGxZLFxyXG4gICAgICAgICAgZm9jdXNGaWxlSWQ6IGZpbGVJZCxcclxuICAgICAgICAgIGZpbHRlcnM6IHNuYXBzaG90LFxyXG4gICAgICAgICAgc2VsZWN0aW9uTW9kZSxcclxuICAgICAgICAgIHNlbGVjdGVkVGlja2V0cyxcclxuICAgICAgICAgIGV4Y2x1ZGVkSWRzLFxyXG4gICAgICAgICAgZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzOiBmaWx0ZXJlZFNuYXBzaG90LFxyXG4gICAgICAgICAgZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbDogZmlsdGVyZWRUb3RhbENvdW50LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGhhc1NoZWV0Q2FsbGVyQ29udGV4dCAmJiBzaGVldENhbGxlck9yaWdpbikge1xyXG4gICAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcclxuICAgICAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgICAgICBzaGVldElkOiBsaW5rU2hlZXRJZCxcclxuICAgICAgICAgICAgb3JpZ2luOiBzaGVldENhbGxlck9yaWdpbixcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcXVlcnkuc2V0KFwib3JpZ2luXCIsIHNoZWV0Q2FsbGVyT3JpZ2luKTtcclxuICAgICAgICAgIHF1ZXJ5LnNldChcInNoZWV0SWRcIiwgbGlua1NoZWV0SWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcclxuICAgICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICBieXBhc3NHdWFyZE9uY2U6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzYXZlQ2FjaGVkU3RhdGUoY3VycmVudFN0YXRlKTtcclxuICAgICAgaWYgKGhhc1NoZWV0Q2FsbGVyQ29udGV4dCAmJiBzaGVldENhbGxlck9yaWdpbikge1xyXG4gICAgICAgIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCh7XHJcbiAgICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgICBzaGVldElkOiBsaW5rU2hlZXRJZCxcclxuICAgICAgICAgIG9yaWdpbjogc2hlZXRDYWxsZXJPcmlnaW4sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICAgIGZpbGVJZCxcclxuICAgICAgICAgIG9yaWdpbjogc2hlZXRDYWxsZXJPcmlnaW4sXHJcbiAgICAgICAgICBzaGVldElkOiBsaW5rU2hlZXRJZCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcclxuICAgICAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgIGJ5cGFzc0d1YXJkT25jZTogZmFsc2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjbGVhckV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KCk7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD9maWxlSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoZmlsZUlkKX1gLCB7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiB0cnVlLFxyXG4gICAgICAgIGJ5cGFzc0d1YXJkT25jZTogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgYXBwbGllZEZpbHRlcnMsXHJcbiAgICAgIGN1cnJlbnRQYWdlLFxyXG4gICAgICBjdXJyZW50RmlsdGVycyxcclxuICAgICAgaGFzU2hlZXRDYWxsZXJDb250ZXh0LFxyXG4gICAgICBsaW5rU2hlZXRJZCxcclxuICAgICAgaXNMaW5rTW9kZSxcclxuICAgICAgaXRlbXMsXHJcbiAgICAgIGZpbHRlcmVkVG90YWxDb3VudCxcclxuICAgICAgZmlsdGVyZWRTbmFwc2hvdCxcclxuICAgICAgZXhjbHVkZWRJZHMsXHJcbiAgICAgIHNoZWV0Q2FsbGVyT3JpZ2luLFxyXG4gICAgICBzYXZlQ2FjaGVkU3RhdGUsXHJcbiAgICAgIHNhdmVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG4gICAgICBzZWxlY3RlZFRpY2tldHMsXHJcbiAgICAgIHNlbGVjdGlvbk1vZGUsXHJcbiAgICAgIHRvdGFsLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XHJcbiAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xyXG4gICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xyXG4gICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcclxuICAgIGlmICghdGltZWxpbmVDb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIGNhcmQ7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcclxuICAgIGNvbnRhaW5lclJlZjogdGltZWxpbmVDb250YWluZXJSZWYsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBpdGVtcyxcclxuICAgIHJlc29sdmVDbGlja2FibGVDYXJkLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKCh0b3RhbCB8fCAwKSAvIFBBR0VfU0laRSk7XHJcbiAgY29uc3Qgc2hvd0xpc3RMb2FkaW5nID0gaXNMb2FkaW5nO1xyXG4gIGNvbnN0IGxpbmtNb2RlU2VsZWN0aW9uQnV0dG9uc0Rpc2FibGVkID0gbGlua0Zsb3dCdXN5IHx8IHNlbGVjdEFsbEJ1c3kgfHwgaXNMb2FkaW5nO1xyXG5cclxuICBjb25zdCBzdW1tYXJ5SXRlbXMgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IHNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnM7XHJcbiAgICBpZiAoIXNuYXBzaG90KSByZXR1cm4gW10gYXMgQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9PjtcclxuXHJcbiAgICBjb25zdCBzdW1tYXJ5OiBBcnJheTx7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0+ID0gW107XHJcbiAgICBjb25zdCBsb2NhbGUgPSBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIjtcclxuICAgIGNvbnN0IGZyb21EYXRlVGV4dCA9IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShzbmFwc2hvdC5mcm9tRGF0ZSwgbG9jYWxlLCBcIlwiKTtcclxuICAgIGNvbnN0IHRvRGF0ZVRleHQgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoc25hcHNob3QudG9EYXRlLCBsb2NhbGUsIFwiXCIpO1xyXG5cclxuICAgIGlmIChmcm9tRGF0ZVRleHQgfHwgdG9EYXRlVGV4dCkge1xyXG4gICAgICBzdW1tYXJ5LnB1c2goe1xyXG4gICAgICAgIGtleTogXCJmcm9tRGF0ZVwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKSxcclxuICAgICAgICB2YWx1ZTogZnJvbURhdGVUZXh0IHx8IFwiLS1cIixcclxuICAgICAgfSk7XHJcbiAgICAgIHN1bW1hcnkucHVzaCh7XHJcbiAgICAgICAga2V5OiBcInRvRGF0ZVwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpLFxyXG4gICAgICAgIHZhbHVlOiB0b0RhdGVUZXh0IHx8IFwiLS1cIixcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNuYXBzaG90LmZpbHRlcktleS50cmltKCkpIHtcclxuICAgICAgc3VtbWFyeS5wdXNoKHtcclxuICAgICAgICBrZXk6IFwiZmlsdGVyS2V5XCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9GaWx0ZXJLZXlcIiwgXCJUaWNrZXRcIiksXHJcbiAgICAgICAgdmFsdWU6IHNuYXBzaG90LmZpbHRlcktleS50cmltKCksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzbmFwc2hvdC5jdXJyZW5jeUNvZGUudHJpbSgpKSB7XHJcbiAgICAgIHN1bW1hcnkucHVzaCh7XHJcbiAgICAgICAga2V5OiBcImN1cnJlbmN5XCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpLFxyXG4gICAgICAgIHZhbHVlOiBzbmFwc2hvdC5jdXJyZW5jeUNvZGUudHJpbSgpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc25hcHNob3Quc3RhdHVzRmlsdGVyICE9PSBcIlwiKSB7XHJcbiAgICAgIHN1bW1hcnkucHVzaCh7XHJcbiAgICAgICAga2V5OiBcInN0YXR1c1wiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzXCIsIFwiU3RhdHVzXCIpLFxyXG4gICAgICAgIHZhbHVlOiBnZXRFeHBlbnNlVGlja2V0U3RhdHVzTGFiZWwoc25hcHNob3Quc3RhdHVzRmlsdGVyKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNuYXBzaG90Lmdhc3RvVHlwZUZpbHRlciAhPT0gXCJcIikge1xyXG4gICAgICBjb25zdCBjYXRlZ29yeUxhYmVsID0gZ2FzdG9UeXBlTGFiZWxNYXAuZ2V0KFN0cmluZyhzbmFwc2hvdC5nYXN0b1R5cGVGaWx0ZXIpKSB8fCBTdHJpbmcoc25hcHNob3QuZ2FzdG9UeXBlRmlsdGVyKTtcclxuICAgICAgc3VtbWFyeS5wdXNoKHtcclxuICAgICAgICBrZXk6IFwiY2F0ZWdvcnlcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIiksXHJcbiAgICAgICAgdmFsdWU6IGNhdGVnb3J5TGFiZWwsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzbmFwc2hvdC5wcm9jZXNzZWRCeUlhRmlsdGVyICE9PSBcImFsbFwiKSB7XHJcbiAgICAgIHN1bW1hcnkucHVzaCh7XHJcbiAgICAgICAga2V5OiBcInByb2Nlc3NlZFwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQVwiLCBcIlByb2Nlc3NlZCBieSBJQVwiKSxcclxuICAgICAgICB2YWx1ZTpcclxuICAgICAgICAgIHNuYXBzaG90LnByb2Nlc3NlZEJ5SWFGaWx0ZXIgPT09IFwieWVzXCJcclxuICAgICAgICAgICAgPyBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9ZZXNcIiwgXCJZZXNcIilcclxuICAgICAgICAgICAgOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9Ob1wiLCBcIk5vXCIpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3VtbWFyeTtcclxuICB9LCBbYXBwbGllZEZpbHRlcnMsIGdhc3RvVHlwZUxhYmVsTWFwXSk7XHJcblxyXG4gIGNvbnN0IHNob3dTdW1tYXJ5ID0gIWlzTGlua01vZGUgJiYgIXNob3dGaWx0ZXJzICYmIHN1bW1hcnlJdGVtcy5sZW5ndGggPiAwO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc0xpbmtNb2RlKSByZXR1cm47XHJcbiAgICBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKHtcclxuICAgICAgYWN0aXZlOiB0cnVlLFxyXG4gICAgICBtZXNzYWdlOiBsaW5rTW9kZUNhbmNlbE1lc3NhZ2UsXHJcbiAgICB9KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCgpO1xyXG4gICAgfTtcclxuICB9LCBbaXNMaW5rTW9kZSwgbGlua01vZGVDYW5jZWxNZXNzYWdlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6ZW50ZXJcIiwge1xyXG4gICAgICB1cmw6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cubG9jYXRpb24uaHJlZiA6IFwiXCIsXHJcbiAgICAgIGRpZFJlc3RvcmVPbk1vdW50OiBkaWRSZXN0b3JlT25Nb3VudFJlZi5jdXJyZW50LFxyXG4gICAgICBoYXNBY2Nlc3MsXHJcbiAgICAgIGlzTGlua01vZGUsXHJcbiAgICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICAgIH0pO1xyXG4gICAgaWYgKGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQpIHtcclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNXYXJuKFwibW91bnRSZXN0b3JlRWZmZWN0OnNraXAtYWxyZWFkeS1yZXN0b3JlZFwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCFoYXNBY2Nlc3MpIHtcclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNXYXJuKFwibW91bnRSZXN0b3JlRWZmZWN0OnNraXAtbm8tYWNjZXNzXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc0xpbmtNb2RlKSB7XHJcbiAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICBjb25zdCB0aWNrZXRGaWxlSWQgPSBzYWZlVGV4dCh1cmwuc2VhcmNoUGFyYW1zLmdldChcInRpY2tldEZpbGVJZFwiKSk7XHJcbiAgICAgIGlmICh0aWNrZXRGaWxlSWQpIHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6dGlja2V0LWNyZWF0ZS1yZXR1cm4tZGV0ZWN0ZWRcIiwge1xyXG4gICAgICAgICAgdGlja2V0RmlsZUlkLFxyXG4gICAgICAgICAgdGlja2V0RGF0ZTogdXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJ0aWNrZXREYXRlXCIpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgICAgIGFwcGx5Q3JlYXRlZFRpY2tldFJldHVybih0aWNrZXRGaWxlSWQsIHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwidGlja2V0RGF0ZVwiKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkpIHtcclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNXYXJuKFwibW91bnRSZXN0b3JlRWZmZWN0OndhaXRpbmctbWFuYWdlbWVudC1ib290c3RyYXBcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgY29uc3QgaXNIaXN0b3J5QmFja0ZvcndhcmQgPSBpc0V4cGVuc2VIaXN0b3J5QmFja0ZvcndhcmROYXZpZ2F0aW9uKCk7XHJcbiAgICBjb25zdCBpc1JldHVybkZyb21UaWNrZXREZXRhaWwgPSBoYXNFeHBlbnNlUmV0dXJuUmVmZXJyZXIoW1xyXG4gICAgICBcIi9HYXN0b3MvVGlja2V0RGV0YWlsXCIsXHJcbiAgICAgIFwiL0dhc3Rvcy9UaWNrZXRMaW5lRGV0YWlsXCIsXHJcbiAgICBdKTtcclxuICAgIGNvbnN0IHJldHVybk1vZGUgPSBjb25zdW1lUmV0dXJuTW9kZSgpO1xyXG4gICAgY29uc3QgaGFzUmV0dXJuRmxhZyA9IGNvbnN1bWVSZXR1cm5GbGFnKCk7XHJcblxyXG4gICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OnJlc29sdmVkLXJldHVybi1zdGF0ZVwiLCB7XHJcbiAgICAgIGlzSGlzdG9yeUJhY2tGb3J3YXJkLFxyXG4gICAgICBpc1JldHVybkZyb21UaWNrZXREZXRhaWwsXHJcbiAgICAgIHJldHVybk1vZGUsXHJcbiAgICAgIGhhc1JldHVybkZsYWcsXHJcbiAgICAgIGlzTGlua01vZGUsXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocmV0dXJuTW9kZSA9PT0gXCJyZXNldF9maWx0ZXJzXCIgJiYgaGFzUmV0dXJuRmxhZykge1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6cmVzdG9yZS1kZWxldGUtcmV0dXJuXCIpO1xyXG4gICAgICByZXN0b3JlRGVsZXRlUmV0dXJuU3RhdGUoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc0xpbmtNb2RlKSB7XHJcbiAgICAgIGNvbnN0IGlzUmV0dXJuaW5nRnJvbURldGFpbCA9IGhhc1JldHVybkZsYWcgfHwgaXNIaXN0b3J5QmFja0ZvcndhcmQgfHwgaXNSZXR1cm5Gcm9tVGlja2V0RGV0YWlsO1xyXG4gICAgICBjb25zdCBjYWNoZWRTdGF0ZSA9IGlzUmV0dXJuaW5nRnJvbURldGFpbCA/IHJlYWRDYWNoZWRTdGF0ZSgpIDogbnVsbDtcclxuICAgICAgY29uc3QgY2FjaGVkU2hlZXRJZCA9IHNhZmVUZXh0KGNhY2hlZFN0YXRlPy5saW5rTW9kZVNoZWV0SWQpO1xyXG4gICAgICBpZiAoY2FjaGVkU3RhdGUgJiYgY2FjaGVkU2hlZXRJZCAmJiBjYWNoZWRTaGVldElkID09PSBzYWZlVGV4dChsaW5rU2hlZXRJZCkpIHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6cmVzdG9yZS1saW5rLW1vZGUtY2FjaGVcIiwge1xyXG4gICAgICAgICAgY2FjaGVkU2hlZXRJZCxcclxuICAgICAgICAgIHBhZ2U6IGNhY2hlZFN0YXRlLnBhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKCk7XHJcbiAgICAgICAgcmVzdG9yZUxpbmtNb2RlUmV0dXJuU3RhdGUoY2FjaGVkU3RhdGUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbGlua1JldHVyblN0YXRlID0gaXNSZXR1cm5pbmdGcm9tRGV0YWlsID8gcmVhZEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUobGlua1NoZWV0SWQpIDogbnVsbDtcclxuICAgICAgaWYgKGxpbmtSZXR1cm5TdGF0ZSkge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXN0b3JlLWxpbmstbW9kZS1yZXR1cm4tc3RhdGVcIiwge1xyXG4gICAgICAgICAgc2hlZXRJZDogbGlua1JldHVyblN0YXRlLnNoZWV0SWQsXHJcbiAgICAgICAgICBwYWdlOiBsaW5rUmV0dXJuU3RhdGUucGFnZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoKTtcclxuICAgICAgICByZXN0b3JlTGlua01vZGVSZXR1cm5TdGF0ZSh7XHJcbiAgICAgICAgICBmaWx0ZXJzOiBsaW5rUmV0dXJuU3RhdGUuZmlsdGVycyxcclxuICAgICAgICAgIHBhZ2U6IGxpbmtSZXR1cm5TdGF0ZS5wYWdlLFxyXG4gICAgICAgICAgc2Nyb2xsWTogbGlua1JldHVyblN0YXRlLnNjcm9sbFksXHJcbiAgICAgICAgICBmb2N1c0ZpbGVJZDogbGlua1JldHVyblN0YXRlLmZvY3VzRmlsZUlkLFxyXG4gICAgICAgICAgaXRlbXM6IFtdLFxyXG4gICAgICAgICAgc2VsZWN0ZWRUaWNrZXRzOiBsaW5rUmV0dXJuU3RhdGUuc2VsZWN0ZWRUaWNrZXRzLFxyXG4gICAgICAgICAgdG90YWw6IDAsXHJcbiAgICAgICAgICBsaW5rTW9kZVNoZWV0SWQ6IGxpbmtSZXR1cm5TdGF0ZS5zaGVldElkLFxyXG4gICAgICAgICAgc2VsZWN0aW9uTW9kZTogbGlua1JldHVyblN0YXRlLnNlbGVjdGlvbk1vZGUsXHJcbiAgICAgICAgICBleGNsdWRlZElkczogbGlua1JldHVyblN0YXRlLmV4Y2x1ZGVkSWRzLFxyXG4gICAgICAgICAgZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzOiBsaW5rUmV0dXJuU3RhdGUuZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzLFxyXG4gICAgICAgICAgZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbDogbGlua1JldHVyblN0YXRlLmZpbHRlcmVkU2VsZWN0aW9uVG90YWwsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6cmVzdG9yZS1pbml0aWFsLWxpbmstbW9kZVwiKTtcclxuICAgICAgcmVzdG9yZUluaXRpYWxMaW5rTW9kZVN0YXRlKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWhhc1JldHVybkZsYWcgJiYgIWlzSGlzdG9yeUJhY2tGb3J3YXJkICYmICFpc1JldHVybkZyb21UaWNrZXREZXRhaWwpIHtcclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OmNsZWFyLWNhY2hlLW5vLXJldHVybi1jb250ZXh0XCIpO1xyXG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjYWNoZWRTdGF0ZSA9IHJlYWRDYWNoZWRTdGF0ZSgpO1xyXG4gICAgaWYgKCFjYWNoZWRTdGF0ZSkge1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c1dhcm4oXCJtb3VudFJlc3RvcmVFZmZlY3Q6bm8tY2FjaGVkLXN0YXRlXCIpO1xyXG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6cmVzdG9yZS1zdGFuZGFyZC1jYWNoZVwiLCB7XHJcbiAgICAgIHBhZ2U6IGNhY2hlZFN0YXRlLnBhZ2UsXHJcbiAgICAgIGZvY3VzRmlsZUlkOiBjYWNoZWRTdGF0ZS5mb2N1c0ZpbGVJZCxcclxuICAgIH0pO1xyXG4gICAgcmVzdG9yZVN0YW5kYXJkUmV0dXJuU3RhdGUoY2FjaGVkU3RhdGUpO1xyXG4gIH0sIFtcclxuICAgIGFwcGx5Q3JlYXRlZFRpY2tldFJldHVybixcclxuICAgIGNsZWFyQ2FjaGVkU3RhdGUsXHJcbiAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsXHJcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcclxuICAgIGNvbnN1bWVSZXR1cm5Nb2RlLFxyXG4gICAgaGFzQWNjZXNzLFxyXG4gICAgaXNMaW5rTW9kZSxcclxuICAgIGxpbmtTaGVldElkLFxyXG4gICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gICAgcmVhZENhY2hlZFN0YXRlLFxyXG4gICAgcmVhZEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsXHJcbiAgICByZXN0b3JlRGVsZXRlUmV0dXJuU3RhdGUsXHJcbiAgICByZXN0b3JlSW5pdGlhbExpbmtNb2RlU3RhdGUsXHJcbiAgICByZXN0b3JlTGlua01vZGVSZXR1cm5TdGF0ZSxcclxuICAgIHJlc3RvcmVTdGFuZGFyZFJldHVyblN0YXRlLFxyXG4gIF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGlzTG9hZGluZykgcmV0dXJuO1xyXG4gICAgaWYgKHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPT0gbnVsbCAmJiAhcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBwZW5kaW5nU2Nyb2xsWSA9IHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQ7XHJcbiAgICBjb25zdCBwZW5kaW5nRm9jdXNGaWxlSWQgPSBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudDtcclxuICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSBcIlwiO1xyXG5cclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICBpZiAocGVuZGluZ1Njcm9sbFkgIT0gbnVsbCkge1xyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICB0b3A6IE1hdGgubWF4KDAsIHBlbmRpbmdTY3JvbGxZKSxcclxuICAgICAgICAgIGJlaGF2aW9yOiBcImF1dG9cIixcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFwZW5kaW5nRm9jdXNGaWxlSWQgfHwgIXRpbWVsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRGb2N1c0lkID0gcGVuZGluZ0ZvY3VzRmlsZUlkLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgIGNvbnN0IHRpbWVsaW5lSXRlbXMgPSBBcnJheS5mcm9tKFxyXG4gICAgICAgIHRpbWVsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtaXRlbVtkYXRhLXRpY2tldC1maWxlLWlkXVwiKVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBtYXRjaGluZ0l0ZW0gPSB0aW1lbGluZUl0ZW1zLmZpbmQoKGl0ZW0pID0+IHtcclxuICAgICAgICByZXR1cm4gc2FmZVRleHQoaXRlbS5kYXRhc2V0LnRpY2tldEZpbGVJZCkudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZEZvY3VzSWQ7XHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCB0YXJnZXRDYXJkID0gbWF0Y2hpbmdJdGVtPy5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XHJcbiAgICAgIGlmICghdGFyZ2V0Q2FyZCkgcmV0dXJuO1xyXG5cclxuICAgICAgdGFyZ2V0Q2FyZC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XHJcbiAgICB9KTtcclxuICB9LCBbaXNMb2FkaW5nLCBpdGVtcy5sZW5ndGhdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5IHx8ICFoYXNBY2Nlc3MpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVQYWdlU2hvdyA9IChldmVudDogUGFnZVRyYW5zaXRpb25FdmVudCkgPT4ge1xyXG4gICAgICBpZiAoIWV2ZW50LnBlcnNpc3RlZCAmJiAhaXNFeHBlbnNlSGlzdG9yeUJhY2tGb3J3YXJkTmF2aWdhdGlvbigpKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBzbmFwc2hvdCA9IHJlc29sdmVBY3RpdmVGaWx0ZXJzKCk7XHJcbiAgICAgIGlmICghaXNMaW5rTW9kZSAmJiAoIXNuYXBzaG90LmZyb21EYXRlIHx8ICFzbmFwc2hvdC50b0RhdGUpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBydW5BdXRvbWF0aWNMaXN0TG9hZChjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsIHNuYXBzaG90LCB7XHJcbiAgICAgICAgY2xlYXJDYWNoZTogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgaGFuZGxlUGFnZVNob3cpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBoYW5kbGVQYWdlU2hvdyk7XHJcbiAgICB9O1xyXG4gIH0sIFtjdXJyZW50UGFnZSwgaGFzQWNjZXNzLCBpc0xpbmtNb2RlLCBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksIHJlc29sdmVBY3RpdmVGaWx0ZXJzLCBydW5BdXRvbWF0aWNMaXN0TG9hZF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgb25Ub2dnbGVGaWx0ZXJzID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCB3aWxsT3BlbiA9ICFzaG93RmlsdGVycztcclxuICAgICAgdG9nZ2xlRmlsdGVyUGFuZWwoKTtcclxuICAgICAgaWYgKHdpbGxPcGVuKSB7XHJcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHsgdG9wOiAwLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvblJlZnJlc2ggPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnMoKTtcclxuICAgICAgaWYgKCFpc0xpbmtNb2RlICYmICghc25hcHNob3Q/LmZyb21EYXRlIHx8ICFzbmFwc2hvdD8udG9EYXRlKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB2b2lkIGxvYWRMaXN0KGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSwgc25hcHNob3QpO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXRpY2tldHMtdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XHJcbiAgICB9O1xyXG4gIH0sIFtjdXJyZW50UGFnZSwgaXNMaW5rTW9kZSwgbG9hZExpc3QsIHJlc29sdmVBY3RpdmVGaWx0ZXJzLCBzaG93RmlsdGVycywgdG9nZ2xlRmlsdGVyUGFuZWxdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXtsaW5rRmxvd0J1c3l9XHJcbiAgICAgICAgZXJyb3I9e2xpbmtGbG93RXJyb3J9XHJcbiAgICAgICAgc3RhdHVzPXtsaW5rRmxvd1N0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17Y2xvc2VDb25maXJtfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgcmVmPXtjYW1lcmFJbnB1dFJlZn1cclxuICAgICAgICB0eXBlPVwiZmlsZVwiXHJcbiAgICAgICAgYWNjZXB0PXtUSUNLRVRfSU1BR0VfQUNDRVBUX0FUVFJJQlVURX1cclxuICAgICAgICBjYXB0dXJlPVwiZW52aXJvbm1lbnRcIlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXHJcbiAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZmlsZXM/LlswXSB8fCBudWxsO1xyXG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICB2b2lkIGhhbmRsZVNlbGVjdGVkRmlsZShmaWxlLCBcImNhbWVyYVwiKTtcclxuICAgICAgICB9fVxyXG4gICAgICAvPlxyXG4gICAgICA8aW5wdXRcclxuICAgICAgICByZWY9e2dhbGxlcnlJbnB1dFJlZn1cclxuICAgICAgICB0eXBlPVwiZmlsZVwiXHJcbiAgICAgICAgYWNjZXB0PXtUSUNLRVRfSU1BR0VfQUNDRVBUX0FUVFJJQlVURX1cclxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxyXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmZpbGVzPy5bMF0gfHwgbnVsbDtcclxuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgdm9pZCBoYW5kbGVTZWxlY3RlZEZpbGUoZmlsZSwgXCJnYWxsZXJ5XCIpO1xyXG4gICAgICAgIH19XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICB7IWlzTGlua01vZGUgJiYgc291cmNlUGlja2VyT3BlbiA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzQ1IHB4LTQgcHktNlwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctc20gcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgcC00IHNoYWRvdy14bFwiPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtWzE2cHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS04MDBcIj5cclxuICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9UaXRsZVwiLCBcIk51ZXZvIHRpY2tldFwiKX1cclxuICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgICAge2luZFQoXHJcbiAgICAgICAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9Cb2R5XCIsXHJcbiAgICAgICAgICAgICAgICBcIlNlbGVjY2lvbmEgdW5hIGZ1ZW50ZSBwYXJhIGNhcHR1cmFyIG8gZWxlZ2lyIGxhIGltYWdlbiBkZWwgdGlja2V0LlwiXHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9wPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IGdyaWQgZ3JpZC1jb2xzLTEgZ2FwLTJcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZvaWQgc2VsZWN0RnJvbUNhbWVyYShjYW1lcmFJbnB1dFJlZi5jdXJyZW50KTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfQ2FtZXJhXCIsIFwiVXNhciBjXHUwMEUxbWFyYVwiKX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RGcm9tR2FsbGVyeShnYWxsZXJ5SW5wdXRSZWYuY3VycmVudCl9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfR2FsbGVyeVwiLCBcIkVsZWdpciBpbWFnZW5cIil9XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17Y2xvc2VTb3VyY2VQaWNrZXJ9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHshaXNMaW5rTW9kZSA/IChcclxuICAgICAgICA8RXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5XHJcbiAgICAgICAgICBvcGVuPXtxdWlja1RpY2tldEJ1c3l9XHJcbiAgICAgICAgICB0aXRsZT17aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX1RpdGxlXCIsIFwiUHJvY2Vzc2luZyB0aWNrZXRcIil9XHJcbiAgICAgICAgICBzdW1tYXJ5PXtxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICAgICAgZWxhcHNlZE1zPXtxdWlja1RpY2tldEVsYXBzZWRNc31cclxuICAgICAgICAgIHN0YWdlcz17cXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlc31cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHshaXNMaW5rTW9kZSAmJiBxdWlja1RpY2tldEVycm9yTWVzc2FnZSA/IChcclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZVxyXG4gICAgICAgICAgICAgID8gXCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1hbWJlci0yMDAgYmctYW1iZXItNTAgcC0zIHRleHQtc20gdGV4dC1hbWJlci05MDBcIlxuICAgICAgICAgICAgICA6IFwiZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgc3BhY2UteS0yIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctcm9zZS01MCBwLTMgdGV4dC1zbSB0ZXh0LXJvc2UtODAwXCJcbiAgICAgICAgICB9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHA+e3F1aWNrVGlja2V0RXJyb3JNZXNzYWdlfTwvcD5cclxuICAgICAgICAgIHtxdWlja1RpY2tldEF0dGVtcHRJZCA/IChcclxuICAgICAgICAgICAgPHBcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmVcclxuICAgICAgICAgICAgICAgICAgPyBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItYW1iZXItMjAwIGJnLXdoaXRlIHB4LTIgcHktMSBmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1hbWJlci05MDAgYnJlYWstYWxsXCJcbiAgICAgICAgICAgICAgICAgIDogXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXdoaXRlIHB4LTIgcHktMSBmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1yb3NlLTgwMCBicmVhay1hbGxcIlxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7YGF0dGVtcHRJZDogJHtxdWlja1RpY2tldEF0dGVtcHRJZH1gfVxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgIHtxdWlja1RpY2tldFRyYWNlTGlzdC5sZW5ndGggPiAwID8gKFxyXG4gICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcclxuICAgICAgICAgICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlXHJcbiAgICAgICAgICAgICAgICAgID8gXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBiZy13aGl0ZSBwLTIgdGV4dC14cyB0ZXh0LWFtYmVyLTgwMFwiXG4gICAgICAgICAgICAgICAgICA6IFwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy13aGl0ZSBwLTIgdGV4dC14cyB0ZXh0LXJvc2UtNzAwXCJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lm1hcCgoZW50cnkpID0+IChcclxuICAgICAgICAgICAgICAgIDxwIGtleT17YCR7ZW50cnkuc3RlcH0tJHtlbnRyeS5hdH1gfT57YCR7ZW50cnkuc3RlcH06ICR7ZW50cnkudHJhY2VJZH1gfTwvcD5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTJcIj5cclxuICAgICAgICAgICAge2hhc1BhcnRpYWxUaWNrZXRGYWlsdXJlID8gKFxyXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIiBvbkNsaWNrPXtvcGVuQ3JlYXRlZFRpY2tldH0+XHJcbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X09wZW5DcmVhdGVkVGlja2V0XCIsIFwiT3BlbiBjcmVhdGVkIHRpY2tldFwiKX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgIHtoYXNQZW5kaW5nVXBsb2FkUmV0cnkgPyAoXHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCJcclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgdm9pZCByZXRyeVBlbmRpbmdVcGxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9SZXRyeVVwbG9hZFwiLCBcIlJlaW50ZW50YXIgdXBsb2FkXCIpfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiIG9uQ2xpY2s9e2NsZWFyUXVpY2tUaWNrZXRFcnJvcn0+XHJcbiAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2xvc2VcIiwgXCJDbG9zZVwiKX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICB7c2hvd1N1bW1hcnkgPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItY2FyZCBmaWx0ZXItY2FyZC0tc3VtbWFyeSBwLTMgc206cC00IG10LTEgbWItM1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJleHBlbnNlLXN1bW1hcnktZ3JpZCBncmlkIGdyaWQtY29scy0xIG1pbi1bMzYwcHhdOmdyaWQtY29scy0yIGl0ZW1zLXN0YXJ0IGdhcC14LTQgZ2FwLXktMSB0ZXh0LXhzXCI+XHJcbiAgICAgICAgICAgIHtzdW1tYXJ5SXRlbXMubWFwKChpdGVtKSA9PiAoXHJcbiAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAga2V5PXtpdGVtLmtleX1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN1bW1hcnkgaGlzdG9yeS1maWx0ZXItc3VtbWFyeS0tZ3JpZC1pdGVtIGxlYWRpbmctNSBtaW4tdy0wXCJcclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdW1tYXJ5X19sYWJlbCBmb250LXNlbWlib2xkXCI+e2l0ZW0ubGFiZWx9Ojwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN1bW1hcnlfX3ZhbHVlIGJyZWFrLXdvcmRzXCI+e2l0ZW0udmFsdWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIDxFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbFxyXG4gICAgICAgIG1vZGU9e2lzTGlua01vZGUgPyBcImxpbmtcIiA6IFwiZ2VuZXJhbFwifVxyXG4gICAgICAgIHZpc2libGU9e3Nob3dGaWx0ZXJzfVxyXG4gICAgICAgIHNob3dNYW51YWxEYXRlRmlsdGVyPXtzaG93TWFudWFsRGF0ZUZpbHRlcn1cclxuICAgICAgICBtYW51YWxEYXRlQXV0b09wZW5LZXk9e21hbnVhbERhdGVBdXRvT3BlbktleX1cclxuICAgICAgICBmcm9tRGF0ZT17ZnJvbURhdGV9XHJcbiAgICAgICAgdG9EYXRlPXt0b0RhdGV9XHJcbiAgICAgICAgZmlsdGVyS2V5PXtmaWx0ZXJLZXl9XHJcbiAgICAgICAgY3VycmVuY3lDb2RlPXtjdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgbWFuYWdlZFVzZXJJZD17bWFuYWdlZFVzZXJJZH1cclxuICAgICAgICBtYW5hZ2VkVXNlcnM9e21hbmFnZWRVc2Vyc31cclxuICAgICAgICBzaG93TWFuYWdlZFVzZXJGaWx0ZXI9e3Nob3dNYW5hZ2VkVXNlckZpbHRlcn1cclxuICAgICAgICBzdGF0dXNGaWx0ZXI9e3N0YXR1c0ZpbHRlcn1cclxuICAgICAgICBnYXN0b1R5cGVGaWx0ZXI9e2dhc3RvVHlwZUZpbHRlcn1cclxuICAgICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyPXtwcm9jZXNzZWRCeUlhRmlsdGVyfVxyXG4gICAgICAgIGFjdGl2ZVF1aWNrRmlsdGVyPXthY3RpdmVRdWlja0ZpbHRlcn1cclxuICAgICAgICBzaG93TWFudWFsRGF0ZUVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yfVxyXG4gICAgICAgIHN0YXR1c0ZpbHRlclJlYWRPbmx5PXtzdGF0dXNGaWx0ZXJMb2NrZWR9XHJcbiAgICAgICAgZml4ZWRTdGF0dXNGaWx0ZXI9e2ZpeGVkU3RhdHVzRmlsdGVyfVxyXG4gICAgICAgIGdhc3RvVHlwZU9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XHJcbiAgICAgICAgb25EYXRlUmFuZ2VDaGFuZ2U9e29uRGF0ZVJhbmdlQ2hhbmdlfVxyXG4gICAgICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZT17b25NYW51YWxSYW5nZUNvbXBsZXRlfVxyXG4gICAgICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2U9e29uUXVpY2tGaWx0ZXJDaGFuZ2V9XHJcbiAgICAgICAgb25GaWx0ZXJLZXlDaGFuZ2U9e3NldEZpbHRlcktleX1cclxuICAgICAgICBvbkN1cnJlbmN5Q29kZUNoYW5nZT17c2V0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgIG9uTWFuYWdlZFVzZXJJZENoYW5nZT17c2V0TWFuYWdlZFVzZXJJZH1cclxuICAgICAgICBvblN0YXR1c0ZpbHRlckNoYW5nZT17c2V0U3RhdHVzRmlsdGVyfVxyXG4gICAgICAgIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlPXtzZXRHYXN0b1R5cGVGaWx0ZXJ9XHJcbiAgICAgICAgb25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlPXtzZXRQcm9jZXNzZWRCeUlhRmlsdGVyfVxyXG4gICAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XHJcbiAgICAgICAgb25BcHBseT17b25BcHBseX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtpc0xpbmtNb2RlID8gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIHB4LTAuNVwiPlxyXG4gICAgICAgICAgeyFjYW5Qcm9jZXNzTGlua01vZGUgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXJvc2UtNzAwXCI+e2luZFQoXCJBdXRoX1Blcm1pc3Npb25EZW5pZWRfQm9keVwiLCBcIk5vIHBlcm1pc3Npb24uXCIpfTwvZGl2PlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAge2NhblByb2Nlc3NMaW5rTW9kZSAmJiBsaW5rU2hlZXRDaGVja0J1c3kgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiPlxyXG4gICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9IC8+XHJcbiAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgIHtjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiBzZWxlY3RBbGxCdXN5ID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIj5cclxuICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfSAvPlxyXG4gICAgICAgICAgICAgIDxzcGFuPntpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmICFsaW5rU2hlZXRDaGVja0J1c3kgJiYgbGlua1NoZWV0TG9ja2VkID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1yb3NlLTcwMFwiPlxyXG4gICAgICAgICAgICAgIHtsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZSB8fFxyXG4gICAgICAgICAgICAgICAgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1JlYWRPbmx5QnlTdGF0dXNcIiwgXCJObyBzZSBwdWVkZSBlZGl0YXIgZXN0YSBob2phIGRlIGdhc3RvcyBlbiBlbCBlc3RhZG8gYWN0dWFsLlwiKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmICFsaW5rU2hlZXRDaGVja0J1c3kgJiYgIWxpbmtTaGVldExvY2tlZCAmJiBzZWxlY3RBbGxFcnJvciA/IChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtcm9zZS03MDBcIj57c2VsZWN0QWxsRXJyb3J9PC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmICFsaW5rU2hlZXRDaGVja0J1c3kgJiYgIWxpbmtTaGVldExvY2tlZCA/IChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTUgZ3JpZCBncmlkLWNvbHMtMiBnYXAtMS41IHB0LTAuNSBzbTptYi02XCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgbWluLXctMCBweC0xLjUgcHktMSB0ZXh0LVsxMHB4XSBsZWFkaW5nLXRpZ2h0IHNtOnRleHQteHNcIlxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBzZWxlY3RBbGxNYXRjaGluZ1RpY2tldHMoKTtcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xpbmtNb2RlU2VsZWN0aW9uQnV0dG9uc0Rpc2FibGVkIHx8IHRvdGFsIDwgMX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9TZWxlY3RBbGxcIiwgXCJTZWxlY2Npb25hciB0b2RvXCIpfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgbWluLXctMCBweC0xLjUgcHktMSB0ZXh0LVsxMHB4XSBsZWFkaW5nLXRpZ2h0IHNtOnRleHQteHNcIlxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbGVhclRpY2tldFNlbGVjdGlvbn1cclxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xpbmtNb2RlU2VsZWN0aW9uQnV0dG9uc0Rpc2FibGVkIHx8IHNlbGVjdGVkVGlja2V0Q291bnQgPCAxfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0NsZWFyQWxsXCIsIFwiQm9ycmFyIHNlbGVjY2lcdTAwRjNuXCIpfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAge2lzTGlua01vZGUgPyA8RXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeSByZXN1bHQ9e2xpbmtCdWxrUmVzdWx0fSAvPiA6IG51bGx9XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCJcclxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBzaG93TGlzdExvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XHJcbiAgICAgID5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxyXG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge2Vycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57ZXJyb3JNZXNzYWdlfTwvZGl2PiA6IG51bGx9XHJcblxyXG4gICAgICB7IXNob3dMaXN0TG9hZGluZyAmJiAhZXJyb3JNZXNzYWdlICYmIGl0ZW1zLmxlbmd0aCA9PT0gMCA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveCB0aW1lbGluZS1lbXB0eVwiIGRhdGEtZW1wdHktdGV4dD17aW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpfSAvPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHshZXJyb3JNZXNzYWdlICYmIGl0ZW1zLmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgPGRpdiByZWY9e3RpbWVsaW5lQ29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cclxuICAgICAgICAgIHtpdGVtcy5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQoaXRlbS5maWxlSWQpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRlUGFydHMgPSBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzKGl0ZW0udHJhbnNEYXRlLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gc2FmZVRleHQoaXRlbS5kZXNjcmlwdGlvbikgfHwgc2FmZVRleHQoaXRlbS5maWxlTmFtZSkgfHwgZmlsZUlkIHx8IFwiLVwiO1xyXG4gICAgICAgICAgICBjb25zdCBhbW91bnRUZXh0ID0gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGl0ZW0udG90YWxBbW91bnQgPz8gbnVsbCwgc2FmZVRleHQoaXRlbS5jdXJyZW5jeUNvZGUpKTtcclxuICAgICAgICAgICAgY29uc3Qgc3RhdHVzQ29kZSA9IGl0ZW0ua2luZCA9PT0gXCJnZW5lcmFsXCIgPyBpdGVtLnN0YXR1cyA6IG51bGw7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1c0xhYmVsID0gc3RhdHVzQ29kZSA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbChzdGF0dXNDb2RlKTtcclxuICAgICAgICAgICAgY29uc3QgaXNBc3NpZ25lZFRvRXhwZW5zZVNoZWV0ID0gc3RhdHVzQ29kZSA9PT0gMTtcclxuICAgICAgICAgICAgY29uc3Qgc2hvd1Byb2Nlc3NlZEJ5QWlJY29uID0gaXRlbS5wcm9jZXNzZWRCeUFJID09PSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGFibGVJbkxpbmtNb2RlID0gaXNMaW5rTW9kZSAmJiBjYW5TZWxlY3RUaWNrZXRGb3JMaW5rKGl0ZW0pO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkSW5MaW5rTW9kZSA9IGlzTGlua01vZGUgJiYgaXNMaW5rVGlja2V0U2VsZWN0ZWQoZmlsZUlkKTtcclxuICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkQnlBaUxhYmVsID0gaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdFRpY2tldExhYmVsID0gaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1NlbGVjdFRpY2tldFwiLCBcIlNlbGVjY2lvbmFyIHRpY2tldFwiKTtcclxuICAgICAgICAgICAgY29uc3QgZ2FzdG9UeXBlQ29kZSA9IGl0ZW0uZ2FzdG9UeXBlID09PSBudWxsID8gXCJcIiA6IFN0cmluZyhpdGVtLmdhc3RvVHlwZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGdhc3RvVHlwZUxhYmVsID0gZ2FzdG9UeXBlQ29kZVxyXG4gICAgICAgICAgICAgID8gZ2FzdG9UeXBlTGFiZWxNYXAuZ2V0KGdhc3RvVHlwZUNvZGUpIHx8IGdhc3RvVHlwZUNvZGVcclxuICAgICAgICAgICAgICA6IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBjYXJkU3VidGl0bGUgPSBnYXN0b1R5cGVMYWJlbDtcclxuICAgICAgICAgICAgY29uc3QgdGlja2V0Q2FyZEtleSA9XHJcbiAgICAgICAgICAgICAgZmlsZUlkIHx8XHJcbiAgICAgICAgICAgICAgYCR7c2FmZVRleHQoaXRlbS5maWxlTmFtZSl9LSR7c2FmZVRleHQoaXRlbS50cmFuc0RhdGUpfS0ke3NhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pfS0ke1N0cmluZyhpdGVtLnRvdGFsQW1vdW50ID8/IFwiXCIpfWA7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNMaW5rTW9kZSAmJiBpdGVtLmtpbmQgPT09IFwibGlua1wiKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbVxyXG4gICAgICAgICAgICAgICAgICBrZXk9e3RpY2tldENhcmRLZXl9XHJcbiAgICAgICAgICAgICAgICAgIGZpbGVJZD17ZmlsZUlkfVxyXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxyXG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZT17Y2FyZFN1YnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxyXG4gICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkPXtpc1NlbGVjdGVkSW5MaW5rTW9kZX1cclxuICAgICAgICAgICAgICAgICAgaXNTZWxlY3RhYmxlPXtpc1NlbGVjdGFibGVJbkxpbmtNb2RlfVxyXG4gICAgICAgICAgICAgICAgICBzZWxlY3Rpb25EaXNhYmxlZD17bGlua0Zsb3dCdXN5IHx8IGxpbmtTaGVldENoZWNrQnVzeSB8fCBsaW5rU2hlZXRMb2NrZWR9XHJcbiAgICAgICAgICAgICAgICAgIHNlbGVjdExhYmVsPXtzZWxlY3RUaWNrZXRMYWJlbH1cclxuICAgICAgICAgICAgICAgICAgb25PcGVuRGV0YWlsPXsoKSA9PiBvcGVuVGlja2V0RGV0YWlsKGZpbGVJZCl9XHJcbiAgICAgICAgICAgICAgICAgIG9uVG9nZ2xlU2VsZWN0PXsoKSA9PiB0b2dnbGVUaWNrZXRTZWxlY3Rpb24oaXRlbSl9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJhc2VTdGF0dXNJY29ucyA9IGlzQXNzaWduZWRUb0V4cGVuc2VTaGVldCB8fCBzaG93UHJvY2Vzc2VkQnlBaUljb24gPyAoXHJcbiAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIHtpc0Fzc2lnbmVkVG9FeHBlbnNlU2hlZXQgPyAoXHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImV4cGVuc2UtdGlja2V0LWNhcmRfX3N0YXR1cy1pY29uXCIgcm9sZT1cImltZ1wiIGFyaWEtbGFiZWw9e3N0YXR1c0xhYmVsfT5cclxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTQgdy00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk0xMy4xOSA4LjY4OGE0LjUgNC41IDAgMCAxIDEuMjQyIDcuMjQ0bC00LjUgNC41YTQuNSA0LjUgMCAwIDEtNi4zNjQtNi4zNjRsMS43NTctMS43NTdtMTMuMzUtLjYyMiAxLjc1Ny0xLjc1N2E0LjUgNC41IDAgMCAwLTYuMzY0LTYuMzY0bC00LjUgNC41YTQuNSA0LjUgMCAwIDAgMS4yNDIgNy4yNDRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICB7c2hvd1Byb2Nlc3NlZEJ5QWlJY29uID8gKFxyXG4gICAgICAgICAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImV4cGVuc2UtdGlja2V0LWNhcmRfX3N0YXR1cy1pY29uIGV4cGVuc2UtdGlja2V0LWNhcmRfX3N0YXR1cy1pY29uLS1haVwiXHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cImltZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17cHJvY2Vzc2VkQnlBaUxhYmVsfVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezEuNX0gc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPVwiaC00IHctNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNNCAxOGw0LTEybDQgMTJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNNiAxM2g0XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDZoNlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNyA2djEyXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDE4aDZcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgKSA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGtleT17dGlja2V0Q2FyZEtleX1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIlxyXG4gICAgICAgICAgICAgICAgZGF0YS10aWNrZXQtZmlsZS1pZD17ZmlsZUlkIHx8IHVuZGVmaW5lZH1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxyXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxyXG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZT17Y2FyZFN1YnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxyXG4gICAgICAgICAgICAgICAgICBvbk9wZW49eygpID0+IG9wZW5UaWNrZXREZXRhaWwoZmlsZUlkKX1cclxuICAgICAgICAgICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX190aXRsZSB0aW1lbGluZS1uYW1lXCJcclxuICAgICAgICAgICAgICAgICAgc3RhdHVzTGFiZWw9e3N0YXR1c0xhYmVsfVxyXG4gICAgICAgICAgICAgICAgICBzdGF0dXNJY29uPXtiYXNlU3RhdHVzSWNvbnN9XHJcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0ljb25DbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvbnNcIlxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxyXG4gICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsUGFnZXN9XHJcbiAgICAgICAgY3VycmVudFBhZ2U9e2N1cnJlbnRQYWdlfVxyXG4gICAgICAgIGxvYWRpbmc9e2lzTG9hZGluZ31cclxuICAgICAgICBvblBhZ2VDaGFuZ2U9eyhwYWdlKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBzbmFwc2hvdCA9IHJlc29sdmVBY3RpdmVGaWx0ZXJzKCk7XHJcbiAgICAgICAgICBpZiAoIWlzTGlua01vZGUgJiYgKCFzbmFwc2hvdD8uZnJvbURhdGUgfHwgIXNuYXBzaG90Py50b0RhdGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB2b2lkIGxvYWRMaXN0KHBhZ2UsIHNuYXBzaG90KTtcclxuICAgICAgICB9fVxyXG4gICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtpc0xpbmtNb2RlICYmIGNhblByb2Nlc3NMaW5rTW9kZSAmJiAhbGlua1NoZWV0Q2hlY2tCdXN5ICYmICFsaW5rU2hlZXRMb2NrZWQgPyAoXHJcbiAgICAgICAgPFBhZ2VCb3R0b21BY3Rpb25zIGFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0xpbmtCdXR0b25cIiwgXCJWaW5jdWxhciB0aWNrZXQocylcIil9PlxyXG4gICAgICAgICAgPFBhZ2VCb3R0b21BY3Rpb25CdXR0b25cclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9MaW5rQnV0dG9uXCIsIFwiVmluY3VsYXIgdGlja2V0KHMpXCIpfVxyXG4gICAgICAgICAgICBvbkNsaWNrPXtvcGVuTGlua0NvbmZpcm1Nb2RhbH1cclxuICAgICAgICAgICAgZGlzYWJsZWQ9e2xpbmtGbG93QnVzeSB8fCBzZWxlY3RBbGxCdXN5IHx8IHNlbGVjdGVkVGlja2V0Q291bnQgPCAxfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L1BhZ2VCb3R0b21BY3Rpb25zPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHtjYW5DcmVhdGVUaWNrZXQgJiYgIWlzTGlua01vZGUgPyAoXHJcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXHJcbiAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgclx1MDBFMXBpZGFzXCIpfVxyXG4gICAgICAgICAgc2l6ZT17NzZ9XHJcbiAgICAgICAgICByaWdodD17MTZ9XHJcbiAgICAgICAgICBib3R0b209ezI0fVxyXG4gICAgICAgICAgbWVudUFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0FjdGlvbnNcIiwgXCJBY2Npb25lcyByXHUwMEUxcGlkYXNcIil9XHJcbiAgICAgICAgICBtZW51SXRlbXM9e2ZhYk1lbnVJdGVtc31cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2UgdGlja2V0cyBsaXN0LlxyXG5jb25zdCBFeHBlbnNlVGlja2V0c1BhZ2UgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cclxuICAgICAgPEV4cGVuc2VUaWNrZXRzUGFnZUNvbnRlbnQgLz5cclxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XHJcbiAgKTtcclxufTtcclxuXHJcbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xyXG4gIGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoKCk7XHJcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBlbnNlLXRpY2tldHMtcm9vdFwiKTtcclxuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xyXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVRpY2tldHNQYWdlIC8+KTtcclxufTtcclxuXHJcbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldHNQYWdlO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IENoZWNrSWNvbiB9IGZyb20gXCJAaGVyb2ljb25zL3JlYWN0LzI0L291dGxpbmVcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlRGF0ZVBhcnRzIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlVGltZWxpbmVDYXJkIGZyb20gXCIuL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4XCI7XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtUHJvcHMgPSB7XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgZGF0ZVBhcnRzOiBFeHBlbnNlRGF0ZVBhcnRzO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgc3VidGl0bGU6IHN0cmluZztcclxuICBhbW91bnRUZXh0OiBzdHJpbmc7XHJcbiAgaXNTZWxlY3RlZDogYm9vbGVhbjtcclxuICBpc1NlbGVjdGFibGU6IGJvb2xlYW47XHJcbiAgc2VsZWN0aW9uRGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgc2VsZWN0TGFiZWw6IHN0cmluZztcclxuICBvbk9wZW5EZXRhaWw6ICgpID0+IHZvaWQ7XHJcbiAgb25Ub2dnbGVTZWxlY3Q6ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBMaW5rLW1vZGUgdGlja2V0IGNhcmQ6IGNlbnRlciBvcGVucyB0aGUgcmVhZC1vbmx5IGRldGFpbCBhbmQgdGhlIHJpZ2h0IHJhaWwgdG9nZ2xlcyBzZWxlY3Rpb24uXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtID0gKHtcclxuICBmaWxlSWQsXHJcbiAgZGF0ZVBhcnRzLFxyXG4gIHRpdGxlLFxyXG4gIHN1YnRpdGxlLFxyXG4gIGFtb3VudFRleHQsXHJcbiAgaXNTZWxlY3RlZCxcclxuICBpc1NlbGVjdGFibGUsXHJcbiAgc2VsZWN0aW9uRGlzYWJsZWQsXHJcbiAgc2VsZWN0TGFiZWwsXHJcbiAgb25PcGVuRGV0YWlsLFxyXG4gIG9uVG9nZ2xlU2VsZWN0LFxyXG59OiBFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbVByb3BzKSA9PiB7XHJcbiAgY29uc3QgY2FuVG9nZ2xlU2VsZWN0aW9uID0gaXNTZWxlY3RhYmxlICYmICFzZWxlY3Rpb25EaXNhYmxlZDtcclxuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkRldGFpbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIG9uT3BlbkRldGFpbCgpO1xyXG4gIH0sIFtvbk9wZW5EZXRhaWxdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVG9nZ2xlU2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFjYW5Ub2dnbGVTZWxlY3Rpb24pIHJldHVybjtcclxuICAgIG9uVG9nZ2xlU2VsZWN0KCk7XHJcbiAgfSwgW2NhblRvZ2dsZVNlbGVjdGlvbiwgb25Ub2dnbGVTZWxlY3RdKTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0aW9uSW5kaWNhdG9yVG9uZUNsYXNzTmFtZSA9IGlzU2VsZWN0ZWRcclxuICAgID8gXCJib3JkZXItcHJpbWFyeSBiZy1wcmltYXJ5IHRleHQtd2hpdGUgc2hhZG93LXNtXCJcclxuICAgIDogY2FuVG9nZ2xlU2VsZWN0aW9uXHJcbiAgICAgID8gXCJib3JkZXItc2xhdGUtMzAwIGJnLXdoaXRlIHRleHQtdHJhbnNwYXJlbnQgZ3JvdXAtaG92ZXI6Ym9yZGVyLXByaW1hcnkgZ3JvdXAtaG92ZXI6YmctcHJpbWFyeS81XCJcclxuICAgICAgOiBcImJvcmRlci1zbGF0ZS0yMDAgYmctc2xhdGUtMTAwIHRleHQtdHJhbnNwYXJlbnRcIjtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgY2xhc3NOYW1lPXtpc1NlbGVjdGVkID8gXCJ0aW1lbGluZS1pdGVtIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIHJpbmctMiByaW5nLXByaW1hcnkvMzBcIiA6IFwidGltZWxpbmUtaXRlbVwifVxuICAgICAgZGF0YS10aWNrZXQtZmlsZS1pZD17ZmlsZUlkIHx8IHVuZGVmaW5lZH1cclxuICAgICAgZGF0YS10aWNrZXQtc2VsZWN0ZWQ9e2lzU2VsZWN0ZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIn1cclxuICAgICAgZGF0YS10aWNrZXQtc2VsZWN0YWJsZT17Y2FuVG9nZ2xlU2VsZWN0aW9uID8gXCJ0cnVlXCIgOiBcImZhbHNlXCJ9XHJcbiAgICA+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxyXG4gICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XHJcbiAgICAgICAgICB0aXRsZT17dGl0bGV9XHJcbiAgICAgICAgICBzdWJ0aXRsZT17c3VidGl0bGV9XHJcbiAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxyXG4gICAgICAgICAgb25PcGVuPXtoYW5kbGVPcGVuRGV0YWlsfVxyXG4gICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX190aXRsZSB0aW1lbGluZS1uYW1lXCJcclxuICAgICAgICAgIGludGVyYWN0aW9uUHJvcHM9e3tcclxuICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IHRpdGxlLFxyXG4gICAgICAgICAgICBvbkNvbnRleHRNZW51OiAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgIGFyaWEtbGFiZWw9e3NlbGVjdExhYmVsfVxyXG4gICAgICAgICAgYXJpYS1wcmVzc2VkPXtpc1NlbGVjdGVkfVxyXG4gICAgICAgICAgdGl0bGU9e3NlbGVjdExhYmVsfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9eyFjYW5Ub2dnbGVTZWxlY3Rpb259XHJcbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVUb2dnbGVTZWxlY3Rpb259XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJncm91cCBhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCB6LTEwIGZsZXggdy1bNC4yNXJlbV0gaXRlbXMtc3RhcnQganVzdGlmeS1lbmQgcm91bmRlZC1yLVt2YXIoLS1yYWRpdXMteGwpXSBiZy10cmFuc3BhcmVudCBwLTEuNSB0cmFuc2l0aW9uIGZvY3VzLXZpc2libGU6b3V0bGluZS1ub25lIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy1wcmltYXJ5LzM1IGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBzbTp3LVs0Ljc1cmVtXVwiXG4gICAgICAgID5cclxuICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaC1bMzBweF0gdy1bMzBweF0gaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciB0cmFuc2l0aW9uICR7c2VsZWN0aW9uSW5kaWNhdG9yVG9uZUNsYXNzTmFtZX1gfVxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPENoZWNrSWNvbiBjbGFzc05hbWU9XCJoLVsyMHB4XSB3LVsyMHB4XVwiIHN0cm9rZVdpZHRoPXsyLjN9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeVByb3BzID0ge1xyXG4gIHJlc3VsdDogRXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXN1bHREdG8gfCBudWxsO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0TGlua0lzc3VlTGlzdFByb3BzID0ge1xyXG4gIGl0ZW1zOiBBcnJheTx7IHRpY2tldElkOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nIH0+O1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgdG9uZUNsYXNzTmFtZTogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyBvbmUgc2tpcHBlZCBvciBmYWlsZWQgdGlja2V0IGxpc3Qgd2l0aCBzdGFibGUga2V5cy5cclxuY29uc3QgRXhwZW5zZVRpY2tldExpbmtJc3N1ZUxpc3QgPSAoeyBpdGVtcywgdGl0bGUsIHRvbmVDbGFzc05hbWUgfTogRXhwZW5zZVRpY2tldExpbmtJc3N1ZUxpc3RQcm9wcykgPT4ge1xyXG4gIGlmIChpdGVtcy5sZW5ndGggPCAxKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIHAtMyAke3RvbmVDbGFzc05hbWV9YH0+XG4gICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGRcIj57dGl0bGV9PC9wPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIgc3BhY2UteS0yXCI+XHJcbiAgICAgICAge2l0ZW1zLm1hcCgoaXRlbSkgPT4gKFxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBrZXk9e2Ake2l0ZW0udGlja2V0SWQgfHwgXCJ1bmtub3duXCJ9LSR7aXRlbS5yZWFzb24gfHwgXCJuby1yZWFzb25cIn1gfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLWN1cnJlbnQvMTUgYmctd2hpdGUvODAgcC0yIHRleHQteHNcIlxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiVGlja2V0c19GaWx0ZXJfRmlsdGVyS2V5XCIsIFwiVGlja2V0XCIpfTo8L3NwYW4+e1wiIFwifVxyXG4gICAgICAgICAgICAgIDxzcGFuPntpdGVtLnRpY2tldElkIHx8IFwiLVwifTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0UmVhc29uXCIsIFwiTW90aXZvXCIpfTo8L3NwYW4+e1wiIFwifVxyXG4gICAgICAgICAgICAgIDxzcGFuPntpdGVtLnJlYXNvbiB8fCBcIi1cIn08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBTaG93cyB0aGUgYmFja2VuZCBidWxrLWxpbmsgcmVzdWx0IHN1bW1hcnksIGluY2x1ZGluZyBwYXJ0aWFsIHNraXBwZWQgYW5kIGZhaWxlZCByZWFzb25zLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0TGlua0J1bGtTdW1tYXJ5ID0gKHsgcmVzdWx0IH06IEV4cGVuc2VUaWNrZXRMaW5rQnVsa1N1bW1hcnlQcm9wcykgPT4ge1xyXG4gIGlmICghcmVzdWx0KSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3Qgc3VtbWFyeVJvd3MgPSBbXHJcbiAgICB7XHJcbiAgICAgIGtleTogXCJyZXF1ZXN0ZWRcIixcclxuICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRSZXF1ZXN0ZWRcIiwgXCJTb2xpY2l0YWRvc1wiKSxcclxuICAgICAgdmFsdWU6IHJlc3VsdC5yZXF1ZXN0ZWRDb3VudCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGtleTogXCJsaW5rZWRcIixcclxuICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRMaW5rZWRcIiwgXCJWaW5jdWxhZG9zXCIpLFxyXG4gICAgICB2YWx1ZTogcmVzdWx0LmxpbmtlZENvdW50LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAga2V5OiBcInNraXBwZWRcIixcclxuICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRTa2lwcGVkXCIsIFwiT21pdGlkb3NcIiksXHJcbiAgICAgIHZhbHVlOiByZXN1bHQuc2tpcHBlZENvdW50LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAga2V5OiBcImZhaWxlZFwiLFxyXG4gICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdEZhaWxlZFwiLCBcIkZhbGxpZG9zXCIpLFxyXG4gICAgICB2YWx1ZTogcmVzdWx0LmZhaWxlZENvdW50LFxyXG4gICAgfSxcclxuICBdO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTMgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUvOTUgcC0zXCI+XG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTkwMFwiPlxyXG4gICAgICAgICAge2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRUaXRsZVwiLCBcIlJlc3VsdGFkbyBkZSB2aW5jdWxhY2lcdTAwRjNuXCIpfVxyXG4gICAgICAgIDwvcD5cclxuICAgICAgICB7cmVzdWx0LmV4cGVuc2VTaGVldElkID8gKFxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXhzIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU2hlZXRcIiwgXCJFeHBlbnNlIHNoZWV0XCIpfToge3Jlc3VsdC5leHBlbnNlU2hlZXRJZH1cclxuICAgICAgICAgIDwvcD5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgc206Z3JpZC1jb2xzLTRcIj5cclxuICAgICAgICB7c3VtbWFyeVJvd3MubWFwKChpdGVtKSA9PiAoXHJcbiAgICAgICAgICA8ZGl2IGtleT17aXRlbS5rZXl9IGNsYXNzTmFtZT1cInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXNsYXRlLTUwIHB4LTMgcHktMiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMTRlbV0gdGV4dC1zbGF0ZS01MDBcIj57aXRlbS5sYWJlbH08L3A+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC14bCBmb250LXNlbWlib2xkIHRleHQtcHJpbWFyeVwiPntpdGVtLnZhbHVlfTwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBnYXAtMyBsZzpncmlkLWNvbHMtMlwiPlxyXG4gICAgICAgIDxFeHBlbnNlVGlja2V0TGlua0lzc3VlTGlzdFxyXG4gICAgICAgICAgdGl0bGU9e2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRTa2lwcGVkXCIsIFwiT21pdGlkb3NcIil9XHJcbiAgICAgICAgICBpdGVtcz17QXJyYXkuaXNBcnJheShyZXN1bHQuc2tpcHBlZCkgPyByZXN1bHQuc2tpcHBlZCA6IFtdfVxyXG4gICAgICAgICAgdG9uZUNsYXNzTmFtZT1cImJvcmRlci1hbWJlci0yMDAgYmctYW1iZXItNTAgdGV4dC1hbWJlci05MDBcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPEV4cGVuc2VUaWNrZXRMaW5rSXNzdWVMaXN0XHJcbiAgICAgICAgICB0aXRsZT17aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdEZhaWxlZFwiLCBcIkZhbGxpZG9zXCIpfVxyXG4gICAgICAgICAgaXRlbXM9e0FycmF5LmlzQXJyYXkocmVzdWx0LmZhaWxlZCkgPyByZXN1bHQuZmFpbGVkIDogW119XHJcbiAgICAgICAgICB0b25lQ2xhc3NOYW1lPVwiYm9yZGVyLXJvc2UtMjAwIGJnLXJvc2UtNTAgdGV4dC1yb3NlLTkwMFwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgdHlwZSB7IEF1dGhNYW5hZ2VkVXNlciB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IEhpc3RvcnlTdW1tYXJ5IGZyb20gXCIuLi8uLi92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5U3VtbWFyeS50c3hcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHtcclxuICBnZXRFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyT3B0aW9ucyxcclxuICBub3JtYWxpemVFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSxcclxuICB0eXBlIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlLFxyXG59IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsIEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkIH0gZnJvbSBcIi4uL3RpY2tldHMvZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXIgZnJvbSBcIi4vRXhwZW5zZURhdGVSYW5nZUZpbHRlci50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VGaWx0ZXJBY3Rpb25zIGZyb20gXCIuL0V4cGVuc2VGaWx0ZXJBY3Rpb25zLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMgZnJvbSBcIi4vRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQgZnJvbSBcIi4vRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0LnRzeFwiO1xyXG5cclxuY29uc3QgcGFyc2VJc29EYXRlID0gKHJhdzogc3RyaW5nKTogRGF0ZSB8IG51bGwgPT4ge1xyXG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcclxuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcpLnRyaW0oKS5zcGxpdChcIlRcIilbMF07XHJcbiAgaWYgKCEvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdCh2YWx1ZSkpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IHZhbHVlLnNwbGl0KFwiLVwiKS5tYXAoTnVtYmVyKTtcclxuICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0RGF0ZSA9IChyYXc6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGRhdGUgPSBwYXJzZUlzb0RhdGUocmF3KTtcclxuICBpZiAoIWRhdGUpIHJldHVybiBcIi0tXCI7XHJcbiAgcmV0dXJuIGRhdGVcclxuICAgIC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7XHJcbiAgICAgIGRheTogXCJudW1lcmljXCIsXHJcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXHJcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxyXG4gICAgfSlcclxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcclxuICAgIC50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbFByb3BzID0ge1xyXG4gIG1vZGU6IFwiZ2VuZXJhbFwiIHwgXCJsaW5rXCI7XHJcbiAgdmlzaWJsZTogYm9vbGVhbjtcclxuICBzaG93TWFudWFsRGF0ZUZpbHRlcjogYm9vbGVhbjtcclxuICBtYW51YWxEYXRlQXV0b09wZW5LZXk6IG51bWJlcjtcclxuICBmcm9tRGF0ZTogc3RyaW5nO1xyXG4gIHRvRGF0ZTogc3RyaW5nO1xyXG4gIGZpbHRlcktleTogc3RyaW5nO1xyXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIG1hbmFnZWRVc2VySWQ6IHN0cmluZztcclxuICBtYW5hZ2VkVXNlcnM6IEF1dGhNYW5hZ2VkVXNlcltdO1xyXG4gIHNob3dNYW5hZ2VkVXNlckZpbHRlcjogYm9vbGVhbjtcclxuICBzdGF0dXNGaWx0ZXI6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlO1xyXG4gIGdhc3RvVHlwZUZpbHRlcjogXCJcIiB8IEV4cGVuc2VHYXN0b1R5cGVDb2RlO1xyXG4gIHByb2Nlc3NlZEJ5SWFGaWx0ZXI6IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyO1xyXG4gIGFjdGl2ZVF1aWNrRmlsdGVyOiBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCB8IG51bGw7XHJcbiAgc2hvd01hbnVhbERhdGVFcnJvcjogYm9vbGVhbjtcclxuICBzdGF0dXNGaWx0ZXJSZWFkT25seT86IGJvb2xlYW47XHJcbiAgZml4ZWRTdGF0dXNGaWx0ZXI/OiAwIHwgMSB8IG51bGw7XHJcbiAgZ2FzdG9UeXBlT3B0aW9uczogRXhwZW5zZVNlbGVjdE9wdGlvbltdO1xyXG4gIG9uRGF0ZVJhbmdlQ2hhbmdlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25NYW51YWxSYW5nZUNvbXBsZXRlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25RdWlja0ZpbHRlckNoYW5nZTogKGZpbHRlcklkOiBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCkgPT4gdm9pZDtcclxuICBvbkZpbHRlcktleUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uTWFuYWdlZFVzZXJJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25TdGF0dXNGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpID0+IHZvaWQ7XHJcbiAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogXCJcIiB8IEV4cGVuc2VHYXN0b1R5cGVDb2RlKSA9PiB2b2lkO1xyXG4gIG9uUHJvY2Vzc2VkQnlJYUZpbHRlckNoYW5nZTogKHZhbHVlOiBFeHBlbnNlVGlja2V0UHJvY2Vzc2VkQnlJYUZpbHRlcikgPT4gdm9pZDtcclxuICBvbkNsZWFyOiAoKSA9PiB2b2lkO1xyXG4gIG9uQXBwbHk6ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBTaGFyZWQgdGlja2V0cyBmaWx0ZXIgcGFuZWwgd2l0aCBnbG9iYWwgcXVpY2sgZGF0ZSBmaWx0ZXJzIGFuZCBmaXhlZCB0aWNrZXQgZmlsdGVycy5cclxuY29uc3QgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWwgPSAoe1xyXG4gIG1vZGUsXHJcbiAgdmlzaWJsZSxcclxuICBzaG93TWFudWFsRGF0ZUZpbHRlcixcclxuICBtYW51YWxEYXRlQXV0b09wZW5LZXksXHJcbiAgZnJvbURhdGUsXHJcbiAgdG9EYXRlLFxyXG4gIGZpbHRlcktleSxcclxuICBjdXJyZW5jeUNvZGUsXHJcbiAgbWFuYWdlZFVzZXJJZCxcclxuICBtYW5hZ2VkVXNlcnMsXHJcbiAgc2hvd01hbmFnZWRVc2VyRmlsdGVyLFxyXG4gIHN0YXR1c0ZpbHRlcixcclxuICBnYXN0b1R5cGVGaWx0ZXIsXHJcbiAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICBhY3RpdmVRdWlja0ZpbHRlcixcclxuICBzaG93TWFudWFsRGF0ZUVycm9yLFxyXG4gIHN0YXR1c0ZpbHRlclJlYWRPbmx5ID0gZmFsc2UsXHJcbiAgZml4ZWRTdGF0dXNGaWx0ZXIgPSBudWxsLFxyXG4gIGdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgb25EYXRlUmFuZ2VDaGFuZ2UsXHJcbiAgb25NYW51YWxSYW5nZUNvbXBsZXRlLFxyXG4gIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXHJcbiAgb25GaWx0ZXJLZXlDaGFuZ2UsXHJcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2UsXHJcbiAgb25NYW5hZ2VkVXNlcklkQ2hhbmdlLFxyXG4gIG9uU3RhdHVzRmlsdGVyQ2hhbmdlLFxyXG4gIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlLFxyXG4gIG9uUHJvY2Vzc2VkQnlJYUZpbHRlckNoYW5nZSxcclxuICBvbkNsZWFyLFxyXG4gIG9uQXBwbHksXHJcbn06IEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsUHJvcHMpID0+IHtcclxuICBjb25zdCBzdGF0dXNPcHRpb25zID0gdXNlTWVtbygoKSA9PiBnZXRFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyT3B0aW9ucygpLCBbXSk7XHJcblxyXG4gIGNvbnN0IGNhdGVnb3J5T3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7IHZhbHVlOiBcIlwiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfQWxsXCIsIFwiQWxsXCIpIH0sXHJcbiAgICAgIC4uLmdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgICBdO1xyXG4gIH0sIFtnYXN0b1R5cGVPcHRpb25zXSk7XHJcblxyXG4gIGlmICghdmlzaWJsZSkgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgbG9jYWxlID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCI7XHJcbiAgY29uc3Qgc2hvd0lubGluZURhdGVTdW1tYXJ5ID0gIXNob3dNYW51YWxEYXRlRmlsdGVyICYmICEhZnJvbURhdGUgJiYgISF0b0RhdGU7XHJcbiAgY29uc3Qgc2hvd1N0YXR1c0ZpbHRlciA9IG1vZGUgPT09IFwiZ2VuZXJhbFwiO1xyXG4gIGNvbnN0IGRlc2t0b3BDb2x1bW5zQ2xhc3NOYW1lID0gc2hvd01hbmFnZWRVc2VyRmlsdGVyXHJcbiAgICA/IChzaG93U3RhdHVzRmlsdGVyID8gXCJsZzpncmlkLWNvbHMtNlwiIDogXCJsZzpncmlkLWNvbHMtNVwiKVxyXG4gICAgOiAoc2hvd1N0YXR1c0ZpbHRlciA/IFwibGc6Z3JpZC1jb2xzLTVcIiA6IFwibGc6Z3JpZC1jb2xzLTRcIik7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1leHBhbmRlZCBwLTIgc206cC0yLjUgcmVsYXRpdmVcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdGFjayBmbGV4IGZsZXgtY29sIHNwYWNlLXktMlwiPlxyXG4gICAgICAgIDxFeHBlbnNlUXVpY2tEYXRlRmlsdGVycyBhY3RpdmVRdWlja0ZpbHRlcj17YWN0aXZlUXVpY2tGaWx0ZXJ9IG9uUXVpY2tGaWx0ZXJDaGFuZ2U9e29uUXVpY2tGaWx0ZXJDaGFuZ2V9IC8+XHJcblxyXG4gICAgICAgIHtzaG93TWFudWFsRGF0ZUZpbHRlciA/IChcclxuICAgICAgICAgIDxFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyXHJcbiAgICAgICAgICAgIGZyb21EYXRlPXtmcm9tRGF0ZX1cclxuICAgICAgICAgICAgdG9EYXRlPXt0b0RhdGV9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRhdGVSYW5nZUNoYW5nZX1cclxuICAgICAgICAgICAgb25SYW5nZUNvbXBsZXRlPXtvbk1hbnVhbFJhbmdlQ29tcGxldGV9XHJcbiAgICAgICAgICAgIGF1dG9PcGVuUmVxdWVzdElkPXttYW51YWxEYXRlQXV0b09wZW5LZXl9XHJcbiAgICAgICAgICAgIHNob3dNYW51YWxFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvcn1cclxuICAgICAgICAgICAgc2hvd1N0YXJ0RXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3IgJiYgIWZyb21EYXRlfVxyXG4gICAgICAgICAgICBzaG93RW5kRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3IgJiYgIXRvRGF0ZX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IHNob3dJbmxpbmVEYXRlU3VtbWFyeSA/IChcclxuICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxyXG4gICAgICAgICAgICBzdW1tYXJ5RnJvbUxhYmVsPXtpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKX1cclxuICAgICAgICAgICAgc3VtbWFyeVRvTGFiZWw9e2luZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIil9XHJcbiAgICAgICAgICAgIGZyb21WYWx1ZT17Zm9ybWF0RGF0ZShmcm9tRGF0ZSwgbG9jYWxlKX1cclxuICAgICAgICAgICAgdG9WYWx1ZT17Zm9ybWF0RGF0ZSh0b0RhdGUsIGxvY2FsZSl9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImdhcC15LTEgdGV4dC1bMTFweF0gcHgtMVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgJHtkZXNrdG9wQ29sdW1uc0NsYXNzTmFtZX0gZ2FwLTJgfT5cclxuICAgICAgICAgIDxFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9GaWx0ZXJLZXlcIiwgXCJUaWNrZXRcIil9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfRmlsdGVyS2V5XCIsIFwiVGlja2V0XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17ZmlsdGVyS2V5fVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25GaWx0ZXJLZXlDaGFuZ2V9XHJcbiAgICAgICAgICAgIG1vZGU9e21vZGV9XHJcbiAgICAgICAgICAgIGNyZWF0ZWREYXRlRnJvbT17ZnJvbURhdGV9XHJcbiAgICAgICAgICAgIGNyZWF0ZWREYXRlVG89e3RvRGF0ZX1cclxuICAgICAgICAgICAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnNcclxuICAgICAgICAgICAgZml4ZWRTdGF0dXNGaWx0ZXI9e21vZGUgPT09IFwiZ2VuZXJhbFwiID8gZml4ZWRTdGF0dXNGaWx0ZXIgOiBudWxsfVxyXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17Y3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25DdXJyZW5jeUNvZGVDaGFuZ2V9XHJcbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAgIHNob3dMb2FkaW5nU3RhdGVUZXh0PXtmYWxzZX1cclxuICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAge3Nob3dNYW5hZ2VkVXNlckZpbHRlciA/IChcclxuICAgICAgICAgICAgPEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiQ29tbW9uX1VzZXJcIiwgXCJVc2VyXCIpfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiQ29tbW9uX1VzZXJcIiwgXCJVc2VyXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXttYW5hZ2VkVXNlcklkfVxyXG4gICAgICAgICAgICAgIHVzZXJzPXttYW5hZ2VkVXNlcnN9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uTWFuYWdlZFVzZXJJZENoYW5nZX1cclxuICAgICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAge3Nob3dTdGF0dXNGaWx0ZXIgPyAoXHJcbiAgICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfVxyXG4gICAgICAgICAgICAgIG9wdGlvbnM9e3N0YXR1c09wdGlvbnN9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e3N0YXR1c0ZpbHRlcn1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4gb25TdGF0dXNGaWx0ZXJDaGFuZ2Uobm9ybWFsaXplRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUobmV4dFZhbHVlLCBcIlwiKSl9XHJcbiAgICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtzdGF0dXNGaWx0ZXJSZWFkT25seX1cclxuICAgICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLXRpY2tldC1zdGF0dXMtZmlsdGVyXCJcclxuICAgICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxyXG4gICAgICAgICAgICBvcHRpb25zPXtjYXRlZ29yeU9wdGlvbnN9XHJcbiAgICAgICAgICAgIHZhbHVlPXtnYXN0b1R5cGVGaWx0ZXJ9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKG5leHRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgaWYgKG5leHRWYWx1ZSA9PT0gXCJcIiB8fCAhTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpKSB7XHJcbiAgICAgICAgICAgICAgICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZShcIlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2UocGFyc2VkIGFzIEV4cGVuc2VHYXN0b1R5cGVDb2RlKTtcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxyXG4gICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLXRpY2tldC1nYXN0b3R5cGUtZmlsdGVyXCJcclxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8RXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3RcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBXCIsIFwiUHJvY2Vzc2VkIGJ5IElBXCIpfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtwcm9jZXNzZWRCeUlhRmlsdGVyfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlfVxyXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPEV4cGVuc2VGaWx0ZXJBY3Rpb25zXHJcbiAgICAgICAgICBjbGVhckxhYmVsPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xlYXJcIiwgXCJDbGVhclwiKX1cclxuICAgICAgICAgIGFwcGx5TGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9BcHBseVwiLCBcIkFwcGx5XCIpfVxyXG4gICAgICAgICAgb25DbGVhcj17b25DbGVhcn1cclxuICAgICAgICAgIG9uQXBwbHk9e29uQXBwbHl9XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWw7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyIH0gZnJvbSBcIi4uL3RpY2tldHMvZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdFByb3BzID0ge1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuICB2YWx1ZTogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXI7XHJcbiAgb25DaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIpID0+IHZvaWQ7XHJcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBzaG93TGFiZWw/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gRml4ZWQgZW51bSBzZWxlY3QgZm9yIElBIHByb2Nlc3NpbmcgZmlsdGVyIHdpdGggQWxsL1llcy9ObyBvcHRpb25zLlxyXG5jb25zdCBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdCA9ICh7XHJcbiAgbGFiZWwsXHJcbiAgcGxhY2Vob2xkZXIsXHJcbiAgdmFsdWUsXHJcbiAgb25DaGFuZ2UsXHJcbiAgcmVhZE9ubHkgPSBmYWxzZSxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIHNob3dMYWJlbCA9IHRydWUsXHJcbn06IEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0UHJvcHMpID0+IHtcclxuICBjb25zdCB1aVZhbHVlID0gdmFsdWUgPT09IFwiYWxsXCIgPyBcIlwiIDogdmFsdWU7XHJcbiAgY29uc3Qgb3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPihcclxuICAgICgpID0+IFtcclxuICAgICAgeyB2YWx1ZTogXCJhbGxcIiwgdGV4dDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0FsbFwiLCBcIkFsbFwiKSB9LFxyXG4gICAgICB7IHZhbHVlOiBcInllc1wiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9ZZXNcIiwgXCJZZXNcIikgfSxcclxuICAgICAgeyB2YWx1ZTogXCJub1wiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9Ob1wiLCBcIk5vXCIpIH0sXHJcbiAgICBdLFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgIGxhYmVsPXtsYWJlbH1cclxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICBvcHRpb25zPXtvcHRpb25zfVxyXG4gICAgICB2YWx1ZT17dWlWYWx1ZX1cclxuICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IHtcclxuICAgICAgICBpZiAobmV4dFZhbHVlID09PSBcInllc1wiIHx8IG5leHRWYWx1ZSA9PT0gXCJub1wiIHx8IG5leHRWYWx1ZSA9PT0gXCJhbGxcIikge1xyXG4gICAgICAgICAgb25DaGFuZ2UobmV4dFZhbHVlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgb25DaGFuZ2UoXCJhbGxcIik7XHJcbiAgICAgIH19XHJcbiAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICBpZEJhc2U9XCJleHBlbnNlLXByb2Nlc3NlZC1ieS1pYS1maWx0ZXJcIlxyXG4gICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cclxuICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XHJcbiAgICAvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdDtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUmVtb3RlU2VhcmNoQ29tYm9ib3gsIHsgdHlwZSBSZW1vdGVTZWFyY2hPcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1JlbW90ZVNlYXJjaENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8sXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsXHJcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0LCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0UHJvcHMgPSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG1vZGU/OiBcImdlbmVyYWxcIiB8IFwibGlua1wiO1xyXG4gIGNyZWF0ZWREYXRlRnJvbT86IHN0cmluZztcclxuICBjcmVhdGVkRGF0ZVRvPzogc3RyaW5nO1xyXG4gIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zPzogYm9vbGVhbjtcclxuICBmaXhlZFN0YXR1c0ZpbHRlcj86IDAgfCAxIHwgbnVsbDtcclxuICByZWFkT25seT86IGJvb2xlYW47XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIHNob3dMYWJlbD86IGJvb2xlYW47XHJcbn07XHJcblxyXG5jb25zdCBTRUFSQ0hfUEFHRV9TSVpFID0gMzA7XHJcblxyXG4vLyBCdWlsZHMgbWluaW1hbCBwYXlsb2FkIGZvciB0aWNrZXQga2V5IHN1Z2dlc3Rpb25zIHdpdGhvdXQgZGF0ZSBmaWx0ZXJzLlxyXG5jb25zdCBidWlsZFRpY2tldFN1Z2dlc3RQYXlsb2FkID0gKFxyXG4gIHRlcm06IHN0cmluZyxcclxuICBwYWdlOiBudW1iZXIsXHJcbiAgcGFnZVNpemU6IG51bWJlcixcclxuICBmaXhlZFN0YXR1c0ZpbHRlcjogMCB8IDEgfCBudWxsLFxyXG4gIGNyZWF0ZWREYXRlRnJvbTogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gIGNyZWF0ZWREYXRlVG86IHN0cmluZyB8IHVuZGVmaW5lZFxyXG4pOiBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCB8IEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCA9PiB7XHJcbiAgY29uc3Qgc2FmZVRlcm0gPSBTdHJpbmcodGVybSB8fCBcIlwiKS50cmltKCk7XHJcbiAgY29uc3QgYmFzZVBheWxvYWQgPSB7XHJcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2UpIDogMSxcclxuICAgIHBhZ2VTaXplOiBOdW1iZXIuaXNGaW5pdGUocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCA/IE1hdGguZmxvb3IocGFnZVNpemUpIDogU0VBUkNIX1BBR0VfU0laRSxcclxuICAgIGNyZWF0ZWREYXRlRnJvbTogY3JlYXRlZERhdGVGcm9tIHx8IHVuZGVmaW5lZCxcclxuICAgIGNyZWF0ZWREYXRlVG86IGNyZWF0ZWREYXRlVG8gfHwgdW5kZWZpbmVkLFxyXG4gICAgc2VhcmNoS2V5OiBzYWZlVGVybSB8fCB1bmRlZmluZWQsXHJcbiAgICBmaWx0ZXI6IHNhZmVUZXJtIHx8IHVuZGVmaW5lZCxcclxuICB9O1xyXG5cclxuICBpZiAoZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDAgfHwgZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDEpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIC4uLmJhc2VQYXlsb2FkLFxyXG4gICAgICBzdGF0dXM6IGZpeGVkU3RhdHVzRmlsdGVyLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiBiYXNlUGF5bG9hZDtcclxufTtcclxuXHJcbmNvbnN0IG1hcFRpY2tldE9wdGlvbnMgPSAoXHJcbiAgaXRlbXM6IEFycmF5PEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvIHwgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvPiB8IHVuZGVmaW5lZFxyXG4pOiBSZW1vdGVTZWFyY2hPcHRpb25bXSA9PiB7XHJcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW10pXHJcbiAgICAubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGZpbGVJZCA9IFN0cmluZyhpdGVtPy5GaWxlSWQgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IFN0cmluZyhpdGVtPy5EZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IHN1YnRpdGxlID0gZGVzY3JpcHRpb24gfHwgXCItXCI7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdmFsdWU6IGZpbGVJZCxcclxuICAgICAgICB0aXRsZTogZmlsZUlkLFxyXG4gICAgICAgIHN1YnRpdGxlLFxyXG4gICAgICB9IGFzIFJlbW90ZVNlYXJjaE9wdGlvbjtcclxuICAgIH0pXHJcbiAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFJlbW90ZVNlYXJjaE9wdGlvbltdO1xyXG59O1xyXG5cclxuLy8gVGlja2V0IGtleSBmaWx0ZXIgaW5wdXQgd2l0aCByZW1vdGUgbGlzdCBzdWdnZXN0aW9ucy5cclxuY29uc3QgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0ID0gKHtcclxuICBsYWJlbCxcclxuICBwbGFjZWhvbGRlcixcclxuICB2YWx1ZSxcclxuICBvbkNoYW5nZSxcclxuICBtb2RlID0gXCJnZW5lcmFsXCIsXHJcbiAgY3JlYXRlZERhdGVGcm9tID0gXCJcIixcclxuICBjcmVhdGVkRGF0ZVRvID0gXCJcIixcclxuICBlbmFibGVSZW1vdGVTdWdnZXN0aW9ucyA9IHRydWUsXHJcbiAgZml4ZWRTdGF0dXNGaWx0ZXIgPSBudWxsLFxyXG4gIHJlYWRPbmx5ID0gZmFsc2UsXHJcbiAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICBzaG93TGFiZWwgPSB0cnVlLFxyXG59OiBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXRQcm9wcykgPT4ge1xyXG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xyXG5cclxuICBjb25zdCBsb2FkT3B0aW9ucyA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHNpZ25hbDogQWJvcnRTaWduYWwpOiBQcm9taXNlPFJlbW90ZVNlYXJjaE9wdGlvbltdPiA9PiB7XHJcbiAgICBjb25zdCBwYXlsb2FkID0gYnVpbGRUaWNrZXRTdWdnZXN0UGF5bG9hZCh0ZXJtLCAxLCBTRUFSQ0hfUEFHRV9TSVpFLCBmaXhlZFN0YXR1c0ZpbHRlciwgY3JlYXRlZERhdGVGcm9tLCBjcmVhdGVkRGF0ZVRvKTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID1cclxuICAgICAgbW9kZSA9PT0gXCJsaW5rXCJcclxuICAgICAgICA/IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3QocGF5bG9hZCBhcyBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QsIHtcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIHNpZ25hbCxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgOiBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0KHBheWxvYWQgYXMgRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsIHtcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIHNpZ25hbCxcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtYXBUaWNrZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyk7XHJcbiAgfSwgW2NyZWF0ZWREYXRlRnJvbSwgY3JlYXRlZERhdGVUbywgZml4ZWRTdGF0dXNGaWx0ZXIsIG1vZGVdKTtcclxuXHJcbiAgY29uc3QgbG9hZE9wdGlvbnNQYWdlID0gdXNlQ2FsbGJhY2soYXN5bmMgKHRlcm06IHN0cmluZywgcGFnZTogbnVtYmVyLCBfcGFnZVNpemU6IG51bWJlciwgc2lnbmFsOiBBYm9ydFNpZ25hbCkgPT4ge1xyXG4gICAgY29uc3QgcGF5bG9hZCA9IGJ1aWxkVGlja2V0U3VnZ2VzdFBheWxvYWQoXHJcbiAgICAgIHRlcm0sXHJcbiAgICAgIHBhZ2UsXHJcbiAgICAgIFNFQVJDSF9QQUdFX1NJWkUsXHJcbiAgICAgIGZpeGVkU3RhdHVzRmlsdGVyLFxyXG4gICAgICBjcmVhdGVkRGF0ZUZyb20sXHJcbiAgICAgIGNyZWF0ZWREYXRlVG9cclxuICAgICk7XHJcbiAgICBjb25zdCByZXNwb25zZSA9XHJcbiAgICAgIG1vZGUgPT09IFwibGlua1wiXHJcbiAgICAgICAgPyBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0KHBheWxvYWQgYXMgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RSZXF1ZXN0LCB7XHJcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICBzaWduYWwsXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIDogYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdChwYXlsb2FkIGFzIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LCB7XHJcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICBzaWduYWwsXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaXRlbXM6IFtdLFxyXG4gICAgICAgIHRvdGFsOiAwLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGl0ZW1zOiBtYXBUaWNrZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyksXHJcbiAgICAgIHRvdGFsOiBOdW1iZXIocmVzcG9uc2U/LlRvdGFsIHx8IDApLFxyXG4gICAgfTtcclxuICB9LCBbY3JlYXRlZERhdGVGcm9tLCBjcmVhdGVkRGF0ZVRvLCBmaXhlZFN0YXR1c0ZpbHRlciwgbW9kZV0pO1xyXG5cclxuICBpZiAoIWVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zIHx8IHJlYWRPbmx5TW9kZSkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cclxuICAgICAgICB7c2hvd0xhYmVsID8gKFxyXG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiIHN0eWxlPXt7IGNvbG9yOiBcIiMwMDI5NmJlMFwiIH19PlxyXG4gICAgICAgICAgICB7bGFiZWx9XHJcbiAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHB4LTMgcHktMiB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgdGV4dC1zbGF0ZS05MDAgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxyXG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxyXG4gICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8UmVtb3RlU2VhcmNoQ29tYm9ib3hcclxuICAgICAgbGFiZWw9e2xhYmVsfVxyXG4gICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XHJcbiAgICAgIHZhbHVlPXt2YWx1ZX1cclxuICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxyXG4gICAgICBvblNlYXJjaD17YXN5bmMgKHRlcm0sIHNpZ25hbCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbG9hZE9wdGlvbnModGVybSwgc2lnbmFsKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgIH19XHJcbiAgICAgIG9uU2VhcmNoUGFnZT17YXN5bmMgKHRlcm0sIHBhZ2UsIHBhZ2VTaXplLCBzaWduYWwpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGxvYWRPcHRpb25zUGFnZSh0ZXJtLCBwYWdlLCBwYWdlU2l6ZSwgc2lnbmFsKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgICByZXR1cm4geyBpdGVtczogW10sIHRvdGFsOiAwIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgIH19XHJcbiAgICAgIGlkQmFzZT1cImV4cGVuc2UtdGlja2V0LWZpbHRlci1rZXlcIlxyXG4gICAgICBtaW5TZWFyY2hMZW5ndGg9ezB9XHJcbiAgICAgIHBhZ2VTaXplPXtTRUFSQ0hfUEFHRV9TSVpFfVxyXG4gICAgICBhbGxvd0VtcHR5U2VhcmNoXHJcbiAgICAgIGxvYWRPbk9wZW5cclxuICAgICAgaW5maW5pdGVTY3JvbGxcclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XHJcbiAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxyXG4gICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQ7XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcclxuICBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCxcclxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VUaWNrZXRTdGF0dXNDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IHN0YXJ0T2ZEYXksIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBub3JtYWxpemVFeHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGVBcmdzID0ge1xyXG4gIG9uQXBwbHlGaWx0ZXJzOiAoc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpID0+IHZvaWQ7XHJcbiAgb25DbGVhckZpbHRlcnM6ICgpID0+IHZvaWQ7XHJcbiAgZGVmYXVsdE1hbmFnZWRVc2VySWQ6IHN0cmluZztcclxuICBmaXhlZFN0YXR1c0ZpbHRlcj86IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlIHwgbnVsbDtcclxuICBhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5PzogYm9vbGVhbjtcclxufTtcclxuXHJcbi8vIE93bnMgZmlsdGVyIFVJIHN0YXRlIGFuZCBhcHBseS9jbGVhciBydWxlcyBmb3IgZXhwZW5zZSB0aWNrZXRzIGxpc3QgcGFnZS5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlID0gKHtcclxuICBvbkFwcGx5RmlsdGVycyxcclxuICBvbkNsZWFyRmlsdGVycyxcclxuICBkZWZhdWx0TWFuYWdlZFVzZXJJZCxcclxuICBmaXhlZFN0YXR1c0ZpbHRlciA9IG51bGwsXHJcbiAgYWxsb3dFbXB0eURhdGVzT25BcHBseSA9IGZhbHNlLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZUFyZ3MpID0+IHtcclxuICBjb25zdCBoYXNGaXhlZFN0YXR1c0ZpbHRlciA9IGZpeGVkU3RhdHVzRmlsdGVyID09PSAwIHx8IGZpeGVkU3RhdHVzRmlsdGVyID09PSAxO1xyXG5cclxuICBjb25zdCByZXNvbHZlU3RhdHVzRmlsdGVyID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodmFsdWU6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlKTogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUgPT4ge1xyXG4gICAgICBpZiAoaGFzRml4ZWRTdGF0dXNGaWx0ZXIpIHtcclxuICAgICAgICByZXR1cm4gZml4ZWRTdGF0dXNGaWx0ZXIgYXMgRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSxcclxuICAgIFtmaXhlZFN0YXR1c0ZpbHRlciwgaGFzRml4ZWRTdGF0dXNGaWx0ZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgW2Zyb21EYXRlLCBzZXRGcm9tRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbdG9EYXRlLCBzZXRUb0RhdGVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2ZpbHRlcktleSwgc2V0RmlsdGVyS2V5XSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtjdXJyZW5jeUNvZGUsIHNldEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbbWFuYWdlZFVzZXJJZCwgc2V0TWFuYWdlZFVzZXJJZF0gPSB1c2VTdGF0ZShkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XHJcbiAgY29uc3QgW3N0YXR1c0ZpbHRlclJhdywgc2V0U3RhdHVzRmlsdGVyUmF3XSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlPihyZXNvbHZlU3RhdHVzRmlsdGVyKFwiXCIpKTtcclxuICBjb25zdCBbZ2FzdG9UeXBlRmlsdGVyLCBzZXRHYXN0b1R5cGVGaWx0ZXJdID0gdXNlU3RhdGU8XCJcIiB8IEV4cGVuc2VHYXN0b1R5cGVDb2RlPihcIlwiKTtcclxuICBjb25zdCBbcHJvY2Vzc2VkQnlJYUZpbHRlciwgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcl0gPSB1c2VTdGF0ZTxcImFsbFwiIHwgXCJ5ZXNcIiB8IFwibm9cIj4oXCJhbGxcIik7XHJcbiAgY29uc3QgW2FjdGl2ZVF1aWNrRmlsdGVyLCBzZXRBY3RpdmVRdWlja0ZpbHRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtzaG93TWFudWFsRGF0ZUZpbHRlciwgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXJdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzaG93TWFudWFsRGF0ZUVycm9yLCBzZXRTaG93TWFudWFsRGF0ZUVycm9yXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbWFudWFsRGF0ZUF1dG9PcGVuS2V5LCBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXldID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW2FwcGxpZWRGaWx0ZXJzLCBzZXRBcHBsaWVkRmlsdGVyc10gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW3Nob3dGaWx0ZXJzLCBzZXRTaG93RmlsdGVyc10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaGFzRml4ZWRTdGF0dXNGaWx0ZXIpIHJldHVybjtcclxuICAgIHNldFN0YXR1c0ZpbHRlclJhdyhmaXhlZFN0YXR1c0ZpbHRlciBhcyBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSk7XHJcbiAgfSwgW2ZpeGVkU3RhdHVzRmlsdGVyLCBoYXNGaXhlZFN0YXR1c0ZpbHRlcl0pO1xyXG5cclxuICBjb25zdCBzdGF0dXNGaWx0ZXIgPSByZXNvbHZlU3RhdHVzRmlsdGVyKHN0YXR1c0ZpbHRlclJhdyk7XHJcblxyXG4gIGNvbnN0IGN1cnJlbnRGaWx0ZXJzID0gdXNlTWVtbzxFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90PihcclxuICAgICgpID0+ICh7XHJcbiAgICAgIGZyb21EYXRlLFxyXG4gICAgICB0b0RhdGUsXHJcbiAgICAgIGZpbHRlcktleTogZmlsdGVyS2V5LnRyaW0oKSxcclxuICAgICAgY3VycmVuY3lDb2RlOiBjdXJyZW5jeUNvZGUudHJpbSgpLFxyXG4gICAgICBtYW5hZ2VkVXNlcklkOiBtYW5hZ2VkVXNlcklkLnRyaW0oKSxcclxuICAgICAgc3RhdHVzRmlsdGVyLFxyXG4gICAgICBnYXN0b1R5cGVGaWx0ZXIsXHJcbiAgICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXHJcbiAgICB9KSxcclxuICAgIFtjdXJyZW5jeUNvZGUsIGZpbHRlcktleSwgZnJvbURhdGUsIGdhc3RvVHlwZUZpbHRlciwgbWFuYWdlZFVzZXJJZCwgcHJvY2Vzc2VkQnlJYUZpbHRlciwgc3RhdHVzRmlsdGVyLCB0b0RhdGVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2V0U3RhdHVzRmlsdGVyID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodmFsdWU6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlKSA9PiB7XHJcbiAgICAgIGlmIChoYXNGaXhlZFN0YXR1c0ZpbHRlcikge1xyXG4gICAgICAgIHNldFN0YXR1c0ZpbHRlclJhdyhmaXhlZFN0YXR1c0ZpbHRlciBhcyBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHNldFN0YXR1c0ZpbHRlclJhdyh2YWx1ZSk7XHJcbiAgICB9LFxyXG4gICAgW2ZpeGVkU3RhdHVzRmlsdGVyLCBoYXNGaXhlZFN0YXR1c0ZpbHRlcl1cclxuICApO1xyXG5cclxuICBjb25zdCBvbkFwcGx5ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5ICYmICghZnJvbURhdGUgfHwgIXRvRGF0ZSkpIHtcclxuICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcih0cnVlKTtcclxuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIodHJ1ZSk7XHJcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgPSB7XHJcbiAgICAgIGZyb21EYXRlLFxyXG4gICAgICB0b0RhdGUsXHJcbiAgICAgIGZpbHRlcktleTogZmlsdGVyS2V5LnRyaW0oKSxcclxuICAgICAgY3VycmVuY3lDb2RlOiBjdXJyZW5jeUNvZGUudHJpbSgpLFxyXG4gICAgICBtYW5hZ2VkVXNlcklkOiBtYW5hZ2VkVXNlcklkLnRyaW0oKSxcclxuICAgICAgc3RhdHVzRmlsdGVyLFxyXG4gICAgICBnYXN0b1R5cGVGaWx0ZXIsXHJcbiAgICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXHJcbiAgICB9O1xyXG5cclxuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xyXG4gICAgc2V0QXBwbGllZEZpbHRlcnMoc25hcHNob3QpO1xyXG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xyXG4gICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xyXG4gICAgb25BcHBseUZpbHRlcnMoc25hcHNob3QpO1xyXG4gIH0sIFtcclxuICAgIGFsbG93RW1wdHlEYXRlc09uQXBwbHksXHJcbiAgICBjdXJyZW5jeUNvZGUsXHJcbiAgICBmaWx0ZXJLZXksXHJcbiAgICBmcm9tRGF0ZSxcclxuICAgIGdhc3RvVHlwZUZpbHRlcixcclxuICAgIG1hbmFnZWRVc2VySWQsXHJcbiAgICBvbkFwcGx5RmlsdGVycyxcclxuICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXHJcbiAgICBzdGF0dXNGaWx0ZXIsXHJcbiAgICB0b0RhdGUsXHJcbiAgXSk7XHJcblxyXG4gIC8vIFJlaHlkcmF0ZXMgdGlja2V0IGZpbHRlcnMgZnJvbSBhIGNhY2hlZCBzbmFwc2hvdCB3aGVuIHJldHVybmluZyBmcm9tIGRldGFpbC5cclxuICBjb25zdCByZXN0b3JlQXBwbGllZEZpbHRlcnMgPSB1c2VDYWxsYmFjayhcclxuICAgIChzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4ge1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90KHNuYXBzaG90KTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZFN0YXR1c0ZpbHRlciA9IHJlc29sdmVTdGF0dXNGaWx0ZXIobm9ybWFsaXplZC5zdGF0dXNGaWx0ZXIpO1xyXG4gICAgICBjb25zdCByZXN0b3JlZE1hbmFnZWRVc2VySWQgPSBTdHJpbmcobm9ybWFsaXplZC5tYW5hZ2VkVXNlcklkIHx8IGRlZmF1bHRNYW5hZ2VkVXNlcklkKS50cmltKCk7XHJcbiAgICAgIHNldEZyb21EYXRlKG5vcm1hbGl6ZWQuZnJvbURhdGUpO1xyXG4gICAgICBzZXRUb0RhdGUobm9ybWFsaXplZC50b0RhdGUpO1xyXG4gICAgICBzZXRGaWx0ZXJLZXkobm9ybWFsaXplZC5maWx0ZXJLZXkpO1xyXG4gICAgICBzZXRDdXJyZW5jeUNvZGUobm9ybWFsaXplZC5jdXJyZW5jeUNvZGUpO1xyXG4gICAgICBzZXRNYW5hZ2VkVXNlcklkKHJlc3RvcmVkTWFuYWdlZFVzZXJJZCk7XHJcbiAgICAgIHNldFN0YXR1c0ZpbHRlclJhdyhub3JtYWxpemVkU3RhdHVzRmlsdGVyKTtcclxuICAgICAgc2V0R2FzdG9UeXBlRmlsdGVyKG5vcm1hbGl6ZWQuZ2FzdG9UeXBlRmlsdGVyKTtcclxuICAgICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcihub3JtYWxpemVkLnByb2Nlc3NlZEJ5SWFGaWx0ZXIpO1xyXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcclxuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xyXG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcclxuICAgICAgc2V0QXBwbGllZEZpbHRlcnMoe1xyXG4gICAgICAgIC4uLm5vcm1hbGl6ZWQsXHJcbiAgICAgICAgbWFuYWdlZFVzZXJJZDogcmVzdG9yZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgICAgIHN0YXR1c0ZpbHRlcjogbm9ybWFsaXplZFN0YXR1c0ZpbHRlcixcclxuICAgICAgfSk7XHJcbiAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICBbZGVmYXVsdE1hbmFnZWRVc2VySWQsIHJlc29sdmVTdGF0dXNGaWx0ZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb25DbGVhciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldEZyb21EYXRlKFwiXCIpO1xyXG4gICAgc2V0VG9EYXRlKFwiXCIpO1xyXG4gICAgc2V0RmlsdGVyS2V5KFwiXCIpO1xyXG4gICAgc2V0Q3VycmVuY3lDb2RlKFwiXCIpO1xyXG4gICAgc2V0TWFuYWdlZFVzZXJJZChkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XHJcbiAgICBzZXRTdGF0dXNGaWx0ZXJSYXcocmVzb2x2ZVN0YXR1c0ZpbHRlcihcIlwiKSk7XHJcbiAgICBzZXRHYXN0b1R5cGVGaWx0ZXIoXCJcIik7XHJcbiAgICBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyKFwiYWxsXCIpO1xyXG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XHJcbiAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XHJcbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcclxuICAgIHNldE1hbnVhbERhdGVBdXRvT3BlbktleSgwKTtcclxuICAgIHNldEFwcGxpZWRGaWx0ZXJzKG51bGwpO1xyXG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XHJcbiAgICBvbkNsZWFyRmlsdGVycygpO1xyXG4gIH0sIFtkZWZhdWx0TWFuYWdlZFVzZXJJZCwgb25DbGVhckZpbHRlcnMsIHJlc29sdmVTdGF0dXNGaWx0ZXJdKTtcclxuXHJcbiAgY29uc3Qgb25EYXRlUmFuZ2VDaGFuZ2UgPSB1c2VDYWxsYmFjayhcclxuICAgIChuZXh0RnJvbURhdGU6IHN0cmluZywgbmV4dFRvRGF0ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IGhhc0Z1bGxSYW5nZSA9ICEhbmV4dEZyb21EYXRlICYmICEhbmV4dFRvRGF0ZTtcclxuICAgICAgc2V0RnJvbURhdGUobmV4dEZyb21EYXRlKTtcclxuICAgICAgc2V0VG9EYXRlKG5leHRUb0RhdGUpO1xyXG4gICAgICBpZiAoIWhhc0Z1bGxSYW5nZSkge1xyXG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKHRydWUpO1xyXG4gICAgICB9XHJcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xyXG4gICAgICBpZiAoc2hvd01hbnVhbERhdGVFcnJvcikge1xyXG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoIWhhc0Z1bGxSYW5nZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbc2hvd01hbnVhbERhdGVFcnJvcl1cclxuICApO1xyXG5cclxuICBjb25zdCBvbk1hbnVhbFJhbmdlQ29tcGxldGUgPSB1c2VDYWxsYmFjaygobmV4dEZyb21EYXRlOiBzdHJpbmcsIG5leHRUb0RhdGU6IHN0cmluZykgPT4ge1xyXG4gICAgc2V0RnJvbURhdGUobmV4dEZyb21EYXRlKTtcclxuICAgIHNldFRvRGF0ZShuZXh0VG9EYXRlKTtcclxuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xyXG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XHJcbiAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBvblF1aWNrRmlsdGVyQ2hhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZmlsdGVySWQ6IEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkKSA9PiB7XHJcbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJjdXN0b21cIikge1xyXG4gICAgICAgIGlmIChzaG93TWFudWFsRGF0ZUZpbHRlcikge1xyXG4gICAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xyXG4gICAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcclxuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcclxuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcclxuICAgICAgICBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXkoKHByZXZpb3VzKSA9PiBwcmV2aW91cyArIDEpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoZmlsdGVySWQpO1xyXG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XHJcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xyXG5cclxuICAgICAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xyXG4gICAgICBjb25zdCBuZXh0RnJvbSA9IG5ldyBEYXRlKHRvZGF5KTtcclxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtN1wiKSB7XHJcbiAgICAgICAgbmV4dEZyb20uc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA2KTtcclxuICAgICAgfSBlbHNlIGlmIChmaWx0ZXJJZCA9PT0gXCJkYXlzLTMwXCIpIHtcclxuICAgICAgICBuZXh0RnJvbS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDI5KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXh0RnJvbS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDg5KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0RnJvbURhdGUodG9Jc29EYXRlKG5leHRGcm9tKSk7XHJcbiAgICAgIHNldFRvRGF0ZSh0b0lzb0RhdGUodG9kYXkpKTtcclxuICAgIH0sXHJcbiAgICBbc2hvd01hbnVhbERhdGVGaWx0ZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgdG9nZ2xlRmlsdGVyUGFuZWwgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRTaG93RmlsdGVycygocHJldmlvdXMpID0+IHtcclxuICAgICAgY29uc3QgbmV4dCA9ICFwcmV2aW91cztcclxuICAgICAgaWYgKCFuZXh0KSB7XHJcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZnJvbURhdGUsXHJcbiAgICB0b0RhdGUsXHJcbiAgICBmaWx0ZXJLZXksXHJcbiAgICBjdXJyZW5jeUNvZGUsXHJcbiAgICBtYW5hZ2VkVXNlcklkLFxyXG4gICAgc3RhdHVzRmlsdGVyLFxyXG4gICAgZ2FzdG9UeXBlRmlsdGVyLFxyXG4gICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxyXG4gICAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXHJcbiAgICBzaG93TWFudWFsRGF0ZUVycm9yLFxyXG4gICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxyXG4gICAgYXBwbGllZEZpbHRlcnMsXHJcbiAgICBzaG93RmlsdGVycyxcclxuICAgIGN1cnJlbnRGaWx0ZXJzLFxyXG4gICAgc2V0RmlsdGVyS2V5LFxyXG4gICAgc2V0Q3VycmVuY3lDb2RlLFxyXG4gICAgc2V0TWFuYWdlZFVzZXJJZCxcclxuICAgIHNldFN0YXR1c0ZpbHRlcixcclxuICAgIHNldEdhc3RvVHlwZUZpbHRlcixcclxuICAgIHNldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsXHJcbiAgICBvbkFwcGx5LFxyXG4gICAgb25DbGVhcixcclxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcclxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlLFxyXG4gICAgb25NYW51YWxSYW5nZUNvbXBsZXRlLFxyXG4gICAgb25RdWlja0ZpbHRlckNoYW5nZSxcclxuICAgIHRvZ2dsZUZpbHRlclBhbmVsLFxyXG4gICAgc3RhdHVzRmlsdGVyTG9ja2VkOiBoYXNGaXhlZFN0YXR1c0ZpbHRlcixcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3QsIGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBpc0V4cGVuc2VBYm9ydExpa2VFcnJvciwgcnVuRXhwZW5zZVJlYWRSZXF1ZXN0V2l0aFJldHJ5IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VSZXF1ZXN0UmV0cnkudHNcIjtcclxuaW1wb3J0IHtcclxuICBidWlsZEV4cGVuc2VUaWNrZXRMaW5rTGlzdFBheWxvYWQsXHJcbiAgYnVpbGRFeHBlbnNlVGlja2V0TGlzdFBheWxvYWQsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VQYXlsb2FkQnVpbGRlcnMudHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXHJcbiAgRXhwZW5zZVRpY2tldENhcmQsXHJcbiAgRXhwZW5zZVRpY2tldExpbmtDYXJkLFxyXG4gIEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW0sXHJcbn0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0c0xpc3REYXRhQXJncyA9IHtcclxuICBoYXNBY2Nlc3M6IGJvb2xlYW47XHJcbiAgcGFnZVNpemU6IG51bWJlcjtcclxuICBtb2RlOiBcImdlbmVyYWxcIiB8IFwibGlua1wiO1xyXG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuY29uc3QgQUxMT1dFRF9HQVNUT19UWVBFX0NPREVTID0gbmV3IFNldDxudW1iZXI+KFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0pO1xyXG5jb25zdCBFWFBFTlNFX1RJQ0tFVFNfTElTVF9MT0dfUFJFRklYID0gXCJbZXhwZW5zZS10aWNrZXRzOmxpc3RdXCI7XHJcblxyXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c0xpc3RJbmZvID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xyXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS5pbmZvID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGNvbnNvbGUuaW5mbyhFWFBFTlNFX1RJQ0tFVFNfTElTVF9MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xyXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS53YXJuID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGNvbnNvbGUud2FybihFWFBFTlNFX1RJQ0tFVFNfTElTVF9MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c0xpc3RFcnJvciA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS5lcnJvcihFWFBFTlNFX1RJQ0tFVFNfTElTVF9MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VUaWNrZXRzRGVidWdTdGFjayA9IChsYWJlbDogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBpZiAodHlwZW9mIEVycm9yICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBcIlwiO1xyXG4gIGNvbnN0IHJhd1N0YWNrID0gbmV3IEVycm9yKGxhYmVsKS5zdGFjaztcclxuICBpZiAodHlwZW9mIHJhd1N0YWNrICE9PSBcInN0cmluZ1wiIHx8ICFyYXdTdGFjay50cmltKCkpIHJldHVybiBcIlwiO1xyXG4gIHJldHVybiByYXdTdGFja1xyXG4gICAgLnNwbGl0KFwiXFxuXCIpXHJcbiAgICAuc2xpY2UoMCwgNilcclxuICAgIC5qb2luKFwiXFxuXCIpO1xyXG59O1xyXG5cclxuY29uc3QgdG9OdWxsYWJsZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IHRvTnVsbGFibGVCb29sID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB8IG51bGwgPT4ge1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSByZXR1cm4gdmFsdWU7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHZhbHVlID09PSAxID8gdHJ1ZSA6IHZhbHVlID09PSAwID8gZmFsc2UgOiBudWxsO1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB2YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmIChub3JtYWxpemVkID09PSBcInRydWVcIiB8fCBub3JtYWxpemVkID09PSBcIjFcIikgcmV0dXJuIHRydWU7XHJcbiAgICBpZiAobm9ybWFsaXplZCA9PT0gXCJmYWxzZVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwiMFwiKSByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgdG9OdWxsYWJsZVRpY2tldFN0YXR1cyA9ICh2YWx1ZTogdW5rbm93bik6IDAgfCAxIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICByZXR1cm4gcGFyc2VkID09PSAwIHx8IHBhcnNlZCA9PT0gMSA/IHBhcnNlZCA6IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCB0b051bGxhYmxlVGlja2V0R2FzdG9UeXBlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZUdhc3RvVHlwZUNvZGUgfCBudWxsID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpIHx8ICFBTExPV0VEX0dBU1RPX1RZUEVfQ09ERVMuaGFzKHBhcnNlZCkpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHBhcnNlZCBhcyBFeHBlbnNlR2FzdG9UeXBlQ29kZTtcclxufTtcclxuXHJcbmNvbnN0IG1hcFRpY2tldEl0ZW1Ub0NhcmQgPSAoaXRlbTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBFeHBlbnNlVGlja2V0Q2FyZCA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGtpbmQ6IFwiZ2VuZXJhbFwiLFxyXG4gICAgZmlsZUlkOiBTdHJpbmcoaXRlbT8uRmlsZUlkIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoaXRlbT8uRGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpLFxyXG4gICAgc3RhdHVzOiB0b051bGxhYmxlVGlja2V0U3RhdHVzKGl0ZW0/LlN0YXR1cyksXHJcbiAgICBwcm9jZXNzZWRCeUFJOiB0b051bGxhYmxlQm9vbChpdGVtPy5Qcm9jZXNzZWRCeUFJKSxcclxuICAgIGN1cnJlbmN5Q29kZTogU3RyaW5nKGl0ZW0/LkN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICB0b3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtPy5Ub3RhbEFtb3VudCksXHJcbiAgICB0cmFuc0RhdGU6IFN0cmluZyhpdGVtPy5UcmFuc0RhdGUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgZmlsZU5hbWU6IFN0cmluZyhpdGVtPy5GaWxlTmFtZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICBnYXN0b1R5cGU6IHRvTnVsbGFibGVUaWNrZXRHYXN0b1R5cGUoaXRlbT8uR2FzdG9UeXBlID8/IGl0ZW0/Lmdhc3RvVHlwZSksXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IG1hcFRpY2tldExpbmtJdGVtVG9DYXJkID0gKGl0ZW06IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogRXhwZW5zZVRpY2tldExpbmtDYXJkID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAga2luZDogXCJsaW5rXCIsXHJcbiAgICBmaWxlSWQ6IFN0cmluZyhpdGVtPy5GaWxlSWQgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgZGVzY3JpcHRpb246IFN0cmluZyhpdGVtPy5EZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXHJcbiAgICBwcm9jZXNzZWRCeUFJOiB0b051bGxhYmxlQm9vbChpdGVtPy5Qcm9jZXNzZWRCeUFJKSxcclxuICAgIGN1cnJlbmN5Q29kZTogU3RyaW5nKGl0ZW0/LkN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICB0b3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtPy5Ub3RhbEFtb3VudCksXHJcbiAgICB0cmFuc0RhdGU6IFN0cmluZyhpdGVtPy5UcmFuc0RhdGUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgZmlsZU5hbWU6IFN0cmluZyhpdGVtPy5GaWxlTmFtZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICBnYXN0b1R5cGU6IHRvTnVsbGFibGVUaWNrZXRHYXN0b1R5cGUoaXRlbT8uR2FzdG9UeXBlID8/IGl0ZW0/Lmdhc3RvVHlwZSksXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIE93bnMgbGlzdCBkYXRhIGZldGNoLCBsb2FkaW5nIHN0YXRlLCBhbmQgcGFnaW5hdGlvbiBtZXRhZGF0YSBmb3IgdGlja2V0cy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGEgPSAoeyBoYXNBY2Nlc3MsIHBhZ2VTaXplLCBtb2RlLCBvbkZvcmJpZGRlbiB9OiBVc2VFeHBlbnNlVGlja2V0c0xpc3REYXRhQXJncykgPT4ge1xyXG4gIGNvbnN0IFtpdGVtcywgc2V0SXRlbXNdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldExpc3RQYWdlSXRlbVtdPihbXSk7XHJcbiAgY29uc3QgW3RvdGFsLCBzZXRUb3RhbF0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbY3VycmVudFBhZ2UsIHNldEN1cnJlbnRQYWdlXSA9IHVzZVN0YXRlKDEpO1xyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmID0gdXNlUmVmPEFib3J0Q29udHJvbGxlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RLZXlSZWYgPSB1c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgYWN0aXZlUmVxdWVzdFNlcVJlZiA9IHVzZVJlZigwKTtcclxuXHJcbiAgY29uc3QgcmVzdG9yZUxpc3RTbmFwc2hvdCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHNuYXBzaG90OiB7IGl0ZW1zOiBFeHBlbnNlVGlja2V0TGlzdFBhZ2VJdGVtW107IHRvdGFsOiBudW1iZXI7IHBhZ2U6IG51bWJlciB9KSA9PiB7XHJcbiAgICAgIGNvbnN0IHNhZmVJdGVtcyA9IEFycmF5LmlzQXJyYXkoc25hcHNob3QuaXRlbXMpID8gc25hcHNob3QuaXRlbXMgOiBbXTtcclxuICAgICAgY29uc3Qgc2FmZVRvdGFsUmF3ID0gTnVtYmVyKHNuYXBzaG90LnRvdGFsKTtcclxuICAgICAgY29uc3Qgc2FmZVRvdGFsID0gTnVtYmVyLmlzRmluaXRlKHNhZmVUb3RhbFJhdykgJiYgc2FmZVRvdGFsUmF3ID49IDAgPyBzYWZlVG90YWxSYXcgOiBzYWZlSXRlbXMubGVuZ3RoO1xyXG4gICAgICBjb25zdCBzYWZlUGFnZVJhdyA9IE51bWJlcihzbmFwc2hvdC5wYWdlKTtcclxuICAgICAgY29uc3Qgc2FmZVBhZ2UgPSBOdW1iZXIuaXNGaW5pdGUoc2FmZVBhZ2VSYXcpICYmIHNhZmVQYWdlUmF3ID4gMCA/IE1hdGguZmxvb3Ioc2FmZVBhZ2VSYXcpIDogMTtcclxuXHJcbiAgICAgIHNldEl0ZW1zKHNhZmVJdGVtcyk7XHJcbiAgICAgIHNldFRvdGFsKHNhZmVUb3RhbCk7XHJcbiAgICAgIHNldEN1cnJlbnRQYWdlKHNhZmVQYWdlKTtcclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgbG9hZExpc3QgPSB1c2VDYWxsYmFjayhcclxuICAgIGFzeW5jIChwYWdlOiBudW1iZXIsIGZpbHRlcnM6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpID0+IHtcclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyhcImxvYWRMaXN0OnJlcXVlc3RlZFwiLCB7XHJcbiAgICAgICAgcGFnZSxcclxuICAgICAgICBtb2RlLFxyXG4gICAgICAgIGhhc0FjY2VzcyxcclxuICAgICAgICBmaWx0ZXJzLFxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKCFoYXNBY2Nlc3MpIHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwibG9hZExpc3Q6YmxvY2tlZC1uby1hY2Nlc3NcIiwge1xyXG4gICAgICAgICAgcGFnZSxcclxuICAgICAgICAgIG1vZGUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHBheWxvYWQgPVxyXG4gICAgICAgIG1vZGUgPT09IFwibGlua1wiXHJcbiAgICAgICAgICA/IGJ1aWxkRXhwZW5zZVRpY2tldExpbmtMaXN0UGF5bG9hZChmaWx0ZXJzLCBwYWdlLCBwYWdlU2l6ZSlcclxuICAgICAgICAgIDogYnVpbGRFeHBlbnNlVGlja2V0TGlzdFBheWxvYWQoZmlsdGVycywgcGFnZSwgcGFnZVNpemUpO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCA9IFN0cmluZyhmaWx0ZXJzPy5tYW5hZ2VkVXNlcklkIHx8IFwiXCIpLnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICBjb25zdCByZXF1ZXN0S2V5ID0gSlNPTi5zdHJpbmdpZnkoeyBtb2RlLCBwYXlsb2FkLCBtYW5hZ2VkVXNlcklkOiBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCB9KTtcclxuXHJcbiAgICAgIGlmIChhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ICYmIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9PT0gcmVxdWVzdEtleSkge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJsb2FkTGlzdDpza2lwLWR1cGxpY2F0ZS1yZXF1ZXN0XCIsIHtcclxuICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICBtb2RlLFxyXG4gICAgICAgICAgcmVxdWVzdEtleSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyhcImxvYWRMaXN0OmFib3J0LXByZXZpb3VzLXJlcXVlc3RcIiwge1xyXG4gICAgICAgICAgcHJldmlvdXNSZXF1ZXN0S2V5OiBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQsXHJcbiAgICAgICAgICBwcmV2aW91c1JlcXVlc3RTZXE6IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCxcclxuICAgICAgICAgIHN0YWNrOiBidWlsZEV4cGVuc2VUaWNrZXRzRGVidWdTdGFjayhcImxvYWRMaXN0OmFib3J0LXByZXZpb3VzLXJlcXVlc3RcIiksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudC5hYm9ydCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG4gICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcclxuICAgICAgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID0gcmVxdWVzdEtleTtcclxuICAgICAgY29uc3QgcmVxdWVzdFNlcSA9IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCArIDE7XHJcbiAgICAgIGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCA9IHJlcXVlc3RTZXE7XHJcbiAgICAgIGNvbnN0IGhhbmRsZUFib3J0U2lnbmFsID0gKCkgPT4ge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJsb2FkTGlzdDpzaWduYWwtYWJvcnQtZXZlbnRcIiwge1xyXG4gICAgICAgICAgcGFnZSxcclxuICAgICAgICAgIG1vZGUsXHJcbiAgICAgICAgICByZXF1ZXN0U2VxLFxyXG4gICAgICAgICAgcmVxdWVzdEtleSxcclxuICAgICAgICAgIHNpZ25hbEFib3J0ZWQ6IGNvbnRyb2xsZXIuc2lnbmFsLmFib3J0ZWQsXHJcbiAgICAgICAgICBzaWduYWxSZWFzb246XHJcbiAgICAgICAgICAgIFwicmVhc29uXCIgaW4gY29udHJvbGxlci5zaWduYWxcclxuICAgICAgICAgICAgICA/ICgoY29udHJvbGxlci5zaWduYWwgYXMgQWJvcnRTaWduYWwgJiB7IHJlYXNvbj86IHVua25vd24gfSkucmVhc29uID8/IG51bGwpXHJcbiAgICAgICAgICAgICAgOiBudWxsLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG4gICAgICBjb250cm9sbGVyLnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgaGFuZGxlQWJvcnRTaWduYWwsIHsgb25jZTogdHJ1ZSB9KTtcclxuXHJcbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RJbmZvKFwibG9hZExpc3Q6ZmV0Y2gtc3RhcnRcIiwge1xyXG4gICAgICAgIHBhZ2UsXHJcbiAgICAgICAgbW9kZSxcclxuICAgICAgICBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgICBwYXlsb2FkLFxyXG4gICAgICAgIHJlcXVlc3RLZXksXHJcbiAgICAgICAgcmVxdWVzdFNlcSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcnVuRXhwZW5zZVJlYWRSZXF1ZXN0V2l0aFJldHJ5KFxyXG4gICAgICAgICAgKCkgPT5cclxuICAgICAgICAgICAgbW9kZSA9PT0gXCJsaW5rXCJcclxuICAgICAgICAgICAgICA/IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3QocGF5bG9hZCwge1xyXG4gICAgICAgICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICAgICAgICAgICAgYXhVc2VySWRPdmVycmlkZTogbm9ybWFsaXplZE1hbmFnZWRVc2VySWQgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICA6IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QocGF5bG9hZCwge1xyXG4gICAgICAgICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICAgICAgICAgICAgYXhVc2VySWRPdmVycmlkZTogbm9ybWFsaXplZE1hbmFnZWRVc2VySWQgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RJbmZvKFwibG9hZExpc3Q6ZmV0Y2gtZmluaXNoZWRcIiwge1xyXG4gICAgICAgICAgcGFnZSxcclxuICAgICAgICAgIG1vZGUsXHJcbiAgICAgICAgICByZXF1ZXN0U2VxLFxyXG4gICAgICAgICAgc3VjY2VzczogcmVzcG9uc2U/LlN1Y2Nlc3MsXHJcbiAgICAgICAgICB0b3RhbDogcmVzcG9uc2U/LlRvdGFsLFxyXG4gICAgICAgICAgaXRlbXM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zLmxlbmd0aCA6IDAsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHJlcXVlc3RTZXEgIT09IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwibG9hZExpc3Q6YXBpLXVuc3VjY2Vzc2Z1bFwiLCB7XHJcbiAgICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICAgIG1vZGUsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLk1lc3NhZ2UsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJUaWNrZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldHMuXCIpKTtcclxuICAgICAgICAgIHNldEl0ZW1zKFtdKTtcclxuICAgICAgICAgIHNldFRvdGFsKDApO1xyXG4gICAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzb3VyY2VJdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XHJcbiAgICAgICAgY29uc3QgbWFwcGVkSXRlbXMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+XHJcbiAgICAgICAgICBtb2RlID09PSBcImxpbmtcIlxyXG4gICAgICAgICAgICA/IG1hcFRpY2tldExpbmtJdGVtVG9DYXJkKGl0ZW0gYXMgdW5rbm93biBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilcclxuICAgICAgICAgICAgOiBtYXBUaWNrZXRJdGVtVG9DYXJkKGl0ZW0gYXMgdW5rbm93biBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlVG90YWwgPSBOdW1iZXIocmVzcG9uc2U/LlRvdGFsID8/IG1hcHBlZEl0ZW1zLmxlbmd0aCA/PyAwKTtcclxuXHJcbiAgICAgICAgc2V0SXRlbXMobWFwcGVkSXRlbXMpO1xyXG4gICAgICAgIHNldFRvdGFsKHJlc3BvbnNlVG90YWwpO1xyXG4gICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChyZXF1ZXN0U2VxICE9PSBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgICAgICBpZiAoaXNFeHBlbnNlQWJvcnRMaWtlRXJyb3IoZXJyb3IsIGNvbnRyb2xsZXIuc2lnbmFsKSkge1xyXG4gICAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImxvYWRMaXN0OmFib3J0ZWRcIiwge1xyXG4gICAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgICBtb2RlLFxyXG4gICAgICAgICAgICByZXF1ZXN0U2VxLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGVycm9yLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwibG9hZExpc3Q6Zm9yYmlkZGVuXCIsIHtcclxuICAgICAgICAgICAgcGFnZSxcclxuICAgICAgICAgICAgbW9kZSxcclxuICAgICAgICAgICAgcmVxdWVzdFNlcSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEVycm9yKFwibG9hZExpc3Q6ZmFpbGVkXCIsIHtcclxuICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICBtb2RlLFxyXG4gICAgICAgICAgcmVxdWVzdFNlcSxcclxuICAgICAgICAgIG1lc3NhZ2U6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogZXJyb3IsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIlRpY2tldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0cy5cIik7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICAgIHNldEl0ZW1zKFtdKTtcclxuICAgICAgICBzZXRUb3RhbCgwKTtcclxuICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBjb250cm9sbGVyLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgaGFuZGxlQWJvcnRTaWduYWwpO1xyXG4gICAgICAgIGlmIChyZXF1ZXN0U2VxID09PSBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8oXCJsb2FkTGlzdDpmaW5hbGl6ZVwiLCB7XHJcbiAgICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICAgIG1vZGUsXHJcbiAgICAgICAgICAgIHJlcXVlc3RTZXEsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICAgIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW2hhc0FjY2VzcywgbW9kZSwgb25Gb3JiaWRkZW4sIHBhZ2VTaXplXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHJlc2V0TGlzdCA9IHVzZUNhbGxiYWNrKChzb3VyY2UgPSBcInVua25vd25cIikgPT4ge1xyXG4gICAgaWYgKGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcInJlc2V0TGlzdDphYm9ydC1hY3RpdmUtcmVxdWVzdFwiLCB7XHJcbiAgICAgICAgc291cmNlLFxyXG4gICAgICAgIGFjdGl2ZVJlcXVlc3RLZXk6IGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCxcclxuICAgICAgICBhY3RpdmVSZXF1ZXN0U2VxOiBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQsXHJcbiAgICAgICAgc3RhY2s6IGJ1aWxkRXhwZW5zZVRpY2tldHNEZWJ1Z1N0YWNrKGByZXNldExpc3Q6JHtzb3VyY2V9YCksXHJcbiAgICAgIH0pO1xyXG4gICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50LmFib3J0KCk7XHJcbiAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyhcInJlc2V0TGlzdDpjbGVhci1zdGF0ZVwiLCB7XHJcbiAgICAgIHNvdXJjZSxcclxuICAgIH0pO1xyXG4gICAgc2V0SXRlbXMoW10pO1xyXG4gICAgc2V0VG90YWwoMCk7XHJcbiAgICBzZXRDdXJyZW50UGFnZSgxKTtcclxuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNsZWFyTGlzdENhY2hlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgLy8gVGlja2V0IGxpc3QgYXV0by1sb2FkIG11c3QgYWx3YXlzIGhpdCB0aGUgbGl2ZSBlbmRwb2ludC5cclxuICB9LCBbXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpZiAoYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCkge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJjbGVhbnVwOmFib3J0LWFjdGl2ZS1yZXF1ZXN0XCIsIHtcclxuICAgICAgICAgIGFjdGl2ZVJlcXVlc3RLZXk6IGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCxcclxuICAgICAgICAgIGFjdGl2ZVJlcXVlc3RTZXE6IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCxcclxuICAgICAgICAgIHN0YWNrOiBidWlsZEV4cGVuc2VUaWNrZXRzRGVidWdTdGFjayhcImNsZWFudXA6YWJvcnQtYWN0aXZlLXJlcXVlc3RcIiksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudC5hYm9ydCgpO1xyXG4gICAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaXRlbXMsXHJcbiAgICB0b3RhbCxcclxuICAgIGN1cnJlbnRQYWdlLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgbG9hZExpc3QsXHJcbiAgICByZXN0b3JlTGlzdFNuYXBzaG90LFxyXG4gICAgcmVzZXRMaXN0LFxyXG4gICAgY2xlYXJMaXN0Q2FjaGUsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdC50c1wiO1xyXG5pbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcclxuICBFeHBlbnNlVGlja2V0TGlua0NhcmQsXHJcbiAgRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25Nb2RlLFxyXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcclxuaW1wb3J0IHsgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LCByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvc2Vzc2lvbkV4cGlyeS50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlU2NvcGVUb2tlbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2NvcGUudHNcIjtcclxuXHJcbmNvbnN0IEVYUEVOU0VfVElDS0VUX0xJTktfUkVUVVJOX1NUQVRFX0tFWV9QUkVGSVggPSBcImV4cGVuc2VfdGlja2V0X2xpbmtfcmV0dXJuX3N0YXRlX3YxXCI7XHJcbmNvbnN0IEVYUEVOU0VfVElDS0VUX0xJTktfUkVUVVJOX1NUQVRFX1RUTF9NUyA9IDEyICogNjAgKiA2MCAqIDEwMDA7XHJcbmNvbnN0IEFMTE9XRURfVElDS0VUX0dBU1RPX1RZUEVTID0gbmV3IFNldDxudW1iZXI+KFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0pO1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSA9IHtcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgcGFnZTogbnVtYmVyO1xyXG4gIHNjcm9sbFk6IG51bWJlcjtcclxuICBmb2N1c0ZpbGVJZDogc3RyaW5nO1xyXG4gIGZpbHRlcnM6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3Q7XHJcbiAgc2VsZWN0aW9uTW9kZTogRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25Nb2RlO1xyXG4gIHNlbGVjdGVkVGlja2V0czogRXhwZW5zZVRpY2tldExpbmtDYXJkW107XHJcbiAgZXhjbHVkZWRJZHM6IHN0cmluZ1tdO1xyXG4gIGZpbHRlcmVkU2VsZWN0aW9uRmlsdGVyczogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB8IG51bGw7XHJcbiAgZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbDogbnVtYmVyO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0U2NvcGVkS2V5ID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGAke0VYUEVOU0VfVElDS0VUX0xJTktfUkVUVVJOX1NUQVRFX0tFWV9QUkVGSVh9XyR7Z2V0RXhwZW5zZVNjb3BlVG9rZW4oKX1gO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplRmlsZUlkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVByb2Nlc3NlZEJ5QWkgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBmYWxzZSkgcmV0dXJuIHZhbHVlO1xyXG4gIGlmICh2YWx1ZSA9PT0gMSB8fCB2YWx1ZSA9PT0gXCIxXCIgfHwgdmFsdWUgPT09IFwidHJ1ZVwiKSByZXR1cm4gdHJ1ZTtcclxuICBpZiAodmFsdWUgPT09IDAgfHwgdmFsdWUgPT09IFwiMFwiIHx8IHZhbHVlID09PSBcImZhbHNlXCIpIHJldHVybiBmYWxzZTtcclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZU51bGxhYmxlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVGlja2V0R2FzdG9UeXBlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZVRpY2tldExpbmtDYXJkW1wiZ2FzdG9UeXBlXCJdID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpIHx8ICFBTExPV0VEX1RJQ0tFVF9HQVNUT19UWVBFUy5oYXMocGFyc2VkKSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIHJldHVybiBwYXJzZWQgYXMgRXhwZW5zZVRpY2tldExpbmtDYXJkW1wiZ2FzdG9UeXBlXCJdO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplU2VsZWN0aW9uTW9kZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZSA9PiB7XHJcbiAgcmV0dXJuIHZhbHVlID09PSBcImZpbHRlcmVkXCIgPyBcImZpbHRlcmVkXCIgOiBcInNlbGVjdGVkXCI7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVTZWxlY3RlZFRpY2tldHMgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlVGlja2V0TGlua0NhcmRbXSA9PiB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIFtdO1xyXG5cclxuICBjb25zdCBpdGVtcyA9IG5ldyBNYXA8c3RyaW5nLCBFeHBlbnNlVGlja2V0TGlua0NhcmQ+KCk7XHJcbiAgZm9yIChjb25zdCBlbnRyeSBvZiB2YWx1ZSkge1xyXG4gICAgY29uc3QgaXRlbSA9IChlbnRyeSB8fCB7fSkgYXMgUGFydGlhbDxFeHBlbnNlVGlja2V0TGlua0NhcmQ+O1xyXG4gICAgY29uc3QgZmlsZUlkID0gbm9ybWFsaXplRmlsZUlkKGl0ZW0uZmlsZUlkKTtcclxuICAgIGlmICghZmlsZUlkKSBjb250aW51ZTtcclxuXHJcbiAgICBpdGVtcy5zZXQoZmlsZUlkLCB7XHJcbiAgICAgIGtpbmQ6IFwibGlua1wiLFxyXG4gICAgICBmaWxlSWQsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoaXRlbS5kZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXHJcbiAgICAgIHByb2Nlc3NlZEJ5QUk6IG5vcm1hbGl6ZVByb2Nlc3NlZEJ5QWkoaXRlbS5wcm9jZXNzZWRCeUFJKSxcclxuICAgICAgY3VycmVuY3lDb2RlOiBTdHJpbmcoaXRlbS5jdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgICB0b3RhbEFtb3VudDogbm9ybWFsaXplTnVsbGFibGVOdW1iZXIoaXRlbS50b3RhbEFtb3VudCksXHJcbiAgICAgIHRyYW5zRGF0ZTogU3RyaW5nKGl0ZW0udHJhbnNEYXRlIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgICAgZmlsZU5hbWU6IFN0cmluZyhpdGVtLmZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgICAgZ2FzdG9UeXBlOiBub3JtYWxpemVUaWNrZXRHYXN0b1R5cGUoaXRlbS5nYXN0b1R5cGUpLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gQXJyYXkuZnJvbShpdGVtcy52YWx1ZXMoKSk7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVFeGNsdWRlZElkcyA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZ1tdID0+IHtcclxuICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gW107XHJcblxyXG4gIGNvbnN0IGlkcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG4gIGZvciAoY29uc3QgZW50cnkgb2YgdmFsdWUpIHtcclxuICAgIGNvbnN0IGZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZChlbnRyeSk7XHJcbiAgICBpZiAoIWZpbGVJZCkgY29udGludWU7XHJcbiAgICBpZHMuYWRkKGZpbGVJZCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gQXJyYXkuZnJvbShpZHMpO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplTm9uTmVnYXRpdmVJbnRlZ2VyID0gKHZhbHVlOiB1bmtub3duLCBmYWxsYmFjayA9IDApOiBudW1iZXIgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpICYmIHBhcnNlZCA+PSAwID8gTWF0aC5mbG9vcihwYXJzZWQpIDogZmFsbGJhY2s7XHJcbn07XHJcblxyXG4vLyBOb3JtYWxpemVzIHRoZSBsaW5rLW1vZGUgdGlja2V0IHJldHVybiBzdGF0ZSBzbyBiYWNrIG5hdmlnYXRpb24gY2FuIHJlc3RvcmUgZmlsdGVycyBhbmQgc2VsZWN0aW9uIHNhZmVseS5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlIHwgbnVsbCA9PiB7XHJcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBwYXlsb2FkID0gdmFsdWUgYXMgUGFydGlhbDxFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlPjtcclxuICBjb25zdCBzaGVldElkID0gU3RyaW5nKHBheWxvYWQuc2hlZXRJZCB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCFzaGVldElkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNoZWV0SWQsXHJcbiAgICBwYWdlOiBNYXRoLm1heCgxLCBub3JtYWxpemVOb25OZWdhdGl2ZUludGVnZXIocGF5bG9hZC5wYWdlLCAxKSksXHJcbiAgICBzY3JvbGxZOiBub3JtYWxpemVOb25OZWdhdGl2ZUludGVnZXIocGF5bG9hZC5zY3JvbGxZKSxcclxuICAgIGZvY3VzRmlsZUlkOiBub3JtYWxpemVGaWxlSWQocGF5bG9hZC5mb2N1c0ZpbGVJZCksXHJcbiAgICBmaWx0ZXJzOiBub3JtYWxpemVFeHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QocGF5bG9hZC5maWx0ZXJzKSxcclxuICAgIHNlbGVjdGlvbk1vZGU6IG5vcm1hbGl6ZVNlbGVjdGlvbk1vZGUocGF5bG9hZC5zZWxlY3Rpb25Nb2RlKSxcclxuICAgIHNlbGVjdGVkVGlja2V0czogbm9ybWFsaXplU2VsZWN0ZWRUaWNrZXRzKHBheWxvYWQuc2VsZWN0ZWRUaWNrZXRzKSxcclxuICAgIGV4Y2x1ZGVkSWRzOiBub3JtYWxpemVFeGNsdWRlZElkcyhwYXlsb2FkLmV4Y2x1ZGVkSWRzKSxcclxuICAgIGZpbHRlcmVkU2VsZWN0aW9uRmlsdGVyczogcGF5bG9hZC5maWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnNcclxuICAgICAgPyBub3JtYWxpemVFeHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QocGF5bG9hZC5maWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnMpXHJcbiAgICAgIDogbnVsbCxcclxuICAgIGZpbHRlcmVkU2VsZWN0aW9uVG90YWw6IG5vcm1hbGl6ZU5vbk5lZ2F0aXZlSW50ZWdlcihwYXlsb2FkLmZpbHRlcmVkU2VsZWN0aW9uVG90YWwpLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBSZWFkcyBhIHN0b3JlZCBsaW5rLW1vZGUgcmV0dXJuIHN0YXRlIHdoZW4gaXQgc3RpbGwgbWF0Y2hlcyB0aGUgYWN0aXZlIGV4cGVuc2Ugc2hlZXQuXHJcbmV4cG9ydCBjb25zdCByZWFkRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSA9IChzaGVldElkPzogdW5rbm93bik6IEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgfCBudWxsID0+IHtcclxuICBjb25zdCBzdG9yZWQgPSBub3JtYWxpemVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKFxyXG4gICAgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5PEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGU+KGdldFNjb3BlZEtleSgpKVxyXG4gICk7XHJcbiAgaWYgKCFzdG9yZWQpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBzYWZlU2hlZXRJZCA9IFN0cmluZyhzaGVldElkIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXNhZmVTaGVldElkKSByZXR1cm4gc3RvcmVkO1xyXG4gIHJldHVybiBzdG9yZWQuc2hlZXRJZC50b1VwcGVyQ2FzZSgpID09PSBzYWZlU2hlZXRJZC50b1VwcGVyQ2FzZSgpID8gc3RvcmVkIDogbnVsbDtcclxufTtcclxuXHJcbi8vIFBlcnNpc3RzIHRoZSBtaW5pbXVtIGxpbmstbW9kZSBzdGF0ZSByZXF1aXJlZCB0byByZXR1cm4gZnJvbSB0aWNrZXQgZGV0YWlsIHdpdGhvdXQgbG9zaW5nIHNlbGVjdGlvbi5cclxuZXhwb3J0IGNvbnN0IHNhdmVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlID0gKFxyXG4gIHZhbHVlOiBFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlIHwgbnVsbCB8IHVuZGVmaW5lZFxyXG4pOiBFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlIHwgbnVsbCA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUodmFsdWUpO1xyXG4gIGlmICghbm9ybWFsaXplZCkge1xyXG4gICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKCk7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeShnZXRTY29wZWRLZXkoKSwgbm9ybWFsaXplZCwgRVhQRU5TRV9USUNLRVRfTElOS19SRVRVUk5fU1RBVEVfVFRMX01TKTtcclxuICByZXR1cm4gbm9ybWFsaXplZDtcclxufTtcclxuXHJcbi8vIENsZWFycyBhbnkgc3RvcmVkIGxpbmstbW9kZSByZXR1cm4gc3RhdGUgZm9yIHRoZSBjdXJyZW50IGV4cGVuc2Ugc2NvcGUuXHJcbmV4cG9ydCBjb25zdCBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgPSAoKTogdm9pZCA9PiB7XHJcbiAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShnZXRTY29wZWRLZXkoKSk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXHJcbiAgRXhwZW5zZVRpY2tldExpbmtDYXJkLFxyXG4gIEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZSxcclxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvblN0YXRlID0ge1xyXG4gIHNlbGVjdGlvbk1vZGU6IEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZTtcclxuICBzZWxlY3RlZFRpY2tldHM6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtdO1xyXG4gIGV4Y2x1ZGVkSWRzOiBzdHJpbmdbXTtcclxuICBmaWx0ZXJlZFNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90IHwgbnVsbDtcclxuICBmaWx0ZXJlZFRvdGFsQ291bnQ6IG51bWJlcjtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUZpbGVJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xyXG5cclxuY29uc3Qgbm9ybWFsaXplU2VsZWN0aW9uTW9kZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZSA9PiB7XHJcbiAgcmV0dXJuIHZhbHVlID09PSBcImZpbHRlcmVkXCIgPyBcImZpbHRlcmVkXCIgOiBcInNlbGVjdGVkXCI7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVFeGNsdWRlZElkcyA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZ1tdID0+IHtcclxuICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gW107XHJcblxyXG4gIGNvbnN0IGlkcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG4gIGZvciAoY29uc3QgZW50cnkgb2YgdmFsdWUpIHtcclxuICAgIGNvbnN0IGZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZChlbnRyeSk7XHJcbiAgICBpZiAoIWZpbGVJZCkgY29udGludWU7XHJcbiAgICBpZHMuYWRkKGZpbGVJZCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gQXJyYXkuZnJvbShpZHMpO1xyXG59O1xyXG5cclxuY29uc3QgdG9TZWxlY3RlZE1hcCA9IChpdGVtczogRXhwZW5zZVRpY2tldExpbmtDYXJkW10pOiBSZWNvcmQ8c3RyaW5nLCBFeHBlbnNlVGlja2V0TGlua0NhcmQ+ID0+IHtcclxuICBjb25zdCBuZXh0OiBSZWNvcmQ8c3RyaW5nLCBFeHBlbnNlVGlja2V0TGlua0NhcmQ+ID0ge307XHJcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XHJcbiAgICBjb25zdCBmaWxlSWQgPSBub3JtYWxpemVGaWxlSWQoaXRlbS5maWxlSWQpO1xyXG4gICAgaWYgKCFmaWxlSWQpIGNvbnRpbnVlO1xyXG4gICAgbmV4dFtmaWxlSWRdID0gaXRlbTtcclxuICB9XHJcbiAgcmV0dXJuIG5leHQ7XHJcbn07XHJcblxyXG4vLyBLZWVwcyBsaW5rLW1vZGUgdGlja2V0IHNlbGVjdGlvbiBzdGFibGUgYWNyb3NzIHBhZ2luZywgZmlsdGVyZWQgc2VsZWN0LWFsbCwgYW5kIGRldGFpbCByZXR1cm5zLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgY29uc3QgW3NlbGVjdGlvbk1vZGUsIHNldFNlbGVjdGlvbk1vZGVdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25Nb2RlPihcInNlbGVjdGVkXCIpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZFRpY2tldHNCeUlkLCBzZXRTZWxlY3RlZFRpY2tldHNCeUlkXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZD4+KHt9KTtcclxuICBjb25zdCBbZXhjbHVkZWRJZHMsIHNldEV4Y2x1ZGVkSWRzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXSk7XHJcbiAgY29uc3QgW2ZpbHRlcmVkU25hcHNob3QsIHNldEZpbHRlcmVkU25hcHNob3RdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtmaWx0ZXJlZFRvdGFsQ291bnQsIHNldEZpbHRlcmVkVG90YWxDb3VudF0gPSB1c2VTdGF0ZSgwKTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0ZWRUaWNrZXRzID0gdXNlTWVtbygoKSA9PiBPYmplY3QudmFsdWVzKHNlbGVjdGVkVGlja2V0c0J5SWQpLCBbc2VsZWN0ZWRUaWNrZXRzQnlJZF0pO1xyXG4gIGNvbnN0IGV4Y2x1ZGVkSWRTZXQgPSB1c2VNZW1vKCgpID0+IG5ldyBTZXQoZXhjbHVkZWRJZHMpLCBbZXhjbHVkZWRJZHNdKTtcclxuICBjb25zdCBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlID0gc2VsZWN0aW9uTW9kZSA9PT0gXCJmaWx0ZXJlZFwiICYmICEhZmlsdGVyZWRTbmFwc2hvdDtcclxuXHJcbiAgY29uc3QgY2xlYXJTZWxlY3Rpb24gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRTZWxlY3Rpb25Nb2RlKFwic2VsZWN0ZWRcIik7XHJcbiAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKHt9KTtcclxuICAgIHNldEV4Y2x1ZGVkSWRzKFtdKTtcclxuICAgIHNldEZpbHRlcmVkU25hcHNob3QobnVsbCk7XHJcbiAgICBzZXRGaWx0ZXJlZFRvdGFsQ291bnQoMCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCByZXN0b3JlU2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soKHN0YXRlOiBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvblN0YXRlIHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4ge1xyXG4gICAgaWYgKCFzdGF0ZSkge1xyXG4gICAgICBjbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgbm9ybWFsaXplZE1vZGUgPSBub3JtYWxpemVTZWxlY3Rpb25Nb2RlKHN0YXRlLnNlbGVjdGlvbk1vZGUpO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZFNlbGVjdGVkVGlja2V0cyA9IEFycmF5LmlzQXJyYXkoc3RhdGUuc2VsZWN0ZWRUaWNrZXRzKSA/IHN0YXRlLnNlbGVjdGVkVGlja2V0cyA6IFtdO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZFNuYXBzaG90ID0gc3RhdGUuZmlsdGVyZWRTbmFwc2hvdCB8fCBudWxsO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZEV4Y2x1ZGVkSWRzID0gbm9ybWFsaXplRXhjbHVkZWRJZHMoc3RhdGUuZXhjbHVkZWRJZHMpO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZEZpbHRlcmVkVG90YWwgPSBOdW1iZXIuaXNGaW5pdGUoTnVtYmVyKHN0YXRlLmZpbHRlcmVkVG90YWxDb3VudCkpXHJcbiAgICAgID8gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihOdW1iZXIoc3RhdGUuZmlsdGVyZWRUb3RhbENvdW50KSkpXHJcbiAgICAgIDogMDtcclxuXHJcbiAgICBzZXRTZWxlY3Rpb25Nb2RlKG5vcm1hbGl6ZWRNb2RlID09PSBcImZpbHRlcmVkXCIgJiYgbm9ybWFsaXplZFNuYXBzaG90ID8gXCJmaWx0ZXJlZFwiIDogXCJzZWxlY3RlZFwiKTtcclxuICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQodG9TZWxlY3RlZE1hcChub3JtYWxpemVkU2VsZWN0ZWRUaWNrZXRzKSk7XHJcbiAgICBzZXRFeGNsdWRlZElkcyhub3JtYWxpemVkTW9kZSA9PT0gXCJmaWx0ZXJlZFwiID8gbm9ybWFsaXplZEV4Y2x1ZGVkSWRzIDogW10pO1xyXG4gICAgc2V0RmlsdGVyZWRTbmFwc2hvdChub3JtYWxpemVkTW9kZSA9PT0gXCJmaWx0ZXJlZFwiID8gbm9ybWFsaXplZFNuYXBzaG90IDogbnVsbCk7XHJcbiAgICBzZXRGaWx0ZXJlZFRvdGFsQ291bnQobm9ybWFsaXplZE1vZGUgPT09IFwiZmlsdGVyZWRcIiA/IG5vcm1hbGl6ZWRGaWx0ZXJlZFRvdGFsIDogMCk7XHJcbiAgfSwgW2NsZWFyU2VsZWN0aW9uXSk7XHJcblxyXG4gIGNvbnN0IHNlbGVjdEFsbEJ5RmlsdGVycyA9IHVzZUNhbGxiYWNrKChzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCwgdG90YWxDb3VudDogbnVtYmVyKSA9PiB7XHJcbiAgICBzZXRTZWxlY3Rpb25Nb2RlKFwiZmlsdGVyZWRcIik7XHJcbiAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKHt9KTtcclxuICAgIHNldEV4Y2x1ZGVkSWRzKFtdKTtcclxuICAgIHNldEZpbHRlcmVkU25hcHNob3Qoc25hcHNob3QpO1xyXG4gICAgc2V0RmlsdGVyZWRUb3RhbENvdW50KE51bWJlci5pc0Zpbml0ZSh0b3RhbENvdW50KSA/IE1hdGgubWF4KDAsIE1hdGguZmxvb3IodG90YWxDb3VudCkpIDogMCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBpc1NlbGVjdGVkID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZmlsZUlkOiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3Qgc2FmZUZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZChmaWxlSWQpO1xyXG4gICAgICBpZiAoIXNhZmVGaWxlSWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgIGlmIChpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlKSB7XHJcbiAgICAgICAgcmV0dXJuICFleGNsdWRlZElkU2V0LmhhcyhzYWZlRmlsZUlkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuICEhc2VsZWN0ZWRUaWNrZXRzQnlJZFtzYWZlRmlsZUlkXTtcclxuICAgIH0sXHJcbiAgICBbZXhjbHVkZWRJZFNldCwgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSwgc2VsZWN0ZWRUaWNrZXRzQnlJZF1cclxuICApO1xyXG5cclxuICBjb25zdCB0b2dnbGVUaWNrZXQgPSB1c2VDYWxsYmFjayhcclxuICAgICh0aWNrZXQ6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCkgPT4ge1xyXG4gICAgICBjb25zdCBmaWxlSWQgPSBub3JtYWxpemVGaWxlSWQodGlja2V0LmZpbGVJZCk7XHJcbiAgICAgIGlmICghZmlsZUlkKSByZXR1cm47XHJcblxyXG4gICAgICBpZiAoaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSkge1xyXG4gICAgICAgIHNldEV4Y2x1ZGVkSWRzKChwcmV2aW91cykgPT4ge1xyXG4gICAgICAgICAgY29uc3QgbmV4dCA9IG5ldyBTZXQocHJldmlvdXMpO1xyXG4gICAgICAgICAgaWYgKG5leHQuaGFzKGZpbGVJZCkpIHtcclxuICAgICAgICAgICAgbmV4dC5kZWxldGUoZmlsZUlkKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5leHQuYWRkKGZpbGVJZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShuZXh0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldmlvdXMgfTtcclxuICAgICAgICBpZiAobmV4dFtmaWxlSWRdKSB7XHJcbiAgICAgICAgICBkZWxldGUgbmV4dFtmaWxlSWRdO1xyXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5leHRbZmlsZUlkXSA9IHRpY2tldDtcclxuICAgICAgICByZXR1cm4gbmV4dDtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW2lzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaHlkcmF0ZVZpc2libGVUaWNrZXRzID0gdXNlQ2FsbGJhY2soKGl0ZW1zOiBFeHBlbnNlVGlja2V0TGlua0NhcmRbXSkgPT4ge1xyXG4gICAgaWYgKHNlbGVjdGlvbk1vZGUgIT09IFwic2VsZWN0ZWRcIiB8fCBpdGVtcy5sZW5ndGggPCAxKSByZXR1cm47XHJcblxyXG4gICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZCgocHJldmlvdXMpID0+IHtcclxuICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldmlvdXMgfTtcclxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XHJcbiAgICAgICAgY29uc3QgZmlsZUlkID0gbm9ybWFsaXplRmlsZUlkKGl0ZW0uZmlsZUlkKTtcclxuICAgICAgICBpZiAoIWZpbGVJZCB8fCAhbmV4dFtmaWxlSWRdKSBjb250aW51ZTtcclxuICAgICAgICBuZXh0W2ZpbGVJZF0gPSBpdGVtO1xyXG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjaGFuZ2VkID8gbmV4dCA6IHByZXZpb3VzO1xyXG4gICAgfSk7XHJcbiAgfSwgW3NlbGVjdGlvbk1vZGVdKTtcclxuXHJcbiAgY29uc3QgcmVzb2x2ZVNlbGVjdGVkQ291bnQgPSB1c2VDYWxsYmFjayhcclxuICAgIChmYWxsYmFja1RvdGFsQ291bnQgPSAwKTogbnVtYmVyID0+IHtcclxuICAgICAgaWYgKCFpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkVGlja2V0cy5sZW5ndGg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGJhc2VDb3VudCA9IGZpbHRlcmVkVG90YWxDb3VudCA+IDAgPyBmaWx0ZXJlZFRvdGFsQ291bnQgOiBNYXRoLm1heCgwLCBNYXRoLmZsb29yKGZhbGxiYWNrVG90YWxDb3VudCkpO1xyXG4gICAgICByZXR1cm4gTWF0aC5tYXgoMCwgYmFzZUNvdW50IC0gZXhjbHVkZWRJZHMubGVuZ3RoKTtcclxuICAgIH0sXHJcbiAgICBbZXhjbHVkZWRJZHMubGVuZ3RoLCBmaWx0ZXJlZFRvdGFsQ291bnQsIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUsIHNlbGVjdGVkVGlja2V0cy5sZW5ndGhdXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNlbGVjdGlvbk1vZGUsXHJcbiAgICBzZWxlY3RlZFRpY2tldHMsXHJcbiAgICBleGNsdWRlZElkcyxcclxuICAgIGZpbHRlcmVkU25hcHNob3QsXHJcbiAgICBmaWx0ZXJlZFRvdGFsQ291bnQsXHJcbiAgICBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlLFxyXG4gICAgaXNTZWxlY3RlZCxcclxuICAgIHRvZ2dsZVRpY2tldCxcclxuICAgIGNsZWFyU2VsZWN0aW9uLFxyXG4gICAgcmVzdG9yZVNlbGVjdGlvbixcclxuICAgIHNlbGVjdEFsbEJ5RmlsdGVycyxcclxuICAgIGh5ZHJhdGVWaXNpYmxlVGlja2V0cyxcclxuICAgIHJlc29sdmVTZWxlY3RlZENvdW50LFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWR1Y2VyIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRSZXF1ZXN0ID0ge1xyXG4gIHBhZ2U6IG51bWJlcjtcclxuICBzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdDtcclxuICBjbGVhckNhY2hlOiBib29sZWFuO1xyXG4gIHJlc2V0QmVmb3JlTG9hZDogYm9vbGVhbjtcclxuICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBBdXRvbWF0aWNMb2FkQWN0aW9uID1cclxuICB8IHtcclxuICAgICAgdHlwZTogXCJzY2hlZHVsZVwiO1xyXG4gICAgICByZXF1ZXN0OiBFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZFJlcXVlc3Q7XHJcbiAgICB9XHJcbiAgfCB7XHJcbiAgICAgIHR5cGU6IFwiY2xlYXJcIjtcclxuICAgIH1cclxuICB8IHtcclxuICAgICAgdHlwZTogXCJkaXNhYmxlX2xpbmtfd2FpdFwiO1xyXG4gICAgfTtcclxuXHJcbmNvbnN0IGF1dG9tYXRpY0xvYWRSZWR1Y2VyID0gKFxyXG4gIHN0YXRlOiBFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZFJlcXVlc3QgfCBudWxsLFxyXG4gIGFjdGlvbjogQXV0b21hdGljTG9hZEFjdGlvblxyXG4pOiBFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZFJlcXVlc3QgfCBudWxsID0+IHtcclxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICBjYXNlIFwic2NoZWR1bGVcIjpcclxuICAgICAgcmV0dXJuIGFjdGlvbi5yZXF1ZXN0O1xyXG4gICAgY2FzZSBcImNsZWFyXCI6XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgY2FzZSBcImRpc2FibGVfbGlua193YWl0XCI6XHJcbiAgICAgIHJldHVybiBzdGF0ZSA/IHsgLi4uc3RhdGUsIHdhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHk6IGZhbHNlIH0gOiBudWxsO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxufTtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRBcmdzID0ge1xyXG4gIGlzTGlua01vZGU6IGJvb2xlYW47XHJcbiAgY2FuUHJvY2Vzc0xpbmtNb2RlOiBib29sZWFuO1xyXG4gIGxpbmtTaGVldENoZWNrQnVzeTogYm9vbGVhbjtcclxuICBsaW5rU2hlZXRMb2NrZWQ6IGJvb2xlYW47XHJcbiAgY2xlYXJMaXN0Q2FjaGU6ICgpID0+IHZvaWQ7XHJcbiAgcmVzZXRMaXN0OiAoc291cmNlPzogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGxvYWRMaXN0OiAocGFnZTogbnVtYmVyLCBzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4gUHJvbWlzZTx2b2lkPjtcclxufTtcclxuXHJcbmNvbnN0IEVYUEVOU0VfVElDS0VUU19BVVRPX0xPQURfTE9HX1BSRUZJWCA9IFwiW2V4cGVuc2UtdGlja2V0czphdXRvLWxvYWRdXCI7XHJcblxyXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkSW5mbyA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUuaW5mbyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLmluZm8oRVhQRU5TRV9USUNLRVRTX0FVVE9fTE9BRF9MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkV2FybiA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUud2FybiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLndhcm4oRVhQRU5TRV9USUNLRVRTX0FVVE9fTE9BRF9MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBRdWV1ZXMgb25lIHRpY2tldCBsaXN0IHJlbG9hZCBhbmQgcmVsZWFzZXMgaXQgb25seSB3aGVuIGxpbmstbW9kZSBwcmVjb25kaXRpb25zIGFyZSByZWFkeS5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkID0gKHtcclxuICBpc0xpbmtNb2RlLFxyXG4gIGNhblByb2Nlc3NMaW5rTW9kZSxcclxuICBsaW5rU2hlZXRDaGVja0J1c3ksXHJcbiAgbGlua1NoZWV0TG9ja2VkLFxyXG4gIGNsZWFyTGlzdENhY2hlLFxyXG4gIHJlc2V0TGlzdCxcclxuICBsb2FkTGlzdCxcclxufTogVXNlRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRBcmdzKSA9PiB7XHJcbiAgY29uc3QgW3BlbmRpbmdBdXRvbWF0aWNMb2FkLCBkaXNwYXRjaF0gPSB1c2VSZWR1Y2VyKGF1dG9tYXRpY0xvYWRSZWR1Y2VyLCBudWxsKTtcclxuXHJcbiAgY29uc3QgcnVuQXV0b21hdGljTGlzdExvYWQgPSB1c2VDYWxsYmFjayhcclxuICAgIChcclxuICAgICAgcGFnZTogbnVtYmVyLFxyXG4gICAgICBzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcclxuICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgIGNsZWFyQ2FjaGU/OiBib29sZWFuO1xyXG4gICAgICAgIHJlc2V0QmVmb3JlTG9hZD86IGJvb2xlYW47XHJcbiAgICAgICAgd2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeT86IGJvb2xlYW47XHJcbiAgICAgIH0gPSB7fVxyXG4gICAgKSA9PiB7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzQXV0b0xvYWRJbmZvKFwicnVuQXV0b21hdGljTGlzdExvYWQ6c2NoZWR1bGVcIiwge1xyXG4gICAgICAgIHBhZ2UsXHJcbiAgICAgICAgc25hcHNob3QsXHJcbiAgICAgICAgb3B0aW9ucyxcclxuICAgICAgfSk7XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcInNjaGVkdWxlXCIsXHJcbiAgICAgICAgcmVxdWVzdDoge1xyXG4gICAgICAgICAgcGFnZSxcclxuICAgICAgICAgIHNuYXBzaG90LFxyXG4gICAgICAgICAgY2xlYXJDYWNoZTogb3B0aW9ucy5jbGVhckNhY2hlID09PSB0cnVlLFxyXG4gICAgICAgICAgcmVzZXRCZWZvcmVMb2FkOiBvcHRpb25zLnJlc2V0QmVmb3JlTG9hZCA9PT0gdHJ1ZSxcclxuICAgICAgICAgIHdhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHk6IG9wdGlvbnMud2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeSA9PT0gdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXBlbmRpbmdBdXRvbWF0aWNMb2FkKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHBlbmRpbmdBdXRvbWF0aWNMb2FkLndhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHkpIHtcclxuICAgICAgaWYgKCFpc0xpbmtNb2RlKSB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZFdhcm4oXCJwZW5kaW5nQXV0b21hdGljTG9hZDpkaXNhYmxlLWxpbmstd2FpdFwiLCB7XHJcbiAgICAgICAgICBwYWdlOiBwZW5kaW5nQXV0b21hdGljTG9hZC5wYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJkaXNhYmxlX2xpbmtfd2FpdFwiIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFjYW5Qcm9jZXNzTGlua01vZGUgfHwgbGlua1NoZWV0Q2hlY2tCdXN5KSB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZEluZm8oXCJwZW5kaW5nQXV0b21hdGljTG9hZDp3YWl0aW5nLWxpbmstbW9kZS1yZWFkeVwiLCB7XHJcbiAgICAgICAgICBwYWdlOiBwZW5kaW5nQXV0b21hdGljTG9hZC5wYWdlLFxyXG4gICAgICAgICAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxyXG4gICAgICAgICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGxpbmtTaGVldExvY2tlZCkge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzQXV0b0xvYWRXYXJuKFwicGVuZGluZ0F1dG9tYXRpY0xvYWQ6Y2xlYXItbGluay1sb2NrZWRcIiwge1xyXG4gICAgICAgICAgcGFnZTogcGVuZGluZ0F1dG9tYXRpY0xvYWQucGFnZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IFwiY2xlYXJcIiB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IHBhZ2UsIHNuYXBzaG90LCBjbGVhckNhY2hlLCByZXNldEJlZm9yZUxvYWQgfSA9IHBlbmRpbmdBdXRvbWF0aWNMb2FkO1xyXG4gICAgZGlzcGF0Y2goeyB0eXBlOiBcImNsZWFyXCIgfSk7XHJcbiAgICBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkSW5mbyhcInBlbmRpbmdBdXRvbWF0aWNMb2FkOmV4ZWN1dGVcIiwge1xyXG4gICAgICBwYWdlLFxyXG4gICAgICBzbmFwc2hvdCxcclxuICAgICAgY2xlYXJDYWNoZSxcclxuICAgICAgcmVzZXRCZWZvcmVMb2FkLFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGNsZWFyQ2FjaGUpIHtcclxuICAgICAgY2xlYXJMaXN0Q2FjaGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzZXRCZWZvcmVMb2FkKSB7XHJcbiAgICAgIHJlc2V0TGlzdChcImF1dG9tYXRpYy1sb2FkOnJlc2V0LWJlZm9yZS1sb2FkXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHZvaWQgbG9hZExpc3QocGFnZSwgc25hcHNob3QpO1xyXG4gIH0sIFtcclxuICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcclxuICAgIGNsZWFyTGlzdENhY2hlLFxyXG4gICAgaXNMaW5rTW9kZSxcclxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcclxuICAgIGxpbmtTaGVldExvY2tlZCxcclxuICAgIGxvYWRMaXN0LFxyXG4gICAgcGVuZGluZ0F1dG9tYXRpY0xvYWQsXHJcbiAgICByZXNldExpc3QsXHJcbiAgXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBydW5BdXRvbWF0aWNMaXN0TG9hZCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWR1Y2VyIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwsIG1hcEV4cGVuc2VTaGVldEhlYWRlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IGlzRXhwZW5zZUFib3J0TGlrZUVycm9yIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VSZXF1ZXN0UmV0cnkudHNcIjtcclxuaW1wb3J0IHsgaGFzQXNzaWduZWRWb3VjaGVyLCBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyByZXNvbHZlRXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5IH0gZnJvbSBcIi4uL2RldGFpbC9leHBlbnNlU2hlZXREZXRhaWxQb2xpY3kudHNcIjtcclxuaW1wb3J0IHsgaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTWFuYWdlZFVzZXJTY29wZS50c1wiO1xyXG5cclxuY29uc3QgRVhQRU5TRV9TVEFUVVNfUEFJRCA9IDQ7XHJcblxyXG50eXBlIExpbmtTaGVldEdhdGVTdGF0ZSA9IHtcclxuICBsaW5rU2hlZXRMb2NrZWQ6IGJvb2xlYW47XHJcbiAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2U6IHN0cmluZztcclxuICBsaW5rU2hlZXRDaGVja0J1c3k6IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIExpbmtTaGVldEdhdGVBY3Rpb24gPVxyXG4gIHwge1xyXG4gICAgICB0eXBlOiBcInJlcGxhY2VcIjtcclxuICAgICAgbmV4dFN0YXRlOiBMaW5rU2hlZXRHYXRlU3RhdGU7XHJcbiAgICB9XHJcbiAgfCB7XHJcbiAgICAgIHR5cGU6IFwicGF0Y2hcIjtcclxuICAgICAgcGF0Y2g6IFBhcnRpYWw8TGlua1NoZWV0R2F0ZVN0YXRlPjtcclxuICAgIH07XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlQXJncyA9IHtcclxuICBpc0xpbmtNb2RlOiBib29sZWFuO1xyXG4gIGxpbmtTaGVldElkOiBzdHJpbmc7XHJcbiAgY2FuUHJvY2Vzc0xpbmtNb2RlOiBib29sZWFuO1xyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGJvb2xlYW47XHJcbiAgY2FuTWFuYWdlT3RoZXJVc2VyczogYm9vbGVhbjtcclxuICBjdXJyZW50QXhVc2VySWQ6IHN0cmluZztcclxuICBjdXJyZW50Q3JtVXNlcklkOiBzdHJpbmc7XHJcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkOiBzdHJpbmc7XHJcbiAgcmVzb2x2ZUJsb2NrZWRNZXNzYWdlOiAoaXNQYWlkOiBib29sZWFuKSA9PiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBJTklUSUFMX0xJTktfU0hFRVRfR0FURV9TVEFURTogTGlua1NoZWV0R2F0ZVN0YXRlID0ge1xyXG4gIGxpbmtTaGVldExvY2tlZDogZmFsc2UsXHJcbiAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2U6IFwiXCIsXHJcbiAgbGlua1NoZWV0Q2hlY2tCdXN5OiBmYWxzZSxcclxufTtcclxuXHJcbmNvbnN0IGxpbmtTaGVldEdhdGVSZWR1Y2VyID0gKHN0YXRlOiBMaW5rU2hlZXRHYXRlU3RhdGUsIGFjdGlvbjogTGlua1NoZWV0R2F0ZUFjdGlvbik6IExpbmtTaGVldEdhdGVTdGF0ZSA9PiB7XHJcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgY2FzZSBcInJlcGxhY2VcIjpcclxuICAgICAgcmV0dXJuIGFjdGlvbi5uZXh0U3RhdGU7XHJcbiAgICBjYXNlIFwicGF0Y2hcIjpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAuLi5hY3Rpb24ucGF0Y2gsXHJcbiAgICAgIH07XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gc3RhdGU7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gVmFsaWRhdGVzIHRoZSB0YXJnZXQgc2hlZXQgc3RhdGUgYmVmb3JlIGxpbmstbW9kZSBhY3Rpb25zIGNhbiBydW4uXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZSA9ICh7XHJcbiAgaXNMaW5rTW9kZSxcclxuICBsaW5rU2hlZXRJZCxcclxuICBjYW5Qcm9jZXNzTGlua01vZGUsXHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gIGN1cnJlbnRBeFVzZXJJZCxcclxuICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICByZXNvbHZlQmxvY2tlZE1lc3NhZ2UsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlQXJncykgPT4ge1xyXG4gIGNvbnN0IFtzdGF0ZSwgZGlzcGF0Y2hdID0gdXNlUmVkdWNlcihsaW5rU2hlZXRHYXRlUmVkdWNlciwgSU5JVElBTF9MSU5LX1NIRUVUX0dBVEVfU1RBVEUpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc0xpbmtNb2RlIHx8ICFsaW5rU2hlZXRJZCkge1xyXG4gICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJyZXBsYWNlXCIsXHJcbiAgICAgICAgbmV4dFN0YXRlOiBJTklUSUFMX0xJTktfU0hFRVRfR0FURV9TVEFURSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWNhblByb2Nlc3NMaW5rTW9kZSkge1xyXG4gICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJyZXBsYWNlXCIsXHJcbiAgICAgICAgbmV4dFN0YXRlOiB7XHJcbiAgICAgICAgICBsaW5rU2hlZXRMb2NrZWQ6IHRydWUsXHJcbiAgICAgICAgICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZTogaW5kVChcIkF1dGhfUGVybWlzc2lvbkRlbmllZF9Cb2R5XCIsIFwiTm8gcGVybWlzc2lvbi5cIiksXHJcbiAgICAgICAgICBsaW5rU2hlZXRDaGVja0J1c3k6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBcInBhdGNoXCIsXHJcbiAgICAgIHBhdGNoOiB7XHJcbiAgICAgICAgbGlua1NoZWV0Q2hlY2tCdXN5OiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgdm9pZCAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwobGlua1NoZWV0SWQsIHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlOiBcInJlcGxhY2VcIixcclxuICAgICAgICAgICAgbmV4dFN0YXRlOiB7XHJcbiAgICAgICAgICAgICAgbGlua1NoZWV0TG9ja2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlOlxyXG4gICAgICAgICAgICAgICAgc2FmZVRleHQocmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpLFxyXG4gICAgICAgICAgICAgIGxpbmtTaGVldENoZWNrQnVzeTogZmFsc2UsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkU2hlZXQgPVxyXG4gICAgICAgICAgaGVhZGVycy5maW5kKFxyXG4gICAgICAgICAgICAoZW50cnkpID0+XHJcbiAgICAgICAgICAgICAgc2FmZVRleHQoKGVudHJ5IGFzIHsgSG9qYUdhc3Rvc0lkPzogdW5rbm93biB9KT8uSG9qYUdhc3Rvc0lkKS50b1VwcGVyQ2FzZSgpID09PSBsaW5rU2hlZXRJZC50b1VwcGVyQ2FzZSgpXHJcbiAgICAgICAgICApIHx8XHJcbiAgICAgICAgICBoZWFkZXJzWzBdIHx8XHJcbiAgICAgICAgICBudWxsO1xyXG5cclxuICAgICAgICBpZiAoIXNlbGVjdGVkU2hlZXQpIHtcclxuICAgICAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZTogXCJyZXBsYWNlXCIsXHJcbiAgICAgICAgICAgIG5leHRTdGF0ZToge1xyXG4gICAgICAgICAgICAgIGxpbmtTaGVldExvY2tlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IHdhcyBub3QgZm91bmQuXCIpLFxyXG4gICAgICAgICAgICAgIGxpbmtTaGVldENoZWNrQnVzeTogZmFsc2UsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1hcHBlZEhlYWRlciA9IG1hcEV4cGVuc2VTaGVldEhlYWRlcihzZWxlY3RlZFNoZWV0KTtcclxuICAgICAgICBjb25zdCBzdGF0dXNDb2RlID0gdHlwZW9mIG1hcHBlZEhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgPT09IFwibnVtYmVyXCIgPyBtYXBwZWRIZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzIDogbnVsbDtcclxuICAgICAgICBjb25zdCBpc1BhaWQgPSBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19QQUlEIHx8IGhhc0Fzc2lnbmVkVm91Y2hlcihtYXBwZWRIZWFkZXIudm91Y2hlcik7XHJcbiAgICAgICAgY29uc3QgaXNNYW5hZ2luZ090aGVyVXNlciA9IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQoe1xyXG4gICAgICAgICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgICAgICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgICAgICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICAgICAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICAgICAgICByZWNvcmRPd25lclVzZXJJZDogbWFwcGVkSGVhZGVyLnVzZXJJZCxcclxuICAgICAgICAgIGlzQ3JlYXRlTW9kZTogZmFsc2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgZGV0YWlsUG9saWN5ID0gcmVzb2x2ZUV4cGVuc2VTaGVldERldGFpbFBvbGljeSh7XHJcbiAgICAgICAgICBzdGF0dXNDb2RlLFxyXG4gICAgICAgICAgaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgICAgICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICAgICAgICBpc1BhaWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgaXNMb2NrZWQgPSBkZXRhaWxQb2xpY3kuaW50ZXJhY3Rpb25Nb2RlICE9PSBcImZ1bGxfZWRpdFwiO1xyXG5cclxuICAgICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgICB0eXBlOiBcInJlcGxhY2VcIixcclxuICAgICAgICAgIG5leHRTdGF0ZToge1xyXG4gICAgICAgICAgICBsaW5rU2hlZXRMb2NrZWQ6IGlzTG9ja2VkLFxyXG4gICAgICAgICAgICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZTogaXNMb2NrZWQgPyByZXNvbHZlQmxvY2tlZE1lc3NhZ2UoaXNQYWlkKSA6IFwiXCIsXHJcbiAgICAgICAgICAgIGxpbmtTaGVldENoZWNrQnVzeTogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKGlzRXhwZW5zZUFib3J0TGlrZUVycm9yKGVycm9yKSkge1xyXG4gICAgICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlOiBcInBhdGNoXCIsXHJcbiAgICAgICAgICAgIHBhdGNoOiB7XHJcbiAgICAgICAgICAgICAgbGlua1NoZWV0Q2hlY2tCdXN5OiBmYWxzZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgICAgdHlwZTogXCJyZXBsYWNlXCIsXHJcbiAgICAgICAgICBuZXh0U3RhdGU6IHtcclxuICAgICAgICAgICAgbGlua1NoZWV0TG9ja2VkOiB0cnVlLFxyXG4gICAgICAgICAgICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZTpcclxuICAgICAgICAgICAgICBlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDNcclxuICAgICAgICAgICAgICAgID8gaW5kVChcIkF1dGhfUGVybWlzc2lvbkRlbmllZF9Cb2R5XCIsIFwiTm8gcGVybWlzc2lvbi5cIilcclxuICAgICAgICAgICAgICAgIDogZXJyb3IgaW5zdGFuY2VvZiBFcnJvclxyXG4gICAgICAgICAgICAgICAgICA/IGVycm9yLm1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0IGRldGFpbC5cIiksXHJcbiAgICAgICAgICAgIGxpbmtTaGVldENoZWNrQnVzeTogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNhbmNlbGxlZCA9IHRydWU7XHJcbiAgICB9O1xyXG4gIH0sIFtcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIGlzTGlua01vZGUsXHJcbiAgICBsaW5rU2hlZXRJZCxcclxuICAgIHJlc29sdmVCbG9ja2VkTWVzc2FnZSxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICBdKTtcclxuXHJcbiAgcmV0dXJuIHN0YXRlO1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsaUJBQWtGOzs7QUNBbEYsbUJBQW1DO0FBeUQ3QjtBQXJDTixJQUFNLGdDQUFnQyxDQUFDO0FBQUEsRUFDckM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBMEM7QUFDeEMsUUFBTSxxQkFBcUIsZ0JBQWdCLENBQUM7QUFFNUMsUUFBTSx1QkFBbUIsMEJBQVksTUFBTTtBQUN6QyxpQkFBYTtBQUFBLEVBQ2YsR0FBRyxDQUFDLFlBQVksQ0FBQztBQUVqQixRQUFNLDRCQUF3QiwwQkFBWSxNQUFNO0FBQzlDLFFBQUksQ0FBQyxtQkFBb0I7QUFDekIsbUJBQWU7QUFBQSxFQUNqQixHQUFHLENBQUMsb0JBQW9CLGNBQWMsQ0FBQztBQUV2QyxRQUFNLGtDQUFrQyxhQUNwQyxtREFDQSxxQkFDRSxtR0FDQTtBQUVOLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDLFdBQVcsYUFBYSxvRUFBb0U7QUFBQSxNQUM1Rix1QkFBcUIsVUFBVTtBQUFBLE1BQy9CLHdCQUFzQixhQUFhLFNBQVM7QUFBQSxN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QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLHNCQUFzQjtBQUM3RCxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLHNCQUFtQixDQUFFO0FBQ2pEO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyw2QkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJub3JtYWxpemVGaWxlSWQiLCAibm9ybWFsaXplU2VsZWN0aW9uTW9kZSIsICJub3JtYWxpemVFeGNsdWRlZElkcyIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJSZWFjdCIsICJpc0xpbmtNb2RlIiwgImNhY2hlZFN0YXRlIl0KfQo=
