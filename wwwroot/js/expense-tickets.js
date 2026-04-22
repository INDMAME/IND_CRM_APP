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
} from "./chunks/chunk-XXT2R24E.js";
import {
  CheckIcon_default
} from "./chunks/chunk-WYCUWPMC.js";
import {
  HistorySummary_default
} from "./chunks/chunk-KUB6AHHP.js";
import {
  getExpenseTicketStatusFilterOptions,
  getExpenseTicketStatusLabel,
  normalizeExpenseTicketFilterSnapshot,
  normalizeExpenseTicketStatusFilterCode,
  useExpenseTicketsFilterCache
} from "./chunks/chunk-HAEPWTGP.js";
import {
  mapWindowEnumOptions
} from "./chunks/chunk-YM2TI2W6.js";
import {
  useExpenseTicketLinkSheetGate
} from "./chunks/chunk-BR2AQFKV.js";
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
} from "./chunks/chunk-FQI72KDD.js";
import "./chunks/chunk-WBHH7JK7.js";
import {
  RemoteSearchCombobox_default
} from "./chunks/chunk-6JJRBKFS.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-LZSH3IN4.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-SV2WY3SH.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-QKSAMRAN.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-EJOK676V.js";
import "./chunks/chunk-OSBLOXTE.js";
import {
  buildExpenseSheetDetailUrl,
  clearExpenseTicketReturnContext,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-EA3W6EVI.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-PDB5ASGP.js";
import {
  flashActionMark
} from "./chunks/chunk-CBDB7NMA.js";
import {
  clearExpenseNavigationGuard,
  formatAmountWithCurrency,
  navigateToExpenseUrl,
  setExpenseNavigationGuard
} from "./chunks/chunk-FFNIMRB6.js";
import {
  configureExpenseApiAuth,
  fetchExpenseSheetTicketLinkList,
  fetchExpenseSheetTicketsList,
  formatExpenseDateParts,
  formatExpenseDisplayDate,
  linkExpenseSheetTicketsBulk,
  safeText,
  startOfDay,
  toIsoDate
} from "./chunks/chunk-TC2T4EQZ.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-YWX6VBOY.js";
import {
  clearExpenseActingUserOverride,
  getExpenseScopeToken,
  setExpenseActingUserOverride
} from "./chunks/chunk-KUDPX4K4.js";
import {
  setTopbarActionGroupReady
} from "./chunks/chunk-ZBKHPZJX.js";
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
    () => ensureCurrentUserInList(Array.isArray(subordinates) ? subordinates : [], currentAxUserId),
    [currentAxUserId, subordinates]
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
  const gastoTypeOptions = (0, import_react9.useMemo)(() => {
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
  const selectedTotalAmount = (0, import_react9.useMemo)(() => {
    return selectedTickets.reduce((sum, item) => {
      const amount = Number(item.totalAmount ?? 0);
      return amount > 0 ? sum + amount : sum;
    }, 0);
  }, [selectedTickets]);
  const selectedTotalAmountText = (0, import_react9.useMemo)(() => formatAmountWithCurrency(selectedTotalAmount, ""), [selectedTotalAmount]);
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
  const openLinkConfirmModal = (0, import_react9.useCallback)(() => {
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
  (0, import_react9.useEffect)(() => {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL0V4cGVuc2VUaWNrZXRzUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL3VzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTGF5b3V0RWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcclxuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XHJcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XHJcbmltcG9ydCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgeyB0eXBlIEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW0gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeFwiO1xyXG5pbXBvcnQgUGFnZUJvdHRvbUFjdGlvbnMsIHsgUGFnZUJvdHRvbUFjdGlvbkJ1dHRvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUGFnZUJvdHRvbUFjdGlvbnMudHN4XCI7XHJcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU3Bpbm5lci50c3hcIjtcclxuaW1wb3J0IHsgdXNlQXV0aENvbnRleHQsIHR5cGUgQXV0aE1hbmFnZWRVc2VyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XHJcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xyXG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XHJcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi8uLi8uLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xyXG5pbXBvcnQgeyB1c2VUaW1lbGluZUNhcmRFZmZlY3RzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRpbWVsaW5lQ2FyZEVmZmVjdHMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGlua0J1bGtTdW1tYXJ5LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWwgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWwudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlUXVpY2tUaWNrZXRQcm9ncmVzc092ZXJsYXkgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5LnRzeFwiO1xyXG5pbXBvcnQgeyBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgfSBmcm9tIFwiLi4vZXhwZW5zZUZvcm1hdHRlcnMudHNcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlVGlja2V0U3RhdHVzQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoLFxyXG4gIGxpbmtFeHBlbnNlU2hlZXRUaWNrZXRzQnVsayxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBjbGVhckV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUsIHNldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFjdGluZ1VzZXIudHNcIjtcclxuaW1wb3J0IHsgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLCBuYXZpZ2F0ZVRvRXhwZW5zZVVybCwgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuaW1wb3J0IHsgbWFwV2luZG93RW51bU9wdGlvbnMsIHR5cGUgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsLFxyXG4gIGNsZWFyRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dC50c1wiO1xyXG5pbXBvcnQgeyBoYXNFeHBlbnNlUmV0dXJuUmVmZXJyZXIsIGlzRXhwZW5zZUhpc3RvcnlCYWNrRm9yd2FyZE5hdmlnYXRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUhpc3RvcnlOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMsIGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgc2FmZVRleHQsIHN0YXJ0T2ZEYXksIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cgfSBmcm9tIFwiLi4vZGV0YWlsL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdy50c1wiO1xyXG5pbXBvcnQgeyBUSUNLRVRfSU1BR0VfQUNDRVBUX0FUVFJJQlVURSB9IGZyb20gXCIuLi9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93Q29yZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGEgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0c0xpc3REYXRhLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUsIHR5cGUgRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUudHNcIjtcclxuaW1wb3J0IHtcclxuICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsXHJcbiAgcmVhZEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsXHJcbiAgc2F2ZUV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsXHJcbn0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZS50c1wiO1xyXG5pbXBvcnQgeyBidWlsZEV4cGVuc2VUaWNrZXRMaW5rQnVsa0ZpbHRlcnMgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVBheWxvYWRCdWlsZGVycy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcclxuICBFeHBlbnNlVGlja2V0TGlua0NhcmQsXHJcbiAgRXhwZW5zZVRpY2tldExpc3RQYWdlSXRlbSxcclxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb24udHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWQgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZC50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlLnRzXCI7XHJcbmltcG9ydCB7IHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkgYXMgcmV2ZWFsVG9wYmFyQWN0aW9uR3JvdXAgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdG9wYmFyQWN0aW9uVmlzaWJpbGl0eS50c1wiO1xyXG5cclxuY29uc3QgUEFHRV9TSVpFID0gMTA7XHJcbmNvbnN0IEFMTE9XRURfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XHJcblxyXG5jb25zdCBHQVNUT19UWVBFX0xBQkVMX0tFWVM6IFJlY29yZDxudW1iZXIsIHsga2V5OiBzdHJpbmc7IGZhbGxiYWNrOiBzdHJpbmcgfT4gPSB7XHJcbiAgMDogeyBrZXk6IFwiRW51bV9Ob25lXCIsIGZhbGxiYWNrOiBcIk5vbmVcIiB9LFxyXG4gIDE6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1BlYWplXCIsIGZhbGxiYWNrOiBcIlBlYWplXCIgfSxcclxuICAyOiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9QYXJraW5nXCIsIGZhbGxiYWNrOiBcIlBhcmtpbmdcIiB9LFxyXG4gIDM6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0ttXCIsIGZhbGxiYWNrOiBcIkttXCIgfSxcclxuICA0OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9EZXNheXVub1wiLCBmYWxsYmFjazogXCJEZXNheXVub1wiIH0sXHJcbiAgNTogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfQ29taWRhXCIsIGZhbGxiYWNrOiBcIkNvbWlkYVwiIH0sXHJcbiAgNjogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfQ2VuYVwiLCBmYWxsYmFjazogXCJDZW5hXCIgfSxcclxuICA3OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9Ib3RlbFwiLCBmYWxsYmFjazogXCJIb3RlbFwiIH0sXHJcbiAgODogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfVmFyaW9zXCIsIGZhbGxiYWNrOiBcIlZhcmlvc1wiIH0sXHJcbiAgMTQ6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1RheGlcIiwgZmFsbGJhY2s6IFwiVGF4aVwiIH0sXHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVVc2VySWQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcclxuXHJcbmNvbnN0IGlzU2FtZVVzZXIgPSAobGVmdDogc3RyaW5nLCByaWdodDogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZExlZnQgPSBub3JtYWxpemVVc2VySWQobGVmdCkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBub3JtYWxpemVkUmlnaHQgPSBub3JtYWxpemVVc2VySWQocmlnaHQpLnRvVXBwZXJDYXNlKCk7XHJcbiAgcmV0dXJuICEhbm9ybWFsaXplZExlZnQgJiYgbm9ybWFsaXplZExlZnQgPT09IG5vcm1hbGl6ZWRSaWdodDtcclxufTtcclxuXHJcbmNvbnN0IGVuc3VyZUN1cnJlbnRVc2VySW5MaXN0ID0gKHVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXSwgY3VycmVudEF4VXNlcklkOiBzdHJpbmcpOiBBdXRoTWFuYWdlZFVzZXJbXSA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnQgPSBub3JtYWxpemVVc2VySWQoY3VycmVudEF4VXNlcklkKTtcclxuICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW50KSByZXR1cm4gdXNlcnM7XHJcbiAgaWYgKHVzZXJzLnNvbWUoKGVudHJ5KSA9PiBpc1NhbWVVc2VyKGVudHJ5LmF4VXNlcklkLCBub3JtYWxpemVkQ3VycmVudCkpKSByZXR1cm4gdXNlcnM7XHJcbiAgcmV0dXJuIFtcclxuICAgIHtcclxuICAgICAgY3JtVXNlcklkOiBub3JtYWxpemVkQ3VycmVudCxcclxuICAgICAgYXhVc2VySWQ6IG5vcm1hbGl6ZWRDdXJyZW50LFxyXG4gICAgICBuYW1lOiBub3JtYWxpemVkQ3VycmVudCxcclxuICAgIH0sXHJcbiAgICAuLi51c2VycyxcclxuICBdO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uID0gKHJlcXVlc3RlZFVzZXJJZDogc3RyaW5nLCBjdXJyZW50QXhVc2VySWQ6IHN0cmluZywgdXNlcnM6IEF1dGhNYW5hZ2VkVXNlcltdKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkUmVxdWVzdGVkID0gbm9ybWFsaXplVXNlcklkKHJlcXVlc3RlZFVzZXJJZCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnQgPSBub3JtYWxpemVVc2VySWQoY3VycmVudEF4VXNlcklkKTtcclxuICBpZiAobm9ybWFsaXplZFJlcXVlc3RlZCkge1xyXG4gICAgY29uc3QgZm91bmQgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZFJlcXVlc3RlZCkpO1xyXG4gICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQuYXhVc2VySWQ7XHJcbiAgfVxyXG4gIGlmIChub3JtYWxpemVkQ3VycmVudCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHVzZXJzLmZpbmQoKGVudHJ5KSA9PiBpc1NhbWVVc2VyKGVudHJ5LmF4VXNlcklkLCBub3JtYWxpemVkQ3VycmVudCkpO1xyXG4gICAgcmV0dXJuIHNlbGY/LmF4VXNlcklkIHx8IG5vcm1hbGl6ZWRDdXJyZW50O1xyXG4gIH1cclxuICByZXR1cm4gXCJcIjtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkTGlua01vZGVJbml0aWFsU25hcHNob3QgPSAobWFuYWdlZFVzZXJJZCA9IFwiXCIpOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0+IHtcclxuICBjb25zdCB0b2RheSA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoKSk7XHJcbiAgY29uc3QgZnJvbURhdGUgPSBuZXcgRGF0ZSh0b2RheSk7XHJcbiAgLy8gS2VlcCBhdXRvbWF0aWMgbGluay1tb2RlIGxvYWQgYm91bmRlZCB0byBhdm9pZCBoZWF2eSB1cHN0cmVhbSBzY2Fucy5cclxuICBmcm9tRGF0ZS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDI5KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGZyb21EYXRlOiB0b0lzb0RhdGUoZnJvbURhdGUpLFxyXG4gICAgdG9EYXRlOiB0b0lzb0RhdGUodG9kYXkpLFxyXG4gICAgZmlsdGVyS2V5OiBcIlwiLFxyXG4gICAgY3VycmVuY3lDb2RlOiBcIlwiLFxyXG4gICAgbWFuYWdlZFVzZXJJZDogbm9ybWFsaXplVXNlcklkKG1hbmFnZWRVc2VySWQpLFxyXG4gICAgc3RhdHVzRmlsdGVyOiAwLFxyXG4gICAgZ2FzdG9UeXBlRmlsdGVyOiBcIlwiLFxyXG4gICAgcHJvY2Vzc2VkQnlJYUZpbHRlcjogXCJhbGxcIixcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZUxpbmtNb2RlQmxvY2tlZE1lc3NhZ2UgPSAoaXNQYWlkOiBib29sZWFuKTogc3RyaW5nID0+IHtcclxuICBpZiAoaXNQYWlkKSB7XHJcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1BhaWRSZWFkT25seVwiLCBcIkxhcyBob2phcyBkZSBnYXN0byBwYWdhZGFzIHNvbiBkZSBzb2xvIGxlY3R1cmEuXCIpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9SZWFkT25seUJ5U3RhdHVzXCIsIFwiTm8gc2UgcHVlZGUgZWRpdGFyIGVzdGEgaG9qYSBkZSBnYXN0b3MgZW4gZWwgZXN0YWRvIGFjdHVhbC5cIik7XHJcbn07XHJcblxyXG5jb25zdCBFWFBFTlNFX1RJQ0tFVFNfTE9HX1BSRUZJWCA9IFwiW2V4cGVuc2UtdGlja2V0c11cIjtcclxuXHJcbmNvbnN0IGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUuaW5mbyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLmluZm8oRVhQRU5TRV9USUNLRVRTX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGxvZ0V4cGVuc2VUaWNrZXRzV2FybiA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUud2FybiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLndhcm4oRVhQRU5TRV9USUNLRVRTX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIFZhbGlkYXRlcyB3aGV0aGVyIG9uZSB0aWNrZXQgY2FyZCBjYW4gcGFydGljaXBhdGUgaW4gYnVsayBsaW5rIG1vZGUuXG5jb25zdCBjYW5TZWxlY3RUaWNrZXRGb3JMaW5rID0gKGl0ZW06IEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW0pOiBib29sZWFuID0+IHtcbiAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQoaXRlbS5maWxlSWQpO1xuICByZXR1cm4gISFmaWxlSWQ7XHJcbn07XHJcblxyXG4vLyBJbml0aWFsaXplcyBhdXRoIHNlZWQgZm9yIGV4cGVuc2UgQVBJIGNhbGxzIGJlZm9yZSBpc2xhbmQgZWZmZWN0cyBydW4uXHJcbmNvbnN0IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoID0gKCkgPT4ge1xyXG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcclxuICAgIHRva2VuOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxyXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXHJcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEZhbGxiYWNrR2FzdG9UeXBlT3B0aW9ucyA9ICgpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xyXG4gIHJldHVybiBPYmplY3QuZW50cmllcyhHQVNUT19UWVBFX0xBQkVMX0tFWVMpXHJcbiAgICAubWFwKChbY29kZSwgY2ZnXSkgPT4gKHtcclxuICAgICAgdmFsdWU6IFN0cmluZyhjb2RlKSxcclxuICAgICAgdGV4dDogaW5kVChjZmcua2V5LCBjZmcuZmFsbGJhY2spLFxyXG4gICAgfSkpXHJcbiAgICAuc29ydCgobGVmdCwgcmlnaHQpID0+IE51bWJlcihsZWZ0LnZhbHVlKSAtIE51bWJlcihyaWdodC52YWx1ZSkpO1xyXG59O1xyXG5cclxuY29uc3QgTmV3VGlja2V0SWNvbiA9ICgpID0+IChcclxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cImgtNiB3LTZcIj5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTEwIDIwaC01YTIgMiAwIDAgMSAtMiAtMnYtOWEyIDIgMCAwIDEgMiAtMmgxYTIgMiAwIDAgMCAyIC0yYTEgMSAwIDAgMSAxIC0xaDZhMSAxIDAgMCAxIDEgMWEyIDIgMCAwIDAgMiAyaDFhMiAyIDAgMCAxIDIgMnYyXCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0LjM2MiAxMS4xNWEzIDMgMCAxIDAgLTQuMTQ0IDQuMjYzXCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDIxdi00YTIgMiAwIDEgMSA0IDB2NFwiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAxOWg0XCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTIxIDE1djZcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgRXhwZW5zZVRpY2tldHNQYWdlQ29udGVudCA9ICgpID0+IHtcclxuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIlZpZXdcIik7XHJcbiAgY29uc3QgY2FuQ3JlYXRlVGlja2V0ID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJBZGRcIik7XHJcbiAgY29uc3QgY2FuTGlua1NoZWV0TGluZXMgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkFkZFwiKTtcclxuICBjb25zdCB7XHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc3Vib3JkaW5hdGVzLFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgfSA9IHVzZUF1dGhDb250ZXh0KCk7XHJcbiAgY29uc3QgdGltZWxpbmVDb250YWluZXJSZWYgPSBSZWFjdC51c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBjYW1lcmFJbnB1dFJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgZ2FsbGVyeUlucHV0UmVmID0gUmVhY3QudXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBkaWRSZXN0b3JlT25Nb3VudFJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XHJcbiAgY29uc3QgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYgPSBSZWFjdC51c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmID0gUmVhY3QudXNlUmVmKFwiXCIpO1xyXG4gIGNvbnN0IGxpbmtNb2RlQ29udGV4dCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICBjb25zdCBhY3Rpb24gPSBzYWZlVGV4dCh1cmwuc2VhcmNoUGFyYW1zLmdldChcImFjdGlvblwiKSkudG9Mb3dlckNhc2UoKTtcclxuICAgIGNvbnN0IGhvamFHYXN0b3NJZCA9IHNhZmVUZXh0KHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwiaG9qYUdhc3Rvc0lkXCIpKTtcclxuICAgIGNvbnN0IGlzTGlua01vZGUgPSBhY3Rpb24gPT09IFwibGlua1wiICYmICEhaG9qYUdhc3Rvc0lkO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaXNMaW5rTW9kZSxcclxuICAgICAgc2hlZXRJZDogaG9qYUdhc3Rvc0lkLFxyXG4gICAgICBzaGVldE9yaWdpbjogaXNMaW5rTW9kZSA/IChcInNoZWV0LWxpbmtcIiBhcyBjb25zdCkgOiAoISFob2phR2FzdG9zSWQgPyAoXCJzaGVldC1jcmVhdGVcIiBhcyBjb25zdCkgOiBudWxsKSxcclxuICAgICAgZml4ZWRTdGF0dXNGaWx0ZXI6IGlzTGlua01vZGUgPyAoMCBhcyBjb25zdCkgOiBudWxsLFxyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGlzTGlua01vZGUgPSBsaW5rTW9kZUNvbnRleHQuaXNMaW5rTW9kZTtcclxuICBjb25zdCBsaW5rU2hlZXRJZCA9IGxpbmtNb2RlQ29udGV4dC5zaGVldElkO1xyXG4gIGNvbnN0IHNoZWV0Q2FsbGVyT3JpZ2luID0gbGlua01vZGVDb250ZXh0LnNoZWV0T3JpZ2luO1xyXG4gIGNvbnN0IGhhc1NoZWV0Q2FsbGVyQ29udGV4dCA9ICEhbGlua1NoZWV0SWQgJiYgISFzaGVldENhbGxlck9yaWdpbjtcclxuICBjb25zdCBmaXhlZFN0YXR1c0ZpbHRlciA9IGxpbmtNb2RlQ29udGV4dC5maXhlZFN0YXR1c0ZpbHRlcjtcclxuICBjb25zdCBjYW5Qcm9jZXNzTGlua01vZGUgPSAhaXNMaW5rTW9kZSB8fCBjYW5MaW5rU2hlZXRMaW5lcztcclxuICBjb25zdCBtYW5hZ2VkVXNlcnMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gZW5zdXJlQ3VycmVudFVzZXJJbkxpc3QoQXJyYXkuaXNBcnJheShzdWJvcmRpbmF0ZXMpID8gc3Vib3JkaW5hdGVzIDogW10sIGN1cnJlbnRBeFVzZXJJZCksXHJcbiAgICBbY3VycmVudEF4VXNlcklkLCBzdWJvcmRpbmF0ZXNdXHJcbiAgKTtcclxuICBjb25zdCBkZWZhdWx0TWFuYWdlZFVzZXJJZCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24oY3VycmVudEF4VXNlcklkLCBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2VycyksXHJcbiAgICBbY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnNdXHJcbiAgKTtcclxuICBjb25zdCBzaG93TWFuYWdlZFVzZXJGaWx0ZXIgPSBpc0xpbmtNb2RlICYmIGNhbk1hbmFnZU90aGVyVXNlcnM7XHJcblxyXG4gIC8vIEtlZXBzIGxpbmstbW9kZSBsaXN0IHF1ZXJpZXMgYm91bmRlZCBldmVuIHdoZW4gVUkgZmlsdGVycyBhcmUgY2xlYXJlZC5cclxuICBjb25zdCBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9PiB7XHJcbiAgICAgIGlmICghaXNMaW5rTW9kZSkgcmV0dXJuIHNuYXBzaG90O1xyXG5cclxuICAgICAgY29uc3QgZmFsbGJhY2sgPSBidWlsZExpbmtNb2RlSW5pdGlhbFNuYXBzaG90KHNuYXBzaG90Lm1hbmFnZWRVc2VySWQpO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkRnJvbURhdGUgPSBzYWZlVGV4dChzbmFwc2hvdC5mcm9tRGF0ZSkgfHwgZmFsbGJhY2suZnJvbURhdGU7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRUb0RhdGUgPSBzYWZlVGV4dChzbmFwc2hvdC50b0RhdGUpIHx8IGZhbGxiYWNrLnRvRGF0ZTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZE1hbmFnZWRVc2VySWQgPSBub3JtYWxpemVVc2VySWQoc25hcHNob3QubWFuYWdlZFVzZXJJZCkgfHwgZmFsbGJhY2subWFuYWdlZFVzZXJJZDtcclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uc25hcHNob3QsXHJcbiAgICAgICAgZnJvbURhdGU6IG5vcm1hbGl6ZWRGcm9tRGF0ZSxcclxuICAgICAgICB0b0RhdGU6IG5vcm1hbGl6ZWRUb0RhdGUsXHJcbiAgICAgICAgbWFuYWdlZFVzZXJJZDogbm9ybWFsaXplZE1hbmFnZWRVc2VySWQsXHJcbiAgICAgICAgc3RhdHVzRmlsdGVyOiAwLFxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIFtpc0xpbmtNb2RlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IFtsaW5rRmxvd0J1c3ksIHNldExpbmtGbG93QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2xpbmtGbG93U3RhdHVzLCBzZXRMaW5rRmxvd1N0YXR1c10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbbGlua0Zsb3dFcnJvciwgc2V0TGlua0Zsb3dFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbc2VsZWN0QWxsQnVzeSwgc2V0U2VsZWN0QWxsQnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3NlbGVjdEFsbEVycm9yLCBzZXRTZWxlY3RBbGxFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbbGlua0J1bGtSZXN1bHQsIHNldExpbmtCdWxrUmVzdWx0XSA9IHVzZVN0YXRlPEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvIHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgZmlyc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKSxcclxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXHJcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXHJcbiAgICAgIGxhc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIiksXHJcbiAgICB9KSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XHJcbiAgICBkZWZhdWx0Q29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpLFxyXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBnYXN0b1R5cGVPcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KCgpID0+IHtcclxuICAgIGNvbnN0IHNvdXJjZSA9IEFycmF5LmlzQXJyYXkod2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fKSA/IHdpbmRvdy5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXyA6IFtdO1xyXG4gICAgY29uc3QgbWFwcGVkID0gbWFwV2luZG93RW51bU9wdGlvbnMoc291cmNlKS5maWx0ZXIoKGVudHJ5KSA9PiB7XHJcbiAgICAgIGNvbnN0IHBhcnNlZCA9IE51bWJlcihlbnRyeS52YWx1ZSk7XHJcbiAgICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgQUxMT1dFRF9HQVNUT19UWVBFUy5oYXMocGFyc2VkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChtYXBwZWQubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gbWFwcGVkLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiBOdW1iZXIobGVmdC52YWx1ZSkgLSBOdW1iZXIocmlnaHQudmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYnVpbGRGYWxsYmFja0dhc3RvVHlwZU9wdGlvbnMoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGdhc3RvVHlwZUxhYmVsTWFwID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xyXG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgZ2FzdG9UeXBlT3B0aW9ucykge1xyXG4gICAgICBtYXAuc2V0KFN0cmluZyhvcHRpb24udmFsdWUpLCBvcHRpb24udGV4dCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWFwO1xyXG4gIH0sIFtnYXN0b1R5cGVPcHRpb25zXSk7XHJcblxyXG4gIGNvbnN0IHtcclxuICAgIGl0ZW1zLFxyXG4gICAgdG90YWwsXHJcbiAgICBjdXJyZW50UGFnZSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGxvYWRMaXN0LFxyXG4gICAgcmVzdG9yZUxpc3RTbmFwc2hvdCxcclxuICAgIHJlc2V0TGlzdCxcclxuICAgIGNsZWFyTGlzdENhY2hlLFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0c0xpc3REYXRhKHtcclxuICAgIGhhc0FjY2VzcyxcclxuICAgIHBhZ2VTaXplOiBQQUdFX1NJWkUsXHJcbiAgICBtb2RlOiBpc0xpbmtNb2RlID8gXCJsaW5rXCIgOiBcImdlbmVyYWxcIixcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gIH0pO1xyXG4gIGNvbnN0IHsgcmVhZENhY2hlZFN0YXRlLCBjb25zdW1lUmV0dXJuRmxhZywgY29uc3VtZVJldHVybk1vZGUsIHNhdmVDYWNoZWRTdGF0ZSwgY2xlYXJDYWNoZWRTdGF0ZSB9ID0gdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZSgpO1xyXG4gIGNvbnN0IHtcclxuICAgIHNlbGVjdGlvbk1vZGUsXHJcbiAgICBzZWxlY3RlZFRpY2tldHMsXHJcbiAgICBleGNsdWRlZElkcyxcclxuICAgIGZpbHRlcmVkU25hcHNob3QsXHJcbiAgICBmaWx0ZXJlZFRvdGFsQ291bnQsXHJcbiAgICBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlLFxyXG4gICAgaXNTZWxlY3RlZDogaXNMaW5rVGlja2V0U2VsZWN0ZWQsXHJcbiAgICB0b2dnbGVUaWNrZXQ6IHRvZ2dsZUxpbmtUaWNrZXRTZWxlY3Rpb24sXHJcbiAgICBjbGVhclNlbGVjdGlvbjogY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uLFxyXG4gICAgcmVzdG9yZVNlbGVjdGlvbjogcmVzdG9yZUxpbmtUaWNrZXRTZWxlY3Rpb24sXHJcbiAgICBzZWxlY3RBbGxCeUZpbHRlcnMsXHJcbiAgICBoeWRyYXRlVmlzaWJsZVRpY2tldHMsXHJcbiAgICByZXNvbHZlU2VsZWN0ZWRDb3VudCxcclxuICB9ID0gdXNlRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb24oKTtcclxuICBjb25zdCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24gPSB1c2VDYWxsYmFjayhcclxuICAgIChyZXF1ZXN0ZWRVc2VySWQ6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc29sdmVkVXNlcklkID0gcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uKHJlcXVlc3RlZFVzZXJJZCwgY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnMpO1xyXG4gICAgICBzZXRTZWxlY3RlZE1hbmFnZWRVc2VySWQocmVzb2x2ZWRVc2VySWQpO1xyXG4gICAgICBpZiAoIXJlc29sdmVkVXNlcklkIHx8IChjdXJyZW50QXhVc2VySWQgJiYgaXNTYW1lVXNlcihyZXNvbHZlZFVzZXJJZCwgY3VycmVudEF4VXNlcklkKSkpIHtcclxuICAgICAgICBjbGVhckV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKHJlc29sdmVkVXNlcklkKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzb2x2ZWRVc2VySWQ7XHJcbiAgICB9LFxyXG4gICAgW2N1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzLCBzZXRTZWxlY3RlZE1hbmFnZWRVc2VySWRdXHJcbiAgKTtcclxuICBjb25zdCB7XHJcbiAgICBsaW5rU2hlZXRMb2NrZWQsXHJcbiAgICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZSxcclxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcclxuICB9ID0gdXNlRXhwZW5zZVRpY2tldExpbmtTaGVldEdhdGUoe1xyXG4gICAgaXNMaW5rTW9kZSxcclxuICAgIGxpbmtTaGVldElkLFxyXG4gICAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgcmVzb2x2ZUJsb2NrZWRNZXNzYWdlOiByZXNvbHZlTGlua01vZGVCbG9ja2VkTWVzc2FnZSxcclxuICB9KTtcclxuICBjb25zdCB7IHJ1bkF1dG9tYXRpY0xpc3RMb2FkIH0gPSB1c2VFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZCh7XHJcbiAgICBpc0xpbmtNb2RlLFxyXG4gICAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxyXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gICAgbGlua1NoZWV0TG9ja2VkLFxyXG4gICAgY2xlYXJMaXN0Q2FjaGUsXHJcbiAgICByZXNldExpc3QsXHJcbiAgICBsb2FkTGlzdCxcclxuICB9KTtcclxuICBjb25zdCBidWlsZEluaXRpYWxMaW5rTW9kZVNuYXBzaG90ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcbiAgICByZXR1cm4gYnVpbGRMaW5rTW9kZUluaXRpYWxTbmFwc2hvdChpbml0aWFsTWFuYWdlZFVzZXJJZCk7XG4gIH0sIFtkZWZhdWx0TWFuYWdlZFVzZXJJZCwgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXSk7XG5cbiAgY29uc3QgYnVpbGRJbml0aWFsU3RhbmRhcmRTbmFwc2hvdCA9IHVzZUNhbGxiYWNrKCgpOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0+IHtcbiAgICBjb25zdCB0b2RheSA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoKSk7XG4gICAgY29uc3QgZnJvbURhdGUgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgZnJvbURhdGUuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA4OSk7XG4gICAgY29uc3QgaW5pdGlhbE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGZyb21EYXRlOiB0b0lzb0RhdGUoZnJvbURhdGUpLFxuICAgICAgdG9EYXRlOiB0b0lzb0RhdGUodG9kYXkpLFxuICAgICAgZmlsdGVyS2V5OiBcIlwiLFxuICAgICAgY3VycmVuY3lDb2RlOiBcIlwiLFxuICAgICAgbWFuYWdlZFVzZXJJZDogaW5pdGlhbE1hbmFnZWRVc2VySWQsXG4gICAgICBzdGF0dXNGaWx0ZXI6IFwiXCIsXG4gICAgICBnYXN0b1R5cGVGaWx0ZXI6IFwiXCIsXG4gICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyOiBcImFsbFwiLFxuICAgIH07XG4gIH0sIFtkZWZhdWx0TWFuYWdlZFVzZXJJZCwgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXSk7XG5cclxuICBjb25zdCB7XHJcbiAgICBmcm9tRGF0ZSxcclxuICAgIHRvRGF0ZSxcclxuICAgIGZpbHRlcktleSxcclxuICAgIGN1cnJlbmN5Q29kZSxcclxuICAgIG1hbmFnZWRVc2VySWQsXHJcbiAgICBzdGF0dXNGaWx0ZXIsXHJcbiAgICBnYXN0b1R5cGVGaWx0ZXIsXHJcbiAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxyXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXHJcbiAgICBzaG93TWFudWFsRGF0ZUZpbHRlcixcclxuICAgIHNob3dNYW51YWxEYXRlRXJyb3IsXHJcbiAgICBtYW51YWxEYXRlQXV0b09wZW5LZXksXHJcbiAgICBhcHBsaWVkRmlsdGVycyxcclxuICAgIHNob3dGaWx0ZXJzLFxyXG4gICAgY3VycmVudEZpbHRlcnMsXHJcbiAgICBzZXRGaWx0ZXJLZXksXHJcbiAgICBzZXRDdXJyZW5jeUNvZGUsXHJcbiAgICBzZXRNYW5hZ2VkVXNlcklkLFxyXG4gICAgc2V0U3RhdHVzRmlsdGVyLFxyXG4gICAgc2V0R2FzdG9UeXBlRmlsdGVyLFxyXG4gICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICAgIG9uQXBwbHksXHJcbiAgICBvbkNsZWFyLFxyXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxyXG4gICAgb25EYXRlUmFuZ2VDaGFuZ2UsXHJcbiAgICBvbk1hbnVhbFJhbmdlQ29tcGxldGUsXHJcbiAgICBvblF1aWNrRmlsdGVyQ2hhbmdlLFxyXG4gICAgdG9nZ2xlRmlsdGVyUGFuZWwsXHJcbiAgICBzdGF0dXNGaWx0ZXJMb2NrZWQsXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlKHtcclxuICAgIGRlZmF1bHRNYW5hZ2VkVXNlcklkLFxyXG4gICAgZml4ZWRTdGF0dXNGaWx0ZXIsXHJcbiAgICBhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5OiBpc0xpbmtNb2RlLFxyXG4gICAgb25BcHBseUZpbHRlcnM6IChzbmFwc2hvdCkgPT4ge1xyXG4gICAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcclxuICAgICAgY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgIGNvbnN0IHJlc29sdmVkTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihzbmFwc2hvdC5tYW5hZ2VkVXNlcklkKTtcclxuICAgICAgdm9pZCBsb2FkTGlzdChcclxuICAgICAgICAxLFxyXG4gICAgICAgIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKHtcclxuICAgICAgICAgIC4uLnNuYXBzaG90LFxyXG4gICAgICAgICAgbWFuYWdlZFVzZXJJZDogcmVzb2x2ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgb25DbGVhckZpbHRlcnM6ICgpID0+IHtcclxuICAgICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XHJcbiAgICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbigpO1xyXG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XHJcbiAgICAgIGlmIChpc0xpbmtNb2RlKSB7XHJcbiAgICAgICAgY29uc3QgbGlua1NuYXBzaG90ID0gYnVpbGRJbml0aWFsTGlua01vZGVTbmFwc2hvdCgpO1xyXG4gICAgICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhsaW5rU25hcHNob3QpO1xyXG4gICAgICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkKDEsIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKGxpbmtTbmFwc2hvdCksIHtcclxuICAgICAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXHJcbiAgICAgICAgICByZXNldEJlZm9yZUxvYWQ6IHRydWUsXHJcbiAgICAgICAgICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVzZXRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGN1cnJlbnRBeFVzZXJJZCk7XHJcbiAgICAgIHNldE1hbmFnZWRVc2VySWQocmVzZXRNYW5hZ2VkVXNlcklkKTtcclxuICAgICAgcmVzZXRMaXN0KFwiY2xlYXItZmlsdGVyc1wiKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQgPSBub3JtYWxpemVVc2VySWQoZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xyXG4gICAgaWYgKCFub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQpIHJldHVybjtcclxuICAgIHNldE1hbmFnZWRVc2VySWQobm9ybWFsaXplZERlZmF1bHRNYW5hZ2VkVXNlcklkKTtcclxuICAgIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQpO1xyXG4gIH0sIFtkZWZhdWx0TWFuYWdlZFVzZXJJZCwgc2V0TWFuYWdlZFVzZXJJZCwgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoY2FuTWFuYWdlT3RoZXJVc2VycykgcmV0dXJuO1xyXG4gICAgY29uc3QgZmFsbGJhY2tNYW5hZ2VkVXNlcklkID0gcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uKGN1cnJlbnRBeFVzZXJJZCwgY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnMpO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnRNYW5hZ2VkVXNlcklkID0gbm9ybWFsaXplVXNlcklkKG1hbmFnZWRVc2VySWQpO1xyXG4gICAgaWYgKGlzU2FtZVVzZXIobm9ybWFsaXplZEN1cnJlbnRNYW5hZ2VkVXNlcklkLCBmYWxsYmFja01hbmFnZWRVc2VySWQpKSByZXR1cm47XHJcbiAgICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW50TWFuYWdlZFVzZXJJZCAmJiAhZmFsbGJhY2tNYW5hZ2VkVXNlcklkKSByZXR1cm47XHJcblxyXG4gICAgc2V0TWFuYWdlZFVzZXJJZChmYWxsYmFja01hbmFnZWRVc2VySWQpO1xyXG4gICAgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGZhbGxiYWNrTWFuYWdlZFVzZXJJZCk7XHJcbiAgfSwgW2Nhbk1hbmFnZU90aGVyVXNlcnMsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJJZCwgbWFuYWdlZFVzZXJzLCBzZXRNYW5hZ2VkVXNlcklkLCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb25dKTtcclxuXHJcbiAgY29uc3Qge1xyXG4gICAgc291cmNlUGlja2VyT3BlbixcclxuICAgIGJ1c3k6IHF1aWNrVGlja2V0QnVzeSxcclxuICAgIHByb2dyZXNzTWVzc2FnZTogcXVpY2tUaWNrZXRQcm9ncmVzc01lc3NhZ2UsXHJcbiAgICBwcm9ncmVzc1N0YWdlczogcXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlcyxcclxuICAgIHByb2dyZXNzRWxhcHNlZE1zOiBxdWlja1RpY2tldEVsYXBzZWRNcyxcclxuICAgIGVycm9yTWVzc2FnZTogcXVpY2tUaWNrZXRFcnJvck1lc3NhZ2UsXHJcbiAgICBhdHRlbXB0SWQ6IHF1aWNrVGlja2V0QXR0ZW1wdElkLFxyXG4gICAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5LFxyXG4gICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmUsXHJcbiAgICB0cmFjZUxpc3Q6IHF1aWNrVGlja2V0VHJhY2VMaXN0LFxyXG4gICAgb3BlblNvdXJjZVBpY2tlcixcclxuICAgIGNsb3NlU291cmNlUGlja2VyLFxyXG4gICAgc2VsZWN0RnJvbUNhbWVyYSxcclxuICAgIHNlbGVjdEZyb21HYWxsZXJ5LFxyXG4gICAgaGFuZGxlU2VsZWN0ZWRGaWxlLFxyXG4gICAgcmV0cnlQZW5kaW5nVXBsb2FkLFxyXG4gICAgb3BlbkNyZWF0ZWRUaWNrZXQsXHJcbiAgICBjbGVhckVycm9yOiBjbGVhclF1aWNrVGlja2V0RXJyb3IsXHJcbiAgfSA9IHVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdyh7XHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiAhaXNMaW5rTW9kZSAmJiBjYW5DcmVhdGVUaWNrZXQsXHJcbiAgICBpc0NyZWF0ZU1vZGU6IGZhbHNlLFxyXG4gICAgaXNTaGVldExvY2tlZDogZmFsc2UsXHJcbiAgICBsaW5rVG9TaGVldDogZmFsc2UsXHJcbiAgICBheFVzZXJJZE92ZXJyaWRlOiBzYWZlVGV4dChjdXJyZW50QXhVc2VySWQpLFxyXG4gICAgY3VycmVuY3lDb2RlOiBjdXJyZW5jeUNvZGUgfHwgXCJFVVJcIixcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gICAgb25Db21wbGV0ZWQ6IChyZXN1bHQpID0+IHtcclxuICAgICAgY29uc3QgY3JlYXRlZEZpbGVJZCA9IHNhZmVUZXh0KHJlc3VsdD8uZmlsZUlkKTtcclxuICAgICAgaWYgKCFjcmVhdGVkRmlsZUlkKSByZXR1cm47XHJcblxyXG4gICAgICBpZiAoaGFzU2hlZXRDYWxsZXJDb250ZXh0ICYmIHNoZWV0Q2FsbGVyT3JpZ2luKSB7XHJcbiAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcclxuICAgICAgICAgIGZpbGVJZDogY3JlYXRlZEZpbGVJZCxcclxuICAgICAgICAgIHNoZWV0SWQ6IGxpbmtTaGVldElkLFxyXG4gICAgICAgICAgb3JpZ2luOiBzaGVldENhbGxlck9yaWdpbixcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICAgICAgZmlsZUlkOiBjcmVhdGVkRmlsZUlkLFxyXG4gICAgICAgICAgbW9kZTogXCJlZGl0XCIsXHJcbiAgICAgICAgICBvcmlnaW46IHNoZWV0Q2FsbGVyT3JpZ2luLFxyXG4gICAgICAgICAgc2hlZXRJZDogbGlua1NoZWV0SWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAgICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY2xlYXJFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCgpO1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/ZmlsZUlkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNyZWF0ZWRGaWxlSWQpfSZtb2RlPWVkaXQmb3JpZ2luPXRpY2tldC1jcmVhdGVgLCB7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBmYWJNZW51SXRlbXMgPSB1c2VNZW1vPEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW1bXT4oXHJcbiAgICAoKSA9PlxyXG4gICAgICBpc0xpbmtNb2RlXHJcbiAgICAgICAgPyBbXVxyXG4gICAgICAgIDogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaWQ6IFwibmV3LXRpY2tldFwiLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfTmV3VGlja2V0XCIsIFwiTnVldm8gVGlja2V0XCIpLFxyXG4gICAgICAgICAgICAgIGljb246IDxOZXdUaWNrZXRJY29uIC8+LFxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s6IG9wZW5Tb3VyY2VQaWNrZXIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdLFxyXG4gICAgW2lzTGlua01vZGUsIG9wZW5Tb3VyY2VQaWNrZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0ZWRUaWNrZXRDb3VudCA9IHJlc29sdmVTZWxlY3RlZENvdW50KHRvdGFsKTtcclxuICBjb25zdCBzZWxlY3RlZFRvdGFsQW1vdW50ID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICByZXR1cm4gc2VsZWN0ZWRUaWNrZXRzLnJlZHVjZSgoc3VtLCBpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGFtb3VudCA9IE51bWJlcihpdGVtLnRvdGFsQW1vdW50ID8/IDApO1xyXG4gICAgICByZXR1cm4gYW1vdW50ID4gMCA/IHN1bSArIGFtb3VudCA6IHN1bTtcclxuICAgIH0sIDApO1xyXG4gIH0sIFtzZWxlY3RlZFRpY2tldHNdKTtcclxuICBjb25zdCBzZWxlY3RlZFRvdGFsQW1vdW50VGV4dCA9IHVzZU1lbW8oKCkgPT4gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KHNlbGVjdGVkVG90YWxBbW91bnQsIFwiXCIpLCBbc2VsZWN0ZWRUb3RhbEFtb3VudF0pO1xyXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XHJcbiAgICByZXZlYWxUb3BiYXJBY3Rpb25Hcm91cChcImV4cGVuc2UtdGlja2V0cy1saXN0LWFjdGlvbnNcIik7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBsaW5rTW9kZUNhbmNlbE1lc3NhZ2UgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT5cclxuICAgICAgaW5kVChcclxuICAgICAgICBcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0NhbmNlbENvbmZpcm1cIixcclxuICAgICAgICBcIlNlIGNhbmNlbGFyXHUwMEUxIGVsIHByb2Nlc28gZGUgdmluY3VsYWNpXHUwMEYzbiB5IHZvbHZlclx1MDBFMXMgYSBsYSBob2phIGRlIGdhc3Rvcy4gXHUwMEJGUXVpZXJlcyBjb250aW51YXI/XCJcclxuICAgICAgKSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuID0gdXNlQ2FsbGJhY2soXG4gICAgKHRpY2tldEZpbGVJZDogc3RyaW5nLCB0aWNrZXREYXRlVmFsdWU6IHVua25vd24pID0+IHtcbiAgICAgIGNvbnN0IGluaXRpYWxTbmFwc2hvdCA9IGJ1aWxkSW5pdGlhbFN0YW5kYXJkU25hcHNob3QoKTtcblxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwiYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuOnN0YXJ0XCIsIHtcbiAgICAgICAgdGlja2V0RmlsZUlkLFxuICAgICAgICB0aWNrZXREYXRlVmFsdWUsXG4gICAgICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICAgICAgaW5pdGlhbFNuYXBzaG90LFxuICAgICAgfSk7XG5cbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSBcIlwiO1xuICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKGluaXRpYWxTbmFwc2hvdCk7XG4gICAgICBjbGVhckxpc3RDYWNoZSgpO1xuICAgICAgcmVzZXRMaXN0KFwiY3JlYXRlZC10aWNrZXQtcmV0dXJuXCIpO1xuICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwiYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuOmxvYWRMaXN0XCIsIHtcbiAgICAgICAgcGFnZTogMSxcbiAgICAgICAgaW5pdGlhbFNuYXBzaG90LFxuICAgICAgfSk7XG4gICAgICB2b2lkIGxvYWRMaXN0KDEsIGluaXRpYWxTbmFwc2hvdCk7XG5cbiAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgdXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoXCJ0aWNrZXRGaWxlSWRcIik7XG4gICAgICB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZShcInRpY2tldERhdGVcIik7XHJcbiAgICAgIGNvbnN0IGNsZWFuZWRRdWVyeSA9IHVybC5zZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcclxuICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBcIlwiLCBjbGVhbmVkUXVlcnkgPyBgJHt1cmwucGF0aG5hbWV9PyR7Y2xlYW5lZFF1ZXJ5fWAgOiB1cmwucGF0aG5hbWUpO1xyXG4gICAgfSxcclxuICAgIFtcbiAgICAgIGJ1aWxkSW5pdGlhbFN0YW5kYXJkU25hcHNob3QsXG4gICAgICBjbGVhckNhY2hlZFN0YXRlLFxuICAgICAgY2xlYXJMaXN0Q2FjaGUsXG4gICAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgICBsb2FkTGlzdCxcbiAgICAgIHJlc2V0TGlzdCxcbiAgICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcbiAgICBdXG4gICk7XG5cclxuICBjb25zdCByZXN0b3JlTGlua01vZGVSZXR1cm5TdGF0ZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGNhY2hlZFN0YXRlOiBFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihjYWNoZWRTdGF0ZS5maWx0ZXJzLm1hbmFnZWRVc2VySWQpO1xyXG4gICAgICBjb25zdCByZXN0b3JlZEZpbHRlcnMgPSB7XHJcbiAgICAgICAgLi4uY2FjaGVkU3RhdGUuZmlsdGVycyxcclxuICAgICAgICBtYW5hZ2VkVXNlcklkOiByZXN0b3JlZE1hbmFnZWRVc2VySWQsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMocmVzdG9yZWRGaWx0ZXJzKTtcclxuICAgICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLnNjcm9sbFk7XHJcbiAgICAgIHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50ID0gY2FjaGVkU3RhdGUuZm9jdXNGaWxlSWQ7XHJcbiAgICAgIHJlc3RvcmVMaW5rVGlja2V0U2VsZWN0aW9uKHtcclxuICAgICAgICBzZWxlY3Rpb25Nb2RlOiBjYWNoZWRTdGF0ZS5zZWxlY3Rpb25Nb2RlLFxyXG4gICAgICAgIHNlbGVjdGVkVGlja2V0czogY2FjaGVkU3RhdGUuc2VsZWN0ZWRUaWNrZXRzLFxyXG4gICAgICAgIGV4Y2x1ZGVkSWRzOiBjYWNoZWRTdGF0ZS5leGNsdWRlZElkcyxcclxuICAgICAgICBmaWx0ZXJlZFNuYXBzaG90OiBjYWNoZWRTdGF0ZS5maWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnMsXHJcbiAgICAgICAgZmlsdGVyZWRUb3RhbENvdW50OiBjYWNoZWRTdGF0ZS5maWx0ZXJlZFNlbGVjdGlvblRvdGFsLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChjYWNoZWRTdGF0ZS5pdGVtcy5sZW5ndGggPiAwIHx8IGNhY2hlZFN0YXRlLnRvdGFsID4gMCkge1xyXG4gICAgICAgIHJlc3RvcmVMaXN0U25hcHNob3Qoe1xyXG4gICAgICAgICAgaXRlbXM6IGNhY2hlZFN0YXRlLml0ZW1zLFxyXG4gICAgICAgICAgdG90YWw6IGNhY2hlZFN0YXRlLnRvdGFsLFxyXG4gICAgICAgICAgcGFnZTogY2FjaGVkU3RhdGUucGFnZSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcnVuQXV0b21hdGljTGlzdExvYWQoY2FjaGVkU3RhdGUucGFnZSwgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQocmVzdG9yZWRGaWx0ZXJzKSwge1xyXG4gICAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXHJcbiAgICAgICAgd2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeTogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZCxcclxuICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxyXG4gICAgICByZXN0b3JlTGlua1RpY2tldFNlbGVjdGlvbixcclxuICAgICAgcmVzdG9yZUxpc3RTbmFwc2hvdCxcclxuICAgICAgcnVuQXV0b21hdGljTGlzdExvYWQsXHJcbiAgICAgIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbixcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCByZXN0b3JlSW5pdGlhbExpbmtNb2RlU3RhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgbGlua1NuYXBzaG90ID0gYnVpbGRJbml0aWFsTGlua01vZGVTbmFwc2hvdCgpO1xuICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoKTtcbiAgICBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24oKTtcclxuICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xyXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKGxpbmtTbmFwc2hvdCk7XHJcbiAgICBydW5BdXRvbWF0aWNMaXN0TG9hZCgxLCBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZChsaW5rU25hcHNob3QpLCB7XG4gICAgICBjbGVhckNhY2hlOiB0cnVlLFxuICAgICAgcmVzZXRCZWZvcmVMb2FkOiB0cnVlLFxuICAgICAgd2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeTogdHJ1ZSxcbiAgICB9KTtcbiAgfSwgW1xyXG4gICAgYnVpbGRJbml0aWFsTGlua01vZGVTbmFwc2hvdCxcclxuICAgIGNsZWFyQ2FjaGVkU3RhdGUsXHJcbiAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsXHJcbiAgICBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24sXHJcbiAgICBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZCxcclxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcclxuICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkLFxuICBdKTtcblxuICAvLyBBcHBsaWVzIGRlZmF1bHQgZmlyc3QtZW50cnkgZmlsdGVycyBmb3IgdGhlIHN0YW5kYXJkIHRpY2tldHMgbGlzdCBvbmx5LlxuICBjb25zdCByZXN0b3JlSW5pdGlhbFN0YW5kYXJkU3RhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgaW5pdGlhbFNuYXBzaG90ID0gYnVpbGRJbml0aWFsU3RhbmRhcmRTbmFwc2hvdCgpO1xuICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoKTtcbiAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IFwiXCI7XG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKGluaXRpYWxTbmFwc2hvdCk7XG4gICAgcnVuQXV0b21hdGljTGlzdExvYWQoMSwgaW5pdGlhbFNuYXBzaG90LCB7XG4gICAgICBjbGVhckNhY2hlOiB0cnVlLFxuICAgICAgcmVzZXRCZWZvcmVMb2FkOiB0cnVlLFxuICAgIH0pO1xuICB9LCBbXG4gICAgYnVpbGRJbml0aWFsU3RhbmRhcmRTbmFwc2hvdCxcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSxcbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMsXG4gICAgcnVuQXV0b21hdGljTGlzdExvYWQsXG4gIF0pO1xuXHJcbiAgY29uc3QgcmVzdG9yZVN0YW5kYXJkUmV0dXJuU3RhdGUgPSB1c2VDYWxsYmFjayhcclxuICAgIChjYWNoZWRTdGF0ZTogRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSkgPT4ge1xyXG4gICAgICBjb25zdCByZXN0b3JlZE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oY2FjaGVkU3RhdGUuZmlsdGVycy5tYW5hZ2VkVXNlcklkKTtcclxuICAgICAgY29uc3QgcmVzdG9yZWRGaWx0ZXJzID0ge1xyXG4gICAgICAgIC4uLmNhY2hlZFN0YXRlLmZpbHRlcnMsXHJcbiAgICAgICAgbWFuYWdlZFVzZXJJZDogcmVzdG9yZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKHJlc3RvcmVkRmlsdGVycyk7XHJcbiAgICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBjYWNoZWRTdGF0ZS5zY3JvbGxZO1xyXG4gICAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLmZvY3VzRmlsZUlkO1xyXG5cclxuICAgICAgaWYgKGNhY2hlZFN0YXRlLml0ZW1zLmxlbmd0aCA+IDAgfHwgY2FjaGVkU3RhdGUudG90YWwgPiAwKSB7XHJcbiAgICAgICAgcmVzdG9yZUxpc3RTbmFwc2hvdCh7XHJcbiAgICAgICAgICBpdGVtczogY2FjaGVkU3RhdGUuaXRlbXMsXHJcbiAgICAgICAgICB0b3RhbDogY2FjaGVkU3RhdGUudG90YWwsXHJcbiAgICAgICAgICBwYWdlOiBjYWNoZWRTdGF0ZS5wYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBydW5BdXRvbWF0aWNMaXN0TG9hZChjYWNoZWRTdGF0ZS5wYWdlLCByZXN0b3JlZEZpbHRlcnMsIHtcclxuICAgICAgICBjbGVhckNhY2hlOiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLCByZXN0b3JlTGlzdFNuYXBzaG90LCBydW5BdXRvbWF0aWNMaXN0TG9hZCwgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXVxyXG4gICk7XHJcblxyXG4gIC8vIEtlZXBzIGRlbGV0ZSByZXR1cm4gZXhwbGljaXQ6IGJsYW5rIGZpbHRlcnMsIG9wZW4gcGFuZWwsIGFuZCBubyBhdXRvbWF0aWMgcmVsb2FkLlxyXG4gIGNvbnN0IHJlc3RvcmVEZWxldGVSZXR1cm5TdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcclxuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xyXG4gICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24oKTtcclxuICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xyXG4gICAgb25DbGVhcigpO1xyXG4gIH0sIFtjbGVhckNhY2hlZFN0YXRlLCBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbiwgb25DbGVhcl0pO1xyXG5cclxuICBjb25zdCB0b2dnbGVUaWNrZXRTZWxlY3Rpb24gPSB1c2VDYWxsYmFjayhcclxuICAgICh0aWNrZXQ6IEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW0pID0+IHtcclxuICAgICAgaWYgKCFpc0xpbmtNb2RlIHx8ICFjYW5Qcm9jZXNzTGlua01vZGUgfHwgbGlua1NoZWV0Q2hlY2tCdXN5IHx8IGxpbmtTaGVldExvY2tlZCB8fCBsaW5rRmxvd0J1c3kpIHJldHVybjtcclxuICAgICAgaWYgKHRpY2tldC5raW5kICE9PSBcImxpbmtcIikgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQodGlja2V0LmZpbGVJZCk7XHJcbiAgICAgIGlmICghZmlsZUlkKSByZXR1cm47XHJcbiAgICAgIGlmICghY2FuU2VsZWN0VGlja2V0Rm9yTGluayh0aWNrZXQpKSByZXR1cm47XHJcblxyXG4gICAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcclxuICAgICAgdG9nZ2xlTGlua1RpY2tldFNlbGVjdGlvbih0aWNrZXQpO1xyXG4gICAgfSxcclxuICAgIFtjYW5Qcm9jZXNzTGlua01vZGUsIGlzTGlua01vZGUsIGxpbmtGbG93QnVzeSwgbGlua1NoZWV0Q2hlY2tCdXN5LCBsaW5rU2hlZXRMb2NrZWQsIHRvZ2dsZUxpbmtUaWNrZXRTZWxlY3Rpb25dXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgY2xlYXJUaWNrZXRTZWxlY3Rpb24gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRTZWxlY3RBbGxFcnJvcihcIlwiKTtcclxuICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xyXG4gICAgY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uKCk7XHJcbiAgfSwgW2NsZWFyTGlua1RpY2tldFNlbGVjdGlvbl0pO1xyXG5cclxuICBjb25zdCByZXNvbHZlQWN0aXZlRmlsdGVycyA9IHVzZUNhbGxiYWNrKCgpOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0+IHtcclxuICAgIGNvbnN0IGJhc2VTbmFwc2hvdCA9IGFwcGxpZWRGaWx0ZXJzIHx8IGN1cnJlbnRGaWx0ZXJzO1xyXG4gICAgY29uc3QgcmVzb2x2ZWRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGJhc2VTbmFwc2hvdC5tYW5hZ2VkVXNlcklkKTtcclxuICAgIHJldHVybiBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZCh7XHJcbiAgICAgIC4uLmJhc2VTbmFwc2hvdCxcclxuICAgICAgbWFuYWdlZFVzZXJJZDogcmVzb2x2ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgfSk7XHJcbiAgfSwgW2FwcGxpZWRGaWx0ZXJzLCBjdXJyZW50RmlsdGVycywgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xyXG5cclxuICAvLyBBY3RpdmF0ZXMgYmFja2VuZC1kcml2ZW4gZmlsdGVyZWQgc2VsZWN0aW9uIGZvciB0aGUgY3VycmVudCBmaWx0ZXIgc25hcHNob3QuXHJcbiAgY29uc3Qgc2VsZWN0QWxsTWF0Y2hpbmdUaWNrZXRzID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKCFpc0xpbmtNb2RlIHx8ICFjYW5Qcm9jZXNzTGlua01vZGUgfHwgbGlua1NoZWV0Q2hlY2tCdXN5IHx8IGxpbmtTaGVldExvY2tlZCB8fCBsaW5rRmxvd0J1c3kgfHwgc2VsZWN0QWxsQnVzeSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2VsZWN0QWxsQnVzeSh0cnVlKTtcclxuICAgIHNldFNlbGVjdEFsbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgYWN0aXZlRmlsdGVycyA9IHJlc29sdmVBY3RpdmVGaWx0ZXJzKCk7XHJcbiAgICAgIHNlbGVjdEFsbEJ5RmlsdGVycyhhY3RpdmVGaWx0ZXJzLCB0b3RhbCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiVGlja2V0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXRzLlwiKTtcclxuICAgICAgc2V0U2VsZWN0QWxsRXJyb3IobWVzc2FnZSk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRTZWxlY3RBbGxCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbXHJcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBpc0xpbmtNb2RlLFxyXG4gICAgbGlua0Zsb3dCdXN5LFxyXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gICAgbGlua1NoZWV0TG9ja2VkLFxyXG4gICAgcmVzb2x2ZUFjdGl2ZUZpbHRlcnMsXHJcbiAgICBzZWxlY3RBbGxCeUZpbHRlcnMsXHJcbiAgICBzZWxlY3RBbGxCdXN5LFxyXG4gICAgdG90YWwsXHJcbiAgXSk7XHJcblxyXG4gIC8vIEtlZXBzIHNlbGVjdGVkIGNhcmQgbWV0YWRhdGEgZnJlc2ggd2l0aCB0aGUgbGF0ZXN0IGxpc3QgcGF5bG9hZC5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc0xpbmtNb2RlIHx8IGl0ZW1zLmxlbmd0aCA8IDEpIHJldHVybjtcclxuICAgIGh5ZHJhdGVWaXNpYmxlVGlja2V0cyhpdGVtcy5maWx0ZXIoKGl0ZW0pOiBpdGVtIGlzIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCA9PiBpdGVtLmtpbmQgPT09IFwibGlua1wiKSk7XHJcbiAgfSwgW2h5ZHJhdGVWaXNpYmxlVGlja2V0cywgaXNMaW5rTW9kZSwgaXRlbXNdKTtcclxuXHJcbiAgY29uc3QgcnVuVGlja2V0TGlua0Zsb3cgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoIWlzTGlua01vZGUgfHwgIWxpbmtTaGVldElkIHx8IGxpbmtGbG93QnVzeSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAobGlua1NoZWV0TG9ja2VkIHx8ICFjYW5Qcm9jZXNzTGlua01vZGUpIHtcclxuICAgICAgY29uc3QgYmxvY2tlZE1lc3NhZ2UgPVxyXG4gICAgICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlIHx8XHJcbiAgICAgICAgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1JlYWRPbmx5QnlTdGF0dXNcIiwgXCJObyBzZSBwdWVkZSBlZGl0YXIgZXN0YSBob2phIGRlIGdhc3RvcyBlbiBlbCBlc3RhZG8gYWN0dWFsLlwiKTtcclxuICAgICAgc2V0TGlua0Zsb3dFcnJvcihibG9ja2VkTWVzc2FnZSk7XHJcbiAgICAgIHNldExpbmtGbG93U3RhdHVzKGJsb2NrZWRNZXNzYWdlKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0ZWRDb3VudCA9IHJlc29sdmVTZWxlY3RlZENvdW50KHRvdGFsKTtcclxuICAgIGlmIChzZWxlY3RlZENvdW50IDwgMSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWN0aXZlRmlsdGVycyA9IHJlc29sdmVBY3RpdmVGaWx0ZXJzKCk7XHJcbiAgICBjb25zdCByZXF1ZXN0QXhVc2VySWQgPSBzYWZlVGV4dChhY3RpdmVGaWx0ZXJzLm1hbmFnZWRVc2VySWQgfHwgY3VycmVudEF4VXNlcklkKTtcclxuXHJcbiAgICBzZXRMaW5rRmxvd0J1c3kodHJ1ZSk7XHJcbiAgICBzZXRMaW5rRmxvd0Vycm9yKFwiXCIpO1xyXG4gICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XHJcbiAgICBzZXRMaW5rRmxvd1N0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0xpbmtpbmdMaW5lXCIsIFwiTGlua2luZyBleHBlbnNlIGxpbmUuLi5cIikpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbGlua0V4cGVuc2VTaGVldFRpY2tldHNCdWxrKFxyXG4gICAgICAgIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmVcclxuICAgICAgICAgID8ge1xyXG4gICAgICAgICAgICAgIGV4cGVuc2VTaGVldElkOiBsaW5rU2hlZXRJZCxcclxuICAgICAgICAgICAgICBzZWxlY3Rpb25Nb2RlOiBcImZpbHRlcmVkXCIsXHJcbiAgICAgICAgICAgICAgZmlsdGVyczogYnVpbGRFeHBlbnNlVGlja2V0TGlua0J1bGtGaWx0ZXJzKGZpbHRlcmVkU25hcHNob3QgfHwgYWN0aXZlRmlsdGVycyksXHJcbiAgICAgICAgICAgICAgZXhjbHVkZWRJZHMsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIDoge1xuICAgICAgICAgICAgICBleHBlbnNlU2hlZXRJZDogbGlua1NoZWV0SWQsXG4gICAgICAgICAgICAgIHNlbGVjdGlvbk1vZGU6IFwic2VsZWN0ZWRcIixcbiAgICAgICAgICAgICAgdGlja2V0SWRzOiBzZWxlY3RlZFRpY2tldHMuZmxhdE1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KGl0ZW0uZmlsZUlkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsZUlkID8gW2ZpbGVJZF0gOiBbXTtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgYXhVc2VySWRPdmVycmlkZTogcmVxdWVzdEF4VXNlcklkIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5EYXRhIHx8IG51bGw7XHJcbiAgICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgY29uc3QgZmFpbHVyZU1lc3NhZ2UgPSByZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcclxuICAgICAgICBzZXRMaW5rRmxvd0Vycm9yKGZhaWx1cmVNZXNzYWdlKTtcclxuICAgICAgICBzZXRMaW5rRmxvd1N0YXR1cyhmYWlsdXJlTWVzc2FnZSk7XHJcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0TGlua0J1bGtSZXN1bHQocmVzdWx0KTtcclxuXHJcbiAgICAgIGlmIChyZXN1bHQubGlua2VkQ291bnQgPiAwKSB7XHJcbiAgICAgICAgY2xlYXJUaWNrZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XHJcbiAgICAgICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKCk7XHJcbiAgICAgICAgY2xlYXJFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCgpO1xyXG4gICAgICAgIGNvbnN0IHN1Y2Nlc3NNYXJrID0gcmVzdWx0LmZhaWxlZENvdW50ID4gMCB8fCByZXN1bHQuc2tpcHBlZENvdW50ID4gMCA/IFwid2FybmluZ1Byb2Nlc3NcIiA6IFwib2tQcm9jZXNzXCI7XHJcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKHN1Y2Nlc3NNYXJrLCBzdWNjZXNzTWFyayA9PT0gXCJva1Byb2Nlc3NcIiA/IDEyMDAgOiAxNTAwKTtcclxuICAgICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChidWlsZEV4cGVuc2VTaGVldERldGFpbFVybChsaW5rU2hlZXRJZCksIHtcclxuICAgICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICBieXBhc3NHdWFyZE9uY2U6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGF3YWl0IGxvYWRMaXN0KGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSwgYWN0aXZlRmlsdGVycyk7XHJcblxyXG4gICAgICBpZiAocmVzdWx0LmZhaWxlZENvdW50ID4gMCAmJiByZXN1bHQubGlua2VkQ291bnQgPCAxKSB7XHJcbiAgICAgICAgY29uc3QgZmFpbHVyZU1lc3NhZ2UgPSByZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcclxuICAgICAgICBzZXRMaW5rRmxvd1N0YXR1cyhmYWlsdXJlTWVzc2FnZSk7XHJcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocmVzdWx0LmZhaWxlZENvdW50ID4gMCB8fCByZXN1bHQuc2tpcHBlZENvdW50ID4gMCkge1xyXG4gICAgICAgIHNldExpbmtGbG93U3RhdHVzKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpKTtcclxuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJ3YXJuaW5nUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0TGlua0Zsb3dTdGF0dXMocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIikpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgMTIwMCk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc3QgZmFpbHVyZU1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcclxuICAgICAgc2V0TGlua0Zsb3dFcnJvcihmYWlsdXJlTWVzc2FnZSk7XHJcbiAgICAgIHNldExpbmtGbG93U3RhdHVzKGZhaWx1cmVNZXNzYWdlKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRMaW5rRmxvd0J1c3koZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtcclxuICAgIGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsLFxyXG4gICAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxyXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSxcclxuICAgIGNsZWFyVGlja2V0U2VsZWN0aW9uLFxyXG4gICAgY3VycmVudFBhZ2UsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBleGNsdWRlZElkcyxcclxuICAgIGZpbHRlcmVkU25hcHNob3QsXHJcbiAgICBpc0xpbmtNb2RlLFxyXG4gICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSxcclxuICAgIGxpbmtGbG93QnVzeSxcclxuICAgIGxpbmtTaGVldElkLFxyXG4gICAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UsXHJcbiAgICBsaW5rU2hlZXRMb2NrZWQsXHJcbiAgICBsb2FkTGlzdCxcclxuICAgIHJlc29sdmVBY3RpdmVGaWx0ZXJzLFxyXG4gICAgcmVzb2x2ZVNlbGVjdGVkQ291bnQsXHJcbiAgICBzZWxlY3RlZFRpY2tldHMsXHJcbiAgICB0b3RhbCxcclxuICBdKTtcclxuXHJcbiAgY29uc3Qgb3BlbkxpbmtDb25maXJtTW9kYWwgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWlzTGlua01vZGUgfHwgc2VsZWN0ZWRUaWNrZXRDb3VudCA8IDEgfHwgbGlua0Zsb3dCdXN5IHx8IGxpbmtTaGVldENoZWNrQnVzeSB8fCBsaW5rU2hlZXRMb2NrZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldExpbmtGbG93RXJyb3IoXCJcIik7XHJcbiAgICBzZXRMaW5rRmxvd1N0YXR1cyhcIlwiKTtcclxuICAgIG9wZW5Db25maXJtKHtcclxuICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9MaW5rQnV0dG9uXCIsIFwiVmluY3VsYXIgdGlja2V0KHMpXCIpLFxyXG4gICAgICBtZXNzYWdlOiBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlXHJcbiAgICAgICAgPyBgJHtpbmRUKFwiTmF2X0V4cGVuc2VUaWNrZXRzXCIsIFwiVGlja2V0c1wiKX06ICR7c2VsZWN0ZWRUaWNrZXRDb3VudH1gXHJcbiAgICAgICAgOiBgJHtpbmRUKFwiTmF2X0V4cGVuc2VUaWNrZXRzXCIsIFwiVGlja2V0c1wiKX06ICR7c2VsZWN0ZWRUaWNrZXRDb3VudH1cXG4ke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1RvdGFsQW1vdW50XCIsIFwiVG90YWwgYW1vdW50XCIpfTogJHtzZWxlY3RlZFRvdGFsQW1vdW50VGV4dH1gLFxyXG4gICAgICBjb25maXJtVGV4dDogaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0xpbmtCdXR0b25cIiwgXCJWaW5jdWxhciB0aWNrZXQocylcIiksXHJcbiAgICAgIGNhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxyXG4gICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcclxuICAgICAgICByZXR1cm4gcnVuVGlja2V0TGlua0Zsb3coKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0sIFtcclxuICAgIGlzTGlua01vZGUsXHJcbiAgICBzZWxlY3RlZFRpY2tldENvdW50LFxyXG4gICAgbGlua0Zsb3dCdXN5LFxyXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gICAgbGlua1NoZWV0TG9ja2VkLFxyXG4gICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgc2VsZWN0ZWRUb3RhbEFtb3VudFRleHQsXHJcbiAgICBydW5UaWNrZXRMaW5rRmxvdyxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TGlua0Zsb3dFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5OiBsaW5rRmxvd0J1c3ksXHJcbiAgICAgIG9uRXJyb3I6IChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgc2V0TGlua0Zsb3dFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICBzZXRMaW5rRmxvd1N0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgfSxcclxuICAgICAgZGVmYXVsdEVycm9yTWVzc2FnZTogaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpLFxyXG4gICAgfSk7XHJcbiAgfSwgW2hhbmRsZUNvbmZpcm0sIGxpbmtGbG93QnVzeV0pO1xyXG5cclxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcclxuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBsaW5rRmxvd0J1c3lcclxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxyXG4gICAgOiAhbGlua0Zsb3dCdXN5ICYmIGxpbmtGbG93RXJyb3JcclxuICAgICAgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIilcclxuICAgICAgOiBtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFsaW5rRmxvd0J1c3kgJiYgbGlua0Zsb3dFcnJvcikge1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdm9pZCBoYW5kbGVNb2RhbENvbmZpcm0oKTtcclxuICB9LCBbY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm0sIGxpbmtGbG93QnVzeSwgbGlua0Zsb3dFcnJvcl0pO1xyXG5cclxuICBjb25zdCBvcGVuVGlja2V0RGV0YWlsID0gdXNlQ2FsbGJhY2soXHJcbiAgICAocmF3RmlsZUlkOiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQocmF3RmlsZUlkKTtcclxuICAgICAgaWYgKCFmaWxlSWQpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnMgfHwgY3VycmVudEZpbHRlcnM7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHtcclxuICAgICAgICBmaWx0ZXJzOiBzbmFwc2hvdCxcclxuICAgICAgICBwYWdlOiBjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsXHJcbiAgICAgICAgc2Nyb2xsWTogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5zY3JvbGxZIHx8IDAgOiAwLFxyXG4gICAgICAgIGZvY3VzRmlsZUlkOiBmaWxlSWQsXHJcbiAgICAgICAgaXRlbXMsXHJcbiAgICAgICAgdG90YWwsXHJcbiAgICAgICAgc2VsZWN0ZWRUaWNrZXRzLFxyXG4gICAgICAgIGxpbmtNb2RlU2hlZXRJZDogaXNMaW5rTW9kZSA/IGxpbmtTaGVldElkIDogXCJcIixcclxuICAgICAgICBzZWxlY3Rpb25Nb2RlLFxyXG4gICAgICAgIGV4Y2x1ZGVkSWRzLFxyXG4gICAgICAgIGZpbHRlcmVkU2VsZWN0aW9uRmlsdGVyczogZmlsdGVyZWRTbmFwc2hvdCxcclxuICAgICAgICBmaWx0ZXJlZFNlbGVjdGlvblRvdGFsOiBmaWx0ZXJlZFRvdGFsQ291bnQsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoaXNMaW5rTW9kZSkge1xyXG4gICAgICAgIHNhdmVDYWNoZWRTdGF0ZShjdXJyZW50U3RhdGUpO1xyXG4gICAgICAgIHNhdmVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKHtcclxuICAgICAgICAgIHNoZWV0SWQ6IGxpbmtTaGVldElkLFxyXG4gICAgICAgICAgcGFnZTogY3VycmVudFN0YXRlLnBhZ2UsXHJcbiAgICAgICAgICBzY3JvbGxZOiBjdXJyZW50U3RhdGUuc2Nyb2xsWSxcclxuICAgICAgICAgIGZvY3VzRmlsZUlkOiBmaWxlSWQsXHJcbiAgICAgICAgICBmaWx0ZXJzOiBzbmFwc2hvdCxcclxuICAgICAgICAgIHNlbGVjdGlvbk1vZGUsXHJcbiAgICAgICAgICBzZWxlY3RlZFRpY2tldHMsXHJcbiAgICAgICAgICBleGNsdWRlZElkcyxcclxuICAgICAgICAgIGZpbHRlcmVkU2VsZWN0aW9uRmlsdGVyczogZmlsdGVyZWRTbmFwc2hvdCxcclxuICAgICAgICAgIGZpbHRlcmVkU2VsZWN0aW9uVG90YWw6IGZpbHRlcmVkVG90YWxDb3VudCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChoYXNTaGVldENhbGxlckNvbnRleHQgJiYgc2hlZXRDYWxsZXJPcmlnaW4pIHtcclxuICAgICAgICAgIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCh7XHJcbiAgICAgICAgICAgIGZpbGVJZCxcclxuICAgICAgICAgICAgc2hlZXRJZDogbGlua1NoZWV0SWQsXHJcbiAgICAgICAgICAgIG9yaWdpbjogc2hlZXRDYWxsZXJPcmlnaW4sXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHF1ZXJ5LnNldChcIm9yaWdpblwiLCBzaGVldENhbGxlck9yaWdpbik7XHJcbiAgICAgICAgICBxdWVyeS5zZXQoXCJzaGVldElkXCIsIGxpbmtTaGVldElkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAgICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxyXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2F2ZUNhY2hlZFN0YXRlKGN1cnJlbnRTdGF0ZSk7XHJcbiAgICAgIGlmIChoYXNTaGVldENhbGxlckNvbnRleHQgJiYgc2hlZXRDYWxsZXJPcmlnaW4pIHtcclxuICAgICAgICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoe1xyXG4gICAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgICAgc2hlZXRJZDogbGlua1NoZWV0SWQsXHJcbiAgICAgICAgICBvcmlnaW46IHNoZWV0Q2FsbGVyT3JpZ2luLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgICBvcmlnaW46IHNoZWV0Q2FsbGVyT3JpZ2luLFxyXG4gICAgICAgICAgc2hlZXRJZDogbGlua1NoZWV0SWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXHJcbiAgICAgICAgICBieXBhc3NHdWFyZE9uY2U6IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY2xlYXJFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCgpO1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/ZmlsZUlkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGZpbGVJZCl9YCwge1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcclxuICAgICAgICBieXBhc3NHdWFyZE9uY2U6IGZhbHNlLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGFwcGxpZWRGaWx0ZXJzLFxyXG4gICAgICBjdXJyZW50UGFnZSxcclxuICAgICAgY3VycmVudEZpbHRlcnMsXHJcbiAgICAgIGhhc1NoZWV0Q2FsbGVyQ29udGV4dCxcclxuICAgICAgbGlua1NoZWV0SWQsXHJcbiAgICAgIGlzTGlua01vZGUsXHJcbiAgICAgIGl0ZW1zLFxyXG4gICAgICBmaWx0ZXJlZFRvdGFsQ291bnQsXHJcbiAgICAgIGZpbHRlcmVkU25hcHNob3QsXHJcbiAgICAgIGV4Y2x1ZGVkSWRzLFxyXG4gICAgICBzaGVldENhbGxlck9yaWdpbixcclxuICAgICAgc2F2ZUNhY2hlZFN0YXRlLFxyXG4gICAgICBzYXZlRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSxcclxuICAgICAgc2VsZWN0ZWRUaWNrZXRzLFxyXG4gICAgICBzZWxlY3Rpb25Nb2RlLFxyXG4gICAgICB0b3RhbCxcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xyXG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcclxuICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XHJcbiAgICBpZiAoIXRpbWVsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiBjYXJkO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyh7XHJcbiAgICBjb250YWluZXJSZWY6IHRpbWVsaW5lQ29udGFpbmVyUmVmLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgaXRlbXMsXHJcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCgodG90YWwgfHwgMCkgLyBQQUdFX1NJWkUpO1xyXG4gIGNvbnN0IHNob3dMaXN0TG9hZGluZyA9IGlzTG9hZGluZztcclxuICBjb25zdCBsaW5rTW9kZVNlbGVjdGlvbkJ1dHRvbnNEaXNhYmxlZCA9IGxpbmtGbG93QnVzeSB8fCBzZWxlY3RBbGxCdXN5IHx8IGlzTG9hZGluZztcclxuXHJcbiAgY29uc3Qgc3VtbWFyeUl0ZW1zID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBzbmFwc2hvdCA9IGFwcGxpZWRGaWx0ZXJzO1xyXG4gICAgaWYgKCFzbmFwc2hvdCkgcmV0dXJuIFtdIGFzIEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfT47XHJcblxyXG4gICAgY29uc3Qgc3VtbWFyeTogQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9PiA9IFtdO1xyXG4gICAgY29uc3QgbG9jYWxlID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCI7XHJcbiAgICBjb25zdCBmcm9tRGF0ZVRleHQgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoc25hcHNob3QuZnJvbURhdGUsIGxvY2FsZSwgXCJcIik7XHJcbiAgICBjb25zdCB0b0RhdGVUZXh0ID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKHNuYXBzaG90LnRvRGF0ZSwgbG9jYWxlLCBcIlwiKTtcclxuXHJcbiAgICBpZiAoZnJvbURhdGVUZXh0IHx8IHRvRGF0ZVRleHQpIHtcclxuICAgICAgc3VtbWFyeS5wdXNoKHtcclxuICAgICAgICBrZXk6IFwiZnJvbURhdGVcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIiksXHJcbiAgICAgICAgdmFsdWU6IGZyb21EYXRlVGV4dCB8fCBcIi0tXCIsXHJcbiAgICAgIH0pO1xyXG4gICAgICBzdW1tYXJ5LnB1c2goe1xyXG4gICAgICAgIGtleTogXCJ0b0RhdGVcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKSxcclxuICAgICAgICB2YWx1ZTogdG9EYXRlVGV4dCB8fCBcIi0tXCIsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzbmFwc2hvdC5maWx0ZXJLZXkudHJpbSgpKSB7XHJcbiAgICAgIHN1bW1hcnkucHVzaCh7XHJcbiAgICAgICAga2V5OiBcImZpbHRlcktleVwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfRmlsdGVyS2V5XCIsIFwiVGlja2V0XCIpLFxyXG4gICAgICAgIHZhbHVlOiBzbmFwc2hvdC5maWx0ZXJLZXkudHJpbSgpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc25hcHNob3QuY3VycmVuY3lDb2RlLnRyaW0oKSkge1xyXG4gICAgICBzdW1tYXJ5LnB1c2goe1xyXG4gICAgICAgIGtleTogXCJjdXJyZW5jeVwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKSxcclxuICAgICAgICB2YWx1ZTogc25hcHNob3QuY3VycmVuY3lDb2RlLnRyaW0oKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNuYXBzaG90LnN0YXR1c0ZpbHRlciAhPT0gXCJcIikge1xyXG4gICAgICBzdW1tYXJ5LnB1c2goe1xyXG4gICAgICAgIGtleTogXCJzdGF0dXNcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIlRpY2tldHNfRmlsdGVyX1N0YXR1c1wiLCBcIlN0YXR1c1wiKSxcclxuICAgICAgICB2YWx1ZTogZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsKHNuYXBzaG90LnN0YXR1c0ZpbHRlciksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzbmFwc2hvdC5nYXN0b1R5cGVGaWx0ZXIgIT09IFwiXCIpIHtcclxuICAgICAgY29uc3QgY2F0ZWdvcnlMYWJlbCA9IGdhc3RvVHlwZUxhYmVsTWFwLmdldChTdHJpbmcoc25hcHNob3QuZ2FzdG9UeXBlRmlsdGVyKSkgfHwgU3RyaW5nKHNuYXBzaG90Lmdhc3RvVHlwZUZpbHRlcik7XHJcbiAgICAgIHN1bW1hcnkucHVzaCh7XHJcbiAgICAgICAga2V5OiBcImNhdGVnb3J5XCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpLFxyXG4gICAgICAgIHZhbHVlOiBjYXRlZ29yeUxhYmVsLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc25hcHNob3QucHJvY2Vzc2VkQnlJYUZpbHRlciAhPT0gXCJhbGxcIikge1xyXG4gICAgICBzdW1tYXJ5LnB1c2goe1xyXG4gICAgICAgIGtleTogXCJwcm9jZXNzZWRcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIiksXHJcbiAgICAgICAgdmFsdWU6XHJcbiAgICAgICAgICBzbmFwc2hvdC5wcm9jZXNzZWRCeUlhRmlsdGVyID09PSBcInllc1wiXHJcbiAgICAgICAgICAgID8gaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFfWWVzXCIsIFwiWWVzXCIpXHJcbiAgICAgICAgICAgIDogaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFfTm9cIiwgXCJOb1wiKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN1bW1hcnk7XHJcbiAgfSwgW2FwcGxpZWRGaWx0ZXJzLCBnYXN0b1R5cGVMYWJlbE1hcF0pO1xyXG5cclxuICBjb25zdCBzaG93U3VtbWFyeSA9ICFpc0xpbmtNb2RlICYmICFzaG93RmlsdGVycyAmJiBzdW1tYXJ5SXRlbXMubGVuZ3RoID4gMDtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNMaW5rTW9kZSkgcmV0dXJuO1xyXG4gICAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCh7XHJcbiAgICAgIGFjdGl2ZTogdHJ1ZSxcclxuICAgICAgbWVzc2FnZTogbGlua01vZGVDYW5jZWxNZXNzYWdlLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcclxuICAgIH07XHJcbiAgfSwgW2lzTGlua01vZGUsIGxpbmtNb2RlQ2FuY2VsTWVzc2FnZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OmVudGVyXCIsIHtcclxuICAgICAgdXJsOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LmxvY2F0aW9uLmhyZWYgOiBcIlwiLFxyXG4gICAgICBkaWRSZXN0b3JlT25Nb3VudDogZGlkUmVzdG9yZU9uTW91bnRSZWYuY3VycmVudCxcclxuICAgICAgaGFzQWNjZXNzLFxyXG4gICAgICBpc0xpbmtNb2RlLFxyXG4gICAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgICB9KTtcclxuICAgIGlmIChkaWRSZXN0b3JlT25Nb3VudFJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzV2FybihcIm1vdW50UmVzdG9yZUVmZmVjdDpza2lwLWFscmVhZHktcmVzdG9yZWRcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghaGFzQWNjZXNzKSB7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzV2FybihcIm1vdW50UmVzdG9yZUVmZmVjdDpza2lwLW5vLWFjY2Vzc1wiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNMaW5rTW9kZSkge1xyXG4gICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgY29uc3QgdGlja2V0RmlsZUlkID0gc2FmZVRleHQodXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJ0aWNrZXRGaWxlSWRcIikpO1xyXG4gICAgICBpZiAodGlja2V0RmlsZUlkKSB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OnRpY2tldC1jcmVhdGUtcmV0dXJuLWRldGVjdGVkXCIsIHtcclxuICAgICAgICAgIHRpY2tldEZpbGVJZCxcclxuICAgICAgICAgIHRpY2tldERhdGU6IHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwidGlja2V0RGF0ZVwiKSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBkaWRSZXN0b3JlT25Nb3VudFJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgICAgICBhcHBseUNyZWF0ZWRUaWNrZXRSZXR1cm4odGlja2V0RmlsZUlkLCB1cmwuc2VhcmNoUGFyYW1zLmdldChcInRpY2tldERhdGVcIikpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICghbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5KSB7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzV2FybihcIm1vdW50UmVzdG9yZUVmZmVjdDp3YWl0aW5nLW1hbmFnZW1lbnQtYm9vdHN0cmFwXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBkaWRSZXN0b3JlT25Nb3VudFJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgIGNvbnN0IGlzSGlzdG9yeUJhY2tGb3J3YXJkID0gaXNFeHBlbnNlSGlzdG9yeUJhY2tGb3J3YXJkTmF2aWdhdGlvbigpO1xyXG4gICAgY29uc3QgaXNSZXR1cm5Gcm9tVGlja2V0RGV0YWlsID0gaGFzRXhwZW5zZVJldHVyblJlZmVycmVyKFtcclxuICAgICAgXCIvR2FzdG9zL1RpY2tldERldGFpbFwiLFxyXG4gICAgICBcIi9HYXN0b3MvVGlja2V0TGluZURldGFpbFwiLFxyXG4gICAgXSk7XHJcbiAgICBjb25zdCByZXR1cm5Nb2RlID0gY29uc3VtZVJldHVybk1vZGUoKTtcclxuICAgIGNvbnN0IGhhc1JldHVybkZsYWcgPSBjb25zdW1lUmV0dXJuRmxhZygpO1xyXG5cclxuICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXNvbHZlZC1yZXR1cm4tc3RhdGVcIiwge1xyXG4gICAgICBpc0hpc3RvcnlCYWNrRm9yd2FyZCxcclxuICAgICAgaXNSZXR1cm5Gcm9tVGlja2V0RGV0YWlsLFxyXG4gICAgICByZXR1cm5Nb2RlLFxyXG4gICAgICBoYXNSZXR1cm5GbGFnLFxyXG4gICAgICBpc0xpbmtNb2RlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHJldHVybk1vZGUgPT09IFwicmVzZXRfZmlsdGVyc1wiICYmIGhhc1JldHVybkZsYWcpIHtcclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OnJlc3RvcmUtZGVsZXRlLXJldHVyblwiKTtcclxuICAgICAgcmVzdG9yZURlbGV0ZVJldHVyblN0YXRlKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNMaW5rTW9kZSkge1xyXG4gICAgICBjb25zdCBpc1JldHVybmluZ0Zyb21EZXRhaWwgPSBoYXNSZXR1cm5GbGFnIHx8IGlzSGlzdG9yeUJhY2tGb3J3YXJkIHx8IGlzUmV0dXJuRnJvbVRpY2tldERldGFpbDtcclxuICAgICAgY29uc3QgY2FjaGVkU3RhdGUgPSBpc1JldHVybmluZ0Zyb21EZXRhaWwgPyByZWFkQ2FjaGVkU3RhdGUoKSA6IG51bGw7XHJcbiAgICAgIGNvbnN0IGNhY2hlZFNoZWV0SWQgPSBzYWZlVGV4dChjYWNoZWRTdGF0ZT8ubGlua01vZGVTaGVldElkKTtcclxuICAgICAgaWYgKGNhY2hlZFN0YXRlICYmIGNhY2hlZFNoZWV0SWQgJiYgY2FjaGVkU2hlZXRJZCA9PT0gc2FmZVRleHQobGlua1NoZWV0SWQpKSB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OnJlc3RvcmUtbGluay1tb2RlLWNhY2hlXCIsIHtcclxuICAgICAgICAgIGNhY2hlZFNoZWV0SWQsXHJcbiAgICAgICAgICBwYWdlOiBjYWNoZWRTdGF0ZS5wYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xyXG4gICAgICAgIHJlc3RvcmVMaW5rTW9kZVJldHVyblN0YXRlKGNhY2hlZFN0YXRlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGxpbmtSZXR1cm5TdGF0ZSA9IGlzUmV0dXJuaW5nRnJvbURldGFpbCA/IHJlYWRFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKGxpbmtTaGVldElkKSA6IG51bGw7XHJcbiAgICAgIGlmIChsaW5rUmV0dXJuU3RhdGUpIHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6cmVzdG9yZS1saW5rLW1vZGUtcmV0dXJuLXN0YXRlXCIsIHtcclxuICAgICAgICAgIHNoZWV0SWQ6IGxpbmtSZXR1cm5TdGF0ZS5zaGVldElkLFxyXG4gICAgICAgICAgcGFnZTogbGlua1JldHVyblN0YXRlLnBhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKCk7XHJcbiAgICAgICAgcmVzdG9yZUxpbmtNb2RlUmV0dXJuU3RhdGUoe1xyXG4gICAgICAgICAgZmlsdGVyczogbGlua1JldHVyblN0YXRlLmZpbHRlcnMsXHJcbiAgICAgICAgICBwYWdlOiBsaW5rUmV0dXJuU3RhdGUucGFnZSxcclxuICAgICAgICAgIHNjcm9sbFk6IGxpbmtSZXR1cm5TdGF0ZS5zY3JvbGxZLFxyXG4gICAgICAgICAgZm9jdXNGaWxlSWQ6IGxpbmtSZXR1cm5TdGF0ZS5mb2N1c0ZpbGVJZCxcclxuICAgICAgICAgIGl0ZW1zOiBbXSxcclxuICAgICAgICAgIHNlbGVjdGVkVGlja2V0czogbGlua1JldHVyblN0YXRlLnNlbGVjdGVkVGlja2V0cyxcclxuICAgICAgICAgIHRvdGFsOiAwLFxyXG4gICAgICAgICAgbGlua01vZGVTaGVldElkOiBsaW5rUmV0dXJuU3RhdGUuc2hlZXRJZCxcclxuICAgICAgICAgIHNlbGVjdGlvbk1vZGU6IGxpbmtSZXR1cm5TdGF0ZS5zZWxlY3Rpb25Nb2RlLFxyXG4gICAgICAgICAgZXhjbHVkZWRJZHM6IGxpbmtSZXR1cm5TdGF0ZS5leGNsdWRlZElkcyxcclxuICAgICAgICAgIGZpbHRlcmVkU2VsZWN0aW9uRmlsdGVyczogbGlua1JldHVyblN0YXRlLmZpbHRlcmVkU2VsZWN0aW9uRmlsdGVycyxcclxuICAgICAgICAgIGZpbHRlcmVkU2VsZWN0aW9uVG90YWw6IGxpbmtSZXR1cm5TdGF0ZS5maWx0ZXJlZFNlbGVjdGlvblRvdGFsLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OnJlc3RvcmUtaW5pdGlhbC1saW5rLW1vZGVcIik7XHJcbiAgICAgIHJlc3RvcmVJbml0aWFsTGlua01vZGVTdGF0ZSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XG5cbiAgICBpZiAoIWhhc1JldHVybkZsYWcgJiYgIWlzSGlzdG9yeUJhY2tGb3J3YXJkICYmICFpc1JldHVybkZyb21UaWNrZXREZXRhaWwpIHtcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXN0b3JlLWluaXRpYWwtc3RhbmRhcmQtc3RhdGVcIik7XG4gICAgICByZXN0b3JlSW5pdGlhbFN0YW5kYXJkU3RhdGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cclxuICAgIGNvbnN0IGNhY2hlZFN0YXRlID0gcmVhZENhY2hlZFN0YXRlKCk7XHJcbiAgICBpZiAoIWNhY2hlZFN0YXRlKSB7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzV2FybihcIm1vdW50UmVzdG9yZUVmZmVjdDpuby1jYWNoZWQtc3RhdGVcIik7XHJcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXN0b3JlLXN0YW5kYXJkLWNhY2hlXCIsIHtcclxuICAgICAgcGFnZTogY2FjaGVkU3RhdGUucGFnZSxcclxuICAgICAgZm9jdXNGaWxlSWQ6IGNhY2hlZFN0YXRlLmZvY3VzRmlsZUlkLFxyXG4gICAgfSk7XHJcbiAgICByZXN0b3JlU3RhbmRhcmRSZXR1cm5TdGF0ZShjYWNoZWRTdGF0ZSk7XHJcbiAgfSwgW1xyXG4gICAgYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuLFxyXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSxcclxuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSxcclxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxyXG4gICAgY29uc3VtZVJldHVybk1vZGUsXHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBpc0xpbmtNb2RlLFxyXG4gICAgbGlua1NoZWV0SWQsXHJcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgICByZWFkQ2FjaGVkU3RhdGUsXHJcbiAgICByZWFkRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSxcbiAgICByZXN0b3JlRGVsZXRlUmV0dXJuU3RhdGUsXG4gICAgcmVzdG9yZUluaXRpYWxMaW5rTW9kZVN0YXRlLFxuICAgIHJlc3RvcmVJbml0aWFsU3RhbmRhcmRTdGF0ZSxcbiAgICByZXN0b3JlTGlua01vZGVSZXR1cm5TdGF0ZSxcbiAgICByZXN0b3JlU3RhbmRhcmRSZXR1cm5TdGF0ZSxcbiAgXSk7XG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGlzTG9hZGluZykgcmV0dXJuO1xyXG4gICAgaWYgKHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPT0gbnVsbCAmJiAhcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBwZW5kaW5nU2Nyb2xsWSA9IHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQ7XHJcbiAgICBjb25zdCBwZW5kaW5nRm9jdXNGaWxlSWQgPSBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudDtcclxuICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSBcIlwiO1xyXG5cclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICBpZiAocGVuZGluZ1Njcm9sbFkgIT0gbnVsbCkge1xyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICB0b3A6IE1hdGgubWF4KDAsIHBlbmRpbmdTY3JvbGxZKSxcclxuICAgICAgICAgIGJlaGF2aW9yOiBcImF1dG9cIixcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFwZW5kaW5nRm9jdXNGaWxlSWQgfHwgIXRpbWVsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRGb2N1c0lkID0gcGVuZGluZ0ZvY3VzRmlsZUlkLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgIGNvbnN0IHRpbWVsaW5lSXRlbXMgPSBBcnJheS5mcm9tKFxyXG4gICAgICAgIHRpbWVsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtaXRlbVtkYXRhLXRpY2tldC1maWxlLWlkXVwiKVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBtYXRjaGluZ0l0ZW0gPSB0aW1lbGluZUl0ZW1zLmZpbmQoKGl0ZW0pID0+IHtcclxuICAgICAgICByZXR1cm4gc2FmZVRleHQoaXRlbS5kYXRhc2V0LnRpY2tldEZpbGVJZCkudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZEZvY3VzSWQ7XHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCB0YXJnZXRDYXJkID0gbWF0Y2hpbmdJdGVtPy5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XHJcbiAgICAgIGlmICghdGFyZ2V0Q2FyZCkgcmV0dXJuO1xyXG5cclxuICAgICAgdGFyZ2V0Q2FyZC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XHJcbiAgICB9KTtcclxuICB9LCBbaXNMb2FkaW5nLCBpdGVtcy5sZW5ndGhdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5IHx8ICFoYXNBY2Nlc3MpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVQYWdlU2hvdyA9IChldmVudDogUGFnZVRyYW5zaXRpb25FdmVudCkgPT4ge1xyXG4gICAgICBpZiAoIWV2ZW50LnBlcnNpc3RlZCAmJiAhaXNFeHBlbnNlSGlzdG9yeUJhY2tGb3J3YXJkTmF2aWdhdGlvbigpKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBzbmFwc2hvdCA9IHJlc29sdmVBY3RpdmVGaWx0ZXJzKCk7XHJcbiAgICAgIGlmICghaXNMaW5rTW9kZSAmJiAoIXNuYXBzaG90LmZyb21EYXRlIHx8ICFzbmFwc2hvdC50b0RhdGUpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBydW5BdXRvbWF0aWNMaXN0TG9hZChjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsIHNuYXBzaG90LCB7XHJcbiAgICAgICAgY2xlYXJDYWNoZTogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgaGFuZGxlUGFnZVNob3cpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBoYW5kbGVQYWdlU2hvdyk7XHJcbiAgICB9O1xyXG4gIH0sIFtjdXJyZW50UGFnZSwgaGFzQWNjZXNzLCBpc0xpbmtNb2RlLCBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksIHJlc29sdmVBY3RpdmVGaWx0ZXJzLCBydW5BdXRvbWF0aWNMaXN0TG9hZF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgb25Ub2dnbGVGaWx0ZXJzID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCB3aWxsT3BlbiA9ICFzaG93RmlsdGVycztcclxuICAgICAgdG9nZ2xlRmlsdGVyUGFuZWwoKTtcclxuICAgICAgaWYgKHdpbGxPcGVuKSB7XHJcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHsgdG9wOiAwLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvblJlZnJlc2ggPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnMoKTtcclxuICAgICAgaWYgKCFpc0xpbmtNb2RlICYmICghc25hcHNob3Q/LmZyb21EYXRlIHx8ICFzbmFwc2hvdD8udG9EYXRlKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB2b2lkIGxvYWRMaXN0KGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSwgc25hcHNob3QpO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXRpY2tldHMtdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XHJcbiAgICB9O1xyXG4gIH0sIFtjdXJyZW50UGFnZSwgaXNMaW5rTW9kZSwgbG9hZExpc3QsIHJlc29sdmVBY3RpdmVGaWx0ZXJzLCBzaG93RmlsdGVycywgdG9nZ2xlRmlsdGVyUGFuZWxdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXtsaW5rRmxvd0J1c3l9XHJcbiAgICAgICAgZXJyb3I9e2xpbmtGbG93RXJyb3J9XHJcbiAgICAgICAgc3RhdHVzPXtsaW5rRmxvd1N0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17Y2xvc2VDb25maXJtfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgcmVmPXtjYW1lcmFJbnB1dFJlZn1cclxuICAgICAgICB0eXBlPVwiZmlsZVwiXHJcbiAgICAgICAgYWNjZXB0PXtUSUNLRVRfSU1BR0VfQUNDRVBUX0FUVFJJQlVURX1cclxuICAgICAgICBjYXB0dXJlPVwiZW52aXJvbm1lbnRcIlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXHJcbiAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZmlsZXM/LlswXSB8fCBudWxsO1xyXG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICB2b2lkIGhhbmRsZVNlbGVjdGVkRmlsZShmaWxlLCBcImNhbWVyYVwiKTtcclxuICAgICAgICB9fVxyXG4gICAgICAvPlxyXG4gICAgICA8aW5wdXRcclxuICAgICAgICByZWY9e2dhbGxlcnlJbnB1dFJlZn1cclxuICAgICAgICB0eXBlPVwiZmlsZVwiXHJcbiAgICAgICAgYWNjZXB0PXtUSUNLRVRfSU1BR0VfQUNDRVBUX0FUVFJJQlVURX1cclxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxyXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmZpbGVzPy5bMF0gfHwgbnVsbDtcclxuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgdm9pZCBoYW5kbGVTZWxlY3RlZEZpbGUoZmlsZSwgXCJnYWxsZXJ5XCIpO1xyXG4gICAgICAgIH19XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICB7IWlzTGlua01vZGUgJiYgc291cmNlUGlja2VyT3BlbiA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzQ1IHB4LTQgcHktNlwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctc20gcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgcC00IHNoYWRvdy14bFwiPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtWzE2cHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS04MDBcIj5cclxuICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9UaXRsZVwiLCBcIk51ZXZvIHRpY2tldFwiKX1cclxuICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgICAge2luZFQoXHJcbiAgICAgICAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9Cb2R5XCIsXHJcbiAgICAgICAgICAgICAgICBcIlNlbGVjY2lvbmEgdW5hIGZ1ZW50ZSBwYXJhIGNhcHR1cmFyIG8gZWxlZ2lyIGxhIGltYWdlbiBkZWwgdGlja2V0LlwiXHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9wPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IGdyaWQgZ3JpZC1jb2xzLTEgZ2FwLTJcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZvaWQgc2VsZWN0RnJvbUNhbWVyYShjYW1lcmFJbnB1dFJlZi5jdXJyZW50KTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfQ2FtZXJhXCIsIFwiVXNhciBjXHUwMEUxbWFyYVwiKX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RGcm9tR2FsbGVyeShnYWxsZXJ5SW5wdXRSZWYuY3VycmVudCl9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfR2FsbGVyeVwiLCBcIkVsZWdpciBpbWFnZW5cIil9XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17Y2xvc2VTb3VyY2VQaWNrZXJ9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHshaXNMaW5rTW9kZSA/IChcclxuICAgICAgICA8RXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5XHJcbiAgICAgICAgICBvcGVuPXtxdWlja1RpY2tldEJ1c3l9XHJcbiAgICAgICAgICB0aXRsZT17aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX1RpdGxlXCIsIFwiUHJvY2Vzc2luZyB0aWNrZXRcIil9XHJcbiAgICAgICAgICBzdW1tYXJ5PXtxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICAgICAgZWxhcHNlZE1zPXtxdWlja1RpY2tldEVsYXBzZWRNc31cclxuICAgICAgICAgIHN0YWdlcz17cXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlc31cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHshaXNMaW5rTW9kZSAmJiBxdWlja1RpY2tldEVycm9yTWVzc2FnZSA/IChcclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZVxyXG4gICAgICAgICAgICAgID8gXCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1hbWJlci0yMDAgYmctYW1iZXItNTAgcC0zIHRleHQtc20gdGV4dC1hbWJlci05MDBcIlxuICAgICAgICAgICAgICA6IFwiZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgc3BhY2UteS0yIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctcm9zZS01MCBwLTMgdGV4dC1zbSB0ZXh0LXJvc2UtODAwXCJcbiAgICAgICAgICB9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHA+e3F1aWNrVGlja2V0RXJyb3JNZXNzYWdlfTwvcD5cclxuICAgICAgICAgIHtxdWlja1RpY2tldEF0dGVtcHRJZCA/IChcclxuICAgICAgICAgICAgPHBcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmVcclxuICAgICAgICAgICAgICAgICAgPyBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItYW1iZXItMjAwIGJnLXdoaXRlIHB4LTIgcHktMSBmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1hbWJlci05MDAgYnJlYWstYWxsXCJcbiAgICAgICAgICAgICAgICAgIDogXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXdoaXRlIHB4LTIgcHktMSBmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1yb3NlLTgwMCBicmVhay1hbGxcIlxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7YGF0dGVtcHRJZDogJHtxdWlja1RpY2tldEF0dGVtcHRJZH1gfVxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgIHtxdWlja1RpY2tldFRyYWNlTGlzdC5sZW5ndGggPiAwID8gKFxyXG4gICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcclxuICAgICAgICAgICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlXHJcbiAgICAgICAgICAgICAgICAgID8gXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBiZy13aGl0ZSBwLTIgdGV4dC14cyB0ZXh0LWFtYmVyLTgwMFwiXG4gICAgICAgICAgICAgICAgICA6IFwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy13aGl0ZSBwLTIgdGV4dC14cyB0ZXh0LXJvc2UtNzAwXCJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lm1hcCgoZW50cnkpID0+IChcclxuICAgICAgICAgICAgICAgIDxwIGtleT17YCR7ZW50cnkuc3RlcH0tJHtlbnRyeS5hdH1gfT57YCR7ZW50cnkuc3RlcH06ICR7ZW50cnkudHJhY2VJZH1gfTwvcD5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTJcIj5cclxuICAgICAgICAgICAge2hhc1BhcnRpYWxUaWNrZXRGYWlsdXJlID8gKFxyXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIiBvbkNsaWNrPXtvcGVuQ3JlYXRlZFRpY2tldH0+XHJcbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X09wZW5DcmVhdGVkVGlja2V0XCIsIFwiT3BlbiBjcmVhdGVkIHRpY2tldFwiKX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgIHtoYXNQZW5kaW5nVXBsb2FkUmV0cnkgPyAoXHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCJcclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgdm9pZCByZXRyeVBlbmRpbmdVcGxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9SZXRyeVVwbG9hZFwiLCBcIlJlaW50ZW50YXIgdXBsb2FkXCIpfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiIG9uQ2xpY2s9e2NsZWFyUXVpY2tUaWNrZXRFcnJvcn0+XHJcbiAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2xvc2VcIiwgXCJDbG9zZVwiKX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICB7c2hvd1N1bW1hcnkgPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItY2FyZCBmaWx0ZXItY2FyZC0tc3VtbWFyeSBwLTMgc206cC00IG10LTEgbWItM1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJleHBlbnNlLXN1bW1hcnktZ3JpZCBncmlkIGdyaWQtY29scy0xIG1pbi1bMzYwcHhdOmdyaWQtY29scy0yIGl0ZW1zLXN0YXJ0IGdhcC14LTQgZ2FwLXktMSB0ZXh0LXhzXCI+XHJcbiAgICAgICAgICAgIHtzdW1tYXJ5SXRlbXMubWFwKChpdGVtKSA9PiAoXHJcbiAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAga2V5PXtpdGVtLmtleX1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN1bW1hcnkgaGlzdG9yeS1maWx0ZXItc3VtbWFyeS0tZ3JpZC1pdGVtIGxlYWRpbmctNSBtaW4tdy0wXCJcclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdW1tYXJ5X19sYWJlbCBmb250LXNlbWlib2xkXCI+e2l0ZW0ubGFiZWx9Ojwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN1bW1hcnlfX3ZhbHVlIGJyZWFrLXdvcmRzXCI+e2l0ZW0udmFsdWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIDxFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbFxyXG4gICAgICAgIG1vZGU9e2lzTGlua01vZGUgPyBcImxpbmtcIiA6IFwiZ2VuZXJhbFwifVxyXG4gICAgICAgIHZpc2libGU9e3Nob3dGaWx0ZXJzfVxyXG4gICAgICAgIHNob3dNYW51YWxEYXRlRmlsdGVyPXtzaG93TWFudWFsRGF0ZUZpbHRlcn1cclxuICAgICAgICBtYW51YWxEYXRlQXV0b09wZW5LZXk9e21hbnVhbERhdGVBdXRvT3BlbktleX1cclxuICAgICAgICBmcm9tRGF0ZT17ZnJvbURhdGV9XHJcbiAgICAgICAgdG9EYXRlPXt0b0RhdGV9XHJcbiAgICAgICAgZmlsdGVyS2V5PXtmaWx0ZXJLZXl9XHJcbiAgICAgICAgY3VycmVuY3lDb2RlPXtjdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgbWFuYWdlZFVzZXJJZD17bWFuYWdlZFVzZXJJZH1cclxuICAgICAgICBtYW5hZ2VkVXNlcnM9e21hbmFnZWRVc2Vyc31cclxuICAgICAgICBzaG93TWFuYWdlZFVzZXJGaWx0ZXI9e3Nob3dNYW5hZ2VkVXNlckZpbHRlcn1cclxuICAgICAgICBzdGF0dXNGaWx0ZXI9e3N0YXR1c0ZpbHRlcn1cclxuICAgICAgICBnYXN0b1R5cGVGaWx0ZXI9e2dhc3RvVHlwZUZpbHRlcn1cclxuICAgICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyPXtwcm9jZXNzZWRCeUlhRmlsdGVyfVxyXG4gICAgICAgIGFjdGl2ZVF1aWNrRmlsdGVyPXthY3RpdmVRdWlja0ZpbHRlcn1cclxuICAgICAgICBzaG93TWFudWFsRGF0ZUVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yfVxyXG4gICAgICAgIHN0YXR1c0ZpbHRlclJlYWRPbmx5PXtzdGF0dXNGaWx0ZXJMb2NrZWR9XHJcbiAgICAgICAgZml4ZWRTdGF0dXNGaWx0ZXI9e2ZpeGVkU3RhdHVzRmlsdGVyfVxyXG4gICAgICAgIGdhc3RvVHlwZU9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XHJcbiAgICAgICAgb25EYXRlUmFuZ2VDaGFuZ2U9e29uRGF0ZVJhbmdlQ2hhbmdlfVxyXG4gICAgICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZT17b25NYW51YWxSYW5nZUNvbXBsZXRlfVxyXG4gICAgICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2U9e29uUXVpY2tGaWx0ZXJDaGFuZ2V9XHJcbiAgICAgICAgb25GaWx0ZXJLZXlDaGFuZ2U9e3NldEZpbHRlcktleX1cclxuICAgICAgICBvbkN1cnJlbmN5Q29kZUNoYW5nZT17c2V0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgIG9uTWFuYWdlZFVzZXJJZENoYW5nZT17c2V0TWFuYWdlZFVzZXJJZH1cclxuICAgICAgICBvblN0YXR1c0ZpbHRlckNoYW5nZT17c2V0U3RhdHVzRmlsdGVyfVxyXG4gICAgICAgIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlPXtzZXRHYXN0b1R5cGVGaWx0ZXJ9XHJcbiAgICAgICAgb25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlPXtzZXRQcm9jZXNzZWRCeUlhRmlsdGVyfVxyXG4gICAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XHJcbiAgICAgICAgb25BcHBseT17b25BcHBseX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtpc0xpbmtNb2RlID8gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIHB4LTAuNVwiPlxyXG4gICAgICAgICAgeyFjYW5Qcm9jZXNzTGlua01vZGUgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXJvc2UtNzAwXCI+e2luZFQoXCJBdXRoX1Blcm1pc3Npb25EZW5pZWRfQm9keVwiLCBcIk5vIHBlcm1pc3Npb24uXCIpfTwvZGl2PlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAge2NhblByb2Nlc3NMaW5rTW9kZSAmJiBsaW5rU2hlZXRDaGVja0J1c3kgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiPlxyXG4gICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9IC8+XHJcbiAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgIHtjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiBzZWxlY3RBbGxCdXN5ID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIj5cclxuICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfSAvPlxyXG4gICAgICAgICAgICAgIDxzcGFuPntpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmICFsaW5rU2hlZXRDaGVja0J1c3kgJiYgbGlua1NoZWV0TG9ja2VkID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1yb3NlLTcwMFwiPlxyXG4gICAgICAgICAgICAgIHtsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZSB8fFxyXG4gICAgICAgICAgICAgICAgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1JlYWRPbmx5QnlTdGF0dXNcIiwgXCJObyBzZSBwdWVkZSBlZGl0YXIgZXN0YSBob2phIGRlIGdhc3RvcyBlbiBlbCBlc3RhZG8gYWN0dWFsLlwiKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmICFsaW5rU2hlZXRDaGVja0J1c3kgJiYgIWxpbmtTaGVldExvY2tlZCAmJiBzZWxlY3RBbGxFcnJvciA/IChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtcm9zZS03MDBcIj57c2VsZWN0QWxsRXJyb3J9PC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmICFsaW5rU2hlZXRDaGVja0J1c3kgJiYgIWxpbmtTaGVldExvY2tlZCA/IChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTUgZ3JpZCBncmlkLWNvbHMtMiBnYXAtMS41IHB0LTAuNSBzbTptYi02XCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgbWluLXctMCBweC0xLjUgcHktMSB0ZXh0LVsxMHB4XSBsZWFkaW5nLXRpZ2h0IHNtOnRleHQteHNcIlxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBzZWxlY3RBbGxNYXRjaGluZ1RpY2tldHMoKTtcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xpbmtNb2RlU2VsZWN0aW9uQnV0dG9uc0Rpc2FibGVkIHx8IHRvdGFsIDwgMX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9TZWxlY3RBbGxcIiwgXCJTZWxlY2Npb25hciB0b2RvXCIpfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgbWluLXctMCBweC0xLjUgcHktMSB0ZXh0LVsxMHB4XSBsZWFkaW5nLXRpZ2h0IHNtOnRleHQteHNcIlxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbGVhclRpY2tldFNlbGVjdGlvbn1cclxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xpbmtNb2RlU2VsZWN0aW9uQnV0dG9uc0Rpc2FibGVkIHx8IHNlbGVjdGVkVGlja2V0Q291bnQgPCAxfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0NsZWFyQWxsXCIsIFwiQm9ycmFyIHNlbGVjY2lcdTAwRjNuXCIpfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAge2lzTGlua01vZGUgPyA8RXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeSByZXN1bHQ9e2xpbmtCdWxrUmVzdWx0fSAvPiA6IG51bGx9XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCJcclxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBzaG93TGlzdExvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XHJcbiAgICAgID5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxyXG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge2Vycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57ZXJyb3JNZXNzYWdlfTwvZGl2PiA6IG51bGx9XHJcblxyXG4gICAgICB7IXNob3dMaXN0TG9hZGluZyAmJiAhZXJyb3JNZXNzYWdlICYmIGl0ZW1zLmxlbmd0aCA9PT0gMCA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveCB0aW1lbGluZS1lbXB0eVwiIGRhdGEtZW1wdHktdGV4dD17aW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpfSAvPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHshZXJyb3JNZXNzYWdlICYmIGl0ZW1zLmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgPGRpdiByZWY9e3RpbWVsaW5lQ29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cclxuICAgICAgICAgIHtpdGVtcy5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQoaXRlbS5maWxlSWQpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRlUGFydHMgPSBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzKGl0ZW0udHJhbnNEYXRlLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gc2FmZVRleHQoaXRlbS5kZXNjcmlwdGlvbikgfHwgc2FmZVRleHQoaXRlbS5maWxlTmFtZSkgfHwgZmlsZUlkIHx8IFwiLVwiO1xyXG4gICAgICAgICAgICBjb25zdCBhbW91bnRUZXh0ID0gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGl0ZW0udG90YWxBbW91bnQgPz8gbnVsbCwgc2FmZVRleHQoaXRlbS5jdXJyZW5jeUNvZGUpKTtcclxuICAgICAgICAgICAgY29uc3Qgc3RhdHVzQ29kZSA9IGl0ZW0ua2luZCA9PT0gXCJnZW5lcmFsXCIgPyBpdGVtLnN0YXR1cyA6IG51bGw7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1c0xhYmVsID0gc3RhdHVzQ29kZSA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbChzdGF0dXNDb2RlKTtcclxuICAgICAgICAgICAgY29uc3QgaXNBc3NpZ25lZFRvRXhwZW5zZVNoZWV0ID0gc3RhdHVzQ29kZSA9PT0gMTtcclxuICAgICAgICAgICAgY29uc3Qgc2hvd1Byb2Nlc3NlZEJ5QWlJY29uID0gaXRlbS5wcm9jZXNzZWRCeUFJID09PSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGFibGVJbkxpbmtNb2RlID0gaXNMaW5rTW9kZSAmJiBjYW5TZWxlY3RUaWNrZXRGb3JMaW5rKGl0ZW0pO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkSW5MaW5rTW9kZSA9IGlzTGlua01vZGUgJiYgaXNMaW5rVGlja2V0U2VsZWN0ZWQoZmlsZUlkKTtcclxuICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkQnlBaUxhYmVsID0gaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdFRpY2tldExhYmVsID0gaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1NlbGVjdFRpY2tldFwiLCBcIlNlbGVjY2lvbmFyIHRpY2tldFwiKTtcclxuICAgICAgICAgICAgY29uc3QgZ2FzdG9UeXBlQ29kZSA9IGl0ZW0uZ2FzdG9UeXBlID09PSBudWxsID8gXCJcIiA6IFN0cmluZyhpdGVtLmdhc3RvVHlwZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGdhc3RvVHlwZUxhYmVsID0gZ2FzdG9UeXBlQ29kZVxyXG4gICAgICAgICAgICAgID8gZ2FzdG9UeXBlTGFiZWxNYXAuZ2V0KGdhc3RvVHlwZUNvZGUpIHx8IGdhc3RvVHlwZUNvZGVcclxuICAgICAgICAgICAgICA6IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBjYXJkU3VidGl0bGUgPSBnYXN0b1R5cGVMYWJlbDtcclxuICAgICAgICAgICAgY29uc3QgdGlja2V0Q2FyZEtleSA9XHJcbiAgICAgICAgICAgICAgZmlsZUlkIHx8XHJcbiAgICAgICAgICAgICAgYCR7c2FmZVRleHQoaXRlbS5maWxlTmFtZSl9LSR7c2FmZVRleHQoaXRlbS50cmFuc0RhdGUpfS0ke3NhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pfS0ke1N0cmluZyhpdGVtLnRvdGFsQW1vdW50ID8/IFwiXCIpfWA7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNMaW5rTW9kZSAmJiBpdGVtLmtpbmQgPT09IFwibGlua1wiKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbVxyXG4gICAgICAgICAgICAgICAgICBrZXk9e3RpY2tldENhcmRLZXl9XHJcbiAgICAgICAgICAgICAgICAgIGZpbGVJZD17ZmlsZUlkfVxyXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxyXG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZT17Y2FyZFN1YnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxyXG4gICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkPXtpc1NlbGVjdGVkSW5MaW5rTW9kZX1cclxuICAgICAgICAgICAgICAgICAgaXNTZWxlY3RhYmxlPXtpc1NlbGVjdGFibGVJbkxpbmtNb2RlfVxyXG4gICAgICAgICAgICAgICAgICBzZWxlY3Rpb25EaXNhYmxlZD17bGlua0Zsb3dCdXN5IHx8IGxpbmtTaGVldENoZWNrQnVzeSB8fCBsaW5rU2hlZXRMb2NrZWR9XHJcbiAgICAgICAgICAgICAgICAgIHNlbGVjdExhYmVsPXtzZWxlY3RUaWNrZXRMYWJlbH1cclxuICAgICAgICAgICAgICAgICAgb25PcGVuRGV0YWlsPXsoKSA9PiBvcGVuVGlja2V0RGV0YWlsKGZpbGVJZCl9XHJcbiAgICAgICAgICAgICAgICAgIG9uVG9nZ2xlU2VsZWN0PXsoKSA9PiB0b2dnbGVUaWNrZXRTZWxlY3Rpb24oaXRlbSl9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJhc2VTdGF0dXNJY29ucyA9IGlzQXNzaWduZWRUb0V4cGVuc2VTaGVldCB8fCBzaG93UHJvY2Vzc2VkQnlBaUljb24gPyAoXHJcbiAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIHtpc0Fzc2lnbmVkVG9FeHBlbnNlU2hlZXQgPyAoXHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImV4cGVuc2UtdGlja2V0LWNhcmRfX3N0YXR1cy1pY29uXCIgcm9sZT1cImltZ1wiIGFyaWEtbGFiZWw9e3N0YXR1c0xhYmVsfT5cclxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTQgdy00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk0xMy4xOSA4LjY4OGE0LjUgNC41IDAgMCAxIDEuMjQyIDcuMjQ0bC00LjUgNC41YTQuNSA0LjUgMCAwIDEtNi4zNjQtNi4zNjRsMS43NTctMS43NTdtMTMuMzUtLjYyMiAxLjc1Ny0xLjc1N2E0LjUgNC41IDAgMCAwLTYuMzY0LTYuMzY0bC00LjUgNC41YTQuNSA0LjUgMCAwIDAgMS4yNDIgNy4yNDRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICB7c2hvd1Byb2Nlc3NlZEJ5QWlJY29uID8gKFxyXG4gICAgICAgICAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImV4cGVuc2UtdGlja2V0LWNhcmRfX3N0YXR1cy1pY29uIGV4cGVuc2UtdGlja2V0LWNhcmRfX3N0YXR1cy1pY29uLS1haVwiXHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cImltZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17cHJvY2Vzc2VkQnlBaUxhYmVsfVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezEuNX0gc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPVwiaC00IHctNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNNCAxOGw0LTEybDQgMTJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNNiAxM2g0XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDZoNlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNyA2djEyXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDE4aDZcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgKSA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGtleT17dGlja2V0Q2FyZEtleX1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIlxyXG4gICAgICAgICAgICAgICAgZGF0YS10aWNrZXQtZmlsZS1pZD17ZmlsZUlkIHx8IHVuZGVmaW5lZH1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxyXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxyXG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZT17Y2FyZFN1YnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxyXG4gICAgICAgICAgICAgICAgICBvbk9wZW49eygpID0+IG9wZW5UaWNrZXREZXRhaWwoZmlsZUlkKX1cclxuICAgICAgICAgICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX190aXRsZSB0aW1lbGluZS1uYW1lXCJcclxuICAgICAgICAgICAgICAgICAgc3RhdHVzTGFiZWw9e3N0YXR1c0xhYmVsfVxyXG4gICAgICAgICAgICAgICAgICBzdGF0dXNJY29uPXtiYXNlU3RhdHVzSWNvbnN9XHJcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0ljb25DbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvbnNcIlxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxyXG4gICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsUGFnZXN9XHJcbiAgICAgICAgY3VycmVudFBhZ2U9e2N1cnJlbnRQYWdlfVxyXG4gICAgICAgIGxvYWRpbmc9e2lzTG9hZGluZ31cclxuICAgICAgICBvblBhZ2VDaGFuZ2U9eyhwYWdlKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBzbmFwc2hvdCA9IHJlc29sdmVBY3RpdmVGaWx0ZXJzKCk7XHJcbiAgICAgICAgICBpZiAoIWlzTGlua01vZGUgJiYgKCFzbmFwc2hvdD8uZnJvbURhdGUgfHwgIXNuYXBzaG90Py50b0RhdGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB2b2lkIGxvYWRMaXN0KHBhZ2UsIHNuYXBzaG90KTtcclxuICAgICAgICB9fVxyXG4gICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtpc0xpbmtNb2RlICYmIGNhblByb2Nlc3NMaW5rTW9kZSAmJiAhbGlua1NoZWV0Q2hlY2tCdXN5ICYmICFsaW5rU2hlZXRMb2NrZWQgPyAoXHJcbiAgICAgICAgPFBhZ2VCb3R0b21BY3Rpb25zIGFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0xpbmtCdXR0b25cIiwgXCJWaW5jdWxhciB0aWNrZXQocylcIil9PlxyXG4gICAgICAgICAgPFBhZ2VCb3R0b21BY3Rpb25CdXR0b25cclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9MaW5rQnV0dG9uXCIsIFwiVmluY3VsYXIgdGlja2V0KHMpXCIpfVxyXG4gICAgICAgICAgICBvbkNsaWNrPXtvcGVuTGlua0NvbmZpcm1Nb2RhbH1cclxuICAgICAgICAgICAgZGlzYWJsZWQ9e2xpbmtGbG93QnVzeSB8fCBzZWxlY3RBbGxCdXN5IHx8IHNlbGVjdGVkVGlja2V0Q291bnQgPCAxfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L1BhZ2VCb3R0b21BY3Rpb25zPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHtjYW5DcmVhdGVUaWNrZXQgJiYgIWlzTGlua01vZGUgPyAoXHJcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXHJcbiAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgclx1MDBFMXBpZGFzXCIpfVxyXG4gICAgICAgICAgc2l6ZT17NzZ9XHJcbiAgICAgICAgICByaWdodD17MTZ9XHJcbiAgICAgICAgICBib3R0b209ezI0fVxyXG4gICAgICAgICAgbWVudUFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0FjdGlvbnNcIiwgXCJBY2Npb25lcyByXHUwMEUxcGlkYXNcIil9XHJcbiAgICAgICAgICBtZW51SXRlbXM9e2ZhYk1lbnVJdGVtc31cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2UgdGlja2V0cyBsaXN0LlxyXG5jb25zdCBFeHBlbnNlVGlja2V0c1BhZ2UgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cclxuICAgICAgPEV4cGVuc2VUaWNrZXRzUGFnZUNvbnRlbnQgLz5cclxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XHJcbiAgKTtcclxufTtcclxuXHJcbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xyXG4gIGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoKCk7XHJcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBlbnNlLXRpY2tldHMtcm9vdFwiKTtcclxuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xyXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVRpY2tldHNQYWdlIC8+KTtcclxufTtcclxuXHJcbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldHNQYWdlO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IENoZWNrSWNvbiB9IGZyb20gXCJAaGVyb2ljb25zL3JlYWN0LzI0L291dGxpbmVcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlRGF0ZVBhcnRzIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlVGltZWxpbmVDYXJkIGZyb20gXCIuL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4XCI7XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtUHJvcHMgPSB7XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgZGF0ZVBhcnRzOiBFeHBlbnNlRGF0ZVBhcnRzO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgc3VidGl0bGU6IHN0cmluZztcclxuICBhbW91bnRUZXh0OiBzdHJpbmc7XHJcbiAgaXNTZWxlY3RlZDogYm9vbGVhbjtcclxuICBpc1NlbGVjdGFibGU6IGJvb2xlYW47XHJcbiAgc2VsZWN0aW9uRGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgc2VsZWN0TGFiZWw6IHN0cmluZztcclxuICBvbk9wZW5EZXRhaWw6ICgpID0+IHZvaWQ7XHJcbiAgb25Ub2dnbGVTZWxlY3Q6ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBMaW5rLW1vZGUgdGlja2V0IGNhcmQ6IGNlbnRlciBvcGVucyB0aGUgcmVhZC1vbmx5IGRldGFpbCBhbmQgdGhlIHJpZ2h0IHJhaWwgdG9nZ2xlcyBzZWxlY3Rpb24uXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtID0gKHtcclxuICBmaWxlSWQsXHJcbiAgZGF0ZVBhcnRzLFxyXG4gIHRpdGxlLFxyXG4gIHN1YnRpdGxlLFxyXG4gIGFtb3VudFRleHQsXHJcbiAgaXNTZWxlY3RlZCxcclxuICBpc1NlbGVjdGFibGUsXHJcbiAgc2VsZWN0aW9uRGlzYWJsZWQsXHJcbiAgc2VsZWN0TGFiZWwsXHJcbiAgb25PcGVuRGV0YWlsLFxyXG4gIG9uVG9nZ2xlU2VsZWN0LFxyXG59OiBFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbVByb3BzKSA9PiB7XHJcbiAgY29uc3QgY2FuVG9nZ2xlU2VsZWN0aW9uID0gaXNTZWxlY3RhYmxlICYmICFzZWxlY3Rpb25EaXNhYmxlZDtcclxuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkRldGFpbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIG9uT3BlbkRldGFpbCgpO1xyXG4gIH0sIFtvbk9wZW5EZXRhaWxdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVG9nZ2xlU2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFjYW5Ub2dnbGVTZWxlY3Rpb24pIHJldHVybjtcclxuICAgIG9uVG9nZ2xlU2VsZWN0KCk7XHJcbiAgfSwgW2NhblRvZ2dsZVNlbGVjdGlvbiwgb25Ub2dnbGVTZWxlY3RdKTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0aW9uSW5kaWNhdG9yVG9uZUNsYXNzTmFtZSA9IGlzU2VsZWN0ZWRcclxuICAgID8gXCJib3JkZXItcHJpbWFyeSBiZy1wcmltYXJ5IHRleHQtd2hpdGUgc2hhZG93LXNtXCJcclxuICAgIDogY2FuVG9nZ2xlU2VsZWN0aW9uXHJcbiAgICAgID8gXCJib3JkZXItc2xhdGUtMzAwIGJnLXdoaXRlIHRleHQtdHJhbnNwYXJlbnQgZ3JvdXAtaG92ZXI6Ym9yZGVyLXByaW1hcnkgZ3JvdXAtaG92ZXI6YmctcHJpbWFyeS81XCJcclxuICAgICAgOiBcImJvcmRlci1zbGF0ZS0yMDAgYmctc2xhdGUtMTAwIHRleHQtdHJhbnNwYXJlbnRcIjtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgY2xhc3NOYW1lPXtpc1NlbGVjdGVkID8gXCJ0aW1lbGluZS1pdGVtIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIHJpbmctMiByaW5nLXByaW1hcnkvMzBcIiA6IFwidGltZWxpbmUtaXRlbVwifVxuICAgICAgZGF0YS10aWNrZXQtZmlsZS1pZD17ZmlsZUlkIHx8IHVuZGVmaW5lZH1cclxuICAgICAgZGF0YS10aWNrZXQtc2VsZWN0ZWQ9e2lzU2VsZWN0ZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIn1cclxuICAgICAgZGF0YS10aWNrZXQtc2VsZWN0YWJsZT17Y2FuVG9nZ2xlU2VsZWN0aW9uID8gXCJ0cnVlXCIgOiBcImZhbHNlXCJ9XHJcbiAgICA+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxyXG4gICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XHJcbiAgICAgICAgICB0aXRsZT17dGl0bGV9XHJcbiAgICAgICAgICBzdWJ0aXRsZT17c3VidGl0bGV9XHJcbiAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxyXG4gICAgICAgICAgb25PcGVuPXtoYW5kbGVPcGVuRGV0YWlsfVxyXG4gICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX190aXRsZSB0aW1lbGluZS1uYW1lXCJcclxuICAgICAgICAgIGludGVyYWN0aW9uUHJvcHM9e3tcclxuICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IHRpdGxlLFxyXG4gICAgICAgICAgICBvbkNvbnRleHRNZW51OiAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgIGFyaWEtbGFiZWw9e3NlbGVjdExhYmVsfVxyXG4gICAgICAgICAgYXJpYS1wcmVzc2VkPXtpc1NlbGVjdGVkfVxyXG4gICAgICAgICAgdGl0bGU9e3NlbGVjdExhYmVsfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9eyFjYW5Ub2dnbGVTZWxlY3Rpb259XHJcbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVUb2dnbGVTZWxlY3Rpb259XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJncm91cCBhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCB6LTEwIGZsZXggdy1bNC4yNXJlbV0gaXRlbXMtc3RhcnQganVzdGlmeS1lbmQgcm91bmRlZC1yLVt2YXIoLS1yYWRpdXMteGwpXSBiZy10cmFuc3BhcmVudCBwLTEuNSB0cmFuc2l0aW9uIGZvY3VzLXZpc2libGU6b3V0bGluZS1ub25lIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy1wcmltYXJ5LzM1IGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBzbTp3LVs0Ljc1cmVtXVwiXG4gICAgICAgID5cclxuICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaC1bMzBweF0gdy1bMzBweF0gaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciB0cmFuc2l0aW9uICR7c2VsZWN0aW9uSW5kaWNhdG9yVG9uZUNsYXNzTmFtZX1gfVxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPENoZWNrSWNvbiBjbGFzc05hbWU9XCJoLVsyMHB4XSB3LVsyMHB4XVwiIHN0cm9rZVdpZHRoPXsyLjN9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeVByb3BzID0ge1xyXG4gIHJlc3VsdDogRXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXN1bHREdG8gfCBudWxsO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0TGlua0lzc3VlTGlzdFByb3BzID0ge1xyXG4gIGl0ZW1zOiBBcnJheTx7IHRpY2tldElkOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nIH0+O1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgdG9uZUNsYXNzTmFtZTogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyBvbmUgc2tpcHBlZCBvciBmYWlsZWQgdGlja2V0IGxpc3Qgd2l0aCBzdGFibGUga2V5cy5cclxuY29uc3QgRXhwZW5zZVRpY2tldExpbmtJc3N1ZUxpc3QgPSAoeyBpdGVtcywgdGl0bGUsIHRvbmVDbGFzc05hbWUgfTogRXhwZW5zZVRpY2tldExpbmtJc3N1ZUxpc3RQcm9wcykgPT4ge1xyXG4gIGlmIChpdGVtcy5sZW5ndGggPCAxKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIHAtMyAke3RvbmVDbGFzc05hbWV9YH0+XG4gICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGRcIj57dGl0bGV9PC9wPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIgc3BhY2UteS0yXCI+XHJcbiAgICAgICAge2l0ZW1zLm1hcCgoaXRlbSkgPT4gKFxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBrZXk9e2Ake2l0ZW0udGlja2V0SWQgfHwgXCJ1bmtub3duXCJ9LSR7aXRlbS5yZWFzb24gfHwgXCJuby1yZWFzb25cIn1gfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLWN1cnJlbnQvMTUgYmctd2hpdGUvODAgcC0yIHRleHQteHNcIlxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiVGlja2V0c19GaWx0ZXJfRmlsdGVyS2V5XCIsIFwiVGlja2V0XCIpfTo8L3NwYW4+e1wiIFwifVxyXG4gICAgICAgICAgICAgIDxzcGFuPntpdGVtLnRpY2tldElkIHx8IFwiLVwifTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0UmVhc29uXCIsIFwiTW90aXZvXCIpfTo8L3NwYW4+e1wiIFwifVxyXG4gICAgICAgICAgICAgIDxzcGFuPntpdGVtLnJlYXNvbiB8fCBcIi1cIn08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBTaG93cyB0aGUgYmFja2VuZCBidWxrLWxpbmsgcmVzdWx0IHN1bW1hcnksIGluY2x1ZGluZyBwYXJ0aWFsIHNraXBwZWQgYW5kIGZhaWxlZCByZWFzb25zLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0TGlua0J1bGtTdW1tYXJ5ID0gKHsgcmVzdWx0IH06IEV4cGVuc2VUaWNrZXRMaW5rQnVsa1N1bW1hcnlQcm9wcykgPT4ge1xyXG4gIGlmICghcmVzdWx0KSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3Qgc3VtbWFyeVJvd3MgPSBbXHJcbiAgICB7XHJcbiAgICAgIGtleTogXCJyZXF1ZXN0ZWRcIixcclxuICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRSZXF1ZXN0ZWRcIiwgXCJTb2xpY2l0YWRvc1wiKSxcclxuICAgICAgdmFsdWU6IHJlc3VsdC5yZXF1ZXN0ZWRDb3VudCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGtleTogXCJsaW5rZWRcIixcclxuICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRMaW5rZWRcIiwgXCJWaW5jdWxhZG9zXCIpLFxyXG4gICAgICB2YWx1ZTogcmVzdWx0LmxpbmtlZENvdW50LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAga2V5OiBcInNraXBwZWRcIixcclxuICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRTa2lwcGVkXCIsIFwiT21pdGlkb3NcIiksXHJcbiAgICAgIHZhbHVlOiByZXN1bHQuc2tpcHBlZENvdW50LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAga2V5OiBcImZhaWxlZFwiLFxyXG4gICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdEZhaWxlZFwiLCBcIkZhbGxpZG9zXCIpLFxyXG4gICAgICB2YWx1ZTogcmVzdWx0LmZhaWxlZENvdW50LFxyXG4gICAgfSxcclxuICBdO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTMgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUvOTUgcC0zXCI+XG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTkwMFwiPlxyXG4gICAgICAgICAge2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRUaXRsZVwiLCBcIlJlc3VsdGFkbyBkZSB2aW5jdWxhY2lcdTAwRjNuXCIpfVxyXG4gICAgICAgIDwvcD5cclxuICAgICAgICB7cmVzdWx0LmV4cGVuc2VTaGVldElkID8gKFxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXhzIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU2hlZXRcIiwgXCJFeHBlbnNlIHNoZWV0XCIpfToge3Jlc3VsdC5leHBlbnNlU2hlZXRJZH1cclxuICAgICAgICAgIDwvcD5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgc206Z3JpZC1jb2xzLTRcIj5cclxuICAgICAgICB7c3VtbWFyeVJvd3MubWFwKChpdGVtKSA9PiAoXHJcbiAgICAgICAgICA8ZGl2IGtleT17aXRlbS5rZXl9IGNsYXNzTmFtZT1cInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXNsYXRlLTUwIHB4LTMgcHktMiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMTRlbV0gdGV4dC1zbGF0ZS01MDBcIj57aXRlbS5sYWJlbH08L3A+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC14bCBmb250LXNlbWlib2xkIHRleHQtcHJpbWFyeVwiPntpdGVtLnZhbHVlfTwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBnYXAtMyBsZzpncmlkLWNvbHMtMlwiPlxyXG4gICAgICAgIDxFeHBlbnNlVGlja2V0TGlua0lzc3VlTGlzdFxyXG4gICAgICAgICAgdGl0bGU9e2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRTa2lwcGVkXCIsIFwiT21pdGlkb3NcIil9XHJcbiAgICAgICAgICBpdGVtcz17QXJyYXkuaXNBcnJheShyZXN1bHQuc2tpcHBlZCkgPyByZXN1bHQuc2tpcHBlZCA6IFtdfVxyXG4gICAgICAgICAgdG9uZUNsYXNzTmFtZT1cImJvcmRlci1hbWJlci0yMDAgYmctYW1iZXItNTAgdGV4dC1hbWJlci05MDBcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPEV4cGVuc2VUaWNrZXRMaW5rSXNzdWVMaXN0XHJcbiAgICAgICAgICB0aXRsZT17aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdEZhaWxlZFwiLCBcIkZhbGxpZG9zXCIpfVxyXG4gICAgICAgICAgaXRlbXM9e0FycmF5LmlzQXJyYXkocmVzdWx0LmZhaWxlZCkgPyByZXN1bHQuZmFpbGVkIDogW119XHJcbiAgICAgICAgICB0b25lQ2xhc3NOYW1lPVwiYm9yZGVyLXJvc2UtMjAwIGJnLXJvc2UtNTAgdGV4dC1yb3NlLTkwMFwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgdHlwZSB7IEF1dGhNYW5hZ2VkVXNlciB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IEhpc3RvcnlTdW1tYXJ5IGZyb20gXCIuLi8uLi92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5U3VtbWFyeS50c3hcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHtcclxuICBnZXRFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyT3B0aW9ucyxcclxuICBub3JtYWxpemVFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSxcclxuICB0eXBlIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlLFxyXG59IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsIEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkIH0gZnJvbSBcIi4uL3RpY2tldHMvZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXIgZnJvbSBcIi4vRXhwZW5zZURhdGVSYW5nZUZpbHRlci50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VGaWx0ZXJBY3Rpb25zIGZyb20gXCIuL0V4cGVuc2VGaWx0ZXJBY3Rpb25zLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMgZnJvbSBcIi4vRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQgZnJvbSBcIi4vRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0LnRzeFwiO1xyXG5cclxuY29uc3QgcGFyc2VJc29EYXRlID0gKHJhdzogc3RyaW5nKTogRGF0ZSB8IG51bGwgPT4ge1xyXG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcclxuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcpLnRyaW0oKS5zcGxpdChcIlRcIilbMF07XHJcbiAgaWYgKCEvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdCh2YWx1ZSkpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IHZhbHVlLnNwbGl0KFwiLVwiKS5tYXAoTnVtYmVyKTtcclxuICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0RGF0ZSA9IChyYXc6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGRhdGUgPSBwYXJzZUlzb0RhdGUocmF3KTtcclxuICBpZiAoIWRhdGUpIHJldHVybiBcIi0tXCI7XHJcbiAgcmV0dXJuIGRhdGVcclxuICAgIC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7XHJcbiAgICAgIGRheTogXCJudW1lcmljXCIsXHJcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXHJcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxyXG4gICAgfSlcclxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcclxuICAgIC50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbFByb3BzID0ge1xyXG4gIG1vZGU6IFwiZ2VuZXJhbFwiIHwgXCJsaW5rXCI7XHJcbiAgdmlzaWJsZTogYm9vbGVhbjtcclxuICBzaG93TWFudWFsRGF0ZUZpbHRlcjogYm9vbGVhbjtcclxuICBtYW51YWxEYXRlQXV0b09wZW5LZXk6IG51bWJlcjtcclxuICBmcm9tRGF0ZTogc3RyaW5nO1xyXG4gIHRvRGF0ZTogc3RyaW5nO1xyXG4gIGZpbHRlcktleTogc3RyaW5nO1xyXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIG1hbmFnZWRVc2VySWQ6IHN0cmluZztcclxuICBtYW5hZ2VkVXNlcnM6IEF1dGhNYW5hZ2VkVXNlcltdO1xyXG4gIHNob3dNYW5hZ2VkVXNlckZpbHRlcjogYm9vbGVhbjtcclxuICBzdGF0dXNGaWx0ZXI6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlO1xyXG4gIGdhc3RvVHlwZUZpbHRlcjogXCJcIiB8IEV4cGVuc2VHYXN0b1R5cGVDb2RlO1xyXG4gIHByb2Nlc3NlZEJ5SWFGaWx0ZXI6IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyO1xyXG4gIGFjdGl2ZVF1aWNrRmlsdGVyOiBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCB8IG51bGw7XHJcbiAgc2hvd01hbnVhbERhdGVFcnJvcjogYm9vbGVhbjtcclxuICBzdGF0dXNGaWx0ZXJSZWFkT25seT86IGJvb2xlYW47XHJcbiAgZml4ZWRTdGF0dXNGaWx0ZXI/OiAwIHwgMSB8IG51bGw7XHJcbiAgZ2FzdG9UeXBlT3B0aW9uczogRXhwZW5zZVNlbGVjdE9wdGlvbltdO1xyXG4gIG9uRGF0ZVJhbmdlQ2hhbmdlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25NYW51YWxSYW5nZUNvbXBsZXRlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25RdWlja0ZpbHRlckNoYW5nZTogKGZpbHRlcklkOiBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCkgPT4gdm9pZDtcclxuICBvbkZpbHRlcktleUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uTWFuYWdlZFVzZXJJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25TdGF0dXNGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpID0+IHZvaWQ7XHJcbiAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogXCJcIiB8IEV4cGVuc2VHYXN0b1R5cGVDb2RlKSA9PiB2b2lkO1xyXG4gIG9uUHJvY2Vzc2VkQnlJYUZpbHRlckNoYW5nZTogKHZhbHVlOiBFeHBlbnNlVGlja2V0UHJvY2Vzc2VkQnlJYUZpbHRlcikgPT4gdm9pZDtcclxuICBvbkNsZWFyOiAoKSA9PiB2b2lkO1xyXG4gIG9uQXBwbHk6ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBTaGFyZWQgdGlja2V0cyBmaWx0ZXIgcGFuZWwgd2l0aCBnbG9iYWwgcXVpY2sgZGF0ZSBmaWx0ZXJzIGFuZCBmaXhlZCB0aWNrZXQgZmlsdGVycy5cclxuY29uc3QgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWwgPSAoe1xyXG4gIG1vZGUsXHJcbiAgdmlzaWJsZSxcclxuICBzaG93TWFudWFsRGF0ZUZpbHRlcixcclxuICBtYW51YWxEYXRlQXV0b09wZW5LZXksXHJcbiAgZnJvbURhdGUsXHJcbiAgdG9EYXRlLFxyXG4gIGZpbHRlcktleSxcclxuICBjdXJyZW5jeUNvZGUsXHJcbiAgbWFuYWdlZFVzZXJJZCxcclxuICBtYW5hZ2VkVXNlcnMsXHJcbiAgc2hvd01hbmFnZWRVc2VyRmlsdGVyLFxyXG4gIHN0YXR1c0ZpbHRlcixcclxuICBnYXN0b1R5cGVGaWx0ZXIsXHJcbiAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICBhY3RpdmVRdWlja0ZpbHRlcixcclxuICBzaG93TWFudWFsRGF0ZUVycm9yLFxyXG4gIHN0YXR1c0ZpbHRlclJlYWRPbmx5ID0gZmFsc2UsXHJcbiAgZml4ZWRTdGF0dXNGaWx0ZXIgPSBudWxsLFxyXG4gIGdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgb25EYXRlUmFuZ2VDaGFuZ2UsXHJcbiAgb25NYW51YWxSYW5nZUNvbXBsZXRlLFxyXG4gIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXHJcbiAgb25GaWx0ZXJLZXlDaGFuZ2UsXHJcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2UsXHJcbiAgb25NYW5hZ2VkVXNlcklkQ2hhbmdlLFxyXG4gIG9uU3RhdHVzRmlsdGVyQ2hhbmdlLFxyXG4gIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlLFxyXG4gIG9uUHJvY2Vzc2VkQnlJYUZpbHRlckNoYW5nZSxcclxuICBvbkNsZWFyLFxyXG4gIG9uQXBwbHksXHJcbn06IEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsUHJvcHMpID0+IHtcclxuICBjb25zdCBzdGF0dXNPcHRpb25zID0gdXNlTWVtbygoKSA9PiBnZXRFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyT3B0aW9ucygpLCBbXSk7XHJcblxyXG4gIGNvbnN0IGNhdGVnb3J5T3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7IHZhbHVlOiBcIlwiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfQWxsXCIsIFwiQWxsXCIpIH0sXHJcbiAgICAgIC4uLmdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgICBdO1xyXG4gIH0sIFtnYXN0b1R5cGVPcHRpb25zXSk7XHJcblxyXG4gIGlmICghdmlzaWJsZSkgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgbG9jYWxlID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCI7XHJcbiAgY29uc3Qgc2hvd0lubGluZURhdGVTdW1tYXJ5ID0gIXNob3dNYW51YWxEYXRlRmlsdGVyICYmICEhZnJvbURhdGUgJiYgISF0b0RhdGU7XHJcbiAgY29uc3Qgc2hvd1N0YXR1c0ZpbHRlciA9IG1vZGUgPT09IFwiZ2VuZXJhbFwiO1xyXG4gIGNvbnN0IGRlc2t0b3BDb2x1bW5zQ2xhc3NOYW1lID0gc2hvd01hbmFnZWRVc2VyRmlsdGVyXHJcbiAgICA/IChzaG93U3RhdHVzRmlsdGVyID8gXCJsZzpncmlkLWNvbHMtNlwiIDogXCJsZzpncmlkLWNvbHMtNVwiKVxyXG4gICAgOiAoc2hvd1N0YXR1c0ZpbHRlciA/IFwibGc6Z3JpZC1jb2xzLTVcIiA6IFwibGc6Z3JpZC1jb2xzLTRcIik7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1leHBhbmRlZCBwLTIgc206cC0yLjUgcmVsYXRpdmVcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdGFjayBmbGV4IGZsZXgtY29sIHNwYWNlLXktMlwiPlxyXG4gICAgICAgIDxFeHBlbnNlUXVpY2tEYXRlRmlsdGVycyBhY3RpdmVRdWlja0ZpbHRlcj17YWN0aXZlUXVpY2tGaWx0ZXJ9IG9uUXVpY2tGaWx0ZXJDaGFuZ2U9e29uUXVpY2tGaWx0ZXJDaGFuZ2V9IC8+XHJcblxyXG4gICAgICAgIHtzaG93TWFudWFsRGF0ZUZpbHRlciA/IChcclxuICAgICAgICAgIDxFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyXHJcbiAgICAgICAgICAgIGZyb21EYXRlPXtmcm9tRGF0ZX1cclxuICAgICAgICAgICAgdG9EYXRlPXt0b0RhdGV9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRhdGVSYW5nZUNoYW5nZX1cclxuICAgICAgICAgICAgb25SYW5nZUNvbXBsZXRlPXtvbk1hbnVhbFJhbmdlQ29tcGxldGV9XHJcbiAgICAgICAgICAgIGF1dG9PcGVuUmVxdWVzdElkPXttYW51YWxEYXRlQXV0b09wZW5LZXl9XHJcbiAgICAgICAgICAgIHNob3dNYW51YWxFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvcn1cclxuICAgICAgICAgICAgc2hvd1N0YXJ0RXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3IgJiYgIWZyb21EYXRlfVxyXG4gICAgICAgICAgICBzaG93RW5kRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3IgJiYgIXRvRGF0ZX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IHNob3dJbmxpbmVEYXRlU3VtbWFyeSA/IChcclxuICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxyXG4gICAgICAgICAgICBzdW1tYXJ5RnJvbUxhYmVsPXtpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKX1cclxuICAgICAgICAgICAgc3VtbWFyeVRvTGFiZWw9e2luZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIil9XHJcbiAgICAgICAgICAgIGZyb21WYWx1ZT17Zm9ybWF0RGF0ZShmcm9tRGF0ZSwgbG9jYWxlKX1cclxuICAgICAgICAgICAgdG9WYWx1ZT17Zm9ybWF0RGF0ZSh0b0RhdGUsIGxvY2FsZSl9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImdhcC15LTEgdGV4dC1bMTFweF0gcHgtMVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgJHtkZXNrdG9wQ29sdW1uc0NsYXNzTmFtZX0gZ2FwLTJgfT5cclxuICAgICAgICAgIDxFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9GaWx0ZXJLZXlcIiwgXCJUaWNrZXRcIil9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfRmlsdGVyS2V5XCIsIFwiVGlja2V0XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17ZmlsdGVyS2V5fVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25GaWx0ZXJLZXlDaGFuZ2V9XHJcbiAgICAgICAgICAgIG1vZGU9e21vZGV9XHJcbiAgICAgICAgICAgIGNyZWF0ZWREYXRlRnJvbT17ZnJvbURhdGV9XHJcbiAgICAgICAgICAgIGNyZWF0ZWREYXRlVG89e3RvRGF0ZX1cclxuICAgICAgICAgICAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnNcclxuICAgICAgICAgICAgZml4ZWRTdGF0dXNGaWx0ZXI9e21vZGUgPT09IFwiZ2VuZXJhbFwiID8gZml4ZWRTdGF0dXNGaWx0ZXIgOiBudWxsfVxyXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17Y3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25DdXJyZW5jeUNvZGVDaGFuZ2V9XHJcbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAgIHNob3dMb2FkaW5nU3RhdGVUZXh0PXtmYWxzZX1cclxuICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAge3Nob3dNYW5hZ2VkVXNlckZpbHRlciA/IChcclxuICAgICAgICAgICAgPEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiQ29tbW9uX1VzZXJcIiwgXCJVc2VyXCIpfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiQ29tbW9uX1VzZXJcIiwgXCJVc2VyXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXttYW5hZ2VkVXNlcklkfVxyXG4gICAgICAgICAgICAgIHVzZXJzPXttYW5hZ2VkVXNlcnN9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uTWFuYWdlZFVzZXJJZENoYW5nZX1cclxuICAgICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAge3Nob3dTdGF0dXNGaWx0ZXIgPyAoXHJcbiAgICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfVxyXG4gICAgICAgICAgICAgIG9wdGlvbnM9e3N0YXR1c09wdGlvbnN9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e3N0YXR1c0ZpbHRlcn1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4gb25TdGF0dXNGaWx0ZXJDaGFuZ2Uobm9ybWFsaXplRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUobmV4dFZhbHVlLCBcIlwiKSl9XHJcbiAgICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtzdGF0dXNGaWx0ZXJSZWFkT25seX1cclxuICAgICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLXRpY2tldC1zdGF0dXMtZmlsdGVyXCJcclxuICAgICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxyXG4gICAgICAgICAgICBvcHRpb25zPXtjYXRlZ29yeU9wdGlvbnN9XHJcbiAgICAgICAgICAgIHZhbHVlPXtnYXN0b1R5cGVGaWx0ZXJ9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKG5leHRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgaWYgKG5leHRWYWx1ZSA9PT0gXCJcIiB8fCAhTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpKSB7XHJcbiAgICAgICAgICAgICAgICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZShcIlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2UocGFyc2VkIGFzIEV4cGVuc2VHYXN0b1R5cGVDb2RlKTtcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxyXG4gICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLXRpY2tldC1nYXN0b3R5cGUtZmlsdGVyXCJcclxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8RXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3RcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBXCIsIFwiUHJvY2Vzc2VkIGJ5IElBXCIpfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtwcm9jZXNzZWRCeUlhRmlsdGVyfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlfVxyXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPEV4cGVuc2VGaWx0ZXJBY3Rpb25zXHJcbiAgICAgICAgICBjbGVhckxhYmVsPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xlYXJcIiwgXCJDbGVhclwiKX1cclxuICAgICAgICAgIGFwcGx5TGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9BcHBseVwiLCBcIkFwcGx5XCIpfVxyXG4gICAgICAgICAgb25DbGVhcj17b25DbGVhcn1cclxuICAgICAgICAgIG9uQXBwbHk9e29uQXBwbHl9XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWw7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyIH0gZnJvbSBcIi4uL3RpY2tldHMvZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdFByb3BzID0ge1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuICB2YWx1ZTogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXI7XHJcbiAgb25DaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIpID0+IHZvaWQ7XHJcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBzaG93TGFiZWw/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gRml4ZWQgZW51bSBzZWxlY3QgZm9yIElBIHByb2Nlc3NpbmcgZmlsdGVyIHdpdGggQWxsL1llcy9ObyBvcHRpb25zLlxyXG5jb25zdCBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdCA9ICh7XHJcbiAgbGFiZWwsXHJcbiAgcGxhY2Vob2xkZXIsXHJcbiAgdmFsdWUsXHJcbiAgb25DaGFuZ2UsXHJcbiAgcmVhZE9ubHkgPSBmYWxzZSxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIHNob3dMYWJlbCA9IHRydWUsXHJcbn06IEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0UHJvcHMpID0+IHtcclxuICBjb25zdCB1aVZhbHVlID0gdmFsdWUgPT09IFwiYWxsXCIgPyBcIlwiIDogdmFsdWU7XHJcbiAgY29uc3Qgb3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPihcclxuICAgICgpID0+IFtcclxuICAgICAgeyB2YWx1ZTogXCJhbGxcIiwgdGV4dDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0FsbFwiLCBcIkFsbFwiKSB9LFxyXG4gICAgICB7IHZhbHVlOiBcInllc1wiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9ZZXNcIiwgXCJZZXNcIikgfSxcclxuICAgICAgeyB2YWx1ZTogXCJub1wiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9Ob1wiLCBcIk5vXCIpIH0sXHJcbiAgICBdLFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgIGxhYmVsPXtsYWJlbH1cclxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICBvcHRpb25zPXtvcHRpb25zfVxyXG4gICAgICB2YWx1ZT17dWlWYWx1ZX1cclxuICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IHtcclxuICAgICAgICBpZiAobmV4dFZhbHVlID09PSBcInllc1wiIHx8IG5leHRWYWx1ZSA9PT0gXCJub1wiIHx8IG5leHRWYWx1ZSA9PT0gXCJhbGxcIikge1xyXG4gICAgICAgICAgb25DaGFuZ2UobmV4dFZhbHVlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgb25DaGFuZ2UoXCJhbGxcIik7XHJcbiAgICAgIH19XHJcbiAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICBpZEJhc2U9XCJleHBlbnNlLXByb2Nlc3NlZC1ieS1pYS1maWx0ZXJcIlxyXG4gICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cclxuICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XHJcbiAgICAvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdDtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUmVtb3RlU2VhcmNoQ29tYm9ib3gsIHsgdHlwZSBSZW1vdGVTZWFyY2hPcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1JlbW90ZVNlYXJjaENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8sXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsXHJcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0LCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0UHJvcHMgPSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG1vZGU/OiBcImdlbmVyYWxcIiB8IFwibGlua1wiO1xyXG4gIGNyZWF0ZWREYXRlRnJvbT86IHN0cmluZztcclxuICBjcmVhdGVkRGF0ZVRvPzogc3RyaW5nO1xyXG4gIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zPzogYm9vbGVhbjtcclxuICBmaXhlZFN0YXR1c0ZpbHRlcj86IDAgfCAxIHwgbnVsbDtcclxuICByZWFkT25seT86IGJvb2xlYW47XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIHNob3dMYWJlbD86IGJvb2xlYW47XHJcbn07XHJcblxyXG5jb25zdCBTRUFSQ0hfUEFHRV9TSVpFID0gMzA7XHJcblxyXG4vLyBCdWlsZHMgbWluaW1hbCBwYXlsb2FkIGZvciB0aWNrZXQga2V5IHN1Z2dlc3Rpb25zIHdpdGhvdXQgZGF0ZSBmaWx0ZXJzLlxyXG5jb25zdCBidWlsZFRpY2tldFN1Z2dlc3RQYXlsb2FkID0gKFxyXG4gIHRlcm06IHN0cmluZyxcclxuICBwYWdlOiBudW1iZXIsXHJcbiAgcGFnZVNpemU6IG51bWJlcixcclxuICBmaXhlZFN0YXR1c0ZpbHRlcjogMCB8IDEgfCBudWxsLFxyXG4gIGNyZWF0ZWREYXRlRnJvbTogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gIGNyZWF0ZWREYXRlVG86IHN0cmluZyB8IHVuZGVmaW5lZFxyXG4pOiBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCB8IEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCA9PiB7XHJcbiAgY29uc3Qgc2FmZVRlcm0gPSBTdHJpbmcodGVybSB8fCBcIlwiKS50cmltKCk7XHJcbiAgY29uc3QgYmFzZVBheWxvYWQgPSB7XHJcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2UpIDogMSxcclxuICAgIHBhZ2VTaXplOiBOdW1iZXIuaXNGaW5pdGUocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCA/IE1hdGguZmxvb3IocGFnZVNpemUpIDogU0VBUkNIX1BBR0VfU0laRSxcclxuICAgIGNyZWF0ZWREYXRlRnJvbTogY3JlYXRlZERhdGVGcm9tIHx8IHVuZGVmaW5lZCxcclxuICAgIGNyZWF0ZWREYXRlVG86IGNyZWF0ZWREYXRlVG8gfHwgdW5kZWZpbmVkLFxyXG4gICAgc2VhcmNoS2V5OiBzYWZlVGVybSB8fCB1bmRlZmluZWQsXHJcbiAgICBmaWx0ZXI6IHNhZmVUZXJtIHx8IHVuZGVmaW5lZCxcclxuICB9O1xyXG5cclxuICBpZiAoZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDAgfHwgZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDEpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIC4uLmJhc2VQYXlsb2FkLFxyXG4gICAgICBzdGF0dXM6IGZpeGVkU3RhdHVzRmlsdGVyLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiBiYXNlUGF5bG9hZDtcclxufTtcclxuXHJcbmNvbnN0IG1hcFRpY2tldE9wdGlvbnMgPSAoXHJcbiAgaXRlbXM6IEFycmF5PEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvIHwgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvPiB8IHVuZGVmaW5lZFxyXG4pOiBSZW1vdGVTZWFyY2hPcHRpb25bXSA9PiB7XHJcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW10pXHJcbiAgICAubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGZpbGVJZCA9IFN0cmluZyhpdGVtPy5GaWxlSWQgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IFN0cmluZyhpdGVtPy5EZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IHN1YnRpdGxlID0gZGVzY3JpcHRpb24gfHwgXCItXCI7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdmFsdWU6IGZpbGVJZCxcclxuICAgICAgICB0aXRsZTogZmlsZUlkLFxyXG4gICAgICAgIHN1YnRpdGxlLFxyXG4gICAgICB9IGFzIFJlbW90ZVNlYXJjaE9wdGlvbjtcclxuICAgIH0pXHJcbiAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFJlbW90ZVNlYXJjaE9wdGlvbltdO1xyXG59O1xyXG5cclxuLy8gVGlja2V0IGtleSBmaWx0ZXIgaW5wdXQgd2l0aCByZW1vdGUgbGlzdCBzdWdnZXN0aW9ucy5cclxuY29uc3QgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0ID0gKHtcclxuICBsYWJlbCxcclxuICBwbGFjZWhvbGRlcixcclxuICB2YWx1ZSxcclxuICBvbkNoYW5nZSxcclxuICBtb2RlID0gXCJnZW5lcmFsXCIsXHJcbiAgY3JlYXRlZERhdGVGcm9tID0gXCJcIixcclxuICBjcmVhdGVkRGF0ZVRvID0gXCJcIixcclxuICBlbmFibGVSZW1vdGVTdWdnZXN0aW9ucyA9IHRydWUsXHJcbiAgZml4ZWRTdGF0dXNGaWx0ZXIgPSBudWxsLFxyXG4gIHJlYWRPbmx5ID0gZmFsc2UsXHJcbiAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICBzaG93TGFiZWwgPSB0cnVlLFxyXG59OiBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXRQcm9wcykgPT4ge1xyXG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xyXG5cclxuICBjb25zdCBsb2FkT3B0aW9ucyA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHNpZ25hbDogQWJvcnRTaWduYWwpOiBQcm9taXNlPFJlbW90ZVNlYXJjaE9wdGlvbltdPiA9PiB7XHJcbiAgICBjb25zdCBwYXlsb2FkID0gYnVpbGRUaWNrZXRTdWdnZXN0UGF5bG9hZCh0ZXJtLCAxLCBTRUFSQ0hfUEFHRV9TSVpFLCBmaXhlZFN0YXR1c0ZpbHRlciwgY3JlYXRlZERhdGVGcm9tLCBjcmVhdGVkRGF0ZVRvKTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID1cclxuICAgICAgbW9kZSA9PT0gXCJsaW5rXCJcclxuICAgICAgICA/IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3QocGF5bG9hZCBhcyBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QsIHtcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIHNpZ25hbCxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgOiBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0KHBheWxvYWQgYXMgRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsIHtcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIHNpZ25hbCxcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtYXBUaWNrZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyk7XHJcbiAgfSwgW2NyZWF0ZWREYXRlRnJvbSwgY3JlYXRlZERhdGVUbywgZml4ZWRTdGF0dXNGaWx0ZXIsIG1vZGVdKTtcclxuXHJcbiAgY29uc3QgbG9hZE9wdGlvbnNQYWdlID0gdXNlQ2FsbGJhY2soYXN5bmMgKHRlcm06IHN0cmluZywgcGFnZTogbnVtYmVyLCBfcGFnZVNpemU6IG51bWJlciwgc2lnbmFsOiBBYm9ydFNpZ25hbCkgPT4ge1xyXG4gICAgY29uc3QgcGF5bG9hZCA9IGJ1aWxkVGlja2V0U3VnZ2VzdFBheWxvYWQoXHJcbiAgICAgIHRlcm0sXHJcbiAgICAgIHBhZ2UsXHJcbiAgICAgIFNFQVJDSF9QQUdFX1NJWkUsXHJcbiAgICAgIGZpeGVkU3RhdHVzRmlsdGVyLFxyXG4gICAgICBjcmVhdGVkRGF0ZUZyb20sXHJcbiAgICAgIGNyZWF0ZWREYXRlVG9cclxuICAgICk7XHJcbiAgICBjb25zdCByZXNwb25zZSA9XHJcbiAgICAgIG1vZGUgPT09IFwibGlua1wiXHJcbiAgICAgICAgPyBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0KHBheWxvYWQgYXMgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RSZXF1ZXN0LCB7XHJcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICBzaWduYWwsXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIDogYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdChwYXlsb2FkIGFzIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LCB7XHJcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICBzaWduYWwsXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaXRlbXM6IFtdLFxyXG4gICAgICAgIHRvdGFsOiAwLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGl0ZW1zOiBtYXBUaWNrZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyksXHJcbiAgICAgIHRvdGFsOiBOdW1iZXIocmVzcG9uc2U/LlRvdGFsIHx8IDApLFxyXG4gICAgfTtcclxuICB9LCBbY3JlYXRlZERhdGVGcm9tLCBjcmVhdGVkRGF0ZVRvLCBmaXhlZFN0YXR1c0ZpbHRlciwgbW9kZV0pO1xyXG5cclxuICBpZiAoIWVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zIHx8IHJlYWRPbmx5TW9kZSkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cclxuICAgICAgICB7c2hvd0xhYmVsID8gKFxyXG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiIHN0eWxlPXt7IGNvbG9yOiBcIiMwMDI5NmJlMFwiIH19PlxyXG4gICAgICAgICAgICB7bGFiZWx9XHJcbiAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHB4LTMgcHktMiB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgdGV4dC1zbGF0ZS05MDAgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxyXG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxyXG4gICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8UmVtb3RlU2VhcmNoQ29tYm9ib3hcclxuICAgICAgbGFiZWw9e2xhYmVsfVxyXG4gICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XHJcbiAgICAgIHZhbHVlPXt2YWx1ZX1cclxuICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxyXG4gICAgICBvblNlYXJjaD17YXN5bmMgKHRlcm0sIHNpZ25hbCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbG9hZE9wdGlvbnModGVybSwgc2lnbmFsKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgIH19XHJcbiAgICAgIG9uU2VhcmNoUGFnZT17YXN5bmMgKHRlcm0sIHBhZ2UsIHBhZ2VTaXplLCBzaWduYWwpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGxvYWRPcHRpb25zUGFnZSh0ZXJtLCBwYWdlLCBwYWdlU2l6ZSwgc2lnbmFsKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgICByZXR1cm4geyBpdGVtczogW10sIHRvdGFsOiAwIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgIH19XHJcbiAgICAgIGlkQmFzZT1cImV4cGVuc2UtdGlja2V0LWZpbHRlci1rZXlcIlxyXG4gICAgICBtaW5TZWFyY2hMZW5ndGg9ezB9XHJcbiAgICAgIHBhZ2VTaXplPXtTRUFSQ0hfUEFHRV9TSVpFfVxyXG4gICAgICBhbGxvd0VtcHR5U2VhcmNoXHJcbiAgICAgIGxvYWRPbk9wZW5cclxuICAgICAgaW5maW5pdGVTY3JvbGxcclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XHJcbiAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxyXG4gICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQ7XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcclxuICBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCxcclxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VUaWNrZXRTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgeyBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IHJlc29sdmVFeHBlbnNlUXVpY2tEYXRlRmlsdGVyRnJvbVJhbmdlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VRdWlja0RhdGVGaWx0ZXJTdGF0ZS50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90LnRzXCI7XG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZUFyZ3MgPSB7XHJcbiAgb25BcHBseUZpbHRlcnM6IChzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4gdm9pZDtcclxuICBvbkNsZWFyRmlsdGVyczogKCkgPT4gdm9pZDtcclxuICBkZWZhdWx0TWFuYWdlZFVzZXJJZDogc3RyaW5nO1xyXG4gIGZpeGVkU3RhdHVzRmlsdGVyPzogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUgfCBudWxsO1xyXG4gIGFsbG93RW1wdHlEYXRlc09uQXBwbHk/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gT3ducyBmaWx0ZXIgVUkgc3RhdGUgYW5kIGFwcGx5L2NsZWFyIHJ1bGVzIGZvciBleHBlbnNlIHRpY2tldHMgbGlzdCBwYWdlLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGUgPSAoe1xyXG4gIG9uQXBwbHlGaWx0ZXJzLFxyXG4gIG9uQ2xlYXJGaWx0ZXJzLFxyXG4gIGRlZmF1bHRNYW5hZ2VkVXNlcklkLFxyXG4gIGZpeGVkU3RhdHVzRmlsdGVyID0gbnVsbCxcclxuICBhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5ID0gZmFsc2UsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlQXJncykgPT4ge1xyXG4gIGNvbnN0IGhhc0ZpeGVkU3RhdHVzRmlsdGVyID0gZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDAgfHwgZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDE7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVTdGF0dXNGaWx0ZXIgPSB1c2VDYWxsYmFjayhcclxuICAgICh2YWx1ZTogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpOiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSA9PiB7XHJcbiAgICAgIGlmIChoYXNGaXhlZFN0YXR1c0ZpbHRlcikge1xyXG4gICAgICAgIHJldHVybiBmaXhlZFN0YXR1c0ZpbHRlciBhcyBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9LFxyXG4gICAgW2ZpeGVkU3RhdHVzRmlsdGVyLCBoYXNGaXhlZFN0YXR1c0ZpbHRlcl1cclxuICApO1xyXG5cclxuICBjb25zdCBbZnJvbURhdGUsIHNldEZyb21EYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFt0b0RhdGUsIHNldFRvRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZmlsdGVyS2V5LCBzZXRGaWx0ZXJLZXldID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2N1cnJlbmN5Q29kZSwgc2V0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFttYW5hZ2VkVXNlcklkLCBzZXRNYW5hZ2VkVXNlcklkXSA9IHVzZVN0YXRlKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcclxuICBjb25zdCBbc3RhdHVzRmlsdGVyUmF3LCBzZXRTdGF0dXNGaWx0ZXJSYXddID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGU+KHJlc29sdmVTdGF0dXNGaWx0ZXIoXCJcIikpO1xyXG4gIGNvbnN0IFtnYXN0b1R5cGVGaWx0ZXIsIHNldEdhc3RvVHlwZUZpbHRlcl0gPSB1c2VTdGF0ZTxcIlwiIHwgRXhwZW5zZUdhc3RvVHlwZUNvZGU+KFwiXCIpO1xyXG4gIGNvbnN0IFtwcm9jZXNzZWRCeUlhRmlsdGVyLCBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyXSA9IHVzZVN0YXRlPFwiYWxsXCIgfCBcInllc1wiIHwgXCJub1wiPihcImFsbFwiKTtcclxuICBjb25zdCBbYWN0aXZlUXVpY2tGaWx0ZXIsIHNldEFjdGl2ZVF1aWNrRmlsdGVyXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW3Nob3dNYW51YWxEYXRlRmlsdGVyLCBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3Nob3dNYW51YWxEYXRlRXJyb3IsIHNldFNob3dNYW51YWxEYXRlRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttYW51YWxEYXRlQXV0b09wZW5LZXksIHNldE1hbnVhbERhdGVBdXRvT3BlbktleV0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbYXBwbGllZEZpbHRlcnMsIHNldEFwcGxpZWRGaWx0ZXJzXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbc2hvd0ZpbHRlcnMsIHNldFNob3dGaWx0ZXJzXSA9IHVzZVN0YXRlKHRydWUpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFoYXNGaXhlZFN0YXR1c0ZpbHRlcikgcmV0dXJuO1xyXG4gICAgc2V0U3RhdHVzRmlsdGVyUmF3KGZpeGVkU3RhdHVzRmlsdGVyIGFzIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlKTtcclxuICB9LCBbZml4ZWRTdGF0dXNGaWx0ZXIsIGhhc0ZpeGVkU3RhdHVzRmlsdGVyXSk7XHJcblxyXG4gIGNvbnN0IHN0YXR1c0ZpbHRlciA9IHJlc29sdmVTdGF0dXNGaWx0ZXIoc3RhdHVzRmlsdGVyUmF3KTtcclxuXHJcbiAgY29uc3QgY3VycmVudEZpbHRlcnMgPSB1c2VNZW1vPEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3Q+KFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgZnJvbURhdGUsXHJcbiAgICAgIHRvRGF0ZSxcclxuICAgICAgZmlsdGVyS2V5OiBmaWx0ZXJLZXkudHJpbSgpLFxyXG4gICAgICBjdXJyZW5jeUNvZGU6IGN1cnJlbmN5Q29kZS50cmltKCksXHJcbiAgICAgIG1hbmFnZWRVc2VySWQ6IG1hbmFnZWRVc2VySWQudHJpbSgpLFxyXG4gICAgICBzdGF0dXNGaWx0ZXIsXHJcbiAgICAgIGdhc3RvVHlwZUZpbHRlcixcclxuICAgICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICAgIH0pLFxyXG4gICAgW2N1cnJlbmN5Q29kZSwgZmlsdGVyS2V5LCBmcm9tRGF0ZSwgZ2FzdG9UeXBlRmlsdGVyLCBtYW5hZ2VkVXNlcklkLCBwcm9jZXNzZWRCeUlhRmlsdGVyLCBzdGF0dXNGaWx0ZXIsIHRvRGF0ZV1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRTdGF0dXNGaWx0ZXIgPSB1c2VDYWxsYmFjayhcclxuICAgICh2YWx1ZTogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpID0+IHtcclxuICAgICAgaWYgKGhhc0ZpeGVkU3RhdHVzRmlsdGVyKSB7XHJcbiAgICAgICAgc2V0U3RhdHVzRmlsdGVyUmF3KGZpeGVkU3RhdHVzRmlsdGVyIGFzIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgc2V0U3RhdHVzRmlsdGVyUmF3KHZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBbZml4ZWRTdGF0dXNGaWx0ZXIsIGhhc0ZpeGVkU3RhdHVzRmlsdGVyXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG9uQXBwbHkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWFsbG93RW1wdHlEYXRlc09uQXBwbHkgJiYgKCFmcm9tRGF0ZSB8fCAhdG9EYXRlKSkge1xyXG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKHRydWUpO1xyXG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcclxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9IHtcclxuICAgICAgZnJvbURhdGUsXHJcbiAgICAgIHRvRGF0ZSxcclxuICAgICAgZmlsdGVyS2V5OiBmaWx0ZXJLZXkudHJpbSgpLFxyXG4gICAgICBjdXJyZW5jeUNvZGU6IGN1cnJlbmN5Q29kZS50cmltKCksXHJcbiAgICAgIG1hbmFnZWRVc2VySWQ6IG1hbmFnZWRVc2VySWQudHJpbSgpLFxyXG4gICAgICBzdGF0dXNGaWx0ZXIsXHJcbiAgICAgIGdhc3RvVHlwZUZpbHRlcixcclxuICAgICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICAgIH07XHJcblxyXG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XHJcbiAgICBzZXRBcHBsaWVkRmlsdGVycyhzbmFwc2hvdCk7XHJcbiAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XHJcbiAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XHJcbiAgICBvbkFwcGx5RmlsdGVycyhzbmFwc2hvdCk7XHJcbiAgfSwgW1xyXG4gICAgYWxsb3dFbXB0eURhdGVzT25BcHBseSxcclxuICAgIGN1cnJlbmN5Q29kZSxcclxuICAgIGZpbHRlcktleSxcclxuICAgIGZyb21EYXRlLFxyXG4gICAgZ2FzdG9UeXBlRmlsdGVyLFxyXG4gICAgbWFuYWdlZFVzZXJJZCxcclxuICAgIG9uQXBwbHlGaWx0ZXJzLFxyXG4gICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICAgIHN0YXR1c0ZpbHRlcixcclxuICAgIHRvRGF0ZSxcclxuICBdKTtcclxuXHJcbiAgLy8gUmVoeWRyYXRlcyB0aWNrZXQgZmlsdGVycyBmcm9tIGEgY2FjaGVkIHNuYXBzaG90IHdoZW4gcmV0dXJuaW5nIGZyb20gZGV0YWlsLlxyXG4gIGNvbnN0IHJlc3RvcmVBcHBsaWVkRmlsdGVycyA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB7XG4gICAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90KHNuYXBzaG90KTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRTdGF0dXNGaWx0ZXIgPSByZXNvbHZlU3RhdHVzRmlsdGVyKG5vcm1hbGl6ZWQuc3RhdHVzRmlsdGVyKTtcbiAgICAgIGNvbnN0IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCA9IFN0cmluZyhub3JtYWxpemVkLm1hbmFnZWRVc2VySWQgfHwgZGVmYXVsdE1hbmFnZWRVc2VySWQpLnRyaW0oKTtcbiAgICAgIGNvbnN0IHJlc3RvcmVkUXVpY2tGaWx0ZXIgPSByZXNvbHZlRXhwZW5zZVF1aWNrRGF0ZUZpbHRlckZyb21SYW5nZShub3JtYWxpemVkLmZyb21EYXRlLCBub3JtYWxpemVkLnRvRGF0ZSk7XG4gICAgICBzZXRGcm9tRGF0ZShub3JtYWxpemVkLmZyb21EYXRlKTtcbiAgICAgIHNldFRvRGF0ZShub3JtYWxpemVkLnRvRGF0ZSk7XG4gICAgICBzZXRGaWx0ZXJLZXkobm9ybWFsaXplZC5maWx0ZXJLZXkpO1xuICAgICAgc2V0Q3VycmVuY3lDb2RlKG5vcm1hbGl6ZWQuY3VycmVuY3lDb2RlKTtcbiAgICAgIHNldE1hbmFnZWRVc2VySWQocmVzdG9yZWRNYW5hZ2VkVXNlcklkKTtcbiAgICAgIHNldFN0YXR1c0ZpbHRlclJhdyhub3JtYWxpemVkU3RhdHVzRmlsdGVyKTtcbiAgICAgIHNldEdhc3RvVHlwZUZpbHRlcihub3JtYWxpemVkLmdhc3RvVHlwZUZpbHRlcik7XG4gICAgICBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyKG5vcm1hbGl6ZWQucHJvY2Vzc2VkQnlJYUZpbHRlcik7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihyZXN0b3JlZFF1aWNrRmlsdGVyKTtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgICAgc2V0QXBwbGllZEZpbHRlcnMoe1xuICAgICAgICAuLi5ub3JtYWxpemVkLFxyXG4gICAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgICBzdGF0dXNGaWx0ZXI6IG5vcm1hbGl6ZWRTdGF0dXNGaWx0ZXIsXHJcbiAgICAgIH0pO1xyXG4gICAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgW2RlZmF1bHRNYW5hZ2VkVXNlcklkLCByZXNvbHZlU3RhdHVzRmlsdGVyXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG9uQ2xlYXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRGcm9tRGF0ZShcIlwiKTtcclxuICAgIHNldFRvRGF0ZShcIlwiKTtcclxuICAgIHNldEZpbHRlcktleShcIlwiKTtcclxuICAgIHNldEN1cnJlbmN5Q29kZShcIlwiKTtcclxuICAgIHNldE1hbmFnZWRVc2VySWQoZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xyXG4gICAgc2V0U3RhdHVzRmlsdGVyUmF3KHJlc29sdmVTdGF0dXNGaWx0ZXIoXCJcIikpO1xyXG4gICAgc2V0R2FzdG9UeXBlRmlsdGVyKFwiXCIpO1xyXG4gICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcihcImFsbFwiKTtcclxuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xyXG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xyXG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XHJcbiAgICBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXkoMCk7XHJcbiAgICBzZXRBcHBsaWVkRmlsdGVycyhudWxsKTtcclxuICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xyXG4gICAgb25DbGVhckZpbHRlcnMoKTtcclxuICB9LCBbZGVmYXVsdE1hbmFnZWRVc2VySWQsIG9uQ2xlYXJGaWx0ZXJzLCByZXNvbHZlU3RhdHVzRmlsdGVyXSk7XHJcblxyXG4gIGNvbnN0IG9uRGF0ZVJhbmdlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAobmV4dEZyb21EYXRlOiBzdHJpbmcsIG5leHRUb0RhdGU6IHN0cmluZykgPT4ge1xyXG4gICAgICBjb25zdCBoYXNGdWxsUmFuZ2UgPSAhIW5leHRGcm9tRGF0ZSAmJiAhIW5leHRUb0RhdGU7XHJcbiAgICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XHJcbiAgICAgIHNldFRvRGF0ZShuZXh0VG9EYXRlKTtcclxuICAgICAgaWYgKCFoYXNGdWxsUmFuZ2UpIHtcclxuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcclxuICAgICAgfVxyXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcclxuICAgICAgaWYgKHNob3dNYW51YWxEYXRlRXJyb3IpIHtcclxuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKCFoYXNGdWxsUmFuZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW3Nob3dNYW51YWxEYXRlRXJyb3JdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb25NYW51YWxSYW5nZUNvbXBsZXRlID0gdXNlQ2FsbGJhY2soKG5leHRGcm9tRGF0ZTogc3RyaW5nLCBuZXh0VG9EYXRlOiBzdHJpbmcpID0+IHtcclxuICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XHJcbiAgICBzZXRUb0RhdGUobmV4dFRvRGF0ZSk7XHJcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcclxuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xyXG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgb25RdWlja0ZpbHRlckNoYW5nZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGZpbHRlcklkOiBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCkgPT4ge1xyXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiY3VzdG9tXCIpIHtcclxuICAgICAgICBpZiAoc2hvd01hbnVhbERhdGVGaWx0ZXIpIHtcclxuICAgICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcclxuICAgICAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XHJcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIodHJ1ZSk7XHJcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XHJcbiAgICAgICAgc2V0TWFudWFsRGF0ZUF1dG9PcGVuS2V5KChwcmV2aW91cykgPT4gcHJldmlvdXMgKyAxKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKGZpbHRlcklkKTtcclxuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xyXG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcclxuXHJcbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcclxuICAgICAgY29uc3QgbmV4dEZyb20gPSBuZXcgRGF0ZSh0b2RheSk7XHJcbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJkYXlzLTdcIikge1xyXG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gNik7XHJcbiAgICAgIH0gZWxzZSBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy0zMFwiKSB7XHJcbiAgICAgICAgbmV4dEZyb20uc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAyOSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV4dEZyb20uc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA4OSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldEZyb21EYXRlKHRvSXNvRGF0ZShuZXh0RnJvbSkpO1xyXG4gICAgICBzZXRUb0RhdGUodG9Jc29EYXRlKHRvZGF5KSk7XHJcbiAgICB9LFxyXG4gICAgW3Nob3dNYW51YWxEYXRlRmlsdGVyXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHRvZ2dsZUZpbHRlclBhbmVsID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0U2hvd0ZpbHRlcnMoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5leHQgPSAhcHJldmlvdXM7XHJcbiAgICAgIGlmICghbmV4dCkge1xyXG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmV4dDtcclxuICAgIH0pO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGZyb21EYXRlLFxyXG4gICAgdG9EYXRlLFxyXG4gICAgZmlsdGVyS2V5LFxyXG4gICAgY3VycmVuY3lDb2RlLFxyXG4gICAgbWFuYWdlZFVzZXJJZCxcclxuICAgIHN0YXR1c0ZpbHRlcixcclxuICAgIGdhc3RvVHlwZUZpbHRlcixcclxuICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXHJcbiAgICBhY3RpdmVRdWlja0ZpbHRlcixcclxuICAgIHNob3dNYW51YWxEYXRlRmlsdGVyLFxyXG4gICAgc2hvd01hbnVhbERhdGVFcnJvcixcclxuICAgIG1hbnVhbERhdGVBdXRvT3BlbktleSxcclxuICAgIGFwcGxpZWRGaWx0ZXJzLFxyXG4gICAgc2hvd0ZpbHRlcnMsXHJcbiAgICBjdXJyZW50RmlsdGVycyxcclxuICAgIHNldEZpbHRlcktleSxcclxuICAgIHNldEN1cnJlbmN5Q29kZSxcclxuICAgIHNldE1hbmFnZWRVc2VySWQsXHJcbiAgICBzZXRTdGF0dXNGaWx0ZXIsXHJcbiAgICBzZXRHYXN0b1R5cGVGaWx0ZXIsXHJcbiAgICBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyLFxyXG4gICAgb25BcHBseSxcclxuICAgIG9uQ2xlYXIsXHJcbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMsXHJcbiAgICBvbkRhdGVSYW5nZUNoYW5nZSxcclxuICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZSxcclxuICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXHJcbiAgICB0b2dnbGVGaWx0ZXJQYW5lbCxcclxuICAgIHN0YXR1c0ZpbHRlckxvY2tlZDogaGFzRml4ZWRTdGF0dXNGaWx0ZXIsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0LCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgaXNFeHBlbnNlQWJvcnRMaWtlRXJyb3IsIHJ1bkV4cGVuc2VSZWFkUmVxdWVzdFdpdGhSZXRyeSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlUmVxdWVzdFJldHJ5LnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgYnVpbGRFeHBlbnNlVGlja2V0TGlua0xpc3RQYXlsb2FkLFxyXG4gIGJ1aWxkRXhwZW5zZVRpY2tldExpc3RQYXlsb2FkLFxyXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlUGF5bG9hZEJ1aWxkZXJzLnRzXCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxyXG4gIEV4cGVuc2VUaWNrZXRDYXJkLFxyXG4gIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCxcclxuICBFeHBlbnNlVGlja2V0TGlzdFBhZ2VJdGVtLFxyXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YUFyZ3MgPSB7XHJcbiAgaGFzQWNjZXNzOiBib29sZWFuO1xyXG4gIHBhZ2VTaXplOiBudW1iZXI7XHJcbiAgbW9kZTogXCJnZW5lcmFsXCIgfCBcImxpbmtcIjtcclxuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IEFMTE9XRURfR0FTVE9fVFlQRV9DT0RFUyA9IG5ldyBTZXQ8bnVtYmVyPihbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTRdKTtcclxuY29uc3QgRVhQRU5TRV9USUNLRVRTX0xJU1RfTE9HX1BSRUZJWCA9IFwiW2V4cGVuc2UtdGlja2V0czpsaXN0XVwiO1xyXG5cclxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUuaW5mbyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLmluZm8oRVhQRU5TRV9USUNLRVRTX0xJU1RfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybiA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUud2FybiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLndhcm4oRVhQRU5TRV9USUNLRVRTX0xJU1RfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNMaXN0RXJyb3IgPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoRVhQRU5TRV9USUNLRVRTX0xJU1RfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0c0RlYnVnU3RhY2sgPSAobGFiZWw6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHR5cGVvZiBFcnJvciAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gXCJcIjtcclxuICBjb25zdCByYXdTdGFjayA9IG5ldyBFcnJvcihsYWJlbCkuc3RhY2s7XHJcbiAgaWYgKHR5cGVvZiByYXdTdGFjayAhPT0gXCJzdHJpbmdcIiB8fCAhcmF3U3RhY2sudHJpbSgpKSByZXR1cm4gXCJcIjtcclxuICByZXR1cm4gcmF3U3RhY2tcclxuICAgIC5zcGxpdChcIlxcblwiKVxyXG4gICAgLnNsaWNlKDAsIDYpXHJcbiAgICAuam9pbihcIlxcblwiKTtcclxufTtcclxuXHJcbmNvbnN0IHRvTnVsbGFibGVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCB0b051bGxhYmxlQm9vbCA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gfCBudWxsID0+IHtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikgcmV0dXJuIHZhbHVlO1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHJldHVybiB2YWx1ZSA9PT0gMSA/IHRydWUgOiB2YWx1ZSA9PT0gMCA/IGZhbHNlIDogbnVsbDtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBjb25zdCBub3JtYWxpemVkID0gdmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAobm9ybWFsaXplZCA9PT0gXCJ0cnVlXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIxXCIpIHJldHVybiB0cnVlO1xyXG4gICAgaWYgKG5vcm1hbGl6ZWQgPT09IFwiZmFsc2VcIiB8fCBub3JtYWxpemVkID09PSBcIjBcIikgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IHRvTnVsbGFibGVUaWNrZXRTdGF0dXMgPSAodmFsdWU6IHVua25vd24pOiAwIHwgMSB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIHBhcnNlZCA9PT0gMCB8fCBwYXJzZWQgPT09IDEgPyBwYXJzZWQgOiBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgdG9OdWxsYWJsZVRpY2tldEdhc3RvVHlwZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VHYXN0b1R5cGVDb2RlIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICBpZiAoIU51bWJlci5pc0ludGVnZXIocGFyc2VkKSB8fCAhQUxMT1dFRF9HQVNUT19UWVBFX0NPREVTLmhhcyhwYXJzZWQpKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiBwYXJzZWQgYXMgRXhwZW5zZUdhc3RvVHlwZUNvZGU7XHJcbn07XHJcblxyXG5jb25zdCBtYXBUaWNrZXRJdGVtVG9DYXJkID0gKGl0ZW06IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogRXhwZW5zZVRpY2tldENhcmQgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBraW5kOiBcImdlbmVyYWxcIixcclxuICAgIGZpbGVJZDogU3RyaW5nKGl0ZW0/LkZpbGVJZCB8fCBcIlwiKS50cmltKCksXHJcbiAgICBkZXNjcmlwdGlvbjogU3RyaW5nKGl0ZW0/LkRlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgIHN0YXR1czogdG9OdWxsYWJsZVRpY2tldFN0YXR1cyhpdGVtPy5TdGF0dXMpLFxyXG4gICAgcHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woaXRlbT8uUHJvY2Vzc2VkQnlBSSksXHJcbiAgICBjdXJyZW5jeUNvZGU6IFN0cmluZyhpdGVtPy5DdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgdG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbT8uVG90YWxBbW91bnQpLFxyXG4gICAgdHJhbnNEYXRlOiBTdHJpbmcoaXRlbT8uVHJhbnNEYXRlIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgIGZpbGVOYW1lOiBTdHJpbmcoaXRlbT8uRmlsZU5hbWUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgZ2FzdG9UeXBlOiB0b051bGxhYmxlVGlja2V0R2FzdG9UeXBlKGl0ZW0/Lkdhc3RvVHlwZSA/PyBpdGVtPy5nYXN0b1R5cGUpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBtYXBUaWNrZXRMaW5rSXRlbVRvQ2FyZCA9IChpdGVtOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGtpbmQ6IFwibGlua1wiLFxyXG4gICAgZmlsZUlkOiBTdHJpbmcoaXRlbT8uRmlsZUlkIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoaXRlbT8uRGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpLFxyXG4gICAgcHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woaXRlbT8uUHJvY2Vzc2VkQnlBSSksXHJcbiAgICBjdXJyZW5jeUNvZGU6IFN0cmluZyhpdGVtPy5DdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgdG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbT8uVG90YWxBbW91bnQpLFxyXG4gICAgdHJhbnNEYXRlOiBTdHJpbmcoaXRlbT8uVHJhbnNEYXRlIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgIGZpbGVOYW1lOiBTdHJpbmcoaXRlbT8uRmlsZU5hbWUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgZ2FzdG9UeXBlOiB0b051bGxhYmxlVGlja2V0R2FzdG9UeXBlKGl0ZW0/Lkdhc3RvVHlwZSA/PyBpdGVtPy5nYXN0b1R5cGUpLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBPd25zIGxpc3QgZGF0YSBmZXRjaCwgbG9hZGluZyBzdGF0ZSwgYW5kIHBhZ2luYXRpb24gbWV0YWRhdGEgZm9yIHRpY2tldHMuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0c0xpc3REYXRhID0gKHsgaGFzQWNjZXNzLCBwYWdlU2l6ZSwgbW9kZSwgb25Gb3JiaWRkZW4gfTogVXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YUFyZ3MpID0+IHtcclxuICBjb25zdCBbaXRlbXMsIHNldEl0ZW1zXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW1bXT4oW10pO1xyXG4gIGNvbnN0IFt0b3RhbCwgc2V0VG90YWxdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW2N1cnJlbnRQYWdlLCBzZXRDdXJyZW50UGFnZV0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZiA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBhY3RpdmVSZXF1ZXN0S2V5UmVmID0gdXNlUmVmKFwiXCIpO1xyXG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RTZXFSZWYgPSB1c2VSZWYoMCk7XHJcblxyXG4gIGNvbnN0IHJlc3RvcmVMaXN0U25hcHNob3QgPSB1c2VDYWxsYmFjayhcclxuICAgIChzbmFwc2hvdDogeyBpdGVtczogRXhwZW5zZVRpY2tldExpc3RQYWdlSXRlbVtdOyB0b3RhbDogbnVtYmVyOyBwYWdlOiBudW1iZXIgfSkgPT4ge1xyXG4gICAgICBjb25zdCBzYWZlSXRlbXMgPSBBcnJheS5pc0FycmF5KHNuYXBzaG90Lml0ZW1zKSA/IHNuYXBzaG90Lml0ZW1zIDogW107XHJcbiAgICAgIGNvbnN0IHNhZmVUb3RhbFJhdyA9IE51bWJlcihzbmFwc2hvdC50b3RhbCk7XHJcbiAgICAgIGNvbnN0IHNhZmVUb3RhbCA9IE51bWJlci5pc0Zpbml0ZShzYWZlVG90YWxSYXcpICYmIHNhZmVUb3RhbFJhdyA+PSAwID8gc2FmZVRvdGFsUmF3IDogc2FmZUl0ZW1zLmxlbmd0aDtcclxuICAgICAgY29uc3Qgc2FmZVBhZ2VSYXcgPSBOdW1iZXIoc25hcHNob3QucGFnZSk7XHJcbiAgICAgIGNvbnN0IHNhZmVQYWdlID0gTnVtYmVyLmlzRmluaXRlKHNhZmVQYWdlUmF3KSAmJiBzYWZlUGFnZVJhdyA+IDAgPyBNYXRoLmZsb29yKHNhZmVQYWdlUmF3KSA6IDE7XHJcblxyXG4gICAgICBzZXRJdGVtcyhzYWZlSXRlbXMpO1xyXG4gICAgICBzZXRUb3RhbChzYWZlVG90YWwpO1xyXG4gICAgICBzZXRDdXJyZW50UGFnZShzYWZlUGFnZSk7XHJcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGxvYWRMaXN0ID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAocGFnZTogbnVtYmVyLCBmaWx0ZXJzOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8oXCJsb2FkTGlzdDpyZXF1ZXN0ZWRcIiwge1xyXG4gICAgICAgIHBhZ2UsXHJcbiAgICAgICAgbW9kZSxcclxuICAgICAgICBoYXNBY2Nlc3MsXHJcbiAgICAgICAgZmlsdGVycyxcclxuICAgICAgfSk7XHJcbiAgICAgIGlmICghaGFzQWNjZXNzKSB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImxvYWRMaXN0OmJsb2NrZWQtbm8tYWNjZXNzXCIsIHtcclxuICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICBtb2RlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwYXlsb2FkID1cclxuICAgICAgICBtb2RlID09PSBcImxpbmtcIlxyXG4gICAgICAgICAgPyBidWlsZEV4cGVuc2VUaWNrZXRMaW5rTGlzdFBheWxvYWQoZmlsdGVycywgcGFnZSwgcGFnZVNpemUpXHJcbiAgICAgICAgICA6IGJ1aWxkRXhwZW5zZVRpY2tldExpc3RQYXlsb2FkKGZpbHRlcnMsIHBhZ2UsIHBhZ2VTaXplKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZE1hbmFnZWRVc2VySWQgPSBTdHJpbmcoZmlsdGVycz8ubWFuYWdlZFVzZXJJZCB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxuICAgICAgY29uc3QgcmVxdWVzdEtleSA9IEpTT04uc3RyaW5naWZ5KHsgbW9kZSwgcGF5bG9hZCwgbWFuYWdlZFVzZXJJZDogbm9ybWFsaXplZE1hbmFnZWRVc2VySWQgfSk7XHJcblxyXG4gICAgICBpZiAoYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCAmJiBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPT09IHJlcXVlc3RLZXkpIHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwibG9hZExpc3Q6c2tpcC1kdXBsaWNhdGUtcmVxdWVzdFwiLCB7XHJcbiAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgbW9kZSxcclxuICAgICAgICAgIHJlcXVlc3RLZXksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCkge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8oXCJsb2FkTGlzdDphYm9ydC1wcmV2aW91cy1yZXF1ZXN0XCIsIHtcclxuICAgICAgICAgIHByZXZpb3VzUmVxdWVzdEtleTogYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50LFxyXG4gICAgICAgICAgcHJldmlvdXNSZXF1ZXN0U2VxOiBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQsXHJcbiAgICAgICAgICBzdGFjazogYnVpbGRFeHBlbnNlVGlja2V0c0RlYnVnU3RhY2soXCJsb2FkTGlzdDphYm9ydC1wcmV2aW91cy1yZXF1ZXN0XCIpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQuYWJvcnQoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XHJcbiAgICAgIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9IHJlcXVlc3RLZXk7XHJcbiAgICAgIGNvbnN0IHJlcXVlc3RTZXEgPSBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQgKyAxO1xyXG4gICAgICBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQgPSByZXF1ZXN0U2VxO1xyXG4gICAgICBjb25zdCBoYW5kbGVBYm9ydFNpZ25hbCA9ICgpID0+IHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwibG9hZExpc3Q6c2lnbmFsLWFib3J0LWV2ZW50XCIsIHtcclxuICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICBtb2RlLFxyXG4gICAgICAgICAgcmVxdWVzdFNlcSxcclxuICAgICAgICAgIHJlcXVlc3RLZXksXHJcbiAgICAgICAgICBzaWduYWxBYm9ydGVkOiBjb250cm9sbGVyLnNpZ25hbC5hYm9ydGVkLFxyXG4gICAgICAgICAgc2lnbmFsUmVhc29uOlxyXG4gICAgICAgICAgICBcInJlYXNvblwiIGluIGNvbnRyb2xsZXIuc2lnbmFsXHJcbiAgICAgICAgICAgICAgPyAoKGNvbnRyb2xsZXIuc2lnbmFsIGFzIEFib3J0U2lnbmFsICYgeyByZWFzb24/OiB1bmtub3duIH0pLnJlYXNvbiA/PyBudWxsKVxyXG4gICAgICAgICAgICAgIDogbnVsbCxcclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuICAgICAgY29udHJvbGxlci5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0U2lnbmFsLCB7IG9uY2U6IHRydWUgfSk7XHJcblxyXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyhcImxvYWRMaXN0OmZldGNoLXN0YXJ0XCIsIHtcclxuICAgICAgICBwYWdlLFxyXG4gICAgICAgIG1vZGUsXHJcbiAgICAgICAgbm9ybWFsaXplZE1hbmFnZWRVc2VySWQsXHJcbiAgICAgICAgcGF5bG9hZCxcclxuICAgICAgICByZXF1ZXN0S2V5LFxyXG4gICAgICAgIHJlcXVlc3RTZXEsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJ1bkV4cGVuc2VSZWFkUmVxdWVzdFdpdGhSZXRyeShcclxuICAgICAgICAgICgpID0+XHJcbiAgICAgICAgICAgIG1vZGUgPT09IFwibGlua1wiXHJcbiAgICAgICAgICAgICAgPyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0KHBheWxvYWQsIHtcclxuICAgICAgICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgICAgICAgICAgICAgIGF4VXNlcklkT3ZlcnJpZGU6IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgOiBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0KHBheWxvYWQsIHtcclxuICAgICAgICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgICAgICAgICAgICAgIGF4VXNlcklkT3ZlcnJpZGU6IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyhcImxvYWRMaXN0OmZldGNoLWZpbmlzaGVkXCIsIHtcclxuICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICBtb2RlLFxyXG4gICAgICAgICAgcmVxdWVzdFNlcSxcclxuICAgICAgICAgIHN1Y2Nlc3M6IHJlc3BvbnNlPy5TdWNjZXNzLFxyXG4gICAgICAgICAgdG90YWw6IHJlc3BvbnNlPy5Ub3RhbCxcclxuICAgICAgICAgIGl0ZW1zOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcy5sZW5ndGggOiAwLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChyZXF1ZXN0U2VxICE9PSBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImxvYWRMaXN0OmFwaS11bnN1Y2Nlc3NmdWxcIiwge1xyXG4gICAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgICBtb2RlLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5NZXNzYWdlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiVGlja2V0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXRzLlwiKSk7XHJcbiAgICAgICAgICBzZXRJdGVtcyhbXSk7XHJcbiAgICAgICAgICBzZXRUb3RhbCgwKTtcclxuICAgICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc291cmNlSXRlbXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xyXG4gICAgICAgIGNvbnN0IG1hcHBlZEl0ZW1zID0gc291cmNlSXRlbXMubWFwKChpdGVtKSA9PlxyXG4gICAgICAgICAgbW9kZSA9PT0gXCJsaW5rXCJcclxuICAgICAgICAgICAgPyBtYXBUaWNrZXRMaW5rSXRlbVRvQ2FyZChpdGVtIGFzIHVua25vd24gYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pXHJcbiAgICAgICAgICAgIDogbWFwVGlja2V0SXRlbVRvQ2FyZChpdGVtIGFzIHVua25vd24gYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCByZXNwb25zZVRvdGFsID0gTnVtYmVyKHJlc3BvbnNlPy5Ub3RhbCA/PyBtYXBwZWRJdGVtcy5sZW5ndGggPz8gMCk7XHJcblxyXG4gICAgICAgIHNldEl0ZW1zKG1hcHBlZEl0ZW1zKTtcclxuICAgICAgICBzZXRUb3RhbChyZXNwb25zZVRvdGFsKTtcclxuICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAocmVxdWVzdFNlcSAhPT0gYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICAgICAgaWYgKGlzRXhwZW5zZUFib3J0TGlrZUVycm9yKGVycm9yLCBjb250cm9sbGVyLnNpZ25hbCkpIHtcclxuICAgICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJsb2FkTGlzdDphYm9ydGVkXCIsIHtcclxuICAgICAgICAgICAgcGFnZSxcclxuICAgICAgICAgICAgbW9kZSxcclxuICAgICAgICAgICAgcmVxdWVzdFNlcSxcclxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvcixcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImxvYWRMaXN0OmZvcmJpZGRlblwiLCB7XHJcbiAgICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICAgIG1vZGUsXHJcbiAgICAgICAgICAgIHJlcXVlc3RTZXEsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RFcnJvcihcImxvYWRMaXN0OmZhaWxlZFwiLCB7XHJcbiAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgbW9kZSxcclxuICAgICAgICAgIHJlcXVlc3RTZXEsXHJcbiAgICAgICAgICBtZXNzYWdlOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGVycm9yLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJUaWNrZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldHMuXCIpO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShtZXNzYWdlKTtcclxuICAgICAgICBzZXRJdGVtcyhbXSk7XHJcbiAgICAgICAgc2V0VG90YWwoMCk7XHJcbiAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgY29udHJvbGxlci5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0U2lnbmFsKTtcclxuICAgICAgICBpZiAocmVxdWVzdFNlcSA9PT0gYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RJbmZvKFwibG9hZExpc3Q6ZmluYWxpemVcIiwge1xyXG4gICAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgICBtb2RlLFxyXG4gICAgICAgICAgICByZXF1ZXN0U2VxLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgICBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtoYXNBY2Nlc3MsIG1vZGUsIG9uRm9yYmlkZGVuLCBwYWdlU2l6ZV1cclxuICApO1xyXG5cclxuICBjb25zdCByZXNldExpc3QgPSB1c2VDYWxsYmFjaygoc291cmNlID0gXCJ1bmtub3duXCIpID0+IHtcclxuICAgIGlmIChhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJyZXNldExpc3Q6YWJvcnQtYWN0aXZlLXJlcXVlc3RcIiwge1xyXG4gICAgICAgIHNvdXJjZSxcclxuICAgICAgICBhY3RpdmVSZXF1ZXN0S2V5OiBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQsXHJcbiAgICAgICAgYWN0aXZlUmVxdWVzdFNlcTogYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50LFxyXG4gICAgICAgIHN0YWNrOiBidWlsZEV4cGVuc2VUaWNrZXRzRGVidWdTdGFjayhgcmVzZXRMaXN0OiR7c291cmNlfWApLFxyXG4gICAgICB9KTtcclxuICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudC5hYm9ydCgpO1xyXG4gICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID0gXCJcIjtcclxuICAgIH1cclxuICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8oXCJyZXNldExpc3Q6Y2xlYXItc3RhdGVcIiwge1xyXG4gICAgICBzb3VyY2UsXHJcbiAgICB9KTtcclxuICAgIHNldEl0ZW1zKFtdKTtcclxuICAgIHNldFRvdGFsKDApO1xyXG4gICAgc2V0Q3VycmVudFBhZ2UoMSk7XHJcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjbGVhckxpc3RDYWNoZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIC8vIFRpY2tldCBsaXN0IGF1dG8tbG9hZCBtdXN0IGFsd2F5cyBoaXQgdGhlIGxpdmUgZW5kcG9pbnQuXHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaWYgKGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwiY2xlYW51cDphYm9ydC1hY3RpdmUtcmVxdWVzdFwiLCB7XHJcbiAgICAgICAgICBhY3RpdmVSZXF1ZXN0S2V5OiBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQsXHJcbiAgICAgICAgICBhY3RpdmVSZXF1ZXN0U2VxOiBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQsXHJcbiAgICAgICAgICBzdGFjazogYnVpbGRFeHBlbnNlVGlja2V0c0RlYnVnU3RhY2soXCJjbGVhbnVwOmFib3J0LWFjdGl2ZS1yZXF1ZXN0XCIpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQuYWJvcnQoKTtcclxuICAgICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGl0ZW1zLFxyXG4gICAgdG90YWwsXHJcbiAgICBjdXJyZW50UGFnZSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGxvYWRMaXN0LFxyXG4gICAgcmVzdG9yZUxpc3RTbmFwc2hvdCxcclxuICAgIHJlc2V0TGlzdCxcclxuICAgIGNsZWFyTGlzdENhY2hlLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyBub3JtYWxpemVFeHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QudHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXHJcbiAgRXhwZW5zZVRpY2tldExpbmtDYXJkLFxyXG4gIEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZSxcclxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeSwgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZVNjb3BlVG9rZW4gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNjb3BlLnRzXCI7XHJcblxyXG5jb25zdCBFWFBFTlNFX1RJQ0tFVF9MSU5LX1JFVFVSTl9TVEFURV9LRVlfUFJFRklYID0gXCJleHBlbnNlX3RpY2tldF9saW5rX3JldHVybl9zdGF0ZV92MVwiO1xyXG5jb25zdCBFWFBFTlNFX1RJQ0tFVF9MSU5LX1JFVFVSTl9TVEFURV9UVExfTVMgPSAxMiAqIDYwICogNjAgKiAxMDAwO1xyXG5jb25zdCBBTExPV0VEX1RJQ0tFVF9HQVNUT19UWVBFUyA9IG5ldyBTZXQ8bnVtYmVyPihbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTRdKTtcclxuXHJcbmV4cG9ydCB0eXBlIEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgPSB7XHJcbiAgc2hlZXRJZDogc3RyaW5nO1xyXG4gIHBhZ2U6IG51bWJlcjtcclxuICBzY3JvbGxZOiBudW1iZXI7XHJcbiAgZm9jdXNGaWxlSWQ6IHN0cmluZztcclxuICBmaWx0ZXJzOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90O1xyXG4gIHNlbGVjdGlvbk1vZGU6IEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZTtcclxuICBzZWxlY3RlZFRpY2tldHM6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtdO1xyXG4gIGV4Y2x1ZGVkSWRzOiBzdHJpbmdbXTtcclxuICBmaWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnM6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfCBudWxsO1xyXG4gIGZpbHRlcmVkU2VsZWN0aW9uVG90YWw6IG51bWJlcjtcclxufTtcclxuXHJcbmNvbnN0IGdldFNjb3BlZEtleSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBgJHtFWFBFTlNFX1RJQ0tFVF9MSU5LX1JFVFVSTl9TVEFURV9LRVlfUFJFRklYfV8ke2dldEV4cGVuc2VTY29wZVRva2VuKCl9YDtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUZpbGVJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVQcm9jZXNzZWRCeUFpID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB8IG51bGwgPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gZmFsc2UpIHJldHVybiB2YWx1ZTtcclxuICBpZiAodmFsdWUgPT09IDEgfHwgdmFsdWUgPT09IFwiMVwiIHx8IHZhbHVlID09PSBcInRydWVcIikgcmV0dXJuIHRydWU7XHJcbiAgaWYgKHZhbHVlID09PSAwIHx8IHZhbHVlID09PSBcIjBcIiB8fCB2YWx1ZSA9PT0gXCJmYWxzZVwiKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVOdWxsYWJsZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldEdhc3RvVHlwZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtcImdhc3RvVHlwZVwiXSA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICBpZiAoIU51bWJlci5pc0ludGVnZXIocGFyc2VkKSB8fCAhQUxMT1dFRF9USUNLRVRfR0FTVE9fVFlQRVMuaGFzKHBhcnNlZCkpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICByZXR1cm4gcGFyc2VkIGFzIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtcImdhc3RvVHlwZVwiXTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVNlbGVjdGlvbk1vZGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGUgPT4ge1xyXG4gIHJldHVybiB2YWx1ZSA9PT0gXCJmaWx0ZXJlZFwiID8gXCJmaWx0ZXJlZFwiIDogXCJzZWxlY3RlZFwiO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplU2VsZWN0ZWRUaWNrZXRzID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZVRpY2tldExpbmtDYXJkW10gPT4ge1xyXG4gIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiBbXTtcclxuXHJcbiAgY29uc3QgaXRlbXMgPSBuZXcgTWFwPHN0cmluZywgRXhwZW5zZVRpY2tldExpbmtDYXJkPigpO1xyXG4gIGZvciAoY29uc3QgZW50cnkgb2YgdmFsdWUpIHtcclxuICAgIGNvbnN0IGl0ZW0gPSAoZW50cnkgfHwge30pIGFzIFBhcnRpYWw8RXhwZW5zZVRpY2tldExpbmtDYXJkPjtcclxuICAgIGNvbnN0IGZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZChpdGVtLmZpbGVJZCk7XHJcbiAgICBpZiAoIWZpbGVJZCkgY29udGludWU7XHJcblxyXG4gICAgaXRlbXMuc2V0KGZpbGVJZCwge1xyXG4gICAgICBraW5kOiBcImxpbmtcIixcclxuICAgICAgZmlsZUlkLFxyXG4gICAgICBkZXNjcmlwdGlvbjogU3RyaW5nKGl0ZW0uZGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpLFxyXG4gICAgICBwcm9jZXNzZWRCeUFJOiBub3JtYWxpemVQcm9jZXNzZWRCeUFpKGl0ZW0ucHJvY2Vzc2VkQnlBSSksXHJcbiAgICAgIGN1cnJlbmN5Q29kZTogU3RyaW5nKGl0ZW0uY3VycmVuY3lDb2RlIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgICAgdG90YWxBbW91bnQ6IG5vcm1hbGl6ZU51bGxhYmxlTnVtYmVyKGl0ZW0udG90YWxBbW91bnQpLFxyXG4gICAgICB0cmFuc0RhdGU6IFN0cmluZyhpdGVtLnRyYW5zRGF0ZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICAgIGZpbGVOYW1lOiBTdHJpbmcoaXRlbS5maWxlTmFtZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICAgIGdhc3RvVHlwZTogbm9ybWFsaXplVGlja2V0R2FzdG9UeXBlKGl0ZW0uZ2FzdG9UeXBlKSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIEFycmF5LmZyb20oaXRlbXMudmFsdWVzKCkpO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplRXhjbHVkZWRJZHMgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmdbXSA9PiB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIFtdO1xyXG5cclxuICBjb25zdCBpZHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcclxuICBmb3IgKGNvbnN0IGVudHJ5IG9mIHZhbHVlKSB7XHJcbiAgICBjb25zdCBmaWxlSWQgPSBub3JtYWxpemVGaWxlSWQoZW50cnkpO1xyXG4gICAgaWYgKCFmaWxlSWQpIGNvbnRpbnVlO1xyXG4gICAgaWRzLmFkZChmaWxlSWQpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIEFycmF5LmZyb20oaWRzKTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZU5vbk5lZ2F0aXZlSW50ZWdlciA9ICh2YWx1ZTogdW5rbm93biwgZmFsbGJhY2sgPSAwKTogbnVtYmVyID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSAmJiBwYXJzZWQgPj0gMCA/IE1hdGguZmxvb3IocGFyc2VkKSA6IGZhbGxiYWNrO1xyXG59O1xyXG5cclxuLy8gTm9ybWFsaXplcyB0aGUgbGluay1tb2RlIHRpY2tldCByZXR1cm4gc3RhdGUgc28gYmFjayBuYXZpZ2F0aW9uIGNhbiByZXN0b3JlIGZpbHRlcnMgYW5kIHNlbGVjdGlvbiBzYWZlbHkuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSB8IG51bGwgPT4ge1xyXG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgcGF5bG9hZCA9IHZhbHVlIGFzIFBhcnRpYWw8RXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZT47XHJcbiAgY29uc3Qgc2hlZXRJZCA9IFN0cmluZyhwYXlsb2FkLnNoZWV0SWQgfHwgXCJcIikudHJpbSgpO1xyXG4gIGlmICghc2hlZXRJZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzaGVldElkLFxyXG4gICAgcGFnZTogTWF0aC5tYXgoMSwgbm9ybWFsaXplTm9uTmVnYXRpdmVJbnRlZ2VyKHBheWxvYWQucGFnZSwgMSkpLFxyXG4gICAgc2Nyb2xsWTogbm9ybWFsaXplTm9uTmVnYXRpdmVJbnRlZ2VyKHBheWxvYWQuc2Nyb2xsWSksXHJcbiAgICBmb2N1c0ZpbGVJZDogbm9ybWFsaXplRmlsZUlkKHBheWxvYWQuZm9jdXNGaWxlSWQpLFxyXG4gICAgZmlsdGVyczogbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90KHBheWxvYWQuZmlsdGVycyksXHJcbiAgICBzZWxlY3Rpb25Nb2RlOiBub3JtYWxpemVTZWxlY3Rpb25Nb2RlKHBheWxvYWQuc2VsZWN0aW9uTW9kZSksXHJcbiAgICBzZWxlY3RlZFRpY2tldHM6IG5vcm1hbGl6ZVNlbGVjdGVkVGlja2V0cyhwYXlsb2FkLnNlbGVjdGVkVGlja2V0cyksXHJcbiAgICBleGNsdWRlZElkczogbm9ybWFsaXplRXhjbHVkZWRJZHMocGF5bG9hZC5leGNsdWRlZElkcyksXHJcbiAgICBmaWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnM6IHBheWxvYWQuZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzXHJcbiAgICAgID8gbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90KHBheWxvYWQuZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzKVxyXG4gICAgICA6IG51bGwsXHJcbiAgICBmaWx0ZXJlZFNlbGVjdGlvblRvdGFsOiBub3JtYWxpemVOb25OZWdhdGl2ZUludGVnZXIocGF5bG9hZC5maWx0ZXJlZFNlbGVjdGlvblRvdGFsKSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gUmVhZHMgYSBzdG9yZWQgbGluay1tb2RlIHJldHVybiBzdGF0ZSB3aGVuIGl0IHN0aWxsIG1hdGNoZXMgdGhlIGFjdGl2ZSBleHBlbnNlIHNoZWV0LlxyXG5leHBvcnQgY29uc3QgcmVhZEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgPSAoc2hlZXRJZD86IHVua25vd24pOiBFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlIHwgbnVsbCA9PiB7XHJcbiAgY29uc3Qgc3RvcmVkID0gbm9ybWFsaXplRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZShcclxuICAgIGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeTxFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlPihnZXRTY29wZWRLZXkoKSlcclxuICApO1xyXG4gIGlmICghc3RvcmVkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBTdHJpbmcoc2hlZXRJZCB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCFzYWZlU2hlZXRJZCkgcmV0dXJuIHN0b3JlZDtcclxuICByZXR1cm4gc3RvcmVkLnNoZWV0SWQudG9VcHBlckNhc2UoKSA9PT0gc2FmZVNoZWV0SWQudG9VcHBlckNhc2UoKSA/IHN0b3JlZCA6IG51bGw7XHJcbn07XHJcblxyXG4vLyBQZXJzaXN0cyB0aGUgbWluaW11bSBsaW5rLW1vZGUgc3RhdGUgcmVxdWlyZWQgdG8gcmV0dXJuIGZyb20gdGlja2V0IGRldGFpbCB3aXRob3V0IGxvc2luZyBzZWxlY3Rpb24uXHJcbmV4cG9ydCBjb25zdCBzYXZlRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSA9IChcclxuICB2YWx1ZTogRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSB8IG51bGwgfCB1bmRlZmluZWRcclxuKTogRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKHZhbHVlKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHtcclxuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkoZ2V0U2NvcGVkS2V5KCksIG5vcm1hbGl6ZWQsIEVYUEVOU0VfVElDS0VUX0xJTktfUkVUVVJOX1NUQVRFX1RUTF9NUyk7XHJcbiAgcmV0dXJuIG5vcm1hbGl6ZWQ7XHJcbn07XHJcblxyXG4vLyBDbGVhcnMgYW55IHN0b3JlZCBsaW5rLW1vZGUgcmV0dXJuIHN0YXRlIGZvciB0aGUgY3VycmVudCBleHBlbnNlIHNjb3BlLlxyXG5leHBvcnQgY29uc3QgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlID0gKCk6IHZvaWQgPT4ge1xyXG4gIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoZ2V0U2NvcGVkS2V5KCkpO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxyXG4gIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCxcclxuICBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGUsXHJcbn0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25TdGF0ZSA9IHtcclxuICBzZWxlY3Rpb25Nb2RlOiBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGU7XHJcbiAgc2VsZWN0ZWRUaWNrZXRzOiBFeHBlbnNlVGlja2V0TGlua0NhcmRbXTtcclxuICBleGNsdWRlZElkczogc3RyaW5nW107XHJcbiAgZmlsdGVyZWRTbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB8IG51bGw7XHJcbiAgZmlsdGVyZWRUb3RhbENvdW50OiBudW1iZXI7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVGaWxlSWQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVNlbGVjdGlvbk1vZGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGUgPT4ge1xyXG4gIHJldHVybiB2YWx1ZSA9PT0gXCJmaWx0ZXJlZFwiID8gXCJmaWx0ZXJlZFwiIDogXCJzZWxlY3RlZFwiO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplRXhjbHVkZWRJZHMgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmdbXSA9PiB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIFtdO1xyXG5cclxuICBjb25zdCBpZHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcclxuICBmb3IgKGNvbnN0IGVudHJ5IG9mIHZhbHVlKSB7XHJcbiAgICBjb25zdCBmaWxlSWQgPSBub3JtYWxpemVGaWxlSWQoZW50cnkpO1xyXG4gICAgaWYgKCFmaWxlSWQpIGNvbnRpbnVlO1xyXG4gICAgaWRzLmFkZChmaWxlSWQpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIEFycmF5LmZyb20oaWRzKTtcclxufTtcclxuXHJcbmNvbnN0IHRvU2VsZWN0ZWRNYXAgPSAoaXRlbXM6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtdKTogUmVjb3JkPHN0cmluZywgRXhwZW5zZVRpY2tldExpbmtDYXJkPiA9PiB7XHJcbiAgY29uc3QgbmV4dDogUmVjb3JkPHN0cmluZywgRXhwZW5zZVRpY2tldExpbmtDYXJkPiA9IHt9O1xyXG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xyXG4gICAgY29uc3QgZmlsZUlkID0gbm9ybWFsaXplRmlsZUlkKGl0ZW0uZmlsZUlkKTtcclxuICAgIGlmICghZmlsZUlkKSBjb250aW51ZTtcclxuICAgIG5leHRbZmlsZUlkXSA9IGl0ZW07XHJcbiAgfVxyXG4gIHJldHVybiBuZXh0O1xyXG59O1xyXG5cclxuLy8gS2VlcHMgbGluay1tb2RlIHRpY2tldCBzZWxlY3Rpb24gc3RhYmxlIGFjcm9zcyBwYWdpbmcsIGZpbHRlcmVkIHNlbGVjdC1hbGwsIGFuZCBkZXRhaWwgcmV0dXJucy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uID0gKCkgPT4ge1xyXG4gIGNvbnN0IFtzZWxlY3Rpb25Nb2RlLCBzZXRTZWxlY3Rpb25Nb2RlXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZT4oXCJzZWxlY3RlZFwiKTtcclxuICBjb25zdCBbc2VsZWN0ZWRUaWNrZXRzQnlJZCwgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZF0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBFeHBlbnNlVGlja2V0TGlua0NhcmQ+Pih7fSk7XHJcbiAgY29uc3QgW2V4Y2x1ZGVkSWRzLCBzZXRFeGNsdWRlZElkc10gPSB1c2VTdGF0ZTxzdHJpbmdbXT4oW10pO1xyXG4gIGNvbnN0IFtmaWx0ZXJlZFNuYXBzaG90LCBzZXRGaWx0ZXJlZFNuYXBzaG90XSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbZmlsdGVyZWRUb3RhbENvdW50LCBzZXRGaWx0ZXJlZFRvdGFsQ291bnRdID0gdXNlU3RhdGUoMCk7XHJcblxyXG4gIGNvbnN0IHNlbGVjdGVkVGlja2V0cyA9IHVzZU1lbW8oKCkgPT4gT2JqZWN0LnZhbHVlcyhzZWxlY3RlZFRpY2tldHNCeUlkKSwgW3NlbGVjdGVkVGlja2V0c0J5SWRdKTtcclxuICBjb25zdCBleGNsdWRlZElkU2V0ID0gdXNlTWVtbygoKSA9PiBuZXcgU2V0KGV4Y2x1ZGVkSWRzKSwgW2V4Y2x1ZGVkSWRzXSk7XHJcbiAgY29uc3QgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSA9IHNlbGVjdGlvbk1vZGUgPT09IFwiZmlsdGVyZWRcIiAmJiAhIWZpbHRlcmVkU25hcHNob3Q7XHJcblxyXG4gIGNvbnN0IGNsZWFyU2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0U2VsZWN0aW9uTW9kZShcInNlbGVjdGVkXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZCh7fSk7XHJcbiAgICBzZXRFeGNsdWRlZElkcyhbXSk7XHJcbiAgICBzZXRGaWx0ZXJlZFNuYXBzaG90KG51bGwpO1xyXG4gICAgc2V0RmlsdGVyZWRUb3RhbENvdW50KDApO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgcmVzdG9yZVNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKChzdGF0ZTogRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25TdGF0ZSB8IG51bGwgfCB1bmRlZmluZWQpID0+IHtcclxuICAgIGlmICghc3RhdGUpIHtcclxuICAgICAgY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRNb2RlID0gbm9ybWFsaXplU2VsZWN0aW9uTW9kZShzdGF0ZS5zZWxlY3Rpb25Nb2RlKTtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRTZWxlY3RlZFRpY2tldHMgPSBBcnJheS5pc0FycmF5KHN0YXRlLnNlbGVjdGVkVGlja2V0cykgPyBzdGF0ZS5zZWxlY3RlZFRpY2tldHMgOiBbXTtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRTbmFwc2hvdCA9IHN0YXRlLmZpbHRlcmVkU25hcHNob3QgfHwgbnVsbDtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRFeGNsdWRlZElkcyA9IG5vcm1hbGl6ZUV4Y2x1ZGVkSWRzKHN0YXRlLmV4Y2x1ZGVkSWRzKTtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRGaWx0ZXJlZFRvdGFsID0gTnVtYmVyLmlzRmluaXRlKE51bWJlcihzdGF0ZS5maWx0ZXJlZFRvdGFsQ291bnQpKVxyXG4gICAgICA/IE1hdGgubWF4KDAsIE1hdGguZmxvb3IoTnVtYmVyKHN0YXRlLmZpbHRlcmVkVG90YWxDb3VudCkpKVxyXG4gICAgICA6IDA7XHJcblxyXG4gICAgc2V0U2VsZWN0aW9uTW9kZShub3JtYWxpemVkTW9kZSA9PT0gXCJmaWx0ZXJlZFwiICYmIG5vcm1hbGl6ZWRTbmFwc2hvdCA/IFwiZmlsdGVyZWRcIiA6IFwic2VsZWN0ZWRcIik7XHJcbiAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKHRvU2VsZWN0ZWRNYXAobm9ybWFsaXplZFNlbGVjdGVkVGlja2V0cykpO1xyXG4gICAgc2V0RXhjbHVkZWRJZHMobm9ybWFsaXplZE1vZGUgPT09IFwiZmlsdGVyZWRcIiA/IG5vcm1hbGl6ZWRFeGNsdWRlZElkcyA6IFtdKTtcclxuICAgIHNldEZpbHRlcmVkU25hcHNob3Qobm9ybWFsaXplZE1vZGUgPT09IFwiZmlsdGVyZWRcIiA/IG5vcm1hbGl6ZWRTbmFwc2hvdCA6IG51bGwpO1xyXG4gICAgc2V0RmlsdGVyZWRUb3RhbENvdW50KG5vcm1hbGl6ZWRNb2RlID09PSBcImZpbHRlcmVkXCIgPyBub3JtYWxpemVkRmlsdGVyZWRUb3RhbCA6IDApO1xyXG4gIH0sIFtjbGVhclNlbGVjdGlvbl0pO1xyXG5cclxuICBjb25zdCBzZWxlY3RBbGxCeUZpbHRlcnMgPSB1c2VDYWxsYmFjaygoc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsIHRvdGFsQ291bnQ6IG51bWJlcikgPT4ge1xyXG4gICAgc2V0U2VsZWN0aW9uTW9kZShcImZpbHRlcmVkXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZCh7fSk7XHJcbiAgICBzZXRFeGNsdWRlZElkcyhbXSk7XHJcbiAgICBzZXRGaWx0ZXJlZFNuYXBzaG90KHNuYXBzaG90KTtcclxuICAgIHNldEZpbHRlcmVkVG90YWxDb3VudChOdW1iZXIuaXNGaW5pdGUodG90YWxDb3VudCkgPyBNYXRoLm1heCgwLCBNYXRoLmZsb29yKHRvdGFsQ291bnQpKSA6IDApO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaXNTZWxlY3RlZCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGZpbGVJZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNhZmVGaWxlSWQgPSBub3JtYWxpemVGaWxlSWQoZmlsZUlkKTtcclxuICAgICAgaWYgKCFzYWZlRmlsZUlkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICBpZiAoaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSkge1xyXG4gICAgICAgIHJldHVybiAhZXhjbHVkZWRJZFNldC5oYXMoc2FmZUZpbGVJZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAhIXNlbGVjdGVkVGlja2V0c0J5SWRbc2FmZUZpbGVJZF07XHJcbiAgICB9LFxyXG4gICAgW2V4Y2x1ZGVkSWRTZXQsIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUsIHNlbGVjdGVkVGlja2V0c0J5SWRdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgdG9nZ2xlVGlja2V0ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodGlja2V0OiBFeHBlbnNlVGlja2V0TGlua0NhcmQpID0+IHtcclxuICAgICAgY29uc3QgZmlsZUlkID0gbm9ybWFsaXplRmlsZUlkKHRpY2tldC5maWxlSWQpO1xyXG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgaWYgKGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUpIHtcclxuICAgICAgICBzZXRFeGNsdWRlZElkcygocHJldmlvdXMpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG5leHQgPSBuZXcgU2V0KHByZXZpb3VzKTtcclxuICAgICAgICAgIGlmIChuZXh0LmhhcyhmaWxlSWQpKSB7XHJcbiAgICAgICAgICAgIG5leHQuZGVsZXRlKGZpbGVJZCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXh0LmFkZChmaWxlSWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV4dCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKChwcmV2aW91cykgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXZpb3VzIH07XHJcbiAgICAgICAgaWYgKG5leHRbZmlsZUlkXSkge1xyXG4gICAgICAgICAgZGVsZXRlIG5leHRbZmlsZUlkXTtcclxuICAgICAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBuZXh0W2ZpbGVJZF0gPSB0aWNrZXQ7XHJcbiAgICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGh5ZHJhdGVWaXNpYmxlVGlja2V0cyA9IHVzZUNhbGxiYWNrKChpdGVtczogRXhwZW5zZVRpY2tldExpbmtDYXJkW10pID0+IHtcclxuICAgIGlmIChzZWxlY3Rpb25Nb2RlICE9PSBcInNlbGVjdGVkXCIgfHwgaXRlbXMubGVuZ3RoIDwgMSkgcmV0dXJuO1xyXG5cclxuICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXZpb3VzIH07XHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xyXG4gICAgICAgIGNvbnN0IGZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZChpdGVtLmZpbGVJZCk7XHJcbiAgICAgICAgaWYgKCFmaWxlSWQgfHwgIW5leHRbZmlsZUlkXSkgY29udGludWU7XHJcbiAgICAgICAgbmV4dFtmaWxlSWRdID0gaXRlbTtcclxuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gY2hhbmdlZCA/IG5leHQgOiBwcmV2aW91cztcclxuICAgIH0pO1xyXG4gIH0sIFtzZWxlY3Rpb25Nb2RlXSk7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVTZWxlY3RlZENvdW50ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZmFsbGJhY2tUb3RhbENvdW50ID0gMCk6IG51bWJlciA9PiB7XHJcbiAgICAgIGlmICghaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSkge1xyXG4gICAgICAgIHJldHVybiBzZWxlY3RlZFRpY2tldHMubGVuZ3RoO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBiYXNlQ291bnQgPSBmaWx0ZXJlZFRvdGFsQ291bnQgPiAwID8gZmlsdGVyZWRUb3RhbENvdW50IDogTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihmYWxsYmFja1RvdGFsQ291bnQpKTtcclxuICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIGJhc2VDb3VudCAtIGV4Y2x1ZGVkSWRzLmxlbmd0aCk7XHJcbiAgICB9LFxyXG4gICAgW2V4Y2x1ZGVkSWRzLmxlbmd0aCwgZmlsdGVyZWRUb3RhbENvdW50LCBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlLCBzZWxlY3RlZFRpY2tldHMubGVuZ3RoXVxyXG4gICk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzZWxlY3Rpb25Nb2RlLFxyXG4gICAgc2VsZWN0ZWRUaWNrZXRzLFxyXG4gICAgZXhjbHVkZWRJZHMsXHJcbiAgICBmaWx0ZXJlZFNuYXBzaG90LFxyXG4gICAgZmlsdGVyZWRUb3RhbENvdW50LFxyXG4gICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSxcclxuICAgIGlzU2VsZWN0ZWQsXHJcbiAgICB0b2dnbGVUaWNrZXQsXHJcbiAgICBjbGVhclNlbGVjdGlvbixcclxuICAgIHJlc3RvcmVTZWxlY3Rpb24sXHJcbiAgICBzZWxlY3RBbGxCeUZpbHRlcnMsXHJcbiAgICBoeWRyYXRlVmlzaWJsZVRpY2tldHMsXHJcbiAgICByZXNvbHZlU2VsZWN0ZWRDb3VudCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVkdWNlciB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkUmVxdWVzdCA9IHtcclxuICBwYWdlOiBudW1iZXI7XHJcbiAgc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3Q7XHJcbiAgY2xlYXJDYWNoZTogYm9vbGVhbjtcclxuICByZXNldEJlZm9yZUxvYWQ6IGJvb2xlYW47XHJcbiAgd2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeTogYm9vbGVhbjtcclxufTtcclxuXHJcbnR5cGUgQXV0b21hdGljTG9hZEFjdGlvbiA9XHJcbiAgfCB7XHJcbiAgICAgIHR5cGU6IFwic2NoZWR1bGVcIjtcclxuICAgICAgcmVxdWVzdDogRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRSZXF1ZXN0O1xyXG4gICAgfVxyXG4gIHwge1xyXG4gICAgICB0eXBlOiBcImNsZWFyXCI7XHJcbiAgICB9XHJcbiAgfCB7XHJcbiAgICAgIHR5cGU6IFwiZGlzYWJsZV9saW5rX3dhaXRcIjtcclxuICAgIH07XHJcblxyXG5jb25zdCBhdXRvbWF0aWNMb2FkUmVkdWNlciA9IChcclxuICBzdGF0ZTogRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRSZXF1ZXN0IHwgbnVsbCxcclxuICBhY3Rpb246IEF1dG9tYXRpY0xvYWRBY3Rpb25cclxuKTogRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRSZXF1ZXN0IHwgbnVsbCA9PiB7XHJcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgY2FzZSBcInNjaGVkdWxlXCI6XHJcbiAgICAgIHJldHVybiBhY3Rpb24ucmVxdWVzdDtcclxuICAgIGNhc2UgXCJjbGVhclwiOlxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIGNhc2UgXCJkaXNhYmxlX2xpbmtfd2FpdFwiOlxyXG4gICAgICByZXR1cm4gc3RhdGUgPyB7IC4uLnN0YXRlLCB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiBmYWxzZSB9IDogbnVsbDtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBzdGF0ZTtcclxuICB9XHJcbn07XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkQXJncyA9IHtcclxuICBpc0xpbmtNb2RlOiBib29sZWFuO1xyXG4gIGNhblByb2Nlc3NMaW5rTW9kZTogYm9vbGVhbjtcclxuICBsaW5rU2hlZXRDaGVja0J1c3k6IGJvb2xlYW47XHJcbiAgbGlua1NoZWV0TG9ja2VkOiBib29sZWFuO1xyXG4gIGNsZWFyTGlzdENhY2hlOiAoKSA9PiB2b2lkO1xyXG4gIHJlc2V0TGlzdDogKHNvdXJjZT86IHN0cmluZykgPT4gdm9pZDtcclxuICBsb2FkTGlzdDogKHBhZ2U6IG51bWJlciwgc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpID0+IFByb21pc2U8dm9pZD47XHJcbn07XHJcblxyXG5jb25zdCBFWFBFTlNFX1RJQ0tFVFNfQVVUT19MT0FEX0xPR19QUkVGSVggPSBcIltleHBlbnNlLXRpY2tldHM6YXV0by1sb2FkXVwiO1xyXG5cclxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZEluZm8gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLmluZm8gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS5pbmZvKEVYUEVOU0VfVElDS0VUU19BVVRPX0xPQURfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZFdhcm4gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLndhcm4gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS53YXJuKEVYUEVOU0VfVElDS0VUU19BVVRPX0xPQURfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gUXVldWVzIG9uZSB0aWNrZXQgbGlzdCByZWxvYWQgYW5kIHJlbGVhc2VzIGl0IG9ubHkgd2hlbiBsaW5rLW1vZGUgcHJlY29uZGl0aW9ucyBhcmUgcmVhZHkuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZCA9ICh7XHJcbiAgaXNMaW5rTW9kZSxcclxuICBjYW5Qcm9jZXNzTGlua01vZGUsXHJcbiAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gIGxpbmtTaGVldExvY2tlZCxcclxuICBjbGVhckxpc3RDYWNoZSxcclxuICByZXNldExpc3QsXHJcbiAgbG9hZExpc3QsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkQXJncykgPT4ge1xyXG4gIGNvbnN0IFtwZW5kaW5nQXV0b21hdGljTG9hZCwgZGlzcGF0Y2hdID0gdXNlUmVkdWNlcihhdXRvbWF0aWNMb2FkUmVkdWNlciwgbnVsbCk7XHJcblxyXG4gIGNvbnN0IHJ1bkF1dG9tYXRpY0xpc3RMb2FkID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoXHJcbiAgICAgIHBhZ2U6IG51bWJlcixcclxuICAgICAgc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICBjbGVhckNhY2hlPzogYm9vbGVhbjtcclxuICAgICAgICByZXNldEJlZm9yZUxvYWQ/OiBib29sZWFuO1xyXG4gICAgICAgIHdhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHk/OiBib29sZWFuO1xyXG4gICAgICB9ID0ge31cclxuICAgICkgPT4ge1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkSW5mbyhcInJ1bkF1dG9tYXRpY0xpc3RMb2FkOnNjaGVkdWxlXCIsIHtcclxuICAgICAgICBwYWdlLFxyXG4gICAgICAgIHNuYXBzaG90LFxyXG4gICAgICAgIG9wdGlvbnMsXHJcbiAgICAgIH0pO1xyXG4gICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJzY2hlZHVsZVwiLFxyXG4gICAgICAgIHJlcXVlc3Q6IHtcclxuICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICBzbmFwc2hvdCxcclxuICAgICAgICAgIGNsZWFyQ2FjaGU6IG9wdGlvbnMuY2xlYXJDYWNoZSA9PT0gdHJ1ZSxcclxuICAgICAgICAgIHJlc2V0QmVmb3JlTG9hZDogb3B0aW9ucy5yZXNldEJlZm9yZUxvYWQgPT09IHRydWUsXHJcbiAgICAgICAgICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiBvcHRpb25zLndhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHkgPT09IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFwZW5kaW5nQXV0b21hdGljTG9hZCkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChwZW5kaW5nQXV0b21hdGljTG9hZC53YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5KSB7XHJcbiAgICAgIGlmICghaXNMaW5rTW9kZSkge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzQXV0b0xvYWRXYXJuKFwicGVuZGluZ0F1dG9tYXRpY0xvYWQ6ZGlzYWJsZS1saW5rLXdhaXRcIiwge1xyXG4gICAgICAgICAgcGFnZTogcGVuZGluZ0F1dG9tYXRpY0xvYWQucGFnZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IFwiZGlzYWJsZV9saW5rX3dhaXRcIiB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghY2FuUHJvY2Vzc0xpbmtNb2RlIHx8IGxpbmtTaGVldENoZWNrQnVzeSkge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzQXV0b0xvYWRJbmZvKFwicGVuZGluZ0F1dG9tYXRpY0xvYWQ6d2FpdGluZy1saW5rLW1vZGUtcmVhZHlcIiwge1xyXG4gICAgICAgICAgcGFnZTogcGVuZGluZ0F1dG9tYXRpY0xvYWQucGFnZSxcclxuICAgICAgICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcclxuICAgICAgICAgIGxpbmtTaGVldENoZWNrQnVzeSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChsaW5rU2hlZXRMb2NrZWQpIHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkV2FybihcInBlbmRpbmdBdXRvbWF0aWNMb2FkOmNsZWFyLWxpbmstbG9ja2VkXCIsIHtcclxuICAgICAgICAgIHBhZ2U6IHBlbmRpbmdBdXRvbWF0aWNMb2FkLnBhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcImNsZWFyXCIgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyBwYWdlLCBzbmFwc2hvdCwgY2xlYXJDYWNoZSwgcmVzZXRCZWZvcmVMb2FkIH0gPSBwZW5kaW5nQXV0b21hdGljTG9hZDtcclxuICAgIGRpc3BhdGNoKHsgdHlwZTogXCJjbGVhclwiIH0pO1xyXG4gICAgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZEluZm8oXCJwZW5kaW5nQXV0b21hdGljTG9hZDpleGVjdXRlXCIsIHtcclxuICAgICAgcGFnZSxcclxuICAgICAgc25hcHNob3QsXHJcbiAgICAgIGNsZWFyQ2FjaGUsXHJcbiAgICAgIHJlc2V0QmVmb3JlTG9hZCxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChjbGVhckNhY2hlKSB7XHJcbiAgICAgIGNsZWFyTGlzdENhY2hlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlc2V0QmVmb3JlTG9hZCkge1xyXG4gICAgICByZXNldExpc3QoXCJhdXRvbWF0aWMtbG9hZDpyZXNldC1iZWZvcmUtbG9hZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICB2b2lkIGxvYWRMaXN0KHBhZ2UsIHNuYXBzaG90KTtcclxuICB9LCBbXHJcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXHJcbiAgICBjbGVhckxpc3RDYWNoZSxcclxuICAgIGlzTGlua01vZGUsXHJcbiAgICBsaW5rU2hlZXRDaGVja0J1c3ksXHJcbiAgICBsaW5rU2hlZXRMb2NrZWQsXHJcbiAgICBsb2FkTGlzdCxcclxuICAgIHBlbmRpbmdBdXRvbWF0aWNMb2FkLFxyXG4gICAgcmVzZXRMaXN0LFxyXG4gIF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcnVuQXV0b21hdGljTGlzdExvYWQsXHJcbiAgfTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBa0Y7OztBQ0FsRixtQkFBbUM7QUF5RDdCO0FBckNOLElBQU0sZ0NBQWdDLENBQUM7QUFBQSxFQUNyQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUEwQztBQUN4QyxRQUFNLHFCQUFxQixnQkFBZ0IsQ0FBQztBQUU1QyxRQUFNLHVCQUFtQiwwQkFBWSxNQUFNO0FBQ3pDLGlCQUFhO0FBQUEsRUFDZixHQUFHLENBQUMsWUFBWSxDQUFDO0FBRWpCLFFBQU0sNEJBQXdCLDBCQUFZLE1BQU07QUFDOUMsUUFBSSxDQUFDLG1CQUFvQjtBQUN6QixtQkFBZTtBQUFBLEVBQ2pCLEdBQUcsQ0FBQyxvQkFBb0IsY0FBYyxDQUFDO0FBRXZDLFFBQU0sa0NBQWtDLGFBQ3BDLG1EQUNBLHFCQUNFLG1HQUNBO0FBRU4sU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsV0FBVyxhQUFhLG9FQUFvRTtBQUFBLE1BQzVGLHVCQUFxQixVQUFVO0FBQUEsTUFDL0Isd0JBQXNCLGFBQWEsU0FBUztBQUFBLE1BQzVDLDBCQUF3QixxQkFBcUIsU0FBUztBQUFBLE1BRXRELHVEQUFDLFNBQUksV0FBVSxZQUNiO0FBQUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQSxRQUFR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QkFBb0IsR0FDM0Y7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE9BQU8sS0FBSyxzQ0FBc0Msb0JBQW9CO0FBQUEsUUFDdEUsU0FBUztBQUFBLFFBQ1QsVUFBVSxnQkFBZ0IsaUJBQWlCLHNCQUFzQjtBQUFBO0FBQUEsSUFDbkUsR0FDRixJQUNFO0FBQUEsSUFFSCxtQkFBbUIsQ0FBQyxhQUNuQjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsV0FBVyxLQUFLLDZCQUE2QixxQkFBa0I7QUFBQSxRQUMvRCxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixlQUFlLEtBQUssNkJBQTZCLHFCQUFrQjtBQUFBLFFBQ25FLFdBQVc7QUFBQTtBQUFBLElBQ2IsSUFDRTtBQUFBLEtBQ047QUFFSjtBQUdBLElBQU0scUJBQXFCLE1BQU07QUFDL0IsU0FDRSw2Q0FBQyxnQ0FBcUIseUJBQXVCLE1BQzNDLHVEQUFDLDZCQUEwQixHQUM3QjtBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsMEJBQXdCO0FBQ3hCLFFBQU0sU0FBUyxTQUFTLGVBQWUsc0JBQXNCO0FBQzdELE1BQUksQ0FBQyxPQUFRO0FBQ2IsbUJBQWlCLFFBQVEsNkNBQUMsc0JBQW1CLENBQUU7QUFDakQ7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLDZCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIm5vcm1hbGl6ZUZpbGVJZCIsICJub3JtYWxpemVTZWxlY3Rpb25Nb2RlIiwgIm5vcm1hbGl6ZUV4Y2x1ZGVkSWRzIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiLCAiaXNMaW5rTW9kZSIsICJmcm9tRGF0ZSIsICJjYWNoZWRTdGF0ZSJdCn0K
