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
} from "./chunks/chunk-6WTAK6PN.js";
import {
  CheckIcon_default
} from "./chunks/chunk-WYCUWPMC.js";
import {
  HistorySummary_default
} from "./chunks/chunk-ZYPRLFAC.js";
import {
  getExpenseTicketStatusFilterOptions,
  getExpenseTicketStatusLabel,
  normalizeExpenseTicketFilterSnapshot,
  normalizeExpenseTicketStatusFilterCode,
  useExpenseTicketsFilterCache
} from "./chunks/chunk-ZXOWJLKZ.js";
import {
  useExpenseTicketLinkSheetGate
} from "./chunks/chunk-BUMA42MZ.js";
import {
  isExpenseAbortLikeError,
  runExpenseReadRequestWithRetry
} from "./chunks/chunk-6CQY4MTW.js";
import {
  ExpenseQuickTicketProgressOverlay_default,
  PageBottomActionButton,
  PageBottomActions_default,
  TICKET_IMAGE_ACCEPT_ATTRIBUTE,
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-OXZCI7DY.js";
import "./chunks/chunk-CHKLJEF3.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-I2ZO6L4G.js";
import {
  RemoteSearchCombobox_default
} from "./chunks/chunk-PELXC75R.js";
import {
  CompactPagination_default,
  FloatingActionButton_default,
  useTimelineCardEffects
} from "./chunks/chunk-2YXSM2RQ.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-5FRAKTKT.js";
import {
  buildExpenseSheetDetailUrl,
  clearExpenseTicketReturnContext,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-RALX73NO.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-UXY4YQ3D.js";
import {
  flashActionMark
} from "./chunks/chunk-CBDB7NMA.js";
import {
  clearExpenseNavigationGuard,
  formatAmountWithCurrency,
  navigateToExpenseUrl,
  setExpenseNavigationGuard
} from "./chunks/chunk-FJXF5IDK.js";
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
} from "./chunks/chunk-L5GTS5QB.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-MFMV3TBB.js";
import {
  clearExpenseActingUserOverride,
  getExpenseGastoTypeOptions,
  getExpenseScopeToken,
  setExpenseActingUserOverride,
  toExpenseGastoTypeCode
} from "./chunks/chunk-HGU6IHIX.js";
import {
  setTopbarActionGroupReady
} from "./chunks/chunk-ZBKHPZJX.js";
import "./chunks/chunk-DY2B5JHI.js";
import {
  Spinner_default,
  canAccess,
  showPermissionModal
} from "./chunks/chunk-EGSPAV7B.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-2NKOKBT5.js";
import {
  ApiFetchError,
  indT
} from "./chunks/chunk-63VW7TTG.js";
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
    const totalsByCurrency = /* @__PURE__ */ new Map();
    selectedTickets.forEach((item) => {
      const currencyCode2 = safeText(item.currencyCode).toUpperCase();
      const amount = Number(item.totalAmount ?? 0);
      if (!Number.isFinite(amount)) return;
      totalsByCurrency.set(currencyCode2, (totalsByCurrency.get(currencyCode2) ?? 0) + amount);
    });
    const groupedTotals = Array.from(totalsByCurrency.entries()).sort(
      (left, right) => left[0].localeCompare(right[0])
    );
    if (groupedTotals.length < 1) {
      return formatAmountWithCurrency(0, "");
    }
    return groupedTotals.map(([currencyCode2, amount]) => formatAmountWithCurrency(amount, currencyCode2)).join("; ");
  }, [selectedTickets]);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL0V4cGVuc2VUaWNrZXRzUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL3VzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlRWZmZWN0RXZlbnQsIHVzZUxheW91dEVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xyXG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3hcIjtcclxuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uLCB7IHR5cGUgRmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbSB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XHJcbmltcG9ydCBQYWdlQm90dG9tQWN0aW9ucywgeyBQYWdlQm90dG9tQWN0aW9uQnV0dG9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9QYWdlQm90dG9tQWN0aW9ucy50c3hcIjtcclxuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TcGlubmVyLnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCwgdHlwZSBBdXRoTWFuYWdlZFVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcclxuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcclxuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVRpbWVsaW5lQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlVGltZWxpbmVDYXJkLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldExpbmtUaW1lbGluZUl0ZW0gZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmtUaW1lbGluZUl0ZW0udHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0TGlua0J1bGtTdW1tYXJ5IGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5rQnVsa1N1bW1hcnkudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbCBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlUXVpY2tUaWNrZXRQcm9ncmVzc092ZXJsYXkudHN4XCI7XHJcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlVGlja2V0U3RhdHVzTGFiZWwgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VUaWNrZXRTdGF0dXNDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgsXHJcbiAgbGlua0V4cGVuc2VTaGVldFRpY2tldHNCdWxrLFxyXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSwgc2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQWN0aW5nVXNlci50c1wiO1xyXG5pbXBvcnQgeyBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsIG5hdmlnYXRlVG9FeHBlbnNlVXJsLCBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlR2FzdG9UeXBlT3B0aW9ucyB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZUdhc3RvVHlwZUNhdGFsb2cudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuaW1wb3J0IHtcclxuICBidWlsZEV4cGVuc2VTaGVldERldGFpbFVybCxcclxuICBjbGVhckV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgaGFzRXhwZW5zZVJldHVyblJlZmVycmVyLCBpc0V4cGVuc2VIaXN0b3J5QmFja0ZvcndhcmROYXZpZ2F0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VIaXN0b3J5TmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzLCBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIHNhZmVUZXh0LCBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93IH0gZnJvbSBcIi4uL2RldGFpbC91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cudHNcIjtcclxuaW1wb3J0IHsgVElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEUgfSBmcm9tIFwiLi4vZGV0YWlsL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvd0NvcmUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0xpc3REYXRhIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlLCB0eXBlIEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG4gIHJlYWRFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG4gIHNhdmVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgYnVpbGRFeHBlbnNlVGlja2V0TGlua0J1bGtGaWx0ZXJzIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VQYXlsb2FkQnVpbGRlcnMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0byB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXHJcbiAgRXhwZW5zZVRpY2tldExpbmtDYXJkLFxyXG4gIEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW0sXHJcbn0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbiB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWQudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldExpbmtTaGVldEdhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZS50c1wiO1xyXG5pbXBvcnQgeyBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5IGFzIHJldmVhbFRvcGJhckFjdGlvbkdyb3VwIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RvcGJhckFjdGlvblZpc2liaWxpdHkudHNcIjtcclxuXHJcbmNvbnN0IFBBR0VfU0laRSA9IDEwO1xuXHJcbmNvbnN0IG5vcm1hbGl6ZVVzZXJJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xyXG5cclxuY29uc3QgaXNTYW1lVXNlciA9IChsZWZ0OiBzdHJpbmcsIHJpZ2h0OiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkTGVmdCA9IG5vcm1hbGl6ZVVzZXJJZChsZWZ0KS50b1VwcGVyQ2FzZSgpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRSaWdodCA9IG5vcm1hbGl6ZVVzZXJJZChyaWdodCkudG9VcHBlckNhc2UoKTtcclxuICByZXR1cm4gISFub3JtYWxpemVkTGVmdCAmJiBub3JtYWxpemVkTGVmdCA9PT0gbm9ybWFsaXplZFJpZ2h0O1xyXG59O1xyXG5cclxuY29uc3QgZW5zdXJlQ3VycmVudFVzZXJJbkxpc3QgPSAodXNlcnM6IEF1dGhNYW5hZ2VkVXNlcltdLCBjdXJyZW50QXhVc2VySWQ6IHN0cmluZyk6IEF1dGhNYW5hZ2VkVXNlcltdID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkQ3VycmVudCA9IG5vcm1hbGl6ZVVzZXJJZChjdXJyZW50QXhVc2VySWQpO1xyXG4gIGlmICghbm9ybWFsaXplZEN1cnJlbnQpIHJldHVybiB1c2VycztcclxuICBpZiAodXNlcnMuc29tZSgoZW50cnkpID0+IGlzU2FtZVVzZXIoZW50cnkuYXhVc2VySWQsIG5vcm1hbGl6ZWRDdXJyZW50KSkpIHJldHVybiB1c2VycztcclxuICByZXR1cm4gW1xyXG4gICAge1xyXG4gICAgICBjcm1Vc2VySWQ6IG5vcm1hbGl6ZWRDdXJyZW50LFxyXG4gICAgICBheFVzZXJJZDogbm9ybWFsaXplZEN1cnJlbnQsXHJcbiAgICAgIG5hbWU6IG5vcm1hbGl6ZWRDdXJyZW50LFxyXG4gICAgfSxcclxuICAgIC4uLnVzZXJzLFxyXG4gIF07XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24gPSAocmVxdWVzdGVkVXNlcklkOiBzdHJpbmcsIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nLCB1c2VyczogQXV0aE1hbmFnZWRVc2VyW10pOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRSZXF1ZXN0ZWQgPSBub3JtYWxpemVVc2VySWQocmVxdWVzdGVkVXNlcklkKTtcclxuICBjb25zdCBub3JtYWxpemVkQ3VycmVudCA9IG5vcm1hbGl6ZVVzZXJJZChjdXJyZW50QXhVc2VySWQpO1xyXG4gIGlmIChub3JtYWxpemVkUmVxdWVzdGVkKSB7XHJcbiAgICBjb25zdCBmb3VuZCA9IHVzZXJzLmZpbmQoKGVudHJ5KSA9PiBpc1NhbWVVc2VyKGVudHJ5LmF4VXNlcklkLCBub3JtYWxpemVkUmVxdWVzdGVkKSk7XHJcbiAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZC5heFVzZXJJZDtcclxuICB9XHJcbiAgaWYgKG5vcm1hbGl6ZWRDdXJyZW50KSB7XHJcbiAgICBjb25zdCBzZWxmID0gdXNlcnMuZmluZCgoZW50cnkpID0+IGlzU2FtZVVzZXIoZW50cnkuYXhVc2VySWQsIG5vcm1hbGl6ZWRDdXJyZW50KSk7XHJcbiAgICByZXR1cm4gc2VsZj8uYXhVc2VySWQgfHwgbm9ybWFsaXplZEN1cnJlbnQ7XHJcbiAgfVxyXG4gIHJldHVybiBcIlwiO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRMaW5rTW9kZUluaXRpYWxTbmFwc2hvdCA9IChtYW5hZ2VkVXNlcklkID0gXCJcIik6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgPT4ge1xyXG4gIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcclxuICBjb25zdCBmcm9tRGF0ZSA9IG5ldyBEYXRlKHRvZGF5KTtcclxuICAvLyBLZWVwIGF1dG9tYXRpYyBsaW5rLW1vZGUgbG9hZCBib3VuZGVkIHRvIGF2b2lkIGhlYXZ5IHVwc3RyZWFtIHNjYW5zLlxyXG4gIGZyb21EYXRlLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMjkpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZnJvbURhdGU6IHRvSXNvRGF0ZShmcm9tRGF0ZSksXHJcbiAgICB0b0RhdGU6IHRvSXNvRGF0ZSh0b2RheSksXHJcbiAgICBmaWx0ZXJLZXk6IFwiXCIsXHJcbiAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXHJcbiAgICBtYW5hZ2VkVXNlcklkOiBub3JtYWxpemVVc2VySWQobWFuYWdlZFVzZXJJZCksXHJcbiAgICBzdGF0dXNGaWx0ZXI6IDAsXHJcbiAgICBnYXN0b1R5cGVGaWx0ZXI6IFwiXCIsXHJcbiAgICBwcm9jZXNzZWRCeUlhRmlsdGVyOiBcImFsbFwiLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlTGlua01vZGVCbG9ja2VkTWVzc2FnZSA9IChpc1BhaWQ6IGJvb2xlYW4pOiBzdHJpbmcgPT4ge1xyXG4gIGlmIChpc1BhaWQpIHtcclxuICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUGFpZFJlYWRPbmx5XCIsIFwiTGFzIGhvamFzIGRlIGdhc3RvIHBhZ2FkYXMgc29uIGRlIHNvbG8gbGVjdHVyYS5cIik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1JlYWRPbmx5QnlTdGF0dXNcIiwgXCJObyBzZSBwdWVkZSBlZGl0YXIgZXN0YSBob2phIGRlIGdhc3RvcyBlbiBlbCBlc3RhZG8gYWN0dWFsLlwiKTtcclxufTtcclxuXHJcbmNvbnN0IEVYUEVOU0VfVElDS0VUU19MT0dfUFJFRklYID0gXCJbZXhwZW5zZS10aWNrZXRzXVwiO1xyXG5cclxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNJbmZvID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xyXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS5pbmZvID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGNvbnNvbGUuaW5mbyhFWFBFTlNFX1RJQ0tFVFNfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNXYXJuID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xyXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS53YXJuID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGNvbnNvbGUud2FybihFWFBFTlNFX1RJQ0tFVFNfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gVmFsaWRhdGVzIHdoZXRoZXIgb25lIHRpY2tldCBjYXJkIGNhbiBwYXJ0aWNpcGF0ZSBpbiBidWxrIGxpbmsgbW9kZS5cclxuY29uc3QgY2FuU2VsZWN0VGlja2V0Rm9yTGluayA9IChpdGVtOiBFeHBlbnNlVGlja2V0TGlzdFBhZ2VJdGVtKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQoaXRlbS5maWxlSWQpO1xyXG4gIHJldHVybiAhIWZpbGVJZDtcclxufTtcclxuXHJcbi8vIEluaXRpYWxpemVzIGF1dGggc2VlZCBmb3IgZXhwZW5zZSBBUEkgY2FsbHMgYmVmb3JlIGlzbGFuZCBlZmZlY3RzIHJ1bi5cclxuY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XHJcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgoe1xyXG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXHJcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcclxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IE5ld1RpY2tldEljb24gPSAoKSA9PiAoXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwic2l6ZS02XCI+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTAgMjBoLTVhMiAyIDAgMCAxIC0yIC0ydi05YTIgMiAwIDAgMSAyIC0yaDFhMiAyIDAgMCAwIDIgLTJhMSAxIDAgMCAxIDEgLTFoNmExIDEgMCAwIDEgMSAxYTIgMiAwIDAgMCAyIDJoMWEyIDIgMCAwIDEgMiAydjJcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQuMzYyIDExLjE1YTMgMyAwIDEgMCAtNC4xNDQgNC4yNjNcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMjF2LTRhMiAyIDAgMSAxIDQgMHY0XCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDE5aDRcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMjEgMTV2NlwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBFeHBlbnNlVGlja2V0c1BhZ2VDb250ZW50ID0gKCkgPT4ge1xyXG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiVmlld1wiKTtcclxuICBjb25zdCBjYW5DcmVhdGVUaWNrZXQgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIkFkZFwiKTtcclxuICBjb25zdCBjYW5MaW5rU2hlZXRMaW5lcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiQWRkXCIpO1xyXG4gIGNvbnN0IHtcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzdWJvcmRpbmF0ZXMsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICB9ID0gdXNlQXV0aENvbnRleHQoKTtcclxuICBjb25zdCB0aW1lbGluZUNvbnRhaW5lclJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGNhbWVyYUlucHV0UmVmID0gUmVhY3QudXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBnYWxsZXJ5SW5wdXRSZWYgPSBSZWFjdC51c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGRpZFJlc3RvcmVPbk1vdW50UmVmID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcclxuICBjb25zdCBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZiA9IFJlYWN0LnVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBwZW5kaW5nRm9jdXNGaWxlSWRSZWYgPSBSZWFjdC51c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgbGlua01vZGVDb250ZXh0ID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgIGNvbnN0IGFjdGlvbiA9IHNhZmVUZXh0KHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwiYWN0aW9uXCIpKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgY29uc3QgaG9qYUdhc3Rvc0lkID0gc2FmZVRleHQodXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJob2phR2FzdG9zSWRcIikpO1xyXG4gICAgY29uc3QgaXNMaW5rTW9kZSA9IGFjdGlvbiA9PT0gXCJsaW5rXCIgJiYgISFob2phR2FzdG9zSWQ7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpc0xpbmtNb2RlLFxyXG4gICAgICBzaGVldElkOiBob2phR2FzdG9zSWQsXHJcbiAgICAgIHNoZWV0T3JpZ2luOiBpc0xpbmtNb2RlID8gKFwic2hlZXQtbGlua1wiIGFzIGNvbnN0KSA6ICghIWhvamFHYXN0b3NJZCA/IChcInNoZWV0LWNyZWF0ZVwiIGFzIGNvbnN0KSA6IG51bGwpLFxyXG4gICAgICBmaXhlZFN0YXR1c0ZpbHRlcjogaXNMaW5rTW9kZSA/ICgwIGFzIGNvbnN0KSA6IG51bGwsXHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaXNMaW5rTW9kZSA9IGxpbmtNb2RlQ29udGV4dC5pc0xpbmtNb2RlO1xyXG4gIGNvbnN0IGxpbmtTaGVldElkID0gbGlua01vZGVDb250ZXh0LnNoZWV0SWQ7XHJcbiAgY29uc3Qgc2hlZXRDYWxsZXJPcmlnaW4gPSBsaW5rTW9kZUNvbnRleHQuc2hlZXRPcmlnaW47XHJcbiAgY29uc3QgaGFzU2hlZXRDYWxsZXJDb250ZXh0ID0gISFsaW5rU2hlZXRJZCAmJiAhIXNoZWV0Q2FsbGVyT3JpZ2luO1xyXG4gIGNvbnN0IGZpeGVkU3RhdHVzRmlsdGVyID0gbGlua01vZGVDb250ZXh0LmZpeGVkU3RhdHVzRmlsdGVyO1xyXG4gIGNvbnN0IGNhblByb2Nlc3NMaW5rTW9kZSA9ICFpc0xpbmtNb2RlIHx8IGNhbkxpbmtTaGVldExpbmVzO1xyXG4gIGNvbnN0IG1hbmFnZWRVc2VycyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBlbnN1cmVDdXJyZW50VXNlckluTGlzdChBcnJheS5pc0FycmF5KHN1Ym9yZGluYXRlcykgPyBzdWJvcmRpbmF0ZXMgOiBbXSwgY3VycmVudEF4VXNlcklkKSxcclxuICAgIFtjdXJyZW50QXhVc2VySWQsIHN1Ym9yZGluYXRlc11cclxuICApO1xyXG4gIGNvbnN0IGRlZmF1bHRNYW5hZ2VkVXNlcklkID0gdXNlTWVtbyhcclxuICAgICgpID0+IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbihjdXJyZW50QXhVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzKSxcclxuICAgIFtjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vyc11cclxuICApO1xyXG4gIGNvbnN0IHNob3dNYW5hZ2VkVXNlckZpbHRlciA9IGlzTGlua01vZGUgJiYgY2FuTWFuYWdlT3RoZXJVc2VycztcclxuXHJcbiAgLy8gS2VlcHMgbGluay1tb2RlIGxpc3QgcXVlcmllcyBib3VuZGVkIGV2ZW4gd2hlbiBVSSBmaWx0ZXJzIGFyZSBjbGVhcmVkLlxyXG4gIGNvbnN0IG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0+IHtcclxuICAgICAgaWYgKCFpc0xpbmtNb2RlKSByZXR1cm4gc25hcHNob3Q7XHJcblxyXG4gICAgICBjb25zdCBmYWxsYmFjayA9IGJ1aWxkTGlua01vZGVJbml0aWFsU25hcHNob3Qoc25hcHNob3QubWFuYWdlZFVzZXJJZCk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRGcm9tRGF0ZSA9IHNhZmVUZXh0KHNuYXBzaG90LmZyb21EYXRlKSB8fCBmYWxsYmFjay5mcm9tRGF0ZTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZFRvRGF0ZSA9IHNhZmVUZXh0KHNuYXBzaG90LnRvRGF0ZSkgfHwgZmFsbGJhY2sudG9EYXRlO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCA9IG5vcm1hbGl6ZVVzZXJJZChzbmFwc2hvdC5tYW5hZ2VkVXNlcklkKSB8fCBmYWxsYmFjay5tYW5hZ2VkVXNlcklkO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zbmFwc2hvdCxcclxuICAgICAgICBmcm9tRGF0ZTogbm9ybWFsaXplZEZyb21EYXRlLFxyXG4gICAgICAgIHRvRGF0ZTogbm9ybWFsaXplZFRvRGF0ZSxcclxuICAgICAgICBtYW5hZ2VkVXNlcklkOiBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgICBzdGF0dXNGaWx0ZXI6IDAsXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgW2lzTGlua01vZGVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgW2xpbmtGbG93QnVzeSwgc2V0TGlua0Zsb3dCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbGlua0Zsb3dTdGF0dXMsIHNldExpbmtGbG93U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtsaW5rRmxvd0Vycm9yLCBzZXRMaW5rRmxvd0Vycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtzZWxlY3RBbGxCdXN5LCBzZXRTZWxlY3RBbGxCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2VsZWN0QWxsRXJyb3IsIHNldFNlbGVjdEFsbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtsaW5rQnVsa1Jlc3VsdCwgc2V0TGlua0J1bGtSZXN1bHRdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXN1bHREdG8gfCBudWxsPihudWxsKTtcclxuXHJcbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiAoe1xyXG4gICAgICBmaXJzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9GaXJzdFwiLCBcIkZpcnN0XCIpLFxyXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcclxuICAgICAgbmV4dDogaW5kVChcIkhpc3RvcnlfUGFnZV9OZXh0XCIsIFwiTmV4dFwiKSxcclxuICAgICAgbGFzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKSxcclxuICAgIH0pLFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGdhc3RvVHlwZU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4gZ2V0RXhwZW5zZUdhc3RvVHlwZU9wdGlvbnMoKSwgW10pO1xuXHJcbiAgY29uc3QgZ2FzdG9UeXBlTGFiZWxNYXAgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XHJcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBnYXN0b1R5cGVPcHRpb25zKSB7XHJcbiAgICAgIG1hcC5zZXQoU3RyaW5nKG9wdGlvbi52YWx1ZSksIG9wdGlvbi50ZXh0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBtYXA7XHJcbiAgfSwgW2dhc3RvVHlwZU9wdGlvbnNdKTtcclxuXHJcbiAgY29uc3Qge1xyXG4gICAgaXRlbXMsXHJcbiAgICB0b3RhbCxcclxuICAgIGN1cnJlbnRQYWdlLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgbG9hZExpc3QsXHJcbiAgICByZXN0b3JlTGlzdFNuYXBzaG90LFxyXG4gICAgcmVzZXRMaXN0LFxyXG4gICAgY2xlYXJMaXN0Q2FjaGUsXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGEoe1xyXG4gICAgaGFzQWNjZXNzLFxyXG4gICAgcGFnZVNpemU6IFBBR0VfU0laRSxcclxuICAgIG1vZGU6IGlzTGlua01vZGUgPyBcImxpbmtcIiA6IFwiZ2VuZXJhbFwiLFxyXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXHJcbiAgfSk7XHJcbiAgY29uc3QgeyByZWFkQ2FjaGVkU3RhdGUsIGNvbnN1bWVSZXR1cm5GbGFnLCBjb25zdW1lUmV0dXJuTW9kZSwgc2F2ZUNhY2hlZFN0YXRlLCBjbGVhckNhY2hlZFN0YXRlIH0gPSB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlKCk7XHJcbiAgY29uc3Qge1xyXG4gICAgc2VsZWN0aW9uTW9kZSxcclxuICAgIHNlbGVjdGVkVGlja2V0cyxcclxuICAgIGV4Y2x1ZGVkSWRzLFxyXG4gICAgZmlsdGVyZWRTbmFwc2hvdCxcclxuICAgIGZpbHRlcmVkVG90YWxDb3VudCxcclxuICAgIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUsXHJcbiAgICBpc1NlbGVjdGVkOiBpc0xpbmtUaWNrZXRTZWxlY3RlZCxcclxuICAgIHRvZ2dsZVRpY2tldDogdG9nZ2xlTGlua1RpY2tldFNlbGVjdGlvbixcclxuICAgIGNsZWFyU2VsZWN0aW9uOiBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24sXHJcbiAgICByZXN0b3JlU2VsZWN0aW9uOiByZXN0b3JlTGlua1RpY2tldFNlbGVjdGlvbixcclxuICAgIHNlbGVjdEFsbEJ5RmlsdGVycyxcclxuICAgIGh5ZHJhdGVWaXNpYmxlVGlja2V0cyxcclxuICAgIHJlc29sdmVTZWxlY3RlZENvdW50LFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbigpO1xyXG4gIGNvbnN0IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHJlcXVlc3RlZFVzZXJJZDogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICAgICAgY29uc3QgcmVzb2x2ZWRVc2VySWQgPSByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24ocmVxdWVzdGVkVXNlcklkLCBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vycyk7XHJcbiAgICAgIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZChyZXNvbHZlZFVzZXJJZCk7XHJcbiAgICAgIGlmICghcmVzb2x2ZWRVc2VySWQgfHwgKGN1cnJlbnRBeFVzZXJJZCAmJiBpc1NhbWVVc2VyKHJlc29sdmVkVXNlcklkLCBjdXJyZW50QXhVc2VySWQpKSkge1xyXG4gICAgICAgIGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUocmVzb2x2ZWRVc2VySWQpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXNvbHZlZFVzZXJJZDtcclxuICAgIH0sXHJcbiAgICBbY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnMsIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZF1cclxuICApO1xyXG4gIGNvbnN0IHtcclxuICAgIGxpbmtTaGVldExvY2tlZCxcclxuICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlLFxyXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZSh7XHJcbiAgICBpc0xpbmtNb2RlLFxyXG4gICAgbGlua1NoZWV0SWQsXHJcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICByZXNvbHZlQmxvY2tlZE1lc3NhZ2U6IHJlc29sdmVMaW5rTW9kZUJsb2NrZWRNZXNzYWdlLFxyXG4gIH0pO1xyXG4gIGNvbnN0IHsgcnVuQXV0b21hdGljTGlzdExvYWQgfSA9IHVzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkKHtcclxuICAgIGlzTGlua01vZGUsXHJcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXHJcbiAgICBsaW5rU2hlZXRDaGVja0J1c3ksXHJcbiAgICBsaW5rU2hlZXRMb2NrZWQsXHJcbiAgICBjbGVhckxpc3RDYWNoZSxcclxuICAgIHJlc2V0TGlzdCxcclxuICAgIGxvYWRMaXN0LFxyXG4gIH0pO1xyXG4gIGNvbnN0IGJ1aWxkSW5pdGlhbExpbmtNb2RlU25hcHNob3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBpbml0aWFsTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XHJcbiAgICByZXR1cm4gYnVpbGRMaW5rTW9kZUluaXRpYWxTbmFwc2hvdChpbml0aWFsTWFuYWdlZFVzZXJJZCk7XHJcbiAgfSwgW2RlZmF1bHRNYW5hZ2VkVXNlcklkLCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb25dKTtcclxuXHJcbiAgY29uc3QgYnVpbGRJbml0aWFsU3RhbmRhcmRTbmFwc2hvdCA9IHVzZUNhbGxiYWNrKCgpOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0+IHtcclxuICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcclxuICAgIGNvbnN0IGZyb21EYXRlID0gbmV3IERhdGUodG9kYXkpO1xyXG4gICAgZnJvbURhdGUuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA4OSk7XHJcbiAgICBjb25zdCBpbml0aWFsTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZnJvbURhdGU6IHRvSXNvRGF0ZShmcm9tRGF0ZSksXHJcbiAgICAgIHRvRGF0ZTogdG9Jc29EYXRlKHRvZGF5KSxcclxuICAgICAgZmlsdGVyS2V5OiBcIlwiLFxyXG4gICAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXHJcbiAgICAgIG1hbmFnZWRVc2VySWQ6IGluaXRpYWxNYW5hZ2VkVXNlcklkLFxyXG4gICAgICBzdGF0dXNGaWx0ZXI6IFwiXCIsXHJcbiAgICAgIGdhc3RvVHlwZUZpbHRlcjogXCJcIixcclxuICAgICAgcHJvY2Vzc2VkQnlJYUZpbHRlcjogXCJhbGxcIixcclxuICAgIH07XHJcbiAgfSwgW2RlZmF1bHRNYW5hZ2VkVXNlcklkLCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb25dKTtcclxuXHJcbiAgY29uc3Qge1xyXG4gICAgZnJvbURhdGUsXHJcbiAgICB0b0RhdGUsXHJcbiAgICBmaWx0ZXJLZXksXHJcbiAgICBjdXJyZW5jeUNvZGUsXHJcbiAgICBtYW5hZ2VkVXNlcklkLFxyXG4gICAgc3RhdHVzRmlsdGVyLFxyXG4gICAgZ2FzdG9UeXBlRmlsdGVyLFxyXG4gICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxyXG4gICAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXHJcbiAgICBzaG93TWFudWFsRGF0ZUVycm9yLFxyXG4gICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxyXG4gICAgYXBwbGllZEZpbHRlcnMsXHJcbiAgICBzaG93RmlsdGVycyxcclxuICAgIGN1cnJlbnRGaWx0ZXJzLFxyXG4gICAgc2V0RmlsdGVyS2V5LFxyXG4gICAgc2V0Q3VycmVuY3lDb2RlLFxyXG4gICAgc2V0TWFuYWdlZFVzZXJJZCxcclxuICAgIHNldFN0YXR1c0ZpbHRlcixcclxuICAgIHNldEdhc3RvVHlwZUZpbHRlcixcclxuICAgIHNldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsXHJcbiAgICBvbkFwcGx5LFxyXG4gICAgb25DbGVhcixcclxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcclxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlLFxyXG4gICAgb25NYW51YWxSYW5nZUNvbXBsZXRlLFxyXG4gICAgb25RdWlja0ZpbHRlckNoYW5nZSxcclxuICAgIHRvZ2dsZUZpbHRlclBhbmVsLFxyXG4gICAgc3RhdHVzRmlsdGVyTG9ja2VkLFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZSh7XHJcbiAgICBkZWZhdWx0TWFuYWdlZFVzZXJJZCxcclxuICAgIGZpeGVkU3RhdHVzRmlsdGVyLFxyXG4gICAgYWxsb3dFbXB0eURhdGVzT25BcHBseTogaXNMaW5rTW9kZSxcclxuICAgIG9uQXBwbHlGaWx0ZXJzOiAoc25hcHNob3QpID0+IHtcclxuICAgICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XHJcbiAgICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbigpO1xyXG4gICAgICBjb25zdCByZXNvbHZlZE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oc25hcHNob3QubWFuYWdlZFVzZXJJZCk7XHJcbiAgICAgIHZvaWQgbG9hZExpc3QoXHJcbiAgICAgICAgMSxcclxuICAgICAgICBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZCh7XHJcbiAgICAgICAgICAuLi5zbmFwc2hvdCxcclxuICAgICAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc29sdmVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfSxcclxuICAgIG9uQ2xlYXJGaWx0ZXJzOiAoKSA9PiB7XHJcbiAgICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xyXG4gICAgICBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24oKTtcclxuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xyXG4gICAgICBpZiAoaXNMaW5rTW9kZSkge1xyXG4gICAgICAgIGNvbnN0IGxpbmtTbmFwc2hvdCA9IGJ1aWxkSW5pdGlhbExpbmtNb2RlU25hcHNob3QoKTtcclxuICAgICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMobGlua1NuYXBzaG90KTtcclxuICAgICAgICBydW5BdXRvbWF0aWNMaXN0TG9hZCgxLCBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZChsaW5rU25hcHNob3QpLCB7XHJcbiAgICAgICAgICBjbGVhckNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgcmVzZXRCZWZvcmVMb2FkOiB0cnVlLFxyXG4gICAgICAgICAgd2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJlc2V0TWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihjdXJyZW50QXhVc2VySWQpO1xyXG4gICAgICBzZXRNYW5hZ2VkVXNlcklkKHJlc2V0TWFuYWdlZFVzZXJJZCk7XHJcbiAgICAgIHJlc2V0TGlzdChcImNsZWFyLWZpbHRlcnNcIik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZERlZmF1bHRNYW5hZ2VkVXNlcklkID0gbm9ybWFsaXplVXNlcklkKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcclxuICAgIGlmICghbm9ybWFsaXplZERlZmF1bHRNYW5hZ2VkVXNlcklkKSByZXR1cm47XHJcbiAgICBzZXRNYW5hZ2VkVXNlcklkKG5vcm1hbGl6ZWREZWZhdWx0TWFuYWdlZFVzZXJJZCk7XHJcbiAgICBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24obm9ybWFsaXplZERlZmF1bHRNYW5hZ2VkVXNlcklkKTtcclxuICB9LCBbZGVmYXVsdE1hbmFnZWRVc2VySWQsIHNldE1hbmFnZWRVc2VySWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGNhbk1hbmFnZU90aGVyVXNlcnMpIHJldHVybjtcclxuICAgIGNvbnN0IGZhbGxiYWNrTWFuYWdlZFVzZXJJZCA9IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbihjdXJyZW50QXhVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzKTtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50TWFuYWdlZFVzZXJJZCA9IG5vcm1hbGl6ZVVzZXJJZChtYW5hZ2VkVXNlcklkKTtcclxuICAgIGlmIChpc1NhbWVVc2VyKG5vcm1hbGl6ZWRDdXJyZW50TWFuYWdlZFVzZXJJZCwgZmFsbGJhY2tNYW5hZ2VkVXNlcklkKSkgcmV0dXJuO1xyXG4gICAgaWYgKCFub3JtYWxpemVkQ3VycmVudE1hbmFnZWRVc2VySWQgJiYgIWZhbGxiYWNrTWFuYWdlZFVzZXJJZCkgcmV0dXJuO1xyXG5cclxuICAgIHNldE1hbmFnZWRVc2VySWQoZmFsbGJhY2tNYW5hZ2VkVXNlcklkKTtcclxuICAgIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihmYWxsYmFja01hbmFnZWRVc2VySWQpO1xyXG4gIH0sIFtjYW5NYW5hZ2VPdGhlclVzZXJzLCBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2VySWQsIG1hbmFnZWRVc2Vycywgc2V0TWFuYWdlZFVzZXJJZCwgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXSk7XHJcblxyXG4gIGNvbnN0IHtcclxuICAgIHNvdXJjZVBpY2tlck9wZW4sXHJcbiAgICBidXN5OiBxdWlja1RpY2tldEJ1c3ksXHJcbiAgICBwcm9ncmVzc01lc3NhZ2U6IHF1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlLFxyXG4gICAgcHJvZ3Jlc3NTdGFnZXM6IHF1aWNrVGlja2V0UHJvZ3Jlc3NTdGFnZXMsXHJcbiAgICBwcm9ncmVzc0VsYXBzZWRNczogcXVpY2tUaWNrZXRFbGFwc2VkTXMsXHJcbiAgICBlcnJvck1lc3NhZ2U6IHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlLFxyXG4gICAgYXR0ZW1wdElkOiBxdWlja1RpY2tldEF0dGVtcHRJZCxcclxuICAgIGhhc1BlbmRpbmdVcGxvYWRSZXRyeSxcclxuICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlLFxyXG4gICAgdHJhY2VMaXN0OiBxdWlja1RpY2tldFRyYWNlTGlzdCxcclxuICAgIG9wZW5Tb3VyY2VQaWNrZXIsXHJcbiAgICBjbG9zZVNvdXJjZVBpY2tlcixcclxuICAgIHNlbGVjdEZyb21DYW1lcmEsXHJcbiAgICBzZWxlY3RGcm9tR2FsbGVyeSxcbiAgICBoYW5kbGVTZWxlY3RlZEZpbGUsXG4gICAgcmV0cnlQZW5kaW5nVXBsb2FkLFxuICAgIGNsZWFyRXJyb3I6IGNsZWFyUXVpY2tUaWNrZXRFcnJvcixcbiAgfSA9IHVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdyh7XG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogIWlzTGlua01vZGUgJiYgY2FuQ3JlYXRlVGlja2V0LFxyXG4gICAgaXNDcmVhdGVNb2RlOiBmYWxzZSxcclxuICAgIGlzU2hlZXRMb2NrZWQ6IGZhbHNlLFxyXG4gICAgbGlua1RvU2hlZXQ6IGZhbHNlLFxyXG4gICAgYXhVc2VySWRPdmVycmlkZTogc2FmZVRleHQoY3VycmVudEF4VXNlcklkKSxcclxuICAgIGN1cnJlbmN5Q29kZTogY3VycmVuY3lDb2RlIHx8IFwiRVVSXCIsXHJcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICAgIG9uQ29tcGxldGVkOiAocmVzdWx0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNyZWF0ZWRGaWxlSWQgPSBzYWZlVGV4dChyZXN1bHQ/LmZpbGVJZCk7XHJcbiAgICAgIGlmICghY3JlYXRlZEZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgaWYgKGhhc1NoZWV0Q2FsbGVyQ29udGV4dCAmJiBzaGVldENhbGxlck9yaWdpbikge1xyXG4gICAgICAgIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCh7XHJcbiAgICAgICAgICBmaWxlSWQ6IGNyZWF0ZWRGaWxlSWQsXHJcbiAgICAgICAgICBzaGVldElkOiBsaW5rU2hlZXRJZCxcclxuICAgICAgICAgIG9yaWdpbjogc2hlZXRDYWxsZXJPcmlnaW4sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICAgIGZpbGVJZDogY3JlYXRlZEZpbGVJZCxcclxuICAgICAgICAgIG1vZGU6IFwiZWRpdFwiLFxyXG4gICAgICAgICAgb3JpZ2luOiBzaGVldENhbGxlck9yaWdpbixcclxuICAgICAgICAgIHNoZWV0SWQ6IGxpbmtTaGVldElkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoKTtcclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsP2ZpbGVJZD0ke2VuY29kZVVSSUNvbXBvbmVudChjcmVhdGVkRmlsZUlkKX0mbW9kZT1lZGl0Jm9yaWdpbj10aWNrZXQtY3JlYXRlYCwge1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZmFiTWVudUl0ZW1zID0gdXNlTWVtbzxGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW10+KFxyXG4gICAgKCkgPT5cclxuICAgICAgaXNMaW5rTW9kZVxyXG4gICAgICAgID8gW11cclxuICAgICAgICA6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGlkOiBcIm5ldy10aWNrZXRcIixcclxuICAgICAgICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX05ld1RpY2tldFwiLCBcIk51ZXZvIFRpY2tldFwiKSxcclxuICAgICAgICAgICAgICBpY29uOiA8TmV3VGlja2V0SWNvbiAvPixcclxuICAgICAgICAgICAgICBvbkNsaWNrOiBvcGVuU291cmNlUGlja2VyLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgXSxcclxuICAgIFtpc0xpbmtNb2RlLCBvcGVuU291cmNlUGlja2VyXVxyXG4gICk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRUaWNrZXRDb3VudCA9IHJlc29sdmVTZWxlY3RlZENvdW50KHRvdGFsKTtcbiAgY29uc3Qgc2VsZWN0ZWRUb3RhbEFtb3VudFRleHQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCB0b3RhbHNCeUN1cnJlbmN5ID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcblxuICAgIHNlbGVjdGVkVGlja2V0cy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChpdGVtLmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKTtcbiAgICAgIGNvbnN0IGFtb3VudCA9IE51bWJlcihpdGVtLnRvdGFsQW1vdW50ID8/IDApO1xuICAgICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUoYW1vdW50KSkgcmV0dXJuO1xuICAgICAgdG90YWxzQnlDdXJyZW5jeS5zZXQoY3VycmVuY3lDb2RlLCAodG90YWxzQnlDdXJyZW5jeS5nZXQoY3VycmVuY3lDb2RlKSA/PyAwKSArIGFtb3VudCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBncm91cGVkVG90YWxzID0gQXJyYXkuZnJvbSh0b3RhbHNCeUN1cnJlbmN5LmVudHJpZXMoKSkuc29ydCgobGVmdCwgcmlnaHQpID0+XG4gICAgICBsZWZ0WzBdLmxvY2FsZUNvbXBhcmUocmlnaHRbMF0pXG4gICAgKTtcblxuICAgIGlmIChncm91cGVkVG90YWxzLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koMCwgXCJcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyb3VwZWRUb3RhbHMubWFwKChbY3VycmVuY3lDb2RlLCBhbW91bnRdKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koYW1vdW50LCBjdXJyZW5jeUNvZGUpKS5qb2luKFwiOyBcIik7XG4gIH0sIFtzZWxlY3RlZFRpY2tldHNdKTtcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICByZXZlYWxUb3BiYXJBY3Rpb25Hcm91cChcImV4cGVuc2UtdGlja2V0cy1saXN0LWFjdGlvbnNcIik7XG4gIH0sIFtdKTtcblxyXG4gIGNvbnN0IGxpbmtNb2RlQ2FuY2VsTWVzc2FnZSA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PlxyXG4gICAgICBpbmRUKFxyXG4gICAgICAgIFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfQ2FuY2VsQ29uZmlybVwiLFxyXG4gICAgICAgIFwiU2UgY2FuY2VsYXJcdTAwRTEgZWwgcHJvY2VzbyBkZSB2aW5jdWxhY2lcdTAwRjNuIHkgdm9sdmVyXHUwMEUxcyBhIGxhIGhvamEgZGUgZ2FzdG9zLiBcdTAwQkZRdWllcmVzIGNvbnRpbnVhcj9cIlxyXG4gICAgICApLFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICBjb25zdCBhcHBseUNyZWF0ZWRUaWNrZXRSZXR1cm4gPSB1c2VDYWxsYmFjayhcclxuICAgICh0aWNrZXRGaWxlSWQ6IHN0cmluZywgdGlja2V0RGF0ZVZhbHVlOiB1bmtub3duKSA9PiB7XHJcbiAgICAgIGNvbnN0IGluaXRpYWxTbmFwc2hvdCA9IGJ1aWxkSW5pdGlhbFN0YW5kYXJkU25hcHNob3QoKTtcclxuXHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcImFwcGx5Q3JlYXRlZFRpY2tldFJldHVybjpzdGFydFwiLCB7XHJcbiAgICAgICAgdGlja2V0RmlsZUlkLFxyXG4gICAgICAgIHRpY2tldERhdGVWYWx1ZSxcclxuICAgICAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICAgICAgaW5pdGlhbFNuYXBzaG90LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcclxuICAgICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50ID0gXCJcIjtcclxuICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKGluaXRpYWxTbmFwc2hvdCk7XHJcbiAgICAgIGNsZWFyTGlzdENhY2hlKCk7XHJcbiAgICAgIHJlc2V0TGlzdChcImNyZWF0ZWQtdGlja2V0LXJldHVyblwiKTtcclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwiYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuOmxvYWRMaXN0XCIsIHtcclxuICAgICAgICBwYWdlOiAxLFxyXG4gICAgICAgIGluaXRpYWxTbmFwc2hvdCxcclxuICAgICAgfSk7XHJcbiAgICAgIHZvaWQgbG9hZExpc3QoMSwgaW5pdGlhbFNuYXBzaG90KTtcclxuXHJcbiAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZShcInRpY2tldEZpbGVJZFwiKTtcclxuICAgICAgdXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoXCJ0aWNrZXREYXRlXCIpO1xyXG4gICAgICBjb25zdCBjbGVhbmVkUXVlcnkgPSB1cmwuc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XHJcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgXCJcIiwgY2xlYW5lZFF1ZXJ5ID8gYCR7dXJsLnBhdGhuYW1lfT8ke2NsZWFuZWRRdWVyeX1gIDogdXJsLnBhdGhuYW1lKTtcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGJ1aWxkSW5pdGlhbFN0YW5kYXJkU25hcHNob3QsXHJcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUsXHJcbiAgICAgIGNsZWFyTGlzdENhY2hlLFxyXG4gICAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICAgIGxvYWRMaXN0LFxyXG4gICAgICByZXNldExpc3QsXHJcbiAgICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCByZXN0b3JlTGlua01vZGVSZXR1cm5TdGF0ZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGNhY2hlZFN0YXRlOiBFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihjYWNoZWRTdGF0ZS5maWx0ZXJzLm1hbmFnZWRVc2VySWQpO1xyXG4gICAgICBjb25zdCByZXN0b3JlZEZpbHRlcnMgPSB7XHJcbiAgICAgICAgLi4uY2FjaGVkU3RhdGUuZmlsdGVycyxcclxuICAgICAgICBtYW5hZ2VkVXNlcklkOiByZXN0b3JlZE1hbmFnZWRVc2VySWQsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMocmVzdG9yZWRGaWx0ZXJzKTtcclxuICAgICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLnNjcm9sbFk7XHJcbiAgICAgIHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50ID0gY2FjaGVkU3RhdGUuZm9jdXNGaWxlSWQ7XHJcbiAgICAgIHJlc3RvcmVMaW5rVGlja2V0U2VsZWN0aW9uKHtcclxuICAgICAgICBzZWxlY3Rpb25Nb2RlOiBjYWNoZWRTdGF0ZS5zZWxlY3Rpb25Nb2RlLFxyXG4gICAgICAgIHNlbGVjdGVkVGlja2V0czogY2FjaGVkU3RhdGUuc2VsZWN0ZWRUaWNrZXRzLFxyXG4gICAgICAgIGV4Y2x1ZGVkSWRzOiBjYWNoZWRTdGF0ZS5leGNsdWRlZElkcyxcclxuICAgICAgICBmaWx0ZXJlZFNuYXBzaG90OiBjYWNoZWRTdGF0ZS5maWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnMsXHJcbiAgICAgICAgZmlsdGVyZWRUb3RhbENvdW50OiBjYWNoZWRTdGF0ZS5maWx0ZXJlZFNlbGVjdGlvblRvdGFsLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChjYWNoZWRTdGF0ZS5pdGVtcy5sZW5ndGggPiAwIHx8IGNhY2hlZFN0YXRlLnRvdGFsID4gMCkge1xyXG4gICAgICAgIHJlc3RvcmVMaXN0U25hcHNob3Qoe1xyXG4gICAgICAgICAgaXRlbXM6IGNhY2hlZFN0YXRlLml0ZW1zLFxyXG4gICAgICAgICAgdG90YWw6IGNhY2hlZFN0YXRlLnRvdGFsLFxyXG4gICAgICAgICAgcGFnZTogY2FjaGVkU3RhdGUucGFnZSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcnVuQXV0b21hdGljTGlzdExvYWQoY2FjaGVkU3RhdGUucGFnZSwgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQocmVzdG9yZWRGaWx0ZXJzKSwge1xyXG4gICAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXHJcbiAgICAgICAgd2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeTogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZCxcclxuICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxyXG4gICAgICByZXN0b3JlTGlua1RpY2tldFNlbGVjdGlvbixcclxuICAgICAgcmVzdG9yZUxpc3RTbmFwc2hvdCxcclxuICAgICAgcnVuQXV0b21hdGljTGlzdExvYWQsXHJcbiAgICAgIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbixcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCByZXN0b3JlSW5pdGlhbExpbmtNb2RlU3RhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBsaW5rU25hcHNob3QgPSBidWlsZEluaXRpYWxMaW5rTW9kZVNuYXBzaG90KCk7XHJcbiAgICBjbGVhckNhY2hlZFN0YXRlKCk7XHJcbiAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoKTtcclxuICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbigpO1xyXG4gICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XHJcbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMobGlua1NuYXBzaG90KTtcclxuICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkKDEsIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKGxpbmtTbmFwc2hvdCksIHtcclxuICAgICAgY2xlYXJDYWNoZTogdHJ1ZSxcclxuICAgICAgcmVzZXRCZWZvcmVMb2FkOiB0cnVlLFxyXG4gICAgICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgfSwgW1xyXG4gICAgYnVpbGRJbml0aWFsTGlua01vZGVTbmFwc2hvdCxcclxuICAgIGNsZWFyQ2FjaGVkU3RhdGUsXHJcbiAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsXHJcbiAgICBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24sXHJcbiAgICBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZCxcclxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcclxuICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkLFxyXG4gIF0pO1xyXG5cclxuICAvLyBBcHBsaWVzIGRlZmF1bHQgZmlyc3QtZW50cnkgZmlsdGVycyBmb3IgdGhlIHN0YW5kYXJkIHRpY2tldHMgbGlzdCBvbmx5LlxyXG4gIGNvbnN0IHJlc3RvcmVJbml0aWFsU3RhbmRhcmRTdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGluaXRpYWxTbmFwc2hvdCA9IGJ1aWxkSW5pdGlhbFN0YW5kYXJkU25hcHNob3QoKTtcclxuICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcclxuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xyXG4gICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMoaW5pdGlhbFNuYXBzaG90KTtcclxuICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkKDEsIGluaXRpYWxTbmFwc2hvdCwge1xyXG4gICAgICBjbGVhckNhY2hlOiB0cnVlLFxyXG4gICAgICByZXNldEJlZm9yZUxvYWQ6IHRydWUsXHJcbiAgICB9KTtcclxuICB9LCBbXHJcbiAgICBidWlsZEluaXRpYWxTdGFuZGFyZFNuYXBzaG90LFxyXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSxcclxuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSxcclxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcclxuICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCByZXN0b3JlU3RhbmRhcmRSZXR1cm5TdGF0ZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGNhY2hlZFN0YXRlOiBFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihjYWNoZWRTdGF0ZS5maWx0ZXJzLm1hbmFnZWRVc2VySWQpO1xyXG4gICAgICBjb25zdCByZXN0b3JlZEZpbHRlcnMgPSB7XHJcbiAgICAgICAgLi4uY2FjaGVkU3RhdGUuZmlsdGVycyxcclxuICAgICAgICBtYW5hZ2VkVXNlcklkOiByZXN0b3JlZE1hbmFnZWRVc2VySWQsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMocmVzdG9yZWRGaWx0ZXJzKTtcclxuICAgICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLnNjcm9sbFk7XHJcbiAgICAgIHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50ID0gY2FjaGVkU3RhdGUuZm9jdXNGaWxlSWQ7XHJcblxyXG4gICAgICBpZiAoY2FjaGVkU3RhdGUuaXRlbXMubGVuZ3RoID4gMCB8fCBjYWNoZWRTdGF0ZS50b3RhbCA+IDApIHtcclxuICAgICAgICByZXN0b3JlTGlzdFNuYXBzaG90KHtcclxuICAgICAgICAgIGl0ZW1zOiBjYWNoZWRTdGF0ZS5pdGVtcyxcclxuICAgICAgICAgIHRvdGFsOiBjYWNoZWRTdGF0ZS50b3RhbCxcclxuICAgICAgICAgIHBhZ2U6IGNhY2hlZFN0YXRlLnBhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkKGNhY2hlZFN0YXRlLnBhZ2UsIHJlc3RvcmVkRmlsdGVycywge1xyXG4gICAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtyZXN0b3JlQXBwbGllZEZpbHRlcnMsIHJlc3RvcmVMaXN0U25hcHNob3QsIHJ1bkF1dG9tYXRpY0xpc3RMb2FkLCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb25dXHJcbiAgKTtcclxuXHJcbiAgLy8gS2VlcHMgZGVsZXRlIHJldHVybiBleHBsaWNpdDogYmxhbmsgZmlsdGVycywgb3BlbiBwYW5lbCwgYW5kIG5vIGF1dG9tYXRpYyByZWxvYWQuXHJcbiAgY29uc3QgcmVzdG9yZURlbGV0ZVJldHVyblN0YXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xyXG4gICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKCk7XHJcbiAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50ID0gXCJcIjtcclxuICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbigpO1xyXG4gICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XHJcbiAgICBvbkNsZWFyKCk7XHJcbiAgfSwgW2NsZWFyQ2FjaGVkU3RhdGUsIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSwgY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uLCBvbkNsZWFyXSk7XHJcblxyXG4gIGNvbnN0IHRvZ2dsZVRpY2tldFNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHRpY2tldDogRXhwZW5zZVRpY2tldExpc3RQYWdlSXRlbSkgPT4ge1xyXG4gICAgICBpZiAoIWlzTGlua01vZGUgfHwgIWNhblByb2Nlc3NMaW5rTW9kZSB8fCBsaW5rU2hlZXRDaGVja0J1c3kgfHwgbGlua1NoZWV0TG9ja2VkIHx8IGxpbmtGbG93QnVzeSkgcmV0dXJuO1xyXG4gICAgICBpZiAodGlja2V0LmtpbmQgIT09IFwibGlua1wiKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dCh0aWNrZXQuZmlsZUlkKTtcclxuICAgICAgaWYgKCFmaWxlSWQpIHJldHVybjtcclxuICAgICAgaWYgKCFjYW5TZWxlY3RUaWNrZXRGb3JMaW5rKHRpY2tldCkpIHJldHVybjtcclxuXHJcbiAgICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xyXG4gICAgICB0b2dnbGVMaW5rVGlja2V0U2VsZWN0aW9uKHRpY2tldCk7XHJcbiAgICB9LFxyXG4gICAgW2NhblByb2Nlc3NMaW5rTW9kZSwgaXNMaW5rTW9kZSwgbGlua0Zsb3dCdXN5LCBsaW5rU2hlZXRDaGVja0J1c3ksIGxpbmtTaGVldExvY2tlZCwgdG9nZ2xlTGlua1RpY2tldFNlbGVjdGlvbl1cclxuICApO1xyXG5cclxuICBjb25zdCBjbGVhclRpY2tldFNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFNlbGVjdEFsbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XHJcbiAgICBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24oKTtcclxuICB9LCBbY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uXSk7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVBY3RpdmVGaWx0ZXJzID0gdXNlQ2FsbGJhY2soKCk6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgPT4ge1xuICAgIGNvbnN0IGJhc2VTbmFwc2hvdCA9IGFwcGxpZWRGaWx0ZXJzIHx8IGN1cnJlbnRGaWx0ZXJzO1xuICAgIGNvbnN0IHJlc29sdmVkTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihiYXNlU25hcHNob3QubWFuYWdlZFVzZXJJZCk7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKHtcbiAgICAgIC4uLmJhc2VTbmFwc2hvdCxcbiAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc29sdmVkTWFuYWdlZFVzZXJJZCxcbiAgICB9KTtcbiAgfSwgW2FwcGxpZWRGaWx0ZXJzLCBjdXJyZW50RmlsdGVycywgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xuICBjb25zdCByZXNvbHZlQWN0aXZlRmlsdGVyc0V2ZW50ID0gdXNlRWZmZWN0RXZlbnQocmVzb2x2ZUFjdGl2ZUZpbHRlcnMpO1xuXHJcbiAgLy8gQWN0aXZhdGVzIGJhY2tlbmQtZHJpdmVuIGZpbHRlcmVkIHNlbGVjdGlvbiBmb3IgdGhlIGN1cnJlbnQgZmlsdGVyIHNuYXBzaG90LlxyXG4gIGNvbnN0IHNlbGVjdEFsbE1hdGNoaW5nVGlja2V0cyA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmICghaXNMaW5rTW9kZSB8fCAhY2FuUHJvY2Vzc0xpbmtNb2RlIHx8IGxpbmtTaGVldENoZWNrQnVzeSB8fCBsaW5rU2hlZXRMb2NrZWQgfHwgbGlua0Zsb3dCdXN5IHx8IHNlbGVjdEFsbEJ1c3kpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNlbGVjdEFsbEJ1c3kodHJ1ZSk7XHJcbiAgICBzZXRTZWxlY3RBbGxFcnJvcihcIlwiKTtcclxuICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGFjdGl2ZUZpbHRlcnMgPSByZXNvbHZlQWN0aXZlRmlsdGVycygpO1xyXG4gICAgICBzZWxlY3RBbGxCeUZpbHRlcnMoYWN0aXZlRmlsdGVycywgdG90YWwpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIlRpY2tldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0cy5cIik7XHJcbiAgICAgIHNldFNlbGVjdEFsbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0U2VsZWN0QWxsQnVzeShmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW1xyXG4gICAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgaXNMaW5rTW9kZSxcclxuICAgIGxpbmtGbG93QnVzeSxcclxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcclxuICAgIGxpbmtTaGVldExvY2tlZCxcclxuICAgIHJlc29sdmVBY3RpdmVGaWx0ZXJzLFxyXG4gICAgc2VsZWN0QWxsQnlGaWx0ZXJzLFxyXG4gICAgc2VsZWN0QWxsQnVzeSxcclxuICAgIHRvdGFsLFxyXG4gIF0pO1xyXG5cclxuICAvLyBLZWVwcyBzZWxlY3RlZCBjYXJkIG1ldGFkYXRhIGZyZXNoIHdpdGggdGhlIGxhdGVzdCBsaXN0IHBheWxvYWQuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNMaW5rTW9kZSB8fCBpdGVtcy5sZW5ndGggPCAxKSByZXR1cm47XHJcbiAgICBoeWRyYXRlVmlzaWJsZVRpY2tldHMoaXRlbXMuZmlsdGVyKChpdGVtKTogaXRlbSBpcyBFeHBlbnNlVGlja2V0TGlua0NhcmQgPT4gaXRlbS5raW5kID09PSBcImxpbmtcIikpO1xyXG4gIH0sIFtoeWRyYXRlVmlzaWJsZVRpY2tldHMsIGlzTGlua01vZGUsIGl0ZW1zXSk7XHJcblxyXG4gIGNvbnN0IHJ1blRpY2tldExpbmtGbG93ID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKCFpc0xpbmtNb2RlIHx8ICFsaW5rU2hlZXRJZCB8fCBsaW5rRmxvd0J1c3kpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGxpbmtTaGVldExvY2tlZCB8fCAhY2FuUHJvY2Vzc0xpbmtNb2RlKSB7XHJcbiAgICAgIGNvbnN0IGJsb2NrZWRNZXNzYWdlID1cclxuICAgICAgICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZSB8fFxyXG4gICAgICAgIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9SZWFkT25seUJ5U3RhdHVzXCIsIFwiTm8gc2UgcHVlZGUgZWRpdGFyIGVzdGEgaG9qYSBkZSBnYXN0b3MgZW4gZWwgZXN0YWRvIGFjdHVhbC5cIik7XHJcbiAgICAgIHNldExpbmtGbG93RXJyb3IoYmxvY2tlZE1lc3NhZ2UpO1xyXG4gICAgICBzZXRMaW5rRmxvd1N0YXR1cyhibG9ja2VkTWVzc2FnZSk7XHJcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlbGVjdGVkQ291bnQgPSByZXNvbHZlU2VsZWN0ZWRDb3VudCh0b3RhbCk7XHJcbiAgICBpZiAoc2VsZWN0ZWRDb3VudCA8IDEpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFjdGl2ZUZpbHRlcnMgPSByZXNvbHZlQWN0aXZlRmlsdGVycygpO1xyXG4gICAgY29uc3QgcmVxdWVzdEF4VXNlcklkID0gc2FmZVRleHQoYWN0aXZlRmlsdGVycy5tYW5hZ2VkVXNlcklkIHx8IGN1cnJlbnRBeFVzZXJJZCk7XHJcblxyXG4gICAgc2V0TGlua0Zsb3dCdXN5KHRydWUpO1xyXG4gICAgc2V0TGlua0Zsb3dFcnJvcihcIlwiKTtcclxuICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xyXG4gICAgc2V0TGlua0Zsb3dTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19MaW5raW5nTGluZVwiLCBcIkxpbmtpbmcgZXhwZW5zZSBsaW5lLi4uXCIpKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGxpbmtFeHBlbnNlU2hlZXRUaWNrZXRzQnVsayhcclxuICAgICAgICBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlXHJcbiAgICAgICAgICA/IHtcclxuICAgICAgICAgICAgICBleHBlbnNlU2hlZXRJZDogbGlua1NoZWV0SWQsXHJcbiAgICAgICAgICAgICAgc2VsZWN0aW9uTW9kZTogXCJmaWx0ZXJlZFwiLFxyXG4gICAgICAgICAgICAgIGZpbHRlcnM6IGJ1aWxkRXhwZW5zZVRpY2tldExpbmtCdWxrRmlsdGVycyhmaWx0ZXJlZFNuYXBzaG90IHx8IGFjdGl2ZUZpbHRlcnMpLFxyXG4gICAgICAgICAgICAgIGV4Y2x1ZGVkSWRzLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICA6IHtcclxuICAgICAgICAgICAgICBleHBlbnNlU2hlZXRJZDogbGlua1NoZWV0SWQsXHJcbiAgICAgICAgICAgICAgc2VsZWN0aW9uTW9kZTogXCJzZWxlY3RlZFwiLFxyXG4gICAgICAgICAgICAgIHRpY2tldElkczogc2VsZWN0ZWRUaWNrZXRzLmZsYXRNYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KGl0ZW0uZmlsZUlkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmaWxlSWQgPyBbZmlsZUlkXSA6IFtdO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgYXhVc2VySWRPdmVycmlkZTogcmVxdWVzdEF4VXNlcklkIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLkRhdGEgfHwgbnVsbDtcclxuICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICBjb25zdCBmYWlsdXJlTWVzc2FnZSA9IHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpO1xyXG4gICAgICAgIHNldExpbmtGbG93RXJyb3IoZmFpbHVyZU1lc3NhZ2UpO1xyXG4gICAgICAgIHNldExpbmtGbG93U3RhdHVzKGZhaWx1cmVNZXNzYWdlKTtcclxuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRMaW5rQnVsa1Jlc3VsdChyZXN1bHQpO1xyXG5cclxuICAgICAgaWYgKHJlc3VsdC5saW5rZWRDb3VudCA+IDApIHtcclxuICAgICAgICBjbGVhclRpY2tldFNlbGVjdGlvbigpO1xyXG4gICAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcclxuICAgICAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoKTtcclxuICAgICAgICBjbGVhckV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KCk7XHJcbiAgICAgICAgY29uc3Qgc3VjY2Vzc01hcmsgPSByZXN1bHQuZmFpbGVkQ291bnQgPiAwIHx8IHJlc3VsdC5za2lwcGVkQ291bnQgPiAwID8gXCJ3YXJuaW5nUHJvY2Vzc1wiIDogXCJva1Byb2Nlc3NcIjtcclxuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoc3VjY2Vzc01hcmssIHN1Y2Nlc3NNYXJrID09PSBcIm9rUHJvY2Vzc1wiID8gMTIwMCA6IDE1MDApO1xyXG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsKGxpbmtTaGVldElkKSwge1xyXG4gICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcclxuICAgICAgICAgIGJ5cGFzc0d1YXJkT25jZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHJlc3VsdC5mYWlsZWRDb3VudCA+IDAgJiYgcmVzdWx0LmxpbmtlZENvdW50IDwgMSkge1xuICAgICAgICBjb25zdCBmYWlsdXJlTWVzc2FnZSA9IHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpO1xuICAgICAgICBzZXRMaW5rRmxvd1N0YXR1cyhmYWlsdXJlTWVzc2FnZSk7XG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcbiAgICAgICAgYXdhaXQgbG9hZExpc3QoY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLCBhY3RpdmVGaWx0ZXJzKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN1bHQuZmFpbGVkQ291bnQgPiAwIHx8IHJlc3VsdC5za2lwcGVkQ291bnQgPiAwKSB7XG4gICAgICAgIHNldExpbmtGbG93U3RhdHVzKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpKTtcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwid2FybmluZ1Byb2Nlc3NcIiwgMTUwMCk7XG4gICAgICAgIGF3YWl0IGxvYWRMaXN0KGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSwgYWN0aXZlRmlsdGVycyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBzZXRMaW5rRmxvd1N0YXR1cyhyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKSk7XG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgMTIwMCk7XG4gICAgICBhd2FpdCBsb2FkTGlzdChjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsIGFjdGl2ZUZpbHRlcnMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc3QgZmFpbHVyZU1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcclxuICAgICAgc2V0TGlua0Zsb3dFcnJvcihmYWlsdXJlTWVzc2FnZSk7XHJcbiAgICAgIHNldExpbmtGbG93U3RhdHVzKGZhaWx1cmVNZXNzYWdlKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRMaW5rRmxvd0J1c3koZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtcclxuICAgIGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsLFxyXG4gICAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxyXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSxcclxuICAgIGNsZWFyVGlja2V0U2VsZWN0aW9uLFxyXG4gICAgY3VycmVudFBhZ2UsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBleGNsdWRlZElkcyxcclxuICAgIGZpbHRlcmVkU25hcHNob3QsXHJcbiAgICBpc0xpbmtNb2RlLFxyXG4gICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSxcclxuICAgIGxpbmtGbG93QnVzeSxcclxuICAgIGxpbmtTaGVldElkLFxyXG4gICAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UsXHJcbiAgICBsaW5rU2hlZXRMb2NrZWQsXHJcbiAgICBsb2FkTGlzdCxcclxuICAgIHJlc29sdmVBY3RpdmVGaWx0ZXJzLFxyXG4gICAgcmVzb2x2ZVNlbGVjdGVkQ291bnQsXHJcbiAgICBzZWxlY3RlZFRpY2tldHMsXHJcbiAgICB0b3RhbCxcclxuICBdKTtcclxuXHJcbiAgY29uc3Qgb3BlbkxpbmtDb25maXJtTW9kYWwgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWlzTGlua01vZGUgfHwgc2VsZWN0ZWRUaWNrZXRDb3VudCA8IDEgfHwgbGlua0Zsb3dCdXN5IHx8IGxpbmtTaGVldENoZWNrQnVzeSB8fCBsaW5rU2hlZXRMb2NrZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldExpbmtGbG93RXJyb3IoXCJcIik7XHJcbiAgICBzZXRMaW5rRmxvd1N0YXR1cyhcIlwiKTtcclxuICAgIG9wZW5Db25maXJtKHtcclxuICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9MaW5rQnV0dG9uXCIsIFwiVmluY3VsYXIgdGlja2V0KHMpXCIpLFxyXG4gICAgICBtZXNzYWdlOiBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlXHJcbiAgICAgICAgPyBgJHtpbmRUKFwiTmF2X0V4cGVuc2VUaWNrZXRzXCIsIFwiVGlja2V0c1wiKX06ICR7c2VsZWN0ZWRUaWNrZXRDb3VudH1gXHJcbiAgICAgICAgOiBgJHtpbmRUKFwiTmF2X0V4cGVuc2VUaWNrZXRzXCIsIFwiVGlja2V0c1wiKX06ICR7c2VsZWN0ZWRUaWNrZXRDb3VudH1cXG4ke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1RvdGFsQW1vdW50XCIsIFwiVG90YWwgYW1vdW50XCIpfTogJHtzZWxlY3RlZFRvdGFsQW1vdW50VGV4dH1gLFxyXG4gICAgICBjb25maXJtVGV4dDogaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0xpbmtCdXR0b25cIiwgXCJWaW5jdWxhciB0aWNrZXQocylcIiksXHJcbiAgICAgIGNhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxyXG4gICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcclxuICAgICAgICByZXR1cm4gcnVuVGlja2V0TGlua0Zsb3coKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0sIFtcclxuICAgIGlzTGlua01vZGUsXHJcbiAgICBzZWxlY3RlZFRpY2tldENvdW50LFxyXG4gICAgbGlua0Zsb3dCdXN5LFxyXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gICAgbGlua1NoZWV0TG9ja2VkLFxyXG4gICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgc2VsZWN0ZWRUb3RhbEFtb3VudFRleHQsXHJcbiAgICBydW5UaWNrZXRMaW5rRmxvdyxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TGlua0Zsb3dFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5OiBsaW5rRmxvd0J1c3ksXHJcbiAgICAgIG9uRXJyb3I6IChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgc2V0TGlua0Zsb3dFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICBzZXRMaW5rRmxvd1N0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgfSxcclxuICAgICAgZGVmYXVsdEVycm9yTWVzc2FnZTogaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpLFxyXG4gICAgfSk7XHJcbiAgfSwgW2hhbmRsZUNvbmZpcm0sIGxpbmtGbG93QnVzeV0pO1xyXG5cclxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcclxuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBsaW5rRmxvd0J1c3lcclxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxyXG4gICAgOiAhbGlua0Zsb3dCdXN5ICYmIGxpbmtGbG93RXJyb3JcclxuICAgICAgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIilcclxuICAgICAgOiBtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFsaW5rRmxvd0J1c3kgJiYgbGlua0Zsb3dFcnJvcikge1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdm9pZCBoYW5kbGVNb2RhbENvbmZpcm0oKTtcclxuICB9LCBbY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm0sIGxpbmtGbG93QnVzeSwgbGlua0Zsb3dFcnJvcl0pO1xyXG5cclxuICBjb25zdCBvcGVuVGlja2V0RGV0YWlsID0gdXNlQ2FsbGJhY2soXHJcbiAgICAocmF3RmlsZUlkOiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQocmF3RmlsZUlkKTtcclxuICAgICAgaWYgKCFmaWxlSWQpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnMgfHwgY3VycmVudEZpbHRlcnM7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHtcclxuICAgICAgICBmaWx0ZXJzOiBzbmFwc2hvdCxcclxuICAgICAgICBwYWdlOiBjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsXHJcbiAgICAgICAgc2Nyb2xsWTogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5zY3JvbGxZIHx8IDAgOiAwLFxyXG4gICAgICAgIGZvY3VzRmlsZUlkOiBmaWxlSWQsXHJcbiAgICAgICAgaXRlbXMsXHJcbiAgICAgICAgdG90YWwsXHJcbiAgICAgICAgc2VsZWN0ZWRUaWNrZXRzLFxyXG4gICAgICAgIGxpbmtNb2RlU2hlZXRJZDogaXNMaW5rTW9kZSA/IGxpbmtTaGVldElkIDogXCJcIixcclxuICAgICAgICBzZWxlY3Rpb25Nb2RlLFxyXG4gICAgICAgIGV4Y2x1ZGVkSWRzLFxyXG4gICAgICAgIGZpbHRlcmVkU2VsZWN0aW9uRmlsdGVyczogZmlsdGVyZWRTbmFwc2hvdCxcclxuICAgICAgICBmaWx0ZXJlZFNlbGVjdGlvblRvdGFsOiBmaWx0ZXJlZFRvdGFsQ291bnQsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoaXNMaW5rTW9kZSkge1xyXG4gICAgICAgIHNhdmVDYWNoZWRTdGF0ZShjdXJyZW50U3RhdGUpO1xyXG4gICAgICAgIHNhdmVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKHtcclxuICAgICAgICAgIHNoZWV0SWQ6IGxpbmtTaGVldElkLFxyXG4gICAgICAgICAgcGFnZTogY3VycmVudFN0YXRlLnBhZ2UsXHJcbiAgICAgICAgICBzY3JvbGxZOiBjdXJyZW50U3RhdGUuc2Nyb2xsWSxcclxuICAgICAgICAgIGZvY3VzRmlsZUlkOiBmaWxlSWQsXHJcbiAgICAgICAgICBmaWx0ZXJzOiBzbmFwc2hvdCxcclxuICAgICAgICAgIHNlbGVjdGlvbk1vZGUsXHJcbiAgICAgICAgICBzZWxlY3RlZFRpY2tldHMsXHJcbiAgICAgICAgICBleGNsdWRlZElkcyxcclxuICAgICAgICAgIGZpbHRlcmVkU2VsZWN0aW9uRmlsdGVyczogZmlsdGVyZWRTbmFwc2hvdCxcclxuICAgICAgICAgIGZpbHRlcmVkU2VsZWN0aW9uVG90YWw6IGZpbHRlcmVkVG90YWxDb3VudCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChoYXNTaGVldENhbGxlckNvbnRleHQgJiYgc2hlZXRDYWxsZXJPcmlnaW4pIHtcclxuICAgICAgICAgIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCh7XHJcbiAgICAgICAgICAgIGZpbGVJZCxcclxuICAgICAgICAgICAgc2hlZXRJZDogbGlua1NoZWV0SWQsXHJcbiAgICAgICAgICAgIG9yaWdpbjogc2hlZXRDYWxsZXJPcmlnaW4sXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHF1ZXJ5LnNldChcIm9yaWdpblwiLCBzaGVldENhbGxlck9yaWdpbik7XHJcbiAgICAgICAgICBxdWVyeS5zZXQoXCJzaGVldElkXCIsIGxpbmtTaGVldElkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAgICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxyXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2F2ZUNhY2hlZFN0YXRlKGN1cnJlbnRTdGF0ZSk7XHJcbiAgICAgIGlmIChoYXNTaGVldENhbGxlckNvbnRleHQgJiYgc2hlZXRDYWxsZXJPcmlnaW4pIHtcclxuICAgICAgICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoe1xyXG4gICAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgICAgc2hlZXRJZDogbGlua1NoZWV0SWQsXHJcbiAgICAgICAgICBvcmlnaW46IHNoZWV0Q2FsbGVyT3JpZ2luLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgICBvcmlnaW46IHNoZWV0Q2FsbGVyT3JpZ2luLFxyXG4gICAgICAgICAgc2hlZXRJZDogbGlua1NoZWV0SWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXHJcbiAgICAgICAgICBieXBhc3NHdWFyZE9uY2U6IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY2xlYXJFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCgpO1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/ZmlsZUlkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGZpbGVJZCl9YCwge1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcclxuICAgICAgICBieXBhc3NHdWFyZE9uY2U6IGZhbHNlLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGFwcGxpZWRGaWx0ZXJzLFxyXG4gICAgICBjdXJyZW50UGFnZSxcclxuICAgICAgY3VycmVudEZpbHRlcnMsXHJcbiAgICAgIGhhc1NoZWV0Q2FsbGVyQ29udGV4dCxcclxuICAgICAgbGlua1NoZWV0SWQsXHJcbiAgICAgIGlzTGlua01vZGUsXHJcbiAgICAgIGl0ZW1zLFxyXG4gICAgICBmaWx0ZXJlZFRvdGFsQ291bnQsXHJcbiAgICAgIGZpbHRlcmVkU25hcHNob3QsXHJcbiAgICAgIGV4Y2x1ZGVkSWRzLFxyXG4gICAgICBzaGVldENhbGxlck9yaWdpbixcclxuICAgICAgc2F2ZUNhY2hlZFN0YXRlLFxyXG4gICAgICBzYXZlRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSxcclxuICAgICAgc2VsZWN0ZWRUaWNrZXRzLFxyXG4gICAgICBzZWxlY3Rpb25Nb2RlLFxyXG4gICAgICB0b3RhbCxcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xyXG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcclxuICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XHJcbiAgICBpZiAoIXRpbWVsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiBjYXJkO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyh7XHJcbiAgICBjb250YWluZXJSZWY6IHRpbWVsaW5lQ29udGFpbmVyUmVmLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgaXRlbXMsXHJcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCgodG90YWwgfHwgMCkgLyBQQUdFX1NJWkUpO1xyXG4gIGNvbnN0IHNob3dMaXN0TG9hZGluZyA9IGlzTG9hZGluZztcclxuICBjb25zdCBsaW5rTW9kZVNlbGVjdGlvbkJ1dHRvbnNEaXNhYmxlZCA9IGxpbmtGbG93QnVzeSB8fCBzZWxlY3RBbGxCdXN5IHx8IGlzTG9hZGluZztcclxuXHJcbiAgY29uc3Qgc3VtbWFyeUl0ZW1zID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBzbmFwc2hvdCA9IGFwcGxpZWRGaWx0ZXJzO1xyXG4gICAgaWYgKCFzbmFwc2hvdCkgcmV0dXJuIFtdIGFzIEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfT47XHJcblxyXG4gICAgY29uc3Qgc3VtbWFyeTogQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9PiA9IFtdO1xyXG4gICAgY29uc3QgbG9jYWxlID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCI7XHJcbiAgICBjb25zdCBmcm9tRGF0ZVRleHQgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoc25hcHNob3QuZnJvbURhdGUsIGxvY2FsZSwgXCJcIik7XHJcbiAgICBjb25zdCB0b0RhdGVUZXh0ID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKHNuYXBzaG90LnRvRGF0ZSwgbG9jYWxlLCBcIlwiKTtcclxuXHJcbiAgICBpZiAoZnJvbURhdGVUZXh0IHx8IHRvRGF0ZVRleHQpIHtcclxuICAgICAgc3VtbWFyeS5wdXNoKHtcclxuICAgICAgICBrZXk6IFwiZnJvbURhdGVcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIiksXHJcbiAgICAgICAgdmFsdWU6IGZyb21EYXRlVGV4dCB8fCBcIi0tXCIsXHJcbiAgICAgIH0pO1xyXG4gICAgICBzdW1tYXJ5LnB1c2goe1xyXG4gICAgICAgIGtleTogXCJ0b0RhdGVcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKSxcclxuICAgICAgICB2YWx1ZTogdG9EYXRlVGV4dCB8fCBcIi0tXCIsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzbmFwc2hvdC5maWx0ZXJLZXkudHJpbSgpKSB7XHJcbiAgICAgIHN1bW1hcnkucHVzaCh7XHJcbiAgICAgICAga2V5OiBcImZpbHRlcktleVwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfRmlsdGVyS2V5XCIsIFwiVGlja2V0XCIpLFxyXG4gICAgICAgIHZhbHVlOiBzbmFwc2hvdC5maWx0ZXJLZXkudHJpbSgpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc25hcHNob3QuY3VycmVuY3lDb2RlLnRyaW0oKSkge1xyXG4gICAgICBzdW1tYXJ5LnB1c2goe1xyXG4gICAgICAgIGtleTogXCJjdXJyZW5jeVwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKSxcclxuICAgICAgICB2YWx1ZTogc25hcHNob3QuY3VycmVuY3lDb2RlLnRyaW0oKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNuYXBzaG90LnN0YXR1c0ZpbHRlciAhPT0gXCJcIikge1xyXG4gICAgICBzdW1tYXJ5LnB1c2goe1xyXG4gICAgICAgIGtleTogXCJzdGF0dXNcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIlRpY2tldHNfRmlsdGVyX1N0YXR1c1wiLCBcIlN0YXR1c1wiKSxcclxuICAgICAgICB2YWx1ZTogZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsKHNuYXBzaG90LnN0YXR1c0ZpbHRlciksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzbmFwc2hvdC5nYXN0b1R5cGVGaWx0ZXIgIT09IFwiXCIpIHtcclxuICAgICAgY29uc3QgY2F0ZWdvcnlMYWJlbCA9IGdhc3RvVHlwZUxhYmVsTWFwLmdldChTdHJpbmcoc25hcHNob3QuZ2FzdG9UeXBlRmlsdGVyKSkgfHwgU3RyaW5nKHNuYXBzaG90Lmdhc3RvVHlwZUZpbHRlcik7XHJcbiAgICAgIHN1bW1hcnkucHVzaCh7XHJcbiAgICAgICAga2V5OiBcImNhdGVnb3J5XCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpLFxyXG4gICAgICAgIHZhbHVlOiBjYXRlZ29yeUxhYmVsLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc25hcHNob3QucHJvY2Vzc2VkQnlJYUZpbHRlciAhPT0gXCJhbGxcIikge1xyXG4gICAgICBzdW1tYXJ5LnB1c2goe1xyXG4gICAgICAgIGtleTogXCJwcm9jZXNzZWRcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIiksXHJcbiAgICAgICAgdmFsdWU6XHJcbiAgICAgICAgICBzbmFwc2hvdC5wcm9jZXNzZWRCeUlhRmlsdGVyID09PSBcInllc1wiXHJcbiAgICAgICAgICAgID8gaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFfWWVzXCIsIFwiWWVzXCIpXHJcbiAgICAgICAgICAgIDogaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFfTm9cIiwgXCJOb1wiKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN1bW1hcnk7XHJcbiAgfSwgW2FwcGxpZWRGaWx0ZXJzLCBnYXN0b1R5cGVMYWJlbE1hcF0pO1xyXG5cclxuICBjb25zdCBzaG93U3VtbWFyeSA9ICFpc0xpbmtNb2RlICYmICFzaG93RmlsdGVycyAmJiBzdW1tYXJ5SXRlbXMubGVuZ3RoID4gMDtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNMaW5rTW9kZSkgcmV0dXJuO1xyXG4gICAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCh7XHJcbiAgICAgIGFjdGl2ZTogdHJ1ZSxcclxuICAgICAgbWVzc2FnZTogbGlua01vZGVDYW5jZWxNZXNzYWdlLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcclxuICAgIH07XHJcbiAgfSwgW2lzTGlua01vZGUsIGxpbmtNb2RlQ2FuY2VsTWVzc2FnZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OmVudGVyXCIsIHtcclxuICAgICAgdXJsOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LmxvY2F0aW9uLmhyZWYgOiBcIlwiLFxyXG4gICAgICBkaWRSZXN0b3JlT25Nb3VudDogZGlkUmVzdG9yZU9uTW91bnRSZWYuY3VycmVudCxcclxuICAgICAgaGFzQWNjZXNzLFxyXG4gICAgICBpc0xpbmtNb2RlLFxyXG4gICAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgICB9KTtcclxuICAgIGlmIChkaWRSZXN0b3JlT25Nb3VudFJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzV2FybihcIm1vdW50UmVzdG9yZUVmZmVjdDpza2lwLWFscmVhZHktcmVzdG9yZWRcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghaGFzQWNjZXNzKSB7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzV2FybihcIm1vdW50UmVzdG9yZUVmZmVjdDpza2lwLW5vLWFjY2Vzc1wiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNMaW5rTW9kZSkge1xyXG4gICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgY29uc3QgdGlja2V0RmlsZUlkID0gc2FmZVRleHQodXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJ0aWNrZXRGaWxlSWRcIikpO1xyXG4gICAgICBpZiAodGlja2V0RmlsZUlkKSB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OnRpY2tldC1jcmVhdGUtcmV0dXJuLWRldGVjdGVkXCIsIHtcclxuICAgICAgICAgIHRpY2tldEZpbGVJZCxcclxuICAgICAgICAgIHRpY2tldERhdGU6IHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwidGlja2V0RGF0ZVwiKSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBkaWRSZXN0b3JlT25Nb3VudFJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgICAgICBhcHBseUNyZWF0ZWRUaWNrZXRSZXR1cm4odGlja2V0RmlsZUlkLCB1cmwuc2VhcmNoUGFyYW1zLmdldChcInRpY2tldERhdGVcIikpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICghbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5KSB7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzV2FybihcIm1vdW50UmVzdG9yZUVmZmVjdDp3YWl0aW5nLW1hbmFnZW1lbnQtYm9vdHN0cmFwXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBkaWRSZXN0b3JlT25Nb3VudFJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgIGNvbnN0IGlzSGlzdG9yeUJhY2tGb3J3YXJkID0gaXNFeHBlbnNlSGlzdG9yeUJhY2tGb3J3YXJkTmF2aWdhdGlvbigpO1xyXG4gICAgY29uc3QgaXNSZXR1cm5Gcm9tVGlja2V0RGV0YWlsID0gaGFzRXhwZW5zZVJldHVyblJlZmVycmVyKFtcclxuICAgICAgXCIvR2FzdG9zL1RpY2tldERldGFpbFwiLFxyXG4gICAgICBcIi9HYXN0b3MvVGlja2V0TGluZURldGFpbFwiLFxyXG4gICAgXSk7XHJcbiAgICBjb25zdCByZXR1cm5Nb2RlID0gY29uc3VtZVJldHVybk1vZGUoKTtcclxuICAgIGNvbnN0IGhhc1JldHVybkZsYWcgPSBjb25zdW1lUmV0dXJuRmxhZygpO1xyXG5cclxuICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXNvbHZlZC1yZXR1cm4tc3RhdGVcIiwge1xyXG4gICAgICBpc0hpc3RvcnlCYWNrRm9yd2FyZCxcclxuICAgICAgaXNSZXR1cm5Gcm9tVGlja2V0RGV0YWlsLFxyXG4gICAgICByZXR1cm5Nb2RlLFxyXG4gICAgICBoYXNSZXR1cm5GbGFnLFxyXG4gICAgICBpc0xpbmtNb2RlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHJldHVybk1vZGUgPT09IFwicmVzZXRfZmlsdGVyc1wiICYmIGhhc1JldHVybkZsYWcpIHtcclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OnJlc3RvcmUtZGVsZXRlLXJldHVyblwiKTtcclxuICAgICAgcmVzdG9yZURlbGV0ZVJldHVyblN0YXRlKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNMaW5rTW9kZSkge1xyXG4gICAgICBjb25zdCBpc1JldHVybmluZ0Zyb21EZXRhaWwgPSBoYXNSZXR1cm5GbGFnIHx8IGlzSGlzdG9yeUJhY2tGb3J3YXJkIHx8IGlzUmV0dXJuRnJvbVRpY2tldERldGFpbDtcclxuICAgICAgY29uc3QgY2FjaGVkU3RhdGUgPSBpc1JldHVybmluZ0Zyb21EZXRhaWwgPyByZWFkQ2FjaGVkU3RhdGUoKSA6IG51bGw7XHJcbiAgICAgIGNvbnN0IGNhY2hlZFNoZWV0SWQgPSBzYWZlVGV4dChjYWNoZWRTdGF0ZT8ubGlua01vZGVTaGVldElkKTtcclxuICAgICAgaWYgKGNhY2hlZFN0YXRlICYmIGNhY2hlZFNoZWV0SWQgJiYgY2FjaGVkU2hlZXRJZCA9PT0gc2FmZVRleHQobGlua1NoZWV0SWQpKSB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OnJlc3RvcmUtbGluay1tb2RlLWNhY2hlXCIsIHtcclxuICAgICAgICAgIGNhY2hlZFNoZWV0SWQsXHJcbiAgICAgICAgICBwYWdlOiBjYWNoZWRTdGF0ZS5wYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xyXG4gICAgICAgIHJlc3RvcmVMaW5rTW9kZVJldHVyblN0YXRlKGNhY2hlZFN0YXRlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGxpbmtSZXR1cm5TdGF0ZSA9IGlzUmV0dXJuaW5nRnJvbURldGFpbCA/IHJlYWRFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKGxpbmtTaGVldElkKSA6IG51bGw7XHJcbiAgICAgIGlmIChsaW5rUmV0dXJuU3RhdGUpIHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6cmVzdG9yZS1saW5rLW1vZGUtcmV0dXJuLXN0YXRlXCIsIHtcclxuICAgICAgICAgIHNoZWV0SWQ6IGxpbmtSZXR1cm5TdGF0ZS5zaGVldElkLFxyXG4gICAgICAgICAgcGFnZTogbGlua1JldHVyblN0YXRlLnBhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKCk7XHJcbiAgICAgICAgcmVzdG9yZUxpbmtNb2RlUmV0dXJuU3RhdGUoe1xyXG4gICAgICAgICAgZmlsdGVyczogbGlua1JldHVyblN0YXRlLmZpbHRlcnMsXHJcbiAgICAgICAgICBwYWdlOiBsaW5rUmV0dXJuU3RhdGUucGFnZSxcclxuICAgICAgICAgIHNjcm9sbFk6IGxpbmtSZXR1cm5TdGF0ZS5zY3JvbGxZLFxyXG4gICAgICAgICAgZm9jdXNGaWxlSWQ6IGxpbmtSZXR1cm5TdGF0ZS5mb2N1c0ZpbGVJZCxcclxuICAgICAgICAgIGl0ZW1zOiBbXSxcclxuICAgICAgICAgIHNlbGVjdGVkVGlja2V0czogbGlua1JldHVyblN0YXRlLnNlbGVjdGVkVGlja2V0cyxcclxuICAgICAgICAgIHRvdGFsOiAwLFxyXG4gICAgICAgICAgbGlua01vZGVTaGVldElkOiBsaW5rUmV0dXJuU3RhdGUuc2hlZXRJZCxcclxuICAgICAgICAgIHNlbGVjdGlvbk1vZGU6IGxpbmtSZXR1cm5TdGF0ZS5zZWxlY3Rpb25Nb2RlLFxyXG4gICAgICAgICAgZXhjbHVkZWRJZHM6IGxpbmtSZXR1cm5TdGF0ZS5leGNsdWRlZElkcyxcclxuICAgICAgICAgIGZpbHRlcmVkU2VsZWN0aW9uRmlsdGVyczogbGlua1JldHVyblN0YXRlLmZpbHRlcmVkU2VsZWN0aW9uRmlsdGVycyxcclxuICAgICAgICAgIGZpbHRlcmVkU2VsZWN0aW9uVG90YWw6IGxpbmtSZXR1cm5TdGF0ZS5maWx0ZXJlZFNlbGVjdGlvblRvdGFsLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OnJlc3RvcmUtaW5pdGlhbC1saW5rLW1vZGVcIik7XHJcbiAgICAgIHJlc3RvcmVJbml0aWFsTGlua01vZGVTdGF0ZSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFoYXNSZXR1cm5GbGFnICYmICFpc0hpc3RvcnlCYWNrRm9yd2FyZCAmJiAhaXNSZXR1cm5Gcm9tVGlja2V0RGV0YWlsKSB7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXN0b3JlLWluaXRpYWwtc3RhbmRhcmQtc3RhdGVcIik7XHJcbiAgICAgIHJlc3RvcmVJbml0aWFsU3RhbmRhcmRTdGF0ZSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2FjaGVkU3RhdGUgPSByZWFkQ2FjaGVkU3RhdGUoKTtcclxuICAgIGlmICghY2FjaGVkU3RhdGUpIHtcclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNXYXJuKFwibW91bnRSZXN0b3JlRWZmZWN0Om5vLWNhY2hlZC1zdGF0ZVwiKTtcclxuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OnJlc3RvcmUtc3RhbmRhcmQtY2FjaGVcIiwge1xyXG4gICAgICBwYWdlOiBjYWNoZWRTdGF0ZS5wYWdlLFxyXG4gICAgICBmb2N1c0ZpbGVJZDogY2FjaGVkU3RhdGUuZm9jdXNGaWxlSWQsXHJcbiAgICB9KTtcclxuICAgIHJlc3RvcmVTdGFuZGFyZFJldHVyblN0YXRlKGNhY2hlZFN0YXRlKTtcclxuICB9LCBbXHJcbiAgICBhcHBseUNyZWF0ZWRUaWNrZXRSZXR1cm4sXHJcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxyXG4gICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG4gICAgY29uc3VtZVJldHVybkZsYWcsXHJcbiAgICBjb25zdW1lUmV0dXJuTW9kZSxcclxuICAgIGhhc0FjY2VzcyxcclxuICAgIGlzTGlua01vZGUsXHJcbiAgICBsaW5rU2hlZXRJZCxcclxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICAgIHJlYWRDYWNoZWRTdGF0ZSxcclxuICAgIHJlYWRFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG4gICAgcmVzdG9yZURlbGV0ZVJldHVyblN0YXRlLFxyXG4gICAgcmVzdG9yZUluaXRpYWxMaW5rTW9kZVN0YXRlLFxyXG4gICAgcmVzdG9yZUluaXRpYWxTdGFuZGFyZFN0YXRlLFxyXG4gICAgcmVzdG9yZUxpbmtNb2RlUmV0dXJuU3RhdGUsXHJcbiAgICByZXN0b3JlU3RhbmRhcmRSZXR1cm5TdGF0ZSxcclxuICBdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChpc0xvYWRpbmcpIHJldHVybjtcclxuICAgIGlmIChwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID09IG51bGwgJiYgIXBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcGVuZGluZ1Njcm9sbFkgPSBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50O1xyXG4gICAgY29uc3QgcGVuZGluZ0ZvY3VzRmlsZUlkID0gcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQ7XHJcbiAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50ID0gXCJcIjtcclxuXHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgaWYgKHBlbmRpbmdTY3JvbGxZICE9IG51bGwpIHtcclxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgdG9wOiBNYXRoLm1heCgwLCBwZW5kaW5nU2Nyb2xsWSksXHJcbiAgICAgICAgICBiZWhhdmlvcjogXCJhdXRvXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghcGVuZGluZ0ZvY3VzRmlsZUlkIHx8ICF0aW1lbGluZUNvbnRhaW5lclJlZi5jdXJyZW50KSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBub3JtYWxpemVkRm9jdXNJZCA9IHBlbmRpbmdGb2N1c0ZpbGVJZC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICBjb25zdCB0aW1lbGluZUl0ZW1zID0gQXJyYXkuZnJvbShcclxuICAgICAgICB0aW1lbGluZUNvbnRhaW5lclJlZi5jdXJyZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWl0ZW1bZGF0YS10aWNrZXQtZmlsZS1pZF1cIilcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgbWF0Y2hpbmdJdGVtID0gdGltZWxpbmVJdGVtcy5maW5kKChpdGVtKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNhZmVUZXh0KGl0ZW0uZGF0YXNldC50aWNrZXRGaWxlSWQpLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRGb2N1c0lkO1xyXG4gICAgICB9KTtcclxuICAgICAgY29uc3QgdGFyZ2V0Q2FyZCA9IG1hdGNoaW5nSXRlbT8ucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xyXG4gICAgICBpZiAoIXRhcmdldENhcmQpIHJldHVybjtcclxuXHJcbiAgICAgIHRhcmdldENhcmQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xyXG4gICAgfSk7XHJcbiAgfSwgW2lzTG9hZGluZywgaXRlbXMubGVuZ3RoXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIW1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSB8fCAhaGFzQWNjZXNzKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaGFuZGxlUGFnZVNob3cgPSAoZXZlbnQ6IFBhZ2VUcmFuc2l0aW9uRXZlbnQpID0+IHtcclxuICAgICAgaWYgKCFldmVudC5wZXJzaXN0ZWQgJiYgIWlzRXhwZW5zZUhpc3RvcnlCYWNrRm9yd2FyZE5hdmlnYXRpb24oKSkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3Qgc25hcHNob3QgPSByZXNvbHZlQWN0aXZlRmlsdGVyc0V2ZW50KCk7XG4gICAgICBpZiAoIWlzTGlua01vZGUgJiYgKCFzbmFwc2hvdC5mcm9tRGF0ZSB8fCAhc25hcHNob3QudG9EYXRlKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcnVuQXV0b21hdGljTGlzdExvYWQoY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLCBzbmFwc2hvdCwge1xyXG4gICAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIGhhbmRsZVBhZ2VTaG93KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgaGFuZGxlUGFnZVNob3cpO1xyXG4gICAgfTtcclxuICB9LCBbY3VycmVudFBhZ2UsIGhhc0FjY2VzcywgaXNMaW5rTW9kZSwgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LCBydW5BdXRvbWF0aWNMaXN0TG9hZF0pO1xuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IG9uVG9nZ2xlRmlsdGVycyA9ICgpID0+IHtcclxuICAgICAgY29uc3Qgd2lsbE9wZW4gPSAhc2hvd0ZpbHRlcnM7XHJcbiAgICAgIHRvZ2dsZUZpbHRlclBhbmVsKCk7XHJcbiAgICAgIGlmICh3aWxsT3Blbikge1xyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25SZWZyZXNoID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCBzbmFwc2hvdCA9IHJlc29sdmVBY3RpdmVGaWx0ZXJzRXZlbnQoKTtcbiAgICAgIGlmICghaXNMaW5rTW9kZSAmJiAoIXNuYXBzaG90Py5mcm9tRGF0ZSB8fCAhc25hcHNob3Q/LnRvRGF0ZSkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdm9pZCBsb2FkTGlzdChjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsIHNuYXBzaG90KTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXRpY2tldHMtdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXRpY2tldHMtcmVmcmVzaFwiLCBvblJlZnJlc2gpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXhwZW5zZS10aWNrZXRzLXRvZ2dsZS1maWx0ZXJcIiwgb25Ub2dnbGVGaWx0ZXJzKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXRpY2tldHMtcmVmcmVzaFwiLCBvblJlZnJlc2gpO1xyXG4gICAgfTtcclxuICB9LCBbY3VycmVudFBhZ2UsIGlzTGlua01vZGUsIGxvYWRMaXN0LCBzaG93RmlsdGVycywgdG9nZ2xlRmlsdGVyUGFuZWxdKTtcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxyXG4gICAgICA8Q29uZmlybU1vZGFsXHJcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cclxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XHJcbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cclxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbENhbmNlbFRleHR9XHJcbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XHJcbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cclxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XHJcbiAgICAgICAgYnVzeT17bGlua0Zsb3dCdXN5fVxyXG4gICAgICAgIGVycm9yPXtsaW5rRmxvd0Vycm9yfVxyXG4gICAgICAgIHN0YXR1cz17bGlua0Zsb3dTdGF0dXN9XHJcbiAgICAgICAgb25Db25maXJtPXtoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm19XHJcbiAgICAgICAgb25DYW5jZWw9e2Nsb3NlQ29uZmlybX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxpbnB1dFxyXG4gICAgICAgIHJlZj17Y2FtZXJhSW5wdXRSZWZ9XHJcbiAgICAgICAgdHlwZT1cImZpbGVcIlxyXG4gICAgICAgIGFjY2VwdD17VElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEV9XHJcbiAgICAgICAgY2FwdHVyZT1cImVudmlyb25tZW50XCJcclxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxyXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmZpbGVzPy5bMF0gfHwgbnVsbDtcclxuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgdm9pZCBoYW5kbGVTZWxlY3RlZEZpbGUoZmlsZSwgXCJjYW1lcmFcIik7XHJcbiAgICAgICAgfX1cclxuICAgICAgLz5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgcmVmPXtnYWxsZXJ5SW5wdXRSZWZ9XHJcbiAgICAgICAgdHlwZT1cImZpbGVcIlxyXG4gICAgICAgIGFjY2VwdD17VElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEV9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcclxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQuY3VycmVudFRhcmdldC5maWxlcz8uWzBdIHx8IG51bGw7XHJcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgIHZvaWQgaGFuZGxlU2VsZWN0ZWRGaWxlKGZpbGUsIFwiZ2FsbGVyeVwiKTtcclxuICAgICAgICB9fVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgeyFpc0xpbmtNb2RlICYmIHNvdXJjZVBpY2tlck9wZW4gPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTk1MC80NSBweC00IHB5LTZcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LXNtIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHAtNCBzaGFkb3cteGxcIj5cclxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtWzE2cHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS04MDBcIj5cclxuICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9UaXRsZVwiLCBcIk51ZXZvIHRpY2tldFwiKX1cclxuICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgICAge2luZFQoXHJcbiAgICAgICAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9Cb2R5XCIsXHJcbiAgICAgICAgICAgICAgICBcIlNlbGVjY2lvbmEgdW5hIGZ1ZW50ZSBwYXJhIGNhcHR1cmFyIG8gZWxlZ2lyIGxhIGltYWdlbiBkZWwgdGlja2V0LlwiXHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9wPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IGdyaWQgZ3JpZC1jb2xzLTEgZ2FwLTJcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZvaWQgc2VsZWN0RnJvbUNhbWVyYShjYW1lcmFJbnB1dFJlZi5jdXJyZW50KTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfQ2FtZXJhXCIsIFwiVXNhciBjXHUwMEUxbWFyYVwiKX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RGcm9tR2FsbGVyeShnYWxsZXJ5SW5wdXRSZWYuY3VycmVudCl9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfR2FsbGVyeVwiLCBcIkVsZWdpciBpbWFnZW5cIil9XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17Y2xvc2VTb3VyY2VQaWNrZXJ9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHshaXNMaW5rTW9kZSA/IChcclxuICAgICAgICA8RXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5XHJcbiAgICAgICAgICBvcGVuPXtxdWlja1RpY2tldEJ1c3l9XHJcbiAgICAgICAgICB0aXRsZT17aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX1RpdGxlXCIsIFwiUHJvY2Vzc2luZyB0aWNrZXRcIil9XHJcbiAgICAgICAgICBzdW1tYXJ5PXtxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICAgICAgZWxhcHNlZE1zPXtxdWlja1RpY2tldEVsYXBzZWRNc31cclxuICAgICAgICAgIHN0YWdlcz17cXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlc31cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHshaXNMaW5rTW9kZSAmJiBxdWlja1RpY2tldEVycm9yTWVzc2FnZSA/IChcclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZVxyXG4gICAgICAgICAgICAgID8gXCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1hbWJlci0yMDAgYmctYW1iZXItNTAgcC0zIHRleHQtc20gdGV4dC1hbWJlci05MDBcIlxyXG4gICAgICAgICAgICAgIDogXCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy1yb3NlLTUwIHAtMyB0ZXh0LXNtIHRleHQtcm9zZS04MDBcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxwPntxdWlja1RpY2tldEVycm9yTWVzc2FnZX08L3A+XHJcbiAgICAgICAgICB7cXVpY2tUaWNrZXRBdHRlbXB0SWQgPyAoXHJcbiAgICAgICAgICAgIDxwXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcclxuICAgICAgICAgICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlXHJcbiAgICAgICAgICAgICAgICAgID8gXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBiZy13aGl0ZSBweC0yIHB5LTEgZm9udC1tb25vIHRleHQtWzExcHhdIHRleHQtYW1iZXItOTAwIGJyZWFrLWFsbFwiXHJcbiAgICAgICAgICAgICAgICAgIDogXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXdoaXRlIHB4LTIgcHktMSBmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1yb3NlLTgwMCBicmVhay1hbGxcIlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtgYXR0ZW1wdElkOiAke3F1aWNrVGlja2V0QXR0ZW1wdElkfWB9XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmVcclxuICAgICAgICAgICAgICAgICAgPyBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItYW1iZXItMjAwIGJnLXdoaXRlIHAtMiB0ZXh0LXhzIHRleHQtYW1iZXItODAwXCJcclxuICAgICAgICAgICAgICAgICAgOiBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctd2hpdGUgcC0yIHRleHQteHMgdGV4dC1yb3NlLTcwMFwiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lm1hcCgoZW50cnkpID0+IChcclxuICAgICAgICAgICAgICAgIDxwIGtleT17YCR7ZW50cnkuc3RlcH0tJHtlbnRyeS5hdH1gfT57YCR7ZW50cnkuc3RlcH06ICR7ZW50cnkudHJhY2VJZH1gfTwvcD5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC0yXCI+XG4gICAgICAgICAgICB7aGFzUGVuZGluZ1VwbG9hZFJldHJ5ID8gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZvaWQgcmV0cnlQZW5kaW5nVXBsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUmV0cnlVcGxvYWRcIiwgXCJSZWludGVudGFyIHVwbG9hZFwiKX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIiBvbkNsaWNrPXtjbGVhclF1aWNrVGlja2V0RXJyb3J9PlxyXG4gICAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0Nsb3NlXCIsIFwiQ2xvc2VcIil9XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAge3Nob3dTdW1tYXJ5ID8gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLXN1bW1hcnkgcC0zIHNtOnAtNCBtdC0xIG1iLTNcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhwZW5zZS1zdW1tYXJ5LWdyaWQgZ3JpZCBncmlkLWNvbHMtMSBtaW4tWzM2MHB4XTpncmlkLWNvbHMtMiBpdGVtcy1zdGFydCBnYXAteC00IGdhcC15LTEgdGV4dC14c1wiPlxyXG4gICAgICAgICAgICB7c3VtbWFyeUl0ZW1zLm1hcCgoaXRlbSkgPT4gKFxyXG4gICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGtleT17aXRlbS5rZXl9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdW1tYXJ5IGhpc3RvcnktZmlsdGVyLXN1bW1hcnktLWdyaWQtaXRlbSBsZWFkaW5nLTUgbWluLXctMFwiXHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeV9fbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpdGVtLmxhYmVsfTo8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdW1tYXJ5X192YWx1ZSBicmVhay13b3Jkc1wiPntpdGVtLnZhbHVlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICA8RXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWxcclxuICAgICAgICBtb2RlPXtpc0xpbmtNb2RlID8gXCJsaW5rXCIgOiBcImdlbmVyYWxcIn1cclxuICAgICAgICB2aXNpYmxlPXtzaG93RmlsdGVyc31cclxuICAgICAgICBzaG93TWFudWFsRGF0ZUZpbHRlcj17c2hvd01hbnVhbERhdGVGaWx0ZXJ9XHJcbiAgICAgICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5PXttYW51YWxEYXRlQXV0b09wZW5LZXl9XHJcbiAgICAgICAgZnJvbURhdGU9e2Zyb21EYXRlfVxyXG4gICAgICAgIHRvRGF0ZT17dG9EYXRlfVxyXG4gICAgICAgIGZpbHRlcktleT17ZmlsdGVyS2V5fVxyXG4gICAgICAgIGN1cnJlbmN5Q29kZT17Y3VycmVuY3lDb2RlfVxyXG4gICAgICAgIG1hbmFnZWRVc2VySWQ9e21hbmFnZWRVc2VySWR9XHJcbiAgICAgICAgbWFuYWdlZFVzZXJzPXttYW5hZ2VkVXNlcnN9XHJcbiAgICAgICAgc2hvd01hbmFnZWRVc2VyRmlsdGVyPXtzaG93TWFuYWdlZFVzZXJGaWx0ZXJ9XHJcbiAgICAgICAgc3RhdHVzRmlsdGVyPXtzdGF0dXNGaWx0ZXJ9XHJcbiAgICAgICAgZ2FzdG9UeXBlRmlsdGVyPXtnYXN0b1R5cGVGaWx0ZXJ9XHJcbiAgICAgICAgcHJvY2Vzc2VkQnlJYUZpbHRlcj17cHJvY2Vzc2VkQnlJYUZpbHRlcn1cclxuICAgICAgICBhY3RpdmVRdWlja0ZpbHRlcj17YWN0aXZlUXVpY2tGaWx0ZXJ9XHJcbiAgICAgICAgc2hvd01hbnVhbERhdGVFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvcn1cclxuICAgICAgICBzdGF0dXNGaWx0ZXJSZWFkT25seT17c3RhdHVzRmlsdGVyTG9ja2VkfVxyXG4gICAgICAgIGZpeGVkU3RhdHVzRmlsdGVyPXtmaXhlZFN0YXR1c0ZpbHRlcn1cclxuICAgICAgICBnYXN0b1R5cGVPcHRpb25zPXtnYXN0b1R5cGVPcHRpb25zfVxyXG4gICAgICAgIG9uRGF0ZVJhbmdlQ2hhbmdlPXtvbkRhdGVSYW5nZUNoYW5nZX1cclxuICAgICAgICBvbk1hbnVhbFJhbmdlQ29tcGxldGU9e29uTWFudWFsUmFuZ2VDb21wbGV0ZX1cclxuICAgICAgICBvblF1aWNrRmlsdGVyQ2hhbmdlPXtvblF1aWNrRmlsdGVyQ2hhbmdlfVxyXG4gICAgICAgIG9uRmlsdGVyS2V5Q2hhbmdlPXtzZXRGaWx0ZXJLZXl9XHJcbiAgICAgICAgb25DdXJyZW5jeUNvZGVDaGFuZ2U9e3NldEN1cnJlbmN5Q29kZX1cclxuICAgICAgICBvbk1hbmFnZWRVc2VySWRDaGFuZ2U9e3NldE1hbmFnZWRVc2VySWR9XHJcbiAgICAgICAgb25TdGF0dXNGaWx0ZXJDaGFuZ2U9e3NldFN0YXR1c0ZpbHRlcn1cclxuICAgICAgICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZT17c2V0R2FzdG9UeXBlRmlsdGVyfVxyXG4gICAgICAgIG9uUHJvY2Vzc2VkQnlJYUZpbHRlckNoYW5nZT17c2V0UHJvY2Vzc2VkQnlJYUZpbHRlcn1cclxuICAgICAgICBvbkNsZWFyPXtvbkNsZWFyfVxyXG4gICAgICAgIG9uQXBwbHk9e29uQXBwbHl9XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICB7aXNMaW5rTW9kZSA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBweC0wLjVcIj5cclxuICAgICAgICAgIHshY2FuUHJvY2Vzc0xpbmtNb2RlID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1yb3NlLTcwMFwiPntpbmRUKFwiQXV0aF9QZXJtaXNzaW9uRGVuaWVkX0JvZHlcIiwgXCJObyBwZXJtaXNzaW9uLlwiKX08L2Rpdj5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgIHtjYW5Qcm9jZXNzTGlua01vZGUgJiYgbGlua1NoZWV0Q2hlY2tCdXN5ID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIj5cclxuICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfSAvPlxyXG4gICAgICAgICAgICAgIDxzcGFuPntpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmICFsaW5rU2hlZXRDaGVja0J1c3kgJiYgc2VsZWN0QWxsQnVzeSA/IChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCI+XHJcbiAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNCB3LTRcIiBsYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0gLz5cclxuICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAge2NhblByb2Nlc3NMaW5rTW9kZSAmJiAhbGlua1NoZWV0Q2hlY2tCdXN5ICYmIGxpbmtTaGVldExvY2tlZCA/IChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtcm9zZS03MDBcIj5cclxuICAgICAgICAgICAgICB7bGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UgfHxcclxuICAgICAgICAgICAgICAgIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9SZWFkT25seUJ5U3RhdHVzXCIsIFwiTm8gc2UgcHVlZGUgZWRpdGFyIGVzdGEgaG9qYSBkZSBnYXN0b3MgZW4gZWwgZXN0YWRvIGFjdHVhbC5cIil9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAge2NhblByb2Nlc3NMaW5rTW9kZSAmJiAhbGlua1NoZWV0Q2hlY2tCdXN5ICYmICFsaW5rU2hlZXRMb2NrZWQgJiYgc2VsZWN0QWxsRXJyb3IgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXJvc2UtNzAwXCI+e3NlbGVjdEFsbEVycm9yfTwvZGl2PlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAge2NhblByb2Nlc3NMaW5rTW9kZSAmJiAhbGlua1NoZWV0Q2hlY2tCdXN5ICYmICFsaW5rU2hlZXRMb2NrZWQgPyAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi01IGdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTEuNSBwdC0wLjUgc206bWItNlwiPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIG1pbi13LTAgcHgtMS41IHB5LTEgdGV4dC1bMTBweF0gbGVhZGluZy10aWdodCBzbTp0ZXh0LXhzXCJcclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZvaWQgc2VsZWN0QWxsTWF0Y2hpbmdUaWNrZXRzKCk7XHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtsaW5rTW9kZVNlbGVjdGlvbkJ1dHRvbnNEaXNhYmxlZCB8fCB0b3RhbCA8IDF9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfU2VsZWN0QWxsXCIsIFwiU2VsZWNjaW9uYXIgdG9kb1wiKX1cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIG1pbi13LTAgcHgtMS41IHB5LTEgdGV4dC1bMTBweF0gbGVhZGluZy10aWdodCBzbTp0ZXh0LXhzXCJcclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17Y2xlYXJUaWNrZXRTZWxlY3Rpb259XHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtsaW5rTW9kZVNlbGVjdGlvbkJ1dHRvbnNEaXNhYmxlZCB8fCBzZWxlY3RlZFRpY2tldENvdW50IDwgMX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9DbGVhckFsbFwiLCBcIkJvcnJhciBzZWxlY2NpXHUwMEYzblwiKX1cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHtpc0xpbmtNb2RlID8gPEV4cGVuc2VUaWNrZXRMaW5rQnVsa1N1bW1hcnkgcmVzdWx0PXtsaW5rQnVsa1Jlc3VsdH0gLz4gOiBudWxsfVxyXG5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXHJcbiAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogc2hvd0xpc3RMb2FkaW5nID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBzaXplLTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtlcnJvck1lc3NhZ2UgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxyXG5cclxuICAgICAgeyFzaG93TGlzdExvYWRpbmcgJiYgIWVycm9yTWVzc2FnZSAmJiBpdGVtcy5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2luZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKX0gLz5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICB7IWVycm9yTWVzc2FnZSAmJiBpdGVtcy5sZW5ndGggPiAwID8gKFxyXG4gICAgICAgIDxkaXYgcmVmPXt0aW1lbGluZUNvbnRhaW5lclJlZn0gY2xhc3NOYW1lPVwidGltZWxpbmUtYm94XCI+XHJcbiAgICAgICAgICB7aXRlbXMubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KGl0ZW0uZmlsZUlkKTtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZVBhcnRzID0gZm9ybWF0RXhwZW5zZURhdGVQYXJ0cyhpdGVtLnRyYW5zRGF0ZSwgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCIpO1xyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IHNhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pIHx8IHNhZmVUZXh0KGl0ZW0uZmlsZU5hbWUpIHx8IGZpbGVJZCB8fCBcIi1cIjtcclxuICAgICAgICAgICAgY29uc3QgYW1vdW50VGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShpdGVtLnRvdGFsQW1vdW50ID8/IG51bGwsIHNhZmVUZXh0KGl0ZW0uY3VycmVuY3lDb2RlKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1c0NvZGUgPSBpdGVtLmtpbmQgPT09IFwiZ2VuZXJhbFwiID8gaXRlbS5zdGF0dXMgOiBudWxsO1xyXG4gICAgICAgICAgICBjb25zdCBzdGF0dXNMYWJlbCA9IHN0YXR1c0NvZGUgPT09IG51bGwgPyB1bmRlZmluZWQgOiBnZXRFeHBlbnNlVGlja2V0U3RhdHVzTGFiZWwoc3RhdHVzQ29kZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzQXNzaWduZWRUb0V4cGVuc2VTaGVldCA9IHN0YXR1c0NvZGUgPT09IDE7XHJcbiAgICAgICAgICAgIGNvbnN0IHNob3dQcm9jZXNzZWRCeUFpSWNvbiA9IGl0ZW0ucHJvY2Vzc2VkQnlBSSA9PT0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RhYmxlSW5MaW5rTW9kZSA9IGlzTGlua01vZGUgJiYgY2FuU2VsZWN0VGlja2V0Rm9yTGluayhpdGVtKTtcclxuICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZEluTGlua01vZGUgPSBpc0xpbmtNb2RlICYmIGlzTGlua1RpY2tldFNlbGVjdGVkKGZpbGVJZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZEJ5QWlMYWJlbCA9IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBXCIsIFwiUHJvY2Vzc2VkIGJ5IElBXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RUaWNrZXRMYWJlbCA9IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9TZWxlY3RUaWNrZXRcIiwgXCJTZWxlY2Npb25hciB0aWNrZXRcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGdhc3RvVHlwZUNvZGUgPSBpdGVtLmdhc3RvVHlwZSA9PT0gbnVsbCA/IFwiXCIgOiBTdHJpbmcoaXRlbS5nYXN0b1R5cGUpO1xyXG4gICAgICAgICAgICBjb25zdCBnYXN0b1R5cGVMYWJlbCA9IGdhc3RvVHlwZUNvZGVcclxuICAgICAgICAgICAgICA/IGdhc3RvVHlwZUxhYmVsTWFwLmdldChnYXN0b1R5cGVDb2RlKSB8fCBnYXN0b1R5cGVDb2RlXHJcbiAgICAgICAgICAgICAgOiBpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKTtcclxuICAgICAgICAgICAgY29uc3QgY2FyZFN1YnRpdGxlID0gZ2FzdG9UeXBlTGFiZWw7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpY2tldENhcmRLZXkgPVxyXG4gICAgICAgICAgICAgIGZpbGVJZCB8fFxyXG4gICAgICAgICAgICAgIGAke3NhZmVUZXh0KGl0ZW0uZmlsZU5hbWUpfS0ke3NhZmVUZXh0KGl0ZW0udHJhbnNEYXRlKX0tJHtzYWZlVGV4dChpdGVtLmRlc2NyaXB0aW9uKX0tJHtTdHJpbmcoaXRlbS50b3RhbEFtb3VudCA/PyBcIlwiKX1gO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzTGlua01vZGUgJiYgaXRlbS5raW5kID09PSBcImxpbmtcIikge1xyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpY2tldExpbmtUaW1lbGluZUl0ZW1cclxuICAgICAgICAgICAgICAgICAga2V5PXt0aWNrZXRDYXJkS2V5fVxyXG4gICAgICAgICAgICAgICAgICBmaWxlSWQ9e2ZpbGVJZH1cclxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cclxuICAgICAgICAgICAgICAgICAgc3VidGl0bGU9e2NhcmRTdWJ0aXRsZX1cclxuICAgICAgICAgICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cclxuICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZD17aXNTZWxlY3RlZEluTGlua01vZGV9XHJcbiAgICAgICAgICAgICAgICAgIGlzU2VsZWN0YWJsZT17aXNTZWxlY3RhYmxlSW5MaW5rTW9kZX1cclxuICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uRGlzYWJsZWQ9e2xpbmtGbG93QnVzeSB8fCBsaW5rU2hlZXRDaGVja0J1c3kgfHwgbGlua1NoZWV0TG9ja2VkfVxyXG4gICAgICAgICAgICAgICAgICBzZWxlY3RMYWJlbD17c2VsZWN0VGlja2V0TGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgIG9uT3BlbkRldGFpbD17KCkgPT4gb3BlblRpY2tldERldGFpbChmaWxlSWQpfVxyXG4gICAgICAgICAgICAgICAgICBvblRvZ2dsZVNlbGVjdD17KCkgPT4gdG9nZ2xlVGlja2V0U2VsZWN0aW9uKGl0ZW0pfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBiYXNlU3RhdHVzSWNvbnMgPSBpc0Fzc2lnbmVkVG9FeHBlbnNlU2hlZXQgfHwgc2hvd1Byb2Nlc3NlZEJ5QWlJY29uID8gKFxyXG4gICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICB7aXNBc3NpZ25lZFRvRXhwZW5zZVNoZWV0ID8gKFxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvblwiIHJvbGU9XCJpbWdcIiBhcmlhLWxhYmVsPXtzdGF0dXNMYWJlbH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezEuNX0gc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPVwic2l6ZS00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNMTMuMTkgOC42ODhhNC41IDQuNSAwIDAgMSAxLjI0MiA3LjI0NGwtNC41IDQuNWE0LjUgNC41IDAgMCAxLTYuMzY0LTYuMzY0bDEuNzU3LTEuNzU3bTEzLjM1LS42MjIgMS43NTctMS43NTdhNC41IDQuNSAwIDAgMC02LjM2NC02LjM2NGwtNC41IDQuNWE0LjUgNC41IDAgMCAwIDEuMjQyIDcuMjQ0XCJcclxuICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAgICAgICAge3Nob3dQcm9jZXNzZWRCeUFpSWNvbiA/IChcclxuICAgICAgICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvbiBleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvbi0tYWlcIlxyXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJpbWdcIlxyXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3Byb2Nlc3NlZEJ5QWlMYWJlbH1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPXsxLjV9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cInNpemUtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTQgMThsNC0xMmw0IDEyXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTYgMTNoNFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCA2aDZcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTcgNnYxMlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAxOGg2XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICkgOiBudWxsO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICBrZXk9e3RpY2tldENhcmRLZXl9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0aW1lbGluZS1pdGVtXCJcclxuICAgICAgICAgICAgICAgIGRhdGEtdGlja2V0LWZpbGUtaWQ9e2ZpbGVJZCB8fCB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPEV4cGVuc2VUaW1lbGluZUNhcmRcclxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cclxuICAgICAgICAgICAgICAgICAgc3VidGl0bGU9e2NhcmRTdWJ0aXRsZX1cclxuICAgICAgICAgICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cclxuICAgICAgICAgICAgICAgICAgb25PcGVuPXsoKSA9PiBvcGVuVGlja2V0RGV0YWlsKGZpbGVJZCl9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlQ2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fdGl0bGUgdGltZWxpbmUtbmFtZVwiXHJcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0xhYmVsPXtzdGF0dXNMYWJlbH1cclxuICAgICAgICAgICAgICAgICAgc3RhdHVzSWNvbj17YmFzZVN0YXR1c0ljb25zfVxyXG4gICAgICAgICAgICAgICAgICBzdGF0dXNJY29uQ2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb25zXCJcclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICA8Q29tcGFjdFBhZ2luYXRpb25cclxuICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbFBhZ2VzfVxyXG4gICAgICAgIGN1cnJlbnRQYWdlPXtjdXJyZW50UGFnZX1cclxuICAgICAgICBsb2FkaW5nPXtpc0xvYWRpbmd9XHJcbiAgICAgICAgb25QYWdlQ2hhbmdlPXsocGFnZSkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgc25hcHNob3QgPSByZXNvbHZlQWN0aXZlRmlsdGVycygpO1xyXG4gICAgICAgICAgaWYgKCFpc0xpbmtNb2RlICYmICghc25hcHNob3Q/LmZyb21EYXRlIHx8ICFzbmFwc2hvdD8udG9EYXRlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdm9pZCBsb2FkTGlzdChwYWdlLCBzbmFwc2hvdCk7XHJcbiAgICAgICAgfX1cclxuICAgICAgICBsYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICB7aXNMaW5rTW9kZSAmJiBjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiAhbGlua1NoZWV0TG9ja2VkID8gKFxyXG4gICAgICAgIDxQYWdlQm90dG9tQWN0aW9ucyBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9MaW5rQnV0dG9uXCIsIFwiVmluY3VsYXIgdGlja2V0KHMpXCIpfT5cclxuICAgICAgICAgIDxQYWdlQm90dG9tQWN0aW9uQnV0dG9uXHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfTGlua0J1dHRvblwiLCBcIlZpbmN1bGFyIHRpY2tldChzKVwiKX1cclxuICAgICAgICAgICAgb25DbGljaz17b3BlbkxpbmtDb25maXJtTW9kYWx9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtsaW5rRmxvd0J1c3kgfHwgc2VsZWN0QWxsQnVzeSB8fCBzZWxlY3RlZFRpY2tldENvdW50IDwgMX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9QYWdlQm90dG9tQWN0aW9ucz5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICB7Y2FuQ3JlYXRlVGlja2V0ICYmICFpc0xpbmtNb2RlID8gKFxyXG4gICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxyXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJcdTAwRTFwaWRhc1wiKX1cclxuICAgICAgICAgIHNpemU9ezc2fVxyXG4gICAgICAgICAgcmlnaHQ9ezE2fVxyXG4gICAgICAgICAgYm90dG9tPXsyNH1cclxuICAgICAgICAgIG1lbnVBcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgclx1MDBFMXBpZGFzXCIpfVxyXG4gICAgICAgICAgbWVudUl0ZW1zPXtmYWJNZW51SXRlbXN9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gTWFpbiBwYWdlIGVudHJ5IGZvciBleHBlbnNlIHRpY2tldHMgbGlzdC5cclxuY29uc3QgRXhwZW5zZVRpY2tldHNQYWdlID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnMgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQ+XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0c1BhZ2VDb250ZW50IC8+XHJcbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS10aWNrZXRzLXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VUaWNrZXRzUGFnZSAvPik7XHJcbn07XHJcblxyXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRzUGFnZTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBDaGVja0ljb24gfSBmcm9tIFwiQGhlcm9pY29ucy9yZWFjdC8yNC9vdXRsaW5lXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZURhdGVQYXJ0cyB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVRpbWVsaW5lQ2FyZCBmcm9tIFwiLi9FeHBlbnNlVGltZWxpbmVDYXJkLnRzeFwiO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbVByb3BzID0ge1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGRhdGVQYXJ0czogRXhwZW5zZURhdGVQYXJ0cztcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIHN1YnRpdGxlOiBzdHJpbmc7XHJcbiAgYW1vdW50VGV4dDogc3RyaW5nO1xyXG4gIGlzU2VsZWN0ZWQ6IGJvb2xlYW47XHJcbiAgaXNTZWxlY3RhYmxlOiBib29sZWFuO1xyXG4gIHNlbGVjdGlvbkRpc2FibGVkOiBib29sZWFuO1xyXG4gIHNlbGVjdExhYmVsOiBzdHJpbmc7XHJcbiAgb25PcGVuRGV0YWlsOiAoKSA9PiB2b2lkO1xyXG4gIG9uVG9nZ2xlU2VsZWN0OiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gTGluay1tb2RlIHRpY2tldCBjYXJkOiBjZW50ZXIgb3BlbnMgdGhlIHJlYWQtb25seSBkZXRhaWwgYW5kIHRoZSByaWdodCByYWlsIHRvZ2dsZXMgc2VsZWN0aW9uLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbSA9ICh7XHJcbiAgZmlsZUlkLFxyXG4gIGRhdGVQYXJ0cyxcclxuICB0aXRsZSxcclxuICBzdWJ0aXRsZSxcclxuICBhbW91bnRUZXh0LFxyXG4gIGlzU2VsZWN0ZWQsXHJcbiAgaXNTZWxlY3RhYmxlLFxyXG4gIHNlbGVjdGlvbkRpc2FibGVkLFxyXG4gIHNlbGVjdExhYmVsLFxyXG4gIG9uT3BlbkRldGFpbCxcclxuICBvblRvZ2dsZVNlbGVjdCxcclxufTogRXhwZW5zZVRpY2tldExpbmtUaW1lbGluZUl0ZW1Qcm9wcykgPT4ge1xyXG4gIGNvbnN0IGNhblRvZ2dsZVNlbGVjdGlvbiA9IGlzU2VsZWN0YWJsZSAmJiAhc2VsZWN0aW9uRGlzYWJsZWQ7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU9wZW5EZXRhaWwgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBvbk9wZW5EZXRhaWwoKTtcclxuICB9LCBbb25PcGVuRGV0YWlsXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVRvZ2dsZVNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghY2FuVG9nZ2xlU2VsZWN0aW9uKSByZXR1cm47XHJcbiAgICBvblRvZ2dsZVNlbGVjdCgpO1xyXG4gIH0sIFtjYW5Ub2dnbGVTZWxlY3Rpb24sIG9uVG9nZ2xlU2VsZWN0XSk7XHJcblxyXG4gIGNvbnN0IHNlbGVjdGlvbkluZGljYXRvclRvbmVDbGFzc05hbWUgPSBpc1NlbGVjdGVkXHJcbiAgICA/IFwiYm9yZGVyLXByaW1hcnkgYmctcHJpbWFyeSB0ZXh0LXdoaXRlIHNoYWRvdy1zbVwiXHJcbiAgICA6IGNhblRvZ2dsZVNlbGVjdGlvblxyXG4gICAgICA/IFwiYm9yZGVyLXNsYXRlLTMwMCBiZy13aGl0ZSB0ZXh0LXRyYW5zcGFyZW50IGdyb3VwLWhvdmVyOmJvcmRlci1wcmltYXJ5IGdyb3VwLWhvdmVyOmJnLXByaW1hcnkvNVwiXHJcbiAgICAgIDogXCJib3JkZXItc2xhdGUtMjAwIGJnLXNsYXRlLTEwMCB0ZXh0LXRyYW5zcGFyZW50XCI7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzTmFtZT17aXNTZWxlY3RlZCA/IFwidGltZWxpbmUtaXRlbSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSByaW5nLTIgcmluZy1wcmltYXJ5LzMwXCIgOiBcInRpbWVsaW5lLWl0ZW1cIn1cclxuICAgICAgZGF0YS10aWNrZXQtZmlsZS1pZD17ZmlsZUlkIHx8IHVuZGVmaW5lZH1cclxuICAgICAgZGF0YS10aWNrZXQtc2VsZWN0ZWQ9e2lzU2VsZWN0ZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIn1cclxuICAgICAgZGF0YS10aWNrZXQtc2VsZWN0YWJsZT17Y2FuVG9nZ2xlU2VsZWN0aW9uID8gXCJ0cnVlXCIgOiBcImZhbHNlXCJ9XHJcbiAgICA+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxyXG4gICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XHJcbiAgICAgICAgICB0aXRsZT17dGl0bGV9XHJcbiAgICAgICAgICBzdWJ0aXRsZT17c3VidGl0bGV9XHJcbiAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxyXG4gICAgICAgICAgb25PcGVuPXtoYW5kbGVPcGVuRGV0YWlsfVxyXG4gICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX190aXRsZSB0aW1lbGluZS1uYW1lXCJcclxuICAgICAgICAgIGludGVyYWN0aW9uUHJvcHM9e3tcclxuICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IHRpdGxlLFxyXG4gICAgICAgICAgICBvbkNvbnRleHRNZW51OiAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgIGFyaWEtbGFiZWw9e3NlbGVjdExhYmVsfVxyXG4gICAgICAgICAgYXJpYS1wcmVzc2VkPXtpc1NlbGVjdGVkfVxyXG4gICAgICAgICAgdGl0bGU9e3NlbGVjdExhYmVsfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9eyFjYW5Ub2dnbGVTZWxlY3Rpb259XHJcbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVUb2dnbGVTZWxlY3Rpb259XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJncm91cCBhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCB6LTEwIGZsZXggdy1bNC4yNXJlbV0gaXRlbXMtc3RhcnQganVzdGlmeS1lbmQgcm91bmRlZC1yLVt2YXIoLS1yYWRpdXMteGwpXSBiZy10cmFuc3BhcmVudCBwLTEuNSB0cmFuc2l0aW9uIGZvY3VzLXZpc2libGU6b3V0bGluZS1ub25lIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy1wcmltYXJ5LzM1IGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBzbTp3LVs0Ljc1cmVtXVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBoLVszMHB4XSB3LVszMHB4XSBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIHRyYW5zaXRpb24gJHtzZWxlY3Rpb25JbmRpY2F0b3JUb25lQ2xhc3NOYW1lfWB9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxDaGVja0ljb24gY2xhc3NOYW1lPVwiaC1bMjBweF0gdy1bMjBweF1cIiBzdHJva2VXaWR0aD17Mi4zfSBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0byB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXRMaW5rQnVsa1N1bW1hcnlQcm9wcyA9IHtcclxuICByZXN1bHQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvIHwgbnVsbDtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldExpbmtJc3N1ZUxpc3RQcm9wcyA9IHtcclxuICBpdGVtczogQXJyYXk8eyB0aWNrZXRJZDogc3RyaW5nOyByZWFzb246IHN0cmluZyB9PjtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIHRvbmVDbGFzc05hbWU6IHN0cmluZztcclxufTtcclxuXHJcbi8vIFJlbmRlcnMgb25lIHNraXBwZWQgb3IgZmFpbGVkIHRpY2tldCBsaXN0IHdpdGggc3RhYmxlIGtleXMuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5rSXNzdWVMaXN0ID0gKHsgaXRlbXMsIHRpdGxlLCB0b25lQ2xhc3NOYW1lIH06IEV4cGVuc2VUaWNrZXRMaW5rSXNzdWVMaXN0UHJvcHMpID0+IHtcclxuICBpZiAoaXRlbXMubGVuZ3RoIDwgMSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17YHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBwLTMgJHt0b25lQ2xhc3NOYW1lfWB9PlxyXG4gICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGRcIj57dGl0bGV9PC9wPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIgc3BhY2UteS0yXCI+XHJcbiAgICAgICAge2l0ZW1zLm1hcCgoaXRlbSkgPT4gKFxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBrZXk9e2Ake2l0ZW0udGlja2V0SWQgfHwgXCJ1bmtub3duXCJ9LSR7aXRlbS5yZWFzb24gfHwgXCJuby1yZWFzb25cIn1gfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLWN1cnJlbnQvMTUgYmctd2hpdGUvODAgcC0yIHRleHQteHNcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkXCI+e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9GaWx0ZXJLZXlcIiwgXCJUaWNrZXRcIil9Ojwvc3Bhbj57XCIgXCJ9XHJcbiAgICAgICAgICAgICAgPHNwYW4+e2l0ZW0udGlja2V0SWQgfHwgXCItXCJ9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTFcIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRSZWFzb25cIiwgXCJNb3Rpdm9cIil9Ojwvc3Bhbj57XCIgXCJ9XHJcbiAgICAgICAgICAgICAgPHNwYW4+e2l0ZW0ucmVhc29uIHx8IFwiLVwifTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIFNob3dzIHRoZSBiYWNrZW5kIGJ1bGstbGluayByZXN1bHQgc3VtbWFyeSwgaW5jbHVkaW5nIHBhcnRpYWwgc2tpcHBlZCBhbmQgZmFpbGVkIHJlYXNvbnMuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5rQnVsa1N1bW1hcnkgPSAoeyByZXN1bHQgfTogRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeVByb3BzKSA9PiB7XHJcbiAgaWYgKCFyZXN1bHQpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBzdW1tYXJ5Um93cyA9IFtcclxuICAgIHtcclxuICAgICAga2V5OiBcInJlcXVlc3RlZFwiLFxyXG4gICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdFJlcXVlc3RlZFwiLCBcIlNvbGljaXRhZG9zXCIpLFxyXG4gICAgICB2YWx1ZTogcmVzdWx0LnJlcXVlc3RlZENvdW50LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAga2V5OiBcImxpbmtlZFwiLFxyXG4gICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdExpbmtlZFwiLCBcIlZpbmN1bGFkb3NcIiksXHJcbiAgICAgIHZhbHVlOiByZXN1bHQubGlua2VkQ291bnQsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBrZXk6IFwic2tpcHBlZFwiLFxyXG4gICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdFNraXBwZWRcIiwgXCJPbWl0aWRvc1wiKSxcclxuICAgICAgdmFsdWU6IHJlc3VsdC5za2lwcGVkQ291bnQsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBrZXk6IFwiZmFpbGVkXCIsXHJcbiAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0RmFpbGVkXCIsIFwiRmFsbGlkb3NcIiksXHJcbiAgICAgIHZhbHVlOiByZXN1bHQuZmFpbGVkQ291bnQsXHJcbiAgICB9LFxyXG4gIF07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIHNwYWNlLXktMyByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZS85NSBwLTNcIj5cclxuICAgICAgPGRpdj5cclxuICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDBcIj5cclxuICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0VGl0bGVcIiwgXCJSZXN1bHRhZG8gZGUgdmluY3VsYWNpXHUwMEYzblwiKX1cclxuICAgICAgICA8L3A+XHJcbiAgICAgICAge3Jlc3VsdC5leHBlbnNlU2hlZXRJZCA/IChcclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC14cyB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1NoZWV0XCIsIFwiRXhwZW5zZSBzaGVldFwiKX06IHtyZXN1bHQuZXhwZW5zZVNoZWV0SWR9XHJcbiAgICAgICAgICA8L3A+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yIHNtOmdyaWQtY29scy00XCI+XHJcbiAgICAgICAge3N1bW1hcnlSb3dzLm1hcCgoaXRlbSkgPT4gKFxyXG4gICAgICAgICAgPGRpdiBrZXk9e2l0ZW0ua2V5fSBjbGFzc05hbWU9XCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy1zbGF0ZS01MCBweC0zIHB5LTIgdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMTRlbV0gdGV4dC1zbGF0ZS01MDBcIj57aXRlbS5sYWJlbH08L3A+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC14bCBmb250LXNlbWlib2xkIHRleHQtcHJpbWFyeVwiPntpdGVtLnZhbHVlfTwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBnYXAtMyBsZzpncmlkLWNvbHMtMlwiPlxyXG4gICAgICAgIDxFeHBlbnNlVGlja2V0TGlua0lzc3VlTGlzdFxyXG4gICAgICAgICAgdGl0bGU9e2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRTa2lwcGVkXCIsIFwiT21pdGlkb3NcIil9XHJcbiAgICAgICAgICBpdGVtcz17QXJyYXkuaXNBcnJheShyZXN1bHQuc2tpcHBlZCkgPyByZXN1bHQuc2tpcHBlZCA6IFtdfVxyXG4gICAgICAgICAgdG9uZUNsYXNzTmFtZT1cImJvcmRlci1hbWJlci0yMDAgYmctYW1iZXItNTAgdGV4dC1hbWJlci05MDBcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPEV4cGVuc2VUaWNrZXRMaW5rSXNzdWVMaXN0XHJcbiAgICAgICAgICB0aXRsZT17aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdEZhaWxlZFwiLCBcIkZhbGxpZG9zXCIpfVxyXG4gICAgICAgICAgaXRlbXM9e0FycmF5LmlzQXJyYXkocmVzdWx0LmZhaWxlZCkgPyByZXN1bHQuZmFpbGVkIDogW119XHJcbiAgICAgICAgICB0b25lQ2xhc3NOYW1lPVwiYm9yZGVyLXJvc2UtMjAwIGJnLXJvc2UtNTAgdGV4dC1yb3NlLTkwMFwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgdHlwZSB7IEF1dGhNYW5hZ2VkVXNlciB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IEhpc3RvcnlTdW1tYXJ5IGZyb20gXCIuLi8uLi92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5U3VtbWFyeS50c3hcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHtcclxuICBnZXRFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyT3B0aW9ucyxcclxuICBub3JtYWxpemVFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSxcclxuICB0eXBlIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlLFxyXG59IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsIEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkIH0gZnJvbSBcIi4uL3RpY2tldHMvZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXIgZnJvbSBcIi4vRXhwZW5zZURhdGVSYW5nZUZpbHRlci50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VGaWx0ZXJBY3Rpb25zIGZyb20gXCIuL0V4cGVuc2VGaWx0ZXJBY3Rpb25zLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMgZnJvbSBcIi4vRXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQgZnJvbSBcIi4vRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0LnRzeFwiO1xyXG5cclxuY29uc3QgcGFyc2VJc29EYXRlID0gKHJhdzogc3RyaW5nKTogRGF0ZSB8IG51bGwgPT4ge1xyXG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcclxuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcpLnRyaW0oKS5zcGxpdChcIlRcIilbMF07XHJcbiAgaWYgKCEvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdCh2YWx1ZSkpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IHZhbHVlLnNwbGl0KFwiLVwiKS5tYXAoTnVtYmVyKTtcclxuICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0RGF0ZSA9IChyYXc6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGRhdGUgPSBwYXJzZUlzb0RhdGUocmF3KTtcclxuICBpZiAoIWRhdGUpIHJldHVybiBcIi0tXCI7XHJcbiAgcmV0dXJuIGRhdGVcclxuICAgIC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7XHJcbiAgICAgIGRheTogXCJudW1lcmljXCIsXHJcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXHJcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxyXG4gICAgfSlcclxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcclxuICAgIC50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbFByb3BzID0ge1xyXG4gIG1vZGU6IFwiZ2VuZXJhbFwiIHwgXCJsaW5rXCI7XHJcbiAgdmlzaWJsZTogYm9vbGVhbjtcclxuICBzaG93TWFudWFsRGF0ZUZpbHRlcjogYm9vbGVhbjtcclxuICBtYW51YWxEYXRlQXV0b09wZW5LZXk6IG51bWJlcjtcclxuICBmcm9tRGF0ZTogc3RyaW5nO1xyXG4gIHRvRGF0ZTogc3RyaW5nO1xyXG4gIGZpbHRlcktleTogc3RyaW5nO1xyXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIG1hbmFnZWRVc2VySWQ6IHN0cmluZztcclxuICBtYW5hZ2VkVXNlcnM6IEF1dGhNYW5hZ2VkVXNlcltdO1xyXG4gIHNob3dNYW5hZ2VkVXNlckZpbHRlcjogYm9vbGVhbjtcclxuICBzdGF0dXNGaWx0ZXI6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlO1xyXG4gIGdhc3RvVHlwZUZpbHRlcjogXCJcIiB8IEV4cGVuc2VHYXN0b1R5cGVDb2RlO1xyXG4gIHByb2Nlc3NlZEJ5SWFGaWx0ZXI6IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyO1xyXG4gIGFjdGl2ZVF1aWNrRmlsdGVyOiBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCB8IG51bGw7XHJcbiAgc2hvd01hbnVhbERhdGVFcnJvcjogYm9vbGVhbjtcclxuICBzdGF0dXNGaWx0ZXJSZWFkT25seT86IGJvb2xlYW47XHJcbiAgZml4ZWRTdGF0dXNGaWx0ZXI/OiAwIHwgMSB8IG51bGw7XHJcbiAgZ2FzdG9UeXBlT3B0aW9uczogRXhwZW5zZVNlbGVjdE9wdGlvbltdO1xyXG4gIG9uRGF0ZVJhbmdlQ2hhbmdlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25NYW51YWxSYW5nZUNvbXBsZXRlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25RdWlja0ZpbHRlckNoYW5nZTogKGZpbHRlcklkOiBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCkgPT4gdm9pZDtcclxuICBvbkZpbHRlcktleUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uTWFuYWdlZFVzZXJJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25TdGF0dXNGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpID0+IHZvaWQ7XHJcbiAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogXCJcIiB8IEV4cGVuc2VHYXN0b1R5cGVDb2RlKSA9PiB2b2lkO1xyXG4gIG9uUHJvY2Vzc2VkQnlJYUZpbHRlckNoYW5nZTogKHZhbHVlOiBFeHBlbnNlVGlja2V0UHJvY2Vzc2VkQnlJYUZpbHRlcikgPT4gdm9pZDtcclxuICBvbkNsZWFyOiAoKSA9PiB2b2lkO1xyXG4gIG9uQXBwbHk6ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBTaGFyZWQgdGlja2V0cyBmaWx0ZXIgcGFuZWwgd2l0aCBnbG9iYWwgcXVpY2sgZGF0ZSBmaWx0ZXJzIGFuZCBmaXhlZCB0aWNrZXQgZmlsdGVycy5cclxuY29uc3QgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWwgPSAoe1xyXG4gIG1vZGUsXHJcbiAgdmlzaWJsZSxcclxuICBzaG93TWFudWFsRGF0ZUZpbHRlcixcclxuICBtYW51YWxEYXRlQXV0b09wZW5LZXksXHJcbiAgZnJvbURhdGUsXHJcbiAgdG9EYXRlLFxyXG4gIGZpbHRlcktleSxcclxuICBjdXJyZW5jeUNvZGUsXHJcbiAgbWFuYWdlZFVzZXJJZCxcclxuICBtYW5hZ2VkVXNlcnMsXHJcbiAgc2hvd01hbmFnZWRVc2VyRmlsdGVyLFxyXG4gIHN0YXR1c0ZpbHRlcixcclxuICBnYXN0b1R5cGVGaWx0ZXIsXHJcbiAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICBhY3RpdmVRdWlja0ZpbHRlcixcclxuICBzaG93TWFudWFsRGF0ZUVycm9yLFxyXG4gIHN0YXR1c0ZpbHRlclJlYWRPbmx5ID0gZmFsc2UsXHJcbiAgZml4ZWRTdGF0dXNGaWx0ZXIgPSBudWxsLFxyXG4gIGdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgb25EYXRlUmFuZ2VDaGFuZ2UsXHJcbiAgb25NYW51YWxSYW5nZUNvbXBsZXRlLFxyXG4gIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXHJcbiAgb25GaWx0ZXJLZXlDaGFuZ2UsXHJcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2UsXHJcbiAgb25NYW5hZ2VkVXNlcklkQ2hhbmdlLFxyXG4gIG9uU3RhdHVzRmlsdGVyQ2hhbmdlLFxyXG4gIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlLFxyXG4gIG9uUHJvY2Vzc2VkQnlJYUZpbHRlckNoYW5nZSxcclxuICBvbkNsZWFyLFxyXG4gIG9uQXBwbHksXHJcbn06IEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsUHJvcHMpID0+IHtcclxuICBjb25zdCBzdGF0dXNPcHRpb25zID0gdXNlTWVtbygoKSA9PiBnZXRFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyT3B0aW9ucygpLCBbXSk7XHJcblxyXG4gIGNvbnN0IGNhdGVnb3J5T3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7IHZhbHVlOiBcIlwiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfQWxsXCIsIFwiQWxsXCIpIH0sXHJcbiAgICAgIC4uLmdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgICBdO1xyXG4gIH0sIFtnYXN0b1R5cGVPcHRpb25zXSk7XHJcblxyXG4gIGlmICghdmlzaWJsZSkgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgbG9jYWxlID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCI7XHJcbiAgY29uc3Qgc2hvd0lubGluZURhdGVTdW1tYXJ5ID0gIXNob3dNYW51YWxEYXRlRmlsdGVyICYmICEhZnJvbURhdGUgJiYgISF0b0RhdGU7XHJcbiAgY29uc3Qgc2hvd1N0YXR1c0ZpbHRlciA9IG1vZGUgPT09IFwiZ2VuZXJhbFwiO1xyXG4gIGNvbnN0IGRlc2t0b3BDb2x1bW5zQ2xhc3NOYW1lID0gc2hvd01hbmFnZWRVc2VyRmlsdGVyXHJcbiAgICA/IChzaG93U3RhdHVzRmlsdGVyID8gXCJsZzpncmlkLWNvbHMtNlwiIDogXCJsZzpncmlkLWNvbHMtNVwiKVxyXG4gICAgOiAoc2hvd1N0YXR1c0ZpbHRlciA/IFwibGc6Z3JpZC1jb2xzLTVcIiA6IFwibGc6Z3JpZC1jb2xzLTRcIik7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1leHBhbmRlZCBwLTIgc206cC0yLjUgcmVsYXRpdmVcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdGFjayBmbGV4IGZsZXgtY29sIHNwYWNlLXktMlwiPlxyXG4gICAgICAgIDxFeHBlbnNlUXVpY2tEYXRlRmlsdGVycyBhY3RpdmVRdWlja0ZpbHRlcj17YWN0aXZlUXVpY2tGaWx0ZXJ9IG9uUXVpY2tGaWx0ZXJDaGFuZ2U9e29uUXVpY2tGaWx0ZXJDaGFuZ2V9IC8+XHJcblxyXG4gICAgICAgIHtzaG93TWFudWFsRGF0ZUZpbHRlciA/IChcclxuICAgICAgICAgIDxFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyXHJcbiAgICAgICAgICAgIGZyb21EYXRlPXtmcm9tRGF0ZX1cclxuICAgICAgICAgICAgdG9EYXRlPXt0b0RhdGV9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRhdGVSYW5nZUNoYW5nZX1cclxuICAgICAgICAgICAgb25SYW5nZUNvbXBsZXRlPXtvbk1hbnVhbFJhbmdlQ29tcGxldGV9XHJcbiAgICAgICAgICAgIGF1dG9PcGVuUmVxdWVzdElkPXttYW51YWxEYXRlQXV0b09wZW5LZXl9XHJcbiAgICAgICAgICAgIHNob3dNYW51YWxFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvcn1cclxuICAgICAgICAgICAgc2hvd1N0YXJ0RXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3IgJiYgIWZyb21EYXRlfVxyXG4gICAgICAgICAgICBzaG93RW5kRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3IgJiYgIXRvRGF0ZX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IHNob3dJbmxpbmVEYXRlU3VtbWFyeSA/IChcclxuICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxyXG4gICAgICAgICAgICBzdW1tYXJ5RnJvbUxhYmVsPXtpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKX1cclxuICAgICAgICAgICAgc3VtbWFyeVRvTGFiZWw9e2luZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIil9XHJcbiAgICAgICAgICAgIGZyb21WYWx1ZT17Zm9ybWF0RGF0ZShmcm9tRGF0ZSwgbG9jYWxlKX1cclxuICAgICAgICAgICAgdG9WYWx1ZT17Zm9ybWF0RGF0ZSh0b0RhdGUsIGxvY2FsZSl9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImdhcC15LTEgdGV4dC1bMTFweF0gcHgtMVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgJHtkZXNrdG9wQ29sdW1uc0NsYXNzTmFtZX0gZ2FwLTJgfT5cclxuICAgICAgICAgIDxFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9GaWx0ZXJLZXlcIiwgXCJUaWNrZXRcIil9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfRmlsdGVyS2V5XCIsIFwiVGlja2V0XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17ZmlsdGVyS2V5fVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25GaWx0ZXJLZXlDaGFuZ2V9XHJcbiAgICAgICAgICAgIG1vZGU9e21vZGV9XHJcbiAgICAgICAgICAgIGNyZWF0ZWREYXRlRnJvbT17ZnJvbURhdGV9XHJcbiAgICAgICAgICAgIGNyZWF0ZWREYXRlVG89e3RvRGF0ZX1cclxuICAgICAgICAgICAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnNcclxuICAgICAgICAgICAgZml4ZWRTdGF0dXNGaWx0ZXI9e21vZGUgPT09IFwiZ2VuZXJhbFwiID8gZml4ZWRTdGF0dXNGaWx0ZXIgOiBudWxsfVxyXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17Y3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25DdXJyZW5jeUNvZGVDaGFuZ2V9XHJcbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAgIHNob3dMb2FkaW5nU3RhdGVUZXh0PXtmYWxzZX1cclxuICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAge3Nob3dNYW5hZ2VkVXNlckZpbHRlciA/IChcclxuICAgICAgICAgICAgPEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiQ29tbW9uX1VzZXJcIiwgXCJVc2VyXCIpfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiQ29tbW9uX1VzZXJcIiwgXCJVc2VyXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXttYW5hZ2VkVXNlcklkfVxyXG4gICAgICAgICAgICAgIHVzZXJzPXttYW5hZ2VkVXNlcnN9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uTWFuYWdlZFVzZXJJZENoYW5nZX1cclxuICAgICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAge3Nob3dTdGF0dXNGaWx0ZXIgPyAoXHJcbiAgICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfVxyXG4gICAgICAgICAgICAgIG9wdGlvbnM9e3N0YXR1c09wdGlvbnN9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e3N0YXR1c0ZpbHRlcn1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4gb25TdGF0dXNGaWx0ZXJDaGFuZ2Uobm9ybWFsaXplRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUobmV4dFZhbHVlLCBcIlwiKSl9XHJcbiAgICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtzdGF0dXNGaWx0ZXJSZWFkT25seX1cclxuICAgICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLXRpY2tldC1zdGF0dXMtZmlsdGVyXCJcclxuICAgICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxyXG4gICAgICAgICAgICBvcHRpb25zPXtjYXRlZ29yeU9wdGlvbnN9XHJcbiAgICAgICAgICAgIHZhbHVlPXtnYXN0b1R5cGVGaWx0ZXJ9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKG5leHRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgaWYgKG5leHRWYWx1ZSA9PT0gXCJcIiB8fCAhTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpKSB7XHJcbiAgICAgICAgICAgICAgICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZShcIlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2UocGFyc2VkIGFzIEV4cGVuc2VHYXN0b1R5cGVDb2RlKTtcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxyXG4gICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLXRpY2tldC1nYXN0b3R5cGUtZmlsdGVyXCJcclxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8RXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3RcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBXCIsIFwiUHJvY2Vzc2VkIGJ5IElBXCIpfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtwcm9jZXNzZWRCeUlhRmlsdGVyfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlfVxyXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPEV4cGVuc2VGaWx0ZXJBY3Rpb25zXHJcbiAgICAgICAgICBjbGVhckxhYmVsPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xlYXJcIiwgXCJDbGVhclwiKX1cclxuICAgICAgICAgIGFwcGx5TGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9BcHBseVwiLCBcIkFwcGx5XCIpfVxyXG4gICAgICAgICAgb25DbGVhcj17b25DbGVhcn1cclxuICAgICAgICAgIG9uQXBwbHk9e29uQXBwbHl9XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWw7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyIH0gZnJvbSBcIi4uL3RpY2tldHMvZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdFByb3BzID0ge1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuICB2YWx1ZTogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXI7XHJcbiAgb25DaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIpID0+IHZvaWQ7XHJcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBzaG93TGFiZWw/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gRml4ZWQgZW51bSBzZWxlY3QgZm9yIElBIHByb2Nlc3NpbmcgZmlsdGVyIHdpdGggQWxsL1llcy9ObyBvcHRpb25zLlxyXG5jb25zdCBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdCA9ICh7XHJcbiAgbGFiZWwsXHJcbiAgcGxhY2Vob2xkZXIsXHJcbiAgdmFsdWUsXHJcbiAgb25DaGFuZ2UsXHJcbiAgcmVhZE9ubHkgPSBmYWxzZSxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIHNob3dMYWJlbCA9IHRydWUsXHJcbn06IEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0UHJvcHMpID0+IHtcclxuICBjb25zdCB1aVZhbHVlID0gdmFsdWUgPT09IFwiYWxsXCIgPyBcIlwiIDogdmFsdWU7XHJcbiAgY29uc3Qgb3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPihcclxuICAgICgpID0+IFtcclxuICAgICAgeyB2YWx1ZTogXCJhbGxcIiwgdGV4dDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0FsbFwiLCBcIkFsbFwiKSB9LFxyXG4gICAgICB7IHZhbHVlOiBcInllc1wiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9ZZXNcIiwgXCJZZXNcIikgfSxcclxuICAgICAgeyB2YWx1ZTogXCJub1wiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9Ob1wiLCBcIk5vXCIpIH0sXHJcbiAgICBdLFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgIGxhYmVsPXtsYWJlbH1cclxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICBvcHRpb25zPXtvcHRpb25zfVxyXG4gICAgICB2YWx1ZT17dWlWYWx1ZX1cclxuICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IHtcclxuICAgICAgICBpZiAobmV4dFZhbHVlID09PSBcInllc1wiIHx8IG5leHRWYWx1ZSA9PT0gXCJub1wiIHx8IG5leHRWYWx1ZSA9PT0gXCJhbGxcIikge1xyXG4gICAgICAgICAgb25DaGFuZ2UobmV4dFZhbHVlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgb25DaGFuZ2UoXCJhbGxcIik7XHJcbiAgICAgIH19XHJcbiAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICBpZEJhc2U9XCJleHBlbnNlLXByb2Nlc3NlZC1ieS1pYS1maWx0ZXJcIlxyXG4gICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cclxuICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XHJcbiAgICAvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdDtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUmVtb3RlU2VhcmNoQ29tYm9ib3gsIHsgdHlwZSBSZW1vdGVTZWFyY2hPcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1JlbW90ZVNlYXJjaENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8sXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsXHJcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0LCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0UHJvcHMgPSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG1vZGU/OiBcImdlbmVyYWxcIiB8IFwibGlua1wiO1xyXG4gIGNyZWF0ZWREYXRlRnJvbT86IHN0cmluZztcclxuICBjcmVhdGVkRGF0ZVRvPzogc3RyaW5nO1xyXG4gIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zPzogYm9vbGVhbjtcclxuICBmaXhlZFN0YXR1c0ZpbHRlcj86IDAgfCAxIHwgbnVsbDtcclxuICByZWFkT25seT86IGJvb2xlYW47XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIHNob3dMYWJlbD86IGJvb2xlYW47XHJcbn07XHJcblxyXG5jb25zdCBTRUFSQ0hfUEFHRV9TSVpFID0gMzA7XHJcblxyXG4vLyBCdWlsZHMgbWluaW1hbCBwYXlsb2FkIGZvciB0aWNrZXQga2V5IHN1Z2dlc3Rpb25zIHdpdGhvdXQgZGF0ZSBmaWx0ZXJzLlxyXG5jb25zdCBidWlsZFRpY2tldFN1Z2dlc3RQYXlsb2FkID0gKFxyXG4gIHRlcm06IHN0cmluZyxcclxuICBwYWdlOiBudW1iZXIsXHJcbiAgcGFnZVNpemU6IG51bWJlcixcclxuICBmaXhlZFN0YXR1c0ZpbHRlcjogMCB8IDEgfCBudWxsLFxyXG4gIGNyZWF0ZWREYXRlRnJvbTogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gIGNyZWF0ZWREYXRlVG86IHN0cmluZyB8IHVuZGVmaW5lZFxyXG4pOiBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCB8IEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCA9PiB7XHJcbiAgY29uc3Qgc2FmZVRlcm0gPSBTdHJpbmcodGVybSB8fCBcIlwiKS50cmltKCk7XHJcbiAgY29uc3QgYmFzZVBheWxvYWQgPSB7XHJcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2UpIDogMSxcclxuICAgIHBhZ2VTaXplOiBOdW1iZXIuaXNGaW5pdGUocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCA/IE1hdGguZmxvb3IocGFnZVNpemUpIDogU0VBUkNIX1BBR0VfU0laRSxcclxuICAgIGNyZWF0ZWREYXRlRnJvbTogY3JlYXRlZERhdGVGcm9tIHx8IHVuZGVmaW5lZCxcclxuICAgIGNyZWF0ZWREYXRlVG86IGNyZWF0ZWREYXRlVG8gfHwgdW5kZWZpbmVkLFxyXG4gICAgc2VhcmNoS2V5OiBzYWZlVGVybSB8fCB1bmRlZmluZWQsXHJcbiAgICBmaWx0ZXI6IHNhZmVUZXJtIHx8IHVuZGVmaW5lZCxcclxuICB9O1xyXG5cclxuICBpZiAoZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDAgfHwgZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDEpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIC4uLmJhc2VQYXlsb2FkLFxyXG4gICAgICBzdGF0dXM6IGZpeGVkU3RhdHVzRmlsdGVyLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiBiYXNlUGF5bG9hZDtcclxufTtcclxuXHJcbmNvbnN0IG1hcFRpY2tldE9wdGlvbnMgPSAoXHJcbiAgaXRlbXM6IEFycmF5PEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvIHwgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvPiB8IHVuZGVmaW5lZFxyXG4pOiBSZW1vdGVTZWFyY2hPcHRpb25bXSA9PiB7XHJcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW10pXHJcbiAgICAubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGZpbGVJZCA9IFN0cmluZyhpdGVtPy5GaWxlSWQgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IFN0cmluZyhpdGVtPy5EZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IHN1YnRpdGxlID0gZGVzY3JpcHRpb24gfHwgXCItXCI7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdmFsdWU6IGZpbGVJZCxcclxuICAgICAgICB0aXRsZTogZmlsZUlkLFxyXG4gICAgICAgIHN1YnRpdGxlLFxyXG4gICAgICB9IGFzIFJlbW90ZVNlYXJjaE9wdGlvbjtcclxuICAgIH0pXHJcbiAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFJlbW90ZVNlYXJjaE9wdGlvbltdO1xyXG59O1xyXG5cclxuLy8gVGlja2V0IGtleSBmaWx0ZXIgaW5wdXQgd2l0aCByZW1vdGUgbGlzdCBzdWdnZXN0aW9ucy5cclxuY29uc3QgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0ID0gKHtcclxuICBsYWJlbCxcclxuICBwbGFjZWhvbGRlcixcclxuICB2YWx1ZSxcclxuICBvbkNoYW5nZSxcclxuICBtb2RlID0gXCJnZW5lcmFsXCIsXHJcbiAgY3JlYXRlZERhdGVGcm9tID0gXCJcIixcclxuICBjcmVhdGVkRGF0ZVRvID0gXCJcIixcclxuICBlbmFibGVSZW1vdGVTdWdnZXN0aW9ucyA9IHRydWUsXHJcbiAgZml4ZWRTdGF0dXNGaWx0ZXIgPSBudWxsLFxyXG4gIHJlYWRPbmx5ID0gZmFsc2UsXHJcbiAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICBzaG93TGFiZWwgPSB0cnVlLFxyXG59OiBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXRQcm9wcykgPT4ge1xyXG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xyXG5cclxuICBjb25zdCBsb2FkT3B0aW9ucyA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHNpZ25hbDogQWJvcnRTaWduYWwpOiBQcm9taXNlPFJlbW90ZVNlYXJjaE9wdGlvbltdPiA9PiB7XHJcbiAgICBjb25zdCBwYXlsb2FkID0gYnVpbGRUaWNrZXRTdWdnZXN0UGF5bG9hZCh0ZXJtLCAxLCBTRUFSQ0hfUEFHRV9TSVpFLCBmaXhlZFN0YXR1c0ZpbHRlciwgY3JlYXRlZERhdGVGcm9tLCBjcmVhdGVkRGF0ZVRvKTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID1cclxuICAgICAgbW9kZSA9PT0gXCJsaW5rXCJcclxuICAgICAgICA/IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3QocGF5bG9hZCBhcyBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QsIHtcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIHNpZ25hbCxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgOiBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0KHBheWxvYWQgYXMgRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsIHtcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIHNpZ25hbCxcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtYXBUaWNrZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyk7XHJcbiAgfSwgW2NyZWF0ZWREYXRlRnJvbSwgY3JlYXRlZERhdGVUbywgZml4ZWRTdGF0dXNGaWx0ZXIsIG1vZGVdKTtcclxuXHJcbiAgY29uc3QgbG9hZE9wdGlvbnNQYWdlID0gdXNlQ2FsbGJhY2soYXN5bmMgKHRlcm06IHN0cmluZywgcGFnZTogbnVtYmVyLCBfcGFnZVNpemU6IG51bWJlciwgc2lnbmFsOiBBYm9ydFNpZ25hbCkgPT4ge1xyXG4gICAgY29uc3QgcGF5bG9hZCA9IGJ1aWxkVGlja2V0U3VnZ2VzdFBheWxvYWQoXHJcbiAgICAgIHRlcm0sXHJcbiAgICAgIHBhZ2UsXHJcbiAgICAgIFNFQVJDSF9QQUdFX1NJWkUsXHJcbiAgICAgIGZpeGVkU3RhdHVzRmlsdGVyLFxyXG4gICAgICBjcmVhdGVkRGF0ZUZyb20sXHJcbiAgICAgIGNyZWF0ZWREYXRlVG9cclxuICAgICk7XHJcbiAgICBjb25zdCByZXNwb25zZSA9XHJcbiAgICAgIG1vZGUgPT09IFwibGlua1wiXHJcbiAgICAgICAgPyBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0KHBheWxvYWQgYXMgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RSZXF1ZXN0LCB7XHJcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICBzaWduYWwsXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIDogYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdChwYXlsb2FkIGFzIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LCB7XHJcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICBzaWduYWwsXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaXRlbXM6IFtdLFxyXG4gICAgICAgIHRvdGFsOiAwLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGl0ZW1zOiBtYXBUaWNrZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyksXHJcbiAgICAgIHRvdGFsOiBOdW1iZXIocmVzcG9uc2U/LlRvdGFsIHx8IDApLFxyXG4gICAgfTtcclxuICB9LCBbY3JlYXRlZERhdGVGcm9tLCBjcmVhdGVkRGF0ZVRvLCBmaXhlZFN0YXR1c0ZpbHRlciwgbW9kZV0pO1xyXG5cclxuICBpZiAoIWVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zIHx8IHJlYWRPbmx5TW9kZSkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cclxuICAgICAgICB7c2hvd0xhYmVsID8gKFxyXG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiIHN0eWxlPXt7IGNvbG9yOiBcIiMwMDI5NmJlMFwiIH19PlxyXG4gICAgICAgICAgICB7bGFiZWx9XHJcbiAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHB4LTMgcHktMiB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgdGV4dC1zbGF0ZS05MDAgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXHJcbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XHJcbiAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XHJcbiAgICAgICAgICByZWFkT25seT17cmVhZE9ubHl9XHJcbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxSZW1vdGVTZWFyY2hDb21ib2JveFxyXG4gICAgICBsYWJlbD17bGFiZWx9XHJcbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuICAgICAgdmFsdWU9e3ZhbHVlfVxyXG4gICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XHJcbiAgICAgIG9uU2VhcmNoPXthc3luYyAodGVybSwgc2lnbmFsKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHJldHVybiBhd2FpdCBsb2FkT3B0aW9ucyh0ZXJtLCBzaWduYWwpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgICAgfX1cclxuICAgICAgb25TZWFyY2hQYWdlPXthc3luYyAodGVybSwgcGFnZSwgcGFnZVNpemUsIHNpZ25hbCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbG9hZE9wdGlvbnNQYWdlKHRlcm0sIHBhZ2UsIHBhZ2VTaXplLCBzaWduYWwpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGl0ZW1zOiBbXSwgdG90YWw6IDAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgICAgfX1cclxuICAgICAgaWRCYXNlPVwiZXhwZW5zZS10aWNrZXQtZmlsdGVyLWtleVwiXHJcbiAgICAgIG1pblNlYXJjaExlbmd0aD17MH1cclxuICAgICAgcGFnZVNpemU9e1NFQVJDSF9QQUdFX1NJWkV9XHJcbiAgICAgIGFsbG93RW1wdHlTZWFyY2hcclxuICAgICAgbG9hZE9uT3BlblxyXG4gICAgICBpbmZpbml0ZVNjcm9sbFxyXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cclxuICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XHJcbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgIC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dDtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxyXG4gIEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkLFxyXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcclxuaW1wb3J0IHsgc3RhcnRPZkRheSwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHJlc29sdmVFeHBlbnNlUXVpY2tEYXRlRmlsdGVyRnJvbVJhbmdlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VRdWlja0RhdGVGaWx0ZXJTdGF0ZS50c1wiO1xyXG5pbXBvcnQgeyBub3JtYWxpemVFeHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGVBcmdzID0ge1xyXG4gIG9uQXBwbHlGaWx0ZXJzOiAoc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpID0+IHZvaWQ7XHJcbiAgb25DbGVhckZpbHRlcnM6ICgpID0+IHZvaWQ7XHJcbiAgZGVmYXVsdE1hbmFnZWRVc2VySWQ6IHN0cmluZztcclxuICBmaXhlZFN0YXR1c0ZpbHRlcj86IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlIHwgbnVsbDtcclxuICBhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5PzogYm9vbGVhbjtcclxufTtcclxuXHJcbi8vIE93bnMgZmlsdGVyIFVJIHN0YXRlIGFuZCBhcHBseS9jbGVhciBydWxlcyBmb3IgZXhwZW5zZSB0aWNrZXRzIGxpc3QgcGFnZS5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlID0gKHtcclxuICBvbkFwcGx5RmlsdGVycyxcclxuICBvbkNsZWFyRmlsdGVycyxcclxuICBkZWZhdWx0TWFuYWdlZFVzZXJJZCxcclxuICBmaXhlZFN0YXR1c0ZpbHRlciA9IG51bGwsXHJcbiAgYWxsb3dFbXB0eURhdGVzT25BcHBseSA9IGZhbHNlLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZUFyZ3MpID0+IHtcclxuICBjb25zdCBoYXNGaXhlZFN0YXR1c0ZpbHRlciA9IGZpeGVkU3RhdHVzRmlsdGVyID09PSAwIHx8IGZpeGVkU3RhdHVzRmlsdGVyID09PSAxO1xyXG5cclxuICBjb25zdCByZXNvbHZlU3RhdHVzRmlsdGVyID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodmFsdWU6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlKTogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUgPT4ge1xyXG4gICAgICBpZiAoaGFzRml4ZWRTdGF0dXNGaWx0ZXIpIHtcclxuICAgICAgICByZXR1cm4gZml4ZWRTdGF0dXNGaWx0ZXIgYXMgRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSxcclxuICAgIFtmaXhlZFN0YXR1c0ZpbHRlciwgaGFzRml4ZWRTdGF0dXNGaWx0ZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgW2Zyb21EYXRlLCBzZXRGcm9tRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbdG9EYXRlLCBzZXRUb0RhdGVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2ZpbHRlcktleSwgc2V0RmlsdGVyS2V5XSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtjdXJyZW5jeUNvZGUsIHNldEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbbWFuYWdlZFVzZXJJZCwgc2V0TWFuYWdlZFVzZXJJZF0gPSB1c2VTdGF0ZShkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XHJcbiAgY29uc3QgW3N0YXR1c0ZpbHRlclJhdywgc2V0U3RhdHVzRmlsdGVyUmF3XSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlPihyZXNvbHZlU3RhdHVzRmlsdGVyKFwiXCIpKTtcclxuICBjb25zdCBbZ2FzdG9UeXBlRmlsdGVyLCBzZXRHYXN0b1R5cGVGaWx0ZXJdID0gdXNlU3RhdGU8XCJcIiB8IEV4cGVuc2VHYXN0b1R5cGVDb2RlPihcIlwiKTtcclxuICBjb25zdCBbcHJvY2Vzc2VkQnlJYUZpbHRlciwgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcl0gPSB1c2VTdGF0ZTxcImFsbFwiIHwgXCJ5ZXNcIiB8IFwibm9cIj4oXCJhbGxcIik7XHJcbiAgY29uc3QgW2FjdGl2ZVF1aWNrRmlsdGVyLCBzZXRBY3RpdmVRdWlja0ZpbHRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtzaG93TWFudWFsRGF0ZUZpbHRlciwgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXJdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzaG93TWFudWFsRGF0ZUVycm9yLCBzZXRTaG93TWFudWFsRGF0ZUVycm9yXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbWFudWFsRGF0ZUF1dG9PcGVuS2V5LCBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXldID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW2FwcGxpZWRGaWx0ZXJzLCBzZXRBcHBsaWVkRmlsdGVyc10gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW3Nob3dGaWx0ZXJzLCBzZXRTaG93RmlsdGVyc10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaGFzRml4ZWRTdGF0dXNGaWx0ZXIpIHJldHVybjtcclxuICAgIHNldFN0YXR1c0ZpbHRlclJhdyhmaXhlZFN0YXR1c0ZpbHRlciBhcyBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSk7XHJcbiAgfSwgW2ZpeGVkU3RhdHVzRmlsdGVyLCBoYXNGaXhlZFN0YXR1c0ZpbHRlcl0pO1xyXG5cclxuICBjb25zdCBzdGF0dXNGaWx0ZXIgPSByZXNvbHZlU3RhdHVzRmlsdGVyKHN0YXR1c0ZpbHRlclJhdyk7XHJcblxyXG4gIGNvbnN0IGN1cnJlbnRGaWx0ZXJzID0gdXNlTWVtbzxFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90PihcclxuICAgICgpID0+ICh7XHJcbiAgICAgIGZyb21EYXRlLFxyXG4gICAgICB0b0RhdGUsXHJcbiAgICAgIGZpbHRlcktleTogZmlsdGVyS2V5LnRyaW0oKSxcclxuICAgICAgY3VycmVuY3lDb2RlOiBjdXJyZW5jeUNvZGUudHJpbSgpLFxyXG4gICAgICBtYW5hZ2VkVXNlcklkOiBtYW5hZ2VkVXNlcklkLnRyaW0oKSxcclxuICAgICAgc3RhdHVzRmlsdGVyLFxyXG4gICAgICBnYXN0b1R5cGVGaWx0ZXIsXHJcbiAgICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXHJcbiAgICB9KSxcclxuICAgIFtjdXJyZW5jeUNvZGUsIGZpbHRlcktleSwgZnJvbURhdGUsIGdhc3RvVHlwZUZpbHRlciwgbWFuYWdlZFVzZXJJZCwgcHJvY2Vzc2VkQnlJYUZpbHRlciwgc3RhdHVzRmlsdGVyLCB0b0RhdGVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2V0U3RhdHVzRmlsdGVyID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodmFsdWU6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlKSA9PiB7XHJcbiAgICAgIGlmIChoYXNGaXhlZFN0YXR1c0ZpbHRlcikge1xyXG4gICAgICAgIHNldFN0YXR1c0ZpbHRlclJhdyhmaXhlZFN0YXR1c0ZpbHRlciBhcyBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHNldFN0YXR1c0ZpbHRlclJhdyh2YWx1ZSk7XHJcbiAgICB9LFxyXG4gICAgW2ZpeGVkU3RhdHVzRmlsdGVyLCBoYXNGaXhlZFN0YXR1c0ZpbHRlcl1cclxuICApO1xyXG5cclxuICBjb25zdCBvbkFwcGx5ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5ICYmICghZnJvbURhdGUgfHwgIXRvRGF0ZSkpIHtcclxuICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcih0cnVlKTtcclxuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIodHJ1ZSk7XHJcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgPSB7XHJcbiAgICAgIGZyb21EYXRlLFxyXG4gICAgICB0b0RhdGUsXHJcbiAgICAgIGZpbHRlcktleTogZmlsdGVyS2V5LnRyaW0oKSxcclxuICAgICAgY3VycmVuY3lDb2RlOiBjdXJyZW5jeUNvZGUudHJpbSgpLFxyXG4gICAgICBtYW5hZ2VkVXNlcklkOiBtYW5hZ2VkVXNlcklkLnRyaW0oKSxcclxuICAgICAgc3RhdHVzRmlsdGVyLFxyXG4gICAgICBnYXN0b1R5cGVGaWx0ZXIsXHJcbiAgICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXHJcbiAgICB9O1xyXG5cclxuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xyXG4gICAgc2V0QXBwbGllZEZpbHRlcnMoc25hcHNob3QpO1xyXG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xyXG4gICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xyXG4gICAgb25BcHBseUZpbHRlcnMoc25hcHNob3QpO1xyXG4gIH0sIFtcclxuICAgIGFsbG93RW1wdHlEYXRlc09uQXBwbHksXHJcbiAgICBjdXJyZW5jeUNvZGUsXHJcbiAgICBmaWx0ZXJLZXksXHJcbiAgICBmcm9tRGF0ZSxcclxuICAgIGdhc3RvVHlwZUZpbHRlcixcclxuICAgIG1hbmFnZWRVc2VySWQsXHJcbiAgICBvbkFwcGx5RmlsdGVycyxcclxuICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXHJcbiAgICBzdGF0dXNGaWx0ZXIsXHJcbiAgICB0b0RhdGUsXHJcbiAgXSk7XHJcblxyXG4gIC8vIFJlaHlkcmF0ZXMgdGlja2V0IGZpbHRlcnMgZnJvbSBhIGNhY2hlZCBzbmFwc2hvdCB3aGVuIHJldHVybmluZyBmcm9tIGRldGFpbC5cclxuICBjb25zdCByZXN0b3JlQXBwbGllZEZpbHRlcnMgPSB1c2VDYWxsYmFjayhcclxuICAgIChzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4ge1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90KHNuYXBzaG90KTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZFN0YXR1c0ZpbHRlciA9IHJlc29sdmVTdGF0dXNGaWx0ZXIobm9ybWFsaXplZC5zdGF0dXNGaWx0ZXIpO1xyXG4gICAgICBjb25zdCByZXN0b3JlZE1hbmFnZWRVc2VySWQgPSBTdHJpbmcobm9ybWFsaXplZC5tYW5hZ2VkVXNlcklkIHx8IGRlZmF1bHRNYW5hZ2VkVXNlcklkKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IHJlc3RvcmVkUXVpY2tGaWx0ZXIgPSByZXNvbHZlRXhwZW5zZVF1aWNrRGF0ZUZpbHRlckZyb21SYW5nZShub3JtYWxpemVkLmZyb21EYXRlLCBub3JtYWxpemVkLnRvRGF0ZSk7XHJcbiAgICAgIHNldEZyb21EYXRlKG5vcm1hbGl6ZWQuZnJvbURhdGUpO1xyXG4gICAgICBzZXRUb0RhdGUobm9ybWFsaXplZC50b0RhdGUpO1xyXG4gICAgICBzZXRGaWx0ZXJLZXkobm9ybWFsaXplZC5maWx0ZXJLZXkpO1xyXG4gICAgICBzZXRDdXJyZW5jeUNvZGUobm9ybWFsaXplZC5jdXJyZW5jeUNvZGUpO1xyXG4gICAgICBzZXRNYW5hZ2VkVXNlcklkKHJlc3RvcmVkTWFuYWdlZFVzZXJJZCk7XHJcbiAgICAgIHNldFN0YXR1c0ZpbHRlclJhdyhub3JtYWxpemVkU3RhdHVzRmlsdGVyKTtcclxuICAgICAgc2V0R2FzdG9UeXBlRmlsdGVyKG5vcm1hbGl6ZWQuZ2FzdG9UeXBlRmlsdGVyKTtcclxuICAgICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcihub3JtYWxpemVkLnByb2Nlc3NlZEJ5SWFGaWx0ZXIpO1xyXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihyZXN0b3JlZFF1aWNrRmlsdGVyKTtcclxuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xyXG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcclxuICAgICAgc2V0QXBwbGllZEZpbHRlcnMoe1xyXG4gICAgICAgIC4uLm5vcm1hbGl6ZWQsXHJcbiAgICAgICAgbWFuYWdlZFVzZXJJZDogcmVzdG9yZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgICAgIHN0YXR1c0ZpbHRlcjogbm9ybWFsaXplZFN0YXR1c0ZpbHRlcixcclxuICAgICAgfSk7XHJcbiAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICBbZGVmYXVsdE1hbmFnZWRVc2VySWQsIHJlc29sdmVTdGF0dXNGaWx0ZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb25DbGVhciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldEZyb21EYXRlKFwiXCIpO1xyXG4gICAgc2V0VG9EYXRlKFwiXCIpO1xyXG4gICAgc2V0RmlsdGVyS2V5KFwiXCIpO1xyXG4gICAgc2V0Q3VycmVuY3lDb2RlKFwiXCIpO1xyXG4gICAgc2V0TWFuYWdlZFVzZXJJZChkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XHJcbiAgICBzZXRTdGF0dXNGaWx0ZXJSYXcocmVzb2x2ZVN0YXR1c0ZpbHRlcihcIlwiKSk7XHJcbiAgICBzZXRHYXN0b1R5cGVGaWx0ZXIoXCJcIik7XHJcbiAgICBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyKFwiYWxsXCIpO1xyXG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XHJcbiAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XHJcbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcclxuICAgIHNldE1hbnVhbERhdGVBdXRvT3BlbktleSgwKTtcclxuICAgIHNldEFwcGxpZWRGaWx0ZXJzKG51bGwpO1xyXG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XHJcbiAgICBvbkNsZWFyRmlsdGVycygpO1xyXG4gIH0sIFtkZWZhdWx0TWFuYWdlZFVzZXJJZCwgb25DbGVhckZpbHRlcnMsIHJlc29sdmVTdGF0dXNGaWx0ZXJdKTtcclxuXHJcbiAgY29uc3Qgb25EYXRlUmFuZ2VDaGFuZ2UgPSB1c2VDYWxsYmFjayhcclxuICAgIChuZXh0RnJvbURhdGU6IHN0cmluZywgbmV4dFRvRGF0ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IGhhc0Z1bGxSYW5nZSA9ICEhbmV4dEZyb21EYXRlICYmICEhbmV4dFRvRGF0ZTtcclxuICAgICAgc2V0RnJvbURhdGUobmV4dEZyb21EYXRlKTtcclxuICAgICAgc2V0VG9EYXRlKG5leHRUb0RhdGUpO1xyXG4gICAgICBpZiAoIWhhc0Z1bGxSYW5nZSkge1xyXG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKHRydWUpO1xyXG4gICAgICB9XHJcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xyXG4gICAgICBpZiAoc2hvd01hbnVhbERhdGVFcnJvcikge1xyXG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoIWhhc0Z1bGxSYW5nZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbc2hvd01hbnVhbERhdGVFcnJvcl1cclxuICApO1xyXG5cclxuICBjb25zdCBvbk1hbnVhbFJhbmdlQ29tcGxldGUgPSB1c2VDYWxsYmFjaygobmV4dEZyb21EYXRlOiBzdHJpbmcsIG5leHRUb0RhdGU6IHN0cmluZykgPT4ge1xyXG4gICAgc2V0RnJvbURhdGUobmV4dEZyb21EYXRlKTtcclxuICAgIHNldFRvRGF0ZShuZXh0VG9EYXRlKTtcclxuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xyXG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XHJcbiAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBvblF1aWNrRmlsdGVyQ2hhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZmlsdGVySWQ6IEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkKSA9PiB7XHJcbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJjdXN0b21cIikge1xyXG4gICAgICAgIGlmIChzaG93TWFudWFsRGF0ZUZpbHRlcikge1xyXG4gICAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xyXG4gICAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcclxuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcclxuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcclxuICAgICAgICBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXkoKHByZXZpb3VzKSA9PiBwcmV2aW91cyArIDEpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoZmlsdGVySWQpO1xyXG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XHJcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xyXG5cclxuICAgICAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xyXG4gICAgICBjb25zdCBuZXh0RnJvbSA9IG5ldyBEYXRlKHRvZGF5KTtcclxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtN1wiKSB7XHJcbiAgICAgICAgbmV4dEZyb20uc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA2KTtcclxuICAgICAgfSBlbHNlIGlmIChmaWx0ZXJJZCA9PT0gXCJkYXlzLTMwXCIpIHtcclxuICAgICAgICBuZXh0RnJvbS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDI5KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXh0RnJvbS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDg5KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0RnJvbURhdGUodG9Jc29EYXRlKG5leHRGcm9tKSk7XHJcbiAgICAgIHNldFRvRGF0ZSh0b0lzb0RhdGUodG9kYXkpKTtcclxuICAgIH0sXHJcbiAgICBbc2hvd01hbnVhbERhdGVGaWx0ZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgdG9nZ2xlRmlsdGVyUGFuZWwgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRTaG93RmlsdGVycygocHJldmlvdXMpID0+IHtcclxuICAgICAgY29uc3QgbmV4dCA9ICFwcmV2aW91cztcclxuICAgICAgaWYgKCFuZXh0KSB7XHJcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZnJvbURhdGUsXHJcbiAgICB0b0RhdGUsXHJcbiAgICBmaWx0ZXJLZXksXHJcbiAgICBjdXJyZW5jeUNvZGUsXHJcbiAgICBtYW5hZ2VkVXNlcklkLFxyXG4gICAgc3RhdHVzRmlsdGVyLFxyXG4gICAgZ2FzdG9UeXBlRmlsdGVyLFxyXG4gICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxyXG4gICAgc2hvd01hbnVhbERhdGVGaWx0ZXIsXHJcbiAgICBzaG93TWFudWFsRGF0ZUVycm9yLFxyXG4gICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxyXG4gICAgYXBwbGllZEZpbHRlcnMsXHJcbiAgICBzaG93RmlsdGVycyxcclxuICAgIGN1cnJlbnRGaWx0ZXJzLFxyXG4gICAgc2V0RmlsdGVyS2V5LFxyXG4gICAgc2V0Q3VycmVuY3lDb2RlLFxyXG4gICAgc2V0TWFuYWdlZFVzZXJJZCxcclxuICAgIHNldFN0YXR1c0ZpbHRlcixcclxuICAgIHNldEdhc3RvVHlwZUZpbHRlcixcclxuICAgIHNldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsXHJcbiAgICBvbkFwcGx5LFxyXG4gICAgb25DbGVhcixcclxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcclxuICAgIG9uRGF0ZVJhbmdlQ2hhbmdlLFxyXG4gICAgb25NYW51YWxSYW5nZUNvbXBsZXRlLFxyXG4gICAgb25RdWlja0ZpbHRlckNoYW5nZSxcclxuICAgIHRvZ2dsZUZpbHRlclBhbmVsLFxyXG4gICAgc3RhdHVzRmlsdGVyTG9ja2VkOiBoYXNGaXhlZFN0YXR1c0ZpbHRlcixcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VHYXN0b1R5cGVDYXRhbG9nLnRzXCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0LCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IGlzRXhwZW5zZUFib3J0TGlrZUVycm9yLCBydW5FeHBlbnNlUmVhZFJlcXVlc3RXaXRoUmV0cnkgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVJlcXVlc3RSZXRyeS50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGJ1aWxkRXhwZW5zZVRpY2tldExpbmtMaXN0UGF5bG9hZCxcclxuICBidWlsZEV4cGVuc2VUaWNrZXRMaXN0UGF5bG9hZCxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVBheWxvYWRCdWlsZGVycy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcclxuICBFeHBlbnNlVGlja2V0Q2FyZCxcclxuICBFeHBlbnNlVGlja2V0TGlua0NhcmQsXHJcbiAgRXhwZW5zZVRpY2tldExpc3RQYWdlSXRlbSxcclxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGFBcmdzID0ge1xyXG4gIGhhc0FjY2VzczogYm9vbGVhbjtcclxuICBwYWdlU2l6ZTogbnVtYmVyO1xyXG4gIG1vZGU6IFwiZ2VuZXJhbFwiIHwgXCJsaW5rXCI7XHJcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBFWFBFTlNFX1RJQ0tFVFNfTElTVF9MT0dfUFJFRklYID0gXCJbZXhwZW5zZS10aWNrZXRzOmxpc3RdXCI7XG5cclxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUuaW5mbyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLmluZm8oRVhQRU5TRV9USUNLRVRTX0xJU1RfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybiA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUud2FybiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLndhcm4oRVhQRU5TRV9USUNLRVRTX0xJU1RfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNMaXN0RXJyb3IgPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoRVhQRU5TRV9USUNLRVRTX0xJU1RfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0c0RlYnVnU3RhY2sgPSAobGFiZWw6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHR5cGVvZiBFcnJvciAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gXCJcIjtcclxuICBjb25zdCByYXdTdGFjayA9IG5ldyBFcnJvcihsYWJlbCkuc3RhY2s7XHJcbiAgaWYgKHR5cGVvZiByYXdTdGFjayAhPT0gXCJzdHJpbmdcIiB8fCAhcmF3U3RhY2sudHJpbSgpKSByZXR1cm4gXCJcIjtcclxuICByZXR1cm4gcmF3U3RhY2tcclxuICAgIC5zcGxpdChcIlxcblwiKVxyXG4gICAgLnNsaWNlKDAsIDYpXHJcbiAgICAuam9pbihcIlxcblwiKTtcclxufTtcclxuXHJcbmNvbnN0IHRvTnVsbGFibGVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCB0b051bGxhYmxlQm9vbCA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gfCBudWxsID0+IHtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikgcmV0dXJuIHZhbHVlO1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHJldHVybiB2YWx1ZSA9PT0gMSA/IHRydWUgOiB2YWx1ZSA9PT0gMCA/IGZhbHNlIDogbnVsbDtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBjb25zdCBub3JtYWxpemVkID0gdmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAobm9ybWFsaXplZCA9PT0gXCJ0cnVlXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIxXCIpIHJldHVybiB0cnVlO1xyXG4gICAgaWYgKG5vcm1hbGl6ZWQgPT09IFwiZmFsc2VcIiB8fCBub3JtYWxpemVkID09PSBcIjBcIikgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IHRvTnVsbGFibGVUaWNrZXRTdGF0dXMgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIocGFyc2VkKSAmJiBwYXJzZWQgPj0gMCA/IHBhcnNlZCA6IG51bGw7XG59O1xuXHJcbmNvbnN0IHRvTnVsbGFibGVUaWNrZXRHYXN0b1R5cGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlR2FzdG9UeXBlQ29kZSB8IG51bGwgPT4ge1xuICByZXR1cm4gdG9FeHBlbnNlR2FzdG9UeXBlQ29kZSh2YWx1ZSk7XG59O1xuXHJcbmNvbnN0IG1hcFRpY2tldEl0ZW1Ub0NhcmQgPSAoaXRlbTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBFeHBlbnNlVGlja2V0Q2FyZCA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGtpbmQ6IFwiZ2VuZXJhbFwiLFxyXG4gICAgZmlsZUlkOiBTdHJpbmcoaXRlbT8uRmlsZUlkIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoaXRlbT8uRGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpLFxyXG4gICAgc3RhdHVzOiB0b051bGxhYmxlVGlja2V0U3RhdHVzKGl0ZW0/LlN0YXR1cyksXHJcbiAgICBwcm9jZXNzZWRCeUFJOiB0b051bGxhYmxlQm9vbChpdGVtPy5Qcm9jZXNzZWRCeUFJKSxcclxuICAgIGN1cnJlbmN5Q29kZTogU3RyaW5nKGl0ZW0/LkN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICB0b3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtPy5Ub3RhbEFtb3VudCksXHJcbiAgICB0cmFuc0RhdGU6IFN0cmluZyhpdGVtPy5UcmFuc0RhdGUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgZmlsZU5hbWU6IFN0cmluZyhpdGVtPy5GaWxlTmFtZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICBnYXN0b1R5cGU6IHRvTnVsbGFibGVUaWNrZXRHYXN0b1R5cGUoaXRlbT8uR2FzdG9UeXBlID8/IGl0ZW0/Lmdhc3RvVHlwZSksXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IG1hcFRpY2tldExpbmtJdGVtVG9DYXJkID0gKGl0ZW06IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogRXhwZW5zZVRpY2tldExpbmtDYXJkID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAga2luZDogXCJsaW5rXCIsXHJcbiAgICBmaWxlSWQ6IFN0cmluZyhpdGVtPy5GaWxlSWQgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgZGVzY3JpcHRpb246IFN0cmluZyhpdGVtPy5EZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXHJcbiAgICBwcm9jZXNzZWRCeUFJOiB0b051bGxhYmxlQm9vbChpdGVtPy5Qcm9jZXNzZWRCeUFJKSxcclxuICAgIGN1cnJlbmN5Q29kZTogU3RyaW5nKGl0ZW0/LkN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICB0b3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtPy5Ub3RhbEFtb3VudCksXHJcbiAgICB0cmFuc0RhdGU6IFN0cmluZyhpdGVtPy5UcmFuc0RhdGUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgZmlsZU5hbWU6IFN0cmluZyhpdGVtPy5GaWxlTmFtZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICBnYXN0b1R5cGU6IHRvTnVsbGFibGVUaWNrZXRHYXN0b1R5cGUoaXRlbT8uR2FzdG9UeXBlID8/IGl0ZW0/Lmdhc3RvVHlwZSksXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIE93bnMgbGlzdCBkYXRhIGZldGNoLCBsb2FkaW5nIHN0YXRlLCBhbmQgcGFnaW5hdGlvbiBtZXRhZGF0YSBmb3IgdGlja2V0cy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGEgPSAoeyBoYXNBY2Nlc3MsIHBhZ2VTaXplLCBtb2RlLCBvbkZvcmJpZGRlbiB9OiBVc2VFeHBlbnNlVGlja2V0c0xpc3REYXRhQXJncykgPT4ge1xyXG4gIGNvbnN0IFtpdGVtcywgc2V0SXRlbXNdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldExpc3RQYWdlSXRlbVtdPihbXSk7XHJcbiAgY29uc3QgW3RvdGFsLCBzZXRUb3RhbF0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbY3VycmVudFBhZ2UsIHNldEN1cnJlbnRQYWdlXSA9IHVzZVN0YXRlKDEpO1xyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmID0gdXNlUmVmPEFib3J0Q29udHJvbGxlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RLZXlSZWYgPSB1c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgYWN0aXZlUmVxdWVzdFNlcVJlZiA9IHVzZVJlZigwKTtcclxuXHJcbiAgY29uc3QgcmVzdG9yZUxpc3RTbmFwc2hvdCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHNuYXBzaG90OiB7IGl0ZW1zOiBFeHBlbnNlVGlja2V0TGlzdFBhZ2VJdGVtW107IHRvdGFsOiBudW1iZXI7IHBhZ2U6IG51bWJlciB9KSA9PiB7XHJcbiAgICAgIGNvbnN0IHNhZmVJdGVtcyA9IEFycmF5LmlzQXJyYXkoc25hcHNob3QuaXRlbXMpID8gc25hcHNob3QuaXRlbXMgOiBbXTtcclxuICAgICAgY29uc3Qgc2FmZVRvdGFsUmF3ID0gTnVtYmVyKHNuYXBzaG90LnRvdGFsKTtcclxuICAgICAgY29uc3Qgc2FmZVRvdGFsID0gTnVtYmVyLmlzRmluaXRlKHNhZmVUb3RhbFJhdykgJiYgc2FmZVRvdGFsUmF3ID49IDAgPyBzYWZlVG90YWxSYXcgOiBzYWZlSXRlbXMubGVuZ3RoO1xyXG4gICAgICBjb25zdCBzYWZlUGFnZVJhdyA9IE51bWJlcihzbmFwc2hvdC5wYWdlKTtcclxuICAgICAgY29uc3Qgc2FmZVBhZ2UgPSBOdW1iZXIuaXNGaW5pdGUoc2FmZVBhZ2VSYXcpICYmIHNhZmVQYWdlUmF3ID4gMCA/IE1hdGguZmxvb3Ioc2FmZVBhZ2VSYXcpIDogMTtcclxuXHJcbiAgICAgIHNldEl0ZW1zKHNhZmVJdGVtcyk7XHJcbiAgICAgIHNldFRvdGFsKHNhZmVUb3RhbCk7XHJcbiAgICAgIHNldEN1cnJlbnRQYWdlKHNhZmVQYWdlKTtcclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgbG9hZExpc3QgPSB1c2VDYWxsYmFjayhcclxuICAgIGFzeW5jIChwYWdlOiBudW1iZXIsIGZpbHRlcnM6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpID0+IHtcclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyhcImxvYWRMaXN0OnJlcXVlc3RlZFwiLCB7XHJcbiAgICAgICAgcGFnZSxcclxuICAgICAgICBtb2RlLFxyXG4gICAgICAgIGhhc0FjY2VzcyxcclxuICAgICAgICBmaWx0ZXJzLFxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKCFoYXNBY2Nlc3MpIHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwibG9hZExpc3Q6YmxvY2tlZC1uby1hY2Nlc3NcIiwge1xyXG4gICAgICAgICAgcGFnZSxcclxuICAgICAgICAgIG1vZGUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHBheWxvYWQgPVxyXG4gICAgICAgIG1vZGUgPT09IFwibGlua1wiXHJcbiAgICAgICAgICA/IGJ1aWxkRXhwZW5zZVRpY2tldExpbmtMaXN0UGF5bG9hZChmaWx0ZXJzLCBwYWdlLCBwYWdlU2l6ZSlcclxuICAgICAgICAgIDogYnVpbGRFeHBlbnNlVGlja2V0TGlzdFBheWxvYWQoZmlsdGVycywgcGFnZSwgcGFnZVNpemUpO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCA9IFN0cmluZyhmaWx0ZXJzPy5tYW5hZ2VkVXNlcklkIHx8IFwiXCIpLnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICBjb25zdCByZXF1ZXN0S2V5ID0gSlNPTi5zdHJpbmdpZnkoeyBtb2RlLCBwYXlsb2FkLCBtYW5hZ2VkVXNlcklkOiBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCB9KTtcclxuXHJcbiAgICAgIGlmIChhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ICYmIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9PT0gcmVxdWVzdEtleSkge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJsb2FkTGlzdDpza2lwLWR1cGxpY2F0ZS1yZXF1ZXN0XCIsIHtcclxuICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICBtb2RlLFxyXG4gICAgICAgICAgcmVxdWVzdEtleSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyhcImxvYWRMaXN0OmFib3J0LXByZXZpb3VzLXJlcXVlc3RcIiwge1xyXG4gICAgICAgICAgcHJldmlvdXNSZXF1ZXN0S2V5OiBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQsXHJcbiAgICAgICAgICBwcmV2aW91c1JlcXVlc3RTZXE6IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCxcclxuICAgICAgICAgIHN0YWNrOiBidWlsZEV4cGVuc2VUaWNrZXRzRGVidWdTdGFjayhcImxvYWRMaXN0OmFib3J0LXByZXZpb3VzLXJlcXVlc3RcIiksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudC5hYm9ydCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG4gICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcclxuICAgICAgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID0gcmVxdWVzdEtleTtcclxuICAgICAgY29uc3QgcmVxdWVzdFNlcSA9IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCArIDE7XHJcbiAgICAgIGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCA9IHJlcXVlc3RTZXE7XHJcbiAgICAgIGNvbnN0IGhhbmRsZUFib3J0U2lnbmFsID0gKCkgPT4ge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJsb2FkTGlzdDpzaWduYWwtYWJvcnQtZXZlbnRcIiwge1xyXG4gICAgICAgICAgcGFnZSxcclxuICAgICAgICAgIG1vZGUsXHJcbiAgICAgICAgICByZXF1ZXN0U2VxLFxyXG4gICAgICAgICAgcmVxdWVzdEtleSxcclxuICAgICAgICAgIHNpZ25hbEFib3J0ZWQ6IGNvbnRyb2xsZXIuc2lnbmFsLmFib3J0ZWQsXHJcbiAgICAgICAgICBzaWduYWxSZWFzb246XHJcbiAgICAgICAgICAgIFwicmVhc29uXCIgaW4gY29udHJvbGxlci5zaWduYWxcclxuICAgICAgICAgICAgICA/ICgoY29udHJvbGxlci5zaWduYWwgYXMgQWJvcnRTaWduYWwgJiB7IHJlYXNvbj86IHVua25vd24gfSkucmVhc29uID8/IG51bGwpXHJcbiAgICAgICAgICAgICAgOiBudWxsLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG4gICAgICBjb250cm9sbGVyLnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgaGFuZGxlQWJvcnRTaWduYWwsIHsgb25jZTogdHJ1ZSB9KTtcclxuXHJcbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RJbmZvKFwibG9hZExpc3Q6ZmV0Y2gtc3RhcnRcIiwge1xyXG4gICAgICAgIHBhZ2UsXHJcbiAgICAgICAgbW9kZSxcclxuICAgICAgICBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgICBwYXlsb2FkLFxyXG4gICAgICAgIHJlcXVlc3RLZXksXHJcbiAgICAgICAgcmVxdWVzdFNlcSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcnVuRXhwZW5zZVJlYWRSZXF1ZXN0V2l0aFJldHJ5KFxyXG4gICAgICAgICAgKCkgPT5cclxuICAgICAgICAgICAgbW9kZSA9PT0gXCJsaW5rXCJcclxuICAgICAgICAgICAgICA/IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3QocGF5bG9hZCwge1xyXG4gICAgICAgICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICAgICAgICAgICAgYXhVc2VySWRPdmVycmlkZTogbm9ybWFsaXplZE1hbmFnZWRVc2VySWQgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICA6IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QocGF5bG9hZCwge1xyXG4gICAgICAgICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICAgICAgICAgICAgYXhVc2VySWRPdmVycmlkZTogbm9ybWFsaXplZE1hbmFnZWRVc2VySWQgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RJbmZvKFwibG9hZExpc3Q6ZmV0Y2gtZmluaXNoZWRcIiwge1xyXG4gICAgICAgICAgcGFnZSxcclxuICAgICAgICAgIG1vZGUsXHJcbiAgICAgICAgICByZXF1ZXN0U2VxLFxyXG4gICAgICAgICAgc3VjY2VzczogcmVzcG9uc2U/LlN1Y2Nlc3MsXHJcbiAgICAgICAgICB0b3RhbDogcmVzcG9uc2U/LlRvdGFsLFxyXG4gICAgICAgICAgaXRlbXM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zLmxlbmd0aCA6IDAsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHJlcXVlc3RTZXEgIT09IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwibG9hZExpc3Q6YXBpLXVuc3VjY2Vzc2Z1bFwiLCB7XHJcbiAgICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICAgIG1vZGUsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLk1lc3NhZ2UsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJUaWNrZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldHMuXCIpKTtcclxuICAgICAgICAgIHNldEl0ZW1zKFtdKTtcclxuICAgICAgICAgIHNldFRvdGFsKDApO1xyXG4gICAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzb3VyY2VJdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XHJcbiAgICAgICAgY29uc3QgbWFwcGVkSXRlbXMgPSBzb3VyY2VJdGVtcy5tYXAoKGl0ZW0pID0+XHJcbiAgICAgICAgICBtb2RlID09PSBcImxpbmtcIlxyXG4gICAgICAgICAgICA/IG1hcFRpY2tldExpbmtJdGVtVG9DYXJkKGl0ZW0gYXMgdW5rbm93biBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilcclxuICAgICAgICAgICAgOiBtYXBUaWNrZXRJdGVtVG9DYXJkKGl0ZW0gYXMgdW5rbm93biBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlVG90YWwgPSBOdW1iZXIocmVzcG9uc2U/LlRvdGFsID8/IG1hcHBlZEl0ZW1zLmxlbmd0aCA/PyAwKTtcclxuXHJcbiAgICAgICAgc2V0SXRlbXMobWFwcGVkSXRlbXMpO1xyXG4gICAgICAgIHNldFRvdGFsKHJlc3BvbnNlVG90YWwpO1xyXG4gICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChyZXF1ZXN0U2VxICE9PSBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgICAgICBpZiAoaXNFeHBlbnNlQWJvcnRMaWtlRXJyb3IoZXJyb3IsIGNvbnRyb2xsZXIuc2lnbmFsKSkge1xyXG4gICAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImxvYWRMaXN0OmFib3J0ZWRcIiwge1xyXG4gICAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgICBtb2RlLFxyXG4gICAgICAgICAgICByZXF1ZXN0U2VxLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGVycm9yLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwibG9hZExpc3Q6Zm9yYmlkZGVuXCIsIHtcclxuICAgICAgICAgICAgcGFnZSxcclxuICAgICAgICAgICAgbW9kZSxcclxuICAgICAgICAgICAgcmVxdWVzdFNlcSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEVycm9yKFwibG9hZExpc3Q6ZmFpbGVkXCIsIHtcclxuICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICBtb2RlLFxyXG4gICAgICAgICAgcmVxdWVzdFNlcSxcclxuICAgICAgICAgIG1lc3NhZ2U6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogZXJyb3IsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIlRpY2tldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0cy5cIik7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICAgIHNldEl0ZW1zKFtdKTtcclxuICAgICAgICBzZXRUb3RhbCgwKTtcclxuICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBjb250cm9sbGVyLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgaGFuZGxlQWJvcnRTaWduYWwpO1xyXG4gICAgICAgIGlmIChyZXF1ZXN0U2VxID09PSBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8oXCJsb2FkTGlzdDpmaW5hbGl6ZVwiLCB7XHJcbiAgICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICAgIG1vZGUsXHJcbiAgICAgICAgICAgIHJlcXVlc3RTZXEsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICAgIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW2hhc0FjY2VzcywgbW9kZSwgb25Gb3JiaWRkZW4sIHBhZ2VTaXplXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHJlc2V0TGlzdCA9IHVzZUNhbGxiYWNrKChzb3VyY2UgPSBcInVua25vd25cIikgPT4ge1xyXG4gICAgaWYgKGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcInJlc2V0TGlzdDphYm9ydC1hY3RpdmUtcmVxdWVzdFwiLCB7XHJcbiAgICAgICAgc291cmNlLFxyXG4gICAgICAgIGFjdGl2ZVJlcXVlc3RLZXk6IGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCxcclxuICAgICAgICBhY3RpdmVSZXF1ZXN0U2VxOiBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQsXHJcbiAgICAgICAgc3RhY2s6IGJ1aWxkRXhwZW5zZVRpY2tldHNEZWJ1Z1N0YWNrKGByZXNldExpc3Q6JHtzb3VyY2V9YCksXHJcbiAgICAgIH0pO1xyXG4gICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50LmFib3J0KCk7XHJcbiAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyhcInJlc2V0TGlzdDpjbGVhci1zdGF0ZVwiLCB7XHJcbiAgICAgIHNvdXJjZSxcclxuICAgIH0pO1xyXG4gICAgc2V0SXRlbXMoW10pO1xyXG4gICAgc2V0VG90YWwoMCk7XHJcbiAgICBzZXRDdXJyZW50UGFnZSgxKTtcclxuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNsZWFyTGlzdENhY2hlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgLy8gVGlja2V0IGxpc3QgYXV0by1sb2FkIG11c3QgYWx3YXlzIGhpdCB0aGUgbGl2ZSBlbmRwb2ludC5cclxuICB9LCBbXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpZiAoYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCkge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJjbGVhbnVwOmFib3J0LWFjdGl2ZS1yZXF1ZXN0XCIsIHtcclxuICAgICAgICAgIGFjdGl2ZVJlcXVlc3RLZXk6IGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCxcclxuICAgICAgICAgIGFjdGl2ZVJlcXVlc3RTZXE6IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCxcclxuICAgICAgICAgIHN0YWNrOiBidWlsZEV4cGVuc2VUaWNrZXRzRGVidWdTdGFjayhcImNsZWFudXA6YWJvcnQtYWN0aXZlLXJlcXVlc3RcIiksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudC5hYm9ydCgpO1xyXG4gICAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaXRlbXMsXHJcbiAgICB0b3RhbCxcclxuICAgIGN1cnJlbnRQYWdlLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgbG9hZExpc3QsXHJcbiAgICByZXN0b3JlTGlzdFNuYXBzaG90LFxyXG4gICAgcmVzZXRMaXN0LFxyXG4gICAgY2xlYXJMaXN0Q2FjaGUsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdC50c1wiO1xuaW1wb3J0IHsgdG9FeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZUdhc3RvVHlwZUNhdGFsb2cudHNcIjtcbmltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcclxuICBFeHBlbnNlVGlja2V0TGlua0NhcmQsXHJcbiAgRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25Nb2RlLFxyXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcclxuaW1wb3J0IHsgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LCByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvc2Vzc2lvbkV4cGlyeS50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlU2NvcGVUb2tlbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2NvcGUudHNcIjtcclxuXHJcbmNvbnN0IEVYUEVOU0VfVElDS0VUX0xJTktfUkVUVVJOX1NUQVRFX0tFWV9QUkVGSVggPSBcImV4cGVuc2VfdGlja2V0X2xpbmtfcmV0dXJuX3N0YXRlX3YxXCI7XG5jb25zdCBFWFBFTlNFX1RJQ0tFVF9MSU5LX1JFVFVSTl9TVEFURV9UVExfTVMgPSAxMiAqIDYwICogNjAgKiAxMDAwO1xuXHJcbmV4cG9ydCB0eXBlIEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgPSB7XHJcbiAgc2hlZXRJZDogc3RyaW5nO1xyXG4gIHBhZ2U6IG51bWJlcjtcclxuICBzY3JvbGxZOiBudW1iZXI7XHJcbiAgZm9jdXNGaWxlSWQ6IHN0cmluZztcclxuICBmaWx0ZXJzOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90O1xyXG4gIHNlbGVjdGlvbk1vZGU6IEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZTtcclxuICBzZWxlY3RlZFRpY2tldHM6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtdO1xyXG4gIGV4Y2x1ZGVkSWRzOiBzdHJpbmdbXTtcclxuICBmaWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnM6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfCBudWxsO1xyXG4gIGZpbHRlcmVkU2VsZWN0aW9uVG90YWw6IG51bWJlcjtcclxufTtcclxuXHJcbmNvbnN0IGdldFNjb3BlZEtleSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBgJHtFWFBFTlNFX1RJQ0tFVF9MSU5LX1JFVFVSTl9TVEFURV9LRVlfUFJFRklYfV8ke2dldEV4cGVuc2VTY29wZVRva2VuKCl9YDtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUZpbGVJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVQcm9jZXNzZWRCeUFpID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB8IG51bGwgPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gZmFsc2UpIHJldHVybiB2YWx1ZTtcclxuICBpZiAodmFsdWUgPT09IDEgfHwgdmFsdWUgPT09IFwiMVwiIHx8IHZhbHVlID09PSBcInRydWVcIikgcmV0dXJuIHRydWU7XHJcbiAgaWYgKHZhbHVlID09PSAwIHx8IHZhbHVlID09PSBcIjBcIiB8fCB2YWx1ZSA9PT0gXCJmYWxzZVwiKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVOdWxsYWJsZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldEdhc3RvVHlwZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtcImdhc3RvVHlwZVwiXSA9PiB7XG4gIHJldHVybiB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlKHZhbHVlKSBhcyBFeHBlbnNlVGlja2V0TGlua0NhcmRbXCJnYXN0b1R5cGVcIl07XG59O1xuXHJcbmNvbnN0IG5vcm1hbGl6ZVNlbGVjdGlvbk1vZGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGUgPT4ge1xyXG4gIHJldHVybiB2YWx1ZSA9PT0gXCJmaWx0ZXJlZFwiID8gXCJmaWx0ZXJlZFwiIDogXCJzZWxlY3RlZFwiO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplU2VsZWN0ZWRUaWNrZXRzID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZVRpY2tldExpbmtDYXJkW10gPT4ge1xyXG4gIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiBbXTtcclxuXHJcbiAgY29uc3QgaXRlbXMgPSBuZXcgTWFwPHN0cmluZywgRXhwZW5zZVRpY2tldExpbmtDYXJkPigpO1xyXG4gIGZvciAoY29uc3QgZW50cnkgb2YgdmFsdWUpIHtcclxuICAgIGNvbnN0IGl0ZW0gPSAoZW50cnkgfHwge30pIGFzIFBhcnRpYWw8RXhwZW5zZVRpY2tldExpbmtDYXJkPjtcclxuICAgIGNvbnN0IGZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZChpdGVtLmZpbGVJZCk7XHJcbiAgICBpZiAoIWZpbGVJZCkgY29udGludWU7XHJcblxyXG4gICAgaXRlbXMuc2V0KGZpbGVJZCwge1xyXG4gICAgICBraW5kOiBcImxpbmtcIixcclxuICAgICAgZmlsZUlkLFxyXG4gICAgICBkZXNjcmlwdGlvbjogU3RyaW5nKGl0ZW0uZGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpLFxyXG4gICAgICBwcm9jZXNzZWRCeUFJOiBub3JtYWxpemVQcm9jZXNzZWRCeUFpKGl0ZW0ucHJvY2Vzc2VkQnlBSSksXHJcbiAgICAgIGN1cnJlbmN5Q29kZTogU3RyaW5nKGl0ZW0uY3VycmVuY3lDb2RlIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgICAgdG90YWxBbW91bnQ6IG5vcm1hbGl6ZU51bGxhYmxlTnVtYmVyKGl0ZW0udG90YWxBbW91bnQpLFxyXG4gICAgICB0cmFuc0RhdGU6IFN0cmluZyhpdGVtLnRyYW5zRGF0ZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICAgIGZpbGVOYW1lOiBTdHJpbmcoaXRlbS5maWxlTmFtZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICAgIGdhc3RvVHlwZTogbm9ybWFsaXplVGlja2V0R2FzdG9UeXBlKGl0ZW0uZ2FzdG9UeXBlKSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIEFycmF5LmZyb20oaXRlbXMudmFsdWVzKCkpO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplRXhjbHVkZWRJZHMgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmdbXSA9PiB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIFtdO1xyXG5cclxuICBjb25zdCBpZHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcclxuICBmb3IgKGNvbnN0IGVudHJ5IG9mIHZhbHVlKSB7XHJcbiAgICBjb25zdCBmaWxlSWQgPSBub3JtYWxpemVGaWxlSWQoZW50cnkpO1xyXG4gICAgaWYgKCFmaWxlSWQpIGNvbnRpbnVlO1xyXG4gICAgaWRzLmFkZChmaWxlSWQpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIEFycmF5LmZyb20oaWRzKTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZU5vbk5lZ2F0aXZlSW50ZWdlciA9ICh2YWx1ZTogdW5rbm93biwgZmFsbGJhY2sgPSAwKTogbnVtYmVyID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSAmJiBwYXJzZWQgPj0gMCA/IE1hdGguZmxvb3IocGFyc2VkKSA6IGZhbGxiYWNrO1xyXG59O1xyXG5cclxuLy8gTm9ybWFsaXplcyB0aGUgbGluay1tb2RlIHRpY2tldCByZXR1cm4gc3RhdGUgc28gYmFjayBuYXZpZ2F0aW9uIGNhbiByZXN0b3JlIGZpbHRlcnMgYW5kIHNlbGVjdGlvbiBzYWZlbHkuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSB8IG51bGwgPT4ge1xyXG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgcGF5bG9hZCA9IHZhbHVlIGFzIFBhcnRpYWw8RXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZT47XHJcbiAgY29uc3Qgc2hlZXRJZCA9IFN0cmluZyhwYXlsb2FkLnNoZWV0SWQgfHwgXCJcIikudHJpbSgpO1xyXG4gIGlmICghc2hlZXRJZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzaGVldElkLFxyXG4gICAgcGFnZTogTWF0aC5tYXgoMSwgbm9ybWFsaXplTm9uTmVnYXRpdmVJbnRlZ2VyKHBheWxvYWQucGFnZSwgMSkpLFxyXG4gICAgc2Nyb2xsWTogbm9ybWFsaXplTm9uTmVnYXRpdmVJbnRlZ2VyKHBheWxvYWQuc2Nyb2xsWSksXHJcbiAgICBmb2N1c0ZpbGVJZDogbm9ybWFsaXplRmlsZUlkKHBheWxvYWQuZm9jdXNGaWxlSWQpLFxyXG4gICAgZmlsdGVyczogbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90KHBheWxvYWQuZmlsdGVycyksXHJcbiAgICBzZWxlY3Rpb25Nb2RlOiBub3JtYWxpemVTZWxlY3Rpb25Nb2RlKHBheWxvYWQuc2VsZWN0aW9uTW9kZSksXHJcbiAgICBzZWxlY3RlZFRpY2tldHM6IG5vcm1hbGl6ZVNlbGVjdGVkVGlja2V0cyhwYXlsb2FkLnNlbGVjdGVkVGlja2V0cyksXHJcbiAgICBleGNsdWRlZElkczogbm9ybWFsaXplRXhjbHVkZWRJZHMocGF5bG9hZC5leGNsdWRlZElkcyksXHJcbiAgICBmaWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnM6IHBheWxvYWQuZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzXHJcbiAgICAgID8gbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90KHBheWxvYWQuZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzKVxyXG4gICAgICA6IG51bGwsXHJcbiAgICBmaWx0ZXJlZFNlbGVjdGlvblRvdGFsOiBub3JtYWxpemVOb25OZWdhdGl2ZUludGVnZXIocGF5bG9hZC5maWx0ZXJlZFNlbGVjdGlvblRvdGFsKSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gUmVhZHMgYSBzdG9yZWQgbGluay1tb2RlIHJldHVybiBzdGF0ZSB3aGVuIGl0IHN0aWxsIG1hdGNoZXMgdGhlIGFjdGl2ZSBleHBlbnNlIHNoZWV0LlxyXG5leHBvcnQgY29uc3QgcmVhZEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgPSAoc2hlZXRJZD86IHVua25vd24pOiBFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlIHwgbnVsbCA9PiB7XHJcbiAgY29uc3Qgc3RvcmVkID0gbm9ybWFsaXplRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZShcclxuICAgIGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeTxFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlPihnZXRTY29wZWRLZXkoKSlcclxuICApO1xyXG4gIGlmICghc3RvcmVkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBTdHJpbmcoc2hlZXRJZCB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCFzYWZlU2hlZXRJZCkgcmV0dXJuIHN0b3JlZDtcclxuICByZXR1cm4gc3RvcmVkLnNoZWV0SWQudG9VcHBlckNhc2UoKSA9PT0gc2FmZVNoZWV0SWQudG9VcHBlckNhc2UoKSA/IHN0b3JlZCA6IG51bGw7XHJcbn07XHJcblxyXG4vLyBQZXJzaXN0cyB0aGUgbWluaW11bSBsaW5rLW1vZGUgc3RhdGUgcmVxdWlyZWQgdG8gcmV0dXJuIGZyb20gdGlja2V0IGRldGFpbCB3aXRob3V0IGxvc2luZyBzZWxlY3Rpb24uXHJcbmV4cG9ydCBjb25zdCBzYXZlRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSA9IChcclxuICB2YWx1ZTogRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSB8IG51bGwgfCB1bmRlZmluZWRcclxuKTogRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKHZhbHVlKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHtcclxuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkoZ2V0U2NvcGVkS2V5KCksIG5vcm1hbGl6ZWQsIEVYUEVOU0VfVElDS0VUX0xJTktfUkVUVVJOX1NUQVRFX1RUTF9NUyk7XHJcbiAgcmV0dXJuIG5vcm1hbGl6ZWQ7XHJcbn07XHJcblxyXG4vLyBDbGVhcnMgYW55IHN0b3JlZCBsaW5rLW1vZGUgcmV0dXJuIHN0YXRlIGZvciB0aGUgY3VycmVudCBleHBlbnNlIHNjb3BlLlxyXG5leHBvcnQgY29uc3QgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlID0gKCk6IHZvaWQgPT4ge1xyXG4gIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoZ2V0U2NvcGVkS2V5KCkpO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxyXG4gIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCxcclxuICBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGUsXHJcbn0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25TdGF0ZSA9IHtcclxuICBzZWxlY3Rpb25Nb2RlOiBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGU7XHJcbiAgc2VsZWN0ZWRUaWNrZXRzOiBFeHBlbnNlVGlja2V0TGlua0NhcmRbXTtcclxuICBleGNsdWRlZElkczogc3RyaW5nW107XHJcbiAgZmlsdGVyZWRTbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB8IG51bGw7XHJcbiAgZmlsdGVyZWRUb3RhbENvdW50OiBudW1iZXI7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVGaWxlSWQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVNlbGVjdGlvbk1vZGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGUgPT4ge1xyXG4gIHJldHVybiB2YWx1ZSA9PT0gXCJmaWx0ZXJlZFwiID8gXCJmaWx0ZXJlZFwiIDogXCJzZWxlY3RlZFwiO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplRXhjbHVkZWRJZHMgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmdbXSA9PiB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIFtdO1xyXG5cclxuICBjb25zdCBpZHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcclxuICBmb3IgKGNvbnN0IGVudHJ5IG9mIHZhbHVlKSB7XHJcbiAgICBjb25zdCBmaWxlSWQgPSBub3JtYWxpemVGaWxlSWQoZW50cnkpO1xyXG4gICAgaWYgKCFmaWxlSWQpIGNvbnRpbnVlO1xyXG4gICAgaWRzLmFkZChmaWxlSWQpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIEFycmF5LmZyb20oaWRzKTtcclxufTtcclxuXHJcbmNvbnN0IHRvU2VsZWN0ZWRNYXAgPSAoaXRlbXM6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtdKTogUmVjb3JkPHN0cmluZywgRXhwZW5zZVRpY2tldExpbmtDYXJkPiA9PiB7XHJcbiAgY29uc3QgbmV4dDogUmVjb3JkPHN0cmluZywgRXhwZW5zZVRpY2tldExpbmtDYXJkPiA9IHt9O1xyXG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xyXG4gICAgY29uc3QgZmlsZUlkID0gbm9ybWFsaXplRmlsZUlkKGl0ZW0uZmlsZUlkKTtcclxuICAgIGlmICghZmlsZUlkKSBjb250aW51ZTtcclxuICAgIG5leHRbZmlsZUlkXSA9IGl0ZW07XHJcbiAgfVxyXG4gIHJldHVybiBuZXh0O1xyXG59O1xyXG5cclxuLy8gS2VlcHMgbGluay1tb2RlIHRpY2tldCBzZWxlY3Rpb24gc3RhYmxlIGFjcm9zcyBwYWdpbmcsIGZpbHRlcmVkIHNlbGVjdC1hbGwsIGFuZCBkZXRhaWwgcmV0dXJucy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uID0gKCkgPT4ge1xyXG4gIGNvbnN0IFtzZWxlY3Rpb25Nb2RlLCBzZXRTZWxlY3Rpb25Nb2RlXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZT4oXCJzZWxlY3RlZFwiKTtcclxuICBjb25zdCBbc2VsZWN0ZWRUaWNrZXRzQnlJZCwgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZF0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBFeHBlbnNlVGlja2V0TGlua0NhcmQ+Pih7fSk7XHJcbiAgY29uc3QgW2V4Y2x1ZGVkSWRzLCBzZXRFeGNsdWRlZElkc10gPSB1c2VTdGF0ZTxzdHJpbmdbXT4oW10pO1xyXG4gIGNvbnN0IFtmaWx0ZXJlZFNuYXBzaG90LCBzZXRGaWx0ZXJlZFNuYXBzaG90XSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbZmlsdGVyZWRUb3RhbENvdW50LCBzZXRGaWx0ZXJlZFRvdGFsQ291bnRdID0gdXNlU3RhdGUoMCk7XHJcblxyXG4gIGNvbnN0IHNlbGVjdGVkVGlja2V0cyA9IHVzZU1lbW8oKCkgPT4gT2JqZWN0LnZhbHVlcyhzZWxlY3RlZFRpY2tldHNCeUlkKSwgW3NlbGVjdGVkVGlja2V0c0J5SWRdKTtcclxuICBjb25zdCBleGNsdWRlZElkU2V0ID0gdXNlTWVtbygoKSA9PiBuZXcgU2V0KGV4Y2x1ZGVkSWRzKSwgW2V4Y2x1ZGVkSWRzXSk7XHJcbiAgY29uc3QgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSA9IHNlbGVjdGlvbk1vZGUgPT09IFwiZmlsdGVyZWRcIiAmJiAhIWZpbHRlcmVkU25hcHNob3Q7XHJcblxyXG4gIGNvbnN0IGNsZWFyU2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0U2VsZWN0aW9uTW9kZShcInNlbGVjdGVkXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZCh7fSk7XHJcbiAgICBzZXRFeGNsdWRlZElkcyhbXSk7XHJcbiAgICBzZXRGaWx0ZXJlZFNuYXBzaG90KG51bGwpO1xyXG4gICAgc2V0RmlsdGVyZWRUb3RhbENvdW50KDApO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgcmVzdG9yZVNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKChzdGF0ZTogRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25TdGF0ZSB8IG51bGwgfCB1bmRlZmluZWQpID0+IHtcclxuICAgIGlmICghc3RhdGUpIHtcclxuICAgICAgY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRNb2RlID0gbm9ybWFsaXplU2VsZWN0aW9uTW9kZShzdGF0ZS5zZWxlY3Rpb25Nb2RlKTtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRTZWxlY3RlZFRpY2tldHMgPSBBcnJheS5pc0FycmF5KHN0YXRlLnNlbGVjdGVkVGlja2V0cykgPyBzdGF0ZS5zZWxlY3RlZFRpY2tldHMgOiBbXTtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRTbmFwc2hvdCA9IHN0YXRlLmZpbHRlcmVkU25hcHNob3QgfHwgbnVsbDtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRFeGNsdWRlZElkcyA9IG5vcm1hbGl6ZUV4Y2x1ZGVkSWRzKHN0YXRlLmV4Y2x1ZGVkSWRzKTtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRGaWx0ZXJlZFRvdGFsID0gTnVtYmVyLmlzRmluaXRlKE51bWJlcihzdGF0ZS5maWx0ZXJlZFRvdGFsQ291bnQpKVxyXG4gICAgICA/IE1hdGgubWF4KDAsIE1hdGguZmxvb3IoTnVtYmVyKHN0YXRlLmZpbHRlcmVkVG90YWxDb3VudCkpKVxyXG4gICAgICA6IDA7XHJcblxyXG4gICAgc2V0U2VsZWN0aW9uTW9kZShub3JtYWxpemVkTW9kZSA9PT0gXCJmaWx0ZXJlZFwiICYmIG5vcm1hbGl6ZWRTbmFwc2hvdCA/IFwiZmlsdGVyZWRcIiA6IFwic2VsZWN0ZWRcIik7XHJcbiAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKHRvU2VsZWN0ZWRNYXAobm9ybWFsaXplZFNlbGVjdGVkVGlja2V0cykpO1xyXG4gICAgc2V0RXhjbHVkZWRJZHMobm9ybWFsaXplZE1vZGUgPT09IFwiZmlsdGVyZWRcIiA/IG5vcm1hbGl6ZWRFeGNsdWRlZElkcyA6IFtdKTtcclxuICAgIHNldEZpbHRlcmVkU25hcHNob3Qobm9ybWFsaXplZE1vZGUgPT09IFwiZmlsdGVyZWRcIiA/IG5vcm1hbGl6ZWRTbmFwc2hvdCA6IG51bGwpO1xyXG4gICAgc2V0RmlsdGVyZWRUb3RhbENvdW50KG5vcm1hbGl6ZWRNb2RlID09PSBcImZpbHRlcmVkXCIgPyBub3JtYWxpemVkRmlsdGVyZWRUb3RhbCA6IDApO1xyXG4gIH0sIFtjbGVhclNlbGVjdGlvbl0pO1xyXG5cclxuICBjb25zdCBzZWxlY3RBbGxCeUZpbHRlcnMgPSB1c2VDYWxsYmFjaygoc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsIHRvdGFsQ291bnQ6IG51bWJlcikgPT4ge1xyXG4gICAgc2V0U2VsZWN0aW9uTW9kZShcImZpbHRlcmVkXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZCh7fSk7XHJcbiAgICBzZXRFeGNsdWRlZElkcyhbXSk7XHJcbiAgICBzZXRGaWx0ZXJlZFNuYXBzaG90KHNuYXBzaG90KTtcclxuICAgIHNldEZpbHRlcmVkVG90YWxDb3VudChOdW1iZXIuaXNGaW5pdGUodG90YWxDb3VudCkgPyBNYXRoLm1heCgwLCBNYXRoLmZsb29yKHRvdGFsQ291bnQpKSA6IDApO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaXNTZWxlY3RlZCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGZpbGVJZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNhZmVGaWxlSWQgPSBub3JtYWxpemVGaWxlSWQoZmlsZUlkKTtcclxuICAgICAgaWYgKCFzYWZlRmlsZUlkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICBpZiAoaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSkge1xyXG4gICAgICAgIHJldHVybiAhZXhjbHVkZWRJZFNldC5oYXMoc2FmZUZpbGVJZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAhIXNlbGVjdGVkVGlja2V0c0J5SWRbc2FmZUZpbGVJZF07XHJcbiAgICB9LFxyXG4gICAgW2V4Y2x1ZGVkSWRTZXQsIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUsIHNlbGVjdGVkVGlja2V0c0J5SWRdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgdG9nZ2xlVGlja2V0ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodGlja2V0OiBFeHBlbnNlVGlja2V0TGlua0NhcmQpID0+IHtcclxuICAgICAgY29uc3QgZmlsZUlkID0gbm9ybWFsaXplRmlsZUlkKHRpY2tldC5maWxlSWQpO1xyXG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgaWYgKGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUpIHtcclxuICAgICAgICBzZXRFeGNsdWRlZElkcygocHJldmlvdXMpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG5leHQgPSBuZXcgU2V0KHByZXZpb3VzKTtcclxuICAgICAgICAgIGlmIChuZXh0LmhhcyhmaWxlSWQpKSB7XHJcbiAgICAgICAgICAgIG5leHQuZGVsZXRlKGZpbGVJZCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXh0LmFkZChmaWxlSWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV4dCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKChwcmV2aW91cykgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXZpb3VzIH07XHJcbiAgICAgICAgaWYgKG5leHRbZmlsZUlkXSkge1xyXG4gICAgICAgICAgZGVsZXRlIG5leHRbZmlsZUlkXTtcclxuICAgICAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBuZXh0W2ZpbGVJZF0gPSB0aWNrZXQ7XHJcbiAgICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGh5ZHJhdGVWaXNpYmxlVGlja2V0cyA9IHVzZUNhbGxiYWNrKChpdGVtczogRXhwZW5zZVRpY2tldExpbmtDYXJkW10pID0+IHtcclxuICAgIGlmIChzZWxlY3Rpb25Nb2RlICE9PSBcInNlbGVjdGVkXCIgfHwgaXRlbXMubGVuZ3RoIDwgMSkgcmV0dXJuO1xyXG5cclxuICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXZpb3VzIH07XHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xyXG4gICAgICAgIGNvbnN0IGZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZChpdGVtLmZpbGVJZCk7XHJcbiAgICAgICAgaWYgKCFmaWxlSWQgfHwgIW5leHRbZmlsZUlkXSkgY29udGludWU7XHJcbiAgICAgICAgbmV4dFtmaWxlSWRdID0gaXRlbTtcclxuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gY2hhbmdlZCA/IG5leHQgOiBwcmV2aW91cztcclxuICAgIH0pO1xyXG4gIH0sIFtzZWxlY3Rpb25Nb2RlXSk7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVTZWxlY3RlZENvdW50ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZmFsbGJhY2tUb3RhbENvdW50ID0gMCk6IG51bWJlciA9PiB7XHJcbiAgICAgIGlmICghaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSkge1xyXG4gICAgICAgIHJldHVybiBzZWxlY3RlZFRpY2tldHMubGVuZ3RoO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBiYXNlQ291bnQgPSBmaWx0ZXJlZFRvdGFsQ291bnQgPiAwID8gZmlsdGVyZWRUb3RhbENvdW50IDogTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihmYWxsYmFja1RvdGFsQ291bnQpKTtcclxuICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIGJhc2VDb3VudCAtIGV4Y2x1ZGVkSWRzLmxlbmd0aCk7XHJcbiAgICB9LFxyXG4gICAgW2V4Y2x1ZGVkSWRzLmxlbmd0aCwgZmlsdGVyZWRUb3RhbENvdW50LCBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlLCBzZWxlY3RlZFRpY2tldHMubGVuZ3RoXVxyXG4gICk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzZWxlY3Rpb25Nb2RlLFxyXG4gICAgc2VsZWN0ZWRUaWNrZXRzLFxyXG4gICAgZXhjbHVkZWRJZHMsXHJcbiAgICBmaWx0ZXJlZFNuYXBzaG90LFxyXG4gICAgZmlsdGVyZWRUb3RhbENvdW50LFxyXG4gICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSxcclxuICAgIGlzU2VsZWN0ZWQsXHJcbiAgICB0b2dnbGVUaWNrZXQsXHJcbiAgICBjbGVhclNlbGVjdGlvbixcclxuICAgIHJlc3RvcmVTZWxlY3Rpb24sXHJcbiAgICBzZWxlY3RBbGxCeUZpbHRlcnMsXHJcbiAgICBoeWRyYXRlVmlzaWJsZVRpY2tldHMsXHJcbiAgICByZXNvbHZlU2VsZWN0ZWRDb3VudCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVkdWNlciB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkUmVxdWVzdCA9IHtcclxuICBwYWdlOiBudW1iZXI7XHJcbiAgc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3Q7XHJcbiAgY2xlYXJDYWNoZTogYm9vbGVhbjtcclxuICByZXNldEJlZm9yZUxvYWQ6IGJvb2xlYW47XHJcbiAgd2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeTogYm9vbGVhbjtcclxufTtcclxuXHJcbnR5cGUgQXV0b21hdGljTG9hZEFjdGlvbiA9XHJcbiAgfCB7XHJcbiAgICAgIHR5cGU6IFwic2NoZWR1bGVcIjtcclxuICAgICAgcmVxdWVzdDogRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRSZXF1ZXN0O1xyXG4gICAgfVxyXG4gIHwge1xyXG4gICAgICB0eXBlOiBcImNsZWFyXCI7XHJcbiAgICB9XHJcbiAgfCB7XHJcbiAgICAgIHR5cGU6IFwiZGlzYWJsZV9saW5rX3dhaXRcIjtcclxuICAgIH07XHJcblxyXG5jb25zdCBhdXRvbWF0aWNMb2FkUmVkdWNlciA9IChcclxuICBzdGF0ZTogRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRSZXF1ZXN0IHwgbnVsbCxcclxuICBhY3Rpb246IEF1dG9tYXRpY0xvYWRBY3Rpb25cclxuKTogRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRSZXF1ZXN0IHwgbnVsbCA9PiB7XHJcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgY2FzZSBcInNjaGVkdWxlXCI6XHJcbiAgICAgIHJldHVybiBhY3Rpb24ucmVxdWVzdDtcclxuICAgIGNhc2UgXCJjbGVhclwiOlxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIGNhc2UgXCJkaXNhYmxlX2xpbmtfd2FpdFwiOlxyXG4gICAgICByZXR1cm4gc3RhdGUgPyB7IC4uLnN0YXRlLCB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiBmYWxzZSB9IDogbnVsbDtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBzdGF0ZTtcclxuICB9XHJcbn07XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkQXJncyA9IHtcclxuICBpc0xpbmtNb2RlOiBib29sZWFuO1xyXG4gIGNhblByb2Nlc3NMaW5rTW9kZTogYm9vbGVhbjtcclxuICBsaW5rU2hlZXRDaGVja0J1c3k6IGJvb2xlYW47XHJcbiAgbGlua1NoZWV0TG9ja2VkOiBib29sZWFuO1xyXG4gIGNsZWFyTGlzdENhY2hlOiAoKSA9PiB2b2lkO1xyXG4gIHJlc2V0TGlzdDogKHNvdXJjZT86IHN0cmluZykgPT4gdm9pZDtcclxuICBsb2FkTGlzdDogKHBhZ2U6IG51bWJlciwgc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpID0+IFByb21pc2U8dm9pZD47XHJcbn07XHJcblxyXG5jb25zdCBFWFBFTlNFX1RJQ0tFVFNfQVVUT19MT0FEX0xPR19QUkVGSVggPSBcIltleHBlbnNlLXRpY2tldHM6YXV0by1sb2FkXVwiO1xyXG5cclxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZEluZm8gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLmluZm8gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS5pbmZvKEVYUEVOU0VfVElDS0VUU19BVVRPX0xPQURfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZFdhcm4gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLndhcm4gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS53YXJuKEVYUEVOU0VfVElDS0VUU19BVVRPX0xPQURfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gUXVldWVzIG9uZSB0aWNrZXQgbGlzdCByZWxvYWQgYW5kIHJlbGVhc2VzIGl0IG9ubHkgd2hlbiBsaW5rLW1vZGUgcHJlY29uZGl0aW9ucyBhcmUgcmVhZHkuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZCA9ICh7XHJcbiAgaXNMaW5rTW9kZSxcclxuICBjYW5Qcm9jZXNzTGlua01vZGUsXHJcbiAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gIGxpbmtTaGVldExvY2tlZCxcclxuICBjbGVhckxpc3RDYWNoZSxcclxuICByZXNldExpc3QsXHJcbiAgbG9hZExpc3QsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkQXJncykgPT4ge1xyXG4gIGNvbnN0IFtwZW5kaW5nQXV0b21hdGljTG9hZCwgZGlzcGF0Y2hdID0gdXNlUmVkdWNlcihhdXRvbWF0aWNMb2FkUmVkdWNlciwgbnVsbCk7XHJcblxyXG4gIGNvbnN0IHJ1bkF1dG9tYXRpY0xpc3RMb2FkID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoXHJcbiAgICAgIHBhZ2U6IG51bWJlcixcclxuICAgICAgc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICBjbGVhckNhY2hlPzogYm9vbGVhbjtcclxuICAgICAgICByZXNldEJlZm9yZUxvYWQ/OiBib29sZWFuO1xyXG4gICAgICAgIHdhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHk/OiBib29sZWFuO1xyXG4gICAgICB9ID0ge31cclxuICAgICkgPT4ge1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkSW5mbyhcInJ1bkF1dG9tYXRpY0xpc3RMb2FkOnNjaGVkdWxlXCIsIHtcclxuICAgICAgICBwYWdlLFxyXG4gICAgICAgIHNuYXBzaG90LFxyXG4gICAgICAgIG9wdGlvbnMsXHJcbiAgICAgIH0pO1xyXG4gICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJzY2hlZHVsZVwiLFxyXG4gICAgICAgIHJlcXVlc3Q6IHtcclxuICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICBzbmFwc2hvdCxcclxuICAgICAgICAgIGNsZWFyQ2FjaGU6IG9wdGlvbnMuY2xlYXJDYWNoZSA9PT0gdHJ1ZSxcclxuICAgICAgICAgIHJlc2V0QmVmb3JlTG9hZDogb3B0aW9ucy5yZXNldEJlZm9yZUxvYWQgPT09IHRydWUsXHJcbiAgICAgICAgICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiBvcHRpb25zLndhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHkgPT09IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFwZW5kaW5nQXV0b21hdGljTG9hZCkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChwZW5kaW5nQXV0b21hdGljTG9hZC53YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5KSB7XHJcbiAgICAgIGlmICghaXNMaW5rTW9kZSkge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzQXV0b0xvYWRXYXJuKFwicGVuZGluZ0F1dG9tYXRpY0xvYWQ6ZGlzYWJsZS1saW5rLXdhaXRcIiwge1xyXG4gICAgICAgICAgcGFnZTogcGVuZGluZ0F1dG9tYXRpY0xvYWQucGFnZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IFwiZGlzYWJsZV9saW5rX3dhaXRcIiB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghY2FuUHJvY2Vzc0xpbmtNb2RlIHx8IGxpbmtTaGVldENoZWNrQnVzeSkge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzQXV0b0xvYWRJbmZvKFwicGVuZGluZ0F1dG9tYXRpY0xvYWQ6d2FpdGluZy1saW5rLW1vZGUtcmVhZHlcIiwge1xyXG4gICAgICAgICAgcGFnZTogcGVuZGluZ0F1dG9tYXRpY0xvYWQucGFnZSxcclxuICAgICAgICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcclxuICAgICAgICAgIGxpbmtTaGVldENoZWNrQnVzeSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChsaW5rU2hlZXRMb2NrZWQpIHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkV2FybihcInBlbmRpbmdBdXRvbWF0aWNMb2FkOmNsZWFyLWxpbmstbG9ja2VkXCIsIHtcclxuICAgICAgICAgIHBhZ2U6IHBlbmRpbmdBdXRvbWF0aWNMb2FkLnBhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcImNsZWFyXCIgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyBwYWdlLCBzbmFwc2hvdCwgY2xlYXJDYWNoZSwgcmVzZXRCZWZvcmVMb2FkIH0gPSBwZW5kaW5nQXV0b21hdGljTG9hZDtcclxuICAgIGRpc3BhdGNoKHsgdHlwZTogXCJjbGVhclwiIH0pO1xyXG4gICAgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZEluZm8oXCJwZW5kaW5nQXV0b21hdGljTG9hZDpleGVjdXRlXCIsIHtcclxuICAgICAgcGFnZSxcclxuICAgICAgc25hcHNob3QsXHJcbiAgICAgIGNsZWFyQ2FjaGUsXHJcbiAgICAgIHJlc2V0QmVmb3JlTG9hZCxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChjbGVhckNhY2hlKSB7XHJcbiAgICAgIGNsZWFyTGlzdENhY2hlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlc2V0QmVmb3JlTG9hZCkge1xyXG4gICAgICByZXNldExpc3QoXCJhdXRvbWF0aWMtbG9hZDpyZXNldC1iZWZvcmUtbG9hZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICB2b2lkIGxvYWRMaXN0KHBhZ2UsIHNuYXBzaG90KTtcclxuICB9LCBbXHJcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXHJcbiAgICBjbGVhckxpc3RDYWNoZSxcclxuICAgIGlzTGlua01vZGUsXHJcbiAgICBsaW5rU2hlZXRDaGVja0J1c3ksXHJcbiAgICBsaW5rU2hlZXRMb2NrZWQsXHJcbiAgICBsb2FkTGlzdCxcclxuICAgIHBlbmRpbmdBdXRvbWF0aWNMb2FkLFxyXG4gICAgcmVzZXRMaXN0LFxyXG4gIF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcnVuQXV0b21hdGljTGlzdExvYWQsXHJcbiAgfTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBa0c7OztBQ0FsRyxtQkFBbUM7QUF5RDdCO0FBckNOLElBQU0sZ0NBQWdDLENBQUM7QUFBQSxFQUNyQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUEwQztBQUN4QyxRQUFNLHFCQUFxQixnQkFBZ0IsQ0FBQztBQUU1QyxRQUFN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QUMsVUFBVSxZQUFZLENBQUMsVUFBVSxTQUFTO0FBQzdEO0FBQUEsVUFDRjtBQUVBLGVBQUssU0FBUyxNQUFNLFFBQVE7QUFBQSxRQUM5QjtBQUFBLFFBQ0EsUUFBUTtBQUFBO0FBQUEsSUFDVjtBQUFBLElBRUMsY0FBYyxzQkFBc0IsQ0FBQyxzQkFBc0IsQ0FBQyxrQkFDM0QsNkNBQUMsNkJBQWtCLFdBQVcsS0FBSyxzQ0FBc0Msb0JBQW9CLEdBQzNGO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFPLEtBQUssc0NBQXNDLG9CQUFvQjtBQUFBLFFBQ3RFLFNBQVM7QUFBQSxRQUNULFVBQVUsZ0JBQWdCLGlCQUFpQixzQkFBc0I7QUFBQTtBQUFBLElBQ25FLEdBQ0YsSUFDRTtBQUFBLElBRUgsbUJBQW1CLENBQUMsYUFDbkI7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVcsS0FBSyw2QkFBNkIscUJBQWtCO0FBQUEsUUFDL0QsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsZUFBZSxLQUFLLDZCQUE2QixxQkFBa0I7QUFBQSxRQUNuRSxXQUFXO0FBQUE7QUFBQSxJQUNiLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLHFCQUFxQixNQUFNO0FBQy9CLFNBQ0UsNkNBQUMsZ0NBQXFCLHlCQUF1QixNQUMzQyx1REFBQyw2QkFBMEIsR0FDN0I7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLHNCQUFzQjtBQUM3RCxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLHNCQUFtQixDQUFFO0FBQ2pEO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyw2QkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJub3JtYWxpemVGaWxlSWQiLCAibm9ybWFsaXplU2VsZWN0aW9uTW9kZSIsICJub3JtYWxpemVFeGNsdWRlZElkcyIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0IiwgImlzTGlua01vZGUiLCAiZnJvbURhdGUiLCAiY3VycmVuY3lDb2RlIiwgImNhY2hlZFN0YXRlIl0KfQo=
