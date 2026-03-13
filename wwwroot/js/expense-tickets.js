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
} from "./chunks/chunk-X5P6FFET.js";
import {
  mapWindowEnumOptions
} from "./chunks/chunk-BVPBMOU4.js";
import {
  PageBottomActionButton,
  PageBottomActions_default,
  TICKET_IMAGE_ACCEPT_ATTRIBUTE,
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-SP5ZER7M.js";
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
} from "./chunks/chunk-CL6KAXCB.js";
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
      canProcessLinkMode && !linkSheetCheckBusy && !linkSheetLocked ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_runtime6.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "grid grid-cols-2 gap-1.5 pt-0.5", children: [
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL0V4cGVuc2VUaWNrZXRzUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvdXNlRXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL3VzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy91c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZUxheW91dEVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uLCB7IHR5cGUgRmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbSB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgUGFnZUJvdHRvbUFjdGlvbnMsIHsgUGFnZUJvdHRvbUFjdGlvbkJ1dHRvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUGFnZUJvdHRvbUFjdGlvbnMudHN4XCI7XG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4XCI7XG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCwgdHlwZSBBdXRoTWFuYWdlZFVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcbmltcG9ydCBFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbS50c3hcIjtcbmltcG9ydCBFeHBlbnNlVGlja2V0TGlua0J1bGtTdW1tYXJ5IGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5rQnVsa1N1bW1hcnkudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWwgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWwudHN4XCI7XG5pbXBvcnQgeyBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgfSBmcm9tIFwiLi4vZXhwZW5zZUZvcm1hdHRlcnMudHNcIjtcbmltcG9ydCB7IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcbmltcG9ydCB7XG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoLFxuICBsaW5rRXhwZW5zZVNoZWV0VGlja2V0c0J1bGssXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBjbGVhckV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUsIHNldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFjdGluZ1VzZXIudHNcIjtcbmltcG9ydCB7IHRvRXhwZW5zZUlzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xuaW1wb3J0IHsgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLCBuYXZpZ2F0ZVRvRXhwZW5zZVVybCwgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuaW1wb3J0IHsgbWFwV2luZG93RW51bU9wdGlvbnMsIHR5cGUgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuaW1wb3J0IHtcbiAgYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwsXG4gIGNsZWFyRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXG4gIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XG5pbXBvcnQgeyBoYXNFeHBlbnNlUmV0dXJuUmVmZXJyZXIsIGlzRXhwZW5zZUhpc3RvcnlCYWNrRm9yd2FyZE5hdmlnYXRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUhpc3RvcnlOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzLCBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIHNhZmVUZXh0LCBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0RmxvdyB9IGZyb20gXCIuLi9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93LnRzXCI7XG5pbXBvcnQgeyBUSUNLRVRfSU1BR0VfQUNDRVBUX0FUVFJJQlVURSB9IGZyb20gXCIuLi9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93Q29yZS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGEudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUsIHR5cGUgRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUudHNcIjtcbmltcG9ydCB7XG4gIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSxcbiAgcmVhZEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsXG4gIHNhdmVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLnRzXCI7XG5pbXBvcnQgeyBidWlsZEV4cGVuc2VUaWNrZXRMaW5rQnVsa0ZpbHRlcnMgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVBheWxvYWRCdWlsZGVycy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0byB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcbiAgRXhwZW5zZVRpY2tldExpbmtDYXJkLFxuICBFeHBlbnNlVGlja2V0TGlzdFBhZ2VJdGVtLFxufSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbiB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZCB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlLnRzXCI7XG5pbXBvcnQgeyBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5IGFzIHJldmVhbFRvcGJhckFjdGlvbkdyb3VwIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RvcGJhckFjdGlvblZpc2liaWxpdHkudHNcIjtcblxuY29uc3QgUEFHRV9TSVpFID0gMTA7XG5jb25zdCBBTExPV0VEX0dBU1RPX1RZUEVTID0gbmV3IFNldDxudW1iZXI+KFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0pO1xuXG5jb25zdCBHQVNUT19UWVBFX0xBQkVMX0tFWVM6IFJlY29yZDxudW1iZXIsIHsga2V5OiBzdHJpbmc7IGZhbGxiYWNrOiBzdHJpbmcgfT4gPSB7XG4gIDA6IHsga2V5OiBcIkVudW1fTm9uZVwiLCBmYWxsYmFjazogXCJOb25lXCIgfSxcbiAgMTogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfUGVhamVcIiwgZmFsbGJhY2s6IFwiUGVhamVcIiB9LFxuICAyOiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9QYXJraW5nXCIsIGZhbGxiYWNrOiBcIlBhcmtpbmdcIiB9LFxuICAzOiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9LbVwiLCBmYWxsYmFjazogXCJLbVwiIH0sXG4gIDQ6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0Rlc2F5dW5vXCIsIGZhbGxiYWNrOiBcIkRlc2F5dW5vXCIgfSxcbiAgNTogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfQ29taWRhXCIsIGZhbGxiYWNrOiBcIkNvbWlkYVwiIH0sXG4gIDY6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0NlbmFcIiwgZmFsbGJhY2s6IFwiQ2VuYVwiIH0sXG4gIDc6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0hvdGVsXCIsIGZhbGxiYWNrOiBcIkhvdGVsXCIgfSxcbiAgODogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfVmFyaW9zXCIsIGZhbGxiYWNrOiBcIlZhcmlvc1wiIH0sXG4gIDE0OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9UYXhpXCIsIGZhbGxiYWNrOiBcIlRheGlcIiB9LFxufTtcblxuY29uc3Qgbm9ybWFsaXplVXNlcklkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XG5cbmNvbnN0IGlzU2FtZVVzZXIgPSAobGVmdDogc3RyaW5nLCByaWdodDogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRMZWZ0ID0gbm9ybWFsaXplVXNlcklkKGxlZnQpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRSaWdodCA9IG5vcm1hbGl6ZVVzZXJJZChyaWdodCkudG9VcHBlckNhc2UoKTtcbiAgcmV0dXJuICEhbm9ybWFsaXplZExlZnQgJiYgbm9ybWFsaXplZExlZnQgPT09IG5vcm1hbGl6ZWRSaWdodDtcbn07XG5cbmNvbnN0IGVuc3VyZUN1cnJlbnRVc2VySW5MaXN0ID0gKHVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXSwgY3VycmVudEF4VXNlcklkOiBzdHJpbmcpOiBBdXRoTWFuYWdlZFVzZXJbXSA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50ID0gbm9ybWFsaXplVXNlcklkKGN1cnJlbnRBeFVzZXJJZCk7XG4gIGlmICghbm9ybWFsaXplZEN1cnJlbnQpIHJldHVybiB1c2VycztcbiAgaWYgKHVzZXJzLnNvbWUoKGVudHJ5KSA9PiBpc1NhbWVVc2VyKGVudHJ5LmF4VXNlcklkLCBub3JtYWxpemVkQ3VycmVudCkpKSByZXR1cm4gdXNlcnM7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgY3JtVXNlcklkOiBub3JtYWxpemVkQ3VycmVudCxcbiAgICAgIGF4VXNlcklkOiBub3JtYWxpemVkQ3VycmVudCxcbiAgICAgIG5hbWU6IG5vcm1hbGl6ZWRDdXJyZW50LFxuICAgIH0sXG4gICAgLi4udXNlcnMsXG4gIF07XG59O1xuXG5jb25zdCByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24gPSAocmVxdWVzdGVkVXNlcklkOiBzdHJpbmcsIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nLCB1c2VyczogQXV0aE1hbmFnZWRVc2VyW10pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkUmVxdWVzdGVkID0gbm9ybWFsaXplVXNlcklkKHJlcXVlc3RlZFVzZXJJZCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50ID0gbm9ybWFsaXplVXNlcklkKGN1cnJlbnRBeFVzZXJJZCk7XG4gIGlmIChub3JtYWxpemVkUmVxdWVzdGVkKSB7XG4gICAgY29uc3QgZm91bmQgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZFJlcXVlc3RlZCkpO1xuICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kLmF4VXNlcklkO1xuICB9XG4gIGlmIChub3JtYWxpemVkQ3VycmVudCkge1xuICAgIGNvbnN0IHNlbGYgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZEN1cnJlbnQpKTtcbiAgICByZXR1cm4gc2VsZj8uYXhVc2VySWQgfHwgbm9ybWFsaXplZEN1cnJlbnQ7XG4gIH1cbiAgcmV0dXJuIFwiXCI7XG59O1xuXG5jb25zdCBidWlsZExpbmtNb2RlSW5pdGlhbFNuYXBzaG90ID0gKG1hbmFnZWRVc2VySWQgPSBcIlwiKTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9PiB7XG4gIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcbiAgY29uc3QgZnJvbURhdGUgPSBuZXcgRGF0ZSh0b2RheSk7XG4gIC8vIEtlZXAgYXV0b21hdGljIGxpbmstbW9kZSBsb2FkIGJvdW5kZWQgdG8gYXZvaWQgaGVhdnkgdXBzdHJlYW0gc2NhbnMuXG4gIGZyb21EYXRlLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMjkpO1xuXG4gIHJldHVybiB7XG4gICAgZnJvbURhdGU6IHRvSXNvRGF0ZShmcm9tRGF0ZSksXG4gICAgdG9EYXRlOiB0b0lzb0RhdGUodG9kYXkpLFxuICAgIGZpbHRlcktleTogXCJcIixcbiAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXG4gICAgbWFuYWdlZFVzZXJJZDogbm9ybWFsaXplVXNlcklkKG1hbmFnZWRVc2VySWQpLFxuICAgIHN0YXR1c0ZpbHRlcjogMCxcbiAgICBnYXN0b1R5cGVGaWx0ZXI6IFwiXCIsXG4gICAgcHJvY2Vzc2VkQnlJYUZpbHRlcjogXCJhbGxcIixcbiAgfTtcbn07XG5cbmNvbnN0IHJlc29sdmVMaW5rTW9kZUJsb2NrZWRNZXNzYWdlID0gKGlzUGFpZDogYm9vbGVhbik6IHN0cmluZyA9PiB7XG4gIGlmIChpc1BhaWQpIHtcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1BhaWRSZWFkT25seVwiLCBcIkxhcyBob2phcyBkZSBnYXN0byBwYWdhZGFzIHNvbiBkZSBzb2xvIGxlY3R1cmEuXCIpO1xuICB9XG5cbiAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9SZWFkT25seUJ5U3RhdHVzXCIsIFwiTm8gc2UgcHVlZGUgZWRpdGFyIGVzdGEgaG9qYSBkZSBnYXN0b3MgZW4gZWwgZXN0YWRvIGFjdHVhbC5cIik7XG59O1xuXG5jb25zdCBFWFBFTlNFX1RJQ0tFVFNfTE9HX1BSRUZJWCA9IFwiW2V4cGVuc2UtdGlja2V0c11cIjtcblxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNJbmZvID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUuaW5mbyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY29uc29sZS5pbmZvKEVYUEVOU0VfVElDS0VUU19MT0dfUFJFRklYLCAuLi5hcmdzKTtcbiAgfVxufTtcblxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNXYXJuID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUud2FybiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY29uc29sZS53YXJuKEVYUEVOU0VfVElDS0VUU19MT0dfUFJFRklYLCAuLi5hcmdzKTtcbiAgfVxufTtcblxuLy8gS2VlcHMgY3JlYXRlZC10aWNrZXQgcmV0dXJuIGZpbHRlcnMgYm91bmQgdG8gb25lIHZhbGlkIGxpc3QgZGF0ZS5cbmNvbnN0IHJlc29sdmVDcmVhdGVkVGlja2V0RmlsdGVyRGF0ZSA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIHJldHVybiB0b0V4cGVuc2VJc29EYXRlKHZhbHVlKSB8fCB0b0V4cGVuc2VJc29EYXRlKG5ldyBEYXRlKCkpO1xufTtcblxuLy8gVmFsaWRhdGVzIHdoZXRoZXIgb25lIHRpY2tldCBjYXJkIGNhbiBwYXJ0aWNpcGF0ZSBpbiBidWxrIGxpbmsgbW9kZS5cbmNvbnN0IGNhblNlbGVjdFRpY2tldEZvckxpbmsgPSAoaXRlbTogRXhwZW5zZVRpY2tldExpc3RQYWdlSXRlbSk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChpdGVtLmZpbGVJZCk7XG4gIHJldHVybiAhIWZpbGVJZDtcbn07XG5cbi8vIEluaXRpYWxpemVzIGF1dGggc2VlZCBmb3IgZXhwZW5zZSBBUEkgY2FsbHMgYmVmb3JlIGlzbGFuZCBlZmZlY3RzIHJ1bi5cbmNvbnN0IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoID0gKCkgPT4ge1xuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCh7XG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXG4gICAgYXBwQ29kZTogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxuICB9KTtcbn07XG5cbmNvbnN0IGJ1aWxkRmFsbGJhY2tHYXN0b1R5cGVPcHRpb25zID0gKCk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XG4gIHJldHVybiBPYmplY3QuZW50cmllcyhHQVNUT19UWVBFX0xBQkVMX0tFWVMpXG4gICAgLm1hcCgoW2NvZGUsIGNmZ10pID0+ICh7XG4gICAgICB2YWx1ZTogU3RyaW5nKGNvZGUpLFxuICAgICAgdGV4dDogaW5kVChjZmcua2V5LCBjZmcuZmFsbGJhY2spLFxuICAgIH0pKVxuICAgIC5zb3J0KChsZWZ0LCByaWdodCkgPT4gTnVtYmVyKGxlZnQudmFsdWUpIC0gTnVtYmVyKHJpZ2h0LnZhbHVlKSk7XG59O1xuXG5jb25zdCBOZXdUaWNrZXRJY29uID0gKCkgPT4gKFxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cImgtNiB3LTZcIj5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMCAyMGgtNWEyIDIgMCAwIDEgLTIgLTJ2LTlhMiAyIDAgMCAxIDIgLTJoMWEyIDIgMCAwIDAgMiAtMmExIDEgMCAwIDEgMSAtMWg2YTEgMSAwIDAgMSAxIDFhMiAyIDAgMCAwIDIgMmgxYTIgMiAwIDAgMSAyIDJ2MlwiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQuMzYyIDExLjE1YTMgMyAwIDEgMCAtNC4xNDQgNC4yNjNcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDIxdi00YTIgMiAwIDEgMSA0IDB2NFwiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMTloNFwiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMjEgMTV2NlwiIC8+XG4gIDwvc3ZnPlxuKTtcblxuY29uc3QgRXhwZW5zZVRpY2tldHNQYWdlQ29udGVudCA9ICgpID0+IHtcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJWaWV3XCIpO1xuICBjb25zdCBjYW5DcmVhdGVUaWNrZXQgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIkFkZFwiKTtcbiAgY29uc3QgY2FuTGlua1NoZWV0TGluZXMgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkFkZFwiKTtcbiAgY29uc3Qge1xuICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxuICAgIHN1Ym9yZGluYXRlcyxcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICAgIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXG4gIH0gPSB1c2VBdXRoQ29udGV4dCgpO1xuICBjb25zdCB0aW1lbGluZUNvbnRhaW5lclJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBjYW1lcmFJbnB1dFJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGdhbGxlcnlJbnB1dFJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGRpZFJlc3RvcmVPbk1vdW50UmVmID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYgPSBSZWFjdC51c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHBlbmRpbmdGb2N1c0ZpbGVJZFJlZiA9IFJlYWN0LnVzZVJlZihcIlwiKTtcbiAgY29uc3QgbGlua01vZGVDb250ZXh0ID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgY29uc3QgYWN0aW9uID0gc2FmZVRleHQodXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJhY3Rpb25cIikpLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgaG9qYUdhc3Rvc0lkID0gc2FmZVRleHQodXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJob2phR2FzdG9zSWRcIikpO1xuICAgIGNvbnN0IGlzTGlua01vZGUgPSBhY3Rpb24gPT09IFwibGlua1wiICYmICEhaG9qYUdhc3Rvc0lkO1xuICAgIHJldHVybiB7XG4gICAgICBpc0xpbmtNb2RlLFxuICAgICAgc2hlZXRJZDogaG9qYUdhc3Rvc0lkLFxuICAgICAgc2hlZXRPcmlnaW46IGlzTGlua01vZGUgPyAoXCJzaGVldC1saW5rXCIgYXMgY29uc3QpIDogKCEhaG9qYUdhc3Rvc0lkID8gKFwic2hlZXQtY3JlYXRlXCIgYXMgY29uc3QpIDogbnVsbCksXG4gICAgICBmaXhlZFN0YXR1c0ZpbHRlcjogaXNMaW5rTW9kZSA/ICgwIGFzIGNvbnN0KSA6IG51bGwsXG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGlzTGlua01vZGUgPSBsaW5rTW9kZUNvbnRleHQuaXNMaW5rTW9kZTtcbiAgY29uc3QgbGlua1NoZWV0SWQgPSBsaW5rTW9kZUNvbnRleHQuc2hlZXRJZDtcbiAgY29uc3Qgc2hlZXRDYWxsZXJPcmlnaW4gPSBsaW5rTW9kZUNvbnRleHQuc2hlZXRPcmlnaW47XG4gIGNvbnN0IGhhc1NoZWV0Q2FsbGVyQ29udGV4dCA9ICEhbGlua1NoZWV0SWQgJiYgISFzaGVldENhbGxlck9yaWdpbjtcbiAgY29uc3QgZml4ZWRTdGF0dXNGaWx0ZXIgPSBsaW5rTW9kZUNvbnRleHQuZml4ZWRTdGF0dXNGaWx0ZXI7XG4gIGNvbnN0IGNhblByb2Nlc3NMaW5rTW9kZSA9ICFpc0xpbmtNb2RlIHx8IGNhbkxpbmtTaGVldExpbmVzO1xuICBjb25zdCBtYW5hZ2VkVXNlcnMgPSB1c2VNZW1vKFxuICAgICgpID0+IGVuc3VyZUN1cnJlbnRVc2VySW5MaXN0KEFycmF5LmlzQXJyYXkoc3Vib3JkaW5hdGVzKSA/IHN1Ym9yZGluYXRlcyA6IFtdLCBjdXJyZW50QXhVc2VySWQpLFxuICAgIFtjdXJyZW50QXhVc2VySWQsIHN1Ym9yZGluYXRlc11cbiAgKTtcbiAgY29uc3QgZGVmYXVsdE1hbmFnZWRVc2VySWQgPSB1c2VNZW1vKFxuICAgICgpID0+IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbihjdXJyZW50QXhVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzKSxcbiAgICBbY3VycmVudEF4VXNlcklkLCBtYW5hZ2VkVXNlcnNdXG4gICk7XG4gIGNvbnN0IHNob3dNYW5hZ2VkVXNlckZpbHRlciA9IGlzTGlua01vZGUgJiYgY2FuTWFuYWdlT3RoZXJVc2VycztcblxuICAvLyBLZWVwcyBsaW5rLW1vZGUgbGlzdCBxdWVyaWVzIGJvdW5kZWQgZXZlbiB3aGVuIFVJIGZpbHRlcnMgYXJlIGNsZWFyZWQuXG4gIGNvbnN0IG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkID0gdXNlQ2FsbGJhY2soXG4gICAgKHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9PiB7XG4gICAgICBpZiAoIWlzTGlua01vZGUpIHJldHVybiBzbmFwc2hvdDtcblxuICAgICAgY29uc3QgZmFsbGJhY2sgPSBidWlsZExpbmtNb2RlSW5pdGlhbFNuYXBzaG90KHNuYXBzaG90Lm1hbmFnZWRVc2VySWQpO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZEZyb21EYXRlID0gc2FmZVRleHQoc25hcHNob3QuZnJvbURhdGUpIHx8IGZhbGxiYWNrLmZyb21EYXRlO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZFRvRGF0ZSA9IHNhZmVUZXh0KHNuYXBzaG90LnRvRGF0ZSkgfHwgZmFsbGJhY2sudG9EYXRlO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZE1hbmFnZWRVc2VySWQgPSBub3JtYWxpemVVc2VySWQoc25hcHNob3QubWFuYWdlZFVzZXJJZCkgfHwgZmFsbGJhY2subWFuYWdlZFVzZXJJZDtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc25hcHNob3QsXG4gICAgICAgIGZyb21EYXRlOiBub3JtYWxpemVkRnJvbURhdGUsXG4gICAgICAgIHRvRGF0ZTogbm9ybWFsaXplZFRvRGF0ZSxcbiAgICAgICAgbWFuYWdlZFVzZXJJZDogbm9ybWFsaXplZE1hbmFnZWRVc2VySWQsXG4gICAgICAgIHN0YXR1c0ZpbHRlcjogMCxcbiAgICAgIH07XG4gICAgfSxcbiAgICBbaXNMaW5rTW9kZV1cbiAgKTtcblxuICBjb25zdCBbbGlua0Zsb3dCdXN5LCBzZXRMaW5rRmxvd0J1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbGlua0Zsb3dTdGF0dXMsIHNldExpbmtGbG93U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbGlua0Zsb3dFcnJvciwgc2V0TGlua0Zsb3dFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3NlbGVjdEFsbEJ1c3ksIHNldFNlbGVjdEFsbEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2VsZWN0QWxsRXJyb3IsIHNldFNlbGVjdEFsbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbGlua0J1bGtSZXN1bHQsIHNldExpbmtCdWxrUmVzdWx0XSA9IHVzZVN0YXRlPEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxuICAgIH0pLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXG4gIH0pO1xuXG4gIGNvbnN0IGdhc3RvVHlwZU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4ge1xuICAgIGNvbnN0IHNvdXJjZSA9IEFycmF5LmlzQXJyYXkod2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fKSA/IHdpbmRvdy5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXyA6IFtdO1xuICAgIGNvbnN0IG1hcHBlZCA9IG1hcFdpbmRvd0VudW1PcHRpb25zKHNvdXJjZSkuZmlsdGVyKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKGVudHJ5LnZhbHVlKTtcbiAgICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgQUxMT1dFRF9HQVNUT19UWVBFUy5oYXMocGFyc2VkKTtcbiAgICB9KTtcblxuICAgIGlmIChtYXBwZWQubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIG1hcHBlZC5zb3J0KChsZWZ0LCByaWdodCkgPT4gTnVtYmVyKGxlZnQudmFsdWUpIC0gTnVtYmVyKHJpZ2h0LnZhbHVlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1aWxkRmFsbGJhY2tHYXN0b1R5cGVPcHRpb25zKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBnYXN0b1R5cGVMYWJlbE1hcCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgZ2FzdG9UeXBlT3B0aW9ucykge1xuICAgICAgbWFwLnNldChTdHJpbmcob3B0aW9uLnZhbHVlKSwgb3B0aW9uLnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gbWFwO1xuICB9LCBbZ2FzdG9UeXBlT3B0aW9uc10pO1xuXG4gIGNvbnN0IHtcbiAgICBpdGVtcyxcbiAgICB0b3RhbCxcbiAgICBjdXJyZW50UGFnZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGxvYWRMaXN0LFxuICAgIHJlc3RvcmVMaXN0U25hcHNob3QsXG4gICAgcmVzZXRMaXN0LFxuICAgIGNsZWFyTGlzdENhY2hlLFxuICB9ID0gdXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YSh7XG4gICAgaGFzQWNjZXNzLFxuICAgIHBhZ2VTaXplOiBQQUdFX1NJWkUsXG4gICAgbW9kZTogaXNMaW5rTW9kZSA/IFwibGlua1wiIDogXCJnZW5lcmFsXCIsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgY29uc3VtZVJldHVybkZsYWcsIGNvbnN1bWVSZXR1cm5Nb2RlLCBzYXZlQ2FjaGVkU3RhdGUsIGNsZWFyQ2FjaGVkU3RhdGUgfSA9IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUoKTtcbiAgY29uc3Qge1xuICAgIHNlbGVjdGlvbk1vZGUsXG4gICAgc2VsZWN0ZWRUaWNrZXRzLFxuICAgIGV4Y2x1ZGVkSWRzLFxuICAgIGZpbHRlcmVkU25hcHNob3QsXG4gICAgZmlsdGVyZWRUb3RhbENvdW50LFxuICAgIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUsXG4gICAgaXNTZWxlY3RlZDogaXNMaW5rVGlja2V0U2VsZWN0ZWQsXG4gICAgdG9nZ2xlVGlja2V0OiB0b2dnbGVMaW5rVGlja2V0U2VsZWN0aW9uLFxuICAgIGNsZWFyU2VsZWN0aW9uOiBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24sXG4gICAgcmVzdG9yZVNlbGVjdGlvbjogcmVzdG9yZUxpbmtUaWNrZXRTZWxlY3Rpb24sXG4gICAgc2VsZWN0QWxsQnlGaWx0ZXJzLFxuICAgIGh5ZHJhdGVWaXNpYmxlVGlja2V0cyxcbiAgICByZXNvbHZlU2VsZWN0ZWRDb3VudCxcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uKCk7XG4gIGNvbnN0IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbiA9IHVzZUNhbGxiYWNrKFxuICAgIChyZXF1ZXN0ZWRVc2VySWQ6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICBjb25zdCByZXNvbHZlZFVzZXJJZCA9IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbihyZXF1ZXN0ZWRVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJzKTtcbiAgICAgIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZChyZXNvbHZlZFVzZXJJZCk7XG4gICAgICBpZiAoIXJlc29sdmVkVXNlcklkIHx8IChjdXJyZW50QXhVc2VySWQgJiYgaXNTYW1lVXNlcihyZXNvbHZlZFVzZXJJZCwgY3VycmVudEF4VXNlcklkKSkpIHtcbiAgICAgICAgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKHJlc29sdmVkVXNlcklkKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNvbHZlZFVzZXJJZDtcbiAgICB9LFxuICAgIFtjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vycywgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkXVxuICApO1xuICBjb25zdCB7XG4gICAgbGlua1NoZWV0TG9ja2VkLFxuICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlLFxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlKHtcbiAgICBpc0xpbmtNb2RlLFxuICAgIGxpbmtTaGVldElkLFxuICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgIHJlc29sdmVCbG9ja2VkTWVzc2FnZTogcmVzb2x2ZUxpbmtNb2RlQmxvY2tlZE1lc3NhZ2UsXG4gIH0pO1xuICBjb25zdCB7IHJ1bkF1dG9tYXRpY0xpc3RMb2FkIH0gPSB1c2VFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZCh7XG4gICAgaXNMaW5rTW9kZSxcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxuICAgIGxpbmtTaGVldExvY2tlZCxcbiAgICBjbGVhckxpc3RDYWNoZSxcbiAgICByZXNldExpc3QsXG4gICAgbG9hZExpc3QsXG4gIH0pO1xuICBjb25zdCBidWlsZEluaXRpYWxMaW5rTW9kZVNuYXBzaG90ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcbiAgICByZXR1cm4gYnVpbGRMaW5rTW9kZUluaXRpYWxTbmFwc2hvdChpbml0aWFsTWFuYWdlZFVzZXJJZCk7XG4gIH0sIFtkZWZhdWx0TWFuYWdlZFVzZXJJZCwgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXSk7XG5cbiAgY29uc3Qge1xuICAgIGZyb21EYXRlLFxuICAgIHRvRGF0ZSxcbiAgICBmaWx0ZXJLZXksXG4gICAgY3VycmVuY3lDb2RlLFxuICAgIG1hbmFnZWRVc2VySWQsXG4gICAgc3RhdHVzRmlsdGVyLFxuICAgIGdhc3RvVHlwZUZpbHRlcixcbiAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRmlsdGVyLFxuICAgIHNob3dNYW51YWxEYXRlRXJyb3IsXG4gICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxuICAgIGFwcGxpZWRGaWx0ZXJzLFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIGN1cnJlbnRGaWx0ZXJzLFxuICAgIHNldEZpbHRlcktleSxcbiAgICBzZXRDdXJyZW5jeUNvZGUsXG4gICAgc2V0TWFuYWdlZFVzZXJJZCxcbiAgICBzZXRTdGF0dXNGaWx0ZXIsXG4gICAgc2V0R2FzdG9UeXBlRmlsdGVyLFxuICAgIHNldFByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gICAgb25BcHBseSxcbiAgICBvbkNsZWFyLFxuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyxcbiAgICBvbkRhdGVSYW5nZUNoYW5nZSxcbiAgICBvbk1hbnVhbFJhbmdlQ29tcGxldGUsXG4gICAgb25RdWlja0ZpbHRlckNoYW5nZSxcbiAgICB0b2dnbGVGaWx0ZXJQYW5lbCxcbiAgICBzdGF0dXNGaWx0ZXJMb2NrZWQsXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZSh7XG4gICAgZGVmYXVsdE1hbmFnZWRVc2VySWQsXG4gICAgZml4ZWRTdGF0dXNGaWx0ZXIsXG4gICAgYWxsb3dFbXB0eURhdGVzT25BcHBseTogaXNMaW5rTW9kZSxcbiAgICBvbkFwcGx5RmlsdGVyczogKHNuYXBzaG90KSA9PiB7XG4gICAgICBzZXRMaW5rQnVsa1Jlc3VsdChudWxsKTtcbiAgICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbigpO1xuICAgICAgY29uc3QgcmVzb2x2ZWRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKHNuYXBzaG90Lm1hbmFnZWRVc2VySWQpO1xuICAgICAgdm9pZCBsb2FkTGlzdChcbiAgICAgICAgMSxcbiAgICAgICAgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQoe1xuICAgICAgICAgIC4uLnNuYXBzaG90LFxuICAgICAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc29sdmVkTWFuYWdlZFVzZXJJZCxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSxcbiAgICBvbkNsZWFyRmlsdGVyczogKCkgPT4ge1xuICAgICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XG4gICAgICBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24oKTtcbiAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICAgIGlmIChpc0xpbmtNb2RlKSB7XG4gICAgICAgIGNvbnN0IGxpbmtTbmFwc2hvdCA9IGJ1aWxkSW5pdGlhbExpbmtNb2RlU25hcHNob3QoKTtcbiAgICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKGxpbmtTbmFwc2hvdCk7XG4gICAgICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkKDEsIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKGxpbmtTbmFwc2hvdCksIHtcbiAgICAgICAgICBjbGVhckNhY2hlOiB0cnVlLFxuICAgICAgICAgIHJlc2V0QmVmb3JlTG9hZDogdHJ1ZSxcbiAgICAgICAgICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXNldE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oY3VycmVudEF4VXNlcklkKTtcbiAgICAgIHNldE1hbmFnZWRVc2VySWQocmVzZXRNYW5hZ2VkVXNlcklkKTtcbiAgICAgIHJlc2V0TGlzdChcImNsZWFyLWZpbHRlcnNcIik7XG4gICAgfSxcbiAgfSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQgPSBub3JtYWxpemVVc2VySWQoZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICAgIGlmICghbm9ybWFsaXplZERlZmF1bHRNYW5hZ2VkVXNlcklkKSByZXR1cm47XG4gICAgc2V0TWFuYWdlZFVzZXJJZChub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICAgIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihub3JtYWxpemVkRGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICB9LCBbZGVmYXVsdE1hbmFnZWRVc2VySWQsIHNldE1hbmFnZWRVc2VySWQsIHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbl0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGNhbk1hbmFnZU90aGVyVXNlcnMpIHJldHVybjtcbiAgICBjb25zdCBmYWxsYmFja01hbmFnZWRVc2VySWQgPSByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24oY3VycmVudEF4VXNlcklkLCBjdXJyZW50QXhVc2VySWQsIG1hbmFnZWRVc2Vycyk7XG4gICAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnRNYW5hZ2VkVXNlcklkID0gbm9ybWFsaXplVXNlcklkKG1hbmFnZWRVc2VySWQpO1xuICAgIGlmIChpc1NhbWVVc2VyKG5vcm1hbGl6ZWRDdXJyZW50TWFuYWdlZFVzZXJJZCwgZmFsbGJhY2tNYW5hZ2VkVXNlcklkKSkgcmV0dXJuO1xuICAgIGlmICghbm9ybWFsaXplZEN1cnJlbnRNYW5hZ2VkVXNlcklkICYmICFmYWxsYmFja01hbmFnZWRVc2VySWQpIHJldHVybjtcblxuICAgIHNldE1hbmFnZWRVc2VySWQoZmFsbGJhY2tNYW5hZ2VkVXNlcklkKTtcbiAgICBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oZmFsbGJhY2tNYW5hZ2VkVXNlcklkKTtcbiAgfSwgW2Nhbk1hbmFnZU90aGVyVXNlcnMsIGN1cnJlbnRBeFVzZXJJZCwgbWFuYWdlZFVzZXJJZCwgbWFuYWdlZFVzZXJzLCBzZXRNYW5hZ2VkVXNlcklkLCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb25dKTtcblxuICBjb25zdCB7XG4gICAgc291cmNlUGlja2VyT3BlbixcbiAgICBidXN5OiBxdWlja1RpY2tldEJ1c3ksXG4gICAgcHJvZ3Jlc3NNZXNzYWdlOiBxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSxcbiAgICBlcnJvck1lc3NhZ2U6IHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlLFxuICAgIGF0dGVtcHRJZDogcXVpY2tUaWNrZXRBdHRlbXB0SWQsXG4gICAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5LFxuICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlLFxuICAgIHRyYWNlTGlzdDogcXVpY2tUaWNrZXRUcmFjZUxpc3QsXG4gICAgb3BlblNvdXJjZVBpY2tlcixcbiAgICBjbG9zZVNvdXJjZVBpY2tlcixcbiAgICBzZWxlY3RGcm9tQ2FtZXJhLFxuICAgIHNlbGVjdEZyb21HYWxsZXJ5LFxuICAgIGhhbmRsZVNlbGVjdGVkRmlsZSxcbiAgICByZXRyeVBlbmRpbmdVcGxvYWQsXG4gICAgb3BlbkNyZWF0ZWRUaWNrZXQsXG4gICAgY2xlYXJFcnJvcjogY2xlYXJRdWlja1RpY2tldEVycm9yLFxuICB9ID0gdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93KHtcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiAhaXNMaW5rTW9kZSAmJiBjYW5DcmVhdGVUaWNrZXQsXG4gICAgaXNDcmVhdGVNb2RlOiBmYWxzZSxcbiAgICBpc1NoZWV0TG9ja2VkOiBmYWxzZSxcbiAgICBsaW5rVG9TaGVldDogZmFsc2UsXG4gICAgYXhVc2VySWRPdmVycmlkZTogc2FmZVRleHQoY3VycmVudEF4VXNlcklkKSxcbiAgICBjdXJyZW5jeUNvZGU6IGN1cnJlbmN5Q29kZSB8fCBcIkVVUlwiLFxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxuICAgIG9uQ29tcGxldGVkOiAocmVzdWx0KSA9PiB7XG4gICAgICBjb25zdCBjcmVhdGVkRmlsZUlkID0gc2FmZVRleHQocmVzdWx0Py5maWxlSWQpO1xuICAgICAgaWYgKCFjcmVhdGVkRmlsZUlkKSByZXR1cm47XG5cbiAgICAgIGlmIChoYXNTaGVldENhbGxlckNvbnRleHQgJiYgc2hlZXRDYWxsZXJPcmlnaW4pIHtcbiAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcbiAgICAgICAgICBmaWxlSWQ6IGNyZWF0ZWRGaWxlSWQsXG4gICAgICAgICAgc2hlZXRJZDogbGlua1NoZWV0SWQsXG4gICAgICAgICAgb3JpZ2luOiBzaGVldENhbGxlck9yaWdpbixcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XG4gICAgICAgICAgZmlsZUlkOiBjcmVhdGVkRmlsZUlkLFxuICAgICAgICAgIG1vZGU6IFwiZWRpdFwiLFxuICAgICAgICAgIG9yaWdpbjogc2hlZXRDYWxsZXJPcmlnaW4sXG4gICAgICAgICAgc2hlZXRJZDogbGlua1NoZWV0SWQsXG4gICAgICAgIH0pO1xuICAgICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcbiAgICAgICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjbGVhckV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KCk7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/ZmlsZUlkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNyZWF0ZWRGaWxlSWQpfSZtb2RlPWVkaXQmb3JpZ2luPXRpY2tldC1jcmVhdGVgLCB7XG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9LFxuICB9KTtcblxuICBjb25zdCBmYWJNZW51SXRlbXMgPSB1c2VNZW1vPEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW1bXT4oXG4gICAgKCkgPT5cbiAgICAgIGlzTGlua01vZGVcbiAgICAgICAgPyBbXVxuICAgICAgICA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IFwibmV3LXRpY2tldFwiLFxuICAgICAgICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX05ld1RpY2tldFwiLCBcIk51ZXZvIFRpY2tldFwiKSxcbiAgICAgICAgICAgICAgaWNvbjogPE5ld1RpY2tldEljb24gLz4sXG4gICAgICAgICAgICAgIG9uQ2xpY2s6IG9wZW5Tb3VyY2VQaWNrZXIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgW2lzTGlua01vZGUsIG9wZW5Tb3VyY2VQaWNrZXJdXG4gICk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRUaWNrZXRDb3VudCA9IHJlc29sdmVTZWxlY3RlZENvdW50KHRvdGFsKTtcbiAgY29uc3Qgc2VsZWN0ZWRUb3RhbEFtb3VudCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBzZWxlY3RlZFRpY2tldHMucmVkdWNlKChzdW0sIGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGFtb3VudCA9IE51bWJlcihpdGVtLnRvdGFsQW1vdW50ID8/IDApO1xuICAgICAgcmV0dXJuIGFtb3VudCA+IDAgPyBzdW0gKyBhbW91bnQgOiBzdW07XG4gICAgfSwgMCk7XG4gIH0sIFtzZWxlY3RlZFRpY2tldHNdKTtcbiAgY29uc3Qgc2VsZWN0ZWRUb3RhbEFtb3VudFRleHQgPSB1c2VNZW1vKCgpID0+IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShzZWxlY3RlZFRvdGFsQW1vdW50LCBcIlwiKSwgW3NlbGVjdGVkVG90YWxBbW91bnRdKTtcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICByZXZlYWxUb3BiYXJBY3Rpb25Hcm91cChcImV4cGVuc2UtdGlja2V0cy1saXN0LWFjdGlvbnNcIik7XG4gIH0sIFtdKTtcblxuICBjb25zdCBsaW5rTW9kZUNhbmNlbE1lc3NhZ2UgPSB1c2VNZW1vKFxuICAgICgpID0+XG4gICAgICBpbmRUKFxuICAgICAgICBcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0NhbmNlbENvbmZpcm1cIixcbiAgICAgICAgXCJTZSBjYW5jZWxhclx1MDBFMSBlbCBwcm9jZXNvIGRlIHZpbmN1bGFjaVx1MDBGM24geSB2b2x2ZXJcdTAwRTFzIGEgbGEgaG9qYSBkZSBnYXN0b3MuIFx1MDBCRlF1aWVyZXMgY29udGludWFyP1wiXG4gICAgICApLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuID0gdXNlQ2FsbGJhY2soXG4gICAgKHRpY2tldEZpbGVJZDogc3RyaW5nLCB0aWNrZXREYXRlVmFsdWU6IHVua25vd24pID0+IHtcbiAgICAgIGNvbnN0IHRpY2tldERhdGUgPSByZXNvbHZlQ3JlYXRlZFRpY2tldEZpbHRlckRhdGUodGlja2V0RGF0ZVZhbHVlKTtcbiAgICAgIGNvbnN0IGNyZWF0ZWRUaWNrZXRNYW5hZ2VkVXNlcklkID0gbm9ybWFsaXplVXNlcklkKGN1cnJlbnRBeFVzZXJJZCk7XG4gICAgICBjb25zdCByZXNvbHZlZE1hbmFnZWRVc2VySWQgPSBjcmVhdGVkVGlja2V0TWFuYWdlZFVzZXJJZFxuICAgICAgICA/IHN5bmNNYW5hZ2VkVXNlclNlbGVjdGlvbihjcmVhdGVkVGlja2V0TWFuYWdlZFVzZXJJZClcbiAgICAgICAgOiBcIlwiO1xuXG4gICAgICBjb25zdCBxdWVyeVNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0ge1xuICAgICAgICBmcm9tRGF0ZTogdGlja2V0RGF0ZSxcbiAgICAgICAgdG9EYXRlOiB0aWNrZXREYXRlLFxuICAgICAgICBmaWx0ZXJLZXk6IHRpY2tldEZpbGVJZCxcbiAgICAgICAgY3VycmVuY3lDb2RlOiBcIlwiLFxuICAgICAgICBtYW5hZ2VkVXNlcklkOiByZXNvbHZlZE1hbmFnZWRVc2VySWQsXG4gICAgICAgIHN0YXR1c0ZpbHRlcjogXCJcIixcbiAgICAgICAgZ2FzdG9UeXBlRmlsdGVyOiBcIlwiLFxuICAgICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyOiBcImFsbFwiLFxuICAgICAgfTtcblxuICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwiYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuOnN0YXJ0XCIsIHtcbiAgICAgICAgdGlja2V0RmlsZUlkLFxuICAgICAgICB0aWNrZXREYXRlVmFsdWUsXG4gICAgICAgIHRpY2tldERhdGUsXG4gICAgICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICAgICAgY3JlYXRlZFRpY2tldE1hbmFnZWRVc2VySWQsXG4gICAgICAgIHJlc29sdmVkTWFuYWdlZFVzZXJJZCxcbiAgICAgICAgcXVlcnlTbmFwc2hvdCxcbiAgICAgIH0pO1xuXG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMocXVlcnlTbmFwc2hvdCk7XG4gICAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IHRpY2tldEZpbGVJZDtcbiAgICAgIGNsZWFyTGlzdENhY2hlKCk7XG4gICAgICByZXNldExpc3QoXCJjcmVhdGVkLXRpY2tldC1yZXR1cm5cIik7XG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJhcHBseUNyZWF0ZWRUaWNrZXRSZXR1cm46bG9hZExpc3RcIiwge1xuICAgICAgICBwYWdlOiAxLFxuICAgICAgICBxdWVyeVNuYXBzaG90LFxuICAgICAgfSk7XG4gICAgICB2b2lkIGxvYWRMaXN0KDEsIHF1ZXJ5U25hcHNob3QpO1xuXG4gICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgIHVybC5zZWFyY2hQYXJhbXMuZGVsZXRlKFwidGlja2V0RmlsZUlkXCIpO1xuICAgICAgdXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoXCJ0aWNrZXREYXRlXCIpO1xuICAgICAgY29uc3QgY2xlYW5lZFF1ZXJ5ID0gdXJsLnNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xuICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBcIlwiLCBjbGVhbmVkUXVlcnkgPyBgJHt1cmwucGF0aG5hbWV9PyR7Y2xlYW5lZFF1ZXJ5fWAgOiB1cmwucGF0aG5hbWUpO1xuICAgIH0sXG4gICAgW1xuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSxcbiAgICAgIGNsZWFyTGlzdENhY2hlLFxuICAgICAgY3VycmVudEF4VXNlcklkLFxuICAgICAgbG9hZExpc3QsXG4gICAgICByZXNldExpc3QsXG4gICAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMsXG4gICAgICBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24sXG4gICAgXVxuICApO1xuXG4gIGNvbnN0IHJlc3RvcmVMaW5rTW9kZVJldHVyblN0YXRlID0gdXNlQ2FsbGJhY2soXG4gICAgKGNhY2hlZFN0YXRlOiBFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlKSA9PiB7XG4gICAgICBjb25zdCByZXN0b3JlZE1hbmFnZWRVc2VySWQgPSBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24oY2FjaGVkU3RhdGUuZmlsdGVycy5tYW5hZ2VkVXNlcklkKTtcbiAgICAgIGNvbnN0IHJlc3RvcmVkRmlsdGVycyA9IHtcbiAgICAgICAgLi4uY2FjaGVkU3RhdGUuZmlsdGVycyxcbiAgICAgICAgbWFuYWdlZFVzZXJJZDogcmVzdG9yZWRNYW5hZ2VkVXNlcklkLFxuICAgICAgfTtcblxuICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzKHJlc3RvcmVkRmlsdGVycyk7XG4gICAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gY2FjaGVkU3RhdGUuc2Nyb2xsWTtcbiAgICAgIHBlbmRpbmdGb2N1c0ZpbGVJZFJlZi5jdXJyZW50ID0gY2FjaGVkU3RhdGUuZm9jdXNGaWxlSWQ7XG4gICAgICByZXN0b3JlTGlua1RpY2tldFNlbGVjdGlvbih7XG4gICAgICAgIHNlbGVjdGlvbk1vZGU6IGNhY2hlZFN0YXRlLnNlbGVjdGlvbk1vZGUsXG4gICAgICAgIHNlbGVjdGVkVGlja2V0czogY2FjaGVkU3RhdGUuc2VsZWN0ZWRUaWNrZXRzLFxuICAgICAgICBleGNsdWRlZElkczogY2FjaGVkU3RhdGUuZXhjbHVkZWRJZHMsXG4gICAgICAgIGZpbHRlcmVkU25hcHNob3Q6IGNhY2hlZFN0YXRlLmZpbHRlcmVkU2VsZWN0aW9uRmlsdGVycyxcbiAgICAgICAgZmlsdGVyZWRUb3RhbENvdW50OiBjYWNoZWRTdGF0ZS5maWx0ZXJlZFNlbGVjdGlvblRvdGFsLFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChjYWNoZWRTdGF0ZS5pdGVtcy5sZW5ndGggPiAwIHx8IGNhY2hlZFN0YXRlLnRvdGFsID4gMCkge1xuICAgICAgICByZXN0b3JlTGlzdFNuYXBzaG90KHtcbiAgICAgICAgICBpdGVtczogY2FjaGVkU3RhdGUuaXRlbXMsXG4gICAgICAgICAgdG90YWw6IGNhY2hlZFN0YXRlLnRvdGFsLFxuICAgICAgICAgIHBhZ2U6IGNhY2hlZFN0YXRlLnBhZ2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBydW5BdXRvbWF0aWNMaXN0TG9hZChjYWNoZWRTdGF0ZS5wYWdlLCBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZChyZXN0b3JlZEZpbHRlcnMpLCB7XG4gICAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXG4gICAgICAgIHdhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHk6IHRydWUsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtcbiAgICAgIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkLFxuICAgICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxuICAgICAgcmVzdG9yZUxpbmtUaWNrZXRTZWxlY3Rpb24sXG4gICAgICByZXN0b3JlTGlzdFNuYXBzaG90LFxuICAgICAgcnVuQXV0b21hdGljTGlzdExvYWQsXG4gICAgICBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb24sXG4gICAgXVxuICApO1xuXG4gIGNvbnN0IHJlc3RvcmVJbml0aWFsTGlua01vZGVTdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBsaW5rU25hcHNob3QgPSBidWlsZEluaXRpYWxMaW5rTW9kZVNuYXBzaG90KCk7XG4gICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xuICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbigpO1xuICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xuICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhsaW5rU25hcHNob3QpO1xuICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkKDEsIG5vcm1hbGl6ZUxpbmtNb2RlU25hcHNob3RGb3JMb2FkKGxpbmtTbmFwc2hvdCksIHtcbiAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXG4gICAgICByZXNldEJlZm9yZUxvYWQ6IHRydWUsXG4gICAgICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiB0cnVlLFxuICAgIH0pO1xuICB9LCBbXG4gICAgYnVpbGRJbml0aWFsTGlua01vZGVTbmFwc2hvdCxcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxuICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSxcbiAgICBjbGVhckxpbmtUaWNrZXRTZWxlY3Rpb24sXG4gICAgbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQsXG4gICAgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzLFxuICAgIHJ1bkF1dG9tYXRpY0xpc3RMb2FkLFxuICBdKTtcblxuICBjb25zdCByZXN0b3JlU3RhbmRhcmRSZXR1cm5TdGF0ZSA9IHVzZUNhbGxiYWNrKFxuICAgIChjYWNoZWRTdGF0ZTogRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSkgPT4ge1xuICAgICAgY29uc3QgcmVzdG9yZWRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGNhY2hlZFN0YXRlLmZpbHRlcnMubWFuYWdlZFVzZXJJZCk7XG4gICAgICBjb25zdCByZXN0b3JlZEZpbHRlcnMgPSB7XG4gICAgICAgIC4uLmNhY2hlZFN0YXRlLmZpbHRlcnMsXG4gICAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCxcbiAgICAgIH07XG5cbiAgICAgIHJlc3RvcmVBcHBsaWVkRmlsdGVycyhyZXN0b3JlZEZpbHRlcnMpO1xuICAgICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLnNjcm9sbFk7XG4gICAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IGNhY2hlZFN0YXRlLmZvY3VzRmlsZUlkO1xuXG4gICAgICBpZiAoY2FjaGVkU3RhdGUuaXRlbXMubGVuZ3RoID4gMCB8fCBjYWNoZWRTdGF0ZS50b3RhbCA+IDApIHtcbiAgICAgICAgcmVzdG9yZUxpc3RTbmFwc2hvdCh7XG4gICAgICAgICAgaXRlbXM6IGNhY2hlZFN0YXRlLml0ZW1zLFxuICAgICAgICAgIHRvdGFsOiBjYWNoZWRTdGF0ZS50b3RhbCxcbiAgICAgICAgICBwYWdlOiBjYWNoZWRTdGF0ZS5wYWdlLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcnVuQXV0b21hdGljTGlzdExvYWQoY2FjaGVkU3RhdGUucGFnZSwgcmVzdG9yZWRGaWx0ZXJzLCB7XG4gICAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtyZXN0b3JlQXBwbGllZEZpbHRlcnMsIHJlc3RvcmVMaXN0U25hcHNob3QsIHJ1bkF1dG9tYXRpY0xpc3RMb2FkLCBzeW5jTWFuYWdlZFVzZXJTZWxlY3Rpb25dXG4gICk7XG5cbiAgLy8gS2VlcHMgZGVsZXRlIHJldHVybiBleHBsaWNpdDogYmxhbmsgZmlsdGVycywgb3BlbiBwYW5lbCwgYW5kIG5vIGF1dG9tYXRpYyByZWxvYWQuXG4gIGNvbnN0IHJlc3RvcmVEZWxldGVSZXR1cm5TdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKCk7XG4gICAgcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudCA9IG51bGw7XG4gICAgcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQgPSBcIlwiO1xuICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbigpO1xuICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xuICAgIG9uQ2xlYXIoKTtcbiAgfSwgW2NsZWFyQ2FjaGVkU3RhdGUsIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSwgY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uLCBvbkNsZWFyXSk7XG5cbiAgY29uc3QgdG9nZ2xlVGlja2V0U2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soXG4gICAgKHRpY2tldDogRXhwZW5zZVRpY2tldExpc3RQYWdlSXRlbSkgPT4ge1xuICAgICAgaWYgKCFpc0xpbmtNb2RlIHx8ICFjYW5Qcm9jZXNzTGlua01vZGUgfHwgbGlua1NoZWV0Q2hlY2tCdXN5IHx8IGxpbmtTaGVldExvY2tlZCB8fCBsaW5rRmxvd0J1c3kpIHJldHVybjtcbiAgICAgIGlmICh0aWNrZXQua2luZCAhPT0gXCJsaW5rXCIpIHJldHVybjtcblxuICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQodGlja2V0LmZpbGVJZCk7XG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xuICAgICAgaWYgKCFjYW5TZWxlY3RUaWNrZXRGb3JMaW5rKHRpY2tldCkpIHJldHVybjtcblxuICAgICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XG4gICAgICB0b2dnbGVMaW5rVGlja2V0U2VsZWN0aW9uKHRpY2tldCk7XG4gICAgfSxcbiAgICBbY2FuUHJvY2Vzc0xpbmtNb2RlLCBpc0xpbmtNb2RlLCBsaW5rRmxvd0J1c3ksIGxpbmtTaGVldENoZWNrQnVzeSwgbGlua1NoZWV0TG9ja2VkLCB0b2dnbGVMaW5rVGlja2V0U2VsZWN0aW9uXVxuICApO1xuXG4gIGNvbnN0IGNsZWFyVGlja2V0U2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFNlbGVjdEFsbEVycm9yKFwiXCIpO1xuICAgIHNldExpbmtCdWxrUmVzdWx0KG51bGwpO1xuICAgIGNsZWFyTGlua1RpY2tldFNlbGVjdGlvbigpO1xuICB9LCBbY2xlYXJMaW5rVGlja2V0U2VsZWN0aW9uXSk7XG5cbiAgY29uc3QgcmVzb2x2ZUFjdGl2ZUZpbHRlcnMgPSB1c2VDYWxsYmFjaygoKTogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCA9PiB7XG4gICAgY29uc3QgYmFzZVNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnMgfHwgY3VycmVudEZpbHRlcnM7XG4gICAgY29uc3QgcmVzb2x2ZWRNYW5hZ2VkVXNlcklkID0gc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uKGJhc2VTbmFwc2hvdC5tYW5hZ2VkVXNlcklkKTtcbiAgICByZXR1cm4gbm9ybWFsaXplTGlua01vZGVTbmFwc2hvdEZvckxvYWQoe1xuICAgICAgLi4uYmFzZVNuYXBzaG90LFxuICAgICAgbWFuYWdlZFVzZXJJZDogcmVzb2x2ZWRNYW5hZ2VkVXNlcklkLFxuICAgIH0pO1xuICB9LCBbYXBwbGllZEZpbHRlcnMsIGN1cnJlbnRGaWx0ZXJzLCBub3JtYWxpemVMaW5rTW9kZVNuYXBzaG90Rm9yTG9hZCwgc3luY01hbmFnZWRVc2VyU2VsZWN0aW9uXSk7XG5cbiAgLy8gQWN0aXZhdGVzIGJhY2tlbmQtZHJpdmVuIGZpbHRlcmVkIHNlbGVjdGlvbiBmb3IgdGhlIGN1cnJlbnQgZmlsdGVyIHNuYXBzaG90LlxuICBjb25zdCBzZWxlY3RBbGxNYXRjaGluZ1RpY2tldHMgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFpc0xpbmtNb2RlIHx8ICFjYW5Qcm9jZXNzTGlua01vZGUgfHwgbGlua1NoZWV0Q2hlY2tCdXN5IHx8IGxpbmtTaGVldExvY2tlZCB8fCBsaW5rRmxvd0J1c3kgfHwgc2VsZWN0QWxsQnVzeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldFNlbGVjdEFsbEJ1c3kodHJ1ZSk7XG4gICAgc2V0U2VsZWN0QWxsRXJyb3IoXCJcIik7XG4gICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgYWN0aXZlRmlsdGVycyA9IHJlc29sdmVBY3RpdmVGaWx0ZXJzKCk7XG4gICAgICBzZWxlY3RBbGxCeUZpbHRlcnMoYWN0aXZlRmlsdGVycywgdG90YWwpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiVGlja2V0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXRzLlwiKTtcbiAgICAgIHNldFNlbGVjdEFsbEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRTZWxlY3RBbGxCdXN5KGZhbHNlKTtcbiAgICB9XG4gIH0sIFtcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIGlzTGlua01vZGUsXG4gICAgbGlua0Zsb3dCdXN5LFxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcbiAgICBsaW5rU2hlZXRMb2NrZWQsXG4gICAgcmVzb2x2ZUFjdGl2ZUZpbHRlcnMsXG4gICAgc2VsZWN0QWxsQnlGaWx0ZXJzLFxuICAgIHNlbGVjdEFsbEJ1c3ksXG4gICAgdG90YWwsXG4gIF0pO1xuXG4gIC8vIEtlZXBzIHNlbGVjdGVkIGNhcmQgbWV0YWRhdGEgZnJlc2ggd2l0aCB0aGUgbGF0ZXN0IGxpc3QgcGF5bG9hZC5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzTGlua01vZGUgfHwgaXRlbXMubGVuZ3RoIDwgMSkgcmV0dXJuO1xuICAgIGh5ZHJhdGVWaXNpYmxlVGlja2V0cyhpdGVtcy5maWx0ZXIoKGl0ZW0pOiBpdGVtIGlzIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCA9PiBpdGVtLmtpbmQgPT09IFwibGlua1wiKSk7XG4gIH0sIFtoeWRyYXRlVmlzaWJsZVRpY2tldHMsIGlzTGlua01vZGUsIGl0ZW1zXSk7XG5cbiAgY29uc3QgcnVuVGlja2V0TGlua0Zsb3cgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFpc0xpbmtNb2RlIHx8ICFsaW5rU2hlZXRJZCB8fCBsaW5rRmxvd0J1c3kpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGxpbmtTaGVldExvY2tlZCB8fCAhY2FuUHJvY2Vzc0xpbmtNb2RlKSB7XG4gICAgICBjb25zdCBibG9ja2VkTWVzc2FnZSA9XG4gICAgICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlIHx8XG4gICAgICAgIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9SZWFkT25seUJ5U3RhdHVzXCIsIFwiTm8gc2UgcHVlZGUgZWRpdGFyIGVzdGEgaG9qYSBkZSBnYXN0b3MgZW4gZWwgZXN0YWRvIGFjdHVhbC5cIik7XG4gICAgICBzZXRMaW5rRmxvd0Vycm9yKGJsb2NrZWRNZXNzYWdlKTtcbiAgICAgIHNldExpbmtGbG93U3RhdHVzKGJsb2NrZWRNZXNzYWdlKTtcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RlZENvdW50ID0gcmVzb2x2ZVNlbGVjdGVkQ291bnQodG90YWwpO1xuICAgIGlmIChzZWxlY3RlZENvdW50IDwgMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2ZUZpbHRlcnMgPSByZXNvbHZlQWN0aXZlRmlsdGVycygpO1xuICAgIGNvbnN0IHJlcXVlc3RBeFVzZXJJZCA9IHNhZmVUZXh0KGFjdGl2ZUZpbHRlcnMubWFuYWdlZFVzZXJJZCB8fCBjdXJyZW50QXhVc2VySWQpO1xuXG4gICAgc2V0TGlua0Zsb3dCdXN5KHRydWUpO1xuICAgIHNldExpbmtGbG93RXJyb3IoXCJcIik7XG4gICAgc2V0TGlua0J1bGtSZXN1bHQobnVsbCk7XG4gICAgc2V0TGlua0Zsb3dTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19MaW5raW5nTGluZVwiLCBcIkxpbmtpbmcgZXhwZW5zZSBsaW5lLi4uXCIpKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGxpbmtFeHBlbnNlU2hlZXRUaWNrZXRzQnVsayhcbiAgICAgICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZVxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgICBleHBlbnNlU2hlZXRJZDogbGlua1NoZWV0SWQsXG4gICAgICAgICAgICAgIHNlbGVjdGlvbk1vZGU6IFwiZmlsdGVyZWRcIixcbiAgICAgICAgICAgICAgZmlsdGVyczogYnVpbGRFeHBlbnNlVGlja2V0TGlua0J1bGtGaWx0ZXJzKGZpbHRlcmVkU25hcHNob3QgfHwgYWN0aXZlRmlsdGVycyksXG4gICAgICAgICAgICAgIGV4Y2x1ZGVkSWRzLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIDoge1xuICAgICAgICAgICAgICBleHBlbnNlU2hlZXRJZDogbGlua1NoZWV0SWQsXG4gICAgICAgICAgICAgIHNlbGVjdGlvbk1vZGU6IFwic2VsZWN0ZWRcIixcbiAgICAgICAgICAgICAgdGlja2V0SWRzOiBzZWxlY3RlZFRpY2tldHMubWFwKChpdGVtKSA9PiBzYWZlVGV4dChpdGVtLmZpbGVJZCkpLmZpbHRlcihCb29sZWFuKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICBheFVzZXJJZE92ZXJyaWRlOiByZXF1ZXN0QXhVc2VySWQgfHwgdW5kZWZpbmVkLFxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuRGF0YSB8fCBudWxsO1xuICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgY29uc3QgZmFpbHVyZU1lc3NhZ2UgPSByZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcbiAgICAgICAgc2V0TGlua0Zsb3dFcnJvcihmYWlsdXJlTWVzc2FnZSk7XG4gICAgICAgIHNldExpbmtGbG93U3RhdHVzKGZhaWx1cmVNZXNzYWdlKTtcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHNldExpbmtCdWxrUmVzdWx0KHJlc3VsdCk7XG5cbiAgICAgIGlmIChyZXN1bHQubGlua2VkQ291bnQgPiAwKSB7XG4gICAgICAgIGNsZWFyVGlja2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICAgICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKCk7XG4gICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoKTtcbiAgICAgICAgY29uc3Qgc3VjY2Vzc01hcmsgPSByZXN1bHQuZmFpbGVkQ291bnQgPiAwIHx8IHJlc3VsdC5za2lwcGVkQ291bnQgPiAwID8gXCJ3YXJuaW5nUHJvY2Vzc1wiIDogXCJva1Byb2Nlc3NcIjtcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKHN1Y2Nlc3NNYXJrLCBzdWNjZXNzTWFyayA9PT0gXCJva1Byb2Nlc3NcIiA/IDEyMDAgOiAxNTAwKTtcbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwobGlua1NoZWV0SWQpLCB7XG4gICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICAgICAgICBieXBhc3NHdWFyZE9uY2U6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgbG9hZExpc3QoY3VycmVudFBhZ2UgPCAxID8gMSA6IGN1cnJlbnRQYWdlLCBhY3RpdmVGaWx0ZXJzKTtcblxuICAgICAgaWYgKHJlc3VsdC5mYWlsZWRDb3VudCA+IDAgJiYgcmVzdWx0LmxpbmtlZENvdW50IDwgMSkge1xuICAgICAgICBjb25zdCBmYWlsdXJlTWVzc2FnZSA9IHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpO1xuICAgICAgICBzZXRMaW5rRmxvd1N0YXR1cyhmYWlsdXJlTWVzc2FnZSk7XG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN1bHQuZmFpbGVkQ291bnQgPiAwIHx8IHJlc3VsdC5za2lwcGVkQ291bnQgPiAwKSB7XG4gICAgICAgIHNldExpbmtGbG93U3RhdHVzKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpKTtcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwid2FybmluZ1Byb2Nlc3NcIiwgMTUwMCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBzZXRMaW5rRmxvd1N0YXR1cyhyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKSk7XG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgMTIwMCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgZmFpbHVyZU1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcbiAgICAgIHNldExpbmtGbG93RXJyb3IoZmFpbHVyZU1lc3NhZ2UpO1xuICAgICAgc2V0TGlua0Zsb3dTdGF0dXMoZmFpbHVyZU1lc3NhZ2UpO1xuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMaW5rRmxvd0J1c3koZmFsc2UpO1xuICAgIH1cbiAgfSwgW1xuICAgIGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsLFxuICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxuICAgIGNsZWFyVGlja2V0U2VsZWN0aW9uLFxuICAgIGN1cnJlbnRQYWdlLFxuICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICBleGNsdWRlZElkcyxcbiAgICBmaWx0ZXJlZFNuYXBzaG90LFxuICAgIGlzTGlua01vZGUsXG4gICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSxcbiAgICBsaW5rRmxvd0J1c3ksXG4gICAgbGlua1NoZWV0SWQsXG4gICAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UsXG4gICAgbGlua1NoZWV0TG9ja2VkLFxuICAgIGxvYWRMaXN0LFxuICAgIHJlc29sdmVBY3RpdmVGaWx0ZXJzLFxuICAgIHJlc29sdmVTZWxlY3RlZENvdW50LFxuICAgIHNlbGVjdGVkVGlja2V0cyxcbiAgICB0b3RhbCxcbiAgXSk7XG5cbiAgY29uc3Qgb3BlbkxpbmtDb25maXJtTW9kYWwgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFpc0xpbmtNb2RlIHx8IHNlbGVjdGVkVGlja2V0Q291bnQgPCAxIHx8IGxpbmtGbG93QnVzeSB8fCBsaW5rU2hlZXRDaGVja0J1c3kgfHwgbGlua1NoZWV0TG9ja2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0TGlua0Zsb3dFcnJvcihcIlwiKTtcbiAgICBzZXRMaW5rRmxvd1N0YXR1cyhcIlwiKTtcbiAgICBvcGVuQ29uZmlybSh7XG4gICAgICB0aXRsZTogaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0xpbmtCdXR0b25cIiwgXCJWaW5jdWxhciB0aWNrZXQocylcIiksXG4gICAgICBtZXNzYWdlOiBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlXG4gICAgICAgID8gYCR7aW5kVChcIk5hdl9FeHBlbnNlVGlja2V0c1wiLCBcIlRpY2tldHNcIil9OiAke3NlbGVjdGVkVGlja2V0Q291bnR9YFxuICAgICAgICA6IGAke2luZFQoXCJOYXZfRXhwZW5zZVRpY2tldHNcIiwgXCJUaWNrZXRzXCIpfTogJHtzZWxlY3RlZFRpY2tldENvdW50fVxcbiR7aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVG90YWxBbW91bnRcIiwgXCJUb3RhbCBhbW91bnRcIil9OiAke3NlbGVjdGVkVG90YWxBbW91bnRUZXh0fWAsXG4gICAgICBjb25maXJtVGV4dDogaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0xpbmtCdXR0b25cIiwgXCJWaW5jdWxhciB0aWNrZXQocylcIiksXG4gICAgICBjYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKSxcbiAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xuICAgICAgICByZXR1cm4gcnVuVGlja2V0TGlua0Zsb3coKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sIFtcbiAgICBpc0xpbmtNb2RlLFxuICAgIHNlbGVjdGVkVGlja2V0Q291bnQsXG4gICAgbGlua0Zsb3dCdXN5LFxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcbiAgICBsaW5rU2hlZXRMb2NrZWQsXG4gICAgaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBzZWxlY3RlZFRvdGFsQW1vdW50VGV4dCxcbiAgICBydW5UaWNrZXRMaW5rRmxvdyxcbiAgXSk7XG5cbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIHNldExpbmtGbG93RXJyb3IoXCJcIik7XG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XG4gICAgICBidXN5OiBsaW5rRmxvd0J1c3ksXG4gICAgICBvbkVycm9yOiAobWVzc2FnZSkgPT4ge1xuICAgICAgICBzZXRMaW5rRmxvd0Vycm9yKG1lc3NhZ2UpO1xuICAgICAgICBzZXRMaW5rRmxvd1N0YXR1cyhtZXNzYWdlKTtcbiAgICAgIH0sXG4gICAgICBkZWZhdWx0RXJyb3JNZXNzYWdlOiBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIiksXG4gICAgfSk7XG4gIH0sIFtoYW5kbGVDb25maXJtLCBsaW5rRmxvd0J1c3ldKTtcblxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGxpbmtGbG93QnVzeVxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxuICAgIDogIWxpbmtGbG93QnVzeSAmJiBsaW5rRmxvd0Vycm9yXG4gICAgICA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKVxuICAgICAgOiBtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKTtcblxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFsaW5rRmxvd0J1c3kgJiYgbGlua0Zsb3dFcnJvcikge1xuICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZvaWQgaGFuZGxlTW9kYWxDb25maXJtKCk7XG4gIH0sIFtjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbGlua0Zsb3dCdXN5LCBsaW5rRmxvd0Vycm9yXSk7XG5cbiAgY29uc3Qgb3BlblRpY2tldERldGFpbCA9IHVzZUNhbGxiYWNrKFxuICAgIChyYXdGaWxlSWQ6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQocmF3RmlsZUlkKTtcbiAgICAgIGlmICghZmlsZUlkKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gYXBwbGllZEZpbHRlcnMgfHwgY3VycmVudEZpbHRlcnM7XG4gICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSB7XG4gICAgICAgIGZpbHRlcnM6IHNuYXBzaG90LFxuICAgICAgICBwYWdlOiBjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsXG4gICAgICAgIHNjcm9sbFk6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuc2Nyb2xsWSB8fCAwIDogMCxcbiAgICAgICAgZm9jdXNGaWxlSWQ6IGZpbGVJZCxcbiAgICAgICAgaXRlbXMsXG4gICAgICAgIHRvdGFsLFxuICAgICAgICBzZWxlY3RlZFRpY2tldHMsXG4gICAgICAgIGxpbmtNb2RlU2hlZXRJZDogaXNMaW5rTW9kZSA/IGxpbmtTaGVldElkIDogXCJcIixcbiAgICAgICAgc2VsZWN0aW9uTW9kZSxcbiAgICAgICAgZXhjbHVkZWRJZHMsXG4gICAgICAgIGZpbHRlcmVkU2VsZWN0aW9uRmlsdGVyczogZmlsdGVyZWRTbmFwc2hvdCxcbiAgICAgICAgZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbDogZmlsdGVyZWRUb3RhbENvdW50LFxuICAgICAgfTtcblxuICAgICAgaWYgKGlzTGlua01vZGUpIHtcbiAgICAgICAgc2F2ZUNhY2hlZFN0YXRlKGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgIHNhdmVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKHtcbiAgICAgICAgICBzaGVldElkOiBsaW5rU2hlZXRJZCxcbiAgICAgICAgICBwYWdlOiBjdXJyZW50U3RhdGUucGFnZSxcbiAgICAgICAgICBzY3JvbGxZOiBjdXJyZW50U3RhdGUuc2Nyb2xsWSxcbiAgICAgICAgICBmb2N1c0ZpbGVJZDogZmlsZUlkLFxuICAgICAgICAgIGZpbHRlcnM6IHNuYXBzaG90LFxuICAgICAgICAgIHNlbGVjdGlvbk1vZGUsXG4gICAgICAgICAgc2VsZWN0ZWRUaWNrZXRzLFxuICAgICAgICAgIGV4Y2x1ZGVkSWRzLFxuICAgICAgICAgIGZpbHRlcmVkU2VsZWN0aW9uRmlsdGVyczogZmlsdGVyZWRTbmFwc2hvdCxcbiAgICAgICAgICBmaWx0ZXJlZFNlbGVjdGlvblRvdGFsOiBmaWx0ZXJlZFRvdGFsQ291bnQsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgICAgICAgIGZpbGVJZCxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChoYXNTaGVldENhbGxlckNvbnRleHQgJiYgc2hlZXRDYWxsZXJPcmlnaW4pIHtcbiAgICAgICAgICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoe1xuICAgICAgICAgICAgZmlsZUlkLFxuICAgICAgICAgICAgc2hlZXRJZDogbGlua1NoZWV0SWQsXG4gICAgICAgICAgICBvcmlnaW46IHNoZWV0Q2FsbGVyT3JpZ2luLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHF1ZXJ5LnNldChcIm9yaWdpblwiLCBzaGVldENhbGxlck9yaWdpbik7XG4gICAgICAgICAgcXVlcnkuc2V0KFwic2hlZXRJZFwiLCBsaW5rU2hlZXRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XG4gICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICAgICAgICBieXBhc3NHdWFyZE9uY2U6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNhdmVDYWNoZWRTdGF0ZShjdXJyZW50U3RhdGUpO1xuICAgICAgaWYgKGhhc1NoZWV0Q2FsbGVyQ29udGV4dCAmJiBzaGVldENhbGxlck9yaWdpbikge1xuICAgICAgICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoe1xuICAgICAgICAgIGZpbGVJZCxcbiAgICAgICAgICBzaGVldElkOiBsaW5rU2hlZXRJZCxcbiAgICAgICAgICBvcmlnaW46IHNoZWV0Q2FsbGVyT3JpZ2luLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgICAgICBmaWxlSWQsXG4gICAgICAgICAgb3JpZ2luOiBzaGVldENhbGxlck9yaWdpbixcbiAgICAgICAgICBzaGVldElkOiBsaW5rU2hlZXRJZCxcbiAgICAgICAgfSk7XG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xuICAgICAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcbiAgICAgICAgICBieXBhc3NHdWFyZE9uY2U6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjbGVhckV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KCk7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/ZmlsZUlkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGZpbGVJZCl9YCwge1xuICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXG4gICAgICAgIGJ5cGFzc0d1YXJkT25jZTogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtcbiAgICAgIGFwcGxpZWRGaWx0ZXJzLFxuICAgICAgY3VycmVudFBhZ2UsXG4gICAgICBjdXJyZW50RmlsdGVycyxcbiAgICAgIGhhc1NoZWV0Q2FsbGVyQ29udGV4dCxcbiAgICAgIGxpbmtTaGVldElkLFxuICAgICAgaXNMaW5rTW9kZSxcbiAgICAgIGl0ZW1zLFxuICAgICAgZmlsdGVyZWRUb3RhbENvdW50LFxuICAgICAgZmlsdGVyZWRTbmFwc2hvdCxcbiAgICAgIGV4Y2x1ZGVkSWRzLFxuICAgICAgc2hlZXRDYWxsZXJPcmlnaW4sXG4gICAgICBzYXZlQ2FjaGVkU3RhdGUsXG4gICAgICBzYXZlRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSxcbiAgICAgIHNlbGVjdGVkVGlja2V0cyxcbiAgICAgIHNlbGVjdGlvbk1vZGUsXG4gICAgICB0b3RhbCxcbiAgICBdXG4gICk7XG5cbiAgY29uc3QgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgPSB1c2VDYWxsYmFjaygodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcbiAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBjYXJkID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XG4gICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIXRpbWVsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY2FyZDtcbiAgfSwgW10pO1xuXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoe1xuICAgIGNvbnRhaW5lclJlZjogdGltZWxpbmVDb250YWluZXJSZWYsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGl0ZW1zLFxuICAgIHJlc29sdmVDbGlja2FibGVDYXJkLFxuICB9KTtcblxuICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKCh0b3RhbCB8fCAwKSAvIFBBR0VfU0laRSk7XG4gIGNvbnN0IHNob3dMaXN0TG9hZGluZyA9IGlzTG9hZGluZztcbiAgY29uc3QgbGlua01vZGVTZWxlY3Rpb25CdXR0b25zRGlzYWJsZWQgPSBsaW5rRmxvd0J1c3kgfHwgc2VsZWN0QWxsQnVzeSB8fCBpc0xvYWRpbmc7XG5cbiAgY29uc3Qgc3VtbWFyeUl0ZW1zID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3Qgc25hcHNob3QgPSBhcHBsaWVkRmlsdGVycztcbiAgICBpZiAoIXNuYXBzaG90KSByZXR1cm4gW10gYXMgQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9PjtcblxuICAgIGNvbnN0IHN1bW1hcnk6IEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfT4gPSBbXTtcbiAgICBjb25zdCBsb2NhbGUgPSBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIjtcbiAgICBjb25zdCBmcm9tRGF0ZVRleHQgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoc25hcHNob3QuZnJvbURhdGUsIGxvY2FsZSwgXCJcIik7XG4gICAgY29uc3QgdG9EYXRlVGV4dCA9IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShzbmFwc2hvdC50b0RhdGUsIGxvY2FsZSwgXCJcIik7XG5cbiAgICBpZiAoZnJvbURhdGVUZXh0IHx8IHRvRGF0ZVRleHQpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJmcm9tRGF0ZVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIiksXG4gICAgICAgIHZhbHVlOiBmcm9tRGF0ZVRleHQgfHwgXCItLVwiLFxuICAgICAgfSk7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwidG9EYXRlXCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiSGlzdG9yeV9Ub1wiLCBcIlRvXCIpLFxuICAgICAgICB2YWx1ZTogdG9EYXRlVGV4dCB8fCBcIi0tXCIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc25hcHNob3QuZmlsdGVyS2V5LnRyaW0oKSkge1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcImZpbHRlcktleVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0ZpbHRlcktleVwiLCBcIlRpY2tldFwiKSxcbiAgICAgICAgdmFsdWU6IHNuYXBzaG90LmZpbHRlcktleS50cmltKCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc25hcHNob3QuY3VycmVuY3lDb2RlLnRyaW0oKSkge1xuICAgICAgc3VtbWFyeS5wdXNoKHtcbiAgICAgICAga2V5OiBcImN1cnJlbmN5XCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKSxcbiAgICAgICAgdmFsdWU6IHNuYXBzaG90LmN1cnJlbmN5Q29kZS50cmltKCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc25hcHNob3Quc3RhdHVzRmlsdGVyICE9PSBcIlwiKSB7XG4gICAgICBzdW1tYXJ5LnB1c2goe1xuICAgICAgICBrZXk6IFwic3RhdHVzXCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzXCIsIFwiU3RhdHVzXCIpLFxuICAgICAgICB2YWx1ZTogZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsKHNuYXBzaG90LnN0YXR1c0ZpbHRlciksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc25hcHNob3QuZ2FzdG9UeXBlRmlsdGVyICE9PSBcIlwiKSB7XG4gICAgICBjb25zdCBjYXRlZ29yeUxhYmVsID0gZ2FzdG9UeXBlTGFiZWxNYXAuZ2V0KFN0cmluZyhzbmFwc2hvdC5nYXN0b1R5cGVGaWx0ZXIpKSB8fCBTdHJpbmcoc25hcHNob3QuZ2FzdG9UeXBlRmlsdGVyKTtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJjYXRlZ29yeVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIiksXG4gICAgICAgIHZhbHVlOiBjYXRlZ29yeUxhYmVsLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNuYXBzaG90LnByb2Nlc3NlZEJ5SWFGaWx0ZXIgIT09IFwiYWxsXCIpIHtcbiAgICAgIHN1bW1hcnkucHVzaCh7XG4gICAgICAgIGtleTogXCJwcm9jZXNzZWRcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBXCIsIFwiUHJvY2Vzc2VkIGJ5IElBXCIpLFxuICAgICAgICB2YWx1ZTpcbiAgICAgICAgICBzbmFwc2hvdC5wcm9jZXNzZWRCeUlhRmlsdGVyID09PSBcInllc1wiXG4gICAgICAgICAgICA/IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBX1llc1wiLCBcIlllc1wiKVxuICAgICAgICAgICAgOiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9Ob1wiLCBcIk5vXCIpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1bW1hcnk7XG4gIH0sIFthcHBsaWVkRmlsdGVycywgZ2FzdG9UeXBlTGFiZWxNYXBdKTtcblxuICBjb25zdCBzaG93U3VtbWFyeSA9ICFpc0xpbmtNb2RlICYmICFzaG93RmlsdGVycyAmJiBzdW1tYXJ5SXRlbXMubGVuZ3RoID4gMDtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNMaW5rTW9kZSkgcmV0dXJuO1xuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoe1xuICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgbWVzc2FnZTogbGlua01vZGVDYW5jZWxNZXNzYWdlLFxuICAgIH0pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcbiAgICB9O1xuICB9LCBbaXNMaW5rTW9kZSwgbGlua01vZGVDYW5jZWxNZXNzYWdlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6ZW50ZXJcIiwge1xuICAgICAgdXJsOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LmxvY2F0aW9uLmhyZWYgOiBcIlwiLFxuICAgICAgZGlkUmVzdG9yZU9uTW91bnQ6IGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQsXG4gICAgICBoYXNBY2Nlc3MsXG4gICAgICBpc0xpbmtNb2RlLFxuICAgICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxuICAgIH0pO1xuICAgIGlmIChkaWRSZXN0b3JlT25Nb3VudFJlZi5jdXJyZW50KSB7XG4gICAgICBsb2dFeHBlbnNlVGlja2V0c1dhcm4oXCJtb3VudFJlc3RvcmVFZmZlY3Q6c2tpcC1hbHJlYWR5LXJlc3RvcmVkXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWhhc0FjY2Vzcykge1xuICAgICAgbG9nRXhwZW5zZVRpY2tldHNXYXJuKFwibW91bnRSZXN0b3JlRWZmZWN0OnNraXAtbm8tYWNjZXNzXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghaXNMaW5rTW9kZSkge1xuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICBjb25zdCB0aWNrZXRGaWxlSWQgPSBzYWZlVGV4dCh1cmwuc2VhcmNoUGFyYW1zLmdldChcInRpY2tldEZpbGVJZFwiKSk7XG4gICAgICBpZiAodGlja2V0RmlsZUlkKSB7XG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDp0aWNrZXQtY3JlYXRlLXJldHVybi1kZXRlY3RlZFwiLCB7XG4gICAgICAgICAgdGlja2V0RmlsZUlkLFxuICAgICAgICAgIHRpY2tldERhdGU6IHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwidGlja2V0RGF0ZVwiKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGRpZFJlc3RvcmVPbk1vdW50UmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICBhcHBseUNyZWF0ZWRUaWNrZXRSZXR1cm4odGlja2V0RmlsZUlkLCB1cmwuc2VhcmNoUGFyYW1zLmdldChcInRpY2tldERhdGVcIikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkpIHtcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzV2FybihcIm1vdW50UmVzdG9yZUVmZmVjdDp3YWl0aW5nLW1hbmFnZW1lbnQtYm9vdHN0cmFwXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkaWRSZXN0b3JlT25Nb3VudFJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICBjb25zdCBpc0hpc3RvcnlCYWNrRm9yd2FyZCA9IGlzRXhwZW5zZUhpc3RvcnlCYWNrRm9yd2FyZE5hdmlnYXRpb24oKTtcbiAgICBjb25zdCBpc1JldHVybkZyb21UaWNrZXREZXRhaWwgPSBoYXNFeHBlbnNlUmV0dXJuUmVmZXJyZXIoW1xuICAgICAgXCIvR2FzdG9zL1RpY2tldERldGFpbFwiLFxuICAgICAgXCIvR2FzdG9zL1RpY2tldExpbmVEZXRhaWxcIixcbiAgICBdKTtcbiAgICBjb25zdCByZXR1cm5Nb2RlID0gY29uc3VtZVJldHVybk1vZGUoKTtcbiAgICBjb25zdCBoYXNSZXR1cm5GbGFnID0gY29uc3VtZVJldHVybkZsYWcoKTtcblxuICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXNvbHZlZC1yZXR1cm4tc3RhdGVcIiwge1xuICAgICAgaXNIaXN0b3J5QmFja0ZvcndhcmQsXG4gICAgICBpc1JldHVybkZyb21UaWNrZXREZXRhaWwsXG4gICAgICByZXR1cm5Nb2RlLFxuICAgICAgaGFzUmV0dXJuRmxhZyxcbiAgICAgIGlzTGlua01vZGUsXG4gICAgfSk7XG5cbiAgICBpZiAocmV0dXJuTW9kZSA9PT0gXCJyZXNldF9maWx0ZXJzXCIgJiYgaGFzUmV0dXJuRmxhZykge1xuICAgICAgbG9nRXhwZW5zZVRpY2tldHNJbmZvKFwibW91bnRSZXN0b3JlRWZmZWN0OnJlc3RvcmUtZGVsZXRlLXJldHVyblwiKTtcbiAgICAgIHJlc3RvcmVEZWxldGVSZXR1cm5TdGF0ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc0xpbmtNb2RlKSB7XG4gICAgICBjb25zdCBpc1JldHVybmluZ0Zyb21EZXRhaWwgPSBoYXNSZXR1cm5GbGFnIHx8IGlzSGlzdG9yeUJhY2tGb3J3YXJkIHx8IGlzUmV0dXJuRnJvbVRpY2tldERldGFpbDtcbiAgICAgIGNvbnN0IGNhY2hlZFN0YXRlID0gaXNSZXR1cm5pbmdGcm9tRGV0YWlsID8gcmVhZENhY2hlZFN0YXRlKCkgOiBudWxsO1xuICAgICAgY29uc3QgY2FjaGVkU2hlZXRJZCA9IHNhZmVUZXh0KGNhY2hlZFN0YXRlPy5saW5rTW9kZVNoZWV0SWQpO1xuICAgICAgaWYgKGNhY2hlZFN0YXRlICYmIGNhY2hlZFNoZWV0SWQgJiYgY2FjaGVkU2hlZXRJZCA9PT0gc2FmZVRleHQobGlua1NoZWV0SWQpKSB7XG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXN0b3JlLWxpbmstbW9kZS1jYWNoZVwiLCB7XG4gICAgICAgICAgY2FjaGVkU2hlZXRJZCxcbiAgICAgICAgICBwYWdlOiBjYWNoZWRTdGF0ZS5wYWdlLFxuICAgICAgICB9KTtcbiAgICAgICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlKCk7XG4gICAgICAgIHJlc3RvcmVMaW5rTW9kZVJldHVyblN0YXRlKGNhY2hlZFN0YXRlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBsaW5rUmV0dXJuU3RhdGUgPSBpc1JldHVybmluZ0Zyb21EZXRhaWwgPyByZWFkRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZShsaW5rU2hlZXRJZCkgOiBudWxsO1xuICAgICAgaWYgKGxpbmtSZXR1cm5TdGF0ZSkge1xuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6cmVzdG9yZS1saW5rLW1vZGUtcmV0dXJuLXN0YXRlXCIsIHtcbiAgICAgICAgICBzaGVldElkOiBsaW5rUmV0dXJuU3RhdGUuc2hlZXRJZCxcbiAgICAgICAgICBwYWdlOiBsaW5rUmV0dXJuU3RhdGUucGFnZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSgpO1xuICAgICAgICByZXN0b3JlTGlua01vZGVSZXR1cm5TdGF0ZSh7XG4gICAgICAgICAgZmlsdGVyczogbGlua1JldHVyblN0YXRlLmZpbHRlcnMsXG4gICAgICAgICAgcGFnZTogbGlua1JldHVyblN0YXRlLnBhZ2UsXG4gICAgICAgICAgc2Nyb2xsWTogbGlua1JldHVyblN0YXRlLnNjcm9sbFksXG4gICAgICAgICAgZm9jdXNGaWxlSWQ6IGxpbmtSZXR1cm5TdGF0ZS5mb2N1c0ZpbGVJZCxcbiAgICAgICAgICBpdGVtczogW10sXG4gICAgICAgICAgc2VsZWN0ZWRUaWNrZXRzOiBsaW5rUmV0dXJuU3RhdGUuc2VsZWN0ZWRUaWNrZXRzLFxuICAgICAgICAgIHRvdGFsOiAwLFxuICAgICAgICAgIGxpbmtNb2RlU2hlZXRJZDogbGlua1JldHVyblN0YXRlLnNoZWV0SWQsXG4gICAgICAgICAgc2VsZWN0aW9uTW9kZTogbGlua1JldHVyblN0YXRlLnNlbGVjdGlvbk1vZGUsXG4gICAgICAgICAgZXhjbHVkZWRJZHM6IGxpbmtSZXR1cm5TdGF0ZS5leGNsdWRlZElkcyxcbiAgICAgICAgICBmaWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnM6IGxpbmtSZXR1cm5TdGF0ZS5maWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnMsXG4gICAgICAgICAgZmlsdGVyZWRTZWxlY3Rpb25Ub3RhbDogbGlua1JldHVyblN0YXRlLmZpbHRlcmVkU2VsZWN0aW9uVG90YWwsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXN0b3JlLWluaXRpYWwtbGluay1tb2RlXCIpO1xuICAgICAgcmVzdG9yZUluaXRpYWxMaW5rTW9kZVN0YXRlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFoYXNSZXR1cm5GbGFnICYmICFpc0hpc3RvcnlCYWNrRm9yd2FyZCAmJiAhaXNSZXR1cm5Gcm9tVGlja2V0RGV0YWlsKSB7XG4gICAgICBsb2dFeHBlbnNlVGlja2V0c0luZm8oXCJtb3VudFJlc3RvcmVFZmZlY3Q6Y2xlYXItY2FjaGUtbm8tcmV0dXJuLWNvbnRleHRcIik7XG4gICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2FjaGVkU3RhdGUgPSByZWFkQ2FjaGVkU3RhdGUoKTtcbiAgICBpZiAoIWNhY2hlZFN0YXRlKSB7XG4gICAgICBsb2dFeHBlbnNlVGlja2V0c1dhcm4oXCJtb3VudFJlc3RvcmVFZmZlY3Q6bm8tY2FjaGVkLXN0YXRlXCIpO1xuICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxvZ0V4cGVuc2VUaWNrZXRzSW5mbyhcIm1vdW50UmVzdG9yZUVmZmVjdDpyZXN0b3JlLXN0YW5kYXJkLWNhY2hlXCIsIHtcbiAgICAgIHBhZ2U6IGNhY2hlZFN0YXRlLnBhZ2UsXG4gICAgICBmb2N1c0ZpbGVJZDogY2FjaGVkU3RhdGUuZm9jdXNGaWxlSWQsXG4gICAgfSk7XG4gICAgcmVzdG9yZVN0YW5kYXJkUmV0dXJuU3RhdGUoY2FjaGVkU3RhdGUpO1xuICB9LCBbXG4gICAgYXBwbHlDcmVhdGVkVGlja2V0UmV0dXJuLFxuICAgIGNsZWFyQ2FjaGVkU3RhdGUsXG4gICAgY2xlYXJFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlLFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIGNvbnN1bWVSZXR1cm5Nb2RlLFxuICAgIGhhc0FjY2VzcyxcbiAgICBpc0xpbmtNb2RlLFxuICAgIGxpbmtTaGVldElkLFxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcbiAgICByZWFkQ2FjaGVkU3RhdGUsXG4gICAgcmVhZEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUsXG4gICAgcmVzdG9yZURlbGV0ZVJldHVyblN0YXRlLFxuICAgIHJlc3RvcmVJbml0aWFsTGlua01vZGVTdGF0ZSxcbiAgICByZXN0b3JlTGlua01vZGVSZXR1cm5TdGF0ZSxcbiAgICByZXN0b3JlU3RhbmRhcmRSZXR1cm5TdGF0ZSxcbiAgXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMb2FkaW5nKSByZXR1cm47XG4gICAgaWYgKHBlbmRpbmdTY3JvbGxSZXN0b3JlUmVmLmN1cnJlbnQgPT0gbnVsbCAmJiAhcGVuZGluZ0ZvY3VzRmlsZUlkUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgIGNvbnN0IHBlbmRpbmdTY3JvbGxZID0gcGVuZGluZ1Njcm9sbFJlc3RvcmVSZWYuY3VycmVudDtcbiAgICBjb25zdCBwZW5kaW5nRm9jdXNGaWxlSWQgPSBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudDtcbiAgICBwZW5kaW5nU2Nyb2xsUmVzdG9yZVJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICBwZW5kaW5nRm9jdXNGaWxlSWRSZWYuY3VycmVudCA9IFwiXCI7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmIChwZW5kaW5nU2Nyb2xsWSAhPSBudWxsKSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgdG9wOiBNYXRoLm1heCgwLCBwZW5kaW5nU2Nyb2xsWSksXG4gICAgICAgICAgYmVoYXZpb3I6IFwiYXV0b1wiLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFwZW5kaW5nRm9jdXNGaWxlSWQgfHwgIXRpbWVsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgY29uc3Qgbm9ybWFsaXplZEZvY3VzSWQgPSBwZW5kaW5nRm9jdXNGaWxlSWQudG9VcHBlckNhc2UoKTtcbiAgICAgIGNvbnN0IHRpbWVsaW5lSXRlbXMgPSBBcnJheS5mcm9tKFxuICAgICAgICB0aW1lbGluZUNvbnRhaW5lclJlZi5jdXJyZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWl0ZW1bZGF0YS10aWNrZXQtZmlsZS1pZF1cIilcbiAgICAgICk7XG4gICAgICBjb25zdCBtYXRjaGluZ0l0ZW0gPSB0aW1lbGluZUl0ZW1zLmZpbmQoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHNhZmVUZXh0KGl0ZW0uZGF0YXNldC50aWNrZXRGaWxlSWQpLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRGb2N1c0lkO1xuICAgICAgfSk7XG4gICAgICBjb25zdCB0YXJnZXRDYXJkID0gbWF0Y2hpbmdJdGVtPy5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XG4gICAgICBpZiAoIXRhcmdldENhcmQpIHJldHVybjtcblxuICAgICAgdGFyZ2V0Q2FyZC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gICAgfSk7XG4gIH0sIFtpc0xvYWRpbmcsIGl0ZW1zLmxlbmd0aF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkgfHwgIWhhc0FjY2VzcykgcmV0dXJuO1xuXG4gICAgY29uc3QgaGFuZGxlUGFnZVNob3cgPSAoZXZlbnQ6IFBhZ2VUcmFuc2l0aW9uRXZlbnQpID0+IHtcbiAgICAgIGlmICghZXZlbnQucGVyc2lzdGVkICYmICFpc0V4cGVuc2VIaXN0b3J5QmFja0ZvcndhcmROYXZpZ2F0aW9uKCkpIHJldHVybjtcblxuICAgICAgY29uc3Qgc25hcHNob3QgPSByZXNvbHZlQWN0aXZlRmlsdGVycygpO1xuICAgICAgaWYgKCFpc0xpbmtNb2RlICYmICghc25hcHNob3QuZnJvbURhdGUgfHwgIXNuYXBzaG90LnRvRGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBydW5BdXRvbWF0aWNMaXN0TG9hZChjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsIHNuYXBzaG90LCB7XG4gICAgICAgIGNsZWFyQ2FjaGU6IHRydWUsXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBoYW5kbGVQYWdlU2hvdyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgaGFuZGxlUGFnZVNob3cpO1xuICAgIH07XG4gIH0sIFtjdXJyZW50UGFnZSwgaGFzQWNjZXNzLCBpc0xpbmtNb2RlLCBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksIHJlc29sdmVBY3RpdmVGaWx0ZXJzLCBydW5BdXRvbWF0aWNMaXN0TG9hZF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb25Ub2dnbGVGaWx0ZXJzID0gKCkgPT4ge1xuICAgICAgY29uc3Qgd2lsbE9wZW4gPSAhc2hvd0ZpbHRlcnM7XG4gICAgICB0b2dnbGVGaWx0ZXJQYW5lbCgpO1xuICAgICAgaWYgKHdpbGxPcGVuKSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uUmVmcmVzaCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gcmVzb2x2ZUFjdGl2ZUZpbHRlcnMoKTtcbiAgICAgIGlmICghaXNMaW5rTW9kZSAmJiAoIXNuYXBzaG90Py5mcm9tRGF0ZSB8fCAhc25hcHNob3Q/LnRvRGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdm9pZCBsb2FkTGlzdChjdXJyZW50UGFnZSA8IDEgPyAxIDogY3VycmVudFBhZ2UsIHNuYXBzaG90KTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJleHBlbnNlLXRpY2tldHMtdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXhwZW5zZS10aWNrZXRzLXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImV4cGVuc2UtdGlja2V0cy1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XG4gICAgfTtcbiAgfSwgW2N1cnJlbnRQYWdlLCBpc0xpbmtNb2RlLCBsb2FkTGlzdCwgcmVzb2x2ZUFjdGl2ZUZpbHRlcnMsIHNob3dGaWx0ZXJzLCB0b2dnbGVGaWx0ZXJQYW5lbF0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgIDxDb25maXJtTW9kYWxcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWxDYW5jZWxUZXh0fVxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxuICAgICAgICBidXN5PXtsaW5rRmxvd0J1c3l9XG4gICAgICAgIGVycm9yPXtsaW5rRmxvd0Vycm9yfVxuICAgICAgICBzdGF0dXM9e2xpbmtGbG93U3RhdHVzfVxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cbiAgICAgICAgb25DYW5jZWw9e2Nsb3NlQ29uZmlybX1cbiAgICAgIC8+XG5cbiAgICAgIDxpbnB1dFxuICAgICAgICByZWY9e2NhbWVyYUlucHV0UmVmfVxuICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgIGFjY2VwdD17VElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEV9XG4gICAgICAgIGNhcHR1cmU9XCJlbnZpcm9ubWVudFwiXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQuY3VycmVudFRhcmdldC5maWxlcz8uWzBdIHx8IG51bGw7XG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgdm9pZCBoYW5kbGVTZWxlY3RlZEZpbGUoZmlsZSwgXCJjYW1lcmFcIik7XG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAgPGlucHV0XG4gICAgICAgIHJlZj17Z2FsbGVyeUlucHV0UmVmfVxuICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgIGFjY2VwdD17VElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEV9XG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQuY3VycmVudFRhcmdldC5maWxlcz8uWzBdIHx8IG51bGw7XG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgdm9pZCBoYW5kbGVTZWxlY3RlZEZpbGUoZmlsZSwgXCJnYWxsZXJ5XCIpO1xuICAgICAgICB9fVxuICAgICAgLz5cblxuICAgICAgeyFpc0xpbmtNb2RlICYmIHNvdXJjZVBpY2tlck9wZW4gPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTYwMDAwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1zbGF0ZS05NTAvNDUgcHgtNCBweS02XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctc20gcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgcC00IHNoYWRvdy14bFwiPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtWzE2cHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfVGl0bGVcIiwgXCJOdWV2byB0aWNrZXRcIil9XG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XG4gICAgICAgICAgICAgIHtpbmRUKFxuICAgICAgICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0JvZHlcIixcbiAgICAgICAgICAgICAgICBcIlNlbGVjY2lvbmEgdW5hIGZ1ZW50ZSBwYXJhIGNhcHR1cmFyIG8gZWxlZ2lyIGxhIGltYWdlbiBkZWwgdGlja2V0LlwiXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBncmlkIGdyaWQtY29scy0xIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHZvaWQgc2VsZWN0RnJvbUNhbWVyYShjYW1lcmFJbnB1dFJlZi5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfQ2FtZXJhXCIsIFwiVXNhciBjXHUwMEUxbWFyYVwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNlbGVjdEZyb21HYWxsZXJ5KGdhbGxlcnlJbnB1dFJlZi5jdXJyZW50KX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0dhbGxlcnlcIiwgXCJFbGVnaXIgaW1hZ2VuXCIpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17Y2xvc2VTb3VyY2VQaWNrZXJ9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIHshaXNMaW5rTW9kZSAmJiBxdWlja1RpY2tldEJ1c3kgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTYwMDAwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1zbGF0ZS05NTAvMzUgcHgtNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUvOTUgcHgtNCBweS0zIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIj5cbiAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTUgdy01XCIgbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9IC8+XG4gICAgICAgICAgICA8c3Bhbj57cXVpY2tUaWNrZXRQcm9ncmVzc01lc3NhZ2UgfHwgaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIHshaXNMaW5rTW9kZSAmJiBxdWlja1RpY2tldEVycm9yTWVzc2FnZSA/IChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZVxuICAgICAgICAgICAgICA/IFwiZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgc3BhY2UteS0yIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItYW1iZXItMjAwIGJnLWFtYmVyLTUwIHAtMyB0ZXh0LXNtIHRleHQtYW1iZXItOTAwXCJcbiAgICAgICAgICAgICAgOiBcImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIHNwYWNlLXktMiByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXJvc2UtNTAgcC0zIHRleHQtc20gdGV4dC1yb3NlLTgwMFwiXG4gICAgICAgICAgfVxuICAgICAgICA+XG4gICAgICAgICAgPHA+e3F1aWNrVGlja2V0RXJyb3JNZXNzYWdlfTwvcD5cbiAgICAgICAgICB7cXVpY2tUaWNrZXRBdHRlbXB0SWQgPyAoXG4gICAgICAgICAgICA8cFxuICAgICAgICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlXG4gICAgICAgICAgICAgICAgICA/IFwicm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBiZy13aGl0ZSBweC0yIHB5LTEgZm9udC1tb25vIHRleHQtWzExcHhdIHRleHQtYW1iZXItOTAwIGJyZWFrLWFsbFwiXG4gICAgICAgICAgICAgICAgICA6IFwicm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXdoaXRlIHB4LTIgcHktMSBmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1yb3NlLTgwMCBicmVhay1hbGxcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtgYXR0ZW1wdElkOiAke3F1aWNrVGlja2V0QXR0ZW1wdElkfWB9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmVcbiAgICAgICAgICAgICAgICAgID8gXCJyb3VuZGVkLWxnIGJvcmRlciBib3JkZXItYW1iZXItMjAwIGJnLXdoaXRlIHAtMiB0ZXh0LXhzIHRleHQtYW1iZXItODAwXCJcbiAgICAgICAgICAgICAgICAgIDogXCJyb3VuZGVkLWxnIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctd2hpdGUgcC0yIHRleHQteHMgdGV4dC1yb3NlLTcwMFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lm1hcCgoZW50cnkpID0+IChcbiAgICAgICAgICAgICAgICA8cCBrZXk9e2Ake2VudHJ5LnN0ZXB9LSR7ZW50cnkuYXR9YH0+e2Ake2VudHJ5LnN0ZXB9OiAke2VudHJ5LnRyYWNlSWR9YH08L3A+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMlwiPlxuICAgICAgICAgICAge2hhc1BhcnRpYWxUaWNrZXRGYWlsdXJlID8gKFxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCIgb25DbGljaz17b3BlbkNyZWF0ZWRUaWNrZXR9PlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfT3BlbkNyZWF0ZWRUaWNrZXRcIiwgXCJPcGVuIGNyZWF0ZWQgdGlja2V0XCIpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAge2hhc1BlbmRpbmdVcGxvYWRSZXRyeSA/IChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHZvaWQgcmV0cnlQZW5kaW5nVXBsb2FkKCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUmV0cnlVcGxvYWRcIiwgXCJSZWludGVudGFyIHVwbG9hZFwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIiBvbkNsaWNrPXtjbGVhclF1aWNrVGlja2V0RXJyb3J9PlxuICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9DbG9zZVwiLCBcIkNsb3NlXCIpfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIHtzaG93U3VtbWFyeSA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItY2FyZCBmaWx0ZXItY2FyZC0tc3VtbWFyeSBwLTMgc206cC00IG10LTEgbWItM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhwZW5zZS1zdW1tYXJ5LWdyaWQgZ3JpZCBncmlkLWNvbHMtMSBtaW4tWzM2MHB4XTpncmlkLWNvbHMtMiBpdGVtcy1zdGFydCBnYXAteC00IGdhcC15LTEgdGV4dC14c1wiPlxuICAgICAgICAgICAge3N1bW1hcnlJdGVtcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGtleT17aXRlbS5rZXl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeSBoaXN0b3J5LWZpbHRlci1zdW1tYXJ5LS1ncmlkLWl0ZW0gbGVhZGluZy01IG1pbi13LTBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeV9fbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpdGVtLmxhYmVsfTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeV9fdmFsdWUgYnJlYWstd29yZHNcIj57aXRlbS52YWx1ZX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbFxuICAgICAgICBtb2RlPXtpc0xpbmtNb2RlID8gXCJsaW5rXCIgOiBcImdlbmVyYWxcIn1cbiAgICAgICAgdmlzaWJsZT17c2hvd0ZpbHRlcnN9XG4gICAgICAgIHNob3dNYW51YWxEYXRlRmlsdGVyPXtzaG93TWFudWFsRGF0ZUZpbHRlcn1cbiAgICAgICAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5PXttYW51YWxEYXRlQXV0b09wZW5LZXl9XG4gICAgICAgIGZyb21EYXRlPXtmcm9tRGF0ZX1cbiAgICAgICAgdG9EYXRlPXt0b0RhdGV9XG4gICAgICAgIGZpbHRlcktleT17ZmlsdGVyS2V5fVxuICAgICAgICBjdXJyZW5jeUNvZGU9e2N1cnJlbmN5Q29kZX1cbiAgICAgICAgbWFuYWdlZFVzZXJJZD17bWFuYWdlZFVzZXJJZH1cbiAgICAgICAgbWFuYWdlZFVzZXJzPXttYW5hZ2VkVXNlcnN9XG4gICAgICAgIHNob3dNYW5hZ2VkVXNlckZpbHRlcj17c2hvd01hbmFnZWRVc2VyRmlsdGVyfVxuICAgICAgICBzdGF0dXNGaWx0ZXI9e3N0YXR1c0ZpbHRlcn1cbiAgICAgICAgZ2FzdG9UeXBlRmlsdGVyPXtnYXN0b1R5cGVGaWx0ZXJ9XG4gICAgICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXI9e3Byb2Nlc3NlZEJ5SWFGaWx0ZXJ9XG4gICAgICAgIGFjdGl2ZVF1aWNrRmlsdGVyPXthY3RpdmVRdWlja0ZpbHRlcn1cbiAgICAgICAgc2hvd01hbnVhbERhdGVFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvcn1cbiAgICAgICAgc3RhdHVzRmlsdGVyUmVhZE9ubHk9e3N0YXR1c0ZpbHRlckxvY2tlZH1cbiAgICAgICAgZml4ZWRTdGF0dXNGaWx0ZXI9e2ZpeGVkU3RhdHVzRmlsdGVyfVxuICAgICAgICBnYXN0b1R5cGVPcHRpb25zPXtnYXN0b1R5cGVPcHRpb25zfVxuICAgICAgICBvbkRhdGVSYW5nZUNoYW5nZT17b25EYXRlUmFuZ2VDaGFuZ2V9XG4gICAgICAgIG9uTWFudWFsUmFuZ2VDb21wbGV0ZT17b25NYW51YWxSYW5nZUNvbXBsZXRlfVxuICAgICAgICBvblF1aWNrRmlsdGVyQ2hhbmdlPXtvblF1aWNrRmlsdGVyQ2hhbmdlfVxuICAgICAgICBvbkZpbHRlcktleUNoYW5nZT17c2V0RmlsdGVyS2V5fVxuICAgICAgICBvbkN1cnJlbmN5Q29kZUNoYW5nZT17c2V0Q3VycmVuY3lDb2RlfVxuICAgICAgICBvbk1hbmFnZWRVc2VySWRDaGFuZ2U9e3NldE1hbmFnZWRVc2VySWR9XG4gICAgICAgIG9uU3RhdHVzRmlsdGVyQ2hhbmdlPXtzZXRTdGF0dXNGaWx0ZXJ9XG4gICAgICAgIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlPXtzZXRHYXN0b1R5cGVGaWx0ZXJ9XG4gICAgICAgIG9uUHJvY2Vzc2VkQnlJYUZpbHRlckNoYW5nZT17c2V0UHJvY2Vzc2VkQnlJYUZpbHRlcn1cbiAgICAgICAgb25DbGVhcj17b25DbGVhcn1cbiAgICAgICAgb25BcHBseT17b25BcHBseX1cbiAgICAgIC8+XG5cbiAgICAgIHtpc0xpbmtNb2RlID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBweC0wLjVcIj5cbiAgICAgICAgICB7IWNhblByb2Nlc3NMaW5rTW9kZSA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXJvc2UtNzAwXCI+e2luZFQoXCJBdXRoX1Blcm1pc3Npb25EZW5pZWRfQm9keVwiLCBcIk5vIHBlcm1pc3Npb24uXCIpfTwvZGl2PlxuICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAge2NhblByb2Nlc3NMaW5rTW9kZSAmJiBsaW5rU2hlZXRDaGVja0J1c3kgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIj5cbiAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNCB3LTRcIiBsYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0gLz5cbiAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmICFsaW5rU2hlZXRDaGVja0J1c3kgJiYgc2VsZWN0QWxsQnVzeSA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfSAvPlxuICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgIHtjYW5Qcm9jZXNzTGlua01vZGUgJiYgIWxpbmtTaGVldENoZWNrQnVzeSAmJiBsaW5rU2hlZXRMb2NrZWQgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1yb3NlLTcwMFwiPlxuICAgICAgICAgICAgICB7bGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UgfHxcbiAgICAgICAgICAgICAgICBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUmVhZE9ubHlCeVN0YXR1c1wiLCBcIk5vIHNlIHB1ZWRlIGVkaXRhciBlc3RhIGhvamEgZGUgZ2FzdG9zIGVuIGVsIGVzdGFkbyBhY3R1YWwuXCIpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICB7Y2FuUHJvY2Vzc0xpbmtNb2RlICYmICFsaW5rU2hlZXRDaGVja0J1c3kgJiYgIWxpbmtTaGVldExvY2tlZCAmJiBzZWxlY3RBbGxFcnJvciA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXJvc2UtNzAwXCI+e3NlbGVjdEFsbEVycm9yfTwvZGl2PlxuICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAge2NhblByb2Nlc3NMaW5rTW9kZSAmJiAhbGlua1NoZWV0Q2hlY2tCdXN5ICYmICFsaW5rU2hlZXRMb2NrZWQgPyAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTEuNSBwdC0wLjVcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBtaW4tdy0wIHB4LTEuNSBweS0xIHRleHQtWzEwcHhdIGxlYWRpbmctdGlnaHQgc206dGV4dC14c1wiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgc2VsZWN0QWxsTWF0Y2hpbmdUaWNrZXRzKCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xpbmtNb2RlU2VsZWN0aW9uQnV0dG9uc0Rpc2FibGVkIHx8IHRvdGFsIDwgMX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1NlbGVjdEFsbFwiLCBcIlNlbGVjY2lvbmFyIHRvZG9cIil9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgbWluLXctMCBweC0xLjUgcHktMSB0ZXh0LVsxMHB4XSBsZWFkaW5nLXRpZ2h0IHNtOnRleHQteHNcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17Y2xlYXJUaWNrZXRTZWxlY3Rpb259XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17bGlua01vZGVTZWxlY3Rpb25CdXR0b25zRGlzYWJsZWQgfHwgc2VsZWN0ZWRUaWNrZXRDb3VudCA8IDF9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9DbGVhckFsbFwiLCBcIkJvcnJhciBzZWxlY2NpXHUwMEYzblwiKX1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAge2lzTGlua01vZGUgPyA8RXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeSByZXN1bHQ9e2xpbmtCdWxrUmVzdWx0fSAvPiA6IG51bGx9XG5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCJcbiAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogc2hvd0xpc3RMb2FkaW5nID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxuICAgICAgPlxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XG4gICAgICA8L2Rpdj5cblxuICAgICAge2Vycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57ZXJyb3JNZXNzYWdlfTwvZGl2PiA6IG51bGx9XG5cbiAgICAgIHshc2hvd0xpc3RMb2FkaW5nICYmICFlcnJvck1lc3NhZ2UgJiYgaXRlbXMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveCB0aW1lbGluZS1lbXB0eVwiIGRhdGEtZW1wdHktdGV4dD17aW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpfSAvPlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIHshZXJyb3JNZXNzYWdlICYmIGl0ZW1zLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgIDxkaXYgcmVmPXt0aW1lbGluZUNvbnRhaW5lclJlZn0gY2xhc3NOYW1lPVwidGltZWxpbmUtYm94XCI+XG4gICAgICAgICAge2l0ZW1zLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQoaXRlbS5maWxlSWQpO1xuICAgICAgICAgICAgY29uc3QgZGF0ZVBhcnRzID0gZm9ybWF0RXhwZW5zZURhdGVQYXJ0cyhpdGVtLnRyYW5zRGF0ZSwgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCIpO1xuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBzYWZlVGV4dChpdGVtLmRlc2NyaXB0aW9uKSB8fCBzYWZlVGV4dChpdGVtLmZpbGVOYW1lKSB8fCBmaWxlSWQgfHwgXCItXCI7XG4gICAgICAgICAgICBjb25zdCBhbW91bnRUZXh0ID0gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGl0ZW0udG90YWxBbW91bnQgPz8gbnVsbCwgc2FmZVRleHQoaXRlbS5jdXJyZW5jeUNvZGUpKTtcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1c0NvZGUgPSBpdGVtLmtpbmQgPT09IFwiZ2VuZXJhbFwiID8gaXRlbS5zdGF0dXMgOiBudWxsO1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzTGFiZWwgPSBzdGF0dXNDb2RlID09PSBudWxsID8gdW5kZWZpbmVkIDogZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsKHN0YXR1c0NvZGUpO1xuICAgICAgICAgICAgY29uc3QgaXNBc3NpZ25lZFRvRXhwZW5zZVNoZWV0ID0gc3RhdHVzQ29kZSA9PT0gMTtcbiAgICAgICAgICAgIGNvbnN0IHNob3dQcm9jZXNzZWRCeUFpSWNvbiA9IGl0ZW0ucHJvY2Vzc2VkQnlBSSA9PT0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0YWJsZUluTGlua01vZGUgPSBpc0xpbmtNb2RlICYmIGNhblNlbGVjdFRpY2tldEZvckxpbmsoaXRlbSk7XG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkSW5MaW5rTW9kZSA9IGlzTGlua01vZGUgJiYgaXNMaW5rVGlja2V0U2VsZWN0ZWQoZmlsZUlkKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZEJ5QWlMYWJlbCA9IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBXCIsIFwiUHJvY2Vzc2VkIGJ5IElBXCIpO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0VGlja2V0TGFiZWwgPSBpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfU2VsZWN0VGlja2V0XCIsIFwiU2VsZWNjaW9uYXIgdGlja2V0XCIpO1xuICAgICAgICAgICAgY29uc3QgZ2FzdG9UeXBlQ29kZSA9IGl0ZW0uZ2FzdG9UeXBlID09PSBudWxsID8gXCJcIiA6IFN0cmluZyhpdGVtLmdhc3RvVHlwZSk7XG4gICAgICAgICAgICBjb25zdCBnYXN0b1R5cGVMYWJlbCA9IGdhc3RvVHlwZUNvZGVcbiAgICAgICAgICAgICAgPyBnYXN0b1R5cGVMYWJlbE1hcC5nZXQoZ2FzdG9UeXBlQ29kZSkgfHwgZ2FzdG9UeXBlQ29kZVxuICAgICAgICAgICAgICA6IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xuICAgICAgICAgICAgY29uc3QgY2FyZFN1YnRpdGxlID0gZ2FzdG9UeXBlTGFiZWw7XG4gICAgICAgICAgICBjb25zdCB0aWNrZXRDYXJkS2V5ID1cbiAgICAgICAgICAgICAgZmlsZUlkIHx8XG4gICAgICAgICAgICAgIGAke3NhZmVUZXh0KGl0ZW0uZmlsZU5hbWUpfS0ke3NhZmVUZXh0KGl0ZW0udHJhbnNEYXRlKX0tJHtzYWZlVGV4dChpdGVtLmRlc2NyaXB0aW9uKX0tJHtTdHJpbmcoaXRlbS50b3RhbEFtb3VudCA/PyBcIlwiKX1gO1xuXG4gICAgICAgICAgICBpZiAoaXNMaW5rTW9kZSAmJiBpdGVtLmtpbmQgPT09IFwibGlua1wiKSB7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEV4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtXG4gICAgICAgICAgICAgICAgICBrZXk9e3RpY2tldENhcmRLZXl9XG4gICAgICAgICAgICAgICAgICBmaWxlSWQ9e2ZpbGVJZH1cbiAgICAgICAgICAgICAgICAgIGRhdGVQYXJ0cz17ZGF0ZVBhcnRzfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgICAgICAgICAgc3VidGl0bGU9e2NhcmRTdWJ0aXRsZX1cbiAgICAgICAgICAgICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XG4gICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkPXtpc1NlbGVjdGVkSW5MaW5rTW9kZX1cbiAgICAgICAgICAgICAgICAgIGlzU2VsZWN0YWJsZT17aXNTZWxlY3RhYmxlSW5MaW5rTW9kZX1cbiAgICAgICAgICAgICAgICAgIGludGVyYWN0aW9uRGlzYWJsZWQ9e2xpbmtGbG93QnVzeSB8fCBsaW5rU2hlZXRDaGVja0J1c3kgfHwgbGlua1NoZWV0TG9ja2VkfVxuICAgICAgICAgICAgICAgICAgcHJvY2Vzc2VkQnlBST17aXRlbS5wcm9jZXNzZWRCeUFJfVxuICAgICAgICAgICAgICAgICAgcHJvY2Vzc2VkQnlBaUxhYmVsPXtwcm9jZXNzZWRCeUFpTGFiZWx9XG4gICAgICAgICAgICAgICAgICBzZWxlY3RMYWJlbD17c2VsZWN0VGlja2V0TGFiZWx9XG4gICAgICAgICAgICAgICAgICBvbk9wZW5EZXRhaWw9eygpID0+IG9wZW5UaWNrZXREZXRhaWwoZmlsZUlkKX1cbiAgICAgICAgICAgICAgICAgIG9uVG9nZ2xlU2VsZWN0PXsoKSA9PiB0b2dnbGVUaWNrZXRTZWxlY3Rpb24oaXRlbSl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgYmFzZVN0YXR1c0ljb25zID0gaXNBc3NpZ25lZFRvRXhwZW5zZVNoZWV0IHx8IHNob3dQcm9jZXNzZWRCeUFpSWNvbiA/IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICB7aXNBc3NpZ25lZFRvRXhwZW5zZVNoZWV0ID8gKFxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb25cIiByb2xlPVwiaW1nXCIgYXJpYS1sYWJlbD17c3RhdHVzTGFiZWx9PlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTQgdy00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNMTMuMTkgOC42ODhhNC41IDQuNSAwIDAgMSAxLjI0MiA3LjI0NGwtNC41IDQuNWE0LjUgNC41IDAgMCAxLTYuMzY0LTYuMzY0bDEuNzU3LTEuNzU3bTEzLjM1LS42MjIgMS43NTctMS43NTdhNC41IDQuNSAwIDAgMC02LjM2NC02LjM2NGwtNC41IDQuNWE0LjUgNC41IDAgMCAwIDEuMjQyIDcuMjQ0XCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICB7c2hvd1Byb2Nlc3NlZEJ5QWlJY29uID8gKFxuICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb24gZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb24tLWFpXCJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cImltZ1wiXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3Byb2Nlc3NlZEJ5QWlMYWJlbH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezEuNX0gc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPVwiaC00IHctNFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTQgMThsNC0xMmw0IDEyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk02IDEzaDRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDZoNlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTcgNnYxMlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMThoNlwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICkgOiBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXt0aWNrZXRDYXJkS2V5fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIlxuICAgICAgICAgICAgICAgIGRhdGEtdGlja2V0LWZpbGUtaWQ9e2ZpbGVJZCB8fCB1bmRlZmluZWR9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZT17Y2FyZFN1YnRpdGxlfVxuICAgICAgICAgICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cbiAgICAgICAgICAgICAgICAgIG9uT3Blbj17KCkgPT4gb3BlblRpY2tldERldGFpbChmaWxlSWQpfVxuICAgICAgICAgICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX190aXRsZSB0aW1lbGluZS1uYW1lXCJcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0xhYmVsPXtzdGF0dXNMYWJlbH1cbiAgICAgICAgICAgICAgICAgIHN0YXR1c0ljb249e2Jhc2VTdGF0dXNJY29uc31cbiAgICAgICAgICAgICAgICAgIHN0YXR1c0ljb25DbGFzc05hbWU9XCJleHBlbnNlLXRpY2tldC1jYXJkX19zdGF0dXMtaWNvbnNcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXG4gICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsUGFnZXN9XG4gICAgICAgIGN1cnJlbnRQYWdlPXtjdXJyZW50UGFnZX1cbiAgICAgICAgbG9hZGluZz17aXNMb2FkaW5nfVxuICAgICAgICBvblBhZ2VDaGFuZ2U9eyhwYWdlKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc25hcHNob3QgPSByZXNvbHZlQWN0aXZlRmlsdGVycygpO1xuICAgICAgICAgIGlmICghaXNMaW5rTW9kZSAmJiAoIXNuYXBzaG90Py5mcm9tRGF0ZSB8fCAhc25hcHNob3Q/LnRvRGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2b2lkIGxvYWRMaXN0KHBhZ2UsIHNuYXBzaG90KTtcbiAgICAgICAgfX1cbiAgICAgICAgbGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgLz5cblxuICAgICAge2lzTGlua01vZGUgJiYgY2FuUHJvY2Vzc0xpbmtNb2RlICYmICFsaW5rU2hlZXRDaGVja0J1c3kgJiYgIWxpbmtTaGVldExvY2tlZCA/IChcbiAgICAgICAgPFBhZ2VCb3R0b21BY3Rpb25zIGFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0xpbmtCdXR0b25cIiwgXCJWaW5jdWxhciB0aWNrZXQocylcIil9PlxuICAgICAgICAgIDxQYWdlQm90dG9tQWN0aW9uQnV0dG9uXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX0xpbmtCdXR0b25cIiwgXCJWaW5jdWxhciB0aWNrZXQocylcIil9XG4gICAgICAgICAgICBvbkNsaWNrPXtvcGVuTGlua0NvbmZpcm1Nb2RhbH1cbiAgICAgICAgICAgIGRpc2FibGVkPXtsaW5rRmxvd0J1c3kgfHwgc2VsZWN0QWxsQnVzeSB8fCBzZWxlY3RlZFRpY2tldENvdW50IDwgMX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L1BhZ2VCb3R0b21BY3Rpb25zPlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIHtjYW5DcmVhdGVUaWNrZXQgJiYgIWlzTGlua01vZGUgPyAoXG4gICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxuICAgICAgICAgIGFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0FjdGlvbnNcIiwgXCJBY2Npb25lcyByXHUwMEUxcGlkYXNcIil9XG4gICAgICAgICAgc2l6ZT17NzZ9XG4gICAgICAgICAgcmlnaHQ9ezE2fVxuICAgICAgICAgIGJvdHRvbT17MjR9XG4gICAgICAgICAgbWVudUFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0FjdGlvbnNcIiwgXCJBY2Npb25lcyByXHUwMEUxcGlkYXNcIil9XG4gICAgICAgICAgbWVudUl0ZW1zPXtmYWJNZW51SXRlbXN9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgZXhwZW5zZSB0aWNrZXRzIGxpc3QuXG5jb25zdCBFeHBlbnNlVGlja2V0c1BhZ2UgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzIGVuYWJsZUV4cGVuc2VNYW5hZ2VtZW50PlxuICAgICAgPEV4cGVuc2VUaWNrZXRzUGFnZUNvbnRlbnQgLz5cbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICApO1xufTtcblxuY29uc3QgbW91bnQgPSAoKSA9PiB7XG4gIGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoKCk7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS10aWNrZXRzLXJvb3RcIik7XG4gIGlmICghcm9vdEVsKSByZXR1cm47XG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVRpY2tldHNQYWdlIC8+KTtcbn07XG5cbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0c1BhZ2U7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBDaGVja0ljb24gfSBmcm9tIFwiQGhlcm9pY29ucy9yZWFjdC8yNC9vdXRsaW5lXCI7XG5pbXBvcnQgeyB1c2VUYXBHdWFyZCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUYXBHdWFyZC50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlRGF0ZVBhcnRzIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgRXhwZW5zZVRpbWVsaW5lQ2FyZCBmcm9tIFwiLi9FeHBlbnNlVGltZWxpbmVDYXJkLnRzeFwiO1xuXG5jb25zdCBIT0xEX1RPX1NFTEVDVF9NUyA9IDM4MDtcbmNvbnN0IEhPTERfTU9WRV9QWCA9IDE2O1xuXG50eXBlIEV4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtUHJvcHMgPSB7XG4gIGZpbGVJZDogc3RyaW5nO1xuICBkYXRlUGFydHM6IEV4cGVuc2VEYXRlUGFydHM7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHN1YnRpdGxlOiBzdHJpbmc7XG4gIGFtb3VudFRleHQ6IHN0cmluZztcbiAgaXNTZWxlY3RlZDogYm9vbGVhbjtcbiAgaXNTZWxlY3RhYmxlOiBib29sZWFuO1xuICBpbnRlcmFjdGlvbkRpc2FibGVkOiBib29sZWFuO1xuICBwcm9jZXNzZWRCeUFJOiBib29sZWFuIHwgbnVsbDtcbiAgcHJvY2Vzc2VkQnlBaUxhYmVsOiBzdHJpbmc7XG4gIHNlbGVjdExhYmVsOiBzdHJpbmc7XG4gIG9uT3BlbkRldGFpbDogKCkgPT4gdm9pZDtcbiAgb25Ub2dnbGVTZWxlY3Q6ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBMaW5rLW1vZGUgdGlja2V0IGNhcmQ6IHF1aWNrIHRhcCBvcGVucyBkZXRhaWwsIGxvbmcgcHJlc3MgdG9nZ2xlcyBzZWxlY3Rpb24gYW55d2hlcmUgb24gdGhlIGNhcmQuXG5jb25zdCBFeHBlbnNlVGlja2V0TGlua1RpbWVsaW5lSXRlbSA9ICh7XG4gIGZpbGVJZCxcbiAgZGF0ZVBhcnRzLFxuICB0aXRsZSxcbiAgc3VidGl0bGUsXG4gIGFtb3VudFRleHQsXG4gIGlzU2VsZWN0ZWQsXG4gIGlzU2VsZWN0YWJsZSxcbiAgaW50ZXJhY3Rpb25EaXNhYmxlZCxcbiAgcHJvY2Vzc2VkQnlBSSxcbiAgcHJvY2Vzc2VkQnlBaUxhYmVsLFxuICBzZWxlY3RMYWJlbCxcbiAgb25PcGVuRGV0YWlsLFxuICBvblRvZ2dsZVNlbGVjdCxcbn06IEV4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtUHJvcHMpID0+IHtcbiAgY29uc3QgaGFuZGxlVGFwID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKGludGVyYWN0aW9uRGlzYWJsZWQpIHJldHVybjtcbiAgICAgIG9uT3BlbkRldGFpbCgpO1xuICAgIH0sXG4gICAgW2ludGVyYWN0aW9uRGlzYWJsZWQsIG9uT3BlbkRldGFpbF1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVIb2xkID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChpbnRlcmFjdGlvbkRpc2FibGVkIHx8ICFpc1NlbGVjdGFibGUpIHJldHVybiBmYWxzZTtcbiAgICBvblRvZ2dsZVNlbGVjdCgpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LCBbaW50ZXJhY3Rpb25EaXNhYmxlZCwgaXNTZWxlY3RhYmxlLCBvblRvZ2dsZVNlbGVjdF0pO1xuXG4gIGNvbnN0IHRhcEd1YXJkID0gdXNlVGFwR3VhcmQoaGFuZGxlVGFwLCBoYW5kbGVIb2xkLCB7XG4gICAgaG9sZE1zOiBIT0xEX1RPX1NFTEVDVF9NUyxcbiAgICBtb3ZlUHg6IEhPTERfTU9WRV9QWCxcbiAgfSk7XG5cbiAgY29uc3Qgc2VsZWN0aW9uSW5kaWNhdG9yVG9uZUNsYXNzTmFtZSA9IGlzU2VsZWN0ZWRcbiAgICA/IFwiYm9yZGVyLXByaW1hcnkgYmctcHJpbWFyeSB0ZXh0LXdoaXRlIHNoYWRvdy1zbVwiXG4gICAgOiBpc1NlbGVjdGFibGVcbiAgICAgID8gXCJib3JkZXItc2xhdGUtMzAwIGJnLXdoaXRlIHRleHQtdHJhbnNwYXJlbnRcIlxuICAgICAgOiBcImJvcmRlci1zbGF0ZS0yMDAgYmctc2xhdGUtMTAwIHRleHQtdHJhbnNwYXJlbnRcIjtcblxuICBjb25zdCBzdGF0dXNJY29uID0gKFxuICAgIDw+XG4gICAgICA8c3BhblxuICAgICAgICBjbGFzc05hbWU9e2BpbmxpbmUtZmxleCBoLTQgdy00IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgdHJhbnNpdGlvbiAke3NlbGVjdGlvbkluZGljYXRvclRvbmVDbGFzc05hbWV9YH1cbiAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgdGl0bGU9e3NlbGVjdExhYmVsfVxuICAgICAgPlxuICAgICAgICA8Q2hlY2tJY29uIGNsYXNzTmFtZT1cImgtMyB3LTNcIiBzdHJva2VXaWR0aD17Mi4yfSAvPlxuICAgICAgPC9zcGFuPlxuICAgICAge3Byb2Nlc3NlZEJ5QUkgPyAoXG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb24gZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb24tLWFpXCJcbiAgICAgICAgICByb2xlPVwiaW1nXCJcbiAgICAgICAgICBhcmlhLWxhYmVsPXtwcm9jZXNzZWRCeUFpTGFiZWx9XG4gICAgICAgID5cbiAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTQgdy00XCI+XG4gICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk00IDE4bDQtMTJsNCAxMlwiIC8+XG4gICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk02IDEzaDRcIiAvPlxuICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgNmg2XCIgLz5cbiAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE3IDZ2MTJcIiAvPlxuICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMThoNlwiIC8+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvPlxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtpc1NlbGVjdGVkID8gXCJ0aW1lbGluZS1pdGVtIHJvdW5kZWQtMnhsIHJpbmctMiByaW5nLXByaW1hcnkvMzBcIiA6IFwidGltZWxpbmUtaXRlbVwifVxuICAgICAgZGF0YS10aWNrZXQtZmlsZS1pZD17ZmlsZUlkIHx8IHVuZGVmaW5lZH1cbiAgICAgIGRhdGEtdGlja2V0LXNlbGVjdGVkPXtpc1NlbGVjdGVkID8gXCJ0cnVlXCIgOiBcImZhbHNlXCJ9XG4gICAgICBkYXRhLXRpY2tldC1zZWxlY3RhYmxlPXtpc1NlbGVjdGFibGUgJiYgIWludGVyYWN0aW9uRGlzYWJsZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIn1cbiAgICA+XG4gICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxuICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cbiAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICBzdWJ0aXRsZT17c3VidGl0bGV9XG4gICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XG4gICAgICAgIG9uT3Blbj17b25PcGVuRGV0YWlsfVxuICAgICAgICB0aXRsZUNsYXNzTmFtZT1cImV4cGVuc2UtdGlja2V0LWNhcmRfX3RpdGxlIHRpbWVsaW5lLW5hbWVcIlxuICAgICAgICBzdGF0dXNJY29uPXtzdGF0dXNJY29ufVxuICAgICAgICBzdGF0dXNJY29uQ2xhc3NOYW1lPVwiZXhwZW5zZS10aWNrZXQtY2FyZF9fc3RhdHVzLWljb25zXCJcbiAgICAgICAgaW50ZXJhY3Rpb25Qcm9wcz17e1xuICAgICAgICAgIHRhYkluZGV4OiBpbnRlcmFjdGlvbkRpc2FibGVkID8gLTEgOiAwLFxuICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiB0aXRsZSxcbiAgICAgICAgICBcImFyaWEtcHJlc3NlZFwiOiBpc1NlbGVjdGVkLFxuICAgICAgICAgIG9uUG9pbnRlckRvd246IHRhcEd1YXJkLm9uUG9pbnRlckRvd24sXG4gICAgICAgICAgb25Qb2ludGVyTW92ZTogdGFwR3VhcmQub25Qb2ludGVyTW92ZSxcbiAgICAgICAgICBvblBvaW50ZXJVcDogdGFwR3VhcmQub25Qb2ludGVyVXAsXG4gICAgICAgICAgb25Qb2ludGVyQ2FuY2VsOiB0YXBHdWFyZC5vblBvaW50ZXJDYW5jZWwsXG4gICAgICAgICAgb25Db250ZXh0TWVudTogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25DbGljazogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25LZXlEb3duOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChpbnRlcmFjdGlvbkRpc2FibGVkKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIgfHwgZXZlbnQua2V5ID09PSBcIiBcIikge1xuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBvbk9wZW5EZXRhaWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRMaW5rVGltZWxpbmVJdGVtO1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXN1bHREdG8gfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxudHlwZSBFeHBlbnNlVGlja2V0TGlua0J1bGtTdW1tYXJ5UHJvcHMgPSB7XG4gIHJlc3VsdDogRXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXN1bHREdG8gfCBudWxsO1xufTtcblxudHlwZSBFeHBlbnNlVGlja2V0TGlua0lzc3VlTGlzdFByb3BzID0ge1xuICBpdGVtczogQXJyYXk8eyB0aWNrZXRJZDogc3RyaW5nOyByZWFzb246IHN0cmluZyB9PjtcbiAgdGl0bGU6IHN0cmluZztcbiAgdG9uZUNsYXNzTmFtZTogc3RyaW5nO1xufTtcblxuLy8gUmVuZGVycyBvbmUgc2tpcHBlZCBvciBmYWlsZWQgdGlja2V0IGxpc3Qgd2l0aCBzdGFibGUga2V5cy5cbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5rSXNzdWVMaXN0ID0gKHsgaXRlbXMsIHRpdGxlLCB0b25lQ2xhc3NOYW1lIH06IEV4cGVuc2VUaWNrZXRMaW5rSXNzdWVMaXN0UHJvcHMpID0+IHtcbiAgaWYgKGl0ZW1zLmxlbmd0aCA8IDEpIHJldHVybiBudWxsO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2Byb3VuZGVkLTJ4bCBib3JkZXIgcC0zICR7dG9uZUNsYXNzTmFtZX1gfT5cbiAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1zZW1pYm9sZFwiPnt0aXRsZX08L3A+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIgc3BhY2UteS0yXCI+XG4gICAgICAgIHtpdGVtcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e2Ake2l0ZW0udGlja2V0SWQgfHwgXCJ1bmtub3duXCJ9LSR7aXRlbS5yZWFzb24gfHwgXCJuby1yZWFzb25cIn1gfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZC14bCBib3JkZXIgYm9yZGVyLWN1cnJlbnQvMTUgYmctd2hpdGUvODAgcC0yIHRleHQteHNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkXCI+e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9GaWx0ZXJLZXlcIiwgXCJUaWNrZXRcIil9Ojwvc3Bhbj57XCIgXCJ9XG4gICAgICAgICAgICAgIDxzcGFuPntpdGVtLnRpY2tldElkIHx8IFwiLVwifTwvc3Bhbj5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTFcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0UmVhc29uXCIsIFwiTW90aXZvXCIpfTo8L3NwYW4+e1wiIFwifVxuICAgICAgICAgICAgICA8c3Bhbj57aXRlbS5yZWFzb24gfHwgXCItXCJ9PC9zcGFuPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gU2hvd3MgdGhlIGJhY2tlbmQgYnVsay1saW5rIHJlc3VsdCBzdW1tYXJ5LCBpbmNsdWRpbmcgcGFydGlhbCBza2lwcGVkIGFuZCBmYWlsZWQgcmVhc29ucy5cbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5rQnVsa1N1bW1hcnkgPSAoeyByZXN1bHQgfTogRXhwZW5zZVRpY2tldExpbmtCdWxrU3VtbWFyeVByb3BzKSA9PiB7XG4gIGlmICghcmVzdWx0KSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBzdW1tYXJ5Um93cyA9IFtcbiAgICB7XG4gICAgICBrZXk6IFwicmVxdWVzdGVkXCIsXG4gICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdFJlcXVlc3RlZFwiLCBcIlNvbGljaXRhZG9zXCIpLFxuICAgICAgdmFsdWU6IHJlc3VsdC5yZXF1ZXN0ZWRDb3VudCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogXCJsaW5rZWRcIixcbiAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0TGlua2VkXCIsIFwiVmluY3VsYWRvc1wiKSxcbiAgICAgIHZhbHVlOiByZXN1bHQubGlua2VkQ291bnQsXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6IFwic2tpcHBlZFwiLFxuICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRTa2lwcGVkXCIsIFwiT21pdGlkb3NcIiksXG4gICAgICB2YWx1ZTogcmVzdWx0LnNraXBwZWRDb3VudCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogXCJmYWlsZWRcIixcbiAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0RmFpbGVkXCIsIFwiRmFsbGlkb3NcIiksXG4gICAgICB2YWx1ZTogcmVzdWx0LmZhaWxlZENvdW50LFxuICAgIH0sXG4gIF07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIHNwYWNlLXktMyByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZS85NSBwLTNcIj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTkwMFwiPlxuICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVRpY2tldHNfTGlua01vZGVfUmVzdWx0VGl0bGVcIiwgXCJSZXN1bHRhZG8gZGUgdmluY3VsYWNpXHUwMEYzblwiKX1cbiAgICAgICAgPC9wPlxuICAgICAgICB7cmVzdWx0LmV4cGVuc2VTaGVldElkID8gKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC14cyB0ZXh0LXNsYXRlLTYwMFwiPlxuICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TaGVldFwiLCBcIkV4cGVuc2Ugc2hlZXRcIil9OiB7cmVzdWx0LmV4cGVuc2VTaGVldElkfVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yIHNtOmdyaWQtY29scy00XCI+XG4gICAgICAgIHtzdW1tYXJ5Um93cy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICA8ZGl2IGtleT17aXRlbS5rZXl9IGNsYXNzTmFtZT1cInJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXNsYXRlLTUwIHB4LTMgcHktMiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMTRlbV0gdGV4dC1zbGF0ZS01MDBcIj57aXRlbS5sYWJlbH08L3A+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xIHRleHQteGwgZm9udC1zZW1pYm9sZCB0ZXh0LXByaW1hcnlcIj57aXRlbS52YWx1ZX08L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBnYXAtMyBsZzpncmlkLWNvbHMtMlwiPlxuICAgICAgICA8RXhwZW5zZVRpY2tldExpbmtJc3N1ZUxpc3RcbiAgICAgICAgICB0aXRsZT17aW5kVChcIkV4cGVuc2VUaWNrZXRzX0xpbmtNb2RlX1Jlc3VsdFNraXBwZWRcIiwgXCJPbWl0aWRvc1wiKX1cbiAgICAgICAgICBpdGVtcz17QXJyYXkuaXNBcnJheShyZXN1bHQuc2tpcHBlZCkgPyByZXN1bHQuc2tpcHBlZCA6IFtdfVxuICAgICAgICAgIHRvbmVDbGFzc05hbWU9XCJib3JkZXItYW1iZXItMjAwIGJnLWFtYmVyLTUwIHRleHQtYW1iZXItOTAwXCJcbiAgICAgICAgLz5cbiAgICAgICAgPEV4cGVuc2VUaWNrZXRMaW5rSXNzdWVMaXN0XG4gICAgICAgICAgdGl0bGU9e2luZFQoXCJFeHBlbnNlVGlja2V0c19MaW5rTW9kZV9SZXN1bHRGYWlsZWRcIiwgXCJGYWxsaWRvc1wiKX1cbiAgICAgICAgICBpdGVtcz17QXJyYXkuaXNBcnJheShyZXN1bHQuZmFpbGVkKSA/IHJlc3VsdC5mYWlsZWQgOiBbXX1cbiAgICAgICAgICB0b25lQ2xhc3NOYW1lPVwiYm9yZGVyLXJvc2UtMjAwIGJnLXJvc2UtNTAgdGV4dC1yb3NlLTkwMFwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRMaW5rQnVsa1N1bW1hcnk7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBBdXRoTWFuYWdlZFVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IEhpc3RvcnlTdW1tYXJ5IGZyb20gXCIuLi8uLi92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5U3VtbWFyeS50c3hcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQge1xuICBnZXRFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyT3B0aW9ucyxcbiAgbm9ybWFsaXplRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUsXG4gIHR5cGUgRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUsXG59IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0UHJvY2Vzc2VkQnlJYUZpbHRlciwgRXhwZW5zZVRpY2tldFF1aWNrRmlsdGVySWQgfSBmcm9tIFwiLi4vdGlja2V0cy9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdC50c3hcIjtcbmltcG9ydCBFeHBlbnNlRGF0ZVJhbmdlRmlsdGVyIGZyb20gXCIuL0V4cGVuc2VEYXRlUmFuZ2VGaWx0ZXIudHN4XCI7XG5pbXBvcnQgRXhwZW5zZUZpbHRlckFjdGlvbnMgZnJvbSBcIi4vRXhwZW5zZUZpbHRlckFjdGlvbnMudHN4XCI7XG5pbXBvcnQgRXhwZW5zZU1hbmFnZWRVc2VyRmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdC50c3hcIjtcbmltcG9ydCBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdC50c3hcIjtcbmltcG9ydCBFeHBlbnNlUXVpY2tEYXRlRmlsdGVycyBmcm9tIFwiLi9FeHBlbnNlUXVpY2tEYXRlRmlsdGVycy50c3hcIjtcbmltcG9ydCBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQgZnJvbSBcIi4vRXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0LnRzeFwiO1xuXG5jb25zdCBwYXJzZUlzb0RhdGUgPSAocmF3OiBzdHJpbmcpOiBEYXRlIHwgbnVsbCA9PiB7XG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3KS50cmltKCkuc3BsaXQoXCJUXCIpWzBdO1xuICBpZiAoIS9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KHZhbHVlKSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IHZhbHVlLnNwbGl0KFwiLVwiKS5tYXAoTnVtYmVyKTtcbiAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcbn07XG5cbmNvbnN0IGZvcm1hdERhdGUgPSAocmF3OiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZGF0ZSA9IHBhcnNlSXNvRGF0ZShyYXcpO1xuICBpZiAoIWRhdGUpIHJldHVybiBcIi0tXCI7XG4gIHJldHVybiBkYXRlXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHtcbiAgICAgIGRheTogXCJudW1lcmljXCIsXG4gICAgICBtb250aDogXCJzaG9ydFwiLFxuICAgICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgfSlcbiAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXG4gICAgLnRvTG93ZXJDYXNlKCk7XG59O1xuXG50eXBlIEV4cGVuc2VUaWNrZXRzRmlsdGVyc1BhbmVsUHJvcHMgPSB7XG4gIG1vZGU6IFwiZ2VuZXJhbFwiIHwgXCJsaW5rXCI7XG4gIHZpc2libGU6IGJvb2xlYW47XG4gIHNob3dNYW51YWxEYXRlRmlsdGVyOiBib29sZWFuO1xuICBtYW51YWxEYXRlQXV0b09wZW5LZXk6IG51bWJlcjtcbiAgZnJvbURhdGU6IHN0cmluZztcbiAgdG9EYXRlOiBzdHJpbmc7XG4gIGZpbHRlcktleTogc3RyaW5nO1xuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgbWFuYWdlZFVzZXJJZDogc3RyaW5nO1xuICBtYW5hZ2VkVXNlcnM6IEF1dGhNYW5hZ2VkVXNlcltdO1xuICBzaG93TWFuYWdlZFVzZXJGaWx0ZXI6IGJvb2xlYW47XG4gIHN0YXR1c0ZpbHRlcjogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGU7XG4gIGdhc3RvVHlwZUZpbHRlcjogXCJcIiB8IEV4cGVuc2VHYXN0b1R5cGVDb2RlO1xuICBwcm9jZXNzZWRCeUlhRmlsdGVyOiBFeHBlbnNlVGlja2V0UHJvY2Vzc2VkQnlJYUZpbHRlcjtcbiAgYWN0aXZlUXVpY2tGaWx0ZXI6IEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkIHwgbnVsbDtcbiAgc2hvd01hbnVhbERhdGVFcnJvcjogYm9vbGVhbjtcbiAgc3RhdHVzRmlsdGVyUmVhZE9ubHk/OiBib29sZWFuO1xuICBmaXhlZFN0YXR1c0ZpbHRlcj86IDAgfCAxIHwgbnVsbDtcbiAgZ2FzdG9UeXBlT3B0aW9uczogRXhwZW5zZVNlbGVjdE9wdGlvbltdO1xuICBvbkRhdGVSYW5nZUNoYW5nZTogKGZyb21EYXRlOiBzdHJpbmcsIHRvRGF0ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbk1hbnVhbFJhbmdlQ29tcGxldGU6IChmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25RdWlja0ZpbHRlckNoYW5nZTogKGZpbHRlcklkOiBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCkgPT4gdm9pZDtcbiAgb25GaWx0ZXJLZXlDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uTWFuYWdlZFVzZXJJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uU3RhdHVzRmlsdGVyQ2hhbmdlOiAodmFsdWU6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlKSA9PiB2b2lkO1xuICBvbkdhc3RvVHlwZUZpbHRlckNoYW5nZTogKHZhbHVlOiBcIlwiIHwgRXhwZW5zZUdhc3RvVHlwZUNvZGUpID0+IHZvaWQ7XG4gIG9uUHJvY2Vzc2VkQnlJYUZpbHRlckNoYW5nZTogKHZhbHVlOiBFeHBlbnNlVGlja2V0UHJvY2Vzc2VkQnlJYUZpbHRlcikgPT4gdm9pZDtcbiAgb25DbGVhcjogKCkgPT4gdm9pZDtcbiAgb25BcHBseTogKCkgPT4gdm9pZDtcbn07XG5cbi8vIFNoYXJlZCB0aWNrZXRzIGZpbHRlciBwYW5lbCB3aXRoIGdsb2JhbCBxdWljayBkYXRlIGZpbHRlcnMgYW5kIGZpeGVkIHRpY2tldCBmaWx0ZXJzLlxuY29uc3QgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWwgPSAoe1xuICBtb2RlLFxuICB2aXNpYmxlLFxuICBzaG93TWFudWFsRGF0ZUZpbHRlcixcbiAgbWFudWFsRGF0ZUF1dG9PcGVuS2V5LFxuICBmcm9tRGF0ZSxcbiAgdG9EYXRlLFxuICBmaWx0ZXJLZXksXG4gIGN1cnJlbmN5Q29kZSxcbiAgbWFuYWdlZFVzZXJJZCxcbiAgbWFuYWdlZFVzZXJzLFxuICBzaG93TWFuYWdlZFVzZXJGaWx0ZXIsXG4gIHN0YXR1c0ZpbHRlcixcbiAgZ2FzdG9UeXBlRmlsdGVyLFxuICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxuICBhY3RpdmVRdWlja0ZpbHRlcixcbiAgc2hvd01hbnVhbERhdGVFcnJvcixcbiAgc3RhdHVzRmlsdGVyUmVhZE9ubHkgPSBmYWxzZSxcbiAgZml4ZWRTdGF0dXNGaWx0ZXIgPSBudWxsLFxuICBnYXN0b1R5cGVPcHRpb25zLFxuICBvbkRhdGVSYW5nZUNoYW5nZSxcbiAgb25NYW51YWxSYW5nZUNvbXBsZXRlLFxuICBvblF1aWNrRmlsdGVyQ2hhbmdlLFxuICBvbkZpbHRlcktleUNoYW5nZSxcbiAgb25DdXJyZW5jeUNvZGVDaGFuZ2UsXG4gIG9uTWFuYWdlZFVzZXJJZENoYW5nZSxcbiAgb25TdGF0dXNGaWx0ZXJDaGFuZ2UsXG4gIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlLFxuICBvblByb2Nlc3NlZEJ5SWFGaWx0ZXJDaGFuZ2UsXG4gIG9uQ2xlYXIsXG4gIG9uQXBwbHksXG59OiBFeHBlbnNlVGlja2V0c0ZpbHRlcnNQYW5lbFByb3BzKSA9PiB7XG4gIGNvbnN0IHN0YXR1c09wdGlvbnMgPSB1c2VNZW1vKCgpID0+IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJPcHRpb25zKCksIFtdKTtcblxuICBjb25zdCBjYXRlZ29yeU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4ge1xuICAgIHJldHVybiBbXG4gICAgICB7IHZhbHVlOiBcIlwiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfQWxsXCIsIFwiQWxsXCIpIH0sXG4gICAgICAuLi5nYXN0b1R5cGVPcHRpb25zLFxuICAgIF07XG4gIH0sIFtnYXN0b1R5cGVPcHRpb25zXSk7XG5cbiAgaWYgKCF2aXNpYmxlKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgbG9jYWxlID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCI7XG4gIGNvbnN0IHNob3dJbmxpbmVEYXRlU3VtbWFyeSA9ICFzaG93TWFudWFsRGF0ZUZpbHRlciAmJiAhIWZyb21EYXRlICYmICEhdG9EYXRlO1xuICBjb25zdCBzaG93U3RhdHVzRmlsdGVyID0gbW9kZSA9PT0gXCJnZW5lcmFsXCI7XG4gIGNvbnN0IGRlc2t0b3BDb2x1bW5zQ2xhc3NOYW1lID0gc2hvd01hbmFnZWRVc2VyRmlsdGVyXG4gICAgPyAoc2hvd1N0YXR1c0ZpbHRlciA/IFwibGc6Z3JpZC1jb2xzLTZcIiA6IFwibGc6Z3JpZC1jb2xzLTVcIilcbiAgICA6IChzaG93U3RhdHVzRmlsdGVyID8gXCJsZzpncmlkLWNvbHMtNVwiIDogXCJsZzpncmlkLWNvbHMtNFwiKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLWV4cGFuZGVkIHAtMiBzbTpwLTIuNSByZWxhdGl2ZVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdGFjayBmbGV4IGZsZXgtY29sIHNwYWNlLXktMlwiPlxuICAgICAgICA8RXhwZW5zZVF1aWNrRGF0ZUZpbHRlcnMgYWN0aXZlUXVpY2tGaWx0ZXI9e2FjdGl2ZVF1aWNrRmlsdGVyfSBvblF1aWNrRmlsdGVyQ2hhbmdlPXtvblF1aWNrRmlsdGVyQ2hhbmdlfSAvPlxuXG4gICAgICAgIHtzaG93TWFudWFsRGF0ZUZpbHRlciA/IChcbiAgICAgICAgICA8RXhwZW5zZURhdGVSYW5nZUZpbHRlclxuICAgICAgICAgICAgZnJvbURhdGU9e2Zyb21EYXRlfVxuICAgICAgICAgICAgdG9EYXRlPXt0b0RhdGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25EYXRlUmFuZ2VDaGFuZ2V9XG4gICAgICAgICAgICBvblJhbmdlQ29tcGxldGU9e29uTWFudWFsUmFuZ2VDb21wbGV0ZX1cbiAgICAgICAgICAgIGF1dG9PcGVuUmVxdWVzdElkPXttYW51YWxEYXRlQXV0b09wZW5LZXl9XG4gICAgICAgICAgICBzaG93TWFudWFsRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3J9XG4gICAgICAgICAgICBzaG93U3RhcnRFcnJvcj17c2hvd01hbnVhbERhdGVFcnJvciAmJiAhZnJvbURhdGV9XG4gICAgICAgICAgICBzaG93RW5kRXJyb3I9e3Nob3dNYW51YWxEYXRlRXJyb3IgJiYgIXRvRGF0ZX1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogc2hvd0lubGluZURhdGVTdW1tYXJ5ID8gKFxuICAgICAgICAgIDxIaXN0b3J5U3VtbWFyeVxuICAgICAgICAgICAgc3VtbWFyeUZyb21MYWJlbD17aW5kVChcIkhpc3RvcnlfRnJvbVwiLCBcIkZyb21cIil9XG4gICAgICAgICAgICBzdW1tYXJ5VG9MYWJlbD17aW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKX1cbiAgICAgICAgICAgIGZyb21WYWx1ZT17Zm9ybWF0RGF0ZShmcm9tRGF0ZSwgbG9jYWxlKX1cbiAgICAgICAgICAgIHRvVmFsdWU9e2Zvcm1hdERhdGUodG9EYXRlLCBsb2NhbGUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ2FwLXktMSB0ZXh0LVsxMXB4XSBweC0xXCJcbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgJHtkZXNrdG9wQ29sdW1uc0NsYXNzTmFtZX0gZ2FwLTJgfT5cbiAgICAgICAgICA8RXhwZW5zZVRpY2tldEZpbHRlcktleUlucHV0XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX0ZpbHRlcktleVwiLCBcIlRpY2tldFwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfRmlsdGVyS2V5XCIsIFwiVGlja2V0XCIpfVxuICAgICAgICAgICAgdmFsdWU9e2ZpbHRlcktleX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkZpbHRlcktleUNoYW5nZX1cbiAgICAgICAgICAgIG1vZGU9e21vZGV9XG4gICAgICAgICAgICBjcmVhdGVkRGF0ZUZyb209e2Zyb21EYXRlfVxuICAgICAgICAgICAgY3JlYXRlZERhdGVUbz17dG9EYXRlfVxuICAgICAgICAgICAgZW5hYmxlUmVtb3RlU3VnZ2VzdGlvbnNcbiAgICAgICAgICAgIGZpeGVkU3RhdHVzRmlsdGVyPXttb2RlID09PSBcImdlbmVyYWxcIiA/IGZpeGVkU3RhdHVzRmlsdGVyIDogbnVsbH1cbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtjdXJyZW5jeUNvZGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25DdXJyZW5jeUNvZGVDaGFuZ2V9XG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgc2hvd0xvYWRpbmdTdGF0ZVRleHQ9e2ZhbHNlfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICB7c2hvd01hbmFnZWRVc2VyRmlsdGVyID8gKFxuICAgICAgICAgICAgPEV4cGVuc2VNYW5hZ2VkVXNlckZpbHRlclNlbGVjdFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkNvbW1vbl9Vc2VyXCIsIFwiVXNlclwiKX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJDb21tb25fVXNlclwiLCBcIlVzZXJcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXttYW5hZ2VkVXNlcklkfVxuICAgICAgICAgICAgICB1c2Vycz17bWFuYWdlZFVzZXJzfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25NYW5hZ2VkVXNlcklkQ2hhbmdlfVxuICAgICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgIHtzaG93U3RhdHVzRmlsdGVyID8gKFxuICAgICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX1N0YXR1c1wiLCBcIlN0YXR1c1wiKX1cbiAgICAgICAgICAgICAgb3B0aW9ucz17c3RhdHVzT3B0aW9uc31cbiAgICAgICAgICAgICAgdmFsdWU9e3N0YXR1c0ZpbHRlcn1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IG9uU3RhdHVzRmlsdGVyQ2hhbmdlKG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlKG5leHRWYWx1ZSwgXCJcIikpfVxuICAgICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtzdGF0dXNGaWx0ZXJSZWFkT25seX1cbiAgICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS10aWNrZXQtc3RhdHVzLWZpbHRlclwiXG4gICAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cbiAgICAgICAgICAgIG9wdGlvbnM9e2NhdGVnb3J5T3B0aW9uc31cbiAgICAgICAgICAgIHZhbHVlPXtnYXN0b1R5cGVGaWx0ZXJ9XG4gICAgICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBOdW1iZXIobmV4dFZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKG5leHRWYWx1ZSA9PT0gXCJcIiB8fCAhTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpKSB7XG4gICAgICAgICAgICAgICAgb25HYXN0b1R5cGVGaWx0ZXJDaGFuZ2UoXCJcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG9uR2FzdG9UeXBlRmlsdGVyQ2hhbmdlKHBhcnNlZCBhcyBFeHBlbnNlR2FzdG9UeXBlQ29kZSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS10aWNrZXQtZ2FzdG90eXBlLWZpbHRlclwiXG4gICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEV4cGVuc2VQcm9jZXNzZWRCeUlhRmlsdGVyU2VsZWN0XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFcIiwgXCJQcm9jZXNzZWQgYnkgSUFcIil9XG4gICAgICAgICAgICB2YWx1ZT17cHJvY2Vzc2VkQnlJYUZpbHRlcn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvblByb2Nlc3NlZEJ5SWFGaWx0ZXJDaGFuZ2V9XG4gICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxFeHBlbnNlRmlsdGVyQWN0aW9uc1xuICAgICAgICAgIGNsZWFyTGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGVhclwiLCBcIkNsZWFyXCIpfVxuICAgICAgICAgIGFwcGx5TGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9BcHBseVwiLCBcIkFwcGx5XCIpfVxuICAgICAgICAgIG9uQ2xlYXI9e29uQ2xlYXJ9XG4gICAgICAgICAgb25BcHBseT17b25BcHBseX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldHNGaWx0ZXJzUGFuZWw7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldFByb2Nlc3NlZEJ5SWFGaWx0ZXIgfSBmcm9tIFwiLi4vdGlja2V0cy9leHBlbnNlVGlja2V0TGlzdFR5cGVzLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3RQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmFsdWU6IEV4cGVuc2VUaWNrZXRQcm9jZXNzZWRCeUlhRmlsdGVyO1xuICBvbkNoYW5nZTogKHZhbHVlOiBFeHBlbnNlVGlja2V0UHJvY2Vzc2VkQnlJYUZpbHRlcikgPT4gdm9pZDtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG59O1xuXG4vLyBGaXhlZCBlbnVtIHNlbGVjdCBmb3IgSUEgcHJvY2Vzc2luZyBmaWx0ZXIgd2l0aCBBbGwvWWVzL05vIG9wdGlvbnMuXG5jb25zdCBFeHBlbnNlUHJvY2Vzc2VkQnlJYUZpbHRlclNlbGVjdCA9ICh7XG4gIGxhYmVsLFxuICBwbGFjZWhvbGRlcixcbiAgdmFsdWUsXG4gIG9uQ2hhbmdlLFxuICByZWFkT25seSA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICBzaG93TGFiZWwgPSB0cnVlLFxufTogRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3RQcm9wcykgPT4ge1xuICBjb25zdCB1aVZhbHVlID0gdmFsdWUgPT09IFwiYWxsXCIgPyBcIlwiIDogdmFsdWU7XG4gIGNvbnN0IG9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXG4gICAgKCkgPT4gW1xuICAgICAgeyB2YWx1ZTogXCJhbGxcIiwgdGV4dDogaW5kVChcIlRpY2tldHNfRmlsdGVyX0FsbFwiLCBcIkFsbFwiKSB9LFxuICAgICAgeyB2YWx1ZTogXCJ5ZXNcIiwgdGV4dDogaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFfWWVzXCIsIFwiWWVzXCIpIH0sXG4gICAgICB7IHZhbHVlOiBcIm5vXCIsIHRleHQ6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBX05vXCIsIFwiTm9cIikgfSxcbiAgICBdLFxuICAgIFtdXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICB2YWx1ZT17dWlWYWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChuZXh0VmFsdWUgPT09IFwieWVzXCIgfHwgbmV4dFZhbHVlID09PSBcIm5vXCIgfHwgbmV4dFZhbHVlID09PSBcImFsbFwiKSB7XG4gICAgICAgICAgb25DaGFuZ2UobmV4dFZhbHVlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgb25DaGFuZ2UoXCJhbGxcIik7XG4gICAgICB9fVxuICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgaWRCYXNlPVwiZXhwZW5zZS1wcm9jZXNzZWQtYnktaWEtZmlsdGVyXCJcbiAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVByb2Nlc3NlZEJ5SWFGaWx0ZXJTZWxlY3Q7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVtb3RlU2VhcmNoQ29tYm9ib3gsIHsgdHlwZSBSZW1vdGVTZWFyY2hPcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1JlbW90ZVNlYXJjaENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgdHlwZSB7XG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0byxcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0byxcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3QsIGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuXG50eXBlIEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG1vZGU/OiBcImdlbmVyYWxcIiB8IFwibGlua1wiO1xuICBjcmVhdGVkRGF0ZUZyb20/OiBzdHJpbmc7XG4gIGNyZWF0ZWREYXRlVG8/OiBzdHJpbmc7XG4gIGVuYWJsZVJlbW90ZVN1Z2dlc3Rpb25zPzogYm9vbGVhbjtcbiAgZml4ZWRTdGF0dXNGaWx0ZXI/OiAwIHwgMSB8IG51bGw7XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xufTtcblxuY29uc3QgU0VBUkNIX1BBR0VfU0laRSA9IDMwO1xuXG4vLyBCdWlsZHMgbWluaW1hbCBwYXlsb2FkIGZvciB0aWNrZXQga2V5IHN1Z2dlc3Rpb25zIHdpdGhvdXQgZGF0ZSBmaWx0ZXJzLlxuY29uc3QgYnVpbGRUaWNrZXRTdWdnZXN0UGF5bG9hZCA9IChcbiAgdGVybTogc3RyaW5nLFxuICBwYWdlOiBudW1iZXIsXG4gIHBhZ2VTaXplOiBudW1iZXIsXG4gIGZpeGVkU3RhdHVzRmlsdGVyOiAwIHwgMSB8IG51bGwsXG4gIGNyZWF0ZWREYXRlRnJvbTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICBjcmVhdGVkRGF0ZVRvOiBzdHJpbmcgfCB1bmRlZmluZWRcbik6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0IHwgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RSZXF1ZXN0ID0+IHtcbiAgY29uc3Qgc2FmZVRlcm0gPSBTdHJpbmcodGVybSB8fCBcIlwiKS50cmltKCk7XG4gIGNvbnN0IGJhc2VQYXlsb2FkID0ge1xuICAgIHBhZ2U6IE51bWJlci5pc0Zpbml0ZShwYWdlKSAmJiBwYWdlID4gMCA/IE1hdGguZmxvb3IocGFnZSkgOiAxLFxuICAgIHBhZ2VTaXplOiBOdW1iZXIuaXNGaW5pdGUocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCA/IE1hdGguZmxvb3IocGFnZVNpemUpIDogU0VBUkNIX1BBR0VfU0laRSxcbiAgICBjcmVhdGVkRGF0ZUZyb206IGNyZWF0ZWREYXRlRnJvbSB8fCB1bmRlZmluZWQsXG4gICAgY3JlYXRlZERhdGVUbzogY3JlYXRlZERhdGVUbyB8fCB1bmRlZmluZWQsXG4gICAgc2VhcmNoS2V5OiBzYWZlVGVybSB8fCB1bmRlZmluZWQsXG4gICAgZmlsdGVyOiBzYWZlVGVybSB8fCB1bmRlZmluZWQsXG4gIH07XG5cbiAgaWYgKGZpeGVkU3RhdHVzRmlsdGVyID09PSAwIHx8IGZpeGVkU3RhdHVzRmlsdGVyID09PSAxKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmJhc2VQYXlsb2FkLFxuICAgICAgc3RhdHVzOiBmaXhlZFN0YXR1c0ZpbHRlcixcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGJhc2VQYXlsb2FkO1xufTtcblxuY29uc3QgbWFwVGlja2V0T3B0aW9ucyA9IChcbiAgaXRlbXM6IEFycmF5PEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvIHwgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvPiB8IHVuZGVmaW5lZFxuKTogUmVtb3RlU2VhcmNoT3B0aW9uW10gPT4ge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkoaXRlbXMpID8gaXRlbXMgOiBbXSlcbiAgICAubWFwKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBmaWxlSWQgPSBTdHJpbmcoaXRlbT8uRmlsZUlkIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGlmICghZmlsZUlkKSByZXR1cm4gbnVsbDtcblxuICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBTdHJpbmcoaXRlbT8uRGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpO1xuICAgICAgY29uc3Qgc3VidGl0bGUgPSBkZXNjcmlwdGlvbiB8fCBcIi1cIjtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBmaWxlSWQsXG4gICAgICAgIHRpdGxlOiBmaWxlSWQsXG4gICAgICAgIHN1YnRpdGxlLFxuICAgICAgfSBhcyBSZW1vdGVTZWFyY2hPcHRpb247XG4gICAgfSlcbiAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFJlbW90ZVNlYXJjaE9wdGlvbltdO1xufTtcblxuLy8gVGlja2V0IGtleSBmaWx0ZXIgaW5wdXQgd2l0aCByZW1vdGUgbGlzdCBzdWdnZXN0aW9ucy5cbmNvbnN0IEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dCA9ICh7XG4gIGxhYmVsLFxuICBwbGFjZWhvbGRlcixcbiAgdmFsdWUsXG4gIG9uQ2hhbmdlLFxuICBtb2RlID0gXCJnZW5lcmFsXCIsXG4gIGNyZWF0ZWREYXRlRnJvbSA9IFwiXCIsXG4gIGNyZWF0ZWREYXRlVG8gPSBcIlwiLFxuICBlbmFibGVSZW1vdGVTdWdnZXN0aW9ucyA9IHRydWUsXG4gIGZpeGVkU3RhdHVzRmlsdGVyID0gbnVsbCxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbn06IEV4cGVuc2VUaWNrZXRGaWx0ZXJLZXlJbnB1dFByb3BzKSA9PiB7XG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xuXG4gIGNvbnN0IGxvYWRPcHRpb25zID0gdXNlQ2FsbGJhY2soYXN5bmMgKHRlcm06IHN0cmluZywgc2lnbmFsOiBBYm9ydFNpZ25hbCk6IFByb21pc2U8UmVtb3RlU2VhcmNoT3B0aW9uW10+ID0+IHtcbiAgICBjb25zdCBwYXlsb2FkID0gYnVpbGRUaWNrZXRTdWdnZXN0UGF5bG9hZCh0ZXJtLCAxLCBTRUFSQ0hfUEFHRV9TSVpFLCBmaXhlZFN0YXR1c0ZpbHRlciwgY3JlYXRlZERhdGVGcm9tLCBjcmVhdGVkRGF0ZVRvKTtcbiAgICBjb25zdCByZXNwb25zZSA9XG4gICAgICBtb2RlID09PSBcImxpbmtcIlxuICAgICAgICA/IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3QocGF5bG9hZCBhcyBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QsIHtcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgc2lnbmFsLFxuICAgICAgICAgIH0pXG4gICAgICAgIDogYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdChwYXlsb2FkIGFzIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LCB7XG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHNpZ25hbCxcbiAgICAgICAgICB9KTtcblxuICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwVGlja2V0T3B0aW9ucyhyZXNwb25zZT8uSXRlbXMpO1xuICB9LCBbY3JlYXRlZERhdGVGcm9tLCBjcmVhdGVkRGF0ZVRvLCBmaXhlZFN0YXR1c0ZpbHRlciwgbW9kZV0pO1xuXG4gIGNvbnN0IGxvYWRPcHRpb25zUGFnZSA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHBhZ2U6IG51bWJlciwgX3BhZ2VTaXplOiBudW1iZXIsIHNpZ25hbDogQWJvcnRTaWduYWwpID0+IHtcbiAgICBjb25zdCBwYXlsb2FkID0gYnVpbGRUaWNrZXRTdWdnZXN0UGF5bG9hZChcbiAgICAgIHRlcm0sXG4gICAgICBwYWdlLFxuICAgICAgU0VBUkNIX1BBR0VfU0laRSxcbiAgICAgIGZpeGVkU3RhdHVzRmlsdGVyLFxuICAgICAgY3JlYXRlZERhdGVGcm9tLFxuICAgICAgY3JlYXRlZERhdGVUb1xuICAgICk7XG4gICAgY29uc3QgcmVzcG9uc2UgPVxuICAgICAgbW9kZSA9PT0gXCJsaW5rXCJcbiAgICAgICAgPyBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0KHBheWxvYWQgYXMgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RSZXF1ZXN0LCB7XG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHNpZ25hbCxcbiAgICAgICAgICB9KVxuICAgICAgICA6IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QocGF5bG9hZCBhcyBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCwge1xuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgICBzaWduYWwsXG4gICAgICAgICAgfSk7XG5cbiAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIHRvdGFsOiAwLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IG1hcFRpY2tldE9wdGlvbnMocmVzcG9uc2U/Lkl0ZW1zKSxcbiAgICAgIHRvdGFsOiBOdW1iZXIocmVzcG9uc2U/LlRvdGFsIHx8IDApLFxuICAgIH07XG4gIH0sIFtjcmVhdGVkRGF0ZUZyb20sIGNyZWF0ZWREYXRlVG8sIGZpeGVkU3RhdHVzRmlsdGVyLCBtb2RlXSk7XG5cbiAgaWYgKCFlbmFibGVSZW1vdGVTdWdnZXN0aW9ucyB8fCByZWFkT25seU1vZGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAge3Nob3dMYWJlbCA/IChcbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgc3R5bGU9e3sgY29sb3I6IFwiIzAwMjk2YmUwXCIgfX0+XG4gICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHB4LTMgcHktMiB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgdGV4dC1zbGF0ZS05MDAgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiXG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxuICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8UmVtb3RlU2VhcmNoQ29tYm9ib3hcbiAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgIG9uU2VhcmNoPXthc3luYyAodGVybSwgc2lnbmFsKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGxvYWRPcHRpb25zKHRlcm0sIHNpZ25hbCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICAgIG9uU2VhcmNoUGFnZT17YXN5bmMgKHRlcm0sIHBhZ2UsIHBhZ2VTaXplLCBzaWduYWwpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbG9hZE9wdGlvbnNQYWdlKHRlcm0sIHBhZ2UsIHBhZ2VTaXplLCBzaWduYWwpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGl0ZW1zOiBbXSwgdG90YWw6IDAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH19XG4gICAgICBpZEJhc2U9XCJleHBlbnNlLXRpY2tldC1maWx0ZXIta2V5XCJcbiAgICAgIG1pblNlYXJjaExlbmd0aD17MH1cbiAgICAgIHBhZ2VTaXplPXtTRUFSQ0hfUEFHRV9TSVpFfVxuICAgICAgYWxsb3dFbXB0eVNlYXJjaFxuICAgICAgbG9hZE9uT3BlblxuICAgICAgaW5maW5pdGVTY3JvbGxcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxuICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0RmlsdGVyS2V5SW5wdXQ7XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcbiAgRXhwZW5zZVRpY2tldFF1aWNrRmlsdGVySWQsXG59IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaXN0VHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlVGlja2V0U3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHsgc3RhcnRPZkRheSwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBub3JtYWxpemVFeHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QudHNcIjtcblxudHlwZSBVc2VFeHBlbnNlVGlja2V0c0ZpbHRlcnNTdGF0ZUFyZ3MgPSB7XG4gIG9uQXBwbHlGaWx0ZXJzOiAoc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QpID0+IHZvaWQ7XG4gIG9uQ2xlYXJGaWx0ZXJzOiAoKSA9PiB2b2lkO1xuICBkZWZhdWx0TWFuYWdlZFVzZXJJZDogc3RyaW5nO1xuICBmaXhlZFN0YXR1c0ZpbHRlcj86IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlIHwgbnVsbDtcbiAgYWxsb3dFbXB0eURhdGVzT25BcHBseT86IGJvb2xlYW47XG59O1xuXG4vLyBPd25zIGZpbHRlciBVSSBzdGF0ZSBhbmQgYXBwbHkvY2xlYXIgcnVsZXMgZm9yIGV4cGVuc2UgdGlja2V0cyBsaXN0IHBhZ2UuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJzU3RhdGUgPSAoe1xuICBvbkFwcGx5RmlsdGVycyxcbiAgb25DbGVhckZpbHRlcnMsXG4gIGRlZmF1bHRNYW5hZ2VkVXNlcklkLFxuICBmaXhlZFN0YXR1c0ZpbHRlciA9IG51bGwsXG4gIGFsbG93RW1wdHlEYXRlc09uQXBwbHkgPSBmYWxzZSxcbn06IFVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyc1N0YXRlQXJncykgPT4ge1xuICBjb25zdCBoYXNGaXhlZFN0YXR1c0ZpbHRlciA9IGZpeGVkU3RhdHVzRmlsdGVyID09PSAwIHx8IGZpeGVkU3RhdHVzRmlsdGVyID09PSAxO1xuXG4gIGNvbnN0IHJlc29sdmVTdGF0dXNGaWx0ZXIgPSB1c2VDYWxsYmFjayhcbiAgICAodmFsdWU6IEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlKTogRXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGUgPT4ge1xuICAgICAgaWYgKGhhc0ZpeGVkU3RhdHVzRmlsdGVyKSB7XG4gICAgICAgIHJldHVybiBmaXhlZFN0YXR1c0ZpbHRlciBhcyBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIFtmaXhlZFN0YXR1c0ZpbHRlciwgaGFzRml4ZWRTdGF0dXNGaWx0ZXJdXG4gICk7XG5cbiAgY29uc3QgW2Zyb21EYXRlLCBzZXRGcm9tRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3RvRGF0ZSwgc2V0VG9EYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZmlsdGVyS2V5LCBzZXRGaWx0ZXJLZXldID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtjdXJyZW5jeUNvZGUsIHNldEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW21hbmFnZWRVc2VySWQsIHNldE1hbmFnZWRVc2VySWRdID0gdXNlU3RhdGUoZGVmYXVsdE1hbmFnZWRVc2VySWQpO1xuICBjb25zdCBbc3RhdHVzRmlsdGVyUmF3LCBzZXRTdGF0dXNGaWx0ZXJSYXddID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldFN0YXR1c0ZpbHRlckNvZGU+KHJlc29sdmVTdGF0dXNGaWx0ZXIoXCJcIikpO1xuICBjb25zdCBbZ2FzdG9UeXBlRmlsdGVyLCBzZXRHYXN0b1R5cGVGaWx0ZXJdID0gdXNlU3RhdGU8XCJcIiB8IEV4cGVuc2VHYXN0b1R5cGVDb2RlPihcIlwiKTtcbiAgY29uc3QgW3Byb2Nlc3NlZEJ5SWFGaWx0ZXIsIHNldFByb2Nlc3NlZEJ5SWFGaWx0ZXJdID0gdXNlU3RhdGU8XCJhbGxcIiB8IFwieWVzXCIgfCBcIm5vXCI+KFwiYWxsXCIpO1xuICBjb25zdCBbYWN0aXZlUXVpY2tGaWx0ZXIsIHNldEFjdGl2ZVF1aWNrRmlsdGVyXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXRRdWlja0ZpbHRlcklkIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzaG93TWFudWFsRGF0ZUZpbHRlciwgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXJdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd01hbnVhbERhdGVFcnJvciwgc2V0U2hvd01hbnVhbERhdGVFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttYW51YWxEYXRlQXV0b09wZW5LZXksIHNldE1hbnVhbERhdGVBdXRvT3BlbktleV0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2FwcGxpZWRGaWx0ZXJzLCBzZXRBcHBsaWVkRmlsdGVyc10gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzaG93RmlsdGVycywgc2V0U2hvd0ZpbHRlcnNdID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWhhc0ZpeGVkU3RhdHVzRmlsdGVyKSByZXR1cm47XG4gICAgc2V0U3RhdHVzRmlsdGVyUmF3KGZpeGVkU3RhdHVzRmlsdGVyIGFzIEV4cGVuc2VUaWNrZXRTdGF0dXNGaWx0ZXJDb2RlKTtcbiAgfSwgW2ZpeGVkU3RhdHVzRmlsdGVyLCBoYXNGaXhlZFN0YXR1c0ZpbHRlcl0pO1xuXG4gIGNvbnN0IHN0YXR1c0ZpbHRlciA9IHJlc29sdmVTdGF0dXNGaWx0ZXIoc3RhdHVzRmlsdGVyUmF3KTtcblxuICBjb25zdCBjdXJyZW50RmlsdGVycyA9IHVzZU1lbW88RXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdD4oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZyb21EYXRlLFxuICAgICAgdG9EYXRlLFxuICAgICAgZmlsdGVyS2V5OiBmaWx0ZXJLZXkudHJpbSgpLFxuICAgICAgY3VycmVuY3lDb2RlOiBjdXJyZW5jeUNvZGUudHJpbSgpLFxuICAgICAgbWFuYWdlZFVzZXJJZDogbWFuYWdlZFVzZXJJZC50cmltKCksXG4gICAgICBzdGF0dXNGaWx0ZXIsXG4gICAgICBnYXN0b1R5cGVGaWx0ZXIsXG4gICAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxuICAgIH0pLFxuICAgIFtjdXJyZW5jeUNvZGUsIGZpbHRlcktleSwgZnJvbURhdGUsIGdhc3RvVHlwZUZpbHRlciwgbWFuYWdlZFVzZXJJZCwgcHJvY2Vzc2VkQnlJYUZpbHRlciwgc3RhdHVzRmlsdGVyLCB0b0RhdGVdXG4gICk7XG5cbiAgY29uc3Qgc2V0U3RhdHVzRmlsdGVyID0gdXNlQ2FsbGJhY2soXG4gICAgKHZhbHVlOiBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSkgPT4ge1xuICAgICAgaWYgKGhhc0ZpeGVkU3RhdHVzRmlsdGVyKSB7XG4gICAgICAgIHNldFN0YXR1c0ZpbHRlclJhdyhmaXhlZFN0YXR1c0ZpbHRlciBhcyBFeHBlbnNlVGlja2V0U3RhdHVzRmlsdGVyQ29kZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNldFN0YXR1c0ZpbHRlclJhdyh2YWx1ZSk7XG4gICAgfSxcbiAgICBbZml4ZWRTdGF0dXNGaWx0ZXIsIGhhc0ZpeGVkU3RhdHVzRmlsdGVyXVxuICApO1xuXG4gIGNvbnN0IG9uQXBwbHkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFhbGxvd0VtcHR5RGF0ZXNPbkFwcGx5ICYmICghZnJvbURhdGUgfHwgIXRvRGF0ZSkpIHtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IodHJ1ZSk7XG4gICAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcih0cnVlKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90ID0ge1xuICAgICAgZnJvbURhdGUsXG4gICAgICB0b0RhdGUsXG4gICAgICBmaWx0ZXJLZXk6IGZpbHRlcktleS50cmltKCksXG4gICAgICBjdXJyZW5jeUNvZGU6IGN1cnJlbmN5Q29kZS50cmltKCksXG4gICAgICBtYW5hZ2VkVXNlcklkOiBtYW5hZ2VkVXNlcklkLnRyaW0oKSxcbiAgICAgIHN0YXR1c0ZpbHRlcixcbiAgICAgIGdhc3RvVHlwZUZpbHRlcixcbiAgICAgIHByb2Nlc3NlZEJ5SWFGaWx0ZXIsXG4gICAgfTtcblxuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgIHNldEFwcGxpZWRGaWx0ZXJzKHNuYXBzaG90KTtcbiAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICAgIG9uQXBwbHlGaWx0ZXJzKHNuYXBzaG90KTtcbiAgfSwgW1xuICAgIGFsbG93RW1wdHlEYXRlc09uQXBwbHksXG4gICAgY3VycmVuY3lDb2RlLFxuICAgIGZpbHRlcktleSxcbiAgICBmcm9tRGF0ZSxcbiAgICBnYXN0b1R5cGVGaWx0ZXIsXG4gICAgbWFuYWdlZFVzZXJJZCxcbiAgICBvbkFwcGx5RmlsdGVycyxcbiAgICBwcm9jZXNzZWRCeUlhRmlsdGVyLFxuICAgIHN0YXR1c0ZpbHRlcixcbiAgICB0b0RhdGUsXG4gIF0pO1xuXG4gIC8vIFJlaHlkcmF0ZXMgdGlja2V0IGZpbHRlcnMgZnJvbSBhIGNhY2hlZCBzbmFwc2hvdCB3aGVuIHJldHVybmluZyBmcm9tIGRldGFpbC5cbiAgY29uc3QgcmVzdG9yZUFwcGxpZWRGaWx0ZXJzID0gdXNlQ2FsbGJhY2soXG4gICAgKHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiB7XG4gICAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZVRpY2tldEZpbHRlclNuYXBzaG90KHNuYXBzaG90KTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRTdGF0dXNGaWx0ZXIgPSByZXNvbHZlU3RhdHVzRmlsdGVyKG5vcm1hbGl6ZWQuc3RhdHVzRmlsdGVyKTtcbiAgICAgIGNvbnN0IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCA9IFN0cmluZyhub3JtYWxpemVkLm1hbmFnZWRVc2VySWQgfHwgZGVmYXVsdE1hbmFnZWRVc2VySWQpLnRyaW0oKTtcbiAgICAgIHNldEZyb21EYXRlKG5vcm1hbGl6ZWQuZnJvbURhdGUpO1xuICAgICAgc2V0VG9EYXRlKG5vcm1hbGl6ZWQudG9EYXRlKTtcbiAgICAgIHNldEZpbHRlcktleShub3JtYWxpemVkLmZpbHRlcktleSk7XG4gICAgICBzZXRDdXJyZW5jeUNvZGUobm9ybWFsaXplZC5jdXJyZW5jeUNvZGUpO1xuICAgICAgc2V0TWFuYWdlZFVzZXJJZChyZXN0b3JlZE1hbmFnZWRVc2VySWQpO1xuICAgICAgc2V0U3RhdHVzRmlsdGVyUmF3KG5vcm1hbGl6ZWRTdGF0dXNGaWx0ZXIpO1xuICAgICAgc2V0R2FzdG9UeXBlRmlsdGVyKG5vcm1hbGl6ZWQuZ2FzdG9UeXBlRmlsdGVyKTtcbiAgICAgIHNldFByb2Nlc3NlZEJ5SWFGaWx0ZXIobm9ybWFsaXplZC5wcm9jZXNzZWRCeUlhRmlsdGVyKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgICAgc2V0U2hvd01hbnVhbERhdGVFcnJvcihmYWxzZSk7XG4gICAgICBzZXRBcHBsaWVkRmlsdGVycyh7XG4gICAgICAgIC4uLm5vcm1hbGl6ZWQsXG4gICAgICAgIG1hbmFnZWRVc2VySWQ6IHJlc3RvcmVkTWFuYWdlZFVzZXJJZCxcbiAgICAgICAgc3RhdHVzRmlsdGVyOiBub3JtYWxpemVkU3RhdHVzRmlsdGVyLFxuICAgICAgfSk7XG4gICAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XG4gICAgfSxcbiAgICBbZGVmYXVsdE1hbmFnZWRVc2VySWQsIHJlc29sdmVTdGF0dXNGaWx0ZXJdXG4gICk7XG5cbiAgY29uc3Qgb25DbGVhciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRGcm9tRGF0ZShcIlwiKTtcbiAgICBzZXRUb0RhdGUoXCJcIik7XG4gICAgc2V0RmlsdGVyS2V5KFwiXCIpO1xuICAgIHNldEN1cnJlbmN5Q29kZShcIlwiKTtcbiAgICBzZXRNYW5hZ2VkVXNlcklkKGRlZmF1bHRNYW5hZ2VkVXNlcklkKTtcbiAgICBzZXRTdGF0dXNGaWx0ZXJSYXcocmVzb2x2ZVN0YXR1c0ZpbHRlcihcIlwiKSk7XG4gICAgc2V0R2FzdG9UeXBlRmlsdGVyKFwiXCIpO1xuICAgIHNldFByb2Nlc3NlZEJ5SWFGaWx0ZXIoXCJhbGxcIik7XG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XG4gICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIoZmFsc2UpO1xuICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgIHNldE1hbnVhbERhdGVBdXRvT3BlbktleSgwKTtcbiAgICBzZXRBcHBsaWVkRmlsdGVycyhudWxsKTtcbiAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcbiAgICBvbkNsZWFyRmlsdGVycygpO1xuICB9LCBbZGVmYXVsdE1hbmFnZWRVc2VySWQsIG9uQ2xlYXJGaWx0ZXJzLCByZXNvbHZlU3RhdHVzRmlsdGVyXSk7XG5cbiAgY29uc3Qgb25EYXRlUmFuZ2VDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAobmV4dEZyb21EYXRlOiBzdHJpbmcsIG5leHRUb0RhdGU6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgaGFzRnVsbFJhbmdlID0gISFuZXh0RnJvbURhdGUgJiYgISFuZXh0VG9EYXRlO1xuICAgICAgc2V0RnJvbURhdGUobmV4dEZyb21EYXRlKTtcbiAgICAgIHNldFRvRGF0ZShuZXh0VG9EYXRlKTtcbiAgICAgIGlmICghaGFzRnVsbFJhbmdlKSB7XG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKHRydWUpO1xuICAgICAgfVxuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgICBpZiAoc2hvd01hbnVhbERhdGVFcnJvcikge1xuICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKCFoYXNGdWxsUmFuZ2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW3Nob3dNYW51YWxEYXRlRXJyb3JdXG4gICk7XG5cbiAgY29uc3Qgb25NYW51YWxSYW5nZUNvbXBsZXRlID0gdXNlQ2FsbGJhY2soKG5leHRGcm9tRGF0ZTogc3RyaW5nLCBuZXh0VG9EYXRlOiBzdHJpbmcpID0+IHtcbiAgICBzZXRGcm9tRGF0ZShuZXh0RnJvbURhdGUpO1xuICAgIHNldFRvRGF0ZShuZXh0VG9EYXRlKTtcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICBzZXRTaG93TWFudWFsRGF0ZUZpbHRlcihmYWxzZSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBvblF1aWNrRmlsdGVyQ2hhbmdlID0gdXNlQ2FsbGJhY2soXG4gICAgKGZpbHRlcklkOiBFeHBlbnNlVGlja2V0UXVpY2tGaWx0ZXJJZCkgPT4ge1xuICAgICAgaWYgKGZpbHRlcklkID09PSBcImN1c3RvbVwiKSB7XG4gICAgICAgIGlmIChzaG93TWFudWFsRGF0ZUZpbHRlcikge1xuICAgICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICAgICAgICBzZXRTaG93TWFudWFsRGF0ZUVycm9yKGZhbHNlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgICAgc2V0U2hvd01hbnVhbERhdGVGaWx0ZXIodHJ1ZSk7XG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuICAgICAgICBzZXRNYW51YWxEYXRlQXV0b09wZW5LZXkoKHByZXZpb3VzKSA9PiBwcmV2aW91cyArIDEpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKGZpbHRlcklkKTtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICAgIHNldFNob3dNYW51YWxEYXRlRXJyb3IoZmFsc2UpO1xuXG4gICAgICBjb25zdCB0b2RheSA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoKSk7XG4gICAgICBjb25zdCBuZXh0RnJvbSA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJkYXlzLTdcIikge1xuICAgICAgICBuZXh0RnJvbS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDYpO1xuICAgICAgfSBlbHNlIGlmIChmaWx0ZXJJZCA9PT0gXCJkYXlzLTMwXCIpIHtcbiAgICAgICAgbmV4dEZyb20uc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAyOSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0RnJvbS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDg5KTtcbiAgICAgIH1cblxuICAgICAgc2V0RnJvbURhdGUodG9Jc29EYXRlKG5leHRGcm9tKSk7XG4gICAgICBzZXRUb0RhdGUodG9Jc29EYXRlKHRvZGF5KSk7XG4gICAgfSxcbiAgICBbc2hvd01hbnVhbERhdGVGaWx0ZXJdXG4gICk7XG5cbiAgY29uc3QgdG9nZ2xlRmlsdGVyUGFuZWwgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0U2hvd0ZpbHRlcnMoKHByZXZpb3VzKSA9PiB7XG4gICAgICBjb25zdCBuZXh0ID0gIXByZXZpb3VzO1xuICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgIHNldFNob3dNYW51YWxEYXRlRmlsdGVyKGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH0pO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBmcm9tRGF0ZSxcbiAgICB0b0RhdGUsXG4gICAgZmlsdGVyS2V5LFxuICAgIGN1cnJlbmN5Q29kZSxcbiAgICBtYW5hZ2VkVXNlcklkLFxuICAgIHN0YXR1c0ZpbHRlcixcbiAgICBnYXN0b1R5cGVGaWx0ZXIsXG4gICAgcHJvY2Vzc2VkQnlJYUZpbHRlcixcbiAgICBhY3RpdmVRdWlja0ZpbHRlcixcbiAgICBzaG93TWFudWFsRGF0ZUZpbHRlcixcbiAgICBzaG93TWFudWFsRGF0ZUVycm9yLFxuICAgIG1hbnVhbERhdGVBdXRvT3BlbktleSxcbiAgICBhcHBsaWVkRmlsdGVycyxcbiAgICBzaG93RmlsdGVycyxcbiAgICBjdXJyZW50RmlsdGVycyxcbiAgICBzZXRGaWx0ZXJLZXksXG4gICAgc2V0Q3VycmVuY3lDb2RlLFxuICAgIHNldE1hbmFnZWRVc2VySWQsXG4gICAgc2V0U3RhdHVzRmlsdGVyLFxuICAgIHNldEdhc3RvVHlwZUZpbHRlcixcbiAgICBzZXRQcm9jZXNzZWRCeUlhRmlsdGVyLFxuICAgIG9uQXBwbHksXG4gICAgb25DbGVhcixcbiAgICByZXN0b3JlQXBwbGllZEZpbHRlcnMsXG4gICAgb25EYXRlUmFuZ2VDaGFuZ2UsXG4gICAgb25NYW51YWxSYW5nZUNvbXBsZXRlLFxuICAgIG9uUXVpY2tGaWx0ZXJDaGFuZ2UsXG4gICAgdG9nZ2xlRmlsdGVyUGFuZWwsXG4gICAgc3RhdHVzRmlsdGVyTG9ja2VkOiBoYXNGaXhlZFN0YXR1c0ZpbHRlcixcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0LCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IGlzRXhwZW5zZUFib3J0TGlrZUVycm9yLCBydW5FeHBlbnNlUmVhZFJlcXVlc3RXaXRoUmV0cnkgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVJlcXVlc3RSZXRyeS50c1wiO1xuaW1wb3J0IHtcbiAgYnVpbGRFeHBlbnNlVGlja2V0TGlua0xpc3RQYXlsb2FkLFxuICBidWlsZEV4cGVuc2VUaWNrZXRMaXN0UGF5bG9hZCxcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VQYXlsb2FkQnVpbGRlcnMudHNcIjtcbmltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCxcbiAgRXhwZW5zZVRpY2tldENhcmQsXG4gIEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCxcbiAgRXhwZW5zZVRpY2tldExpc3RQYWdlSXRlbSxcbn0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VUaWNrZXRzTGlzdERhdGFBcmdzID0ge1xuICBoYXNBY2Nlc3M6IGJvb2xlYW47XG4gIHBhZ2VTaXplOiBudW1iZXI7XG4gIG1vZGU6IFwiZ2VuZXJhbFwiIHwgXCJsaW5rXCI7XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xufTtcblxuY29uc3QgQUxMT1dFRF9HQVNUT19UWVBFX0NPREVTID0gbmV3IFNldDxudW1iZXI+KFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0pO1xuY29uc3QgRVhQRU5TRV9USUNLRVRTX0xJU1RfTE9HX1BSRUZJWCA9IFwiW2V4cGVuc2UtdGlja2V0czpsaXN0XVwiO1xuXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c0xpc3RJbmZvID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUuaW5mbyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY29uc29sZS5pbmZvKEVYUEVOU0VfVElDS0VUU19MSVNUX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xuICB9XG59O1xuXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUud2FybiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY29uc29sZS53YXJuKEVYUEVOU0VfVElDS0VUU19MSVNUX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xuICB9XG59O1xuXG5jb25zdCBsb2dFeHBlbnNlVGlja2V0c0xpc3RFcnJvciA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBjb25zb2xlLmVycm9yKEVYUEVOU0VfVElDS0VUU19MSVNUX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xuICB9XG59O1xuXG5jb25zdCBidWlsZEV4cGVuc2VUaWNrZXRzRGVidWdTdGFjayA9IChsYWJlbDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgaWYgKHR5cGVvZiBFcnJvciAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gXCJcIjtcbiAgY29uc3QgcmF3U3RhY2sgPSBuZXcgRXJyb3IobGFiZWwpLnN0YWNrO1xuICBpZiAodHlwZW9mIHJhd1N0YWNrICE9PSBcInN0cmluZ1wiIHx8ICFyYXdTdGFjay50cmltKCkpIHJldHVybiBcIlwiO1xuICByZXR1cm4gcmF3U3RhY2tcbiAgICAuc3BsaXQoXCJcXG5cIilcbiAgICAuc2xpY2UoMCwgNilcbiAgICAuam9pbihcIlxcblwiKTtcbn07XG5cbmNvbnN0IHRvTnVsbGFibGVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcbn07XG5cbmNvbnN0IHRvTnVsbGFibGVCb29sID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB8IG51bGwgPT4ge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikgcmV0dXJuIHZhbHVlO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSByZXR1cm4gdmFsdWUgPT09IDEgPyB0cnVlIDogdmFsdWUgPT09IDAgPyBmYWxzZSA6IG51bGw7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBjb25zdCBub3JtYWxpemVkID0gdmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKG5vcm1hbGl6ZWQgPT09IFwidHJ1ZVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwiMVwiKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAobm9ybWFsaXplZCA9PT0gXCJmYWxzZVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwiMFwiKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCB0b051bGxhYmxlVGlja2V0U3RhdHVzID0gKHZhbHVlOiB1bmtub3duKTogMCB8IDEgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIHBhcnNlZCA9PT0gMCB8fCBwYXJzZWQgPT09IDEgPyBwYXJzZWQgOiBudWxsO1xufTtcblxuY29uc3QgdG9OdWxsYWJsZVRpY2tldEdhc3RvVHlwZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VHYXN0b1R5cGVDb2RlIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpIHx8ICFBTExPV0VEX0dBU1RPX1RZUEVfQ09ERVMuaGFzKHBhcnNlZCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBwYXJzZWQgYXMgRXhwZW5zZUdhc3RvVHlwZUNvZGU7XG59O1xuXG5jb25zdCBtYXBUaWNrZXRJdGVtVG9DYXJkID0gKGl0ZW06IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogRXhwZW5zZVRpY2tldENhcmQgPT4ge1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IFwiZ2VuZXJhbFwiLFxuICAgIGZpbGVJZDogU3RyaW5nKGl0ZW0/LkZpbGVJZCB8fCBcIlwiKS50cmltKCksXG4gICAgZGVzY3JpcHRpb246IFN0cmluZyhpdGVtPy5EZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXG4gICAgc3RhdHVzOiB0b051bGxhYmxlVGlja2V0U3RhdHVzKGl0ZW0/LlN0YXR1cyksXG4gICAgcHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woaXRlbT8uUHJvY2Vzc2VkQnlBSSksXG4gICAgY3VycmVuY3lDb2RlOiBTdHJpbmcoaXRlbT8uQ3VycmVuY3lDb2RlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICB0b3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtPy5Ub3RhbEFtb3VudCksXG4gICAgdHJhbnNEYXRlOiBTdHJpbmcoaXRlbT8uVHJhbnNEYXRlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICBmaWxlTmFtZTogU3RyaW5nKGl0ZW0/LkZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSxcbiAgICBnYXN0b1R5cGU6IHRvTnVsbGFibGVUaWNrZXRHYXN0b1R5cGUoaXRlbT8uR2FzdG9UeXBlID8/IGl0ZW0/Lmdhc3RvVHlwZSksXG4gIH07XG59O1xuXG5jb25zdCBtYXBUaWNrZXRMaW5rSXRlbVRvQ2FyZCA9IChpdGVtOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZCA9PiB7XG4gIHJldHVybiB7XG4gICAga2luZDogXCJsaW5rXCIsXG4gICAgZmlsZUlkOiBTdHJpbmcoaXRlbT8uRmlsZUlkIHx8IFwiXCIpLnRyaW0oKSxcbiAgICBkZXNjcmlwdGlvbjogU3RyaW5nKGl0ZW0/LkRlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKSxcbiAgICBwcm9jZXNzZWRCeUFJOiB0b051bGxhYmxlQm9vbChpdGVtPy5Qcm9jZXNzZWRCeUFJKSxcbiAgICBjdXJyZW5jeUNvZGU6IFN0cmluZyhpdGVtPy5DdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLFxuICAgIHRvdGFsQW1vdW50OiB0b051bGxhYmxlTnVtYmVyKGl0ZW0/LlRvdGFsQW1vdW50KSxcbiAgICB0cmFuc0RhdGU6IFN0cmluZyhpdGVtPy5UcmFuc0RhdGUgfHwgXCJcIikudHJpbSgpLFxuICAgIGZpbGVOYW1lOiBTdHJpbmcoaXRlbT8uRmlsZU5hbWUgfHwgXCJcIikudHJpbSgpLFxuICAgIGdhc3RvVHlwZTogdG9OdWxsYWJsZVRpY2tldEdhc3RvVHlwZShpdGVtPy5HYXN0b1R5cGUgPz8gaXRlbT8uZ2FzdG9UeXBlKSxcbiAgfTtcbn07XG5cbi8vIE93bnMgbGlzdCBkYXRhIGZldGNoLCBsb2FkaW5nIHN0YXRlLCBhbmQgcGFnaW5hdGlvbiBtZXRhZGF0YSBmb3IgdGlja2V0cy5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0c0xpc3REYXRhID0gKHsgaGFzQWNjZXNzLCBwYWdlU2l6ZSwgbW9kZSwgb25Gb3JiaWRkZW4gfTogVXNlRXhwZW5zZVRpY2tldHNMaXN0RGF0YUFyZ3MpID0+IHtcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0TGlzdFBhZ2VJdGVtW10+KFtdKTtcbiAgY29uc3QgW3RvdGFsLCBzZXRUb3RhbF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2N1cnJlbnRQYWdlLCBzZXRDdXJyZW50UGFnZV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZiA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgYWN0aXZlUmVxdWVzdEtleVJlZiA9IHVzZVJlZihcIlwiKTtcbiAgY29uc3QgYWN0aXZlUmVxdWVzdFNlcVJlZiA9IHVzZVJlZigwKTtcblxuICBjb25zdCByZXN0b3JlTGlzdFNuYXBzaG90ID0gdXNlQ2FsbGJhY2soXG4gICAgKHNuYXBzaG90OiB7IGl0ZW1zOiBFeHBlbnNlVGlja2V0TGlzdFBhZ2VJdGVtW107IHRvdGFsOiBudW1iZXI7IHBhZ2U6IG51bWJlciB9KSA9PiB7XG4gICAgICBjb25zdCBzYWZlSXRlbXMgPSBBcnJheS5pc0FycmF5KHNuYXBzaG90Lml0ZW1zKSA/IHNuYXBzaG90Lml0ZW1zIDogW107XG4gICAgICBjb25zdCBzYWZlVG90YWxSYXcgPSBOdW1iZXIoc25hcHNob3QudG90YWwpO1xuICAgICAgY29uc3Qgc2FmZVRvdGFsID0gTnVtYmVyLmlzRmluaXRlKHNhZmVUb3RhbFJhdykgJiYgc2FmZVRvdGFsUmF3ID49IDAgPyBzYWZlVG90YWxSYXcgOiBzYWZlSXRlbXMubGVuZ3RoO1xuICAgICAgY29uc3Qgc2FmZVBhZ2VSYXcgPSBOdW1iZXIoc25hcHNob3QucGFnZSk7XG4gICAgICBjb25zdCBzYWZlUGFnZSA9IE51bWJlci5pc0Zpbml0ZShzYWZlUGFnZVJhdykgJiYgc2FmZVBhZ2VSYXcgPiAwID8gTWF0aC5mbG9vcihzYWZlUGFnZVJhdykgOiAxO1xuXG4gICAgICBzZXRJdGVtcyhzYWZlSXRlbXMpO1xuICAgICAgc2V0VG90YWwoc2FmZVRvdGFsKTtcbiAgICAgIHNldEN1cnJlbnRQYWdlKHNhZmVQYWdlKTtcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgfSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IGxvYWRMaXN0ID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKHBhZ2U6IG51bWJlciwgZmlsdGVyczogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCkgPT4ge1xuICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0SW5mbyhcImxvYWRMaXN0OnJlcXVlc3RlZFwiLCB7XG4gICAgICAgIHBhZ2UsXG4gICAgICAgIG1vZGUsXG4gICAgICAgIGhhc0FjY2VzcyxcbiAgICAgICAgZmlsdGVycyxcbiAgICAgIH0pO1xuICAgICAgaWYgKCFoYXNBY2Nlc3MpIHtcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImxvYWRMaXN0OmJsb2NrZWQtbm8tYWNjZXNzXCIsIHtcbiAgICAgICAgICBwYWdlLFxuICAgICAgICAgIG1vZGUsXG4gICAgICAgIH0pO1xuICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBheWxvYWQgPVxuICAgICAgICBtb2RlID09PSBcImxpbmtcIlxuICAgICAgICAgID8gYnVpbGRFeHBlbnNlVGlja2V0TGlua0xpc3RQYXlsb2FkKGZpbHRlcnMsIHBhZ2UsIHBhZ2VTaXplKVxuICAgICAgICAgIDogYnVpbGRFeHBlbnNlVGlja2V0TGlzdFBheWxvYWQoZmlsdGVycywgcGFnZSwgcGFnZVNpemUpO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZE1hbmFnZWRVc2VySWQgPSBTdHJpbmcoZmlsdGVycz8ubWFuYWdlZFVzZXJJZCB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcbiAgICAgIGNvbnN0IHJlcXVlc3RLZXkgPSBKU09OLnN0cmluZ2lmeSh7IG1vZGUsIHBheWxvYWQsIG1hbmFnZWRVc2VySWQ6IG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkIH0pO1xuXG4gICAgICBpZiAoYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCAmJiBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPT09IHJlcXVlc3RLZXkpIHtcbiAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImxvYWRMaXN0OnNraXAtZHVwbGljYXRlLXJlcXVlc3RcIiwge1xuICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgbW9kZSxcbiAgICAgICAgICByZXF1ZXN0S2V5LFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCkge1xuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RJbmZvKFwibG9hZExpc3Q6YWJvcnQtcHJldmlvdXMtcmVxdWVzdFwiLCB7XG4gICAgICAgICAgcHJldmlvdXNSZXF1ZXN0S2V5OiBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQsXG4gICAgICAgICAgcHJldmlvdXNSZXF1ZXN0U2VxOiBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQsXG4gICAgICAgICAgc3RhY2s6IGJ1aWxkRXhwZW5zZVRpY2tldHNEZWJ1Z1N0YWNrKFwibG9hZExpc3Q6YWJvcnQtcHJldmlvdXMtcmVxdWVzdFwiKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQuYWJvcnQoKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgPSBjb250cm9sbGVyO1xuICAgICAgYWN0aXZlUmVxdWVzdEtleVJlZi5jdXJyZW50ID0gcmVxdWVzdEtleTtcbiAgICAgIGNvbnN0IHJlcXVlc3RTZXEgPSBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQgKyAxO1xuICAgICAgYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50ID0gcmVxdWVzdFNlcTtcbiAgICAgIGNvbnN0IGhhbmRsZUFib3J0U2lnbmFsID0gKCkgPT4ge1xuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RXYXJuKFwibG9hZExpc3Q6c2lnbmFsLWFib3J0LWV2ZW50XCIsIHtcbiAgICAgICAgICBwYWdlLFxuICAgICAgICAgIG1vZGUsXG4gICAgICAgICAgcmVxdWVzdFNlcSxcbiAgICAgICAgICByZXF1ZXN0S2V5LFxuICAgICAgICAgIHNpZ25hbEFib3J0ZWQ6IGNvbnRyb2xsZXIuc2lnbmFsLmFib3J0ZWQsXG4gICAgICAgICAgc2lnbmFsUmVhc29uOlxuICAgICAgICAgICAgXCJyZWFzb25cIiBpbiBjb250cm9sbGVyLnNpZ25hbFxuICAgICAgICAgICAgICA/ICgoY29udHJvbGxlci5zaWduYWwgYXMgQWJvcnRTaWduYWwgJiB7IHJlYXNvbj86IHVua25vd24gfSkucmVhc29uID8/IG51bGwpXG4gICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgY29udHJvbGxlci5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0U2lnbmFsLCB7IG9uY2U6IHRydWUgfSk7XG5cbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8oXCJsb2FkTGlzdDpmZXRjaC1zdGFydFwiLCB7XG4gICAgICAgIHBhZ2UsXG4gICAgICAgIG1vZGUsXG4gICAgICAgIG5vcm1hbGl6ZWRNYW5hZ2VkVXNlcklkLFxuICAgICAgICBwYXlsb2FkLFxuICAgICAgICByZXF1ZXN0S2V5LFxuICAgICAgICByZXF1ZXN0U2VxLFxuICAgICAgfSk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcnVuRXhwZW5zZVJlYWRSZXF1ZXN0V2l0aFJldHJ5KFxuICAgICAgICAgICgpID0+XG4gICAgICAgICAgICBtb2RlID09PSBcImxpbmtcIlxuICAgICAgICAgICAgICA/IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3QocGF5bG9hZCwge1xuICAgICAgICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICAgICAgICAgICAgYXhVc2VySWRPdmVycmlkZTogbm9ybWFsaXplZE1hbmFnZWRVc2VySWQgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIDogZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdChwYXlsb2FkLCB7XG4gICAgICAgICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgICAgICAgICAgICBheFVzZXJJZE92ZXJyaWRlOiBub3JtYWxpemVkTWFuYWdlZFVzZXJJZCB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8oXCJsb2FkTGlzdDpmZXRjaC1maW5pc2hlZFwiLCB7XG4gICAgICAgICAgcGFnZSxcbiAgICAgICAgICBtb2RlLFxuICAgICAgICAgIHJlcXVlc3RTZXEsXG4gICAgICAgICAgc3VjY2VzczogcmVzcG9uc2U/LlN1Y2Nlc3MsXG4gICAgICAgICAgdG90YWw6IHJlc3BvbnNlPy5Ub3RhbCxcbiAgICAgICAgICBpdGVtczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMubGVuZ3RoIDogMCxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChyZXF1ZXN0U2VxICE9PSBhY3RpdmVSZXF1ZXN0U2VxUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImxvYWRMaXN0OmFwaS11bnN1Y2Nlc3NmdWxcIiwge1xuICAgICAgICAgICAgcGFnZSxcbiAgICAgICAgICAgIG1vZGUsXG4gICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5NZXNzYWdlLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJUaWNrZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldHMuXCIpKTtcbiAgICAgICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICAgICAgc2V0VG90YWwoMCk7XG4gICAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc291cmNlSXRlbXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xuICAgICAgICBjb25zdCBtYXBwZWRJdGVtcyA9IHNvdXJjZUl0ZW1zLm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICBtb2RlID09PSBcImxpbmtcIlxuICAgICAgICAgICAgPyBtYXBUaWNrZXRMaW5rSXRlbVRvQ2FyZChpdGVtIGFzIHVua25vd24gYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pXG4gICAgICAgICAgICA6IG1hcFRpY2tldEl0ZW1Ub0NhcmQoaXRlbSBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVxuICAgICAgICApO1xuICAgICAgICBjb25zdCByZXNwb25zZVRvdGFsID0gTnVtYmVyKHJlc3BvbnNlPy5Ub3RhbCA/PyBtYXBwZWRJdGVtcy5sZW5ndGggPz8gMCk7XG5cbiAgICAgICAgc2V0SXRlbXMobWFwcGVkSXRlbXMpO1xuICAgICAgICBzZXRUb3RhbChyZXNwb25zZVRvdGFsKTtcbiAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAocmVxdWVzdFNlcSAhPT0gYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgICAgIGlmIChpc0V4cGVuc2VBYm9ydExpa2VFcnJvcihlcnJvciwgY29udHJvbGxlci5zaWduYWwpKSB7XG4gICAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImxvYWRMaXN0OmFib3J0ZWRcIiwge1xuICAgICAgICAgICAgcGFnZSxcbiAgICAgICAgICAgIG1vZGUsXG4gICAgICAgICAgICByZXF1ZXN0U2VxLFxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvcixcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgbG9nRXhwZW5zZVRpY2tldHNMaXN0V2FybihcImxvYWRMaXN0OmZvcmJpZGRlblwiLCB7XG4gICAgICAgICAgICBwYWdlLFxuICAgICAgICAgICAgbW9kZSxcbiAgICAgICAgICAgIHJlcXVlc3RTZXEsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RFcnJvcihcImxvYWRMaXN0OmZhaWxlZFwiLCB7XG4gICAgICAgICAgcGFnZSxcbiAgICAgICAgICBtb2RlLFxuICAgICAgICAgIHJlcXVlc3RTZXEsXG4gICAgICAgICAgbWVzc2FnZTogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvcixcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJUaWNrZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldHMuXCIpO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIHNldEl0ZW1zKFtdKTtcbiAgICAgICAgc2V0VG90YWwoMCk7XG4gICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgY29udHJvbGxlci5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0U2lnbmFsKTtcbiAgICAgICAgaWYgKHJlcXVlc3RTZXEgPT09IGFjdGl2ZVJlcXVlc3RTZXFSZWYuY3VycmVudCkge1xuICAgICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdEluZm8oXCJsb2FkTGlzdDpmaW5hbGl6ZVwiLCB7XG4gICAgICAgICAgICBwYWdlLFxuICAgICAgICAgICAgbW9kZSxcbiAgICAgICAgICAgIHJlcXVlc3RTZXEsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgICBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBbaGFzQWNjZXNzLCBtb2RlLCBvbkZvcmJpZGRlbiwgcGFnZVNpemVdXG4gICk7XG5cbiAgY29uc3QgcmVzZXRMaXN0ID0gdXNlQ2FsbGJhY2soKHNvdXJjZSA9IFwidW5rbm93blwiKSA9PiB7XG4gICAgaWYgKGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQpIHtcbiAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJyZXNldExpc3Q6YWJvcnQtYWN0aXZlLXJlcXVlc3RcIiwge1xuICAgICAgICBzb3VyY2UsXG4gICAgICAgIGFjdGl2ZVJlcXVlc3RLZXk6IGFjdGl2ZVJlcXVlc3RLZXlSZWYuY3VycmVudCxcbiAgICAgICAgYWN0aXZlUmVxdWVzdFNlcTogYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50LFxuICAgICAgICBzdGFjazogYnVpbGRFeHBlbnNlVGlja2V0c0RlYnVnU3RhY2soYHJlc2V0TGlzdDoke3NvdXJjZX1gKSxcbiAgICAgIH0pO1xuICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudC5hYm9ydCgpO1xuICAgICAgYWN0aXZlUmVxdWVzdENvbnRyb2xsZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPSBcIlwiO1xuICAgIH1cbiAgICBsb2dFeHBlbnNlVGlja2V0c0xpc3RJbmZvKFwicmVzZXRMaXN0OmNsZWFyLXN0YXRlXCIsIHtcbiAgICAgIHNvdXJjZSxcbiAgICB9KTtcbiAgICBzZXRJdGVtcyhbXSk7XG4gICAgc2V0VG90YWwoMCk7XG4gICAgc2V0Q3VycmVudFBhZ2UoMSk7XG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY2xlYXJMaXN0Q2FjaGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgLy8gVGlja2V0IGxpc3QgYXV0by1sb2FkIG11c3QgYWx3YXlzIGhpdCB0aGUgbGl2ZSBlbmRwb2ludC5cbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50KSB7XG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzTGlzdFdhcm4oXCJjbGVhbnVwOmFib3J0LWFjdGl2ZS1yZXF1ZXN0XCIsIHtcbiAgICAgICAgICBhY3RpdmVSZXF1ZXN0S2V5OiBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQsXG4gICAgICAgICAgYWN0aXZlUmVxdWVzdFNlcTogYWN0aXZlUmVxdWVzdFNlcVJlZi5jdXJyZW50LFxuICAgICAgICAgIHN0YWNrOiBidWlsZEV4cGVuc2VUaWNrZXRzRGVidWdTdGFjayhcImNsZWFudXA6YWJvcnQtYWN0aXZlLXJlcXVlc3RcIiksXG4gICAgICAgIH0pO1xuICAgICAgICBhY3RpdmVSZXF1ZXN0Q29udHJvbGxlclJlZi5jdXJyZW50LmFib3J0KCk7XG4gICAgICAgIGFjdGl2ZVJlcXVlc3RDb250cm9sbGVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICBhY3RpdmVSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPSBcIlwiO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIGl0ZW1zLFxuICAgIHRvdGFsLFxuICAgIGN1cnJlbnRQYWdlLFxuICAgIGlzTG9hZGluZyxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgbG9hZExpc3QsXG4gICAgcmVzdG9yZUxpc3RTbmFwc2hvdCxcbiAgICByZXNldExpc3QsXG4gICAgY2xlYXJMaXN0Q2FjaGUsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdCB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdC50c1wiO1xuaW1wb3J0IHR5cGUge1xuICBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxuICBFeHBlbnNlVGlja2V0TGlua0NhcmQsXG4gIEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZSxcbn0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xuaW1wb3J0IHsgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LCByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvc2Vzc2lvbkV4cGlyeS50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZVNjb3BlVG9rZW4gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNjb3BlLnRzXCI7XG5cbmNvbnN0IEVYUEVOU0VfVElDS0VUX0xJTktfUkVUVVJOX1NUQVRFX0tFWV9QUkVGSVggPSBcImV4cGVuc2VfdGlja2V0X2xpbmtfcmV0dXJuX3N0YXRlX3YxXCI7XG5jb25zdCBFWFBFTlNFX1RJQ0tFVF9MSU5LX1JFVFVSTl9TVEFURV9UVExfTVMgPSAxMiAqIDYwICogNjAgKiAxMDAwO1xuY29uc3QgQUxMT1dFRF9USUNLRVRfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XG5cbmV4cG9ydCB0eXBlIEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgPSB7XG4gIHNoZWV0SWQ6IHN0cmluZztcbiAgcGFnZTogbnVtYmVyO1xuICBzY3JvbGxZOiBudW1iZXI7XG4gIGZvY3VzRmlsZUlkOiBzdHJpbmc7XG4gIGZpbHRlcnM6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3Q7XG4gIHNlbGVjdGlvbk1vZGU6IEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZTtcbiAgc2VsZWN0ZWRUaWNrZXRzOiBFeHBlbnNlVGlja2V0TGlua0NhcmRbXTtcbiAgZXhjbHVkZWRJZHM6IHN0cmluZ1tdO1xuICBmaWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnM6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QgfCBudWxsO1xuICBmaWx0ZXJlZFNlbGVjdGlvblRvdGFsOiBudW1iZXI7XG59O1xuXG5jb25zdCBnZXRTY29wZWRLZXkgPSAoKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGAke0VYUEVOU0VfVElDS0VUX0xJTktfUkVUVVJOX1NUQVRFX0tFWV9QUkVGSVh9XyR7Z2V0RXhwZW5zZVNjb3BlVG9rZW4oKX1gO1xufTtcblxuY29uc3Qgbm9ybWFsaXplRmlsZUlkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XG59O1xuXG5jb25zdCBub3JtYWxpemVQcm9jZXNzZWRCeUFpID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB8IG51bGwgPT4ge1xuICBpZiAodmFsdWUgPT09IHRydWUgfHwgdmFsdWUgPT09IGZhbHNlKSByZXR1cm4gdmFsdWU7XG4gIGlmICh2YWx1ZSA9PT0gMSB8fCB2YWx1ZSA9PT0gXCIxXCIgfHwgdmFsdWUgPT09IFwidHJ1ZVwiKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKHZhbHVlID09PSAwIHx8IHZhbHVlID09PSBcIjBcIiB8fCB2YWx1ZSA9PT0gXCJmYWxzZVwiKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3Qgbm9ybWFsaXplTnVsbGFibGVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZVRpY2tldEdhc3RvVHlwZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtcImdhc3RvVHlwZVwiXSA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpIHx8ICFBTExPV0VEX1RJQ0tFVF9HQVNUT19UWVBFUy5oYXMocGFyc2VkKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBwYXJzZWQgYXMgRXhwZW5zZVRpY2tldExpbmtDYXJkW1wiZ2FzdG9UeXBlXCJdO1xufTtcblxuY29uc3Qgbm9ybWFsaXplU2VsZWN0aW9uTW9kZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZSA9PiB7XG4gIHJldHVybiB2YWx1ZSA9PT0gXCJmaWx0ZXJlZFwiID8gXCJmaWx0ZXJlZFwiIDogXCJzZWxlY3RlZFwiO1xufTtcblxuY29uc3Qgbm9ybWFsaXplU2VsZWN0ZWRUaWNrZXRzID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZVRpY2tldExpbmtDYXJkW10gPT4ge1xuICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gW107XG5cbiAgY29uc3QgaXRlbXMgPSBuZXcgTWFwPHN0cmluZywgRXhwZW5zZVRpY2tldExpbmtDYXJkPigpO1xuICBmb3IgKGNvbnN0IGVudHJ5IG9mIHZhbHVlKSB7XG4gICAgY29uc3QgaXRlbSA9IChlbnRyeSB8fCB7fSkgYXMgUGFydGlhbDxFeHBlbnNlVGlja2V0TGlua0NhcmQ+O1xuICAgIGNvbnN0IGZpbGVJZCA9IG5vcm1hbGl6ZUZpbGVJZChpdGVtLmZpbGVJZCk7XG4gICAgaWYgKCFmaWxlSWQpIGNvbnRpbnVlO1xuXG4gICAgaXRlbXMuc2V0KGZpbGVJZCwge1xuICAgICAga2luZDogXCJsaW5rXCIsXG4gICAgICBmaWxlSWQsXG4gICAgICBkZXNjcmlwdGlvbjogU3RyaW5nKGl0ZW0uZGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpLFxuICAgICAgcHJvY2Vzc2VkQnlBSTogbm9ybWFsaXplUHJvY2Vzc2VkQnlBaShpdGVtLnByb2Nlc3NlZEJ5QUkpLFxuICAgICAgY3VycmVuY3lDb2RlOiBTdHJpbmcoaXRlbS5jdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLFxuICAgICAgdG90YWxBbW91bnQ6IG5vcm1hbGl6ZU51bGxhYmxlTnVtYmVyKGl0ZW0udG90YWxBbW91bnQpLFxuICAgICAgdHJhbnNEYXRlOiBTdHJpbmcoaXRlbS50cmFuc0RhdGUgfHwgXCJcIikudHJpbSgpLFxuICAgICAgZmlsZU5hbWU6IFN0cmluZyhpdGVtLmZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSxcbiAgICAgIGdhc3RvVHlwZTogbm9ybWFsaXplVGlja2V0R2FzdG9UeXBlKGl0ZW0uZ2FzdG9UeXBlKSxcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBBcnJheS5mcm9tKGl0ZW1zLnZhbHVlcygpKTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUV4Y2x1ZGVkSWRzID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nW10gPT4ge1xuICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gW107XG5cbiAgY29uc3QgaWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGZvciAoY29uc3QgZW50cnkgb2YgdmFsdWUpIHtcbiAgICBjb25zdCBmaWxlSWQgPSBub3JtYWxpemVGaWxlSWQoZW50cnkpO1xuICAgIGlmICghZmlsZUlkKSBjb250aW51ZTtcbiAgICBpZHMuYWRkKGZpbGVJZCk7XG4gIH1cblxuICByZXR1cm4gQXJyYXkuZnJvbShpZHMpO1xufTtcblxuY29uc3Qgbm9ybWFsaXplTm9uTmVnYXRpdmVJbnRlZ2VyID0gKHZhbHVlOiB1bmtub3duLCBmYWxsYmFjayA9IDApOiBudW1iZXIgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgJiYgcGFyc2VkID49IDAgPyBNYXRoLmZsb29yKHBhcnNlZCkgOiBmYWxsYmFjaztcbn07XG5cbi8vIE5vcm1hbGl6ZXMgdGhlIGxpbmstbW9kZSB0aWNrZXQgcmV0dXJuIHN0YXRlIHNvIGJhY2sgbmF2aWdhdGlvbiBjYW4gcmVzdG9yZSBmaWx0ZXJzIGFuZCBzZWxlY3Rpb24gc2FmZWx5LlxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlIHwgbnVsbCA9PiB7XG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBwYXlsb2FkID0gdmFsdWUgYXMgUGFydGlhbDxFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlPjtcbiAgY29uc3Qgc2hlZXRJZCA9IFN0cmluZyhwYXlsb2FkLnNoZWV0SWQgfHwgXCJcIikudHJpbSgpO1xuICBpZiAoIXNoZWV0SWQpIHJldHVybiBudWxsO1xuXG4gIHJldHVybiB7XG4gICAgc2hlZXRJZCxcbiAgICBwYWdlOiBNYXRoLm1heCgxLCBub3JtYWxpemVOb25OZWdhdGl2ZUludGVnZXIocGF5bG9hZC5wYWdlLCAxKSksXG4gICAgc2Nyb2xsWTogbm9ybWFsaXplTm9uTmVnYXRpdmVJbnRlZ2VyKHBheWxvYWQuc2Nyb2xsWSksXG4gICAgZm9jdXNGaWxlSWQ6IG5vcm1hbGl6ZUZpbGVJZChwYXlsb2FkLmZvY3VzRmlsZUlkKSxcbiAgICBmaWx0ZXJzOiBub3JtYWxpemVFeHBlbnNlVGlja2V0RmlsdGVyU25hcHNob3QocGF5bG9hZC5maWx0ZXJzKSxcbiAgICBzZWxlY3Rpb25Nb2RlOiBub3JtYWxpemVTZWxlY3Rpb25Nb2RlKHBheWxvYWQuc2VsZWN0aW9uTW9kZSksXG4gICAgc2VsZWN0ZWRUaWNrZXRzOiBub3JtYWxpemVTZWxlY3RlZFRpY2tldHMocGF5bG9hZC5zZWxlY3RlZFRpY2tldHMpLFxuICAgIGV4Y2x1ZGVkSWRzOiBub3JtYWxpemVFeGNsdWRlZElkcyhwYXlsb2FkLmV4Y2x1ZGVkSWRzKSxcbiAgICBmaWx0ZXJlZFNlbGVjdGlvbkZpbHRlcnM6IHBheWxvYWQuZmlsdGVyZWRTZWxlY3Rpb25GaWx0ZXJzXG4gICAgICA/IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRGaWx0ZXJTbmFwc2hvdChwYXlsb2FkLmZpbHRlcmVkU2VsZWN0aW9uRmlsdGVycylcbiAgICAgIDogbnVsbCxcbiAgICBmaWx0ZXJlZFNlbGVjdGlvblRvdGFsOiBub3JtYWxpemVOb25OZWdhdGl2ZUludGVnZXIocGF5bG9hZC5maWx0ZXJlZFNlbGVjdGlvblRvdGFsKSxcbiAgfTtcbn07XG5cbi8vIFJlYWRzIGEgc3RvcmVkIGxpbmstbW9kZSByZXR1cm4gc3RhdGUgd2hlbiBpdCBzdGlsbCBtYXRjaGVzIHRoZSBhY3RpdmUgZXhwZW5zZSBzaGVldC5cbmV4cG9ydCBjb25zdCByZWFkRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSA9IChzaGVldElkPzogdW5rbm93bik6IEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgfCBudWxsID0+IHtcbiAgY29uc3Qgc3RvcmVkID0gbm9ybWFsaXplRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZShcbiAgICBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnk8RXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZT4oZ2V0U2NvcGVkS2V5KCkpXG4gICk7XG4gIGlmICghc3RvcmVkKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBzYWZlU2hlZXRJZCA9IFN0cmluZyhzaGVldElkIHx8IFwiXCIpLnRyaW0oKTtcbiAgaWYgKCFzYWZlU2hlZXRJZCkgcmV0dXJuIHN0b3JlZDtcbiAgcmV0dXJuIHN0b3JlZC5zaGVldElkLnRvVXBwZXJDYXNlKCkgPT09IHNhZmVTaGVldElkLnRvVXBwZXJDYXNlKCkgPyBzdG9yZWQgOiBudWxsO1xufTtcblxuLy8gUGVyc2lzdHMgdGhlIG1pbmltdW0gbGluay1tb2RlIHN0YXRlIHJlcXVpcmVkIHRvIHJldHVybiBmcm9tIHRpY2tldCBkZXRhaWwgd2l0aG91dCBsb3Npbmcgc2VsZWN0aW9uLlxuZXhwb3J0IGNvbnN0IHNhdmVFeHBlbnNlVGlja2V0TGlua1JldHVyblN0YXRlID0gKFxuICB2YWx1ZTogRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSB8IG51bGwgfCB1bmRlZmluZWRcbik6IEV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUgfCBudWxsID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUodmFsdWUpO1xuICBpZiAoIW5vcm1hbGl6ZWQpIHtcbiAgICBjbGVhckV4cGVuc2VUaWNrZXRMaW5rUmV0dXJuU3RhdGUoKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeShnZXRTY29wZWRLZXkoKSwgbm9ybWFsaXplZCwgRVhQRU5TRV9USUNLRVRfTElOS19SRVRVUk5fU1RBVEVfVFRMX01TKTtcbiAgcmV0dXJuIG5vcm1hbGl6ZWQ7XG59O1xuXG4vLyBDbGVhcnMgYW55IHN0b3JlZCBsaW5rLW1vZGUgcmV0dXJuIHN0YXRlIGZvciB0aGUgY3VycmVudCBleHBlbnNlIHNjb3BlLlxuZXhwb3J0IGNvbnN0IGNsZWFyRXhwZW5zZVRpY2tldExpbmtSZXR1cm5TdGF0ZSA9ICgpOiB2b2lkID0+IHtcbiAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShnZXRTY29wZWRLZXkoKSk7XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUge1xuICBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90LFxuICBFeHBlbnNlVGlja2V0TGlua0NhcmQsXG4gIEV4cGVuc2VUaWNrZXRMaW5rU2VsZWN0aW9uTW9kZSxcbn0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xuXG5leHBvcnQgdHlwZSBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvblN0YXRlID0ge1xuICBzZWxlY3Rpb25Nb2RlOiBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGU7XG4gIHNlbGVjdGVkVGlja2V0czogRXhwZW5zZVRpY2tldExpbmtDYXJkW107XG4gIGV4Y2x1ZGVkSWRzOiBzdHJpbmdbXTtcbiAgZmlsdGVyZWRTbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB8IG51bGw7XG4gIGZpbHRlcmVkVG90YWxDb3VudDogbnVtYmVyO1xufTtcblxuY29uc3Qgbm9ybWFsaXplRmlsZUlkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XG5cbmNvbnN0IG5vcm1hbGl6ZVNlbGVjdGlvbk1vZGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbk1vZGUgPT4ge1xuICByZXR1cm4gdmFsdWUgPT09IFwiZmlsdGVyZWRcIiA/IFwiZmlsdGVyZWRcIiA6IFwic2VsZWN0ZWRcIjtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUV4Y2x1ZGVkSWRzID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nW10gPT4ge1xuICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gW107XG5cbiAgY29uc3QgaWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGZvciAoY29uc3QgZW50cnkgb2YgdmFsdWUpIHtcbiAgICBjb25zdCBmaWxlSWQgPSBub3JtYWxpemVGaWxlSWQoZW50cnkpO1xuICAgIGlmICghZmlsZUlkKSBjb250aW51ZTtcbiAgICBpZHMuYWRkKGZpbGVJZCk7XG4gIH1cblxuICByZXR1cm4gQXJyYXkuZnJvbShpZHMpO1xufTtcblxuY29uc3QgdG9TZWxlY3RlZE1hcCA9IChpdGVtczogRXhwZW5zZVRpY2tldExpbmtDYXJkW10pOiBSZWNvcmQ8c3RyaW5nLCBFeHBlbnNlVGlja2V0TGlua0NhcmQ+ID0+IHtcbiAgY29uc3QgbmV4dDogUmVjb3JkPHN0cmluZywgRXhwZW5zZVRpY2tldExpbmtDYXJkPiA9IHt9O1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBmaWxlSWQgPSBub3JtYWxpemVGaWxlSWQoaXRlbS5maWxlSWQpO1xuICAgIGlmICghZmlsZUlkKSBjb250aW51ZTtcbiAgICBuZXh0W2ZpbGVJZF0gPSBpdGVtO1xuICB9XG4gIHJldHVybiBuZXh0O1xufTtcblxuLy8gS2VlcHMgbGluay1tb2RlIHRpY2tldCBzZWxlY3Rpb24gc3RhYmxlIGFjcm9zcyBwYWdpbmcsIGZpbHRlcmVkIHNlbGVjdC1hbGwsIGFuZCBkZXRhaWwgcmV0dXJucy5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvbiA9ICgpID0+IHtcbiAgY29uc3QgW3NlbGVjdGlvbk1vZGUsIHNldFNlbGVjdGlvbk1vZGVdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldExpbmtTZWxlY3Rpb25Nb2RlPihcInNlbGVjdGVkXCIpO1xuICBjb25zdCBbc2VsZWN0ZWRUaWNrZXRzQnlJZCwgc2V0U2VsZWN0ZWRUaWNrZXRzQnlJZF0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBFeHBlbnNlVGlja2V0TGlua0NhcmQ+Pih7fSk7XG4gIGNvbnN0IFtleGNsdWRlZElkcywgc2V0RXhjbHVkZWRJZHNdID0gdXNlU3RhdGU8c3RyaW5nW10+KFtdKTtcbiAgY29uc3QgW2ZpbHRlcmVkU25hcHNob3QsIHNldEZpbHRlcmVkU25hcHNob3RdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZmlsdGVyZWRUb3RhbENvdW50LCBzZXRGaWx0ZXJlZFRvdGFsQ291bnRdID0gdXNlU3RhdGUoMCk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRUaWNrZXRzID0gdXNlTWVtbygoKSA9PiBPYmplY3QudmFsdWVzKHNlbGVjdGVkVGlja2V0c0J5SWQpLCBbc2VsZWN0ZWRUaWNrZXRzQnlJZF0pO1xuICBjb25zdCBleGNsdWRlZElkU2V0ID0gdXNlTWVtbygoKSA9PiBuZXcgU2V0KGV4Y2x1ZGVkSWRzKSwgW2V4Y2x1ZGVkSWRzXSk7XG4gIGNvbnN0IGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUgPSBzZWxlY3Rpb25Nb2RlID09PSBcImZpbHRlcmVkXCIgJiYgISFmaWx0ZXJlZFNuYXBzaG90O1xuXG4gIGNvbnN0IGNsZWFyU2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFNlbGVjdGlvbk1vZGUoXCJzZWxlY3RlZFwiKTtcbiAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKHt9KTtcbiAgICBzZXRFeGNsdWRlZElkcyhbXSk7XG4gICAgc2V0RmlsdGVyZWRTbmFwc2hvdChudWxsKTtcbiAgICBzZXRGaWx0ZXJlZFRvdGFsQ291bnQoMCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCByZXN0b3JlU2VsZWN0aW9uID0gdXNlQ2FsbGJhY2soKHN0YXRlOiBFeHBlbnNlVGlja2V0TGlua1NlbGVjdGlvblN0YXRlIHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4ge1xuICAgIGlmICghc3RhdGUpIHtcbiAgICAgIGNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgbm9ybWFsaXplZE1vZGUgPSBub3JtYWxpemVTZWxlY3Rpb25Nb2RlKHN0YXRlLnNlbGVjdGlvbk1vZGUpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRTZWxlY3RlZFRpY2tldHMgPSBBcnJheS5pc0FycmF5KHN0YXRlLnNlbGVjdGVkVGlja2V0cykgPyBzdGF0ZS5zZWxlY3RlZFRpY2tldHMgOiBbXTtcbiAgICBjb25zdCBub3JtYWxpemVkU25hcHNob3QgPSBzdGF0ZS5maWx0ZXJlZFNuYXBzaG90IHx8IG51bGw7XG4gICAgY29uc3Qgbm9ybWFsaXplZEV4Y2x1ZGVkSWRzID0gbm9ybWFsaXplRXhjbHVkZWRJZHMoc3RhdGUuZXhjbHVkZWRJZHMpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRGaWx0ZXJlZFRvdGFsID0gTnVtYmVyLmlzRmluaXRlKE51bWJlcihzdGF0ZS5maWx0ZXJlZFRvdGFsQ291bnQpKVxuICAgICAgPyBNYXRoLm1heCgwLCBNYXRoLmZsb29yKE51bWJlcihzdGF0ZS5maWx0ZXJlZFRvdGFsQ291bnQpKSlcbiAgICAgIDogMDtcblxuICAgIHNldFNlbGVjdGlvbk1vZGUobm9ybWFsaXplZE1vZGUgPT09IFwiZmlsdGVyZWRcIiAmJiBub3JtYWxpemVkU25hcHNob3QgPyBcImZpbHRlcmVkXCIgOiBcInNlbGVjdGVkXCIpO1xuICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQodG9TZWxlY3RlZE1hcChub3JtYWxpemVkU2VsZWN0ZWRUaWNrZXRzKSk7XG4gICAgc2V0RXhjbHVkZWRJZHMobm9ybWFsaXplZE1vZGUgPT09IFwiZmlsdGVyZWRcIiA/IG5vcm1hbGl6ZWRFeGNsdWRlZElkcyA6IFtdKTtcbiAgICBzZXRGaWx0ZXJlZFNuYXBzaG90KG5vcm1hbGl6ZWRNb2RlID09PSBcImZpbHRlcmVkXCIgPyBub3JtYWxpemVkU25hcHNob3QgOiBudWxsKTtcbiAgICBzZXRGaWx0ZXJlZFRvdGFsQ291bnQobm9ybWFsaXplZE1vZGUgPT09IFwiZmlsdGVyZWRcIiA/IG5vcm1hbGl6ZWRGaWx0ZXJlZFRvdGFsIDogMCk7XG4gIH0sIFtjbGVhclNlbGVjdGlvbl0pO1xuXG4gIGNvbnN0IHNlbGVjdEFsbEJ5RmlsdGVycyA9IHVzZUNhbGxiYWNrKChzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdCwgdG90YWxDb3VudDogbnVtYmVyKSA9PiB7XG4gICAgc2V0U2VsZWN0aW9uTW9kZShcImZpbHRlcmVkXCIpO1xuICAgIHNldFNlbGVjdGVkVGlja2V0c0J5SWQoe30pO1xuICAgIHNldEV4Y2x1ZGVkSWRzKFtdKTtcbiAgICBzZXRGaWx0ZXJlZFNuYXBzaG90KHNuYXBzaG90KTtcbiAgICBzZXRGaWx0ZXJlZFRvdGFsQ291bnQoTnVtYmVyLmlzRmluaXRlKHRvdGFsQ291bnQpID8gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcih0b3RhbENvdW50KSkgOiAwKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGlzU2VsZWN0ZWQgPSB1c2VDYWxsYmFjayhcbiAgICAoZmlsZUlkOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHNhZmVGaWxlSWQgPSBub3JtYWxpemVGaWxlSWQoZmlsZUlkKTtcbiAgICAgIGlmICghc2FmZUZpbGVJZCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICBpZiAoaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSkge1xuICAgICAgICByZXR1cm4gIWV4Y2x1ZGVkSWRTZXQuaGFzKHNhZmVGaWxlSWQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gISFzZWxlY3RlZFRpY2tldHNCeUlkW3NhZmVGaWxlSWRdO1xuICAgIH0sXG4gICAgW2V4Y2x1ZGVkSWRTZXQsIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUsIHNlbGVjdGVkVGlja2V0c0J5SWRdXG4gICk7XG5cbiAgY29uc3QgdG9nZ2xlVGlja2V0ID0gdXNlQ2FsbGJhY2soXG4gICAgKHRpY2tldDogRXhwZW5zZVRpY2tldExpbmtDYXJkKSA9PiB7XG4gICAgICBjb25zdCBmaWxlSWQgPSBub3JtYWxpemVGaWxlSWQodGlja2V0LmZpbGVJZCk7XG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xuXG4gICAgICBpZiAoaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZSkge1xuICAgICAgICBzZXRFeGNsdWRlZElkcygocHJldmlvdXMpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXh0ID0gbmV3IFNldChwcmV2aW91cyk7XG4gICAgICAgICAgaWYgKG5leHQuaGFzKGZpbGVJZCkpIHtcbiAgICAgICAgICAgIG5leHQuZGVsZXRlKGZpbGVJZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHQuYWRkKGZpbGVJZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBBcnJheS5mcm9tKG5leHQpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKChwcmV2aW91cykgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2aW91cyB9O1xuICAgICAgICBpZiAobmV4dFtmaWxlSWRdKSB7XG4gICAgICAgICAgZGVsZXRlIG5leHRbZmlsZUlkXTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgICBuZXh0W2ZpbGVJZF0gPSB0aWNrZXQ7XG4gICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBbaXNGaWx0ZXJlZFNlbGVjdGlvbkFjdGl2ZV1cbiAgKTtcblxuICBjb25zdCBoeWRyYXRlVmlzaWJsZVRpY2tldHMgPSB1c2VDYWxsYmFjaygoaXRlbXM6IEV4cGVuc2VUaWNrZXRMaW5rQ2FyZFtdKSA9PiB7XG4gICAgaWYgKHNlbGVjdGlvbk1vZGUgIT09IFwic2VsZWN0ZWRcIiB8fCBpdGVtcy5sZW5ndGggPCAxKSByZXR1cm47XG5cbiAgICBzZXRTZWxlY3RlZFRpY2tldHNCeUlkKChwcmV2aW91cykgPT4ge1xuICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXZpb3VzIH07XG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgY29uc3QgZmlsZUlkID0gbm9ybWFsaXplRmlsZUlkKGl0ZW0uZmlsZUlkKTtcbiAgICAgICAgaWYgKCFmaWxlSWQgfHwgIW5leHRbZmlsZUlkXSkgY29udGludWU7XG4gICAgICAgIG5leHRbZmlsZUlkXSA9IGl0ZW07XG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNoYW5nZWQgPyBuZXh0IDogcHJldmlvdXM7XG4gICAgfSk7XG4gIH0sIFtzZWxlY3Rpb25Nb2RlXSk7XG5cbiAgY29uc3QgcmVzb2x2ZVNlbGVjdGVkQ291bnQgPSB1c2VDYWxsYmFjayhcbiAgICAoZmFsbGJhY2tUb3RhbENvdW50ID0gMCk6IG51bWJlciA9PiB7XG4gICAgICBpZiAoIWlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkVGlja2V0cy5sZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJhc2VDb3VudCA9IGZpbHRlcmVkVG90YWxDb3VudCA+IDAgPyBmaWx0ZXJlZFRvdGFsQ291bnQgOiBNYXRoLm1heCgwLCBNYXRoLmZsb29yKGZhbGxiYWNrVG90YWxDb3VudCkpO1xuICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIGJhc2VDb3VudCAtIGV4Y2x1ZGVkSWRzLmxlbmd0aCk7XG4gICAgfSxcbiAgICBbZXhjbHVkZWRJZHMubGVuZ3RoLCBmaWx0ZXJlZFRvdGFsQ291bnQsIGlzRmlsdGVyZWRTZWxlY3Rpb25BY3RpdmUsIHNlbGVjdGVkVGlja2V0cy5sZW5ndGhdXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBzZWxlY3Rpb25Nb2RlLFxuICAgIHNlbGVjdGVkVGlja2V0cyxcbiAgICBleGNsdWRlZElkcyxcbiAgICBmaWx0ZXJlZFNuYXBzaG90LFxuICAgIGZpbHRlcmVkVG90YWxDb3VudCxcbiAgICBpc0ZpbHRlcmVkU2VsZWN0aW9uQWN0aXZlLFxuICAgIGlzU2VsZWN0ZWQsXG4gICAgdG9nZ2xlVGlja2V0LFxuICAgIGNsZWFyU2VsZWN0aW9uLFxuICAgIHJlc3RvcmVTZWxlY3Rpb24sXG4gICAgc2VsZWN0QWxsQnlGaWx0ZXJzLFxuICAgIGh5ZHJhdGVWaXNpYmxlVGlja2V0cyxcbiAgICByZXNvbHZlU2VsZWN0ZWRDb3VudCxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVkdWNlciB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpc3RUeXBlcy50c1wiO1xuXG50eXBlIEV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkUmVxdWVzdCA9IHtcbiAgcGFnZTogbnVtYmVyO1xuICBzbmFwc2hvdDogRXhwZW5zZVRpY2tldEFwcGxpZWRGaWx0ZXJTbmFwc2hvdDtcbiAgY2xlYXJDYWNoZTogYm9vbGVhbjtcbiAgcmVzZXRCZWZvcmVMb2FkOiBib29sZWFuO1xuICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiBib29sZWFuO1xufTtcblxudHlwZSBBdXRvbWF0aWNMb2FkQWN0aW9uID1cbiAgfCB7XG4gICAgICB0eXBlOiBcInNjaGVkdWxlXCI7XG4gICAgICByZXF1ZXN0OiBFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZFJlcXVlc3Q7XG4gICAgfVxuICB8IHtcbiAgICAgIHR5cGU6IFwiY2xlYXJcIjtcbiAgICB9XG4gIHwge1xuICAgICAgdHlwZTogXCJkaXNhYmxlX2xpbmtfd2FpdFwiO1xuICAgIH07XG5cbmNvbnN0IGF1dG9tYXRpY0xvYWRSZWR1Y2VyID0gKFxuICBzdGF0ZTogRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWRSZXF1ZXN0IHwgbnVsbCxcbiAgYWN0aW9uOiBBdXRvbWF0aWNMb2FkQWN0aW9uXG4pOiBFeHBlbnNlVGlja2V0QXV0b21hdGljTG9hZFJlcXVlc3QgfCBudWxsID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgXCJzY2hlZHVsZVwiOlxuICAgICAgcmV0dXJuIGFjdGlvbi5yZXF1ZXN0O1xuICAgIGNhc2UgXCJjbGVhclwiOlxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgY2FzZSBcImRpc2FibGVfbGlua193YWl0XCI6XG4gICAgICByZXR1cm4gc3RhdGUgPyB7IC4uLnN0YXRlLCB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5OiBmYWxzZSB9IDogbnVsbDtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG50eXBlIFVzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkQXJncyA9IHtcbiAgaXNMaW5rTW9kZTogYm9vbGVhbjtcbiAgY2FuUHJvY2Vzc0xpbmtNb2RlOiBib29sZWFuO1xuICBsaW5rU2hlZXRDaGVja0J1c3k6IGJvb2xlYW47XG4gIGxpbmtTaGVldExvY2tlZDogYm9vbGVhbjtcbiAgY2xlYXJMaXN0Q2FjaGU6ICgpID0+IHZvaWQ7XG4gIHJlc2V0TGlzdDogKHNvdXJjZT86IHN0cmluZykgPT4gdm9pZDtcbiAgbG9hZExpc3Q6IChwYWdlOiBudW1iZXIsIHNuYXBzaG90OiBFeHBlbnNlVGlja2V0QXBwbGllZEZpbHRlclNuYXBzaG90KSA9PiBQcm9taXNlPHZvaWQ+O1xufTtcblxuY29uc3QgRVhQRU5TRV9USUNLRVRTX0FVVE9fTE9BRF9MT0dfUFJFRklYID0gXCJbZXhwZW5zZS10aWNrZXRzOmF1dG8tbG9hZF1cIjtcblxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZEluZm8gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS5pbmZvID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBjb25zb2xlLmluZm8oRVhQRU5TRV9USUNLRVRTX0FVVE9fTE9BRF9MT0dfUFJFRklYLCAuLi5hcmdzKTtcbiAgfVxufTtcblxuY29uc3QgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZFdhcm4gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS53YXJuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBjb25zb2xlLndhcm4oRVhQRU5TRV9USUNLRVRTX0FVVE9fTE9BRF9MT0dfUFJFRklYLCAuLi5hcmdzKTtcbiAgfVxufTtcblxuLy8gUXVldWVzIG9uZSB0aWNrZXQgbGlzdCByZWxvYWQgYW5kIHJlbGVhc2VzIGl0IG9ubHkgd2hlbiBsaW5rLW1vZGUgcHJlY29uZGl0aW9ucyBhcmUgcmVhZHkuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldEF1dG9tYXRpY0xvYWQgPSAoe1xuICBpc0xpbmtNb2RlLFxuICBjYW5Qcm9jZXNzTGlua01vZGUsXG4gIGxpbmtTaGVldENoZWNrQnVzeSxcbiAgbGlua1NoZWV0TG9ja2VkLFxuICBjbGVhckxpc3RDYWNoZSxcbiAgcmVzZXRMaXN0LFxuICBsb2FkTGlzdCxcbn06IFVzZUV4cGVuc2VUaWNrZXRBdXRvbWF0aWNMb2FkQXJncykgPT4ge1xuICBjb25zdCBbcGVuZGluZ0F1dG9tYXRpY0xvYWQsIGRpc3BhdGNoXSA9IHVzZVJlZHVjZXIoYXV0b21hdGljTG9hZFJlZHVjZXIsIG51bGwpO1xuXG4gIGNvbnN0IHJ1bkF1dG9tYXRpY0xpc3RMb2FkID0gdXNlQ2FsbGJhY2soXG4gICAgKFxuICAgICAgcGFnZTogbnVtYmVyLFxuICAgICAgc25hcHNob3Q6IEV4cGVuc2VUaWNrZXRBcHBsaWVkRmlsdGVyU25hcHNob3QsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGNsZWFyQ2FjaGU/OiBib29sZWFuO1xuICAgICAgICByZXNldEJlZm9yZUxvYWQ/OiBib29sZWFuO1xuICAgICAgICB3YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5PzogYm9vbGVhbjtcbiAgICAgIH0gPSB7fVxuICAgICkgPT4ge1xuICAgICAgbG9nRXhwZW5zZVRpY2tldHNBdXRvTG9hZEluZm8oXCJydW5BdXRvbWF0aWNMaXN0TG9hZDpzY2hlZHVsZVwiLCB7XG4gICAgICAgIHBhZ2UsXG4gICAgICAgIHNuYXBzaG90LFxuICAgICAgICBvcHRpb25zLFxuICAgICAgfSk7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFwic2NoZWR1bGVcIixcbiAgICAgICAgcmVxdWVzdDoge1xuICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgc25hcHNob3QsXG4gICAgICAgICAgY2xlYXJDYWNoZTogb3B0aW9ucy5jbGVhckNhY2hlID09PSB0cnVlLFxuICAgICAgICAgIHJlc2V0QmVmb3JlTG9hZDogb3B0aW9ucy5yZXNldEJlZm9yZUxvYWQgPT09IHRydWUsXG4gICAgICAgICAgd2FpdEZvckxpbmtNb2RlU2hlZXRSZWFkeTogb3B0aW9ucy53YWl0Rm9yTGlua01vZGVTaGVldFJlYWR5ID09PSB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbXVxuICApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFwZW5kaW5nQXV0b21hdGljTG9hZCkgcmV0dXJuO1xuXG4gICAgaWYgKHBlbmRpbmdBdXRvbWF0aWNMb2FkLndhaXRGb3JMaW5rTW9kZVNoZWV0UmVhZHkpIHtcbiAgICAgIGlmICghaXNMaW5rTW9kZSkge1xuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkV2FybihcInBlbmRpbmdBdXRvbWF0aWNMb2FkOmRpc2FibGUtbGluay13YWl0XCIsIHtcbiAgICAgICAgICBwYWdlOiBwZW5kaW5nQXV0b21hdGljTG9hZC5wYWdlLFxuICAgICAgICB9KTtcbiAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcImRpc2FibGVfbGlua193YWl0XCIgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFjYW5Qcm9jZXNzTGlua01vZGUgfHwgbGlua1NoZWV0Q2hlY2tCdXN5KSB7XG4gICAgICAgIGxvZ0V4cGVuc2VUaWNrZXRzQXV0b0xvYWRJbmZvKFwicGVuZGluZ0F1dG9tYXRpY0xvYWQ6d2FpdGluZy1saW5rLW1vZGUtcmVhZHlcIiwge1xuICAgICAgICAgIHBhZ2U6IHBlbmRpbmdBdXRvbWF0aWNMb2FkLnBhZ2UsXG4gICAgICAgICAgY2FuUHJvY2Vzc0xpbmtNb2RlLFxuICAgICAgICAgIGxpbmtTaGVldENoZWNrQnVzeSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGxpbmtTaGVldExvY2tlZCkge1xuICAgICAgICBsb2dFeHBlbnNlVGlja2V0c0F1dG9Mb2FkV2FybihcInBlbmRpbmdBdXRvbWF0aWNMb2FkOmNsZWFyLWxpbmstbG9ja2VkXCIsIHtcbiAgICAgICAgICBwYWdlOiBwZW5kaW5nQXV0b21hdGljTG9hZC5wYWdlLFxuICAgICAgICB9KTtcbiAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcImNsZWFyXCIgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB7IHBhZ2UsIHNuYXBzaG90LCBjbGVhckNhY2hlLCByZXNldEJlZm9yZUxvYWQgfSA9IHBlbmRpbmdBdXRvbWF0aWNMb2FkO1xuICAgIGRpc3BhdGNoKHsgdHlwZTogXCJjbGVhclwiIH0pO1xuICAgIGxvZ0V4cGVuc2VUaWNrZXRzQXV0b0xvYWRJbmZvKFwicGVuZGluZ0F1dG9tYXRpY0xvYWQ6ZXhlY3V0ZVwiLCB7XG4gICAgICBwYWdlLFxuICAgICAgc25hcHNob3QsXG4gICAgICBjbGVhckNhY2hlLFxuICAgICAgcmVzZXRCZWZvcmVMb2FkLFxuICAgIH0pO1xuXG4gICAgaWYgKGNsZWFyQ2FjaGUpIHtcbiAgICAgIGNsZWFyTGlzdENhY2hlKCk7XG4gICAgfVxuXG4gICAgaWYgKHJlc2V0QmVmb3JlTG9hZCkge1xuICAgICAgcmVzZXRMaXN0KFwiYXV0b21hdGljLWxvYWQ6cmVzZXQtYmVmb3JlLWxvYWRcIik7XG4gICAgfVxuXG4gICAgdm9pZCBsb2FkTGlzdChwYWdlLCBzbmFwc2hvdCk7XG4gIH0sIFtcbiAgICBjYW5Qcm9jZXNzTGlua01vZGUsXG4gICAgY2xlYXJMaXN0Q2FjaGUsXG4gICAgaXNMaW5rTW9kZSxcbiAgICBsaW5rU2hlZXRDaGVja0J1c3ksXG4gICAgbGlua1NoZWV0TG9ja2VkLFxuICAgIGxvYWRMaXN0LFxuICAgIHBlbmRpbmdBdXRvbWF0aWNMb2FkLFxuICAgIHJlc2V0TGlzdCxcbiAgXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBydW5BdXRvbWF0aWNMaXN0TG9hZCxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWR1Y2VyIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwsIG1hcEV4cGVuc2VTaGVldEhlYWRlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBpc0V4cGVuc2VBYm9ydExpa2VFcnJvciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlUmVxdWVzdFJldHJ5LnRzXCI7XG5pbXBvcnQgeyBoYXNBc3NpZ25lZFZvdWNoZXIsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyByZXNvbHZlRXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5IH0gZnJvbSBcIi4uL2RldGFpbC9leHBlbnNlU2hlZXREZXRhaWxQb2xpY3kudHNcIjtcbmltcG9ydCB7IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU1hbmFnZWRVc2VyU2NvcGUudHNcIjtcblxuY29uc3QgRVhQRU5TRV9TVEFUVVNfUEFJRCA9IDQ7XG5cbnR5cGUgTGlua1NoZWV0R2F0ZVN0YXRlID0ge1xuICBsaW5rU2hlZXRMb2NrZWQ6IGJvb2xlYW47XG4gIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlOiBzdHJpbmc7XG4gIGxpbmtTaGVldENoZWNrQnVzeTogYm9vbGVhbjtcbn07XG5cbnR5cGUgTGlua1NoZWV0R2F0ZUFjdGlvbiA9XG4gIHwge1xuICAgICAgdHlwZTogXCJyZXBsYWNlXCI7XG4gICAgICBuZXh0U3RhdGU6IExpbmtTaGVldEdhdGVTdGF0ZTtcbiAgICB9XG4gIHwge1xuICAgICAgdHlwZTogXCJwYXRjaFwiO1xuICAgICAgcGF0Y2g6IFBhcnRpYWw8TGlua1NoZWV0R2F0ZVN0YXRlPjtcbiAgICB9O1xuXG50eXBlIFVzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlQXJncyA9IHtcbiAgaXNMaW5rTW9kZTogYm9vbGVhbjtcbiAgbGlua1NoZWV0SWQ6IHN0cmluZztcbiAgY2FuUHJvY2Vzc0xpbmtNb2RlOiBib29sZWFuO1xuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xuICBjYW5NYW5hZ2VPdGhlclVzZXJzOiBib29sZWFuO1xuICBjdXJyZW50QXhVc2VySWQ6IHN0cmluZztcbiAgY3VycmVudENybVVzZXJJZDogc3RyaW5nO1xuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQ6IHN0cmluZztcbiAgcmVzb2x2ZUJsb2NrZWRNZXNzYWdlOiAoaXNQYWlkOiBib29sZWFuKSA9PiBzdHJpbmc7XG59O1xuXG5jb25zdCBJTklUSUFMX0xJTktfU0hFRVRfR0FURV9TVEFURTogTGlua1NoZWV0R2F0ZVN0YXRlID0ge1xuICBsaW5rU2hlZXRMb2NrZWQ6IGZhbHNlLFxuICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZTogXCJcIixcbiAgbGlua1NoZWV0Q2hlY2tCdXN5OiBmYWxzZSxcbn07XG5cbmNvbnN0IGxpbmtTaGVldEdhdGVSZWR1Y2VyID0gKHN0YXRlOiBMaW5rU2hlZXRHYXRlU3RhdGUsIGFjdGlvbjogTGlua1NoZWV0R2F0ZUFjdGlvbik6IExpbmtTaGVldEdhdGVTdGF0ZSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFwicmVwbGFjZVwiOlxuICAgICAgcmV0dXJuIGFjdGlvbi5uZXh0U3RhdGU7XG4gICAgY2FzZSBcInBhdGNoXCI6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgLi4uYWN0aW9uLnBhdGNoLFxuICAgICAgfTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG4vLyBWYWxpZGF0ZXMgdGhlIHRhcmdldCBzaGVldCBzdGF0ZSBiZWZvcmUgbGluay1tb2RlIGFjdGlvbnMgY2FuIHJ1bi5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZSA9ICh7XG4gIGlzTGlua01vZGUsXG4gIGxpbmtTaGVldElkLFxuICBjYW5Qcm9jZXNzTGlua01vZGUsXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQsXG4gIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gIGN1cnJlbnRBeFVzZXJJZCxcbiAgY3VycmVudENybVVzZXJJZCxcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICByZXNvbHZlQmxvY2tlZE1lc3NhZ2UsXG59OiBVc2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZUFyZ3MpID0+IHtcbiAgY29uc3QgW3N0YXRlLCBkaXNwYXRjaF0gPSB1c2VSZWR1Y2VyKGxpbmtTaGVldEdhdGVSZWR1Y2VyLCBJTklUSUFMX0xJTktfU0hFRVRfR0FURV9TVEFURSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzTGlua01vZGUgfHwgIWxpbmtTaGVldElkKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFwicmVwbGFjZVwiLFxuICAgICAgICBuZXh0U3RhdGU6IElOSVRJQUxfTElOS19TSEVFVF9HQVRFX1NUQVRFLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFjYW5Qcm9jZXNzTGlua01vZGUpIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogXCJyZXBsYWNlXCIsXG4gICAgICAgIG5leHRTdGF0ZToge1xuICAgICAgICAgIGxpbmtTaGVldExvY2tlZDogdHJ1ZSxcbiAgICAgICAgICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZTogaW5kVChcIkF1dGhfUGVybWlzc2lvbkRlbmllZF9Cb2R5XCIsIFwiTm8gcGVybWlzc2lvbi5cIiksXG4gICAgICAgICAgbGlua1NoZWV0Q2hlY2tCdXN5OiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBjYW5jZWxsZWQgPSBmYWxzZTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBcInBhdGNoXCIsXG4gICAgICBwYXRjaDoge1xuICAgICAgICBsaW5rU2hlZXRDaGVja0J1c3k6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldERldGFpbChsaW5rU2hlZXRJZCwge1xuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiBcInJlcGxhY2VcIixcbiAgICAgICAgICAgIG5leHRTdGF0ZToge1xuICAgICAgICAgICAgICBsaW5rU2hlZXRMb2NrZWQ6IHRydWUsXG4gICAgICAgICAgICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlOlxuICAgICAgICAgICAgICAgIHNhZmVUZXh0KHJlc3BvbnNlLk1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlwiKSxcbiAgICAgICAgICAgICAgbGlua1NoZWV0Q2hlY2tCdXN5OiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaGVhZGVycyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkU2hlZXQgPVxuICAgICAgICAgIGhlYWRlcnMuZmluZChcbiAgICAgICAgICAgIChlbnRyeSkgPT5cbiAgICAgICAgICAgICAgc2FmZVRleHQoKGVudHJ5IGFzIHsgSG9qYUdhc3Rvc0lkPzogdW5rbm93biB9KT8uSG9qYUdhc3Rvc0lkKS50b1VwcGVyQ2FzZSgpID09PSBsaW5rU2hlZXRJZC50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAgKSB8fFxuICAgICAgICAgIGhlYWRlcnNbMF0gfHxcbiAgICAgICAgICBudWxsO1xuXG4gICAgICAgIGlmICghc2VsZWN0ZWRTaGVldCkge1xuICAgICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IFwicmVwbGFjZVwiLFxuICAgICAgICAgICAgbmV4dFN0YXRlOiB7XG4gICAgICAgICAgICAgIGxpbmtTaGVldExvY2tlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCB3YXMgbm90IGZvdW5kLlwiKSxcbiAgICAgICAgICAgICAgbGlua1NoZWV0Q2hlY2tCdXN5OiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWFwcGVkSGVhZGVyID0gbWFwRXhwZW5zZVNoZWV0SGVhZGVyKHNlbGVjdGVkU2hlZXQpO1xuICAgICAgICBjb25zdCBzdGF0dXNDb2RlID0gdHlwZW9mIG1hcHBlZEhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgPT09IFwibnVtYmVyXCIgPyBtYXBwZWRIZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzIDogbnVsbDtcbiAgICAgICAgY29uc3QgaXNQYWlkID0gc3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfUEFJRCB8fCBoYXNBc3NpZ25lZFZvdWNoZXIobWFwcGVkSGVhZGVyLnZvdWNoZXIpO1xuICAgICAgICBjb25zdCBpc01hbmFnaW5nT3RoZXJVc2VyID0gaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCh7XG4gICAgICAgICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcbiAgICAgICAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgICAgICAgY3VycmVudENybVVzZXJJZCxcbiAgICAgICAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXG4gICAgICAgICAgcmVjb3JkT3duZXJVc2VySWQ6IG1hcHBlZEhlYWRlci51c2VySWQsXG4gICAgICAgICAgaXNDcmVhdGVNb2RlOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGRldGFpbFBvbGljeSA9IHJlc29sdmVFeHBlbnNlU2hlZXREZXRhaWxQb2xpY3koe1xuICAgICAgICAgIHN0YXR1c0NvZGUsXG4gICAgICAgICAgaXNNYW5hZ2luZ090aGVyVXNlcixcbiAgICAgICAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxuICAgICAgICAgIGlzUGFpZCxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGlzTG9ja2VkID0gZGV0YWlsUG9saWN5LmludGVyYWN0aW9uTW9kZSAhPT0gXCJmdWxsX2VkaXRcIjtcblxuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgdHlwZTogXCJyZXBsYWNlXCIsXG4gICAgICAgICAgbmV4dFN0YXRlOiB7XG4gICAgICAgICAgICBsaW5rU2hlZXRMb2NrZWQ6IGlzTG9ja2VkLFxuICAgICAgICAgICAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2U6IGlzTG9ja2VkID8gcmVzb2x2ZUJsb2NrZWRNZXNzYWdlKGlzUGFpZCkgOiBcIlwiLFxuICAgICAgICAgICAgbGlua1NoZWV0Q2hlY2tCdXN5OiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcblxuICAgICAgICBpZiAoaXNFeHBlbnNlQWJvcnRMaWtlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogXCJwYXRjaFwiLFxuICAgICAgICAgICAgcGF0Y2g6IHtcbiAgICAgICAgICAgICAgbGlua1NoZWV0Q2hlY2tCdXN5OiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgIHR5cGU6IFwicmVwbGFjZVwiLFxuICAgICAgICAgIG5leHRTdGF0ZToge1xuICAgICAgICAgICAgbGlua1NoZWV0TG9ja2VkOiB0cnVlLFxuICAgICAgICAgICAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2U6XG4gICAgICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwM1xuICAgICAgICAgICAgICAgID8gaW5kVChcIkF1dGhfUGVybWlzc2lvbkRlbmllZF9Cb2R5XCIsIFwiTm8gcGVybWlzc2lvbi5cIilcbiAgICAgICAgICAgICAgICA6IGVycm9yIGluc3RhbmNlb2YgRXJyb3JcbiAgICAgICAgICAgICAgICAgID8gZXJyb3IubWVzc2FnZVxuICAgICAgICAgICAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0IGRldGFpbC5cIiksXG4gICAgICAgICAgICBsaW5rU2hlZXRDaGVja0J1c3k6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICB9O1xuICB9LCBbXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICAgIGNhblByb2Nlc3NMaW5rTW9kZSxcbiAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgY3VycmVudENybVVzZXJJZCxcbiAgICBpc0xpbmtNb2RlLFxuICAgIGxpbmtTaGVldElkLFxuICAgIHJlc29sdmVCbG9ja2VkTWVzc2FnZSxcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXG4gIF0pO1xuXG4gIHJldHVybiBzdGF0ZTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxpQkFBa0Y7OztBQ0FsRixtQkFBbUM7QUFvRS9CO0FBOURKLElBQU0sb0JBQW9CO0FBQzFCLElBQU0sZUFBZTtBQW1CckIsSUFBTSxnQ0FBZ0MsQ0FBQztBQUFBLEVBQ3JDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBMEM7QUFDeEMsUUFBTSxnQkFBWTtBQUFBLElBQ2hCLENBQUMsVUFBOEM7QUFDN0MsWUFBTSxlQUFlO0FBQ3JCLFVBQUksb0JBQXFCO0FBQ3pCLG1CQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0EsQ0FBQyxxQkFBcUIsWUFBWTtBQUFBLEVBQ3BDO0FBRUEsUUFBTSxpQkFBYSwwQkFBWSxNQUFNO0FBQ25DLFFBQUksdUJBQXVCLENBQUMsYUFBYyxRQUFPO0FBQ2pELG1CQUFlO0FBQ2YsV0FBTztBQUFBLEVBQ1QsR0FBRyxDQUFDLHFCQUFxQixjQUFjLGNBQWMsQ0FBQztBQUV0RCxRQUFNLFdBQVcsWUFBWSxXQUFXLFlBQVk7QUFBQSxJQUNsRCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsRUFDVixDQUFDO0FBRUQsUUFBTSxrQ0FBa0MsYUFDcEMsbURBQ0EsZUFDRSwrQ0FDQTtBQUVOLFFBQU0sYUFDSiw0RUFDRTtBQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxXQUFXLGdHQUFnRywr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TUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBLFNBQVM7QUFBQSxRQUNULGNBQWMsQ0FBQyxTQUFTO0FBQ3RCLGdCQUFNLFdBQVcscUJBQXFCO0FBQ3RDLGNBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxZQUFZLENBQUMsVUFBVSxTQUFTO0FBQzdEO0FBQUEsVUFDRjtBQUVBLGVBQUssU0FBUyxNQUFNLFFBQVE7QUFBQSxRQUM5QjtBQUFBLFFBQ0EsUUFBUTtBQUFBO0FBQUEsSUFDVjtBQUFBLElBRUMsY0FBYyxzQkFBc0IsQ0FBQyxzQkFBc0IsQ0FBQyxrQkFDM0QsNkNBQUMsNkJBQWtCLFdBQVcsS0FBSyxzQ0FBc0Msb0JBQW9CLEdBQzNGO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFPLEtBQUssc0NBQXNDLG9CQUFvQjtBQUFBLFFBQ3RFLFNBQVM7QUFBQSxRQUNULFVBQVUsZ0JBQWdCLGlCQUFpQixzQkFBc0I7QUFBQTtBQUFBLElBQ25FLEdBQ0YsSUFDRTtBQUFBLElBRUgsbUJBQW1CLENBQUMsYUFDbkI7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVcsS0FBSyw2QkFBNkIscUJBQWtCO0FBQUEsUUFDL0QsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsZUFBZSxLQUFLLDZCQUE2QixxQkFBa0I7QUFBQSxRQUNuRSxXQUFXO0FBQUE7QUFBQSxJQUNiLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLHFCQUFxQixNQUFNO0FBQy9CLFNBQ0UsNkNBQUMsZ0NBQXFCLHlCQUF1QixNQUMzQyx1REFBQyw2QkFBMEIsR0FDN0I7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLHNCQUFzQjtBQUM3RCxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLHNCQUFtQixDQUFFO0FBQ2pEO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyw2QkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJub3JtYWxpemVGaWxlSWQiLCAibm9ybWFsaXplU2VsZWN0aW9uTW9kZSIsICJub3JtYWxpemVFeGNsdWRlZElkcyIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJSZWFjdCIsICJpc0xpbmtNb2RlIiwgImNhY2hlZFN0YXRlIl0KfQo=
