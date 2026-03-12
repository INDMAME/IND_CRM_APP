import {
  CheckIcon_default
} from "./chunks/chunk-UZXCWQLB.js";
import {
  useTapGuard
} from "./chunks/chunk-LNRXPS4I.js";
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
} from "./chunks/chunk-OJJYZ7S5.js";
import {
  HistorySummary_default
} from "./chunks/chunk-7Z3NMBR5.js";
import {
  getExpenseTicketStatusFilterOptions,
  getExpenseTicketStatusLabel,
  normalizeExpenseTicketFilterSnapshot,
  normalizeExpenseTicketStatusFilterCode,
  useExpenseTicketsFilterCache
} from "./chunks/chunk-NP4ZRIL5.js";
import {
  mapWindowEnumOptions
} from "./chunks/chunk-BVPBMOU4.js";
import {
  PageBottomActionButton,
  PageBottomActions_default,
  TICKET_IMAGE_ACCEPT_ATTRIBUTE,
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-APC6Z54Z.js";
import {
  resolveExpenseSheetDetailPolicy
} from "./chunks/chunk-YSFQS4W5.js";
import "./chunks/chunk-W2YOA3BT.js";
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
} from "./chunks/chunk-KAFREVR7.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-YGPFKAYG.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-FRQBPU47.js";
import "./chunks/chunk-6YXFJB4W.js";
import {
  buildExpenseSheetDetailUrl,
  clearExpenseTicketReturnContext,
  isManagingOtherExpenseRecord,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-Y5PZ7OL7.js";
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
} from "./chunks/chunk-HJEMXS35.js";
import {
  configureExpenseApiAuth,
  fetchExpenseSheetDetail,
  fetchExpenseSheetTicketLinkList,
  fetchExpenseSheetTicketsList,
  linkExpenseSheetTicketsBulk,
  mapExpenseSheetHeader
} from "./chunks/chunk-TEKR5JYL.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-DYKRM7YP.js";
import {
  clearExpenseActingUserOverride,
  getExpenseScopeToken,
  setExpenseActingUserOverride,
  toExpenseIsoDate
} from "./chunks/chunk-MJTGTPH5.js";
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
var HOLD_TO_SELECT_MS = 380;
var HOLD_MOVE_PX = 16;
var ExpenseTicketLinkTimelineItem = ({
  fileId,
  dateParts,
  title,
  subtitle,
  amountText,
  isSelected,
  isSelectable,
  interactionDisabled,
  processedByAI,
  processedByAiLabel,
  selectLabel,
  onOpenDetail,
  onToggleSelect
}) => {
  const handleTap = (0, import_react.useCallback)(
    (event) => {
      event.preventDefault();
      if (interactionDisabled) return;
      onOpenDetail();
    },
    [interactionDisabled, onOpenDetail]
  );
  const handleHold = (0, import_react.useCallback)(() => {
    if (interactionDisabled || !isSelectable) return false;
    onToggleSelect();
    return true;
  }, [interactionDisabled, isSelectable, onToggleSelect]);
  const tapGuard = useTapGuard(handleTap, handleHold, {
    holdMs: HOLD_TO_SELECT_MS,
    movePx: HOLD_MOVE_PX
  });
  const selectionIndicatorToneClassName = isSelected ? "border-primary bg-primary text-white shadow-sm" : isSelectable ? "border-slate-300 bg-white text-transparent" : "border-slate-200 bg-slate-100 text-transparent";
  const statusIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "span",
      {
        className: `inline-flex h-4 w-4 items-center justify-center rounded-[var(--radius-xl)] border transition ${selectionIndicatorToneClassName}`,
        "aria-hidden": "true",
        title: selectLabel,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon_default, { className: "h-3 w-3", strokeWidth: 2.2 })
      }
    ),
    processedByAI ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "span",
      {
        className: "expense-ticket-card__status-icon expense-ticket-card__status-icon--ai",
        role: "img",
        "aria-label": processedByAiLabel,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "h-4 w-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 18l4-12l4 12" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 13h4" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 6h6" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M17 6v12" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 18h6" })
        ] })
      }
    ) : null
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: isSelected ? "timeline-item rounded-2xl ring-2 ring-primary/30" : "timeline-item",
      "data-ticket-file-id": fileId || void 0,
      "data-ticket-selected": isSelected ? "true" : "false",
      "data-ticket-selectable": isSelectable && !interactionDisabled ? "true" : "false",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ExpenseTimelineCard_default,
        {
          dateParts,
          title,
          subtitle,
          amountText,
          onOpen: onOpenDetail,
          titleClassName: "expense-ticket-card__title timeline-name",
          statusIcon,
          statusIconClassName: "expense-ticket-card__status-icons",
          interactionProps: {
            tabIndex: interactionDisabled ? -1 : 0,
            "aria-label": title,
            "aria-pressed": isSelected,
            onPointerDown: tapGuard.onPointerDown,
            onPointerMove: tapGuard.onPointerMove,
            onPointerUp: tapGuard.onPointerUp,
            onPointerCancel: tapGuard.onPointerCancel,
            onContextMenu: (event) => {
              event.preventDefault();
            },
            onClick: (event) => {
              event.preventDefault();
            },
            onKeyDown: (event) => {
              if (interactionDisabled) return;
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onOpenDetail();
              }
            }
          }
        }
      )
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
    errorMessage: quickTicketErrorMessage,
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
    !isLinkMode && quickTicketBusy ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/35 px-4", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "glass-panel shadow-card flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-700", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Spinner_default, { size: "h-5 w-5", label: indT("Common_Loading", "Loading") }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: quickTicketProgressMessage || indT("Common_Loading", "Loading") })
    ] }) }) : null,
    !isLinkMode && quickTicketErrorMessage ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "div",
      {
        className: hasPartialTicketFailure ? "glass-panel shadow-card space-y-2 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900" : "glass-panel shadow-card space-y-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: quickTicketErrorMessage }),
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
      canProcessLinkMode && !linkSheetCheckBusy && !linkSheetLocked ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "text-xs text-slate-600", children: [
          indT("Nav_ExpenseTickets", "Tickets"),
          ": ",
          selectedTicketCount
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "grid grid-cols-2 gap-1.5 pt-0.5", children: [
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
        ] })
      ] }) : null
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
            interactionDisabled: linkFlowBusy || linkSheetCheckBusy || linkSheetLocked,
            processedByAI: item.processedByAI,
            processedByAiLabel,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL0V4cGVuc2VUaWNrZXRzUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL3VzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZUxheW91dEVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uLCB7IHR5cGUgRmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbSB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgUGFnZUJvdHRvbUFjdGlvbnMsIHsgUGFnZUJvdHRvbUFjdGlvbkJ1dHRvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUGFnZUJvdHRvbUFjdGlvbnMudHN4XCI7XG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4XCI7XG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCwgdHlwZSBBdXRoTWFuYWdlZFVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcbmltcG9ydCBFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbS50c3hcIjtcbmltcG9ydCBFeHBlbnNlVGlja2V0TGlua0J1bGtTdW1tYXJ5IGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5rQnVsa1N1bW1hcnkudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWwgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWwudHN4XCI7XG5pbXBvcnQgeyBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgfSBmcm9tIFwiLi4vZXhwZW5zZUZvcm1hdHRlcnMudHNcIjtcbmltcG9ydCB7IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcbmltcG9ydCB7XG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoLFxuICBsaW5rRXhwZW5zZVNoZWV0VGlja2V0c0J1bGssXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBjbGVhckV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUsIHNldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFjdGluZ1VzZXIudHNcIjtcbmltcG9ydCB7IHRvRXhwZW5zZUlzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xuaW1wb3J0IHsgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLCBuYXZpZ2F0ZVRvRXhwZW5zZVVybCwgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuaW1wb3J0IHsgbWFwV2luZG93RW51bU9wdGlvbnMsIHR5cGUgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuaW1wb3J0IHtcbiAgYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwsXG4gIGNsZWFyRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXG4gIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XG5pbXBvcnQgeyBoYXNFeHBlbnNlUmV0dXJuUmVmZXJyZXIsIGlzRXhwZW5zZUhpc3RvcnlCYWNrRm9yd2FyZE5hdmlnYXRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUhpc3RvcnlOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzLCBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIHNhZmVUZXh0LCBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0RmxvdyB9IGZyb20gXCIuLi9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93LnRzXCI7XG5pbXBvcnQgeyBUSUNLRVRfSU1BR0VfQUNDRVBUX0FUVFJJQlVURSB9IGZyb20gXCIuLi9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93Q29yZS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGEudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUsIHR5cGUgRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUudHNcIjtcbmltcG9ydCB7XG4gIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSxcbiAgcmVhZEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsXG4gIHNhdmVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLnRzXCI7XG5pbXBvcnQgeyBidWlsZEV4cGVuc2VUaWNrZXRMaW5rQnVsa0ZpbHRlcnMgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVBheWxvYWRCdWlsZGVycy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0byB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcbiAgRXhwZW5zZVRpY2tldExpbmtDYXJkLFxuICBFeHBlbnNlVGlja2V0TGlzdFBhZ2VJdGVtLFxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbiB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZCB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlLnRzXCI7XG5pbXBvcnQgeyBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5IGFzIHJldmVhbFRvcGJhckFjdGlvbkdyb3VwIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RvcGJhckFjdGlvblZpc2liaWxpdHkudHNcIjtcblxuY29uc3QgUEFHRV9TSVpFID0gMTA7XG5jb25zdCBBTExPV0VEX0dBU1RPX1RZUEVTID0gbmV3IFNldDxudW1iZXI+KFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0pO1xuXG5jb25zdCBHQVNUT19UWVBFX0xBQkVMX0tFWVM6IFJlY29yZDxudW1iZXIsIHsga2V5OiBzdHJpbmc7IGZhbGxiYWNrOiBzdHJpbmcgfT4gPSB7XG4gIDA6IHsga2V5OiBcIkVudW1fTm9uZVwiLCBmYWxsYmFjazogXCJOb25lXCIgfSxcbiAgMTogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfUGVhamVcIiwgZmFsbGJhY2s6IFwiUGVhamVcIiB9LFxuICAyOiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9QYXJraW5nXCIsIGZhbGxiYWNrOiBcIlBhcmtpbmdcIiB9LFxuICAzOiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9LbVwiLCBmYWxsYmFjazogXCJLbVwiIH0sXG4gIDQ6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0Rlc2F5dW5vXCIsIGZhbGxiYWNrOiBcIkRlc2F5dW5vXCIgfSxcbiAgNTogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfQ29taWRhXCIsIGZhbGxiYWNrOiBcIkNvbWlkYVwiIH0sXG4gIDY6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0NlbmFcIiwgZmFsbGJhY2s6IFwiQ2VuYVwiIH0sXG4gIDc6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0hvdGVsXCIsIGZhbGxiYWNrOiBcIkhvdGVsXCIgfSxcbiAgODogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfVmFyaW9zXCIsIGZhbGxiYWNrOiBcIlZhcmlvc1wiIH0sXG4gIDE0OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9UYXhpXCIsIGZhbGxiYWNrOiBcIlRheGlcIiB9LFxufTtcblxuY29uc3Qgbm9ybWFsaXplVXNlcklkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XG5cbmNvbnN0IGlzU2FtZVVzZXIgPSAobGVmdDogc3RyaW5nLCByaWdodDogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRMZWZ0ID0gbm9ybWFsaXplVXNlcklkKGxlZnQpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRSaWdodCA9IG5vcm1hbGl6ZVVzZXJJZChyaWdodCkudG9VcHBlckNhc2UoKTtcbiAgcmV0dXJuICEhbm9ybWFsaXplZExlZnQgJiYgbm9ybWFsaXplZExlZnQgPT09IG5vcm1hbGl6ZWRSaWdodDtcbn07XG5cbmNvbnN0IGVuc3VyZUN1cnJlbnRVc2VySW5MaXN0ID0gKHVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXSwgY3VycmVudEF4VXNlcklkOiBzdHJpbmcpOiBBdXRoTWFuYWdlZFVzZXJbXSA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50ID0gbm9ybWFsaXplVXNlcklkKGN1cnJlbnRBeFVzZXJJZCk7XG4gIGlmICghbm9ybWFsaXplZEN1cnJlbnQpIHJldHVybiB1c2VycztcbiAgaWYgKHVzZXJzLnNvbWUoKGVudHJ5KSA9PiBpc1NhbWVVc2VyKGVudHJ5LmF4VXNlcklkLCBub3JtYWxpemVkQ3VycmVudCkpKSByZXR1cm4gdXNlcnM7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgY3JtVXNlcklkOiBub3JtYWxpemVkQ3VycmVudCxcbiAgICAgIGF4VXNlcklkOiBub3JtYWxpemVkQ3VycmVudCxcbiAgICAgIG5hbWU6IG5vcm1hbGl6ZWRDdXJyZW50LFxuICAgIH0sXG4gICAgLi4udXNlcnMsXG4gIF07XG59O1xuXG5jb25zdCByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24gPSAocmVxdWVzdGVkVXNlcklkOiBzdHJpbmcsIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nLCB1c2VyczogQXV0aE1hbmFnZWRVc2VyW10pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkUmVxdWVzdGVkID0gbm9ybWFsaXplVXNlcklkKHJlcXVlc3RlZFVzZXJJZCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50ID0gbm9ybWFsaXplVXNlcklkKGN1cnJlbnRBeFVzZXJJZCk7XG4gIGlmIChub3JtYWxpemVkUmVxdWVzdGVkKSB7XG4gICAgY29uc3QgZm91bmQgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZFJlcXVlc3RlZCkpO1xuICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kLmF4VXNlcklkO1xuICB9XG4gIGlmIChub3JtYWxpemVkQ3VycmVudCkge1xuICAgIGNvbnN0IHNlbGYgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZEN1cnJlbnQpKTtcbiAgICByZXR1cm4gc2VsZj8uYXhVc2VySWQgfHwgbm9ybWFsaXplZEN1cnJlbnQ7XG4gIH1cbiAgcmV0dXJuIFwiXCI7XG59O1xuXG5jb25zdCBidWlsZExpbmtNb2RlSW5pdGlhbFNuYXBzaG90ID0gKG1hbmFnZWRVc2VySWQgPSBcIlwiKTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9PiB7XG4gIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcbiAgY29uc3QgZnJvbURhdGUgPSBuZXcgRGF0ZSh0b2RheSk7XG4gIC8vIEtlZXAgYXV0b21hdGljIGxpbmstbW9kZSBsb2FkIGJvdW5kZWQgdG8gYXZvaWQgaGVhdnkgdXBzdHJlYW0gc2NhbnMuXG4gIGZyb21EYXRlLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMjkpO1xuXG4gIHJldHVybiB7XG4gICAgZnJvbURhdGU6IHRvSXNvRGF0ZShmcm9tRGF0ZSksXG4gICAgdG9EYXRlOiB0b0lzb0RhdGUodG9kYXkpLFxuICAgIGZpbHRlcktleTogXCJcIixcbiAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXG4gICAgbWFuYWdlZFVzZXJJZDogbm9ybWFsaXplVXNlcklkKG1hbmFnZWRVc2VySWQpLFxuICAgIHN0YXR1c0ZpbHRlcjogMCxcbiAgICBnYXN0b1R5cGVGaWx0ZXI6IFwiXCIsXG4gICAgcHJvY2Vzc2VkQnlJYUZpbHRlcjogXCJhbGxcIixcbiAgfTtcbn07XG5cbmNvbnN0IHJlc29sdmVMaW5rTW9kZUJsb2NrZWRNZXNzYWdlID0gKGlzUGFpZDogYm9vbGVhbik6IHN0cmluZyA9PiB7XG4gIGlmIChpc1BhaWQpIHtcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1BhaWRSZWFkT25seVwiLCBcIkxhcyBob2phcyBkZSBnYXN0byBwYWdhZGFzIHNvbiBkZSBzb2xvIGxlY3R1cmEuXCIpO1xuICB9XG5cbiAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9SZWFkT25seUJ5U3RhdHVzXCIsIFwiTm8gc2UgcHVlZGUgZWRpdGFyIGVzdGEgaG9qYSBkZSBnYXN0b3MgZW4gZWwgZXN0YWRvIGFjdHVhbC5cIik7XG59O1xuXG5jb25zdCBFWFBFTlNFX1RJQ0tFVFNfTE9HX1BSRUZJWCA9IFwiW2V4cGVuc2UtdGlja2V0c11cIjtcblxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNJbmZvID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUuaW5mbyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY29uc29sZS5pbmZvKEVYUEVOU0VfVElDS0VUU19MT0dfUFJFRklYLCAuLi5hcmdzKTtcbiAgfVxufTtcblxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNXYXJuID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUud2FybiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY29uc29sZS53YXJuKEVYUEVOU0VfVElDS0VUU19MT0dfUFJFRklYLCAuLi5hcmdzKTtcbiAgfVxufTtcblxuLy8gS2VlcHMgY3JlYXRlZC10aWNrZXQgcmV0dXJuIGZpbHRlcnMgYm91bmQgdG8gb25lIHZhbGlkIGxpc3QgZGF0ZS5cbmNvbnN0IHJlc29sdmVDcmVhdGVkVGlja2V0RmlsdGVyRGF0ZSA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIHJldHVybiB0b0V4cGVuc2VJc29EYXRlKHZhbHVlKSB8fCB0b0V4cGVuc2VJc29EYXRlKG5ldyBEYXRlKCkpO1xufTtcblxuLy8gVmFsaWRhdGVzIHdoZXRoZXIgb25lIHRpY2tldCBjYXJkIGNhbiBwYXJ0aWNpcGF0ZSBpbiBidWxrIGxpbmsgbW9kZS5cbmNvbnN0IGNhblNlbGVjdFRpY2tldEZvckxpbmsgPSAoaXRlbTogRXhwZW5zZVRpY2tldExpc3RQYWdlSXRlbSk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChpdGVtLmZpbGVJZCk7XG4gIHJldHVybiAhIWZpbGVJZDtcbn07XG5cbi8vIEluaXRpYWxpemVzIGF1dGggc2VlZCBmb3IgZXhwZW5zZSBBUEkgY2FsbHMgYmVmb3JlIGlzbGFuZCBlZmZlY3RzIHJ1bi5cbmNvbnN0IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoID0gKCkgPT4ge1xuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCh7XG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXG4gICAgYXBwQ29kZTogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxuICB9KTtcbn07XG5cbmNvbnN0IGJ1aWxkRmFsbGJhY2tHYXN0b1R5cGVPcHRpb25zID0gKCk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XG4gIHJldHVybiBPYmplY3QuZW50cmllcyhHQVNUT19UWVBFX0xBQkVMX0tFWVMpXG4gICAgLm1hcCgoW2NvZGUsIGNmZ10pID0+ICh7XG4gICAgICB2YWx1ZTogU3RyaW5nKGNvZGUpLFxuICAgICAgdGV4dDogaW5kVChjZmcua2V5LCBjZmcuZmFsbGJhY2spLFxuICAgIH0pKVxuICAgIC5zb3J0KChsZWZ0LCByaWdodCkgPT4gTnVtYmVyKGxlZnQudmFsdWUpIC0gTnVtYmVyKHJpZ2h0LnZhbHVlKSk7XG59O1xuXG5jb25zdCBOZXdUaWNrZXRJY29uID0gKCkgPT4gKFxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cImgtNiB3LTZcIj5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMCAyMGgtNWEyIDIgMCAwIDEgLTIgLTJ2LTlhMiAyIDAgMCAxIDIgLTJoMWEyIDIgMCAwIDAgMiAtMmExIDEgMCAwIDEgMSAtMWg2YTEgMSAwIDAgMSAxIDFhMiAyIDAgMCAwIDIgMmgxYTIgMiAwIDAgMSAyIDJ2MlwiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQuMzYyIDExLjE1YTMgMyAwIDEgMCAtNC4xNDQgNC4yNjNcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDIxdi00YTIgMiAwIDEgMSA0IDB2NFwiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMTloNFwiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMjEgMTV2NlwiIC8+XG4gIDwvc3ZnPlxuKTtcblxuY29uc3QgRXhwZW5zZVRpY2tldHNQYWdlQ29udGVudCA9ICgpID0+IHtcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJWaWV3XCIpO1xuICBjb25zdCBjYW5DcmVhdGVUaWNrZXQgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIkFkZFwiKTtcbiAgY29uc3QgY2FuTGlua1NoZWV0TGluZXMgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkFkZFwiKTtcbiAgY29uc3Qge1xuICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxuICAgIHN1Ym9yZGluYXRlcyxcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICAgIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXG4gIH0gPSB1c2VBdXRoQ29udGV4dCgpO1xuICBjb25zdCB0aW1lbGluZUNvbnRhaW5lclJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBjYW1lcmFJbnB1dFJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGdhbGxlcnlJbnB1dFJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGRpZFJlc3RvcmVPbk1vdW50UmVmID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYgPSBSZWFjdC51c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHBlbmRpbmdGb2N1c0ZpbGVJZFJlZiA9IFJlYWN0LnVzZVJlZihcIlwiKTtcbiAgY29uc3QgbGlua01vZGVDb250ZXh0ID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgY29uc3QgYWN0aW9uID0gc2FmZVRleHQodXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJhY3Rpb25cIikpLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgaG9qYUdhc3Rvc0lkID0gc2FmZVRleHQodXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJob2phR2FzdG9zSWRcIikpO1xuICAgIGNvbnN0IGlzTGlua01vZGUgPSBhY3Rpb24gPT09IFwibGlua1wiICYmICEhaG9qYUdhc3Rvc0lkO1xuICAgIHJldHVybiB7XG4gICAgICBpc0xpbmtNb2RlLFxuICAgICAgc2hlZXRJZDogaG9qYUdhc3Rvc0lkLFxuICAgICAgc2hlZXRPcmlnaW46IGlzTGlua01vZGUgPyAoXCJzaGVldC1saW5rXCIgYXMgY29uc3QpIDogKCEhaG9qYUdhc3Rvc0lkID8gKFwic2hlZXQtY3JlYXRlXCIgYXMgY29uc3QpIDogbnVsbCksXG4gICAgICBmaXhlZFN0YXR1c0ZpbHRlcjogaXNMaW5rTW9kZSA/ICgwIGFzIGNvbnN0KSA6IG51bGwsXG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGlzTGlua01vZGUgPSBsaW5rTW9kZUNvbnRleHQuaXNMaW5rTW9kZTtcbiAgY29uc3QgbGlua1NoZWV0SWQgPSBsaW5rTW9kZUNvbnRleHQuc2hlZXRJZDtcbiAgY29uc3Qgc2hlZXRDYWxsZXJPcmlnaW4gPSBsaW5rTW9kZUNvbnRleHQuc2hlZXRPcmlnaW47XG4gIGNvbnN0IGhhc1NoZWV0Q2FsbGVyQ29udGV4dCA9ICEhbGlua1NoZWV0SWQgJiYgISFzaGVldENhbGxlck9yaWdpbjtcbiAgY29uc3QgZml4ZWRTdGF0dXNGaWx0ZXIgPSBsaW5rTW9kZUNvbnRleHQuZml4ZWRTdGF0dXNGaWx0ZXI7XG4gIGNvbnN0IGNhblByb2Nlc3NMaW5rTW9kZSA9ICFpc0xpbmtNb2RlIHx8IGNhbkxpbmtTaGVldExpbmVzO1xuICBjb25zdCBtYW5hZ2VkVXNlcnMgPSB1c2VNZW1vKFxuICAgICgpID0+IGVuc3VyZUN1cnJlbnRVc2VySW5MaXN0KEFycmF5LmlzQXJyYXkoc3Vib3JkaW5hdGVzKSA/IHN1Ym9yZGluYXRlcyA6IFtdLCBjdXJyZW50QXhVc2VySWQpLFxuICAgIFtjdXJyZW50QXhVc2VySWQsIHN1Ym9yZGluYXRlc11cbiAgKTtcbiAgY29uc3QgZGVmYXVsdE1hbmFnZWRVc2VySWQgPSB1c2VNZW1vKFxuICAgICgpID0+IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbihjdXJyZW50QXhVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzKSxcbiAgICBbY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnNdXG4gICk7XG4gIGNvbnN0IHNob3dNYW5hZ2VkVXNlckZpbHRlciA9IGlzTGlua01vZGUgJiYgY2FuTWFuYWdlT3RoZXJVc2VycztcblxuICAvLyBLZWVwcyBsaW5rLW1vZGUgbGlzdCBxdWVyaWVzIGJvdW5kZWQgZXZlbiB3aGVuIFVJIGZpbHRlcnMgYXJlIGNsZWFyZWQuXG4gIGNvbnN0IG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkID0gdXNlQ2FsbGJhY2soXG4gICAgKHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9PiB7XG4gICAgICBpZiAoIWlzTGlua01vZGUpIHJldHVybiBzbmFwc2hvdDtcblxuICAgICAgY29uc3QgZmFsbGJhY2sgPSBidWlsZExpbmtNb2RlSW5pdGlhbFNuYXBzaG90KHNuYXBzaG90Lm1hbmFnZWRVc2VySWQpO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZEZyb21EYXRlID0gc2FmZVRleHQoc25hcHNob3QuZnJvbURhdGUpIHx8IGZhbGxiYWNrLmZyb21EYXRlO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZFRvRGF0ZSA9IHNhZmVUZXh0KHNuYXBzaG90LnRvRGF0ZSkgfHwgZmFsbGJhY2sudG9EYXRlO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZE1hbmFnZWRVc2VySWQgPSBub3JtYWxpemVVc2VySWQoc25hcHNob3QubWFuYWdlZFVzZXJJZCkgfHwgZmFsbGJhY2subWFuYWdlZFVzZXJJZDtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc25hcHNob3QsXG4gICAgICAgIGZyb21EYXRlOiBub3JtYWxpemVkRnJvbURhdGUsXG4gICAgICAgIHRvRGF0ZTogbm9ybWFsaXplZFRvRGF0ZSxcbiAgICAgICAgbWFuYWdlZFVzZXJJZDogbm9ybWFsaXplZE1hbmFnZWRVc2VySWQsXG4gICAgICAgIHN0YXR1c0ZpbHRlcjogMCxcbiAgICAgIH07XG4gICAgfSxcbiAgICBbaXNMaW5rTW9kZV1cbiAgKTtcblxuICBjb25zdCBbbGlua0Zsb3dCdXN5LCBzZXRMaW5rRmxvd0J1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbGlua0Zsb3dTdGF0dXMsIHNldExpbmtGbG93U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbGlua0Zsb3dFcnJvciwgc2V0TGlua0Zsb3dFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3NlbGVjdEFsbEJ1c3ksIHNldFNlbGVjdEFsbEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2VsZWN0QWxsRXJyb3IsIHNldFNlbGVjdEFsbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbGlua0J1bGtSZXN1bHQsIHNldExpbmtCdWxrUmVzdWx0XSA9IHVzZVN0YXRlPEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxuICAgIH0pLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXG4gIH0pO1xuXG4gIGNvbnN0IGdhc3RvVHlwZU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4ge1xuICAgIGNvbnN0IHNvdXJjZSA9IEFycmF5LmlzQXJyYXkod2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fKSA/IHdpbmRvdy5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXyA6IFtdO1xuICAgIGNvbnN0IG1hcHBlZCA9IG1hcFdpbmRvd0VudW1PcHRpb25zKHNvdXJjZSkuZmlsdGVyKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKGVudHJ5LnZhbHVlKTtcbiAgICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgQUxMT1dFRF9HQVNUT19UWVBFUy5oYXMocGFyc2VkKTtcbiAgICB9KTtcblxuICAgIGlmIChtYXBwZWQubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIG1hcHBlZC5zb3J0KChsZWZ0LCByaWdodCkgPT4gTnVtYmVyKGxlZnQudmFsdWUpIC0gTnVtYmVyKHJpZ2h0LnZhbHVlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1aWxkRmFsbGJhY2tHYXN0b1R5cGVPcHRpb25zKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBnYXN0b1R5cGVMYWJlbE1hcCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgZ2FzdG9UeXBlT3B0aW9ucykge1xuICAgICAgbWFwLnNldChTdHJpbmcob3B0aW9uLnZhbHVlKSwgb3B0aW9uLnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gbWFwO1xuICB9LCBbZ2FzdG9UeXBlT3B0aW9uc10pO1xuXG4gIGNvbnN0IHtcbiAgICBpdGVtcyxcbiAgICB0b3RhbCxcbiAgICBjdXJyZW50UGFnZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGxvYWRMaXN0LFxuICAgIHJlc3RvcmVMaXN0U25hcHNob3QsXG4gICAgcmVzZXRMaXN0LFxuICAgIGNsZWFyTGlzdENhY2hlLFxuICB9ID0gdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YSh7XG4gICAgaGFzQWNjZXNzLFxuICAgIHBhZ2VTaXplOiBQQUdFX1NJWkUsXG4gICAgbW9kZTogaXNMaW5rTW9kZSA/IFwibGlua1wiIDogXCJnZW5lcmFsXCIsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgY29uc3VtZVJldHVybkZsYWcsIGNvbnN1bWVSZXR1cm5Nb2RlLCBzYXZlQ2FjaGVkU3RhdGUsIGNsZWFyQ2FjaGVkU3RhdGUgfSA9IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUoKTtcbiAgY29uc3Qge1xuICAgIHNlbGVjdGlvbk1vZGUsXG4gICAgc2VsZWN0ZWRUaWNrZXRzLFxuICAgIGV4Y2x1ZGVkSWRzLFxuICAgIGZpbHRlcmVkU25hcHNob3QsXG4gICAgZmlsdGVyZWRUb3RhbENvdW50LFxuICAgIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUsXG4gICAgaXNTZWxlY3RlZDogaXNMaW5rVGlja2V0U2VsZWN0ZWQsXG4gICAgdG9nZ2xlVGlja2V0OiB0b2dnbGVMaW5rVGlja2V0U2VsZWN0aW9uLFxuICAgIGNsZWFyU2VsZWN0aW9uOiBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24sXG4gICAgcmVzdG9yZVNlbGVjdGlvbjogcmVzdG9yZUxpbmtUaWNrZXRTZWxlY3Rpb24sXG4gICAgc2VsZWN0QWxsQnlGaWx0ZXJzLFxuICAgIGh5ZHJhdGVWaXNpYmxlVGlja2V0cyxcbiAgICByZXNvbHZlU2VsZWN0ZWRDb3VudCxcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uKCk7XG4gIGNvbnN0IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKFxuICAgIChyZXF1ZXN0ZWRVc2VySWQ6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICBjb25zdCByZXNvbHZlZFVzZXJJZCA9IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbihyZXF1ZXN0ZWRVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzKTtcbiAgICAgIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZChyZXNvbHZlZFVzZXJJZCk7XG4gICAgICBpZiAoIXJlc29sdmVkVXNlcklkIHx8IChjdXJyZW50QXhVc2VySWQgJiYgaXNTYW1lVXNlcihyZXNvbHZlZFVzZXJJZCwgY3VycmVudEF4VXNlcklkKSkpIHtcbiAgICAgICAgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKHJlc29sdmVkVXNlcklkKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNvbHZlZFVzZXJJZDtcbiAgICB9LFxuICAgIFtjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vycywgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkXVxuICApO1xuICBjb25zdCB7XG4gICAgbGlua1NoZWV0TG9ja2VkLFxuICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlLFxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlKHtcbiAgICBpc0xpbmtNb2RlLFxuICAgIGxpbmtTaGVldElkLFxuICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgIHJlc29sdmVCbG9ja2VkTWVzc2FnZTogcmVzb2x2ZUxpbmtNb2RlQmxvY2tlZE1lc3NhZ2UsXG4gIH0pO1xuICBjb25zdCB7IHJ1bkF1dG9tYXRpY0xpc3RMb2FkIH0gPSB1c2VFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZCh7XG4gICAgaXNMaW5rTW9kZSxcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxuICAgIGxpbmtTaGVldExvY2tlZCxcbiAgICBjbGVhckxpc3RDYWNoZSxcbiAgICByZXNldExpc3QsXG4gICAgbG9hZExpc3QsXG4gIH0pO1xuICBjb25zdCBidWlsZEluaXRpYWxMaW5rTW9kZVNuYXBzaG90ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcbiAgICByZXR1cm4gYnVpbGRMaW5rTW9kZUluaXRpYWxTbmFwc2hvdChpbml0aWFsTWFuYWdlZFVzZXJJZCk7XG4gIH0sIFtkZWZhdWx0TWFuYWdlZFVzZXJJZCwgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXSk7XG5cbiAgY29uc3Qge1xuICAgIGZyb21EYXRlLFxuICAgIHRvRGF0ZSxcbiAgICBmaWx0ZXJLZXksXG4gICAgY3VycmVuY3lDb2RlLFxuICAgIG1hbmFnZWRVc2VySWQsXG4gICAgc3RhdHVzRmlsdGVyLFxuICAgIGdhc3RvVHlwZUZpbHRlcixcbiAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxuICAgIGFwcGxpZWRGaWx0ZXJzLFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIGN1cnJlbnRGaWx0ZXJzLFxuICAgIHNldEZpbHRlcktleSxcbiAgICBzZXRDdXJyZW5jeUNvZGUsXG4gICAgc2V0TWFuYWdlZFVzZXJJZCxcbiAgICBzZXRTdGF0dXNGaWx0ZXIsXG4gICAgc2V0R2FzdG9UeXBlRmlsdGVyLFxuICAgIHNldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gICAgb25BcHBseSxcbiAgICBvbkNsZWFyLFxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcbiAgICBvbkRhdGVSYW5nZUNoYW5nZSxcbiAgICBvbk1hbnVhbFJhbmdlQ29tcGxldGUsXG4gICAgb25RdWlja0ZpbHRlckNoYW5nZSxcbiAgICB0b2dnbGVGaWx0ZXJQYW5lbCxcbiAgICBzdGF0dXNGaWx0ZXJMb2NrZWQsXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZSh7XG4gICAgZGVmYXVsdE1hbmFnZWRVc2VySWQsXG4gICAgZml4ZWRTdGF0dXNGaWx0ZXIsXG4gICAgYWxsb3dFbXB0eURhdGVzT25BcHBseTogaXNMaW5rTW9kZSxcbiAgICBvbkFwcGx5RmlsdGVyczogKHNuYXBzaG90KSA9PiB7XG4gICAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcbiAgICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbigpO1xuICAgICAgY29uc3QgcmVzb2x2ZWRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKHNuYXBzaG90Lm1hbmFnZWRVc2VySWQpO1xuICAgICAgdm9pZCBsb2FkTGlzdChcbiAgICAgICAgMSxcbiAgICAgICAgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQoe1xuICAgICAgICAgIC4uLnNuYXBzaG90LFxuICAgICAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc29sdmVkTWFuYWdlZFVzZXJJZCxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSxcbiAgICBvbkNsZWFyRmlsdGVyczogKCkgPT4ge1xuICAgICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XG4gICAgICBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24oKTtcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICAgIGlmIChpc0xpbmtNb2RlKSB7XG4gICAgICAgIGNvbnN0IGxpbmtTbmFwc2hvdCA9IGJ1aWxkSW5pdGlhbExpbmtNb2RlU25hcHNob3QoKTtcbiAgICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKGxpbmtTbmFwc2hvdCk7XG4gICAgICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkKDEsIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKGxpbmtTbmFwc2hvdCksIHtcbiAgICAgICAgICBjbGVhckNhY2hlOiB0cnVlLFxuICAgICAgICAgIHJlc2V0QmVmb3JlTG9hZDogdHJ1ZSxcbiAgICAgICAgICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXNldE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oY3VycmVudEF4VXNlcklkKTtcbiAgICAgIHNldE1hbmFnZWRVc2VySWQocmVzZXRNYW5hZ2VkVXNlcklkKTtcbiAgICAgIHJlc2V0TGlzdChcImNsZWFyLWZpbHRlcnNcIik7XG4gICAgfSxcbiAgfSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQgPSBub3JtYWxpemVVc2VySWQoZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICAgIGlmICghbm9ybWFsaXplZERlZmF1bHRNYW5hZ2VkVXNlcklkKSByZXR1cm47XG4gICAgc2V0TWFuYWdlZFVzZXJJZChub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICAgIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICB9LCBbZGVmYXVsdE1hbmFnZWRVc2VySWQsIHNldE1hbmFnZWRVc2VySWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGNhbk1hbmFnZU90aGVyVXNlcnMpIHJldHVybjtcbiAgICBjb25zdCBmYWxsYmFja01hbmFnZWRVc2VySWQgPSByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24oY3VycmVudEF4VXNlcklkLCBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vycyk7XG4gICAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnRNYW5hZ2VkVXNlcklkID0gbm9ybWFsaXplVXNlcklkKG1hbmFnZWRVc2VySWQpO1xuICAgIGlmIChpc1NhbWVVc2VyKG5vcm1hbGl6ZWRDdXJyZW50TWFuYWdlZFVzZXJJZCwgZmFsbGJhY2tNYW5hZ2VkVXNlcklkKSkgcmV0dXJuO1xuICAgIGlmICghbm9ybWFsaXplZEN1cnJlbnRNYW5hZ2VkVXNlcklkICYmICFmYWxsYmFja01hbmFnZWRVc2VySWQpIHJldHVybjtcblxuICAgIHNldE1hbmFnZWRVc2VySWQoZmFsbGJhY2tNYW5hZ2VkVXNlcklkKTtcbiAgICBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oZmFsbGJhY2tNYW5hZ2VkVXNlcklkKTtcbiAgfSwgW2Nhbk1hbmFnZU90aGVyVXNlcnMsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJJZCwgbWFuYWdlZFVzZXJzLCBzZXRNYW5hZ2VkVXNlcklkLCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb25dKTtcblxuICBjb25zdCB7XG4gICAgc291cmNlUGlja2VyT3BlbixcbiAgICBidXN5OiBxdWlja1RpY2tldEJ1c3ksXG4gICAgcHJvZ3Jlc3NNZXNzYWdlOiBxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSxcbiAgICBlcnJvck1lc3NhZ2U6IHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlLFxuICAgIGhhc1BlbmRpbmdVcGxvYWRSZXRyeSxcbiAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZSxcbiAgICB0cmFjZUxpc3Q6IHF1aWNrVGlja2V0VHJhY2VMaXN0LFxuICAgIG9wZW5Tb3VyY2VQaWNrZXIsXG4gICAgY2xvc2VTb3VyY2VQaWNrZXIsXG4gICAgc2VsZWN0RnJvbUNhbWVyYSxcbiAgICBzZWxlY3RGcm9tR2FsbGVyeSxcbiAgICBoYW5kbGVTZWxlY3RlZEZpbGUsXG4gICAgcmV0cnlQZW5kaW5nVXBsb2FkLFxuICAgIG9wZW5DcmVhdGVkVGlja2V0LFxuICAgIGNsZWFyRXJyb3I6IGNsZWFyUXVpY2tUaWNrZXRFcnJvcixcbiAgfSA9IHVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdyh7XG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogIWlzTGlua01vZGUgJiYgY2FuQ3JlYXRlVGlja2V0LFxuICAgIGlzQ3JlYXRlTW9kZTogZmFsc2UsXG4gICAgaXNTaGVldExvY2tlZDogZmFsc2UsXG4gICAgbGlua1RvU2hlZXQ6IGZhbHNlLFxuICAgIGF4VXNlcklkT3ZlcnJpZGU6IHNhZmVUZXh0KGN1cnJlbnRBeFVzZXJJZCksXG4gICAgY3VycmVuY3lDb2RlOiBjdXJyZW5jeUNvZGUgfHwgXCJFVVJcIixcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcbiAgICBvbkNvbXBsZXRlZDogKHJlc3VsdCkgPT4ge1xuICAgICAgY29uc3QgY3JlYXRlZEZpbGVJZCA9IHNhZmVUZXh0KHJlc3VsdD8uZmlsZUlkKTtcbiAgICAgIGlmICghY3JlYXRlZEZpbGVJZCkgcmV0dXJuO1xuXG4gICAgICBpZiAoaGFzU2hlZXRDYWxsZXJDb250ZXh0ICYmIHNoZWV0Q2FsbGVyT3JpZ2luKSB7XG4gICAgICAgIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCh7XG4gICAgICAgICAgZmlsZUlkOiBjcmVhdGVkRmlsZUlkLFxuICAgICAgICAgIHNoZWV0SWQ6IGxpbmtTaGVldElkLFxuICAgICAgICAgIG9yaWdpbjogc2hlZXRDYWxsZXJPcmlnaW4sXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgICAgICAgIGZpbGVJZDogY3JlYXRlZEZpbGVJZCxcbiAgICAgICAgICBtb2RlOiBcImVkaXRcIixcbiAgICAgICAgICBvcmlnaW46IHNoZWV0Q2FsbGVyT3JpZ2luLFxuICAgICAgICAgIHNoZWV0SWQ6IGxpbmtTaGVldElkLFxuICAgICAgICB9KTtcbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XG4gICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY2xlYXJFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCgpO1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsP2ZpbGVJZD0ke2VuY29kZVVSSUNvbXBvbmVudChjcmVhdGVkRmlsZUlkKX0mbW9kZT1lZGl0Jm9yaWdpbj10aWNrZXQtY3JlYXRlYCwge1xuICAgICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSxcbiAgfSk7XG5cbiAgY29uc3QgZmFiTWVudUl0ZW1zID0gdXNlTWVtbzxGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW10+KFxuICAgICgpID0+XG4gICAgICBpc0xpbmtNb2RlXG4gICAgICAgID8gW11cbiAgICAgICAgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiBcIm5ldy10aWNrZXRcIixcbiAgICAgICAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9OZXdUaWNrZXRcIiwgXCJOdWV2byBUaWNrZXRcIiksXG4gICAgICAgICAgICAgIGljb246IDxOZXdUaWNrZXRJY29uIC8+LFxuICAgICAgICAgICAgICBvbkNsaWNrOiBvcGVuU291cmNlUGlja2VyLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgIFtpc0xpbmtNb2RlLCBvcGVuU291cmNlUGlja2VyXVxuICApO1xuXG4gIGNvbnN0IHNlbGVjdGVkVGlja2V0Q291bnQgPSByZXNvbHZlU2VsZWN0ZWRDb3VudCh0b3RhbCk7XG4gIGNvbnN0IHNlbGVjdGVkVG90YWxBbW91bnQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gc2VsZWN0ZWRUaWNrZXRzLnJlZHVjZSgoc3VtLCBpdGVtKSA9PiB7XG4gICAgICBjb25zdCBhbW91bnQgPSBOdW1iZXIoaXRlbS50b3RhbEFtb3VudCA/PyAwKTtcbiAgICAgIHJldHVybiBhbW91bnQgPiAwID8gc3VtICsgYW1vdW50IDogc3VtO1xuICAgIH0sIDApO1xuICB9LCBbc2VsZWN0ZWRUaWNrZXRzXSk7XG4gIGNvbnN0IHNlbGVjdGVkVG90YWxBbW91bnRUZXh0ID0gdXNlTWVtbygoKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koc2VsZWN0ZWRUb3RhbEFtb3VudCwgXCJcIiksIFtzZWxlY3RlZFRvdGFsQW1vdW50XSk7XG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgcmV2ZWFsVG9wYmFyQWN0aW9uR3JvdXAoXCJleHBlbnNlLXRpY2tldHMtbGlzdC1hY3Rpb25zXCIpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgbGlua01vZGVDYW5jZWxNZXNzYWdlID0gdXNlTWVtbyhcbiAgICAoKSA9PlxuICAgICAgaW5kVChcbiAgICAgICAgXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9DYW5jZWxDb25maXJtXCIsXG4gICAgICAgIFwiU2UgY2FuY2VsYXJcdTAwRTEgZWwgcHJvY2VzbyBkZSB2aW5jdWxhY2lcdTAwRjNuIHkgdm9sdmVyXHUwMEUxcyBhIGxhIGhvamEgZGUgZ2FzdG9zLiBcdTAwQkZRdWllcmVzIGNvbnRpbnVhcj9cIlxuICAgICAgKSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IGFwcGx5Q3JlYXRlZFRpY2tldFJldHVybiA9IHVzZUNhbGxiYWNrKFxuICAgICh0aWNrZXRGaWxlSWQ6IHN0cmluZywgdGlja2V0RGF0ZVZhbHVlOiB1bmtub3duKSA9PiB7XG4gICAgICBjb25zdCB0aWNrZXREYXRlID0gcmVzb2x2ZUNyZWF0ZWRUaWNrZXRGaWx0ZXJEYXRlKHRpY2tldERhdGVWYWx1ZSk7XG4gICAgICBjb25zdCBjcmVhdGVkVGlja2V0TWFuYWdlZFVzZXJJZCA9IG5vcm1hbGl6ZVVzZXJJZChjdXJyZW50QXhVc2VySWQpO1xuICAgICAgY29uc3QgcmVzb2x2ZWRNYW5hZ2VkVXNlcklkID0gY3JlYXRlZFRpY2tldE1hbmFnZWRVc2VySWRcbiAgICAgICAgPyBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oY3JlYXRlZFRpY2tldE1hbmFnZWRVc2VySWQpXG4gICAgICAgIDogXCJcIjtcblxuICAgICAgY29uc3QgcXVlcnlTbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9IHtcbiAgICAgICAgZnJvbURhdGU6IHRpY2tldERhdGUsXG4gICAgICAgIHRvRGF0ZTogdGlja2V0RGF0ZSxcbiAgICAgICAgZmlsdGVyS2V5OiB0aWNrZXRGaWxlSWQsXG4gICAgICAgIGN1cnJlbmN5Q29kZTogXCJcIixcbiAgICAgICAgbWFuYWdlZFVzZXJJZDogcmVzb2x2ZWRNYW5hZ2VkVXNlcklkLFxuICAgICAgICBzdGF0dXNGaWx0ZXI6IFwiXCIsXG4gICAgICAgIGdhc3RvVHlwZUZpbHRlcjogXCJcIixcbiAgICAgICAgcHJvY2Vzc2VkQnlJYUZpbHRlcjogXCJhbGxcIixcbiAgICAgIH07XG5cbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcImFwcGx5Q3JlYXRlZFRpY2tldFJldHVybjpzdGFydFwiLCB7XG4gICAgICAgIHRpY2tldEZpbGVJZCxcbiAgICAgICAgdGlja2V0RGF0ZVZhbHVlLFxuICAgICAgICB0aWNrZXREYXRlLFxuICAgICAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgICAgIGNyZWF0ZWRUaWNrZXRNYW5hZ2VkVXNlcklkLFxuICAgICAgICByZXNvbHZlZE1hbmFnZWRVc2VySWQsXG4gICAgICAgIHF1ZXJ5U25hcHNob3QsXG4gICAgICB9KTtcblxuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKHF1ZXJ5U25hcHNob3QpO1xuICAgICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSB0aWNrZXRGaWxlSWQ7XG4gICAgICBjbGVhckxpc3RDYWNoZSgpO1xuICAgICAgcmVzZXRMaXN0KFwiY3JlYXRlZC10aWNrZXQtcmV0dXJuXCIpO1xuICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwiYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuOmxvYWRMaXN0XCIsIHtcbiAgICAgICAgcGFnZTogMSxcbiAgICAgICAgcXVlcnlTbmFwc2hvdCxcbiAgICAgIH0pO1xuICAgICAgdm9pZCBsb2FkTGlzdCgxLCBxdWVyeVNuYXBzaG90KTtcblxuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZShcInRpY2tldEZpbGVJZFwiKTtcbiAgICAgIHVybC5zZWFyY2hQYXJhbXMuZGVsZXRlKFwidGlja2V0RGF0ZVwiKTtcbiAgICAgIGNvbnN0IGNsZWFuZWRRdWVyeSA9IHVybC5zZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgXCJcIiwgY2xlYW5lZFF1ZXJ5ID8gYCR7dXJsLnBhdGhuYW1lfT8ke2NsZWFuZWRRdWVyeX1gIDogdXJsLnBhdGhuYW1lKTtcbiAgICB9LFxuICAgIFtcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUsXG4gICAgICBjbGVhckxpc3RDYWNoZSxcbiAgICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICAgIGxvYWRMaXN0LFxuICAgICAgcmVzZXRMaXN0LFxuICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxuICAgICAgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uLFxuICAgIF1cbiAgKTtcblxuICBjb25zdCByZXN0b3JlTGlua01vZGVSZXR1cm5TdGF0ZSA9IHVzZUNhbGxiYWNrKFxuICAgIChjYWNoZWRTdGF0ZTogRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSkgPT4ge1xuICAgICAgY29uc3QgcmVzdG9yZWRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGNhY2hlZFN0YXRlLmZpbHRlcnMubWFuYWdlZFVzZXJJZCk7XG4gICAgICBjb25zdCByZXN0b3JlZEZpbHRlcnMgPSB7XG4gICAgICAgIC4uLmNhY2hlZFN0YXRlLmZpbHRlcnMsXG4gICAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCxcbiAgICAgIH07XG5cbiAgICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhyZXN0b3JlZEZpbHRlcnMpO1xuICAgICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLnNjcm9sbFk7XG4gICAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLmZvY3VzRmlsZUlkO1xuICAgICAgcmVzdG9yZUxpbmtUaWNrZXRTZWxlY3Rpb24oe1xuICAgICAgICBzZWxlY3Rpb25Nb2RlOiBjYWNoZWRTdGF0ZS5zZWxlY3Rpb25Nb2RlLFxuICAgICAgICBzZWxlY3RlZFRpY2tldHM6IGNhY2hlZFN0YXRlLnNlbGVjdGVkVGlja2V0cyxcbiAgICAgICAgZXhjbHVkZWRJZHM6IGNhY2hlZFN0YXRlLmV4Y2x1ZGVkSWRzLFxuICAgICAgICBmaWx0ZXJlZFNuYXBzaG90OiBjYWNoZWRTdGF0ZS5maWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnMsXG4gICAgICAgIGZpbHRlcmVkVG90YWxDb3VudDogY2FjaGVkU3RhdGUuZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbCxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoY2FjaGVkU3RhdGUuaXRlbXMubGVuZ3RoID4gMCB8fCBjYWNoZWRTdGF0ZS50b3RhbCA+IDApIHtcbiAgICAgICAgcmVzdG9yZUxpc3RTbmFwc2hvdCh7XG4gICAgICAgICAgaXRlbXM6IGNhY2hlZFN0YXRlLml0ZW1zLFxuICAgICAgICAgIHRvdGFsOiBjYWNoZWRTdGF0ZS50b3RhbCxcbiAgICAgICAgICBwYWdlOiBjYWNoZWRTdGF0ZS5wYWdlLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcnVuQXV0b21hdGljTGlzdExvYWQoY2FjaGVkU3RhdGUucGFnZSwgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQocmVzdG9yZWRGaWx0ZXJzKSwge1xuICAgICAgICBjbGVhckNhY2hlOiB0cnVlLFxuICAgICAgICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiB0cnVlLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbXG4gICAgICBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZCxcbiAgICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcbiAgICAgIHJlc3RvcmVMaW5rVGlja2V0U2VsZWN0aW9uLFxuICAgICAgcmVzdG9yZUxpc3RTbmFwc2hvdCxcbiAgICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkLFxuICAgICAgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uLFxuICAgIF1cbiAgKTtcblxuICBjb25zdCByZXN0b3JlSW5pdGlhbExpbmtNb2RlU3RhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgbGlua1NuYXBzaG90ID0gYnVpbGRJbml0aWFsTGlua01vZGVTbmFwc2hvdCgpO1xuICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoKTtcbiAgICBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24oKTtcbiAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMobGlua1NuYXBzaG90KTtcbiAgICBydW5BdXRvbWF0aWNMaXN0TG9hZCgxLCBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZChsaW5rU25hcHNob3QpLCB7XG4gICAgICBjbGVhckNhY2hlOiB0cnVlLFxuICAgICAgcmVzZXRCZWZvcmVMb2FkOiB0cnVlLFxuICAgICAgd2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeTogdHJ1ZSxcbiAgICB9KTtcbiAgfSwgW1xuICAgIGJ1aWxkSW5pdGlhbExpbmtNb2RlU25hcHNob3QsXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSxcbiAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsXG4gICAgY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uLFxuICAgIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkLFxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcbiAgICBydW5BdXRvbWF0aWNMaXN0TG9hZCxcbiAgXSk7XG5cbiAgY29uc3QgcmVzdG9yZVN0YW5kYXJkUmV0dXJuU3RhdGUgPSB1c2VDYWxsYmFjayhcbiAgICAoY2FjaGVkU3RhdGU6IEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUpID0+IHtcbiAgICAgIGNvbnN0IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihjYWNoZWRTdGF0ZS5maWx0ZXJzLm1hbmFnZWRVc2VySWQpO1xuICAgICAgY29uc3QgcmVzdG9yZWRGaWx0ZXJzID0ge1xuICAgICAgICAuLi5jYWNoZWRTdGF0ZS5maWx0ZXJzLFxuICAgICAgICBtYW5hZ2VkVXNlcklkOiByZXN0b3JlZE1hbmFnZWRVc2VySWQsXG4gICAgICB9O1xuXG4gICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMocmVzdG9yZWRGaWx0ZXJzKTtcbiAgICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBjYWNoZWRTdGF0ZS5zY3JvbGxZO1xuICAgICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSBjYWNoZWRTdGF0ZS5mb2N1c0ZpbGVJZDtcblxuICAgICAgaWYgKGNhY2hlZFN0YXRlLml0ZW1zLmxlbmd0aCA+IDAgfHwgY2FjaGVkU3RhdGUudG90YWwgPiAwKSB7XG4gICAgICAgIHJlc3RvcmVMaXN0U25hcHNob3Qoe1xuICAgICAgICAgIGl0ZW1zOiBjYWNoZWRTdGF0ZS5pdGVtcyxcbiAgICAgICAgICB0b3RhbDogY2FjaGVkU3RhdGUudG90YWwsXG4gICAgICAgICAgcGFnZTogY2FjaGVkU3RhdGUucGFnZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkKGNhY2hlZFN0YXRlLnBhZ2UsIHJlc3RvcmVkRmlsdGVycywge1xuICAgICAgICBjbGVhckNhY2hlOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLCByZXN0b3JlTGlzdFNuYXBzaG90LCBydW5BdXRvbWF0aWNMaXN0TG9hZCwgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXVxuICApO1xuXG4gIC8vIEtlZXBzIGRlbGV0ZSByZXR1cm4gZXhwbGljaXQ6IGJsYW5rIGZpbHRlcnMsIG9wZW4gcGFuZWwsIGFuZCBubyBhdXRvbWF0aWMgcmVsb2FkLlxuICBjb25zdCByZXN0b3JlRGVsZXRlUmV0dXJuU3RhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xuICAgIHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50ID0gXCJcIjtcbiAgICBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24oKTtcbiAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcbiAgICBvbkNsZWFyKCk7XG4gIH0sIFtjbGVhckNhY2hlZFN0YXRlLCBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbiwgb25DbGVhcl0pO1xuXG4gIGNvbnN0IHRvZ2dsZVRpY2tldFNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKFxuICAgICh0aWNrZXQ6IEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW0pID0+IHtcbiAgICAgIGlmICghaXNMaW5rTW9kZSB8fCAhY2FuUHJvY2Vzc0xpbmtNb2RlIHx8IGxpbmtTaGVldENoZWNrQnVzeSB8fCBsaW5rU2hlZXRMb2NrZWQgfHwgbGlua0Zsb3dCdXN5KSByZXR1cm47XG4gICAgICBpZiAodGlja2V0LmtpbmQgIT09IFwibGlua1wiKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KHRpY2tldC5maWxlSWQpO1xuICAgICAgaWYgKCFmaWxlSWQpIHJldHVybjtcbiAgICAgIGlmICghY2FuU2VsZWN0VGlja2V0Rm9yTGluayh0aWNrZXQpKSByZXR1cm47XG5cbiAgICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xuICAgICAgdG9nZ2xlTGlua1RpY2tldFNlbGVjdGlvbih0aWNrZXQpO1xuICAgIH0sXG4gICAgW2NhblByb2Nlc3NMaW5rTW9kZSwgaXNMaW5rTW9kZSwgbGlua0Zsb3dCdXN5LCBsaW5rU2hlZXRDaGVja0J1c3ksIGxpbmtTaGVldExvY2tlZCwgdG9nZ2xlTGlua1RpY2tldFNlbGVjdGlvbl1cbiAgKTtcblxuICBjb25zdCBjbGVhclRpY2tldFNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRTZWxlY3RBbGxFcnJvcihcIlwiKTtcbiAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcbiAgICBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24oKTtcbiAgfSwgW2NsZWFyTGlua1RpY2tldFNlbGVjdGlvbl0pO1xuXG4gIGNvbnN0IHJlc29sdmVBY3RpdmVGaWx0ZXJzID0gdXNlQ2FsbGJhY2soKCk6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgPT4ge1xuICAgIGNvbnN0IGJhc2VTbmFwc2hvdCA9IGFwcGxpZWRGaWx0ZXJzIHx8IGN1cnJlbnRGaWx0ZXJzO1xuICAgIGNvbnN0IHJlc29sdmVkTWFuYWdlZFVzZXJJZCA9IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihiYXNlU25hcHNob3QubWFuYWdlZFVzZXJJZCk7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKHtcbiAgICAgIC4uLmJhc2VTbmFwc2hvdCxcbiAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc29sdmVkTWFuYWdlZFVzZXJJZCxcbiAgICB9KTtcbiAgfSwgW2FwcGxpZWRGaWx0ZXJzLCBjdXJyZW50RmlsdGVycywgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xuXG4gIC8vIEFjdGl2YXRlcyBiYWNrZW5kLWRyaXZlbiBmaWx0ZXJlZCBzZWxlY3Rpb24gZm9yIHRoZSBjdXJyZW50IGZpbHRlciBzbmFwc2hvdC5cbiAgY29uc3Qgc2VsZWN0QWxsTWF0Y2hpbmdUaWNrZXRzID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmICghaXNMaW5rTW9kZSB8fCAhY2FuUHJvY2Vzc0xpbmtNb2RlIHx8IGxpbmtTaGVldENoZWNrQnVzeSB8fCBsaW5rU2hlZXRMb2NrZWQgfHwgbGlua0Zsb3dCdXN5IHx8IHNlbGVjdEFsbEJ1c3kpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3RBbGxCdXN5KHRydWUpO1xuICAgIHNldFNlbGVjdEFsbEVycm9yKFwiXCIpO1xuICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGFjdGl2ZUZpbHRlcnMgPSByZXNvbHZlQWN0aXZlRmlsdGVycygpO1xuICAgICAgc2VsZWN0QWxsQnlGaWx0ZXJzKGFjdGl2ZUZpbHRlcnMsIHRvdGFsKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIlRpY2tldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0cy5cIik7XG4gICAgICBzZXRTZWxlY3RBbGxFcnJvcihtZXNzYWdlKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0U2VsZWN0QWxsQnVzeShmYWxzZSk7XG4gICAgfVxuICB9LCBbXG4gICAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxuICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICBpc0xpbmtNb2RlLFxuICAgIGxpbmtGbG93QnVzeSxcbiAgICBsaW5rU2hlZXRDaGVja0J1c3ksXG4gICAgbGlua1NoZWV0TG9ja2VkLFxuICAgIHJlc29sdmVBY3RpdmVGaWx0ZXJzLFxuICAgIHNlbGVjdEFsbEJ5RmlsdGVycyxcbiAgICBzZWxlY3RBbGxCdXN5LFxuICAgIHRvdGFsLFxuICBdKTtcblxuICAvLyBLZWVwcyBzZWxlY3RlZCBjYXJkIG1ldGFkYXRhIGZyZXNoIHdpdGggdGhlIGxhdGVzdCBsaXN0IHBheWxvYWQuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc0xpbmtNb2RlIHx8IGl0ZW1zLmxlbmd0aCA8IDEpIHJldHVybjtcbiAgICBoeWRyYXRlVmlzaWJsZVRpY2tldHMoaXRlbXMuZmlsdGVyKChpdGVtKTogaXRlbSBpcyBFeHBlbnNlVGlja2V0TGlua0NhcmQgPT4gaXRlbS5raW5kID09PSBcImxpbmtcIikpO1xuICB9LCBbaHlkcmF0ZVZpc2libGVUaWNrZXRzLCBpc0xpbmtNb2RlLCBpdGVtc10pO1xuXG4gIGNvbnN0IHJ1blRpY2tldExpbmtGbG93ID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmICghaXNMaW5rTW9kZSB8fCAhbGlua1NoZWV0SWQgfHwgbGlua0Zsb3dCdXN5KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChsaW5rU2hlZXRMb2NrZWQgfHwgIWNhblByb2Nlc3NMaW5rTW9kZSkge1xuICAgICAgY29uc3QgYmxvY2tlZE1lc3NhZ2UgPVxuICAgICAgICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZSB8fFxuICAgICAgICBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUmVhZE9ubHlCeVN0YXR1c1wiLCBcIk5vIHNlIHB1ZWRlIGVkaXRhciBlc3RhIGhvamEgZGUgZ2FzdG9zIGVuIGVsIGVzdGFkbyBhY3R1YWwuXCIpO1xuICAgICAgc2V0TGlua0Zsb3dFcnJvcihibG9ja2VkTWVzc2FnZSk7XG4gICAgICBzZXRMaW5rRmxvd1N0YXR1cyhibG9ja2VkTWVzc2FnZSk7XG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VsZWN0ZWRDb3VudCA9IHJlc29sdmVTZWxlY3RlZENvdW50KHRvdGFsKTtcbiAgICBpZiAoc2VsZWN0ZWRDb3VudCA8IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmVGaWx0ZXJzID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnMoKTtcbiAgICBjb25zdCByZXF1ZXN0QXhVc2VySWQgPSBzYWZlVGV4dChhY3RpdmVGaWx0ZXJzLm1hbmFnZWRVc2VySWQgfHwgY3VycmVudEF4VXNlcklkKTtcblxuICAgIHNldExpbmtGbG93QnVzeSh0cnVlKTtcbiAgICBzZXRMaW5rRmxvd0Vycm9yKFwiXCIpO1xuICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xuICAgIHNldExpbmtGbG93U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfTGlua2luZ0xpbmVcIiwgXCJMaW5raW5nIGV4cGVuc2UgbGluZS4uLlwiKSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBsaW5rRXhwZW5zZVNoZWV0VGlja2V0c0J1bGsoXG4gICAgICAgIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmVcbiAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgZXhwZW5zZVNoZWV0SWQ6IGxpbmtTaGVldElkLFxuICAgICAgICAgICAgICBzZWxlY3Rpb25Nb2RlOiBcImZpbHRlcmVkXCIsXG4gICAgICAgICAgICAgIGZpbHRlcnM6IGJ1aWxkRXhwZW5zZVRpY2tldExpbmtCdWxrRmlsdGVycyhmaWx0ZXJlZFNuYXBzaG90IHx8IGFjdGl2ZUZpbHRlcnMpLFxuICAgICAgICAgICAgICBleGNsdWRlZElkcyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgZXhwZW5zZVNoZWV0SWQ6IGxpbmtTaGVldElkLFxuICAgICAgICAgICAgICBzZWxlY3Rpb25Nb2RlOiBcInNlbGVjdGVkXCIsXG4gICAgICAgICAgICAgIHRpY2tldElkczogc2VsZWN0ZWRUaWNrZXRzLm1hcCgoaXRlbSkgPT4gc2FmZVRleHQoaXRlbS5maWxlSWQpKS5maWx0ZXIoQm9vbGVhbiksXG4gICAgICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgYXhVc2VySWRPdmVycmlkZTogcmVxdWVzdEF4VXNlcklkIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLkRhdGEgfHwgbnVsbDtcbiAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgIGNvbnN0IGZhaWx1cmVNZXNzYWdlID0gcmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIik7XG4gICAgICAgIHNldExpbmtGbG93RXJyb3IoZmFpbHVyZU1lc3NhZ2UpO1xuICAgICAgICBzZXRMaW5rRmxvd1N0YXR1cyhmYWlsdXJlTWVzc2FnZSk7XG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBzZXRMaW5rQnVsa1Jlc3VsdChyZXN1bHQpO1xuXG4gICAgICBpZiAocmVzdWx0LmxpbmtlZENvdW50ID4gMCkge1xuICAgICAgICBjbGVhclRpY2tldFNlbGVjdGlvbigpO1xuICAgICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xuICAgICAgICBjbGVhckV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KCk7XG4gICAgICAgIGNvbnN0IHN1Y2Nlc3NNYXJrID0gcmVzdWx0LmZhaWxlZENvdW50ID4gMCB8fCByZXN1bHQuc2tpcHBlZENvdW50ID4gMCA/IFwid2FybmluZ1Byb2Nlc3NcIiA6IFwib2tQcm9jZXNzXCI7XG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhzdWNjZXNzTWFyaywgc3VjY2Vzc01hcmsgPT09IFwib2tQcm9jZXNzXCIgPyAxMjAwIDogMTUwMCk7XG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsKGxpbmtTaGVldElkKSwge1xuICAgICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IGxvYWRMaXN0KGN1cnJlbnRQYWdlIDwgMSA/IDEgOiBjdXJyZW50UGFnZSwgYWN0aXZlRmlsdGVycyk7XG5cbiAgICAgIGlmIChyZXN1bHQuZmFpbGVkQ291bnQgPiAwICYmIHJlc3VsdC5saW5rZWRDb3VudCA8IDEpIHtcbiAgICAgICAgY29uc3QgZmFpbHVyZU1lc3NhZ2UgPSByZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcbiAgICAgICAgc2V0TGlua0Zsb3dTdGF0dXMoZmFpbHVyZU1lc3NhZ2UpO1xuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVzdWx0LmZhaWxlZENvdW50ID4gMCB8fCByZXN1bHQuc2tpcHBlZENvdW50ID4gMCkge1xuICAgICAgICBzZXRMaW5rRmxvd1N0YXR1cyhyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKSk7XG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIndhcm5pbmdQcm9jZXNzXCIsIDE1MDApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgc2V0TGlua0Zsb3dTdGF0dXMocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIikpO1xuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tQcm9jZXNzXCIsIDEyMDApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGZhaWx1cmVNZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIik7XG4gICAgICBzZXRMaW5rRmxvd0Vycm9yKGZhaWx1cmVNZXNzYWdlKTtcbiAgICAgIHNldExpbmtGbG93U3RhdHVzKGZhaWx1cmVNZXNzYWdlKTtcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TGlua0Zsb3dCdXN5KGZhbHNlKTtcbiAgICB9XG4gIH0sIFtcbiAgICBidWlsZEV4cGVuc2VTaGVldERldGFpbFVybCxcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSxcbiAgICBjbGVhclRpY2tldFNlbGVjdGlvbixcbiAgICBjdXJyZW50UGFnZSxcbiAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgZXhjbHVkZWRJZHMsXG4gICAgZmlsdGVyZWRTbmFwc2hvdCxcbiAgICBpc0xpbmtNb2RlLFxuICAgIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUsXG4gICAgbGlua0Zsb3dCdXN5LFxuICAgIGxpbmtTaGVldElkLFxuICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlLFxuICAgIGxpbmtTaGVldExvY2tlZCxcbiAgICBsb2FkTGlzdCxcbiAgICByZXNvbHZlQWN0aXZlRmlsdGVycyxcbiAgICByZXNvbHZlU2VsZWN0ZWRDb3VudCxcbiAgICBzZWxlY3RlZFRpY2tldHMsXG4gICAgdG90YWwsXG4gIF0pO1xuXG4gIGNvbnN0IG9wZW5MaW5rQ29uZmlybU1vZGFsID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghaXNMaW5rTW9kZSB8fCBzZWxlY3RlZFRpY2tldENvdW50IDwgMSB8fCBsaW5rRmxvd0J1c3kgfHwgbGlua1NoZWV0Q2hlY2tCdXN5IHx8IGxpbmtTaGVldExvY2tlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldExpbmtGbG93RXJyb3IoXCJcIik7XG4gICAgc2V0TGlua0Zsb3dTdGF0dXMoXCJcIik7XG4gICAgb3BlbkNvbmZpcm0oe1xuICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9MaW5rQnV0dG9uXCIsIFwiVmluY3VsYXIgdGlja2V0KHMpXCIpLFxuICAgICAgbWVzc2FnZTogaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZVxuICAgICAgICA/IGAke2luZFQoXCJOYXZfRXhwZW5zZVRpY2tldHNcIiwgXCJUaWNrZXRzXCIpfTogJHtzZWxlY3RlZFRpY2tldENvdW50fWBcbiAgICAgICAgOiBgJHtpbmRUKFwiTmF2X0V4cGVuc2VUaWNrZXRzXCIsIFwiVGlja2V0c1wiKX06ICR7c2VsZWN0ZWRUaWNrZXRDb3VudH1cXG4ke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1RvdGFsQW1vdW50XCIsIFwiVG90YWwgYW1vdW50XCIpfTogJHtzZWxlY3RlZFRvdGFsQW1vdW50VGV4dH1gLFxuICAgICAgY29uZmlybVRleHQ6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9MaW5rQnV0dG9uXCIsIFwiVmluY3VsYXIgdGlja2V0KHMpXCIpLFxuICAgICAgY2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXG4gICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHJ1blRpY2tldExpbmtGbG93KCk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9LCBbXG4gICAgaXNMaW5rTW9kZSxcbiAgICBzZWxlY3RlZFRpY2tldENvdW50LFxuICAgIGxpbmtGbG93QnVzeSxcbiAgICBsaW5rU2hlZXRDaGVja0J1c3ksXG4gICAgbGlua1NoZWV0TG9ja2VkLFxuICAgIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUsXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgc2VsZWN0ZWRUb3RhbEFtb3VudFRleHQsXG4gICAgcnVuVGlja2V0TGlua0Zsb3csXG4gIF0pO1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBzZXRMaW5rRmxvd0Vycm9yKFwiXCIpO1xuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xuICAgICAgYnVzeTogbGlua0Zsb3dCdXN5LFxuICAgICAgb25FcnJvcjogKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgc2V0TGlua0Zsb3dFcnJvcihtZXNzYWdlKTtcbiAgICAgICAgc2V0TGlua0Zsb3dTdGF0dXMobWVzc2FnZSk7XG4gICAgICB9LFxuICAgICAgZGVmYXVsdEVycm9yTWVzc2FnZTogaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpLFxuICAgIH0pO1xuICB9LCBbaGFuZGxlQ29uZmlybSwgbGlua0Zsb3dCdXN5XSk7XG5cbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBsaW5rRmxvd0J1c3lcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcbiAgICA6ICFsaW5rRmxvd0J1c3kgJiYgbGlua0Zsb3dFcnJvclxuICAgICAgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIilcbiAgICAgIDogbW9kYWwuY29uZmlybVRleHQgfHwgaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIik7XG5cbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghbGlua0Zsb3dCdXN5ICYmIGxpbmtGbG93RXJyb3IpIHtcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2b2lkIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xuICB9LCBbY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm0sIGxpbmtGbG93QnVzeSwgbGlua0Zsb3dFcnJvcl0pO1xuXG4gIGNvbnN0IG9wZW5UaWNrZXREZXRhaWwgPSB1c2VDYWxsYmFjayhcbiAgICAocmF3RmlsZUlkOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KHJhd0ZpbGVJZCk7XG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBzbmFwc2hvdCA9IGFwcGxpZWRGaWx0ZXJzIHx8IGN1cnJlbnRGaWx0ZXJzO1xuICAgICAgY29uc3QgY3VycmVudFN0YXRlID0ge1xuICAgICAgICBmaWx0ZXJzOiBzbmFwc2hvdCxcbiAgICAgICAgcGFnZTogY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLFxuICAgICAgICBzY3JvbGxZOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LnNjcm9sbFkgfHwgMCA6IDAsXG4gICAgICAgIGZvY3VzRmlsZUlkOiBmaWxlSWQsXG4gICAgICAgIGl0ZW1zLFxuICAgICAgICB0b3RhbCxcbiAgICAgICAgc2VsZWN0ZWRUaWNrZXRzLFxuICAgICAgICBsaW5rTW9kZVNoZWV0SWQ6IGlzTGlua01vZGUgPyBsaW5rU2hlZXRJZCA6IFwiXCIsXG4gICAgICAgIHNlbGVjdGlvbk1vZGUsXG4gICAgICAgIGV4Y2x1ZGVkSWRzLFxuICAgICAgICBmaWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnM6IGZpbHRlcmVkU25hcHNob3QsXG4gICAgICAgIGZpbHRlcmVkU2VsZWN0aW9uVG90YWw6IGZpbHRlcmVkVG90YWxDb3VudCxcbiAgICAgIH07XG5cbiAgICAgIGlmIChpc0xpbmtNb2RlKSB7XG4gICAgICAgIHNhdmVDYWNoZWRTdGF0ZShjdXJyZW50U3RhdGUpO1xuICAgICAgICBzYXZlRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSh7XG4gICAgICAgICAgc2hlZXRJZDogbGlua1NoZWV0SWQsXG4gICAgICAgICAgcGFnZTogY3VycmVudFN0YXRlLnBhZ2UsXG4gICAgICAgICAgc2Nyb2xsWTogY3VycmVudFN0YXRlLnNjcm9sbFksXG4gICAgICAgICAgZm9jdXNGaWxlSWQ6IGZpbGVJZCxcbiAgICAgICAgICBmaWx0ZXJzOiBzbmFwc2hvdCxcbiAgICAgICAgICBzZWxlY3Rpb25Nb2RlLFxuICAgICAgICAgIHNlbGVjdGVkVGlja2V0cyxcbiAgICAgICAgICBleGNsdWRlZElkcyxcbiAgICAgICAgICBmaWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnM6IGZpbHRlcmVkU25hcHNob3QsXG4gICAgICAgICAgZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbDogZmlsdGVyZWRUb3RhbENvdW50LFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgICAgICBmaWxlSWQsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaGFzU2hlZXRDYWxsZXJDb250ZXh0ICYmIHNoZWV0Q2FsbGVyT3JpZ2luKSB7XG4gICAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcbiAgICAgICAgICAgIGZpbGVJZCxcbiAgICAgICAgICAgIHNoZWV0SWQ6IGxpbmtTaGVldElkLFxuICAgICAgICAgICAgb3JpZ2luOiBzaGVldENhbGxlck9yaWdpbixcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBxdWVyeS5zZXQoXCJvcmlnaW5cIiwgc2hlZXRDYWxsZXJPcmlnaW4pO1xuICAgICAgICAgIHF1ZXJ5LnNldChcInNoZWV0SWRcIiwgbGlua1NoZWV0SWQpO1xuICAgICAgICB9XG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xuICAgICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzYXZlQ2FjaGVkU3RhdGUoY3VycmVudFN0YXRlKTtcbiAgICAgIGlmIChoYXNTaGVldENhbGxlckNvbnRleHQgJiYgc2hlZXRDYWxsZXJPcmlnaW4pIHtcbiAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcbiAgICAgICAgICBmaWxlSWQsXG4gICAgICAgICAgc2hlZXRJZDogbGlua1NoZWV0SWQsXG4gICAgICAgICAgb3JpZ2luOiBzaGVldENhbGxlck9yaWdpbixcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XG4gICAgICAgICAgZmlsZUlkLFxuICAgICAgICAgIG9yaWdpbjogc2hlZXRDYWxsZXJPcmlnaW4sXG4gICAgICAgICAgc2hlZXRJZDogbGlua1NoZWV0SWQsXG4gICAgICAgIH0pO1xuICAgICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcbiAgICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY2xlYXJFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCgpO1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsP2ZpbGVJZD0ke2VuY29kZVVSSUNvbXBvbmVudChmaWxlSWQpfWAsIHtcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiB0cnVlLFxuICAgICAgICBieXBhc3NHdWFyZE9uY2U6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbXG4gICAgICBhcHBsaWVkRmlsdGVycyxcbiAgICAgIGN1cnJlbnRQYWdlLFxuICAgICAgY3VycmVudEZpbHRlcnMsXG4gICAgICBoYXNTaGVldENhbGxlckNvbnRleHQsXG4gICAgICBsaW5rU2hlZXRJZCxcbiAgICAgIGlzTGlua01vZGUsXG4gICAgICBpdGVtcyxcbiAgICAgIGZpbHRlcmVkVG90YWxDb3VudCxcbiAgICAgIGZpbHRlcmVkU25hcHNob3QsXG4gICAgICBleGNsdWRlZElkcyxcbiAgICAgIHNoZWV0Q2FsbGVyT3JpZ2luLFxuICAgICAgc2F2ZUNhY2hlZFN0YXRlLFxuICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsXG4gICAgICBzZWxlY3RlZFRpY2tldHMsXG4gICAgICBzZWxlY3Rpb25Nb2RlLFxuICAgICAgdG90YWwsXG4gICAgXVxuICApO1xuXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xuICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCF0aW1lbGluZUNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNhcmQ7XG4gIH0sIFtdKTtcblxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcbiAgICBjb250YWluZXJSZWY6IHRpbWVsaW5lQ29udGFpbmVyUmVmLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBpdGVtcyxcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcbiAgfSk7XG5cbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCgodG90YWwgfHwgMCkgLyBQQUdFX1NJWkUpO1xuICBjb25zdCBzaG93TGlzdExvYWRpbmcgPSBpc0xvYWRpbmc7XG4gIGNvbnN0IGxpbmtNb2RlU2VsZWN0aW9uQnV0dG9uc0Rpc2FibGVkID0gbGlua0Zsb3dCdXN5IHx8IHNlbGVjdEFsbEJ1c3kgfHwgaXNMb2FkaW5nO1xuXG4gIGNvbnN0IHN1bW1hcnlJdGVtcyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IHNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnM7XG4gICAgaWYgKCFzbmFwc2hvdCkgcmV0dXJuIFtdIGFzIEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfT47XG5cbiAgICBjb25zdCBzdW1tYXJ5OiBBcnJheTx7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0+ID0gW107XG4gICAgY29uc3QgbG9jYWxlID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCI7XG4gICAgY29uc3QgZnJvbURhdGVUZXh0ID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKHNuYXBzaG90LmZyb21EYXRlLCBsb2NhbGUsIFwiXCIpO1xuICAgIGNvbnN0IHRvRGF0ZVRleHQgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoc25hcHNob3QudG9EYXRlLCBsb2NhbGUsIFwiXCIpO1xuXG4gICAgaWYgKGZyb21EYXRlVGV4dCB8fCB0b0RhdGVUZXh0KSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwiZnJvbURhdGVcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpLFxuICAgICAgICB2YWx1ZTogZnJvbURhdGVUZXh0IHx8IFwiLS1cIixcbiAgICAgIH0pO1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcInRvRGF0ZVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKSxcbiAgICAgICAgdmFsdWU6IHRvRGF0ZVRleHQgfHwgXCItLVwiLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNuYXBzaG90LmZpbHRlcktleS50cmltKCkpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJmaWx0ZXJLZXlcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9GaWx0ZXJLZXlcIiwgXCJUaWNrZXRcIiksXG4gICAgICAgIHZhbHVlOiBzbmFwc2hvdC5maWx0ZXJLZXkudHJpbSgpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNuYXBzaG90LmN1cnJlbmN5Q29kZS50cmltKCkpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJjdXJyZW5jeVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIiksXG4gICAgICAgIHZhbHVlOiBzbmFwc2hvdC5jdXJyZW5jeUNvZGUudHJpbSgpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNuYXBzaG90LnN0YXR1c0ZpbHRlciAhPT0gXCJcIikge1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcInN0YXR1c1wiLFxuICAgICAgICBsYWJlbDogaW5kVChcIlRpY2tldHNfRmlsdGVyX1N0YXR1c1wiLCBcIlN0YXR1c1wiKSxcbiAgICAgICAgdmFsdWU6IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbChzbmFwc2hvdC5zdGF0dXNGaWx0ZXIpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNuYXBzaG90Lmdhc3RvVHlwZUZpbHRlciAhPT0gXCJcIikge1xuICAgICAgY29uc3QgY2F0ZWdvcnlMYWJlbCA9IGdhc3RvVHlwZUxhYmVsTWFwLmdldChTdHJpbmcoc25hcHNob3QuZ2FzdG9UeXBlRmlsdGVyKSkgfHwgU3RyaW5nKHNuYXBzaG90Lmdhc3RvVHlwZUZpbHRlcik7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwiY2F0ZWdvcnlcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpLFxuICAgICAgICB2YWx1ZTogY2F0ZWdvcnlMYWJlbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChzbmFwc2hvdC5wcm9jZXNzZWRCeUlhRmlsdGVyICE9PSBcImFsbFwiKSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwicHJvY2Vzc2VkXCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQVwiLCBcIlByb2Nlc3NlZCBieSBJQVwiKSxcbiAgICAgICAgdmFsdWU6XG4gICAgICAgICAgc25hcHNob3QucHJvY2Vzc2VkQnlJYUZpbHRlciA9PT0gXCJ5ZXNcIlxuICAgICAgICAgICAgPyBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9ZZXNcIiwgXCJZZXNcIilcbiAgICAgICAgICAgIDogaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFfTm9cIiwgXCJOb1wiKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzdW1tYXJ5O1xuICB9LCBbYXBwbGllZEZpbHRlcnMsIGdhc3RvVHlwZUxhYmVsTWFwXSk7XG5cbiAgY29uc3Qgc2hvd1N1bW1hcnkgPSAhaXNMaW5rTW9kZSAmJiAhc2hvd0ZpbHRlcnMgJiYgc3VtbWFyeUl0ZW1zLmxlbmd0aCA+IDA7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzTGlua01vZGUpIHJldHVybjtcbiAgICBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKHtcbiAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgIG1lc3NhZ2U6IGxpbmtNb2RlQ2FuY2VsTWVzc2FnZSxcbiAgICB9KTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKCk7XG4gICAgfTtcbiAgfSwgW2lzTGlua01vZGUsIGxpbmtNb2RlQ2FuY2VsTWVzc2FnZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OmVudGVyXCIsIHtcbiAgICAgIHVybDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5sb2NhdGlvbi5ocmVmIDogXCJcIixcbiAgICAgIGRpZFJlc3RvcmVPbk1vdW50OiBkaWRSZXN0b3JlT25Nb3VudFJlZi5jdXJyZW50LFxuICAgICAgaGFzQWNjZXNzLFxuICAgICAgaXNMaW5rTW9kZSxcbiAgICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcbiAgICB9KTtcbiAgICBpZiAoZGlkUmVzdG9yZU9uTW91bnRSZWYuY3VycmVudCkge1xuICAgICAgbG9nRXhwZW5zZVRpY2tldHNXYXJuKFwibW91bnRSZXN0b3JlRWZmZWN0OnNraXAtYWxyZWFkeS1yZXN0b3JlZFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFoYXNBY2Nlc3MpIHtcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzV2FybihcIm1vdW50UmVzdG9yZUVmZmVjdDpza2lwLW5vLWFjY2Vzc1wiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWlzTGlua01vZGUpIHtcbiAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgY29uc3QgdGlja2V0RmlsZUlkID0gc2FmZVRleHQodXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJ0aWNrZXRGaWxlSWRcIikpO1xuICAgICAgaWYgKHRpY2tldEZpbGVJZCkge1xuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6dGlja2V0LWNyZWF0ZS1yZXR1cm4tZGV0ZWN0ZWRcIiwge1xuICAgICAgICAgIHRpY2tldEZpbGVJZCxcbiAgICAgICAgICB0aWNrZXREYXRlOiB1cmwuc2VhcmNoUGFyYW1zLmdldChcInRpY2tldERhdGVcIiksXG4gICAgICAgIH0pO1xuICAgICAgICBkaWRSZXN0b3JlT25Nb3VudFJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuKHRpY2tldEZpbGVJZCwgdXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJ0aWNrZXREYXRlXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5KSB7XG4gICAgICBsb2dFeHBlbnNlVGlja2V0c1dhcm4oXCJtb3VudFJlc3RvcmVFZmZlY3Q6d2FpdGluZy1tYW5hZ2VtZW50LWJvb3RzdHJhcFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGlkUmVzdG9yZU9uTW91bnRSZWYuY3VycmVudCA9IHRydWU7XG4gICAgY29uc3QgaXNIaXN0b3J5QmFja0ZvcndhcmQgPSBpc0V4cGVuc2VIaXN0b3J5QmFja0ZvcndhcmROYXZpZ2F0aW9uKCk7XG4gICAgY29uc3QgaXNSZXR1cm5Gcm9tVGlja2V0RGV0YWlsID0gaGFzRXhwZW5zZVJldHVyblJlZmVycmVyKFtcbiAgICAgIFwiL0dhc3Rvcy9UaWNrZXREZXRhaWxcIixcbiAgICAgIFwiL0dhc3Rvcy9UaWNrZXRMaW5lRGV0YWlsXCIsXG4gICAgXSk7XG4gICAgY29uc3QgcmV0dXJuTW9kZSA9IGNvbnN1bWVSZXR1cm5Nb2RlKCk7XG4gICAgY29uc3QgaGFzUmV0dXJuRmxhZyA9IGNvbnN1bWVSZXR1cm5GbGFnKCk7XG5cbiAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6cmVzb2x2ZWQtcmV0dXJuLXN0YXRlXCIsIHtcbiAgICAgIGlzSGlzdG9yeUJhY2tGb3J3YXJkLFxuICAgICAgaXNSZXR1cm5Gcm9tVGlja2V0RGV0YWlsLFxuICAgICAgcmV0dXJuTW9kZSxcbiAgICAgIGhhc1JldHVybkZsYWcsXG4gICAgICBpc0xpbmtNb2RlLFxuICAgIH0pO1xuXG4gICAgaWYgKHJldHVybk1vZGUgPT09IFwicmVzZXRfZmlsdGVyc1wiICYmIGhhc1JldHVybkZsYWcpIHtcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXN0b3JlLWRlbGV0ZS1yZXR1cm5cIik7XG4gICAgICByZXN0b3JlRGVsZXRlUmV0dXJuU3RhdGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNMaW5rTW9kZSkge1xuICAgICAgY29uc3QgaXNSZXR1cm5pbmdGcm9tRGV0YWlsID0gaGFzUmV0dXJuRmxhZyB8fCBpc0hpc3RvcnlCYWNrRm9yd2FyZCB8fCBpc1JldHVybkZyb21UaWNrZXREZXRhaWw7XG4gICAgICBjb25zdCBjYWNoZWRTdGF0ZSA9IGlzUmV0dXJuaW5nRnJvbURldGFpbCA/IHJlYWRDYWNoZWRTdGF0ZSgpIDogbnVsbDtcbiAgICAgIGNvbnN0IGNhY2hlZFNoZWV0SWQgPSBzYWZlVGV4dChjYWNoZWRTdGF0ZT8ubGlua01vZGVTaGVldElkKTtcbiAgICAgIGlmIChjYWNoZWRTdGF0ZSAmJiBjYWNoZWRTaGVldElkICYmIGNhY2hlZFNoZWV0SWQgPT09IHNhZmVUZXh0KGxpbmtTaGVldElkKSkge1xuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6cmVzdG9yZS1saW5rLW1vZGUtY2FjaGVcIiwge1xuICAgICAgICAgIGNhY2hlZFNoZWV0SWQsXG4gICAgICAgICAgcGFnZTogY2FjaGVkU3RhdGUucGFnZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xuICAgICAgICByZXN0b3JlTGlua01vZGVSZXR1cm5TdGF0ZShjYWNoZWRTdGF0ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbGlua1JldHVyblN0YXRlID0gaXNSZXR1cm5pbmdGcm9tRGV0YWlsID8gcmVhZEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUobGlua1NoZWV0SWQpIDogbnVsbDtcbiAgICAgIGlmIChsaW5rUmV0dXJuU3RhdGUpIHtcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OnJlc3RvcmUtbGluay1tb2RlLXJldHVybi1zdGF0ZVwiLCB7XG4gICAgICAgICAgc2hlZXRJZDogbGlua1JldHVyblN0YXRlLnNoZWV0SWQsXG4gICAgICAgICAgcGFnZTogbGlua1JldHVyblN0YXRlLnBhZ2UsXG4gICAgICAgIH0pO1xuICAgICAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoKTtcbiAgICAgICAgcmVzdG9yZUxpbmtNb2RlUmV0dXJuU3RhdGUoe1xuICAgICAgICAgIGZpbHRlcnM6IGxpbmtSZXR1cm5TdGF0ZS5maWx0ZXJzLFxuICAgICAgICAgIHBhZ2U6IGxpbmtSZXR1cm5TdGF0ZS5wYWdlLFxuICAgICAgICAgIHNjcm9sbFk6IGxpbmtSZXR1cm5TdGF0ZS5zY3JvbGxZLFxuICAgICAgICAgIGZvY3VzRmlsZUlkOiBsaW5rUmV0dXJuU3RhdGUuZm9jdXNGaWxlSWQsXG4gICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgIHNlbGVjdGVkVGlja2V0czogbGlua1JldHVyblN0YXRlLnNlbGVjdGVkVGlja2V0cyxcbiAgICAgICAgICB0b3RhbDogMCxcbiAgICAgICAgICBsaW5rTW9kZVNoZWV0SWQ6IGxpbmtSZXR1cm5TdGF0ZS5zaGVldElkLFxuICAgICAgICAgIHNlbGVjdGlvbk1vZGU6IGxpbmtSZXR1cm5TdGF0ZS5zZWxlY3Rpb25Nb2RlLFxuICAgICAgICAgIGV4Y2x1ZGVkSWRzOiBsaW5rUmV0dXJuU3RhdGUuZXhjbHVkZWRJZHMsXG4gICAgICAgICAgZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzOiBsaW5rUmV0dXJuU3RhdGUuZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzLFxuICAgICAgICAgIGZpbHRlcmVkU2VsZWN0aW9uVG90YWw6IGxpbmtSZXR1cm5TdGF0ZS5maWx0ZXJlZFNlbGVjdGlvblRvdGFsLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6cmVzdG9yZS1pbml0aWFsLWxpbmstbW9kZVwiKTtcbiAgICAgIHJlc3RvcmVJbml0aWFsTGlua01vZGVTdGF0ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghaGFzUmV0dXJuRmxhZyAmJiAhaXNIaXN0b3J5QmFja0ZvcndhcmQgJiYgIWlzUmV0dXJuRnJvbVRpY2tldERldGFpbCkge1xuICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OmNsZWFyLWNhY2hlLW5vLXJldHVybi1jb250ZXh0XCIpO1xuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNhY2hlZFN0YXRlID0gcmVhZENhY2hlZFN0YXRlKCk7XG4gICAgaWYgKCFjYWNoZWRTdGF0ZSkge1xuICAgICAgbG9nRXhwZW5zZVRpY2tldHNXYXJuKFwibW91bnRSZXN0b3JlRWZmZWN0Om5vLWNhY2hlZC1zdGF0ZVwiKTtcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6cmVzdG9yZS1zdGFuZGFyZC1jYWNoZVwiLCB7XG4gICAgICBwYWdlOiBjYWNoZWRTdGF0ZS5wYWdlLFxuICAgICAgZm9jdXNGaWxlSWQ6IGNhY2hlZFN0YXRlLmZvY3VzRmlsZUlkLFxuICAgIH0pO1xuICAgIHJlc3RvcmVTdGFuZGFyZFJldHVyblN0YXRlKGNhY2hlZFN0YXRlKTtcbiAgfSwgW1xuICAgIGFwcGx5Q3JlYXRlZFRpY2tldFJldHVybixcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSxcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcbiAgICBjb25zdW1lUmV0dXJuTW9kZSxcbiAgICBoYXNBY2Nlc3MsXG4gICAgaXNMaW5rTW9kZSxcbiAgICBsaW5rU2hlZXRJZCxcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXG4gICAgcmVhZENhY2hlZFN0YXRlLFxuICAgIHJlYWRFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxuICAgIHJlc3RvcmVEZWxldGVSZXR1cm5TdGF0ZSxcbiAgICByZXN0b3JlSW5pdGlhbExpbmtNb2RlU3RhdGUsXG4gICAgcmVzdG9yZUxpbmtNb2RlUmV0dXJuU3RhdGUsXG4gICAgcmVzdG9yZVN0YW5kYXJkUmV0dXJuU3RhdGUsXG4gIF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzTG9hZGluZykgcmV0dXJuO1xuICAgIGlmIChwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID09IG51bGwgJiYgIXBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50KSByZXR1cm47XG5cbiAgICBjb25zdCBwZW5kaW5nU2Nyb2xsWSA9IHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgcGVuZGluZ0ZvY3VzRmlsZUlkID0gcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQ7XG4gICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IG51bGw7XG4gICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSBcIlwiO1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBpZiAocGVuZGluZ1Njcm9sbFkgIT0gbnVsbCkge1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgIHRvcDogTWF0aC5tYXgoMCwgcGVuZGluZ1Njcm9sbFkpLFxuICAgICAgICAgIGJlaGF2aW9yOiBcImF1dG9cIixcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghcGVuZGluZ0ZvY3VzRmlsZUlkIHx8ICF0aW1lbGluZUNvbnRhaW5lclJlZi5jdXJyZW50KSByZXR1cm47XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRGb2N1c0lkID0gcGVuZGluZ0ZvY3VzRmlsZUlkLnRvVXBwZXJDYXNlKCk7XG4gICAgICBjb25zdCB0aW1lbGluZUl0ZW1zID0gQXJyYXkuZnJvbShcbiAgICAgICAgdGltZWxpbmVDb250YWluZXJSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1pdGVtW2RhdGEtdGlja2V0LWZpbGUtaWRdXCIpXG4gICAgICApO1xuICAgICAgY29uc3QgbWF0Y2hpbmdJdGVtID0gdGltZWxpbmVJdGVtcy5maW5kKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBzYWZlVGV4dChpdGVtLmRhdGFzZXQudGlja2V0RmlsZUlkKS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkRm9jdXNJZDtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgdGFyZ2V0Q2FyZCA9IG1hdGNoaW5nSXRlbT8ucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xuICAgICAgaWYgKCF0YXJnZXRDYXJkKSByZXR1cm47XG5cbiAgICAgIHRhcmdldENhcmQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICAgIH0pO1xuICB9LCBbaXNMb2FkaW5nLCBpdGVtcy5sZW5ndGhdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5IHx8ICFoYXNBY2Nlc3MpIHJldHVybjtcblxuICAgIGNvbnN0IGhhbmRsZVBhZ2VTaG93ID0gKGV2ZW50OiBQYWdlVHJhbnNpdGlvbkV2ZW50KSA9PiB7XG4gICAgICBpZiAoIWV2ZW50LnBlcnNpc3RlZCAmJiAhaXNFeHBlbnNlSGlzdG9yeUJhY2tGb3J3YXJkTmF2aWdhdGlvbigpKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnMoKTtcbiAgICAgIGlmICghaXNMaW5rTW9kZSAmJiAoIXNuYXBzaG90LmZyb21EYXRlIHx8ICFzbmFwc2hvdC50b0RhdGUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcnVuQXV0b21hdGljTGlzdExvYWQoY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLCBzbmFwc2hvdCwge1xuICAgICAgICBjbGVhckNhY2hlOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgaGFuZGxlUGFnZVNob3cpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIGhhbmRsZVBhZ2VTaG93KTtcbiAgICB9O1xuICB9LCBbY3VycmVudFBhZ2UsIGhhc0FjY2VzcywgaXNMaW5rTW9kZSwgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LCByZXNvbHZlQWN0aXZlRmlsdGVycywgcnVuQXV0b21hdGljTGlzdExvYWRdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG9uVG9nZ2xlRmlsdGVycyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHdpbGxPcGVuID0gIXNob3dGaWx0ZXJzO1xuICAgICAgdG9nZ2xlRmlsdGVyUGFuZWwoKTtcbiAgICAgIGlmICh3aWxsT3Blbikge1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oeyB0b3A6IDAsIGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvblJlZnJlc2ggPSAoKSA9PiB7XG4gICAgICBjb25zdCBzbmFwc2hvdCA9IHJlc29sdmVBY3RpdmVGaWx0ZXJzKCk7XG4gICAgICBpZiAoIWlzTGlua01vZGUgJiYgKCFzbmFwc2hvdD8uZnJvbURhdGUgfHwgIXNuYXBzaG90Py50b0RhdGUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZvaWQgbG9hZExpc3QoY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLCBzbmFwc2hvdCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXhwZW5zZS10aWNrZXRzLXRvZ2dsZS1maWx0ZXJcIiwgb25Ub2dnbGVGaWx0ZXJzKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXRpY2tldHMtdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXRpY2tldHMtcmVmcmVzaFwiLCBvblJlZnJlc2gpO1xuICAgIH07XG4gIH0sIFtjdXJyZW50UGFnZSwgaXNMaW5rTW9kZSwgbG9hZExpc3QsIHJlc29sdmVBY3RpdmVGaWx0ZXJzLCBzaG93RmlsdGVycywgdG9nZ2xlRmlsdGVyUGFuZWxdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICA8Q29uZmlybU1vZGFsXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsQ29uZmlybVRleHR9XG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cbiAgICAgICAgYnVzeT17bGlua0Zsb3dCdXN5fVxuICAgICAgICBlcnJvcj17bGlua0Zsb3dFcnJvcn1cbiAgICAgICAgc3RhdHVzPXtsaW5rRmxvd1N0YXR1c31cbiAgICAgICAgb25Db25maXJtPXtoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm19XG4gICAgICAgIG9uQ2FuY2VsPXtjbG9zZUNvbmZpcm19XG4gICAgICAvPlxuXG4gICAgICA8aW5wdXRcbiAgICAgICAgcmVmPXtjYW1lcmFJbnB1dFJlZn1cbiAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICBhY2NlcHQ9e1RJQ0tFVF9JTUFHRV9BQ0NFUFRfQVRUUklCVVRFfVxuICAgICAgICBjYXB0dXJlPVwiZW52aXJvbm1lbnRcIlxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZmlsZXM/LlswXSB8fCBudWxsO1xuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgIHZvaWQgaGFuZGxlU2VsZWN0ZWRGaWxlKGZpbGUsIFwiY2FtZXJhXCIpO1xuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIDxpbnB1dFxuICAgICAgICByZWY9e2dhbGxlcnlJbnB1dFJlZn1cbiAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICBhY2NlcHQ9e1RJQ0tFVF9JTUFHRV9BQ0NFUFRfQVRUUklCVVRFfVxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZmlsZXM/LlswXSB8fCBudWxsO1xuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgIHZvaWQgaGFuZGxlU2VsZWN0ZWRGaWxlKGZpbGUsIFwiZ2FsbGVyeVwiKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG5cbiAgICAgIHshaXNMaW5rTW9kZSAmJiBzb3VyY2VQaWNrZXJPcGVuID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzQ1IHB4LTQgcHktNlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LXNtIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHAtNCBzaGFkb3cteGxcIj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LVsxNnB4XSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX1RpdGxlXCIsIFwiTnVldm8gdGlja2V0XCIpfVxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxuICAgICAgICAgICAgICB7aW5kVChcbiAgICAgICAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9Cb2R5XCIsXG4gICAgICAgICAgICAgICAgXCJTZWxlY2Npb25hIHVuYSBmdWVudGUgcGFyYSBjYXB0dXJhciBvIGVsZWdpciBsYSBpbWFnZW4gZGVsIHRpY2tldC5cIlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgZ3JpZCBncmlkLWNvbHMtMSBnYXAtMlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB2b2lkIHNlbGVjdEZyb21DYW1lcmEoY2FtZXJhSW5wdXRSZWYuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0NhbWVyYVwiLCBcIlVzYXIgY1x1MDBFMW1hcmFcIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RGcm9tR2FsbGVyeShnYWxsZXJ5SW5wdXRSZWYuY3VycmVudCl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9HYWxsZXJ5XCIsIFwiRWxlZ2lyIGltYWdlblwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2Nsb3NlU291cmNlUGlja2VyfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7IWlzTGlua01vZGUgJiYgcXVpY2tUaWNrZXRCdXN5ID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzM1IHB4LTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlLzk1IHB4LTQgcHktMyB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCI+XG4gICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC01IHctNVwiIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfSAvPlxuICAgICAgICAgICAgPHNwYW4+e3F1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlIHx8IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7IWlzTGlua01vZGUgJiYgcXVpY2tUaWNrZXRFcnJvck1lc3NhZ2UgPyAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmVcbiAgICAgICAgICAgICAgPyBcImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIHNwYWNlLXktMiByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBiZy1hbWJlci01MCBwLTMgdGV4dC1zbSB0ZXh0LWFtYmVyLTkwMFwiXG4gICAgICAgICAgICAgIDogXCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTIgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy1yb3NlLTUwIHAtMyB0ZXh0LXNtIHRleHQtcm9zZS04MDBcIlxuICAgICAgICAgIH1cbiAgICAgICAgPlxuICAgICAgICAgIDxwPntxdWlja1RpY2tldEVycm9yTWVzc2FnZX08L3A+XG4gICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmVcbiAgICAgICAgICAgICAgICAgID8gXCJyb3VuZGVkLWxnIGJvcmRlciBib3JkZXItYW1iZXItMjAwIGJnLXdoaXRlIHAtMiB0ZXh0LXhzIHRleHQtYW1iZXItODAwXCJcbiAgICAgICAgICAgICAgICAgIDogXCJyb3VuZGVkLWxnIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctd2hpdGUgcC0yIHRleHQteHMgdGV4dC1yb3NlLTcwMFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lm1hcCgoZW50cnkpID0+IChcbiAgICAgICAgICAgICAgICA8cCBrZXk9e2Ake2VudHJ5LnN0ZXB9LSR7ZW50cnkuYXR9YH0+e2Ake2VudHJ5LnN0ZXB9OiAke2VudHJ5LnRyYWNlSWR9YH08L3A+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMlwiPlxuICAgICAgICAgICAge2hhc1BhcnRpYWxUaWNrZXRGYWlsdXJlID8gKFxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCIgb25DbGljaz17b3BlbkNyZWF0ZWRUaWNrZXR9PlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfT3BlbkNyZWF0ZWRUaWNrZXRcIiwgXCJPcGVuIGNyZWF0ZWQgdGlja2V0XCIpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAge2hhc1BlbmRpbmdVcGxvYWRSZXRyeSA/IChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHZvaWQgcmV0cnlQZW5kaW5nVXBsb2FkKCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUmV0cnlVcGxvYWRcIiwgXCJSZWludGVudGFyIHVwbG9hZFwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIiBvbkNsaWNrPXtjbGVhclF1aWNrVGlja2V0RXJyb3J9PlxuICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9DbG9zZVwiLCBcIkNsb3NlXCIpfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIHtzaG93U3VtbWFyeSA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItY2FyZCBmaWx0ZXItY2FyZC0tc3VtbWFyeSBwLTMgc206cC00IG10LTEgbWItM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhwZW5zZS1zdW1tYXJ5LWdyaWQgZ3JpZCBncmlkLWNvbHMtMSBtaW4tWzM2MHB4XTpncmlkLWNvbHMtMiBpdGVtcy1zdGFydCBnYXAteC00IGdhcC15LTEgdGV4dC14c1wiPlxuICAgICAgICAgICAge3N1bW1hcnlJdGVtcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGtleT17aXRlbS5rZXl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeSBoaXN0b3J5LWZpbHRlci1zdW1tYXJ5LS1ncmlkLWl0ZW0gbGVhZGluZy01IG1pbi13LTBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeV9fbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpdGVtLmxhYmVsfTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeV9fdmFsdWUgYnJlYWstd29yZHNcIj57aXRlbS52YWx1ZX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbFxuICAgICAgICBtb2RlPXtpc0xpbmtNb2RlID8gXCJsaW5rXCIgOiBcImdlbmVyYWxcIn1cbiAgICAgICAgdmlzaWJsZT17c2hvd0ZpbHRlcnN9XG4gICAgICAgIHNob3dNYW51YWxEYXRlRmlsdGVyPXtzaG93TWFudWFsRGF0ZUZpbHRlcn1cbiAgICAgICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5PXttYW51YWxEYXRlQXV0b09wZW5LZXl9XG4gICAgICAgIGZyb21EYXRlPXtmcm9tRGF0ZX1cbiAgICAgICAgdG9EYXRlPXt0b0RhdGV9XG4gICAgICAgIGZpbHRlcktleT17ZmlsdGVyS2V5fVxuICAgICAgICBjdXJyZW5jeUNvZGU9e2N1cnJlbmN5Q29kZX1cbiAgICAgICAgbWFuYWdlZFVzZXJJZD17bWFuYWdlZFVzZXJJZH1cbiAgICAgICAgbWFuYWdlZFVzZXJzPXttYW5hZ2VkVXNlcnN9XG4gICAgICAgIHNob3dNYW5hZ2VkVXNlckZpbHRlcj17c2hvd01hbmFnZWRVc2VyRmlsdGVyfVxuICAgICAgICBzdGF0dXNGaWx0ZXI9e3N0YXR1c0ZpbHRlcn1cbiAgICAgICAgZ2FzdG9UeXBlRmlsdGVyPXtnYXN0b1R5cGVGaWx0ZXJ9XG4gICAgICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXI9e3Byb2Nlc3NlZEJ5SWFGaWx0ZXJ9XG4gICAgICAgIGFjdGl2ZVF1aWNrRmlsdGVyPXthY3RpdmVRdWlja0ZpbHRlcn1cbiAgICAgICAgc2hvd01hbnVhbERhdGVFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvcn1cbiAgICAgICAgc3RhdHVzRmlsdGVyUmVhZE9ubHk9e3N0YXR1c0ZpbHRlckxvY2tlZH1cbiAgICAgICAgZml4ZWRTdGF0dXNGaWx0ZXI9e2ZpeGVkU3RhdHVzRmlsdGVyfVxuICAgICAgICBnYXN0b1R5cGVPcHRpb25zPXtnYXN0b1R5cGVPcHRpb25zfVxuICAgICAgICBvbkRhdGVSYW5nZUNoYW5nZT17b25EYXRlUmFuZ2VDaGFuZ2V9XG4gICAgICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZT17b25NYW51YWxSYW5nZUNvbXBsZXRlfVxuICAgICAgICBvblF1aWNrRmlsdGVyQ2hhbmdlPXtvblF1aWNrRmlsdGVyQ2hhbmdlfVxuICAgICAgICBvbkZpbHRlcktleUNoYW5nZT17c2V0RmlsdGVyS2V5fVxuICAgICAgICBvbkN1cnJlbmN5Q29kZUNoYW5nZT17c2V0Q3VycmVuY3lDb2RlfVxuICAgICAgICBvbk1hbmFnZWRVc2VySWRDaGFuZ2U9e3NldE1hbmFnZWRVc2VySWR9XG4gICAgICAgIG9uU3RhdHVzRmlsdGVyQ2hhbmdlPXtzZXRTdGF0dXNGaWx0ZXJ9XG4gICAgICAgIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlPXtzZXRHYXN0b1R5cGVGaWx0ZXJ9XG4gICAgICAgIG9uUHJvY2Vzc2VkQnlJYUZpbHRlckNoYW5nZT17c2V0UHJvY2Vzc2VkQnlJYUZpbHRlcn1cbiAgICAgICAgb25DbGVhcj17b25DbGVhcn1cbiAgICAgICAgb25BcHBseT17b25BcHBseX1cbiAgICAgIC8+XG5cbiAgICAgIHtpc0xpbmtNb2RlID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBweC0wLjVcIj5cbiAgICAgICAgICB7IWNhblByb2Nlc3NMaW5rTW9kZSA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXJvc2UtNzAwXCI+e2luZFQoXCJBdXRoX1Blcm1pc3Npb25EZW5pZWRfQm9keVwiLCBcIk5vIHBlcm1pc3Npb24uXCIpfTwvZGl2PlxuICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAge2NhblByb2Nlc3NMaW5rTW9kZSAmJiBsaW5rU2hlZXRDaGVja0J1c3kgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIj5cbiAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNCB3LTRcIiBsYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0gLz5cbiAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmICFsaW5rU2hlZXRDaGVja0J1c3kgJiYgc2VsZWN0QWxsQnVzeSA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfSAvPlxuICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgIHtjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiBsaW5rU2hlZXRMb2NrZWQgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1yb3NlLTcwMFwiPlxuICAgICAgICAgICAgICB7bGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UgfHxcbiAgICAgICAgICAgICAgICBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUmVhZE9ubHlCeVN0YXR1c1wiLCBcIk5vIHNlIHB1ZWRlIGVkaXRhciBlc3RhIGhvamEgZGUgZ2FzdG9zIGVuIGVsIGVzdGFkbyBhY3R1YWwuXCIpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmICFsaW5rU2hlZXRDaGVja0J1c3kgJiYgIWxpbmtTaGVldExvY2tlZCAmJiBzZWxlY3RBbGxFcnJvciA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXJvc2UtNzAwXCI+e3NlbGVjdEFsbEVycm9yfTwvZGl2PlxuICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAge2NhblByb2Nlc3NMaW5rTW9kZSAmJiAhbGlua1NoZWV0Q2hlY2tCdXN5ICYmICFsaW5rU2hlZXRMb2NrZWQgPyAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAgICAgICAgICB7aW5kVChcIk5hdl9FeHBlbnNlVGlja2V0c1wiLCBcIlRpY2tldHNcIil9OiB7c2VsZWN0ZWRUaWNrZXRDb3VudH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMS41IHB0LTAuNVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIG1pbi13LTAgcHgtMS41IHB5LTEgdGV4dC1bMTBweF0gbGVhZGluZy10aWdodCBzbTp0ZXh0LXhzXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBzZWxlY3RBbGxNYXRjaGluZ1RpY2tldHMoKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17bGlua01vZGVTZWxlY3Rpb25CdXR0b25zRGlzYWJsZWQgfHwgdG90YWwgPCAxfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfU2VsZWN0QWxsXCIsIFwiU2VsZWNjaW9uYXIgdG9kb1wiKX1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBtaW4tdy0wIHB4LTEuNSBweS0xIHRleHQtWzEwcHhdIGxlYWRpbmctdGlnaHQgc206dGV4dC14c1wiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbGVhclRpY2tldFNlbGVjdGlvbn1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtsaW5rTW9kZVNlbGVjdGlvbkJ1dHRvbnNEaXNhYmxlZCB8fCBzZWxlY3RlZFRpY2tldENvdW50IDwgMX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0NsZWFyQWxsXCIsIFwiQm9ycmFyIHNlbGVjY2lcdTAwRjNuXCIpfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7aXNMaW5rTW9kZSA/IDxFeHBlbnNlVGlja2V0TGlua0J1bGtTdW1tYXJ5IHJlc3VsdD17bGlua0J1bGtSZXN1bHR9IC8+IDogbnVsbH1cblxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBzaG93TGlzdExvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XG4gICAgICA+XG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7ZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntlcnJvck1lc3NhZ2V9PC9kaXY+IDogbnVsbH1cblxuICAgICAgeyFzaG93TGlzdExvYWRpbmcgJiYgIWVycm9yTWVzc2FnZSAmJiBpdGVtcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtYm94IHRpbWVsaW5lLWVtcHR5XCIgZGF0YS1lbXB0eS10ZXh0PXtpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIil9IC8+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgeyFlcnJvck1lc3NhZ2UgJiYgaXRlbXMubGVuZ3RoID4gMCA/IChcbiAgICAgICAgPGRpdiByZWY9e3RpbWVsaW5lQ29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cbiAgICAgICAgICB7aXRlbXMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChpdGVtLmZpbGVJZCk7XG4gICAgICAgICAgICBjb25zdCBkYXRlUGFydHMgPSBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzKGl0ZW0udHJhbnNEYXRlLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIik7XG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IHNhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pIHx8IHNhZmVUZXh0KGl0ZW0uZmlsZU5hbWUpIHx8IGZpbGVJZCB8fCBcIi1cIjtcbiAgICAgICAgICAgIGNvbnN0IGFtb3VudFRleHQgPSBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koaXRlbS50b3RhbEFtb3VudCA/PyBudWxsLCBzYWZlVGV4dChpdGVtLmN1cnJlbmN5Q29kZSkpO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzQ29kZSA9IGl0ZW0ua2luZCA9PT0gXCJnZW5lcmFsXCIgPyBpdGVtLnN0YXR1cyA6IG51bGw7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXNMYWJlbCA9IHN0YXR1c0NvZGUgPT09IG51bGwgPyB1bmRlZmluZWQgOiBnZXRFeHBlbnNlVGlja2V0U3RhdHVzTGFiZWwoc3RhdHVzQ29kZSk7XG4gICAgICAgICAgICBjb25zdCBpc0Fzc2lnbmVkVG9FeHBlbnNlU2hlZXQgPSBzdGF0dXNDb2RlID09PSAxO1xuICAgICAgICAgICAgY29uc3Qgc2hvd1Byb2Nlc3NlZEJ5QWlJY29uID0gaXRlbS5wcm9jZXNzZWRCeUFJID09PSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RhYmxlSW5MaW5rTW9kZSA9IGlzTGlua01vZGUgJiYgY2FuU2VsZWN0VGlja2V0Rm9yTGluayhpdGVtKTtcbiAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWRJbkxpbmtNb2RlID0gaXNMaW5rTW9kZSAmJiBpc0xpbmtUaWNrZXRTZWxlY3RlZChmaWxlSWQpO1xuICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkQnlBaUxhYmVsID0gaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIik7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RUaWNrZXRMYWJlbCA9IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9TZWxlY3RUaWNrZXRcIiwgXCJTZWxlY2Npb25hciB0aWNrZXRcIik7XG4gICAgICAgICAgICBjb25zdCBnYXN0b1R5cGVDb2RlID0gaXRlbS5nYXN0b1R5cGUgPT09IG51bGwgPyBcIlwiIDogU3RyaW5nKGl0ZW0uZ2FzdG9UeXBlKTtcbiAgICAgICAgICAgIGNvbnN0IGdhc3RvVHlwZUxhYmVsID0gZ2FzdG9UeXBlQ29kZVxuICAgICAgICAgICAgICA/IGdhc3RvVHlwZUxhYmVsTWFwLmdldChnYXN0b1R5cGVDb2RlKSB8fCBnYXN0b1R5cGVDb2RlXG4gICAgICAgICAgICAgIDogaW5kVChcIkNvbW1vbl9Ob3RBdmFpbGFibGVcIiwgXCJOL0FcIik7XG4gICAgICAgICAgICBjb25zdCBjYXJkU3VidGl0bGUgPSBnYXN0b1R5cGVMYWJlbDtcbiAgICAgICAgICAgIGNvbnN0IHRpY2tldENhcmRLZXkgPVxuICAgICAgICAgICAgICBmaWxlSWQgfHxcbiAgICAgICAgICAgICAgYCR7c2FmZVRleHQoaXRlbS5maWxlTmFtZSl9LSR7c2FmZVRleHQoaXRlbS50cmFuc0RhdGUpfS0ke3NhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pfS0ke1N0cmluZyhpdGVtLnRvdGFsQW1vdW50ID8/IFwiXCIpfWA7XG5cbiAgICAgICAgICAgIGlmIChpc0xpbmtNb2RlICYmIGl0ZW0ua2luZCA9PT0gXCJsaW5rXCIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpY2tldExpbmtUaW1lbGluZUl0ZW1cbiAgICAgICAgICAgICAgICAgIGtleT17dGlja2V0Q2FyZEtleX1cbiAgICAgICAgICAgICAgICAgIGZpbGVJZD17ZmlsZUlkfVxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZT17Y2FyZFN1YnRpdGxlfVxuICAgICAgICAgICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cbiAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ9e2lzU2VsZWN0ZWRJbkxpbmtNb2RlfVxuICAgICAgICAgICAgICAgICAgaXNTZWxlY3RhYmxlPXtpc1NlbGVjdGFibGVJbkxpbmtNb2RlfVxuICAgICAgICAgICAgICAgICAgaW50ZXJhY3Rpb25EaXNhYmxlZD17bGlua0Zsb3dCdXN5IHx8IGxpbmtTaGVldENoZWNrQnVzeSB8fCBsaW5rU2hlZXRMb2NrZWR9XG4gICAgICAgICAgICAgICAgICBwcm9jZXNzZWRCeUFJPXtpdGVtLnByb2Nlc3NlZEJ5QUl9XG4gICAgICAgICAgICAgICAgICBwcm9jZXNzZWRCeUFpTGFiZWw9e3Byb2Nlc3NlZEJ5QWlMYWJlbH1cbiAgICAgICAgICAgICAgICAgIHNlbGVjdExhYmVsPXtzZWxlY3RUaWNrZXRMYWJlbH1cbiAgICAgICAgICAgICAgICAgIG9uT3BlbkRldGFpbD17KCkgPT4gb3BlblRpY2tldERldGFpbChmaWxlSWQpfVxuICAgICAgICAgICAgICAgICAgb25Ub2dnbGVTZWxlY3Q9eygpID0+IHRvZ2dsZVRpY2tldFNlbGVjdGlvbihpdGVtKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBiYXNlU3RhdHVzSWNvbnMgPSBpc0Fzc2lnbmVkVG9FeHBlbnNlU2hlZXQgfHwgc2hvd1Byb2Nlc3NlZEJ5QWlJY29uID8gKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIHtpc0Fzc2lnbmVkVG9FeHBlbnNlU2hlZXQgPyAoXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvblwiIHJvbGU9XCJpbWdcIiBhcmlhLWxhYmVsPXtzdGF0dXNMYWJlbH0+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPXsxLjV9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNCB3LTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk0xMy4xOSA4LjY4OGE0LjUgNC41IDAgMCAxIDEuMjQyIDcuMjQ0bC00LjUgNC41YTQuNSA0LjUgMCAwIDEtNi4zNjQtNi4zNjRsMS43NTctMS43NTdtMTMuMzUtLjYyMiAxLjc1Ny0xLjc1N2E0LjUgNC41IDAgMCAwLTYuMzY0LTYuMzY0bC00LjUgNC41YTQuNSA0LjUgMCAwIDAgMS4yNDIgNy4yNDRcIlxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgIHtzaG93UHJvY2Vzc2VkQnlBaUljb24gPyAoXG4gICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvbiBleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvbi0tYWlcIlxuICAgICAgICAgICAgICAgICAgICByb2xlPVwiaW1nXCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17cHJvY2Vzc2VkQnlBaUxhYmVsfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTQgdy00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNNCAxOGw0LTEybDQgMTJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTYgMTNoNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgNmg2XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNyA2djEyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAxOGg2XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKSA6IG51bGw7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e3RpY2tldENhcmRLZXl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGltZWxpbmUtaXRlbVwiXG4gICAgICAgICAgICAgICAgZGF0YS10aWNrZXQtZmlsZS1pZD17ZmlsZUlkIHx8IHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxFeHBlbnNlVGltZWxpbmVDYXJkXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgICAgICAgICAgIHN1YnRpdGxlPXtjYXJkU3VidGl0bGV9XG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxuICAgICAgICAgICAgICAgICAgb25PcGVuPXsoKSA9PiBvcGVuVGlja2V0RGV0YWlsKGZpbGVJZCl9XG4gICAgICAgICAgICAgICAgICB0aXRsZUNsYXNzTmFtZT1cImV4cGVuc2UtdGlja2V0LWNhcmRfX3RpdGxlIHRpbWVsaW5lLW5hbWVcIlxuICAgICAgICAgICAgICAgICAgc3RhdHVzTGFiZWw9e3N0YXR1c0xhYmVsfVxuICAgICAgICAgICAgICAgICAgc3RhdHVzSWNvbj17YmFzZVN0YXR1c0ljb25zfVxuICAgICAgICAgICAgICAgICAgc3RhdHVzSWNvbkNsYXNzTmFtZT1cImV4cGVuc2UtdGlja2V0LWNhcmRfX3N0YXR1cy1pY29uc1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICA8Q29tcGFjdFBhZ2luYXRpb25cbiAgICAgICAgdG90YWxQYWdlcz17dG90YWxQYWdlc31cbiAgICAgICAgY3VycmVudFBhZ2U9e2N1cnJlbnRQYWdlfVxuICAgICAgICBsb2FkaW5nPXtpc0xvYWRpbmd9XG4gICAgICAgIG9uUGFnZUNoYW5nZT17KHBhZ2UpID0+IHtcbiAgICAgICAgICBjb25zdCBzbmFwc2hvdCA9IHJlc29sdmVBY3RpdmVGaWx0ZXJzKCk7XG4gICAgICAgICAgaWYgKCFpc0xpbmtNb2RlICYmICghc25hcHNob3Q/LmZyb21EYXRlIHx8ICFzbmFwc2hvdD8udG9EYXRlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZvaWQgbG9hZExpc3QocGFnZSwgc25hcHNob3QpO1xuICAgICAgICB9fVxuICAgICAgICBsYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XG4gICAgICAvPlxuXG4gICAgICB7aXNMaW5rTW9kZSAmJiBjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiAhbGlua1NoZWV0TG9ja2VkID8gKFxuICAgICAgICA8UGFnZUJvdHRvbUFjdGlvbnMgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfTGlua0J1dHRvblwiLCBcIlZpbmN1bGFyIHRpY2tldChzKVwiKX0+XG4gICAgICAgICAgPFBhZ2VCb3R0b21BY3Rpb25CdXR0b25cbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfTGlua0J1dHRvblwiLCBcIlZpbmN1bGFyIHRpY2tldChzKVwiKX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e29wZW5MaW5rQ29uZmlybU1vZGFsfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2xpbmtGbG93QnVzeSB8fCBzZWxlY3RBbGxCdXN5IHx8IHNlbGVjdGVkVGlja2V0Q291bnQgPCAxfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvUGFnZUJvdHRvbUFjdGlvbnM+XG4gICAgICApIDogbnVsbH1cblxuICAgICAge2NhbkNyZWF0ZVRpY2tldCAmJiAhaXNMaW5rTW9kZSA/IChcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJcdTAwRTFwaWRhc1wiKX1cbiAgICAgICAgICBzaXplPXs3Nn1cbiAgICAgICAgICByaWdodD17MTZ9XG4gICAgICAgICAgYm90dG9tPXsyNH1cbiAgICAgICAgICBtZW51QXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJcdTAwRTFwaWRhc1wiKX1cbiAgICAgICAgICBtZW51SXRlbXM9e2ZhYk1lbnVJdGVtc31cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gTWFpbiBwYWdlIGVudHJ5IGZvciBleHBlbnNlIHRpY2tldHMgbGlzdC5cbmNvbnN0IEV4cGVuc2VUaWNrZXRzUGFnZSA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnMgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQ+XG4gICAgICA8RXhwZW5zZVRpY2tldHNQYWdlQ29udGVudCAvPlxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XG4gICk7XG59O1xuXG5jb25zdCBtb3VudCA9ICgpID0+IHtcbiAgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGgoKTtcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBlbnNlLXRpY2tldHMtcm9vdFwiKTtcbiAgaWYgKCFyb290RWwpIHJldHVybjtcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxFeHBlbnNlVGlja2V0c1BhZ2UgLz4pO1xufTtcblxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRzUGFnZTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IENoZWNrSWNvbiB9IGZyb20gXCJAaGVyb2ljb25zL3JlYWN0LzI0L291dGxpbmVcIjtcbmltcG9ydCB7IHVzZVRhcEd1YXJkIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRhcEd1YXJkLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VEYXRlUGFydHMgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCBFeHBlbnNlVGltZWxpbmVDYXJkIGZyb20gXCIuL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4XCI7XG5cbmNvbnN0IEhPTERfVE9fU0VMRUNUX01TID0gMzgwO1xuY29uc3QgSE9MRF9NT1ZFX1BYID0gMTY7XG5cbnR5cGUgRXhwZW5zZVRpY2tldExpbmtUaW1lbGluZUl0ZW1Qcm9wcyA9IHtcbiAgZmlsZUlkOiBzdHJpbmc7XG4gIGRhdGVQYXJ0czogRXhwZW5zZURhdGVQYXJ0cztcbiAgdGl0bGU6IHN0cmluZztcbiAgc3VidGl0bGU6IHN0cmluZztcbiAgYW1vdW50VGV4dDogc3RyaW5nO1xuICBpc1NlbGVjdGVkOiBib29sZWFuO1xuICBpc1NlbGVjdGFibGU6IGJvb2xlYW47XG4gIGludGVyYWN0aW9uRGlzYWJsZWQ6IGJvb2xlYW47XG4gIHByb2Nlc3NlZEJ5QUk6IGJvb2xlYW4gfCBudWxsO1xuICBwcm9jZXNzZWRCeUFpTGFiZWw6IHN0cmluZztcbiAgc2VsZWN0TGFiZWw6IHN0cmluZztcbiAgb25PcGVuRGV0YWlsOiAoKSA9PiB2b2lkO1xuICBvblRvZ2dsZVNlbGVjdDogKCkgPT4gdm9pZDtcbn07XG5cbi8vIExpbmstbW9kZSB0aWNrZXQgY2FyZDogcXVpY2sgdGFwIG9wZW5zIGRldGFpbCwgbG9uZyBwcmVzcyB0b2dnbGVzIHNlbGVjdGlvbiBhbnl3aGVyZSBvbiB0aGUgY2FyZC5cbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtID0gKHtcbiAgZmlsZUlkLFxuICBkYXRlUGFydHMsXG4gIHRpdGxlLFxuICBzdWJ0aXRsZSxcbiAgYW1vdW50VGV4dCxcbiAgaXNTZWxlY3RlZCxcbiAgaXNTZWxlY3RhYmxlLFxuICBpbnRlcmFjdGlvbkRpc2FibGVkLFxuICBwcm9jZXNzZWRCeUFJLFxuICBwcm9jZXNzZWRCeUFpTGFiZWwsXG4gIHNlbGVjdExhYmVsLFxuICBvbk9wZW5EZXRhaWwsXG4gIG9uVG9nZ2xlU2VsZWN0LFxufTogRXhwZW5zZVRpY2tldExpbmtUaW1lbGluZUl0ZW1Qcm9wcykgPT4ge1xuICBjb25zdCBoYW5kbGVUYXAgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoaW50ZXJhY3Rpb25EaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgb25PcGVuRGV0YWlsKCk7XG4gICAgfSxcbiAgICBbaW50ZXJhY3Rpb25EaXNhYmxlZCwgb25PcGVuRGV0YWlsXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZUhvbGQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGludGVyYWN0aW9uRGlzYWJsZWQgfHwgIWlzU2VsZWN0YWJsZSkgcmV0dXJuIGZhbHNlO1xuICAgIG9uVG9nZ2xlU2VsZWN0KCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sIFtpbnRlcmFjdGlvbkRpc2FibGVkLCBpc1NlbGVjdGFibGUsIG9uVG9nZ2xlU2VsZWN0XSk7XG5cbiAgY29uc3QgdGFwR3VhcmQgPSB1c2VUYXBHdWFyZChoYW5kbGVUYXAsIGhhbmRsZUhvbGQsIHtcbiAgICBob2xkTXM6IEhPTERfVE9fU0VMRUNUX01TLFxuICAgIG1vdmVQeDogSE9MRF9NT1ZFX1BYLFxuICB9KTtcblxuICBjb25zdCBzZWxlY3Rpb25JbmRpY2F0b3JUb25lQ2xhc3NOYW1lID0gaXNTZWxlY3RlZFxuICAgID8gXCJib3JkZXItcHJpbWFyeSBiZy1wcmltYXJ5IHRleHQtd2hpdGUgc2hhZG93LXNtXCJcbiAgICA6IGlzU2VsZWN0YWJsZVxuICAgICAgPyBcImJvcmRlci1zbGF0ZS0zMDAgYmctd2hpdGUgdGV4dC10cmFuc3BhcmVudFwiXG4gICAgICA6IFwiYm9yZGVyLXNsYXRlLTIwMCBiZy1zbGF0ZS0xMDAgdGV4dC10cmFuc3BhcmVudFwiO1xuXG4gIGNvbnN0IHN0YXR1c0ljb24gPSAoXG4gICAgPD5cbiAgICAgIDxzcGFuXG4gICAgICAgIGNsYXNzTmFtZT17YGlubGluZS1mbGV4IGgtNCB3LTQgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciB0cmFuc2l0aW9uICR7c2VsZWN0aW9uSW5kaWNhdG9yVG9uZUNsYXNzTmFtZX1gfVxuICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICB0aXRsZT17c2VsZWN0TGFiZWx9XG4gICAgICA+XG4gICAgICAgIDxDaGVja0ljb24gY2xhc3NOYW1lPVwiaC0zIHctM1wiIHN0cm9rZVdpZHRoPXsyLjJ9IC8+XG4gICAgICA8L3NwYW4+XG4gICAgICB7cHJvY2Vzc2VkQnlBSSA/IChcbiAgICAgICAgPHNwYW5cbiAgICAgICAgICBjbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvbiBleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvbi0tYWlcIlxuICAgICAgICAgIHJvbGU9XCJpbWdcIlxuICAgICAgICAgIGFyaWEtbGFiZWw9e3Byb2Nlc3NlZEJ5QWlMYWJlbH1cbiAgICAgICAgPlxuICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPXsxLjV9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNCB3LTRcIj5cbiAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTQgMThsNC0xMmw0IDEyXCIgLz5cbiAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTYgMTNoNFwiIC8+XG4gICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCA2aDZcIiAvPlxuICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTcgNnYxMlwiIC8+XG4gICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAxOGg2XCIgLz5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC8+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2lzU2VsZWN0ZWQgPyBcInRpbWVsaW5lLWl0ZW0gcm91bmRlZC0yeGwgcmluZy0yIHJpbmctcHJpbWFyeS8zMFwiIDogXCJ0aW1lbGluZS1pdGVtXCJ9XG4gICAgICBkYXRhLXRpY2tldC1maWxlLWlkPXtmaWxlSWQgfHwgdW5kZWZpbmVkfVxuICAgICAgZGF0YS10aWNrZXQtc2VsZWN0ZWQ9e2lzU2VsZWN0ZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIn1cbiAgICAgIGRhdGEtdGlja2V0LXNlbGVjdGFibGU9e2lzU2VsZWN0YWJsZSAmJiAhaW50ZXJhY3Rpb25EaXNhYmxlZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwifVxuICAgID5cbiAgICAgIDxFeHBlbnNlVGltZWxpbmVDYXJkXG4gICAgICAgIGRhdGVQYXJ0cz17ZGF0ZVBhcnRzfVxuICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgIHN1YnRpdGxlPXtzdWJ0aXRsZX1cbiAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cbiAgICAgICAgb25PcGVuPXtvbk9wZW5EZXRhaWx9XG4gICAgICAgIHRpdGxlQ2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fdGl0bGUgdGltZWxpbmUtbmFtZVwiXG4gICAgICAgIHN0YXR1c0ljb249e3N0YXR1c0ljb259XG4gICAgICAgIHN0YXR1c0ljb25DbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvbnNcIlxuICAgICAgICBpbnRlcmFjdGlvblByb3BzPXt7XG4gICAgICAgICAgdGFiSW5kZXg6IGludGVyYWN0aW9uRGlzYWJsZWQgPyAtMSA6IDAsXG4gICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IHRpdGxlLFxuICAgICAgICAgIFwiYXJpYS1wcmVzc2VkXCI6IGlzU2VsZWN0ZWQsXG4gICAgICAgICAgb25Qb2ludGVyRG93bjogdGFwR3VhcmQub25Qb2ludGVyRG93bixcbiAgICAgICAgICBvblBvaW50ZXJNb3ZlOiB0YXBHdWFyZC5vblBvaW50ZXJNb3ZlLFxuICAgICAgICAgIG9uUG9pbnRlclVwOiB0YXBHdWFyZC5vblBvaW50ZXJVcCxcbiAgICAgICAgICBvblBvaW50ZXJDYW5jZWw6IHRhcEd1YXJkLm9uUG9pbnRlckNhbmNlbCxcbiAgICAgICAgICBvbkNvbnRleHRNZW51OiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkNsaWNrOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbktleURvd246IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGludGVyYWN0aW9uRGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIiB8fCBldmVudC5rZXkgPT09IFwiIFwiKSB7XG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIG9uT3BlbkRldGFpbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldExpbmtUaW1lbGluZUl0ZW07XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0byB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuXG50eXBlIEV4cGVuc2VUaWNrZXRMaW5rQnVsa1N1bW1hcnlQcm9wcyA9IHtcbiAgcmVzdWx0OiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0byB8IG51bGw7XG59O1xuXG50eXBlIEV4cGVuc2VUaWNrZXRMaW5rSXNzdWVMaXN0UHJvcHMgPSB7XG4gIGl0ZW1zOiBBcnJheTx7IHRpY2tldElkOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nIH0+O1xuICB0aXRsZTogc3RyaW5nO1xuICB0b25lQ2xhc3NOYW1lOiBzdHJpbmc7XG59O1xuXG4vLyBSZW5kZXJzIG9uZSBza2lwcGVkIG9yIGZhaWxlZCB0aWNrZXQgbGlzdCB3aXRoIHN0YWJsZSBrZXlzLlxuY29uc3QgRXhwZW5zZVRpY2tldExpbmtJc3N1ZUxpc3QgPSAoeyBpdGVtcywgdGl0bGUsIHRvbmVDbGFzc05hbWUgfTogRXhwZW5zZVRpY2tldExpbmtJc3N1ZUxpc3RQcm9wcykgPT4ge1xuICBpZiAoaXRlbXMubGVuZ3RoIDwgMSkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17YHJvdW5kZWQtMnhsIGJvcmRlciBwLTMgJHt0b25lQ2xhc3NOYW1lfWB9PlxuICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LXNlbWlib2xkXCI+e3RpdGxlfTwvcD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMiBzcGFjZS15LTJcIj5cbiAgICAgICAge2l0ZW1zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGtleT17YCR7aXRlbS50aWNrZXRJZCB8fCBcInVua25vd25cIn0tJHtpdGVtLnJlYXNvbiB8fCBcIm5vLXJlYXNvblwifWB9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkLXhsIGJvcmRlciBib3JkZXItY3VycmVudC8xNSBiZy13aGl0ZS84MCBwLTIgdGV4dC14c1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGRcIj57aW5kVChcIlRpY2tldHNfRmlsdGVyX0ZpbHRlcktleVwiLCBcIlRpY2tldFwiKX06PC9zcGFuPntcIiBcIn1cbiAgICAgICAgICAgICAgPHNwYW4+e2l0ZW0udGlja2V0SWQgfHwgXCItXCJ9PC9zcGFuPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRSZWFzb25cIiwgXCJNb3Rpdm9cIil9Ojwvc3Bhbj57XCIgXCJ9XG4gICAgICAgICAgICAgIDxzcGFuPntpdGVtLnJlYXNvbiB8fCBcIi1cIn08L3NwYW4+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG4vLyBTaG93cyB0aGUgYmFja2VuZCBidWxrLWxpbmsgcmVzdWx0IHN1bW1hcnksIGluY2x1ZGluZyBwYXJ0aWFsIHNraXBwZWQgYW5kIGZhaWxlZCByZWFzb25zLlxuY29uc3QgRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeSA9ICh7IHJlc3VsdCB9OiBFeHBlbnNlVGlja2V0TGlua0J1bGtTdW1tYXJ5UHJvcHMpID0+IHtcbiAgaWYgKCFyZXN1bHQpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHN1bW1hcnlSb3dzID0gW1xuICAgIHtcbiAgICAgIGtleTogXCJyZXF1ZXN0ZWRcIixcbiAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0UmVxdWVzdGVkXCIsIFwiU29saWNpdGFkb3NcIiksXG4gICAgICB2YWx1ZTogcmVzdWx0LnJlcXVlc3RlZENvdW50LFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiBcImxpbmtlZFwiLFxuICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRMaW5rZWRcIiwgXCJWaW5jdWxhZG9zXCIpLFxuICAgICAgdmFsdWU6IHJlc3VsdC5saW5rZWRDb3VudCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogXCJza2lwcGVkXCIsXG4gICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdFNraXBwZWRcIiwgXCJPbWl0aWRvc1wiKSxcbiAgICAgIHZhbHVlOiByZXN1bHQuc2tpcHBlZENvdW50LFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiBcImZhaWxlZFwiLFxuICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRGYWlsZWRcIiwgXCJGYWxsaWRvc1wiKSxcbiAgICAgIHZhbHVlOiByZXN1bHQuZmFpbGVkQ291bnQsXG4gICAgfSxcbiAgXTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgc3BhY2UteS0zIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlLzk1IHAtM1wiPlxuICAgICAgPGRpdj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtOTAwXCI+XG4gICAgICAgICAge2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRUaXRsZVwiLCBcIlJlc3VsdGFkbyBkZSB2aW5jdWxhY2lcdTAwRjNuXCIpfVxuICAgICAgICA8L3A+XG4gICAgICAgIHtyZXN1bHQuZXhwZW5zZVNoZWV0SWQgPyAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXhzIHRleHQtc2xhdGUtNjAwXCI+XG4gICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1NoZWV0XCIsIFwiRXhwZW5zZSBzaGVldFwiKX06IHtyZXN1bHQuZXhwZW5zZVNoZWV0SWR9XG4gICAgICAgICAgPC9wPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgc206Z3JpZC1jb2xzLTRcIj5cbiAgICAgICAge3N1bW1hcnlSb3dzLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgIDxkaXYga2V5PXtpdGVtLmtleX0gY2xhc3NOYW1lPVwicm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctc2xhdGUtNTAgcHgtMyBweS0yIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIHVwcGVyY2FzZSB0cmFja2luZy1bMC4xNGVtXSB0ZXh0LXNsYXRlLTUwMFwiPntpdGVtLmxhYmVsfTwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC14bCBmb250LXNlbWlib2xkIHRleHQtcHJpbWFyeVwiPntpdGVtLnZhbHVlfTwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGdhcC0zIGxnOmdyaWQtY29scy0yXCI+XG4gICAgICAgIDxFeHBlbnNlVGlja2V0TGlua0lzc3VlTGlzdFxuICAgICAgICAgIHRpdGxlPXtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0U2tpcHBlZFwiLCBcIk9taXRpZG9zXCIpfVxuICAgICAgICAgIGl0ZW1zPXtBcnJheS5pc0FycmF5KHJlc3VsdC5za2lwcGVkKSA/IHJlc3VsdC5za2lwcGVkIDogW119XG4gICAgICAgICAgdG9uZUNsYXNzTmFtZT1cImJvcmRlci1hbWJlci0yMDAgYmctYW1iZXItNTAgdGV4dC1hbWJlci05MDBcIlxuICAgICAgICAvPlxuICAgICAgICA8RXhwZW5zZVRpY2tldExpbmtJc3N1ZUxpc3RcbiAgICAgICAgICB0aXRsZT17aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdEZhaWxlZFwiLCBcIkZhbGxpZG9zXCIpfVxuICAgICAgICAgIGl0ZW1zPXtBcnJheS5pc0FycmF5KHJlc3VsdC5mYWlsZWQpID8gcmVzdWx0LmZhaWxlZCA6IFtdfVxuICAgICAgICAgIHRvbmVDbGFzc05hbWU9XCJib3JkZXItcm9zZS0yMDAgYmctcm9zZS01MCB0ZXh0LXJvc2UtOTAwXCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgdHlwZSB7IEF1dGhNYW5hZ2VkVXNlciB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgSGlzdG9yeVN1bW1hcnkgZnJvbSBcIi4uLy4uL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlTdW1tYXJ5LnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7XG4gIGdldEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJPcHRpb25zLFxuICBub3JtYWxpemVFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSxcbiAgdHlwZSBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSxcbn0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlVGlja2V0U3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyLCBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCB9IGZyb20gXCIuLi90aWNrZXRzL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VEYXRlUmFuZ2VGaWx0ZXIgZnJvbSBcIi4vRXhwZW5zZURhdGVSYW5nZUZpbHRlci50c3hcIjtcbmltcG9ydCBFeHBlbnNlRmlsdGVyQWN0aW9ucyBmcm9tIFwiLi9FeHBlbnNlRmlsdGVyQWN0aW9ucy50c3hcIjtcbmltcG9ydCBFeHBlbnNlTWFuYWdlZFVzZXJGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VRdWlja0RhdGVGaWx0ZXJzIGZyb20gXCIuL0V4cGVuc2VRdWlja0RhdGVGaWx0ZXJzLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dCBmcm9tIFwiLi9FeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQudHN4XCI7XG5cbmNvbnN0IHBhcnNlSXNvRGF0ZSA9IChyYXc6IHN0cmluZyk6IERhdGUgfCBudWxsID0+IHtcbiAgaWYgKCFyYXcpIHJldHVybiBudWxsO1xuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcpLnRyaW0oKS5zcGxpdChcIlRcIilbMF07XG4gIGlmICghL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QodmFsdWUpKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gdmFsdWUuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xuICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xufTtcblxuY29uc3QgZm9ybWF0RGF0ZSA9IChyYXc6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBkYXRlID0gcGFyc2VJc29EYXRlKHJhdyk7XG4gIGlmICghZGF0ZSkgcmV0dXJuIFwiLS1cIjtcbiAgcmV0dXJuIGRhdGVcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwge1xuICAgICAgZGF5OiBcIm51bWVyaWNcIixcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICB9KVxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcbiAgICAudG9Mb3dlckNhc2UoKTtcbn07XG5cbnR5cGUgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWxQcm9wcyA9IHtcbiAgbW9kZTogXCJnZW5lcmFsXCIgfCBcImxpbmtcIjtcbiAgdmlzaWJsZTogYm9vbGVhbjtcbiAgc2hvd01hbnVhbERhdGVGaWx0ZXI6IGJvb2xlYW47XG4gIG1hbnVhbERhdGVBdXRvT3BlbktleTogbnVtYmVyO1xuICBmcm9tRGF0ZTogc3RyaW5nO1xuICB0b0RhdGU6IHN0cmluZztcbiAgZmlsdGVyS2V5OiBzdHJpbmc7XG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBtYW5hZ2VkVXNlcklkOiBzdHJpbmc7XG4gIG1hbmFnZWRVc2VyczogQXV0aE1hbmFnZWRVc2VyW107XG4gIHNob3dNYW5hZ2VkVXNlckZpbHRlcjogYm9vbGVhbjtcbiAgc3RhdHVzRmlsdGVyOiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZTtcbiAgZ2FzdG9UeXBlRmlsdGVyOiBcIlwiIHwgRXhwZW5zZUdhc3RvVHlwZUNvZGU7XG4gIHByb2Nlc3NlZEJ5SWFGaWx0ZXI6IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyO1xuICBhY3RpdmVRdWlja0ZpbHRlcjogRXhwZW5zZVRpY2tldFF1aWNrRmlsdGVySWQgfCBudWxsO1xuICBzaG93TWFudWFsRGF0ZUVycm9yOiBib29sZWFuO1xuICBzdGF0dXNGaWx0ZXJSZWFkT25seT86IGJvb2xlYW47XG4gIGZpeGVkU3RhdHVzRmlsdGVyPzogMCB8IDEgfCBudWxsO1xuICBnYXN0b1R5cGVPcHRpb25zOiBFeHBlbnNlU2VsZWN0T3B0aW9uW107XG4gIG9uRGF0ZVJhbmdlQ2hhbmdlOiAoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uTWFudWFsUmFuZ2VDb21wbGV0ZTogKGZyb21EYXRlOiBzdHJpbmcsIHRvRGF0ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvblF1aWNrRmlsdGVyQ2hhbmdlOiAoZmlsdGVySWQ6IEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkKSA9PiB2b2lkO1xuICBvbkZpbHRlcktleUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uQ3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25NYW5hZ2VkVXNlcklkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25TdGF0dXNGaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpID0+IHZvaWQ7XG4gIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlOiAodmFsdWU6IFwiXCIgfCBFeHBlbnNlR2FzdG9UeXBlQ29kZSkgPT4gdm9pZDtcbiAgb25Qcm9jZXNzZWRCeUlhRmlsdGVyQ2hhbmdlOiAodmFsdWU6IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyKSA9PiB2b2lkO1xuICBvbkNsZWFyOiAoKSA9PiB2b2lkO1xuICBvbkFwcGx5OiAoKSA9PiB2b2lkO1xufTtcblxuLy8gU2hhcmVkIHRpY2tldHMgZmlsdGVyIHBhbmVsIHdpdGggZ2xvYmFsIHF1aWNrIGRhdGUgZmlsdGVycyBhbmQgZml4ZWQgdGlja2V0IGZpbHRlcnMuXG5jb25zdCBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbCA9ICh7XG4gIG1vZGUsXG4gIHZpc2libGUsXG4gIHNob3dNYW51YWxEYXRlRmlsdGVyLFxuICBtYW51YWxEYXRlQXV0b09wZW5LZXksXG4gIGZyb21EYXRlLFxuICB0b0RhdGUsXG4gIGZpbHRlcktleSxcbiAgY3VycmVuY3lDb2RlLFxuICBtYW5hZ2VkVXNlcklkLFxuICBtYW5hZ2VkVXNlcnMsXG4gIHNob3dNYW5hZ2VkVXNlckZpbHRlcixcbiAgc3RhdHVzRmlsdGVyLFxuICBnYXN0b1R5cGVGaWx0ZXIsXG4gIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICBzaG93TWFudWFsRGF0ZUVycm9yLFxuICBzdGF0dXNGaWx0ZXJSZWFkT25seSA9IGZhbHNlLFxuICBmaXhlZFN0YXR1c0ZpbHRlciA9IG51bGwsXG4gIGdhc3RvVHlwZU9wdGlvbnMsXG4gIG9uRGF0ZVJhbmdlQ2hhbmdlLFxuICBvbk1hbnVhbFJhbmdlQ29tcGxldGUsXG4gIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXG4gIG9uRmlsdGVyS2V5Q2hhbmdlLFxuICBvbkN1cnJlbmN5Q29kZUNoYW5nZSxcbiAgb25NYW5hZ2VkVXNlcklkQ2hhbmdlLFxuICBvblN0YXR1c0ZpbHRlckNoYW5nZSxcbiAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2UsXG4gIG9uUHJvY2Vzc2VkQnlJYUZpbHRlckNoYW5nZSxcbiAgb25DbGVhcixcbiAgb25BcHBseSxcbn06IEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsUHJvcHMpID0+IHtcbiAgY29uc3Qgc3RhdHVzT3B0aW9ucyA9IHVzZU1lbW8oKCkgPT4gZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlck9wdGlvbnMoKSwgW10pO1xuXG4gIGNvbnN0IGNhdGVnb3J5T3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHsgdmFsdWU6IFwiXCIsIHRleHQ6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9BbGxcIiwgXCJBbGxcIikgfSxcbiAgICAgIC4uLmdhc3RvVHlwZU9wdGlvbnMsXG4gICAgXTtcbiAgfSwgW2dhc3RvVHlwZU9wdGlvbnNdKTtcblxuICBpZiAoIXZpc2libGUpIHJldHVybiBudWxsO1xuICBjb25zdCBsb2NhbGUgPSBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIjtcbiAgY29uc3Qgc2hvd0lubGluZURhdGVTdW1tYXJ5ID0gIXNob3dNYW51YWxEYXRlRmlsdGVyICYmICEhZnJvbURhdGUgJiYgISF0b0RhdGU7XG4gIGNvbnN0IHNob3dTdGF0dXNGaWx0ZXIgPSBtb2RlID09PSBcImdlbmVyYWxcIjtcbiAgY29uc3QgZGVza3RvcENvbHVtbnNDbGFzc05hbWUgPSBzaG93TWFuYWdlZFVzZXJGaWx0ZXJcbiAgICA/IChzaG93U3RhdHVzRmlsdGVyID8gXCJsZzpncmlkLWNvbHMtNlwiIDogXCJsZzpncmlkLWNvbHMtNVwiKVxuICAgIDogKHNob3dTdGF0dXNGaWx0ZXIgPyBcImxnOmdyaWQtY29scy01XCIgOiBcImxnOmdyaWQtY29scy00XCIpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItY2FyZCBmaWx0ZXItY2FyZC0tZXhwYW5kZWQgcC0yIHNtOnAtMi41IHJlbGF0aXZlXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN0YWNrIGZsZXggZmxleC1jb2wgc3BhY2UteS0yXCI+XG4gICAgICAgIDxFeHBlbnNlUXVpY2tEYXRlRmlsdGVycyBhY3RpdmVRdWlja0ZpbHRlcj17YWN0aXZlUXVpY2tGaWx0ZXJ9IG9uUXVpY2tGaWx0ZXJDaGFuZ2U9e29uUXVpY2tGaWx0ZXJDaGFuZ2V9IC8+XG5cbiAgICAgICAge3Nob3dNYW51YWxEYXRlRmlsdGVyID8gKFxuICAgICAgICAgIDxFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyXG4gICAgICAgICAgICBmcm9tRGF0ZT17ZnJvbURhdGV9XG4gICAgICAgICAgICB0b0RhdGU9e3RvRGF0ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRhdGVSYW5nZUNoYW5nZX1cbiAgICAgICAgICAgIG9uUmFuZ2VDb21wbGV0ZT17b25NYW51YWxSYW5nZUNvbXBsZXRlfVxuICAgICAgICAgICAgYXV0b09wZW5SZXF1ZXN0SWQ9e21hbnVhbERhdGVBdXRvT3BlbktleX1cbiAgICAgICAgICAgIHNob3dNYW51YWxFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvcn1cbiAgICAgICAgICAgIHNob3dTdGFydEVycm9yPXtzaG93TWFudWFsRGF0ZUVycm9yICYmICFmcm9tRGF0ZX1cbiAgICAgICAgICAgIHNob3dFbmRFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvciAmJiAhdG9EYXRlfVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBzaG93SW5saW5lRGF0ZVN1bW1hcnkgPyAoXG4gICAgICAgICAgPEhpc3RvcnlTdW1tYXJ5XG4gICAgICAgICAgICBzdW1tYXJ5RnJvbUxhYmVsPXtpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKX1cbiAgICAgICAgICAgIHN1bW1hcnlUb0xhYmVsPXtpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpfVxuICAgICAgICAgICAgZnJvbVZhbHVlPXtmb3JtYXREYXRlKGZyb21EYXRlLCBsb2NhbGUpfVxuICAgICAgICAgICAgdG9WYWx1ZT17Zm9ybWF0RGF0ZSh0b0RhdGUsIGxvY2FsZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJnYXAteS0xIHRleHQtWzExcHhdIHB4LTFcIlxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiAke2Rlc2t0b3BDb2x1bW5zQ2xhc3NOYW1lfSBnYXAtMmB9PlxuICAgICAgICAgIDxFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfRmlsdGVyS2V5XCIsIFwiVGlja2V0XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9GaWx0ZXJLZXlcIiwgXCJUaWNrZXRcIil9XG4gICAgICAgICAgICB2YWx1ZT17ZmlsdGVyS2V5fVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRmlsdGVyS2V5Q2hhbmdlfVxuICAgICAgICAgICAgbW9kZT17bW9kZX1cbiAgICAgICAgICAgIGNyZWF0ZWREYXRlRnJvbT17ZnJvbURhdGV9XG4gICAgICAgICAgICBjcmVhdGVkRGF0ZVRvPXt0b0RhdGV9XG4gICAgICAgICAgICBlbmFibGVSZW1vdGVTdWdnZXN0aW9uc1xuICAgICAgICAgICAgZml4ZWRTdGF0dXNGaWx0ZXI9e21vZGUgPT09IFwiZ2VuZXJhbFwiID8gZml4ZWRTdGF0dXNGaWx0ZXIgOiBudWxsfVxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgdmFsdWU9e2N1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkN1cnJlbmN5Q29kZUNoYW5nZX1cbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICBzaG93TG9hZGluZ1N0YXRlVGV4dD17ZmFsc2V9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIHtzaG93TWFuYWdlZFVzZXJGaWx0ZXIgPyAoXG4gICAgICAgICAgICA8RXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0XG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiQ29tbW9uX1VzZXJcIiwgXCJVc2VyXCIpfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkNvbW1vbl9Vc2VyXCIsIFwiVXNlclwiKX1cbiAgICAgICAgICAgICAgdmFsdWU9e21hbmFnZWRVc2VySWR9XG4gICAgICAgICAgICAgIHVzZXJzPXttYW5hZ2VkVXNlcnN9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbk1hbmFnZWRVc2VySWRDaGFuZ2V9XG4gICAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAge3Nob3dTdGF0dXNGaWx0ZXIgPyAoXG4gICAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfVxuICAgICAgICAgICAgICBvcHRpb25zPXtzdGF0dXNPcHRpb25zfVxuICAgICAgICAgICAgICB2YWx1ZT17c3RhdHVzRmlsdGVyfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4gb25TdGF0dXNGaWx0ZXJDaGFuZ2Uobm9ybWFsaXplRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUobmV4dFZhbHVlLCBcIlwiKSl9XG4gICAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e3N0YXR1c0ZpbHRlclJlYWRPbmx5fVxuICAgICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLXRpY2tldC1zdGF0dXMtZmlsdGVyXCJcbiAgICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxuICAgICAgICAgICAgb3B0aW9ucz17Y2F0ZWdvcnlPcHRpb25zfVxuICAgICAgICAgICAgdmFsdWU9e2dhc3RvVHlwZUZpbHRlcn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IE51bWJlcihuZXh0VmFsdWUpO1xuICAgICAgICAgICAgICBpZiAobmV4dFZhbHVlID09PSBcIlwiIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkpIHtcbiAgICAgICAgICAgICAgICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZShcIlwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2UocGFyc2VkIGFzIEV4cGVuc2VHYXN0b1R5cGVDb2RlKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLXRpY2tldC1nYXN0b3R5cGUtZmlsdGVyXCJcbiAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8RXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3RcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQVwiLCBcIlByb2Nlc3NlZCBieSBJQVwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQVwiLCBcIlByb2Nlc3NlZCBieSBJQVwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtwcm9jZXNzZWRCeUlhRmlsdGVyfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uUHJvY2Vzc2VkQnlJYUZpbHRlckNoYW5nZX1cbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPEV4cGVuc2VGaWx0ZXJBY3Rpb25zXG4gICAgICAgICAgY2xlYXJMYWJlbD17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsZWFyXCIsIFwiQ2xlYXJcIil9XG4gICAgICAgICAgYXBwbHlMYWJlbD17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0FwcGx5XCIsIFwiQXBwbHlcIil9XG4gICAgICAgICAgb25DbGVhcj17b25DbGVhcn1cbiAgICAgICAgICBvbkFwcGx5PXtvbkFwcGx5fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0UHJvY2Vzc2VkQnlJYUZpbHRlciB9IGZyb20gXCIuLi90aWNrZXRzL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcblxudHlwZSBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICB2YWx1ZTogRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXI7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyKSA9PiB2b2lkO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbn07XG5cbi8vIEZpeGVkIGVudW0gc2VsZWN0IGZvciBJQSBwcm9jZXNzaW5nIGZpbHRlciB3aXRoIEFsbC9ZZXMvTm8gb3B0aW9ucy5cbmNvbnN0IEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG59OiBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdFByb3BzKSA9PiB7XG4gIGNvbnN0IHVpVmFsdWUgPSB2YWx1ZSA9PT0gXCJhbGxcIiA/IFwiXCIgOiB2YWx1ZTtcbiAgY29uc3Qgb3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPihcbiAgICAoKSA9PiBbXG4gICAgICB7IHZhbHVlOiBcImFsbFwiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfQWxsXCIsIFwiQWxsXCIpIH0sXG4gICAgICB7IHZhbHVlOiBcInllc1wiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9ZZXNcIiwgXCJZZXNcIikgfSxcbiAgICAgIHsgdmFsdWU6IFwibm9cIiwgdGV4dDogaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFfTm9cIiwgXCJOb1wiKSB9LFxuICAgIF0sXG4gICAgW11cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgIHZhbHVlPXt1aVZhbHVlfVxuICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IHtcbiAgICAgICAgaWYgKG5leHRWYWx1ZSA9PT0gXCJ5ZXNcIiB8fCBuZXh0VmFsdWUgPT09IFwibm9cIiB8fCBuZXh0VmFsdWUgPT09IFwiYWxsXCIpIHtcbiAgICAgICAgICBvbkNoYW5nZShuZXh0VmFsdWUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBvbkNoYW5nZShcImFsbFwiKTtcbiAgICAgIH19XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICBpZEJhc2U9XCJleHBlbnNlLXByb2Nlc3NlZC1ieS1pYS1maWx0ZXJcIlxuICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZW1vdGVTZWFyY2hDb21ib2JveCwgeyB0eXBlIFJlbW90ZVNlYXJjaE9wdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUmVtb3RlU2VhcmNoQ29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvLFxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvLFxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCxcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdCwgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgbW9kZT86IFwiZ2VuZXJhbFwiIHwgXCJsaW5rXCI7XG4gIGNyZWF0ZWREYXRlRnJvbT86IHN0cmluZztcbiAgY3JlYXRlZERhdGVUbz86IHN0cmluZztcbiAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICBmaXhlZFN0YXR1c0ZpbHRlcj86IDAgfCAxIHwgbnVsbDtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG59O1xuXG5jb25zdCBTRUFSQ0hfUEFHRV9TSVpFID0gMzA7XG5cbi8vIEJ1aWxkcyBtaW5pbWFsIHBheWxvYWQgZm9yIHRpY2tldCBrZXkgc3VnZ2VzdGlvbnMgd2l0aG91dCBkYXRlIGZpbHRlcnMuXG5jb25zdCBidWlsZFRpY2tldFN1Z2dlc3RQYXlsb2FkID0gKFxuICB0ZXJtOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemU6IG51bWJlcixcbiAgZml4ZWRTdGF0dXNGaWx0ZXI6IDAgfCAxIHwgbnVsbCxcbiAgY3JlYXRlZERhdGVGcm9tOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gIGNyZWF0ZWREYXRlVG86IHN0cmluZyB8IHVuZGVmaW5lZFxuKTogRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QgfCBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QgPT4ge1xuICBjb25zdCBzYWZlVGVybSA9IFN0cmluZyh0ZXJtIHx8IFwiXCIpLnRyaW0oKTtcbiAgY29uc3QgYmFzZVBheWxvYWQgPSB7XG4gICAgcGFnZTogTnVtYmVyLmlzRmluaXRlKHBhZ2UpICYmIHBhZ2UgPiAwID8gTWF0aC5mbG9vcihwYWdlKSA6IDEsXG4gICAgcGFnZVNpemU6IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gTWF0aC5mbG9vcihwYWdlU2l6ZSkgOiBTRUFSQ0hfUEFHRV9TSVpFLFxuICAgIGNyZWF0ZWREYXRlRnJvbTogY3JlYXRlZERhdGVGcm9tIHx8IHVuZGVmaW5lZCxcbiAgICBjcmVhdGVkRGF0ZVRvOiBjcmVhdGVkRGF0ZVRvIHx8IHVuZGVmaW5lZCxcbiAgICBzZWFyY2hLZXk6IHNhZmVUZXJtIHx8IHVuZGVmaW5lZCxcbiAgICBmaWx0ZXI6IHNhZmVUZXJtIHx8IHVuZGVmaW5lZCxcbiAgfTtcblxuICBpZiAoZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDAgfHwgZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDEpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uYmFzZVBheWxvYWQsXG4gICAgICBzdGF0dXM6IGZpeGVkU3RhdHVzRmlsdGVyLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4gYmFzZVBheWxvYWQ7XG59O1xuXG5jb25zdCBtYXBUaWNrZXRPcHRpb25zID0gKFxuICBpdGVtczogQXJyYXk8RXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8gfCBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdEl0ZW1EdG8+IHwgdW5kZWZpbmVkXG4pOiBSZW1vdGVTZWFyY2hPcHRpb25bXSA9PiB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcyA6IFtdKVxuICAgIC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGZpbGVJZCA9IFN0cmluZyhpdGVtPy5GaWxlSWQgfHwgXCJcIikudHJpbSgpO1xuICAgICAgaWYgKCFmaWxlSWQpIHJldHVybiBudWxsO1xuXG4gICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IFN0cmluZyhpdGVtPy5EZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XG4gICAgICBjb25zdCBzdWJ0aXRsZSA9IGRlc2NyaXB0aW9uIHx8IFwiLVwiO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IGZpbGVJZCxcbiAgICAgICAgdGl0bGU6IGZpbGVJZCxcbiAgICAgICAgc3VidGl0bGUsXG4gICAgICB9IGFzIFJlbW90ZVNlYXJjaE9wdGlvbjtcbiAgICB9KVxuICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgUmVtb3RlU2VhcmNoT3B0aW9uW107XG59O1xuXG4vLyBUaWNrZXQga2V5IGZpbHRlciBpbnB1dCB3aXRoIHJlbW90ZSBsaXN0IHN1Z2dlc3Rpb25zLlxuY29uc3QgRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIG1vZGUgPSBcImdlbmVyYWxcIixcbiAgY3JlYXRlZERhdGVGcm9tID0gXCJcIixcbiAgY3JlYXRlZERhdGVUbyA9IFwiXCIsXG4gIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zID0gdHJ1ZSxcbiAgZml4ZWRTdGF0dXNGaWx0ZXIgPSBudWxsLFxuICByZWFkT25seSA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICBzaG93TGFiZWwgPSB0cnVlLFxufTogRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0UHJvcHMpID0+IHtcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XG5cbiAgY29uc3QgbG9hZE9wdGlvbnMgPSB1c2VDYWxsYmFjayhhc3luYyAodGVybTogc3RyaW5nLCBzaWduYWw6IEFib3J0U2lnbmFsKTogUHJvbWlzZTxSZW1vdGVTZWFyY2hPcHRpb25bXT4gPT4ge1xuICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZFRpY2tldFN1Z2dlc3RQYXlsb2FkKHRlcm0sIDEsIFNFQVJDSF9QQUdFX1NJWkUsIGZpeGVkU3RhdHVzRmlsdGVyLCBjcmVhdGVkRGF0ZUZyb20sIGNyZWF0ZWREYXRlVG8pO1xuICAgIGNvbnN0IHJlc3BvbnNlID1cbiAgICAgIG1vZGUgPT09IFwibGlua1wiXG4gICAgICAgID8gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdChwYXlsb2FkIGFzIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCwge1xuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgICBzaWduYWwsXG4gICAgICAgICAgfSlcbiAgICAgICAgOiBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0KHBheWxvYWQgYXMgRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsIHtcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgc2lnbmFsLFxuICAgICAgICAgIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHJldHVybiBtYXBUaWNrZXRPcHRpb25zKHJlc3BvbnNlPy5JdGVtcyk7XG4gIH0sIFtjcmVhdGVkRGF0ZUZyb20sIGNyZWF0ZWREYXRlVG8sIGZpeGVkU3RhdHVzRmlsdGVyLCBtb2RlXSk7XG5cbiAgY29uc3QgbG9hZE9wdGlvbnNQYWdlID0gdXNlQ2FsbGJhY2soYXN5bmMgKHRlcm06IHN0cmluZywgcGFnZTogbnVtYmVyLCBfcGFnZVNpemU6IG51bWJlciwgc2lnbmFsOiBBYm9ydFNpZ25hbCkgPT4ge1xuICAgIGNvbnN0IHBheWxvYWQgPSBidWlsZFRpY2tldFN1Z2dlc3RQYXlsb2FkKFxuICAgICAgdGVybSxcbiAgICAgIHBhZ2UsXG4gICAgICBTRUFSQ0hfUEFHRV9TSVpFLFxuICAgICAgZml4ZWRTdGF0dXNGaWx0ZXIsXG4gICAgICBjcmVhdGVkRGF0ZUZyb20sXG4gICAgICBjcmVhdGVkRGF0ZVRvXG4gICAgKTtcbiAgICBjb25zdCByZXNwb25zZSA9XG4gICAgICBtb2RlID09PSBcImxpbmtcIlxuICAgICAgICA/IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3QocGF5bG9hZCBhcyBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QsIHtcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgc2lnbmFsLFxuICAgICAgICAgIH0pXG4gICAgICAgIDogYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdChwYXlsb2FkIGFzIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LCB7XG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHNpZ25hbCxcbiAgICAgICAgICB9KTtcblxuICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgdG90YWw6IDAsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogbWFwVGlja2V0T3B0aW9ucyhyZXNwb25zZT8uSXRlbXMpLFxuICAgICAgdG90YWw6IE51bWJlcihyZXNwb25zZT8uVG90YWwgfHwgMCksXG4gICAgfTtcbiAgfSwgW2NyZWF0ZWREYXRlRnJvbSwgY3JlYXRlZERhdGVUbywgZml4ZWRTdGF0dXNGaWx0ZXIsIG1vZGVdKTtcblxuICBpZiAoIWVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zIHx8IHJlYWRPbmx5TW9kZSkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICB7c2hvd0xhYmVsID8gKFxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIiBzdHlsZT17eyBjb2xvcjogXCIjMDAyOTZiZTBcIiB9fT5cbiAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcHgtMyBweS0yIHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTkwMCBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCJcbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XG4gICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxSZW1vdGVTZWFyY2hDb21ib2JveFxuICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgb25TZWFyY2g9e2FzeW5jICh0ZXJtLCBzaWduYWwpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbG9hZE9wdGlvbnModGVybSwgc2lnbmFsKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9fVxuICAgICAgb25TZWFyY2hQYWdlPXthc3luYyAodGVybSwgcGFnZSwgcGFnZVNpemUsIHNpZ25hbCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBhd2FpdCBsb2FkT3B0aW9uc1BhZ2UodGVybSwgcGFnZSwgcGFnZVNpemUsIHNpZ25hbCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgcmV0dXJuIHsgaXRlbXM6IFtdLCB0b3RhbDogMCB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICAgIGlkQmFzZT1cImV4cGVuc2UtdGlja2V0LWZpbHRlci1rZXlcIlxuICAgICAgbWluU2VhcmNoTGVuZ3RoPXswfVxuICAgICAgcGFnZVNpemU9e1NFQVJDSF9QQUdFX1NJWkV9XG4gICAgICBhbGxvd0VtcHR5U2VhcmNoXG4gICAgICBsb2FkT25PcGVuXG4gICAgICBpbmZpbml0ZVNjcm9sbFxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XG4gICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dDtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUge1xuICBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxuICBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCxcbn0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VUaWNrZXRTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgeyBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdC50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlQXJncyA9IHtcbiAgb25BcHBseUZpbHRlcnM6IChzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4gdm9pZDtcbiAgb25DbGVhckZpbHRlcnM6ICgpID0+IHZvaWQ7XG4gIGRlZmF1bHRNYW5hZ2VkVXNlcklkOiBzdHJpbmc7XG4gIGZpeGVkU3RhdHVzRmlsdGVyPzogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUgfCBudWxsO1xuICBhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5PzogYm9vbGVhbjtcbn07XG5cbi8vIE93bnMgZmlsdGVyIFVJIHN0YXRlIGFuZCBhcHBseS9jbGVhciBydWxlcyBmb3IgZXhwZW5zZSB0aWNrZXRzIGxpc3QgcGFnZS5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZSA9ICh7XG4gIG9uQXBwbHlGaWx0ZXJzLFxuICBvbkNsZWFyRmlsdGVycyxcbiAgZGVmYXVsdE1hbmFnZWRVc2VySWQsXG4gIGZpeGVkU3RhdHVzRmlsdGVyID0gbnVsbCxcbiAgYWxsb3dFbXB0eURhdGVzT25BcHBseSA9IGZhbHNlLFxufTogVXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGVBcmdzKSA9PiB7XG4gIGNvbnN0IGhhc0ZpeGVkU3RhdHVzRmlsdGVyID0gZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDAgfHwgZml4ZWRTdGF0dXNGaWx0ZXIgPT09IDE7XG5cbiAgY29uc3QgcmVzb2x2ZVN0YXR1c0ZpbHRlciA9IHVzZUNhbGxiYWNrKFxuICAgICh2YWx1ZTogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpOiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSA9PiB7XG4gICAgICBpZiAoaGFzRml4ZWRTdGF0dXNGaWx0ZXIpIHtcbiAgICAgICAgcmV0dXJuIGZpeGVkU3RhdHVzRmlsdGVyIGFzIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgW2ZpeGVkU3RhdHVzRmlsdGVyLCBoYXNGaXhlZFN0YXR1c0ZpbHRlcl1cbiAgKTtcblxuICBjb25zdCBbZnJvbURhdGUsIHNldEZyb21EYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbdG9EYXRlLCBzZXRUb0RhdGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtmaWx0ZXJLZXksIHNldEZpbHRlcktleV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2N1cnJlbmN5Q29kZSwgc2V0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbWFuYWdlZFVzZXJJZCwgc2V0TWFuYWdlZFVzZXJJZF0gPSB1c2VTdGF0ZShkZWZhdWx0TWFuYWdlZFVzZXJJZCk7XG4gIGNvbnN0IFtzdGF0dXNGaWx0ZXJSYXcsIHNldFN0YXR1c0ZpbHRlclJhd10gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZT4ocmVzb2x2ZVN0YXR1c0ZpbHRlcihcIlwiKSk7XG4gIGNvbnN0IFtnYXN0b1R5cGVGaWx0ZXIsIHNldEdhc3RvVHlwZUZpbHRlcl0gPSB1c2VTdGF0ZTxcIlwiIHwgRXhwZW5zZUdhc3RvVHlwZUNvZGU+KFwiXCIpO1xuICBjb25zdCBbcHJvY2Vzc2VkQnlJYUZpbHRlciwgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcl0gPSB1c2VTdGF0ZTxcImFsbFwiIHwgXCJ5ZXNcIiB8IFwibm9cIj4oXCJhbGxcIik7XG4gIGNvbnN0IFthY3RpdmVRdWlja0ZpbHRlciwgc2V0QWN0aXZlUXVpY2tGaWx0ZXJdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldFF1aWNrRmlsdGVySWQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3Nob3dNYW51YWxEYXRlRmlsdGVyLCBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93TWFudWFsRGF0ZUVycm9yLCBzZXRTaG93TWFudWFsRGF0ZUVycm9yXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW21hbnVhbERhdGVBdXRvT3BlbktleSwgc2V0TWFudWFsRGF0ZUF1dG9PcGVuS2V5XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbYXBwbGllZEZpbHRlcnMsIHNldEFwcGxpZWRGaWx0ZXJzXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3Nob3dGaWx0ZXJzLCBzZXRTaG93RmlsdGVyc10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaGFzRml4ZWRTdGF0dXNGaWx0ZXIpIHJldHVybjtcbiAgICBzZXRTdGF0dXNGaWx0ZXJSYXcoZml4ZWRTdGF0dXNGaWx0ZXIgYXMgRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUpO1xuICB9LCBbZml4ZWRTdGF0dXNGaWx0ZXIsIGhhc0ZpeGVkU3RhdHVzRmlsdGVyXSk7XG5cbiAgY29uc3Qgc3RhdHVzRmlsdGVyID0gcmVzb2x2ZVN0YXR1c0ZpbHRlcihzdGF0dXNGaWx0ZXJSYXcpO1xuXG4gIGNvbnN0IGN1cnJlbnRGaWx0ZXJzID0gdXNlTWVtbzxFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90PihcbiAgICAoKSA9PiAoe1xuICAgICAgZnJvbURhdGUsXG4gICAgICB0b0RhdGUsXG4gICAgICBmaWx0ZXJLZXk6IGZpbHRlcktleS50cmltKCksXG4gICAgICBjdXJyZW5jeUNvZGU6IGN1cnJlbmN5Q29kZS50cmltKCksXG4gICAgICBtYW5hZ2VkVXNlcklkOiBtYW5hZ2VkVXNlcklkLnRyaW0oKSxcbiAgICAgIHN0YXR1c0ZpbHRlcixcbiAgICAgIGdhc3RvVHlwZUZpbHRlcixcbiAgICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gICAgfSksXG4gICAgW2N1cnJlbmN5Q29kZSwgZmlsdGVyS2V5LCBmcm9tRGF0ZSwgZ2FzdG9UeXBlRmlsdGVyLCBtYW5hZ2VkVXNlcklkLCBwcm9jZXNzZWRCeUlhRmlsdGVyLCBzdGF0dXNGaWx0ZXIsIHRvRGF0ZV1cbiAgKTtcblxuICBjb25zdCBzZXRTdGF0dXNGaWx0ZXIgPSB1c2VDYWxsYmFjayhcbiAgICAodmFsdWU6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlKSA9PiB7XG4gICAgICBpZiAoaGFzRml4ZWRTdGF0dXNGaWx0ZXIpIHtcbiAgICAgICAgc2V0U3RhdHVzRmlsdGVyUmF3KGZpeGVkU3RhdHVzRmlsdGVyIGFzIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2V0U3RhdHVzRmlsdGVyUmF3KHZhbHVlKTtcbiAgICB9LFxuICAgIFtmaXhlZFN0YXR1c0ZpbHRlciwgaGFzRml4ZWRTdGF0dXNGaWx0ZXJdXG4gICk7XG5cbiAgY29uc3Qgb25BcHBseSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWFsbG93RW1wdHlEYXRlc09uQXBwbHkgJiYgKCFmcm9tRGF0ZSB8fCAhdG9EYXRlKSkge1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcih0cnVlKTtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKHRydWUpO1xuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgPSB7XG4gICAgICBmcm9tRGF0ZSxcbiAgICAgIHRvRGF0ZSxcbiAgICAgIGZpbHRlcktleTogZmlsdGVyS2V5LnRyaW0oKSxcbiAgICAgIGN1cnJlbmN5Q29kZTogY3VycmVuY3lDb2RlLnRyaW0oKSxcbiAgICAgIG1hbmFnZWRVc2VySWQ6IG1hbmFnZWRVc2VySWQudHJpbSgpLFxuICAgICAgc3RhdHVzRmlsdGVyLFxuICAgICAgZ2FzdG9UeXBlRmlsdGVyLFxuICAgICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgICB9O1xuXG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgc2V0QXBwbGllZEZpbHRlcnMoc25hcHNob3QpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XG4gICAgb25BcHBseUZpbHRlcnMoc25hcHNob3QpO1xuICB9LCBbXG4gICAgYWxsb3dFbXB0eURhdGVzT25BcHBseSxcbiAgICBjdXJyZW5jeUNvZGUsXG4gICAgZmlsdGVyS2V5LFxuICAgIGZyb21EYXRlLFxuICAgIGdhc3RvVHlwZUZpbHRlcixcbiAgICBtYW5hZ2VkVXNlcklkLFxuICAgIG9uQXBwbHlGaWx0ZXJzLFxuICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gICAgc3RhdHVzRmlsdGVyLFxuICAgIHRvRGF0ZSxcbiAgXSk7XG5cbiAgLy8gUmVoeWRyYXRlcyB0aWNrZXQgZmlsdGVycyBmcm9tIGEgY2FjaGVkIHNuYXBzaG90IHdoZW4gcmV0dXJuaW5nIGZyb20gZGV0YWlsLlxuICBjb25zdCByZXN0b3JlQXBwbGllZEZpbHRlcnMgPSB1c2VDYWxsYmFjayhcbiAgICAoc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpID0+IHtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3Qoc25hcHNob3QpO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZFN0YXR1c0ZpbHRlciA9IHJlc29sdmVTdGF0dXNGaWx0ZXIobm9ybWFsaXplZC5zdGF0dXNGaWx0ZXIpO1xuICAgICAgY29uc3QgcmVzdG9yZWRNYW5hZ2VkVXNlcklkID0gU3RyaW5nKG5vcm1hbGl6ZWQubWFuYWdlZFVzZXJJZCB8fCBkZWZhdWx0TWFuYWdlZFVzZXJJZCkudHJpbSgpO1xuICAgICAgc2V0RnJvbURhdGUobm9ybWFsaXplZC5mcm9tRGF0ZSk7XG4gICAgICBzZXRUb0RhdGUobm9ybWFsaXplZC50b0RhdGUpO1xuICAgICAgc2V0RmlsdGVyS2V5KG5vcm1hbGl6ZWQuZmlsdGVyS2V5KTtcbiAgICAgIHNldEN1cnJlbmN5Q29kZShub3JtYWxpemVkLmN1cnJlbmN5Q29kZSk7XG4gICAgICBzZXRNYW5hZ2VkVXNlcklkKHJlc3RvcmVkTWFuYWdlZFVzZXJJZCk7XG4gICAgICBzZXRTdGF0dXNGaWx0ZXJSYXcobm9ybWFsaXplZFN0YXR1c0ZpbHRlcik7XG4gICAgICBzZXRHYXN0b1R5cGVGaWx0ZXIobm9ybWFsaXplZC5nYXN0b1R5cGVGaWx0ZXIpO1xuICAgICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcihub3JtYWxpemVkLnByb2Nlc3NlZEJ5SWFGaWx0ZXIpO1xuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICAgIHNldEFwcGxpZWRGaWx0ZXJzKHtcbiAgICAgICAgLi4ubm9ybWFsaXplZCxcbiAgICAgICAgbWFuYWdlZFVzZXJJZDogcmVzdG9yZWRNYW5hZ2VkVXNlcklkLFxuICAgICAgICBzdGF0dXNGaWx0ZXI6IG5vcm1hbGl6ZWRTdGF0dXNGaWx0ZXIsXG4gICAgICB9KTtcbiAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcbiAgICB9LFxuICAgIFtkZWZhdWx0TWFuYWdlZFVzZXJJZCwgcmVzb2x2ZVN0YXR1c0ZpbHRlcl1cbiAgKTtcblxuICBjb25zdCBvbkNsZWFyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEZyb21EYXRlKFwiXCIpO1xuICAgIHNldFRvRGF0ZShcIlwiKTtcbiAgICBzZXRGaWx0ZXJLZXkoXCJcIik7XG4gICAgc2V0Q3VycmVuY3lDb2RlKFwiXCIpO1xuICAgIHNldE1hbmFnZWRVc2VySWQoZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICAgIHNldFN0YXR1c0ZpbHRlclJhdyhyZXNvbHZlU3RhdHVzRmlsdGVyKFwiXCIpKTtcbiAgICBzZXRHYXN0b1R5cGVGaWx0ZXIoXCJcIik7XG4gICAgc2V0UHJvY2Vzc2VkQnlJYUZpbHRlcihcImFsbFwiKTtcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgc2V0TWFudWFsRGF0ZUF1dG9PcGVuS2V5KDApO1xuICAgIHNldEFwcGxpZWRGaWx0ZXJzKG51bGwpO1xuICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xuICAgIG9uQ2xlYXJGaWx0ZXJzKCk7XG4gIH0sIFtkZWZhdWx0TWFuYWdlZFVzZXJJZCwgb25DbGVhckZpbHRlcnMsIHJlc29sdmVTdGF0dXNGaWx0ZXJdKTtcblxuICBjb25zdCBvbkRhdGVSYW5nZUNoYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgIChuZXh0RnJvbURhdGU6IHN0cmluZywgbmV4dFRvRGF0ZTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBoYXNGdWxsUmFuZ2UgPSAhIW5leHRGcm9tRGF0ZSAmJiAhIW5leHRUb0RhdGU7XG4gICAgICBzZXRGcm9tRGF0ZShuZXh0RnJvbURhdGUpO1xuICAgICAgc2V0VG9EYXRlKG5leHRUb0RhdGUpO1xuICAgICAgaWYgKCFoYXNGdWxsUmFuZ2UpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIodHJ1ZSk7XG4gICAgICB9XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgIGlmIChzaG93TWFudWFsRGF0ZUVycm9yKSB7XG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoIWhhc0Z1bGxSYW5nZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbc2hvd01hbnVhbERhdGVFcnJvcl1cbiAgKTtcblxuICBjb25zdCBvbk1hbnVhbFJhbmdlQ29tcGxldGUgPSB1c2VDYWxsYmFjaygobmV4dEZyb21EYXRlOiBzdHJpbmcsIG5leHRUb0RhdGU6IHN0cmluZykgPT4ge1xuICAgIHNldEZyb21EYXRlKG5leHRGcm9tRGF0ZSk7XG4gICAgc2V0VG9EYXRlKG5leHRUb0RhdGUpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG9uUXVpY2tGaWx0ZXJDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAoZmlsdGVySWQ6IEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkKSA9PiB7XG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiY3VzdG9tXCIpIHtcbiAgICAgICAgaWYgKHNob3dNYW51YWxEYXRlRmlsdGVyKSB7XG4gICAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgICAgIHNldE1hbnVhbERhdGVBdXRvT3BlbktleSgocHJldmlvdXMpID0+IHByZXZpb3VzICsgMSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoZmlsdGVySWQpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG5cbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcbiAgICAgIGNvbnN0IG5leHRGcm9tID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtN1wiKSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gNik7XG4gICAgICB9IGVsc2UgaWYgKGZpbHRlcklkID09PSBcImRheXMtMzBcIikge1xuICAgICAgICBuZXh0RnJvbS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDI5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHRGcm9tLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gODkpO1xuICAgICAgfVxuXG4gICAgICBzZXRGcm9tRGF0ZSh0b0lzb0RhdGUobmV4dEZyb20pKTtcbiAgICAgIHNldFRvRGF0ZSh0b0lzb0RhdGUodG9kYXkpKTtcbiAgICB9LFxuICAgIFtzaG93TWFudWFsRGF0ZUZpbHRlcl1cbiAgKTtcblxuICBjb25zdCB0b2dnbGVGaWx0ZXJQYW5lbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRTaG93RmlsdGVycygocHJldmlvdXMpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSAhcHJldmlvdXM7XG4gICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIGZyb21EYXRlLFxuICAgIHRvRGF0ZSxcbiAgICBmaWx0ZXJLZXksXG4gICAgY3VycmVuY3lDb2RlLFxuICAgIG1hbmFnZWRVc2VySWQsXG4gICAgc3RhdHVzRmlsdGVyLFxuICAgIGdhc3RvVHlwZUZpbHRlcixcbiAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxuICAgIGFwcGxpZWRGaWx0ZXJzLFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIGN1cnJlbnRGaWx0ZXJzLFxuICAgIHNldEZpbHRlcktleSxcbiAgICBzZXRDdXJyZW5jeUNvZGUsXG4gICAgc2V0TWFuYWdlZFVzZXJJZCxcbiAgICBzZXRTdGF0dXNGaWx0ZXIsXG4gICAgc2V0R2FzdG9UeXBlRmlsdGVyLFxuICAgIHNldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gICAgb25BcHBseSxcbiAgICBvbkNsZWFyLFxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcbiAgICBvbkRhdGVSYW5nZUNoYW5nZSxcbiAgICBvbk1hbnVhbFJhbmdlQ29tcGxldGUsXG4gICAgb25RdWlja0ZpbHRlckNoYW5nZSxcbiAgICB0b2dnbGVGaWx0ZXJQYW5lbCxcbiAgICBzdGF0dXNGaWx0ZXJMb2NrZWQ6IGhhc0ZpeGVkU3RhdHVzRmlsdGVyLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3QsIGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgaXNFeHBlbnNlQWJvcnRMaWtlRXJyb3IsIHJ1bkV4cGVuc2VSZWFkUmVxdWVzdFdpdGhSZXRyeSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlUmVxdWVzdFJldHJ5LnRzXCI7XG5pbXBvcnQge1xuICBidWlsZEV4cGVuc2VUaWNrZXRMaW5rTGlzdFBheWxvYWQsXG4gIGJ1aWxkRXhwZW5zZVRpY2tldExpc3RQYXlsb2FkLFxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVBheWxvYWRCdWlsZGVycy50c1wiO1xuaW1wb3J0IHR5cGUge1xuICBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxuICBFeHBlbnNlVGlja2V0Q2FyZCxcbiAgRXhwZW5zZVRpY2tldExpbmtDYXJkLFxuICBFeHBlbnNlVGlja2V0TGlzdFBhZ2VJdGVtLFxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YUFyZ3MgPSB7XG4gIGhhc0FjY2VzczogYm9vbGVhbjtcbiAgcGFnZVNpemU6IG51bWJlcjtcbiAgbW9kZTogXCJnZW5lcmFsXCIgfCBcImxpbmtcIjtcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBBTExPV0VEX0dBU1RPX1RZUEVfQ09ERVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XG5jb25zdCBFWFBFTlNFX1RJQ0tFVFNfTElTVF9MT0dfUFJFRklYID0gXCJbZXhwZW5zZS10aWNrZXRzOmxpc3RdXCI7XG5cbmNvbnN0IGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS5pbmZvID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBjb25zb2xlLmluZm8oRVhQRU5TRV9USUNLRVRTX0xJU1RfTE9HX1BSRUZJWCwgLi4uYXJncyk7XG4gIH1cbn07XG5cbmNvbnN0IGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS53YXJuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBjb25zb2xlLndhcm4oRVhQRU5TRV9USUNLRVRTX0xJU1RfTE9HX1BSRUZJWCwgLi4uYXJncyk7XG4gIH1cbn07XG5cbmNvbnN0IGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEVycm9yID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGNvbnNvbGUuZXJyb3IoRVhQRU5TRV9USUNLRVRTX0xJU1RfTE9HX1BSRUZJWCwgLi4uYXJncyk7XG4gIH1cbn07XG5cbmNvbnN0IGJ1aWxkRXhwZW5zZVRpY2tldHNEZWJ1Z1N0YWNrID0gKGxhYmVsOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAodHlwZW9mIEVycm9yICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBcIlwiO1xuICBjb25zdCByYXdTdGFjayA9IG5ldyBFcnJvcihsYWJlbCkuc3RhY2s7XG4gIGlmICh0eXBlb2YgcmF3U3RhY2sgIT09IFwic3RyaW5nXCIgfHwgIXJhd1N0YWNrLnRyaW0oKSkgcmV0dXJuIFwiXCI7XG4gIHJldHVybiByYXdTdGFja1xuICAgIC5zcGxpdChcIlxcblwiKVxuICAgIC5zbGljZSgwLCA2KVxuICAgIC5qb2luKFwiXFxuXCIpO1xufTtcblxuY29uc3QgdG9OdWxsYWJsZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xufTtcblxuY29uc3QgdG9OdWxsYWJsZUJvb2wgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuIHwgbnVsbCA9PiB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSByZXR1cm4gdmFsdWU7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHJldHVybiB2YWx1ZSA9PT0gMSA/IHRydWUgOiB2YWx1ZSA9PT0gMCA/IGZhbHNlIDogbnVsbDtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB2YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAobm9ybWFsaXplZCA9PT0gXCJ0cnVlXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIxXCIpIHJldHVybiB0cnVlO1xuICAgIGlmIChub3JtYWxpemVkID09PSBcImZhbHNlXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIwXCIpIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IHRvTnVsbGFibGVUaWNrZXRTdGF0dXMgPSAodmFsdWU6IHVua25vd24pOiAwIHwgMSB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICByZXR1cm4gcGFyc2VkID09PSAwIHx8IHBhcnNlZCA9PT0gMSA/IHBhcnNlZCA6IG51bGw7XG59O1xuXG5jb25zdCB0b051bGxhYmxlVGlja2V0R2FzdG9UeXBlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZUdhc3RvVHlwZUNvZGUgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgfHwgIUFMTE9XRURfR0FTVE9fVFlQRV9DT0RFUy5oYXMocGFyc2VkKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlZCBhcyBFeHBlbnNlR2FzdG9UeXBlQ29kZTtcbn07XG5cbmNvbnN0IG1hcFRpY2tldEl0ZW1Ub0NhcmQgPSAoaXRlbTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBFeHBlbnNlVGlja2V0Q2FyZCA9PiB7XG4gIHJldHVybiB7XG4gICAga2luZDogXCJnZW5lcmFsXCIsXG4gICAgZmlsZUlkOiBTdHJpbmcoaXRlbT8uRmlsZUlkIHx8IFwiXCIpLnRyaW0oKSxcbiAgICBkZXNjcmlwdGlvbjogU3RyaW5nKGl0ZW0/LkRlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKSxcbiAgICBzdGF0dXM6IHRvTnVsbGFibGVUaWNrZXRTdGF0dXMoaXRlbT8uU3RhdHVzKSxcbiAgICBwcm9jZXNzZWRCeUFJOiB0b051bGxhYmxlQm9vbChpdGVtPy5Qcm9jZXNzZWRCeUFJKSxcbiAgICBjdXJyZW5jeUNvZGU6IFN0cmluZyhpdGVtPy5DdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLFxuICAgIHRvdGFsQW1vdW50OiB0b051bGxhYmxlTnVtYmVyKGl0ZW0/LlRvdGFsQW1vdW50KSxcbiAgICB0cmFuc0RhdGU6IFN0cmluZyhpdGVtPy5UcmFuc0RhdGUgfHwgXCJcIikudHJpbSgpLFxuICAgIGZpbGVOYW1lOiBTdHJpbmcoaXRlbT8uRmlsZU5hbWUgfHwgXCJcIikudHJpbSgpLFxuICAgIGdhc3RvVHlwZTogdG9OdWxsYWJsZVRpY2tldEdhc3RvVHlwZShpdGVtPy5HYXN0b1R5cGUgPz8gaXRlbT8uZ2FzdG9UeXBlKSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcFRpY2tldExpbmtJdGVtVG9DYXJkID0gKGl0ZW06IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogRXhwZW5zZVRpY2tldExpbmtDYXJkID0+IHtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiBcImxpbmtcIixcbiAgICBmaWxlSWQ6IFN0cmluZyhpdGVtPy5GaWxlSWQgfHwgXCJcIikudHJpbSgpLFxuICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoaXRlbT8uRGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpLFxuICAgIHByb2Nlc3NlZEJ5QUk6IHRvTnVsbGFibGVCb29sKGl0ZW0/LlByb2Nlc3NlZEJ5QUkpLFxuICAgIGN1cnJlbmN5Q29kZTogU3RyaW5nKGl0ZW0/LkN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCksXG4gICAgdG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbT8uVG90YWxBbW91bnQpLFxuICAgIHRyYW5zRGF0ZTogU3RyaW5nKGl0ZW0/LlRyYW5zRGF0ZSB8fCBcIlwiKS50cmltKCksXG4gICAgZmlsZU5hbWU6IFN0cmluZyhpdGVtPy5GaWxlTmFtZSB8fCBcIlwiKS50cmltKCksXG4gICAgZ2FzdG9UeXBlOiB0b051bGxhYmxlVGlja2V0R2FzdG9UeXBlKGl0ZW0/Lkdhc3RvVHlwZSA/PyBpdGVtPy5nYXN0b1R5cGUpLFxuICB9O1xufTtcblxuLy8gT3ducyBsaXN0IGRhdGEgZmV0Y2gsIGxvYWRpbmcgc3RhdGUsIGFuZCBwYWdpbmF0aW9uIG1ldGFkYXRhIGZvciB0aWNrZXRzLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGEgPSAoeyBoYXNBY2Nlc3MsIHBhZ2VTaXplLCBtb2RlLCBvbkZvcmJpZGRlbiB9OiBVc2VFeHBlbnNlVGlja2V0c0xpc3REYXRhQXJncykgPT4ge1xuICBjb25zdCBbaXRlbXMsIHNldEl0ZW1zXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW1bXT4oW10pO1xuICBjb25zdCBbdG90YWwsIHNldFRvdGFsXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbY3VycmVudFBhZ2UsIHNldEN1cnJlbnRQYWdlXSA9IHVzZVN0YXRlKDEpO1xuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmID0gdXNlUmVmPEFib3J0Q29udHJvbGxlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBhY3RpdmVSZXF1ZXN0S2V5UmVmID0gdXNlUmVmKFwiXCIpO1xuICBjb25zdCBhY3RpdmVSZXF1ZXN0U2VxUmVmID0gdXNlUmVmKDApO1xuXG4gIGNvbnN0IHJlc3RvcmVMaXN0U25hcHNob3QgPSB1c2VDYWxsYmFjayhcbiAgICAoc25hcHNob3Q6IHsgaXRlbXM6IEV4cGVuc2VUaWNrZXRMaXN0UGFnZUl0ZW1bXTsgdG90YWw6IG51bWJlcjsgcGFnZTogbnVtYmVyIH0pID0+IHtcbiAgICAgIGNvbnN0IHNhZmVJdGVtcyA9IEFycmF5LmlzQXJyYXkoc25hcHNob3QuaXRlbXMpID8gc25hcHNob3QuaXRlbXMgOiBbXTtcbiAgICAgIGNvbnN0IHNhZmVUb3RhbFJhdyA9IE51bWJlcihzbmFwc2hvdC50b3RhbCk7XG4gICAgICBjb25zdCBzYWZlVG90YWwgPSBOdW1iZXIuaXNGaW5pdGUoc2FmZVRvdGFsUmF3KSAmJiBzYWZlVG90YWxSYXcgPj0gMCA/IHNhZmVUb3RhbFJhdyA6IHNhZmVJdGVtcy5sZW5ndGg7XG4gICAgICBjb25zdCBzYWZlUGFnZVJhdyA9IE51bWJlcihzbmFwc2hvdC5wYWdlKTtcbiAgICAgIGNvbnN0IHNhZmVQYWdlID0gTnVtYmVyLmlzRmluaXRlKHNhZmVQYWdlUmF3KSAmJiBzYWZlUGFnZVJhdyA+IDAgPyBNYXRoLmZsb29yKHNhZmVQYWdlUmF3KSA6IDE7XG5cbiAgICAgIHNldEl0ZW1zKHNhZmVJdGVtcyk7XG4gICAgICBzZXRUb3RhbChzYWZlVG90YWwpO1xuICAgICAgc2V0Q3VycmVudFBhZ2Uoc2FmZVBhZ2UpO1xuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICB9LFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgbG9hZExpc3QgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAocGFnZTogbnVtYmVyLCBmaWx0ZXJzOiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB7XG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RJbmZvKFwibG9hZExpc3Q6cmVxdWVzdGVkXCIsIHtcbiAgICAgICAgcGFnZSxcbiAgICAgICAgbW9kZSxcbiAgICAgICAgaGFzQWNjZXNzLFxuICAgICAgICBmaWx0ZXJzLFxuICAgICAgfSk7XG4gICAgICBpZiAoIWhhc0FjY2Vzcykge1xuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwibG9hZExpc3Q6YmxvY2tlZC1uby1hY2Nlc3NcIiwge1xuICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgbW9kZSxcbiAgICAgICAgfSk7XG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGF5bG9hZCA9XG4gICAgICAgIG1vZGUgPT09IFwibGlua1wiXG4gICAgICAgICAgPyBidWlsZEV4cGVuc2VUaWNrZXRMaW5rTGlzdFBheWxvYWQoZmlsdGVycywgcGFnZSwgcGFnZVNpemUpXG4gICAgICAgICAgOiBidWlsZEV4cGVuc2VUaWNrZXRMaXN0UGF5bG9hZChmaWx0ZXJzLCBwYWdlLCBwYWdlU2l6ZSk7XG4gICAgICBjb25zdCBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCA9IFN0cmluZyhmaWx0ZXJzPy5tYW5hZ2VkVXNlcklkIHx8IFwiXCIpLnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgY29uc3QgcmVxdWVzdEtleSA9IEpTT04uc3RyaW5naWZ5KHsgbW9kZSwgcGF5bG9hZCwgbWFuYWdlZFVzZXJJZDogbm9ybWFsaXplZE1hbmFnZWRVc2VySWQgfSk7XG5cbiAgICAgIGlmIChhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ICYmIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9PT0gcmVxdWVzdEtleSkge1xuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwibG9hZExpc3Q6c2tpcC1kdXBsaWNhdGUtcmVxdWVzdFwiLCB7XG4gICAgICAgICAgcGFnZSxcbiAgICAgICAgICBtb2RlLFxuICAgICAgICAgIHJlcXVlc3RLZXksXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50KSB7XG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8oXCJsb2FkTGlzdDphYm9ydC1wcmV2aW91cy1yZXF1ZXN0XCIsIHtcbiAgICAgICAgICBwcmV2aW91c1JlcXVlc3RLZXk6IGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCxcbiAgICAgICAgICBwcmV2aW91c1JlcXVlc3RTZXE6IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCxcbiAgICAgICAgICBzdGFjazogYnVpbGRFeHBlbnNlVGlja2V0c0RlYnVnU3RhY2soXCJsb2FkTGlzdDphYm9ydC1wcmV2aW91cy1yZXF1ZXN0XCIpLFxuICAgICAgICB9KTtcbiAgICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudC5hYm9ydCgpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XG4gICAgICBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPSByZXF1ZXN0S2V5O1xuICAgICAgY29uc3QgcmVxdWVzdFNlcSA9IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCArIDE7XG4gICAgICBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQgPSByZXF1ZXN0U2VxO1xuICAgICAgY29uc3QgaGFuZGxlQWJvcnRTaWduYWwgPSAoKSA9PiB7XG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJsb2FkTGlzdDpzaWduYWwtYWJvcnQtZXZlbnRcIiwge1xuICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgbW9kZSxcbiAgICAgICAgICByZXF1ZXN0U2VxLFxuICAgICAgICAgIHJlcXVlc3RLZXksXG4gICAgICAgICAgc2lnbmFsQWJvcnRlZDogY29udHJvbGxlci5zaWduYWwuYWJvcnRlZCxcbiAgICAgICAgICBzaWduYWxSZWFzb246XG4gICAgICAgICAgICBcInJlYXNvblwiIGluIGNvbnRyb2xsZXIuc2lnbmFsXG4gICAgICAgICAgICAgID8gKChjb250cm9sbGVyLnNpZ25hbCBhcyBBYm9ydFNpZ25hbCAmIHsgcmVhc29uPzogdW5rbm93biB9KS5yZWFzb24gPz8gbnVsbClcbiAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICBjb250cm9sbGVyLnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgaGFuZGxlQWJvcnRTaWduYWwsIHsgb25jZTogdHJ1ZSB9KTtcblxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyhcImxvYWRMaXN0OmZldGNoLXN0YXJ0XCIsIHtcbiAgICAgICAgcGFnZSxcbiAgICAgICAgbW9kZSxcbiAgICAgICAgbm9ybWFsaXplZE1hbmFnZWRVc2VySWQsXG4gICAgICAgIHBheWxvYWQsXG4gICAgICAgIHJlcXVlc3RLZXksXG4gICAgICAgIHJlcXVlc3RTZXEsXG4gICAgICB9KTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBydW5FeHBlbnNlUmVhZFJlcXVlc3RXaXRoUmV0cnkoXG4gICAgICAgICAgKCkgPT5cbiAgICAgICAgICAgIG1vZGUgPT09IFwibGlua1wiXG4gICAgICAgICAgICAgID8gZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdChwYXlsb2FkLCB7XG4gICAgICAgICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgICAgICAgICAgICBheFVzZXJJZE92ZXJyaWRlOiBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgOiBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0KHBheWxvYWQsIHtcbiAgICAgICAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICAgICAgICAgICAgICAgIGF4VXNlcklkT3ZlcnJpZGU6IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyhcImxvYWRMaXN0OmZldGNoLWZpbmlzaGVkXCIsIHtcbiAgICAgICAgICBwYWdlLFxuICAgICAgICAgIG1vZGUsXG4gICAgICAgICAgcmVxdWVzdFNlcSxcbiAgICAgICAgICBzdWNjZXNzOiByZXNwb25zZT8uU3VjY2VzcyxcbiAgICAgICAgICB0b3RhbDogcmVzcG9uc2U/LlRvdGFsLFxuICAgICAgICAgIGl0ZW1zOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcy5sZW5ndGggOiAwLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHJlcXVlc3RTZXEgIT09IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwibG9hZExpc3Q6YXBpLXVuc3VjY2Vzc2Z1bFwiLCB7XG4gICAgICAgICAgICBwYWdlLFxuICAgICAgICAgICAgbW9kZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLk1lc3NhZ2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIlRpY2tldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0cy5cIikpO1xuICAgICAgICAgIHNldEl0ZW1zKFtdKTtcbiAgICAgICAgICBzZXRUb3RhbCgwKTtcbiAgICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzb3VyY2VJdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gICAgICAgIGNvbnN0IG1hcHBlZEl0ZW1zID0gc291cmNlSXRlbXMubWFwKChpdGVtKSA9PlxuICAgICAgICAgIG1vZGUgPT09IFwibGlua1wiXG4gICAgICAgICAgICA/IG1hcFRpY2tldExpbmtJdGVtVG9DYXJkKGl0ZW0gYXMgdW5rbm93biBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilcbiAgICAgICAgICAgIDogbWFwVGlja2V0SXRlbVRvQ2FyZChpdGVtIGFzIHVua25vd24gYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlVG90YWwgPSBOdW1iZXIocmVzcG9uc2U/LlRvdGFsID8/IG1hcHBlZEl0ZW1zLmxlbmd0aCA/PyAwKTtcblxuICAgICAgICBzZXRJdGVtcyhtYXBwZWRJdGVtcyk7XG4gICAgICAgIHNldFRvdGFsKHJlc3BvbnNlVG90YWwpO1xuICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChyZXF1ZXN0U2VxICE9PSBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICAgICAgaWYgKGlzRXhwZW5zZUFib3J0TGlrZUVycm9yKGVycm9yLCBjb250cm9sbGVyLnNpZ25hbCkpIHtcbiAgICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwibG9hZExpc3Q6YWJvcnRlZFwiLCB7XG4gICAgICAgICAgICBwYWdlLFxuICAgICAgICAgICAgbW9kZSxcbiAgICAgICAgICAgIHJlcXVlc3RTZXEsXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGVycm9yLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwibG9hZExpc3Q6Zm9yYmlkZGVuXCIsIHtcbiAgICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgICBtb2RlLFxuICAgICAgICAgICAgcmVxdWVzdFNlcSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEVycm9yKFwibG9hZExpc3Q6ZmFpbGVkXCIsIHtcbiAgICAgICAgICBwYWdlLFxuICAgICAgICAgIG1vZGUsXG4gICAgICAgICAgcmVxdWVzdFNlcSxcbiAgICAgICAgICBtZXNzYWdlOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGVycm9yLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIlRpY2tldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0cy5cIik7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgc2V0SXRlbXMoW10pO1xuICAgICAgICBzZXRUb3RhbCgwKTtcbiAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBjb250cm9sbGVyLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgaGFuZGxlQWJvcnRTaWduYWwpO1xuICAgICAgICBpZiAocmVxdWVzdFNlcSA9PT0gYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyhcImxvYWRMaXN0OmZpbmFsaXplXCIsIHtcbiAgICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgICBtb2RlLFxuICAgICAgICAgICAgcmVxdWVzdFNlcSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICAgIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFtoYXNBY2Nlc3MsIG1vZGUsIG9uRm9yYmlkZGVuLCBwYWdlU2l6ZV1cbiAgKTtcblxuICBjb25zdCByZXNldExpc3QgPSB1c2VDYWxsYmFjaygoc291cmNlID0gXCJ1bmtub3duXCIpID0+IHtcbiAgICBpZiAoYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCkge1xuICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcInJlc2V0TGlzdDphYm9ydC1hY3RpdmUtcmVxdWVzdFwiLCB7XG4gICAgICAgIHNvdXJjZSxcbiAgICAgICAgYWN0aXZlUmVxdWVzdEtleTogYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50LFxuICAgICAgICBhY3RpdmVSZXF1ZXN0U2VxOiBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQsXG4gICAgICAgIHN0YWNrOiBidWlsZEV4cGVuc2VUaWNrZXRzRGVidWdTdGFjayhgcmVzZXRMaXN0OiR7c291cmNlfWApLFxuICAgICAgfSk7XG4gICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50LmFib3J0KCk7XG4gICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9IFwiXCI7XG4gICAgfVxuICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8oXCJyZXNldExpc3Q6Y2xlYXItc3RhdGVcIiwge1xuICAgICAgc291cmNlLFxuICAgIH0pO1xuICAgIHNldEl0ZW1zKFtdKTtcbiAgICBzZXRUb3RhbCgwKTtcbiAgICBzZXRDdXJyZW50UGFnZSgxKTtcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gIH0sIFtdKTtcblxuICBjb25zdCBjbGVhckxpc3RDYWNoZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICAvLyBUaWNrZXQgbGlzdCBhdXRvLWxvYWQgbXVzdCBhbHdheXMgaGl0IHRoZSBsaXZlIGVuZHBvaW50LlxuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImNsZWFudXA6YWJvcnQtYWN0aXZlLXJlcXVlc3RcIiwge1xuICAgICAgICAgIGFjdGl2ZVJlcXVlc3RLZXk6IGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCxcbiAgICAgICAgICBhY3RpdmVSZXF1ZXN0U2VxOiBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQsXG4gICAgICAgICAgc3RhY2s6IGJ1aWxkRXhwZW5zZVRpY2tldHNEZWJ1Z1N0YWNrKFwiY2xlYW51cDphYm9ydC1hY3RpdmUtcmVxdWVzdFwiKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQuYWJvcnQoKTtcbiAgICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgIGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCA9IFwiXCI7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgaXRlbXMsXG4gICAgdG90YWwsXG4gICAgY3VycmVudFBhZ2UsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBsb2FkTGlzdCxcbiAgICByZXN0b3JlTGlzdFNuYXBzaG90LFxuICAgIHJlc2V0TGlzdCxcbiAgICBjbGVhckxpc3RDYWNoZSxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90LnRzXCI7XG5pbXBvcnQgdHlwZSB7XG4gIEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXG4gIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCxcbiAgRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25Nb2RlLFxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5pbXBvcnQgeyBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnksIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlU2NvcGVUb2tlbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2NvcGUudHNcIjtcblxuY29uc3QgRVhQRU5TRV9USUNLRVRfTElOS19SRVRVUk5fU1RBVEVfS0VZX1BSRUZJWCA9IFwiZXhwZW5zZV90aWNrZXRfbGlua19yZXR1cm5fc3RhdGVfdjFcIjtcbmNvbnN0IEVYUEVOU0VfVElDS0VUX0xJTktfUkVUVVJOX1NUQVRFX1RUTF9NUyA9IDEyICogNjAgKiA2MCAqIDEwMDA7XG5jb25zdCBBTExPV0VEX1RJQ0tFVF9HQVNUT19UWVBFUyA9IG5ldyBTZXQ8bnVtYmVyPihbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTRdKTtcblxuZXhwb3J0IHR5cGUgRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSA9IHtcbiAgc2hlZXRJZDogc3RyaW5nO1xuICBwYWdlOiBudW1iZXI7XG4gIHNjcm9sbFk6IG51bWJlcjtcbiAgZm9jdXNGaWxlSWQ6IHN0cmluZztcbiAgZmlsdGVyczogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdDtcbiAgc2VsZWN0aW9uTW9kZTogRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25Nb2RlO1xuICBzZWxlY3RlZFRpY2tldHM6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtdO1xuICBleGNsdWRlZElkczogc3RyaW5nW107XG4gIGZpbHRlcmVkU2VsZWN0aW9uRmlsdGVyczogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB8IG51bGw7XG4gIGZpbHRlcmVkU2VsZWN0aW9uVG90YWw6IG51bWJlcjtcbn07XG5cbmNvbnN0IGdldFNjb3BlZEtleSA9ICgpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gYCR7RVhQRU5TRV9USUNLRVRfTElOS19SRVRVUk5fU1RBVEVfS0VZX1BSRUZJWH1fJHtnZXRFeHBlbnNlU2NvcGVUb2tlbigpfWA7XG59O1xuXG5jb25zdCBub3JtYWxpemVGaWxlSWQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZVByb2Nlc3NlZEJ5QWkgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuIHwgbnVsbCA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gZmFsc2UpIHJldHVybiB2YWx1ZTtcbiAgaWYgKHZhbHVlID09PSAxIHx8IHZhbHVlID09PSBcIjFcIiB8fCB2YWx1ZSA9PT0gXCJ0cnVlXCIpIHJldHVybiB0cnVlO1xuICBpZiAodmFsdWUgPT09IDAgfHwgdmFsdWUgPT09IFwiMFwiIHx8IHZhbHVlID09PSBcImZhbHNlXCIpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCBub3JtYWxpemVOdWxsYWJsZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xufTtcblxuY29uc3Qgbm9ybWFsaXplVGlja2V0R2FzdG9UeXBlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZVRpY2tldExpbmtDYXJkW1wiZ2FzdG9UeXBlXCJdID0+IHtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgfHwgIUFMTE9XRURfVElDS0VUX0dBU1RPX1RZUEVTLmhhcyhwYXJzZWQpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIHBhcnNlZCBhcyBFeHBlbnNlVGlja2V0TGlua0NhcmRbXCJnYXN0b1R5cGVcIl07XG59O1xuXG5jb25zdCBub3JtYWxpemVTZWxlY3Rpb25Nb2RlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25Nb2RlID0+IHtcbiAgcmV0dXJuIHZhbHVlID09PSBcImZpbHRlcmVkXCIgPyBcImZpbHRlcmVkXCIgOiBcInNlbGVjdGVkXCI7XG59O1xuXG5jb25zdCBub3JtYWxpemVTZWxlY3RlZFRpY2tldHMgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlVGlja2V0TGlua0NhcmRbXSA9PiB7XG4gIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiBbXTtcblxuICBjb25zdCBpdGVtcyA9IG5ldyBNYXA8c3RyaW5nLCBFeHBlbnNlVGlja2V0TGlua0NhcmQ+KCk7XG4gIGZvciAoY29uc3QgZW50cnkgb2YgdmFsdWUpIHtcbiAgICBjb25zdCBpdGVtID0gKGVudHJ5IHx8IHt9KSBhcyBQYXJ0aWFsPEV4cGVuc2VUaWNrZXRMaW5rQ2FyZD47XG4gICAgY29uc3QgZmlsZUlkID0gbm9ybWFsaXplRmlsZUlkKGl0ZW0uZmlsZUlkKTtcbiAgICBpZiAoIWZpbGVJZCkgY29udGludWU7XG5cbiAgICBpdGVtcy5zZXQoZmlsZUlkLCB7XG4gICAgICBraW5kOiBcImxpbmtcIixcbiAgICAgIGZpbGVJZCxcbiAgICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoaXRlbS5kZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXG4gICAgICBwcm9jZXNzZWRCeUFJOiBub3JtYWxpemVQcm9jZXNzZWRCeUFpKGl0ZW0ucHJvY2Vzc2VkQnlBSSksXG4gICAgICBjdXJyZW5jeUNvZGU6IFN0cmluZyhpdGVtLmN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCksXG4gICAgICB0b3RhbEFtb3VudDogbm9ybWFsaXplTnVsbGFibGVOdW1iZXIoaXRlbS50b3RhbEFtb3VudCksXG4gICAgICB0cmFuc0RhdGU6IFN0cmluZyhpdGVtLnRyYW5zRGF0ZSB8fCBcIlwiKS50cmltKCksXG4gICAgICBmaWxlTmFtZTogU3RyaW5nKGl0ZW0uZmlsZU5hbWUgfHwgXCJcIikudHJpbSgpLFxuICAgICAgZ2FzdG9UeXBlOiBub3JtYWxpemVUaWNrZXRHYXN0b1R5cGUoaXRlbS5nYXN0b1R5cGUpLFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIEFycmF5LmZyb20oaXRlbXMudmFsdWVzKCkpO1xufTtcblxuY29uc3Qgbm9ybWFsaXplRXhjbHVkZWRJZHMgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmdbXSA9PiB7XG4gIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiBbXTtcblxuICBjb25zdCBpZHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgZm9yIChjb25zdCBlbnRyeSBvZiB2YWx1ZSkge1xuICAgIGNvbnN0IGZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZChlbnRyeSk7XG4gICAgaWYgKCFmaWxlSWQpIGNvbnRpbnVlO1xuICAgIGlkcy5hZGQoZmlsZUlkKTtcbiAgfVxuXG4gIHJldHVybiBBcnJheS5mcm9tKGlkcyk7XG59O1xuXG5jb25zdCBub3JtYWxpemVOb25OZWdhdGl2ZUludGVnZXIgPSAodmFsdWU6IHVua25vd24sIGZhbGxiYWNrID0gMCk6IG51bWJlciA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSAmJiBwYXJzZWQgPj0gMCA/IE1hdGguZmxvb3IocGFyc2VkKSA6IGZhbGxiYWNrO1xufTtcblxuLy8gTm9ybWFsaXplcyB0aGUgbGluay1tb2RlIHRpY2tldCByZXR1cm4gc3RhdGUgc28gYmFjayBuYXZpZ2F0aW9uIGNhbiByZXN0b3JlIGZpbHRlcnMgYW5kIHNlbGVjdGlvbiBzYWZlbHkuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgfCBudWxsID0+IHtcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHBheWxvYWQgPSB2YWx1ZSBhcyBQYXJ0aWFsPEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGU+O1xuICBjb25zdCBzaGVldElkID0gU3RyaW5nKHBheWxvYWQuc2hlZXRJZCB8fCBcIlwiKS50cmltKCk7XG4gIGlmICghc2hlZXRJZCkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIHtcbiAgICBzaGVldElkLFxuICAgIHBhZ2U6IE1hdGgubWF4KDEsIG5vcm1hbGl6ZU5vbk5lZ2F0aXZlSW50ZWdlcihwYXlsb2FkLnBhZ2UsIDEpKSxcbiAgICBzY3JvbGxZOiBub3JtYWxpemVOb25OZWdhdGl2ZUludGVnZXIocGF5bG9hZC5zY3JvbGxZKSxcbiAgICBmb2N1c0ZpbGVJZDogbm9ybWFsaXplRmlsZUlkKHBheWxvYWQuZm9jdXNGaWxlSWQpLFxuICAgIGZpbHRlcnM6IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdChwYXlsb2FkLmZpbHRlcnMpLFxuICAgIHNlbGVjdGlvbk1vZGU6IG5vcm1hbGl6ZVNlbGVjdGlvbk1vZGUocGF5bG9hZC5zZWxlY3Rpb25Nb2RlKSxcbiAgICBzZWxlY3RlZFRpY2tldHM6IG5vcm1hbGl6ZVNlbGVjdGVkVGlja2V0cyhwYXlsb2FkLnNlbGVjdGVkVGlja2V0cyksXG4gICAgZXhjbHVkZWRJZHM6IG5vcm1hbGl6ZUV4Y2x1ZGVkSWRzKHBheWxvYWQuZXhjbHVkZWRJZHMpLFxuICAgIGZpbHRlcmVkU2VsZWN0aW9uRmlsdGVyczogcGF5bG9hZC5maWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnNcbiAgICAgID8gbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90KHBheWxvYWQuZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzKVxuICAgICAgOiBudWxsLFxuICAgIGZpbHRlcmVkU2VsZWN0aW9uVG90YWw6IG5vcm1hbGl6ZU5vbk5lZ2F0aXZlSW50ZWdlcihwYXlsb2FkLmZpbHRlcmVkU2VsZWN0aW9uVG90YWwpLFxuICB9O1xufTtcblxuLy8gUmVhZHMgYSBzdG9yZWQgbGluay1tb2RlIHJldHVybiBzdGF0ZSB3aGVuIGl0IHN0aWxsIG1hdGNoZXMgdGhlIGFjdGl2ZSBleHBlbnNlIHNoZWV0LlxuZXhwb3J0IGNvbnN0IHJlYWRFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlID0gKHNoZWV0SWQ/OiB1bmtub3duKTogRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSB8IG51bGwgPT4ge1xuICBjb25zdCBzdG9yZWQgPSBub3JtYWxpemVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKFxuICAgIGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeTxFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlPihnZXRTY29wZWRLZXkoKSlcbiAgKTtcbiAgaWYgKCFzdG9yZWQpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHNhZmVTaGVldElkID0gU3RyaW5nKHNoZWV0SWQgfHwgXCJcIikudHJpbSgpO1xuICBpZiAoIXNhZmVTaGVldElkKSByZXR1cm4gc3RvcmVkO1xuICByZXR1cm4gc3RvcmVkLnNoZWV0SWQudG9VcHBlckNhc2UoKSA9PT0gc2FmZVNoZWV0SWQudG9VcHBlckNhc2UoKSA/IHN0b3JlZCA6IG51bGw7XG59O1xuXG4vLyBQZXJzaXN0cyB0aGUgbWluaW11bSBsaW5rLW1vZGUgc3RhdGUgcmVxdWlyZWQgdG8gcmV0dXJuIGZyb20gdGlja2V0IGRldGFpbCB3aXRob3V0IGxvc2luZyBzZWxlY3Rpb24uXG5leHBvcnQgY29uc3Qgc2F2ZUV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgPSAoXG4gIHZhbHVlOiBFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlIHwgbnVsbCB8IHVuZGVmaW5lZFxuKTogRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSB8IG51bGwgPT4ge1xuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSh2YWx1ZSk7XG4gIGlmICghbm9ybWFsaXplZCkge1xuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5KGdldFNjb3BlZEtleSgpLCBub3JtYWxpemVkLCBFWFBFTlNFX1RJQ0tFVF9MSU5LX1JFVFVSTl9TVEFURV9UVExfTVMpO1xuICByZXR1cm4gbm9ybWFsaXplZDtcbn07XG5cbi8vIENsZWFycyBhbnkgc3RvcmVkIGxpbmstbW9kZSByZXR1cm4gc3RhdGUgZm9yIHRoZSBjdXJyZW50IGV4cGVuc2Ugc2NvcGUuXG5leHBvcnQgY29uc3QgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlID0gKCk6IHZvaWQgPT4ge1xuICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGdldFNjb3BlZEtleSgpKTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7XG4gIEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXG4gIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCxcbiAgRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25Nb2RlLFxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5cbmV4cG9ydCB0eXBlIEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uU3RhdGUgPSB7XG4gIHNlbGVjdGlvbk1vZGU6IEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZTtcbiAgc2VsZWN0ZWRUaWNrZXRzOiBFeHBlbnNlVGlja2V0TGlua0NhcmRbXTtcbiAgZXhjbHVkZWRJZHM6IHN0cmluZ1tdO1xuICBmaWx0ZXJlZFNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90IHwgbnVsbDtcbiAgZmlsdGVyZWRUb3RhbENvdW50OiBudW1iZXI7XG59O1xuXG5jb25zdCBub3JtYWxpemVGaWxlSWQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcblxuY29uc3Qgbm9ybWFsaXplU2VsZWN0aW9uTW9kZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZSA9PiB7XG4gIHJldHVybiB2YWx1ZSA9PT0gXCJmaWx0ZXJlZFwiID8gXCJmaWx0ZXJlZFwiIDogXCJzZWxlY3RlZFwiO1xufTtcblxuY29uc3Qgbm9ybWFsaXplRXhjbHVkZWRJZHMgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmdbXSA9PiB7XG4gIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiBbXTtcblxuICBjb25zdCBpZHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgZm9yIChjb25zdCBlbnRyeSBvZiB2YWx1ZSkge1xuICAgIGNvbnN0IGZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZChlbnRyeSk7XG4gICAgaWYgKCFmaWxlSWQpIGNvbnRpbnVlO1xuICAgIGlkcy5hZGQoZmlsZUlkKTtcbiAgfVxuXG4gIHJldHVybiBBcnJheS5mcm9tKGlkcyk7XG59O1xuXG5jb25zdCB0b1NlbGVjdGVkTWFwID0gKGl0ZW1zOiBFeHBlbnNlVGlja2V0TGlua0NhcmRbXSk6IFJlY29yZDxzdHJpbmcsIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZD4gPT4ge1xuICBjb25zdCBuZXh0OiBSZWNvcmQ8c3RyaW5nLCBFeHBlbnNlVGlja2V0TGlua0NhcmQ+ID0ge307XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGNvbnN0IGZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZChpdGVtLmZpbGVJZCk7XG4gICAgaWYgKCFmaWxlSWQpIGNvbnRpbnVlO1xuICAgIG5leHRbZmlsZUlkXSA9IGl0ZW07XG4gIH1cbiAgcmV0dXJuIG5leHQ7XG59O1xuXG4vLyBLZWVwcyBsaW5rLW1vZGUgdGlja2V0IHNlbGVjdGlvbiBzdGFibGUgYWNyb3NzIHBhZ2luZywgZmlsdGVyZWQgc2VsZWN0LWFsbCwgYW5kIGRldGFpbCByZXR1cm5zLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uID0gKCkgPT4ge1xuICBjb25zdCBbc2VsZWN0aW9uTW9kZSwgc2V0U2VsZWN0aW9uTW9kZV0gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGU+KFwic2VsZWN0ZWRcIik7XG4gIGNvbnN0IFtzZWxlY3RlZFRpY2tldHNCeUlkLCBzZXRTZWxlY3RlZFRpY2tldHNCeUlkXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZD4+KHt9KTtcbiAgY29uc3QgW2V4Y2x1ZGVkSWRzLCBzZXRFeGNsdWRlZElkc10gPSB1c2VTdGF0ZTxzdHJpbmdbXT4oW10pO1xuICBjb25zdCBbZmlsdGVyZWRTbmFwc2hvdCwgc2V0RmlsdGVyZWRTbmFwc2hvdF0gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtmaWx0ZXJlZFRvdGFsQ291bnQsIHNldEZpbHRlcmVkVG90YWxDb3VudF0gPSB1c2VTdGF0ZSgwKTtcblxuICBjb25zdCBzZWxlY3RlZFRpY2tldHMgPSB1c2VNZW1vKCgpID0+IE9iamVjdC52YWx1ZXMoc2VsZWN0ZWRUaWNrZXRzQnlJZCksIFtzZWxlY3RlZFRpY2tldHNCeUlkXSk7XG4gIGNvbnN0IGV4Y2x1ZGVkSWRTZXQgPSB1c2VNZW1vKCgpID0+IG5ldyBTZXQoZXhjbHVkZWRJZHMpLCBbZXhjbHVkZWRJZHNdKTtcbiAgY29uc3QgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSA9IHNlbGVjdGlvbk1vZGUgPT09IFwiZmlsdGVyZWRcIiAmJiAhIWZpbHRlcmVkU25hcHNob3Q7XG5cbiAgY29uc3QgY2xlYXJTZWxlY3Rpb24gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0U2VsZWN0aW9uTW9kZShcInNlbGVjdGVkXCIpO1xuICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQoe30pO1xuICAgIHNldEV4Y2x1ZGVkSWRzKFtdKTtcbiAgICBzZXRGaWx0ZXJlZFNuYXBzaG90KG51bGwpO1xuICAgIHNldEZpbHRlcmVkVG90YWxDb3VudCgwKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHJlc3RvcmVTZWxlY3Rpb24gPSB1c2VDYWxsYmFjaygoc3RhdGU6IEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uU3RhdGUgfCBudWxsIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgaWYgKCFzdGF0ZSkge1xuICAgICAgY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBub3JtYWxpemVkTW9kZSA9IG5vcm1hbGl6ZVNlbGVjdGlvbk1vZGUoc3RhdGUuc2VsZWN0aW9uTW9kZSk7XG4gICAgY29uc3Qgbm9ybWFsaXplZFNlbGVjdGVkVGlja2V0cyA9IEFycmF5LmlzQXJyYXkoc3RhdGUuc2VsZWN0ZWRUaWNrZXRzKSA/IHN0YXRlLnNlbGVjdGVkVGlja2V0cyA6IFtdO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRTbmFwc2hvdCA9IHN0YXRlLmZpbHRlcmVkU25hcHNob3QgfHwgbnVsbDtcbiAgICBjb25zdCBub3JtYWxpemVkRXhjbHVkZWRJZHMgPSBub3JtYWxpemVFeGNsdWRlZElkcyhzdGF0ZS5leGNsdWRlZElkcyk7XG4gICAgY29uc3Qgbm9ybWFsaXplZEZpbHRlcmVkVG90YWwgPSBOdW1iZXIuaXNGaW5pdGUoTnVtYmVyKHN0YXRlLmZpbHRlcmVkVG90YWxDb3VudCkpXG4gICAgICA/IE1hdGgubWF4KDAsIE1hdGguZmxvb3IoTnVtYmVyKHN0YXRlLmZpbHRlcmVkVG90YWxDb3VudCkpKVxuICAgICAgOiAwO1xuXG4gICAgc2V0U2VsZWN0aW9uTW9kZShub3JtYWxpemVkTW9kZSA9PT0gXCJmaWx0ZXJlZFwiICYmIG5vcm1hbGl6ZWRTbmFwc2hvdCA/IFwiZmlsdGVyZWRcIiA6IFwic2VsZWN0ZWRcIik7XG4gICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZCh0b1NlbGVjdGVkTWFwKG5vcm1hbGl6ZWRTZWxlY3RlZFRpY2tldHMpKTtcbiAgICBzZXRFeGNsdWRlZElkcyhub3JtYWxpemVkTW9kZSA9PT0gXCJmaWx0ZXJlZFwiID8gbm9ybWFsaXplZEV4Y2x1ZGVkSWRzIDogW10pO1xuICAgIHNldEZpbHRlcmVkU25hcHNob3Qobm9ybWFsaXplZE1vZGUgPT09IFwiZmlsdGVyZWRcIiA/IG5vcm1hbGl6ZWRTbmFwc2hvdCA6IG51bGwpO1xuICAgIHNldEZpbHRlcmVkVG90YWxDb3VudChub3JtYWxpemVkTW9kZSA9PT0gXCJmaWx0ZXJlZFwiID8gbm9ybWFsaXplZEZpbHRlcmVkVG90YWwgOiAwKTtcbiAgfSwgW2NsZWFyU2VsZWN0aW9uXSk7XG5cbiAgY29uc3Qgc2VsZWN0QWxsQnlGaWx0ZXJzID0gdXNlQ2FsbGJhY2soKHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LCB0b3RhbENvdW50OiBudW1iZXIpID0+IHtcbiAgICBzZXRTZWxlY3Rpb25Nb2RlKFwiZmlsdGVyZWRcIik7XG4gICAgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZCh7fSk7XG4gICAgc2V0RXhjbHVkZWRJZHMoW10pO1xuICAgIHNldEZpbHRlcmVkU25hcHNob3Qoc25hcHNob3QpO1xuICAgIHNldEZpbHRlcmVkVG90YWxDb3VudChOdW1iZXIuaXNGaW5pdGUodG90YWxDb3VudCkgPyBNYXRoLm1heCgwLCBNYXRoLmZsb29yKHRvdGFsQ291bnQpKSA6IDApO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaXNTZWxlY3RlZCA9IHVzZUNhbGxiYWNrKFxuICAgIChmaWxlSWQ6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3Qgc2FmZUZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZChmaWxlSWQpO1xuICAgICAgaWYgKCFzYWZlRmlsZUlkKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIGlmIChpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlKSB7XG4gICAgICAgIHJldHVybiAhZXhjbHVkZWRJZFNldC5oYXMoc2FmZUZpbGVJZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhIXNlbGVjdGVkVGlja2V0c0J5SWRbc2FmZUZpbGVJZF07XG4gICAgfSxcbiAgICBbZXhjbHVkZWRJZFNldCwgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSwgc2VsZWN0ZWRUaWNrZXRzQnlJZF1cbiAgKTtcblxuICBjb25zdCB0b2dnbGVUaWNrZXQgPSB1c2VDYWxsYmFjayhcbiAgICAodGlja2V0OiBFeHBlbnNlVGlja2V0TGlua0NhcmQpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZCh0aWNrZXQuZmlsZUlkKTtcbiAgICAgIGlmICghZmlsZUlkKSByZXR1cm47XG5cbiAgICAgIGlmIChpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlKSB7XG4gICAgICAgIHNldEV4Y2x1ZGVkSWRzKChwcmV2aW91cykgPT4ge1xuICAgICAgICAgIGNvbnN0IG5leHQgPSBuZXcgU2V0KHByZXZpb3VzKTtcbiAgICAgICAgICBpZiAobmV4dC5oYXMoZmlsZUlkKSkge1xuICAgICAgICAgICAgbmV4dC5kZWxldGUoZmlsZUlkKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV4dC5hZGQoZmlsZUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV4dCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQoKHByZXZpb3VzKSA9PiB7XG4gICAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXZpb3VzIH07XG4gICAgICAgIGlmIChuZXh0W2ZpbGVJZF0pIHtcbiAgICAgICAgICBkZWxldGUgbmV4dFtmaWxlSWRdO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICAgIG5leHRbZmlsZUlkXSA9IHRpY2tldDtcbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlXVxuICApO1xuXG4gIGNvbnN0IGh5ZHJhdGVWaXNpYmxlVGlja2V0cyA9IHVzZUNhbGxiYWNrKChpdGVtczogRXhwZW5zZVRpY2tldExpbmtDYXJkW10pID0+IHtcbiAgICBpZiAoc2VsZWN0aW9uTW9kZSAhPT0gXCJzZWxlY3RlZFwiIHx8IGl0ZW1zLmxlbmd0aCA8IDEpIHJldHVybjtcblxuICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQoKHByZXZpb3VzKSA9PiB7XG4gICAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldmlvdXMgfTtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICBjb25zdCBmaWxlSWQgPSBub3JtYWxpemVGaWxlSWQoaXRlbS5maWxlSWQpO1xuICAgICAgICBpZiAoIWZpbGVJZCB8fCAhbmV4dFtmaWxlSWRdKSBjb250aW51ZTtcbiAgICAgICAgbmV4dFtmaWxlSWRdID0gaXRlbTtcbiAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2hhbmdlZCA/IG5leHQgOiBwcmV2aW91cztcbiAgICB9KTtcbiAgfSwgW3NlbGVjdGlvbk1vZGVdKTtcblxuICBjb25zdCByZXNvbHZlU2VsZWN0ZWRDb3VudCA9IHVzZUNhbGxiYWNrKFxuICAgIChmYWxsYmFja1RvdGFsQ291bnQgPSAwKTogbnVtYmVyID0+IHtcbiAgICAgIGlmICghaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSkge1xuICAgICAgICByZXR1cm4gc2VsZWN0ZWRUaWNrZXRzLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmFzZUNvdW50ID0gZmlsdGVyZWRUb3RhbENvdW50ID4gMCA/IGZpbHRlcmVkVG90YWxDb3VudCA6IE1hdGgubWF4KDAsIE1hdGguZmxvb3IoZmFsbGJhY2tUb3RhbENvdW50KSk7XG4gICAgICByZXR1cm4gTWF0aC5tYXgoMCwgYmFzZUNvdW50IC0gZXhjbHVkZWRJZHMubGVuZ3RoKTtcbiAgICB9LFxuICAgIFtleGNsdWRlZElkcy5sZW5ndGgsIGZpbHRlcmVkVG90YWxDb3VudCwgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSwgc2VsZWN0ZWRUaWNrZXRzLmxlbmd0aF1cbiAgKTtcblxuICByZXR1cm4ge1xuICAgIHNlbGVjdGlvbk1vZGUsXG4gICAgc2VsZWN0ZWRUaWNrZXRzLFxuICAgIGV4Y2x1ZGVkSWRzLFxuICAgIGZpbHRlcmVkU25hcHNob3QsXG4gICAgZmlsdGVyZWRUb3RhbENvdW50LFxuICAgIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUsXG4gICAgaXNTZWxlY3RlZCxcbiAgICB0b2dnbGVUaWNrZXQsXG4gICAgY2xlYXJTZWxlY3Rpb24sXG4gICAgcmVzdG9yZVNlbGVjdGlvbixcbiAgICBzZWxlY3RBbGxCeUZpbHRlcnMsXG4gICAgaHlkcmF0ZVZpc2libGVUaWNrZXRzLFxuICAgIHJlc29sdmVTZWxlY3RlZENvdW50LFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWR1Y2VyIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRSZXF1ZXN0ID0ge1xuICBwYWdlOiBudW1iZXI7XG4gIHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90O1xuICBjbGVhckNhY2hlOiBib29sZWFuO1xuICByZXNldEJlZm9yZUxvYWQ6IGJvb2xlYW47XG4gIHdhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHk6IGJvb2xlYW47XG59O1xuXG50eXBlIEF1dG9tYXRpY0xvYWRBY3Rpb24gPVxuICB8IHtcbiAgICAgIHR5cGU6IFwic2NoZWR1bGVcIjtcbiAgICAgIHJlcXVlc3Q6IEV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkUmVxdWVzdDtcbiAgICB9XG4gIHwge1xuICAgICAgdHlwZTogXCJjbGVhclwiO1xuICAgIH1cbiAgfCB7XG4gICAgICB0eXBlOiBcImRpc2FibGVfbGlua193YWl0XCI7XG4gICAgfTtcblxuY29uc3QgYXV0b21hdGljTG9hZFJlZHVjZXIgPSAoXG4gIHN0YXRlOiBFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZFJlcXVlc3QgfCBudWxsLFxuICBhY3Rpb246IEF1dG9tYXRpY0xvYWRBY3Rpb25cbik6IEV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkUmVxdWVzdCB8IG51bGwgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBcInNjaGVkdWxlXCI6XG4gICAgICByZXR1cm4gYWN0aW9uLnJlcXVlc3Q7XG4gICAgY2FzZSBcImNsZWFyXCI6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBjYXNlIFwiZGlzYWJsZV9saW5rX3dhaXRcIjpcbiAgICAgIHJldHVybiBzdGF0ZSA/IHsgLi4uc3RhdGUsIHdhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHk6IGZhbHNlIH0gOiBudWxsO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbnR5cGUgVXNlRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRBcmdzID0ge1xuICBpc0xpbmtNb2RlOiBib29sZWFuO1xuICBjYW5Qcm9jZXNzTGlua01vZGU6IGJvb2xlYW47XG4gIGxpbmtTaGVldENoZWNrQnVzeTogYm9vbGVhbjtcbiAgbGlua1NoZWV0TG9ja2VkOiBib29sZWFuO1xuICBjbGVhckxpc3RDYWNoZTogKCkgPT4gdm9pZDtcbiAgcmVzZXRMaXN0OiAoc291cmNlPzogc3RyaW5nKSA9PiB2b2lkO1xuICBsb2FkTGlzdDogKHBhZ2U6IG51bWJlciwgc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpID0+IFByb21pc2U8dm9pZD47XG59O1xuXG5jb25zdCBFWFBFTlNFX1RJQ0tFVFNfQVVUT19MT0FEX0xPR19QUkVGSVggPSBcIltleHBlbnNlLXRpY2tldHM6YXV0by1sb2FkXVwiO1xuXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkSW5mbyA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLmluZm8gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGNvbnNvbGUuaW5mbyhFWFBFTlNFX1RJQ0tFVFNfQVVUT19MT0FEX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xuICB9XG59O1xuXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkV2FybiA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLndhcm4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGNvbnNvbGUud2FybihFWFBFTlNFX1RJQ0tFVFNfQVVUT19MT0FEX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xuICB9XG59O1xuXG4vLyBRdWV1ZXMgb25lIHRpY2tldCBsaXN0IHJlbG9hZCBhbmQgcmVsZWFzZXMgaXQgb25seSB3aGVuIGxpbmstbW9kZSBwcmVjb25kaXRpb25zIGFyZSByZWFkeS5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZCA9ICh7XG4gIGlzTGlua01vZGUsXG4gIGNhblByb2Nlc3NMaW5rTW9kZSxcbiAgbGlua1NoZWV0Q2hlY2tCdXN5LFxuICBsaW5rU2hlZXRMb2NrZWQsXG4gIGNsZWFyTGlzdENhY2hlLFxuICByZXNldExpc3QsXG4gIGxvYWRMaXN0LFxufTogVXNlRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRBcmdzKSA9PiB7XG4gIGNvbnN0IFtwZW5kaW5nQXV0b21hdGljTG9hZCwgZGlzcGF0Y2hdID0gdXNlUmVkdWNlcihhdXRvbWF0aWNMb2FkUmVkdWNlciwgbnVsbCk7XG5cbiAgY29uc3QgcnVuQXV0b21hdGljTGlzdExvYWQgPSB1c2VDYWxsYmFjayhcbiAgICAoXG4gICAgICBwYWdlOiBudW1iZXIsXG4gICAgICBzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgY2xlYXJDYWNoZT86IGJvb2xlYW47XG4gICAgICAgIHJlc2V0QmVmb3JlTG9hZD86IGJvb2xlYW47XG4gICAgICAgIHdhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHk/OiBib29sZWFuO1xuICAgICAgfSA9IHt9XG4gICAgKSA9PiB7XG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkSW5mbyhcInJ1bkF1dG9tYXRpY0xpc3RMb2FkOnNjaGVkdWxlXCIsIHtcbiAgICAgICAgcGFnZSxcbiAgICAgICAgc25hcHNob3QsXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICB9KTtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogXCJzY2hlZHVsZVwiLFxuICAgICAgICByZXF1ZXN0OiB7XG4gICAgICAgICAgcGFnZSxcbiAgICAgICAgICBzbmFwc2hvdCxcbiAgICAgICAgICBjbGVhckNhY2hlOiBvcHRpb25zLmNsZWFyQ2FjaGUgPT09IHRydWUsXG4gICAgICAgICAgcmVzZXRCZWZvcmVMb2FkOiBvcHRpb25zLnJlc2V0QmVmb3JlTG9hZCA9PT0gdHJ1ZSxcbiAgICAgICAgICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiBvcHRpb25zLndhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHkgPT09IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtdXG4gICk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXBlbmRpbmdBdXRvbWF0aWNMb2FkKSByZXR1cm47XG5cbiAgICBpZiAocGVuZGluZ0F1dG9tYXRpY0xvYWQud2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeSkge1xuICAgICAgaWYgKCFpc0xpbmtNb2RlKSB7XG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzQXV0b0xvYWRXYXJuKFwicGVuZGluZ0F1dG9tYXRpY0xvYWQ6ZGlzYWJsZS1saW5rLXdhaXRcIiwge1xuICAgICAgICAgIHBhZ2U6IHBlbmRpbmdBdXRvbWF0aWNMb2FkLnBhZ2UsXG4gICAgICAgIH0pO1xuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IFwiZGlzYWJsZV9saW5rX3dhaXRcIiB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWNhblByb2Nlc3NMaW5rTW9kZSB8fCBsaW5rU2hlZXRDaGVja0J1c3kpIHtcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZEluZm8oXCJwZW5kaW5nQXV0b21hdGljTG9hZDp3YWl0aW5nLWxpbmstbW9kZS1yZWFkeVwiLCB7XG4gICAgICAgICAgcGFnZTogcGVuZGluZ0F1dG9tYXRpY0xvYWQucGFnZSxcbiAgICAgICAgICBjYW5Qcm9jZXNzTGlua01vZGUsXG4gICAgICAgICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAobGlua1NoZWV0TG9ja2VkKSB7XG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzQXV0b0xvYWRXYXJuKFwicGVuZGluZ0F1dG9tYXRpY0xvYWQ6Y2xlYXItbGluay1sb2NrZWRcIiwge1xuICAgICAgICAgIHBhZ2U6IHBlbmRpbmdBdXRvbWF0aWNMb2FkLnBhZ2UsXG4gICAgICAgIH0pO1xuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IFwiY2xlYXJcIiB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHsgcGFnZSwgc25hcHNob3QsIGNsZWFyQ2FjaGUsIHJlc2V0QmVmb3JlTG9hZCB9ID0gcGVuZGluZ0F1dG9tYXRpY0xvYWQ7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiBcImNsZWFyXCIgfSk7XG4gICAgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZEluZm8oXCJwZW5kaW5nQXV0b21hdGljTG9hZDpleGVjdXRlXCIsIHtcbiAgICAgIHBhZ2UsXG4gICAgICBzbmFwc2hvdCxcbiAgICAgIGNsZWFyQ2FjaGUsXG4gICAgICByZXNldEJlZm9yZUxvYWQsXG4gICAgfSk7XG5cbiAgICBpZiAoY2xlYXJDYWNoZSkge1xuICAgICAgY2xlYXJMaXN0Q2FjaGUoKTtcbiAgICB9XG5cbiAgICBpZiAocmVzZXRCZWZvcmVMb2FkKSB7XG4gICAgICByZXNldExpc3QoXCJhdXRvbWF0aWMtbG9hZDpyZXNldC1iZWZvcmUtbG9hZFwiKTtcbiAgICB9XG5cbiAgICB2b2lkIGxvYWRMaXN0KHBhZ2UsIHNuYXBzaG90KTtcbiAgfSwgW1xuICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcbiAgICBjbGVhckxpc3RDYWNoZSxcbiAgICBpc0xpbmtNb2RlLFxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcbiAgICBsaW5rU2hlZXRMb2NrZWQsXG4gICAgbG9hZExpc3QsXG4gICAgcGVuZGluZ0F1dG9tYXRpY0xvYWQsXG4gICAgcmVzZXRMaXN0LFxuICBdKTtcblxuICByZXR1cm4ge1xuICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZHVjZXIgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldERldGFpbCwgbWFwRXhwZW5zZVNoZWV0SGVhZGVyIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IGlzRXhwZW5zZUFib3J0TGlrZUVycm9yIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VSZXF1ZXN0UmV0cnkudHNcIjtcbmltcG9ydCB7IGhhc0Fzc2lnbmVkVm91Y2hlciwgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IHJlc29sdmVFeHBlbnNlU2hlZXREZXRhaWxQb2xpY3kgfSBmcm9tIFwiLi4vZGV0YWlsL2V4cGVuc2VTaGVldERldGFpbFBvbGljeS50c1wiO1xuaW1wb3J0IHsgaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTWFuYWdlZFVzZXJTY29wZS50c1wiO1xuXG5jb25zdCBFWFBFTlNFX1NUQVRVU19QQUlEID0gNDtcblxudHlwZSBMaW5rU2hlZXRHYXRlU3RhdGUgPSB7XG4gIGxpbmtTaGVldExvY2tlZDogYm9vbGVhbjtcbiAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2U6IHN0cmluZztcbiAgbGlua1NoZWV0Q2hlY2tCdXN5OiBib29sZWFuO1xufTtcblxudHlwZSBMaW5rU2hlZXRHYXRlQWN0aW9uID1cbiAgfCB7XG4gICAgICB0eXBlOiBcInJlcGxhY2VcIjtcbiAgICAgIG5leHRTdGF0ZTogTGlua1NoZWV0R2F0ZVN0YXRlO1xuICAgIH1cbiAgfCB7XG4gICAgICB0eXBlOiBcInBhdGNoXCI7XG4gICAgICBwYXRjaDogUGFydGlhbDxMaW5rU2hlZXRHYXRlU3RhdGU+O1xuICAgIH07XG5cbnR5cGUgVXNlRXhwZW5zZVRpY2tldExpbmtTaGVldEdhdGVBcmdzID0ge1xuICBpc0xpbmtNb2RlOiBib29sZWFuO1xuICBsaW5rU2hlZXRJZDogc3RyaW5nO1xuICBjYW5Qcm9jZXNzTGlua01vZGU6IGJvb2xlYW47XG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGJvb2xlYW47XG4gIGNhbk1hbmFnZU90aGVyVXNlcnM6IGJvb2xlYW47XG4gIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nO1xuICBjdXJyZW50Q3JtVXNlcklkOiBzdHJpbmc7XG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZDogc3RyaW5nO1xuICByZXNvbHZlQmxvY2tlZE1lc3NhZ2U6IChpc1BhaWQ6IGJvb2xlYW4pID0+IHN0cmluZztcbn07XG5cbmNvbnN0IElOSVRJQUxfTElOS19TSEVFVF9HQVRFX1NUQVRFOiBMaW5rU2hlZXRHYXRlU3RhdGUgPSB7XG4gIGxpbmtTaGVldExvY2tlZDogZmFsc2UsXG4gIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlOiBcIlwiLFxuICBsaW5rU2hlZXRDaGVja0J1c3k6IGZhbHNlLFxufTtcblxuY29uc3QgbGlua1NoZWV0R2F0ZVJlZHVjZXIgPSAoc3RhdGU6IExpbmtTaGVldEdhdGVTdGF0ZSwgYWN0aW9uOiBMaW5rU2hlZXRHYXRlQWN0aW9uKTogTGlua1NoZWV0R2F0ZVN0YXRlID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgXCJyZXBsYWNlXCI6XG4gICAgICByZXR1cm4gYWN0aW9uLm5leHRTdGF0ZTtcbiAgICBjYXNlIFwicGF0Y2hcIjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAuLi5hY3Rpb24ucGF0Y2gsXG4gICAgICB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbi8vIFZhbGlkYXRlcyB0aGUgdGFyZ2V0IHNoZWV0IHN0YXRlIGJlZm9yZSBsaW5rLW1vZGUgYWN0aW9ucyBjYW4gcnVuLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlID0gKHtcbiAgaXNMaW5rTW9kZSxcbiAgbGlua1NoZWV0SWQsXG4gIGNhblByb2Nlc3NMaW5rTW9kZSxcbiAgYWxsb3dTZWxmTWFuYWdlbWVudCxcbiAgY2FuTWFuYWdlT3RoZXJVc2VycyxcbiAgY3VycmVudEF4VXNlcklkLFxuICBjdXJyZW50Q3JtVXNlcklkLFxuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXG4gIHJlc29sdmVCbG9ja2VkTWVzc2FnZSxcbn06IFVzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlQXJncykgPT4ge1xuICBjb25zdCBbc3RhdGUsIGRpc3BhdGNoXSA9IHVzZVJlZHVjZXIobGlua1NoZWV0R2F0ZVJlZHVjZXIsIElOSVRJQUxfTElOS19TSEVFVF9HQVRFX1NUQVRFKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNMaW5rTW9kZSB8fCAhbGlua1NoZWV0SWQpIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogXCJyZXBsYWNlXCIsXG4gICAgICAgIG5leHRTdGF0ZTogSU5JVElBTF9MSU5LX1NIRUVUX0dBVEVfU1RBVEUsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWNhblByb2Nlc3NMaW5rTW9kZSkge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBcInJlcGxhY2VcIixcbiAgICAgICAgbmV4dFN0YXRlOiB7XG4gICAgICAgICAgbGlua1NoZWV0TG9ja2VkOiB0cnVlLFxuICAgICAgICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlOiBpbmRUKFwiQXV0aF9QZXJtaXNzaW9uRGVuaWVkX0JvZHlcIiwgXCJObyBwZXJtaXNzaW9uLlwiKSxcbiAgICAgICAgICBsaW5rU2hlZXRDaGVja0J1c3k6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFwicGF0Y2hcIixcbiAgICAgIHBhdGNoOiB7XG4gICAgICAgIGxpbmtTaGVldENoZWNrQnVzeTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKGxpbmtTaGVldElkLCB7XG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY2FuY2VsbGVkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IFwicmVwbGFjZVwiLFxuICAgICAgICAgICAgbmV4dFN0YXRlOiB7XG4gICAgICAgICAgICAgIGxpbmtTaGVldExvY2tlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2U6XG4gICAgICAgICAgICAgICAgc2FmZVRleHQocmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpLFxuICAgICAgICAgICAgICBsaW5rU2hlZXRDaGVja0J1c3k6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBoZWFkZXJzID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRTaGVldCA9XG4gICAgICAgICAgaGVhZGVycy5maW5kKFxuICAgICAgICAgICAgKGVudHJ5KSA9PlxuICAgICAgICAgICAgICBzYWZlVGV4dCgoZW50cnkgYXMgeyBIb2phR2FzdG9zSWQ/OiB1bmtub3duIH0pPy5Ib2phR2FzdG9zSWQpLnRvVXBwZXJDYXNlKCkgPT09IGxpbmtTaGVldElkLnRvVXBwZXJDYXNlKClcbiAgICAgICAgICApIHx8XG4gICAgICAgICAgaGVhZGVyc1swXSB8fFxuICAgICAgICAgIG51bGw7XG5cbiAgICAgICAgaWYgKCFzZWxlY3RlZFNoZWV0KSB7XG4gICAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogXCJyZXBsYWNlXCIsXG4gICAgICAgICAgICBuZXh0U3RhdGU6IHtcbiAgICAgICAgICAgICAgbGlua1NoZWV0TG9ja2VkOiB0cnVlLFxuICAgICAgICAgICAgICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IHdhcyBub3QgZm91bmQuXCIpLFxuICAgICAgICAgICAgICBsaW5rU2hlZXRDaGVja0J1c3k6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtYXBwZWRIZWFkZXIgPSBtYXBFeHBlbnNlU2hlZXRIZWFkZXIoc2VsZWN0ZWRTaGVldCk7XG4gICAgICAgIGNvbnN0IHN0YXR1c0NvZGUgPSB0eXBlb2YgbWFwcGVkSGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IG1hcHBlZEhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgOiBudWxsO1xuICAgICAgICBjb25zdCBpc1BhaWQgPSBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19QQUlEIHx8IGhhc0Fzc2lnbmVkVm91Y2hlcihtYXBwZWRIZWFkZXIudm91Y2hlcik7XG4gICAgICAgIGNvbnN0IGlzTWFuYWdpbmdPdGhlclVzZXIgPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkKHtcbiAgICAgICAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICAgICAgICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICAgICAgICBjdXJyZW50Q3JtVXNlcklkLFxuICAgICAgICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcbiAgICAgICAgICByZWNvcmRPd25lclVzZXJJZDogbWFwcGVkSGVhZGVyLnVzZXJJZCxcbiAgICAgICAgICBpc0NyZWF0ZU1vZGU6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZGV0YWlsUG9saWN5ID0gcmVzb2x2ZUV4cGVuc2VTaGVldERldGFpbFBvbGljeSh7XG4gICAgICAgICAgc3RhdHVzQ29kZSxcbiAgICAgICAgICBpc01hbmFnaW5nT3RoZXJVc2VyLFxuICAgICAgICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXG4gICAgICAgICAgaXNQYWlkLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgaXNMb2NrZWQgPSBkZXRhaWxQb2xpY3kuaW50ZXJhY3Rpb25Nb2RlICE9PSBcImZ1bGxfZWRpdFwiO1xuXG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICB0eXBlOiBcInJlcGxhY2VcIixcbiAgICAgICAgICBuZXh0U3RhdGU6IHtcbiAgICAgICAgICAgIGxpbmtTaGVldExvY2tlZDogaXNMb2NrZWQsXG4gICAgICAgICAgICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZTogaXNMb2NrZWQgPyByZXNvbHZlQmxvY2tlZE1lc3NhZ2UoaXNQYWlkKSA6IFwiXCIsXG4gICAgICAgICAgICBsaW5rU2hlZXRDaGVja0J1c3k6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChpc0V4cGVuc2VBYm9ydExpa2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBcInBhdGNoXCIsXG4gICAgICAgICAgICBwYXRjaDoge1xuICAgICAgICAgICAgICBsaW5rU2hlZXRDaGVja0J1c3k6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgdHlwZTogXCJyZXBsYWNlXCIsXG4gICAgICAgICAgbmV4dFN0YXRlOiB7XG4gICAgICAgICAgICBsaW5rU2hlZXRMb2NrZWQ6IHRydWUsXG4gICAgICAgICAgICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZTpcbiAgICAgICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzXG4gICAgICAgICAgICAgICAgPyBpbmRUKFwiQXV0aF9QZXJtaXNzaW9uRGVuaWVkX0JvZHlcIiwgXCJObyBwZXJtaXNzaW9uLlwiKVxuICAgICAgICAgICAgICAgIDogZXJyb3IgaW5zdGFuY2VvZiBFcnJvclxuICAgICAgICAgICAgICAgICAgPyBlcnJvci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgICA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlwiKSxcbiAgICAgICAgICAgIGxpbmtTaGVldENoZWNrQnVzeTogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSkoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjYW5jZWxsZWQgPSB0cnVlO1xuICAgIH07XG4gIH0sIFtcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gICAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxuICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxuICAgIGlzTGlua01vZGUsXG4gICAgbGlua1NoZWV0SWQsXG4gICAgcmVzb2x2ZUJsb2NrZWRNZXNzYWdlLFxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcbiAgXSk7XG5cbiAgcmV0dXJuIHN0YXRlO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGlCQUFrRjs7O0FDQWxGLG1CQUFtQztBQW9FL0I7QUE5REosSUFBTSxvQkFBb0I7QUFDMUIsSUFBTSxlQUFlO0FBbUJyQixJQUFNLGdDQUFnQyxDQUFDO0FBQUEsRUFDckM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNB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QUFVLGdCQUFnQixpQkFBaUIsc0JBQXNCO0FBQUE7QUFBQSxJQUNuRSxHQUNGLElBQ0U7QUFBQSxJQUVILG1CQUFtQixDQUFDLGFBQ25CO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxXQUFXLEtBQUssNkJBQTZCLHFCQUFrQjtBQUFBLFFBQy9ELE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLGVBQWUsS0FBSyw2QkFBNkIscUJBQWtCO0FBQUEsUUFDbkUsV0FBVztBQUFBO0FBQUEsSUFDYixJQUNFO0FBQUEsS0FDTjtBQUVKO0FBR0EsSUFBTSxxQkFBcUIsTUFBTTtBQUMvQixTQUNFLDZDQUFDLGdDQUFxQix5QkFBdUIsTUFDM0MsdURBQUMsNkJBQTBCLEdBQzdCO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxzQkFBc0I7QUFDN0QsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQyxzQkFBbUIsQ0FBRTtBQUNqRDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sNkJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAibm9ybWFsaXplRmlsZUlkIiwgIm5vcm1hbGl6ZVNlbGVjdGlvbk1vZGUiLCAibm9ybWFsaXplRXhjbHVkZWRJZHMiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiLCAiaXNMaW5rTW9kZSIsICJjYWNoZWRTdGF0ZSJdCn0K
