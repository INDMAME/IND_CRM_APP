import {
  createInitialExpenseSheetsFilterSnapshot,
  useExpenseSheetsFilterCache
} from "./chunks/chunk-NU42HL7P.js";
import {
  ExpenseQuickTicketProgressOverlay_default,
  PageBottomActionButton,
  PageBottomActions_default,
  TICKET_IMAGE_ACCEPT_ATTRIBUTE,
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-6XXQ6TON.js";
import "./chunks/chunk-M3X3ULOE.js";
import {
  getExpenseStatusLabel
} from "./chunks/chunk-CI3J3X7E.js";
import {
  ExpenseSectionDivider_default,
  InfoPopoverIconButton_default
} from "./chunks/chunk-YAWCN7JA.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-TDNM2Z4R.js";
import {
  ExpenseCurrencyFlagIcon_default,
  ExpenseTimelineCard_default
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
  DEFAULT_REIMBURSABLE_EXPENSE,
  ExpenseReadOnlyField_default,
  executeExpenseMutation,
  getEditableExpenseReimbursableExpenseOptions,
  getExpenseReimbursableExpenseLabel,
  normalizeExpenseLineReimbursableExpense,
  normalizeExpenseReimbursableExpense,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-74756UZW.js";
import "./chunks/chunk-4BE3ZFCK.js";
import {
  resolveExpenseSheetDetailPolicy,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-COCWZQGI.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-SMHFZFDC.js";
import "./chunks/chunk-CBDB7NMA.js";
import {
  clearExpenseNavigationGuard,
  formatAmountWithCurrency,
  formatExpenseInputNumber,
  formatExpenseNumber,
  isManagingOtherExpenseRecord,
  navigateToExpenseUrl,
  parseExpenseNumericInput,
  reloadExpensePage,
  setExpenseNavigationGuard
} from "./chunks/chunk-DDCTTA2H.js";
import {
  configureExpenseApiAuth,
  createExpenseSheet,
  deleteExpenseSheet,
  fetchExpenseSheetDetail,
  formatExpenseDateParts,
  formatExpenseDisplayDate,
  getExchangeRate,
  getExpenseSheetDefaultCurrencyCode,
  hasAssignedVoucher,
  mapExpenseSheetHeader,
  mapExpenseSheetLine,
  parseExpenseDate,
  safeText,
  toIsoDate,
  updateExpenseSheetHeader,
  updateExpenseSheetLine
} from "./chunks/chunk-63PNSQ5Z.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-4B23OARV.js";
import {
  clearExpenseActingUserOverride,
  getExpenseScopeToken,
  mapWindowEnumOptions,
  setExpenseActingUserOverride,
  toExpenseGastoTypeCode
} from "./chunks/chunk-UYN2TXUI.js";
import "./chunks/chunk-ZBKHPZJX.js";
import "./chunks/chunk-DY2B5JHI.js";
import {
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
  indFormat,
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

// Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetDetailPage.tsx
var import_react6 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/components/ExpenseSheetHeaderForm.tsx
var import_react2 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/components/ExpenseSheetHeaderCurrencySection.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ExpenseSheetHeaderCurrencySection = ({
  headerCurrencyCode,
  baseCurrencyCode
}) => {
  const reimbursementCurrencyCode = baseCurrencyCode || headerCurrencyCode || "-";
  const reimbursementCurrencyOptions = import_react.default.useMemo(
    () => [
      {
        value: reimbursementCurrencyCode,
        text: reimbursementCurrencyCode,
        icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseCurrencyFlagIcon_default, { currencyCode: reimbursementCurrencyCode, sizeClassName: "h-6 w-6" })
      }
    ],
    [reimbursementCurrencyCode]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    SelectCombobox_default,
    {
      label: indT("ExpenseSheets_Field_ReimbursementCurrency", "Reimbursement currency"),
      options: reimbursementCurrencyOptions,
      value: reimbursementCurrencyCode,
      onChange: () => void 0,
      placeholder: indT("ExpenseSheets_Filter_Currency_Placeholder", "Currency code"),
      readOnly: true,
      disabled: true,
      allowTextInput: false,
      showSearchButton: false,
      showLabel: true,
      selectedTextMode: "value",
      dropdownMaxHeightClass: "max-h-96",
      selectedIconClassName: "h-6 w-6",
      optionIconClassName: "h-6 w-6",
      selectedInputPaddingClassName: "pl-12",
      containerClassName: "space-y-1.5",
      labelClassName: "form-label font-semibold inline-flex h-6 items-center leading-none",
      idBase: "expense-header-local-currency-readonly",
      portalClassName: "visitas-typography",
      panelClassName: "visitas-typography"
    }
  );
};
var ExpenseSheetHeaderCurrencySection_default = ExpenseSheetHeaderCurrencySection;

// Web/wwwroot/react/src/pages/gastos/constants/exchangeRateEntryModeCatalog.ts
var EXCHANGE_RATE_MODE_META = {
  0: {
    labelKey: "ExpenseSheets_Filter_ExchangeRateMode_Official",
    fallback: "T.C. Oficial"
  },
  1: {
    labelKey: "ExpenseSheets_Filter_ExchangeRateMode_Manual",
    fallback: "T.C. Manual"
  }
};
var getExpenseExchangeRateModeCatalogOptions = () => {
  const source = typeof window !== "undefined" && Array.isArray(window.__EXPENSE_EXCHANGE_RATE_MODES__) ? window.__EXPENSE_EXCHANGE_RATE_MODES__ : [];
  return mapWindowEnumOptions(source).filter((option) => {
    const parsed = Number(option.value);
    return Number.isInteger(parsed) && parsed >= 0;
  });
};
var getExpenseExchangeRateModeCatalogLabel = (value) => {
  const match = getExpenseExchangeRateModeCatalogOptions().find((option) => Number(option.value) === value);
  return match?.text || "";
};
var normalizeExpenseExchangeRateMode = (value) => {
  if (value === null || value === void 0 || String(value).trim() === "") return null;
  const parsed = Number(value);
  if (Number.isInteger(parsed) && parsed >= 0) {
    return parsed;
  }
  return null;
};
var getExpenseExchangeRateModeLabel = (value) => {
  const normalized = normalizeExpenseExchangeRateMode(value);
  if (normalized === null) return "";
  const catalogLabel = getExpenseExchangeRateModeCatalogLabel(normalized);
  if (catalogLabel) return catalogLabel;
  const meta = EXCHANGE_RATE_MODE_META[normalized];
  return meta ? indT(meta.labelKey, meta.fallback) : String(normalized);
};

// Web/wwwroot/react/src/pages/gastos/components/ExpenseSheetHeaderForm.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var EXCHANGE_RATE_MODE_PREFIX_PATTERN = /^T\.?C\.?\s*/i;
var ALIGNED_FIELD_CONTAINER_CLASS_NAME = "space-y-1.5";
var ALIGNED_FIELD_LABEL_CLASS_NAME = "form-label font-semibold inline-flex h-6 items-center leading-none";
var ExpenseSheetHeaderForm = ({
  mode,
  currencyLocks,
  header,
  ownerDisplay = "",
  projectValue,
  normalizedDraftCurrency,
  exchangeRateBaseCurrency,
  exchangeRateReferenceAmount,
  exchangeRateValue,
  exchangeRateValidationMessage,
  totalAmountText,
  draftDescription,
  draftProjectId,
  draftCurrencyCode,
  draftExchangeRate,
  draftReimbursableExpense,
  officialExchangeRateRawValue,
  officialExchangeRateDate,
  officialExchangeRateSource,
  onDraftDescriptionChange,
  onDraftProjectIdChange,
  onDraftProjectIdCommit,
  onDraftCurrencyCodeChange,
  onDraftExchangeRateChange,
  onDraftReimbursableExpenseChange
}) => {
  const { isCreateMode, isEditing, canEditHeaderFields, statusCommentMode } = mode;
  const { isCurrencyLockedByLines, isExchangeRateLockedByLines, showExchangeRate } = currencyLocks;
  const isForeignCurrency = isEditing && canEditHeaderFields && normalizedDraftCurrency !== "" && normalizedDraftCurrency !== exchangeRateBaseCurrency;
  const expenseCurrencyLabel = isForeignCurrency ? indT("ExpenseSheets_Field_ExpenseCurrency", "Expense currency") : indT("ExpenseSheets_Field_Currency", "Currency");
  const statusValue = header.expenseSheetStatus === null || header.expenseSheetStatus === void 0 ? "-" : getExpenseStatusLabel(header.expenseSheetStatus);
  const headerCurrencyCode = safeText(header.currencyCode).toUpperCase();
  const baseCurrencyCode = safeText(exchangeRateBaseCurrency).toUpperCase();
  const reimbursableExpenseOptions = import_react2.default.useMemo(() => getEditableExpenseReimbursableExpenseOptions(), []);
  const reimbursableExpenseTitle = indT("ExpenseSheets_Field_ReimbursableExpense", "Reimbursable");
  const reimbursableExpenseInfoText = indT(
    "ExpenseSheets_Reimbursable_InfoPopover_Text",
    'This value can be set as the header default. If it is changed later, you can update all lines with the new value. If a line changes the inherited value, the header switches to "Both".'
  );
  const reimbursableExpenseInfoAriaLabel = indT(
    "ExpenseSheets_Reimbursable_InfoPopover_Aria",
    "Show reimbursable information"
  );
  const reimbursableExpenseValue = normalizeExpenseReimbursableExpense(
    isEditing ? draftReimbursableExpense : header.reimbursableExpense
  );
  const hasEditableReimbursableExpenseValue = reimbursableExpenseOptions.some(
    (option) => Number(option.value) === reimbursableExpenseValue
  );
  const reimbursableExpenseLabel = getExpenseReimbursableExpenseLabel(reimbursableExpenseValue);
  const selectedReimbursableExpenseOption = import_react2.default.useMemo(
    () => hasEditableReimbursableExpenseValue ? void 0 : { value: String(reimbursableExpenseValue), text: reimbursableExpenseLabel },
    [hasEditableReimbursableExpenseValue, reimbursableExpenseLabel, reimbursableExpenseValue]
  );
  const statusCommentValue = safeText(header.estadoComentarios);
  const showStatusCommentField = !isCreateMode && statusCommentMode !== "hidden";
  const parsedDraftExchangeRate = parseExpenseNumericInput(draftExchangeRate);
  const parsedOfficialRawRate = parseExpenseNumericInput(officialExchangeRateRawValue);
  const baseExchangeRateValue = parsedDraftExchangeRate != null ? parsedDraftExchangeRate : parsedOfficialRawRate != null ? parsedOfficialRawRate * exchangeRateReferenceAmount : null;
  const exchangeRateInfoValue = formatExpenseNumber(
    baseExchangeRateValue != null ? baseExchangeRateValue / exchangeRateReferenceAmount : null,
    {
      minimumFractionDigits: 7,
      maximumFractionDigits: 7,
      useGrouping: false,
      fallback: "0.0000000"
    }
  );
  const exchangeRateModeValue = normalizeExpenseExchangeRateMode(header.exchangeRateMode) ?? 0;
  const exchangeRateModeKey = exchangeRateModeValue === 1 ? "ExpenseSheets_Filter_ExchangeRateMode_Manual" : "ExpenseSheets_Filter_ExchangeRateMode_Official";
  const exchangeRateModeFallback = exchangeRateModeValue === 1 ? "T.C. Manual" : "T.C. Oficial";
  const exchangeRateModeLabel = (getExpenseExchangeRateModeLabel(exchangeRateModeValue) || indT(exchangeRateModeKey, exchangeRateModeFallback)).replace(EXCHANGE_RATE_MODE_PREFIX_PATTERN, "").trim().toLowerCase() || (exchangeRateModeValue === 1 ? "manual" : "oficial");
  const hasEndpointExchangeRateData = !!safeText(officialExchangeRateRawValue) || !!safeText(officialExchangeRateDate) || !!safeText(officialExchangeRateSource);
  const endpointExchangeRateInfoDate = safeText(officialExchangeRateDate) || indT("Common_NotAvailable", "N/A");
  const endpointExchangeRateInfoSource = safeText(officialExchangeRateSource).replace(/\s*\([^()]*\)\s*/g, " ").replace(/\s{2,}/g, " ").trim() || indT("Common_NotAvailable", "N/A");
  const endpointExchangeRateInfoMessage = indFormat(
    "ExpenseSheets_ExchangeRate_InfoPopover_Detail",
    "Tipo de cambio obtenido {0}\nFecha: {1}\nOrigen: {2}",
    safeText(officialExchangeRateRawValue) || "0.0000000",
    endpointExchangeRateInfoDate,
    endpointExchangeRateInfoSource
  );
  const storedExchangeRateInfoMessage = indFormat(
    "ExpenseSheets_ExchangeRate_InfoPopover_Stored",
    "Tipo de cambio {0} {1}",
    exchangeRateModeLabel,
    exchangeRateInfoValue
  );
  const exchangeRateInfoMessage = hasEndpointExchangeRateData ? endpointExchangeRateInfoMessage : storedExchangeRateInfoMessage;
  const reimbursableExpenseLabelContent = /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex h-6 items-center gap-1.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: ALIGNED_FIELD_LABEL_CLASS_NAME, children: reimbursableExpenseTitle }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      InfoPopoverIconButton_default,
      {
        content: reimbursableExpenseInfoText,
        ariaLabel: reimbursableExpenseInfoAriaLabel,
        className: "shrink-0",
        panelClassName: "max-w-[min(320px,calc(100vw-1rem))]"
      }
    )
  ] });
  const reimbursableExpenseField = isEditing && canEditHeaderFields ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: ALIGNED_FIELD_CONTAINER_CLASS_NAME, children: [
    reimbursableExpenseLabelContent,
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      SelectCombobox_default,
      {
        label: reimbursableExpenseTitle,
        placeholder: reimbursableExpenseTitle,
        options: reimbursableExpenseOptions,
        selectedOption: selectedReimbursableExpenseOption,
        value: String(reimbursableExpenseValue),
        onChange: (value) => onDraftReimbursableExpenseChange(normalizeExpenseReimbursableExpense(value)),
        readOnly: !isEditing || !canEditHeaderFields,
        disabled: !isEditing || !canEditHeaderFields,
        idBase: "expense-sheet-reimbursable-expense",
        portalClassName: "visitas-typography",
        panelClassName: "visitas-typography",
        containerClassName: "space-y-0",
        showLabel: false,
        allowTextInput: false
      }
    )
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: ALIGNED_FIELD_CONTAINER_CLASS_NAME, children: [
    reimbursableExpenseLabelContent,
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "relative", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "input",
      {
        className: "form-control ind-readonly-field",
        value: reimbursableExpenseLabel || "-",
        readOnly: true,
        "aria-label": reimbursableExpenseTitle
      }
    ) })
  ] });
  const currencyField = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    ExpenseSheetHeaderCurrencySection_default,
    {
      interaction: { isEditing, canEditHeaderFields },
      currencyState: { isForeignCurrency, isCurrencyLockedByLines, isExchangeRateLockedByLines, showExchangeRate },
      expenseCurrencyLabel,
      headerCurrencyCode,
      baseCurrencyCode,
      draftCurrencyCode,
      draftExchangeRate,
      exchangeRateValue,
      exchangeRateValidationMessage,
      exchangeRateReferenceAmount,
      exchangeRateInfoMessage,
      onDraftCurrencyCodeChange,
      onDraftExchangeRateChange
    }
  );
  const projectField = !isCreateMode && isEditing && canEditHeaderFields ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    ExpenseProjectFilterInput_default,
    {
      label: indT("ExpenseSheets_Field_Project", "Project"),
      placeholder: indT("ExpenseSheets_Filter_Project_Placeholder", "Project id"),
      value: draftProjectId,
      onChange: onDraftProjectIdChange,
      onCommit: onDraftProjectIdCommit,
      disabled: !isEditing || !canEditHeaderFields,
      readOnly: !isEditing || !canEditHeaderFields,
      containerClassName: ALIGNED_FIELD_CONTAINER_CLASS_NAME,
      labelClassName: ALIGNED_FIELD_LABEL_CLASS_NAME
    }
  ) : !isCreateMode ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    ExpenseReadOnlyField_default,
    {
      label: indT("ExpenseSheets_Field_Project", "Project"),
      value: projectValue,
      containerClassName: ALIGNED_FIELD_CONTAINER_CLASS_NAME,
      labelClassName: ALIGNED_FIELD_LABEL_CLASS_NAME
    }
  ) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-[var(--radius-xl)]", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
    isEditing && canEditHeaderFields ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "sm:col-span-2 space-y-1.5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_Description", "Description") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "input",
        {
          className: "form-control",
          value: draftDescription,
          onChange: (event) => onDraftDescriptionChange(event.target.value || ""),
          "aria-label": indT("ExpenseSheets_Field_Description", "Description")
        }
      )
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ExpenseReadOnlyField_default,
      {
        label: indT("ExpenseSheets_Field_Description", "Description"),
        value: safeText(header.description) || "-",
        fullWidth: true
      }
    ),
    isCreateMode && isEditing && canEditHeaderFields ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ExpenseProjectFilterInput_default,
      {
        label: indT("ExpenseSheets_Field_Project", "Project"),
        placeholder: indT("ExpenseSheets_Filter_Project_Placeholder", "Project id"),
        value: draftProjectId,
        onChange: onDraftProjectIdChange,
        onCommit: onDraftProjectIdCommit,
        disabled: !isEditing || !canEditHeaderFields,
        readOnly: !isEditing || !canEditHeaderFields
      }
    ) : isCreateMode ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Project", "Project"), value: projectValue }) : null,
    !isCreateMode ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-2 items-start gap-3 md:col-span-2 md:gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        ExpenseReadOnlyField_default,
        {
          label: indT("ExpenseSheets_Field_TotalAmount", "Reimbursement amount"),
          value: totalAmountText,
          valueAlign: "right",
          containerClassName: ALIGNED_FIELD_CONTAINER_CLASS_NAME,
          labelClassName: ALIGNED_FIELD_LABEL_CLASS_NAME
        }
      ),
      currencyField
    ] }) : null,
    isCreateMode ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-2 items-start gap-3 md:col-span-2 md:gap-4", children: [
      reimbursableExpenseField,
      currencyField
    ] }) : null,
    !isCreateMode ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-2 gap-3 md:col-span-2 md:gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Status", "Status"), value: statusValue }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        ExpenseReadOnlyField_default,
        {
          label: indT("ExpenseSheets_Detail_Field_Identifier", "Identifier"),
          value: safeText(header.hojaGastosId) || "-"
        }
      )
    ] }) : null,
    !isCreateMode ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-2 items-start gap-3 md:col-span-2 md:gap-4", children: [
      reimbursableExpenseField,
      projectField
    ] }) : null,
    ownerDisplay ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ExpenseReadOnlyField_default,
      {
        label: indT("ExpenseSheets_Field_OwnerUser", "Owner user"),
        value: ownerDisplay,
        fullWidth: true
      }
    ) : null,
    showStatusCommentField ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ExpenseReadOnlyField_default,
      {
        label: indT("ExpenseSheets_Field_StatusComment", "Status comment"),
        value: statusCommentValue || "-",
        fullWidth: true
      }
    ) : null
  ] }) });
};
var ExpenseSheetHeaderForm_default = ExpenseSheetHeaderForm;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseLinesTimeline.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var ExpenseLinesTimeline = ({
  visibleLines,
  reimbursementCurrencyCode,
  totalLinePages,
  linePage,
  linesLabel,
  emptyText,
  paginationLabels,
  containerRef,
  onLinePageChange,
  onOpenLine
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "space-y-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseSectionDivider_default, { label: linesLabel, className: "expense-section-divider--spaced" }),
    visibleLines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "timeline-box timeline-empty", "data-empty-text": emptyText }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { ref: containerRef, className: "timeline-box", children: visibleLines.map((line) => {
      const lineId = safeText(line.lineRecId);
      const description = safeText(line.description);
      const amountText = formatAmountWithCurrency(
        line.visibleReimbursableTotal ?? line.amount ?? null,
        reimbursementCurrencyCode
      );
      const linkedTicketFileId = safeText(line.fileId);
      const projectId = safeText(line.projId);
      const dateParts = formatExpenseDateParts(safeText(line.transDate), document?.documentElement?.lang || "es-ES");
      const ticketStatusIcon = linkedTicketFileId ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "size-4",
          "aria-hidden": "true",
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            }
          )
        }
      ) : null;
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "timeline-item", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        ExpenseTimelineCard_default,
        {
          dateParts,
          title: description || lineId || "-",
          amountText,
          onOpen: () => onOpenLine(lineId),
          titleClassName: "timeline-name expense-line-card__title",
          subtitleClassName: "expense-sheet-card__subtitle expense-line-card__meta",
          statusIcon: ticketStatusIcon,
          statusIconClassName: "expense-line-card__ticket-icon",
          statusLabel: linkedTicketFileId || void 0
        }
      ) }, lineId || `${safeText(line.transDate)}-${description}-${amountText}-${projectId}`);
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      CompactPagination_default,
      {
        totalPages: totalLinePages,
        currentPage: linePage,
        onPageChange: onLinePageChange,
        labels: paginationLabels
      }
    )
  ] });
};
var ExpenseLinesTimeline_default = ExpenseLinesTimeline;

// Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetStatusActionBar.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var ExpenseSheetStatusActionBar = ({ actions, busy, disabled = false, onActionClick }) => {
  if (actions.length < 1) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(PageBottomActions_default, { ariaLabel: indT("ExpenseSheets_BottomActions_Toolbar", "Acciones de estado de la hoja de gasto"), children: actions.map((action) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    PageBottomActionButton,
    {
      label: indT(action.labelKey, action.fallback),
      disabled: busy || disabled,
      onClick: () => onActionClick(action)
    },
    action.id
  )) });
};
var ExpenseSheetStatusActionBar_default = ExpenseSheetStatusActionBar;

// Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetDetailOverlays.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var ExpenseSheetDetailOverlays = ({
  modal,
  modalError,
  status,
  busy,
  isRedirectingAfterCreate,
  modalLoadingText,
  modalCancelText,
  modalConfirmText,
  modalBody,
  cameraInputRef,
  galleryInputRef,
  sourcePickerOpen,
  quickTicketBusy,
  quickTicketProgressMessage,
  quickTicketProgressStages,
  quickTicketElapsedMs,
  quickTicketErrorMessage,
  quickTicketAttemptId,
  quickTicketTraceList,
  hasPendingUploadRetry,
  hasPartialTicketFailure,
  onConfirm,
  onCancel,
  onSelectedCameraFile,
  onSelectedGalleryFile,
  onSelectFromCamera,
  onSelectFromGallery,
  onCloseSourcePicker,
  onRetryPendingUpload,
  onClearQuickTicketError
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
        busy: busy || isRedirectingAfterCreate,
        error: modalError,
        status,
        onConfirm,
        onCancel,
        children: modalBody
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
          onSelectedCameraFile(file);
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "input",
      {
        ref: galleryInputRef,
        type: "file",
        accept: TICKET_IMAGE_ACCEPT_ATTRIBUTE,
        className: "hidden",
        onChange: (event) => {
          const file = event.currentTarget.files?.[0] || null;
          event.currentTarget.value = "";
          onSelectedGalleryFile(file);
        }
      }
    ),
    sourcePickerOpen ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/45 px-4 py-6", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "w-full max-w-sm rounded-[var(--radius-xl)] border border-slate-200 bg-white p-4 shadow-xl", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h3", { className: "text-[16px] font-semibold text-slate-800", children: indT("ExpenseSheets_NewTicket_Source_Title", "Nuevo ticket") }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "mt-1 text-sm text-slate-600", children: indT(
        "ExpenseSheets_NewTicket_Source_Body",
        "Selecciona una fuente para capturar o elegir la imagen del ticket."
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "mt-4 grid grid-cols-1 gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "ind-action-btn w-full px-3 py-2 text-sm", onClick: onSelectFromCamera, children: indT("ExpenseSheets_NewTicket_Source_Camera", "Usar c\xE1mara") }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "ind-action-btn w-full px-3 py-2 text-sm", onClick: onSelectFromGallery, children: indT("ExpenseSheets_NewTicket_Source_Gallery", "Elegir imagen") }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "ind-action-btn w-full px-3 py-2 text-sm", onClick: onCloseSourcePicker, children: indT("Common_Cancel", "Cancel") })
      ] })
    ] }) }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      ExpenseQuickTicketProgressOverlay_default,
      {
        open: quickTicketBusy,
        title: indT("ExpenseSheets_NewTicket_Progress_Title", "Processing ticket"),
        summary: quickTicketProgressMessage || indT("Common_Loading", "Loading"),
        elapsedMs: quickTicketElapsedMs,
        stages: quickTicketProgressStages
      }
    ),
    quickTicketErrorMessage ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
      "div",
      {
        className: hasPartialTicketFailure ? "glass-panel shadow-card space-y-2 rounded-[var(--radius-xl)] border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900" : "glass-panel shadow-card space-y-2 rounded-[var(--radius-xl)] border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: quickTicketErrorMessage }),
          quickTicketAttemptId ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "p",
            {
              className: hasPartialTicketFailure ? "rounded-[var(--radius-xl)] border border-amber-200 bg-white px-2 py-1 font-mono text-[11px] text-amber-900 break-all" : "rounded-[var(--radius-xl)] border border-rose-200 bg-white px-2 py-1 font-mono text-[11px] text-rose-800 break-all",
              children: `attemptId: ${quickTicketAttemptId}`
            }
          ) : null,
          quickTicketTraceList.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "div",
            {
              className: hasPartialTicketFailure ? "rounded-[var(--radius-xl)] border border-amber-200 bg-white p-2 text-xs text-amber-800" : "rounded-[var(--radius-xl)] border border-rose-200 bg-white p-2 text-xs text-rose-700",
              children: quickTicketTraceList.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: `${entry.step}: ${entry.traceId}` }, `${entry.step}-${entry.at}`))
            }
          ) : null,
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-wrap gap-2", children: [
            hasPendingUploadRetry ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "ind-action-btn px-3 py-1.5 text-xs", onClick: onRetryPendingUpload, children: indT("ExpenseSheets_NewTicket_RetryUpload", "Reintentar upload") }) : null,
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "ind-action-btn px-3 py-1.5 text-xs", onClick: onClearQuickTicketError, children: indT("Common_Close", "Close") })
          ] })
        ]
      }
    ) : null
  ] });
};
var ExpenseSheetDetailOverlays_default = ExpenseSheetDetailOverlays;

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailPageController.tsx
var import_react5 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/utils/expenseSheetCreatedReturnContext.ts
var EXPENSE_SHEET_CREATED_RETURN_CONTEXT_KEY_PREFIX = "expense_sheet_created_return_context_v1";
var EXPENSE_SHEET_CREATED_RETURN_CONTEXT_TTL_MS = 2 * 60 * 60 * 1e3;
var getScopedKey = () => {
  return `${EXPENSE_SHEET_CREATED_RETURN_CONTEXT_KEY_PREFIX}_${getExpenseScopeToken()}`;
};
var normalizeExpenseSheetCreatedReturnContext = (value) => {
  if (!value || typeof value !== "object") return null;
  const payload = value;
  const sheetId = safeText(payload.sheetId);
  if (!sheetId) return null;
  return {
    sheetId
  };
};
var readExpenseSheetCreatedReturnContext = (sheetId) => {
  const stored = normalizeExpenseSheetCreatedReturnContext(
    getSessionJsonWithExpiry(getScopedKey())
  );
  if (!stored) return null;
  const safeSheetId = safeText(sheetId);
  if (!safeSheetId) return stored;
  return stored.sheetId.toUpperCase() === safeSheetId.toUpperCase() ? stored : null;
};
var clearExpenseSheetCreatedReturnContext = () => {
  removeSessionValueWithExpiry(getScopedKey());
};
var saveExpenseSheetCreatedReturnContext = (value) => {
  const normalized = normalizeExpenseSheetCreatedReturnContext(value);
  if (!normalized) {
    clearExpenseSheetCreatedReturnContext();
    return null;
  }
  setSessionJsonWithExpiry(getScopedKey(), normalized, EXPENSE_SHEET_CREATED_RETURN_CONTEXT_TTL_MS);
  return normalized;
};
var consumeExpenseSheetCreatedReturnContext = (sheetId) => {
  const stored = readExpenseSheetCreatedReturnContext(sheetId);
  if (!stored) return null;
  clearExpenseSheetCreatedReturnContext();
  return stored;
};

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailMutations.ts
var import_react3 = __toESM(require_react());
var toFiniteNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};
var toPositiveNumber = (value) => {
  const parsed = toFiniteNumber(value);
  return parsed != null && parsed > 0 ? parsed : null;
};
var buildLineUpdatePayload = (line, projectId, reimbursableExpense) => {
  const typeValue = toExpenseGastoTypeCode(line.typeValueCode || line.typeValue, { allowNone: false });
  const rawQty = toPositiveNumber(line.qty);
  const rawPrice = toPositiveNumber(line.price);
  const rawAmount = toPositiveNumber(line.amount);
  const qty = rawQty ?? (rawAmount != null ? 1 : 0);
  const price = rawPrice ?? (rawAmount != null && qty > 0 ? rawAmount / qty : 0);
  const transDate = safeText(line.transDate);
  if (!transDate || typeValue === null || !(qty > 0) || !(price > 0)) {
    throw new Error(indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
  }
  return {
    transDate,
    typeValue,
    description: safeText(line.description),
    internacional: line.internacional === true,
    fileId: safeText(line.fileId) || void 0,
    ticket: line.ticket === true,
    qty,
    price,
    projId: safeText(projectId) || void 0,
    reimbursableExpense,
    currencyCode: safeText(line.currencyCode).toUpperCase() || void 0,
    amountMST: toFiniteNumber(line.amountMST),
    exchRate: toFiniteNumber(line.exchRate),
    indAttachFiles: safeText(line.indAttachFiles) || void 0
  };
};
var buildReimbursableLineUpdatePayload = (line, reimbursableExpense) => {
  return buildLineUpdatePayload(line, safeText(line.projId), reimbursableExpense);
};
var buildProjectLineUpdatePayload = (line, projectId) => {
  return buildLineUpdatePayload(
    line,
    projectId,
    normalizeExpenseLineReimbursableExpense(line.reimbursableExpense)
  );
};
var updateReimbursableExpenseOnLines = async (sheetId, lines, reimbursableExpense) => {
  const safeSheetId = safeText(sheetId);
  if (!safeSheetId || lines.length < 1) return;
  const nextLineReimbursableExpense = normalizeExpenseLineReimbursableExpense(reimbursableExpense);
  const updates = lines.map((line) => {
    const lineRecId = safeText(line.lineRecId);
    if (!lineRecId) {
      throw new Error(indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
    }
    return {
      lineRecId,
      payload: buildReimbursableLineUpdatePayload(line, nextLineReimbursableExpense)
    };
  });
  await Promise.all(
    updates.map(async ({ lineRecId, payload }) => {
      const response = await updateExpenseSheetLine(safeSheetId, lineRecId, payload, {
        suppressPermissionModal: true
      });
      if (!response.Success) {
        throw new Error(response.Message || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
      }
    })
  );
};
var updateProjectIdOnLines = async (sheetId, lines, projectId) => {
  const safeSheetId = safeText(sheetId);
  if (!safeSheetId || lines.length < 1) return;
  const safeProjectId = safeText(projectId);
  const updates = lines.map((line) => {
    const lineRecId = safeText(line.lineRecId);
    if (!lineRecId) {
      throw new Error(indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
    }
    return {
      lineRecId,
      payload: buildProjectLineUpdatePayload(line, safeProjectId)
    };
  });
  await Promise.all(
    updates.map(async ({ lineRecId, payload }) => {
      const response = await updateExpenseSheetLine(safeSheetId, lineRecId, payload, {
        suppressPermissionModal: true
      });
      if (!response.Success) {
        throw new Error(response.Message || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
      }
    })
  );
};
var useExpenseSheetDetailMutations = ({
  busy,
  isEditing,
  isCreateMode,
  isEditLocked,
  isDeleteLocked,
  isCurrencyLockedByLines,
  isExchangeRateLockedByLines,
  lockedCurrencyCode,
  lockedExchangeRate,
  canCreateExpense,
  canEditExpense,
  canDeleteExpense,
  canEditHeaderFields,
  canTransitionStatus,
  sheetId,
  draftDescription,
  draftCurrencyCode,
  draftExchangeRate,
  draftReimbursableExpense,
  officialExchangeRateValue,
  draftProjectId,
  draftEstadoComentarios,
  exchangeRateBaseCurrency,
  currentExpenseSheetStatus,
  currentLines,
  onCreateSuccess,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing
}) => {
  const buildUpdatePayload = (0, import_react3.useCallback)(
    (nextStatus, statusCommentOverride) => {
      const hasExplicitStatusCommentOverride = statusCommentOverride !== void 0;
      const normalizedDescription = String(draftDescription || "").trim();
      const normalizedProjectId = String(draftProjectId || "").trim();
      const normalizedEstadoComentarios = String(
        statusCommentOverride ?? draftEstadoComentarios ?? ""
      ).trim();
      const normalizedReimbursableExpense = normalizeExpenseReimbursableExpense(draftReimbursableExpense);
      const resolvedExpenseSheetStatus = nextStatus ?? (currentExpenseSheetStatus != null ? Number(currentExpenseSheetStatus) : void 0);
      if (!normalizedDescription) {
        return {
          error: indT("ExpenseSheets_Validation_DescriptionRequired", "Description is required.")
        };
      }
      return {
        payload: {
          description: normalizedDescription,
          projId: normalizedProjectId || void 0,
          expenseSheetStatus: resolvedExpenseSheetStatus,
          reimbursableExpense: normalizedReimbursableExpense,
          // Preserve explicit empty status comments so the backend can clear the stored value.
          estadoComentarios: hasExplicitStatusCommentOverride ? normalizedEstadoComentarios : normalizedEstadoComentarios || void 0
        }
      };
    },
    [
      canEditHeaderFields,
      currentExpenseSheetStatus,
      draftDescription,
      draftEstadoComentarios,
      draftProjectId,
      draftReimbursableExpense,
      isCreateMode
    ]
  );
  const handleUpdate = (0, import_react3.useCallback)(async () => {
    if (busy || !isEditing) return false;
    if (!isCreateMode && isEditLocked) return false;
    const canProceed = isCreateMode ? canCreateExpense : canEditExpense;
    if (!canProceed) {
      showPermissionModal();
      return false;
    }
    const payloadResult = buildUpdatePayload();
    if ("error" in payloadResult) {
      setModalError(payloadResult.error);
      setStatus(payloadResult.error);
      return false;
    }
    const result = await executeExpenseMutation({
      startStatus: isCreateMode ? indT("Common_Loading", "Loading") : indT("ExpenseSheets_Detail_Updating", "Updating expense sheet..."),
      fallbackErrorMessage: indT("ExpenseSheets_Detail_UpdateError", "Update error."),
      setModalError,
      setBusy,
      setStatus,
      action: async () => {
        if (isCreateMode) {
          const createPayload = payloadResult.payload;
          const payload = {
            mode: 1,
            existingHojaGastosId: void 0,
            description: createPayload.description,
            projId: createPayload.projId,
            expenseSheetStatus: 0,
            reimbursableExpense: createPayload.reimbursableExpense,
            lines: []
          };
          const response2 = await createExpenseSheet(payload);
          if (!response2.Success) {
            throw new Error(response2.Message || indT("Api_RequestFailed", "Request failed."));
          }
          const createdData = response2?.Data;
          const createdSheetId = String(createdData?.HojaGastosId ?? createdData?.hojaGastosId ?? "").trim();
          if (!createdSheetId) {
            throw new Error(indT("Api_RequestFailed", "Request failed."));
          }
          onCreateSuccess(createdSheetId);
          setStatus(indT("Common_Save", "Save"));
          return true;
        }
        const response = await updateExpenseSheetHeader(sheetId, payloadResult.payload);
        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
        }
        setStatus(indT("ExpenseSheets_Detail_Updated", "Expense sheet updated"));
        setIsEditing(false);
        return true;
      }
    });
    return result.ok;
  }, [
    busy,
    buildUpdatePayload,
    canCreateExpense,
    canEditExpense,
    isCreateMode,
    isEditLocked,
    isEditing,
    onCreateSuccess,
    setBusy,
    setIsEditing,
    setModalError,
    setStatus,
    sheetId
  ]);
  const handlePropagateReimbursableExpenseToLines = (0, import_react3.useCallback)(
    async (nextReimbursableExpense) => {
      if (busy || isCreateMode || !isEditing) return false;
      if (isEditLocked || !canEditExpense || !canEditHeaderFields) {
        showPermissionModal();
        return false;
      }
      const result = await executeExpenseMutation({
        startStatus: indT("ExpenseSheets_Detail_PropagatingReimbursable", "Updating expense sheet lines..."),
        fallbackErrorMessage: indT("ExpenseSheets_Detail_UpdateError", "Update error."),
        setModalError,
        setBusy,
        setStatus,
        action: async () => {
          await updateReimbursableExpenseOnLines(
            sheetId,
            currentLines,
            normalizeExpenseReimbursableExpense(nextReimbursableExpense)
          );
          setStatus(indT("ExpenseSheets_Detail_Updated", "Expense sheet updated"));
          setIsEditing(true);
          return true;
        }
      });
      return result.ok;
    },
    [
      busy,
      canEditExpense,
      canEditHeaderFields,
      currentLines,
      isCreateMode,
      isEditLocked,
      isEditing,
      setBusy,
      setIsEditing,
      setModalError,
      setStatus,
      sheetId
    ]
  );
  const handlePropagateProjectIdToLines = (0, import_react3.useCallback)(
    async (nextProjectId) => {
      if (busy || isCreateMode || !isEditing) return false;
      if (isEditLocked || !canEditExpense || !canEditHeaderFields) {
        showPermissionModal();
        return false;
      }
      const result = await executeExpenseMutation({
        startStatus: indT("ExpenseSheets_Detail_PropagatingProject", "Updating expense sheet lines..."),
        fallbackErrorMessage: indT("ExpenseSheets_Detail_UpdateError", "Update error."),
        setModalError,
        setBusy,
        setStatus,
        action: async () => {
          await updateProjectIdOnLines(sheetId, currentLines, nextProjectId);
          setStatus(indT("ExpenseSheets_Detail_Updated", "Expense sheet updated"));
          setIsEditing(true);
          return true;
        }
      });
      return result.ok;
    },
    [
      busy,
      canEditExpense,
      canEditHeaderFields,
      currentLines,
      isCreateMode,
      isEditLocked,
      isEditing,
      setBusy,
      setIsEditing,
      setModalError,
      setStatus,
      sheetId
    ]
  );
  const handleStatusTransition = (0, import_react3.useCallback)(
    async (nextStatus, startStatus, statusCommentOverride) => {
      if (busy || isCreateMode || !sheetId) return false;
      if (!canTransitionStatus) {
        showPermissionModal();
        return false;
      }
      const payloadResult = buildUpdatePayload(nextStatus, statusCommentOverride);
      if ("error" in payloadResult) {
        setModalError(payloadResult.error);
        setStatus(payloadResult.error);
        return false;
      }
      const result = await executeExpenseMutation({
        startStatus,
        fallbackErrorMessage: indT("ExpenseSheets_Detail_UpdateError", "Update error."),
        setModalError,
        setBusy,
        setStatus,
        action: async () => {
          const response = await updateExpenseSheetHeader(sheetId, payloadResult.payload);
          if (!response.Success) {
            throw new Error(response.Message || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
          }
          setStatus(indT("ExpenseSheets_Detail_Updated", "Expense sheet updated"));
          setIsEditing(false);
          return true;
        }
      });
      return result.ok;
    },
    [
      busy,
      buildUpdatePayload,
      canTransitionStatus,
      isCreateMode,
      setBusy,
      setIsEditing,
      setModalError,
      setStatus,
      sheetId
    ]
  );
  const handleDelete = (0, import_react3.useCallback)(async () => {
    if (busy) return false;
    if (isDeleteLocked) return false;
    if (!canDeleteExpense) {
      showPermissionModal();
      return false;
    }
    const result = await executeExpenseMutation({
      startStatus: indT("ExpenseSheets_Detail_Deleting", "Deleting expense sheet..."),
      fallbackErrorMessage: indT("ExpenseSheets_Detail_DeleteError", "Delete error."),
      setModalError,
      setBusy,
      setStatus,
      action: async () => {
        const response = await deleteExpenseSheet(sheetId);
        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
        }
        setStatus(indT("ExpenseSheets_Detail_Deleted", "Expense sheet deleted"));
        return true;
      }
    });
    return result.ok;
  }, [busy, canDeleteExpense, isDeleteLocked, setBusy, setModalError, setStatus, sheetId]);
  return {
    handleUpdate,
    handlePropagateReimbursableExpenseToLines,
    handlePropagateProjectIdToLines,
    handleStatusTransition,
    handleDelete
  };
};

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailTopbarActions.ts
var useExpenseSheetDetailTopbarActions = ({
  busy,
  modalOpen,
  isEditing,
  isCreateMode,
  actionMode = "default",
  isLocked,
  isEditLocked,
  isDeleteLocked,
  permissionsReady = true,
  canEditExpense,
  canCreateExpense,
  canDeleteExpense,
  setModalError,
  handleEnableEdit,
  handleCancelEdit,
  handleUpdate,
  handleDelete,
  onSaveSuccess,
  onDeleteSuccess,
  saveConfirmTitle,
  saveConfirmMessage,
  saveConfirmText,
  saveConfirmOnCancel,
  openConfirm,
  closeConfirm
}) => {
  useExpenseTopbarCrudActions({
    actionGroupId: "expense-sheet-detail-actions",
    ids: {
      editIconId: "expenseEditIcon",
      saveIconId: "expenseSaveIcon",
      deleteBtnId: "expenseDeleteBtn",
      cancelBtnId: "expenseCancelBtn"
    },
    events: {
      editEvent: "expense-detail-edit",
      deleteEvent: "expense-detail-delete",
      cancelEvent: "expense-detail-cancel-edit"
    },
    busy,
    modalOpen,
    isEditing,
    isCreateMode,
    isLocked,
    actionMode,
    isEditLocked,
    isDeleteLocked,
    allowCreateModeActionsWhenLocked: true,
    permissionsReady,
    canCreate: canCreateExpense,
    canEdit: canEditExpense,
    canDelete: canDeleteExpense,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleSave: handleUpdate,
    handleDelete,
    saveConfirmTitle: saveConfirmTitle || indT("ExpenseSheets_Detail_SaveChanges_Title", "Save changes"),
    saveConfirmMessage: saveConfirmMessage || indT("ExpenseSheets_Detail_SaveChanges_Body", "Do you want to save changes?"),
    saveConfirmText: saveConfirmText || indT("Common_Save", "Save"),
    saveConfirmOnCancel,
    deleteConfirmTitle: indT("ExpenseSheets_Detail_DeleteSheet_Title", "Delete expense sheet"),
    deleteConfirmMessage: indT("ExpenseSheets_Detail_DeleteSheet_Body", "Do you want to delete this expense sheet?"),
    deleteConfirmText: indT("Common_Delete", "Delete"),
    onSaveSuccess,
    onDeleteSuccess: onDeleteSuccess || (() => navigateToExpenseUrl("/Gastos/ExpenseSheets")),
    openConfirm,
    closeConfirm
  });
};

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailState.ts
var import_react4 = __toESM(require_react());
var EXCHANGE_RATE_DEBOUNCE_MS = 400;
var EXCHANGE_RATE_REFERENCE_AMOUNT = 100;
var EXCHANGE_RATE_DECIMAL_DIGITS = 7;
var EXPENSE_STATUS_APPROVED = 2;
var EXPENSE_STATUS_PAID = 4;
var formatExchangeRateInputValue = (value) => {
  return formatExpenseInputNumber(value, {
    minimumFractionDigits: EXCHANGE_RATE_DECIMAL_DIGITS,
    maximumFractionDigits: EXCHANGE_RATE_DECIMAL_DIGITS,
    useGrouping: true,
    fallback: ""
  });
};
var SAME_CURRENCY_EXCHANGE_RATE_INPUT = formatExchangeRateInputValue(EXCHANGE_RATE_REFERENCE_AMOUNT);
var buildCreateHeaderDraft = () => {
  return {
    hojaGastosId: "",
    description: "",
    projId: "",
    currencyCode: "",
    totalAmount: null,
    expenseSheetStatus: 0,
    exchangeRateMode: 0,
    reimbursableExpense: DEFAULT_REIMBURSABLE_EXPENSE,
    createdDate: "",
    exchRate: String(EXCHANGE_RATE_REFERENCE_AMOUNT)
  };
};
var shouldShowExchangeRate = (value) => {
  if (!value) return false;
  const parsed = parseExpenseNumericInput(value);
  if (parsed === null) return true;
  return Math.abs(parsed) > 0;
};
var useExpenseSheetDetailState = ({
  hasAccess,
  canCreateExpense,
  allowSelfManagement,
  canManageOtherUsers,
  currentAxUserId,
  currentCrmUserId,
  selectedManagedUserId,
  sheetId,
  isCreateMode,
  onForbidden
}) => {
  const [header, setHeader] = (0, import_react4.useState)(null);
  const [lines, setLines] = (0, import_react4.useState)([]);
  const [linePage, setLinePage] = (0, import_react4.useState)(1);
  const [isLoading, setIsLoading] = (0, import_react4.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react4.useState)("");
  const [busy, setBusy] = (0, import_react4.useState)(false);
  const [status, setStatus] = (0, import_react4.useState)("");
  const [isEditing, setIsEditing] = (0, import_react4.useState)(false);
  const [modalError, setModalError] = (0, import_react4.useState)("");
  const [draftDescription, setDraftDescription] = (0, import_react4.useState)("");
  const [draftProjectId, setDraftProjectId] = (0, import_react4.useState)("");
  const [draftCurrencyCode, setDraftCurrencyCode] = (0, import_react4.useState)("");
  const [draftExchangeRate, setDraftExchangeRate] = (0, import_react4.useState)("");
  const [draftReimbursableExpense, setDraftReimbursableExpense] = (0, import_react4.useState)(DEFAULT_REIMBURSABLE_EXPENSE);
  const [draftEstadoComentarios, setDraftEstadoComentarios] = (0, import_react4.useState)("");
  const [defaultCurrencyCode, setDefaultCurrencyCode] = (0, import_react4.useState)("");
  const [isExchangeRateLoading, setIsExchangeRateLoading] = (0, import_react4.useState)(false);
  const [exchangeRateMessage, setExchangeRateMessage] = (0, import_react4.useState)("");
  const [exchangeRateMessageIsError, setExchangeRateMessageIsError] = (0, import_react4.useState)(false);
  const [officialExchangeRateValue, setOfficialExchangeRateValue] = (0, import_react4.useState)("");
  const [officialExchangeRateRawValue, setOfficialExchangeRateRawValue] = (0, import_react4.useState)("");
  const [officialExchangeRateDate, setOfficialExchangeRateDate] = (0, import_react4.useState)("");
  const [officialExchangeRateSource, setOfficialExchangeRateSource] = (0, import_react4.useState)("");
  const hydrateDraftFromHeader = (0, import_react4.useCallback)((nextHeader) => {
    setDraftDescription(safeText(nextHeader?.description));
    setDraftProjectId(safeText(nextHeader?.projId));
    setDraftCurrencyCode(safeText(nextHeader?.currencyCode));
    setDraftReimbursableExpense(normalizeExpenseReimbursableExpense(nextHeader?.reimbursableExpense));
    setDraftExchangeRate(
      formatExpenseInputNumber(nextHeader?.exchRate, {
        minimumFractionDigits: EXCHANGE_RATE_DECIMAL_DIGITS,
        maximumFractionDigits: EXCHANGE_RATE_DECIMAL_DIGITS,
        useGrouping: true,
        fallback: ""
      })
    );
    setDraftEstadoComentarios(safeText(nextHeader?.estadoComentarios));
  }, []);
  (0, import_react4.useEffect)(() => {
    const loadDetail = async () => {
      if (!hasAccess) {
        onForbidden();
        return;
      }
      if (isCreateMode) {
        if (!canCreateExpense) {
          onForbidden();
          return;
        }
        const draftHeader = buildCreateHeaderDraft();
        setHeader(draftHeader);
        setLines([]);
        setLinePage(1);
        setIsEditing(true);
        hydrateDraftFromHeader(draftHeader);
        setStatus("");
        setErrorMessage("");
        return;
      }
      if (!sheetId) {
        setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet was not found."));
        setHeader(null);
        setLines([]);
        return;
      }
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await fetchExpenseSheetDetail(sheetId, {
          suppressPermissionModal: true
        });
        if (response?.Success === false) {
          setErrorMessage(response?.Message || indT("ExpenseSheets_LoadError", "Could not load expense sheet detail."));
          setHeader(null);
          setLines([]);
          return;
        }
        const sheets = Array.isArray(response?.Items) ? response.Items : [];
        const selectedSheet = sheets.find((entry) => safeText(entry?.HojaGastosId).toUpperCase() === sheetId.trim().toUpperCase()) || sheets[0];
        if (!selectedSheet) {
          setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet was not found."));
          setHeader(null);
          setLines([]);
          return;
        }
        const nextHeader = mapExpenseSheetHeader(selectedSheet);
        const nextLines = (Array.isArray(selectedSheet.Lines) ? selectedSheet.Lines : []).map(
          (entry) => mapExpenseSheetLine(entry)
        );
        setHeader(nextHeader);
        setLines(nextLines);
      } catch (error) {
        if (error instanceof ApiFetchError && error.status === 403) {
          onForbidden();
          return;
        }
        setErrorMessage(
          error instanceof Error ? error.message : indT("ExpenseSheets_LoadError", "Could not load expense sheet detail.")
        );
        setHeader(null);
        setLines([]);
      } finally {
        setIsLoading(false);
      }
    };
    void loadDetail();
  }, [canCreateExpense, hasAccess, hydrateDraftFromHeader, isCreateMode, onForbidden, sheetId]);
  (0, import_react4.useEffect)(() => {
    if (!header || isEditing) return;
    hydrateDraftFromHeader(header);
  }, [header, hydrateDraftFromHeader, isEditing]);
  (0, import_react4.useEffect)(() => {
    if (!hasAccess) return;
    let isCancelled = false;
    const controller = new AbortController();
    const loadDefaultCurrencyCode = async () => {
      try {
        const code = await getExpenseSheetDefaultCurrencyCode({
          suppressPermissionModal: true,
          signal: controller.signal
        });
        if (isCancelled) return;
        setDefaultCurrencyCode(safeText(code).toUpperCase());
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    };
    void loadDefaultCurrencyCode();
    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [hasAccess]);
  const hasActiveProcess = (0, import_react4.useMemo)(() => busy || isEditing, [busy, isEditing]);
  (0, import_react4.useEffect)(() => {
    setExpenseNavigationGuard(hasActiveProcess);
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [hasActiveProcess]);
  const projectValue = safeText(header?.projId);
  const statusCode = typeof header?.expenseSheetStatus === "number" ? header.expenseSheetStatus : null;
  const isSheetApproved = statusCode === EXPENSE_STATUS_APPROVED;
  const isSheetPaidByStatus = statusCode === EXPENSE_STATUS_PAID;
  const isSheetPaidByVoucher = hasAssignedVoucher(header?.voucher);
  const isSheetPaid = isSheetPaidByStatus || isSheetPaidByVoucher;
  const isManagingOtherUser = isManagingOtherExpenseRecord({
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    recordOwnerUserId: header?.userId,
    isCreateMode
  });
  const detailPolicy = (0, import_react4.useMemo)(() => {
    if (isCreateMode) {
      return {
        interactionMode: "full_edit",
        showFab: false,
        canDeleteSheet: false,
        statusActions: []
      };
    }
    return resolveExpenseSheetDetailPolicy({
      statusCode,
      isManagingOtherUser,
      allowSelfManagement,
      isPaid: isSheetPaid
    });
  }, [allowSelfManagement, isCreateMode, isManagingOtherUser, isSheetPaid, statusCode]);
  const canEditHeaderFieldsCurrent = isCreateMode || !isManagingOtherUser && detailPolicy.interactionMode === "full_edit";
  const canEditStatusCommentCurrent = !isCreateMode && detailPolicy.interactionMode === "comment_only_edit";
  const canEditAnyCurrent = isCreateMode && canCreateExpense || canEditHeaderFieldsCurrent || canEditStatusCommentCurrent;
  const canUseFullEditFeatures = !isCreateMode && detailPolicy.interactionMode === "full_edit";
  const isSheetLocked = isSheetApproved || isSheetPaid;
  const hasLines = lines.length > 0;
  const exchangeRateValue = formatExpenseInputNumber(safeText(header?.exchRate), {
    minimumFractionDigits: EXCHANGE_RATE_DECIMAL_DIGITS,
    maximumFractionDigits: EXCHANGE_RATE_DECIMAL_DIGITS,
    useGrouping: true,
    fallback: ""
  });
  const showExchangeRate = (0, import_react4.useMemo)(() => shouldShowExchangeRate(exchangeRateValue), [exchangeRateValue]);
  const normalizedDraftCurrency = (0, import_react4.useMemo)(() => draftCurrencyCode.trim().toUpperCase(), [draftCurrencyCode]);
  const normalizedDefaultCurrency = (0, import_react4.useMemo)(() => safeText(defaultCurrencyCode).toUpperCase(), [defaultCurrencyCode]);
  const exchangeRateBaseCurrency = normalizedDefaultCurrency || "EUR";
  const uiLocale = (0, import_react4.useMemo)(() => {
    if (typeof document === "undefined") return "es-ES";
    return safeText(document.documentElement?.lang) || "es-ES";
  }, []);
  const formExchangeDate = (0, import_react4.useMemo)(() => {
    const parsedDate = parseExpenseDate(safeText(header?.createdDate));
    if (parsedDate) return toIsoDate(parsedDate);
    return toIsoDate(/* @__PURE__ */ new Date());
  }, [header?.createdDate]);
  const shouldLoadHeaderExchangeRate = false;
  const exchangeRateValidationMessage = "";
  const isCurrencyLockedByLines = false;
  const isExchangeRateLockedByLines = false;
  (0, import_react4.useEffect)(() => {
    let isCancelled = false;
    let requestTimer = null;
    let requestAbortController = null;
    const clearRequestArtifacts = () => {
      if (requestTimer) {
        clearTimeout(requestTimer);
        requestTimer = null;
      }
      if (requestAbortController) {
        requestAbortController.abort();
        requestAbortController = null;
      }
    };
    if (!shouldLoadHeaderExchangeRate || !isEditing || !canEditHeaderFieldsCurrent || isExchangeRateLockedByLines) {
      setIsExchangeRateLoading(false);
      setExchangeRateMessage("");
      setExchangeRateMessageIsError(false);
      setOfficialExchangeRateValue("");
      setOfficialExchangeRateRawValue("");
      setOfficialExchangeRateDate("");
      setOfficialExchangeRateSource("");
      return () => {
        clearRequestArtifacts();
      };
    }
    if (!normalizedDraftCurrency || !exchangeRateBaseCurrency) {
      setIsExchangeRateLoading(false);
      setExchangeRateMessage("");
      setExchangeRateMessageIsError(false);
      setOfficialExchangeRateValue("");
      setOfficialExchangeRateRawValue("");
      setOfficialExchangeRateDate("");
      setOfficialExchangeRateSource("");
      return () => {
        clearRequestArtifacts();
      };
    }
    if (normalizedDraftCurrency === exchangeRateBaseCurrency) {
      setDraftExchangeRate(SAME_CURRENCY_EXCHANGE_RATE_INPUT);
      setOfficialExchangeRateValue(SAME_CURRENCY_EXCHANGE_RATE_INPUT);
      setIsExchangeRateLoading(false);
      setExchangeRateMessage("");
      setExchangeRateMessageIsError(false);
      setOfficialExchangeRateRawValue("");
      setOfficialExchangeRateDate("");
      setOfficialExchangeRateSource("");
      return () => {
        clearRequestArtifacts();
      };
    }
    requestTimer = setTimeout(async () => {
      requestAbortController = new AbortController();
      setIsExchangeRateLoading(true);
      setExchangeRateMessage("");
      setExchangeRateMessageIsError(false);
      setOfficialExchangeRateValue("");
      setOfficialExchangeRateRawValue("");
      setOfficialExchangeRateDate("");
      setOfficialExchangeRateSource("");
      try {
        const response = await getExchangeRate(
          exchangeRateBaseCurrency,
          normalizedDraftCurrency,
          formExchangeDate,
          {
            suppressPermissionModal: true,
            signal: requestAbortController.signal
          }
        );
        if (isCancelled) return;
        if (!response.Success || !response.Data || !Number.isFinite(Number(response.Data.Rate))) {
          setOfficialExchangeRateRawValue("");
          setOfficialExchangeRateDate("");
          setOfficialExchangeRateSource("");
          setExchangeRateMessage(
            safeText(response.Message) || indT("ExpenseSheets_ExchangeRate_Unavailable", "No se pudo obtener el tipo de cambio.")
          );
          setExchangeRateMessageIsError(true);
          return;
        }
        const officialRatePerBaseUnit = Number(response.Data.Rate);
        const officialRateForReferenceAmount = officialRatePerBaseUnit * EXCHANGE_RATE_REFERENCE_AMOUNT;
        const nextExchangeRateValue = formatExchangeRateInputValue(officialRateForReferenceAmount);
        const officialRateRawValue = formatExchangeRateInputValue(officialRatePerBaseUnit);
        setOfficialExchangeRateValue(nextExchangeRateValue);
        setOfficialExchangeRateRawValue(officialRateRawValue);
        setDraftExchangeRate(nextExchangeRateValue);
        const effectiveRateDate = safeText(response.Data.Date) || formExchangeDate;
        const source = safeText(response.Data.Source);
        setOfficialExchangeRateDate(effectiveRateDate);
        setOfficialExchangeRateSource(source);
        const officialLabel = getExpenseExchangeRateModeLabel(0) || indT("ExpenseSheets_Filter_ExchangeRateMode_Official", "T.C. Oficial");
        const localizedRateDate = formatExpenseDisplayDate(effectiveRateDate, uiLocale) || effectiveRateDate;
        const exchangeRateInfoMessage = source ? `${officialLabel} ${localizedRateDate} (${source})` : `${officialLabel} ${localizedRateDate}`;
        setExchangeRateMessage(officialRateRawValue ? `${exchangeRateInfoMessage} - ${officialRateRawValue}` : exchangeRateInfoMessage);
        setExchangeRateMessageIsError(false);
      } catch (error) {
        if (isCancelled) return;
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (error instanceof ApiFetchError) {
          if (error.status === 404) {
            setOfficialExchangeRateValue("");
            setOfficialExchangeRateRawValue("");
            setOfficialExchangeRateDate("");
            setOfficialExchangeRateSource("");
            setExchangeRateMessage(indT("ExpenseSheets_ExchangeRate_NotFound", "No hay tipo de cambio para la fecha"));
            setExchangeRateMessageIsError(true);
            return;
          }
          if (error.status === 422 || error.status === 500) {
            setOfficialExchangeRateValue("");
            setOfficialExchangeRateRawValue("");
            setOfficialExchangeRateDate("");
            setOfficialExchangeRateSource("");
            setExchangeRateMessage(
              safeText(error.message) || indT("ExpenseSheets_ExchangeRate_Unavailable", "No se pudo obtener el tipo de cambio.")
            );
            setExchangeRateMessageIsError(true);
            return;
          }
          setOfficialExchangeRateValue("");
          setOfficialExchangeRateRawValue("");
          setOfficialExchangeRateDate("");
          setOfficialExchangeRateSource("");
          setExchangeRateMessage(
            safeText(error.message) || indT("ExpenseSheets_ExchangeRate_Unavailable", "No se pudo obtener el tipo de cambio.")
          );
          setExchangeRateMessageIsError(true);
          return;
        }
        setOfficialExchangeRateValue("");
        setOfficialExchangeRateRawValue("");
        setOfficialExchangeRateDate("");
        setOfficialExchangeRateSource("");
        setExchangeRateMessage(indT("ExpenseSheets_ExchangeRate_Unavailable", "No se pudo obtener el tipo de cambio."));
        setExchangeRateMessageIsError(true);
      } finally {
        if (!isCancelled) {
          setIsExchangeRateLoading(false);
        }
      }
    }, EXCHANGE_RATE_DEBOUNCE_MS);
    return () => {
      isCancelled = true;
      clearRequestArtifacts();
    };
  }, [
    canEditHeaderFieldsCurrent,
    formExchangeDate,
    exchangeRateBaseCurrency,
    isEditing,
    isExchangeRateLockedByLines,
    normalizedDraftCurrency,
    shouldLoadHeaderExchangeRate,
    uiLocale,
    setDraftExchangeRate
  ]);
  const handleEnableEdit = (0, import_react4.useCallback)(() => {
    if (isCreateMode || isLoading || !header) {
      return;
    }
    if (!canEditAnyCurrent) {
      onForbidden();
      return;
    }
    setModalError("");
    setIsEditing(true);
    hydrateDraftFromHeader(header);
    setStatus(indT("ExpenseSheets_Detail_EditingEnabled", "Editing enabled"));
  }, [canEditAnyCurrent, header, hydrateDraftFromHeader, isCreateMode, isLoading, onForbidden]);
  const handleCancelEdit = (0, import_react4.useCallback)(() => {
    if (isCreateMode) {
      navigateToExpenseUrl("/Gastos/ExpenseSheets", {
        askConfirmation: true
      });
      return;
    }
    if (!isEditing) return;
    setIsEditing(false);
    setModalError("");
    hydrateDraftFromHeader(header);
    setStatus(indT("Common_Cancel", "Cancel"));
  }, [header, hydrateDraftFromHeader, isCreateMode, isEditing]);
  const handleOpenCreateSheetMode = (0, import_react4.useCallback)(() => {
    if (!canCreateExpense) {
      onForbidden();
      return;
    }
    if (isCreateMode) {
      return;
    }
    navigateToExpenseUrl("/Gastos/ExpenseSheetDetail?mode=create", {
      askConfirmation: isEditing
    });
  }, [canCreateExpense, isCreateMode, isEditing, onForbidden]);
  const handleOpenCreateLineMode = (0, import_react4.useCallback)(() => {
    if (!sheetId || !canUseFullEditFeatures) {
      onForbidden();
      return;
    }
    if (isCreateMode) {
      return;
    }
    const targetUrl = `/Gastos/ExpenseSheetLineDetail?hojaGastosId=${encodeURIComponent(sheetId)}&mode=create`;
    navigateToExpenseUrl(targetUrl, {
      askConfirmation: isEditing
    });
  }, [canUseFullEditFeatures, isCreateMode, isEditing, onForbidden, sheetId]);
  const openTicketsFromSheet = (0, import_react4.useCallback)(
    (action) => {
      if (!sheetId || !canUseFullEditFeatures) {
        onForbidden();
        return;
      }
      if (isCreateMode) {
        return;
      }
      const query = new URLSearchParams({
        action,
        hojaGastosId: sheetId
      });
      navigateToExpenseUrl(`/Gastos/Tickets?${query.toString()}`, {
        askConfirmation: isEditing
      });
    },
    [canUseFullEditFeatures, isCreateMode, isEditing, onForbidden, sheetId]
  );
  const handleOpenCreateTicketMode = (0, import_react4.useCallback)(() => {
    openTicketsFromSheet("new");
  }, [openTicketsFromSheet]);
  const handleOpenLinkTicketMode = (0, import_react4.useCallback)(() => {
    openTicketsFromSheet("link");
  }, [openTicketsFromSheet]);
  const navigateToCreatedSheet = (0, import_react4.useCallback)((createdSheetId) => {
    const safeCreatedSheetId = safeText(createdSheetId);
    if (!safeCreatedSheetId) return;
    const targetUrl = `/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(safeCreatedSheetId)}`;
    navigateToExpenseUrl(targetUrl);
  }, []);
  const navigateToLineDetail = (0, import_react4.useCallback)(
    (lineRecId, options) => {
      const safeLineId = safeText(lineRecId);
      const safeSheetId = safeText(sheetId);
      if (!safeLineId || !safeSheetId) return;
      const safeMode = options?.mode === "edit" ? "edit" : "";
      const targetUrl = `/Gastos/ExpenseSheetLineDetail?hojaGastosId=${encodeURIComponent(safeSheetId)}&lineRecId=${encodeURIComponent(safeLineId)}${safeMode ? `&mode=${safeMode}` : ""}`;
      navigateToExpenseUrl(targetUrl, {
        askConfirmation: options?.askConfirmation ?? true,
        bypassGuardOnce: options?.bypassGuardOnce ?? false
      });
    },
    [sheetId]
  );
  return {
    header,
    lines,
    linePage,
    isLoading,
    errorMessage,
    busy,
    status,
    isEditing,
    modalError,
    draftDescription,
    draftProjectId,
    draftCurrencyCode,
    draftExchangeRate,
    draftReimbursableExpense,
    draftEstadoComentarios,
    officialExchangeRateValue,
    officialExchangeRateRawValue,
    officialExchangeRateDate,
    officialExchangeRateSource,
    isExchangeRateLoading,
    exchangeRateMessage,
    exchangeRateMessageIsError,
    projectValue,
    isSheetApproved,
    isSheetPaid,
    isSheetLocked,
    exchangeRateValue,
    showExchangeRate,
    normalizedDraftCurrency,
    exchangeRateBaseCurrency,
    exchangeRateReferenceAmount: EXCHANGE_RATE_REFERENCE_AMOUNT,
    exchangeRateValidationMessage,
    detailPolicy,
    isManagingOtherUser,
    canEditStatusCommentCurrent,
    canEditAnyCurrent,
    canUseFullEditFeatures,
    canEditHeaderFieldsCurrent,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    setLinePage,
    setLines,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setDraftDescription,
    setDraftProjectId,
    setDraftCurrencyCode,
    setDraftExchangeRate,
    setDraftReimbursableExpense,
    setDraftEstadoComentarios,
    handleEnableEdit,
    handleCancelEdit,
    handleOpenCreateSheetMode,
    handleOpenCreateLineMode,
    handleOpenCreateTicketMode,
    handleOpenLinkTicketMode,
    navigateToCreatedSheet,
    navigateToLineDetail
  };
};

// Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetDetailIcons.tsx
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var NewTicketIcon = () => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "size-5", children: [
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 20h-5a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v2" }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.362 11.15a3 3 0 1 0 -4.144 4.263" }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 21v-4a2 2 0 1 1 4 0v4" }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 19h4" }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 15v6" })
] });
var LinkTicketIcon = () => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "size-5", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" }) });
var NewLineIcon = () => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "size-5", children: [
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 19c3.333 -2 5 -4 5 -6c0 -3 -1 -3 -2 -3s-2.032 1.085 -2 3c.034 2.048 1.658 2.877 2.5 4c1.5 2 2.5 2.5 3.5 1c.667 -1 1.167 -1.833 1.5 -2.5c1 2.333 2.333 3.5 4 3.5h2.5" }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2" }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16 7h4" })
] });

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailPageController.tsx
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var LINES_PAGE_SIZE = 6;
var EXPENSE_STATUS_APPROVAL_REQUESTED = 1;
var pagedSlice = (items, page, pageSize) => {
  if (!items.length) return [];
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
};
var hasPositiveTotalAmount = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0;
};
var bootstrapExpenseApiAuth = () => {
  configureExpenseApiAuth({
    token: safeText(window.__IND_API_TOKEN__),
    entraOid: safeText(window.__IND_ENTRA_OID__),
    appCode: safeText(window.__IND_APP_CODE__)
  });
};
var useExpenseSheetDetailPageController = () => {
  const {
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    managementBootstrapReady
  } = useAuthContext();
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const canCreateExpense = canAccess("GASTOS_HOJA_GASTO", "Add");
  const sheetId = safeText(window.__EXPENSE_SHEET_ID__);
  const sheetMode = safeText(window.__EXPENSE_SHEET_MODE__).toLowerCase();
  const isCreateMode = sheetMode === "create";
  const isManagingOtherUserBySelection = isManagingOtherExpenseRecord({
    canManageOtherUsers,
    currentAxUserId,
    selectedManagedUserId,
    recordOwnerUserId: "",
    isCreateMode
  });
  const canCreateExpenseForSelectedContext = canCreateExpense && !isManagingOtherUserBySelection;
  const lineContainerRef = (0, import_react5.useRef)(null);
  const createdSheetIdRef = (0, import_react5.useRef)("");
  const cameraInputRef = (0, import_react5.useRef)(null);
  const galleryInputRef = (0, import_react5.useRef)(null);
  const [isRedirectingAfterCreate, setIsRedirectingAfterCreate] = (0, import_react5.useState)(false);
  const [statusTransitionComment, setStatusTransitionComment] = (0, import_react5.useState)("");
  const [showStatusTransitionCommentField, setShowStatusTransitionCommentField] = (0, import_react5.useState)(false);
  const [confirmedProjectId, setConfirmedProjectId] = (0, import_react5.useState)("");
  const statusTransitionCommentRef = (0, import_react5.useRef)("");
  const paginationLabels = (0, import_react5.useMemo)(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last")
    }),
    []
  );
  const detailState = useExpenseSheetDetailState({
    hasAccess,
    canCreateExpense: canCreateExpenseForSelectedContext,
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    sheetId,
    isCreateMode,
    onForbidden: showPermissionModal
  });
  const {
    header,
    lines,
    linePage,
    isLoading,
    errorMessage,
    busy,
    status,
    isEditing,
    modalError,
    draftDescription,
    draftProjectId,
    draftCurrencyCode,
    draftExchangeRate,
    draftReimbursableExpense,
    draftEstadoComentarios,
    officialExchangeRateValue,
    officialExchangeRateRawValue,
    officialExchangeRateDate,
    officialExchangeRateSource,
    projectValue,
    detailPolicy,
    isManagingOtherUser,
    isSheetLocked,
    exchangeRateValue,
    showExchangeRate,
    normalizedDraftCurrency,
    exchangeRateBaseCurrency,
    exchangeRateReferenceAmount,
    exchangeRateValidationMessage,
    canEditAnyCurrent,
    canUseFullEditFeatures,
    canEditHeaderFieldsCurrent,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    setLinePage,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setDraftDescription,
    setDraftProjectId,
    setDraftCurrencyCode,
    setDraftExchangeRate,
    setDraftReimbursableExpense,
    setDraftEstadoComentarios,
    handleEnableEdit,
    handleCancelEdit,
    handleOpenCreateLineMode,
    handleOpenLinkTicketMode,
    navigateToCreatedSheet,
    navigateToLineDetail
  } = detailState;
  const canCreateExpenseForCurrentView = canCreateExpense && !isManagingOtherUser;
  const canDeleteExpenseForCurrentView = detailPolicy.canDeleteSheet;
  const canTransitionStatus = detailPolicy.statusActions.length > 0;
  const isReadOnlyMode = detailPolicy.interactionMode === "read_only";
  const currentStatusCode = typeof header?.expenseSheetStatus === "number" ? header.expenseSheetStatus : null;
  const hidesCrudTopbarByStatus = currentStatusCode === EXPENSE_STATUS_APPROVAL_REQUESTED && !canEditAnyCurrent;
  const topbarActionMode = !isCreateMode && (isReadOnlyMode || hidesCrudTopbarByStatus) ? "view_only" : "default";
  const detailPermissionsReady = managementBootstrapReady && (isCreateMode || !!header);
  const { invalidateCachedListForRefetch } = useExpenseSheetsFilterCache();
  const { modal, openConfirm, closeConfirm, cancelConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "OK"),
    defaultCancelText: indT("Confirm_No", "Cancel")
  });
  const resetStatusTransitionDialog = (0, import_react5.useCallback)(() => {
    statusTransitionCommentRef.current = "";
    setStatusTransitionComment("");
    setShowStatusTransitionCommentField(false);
  }, []);
  const handleCloseConfirm = (0, import_react5.useCallback)(() => {
    resetStatusTransitionDialog();
    closeConfirm();
  }, [closeConfirm, resetStatusTransitionDialog]);
  const handleCancelConfirm = (0, import_react5.useCallback)(() => {
    resetStatusTransitionDialog();
    cancelConfirm();
  }, [cancelConfirm, resetStatusTransitionDialog]);
  const handleModalConfirm = (0, import_react5.useCallback)(async () => {
    setModalError("");
    await handleConfirm({
      busy,
      onError: (msg) => {
        setModalError(msg);
        setStatus(msg);
      }
    });
  }, [busy, handleConfirm, setModalError, setStatus]);
  const modalLoadingText = indT("Common_Loading", "Loading");
  const modalCancelText = modal.cancelText || indT("Confirm_No", "Cancel");
  const modalConfirmText = busy ? modalLoadingText : !busy && modalError ? indT("Common_OK", "OK") : modal.confirmText || indT("Confirm_Yes", "OK");
  const handleModalButtonConfirm = (0, import_react5.useCallback)(() => {
    if (!busy && modalError) {
      handleCancelConfirm();
      return;
    }
    void handleModalConfirm();
  }, [busy, handleCancelConfirm, handleModalConfirm, modalError]);
  const visibleLines = (0, import_react5.useMemo)(() => pagedSlice(lines, linePage, LINES_PAGE_SIZE), [linePage, lines]);
  const totalLinePages = Math.ceil((lines.length || 0) / LINES_PAGE_SIZE);
  const totalAmountText = (0, import_react5.useMemo)(
    () => formatAmountWithCurrency(header?.totalAmount ?? null, safeText(exchangeRateBaseCurrency || header?.currencyCode)),
    [exchangeRateBaseCurrency, header?.currencyCode, header?.totalAmount]
  );
  const hasStatusActionContent = lines.length > 0 || hasPositiveTotalAmount(header?.totalAmount);
  const areStatusActionsDisabled = !hasStatusActionContent;
  const ownerDisplay = (0, import_react5.useMemo)(() => {
    const ownerUserId = safeText(header?.userId);
    const currentUserId = safeText(currentCrmUserId);
    if (!ownerUserId || !currentUserId || ownerUserId.toUpperCase() === currentUserId.toUpperCase()) {
      return "";
    }
    const ownerName = safeText(header?.userName);
    return ownerName ? `${ownerName} (${ownerUserId})` : ownerUserId;
  }, [currentCrmUserId, header?.userId, header?.userName]);
  const {
    handleUpdate,
    handlePropagateReimbursableExpenseToLines,
    handlePropagateProjectIdToLines,
    handleStatusTransition,
    handleDelete
  } = useExpenseSheetDetailMutations({
    busy,
    isEditing,
    isCreateMode,
    isEditLocked: isReadOnlyMode,
    isDeleteLocked: isSheetLocked,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    lockedCurrencyCode: safeText(header?.currencyCode),
    lockedExchangeRate: safeText(header?.exchRate),
    canCreateExpense: canCreateExpenseForCurrentView,
    canEditExpense: canEditAnyCurrent,
    canDeleteExpense: canDeleteExpenseForCurrentView,
    canEditHeaderFields: canEditHeaderFieldsCurrent,
    canTransitionStatus,
    sheetId,
    draftDescription,
    draftCurrencyCode,
    draftExchangeRate,
    draftReimbursableExpense,
    officialExchangeRateValue,
    draftProjectId,
    draftEstadoComentarios,
    currentExpenseSheetStatus: header?.expenseSheetStatus,
    currentLines: lines,
    exchangeRateBaseCurrency,
    onCreateSuccess: (createdSheetId) => {
      createdSheetIdRef.current = safeText(createdSheetId);
    },
    setModalError,
    setBusy,
    setStatus,
    setIsEditing
  });
  import_react5.default.useEffect(() => {
    if (isEditing) return;
    setConfirmedProjectId(safeText(projectValue));
  }, [isEditing, projectValue]);
  const handleConfirmProjectPropagation = (0, import_react5.useCallback)(
    async (nextProjectId) => {
      const safeProjectId = safeText(nextProjectId);
      const ok = await handlePropagateProjectIdToLines(safeProjectId);
      if (ok) {
        setConfirmedProjectId(safeProjectId);
        setDraftProjectId(safeProjectId);
        setIsEditing(true);
      }
      return ok;
    },
    [handlePropagateProjectIdToLines, setDraftProjectId, setIsEditing]
  );
  const handleDraftProjectIdCommit = (0, import_react5.useCallback)(
    (value) => {
      const nextValue = safeText(value);
      const previousValue = safeText(confirmedProjectId);
      if (nextValue === previousValue) {
        setDraftProjectId(nextValue);
        return;
      }
      const shouldConfirmPropagation = !isCreateMode && isEditing && canEditHeaderFieldsCurrent && lines.length > 0;
      if (!shouldConfirmPropagation) {
        setDraftProjectId(nextValue);
        setConfirmedProjectId(nextValue);
        return;
      }
      if (busy || modal.open) {
        setDraftProjectId(previousValue);
        return;
      }
      setDraftProjectId(nextValue);
      openConfirm({
        title: indT("ExpenseSheets_Detail_PropagateProject_Title", "Update lines"),
        message: indT(
          "ExpenseSheets_Detail_PropagateProject_Body",
          "The projects on all lines will be updated. Do you want to continue?"
        ),
        confirmText: indT("Confirm_Yes", "OK"),
        onCancel: () => {
          setDraftProjectId(previousValue);
        },
        onConfirm: async () => {
          return handleConfirmProjectPropagation(nextValue);
        }
      });
    },
    [
      busy,
      canEditHeaderFieldsCurrent,
      confirmedProjectId,
      handleConfirmProjectPropagation,
      isCreateMode,
      isEditing,
      lines.length,
      modal.open,
      openConfirm,
      setDraftProjectId
    ]
  );
  const handleDraftReimbursableExpenseChange = (0, import_react5.useCallback)(
    (value) => {
      const nextValue = normalizeExpenseReimbursableExpense(value);
      const previousValue = normalizeExpenseReimbursableExpense(draftReimbursableExpense);
      if (nextValue === previousValue) return;
      const shouldConfirmPropagation = !isCreateMode && isEditing && canEditHeaderFieldsCurrent && lines.length > 0;
      if (!shouldConfirmPropagation) {
        setDraftReimbursableExpense(nextValue);
        return;
      }
      if (busy || modal.open) return;
      setDraftReimbursableExpense(nextValue);
      openConfirm({
        title: indT("ExpenseSheets_Detail_PropagateReimbursable_Title", "Update lines"),
        message: indT(
          "ExpenseSheets_Detail_PropagateReimbursable_Body",
          "The reimbursable change will be propagated to every expense sheet line. Do you want to continue?"
        ),
        confirmText: indT("Confirm_Yes", "OK"),
        onCancel: () => {
          setDraftReimbursableExpense(previousValue);
        },
        onConfirm: async () => {
          const ok = await handlePropagateReimbursableExpenseToLines(nextValue);
          if (ok) {
            setIsEditing(true);
          }
          return ok;
        }
      });
    },
    [
      busy,
      canEditHeaderFieldsCurrent,
      draftReimbursableExpense,
      handlePropagateReimbursableExpenseToLines,
      isCreateMode,
      isEditing,
      lines.length,
      modal.open,
      openConfirm,
      setDraftReimbursableExpense,
      setIsEditing
    ]
  );
  const hasPendingProjectPropagation = !isCreateMode && isEditing && canEditHeaderFieldsCurrent && lines.length > 0 && safeText(draftProjectId) !== safeText(confirmedProjectId);
  const handlePendingProjectPropagationCancel = (0, import_react5.useCallback)(() => {
    if (!hasPendingProjectPropagation) return;
    setDraftProjectId(safeText(confirmedProjectId));
  }, [confirmedProjectId, hasPendingProjectPropagation, setDraftProjectId]);
  const handleUpdateWithProjectPropagation = (0, import_react5.useCallback)(async () => {
    if (hasPendingProjectPropagation) {
      const ok = await handleConfirmProjectPropagation(draftProjectId);
      if (!ok) return false;
    }
    return handleUpdate();
  }, [draftProjectId, handleConfirmProjectPropagation, handleUpdate, hasPendingProjectPropagation]);
  const projectPropagationSaveTitle = hasPendingProjectPropagation ? indT("ExpenseSheets_Detail_PropagateProject_Title", "Update lines") : void 0;
  const projectPropagationSaveMessage = hasPendingProjectPropagation ? indT(
    "ExpenseSheets_Detail_PropagateProject_Body",
    "The projects on all lines will be updated. Do you want to continue?"
  ) : void 0;
  const projectPropagationSaveConfirmText = hasPendingProjectPropagation ? indT("Confirm_Yes", "OK") : void 0;
  const handleOpenLineDetail = (0, import_react5.useCallback)(
    async (lineRecId) => {
      const safeLineId = safeText(lineRecId);
      if (!safeLineId || busy || isRedirectingAfterCreate) {
        return;
      }
      if (isEditing && canEditHeaderFieldsCurrent) {
        const ok = await handleUpdateWithProjectPropagation();
        if (!ok) {
          return;
        }
        navigateToLineDetail(safeLineId, {
          mode: "edit",
          askConfirmation: false,
          bypassGuardOnce: true
        });
        return;
      }
      navigateToLineDetail(safeLineId);
    },
    [
      busy,
      canEditHeaderFieldsCurrent,
      handleUpdateWithProjectPropagation,
      isEditing,
      isRedirectingAfterCreate,
      navigateToLineDetail
    ]
  );
  const handleSaveSuccess = (0, import_react5.useCallback)(() => {
    if (isCreateMode) {
      const createdSheetId = safeText(createdSheetIdRef.current);
      if (!createdSheetId) return;
      saveExpenseSheetCreatedReturnContext({
        sheetId: createdSheetId
      });
      clearExpenseActingUserOverride();
      setIsRedirectingAfterCreate(true);
      navigateToCreatedSheet(createdSheetId);
      return;
    }
    reloadExpensePage();
  }, [isCreateMode, navigateToCreatedSheet]);
  const handleStatusActionClick = (0, import_react5.useCallback)(
    (action) => {
      if (!hasStatusActionContent) {
        return;
      }
      const actionLabel = indT(action.labelKey, action.fallback);
      const currentStatusLabel = header?.expenseSheetStatus === null || header?.expenseSheetStatus === void 0 ? indT("Common_NoData", "No data") : getExpenseStatusLabel(header.expenseSheetStatus);
      const nextStatusLabel = getExpenseStatusLabel(action.nextStatus);
      const transitionMessage = indFormat(
        "ExpenseSheets_BottomActions_ConfirmTransition",
        "Current status: {0}\nNew status: {1}\n\nDo you want to update the expense sheet status?",
        currentStatusLabel,
        nextStatusLabel
      ).replace(/\\n/g, "\n");
      const initialComment = safeText(header?.estadoComentarios);
      statusTransitionCommentRef.current = initialComment;
      setStatusTransitionComment(initialComment);
      setShowStatusTransitionCommentField(true);
      openConfirm({
        title: actionLabel,
        message: transitionMessage,
        confirmText: actionLabel,
        onConfirm: async () => {
          const ok = await handleStatusTransition(
            action.nextStatus,
            actionLabel,
            statusTransitionCommentRef.current
          );
          if (ok) {
            invalidateCachedListForRefetch();
            resetStatusTransitionDialog();
            closeConfirm();
            reloadExpensePage();
          }
          return ok;
        }
      });
    },
    [
      closeConfirm,
      handleStatusTransition,
      hasStatusActionContent,
      header?.estadoComentarios,
      header?.expenseSheetStatus,
      invalidateCachedListForRefetch,
      openConfirm,
      resetStatusTransitionDialog
    ]
  );
  useExpenseSheetDetailTopbarActions({
    busy: busy || isRedirectingAfterCreate,
    modalOpen: modal.open,
    isEditing,
    isCreateMode,
    actionMode: topbarActionMode,
    isLocked: isSheetLocked,
    isEditLocked: isReadOnlyMode,
    isDeleteLocked: isSheetLocked,
    permissionsReady: detailPermissionsReady,
    canCreateExpense: canCreateExpenseForCurrentView,
    canEditExpense: canEditAnyCurrent,
    canDeleteExpense: canDeleteExpenseForCurrentView,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleUpdate: handleUpdateWithProjectPropagation,
    handleDelete,
    onSaveSuccess: handleSaveSuccess,
    onDeleteSuccess: () => {
      invalidateCachedListForRefetch();
      navigateToExpenseUrl("/Gastos/ExpenseSheets");
    },
    saveConfirmTitle: projectPropagationSaveTitle,
    saveConfirmMessage: projectPropagationSaveMessage,
    saveConfirmText: projectPropagationSaveConfirmText,
    saveConfirmOnCancel: handlePendingProjectPropagationCancel,
    openConfirm,
    closeConfirm
  });
  const resolveClickableCard = (0, import_react5.useCallback)((target) => {
    const node = target;
    if (!node || typeof node.closest !== "function") return null;
    const card = node.closest(".timeline-card--clickable");
    if (!card) return null;
    if (!lineContainerRef.current?.contains(card)) return null;
    return card;
  }, []);
  useTimelineCardEffects({
    containerRef: lineContainerRef,
    errorMessage,
    items: visibleLines,
    resolveClickableCard
  });
  const quickTicketFlow = useExpenseSheetQuickTicketFlow({
    sheetId: safeText(header?.hojaGastosId || sheetId),
    projectId: projectValue,
    currencyCode: safeText(header?.currencyCode),
    canCreateExpense: !isCreateMode && detailPolicy.showFab,
    isCreateMode,
    isSheetLocked: !canUseFullEditFeatures,
    linkToSheet: false,
    onForbidden: showPermissionModal,
    onCompleted: (result) => {
      const createdFileId = safeText(result?.fileId);
      if (!createdFileId) {
        reloadExpensePage();
        return;
      }
      if (result?.linkedToSheet === true) {
        reloadExpensePage();
        return;
      }
      const currentSheetId = safeText(header?.hojaGastosId || sheetId);
      const query = new URLSearchParams({
        fileId: createdFileId,
        mode: "edit",
        origin: "sheet-create"
      });
      if (currentSheetId) {
        saveExpenseTicketReturnContext({
          fileId: createdFileId,
          origin: "sheet-create",
          sheetId: currentSheetId
        });
        query.set("sheetId", currentSheetId);
      }
      navigateToExpenseUrl(`/Gastos/TicketDetail?${query.toString()}`);
    }
  });
  const fabMenuItems = (0, import_react5.useMemo)(
    () => [
      {
        id: "new-ticket",
        label: indT("ExpenseSheets_Fab_NewTicket", "Nuevo Ticket"),
        icon: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(NewTicketIcon, {}),
        onClick: quickTicketFlow.openSourcePicker
      },
      {
        id: "link-ticket",
        label: indT("ExpenseSheets_Fab_LinkTicket", "Vincular Ticket"),
        icon: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(LinkTicketIcon, {}),
        onClick: handleOpenLinkTicketMode
      },
      {
        id: "new-line",
        label: indT("ExpenseSheets_Fab_NewLine", "Nueva Linea"),
        icon: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(NewLineIcon, {}),
        onClick: handleOpenCreateLineMode
      }
    ],
    [handleOpenCreateLineMode, handleOpenLinkTicketMode, quickTicketFlow.openSourcePicker]
  );
  const showStatusActionBar = !isCreateMode && !isLoading && !isRedirectingAfterCreate && !errorMessage && detailPolicy.statusActions.length > 0;
  const showFab = !isCreateMode && detailPolicy.showFab;
  const hasVisibleStatusComment = safeText(header?.estadoComentarios).trim().length > 0;
  const statusCommentMode = hasVisibleStatusComment ? "read" : "hidden";
  const modalBody = showStatusTransitionCommentField ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_StatusComment", "Status comment") }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      "textarea",
      {
        className: "form-control resize-none",
        rows: 3,
        value: statusTransitionComment,
        onChange: (event) => {
          const nextValue = event.target.value || "";
          statusTransitionCommentRef.current = nextValue;
          setStatusTransitionComment(nextValue);
        },
        "aria-label": indT("ExpenseSheets_Field_StatusComment", "Status comment")
      }
    )
  ] }) : null;
  return {
    sheetId,
    header,
    visibleLines,
    linePage,
    totalLinePages,
    isLoading,
    errorMessage,
    isCreateMode,
    isEditing,
    busy,
    status,
    modalError,
    isRedirectingAfterCreate,
    modal,
    modalLoadingText,
    modalCancelText,
    modalConfirmText,
    modalBody,
    canCreateExpenseForCurrentView,
    canEditHeaderFieldsCurrent,
    canUseFullEditFeatures,
    showStatusActionBar,
    showFab,
    areStatusActionsDisabled,
    fabMenuItems,
    paginationLabels,
    totalAmountText,
    statusCommentMode,
    ownerDisplay,
    projectValue,
    normalizedDraftCurrency,
    exchangeRateBaseCurrency,
    exchangeRateReferenceAmount,
    showExchangeRate,
    exchangeRateValue,
    exchangeRateValidationMessage,
    draftDescription,
    draftProjectId,
    draftCurrencyCode,
    draftExchangeRate,
    draftReimbursableExpense,
    draftEstadoComentarios,
    officialExchangeRateRawValue,
    officialExchangeRateDate,
    officialExchangeRateSource,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    detailPolicy,
    lineContainerRef,
    cameraInputRef,
    galleryInputRef,
    quickTicketFlow,
    setLinePage,
    setDraftDescription,
    setDraftProjectId,
    commitDraftProjectId: handleDraftProjectIdCommit,
    setDraftCurrencyCode,
    setDraftExchangeRate,
    setDraftReimbursableExpense: handleDraftReimbursableExpenseChange,
    setDraftEstadoComentarios,
    navigateToLineDetail: handleOpenLineDetail,
    handleModalButtonConfirm,
    handleStatusActionClick,
    closeConfirm: handleCancelConfirm
  };
};

// Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetDetailPage.tsx
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
var DETAIL_FAB_BASELINE_BOTTOM_PX = 24;
var DETAIL_FAB_WITH_STATUS_ACTION_BAR_BOTTOM_PX = 110;
var EXPENSE_SHEETS_LIST_URL = "/Gastos/ExpenseSheets";
var bootstrapExpenseLinkActingUser = () => {
  const actingUserId = safeText(window.__EXPENSE_ACTING_USER_ID__);
  if (!actingUserId) return;
  setExpenseActingUserOverride(actingUserId);
};
var ExpenseSheetDetailPageContent = () => {
  const controller = useExpenseSheetDetailPageController();
  const { currentAxUserId } = useAuthContext();
  const { readCachedState, saveCachedState } = useExpenseSheetsFilterCache();
  const createdSheetReturnIdRef = import_react6.default.useRef("");
  const detailFabBottom = controller.showStatusActionBar ? DETAIL_FAB_WITH_STATUS_ACTION_BAR_BOTTOM_PX : DETAIL_FAB_BASELINE_BOTTOM_PX;
  import_react6.default.useEffect(() => {
    const createdContext = consumeExpenseSheetCreatedReturnContext(controller.sheetId);
    createdSheetReturnIdRef.current = createdContext?.sheetId || "";
  }, [controller.sheetId]);
  const prepareCreatedSheetReturnState = import_react6.default.useCallback(() => {
    const createdSheetId = safeText(createdSheetReturnIdRef.current);
    if (!createdSheetId) return false;
    saveCachedState({
      filters: createInitialExpenseSheetsFilterSnapshot(currentAxUserId),
      page: 1,
      scrollY: 0,
      items: [],
      total: 0
    });
    createdSheetReturnIdRef.current = "";
    return true;
  }, [currentAxUserId, saveCachedState]);
  const rearmExpenseSheetsReturnState = import_react6.default.useCallback(() => {
    if (prepareCreatedSheetReturnState()) {
      return;
    }
    const cachedState = readCachedState();
    if (!cachedState) return;
    saveCachedState(cachedState);
  }, [prepareCreatedSheetReturnState, readCachedState, saveCachedState]);
  import_react6.default.useEffect(() => {
    const backButton = document.getElementById("globalBackBtn");
    if (!backButton) return;
    backButton.setAttribute("data-back-url", EXPENSE_SHEETS_LIST_URL);
    return () => {
      backButton.removeAttribute("data-back-url");
    };
  }, []);
  import_react6.default.useEffect(() => {
    const backButton = document.getElementById("globalBackBtn");
    if (!backButton) return;
    const handleTopbarBackClick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      const executeBackNavigation = () => {
        rearmExpenseSheetsReturnState();
        window.__indBypassNavigationGuardOnce?.();
        window.location.href = EXPENSE_SHEETS_LIST_URL;
      };
      if (typeof window.__indRequestNavigation === "function") {
        window.__indRequestNavigation(executeBackNavigation);
        return;
      }
      executeBackNavigation();
    };
    backButton.addEventListener("click", handleTopbarBackClick, true);
    return () => {
      backButton.removeEventListener("click", handleTopbarBackClick, true);
    };
  }, [rearmExpenseSheetsReturnState]);
  import_react6.default.useEffect(() => {
    const handleNativeBack = (event) => {
      if (event?.state && event.state.indTrap === true) {
        return;
      }
      const executeBackNavigation = () => {
        rearmExpenseSheetsReturnState();
        window.__indBypassNavigationGuardOnce?.();
        window.location.replace(EXPENSE_SHEETS_LIST_URL);
      };
      if (typeof window.__indRequestNavigation === "function") {
        window.__indRequestNavigation(executeBackNavigation);
        return;
      }
      executeBackNavigation();
    };
    window.addEventListener("popstate", handleNativeBack);
    return () => {
      window.removeEventListener("popstate", handleNativeBack);
    };
  }, [rearmExpenseSheetsReturnState]);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "space-y-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      ExpenseSheetDetailOverlays_default,
      {
        modal: controller.modal,
        modalError: controller.modalError,
        status: controller.status,
        busy: controller.busy,
        isRedirectingAfterCreate: controller.isRedirectingAfterCreate,
        modalLoadingText: controller.modalLoadingText,
        modalCancelText: controller.modalCancelText,
        modalConfirmText: controller.modalConfirmText,
        modalBody: controller.modalBody,
        cameraInputRef: controller.cameraInputRef,
        galleryInputRef: controller.galleryInputRef,
        sourcePickerOpen: controller.quickTicketFlow.sourcePickerOpen,
        quickTicketBusy: controller.quickTicketFlow.busy,
        quickTicketProgressMessage: controller.quickTicketFlow.progressMessage,
        quickTicketProgressStages: controller.quickTicketFlow.progressStages,
        quickTicketElapsedMs: controller.quickTicketFlow.progressElapsedMs,
        quickTicketErrorMessage: controller.quickTicketFlow.errorMessage,
        quickTicketAttemptId: controller.quickTicketFlow.attemptId,
        quickTicketTraceList: controller.quickTicketFlow.traceList,
        hasPendingUploadRetry: controller.quickTicketFlow.hasPendingUploadRetry,
        hasPartialTicketFailure: controller.quickTicketFlow.hasPartialTicketFailure,
        onConfirm: controller.handleModalButtonConfirm,
        onCancel: controller.closeConfirm,
        onSelectedCameraFile: (file) => {
          void controller.quickTicketFlow.handleSelectedFile(file, "camera");
        },
        onSelectedGalleryFile: (file) => {
          void controller.quickTicketFlow.handleSelectedFile(file, "gallery");
        },
        onSelectFromCamera: () => {
          void controller.quickTicketFlow.selectFromCamera(controller.cameraInputRef.current);
        },
        onSelectFromGallery: () => controller.quickTicketFlow.selectFromGallery(controller.galleryInputRef.current),
        onCloseSourcePicker: controller.quickTicketFlow.closeSourcePicker,
        onRetryPendingUpload: () => {
          void controller.quickTicketFlow.retryPendingUpload();
        },
        onClearQuickTicketError: controller.quickTicketFlow.clearError
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
      "div",
      {
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: controller.isLoading || controller.isRedirectingAfterCreate ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { className: "ind-spinner size-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    controller.errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "text-danger", children: controller.errorMessage }) : null,
    !controller.isLoading && !controller.isRedirectingAfterCreate && !controller.errorMessage && controller.header ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      ExpenseSheetHeaderForm_default,
      {
        mode: {
          isCreateMode: controller.isCreateMode,
          isEditing: controller.isEditing,
          canEditHeaderFields: controller.canEditHeaderFieldsCurrent,
          statusCommentMode: controller.statusCommentMode
        },
        currencyLocks: {
          isCurrencyLockedByLines: controller.isCurrencyLockedByLines,
          isExchangeRateLockedByLines: controller.isExchangeRateLockedByLines,
          showExchangeRate: controller.showExchangeRate
        },
        header: controller.header,
        ownerDisplay: controller.ownerDisplay,
        projectValue: controller.projectValue,
        normalizedDraftCurrency: controller.normalizedDraftCurrency,
        exchangeRateBaseCurrency: controller.exchangeRateBaseCurrency,
        exchangeRateReferenceAmount: controller.exchangeRateReferenceAmount,
        exchangeRateValue: controller.exchangeRateValue,
        exchangeRateValidationMessage: controller.exchangeRateValidationMessage,
        totalAmountText: controller.totalAmountText,
        draftDescription: controller.draftDescription,
        draftProjectId: controller.draftProjectId,
        draftCurrencyCode: controller.draftCurrencyCode,
        draftExchangeRate: controller.draftExchangeRate,
        draftReimbursableExpense: controller.draftReimbursableExpense,
        officialExchangeRateRawValue: controller.officialExchangeRateRawValue,
        officialExchangeRateDate: controller.officialExchangeRateDate,
        officialExchangeRateSource: controller.officialExchangeRateSource,
        onDraftDescriptionChange: controller.setDraftDescription,
        onDraftProjectIdChange: controller.setDraftProjectId,
        onDraftProjectIdCommit: controller.commitDraftProjectId,
        onDraftCurrencyCodeChange: controller.setDraftCurrencyCode,
        onDraftExchangeRateChange: controller.setDraftExchangeRate,
        onDraftReimbursableExpenseChange: controller.setDraftReimbursableExpense
      }
    ) : null,
    !controller.isCreateMode && !controller.isLoading && !controller.isRedirectingAfterCreate && !controller.errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      ExpenseLinesTimeline_default,
      {
        visibleLines: controller.visibleLines,
        reimbursementCurrencyCode: safeText(controller.exchangeRateBaseCurrency || controller.header?.currencyCode),
        totalLinePages: controller.totalLinePages,
        linePage: controller.linePage,
        linesLabel: indT("ExpenseSheets_Lines", "Lines"),
        emptyText: indT("ExpenseSheets_NoLines", "No lines for this expense sheet."),
        paginationLabels: controller.paginationLabels,
        containerRef: controller.lineContainerRef,
        onLinePageChange: controller.setLinePage,
        onOpenLine: controller.navigateToLineDetail
      }
    ) : null,
    controller.showStatusActionBar ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      ExpenseSheetStatusActionBar_default,
      {
        actions: controller.detailPolicy.statusActions,
        busy: controller.busy || controller.isRedirectingAfterCreate,
        disabled: controller.areStatusActionsDisabled,
        onActionClick: controller.handleStatusActionClick
      }
    ) : null,
    controller.showFab ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      FloatingActionButton_default,
      {
        ariaLabel: indT("ExpenseSheets_Fab_Actions", "Acciones r\xE1pidas"),
        size: 76,
        right: 16,
        bottom: detailFabBottom,
        menuAriaLabel: indT("ExpenseSheets_Fab_Actions", "Acciones r\xE1pidas"),
        menuItems: controller.fabMenuItems
      }
    ) : null
  ] });
};
var ExpenseSheetDetailPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(VisitasPageProviders_default, { enableExpenseManagement: true, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ExpenseSheetDetailPageContent, {}) });
};
var mount = () => {
  bootstrapExpenseApiAuth();
  bootstrapExpenseLinkActingUser();
  const rootEl = document.getElementById("expense-sheet-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ExpenseSheetDetailPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseSheetDetailPage_default = ExpenseSheetDetailPage;
export {
  ExpenseSheetDetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb24udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2V4Y2hhbmdlUmF0ZUVudHJ5TW9kZUNhdGFsb2cudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VMaW5lc1RpbWVsaW5lLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC9FeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXIudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL0V4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udHJvbGxlci50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dC50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC9FeHBlbnNlU2hlZXREZXRhaWxJY29ucy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlU2hlZXRIZWFkZXJGb3JtLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZUxpbmVzVGltZWxpbmUgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZUxpbmVzVGltZWxpbmUudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXIgZnJvbSBcIi4vRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXMgZnJvbSBcIi4vRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXMudHN4XCI7XHJcbmltcG9ydCB7IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoLCB1c2VFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udHJvbGxlciB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250cm9sbGVyLnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IGNvbnN1bWVFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dC50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlIH0gZnJvbSBcIi4uL2xpc3QvdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlLnRzXCI7XG5pbXBvcnQgeyBjcmVhdGVJbml0aWFsRXhwZW5zZVNoZWV0c0ZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4uL2xpc3QvZXhwZW5zZUZpbHRlclNuYXBzaG90LnRzXCI7XG5pbXBvcnQgeyBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBY3RpbmdVc2VyLnRzXCI7XG5cclxuY29uc3QgREVUQUlMX0ZBQl9CQVNFTElORV9CT1RUT01fUFggPSAyNDtcbmNvbnN0IERFVEFJTF9GQUJfV0lUSF9TVEFUVVNfQUNUSU9OX0JBUl9CT1RUT01fUFggPSAxMTA7XG5jb25zdCBFWFBFTlNFX1NIRUVUU19MSVNUX1VSTCA9IFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCI7XHJcblxyXG4vLyBBcHBsaWVzIHRoZSBzZXJ2ZXItcmVzb2x2ZWQgYWN0aW5nIHVzZXIgZm9yIGVtYWlsIGRlZXAgbGlua3MgYmVmb3JlIGRldGFpbCBBUEkgY2FsbHMgcnVuLlxyXG5jb25zdCBib290c3RyYXBFeHBlbnNlTGlua0FjdGluZ1VzZXIgPSAoKSA9PiB7XHJcbiAgY29uc3QgYWN0aW5nVXNlcklkID0gc2FmZVRleHQod2luZG93Ll9fRVhQRU5TRV9BQ1RJTkdfVVNFUl9JRF9fKTtcclxuICBpZiAoIWFjdGluZ1VzZXJJZCkgcmV0dXJuO1xyXG4gIHNldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUoYWN0aW5nVXNlcklkKTtcclxufTtcclxuXHJcbmNvbnN0IEV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250ZW50ID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNvbnRyb2xsZXIgPSB1c2VFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udHJvbGxlcigpO1xyXG4gIGNvbnN0IHsgY3VycmVudEF4VXNlcklkIH0gPSB1c2VBdXRoQ29udGV4dCgpO1xuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgc2F2ZUNhY2hlZFN0YXRlIH0gPSB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUoKTtcbiAgY29uc3QgY3JlYXRlZFNoZWV0UmV0dXJuSWRSZWYgPSBSZWFjdC51c2VSZWYoXCJcIik7XG4gIGNvbnN0IGRldGFpbEZhYkJvdHRvbSA9IGNvbnRyb2xsZXIuc2hvd1N0YXR1c0FjdGlvbkJhclxuICAgID8gREVUQUlMX0ZBQl9XSVRIX1NUQVRVU19BQ1RJT05fQkFSX0JPVFRPTV9QWFxuICAgIDogREVUQUlMX0ZBQl9CQVNFTElORV9CT1RUT01fUFg7XG5cclxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgY3JlYXRlZENvbnRleHQgPSBjb25zdW1lRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQoY29udHJvbGxlci5zaGVldElkKTtcclxuICAgIGNyZWF0ZWRTaGVldFJldHVybklkUmVmLmN1cnJlbnQgPSBjcmVhdGVkQ29udGV4dD8uc2hlZXRJZCB8fCBcIlwiO1xyXG4gIH0sIFtjb250cm9sbGVyLnNoZWV0SWRdKTtcclxuXHJcbiAgY29uc3QgcHJlcGFyZUNyZWF0ZWRTaGVldFJldHVyblN0YXRlID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgY3JlYXRlZFNoZWV0SWQgPSBzYWZlVGV4dChjcmVhdGVkU2hlZXRSZXR1cm5JZFJlZi5jdXJyZW50KTtcbiAgICBpZiAoIWNyZWF0ZWRTaGVldElkKSByZXR1cm4gZmFsc2U7XG5cbiAgICBzYXZlQ2FjaGVkU3RhdGUoe1xuICAgICAgZmlsdGVyczogY3JlYXRlSW5pdGlhbEV4cGVuc2VTaGVldHNGaWx0ZXJTbmFwc2hvdChjdXJyZW50QXhVc2VySWQpLFxuICAgICAgcGFnZTogMSxcbiAgICAgIHNjcm9sbFk6IDAsXG4gICAgICBpdGVtczogW10sXG4gICAgICB0b3RhbDogMCxcclxuICAgIH0pO1xyXG5cclxuICAgIGNyZWF0ZWRTaGVldFJldHVybklkUmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSwgW2N1cnJlbnRBeFVzZXJJZCwgc2F2ZUNhY2hlZFN0YXRlXSk7XHJcblxyXG4gIGNvbnN0IHJlYXJtRXhwZW5zZVNoZWV0c1JldHVyblN0YXRlID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKHByZXBhcmVDcmVhdGVkU2hlZXRSZXR1cm5TdGF0ZSgpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjYWNoZWRTdGF0ZSA9IHJlYWRDYWNoZWRTdGF0ZSgpO1xyXG4gICAgaWYgKCFjYWNoZWRTdGF0ZSkgcmV0dXJuO1xyXG4gICAgc2F2ZUNhY2hlZFN0YXRlKGNhY2hlZFN0YXRlKTtcclxuICB9LCBbcHJlcGFyZUNyZWF0ZWRTaGVldFJldHVyblN0YXRlLCByZWFkQ2FjaGVkU3RhdGUsIHNhdmVDYWNoZWRTdGF0ZV0pO1xyXG5cclxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgYmFja0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsQmFja0J0blwiKTtcclxuICAgIGlmICghYmFja0J1dHRvbikgcmV0dXJuO1xyXG5cclxuICAgIGJhY2tCdXR0b24uc2V0QXR0cmlidXRlKFwiZGF0YS1iYWNrLXVybFwiLCBFWFBFTlNFX1NIRUVUU19MSVNUX1VSTCk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgYmFja0J1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLWJhY2stdXJsXCIpO1xyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcblxyXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBiYWNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxCYWNrQnRuXCIpO1xyXG4gICAgaWYgKCFiYWNrQnV0dG9uKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaGFuZGxlVG9wYmFyQmFja0NsaWNrID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICBjb25zdCBleGVjdXRlQmFja05hdmlnYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgcmVhcm1FeHBlbnNlU2hlZXRzUmV0dXJuU3RhdGUoKTtcclxuICAgICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IEVYUEVOU0VfU0hFRVRTX0xJU1RfVVJMO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24oZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGV4ZWN1dGVCYWNrTmF2aWdhdGlvbigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBiYWNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVUb3BiYXJCYWNrQ2xpY2ssIHRydWUpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgYmFja0J1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlVG9wYmFyQmFja0NsaWNrLCB0cnVlKTtcclxuICAgIH07XHJcbiAgfSwgW3JlYXJtRXhwZW5zZVNoZWV0c1JldHVyblN0YXRlXSk7XHJcblxyXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBoYW5kbGVOYXRpdmVCYWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudD8uc3RhdGUgJiYgZXZlbnQuc3RhdGUuaW5kVHJhcCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIHJlYXJtRXhwZW5zZVNoZWV0c1JldHVyblN0YXRlKCk7XHJcbiAgICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoRVhQRU5TRV9TSEVFVFNfTElTVF9VUkwpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24oZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGV4ZWN1dGVCYWNrTmF2aWdhdGlvbigpO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGhhbmRsZU5hdGl2ZUJhY2spO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBoYW5kbGVOYXRpdmVCYWNrKTtcclxuICAgIH07XHJcbiAgfSwgW3JlYXJtRXhwZW5zZVNoZWV0c1JldHVyblN0YXRlXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxyXG4gICAgICA8RXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXNcclxuICAgICAgICBtb2RhbD17Y29udHJvbGxlci5tb2RhbH1cclxuICAgICAgICBtb2RhbEVycm9yPXtjb250cm9sbGVyLm1vZGFsRXJyb3J9XHJcbiAgICAgICAgc3RhdHVzPXtjb250cm9sbGVyLnN0YXR1c31cclxuICAgICAgICBidXN5PXtjb250cm9sbGVyLmJ1c3l9XHJcbiAgICAgICAgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlPXtjb250cm9sbGVyLmlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZX1cclxuICAgICAgICBtb2RhbExvYWRpbmdUZXh0PXtjb250cm9sbGVyLm1vZGFsTG9hZGluZ1RleHR9XHJcbiAgICAgICAgbW9kYWxDYW5jZWxUZXh0PXtjb250cm9sbGVyLm1vZGFsQ2FuY2VsVGV4dH1cclxuICAgICAgICBtb2RhbENvbmZpcm1UZXh0PXtjb250cm9sbGVyLm1vZGFsQ29uZmlybVRleHR9XHJcbiAgICAgICAgbW9kYWxCb2R5PXtjb250cm9sbGVyLm1vZGFsQm9keX1cclxuICAgICAgICBjYW1lcmFJbnB1dFJlZj17Y29udHJvbGxlci5jYW1lcmFJbnB1dFJlZn1cclxuICAgICAgICBnYWxsZXJ5SW5wdXRSZWY9e2NvbnRyb2xsZXIuZ2FsbGVyeUlucHV0UmVmfVxyXG4gICAgICAgIHNvdXJjZVBpY2tlck9wZW49e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnNvdXJjZVBpY2tlck9wZW59XHJcbiAgICAgICAgcXVpY2tUaWNrZXRCdXN5PXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5idXN5fVxyXG4gICAgICAgIHF1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5wcm9ncmVzc01lc3NhZ2V9XHJcbiAgICAgICAgcXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlcz17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cucHJvZ3Jlc3NTdGFnZXN9XHJcbiAgICAgICAgcXVpY2tUaWNrZXRFbGFwc2VkTXM9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnByb2dyZXNzRWxhcHNlZE1zfVxyXG4gICAgICAgIHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5lcnJvck1lc3NhZ2V9XHJcbiAgICAgICAgcXVpY2tUaWNrZXRBdHRlbXB0SWQ9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmF0dGVtcHRJZH1cclxuICAgICAgICBxdWlja1RpY2tldFRyYWNlTGlzdD17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cudHJhY2VMaXN0fVxyXG4gICAgICAgIGhhc1BlbmRpbmdVcGxvYWRSZXRyeT17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuaGFzUGVuZGluZ1VwbG9hZFJldHJ5fVxyXG4gICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5oYXNQYXJ0aWFsVGlja2V0RmFpbHVyZX1cclxuICAgICAgICBvbkNvbmZpcm09e2NvbnRyb2xsZXIuaGFuZGxlTW9kYWxCdXR0b25Db25maXJtfVxyXG4gICAgICAgIG9uQ2FuY2VsPXtjb250cm9sbGVyLmNsb3NlQ29uZmlybX1cclxuICAgICAgICBvblNlbGVjdGVkQ2FtZXJhRmlsZT17KGZpbGUpID0+IHtcclxuICAgICAgICAgIHZvaWQgY29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuaGFuZGxlU2VsZWN0ZWRGaWxlKGZpbGUsIFwiY2FtZXJhXCIpO1xyXG4gICAgICAgIH19XHJcbiAgICAgICAgb25TZWxlY3RlZEdhbGxlcnlGaWxlPXsoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgdm9pZCBjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5oYW5kbGVTZWxlY3RlZEZpbGUoZmlsZSwgXCJnYWxsZXJ5XCIpO1xyXG4gICAgICAgIH19XHJcbiAgICAgICAgb25TZWxlY3RGcm9tQ2FtZXJhPXsoKSA9PiB7XHJcbiAgICAgICAgICB2b2lkIGNvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnNlbGVjdEZyb21DYW1lcmEoY29udHJvbGxlci5jYW1lcmFJbnB1dFJlZi5jdXJyZW50KTtcclxuICAgICAgICB9fVxyXG4gICAgICAgIG9uU2VsZWN0RnJvbUdhbGxlcnk9eygpID0+IGNvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnNlbGVjdEZyb21HYWxsZXJ5KGNvbnRyb2xsZXIuZ2FsbGVyeUlucHV0UmVmLmN1cnJlbnQpfVxyXG4gICAgICAgIG9uQ2xvc2VTb3VyY2VQaWNrZXI9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmNsb3NlU291cmNlUGlja2VyfVxyXG4gICAgICAgIG9uUmV0cnlQZW5kaW5nVXBsb2FkPXsoKSA9PiB7XHJcbiAgICAgICAgICB2b2lkIGNvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnJldHJ5UGVuZGluZ1VwbG9hZCgpO1xyXG4gICAgICAgIH19XHJcbiAgICAgICAgb25DbGVhclF1aWNrVGlja2V0RXJyb3I9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmNsZWFyRXJyb3J9XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCJcclxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBjb250cm9sbGVyLmlzTG9hZGluZyB8fCBjb250cm9sbGVyLmlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgc2l6ZS01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cclxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtjb250cm9sbGVyLmVycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57Y29udHJvbGxlci5lcnJvck1lc3NhZ2V9PC9kaXY+IDogbnVsbH1cclxuXHJcbiAgICAgIHshY29udHJvbGxlci5pc0xvYWRpbmcgJiYgIWNvbnRyb2xsZXIuaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlICYmICFjb250cm9sbGVyLmVycm9yTWVzc2FnZSAmJiBjb250cm9sbGVyLmhlYWRlciA/IChcclxuICAgICAgICA8RXhwZW5zZVNoZWV0SGVhZGVyRm9ybVxyXG4gICAgICAgICAgbW9kZT17e1xyXG4gICAgICAgICAgICBpc0NyZWF0ZU1vZGU6IGNvbnRyb2xsZXIuaXNDcmVhdGVNb2RlLFxyXG4gICAgICAgICAgICBpc0VkaXRpbmc6IGNvbnRyb2xsZXIuaXNFZGl0aW5nLFxyXG4gICAgICAgICAgICBjYW5FZGl0SGVhZGVyRmllbGRzOiBjb250cm9sbGVyLmNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50LFxyXG4gICAgICAgICAgICBzdGF0dXNDb21tZW50TW9kZTogY29udHJvbGxlci5zdGF0dXNDb21tZW50TW9kZSxcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgICBjdXJyZW5jeUxvY2tzPXt7XHJcbiAgICAgICAgICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzOiBjb250cm9sbGVyLmlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gICAgICAgICAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM6IGNvbnRyb2xsZXIuaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgICAgICAgICBzaG93RXhjaGFuZ2VSYXRlOiBjb250cm9sbGVyLnNob3dFeGNoYW5nZVJhdGUsXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgICAgaGVhZGVyPXtjb250cm9sbGVyLmhlYWRlcn1cclxuICAgICAgICAgIG93bmVyRGlzcGxheT17Y29udHJvbGxlci5vd25lckRpc3BsYXl9XHJcbiAgICAgICAgICBwcm9qZWN0VmFsdWU9e2NvbnRyb2xsZXIucHJvamVjdFZhbHVlfVxyXG4gICAgICAgICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3k9e2NvbnRyb2xsZXIubm9ybWFsaXplZERyYWZ0Q3VycmVuY3l9XHJcbiAgICAgICAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k9e2NvbnRyb2xsZXIuZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5fVxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50PXtjb250cm9sbGVyLmV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudH1cclxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZVZhbHVlPXtjb250cm9sbGVyLmV4Y2hhbmdlUmF0ZVZhbHVlfVxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2U9e2NvbnRyb2xsZXIuZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2V9XHJcbiAgICAgICAgICB0b3RhbEFtb3VudFRleHQ9e2NvbnRyb2xsZXIudG90YWxBbW91bnRUZXh0fVxyXG4gICAgICAgICAgZHJhZnREZXNjcmlwdGlvbj17Y29udHJvbGxlci5kcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgZHJhZnRQcm9qZWN0SWQ9e2NvbnRyb2xsZXIuZHJhZnRQcm9qZWN0SWR9XHJcbiAgICAgICAgICBkcmFmdEN1cnJlbmN5Q29kZT17Y29udHJvbGxlci5kcmFmdEN1cnJlbmN5Q29kZX1cclxuICAgICAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlPXtjb250cm9sbGVyLmRyYWZ0RXhjaGFuZ2VSYXRlfVxyXG4gICAgICAgICAgZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlPXtjb250cm9sbGVyLmRyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZX1cclxuICAgICAgICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWU9e2NvbnRyb2xsZXIub2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZX1cclxuICAgICAgICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZT17Y29udHJvbGxlci5vZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGV9XHJcbiAgICAgICAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZT17Y29udHJvbGxlci5vZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZX1cclxuICAgICAgICAgIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZT17Y29udHJvbGxlci5zZXREcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgb25EcmFmdFByb2plY3RJZENoYW5nZT17Y29udHJvbGxlci5zZXREcmFmdFByb2plY3RJZH1cclxuICAgICAgICAgIG9uRHJhZnRQcm9qZWN0SWRDb21taXQ9e2NvbnRyb2xsZXIuY29tbWl0RHJhZnRQcm9qZWN0SWR9XHJcbiAgICAgICAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlPXtjb250cm9sbGVyLnNldERyYWZ0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZT17Y29udHJvbGxlci5zZXREcmFmdEV4Y2hhbmdlUmF0ZX1cclxuICAgICAgICAgIG9uRHJhZnRSZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlPXtjb250cm9sbGVyLnNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZX1cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHshY29udHJvbGxlci5pc0NyZWF0ZU1vZGUgJiYgIWNvbnRyb2xsZXIuaXNMb2FkaW5nICYmICFjb250cm9sbGVyLmlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhY29udHJvbGxlci5lcnJvck1lc3NhZ2UgPyAoXHJcbiAgICAgICAgPEV4cGVuc2VMaW5lc1RpbWVsaW5lXG4gICAgICAgICAgdmlzaWJsZUxpbmVzPXtjb250cm9sbGVyLnZpc2libGVMaW5lc31cbiAgICAgICAgICByZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlPXtzYWZlVGV4dChjb250cm9sbGVyLmV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSB8fCBjb250cm9sbGVyLmhlYWRlcj8uY3VycmVuY3lDb2RlKX1cbiAgICAgICAgICB0b3RhbExpbmVQYWdlcz17Y29udHJvbGxlci50b3RhbExpbmVQYWdlc31cclxuICAgICAgICAgIGxpbmVQYWdlPXtjb250cm9sbGVyLmxpbmVQYWdlfVxyXG4gICAgICAgICAgbGluZXNMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfTGluZXNcIiwgXCJMaW5lc1wiKX1cclxuICAgICAgICAgIGVtcHR5VGV4dD17aW5kVChcIkV4cGVuc2VTaGVldHNfTm9MaW5lc1wiLCBcIk5vIGxpbmVzIGZvciB0aGlzIGV4cGVuc2Ugc2hlZXQuXCIpfVxyXG4gICAgICAgICAgcGFnaW5hdGlvbkxhYmVscz17Y29udHJvbGxlci5wYWdpbmF0aW9uTGFiZWxzfVxyXG4gICAgICAgICAgY29udGFpbmVyUmVmPXtjb250cm9sbGVyLmxpbmVDb250YWluZXJSZWZ9XHJcbiAgICAgICAgICBvbkxpbmVQYWdlQ2hhbmdlPXtjb250cm9sbGVyLnNldExpbmVQYWdlfVxyXG4gICAgICAgICAgb25PcGVuTGluZT17Y29udHJvbGxlci5uYXZpZ2F0ZVRvTGluZURldGFpbH1cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHtjb250cm9sbGVyLnNob3dTdGF0dXNBY3Rpb25CYXIgPyAoXHJcbiAgICAgICAgPEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbkJhclxyXG4gICAgICAgICAgYWN0aW9ucz17Y29udHJvbGxlci5kZXRhaWxQb2xpY3kuc3RhdHVzQWN0aW9uc31cclxuICAgICAgICAgIGJ1c3k9e2NvbnRyb2xsZXIuYnVzeSB8fCBjb250cm9sbGVyLmlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZX1cclxuICAgICAgICAgIGRpc2FibGVkPXtjb250cm9sbGVyLmFyZVN0YXR1c0FjdGlvbnNEaXNhYmxlZH1cclxuICAgICAgICAgIG9uQWN0aW9uQ2xpY2s9e2NvbnRyb2xsZXIuaGFuZGxlU3RhdHVzQWN0aW9uQ2xpY2t9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICB7Y29udHJvbGxlci5zaG93RmFiID8gKFxyXG4gICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxyXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJcdTAwRTFwaWRhc1wiKX1cclxuICAgICAgICAgIHNpemU9ezc2fVxyXG4gICAgICAgICAgcmlnaHQ9ezE2fVxyXG4gICAgICAgICAgYm90dG9tPXtkZXRhaWxGYWJCb3R0b219XG4gICAgICAgICAgbWVudUFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0FjdGlvbnNcIiwgXCJBY2Npb25lcyByXHUwMEUxcGlkYXNcIil9XHJcbiAgICAgICAgICBtZW51SXRlbXM9e2NvbnRyb2xsZXIuZmFiTWVudUl0ZW1zfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwuXHJcbmNvbnN0IEV4cGVuc2VTaGVldERldGFpbFBhZ2UgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cclxuICAgICAgPEV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250ZW50IC8+XHJcbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xyXG4gIGJvb3RzdHJhcEV4cGVuc2VMaW5rQWN0aW5nVXNlcigpO1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS1zaGVldC1kZXRhaWwtcm9vdFwiKTtcclxuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xyXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVNoZWV0RGV0YWlsUGFnZSAvPik7XHJcbn07XHJcblxyXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldERldGFpbFBhZ2U7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBJbmZvUG9wb3Zlckljb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9JbmZvUG9wb3Zlckljb25CdXR0b24udHN4XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldEhlYWRlciB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbiBmcm9tIFwiLi9FeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb24udHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0IGZyb20gXCIuL0V4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZVN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlU3RhdHVzQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGdldEVkaXRhYmxlRXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2VPcHRpb25zLFxyXG4gIGdldEV4cGVuc2VSZWltYnVyc2FibGVFeHBlbnNlTGFiZWwsXHJcbiAgbm9ybWFsaXplRXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbn0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlUmVpbWJ1cnNhYmxlRXhwZW5zZUNhdGFsb2cudHNcIjtcclxuaW1wb3J0IHtcclxuICBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsLFxyXG4gIG5vcm1hbGl6ZUV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlLFxyXG59IGZyb20gXCIuLi9jb25zdGFudHMvZXhjaGFuZ2VSYXRlRW50cnlNb2RlQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlTnVtYmVyLCBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtTW9kZSA9IHtcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGJvb2xlYW47XHJcbiAgc3RhdHVzQ29tbWVudE1vZGU6IFwiaGlkZGVuXCIgfCBcInJlYWRcIjtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lMb2NrcyA9IHtcclxuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcclxuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XHJcbiAgc2hvd0V4Y2hhbmdlUmF0ZTogYm9vbGVhbjtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybVByb3BzID0ge1xyXG4gIG1vZGU6IEV4cGVuc2VTaGVldEhlYWRlckZvcm1Nb2RlO1xyXG4gIGN1cnJlbmN5TG9ja3M6IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5TG9ja3M7XHJcbiAgaGVhZGVyOiBFeHBlbnNlU2hlZXRIZWFkZXI7XHJcbiAgb3duZXJEaXNwbGF5Pzogc3RyaW5nO1xyXG4gIHByb2plY3RWYWx1ZTogc3RyaW5nO1xyXG4gIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5OiBzdHJpbmc7XHJcbiAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5OiBzdHJpbmc7XHJcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50OiBudW1iZXI7XHJcbiAgZXhjaGFuZ2VSYXRlVmFsdWU6IHN0cmluZztcclxuICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZTogc3RyaW5nO1xyXG4gIHRvdGFsQW1vdW50VGV4dDogc3RyaW5nO1xyXG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcclxuICBkcmFmdFByb2plY3RJZDogc3RyaW5nO1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcclxuICBkcmFmdFJlaW1idXJzYWJsZUV4cGVuc2U6IG51bWJlciB8IG51bGw7XHJcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZTogc3RyaW5nO1xyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZTogc3RyaW5nO1xyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlOiBzdHJpbmc7XHJcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0UHJvamVjdElkQ29tbWl0PzogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdFJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2U6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuY29uc3QgRVhDSEFOR0VfUkFURV9NT0RFX1BSRUZJWF9QQVRURVJOID0gL15UXFwuP0NcXC4/XFxzKi9pO1xyXG5jb25zdCBBTElHTkVEX0ZJRUxEX0NPTlRBSU5FUl9DTEFTU19OQU1FID0gXCJzcGFjZS15LTEuNVwiO1xyXG5jb25zdCBBTElHTkVEX0ZJRUxEX0xBQkVMX0NMQVNTX05BTUUgPSBcImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZCBpbmxpbmUtZmxleCBoLTYgaXRlbXMtY2VudGVyIGxlYWRpbmctbm9uZVwiO1xyXG5cclxuLy8gUHVyZSBwcmVzZW50YXRpb25hbCBoZWFkZXIgZm9ybSBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwvY3JlYXRlIHNjcmVlbnMuXHJcbmNvbnN0IEV4cGVuc2VTaGVldEhlYWRlckZvcm0gPSAoe1xyXG4gIG1vZGUsXHJcbiAgY3VycmVuY3lMb2NrcyxcclxuICBoZWFkZXIsXHJcbiAgb3duZXJEaXNwbGF5ID0gXCJcIixcclxuICBwcm9qZWN0VmFsdWUsXHJcbiAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXHJcbiAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCxcclxuICBleGNoYW5nZVJhdGVWYWx1ZSxcclxuICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSxcclxuICB0b3RhbEFtb3VudFRleHQsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkcmFmdFByb2plY3RJZCxcclxuICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICBkcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSxcclxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsXHJcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsXHJcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlLFxyXG4gIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2UsXHJcbiAgb25EcmFmdFByb2plY3RJZENvbW1pdCxcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlLFxyXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2UsXHJcbiAgb25EcmFmdFJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2UsXHJcbn06IEV4cGVuc2VTaGVldEhlYWRlckZvcm1Qcm9wcykgPT4ge1xyXG4gIGNvbnN0IHsgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIGNhbkVkaXRIZWFkZXJGaWVsZHMsIHN0YXR1c0NvbW1lbnRNb2RlIH0gPSBtb2RlO1xyXG4gIGNvbnN0IHsgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcywgc2hvd0V4Y2hhbmdlUmF0ZSB9ID0gY3VycmVuY3lMb2NrcztcclxuICBjb25zdCBpc0ZvcmVpZ25DdXJyZW5jeSA9XHJcbiAgICBpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcyAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gXCJcIiAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5O1xyXG4gIGNvbnN0IGV4cGVuc2VDdXJyZW5jeUxhYmVsID0gaXNGb3JlaWduQ3VycmVuY3lcclxuICAgID8gaW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhwZW5zZUN1cnJlbmN5XCIsIFwiRXhwZW5zZSBjdXJyZW5jeVwiKVxyXG4gICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpO1xyXG4gIGNvbnN0IHN0YXR1c1ZhbHVlID1cclxuICAgIGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgPT09IG51bGwgfHwgaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gdW5kZWZpbmVkXHJcbiAgICAgID8gXCItXCJcclxuICAgICAgOiBnZXRFeHBlbnNlU3RhdHVzTGFiZWwoaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyk7XHJcbiAgY29uc3QgaGVhZGVyQ3VycmVuY3lDb2RlID0gc2FmZVRleHQoaGVhZGVyLmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBiYXNlQ3VycmVuY3lDb2RlID0gc2FmZVRleHQoZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xyXG4gIGNvbnN0IHJlaW1idXJzYWJsZUV4cGVuc2VPcHRpb25zID0gUmVhY3QudXNlTWVtbygoKSA9PiBnZXRFZGl0YWJsZUV4cGVuc2VSZWltYnVyc2FibGVFeHBlbnNlT3B0aW9ucygpLCBbXSk7XHJcbiAgY29uc3QgcmVpbWJ1cnNhYmxlRXhwZW5zZVRpdGxlID0gaW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUmVpbWJ1cnNhYmxlRXhwZW5zZVwiLCBcIlJlaW1idXJzYWJsZVwiKTtcclxuICBjb25zdCByZWltYnVyc2FibGVFeHBlbnNlSW5mb1RleHQgPSBpbmRUKFxyXG4gICAgXCJFeHBlbnNlU2hlZXRzX1JlaW1idXJzYWJsZV9JbmZvUG9wb3Zlcl9UZXh0XCIsXHJcbiAgICAnVGhpcyB2YWx1ZSBjYW4gYmUgc2V0IGFzIHRoZSBoZWFkZXIgZGVmYXVsdC4gSWYgaXQgaXMgY2hhbmdlZCBsYXRlciwgeW91IGNhbiB1cGRhdGUgYWxsIGxpbmVzIHdpdGggdGhlIG5ldyB2YWx1ZS4gSWYgYSBsaW5lIGNoYW5nZXMgdGhlIGluaGVyaXRlZCB2YWx1ZSwgdGhlIGhlYWRlciBzd2l0Y2hlcyB0byBcIkJvdGhcIi4nXHJcbiAgKTtcclxuICBjb25zdCByZWltYnVyc2FibGVFeHBlbnNlSW5mb0FyaWFMYWJlbCA9IGluZFQoXHJcbiAgICBcIkV4cGVuc2VTaGVldHNfUmVpbWJ1cnNhYmxlX0luZm9Qb3BvdmVyX0FyaWFcIixcclxuICAgIFwiU2hvdyByZWltYnVyc2FibGUgaW5mb3JtYXRpb25cIlxyXG4gICk7XHJcbiAgY29uc3QgcmVpbWJ1cnNhYmxlRXhwZW5zZVZhbHVlID0gbm9ybWFsaXplRXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2UoXHJcbiAgICBpc0VkaXRpbmcgPyBkcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UgOiBoZWFkZXIucmVpbWJ1cnNhYmxlRXhwZW5zZVxyXG4gICk7XHJcbiAgY29uc3QgaGFzRWRpdGFibGVSZWltYnVyc2FibGVFeHBlbnNlVmFsdWUgPSByZWltYnVyc2FibGVFeHBlbnNlT3B0aW9ucy5zb21lKFxyXG4gICAgKG9wdGlvbikgPT4gTnVtYmVyKG9wdGlvbi52YWx1ZSkgPT09IHJlaW1idXJzYWJsZUV4cGVuc2VWYWx1ZVxyXG4gICk7XHJcbiAgY29uc3QgcmVpbWJ1cnNhYmxlRXhwZW5zZUxhYmVsID0gZ2V0RXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2VMYWJlbChyZWltYnVyc2FibGVFeHBlbnNlVmFsdWUpO1xyXG4gIGNvbnN0IHNlbGVjdGVkUmVpbWJ1cnNhYmxlRXhwZW5zZU9wdGlvbiA9IFJlYWN0LnVzZU1lbW8oXHJcbiAgICAoKSA9PlxyXG4gICAgICBoYXNFZGl0YWJsZVJlaW1idXJzYWJsZUV4cGVuc2VWYWx1ZVxyXG4gICAgICAgID8gdW5kZWZpbmVkXHJcbiAgICAgICAgOiB7IHZhbHVlOiBTdHJpbmcocmVpbWJ1cnNhYmxlRXhwZW5zZVZhbHVlKSwgdGV4dDogcmVpbWJ1cnNhYmxlRXhwZW5zZUxhYmVsIH0sXHJcbiAgICBbaGFzRWRpdGFibGVSZWltYnVyc2FibGVFeHBlbnNlVmFsdWUsIHJlaW1idXJzYWJsZUV4cGVuc2VMYWJlbCwgcmVpbWJ1cnNhYmxlRXhwZW5zZVZhbHVlXVxyXG4gICk7XHJcbiAgLy8gU3RhdHVzIGNvbW1lbnQgaXMgbm93IGVkaXRlZCBvbmx5IGluIHRoZSBzdGF0dXMgdHJhbnNpdGlvbiBwb3B1cC5cclxuICBjb25zdCBzdGF0dXNDb21tZW50VmFsdWUgPSBzYWZlVGV4dChoZWFkZXIuZXN0YWRvQ29tZW50YXJpb3MpO1xyXG4gIGNvbnN0IHNob3dTdGF0dXNDb21tZW50RmllbGQgPSAhaXNDcmVhdGVNb2RlICYmIHN0YXR1c0NvbW1lbnRNb2RlICE9PSBcImhpZGRlblwiO1xyXG4gIGNvbnN0IHBhcnNlZERyYWZ0RXhjaGFuZ2VSYXRlID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KGRyYWZ0RXhjaGFuZ2VSYXRlKTtcclxuICBjb25zdCBwYXJzZWRPZmZpY2lhbFJhd1JhdGUgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQob2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSk7XHJcbiAgY29uc3QgYmFzZUV4Y2hhbmdlUmF0ZVZhbHVlID1cclxuICAgIHBhcnNlZERyYWZ0RXhjaGFuZ2VSYXRlICE9IG51bGxcclxuICAgICAgPyBwYXJzZWREcmFmdEV4Y2hhbmdlUmF0ZVxyXG4gICAgICA6IHBhcnNlZE9mZmljaWFsUmF3UmF0ZSAhPSBudWxsXHJcbiAgICAgICAgPyBwYXJzZWRPZmZpY2lhbFJhd1JhdGUgKiBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnRcclxuICAgICAgICA6IG51bGw7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlSW5mb1ZhbHVlID0gZm9ybWF0RXhwZW5zZU51bWJlcihcclxuICAgIGJhc2VFeGNoYW5nZVJhdGVWYWx1ZSAhPSBudWxsID8gYmFzZUV4Y2hhbmdlUmF0ZVZhbHVlIC8gZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50IDogbnVsbCxcclxuICAgIHtcclxuICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiA3LFxyXG4gICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDcsXHJcbiAgICAgIHVzZUdyb3VwaW5nOiBmYWxzZSxcclxuICAgICAgZmFsbGJhY2s6IFwiMC4wMDAwMDAwXCIsXHJcbiAgICB9XHJcbiAgKTtcclxuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlVmFsdWUgPSBub3JtYWxpemVFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZShoZWFkZXIuZXhjaGFuZ2VSYXRlTW9kZSkgPz8gMDtcclxuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlS2V5ID1cclxuICAgIGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9PT0gMVxyXG4gICAgICA/IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9NYW51YWxcIlxyXG4gICAgICA6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9PZmZpY2lhbFwiO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZU1vZGVGYWxsYmFjayA9IGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9PT0gMSA/IFwiVC5DLiBNYW51YWxcIiA6IFwiVC5DLiBPZmljaWFsXCI7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlTW9kZUxhYmVsID1cclxuICAgIChnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsKGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSkgfHwgaW5kVChleGNoYW5nZVJhdGVNb2RlS2V5LCBleGNoYW5nZVJhdGVNb2RlRmFsbGJhY2spKVxyXG4gICAgICAucmVwbGFjZShFWENIQU5HRV9SQVRFX01PREVfUFJFRklYX1BBVFRFUk4sIFwiXCIpXHJcbiAgICAgIC50cmltKClcclxuICAgICAgLnRvTG93ZXJDYXNlKCkgfHwgKGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9PT0gMSA/IFwibWFudWFsXCIgOiBcIm9maWNpYWxcIik7XHJcbiAgY29uc3QgaGFzRW5kcG9pbnRFeGNoYW5nZVJhdGVEYXRhID1cclxuICAgICEhc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSkgfHwgISFzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUpIHx8ICEhc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UpO1xyXG4gIGNvbnN0IGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb0RhdGUgPSBzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUpIHx8IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xyXG4gIGNvbnN0IGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb1NvdXJjZSA9IHNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKVxyXG4gICAgLnJlcGxhY2UoL1xccypcXChbXigpXSpcXClcXHMqL2csIFwiIFwiKVxyXG4gICAgLnJlcGxhY2UoL1xcc3syLH0vZywgXCIgXCIpXHJcbiAgICAudHJpbSgpIHx8IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xyXG4gIGNvbnN0IGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBpbmRGb3JtYXQoXHJcbiAgICBcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX0luZm9Qb3BvdmVyX0RldGFpbFwiLFxyXG4gICAgXCJUaXBvIGRlIGNhbWJpbyBvYnRlbmlkbyB7MH1cXG5GZWNoYTogezF9XFxuT3JpZ2VuOiB7Mn1cIixcclxuICAgIHNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUpIHx8IFwiMC4wMDAwMDAwXCIsXHJcbiAgICBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9EYXRlLFxyXG4gICAgZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvU291cmNlXHJcbiAgKTtcclxuICBjb25zdCBzdG9yZWRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA9IGluZEZvcm1hdChcclxuICAgIFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfSW5mb1BvcG92ZXJfU3RvcmVkXCIsXHJcbiAgICBcIlRpcG8gZGUgY2FtYmlvIHswfSB7MX1cIixcclxuICAgIGV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCxcclxuICAgIGV4Y2hhbmdlUmF0ZUluZm9WYWx1ZVxyXG4gICk7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBoYXNFbmRwb2ludEV4Y2hhbmdlUmF0ZURhdGEgPyBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlIDogc3RvcmVkRXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U7XHJcbiAgY29uc3QgcmVpbWJ1cnNhYmxlRXhwZW5zZUxhYmVsQ29udGVudCA9IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBoLTYgaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cclxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT17QUxJR05FRF9GSUVMRF9MQUJFTF9DTEFTU19OQU1FfT57cmVpbWJ1cnNhYmxlRXhwZW5zZVRpdGxlfTwvbGFiZWw+XHJcbiAgICAgIDxJbmZvUG9wb3Zlckljb25CdXR0b25cclxuICAgICAgICBjb250ZW50PXtyZWltYnVyc2FibGVFeHBlbnNlSW5mb1RleHR9XHJcbiAgICAgICAgYXJpYUxhYmVsPXtyZWltYnVyc2FibGVFeHBlbnNlSW5mb0FyaWFMYWJlbH1cclxuICAgICAgICBjbGFzc05hbWU9XCJzaHJpbmstMFwiXHJcbiAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJtYXgtdy1bbWluKDMyMHB4LGNhbGMoMTAwdnctMXJlbSkpXVwiXHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG4gIGNvbnN0IHJlaW1idXJzYWJsZUV4cGVuc2VGaWVsZCA9XHJcbiAgICBpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcyA/IChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9e0FMSUdORURfRklFTERfQ09OVEFJTkVSX0NMQVNTX05BTUV9PlxyXG4gICAgICAgIHtyZWltYnVyc2FibGVFeHBlbnNlTGFiZWxDb250ZW50fVxyXG4gICAgICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICAgICAgbGFiZWw9e3JlaW1idXJzYWJsZUV4cGVuc2VUaXRsZX1cclxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtyZWltYnVyc2FibGVFeHBlbnNlVGl0bGV9XHJcbiAgICAgICAgICBvcHRpb25zPXtyZWltYnVyc2FibGVFeHBlbnNlT3B0aW9uc31cclxuICAgICAgICAgIHNlbGVjdGVkT3B0aW9uPXtzZWxlY3RlZFJlaW1idXJzYWJsZUV4cGVuc2VPcHRpb259XHJcbiAgICAgICAgICB2YWx1ZT17U3RyaW5nKHJlaW1idXJzYWJsZUV4cGVuc2VWYWx1ZSl9XHJcbiAgICAgICAgICBvbkNoYW5nZT17KHZhbHVlKSA9PiBvbkRyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZShub3JtYWxpemVFeHBlbnNlUmVpbWJ1cnNhYmxlRXhwZW5zZSh2YWx1ZSkpfVxyXG4gICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmcgfHwgIWNhbkVkaXRIZWFkZXJGaWVsZHN9XHJcbiAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCAhY2FuRWRpdEhlYWRlckZpZWxkc31cclxuICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2Utc2hlZXQtcmVpbWJ1cnNhYmxlLWV4cGVuc2VcIlxyXG4gICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICAgIGNvbnRhaW5lckNsYXNzTmFtZT1cInNwYWNlLXktMFwiXHJcbiAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKSA6IChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9e0FMSUdORURfRklFTERfQ09OVEFJTkVSX0NMQVNTX05BTUV9PlxyXG4gICAgICAgIHtyZWltYnVyc2FibGVFeHBlbnNlTGFiZWxDb250ZW50fVxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgaW5kLXJlYWRvbmx5LWZpZWxkXCJcclxuICAgICAgICAgICAgdmFsdWU9e3JlaW1idXJzYWJsZUV4cGVuc2VMYWJlbCB8fCBcIi1cIn1cclxuICAgICAgICAgICAgcmVhZE9ubHlcclxuICAgICAgICAgICAgYXJpYS1sYWJlbD17cmVpbWJ1cnNhYmxlRXhwZW5zZVRpdGxlfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIGNvbnN0IGN1cnJlbmN5RmllbGQgPSAoXHJcbiAgICA8RXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTZWN0aW9uXHJcbiAgICAgIGludGVyYWN0aW9uPXt7IGlzRWRpdGluZywgY2FuRWRpdEhlYWRlckZpZWxkcyB9fVxyXG4gICAgICBjdXJyZW5jeVN0YXRlPXt7IGlzRm9yZWlnbkN1cnJlbmN5LCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcywgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLCBzaG93RXhjaGFuZ2VSYXRlIH19XHJcbiAgICAgIGV4cGVuc2VDdXJyZW5jeUxhYmVsPXtleHBlbnNlQ3VycmVuY3lMYWJlbH1cclxuICAgICAgaGVhZGVyQ3VycmVuY3lDb2RlPXtoZWFkZXJDdXJyZW5jeUNvZGV9XHJcbiAgICAgIGJhc2VDdXJyZW5jeUNvZGU9e2Jhc2VDdXJyZW5jeUNvZGV9XHJcbiAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlPXtkcmFmdEN1cnJlbmN5Q29kZX1cclxuICAgICAgZHJhZnRFeGNoYW5nZVJhdGU9e2RyYWZ0RXhjaGFuZ2VSYXRlfVxyXG4gICAgICBleGNoYW5nZVJhdGVWYWx1ZT17ZXhjaGFuZ2VSYXRlVmFsdWV9XHJcbiAgICAgIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlPXtleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZX1cclxuICAgICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50PXtleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnR9XHJcbiAgICAgIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlPXtleGNoYW5nZVJhdGVJbmZvTWVzc2FnZX1cclxuICAgICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cclxuICAgICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZT17b25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZX1cclxuICAgIC8+XHJcbiAgKTtcclxuICBjb25zdCBwcm9qZWN0RmllbGQgPVxyXG4gICAgIWlzQ3JlYXRlTW9kZSAmJiBpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcyA/IChcclxuICAgICAgPEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXRcclxuICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9XHJcbiAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Qcm9qZWN0X1BsYWNlaG9sZGVyXCIsIFwiUHJvamVjdCBpZFwiKX1cclxuICAgICAgICB2YWx1ZT17ZHJhZnRQcm9qZWN0SWR9XHJcbiAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRQcm9qZWN0SWRDaGFuZ2V9XHJcbiAgICAgICAgb25Db21taXQ9e29uRHJhZnRQcm9qZWN0SWRDb21taXR9XHJcbiAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmcgfHwgIWNhbkVkaXRIZWFkZXJGaWVsZHN9XHJcbiAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmcgfHwgIWNhbkVkaXRIZWFkZXJGaWVsZHN9XHJcbiAgICAgICAgY29udGFpbmVyQ2xhc3NOYW1lPXtBTElHTkVEX0ZJRUxEX0NPTlRBSU5FUl9DTEFTU19OQU1FfVxyXG4gICAgICAgIGxhYmVsQ2xhc3NOYW1lPXtBTElHTkVEX0ZJRUxEX0xBQkVMX0NMQVNTX05BTUV9XHJcbiAgICAgIC8+XHJcbiAgICApIDogIWlzQ3JlYXRlTW9kZSA/IChcbiAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9XG4gICAgICAgIHZhbHVlPXtwcm9qZWN0VmFsdWV9XG4gICAgICAgIGNvbnRhaW5lckNsYXNzTmFtZT17QUxJR05FRF9GSUVMRF9DT05UQUlORVJfQ0xBU1NfTkFNRX1cbiAgICAgICAgbGFiZWxDbGFzc05hbWU9e0FMSUdORURfRklFTERfTEFCRUxfQ0xBU1NfTkFNRX1cbiAgICAgIC8+XHJcbiAgICApIDogbnVsbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInJlbGF0aXZlIHNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgIHtpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcyA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnREZXNjcmlwdGlvbn1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxyXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17c2FmZVRleHQoaGVhZGVyLmRlc2NyaXB0aW9uKSB8fCBcIi1cIn1cclxuICAgICAgICAgICAgZnVsbFdpZHRoXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcbiAgICAgICAge2lzQ3JlYXRlTW9kZSAmJiBpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcyA/IChcclxuICAgICAgICAgIDxFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Qcm9qZWN0X1BsYWNlaG9sZGVyXCIsIFwiUHJvamVjdCBpZFwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2RyYWZ0UHJvamVjdElkfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdFByb2plY3RJZENoYW5nZX1cclxuICAgICAgICAgICAgb25Db21taXQ9e29uRHJhZnRQcm9qZWN0SWRDb21taXR9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nIHx8ICFjYW5FZGl0SGVhZGVyRmllbGRzfVxyXG4gICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZyB8fCAhY2FuRWRpdEhlYWRlckZpZWxkc31cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IGlzQ3JlYXRlTW9kZSA/IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfSB2YWx1ZT17cHJvamVjdFZhbHVlfSAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgeyFpc0NyZWF0ZU1vZGUgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgaXRlbXMtc3RhcnQgZ2FwLTMgbWQ6Y29sLXNwYW4tMiBtZDpnYXAtNFwiPlxyXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1RvdGFsQW1vdW50XCIsIFwiUmVpbWJ1cnNlbWVudCBhbW91bnRcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXt0b3RhbEFtb3VudFRleHR9XG4gICAgICAgICAgICAgIHZhbHVlQWxpZ249XCJyaWdodFwiXHJcbiAgICAgICAgICAgICAgY29udGFpbmVyQ2xhc3NOYW1lPXtBTElHTkVEX0ZJRUxEX0NPTlRBSU5FUl9DTEFTU19OQU1FfVxyXG4gICAgICAgICAgICAgIGxhYmVsQ2xhc3NOYW1lPXtBTElHTkVEX0ZJRUxEX0xBQkVMX0NMQVNTX05BTUV9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIHtjdXJyZW5jeUZpZWxkfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAge2lzQ3JlYXRlTW9kZSA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBpdGVtcy1zdGFydCBnYXAtMyBtZDpjb2wtc3Bhbi0yIG1kOmdhcC00XCI+XHJcbiAgICAgICAgICAgIHtyZWltYnVyc2FibGVFeHBlbnNlRmllbGR9XHJcbiAgICAgICAgICAgIHtjdXJyZW5jeUZpZWxkfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgeyFpc0NyZWF0ZU1vZGUgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTMgbWQ6Y29sLXNwYW4tMiBtZDpnYXAtNFwiPlxyXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1N0YXR1c1wiLCBcIlN0YXR1c1wiKX0gdmFsdWU9e3N0YXR1c1ZhbHVlfSAvPlxyXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0ZpZWxkX0lkZW50aWZpZXJcIiwgXCJJZGVudGlmaWVyXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtzYWZlVGV4dChoZWFkZXIuaG9qYUdhc3Rvc0lkKSB8fCBcIi1cIn1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIHshaXNDcmVhdGVNb2RlID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBpdGVtcy1zdGFydCBnYXAtMyBtZDpjb2wtc3Bhbi0yIG1kOmdhcC00XCI+XG4gICAgICAgICAgICB7cmVpbWJ1cnNhYmxlRXhwZW5zZUZpZWxkfVxuICAgICAgICAgICAge3Byb2plY3RGaWVsZH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHtvd25lckRpc3BsYXkgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX093bmVyVXNlclwiLCBcIk93bmVyIHVzZXJcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtvd25lckRpc3BsYXl9XHJcbiAgICAgICAgICAgIGZ1bGxXaWR0aFxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgICB7c2hvd1N0YXR1c0NvbW1lbnRGaWVsZCA/IChcclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzQ29tbWVudFwiLCBcIlN0YXR1cyBjb21tZW50XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17c3RhdHVzQ29tbWVudFZhbHVlIHx8IFwiLVwifVxyXG4gICAgICAgICAgICBmdWxsV2lkdGhcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbiBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGbGFnSWNvbi50c3hcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5SW50ZXJhY3Rpb24gPSB7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U3RhdGUgPSB7XHJcbiAgaXNGb3JlaWduQ3VycmVuY3k6IGJvb2xlYW47XHJcbiAgc2hvd0V4Y2hhbmdlUmF0ZTogYm9vbGVhbjtcclxuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcclxuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvblByb3BzID0ge1xyXG4gIGludGVyYWN0aW9uOiBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeUludGVyYWN0aW9uO1xyXG4gIGN1cnJlbmN5U3RhdGU6IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U3RhdGU7XHJcbiAgZXhwZW5zZUN1cnJlbmN5TGFiZWw6IHN0cmluZztcclxuICBoZWFkZXJDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBiYXNlQ3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBkcmFmdEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xyXG4gIGV4Y2hhbmdlUmF0ZVZhbHVlOiBzdHJpbmc7XHJcbiAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2U6IHN0cmluZztcclxuICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQ6IG51bWJlcjtcclxuICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZTogc3RyaW5nO1xyXG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gT3ducyB0aGUgY3VycmVuY3kgYW5kIGV4Y2hhbmdlLXJhdGUgVUkgc28gdGhlIGhlYWRlciBmb3JtIHN0YXlzIGNvbXBhY3QuXHJcbmNvbnN0IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbiA9ICh7XHJcbiAgaGVhZGVyQ3VycmVuY3lDb2RlLFxyXG4gIGJhc2VDdXJyZW5jeUNvZGUsXHJcbn06IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvblByb3BzKSA9PiB7XHJcbiAgY29uc3QgcmVpbWJ1cnNlbWVudEN1cnJlbmN5Q29kZSA9IGJhc2VDdXJyZW5jeUNvZGUgfHwgaGVhZGVyQ3VycmVuY3lDb2RlIHx8IFwiLVwiO1xyXG4gIGNvbnN0IHJlaW1idXJzZW1lbnRDdXJyZW5jeU9wdGlvbnMgPSBSZWFjdC51c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHtcclxuICAgICAgICB2YWx1ZTogcmVpbWJ1cnNlbWVudEN1cnJlbmN5Q29kZSxcclxuICAgICAgICB0ZXh0OiByZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlLFxyXG4gICAgICAgIGljb246IDxFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbiBjdXJyZW5jeUNvZGU9e3JlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGV9IHNpemVDbGFzc05hbWU9XCJoLTYgdy02XCIgLz4sXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgW3JlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGVdXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUmVpbWJ1cnNlbWVudEN1cnJlbmN5XCIsIFwiUmVpbWJ1cnNlbWVudCBjdXJyZW5jeVwiKX1cclxuICAgICAgb3B0aW9ucz17cmVpbWJ1cnNlbWVudEN1cnJlbmN5T3B0aW9uc31cclxuICAgICAgdmFsdWU9e3JlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGV9XHJcbiAgICAgIG9uQ2hhbmdlPXsoKSA9PiB1bmRlZmluZWR9XHJcbiAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxyXG4gICAgICByZWFkT25seVxyXG4gICAgICBkaXNhYmxlZFxyXG4gICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cbiAgICAgIHNob3dMYWJlbFxuICAgICAgc2VsZWN0ZWRUZXh0TW9kZT1cInZhbHVlXCJcbiAgICAgIGRyb3Bkb3duTWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC05NlwiXHJcbiAgICAgIHNlbGVjdGVkSWNvbkNsYXNzTmFtZT1cImgtNiB3LTZcIlxyXG4gICAgICBvcHRpb25JY29uQ2xhc3NOYW1lPVwiaC02IHctNlwiXHJcbiAgICAgIHNlbGVjdGVkSW5wdXRQYWRkaW5nQ2xhc3NOYW1lPVwicGwtMTJcIlxyXG4gICAgICBjb250YWluZXJDbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiXHJcbiAgICAgIGxhYmVsQ2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkIGlubGluZS1mbGV4IGgtNiBpdGVtcy1jZW50ZXIgbGVhZGluZy1ub25lXCJcclxuICAgICAgaWRCYXNlPVwiZXhwZW5zZS1oZWFkZXItbG9jYWwtY3VycmVuY3ktcmVhZG9ubHlcIlxyXG4gICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb247XHJcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IG1hcFdpbmRvd0VudW1PcHRpb25zLCB0eXBlIEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcclxuXHJcbnR5cGUgRXhjaGFuZ2VSYXRlTW9kZVVpTWV0YSA9IHtcclxuICBsYWJlbEtleTogc3RyaW5nO1xyXG4gIGZhbGxiYWNrOiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBFWENIQU5HRV9SQVRFX01PREVfTUVUQTogUGFydGlhbDxSZWNvcmQ8RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDb2RlLCBFeGNoYW5nZVJhdGVNb2RlVWlNZXRhPj4gPSB7XHJcbiAgMDoge1xyXG4gICAgbGFiZWxLZXk6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9PZmZpY2lhbFwiLFxyXG4gICAgZmFsbGJhY2s6IFwiVC5DLiBPZmljaWFsXCIsXHJcbiAgfSxcclxuICAxOiB7XHJcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX01hbnVhbFwiLFxyXG4gICAgZmFsbGJhY2s6IFwiVC5DLiBNYW51YWxcIixcclxuICB9LFxyXG59O1xyXG5jb25zdCBFWENIQU5HRV9SQVRFX01PREVfQ09ERVM6IEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ29kZVtdID0gWzAsIDFdO1xyXG5cclxuY29uc3QgZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDYXRhbG9nT3B0aW9ucyA9ICgpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xyXG4gIGNvbnN0IHNvdXJjZSA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgQXJyYXkuaXNBcnJheSh3aW5kb3cuX19FWFBFTlNFX0VYQ0hBTkdFX1JBVEVfTU9ERVNfXylcclxuICAgID8gd2luZG93Ll9fRVhQRU5TRV9FWENIQU5HRV9SQVRFX01PREVTX19cclxuICAgIDogW107XHJcblxyXG4gIHJldHVybiBtYXBXaW5kb3dFbnVtT3B0aW9ucyhzb3VyY2UpLmZpbHRlcigob3B0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBwYXJzZWQgPSBOdW1iZXIob3B0aW9uLnZhbHVlKTtcclxuICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgcGFyc2VkID49IDA7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNhdGFsb2dMYWJlbCA9ICh2YWx1ZTogRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDb2RlKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBtYXRjaCA9IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ2F0YWxvZ09wdGlvbnMoKS5maW5kKChvcHRpb24pID0+IE51bWJlcihvcHRpb24udmFsdWUpID09PSB2YWx1ZSk7XHJcbiAgcmV0dXJuIG1hdGNoPy50ZXh0IHx8IFwiXCI7XHJcbn07XHJcblxyXG4vLyBLZWVwcyBleGNoYW5nZSByYXRlIG1vZGUgdmFsdWVzIGNvbnN0cmFpbmVkIHRvIG5vbi1uZWdhdGl2ZSBudW1lcmljIGVudW0gY29kZXMuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ29kZSB8IG51bGwgPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IFN0cmluZyh2YWx1ZSkudHJpbSgpID09PSBcIlwiKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgcGFyc2VkID49IDApIHtcclxuICAgIHJldHVybiBwYXJzZWQ7XHJcbiAgfVxyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuLy8gQnVpbGRzIGZpeGVkIG9wdGlvbnMgZm9yIHRoZSBleGNoYW5nZSByYXRlIG1vZGUgZmlsdGVyLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVPcHRpb25zID0gKCk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XHJcbiAgY29uc3QgY2F0YWxvZ09wdGlvbnMgPSBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNhdGFsb2dPcHRpb25zKCk7XHJcbiAgaWYgKGNhdGFsb2dPcHRpb25zLmxlbmd0aCA+IDApIHJldHVybiBjYXRhbG9nT3B0aW9ucztcclxuXHJcbiAgcmV0dXJuIEVYQ0hBTkdFX1JBVEVfTU9ERV9DT0RFU1xyXG4gICAgLm1hcCgoY29kZSkgPT4ge1xyXG4gICAgICBjb25zdCBtZXRhID0gRVhDSEFOR0VfUkFURV9NT0RFX01FVEFbY29kZV07XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdmFsdWU6IFN0cmluZyhjb2RlKSxcclxuICAgICAgICB0ZXh0OiBtZXRhID8gaW5kVChtZXRhLmxhYmVsS2V5LCBtZXRhLmZhbGxiYWNrKSA6IFN0cmluZyhjb2RlKSxcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy8gUmV0dXJucyBhIGxvY2FsaXplZCBtb2RlIGxhYmVsIG9yIGVtcHR5IHRleHQgZm9yIG5vbi1zZWxlY3RlZCB2YWx1ZXMuXHJcbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGUodmFsdWUpO1xyXG4gIGlmIChub3JtYWxpemVkID09PSBudWxsKSByZXR1cm4gXCJcIjtcclxuICBjb25zdCBjYXRhbG9nTGFiZWwgPSBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNhdGFsb2dMYWJlbChub3JtYWxpemVkKTtcclxuICBpZiAoY2F0YWxvZ0xhYmVsKSByZXR1cm4gY2F0YWxvZ0xhYmVsO1xyXG5cclxuICBjb25zdCBtZXRhID0gRVhDSEFOR0VfUkFURV9NT0RFX01FVEFbbm9ybWFsaXplZF07XHJcbiAgcmV0dXJuIG1ldGEgPyBpbmRUKG1ldGEubGFiZWxLZXksIG1ldGEuZmFsbGJhY2spIDogU3RyaW5nKG5vcm1hbGl6ZWQpO1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcclxuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0TGluZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURhdGVQYXJ0cywgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VTZWN0aW9uRGl2aWRlciBmcm9tIFwiLi9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGltZWxpbmVDYXJkIGZyb20gXCIuL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4XCI7XHJcblxyXG50eXBlIFBhZ2luYXRpb25MYWJlbHMgPSB7XHJcbiAgZmlyc3Q6IHN0cmluZztcclxuICBwcmV2OiBzdHJpbmc7XHJcbiAgbmV4dDogc3RyaW5nO1xyXG4gIGxhc3Q6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZUxpbmVzVGltZWxpbmVQcm9wcyA9IHtcbiAgdmlzaWJsZUxpbmVzOiBFeHBlbnNlU2hlZXRMaW5lW107XG4gIHJlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgdG90YWxMaW5lUGFnZXM6IG51bWJlcjtcclxuICBsaW5lUGFnZTogbnVtYmVyO1xyXG4gIGxpbmVzTGFiZWw6IHN0cmluZztcclxuICBlbXB0eVRleHQ6IHN0cmluZztcclxuICBwYWdpbmF0aW9uTGFiZWxzOiBQYWdpbmF0aW9uTGFiZWxzO1xyXG4gIGNvbnRhaW5lclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgb25MaW5lUGFnZUNoYW5nZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcclxuICBvbk9wZW5MaW5lOiAobGluZVJlY0lkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBEdW1iIHRpbWVsaW5lIGZvciBleHBlbnNlIHNoZWV0IGxpbmVzIHdpdGggc3RhbmRhcmQgY2FyZCBhbmQgcGFnaW5hdGlvbiBsYXlvdXQuXHJcbmNvbnN0IEV4cGVuc2VMaW5lc1RpbWVsaW5lID0gKHtcbiAgdmlzaWJsZUxpbmVzLFxuICByZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlLFxuICB0b3RhbExpbmVQYWdlcyxcclxuICBsaW5lUGFnZSxcclxuICBsaW5lc0xhYmVsLFxyXG4gIGVtcHR5VGV4dCxcclxuICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gIGNvbnRhaW5lclJlZixcclxuICBvbkxpbmVQYWdlQ2hhbmdlLFxyXG4gIG9uT3BlbkxpbmUsXHJcbn06IEV4cGVuc2VMaW5lc1RpbWVsaW5lUHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic3BhY2UteS0wXCI+XHJcbiAgICAgIDxFeHBlbnNlU2VjdGlvbkRpdmlkZXIgbGFiZWw9e2xpbmVzTGFiZWx9IGNsYXNzTmFtZT1cImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyLS1zcGFjZWRcIiAvPlxyXG5cclxuICAgICAge3Zpc2libGVMaW5lcy5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2VtcHR5VGV4dH0gLz5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8ZGl2IHJlZj17Y29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cclxuICAgICAgICAgIHt2aXNpYmxlTGluZXMubWFwKChsaW5lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsaW5lSWQgPSBzYWZlVGV4dChsaW5lLmxpbmVSZWNJZCk7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHNhZmVUZXh0KGxpbmUuZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgY29uc3QgYW1vdW50VGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShcbiAgICAgICAgICAgICAgbGluZS52aXNpYmxlUmVpbWJ1cnNhYmxlVG90YWwgPz8gbGluZS5hbW91bnQgPz8gbnVsbCxcbiAgICAgICAgICAgICAgcmVpbWJ1cnNlbWVudEN1cnJlbmN5Q29kZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGxpbmtlZFRpY2tldEZpbGVJZCA9IHNhZmVUZXh0KGxpbmUuZmlsZUlkKTtcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdElkID0gc2FmZVRleHQobGluZS5wcm9qSWQpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRlUGFydHMgPSBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzKHNhZmVUZXh0KGxpbmUudHJhbnNEYXRlKSwgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCIpO1xyXG4gICAgICAgICAgICBjb25zdCB0aWNrZXRTdGF0dXNJY29uID0gbGlua2VkVGlja2V0RmlsZUlkID8gKFxyXG4gICAgICAgICAgICAgIDxzdmdcclxuICAgICAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICAgICAgICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17MS41fVxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInNpemUtNFwiXHJcbiAgICAgICAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICBkPVwiTTEzLjE5IDguNjg4YTQuNSA0LjUgMCAwIDEgMS4yNDIgNy4yNDRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMS02LjM2NC02LjM2NGwxLjc1Ny0xLjc1N20xMy4zNS0uNjIyIDEuNzU3LTEuNzU3YTQuNSA0LjUgMCAwIDAtNi4zNjQtNi4zNjRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMCAxLjI0MiA3LjI0NFwiXHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICApIDogbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2xpbmVJZCB8fCBgJHtzYWZlVGV4dChsaW5lLnRyYW5zRGF0ZSl9LSR7ZGVzY3JpcHRpb259LSR7YW1vdW50VGV4dH0tJHtwcm9qZWN0SWR9YH0gY2xhc3NOYW1lPVwidGltZWxpbmUtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgPEV4cGVuc2VUaW1lbGluZUNhcmRcclxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtkZXNjcmlwdGlvbiB8fCBsaW5lSWQgfHwgXCItXCJ9XHJcbiAgICAgICAgICAgICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XHJcbiAgICAgICAgICAgICAgICAgIG9uT3Blbj17KCkgPT4gb25PcGVuTGluZShsaW5lSWQpfVxyXG4gICAgICAgICAgICAgICAgICB0aXRsZUNsYXNzTmFtZT1cInRpbWVsaW5lLW5hbWUgZXhwZW5zZS1saW5lLWNhcmRfX3RpdGxlXCJcclxuICAgICAgICAgICAgICAgICAgc3VidGl0bGVDbGFzc05hbWU9XCJleHBlbnNlLXNoZWV0LWNhcmRfX3N1YnRpdGxlIGV4cGVuc2UtbGluZS1jYXJkX19tZXRhXCJcclxuICAgICAgICAgICAgICAgICAgc3RhdHVzSWNvbj17dGlja2V0U3RhdHVzSWNvbn1cclxuICAgICAgICAgICAgICAgICAgc3RhdHVzSWNvbkNsYXNzTmFtZT1cImV4cGVuc2UtbGluZS1jYXJkX190aWNrZXQtaWNvblwiXHJcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0xhYmVsPXtsaW5rZWRUaWNrZXRGaWxlSWQgfHwgdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG5cclxuICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXHJcbiAgICAgICAgdG90YWxQYWdlcz17dG90YWxMaW5lUGFnZXN9XHJcbiAgICAgICAgY3VycmVudFBhZ2U9e2xpbmVQYWdlfVxyXG4gICAgICAgIG9uUGFnZUNoYW5nZT17b25MaW5lUGFnZUNoYW5nZX1cclxuICAgICAgICBsYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XHJcbiAgICAgIC8+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VMaW5lc1RpbWVsaW5lO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUGFnZUJvdHRvbUFjdGlvbnMsIHsgUGFnZUJvdHRvbUFjdGlvbkJ1dHRvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUGFnZUJvdHRvbUFjdGlvbnMudHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbiB9IGZyb20gXCIuL2V4cGVuc2VTaGVldERldGFpbFBvbGljeS50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXJQcm9wcyA9IHtcclxuICBhY3Rpb25zOiBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25bXTtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBvbkFjdGlvbkNsaWNrOiAoYWN0aW9uOiBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb24pID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIHRoZSBib3R0b20gdG9vbGJhciBmb3IgZXhwZW5zZSBzaGVldCBzdGF0dXMgdHJhbnNpdGlvbnMuXHJcbmNvbnN0IEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbkJhciA9ICh7IGFjdGlvbnMsIGJ1c3ksIGRpc2FibGVkID0gZmFsc2UsIG9uQWN0aW9uQ2xpY2sgfTogRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyUHJvcHMpID0+IHtcclxuICBpZiAoYWN0aW9ucy5sZW5ndGggPCAxKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8UGFnZUJvdHRvbUFjdGlvbnMgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19Cb3R0b21BY3Rpb25zX1Rvb2xiYXJcIiwgXCJBY2Npb25lcyBkZSBlc3RhZG8gZGUgbGEgaG9qYSBkZSBnYXN0b1wiKX0+XHJcbiAgICAgIHthY3Rpb25zLm1hcCgoYWN0aW9uKSA9PiAoXHJcbiAgICAgICAgPFBhZ2VCb3R0b21BY3Rpb25CdXR0b25cclxuICAgICAgICAgIGtleT17YWN0aW9uLmlkfVxyXG4gICAgICAgICAgbGFiZWw9e2luZFQoYWN0aW9uLmxhYmVsS2V5LCBhY3Rpb24uZmFsbGJhY2spfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e2J1c3kgfHwgZGlzYWJsZWR9XHJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkFjdGlvbkNsaWNrKGFjdGlvbil9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSl9XHJcbiAgICA8L1BhZ2VCb3R0b21BY3Rpb25zPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXI7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlUXVpY2tUaWNrZXRQcm9ncmVzc092ZXJsYXkgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5LnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgVElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEUgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dDb3JlLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzUHJvcHMgPSB7XHJcbiAgbW9kYWw6IHtcclxuICAgIG9wZW46IGJvb2xlYW47XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBjYW5jZWxUZXh0Pzogc3RyaW5nO1xyXG4gICAgc2hvd0NhbmNlbD86IGJvb2xlYW47XHJcbiAgICBzaG93Q29uZmlybT86IGJvb2xlYW47XHJcbiAgfTtcclxuICBtb2RhbEVycm9yOiBzdHJpbmc7XHJcbiAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGU6IGJvb2xlYW47XHJcbiAgbW9kYWxMb2FkaW5nVGV4dDogc3RyaW5nO1xyXG4gIG1vZGFsQ2FuY2VsVGV4dDogc3RyaW5nO1xyXG4gIG1vZGFsQ29uZmlybVRleHQ6IHN0cmluZztcclxuICBtb2RhbEJvZHk/OiBSZWFjdC5SZWFjdE5vZGU7XHJcbiAgY2FtZXJhSW5wdXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgZ2FsbGVyeUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIHNvdXJjZVBpY2tlck9wZW46IGJvb2xlYW47XHJcbiAgcXVpY2tUaWNrZXRCdXN5OiBib29sZWFuO1xyXG4gIHF1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlOiBzdHJpbmc7XHJcbiAgcXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlczogQXJyYXk8e1xyXG4gICAga2V5OiBzdHJpbmc7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIHN0YXRlOiBcImNvbXBsZXRlZFwiIHwgXCJhY3RpdmVcIiB8IFwicGVuZGluZ1wiO1xyXG4gIH0+O1xyXG4gIHF1aWNrVGlja2V0RWxhcHNlZE1zOiBudW1iZXI7XHJcbiAgcXVpY2tUaWNrZXRFcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICBxdWlja1RpY2tldEF0dGVtcHRJZDogc3RyaW5nO1xyXG4gIHF1aWNrVGlja2V0VHJhY2VMaXN0OiBBcnJheTx7IHN0ZXA6IHN0cmluZzsgdHJhY2VJZDogc3RyaW5nOyBhdDogc3RyaW5nIH0+O1xyXG4gIGhhc1BlbmRpbmdVcGxvYWRSZXRyeTogYm9vbGVhbjtcclxuICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZTogYm9vbGVhbjtcclxuICBvbkNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbiAgb25DYW5jZWw6ICgpID0+IHZvaWQ7XHJcbiAgb25TZWxlY3RlZENhbWVyYUZpbGU6IChmaWxlOiBGaWxlIHwgbnVsbCkgPT4gdm9pZDtcclxuICBvblNlbGVjdGVkR2FsbGVyeUZpbGU6IChmaWxlOiBGaWxlIHwgbnVsbCkgPT4gdm9pZDtcclxuICBvblNlbGVjdEZyb21DYW1lcmE6ICgpID0+IHZvaWQ7XHJcbiAgb25TZWxlY3RGcm9tR2FsbGVyeTogKCkgPT4gdm9pZDtcclxuICBvbkNsb3NlU291cmNlUGlja2VyOiAoKSA9PiB2b2lkO1xyXG4gIG9uUmV0cnlQZW5kaW5nVXBsb2FkOiAoKSA9PiB2b2lkO1xyXG4gIG9uQ2xlYXJRdWlja1RpY2tldEVycm9yOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyBtb2RhbCBhbmQgcXVpY2stdGlja2V0IG92ZXJsYXlzIGZvciB0aGUgZXhwZW5zZSBzaGVldCBkZXRhaWwgcGFnZS5cclxuY29uc3QgRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXMgPSAoe1xyXG4gIG1vZGFsLFxyXG4gIG1vZGFsRXJyb3IsXHJcbiAgc3RhdHVzLFxyXG4gIGJ1c3ksXHJcbiAgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLFxyXG4gIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgbW9kYWxDYW5jZWxUZXh0LFxyXG4gIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgbW9kYWxCb2R5LFxyXG4gIGNhbWVyYUlucHV0UmVmLFxyXG4gIGdhbGxlcnlJbnB1dFJlZixcclxuICBzb3VyY2VQaWNrZXJPcGVuLFxyXG4gIHF1aWNrVGlja2V0QnVzeSxcclxuICBxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSxcclxuICBxdWlja1RpY2tldFByb2dyZXNzU3RhZ2VzLFxyXG4gIHF1aWNrVGlja2V0RWxhcHNlZE1zLFxyXG4gIHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlLFxyXG4gIHF1aWNrVGlja2V0QXR0ZW1wdElkLFxyXG4gIHF1aWNrVGlja2V0VHJhY2VMaXN0LFxyXG4gIGhhc1BlbmRpbmdVcGxvYWRSZXRyeSxcclxuICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZSxcclxuICBvbkNvbmZpcm0sXHJcbiAgb25DYW5jZWwsXHJcbiAgb25TZWxlY3RlZENhbWVyYUZpbGUsXHJcbiAgb25TZWxlY3RlZEdhbGxlcnlGaWxlLFxyXG4gIG9uU2VsZWN0RnJvbUNhbWVyYSxcclxuICBvblNlbGVjdEZyb21HYWxsZXJ5LFxyXG4gIG9uQ2xvc2VTb3VyY2VQaWNrZXIsXHJcbiAgb25SZXRyeVBlbmRpbmdVcGxvYWQsXHJcbiAgb25DbGVhclF1aWNrVGlja2V0RXJyb3IsXHJcbn06IEV4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzUHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPENvbmZpcm1Nb2RhbFxyXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XHJcbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxyXG4gICAgICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XHJcbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsQ29uZmlybVRleHR9XHJcbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWxDYW5jZWxUZXh0fVxyXG4gICAgICAgIGxvYWRpbmdUZXh0PXttb2RhbExvYWRpbmdUZXh0fVxyXG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XHJcbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxyXG4gICAgICAgIGJ1c3k9e2J1c3kgfHwgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlfVxyXG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17c3RhdHVzfVxyXG4gICAgICAgIG9uQ29uZmlybT17b25Db25maXJtfVxyXG4gICAgICAgIG9uQ2FuY2VsPXtvbkNhbmNlbH1cclxuICAgICAgPlxyXG4gICAgICAgIHttb2RhbEJvZHl9XHJcbiAgICAgIDwvQ29uZmlybU1vZGFsPlxyXG5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgcmVmPXtjYW1lcmFJbnB1dFJlZn1cclxuICAgICAgICB0eXBlPVwiZmlsZVwiXHJcbiAgICAgICAgYWNjZXB0PXtUSUNLRVRfSU1BR0VfQUNDRVBUX0FUVFJJQlVURX1cclxuICAgICAgICBjYXB0dXJlPVwiZW52aXJvbm1lbnRcIlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXHJcbiAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZmlsZXM/LlswXSB8fCBudWxsO1xyXG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICBvblNlbGVjdGVkQ2FtZXJhRmlsZShmaWxlKTtcclxuICAgICAgICB9fVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgcmVmPXtnYWxsZXJ5SW5wdXRSZWZ9XHJcbiAgICAgICAgdHlwZT1cImZpbGVcIlxyXG4gICAgICAgIGFjY2VwdD17VElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEV9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcclxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQuY3VycmVudFRhcmdldC5maWxlcz8uWzBdIHx8IG51bGw7XHJcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgIG9uU2VsZWN0ZWRHYWxsZXJ5RmlsZShmaWxlKTtcclxuICAgICAgICB9fVxyXG4gICAgICAvPlxyXG5cclxuICAgICAge3NvdXJjZVBpY2tlck9wZW4gPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTk1MC80NSBweC00IHB5LTZcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LXNtIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHAtNCBzaGFkb3cteGxcIj5cclxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtWzE2cHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS04MDBcIj5cclxuICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9UaXRsZVwiLCBcIk51ZXZvIHRpY2tldFwiKX1cclxuICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgICAge2luZFQoXHJcbiAgICAgICAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9Cb2R5XCIsXHJcbiAgICAgICAgICAgICAgICBcIlNlbGVjY2lvbmEgdW5hIGZ1ZW50ZSBwYXJhIGNhcHR1cmFyIG8gZWxlZ2lyIGxhIGltYWdlbiBkZWwgdGlja2V0LlwiXHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9wPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IGdyaWQgZ3JpZC1jb2xzLTEgZ2FwLTJcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIiBvbkNsaWNrPXtvblNlbGVjdEZyb21DYW1lcmF9PlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfQ2FtZXJhXCIsIFwiVXNhciBjXHUwMEUxbWFyYVwiKX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIiBvbkNsaWNrPXtvblNlbGVjdEZyb21HYWxsZXJ5fT5cclxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0dhbGxlcnlcIiwgXCJFbGVnaXIgaW1hZ2VuXCIpfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiIG9uQ2xpY2s9e29uQ2xvc2VTb3VyY2VQaWNrZXJ9PlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIDxFeHBlbnNlUXVpY2tUaWNrZXRQcm9ncmVzc092ZXJsYXlcclxuICAgICAgICBvcGVuPXtxdWlja1RpY2tldEJ1c3l9XHJcbiAgICAgICAgdGl0bGU9e2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19UaXRsZVwiLCBcIlByb2Nlc3NpbmcgdGlja2V0XCIpfVxyXG4gICAgICAgIHN1bW1hcnk9e3F1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlIHx8IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgICAgZWxhcHNlZE1zPXtxdWlja1RpY2tldEVsYXBzZWRNc31cclxuICAgICAgICBzdGFnZXM9e3F1aWNrVGlja2V0UHJvZ3Jlc3NTdGFnZXN9XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICB7cXVpY2tUaWNrZXRFcnJvck1lc3NhZ2UgPyAoXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtcclxuICAgICAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmVcclxuICAgICAgICAgICAgICA/IFwiZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgc3BhY2UteS0yIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItYW1iZXItMjAwIGJnLWFtYmVyLTUwIHAtMyB0ZXh0LXNtIHRleHQtYW1iZXItOTAwXCJcclxuICAgICAgICAgICAgICA6IFwiZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgc3BhY2UteS0yIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctcm9zZS01MCBwLTMgdGV4dC1zbSB0ZXh0LXJvc2UtODAwXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8cD57cXVpY2tUaWNrZXRFcnJvck1lc3NhZ2V9PC9wPlxyXG4gICAgICAgICAge3F1aWNrVGlja2V0QXR0ZW1wdElkID8gKFxyXG4gICAgICAgICAgICA8cFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17XHJcbiAgICAgICAgICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZVxyXG4gICAgICAgICAgICAgICAgICA/IFwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1hbWJlci0yMDAgYmctd2hpdGUgcHgtMiBweS0xIGZvbnQtbW9ubyB0ZXh0LVsxMXB4XSB0ZXh0LWFtYmVyLTkwMCBicmVhay1hbGxcIlxyXG4gICAgICAgICAgICAgICAgICA6IFwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy13aGl0ZSBweC0yIHB5LTEgZm9udC1tb25vIHRleHQtWzExcHhdIHRleHQtcm9zZS04MDAgYnJlYWstYWxsXCJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7YGF0dGVtcHRJZDogJHtxdWlja1RpY2tldEF0dGVtcHRJZH1gfVxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgIHtxdWlja1RpY2tldFRyYWNlTGlzdC5sZW5ndGggPiAwID8gKFxyXG4gICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcclxuICAgICAgICAgICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlXHJcbiAgICAgICAgICAgICAgICAgID8gXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBiZy13aGl0ZSBwLTIgdGV4dC14cyB0ZXh0LWFtYmVyLTgwMFwiXHJcbiAgICAgICAgICAgICAgICAgIDogXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXdoaXRlIHAtMiB0ZXh0LXhzIHRleHQtcm9zZS03MDBcIlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtxdWlja1RpY2tldFRyYWNlTGlzdC5tYXAoKGVudHJ5KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8cCBrZXk9e2Ake2VudHJ5LnN0ZXB9LSR7ZW50cnkuYXR9YH0+e2Ake2VudHJ5LnN0ZXB9OiAke2VudHJ5LnRyYWNlSWR9YH08L3A+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC0yXCI+XHJcbiAgICAgICAgICAgIHtoYXNQZW5kaW5nVXBsb2FkUmV0cnkgPyAoXHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiIG9uQ2xpY2s9e29uUmV0cnlQZW5kaW5nVXBsb2FkfT5cclxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUmV0cnlVcGxvYWRcIiwgXCJSZWludGVudGFyIHVwbG9hZFwiKX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIiBvbkNsaWNrPXtvbkNsZWFyUXVpY2tUaWNrZXRFcnJvcn0+XHJcbiAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2xvc2VcIiwgXCJDbG9zZVwiKX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXM7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IHsgdXNlQXV0aENvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcclxuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XHJcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xyXG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHsgaW5kRm9ybWF0LCBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XHJcbmltcG9ydCB7IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTWFuYWdlZFVzZXJTY29wZS50c1wiO1xuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwsIHJlbG9hZEV4cGVuc2VQYWdlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyBzYXZlRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQudHNcIjtcbmltcG9ydCB7IHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dC50c1wiO1xuaW1wb3J0IHsgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBY3RpbmdVc2VyLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlU3RhdHVzTGFiZWwgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgeyBub3JtYWxpemVFeHBlbnNlUmVpbWJ1cnNhYmxlRXhwZW5zZSB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2VDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0RmxvdyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUgfSBmcm9tIFwiLi4vbGlzdC91c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUudHNcIjtcclxuaW1wb3J0IHsgTGlua1RpY2tldEljb24sIE5ld0xpbmVJY29uLCBOZXdUaWNrZXRJY29uIH0gZnJvbSBcIi4vRXhwZW5zZVNoZWV0RGV0YWlsSWNvbnMudHN4XCI7XHJcblxyXG5jb25zdCBMSU5FU19QQUdFX1NJWkUgPSA2O1xyXG5jb25zdCBFWFBFTlNFX1NUQVRVU19BUFBST1ZBTF9SRVFVRVNURUQgPSAxO1xyXG5cclxuY29uc3QgcGFnZWRTbGljZSA9IDxULD4oaXRlbXM6IFRbXSwgcGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKTogVFtdID0+IHtcclxuICBpZiAoIWl0ZW1zLmxlbmd0aCkgcmV0dXJuIFtdO1xyXG4gIGNvbnN0IHNhZmVQYWdlID0gTWF0aC5tYXgoMSwgcGFnZSk7XHJcbiAgY29uc3Qgc3RhcnQgPSAoc2FmZVBhZ2UgLSAxKSAqIHBhZ2VTaXplO1xyXG4gIHJldHVybiBpdGVtcy5zbGljZShzdGFydCwgc3RhcnQgKyBwYWdlU2l6ZSk7XHJcbn07XHJcblxyXG4vLyBUcmVhdHMgb25seSBwb3NpdGl2ZSBudW1lcmljIHRvdGFscyBhcyBhY3Rpb25hYmxlIHNoZWV0IGNvbnRlbnQuXHJcbmNvbnN0IGhhc1Bvc2l0aXZlVG90YWxBbW91bnQgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSAmJiBwYXJzZWQgPiAwO1xyXG59O1xyXG5cclxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxyXG5leHBvcnQgY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XHJcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgoe1xyXG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXHJcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcclxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIE93bnMgdGhlIGRldGFpbC1wYWdlIG9yY2hlc3RyYXRpb24gYW5kIGtlZXBzIHRoZSB2aWV3IGNvbXBvbmVudCBmb2N1c2VkIG9uIHJlbmRlcmluZy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250cm9sbGVyID0gKCkgPT4ge1xyXG4gIGNvbnN0IHtcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICB9ID0gdXNlQXV0aENvbnRleHQoKTtcclxuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIlZpZXdcIik7XHJcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZSA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiQWRkXCIpO1xyXG4gIGNvbnN0IHNoZWV0SWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX0lEX18pO1xyXG4gIGNvbnN0IHNoZWV0TW9kZSA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfU0hFRVRfTU9ERV9fKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IGlzQ3JlYXRlTW9kZSA9IHNoZWV0TW9kZSA9PT0gXCJjcmVhdGVcIjtcclxuICBjb25zdCBpc01hbmFnaW5nT3RoZXJVc2VyQnlTZWxlY3Rpb24gPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkKHtcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICByZWNvcmRPd25lclVzZXJJZDogXCJcIixcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICB9KTtcclxuICBjb25zdCBjYW5DcmVhdGVFeHBlbnNlRm9yU2VsZWN0ZWRDb250ZXh0ID0gY2FuQ3JlYXRlRXhwZW5zZSAmJiAhaXNNYW5hZ2luZ090aGVyVXNlckJ5U2VsZWN0aW9uO1xyXG4gIGNvbnN0IGxpbmVDb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBjcmVhdGVkU2hlZXRJZFJlZiA9IHVzZVJlZihcIlwiKTtcclxuICBjb25zdCBjYW1lcmFJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgZ2FsbGVyeUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLCBzZXRJc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzdGF0dXNUcmFuc2l0aW9uQ29tbWVudCwgc2V0U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3Nob3dTdGF0dXNUcmFuc2l0aW9uQ29tbWVudEZpZWxkLCBzZXRTaG93U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRGaWVsZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2NvbmZpcm1lZFByb2plY3RJZCwgc2V0Q29uZmlybWVkUHJvamVjdElkXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IHN0YXR1c1RyYW5zaXRpb25Db21tZW50UmVmID0gdXNlUmVmKFwiXCIpO1xyXG5cclxuICBjb25zdCBwYWdpbmF0aW9uTGFiZWxzID0gdXNlTWVtbyhcclxuICAgICgpID0+ICh7XHJcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXHJcbiAgICAgIHByZXY6IGluZFQoXCJIaXN0b3J5X1BhZ2VfUHJldlwiLCBcIlByZXZpb3VzXCIpLFxyXG4gICAgICBuZXh0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpLFxyXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxyXG4gICAgfSksXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGRldGFpbFN0YXRlID0gdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUoe1xyXG4gICAgaGFzQWNjZXNzLFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogY2FuQ3JlYXRlRXhwZW5zZUZvclNlbGVjdGVkQ29udGV4dCxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHNoZWV0SWQsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICB9KTtcclxuXHJcbiAgY29uc3Qge1xyXG4gICAgaGVhZGVyLFxyXG4gICAgbGluZXMsXHJcbiAgICBsaW5lUGFnZSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGJ1c3ksXHJcbiAgICBzdGF0dXMsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtb2RhbEVycm9yLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0UHJvamVjdElkLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIGRyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlLFxyXG4gICAgcHJvamVjdFZhbHVlLFxyXG4gICAgZGV0YWlsUG9saWN5LFxyXG4gICAgaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgIGlzU2hlZXRMb2NrZWQsXHJcbiAgICBleGNoYW5nZVJhdGVWYWx1ZSxcclxuICAgIHNob3dFeGNoYW5nZVJhdGUsXHJcbiAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcclxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcclxuICAgIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCxcclxuICAgIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlLFxyXG4gICAgY2FuRWRpdEFueUN1cnJlbnQsXHJcbiAgICBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLFxyXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcclxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcclxuICAgIHNldExpbmVQYWdlLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLFxyXG4gICAgaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlLFxyXG4gICAgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldCxcclxuICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsLFxyXG4gIH0gPSBkZXRhaWxTdGF0ZTtcclxuXHJcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3ID0gY2FuQ3JlYXRlRXhwZW5zZSAmJiAhaXNNYW5hZ2luZ090aGVyVXNlcjtcclxuICBjb25zdCBjYW5EZWxldGVFeHBlbnNlRm9yQ3VycmVudFZpZXcgPSBkZXRhaWxQb2xpY3kuY2FuRGVsZXRlU2hlZXQ7XHJcbiAgY29uc3QgY2FuVHJhbnNpdGlvblN0YXR1cyA9IGRldGFpbFBvbGljeS5zdGF0dXNBY3Rpb25zLmxlbmd0aCA+IDA7XHJcbiAgY29uc3QgaXNSZWFkT25seU1vZGUgPSBkZXRhaWxQb2xpY3kuaW50ZXJhY3Rpb25Nb2RlID09PSBcInJlYWRfb25seVwiO1xyXG4gIGNvbnN0IGN1cnJlbnRTdGF0dXNDb2RlID0gdHlwZW9mIGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSBcIm51bWJlclwiID8gaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA6IG51bGw7XHJcbiAgY29uc3QgaGlkZXNDcnVkVG9wYmFyQnlTdGF0dXMgPVxyXG4gICAgY3VycmVudFN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkFMX1JFUVVFU1RFRCAmJiAhY2FuRWRpdEFueUN1cnJlbnQ7XHJcbiAgY29uc3QgdG9wYmFyQWN0aW9uTW9kZSA9ICFpc0NyZWF0ZU1vZGUgJiYgKGlzUmVhZE9ubHlNb2RlIHx8IGhpZGVzQ3J1ZFRvcGJhckJ5U3RhdHVzKSA/IFwidmlld19vbmx5XCIgOiBcImRlZmF1bHRcIjtcclxuICBjb25zdCBkZXRhaWxQZXJtaXNzaW9uc1JlYWR5ID0gbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5ICYmIChpc0NyZWF0ZU1vZGUgfHwgISFoZWFkZXIpO1xyXG4gIGNvbnN0IHsgaW52YWxpZGF0ZUNhY2hlZExpc3RGb3JSZWZldGNoIH0gPSB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUoKTtcclxuXHJcbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgY2FuY2VsQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XHJcbiAgICBkZWZhdWx0Q29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpLFxyXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByZXNldFN0YXR1c1RyYW5zaXRpb25EaWFsb2cgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzdGF0dXNUcmFuc2l0aW9uQ29tbWVudFJlZi5jdXJyZW50ID0gXCJcIjtcclxuICAgIHNldFN0YXR1c1RyYW5zaXRpb25Db21tZW50KFwiXCIpO1xyXG4gICAgc2V0U2hvd1N0YXR1c1RyYW5zaXRpb25Db21tZW50RmllbGQoZmFsc2UpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xvc2VDb25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgcmVzZXRTdGF0dXNUcmFuc2l0aW9uRGlhbG9nKCk7XHJcbiAgICBjbG9zZUNvbmZpcm0oKTtcclxuICB9LCBbY2xvc2VDb25maXJtLCByZXNldFN0YXR1c1RyYW5zaXRpb25EaWFsb2ddKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2FuY2VsQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHJlc2V0U3RhdHVzVHJhbnNpdGlvbkRpYWxvZygpO1xyXG4gICAgY2FuY2VsQ29uZmlybSgpO1xyXG4gIH0sIFtjYW5jZWxDb25maXJtLCByZXNldFN0YXR1c1RyYW5zaXRpb25EaWFsb2ddKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm0sIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1c10pO1xyXG5cclxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcclxuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XHJcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcclxuICAgIDogIWJ1c3kgJiYgbW9kYWxFcnJvclxyXG4gICAgICA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKVxyXG4gICAgICA6IChtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghYnVzeSAmJiBtb2RhbEVycm9yKSB7XHJcbiAgICAgIGhhbmRsZUNhbmNlbENvbmZpcm0oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZvaWQgaGFuZGxlTW9kYWxDb25maXJtKCk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNhbmNlbENvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbW9kYWxFcnJvcl0pO1xyXG5cclxuICBjb25zdCB2aXNpYmxlTGluZXMgPSB1c2VNZW1vKCgpID0+IHBhZ2VkU2xpY2UobGluZXMsIGxpbmVQYWdlLCBMSU5FU19QQUdFX1NJWkUpLCBbbGluZVBhZ2UsIGxpbmVzXSk7XHJcbiAgY29uc3QgdG90YWxMaW5lUGFnZXMgPSBNYXRoLmNlaWwoKGxpbmVzLmxlbmd0aCB8fCAwKSAvIExJTkVTX1BBR0VfU0laRSk7XHJcbiAgY29uc3QgdG90YWxBbW91bnRUZXh0ID0gdXNlTWVtbyhcbiAgICAoKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koaGVhZGVyPy50b3RhbEFtb3VudCA/PyBudWxsLCBzYWZlVGV4dChleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kgfHwgaGVhZGVyPy5jdXJyZW5jeUNvZGUpKSxcbiAgICBbZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LCBoZWFkZXI/LmN1cnJlbmN5Q29kZSwgaGVhZGVyPy50b3RhbEFtb3VudF1cbiAgKTtcbiAgY29uc3QgaGFzU3RhdHVzQWN0aW9uQ29udGVudCA9IGxpbmVzLmxlbmd0aCA+IDAgfHwgaGFzUG9zaXRpdmVUb3RhbEFtb3VudChoZWFkZXI/LnRvdGFsQW1vdW50KTtcclxuICBjb25zdCBhcmVTdGF0dXNBY3Rpb25zRGlzYWJsZWQgPSAhaGFzU3RhdHVzQWN0aW9uQ29udGVudDtcclxuICBjb25zdCBvd25lckRpc3BsYXkgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IG93bmVyVXNlcklkID0gc2FmZVRleHQoaGVhZGVyPy51c2VySWQpO1xyXG4gICAgY29uc3QgY3VycmVudFVzZXJJZCA9IHNhZmVUZXh0KGN1cnJlbnRDcm1Vc2VySWQpO1xyXG4gICAgaWYgKCFvd25lclVzZXJJZCB8fCAhY3VycmVudFVzZXJJZCB8fCBvd25lclVzZXJJZC50b1VwcGVyQ2FzZSgpID09PSBjdXJyZW50VXNlcklkLnRvVXBwZXJDYXNlKCkpIHtcclxuICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb3duZXJOYW1lID0gc2FmZVRleHQoaGVhZGVyPy51c2VyTmFtZSk7XHJcbiAgICByZXR1cm4gb3duZXJOYW1lID8gYCR7b3duZXJOYW1lfSAoJHtvd25lclVzZXJJZH0pYCA6IG93bmVyVXNlcklkO1xyXG4gIH0sIFtjdXJyZW50Q3JtVXNlcklkLCBoZWFkZXI/LnVzZXJJZCwgaGVhZGVyPy51c2VyTmFtZV0pO1xyXG5cclxuICBjb25zdCB7XHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVQcm9wYWdhdGVSZWltYnVyc2FibGVFeHBlbnNlVG9MaW5lcyxcclxuICAgIGhhbmRsZVByb3BhZ2F0ZVByb2plY3RJZFRvTGluZXMsXHJcbiAgICBoYW5kbGVTdGF0dXNUcmFuc2l0aW9uLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMoe1xyXG4gICAgYnVzeSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzRWRpdExvY2tlZDogaXNSZWFkT25seU1vZGUsXHJcbiAgICBpc0RlbGV0ZUxvY2tlZDogaXNTaGVldExvY2tlZCxcclxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgbG9ja2VkQ3VycmVuY3lDb2RlOiBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSksXHJcbiAgICBsb2NrZWRFeGNoYW5nZVJhdGU6IHNhZmVUZXh0KGhlYWRlcj8uZXhjaFJhdGUpLFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogY2FuQ3JlYXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxyXG4gICAgY2FuRWRpdEV4cGVuc2U6IGNhbkVkaXRBbnlDdXJyZW50LFxyXG4gICAgY2FuRGVsZXRlRXhwZW5zZTogY2FuRGVsZXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxyXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkczogY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICBjYW5UcmFuc2l0aW9uU3RhdHVzLFxyXG4gICAgc2hlZXRJZCxcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcclxuICAgIGRyYWZ0UHJvamVjdElkLFxyXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgIGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXM6IGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzLFxyXG4gICAgY3VycmVudExpbmVzOiBsaW5lcyxcclxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcclxuICAgIG9uQ3JlYXRlU3VjY2VzczogKGNyZWF0ZWRTaGVldElkKSA9PiB7XHJcbiAgICAgIGNyZWF0ZWRTaGVldElkUmVmLmN1cnJlbnQgPSBzYWZlVGV4dChjcmVhdGVkU2hlZXRJZCk7XHJcbiAgICB9LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgfSk7XHJcblxyXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBzZXRDb25maXJtZWRQcm9qZWN0SWQoc2FmZVRleHQocHJvamVjdFZhbHVlKSk7XHJcbiAgfSwgW2lzRWRpdGluZywgcHJvamVjdFZhbHVlXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmZpcm1Qcm9qZWN0UHJvcGFnYXRpb24gPSB1c2VDYWxsYmFjayhcclxuICAgIGFzeW5jIChuZXh0UHJvamVjdElkOiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3Qgc2FmZVByb2plY3RJZCA9IHNhZmVUZXh0KG5leHRQcm9qZWN0SWQpO1xyXG4gICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZVByb3BhZ2F0ZVByb2plY3RJZFRvTGluZXMoc2FmZVByb2plY3RJZCk7XHJcbiAgICAgIGlmIChvaykge1xyXG4gICAgICAgIHNldENvbmZpcm1lZFByb2plY3RJZChzYWZlUHJvamVjdElkKTtcclxuICAgICAgICBzZXREcmFmdFByb2plY3RJZChzYWZlUHJvamVjdElkKTtcclxuICAgICAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBvaztcclxuICAgIH0sXHJcbiAgICBbaGFuZGxlUHJvcGFnYXRlUHJvamVjdElkVG9MaW5lcywgc2V0RHJhZnRQcm9qZWN0SWQsIHNldElzRWRpdGluZ11cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVEcmFmdFByb2plY3RJZENvbW1pdCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3QgbmV4dFZhbHVlID0gc2FmZVRleHQodmFsdWUpO1xyXG4gICAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gc2FmZVRleHQoY29uZmlybWVkUHJvamVjdElkKTtcclxuICAgICAgaWYgKG5leHRWYWx1ZSA9PT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgIHNldERyYWZ0UHJvamVjdElkKG5leHRWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBzaG91bGRDb25maXJtUHJvcGFnYXRpb24gPVxyXG4gICAgICAgICFpc0NyZWF0ZU1vZGUgJiYgaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50ICYmIGxpbmVzLmxlbmd0aCA+IDA7XHJcblxyXG4gICAgICBpZiAoIXNob3VsZENvbmZpcm1Qcm9wYWdhdGlvbikge1xyXG4gICAgICAgIHNldERyYWZ0UHJvamVjdElkKG5leHRWYWx1ZSk7XHJcbiAgICAgICAgc2V0Q29uZmlybWVkUHJvamVjdElkKG5leHRWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYnVzeSB8fCBtb2RhbC5vcGVuKSB7XHJcbiAgICAgICAgc2V0RHJhZnRQcm9qZWN0SWQocHJldmlvdXNWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXREcmFmdFByb2plY3RJZChuZXh0VmFsdWUpO1xyXG4gICAgICBvcGVuQ29uZmlybSh7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9Qcm9wYWdhdGVQcm9qZWN0X1RpdGxlXCIsIFwiVXBkYXRlIGxpbmVzXCIpLFxyXG4gICAgICAgIG1lc3NhZ2U6IGluZFQoXHJcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1Byb3BhZ2F0ZVByb2plY3RfQm9keVwiLFxyXG4gICAgICAgICAgXCJUaGUgcHJvamVjdHMgb24gYWxsIGxpbmVzIHdpbGwgYmUgdXBkYXRlZC4gRG8geW91IHdhbnQgdG8gY29udGludWU/XCJcclxuICAgICAgICApLFxyXG4gICAgICAgIGNvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcclxuICAgICAgICBvbkNhbmNlbDogKCkgPT4ge1xyXG4gICAgICAgICAgc2V0RHJhZnRQcm9qZWN0SWQocHJldmlvdXNWYWx1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIHJldHVybiBoYW5kbGVDb25maXJtUHJvamVjdFByb3BhZ2F0aW9uKG5leHRWYWx1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBidXN5LFxyXG4gICAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgICAgY29uZmlybWVkUHJvamVjdElkLFxyXG4gICAgICBoYW5kbGVDb25maXJtUHJvamVjdFByb3BhZ2F0aW9uLFxyXG4gICAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICAgIGlzRWRpdGluZyxcclxuICAgICAgbGluZXMubGVuZ3RoLFxyXG4gICAgICBtb2RhbC5vcGVuLFxyXG4gICAgICBvcGVuQ29uZmlybSxcclxuICAgICAgc2V0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRHJhZnRSZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodmFsdWU6IG51bWJlcikgPT4ge1xyXG4gICAgICBjb25zdCBuZXh0VmFsdWUgPSBub3JtYWxpemVFeHBlbnNlUmVpbWJ1cnNhYmxlRXhwZW5zZSh2YWx1ZSk7XHJcbiAgICAgIGNvbnN0IHByZXZpb3VzVmFsdWUgPSBub3JtYWxpemVFeHBlbnNlUmVpbWJ1cnNhYmxlRXhwZW5zZShkcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UpO1xyXG4gICAgICBpZiAobmV4dFZhbHVlID09PSBwcmV2aW91c1ZhbHVlKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBzaG91bGRDb25maXJtUHJvcGFnYXRpb24gPVxyXG4gICAgICAgICFpc0NyZWF0ZU1vZGUgJiYgaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50ICYmIGxpbmVzLmxlbmd0aCA+IDA7XHJcblxyXG4gICAgICBpZiAoIXNob3VsZENvbmZpcm1Qcm9wYWdhdGlvbikge1xyXG4gICAgICAgIHNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZShuZXh0VmFsdWUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWwub3BlbikgcmV0dXJuO1xyXG5cclxuICAgICAgc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlKG5leHRWYWx1ZSk7XHJcbiAgICAgIG9wZW5Db25maXJtKHtcclxuICAgICAgICB0aXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1Byb3BhZ2F0ZVJlaW1idXJzYWJsZV9UaXRsZVwiLCBcIlVwZGF0ZSBsaW5lc1wiKSxcclxuICAgICAgICBtZXNzYWdlOiBpbmRUKFxyXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9Qcm9wYWdhdGVSZWltYnVyc2FibGVfQm9keVwiLFxyXG4gICAgICAgICAgXCJUaGUgcmVpbWJ1cnNhYmxlIGNoYW5nZSB3aWxsIGJlIHByb3BhZ2F0ZWQgdG8gZXZlcnkgZXhwZW5zZSBzaGVldCBsaW5lLiBEbyB5b3Ugd2FudCB0byBjb250aW51ZT9cIlxyXG4gICAgICAgICksXHJcbiAgICAgICAgY29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpLFxyXG4gICAgICAgIG9uQ2FuY2VsOiAoKSA9PiB7XHJcbiAgICAgICAgICBzZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UocHJldmlvdXNWYWx1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlUHJvcGFnYXRlUmVpbWJ1cnNhYmxlRXhwZW5zZVRvTGluZXMobmV4dFZhbHVlKTtcclxuICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gb2s7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBidXN5LFxyXG4gICAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgICAgZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgICBoYW5kbGVQcm9wYWdhdGVSZWltYnVyc2FibGVFeHBlbnNlVG9MaW5lcyxcclxuICAgICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgICBpc0VkaXRpbmcsXHJcbiAgICAgIGxpbmVzLmxlbmd0aCxcclxuICAgICAgbW9kYWwub3BlbixcclxuICAgICAgb3BlbkNvbmZpcm0sXHJcbiAgICAgIHNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhc1BlbmRpbmdQcm9qZWN0UHJvcGFnYXRpb24gPVxyXG4gICAgIWlzQ3JlYXRlTW9kZSAmJlxyXG4gICAgaXNFZGl0aW5nICYmXHJcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCAmJlxyXG4gICAgbGluZXMubGVuZ3RoID4gMCAmJlxyXG4gICAgc2FmZVRleHQoZHJhZnRQcm9qZWN0SWQpICE9PSBzYWZlVGV4dChjb25maXJtZWRQcm9qZWN0SWQpO1xyXG5cclxuICBjb25zdCBoYW5kbGVQZW5kaW5nUHJvamVjdFByb3BhZ2F0aW9uQ2FuY2VsID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFoYXNQZW5kaW5nUHJvamVjdFByb3BhZ2F0aW9uKSByZXR1cm47XHJcbiAgICBzZXREcmFmdFByb2plY3RJZChzYWZlVGV4dChjb25maXJtZWRQcm9qZWN0SWQpKTtcclxuICB9LCBbY29uZmlybWVkUHJvamVjdElkLCBoYXNQZW5kaW5nUHJvamVjdFByb3BhZ2F0aW9uLCBzZXREcmFmdFByb2plY3RJZF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVVcGRhdGVXaXRoUHJvamVjdFByb3BhZ2F0aW9uID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGhhc1BlbmRpbmdQcm9qZWN0UHJvcGFnYXRpb24pIHtcclxuICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVDb25maXJtUHJvamVjdFByb3BhZ2F0aW9uKGRyYWZ0UHJvamVjdElkKTtcclxuICAgICAgaWYgKCFvaykgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBoYW5kbGVVcGRhdGUoKTtcclxuICB9LCBbZHJhZnRQcm9qZWN0SWQsIGhhbmRsZUNvbmZpcm1Qcm9qZWN0UHJvcGFnYXRpb24sIGhhbmRsZVVwZGF0ZSwgaGFzUGVuZGluZ1Byb2plY3RQcm9wYWdhdGlvbl0pO1xyXG5cclxuICBjb25zdCBwcm9qZWN0UHJvcGFnYXRpb25TYXZlVGl0bGUgPSBoYXNQZW5kaW5nUHJvamVjdFByb3BhZ2F0aW9uXHJcbiAgICA/IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9Qcm9wYWdhdGVQcm9qZWN0X1RpdGxlXCIsIFwiVXBkYXRlIGxpbmVzXCIpXHJcbiAgICA6IHVuZGVmaW5lZDtcclxuICBjb25zdCBwcm9qZWN0UHJvcGFnYXRpb25TYXZlTWVzc2FnZSA9IGhhc1BlbmRpbmdQcm9qZWN0UHJvcGFnYXRpb25cclxuICAgID8gaW5kVChcclxuICAgICAgICBcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1Byb3BhZ2F0ZVByb2plY3RfQm9keVwiLFxyXG4gICAgICAgIFwiVGhlIHByb2plY3RzIG9uIGFsbCBsaW5lcyB3aWxsIGJlIHVwZGF0ZWQuIERvIHlvdSB3YW50IHRvIGNvbnRpbnVlP1wiXHJcbiAgICAgIClcclxuICAgIDogdW5kZWZpbmVkO1xyXG4gIGNvbnN0IHByb2plY3RQcm9wYWdhdGlvblNhdmVDb25maXJtVGV4dCA9IGhhc1BlbmRpbmdQcm9qZWN0UHJvcGFnYXRpb24gPyBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSA6IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkxpbmVEZXRhaWwgPSB1c2VDYWxsYmFjayhcclxuICAgIGFzeW5jIChsaW5lUmVjSWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICBjb25zdCBzYWZlTGluZUlkID0gc2FmZVRleHQobGluZVJlY0lkKTtcclxuICAgICAgaWYgKCFzYWZlTGluZUlkIHx8IGJ1c3kgfHwgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50KSB7XHJcbiAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVVcGRhdGVXaXRoUHJvamVjdFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgaWYgKCFvaykge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmF2aWdhdGVUb0xpbmVEZXRhaWwoc2FmZUxpbmVJZCwge1xyXG4gICAgICAgICAgbW9kZTogXCJlZGl0XCIsXHJcbiAgICAgICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxyXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbmF2aWdhdGVUb0xpbmVEZXRhaWwoc2FmZUxpbmVJZCk7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBidXN5LFxyXG4gICAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgICAgaGFuZGxlVXBkYXRlV2l0aFByb2plY3RQcm9wYWdhdGlvbixcclxuICAgICAgaXNFZGl0aW5nLFxyXG4gICAgICBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXHJcbiAgICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNhdmVTdWNjZXNzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICBjb25zdCBjcmVhdGVkU2hlZXRJZCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldElkUmVmLmN1cnJlbnQpO1xyXG4gICAgICBpZiAoIWNyZWF0ZWRTaGVldElkKSByZXR1cm47XHJcbiAgICAgIHNhdmVFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCh7XG4gICAgICAgIHNoZWV0SWQ6IGNyZWF0ZWRTaGVldElkLFxuICAgICAgfSk7XG4gICAgICBjbGVhckV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUoKTtcbiAgICAgIHNldElzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSh0cnVlKTtcbiAgICAgIG5hdmlnYXRlVG9DcmVhdGVkU2hlZXQoY3JlYXRlZFNoZWV0SWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cclxuXHJcbiAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xyXG4gIH0sIFtpc0NyZWF0ZU1vZGUsIG5hdmlnYXRlVG9DcmVhdGVkU2hlZXRdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU3RhdHVzQWN0aW9uQ2xpY2sgPSB1c2VDYWxsYmFjayhcclxuICAgIChhY3Rpb246IHsgbGFiZWxLZXk6IHN0cmluZzsgZmFsbGJhY2s6IHN0cmluZzsgbmV4dFN0YXR1czogbnVtYmVyIH0pID0+IHtcclxuICAgICAgaWYgKCFoYXNTdGF0dXNBY3Rpb25Db250ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBhY3Rpb25MYWJlbCA9IGluZFQoYWN0aW9uLmxhYmVsS2V5LCBhY3Rpb24uZmFsbGJhY2spO1xyXG4gICAgICBjb25zdCBjdXJyZW50U3RhdHVzTGFiZWwgPVxyXG4gICAgICAgIGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSBudWxsIHx8IGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWRcclxuICAgICAgICAgID8gaW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpXHJcbiAgICAgICAgICA6IGdldEV4cGVuc2VTdGF0dXNMYWJlbChoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzKTtcclxuICAgICAgY29uc3QgbmV4dFN0YXR1c0xhYmVsID0gZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGFjdGlvbi5uZXh0U3RhdHVzKTtcclxuICAgICAgY29uc3QgdHJhbnNpdGlvbk1lc3NhZ2UgPSBpbmRGb3JtYXQoXHJcbiAgICAgICAgXCJFeHBlbnNlU2hlZXRzX0JvdHRvbUFjdGlvbnNfQ29uZmlybVRyYW5zaXRpb25cIixcclxuICAgICAgICBcIkN1cnJlbnQgc3RhdHVzOiB7MH1cXG5OZXcgc3RhdHVzOiB7MX1cXG5cXG5EbyB5b3Ugd2FudCB0byB1cGRhdGUgdGhlIGV4cGVuc2Ugc2hlZXQgc3RhdHVzP1wiLFxyXG4gICAgICAgIGN1cnJlbnRTdGF0dXNMYWJlbCxcclxuICAgICAgICBuZXh0U3RhdHVzTGFiZWxcclxuICAgICAgKS5yZXBsYWNlKC9cXFxcbi9nLCBcIlxcblwiKTtcclxuICAgICAgY29uc3QgaW5pdGlhbENvbW1lbnQgPSBzYWZlVGV4dChoZWFkZXI/LmVzdGFkb0NvbWVudGFyaW9zKTtcclxuICAgICAgc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRSZWYuY3VycmVudCA9IGluaXRpYWxDb21tZW50O1xyXG4gICAgICBzZXRTdGF0dXNUcmFuc2l0aW9uQ29tbWVudChpbml0aWFsQ29tbWVudCk7XHJcbiAgICAgIHNldFNob3dTdGF0dXNUcmFuc2l0aW9uQ29tbWVudEZpZWxkKHRydWUpO1xyXG5cclxuICAgICAgb3BlbkNvbmZpcm0oe1xyXG4gICAgICAgIHRpdGxlOiBhY3Rpb25MYWJlbCxcclxuICAgICAgICBtZXNzYWdlOiB0cmFuc2l0aW9uTWVzc2FnZSxcclxuICAgICAgICBjb25maXJtVGV4dDogYWN0aW9uTGFiZWwsXHJcbiAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZVN0YXR1c1RyYW5zaXRpb24oXHJcbiAgICAgICAgICAgIGFjdGlvbi5uZXh0U3RhdHVzLFxyXG4gICAgICAgICAgICBhY3Rpb25MYWJlbCxcclxuICAgICAgICAgICAgc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRSZWYuY3VycmVudFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICBpbnZhbGlkYXRlQ2FjaGVkTGlzdEZvclJlZmV0Y2goKTtcclxuICAgICAgICAgICAgcmVzZXRTdGF0dXNUcmFuc2l0aW9uRGlhbG9nKCk7XHJcbiAgICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICAgICAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgY2xvc2VDb25maXJtLFxyXG4gICAgICBoYW5kbGVTdGF0dXNUcmFuc2l0aW9uLFxyXG4gICAgICBoYXNTdGF0dXNBY3Rpb25Db250ZW50LFxyXG4gICAgICBoZWFkZXI/LmVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgICBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyxcclxuICAgICAgaW52YWxpZGF0ZUNhY2hlZExpc3RGb3JSZWZldGNoLFxyXG4gICAgICBvcGVuQ29uZmlybSxcclxuICAgICAgcmVzZXRTdGF0dXNUcmFuc2l0aW9uRGlhbG9nLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIHVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMoe1xyXG4gICAgYnVzeTogYnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXHJcbiAgICBtb2RhbE9wZW46IG1vZGFsLm9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBhY3Rpb25Nb2RlOiB0b3BiYXJBY3Rpb25Nb2RlLFxyXG4gICAgaXNMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXHJcbiAgICBpc0VkaXRMb2NrZWQ6IGlzUmVhZE9ubHlNb2RlLFxyXG4gICAgaXNEZWxldGVMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5OiBkZXRhaWxQZXJtaXNzaW9uc1JlYWR5LFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogY2FuQ3JlYXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxyXG4gICAgY2FuRWRpdEV4cGVuc2U6IGNhbkVkaXRBbnlDdXJyZW50LFxyXG4gICAgY2FuRGVsZXRlRXhwZW5zZTogY2FuRGVsZXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlVXBkYXRlOiBoYW5kbGVVcGRhdGVXaXRoUHJvamVjdFByb3BhZ2F0aW9uLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgb25TYXZlU3VjY2VzczogaGFuZGxlU2F2ZVN1Y2Nlc3MsXHJcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgaW52YWxpZGF0ZUNhY2hlZExpc3RGb3JSZWZldGNoKCk7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCIpO1xyXG4gICAgfSxcclxuICAgIHNhdmVDb25maXJtVGl0bGU6IHByb2plY3RQcm9wYWdhdGlvblNhdmVUaXRsZSxcclxuICAgIHNhdmVDb25maXJtTWVzc2FnZTogcHJvamVjdFByb3BhZ2F0aW9uU2F2ZU1lc3NhZ2UsXHJcbiAgICBzYXZlQ29uZmlybVRleHQ6IHByb2plY3RQcm9wYWdhdGlvblNhdmVDb25maXJtVGV4dCxcclxuICAgIHNhdmVDb25maXJtT25DYW5jZWw6IGhhbmRsZVBlbmRpbmdQcm9qZWN0UHJvcGFnYXRpb25DYW5jZWwsXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgPSB1c2VDYWxsYmFjaygodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcclxuICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XHJcbiAgICBjb25zdCBjYXJkID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XHJcbiAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xyXG4gICAgaWYgKCFsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiBjYXJkO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyh7XHJcbiAgICBjb250YWluZXJSZWY6IGxpbmVDb250YWluZXJSZWYsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBpdGVtczogdmlzaWJsZUxpbmVzLFxyXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHF1aWNrVGlja2V0RmxvdyA9IHVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdyh7XHJcbiAgICBzaGVldElkOiBzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZCB8fCBzaGVldElkKSxcclxuICAgIHByb2plY3RJZDogcHJvamVjdFZhbHVlLFxyXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSksXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiAhaXNDcmVhdGVNb2RlICYmIGRldGFpbFBvbGljeS5zaG93RmFiLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNTaGVldExvY2tlZDogIWNhblVzZUZ1bGxFZGl0RmVhdHVyZXMsXHJcbiAgICBsaW5rVG9TaGVldDogZmFsc2UsXHJcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICAgIG9uQ29tcGxldGVkOiAocmVzdWx0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNyZWF0ZWRGaWxlSWQgPSBzYWZlVGV4dChyZXN1bHQ/LmZpbGVJZCk7XHJcbiAgICAgIGlmICghY3JlYXRlZEZpbGVJZCkge1xyXG4gICAgICAgIHJlbG9hZEV4cGVuc2VQYWdlKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocmVzdWx0Py5saW5rZWRUb1NoZWV0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmVsb2FkRXhwZW5zZVBhZ2UoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGN1cnJlbnRTaGVldElkID0gc2FmZVRleHQoaGVhZGVyPy5ob2phR2FzdG9zSWQgfHwgc2hlZXRJZCk7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgICAgZmlsZUlkOiBjcmVhdGVkRmlsZUlkLFxyXG4gICAgICAgIG1vZGU6IFwiZWRpdFwiLFxyXG4gICAgICAgIG9yaWdpbjogXCJzaGVldC1jcmVhdGVcIixcclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChjdXJyZW50U2hlZXRJZCkge1xyXG4gICAgICAgIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCh7XHJcbiAgICAgICAgICBmaWxlSWQ6IGNyZWF0ZWRGaWxlSWQsXHJcbiAgICAgICAgICBvcmlnaW46IFwic2hlZXQtY3JlYXRlXCIsXHJcbiAgICAgICAgICBzaGVldElkOiBjdXJyZW50U2hlZXRJZCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBxdWVyeS5zZXQoXCJzaGVldElkXCIsIGN1cnJlbnRTaGVldElkKTtcclxuICAgICAgfVxyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWApO1xyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZmFiTWVudUl0ZW1zID0gdXNlTWVtbzxGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW10+KFxyXG4gICAgKCkgPT4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IFwibmV3LXRpY2tldFwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfTmV3VGlja2V0XCIsIFwiTnVldm8gVGlja2V0XCIpLFxyXG4gICAgICAgIGljb246IDxOZXdUaWNrZXRJY29uIC8+LFxyXG4gICAgICAgIG9uQ2xpY2s6IHF1aWNrVGlja2V0Rmxvdy5vcGVuU291cmNlUGlja2VyLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IFwibGluay10aWNrZXRcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0xpbmtUaWNrZXRcIiwgXCJWaW5jdWxhciBUaWNrZXRcIiksXHJcbiAgICAgICAgaWNvbjogPExpbmtUaWNrZXRJY29uIC8+LFxyXG4gICAgICAgIG9uQ2xpY2s6IGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiBcIm5ldy1saW5lXCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9OZXdMaW5lXCIsIFwiTnVldmEgTGluZWFcIiksXHJcbiAgICAgICAgaWNvbjogPE5ld0xpbmVJY29uIC8+LFxyXG4gICAgICAgIG9uQ2xpY2s6IGhhbmRsZU9wZW5DcmVhdGVMaW5lTW9kZSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgICBbaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLCBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUsIHF1aWNrVGlja2V0Rmxvdy5vcGVuU291cmNlUGlja2VyXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNob3dTdGF0dXNBY3Rpb25CYXIgPVxyXG4gICAgIWlzQ3JlYXRlTW9kZSAmJiAhaXNMb2FkaW5nICYmICFpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgJiYgIWVycm9yTWVzc2FnZSAmJiBkZXRhaWxQb2xpY3kuc3RhdHVzQWN0aW9ucy5sZW5ndGggPiAwO1xyXG4gIGNvbnN0IHNob3dGYWIgPSAhaXNDcmVhdGVNb2RlICYmIGRldGFpbFBvbGljeS5zaG93RmFiO1xyXG4gIGNvbnN0IGhhc1Zpc2libGVTdGF0dXNDb21tZW50ID0gc2FmZVRleHQoaGVhZGVyPy5lc3RhZG9Db21lbnRhcmlvcykudHJpbSgpLmxlbmd0aCA+IDA7XHJcbiAgY29uc3Qgc3RhdHVzQ29tbWVudE1vZGU6IFwiaGlkZGVuXCIgfCBcInJlYWRcIiA9IGhhc1Zpc2libGVTdGF0dXNDb21tZW50ID8gXCJyZWFkXCIgOiBcImhpZGRlblwiO1xyXG4gIGNvbnN0IG1vZGFsQm9keSA9IHNob3dTdGF0dXNUcmFuc2l0aW9uQ29tbWVudEZpZWxkID8gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxyXG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+XHJcbiAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1N0YXR1c0NvbW1lbnRcIiwgXCJTdGF0dXMgY29tbWVudFwiKX1cclxuICAgICAgPC9sYWJlbD5cclxuICAgICAgPHRleHRhcmVhXHJcbiAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIHJlc2l6ZS1ub25lXCJcclxuICAgICAgICByb3dzPXszfVxyXG4gICAgICAgIHZhbHVlPXtzdGF0dXNUcmFuc2l0aW9uQ29tbWVudH1cclxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBuZXh0VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIjtcclxuICAgICAgICAgIHN0YXR1c1RyYW5zaXRpb25Db21tZW50UmVmLmN1cnJlbnQgPSBuZXh0VmFsdWU7XHJcbiAgICAgICAgICBzZXRTdGF0dXNUcmFuc2l0aW9uQ29tbWVudChuZXh0VmFsdWUpO1xyXG4gICAgICAgIH19XHJcbiAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzQ29tbWVudFwiLCBcIlN0YXR1cyBjb21tZW50XCIpfVxyXG4gICAgICAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKSA6IG51bGw7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzaGVldElkLFxyXG4gICAgaGVhZGVyLFxyXG4gICAgdmlzaWJsZUxpbmVzLFxyXG4gICAgbGluZVBhZ2UsXHJcbiAgICB0b3RhbExpbmVQYWdlcyxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGJ1c3ksXHJcbiAgICBzdGF0dXMsXHJcbiAgICBtb2RhbEVycm9yLFxyXG4gICAgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLFxyXG4gICAgbW9kYWwsXHJcbiAgICBtb2RhbExvYWRpbmdUZXh0LFxyXG4gICAgbW9kYWxDYW5jZWxUZXh0LFxyXG4gICAgbW9kYWxDb25maXJtVGV4dCxcclxuICAgIG1vZGFsQm9keSxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyxcclxuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50LFxyXG4gICAgY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyxcclxuICAgIHNob3dTdGF0dXNBY3Rpb25CYXIsXHJcbiAgICBzaG93RmFiLFxyXG4gICAgYXJlU3RhdHVzQWN0aW9uc0Rpc2FibGVkLFxyXG4gICAgZmFiTWVudUl0ZW1zLFxyXG4gICAgcGFnaW5hdGlvbkxhYmVscyxcclxuICAgIHRvdGFsQW1vdW50VGV4dCxcclxuICAgIHN0YXR1c0NvbW1lbnRNb2RlLFxyXG4gICAgb3duZXJEaXNwbGF5LFxyXG4gICAgcHJvamVjdFZhbHVlLFxyXG4gICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXHJcbiAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXHJcbiAgICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQsXHJcbiAgICBzaG93RXhjaGFuZ2VSYXRlLFxyXG4gICAgZXhjaGFuZ2VSYXRlVmFsdWUsXHJcbiAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSxcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdFByb2plY3RJZCxcclxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBkcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbiAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlLFxyXG4gICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXHJcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXHJcbiAgICBkZXRhaWxQb2xpY3ksXHJcbiAgICBsaW5lQ29udGFpbmVyUmVmLFxyXG4gICAgY2FtZXJhSW5wdXRSZWYsXHJcbiAgICBnYWxsZXJ5SW5wdXRSZWYsXHJcbiAgICBxdWlja1RpY2tldEZsb3csXHJcbiAgICBzZXRMaW5lUGFnZSxcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBzZXREcmFmdFByb2plY3RJZCxcclxuICAgIGNvbW1pdERyYWZ0UHJvamVjdElkOiBoYW5kbGVEcmFmdFByb2plY3RJZENvbW1pdCxcclxuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBzZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2U6IGhhbmRsZURyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZSxcclxuICAgIHNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICBuYXZpZ2F0ZVRvTGluZURldGFpbDogaGFuZGxlT3BlbkxpbmVEZXRhaWwsXHJcbiAgICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgICBoYW5kbGVTdGF0dXNBY3Rpb25DbGljayxcclxuICAgIGNsb3NlQ29uZmlybTogaGFuZGxlQ2FuY2VsQ29uZmlybSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHtcbiAgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LFxuICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LFxuICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksXG59IGZyb20gXCIuLi8uLi8uLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlU2NvcGVUb2tlbiB9IGZyb20gXCIuL2V4cGVuc2VTY29wZS50c1wiO1xuXG5jb25zdCBFWFBFTlNFX1NIRUVUX0NSRUFURURfUkVUVVJOX0NPTlRFWFRfS0VZX1BSRUZJWCA9IFwiZXhwZW5zZV9zaGVldF9jcmVhdGVkX3JldHVybl9jb250ZXh0X3YxXCI7XG5jb25zdCBFWFBFTlNFX1NIRUVUX0NSRUFURURfUkVUVVJOX0NPTlRFWFRfVFRMX01TID0gMiAqIDYwICogNjAgKiAxMDAwO1xuXG5leHBvcnQgdHlwZSBFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCA9IHtcbiAgc2hlZXRJZDogc3RyaW5nO1xufTtcblxuY29uc3QgZ2V0U2NvcGVkS2V5ID0gKCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBgJHtFWFBFTlNFX1NIRUVUX0NSRUFURURfUkVUVVJOX0NPTlRFWFRfS0VZX1BSRUZJWH1fJHtnZXRFeHBlbnNlU2NvcGVUb2tlbigpfWA7XG59O1xuXG4vLyBOb3JtYWxpemVzIHRoZSBjcmVhdGVkLXNoZWV0IHJldHVybiBwYXlsb2FkIHVzZWQgYmV0d2VlbiBjcmVhdGUgYW5kIGRldGFpbCBmbG93cy5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCA9IChcbiAgdmFsdWU6IHVua25vd25cbik6IEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0IHwgbnVsbCA9PiB7XG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBwYXlsb2FkID0gdmFsdWUgYXMgUGFydGlhbDxFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dD47XG4gIGNvbnN0IHNoZWV0SWQgPSBzYWZlVGV4dChwYXlsb2FkLnNoZWV0SWQpO1xuICBpZiAoIXNoZWV0SWQpIHJldHVybiBudWxsO1xuXG4gIHJldHVybiB7XG4gICAgc2hlZXRJZCxcbiAgfTtcbn07XG5cbi8vIFJlYWRzIHRoZSBzdG9yZWQgY3JlYXRlZC1zaGVldCByZXR1cm4gY29udGV4dCBmb3IgdGhlIGFjdGl2ZSBleHBlbnNlIHNjb3BlLlxuZXhwb3J0IGNvbnN0IHJlYWRFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCA9IChcbiAgc2hlZXRJZD86IHVua25vd25cbik6IEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0IHwgbnVsbCA9PiB7XG4gIGNvbnN0IHN0b3JlZCA9IG5vcm1hbGl6ZUV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0KFxuICAgIGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeTxFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dD4oZ2V0U2NvcGVkS2V5KCkpXG4gICk7XG4gIGlmICghc3RvcmVkKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHNoZWV0SWQpO1xuICBpZiAoIXNhZmVTaGVldElkKSByZXR1cm4gc3RvcmVkO1xuICByZXR1cm4gc3RvcmVkLnNoZWV0SWQudG9VcHBlckNhc2UoKSA9PT0gc2FmZVNoZWV0SWQudG9VcHBlckNhc2UoKSA/IHN0b3JlZCA6IG51bGw7XG59O1xuXG4vLyBDbGVhcnMgdGhlIGNyZWF0ZWQtc2hlZXQgcmV0dXJuIGNvbnRleHQgZm9yIHRoZSBhY3RpdmUgZXhwZW5zZSBzY29wZS5cbmV4cG9ydCBjb25zdCBjbGVhckV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0ID0gKCk6IHZvaWQgPT4ge1xuICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGdldFNjb3BlZEtleSgpKTtcbn07XG5cbi8vIFBlcnNpc3RzIHRoZSBjcmVhdGVkLXNoZWV0IGNvbnRleHQgc28gdGhlIG5leHQgZGV0YWlsIHBhZ2UgY2FuIGFybSB0aGUgbGlzdCByZXR1cm4gc3RhdGUuXG5leHBvcnQgY29uc3Qgc2F2ZUV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0ID0gKFxuICB2YWx1ZTogRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQgfCBudWxsIHwgdW5kZWZpbmVkXG4pOiBFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCB8IG51bGwgPT4ge1xuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQodmFsdWUpO1xuICBpZiAoIW5vcm1hbGl6ZWQpIHtcbiAgICBjbGVhckV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0KCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkoZ2V0U2NvcGVkS2V5KCksIG5vcm1hbGl6ZWQsIEVYUEVOU0VfU0hFRVRfQ1JFQVRFRF9SRVRVUk5fQ09OVEVYVF9UVExfTVMpO1xuICByZXR1cm4gbm9ybWFsaXplZDtcbn07XG5cbi8vIENvbnN1bWVzIHRoZSBjcmVhdGVkLXNoZWV0IGNvbnRleHQgb25jZSB0aGUgbWF0Y2hpbmcgZGV0YWlsIHBhZ2UgaXMgbG9hZGVkLlxuZXhwb3J0IGNvbnN0IGNvbnN1bWVFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCA9IChcbiAgc2hlZXRJZD86IHVua25vd25cbik6IEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0IHwgbnVsbCA9PiB7XG4gIGNvbnN0IHN0b3JlZCA9IHJlYWRFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dChzaGVldElkKTtcbiAgaWYgKCFzdG9yZWQpIHJldHVybiBudWxsO1xuXG4gIGNsZWFyRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQoKTtcbiAgcmV0dXJuIHN0b3JlZDtcbn07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldEhlYWRlclVwZGF0ZVJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0TGluZSxcclxuICBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVxdWVzdCxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VHYXN0b1R5cGVDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgbm9ybWFsaXplRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gIG5vcm1hbGl6ZUV4cGVuc2VSZWltYnVyc2FibGVFeHBlbnNlLFxyXG59IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2VDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24gfSBmcm9tIFwiLi4vaG9va3MvZXhwZW5zZU11dGF0aW9uVXRpbHMudHNcIjtcclxuaW1wb3J0IHtcclxuICBjcmVhdGVFeHBlbnNlU2hlZXQsXHJcbiAgZGVsZXRlRXhwZW5zZVNoZWV0LFxyXG4gIHVwZGF0ZUV4cGVuc2VTaGVldExpbmUsXHJcbiAgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyLFxyXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIGlzRWRpdExvY2tlZDogYm9vbGVhbjtcclxuICBpc0RlbGV0ZUxvY2tlZDogYm9vbGVhbjtcclxuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcclxuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XHJcbiAgbG9ja2VkQ3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgbG9ja2VkRXhjaGFuZ2VSYXRlOiBzdHJpbmc7XHJcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBjYW5FZGl0RXhwZW5zZTogYm9vbGVhbjtcclxuICBjYW5EZWxldGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGJvb2xlYW47XHJcbiAgY2FuVHJhbnNpdGlvblN0YXR1czogYm9vbGVhbjtcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcclxuICBkcmFmdFJlaW1idXJzYWJsZUV4cGVuc2U6IG51bWJlciB8IG51bGw7XHJcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZTogc3RyaW5nO1xyXG4gIGRyYWZ0UHJvamVjdElkOiBzdHJpbmc7XHJcbiAgZHJhZnRFc3RhZG9Db21lbnRhcmlvczogc3RyaW5nO1xyXG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeTogc3RyaW5nO1xyXG4gIGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXM/OiBudW1iZXIgfCBudWxsO1xyXG4gIGN1cnJlbnRMaW5lczogRXhwZW5zZVNoZWV0TGluZVtdO1xyXG4gIG9uQ3JlYXRlU3VjY2VzczogKGNyZWF0ZWRTaGVldElkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0QnVzeTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbn07XHJcblxyXG5jb25zdCB0b0Zpbml0ZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IHRvUG9zaXRpdmVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSB0b0Zpbml0ZU51bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIHBhcnNlZCAhPSBudWxsICYmIHBhcnNlZCA+IDAgPyBwYXJzZWQgOiBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRMaW5lVXBkYXRlUGF5bG9hZCA9IChcclxuICBsaW5lOiBFeHBlbnNlU2hlZXRMaW5lLFxyXG4gIHByb2plY3RJZDogc3RyaW5nLFxyXG4gIHJlaW1idXJzYWJsZUV4cGVuc2U6IG51bWJlclxyXG4pOiBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVxdWVzdCA9PiB7XHJcbiAgY29uc3QgdHlwZVZhbHVlID0gdG9FeHBlbnNlR2FzdG9UeXBlQ29kZShsaW5lLnR5cGVWYWx1ZUNvZGUgfHwgbGluZS50eXBlVmFsdWUsIHsgYWxsb3dOb25lOiBmYWxzZSB9KTtcclxuICBjb25zdCByYXdRdHkgPSB0b1Bvc2l0aXZlTnVtYmVyKGxpbmUucXR5KTtcclxuICBjb25zdCByYXdQcmljZSA9IHRvUG9zaXRpdmVOdW1iZXIobGluZS5wcmljZSk7XHJcbiAgY29uc3QgcmF3QW1vdW50ID0gdG9Qb3NpdGl2ZU51bWJlcihsaW5lLmFtb3VudCk7XHJcbiAgY29uc3QgcXR5ID0gcmF3UXR5ID8/IChyYXdBbW91bnQgIT0gbnVsbCA/IDEgOiAwKTtcclxuICBjb25zdCBwcmljZSA9IHJhd1ByaWNlID8/IChyYXdBbW91bnQgIT0gbnVsbCAmJiBxdHkgPiAwID8gcmF3QW1vdW50IC8gcXR5IDogMCk7XHJcbiAgY29uc3QgdHJhbnNEYXRlID0gc2FmZVRleHQobGluZS50cmFuc0RhdGUpO1xyXG5cclxuICBpZiAoIXRyYW5zRGF0ZSB8fCB0eXBlVmFsdWUgPT09IG51bGwgfHwgIShxdHkgPiAwKSB8fCAhKHByaWNlID4gMCkpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHRyYW5zRGF0ZSxcclxuICAgIHR5cGVWYWx1ZSxcclxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChsaW5lLmRlc2NyaXB0aW9uKSxcclxuICAgIGludGVybmFjaW9uYWw6IGxpbmUuaW50ZXJuYWNpb25hbCA9PT0gdHJ1ZSxcclxuICAgIGZpbGVJZDogc2FmZVRleHQobGluZS5maWxlSWQpIHx8IHVuZGVmaW5lZCxcclxuICAgIHRpY2tldDogbGluZS50aWNrZXQgPT09IHRydWUsXHJcbiAgICBxdHksXHJcbiAgICBwcmljZSxcclxuICAgIHByb2pJZDogc2FmZVRleHQocHJvamVjdElkKSB8fCB1bmRlZmluZWQsXHJcbiAgICByZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChsaW5lLmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSB8fCB1bmRlZmluZWQsXHJcbiAgICBhbW91bnRNU1Q6IHRvRmluaXRlTnVtYmVyKGxpbmUuYW1vdW50TVNUKSxcclxuICAgIGV4Y2hSYXRlOiB0b0Zpbml0ZU51bWJlcihsaW5lLmV4Y2hSYXRlKSxcclxuICAgIGluZEF0dGFjaEZpbGVzOiBzYWZlVGV4dChsaW5lLmluZEF0dGFjaEZpbGVzKSB8fCB1bmRlZmluZWQsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkUmVpbWJ1cnNhYmxlTGluZVVwZGF0ZVBheWxvYWQgPSAoXHJcbiAgbGluZTogRXhwZW5zZVNoZWV0TGluZSxcclxuICByZWltYnVyc2FibGVFeHBlbnNlOiBudW1iZXJcclxuKTogRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlcXVlc3QgPT4ge1xyXG4gIHJldHVybiBidWlsZExpbmVVcGRhdGVQYXlsb2FkKGxpbmUsIHNhZmVUZXh0KGxpbmUucHJvaklkKSwgcmVpbWJ1cnNhYmxlRXhwZW5zZSk7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZFByb2plY3RMaW5lVXBkYXRlUGF5bG9hZCA9IChcclxuICBsaW5lOiBFeHBlbnNlU2hlZXRMaW5lLFxyXG4gIHByb2plY3RJZDogc3RyaW5nXHJcbik6IEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0ID0+IHtcclxuICByZXR1cm4gYnVpbGRMaW5lVXBkYXRlUGF5bG9hZChcclxuICAgIGxpbmUsXHJcbiAgICBwcm9qZWN0SWQsXHJcbiAgICBub3JtYWxpemVFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2UobGluZS5yZWltYnVyc2FibGVFeHBlbnNlKVxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCB1cGRhdGVSZWltYnVyc2FibGVFeHBlbnNlT25MaW5lcyA9IGFzeW5jIChcclxuICBzaGVldElkOiBzdHJpbmcsXHJcbiAgbGluZXM6IEV4cGVuc2VTaGVldExpbmVbXSxcclxuICByZWltYnVyc2FibGVFeHBlbnNlOiBudW1iZXJcclxuKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChzaGVldElkKTtcclxuICBpZiAoIXNhZmVTaGVldElkIHx8IGxpbmVzLmxlbmd0aCA8IDEpIHJldHVybjtcclxuXHJcbiAgY29uc3QgbmV4dExpbmVSZWltYnVyc2FibGVFeHBlbnNlID0gbm9ybWFsaXplRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlKHJlaW1idXJzYWJsZUV4cGVuc2UpO1xyXG4gIGNvbnN0IHVwZGF0ZXMgPSBsaW5lcy5tYXAoKGxpbmUpID0+IHtcclxuICAgIGNvbnN0IGxpbmVSZWNJZCA9IHNhZmVUZXh0KGxpbmUubGluZVJlY0lkKTtcclxuICAgIGlmICghbGluZVJlY0lkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxpbmVSZWNJZCxcclxuICAgICAgcGF5bG9hZDogYnVpbGRSZWltYnVyc2FibGVMaW5lVXBkYXRlUGF5bG9hZChsaW5lLCBuZXh0TGluZVJlaW1idXJzYWJsZUV4cGVuc2UpLFxyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgYXdhaXQgUHJvbWlzZS5hbGwoXHJcbiAgICB1cGRhdGVzLm1hcChhc3luYyAoeyBsaW5lUmVjSWQsIHBheWxvYWQgfSkgPT4ge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHVwZGF0ZUV4cGVuc2VTaGVldExpbmUoc2FmZVNoZWV0SWQsIGxpbmVSZWNJZCwgcGF5bG9hZCwge1xyXG4gICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgKTtcclxufTtcclxuXHJcbmNvbnN0IHVwZGF0ZVByb2plY3RJZE9uTGluZXMgPSBhc3luYyAoXHJcbiAgc2hlZXRJZDogc3RyaW5nLFxyXG4gIGxpbmVzOiBFeHBlbnNlU2hlZXRMaW5lW10sXHJcbiAgcHJvamVjdElkOiBzdHJpbmdcclxuKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChzaGVldElkKTtcclxuICBpZiAoIXNhZmVTaGVldElkIHx8IGxpbmVzLmxlbmd0aCA8IDEpIHJldHVybjtcclxuXHJcbiAgY29uc3Qgc2FmZVByb2plY3RJZCA9IHNhZmVUZXh0KHByb2plY3RJZCk7XHJcbiAgY29uc3QgdXBkYXRlcyA9IGxpbmVzLm1hcCgobGluZSkgPT4ge1xyXG4gICAgY29uc3QgbGluZVJlY0lkID0gc2FmZVRleHQobGluZS5saW5lUmVjSWQpO1xyXG4gICAgaWYgKCFsaW5lUmVjSWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbGluZVJlY0lkLFxyXG4gICAgICBwYXlsb2FkOiBidWlsZFByb2plY3RMaW5lVXBkYXRlUGF5bG9hZChsaW5lLCBzYWZlUHJvamVjdElkKSxcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIGF3YWl0IFByb21pc2UuYWxsKFxyXG4gICAgdXBkYXRlcy5tYXAoYXN5bmMgKHsgbGluZVJlY0lkLCBwYXlsb2FkIH0pID0+IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1cGRhdGVFeHBlbnNlU2hlZXRMaW5lKHNhZmVTaGVldElkLCBsaW5lUmVjSWQsIHBheWxvYWQsIHtcclxuICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBFbmNhcHN1bGF0ZXMgdXBkYXRlIGFuZCBkZWxldGUgbXV0YXRpb25zIGZvciBleHBlbnNlIHNoZWV0IGhlYWRlciBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzQ3JlYXRlTW9kZSxcclxuICBpc0VkaXRMb2NrZWQsXHJcbiAgaXNEZWxldGVMb2NrZWQsXHJcbiAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXHJcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gIGxvY2tlZEN1cnJlbmN5Q29kZSxcclxuICBsb2NrZWRFeGNoYW5nZVJhdGUsXHJcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICBjYW5FZGl0RXhwZW5zZSxcclxuICBjYW5EZWxldGVFeHBlbnNlLFxyXG4gIGNhbkVkaXRIZWFkZXJGaWVsZHMsXHJcbiAgY2FuVHJhbnNpdGlvblN0YXR1cyxcclxuICBzaGVldElkLFxyXG4gIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXHJcbiAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXHJcbiAgY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cyxcclxuICBjdXJyZW50TGluZXMsXHJcbiAgb25DcmVhdGVTdWNjZXNzLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgc2V0QnVzeSxcclxuICBzZXRTdGF0dXMsXHJcbiAgc2V0SXNFZGl0aW5nLFxyXG59OiBVc2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XHJcbiAgY29uc3QgYnVpbGRVcGRhdGVQYXlsb2FkID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoXHJcbiAgICAgIG5leHRTdGF0dXM/OiBudW1iZXIgfCBudWxsLFxyXG4gICAgICBzdGF0dXNDb21tZW50T3ZlcnJpZGU/OiBzdHJpbmcgfCBudWxsXHJcbiAgICApOiB7IHBheWxvYWQ6IEV4cGVuc2VTaGVldEhlYWRlclVwZGF0ZVJlcXVlc3QgfSB8IHsgZXJyb3I6IHN0cmluZyB9ID0+IHtcclxuICAgICAgY29uc3QgaGFzRXhwbGljaXRTdGF0dXNDb21tZW50T3ZlcnJpZGUgPSBzdGF0dXNDb21tZW50T3ZlcnJpZGUgIT09IHVuZGVmaW5lZDtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZERlc2NyaXB0aW9uID0gU3RyaW5nKGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkUHJvamVjdElkID0gU3RyaW5nKGRyYWZ0UHJvamVjdElkIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEVzdGFkb0NvbWVudGFyaW9zID0gU3RyaW5nKFxyXG4gICAgICAgIHN0YXR1c0NvbW1lbnRPdmVycmlkZSA/PyBkcmFmdEVzdGFkb0NvbWVudGFyaW9zID8/IFwiXCJcclxuICAgICAgKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRSZWltYnVyc2FibGVFeHBlbnNlID0gbm9ybWFsaXplRXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2UoZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlKTtcclxuICAgICAgY29uc3QgcmVzb2x2ZWRFeHBlbnNlU2hlZXRTdGF0dXMgPVxyXG4gICAgICAgIG5leHRTdGF0dXMgPz8gKGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXMgIT0gbnVsbCA/IE51bWJlcihjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzKSA6IHVuZGVmaW5lZCk7XHJcblxyXG4gICAgICBpZiAoIW5vcm1hbGl6ZWREZXNjcmlwdGlvbikge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBlcnJvcjogaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9EZXNjcmlwdGlvblJlcXVpcmVkXCIsIFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWQuXCIpLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcGF5bG9hZDoge1xyXG4gICAgICAgICAgZGVzY3JpcHRpb246IG5vcm1hbGl6ZWREZXNjcmlwdGlvbixcclxuICAgICAgICAgIHByb2pJZDogbm9ybWFsaXplZFByb2plY3RJZCB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgICBleHBlbnNlU2hlZXRTdGF0dXM6IHJlc29sdmVkRXhwZW5zZVNoZWV0U3RhdHVzLFxyXG4gICAgICAgICAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogbm9ybWFsaXplZFJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbiAgICAgICAgICAvLyBQcmVzZXJ2ZSBleHBsaWNpdCBlbXB0eSBzdGF0dXMgY29tbWVudHMgc28gdGhlIGJhY2tlbmQgY2FuIGNsZWFyIHRoZSBzdG9yZWQgdmFsdWUuXHJcbiAgICAgICAgICBlc3RhZG9Db21lbnRhcmlvczogaGFzRXhwbGljaXRTdGF0dXNDb21tZW50T3ZlcnJpZGVcclxuICAgICAgICAgICAgPyBub3JtYWxpemVkRXN0YWRvQ29tZW50YXJpb3NcclxuICAgICAgICAgICAgOiAobm9ybWFsaXplZEVzdGFkb0NvbWVudGFyaW9zIHx8IHVuZGVmaW5lZCksXHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHMsXHJcbiAgICAgIGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXMsXHJcbiAgICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICAgIGRyYWZ0UHJvamVjdElkLFxyXG4gICAgICBkcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbiAgICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWlzQ3JlYXRlTW9kZSAmJiBpc0VkaXRMb2NrZWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBjYW5Qcm9jZWVkID0gaXNDcmVhdGVNb2RlID8gY2FuQ3JlYXRlRXhwZW5zZSA6IGNhbkVkaXRFeHBlbnNlO1xyXG4gICAgaWYgKCFjYW5Qcm9jZWVkKSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBheWxvYWRSZXN1bHQgPSBidWlsZFVwZGF0ZVBheWxvYWQoKTtcclxuICAgIGlmIChcImVycm9yXCIgaW4gcGF5bG9hZFJlc3VsdCkge1xyXG4gICAgICBzZXRNb2RhbEVycm9yKHBheWxvYWRSZXN1bHQuZXJyb3IpO1xyXG4gICAgICBzZXRTdGF0dXMocGF5bG9hZFJlc3VsdC5lcnJvcik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcclxuICAgICAgc3RhcnRTdGF0dXM6IGlzQ3JlYXRlTW9kZVxyXG4gICAgICAgID8gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKVxyXG4gICAgICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcclxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldEJ1c3ksXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICAgICAgY29uc3QgY3JlYXRlUGF5bG9hZCA9IHBheWxvYWRSZXN1bHQucGF5bG9hZDtcclxuICAgICAgICAgIGNvbnN0IHBheWxvYWQ6IEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QgPSB7XHJcbiAgICAgICAgICAgIG1vZGU6IDEsXHJcbiAgICAgICAgICAgIGV4aXN0aW5nSG9qYUdhc3Rvc0lkOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBjcmVhdGVQYXlsb2FkLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICBwcm9qSWQ6IGNyZWF0ZVBheWxvYWQucHJvaklkLFxyXG4gICAgICAgICAgICBleHBlbnNlU2hlZXRTdGF0dXM6IDAsXHJcbiAgICAgICAgICAgIHJlaW1idXJzYWJsZUV4cGVuc2U6IGNyZWF0ZVBheWxvYWQucmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgICAgICAgICAgbGluZXM6IFtdLFxyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNyZWF0ZUV4cGVuc2VTaGVldChwYXlsb2FkKTtcclxuXHJcbiAgICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBBY2NlcHQgYm90aCBjYXNpbmcgdmFyaWFudHMgZnJvbSBiYWNrZW5kIGVudmVsb3Blcy5cclxuICAgICAgICAgIGNvbnN0IGNyZWF0ZWREYXRhID0gcmVzcG9uc2U/LkRhdGEgYXMgeyBIb2phR2FzdG9zSWQ/OiB1bmtub3duOyBob2phR2FzdG9zSWQ/OiB1bmtub3duIH0gfCBudWxsIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgY29uc3QgY3JlYXRlZFNoZWV0SWQgPSBTdHJpbmcoY3JlYXRlZERhdGE/LkhvamFHYXN0b3NJZCA/PyBjcmVhdGVkRGF0YT8uaG9qYUdhc3Rvc0lkID8/IFwiXCIpLnRyaW0oKTtcclxuICAgICAgICAgIGlmICghY3JlYXRlZFNoZWV0SWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgb25DcmVhdGVTdWNjZXNzKGNyZWF0ZWRTaGVldElkKTtcclxuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX1NhdmVcIiwgXCJTYXZlXCIpKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1cGRhdGVFeHBlbnNlU2hlZXRIZWFkZXIoc2hlZXRJZCwgcGF5bG9hZFJlc3VsdC5wYXlsb2FkKTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBzaGVldCB1cGRhdGVkXCIpKTtcclxuICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICB9LCBbXHJcbiAgICBidXN5LFxyXG4gICAgYnVpbGRVcGRhdGVQYXlsb2FkLFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICAgIGNhbkVkaXRFeHBlbnNlLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNFZGl0TG9ja2VkLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgb25DcmVhdGVTdWNjZXNzLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzaGVldElkLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVQcm9wYWdhdGVSZWltYnVyc2FibGVFeHBlbnNlVG9MaW5lcyA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKG5leHRSZWltYnVyc2FibGVFeHBlbnNlOiBudW1iZXIpID0+IHtcclxuICAgICAgaWYgKGJ1c3kgfHwgaXNDcmVhdGVNb2RlIHx8ICFpc0VkaXRpbmcpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGlzRWRpdExvY2tlZCB8fCAhY2FuRWRpdEV4cGVuc2UgfHwgIWNhbkVkaXRIZWFkZXJGaWVsZHMpIHtcclxuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcclxuICAgICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1Byb3BhZ2F0aW5nUmVpbWJ1cnNhYmxlXCIsIFwiVXBkYXRpbmcgZXhwZW5zZSBzaGVldCBsaW5lcy4uLlwiKSxcclxuICAgICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKSxcclxuICAgICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICAgIHNldEJ1c3ksXHJcbiAgICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgYXdhaXQgdXBkYXRlUmVpbWJ1cnNhYmxlRXhwZW5zZU9uTGluZXMoXHJcbiAgICAgICAgICAgIHNoZWV0SWQsXHJcbiAgICAgICAgICAgIGN1cnJlbnRMaW5lcyxcclxuICAgICAgICAgICAgbm9ybWFsaXplRXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2UobmV4dFJlaW1idXJzYWJsZUV4cGVuc2UpXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgdXBkYXRlZFwiKSk7XHJcbiAgICAgICAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQub2s7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBidXN5LFxyXG4gICAgICBjYW5FZGl0RXhwZW5zZSxcclxuICAgICAgY2FuRWRpdEhlYWRlckZpZWxkcyxcclxuICAgICAgY3VycmVudExpbmVzLFxyXG4gICAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICAgIGlzRWRpdExvY2tlZCxcclxuICAgICAgaXNFZGl0aW5nLFxyXG4gICAgICBzZXRCdXN5LFxyXG4gICAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgc2hlZXRJZCxcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVQcm9wYWdhdGVQcm9qZWN0SWRUb0xpbmVzID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAobmV4dFByb2plY3RJZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGlmIChidXN5IHx8IGlzQ3JlYXRlTW9kZSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChpc0VkaXRMb2NrZWQgfHwgIWNhbkVkaXRFeHBlbnNlIHx8ICFjYW5FZGl0SGVhZGVyRmllbGRzKSB7XHJcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgICAgc3RhcnRTdGF0dXM6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9Qcm9wYWdhdGluZ1Byb2plY3RcIiwgXCJVcGRhdGluZyBleHBlbnNlIHNoZWV0IGxpbmVzLi4uXCIpLFxyXG4gICAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpLFxyXG4gICAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgICAgc2V0QnVzeSxcclxuICAgICAgICBzZXRTdGF0dXMsXHJcbiAgICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICBhd2FpdCB1cGRhdGVQcm9qZWN0SWRPbkxpbmVzKHNoZWV0SWQsIGN1cnJlbnRMaW5lcywgbmV4dFByb2plY3RJZCk7XHJcblxyXG4gICAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBzaGVldCB1cGRhdGVkXCIpKTtcclxuICAgICAgICAgIHNldElzRWRpdGluZyh0cnVlKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIGNhbkVkaXRFeHBlbnNlLFxyXG4gICAgICBjYW5FZGl0SGVhZGVyRmllbGRzLFxyXG4gICAgICBjdXJyZW50TGluZXMsXHJcbiAgICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgICAgaXNFZGl0TG9ja2VkLFxyXG4gICAgICBpc0VkaXRpbmcsXHJcbiAgICAgIHNldEJ1c3ksXHJcbiAgICAgIHNldElzRWRpdGluZyxcclxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICBzaGVldElkLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVN0YXR1c1RyYW5zaXRpb24gPSB1c2VDYWxsYmFjayhcclxuICAgIGFzeW5jIChuZXh0U3RhdHVzOiBudW1iZXIsIHN0YXJ0U3RhdHVzOiBzdHJpbmcsIHN0YXR1c0NvbW1lbnRPdmVycmlkZT86IHN0cmluZyB8IG51bGwpID0+IHtcclxuICAgICAgaWYgKGJ1c3kgfHwgaXNDcmVhdGVNb2RlIHx8ICFzaGVldElkKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmICghY2FuVHJhbnNpdGlvblN0YXR1cykge1xyXG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHBheWxvYWRSZXN1bHQgPSBidWlsZFVwZGF0ZVBheWxvYWQobmV4dFN0YXR1cywgc3RhdHVzQ29tbWVudE92ZXJyaWRlKTtcclxuICAgICAgaWYgKFwiZXJyb3JcIiBpbiBwYXlsb2FkUmVzdWx0KSB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihwYXlsb2FkUmVzdWx0LmVycm9yKTtcclxuICAgICAgICBzZXRTdGF0dXMocGF5bG9hZFJlc3VsdC5lcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcclxuICAgICAgICBzdGFydFN0YXR1cyxcclxuICAgICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKSxcclxuICAgICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICAgIHNldEJ1c3ksXHJcbiAgICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1cGRhdGVFeHBlbnNlU2hlZXRIZWFkZXIoc2hlZXRJZCwgcGF5bG9hZFJlc3VsdC5wYXlsb2FkKTtcclxuXHJcbiAgICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IHVwZGF0ZWRcIikpO1xyXG4gICAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIGJ1aWxkVXBkYXRlUGF5bG9hZCxcclxuICAgICAgY2FuVHJhbnNpdGlvblN0YXR1cyxcclxuICAgICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgICBzZXRCdXN5LFxyXG4gICAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgc2hlZXRJZCxcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKGlzRGVsZXRlTG9ja2VkKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWNhbkRlbGV0ZUV4cGVuc2UpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxyXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUVycm9yXCIsIFwiRGVsZXRlIGVycm9yLlwiKSxcclxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldChzaGVldElkKTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVkXCIsIFwiRXhwZW5zZSBzaGVldCBkZWxldGVkXCIpKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQub2s7XHJcbiAgfSwgW2J1c3ksIGNhbkRlbGV0ZUV4cGVuc2UsIGlzRGVsZXRlTG9ja2VkLCBzZXRCdXN5LCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXMsIHNoZWV0SWRdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZVByb3BhZ2F0ZVJlaW1idXJzYWJsZUV4cGVuc2VUb0xpbmVzLFxyXG4gICAgaGFuZGxlUHJvcGFnYXRlUHJvamVjdElkVG9MaW5lcyxcclxuICAgIGhhbmRsZVN0YXR1c1RyYW5zaXRpb24sXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMgfSBmcm9tIFwiLi4vaG9va3MvdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zLnRzXCI7XHJcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnNBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgYWN0aW9uTW9kZT86IFwiZGVmYXVsdFwiIHwgXCJkZWxldGVfb25seVwiIHwgXCJ2aWV3X29ubHlcIjtcclxuICBpc0xvY2tlZDogYm9vbGVhbjtcclxuICBpc0VkaXRMb2NrZWQ/OiBib29sZWFuO1xyXG4gIGlzRGVsZXRlTG9ja2VkPzogYm9vbGVhbjtcclxuICBwZXJtaXNzaW9uc1JlYWR5PzogYm9vbGVhbjtcclxuICBjYW5FZGl0RXhwZW5zZTogYm9vbGVhbjtcclxuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZVVwZGF0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBoYW5kbGVEZWxldGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgb25TYXZlU3VjY2VzczogKCkgPT4gdm9pZDtcclxuICBvbkRlbGV0ZVN1Y2Nlc3M/OiAoKSA9PiB2b2lkO1xyXG4gIHNhdmVDb25maXJtVGl0bGU/OiBzdHJpbmc7XHJcbiAgc2F2ZUNvbmZpcm1NZXNzYWdlPzogc3RyaW5nO1xyXG4gIHNhdmVDb25maXJtVGV4dD86IHN0cmluZztcclxuICBzYXZlQ29uZmlybU9uQ2FuY2VsPzogKCkgPT4gdm9pZDtcclxuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcclxuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XHJcbiAgICBvbkNhbmNlbD86ICgpID0+IHZvaWQ7XHJcbiAgfSkgPT4gdm9pZDtcclxuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBDb29yZGluYXRlcyB0b3BiYXIgaWNvbiBzdGF0ZSBhbmQgZGlzcGF0Y2ggYWN0aW9ucyBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsT3BlbixcclxuICBpc0VkaXRpbmcsXHJcbiAgaXNDcmVhdGVNb2RlLFxyXG4gIGFjdGlvbk1vZGUgPSBcImRlZmF1bHRcIixcclxuICBpc0xvY2tlZCxcclxuICBpc0VkaXRMb2NrZWQsXHJcbiAgaXNEZWxldGVMb2NrZWQsXHJcbiAgcGVybWlzc2lvbnNSZWFkeSA9IHRydWUsXHJcbiAgY2FuRWRpdEV4cGVuc2UsXHJcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICBjYW5EZWxldGVFeHBlbnNlLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIGhhbmRsZVVwZGF0ZSxcclxuICBoYW5kbGVEZWxldGUsXHJcbiAgb25TYXZlU3VjY2VzcyxcclxuICBvbkRlbGV0ZVN1Y2Nlc3MsXHJcbiAgc2F2ZUNvbmZpcm1UaXRsZSxcclxuICBzYXZlQ29uZmlybU1lc3NhZ2UsXHJcbiAgc2F2ZUNvbmZpcm1UZXh0LFxyXG4gIHNhdmVDb25maXJtT25DYW5jZWwsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncykgPT4ge1xyXG4gIHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25Hcm91cElkOiBcImV4cGVuc2Utc2hlZXQtZGV0YWlsLWFjdGlvbnNcIixcclxuICAgIGlkczoge1xyXG4gICAgICBlZGl0SWNvbklkOiBcImV4cGVuc2VFZGl0SWNvblwiLFxyXG4gICAgICBzYXZlSWNvbklkOiBcImV4cGVuc2VTYXZlSWNvblwiLFxyXG4gICAgICBkZWxldGVCdG5JZDogXCJleHBlbnNlRGVsZXRlQnRuXCIsXHJcbiAgICAgIGNhbmNlbEJ0bklkOiBcImV4cGVuc2VDYW5jZWxCdG5cIixcclxuICAgIH0sXHJcbiAgICBldmVudHM6IHtcclxuICAgICAgZWRpdEV2ZW50OiBcImV4cGVuc2UtZGV0YWlsLWVkaXRcIixcclxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS1kZXRhaWwtZGVsZXRlXCIsXHJcbiAgICAgIGNhbmNlbEV2ZW50OiBcImV4cGVuc2UtZGV0YWlsLWNhbmNlbC1lZGl0XCIsXHJcbiAgICB9LFxyXG4gICAgYnVzeSxcclxuICAgIG1vZGFsT3BlbixcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzTG9ja2VkLFxyXG4gICAgYWN0aW9uTW9kZSxcclxuICAgIGlzRWRpdExvY2tlZCxcclxuICAgIGlzRGVsZXRlTG9ja2VkLFxyXG4gICAgYWxsb3dDcmVhdGVNb2RlQWN0aW9uc1doZW5Mb2NrZWQ6IHRydWUsXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5LFxyXG4gICAgY2FuQ3JlYXRlOiBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gICAgY2FuRWRpdDogY2FuRWRpdEV4cGVuc2UsXHJcbiAgICBjYW5EZWxldGU6IGNhbkRlbGV0ZUV4cGVuc2UsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVTYXZlOiBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBzYXZlQ29uZmlybVRpdGxlOiBzYXZlQ29uZmlybVRpdGxlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19UaXRsZVwiLCBcIlNhdmUgY2hhbmdlc1wiKSxcclxuICAgIHNhdmVDb25maXJtTWVzc2FnZTogc2F2ZUNvbmZpcm1NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gc2F2ZSBjaGFuZ2VzP1wiKSxcclxuICAgIHNhdmVDb25maXJtVGV4dDogc2F2ZUNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXHJcbiAgICBzYXZlQ29uZmlybU9uQ2FuY2VsLFxyXG4gICAgZGVsZXRlQ29uZmlybVRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlU2hlZXRfVGl0bGVcIiwgXCJEZWxldGUgZXhwZW5zZSBzaGVldFwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlU2hlZXRfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGV4cGVuc2Ugc2hlZXQ/XCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpLFxyXG4gICAgb25TYXZlU3VjY2VzcyxcclxuICAgIG9uRGVsZXRlU3VjY2Vzczogb25EZWxldGVTdWNjZXNzIHx8ICgoKSA9PiBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvRXhwZW5zZVNoZWV0c1wiKSksXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VTaGVldEhlYWRlcixcclxuICBFeHBlbnNlU2hlZXRMaW5lLFxyXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHtcclxuICBmZXRjaEV4cGVuc2VTaGVldERldGFpbCxcclxuICBnZXRFeGNoYW5nZVJhdGUsXHJcbiAgZ2V0RXhwZW5zZVNoZWV0RGVmYXVsdEN1cnJlbmN5Q29kZSxcclxuICBtYXBFeHBlbnNlU2hlZXRIZWFkZXIsXHJcbiAgbWFwRXhwZW5zZVNoZWV0TGluZSxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCxcclxuICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCxcclxuICBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLFxyXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VNYW5hZ2VkVXNlclNjb3BlLnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlTGFiZWwgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4Y2hhbmdlUmF0ZUVudHJ5TW9kZUNhdGFsb2cudHNcIjtcclxuaW1wb3J0IHtcclxuICBERUZBVUxUX1JFSU1CVVJTQUJMRV9FWFBFTlNFLFxyXG4gIG5vcm1hbGl6ZUV4cGVuc2VSZWltYnVyc2FibGVFeHBlbnNlLFxyXG59IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2VDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgaGFzQXNzaWduZWRWb3VjaGVyLCBwYXJzZUV4cGVuc2VEYXRlLCBzYWZlVGV4dCwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlciwgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZUV4cGVuc2VTaGVldERldGFpbFBvbGljeSB9IGZyb20gXCIuL2V4cGVuc2VTaGVldERldGFpbFBvbGljeS50c1wiO1xyXG5cclxuY29uc3QgRVhDSEFOR0VfUkFURV9ERUJPVU5DRV9NUyA9IDQwMDtcclxuY29uc3QgRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5UID0gMTAwO1xyXG5jb25zdCBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTID0gNztcclxuY29uc3QgRVhQRU5TRV9TVEFUVVNfQVBQUk9WRUQgPSAyO1xyXG5jb25zdCBFWFBFTlNFX1NUQVRVU19QQUlEID0gNDtcclxuXHJcbi8vIE5vcm1hbGl6ZXMgZXhjaGFuZ2UtcmF0ZSBudW1iZXJzIGZvciBudW1lcmljIGlucHV0IGNvbnRyb2xzLlxyXG5jb25zdCBmb3JtYXRFeGNoYW5nZVJhdGVJbnB1dFZhbHVlID0gKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIodmFsdWUsIHtcclxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcclxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcclxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgZmFsbGJhY2s6IFwiXCIsXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBSZXVzZXMgdGhlIGZpeGVkIHNhbWUtY3VycmVuY3kgcmF0ZSBzbyBFVVIgc2hlZXRzIHN0YXkgYWxpZ25lZCB3aXRoIHRoZSAxMDAgcmVmZXJlbmNlIGFtb3VudC5cclxuY29uc3QgU0FNRV9DVVJSRU5DWV9FWENIQU5HRV9SQVRFX0lOUFVUID0gZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZShFWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQpO1xyXG5cclxuY29uc3QgYnVpbGRDcmVhdGVIZWFkZXJEcmFmdCA9ICgpOiBFeHBlbnNlU2hlZXRIZWFkZXIgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBob2phR2FzdG9zSWQ6IFwiXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJcIixcclxuICAgIHByb2pJZDogXCJcIixcclxuICAgIGN1cnJlbmN5Q29kZTogXCJcIixcclxuICAgIHRvdGFsQW1vdW50OiBudWxsLFxyXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiAwLFxyXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogMCxcclxuICAgIHJlaW1idXJzYWJsZUV4cGVuc2U6IERFRkFVTFRfUkVJTUJVUlNBQkxFX0VYUEVOU0UsXHJcbiAgICBjcmVhdGVkRGF0ZTogXCJcIixcclxuICAgIGV4Y2hSYXRlOiBTdHJpbmcoRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5UKSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3Qgc2hvdWxkU2hvd0V4Y2hhbmdlUmF0ZSA9ICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIGZhbHNlO1xyXG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCh2YWx1ZSk7XHJcbiAgaWYgKHBhcnNlZCA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XHJcbiAgcmV0dXJuIE1hdGguYWJzKHBhcnNlZCkgPiAwO1xyXG59O1xyXG5cclxudHlwZSBVc2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZUFyZ3MgPSB7XHJcbiAgaGFzQWNjZXNzOiBib29sZWFuO1xyXG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcclxuICBjYW5NYW5hZ2VPdGhlclVzZXJzOiBib29sZWFuO1xyXG4gIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nO1xyXG4gIGN1cnJlbnRDcm1Vc2VySWQ6IHN0cmluZztcclxuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQ6IHN0cmluZztcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gT3ducyBzdGF0ZSBhbmQgYmVoYXZpb3IgZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsIHBhZ2UgKHJlYWQsIGVkaXQsIGNyZWF0ZSkuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZSA9ICh7XHJcbiAgaGFzQWNjZXNzLFxyXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gIGN1cnJlbnRBeFVzZXJJZCxcclxuICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICBzaGVldElkLFxyXG4gIGlzQ3JlYXRlTW9kZSxcclxuICBvbkZvcmJpZGRlbixcclxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGVBcmdzKSA9PiB7XHJcbiAgY29uc3QgW2hlYWRlciwgc2V0SGVhZGVyXSA9IHVzZVN0YXRlPEV4cGVuc2VTaGVldEhlYWRlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtsaW5lcywgc2V0TGluZXNdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0TGluZVtdPihbXSk7XHJcbiAgY29uc3QgW2xpbmVQYWdlLCBzZXRMaW5lUGFnZV0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtpc0VkaXRpbmcsIHNldElzRWRpdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW21vZGFsRXJyb3IsIHNldE1vZGFsRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0RGVzY3JpcHRpb24sIHNldERyYWZ0RGVzY3JpcHRpb25dID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0UHJvamVjdElkLCBzZXREcmFmdFByb2plY3RJZF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRDdXJyZW5jeUNvZGUsIHNldERyYWZ0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdEV4Y2hhbmdlUmF0ZSwgc2V0RHJhZnRFeGNoYW5nZVJhdGVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSwgc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlXSA9IHVzZVN0YXRlPG51bWJlciB8IG51bGw+KERFRkFVTFRfUkVJTUJVUlNBQkxFX0VYUEVOU0UpO1xyXG4gIGNvbnN0IFtkcmFmdEVzdGFkb0NvbWVudGFyaW9zLCBzZXREcmFmdEVzdGFkb0NvbWVudGFyaW9zXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkZWZhdWx0Q3VycmVuY3lDb2RlLCBzZXREZWZhdWx0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtpc0V4Y2hhbmdlUmF0ZUxvYWRpbmcsIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2V4Y2hhbmdlUmF0ZU1lc3NhZ2UsIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2V4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yLCBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW29mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW29mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW29mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSwgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSwgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2VdID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIGNvbnN0IGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIgPSB1c2VDYWxsYmFjaygobmV4dEhlYWRlcjogRXhwZW5zZVNoZWV0SGVhZGVyIHwgbnVsbCkgPT4ge1xyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbihzYWZlVGV4dChuZXh0SGVhZGVyPy5kZXNjcmlwdGlvbikpO1xyXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQoc2FmZVRleHQobmV4dEhlYWRlcj8ucHJvaklkKSk7XHJcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZShzYWZlVGV4dChuZXh0SGVhZGVyPy5jdXJyZW5jeUNvZGUpKTtcclxuICAgIHNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZShub3JtYWxpemVFeHBlbnNlUmVpbWJ1cnNhYmxlRXhwZW5zZShuZXh0SGVhZGVyPy5yZWltYnVyc2FibGVFeHBlbnNlKSk7XHJcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShcclxuICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKG5leHRIZWFkZXI/LmV4Y2hSYXRlLCB7XHJcbiAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxyXG4gICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcclxuICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgICAgICBmYWxsYmFjazogXCJcIixcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgICBzZXREcmFmdEVzdGFkb0NvbWVudGFyaW9zKHNhZmVUZXh0KG5leHRIZWFkZXI/LmVzdGFkb0NvbWVudGFyaW9zKSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgbG9hZERldGFpbCA9IGFzeW5jICgpID0+IHtcclxuICAgICAgaWYgKCFoYXNBY2Nlc3MpIHtcclxuICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSkge1xyXG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRyYWZ0SGVhZGVyID0gYnVpbGRDcmVhdGVIZWFkZXJEcmFmdCgpO1xyXG4gICAgICAgIHNldEhlYWRlcihkcmFmdEhlYWRlcik7XHJcbiAgICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgICAgIHNldExpbmVQYWdlKDEpO1xyXG4gICAgICAgIHNldElzRWRpdGluZyh0cnVlKTtcclxuICAgICAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGRyYWZ0SGVhZGVyKTtcclxuICAgICAgICBzZXRTdGF0dXMoXCJcIik7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFzaGVldElkKSB7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKHNoZWV0SWQsIHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNoZWV0cyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRTaGVldCA9XHJcbiAgICAgICAgICBzaGVldHMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5Py5Ib2phR2FzdG9zSWQpLnRvVXBwZXJDYXNlKCkgPT09IHNoZWV0SWQudHJpbSgpLnRvVXBwZXJDYXNlKCkpIHx8IHNoZWV0c1swXTtcclxuXHJcbiAgICAgICAgaWYgKCFzZWxlY3RlZFNoZWV0KSB7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5leHRIZWFkZXIgPSBtYXBFeHBlbnNlU2hlZXRIZWFkZXIoc2VsZWN0ZWRTaGVldCk7XHJcbiAgICAgICAgY29uc3QgbmV4dExpbmVzID0gKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRTaGVldC5MaW5lcykgPyBzZWxlY3RlZFNoZWV0LkxpbmVzIDogW10pLm1hcCgoZW50cnkpID0+XHJcbiAgICAgICAgICBtYXBFeHBlbnNlU2hlZXRMaW5lKGVudHJ5KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgc2V0SGVhZGVyKG5leHRIZWFkZXIpO1xyXG4gICAgICAgIHNldExpbmVzKG5leHRMaW5lcyk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShcclxuICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdm9pZCBsb2FkRGV0YWlsKCk7XHJcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2UsIGhhc0FjY2VzcywgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNDcmVhdGVNb2RlLCBvbkZvcmJpZGRlbiwgc2hlZXRJZF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFoZWFkZXIgfHwgaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGhlYWRlcik7XHJcbiAgfSwgW2hlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNFZGl0aW5nXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWhhc0FjY2VzcykgcmV0dXJuO1xyXG4gICAgbGV0IGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG5cclxuICAgIGNvbnN0IGxvYWREZWZhdWx0Q3VycmVuY3lDb2RlID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSBhd2FpdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlKHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcclxuICAgICAgICBzZXREZWZhdWx0Q3VycmVuY3lDb2RlKHNhZmVUZXh0KGNvZGUpLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZvaWQgbG9hZERlZmF1bHRDdXJyZW5jeUNvZGUoKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlzQ2FuY2VsbGVkID0gdHJ1ZTtcclxuICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xyXG4gICAgfTtcclxuICB9LCBbaGFzQWNjZXNzXSk7XHJcblxyXG4gIGNvbnN0IGhhc0FjdGl2ZVByb2Nlc3MgPSB1c2VNZW1vKCgpID0+IGJ1c3kgfHwgaXNFZGl0aW5nLCBbYnVzeSwgaXNFZGl0aW5nXSk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoaGFzQWN0aXZlUHJvY2Vzcyk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcclxuICAgIH07XHJcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcclxuXHJcbiAgY29uc3QgcHJvamVjdFZhbHVlID0gc2FmZVRleHQoaGVhZGVyPy5wcm9qSWQpO1xyXG4gIGNvbnN0IHN0YXR1c0NvZGUgPSB0eXBlb2YgaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMgPT09IFwibnVtYmVyXCIgPyBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzIDogbnVsbDtcclxuICBjb25zdCBpc1NoZWV0QXBwcm92ZWQgPSBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRDtcclxuICBjb25zdCBpc1NoZWV0UGFpZEJ5U3RhdHVzID0gc3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfUEFJRDtcclxuICBjb25zdCBpc1NoZWV0UGFpZEJ5Vm91Y2hlciA9IGhhc0Fzc2lnbmVkVm91Y2hlcihoZWFkZXI/LnZvdWNoZXIpO1xyXG4gIGNvbnN0IGlzU2hlZXRQYWlkID0gaXNTaGVldFBhaWRCeVN0YXR1cyB8fCBpc1NoZWV0UGFpZEJ5Vm91Y2hlcjtcclxuICBjb25zdCBpc01hbmFnaW5nT3RoZXJVc2VyID0gaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCh7XHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHJlY29yZE93bmVyVXNlcklkOiBoZWFkZXI/LnVzZXJJZCxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICB9KTtcclxuICBjb25zdCBkZXRhaWxQb2xpY3kgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpbnRlcmFjdGlvbk1vZGU6IFwiZnVsbF9lZGl0XCIgYXMgY29uc3QsXHJcbiAgICAgICAgc2hvd0ZhYjogZmFsc2UsXHJcbiAgICAgICAgY2FuRGVsZXRlU2hlZXQ6IGZhbHNlLFxyXG4gICAgICAgIHN0YXR1c0FjdGlvbnM6IFtdLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXNvbHZlRXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5KHtcclxuICAgICAgc3RhdHVzQ29kZSxcclxuICAgICAgaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgICAgaXNQYWlkOiBpc1NoZWV0UGFpZCxcclxuICAgIH0pO1xyXG4gIH0sIFthbGxvd1NlbGZNYW5hZ2VtZW50LCBpc0NyZWF0ZU1vZGUsIGlzTWFuYWdpbmdPdGhlclVzZXIsIGlzU2hlZXRQYWlkLCBzdGF0dXNDb2RlXSk7XHJcbiAgY29uc3QgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQgPSBpc0NyZWF0ZU1vZGUgfHwgKCFpc01hbmFnaW5nT3RoZXJVc2VyICYmIGRldGFpbFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgPT09IFwiZnVsbF9lZGl0XCIpO1xyXG4gIGNvbnN0IGNhbkVkaXRTdGF0dXNDb21tZW50Q3VycmVudCA9ICFpc0NyZWF0ZU1vZGUgJiYgZGV0YWlsUG9saWN5LmludGVyYWN0aW9uTW9kZSA9PT0gXCJjb21tZW50X29ubHlfZWRpdFwiO1xyXG4gIGNvbnN0IGNhbkVkaXRBbnlDdXJyZW50ID0gKGlzQ3JlYXRlTW9kZSAmJiBjYW5DcmVhdGVFeHBlbnNlKSB8fCBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCB8fCBjYW5FZGl0U3RhdHVzQ29tbWVudEN1cnJlbnQ7XHJcbiAgY29uc3QgY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyA9ICFpc0NyZWF0ZU1vZGUgJiYgZGV0YWlsUG9saWN5LmludGVyYWN0aW9uTW9kZSA9PT0gXCJmdWxsX2VkaXRcIjtcclxuICBjb25zdCBpc1NoZWV0TG9ja2VkID0gaXNTaGVldEFwcHJvdmVkIHx8IGlzU2hlZXRQYWlkO1xyXG4gIGNvbnN0IGhhc0xpbmVzID0gbGluZXMubGVuZ3RoID4gMDtcclxuICBjb25zdCBleGNoYW5nZVJhdGVWYWx1ZSA9IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihzYWZlVGV4dChoZWFkZXI/LmV4Y2hSYXRlKSwge1xyXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxyXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxyXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICBmYWxsYmFjazogXCJcIixcclxuICB9KTtcclxuICBjb25zdCBzaG93RXhjaGFuZ2VSYXRlID0gdXNlTWVtbygoKSA9PiBzaG91bGRTaG93RXhjaGFuZ2VSYXRlKGV4Y2hhbmdlUmF0ZVZhbHVlKSwgW2V4Y2hhbmdlUmF0ZVZhbHVlXSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgPSB1c2VNZW1vKCgpID0+IGRyYWZ0Q3VycmVuY3lDb2RlLnRyaW0oKS50b1VwcGVyQ2FzZSgpLCBbZHJhZnRDdXJyZW5jeUNvZGVdKTtcclxuICBjb25zdCBub3JtYWxpemVkRGVmYXVsdEN1cnJlbmN5ID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChkZWZhdWx0Q3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpLCBbZGVmYXVsdEN1cnJlbmN5Q29kZV0pO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSA9IG5vcm1hbGl6ZWREZWZhdWx0Q3VycmVuY3kgfHwgXCJFVVJcIjtcclxuICBjb25zdCB1aUxvY2FsZSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIFwiZXMtRVNcIjtcclxuICAgIHJldHVybiBzYWZlVGV4dChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ/LmxhbmcpIHx8IFwiZXMtRVNcIjtcclxuICB9LCBbXSk7XHJcbiAgY29uc3QgZm9ybUV4Y2hhbmdlRGF0ZSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgcGFyc2VkRGF0ZSA9IHBhcnNlRXhwZW5zZURhdGUoc2FmZVRleHQoaGVhZGVyPy5jcmVhdGVkRGF0ZSkpO1xyXG4gICAgaWYgKHBhcnNlZERhdGUpIHJldHVybiB0b0lzb0RhdGUocGFyc2VkRGF0ZSk7XHJcbiAgICByZXR1cm4gdG9Jc29EYXRlKG5ldyBEYXRlKCkpO1xyXG4gIH0sIFtoZWFkZXI/LmNyZWF0ZWREYXRlXSk7XHJcbiAgY29uc3Qgc2hvdWxkTG9hZEhlYWRlckV4Y2hhbmdlUmF0ZSA9IGZhbHNlO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlID0gXCJcIjtcclxuICAvLyBIZWFkZXIgY3VycmVuY3kgaXMgbGVnYWN5L3JlYWQtb25seTsgZWRpdGFibGUgY3VycmVuY3kgbm93IGJlbG9uZ3MgdG8gZWFjaCBsaW5lLlxyXG4gIGNvbnN0IGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzID0gZmFsc2U7XHJcbiAgY29uc3QgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzID0gZmFsc2U7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBsZXQgaXNDYW5jZWxsZWQgPSBmYWxzZTtcclxuICAgIGxldCByZXF1ZXN0VGltZXI6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbCA9IG51bGw7XHJcbiAgICBsZXQgcmVxdWVzdEFib3J0Q29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgY29uc3QgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzID0gKCkgPT4ge1xyXG4gICAgICBpZiAocmVxdWVzdFRpbWVyKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHJlcXVlc3RUaW1lcik7XHJcbiAgICAgICAgcmVxdWVzdFRpbWVyID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICBpZiAocmVxdWVzdEFib3J0Q29udHJvbGxlcikge1xyXG4gICAgICAgIHJlcXVlc3RBYm9ydENvbnRyb2xsZXIuYWJvcnQoKTtcclxuICAgICAgICByZXF1ZXN0QWJvcnRDb250cm9sbGVyID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoIXNob3VsZExvYWRIZWFkZXJFeGNoYW5nZVJhdGUgfHwgIWlzRWRpdGluZyB8fCAhY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQgfHwgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzKSB7XHJcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICBjbGVhclJlcXVlc3RBcnRpZmFjdHMoKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIW5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5IHx8ICFleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kpIHtcclxuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNsZWFyUmVxdWVzdEFydGlmYWN0cygpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChub3JtYWxpemVkRHJhZnRDdXJyZW5jeSA9PT0gZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5KSB7XHJcbiAgICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlKFNBTUVfQ1VSUkVOQ1lfRVhDSEFOR0VfUkFURV9JTlBVVCk7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoU0FNRV9DVVJSRU5DWV9FWENIQU5HRV9SQVRFX0lOUFVUKTtcclxuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNsZWFyUmVxdWVzdEFydGlmYWN0cygpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3RUaW1lciA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xyXG4gICAgICByZXF1ZXN0QWJvcnRDb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG4gICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRFeGNoYW5nZVJhdGUoXHJcbiAgICAgICAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXHJcbiAgICAgICAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcclxuICAgICAgICAgIGZvcm1FeGNoYW5nZURhdGUsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICBzaWduYWw6IHJlcXVlc3RBYm9ydENvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MgfHwgIXJlc3BvbnNlLkRhdGEgfHwgIU51bWJlci5pc0Zpbml0ZShOdW1iZXIocmVzcG9uc2UuRGF0YS5SYXRlKSkpIHtcclxuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXHJcbiAgICAgICAgICAgIHNhZmVUZXh0KHJlc3BvbnNlLk1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIilcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoZSBlbmRwb2ludCByZXR1cm5zIG9uZSBiYXNlLWN1cnJlbmN5IHVuaXQgaW4gdGhlIGV4cGVuc2UgY3VycmVuY3kuXHJcbiAgICAgICAgLy8gVGhlIFVJIHN0b3JlcyB0aGUgYW1vdW50IGZvciB0aGUgZml4ZWQgbG9jYWwgcmVmZXJlbmNlIGFtb3VudCAoMTAwKS5cclxuICAgICAgICBjb25zdCBvZmZpY2lhbFJhdGVQZXJCYXNlVW5pdCA9IE51bWJlcihyZXNwb25zZS5EYXRhLlJhdGUpO1xyXG4gICAgICAgIGNvbnN0IG9mZmljaWFsUmF0ZUZvclJlZmVyZW5jZUFtb3VudCA9IG9mZmljaWFsUmF0ZVBlckJhc2VVbml0ICogRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5UO1xyXG4gICAgICAgIGNvbnN0IG5leHRFeGNoYW5nZVJhdGVWYWx1ZSA9IGZvcm1hdEV4Y2hhbmdlUmF0ZUlucHV0VmFsdWUob2ZmaWNpYWxSYXRlRm9yUmVmZXJlbmNlQW1vdW50KTtcclxuICAgICAgICBjb25zdCBvZmZpY2lhbFJhdGVSYXdWYWx1ZSA9IGZvcm1hdEV4Y2hhbmdlUmF0ZUlucHV0VmFsdWUob2ZmaWNpYWxSYXRlUGVyQmFzZVVuaXQpO1xyXG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUobmV4dEV4Y2hhbmdlUmF0ZVZhbHVlKTtcclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKG9mZmljaWFsUmF0ZVJhd1ZhbHVlKTtcclxuICAgICAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShuZXh0RXhjaGFuZ2VSYXRlVmFsdWUpO1xyXG5cclxuICAgICAgICBjb25zdCBlZmZlY3RpdmVSYXRlRGF0ZSA9IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGEuRGF0ZSkgfHwgZm9ybUV4Y2hhbmdlRGF0ZTtcclxuICAgICAgICBjb25zdCBzb3VyY2UgPSBzYWZlVGV4dChyZXNwb25zZS5EYXRhLlNvdXJjZSk7XHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKGVmZmVjdGl2ZVJhdGVEYXRlKTtcclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShzb3VyY2UpO1xyXG4gICAgICAgIGNvbnN0IG9mZmljaWFsTGFiZWwgPSBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsKDApIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX09mZmljaWFsXCIsIFwiVC5DLiBPZmljaWFsXCIpO1xyXG4gICAgICAgIGNvbnN0IGxvY2FsaXplZFJhdGVEYXRlID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGVmZmVjdGl2ZVJhdGVEYXRlLCB1aUxvY2FsZSkgfHwgZWZmZWN0aXZlUmF0ZURhdGU7XHJcbiAgICAgICAgY29uc3QgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBzb3VyY2UgPyBgJHtvZmZpY2lhbExhYmVsfSAke2xvY2FsaXplZFJhdGVEYXRlfSAoJHtzb3VyY2V9KWAgOiBgJHtvZmZpY2lhbExhYmVsfSAke2xvY2FsaXplZFJhdGVEYXRlfWA7XHJcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShvZmZpY2lhbFJhdGVSYXdWYWx1ZSA/IGAke2V4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlfSAtICR7b2ZmaWNpYWxSYXRlUmF3VmFsdWV9YCA6IGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKTtcclxuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XHJcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcclxuICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwNCkge1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9Ob3RGb3VuZFwiLCBcIk5vIGhheSB0aXBvIGRlIGNhbWJpbyBwYXJhIGxhIGZlY2hhXCIpKTtcclxuICAgICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MjIgfHwgZXJyb3Iuc3RhdHVzID09PSA1MDApIHtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcclxuICAgICAgICAgICAgICBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXHJcbiAgICAgICAgICAgIHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIilcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpKTtcclxuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBpZiAoIWlzQ2FuY2VsbGVkKSB7XHJcbiAgICAgICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgRVhDSEFOR0VfUkFURV9ERUJPVU5DRV9NUyk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaXNDYW5jZWxsZWQgPSB0cnVlO1xyXG4gICAgICBjbGVhclJlcXVlc3RBcnRpZmFjdHMoKTtcclxuICAgIH07XHJcbiAgfSwgW1xyXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICBmb3JtRXhjaGFuZ2VEYXRlLFxyXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXHJcbiAgICBzaG91bGRMb2FkSGVhZGVyRXhjaGFuZ2VSYXRlLFxyXG4gICAgdWlMb2NhbGUsXHJcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRW5hYmxlRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChpc0NyZWF0ZU1vZGUgfHwgaXNMb2FkaW5nIHx8ICFoZWFkZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY2FuRWRpdEFueUN1cnJlbnQpIHtcclxuICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XHJcbiAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGhlYWRlcik7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0VkaXRpbmdFbmFibGVkXCIsIFwiRWRpdGluZyBlbmFibGVkXCIpKTtcclxuICB9LCBbY2FuRWRpdEFueUN1cnJlbnQsIGhlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNDcmVhdGVNb2RlLCBpc0xvYWRpbmcsIG9uRm9yYmlkZGVuXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNhbmNlbEVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCIsIHtcclxuICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc0VkaXRpbmcpIHJldHVybjtcclxuXHJcbiAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIoaGVhZGVyKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKSk7XHJcbiAgfSwgW2hlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmddKTtcclxuXHJcbiAgLy8gT3BlbnMgZXhwZW5zZSBzaGVldCBjcmVhdGUgbW9kZSBmcm9tIGxpc3QtbGV2ZWwgZW50cnkgcG9pbnRzLlxyXG4gIGNvbnN0IGhhbmRsZU9wZW5DcmVhdGVTaGVldE1vZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UpIHtcclxuICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/bW9kZT1jcmVhdGVcIiwge1xyXG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcclxuICAgIH0pO1xyXG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgb25Gb3JiaWRkZW5dKTtcclxuXHJcbiAgLy8gT3BlbnMgZXhwZW5zZSBsaW5lIGNyZWF0ZSBtb2RlIGZyb20gYW4gZXhpc3RpbmcgZXhwZW5zZSBzaGVldCBkZXRhaWwuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFzaGVldElkIHx8ICFjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzKSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXRMaW5lRGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzaGVldElkKX0mbW9kZT1jcmVhdGVgO1xyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsLCB7XHJcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxyXG4gICAgfSk7XHJcbiAgfSwgW2NhblVzZUZ1bGxFZGl0RmVhdHVyZXMsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nLCBvbkZvcmJpZGRlbiwgc2hlZXRJZF0pO1xyXG5cclxuICAvLyBPcGVucyB0aWNrZXRzIHBhZ2UgZnJvbSBleHBlbnNlIHNoZWV0IGNvbnRleHQgdG8gY3JlYXRlIG9yIGxpbmsgdGlja2V0cy5cclxuICBjb25zdCBvcGVuVGlja2V0c0Zyb21TaGVldCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGFjdGlvbjogXCJuZXdcIiB8IFwibGlua1wiKSA9PiB7XHJcbiAgICAgIGlmICghc2hlZXRJZCB8fCAhY2FuVXNlRnVsbEVkaXRGZWF0dXJlcykge1xyXG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICAgIGFjdGlvbixcclxuICAgICAgICBob2phR2FzdG9zSWQ6IHNoZWV0SWQsXHJcbiAgICAgIH0pO1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXRzPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgb25Gb3JiaWRkZW4sIHNoZWV0SWRdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkNyZWF0ZVRpY2tldE1vZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBvcGVuVGlja2V0c0Zyb21TaGVldChcIm5ld1wiKTtcclxuICB9LCBbb3BlblRpY2tldHNGcm9tU2hlZXRdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgb3BlblRpY2tldHNGcm9tU2hlZXQoXCJsaW5rXCIpO1xyXG4gIH0sIFtvcGVuVGlja2V0c0Zyb21TaGVldF0pO1xyXG5cclxuICBjb25zdCBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0ID0gdXNlQ2FsbGJhY2soKGNyZWF0ZWRTaGVldElkOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IHNhZmVDcmVhdGVkU2hlZXRJZCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldElkKTtcclxuICAgIGlmICghc2FmZUNyZWF0ZWRTaGVldElkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlQ3JlYXRlZFNoZWV0SWQpfWA7XHJcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgbmF2aWdhdGVUb0xpbmVEZXRhaWwgPSB1c2VDYWxsYmFjayhcclxuICAgIChcclxuICAgICAgbGluZVJlY0lkOiBzdHJpbmcsXHJcbiAgICAgIG9wdGlvbnM/OiB7XHJcbiAgICAgICAgbW9kZT86IFwidmlld1wiIHwgXCJlZGl0XCI7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uPzogYm9vbGVhbjtcclxuICAgICAgICBieXBhc3NHdWFyZE9uY2U/OiBib29sZWFuO1xyXG4gICAgICB9XHJcbiAgICApID0+IHtcclxuICAgICAgY29uc3Qgc2FmZUxpbmVJZCA9IHNhZmVUZXh0KGxpbmVSZWNJZCk7XHJcbiAgICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQoc2hlZXRJZCk7XHJcbiAgICAgIGlmICghc2FmZUxpbmVJZCB8fCAhc2FmZVNoZWV0SWQpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IHNhZmVNb2RlID0gb3B0aW9ucz8ubW9kZSA9PT0gXCJlZGl0XCIgPyBcImVkaXRcIiA6IFwiXCI7XHJcbiAgICAgIGNvbnN0IHRhcmdldFVybCA9IGAvR2FzdG9zL0V4cGVuc2VTaGVldExpbmVEZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVTaGVldElkKX0mbGluZVJlY0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVMaW5lSWQpfSR7c2FmZU1vZGUgPyBgJm1vZGU9JHtzYWZlTW9kZX1gIDogXCJcIn1gO1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwsIHtcclxuICAgICAgICBhc2tDb25maXJtYXRpb246IG9wdGlvbnM/LmFza0NvbmZpcm1hdGlvbiA/PyB0cnVlLFxyXG4gICAgICAgIGJ5cGFzc0d1YXJkT25jZTogb3B0aW9ucz8uYnlwYXNzR3VhcmRPbmNlID8/IGZhbHNlLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc2hlZXRJZF1cclxuICApO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGVhZGVyLFxyXG4gICAgbGluZXMsXHJcbiAgICBsaW5lUGFnZSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGJ1c3ksXHJcbiAgICBzdGF0dXMsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtb2RhbEVycm9yLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0UHJvamVjdElkLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIGRyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlLFxyXG4gICAgaXNFeGNoYW5nZVJhdGVMb2FkaW5nLFxyXG4gICAgZXhjaGFuZ2VSYXRlTWVzc2FnZSxcclxuICAgIGV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yLFxyXG4gICAgcHJvamVjdFZhbHVlLFxyXG4gICAgaXNTaGVldEFwcHJvdmVkLFxyXG4gICAgaXNTaGVldFBhaWQsXHJcbiAgICBpc1NoZWV0TG9ja2VkLFxyXG4gICAgZXhjaGFuZ2VSYXRlVmFsdWUsXHJcbiAgICBzaG93RXhjaGFuZ2VSYXRlLFxyXG4gICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXHJcbiAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXHJcbiAgICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQ6IEVYQ0hBTkdFX1JBVEVfUkVGRVJFTkNFX0FNT1VOVCxcclxuICAgIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlLFxyXG4gICAgZGV0YWlsUG9saWN5LFxyXG4gICAgaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgIGNhbkVkaXRTdGF0dXNDb21tZW50Q3VycmVudCxcclxuICAgIGNhbkVkaXRBbnlDdXJyZW50LFxyXG4gICAgY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyxcclxuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50LFxyXG4gICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXHJcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXHJcbiAgICBzZXRMaW5lUGFnZSxcclxuICAgIHNldExpbmVzLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlT3BlbkNyZWF0ZVNoZWV0TW9kZSxcclxuICAgIGhhbmRsZU9wZW5DcmVhdGVMaW5lTW9kZSxcclxuICAgIGhhbmRsZU9wZW5DcmVhdGVUaWNrZXRNb2RlLFxyXG4gICAgaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlLFxyXG4gICAgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldCxcclxuICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG4vLyBTaGFyZWQgaWNvbiBnbHlwaHMgZm9yIHRoZSBleHBlbnNlIHNoZWV0IGRldGFpbCBhY3Rpb24gbWVudS5cclxuZXhwb3J0IGNvbnN0IE5ld1RpY2tldEljb24gPSAoKSA9PiAoXHJcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD17MS41fSBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzc05hbWU9XCJzaXplLTVcIj5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTEwIDIwaC01YTIgMiAwIDAgMSAtMiAtMnYtOWEyIDIgMCAwIDEgMiAtMmgxYTIgMiAwIDAgMCAyIC0yYTEgMSAwIDAgMSAxIC0xaDZhMSAxIDAgMCAxIDEgMWEyIDIgMCAwIDAgMiAyaDFhMiAyIDAgMCAxIDIgMnYyXCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0LjM2MiAxMS4xNWEzIDMgMCAxIDAgLTQuMTQ0IDQuMjYzXCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDIxdi00YTIgMiAwIDEgMSA0IDB2NFwiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAxOWg0XCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTIxIDE1djZcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IExpbmtUaWNrZXRJY29uID0gKCkgPT4gKFxyXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwic2l6ZS01XCI+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMy4xOSA4LjY4OGE0LjUgNC41IDAgMCAxIDEuMjQyIDcuMjQ0bC00LjUgNC41YTQuNSA0LjUgMCAwIDEtNi4zNjQtNi4zNjRsMS43NTctMS43NTdtMTMuMzUtLjYyMiAxLjc1Ny0xLjc1N2E0LjUgNC41IDAgMCAwLTYuMzY0LTYuMzY0bC00LjUgNC41YTQuNSA0LjUgMCAwIDAgMS4yNDIgNy4yNDRcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IE5ld0xpbmVJY29uID0gKCkgPT4gKFxyXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwic2l6ZS01XCI+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0zIDE5YzMuMzMzIC0yIDUgLTQgNSAtNmMwIC0zIC0xIC0zIC0yIC0zcy0yLjAzMiAxLjA4NSAtMiAzYy4wMzQgMi4wNDggMS42NTggMi44NzcgMi41IDRjMS41IDIgMi41IDIuNSAzLjUgMWMuNjY3IC0xIDEuMTY3IC0xLjgzMyAxLjUgLTIuNWMxIDIuMzMzIDIuMzMzIDMuNSA0IDMuNWgyLjVcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMjAgMTd2LTEyYzAgLTEuMTIxIC0uODc5IC0yIC0yIC0ycy0yIC44NzkgLTIgMnYxMmwyIDJsMiAtMlwiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNiA3aDRcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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Q3RDLGtDQUFrQyxXQUFXO0FBQUE7QUFBQSxJQUMvQyxJQUNFO0FBQUEsSUFFSCxDQUFDLFdBQVcsZ0JBQWdCLENBQUMsV0FBVyxhQUFhLENBQUMsV0FBVyw0QkFBNEIsQ0FBQyxXQUFXLGVBQ3hHO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxjQUFjLFdBQVc7QUFBQSxRQUN6QiwyQkFBMkIsU0FBUyxXQUFXLDRCQUE0QixXQUFXLFFBQVEsWUFBWTtBQUFBLFFBQzFHLGdCQUFnQixXQUFXO0FBQUEsUUFDM0IsVUFBVSxXQUFXO0FBQUEsUUFDckIsWUFBWSxLQUFLLHVCQUF1QixPQUFPO0FBQUEsUUFDL0MsV0FBVyxLQUFLLHlCQUF5QixrQ0FBa0M7QUFBQSxRQUMzRSxrQkFBa0IsV0FBVztBQUFBLFFBQzdCLGNBQWMsV0FBVztBQUFBLFFBQ3pCLGtCQUFrQixXQUFXO0FBQUEsUUFDN0IsWUFBWSxXQUFXO0FBQUE7QUFBQSxJQUN6QixJQUNFO0FBQUEsSUFFSCxXQUFXLHNCQUNWO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxTQUFTLFdBQVcsYUFBYTtBQUFBLFFBQ2pDLE1BQU0sV0FBVyxRQUFRLFdBQVc7QUFBQSxRQUNwQyxVQUFVLFdBQVc7QUFBQSxRQUNyQixlQUFlLFdBQVc7QUFBQTtBQUFBLElBQzVCLElBQ0U7QUFBQSxJQUVILFdBQVcsVUFDVjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsV0FBVyxLQUFLLDZCQUE2QixxQkFBa0I7QUFBQSxRQUMvRCxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixlQUFlLEtBQUssNkJBQTZCLHFCQUFrQjtBQUFBLFFBQ25FLFdBQVcsV0FBVztBQUFBO0FBQUEsSUFDeEIsSUFDRTtBQUFBLEtBQ047QUFFSjtBQUdBLElBQU0seUJBQXlCLE1BQU07QUFDbkMsU0FDRSw2Q0FBQyxnQ0FBcUIseUJBQXVCLE1BQzNDLHVEQUFDLGlDQUE4QixHQUNqQztBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsMEJBQXdCO0FBQ3hCLGlDQUErQjtBQUMvQixRQUFNLFNBQVMsU0FBUyxlQUFlLDJCQUEyQjtBQUNsRSxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLDBCQUF1QixDQUFFO0FBQ3JEO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxpQ0FBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJyZXNwb25zZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJSZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiXQp9Cg==
