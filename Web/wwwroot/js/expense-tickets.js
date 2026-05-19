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
} from "./chunks/chunk-TK5J7HED.js";
import {
  CheckIcon_default
} from "./chunks/chunk-WYCUWPMC.js";
import {
  HistorySummary_default
} from "./chunks/chunk-DYUBZDCD.js";
import {
  getExpenseTicketStatusFilterOptions,
  getExpenseTicketStatusLabel,
  normalizeExpenseTicketFilterSnapshot,
  normalizeExpenseTicketStatusFilterCode,
  useExpenseTicketsFilterCache
} from "./chunks/chunk-UFSYGIE3.js";
import {
  mapWindowEnumOptions
} from "./chunks/chunk-YM2TI2W6.js";
import {
  useExpenseTicketLinkSheetGate
} from "./chunks/chunk-OKBP6KAN.js";
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
} from "./chunks/chunk-TJ3YOGDE.js";
import "./chunks/chunk-2BH5SUTF.js";
import {
  RemoteSearchCombobox_default
} from "./chunks/chunk-BU755TFH.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-IB6JTALH.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-6TVWMV24.js";
import {
  CompactPagination_default,
  FloatingActionButton_default,
  useTimelineCardEffects
} from "./chunks/chunk-MYQREIJ7.js";
import "./chunks/chunk-HF2ANVLM.js";
import {
  buildExpenseSheetDetailUrl,
  clearExpenseTicketReturnContext,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-5LXV4724.js";
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
} from "./chunks/chunk-5YP53PRM.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-PHLRNKZH.js";
import {
  clearExpenseActingUserOverride,
  getExpenseScopeToken,
  setExpenseActingUserOverride
} from "./chunks/chunk-SRZDJTMJ.js";
import {
  setTopbarActionGroupReady
} from "./chunks/chunk-ZBKHPZJX.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL0V4cGVuc2VUaWNrZXRzUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL3VzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlRWZmZWN0RXZlbnQsIHVzZUxheW91dEVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xyXG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3hcIjtcclxuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uLCB7IHR5cGUgRmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbSB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XHJcbmltcG9ydCBQYWdlQm90dG9tQWN0aW9ucywgeyBQYWdlQm90dG9tQWN0aW9uQnV0dG9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9QYWdlQm90dG9tQWN0aW9ucy50c3hcIjtcclxuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TcGlubmVyLnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCwgdHlwZSBBdXRoTWFuYWdlZFVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcclxuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcclxuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVRpbWVsaW5lQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlVGltZWxpbmVDYXJkLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldExpbmtUaW1lbGluZUl0ZW0gZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmtUaW1lbGluZUl0ZW0udHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0TGlua0J1bGtTdW1tYXJ5IGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5rQnVsa1N1bW1hcnkudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbCBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlUXVpY2tUaWNrZXRQcm9ncmVzc092ZXJsYXkudHN4XCI7XHJcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlVGlja2V0U3RhdHVzTGFiZWwgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VUaWNrZXRTdGF0dXNDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgsXHJcbiAgbGlua0V4cGVuc2VTaGVldFRpY2tldHNCdWxrLFxyXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSwgc2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQWN0aW5nVXNlci50c1wiO1xyXG5pbXBvcnQgeyBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsIG5hdmlnYXRlVG9FeHBlbnNlVXJsLCBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IG1hcFdpbmRvd0VudW1PcHRpb25zLCB0eXBlIEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcclxuaW1wb3J0IHtcclxuICBidWlsZEV4cGVuc2VTaGVldERldGFpbFVybCxcclxuICBjbGVhckV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgaGFzRXhwZW5zZVJldHVyblJlZmVycmVyLCBpc0V4cGVuc2VIaXN0b3J5QmFja0ZvcndhcmROYXZpZ2F0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VIaXN0b3J5TmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzLCBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIHNhZmVUZXh0LCBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93IH0gZnJvbSBcIi4uL2RldGFpbC91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cudHNcIjtcclxuaW1wb3J0IHsgVElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEUgfSBmcm9tIFwiLi4vZGV0YWlsL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvd0NvcmUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0xpc3REYXRhIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlLCB0eXBlIEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG4gIHJlYWRFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG4gIHNhdmVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgYnVpbGRFeHBlbnNlVGlja2V0TGlua0J1bGtGaWx0ZXJzIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VQYXlsb2FkQnVpbGRlcnMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0byB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXHJcbiAgRXhwZW5zZVRpY2tldExpbmtDYXJkLFxyXG4gIEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW0sXHJcbn0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbiB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWQudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldExpbmtTaGVldEdhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZS50c1wiO1xyXG5pbXBvcnQgeyBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5IGFzIHJldmVhbFRvcGJhckFjdGlvbkdyb3VwIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RvcGJhckFjdGlvblZpc2liaWxpdHkudHNcIjtcclxuXHJcbmNvbnN0IFBBR0VfU0laRSA9IDEwO1xyXG5jb25zdCBBTExPV0VEX0dBU1RPX1RZUEVTID0gbmV3IFNldDxudW1iZXI+KFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0pO1xyXG5cclxuY29uc3QgR0FTVE9fVFlQRV9MQUJFTF9LRVlTOiBSZWNvcmQ8bnVtYmVyLCB7IGtleTogc3RyaW5nOyBmYWxsYmFjazogc3RyaW5nIH0+ID0ge1xyXG4gIDA6IHsga2V5OiBcIkVudW1fTm9uZVwiLCBmYWxsYmFjazogXCJOb25lXCIgfSxcclxuICAxOiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9QZWFqZVwiLCBmYWxsYmFjazogXCJQZWFqZVwiIH0sXHJcbiAgMjogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfUGFya2luZ1wiLCBmYWxsYmFjazogXCJQYXJraW5nXCIgfSxcclxuICAzOiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9LbVwiLCBmYWxsYmFjazogXCJLbVwiIH0sXHJcbiAgNDogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfRGVzYXl1bm9cIiwgZmFsbGJhY2s6IFwiRGVzYXl1bm9cIiB9LFxyXG4gIDU6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0NvbWlkYVwiLCBmYWxsYmFjazogXCJDb21pZGFcIiB9LFxyXG4gIDY6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0NlbmFcIiwgZmFsbGJhY2s6IFwiQ2VuYVwiIH0sXHJcbiAgNzogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfSG90ZWxcIiwgZmFsbGJhY2s6IFwiSG90ZWxcIiB9LFxyXG4gIDg6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1Zhcmlvc1wiLCBmYWxsYmFjazogXCJWYXJpb3NcIiB9LFxyXG4gIDE0OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9UYXhpXCIsIGZhbGxiYWNrOiBcIlRheGlcIiB9LFxyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVXNlcklkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XHJcblxyXG5jb25zdCBpc1NhbWVVc2VyID0gKGxlZnQ6IHN0cmluZywgcmlnaHQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRMZWZ0ID0gbm9ybWFsaXplVXNlcklkKGxlZnQpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFJpZ2h0ID0gbm9ybWFsaXplVXNlcklkKHJpZ2h0KS50b1VwcGVyQ2FzZSgpO1xyXG4gIHJldHVybiAhIW5vcm1hbGl6ZWRMZWZ0ICYmIG5vcm1hbGl6ZWRMZWZ0ID09PSBub3JtYWxpemVkUmlnaHQ7XHJcbn07XHJcblxyXG5jb25zdCBlbnN1cmVDdXJyZW50VXNlckluTGlzdCA9ICh1c2VyczogQXV0aE1hbmFnZWRVc2VyW10sIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nKTogQXV0aE1hbmFnZWRVc2VyW10gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50ID0gbm9ybWFsaXplVXNlcklkKGN1cnJlbnRBeFVzZXJJZCk7XHJcbiAgaWYgKCFub3JtYWxpemVkQ3VycmVudCkgcmV0dXJuIHVzZXJzO1xyXG4gIGlmICh1c2Vycy5zb21lKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZEN1cnJlbnQpKSkgcmV0dXJuIHVzZXJzO1xyXG4gIHJldHVybiBbXHJcbiAgICB7XHJcbiAgICAgIGNybVVzZXJJZDogbm9ybWFsaXplZEN1cnJlbnQsXHJcbiAgICAgIGF4VXNlcklkOiBub3JtYWxpemVkQ3VycmVudCxcclxuICAgICAgbmFtZTogbm9ybWFsaXplZEN1cnJlbnQsXHJcbiAgICB9LFxyXG4gICAgLi4udXNlcnMsXHJcbiAgXTtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbiA9IChyZXF1ZXN0ZWRVc2VySWQ6IHN0cmluZywgY3VycmVudEF4VXNlcklkOiBzdHJpbmcsIHVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFJlcXVlc3RlZCA9IG5vcm1hbGl6ZVVzZXJJZChyZXF1ZXN0ZWRVc2VySWQpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50ID0gbm9ybWFsaXplVXNlcklkKGN1cnJlbnRBeFVzZXJJZCk7XHJcbiAgaWYgKG5vcm1hbGl6ZWRSZXF1ZXN0ZWQpIHtcclxuICAgIGNvbnN0IGZvdW5kID0gdXNlcnMuZmluZCgoZW50cnkpID0+IGlzU2FtZVVzZXIoZW50cnkuYXhVc2VySWQsIG5vcm1hbGl6ZWRSZXF1ZXN0ZWQpKTtcclxuICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kLmF4VXNlcklkO1xyXG4gIH1cclxuICBpZiAobm9ybWFsaXplZEN1cnJlbnQpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZEN1cnJlbnQpKTtcclxuICAgIHJldHVybiBzZWxmPy5heFVzZXJJZCB8fCBub3JtYWxpemVkQ3VycmVudDtcclxuICB9XHJcbiAgcmV0dXJuIFwiXCI7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZExpbmtNb2RlSW5pdGlhbFNuYXBzaG90ID0gKG1hbmFnZWRVc2VySWQgPSBcIlwiKTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9PiB7XHJcbiAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xyXG4gIGNvbnN0IGZyb21EYXRlID0gbmV3IERhdGUodG9kYXkpO1xyXG4gIC8vIEtlZXAgYXV0b21hdGljIGxpbmstbW9kZSBsb2FkIGJvdW5kZWQgdG8gYXZvaWQgaGVhdnkgdXBzdHJlYW0gc2NhbnMuXHJcbiAgZnJvbURhdGUuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAyOSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBmcm9tRGF0ZTogdG9Jc29EYXRlKGZyb21EYXRlKSxcclxuICAgIHRvRGF0ZTogdG9Jc29EYXRlKHRvZGF5KSxcclxuICAgIGZpbHRlcktleTogXCJcIixcclxuICAgIGN1cnJlbmN5Q29kZTogXCJcIixcclxuICAgIG1hbmFnZWRVc2VySWQ6IG5vcm1hbGl6ZVVzZXJJZChtYW5hZ2VkVXNlcklkKSxcclxuICAgIHN0YXR1c0ZpbHRlcjogMCxcclxuICAgIGdhc3RvVHlwZUZpbHRlcjogXCJcIixcclxuICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXI6IFwiYWxsXCIsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVMaW5rTW9kZUJsb2NrZWRNZXNzYWdlID0gKGlzUGFpZDogYm9vbGVhbik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKGlzUGFpZCkge1xyXG4gICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9QYWlkUmVhZE9ubHlcIiwgXCJMYXMgaG9qYXMgZGUgZ2FzdG8gcGFnYWRhcyBzb24gZGUgc29sbyBsZWN0dXJhLlwiKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUmVhZE9ubHlCeVN0YXR1c1wiLCBcIk5vIHNlIHB1ZWRlIGVkaXRhciBlc3RhIGhvamEgZGUgZ2FzdG9zIGVuIGVsIGVzdGFkbyBhY3R1YWwuXCIpO1xyXG59O1xyXG5cclxuY29uc3QgRVhQRU5TRV9USUNLRVRTX0xPR19QUkVGSVggPSBcIltleHBlbnNlLXRpY2tldHNdXCI7XHJcblxyXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c0luZm8gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLmluZm8gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS5pbmZvKEVYUEVOU0VfVElDS0VUU19MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c1dhcm4gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLndhcm4gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS53YXJuKEVYUEVOU0VfVElDS0VUU19MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBWYWxpZGF0ZXMgd2hldGhlciBvbmUgdGlja2V0IGNhcmQgY2FuIHBhcnRpY2lwYXRlIGluIGJ1bGsgbGluayBtb2RlLlxyXG5jb25zdCBjYW5TZWxlY3RUaWNrZXRGb3JMaW5rID0gKGl0ZW06IEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW0pOiBib29sZWFuID0+IHtcclxuICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChpdGVtLmZpbGVJZCk7XHJcbiAgcmV0dXJuICEhZmlsZUlkO1xyXG59O1xyXG5cclxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxyXG5jb25zdCBib290c3RyYXBFeHBlbnNlQXBpQXV0aCA9ICgpID0+IHtcclxuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCh7XHJcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcclxuICAgIGVudHJhT2lkOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxyXG4gICAgYXBwQ29kZTogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRGYWxsYmFja0dhc3RvVHlwZU9wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcclxuICByZXR1cm4gT2JqZWN0LmVudHJpZXMoR0FTVE9fVFlQRV9MQUJFTF9LRVlTKVxyXG4gICAgLm1hcCgoW2NvZGUsIGNmZ10pID0+ICh7XHJcbiAgICAgIHZhbHVlOiBTdHJpbmcoY29kZSksXHJcbiAgICAgIHRleHQ6IGluZFQoY2ZnLmtleSwgY2ZnLmZhbGxiYWNrKSxcclxuICAgIH0pKVxyXG4gICAgLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiBOdW1iZXIobGVmdC52YWx1ZSkgLSBOdW1iZXIocmlnaHQudmFsdWUpKTtcclxufTtcclxuXHJcbmNvbnN0IE5ld1RpY2tldEljb24gPSAoKSA9PiAoXHJcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD17MS41fSBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzc05hbWU9XCJzaXplLTZcIj5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMCAyMGgtNWEyIDIgMCAwIDEgLTIgLTJ2LTlhMiAyIDAgMCAxIDIgLTJoMWEyIDIgMCAwIDAgMiAtMmExIDEgMCAwIDEgMSAtMWg2YTEgMSAwIDAgMSAxIDFhMiAyIDAgMCAwIDIgMmgxYTIgMiAwIDAgMSAyIDJ2MlwiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNC4zNjIgMTEuMTVhMyAzIDAgMSAwIC00LjE0NCA0LjI2M1wiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAyMXYtNGEyIDIgMCAxIDEgNCAwdjRcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMTloNFwiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0yMSAxNXY2XCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRzUGFnZUNvbnRlbnQgPSAoKSA9PiB7XHJcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJWaWV3XCIpO1xyXG4gIGNvbnN0IGNhbkNyZWF0ZVRpY2tldCA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiQWRkXCIpO1xyXG4gIGNvbnN0IGNhbkxpbmtTaGVldExpbmVzID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJBZGRcIik7XHJcbiAgY29uc3Qge1xyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHN1Ym9yZGluYXRlcyxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBzZXRTZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gIH0gPSB1c2VBdXRoQ29udGV4dCgpO1xyXG4gIGNvbnN0IHRpbWVsaW5lQ29udGFpbmVyUmVmID0gUmVhY3QudXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgY2FtZXJhSW5wdXRSZWYgPSBSZWFjdC51c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGdhbGxlcnlJbnB1dFJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgZGlkUmVzdG9yZU9uTW91bnRSZWYgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xyXG4gIGNvbnN0IHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmID0gUmVhY3QudXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHBlbmRpbmdGb2N1c0ZpbGVJZFJlZiA9IFJlYWN0LnVzZVJlZihcIlwiKTtcclxuICBjb25zdCBsaW5rTW9kZUNvbnRleHQgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgY29uc3QgYWN0aW9uID0gc2FmZVRleHQodXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJhY3Rpb25cIikpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBjb25zdCBob2phR2FzdG9zSWQgPSBzYWZlVGV4dCh1cmwuc2VhcmNoUGFyYW1zLmdldChcImhvamFHYXN0b3NJZFwiKSk7XHJcbiAgICBjb25zdCBpc0xpbmtNb2RlID0gYWN0aW9uID09PSBcImxpbmtcIiAmJiAhIWhvamFHYXN0b3NJZDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGlzTGlua01vZGUsXHJcbiAgICAgIHNoZWV0SWQ6IGhvamFHYXN0b3NJZCxcclxuICAgICAgc2hlZXRPcmlnaW46IGlzTGlua01vZGUgPyAoXCJzaGVldC1saW5rXCIgYXMgY29uc3QpIDogKCEhaG9qYUdhc3Rvc0lkID8gKFwic2hlZXQtY3JlYXRlXCIgYXMgY29uc3QpIDogbnVsbCksXHJcbiAgICAgIGZpeGVkU3RhdHVzRmlsdGVyOiBpc0xpbmtNb2RlID8gKDAgYXMgY29uc3QpIDogbnVsbCxcclxuICAgIH07XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBpc0xpbmtNb2RlID0gbGlua01vZGVDb250ZXh0LmlzTGlua01vZGU7XHJcbiAgY29uc3QgbGlua1NoZWV0SWQgPSBsaW5rTW9kZUNvbnRleHQuc2hlZXRJZDtcclxuICBjb25zdCBzaGVldENhbGxlck9yaWdpbiA9IGxpbmtNb2RlQ29udGV4dC5zaGVldE9yaWdpbjtcclxuICBjb25zdCBoYXNTaGVldENhbGxlckNvbnRleHQgPSAhIWxpbmtTaGVldElkICYmICEhc2hlZXRDYWxsZXJPcmlnaW47XHJcbiAgY29uc3QgZml4ZWRTdGF0dXNGaWx0ZXIgPSBsaW5rTW9kZUNvbnRleHQuZml4ZWRTdGF0dXNGaWx0ZXI7XHJcbiAgY29uc3QgY2FuUHJvY2Vzc0xpbmtNb2RlID0gIWlzTGlua01vZGUgfHwgY2FuTGlua1NoZWV0TGluZXM7XHJcbiAgY29uc3QgbWFuYWdlZFVzZXJzID0gdXNlTWVtbyhcclxuICAgICgpID0+IGVuc3VyZUN1cnJlbnRVc2VySW5MaXN0KEFycmF5LmlzQXJyYXkoc3Vib3JkaW5hdGVzKSA/IHN1Ym9yZGluYXRlcyA6IFtdLCBjdXJyZW50QXhVc2VySWQpLFxyXG4gICAgW2N1cnJlbnRBeFVzZXJJZCwgc3Vib3JkaW5hdGVzXVxyXG4gICk7XHJcbiAgY29uc3QgZGVmYXVsdE1hbmFnZWRVc2VySWQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uKGN1cnJlbnRBeFVzZXJJZCwgY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnMpLFxyXG4gICAgW2N1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzXVxyXG4gICk7XHJcbiAgY29uc3Qgc2hvd01hbmFnZWRVc2VyRmlsdGVyID0gaXNMaW5rTW9kZSAmJiBjYW5NYW5hZ2VPdGhlclVzZXJzO1xyXG5cclxuICAvLyBLZWVwcyBsaW5rLW1vZGUgbGlzdCBxdWVyaWVzIGJvdW5kZWQgZXZlbiB3aGVuIFVJIGZpbHRlcnMgYXJlIGNsZWFyZWQuXHJcbiAgY29uc3Qgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQgPSB1c2VDYWxsYmFjayhcclxuICAgIChzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCk6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgPT4ge1xyXG4gICAgICBpZiAoIWlzTGlua01vZGUpIHJldHVybiBzbmFwc2hvdDtcclxuXHJcbiAgICAgIGNvbnN0IGZhbGxiYWNrID0gYnVpbGRMaW5rTW9kZUluaXRpYWxTbmFwc2hvdChzbmFwc2hvdC5tYW5hZ2VkVXNlcklkKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEZyb21EYXRlID0gc2FmZVRleHQoc25hcHNob3QuZnJvbURhdGUpIHx8IGZhbGxiYWNrLmZyb21EYXRlO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkVG9EYXRlID0gc2FmZVRleHQoc25hcHNob3QudG9EYXRlKSB8fCBmYWxsYmFjay50b0RhdGU7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkID0gbm9ybWFsaXplVXNlcklkKHNuYXBzaG90Lm1hbmFnZWRVc2VySWQpIHx8IGZhbGxiYWNrLm1hbmFnZWRVc2VySWQ7XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnNuYXBzaG90LFxyXG4gICAgICAgIGZyb21EYXRlOiBub3JtYWxpemVkRnJvbURhdGUsXHJcbiAgICAgICAgdG9EYXRlOiBub3JtYWxpemVkVG9EYXRlLFxyXG4gICAgICAgIG1hbmFnZWRVc2VySWQ6IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgICAgIHN0YXR1c0ZpbHRlcjogMCxcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBbaXNMaW5rTW9kZV1cclxuICApO1xyXG5cclxuICBjb25zdCBbbGlua0Zsb3dCdXN5LCBzZXRMaW5rRmxvd0J1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtsaW5rRmxvd1N0YXR1cywgc2V0TGlua0Zsb3dTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2xpbmtGbG93RXJyb3IsIHNldExpbmtGbG93RXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3NlbGVjdEFsbEJ1c3ksIHNldFNlbGVjdEFsbEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzZWxlY3RBbGxFcnJvciwgc2V0U2VsZWN0QWxsRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2xpbmtCdWxrUmVzdWx0LCBzZXRMaW5rQnVsa1Jlc3VsdF0gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0byB8IG51bGw+KG51bGwpO1xyXG5cclxuICBjb25zdCBwYWdpbmF0aW9uTGFiZWxzID0gdXNlTWVtbyhcclxuICAgICgpID0+ICh7XHJcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXHJcbiAgICAgIHByZXY6IGluZFQoXCJIaXN0b3J5X1BhZ2VfUHJldlwiLCBcIlByZXZpb3VzXCIpLFxyXG4gICAgICBuZXh0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpLFxyXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxyXG4gICAgfSksXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xyXG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcclxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZ2FzdG9UeXBlT3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiB7XHJcbiAgICBjb25zdCBzb3VyY2UgPSBBcnJheS5pc0FycmF5KHdpbmRvdy5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXykgPyB3aW5kb3cuX19FWFBFTlNFX0dBU1RPX1RZUEVTX18gOiBbXTtcclxuICAgIGNvbnN0IG1hcHBlZCA9IG1hcFdpbmRvd0VudW1PcHRpb25zKHNvdXJjZSkuZmlsdGVyKChlbnRyeSkgPT4ge1xyXG4gICAgICBjb25zdCBwYXJzZWQgPSBOdW1iZXIoZW50cnkudmFsdWUpO1xyXG4gICAgICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpICYmIEFMTE9XRURfR0FTVE9fVFlQRVMuaGFzKHBhcnNlZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAobWFwcGVkLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIG1hcHBlZC5zb3J0KChsZWZ0LCByaWdodCkgPT4gTnVtYmVyKGxlZnQudmFsdWUpIC0gTnVtYmVyKHJpZ2h0LnZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGJ1aWxkRmFsbGJhY2tHYXN0b1R5cGVPcHRpb25zKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBnYXN0b1R5cGVMYWJlbE1hcCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcclxuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIGdhc3RvVHlwZU9wdGlvbnMpIHtcclxuICAgICAgbWFwLnNldChTdHJpbmcob3B0aW9uLnZhbHVlKSwgb3B0aW9uLnRleHQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1hcDtcclxuICB9LCBbZ2FzdG9UeXBlT3B0aW9uc10pO1xyXG5cclxuICBjb25zdCB7XHJcbiAgICBpdGVtcyxcclxuICAgIHRvdGFsLFxyXG4gICAgY3VycmVudFBhZ2UsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBsb2FkTGlzdCxcclxuICAgIHJlc3RvcmVMaXN0U25hcHNob3QsXHJcbiAgICByZXNldExpc3QsXHJcbiAgICBjbGVhckxpc3RDYWNoZSxcclxuICB9ID0gdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YSh7XHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBwYWdlU2l6ZTogUEFHRV9TSVpFLFxyXG4gICAgbW9kZTogaXNMaW5rTW9kZSA/IFwibGlua1wiIDogXCJnZW5lcmFsXCIsXHJcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICB9KTtcclxuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgY29uc3VtZVJldHVybkZsYWcsIGNvbnN1bWVSZXR1cm5Nb2RlLCBzYXZlQ2FjaGVkU3RhdGUsIGNsZWFyQ2FjaGVkU3RhdGUgfSA9IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUoKTtcclxuICBjb25zdCB7XHJcbiAgICBzZWxlY3Rpb25Nb2RlLFxyXG4gICAgc2VsZWN0ZWRUaWNrZXRzLFxyXG4gICAgZXhjbHVkZWRJZHMsXHJcbiAgICBmaWx0ZXJlZFNuYXBzaG90LFxyXG4gICAgZmlsdGVyZWRUb3RhbENvdW50LFxyXG4gICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSxcclxuICAgIGlzU2VsZWN0ZWQ6IGlzTGlua1RpY2tldFNlbGVjdGVkLFxyXG4gICAgdG9nZ2xlVGlja2V0OiB0b2dnbGVMaW5rVGlja2V0U2VsZWN0aW9uLFxyXG4gICAgY2xlYXJTZWxlY3Rpb246IGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbixcclxuICAgIHJlc3RvcmVTZWxlY3Rpb246IHJlc3RvcmVMaW5rVGlja2V0U2VsZWN0aW9uLFxyXG4gICAgc2VsZWN0QWxsQnlGaWx0ZXJzLFxyXG4gICAgaHlkcmF0ZVZpc2libGVUaWNrZXRzLFxyXG4gICAgcmVzb2x2ZVNlbGVjdGVkQ291bnQsXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uKCk7XHJcbiAgY29uc3Qgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soXHJcbiAgICAocmVxdWVzdGVkVXNlcklkOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gICAgICBjb25zdCByZXNvbHZlZFVzZXJJZCA9IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbihyZXF1ZXN0ZWRVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzKTtcclxuICAgICAgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkKHJlc29sdmVkVXNlcklkKTtcclxuICAgICAgaWYgKCFyZXNvbHZlZFVzZXJJZCB8fCAoY3VycmVudEF4VXNlcklkICYmIGlzU2FtZVVzZXIocmVzb2x2ZWRVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCkpKSB7XHJcbiAgICAgICAgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZShyZXNvbHZlZFVzZXJJZCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlc29sdmVkVXNlcklkO1xyXG4gICAgfSxcclxuICAgIFtjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vycywgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkXVxyXG4gICk7XHJcbiAgY29uc3Qge1xyXG4gICAgbGlua1NoZWV0TG9ja2VkLFxyXG4gICAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UsXHJcbiAgICBsaW5rU2hlZXRDaGVja0J1c3ksXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlKHtcclxuICAgIGlzTGlua01vZGUsXHJcbiAgICBsaW5rU2hlZXRJZCxcclxuICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHJlc29sdmVCbG9ja2VkTWVzc2FnZTogcmVzb2x2ZUxpbmtNb2RlQmxvY2tlZE1lc3NhZ2UsXHJcbiAgfSk7XHJcbiAgY29uc3QgeyBydW5BdXRvbWF0aWNMaXN0TG9hZCB9ID0gdXNlRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWQoe1xyXG4gICAgaXNMaW5rTW9kZSxcclxuICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcclxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcclxuICAgIGxpbmtTaGVldExvY2tlZCxcclxuICAgIGNsZWFyTGlzdENhY2hlLFxyXG4gICAgcmVzZXRMaXN0LFxyXG4gICAgbG9hZExpc3QsXHJcbiAgfSk7XHJcbiAgY29uc3QgYnVpbGRJbml0aWFsTGlua01vZGVTbmFwc2hvdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGluaXRpYWxNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcclxuICAgIHJldHVybiBidWlsZExpbmtNb2RlSW5pdGlhbFNuYXBzaG90KGluaXRpYWxNYW5hZ2VkVXNlcklkKTtcclxuICB9LCBbZGVmYXVsdE1hbmFnZWRVc2VySWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xyXG5cclxuICBjb25zdCBidWlsZEluaXRpYWxTdGFuZGFyZFNuYXBzaG90ID0gdXNlQ2FsbGJhY2soKCk6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgPT4ge1xyXG4gICAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xyXG4gICAgY29uc3QgZnJvbURhdGUgPSBuZXcgRGF0ZSh0b2RheSk7XHJcbiAgICBmcm9tRGF0ZS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDg5KTtcclxuICAgIGNvbnN0IGluaXRpYWxNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBmcm9tRGF0ZTogdG9Jc29EYXRlKGZyb21EYXRlKSxcclxuICAgICAgdG9EYXRlOiB0b0lzb0RhdGUodG9kYXkpLFxyXG4gICAgICBmaWx0ZXJLZXk6IFwiXCIsXHJcbiAgICAgIGN1cnJlbmN5Q29kZTogXCJcIixcclxuICAgICAgbWFuYWdlZFVzZXJJZDogaW5pdGlhbE1hbmFnZWRVc2VySWQsXHJcbiAgICAgIHN0YXR1c0ZpbHRlcjogXCJcIixcclxuICAgICAgZ2FzdG9UeXBlRmlsdGVyOiBcIlwiLFxyXG4gICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyOiBcImFsbFwiLFxyXG4gICAgfTtcclxuICB9LCBbZGVmYXVsdE1hbmFnZWRVc2VySWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xyXG5cclxuICBjb25zdCB7XHJcbiAgICBmcm9tRGF0ZSxcclxuICAgIHRvRGF0ZSxcclxuICAgIGZpbHRlcktleSxcclxuICAgIGN1cnJlbmN5Q29kZSxcclxuICAgIG1hbmFnZWRVc2VySWQsXHJcbiAgICBzdGF0dXNGaWx0ZXIsXHJcbiAgICBnYXN0b1R5cGVGaWx0ZXIsXHJcbiAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxyXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXHJcbiAgICBzaG93TWFudWFsRGF0ZUZpbHRlcixcclxuICAgIHNob3dNYW51YWxEYXRlRXJyb3IsXHJcbiAgICBtYW51YWxEYXRlQXV0b09wZW5LZXksXHJcbiAgICBhcHBsaWVkRmlsdGVycyxcclxuICAgIHNob3dGaWx0ZXJzLFxyXG4gICAgY3VycmVudEZpbHRlcnMsXHJcbiAgICBzZXRGaWx0ZXJLZXksXHJcbiAgICBzZXRDdXJyZW5jeUNvZGUsXHJcbiAgICBzZXRNYW5hZ2VkVXNlcklkLFxyXG4gICAgc2V0U3RhdHVzRmlsdGVyLFxyXG4gICAgc2V0R2FzdG9UeXBlRmlsdGVyLFxyXG4gICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICAgIG9uQXBwbHksXHJcbiAgICBvbkNsZWFyLFxyXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxyXG4gICAgb25EYXRlUmFuZ2VDaGFuZ2UsXHJcbiAgICBvbk1hbnVhbFJhbmdlQ29tcGxldGUsXHJcbiAgICBvblF1aWNrRmlsdGVyQ2hhbmdlLFxyXG4gICAgdG9nZ2xlRmlsdGVyUGFuZWwsXHJcbiAgICBzdGF0dXNGaWx0ZXJMb2NrZWQsXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlKHtcclxuICAgIGRlZmF1bHRNYW5hZ2VkVXNlcklkLFxyXG4gICAgZml4ZWRTdGF0dXNGaWx0ZXIsXHJcbiAgICBhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5OiBpc0xpbmtNb2RlLFxyXG4gICAgb25BcHBseUZpbHRlcnM6IChzbmFwc2hvdCkgPT4ge1xyXG4gICAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcclxuICAgICAgY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgIGNvbnN0IHJlc29sdmVkTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihzbmFwc2hvdC5tYW5hZ2VkVXNlcklkKTtcclxuICAgICAgdm9pZCBsb2FkTGlzdChcclxuICAgICAgICAxLFxyXG4gICAgICAgIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKHtcclxuICAgICAgICAgIC4uLnNuYXBzaG90LFxyXG4gICAgICAgICAgbWFuYWdlZFVzZXJJZDogcmVzb2x2ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgb25DbGVhckZpbHRlcnM6ICgpID0+IHtcclxuICAgICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XHJcbiAgICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbigpO1xyXG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XHJcbiAgICAgIGlmIChpc0xpbmtNb2RlKSB7XHJcbiAgICAgICAgY29uc3QgbGlua1NuYXBzaG90ID0gYnVpbGRJbml0aWFsTGlua01vZGVTbmFwc2hvdCgpO1xyXG4gICAgICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhsaW5rU25hcHNob3QpO1xyXG4gICAgICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkKDEsIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKGxpbmtTbmFwc2hvdCksIHtcclxuICAgICAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXHJcbiAgICAgICAgICByZXNldEJlZm9yZUxvYWQ6IHRydWUsXHJcbiAgICAgICAgICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVzZXRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGN1cnJlbnRBeFVzZXJJZCk7XHJcbiAgICAgIHNldE1hbmFnZWRVc2VySWQocmVzZXRNYW5hZ2VkVXNlcklkKTtcclxuICAgICAgcmVzZXRMaXN0KFwiY2xlYXItZmlsdGVyc1wiKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQgPSBub3JtYWxpemVVc2VySWQoZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xyXG4gICAgaWYgKCFub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQpIHJldHVybjtcclxuICAgIHNldE1hbmFnZWRVc2VySWQobm9ybWFsaXplZERlZmF1bHRNYW5hZ2VkVXNlcklkKTtcclxuICAgIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQpO1xyXG4gIH0sIFtkZWZhdWx0TWFuYWdlZFVzZXJJZCwgc2V0TWFuYWdlZFVzZXJJZCwgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoY2FuTWFuYWdlT3RoZXJVc2VycykgcmV0dXJuO1xyXG4gICAgY29uc3QgZmFsbGJhY2tNYW5hZ2VkVXNlcklkID0gcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uKGN1cnJlbnRBeFVzZXJJZCwgY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnMpO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnRNYW5hZ2VkVXNlcklkID0gbm9ybWFsaXplVXNlcklkKG1hbmFnZWRVc2VySWQpO1xyXG4gICAgaWYgKGlzU2FtZVVzZXIobm9ybWFsaXplZEN1cnJlbnRNYW5hZ2VkVXNlcklkLCBmYWxsYmFja01hbmFnZWRVc2VySWQpKSByZXR1cm47XHJcbiAgICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW50TWFuYWdlZFVzZXJJZCAmJiAhZmFsbGJhY2tNYW5hZ2VkVXNlcklkKSByZXR1cm47XHJcblxyXG4gICAgc2V0TWFuYWdlZFVzZXJJZChmYWxsYmFja01hbmFnZWRVc2VySWQpO1xyXG4gICAgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGZhbGxiYWNrTWFuYWdlZFVzZXJJZCk7XHJcbiAgfSwgW2Nhbk1hbmFnZU90aGVyVXNlcnMsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJJZCwgbWFuYWdlZFVzZXJzLCBzZXRNYW5hZ2VkVXNlcklkLCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb25dKTtcclxuXHJcbiAgY29uc3Qge1xyXG4gICAgc291cmNlUGlja2VyT3BlbixcclxuICAgIGJ1c3k6IHF1aWNrVGlja2V0QnVzeSxcclxuICAgIHByb2dyZXNzTWVzc2FnZTogcXVpY2tUaWNrZXRQcm9ncmVzc01lc3NhZ2UsXHJcbiAgICBwcm9ncmVzc1N0YWdlczogcXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlcyxcclxuICAgIHByb2dyZXNzRWxhcHNlZE1zOiBxdWlja1RpY2tldEVsYXBzZWRNcyxcclxuICAgIGVycm9yTWVzc2FnZTogcXVpY2tUaWNrZXRFcnJvck1lc3NhZ2UsXHJcbiAgICBhdHRlbXB0SWQ6IHF1aWNrVGlja2V0QXR0ZW1wdElkLFxyXG4gICAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5LFxyXG4gICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmUsXHJcbiAgICB0cmFjZUxpc3Q6IHF1aWNrVGlja2V0VHJhY2VMaXN0LFxyXG4gICAgb3BlblNvdXJjZVBpY2tlcixcclxuICAgIGNsb3NlU291cmNlUGlja2VyLFxyXG4gICAgc2VsZWN0RnJvbUNhbWVyYSxcclxuICAgIHNlbGVjdEZyb21HYWxsZXJ5LFxuICAgIGhhbmRsZVNlbGVjdGVkRmlsZSxcbiAgICByZXRyeVBlbmRpbmdVcGxvYWQsXG4gICAgY2xlYXJFcnJvcjogY2xlYXJRdWlja1RpY2tldEVycm9yLFxuICB9ID0gdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93KHtcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiAhaXNMaW5rTW9kZSAmJiBjYW5DcmVhdGVUaWNrZXQsXHJcbiAgICBpc0NyZWF0ZU1vZGU6IGZhbHNlLFxyXG4gICAgaXNTaGVldExvY2tlZDogZmFsc2UsXHJcbiAgICBsaW5rVG9TaGVldDogZmFsc2UsXHJcbiAgICBheFVzZXJJZE92ZXJyaWRlOiBzYWZlVGV4dChjdXJyZW50QXhVc2VySWQpLFxyXG4gICAgY3VycmVuY3lDb2RlOiBjdXJyZW5jeUNvZGUgfHwgXCJFVVJcIixcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gICAgb25Db21wbGV0ZWQ6IChyZXN1bHQpID0+IHtcclxuICAgICAgY29uc3QgY3JlYXRlZEZpbGVJZCA9IHNhZmVUZXh0KHJlc3VsdD8uZmlsZUlkKTtcclxuICAgICAgaWYgKCFjcmVhdGVkRmlsZUlkKSByZXR1cm47XHJcblxyXG4gICAgICBpZiAoaGFzU2hlZXRDYWxsZXJDb250ZXh0ICYmIHNoZWV0Q2FsbGVyT3JpZ2luKSB7XHJcbiAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcclxuICAgICAgICAgIGZpbGVJZDogY3JlYXRlZEZpbGVJZCxcclxuICAgICAgICAgIHNoZWV0SWQ6IGxpbmtTaGVldElkLFxyXG4gICAgICAgICAgb3JpZ2luOiBzaGVldENhbGxlck9yaWdpbixcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICAgICAgZmlsZUlkOiBjcmVhdGVkRmlsZUlkLFxyXG4gICAgICAgICAgbW9kZTogXCJlZGl0XCIsXHJcbiAgICAgICAgICBvcmlnaW46IHNoZWV0Q2FsbGVyT3JpZ2luLFxyXG4gICAgICAgICAgc2hlZXRJZDogbGlua1NoZWV0SWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAgICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY2xlYXJFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCgpO1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/ZmlsZUlkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNyZWF0ZWRGaWxlSWQpfSZtb2RlPWVkaXQmb3JpZ2luPXRpY2tldC1jcmVhdGVgLCB7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBmYWJNZW51SXRlbXMgPSB1c2VNZW1vPEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW1bXT4oXHJcbiAgICAoKSA9PlxyXG4gICAgICBpc0xpbmtNb2RlXHJcbiAgICAgICAgPyBbXVxyXG4gICAgICAgIDogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaWQ6IFwibmV3LXRpY2tldFwiLFxyXG4gICAgICAgICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfTmV3VGlja2V0XCIsIFwiTnVldm8gVGlja2V0XCIpLFxyXG4gICAgICAgICAgICAgIGljb246IDxOZXdUaWNrZXRJY29uIC8+LFxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s6IG9wZW5Tb3VyY2VQaWNrZXIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdLFxyXG4gICAgW2lzTGlua01vZGUsIG9wZW5Tb3VyY2VQaWNrZXJdXHJcbiAgKTtcblxuICBjb25zdCBzZWxlY3RlZFRpY2tldENvdW50ID0gcmVzb2x2ZVNlbGVjdGVkQ291bnQodG90YWwpO1xuICBjb25zdCBzZWxlY3RlZFRvdGFsQW1vdW50VGV4dCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IHRvdGFsc0J5Q3VycmVuY3kgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuXG4gICAgc2VsZWN0ZWRUaWNrZXRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbmN5Q29kZSA9IHNhZmVUZXh0KGl0ZW0uY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgY29uc3QgYW1vdW50ID0gTnVtYmVyKGl0ZW0udG90YWxBbW91bnQgPz8gMCk7XG4gICAgICBpZiAoIU51bWJlci5pc0Zpbml0ZShhbW91bnQpKSByZXR1cm47XG4gICAgICB0b3RhbHNCeUN1cnJlbmN5LnNldChjdXJyZW5jeUNvZGUsICh0b3RhbHNCeUN1cnJlbmN5LmdldChjdXJyZW5jeUNvZGUpID8/IDApICsgYW1vdW50KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGdyb3VwZWRUb3RhbHMgPSBBcnJheS5mcm9tKHRvdGFsc0J5Q3VycmVuY3kuZW50cmllcygpKS5zb3J0KChsZWZ0LCByaWdodCkgPT5cbiAgICAgIGxlZnRbMF0ubG9jYWxlQ29tcGFyZShyaWdodFswXSlcbiAgICApO1xuXG4gICAgaWYgKGdyb3VwZWRUb3RhbHMubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuIGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSgwLCBcIlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ3JvdXBlZFRvdGFscy5tYXAoKFtjdXJyZW5jeUNvZGUsIGFtb3VudF0pID0+IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShhbW91bnQsIGN1cnJlbmN5Q29kZSkpLmpvaW4oXCI7IFwiKTtcbiAgfSwgW3NlbGVjdGVkVGlja2V0c10pO1xuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIHJldmVhbFRvcGJhckFjdGlvbkdyb3VwKFwiZXhwZW5zZS10aWNrZXRzLWxpc3QtYWN0aW9uc1wiKTtcbiAgfSwgW10pO1xuXHJcbiAgY29uc3QgbGlua01vZGVDYW5jZWxNZXNzYWdlID0gdXNlTWVtbyhcclxuICAgICgpID0+XHJcbiAgICAgIGluZFQoXHJcbiAgICAgICAgXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9DYW5jZWxDb25maXJtXCIsXHJcbiAgICAgICAgXCJTZSBjYW5jZWxhclx1MDBFMSBlbCBwcm9jZXNvIGRlIHZpbmN1bGFjaVx1MDBGM24geSB2b2x2ZXJcdTAwRTFzIGEgbGEgaG9qYSBkZSBnYXN0b3MuIFx1MDBCRlF1aWVyZXMgY29udGludWFyP1wiXHJcbiAgICAgICksXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGFwcGx5Q3JlYXRlZFRpY2tldFJldHVybiA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHRpY2tldEZpbGVJZDogc3RyaW5nLCB0aWNrZXREYXRlVmFsdWU6IHVua25vd24pID0+IHtcclxuICAgICAgY29uc3QgaW5pdGlhbFNuYXBzaG90ID0gYnVpbGRJbml0aWFsU3RhbmRhcmRTbmFwc2hvdCgpO1xyXG5cclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwiYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuOnN0YXJ0XCIsIHtcclxuICAgICAgICB0aWNrZXRGaWxlSWQsXHJcbiAgICAgICAgdGlja2V0RGF0ZVZhbHVlLFxyXG4gICAgICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgICAgICBpbml0aWFsU25hcHNob3QsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xyXG4gICAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMoaW5pdGlhbFNuYXBzaG90KTtcclxuICAgICAgY2xlYXJMaXN0Q2FjaGUoKTtcclxuICAgICAgcmVzZXRMaXN0KFwiY3JlYXRlZC10aWNrZXQtcmV0dXJuXCIpO1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJhcHBseUNyZWF0ZWRUaWNrZXRSZXR1cm46bG9hZExpc3RcIiwge1xyXG4gICAgICAgIHBhZ2U6IDEsXHJcbiAgICAgICAgaW5pdGlhbFNuYXBzaG90LFxyXG4gICAgICB9KTtcclxuICAgICAgdm9pZCBsb2FkTGlzdCgxLCBpbml0aWFsU25hcHNob3QpO1xyXG5cclxuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgIHVybC5zZWFyY2hQYXJhbXMuZGVsZXRlKFwidGlja2V0RmlsZUlkXCIpO1xyXG4gICAgICB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZShcInRpY2tldERhdGVcIik7XHJcbiAgICAgIGNvbnN0IGNsZWFuZWRRdWVyeSA9IHVybC5zZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcclxuICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBcIlwiLCBjbGVhbmVkUXVlcnkgPyBgJHt1cmwucGF0aG5hbWV9PyR7Y2xlYW5lZFF1ZXJ5fWAgOiB1cmwucGF0aG5hbWUpO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgYnVpbGRJbml0aWFsU3RhbmRhcmRTbmFwc2hvdCxcclxuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSxcclxuICAgICAgY2xlYXJMaXN0Q2FjaGUsXHJcbiAgICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgICAgbG9hZExpc3QsXHJcbiAgICAgIHJlc2V0TGlzdCxcclxuICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHJlc3RvcmVMaW5rTW9kZVJldHVyblN0YXRlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoY2FjaGVkU3RhdGU6IEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUpID0+IHtcclxuICAgICAgY29uc3QgcmVzdG9yZWRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGNhY2hlZFN0YXRlLmZpbHRlcnMubWFuYWdlZFVzZXJJZCk7XHJcbiAgICAgIGNvbnN0IHJlc3RvcmVkRmlsdGVycyA9IHtcclxuICAgICAgICAuLi5jYWNoZWRTdGF0ZS5maWx0ZXJzLFxyXG4gICAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhyZXN0b3JlZEZpbHRlcnMpO1xyXG4gICAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gY2FjaGVkU3RhdGUuc2Nyb2xsWTtcclxuICAgICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSBjYWNoZWRTdGF0ZS5mb2N1c0ZpbGVJZDtcclxuICAgICAgcmVzdG9yZUxpbmtUaWNrZXRTZWxlY3Rpb24oe1xyXG4gICAgICAgIHNlbGVjdGlvbk1vZGU6IGNhY2hlZFN0YXRlLnNlbGVjdGlvbk1vZGUsXHJcbiAgICAgICAgc2VsZWN0ZWRUaWNrZXRzOiBjYWNoZWRTdGF0ZS5zZWxlY3RlZFRpY2tldHMsXHJcbiAgICAgICAgZXhjbHVkZWRJZHM6IGNhY2hlZFN0YXRlLmV4Y2x1ZGVkSWRzLFxyXG4gICAgICAgIGZpbHRlcmVkU25hcHNob3Q6IGNhY2hlZFN0YXRlLmZpbHRlcmVkU2VsZWN0aW9uRmlsdGVycyxcclxuICAgICAgICBmaWx0ZXJlZFRvdGFsQ291bnQ6IGNhY2hlZFN0YXRlLmZpbHRlcmVkU2VsZWN0aW9uVG90YWwsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKGNhY2hlZFN0YXRlLml0ZW1zLmxlbmd0aCA+IDAgfHwgY2FjaGVkU3RhdGUudG90YWwgPiAwKSB7XHJcbiAgICAgICAgcmVzdG9yZUxpc3RTbmFwc2hvdCh7XHJcbiAgICAgICAgICBpdGVtczogY2FjaGVkU3RhdGUuaXRlbXMsXHJcbiAgICAgICAgICB0b3RhbDogY2FjaGVkU3RhdGUudG90YWwsXHJcbiAgICAgICAgICBwYWdlOiBjYWNoZWRTdGF0ZS5wYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBydW5BdXRvbWF0aWNMaXN0TG9hZChjYWNoZWRTdGF0ZS5wYWdlLCBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZChyZXN0b3JlZEZpbHRlcnMpLCB7XHJcbiAgICAgICAgY2xlYXJDYWNoZTogdHJ1ZSxcclxuICAgICAgICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkLFxyXG4gICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMsXHJcbiAgICAgIHJlc3RvcmVMaW5rVGlja2V0U2VsZWN0aW9uLFxyXG4gICAgICByZXN0b3JlTGlzdFNuYXBzaG90LFxyXG4gICAgICBydW5BdXRvbWF0aWNMaXN0TG9hZCxcclxuICAgICAgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHJlc3RvcmVJbml0aWFsTGlua01vZGVTdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGxpbmtTbmFwc2hvdCA9IGJ1aWxkSW5pdGlhbExpbmtNb2RlU25hcHNob3QoKTtcclxuICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcclxuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xyXG4gICAgY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uKCk7XHJcbiAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcclxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhsaW5rU25hcHNob3QpO1xyXG4gICAgcnVuQXV0b21hdGljTGlzdExvYWQoMSwgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQobGlua1NuYXBzaG90KSwge1xyXG4gICAgICBjbGVhckNhY2hlOiB0cnVlLFxyXG4gICAgICByZXNldEJlZm9yZUxvYWQ6IHRydWUsXHJcbiAgICAgIHdhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHk6IHRydWUsXHJcbiAgICB9KTtcclxuICB9LCBbXHJcbiAgICBidWlsZEluaXRpYWxMaW5rTW9kZVNuYXBzaG90LFxyXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSxcclxuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSxcclxuICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbixcclxuICAgIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkLFxyXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxyXG4gICAgcnVuQXV0b21hdGljTGlzdExvYWQsXHJcbiAgXSk7XHJcblxyXG4gIC8vIEFwcGxpZXMgZGVmYXVsdCBmaXJzdC1lbnRyeSBmaWx0ZXJzIGZvciB0aGUgc3RhbmRhcmQgdGlja2V0cyBsaXN0IG9ubHkuXHJcbiAgY29uc3QgcmVzdG9yZUluaXRpYWxTdGFuZGFyZFN0YXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgaW5pdGlhbFNuYXBzaG90ID0gYnVpbGRJbml0aWFsU3RhbmRhcmRTbmFwc2hvdCgpO1xyXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xyXG4gICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKCk7XHJcbiAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50ID0gXCJcIjtcclxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhpbml0aWFsU25hcHNob3QpO1xyXG4gICAgcnVuQXV0b21hdGljTGlzdExvYWQoMSwgaW5pdGlhbFNuYXBzaG90LCB7XHJcbiAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXHJcbiAgICAgIHJlc2V0QmVmb3JlTG9hZDogdHJ1ZSxcclxuICAgIH0pO1xyXG4gIH0sIFtcclxuICAgIGJ1aWxkSW5pdGlhbFN0YW5kYXJkU25hcHNob3QsXHJcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxyXG4gICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxyXG4gICAgcnVuQXV0b21hdGljTGlzdExvYWQsXHJcbiAgXSk7XHJcblxyXG4gIGNvbnN0IHJlc3RvcmVTdGFuZGFyZFJldHVyblN0YXRlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoY2FjaGVkU3RhdGU6IEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUpID0+IHtcclxuICAgICAgY29uc3QgcmVzdG9yZWRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGNhY2hlZFN0YXRlLmZpbHRlcnMubWFuYWdlZFVzZXJJZCk7XHJcbiAgICAgIGNvbnN0IHJlc3RvcmVkRmlsdGVycyA9IHtcclxuICAgICAgICAuLi5jYWNoZWRTdGF0ZS5maWx0ZXJzLFxyXG4gICAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhyZXN0b3JlZEZpbHRlcnMpO1xyXG4gICAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gY2FjaGVkU3RhdGUuc2Nyb2xsWTtcclxuICAgICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSBjYWNoZWRTdGF0ZS5mb2N1c0ZpbGVJZDtcclxuXHJcbiAgICAgIGlmIChjYWNoZWRTdGF0ZS5pdGVtcy5sZW5ndGggPiAwIHx8IGNhY2hlZFN0YXRlLnRvdGFsID4gMCkge1xyXG4gICAgICAgIHJlc3RvcmVMaXN0U25hcHNob3Qoe1xyXG4gICAgICAgICAgaXRlbXM6IGNhY2hlZFN0YXRlLml0ZW1zLFxyXG4gICAgICAgICAgdG90YWw6IGNhY2hlZFN0YXRlLnRvdGFsLFxyXG4gICAgICAgICAgcGFnZTogY2FjaGVkU3RhdGUucGFnZSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcnVuQXV0b21hdGljTGlzdExvYWQoY2FjaGVkU3RhdGUucGFnZSwgcmVzdG9yZWRGaWx0ZXJzLCB7XHJcbiAgICAgICAgY2xlYXJDYWNoZTogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW3Jlc3RvcmVBcHBsaWVkRmlsdGVycywgcmVzdG9yZUxpc3RTbmFwc2hvdCwgcnVuQXV0b21hdGljTGlzdExvYWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl1cclxuICApO1xyXG5cclxuICAvLyBLZWVwcyBkZWxldGUgcmV0dXJuIGV4cGxpY2l0OiBibGFuayBmaWx0ZXJzLCBvcGVuIHBhbmVsLCBhbmQgbm8gYXV0b21hdGljIHJlbG9hZC5cclxuICBjb25zdCByZXN0b3JlRGVsZXRlUmV0dXJuU3RhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjbGVhckNhY2hlZFN0YXRlKCk7XHJcbiAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoKTtcclxuICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uKCk7XHJcbiAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcclxuICAgIG9uQ2xlYXIoKTtcclxuICB9LCBbY2xlYXJDYWNoZWRTdGF0ZSwgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLCBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24sIG9uQ2xlYXJdKTtcclxuXHJcbiAgY29uc3QgdG9nZ2xlVGlja2V0U2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodGlja2V0OiBFeHBlbnNlVGlja2V0TGlzdFBhZ2VJdGVtKSA9PiB7XHJcbiAgICAgIGlmICghaXNMaW5rTW9kZSB8fCAhY2FuUHJvY2Vzc0xpbmtNb2RlIHx8IGxpbmtTaGVldENoZWNrQnVzeSB8fCBsaW5rU2hlZXRMb2NrZWQgfHwgbGlua0Zsb3dCdXN5KSByZXR1cm47XHJcbiAgICAgIGlmICh0aWNrZXQua2luZCAhPT0gXCJsaW5rXCIpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KHRpY2tldC5maWxlSWQpO1xyXG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xyXG4gICAgICBpZiAoIWNhblNlbGVjdFRpY2tldEZvckxpbmsodGlja2V0KSkgcmV0dXJuO1xyXG5cclxuICAgICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XHJcbiAgICAgIHRvZ2dsZUxpbmtUaWNrZXRTZWxlY3Rpb24odGlja2V0KTtcclxuICAgIH0sXHJcbiAgICBbY2FuUHJvY2Vzc0xpbmtNb2RlLCBpc0xpbmtNb2RlLCBsaW5rRmxvd0J1c3ksIGxpbmtTaGVldENoZWNrQnVzeSwgbGlua1NoZWV0TG9ja2VkLCB0b2dnbGVMaW5rVGlja2V0U2VsZWN0aW9uXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGNsZWFyVGlja2V0U2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0U2VsZWN0QWxsRXJyb3IoXCJcIik7XHJcbiAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcclxuICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbigpO1xyXG4gIH0sIFtjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb25dKTtcclxuXHJcbiAgY29uc3QgcmVzb2x2ZUFjdGl2ZUZpbHRlcnMgPSB1c2VDYWxsYmFjaygoKTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9PiB7XG4gICAgY29uc3QgYmFzZVNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnMgfHwgY3VycmVudEZpbHRlcnM7XG4gICAgY29uc3QgcmVzb2x2ZWRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGJhc2VTbmFwc2hvdC5tYW5hZ2VkVXNlcklkKTtcbiAgICByZXR1cm4gbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQoe1xuICAgICAgLi4uYmFzZVNuYXBzaG90LFxuICAgICAgbWFuYWdlZFVzZXJJZDogcmVzb2x2ZWRNYW5hZ2VkVXNlcklkLFxuICAgIH0pO1xuICB9LCBbYXBwbGllZEZpbHRlcnMsIGN1cnJlbnRGaWx0ZXJzLCBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZCwgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXSk7XG4gIGNvbnN0IHJlc29sdmVBY3RpdmVGaWx0ZXJzRXZlbnQgPSB1c2VFZmZlY3RFdmVudChyZXNvbHZlQWN0aXZlRmlsdGVycyk7XG5cclxuICAvLyBBY3RpdmF0ZXMgYmFja2VuZC1kcml2ZW4gZmlsdGVyZWQgc2VsZWN0aW9uIGZvciB0aGUgY3VycmVudCBmaWx0ZXIgc25hcHNob3QuXHJcbiAgY29uc3Qgc2VsZWN0QWxsTWF0Y2hpbmdUaWNrZXRzID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKCFpc0xpbmtNb2RlIHx8ICFjYW5Qcm9jZXNzTGlua01vZGUgfHwgbGlua1NoZWV0Q2hlY2tCdXN5IHx8IGxpbmtTaGVldExvY2tlZCB8fCBsaW5rRmxvd0J1c3kgfHwgc2VsZWN0QWxsQnVzeSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2VsZWN0QWxsQnVzeSh0cnVlKTtcclxuICAgIHNldFNlbGVjdEFsbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgYWN0aXZlRmlsdGVycyA9IHJlc29sdmVBY3RpdmVGaWx0ZXJzKCk7XHJcbiAgICAgIHNlbGVjdEFsbEJ5RmlsdGVycyhhY3RpdmVGaWx0ZXJzLCB0b3RhbCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiVGlja2V0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXRzLlwiKTtcclxuICAgICAgc2V0U2VsZWN0QWxsRXJyb3IobWVzc2FnZSk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRTZWxlY3RBbGxCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbXHJcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBpc0xpbmtNb2RlLFxyXG4gICAgbGlua0Zsb3dCdXN5LFxyXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gICAgbGlua1NoZWV0TG9ja2VkLFxyXG4gICAgcmVzb2x2ZUFjdGl2ZUZpbHRlcnMsXHJcbiAgICBzZWxlY3RBbGxCeUZpbHRlcnMsXHJcbiAgICBzZWxlY3RBbGxCdXN5LFxyXG4gICAgdG90YWwsXHJcbiAgXSk7XHJcblxyXG4gIC8vIEtlZXBzIHNlbGVjdGVkIGNhcmQgbWV0YWRhdGEgZnJlc2ggd2l0aCB0aGUgbGF0ZXN0IGxpc3QgcGF5bG9hZC5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc0xpbmtNb2RlIHx8IGl0ZW1zLmxlbmd0aCA8IDEpIHJldHVybjtcclxuICAgIGh5ZHJhdGVWaXNpYmxlVGlja2V0cyhpdGVtcy5maWx0ZXIoKGl0ZW0pOiBpdGVtIGlzIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCA9PiBpdGVtLmtpbmQgPT09IFwibGlua1wiKSk7XHJcbiAgfSwgW2h5ZHJhdGVWaXNpYmxlVGlja2V0cywgaXNMaW5rTW9kZSwgaXRlbXNdKTtcclxuXHJcbiAgY29uc3QgcnVuVGlja2V0TGlua0Zsb3cgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoIWlzTGlua01vZGUgfHwgIWxpbmtTaGVldElkIHx8IGxpbmtGbG93QnVzeSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAobGlua1NoZWV0TG9ja2VkIHx8ICFjYW5Qcm9jZXNzTGlua01vZGUpIHtcclxuICAgICAgY29uc3QgYmxvY2tlZE1lc3NhZ2UgPVxyXG4gICAgICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlIHx8XHJcbiAgICAgICAgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1JlYWRPbmx5QnlTdGF0dXNcIiwgXCJObyBzZSBwdWVkZSBlZGl0YXIgZXN0YSBob2phIGRlIGdhc3RvcyBlbiBlbCBlc3RhZG8gYWN0dWFsLlwiKTtcclxuICAgICAgc2V0TGlua0Zsb3dFcnJvcihibG9ja2VkTWVzc2FnZSk7XHJcbiAgICAgIHNldExpbmtGbG93U3RhdHVzKGJsb2NrZWRNZXNzYWdlKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0ZWRDb3VudCA9IHJlc29sdmVTZWxlY3RlZENvdW50KHRvdGFsKTtcclxuICAgIGlmIChzZWxlY3RlZENvdW50IDwgMSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWN0aXZlRmlsdGVycyA9IHJlc29sdmVBY3RpdmVGaWx0ZXJzKCk7XHJcbiAgICBjb25zdCByZXF1ZXN0QXhVc2VySWQgPSBzYWZlVGV4dChhY3RpdmVGaWx0ZXJzLm1hbmFnZWRVc2VySWQgfHwgY3VycmVudEF4VXNlcklkKTtcclxuXHJcbiAgICBzZXRMaW5rRmxvd0J1c3kodHJ1ZSk7XHJcbiAgICBzZXRMaW5rRmxvd0Vycm9yKFwiXCIpO1xyXG4gICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XHJcbiAgICBzZXRMaW5rRmxvd1N0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0xpbmtpbmdMaW5lXCIsIFwiTGlua2luZyBleHBlbnNlIGxpbmUuLi5cIikpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbGlua0V4cGVuc2VTaGVldFRpY2tldHNCdWxrKFxyXG4gICAgICAgIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmVcclxuICAgICAgICAgID8ge1xyXG4gICAgICAgICAgICAgIGV4cGVuc2VTaGVldElkOiBsaW5rU2hlZXRJZCxcclxuICAgICAgICAgICAgICBzZWxlY3Rpb25Nb2RlOiBcImZpbHRlcmVkXCIsXHJcbiAgICAgICAgICAgICAgZmlsdGVyczogYnVpbGRFeHBlbnNlVGlja2V0TGlua0J1bGtGaWx0ZXJzKGZpbHRlcmVkU25hcHNob3QgfHwgYWN0aXZlRmlsdGVycyksXHJcbiAgICAgICAgICAgICAgZXhjbHVkZWRJZHMsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIDoge1xyXG4gICAgICAgICAgICAgIGV4cGVuc2VTaGVldElkOiBsaW5rU2hlZXRJZCxcclxuICAgICAgICAgICAgICBzZWxlY3Rpb25Nb2RlOiBcInNlbGVjdGVkXCIsXHJcbiAgICAgICAgICAgICAgdGlja2V0SWRzOiBzZWxlY3RlZFRpY2tldHMuZmxhdE1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQoaXRlbS5maWxlSWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbGVJZCA/IFtmaWxlSWRdIDogW107XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICBheFVzZXJJZE92ZXJyaWRlOiByZXF1ZXN0QXhVc2VySWQgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuRGF0YSB8fCBudWxsO1xyXG4gICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgIGNvbnN0IGZhaWx1cmVNZXNzYWdlID0gcmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIik7XHJcbiAgICAgICAgc2V0TGlua0Zsb3dFcnJvcihmYWlsdXJlTWVzc2FnZSk7XHJcbiAgICAgICAgc2V0TGlua0Zsb3dTdGF0dXMoZmFpbHVyZU1lc3NhZ2UpO1xyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldExpbmtCdWxrUmVzdWx0KHJlc3VsdCk7XHJcblxyXG4gICAgICBpZiAocmVzdWx0LmxpbmtlZENvdW50ID4gMCkge1xyXG4gICAgICAgIGNsZWFyVGlja2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xyXG4gICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xyXG4gICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoKTtcclxuICAgICAgICBjb25zdCBzdWNjZXNzTWFyayA9IHJlc3VsdC5mYWlsZWRDb3VudCA+IDAgfHwgcmVzdWx0LnNraXBwZWRDb3VudCA+IDAgPyBcIndhcm5pbmdQcm9jZXNzXCIgOiBcIm9rUHJvY2Vzc1wiO1xyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhzdWNjZXNzTWFyaywgc3VjY2Vzc01hcmsgPT09IFwib2tQcm9jZXNzXCIgPyAxMjAwIDogMTUwMCk7XHJcbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwobGlua1NoZWV0SWQpLCB7XHJcbiAgICAgICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxyXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocmVzdWx0LmZhaWxlZENvdW50ID4gMCAmJiByZXN1bHQubGlua2VkQ291bnQgPCAxKSB7XG4gICAgICAgIGNvbnN0IGZhaWx1cmVNZXNzYWdlID0gcmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIik7XG4gICAgICAgIHNldExpbmtGbG93U3RhdHVzKGZhaWx1cmVNZXNzYWdlKTtcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xuICAgICAgICBhd2FpdCBsb2FkTGlzdChjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsIGFjdGl2ZUZpbHRlcnMpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3VsdC5mYWlsZWRDb3VudCA+IDAgfHwgcmVzdWx0LnNraXBwZWRDb3VudCA+IDApIHtcbiAgICAgICAgc2V0TGlua0Zsb3dTdGF0dXMocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIikpO1xuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJ3YXJuaW5nUHJvY2Vzc1wiLCAxNTAwKTtcbiAgICAgICAgYXdhaXQgbG9hZExpc3QoY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLCBhY3RpdmVGaWx0ZXJzKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHNldExpbmtGbG93U3RhdHVzKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpKTtcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcbiAgICAgIGF3YWl0IGxvYWRMaXN0KGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSwgYWN0aXZlRmlsdGVycyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zdCBmYWlsdXJlTWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpO1xyXG4gICAgICBzZXRMaW5rRmxvd0Vycm9yKGZhaWx1cmVNZXNzYWdlKTtcclxuICAgICAgc2V0TGlua0Zsb3dTdGF0dXMoZmFpbHVyZU1lc3NhZ2UpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldExpbmtGbG93QnVzeShmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW1xyXG4gICAgYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwsXHJcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXHJcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxyXG4gICAgY2xlYXJUaWNrZXRTZWxlY3Rpb24sXHJcbiAgICBjdXJyZW50UGFnZSxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGV4Y2x1ZGVkSWRzLFxyXG4gICAgZmlsdGVyZWRTbmFwc2hvdCxcclxuICAgIGlzTGlua01vZGUsXHJcbiAgICBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlLFxyXG4gICAgbGlua0Zsb3dCdXN5LFxyXG4gICAgbGlua1NoZWV0SWQsXHJcbiAgICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZSxcclxuICAgIGxpbmtTaGVldExvY2tlZCxcclxuICAgIGxvYWRMaXN0LFxyXG4gICAgcmVzb2x2ZUFjdGl2ZUZpbHRlcnMsXHJcbiAgICByZXNvbHZlU2VsZWN0ZWRDb3VudCxcclxuICAgIHNlbGVjdGVkVGlja2V0cyxcclxuICAgIHRvdGFsLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBvcGVuTGlua0NvbmZpcm1Nb2RhbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghaXNMaW5rTW9kZSB8fCBzZWxlY3RlZFRpY2tldENvdW50IDwgMSB8fCBsaW5rRmxvd0J1c3kgfHwgbGlua1NoZWV0Q2hlY2tCdXN5IHx8IGxpbmtTaGVldExvY2tlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TGlua0Zsb3dFcnJvcihcIlwiKTtcclxuICAgIHNldExpbmtGbG93U3RhdHVzKFwiXCIpO1xyXG4gICAgb3BlbkNvbmZpcm0oe1xyXG4gICAgICB0aXRsZTogaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0xpbmtCdXR0b25cIiwgXCJWaW5jdWxhciB0aWNrZXQocylcIiksXHJcbiAgICAgIG1lc3NhZ2U6IGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmVcclxuICAgICAgICA/IGAke2luZFQoXCJOYXZfRXhwZW5zZVRpY2tldHNcIiwgXCJUaWNrZXRzXCIpfTogJHtzZWxlY3RlZFRpY2tldENvdW50fWBcclxuICAgICAgICA6IGAke2luZFQoXCJOYXZfRXhwZW5zZVRpY2tldHNcIiwgXCJUaWNrZXRzXCIpfTogJHtzZWxlY3RlZFRpY2tldENvdW50fVxcbiR7aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVG90YWxBbW91bnRcIiwgXCJUb3RhbCBhbW91bnRcIil9OiAke3NlbGVjdGVkVG90YWxBbW91bnRUZXh0fWAsXHJcbiAgICAgIGNvbmZpcm1UZXh0OiBpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfTGlua0J1dHRvblwiLCBcIlZpbmN1bGFyIHRpY2tldChzKVwiKSxcclxuICAgICAgY2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXHJcbiAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBydW5UaWNrZXRMaW5rRmxvdygpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSwgW1xyXG4gICAgaXNMaW5rTW9kZSxcclxuICAgIHNlbGVjdGVkVGlja2V0Q291bnQsXHJcbiAgICBsaW5rRmxvd0J1c3ksXHJcbiAgICBsaW5rU2hlZXRDaGVja0J1c3ksXHJcbiAgICBsaW5rU2hlZXRMb2NrZWQsXHJcbiAgICBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBzZWxlY3RlZFRvdGFsQW1vdW50VGV4dCxcclxuICAgIHJ1blRpY2tldExpbmtGbG93LFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRMaW5rRmxvd0Vycm9yKFwiXCIpO1xyXG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XHJcbiAgICAgIGJ1c3k6IGxpbmtGbG93QnVzeSxcclxuICAgICAgb25FcnJvcjogKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBzZXRMaW5rRmxvd0Vycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgIHNldExpbmtGbG93U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICB9LFxyXG4gICAgICBkZWZhdWx0RXJyb3JNZXNzYWdlOiBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIiksXHJcbiAgICB9KTtcclxuICB9LCBbaGFuZGxlQ29uZmlybSwgbGlua0Zsb3dCdXN5XSk7XHJcblxyXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XHJcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGxpbmtGbG93QnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICFsaW5rRmxvd0J1c3kgJiYgbGlua0Zsb3dFcnJvclxyXG4gICAgICA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKVxyXG4gICAgICA6IG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWxpbmtGbG93QnVzeSAmJiBsaW5rRmxvd0Vycm9yKSB7XHJcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2b2lkIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xyXG4gIH0sIFtjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbGlua0Zsb3dCdXN5LCBsaW5rRmxvd0Vycm9yXSk7XHJcblxyXG4gIGNvbnN0IG9wZW5UaWNrZXREZXRhaWwgPSB1c2VDYWxsYmFjayhcclxuICAgIChyYXdGaWxlSWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChyYXdGaWxlSWQpO1xyXG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3Qgc25hcHNob3QgPSBhcHBsaWVkRmlsdGVycyB8fCBjdXJyZW50RmlsdGVycztcclxuICAgICAgY29uc3QgY3VycmVudFN0YXRlID0ge1xyXG4gICAgICAgIGZpbHRlcnM6IHNuYXBzaG90LFxyXG4gICAgICAgIHBhZ2U6IGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSxcclxuICAgICAgICBzY3JvbGxZOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LnNjcm9sbFkgfHwgMCA6IDAsXHJcbiAgICAgICAgZm9jdXNGaWxlSWQ6IGZpbGVJZCxcclxuICAgICAgICBpdGVtcyxcclxuICAgICAgICB0b3RhbCxcclxuICAgICAgICBzZWxlY3RlZFRpY2tldHMsXHJcbiAgICAgICAgbGlua01vZGVTaGVldElkOiBpc0xpbmtNb2RlID8gbGlua1NoZWV0SWQgOiBcIlwiLFxyXG4gICAgICAgIHNlbGVjdGlvbk1vZGUsXHJcbiAgICAgICAgZXhjbHVkZWRJZHMsXHJcbiAgICAgICAgZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzOiBmaWx0ZXJlZFNuYXBzaG90LFxyXG4gICAgICAgIGZpbHRlcmVkU2VsZWN0aW9uVG90YWw6IGZpbHRlcmVkVG90YWxDb3VudCxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChpc0xpbmtNb2RlKSB7XHJcbiAgICAgICAgc2F2ZUNhY2hlZFN0YXRlKGN1cnJlbnRTdGF0ZSk7XHJcbiAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoe1xyXG4gICAgICAgICAgc2hlZXRJZDogbGlua1NoZWV0SWQsXHJcbiAgICAgICAgICBwYWdlOiBjdXJyZW50U3RhdGUucGFnZSxcclxuICAgICAgICAgIHNjcm9sbFk6IGN1cnJlbnRTdGF0ZS5zY3JvbGxZLFxyXG4gICAgICAgICAgZm9jdXNGaWxlSWQ6IGZpbGVJZCxcclxuICAgICAgICAgIGZpbHRlcnM6IHNuYXBzaG90LFxyXG4gICAgICAgICAgc2VsZWN0aW9uTW9kZSxcclxuICAgICAgICAgIHNlbGVjdGVkVGlja2V0cyxcclxuICAgICAgICAgIGV4Y2x1ZGVkSWRzLFxyXG4gICAgICAgICAgZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzOiBmaWx0ZXJlZFNuYXBzaG90LFxyXG4gICAgICAgICAgZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbDogZmlsdGVyZWRUb3RhbENvdW50LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGhhc1NoZWV0Q2FsbGVyQ29udGV4dCAmJiBzaGVldENhbGxlck9yaWdpbikge1xyXG4gICAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcclxuICAgICAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgICAgICBzaGVldElkOiBsaW5rU2hlZXRJZCxcclxuICAgICAgICAgICAgb3JpZ2luOiBzaGVldENhbGxlck9yaWdpbixcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcXVlcnkuc2V0KFwib3JpZ2luXCIsIHNoZWV0Q2FsbGVyT3JpZ2luKTtcclxuICAgICAgICAgIHF1ZXJ5LnNldChcInNoZWV0SWRcIiwgbGlua1NoZWV0SWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcclxuICAgICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICBieXBhc3NHdWFyZE9uY2U6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzYXZlQ2FjaGVkU3RhdGUoY3VycmVudFN0YXRlKTtcclxuICAgICAgaWYgKGhhc1NoZWV0Q2FsbGVyQ29udGV4dCAmJiBzaGVldENhbGxlck9yaWdpbikge1xyXG4gICAgICAgIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCh7XHJcbiAgICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgICBzaGVldElkOiBsaW5rU2hlZXRJZCxcclxuICAgICAgICAgIG9yaWdpbjogc2hlZXRDYWxsZXJPcmlnaW4sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICAgIGZpbGVJZCxcclxuICAgICAgICAgIG9yaWdpbjogc2hlZXRDYWxsZXJPcmlnaW4sXHJcbiAgICAgICAgICBzaGVldElkOiBsaW5rU2hlZXRJZCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcclxuICAgICAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgIGJ5cGFzc0d1YXJkT25jZTogZmFsc2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjbGVhckV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KCk7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD9maWxlSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoZmlsZUlkKX1gLCB7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiB0cnVlLFxyXG4gICAgICAgIGJ5cGFzc0d1YXJkT25jZTogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgYXBwbGllZEZpbHRlcnMsXHJcbiAgICAgIGN1cnJlbnRQYWdlLFxyXG4gICAgICBjdXJyZW50RmlsdGVycyxcclxuICAgICAgaGFzU2hlZXRDYWxsZXJDb250ZXh0LFxyXG4gICAgICBsaW5rU2hlZXRJZCxcclxuICAgICAgaXNMaW5rTW9kZSxcclxuICAgICAgaXRlbXMsXHJcbiAgICAgIGZpbHRlcmVkVG90YWxDb3VudCxcclxuICAgICAgZmlsdGVyZWRTbmFwc2hvdCxcclxuICAgICAgZXhjbHVkZWRJZHMsXHJcbiAgICAgIHNoZWV0Q2FsbGVyT3JpZ2luLFxyXG4gICAgICBzYXZlQ2FjaGVkU3RhdGUsXHJcbiAgICAgIHNhdmVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxyXG4gICAgICBzZWxlY3RlZFRpY2tldHMsXHJcbiAgICAgIHNlbGVjdGlvbk1vZGUsXHJcbiAgICAgIHRvdGFsLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XHJcbiAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xyXG4gICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xyXG4gICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcclxuICAgIGlmICghdGltZWxpbmVDb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIGNhcmQ7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcclxuICAgIGNvbnRhaW5lclJlZjogdGltZWxpbmVDb250YWluZXJSZWYsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBpdGVtcyxcclxuICAgIHJlc29sdmVDbGlja2FibGVDYXJkLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKCh0b3RhbCB8fCAwKSAvIFBBR0VfU0laRSk7XHJcbiAgY29uc3Qgc2hvd0xpc3RMb2FkaW5nID0gaXNMb2FkaW5nO1xyXG4gIGNvbnN0IGxpbmtNb2RlU2VsZWN0aW9uQnV0dG9uc0Rpc2FibGVkID0gbGlua0Zsb3dCdXN5IHx8IHNlbGVjdEFsbEJ1c3kgfHwgaXNMb2FkaW5nO1xyXG5cclxuICBjb25zdCBzdW1tYXJ5SXRlbXMgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IHNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnM7XHJcbiAgICBpZiAoIXNuYXBzaG90KSByZXR1cm4gW10gYXMgQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9PjtcclxuXHJcbiAgICBjb25zdCBzdW1tYXJ5OiBBcnJheTx7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0+ID0gW107XHJcbiAgICBjb25zdCBsb2NhbGUgPSBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIjtcclxuICAgIGNvbnN0IGZyb21EYXRlVGV4dCA9IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShzbmFwc2hvdC5mcm9tRGF0ZSwgbG9jYWxlLCBcIlwiKTtcclxuICAgIGNvbnN0IHRvRGF0ZVRleHQgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoc25hcHNob3QudG9EYXRlLCBsb2NhbGUsIFwiXCIpO1xyXG5cclxuICAgIGlmIChmcm9tRGF0ZVRleHQgfHwgdG9EYXRlVGV4dCkge1xyXG4gICAgICBzdW1tYXJ5LnB1c2goe1xyXG4gICAgICAgIGtleTogXCJmcm9tRGF0ZVwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKSxcclxuICAgICAgICB2YWx1ZTogZnJvbURhdGVUZXh0IHx8IFwiLS1cIixcclxuICAgICAgfSk7XHJcbiAgICAgIHN1bW1hcnkucHVzaCh7XHJcbiAgICAgICAga2V5OiBcInRvRGF0ZVwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpLFxyXG4gICAgICAgIHZhbHVlOiB0b0RhdGVUZXh0IHx8IFwiLS1cIixcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNuYXBzaG90LmZpbHRlcktleS50cmltKCkpIHtcclxuICAgICAgc3VtbWFyeS5wdXNoKHtcclxuICAgICAgICBrZXk6IFwiZmlsdGVyS2V5XCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9GaWx0ZXJLZXlcIiwgXCJUaWNrZXRcIiksXHJcbiAgICAgICAgdmFsdWU6IHNuYXBzaG90LmZpbHRlcktleS50cmltKCksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzbmFwc2hvdC5jdXJyZW5jeUNvZGUudHJpbSgpKSB7XHJcbiAgICAgIHN1bW1hcnkucHVzaCh7XHJcbiAgICAgICAga2V5OiBcImN1cnJlbmN5XCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpLFxyXG4gICAgICAgIHZhbHVlOiBzbmFwc2hvdC5jdXJyZW5jeUNvZGUudHJpbSgpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc25hcHNob3Quc3RhdHVzRmlsdGVyICE9PSBcIlwiKSB7XHJcbiAgICAgIHN1bW1hcnkucHVzaCh7XHJcbiAgICAgICAga2V5OiBcInN0YXR1c1wiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzXCIsIFwiU3RhdHVzXCIpLFxyXG4gICAgICAgIHZhbHVlOiBnZXRFeHBlbnNlVGlja2V0U3RhdHVzTGFiZWwoc25hcHNob3Quc3RhdHVzRmlsdGVyKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNuYXBzaG90Lmdhc3RvVHlwZUZpbHRlciAhPT0gXCJcIikge1xyXG4gICAgICBjb25zdCBjYXRlZ29yeUxhYmVsID0gZ2FzdG9UeXBlTGFiZWxNYXAuZ2V0KFN0cmluZyhzbmFwc2hvdC5nYXN0b1R5cGVGaWx0ZXIpKSB8fCBTdHJpbmcoc25hcHNob3QuZ2FzdG9UeXBlRmlsdGVyKTtcclxuICAgICAgc3VtbWFyeS5wdXNoKHtcclxuICAgICAgICBrZXk6IFwiY2F0ZWdvcnlcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIiksXHJcbiAgICAgICAgdmFsdWU6IGNhdGVnb3J5TGFiZWwsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzbmFwc2hvdC5wcm9jZXNzZWRCeUlhRmlsdGVyICE9PSBcImFsbFwiKSB7XHJcbiAgICAgIHN1bW1hcnkucHVzaCh7XHJcbiAgICAgICAga2V5OiBcInByb2Nlc3NlZFwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQVwiLCBcIlByb2Nlc3NlZCBieSBJQVwiKSxcclxuICAgICAgICB2YWx1ZTpcclxuICAgICAgICAgIHNuYXBzaG90LnByb2Nlc3NlZEJ5SWFGaWx0ZXIgPT09IFwieWVzXCJcclxuICAgICAgICAgICAgPyBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9ZZXNcIiwgXCJZZXNcIilcclxuICAgICAgICAgICAgOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9Ob1wiLCBcIk5vXCIpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3VtbWFyeTtcclxuICB9LCBbYXBwbGllZEZpbHRlcnMsIGdhc3RvVHlwZUxhYmVsTWFwXSk7XHJcblxyXG4gIGNvbnN0IHNob3dTdW1tYXJ5ID0gIWlzTGlua01vZGUgJiYgIXNob3dGaWx0ZXJzICYmIHN1bW1hcnlJdGVtcy5sZW5ndGggPiAwO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc0xpbmtNb2RlKSByZXR1cm47XHJcbiAgICBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKHtcclxuICAgICAgYWN0aXZlOiB0cnVlLFxyXG4gICAgICBtZXNzYWdlOiBsaW5rTW9kZUNhbmNlbE1lc3NhZ2UsXHJcbiAgICB9KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCgpO1xyXG4gICAgfTtcclxuICB9LCBbaXNMaW5rTW9kZSwgbGlua01vZGVDYW5jZWxNZXNzYWdlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6ZW50ZXJcIiwge1xyXG4gICAgICB1cmw6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cubG9jYXRpb24uaHJlZiA6IFwiXCIsXHJcbiAgICAgIGRpZFJlc3RvcmVPbk1vdW50OiBkaWRSZXN0b3JlT25Nb3VudFJlZi5jdXJyZW50LFxyXG4gICAgICBoYXNBY2Nlc3MsXHJcbiAgICAgIGlzTGlua01vZGUsXHJcbiAgICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICAgIH0pO1xyXG4gICAgaWYgKGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQpIHtcclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNXYXJuKFwibW91bnRSZXN0b3JlRWZmZWN0OnNraXAtYWxyZWFkeS1yZXN0b3JlZFwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCFoYXNBY2Nlc3MpIHtcclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNXYXJuKFwibW91bnRSZXN0b3JlRWZmZWN0OnNraXAtbm8tYWNjZXNzXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc0xpbmtNb2RlKSB7XHJcbiAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICBjb25zdCB0aWNrZXRGaWxlSWQgPSBzYWZlVGV4dCh1cmwuc2VhcmNoUGFyYW1zLmdldChcInRpY2tldEZpbGVJZFwiKSk7XHJcbiAgICAgIGlmICh0aWNrZXRGaWxlSWQpIHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6dGlja2V0LWNyZWF0ZS1yZXR1cm4tZGV0ZWN0ZWRcIiwge1xyXG4gICAgICAgICAgdGlja2V0RmlsZUlkLFxyXG4gICAgICAgICAgdGlja2V0RGF0ZTogdXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJ0aWNrZXREYXRlXCIpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgICAgIGFwcGx5Q3JlYXRlZFRpY2tldFJldHVybih0aWNrZXRGaWxlSWQsIHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwidGlja2V0RGF0ZVwiKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkpIHtcclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNXYXJuKFwibW91bnRSZXN0b3JlRWZmZWN0OndhaXRpbmctbWFuYWdlbWVudC1ib290c3RyYXBcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgY29uc3QgaXNIaXN0b3J5QmFja0ZvcndhcmQgPSBpc0V4cGVuc2VIaXN0b3J5QmFja0ZvcndhcmROYXZpZ2F0aW9uKCk7XHJcbiAgICBjb25zdCBpc1JldHVybkZyb21UaWNrZXREZXRhaWwgPSBoYXNFeHBlbnNlUmV0dXJuUmVmZXJyZXIoW1xyXG4gICAgICBcIi9HYXN0b3MvVGlja2V0RGV0YWlsXCIsXHJcbiAgICAgIFwiL0dhc3Rvcy9UaWNrZXRMaW5lRGV0YWlsXCIsXHJcbiAgICBdKTtcclxuICAgIGNvbnN0IHJldHVybk1vZGUgPSBjb25zdW1lUmV0dXJuTW9kZSgpO1xyXG4gICAgY29uc3QgaGFzUmV0dXJuRmxhZyA9IGNvbnN1bWVSZXR1cm5GbGFnKCk7XHJcblxyXG4gICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OnJlc29sdmVkLXJldHVybi1zdGF0ZVwiLCB7XHJcbiAgICAgIGlzSGlzdG9yeUJhY2tGb3J3YXJkLFxyXG4gICAgICBpc1JldHVybkZyb21UaWNrZXREZXRhaWwsXHJcbiAgICAgIHJldHVybk1vZGUsXHJcbiAgICAgIGhhc1JldHVybkZsYWcsXHJcbiAgICAgIGlzTGlua01vZGUsXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocmV0dXJuTW9kZSA9PT0gXCJyZXNldF9maWx0ZXJzXCIgJiYgaGFzUmV0dXJuRmxhZykge1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6cmVzdG9yZS1kZWxldGUtcmV0dXJuXCIpO1xyXG4gICAgICByZXN0b3JlRGVsZXRlUmV0dXJuU3RhdGUoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc0xpbmtNb2RlKSB7XHJcbiAgICAgIGNvbnN0IGlzUmV0dXJuaW5nRnJvbURldGFpbCA9IGhhc1JldHVybkZsYWcgfHwgaXNIaXN0b3J5QmFja0ZvcndhcmQgfHwgaXNSZXR1cm5Gcm9tVGlja2V0RGV0YWlsO1xyXG4gICAgICBjb25zdCBjYWNoZWRTdGF0ZSA9IGlzUmV0dXJuaW5nRnJvbURldGFpbCA/IHJlYWRDYWNoZWRTdGF0ZSgpIDogbnVsbDtcclxuICAgICAgY29uc3QgY2FjaGVkU2hlZXRJZCA9IHNhZmVUZXh0KGNhY2hlZFN0YXRlPy5saW5rTW9kZVNoZWV0SWQpO1xyXG4gICAgICBpZiAoY2FjaGVkU3RhdGUgJiYgY2FjaGVkU2hlZXRJZCAmJiBjYWNoZWRTaGVldElkID09PSBzYWZlVGV4dChsaW5rU2hlZXRJZCkpIHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6cmVzdG9yZS1saW5rLW1vZGUtY2FjaGVcIiwge1xyXG4gICAgICAgICAgY2FjaGVkU2hlZXRJZCxcclxuICAgICAgICAgIHBhZ2U6IGNhY2hlZFN0YXRlLnBhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKCk7XHJcbiAgICAgICAgcmVzdG9yZUxpbmtNb2RlUmV0dXJuU3RhdGUoY2FjaGVkU3RhdGUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbGlua1JldHVyblN0YXRlID0gaXNSZXR1cm5pbmdGcm9tRGV0YWlsID8gcmVhZEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUobGlua1NoZWV0SWQpIDogbnVsbDtcclxuICAgICAgaWYgKGxpbmtSZXR1cm5TdGF0ZSkge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXN0b3JlLWxpbmstbW9kZS1yZXR1cm4tc3RhdGVcIiwge1xyXG4gICAgICAgICAgc2hlZXRJZDogbGlua1JldHVyblN0YXRlLnNoZWV0SWQsXHJcbiAgICAgICAgICBwYWdlOiBsaW5rUmV0dXJuU3RhdGUucGFnZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoKTtcclxuICAgICAgICByZXN0b3JlTGlua01vZGVSZXR1cm5TdGF0ZSh7XHJcbiAgICAgICAgICBmaWx0ZXJzOiBsaW5rUmV0dXJuU3RhdGUuZmlsdGVycyxcclxuICAgICAgICAgIHBhZ2U6IGxpbmtSZXR1cm5TdGF0ZS5wYWdlLFxyXG4gICAgICAgICAgc2Nyb2xsWTogbGlua1JldHVyblN0YXRlLnNjcm9sbFksXHJcbiAgICAgICAgICBmb2N1c0ZpbGVJZDogbGlua1JldHVyblN0YXRlLmZvY3VzRmlsZUlkLFxyXG4gICAgICAgICAgaXRlbXM6IFtdLFxyXG4gICAgICAgICAgc2VsZWN0ZWRUaWNrZXRzOiBsaW5rUmV0dXJuU3RhdGUuc2VsZWN0ZWRUaWNrZXRzLFxyXG4gICAgICAgICAgdG90YWw6IDAsXHJcbiAgICAgICAgICBsaW5rTW9kZVNoZWV0SWQ6IGxpbmtSZXR1cm5TdGF0ZS5zaGVldElkLFxyXG4gICAgICAgICAgc2VsZWN0aW9uTW9kZTogbGlua1JldHVyblN0YXRlLnNlbGVjdGlvbk1vZGUsXHJcbiAgICAgICAgICBleGNsdWRlZElkczogbGlua1JldHVyblN0YXRlLmV4Y2x1ZGVkSWRzLFxyXG4gICAgICAgICAgZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzOiBsaW5rUmV0dXJuU3RhdGUuZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzLFxyXG4gICAgICAgICAgZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbDogbGlua1JldHVyblN0YXRlLmZpbHRlcmVkU2VsZWN0aW9uVG90YWwsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6cmVzdG9yZS1pbml0aWFsLWxpbmstbW9kZVwiKTtcclxuICAgICAgcmVzdG9yZUluaXRpYWxMaW5rTW9kZVN0YXRlKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWhhc1JldHVybkZsYWcgJiYgIWlzSGlzdG9yeUJhY2tGb3J3YXJkICYmICFpc1JldHVybkZyb21UaWNrZXREZXRhaWwpIHtcclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OnJlc3RvcmUtaW5pdGlhbC1zdGFuZGFyZC1zdGF0ZVwiKTtcclxuICAgICAgcmVzdG9yZUluaXRpYWxTdGFuZGFyZFN0YXRlKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjYWNoZWRTdGF0ZSA9IHJlYWRDYWNoZWRTdGF0ZSgpO1xyXG4gICAgaWYgKCFjYWNoZWRTdGF0ZSkge1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c1dhcm4oXCJtb3VudFJlc3RvcmVFZmZlY3Q6bm8tY2FjaGVkLXN0YXRlXCIpO1xyXG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6cmVzdG9yZS1zdGFuZGFyZC1jYWNoZVwiLCB7XHJcbiAgICAgIHBhZ2U6IGNhY2hlZFN0YXRlLnBhZ2UsXHJcbiAgICAgIGZvY3VzRmlsZUlkOiBjYWNoZWRTdGF0ZS5mb2N1c0ZpbGVJZCxcclxuICAgIH0pO1xyXG4gICAgcmVzdG9yZVN0YW5kYXJkUmV0dXJuU3RhdGUoY2FjaGVkU3RhdGUpO1xyXG4gIH0sIFtcclxuICAgIGFwcGx5Q3JlYXRlZFRpY2tldFJldHVybixcclxuICAgIGNsZWFyQ2FjaGVkU3RhdGUsXHJcbiAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsXHJcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcclxuICAgIGNvbnN1bWVSZXR1cm5Nb2RlLFxyXG4gICAgaGFzQWNjZXNzLFxyXG4gICAgaXNMaW5rTW9kZSxcclxuICAgIGxpbmtTaGVldElkLFxyXG4gICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gICAgcmVhZENhY2hlZFN0YXRlLFxyXG4gICAgcmVhZEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsXHJcbiAgICByZXN0b3JlRGVsZXRlUmV0dXJuU3RhdGUsXHJcbiAgICByZXN0b3JlSW5pdGlhbExpbmtNb2RlU3RhdGUsXHJcbiAgICByZXN0b3JlSW5pdGlhbFN0YW5kYXJkU3RhdGUsXHJcbiAgICByZXN0b3JlTGlua01vZGVSZXR1cm5TdGF0ZSxcclxuICAgIHJlc3RvcmVTdGFuZGFyZFJldHVyblN0YXRlLFxyXG4gIF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGlzTG9hZGluZykgcmV0dXJuO1xyXG4gICAgaWYgKHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPT0gbnVsbCAmJiAhcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBwZW5kaW5nU2Nyb2xsWSA9IHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQ7XHJcbiAgICBjb25zdCBwZW5kaW5nRm9jdXNGaWxlSWQgPSBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudDtcclxuICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSBcIlwiO1xyXG5cclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICBpZiAocGVuZGluZ1Njcm9sbFkgIT0gbnVsbCkge1xyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICB0b3A6IE1hdGgubWF4KDAsIHBlbmRpbmdTY3JvbGxZKSxcclxuICAgICAgICAgIGJlaGF2aW9yOiBcImF1dG9cIixcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFwZW5kaW5nRm9jdXNGaWxlSWQgfHwgIXRpbWVsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRGb2N1c0lkID0gcGVuZGluZ0ZvY3VzRmlsZUlkLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgIGNvbnN0IHRpbWVsaW5lSXRlbXMgPSBBcnJheS5mcm9tKFxyXG4gICAgICAgIHRpbWVsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtaXRlbVtkYXRhLXRpY2tldC1maWxlLWlkXVwiKVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBtYXRjaGluZ0l0ZW0gPSB0aW1lbGluZUl0ZW1zLmZpbmQoKGl0ZW0pID0+IHtcclxuICAgICAgICByZXR1cm4gc2FmZVRleHQoaXRlbS5kYXRhc2V0LnRpY2tldEZpbGVJZCkudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZEZvY3VzSWQ7XHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCB0YXJnZXRDYXJkID0gbWF0Y2hpbmdJdGVtPy5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XHJcbiAgICAgIGlmICghdGFyZ2V0Q2FyZCkgcmV0dXJuO1xyXG5cclxuICAgICAgdGFyZ2V0Q2FyZC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XHJcbiAgICB9KTtcclxuICB9LCBbaXNMb2FkaW5nLCBpdGVtcy5sZW5ndGhdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5IHx8ICFoYXNBY2Nlc3MpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVQYWdlU2hvdyA9IChldmVudDogUGFnZVRyYW5zaXRpb25FdmVudCkgPT4ge1xyXG4gICAgICBpZiAoIWV2ZW50LnBlcnNpc3RlZCAmJiAhaXNFeHBlbnNlSGlzdG9yeUJhY2tGb3J3YXJkTmF2aWdhdGlvbigpKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBzbmFwc2hvdCA9IHJlc29sdmVBY3RpdmVGaWx0ZXJzRXZlbnQoKTtcbiAgICAgIGlmICghaXNMaW5rTW9kZSAmJiAoIXNuYXBzaG90LmZyb21EYXRlIHx8ICFzbmFwc2hvdC50b0RhdGUpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBydW5BdXRvbWF0aWNMaXN0TG9hZChjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsIHNuYXBzaG90LCB7XHJcbiAgICAgICAgY2xlYXJDYWNoZTogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgaGFuZGxlUGFnZVNob3cpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBoYW5kbGVQYWdlU2hvdyk7XHJcbiAgICB9O1xyXG4gIH0sIFtjdXJyZW50UGFnZSwgaGFzQWNjZXNzLCBpc0xpbmtNb2RlLCBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksIHJ1bkF1dG9tYXRpY0xpc3RMb2FkXSk7XG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgb25Ub2dnbGVGaWx0ZXJzID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCB3aWxsT3BlbiA9ICFzaG93RmlsdGVycztcclxuICAgICAgdG9nZ2xlRmlsdGVyUGFuZWwoKTtcclxuICAgICAgaWYgKHdpbGxPcGVuKSB7XHJcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHsgdG9wOiAwLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvblJlZnJlc2ggPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnNFdmVudCgpO1xuICAgICAgaWYgKCFpc0xpbmtNb2RlICYmICghc25hcHNob3Q/LmZyb21EYXRlIHx8ICFzbmFwc2hvdD8udG9EYXRlKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB2b2lkIGxvYWRMaXN0KGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSwgc25hcHNob3QpO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXRpY2tldHMtdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XHJcbiAgICB9O1xyXG4gIH0sIFtjdXJyZW50UGFnZSwgaXNMaW5rTW9kZSwgbG9hZExpc3QsIHNob3dGaWx0ZXJzLCB0b2dnbGVGaWx0ZXJQYW5lbF0pO1xuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXtsaW5rRmxvd0J1c3l9XHJcbiAgICAgICAgZXJyb3I9e2xpbmtGbG93RXJyb3J9XHJcbiAgICAgICAgc3RhdHVzPXtsaW5rRmxvd1N0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17Y2xvc2VDb25maXJtfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgcmVmPXtjYW1lcmFJbnB1dFJlZn1cclxuICAgICAgICB0eXBlPVwiZmlsZVwiXHJcbiAgICAgICAgYWNjZXB0PXtUSUNLRVRfSU1BR0VfQUNDRVBUX0FUVFJJQlVURX1cclxuICAgICAgICBjYXB0dXJlPVwiZW52aXJvbm1lbnRcIlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXHJcbiAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZmlsZXM/LlswXSB8fCBudWxsO1xyXG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICB2b2lkIGhhbmRsZVNlbGVjdGVkRmlsZShmaWxlLCBcImNhbWVyYVwiKTtcclxuICAgICAgICB9fVxyXG4gICAgICAvPlxyXG4gICAgICA8aW5wdXRcclxuICAgICAgICByZWY9e2dhbGxlcnlJbnB1dFJlZn1cclxuICAgICAgICB0eXBlPVwiZmlsZVwiXHJcbiAgICAgICAgYWNjZXB0PXtUSUNLRVRfSU1BR0VfQUNDRVBUX0FUVFJJQlVURX1cclxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxyXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmZpbGVzPy5bMF0gfHwgbnVsbDtcclxuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgdm9pZCBoYW5kbGVTZWxlY3RlZEZpbGUoZmlsZSwgXCJnYWxsZXJ5XCIpO1xyXG4gICAgICAgIH19XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICB7IWlzTGlua01vZGUgJiYgc291cmNlUGlja2VyT3BlbiA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzQ1IHB4LTQgcHktNlwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctc20gcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgcC00IHNoYWRvdy14bFwiPlxyXG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1bMTZweF0gZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTgwMFwiPlxyXG4gICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX1RpdGxlXCIsIFwiTnVldm8gdGlja2V0XCIpfVxyXG4gICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xIHRleHQtc20gdGV4dC1zbGF0ZS02MDBcIj5cclxuICAgICAgICAgICAgICB7aW5kVChcclxuICAgICAgICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0JvZHlcIixcclxuICAgICAgICAgICAgICAgIFwiU2VsZWNjaW9uYSB1bmEgZnVlbnRlIHBhcmEgY2FwdHVyYXIgbyBlbGVnaXIgbGEgaW1hZ2VuIGRlbCB0aWNrZXQuXCJcclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L3A+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgZ3JpZCBncmlkLWNvbHMtMSBnYXAtMlwiPlxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCJcclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgdm9pZCBzZWxlY3RGcm9tQ2FtZXJhKGNhbWVyYUlucHV0UmVmLmN1cnJlbnQpO1xyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9DYW1lcmFcIiwgXCJVc2FyIGNcdTAwRTFtYXJhXCIpfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCJcclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNlbGVjdEZyb21HYWxsZXJ5KGdhbGxlcnlJbnB1dFJlZi5jdXJyZW50KX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9HYWxsZXJ5XCIsIFwiRWxlZ2lyIGltYWdlblwiKX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbG9zZVNvdXJjZVBpY2tlcn1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIil9XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgeyFpc0xpbmtNb2RlID8gKFxyXG4gICAgICAgIDxFeHBlbnNlUXVpY2tUaWNrZXRQcm9ncmVzc092ZXJsYXlcclxuICAgICAgICAgIG9wZW49e3F1aWNrVGlja2V0QnVzeX1cclxuICAgICAgICAgIHRpdGxlPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfVGl0bGVcIiwgXCJQcm9jZXNzaW5nIHRpY2tldFwiKX1cclxuICAgICAgICAgIHN1bW1hcnk9e3F1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlIHx8IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgICAgICBlbGFwc2VkTXM9e3F1aWNrVGlja2V0RWxhcHNlZE1zfVxyXG4gICAgICAgICAgc3RhZ2VzPXtxdWlja1RpY2tldFByb2dyZXNzU3RhZ2VzfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgeyFpc0xpbmtNb2RlICYmIHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlID8gKFxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzTmFtZT17XHJcbiAgICAgICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlXHJcbiAgICAgICAgICAgICAgPyBcImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIHNwYWNlLXktMiByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBiZy1hbWJlci01MCBwLTMgdGV4dC1zbSB0ZXh0LWFtYmVyLTkwMFwiXHJcbiAgICAgICAgICAgICAgOiBcImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIHNwYWNlLXktMiByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXJvc2UtNTAgcC0zIHRleHQtc20gdGV4dC1yb3NlLTgwMFwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHA+e3F1aWNrVGlja2V0RXJyb3JNZXNzYWdlfTwvcD5cclxuICAgICAgICAgIHtxdWlja1RpY2tldEF0dGVtcHRJZCA/IChcclxuICAgICAgICAgICAgPHBcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmVcclxuICAgICAgICAgICAgICAgICAgPyBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItYW1iZXItMjAwIGJnLXdoaXRlIHB4LTIgcHktMSBmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1hbWJlci05MDAgYnJlYWstYWxsXCJcclxuICAgICAgICAgICAgICAgICAgOiBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctd2hpdGUgcHgtMiBweS0xIGZvbnQtbW9ubyB0ZXh0LVsxMXB4XSB0ZXh0LXJvc2UtODAwIGJyZWFrLWFsbFwiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge2BhdHRlbXB0SWQ6ICR7cXVpY2tUaWNrZXRBdHRlbXB0SWR9YH1cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICB7cXVpY2tUaWNrZXRUcmFjZUxpc3QubGVuZ3RoID4gMCA/IChcclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17XHJcbiAgICAgICAgICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZVxyXG4gICAgICAgICAgICAgICAgICA/IFwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1hbWJlci0yMDAgYmctd2hpdGUgcC0yIHRleHQteHMgdGV4dC1hbWJlci04MDBcIlxyXG4gICAgICAgICAgICAgICAgICA6IFwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy13aGl0ZSBwLTIgdGV4dC14cyB0ZXh0LXJvc2UtNzAwXCJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7cXVpY2tUaWNrZXRUcmFjZUxpc3QubWFwKChlbnRyeSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPHAga2V5PXtgJHtlbnRyeS5zdGVwfS0ke2VudHJ5LmF0fWB9PntgJHtlbnRyeS5zdGVwfTogJHtlbnRyeS50cmFjZUlkfWB9PC9wPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTJcIj5cbiAgICAgICAgICAgIHtoYXNQZW5kaW5nVXBsb2FkUmV0cnkgPyAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCJcclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgdm9pZCByZXRyeVBlbmRpbmdVcGxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9SZXRyeVVwbG9hZFwiLCBcIlJlaW50ZW50YXIgdXBsb2FkXCIpfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiIG9uQ2xpY2s9e2NsZWFyUXVpY2tUaWNrZXRFcnJvcn0+XHJcbiAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2xvc2VcIiwgXCJDbG9zZVwiKX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICB7c2hvd1N1bW1hcnkgPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItY2FyZCBmaWx0ZXItY2FyZC0tc3VtbWFyeSBwLTMgc206cC00IG10LTEgbWItM1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJleHBlbnNlLXN1bW1hcnktZ3JpZCBncmlkIGdyaWQtY29scy0xIG1pbi1bMzYwcHhdOmdyaWQtY29scy0yIGl0ZW1zLXN0YXJ0IGdhcC14LTQgZ2FwLXktMSB0ZXh0LXhzXCI+XHJcbiAgICAgICAgICAgIHtzdW1tYXJ5SXRlbXMubWFwKChpdGVtKSA9PiAoXHJcbiAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAga2V5PXtpdGVtLmtleX1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN1bW1hcnkgaGlzdG9yeS1maWx0ZXItc3VtbWFyeS0tZ3JpZC1pdGVtIGxlYWRpbmctNSBtaW4tdy0wXCJcclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdW1tYXJ5X19sYWJlbCBmb250LXNlbWlib2xkXCI+e2l0ZW0ubGFiZWx9Ojwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN1bW1hcnlfX3ZhbHVlIGJyZWFrLXdvcmRzXCI+e2l0ZW0udmFsdWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIDxFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbFxyXG4gICAgICAgIG1vZGU9e2lzTGlua01vZGUgPyBcImxpbmtcIiA6IFwiZ2VuZXJhbFwifVxyXG4gICAgICAgIHZpc2libGU9e3Nob3dGaWx0ZXJzfVxyXG4gICAgICAgIHNob3dNYW51YWxEYXRlRmlsdGVyPXtzaG93TWFudWFsRGF0ZUZpbHRlcn1cclxuICAgICAgICBtYW51YWxEYXRlQXV0b09wZW5LZXk9e21hbnVhbERhdGVBdXRvT3BlbktleX1cclxuICAgICAgICBmcm9tRGF0ZT17ZnJvbURhdGV9XHJcbiAgICAgICAgdG9EYXRlPXt0b0RhdGV9XHJcbiAgICAgICAgZmlsdGVyS2V5PXtmaWx0ZXJLZXl9XHJcbiAgICAgICAgY3VycmVuY3lDb2RlPXtjdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgbWFuYWdlZFVzZXJJZD17bWFuYWdlZFVzZXJJZH1cclxuICAgICAgICBtYW5hZ2VkVXNlcnM9e21hbmFnZWRVc2Vyc31cclxuICAgICAgICBzaG93TWFuYWdlZFVzZXJGaWx0ZXI9e3Nob3dNYW5hZ2VkVXNlckZpbHRlcn1cclxuICAgICAgICBzdGF0dXNGaWx0ZXI9e3N0YXR1c0ZpbHRlcn1cclxuICAgICAgICBnYXN0b1R5cGVGaWx0ZXI9e2dhc3RvVHlwZUZpbHRlcn1cclxuICAgICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyPXtwcm9jZXNzZWRCeUlhRmlsdGVyfVxyXG4gICAgICAgIGFjdGl2ZVF1aWNrRmlsdGVyPXthY3RpdmVRdWlja0ZpbHRlcn1cclxuICAgICAgICBzaG93TWFudWFsRGF0ZUVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yfVxyXG4gICAgICAgIHN0YXR1c0ZpbHRlclJlYWRPbmx5PXtzdGF0dXNGaWx0ZXJMb2NrZWR9XHJcbiAgICAgICAgZml4ZWRTdGF0dXNGaWx0ZXI9e2ZpeGVkU3RhdHVzRmlsdGVyfVxyXG4gICAgICAgIGdhc3RvVHlwZU9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XHJcbiAgICAgICAgb25EYXRlUmFuZ2VDaGFuZ2U9e29uRGF0ZVJhbmdlQ2hhbmdlfVxyXG4gICAgICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZT17b25NYW51YWxSYW5nZUNvbXBsZXRlfVxyXG4gICAgICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2U9e29uUXVpY2tGaWx0ZXJDaGFuZ2V9XHJcbiAgICAgICAgb25GaWx0ZXJLZXlDaGFuZ2U9e3NldEZpbHRlcktleX1cclxuICAgICAgICBvbkN1cnJlbmN5Q29kZUNoYW5nZT17c2V0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgIG9uTWFuYWdlZFVzZXJJZENoYW5nZT17c2V0TWFuYWdlZFVzZXJJZH1cclxuICAgICAgICBvblN0YXR1c0ZpbHRlckNoYW5nZT17c2V0U3RhdHVzRmlsdGVyfVxyXG4gICAgICAgIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlPXtzZXRHYXN0b1R5cGVGaWx0ZXJ9XHJcbiAgICAgICAgb25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlPXtzZXRQcm9jZXNzZWRCeUlhRmlsdGVyfVxyXG4gICAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XHJcbiAgICAgICAgb25BcHBseT17b25BcHBseX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtpc0xpbmtNb2RlID8gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIHB4LTAuNVwiPlxyXG4gICAgICAgICAgeyFjYW5Qcm9jZXNzTGlua01vZGUgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXJvc2UtNzAwXCI+e2luZFQoXCJBdXRoX1Blcm1pc3Npb25EZW5pZWRfQm9keVwiLCBcIk5vIHBlcm1pc3Npb24uXCIpfTwvZGl2PlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAge2NhblByb2Nlc3NMaW5rTW9kZSAmJiBsaW5rU2hlZXRDaGVja0J1c3kgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiPlxyXG4gICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9IC8+XHJcbiAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgIHtjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiBzZWxlY3RBbGxCdXN5ID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIj5cclxuICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfSAvPlxyXG4gICAgICAgICAgICAgIDxzcGFuPntpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmICFsaW5rU2hlZXRDaGVja0J1c3kgJiYgbGlua1NoZWV0TG9ja2VkID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1yb3NlLTcwMFwiPlxyXG4gICAgICAgICAgICAgIHtsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZSB8fFxyXG4gICAgICAgICAgICAgICAgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1JlYWRPbmx5QnlTdGF0dXNcIiwgXCJObyBzZSBwdWVkZSBlZGl0YXIgZXN0YSBob2phIGRlIGdhc3RvcyBlbiBlbCBlc3RhZG8gYWN0dWFsLlwiKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmICFsaW5rU2hlZXRDaGVja0J1c3kgJiYgIWxpbmtTaGVldExvY2tlZCAmJiBzZWxlY3RBbGxFcnJvciA/IChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtcm9zZS03MDBcIj57c2VsZWN0QWxsRXJyb3J9PC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmICFsaW5rU2hlZXRDaGVja0J1c3kgJiYgIWxpbmtTaGVldExvY2tlZCA/IChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTUgZ3JpZCBncmlkLWNvbHMtMiBnYXAtMS41IHB0LTAuNSBzbTptYi02XCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgbWluLXctMCBweC0xLjUgcHktMSB0ZXh0LVsxMHB4XSBsZWFkaW5nLXRpZ2h0IHNtOnRleHQteHNcIlxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBzZWxlY3RBbGxNYXRjaGluZ1RpY2tldHMoKTtcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xpbmtNb2RlU2VsZWN0aW9uQnV0dG9uc0Rpc2FibGVkIHx8IHRvdGFsIDwgMX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9TZWxlY3RBbGxcIiwgXCJTZWxlY2Npb25hciB0b2RvXCIpfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgbWluLXctMCBweC0xLjUgcHktMSB0ZXh0LVsxMHB4XSBsZWFkaW5nLXRpZ2h0IHNtOnRleHQteHNcIlxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbGVhclRpY2tldFNlbGVjdGlvbn1cclxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xpbmtNb2RlU2VsZWN0aW9uQnV0dG9uc0Rpc2FibGVkIHx8IHNlbGVjdGVkVGlja2V0Q291bnQgPCAxfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0NsZWFyQWxsXCIsIFwiQm9ycmFyIHNlbGVjY2lcdTAwRjNuXCIpfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAge2lzTGlua01vZGUgPyA8RXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeSByZXN1bHQ9e2xpbmtCdWxrUmVzdWx0fSAvPiA6IG51bGx9XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCJcclxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBzaG93TGlzdExvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XHJcbiAgICAgID5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIHNpemUtNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge2Vycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57ZXJyb3JNZXNzYWdlfTwvZGl2PiA6IG51bGx9XHJcblxyXG4gICAgICB7IXNob3dMaXN0TG9hZGluZyAmJiAhZXJyb3JNZXNzYWdlICYmIGl0ZW1zLmxlbmd0aCA9PT0gMCA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveCB0aW1lbGluZS1lbXB0eVwiIGRhdGEtZW1wdHktdGV4dD17aW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpfSAvPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHshZXJyb3JNZXNzYWdlICYmIGl0ZW1zLmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgPGRpdiByZWY9e3RpbWVsaW5lQ29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cclxuICAgICAgICAgIHtpdGVtcy5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQoaXRlbS5maWxlSWQpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRlUGFydHMgPSBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzKGl0ZW0udHJhbnNEYXRlLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gc2FmZVRleHQoaXRlbS5kZXNjcmlwdGlvbikgfHwgc2FmZVRleHQoaXRlbS5maWxlTmFtZSkgfHwgZmlsZUlkIHx8IFwiLVwiO1xyXG4gICAgICAgICAgICBjb25zdCBhbW91bnRUZXh0ID0gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGl0ZW0udG90YWxBbW91bnQgPz8gbnVsbCwgc2FmZVRleHQoaXRlbS5jdXJyZW5jeUNvZGUpKTtcclxuICAgICAgICAgICAgY29uc3Qgc3RhdHVzQ29kZSA9IGl0ZW0ua2luZCA9PT0gXCJnZW5lcmFsXCIgPyBpdGVtLnN0YXR1cyA6IG51bGw7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1c0xhYmVsID0gc3RhdHVzQ29kZSA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbChzdGF0dXNDb2RlKTtcclxuICAgICAgICAgICAgY29uc3QgaXNBc3NpZ25lZFRvRXhwZW5zZVNoZWV0ID0gc3RhdHVzQ29kZSA9PT0gMTtcclxuICAgICAgICAgICAgY29uc3Qgc2hvd1Byb2Nlc3NlZEJ5QWlJY29uID0gaXRlbS5wcm9jZXNzZWRCeUFJID09PSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGFibGVJbkxpbmtNb2RlID0gaXNMaW5rTW9kZSAmJiBjYW5TZWxlY3RUaWNrZXRGb3JMaW5rKGl0ZW0pO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkSW5MaW5rTW9kZSA9IGlzTGlua01vZGUgJiYgaXNMaW5rVGlja2V0U2VsZWN0ZWQoZmlsZUlkKTtcclxuICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkQnlBaUxhYmVsID0gaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdFRpY2tldExhYmVsID0gaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1NlbGVjdFRpY2tldFwiLCBcIlNlbGVjY2lvbmFyIHRpY2tldFwiKTtcclxuICAgICAgICAgICAgY29uc3QgZ2FzdG9UeXBlQ29kZSA9IGl0ZW0uZ2FzdG9UeXBlID09PSBudWxsID8gXCJcIiA6IFN0cmluZyhpdGVtLmdhc3RvVHlwZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGdhc3RvVHlwZUxhYmVsID0gZ2FzdG9UeXBlQ29kZVxyXG4gICAgICAgICAgICAgID8gZ2FzdG9UeXBlTGFiZWxNYXAuZ2V0KGdhc3RvVHlwZUNvZGUpIHx8IGdhc3RvVHlwZUNvZGVcclxuICAgICAgICAgICAgICA6IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBjYXJkU3VidGl0bGUgPSBnYXN0b1R5cGVMYWJlbDtcclxuICAgICAgICAgICAgY29uc3QgdGlja2V0Q2FyZEtleSA9XHJcbiAgICAgICAgICAgICAgZmlsZUlkIHx8XHJcbiAgICAgICAgICAgICAgYCR7c2FmZVRleHQoaXRlbS5maWxlTmFtZSl9LSR7c2FmZVRleHQoaXRlbS50cmFuc0RhdGUpfS0ke3NhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pfS0ke1N0cmluZyhpdGVtLnRvdGFsQW1vdW50ID8/IFwiXCIpfWA7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNMaW5rTW9kZSAmJiBpdGVtLmtpbmQgPT09IFwibGlua1wiKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbVxyXG4gICAgICAgICAgICAgICAgICBrZXk9e3RpY2tldENhcmRLZXl9XHJcbiAgICAgICAgICAgICAgICAgIGZpbGVJZD17ZmlsZUlkfVxyXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxyXG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZT17Y2FyZFN1YnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxyXG4gICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkPXtpc1NlbGVjdGVkSW5MaW5rTW9kZX1cclxuICAgICAgICAgICAgICAgICAgaXNTZWxlY3RhYmxlPXtpc1NlbGVjdGFibGVJbkxpbmtNb2RlfVxyXG4gICAgICAgICAgICAgICAgICBzZWxlY3Rpb25EaXNhYmxlZD17bGlua0Zsb3dCdXN5IHx8IGxpbmtTaGVldENoZWNrQnVzeSB8fCBsaW5rU2hlZXRMb2NrZWR9XHJcbiAgICAgICAgICAgICAgICAgIHNlbGVjdExhYmVsPXtzZWxlY3RUaWNrZXRMYWJlbH1cclxuICAgICAgICAgICAgICAgICAgb25PcGVuRGV0YWlsPXsoKSA9PiBvcGVuVGlja2V0RGV0YWlsKGZpbGVJZCl9XHJcbiAgICAgICAgICAgICAgICAgIG9uVG9nZ2xlU2VsZWN0PXsoKSA9PiB0b2dnbGVUaWNrZXRTZWxlY3Rpb24oaXRlbSl9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJhc2VTdGF0dXNJY29ucyA9IGlzQXNzaWduZWRUb0V4cGVuc2VTaGVldCB8fCBzaG93UHJvY2Vzc2VkQnlBaUljb24gPyAoXHJcbiAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIHtpc0Fzc2lnbmVkVG9FeHBlbnNlU2hlZXQgPyAoXHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImV4cGVuc2UtdGlja2V0LWNhcmRfX3N0YXR1cy1pY29uXCIgcm9sZT1cImltZ1wiIGFyaWEtbGFiZWw9e3N0YXR1c0xhYmVsfT5cclxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJzaXplLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk0xMy4xOSA4LjY4OGE0LjUgNC41IDAgMCAxIDEuMjQyIDcuMjQ0bC00LjUgNC41YTQuNSA0LjUgMCAwIDEtNi4zNjQtNi4zNjRsMS43NTctMS43NTdtMTMuMzUtLjYyMiAxLjc1Ny0xLjc1N2E0LjUgNC41IDAgMCAwLTYuMzY0LTYuMzY0bC00LjUgNC41YTQuNSA0LjUgMCAwIDAgMS4yNDIgNy4yNDRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICB7c2hvd1Byb2Nlc3NlZEJ5QWlJY29uID8gKFxyXG4gICAgICAgICAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImV4cGVuc2UtdGlja2V0LWNhcmRfX3N0YXR1cy1pY29uIGV4cGVuc2UtdGlja2V0LWNhcmRfX3N0YXR1cy1pY29uLS1haVwiXHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cImltZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17cHJvY2Vzc2VkQnlBaUxhYmVsfVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezEuNX0gc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPVwic2l6ZS00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNNCAxOGw0LTEybDQgMTJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNNiAxM2g0XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDZoNlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNyA2djEyXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDE4aDZcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgKSA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGtleT17dGlja2V0Q2FyZEtleX1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIlxyXG4gICAgICAgICAgICAgICAgZGF0YS10aWNrZXQtZmlsZS1pZD17ZmlsZUlkIHx8IHVuZGVmaW5lZH1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxyXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxyXG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZT17Y2FyZFN1YnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxyXG4gICAgICAgICAgICAgICAgICBvbk9wZW49eygpID0+IG9wZW5UaWNrZXREZXRhaWwoZmlsZUlkKX1cclxuICAgICAgICAgICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX190aXRsZSB0aW1lbGluZS1uYW1lXCJcclxuICAgICAgICAgICAgICAgICAgc3RhdHVzTGFiZWw9e3N0YXR1c0xhYmVsfVxyXG4gICAgICAgICAgICAgICAgICBzdGF0dXNJY29uPXtiYXNlU3RhdHVzSWNvbnN9XHJcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0ljb25DbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvbnNcIlxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxyXG4gICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsUGFnZXN9XHJcbiAgICAgICAgY3VycmVudFBhZ2U9e2N1cnJlbnRQYWdlfVxyXG4gICAgICAgIGxvYWRpbmc9e2lzTG9hZGluZ31cclxuICAgICAgICBvblBhZ2VDaGFuZ2U9eyhwYWdlKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBzbmFwc2hvdCA9IHJlc29sdmVBY3RpdmVGaWx0ZXJzKCk7XHJcbiAgICAgICAgICBpZiAoIWlzTGlua01vZGUgJiYgKCFzbmFwc2hvdD8uZnJvbURhdGUgfHwgIXNuYXBzaG90Py50b0RhdGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB2b2lkIGxvYWRMaXN0KHBhZ2UsIHNuYXBzaG90KTtcclxuICAgICAgICB9fVxyXG4gICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtpc0xpbmtNb2RlICYmIGNhblByb2Nlc3NMaW5rTW9kZSAmJiAhbGlua1NoZWV0Q2hlY2tCdXN5ICYmICFsaW5rU2hlZXRMb2NrZWQgPyAoXHJcbiAgICAgICAgPFBhZ2VCb3R0b21BY3Rpb25zIGFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0xpbmtCdXR0b25cIiwgXCJWaW5jdWxhciB0aWNrZXQocylcIil9PlxyXG4gICAgICAgICAgPFBhZ2VCb3R0b21BY3Rpb25CdXR0b25cclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9MaW5rQnV0dG9uXCIsIFwiVmluY3VsYXIgdGlja2V0KHMpXCIpfVxyXG4gICAgICAgICAgICBvbkNsaWNrPXtvcGVuTGlua0NvbmZpcm1Nb2RhbH1cclxuICAgICAgICAgICAgZGlzYWJsZWQ9e2xpbmtGbG93QnVzeSB8fCBzZWxlY3RBbGxCdXN5IHx8IHNlbGVjdGVkVGlja2V0Q291bnQgPCAxfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L1BhZ2VCb3R0b21BY3Rpb25zPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHtjYW5DcmVhdGVUaWNrZXQgJiYgIWlzTGlua01vZGUgPyAoXHJcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXHJcbiAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgclx1MDBFMXBpZGFzXCIpfVxyXG4gICAgICAgICAgc2l6ZT17NzZ9XHJcbiAgICAgICAgICByaWdodD17MTZ9XHJcbiAgICAgICAgICBib3R0b209ezI0fVxyXG4gICAgICAgICAgbWVudUFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0FjdGlvbnNcIiwgXCJBY2Npb25lcyByXHUwMEUxcGlkYXNcIil9XHJcbiAgICAgICAgICBtZW51SXRlbXM9e2ZhYk1lbnVJdGVtc31cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2UgdGlja2V0cyBsaXN0LlxyXG5jb25zdCBFeHBlbnNlVGlja2V0c1BhZ2UgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cclxuICAgICAgPEV4cGVuc2VUaWNrZXRzUGFnZUNvbnRlbnQgLz5cclxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XHJcbiAgKTtcclxufTtcclxuXHJcbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xyXG4gIGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoKCk7XHJcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBlbnNlLXRpY2tldHMtcm9vdFwiKTtcclxuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xyXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVRpY2tldHNQYWdlIC8+KTtcclxufTtcclxuXHJcbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldHNQYWdlO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IENoZWNrSWNvbiB9IGZyb20gXCJAaGVyb2ljb25zL3JlYWN0LzI0L291dGxpbmVcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlRGF0ZVBhcnRzIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlVGltZWxpbmVDYXJkIGZyb20gXCIuL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4XCI7XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtUHJvcHMgPSB7XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgZGF0ZVBhcnRzOiBFeHBlbnNlRGF0ZVBhcnRzO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgc3VidGl0bGU6IHN0cmluZztcclxuICBhbW91bnRUZXh0OiBzdHJpbmc7XHJcbiAgaXNTZWxlY3RlZDogYm9vbGVhbjtcclxuICBpc1NlbGVjdGFibGU6IGJvb2xlYW47XHJcbiAgc2VsZWN0aW9uRGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgc2VsZWN0TGFiZWw6IHN0cmluZztcclxuICBvbk9wZW5EZXRhaWw6ICgpID0+IHZvaWQ7XHJcbiAgb25Ub2dnbGVTZWxlY3Q6ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBMaW5rLW1vZGUgdGlja2V0IGNhcmQ6IGNlbnRlciBvcGVucyB0aGUgcmVhZC1vbmx5IGRldGFpbCBhbmQgdGhlIHJpZ2h0IHJhaWwgdG9nZ2xlcyBzZWxlY3Rpb24uXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtID0gKHtcclxuICBmaWxlSWQsXHJcbiAgZGF0ZVBhcnRzLFxyXG4gIHRpdGxlLFxyXG4gIHN1YnRpdGxlLFxyXG4gIGFtb3VudFRleHQsXHJcbiAgaXNTZWxlY3RlZCxcclxuICBpc1NlbGVjdGFibGUsXHJcbiAgc2VsZWN0aW9uRGlzYWJsZWQsXHJcbiAgc2VsZWN0TGFiZWwsXHJcbiAgb25PcGVuRGV0YWlsLFxyXG4gIG9uVG9nZ2xlU2VsZWN0LFxyXG59OiBFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbVByb3BzKSA9PiB7XHJcbiAgY29uc3QgY2FuVG9nZ2xlU2VsZWN0aW9uID0gaXNTZWxlY3RhYmxlICYmICFzZWxlY3Rpb25EaXNhYmxlZDtcclxuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkRldGFpbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIG9uT3BlbkRldGFpbCgpO1xyXG4gIH0sIFtvbk9wZW5EZXRhaWxdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVG9nZ2xlU2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFjYW5Ub2dnbGVTZWxlY3Rpb24pIHJldHVybjtcclxuICAgIG9uVG9nZ2xlU2VsZWN0KCk7XHJcbiAgfSwgW2NhblRvZ2dsZVNlbGVjdGlvbiwgb25Ub2dnbGVTZWxlY3RdKTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0aW9uSW5kaWNhdG9yVG9uZUNsYXNzTmFtZSA9IGlzU2VsZWN0ZWRcclxuICAgID8gXCJib3JkZXItcHJpbWFyeSBiZy1wcmltYXJ5IHRleHQtd2hpdGUgc2hhZG93LXNtXCJcclxuICAgIDogY2FuVG9nZ2xlU2VsZWN0aW9uXHJcbiAgICAgID8gXCJib3JkZXItc2xhdGUtMzAwIGJnLXdoaXRlIHRleHQtdHJhbnNwYXJlbnQgZ3JvdXAtaG92ZXI6Ym9yZGVyLXByaW1hcnkgZ3JvdXAtaG92ZXI6YmctcHJpbWFyeS81XCJcclxuICAgICAgOiBcImJvcmRlci1zbGF0ZS0yMDAgYmctc2xhdGUtMTAwIHRleHQtdHJhbnNwYXJlbnRcIjtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgY2xhc3NOYW1lPXtpc1NlbGVjdGVkID8gXCJ0aW1lbGluZS1pdGVtIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIHJpbmctMiByaW5nLXByaW1hcnkvMzBcIiA6IFwidGltZWxpbmUtaXRlbVwifVxyXG4gICAgICBkYXRhLXRpY2tldC1maWxlLWlkPXtmaWxlSWQgfHwgdW5kZWZpbmVkfVxyXG4gICAgICBkYXRhLXRpY2tldC1zZWxlY3RlZD17aXNTZWxlY3RlZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwifVxyXG4gICAgICBkYXRhLXRpY2tldC1zZWxlY3RhYmxlPXtjYW5Ub2dnbGVTZWxlY3Rpb24gPyBcInRydWVcIiA6IFwiZmFsc2VcIn1cclxuICAgID5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxyXG4gICAgICAgIDxFeHBlbnNlVGltZWxpbmVDYXJkXHJcbiAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cclxuICAgICAgICAgIHRpdGxlPXt0aXRsZX1cclxuICAgICAgICAgIHN1YnRpdGxlPXtzdWJ0aXRsZX1cclxuICAgICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XHJcbiAgICAgICAgICBvbk9wZW49e2hhbmRsZU9wZW5EZXRhaWx9XHJcbiAgICAgICAgICB0aXRsZUNsYXNzTmFtZT1cImV4cGVuc2UtdGlja2V0LWNhcmRfX3RpdGxlIHRpbWVsaW5lLW5hbWVcIlxyXG4gICAgICAgICAgaW50ZXJhY3Rpb25Qcm9wcz17e1xyXG4gICAgICAgICAgICBcImFyaWEtbGFiZWxcIjogdGl0bGUsXHJcbiAgICAgICAgICAgIG9uQ29udGV4dE1lbnU6IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgIC8+XHJcblxyXG4gICAgICAgIDxidXR0b25cclxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgYXJpYS1sYWJlbD17c2VsZWN0TGFiZWx9XHJcbiAgICAgICAgICBhcmlhLXByZXNzZWQ9e2lzU2VsZWN0ZWR9XHJcbiAgICAgICAgICB0aXRsZT17c2VsZWN0TGFiZWx9XHJcbiAgICAgICAgICBkaXNhYmxlZD17IWNhblRvZ2dsZVNlbGVjdGlvbn1cclxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVRvZ2dsZVNlbGVjdGlvbn1cclxuICAgICAgICAgIGNsYXNzTmFtZT1cImdyb3VwIGFic29sdXRlIGluc2V0LXktMCByaWdodC0wIHotMTAgZmxleCB3LVs0LjI1cmVtXSBpdGVtcy1zdGFydCBqdXN0aWZ5LWVuZCByb3VuZGVkLXItW3ZhcigtLXJhZGl1cy14bCldIGJnLXRyYW5zcGFyZW50IHAtMS41IHRyYW5zaXRpb24gZm9jdXMtdmlzaWJsZTpvdXRsaW5lLW5vbmUgZm9jdXMtdmlzaWJsZTpyaW5nLTIgZm9jdXMtdmlzaWJsZTpyaW5nLXByaW1hcnkvMzUgZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkIHNtOnctWzQuNzVyZW1dXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGgtWzMwcHhdIHctWzMwcHhdIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgdHJhbnNpdGlvbiAke3NlbGVjdGlvbkluZGljYXRvclRvbmVDbGFzc05hbWV9YH1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPENoZWNrSWNvbiBjbGFzc05hbWU9XCJoLVsyMHB4XSB3LVsyMHB4XVwiIHN0cm9rZVdpZHRoPXsyLjN9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeVByb3BzID0ge1xyXG4gIHJlc3VsdDogRXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXN1bHREdG8gfCBudWxsO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0TGlua0lzc3VlTGlzdFByb3BzID0ge1xyXG4gIGl0ZW1zOiBBcnJheTx7IHRpY2tldElkOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nIH0+O1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgdG9uZUNsYXNzTmFtZTogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyBvbmUgc2tpcHBlZCBvciBmYWlsZWQgdGlja2V0IGxpc3Qgd2l0aCBzdGFibGUga2V5cy5cclxuY29uc3QgRXhwZW5zZVRpY2tldExpbmtJc3N1ZUxpc3QgPSAoeyBpdGVtcywgdGl0bGUsIHRvbmVDbGFzc05hbWUgfTogRXhwZW5zZVRpY2tldExpbmtJc3N1ZUxpc3RQcm9wcykgPT4ge1xyXG4gIGlmIChpdGVtcy5sZW5ndGggPCAxKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIHAtMyAke3RvbmVDbGFzc05hbWV9YH0+XHJcbiAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1zZW1pYm9sZFwiPnt0aXRsZX08L3A+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMiBzcGFjZS15LTJcIj5cclxuICAgICAgICB7aXRlbXMubWFwKChpdGVtKSA9PiAoXHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGtleT17YCR7aXRlbS50aWNrZXRJZCB8fCBcInVua25vd25cIn0tJHtpdGVtLnJlYXNvbiB8fCBcIm5vLXJlYXNvblwifWB9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItY3VycmVudC8xNSBiZy13aGl0ZS84MCBwLTIgdGV4dC14c1wiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGRcIj57aW5kVChcIlRpY2tldHNfRmlsdGVyX0ZpbHRlcktleVwiLCBcIlRpY2tldFwiKX06PC9zcGFuPntcIiBcIn1cclxuICAgICAgICAgICAgICA8c3Bhbj57aXRlbS50aWNrZXRJZCB8fCBcIi1cIn08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMVwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdFJlYXNvblwiLCBcIk1vdGl2b1wiKX06PC9zcGFuPntcIiBcIn1cclxuICAgICAgICAgICAgICA8c3Bhbj57aXRlbS5yZWFzb24gfHwgXCItXCJ9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gU2hvd3MgdGhlIGJhY2tlbmQgYnVsay1saW5rIHJlc3VsdCBzdW1tYXJ5LCBpbmNsdWRpbmcgcGFydGlhbCBza2lwcGVkIGFuZCBmYWlsZWQgcmVhc29ucy5cclxuY29uc3QgRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeSA9ICh7IHJlc3VsdCB9OiBFeHBlbnNlVGlja2V0TGlua0J1bGtTdW1tYXJ5UHJvcHMpID0+IHtcclxuICBpZiAoIXJlc3VsdCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IHN1bW1hcnlSb3dzID0gW1xyXG4gICAge1xyXG4gICAgICBrZXk6IFwicmVxdWVzdGVkXCIsXHJcbiAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0UmVxdWVzdGVkXCIsIFwiU29saWNpdGFkb3NcIiksXHJcbiAgICAgIHZhbHVlOiByZXN1bHQucmVxdWVzdGVkQ291bnQsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBrZXk6IFwibGlua2VkXCIsXHJcbiAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0TGlua2VkXCIsIFwiVmluY3VsYWRvc1wiKSxcclxuICAgICAgdmFsdWU6IHJlc3VsdC5saW5rZWRDb3VudCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGtleTogXCJza2lwcGVkXCIsXHJcbiAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0U2tpcHBlZFwiLCBcIk9taXRpZG9zXCIpLFxyXG4gICAgICB2YWx1ZTogcmVzdWx0LnNraXBwZWRDb3VudCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGtleTogXCJmYWlsZWRcIixcclxuICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRGYWlsZWRcIiwgXCJGYWxsaWRvc1wiKSxcclxuICAgICAgdmFsdWU6IHJlc3VsdC5mYWlsZWRDb3VudCxcclxuICAgIH0sXHJcbiAgXTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgc3BhY2UteS0zIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlLzk1IHAtM1wiPlxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTkwMFwiPlxyXG4gICAgICAgICAge2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRUaXRsZVwiLCBcIlJlc3VsdGFkbyBkZSB2aW5jdWxhY2lcdTAwRjNuXCIpfVxyXG4gICAgICAgIDwvcD5cclxuICAgICAgICB7cmVzdWx0LmV4cGVuc2VTaGVldElkID8gKFxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXhzIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU2hlZXRcIiwgXCJFeHBlbnNlIHNoZWV0XCIpfToge3Jlc3VsdC5leHBlbnNlU2hlZXRJZH1cclxuICAgICAgICAgIDwvcD5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgc206Z3JpZC1jb2xzLTRcIj5cclxuICAgICAgICB7c3VtbWFyeVJvd3MubWFwKChpdGVtKSA9PiAoXHJcbiAgICAgICAgICA8ZGl2IGtleT17aXRlbS5rZXl9IGNsYXNzTmFtZT1cInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXNsYXRlLTUwIHB4LTMgcHktMiB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIHVwcGVyY2FzZSB0cmFja2luZy1bMC4xNGVtXSB0ZXh0LXNsYXRlLTUwMFwiPntpdGVtLmxhYmVsfTwvcD5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXhsIGZvbnQtc2VtaWJvbGQgdGV4dC1wcmltYXJ5XCI+e2l0ZW0udmFsdWV9PC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSl9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGdhcC0zIGxnOmdyaWQtY29scy0yXCI+XHJcbiAgICAgICAgPEV4cGVuc2VUaWNrZXRMaW5rSXNzdWVMaXN0XHJcbiAgICAgICAgICB0aXRsZT17aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdFNraXBwZWRcIiwgXCJPbWl0aWRvc1wiKX1cclxuICAgICAgICAgIGl0ZW1zPXtBcnJheS5pc0FycmF5KHJlc3VsdC5za2lwcGVkKSA/IHJlc3VsdC5za2lwcGVkIDogW119XHJcbiAgICAgICAgICB0b25lQ2xhc3NOYW1lPVwiYm9yZGVyLWFtYmVyLTIwMCBiZy1hbWJlci01MCB0ZXh0LWFtYmVyLTkwMFwiXHJcbiAgICAgICAgLz5cclxuICAgICAgICA8RXhwZW5zZVRpY2tldExpbmtJc3N1ZUxpc3RcclxuICAgICAgICAgIHRpdGxlPXtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0RmFpbGVkXCIsIFwiRmFsbGlkb3NcIil9XHJcbiAgICAgICAgICBpdGVtcz17QXJyYXkuaXNBcnJheShyZXN1bHQuZmFpbGVkKSA/IHJlc3VsdC5mYWlsZWQgOiBbXX1cclxuICAgICAgICAgIHRvbmVDbGFzc05hbWU9XCJib3JkZXItcm9zZS0yMDAgYmctcm9zZS01MCB0ZXh0LXJvc2UtOTAwXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0TGlua0J1bGtTdW1tYXJ5O1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCB0eXBlIHsgQXV0aE1hbmFnZWRVc2VyIH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgSGlzdG9yeVN1bW1hcnkgZnJvbSBcIi4uLy4uL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlTdW1tYXJ5LnRzeFwiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGdldEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJPcHRpb25zLFxyXG4gIG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlLFxyXG4gIHR5cGUgRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUsXHJcbn0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlVGlja2V0U3RhdHVzQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0UHJvY2Vzc2VkQnlJYUZpbHRlciwgRXhwZW5zZVRpY2tldFF1aWNrRmlsdGVySWQgfSBmcm9tIFwiLi4vdGlja2V0cy9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZURhdGVSYW5nZUZpbHRlciBmcm9tIFwiLi9FeHBlbnNlRGF0ZVJhbmdlRmlsdGVyLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZUZpbHRlckFjdGlvbnMgZnJvbSBcIi4vRXhwZW5zZUZpbHRlckFjdGlvbnMudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlUXVpY2tEYXRlRmlsdGVycyBmcm9tIFwiLi9FeHBlbnNlUXVpY2tEYXRlRmlsdGVycy50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dCBmcm9tIFwiLi9FeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQudHN4XCI7XHJcblxyXG5jb25zdCBwYXJzZUlzb0RhdGUgPSAocmF3OiBzdHJpbmcpOiBEYXRlIHwgbnVsbCA9PiB7XHJcbiAgaWYgKCFyYXcpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKHJhdykudHJpbSgpLnNwbGl0KFwiVFwiKVswXTtcclxuICBpZiAoIS9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KHZhbHVlKSkgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gdmFsdWUuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xyXG4gIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXREYXRlID0gKHJhdzogc3RyaW5nLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgZGF0ZSA9IHBhcnNlSXNvRGF0ZShyYXcpO1xyXG4gIGlmICghZGF0ZSkgcmV0dXJuIFwiLS1cIjtcclxuICByZXR1cm4gZGF0ZVxyXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHtcclxuICAgICAgZGF5OiBcIm51bWVyaWNcIixcclxuICAgICAgbW9udGg6IFwic2hvcnRcIixcclxuICAgICAgeWVhcjogXCJudW1lcmljXCIsXHJcbiAgICB9KVxyXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxyXG4gICAgLnRvTG93ZXJDYXNlKCk7XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsUHJvcHMgPSB7XHJcbiAgbW9kZTogXCJnZW5lcmFsXCIgfCBcImxpbmtcIjtcclxuICB2aXNpYmxlOiBib29sZWFuO1xyXG4gIHNob3dNYW51YWxEYXRlRmlsdGVyOiBib29sZWFuO1xyXG4gIG1hbnVhbERhdGVBdXRvT3BlbktleTogbnVtYmVyO1xyXG4gIGZyb21EYXRlOiBzdHJpbmc7XHJcbiAgdG9EYXRlOiBzdHJpbmc7XHJcbiAgZmlsdGVyS2V5OiBzdHJpbmc7XHJcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgbWFuYWdlZFVzZXJJZDogc3RyaW5nO1xyXG4gIG1hbmFnZWRVc2VyczogQXV0aE1hbmFnZWRVc2VyW107XHJcbiAgc2hvd01hbmFnZWRVc2VyRmlsdGVyOiBib29sZWFuO1xyXG4gIHN0YXR1c0ZpbHRlcjogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGU7XHJcbiAgZ2FzdG9UeXBlRmlsdGVyOiBcIlwiIHwgRXhwZW5zZUdhc3RvVHlwZUNvZGU7XHJcbiAgcHJvY2Vzc2VkQnlJYUZpbHRlcjogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXI7XHJcbiAgYWN0aXZlUXVpY2tGaWx0ZXI6IEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkIHwgbnVsbDtcclxuICBzaG93TWFudWFsRGF0ZUVycm9yOiBib29sZWFuO1xyXG4gIHN0YXR1c0ZpbHRlclJlYWRPbmx5PzogYm9vbGVhbjtcclxuICBmaXhlZFN0YXR1c0ZpbHRlcj86IDAgfCAxIHwgbnVsbDtcclxuICBnYXN0b1R5cGVPcHRpb25zOiBFeHBlbnNlU2VsZWN0T3B0aW9uW107XHJcbiAgb25EYXRlUmFuZ2VDaGFuZ2U6IChmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbk1hbnVhbFJhbmdlQ29tcGxldGU6IChmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvblF1aWNrRmlsdGVyQ2hhbmdlOiAoZmlsdGVySWQ6IEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkKSA9PiB2b2lkO1xyXG4gIG9uRmlsdGVyS2V5Q2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25NYW5hZ2VkVXNlcklkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvblN0YXR1c0ZpbHRlckNoYW5nZTogKHZhbHVlOiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSkgPT4gdm9pZDtcclxuICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZTogKHZhbHVlOiBcIlwiIHwgRXhwZW5zZUdhc3RvVHlwZUNvZGUpID0+IHZvaWQ7XHJcbiAgb25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlOiAodmFsdWU6IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyKSA9PiB2b2lkO1xyXG4gIG9uQ2xlYXI6ICgpID0+IHZvaWQ7XHJcbiAgb25BcHBseTogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIFNoYXJlZCB0aWNrZXRzIGZpbHRlciBwYW5lbCB3aXRoIGdsb2JhbCBxdWljayBkYXRlIGZpbHRlcnMgYW5kIGZpeGVkIHRpY2tldCBmaWx0ZXJzLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbCA9ICh7XHJcbiAgbW9kZSxcclxuICB2aXNpYmxlLFxyXG4gIHNob3dNYW51YWxEYXRlRmlsdGVyLFxyXG4gIG1hbnVhbERhdGVBdXRvT3BlbktleSxcclxuICBmcm9tRGF0ZSxcclxuICB0b0RhdGUsXHJcbiAgZmlsdGVyS2V5LFxyXG4gIGN1cnJlbmN5Q29kZSxcclxuICBtYW5hZ2VkVXNlcklkLFxyXG4gIG1hbmFnZWRVc2VycyxcclxuICBzaG93TWFuYWdlZFVzZXJGaWx0ZXIsXHJcbiAgc3RhdHVzRmlsdGVyLFxyXG4gIGdhc3RvVHlwZUZpbHRlcixcclxuICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxyXG4gIGFjdGl2ZVF1aWNrRmlsdGVyLFxyXG4gIHNob3dNYW51YWxEYXRlRXJyb3IsXHJcbiAgc3RhdHVzRmlsdGVyUmVhZE9ubHkgPSBmYWxzZSxcclxuICBmaXhlZFN0YXR1c0ZpbHRlciA9IG51bGwsXHJcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcclxuICBvbkRhdGVSYW5nZUNoYW5nZSxcclxuICBvbk1hbnVhbFJhbmdlQ29tcGxldGUsXHJcbiAgb25RdWlja0ZpbHRlckNoYW5nZSxcclxuICBvbkZpbHRlcktleUNoYW5nZSxcclxuICBvbkN1cnJlbmN5Q29kZUNoYW5nZSxcclxuICBvbk1hbmFnZWRVc2VySWRDaGFuZ2UsXHJcbiAgb25TdGF0dXNGaWx0ZXJDaGFuZ2UsXHJcbiAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2UsXHJcbiAgb25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlLFxyXG4gIG9uQ2xlYXIsXHJcbiAgb25BcHBseSxcclxufTogRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWxQcm9wcykgPT4ge1xyXG4gIGNvbnN0IHN0YXR1c09wdGlvbnMgPSB1c2VNZW1vKCgpID0+IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJPcHRpb25zKCksIFtdKTtcclxuXHJcbiAgY29uc3QgY2F0ZWdvcnlPcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KCgpID0+IHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHsgdmFsdWU6IFwiXCIsIHRleHQ6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9BbGxcIiwgXCJBbGxcIikgfSxcclxuICAgICAgLi4uZ2FzdG9UeXBlT3B0aW9ucyxcclxuICAgIF07XHJcbiAgfSwgW2dhc3RvVHlwZU9wdGlvbnNdKTtcclxuXHJcbiAgaWYgKCF2aXNpYmxlKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBsb2NhbGUgPSBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIjtcclxuICBjb25zdCBzaG93SW5saW5lRGF0ZVN1bW1hcnkgPSAhc2hvd01hbnVhbERhdGVGaWx0ZXIgJiYgISFmcm9tRGF0ZSAmJiAhIXRvRGF0ZTtcclxuICBjb25zdCBzaG93U3RhdHVzRmlsdGVyID0gbW9kZSA9PT0gXCJnZW5lcmFsXCI7XHJcbiAgY29uc3QgZGVza3RvcENvbHVtbnNDbGFzc05hbWUgPSBzaG93TWFuYWdlZFVzZXJGaWx0ZXJcclxuICAgID8gKHNob3dTdGF0dXNGaWx0ZXIgPyBcImxnOmdyaWQtY29scy02XCIgOiBcImxnOmdyaWQtY29scy01XCIpXHJcbiAgICA6IChzaG93U3RhdHVzRmlsdGVyID8gXCJsZzpncmlkLWNvbHMtNVwiIDogXCJsZzpncmlkLWNvbHMtNFwiKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLWV4cGFuZGVkIHAtMiBzbTpwLTIuNSByZWxhdGl2ZVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN0YWNrIGZsZXggZmxleC1jb2wgc3BhY2UteS0yXCI+XHJcbiAgICAgICAgPEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJzIGFjdGl2ZVF1aWNrRmlsdGVyPXthY3RpdmVRdWlja0ZpbHRlcn0gb25RdWlja0ZpbHRlckNoYW5nZT17b25RdWlja0ZpbHRlckNoYW5nZX0gLz5cclxuXHJcbiAgICAgICAge3Nob3dNYW51YWxEYXRlRmlsdGVyID8gKFxyXG4gICAgICAgICAgPEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXJcclxuICAgICAgICAgICAgZnJvbURhdGU9e2Zyb21EYXRlfVxyXG4gICAgICAgICAgICB0b0RhdGU9e3RvRGF0ZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRGF0ZVJhbmdlQ2hhbmdlfVxyXG4gICAgICAgICAgICBvblJhbmdlQ29tcGxldGU9e29uTWFudWFsUmFuZ2VDb21wbGV0ZX1cclxuICAgICAgICAgICAgYXV0b09wZW5SZXF1ZXN0SWQ9e21hbnVhbERhdGVBdXRvT3BlbktleX1cclxuICAgICAgICAgICAgc2hvd01hbnVhbEVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yfVxyXG4gICAgICAgICAgICBzaG93U3RhcnRFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvciAmJiAhZnJvbURhdGV9XHJcbiAgICAgICAgICAgIHNob3dFbmRFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvciAmJiAhdG9EYXRlfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApIDogc2hvd0lubGluZURhdGVTdW1tYXJ5ID8gKFxyXG4gICAgICAgICAgPEhpc3RvcnlTdW1tYXJ5XHJcbiAgICAgICAgICAgIHN1bW1hcnlGcm9tTGFiZWw9e2luZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpfVxyXG4gICAgICAgICAgICBzdW1tYXJ5VG9MYWJlbD17aW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKX1cclxuICAgICAgICAgICAgZnJvbVZhbHVlPXtmb3JtYXREYXRlKGZyb21EYXRlLCBsb2NhbGUpfVxyXG4gICAgICAgICAgICB0b1ZhbHVlPXtmb3JtYXREYXRlKHRvRGF0ZSwgbG9jYWxlKX1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ2FwLXktMSB0ZXh0LVsxMXB4XSBweC0xXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiAke2Rlc2t0b3BDb2x1bW5zQ2xhc3NOYW1lfSBnYXAtMmB9PlxyXG4gICAgICAgICAgPEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX0ZpbHRlcktleVwiLCBcIlRpY2tldFwiKX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9GaWx0ZXJLZXlcIiwgXCJUaWNrZXRcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtmaWx0ZXJLZXl9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkZpbHRlcktleUNoYW5nZX1cclxuICAgICAgICAgICAgbW9kZT17bW9kZX1cclxuICAgICAgICAgICAgY3JlYXRlZERhdGVGcm9tPXtmcm9tRGF0ZX1cclxuICAgICAgICAgICAgY3JlYXRlZERhdGVUbz17dG9EYXRlfVxyXG4gICAgICAgICAgICBlbmFibGVSZW1vdGVTdWdnZXN0aW9uc1xyXG4gICAgICAgICAgICBmaXhlZFN0YXR1c0ZpbHRlcj17bW9kZSA9PT0gXCJnZW5lcmFsXCIgPyBmaXhlZFN0YXR1c0ZpbHRlciA6IG51bGx9XHJcbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgIDxFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtjdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkN1cnJlbmN5Q29kZUNoYW5nZX1cclxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cclxuICAgICAgICAgICAgc2hvd0xvYWRpbmdTdGF0ZVRleHQ9e2ZhbHNlfVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICB7c2hvd01hbmFnZWRVc2VyRmlsdGVyID8gKFxyXG4gICAgICAgICAgICA8RXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0XHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJDb21tb25fVXNlclwiLCBcIlVzZXJcIil9XHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJDb21tb25fVXNlclwiLCBcIlVzZXJcIil9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e21hbmFnZWRVc2VySWR9XHJcbiAgICAgICAgICAgICAgdXNlcnM9e21hbmFnZWRVc2Vyc31cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25NYW5hZ2VkVXNlcklkQ2hhbmdlfVxyXG4gICAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICB7c2hvd1N0YXR1c0ZpbHRlciA/IChcclxuICAgICAgICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XHJcbiAgICAgICAgICAgICAgb3B0aW9ucz17c3RhdHVzT3B0aW9uc31cclxuICAgICAgICAgICAgICB2YWx1ZT17c3RhdHVzRmlsdGVyfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiBvblN0YXR1c0ZpbHRlckNoYW5nZShub3JtYWxpemVFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZShuZXh0VmFsdWUsIFwiXCIpKX1cclxuICAgICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e3N0YXR1c0ZpbHRlclJlYWRPbmx5fVxyXG4gICAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtdGlja2V0LXN0YXR1cy1maWx0ZXJcIlxyXG4gICAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIil9XHJcbiAgICAgICAgICAgIG9wdGlvbnM9e2NhdGVnb3J5T3B0aW9uc31cclxuICAgICAgICAgICAgdmFsdWU9e2dhc3RvVHlwZUZpbHRlcn1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBOdW1iZXIobmV4dFZhbHVlKTtcclxuICAgICAgICAgICAgICBpZiAobmV4dFZhbHVlID09PSBcIlwiIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkpIHtcclxuICAgICAgICAgICAgICAgIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZShwYXJzZWQgYXMgRXhwZW5zZUdhc3RvVHlwZUNvZGUpO1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XHJcbiAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtdGlja2V0LWdhc3RvdHlwZS1maWx0ZXJcIlxyXG4gICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgIDxFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIil9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQVwiLCBcIlByb2Nlc3NlZCBieSBJQVwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e3Byb2Nlc3NlZEJ5SWFGaWx0ZXJ9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvblByb2Nlc3NlZEJ5SWFGaWx0ZXJDaGFuZ2V9XHJcbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8RXhwZW5zZUZpbHRlckFjdGlvbnNcclxuICAgICAgICAgIGNsZWFyTGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGVhclwiLCBcIkNsZWFyXCIpfVxyXG4gICAgICAgICAgYXBwbHlMYWJlbD17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0FwcGx5XCIsIFwiQXBwbHlcIil9XHJcbiAgICAgICAgICBvbkNsZWFyPXtvbkNsZWFyfVxyXG4gICAgICAgICAgb25BcHBseT17b25BcHBseX1cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbDtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIgfSBmcm9tIFwiLi4vdGlja2V0cy9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0UHJvcHMgPSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG4gIHZhbHVlOiBFeHBlbnNlVGlja2V0UHJvY2Vzc2VkQnlJYUZpbHRlcjtcclxuICBvbkNoYW5nZTogKHZhbHVlOiBFeHBlbnNlVGlja2V0UHJvY2Vzc2VkQnlJYUZpbHRlcikgPT4gdm9pZDtcclxuICByZWFkT25seT86IGJvb2xlYW47XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIHNob3dMYWJlbD86IGJvb2xlYW47XHJcbn07XHJcblxyXG4vLyBGaXhlZCBlbnVtIHNlbGVjdCBmb3IgSUEgcHJvY2Vzc2luZyBmaWx0ZXIgd2l0aCBBbGwvWWVzL05vIG9wdGlvbnMuXHJcbmNvbnN0IEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0ID0gKHtcclxuICBsYWJlbCxcclxuICBwbGFjZWhvbGRlcixcclxuICB2YWx1ZSxcclxuICBvbkNoYW5nZSxcclxuICByZWFkT25seSA9IGZhbHNlLFxyXG4gIGRpc2FibGVkID0gZmFsc2UsXHJcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcclxufTogRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3RQcm9wcykgPT4ge1xyXG4gIGNvbnN0IHVpVmFsdWUgPSB2YWx1ZSA9PT0gXCJhbGxcIiA/IFwiXCIgOiB2YWx1ZTtcclxuICBjb25zdCBvcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFxyXG4gICAgKCkgPT4gW1xyXG4gICAgICB7IHZhbHVlOiBcImFsbFwiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfQWxsXCIsIFwiQWxsXCIpIH0sXHJcbiAgICAgIHsgdmFsdWU6IFwieWVzXCIsIHRleHQ6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBX1llc1wiLCBcIlllc1wiKSB9LFxyXG4gICAgICB7IHZhbHVlOiBcIm5vXCIsIHRleHQ6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBX05vXCIsIFwiTm9cIikgfSxcclxuICAgIF0sXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgbGFiZWw9e2xhYmVsfVxyXG4gICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XHJcbiAgICAgIG9wdGlvbnM9e29wdGlvbnN9XHJcbiAgICAgIHZhbHVlPXt1aVZhbHVlfVxyXG4gICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmIChuZXh0VmFsdWUgPT09IFwieWVzXCIgfHwgbmV4dFZhbHVlID09PSBcIm5vXCIgfHwgbmV4dFZhbHVlID09PSBcImFsbFwiKSB7XHJcbiAgICAgICAgICBvbkNoYW5nZShuZXh0VmFsdWUpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvbkNoYW5nZShcImFsbFwiKTtcclxuICAgICAgfX1cclxuICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxyXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgIGlkQmFzZT1cImV4cGVuc2UtcHJvY2Vzc2VkLWJ5LWlhLWZpbHRlclwiXHJcbiAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxyXG4gICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cclxuICAgIC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0O1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBSZW1vdGVTZWFyY2hDb21ib2JveCwgeyB0eXBlIFJlbW90ZVNlYXJjaE9wdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUmVtb3RlU2VhcmNoQ29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3QsIGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXRQcm9wcyA9IHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgbW9kZT86IFwiZ2VuZXJhbFwiIHwgXCJsaW5rXCI7XHJcbiAgY3JlYXRlZERhdGVGcm9tPzogc3RyaW5nO1xyXG4gIGNyZWF0ZWREYXRlVG8/OiBzdHJpbmc7XHJcbiAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xyXG4gIGZpeGVkU3RhdHVzRmlsdGVyPzogMCB8IDEgfCBudWxsO1xyXG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcclxufTtcclxuXHJcbmNvbnN0IFNFQVJDSF9QQUdFX1NJWkUgPSAzMDtcclxuXHJcbi8vIEJ1aWxkcyBtaW5pbWFsIHBheWxvYWQgZm9yIHRpY2tldCBrZXkgc3VnZ2VzdGlvbnMgd2l0aG91dCBkYXRlIGZpbHRlcnMuXHJcbmNvbnN0IGJ1aWxkVGlja2V0U3VnZ2VzdFBheWxvYWQgPSAoXHJcbiAgdGVybTogc3RyaW5nLFxyXG4gIHBhZ2U6IG51bWJlcixcclxuICBwYWdlU2l6ZTogbnVtYmVyLFxyXG4gIGZpeGVkU3RhdHVzRmlsdGVyOiAwIHwgMSB8IG51bGwsXHJcbiAgY3JlYXRlZERhdGVGcm9tOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgY3JlYXRlZERhdGVUbzogc3RyaW5nIHwgdW5kZWZpbmVkXHJcbik6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0IHwgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RSZXF1ZXN0ID0+IHtcclxuICBjb25zdCBzYWZlVGVybSA9IFN0cmluZyh0ZXJtIHx8IFwiXCIpLnRyaW0oKTtcclxuICBjb25zdCBiYXNlUGF5bG9hZCA9IHtcclxuICAgIHBhZ2U6IE51bWJlci5pc0Zpbml0ZShwYWdlKSAmJiBwYWdlID4gMCA/IE1hdGguZmxvb3IocGFnZSkgOiAxLFxyXG4gICAgcGFnZVNpemU6IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gTWF0aC5mbG9vcihwYWdlU2l6ZSkgOiBTRUFSQ0hfUEFHRV9TSVpFLFxyXG4gICAgY3JlYXRlZERhdGVGcm9tOiBjcmVhdGVkRGF0ZUZyb20gfHwgdW5kZWZpbmVkLFxyXG4gICAgY3JlYXRlZERhdGVUbzogY3JlYXRlZERhdGVUbyB8fCB1bmRlZmluZWQsXHJcbiAgICBzZWFyY2hLZXk6IHNhZmVUZXJtIHx8IHVuZGVmaW5lZCxcclxuICAgIGZpbHRlcjogc2FmZVRlcm0gfHwgdW5kZWZpbmVkLFxyXG4gIH07XHJcblxyXG4gIGlmIChmaXhlZFN0YXR1c0ZpbHRlciA9PT0gMCB8fCBmaXhlZFN0YXR1c0ZpbHRlciA9PT0gMSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4uYmFzZVBheWxvYWQsXHJcbiAgICAgIHN0YXR1czogZml4ZWRTdGF0dXNGaWx0ZXIsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGJhc2VQYXlsb2FkO1xyXG59O1xyXG5cclxuY29uc3QgbWFwVGlja2V0T3B0aW9ucyA9IChcclxuICBpdGVtczogQXJyYXk8RXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8gfCBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdEl0ZW1EdG8+IHwgdW5kZWZpbmVkXHJcbik6IFJlbW90ZVNlYXJjaE9wdGlvbltdID0+IHtcclxuICByZXR1cm4gKEFycmF5LmlzQXJyYXkoaXRlbXMpID8gaXRlbXMgOiBbXSlcclxuICAgIC5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgY29uc3QgZmlsZUlkID0gU3RyaW5nKGl0ZW0/LkZpbGVJZCB8fCBcIlwiKS50cmltKCk7XHJcbiAgICAgIGlmICghZmlsZUlkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gU3RyaW5nKGl0ZW0/LkRlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgICAgY29uc3Qgc3VidGl0bGUgPSBkZXNjcmlwdGlvbiB8fCBcIi1cIjtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB2YWx1ZTogZmlsZUlkLFxyXG4gICAgICAgIHRpdGxlOiBmaWxlSWQsXHJcbiAgICAgICAgc3VidGl0bGUsXHJcbiAgICAgIH0gYXMgUmVtb3RlU2VhcmNoT3B0aW9uO1xyXG4gICAgfSlcclxuICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgUmVtb3RlU2VhcmNoT3B0aW9uW107XHJcbn07XHJcblxyXG4vLyBUaWNrZXQga2V5IGZpbHRlciBpbnB1dCB3aXRoIHJlbW90ZSBsaXN0IHN1Z2dlc3Rpb25zLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQgPSAoe1xyXG4gIGxhYmVsLFxyXG4gIHBsYWNlaG9sZGVyLFxyXG4gIHZhbHVlLFxyXG4gIG9uQ2hhbmdlLFxyXG4gIG1vZGUgPSBcImdlbmVyYWxcIixcclxuICBjcmVhdGVkRGF0ZUZyb20gPSBcIlwiLFxyXG4gIGNyZWF0ZWREYXRlVG8gPSBcIlwiLFxyXG4gIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zID0gdHJ1ZSxcclxuICBmaXhlZFN0YXR1c0ZpbHRlciA9IG51bGwsXHJcbiAgcmVhZE9ubHkgPSBmYWxzZSxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIHNob3dMYWJlbCA9IHRydWUsXHJcbn06IEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dFByb3BzKSA9PiB7XHJcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XHJcblxyXG4gIGNvbnN0IGxvYWRPcHRpb25zID0gdXNlQ2FsbGJhY2soYXN5bmMgKHRlcm06IHN0cmluZywgc2lnbmFsOiBBYm9ydFNpZ25hbCk6IFByb21pc2U8UmVtb3RlU2VhcmNoT3B0aW9uW10+ID0+IHtcclxuICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZFRpY2tldFN1Z2dlc3RQYXlsb2FkKHRlcm0sIDEsIFNFQVJDSF9QQUdFX1NJWkUsIGZpeGVkU3RhdHVzRmlsdGVyLCBjcmVhdGVkRGF0ZUZyb20sIGNyZWF0ZWREYXRlVG8pO1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPVxyXG4gICAgICBtb2RlID09PSBcImxpbmtcIlxyXG4gICAgICAgID8gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdChwYXlsb2FkIGFzIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCwge1xyXG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgc2lnbmFsLFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICA6IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QocGF5bG9hZCBhcyBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCwge1xyXG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgc2lnbmFsLFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1hcFRpY2tldE9wdGlvbnMocmVzcG9uc2U/Lkl0ZW1zKTtcclxuICB9LCBbY3JlYXRlZERhdGVGcm9tLCBjcmVhdGVkRGF0ZVRvLCBmaXhlZFN0YXR1c0ZpbHRlciwgbW9kZV0pO1xyXG5cclxuICBjb25zdCBsb2FkT3B0aW9uc1BhZ2UgPSB1c2VDYWxsYmFjayhhc3luYyAodGVybTogc3RyaW5nLCBwYWdlOiBudW1iZXIsIF9wYWdlU2l6ZTogbnVtYmVyLCBzaWduYWw6IEFib3J0U2lnbmFsKSA9PiB7XHJcbiAgICBjb25zdCBwYXlsb2FkID0gYnVpbGRUaWNrZXRTdWdnZXN0UGF5bG9hZChcclxuICAgICAgdGVybSxcclxuICAgICAgcGFnZSxcclxuICAgICAgU0VBUkNIX1BBR0VfU0laRSxcclxuICAgICAgZml4ZWRTdGF0dXNGaWx0ZXIsXHJcbiAgICAgIGNyZWF0ZWREYXRlRnJvbSxcclxuICAgICAgY3JlYXRlZERhdGVUb1xyXG4gICAgKTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID1cclxuICAgICAgbW9kZSA9PT0gXCJsaW5rXCJcclxuICAgICAgICA/IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3QocGF5bG9hZCBhcyBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QsIHtcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIHNpZ25hbCxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgOiBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0KHBheWxvYWQgYXMgRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsIHtcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIHNpZ25hbCxcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpdGVtczogW10sXHJcbiAgICAgICAgdG90YWw6IDAsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaXRlbXM6IG1hcFRpY2tldE9wdGlvbnMocmVzcG9uc2U/Lkl0ZW1zKSxcclxuICAgICAgdG90YWw6IE51bWJlcihyZXNwb25zZT8uVG90YWwgfHwgMCksXHJcbiAgICB9O1xyXG4gIH0sIFtjcmVhdGVkRGF0ZUZyb20sIGNyZWF0ZWREYXRlVG8sIGZpeGVkU3RhdHVzRmlsdGVyLCBtb2RlXSk7XHJcblxyXG4gIGlmICghZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnMgfHwgcmVhZE9ubHlNb2RlKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxyXG4gICAgICAgIHtzaG93TGFiZWwgPyAoXHJcbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgc3R5bGU9e3sgY29sb3I6IFwiIzAwMjk2YmUwXCIgfX0+XHJcbiAgICAgICAgICAgIHtsYWJlbH1cclxuICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcHgtMyBweS0yIHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTkwMCBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCJcclxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cclxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XHJcbiAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbH1cclxuICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cclxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPFJlbW90ZVNlYXJjaENvbWJvYm94XHJcbiAgICAgIGxhYmVsPXtsYWJlbH1cclxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICB2YWx1ZT17dmFsdWV9XHJcbiAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cclxuICAgICAgb25TZWFyY2g9e2FzeW5jICh0ZXJtLCBzaWduYWwpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGxvYWRPcHRpb25zKHRlcm0sIHNpZ25hbCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICB9fVxyXG4gICAgICBvblNlYXJjaFBhZ2U9e2FzeW5jICh0ZXJtLCBwYWdlLCBwYWdlU2l6ZSwgc2lnbmFsKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHJldHVybiBhd2FpdCBsb2FkT3B0aW9uc1BhZ2UodGVybSwgcGFnZSwgcGFnZVNpemUsIHNpZ25hbCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgaXRlbXM6IFtdLCB0b3RhbDogMCB9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICB9fVxyXG4gICAgICBpZEJhc2U9XCJleHBlbnNlLXRpY2tldC1maWx0ZXIta2V5XCJcclxuICAgICAgbWluU2VhcmNoTGVuZ3RoPXswfVxyXG4gICAgICBwYWdlU2l6ZT17U0VBUkNIX1BBR0VfU0laRX1cclxuICAgICAgYWxsb3dFbXB0eVNlYXJjaFxyXG4gICAgICBsb2FkT25PcGVuXHJcbiAgICAgIGluZmluaXRlU2Nyb2xsXHJcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxyXG4gICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cclxuICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgLz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXHJcbiAgRXhwZW5zZVRpY2tldFF1aWNrRmlsdGVySWQsXHJcbn0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlVGlja2V0U3RhdHVzQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZUV4cGVuc2VRdWlja0RhdGVGaWx0ZXJGcm9tUmFuZ2UgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVF1aWNrRGF0ZUZpbHRlclN0YXRlLnRzXCI7XHJcbmltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdC50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZUFyZ3MgPSB7XHJcbiAgb25BcHBseUZpbHRlcnM6IChzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4gdm9pZDtcclxuICBvbkNsZWFyRmlsdGVyczogKCkgPT4gdm9pZDtcclxuICBkZWZhdWx0TWFuYWdlZFVzZXJJZDogc3RyaW5nO1xyXG4gIGZpeGVkU3RhdHVzRmlsdGVyPzogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUgfCBudWxsO1xyXG4gIGFsbG93RW1wdHlEYXRlc09uQXBwbHk/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gT3ducyBmaWx0ZXIgVUkgc3RhdGUgYW5kIGFwcGx5L2NsZWFyIHJ1bGVzIGZvciBleHBlbnNlIHRpY2tldHMgbGlzdCBwYWdlLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGUgPSAoe1xyXG4gIG9uQXBwbHlGaWx0ZXJzLFxyXG4gIG9uQ2xlYXJGaWx0ZXJzLFxyXG4gIGRlZmF1bHRNYW5hZ2VkVXNlcklkLFxyXG4gIGZpeGVkU3RhdHVzRmlsdGVyID0gbnVsbCxcclxuICBhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5ID0gZmFsc2UsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlQXJncykgPT4ge1xyXG4gIGNvbnN0IGhhc0ZpeGVkU3RhdHVzRmlsdGVyID0gZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDAgfHwgZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDE7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVTdGF0dXNGaWx0ZXIgPSB1c2VDYWxsYmFjayhcclxuICAgICh2YWx1ZTogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpOiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSA9PiB7XHJcbiAgICAgIGlmIChoYXNGaXhlZFN0YXR1c0ZpbHRlcikge1xyXG4gICAgICAgIHJldHVybiBmaXhlZFN0YXR1c0ZpbHRlciBhcyBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9LFxyXG4gICAgW2ZpeGVkU3RhdHVzRmlsdGVyLCBoYXNGaXhlZFN0YXR1c0ZpbHRlcl1cclxuICApO1xyXG5cclxuICBjb25zdCBbZnJvbURhdGUsIHNldEZyb21EYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFt0b0RhdGUsIHNldFRvRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZmlsdGVyS2V5LCBzZXRGaWx0ZXJLZXldID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2N1cnJlbmN5Q29kZSwgc2V0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFttYW5hZ2VkVXNlcklkLCBzZXRNYW5hZ2VkVXNlcklkXSA9IHVzZVN0YXRlKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcclxuICBjb25zdCBbc3RhdHVzRmlsdGVyUmF3LCBzZXRTdGF0dXNGaWx0ZXJSYXddID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGU+KHJlc29sdmVTdGF0dXNGaWx0ZXIoXCJcIikpO1xyXG4gIGNvbnN0IFtnYXN0b1R5cGVGaWx0ZXIsIHNldEdhc3RvVHlwZUZpbHRlcl0gPSB1c2VTdGF0ZTxcIlwiIHwgRXhwZW5zZUdhc3RvVHlwZUNvZGU+KFwiXCIpO1xyXG4gIGNvbnN0IFtwcm9jZXNzZWRCeUlhRmlsdGVyLCBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyXSA9IHVzZVN0YXRlPFwiYWxsXCIgfCBcInllc1wiIHwgXCJub1wiPihcImFsbFwiKTtcclxuICBjb25zdCBbYWN0aXZlUXVpY2tGaWx0ZXIsIHNldEFjdGl2ZVF1aWNrRmlsdGVyXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW3Nob3dNYW51YWxEYXRlRmlsdGVyLCBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3Nob3dNYW51YWxEYXRlRXJyb3IsIHNldFNob3dNYW51YWxEYXRlRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttYW51YWxEYXRlQXV0b09wZW5LZXksIHNldE1hbnVhbERhdGVBdXRvT3BlbktleV0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbYXBwbGllZEZpbHRlcnMsIHNldEFwcGxpZWRGaWx0ZXJzXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbc2hvd0ZpbHRlcnMsIHNldFNob3dGaWx0ZXJzXSA9IHVzZVN0YXRlKHRydWUpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFoYXNGaXhlZFN0YXR1c0ZpbHRlcikgcmV0dXJuO1xyXG4gICAgc2V0U3RhdHVzRmlsdGVyUmF3KGZpeGVkU3RhdHVzRmlsdGVyIGFzIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlKTtcclxuICB9LCBbZml4ZWRTdGF0dXNGaWx0ZXIsIGhhc0ZpeGVkU3RhdHVzRmlsdGVyXSk7XHJcblxyXG4gIGNvbnN0IHN0YXR1c0ZpbHRlciA9IHJlc29sdmVTdGF0dXNGaWx0ZXIoc3RhdHVzRmlsdGVyUmF3KTtcclxuXHJcbiAgY29uc3QgY3VycmVudEZpbHRlcnMgPSB1c2VNZW1vPEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3Q+KFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgZnJvbURhdGUsXHJcbiAgICAgIHRvRGF0ZSxcclxuICAgICAgZmlsdGVyS2V5OiBmaWx0ZXJLZXkudHJpbSgpLFxyXG4gICAgICBjdXJyZW5jeUNvZGU6IGN1cnJlbmN5Q29kZS50cmltKCksXHJcbiAgICAgIG1hbmFnZWRVc2VySWQ6IG1hbmFnZWRVc2VySWQudHJpbSgpLFxyXG4gICAgICBzdGF0dXNGaWx0ZXIsXHJcbiAgICAgIGdhc3RvVHlwZUZpbHRlcixcclxuICAgICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICAgIH0pLFxyXG4gICAgW2N1cnJlbmN5Q29kZSwgZmlsdGVyS2V5LCBmcm9tRGF0ZSwgZ2FzdG9UeXBlRmlsdGVyLCBtYW5hZ2VkVXNlcklkLCBwcm9jZXNzZWRCeUlhRmlsdGVyLCBzdGF0dXNGaWx0ZXIsIHRvRGF0ZV1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRTdGF0dXNGaWx0ZXIgPSB1c2VDYWxsYmFjayhcclxuICAgICh2YWx1ZTogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpID0+IHtcclxuICAgICAgaWYgKGhhc0ZpeGVkU3RhdHVzRmlsdGVyKSB7XHJcbiAgICAgICAgc2V0U3RhdHVzRmlsdGVyUmF3KGZpeGVkU3RhdHVzRmlsdGVyIGFzIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgc2V0U3RhdHVzRmlsdGVyUmF3KHZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBbZml4ZWRTdGF0dXNGaWx0ZXIsIGhhc0ZpeGVkU3RhdHVzRmlsdGVyXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG9uQXBwbHkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWFsbG93RW1wdHlEYXRlc09uQXBwbHkgJiYgKCFmcm9tRGF0ZSB8fCAhdG9EYXRlKSkge1xyXG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKHRydWUpO1xyXG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcclxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9IHtcclxuICAgICAgZnJvbURhdGUsXHJcbiAgICAgIHRvRGF0ZSxcclxuICAgICAgZmlsdGVyS2V5OiBmaWx0ZXJLZXkudHJpbSgpLFxyXG4gICAgICBjdXJyZW5jeUNvZGU6IGN1cnJlbmN5Q29kZS50cmltKCksXHJcbiAgICAgIG1hbmFnZWRVc2VySWQ6IG1hbmFnZWRVc2VySWQudHJpbSgpLFxyXG4gICAgICBzdGF0dXNGaWx0ZXIsXHJcbiAgICAgIGdhc3RvVHlwZUZpbHRlcixcclxuICAgICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICAgIH07XHJcblxyXG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XHJcbiAgICBzZXRBcHBsaWVkRmlsdGVycyhzbmFwc2hvdCk7XHJcbiAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XHJcbiAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XHJcbiAgICBvbkFwcGx5RmlsdGVycyhzbmFwc2hvdCk7XHJcbiAgfSwgW1xyXG4gICAgYWxsb3dFbXB0eURhdGVzT25BcHBseSxcclxuICAgIGN1cnJlbmN5Q29kZSxcclxuICAgIGZpbHRlcktleSxcclxuICAgIGZyb21EYXRlLFxyXG4gICAgZ2FzdG9UeXBlRmlsdGVyLFxyXG4gICAgbWFuYWdlZFVzZXJJZCxcclxuICAgIG9uQXBwbHlGaWx0ZXJzLFxyXG4gICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICAgIHN0YXR1c0ZpbHRlcixcclxuICAgIHRvRGF0ZSxcclxuICBdKTtcclxuXHJcbiAgLy8gUmVoeWRyYXRlcyB0aWNrZXQgZmlsdGVycyBmcm9tIGEgY2FjaGVkIHNuYXBzaG90IHdoZW4gcmV0dXJuaW5nIGZyb20gZGV0YWlsLlxyXG4gIGNvbnN0IHJlc3RvcmVBcHBsaWVkRmlsdGVycyA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3Qoc25hcHNob3QpO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkU3RhdHVzRmlsdGVyID0gcmVzb2x2ZVN0YXR1c0ZpbHRlcihub3JtYWxpemVkLnN0YXR1c0ZpbHRlcik7XHJcbiAgICAgIGNvbnN0IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCA9IFN0cmluZyhub3JtYWxpemVkLm1hbmFnZWRVc2VySWQgfHwgZGVmYXVsdE1hbmFnZWRVc2VySWQpLnRyaW0oKTtcclxuICAgICAgY29uc3QgcmVzdG9yZWRRdWlja0ZpbHRlciA9IHJlc29sdmVFeHBlbnNlUXVpY2tEYXRlRmlsdGVyRnJvbVJhbmdlKG5vcm1hbGl6ZWQuZnJvbURhdGUsIG5vcm1hbGl6ZWQudG9EYXRlKTtcclxuICAgICAgc2V0RnJvbURhdGUobm9ybWFsaXplZC5mcm9tRGF0ZSk7XHJcbiAgICAgIHNldFRvRGF0ZShub3JtYWxpemVkLnRvRGF0ZSk7XHJcbiAgICAgIHNldEZpbHRlcktleShub3JtYWxpemVkLmZpbHRlcktleSk7XHJcbiAgICAgIHNldEN1cnJlbmN5Q29kZShub3JtYWxpemVkLmN1cnJlbmN5Q29kZSk7XHJcbiAgICAgIHNldE1hbmFnZWRVc2VySWQocmVzdG9yZWRNYW5hZ2VkVXNlcklkKTtcclxuICAgICAgc2V0U3RhdHVzRmlsdGVyUmF3KG5vcm1hbGl6ZWRTdGF0dXNGaWx0ZXIpO1xyXG4gICAgICBzZXRHYXN0b1R5cGVGaWx0ZXIobm9ybWFsaXplZC5nYXN0b1R5cGVGaWx0ZXIpO1xyXG4gICAgICBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyKG5vcm1hbGl6ZWQucHJvY2Vzc2VkQnlJYUZpbHRlcik7XHJcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKHJlc3RvcmVkUXVpY2tGaWx0ZXIpO1xyXG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XHJcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xyXG4gICAgICBzZXRBcHBsaWVkRmlsdGVycyh7XHJcbiAgICAgICAgLi4ubm9ybWFsaXplZCxcclxuICAgICAgICBtYW5hZ2VkVXNlcklkOiByZXN0b3JlZE1hbmFnZWRVc2VySWQsXHJcbiAgICAgICAgc3RhdHVzRmlsdGVyOiBub3JtYWxpemVkU3RhdHVzRmlsdGVyLFxyXG4gICAgICB9KTtcclxuICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIFtkZWZhdWx0TWFuYWdlZFVzZXJJZCwgcmVzb2x2ZVN0YXR1c0ZpbHRlcl1cclxuICApO1xyXG5cclxuICBjb25zdCBvbkNsZWFyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0RnJvbURhdGUoXCJcIik7XHJcbiAgICBzZXRUb0RhdGUoXCJcIik7XHJcbiAgICBzZXRGaWx0ZXJLZXkoXCJcIik7XHJcbiAgICBzZXRDdXJyZW5jeUNvZGUoXCJcIik7XHJcbiAgICBzZXRNYW5hZ2VkVXNlcklkKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcclxuICAgIHNldFN0YXR1c0ZpbHRlclJhdyhyZXNvbHZlU3RhdHVzRmlsdGVyKFwiXCIpKTtcclxuICAgIHNldEdhc3RvVHlwZUZpbHRlcihcIlwiKTtcclxuICAgIHNldFByb2Nlc3NlZEJ5SWFGaWx0ZXIoXCJhbGxcIik7XHJcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcclxuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcclxuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xyXG4gICAgc2V0TWFudWFsRGF0ZUF1dG9PcGVuS2V5KDApO1xyXG4gICAgc2V0QXBwbGllZEZpbHRlcnMobnVsbCk7XHJcbiAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcclxuICAgIG9uQ2xlYXJGaWx0ZXJzKCk7XHJcbiAgfSwgW2RlZmF1bHRNYW5hZ2VkVXNlcklkLCBvbkNsZWFyRmlsdGVycywgcmVzb2x2ZVN0YXR1c0ZpbHRlcl0pO1xyXG5cclxuICBjb25zdCBvbkRhdGVSYW5nZUNoYW5nZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKG5leHRGcm9tRGF0ZTogc3RyaW5nLCBuZXh0VG9EYXRlOiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3QgaGFzRnVsbFJhbmdlID0gISFuZXh0RnJvbURhdGUgJiYgISFuZXh0VG9EYXRlO1xyXG4gICAgICBzZXRGcm9tRGF0ZShuZXh0RnJvbURhdGUpO1xyXG4gICAgICBzZXRUb0RhdGUobmV4dFRvRGF0ZSk7XHJcbiAgICAgIGlmICghaGFzRnVsbFJhbmdlKSB7XHJcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XHJcbiAgICAgIGlmIChzaG93TWFudWFsRGF0ZUVycm9yKSB7XHJcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcighaGFzRnVsbFJhbmdlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtzaG93TWFudWFsRGF0ZUVycm9yXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG9uTWFudWFsUmFuZ2VDb21wbGV0ZSA9IHVzZUNhbGxiYWNrKChuZXh0RnJvbURhdGU6IHN0cmluZywgbmV4dFRvRGF0ZTogc3RyaW5nKSA9PiB7XHJcbiAgICBzZXRGcm9tRGF0ZShuZXh0RnJvbURhdGUpO1xyXG4gICAgc2V0VG9EYXRlKG5leHRUb0RhdGUpO1xyXG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XHJcbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcclxuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IG9uUXVpY2tGaWx0ZXJDaGFuZ2UgPSB1c2VDYWxsYmFjayhcclxuICAgIChmaWx0ZXJJZDogRXhwZW5zZVRpY2tldFF1aWNrRmlsdGVySWQpID0+IHtcclxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImN1c3RvbVwiKSB7XHJcbiAgICAgICAgaWYgKHNob3dNYW51YWxEYXRlRmlsdGVyKSB7XHJcbiAgICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XHJcbiAgICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xyXG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKHRydWUpO1xyXG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xyXG4gICAgICAgIHNldE1hbnVhbERhdGVBdXRvT3BlbktleSgocHJldmlvdXMpID0+IHByZXZpb3VzICsgMSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihmaWx0ZXJJZCk7XHJcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcclxuICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XHJcblxyXG4gICAgICBjb25zdCB0b2RheSA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoKSk7XHJcbiAgICAgIGNvbnN0IG5leHRGcm9tID0gbmV3IERhdGUodG9kYXkpO1xyXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy03XCIpIHtcclxuICAgICAgICBuZXh0RnJvbS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDYpO1xyXG4gICAgICB9IGVsc2UgaWYgKGZpbHRlcklkID09PSBcImRheXMtMzBcIikge1xyXG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMjkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gODkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRGcm9tRGF0ZSh0b0lzb0RhdGUobmV4dEZyb20pKTtcclxuICAgICAgc2V0VG9EYXRlKHRvSXNvRGF0ZSh0b2RheSkpO1xyXG4gICAgfSxcclxuICAgIFtzaG93TWFudWFsRGF0ZUZpbHRlcl1cclxuICApO1xyXG5cclxuICBjb25zdCB0b2dnbGVGaWx0ZXJQYW5lbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFNob3dGaWx0ZXJzKChwcmV2aW91cykgPT4ge1xyXG4gICAgICBjb25zdCBuZXh0ID0gIXByZXZpb3VzO1xyXG4gICAgICBpZiAoIW5leHQpIHtcclxuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICB9KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBmcm9tRGF0ZSxcclxuICAgIHRvRGF0ZSxcclxuICAgIGZpbHRlcktleSxcclxuICAgIGN1cnJlbmN5Q29kZSxcclxuICAgIG1hbmFnZWRVc2VySWQsXHJcbiAgICBzdGF0dXNGaWx0ZXIsXHJcbiAgICBnYXN0b1R5cGVGaWx0ZXIsXHJcbiAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxyXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXHJcbiAgICBzaG93TWFudWFsRGF0ZUZpbHRlcixcclxuICAgIHNob3dNYW51YWxEYXRlRXJyb3IsXHJcbiAgICBtYW51YWxEYXRlQXV0b09wZW5LZXksXHJcbiAgICBhcHBsaWVkRmlsdGVycyxcclxuICAgIHNob3dGaWx0ZXJzLFxyXG4gICAgY3VycmVudEZpbHRlcnMsXHJcbiAgICBzZXRGaWx0ZXJLZXksXHJcbiAgICBzZXRDdXJyZW5jeUNvZGUsXHJcbiAgICBzZXRNYW5hZ2VkVXNlcklkLFxyXG4gICAgc2V0U3RhdHVzRmlsdGVyLFxyXG4gICAgc2V0R2FzdG9UeXBlRmlsdGVyLFxyXG4gICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcixcclxuICAgIG9uQXBwbHksXHJcbiAgICBvbkNsZWFyLFxyXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxyXG4gICAgb25EYXRlUmFuZ2VDaGFuZ2UsXHJcbiAgICBvbk1hbnVhbFJhbmdlQ29tcGxldGUsXHJcbiAgICBvblF1aWNrRmlsdGVyQ2hhbmdlLFxyXG4gICAgdG9nZ2xlRmlsdGVyUGFuZWwsXHJcbiAgICBzdGF0dXNGaWx0ZXJMb2NrZWQ6IGhhc0ZpeGVkU3RhdHVzRmlsdGVyLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdCwgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IGlzRXhwZW5zZUFib3J0TGlrZUVycm9yLCBydW5FeHBlbnNlUmVhZFJlcXVlc3RXaXRoUmV0cnkgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVJlcXVlc3RSZXRyeS50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGJ1aWxkRXhwZW5zZVRpY2tldExpbmtMaXN0UGF5bG9hZCxcclxuICBidWlsZEV4cGVuc2VUaWNrZXRMaXN0UGF5bG9hZCxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVBheWxvYWRCdWlsZGVycy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcclxuICBFeHBlbnNlVGlja2V0Q2FyZCxcclxuICBFeHBlbnNlVGlja2V0TGlua0NhcmQsXHJcbiAgRXhwZW5zZVRpY2tldExpc3RQYWdlSXRlbSxcclxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGFBcmdzID0ge1xyXG4gIGhhc0FjY2VzczogYm9vbGVhbjtcclxuICBwYWdlU2l6ZTogbnVtYmVyO1xyXG4gIG1vZGU6IFwiZ2VuZXJhbFwiIHwgXCJsaW5rXCI7XHJcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBBTExPV0VEX0dBU1RPX1RZUEVfQ09ERVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XHJcbmNvbnN0IEVYUEVOU0VfVElDS0VUU19MSVNUX0xPR19QUkVGSVggPSBcIltleHBlbnNlLXRpY2tldHM6bGlzdF1cIjtcclxuXHJcbmNvbnN0IGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLmluZm8gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS5pbmZvKEVYUEVOU0VfVElDS0VUU19MSVNUX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLndhcm4gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS53YXJuKEVYUEVOU0VfVElDS0VUU19MSVNUX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEVycm9yID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xyXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKEVYUEVOU0VfVElDS0VUU19MSVNUX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRXhwZW5zZVRpY2tldHNEZWJ1Z1N0YWNrID0gKGxhYmVsOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICh0eXBlb2YgRXJyb3IgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFwiXCI7XHJcbiAgY29uc3QgcmF3U3RhY2sgPSBuZXcgRXJyb3IobGFiZWwpLnN0YWNrO1xyXG4gIGlmICh0eXBlb2YgcmF3U3RhY2sgIT09IFwic3RyaW5nXCIgfHwgIXJhd1N0YWNrLnRyaW0oKSkgcmV0dXJuIFwiXCI7XHJcbiAgcmV0dXJuIHJhd1N0YWNrXHJcbiAgICAuc3BsaXQoXCJcXG5cIilcclxuICAgIC5zbGljZSgwLCA2KVxyXG4gICAgLmpvaW4oXCJcXG5cIik7XHJcbn07XHJcblxyXG5jb25zdCB0b051bGxhYmxlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgdG9OdWxsYWJsZUJvb2wgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHJldHVybiB2YWx1ZTtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSByZXR1cm4gdmFsdWUgPT09IDEgPyB0cnVlIDogdmFsdWUgPT09IDAgPyBmYWxzZSA6IG51bGw7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IHZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKG5vcm1hbGl6ZWQgPT09IFwidHJ1ZVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwiMVwiKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmIChub3JtYWxpemVkID09PSBcImZhbHNlXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIwXCIpIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5jb25zdCB0b051bGxhYmxlVGlja2V0U3RhdHVzID0gKHZhbHVlOiB1bmtub3duKTogMCB8IDEgfCBudWxsID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBwYXJzZWQgPT09IDAgfHwgcGFyc2VkID09PSAxID8gcGFyc2VkIDogbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IHRvTnVsbGFibGVUaWNrZXRHYXN0b1R5cGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlR2FzdG9UeXBlQ29kZSB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XHJcbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgfHwgIUFMTE9XRURfR0FTVE9fVFlQRV9DT0RFUy5oYXMocGFyc2VkKSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcGFyc2VkIGFzIEV4cGVuc2VHYXN0b1R5cGVDb2RlO1xyXG59O1xyXG5cclxuY29uc3QgbWFwVGlja2V0SXRlbVRvQ2FyZCA9IChpdGVtOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IEV4cGVuc2VUaWNrZXRDYXJkID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAga2luZDogXCJnZW5lcmFsXCIsXHJcbiAgICBmaWxlSWQ6IFN0cmluZyhpdGVtPy5GaWxlSWQgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgZGVzY3JpcHRpb246IFN0cmluZyhpdGVtPy5EZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXHJcbiAgICBzdGF0dXM6IHRvTnVsbGFibGVUaWNrZXRTdGF0dXMoaXRlbT8uU3RhdHVzKSxcclxuICAgIHByb2Nlc3NlZEJ5QUk6IHRvTnVsbGFibGVCb29sKGl0ZW0/LlByb2Nlc3NlZEJ5QUkpLFxyXG4gICAgY3VycmVuY3lDb2RlOiBTdHJpbmcoaXRlbT8uQ3VycmVuY3lDb2RlIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgIHRvdGFsQW1vdW50OiB0b051bGxhYmxlTnVtYmVyKGl0ZW0/LlRvdGFsQW1vdW50KSxcclxuICAgIHRyYW5zRGF0ZTogU3RyaW5nKGl0ZW0/LlRyYW5zRGF0ZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICBmaWxlTmFtZTogU3RyaW5nKGl0ZW0/LkZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgIGdhc3RvVHlwZTogdG9OdWxsYWJsZVRpY2tldEdhc3RvVHlwZShpdGVtPy5HYXN0b1R5cGUgPz8gaXRlbT8uZ2FzdG9UeXBlKSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgbWFwVGlja2V0TGlua0l0ZW1Ub0NhcmQgPSAoaXRlbTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBFeHBlbnNlVGlja2V0TGlua0NhcmQgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBraW5kOiBcImxpbmtcIixcclxuICAgIGZpbGVJZDogU3RyaW5nKGl0ZW0/LkZpbGVJZCB8fCBcIlwiKS50cmltKCksXHJcbiAgICBkZXNjcmlwdGlvbjogU3RyaW5nKGl0ZW0/LkRlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgIHByb2Nlc3NlZEJ5QUk6IHRvTnVsbGFibGVCb29sKGl0ZW0/LlByb2Nlc3NlZEJ5QUkpLFxyXG4gICAgY3VycmVuY3lDb2RlOiBTdHJpbmcoaXRlbT8uQ3VycmVuY3lDb2RlIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgIHRvdGFsQW1vdW50OiB0b051bGxhYmxlTnVtYmVyKGl0ZW0/LlRvdGFsQW1vdW50KSxcclxuICAgIHRyYW5zRGF0ZTogU3RyaW5nKGl0ZW0/LlRyYW5zRGF0ZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICBmaWxlTmFtZTogU3RyaW5nKGl0ZW0/LkZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgIGdhc3RvVHlwZTogdG9OdWxsYWJsZVRpY2tldEdhc3RvVHlwZShpdGVtPy5HYXN0b1R5cGUgPz8gaXRlbT8uZ2FzdG9UeXBlKSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gT3ducyBsaXN0IGRhdGEgZmV0Y2gsIGxvYWRpbmcgc3RhdGUsIGFuZCBwYWdpbmF0aW9uIG1ldGFkYXRhIGZvciB0aWNrZXRzLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YSA9ICh7IGhhc0FjY2VzcywgcGFnZVNpemUsIG1vZGUsIG9uRm9yYmlkZGVuIH06IFVzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGFBcmdzKSA9PiB7XHJcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0TGlzdFBhZ2VJdGVtW10+KFtdKTtcclxuICBjb25zdCBbdG90YWwsIHNldFRvdGFsXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtjdXJyZW50UGFnZSwgc2V0Q3VycmVudFBhZ2VdID0gdXNlU3RhdGUoMSk7XHJcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgYWN0aXZlUmVxdWVzdEtleVJlZiA9IHVzZVJlZihcIlwiKTtcclxuICBjb25zdCBhY3RpdmVSZXF1ZXN0U2VxUmVmID0gdXNlUmVmKDApO1xyXG5cclxuICBjb25zdCByZXN0b3JlTGlzdFNuYXBzaG90ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoc25hcHNob3Q6IHsgaXRlbXM6IEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW1bXTsgdG90YWw6IG51bWJlcjsgcGFnZTogbnVtYmVyIH0pID0+IHtcclxuICAgICAgY29uc3Qgc2FmZUl0ZW1zID0gQXJyYXkuaXNBcnJheShzbmFwc2hvdC5pdGVtcykgPyBzbmFwc2hvdC5pdGVtcyA6IFtdO1xyXG4gICAgICBjb25zdCBzYWZlVG90YWxSYXcgPSBOdW1iZXIoc25hcHNob3QudG90YWwpO1xyXG4gICAgICBjb25zdCBzYWZlVG90YWwgPSBOdW1iZXIuaXNGaW5pdGUoc2FmZVRvdGFsUmF3KSAmJiBzYWZlVG90YWxSYXcgPj0gMCA/IHNhZmVUb3RhbFJhdyA6IHNhZmVJdGVtcy5sZW5ndGg7XHJcbiAgICAgIGNvbnN0IHNhZmVQYWdlUmF3ID0gTnVtYmVyKHNuYXBzaG90LnBhZ2UpO1xyXG4gICAgICBjb25zdCBzYWZlUGFnZSA9IE51bWJlci5pc0Zpbml0ZShzYWZlUGFnZVJhdykgJiYgc2FmZVBhZ2VSYXcgPiAwID8gTWF0aC5mbG9vcihzYWZlUGFnZVJhdykgOiAxO1xyXG5cclxuICAgICAgc2V0SXRlbXMoc2FmZUl0ZW1zKTtcclxuICAgICAgc2V0VG90YWwoc2FmZVRvdGFsKTtcclxuICAgICAgc2V0Q3VycmVudFBhZ2Uoc2FmZVBhZ2UpO1xyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICBjb25zdCBsb2FkTGlzdCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKHBhZ2U6IG51bWJlciwgZmlsdGVyczogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4ge1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RJbmZvKFwibG9hZExpc3Q6cmVxdWVzdGVkXCIsIHtcclxuICAgICAgICBwYWdlLFxyXG4gICAgICAgIG1vZGUsXHJcbiAgICAgICAgaGFzQWNjZXNzLFxyXG4gICAgICAgIGZpbHRlcnMsXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoIWhhc0FjY2Vzcykge1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJsb2FkTGlzdDpibG9ja2VkLW5vLWFjY2Vzc1wiLCB7XHJcbiAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgbW9kZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcGF5bG9hZCA9XHJcbiAgICAgICAgbW9kZSA9PT0gXCJsaW5rXCJcclxuICAgICAgICAgID8gYnVpbGRFeHBlbnNlVGlja2V0TGlua0xpc3RQYXlsb2FkKGZpbHRlcnMsIHBhZ2UsIHBhZ2VTaXplKVxyXG4gICAgICAgICAgOiBidWlsZEV4cGVuc2VUaWNrZXRMaXN0UGF5bG9hZChmaWx0ZXJzLCBwYWdlLCBwYWdlU2l6ZSk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkID0gU3RyaW5nKGZpbHRlcnM/Lm1hbmFnZWRVc2VySWQgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgIGNvbnN0IHJlcXVlc3RLZXkgPSBKU09OLnN0cmluZ2lmeSh7IG1vZGUsIHBheWxvYWQsIG1hbmFnZWRVc2VySWQ6IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkIH0pO1xyXG5cclxuICAgICAgaWYgKGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgJiYgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID09PSByZXF1ZXN0S2V5KSB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImxvYWRMaXN0OnNraXAtZHVwbGljYXRlLXJlcXVlc3RcIiwge1xyXG4gICAgICAgICAgcGFnZSxcclxuICAgICAgICAgIG1vZGUsXHJcbiAgICAgICAgICByZXF1ZXN0S2V5LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RJbmZvKFwibG9hZExpc3Q6YWJvcnQtcHJldmlvdXMtcmVxdWVzdFwiLCB7XHJcbiAgICAgICAgICBwcmV2aW91c1JlcXVlc3RLZXk6IGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCxcclxuICAgICAgICAgIHByZXZpb3VzUmVxdWVzdFNlcTogYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50LFxyXG4gICAgICAgICAgc3RhY2s6IGJ1aWxkRXhwZW5zZVRpY2tldHNEZWJ1Z1N0YWNrKFwibG9hZExpc3Q6YWJvcnQtcHJldmlvdXMtcmVxdWVzdFwiKSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50LmFib3J0KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcbiAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgPSBjb250cm9sbGVyO1xyXG4gICAgICBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPSByZXF1ZXN0S2V5O1xyXG4gICAgICBjb25zdCByZXF1ZXN0U2VxID0gYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50ICsgMTtcclxuICAgICAgYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50ID0gcmVxdWVzdFNlcTtcclxuICAgICAgY29uc3QgaGFuZGxlQWJvcnRTaWduYWwgPSAoKSA9PiB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImxvYWRMaXN0OnNpZ25hbC1hYm9ydC1ldmVudFwiLCB7XHJcbiAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgbW9kZSxcclxuICAgICAgICAgIHJlcXVlc3RTZXEsXHJcbiAgICAgICAgICByZXF1ZXN0S2V5LFxyXG4gICAgICAgICAgc2lnbmFsQWJvcnRlZDogY29udHJvbGxlci5zaWduYWwuYWJvcnRlZCxcclxuICAgICAgICAgIHNpZ25hbFJlYXNvbjpcclxuICAgICAgICAgICAgXCJyZWFzb25cIiBpbiBjb250cm9sbGVyLnNpZ25hbFxyXG4gICAgICAgICAgICAgID8gKChjb250cm9sbGVyLnNpZ25hbCBhcyBBYm9ydFNpZ25hbCAmIHsgcmVhc29uPzogdW5rbm93biB9KS5yZWFzb24gPz8gbnVsbClcclxuICAgICAgICAgICAgICA6IG51bGwsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnRyb2xsZXIuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBoYW5kbGVBYm9ydFNpZ25hbCwgeyBvbmNlOiB0cnVlIH0pO1xyXG5cclxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8oXCJsb2FkTGlzdDpmZXRjaC1zdGFydFwiLCB7XHJcbiAgICAgICAgcGFnZSxcclxuICAgICAgICBtb2RlLFxyXG4gICAgICAgIG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgICAgIHBheWxvYWQsXHJcbiAgICAgICAgcmVxdWVzdEtleSxcclxuICAgICAgICByZXF1ZXN0U2VxLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBydW5FeHBlbnNlUmVhZFJlcXVlc3RXaXRoUmV0cnkoXHJcbiAgICAgICAgICAoKSA9PlxyXG4gICAgICAgICAgICBtb2RlID09PSBcImxpbmtcIlxyXG4gICAgICAgICAgICAgID8gZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdChwYXlsb2FkLCB7XHJcbiAgICAgICAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgICAgICAgICAgICBheFVzZXJJZE92ZXJyaWRlOiBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIDogZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdChwYXlsb2FkLCB7XHJcbiAgICAgICAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgICAgICAgICAgICBheFVzZXJJZE92ZXJyaWRlOiBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8oXCJsb2FkTGlzdDpmZXRjaC1maW5pc2hlZFwiLCB7XHJcbiAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgbW9kZSxcclxuICAgICAgICAgIHJlcXVlc3RTZXEsXHJcbiAgICAgICAgICBzdWNjZXNzOiByZXNwb25zZT8uU3VjY2VzcyxcclxuICAgICAgICAgIHRvdGFsOiByZXNwb25zZT8uVG90YWwsXHJcbiAgICAgICAgICBpdGVtczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMubGVuZ3RoIDogMCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAocmVxdWVzdFNlcSAhPT0gYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJsb2FkTGlzdDphcGktdW5zdWNjZXNzZnVsXCIsIHtcclxuICAgICAgICAgICAgcGFnZSxcclxuICAgICAgICAgICAgbW9kZSxcclxuICAgICAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuTWVzc2FnZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIlRpY2tldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0cy5cIikpO1xyXG4gICAgICAgICAgc2V0SXRlbXMoW10pO1xyXG4gICAgICAgICAgc2V0VG90YWwoMCk7XHJcbiAgICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNvdXJjZUl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICAgICAgICBjb25zdCBtYXBwZWRJdGVtcyA9IHNvdXJjZUl0ZW1zLm1hcCgoaXRlbSkgPT5cclxuICAgICAgICAgIG1vZGUgPT09IFwibGlua1wiXHJcbiAgICAgICAgICAgID8gbWFwVGlja2V0TGlua0l0ZW1Ub0NhcmQoaXRlbSBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVxyXG4gICAgICAgICAgICA6IG1hcFRpY2tldEl0ZW1Ub0NhcmQoaXRlbSBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2VUb3RhbCA9IE51bWJlcihyZXNwb25zZT8uVG90YWwgPz8gbWFwcGVkSXRlbXMubGVuZ3RoID8/IDApO1xyXG5cclxuICAgICAgICBzZXRJdGVtcyhtYXBwZWRJdGVtcyk7XHJcbiAgICAgICAgc2V0VG90YWwocmVzcG9uc2VUb3RhbCk7XHJcbiAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKHJlcXVlc3RTZXEgIT09IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChpc0V4cGVuc2VBYm9ydExpa2VFcnJvcihlcnJvciwgY29udHJvbGxlci5zaWduYWwpKSB7XHJcbiAgICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwibG9hZExpc3Q6YWJvcnRlZFwiLCB7XHJcbiAgICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICAgIG1vZGUsXHJcbiAgICAgICAgICAgIHJlcXVlc3RTZXEsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogZXJyb3IsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJsb2FkTGlzdDpmb3JiaWRkZW5cIiwge1xyXG4gICAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgICBtb2RlLFxyXG4gICAgICAgICAgICByZXF1ZXN0U2VxLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0RXJyb3IoXCJsb2FkTGlzdDpmYWlsZWRcIiwge1xyXG4gICAgICAgICAgcGFnZSxcclxuICAgICAgICAgIG1vZGUsXHJcbiAgICAgICAgICByZXF1ZXN0U2VxLFxyXG4gICAgICAgICAgbWVzc2FnZTogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvcixcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiVGlja2V0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXRzLlwiKTtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICAgICAgc2V0SXRlbXMoW10pO1xyXG4gICAgICAgIHNldFRvdGFsKDApO1xyXG4gICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIGNvbnRyb2xsZXIuc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBoYW5kbGVBYm9ydFNpZ25hbCk7XHJcbiAgICAgICAgaWYgKHJlcXVlc3RTZXEgPT09IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyhcImxvYWRMaXN0OmZpbmFsaXplXCIsIHtcclxuICAgICAgICAgICAgcGFnZSxcclxuICAgICAgICAgICAgbW9kZSxcclxuICAgICAgICAgICAgcmVxdWVzdFNlcSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbaGFzQWNjZXNzLCBtb2RlLCBvbkZvcmJpZGRlbiwgcGFnZVNpemVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgcmVzZXRMaXN0ID0gdXNlQ2FsbGJhY2soKHNvdXJjZSA9IFwidW5rbm93blwiKSA9PiB7XHJcbiAgICBpZiAoYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCkge1xyXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwicmVzZXRMaXN0OmFib3J0LWFjdGl2ZS1yZXF1ZXN0XCIsIHtcclxuICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgYWN0aXZlUmVxdWVzdEtleTogYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50LFxyXG4gICAgICAgIGFjdGl2ZVJlcXVlc3RTZXE6IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCxcclxuICAgICAgICBzdGFjazogYnVpbGRFeHBlbnNlVGlja2V0c0RlYnVnU3RhY2soYHJlc2V0TGlzdDoke3NvdXJjZX1gKSxcclxuICAgICAgfSk7XHJcbiAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQuYWJvcnQoKTtcclxuICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RJbmZvKFwicmVzZXRMaXN0OmNsZWFyLXN0YXRlXCIsIHtcclxuICAgICAgc291cmNlLFxyXG4gICAgfSk7XHJcbiAgICBzZXRJdGVtcyhbXSk7XHJcbiAgICBzZXRUb3RhbCgwKTtcclxuICAgIHNldEN1cnJlbnRQYWdlKDEpO1xyXG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgY2xlYXJMaXN0Q2FjaGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICAvLyBUaWNrZXQgbGlzdCBhdXRvLWxvYWQgbXVzdCBhbHdheXMgaGl0IHRoZSBsaXZlIGVuZHBvaW50LlxyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlmIChhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImNsZWFudXA6YWJvcnQtYWN0aXZlLXJlcXVlc3RcIiwge1xyXG4gICAgICAgICAgYWN0aXZlUmVxdWVzdEtleTogYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50LFxyXG4gICAgICAgICAgYWN0aXZlUmVxdWVzdFNlcTogYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50LFxyXG4gICAgICAgICAgc3RhY2s6IGJ1aWxkRXhwZW5zZVRpY2tldHNEZWJ1Z1N0YWNrKFwiY2xlYW51cDphYm9ydC1hY3RpdmUtcmVxdWVzdFwiKSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50LmFib3J0KCk7XHJcbiAgICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID0gXCJcIjtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpdGVtcyxcclxuICAgIHRvdGFsLFxyXG4gICAgY3VycmVudFBhZ2UsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBsb2FkTGlzdCxcclxuICAgIHJlc3RvcmVMaXN0U25hcHNob3QsXHJcbiAgICByZXNldExpc3QsXHJcbiAgICBjbGVhckxpc3RDYWNoZSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90LnRzXCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxyXG4gIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCxcclxuICBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGUsXHJcbn0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnksIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VTY29wZVRva2VuIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTY29wZS50c1wiO1xyXG5cclxuY29uc3QgRVhQRU5TRV9USUNLRVRfTElOS19SRVRVUk5fU1RBVEVfS0VZX1BSRUZJWCA9IFwiZXhwZW5zZV90aWNrZXRfbGlua19yZXR1cm5fc3RhdGVfdjFcIjtcclxuY29uc3QgRVhQRU5TRV9USUNLRVRfTElOS19SRVRVUk5fU1RBVEVfVFRMX01TID0gMTIgKiA2MCAqIDYwICogMTAwMDtcclxuY29uc3QgQUxMT1dFRF9USUNLRVRfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlID0ge1xyXG4gIHNoZWV0SWQ6IHN0cmluZztcclxuICBwYWdlOiBudW1iZXI7XHJcbiAgc2Nyb2xsWTogbnVtYmVyO1xyXG4gIGZvY3VzRmlsZUlkOiBzdHJpbmc7XHJcbiAgZmlsdGVyczogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdDtcclxuICBzZWxlY3Rpb25Nb2RlOiBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGU7XHJcbiAgc2VsZWN0ZWRUaWNrZXRzOiBFeHBlbnNlVGlja2V0TGlua0NhcmRbXTtcclxuICBleGNsdWRlZElkczogc3RyaW5nW107XHJcbiAgZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90IHwgbnVsbDtcclxuICBmaWx0ZXJlZFNlbGVjdGlvblRvdGFsOiBudW1iZXI7XHJcbn07XHJcblxyXG5jb25zdCBnZXRTY29wZWRLZXkgPSAoKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gYCR7RVhQRU5TRV9USUNLRVRfTElOS19SRVRVUk5fU1RBVEVfS0VZX1BSRUZJWH1fJHtnZXRFeHBlbnNlU2NvcGVUb2tlbigpfWA7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVGaWxlSWQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplUHJvY2Vzc2VkQnlBaSA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gfCBudWxsID0+IHtcclxuICBpZiAodmFsdWUgPT09IHRydWUgfHwgdmFsdWUgPT09IGZhbHNlKSByZXR1cm4gdmFsdWU7XHJcbiAgaWYgKHZhbHVlID09PSAxIHx8IHZhbHVlID09PSBcIjFcIiB8fCB2YWx1ZSA9PT0gXCJ0cnVlXCIpIHJldHVybiB0cnVlO1xyXG4gIGlmICh2YWx1ZSA9PT0gMCB8fCB2YWx1ZSA9PT0gXCIwXCIgfHwgdmFsdWUgPT09IFwiZmFsc2VcIikgcmV0dXJuIGZhbHNlO1xyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplTnVsbGFibGVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVUaWNrZXRHYXN0b1R5cGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlVGlja2V0TGlua0NhcmRbXCJnYXN0b1R5cGVcIl0gPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XHJcbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgfHwgIUFMTE9XRURfVElDS0VUX0dBU1RPX1RZUEVTLmhhcyhwYXJzZWQpKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgcmV0dXJuIHBhcnNlZCBhcyBFeHBlbnNlVGlja2V0TGlua0NhcmRbXCJnYXN0b1R5cGVcIl07XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVTZWxlY3Rpb25Nb2RlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25Nb2RlID0+IHtcclxuICByZXR1cm4gdmFsdWUgPT09IFwiZmlsdGVyZWRcIiA/IFwiZmlsdGVyZWRcIiA6IFwic2VsZWN0ZWRcIjtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVNlbGVjdGVkVGlja2V0cyA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtdID0+IHtcclxuICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gW107XHJcblxyXG4gIGNvbnN0IGl0ZW1zID0gbmV3IE1hcDxzdHJpbmcsIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZD4oKTtcclxuICBmb3IgKGNvbnN0IGVudHJ5IG9mIHZhbHVlKSB7XHJcbiAgICBjb25zdCBpdGVtID0gKGVudHJ5IHx8IHt9KSBhcyBQYXJ0aWFsPEV4cGVuc2VUaWNrZXRMaW5rQ2FyZD47XHJcbiAgICBjb25zdCBmaWxlSWQgPSBub3JtYWxpemVGaWxlSWQoaXRlbS5maWxlSWQpO1xyXG4gICAgaWYgKCFmaWxlSWQpIGNvbnRpbnVlO1xyXG5cclxuICAgIGl0ZW1zLnNldChmaWxlSWQsIHtcclxuICAgICAga2luZDogXCJsaW5rXCIsXHJcbiAgICAgIGZpbGVJZCxcclxuICAgICAgZGVzY3JpcHRpb246IFN0cmluZyhpdGVtLmRlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKSxcclxuICAgICAgcHJvY2Vzc2VkQnlBSTogbm9ybWFsaXplUHJvY2Vzc2VkQnlBaShpdGVtLnByb2Nlc3NlZEJ5QUkpLFxyXG4gICAgICBjdXJyZW5jeUNvZGU6IFN0cmluZyhpdGVtLmN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCksXHJcbiAgICAgIHRvdGFsQW1vdW50OiBub3JtYWxpemVOdWxsYWJsZU51bWJlcihpdGVtLnRvdGFsQW1vdW50KSxcclxuICAgICAgdHJhbnNEYXRlOiBTdHJpbmcoaXRlbS50cmFuc0RhdGUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgICBmaWxlTmFtZTogU3RyaW5nKGl0ZW0uZmlsZU5hbWUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgICBnYXN0b1R5cGU6IG5vcm1hbGl6ZVRpY2tldEdhc3RvVHlwZShpdGVtLmdhc3RvVHlwZSksXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBBcnJheS5mcm9tKGl0ZW1zLnZhbHVlcygpKTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUV4Y2x1ZGVkSWRzID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nW10gPT4ge1xyXG4gIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiBbXTtcclxuXHJcbiAgY29uc3QgaWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcbiAgZm9yIChjb25zdCBlbnRyeSBvZiB2YWx1ZSkge1xyXG4gICAgY29uc3QgZmlsZUlkID0gbm9ybWFsaXplRmlsZUlkKGVudHJ5KTtcclxuICAgIGlmICghZmlsZUlkKSBjb250aW51ZTtcclxuICAgIGlkcy5hZGQoZmlsZUlkKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBBcnJheS5mcm9tKGlkcyk7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVOb25OZWdhdGl2ZUludGVnZXIgPSAodmFsdWU6IHVua25vd24sIGZhbGxiYWNrID0gMCk6IG51bWJlciA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgJiYgcGFyc2VkID49IDAgPyBNYXRoLmZsb29yKHBhcnNlZCkgOiBmYWxsYmFjaztcclxufTtcclxuXHJcbi8vIE5vcm1hbGl6ZXMgdGhlIGxpbmstbW9kZSB0aWNrZXQgcmV0dXJuIHN0YXRlIHNvIGJhY2sgbmF2aWdhdGlvbiBjYW4gcmVzdG9yZSBmaWx0ZXJzIGFuZCBzZWxlY3Rpb24gc2FmZWx5LlxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgfCBudWxsID0+IHtcclxuICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IHBheWxvYWQgPSB2YWx1ZSBhcyBQYXJ0aWFsPEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGU+O1xyXG4gIGNvbnN0IHNoZWV0SWQgPSBTdHJpbmcocGF5bG9hZC5zaGVldElkIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXNoZWV0SWQpIHJldHVybiBudWxsO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc2hlZXRJZCxcclxuICAgIHBhZ2U6IE1hdGgubWF4KDEsIG5vcm1hbGl6ZU5vbk5lZ2F0aXZlSW50ZWdlcihwYXlsb2FkLnBhZ2UsIDEpKSxcclxuICAgIHNjcm9sbFk6IG5vcm1hbGl6ZU5vbk5lZ2F0aXZlSW50ZWdlcihwYXlsb2FkLnNjcm9sbFkpLFxyXG4gICAgZm9jdXNGaWxlSWQ6IG5vcm1hbGl6ZUZpbGVJZChwYXlsb2FkLmZvY3VzRmlsZUlkKSxcclxuICAgIGZpbHRlcnM6IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdChwYXlsb2FkLmZpbHRlcnMpLFxyXG4gICAgc2VsZWN0aW9uTW9kZTogbm9ybWFsaXplU2VsZWN0aW9uTW9kZShwYXlsb2FkLnNlbGVjdGlvbk1vZGUpLFxyXG4gICAgc2VsZWN0ZWRUaWNrZXRzOiBub3JtYWxpemVTZWxlY3RlZFRpY2tldHMocGF5bG9hZC5zZWxlY3RlZFRpY2tldHMpLFxyXG4gICAgZXhjbHVkZWRJZHM6IG5vcm1hbGl6ZUV4Y2x1ZGVkSWRzKHBheWxvYWQuZXhjbHVkZWRJZHMpLFxyXG4gICAgZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzOiBwYXlsb2FkLmZpbHRlcmVkU2VsZWN0aW9uRmlsdGVyc1xyXG4gICAgICA/IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdChwYXlsb2FkLmZpbHRlcmVkU2VsZWN0aW9uRmlsdGVycylcclxuICAgICAgOiBudWxsLFxyXG4gICAgZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbDogbm9ybWFsaXplTm9uTmVnYXRpdmVJbnRlZ2VyKHBheWxvYWQuZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbCksXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFJlYWRzIGEgc3RvcmVkIGxpbmstbW9kZSByZXR1cm4gc3RhdGUgd2hlbiBpdCBzdGlsbCBtYXRjaGVzIHRoZSBhY3RpdmUgZXhwZW5zZSBzaGVldC5cclxuZXhwb3J0IGNvbnN0IHJlYWRFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlID0gKHNoZWV0SWQ/OiB1bmtub3duKTogRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IHN0b3JlZCA9IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoXHJcbiAgICBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnk8RXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZT4oZ2V0U2NvcGVkS2V5KCkpXHJcbiAgKTtcclxuICBpZiAoIXN0b3JlZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IHNhZmVTaGVldElkID0gU3RyaW5nKHNoZWV0SWQgfHwgXCJcIikudHJpbSgpO1xyXG4gIGlmICghc2FmZVNoZWV0SWQpIHJldHVybiBzdG9yZWQ7XHJcbiAgcmV0dXJuIHN0b3JlZC5zaGVldElkLnRvVXBwZXJDYXNlKCkgPT09IHNhZmVTaGVldElkLnRvVXBwZXJDYXNlKCkgPyBzdG9yZWQgOiBudWxsO1xyXG59O1xyXG5cclxuLy8gUGVyc2lzdHMgdGhlIG1pbmltdW0gbGluay1tb2RlIHN0YXRlIHJlcXVpcmVkIHRvIHJldHVybiBmcm9tIHRpY2tldCBkZXRhaWwgd2l0aG91dCBsb3Npbmcgc2VsZWN0aW9uLlxyXG5leHBvcnQgY29uc3Qgc2F2ZUV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgPSAoXHJcbiAgdmFsdWU6IEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgfCBudWxsIHwgdW5kZWZpbmVkXHJcbik6IEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgfCBudWxsID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSh2YWx1ZSk7XHJcbiAgaWYgKCFub3JtYWxpemVkKSB7XHJcbiAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5KGdldFNjb3BlZEtleSgpLCBub3JtYWxpemVkLCBFWFBFTlNFX1RJQ0tFVF9MSU5LX1JFVFVSTl9TVEFURV9UVExfTVMpO1xyXG4gIHJldHVybiBub3JtYWxpemVkO1xyXG59O1xyXG5cclxuLy8gQ2xlYXJzIGFueSBzdG9yZWQgbGluay1tb2RlIHJldHVybiBzdGF0ZSBmb3IgdGhlIGN1cnJlbnQgZXhwZW5zZSBzY29wZS5cclxuZXhwb3J0IGNvbnN0IGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSA9ICgpOiB2b2lkID0+IHtcclxuICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGdldFNjb3BlZEtleSgpKTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcclxuICBFeHBlbnNlVGlja2V0TGlua0NhcmQsXHJcbiAgRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25Nb2RlLFxyXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uU3RhdGUgPSB7XHJcbiAgc2VsZWN0aW9uTW9kZTogRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25Nb2RlO1xyXG4gIHNlbGVjdGVkVGlja2V0czogRXhwZW5zZVRpY2tldExpbmtDYXJkW107XHJcbiAgZXhjbHVkZWRJZHM6IHN0cmluZ1tdO1xyXG4gIGZpbHRlcmVkU25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfCBudWxsO1xyXG4gIGZpbHRlcmVkVG90YWxDb3VudDogbnVtYmVyO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplRmlsZUlkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XHJcblxyXG5jb25zdCBub3JtYWxpemVTZWxlY3Rpb25Nb2RlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25Nb2RlID0+IHtcclxuICByZXR1cm4gdmFsdWUgPT09IFwiZmlsdGVyZWRcIiA/IFwiZmlsdGVyZWRcIiA6IFwic2VsZWN0ZWRcIjtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUV4Y2x1ZGVkSWRzID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nW10gPT4ge1xyXG4gIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiBbXTtcclxuXHJcbiAgY29uc3QgaWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcbiAgZm9yIChjb25zdCBlbnRyeSBvZiB2YWx1ZSkge1xyXG4gICAgY29uc3QgZmlsZUlkID0gbm9ybWFsaXplRmlsZUlkKGVudHJ5KTtcclxuICAgIGlmICghZmlsZUlkKSBjb250aW51ZTtcclxuICAgIGlkcy5hZGQoZmlsZUlkKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBBcnJheS5mcm9tKGlkcyk7XHJcbn07XHJcblxyXG5jb25zdCB0b1NlbGVjdGVkTWFwID0gKGl0ZW1zOiBFeHBlbnNlVGlja2V0TGlua0NhcmRbXSk6IFJlY29yZDxzdHJpbmcsIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZD4gPT4ge1xyXG4gIGNvbnN0IG5leHQ6IFJlY29yZDxzdHJpbmcsIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZD4gPSB7fTtcclxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgIGNvbnN0IGZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZChpdGVtLmZpbGVJZCk7XHJcbiAgICBpZiAoIWZpbGVJZCkgY29udGludWU7XHJcbiAgICBuZXh0W2ZpbGVJZF0gPSBpdGVtO1xyXG4gIH1cclxuICByZXR1cm4gbmV4dDtcclxufTtcclxuXHJcbi8vIEtlZXBzIGxpbmstbW9kZSB0aWNrZXQgc2VsZWN0aW9uIHN0YWJsZSBhY3Jvc3MgcGFnaW5nLCBmaWx0ZXJlZCBzZWxlY3QtYWxsLCBhbmQgZGV0YWlsIHJldHVybnMuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbiA9ICgpID0+IHtcclxuICBjb25zdCBbc2VsZWN0aW9uTW9kZSwgc2V0U2VsZWN0aW9uTW9kZV0gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGU+KFwic2VsZWN0ZWRcIik7XHJcbiAgY29uc3QgW3NlbGVjdGVkVGlja2V0c0J5SWQsIHNldFNlbGVjdGVkVGlja2V0c0J5SWRdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgRXhwZW5zZVRpY2tldExpbmtDYXJkPj4oe30pO1xyXG4gIGNvbnN0IFtleGNsdWRlZElkcywgc2V0RXhjbHVkZWRJZHNdID0gdXNlU3RhdGU8c3RyaW5nW10+KFtdKTtcclxuICBjb25zdCBbZmlsdGVyZWRTbmFwc2hvdCwgc2V0RmlsdGVyZWRTbmFwc2hvdF0gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2ZpbHRlcmVkVG90YWxDb3VudCwgc2V0RmlsdGVyZWRUb3RhbENvdW50XSA9IHVzZVN0YXRlKDApO1xyXG5cclxuICBjb25zdCBzZWxlY3RlZFRpY2tldHMgPSB1c2VNZW1vKCgpID0+IE9iamVjdC52YWx1ZXMoc2VsZWN0ZWRUaWNrZXRzQnlJZCksIFtzZWxlY3RlZFRpY2tldHNCeUlkXSk7XHJcbiAgY29uc3QgZXhjbHVkZWRJZFNldCA9IHVzZU1lbW8oKCkgPT4gbmV3IFNldChleGNsdWRlZElkcyksIFtleGNsdWRlZElkc10pO1xyXG4gIGNvbnN0IGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUgPSBzZWxlY3Rpb25Nb2RlID09PSBcImZpbHRlcmVkXCIgJiYgISFmaWx0ZXJlZFNuYXBzaG90O1xyXG5cclxuICBjb25zdCBjbGVhclNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFNlbGVjdGlvbk1vZGUoXCJzZWxlY3RlZFwiKTtcclxuICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQoe30pO1xyXG4gICAgc2V0RXhjbHVkZWRJZHMoW10pO1xyXG4gICAgc2V0RmlsdGVyZWRTbmFwc2hvdChudWxsKTtcclxuICAgIHNldEZpbHRlcmVkVG90YWxDb3VudCgwKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHJlc3RvcmVTZWxlY3Rpb24gPSB1c2VDYWxsYmFjaygoc3RhdGU6IEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uU3RhdGUgfCBudWxsIHwgdW5kZWZpbmVkKSA9PiB7XHJcbiAgICBpZiAoIXN0YXRlKSB7XHJcbiAgICAgIGNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBub3JtYWxpemVkTW9kZSA9IG5vcm1hbGl6ZVNlbGVjdGlvbk1vZGUoc3RhdGUuc2VsZWN0aW9uTW9kZSk7XHJcbiAgICBjb25zdCBub3JtYWxpemVkU2VsZWN0ZWRUaWNrZXRzID0gQXJyYXkuaXNBcnJheShzdGF0ZS5zZWxlY3RlZFRpY2tldHMpID8gc3RhdGUuc2VsZWN0ZWRUaWNrZXRzIDogW107XHJcbiAgICBjb25zdCBub3JtYWxpemVkU25hcHNob3QgPSBzdGF0ZS5maWx0ZXJlZFNuYXBzaG90IHx8IG51bGw7XHJcbiAgICBjb25zdCBub3JtYWxpemVkRXhjbHVkZWRJZHMgPSBub3JtYWxpemVFeGNsdWRlZElkcyhzdGF0ZS5leGNsdWRlZElkcyk7XHJcbiAgICBjb25zdCBub3JtYWxpemVkRmlsdGVyZWRUb3RhbCA9IE51bWJlci5pc0Zpbml0ZShOdW1iZXIoc3RhdGUuZmlsdGVyZWRUb3RhbENvdW50KSlcclxuICAgICAgPyBNYXRoLm1heCgwLCBNYXRoLmZsb29yKE51bWJlcihzdGF0ZS5maWx0ZXJlZFRvdGFsQ291bnQpKSlcclxuICAgICAgOiAwO1xyXG5cclxuICAgIHNldFNlbGVjdGlvbk1vZGUobm9ybWFsaXplZE1vZGUgPT09IFwiZmlsdGVyZWRcIiAmJiBub3JtYWxpemVkU25hcHNob3QgPyBcImZpbHRlcmVkXCIgOiBcInNlbGVjdGVkXCIpO1xyXG4gICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZCh0b1NlbGVjdGVkTWFwKG5vcm1hbGl6ZWRTZWxlY3RlZFRpY2tldHMpKTtcclxuICAgIHNldEV4Y2x1ZGVkSWRzKG5vcm1hbGl6ZWRNb2RlID09PSBcImZpbHRlcmVkXCIgPyBub3JtYWxpemVkRXhjbHVkZWRJZHMgOiBbXSk7XHJcbiAgICBzZXRGaWx0ZXJlZFNuYXBzaG90KG5vcm1hbGl6ZWRNb2RlID09PSBcImZpbHRlcmVkXCIgPyBub3JtYWxpemVkU25hcHNob3QgOiBudWxsKTtcclxuICAgIHNldEZpbHRlcmVkVG90YWxDb3VudChub3JtYWxpemVkTW9kZSA9PT0gXCJmaWx0ZXJlZFwiID8gbm9ybWFsaXplZEZpbHRlcmVkVG90YWwgOiAwKTtcclxuICB9LCBbY2xlYXJTZWxlY3Rpb25dKTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0QWxsQnlGaWx0ZXJzID0gdXNlQ2FsbGJhY2soKHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LCB0b3RhbENvdW50OiBudW1iZXIpID0+IHtcclxuICAgIHNldFNlbGVjdGlvbk1vZGUoXCJmaWx0ZXJlZFwiKTtcclxuICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQoe30pO1xyXG4gICAgc2V0RXhjbHVkZWRJZHMoW10pO1xyXG4gICAgc2V0RmlsdGVyZWRTbmFwc2hvdChzbmFwc2hvdCk7XHJcbiAgICBzZXRGaWx0ZXJlZFRvdGFsQ291bnQoTnVtYmVyLmlzRmluaXRlKHRvdGFsQ291bnQpID8gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcih0b3RhbENvdW50KSkgOiAwKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGlzU2VsZWN0ZWQgPSB1c2VDYWxsYmFjayhcclxuICAgIChmaWxlSWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICBjb25zdCBzYWZlRmlsZUlkID0gbm9ybWFsaXplRmlsZUlkKGZpbGVJZCk7XHJcbiAgICAgIGlmICghc2FmZUZpbGVJZCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgaWYgKGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUpIHtcclxuICAgICAgICByZXR1cm4gIWV4Y2x1ZGVkSWRTZXQuaGFzKHNhZmVGaWxlSWQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gISFzZWxlY3RlZFRpY2tldHNCeUlkW3NhZmVGaWxlSWRdO1xyXG4gICAgfSxcclxuICAgIFtleGNsdWRlZElkU2V0LCBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlLCBzZWxlY3RlZFRpY2tldHNCeUlkXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHRvZ2dsZVRpY2tldCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHRpY2tldDogRXhwZW5zZVRpY2tldExpbmtDYXJkKSA9PiB7XHJcbiAgICAgIGNvbnN0IGZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZCh0aWNrZXQuZmlsZUlkKTtcclxuICAgICAgaWYgKCFmaWxlSWQpIHJldHVybjtcclxuXHJcbiAgICAgIGlmIChpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlKSB7XHJcbiAgICAgICAgc2V0RXhjbHVkZWRJZHMoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBuZXh0ID0gbmV3IFNldChwcmV2aW91cyk7XHJcbiAgICAgICAgICBpZiAobmV4dC5oYXMoZmlsZUlkKSkge1xyXG4gICAgICAgICAgICBuZXh0LmRlbGV0ZShmaWxlSWQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV4dC5hZGQoZmlsZUlkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBBcnJheS5mcm9tKG5leHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZCgocHJldmlvdXMpID0+IHtcclxuICAgICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2aW91cyB9O1xyXG4gICAgICAgIGlmIChuZXh0W2ZpbGVJZF0pIHtcclxuICAgICAgICAgIGRlbGV0ZSBuZXh0W2ZpbGVJZF07XHJcbiAgICAgICAgICByZXR1cm4gbmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV4dFtmaWxlSWRdID0gdGlja2V0O1xyXG4gICAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZV1cclxuICApO1xyXG5cclxuICBjb25zdCBoeWRyYXRlVmlzaWJsZVRpY2tldHMgPSB1c2VDYWxsYmFjaygoaXRlbXM6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtdKSA9PiB7XHJcbiAgICBpZiAoc2VsZWN0aW9uTW9kZSAhPT0gXCJzZWxlY3RlZFwiIHx8IGl0ZW1zLmxlbmd0aCA8IDEpIHJldHVybjtcclxuXHJcbiAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKChwcmV2aW91cykgPT4ge1xyXG4gICAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2aW91cyB9O1xyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgICAgICBjb25zdCBmaWxlSWQgPSBub3JtYWxpemVGaWxlSWQoaXRlbS5maWxlSWQpO1xyXG4gICAgICAgIGlmICghZmlsZUlkIHx8ICFuZXh0W2ZpbGVJZF0pIGNvbnRpbnVlO1xyXG4gICAgICAgIG5leHRbZmlsZUlkXSA9IGl0ZW07XHJcbiAgICAgICAgY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGNoYW5nZWQgPyBuZXh0IDogcHJldmlvdXM7XHJcbiAgICB9KTtcclxuICB9LCBbc2VsZWN0aW9uTW9kZV0pO1xyXG5cclxuICBjb25zdCByZXNvbHZlU2VsZWN0ZWRDb3VudCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGZhbGxiYWNrVG90YWxDb3VudCA9IDApOiBudW1iZXIgPT4ge1xyXG4gICAgICBpZiAoIWlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUpIHtcclxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRUaWNrZXRzLmxlbmd0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgYmFzZUNvdW50ID0gZmlsdGVyZWRUb3RhbENvdW50ID4gMCA/IGZpbHRlcmVkVG90YWxDb3VudCA6IE1hdGgubWF4KDAsIE1hdGguZmxvb3IoZmFsbGJhY2tUb3RhbENvdW50KSk7XHJcbiAgICAgIHJldHVybiBNYXRoLm1heCgwLCBiYXNlQ291bnQgLSBleGNsdWRlZElkcy5sZW5ndGgpO1xyXG4gICAgfSxcclxuICAgIFtleGNsdWRlZElkcy5sZW5ndGgsIGZpbHRlcmVkVG90YWxDb3VudCwgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSwgc2VsZWN0ZWRUaWNrZXRzLmxlbmd0aF1cclxuICApO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc2VsZWN0aW9uTW9kZSxcclxuICAgIHNlbGVjdGVkVGlja2V0cyxcclxuICAgIGV4Y2x1ZGVkSWRzLFxyXG4gICAgZmlsdGVyZWRTbmFwc2hvdCxcclxuICAgIGZpbHRlcmVkVG90YWxDb3VudCxcclxuICAgIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUsXHJcbiAgICBpc1NlbGVjdGVkLFxyXG4gICAgdG9nZ2xlVGlja2V0LFxyXG4gICAgY2xlYXJTZWxlY3Rpb24sXHJcbiAgICByZXN0b3JlU2VsZWN0aW9uLFxyXG4gICAgc2VsZWN0QWxsQnlGaWx0ZXJzLFxyXG4gICAgaHlkcmF0ZVZpc2libGVUaWNrZXRzLFxyXG4gICAgcmVzb2x2ZVNlbGVjdGVkQ291bnQsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZHVjZXIgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZFJlcXVlc3QgPSB7XHJcbiAgcGFnZTogbnVtYmVyO1xyXG4gIHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90O1xyXG4gIGNsZWFyQ2FjaGU6IGJvb2xlYW47XHJcbiAgcmVzZXRCZWZvcmVMb2FkOiBib29sZWFuO1xyXG4gIHdhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHk6IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIEF1dG9tYXRpY0xvYWRBY3Rpb24gPVxyXG4gIHwge1xyXG4gICAgICB0eXBlOiBcInNjaGVkdWxlXCI7XHJcbiAgICAgIHJlcXVlc3Q6IEV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkUmVxdWVzdDtcclxuICAgIH1cclxuICB8IHtcclxuICAgICAgdHlwZTogXCJjbGVhclwiO1xyXG4gICAgfVxyXG4gIHwge1xyXG4gICAgICB0eXBlOiBcImRpc2FibGVfbGlua193YWl0XCI7XHJcbiAgICB9O1xyXG5cclxuY29uc3QgYXV0b21hdGljTG9hZFJlZHVjZXIgPSAoXHJcbiAgc3RhdGU6IEV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkUmVxdWVzdCB8IG51bGwsXHJcbiAgYWN0aW9uOiBBdXRvbWF0aWNMb2FkQWN0aW9uXHJcbik6IEV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkUmVxdWVzdCB8IG51bGwgPT4ge1xyXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgIGNhc2UgXCJzY2hlZHVsZVwiOlxyXG4gICAgICByZXR1cm4gYWN0aW9uLnJlcXVlc3Q7XHJcbiAgICBjYXNlIFwiY2xlYXJcIjpcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICBjYXNlIFwiZGlzYWJsZV9saW5rX3dhaXRcIjpcclxuICAgICAgcmV0dXJuIHN0YXRlID8geyAuLi5zdGF0ZSwgd2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeTogZmFsc2UgfSA6IG51bGw7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gc3RhdGU7XHJcbiAgfVxyXG59O1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZEFyZ3MgPSB7XHJcbiAgaXNMaW5rTW9kZTogYm9vbGVhbjtcclxuICBjYW5Qcm9jZXNzTGlua01vZGU6IGJvb2xlYW47XHJcbiAgbGlua1NoZWV0Q2hlY2tCdXN5OiBib29sZWFuO1xyXG4gIGxpbmtTaGVldExvY2tlZDogYm9vbGVhbjtcclxuICBjbGVhckxpc3RDYWNoZTogKCkgPT4gdm9pZDtcclxuICByZXNldExpc3Q6IChzb3VyY2U/OiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgbG9hZExpc3Q6IChwYWdlOiBudW1iZXIsIHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiBQcm9taXNlPHZvaWQ+O1xyXG59O1xyXG5cclxuY29uc3QgRVhQRU5TRV9USUNLRVRTX0FVVE9fTE9BRF9MT0dfUFJFRklYID0gXCJbZXhwZW5zZS10aWNrZXRzOmF1dG8tbG9hZF1cIjtcclxuXHJcbmNvbnN0IGxvZ0V4cGVuc2VUaWNrZXRzQXV0b0xvYWRJbmZvID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xyXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS5pbmZvID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGNvbnNvbGUuaW5mbyhFWFBFTlNFX1RJQ0tFVFNfQVVUT19MT0FEX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGxvZ0V4cGVuc2VUaWNrZXRzQXV0b0xvYWRXYXJuID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xyXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS53YXJuID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGNvbnNvbGUud2FybihFWFBFTlNFX1RJQ0tFVFNfQVVUT19MT0FEX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIFF1ZXVlcyBvbmUgdGlja2V0IGxpc3QgcmVsb2FkIGFuZCByZWxlYXNlcyBpdCBvbmx5IHdoZW4gbGluay1tb2RlIHByZWNvbmRpdGlvbnMgYXJlIHJlYWR5LlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWQgPSAoe1xyXG4gIGlzTGlua01vZGUsXHJcbiAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxyXG4gIGxpbmtTaGVldENoZWNrQnVzeSxcclxuICBsaW5rU2hlZXRMb2NrZWQsXHJcbiAgY2xlYXJMaXN0Q2FjaGUsXHJcbiAgcmVzZXRMaXN0LFxyXG4gIGxvYWRMaXN0LFxyXG59OiBVc2VFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZEFyZ3MpID0+IHtcclxuICBjb25zdCBbcGVuZGluZ0F1dG9tYXRpY0xvYWQsIGRpc3BhdGNoXSA9IHVzZVJlZHVjZXIoYXV0b21hdGljTG9hZFJlZHVjZXIsIG51bGwpO1xyXG5cclxuICBjb25zdCBydW5BdXRvbWF0aWNMaXN0TG9hZCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKFxyXG4gICAgICBwYWdlOiBudW1iZXIsXHJcbiAgICAgIHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxyXG4gICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgY2xlYXJDYWNoZT86IGJvb2xlYW47XHJcbiAgICAgICAgcmVzZXRCZWZvcmVMb2FkPzogYm9vbGVhbjtcclxuICAgICAgICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5PzogYm9vbGVhbjtcclxuICAgICAgfSA9IHt9XHJcbiAgICApID0+IHtcclxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZEluZm8oXCJydW5BdXRvbWF0aWNMaXN0TG9hZDpzY2hlZHVsZVwiLCB7XHJcbiAgICAgICAgcGFnZSxcclxuICAgICAgICBzbmFwc2hvdCxcclxuICAgICAgICBvcHRpb25zLFxyXG4gICAgICB9KTtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwic2NoZWR1bGVcIixcclxuICAgICAgICByZXF1ZXN0OiB7XHJcbiAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgc25hcHNob3QsXHJcbiAgICAgICAgICBjbGVhckNhY2hlOiBvcHRpb25zLmNsZWFyQ2FjaGUgPT09IHRydWUsXHJcbiAgICAgICAgICByZXNldEJlZm9yZUxvYWQ6IG9wdGlvbnMucmVzZXRCZWZvcmVMb2FkID09PSB0cnVlLFxyXG4gICAgICAgICAgd2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeTogb3B0aW9ucy53YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5ID09PSB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghcGVuZGluZ0F1dG9tYXRpY0xvYWQpIHJldHVybjtcclxuXHJcbiAgICBpZiAocGVuZGluZ0F1dG9tYXRpY0xvYWQud2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeSkge1xyXG4gICAgICBpZiAoIWlzTGlua01vZGUpIHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkV2FybihcInBlbmRpbmdBdXRvbWF0aWNMb2FkOmRpc2FibGUtbGluay13YWl0XCIsIHtcclxuICAgICAgICAgIHBhZ2U6IHBlbmRpbmdBdXRvbWF0aWNMb2FkLnBhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcImRpc2FibGVfbGlua193YWl0XCIgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWNhblByb2Nlc3NMaW5rTW9kZSB8fCBsaW5rU2hlZXRDaGVja0J1c3kpIHtcclxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkSW5mbyhcInBlbmRpbmdBdXRvbWF0aWNMb2FkOndhaXRpbmctbGluay1tb2RlLXJlYWR5XCIsIHtcclxuICAgICAgICAgIHBhZ2U6IHBlbmRpbmdBdXRvbWF0aWNMb2FkLnBhZ2UsXHJcbiAgICAgICAgICBjYW5Qcm9jZXNzTGlua01vZGUsXHJcbiAgICAgICAgICBsaW5rU2hlZXRDaGVja0J1c3ksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobGlua1NoZWV0TG9ja2VkKSB7XHJcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZFdhcm4oXCJwZW5kaW5nQXV0b21hdGljTG9hZDpjbGVhci1saW5rLWxvY2tlZFwiLCB7XHJcbiAgICAgICAgICBwYWdlOiBwZW5kaW5nQXV0b21hdGljTG9hZC5wYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJjbGVhclwiIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHsgcGFnZSwgc25hcHNob3QsIGNsZWFyQ2FjaGUsIHJlc2V0QmVmb3JlTG9hZCB9ID0gcGVuZGluZ0F1dG9tYXRpY0xvYWQ7XHJcbiAgICBkaXNwYXRjaCh7IHR5cGU6IFwiY2xlYXJcIiB9KTtcclxuICAgIGxvZ0V4cGVuc2VUaWNrZXRzQXV0b0xvYWRJbmZvKFwicGVuZGluZ0F1dG9tYXRpY0xvYWQ6ZXhlY3V0ZVwiLCB7XHJcbiAgICAgIHBhZ2UsXHJcbiAgICAgIHNuYXBzaG90LFxyXG4gICAgICBjbGVhckNhY2hlLFxyXG4gICAgICByZXNldEJlZm9yZUxvYWQsXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoY2xlYXJDYWNoZSkge1xyXG4gICAgICBjbGVhckxpc3RDYWNoZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXNldEJlZm9yZUxvYWQpIHtcclxuICAgICAgcmVzZXRMaXN0KFwiYXV0b21hdGljLWxvYWQ6cmVzZXQtYmVmb3JlLWxvYWRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgdm9pZCBsb2FkTGlzdChwYWdlLCBzbmFwc2hvdCk7XHJcbiAgfSwgW1xyXG4gICAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxyXG4gICAgY2xlYXJMaXN0Q2FjaGUsXHJcbiAgICBpc0xpbmtNb2RlLFxyXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gICAgbGlua1NoZWV0TG9ja2VkLFxyXG4gICAgbG9hZExpc3QsXHJcbiAgICBwZW5kaW5nQXV0b21hdGljTG9hZCxcclxuICAgIHJlc2V0TGlzdCxcclxuICBdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkLFxyXG4gIH07XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUFrRzs7O0FDQWxHLG1CQUFtQztBQXlEN0I7QUFyQ04sSUFBTSxnQ0FBZ0MsQ0FBQztBQUFBLEVBQ3JDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNG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VSxnQkFBZ0IsaUJBQWlCLHNCQUFzQjtBQUFBO0FBQUEsSUFDbkUsR0FDRixJQUNFO0FBQUEsSUFFSCxtQkFBbUIsQ0FBQyxhQUNuQjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsV0FBVyxLQUFLLDZCQUE2QixxQkFBa0I7QUFBQSxRQUMvRCxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixlQUFlLEtBQUssNkJBQTZCLHFCQUFrQjtBQUFBLFFBQ25FLFdBQVc7QUFBQTtBQUFBLElBQ2IsSUFDRTtBQUFBLEtBQ047QUFFSjtBQUdBLElBQU0scUJBQXFCLE1BQU07QUFDL0IsU0FDRSw2Q0FBQyxnQ0FBcUIseUJBQXVCLE1BQzNDLHVEQUFDLDZCQUEwQixHQUM3QjtBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsMEJBQXdCO0FBQ3hCLFFBQU0sU0FBUyxTQUFTLGVBQWUsc0JBQXNCO0FBQzdELE1BQUksQ0FBQyxPQUFRO0FBQ2IsbUJBQWlCLFFBQVEsNkNBQUMsc0JBQW1CLENBQUU7QUFDakQ7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLDZCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIm5vcm1hbGl6ZUZpbGVJZCIsICJub3JtYWxpemVTZWxlY3Rpb25Nb2RlIiwgIm5vcm1hbGl6ZUV4Y2x1ZGVkSWRzIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiLCAiaXNMaW5rTW9kZSIsICJmcm9tRGF0ZSIsICJjdXJyZW5jeUNvZGUiLCAiY2FjaGVkU3RhdGUiXQp9Cg==
