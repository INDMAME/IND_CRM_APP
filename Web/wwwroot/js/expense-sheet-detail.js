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
} from "./chunks/chunk-3FZNNGIE.js";
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
        bottom: DETAIL_FAB_BASELINE_BOTTOM_PX,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb24udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2V4Y2hhbmdlUmF0ZUVudHJ5TW9kZUNhdGFsb2cudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VMaW5lc1RpbWVsaW5lLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC9FeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXIudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL0V4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udHJvbGxlci50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dC50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC9FeHBlbnNlU2hlZXREZXRhaWxJY29ucy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlU2hlZXRIZWFkZXJGb3JtLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZUxpbmVzVGltZWxpbmUgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZUxpbmVzVGltZWxpbmUudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXIgZnJvbSBcIi4vRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXMgZnJvbSBcIi4vRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXMudHN4XCI7XHJcbmltcG9ydCB7IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoLCB1c2VFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udHJvbGxlciB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250cm9sbGVyLnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IGNvbnN1bWVFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dC50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlIH0gZnJvbSBcIi4uL2xpc3QvdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlLnRzXCI7XG5pbXBvcnQgeyBjcmVhdGVJbml0aWFsRXhwZW5zZVNoZWV0c0ZpbHRlclNuYXBzaG90IH0gZnJvbSBcIi4uL2xpc3QvZXhwZW5zZUZpbHRlclNuYXBzaG90LnRzXCI7XG5pbXBvcnQgeyBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBY3RpbmdVc2VyLnRzXCI7XG5cclxuY29uc3QgREVUQUlMX0ZBQl9CQVNFTElORV9CT1RUT01fUFggPSAyNDtcbmNvbnN0IEVYUEVOU0VfU0hFRVRTX0xJU1RfVVJMID0gXCIvR2FzdG9zL0V4cGVuc2VTaGVldHNcIjtcclxuXHJcbi8vIEFwcGxpZXMgdGhlIHNlcnZlci1yZXNvbHZlZCBhY3RpbmcgdXNlciBmb3IgZW1haWwgZGVlcCBsaW5rcyBiZWZvcmUgZGV0YWlsIEFQSSBjYWxscyBydW4uXHJcbmNvbnN0IGJvb3RzdHJhcEV4cGVuc2VMaW5rQWN0aW5nVXNlciA9ICgpID0+IHtcclxuICBjb25zdCBhY3RpbmdVc2VySWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX0FDVElOR19VU0VSX0lEX18pO1xyXG4gIGlmICghYWN0aW5nVXNlcklkKSByZXR1cm47XHJcbiAgc2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZShhY3RpbmdVc2VySWQpO1xyXG59O1xyXG5cclxuY29uc3QgRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRlbnQgPSAoKSA9PiB7XHJcbiAgY29uc3QgY29udHJvbGxlciA9IHVzZUV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250cm9sbGVyKCk7XHJcbiAgY29uc3QgeyBjdXJyZW50QXhVc2VySWQgfSA9IHVzZUF1dGhDb250ZXh0KCk7XHJcbiAgY29uc3QgeyByZWFkQ2FjaGVkU3RhdGUsIHNhdmVDYWNoZWRTdGF0ZSB9ID0gdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlKCk7XHJcbiAgY29uc3QgY3JlYXRlZFNoZWV0UmV0dXJuSWRSZWYgPSBSZWFjdC51c2VSZWYoXCJcIik7XHJcblxyXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBjcmVhdGVkQ29udGV4dCA9IGNvbnN1bWVFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dChjb250cm9sbGVyLnNoZWV0SWQpO1xyXG4gICAgY3JlYXRlZFNoZWV0UmV0dXJuSWRSZWYuY3VycmVudCA9IGNyZWF0ZWRDb250ZXh0Py5zaGVldElkIHx8IFwiXCI7XHJcbiAgfSwgW2NvbnRyb2xsZXIuc2hlZXRJZF0pO1xyXG5cclxuICBjb25zdCBwcmVwYXJlQ3JlYXRlZFNoZWV0UmV0dXJuU3RhdGUgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBjcmVhdGVkU2hlZXRJZCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldFJldHVybklkUmVmLmN1cnJlbnQpO1xuICAgIGlmICghY3JlYXRlZFNoZWV0SWQpIHJldHVybiBmYWxzZTtcblxuICAgIHNhdmVDYWNoZWRTdGF0ZSh7XG4gICAgICBmaWx0ZXJzOiBjcmVhdGVJbml0aWFsRXhwZW5zZVNoZWV0c0ZpbHRlclNuYXBzaG90KGN1cnJlbnRBeFVzZXJJZCksXG4gICAgICBwYWdlOiAxLFxuICAgICAgc2Nyb2xsWTogMCxcbiAgICAgIGl0ZW1zOiBbXSxcbiAgICAgIHRvdGFsOiAwLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY3JlYXRlZFNoZWV0UmV0dXJuSWRSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LCBbY3VycmVudEF4VXNlcklkLCBzYXZlQ2FjaGVkU3RhdGVdKTtcclxuXHJcbiAgY29uc3QgcmVhcm1FeHBlbnNlU2hlZXRzUmV0dXJuU3RhdGUgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAocHJlcGFyZUNyZWF0ZWRTaGVldFJldHVyblN0YXRlKCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNhY2hlZFN0YXRlID0gcmVhZENhY2hlZFN0YXRlKCk7XHJcbiAgICBpZiAoIWNhY2hlZFN0YXRlKSByZXR1cm47XHJcbiAgICBzYXZlQ2FjaGVkU3RhdGUoY2FjaGVkU3RhdGUpO1xyXG4gIH0sIFtwcmVwYXJlQ3JlYXRlZFNoZWV0UmV0dXJuU3RhdGUsIHJlYWRDYWNoZWRTdGF0ZSwgc2F2ZUNhY2hlZFN0YXRlXSk7XHJcblxyXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBiYWNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxCYWNrQnRuXCIpO1xyXG4gICAgaWYgKCFiYWNrQnV0dG9uKSByZXR1cm47XHJcblxyXG4gICAgYmFja0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWJhY2stdXJsXCIsIEVYUEVOU0VfU0hFRVRTX0xJU1RfVVJMKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBiYWNrQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtYmFjay11cmxcIik7XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEJhY2tCdG5cIik7XHJcbiAgICBpZiAoIWJhY2tCdXR0b24pIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVUb3BiYXJCYWNrQ2xpY2sgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgIGNvbnN0IGV4ZWN1dGVCYWNrTmF2aWdhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICByZWFybUV4cGVuc2VTaGVldHNSZXR1cm5TdGF0ZSgpO1xyXG4gICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gRVhQRU5TRV9TSEVFVFNfTElTVF9VUkw7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbihleGVjdXRlQmFja05hdmlnYXRpb24pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGJhY2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVRvcGJhckJhY2tDbGljaywgdHJ1ZSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBiYWNrQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVUb3BiYXJCYWNrQ2xpY2ssIHRydWUpO1xyXG4gICAgfTtcclxuICB9LCBbcmVhcm1FeHBlbnNlU2hlZXRzUmV0dXJuU3RhdGVdKTtcclxuXHJcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGhhbmRsZU5hdGl2ZUJhY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKGV2ZW50Py5zdGF0ZSAmJiBldmVudC5zdGF0ZS5pbmRUcmFwID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBleGVjdXRlQmFja05hdmlnYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgcmVhcm1FeHBlbnNlU2hlZXRzUmV0dXJuU3RhdGUoKTtcclxuICAgICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShFWFBFTlNFX1NIRUVUU19MSVNUX1VSTCk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbihleGVjdXRlQmFja05hdmlnYXRpb24pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgaGFuZGxlTmF0aXZlQmFjayk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGhhbmRsZU5hdGl2ZUJhY2spO1xyXG4gICAgfTtcclxuICB9LCBbcmVhcm1FeHBlbnNlU2hlZXRzUmV0dXJuU3RhdGVdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XHJcbiAgICAgIDxFeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5c1xyXG4gICAgICAgIG1vZGFsPXtjb250cm9sbGVyLm1vZGFsfVxyXG4gICAgICAgIG1vZGFsRXJyb3I9e2NvbnRyb2xsZXIubW9kYWxFcnJvcn1cclxuICAgICAgICBzdGF0dXM9e2NvbnRyb2xsZXIuc3RhdHVzfVxyXG4gICAgICAgIGJ1c3k9e2NvbnRyb2xsZXIuYnVzeX1cclxuICAgICAgICBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGU9e2NvbnRyb2xsZXIuaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlfVxyXG4gICAgICAgIG1vZGFsTG9hZGluZ1RleHQ9e2NvbnRyb2xsZXIubW9kYWxMb2FkaW5nVGV4dH1cclxuICAgICAgICBtb2RhbENhbmNlbFRleHQ9e2NvbnRyb2xsZXIubW9kYWxDYW5jZWxUZXh0fVxyXG4gICAgICAgIG1vZGFsQ29uZmlybVRleHQ9e2NvbnRyb2xsZXIubW9kYWxDb25maXJtVGV4dH1cclxuICAgICAgICBtb2RhbEJvZHk9e2NvbnRyb2xsZXIubW9kYWxCb2R5fVxyXG4gICAgICAgIGNhbWVyYUlucHV0UmVmPXtjb250cm9sbGVyLmNhbWVyYUlucHV0UmVmfVxyXG4gICAgICAgIGdhbGxlcnlJbnB1dFJlZj17Y29udHJvbGxlci5nYWxsZXJ5SW5wdXRSZWZ9XHJcbiAgICAgICAgc291cmNlUGlja2VyT3Blbj17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuc291cmNlUGlja2VyT3Blbn1cclxuICAgICAgICBxdWlja1RpY2tldEJ1c3k9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmJ1c3l9XHJcbiAgICAgICAgcXVpY2tUaWNrZXRQcm9ncmVzc01lc3NhZ2U9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnByb2dyZXNzTWVzc2FnZX1cclxuICAgICAgICBxdWlja1RpY2tldFByb2dyZXNzU3RhZ2VzPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5wcm9ncmVzc1N0YWdlc31cclxuICAgICAgICBxdWlja1RpY2tldEVsYXBzZWRNcz17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cucHJvZ3Jlc3NFbGFwc2VkTXN9XHJcbiAgICAgICAgcXVpY2tUaWNrZXRFcnJvck1lc3NhZ2U9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmVycm9yTWVzc2FnZX1cclxuICAgICAgICBxdWlja1RpY2tldEF0dGVtcHRJZD17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuYXR0ZW1wdElkfVxyXG4gICAgICAgIHF1aWNrVGlja2V0VHJhY2VMaXN0PXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy50cmFjZUxpc3R9XHJcbiAgICAgICAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5PXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5oYXNQZW5kaW5nVXBsb2FkUmV0cnl9XHJcbiAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmU9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93Lmhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlfVxyXG4gICAgICAgIG9uQ29uZmlybT17Y29udHJvbGxlci5oYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm19XHJcbiAgICAgICAgb25DYW5jZWw9e2NvbnRyb2xsZXIuY2xvc2VDb25maXJtfVxyXG4gICAgICAgIG9uU2VsZWN0ZWRDYW1lcmFGaWxlPXsoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgdm9pZCBjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5oYW5kbGVTZWxlY3RlZEZpbGUoZmlsZSwgXCJjYW1lcmFcIik7XHJcbiAgICAgICAgfX1cclxuICAgICAgICBvblNlbGVjdGVkR2FsbGVyeUZpbGU9eyhmaWxlKSA9PiB7XHJcbiAgICAgICAgICB2b2lkIGNvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmhhbmRsZVNlbGVjdGVkRmlsZShmaWxlLCBcImdhbGxlcnlcIik7XHJcbiAgICAgICAgfX1cclxuICAgICAgICBvblNlbGVjdEZyb21DYW1lcmE9eygpID0+IHtcclxuICAgICAgICAgIHZvaWQgY29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuc2VsZWN0RnJvbUNhbWVyYShjb250cm9sbGVyLmNhbWVyYUlucHV0UmVmLmN1cnJlbnQpO1xyXG4gICAgICAgIH19XHJcbiAgICAgICAgb25TZWxlY3RGcm9tR2FsbGVyeT17KCkgPT4gY29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuc2VsZWN0RnJvbUdhbGxlcnkoY29udHJvbGxlci5nYWxsZXJ5SW5wdXRSZWYuY3VycmVudCl9XHJcbiAgICAgICAgb25DbG9zZVNvdXJjZVBpY2tlcj17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuY2xvc2VTb3VyY2VQaWNrZXJ9XHJcbiAgICAgICAgb25SZXRyeVBlbmRpbmdVcGxvYWQ9eygpID0+IHtcclxuICAgICAgICAgIHZvaWQgY29udHJvbGxlci5xdWlja1RpY2tldEZsb3cucmV0cnlQZW5kaW5nVXBsb2FkKCk7XHJcbiAgICAgICAgfX1cclxuICAgICAgICBvbkNsZWFyUXVpY2tUaWNrZXRFcnJvcj17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuY2xlYXJFcnJvcn1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxyXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGNvbnRyb2xsZXIuaXNMb2FkaW5nIHx8IGNvbnRyb2xsZXIuaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBzaXplLTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxyXG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge2NvbnRyb2xsZXIuZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntjb250cm9sbGVyLmVycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxyXG5cclxuICAgICAgeyFjb250cm9sbGVyLmlzTG9hZGluZyAmJiAhY29udHJvbGxlci5pc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgJiYgIWNvbnRyb2xsZXIuZXJyb3JNZXNzYWdlICYmIGNvbnRyb2xsZXIuaGVhZGVyID8gKFxyXG4gICAgICAgIDxFeHBlbnNlU2hlZXRIZWFkZXJGb3JtXHJcbiAgICAgICAgICBtb2RlPXt7XHJcbiAgICAgICAgICAgIGlzQ3JlYXRlTW9kZTogY29udHJvbGxlci5pc0NyZWF0ZU1vZGUsXHJcbiAgICAgICAgICAgIGlzRWRpdGluZzogY29udHJvbGxlci5pc0VkaXRpbmcsXHJcbiAgICAgICAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGNvbnRyb2xsZXIuY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICAgICAgICAgIHN0YXR1c0NvbW1lbnRNb2RlOiBjb250cm9sbGVyLnN0YXR1c0NvbW1lbnRNb2RlLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICAgIGN1cnJlbmN5TG9ja3M9e3tcclxuICAgICAgICAgICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXM6IGNvbnRyb2xsZXIuaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXHJcbiAgICAgICAgICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lczogY29udHJvbGxlci5pc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXHJcbiAgICAgICAgICAgIHNob3dFeGNoYW5nZVJhdGU6IGNvbnRyb2xsZXIuc2hvd0V4Y2hhbmdlUmF0ZSxcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgICBoZWFkZXI9e2NvbnRyb2xsZXIuaGVhZGVyfVxyXG4gICAgICAgICAgb3duZXJEaXNwbGF5PXtjb250cm9sbGVyLm93bmVyRGlzcGxheX1cclxuICAgICAgICAgIHByb2plY3RWYWx1ZT17Y29udHJvbGxlci5wcm9qZWN0VmFsdWV9XHJcbiAgICAgICAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeT17Y29udHJvbGxlci5ub3JtYWxpemVkRHJhZnRDdXJyZW5jeX1cclxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeT17Y29udHJvbGxlci5leGNoYW5nZVJhdGVCYXNlQ3VycmVuY3l9XHJcbiAgICAgICAgICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQ9e2NvbnRyb2xsZXIuZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50fVxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlVmFsdWU9e2NvbnRyb2xsZXIuZXhjaGFuZ2VSYXRlVmFsdWV9XHJcbiAgICAgICAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZT17Y29udHJvbGxlci5leGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZX1cclxuICAgICAgICAgIHRvdGFsQW1vdW50VGV4dD17Y29udHJvbGxlci50b3RhbEFtb3VudFRleHR9XHJcbiAgICAgICAgICBkcmFmdERlc2NyaXB0aW9uPXtjb250cm9sbGVyLmRyYWZ0RGVzY3JpcHRpb259XHJcbiAgICAgICAgICBkcmFmdFByb2plY3RJZD17Y29udHJvbGxlci5kcmFmdFByb2plY3RJZH1cclxuICAgICAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlPXtjb250cm9sbGVyLmRyYWZ0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgZHJhZnRFeGNoYW5nZVJhdGU9e2NvbnRyb2xsZXIuZHJhZnRFeGNoYW5nZVJhdGV9XHJcbiAgICAgICAgICBkcmFmdFJlaW1idXJzYWJsZUV4cGVuc2U9e2NvbnRyb2xsZXIuZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlfVxyXG4gICAgICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZT17Y29udHJvbGxlci5vZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlfVxyXG4gICAgICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlPXtjb250cm9sbGVyLm9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZX1cclxuICAgICAgICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlPXtjb250cm9sbGVyLm9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlfVxyXG4gICAgICAgICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlPXtjb250cm9sbGVyLnNldERyYWZ0RGVzY3JpcHRpb259XHJcbiAgICAgICAgICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlPXtjb250cm9sbGVyLnNldERyYWZ0UHJvamVjdElkfVxyXG4gICAgICAgICAgb25EcmFmdFByb2plY3RJZENvbW1pdD17Y29udHJvbGxlci5jb21taXREcmFmdFByb2plY3RJZH1cclxuICAgICAgICAgIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U9e2NvbnRyb2xsZXIuc2V0RHJhZnRDdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlPXtjb250cm9sbGVyLnNldERyYWZ0RXhjaGFuZ2VSYXRlfVxyXG4gICAgICAgICAgb25EcmFmdFJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2U9e2NvbnRyb2xsZXIuc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgeyFjb250cm9sbGVyLmlzQ3JlYXRlTW9kZSAmJiAhY29udHJvbGxlci5pc0xvYWRpbmcgJiYgIWNvbnRyb2xsZXIuaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlICYmICFjb250cm9sbGVyLmVycm9yTWVzc2FnZSA/IChcclxuICAgICAgICA8RXhwZW5zZUxpbmVzVGltZWxpbmVcbiAgICAgICAgICB2aXNpYmxlTGluZXM9e2NvbnRyb2xsZXIudmlzaWJsZUxpbmVzfVxuICAgICAgICAgIHJlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGU9e3NhZmVUZXh0KGNvbnRyb2xsZXIuZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5IHx8IGNvbnRyb2xsZXIuaGVhZGVyPy5jdXJyZW5jeUNvZGUpfVxuICAgICAgICAgIHRvdGFsTGluZVBhZ2VzPXtjb250cm9sbGVyLnRvdGFsTGluZVBhZ2VzfVxyXG4gICAgICAgICAgbGluZVBhZ2U9e2NvbnRyb2xsZXIubGluZVBhZ2V9XHJcbiAgICAgICAgICBsaW5lc0xhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lc1wiLCBcIkxpbmVzXCIpfVxyXG4gICAgICAgICAgZW1wdHlUZXh0PXtpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob0xpbmVzXCIsIFwiTm8gbGluZXMgZm9yIHRoaXMgZXhwZW5zZSBzaGVldC5cIil9XHJcbiAgICAgICAgICBwYWdpbmF0aW9uTGFiZWxzPXtjb250cm9sbGVyLnBhZ2luYXRpb25MYWJlbHN9XHJcbiAgICAgICAgICBjb250YWluZXJSZWY9e2NvbnRyb2xsZXIubGluZUNvbnRhaW5lclJlZn1cclxuICAgICAgICAgIG9uTGluZVBhZ2VDaGFuZ2U9e2NvbnRyb2xsZXIuc2V0TGluZVBhZ2V9XHJcbiAgICAgICAgICBvbk9wZW5MaW5lPXtjb250cm9sbGVyLm5hdmlnYXRlVG9MaW5lRGV0YWlsfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAge2NvbnRyb2xsZXIuc2hvd1N0YXR1c0FjdGlvbkJhciA/IChcclxuICAgICAgICA8RXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyXHJcbiAgICAgICAgICBhY3Rpb25zPXtjb250cm9sbGVyLmRldGFpbFBvbGljeS5zdGF0dXNBY3Rpb25zfVxyXG4gICAgICAgICAgYnVzeT17Y29udHJvbGxlci5idXN5IHx8IGNvbnRyb2xsZXIuaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e2NvbnRyb2xsZXIuYXJlU3RhdHVzQWN0aW9uc0Rpc2FibGVkfVxyXG4gICAgICAgICAgb25BY3Rpb25DbGljaz17Y29udHJvbGxlci5oYW5kbGVTdGF0dXNBY3Rpb25DbGlja31cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHtjb250cm9sbGVyLnNob3dGYWIgPyAoXHJcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXHJcbiAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgclx1MDBFMXBpZGFzXCIpfVxyXG4gICAgICAgICAgc2l6ZT17NzZ9XHJcbiAgICAgICAgICByaWdodD17MTZ9XHJcbiAgICAgICAgICBib3R0b209e0RFVEFJTF9GQUJfQkFTRUxJTkVfQk9UVE9NX1BYfVxuICAgICAgICAgIG1lbnVBcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgclx1MDBFMXBpZGFzXCIpfVxyXG4gICAgICAgICAgbWVudUl0ZW1zPXtjb250cm9sbGVyLmZhYk1lbnVJdGVtc31cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxyXG5jb25zdCBFeHBlbnNlU2hlZXREZXRhaWxQYWdlID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnMgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQ+XHJcbiAgICAgIDxFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udGVudCAvPlxyXG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cclxuICApO1xyXG59O1xyXG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XHJcbiAgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGgoKTtcclxuICBib290c3RyYXBFeHBlbnNlTGlua0FjdGluZ1VzZXIoKTtcclxuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2Utc2hlZXQtZGV0YWlsLXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VTaGVldERldGFpbFBhZ2UgLz4pO1xyXG59O1xyXG5cclxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXREZXRhaWxQYWdlO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgSW5mb1BvcG92ZXJJY29uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvSW5mb1BvcG92ZXJJY29uQnV0dG9uLnRzeFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IHsgaW5kRm9ybWF0LCBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRIZWFkZXIgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb24gZnJvbSBcIi4vRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTZWN0aW9uLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dCBmcm9tIFwiLi9FeHBlbnNlUHJvamVjdEZpbHRlcklucHV0LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVJlYWRPbmx5RmllbGQgZnJvbSBcIi4vRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4XCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VTdGF0dXNMYWJlbCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVN0YXR1c0NhdGFsb2cudHNcIjtcclxuaW1wb3J0IHtcclxuICBnZXRFZGl0YWJsZUV4cGVuc2VSZWltYnVyc2FibGVFeHBlbnNlT3B0aW9ucyxcclxuICBnZXRFeHBlbnNlUmVpbWJ1cnNhYmxlRXhwZW5zZUxhYmVsLFxyXG4gIG5vcm1hbGl6ZUV4cGVuc2VSZWltYnVyc2FibGVFeHBlbnNlLFxyXG59IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2VDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCxcclxuICBub3JtYWxpemVFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZSxcclxufSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4Y2hhbmdlUmF0ZUVudHJ5TW9kZUNhdGFsb2cudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZU51bWJlciwgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybU1vZGUgPSB7XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBjYW5FZGl0SGVhZGVyRmllbGRzOiBib29sZWFuO1xyXG4gIHN0YXR1c0NvbW1lbnRNb2RlOiBcImhpZGRlblwiIHwgXCJyZWFkXCI7XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5TG9ja3MgPSB7XHJcbiAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XHJcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xyXG4gIHNob3dFeGNoYW5nZVJhdGU6IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckZvcm1Qcm9wcyA9IHtcclxuICBtb2RlOiBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtTW9kZTtcclxuICBjdXJyZW5jeUxvY2tzOiBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeUxvY2tzO1xyXG4gIGhlYWRlcjogRXhwZW5zZVNoZWV0SGVhZGVyO1xyXG4gIG93bmVyRGlzcGxheT86IHN0cmluZztcclxuICBwcm9qZWN0VmFsdWU6IHN0cmluZztcclxuICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeTogc3RyaW5nO1xyXG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeTogc3RyaW5nO1xyXG4gIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudDogbnVtYmVyO1xyXG4gIGV4Y2hhbmdlUmF0ZVZhbHVlOiBzdHJpbmc7XHJcbiAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2U6IHN0cmluZztcclxuICB0b3RhbEFtb3VudFRleHQ6IHN0cmluZztcclxuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZHJhZnRQcm9qZWN0SWQ6IHN0cmluZztcclxuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlOiBzdHJpbmc7XHJcbiAgZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlOiBudW1iZXIgfCBudWxsO1xyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWU6IHN0cmluZztcclxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGU6IHN0cmluZztcclxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZTogc3RyaW5nO1xyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdFByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdFByb2plY3RJZENvbW1pdD86ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRSZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfTU9ERV9QUkVGSVhfUEFUVEVSTiA9IC9eVFxcLj9DXFwuP1xccyovaTtcclxuY29uc3QgQUxJR05FRF9GSUVMRF9DT05UQUlORVJfQ0xBU1NfTkFNRSA9IFwic3BhY2UteS0xLjVcIjtcclxuY29uc3QgQUxJR05FRF9GSUVMRF9MQUJFTF9DTEFTU19OQU1FID0gXCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGQgaW5saW5lLWZsZXggaC02IGl0ZW1zLWNlbnRlciBsZWFkaW5nLW5vbmVcIjtcclxuXHJcbi8vIFB1cmUgcHJlc2VudGF0aW9uYWwgaGVhZGVyIGZvcm0gZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsL2NyZWF0ZSBzY3JlZW5zLlxyXG5jb25zdCBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtID0gKHtcclxuICBtb2RlLFxyXG4gIGN1cnJlbmN5TG9ja3MsXHJcbiAgaGVhZGVyLFxyXG4gIG93bmVyRGlzcGxheSA9IFwiXCIsXHJcbiAgcHJvamVjdFZhbHVlLFxyXG4gIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxyXG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcclxuICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQsXHJcbiAgZXhjaGFuZ2VSYXRlVmFsdWUsXHJcbiAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXHJcbiAgdG90YWxBbW91bnRUZXh0LFxyXG4gIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXHJcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlLFxyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZSxcclxuICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlLFxyXG4gIG9uRHJhZnRQcm9qZWN0SWRDb21taXQsXHJcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZSxcclxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlLFxyXG4gIG9uRHJhZnRSZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlLFxyXG59OiBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtUHJvcHMpID0+IHtcclxuICBjb25zdCB7IGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nLCBjYW5FZGl0SGVhZGVyRmllbGRzLCBzdGF0dXNDb21tZW50TW9kZSB9ID0gbW9kZTtcclxuICBjb25zdCB7IGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLCBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsIHNob3dFeGNoYW5nZVJhdGUgfSA9IGN1cnJlbmN5TG9ja3M7XHJcbiAgY29uc3QgaXNGb3JlaWduQ3VycmVuY3kgPVxyXG4gICAgaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMgJiYgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgIT09IFwiXCIgJiYgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgIT09IGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeTtcclxuICBjb25zdCBleHBlbnNlQ3VycmVuY3lMYWJlbCA9IGlzRm9yZWlnbkN1cnJlbmN5XHJcbiAgICA/IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4cGVuc2VDdXJyZW5jeVwiLCBcIkV4cGVuc2UgY3VycmVuY3lcIilcclxuICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKTtcclxuICBjb25zdCBzdGF0dXNWYWx1ZSA9XHJcbiAgICBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzID09PSBudWxsIHx8IGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgPT09IHVuZGVmaW5lZFxyXG4gICAgICA/IFwiLVwiXHJcbiAgICAgIDogZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMpO1xyXG4gIGNvbnN0IGhlYWRlckN1cnJlbmN5Q29kZSA9IHNhZmVUZXh0KGhlYWRlci5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3QgYmFzZUN1cnJlbmN5Q29kZSA9IHNhZmVUZXh0KGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCByZWltYnVyc2FibGVFeHBlbnNlT3B0aW9ucyA9IFJlYWN0LnVzZU1lbW8oKCkgPT4gZ2V0RWRpdGFibGVFeHBlbnNlUmVpbWJ1cnNhYmxlRXhwZW5zZU9wdGlvbnMoKSwgW10pO1xyXG4gIGNvbnN0IHJlaW1idXJzYWJsZUV4cGVuc2VUaXRsZSA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1JlaW1idXJzYWJsZUV4cGVuc2VcIiwgXCJSZWltYnVyc2FibGVcIik7XHJcbiAgY29uc3QgcmVpbWJ1cnNhYmxlRXhwZW5zZUluZm9UZXh0ID0gaW5kVChcclxuICAgIFwiRXhwZW5zZVNoZWV0c19SZWltYnVyc2FibGVfSW5mb1BvcG92ZXJfVGV4dFwiLFxyXG4gICAgJ1RoaXMgdmFsdWUgY2FuIGJlIHNldCBhcyB0aGUgaGVhZGVyIGRlZmF1bHQuIElmIGl0IGlzIGNoYW5nZWQgbGF0ZXIsIHlvdSBjYW4gdXBkYXRlIGFsbCBsaW5lcyB3aXRoIHRoZSBuZXcgdmFsdWUuIElmIGEgbGluZSBjaGFuZ2VzIHRoZSBpbmhlcml0ZWQgdmFsdWUsIHRoZSBoZWFkZXIgc3dpdGNoZXMgdG8gXCJCb3RoXCIuJ1xyXG4gICk7XHJcbiAgY29uc3QgcmVpbWJ1cnNhYmxlRXhwZW5zZUluZm9BcmlhTGFiZWwgPSBpbmRUKFxyXG4gICAgXCJFeHBlbnNlU2hlZXRzX1JlaW1idXJzYWJsZV9JbmZvUG9wb3Zlcl9BcmlhXCIsXHJcbiAgICBcIlNob3cgcmVpbWJ1cnNhYmxlIGluZm9ybWF0aW9uXCJcclxuICApO1xyXG4gIGNvbnN0IHJlaW1idXJzYWJsZUV4cGVuc2VWYWx1ZSA9IG5vcm1hbGl6ZUV4cGVuc2VSZWltYnVyc2FibGVFeHBlbnNlKFxyXG4gICAgaXNFZGl0aW5nID8gZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlIDogaGVhZGVyLnJlaW1idXJzYWJsZUV4cGVuc2VcclxuICApO1xyXG4gIGNvbnN0IGhhc0VkaXRhYmxlUmVpbWJ1cnNhYmxlRXhwZW5zZVZhbHVlID0gcmVpbWJ1cnNhYmxlRXhwZW5zZU9wdGlvbnMuc29tZShcclxuICAgIChvcHRpb24pID0+IE51bWJlcihvcHRpb24udmFsdWUpID09PSByZWltYnVyc2FibGVFeHBlbnNlVmFsdWVcclxuICApO1xyXG4gIGNvbnN0IHJlaW1idXJzYWJsZUV4cGVuc2VMYWJlbCA9IGdldEV4cGVuc2VSZWltYnVyc2FibGVFeHBlbnNlTGFiZWwocmVpbWJ1cnNhYmxlRXhwZW5zZVZhbHVlKTtcclxuICBjb25zdCBzZWxlY3RlZFJlaW1idXJzYWJsZUV4cGVuc2VPcHRpb24gPSBSZWFjdC51c2VNZW1vKFxyXG4gICAgKCkgPT5cclxuICAgICAgaGFzRWRpdGFibGVSZWltYnVyc2FibGVFeHBlbnNlVmFsdWVcclxuICAgICAgICA/IHVuZGVmaW5lZFxyXG4gICAgICAgIDogeyB2YWx1ZTogU3RyaW5nKHJlaW1idXJzYWJsZUV4cGVuc2VWYWx1ZSksIHRleHQ6IHJlaW1idXJzYWJsZUV4cGVuc2VMYWJlbCB9LFxyXG4gICAgW2hhc0VkaXRhYmxlUmVpbWJ1cnNhYmxlRXhwZW5zZVZhbHVlLCByZWltYnVyc2FibGVFeHBlbnNlTGFiZWwsIHJlaW1idXJzYWJsZUV4cGVuc2VWYWx1ZV1cclxuICApO1xyXG4gIC8vIFN0YXR1cyBjb21tZW50IGlzIG5vdyBlZGl0ZWQgb25seSBpbiB0aGUgc3RhdHVzIHRyYW5zaXRpb24gcG9wdXAuXHJcbiAgY29uc3Qgc3RhdHVzQ29tbWVudFZhbHVlID0gc2FmZVRleHQoaGVhZGVyLmVzdGFkb0NvbWVudGFyaW9zKTtcclxuICBjb25zdCBzaG93U3RhdHVzQ29tbWVudEZpZWxkID0gIWlzQ3JlYXRlTW9kZSAmJiBzdGF0dXNDb21tZW50TW9kZSAhPT0gXCJoaWRkZW5cIjtcclxuICBjb25zdCBwYXJzZWREcmFmdEV4Y2hhbmdlUmF0ZSA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChkcmFmdEV4Y2hhbmdlUmF0ZSk7XHJcbiAgY29uc3QgcGFyc2VkT2ZmaWNpYWxSYXdSYXRlID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUpO1xyXG4gIGNvbnN0IGJhc2VFeGNoYW5nZVJhdGVWYWx1ZSA9XHJcbiAgICBwYXJzZWREcmFmdEV4Y2hhbmdlUmF0ZSAhPSBudWxsXHJcbiAgICAgID8gcGFyc2VkRHJhZnRFeGNoYW5nZVJhdGVcclxuICAgICAgOiBwYXJzZWRPZmZpY2lhbFJhd1JhdGUgIT0gbnVsbFxyXG4gICAgICAgID8gcGFyc2VkT2ZmaWNpYWxSYXdSYXRlICogZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50XHJcbiAgICAgICAgOiBudWxsO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZUluZm9WYWx1ZSA9IGZvcm1hdEV4cGVuc2VOdW1iZXIoXHJcbiAgICBiYXNlRXhjaGFuZ2VSYXRlVmFsdWUgIT0gbnVsbCA/IGJhc2VFeGNoYW5nZVJhdGVWYWx1ZSAvIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCA6IG51bGwsXHJcbiAgICB7XHJcbiAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogNyxcclxuICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiA3LFxyXG4gICAgICB1c2VHcm91cGluZzogZmFsc2UsXHJcbiAgICAgIGZhbGxiYWNrOiBcIjAuMDAwMDAwMFwiLFxyXG4gICAgfVxyXG4gICk7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlTW9kZVZhbHVlID0gbm9ybWFsaXplRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGUoaGVhZGVyLmV4Y2hhbmdlUmF0ZU1vZGUpID8/IDA7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlTW9kZUtleSA9XHJcbiAgICBleGNoYW5nZVJhdGVNb2RlVmFsdWUgPT09IDFcclxuICAgICAgPyBcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0V4Y2hhbmdlUmF0ZU1vZGVfTWFudWFsXCJcclxuICAgICAgOiBcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0V4Y2hhbmdlUmF0ZU1vZGVfT2ZmaWNpYWxcIjtcclxuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlRmFsbGJhY2sgPSBleGNoYW5nZVJhdGVNb2RlVmFsdWUgPT09IDEgPyBcIlQuQy4gTWFudWFsXCIgOiBcIlQuQy4gT2ZpY2lhbFwiO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCA9XHJcbiAgICAoZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbChleGNoYW5nZVJhdGVNb2RlVmFsdWUpIHx8IGluZFQoZXhjaGFuZ2VSYXRlTW9kZUtleSwgZXhjaGFuZ2VSYXRlTW9kZUZhbGxiYWNrKSlcclxuICAgICAgLnJlcGxhY2UoRVhDSEFOR0VfUkFURV9NT0RFX1BSRUZJWF9QQVRURVJOLCBcIlwiKVxyXG4gICAgICAudHJpbSgpXHJcbiAgICAgIC50b0xvd2VyQ2FzZSgpIHx8IChleGNoYW5nZVJhdGVNb2RlVmFsdWUgPT09IDEgPyBcIm1hbnVhbFwiIDogXCJvZmljaWFsXCIpO1xyXG4gIGNvbnN0IGhhc0VuZHBvaW50RXhjaGFuZ2VSYXRlRGF0YSA9XHJcbiAgICAhIXNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUpIHx8ICEhc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKSB8fCAhIXNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKTtcclxuICBjb25zdCBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9EYXRlID0gc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKSB8fCBpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKTtcclxuICBjb25zdCBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9Tb3VyY2UgPSBzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSlcclxuICAgIC5yZXBsYWNlKC9cXHMqXFwoW14oKV0qXFwpXFxzKi9nLCBcIiBcIilcclxuICAgIC5yZXBsYWNlKC9cXHN7Mix9L2csIFwiIFwiKVxyXG4gICAgLnRyaW0oKSB8fCBpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKTtcclxuICBjb25zdCBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlID0gaW5kRm9ybWF0KFxyXG4gICAgXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9JbmZvUG9wb3Zlcl9EZXRhaWxcIixcclxuICAgIFwiVGlwbyBkZSBjYW1iaW8gb2J0ZW5pZG8gezB9XFxuRmVjaGE6IHsxfVxcbk9yaWdlbjogezJ9XCIsXHJcbiAgICBzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKSB8fCBcIjAuMDAwMDAwMFwiLFxyXG4gICAgZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvRGF0ZSxcclxuICAgIGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb1NvdXJjZVxyXG4gICk7XHJcbiAgY29uc3Qgc3RvcmVkRXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBpbmRGb3JtYXQoXHJcbiAgICBcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX0luZm9Qb3BvdmVyX1N0b3JlZFwiLFxyXG4gICAgXCJUaXBvIGRlIGNhbWJpbyB7MH0gezF9XCIsXHJcbiAgICBleGNoYW5nZVJhdGVNb2RlTGFiZWwsXHJcbiAgICBleGNoYW5nZVJhdGVJbmZvVmFsdWVcclxuICApO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlID0gaGFzRW5kcG9pbnRFeGNoYW5nZVJhdGVEYXRhID8gZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA6IHN0b3JlZEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlO1xyXG4gIGNvbnN0IHJlaW1idXJzYWJsZUV4cGVuc2VMYWJlbENvbnRlbnQgPSAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaC02IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XHJcbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9e0FMSUdORURfRklFTERfTEFCRUxfQ0xBU1NfTkFNRX0+e3JlaW1idXJzYWJsZUV4cGVuc2VUaXRsZX08L2xhYmVsPlxyXG4gICAgICA8SW5mb1BvcG92ZXJJY29uQnV0dG9uXHJcbiAgICAgICAgY29udGVudD17cmVpbWJ1cnNhYmxlRXhwZW5zZUluZm9UZXh0fVxyXG4gICAgICAgIGFyaWFMYWJlbD17cmVpbWJ1cnNhYmxlRXhwZW5zZUluZm9BcmlhTGFiZWx9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwic2hyaW5rLTBcIlxyXG4gICAgICAgIHBhbmVsQ2xhc3NOYW1lPVwibWF4LXctW21pbigzMjBweCxjYWxjKDEwMHZ3LTFyZW0pKV1cIlxyXG4gICAgICAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxuICBjb25zdCByZWltYnVyc2FibGVFeHBlbnNlRmllbGQgPVxyXG4gICAgaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMgPyAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtBTElHTkVEX0ZJRUxEX0NPTlRBSU5FUl9DTEFTU19OQU1FfT5cclxuICAgICAgICB7cmVpbWJ1cnNhYmxlRXhwZW5zZUxhYmVsQ29udGVudH1cclxuICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgIGxhYmVsPXtyZWltYnVyc2FibGVFeHBlbnNlVGl0bGV9XHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj17cmVpbWJ1cnNhYmxlRXhwZW5zZVRpdGxlfVxyXG4gICAgICAgICAgb3B0aW9ucz17cmVpbWJ1cnNhYmxlRXhwZW5zZU9wdGlvbnN9XHJcbiAgICAgICAgICBzZWxlY3RlZE9wdGlvbj17c2VsZWN0ZWRSZWltYnVyc2FibGVFeHBlbnNlT3B0aW9ufVxyXG4gICAgICAgICAgdmFsdWU9e1N0cmluZyhyZWltYnVyc2FibGVFeHBlbnNlVmFsdWUpfVxyXG4gICAgICAgICAgb25DaGFuZ2U9eyh2YWx1ZSkgPT4gb25EcmFmdFJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2Uobm9ybWFsaXplRXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2UodmFsdWUpKX1cclxuICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nIHx8ICFjYW5FZGl0SGVhZGVyRmllbGRzfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmcgfHwgIWNhbkVkaXRIZWFkZXJGaWVsZHN9XHJcbiAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLXNoZWV0LXJlaW1idXJzYWJsZS1leHBlbnNlXCJcclxuICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgICAgICBjb250YWluZXJDbGFzc05hbWU9XCJzcGFjZS15LTBcIlxyXG4gICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cclxuICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICkgOiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtBTElHTkVEX0ZJRUxEX0NPTlRBSU5FUl9DTEFTU19OQU1FfT5cclxuICAgICAgICB7cmVpbWJ1cnNhYmxlRXhwZW5zZUxhYmVsQ29udGVudH1cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XHJcbiAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGluZC1yZWFkb25seS1maWVsZFwiXHJcbiAgICAgICAgICAgIHZhbHVlPXtyZWltYnVyc2FibGVFeHBlbnNlTGFiZWwgfHwgXCItXCJ9XHJcbiAgICAgICAgICAgIHJlYWRPbmx5XHJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e3JlaW1idXJzYWJsZUV4cGVuc2VUaXRsZX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICBjb25zdCBjdXJyZW5jeUZpZWxkID0gKFxyXG4gICAgPEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvblxyXG4gICAgICBpbnRlcmFjdGlvbj17eyBpc0VkaXRpbmcsIGNhbkVkaXRIZWFkZXJGaWVsZHMgfX1cclxuICAgICAgY3VycmVuY3lTdGF0ZT17eyBpc0ZvcmVpZ25DdXJyZW5jeSwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcywgc2hvd0V4Y2hhbmdlUmF0ZSB9fVxyXG4gICAgICBleHBlbnNlQ3VycmVuY3lMYWJlbD17ZXhwZW5zZUN1cnJlbmN5TGFiZWx9XHJcbiAgICAgIGhlYWRlckN1cnJlbmN5Q29kZT17aGVhZGVyQ3VycmVuY3lDb2RlfVxyXG4gICAgICBiYXNlQ3VycmVuY3lDb2RlPXtiYXNlQ3VycmVuY3lDb2RlfVxyXG4gICAgICBkcmFmdEN1cnJlbmN5Q29kZT17ZHJhZnRDdXJyZW5jeUNvZGV9XHJcbiAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlPXtkcmFmdEV4Y2hhbmdlUmF0ZX1cclxuICAgICAgZXhjaGFuZ2VSYXRlVmFsdWU9e2V4Y2hhbmdlUmF0ZVZhbHVlfVxyXG4gICAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZT17ZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2V9XHJcbiAgICAgIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudD17ZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50fVxyXG4gICAgICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZT17ZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2V9XHJcbiAgICAgIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U9e29uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XHJcbiAgICAgIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U9e29uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2V9XHJcbiAgICAvPlxyXG4gICk7XHJcbiAgY29uc3QgcHJvamVjdEZpZWxkID1cclxuICAgICFpc0NyZWF0ZU1vZGUgJiYgaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMgPyAoXHJcbiAgICAgIDxFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0XHJcbiAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxyXG4gICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfUHJvamVjdF9QbGFjZWhvbGRlclwiLCBcIlByb2plY3QgaWRcIil9XHJcbiAgICAgICAgdmFsdWU9e2RyYWZ0UHJvamVjdElkfVxyXG4gICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0UHJvamVjdElkQ2hhbmdlfVxyXG4gICAgICAgIG9uQ29tbWl0PXtvbkRyYWZ0UHJvamVjdElkQ29tbWl0fVxyXG4gICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nIHx8ICFjYW5FZGl0SGVhZGVyRmllbGRzfVxyXG4gICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nIHx8ICFjYW5FZGl0SGVhZGVyRmllbGRzfVxyXG4gICAgICAgIGNvbnRhaW5lckNsYXNzTmFtZT17QUxJR05FRF9GSUVMRF9DT05UQUlORVJfQ0xBU1NfTkFNRX1cclxuICAgICAgICBsYWJlbENsYXNzTmFtZT17QUxJR05FRF9GSUVMRF9MQUJFTF9DTEFTU19OQU1FfVxyXG4gICAgICAvPlxyXG4gICAgKSA6ICFpc0NyZWF0ZU1vZGUgPyAoXG4gICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxuICAgICAgICB2YWx1ZT17cHJvamVjdFZhbHVlfVxuICAgICAgICBjb250YWluZXJDbGFzc05hbWU9e0FMSUdORURfRklFTERfQ09OVEFJTkVSX0NMQVNTX05BTUV9XG4gICAgICAgIGxhYmVsQ2xhc3NOYW1lPXtBTElHTkVEX0ZJRUxEX0xBQkVMX0NMQVNTX05BTUV9XG4gICAgICAvPlxyXG4gICAgKSA6IG51bGw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cclxuICAgICAgICB7aXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtOmNvbC1zcGFuLTIgc3BhY2UteS0xLjVcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0RGVzY3JpcHRpb259XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cclxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e3NhZmVUZXh0KGhlYWRlci5kZXNjcmlwdGlvbikgfHwgXCItXCJ9XHJcbiAgICAgICAgICAgIGZ1bGxXaWR0aFxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApfVxyXG4gICAgICAgIHtpc0NyZWF0ZU1vZGUgJiYgaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfUHJvamVjdF9QbGFjZWhvbGRlclwiLCBcIlByb2plY3QgaWRcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtkcmFmdFByb2plY3RJZH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRQcm9qZWN0SWRDaGFuZ2V9XHJcbiAgICAgICAgICAgIG9uQ29tbWl0PXtvbkRyYWZ0UHJvamVjdElkQ29tbWl0fVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCAhY2FuRWRpdEhlYWRlckZpZWxkc31cclxuICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmcgfHwgIWNhbkVkaXRIZWFkZXJGaWVsZHN9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiBpc0NyZWF0ZU1vZGUgPyAoXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX0gdmFsdWU9e3Byb2plY3RWYWx1ZX0gLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHshaXNDcmVhdGVNb2RlID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGl0ZW1zLXN0YXJ0IGdhcC0zIG1kOmNvbC1zcGFuLTIgbWQ6Z2FwLTRcIj5cclxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Ub3RhbEFtb3VudFwiLCBcIlJlaW1idXJzZW1lbnQgYW1vdW50XCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17dG90YWxBbW91bnRUZXh0fVxuICAgICAgICAgICAgICB2YWx1ZUFsaWduPVwicmlnaHRcIlxyXG4gICAgICAgICAgICAgIGNvbnRhaW5lckNsYXNzTmFtZT17QUxJR05FRF9GSUVMRF9DT05UQUlORVJfQ0xBU1NfTkFNRX1cclxuICAgICAgICAgICAgICBsYWJlbENsYXNzTmFtZT17QUxJR05FRF9GSUVMRF9MQUJFTF9DTEFTU19OQU1FfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICB7Y3VycmVuY3lGaWVsZH1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIHtpc0NyZWF0ZU1vZGUgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgaXRlbXMtc3RhcnQgZ2FwLTMgbWQ6Y29sLXNwYW4tMiBtZDpnYXAtNFwiPlxyXG4gICAgICAgICAgICB7cmVpbWJ1cnNhYmxlRXhwZW5zZUZpZWxkfVxyXG4gICAgICAgICAgICB7Y3VycmVuY3lGaWVsZH1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIHshaXNDcmVhdGVNb2RlID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0zIG1kOmNvbC1zcGFuLTIgbWQ6Z2FwLTRcIj5cclxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TdGF0dXNcIiwgXCJTdGF0dXNcIil9IHZhbHVlPXtzdGF0dXNWYWx1ZX0gLz5cclxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9GaWVsZF9JZGVudGlmaWVyXCIsIFwiSWRlbnRpZmllclwiKX1cclxuICAgICAgICAgICAgICB2YWx1ZT17c2FmZVRleHQoaGVhZGVyLmhvamFHYXN0b3NJZCkgfHwgXCItXCJ9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgICB7IWlzQ3JlYXRlTW9kZSA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgaXRlbXMtc3RhcnQgZ2FwLTMgbWQ6Y29sLXNwYW4tMiBtZDpnYXAtNFwiPlxuICAgICAgICAgICAge3JlaW1idXJzYWJsZUV4cGVuc2VGaWVsZH1cbiAgICAgICAgICAgIHtwcm9qZWN0RmllbGR9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7b3duZXJEaXNwbGF5ID8gKFxyXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Pd25lclVzZXJcIiwgXCJPd25lciB1c2VyXCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17b3duZXJEaXNwbGF5fVxyXG4gICAgICAgICAgICBmdWxsV2lkdGhcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAge3Nob3dTdGF0dXNDb21tZW50RmllbGQgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1N0YXR1c0NvbW1lbnRcIiwgXCJTdGF0dXMgY29tbWVudFwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e3N0YXR1c0NvbW1lbnRWYWx1ZSB8fCBcIi1cIn1cclxuICAgICAgICAgICAgZnVsbFdpZHRoXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24udHN4XCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeUludGVyYWN0aW9uID0ge1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBjYW5FZGl0SGVhZGVyRmllbGRzOiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVN0YXRlID0ge1xyXG4gIGlzRm9yZWlnbkN1cnJlbmN5OiBib29sZWFuO1xyXG4gIHNob3dFeGNoYW5nZVJhdGU6IGJvb2xlYW47XHJcbiAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XHJcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb25Qcm9wcyA9IHtcclxuICBpbnRlcmFjdGlvbjogRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lJbnRlcmFjdGlvbjtcclxuICBjdXJyZW5jeVN0YXRlOiBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVN0YXRlO1xyXG4gIGV4cGVuc2VDdXJyZW5jeUxhYmVsOiBzdHJpbmc7XHJcbiAgaGVhZGVyQ3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgYmFzZUN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcclxuICBleGNoYW5nZVJhdGVWYWx1ZTogc3RyaW5nO1xyXG4gIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlOiBzdHJpbmc7XHJcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50OiBudW1iZXI7XHJcbiAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U6IHN0cmluZztcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIE93bnMgdGhlIGN1cnJlbmN5IGFuZCBleGNoYW5nZS1yYXRlIFVJIHNvIHRoZSBoZWFkZXIgZm9ybSBzdGF5cyBjb21wYWN0LlxyXG5jb25zdCBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb24gPSAoe1xyXG4gIGhlYWRlckN1cnJlbmN5Q29kZSxcclxuICBiYXNlQ3VycmVuY3lDb2RlLFxyXG59OiBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb25Qcm9wcykgPT4ge1xyXG4gIGNvbnN0IHJlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGUgPSBiYXNlQ3VycmVuY3lDb2RlIHx8IGhlYWRlckN1cnJlbmN5Q29kZSB8fCBcIi1cIjtcclxuICBjb25zdCByZWltYnVyc2VtZW50Q3VycmVuY3lPcHRpb25zID0gUmVhY3QudXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFxyXG4gICAgKCkgPT4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdmFsdWU6IHJlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgdGV4dDogcmVpbWJ1cnNlbWVudEN1cnJlbmN5Q29kZSxcclxuICAgICAgICBpY29uOiA8RXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gY3VycmVuY3lDb2RlPXtyZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlfSBzaXplQ2xhc3NOYW1lPVwiaC02IHctNlwiIC8+LFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICAgIFtyZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlXVxyXG4gICk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1JlaW1idXJzZW1lbnRDdXJyZW5jeVwiLCBcIlJlaW1idXJzZW1lbnQgY3VycmVuY3lcIil9XHJcbiAgICAgIG9wdGlvbnM9e3JlaW1idXJzZW1lbnRDdXJyZW5jeU9wdGlvbnN9XHJcbiAgICAgIHZhbHVlPXtyZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlfVxyXG4gICAgICBvbkNoYW5nZT17KCkgPT4gdW5kZWZpbmVkfVxyXG4gICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5X1BsYWNlaG9sZGVyXCIsIFwiQ3VycmVuY3kgY29kZVwiKX1cclxuICAgICAgcmVhZE9ubHlcclxuICAgICAgZGlzYWJsZWRcclxuICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XG4gICAgICBzaG93TGFiZWxcbiAgICAgIHNlbGVjdGVkVGV4dE1vZGU9XCJ2YWx1ZVwiXG4gICAgICBkcm9wZG93bk1heEhlaWdodENsYXNzPVwibWF4LWgtOTZcIlxyXG4gICAgICBzZWxlY3RlZEljb25DbGFzc05hbWU9XCJoLTYgdy02XCJcclxuICAgICAgb3B0aW9uSWNvbkNsYXNzTmFtZT1cImgtNiB3LTZcIlxyXG4gICAgICBzZWxlY3RlZElucHV0UGFkZGluZ0NsYXNzTmFtZT1cInBsLTEyXCJcclxuICAgICAgY29udGFpbmVyQ2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIlxyXG4gICAgICBsYWJlbENsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZCBpbmxpbmUtZmxleCBoLTYgaXRlbXMtY2VudGVyIGxlYWRpbmctbm9uZVwiXHJcbiAgICAgIGlkQmFzZT1cImV4cGVuc2UtaGVhZGVyLWxvY2FsLWN1cnJlbmN5LXJlYWRvbmx5XCJcclxuICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgLz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTZWN0aW9uO1xyXG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBtYXBXaW5kb3dFbnVtT3B0aW9ucywgdHlwZSBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcblxyXG50eXBlIEV4Y2hhbmdlUmF0ZU1vZGVVaU1ldGEgPSB7XHJcbiAgbGFiZWxLZXk6IHN0cmluZztcclxuICBmYWxsYmFjazogc3RyaW5nO1xyXG59O1xyXG5cclxuY29uc3QgRVhDSEFOR0VfUkFURV9NT0RFX01FVEE6IFBhcnRpYWw8UmVjb3JkPEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ29kZSwgRXhjaGFuZ2VSYXRlTW9kZVVpTWV0YT4+ID0ge1xyXG4gIDA6IHtcclxuICAgIGxhYmVsS2V5OiBcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0V4Y2hhbmdlUmF0ZU1vZGVfT2ZmaWNpYWxcIixcclxuICAgIGZhbGxiYWNrOiBcIlQuQy4gT2ZpY2lhbFwiLFxyXG4gIH0sXHJcbiAgMToge1xyXG4gICAgbGFiZWxLZXk6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9NYW51YWxcIixcclxuICAgIGZhbGxiYWNrOiBcIlQuQy4gTWFudWFsXCIsXHJcbiAgfSxcclxufTtcclxuY29uc3QgRVhDSEFOR0VfUkFURV9NT0RFX0NPREVTOiBFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGVbXSA9IFswLCAxXTtcclxuXHJcbmNvbnN0IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ2F0YWxvZ09wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcclxuICBjb25zdCBzb3VyY2UgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIEFycmF5LmlzQXJyYXkod2luZG93Ll9fRVhQRU5TRV9FWENIQU5HRV9SQVRFX01PREVTX18pXHJcbiAgICA/IHdpbmRvdy5fX0VYUEVOU0VfRVhDSEFOR0VfUkFURV9NT0RFU19fXHJcbiAgICA6IFtdO1xyXG5cclxuICByZXR1cm4gbWFwV2luZG93RW51bU9wdGlvbnMoc291cmNlKS5maWx0ZXIoKG9wdGlvbikgPT4ge1xyXG4gICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKG9wdGlvbi52YWx1ZSk7XHJcbiAgICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpICYmIHBhcnNlZCA+PSAwO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDYXRhbG9nTGFiZWwgPSAodmFsdWU6IEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ29kZSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgbWF0Y2ggPSBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNhdGFsb2dPcHRpb25zKCkuZmluZCgob3B0aW9uKSA9PiBOdW1iZXIob3B0aW9uLnZhbHVlKSA9PT0gdmFsdWUpO1xyXG4gIHJldHVybiBtYXRjaD8udGV4dCB8fCBcIlwiO1xyXG59O1xyXG5cclxuLy8gS2VlcHMgZXhjaGFuZ2UgcmF0ZSBtb2RlIHZhbHVlcyBjb25zdHJhaW5lZCB0byBub24tbmVnYXRpdmUgbnVtZXJpYyBlbnVtIGNvZGVzLlxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGUgfCBudWxsID0+IHtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCBTdHJpbmcodmFsdWUpLnRyaW0oKSA9PT0gXCJcIikgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICBpZiAoTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpICYmIHBhcnNlZCA+PSAwKSB7XHJcbiAgICByZXR1cm4gcGFyc2VkO1xyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbi8vIEJ1aWxkcyBmaXhlZCBvcHRpb25zIGZvciB0aGUgZXhjaGFuZ2UgcmF0ZSBtb2RlIGZpbHRlci5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlT3B0aW9ucyA9ICgpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xyXG4gIGNvbnN0IGNhdGFsb2dPcHRpb25zID0gZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDYXRhbG9nT3B0aW9ucygpO1xyXG4gIGlmIChjYXRhbG9nT3B0aW9ucy5sZW5ndGggPiAwKSByZXR1cm4gY2F0YWxvZ09wdGlvbnM7XHJcblxyXG4gIHJldHVybiBFWENIQU5HRV9SQVRFX01PREVfQ09ERVNcclxuICAgIC5tYXAoKGNvZGUpID0+IHtcclxuICAgICAgY29uc3QgbWV0YSA9IEVYQ0hBTkdFX1JBVEVfTU9ERV9NRVRBW2NvZGVdO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHZhbHVlOiBTdHJpbmcoY29kZSksXHJcbiAgICAgICAgdGV4dDogbWV0YSA/IGluZFQobWV0YS5sYWJlbEtleSwgbWV0YS5mYWxsYmFjaykgOiBTdHJpbmcoY29kZSksXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8vIFJldHVybnMgYSBsb2NhbGl6ZWQgbW9kZSBsYWJlbCBvciBlbXB0eSB0ZXh0IGZvciBub24tc2VsZWN0ZWQgdmFsdWVzLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlKHZhbHVlKTtcclxuICBpZiAobm9ybWFsaXplZCA9PT0gbnVsbCkgcmV0dXJuIFwiXCI7XHJcbiAgY29uc3QgY2F0YWxvZ0xhYmVsID0gZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDYXRhbG9nTGFiZWwobm9ybWFsaXplZCk7XHJcbiAgaWYgKGNhdGFsb2dMYWJlbCkgcmV0dXJuIGNhdGFsb2dMYWJlbDtcclxuXHJcbiAgY29uc3QgbWV0YSA9IEVYQ0hBTkdFX1JBVEVfTU9ERV9NRVRBW25vcm1hbGl6ZWRdO1xyXG4gIHJldHVybiBtZXRhID8gaW5kVChtZXRhLmxhYmVsS2V5LCBtZXRhLmZhbGxiYWNrKSA6IFN0cmluZyhub3JtYWxpemVkKTtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XHJcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldExpbmUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgZnJvbSBcIi4vRXhwZW5zZVNlY3Rpb25EaXZpZGVyLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpbWVsaW5lQ2FyZCBmcm9tIFwiLi9FeHBlbnNlVGltZWxpbmVDYXJkLnRzeFwiO1xyXG5cclxudHlwZSBQYWdpbmF0aW9uTGFiZWxzID0ge1xyXG4gIGZpcnN0OiBzdHJpbmc7XHJcbiAgcHJldjogc3RyaW5nO1xyXG4gIG5leHQ6IHN0cmluZztcclxuICBsYXN0OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VMaW5lc1RpbWVsaW5lUHJvcHMgPSB7XG4gIHZpc2libGVMaW5lczogRXhwZW5zZVNoZWV0TGluZVtdO1xuICByZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIHRvdGFsTGluZVBhZ2VzOiBudW1iZXI7XHJcbiAgbGluZVBhZ2U6IG51bWJlcjtcclxuICBsaW5lc0xhYmVsOiBzdHJpbmc7XHJcbiAgZW1wdHlUZXh0OiBzdHJpbmc7XHJcbiAgcGFnaW5hdGlvbkxhYmVsczogUGFnaW5hdGlvbkxhYmVscztcclxuICBjb250YWluZXJSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIG9uTGluZVBhZ2VDaGFuZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XHJcbiAgb25PcGVuTGluZTogKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gRHVtYiB0aW1lbGluZSBmb3IgZXhwZW5zZSBzaGVldCBsaW5lcyB3aXRoIHN0YW5kYXJkIGNhcmQgYW5kIHBhZ2luYXRpb24gbGF5b3V0LlxyXG5jb25zdCBFeHBlbnNlTGluZXNUaW1lbGluZSA9ICh7XG4gIHZpc2libGVMaW5lcyxcbiAgcmVpbWJ1cnNlbWVudEN1cnJlbmN5Q29kZSxcbiAgdG90YWxMaW5lUGFnZXMsXHJcbiAgbGluZVBhZ2UsXHJcbiAgbGluZXNMYWJlbCxcclxuICBlbXB0eVRleHQsXHJcbiAgcGFnaW5hdGlvbkxhYmVscyxcclxuICBjb250YWluZXJSZWYsXHJcbiAgb25MaW5lUGFnZUNoYW5nZSxcclxuICBvbk9wZW5MaW5lLFxyXG59OiBFeHBlbnNlTGluZXNUaW1lbGluZVByb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNwYWNlLXktMFwiPlxyXG4gICAgICA8RXhwZW5zZVNlY3Rpb25EaXZpZGVyIGxhYmVsPXtsaW5lc0xhYmVsfSBjbGFzc05hbWU9XCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlci0tc3BhY2VkXCIgLz5cclxuXHJcbiAgICAgIHt2aXNpYmxlTGluZXMubGVuZ3RoID09PSAwID8gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtYm94IHRpbWVsaW5lLWVtcHR5XCIgZGF0YS1lbXB0eS10ZXh0PXtlbXB0eVRleHR9IC8+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgPGRpdiByZWY9e2NvbnRhaW5lclJlZn0gY2xhc3NOYW1lPVwidGltZWxpbmUtYm94XCI+XHJcbiAgICAgICAgICB7dmlzaWJsZUxpbmVzLm1hcCgobGluZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGluZUlkID0gc2FmZVRleHQobGluZS5saW5lUmVjSWQpO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBzYWZlVGV4dChsaW5lLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0IGFtb3VudFRleHQgPSBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koXG4gICAgICAgICAgICAgIGxpbmUudmlzaWJsZVJlaW1idXJzYWJsZVRvdGFsID8/IGxpbmUuYW1vdW50ID8/IG51bGwsXG4gICAgICAgICAgICAgIHJlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBsaW5rZWRUaWNrZXRGaWxlSWQgPSBzYWZlVGV4dChsaW5lLmZpbGVJZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RJZCA9IHNhZmVUZXh0KGxpbmUucHJvaklkKTtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZVBhcnRzID0gZm9ybWF0RXhwZW5zZURhdGVQYXJ0cyhzYWZlVGV4dChsaW5lLnRyYW5zRGF0ZSksIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiKTtcclxuICAgICAgICAgICAgY29uc3QgdGlja2V0U3RhdHVzSWNvbiA9IGxpbmtlZFRpY2tldEZpbGVJZCA/IChcclxuICAgICAgICAgICAgICA8c3ZnXHJcbiAgICAgICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgICAgICAgICAgIGZpbGw9XCJub25lXCJcclxuICAgICAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9ezEuNX1cclxuICAgICAgICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzaXplLTRcIlxyXG4gICAgICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgZD1cIk0xMy4xOSA4LjY4OGE0LjUgNC41IDAgMCAxIDEuMjQyIDcuMjQ0bC00LjUgNC41YTQuNSA0LjUgMCAwIDEtNi4zNjQtNi4zNjRsMS43NTctMS43NTdtMTMuMzUtLjYyMiAxLjc1Ny0xLjc1N2E0LjUgNC41IDAgMCAwLTYuMzY0LTYuMzY0bC00LjUgNC41YTQuNSA0LjUgMCAwIDAgMS4yNDIgNy4yNDRcIlxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgKSA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtsaW5lSWQgfHwgYCR7c2FmZVRleHQobGluZS50cmFuc0RhdGUpfS0ke2Rlc2NyaXB0aW9ufS0ke2Ftb3VudFRleHR9LSR7cHJvamVjdElkfWB9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgIDxFeHBlbnNlVGltZWxpbmVDYXJkXHJcbiAgICAgICAgICAgICAgICAgIGRhdGVQYXJ0cz17ZGF0ZVBhcnRzfVxyXG4gICAgICAgICAgICAgICAgICB0aXRsZT17ZGVzY3JpcHRpb24gfHwgbGluZUlkIHx8IFwiLVwifVxyXG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxyXG4gICAgICAgICAgICAgICAgICBvbk9wZW49eygpID0+IG9uT3BlbkxpbmUobGluZUlkKX1cclxuICAgICAgICAgICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJ0aW1lbGluZS1uYW1lIGV4cGVuc2UtbGluZS1jYXJkX190aXRsZVwiXHJcbiAgICAgICAgICAgICAgICAgIHN1YnRpdGxlQ2xhc3NOYW1lPVwiZXhwZW5zZS1zaGVldC1jYXJkX19zdWJ0aXRsZSBleHBlbnNlLWxpbmUtY2FyZF9fbWV0YVwiXHJcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0ljb249e3RpY2tldFN0YXR1c0ljb259XHJcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0ljb25DbGFzc05hbWU9XCJleHBlbnNlLWxpbmUtY2FyZF9fdGlja2V0LWljb25cIlxyXG4gICAgICAgICAgICAgICAgICBzdGF0dXNMYWJlbD17bGlua2VkVGlja2V0RmlsZUlkIHx8IHVuZGVmaW5lZH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxyXG4gICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsTGluZVBhZ2VzfVxyXG4gICAgICAgIGN1cnJlbnRQYWdlPXtsaW5lUGFnZX1cclxuICAgICAgICBvblBhZ2VDaGFuZ2U9e29uTGluZVBhZ2VDaGFuZ2V9XHJcbiAgICAgICAgbGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxyXG4gICAgICAvPlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlTGluZXNUaW1lbGluZTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFBhZ2VCb3R0b21BY3Rpb25zLCB7IFBhZ2VCb3R0b21BY3Rpb25CdXR0b24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1BhZ2VCb3R0b21BY3Rpb25zLnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb24gfSBmcm9tIFwiLi9leHBlbnNlU2hlZXREZXRhaWxQb2xpY3kudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyUHJvcHMgPSB7XHJcbiAgYWN0aW9uczogRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uW107XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgb25BY3Rpb25DbGljazogKGFjdGlvbjogRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyB0aGUgYm90dG9tIHRvb2xiYXIgZm9yIGV4cGVuc2Ugc2hlZXQgc3RhdHVzIHRyYW5zaXRpb25zLlxyXG5jb25zdCBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXIgPSAoeyBhY3Rpb25zLCBidXN5LCBkaXNhYmxlZCA9IGZhbHNlLCBvbkFjdGlvbkNsaWNrIH06IEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbkJhclByb3BzKSA9PiB7XHJcbiAgaWYgKGFjdGlvbnMubGVuZ3RoIDwgMSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPFBhZ2VCb3R0b21BY3Rpb25zIGFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfQm90dG9tQWN0aW9uc19Ub29sYmFyXCIsIFwiQWNjaW9uZXMgZGUgZXN0YWRvIGRlIGxhIGhvamEgZGUgZ2FzdG9cIil9PlxyXG4gICAgICB7YWN0aW9ucy5tYXAoKGFjdGlvbikgPT4gKFxyXG4gICAgICAgIDxQYWdlQm90dG9tQWN0aW9uQnV0dG9uXHJcbiAgICAgICAgICBrZXk9e2FjdGlvbi5pZH1cclxuICAgICAgICAgIGxhYmVsPXtpbmRUKGFjdGlvbi5sYWJlbEtleSwgYWN0aW9uLmZhbGxiYWNrKX1cclxuICAgICAgICAgIGRpc2FibGVkPXtidXN5IHx8IGRpc2FibGVkfVxyXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gb25BY3Rpb25DbGljayhhY3Rpb24pfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICkpfVxyXG4gICAgPC9QYWdlQm90dG9tQWN0aW9ucz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5IGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheS50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IFRJQ0tFVF9JTUFHRV9BQ0NFUFRfQVRUUklCVVRFIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93Q29yZS50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5c1Byb3BzID0ge1xyXG4gIG1vZGFsOiB7XHJcbiAgICBvcGVuOiBib29sZWFuO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xyXG4gICAgY2FuY2VsVGV4dD86IHN0cmluZztcclxuICAgIHNob3dDYW5jZWw/OiBib29sZWFuO1xyXG4gICAgc2hvd0NvbmZpcm0/OiBib29sZWFuO1xyXG4gIH07XHJcbiAgbW9kYWxFcnJvcjogc3RyaW5nO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlOiBib29sZWFuO1xyXG4gIG1vZGFsTG9hZGluZ1RleHQ6IHN0cmluZztcclxuICBtb2RhbENhbmNlbFRleHQ6IHN0cmluZztcclxuICBtb2RhbENvbmZpcm1UZXh0OiBzdHJpbmc7XHJcbiAgbW9kYWxCb2R5PzogUmVhY3QuUmVhY3ROb2RlO1xyXG4gIGNhbWVyYUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIGdhbGxlcnlJbnB1dFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICBzb3VyY2VQaWNrZXJPcGVuOiBib29sZWFuO1xyXG4gIHF1aWNrVGlja2V0QnVzeTogYm9vbGVhbjtcclxuICBxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZTogc3RyaW5nO1xyXG4gIHF1aWNrVGlja2V0UHJvZ3Jlc3NTdGFnZXM6IEFycmF5PHtcclxuICAgIGtleTogc3RyaW5nO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICBzdGF0ZTogXCJjb21wbGV0ZWRcIiB8IFwiYWN0aXZlXCIgfCBcInBlbmRpbmdcIjtcclxuICB9PjtcclxuICBxdWlja1RpY2tldEVsYXBzZWRNczogbnVtYmVyO1xyXG4gIHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgcXVpY2tUaWNrZXRBdHRlbXB0SWQ6IHN0cmluZztcclxuICBxdWlja1RpY2tldFRyYWNlTGlzdDogQXJyYXk8eyBzdGVwOiBzdHJpbmc7IHRyYWNlSWQ6IHN0cmluZzsgYXQ6IHN0cmluZyB9PjtcclxuICBoYXNQZW5kaW5nVXBsb2FkUmV0cnk6IGJvb2xlYW47XHJcbiAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmU6IGJvb2xlYW47XHJcbiAgb25Db25maXJtOiAoKSA9PiB2b2lkO1xyXG4gIG9uQ2FuY2VsOiAoKSA9PiB2b2lkO1xyXG4gIG9uU2VsZWN0ZWRDYW1lcmFGaWxlOiAoZmlsZTogRmlsZSB8IG51bGwpID0+IHZvaWQ7XHJcbiAgb25TZWxlY3RlZEdhbGxlcnlGaWxlOiAoZmlsZTogRmlsZSB8IG51bGwpID0+IHZvaWQ7XHJcbiAgb25TZWxlY3RGcm9tQ2FtZXJhOiAoKSA9PiB2b2lkO1xyXG4gIG9uU2VsZWN0RnJvbUdhbGxlcnk6ICgpID0+IHZvaWQ7XHJcbiAgb25DbG9zZVNvdXJjZVBpY2tlcjogKCkgPT4gdm9pZDtcclxuICBvblJldHJ5UGVuZGluZ1VwbG9hZDogKCkgPT4gdm9pZDtcclxuICBvbkNsZWFyUXVpY2tUaWNrZXRFcnJvcjogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIFJlbmRlcnMgbW9kYWwgYW5kIHF1aWNrLXRpY2tldCBvdmVybGF5cyBmb3IgdGhlIGV4cGVuc2Ugc2hlZXQgZGV0YWlsIHBhZ2UuXHJcbmNvbnN0IEV4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzID0gKHtcclxuICBtb2RhbCxcclxuICBtb2RhbEVycm9yLFxyXG4gIHN0YXR1cyxcclxuICBidXN5LFxyXG4gIGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSxcclxuICBtb2RhbExvYWRpbmdUZXh0LFxyXG4gIG1vZGFsQ2FuY2VsVGV4dCxcclxuICBtb2RhbENvbmZpcm1UZXh0LFxyXG4gIG1vZGFsQm9keSxcclxuICBjYW1lcmFJbnB1dFJlZixcclxuICBnYWxsZXJ5SW5wdXRSZWYsXHJcbiAgc291cmNlUGlja2VyT3BlbixcclxuICBxdWlja1RpY2tldEJ1c3ksXHJcbiAgcXVpY2tUaWNrZXRQcm9ncmVzc01lc3NhZ2UsXHJcbiAgcXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlcyxcclxuICBxdWlja1RpY2tldEVsYXBzZWRNcyxcclxuICBxdWlja1RpY2tldEVycm9yTWVzc2FnZSxcclxuICBxdWlja1RpY2tldEF0dGVtcHRJZCxcclxuICBxdWlja1RpY2tldFRyYWNlTGlzdCxcclxuICBoYXNQZW5kaW5nVXBsb2FkUmV0cnksXHJcbiAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmUsXHJcbiAgb25Db25maXJtLFxyXG4gIG9uQ2FuY2VsLFxyXG4gIG9uU2VsZWN0ZWRDYW1lcmFGaWxlLFxyXG4gIG9uU2VsZWN0ZWRHYWxsZXJ5RmlsZSxcclxuICBvblNlbGVjdEZyb21DYW1lcmEsXHJcbiAgb25TZWxlY3RGcm9tR2FsbGVyeSxcclxuICBvbkNsb3NlU291cmNlUGlja2VyLFxyXG4gIG9uUmV0cnlQZW5kaW5nVXBsb2FkLFxyXG4gIG9uQ2xlYXJRdWlja1RpY2tldEVycm9yLFxyXG59OiBFeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5c1Byb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXtidXN5IHx8IGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZX1cclxuICAgICAgICBlcnJvcj17bW9kYWxFcnJvcn1cclxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e29uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17b25DYW5jZWx9XHJcbiAgICAgID5cclxuICAgICAgICB7bW9kYWxCb2R5fVxyXG4gICAgICA8L0NvbmZpcm1Nb2RhbD5cclxuXHJcbiAgICAgIDxpbnB1dFxyXG4gICAgICAgIHJlZj17Y2FtZXJhSW5wdXRSZWZ9XHJcbiAgICAgICAgdHlwZT1cImZpbGVcIlxyXG4gICAgICAgIGFjY2VwdD17VElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEV9XHJcbiAgICAgICAgY2FwdHVyZT1cImVudmlyb25tZW50XCJcclxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxyXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmZpbGVzPy5bMF0gfHwgbnVsbDtcclxuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgb25TZWxlY3RlZENhbWVyYUZpbGUoZmlsZSk7XHJcbiAgICAgICAgfX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxpbnB1dFxyXG4gICAgICAgIHJlZj17Z2FsbGVyeUlucHV0UmVmfVxyXG4gICAgICAgIHR5cGU9XCJmaWxlXCJcclxuICAgICAgICBhY2NlcHQ9e1RJQ0tFVF9JTUFHRV9BQ0NFUFRfQVRUUklCVVRFfVxyXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXHJcbiAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZmlsZXM/LlswXSB8fCBudWxsO1xyXG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICBvblNlbGVjdGVkR2FsbGVyeUZpbGUoZmlsZSk7XHJcbiAgICAgICAgfX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtzb3VyY2VQaWNrZXJPcGVuID8gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTYwMDAwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1zbGF0ZS05NTAvNDUgcHgtNCBweS02XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy1zbSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZSBwLTQgc2hhZG93LXhsXCI+XHJcbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LVsxNnB4XSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtODAwXCI+XHJcbiAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfVGl0bGVcIiwgXCJOdWV2byB0aWNrZXRcIil9XHJcbiAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgICAgIHtpbmRUKFxyXG4gICAgICAgICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfQm9keVwiLFxyXG4gICAgICAgICAgICAgICAgXCJTZWxlY2Npb25hIHVuYSBmdWVudGUgcGFyYSBjYXB0dXJhciBvIGVsZWdpciBsYSBpbWFnZW4gZGVsIHRpY2tldC5cIlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvcD5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBncmlkIGdyaWQtY29scy0xIGdhcC0yXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCIgb25DbGljaz17b25TZWxlY3RGcm9tQ2FtZXJhfT5cclxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0NhbWVyYVwiLCBcIlVzYXIgY1x1MDBFMW1hcmFcIil9XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCIgb25DbGljaz17b25TZWxlY3RGcm9tR2FsbGVyeX0+XHJcbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9HYWxsZXJ5XCIsIFwiRWxlZ2lyIGltYWdlblwiKX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIiBvbkNsaWNrPXtvbkNsb3NlU291cmNlUGlja2VyfT5cclxuICAgICAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICA8RXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5XHJcbiAgICAgICAgb3Blbj17cXVpY2tUaWNrZXRCdXN5fVxyXG4gICAgICAgIHRpdGxlPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfVGl0bGVcIiwgXCJQcm9jZXNzaW5nIHRpY2tldFwiKX1cclxuICAgICAgICBzdW1tYXJ5PXtxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICAgIGVsYXBzZWRNcz17cXVpY2tUaWNrZXRFbGFwc2VkTXN9XHJcbiAgICAgICAgc3RhZ2VzPXtxdWlja1RpY2tldFByb2dyZXNzU3RhZ2VzfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAge3F1aWNrVGlja2V0RXJyb3JNZXNzYWdlID8gKFxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzTmFtZT17XHJcbiAgICAgICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlXHJcbiAgICAgICAgICAgICAgPyBcImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIHNwYWNlLXktMiByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBiZy1hbWJlci01MCBwLTMgdGV4dC1zbSB0ZXh0LWFtYmVyLTkwMFwiXHJcbiAgICAgICAgICAgICAgOiBcImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIHNwYWNlLXktMiByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXJvc2UtNTAgcC0zIHRleHQtc20gdGV4dC1yb3NlLTgwMFwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHA+e3F1aWNrVGlja2V0RXJyb3JNZXNzYWdlfTwvcD5cclxuICAgICAgICAgIHtxdWlja1RpY2tldEF0dGVtcHRJZCA/IChcclxuICAgICAgICAgICAgPHBcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmVcclxuICAgICAgICAgICAgICAgICAgPyBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItYW1iZXItMjAwIGJnLXdoaXRlIHB4LTIgcHktMSBmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1hbWJlci05MDAgYnJlYWstYWxsXCJcclxuICAgICAgICAgICAgICAgICAgOiBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctd2hpdGUgcHgtMiBweS0xIGZvbnQtbW9ubyB0ZXh0LVsxMXB4XSB0ZXh0LXJvc2UtODAwIGJyZWFrLWFsbFwiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge2BhdHRlbXB0SWQ6ICR7cXVpY2tUaWNrZXRBdHRlbXB0SWR9YH1cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICB7cXVpY2tUaWNrZXRUcmFjZUxpc3QubGVuZ3RoID4gMCA/IChcclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17XHJcbiAgICAgICAgICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZVxyXG4gICAgICAgICAgICAgICAgICA/IFwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1hbWJlci0yMDAgYmctd2hpdGUgcC0yIHRleHQteHMgdGV4dC1hbWJlci04MDBcIlxyXG4gICAgICAgICAgICAgICAgICA6IFwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy13aGl0ZSBwLTIgdGV4dC14cyB0ZXh0LXJvc2UtNzAwXCJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7cXVpY2tUaWNrZXRUcmFjZUxpc3QubWFwKChlbnRyeSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPHAga2V5PXtgJHtlbnRyeS5zdGVwfS0ke2VudHJ5LmF0fWB9PntgJHtlbnRyeS5zdGVwfTogJHtlbnRyeS50cmFjZUlkfWB9PC9wPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMlwiPlxyXG4gICAgICAgICAgICB7aGFzUGVuZGluZ1VwbG9hZFJldHJ5ID8gKFxyXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIiBvbkNsaWNrPXtvblJldHJ5UGVuZGluZ1VwbG9hZH0+XHJcbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1JldHJ5VXBsb2FkXCIsIFwiUmVpbnRlbnRhciB1cGxvYWRcIil9XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCIgb25DbGljaz17b25DbGVhclF1aWNrVGlja2V0RXJyb3J9PlxyXG4gICAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0Nsb3NlXCIsIFwiQ2xvc2VcIil9XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgRmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbSB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XHJcbmltcG9ydCB7IHVzZUF1dGhDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XHJcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xyXG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcclxuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xyXG5pbXBvcnQgeyBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU1hbmFnZWRVc2VyU2NvcGUudHNcIjtcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsLCByZWxvYWRFeHBlbnNlUGFnZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuaW1wb3J0IHsgc2F2ZUV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0LnRzXCI7XG5pbXBvcnQgeyBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcbmltcG9ydCB7IGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQWN0aW5nVXNlci50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZVN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlU3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplRXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2UgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VSZWltYnVyc2FibGVFeHBlbnNlQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlIH0gZnJvbSBcIi4uL2xpc3QvdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlLnRzXCI7XHJcbmltcG9ydCB7IExpbmtUaWNrZXRJY29uLCBOZXdMaW5lSWNvbiwgTmV3VGlja2V0SWNvbiB9IGZyb20gXCIuL0V4cGVuc2VTaGVldERldGFpbEljb25zLnRzeFwiO1xyXG5cclxuY29uc3QgTElORVNfUEFHRV9TSVpFID0gNjtcclxuY29uc3QgRVhQRU5TRV9TVEFUVVNfQVBQUk9WQUxfUkVRVUVTVEVEID0gMTtcclxuXHJcbmNvbnN0IHBhZ2VkU2xpY2UgPSA8VCw+KGl0ZW1zOiBUW10sIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcik6IFRbXSA9PiB7XHJcbiAgaWYgKCFpdGVtcy5sZW5ndGgpIHJldHVybiBbXTtcclxuICBjb25zdCBzYWZlUGFnZSA9IE1hdGgubWF4KDEsIHBhZ2UpO1xyXG4gIGNvbnN0IHN0YXJ0ID0gKHNhZmVQYWdlIC0gMSkgKiBwYWdlU2l6ZTtcclxuICByZXR1cm4gaXRlbXMuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgcGFnZVNpemUpO1xyXG59O1xyXG5cclxuLy8gVHJlYXRzIG9ubHkgcG9zaXRpdmUgbnVtZXJpYyB0b3RhbHMgYXMgYWN0aW9uYWJsZSBzaGVldCBjb250ZW50LlxyXG5jb25zdCBoYXNQb3NpdGl2ZVRvdGFsQW1vdW50ID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgJiYgcGFyc2VkID4gMDtcclxufTtcclxuXHJcbi8vIEluaXRpYWxpemVzIGF1dGggc2VlZCBmb3IgZXhwZW5zZSBBUEkgY2FsbHMgYmVmb3JlIGlzbGFuZCBlZmZlY3RzIHJ1bi5cclxuZXhwb3J0IGNvbnN0IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoID0gKCkgPT4ge1xyXG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcclxuICAgIHRva2VuOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxyXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXHJcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBPd25zIHRoZSBkZXRhaWwtcGFnZSBvcmNoZXN0cmF0aW9uIGFuZCBrZWVwcyB0aGUgdmlldyBjb21wb25lbnQgZm9jdXNlZCBvbiByZW5kZXJpbmcuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udHJvbGxlciA9ICgpID0+IHtcclxuICBjb25zdCB7XHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgfSA9IHVzZUF1dGhDb250ZXh0KCk7XHJcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJWaWV3XCIpO1xyXG4gIGNvbnN0IGNhbkNyZWF0ZUV4cGVuc2UgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkFkZFwiKTtcclxuICBjb25zdCBzaGVldElkID0gc2FmZVRleHQod2luZG93Ll9fRVhQRU5TRV9TSEVFVF9JRF9fKTtcclxuICBjb25zdCBzaGVldE1vZGUgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX01PREVfXykudG9Mb3dlckNhc2UoKTtcclxuICBjb25zdCBpc0NyZWF0ZU1vZGUgPSBzaGVldE1vZGUgPT09IFwiY3JlYXRlXCI7XHJcbiAgY29uc3QgaXNNYW5hZ2luZ090aGVyVXNlckJ5U2VsZWN0aW9uID0gaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCh7XHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgcmVjb3JkT3duZXJVc2VySWQ6IFwiXCIsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgfSk7XHJcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZUZvclNlbGVjdGVkQ29udGV4dCA9IGNhbkNyZWF0ZUV4cGVuc2UgJiYgIWlzTWFuYWdpbmdPdGhlclVzZXJCeVNlbGVjdGlvbjtcclxuICBjb25zdCBsaW5lQ29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgY3JlYXRlZFNoZWV0SWRSZWYgPSB1c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgY2FtZXJhSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGdhbGxlcnlJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2lzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSwgc2V0SXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnQsIHNldFN0YXR1c1RyYW5zaXRpb25Db21tZW50XSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtzaG93U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRGaWVsZCwgc2V0U2hvd1N0YXR1c1RyYW5zaXRpb25Db21tZW50RmllbGRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtjb25maXJtZWRQcm9qZWN0SWQsIHNldENvbmZpcm1lZFByb2plY3RJZF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBzdGF0dXNUcmFuc2l0aW9uQ29tbWVudFJlZiA9IHVzZVJlZihcIlwiKTtcclxuXHJcbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiAoe1xyXG4gICAgICBmaXJzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9GaXJzdFwiLCBcIkZpcnN0XCIpLFxyXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcclxuICAgICAgbmV4dDogaW5kVChcIkhpc3RvcnlfUGFnZV9OZXh0XCIsIFwiTmV4dFwiKSxcclxuICAgICAgbGFzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKSxcclxuICAgIH0pLFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICBjb25zdCBkZXRhaWxTdGF0ZSA9IHVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlKHtcclxuICAgIGhhc0FjY2VzcyxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6IGNhbkNyZWF0ZUV4cGVuc2VGb3JTZWxlY3RlZENvbnRleHQsXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICBzaGVldElkLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHtcclxuICAgIGhlYWRlcixcclxuICAgIGxpbmVzLFxyXG4gICAgbGluZVBhZ2UsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBidXN5LFxyXG4gICAgc3RhdHVzLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxFcnJvcixcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdFByb2plY3RJZCxcclxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBkcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbiAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSxcclxuICAgIHByb2plY3RWYWx1ZSxcclxuICAgIGRldGFpbFBvbGljeSxcclxuICAgIGlzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICBpc1NoZWV0TG9ja2VkLFxyXG4gICAgZXhjaGFuZ2VSYXRlVmFsdWUsXHJcbiAgICBzaG93RXhjaGFuZ2VSYXRlLFxyXG4gICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXHJcbiAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXHJcbiAgICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQsXHJcbiAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSxcclxuICAgIGNhbkVkaXRBbnlDdXJyZW50LFxyXG4gICAgY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyxcclxuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50LFxyXG4gICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXHJcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXHJcbiAgICBzZXRMaW5lUGFnZSxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgIHNldERyYWZ0UHJvamVjdElkLFxyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIHNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgIHNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICAgIGhhbmRsZU9wZW5DcmVhdGVMaW5lTW9kZSxcclxuICAgIGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSxcclxuICAgIG5hdmlnYXRlVG9DcmVhdGVkU2hlZXQsXHJcbiAgICBuYXZpZ2F0ZVRvTGluZURldGFpbCxcclxuICB9ID0gZGV0YWlsU3RhdGU7XHJcblxyXG4gIGNvbnN0IGNhbkNyZWF0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyA9IGNhbkNyZWF0ZUV4cGVuc2UgJiYgIWlzTWFuYWdpbmdPdGhlclVzZXI7XHJcbiAgY29uc3QgY2FuRGVsZXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3ID0gZGV0YWlsUG9saWN5LmNhbkRlbGV0ZVNoZWV0O1xyXG4gIGNvbnN0IGNhblRyYW5zaXRpb25TdGF0dXMgPSBkZXRhaWxQb2xpY3kuc3RhdHVzQWN0aW9ucy5sZW5ndGggPiAwO1xyXG4gIGNvbnN0IGlzUmVhZE9ubHlNb2RlID0gZGV0YWlsUG9saWN5LmludGVyYWN0aW9uTW9kZSA9PT0gXCJyZWFkX29ubHlcIjtcclxuICBjb25zdCBjdXJyZW50U3RhdHVzQ29kZSA9IHR5cGVvZiBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgOiBudWxsO1xyXG4gIGNvbnN0IGhpZGVzQ3J1ZFRvcGJhckJ5U3RhdHVzID1cclxuICAgIGN1cnJlbnRTdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19BUFBST1ZBTF9SRVFVRVNURUQgJiYgIWNhbkVkaXRBbnlDdXJyZW50O1xyXG4gIGNvbnN0IHRvcGJhckFjdGlvbk1vZGUgPSAhaXNDcmVhdGVNb2RlICYmIChpc1JlYWRPbmx5TW9kZSB8fCBoaWRlc0NydWRUb3BiYXJCeVN0YXR1cykgPyBcInZpZXdfb25seVwiIDogXCJkZWZhdWx0XCI7XHJcbiAgY29uc3QgZGV0YWlsUGVybWlzc2lvbnNSZWFkeSA9IG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSAmJiAoaXNDcmVhdGVNb2RlIHx8ICEhaGVhZGVyKTtcclxuICBjb25zdCB7IGludmFsaWRhdGVDYWNoZWRMaXN0Rm9yUmVmZXRjaCB9ID0gdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlKCk7XHJcblxyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGNhbmNlbENvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xyXG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcclxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgcmVzZXRTdGF0dXNUcmFuc2l0aW9uRGlhbG9nID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICBzZXRTdGF0dXNUcmFuc2l0aW9uQ29tbWVudChcIlwiKTtcclxuICAgIHNldFNob3dTdGF0dXNUcmFuc2l0aW9uQ29tbWVudEZpZWxkKGZhbHNlKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNsb3NlQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHJlc2V0U3RhdHVzVHJhbnNpdGlvbkRpYWxvZygpO1xyXG4gICAgY2xvc2VDb25maXJtKCk7XHJcbiAgfSwgW2Nsb3NlQ29uZmlybSwgcmVzZXRTdGF0dXNUcmFuc2l0aW9uRGlhbG9nXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNhbmNlbENvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICByZXNldFN0YXR1c1RyYW5zaXRpb25EaWFsb2coKTtcclxuICAgIGNhbmNlbENvbmZpcm0oKTtcclxuICB9LCBbY2FuY2VsQ29uZmlybSwgcmVzZXRTdGF0dXNUcmFuc2l0aW9uRGlhbG9nXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcclxuICAgICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtLCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXNdKTtcclxuXHJcbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XHJcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcclxuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICFidXN5ICYmIG1vZGFsRXJyb3JcclxuICAgICAgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIilcclxuICAgICAgOiAobW9kYWwuY29uZmlybVRleHQgfHwgaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIikpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xyXG4gICAgICBoYW5kbGVDYW5jZWxDb25maXJtKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2b2lkIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDYW5jZWxDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm0sIG1vZGFsRXJyb3JdKTtcclxuXHJcbiAgY29uc3QgdmlzaWJsZUxpbmVzID0gdXNlTWVtbygoKSA9PiBwYWdlZFNsaWNlKGxpbmVzLCBsaW5lUGFnZSwgTElORVNfUEFHRV9TSVpFKSwgW2xpbmVQYWdlLCBsaW5lc10pO1xyXG4gIGNvbnN0IHRvdGFsTGluZVBhZ2VzID0gTWF0aC5jZWlsKChsaW5lcy5sZW5ndGggfHwgMCkgLyBMSU5FU19QQUdFX1NJWkUpO1xyXG4gIGNvbnN0IHRvdGFsQW1vdW50VGV4dCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGhlYWRlcj8udG90YWxBbW91bnQgPz8gbnVsbCwgc2FmZVRleHQoZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5IHx8IGhlYWRlcj8uY3VycmVuY3lDb2RlKSksXG4gICAgW2V4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSwgaGVhZGVyPy5jdXJyZW5jeUNvZGUsIGhlYWRlcj8udG90YWxBbW91bnRdXG4gICk7XG4gIGNvbnN0IGhhc1N0YXR1c0FjdGlvbkNvbnRlbnQgPSBsaW5lcy5sZW5ndGggPiAwIHx8IGhhc1Bvc2l0aXZlVG90YWxBbW91bnQoaGVhZGVyPy50b3RhbEFtb3VudCk7XHJcbiAgY29uc3QgYXJlU3RhdHVzQWN0aW9uc0Rpc2FibGVkID0gIWhhc1N0YXR1c0FjdGlvbkNvbnRlbnQ7XHJcbiAgY29uc3Qgb3duZXJEaXNwbGF5ID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBvd25lclVzZXJJZCA9IHNhZmVUZXh0KGhlYWRlcj8udXNlcklkKTtcclxuICAgIGNvbnN0IGN1cnJlbnRVc2VySWQgPSBzYWZlVGV4dChjdXJyZW50Q3JtVXNlcklkKTtcclxuICAgIGlmICghb3duZXJVc2VySWQgfHwgIWN1cnJlbnRVc2VySWQgfHwgb3duZXJVc2VySWQudG9VcHBlckNhc2UoKSA9PT0gY3VycmVudFVzZXJJZC50b1VwcGVyQ2FzZSgpKSB7XHJcbiAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG93bmVyTmFtZSA9IHNhZmVUZXh0KGhlYWRlcj8udXNlck5hbWUpO1xyXG4gICAgcmV0dXJuIG93bmVyTmFtZSA/IGAke293bmVyTmFtZX0gKCR7b3duZXJVc2VySWR9KWAgOiBvd25lclVzZXJJZDtcclxuICB9LCBbY3VycmVudENybVVzZXJJZCwgaGVhZGVyPy51c2VySWQsIGhlYWRlcj8udXNlck5hbWVdKTtcclxuXHJcbiAgY29uc3Qge1xyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlUHJvcGFnYXRlUmVpbWJ1cnNhYmxlRXhwZW5zZVRvTGluZXMsXHJcbiAgICBoYW5kbGVQcm9wYWdhdGVQcm9qZWN0SWRUb0xpbmVzLFxyXG4gICAgaGFuZGxlU3RhdHVzVHJhbnNpdGlvbixcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICB9ID0gdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zKHtcclxuICAgIGJ1c3ksXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0VkaXRMb2NrZWQ6IGlzUmVhZE9ubHlNb2RlLFxyXG4gICAgaXNEZWxldGVMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXHJcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcclxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcclxuICAgIGxvY2tlZEN1cnJlbmN5Q29kZTogc2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpLFxyXG4gICAgbG9ja2VkRXhjaGFuZ2VSYXRlOiBzYWZlVGV4dChoZWFkZXI/LmV4Y2hSYXRlKSxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6IGNhbkNyZWF0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyxcclxuICAgIGNhbkVkaXRFeHBlbnNlOiBjYW5FZGl0QW55Q3VycmVudCxcclxuICAgIGNhbkRlbGV0ZUV4cGVuc2U6IGNhbkRlbGV0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyxcclxuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50LFxyXG4gICAgY2FuVHJhbnNpdGlvblN0YXR1cyxcclxuICAgIHNoZWV0SWQsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIGRyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXHJcbiAgICBkcmFmdFByb2plY3RJZCxcclxuICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzOiBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyxcclxuICAgIGN1cnJlbnRMaW5lczogbGluZXMsXHJcbiAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXHJcbiAgICBvbkNyZWF0ZVN1Y2Nlc3M6IChjcmVhdGVkU2hlZXRJZCkgPT4ge1xyXG4gICAgICBjcmVhdGVkU2hlZXRJZFJlZi5jdXJyZW50ID0gc2FmZVRleHQoY3JlYXRlZFNoZWV0SWQpO1xyXG4gICAgfSxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gIH0pO1xyXG5cclxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGlzRWRpdGluZykgcmV0dXJuO1xyXG4gICAgc2V0Q29uZmlybWVkUHJvamVjdElkKHNhZmVUZXh0KHByb2plY3RWYWx1ZSkpO1xyXG4gIH0sIFtpc0VkaXRpbmcsIHByb2plY3RWYWx1ZV0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25maXJtUHJvamVjdFByb3BhZ2F0aW9uID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAobmV4dFByb2plY3RJZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNhZmVQcm9qZWN0SWQgPSBzYWZlVGV4dChuZXh0UHJvamVjdElkKTtcclxuICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVQcm9wYWdhdGVQcm9qZWN0SWRUb0xpbmVzKHNhZmVQcm9qZWN0SWQpO1xyXG4gICAgICBpZiAob2spIHtcclxuICAgICAgICBzZXRDb25maXJtZWRQcm9qZWN0SWQoc2FmZVByb2plY3RJZCk7XHJcbiAgICAgICAgc2V0RHJhZnRQcm9qZWN0SWQoc2FmZVByb2plY3RJZCk7XHJcbiAgICAgICAgc2V0SXNFZGl0aW5nKHRydWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gb2s7XHJcbiAgICB9LFxyXG4gICAgW2hhbmRsZVByb3BhZ2F0ZVByb2plY3RJZFRvTGluZXMsIHNldERyYWZ0UHJvamVjdElkLCBzZXRJc0VkaXRpbmddXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRHJhZnRQcm9qZWN0SWRDb21taXQgPSB1c2VDYWxsYmFjayhcclxuICAgICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5leHRWYWx1ZSA9IHNhZmVUZXh0KHZhbHVlKTtcclxuICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHNhZmVUZXh0KGNvbmZpcm1lZFByb2plY3RJZCk7XHJcbiAgICAgIGlmIChuZXh0VmFsdWUgPT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICBzZXREcmFmdFByb2plY3RJZChuZXh0VmFsdWUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgc2hvdWxkQ29uZmlybVByb3BhZ2F0aW9uID1cclxuICAgICAgICAhaXNDcmVhdGVNb2RlICYmIGlzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCAmJiBsaW5lcy5sZW5ndGggPiAwO1xyXG5cclxuICAgICAgaWYgKCFzaG91bGRDb25maXJtUHJvcGFnYXRpb24pIHtcclxuICAgICAgICBzZXREcmFmdFByb2plY3RJZChuZXh0VmFsdWUpO1xyXG4gICAgICAgIHNldENvbmZpcm1lZFByb2plY3RJZChuZXh0VmFsdWUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWwub3Blbikge1xyXG4gICAgICAgIHNldERyYWZ0UHJvamVjdElkKHByZXZpb3VzVmFsdWUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0RHJhZnRQcm9qZWN0SWQobmV4dFZhbHVlKTtcclxuICAgICAgb3BlbkNvbmZpcm0oe1xyXG4gICAgICAgIHRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUHJvcGFnYXRlUHJvamVjdF9UaXRsZVwiLCBcIlVwZGF0ZSBsaW5lc1wiKSxcclxuICAgICAgICBtZXNzYWdlOiBpbmRUKFxyXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9Qcm9wYWdhdGVQcm9qZWN0X0JvZHlcIixcclxuICAgICAgICAgIFwiVGhlIHByb2plY3RzIG9uIGFsbCBsaW5lcyB3aWxsIGJlIHVwZGF0ZWQuIERvIHlvdSB3YW50IHRvIGNvbnRpbnVlP1wiXHJcbiAgICAgICAgKSxcclxuICAgICAgICBjb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICAgICAgb25DYW5jZWw6ICgpID0+IHtcclxuICAgICAgICAgIHNldERyYWZ0UHJvamVjdElkKHByZXZpb3VzVmFsdWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gaGFuZGxlQ29uZmlybVByb2plY3RQcm9wYWdhdGlvbihuZXh0VmFsdWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgYnVzeSxcclxuICAgICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICAgIGNvbmZpcm1lZFByb2plY3RJZCxcclxuICAgICAgaGFuZGxlQ29uZmlybVByb2plY3RQcm9wYWdhdGlvbixcclxuICAgICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgICBpc0VkaXRpbmcsXHJcbiAgICAgIGxpbmVzLmxlbmd0aCxcclxuICAgICAgbW9kYWwub3BlbixcclxuICAgICAgb3BlbkNvbmZpcm0sXHJcbiAgICAgIHNldERyYWZ0UHJvamVjdElkLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHZhbHVlOiBudW1iZXIpID0+IHtcclxuICAgICAgY29uc3QgbmV4dFZhbHVlID0gbm9ybWFsaXplRXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2UodmFsdWUpO1xyXG4gICAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gbm9ybWFsaXplRXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2UoZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlKTtcclxuICAgICAgaWYgKG5leHRWYWx1ZSA9PT0gcHJldmlvdXNWYWx1ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3Qgc2hvdWxkQ29uZmlybVByb3BhZ2F0aW9uID1cclxuICAgICAgICAhaXNDcmVhdGVNb2RlICYmIGlzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCAmJiBsaW5lcy5sZW5ndGggPiAwO1xyXG5cclxuICAgICAgaWYgKCFzaG91bGRDb25maXJtUHJvcGFnYXRpb24pIHtcclxuICAgICAgICBzZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UobmV4dFZhbHVlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChidXN5IHx8IG1vZGFsLm9wZW4pIHJldHVybjtcclxuXHJcbiAgICAgIHNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZShuZXh0VmFsdWUpO1xyXG4gICAgICBvcGVuQ29uZmlybSh7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9Qcm9wYWdhdGVSZWltYnVyc2FibGVfVGl0bGVcIiwgXCJVcGRhdGUgbGluZXNcIiksXHJcbiAgICAgICAgbWVzc2FnZTogaW5kVChcclxuICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUHJvcGFnYXRlUmVpbWJ1cnNhYmxlX0JvZHlcIixcclxuICAgICAgICAgIFwiVGhlIHJlaW1idXJzYWJsZSBjaGFuZ2Ugd2lsbCBiZSBwcm9wYWdhdGVkIHRvIGV2ZXJ5IGV4cGVuc2Ugc2hlZXQgbGluZS4gRG8geW91IHdhbnQgdG8gY29udGludWU/XCJcclxuICAgICAgICApLFxyXG4gICAgICAgIGNvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcclxuICAgICAgICBvbkNhbmNlbDogKCkgPT4ge1xyXG4gICAgICAgICAgc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlKHByZXZpb3VzVmFsdWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZVByb3BhZ2F0ZVJlaW1idXJzYWJsZUV4cGVuc2VUb0xpbmVzKG5leHRWYWx1ZSk7XHJcbiAgICAgICAgICBpZiAob2spIHtcclxuICAgICAgICAgICAgc2V0SXNFZGl0aW5nKHRydWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgYnVzeSxcclxuICAgICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICAgIGRyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgICAgaGFuZGxlUHJvcGFnYXRlUmVpbWJ1cnNhYmxlRXhwZW5zZVRvTGluZXMsXHJcbiAgICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgICAgaXNFZGl0aW5nLFxyXG4gICAgICBsaW5lcy5sZW5ndGgsXHJcbiAgICAgIG1vZGFsLm9wZW4sXHJcbiAgICAgIG9wZW5Db25maXJtLFxyXG4gICAgICBzZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbiAgICAgIHNldElzRWRpdGluZyxcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYXNQZW5kaW5nUHJvamVjdFByb3BhZ2F0aW9uID1cclxuICAgICFpc0NyZWF0ZU1vZGUgJiZcclxuICAgIGlzRWRpdGluZyAmJlxyXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQgJiZcclxuICAgIGxpbmVzLmxlbmd0aCA+IDAgJiZcclxuICAgIHNhZmVUZXh0KGRyYWZ0UHJvamVjdElkKSAhPT0gc2FmZVRleHQoY29uZmlybWVkUHJvamVjdElkKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUGVuZGluZ1Byb2plY3RQcm9wYWdhdGlvbkNhbmNlbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghaGFzUGVuZGluZ1Byb2plY3RQcm9wYWdhdGlvbikgcmV0dXJuO1xyXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQoc2FmZVRleHQoY29uZmlybWVkUHJvamVjdElkKSk7XHJcbiAgfSwgW2NvbmZpcm1lZFByb2plY3RJZCwgaGFzUGVuZGluZ1Byb2plY3RQcm9wYWdhdGlvbiwgc2V0RHJhZnRQcm9qZWN0SWRdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVXBkYXRlV2l0aFByb2plY3RQcm9wYWdhdGlvbiA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChoYXNQZW5kaW5nUHJvamVjdFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlQ29uZmlybVByb2plY3RQcm9wYWdhdGlvbihkcmFmdFByb2plY3RJZCk7XHJcbiAgICAgIGlmICghb2spIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaGFuZGxlVXBkYXRlKCk7XHJcbiAgfSwgW2RyYWZ0UHJvamVjdElkLCBoYW5kbGVDb25maXJtUHJvamVjdFByb3BhZ2F0aW9uLCBoYW5kbGVVcGRhdGUsIGhhc1BlbmRpbmdQcm9qZWN0UHJvcGFnYXRpb25dKTtcclxuXHJcbiAgY29uc3QgcHJvamVjdFByb3BhZ2F0aW9uU2F2ZVRpdGxlID0gaGFzUGVuZGluZ1Byb2plY3RQcm9wYWdhdGlvblxyXG4gICAgPyBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUHJvcGFnYXRlUHJvamVjdF9UaXRsZVwiLCBcIlVwZGF0ZSBsaW5lc1wiKVxyXG4gICAgOiB1bmRlZmluZWQ7XHJcbiAgY29uc3QgcHJvamVjdFByb3BhZ2F0aW9uU2F2ZU1lc3NhZ2UgPSBoYXNQZW5kaW5nUHJvamVjdFByb3BhZ2F0aW9uXHJcbiAgICA/IGluZFQoXHJcbiAgICAgICAgXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9Qcm9wYWdhdGVQcm9qZWN0X0JvZHlcIixcclxuICAgICAgICBcIlRoZSBwcm9qZWN0cyBvbiBhbGwgbGluZXMgd2lsbCBiZSB1cGRhdGVkLiBEbyB5b3Ugd2FudCB0byBjb250aW51ZT9cIlxyXG4gICAgICApXHJcbiAgICA6IHVuZGVmaW5lZDtcclxuICBjb25zdCBwcm9qZWN0UHJvcGFnYXRpb25TYXZlQ29uZmlybVRleHQgPSBoYXNQZW5kaW5nUHJvamVjdFByb3BhZ2F0aW9uID8gaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIikgOiB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU9wZW5MaW5lRGV0YWlsID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAobGluZVJlY0lkOiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3Qgc2FmZUxpbmVJZCA9IHNhZmVUZXh0KGxpbmVSZWNJZCk7XHJcbiAgICAgIGlmICghc2FmZUxpbmVJZCB8fCBidXN5IHx8IGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCkge1xyXG4gICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlVXBkYXRlV2l0aFByb2plY3RQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGlmICghb2spIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsKHNhZmVMaW5lSWQsIHtcclxuICAgICAgICAgIG1vZGU6IFwiZWRpdFwiLFxyXG4gICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcclxuICAgICAgICAgIGJ5cGFzc0d1YXJkT25jZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsKHNhZmVMaW5lSWQpO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgYnVzeSxcclxuICAgICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICAgIGhhbmRsZVVwZGF0ZVdpdGhQcm9qZWN0UHJvcGFnYXRpb24sXHJcbiAgICAgIGlzRWRpdGluZyxcclxuICAgICAgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLFxyXG4gICAgICBuYXZpZ2F0ZVRvTGluZURldGFpbCxcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVTYXZlU3VjY2VzcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgY29uc3QgY3JlYXRlZFNoZWV0SWQgPSBzYWZlVGV4dChjcmVhdGVkU2hlZXRJZFJlZi5jdXJyZW50KTtcclxuICAgICAgaWYgKCFjcmVhdGVkU2hlZXRJZCkgcmV0dXJuO1xyXG4gICAgICBzYXZlRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQoe1xuICAgICAgICBzaGVldElkOiBjcmVhdGVkU2hlZXRJZCxcbiAgICAgIH0pO1xuICAgICAgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKCk7XG4gICAgICBzZXRJc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUodHJ1ZSk7XG4gICAgICBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0KGNyZWF0ZWRTaGVldElkKTtcbiAgICAgIHJldHVybjtcbiAgICB9XHJcblxyXG4gICAgcmVsb2FkRXhwZW5zZVBhZ2UoKTtcclxuICB9LCBbaXNDcmVhdGVNb2RlLCBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0XSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVN0YXR1c0FjdGlvbkNsaWNrID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoYWN0aW9uOiB7IGxhYmVsS2V5OiBzdHJpbmc7IGZhbGxiYWNrOiBzdHJpbmc7IG5leHRTdGF0dXM6IG51bWJlciB9KSA9PiB7XHJcbiAgICAgIGlmICghaGFzU3RhdHVzQWN0aW9uQ29udGVudCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgYWN0aW9uTGFiZWwgPSBpbmRUKGFjdGlvbi5sYWJlbEtleSwgYWN0aW9uLmZhbGxiYWNrKTtcclxuICAgICAgY29uc3QgY3VycmVudFN0YXR1c0xhYmVsID1cclxuICAgICAgICBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gbnVsbCB8fCBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICA/IGluZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKVxyXG4gICAgICAgICAgOiBnZXRFeHBlbnNlU3RhdHVzTGFiZWwoaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyk7XHJcbiAgICAgIGNvbnN0IG5leHRTdGF0dXNMYWJlbCA9IGdldEV4cGVuc2VTdGF0dXNMYWJlbChhY3Rpb24ubmV4dFN0YXR1cyk7XHJcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25NZXNzYWdlID0gaW5kRm9ybWF0KFxyXG4gICAgICAgIFwiRXhwZW5zZVNoZWV0c19Cb3R0b21BY3Rpb25zX0NvbmZpcm1UcmFuc2l0aW9uXCIsXHJcbiAgICAgICAgXCJDdXJyZW50IHN0YXR1czogezB9XFxuTmV3IHN0YXR1czogezF9XFxuXFxuRG8geW91IHdhbnQgdG8gdXBkYXRlIHRoZSBleHBlbnNlIHNoZWV0IHN0YXR1cz9cIixcclxuICAgICAgICBjdXJyZW50U3RhdHVzTGFiZWwsXHJcbiAgICAgICAgbmV4dFN0YXR1c0xhYmVsXHJcbiAgICAgICkucmVwbGFjZSgvXFxcXG4vZywgXCJcXG5cIik7XHJcbiAgICAgIGNvbnN0IGluaXRpYWxDb21tZW50ID0gc2FmZVRleHQoaGVhZGVyPy5lc3RhZG9Db21lbnRhcmlvcyk7XHJcbiAgICAgIHN0YXR1c1RyYW5zaXRpb25Db21tZW50UmVmLmN1cnJlbnQgPSBpbml0aWFsQ29tbWVudDtcclxuICAgICAgc2V0U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnQoaW5pdGlhbENvbW1lbnQpO1xyXG4gICAgICBzZXRTaG93U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRGaWVsZCh0cnVlKTtcclxuXHJcbiAgICAgIG9wZW5Db25maXJtKHtcclxuICAgICAgICB0aXRsZTogYWN0aW9uTGFiZWwsXHJcbiAgICAgICAgbWVzc2FnZTogdHJhbnNpdGlvbk1lc3NhZ2UsXHJcbiAgICAgICAgY29uZmlybVRleHQ6IGFjdGlvbkxhYmVsLFxyXG4gICAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVTdGF0dXNUcmFuc2l0aW9uKFxyXG4gICAgICAgICAgICBhY3Rpb24ubmV4dFN0YXR1cyxcclxuICAgICAgICAgICAgYWN0aW9uTGFiZWwsXHJcbiAgICAgICAgICAgIHN0YXR1c1RyYW5zaXRpb25Db21tZW50UmVmLmN1cnJlbnRcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBpZiAob2spIHtcclxuICAgICAgICAgICAgaW52YWxpZGF0ZUNhY2hlZExpc3RGb3JSZWZldGNoKCk7XHJcbiAgICAgICAgICAgIHJlc2V0U3RhdHVzVHJhbnNpdGlvbkRpYWxvZygpO1xyXG4gICAgICAgICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgICAgICAgcmVsb2FkRXhwZW5zZVBhZ2UoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBvaztcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGNsb3NlQ29uZmlybSxcclxuICAgICAgaGFuZGxlU3RhdHVzVHJhbnNpdGlvbixcclxuICAgICAgaGFzU3RhdHVzQWN0aW9uQ29udGVudCxcclxuICAgICAgaGVhZGVyPy5lc3RhZG9Db21lbnRhcmlvcyxcclxuICAgICAgaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMsXHJcbiAgICAgIGludmFsaWRhdGVDYWNoZWRMaXN0Rm9yUmVmZXRjaCxcclxuICAgICAgb3BlbkNvbmZpcm0sXHJcbiAgICAgIHJlc2V0U3RhdHVzVHJhbnNpdGlvbkRpYWxvZyxcclxuICAgIF1cclxuICApO1xyXG5cclxuICB1c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zKHtcclxuICAgIGJ1c3k6IGJ1c3kgfHwgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLFxyXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgYWN0aW9uTW9kZTogdG9wYmFyQWN0aW9uTW9kZSxcclxuICAgIGlzTG9ja2VkOiBpc1NoZWV0TG9ja2VkLFxyXG4gICAgaXNFZGl0TG9ja2VkOiBpc1JlYWRPbmx5TW9kZSxcclxuICAgIGlzRGVsZXRlTG9ja2VkOiBpc1NoZWV0TG9ja2VkLFxyXG4gICAgcGVybWlzc2lvbnNSZWFkeTogZGV0YWlsUGVybWlzc2lvbnNSZWFkeSxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6IGNhbkNyZWF0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyxcclxuICAgIGNhbkVkaXRFeHBlbnNlOiBjYW5FZGl0QW55Q3VycmVudCxcclxuICAgIGNhbkRlbGV0ZUV4cGVuc2U6IGNhbkRlbGV0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICAgIGhhbmRsZVVwZGF0ZTogaGFuZGxlVXBkYXRlV2l0aFByb2plY3RQcm9wYWdhdGlvbixcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICAgIG9uU2F2ZVN1Y2Nlc3M6IGhhbmRsZVNhdmVTdWNjZXNzLFxyXG4gICAgb25EZWxldGVTdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgIGludmFsaWRhdGVDYWNoZWRMaXN0Rm9yUmVmZXRjaCgpO1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvRXhwZW5zZVNoZWV0c1wiKTtcclxuICAgIH0sXHJcbiAgICBzYXZlQ29uZmlybVRpdGxlOiBwcm9qZWN0UHJvcGFnYXRpb25TYXZlVGl0bGUsXHJcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2U6IHByb2plY3RQcm9wYWdhdGlvblNhdmVNZXNzYWdlLFxyXG4gICAgc2F2ZUNvbmZpcm1UZXh0OiBwcm9qZWN0UHJvcGFnYXRpb25TYXZlQ29uZmlybVRleHQsXHJcbiAgICBzYXZlQ29uZmlybU9uQ2FuY2VsOiBoYW5kbGVQZW5kaW5nUHJvamVjdFByb3BhZ2F0aW9uQ2FuY2VsLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XHJcbiAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xyXG4gICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xyXG4gICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcclxuICAgIGlmICghbGluZUNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gY2FyZDtcclxuICB9LCBbXSk7XHJcblxyXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoe1xyXG4gICAgY29udGFpbmVyUmVmOiBsaW5lQ29udGFpbmVyUmVmLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgaXRlbXM6IHZpc2libGVMaW5lcyxcclxuICAgIHJlc29sdmVDbGlja2FibGVDYXJkLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBxdWlja1RpY2tldEZsb3cgPSB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3coe1xyXG4gICAgc2hlZXRJZDogc2FmZVRleHQoaGVhZGVyPy5ob2phR2FzdG9zSWQgfHwgc2hlZXRJZCksXHJcbiAgICBwcm9qZWN0SWQ6IHByb2plY3RWYWx1ZSxcclxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpLFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogIWlzQ3JlYXRlTW9kZSAmJiBkZXRhaWxQb2xpY3kuc2hvd0ZhYixcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzU2hlZXRMb2NrZWQ6ICFjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLFxyXG4gICAgbGlua1RvU2hlZXQ6IGZhbHNlLFxyXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXHJcbiAgICBvbkNvbXBsZXRlZDogKHJlc3VsdCkgPT4ge1xyXG4gICAgICBjb25zdCBjcmVhdGVkRmlsZUlkID0gc2FmZVRleHQocmVzdWx0Py5maWxlSWQpO1xyXG4gICAgICBpZiAoIWNyZWF0ZWRGaWxlSWQpIHtcclxuICAgICAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHJlc3VsdD8ubGlua2VkVG9TaGVldCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJlbG9hZEV4cGVuc2VQYWdlKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjdXJyZW50U2hlZXRJZCA9IHNhZmVUZXh0KGhlYWRlcj8uaG9qYUdhc3Rvc0lkIHx8IHNoZWV0SWQpO1xyXG4gICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICAgIGZpbGVJZDogY3JlYXRlZEZpbGVJZCxcclxuICAgICAgICBtb2RlOiBcImVkaXRcIixcclxuICAgICAgICBvcmlnaW46IFwic2hlZXQtY3JlYXRlXCIsXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoY3VycmVudFNoZWV0SWQpIHtcclxuICAgICAgICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoe1xyXG4gICAgICAgICAgZmlsZUlkOiBjcmVhdGVkRmlsZUlkLFxyXG4gICAgICAgICAgb3JpZ2luOiBcInNoZWV0LWNyZWF0ZVwiLFxyXG4gICAgICAgICAgc2hlZXRJZDogY3VycmVudFNoZWV0SWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcXVlcnkuc2V0KFwic2hlZXRJZFwiLCBjdXJyZW50U2hlZXRJZCk7XHJcbiAgICAgIH1cclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGZhYk1lbnVJdGVtcyA9IHVzZU1lbW88RmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbVtdPihcclxuICAgICgpID0+IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiBcIm5ldy10aWNrZXRcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX05ld1RpY2tldFwiLCBcIk51ZXZvIFRpY2tldFwiKSxcclxuICAgICAgICBpY29uOiA8TmV3VGlja2V0SWNvbiAvPixcclxuICAgICAgICBvbkNsaWNrOiBxdWlja1RpY2tldEZsb3cub3BlblNvdXJjZVBpY2tlcixcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiBcImxpbmstdGlja2V0XCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9MaW5rVGlja2V0XCIsIFwiVmluY3VsYXIgVGlja2V0XCIpLFxyXG4gICAgICAgIGljb246IDxMaW5rVGlja2V0SWNvbiAvPixcclxuICAgICAgICBvbkNsaWNrOiBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogXCJuZXctbGluZVwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfTmV3TGluZVwiLCBcIk51ZXZhIExpbmVhXCIpLFxyXG4gICAgICAgIGljb246IDxOZXdMaW5lSWNvbiAvPixcclxuICAgICAgICBvbkNsaWNrOiBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgW2hhbmRsZU9wZW5DcmVhdGVMaW5lTW9kZSwgaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlLCBxdWlja1RpY2tldEZsb3cub3BlblNvdXJjZVBpY2tlcl1cclxuICApO1xyXG5cclxuICBjb25zdCBzaG93U3RhdHVzQWN0aW9uQmFyID1cclxuICAgICFpc0NyZWF0ZU1vZGUgJiYgIWlzTG9hZGluZyAmJiAhaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlICYmICFlcnJvck1lc3NhZ2UgJiYgZGV0YWlsUG9saWN5LnN0YXR1c0FjdGlvbnMubGVuZ3RoID4gMDtcclxuICBjb25zdCBzaG93RmFiID0gIWlzQ3JlYXRlTW9kZSAmJiBkZXRhaWxQb2xpY3kuc2hvd0ZhYjtcclxuICBjb25zdCBoYXNWaXNpYmxlU3RhdHVzQ29tbWVudCA9IHNhZmVUZXh0KGhlYWRlcj8uZXN0YWRvQ29tZW50YXJpb3MpLnRyaW0oKS5sZW5ndGggPiAwO1xyXG4gIGNvbnN0IHN0YXR1c0NvbW1lbnRNb2RlOiBcImhpZGRlblwiIHwgXCJyZWFkXCIgPSBoYXNWaXNpYmxlU3RhdHVzQ29tbWVudCA/IFwicmVhZFwiIDogXCJoaWRkZW5cIjtcclxuICBjb25zdCBtb2RhbEJvZHkgPSBzaG93U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRGaWVsZCA/IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cclxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPlxyXG4gICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TdGF0dXNDb21tZW50XCIsIFwiU3RhdHVzIGNvbW1lbnRcIil9XHJcbiAgICAgIDwvbGFiZWw+XHJcbiAgICAgIDx0ZXh0YXJlYVxyXG4gICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCByZXNpemUtbm9uZVwiXHJcbiAgICAgICAgcm93cz17M31cclxuICAgICAgICB2YWx1ZT17c3RhdHVzVHJhbnNpdGlvbkNvbW1lbnR9XHJcbiAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgbmV4dFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCI7XHJcbiAgICAgICAgICBzdGF0dXNUcmFuc2l0aW9uQ29tbWVudFJlZi5jdXJyZW50ID0gbmV4dFZhbHVlO1xyXG4gICAgICAgICAgc2V0U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnQobmV4dFZhbHVlKTtcclxuICAgICAgICB9fVxyXG4gICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1N0YXR1c0NvbW1lbnRcIiwgXCJTdGF0dXMgY29tbWVudFwiKX1cclxuICAgICAgLz5cclxuICAgIDwvZGl2PlxyXG4gICkgOiBudWxsO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc2hlZXRJZCxcclxuICAgIGhlYWRlcixcclxuICAgIHZpc2libGVMaW5lcyxcclxuICAgIGxpbmVQYWdlLFxyXG4gICAgdG90YWxMaW5lUGFnZXMsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBidXN5LFxyXG4gICAgc3RhdHVzLFxyXG4gICAgbW9kYWxFcnJvcixcclxuICAgIGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSxcclxuICAgIG1vZGFsLFxyXG4gICAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICAgIG1vZGFsQ2FuY2VsVGV4dCxcclxuICAgIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgICBtb2RhbEJvZHksXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlRm9yQ3VycmVudFZpZXcsXHJcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgIGNhblVzZUZ1bGxFZGl0RmVhdHVyZXMsXHJcbiAgICBzaG93U3RhdHVzQWN0aW9uQmFyLFxyXG4gICAgc2hvd0ZhYixcclxuICAgIGFyZVN0YXR1c0FjdGlvbnNEaXNhYmxlZCxcclxuICAgIGZhYk1lbnVJdGVtcyxcclxuICAgIHBhZ2luYXRpb25MYWJlbHMsXHJcbiAgICB0b3RhbEFtb3VudFRleHQsXHJcbiAgICBzdGF0dXNDb21tZW50TW9kZSxcclxuICAgIG93bmVyRGlzcGxheSxcclxuICAgIHByb2plY3RWYWx1ZSxcclxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LFxyXG4gICAgc2hvd0V4Y2hhbmdlUmF0ZSxcclxuICAgIGV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSxcclxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgZGV0YWlsUG9saWN5LFxyXG4gICAgbGluZUNvbnRhaW5lclJlZixcclxuICAgIGNhbWVyYUlucHV0UmVmLFxyXG4gICAgZ2FsbGVyeUlucHV0UmVmLFxyXG4gICAgcXVpY2tUaWNrZXRGbG93LFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICBjb21taXREcmFmdFByb2plY3RJZDogaGFuZGxlRHJhZnRQcm9qZWN0SWRDb21taXQsXHJcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlOiBoYW5kbGVEcmFmdFJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2UsXHJcbiAgICBzZXREcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgbmF2aWdhdGVUb0xpbmVEZXRhaWw6IGhhbmRsZU9wZW5MaW5lRGV0YWlsLFxyXG4gICAgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtLFxyXG4gICAgaGFuZGxlU3RhdHVzQWN0aW9uQ2xpY2ssXHJcbiAgICBjbG9zZUNvbmZpcm06IGhhbmRsZUNhbmNlbENvbmZpcm0sXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7XG4gIGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeSxcbiAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeSxcbiAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LFxufSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvc2Vzc2lvbkV4cGlyeS50c1wiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZVNjb3BlVG9rZW4gfSBmcm9tIFwiLi9leHBlbnNlU2NvcGUudHNcIjtcblxuY29uc3QgRVhQRU5TRV9TSEVFVF9DUkVBVEVEX1JFVFVSTl9DT05URVhUX0tFWV9QUkVGSVggPSBcImV4cGVuc2Vfc2hlZXRfY3JlYXRlZF9yZXR1cm5fY29udGV4dF92MVwiO1xuY29uc3QgRVhQRU5TRV9TSEVFVF9DUkVBVEVEX1JFVFVSTl9DT05URVhUX1RUTF9NUyA9IDIgKiA2MCAqIDYwICogMTAwMDtcblxuZXhwb3J0IHR5cGUgRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQgPSB7XG4gIHNoZWV0SWQ6IHN0cmluZztcbn07XG5cbmNvbnN0IGdldFNjb3BlZEtleSA9ICgpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gYCR7RVhQRU5TRV9TSEVFVF9DUkVBVEVEX1JFVFVSTl9DT05URVhUX0tFWV9QUkVGSVh9XyR7Z2V0RXhwZW5zZVNjb3BlVG9rZW4oKX1gO1xufTtcblxuLy8gTm9ybWFsaXplcyB0aGUgY3JlYXRlZC1zaGVldCByZXR1cm4gcGF5bG9hZCB1c2VkIGJldHdlZW4gY3JlYXRlIGFuZCBkZXRhaWwgZmxvd3MuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQgPSAoXG4gIHZhbHVlOiB1bmtub3duXG4pOiBFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCB8IG51bGwgPT4ge1xuICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgcGF5bG9hZCA9IHZhbHVlIGFzIFBhcnRpYWw8RXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQ+O1xuICBjb25zdCBzaGVldElkID0gc2FmZVRleHQocGF5bG9hZC5zaGVldElkKTtcbiAgaWYgKCFzaGVldElkKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4ge1xuICAgIHNoZWV0SWQsXG4gIH07XG59O1xuXG4vLyBSZWFkcyB0aGUgc3RvcmVkIGNyZWF0ZWQtc2hlZXQgcmV0dXJuIGNvbnRleHQgZm9yIHRoZSBhY3RpdmUgZXhwZW5zZSBzY29wZS5cbmV4cG9ydCBjb25zdCByZWFkRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQgPSAoXG4gIHNoZWV0SWQ/OiB1bmtub3duXG4pOiBFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCB8IG51bGwgPT4ge1xuICBjb25zdCBzdG9yZWQgPSBub3JtYWxpemVFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dChcbiAgICBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnk8RXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQ+KGdldFNjb3BlZEtleSgpKVxuICApO1xuICBpZiAoIXN0b3JlZCkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChzaGVldElkKTtcbiAgaWYgKCFzYWZlU2hlZXRJZCkgcmV0dXJuIHN0b3JlZDtcbiAgcmV0dXJuIHN0b3JlZC5zaGVldElkLnRvVXBwZXJDYXNlKCkgPT09IHNhZmVTaGVldElkLnRvVXBwZXJDYXNlKCkgPyBzdG9yZWQgOiBudWxsO1xufTtcblxuLy8gQ2xlYXJzIHRoZSBjcmVhdGVkLXNoZWV0IHJldHVybiBjb250ZXh0IGZvciB0aGUgYWN0aXZlIGV4cGVuc2Ugc2NvcGUuXG5leHBvcnQgY29uc3QgY2xlYXJFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCA9ICgpOiB2b2lkID0+IHtcbiAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShnZXRTY29wZWRLZXkoKSk7XG59O1xuXG4vLyBQZXJzaXN0cyB0aGUgY3JlYXRlZC1zaGVldCBjb250ZXh0IHNvIHRoZSBuZXh0IGRldGFpbCBwYWdlIGNhbiBhcm0gdGhlIGxpc3QgcmV0dXJuIHN0YXRlLlxuZXhwb3J0IGNvbnN0IHNhdmVFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCA9IChcbiAgdmFsdWU6IEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0IHwgbnVsbCB8IHVuZGVmaW5lZFxuKTogRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQgfCBudWxsID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0KHZhbHVlKTtcbiAgaWYgKCFub3JtYWxpemVkKSB7XG4gICAgY2xlYXJFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCgpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5KGdldFNjb3BlZEtleSgpLCBub3JtYWxpemVkLCBFWFBFTlNFX1NIRUVUX0NSRUFURURfUkVUVVJOX0NPTlRFWFRfVFRMX01TKTtcbiAgcmV0dXJuIG5vcm1hbGl6ZWQ7XG59O1xuXG4vLyBDb25zdW1lcyB0aGUgY3JlYXRlZC1zaGVldCBjb250ZXh0IG9uY2UgdGhlIG1hdGNoaW5nIGRldGFpbCBwYWdlIGlzIGxvYWRlZC5cbmV4cG9ydCBjb25zdCBjb25zdW1lRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQgPSAoXG4gIHNoZWV0SWQ/OiB1bmtub3duXG4pOiBFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCB8IG51bGwgPT4ge1xuICBjb25zdCBzdG9yZWQgPSByZWFkRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQoc2hlZXRJZCk7XG4gIGlmICghc3RvcmVkKSByZXR1cm4gbnVsbDtcblxuICBjbGVhckV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0KCk7XG4gIHJldHVybiBzdG9yZWQ7XG59O1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldExpbmUsXHJcbiAgRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlcXVlc3QsXHJcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlR2FzdG9UeXBlQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIG5vcm1hbGl6ZUV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICBub3JtYWxpemVFeHBlbnNlUmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxufSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VSZWltYnVyc2FibGVFeHBlbnNlQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyBleGVjdXRlRXhwZW5zZU11dGF0aW9uIH0gZnJvbSBcIi4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgY3JlYXRlRXhwZW5zZVNoZWV0LFxyXG4gIGRlbGV0ZUV4cGVuc2VTaGVldCxcclxuICB1cGRhdGVFeHBlbnNlU2hlZXRMaW5lLFxyXG4gIHVwZGF0ZUV4cGVuc2VTaGVldEhlYWRlcixcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnNBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcclxuICBpc0VkaXRMb2NrZWQ6IGJvb2xlYW47XHJcbiAgaXNEZWxldGVMb2NrZWQ6IGJvb2xlYW47XHJcbiAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XHJcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xyXG4gIGxvY2tlZEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGxvY2tlZEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xyXG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBjYW5FZGl0SGVhZGVyRmllbGRzOiBib29sZWFuO1xyXG4gIGNhblRyYW5zaXRpb25TdGF0dXM6IGJvb2xlYW47XHJcbiAgc2hlZXRJZDogc3RyaW5nO1xyXG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcclxuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlOiBzdHJpbmc7XHJcbiAgZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlOiBudW1iZXIgfCBudWxsO1xyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWU6IHN0cmluZztcclxuICBkcmFmdFByb2plY3RJZDogc3RyaW5nO1xyXG4gIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3M6IHN0cmluZztcclxuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k6IHN0cmluZztcclxuICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzPzogbnVtYmVyIHwgbnVsbDtcclxuICBjdXJyZW50TGluZXM6IEV4cGVuc2VTaGVldExpbmVbXTtcclxuICBvbkNyZWF0ZVN1Y2Nlc3M6IChjcmVhdGVkU2hlZXRJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxuICBzZXRTdGF0dXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG59O1xyXG5cclxuY29uc3QgdG9GaW5pdGVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCB0b1Bvc2l0aXZlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gdG9GaW5pdGVOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBwYXJzZWQgIT0gbnVsbCAmJiBwYXJzZWQgPiAwID8gcGFyc2VkIDogbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkTGluZVVwZGF0ZVBheWxvYWQgPSAoXHJcbiAgbGluZTogRXhwZW5zZVNoZWV0TGluZSxcclxuICBwcm9qZWN0SWQ6IHN0cmluZyxcclxuICByZWltYnVyc2FibGVFeHBlbnNlOiBudW1iZXJcclxuKTogRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlcXVlc3QgPT4ge1xyXG4gIGNvbnN0IHR5cGVWYWx1ZSA9IHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUobGluZS50eXBlVmFsdWVDb2RlIHx8IGxpbmUudHlwZVZhbHVlLCB7IGFsbG93Tm9uZTogZmFsc2UgfSk7XHJcbiAgY29uc3QgcmF3UXR5ID0gdG9Qb3NpdGl2ZU51bWJlcihsaW5lLnF0eSk7XHJcbiAgY29uc3QgcmF3UHJpY2UgPSB0b1Bvc2l0aXZlTnVtYmVyKGxpbmUucHJpY2UpO1xyXG4gIGNvbnN0IHJhd0Ftb3VudCA9IHRvUG9zaXRpdmVOdW1iZXIobGluZS5hbW91bnQpO1xyXG4gIGNvbnN0IHF0eSA9IHJhd1F0eSA/PyAocmF3QW1vdW50ICE9IG51bGwgPyAxIDogMCk7XHJcbiAgY29uc3QgcHJpY2UgPSByYXdQcmljZSA/PyAocmF3QW1vdW50ICE9IG51bGwgJiYgcXR5ID4gMCA/IHJhd0Ftb3VudCAvIHF0eSA6IDApO1xyXG4gIGNvbnN0IHRyYW5zRGF0ZSA9IHNhZmVUZXh0KGxpbmUudHJhbnNEYXRlKTtcclxuXHJcbiAgaWYgKCF0cmFuc0RhdGUgfHwgdHlwZVZhbHVlID09PSBudWxsIHx8ICEocXR5ID4gMCkgfHwgIShwcmljZSA+IDApKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0cmFuc0RhdGUsXHJcbiAgICB0eXBlVmFsdWUsXHJcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQobGluZS5kZXNjcmlwdGlvbiksXHJcbiAgICBpbnRlcm5hY2lvbmFsOiBsaW5lLmludGVybmFjaW9uYWwgPT09IHRydWUsXHJcbiAgICBmaWxlSWQ6IHNhZmVUZXh0KGxpbmUuZmlsZUlkKSB8fCB1bmRlZmluZWQsXHJcbiAgICB0aWNrZXQ6IGxpbmUudGlja2V0ID09PSB0cnVlLFxyXG4gICAgcXR5LFxyXG4gICAgcHJpY2UsXHJcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KHByb2plY3RJZCkgfHwgdW5kZWZpbmVkLFxyXG4gICAgcmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQobGluZS5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCkgfHwgdW5kZWZpbmVkLFxyXG4gICAgYW1vdW50TVNUOiB0b0Zpbml0ZU51bWJlcihsaW5lLmFtb3VudE1TVCksXHJcbiAgICBleGNoUmF0ZTogdG9GaW5pdGVOdW1iZXIobGluZS5leGNoUmF0ZSksXHJcbiAgICBpbmRBdHRhY2hGaWxlczogc2FmZVRleHQobGluZS5pbmRBdHRhY2hGaWxlcykgfHwgdW5kZWZpbmVkLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBidWlsZFJlaW1idXJzYWJsZUxpbmVVcGRhdGVQYXlsb2FkID0gKFxyXG4gIGxpbmU6IEV4cGVuc2VTaGVldExpbmUsXHJcbiAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogbnVtYmVyXHJcbik6IEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0ID0+IHtcclxuICByZXR1cm4gYnVpbGRMaW5lVXBkYXRlUGF5bG9hZChsaW5lLCBzYWZlVGV4dChsaW5lLnByb2pJZCksIHJlaW1idXJzYWJsZUV4cGVuc2UpO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRQcm9qZWN0TGluZVVwZGF0ZVBheWxvYWQgPSAoXHJcbiAgbGluZTogRXhwZW5zZVNoZWV0TGluZSxcclxuICBwcm9qZWN0SWQ6IHN0cmluZ1xyXG4pOiBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVxdWVzdCA9PiB7XHJcbiAgcmV0dXJuIGJ1aWxkTGluZVVwZGF0ZVBheWxvYWQoXHJcbiAgICBsaW5lLFxyXG4gICAgcHJvamVjdElkLFxyXG4gICAgbm9ybWFsaXplRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlKGxpbmUucmVpbWJ1cnNhYmxlRXhwZW5zZSlcclxuICApO1xyXG59O1xyXG5cclxuY29uc3QgdXBkYXRlUmVpbWJ1cnNhYmxlRXhwZW5zZU9uTGluZXMgPSBhc3luYyAoXHJcbiAgc2hlZXRJZDogc3RyaW5nLFxyXG4gIGxpbmVzOiBFeHBlbnNlU2hlZXRMaW5lW10sXHJcbiAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogbnVtYmVyXHJcbik6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQoc2hlZXRJZCk7XHJcbiAgaWYgKCFzYWZlU2hlZXRJZCB8fCBsaW5lcy5sZW5ndGggPCAxKSByZXR1cm47XHJcblxyXG4gIGNvbnN0IG5leHRMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZSA9IG5vcm1hbGl6ZUV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZShyZWltYnVyc2FibGVFeHBlbnNlKTtcclxuICBjb25zdCB1cGRhdGVzID0gbGluZXMubWFwKChsaW5lKSA9PiB7XHJcbiAgICBjb25zdCBsaW5lUmVjSWQgPSBzYWZlVGV4dChsaW5lLmxpbmVSZWNJZCk7XHJcbiAgICBpZiAoIWxpbmVSZWNJZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBsaW5lUmVjSWQsXHJcbiAgICAgIHBheWxvYWQ6IGJ1aWxkUmVpbWJ1cnNhYmxlTGluZVVwZGF0ZVBheWxvYWQobGluZSwgbmV4dExpbmVSZWltYnVyc2FibGVFeHBlbnNlKSxcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIGF3YWl0IFByb21pc2UuYWxsKFxyXG4gICAgdXBkYXRlcy5tYXAoYXN5bmMgKHsgbGluZVJlY0lkLCBwYXlsb2FkIH0pID0+IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1cGRhdGVFeHBlbnNlU2hlZXRMaW5lKHNhZmVTaGVldElkLCBsaW5lUmVjSWQsIHBheWxvYWQsIHtcclxuICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCB1cGRhdGVQcm9qZWN0SWRPbkxpbmVzID0gYXN5bmMgKFxyXG4gIHNoZWV0SWQ6IHN0cmluZyxcclxuICBsaW5lczogRXhwZW5zZVNoZWV0TGluZVtdLFxyXG4gIHByb2plY3RJZDogc3RyaW5nXHJcbik6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQoc2hlZXRJZCk7XHJcbiAgaWYgKCFzYWZlU2hlZXRJZCB8fCBsaW5lcy5sZW5ndGggPCAxKSByZXR1cm47XHJcblxyXG4gIGNvbnN0IHNhZmVQcm9qZWN0SWQgPSBzYWZlVGV4dChwcm9qZWN0SWQpO1xyXG4gIGNvbnN0IHVwZGF0ZXMgPSBsaW5lcy5tYXAoKGxpbmUpID0+IHtcclxuICAgIGNvbnN0IGxpbmVSZWNJZCA9IHNhZmVUZXh0KGxpbmUubGluZVJlY0lkKTtcclxuICAgIGlmICghbGluZVJlY0lkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxpbmVSZWNJZCxcclxuICAgICAgcGF5bG9hZDogYnVpbGRQcm9qZWN0TGluZVVwZGF0ZVBheWxvYWQobGluZSwgc2FmZVByb2plY3RJZCksXHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICBhd2FpdCBQcm9taXNlLmFsbChcclxuICAgIHVwZGF0ZXMubWFwKGFzeW5jICh7IGxpbmVSZWNJZCwgcGF5bG9hZCB9KSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdXBkYXRlRXhwZW5zZVNoZWV0TGluZShzYWZlU2hlZXRJZCwgbGluZVJlY0lkLCBwYXlsb2FkLCB7XHJcbiAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICApO1xyXG59O1xyXG5cclxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgZXhwZW5zZSBzaGVldCBoZWFkZXIgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zID0gKHtcclxuICBidXN5LFxyXG4gIGlzRWRpdGluZyxcclxuICBpc0NyZWF0ZU1vZGUsXHJcbiAgaXNFZGl0TG9ja2VkLFxyXG4gIGlzRGVsZXRlTG9ja2VkLFxyXG4gIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcclxuICBsb2NrZWRDdXJyZW5jeUNvZGUsXHJcbiAgbG9ja2VkRXhjaGFuZ2VSYXRlLFxyXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXHJcbiAgY2FuRWRpdEV4cGVuc2UsXHJcbiAgY2FuRGVsZXRlRXhwZW5zZSxcclxuICBjYW5FZGl0SGVhZGVyRmllbGRzLFxyXG4gIGNhblRyYW5zaXRpb25TdGF0dXMsXHJcbiAgc2hlZXRJZCxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIGRyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gIGRyYWZ0UHJvamVjdElkLFxyXG4gIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gIGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXMsXHJcbiAgY3VycmVudExpbmVzLFxyXG4gIG9uQ3JlYXRlU3VjY2VzcyxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIHNldEJ1c3ksXHJcbiAgc2V0U3RhdHVzLFxyXG4gIHNldElzRWRpdGluZyxcclxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xyXG4gIGNvbnN0IGJ1aWxkVXBkYXRlUGF5bG9hZCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKFxyXG4gICAgICBuZXh0U3RhdHVzPzogbnVtYmVyIHwgbnVsbCxcclxuICAgICAgc3RhdHVzQ29tbWVudE92ZXJyaWRlPzogc3RyaW5nIHwgbnVsbFxyXG4gICAgKTogeyBwYXlsb2FkOiBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0IH0gfCB7IGVycm9yOiBzdHJpbmcgfSA9PiB7XHJcbiAgICAgIGNvbnN0IGhhc0V4cGxpY2l0U3RhdHVzQ29tbWVudE92ZXJyaWRlID0gc3RhdHVzQ29tbWVudE92ZXJyaWRlICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWREZXNjcmlwdGlvbiA9IFN0cmluZyhkcmFmdERlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZFByb2plY3RJZCA9IFN0cmluZyhkcmFmdFByb2plY3RJZCB8fCBcIlwiKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRFc3RhZG9Db21lbnRhcmlvcyA9IFN0cmluZyhcclxuICAgICAgICBzdGF0dXNDb21tZW50T3ZlcnJpZGUgPz8gZHJhZnRFc3RhZG9Db21lbnRhcmlvcyA/PyBcIlwiXHJcbiAgICAgICkudHJpbSgpO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkUmVpbWJ1cnNhYmxlRXhwZW5zZSA9IG5vcm1hbGl6ZUV4cGVuc2VSZWltYnVyc2FibGVFeHBlbnNlKGRyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSk7XHJcbiAgICAgIGNvbnN0IHJlc29sdmVkRXhwZW5zZVNoZWV0U3RhdHVzID1cclxuICAgICAgICBuZXh0U3RhdHVzID8/IChjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzICE9IG51bGwgPyBOdW1iZXIoY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cykgOiB1bmRlZmluZWQpO1xyXG5cclxuICAgICAgaWYgKCFub3JtYWxpemVkRGVzY3JpcHRpb24pIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgZXJyb3I6IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fRGVzY3JpcHRpb25SZXF1aXJlZFwiLCBcIkRlc2NyaXB0aW9uIGlzIHJlcXVpcmVkLlwiKSxcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHBheWxvYWQ6IHtcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBub3JtYWxpemVkRGVzY3JpcHRpb24sXHJcbiAgICAgICAgICBwcm9qSWQ6IG5vcm1hbGl6ZWRQcm9qZWN0SWQgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgZXhwZW5zZVNoZWV0U3RhdHVzOiByZXNvbHZlZEV4cGVuc2VTaGVldFN0YXR1cyxcclxuICAgICAgICAgIHJlaW1idXJzYWJsZUV4cGVuc2U6IG5vcm1hbGl6ZWRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgICAgICAgLy8gUHJlc2VydmUgZXhwbGljaXQgZW1wdHkgc3RhdHVzIGNvbW1lbnRzIHNvIHRoZSBiYWNrZW5kIGNhbiBjbGVhciB0aGUgc3RvcmVkIHZhbHVlLlxyXG4gICAgICAgICAgZXN0YWRvQ29tZW50YXJpb3M6IGhhc0V4cGxpY2l0U3RhdHVzQ29tbWVudE92ZXJyaWRlXHJcbiAgICAgICAgICAgID8gbm9ybWFsaXplZEVzdGFkb0NvbWVudGFyaW9zXHJcbiAgICAgICAgICAgIDogKG5vcm1hbGl6ZWRFc3RhZG9Db21lbnRhcmlvcyB8fCB1bmRlZmluZWQpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBjYW5FZGl0SGVhZGVyRmllbGRzLFxyXG4gICAgICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzLFxyXG4gICAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgICBkcmFmdFByb2plY3RJZCxcclxuICAgICAgZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVXBkYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kgfHwgIWlzRWRpdGluZykgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFpc0NyZWF0ZU1vZGUgJiYgaXNFZGl0TG9ja2VkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgY2FuUHJvY2VlZCA9IGlzQ3JlYXRlTW9kZSA/IGNhbkNyZWF0ZUV4cGVuc2UgOiBjYW5FZGl0RXhwZW5zZTtcclxuICAgIGlmICghY2FuUHJvY2VlZCkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXlsb2FkUmVzdWx0ID0gYnVpbGRVcGRhdGVQYXlsb2FkKCk7XHJcbiAgICBpZiAoXCJlcnJvclwiIGluIHBheWxvYWRSZXN1bHQpIHtcclxuICAgICAgc2V0TW9kYWxFcnJvcihwYXlsb2FkUmVzdWx0LmVycm9yKTtcclxuICAgICAgc2V0U3RhdHVzKHBheWxvYWRSZXN1bHQuZXJyb3IpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgIHN0YXJ0U3RhdHVzOiBpc0NyZWF0ZU1vZGVcclxuICAgICAgICA/IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIilcclxuICAgICAgICA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGluZ1wiLCBcIlVwZGF0aW5nIGV4cGVuc2Ugc2hlZXQuLi5cIiksXHJcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRCdXN5LFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgICAgIGNvbnN0IGNyZWF0ZVBheWxvYWQgPSBwYXlsb2FkUmVzdWx0LnBheWxvYWQ7XHJcbiAgICAgICAgICBjb25zdCBwYXlsb2FkOiBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0ID0ge1xyXG4gICAgICAgICAgICBtb2RlOiAxLFxyXG4gICAgICAgICAgICBleGlzdGluZ0hvamFHYXN0b3NJZDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogY3JlYXRlUGF5bG9hZC5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgcHJvaklkOiBjcmVhdGVQYXlsb2FkLnByb2pJZCxcclxuICAgICAgICAgICAgZXhwZW5zZVNoZWV0U3RhdHVzOiAwLFxyXG4gICAgICAgICAgICByZWltYnVyc2FibGVFeHBlbnNlOiBjcmVhdGVQYXlsb2FkLnJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbiAgICAgICAgICAgIGxpbmVzOiBbXSxcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjcmVhdGVFeHBlbnNlU2hlZXQocGF5bG9hZCk7XHJcblxyXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gQWNjZXB0IGJvdGggY2FzaW5nIHZhcmlhbnRzIGZyb20gYmFja2VuZCBlbnZlbG9wZXMuXHJcbiAgICAgICAgICBjb25zdCBjcmVhdGVkRGF0YSA9IHJlc3BvbnNlPy5EYXRhIGFzIHsgSG9qYUdhc3Rvc0lkPzogdW5rbm93bjsgaG9qYUdhc3Rvc0lkPzogdW5rbm93biB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcclxuICAgICAgICAgIGNvbnN0IGNyZWF0ZWRTaGVldElkID0gU3RyaW5nKGNyZWF0ZWREYXRhPy5Ib2phR2FzdG9zSWQgPz8gY3JlYXRlZERhdGE/LmhvamFHYXN0b3NJZCA/PyBcIlwiKS50cmltKCk7XHJcbiAgICAgICAgICBpZiAoIWNyZWF0ZWRTaGVldElkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIG9uQ3JlYXRlU3VjY2VzcyhjcmVhdGVkU2hlZXRJZCk7XHJcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyKHNoZWV0SWQsIHBheWxvYWRSZXN1bHQucGF5bG9hZCk7XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgdXBkYXRlZFwiKSk7XHJcbiAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQub2s7XHJcbiAgfSwgW1xyXG4gICAgYnVzeSxcclxuICAgIGJ1aWxkVXBkYXRlUGF5bG9hZCxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2UsXHJcbiAgICBjYW5FZGl0RXhwZW5zZSxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzRWRpdExvY2tlZCxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG9uQ3JlYXRlU3VjY2VzcyxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2hlZXRJZCxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUHJvcGFnYXRlUmVpbWJ1cnNhYmxlRXhwZW5zZVRvTGluZXMgPSB1c2VDYWxsYmFjayhcclxuICAgIGFzeW5jIChuZXh0UmVpbWJ1cnNhYmxlRXhwZW5zZTogbnVtYmVyKSA9PiB7XHJcbiAgICAgIGlmIChidXN5IHx8IGlzQ3JlYXRlTW9kZSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChpc0VkaXRMb2NrZWQgfHwgIWNhbkVkaXRFeHBlbnNlIHx8ICFjYW5FZGl0SGVhZGVyRmllbGRzKSB7XHJcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgICAgc3RhcnRTdGF0dXM6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9Qcm9wYWdhdGluZ1JlaW1idXJzYWJsZVwiLCBcIlVwZGF0aW5nIGV4cGVuc2Ugc2hlZXQgbGluZXMuLi5cIiksXHJcbiAgICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgICBzZXRCdXN5LFxyXG4gICAgICAgIHNldFN0YXR1cyxcclxuICAgICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIGF3YWl0IHVwZGF0ZVJlaW1idXJzYWJsZUV4cGVuc2VPbkxpbmVzKFxyXG4gICAgICAgICAgICBzaGVldElkLFxyXG4gICAgICAgICAgICBjdXJyZW50TGluZXMsXHJcbiAgICAgICAgICAgIG5vcm1hbGl6ZUV4cGVuc2VSZWltYnVyc2FibGVFeHBlbnNlKG5leHRSZWltYnVyc2FibGVFeHBlbnNlKVxyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IHVwZGF0ZWRcIikpO1xyXG4gICAgICAgICAgc2V0SXNFZGl0aW5nKHRydWUpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gcmVzdWx0Lm9rO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgYnVzeSxcclxuICAgICAgY2FuRWRpdEV4cGVuc2UsXHJcbiAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHMsXHJcbiAgICAgIGN1cnJlbnRMaW5lcyxcclxuICAgICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgICBpc0VkaXRMb2NrZWQsXHJcbiAgICAgIGlzRWRpdGluZyxcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIHNoZWV0SWQsXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUHJvcGFnYXRlUHJvamVjdElkVG9MaW5lcyA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKG5leHRQcm9qZWN0SWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICBpZiAoYnVzeSB8fCBpc0NyZWF0ZU1vZGUgfHwgIWlzRWRpdGluZykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoaXNFZGl0TG9ja2VkIHx8ICFjYW5FZGl0RXhwZW5zZSB8fCAhY2FuRWRpdEhlYWRlckZpZWxkcykge1xyXG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUHJvcGFnYXRpbmdQcm9qZWN0XCIsIFwiVXBkYXRpbmcgZXhwZW5zZSBzaGVldCBsaW5lcy4uLlwiKSxcclxuICAgICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKSxcclxuICAgICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICAgIHNldEJ1c3ksXHJcbiAgICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgYXdhaXQgdXBkYXRlUHJvamVjdElkT25MaW5lcyhzaGVldElkLCBjdXJyZW50TGluZXMsIG5leHRQcm9qZWN0SWQpO1xyXG5cclxuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgdXBkYXRlZFwiKSk7XHJcbiAgICAgICAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQub2s7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBidXN5LFxyXG4gICAgICBjYW5FZGl0RXhwZW5zZSxcclxuICAgICAgY2FuRWRpdEhlYWRlckZpZWxkcyxcclxuICAgICAgY3VycmVudExpbmVzLFxyXG4gICAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICAgIGlzRWRpdExvY2tlZCxcclxuICAgICAgaXNFZGl0aW5nLFxyXG4gICAgICBzZXRCdXN5LFxyXG4gICAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgc2hlZXRJZCxcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVTdGF0dXNUcmFuc2l0aW9uID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAobmV4dFN0YXR1czogbnVtYmVyLCBzdGFydFN0YXR1czogc3RyaW5nLCBzdGF0dXNDb21tZW50T3ZlcnJpZGU/OiBzdHJpbmcgfCBudWxsKSA9PiB7XHJcbiAgICAgIGlmIChidXN5IHx8IGlzQ3JlYXRlTW9kZSB8fCAhc2hlZXRJZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoIWNhblRyYW5zaXRpb25TdGF0dXMpIHtcclxuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwYXlsb2FkUmVzdWx0ID0gYnVpbGRVcGRhdGVQYXlsb2FkKG5leHRTdGF0dXMsIHN0YXR1c0NvbW1lbnRPdmVycmlkZSk7XHJcbiAgICAgIGlmIChcImVycm9yXCIgaW4gcGF5bG9hZFJlc3VsdCkge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IocGF5bG9hZFJlc3VsdC5lcnJvcik7XHJcbiAgICAgICAgc2V0U3RhdHVzKHBheWxvYWRSZXN1bHQuZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgICAgc3RhcnRTdGF0dXMsXHJcbiAgICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgICBzZXRCdXN5LFxyXG4gICAgICAgIHNldFN0YXR1cyxcclxuICAgICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyKHNoZWV0SWQsIHBheWxvYWRSZXN1bHQucGF5bG9hZCk7XHJcblxyXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBzaGVldCB1cGRhdGVkXCIpKTtcclxuICAgICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQub2s7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBidXN5LFxyXG4gICAgICBidWlsZFVwZGF0ZVBheWxvYWQsXHJcbiAgICAgIGNhblRyYW5zaXRpb25TdGF0dXMsXHJcbiAgICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIHNoZWV0SWQsXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChpc0RlbGV0ZUxvY2tlZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5EZWxldGVFeHBlbnNlKSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0aW5nXCIsIFwiRGVsZXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcclxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIiksXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldEJ1c3ksXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXQoc2hlZXRJZCk7XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgZGVsZXRlZFwiKSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xyXG4gIH0sIFtidXN5LCBjYW5EZWxldGVFeHBlbnNlLCBpc0RlbGV0ZUxvY2tlZCwgc2V0QnVzeSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzLCBzaGVldElkXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVQcm9wYWdhdGVSZWltYnVyc2FibGVFeHBlbnNlVG9MaW5lcyxcclxuICAgIGhhbmRsZVByb3BhZ2F0ZVByb2plY3RJZFRvTGluZXMsXHJcbiAgICBoYW5kbGVTdGF0dXNUcmFuc2l0aW9uLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zIH0gZnJvbSBcIi4uL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIGFjdGlvbk1vZGU/OiBcImRlZmF1bHRcIiB8IFwiZGVsZXRlX29ubHlcIiB8IFwidmlld19vbmx5XCI7XHJcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XHJcbiAgaXNFZGl0TG9ja2VkPzogYm9vbGVhbjtcclxuICBpc0RlbGV0ZUxvY2tlZD86IGJvb2xlYW47XHJcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XHJcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBjYW5EZWxldGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgaGFuZGxlRGVsZXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XHJcbiAgb25EZWxldGVTdWNjZXNzPzogKCkgPT4gdm9pZDtcclxuICBzYXZlQ29uZmlybVRpdGxlPzogc3RyaW5nO1xyXG4gIHNhdmVDb25maXJtTWVzc2FnZT86IHN0cmluZztcclxuICBzYXZlQ29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgc2F2ZUNvbmZpcm1PbkNhbmNlbD86ICgpID0+IHZvaWQ7XHJcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xyXG4gICAgb25DYW5jZWw/OiAoKSA9PiB2b2lkO1xyXG4gIH0pID0+IHZvaWQ7XHJcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gc3RhdGUgYW5kIGRpc3BhdGNoIGFjdGlvbnMgZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbE9wZW4sXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzQ3JlYXRlTW9kZSxcclxuICBhY3Rpb25Nb2RlID0gXCJkZWZhdWx0XCIsXHJcbiAgaXNMb2NrZWQsXHJcbiAgaXNFZGl0TG9ja2VkLFxyXG4gIGlzRGVsZXRlTG9ja2VkLFxyXG4gIHBlcm1pc3Npb25zUmVhZHkgPSB0cnVlLFxyXG4gIGNhbkVkaXRFeHBlbnNlLFxyXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXHJcbiAgY2FuRGVsZXRlRXhwZW5zZSxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICBoYW5kbGVVcGRhdGUsXHJcbiAgaGFuZGxlRGVsZXRlLFxyXG4gIG9uU2F2ZVN1Y2Nlc3MsXHJcbiAgb25EZWxldGVTdWNjZXNzLFxyXG4gIHNhdmVDb25maXJtVGl0bGUsXHJcbiAgc2F2ZUNvbmZpcm1NZXNzYWdlLFxyXG4gIHNhdmVDb25maXJtVGV4dCxcclxuICBzYXZlQ29uZmlybU9uQ2FuY2VsLFxyXG4gIG9wZW5Db25maXJtLFxyXG4gIGNsb3NlQ29uZmlybSxcclxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcclxuICB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMoe1xyXG4gICAgYWN0aW9uR3JvdXBJZDogXCJleHBlbnNlLXNoZWV0LWRldGFpbC1hY3Rpb25zXCIsXHJcbiAgICBpZHM6IHtcclxuICAgICAgZWRpdEljb25JZDogXCJleHBlbnNlRWRpdEljb25cIixcclxuICAgICAgc2F2ZUljb25JZDogXCJleHBlbnNlU2F2ZUljb25cIixcclxuICAgICAgZGVsZXRlQnRuSWQ6IFwiZXhwZW5zZURlbGV0ZUJ0blwiLFxyXG4gICAgICBjYW5jZWxCdG5JZDogXCJleHBlbnNlQ2FuY2VsQnRuXCIsXHJcbiAgICB9LFxyXG4gICAgZXZlbnRzOiB7XHJcbiAgICAgIGVkaXRFdmVudDogXCJleHBlbnNlLWRldGFpbC1lZGl0XCIsXHJcbiAgICAgIGRlbGV0ZUV2ZW50OiBcImV4cGVuc2UtZGV0YWlsLWRlbGV0ZVwiLFxyXG4gICAgICBjYW5jZWxFdmVudDogXCJleHBlbnNlLWRldGFpbC1jYW5jZWwtZWRpdFwiLFxyXG4gICAgfSxcclxuICAgIGJ1c3ksXHJcbiAgICBtb2RhbE9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0xvY2tlZCxcclxuICAgIGFjdGlvbk1vZGUsXHJcbiAgICBpc0VkaXRMb2NrZWQsXHJcbiAgICBpc0RlbGV0ZUxvY2tlZCxcclxuICAgIGFsbG93Q3JlYXRlTW9kZUFjdGlvbnNXaGVuTG9ja2VkOiB0cnVlLFxyXG4gICAgcGVybWlzc2lvbnNSZWFkeSxcclxuICAgIGNhbkNyZWF0ZTogY2FuQ3JlYXRlRXhwZW5zZSxcclxuICAgIGNhbkVkaXQ6IGNhbkVkaXRFeHBlbnNlLFxyXG4gICAgY2FuRGVsZXRlOiBjYW5EZWxldGVFeHBlbnNlLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlU2F2ZTogaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgc2F2ZUNvbmZpcm1UaXRsZTogc2F2ZUNvbmZpcm1UaXRsZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJTYXZlIGNoYW5nZXNcIiksXHJcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2U6IHNhdmVDb25maXJtTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXHJcbiAgICBzYXZlQ29uZmlybVRleHQ6IHNhdmVDb25maXJtVGV4dCB8fCBpbmRUKFwiQ29tbW9uX1NhdmVcIiwgXCJTYXZlXCIpLFxyXG4gICAgc2F2ZUNvbmZpcm1PbkNhbmNlbCxcclxuICAgIGRlbGV0ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZVNoZWV0X1RpdGxlXCIsIFwiRGVsZXRlIGV4cGVuc2Ugc2hlZXRcIiksXHJcbiAgICBkZWxldGVDb25maXJtTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZVNoZWV0X0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBleHBlbnNlIHNoZWV0P1wiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKSxcclxuICAgIG9uU2F2ZVN1Y2Nlc3MsXHJcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6IG9uRGVsZXRlU3VjY2VzcyB8fCAoKCkgPT4gbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldHNcIikpLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlU2hlZXRIZWFkZXIsXHJcbiAgRXhwZW5zZVNoZWV0TGluZSxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwsXHJcbiAgZ2V0RXhjaGFuZ2VSYXRlLFxyXG4gIGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUsXHJcbiAgbWFwRXhwZW5zZVNoZWV0SGVhZGVyLFxyXG4gIG1hcEV4cGVuc2VTaGVldExpbmUsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHtcclxuICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXHJcbiAgbmF2aWdhdGVUb0V4cGVuc2VVcmwsXHJcbiAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHsgaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTWFuYWdlZFVzZXJTY29wZS50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leGNoYW5nZVJhdGVFbnRyeU1vZGVDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgREVGQVVMVF9SRUlNQlVSU0FCTEVfRVhQRU5TRSxcclxuICBub3JtYWxpemVFeHBlbnNlUmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxufSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VSZWltYnVyc2FibGVFeHBlbnNlQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIGhhc0Fzc2lnbmVkVm91Y2hlciwgcGFyc2VFeHBlbnNlRGF0ZSwgc2FmZVRleHQsIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIsIHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcbmltcG9ydCB7IHJlc29sdmVFeHBlbnNlU2hlZXREZXRhaWxQb2xpY3kgfSBmcm9tIFwiLi9leHBlbnNlU2hlZXREZXRhaWxQb2xpY3kudHNcIjtcclxuXHJcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfREVCT1VOQ0VfTVMgPSA0MDA7XHJcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfUkVGRVJFTkNFX0FNT1VOVCA9IDEwMDtcclxuY29uc3QgRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyA9IDc7XHJcbmNvbnN0IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkVEID0gMjtcclxuY29uc3QgRVhQRU5TRV9TVEFUVVNfUEFJRCA9IDQ7XHJcblxyXG4vLyBOb3JtYWxpemVzIGV4Y2hhbmdlLXJhdGUgbnVtYmVycyBmb3IgbnVtZXJpYyBpbnB1dCBjb250cm9scy5cclxuY29uc3QgZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZSA9ICh2YWx1ZTogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKHZhbHVlLCB7XHJcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXHJcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXHJcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gUmV1c2VzIHRoZSBmaXhlZCBzYW1lLWN1cnJlbmN5IHJhdGUgc28gRVVSIHNoZWV0cyBzdGF5IGFsaWduZWQgd2l0aCB0aGUgMTAwIHJlZmVyZW5jZSBhbW91bnQuXHJcbmNvbnN0IFNBTUVfQ1VSUkVOQ1lfRVhDSEFOR0VfUkFURV9JTlBVVCA9IGZvcm1hdEV4Y2hhbmdlUmF0ZUlucHV0VmFsdWUoRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5UKTtcclxuXHJcbmNvbnN0IGJ1aWxkQ3JlYXRlSGVhZGVyRHJhZnQgPSAoKTogRXhwZW5zZVNoZWV0SGVhZGVyID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgaG9qYUdhc3Rvc0lkOiBcIlwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiXCIsXHJcbiAgICBwcm9qSWQ6IFwiXCIsXHJcbiAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXHJcbiAgICB0b3RhbEFtb3VudDogbnVsbCxcclxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogMCxcclxuICAgIGV4Y2hhbmdlUmF0ZU1vZGU6IDAsXHJcbiAgICByZWltYnVyc2FibGVFeHBlbnNlOiBERUZBVUxUX1JFSU1CVVJTQUJMRV9FWFBFTlNFLFxyXG4gICAgY3JlYXRlZERhdGU6IFwiXCIsXHJcbiAgICBleGNoUmF0ZTogU3RyaW5nKEVYQ0hBTkdFX1JBVEVfUkVGRVJFTkNFX0FNT1VOVCksXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IHNob3VsZFNob3dFeGNoYW5nZVJhdGUgPSAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBmYWxzZTtcclxuICBjb25zdCBwYXJzZWQgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQodmFsdWUpO1xyXG4gIGlmIChwYXJzZWQgPT09IG51bGwpIHJldHVybiB0cnVlO1xyXG4gIHJldHVybiBNYXRoLmFicyhwYXJzZWQpID4gMDtcclxufTtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGVBcmdzID0ge1xyXG4gIGhhc0FjY2VzczogYm9vbGVhbjtcclxuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGJvb2xlYW47XHJcbiAgY2FuTWFuYWdlT3RoZXJVc2VyczogYm9vbGVhbjtcclxuICBjdXJyZW50QXhVc2VySWQ6IHN0cmluZztcclxuICBjdXJyZW50Q3JtVXNlcklkOiBzdHJpbmc7XHJcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkOiBzdHJpbmc7XHJcbiAgc2hlZXRJZDogc3RyaW5nO1xyXG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcclxuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIE93bnMgc3RhdGUgYW5kIGJlaGF2aW9yIGZvciBleHBlbnNlIHNoZWV0IGRldGFpbCBwYWdlIChyZWFkLCBlZGl0LCBjcmVhdGUpLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUgPSAoe1xyXG4gIGhhc0FjY2VzcyxcclxuICBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICBjdXJyZW50QXhVc2VySWQsXHJcbiAgY3VycmVudENybVVzZXJJZCxcclxuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgc2hlZXRJZCxcclxuICBpc0NyZWF0ZU1vZGUsXHJcbiAgb25Gb3JiaWRkZW4sXHJcbn06IFVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlQXJncykgPT4ge1xyXG4gIGNvbnN0IFtoZWFkZXIsIHNldEhlYWRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRIZWFkZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbbGluZXMsIHNldExpbmVzXSA9IHVzZVN0YXRlPEV4cGVuc2VTaGVldExpbmVbXT4oW10pO1xyXG4gIGNvbnN0IFtsaW5lUGFnZSwgc2V0TGluZVBhZ2VdID0gdXNlU3RhdGUoMSk7XHJcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbaXNFZGl0aW5nLCBzZXRJc0VkaXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdERlc2NyaXB0aW9uLCBzZXREcmFmdERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdFByb2plY3RJZCwgc2V0RHJhZnRQcm9qZWN0SWRdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0Q3VycmVuY3lDb2RlLCBzZXREcmFmdEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRFeGNoYW5nZVJhdGUsIHNldERyYWZ0RXhjaGFuZ2VSYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UsIHNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZV0gPSB1c2VTdGF0ZTxudW1iZXIgfCBudWxsPihERUZBVUxUX1JFSU1CVVJTQUJMRV9FWFBFTlNFKTtcclxuICBjb25zdCBbZHJhZnRFc3RhZG9Db21lbnRhcmlvcywgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvc10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZGVmYXVsdEN1cnJlbmN5Q29kZSwgc2V0RGVmYXVsdEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbaXNFeGNoYW5nZVJhdGVMb2FkaW5nLCBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtleGNoYW5nZVJhdGVNZXNzYWdlLCBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtleGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvciwgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyID0gdXNlQ2FsbGJhY2soKG5leHRIZWFkZXI6IEV4cGVuc2VTaGVldEhlYWRlciB8IG51bGwpID0+IHtcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24oc2FmZVRleHQobmV4dEhlYWRlcj8uZGVzY3JpcHRpb24pKTtcclxuICAgIHNldERyYWZ0UHJvamVjdElkKHNhZmVUZXh0KG5leHRIZWFkZXI/LnByb2pJZCkpO1xyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUoc2FmZVRleHQobmV4dEhlYWRlcj8uY3VycmVuY3lDb2RlKSk7XHJcbiAgICBzZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2Uobm9ybWFsaXplRXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2UobmV4dEhlYWRlcj8ucmVpbWJ1cnNhYmxlRXhwZW5zZSkpO1xyXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUoXHJcbiAgICAgIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihuZXh0SGVhZGVyPy5leGNoUmF0ZSwge1xyXG4gICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcclxuICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXHJcbiAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICAgICAgZmFsbGJhY2s6IFwiXCIsXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvcyhzYWZlVGV4dChuZXh0SGVhZGVyPy5lc3RhZG9Db21lbnRhcmlvcykpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGxvYWREZXRhaWwgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGlmICghaGFzQWNjZXNzKSB7XHJcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UpIHtcclxuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkcmFmdEhlYWRlciA9IGJ1aWxkQ3JlYXRlSGVhZGVyRHJhZnQoKTtcclxuICAgICAgICBzZXRIZWFkZXIoZHJhZnRIZWFkZXIpO1xyXG4gICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICBzZXRMaW5lUGFnZSgxKTtcclxuICAgICAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XHJcbiAgICAgICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihkcmFmdEhlYWRlcik7XHJcbiAgICAgICAgc2V0U3RhdHVzKFwiXCIpO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghc2hlZXRJZCkge1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldERldGFpbChzaGVldElkLCB7XHJcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlPy5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlwiKSk7XHJcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzaGVldHMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkU2hlZXQgPVxyXG4gICAgICAgICAgc2hlZXRzLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uSG9qYUdhc3Rvc0lkKS50b1VwcGVyQ2FzZSgpID09PSBzaGVldElkLnRyaW0oKS50b1VwcGVyQ2FzZSgpKSB8fCBzaGVldHNbMF07XHJcblxyXG4gICAgICAgIGlmICghc2VsZWN0ZWRTaGVldCkge1xyXG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBuZXh0SGVhZGVyID0gbWFwRXhwZW5zZVNoZWV0SGVhZGVyKHNlbGVjdGVkU2hlZXQpO1xyXG4gICAgICAgIGNvbnN0IG5leHRMaW5lcyA9IChBcnJheS5pc0FycmF5KHNlbGVjdGVkU2hlZXQuTGluZXMpID8gc2VsZWN0ZWRTaGVldC5MaW5lcyA6IFtdKS5tYXAoKGVudHJ5KSA9PlxyXG4gICAgICAgICAgbWFwRXhwZW5zZVNoZWV0TGluZShlbnRyeSlcclxuICAgICAgICApO1xyXG4gICAgICAgIHNldEhlYWRlcihuZXh0SGVhZGVyKTtcclxuICAgICAgICBzZXRMaW5lcyhuZXh0TGluZXMpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoXHJcbiAgICAgICAgICBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlwiKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZvaWQgbG9hZERldGFpbCgpO1xyXG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBoYXNBY2Nlc3MsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzQ3JlYXRlTW9kZSwgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaGVhZGVyIHx8IGlzRWRpdGluZykgcmV0dXJuO1xyXG4gICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihoZWFkZXIpO1xyXG4gIH0sIFtoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzRWRpdGluZ10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFoYXNBY2Nlc3MpIHJldHVybjtcclxuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuXHJcbiAgICBjb25zdCBsb2FkRGVmYXVsdEN1cnJlbmN5Q29kZSA9IGFzeW5jICgpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBjb2RlID0gYXdhaXQgZ2V0RXhwZW5zZVNoZWV0RGVmYXVsdEN1cnJlbmN5Q29kZSh7XHJcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XHJcbiAgICAgICAgc2V0RGVmYXVsdEN1cnJlbmN5Q29kZShzYWZlVGV4dChjb2RlKS50b1VwcGVyQ2FzZSgpKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2b2lkIGxvYWREZWZhdWx0Q3VycmVuY3lDb2RlKCk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpc0NhbmNlbGxlZCA9IHRydWU7XHJcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoKTtcclxuICAgIH07XHJcbiAgfSwgW2hhc0FjY2Vzc10pO1xyXG5cclxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbygoKSA9PiBidXN5IHx8IGlzRWRpdGluZywgW2J1c3ksIGlzRWRpdGluZ10pO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKGhhc0FjdGl2ZVByb2Nlc3MpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtoYXNBY3RpdmVQcm9jZXNzXSk7XHJcblxyXG4gIGNvbnN0IHByb2plY3RWYWx1ZSA9IHNhZmVUZXh0KGhlYWRlcj8ucHJvaklkKTtcclxuICBjb25zdCBzdGF0dXNDb2RlID0gdHlwZW9mIGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSBcIm51bWJlclwiID8gaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA6IG51bGw7XHJcbiAgY29uc3QgaXNTaGVldEFwcHJvdmVkID0gc3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfQVBQUk9WRUQ7XHJcbiAgY29uc3QgaXNTaGVldFBhaWRCeVN0YXR1cyA9IHN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX1BBSUQ7XHJcbiAgY29uc3QgaXNTaGVldFBhaWRCeVZvdWNoZXIgPSBoYXNBc3NpZ25lZFZvdWNoZXIoaGVhZGVyPy52b3VjaGVyKTtcclxuICBjb25zdCBpc1NoZWV0UGFpZCA9IGlzU2hlZXRQYWlkQnlTdGF0dXMgfHwgaXNTaGVldFBhaWRCeVZvdWNoZXI7XHJcbiAgY29uc3QgaXNNYW5hZ2luZ090aGVyVXNlciA9IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQoe1xyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICByZWNvcmRPd25lclVzZXJJZDogaGVhZGVyPy51c2VySWQsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgfSk7XHJcbiAgY29uc3QgZGV0YWlsUG9saWN5ID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaW50ZXJhY3Rpb25Nb2RlOiBcImZ1bGxfZWRpdFwiIGFzIGNvbnN0LFxyXG4gICAgICAgIHNob3dGYWI6IGZhbHNlLFxyXG4gICAgICAgIGNhbkRlbGV0ZVNoZWV0OiBmYWxzZSxcclxuICAgICAgICBzdGF0dXNBY3Rpb25zOiBbXSxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzb2x2ZUV4cGVuc2VTaGVldERldGFpbFBvbGljeSh7XHJcbiAgICAgIHN0YXR1c0NvZGUsXHJcbiAgICAgIGlzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICAgIGlzUGFpZDogaXNTaGVldFBhaWQsXHJcbiAgICB9KTtcclxuICB9LCBbYWxsb3dTZWxmTWFuYWdlbWVudCwgaXNDcmVhdGVNb2RlLCBpc01hbmFnaW5nT3RoZXJVc2VyLCBpc1NoZWV0UGFpZCwgc3RhdHVzQ29kZV0pO1xyXG4gIGNvbnN0IGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50ID0gaXNDcmVhdGVNb2RlIHx8ICghaXNNYW5hZ2luZ090aGVyVXNlciAmJiBkZXRhaWxQb2xpY3kuaW50ZXJhY3Rpb25Nb2RlID09PSBcImZ1bGxfZWRpdFwiKTtcclxuICBjb25zdCBjYW5FZGl0U3RhdHVzQ29tbWVudEN1cnJlbnQgPSAhaXNDcmVhdGVNb2RlICYmIGRldGFpbFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgPT09IFwiY29tbWVudF9vbmx5X2VkaXRcIjtcclxuICBjb25zdCBjYW5FZGl0QW55Q3VycmVudCA9IChpc0NyZWF0ZU1vZGUgJiYgY2FuQ3JlYXRlRXhwZW5zZSkgfHwgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQgfHwgY2FuRWRpdFN0YXR1c0NvbW1lbnRDdXJyZW50O1xyXG4gIGNvbnN0IGNhblVzZUZ1bGxFZGl0RmVhdHVyZXMgPSAhaXNDcmVhdGVNb2RlICYmIGRldGFpbFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgPT09IFwiZnVsbF9lZGl0XCI7XHJcbiAgY29uc3QgaXNTaGVldExvY2tlZCA9IGlzU2hlZXRBcHByb3ZlZCB8fCBpc1NoZWV0UGFpZDtcclxuICBjb25zdCBoYXNMaW5lcyA9IGxpbmVzLmxlbmd0aCA+IDA7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlVmFsdWUgPSBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoc2FmZVRleHQoaGVhZGVyPy5leGNoUmF0ZSksIHtcclxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcclxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcclxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgZmFsbGJhY2s6IFwiXCIsXHJcbiAgfSk7XHJcbiAgY29uc3Qgc2hvd0V4Y2hhbmdlUmF0ZSA9IHVzZU1lbW8oKCkgPT4gc2hvdWxkU2hvd0V4Y2hhbmdlUmF0ZShleGNoYW5nZVJhdGVWYWx1ZSksIFtleGNoYW5nZVJhdGVWYWx1ZV0pO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ID0gdXNlTWVtbygoKSA9PiBkcmFmdEN1cnJlbmN5Q29kZS50cmltKCkudG9VcHBlckNhc2UoKSwgW2RyYWZ0Q3VycmVuY3lDb2RlXSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZERlZmF1bHRDdXJyZW5jeSA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQoZGVmYXVsdEN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSwgW2RlZmF1bHRDdXJyZW5jeUNvZGVdKTtcclxuICBjb25zdCBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kgPSBub3JtYWxpemVkRGVmYXVsdEN1cnJlbmN5IHx8IFwiRVVSXCI7XHJcbiAgY29uc3QgdWlMb2NhbGUgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBcImVzLUVTXCI7XHJcbiAgICByZXR1cm4gc2FmZVRleHQoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Py5sYW5nKSB8fCBcImVzLUVTXCI7XHJcbiAgfSwgW10pO1xyXG4gIGNvbnN0IGZvcm1FeGNoYW5nZURhdGUgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IHBhcnNlZERhdGUgPSBwYXJzZUV4cGVuc2VEYXRlKHNhZmVUZXh0KGhlYWRlcj8uY3JlYXRlZERhdGUpKTtcclxuICAgIGlmIChwYXJzZWREYXRlKSByZXR1cm4gdG9Jc29EYXRlKHBhcnNlZERhdGUpO1xyXG4gICAgcmV0dXJuIHRvSXNvRGF0ZShuZXcgRGF0ZSgpKTtcclxuICB9LCBbaGVhZGVyPy5jcmVhdGVkRGF0ZV0pO1xyXG4gIGNvbnN0IHNob3VsZExvYWRIZWFkZXJFeGNoYW5nZVJhdGUgPSBmYWxzZTtcclxuICBjb25zdCBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSA9IFwiXCI7XHJcbiAgLy8gSGVhZGVyIGN1cnJlbmN5IGlzIGxlZ2FjeS9yZWFkLW9ubHk7IGVkaXRhYmxlIGN1cnJlbmN5IG5vdyBiZWxvbmdzIHRvIGVhY2ggbGluZS5cclxuICBjb25zdCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyA9IGZhbHNlO1xyXG4gIGNvbnN0IGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyA9IGZhbHNlO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbGV0IGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICBsZXQgcmVxdWVzdFRpbWVyOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGwgPSBudWxsO1xyXG4gICAgbGV0IHJlcXVlc3RBYm9ydENvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlciB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0IGNsZWFyUmVxdWVzdEFydGlmYWN0cyA9ICgpID0+IHtcclxuICAgICAgaWYgKHJlcXVlc3RUaW1lcikge1xyXG4gICAgICAgIGNsZWFyVGltZW91dChyZXF1ZXN0VGltZXIpO1xyXG4gICAgICAgIHJlcXVlc3RUaW1lciA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlcXVlc3RBYm9ydENvbnRyb2xsZXIpIHtcclxuICAgICAgICByZXF1ZXN0QWJvcnRDb250cm9sbGVyLmFib3J0KCk7XHJcbiAgICAgICAgcmVxdWVzdEFib3J0Q29udHJvbGxlciA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKCFzaG91bGRMb2FkSGVhZGVyRXhjaGFuZ2VSYXRlIHx8ICFpc0VkaXRpbmcgfHwgIWNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50IHx8IGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcykge1xyXG4gICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcoZmFsc2UpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFwiXCIpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcbiAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFub3JtYWxpemVkRHJhZnRDdXJyZW5jeSB8fCAhZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5KSB7XHJcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICBjbGVhclJlcXVlc3RBcnRpZmFjdHMoKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgPT09IGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSkge1xyXG4gICAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShTQU1FX0NVUlJFTkNZX0VYQ0hBTkdFX1JBVEVfSU5QVVQpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFNBTUVfQ1VSUkVOQ1lfRVhDSEFOR0VfUkFURV9JTlBVVCk7XHJcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICBjbGVhclJlcXVlc3RBcnRpZmFjdHMoKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0VGltZXIgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcclxuICAgICAgcmVxdWVzdEFib3J0Q29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKHRydWUpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFwiXCIpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ2V0RXhjaGFuZ2VSYXRlKFxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgICAgICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXHJcbiAgICAgICAgICBmb3JtRXhjaGFuZ2VEYXRlLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgc2lnbmFsOiByZXF1ZXN0QWJvcnRDb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzIHx8ICFyZXNwb25zZS5EYXRhIHx8ICFOdW1iZXIuaXNGaW5pdGUoTnVtYmVyKHJlc3BvbnNlLkRhdGEuUmF0ZSkpKSB7XHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFxyXG4gICAgICAgICAgICBzYWZlVGV4dChyZXNwb25zZS5NZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaGUgZW5kcG9pbnQgcmV0dXJucyBvbmUgYmFzZS1jdXJyZW5jeSB1bml0IGluIHRoZSBleHBlbnNlIGN1cnJlbmN5LlxyXG4gICAgICAgIC8vIFRoZSBVSSBzdG9yZXMgdGhlIGFtb3VudCBmb3IgdGhlIGZpeGVkIGxvY2FsIHJlZmVyZW5jZSBhbW91bnQgKDEwMCkuXHJcbiAgICAgICAgY29uc3Qgb2ZmaWNpYWxSYXRlUGVyQmFzZVVuaXQgPSBOdW1iZXIocmVzcG9uc2UuRGF0YS5SYXRlKTtcclxuICAgICAgICBjb25zdCBvZmZpY2lhbFJhdGVGb3JSZWZlcmVuY2VBbW91bnQgPSBvZmZpY2lhbFJhdGVQZXJCYXNlVW5pdCAqIEVYQ0hBTkdFX1JBVEVfUkVGRVJFTkNFX0FNT1VOVDtcclxuICAgICAgICBjb25zdCBuZXh0RXhjaGFuZ2VSYXRlVmFsdWUgPSBmb3JtYXRFeGNoYW5nZVJhdGVJbnB1dFZhbHVlKG9mZmljaWFsUmF0ZUZvclJlZmVyZW5jZUFtb3VudCk7XHJcbiAgICAgICAgY29uc3Qgb2ZmaWNpYWxSYXRlUmF3VmFsdWUgPSBmb3JtYXRFeGNoYW5nZVJhdGVJbnB1dFZhbHVlKG9mZmljaWFsUmF0ZVBlckJhc2VVbml0KTtcclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKG5leHRFeGNoYW5nZVJhdGVWYWx1ZSk7XHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShvZmZpY2lhbFJhdGVSYXdWYWx1ZSk7XHJcbiAgICAgICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUobmV4dEV4Y2hhbmdlUmF0ZVZhbHVlKTtcclxuXHJcbiAgICAgICAgY29uc3QgZWZmZWN0aXZlUmF0ZURhdGUgPSBzYWZlVGV4dChyZXNwb25zZS5EYXRhLkRhdGUpIHx8IGZvcm1FeGNoYW5nZURhdGU7XHJcbiAgICAgICAgY29uc3Qgc291cmNlID0gc2FmZVRleHQocmVzcG9uc2UuRGF0YS5Tb3VyY2UpO1xyXG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShlZmZlY3RpdmVSYXRlRGF0ZSk7XHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2Uoc291cmNlKTtcclxuICAgICAgICBjb25zdCBvZmZpY2lhbExhYmVsID0gZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCgwKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9PZmZpY2lhbFwiLCBcIlQuQy4gT2ZpY2lhbFwiKTtcclxuICAgICAgICBjb25zdCBsb2NhbGl6ZWRSYXRlRGF0ZSA9IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShlZmZlY3RpdmVSYXRlRGF0ZSwgdWlMb2NhbGUpIHx8IGVmZmVjdGl2ZVJhdGVEYXRlO1xyXG4gICAgICAgIGNvbnN0IGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlID0gc291cmNlID8gYCR7b2ZmaWNpYWxMYWJlbH0gJHtsb2NhbGl6ZWRSYXRlRGF0ZX0gKCR7c291cmNlfSlgIDogYCR7b2ZmaWNpYWxMYWJlbH0gJHtsb2NhbGl6ZWRSYXRlRGF0ZX1gO1xyXG4gICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2Uob2ZmaWNpYWxSYXRlUmF3VmFsdWUgPyBgJHtleGNoYW5nZVJhdGVJbmZvTWVzc2FnZX0gLSAke29mZmljaWFsUmF0ZVJhd1ZhbHVlfWAgOiBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSk7XHJcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSB7XHJcbiAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDQpIHtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfTm90Rm91bmRcIiwgXCJObyBoYXkgdGlwbyBkZSBjYW1iaW8gcGFyYSBsYSBmZWNoYVwiKSk7XHJcbiAgICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDIyIHx8IGVycm9yLnN0YXR1cyA9PT0gNTAwKSB7XHJcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XHJcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcbiAgICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXHJcbiAgICAgICAgICAgICAgc2FmZVRleHQoZXJyb3IubWVzc2FnZSkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX1VuYXZhaWxhYmxlXCIsIFwiTm8gc2UgcHVkbyBvYnRlbmVyIGVsIHRpcG8gZGUgY2FtYmlvLlwiKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFxyXG4gICAgICAgICAgICBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xyXG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX1VuYXZhaWxhYmxlXCIsIFwiTm8gc2UgcHVkbyBvYnRlbmVyIGVsIHRpcG8gZGUgY2FtYmlvLlwiKSk7XHJcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgaWYgKCFpc0NhbmNlbGxlZCkge1xyXG4gICAgICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sIEVYQ0hBTkdFX1JBVEVfREVCT1VOQ0VfTVMpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlzQ2FuY2VsbGVkID0gdHJ1ZTtcclxuICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtcclxuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50LFxyXG4gICAgZm9ybUV4Y2hhbmdlRGF0ZSxcclxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcclxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxyXG4gICAgc2hvdWxkTG9hZEhlYWRlckV4Y2hhbmdlUmF0ZSxcclxuICAgIHVpTG9jYWxlLFxyXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlIHx8IGlzTG9hZGluZyB8fCAhaGVhZGVyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWNhbkVkaXRBbnlDdXJyZW50KSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xyXG4gICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihoZWFkZXIpO1xyXG4gICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9FZGl0aW5nRW5hYmxlZFwiLCBcIkVkaXRpbmcgZW5hYmxlZFwiKSk7XHJcbiAgfSwgW2NhbkVkaXRBbnlDdXJyZW50LCBoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzQ3JlYXRlTW9kZSwgaXNMb2FkaW5nLCBvbkZvcmJpZGRlbl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvRXhwZW5zZVNoZWV0c1wiLCB7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNFZGl0aW5nKSByZXR1cm47XHJcblxyXG4gICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGhlYWRlcik7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xyXG4gIH0sIFtoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nXSk7XHJcblxyXG4gIC8vIE9wZW5zIGV4cGVuc2Ugc2hlZXQgY3JlYXRlIG1vZGUgZnJvbSBsaXN0LWxldmVsIGVudHJ5IHBvaW50cy5cclxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlU2hlZXRNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlKSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP21vZGU9Y3JlYXRlXCIsIHtcclxuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXHJcbiAgICB9KTtcclxuICB9LCBbY2FuQ3JlYXRlRXhwZW5zZSwgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIG9uRm9yYmlkZGVuXSk7XHJcblxyXG4gIC8vIE9wZW5zIGV4cGVuc2UgbGluZSBjcmVhdGUgbW9kZSBmcm9tIGFuIGV4aXN0aW5nIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxyXG4gIGNvbnN0IGhhbmRsZU9wZW5DcmVhdGVMaW5lTW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghc2hlZXRJZCB8fCAhY2FuVXNlRnVsbEVkaXRGZWF0dXJlcykge1xyXG4gICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0TGluZURldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCl9Jm1vZGU9Y3JlYXRlYDtcclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xyXG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcclxuICAgIH0pO1xyXG4gIH0sIFtjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcclxuXHJcbiAgLy8gT3BlbnMgdGlja2V0cyBwYWdlIGZyb20gZXhwZW5zZSBzaGVldCBjb250ZXh0IHRvIGNyZWF0ZSBvciBsaW5rIHRpY2tldHMuXHJcbiAgY29uc3Qgb3BlblRpY2tldHNGcm9tU2hlZXQgPSB1c2VDYWxsYmFjayhcclxuICAgIChhY3Rpb246IFwibmV3XCIgfCBcImxpbmtcIikgPT4ge1xyXG4gICAgICBpZiAoIXNoZWV0SWQgfHwgIWNhblVzZUZ1bGxFZGl0RmVhdHVyZXMpIHtcclxuICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICBhY3Rpb24sXHJcbiAgICAgICAgaG9qYUdhc3Rvc0lkOiBzaGVldElkLFxyXG4gICAgICB9KTtcclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0cz8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbY2FuVXNlRnVsbEVkaXRGZWF0dXJlcywgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIG9uRm9yYmlkZGVuLCBzaGVldElkXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU9wZW5DcmVhdGVUaWNrZXRNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgb3BlblRpY2tldHNGcm9tU2hlZXQoXCJuZXdcIik7XHJcbiAgfSwgW29wZW5UaWNrZXRzRnJvbVNoZWV0XSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIG9wZW5UaWNrZXRzRnJvbVNoZWV0KFwibGlua1wiKTtcclxuICB9LCBbb3BlblRpY2tldHNGcm9tU2hlZXRdKTtcclxuXHJcbiAgY29uc3QgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldCA9IHVzZUNhbGxiYWNrKChjcmVhdGVkU2hlZXRJZDogc3RyaW5nKSA9PiB7XHJcbiAgICBjb25zdCBzYWZlQ3JlYXRlZFNoZWV0SWQgPSBzYWZlVGV4dChjcmVhdGVkU2hlZXRJZCk7XHJcbiAgICBpZiAoIXNhZmVDcmVhdGVkU2hlZXRJZCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHRhcmdldFVybCA9IGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZUNyZWF0ZWRTaGVldElkKX1gO1xyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IG5hdmlnYXRlVG9MaW5lRGV0YWlsID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoXHJcbiAgICAgIGxpbmVSZWNJZDogc3RyaW5nLFxyXG4gICAgICBvcHRpb25zPzoge1xyXG4gICAgICAgIG1vZGU/OiBcInZpZXdcIiB8IFwiZWRpdFwiO1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbj86IGJvb2xlYW47XHJcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlPzogYm9vbGVhbjtcclxuICAgICAgfVxyXG4gICAgKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNhZmVMaW5lSWQgPSBzYWZlVGV4dChsaW5lUmVjSWQpO1xyXG4gICAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHNoZWV0SWQpO1xyXG4gICAgICBpZiAoIXNhZmVMaW5lSWQgfHwgIXNhZmVTaGVldElkKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBzYWZlTW9kZSA9IG9wdGlvbnM/Lm1vZGUgPT09IFwiZWRpdFwiID8gXCJlZGl0XCIgOiBcIlwiO1xyXG4gICAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXRMaW5lRGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlU2hlZXRJZCl9JmxpbmVSZWNJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlTGluZUlkKX0ke3NhZmVNb2RlID8gYCZtb2RlPSR7c2FmZU1vZGV9YCA6IFwiXCJ9YDtcclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsLCB7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBvcHRpb25zPy5hc2tDb25maXJtYXRpb24gPz8gdHJ1ZSxcclxuICAgICAgICBieXBhc3NHdWFyZE9uY2U6IG9wdGlvbnM/LmJ5cGFzc0d1YXJkT25jZSA/PyBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW3NoZWV0SWRdXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGhlYWRlcixcclxuICAgIGxpbmVzLFxyXG4gICAgbGluZVBhZ2UsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBidXN5LFxyXG4gICAgc3RhdHVzLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxFcnJvcixcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdFByb2plY3RJZCxcclxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBkcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbiAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSxcclxuICAgIGlzRXhjaGFuZ2VSYXRlTG9hZGluZyxcclxuICAgIGV4Y2hhbmdlUmF0ZU1lc3NhZ2UsXHJcbiAgICBleGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcixcclxuICAgIHByb2plY3RWYWx1ZSxcclxuICAgIGlzU2hlZXRBcHByb3ZlZCxcclxuICAgIGlzU2hlZXRQYWlkLFxyXG4gICAgaXNTaGVldExvY2tlZCxcclxuICAgIGV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgc2hvd0V4Y2hhbmdlUmF0ZSxcclxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50OiBFWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQsXHJcbiAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSxcclxuICAgIGRldGFpbFBvbGljeSxcclxuICAgIGlzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICBjYW5FZGl0U3RhdHVzQ29tbWVudEN1cnJlbnQsXHJcbiAgICBjYW5FZGl0QW55Q3VycmVudCxcclxuICAgIGNhblVzZUZ1bGxFZGl0RmVhdHVyZXMsXHJcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXRMaW5lcyxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgIHNldERyYWZ0UHJvamVjdElkLFxyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIHNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgIHNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICAgIGhhbmRsZU9wZW5DcmVhdGVTaGVldE1vZGUsXHJcbiAgICBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsXHJcbiAgICBoYW5kbGVPcGVuQ3JlYXRlVGlja2V0TW9kZSxcclxuICAgIGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSxcclxuICAgIG5hdmlnYXRlVG9DcmVhdGVkU2hlZXQsXHJcbiAgICBuYXZpZ2F0ZVRvTGluZURldGFpbCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuLy8gU2hhcmVkIGljb24gZ2x5cGhzIGZvciB0aGUgZXhwZW5zZSBzaGVldCBkZXRhaWwgYWN0aW9uIG1lbnUuXHJcbmV4cG9ydCBjb25zdCBOZXdUaWNrZXRJY29uID0gKCkgPT4gKFxyXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwic2l6ZS01XCI+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMCAyMGgtNWEyIDIgMCAwIDEgLTIgLTJ2LTlhMiAyIDAgMCAxIDIgLTJoMWEyIDIgMCAwIDAgMiAtMmExIDEgMCAwIDEgMSAtMWg2YTEgMSAwIDAgMSAxIDFhMiAyIDAgMCAwIDIgMmgxYTIgMiAwIDAgMSAyIDJ2MlwiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNC4zNjIgMTEuMTVhMyAzIDAgMSAwIC00LjE0NCA0LjI2M1wiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAyMXYtNGEyIDIgMCAxIDEgNCAwdjRcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMTloNFwiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0yMSAxNXY2XCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBMaW5rVGlja2V0SWNvbiA9ICgpID0+IChcclxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cInNpemUtNVwiPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTMuMTkgOC42ODhhNC41IDQuNSAwIDAgMSAxLjI0MiA3LjI0NGwtNC41IDQuNWE0LjUgNC41IDAgMCAxLTYuMzY0LTYuMzY0bDEuNzU3LTEuNzU3bTEzLjM1LS42MjIgMS43NTctMS43NTdhNC41IDQuNSAwIDAgMC02LjM2NC02LjM2NGwtNC41IDQuNWE0LjUgNC41IDAgMCAwIDEuMjQyIDcuMjQ0XCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBOZXdMaW5lSWNvbiA9ICgpID0+IChcclxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cInNpemUtNVwiPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMyAxOWMzLjMzMyAtMiA1IC00IDUgLTZjMCAtMyAtMSAtMyAtMiAtM3MtMi4wMzIgMS4wODUgLTIgM2MuMDM0IDIuMDQ4IDEuNjU4IDIuODc3IDIuNSA0YzEuNSAyIDIuNSAyLjUgMy41IDFjLjY2NyAtMSAxLjE2NyAtMS44MzMgMS41IC0yLjVjMSAyLjMzMyAyLjMzMyAzLjUgNCAzLjVoMi41XCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTIwIDE3di0xMmMwIC0xLjEyMSAtLjg3OSAtMiAtMiAtMnMtMiAuODc5IC0yIDJ2MTJsMiAybDIgLTJcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTYgN2g0XCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUFrQjs7O0FDQWxCLElBQUFDLGdCQUFrQjs7O0FDQWxCLG1CQUFrQjtBQTZDSjtBQVZkLElBQU0sb0NBQW9DLENBQUM7QUFBQSxFQUN6QztBQUFBLEVBQ0E7QUFDRixNQUE4QztBQUM1QyxRQUFNLDRCQUE0QixvQkFBb0Isc0JBQXNCO0FBQzVFLFFBQU0sK0JBQStCLGFBQUFDLFFBQU07QUFBQSxJQUN6QyxNQUFNO0FBQUEsTUFDSjtBQUFBLFFBQ0UsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sTUFBTSw0Q0FBQyxtQ0FBd0IsY0FBYywyQkFBMkIsZUFBYyxXQUFVO0FBQUEsTUFDbEc7QUFBQSxJQUNGO0FBQUEsSUFDQSxDQUFDLHlCQUF5QjtBQUFBLEVBQzVCO0FBRUEsU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsT0FBTyxLQUFLLDZDQUE2Qyx3QkFBd0I7QUFBQSxNQUNqRixTQUFTO0FBQUEsTUFDVCxPQUFPO0FBQUEsTUFDUCxVQUFVLE1BQU07QUFBQSxNQUNoQixhQUFhLEtBQUssNkNBQTZDLGVBQWU7QUFBQSxNQUM5RSxVQUFRO0FBQUEsTUFDUixVQUFRO0FBQUEsTUFDUixnQkFBZ0I7QUFBQSxNQUNoQixrQkFBa0I7QUFBQSxNQUNsQixXQUFTO0FBQUEsTUFDVCxrQkFBaUI7QUFBQSxNQUNqQix3QkFBdUI7QUFBQSxNQUN2Qix1QkFBc0I7QUFBQSxNQUN0QixxQkFBb0I7QUFBQSxNQUNwQiwrQkFBOEI7QUFBQSxNQUM5QixvQkFBbUI7QUFBQSxNQUNuQixnQkFBZTtBQUFBLE1BQ2YsUUFBTztBQUFBLE1BQ1AsaUJBQWdCO0FBQUEsTUFDaEIsZ0JBQWU7QUFBQTtBQUFBLEVBQ2pCO0FBRUo7QUFFQSxJQUFPLDRDQUFROzs7QUNwRWYsSUFBTSwwQkFBZ0c7QUFBQSxFQUNwRyxHQUFHO0FBQUEsSUFDRCxVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsRUFDWjtBQUFBLEVBQ0EsR0FBRztBQUFBLElBQ0QsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLEVBQ1o7QUFDRjtBQUdBLElBQU0sMkNBQTJDLE1BQTZCO0FBQzVFLFFBQU0sU0FBUyxPQUFPLFdBQVcsZUFBZSxNQUFNLFFBQVEsT0FBTywrQkFBK0IsSUFDaEcsT0FBTyxrQ0FDUCxDQUFDO0FBRUwsU0FBTyxxQkFBcUIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxXQUFXO0FBQ3JELFVBQU0sU0FBUyxPQUFPLE9BQU8sS0FBSztBQUNsQyxXQUFPLE9BQU8sVUFBVSxNQUFNLEtBQUssVUFBVTtBQUFBLEVBQy9DLENBQUM7QUFDSDtBQUVBLElBQU0seUNBQXlDLENBQUMsVUFBK0M7QUFDN0YsUUFBTSxRQUFRLHlDQUF5QyxFQUFFLEtBQUssQ0FBQyxXQUFXLE9BQU8sT0FBTyxLQUFLLE1BQU0sS0FBSztBQUN4RyxTQUFPLE9BQU8sUUFBUTtBQUN4QjtBQUdPLElBQU0sbUNBQW1DLENBQUMsVUFBdUQ7QUFDdEcsTUFBSSxVQUFVLFFBQVEsVUFBVSxVQUFhLE9BQU8sS0FBSyxFQUFFLEtBQUssTUFBTSxHQUFJLFFBQU87QUFDakYsUUFBTSxTQUFTLE9BQU8sS0FBSztBQUMzQixNQUFJLE9BQU8sVUFBVSxNQUFNLEtBQUssVUFBVSxHQUFHO0FBQzNDLFdBQU87QUFBQSxFQUNUO0FBQ0EsU0FBTztBQUNUO0FBa0JPLElBQU0sa0NBQWtDLENBQUMsVUFBMkI7QUFDekUsUUFBTSxhQUFhLGlDQUFpQyxLQUFLO0FBQ3pELE1BQUksZUFBZSxLQUFNLFFBQU87QUFDaEMsUUFBTSxlQUFlLHVDQUF1QyxVQUFVO0FBQ3RFLE1BQUksYUFBYyxRQUFPO0FBRXpCLFFBQU0sT0FBTyx3QkFBd0IsVUFBVTtBQUMvQyxTQUFPLE9BQU8sS0FBSyxLQUFLLFVBQVUsS0FBSyxRQUFRLElBQUksT0FBTyxVQUFVO0FBQ3RFOzs7QUZpSEksSUFBQUMsc0JBQUE7QUExSEosSUFBTSxvQ0FBb0M7QUFDMUMsSUFBTSxxQ0FBcUM7QUFDM0MsSUFBTSxpQ0FBaUM7QUFHdkMsSUFBTSx5QkFBeUIsQ0FBQztBQUFBLEVBQzlCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGVBQWU7QUFBQSxFQUNmO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFtQztBQUNqQyxRQUFNLEVBQUUsY0FBYyxXQUFXLHFCQUFxQixrQkFBa0IsSUFBSTtBQUM1RSxRQUFNLEVBQUUseUJBQXlCLDZCQUE2QixpQkFBaUIsSUFBSTtBQUNuRixRQUFNLG9CQUNKLGFBQWEsdUJBQXVCLDRCQUE0QixNQUFNLDRCQUE0QjtBQUNwRyxRQUFNLHVCQUF1QixvQkFDekIsS0FBSyx1Q0FBdUMsa0JBQWtCLElBQzlELEtBQUssZ0NBQWdDLFVBQVU7QUFDbkQsUUFBTSxjQUNKLE9BQU8sdUJBQXVCLFFBQVEsT0FBTyx1QkFBdUIsU0FDaEUsTUFDQSxzQkFBc0IsT0FBTyxrQkFBa0I7QUFDckQsUUFBTSxxQkFBcUIsU0FBUyxPQUFPLFlBQVksRUFBRSxZQUFZO0FBQ3JFLFFBQU0sbUJBQW1CLFNBQVMsd0JBQXdCLEVBQUUsWUFBWTtBQUN4RSxRQUFNLDZCQUE2QixjQUFBQyxRQUFNLFFBQVEsTUFBTSw2Q0FBNkMsR0FBRyxDQUFDLENBQUM7QUFDekcsUUFBTSwyQkFBMkIsS0FBSywyQ0FBMkMsY0FBYztBQUMvRixRQUFNLDhCQUE4QjtBQUFBLElBQ2xDO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDQSxRQUFNLG1DQUFtQztBQUFBLElBQ3ZDO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDQSxRQUFNLDJCQUEyQjtBQUFBLElBQy9CLFlBQVksMkJBQTJCLE9BQU87QUFBQSxFQUNoRDtBQUNBLFFBQU0sc0NBQXNDLDJCQUEyQjtBQUFBLElBQ3JFLENBQUMsV0FBVyxPQUFPLE9BQU8sS0FBSyxNQUFNO0FBQUEsRUFDdkM7QUFDQSxRQUFNLDJCQUEyQixtQ0FBbUMsd0JBQXdCO0FBQzVGLFFBQU0sb0NBQW9DLGNBQUFBLFFBQU07QUFBQSxJQUM5QyxNQUNFLHNDQUNJLFNBQ0EsRUFBRSxPQUFPLE9BQU8sd0JBQXdCLEdBQUcsTUFBTSx5QkFBeUI7QUFBQSxJQUNoRixDQUFDLHFDQUFxQywwQkFBMEIsd0JBQXdCO0FBQUEsRUFDMUY7QUFFQSxRQUFNLHFCQUFxQixTQUFTLE9BQU8saUJBQWlCO0FBQzVELFFBQU0seUJBQXlCLENBQUMsZ0JBQWdCLHNCQUFzQjtBQUN0RSxRQUFNLDBCQUEwQix5QkFBeUIsaUJBQWlCO0FBQzFFLFFBQU0sd0JBQXdCLHlCQUF5Qiw0QkFBNEI7QUFDbkYsUUFBTSx3QkFDSiwyQkFBMkIsT0FDdkIsMEJBQ0EseUJBQXlCLE9BQ3ZCLHdCQUF3Qiw4QkFDeEI7QUFDUixRQUFNLHdCQUF3QjtBQUFBLElBQzVCLHlCQUF5QixPQUFPLHdCQUF3Qiw4QkFBOEI7QUFBQSxJQUN0RjtBQUFBLE1BQ0UsdUJBQXVCO0FBQUEsTUFDdkIsdUJBQXVCO0FBQUEsTUFDdkIsYUFBYTtBQUFBLE1BQ2IsVUFBVTtBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQ0EsUUFBTSx3QkFBd0IsaUNBQWlDLE9BQU8sZ0JBQWdCLEtBQUs7QUFDM0YsUUFBTSxzQkFDSiwwQkFBMEIsSUFDdEIsaURBQ0E7QUFDTixRQUFNLDJCQUEyQiwwQkFBMEIsSUFBSSxnQkFBZ0I7QUFDL0UsUUFBTSx5QkFDSCxnQ0FBZ0MscUJBQXFCLEtBQUssS0FBSyxxQkFBcUIsd0JBQXdCLEdBQzFHLFFBQVEsbUNBQW1DLEVBQUUsRUFDN0MsS0FBSyxFQUNMLFlBQVksTUFBTSwwQkFBMEIsSUFBSSxXQUFXO0FBQ2hFLFFBQU0sOEJBQ0osQ0FBQyxDQUFDLFNBQVMsNEJBQTRCLEtBQUssQ0FBQyxDQUFDLFNBQVMsd0JBQXdCLEtBQUssQ0FBQyxDQUFDLFNBQVMsMEJBQTBCO0FBQzNILFFBQU0sK0JBQStCLFNBQVMsd0JBQXdCLEtBQUssS0FBSyx1QkFBdUIsS0FBSztBQUM1RyxRQUFNLGlDQUFpQyxTQUFTLDBCQUEwQixFQUN2RSxRQUFRLHFCQUFxQixHQUFHLEVBQ2hDLFFBQVEsV0FBVyxHQUFHLEVBQ3RCLEtBQUssS0FBSyxLQUFLLHVCQUF1QixLQUFLO0FBQzlDLFFBQU0sa0NBQWtDO0FBQUEsSUFDdEM7QUFBQSxJQUNBO0FBQUEsSUFDQSxTQUFTLDRCQUE0QixLQUFLO0FBQUEsSUFDMUM7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNBLFFBQU0sZ0NBQWdDO0FBQUEsSUFDcEM7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0EsUUFBTSwwQkFBMEIsOEJBQThCLGtDQUFrQztBQUNoRyxRQUFNLGtDQUNKLDhDQUFDLFNBQUksV0FBVSxpQ0FDYjtBQUFBLGlEQUFDLFdBQU0sV0FBVyxnQ0FBaUMsb0NBQXlCO0FBQUEsSUFDNUU7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFNBQVM7QUFBQSxRQUNULFdBQVc7QUFBQSxRQUNYLFdBQVU7QUFBQSxRQUNWLGdCQUFlO0FBQUE7QUFBQSxJQUNqQjtBQUFBLEtBQ0Y7QUFFRixRQUFNLDJCQUNKLGFBQWEsc0JBQ1gsOENBQUMsU0FBSSxXQUFXLG9DQUNiO0FBQUE7QUFBQSxJQUNEO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFPO0FBQUEsUUFDUCxhQUFhO0FBQUEsUUFDYixTQUFTO0FBQUEsUUFDVCxnQkFBZ0I7QUFBQSxRQUNoQixPQUFPLE9BQU8sd0JBQXdCO0FBQUEsUUFDdEMsVUFBVSxDQUFDLFVBQVUsaUNBQWlDLG9DQUFvQyxLQUFLLENBQUM7QUFBQSxRQUNoRyxVQUFVLENBQUMsYUFBYSxDQUFDO0FBQUEsUUFDekIsVUFBVSxDQUFDLGFBQWEsQ0FBQztBQUFBLFFBQ3pCLFFBQU87QUFBQSxRQUNQLGlCQUFnQjtBQUFBLFFBQ2hCLGdCQUFlO0FBQUEsUUFDZixvQkFBbUI7QUFBQSxRQUNuQixXQUFXO0FBQUEsUUFDWCxnQkFBZ0I7QUFBQTtBQUFBLElBQ2xCO0FBQUEsS0FDRixJQUVBLDhDQUFDLFNBQUksV0FBVyxvQ0FDYjtBQUFBO0FBQUEsSUFDRCw2Q0FBQyxTQUFJLFdBQVUsWUFDYjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsV0FBVTtBQUFBLFFBQ1YsT0FBTyw0QkFBNEI7QUFBQSxRQUNuQyxVQUFRO0FBQUEsUUFDUixjQUFZO0FBQUE7QUFBQSxJQUNkLEdBQ0Y7QUFBQSxLQUNGO0FBRUosUUFBTSxnQkFDSjtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsYUFBYSxFQUFFLFdBQVcsb0JBQW9CO0FBQUEsTUFDOUMsZUFBZSxFQUFFLG1CQUFtQix5QkFBeUIsNkJBQTZCLGlCQUFpQjtBQUFBLE1BQzNHO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBO0FBQUEsRUFDRjtBQUVGLFFBQU0sZUFDSixDQUFDLGdCQUFnQixhQUFhLHNCQUM1QjtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsT0FBTyxLQUFLLCtCQUErQixTQUFTO0FBQUEsTUFDcEQsYUFBYSxLQUFLLDRDQUE0QyxZQUFZO0FBQUEsTUFDMUUsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsVUFBVSxDQUFDLGFBQWEsQ0FBQztBQUFBLE1BQ3pCLFVBQVUsQ0FBQyxhQUFhLENBQUM7QUFBQSxNQUN6QixvQkFBb0I7QUFBQSxNQUNwQixnQkFBZ0I7QUFBQTtBQUFBLEVBQ2xCLElBQ0UsQ0FBQyxlQUNIO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxPQUFPLEtBQUssK0JBQStCLFNBQVM7QUFBQSxNQUNwRCxPQUFPO0FBQUEsTUFDUCxvQkFBb0I7QUFBQSxNQUNwQixnQkFBZ0I7QUFBQTtBQUFBLEVBQ2xCLElBQ0U7QUFFTixTQUNFLDZDQUFDLGFBQVEsV0FBVSxtR0FDakIsd0RBQUMsU0FBSSxXQUFVLHlDQUNaO0FBQUEsaUJBQWEsc0JBQ1osOENBQUMsU0FBSSxXQUFVLDZCQUNiO0FBQUEsbURBQUMsV0FBTSxXQUFVLDRCQUE0QixlQUFLLG1DQUFtQyxhQUFhLEdBQUU7QUFBQSxNQUNwRztBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsV0FBVTtBQUFBLFVBQ1YsT0FBTztBQUFBLFVBQ1AsVUFBVSxDQUFDLFVBQVUseUJBQXlCLE1BQU0sT0FBTyxTQUFTLEVBQUU7QUFBQSxVQUN0RSxjQUFZLEtBQUssbUNBQW1DLGFBQWE7QUFBQTtBQUFBLE1BQ25FO0FBQUEsT0FDRixJQUVBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFPLEtBQUssbUNBQW1DLGFBQWE7QUFBQSxRQUM1RCxPQUFPLFNBQVMsT0FBTyxXQUFXLEtBQUs7QUFBQSxRQUN2QyxXQUFTO0FBQUE7QUFBQSxJQUNYO0FBQUEsSUFFRCxnQkFBZ0IsYUFBYSxzQkFDNUI7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE9BQU8sS0FBSywrQkFBK0IsU0FBUztBQUFBLFFBQ3BELGFBQWEsS0FBSyw0Q0FBNEMsWUFBWTtBQUFBLFFBQzFFLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQSxRQUNWLFVBQVU7QUFBQSxRQUNWLFVBQVUsQ0FBQyxhQUFhLENBQUM7QUFBQSxRQUN6QixVQUFVLENBQUMsYUFBYSxDQUFDO0FBQUE7QUFBQSxJQUMzQixJQUNFLGVBQ0YsNkNBQUMsZ0NBQXFCLE9BQU8sS0FBSywrQkFBK0IsU0FBUyxHQUFHLE9BQU8sY0FBYyxJQUNoRztBQUFBLElBQ0gsQ0FBQyxlQUNBLDhDQUFDLFNBQUksV0FBVSw2REFDYjtBQUFBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxPQUFPLEtBQUssbUNBQW1DLHNCQUFzQjtBQUFBLFVBQ3JFLE9BQU87QUFBQSxVQUNQLFlBQVc7QUFBQSxVQUNYLG9CQUFvQjtBQUFBLFVBQ3BCLGdCQUFnQjtBQUFBO0FBQUEsTUFDbEI7QUFBQSxNQUNDO0FBQUEsT0FDSCxJQUNFO0FBQUEsSUFDSCxlQUNDLDhDQUFDLFNBQUksV0FBVSw2REFDWjtBQUFBO0FBQUEsTUFDQTtBQUFBLE9BQ0gsSUFDRTtBQUFBLElBQ0gsQ0FBQyxlQUNBLDhDQUFDLFNBQUksV0FBVSxpREFDYjtBQUFBLG1EQUFDLGdDQUFxQixPQUFPLEtBQUssOEJBQThCLFFBQVEsR0FBRyxPQUFPLGFBQWE7QUFBQSxNQUMvRjtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsT0FBTyxLQUFLLHlDQUF5QyxZQUFZO0FBQUEsVUFDakUsT0FBTyxTQUFTLE9BQU8sWUFBWSxLQUFLO0FBQUE7QUFBQSxNQUMxQztBQUFBLE9BQ0YsSUFDRTtBQUFBLElBQ0gsQ0FBQyxlQUNBLDhDQUFDLFNBQUksV0FBVSw2REFDWjtBQUFBO0FBQUEsTUFDQTtBQUFBLE9BQ0gsSUFDRTtBQUFBLElBQ0gsZUFDQztBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTyxLQUFLLGlDQUFpQyxZQUFZO0FBQUEsUUFDekQsT0FBTztBQUFBLFFBQ1AsV0FBUztBQUFBO0FBQUEsSUFDWCxJQUNFO0FBQUEsSUFDSCx5QkFDQztBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTyxLQUFLLHFDQUFxQyxnQkFBZ0I7QUFBQSxRQUNqRSxPQUFPLHNCQUFzQjtBQUFBLFFBQzdCLFdBQVM7QUFBQTtBQUFBLElBQ1gsSUFDRTtBQUFBLEtBQ04sR0FDRjtBQUVKO0FBRUEsSUFBTyxpQ0FBUTs7O0FHdFRYLElBQUFDLHNCQUFBO0FBYkosSUFBTSx1QkFBdUIsQ0FBQztBQUFBLEVBQzVCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBaUM7QUFDL0IsU0FDRSw4Q0FBQyxhQUFRLFdBQVUsYUFDakI7QUFBQSxpREFBQyxpQ0FBc0IsT0FBTyxZQUFZLFdBQVUsbUNBQWtDO0FBQUEsSUFFckYsYUFBYSxXQUFXLElBQ3ZCLDZDQUFDLFNBQUksV0FBVSwrQkFBOEIsbUJBQWlCLFdBQVcsSUFFekUsNkNBQUMsU0FBSSxLQUFLLGNBQWMsV0FBVSxnQkFDL0IsdUJBQWEsSUFBSSxDQUFDLFNBQVM7QUFDMUIsWUFBTSxTQUFTLFNBQVMsS0FBSyxTQUFTO0FBQ3RDLFlBQU0sY0FBYyxTQUFTLEtBQUssV0FBVztBQUM3QyxZQUFNLGFBQWE7QUFBQSxRQUNqQixLQUFLLDRCQUE0QixLQUFLLFVBQVU7QUFBQSxRQUNoRDtBQUFBLE1BQ0Y7QUFDQSxZQUFNLHFCQUFxQixTQUFTLEtBQUssTUFBTTtBQUMvQyxZQUFNLFlBQVksU0FBUyxLQUFLLE1BQU07QUFDdEMsWUFBTSxZQUFZLHVCQUF1QixTQUFTLEtBQUssU0FBUyxHQUFHLFVBQVUsaUJBQWlCLFFBQVEsT0FBTztBQUM3RyxZQUFNLG1CQUFtQixxQkFDdkI7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE9BQU07QUFBQSxVQUNOLE1BQUs7QUFBQSxVQUNMLFNBQVE7QUFBQSxVQUNSLGFBQWE7QUFBQSxVQUNiLFFBQU87QUFBQSxVQUNQLFdBQVU7QUFBQSxVQUNWLGVBQVk7QUFBQSxVQUVaO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxlQUFjO0FBQUEsY0FDZCxnQkFBZTtBQUFBLGNBQ2YsR0FBRTtBQUFBO0FBQUEsVUFDSjtBQUFBO0FBQUEsTUFDRixJQUNFO0FBRUosYUFDRSw2Q0FBQyxTQUE0RixXQUFVLGlCQUNyRztBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0M7QUFBQSxVQUNBLE9BQU8sZUFBZSxVQUFVO0FBQUEsVUFDaEM7QUFBQSxVQUNBLFFBQVEsTUFBTSxXQUFXLE1BQU07QUFBQSxVQUMvQixnQkFBZTtBQUFBLFVBQ2YsbUJBQWtCO0FBQUEsVUFDbEIsWUFBWTtBQUFBLFVBQ1oscUJBQW9CO0FBQUEsVUFDcEIsYUFBYSxzQkFBc0I7QUFBQTtBQUFBLE1BQ3JDLEtBWFEsVUFBVSxHQUFHLFNBQVMsS0FBSyxTQUFTLENBQUMsSUFBSSxXQUFXLElBQUksVUFBVSxJQUFJLFNBQVMsRUFZekY7QUFBQSxJQUVKLENBQUMsR0FDSDtBQUFBLElBR0Y7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFlBQVk7QUFBQSxRQUNaLGFBQWE7QUFBQSxRQUNiLGNBQWM7QUFBQSxRQUNkLFFBQVE7QUFBQTtBQUFBLElBQ1Y7QUFBQSxLQUNGO0FBRUo7QUFFQSxJQUFPLCtCQUFROzs7QUNyRlAsSUFBQUMsc0JBQUE7QUFSUixJQUFNLDhCQUE4QixDQUFDLEVBQUUsU0FBUyxNQUFNLFdBQVcsT0FBTyxjQUFjLE1BQXdDO0FBQzVILE1BQUksUUFBUSxTQUFTLEdBQUc7QUFDdEIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUNFLDZDQUFDLDZCQUFrQixXQUFXLEtBQUssdUNBQXVDLHdDQUF3QyxHQUMvRyxrQkFBUSxJQUFJLENBQUMsV0FDWjtBQUFBLElBQUM7QUFBQTtBQUFBLE1BRUMsT0FBTyxLQUFLLE9BQU8sVUFBVSxPQUFPLFFBQVE7QUFBQSxNQUM1QyxVQUFVLFFBQVE7QUFBQSxNQUNsQixTQUFTLE1BQU0sY0FBYyxNQUFNO0FBQUE7QUFBQSxJQUg5QixPQUFPO0FBQUEsRUFJZCxDQUNELEdBQ0g7QUFFSjtBQUVBLElBQU8sc0NBQVE7OztBQ3NEWCxJQUFBQyxzQkFBQTtBQWpDSixJQUFNLDZCQUE2QixDQUFDO0FBQUEsRUFDbEM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQXVDO0FBQ3JDLFNBQ0UsOEVBQ0U7QUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsTUFBTSxNQUFNO0FBQUEsUUFDWixPQUFPLE1BQU07QUFBQSxRQUNiLFNBQVMsTUFBTTtBQUFBLFFBQ2YsYUFBYTtBQUFBLFFBQ2IsWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsWUFBWSxNQUFNO0FBQUEsUUFDbEIsYUFBYSxNQUFNO0FBQUEsUUFDbkIsTUFBTSxRQUFRO0FBQUEsUUFDZCxPQUFPO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFFQztBQUFBO0FBQUEsSUFDSDtBQUFBLElBRUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLEtBQUs7QUFBQSxRQUNMLE1BQUs7QUFBQSxRQUNMLFFBQVE7QUFBQSxRQUNSLFNBQVE7QUFBQSxRQUNSLFdBQVU7QUFBQSxRQUNWLFVBQVUsQ0FBQyxVQUFVO0FBQ25CLGdCQUFNLE9BQU8sTUFBTSxjQUFjLFFBQVEsQ0FBQyxLQUFLO0FBQy9DLGdCQUFNLGNBQWMsUUFBUTtBQUM1QiwrQkFBcUIsSUFBSTtBQUFBLFFBQzNCO0FBQUE7QUFBQSxJQUNGO0FBQUEsSUFFQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsS0FBSztBQUFBLFFBQ0wsTUFBSztBQUFBLFFBQ0wsUUFBUTtBQUFBLFFBQ1IsV0FBVTtBQUFBLFFBQ1YsVUFBVSxDQUFDLFVBQVU7QUFDbkIsZ0JBQU0sT0FBTyxNQUFNLGNBQWMsUUFBUSxDQUFDLEtBQUs7QUFDL0MsZ0JBQU0sY0FBYyxRQUFRO0FBQzVCLGdDQUFzQixJQUFJO0FBQUEsUUFDNUI7QUFBQTtBQUFBLElBQ0Y7QUFBQSxJQUVDLG1CQUNDLDZDQUFDLFNBQUksV0FBVSxxRkFDYix3REFBQyxTQUFJLFdBQVUsNkZBQ2I7QUFBQSxtREFBQyxRQUFHLFdBQVUsNENBQ1gsZUFBSyx3Q0FBd0MsY0FBYyxHQUM5RDtBQUFBLE1BQ0EsNkNBQUMsT0FBRSxXQUFVLCtCQUNWO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxNQUNGLEdBQ0Y7QUFBQSxNQUVBLDhDQUFDLFNBQUksV0FBVSwrQkFDYjtBQUFBLHFEQUFDLFlBQU8sTUFBSyxVQUFTLFdBQVUsMkNBQTBDLFNBQVMsb0JBQ2hGLGVBQUsseUNBQXlDLGdCQUFhLEdBQzlEO0FBQUEsUUFDQSw2Q0FBQyxZQUFPLE1BQUssVUFBUyxXQUFVLDJDQUEwQyxTQUFTLHFCQUNoRixlQUFLLDBDQUEwQyxlQUFlLEdBQ2pFO0FBQUEsUUFDQSw2Q0FBQyxZQUFPLE1BQUssVUFBUyxXQUFVLDJDQUEwQyxTQUFTLHFCQUNoRixlQUFLLGlCQUFpQixRQUFRLEdBQ2pDO0FBQUEsU0FDRjtBQUFBLE9BQ0YsR0FDRixJQUNFO0FBQUEsSUFFSjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsTUFBTTtBQUFBLFFBQ04sT0FBTyxLQUFLLDBDQUEwQyxtQkFBbUI7QUFBQSxRQUN6RSxTQUFTLDhCQUE4QixLQUFLLGtCQUFrQixTQUFTO0FBQUEsUUFDdkUsV0FBVztBQUFBLFFBQ1gsUUFBUTtBQUFBO0FBQUEsSUFDVjtBQUFBLElBRUMsMEJBQ0M7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQ0UsMEJBQ0ksZ0lBQ0E7QUFBQSxRQUdOO0FBQUEsdURBQUMsT0FBRyxtQ0FBd0I7QUFBQSxVQUMzQix1QkFDQztBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsV0FDRSwwQkFDSSx5SEFDQTtBQUFBLGNBR0wsd0JBQWMsb0JBQW9CO0FBQUE7QUFBQSxVQUNyQyxJQUNFO0FBQUEsVUFDSCxxQkFBcUIsU0FBUyxJQUM3QjtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsV0FDRSwwQkFDSSwyRkFDQTtBQUFBLGNBR0wsK0JBQXFCLElBQUksQ0FBQyxVQUN6Qiw2Q0FBQyxPQUFxQyxhQUFHLE1BQU0sSUFBSSxLQUFLLE1BQU0sT0FBTyxNQUE3RCxHQUFHLE1BQU0sSUFBSSxJQUFJLE1BQU0sRUFBRSxFQUF1QyxDQUN6RTtBQUFBO0FBQUEsVUFDSCxJQUNFO0FBQUEsVUFDSiw4Q0FBQyxTQUFJLFdBQVUsd0JBQ1o7QUFBQSxvQ0FDQyw2Q0FBQyxZQUFPLE1BQUssVUFBUyxXQUFVLHNDQUFxQyxTQUFTLHNCQUMzRSxlQUFLLHVDQUF1QyxtQkFBbUIsR0FDbEUsSUFDRTtBQUFBLFlBQ0osNkNBQUMsWUFBTyxNQUFLLFVBQVMsV0FBVSxzQ0FBcUMsU0FBUyx5QkFDM0UsZUFBSyxnQkFBZ0IsT0FBTyxHQUMvQjtBQUFBLGFBQ0Y7QUFBQTtBQUFBO0FBQUEsSUFDRixJQUNFO0FBQUEsS0FDTjtBQUVKO0FBRUEsSUFBTyxxQ0FBUTs7O0FDdk5mLElBQUFDLGdCQUE4RDs7O0FDUTlELElBQU0sa0RBQWtEO0FBQ3hELElBQU0sOENBQThDLElBQUksS0FBSyxLQUFLO0FBTWxFLElBQU0sZUFBZSxNQUFjO0FBQ2pDLFNBQU8sR0FBRywrQ0FBK0MsSUFBSSxxQkFBcUIsQ0FBQztBQUNyRjtBQUdPLElBQU0sNENBQTRDLENBQ3ZELFVBQzRDO0FBQzVDLE1BQUksQ0FBQyxTQUFTLE9BQU8sVUFBVSxTQUFVLFFBQU87QUFFaEQsUUFBTSxVQUFVO0FBQ2hCLFFBQU0sVUFBVSxTQUFTLFFBQVEsT0FBTztBQUN4QyxNQUFJLENBQUMsUUFBUyxRQUFPO0FBRXJCLFNBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUNGO0FBR08sSUFBTSx1Q0FBdUMsQ0FDbEQsWUFDNEM7QUFDNUMsUUFBTSxTQUFTO0FBQUEsSUFDYix5QkFBMkQsYUFBYSxDQUFDO0FBQUEsRUFDM0U7QUFDQSxNQUFJLENBQUMsT0FBUSxRQUFPO0FBRXBCLFFBQU0sY0FBYyxTQUFTLE9BQU87QUFDcEMsTUFBSSxDQUFDLFlBQWEsUUFBTztBQUN6QixTQUFPLE9BQU8sUUFBUSxZQUFZLE1BQU0sWUFBWSxZQUFZLElBQUksU0FBUztBQUMvRTtBQUdPLElBQU0sd0NBQXdDLE1BQVk7QUFDL0QsK0JBQTZCLGFBQWEsQ0FBQztBQUM3QztBQUdPLElBQU0sdUNBQXVDLENBQ2xELFVBQzRDO0FBQzVDLFFBQU0sYUFBYSwwQ0FBMEMsS0FBSztBQUNsRSxNQUFJLENBQUMsWUFBWTtBQUNmLDBDQUFzQztBQUN0QyxXQUFPO0FBQUEsRUFDVDtBQUVBLDJCQUF5QixhQUFhLEdBQUcsWUFBWSwyQ0FBMkM7QUFDaEcsU0FBTztBQUNUO0FBR08sSUFBTSwwQ0FBMEMsQ0FDckQsWUFDNEM7QUFDNUMsUUFBTSxTQUFTLHFDQUFxQyxPQUFPO0FBQzNELE1BQUksQ0FBQyxPQUFRLFFBQU87QUFFcEIsd0NBQXNDO0FBQ3RDLFNBQU87QUFDVDs7O0FDNUVBLElBQUFDLGdCQUFtQztBQXdEbkMsSUFBTSxpQkFBaUIsQ0FBQyxVQUFrQztBQUN4RCxRQUFNLFNBQVMsT0FBTyxLQUFLO0FBQzNCLFNBQU8sT0FBTyxTQUFTLE1BQU0sSUFBSSxTQUFTO0FBQzVDO0FBRUEsSUFBTSxtQkFBbUIsQ0FBQyxVQUFrQztBQUMxRCxRQUFNLFNBQVMsZUFBZSxLQUFLO0FBQ25DLFNBQU8sVUFBVSxRQUFRLFNBQVMsSUFBSSxTQUFTO0FBQ2pEO0FBRUEsSUFBTSx5QkFBeUIsQ0FDN0IsTUFDQSxXQUNBLHdCQUNrQztBQUNsQyxRQUFNLFlBQVksdUJBQXVCLEtBQUssaUJBQWlCLEtBQUssV0FBVyxFQUFFLFdBQVcsTUFBTSxDQUFDO0FBQ25HLFFBQU0sU0FBUyxpQkFBaUIsS0FBSyxHQUFHO0FBQ3hDLFFBQU0sV0FBVyxpQkFBaUIsS0FBSyxLQUFLO0FBQzVDLFFBQU0sWUFBWSxpQkFBaUIsS0FBSyxNQUFNO0FBQzlDLFFBQU0sTUFBTSxXQUFXLGFBQWEsT0FBTyxJQUFJO0FBQy9DLFFBQU0sUUFBUSxhQUFhLGFBQWEsUUFBUSxNQUFNLElBQUksWUFBWSxNQUFNO0FBQzVFLFFBQU0sWUFBWSxTQUFTLEtBQUssU0FBUztBQUV6QyxNQUFJLENBQUMsYUFBYSxjQUFjLFFBQVEsRUFBRSxNQUFNLE1BQU0sRUFBRSxRQUFRLElBQUk7QUFDbEUsVUFBTSxJQUFJLE1BQU0sS0FBSyxxQ0FBcUMsZ0JBQWdCLENBQUM7QUFBQSxFQUM3RTtBQUVBLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0EsYUFBYSxTQUFTLEtBQUssV0FBVztBQUFBLElBQ3RDLGVBQWUsS0FBSyxrQkFBa0I7QUFBQSxJQUN0QyxRQUFRLFNBQVMsS0FBSyxNQUFNLEtBQUs7QUFBQSxJQUNqQyxRQUFRLEtBQUssV0FBVztBQUFBLElBQ3hCO0FBQUEsSUFDQTtBQUFBLElBQ0EsUUFBUSxTQUFTLFNBQVMsS0FBSztBQUFBLElBQy9CO0FBQUEsSUFDQSxjQUFjLFNBQVMsS0FBSyxZQUFZLEVBQUUsWUFBWSxLQUFLO0FBQUEsSUFDM0QsV0FBVyxlQUFlLEtBQUssU0FBUztBQUFBLElBQ3hDLFVBQVUsZUFBZSxLQUFLLFFBQVE7QUFBQSxJQUN0QyxnQkFBZ0IsU0FBUyxLQUFLLGNBQWMsS0FBSztBQUFBLEVBQ25EO0FBQ0Y7QUFFQSxJQUFNLHFDQUFxQyxDQUN6QyxNQUNBLHdCQUNrQztBQUNsQyxTQUFPLHVCQUF1QixNQUFNLFNBQVMsS0FBSyxNQUFNLEdBQUcsbUJBQW1CO0FBQ2hGO0FBRUEsSUFBTSxnQ0FBZ0MsQ0FDcEMsTUFDQSxjQUNrQztBQUNsQyxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBLHdDQUF3QyxLQUFLLG1CQUFtQjtBQUFBLEVBQ2xFO0FBQ0Y7QUFFQSxJQUFNLG1DQUFtQyxPQUN2QyxTQUNBLE9BQ0Esd0JBQ2tCO0FBQ2xCLFFBQU0sY0FBYyxTQUFTLE9BQU87QUFDcEMsTUFBSSxDQUFDLGVBQWUsTUFBTSxTQUFTLEVBQUc7QUFFdEMsUUFBTSw4QkFBOEIsd0NBQXdDLG1CQUFtQjtBQUMvRixRQUFNLFVBQVUsTUFBTSxJQUFJLENBQUMsU0FBUztBQUNsQyxVQUFNLFlBQVksU0FBUyxLQUFLLFNBQVM7QUFDekMsUUFBSSxDQUFDLFdBQVc7QUFDZCxZQUFNLElBQUksTUFBTSxLQUFLLHFDQUFxQyxnQkFBZ0IsQ0FBQztBQUFBLElBQzdFO0FBRUEsV0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBLFNBQVMsbUNBQW1DLE1BQU0sMkJBQTJCO0FBQUEsSUFDL0U7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLFFBQVE7QUFBQSxJQUNaLFFBQVEsSUFBSSxPQUFPLEVBQUUsV0FBVyxRQUFRLE1BQU07QUFDNUMsWUFBTSxXQUFXLE1BQU0sdUJBQXVCLGFBQWEsV0FBVyxTQUFTO0FBQUEsUUFDN0UseUJBQXlCO0FBQUEsTUFDM0IsQ0FBQztBQUVELFVBQUksQ0FBQyxTQUFTLFNBQVM7QUFDckIsY0FBTSxJQUFJLE1BQU0sU0FBUyxXQUFXLEtBQUsscUNBQXFDLGdCQUFnQixDQUFDO0FBQUEsTUFDakc7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUFFQSxJQUFNLHlCQUF5QixPQUM3QixTQUNBLE9BQ0EsY0FDa0I7QUFDbEIsUUFBTSxjQUFjLFNBQVMsT0FBTztBQUNwQyxNQUFJLENBQUMsZUFBZSxNQUFNLFNBQVMsRUFBRztBQUV0QyxRQUFNLGdCQUFnQixTQUFTLFNBQVM7QUFDeEMsUUFBTSxVQUFVLE1BQU0sSUFBSSxDQUFDLFNBQVM7QUFDbEMsVUFBTSxZQUFZLFNBQVMsS0FBSyxTQUFTO0FBQ3pDLFFBQUksQ0FBQyxXQUFXO0FBQ2QsWUFBTSxJQUFJLE1BQU0sS0FBSyxxQ0FBcUMsZ0JBQWdCLENBQUM7QUFBQSxJQUM3RTtBQUVBLFdBQU87QUFBQSxNQUNMO0FBQUEsTUFDQSxTQUFTLDhCQUE4QixNQUFNLGFBQWE7QUFBQSxJQUM1RDtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sUUFBUTtBQUFBLElBQ1osUUFBUSxJQUFJLE9BQU8sRUFBRSxXQUFXLFFBQVEsTUFBTTtBQUM1QyxZQUFNLFdBQVcsTUFBTSx1QkFBdUIsYUFBYSxXQUFXLFNBQVM7QUFBQSxRQUM3RSx5QkFBeUI7QUFBQSxNQUMzQixDQUFDO0FBRUQsVUFBSSxDQUFDLFNBQVMsU0FBUztBQUNyQixjQUFNLElBQUksTUFBTSxTQUFTLFdBQVcsS0FBSyxxQ0FBcUMsZ0JBQWdCLENBQUM7QUFBQSxNQUNqRztBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQUdPLElBQU0saUNBQWlDLENBQUM7QUFBQSxFQUM3QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBMEM7QUFDeEMsUUFBTSx5QkFBcUI7QUFBQSxJQUN6QixDQUNFLFlBQ0EsMEJBQ3FFO0FBQ3JFLFlBQU0sbUNBQW1DLDBCQUEwQjtBQUNuRSxZQUFNLHdCQUF3QixPQUFPLG9CQUFvQixFQUFFLEVBQUUsS0FBSztBQUNsRSxZQUFNLHNCQUFzQixPQUFPLGtCQUFrQixFQUFFLEVBQUUsS0FBSztBQUM5RCxZQUFNLDhCQUE4QjtBQUFBLFFBQ2xDLHlCQUF5QiwwQkFBMEI7QUFBQSxNQUNyRCxFQUFFLEtBQUs7QUFDUCxZQUFNLGdDQUFnQyxvQ0FBb0Msd0JBQXdCO0FBQ2xHLFlBQU0sNkJBQ0osZUFBZSw2QkFBNkIsT0FBTyxPQUFPLHlCQUF5QixJQUFJO0FBRXpGLFVBQUksQ0FBQyx1QkFBdUI7QUFDMUIsZUFBTztBQUFBLFVBQ0wsT0FBTyxLQUFLLGdEQUFnRCwwQkFBMEI7QUFBQSxRQUN4RjtBQUFBLE1BQ0Y7QUFFQSxhQUFPO0FBQUEsUUFDTCxTQUFTO0FBQUEsVUFDUCxhQUFhO0FBQUEsVUFDYixRQUFRLHVCQUF1QjtBQUFBLFVBQy9CLG9CQUFvQjtBQUFBLFVBQ3BCLHFCQUFxQjtBQUFBO0FBQUEsVUFFckIsbUJBQW1CLG1DQUNmLDhCQUNDLCtCQUErQjtBQUFBLFFBQ3RDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxtQkFBZSwyQkFBWSxZQUFZO0FBQzNDLFFBQUksUUFBUSxDQUFDLFVBQVcsUUFBTztBQUMvQixRQUFJLENBQUMsZ0JBQWdCLGFBQWMsUUFBTztBQUUxQyxVQUFNLGFBQWEsZUFBZSxtQkFBbUI7QUFDckQsUUFBSSxDQUFDLFlBQVk7QUFDZiwwQkFBb0I7QUFDcEIsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLGdCQUFnQixtQkFBbUI7QUFDekMsUUFBSSxXQUFXLGVBQWU7QUFDNUIsb0JBQWMsY0FBYyxLQUFLO0FBQ2pDLGdCQUFVLGNBQWMsS0FBSztBQUM3QixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sU0FBUyxNQUFNLHVCQUF1QjtBQUFBLE1BQzFDLGFBQWEsZUFDVCxLQUFLLGtCQUFrQixTQUFTLElBQ2hDLEtBQUssaUNBQWlDLDJCQUEyQjtBQUFBLE1BQ3JFLHNCQUFzQixLQUFLLG9DQUFvQyxlQUFlO0FBQUEsTUFDOUU7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsUUFBUSxZQUFZO0FBQ2xCLFlBQUksY0FBYztBQUNoQixnQkFBTSxnQkFBZ0IsY0FBYztBQUNwQyxnQkFBTSxVQUFxQztBQUFBLFlBQ3pDLE1BQU07QUFBQSxZQUNOLHNCQUFzQjtBQUFBLFlBQ3RCLGFBQWEsY0FBYztBQUFBLFlBQzNCLFFBQVEsY0FBYztBQUFBLFlBQ3RCLG9CQUFvQjtBQUFBLFlBQ3BCLHFCQUFxQixjQUFjO0FBQUEsWUFDbkMsT0FBTyxDQUFDO0FBQUEsVUFDVjtBQUVBLGdCQUFNQyxZQUFXLE1BQU0sbUJBQW1CLE9BQU87QUFFakQsY0FBSSxDQUFDQSxVQUFTLFNBQVM7QUFDckIsa0JBQU0sSUFBSSxNQUFNQSxVQUFTLFdBQVcsS0FBSyxxQkFBcUIsaUJBQWlCLENBQUM7QUFBQSxVQUNsRjtBQUdBLGdCQUFNLGNBQWNBLFdBQVU7QUFDOUIsZ0JBQU0saUJBQWlCLE9BQU8sYUFBYSxnQkFBZ0IsYUFBYSxnQkFBZ0IsRUFBRSxFQUFFLEtBQUs7QUFDakcsY0FBSSxDQUFDLGdCQUFnQjtBQUNuQixrQkFBTSxJQUFJLE1BQU0sS0FBSyxxQkFBcUIsaUJBQWlCLENBQUM7QUFBQSxVQUM5RDtBQUVBLDBCQUFnQixjQUFjO0FBQzlCLG9CQUFVLEtBQUssZUFBZSxNQUFNLENBQUM7QUFDckMsaUJBQU87QUFBQSxRQUNUO0FBRUEsY0FBTSxXQUFXLE1BQU0seUJBQXlCLFNBQVMsY0FBYyxPQUFPO0FBRTlFLFlBQUksQ0FBQyxTQUFTLFNBQVM7QUFDckIsZ0JBQU0sSUFBSSxNQUFNLFNBQVMsV0FBVyxLQUFLLHFDQUFxQyxnQkFBZ0IsQ0FBQztBQUFBLFFBQ2pHO0FBRUEsa0JBQVUsS0FBSyxnQ0FBZ0MsdUJBQXVCLENBQUM7QUFDdkUscUJBQWEsS0FBSztBQUNsQixlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0YsQ0FBQztBQUVELFdBQU8sT0FBTztBQUFBLEVBQ2hCLEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSxnREFBNEM7QUFBQSxJQUNoRCxPQUFPLDRCQUFvQztBQUN6QyxVQUFJLFFBQVEsZ0JBQWdCLENBQUMsVUFBVyxRQUFPO0FBQy9DLFVBQUksZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMscUJBQXFCO0FBQzNELDRCQUFvQjtBQUNwQixlQUFPO0FBQUEsTUFDVDtBQUVBLFlBQU0sU0FBUyxNQUFNLHVCQUF1QjtBQUFBLFFBQzFDLGFBQWEsS0FBSyxnREFBZ0QsaUNBQWlDO0FBQUEsUUFDbkcsc0JBQXNCLEtBQUssb0NBQW9DLGVBQWU7QUFBQSxRQUM5RTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxRQUFRLFlBQVk7QUFDbEIsZ0JBQU07QUFBQSxZQUNKO0FBQUEsWUFDQTtBQUFBLFlBQ0Esb0NBQW9DLHVCQUF1QjtBQUFBLFVBQzdEO0FBRUEsb0JBQVUsS0FBSyxnQ0FBZ0MsdUJBQXVCLENBQUM7QUFDdkUsdUJBQWEsSUFBSTtBQUNqQixpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGLENBQUM7QUFFRCxhQUFPLE9BQU87QUFBQSxJQUNoQjtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLFFBQU0sc0NBQWtDO0FBQUEsSUFDdEMsT0FBTyxrQkFBMEI7QUFDL0IsVUFBSSxRQUFRLGdCQUFnQixDQUFDLFVBQVcsUUFBTztBQUMvQyxVQUFJLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLHFCQUFxQjtBQUMzRCw0QkFBb0I7QUFDcEIsZUFBTztBQUFBLE1BQ1Q7QUFFQSxZQUFNLFNBQVMsTUFBTSx1QkFBdUI7QUFBQSxRQUMxQyxhQUFhLEtBQUssMkNBQTJDLGlDQUFpQztBQUFBLFFBQzlGLHNCQUFzQixLQUFLLG9DQUFvQyxlQUFlO0FBQUEsUUFDOUU7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsUUFBUSxZQUFZO0FBQ2xCLGdCQUFNLHVCQUF1QixTQUFTLGNBQWMsYUFBYTtBQUVqRSxvQkFBVSxLQUFLLGdDQUFnQyx1QkFBdUIsQ0FBQztBQUN2RSx1QkFBYSxJQUFJO0FBQ2pCLGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0YsQ0FBQztBQUVELGFBQU8sT0FBTztBQUFBLElBQ2hCO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSw2QkFBeUI7QUFBQSxJQUM3QixPQUFPLFlBQW9CLGFBQXFCLDBCQUEwQztBQUN4RixVQUFJLFFBQVEsZ0JBQWdCLENBQUMsUUFBUyxRQUFPO0FBQzdDLFVBQUksQ0FBQyxxQkFBcUI7QUFDeEIsNEJBQW9CO0FBQ3BCLGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxnQkFBZ0IsbUJBQW1CLFlBQVkscUJBQXFCO0FBQzFFLFVBQUksV0FBVyxlQUFlO0FBQzVCLHNCQUFjLGNBQWMsS0FBSztBQUNqQyxrQkFBVSxjQUFjLEtBQUs7QUFDN0IsZUFBTztBQUFBLE1BQ1Q7QUFFQSxZQUFNLFNBQVMsTUFBTSx1QkFBdUI7QUFBQSxRQUMxQztBQUFBLFFBQ0Esc0JBQXNCLEtBQUssb0NBQW9DLGVBQWU7QUFBQSxRQUM5RTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxRQUFRLFlBQVk7QUFDbEIsZ0JBQU0sV0FBVyxNQUFNLHlCQUF5QixTQUFTLGNBQWMsT0FBTztBQUU5RSxjQUFJLENBQUMsU0FBUyxTQUFTO0FBQ3JCLGtCQUFNLElBQUksTUFBTSxTQUFTLFdBQVcsS0FBSyxxQ0FBcUMsZ0JBQWdCLENBQUM7QUFBQSxVQUNqRztBQUVBLG9CQUFVLEtBQUssZ0NBQWdDLHVCQUF1QixDQUFDO0FBQ3ZFLHVCQUFhLEtBQUs7QUFDbEIsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRixDQUFDO0FBRUQsYUFBTyxPQUFPO0FBQUEsSUFDaEI7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLG1CQUFlLDJCQUFZLFlBQVk7QUFDM0MsUUFBSSxLQUFNLFFBQU87QUFDakIsUUFBSSxlQUFnQixRQUFPO0FBQzNCLFFBQUksQ0FBQyxrQkFBa0I7QUFDckIsMEJBQW9CO0FBQ3BCLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxTQUFTLE1BQU0sdUJBQXVCO0FBQUEsTUFDMUMsYUFBYSxLQUFLLGlDQUFpQywyQkFBMkI7QUFBQSxNQUM5RSxzQkFBc0IsS0FBSyxvQ0FBb0MsZUFBZTtBQUFBLE1BQzlFO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLFFBQVEsWUFBWTtBQUNsQixjQUFNLFdBQVcsTUFBTSxtQkFBbUIsT0FBTztBQUVqRCxZQUFJLENBQUMsU0FBUyxTQUFTO0FBQ3JCLGdCQUFNLElBQUksTUFBTSxTQUFTLFdBQVcsS0FBSyxxQ0FBcUMsZ0JBQWdCLENBQUM7QUFBQSxRQUNqRztBQUVBLGtCQUFVLEtBQUssZ0NBQWdDLHVCQUF1QixDQUFDO0FBQ3ZFLGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRixDQUFDO0FBRUQsV0FBTyxPQUFPO0FBQUEsRUFDaEIsR0FBRyxDQUFDLE1BQU0sa0JBQWtCLGdCQUFnQixTQUFTLGVBQWUsV0FBVyxPQUFPLENBQUM7QUFFdkYsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGOzs7QUNsZU8sSUFBTSxxQ0FBcUMsQ0FBQztBQUFBLEVBQ2pEO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxhQUFhO0FBQUEsRUFDYjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxtQkFBbUI7QUFBQSxFQUNuQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQThDO0FBQzVDLDhCQUE0QjtBQUFBLElBQzFCLGVBQWU7QUFBQSxJQUNmLEtBQUs7QUFBQSxNQUNILFlBQVk7QUFBQSxNQUNaLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixXQUFXO0FBQUEsTUFDWCxhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxrQ0FBa0M7QUFBQSxJQUNsQztBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1gsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1g7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsWUFBWTtBQUFBLElBQ1o7QUFBQSxJQUNBLGtCQUFrQixvQkFBb0IsS0FBSywwQ0FBMEMsY0FBYztBQUFBLElBQ25HLG9CQUFvQixzQkFBc0IsS0FBSyx5Q0FBeUMsOEJBQThCO0FBQUEsSUFDdEgsaUJBQWlCLG1CQUFtQixLQUFLLGVBQWUsTUFBTTtBQUFBLElBQzlEO0FBQUEsSUFDQSxvQkFBb0IsS0FBSywwQ0FBMEMsc0JBQXNCO0FBQUEsSUFDekYsc0JBQXNCLEtBQUsseUNBQXlDLDJDQUEyQztBQUFBLElBQy9HLG1CQUFtQixLQUFLLGlCQUFpQixRQUFRO0FBQUEsSUFDakQ7QUFBQSxJQUNBLGlCQUFpQixvQkFBb0IsTUFBTSxxQkFBcUIsdUJBQXVCO0FBQUEsSUFDdkY7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBQ0g7OztBQzdHQSxJQUFBQyxnQkFBMEQ7QUE2QjFELElBQU0sNEJBQTRCO0FBQ2xDLElBQU0saUNBQWlDO0FBQ3ZDLElBQU0sK0JBQStCO0FBQ3JDLElBQU0sMEJBQTBCO0FBQ2hDLElBQU0sc0JBQXNCO0FBRzVCLElBQU0sK0JBQStCLENBQUMsVUFBMEI7QUFDOUQsU0FBTyx5QkFBeUIsT0FBTztBQUFBLElBQ3JDLHVCQUF1QjtBQUFBLElBQ3ZCLHVCQUF1QjtBQUFBLElBQ3ZCLGFBQWE7QUFBQSxJQUNiLFVBQVU7QUFBQSxFQUNaLENBQUM7QUFDSDtBQUdBLElBQU0sb0NBQW9DLDZCQUE2Qiw4QkFBOEI7QUFFckcsSUFBTSx5QkFBeUIsTUFBMEI7QUFDdkQsU0FBTztBQUFBLElBQ0wsY0FBYztBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2IsUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2Isb0JBQW9CO0FBQUEsSUFDcEIsa0JBQWtCO0FBQUEsSUFDbEIscUJBQXFCO0FBQUEsSUFDckIsYUFBYTtBQUFBLElBQ2IsVUFBVSxPQUFPLDhCQUE4QjtBQUFBLEVBQ2pEO0FBQ0Y7QUFFQSxJQUFNLHlCQUF5QixDQUFDLFVBQTJCO0FBQ3pELE1BQUksQ0FBQyxNQUFPLFFBQU87QUFDbkIsUUFBTSxTQUFTLHlCQUF5QixLQUFLO0FBQzdDLE1BQUksV0FBVyxLQUFNLFFBQU87QUFDNUIsU0FBTyxLQUFLLElBQUksTUFBTSxJQUFJO0FBQzVCO0FBZ0JPLElBQU0sNkJBQTZCLENBQUM7QUFBQSxFQUN6QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQXNDO0FBQ3BDLFFBQU0sQ0FBQyxRQUFRLFNBQVMsUUFBSSx3QkFBb0MsSUFBSTtBQUNwRSxRQUFNLENBQUMsT0FBTyxRQUFRLFFBQUksd0JBQTZCLENBQUMsQ0FBQztBQUN6RCxRQUFNLENBQUMsVUFBVSxXQUFXLFFBQUksd0JBQVMsQ0FBQztBQUMxQyxRQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksd0JBQVMsS0FBSztBQUNoRCxRQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksd0JBQVMsRUFBRTtBQUNuRCxRQUFNLENBQUMsTUFBTSxPQUFPLFFBQUksd0JBQVMsS0FBSztBQUN0QyxRQUFNLENBQUMsUUFBUSxTQUFTLFFBQUksd0JBQVMsRUFBRTtBQUN2QyxRQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksd0JBQVMsS0FBSztBQUNoRCxRQUFNLENBQUMsWUFBWSxhQUFhLFFBQUksd0JBQVMsRUFBRTtBQUMvQyxRQUFNLENBQUMsa0JBQWtCLG1CQUFtQixRQUFJLHdCQUFTLEVBQUU7QUFDM0QsUUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsUUFBSSx3QkFBUyxFQUFFO0FBQ3ZELFFBQU0sQ0FBQyxtQkFBbUIsb0JBQW9CLFFBQUksd0JBQVMsRUFBRTtBQUM3RCxRQUFNLENBQUMsbUJBQW1CLG9CQUFvQixRQUFJLHdCQUFTLEVBQUU7QUFDN0QsUUFBTSxDQUFDLDBCQUEwQiwyQkFBMkIsUUFBSSx3QkFBd0IsNEJBQTRCO0FBQ3BILFFBQU0sQ0FBQyx3QkFBd0IseUJBQXlCLFFBQUksd0JBQVMsRUFBRTtBQUN2RSxRQUFNLENBQUMscUJBQXFCLHNCQUFzQixRQUFJLHdCQUFTLEVBQUU7QUFDakUsUUFBTSxDQUFDLHVCQUF1Qix3QkFBd0IsUUFBSSx3QkFBUyxLQUFLO0FBQ3hFLFFBQU0sQ0FBQyxxQkFBcUIsc0JBQXNCLFFBQUksd0JBQVMsRUFBRTtBQUNqRSxRQUFNLENBQUMsNEJBQTRCLDZCQUE2QixRQUFJLHdCQUFTLEtBQUs7QUFDbEYsUUFBTSxDQUFDLDJCQUEyQiw0QkFBNEIsUUFBSSx3QkFBUyxFQUFFO0FBQzdFLFFBQU0sQ0FBQyw4QkFBOEIsK0JBQStCLFFBQUksd0JBQVMsRUFBRTtBQUNuRixRQUFNLENBQUMsMEJBQTBCLDJCQUEyQixRQUFJLHdCQUFTLEVBQUU7QUFDM0UsUUFBTSxDQUFDLDRCQUE0Qiw2QkFBNkIsUUFBSSx3QkFBUyxFQUFFO0FBRS9FLFFBQU0sNkJBQXlCLDJCQUFZLENBQUMsZUFBMEM7QUFDcEYsd0JBQW9CLFNBQVMsWUFBWSxXQUFXLENBQUM7QUFDckQsc0JBQWtCLFNBQVMsWUFBWSxNQUFNLENBQUM7QUFDOUMseUJBQXFCLFNBQVMsWUFBWSxZQUFZLENBQUM7QUFDdkQsZ0NBQTRCLG9DQUFvQyxZQUFZLG1CQUFtQixDQUFDO0FBQ2hHO0FBQUEsTUFDRSx5QkFBeUIsWUFBWSxVQUFVO0FBQUEsUUFDN0MsdUJBQXVCO0FBQUEsUUFDdkIsdUJBQXVCO0FBQUEsUUFDdkIsYUFBYTtBQUFBLFFBQ2IsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLElBQ0g7QUFDQSw4QkFBMEIsU0FBUyxZQUFZLGlCQUFpQixDQUFDO0FBQUEsRUFDbkUsR0FBRyxDQUFDLENBQUM7QUFFTCwrQkFBVSxNQUFNO0FBQ2QsVUFBTSxhQUFhLFlBQVk7QUFDN0IsVUFBSSxDQUFDLFdBQVc7QUFDZCxvQkFBWTtBQUNaO0FBQUEsTUFDRjtBQUVBLFVBQUksY0FBYztBQUNoQixZQUFJLENBQUMsa0JBQWtCO0FBQ3JCLHNCQUFZO0FBQ1o7QUFBQSxRQUNGO0FBRUEsY0FBTSxjQUFjLHVCQUF1QjtBQUMzQyxrQkFBVSxXQUFXO0FBQ3JCLGlCQUFTLENBQUMsQ0FBQztBQUNYLG9CQUFZLENBQUM7QUFDYixxQkFBYSxJQUFJO0FBQ2pCLCtCQUF1QixXQUFXO0FBQ2xDLGtCQUFVLEVBQUU7QUFDWix3QkFBZ0IsRUFBRTtBQUNsQjtBQUFBLE1BQ0Y7QUFFQSxVQUFJLENBQUMsU0FBUztBQUNaLHdCQUFnQixLQUFLLDBCQUEwQiw4QkFBOEIsQ0FBQztBQUM5RSxrQkFBVSxJQUFJO0FBQ2QsaUJBQVMsQ0FBQyxDQUFDO0FBQ1g7QUFBQSxNQUNGO0FBRUEsbUJBQWEsSUFBSTtBQUNqQixzQkFBZ0IsRUFBRTtBQUVsQixVQUFJO0FBQ0YsY0FBTSxXQUFXLE1BQU0sd0JBQXdCLFNBQVM7QUFBQSxVQUN0RCx5QkFBeUI7QUFBQSxRQUMzQixDQUFDO0FBRUQsWUFBSSxVQUFVLFlBQVksT0FBTztBQUMvQiwwQkFBZ0IsVUFBVSxXQUFXLEtBQUssMkJBQTJCLHNDQUFzQyxDQUFDO0FBQzVHLG9CQUFVLElBQUk7QUFDZCxtQkFBUyxDQUFDLENBQUM7QUFDWDtBQUFBLFFBQ0Y7QUFFQSxjQUFNLFNBQVMsTUFBTSxRQUFRLFVBQVUsS0FBSyxJQUFJLFNBQVMsUUFBUSxDQUFDO0FBQ2xFLGNBQU0sZ0JBQ0osT0FBTyxLQUFLLENBQUMsVUFBVSxTQUFTLE9BQU8sWUFBWSxFQUFFLFlBQVksTUFBTSxRQUFRLEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSyxPQUFPLENBQUM7QUFFbEgsWUFBSSxDQUFDLGVBQWU7QUFDbEIsMEJBQWdCLEtBQUssMEJBQTBCLDhCQUE4QixDQUFDO0FBQzlFLG9CQUFVLElBQUk7QUFDZCxtQkFBUyxDQUFDLENBQUM7QUFDWDtBQUFBLFFBQ0Y7QUFFQSxjQUFNLGFBQWEsc0JBQXNCLGFBQWE7QUFDdEQsY0FBTSxhQUFhLE1BQU0sUUFBUSxjQUFjLEtBQUssSUFBSSxjQUFjLFFBQVEsQ0FBQyxHQUFHO0FBQUEsVUFBSSxDQUFDLFVBQ3JGLG9CQUFvQixLQUFLO0FBQUEsUUFDM0I7QUFDQSxrQkFBVSxVQUFVO0FBQ3BCLGlCQUFTLFNBQVM7QUFBQSxNQUNwQixTQUFTLE9BQU87QUFDZCxZQUFJLGlCQUFpQixpQkFBaUIsTUFBTSxXQUFXLEtBQUs7QUFDMUQsc0JBQVk7QUFDWjtBQUFBLFFBQ0Y7QUFFQTtBQUFBLFVBQ0UsaUJBQWlCLFFBQVEsTUFBTSxVQUFVLEtBQUssMkJBQTJCLHNDQUFzQztBQUFBLFFBQ2pIO0FBQ0Esa0JBQVUsSUFBSTtBQUNkLGlCQUFTLENBQUMsQ0FBQztBQUFBLE1BQ2IsVUFBRTtBQUNBLHFCQUFhLEtBQUs7QUFBQSxNQUNwQjtBQUFBLElBQ0Y7QUFFQSxTQUFLLFdBQVc7QUFBQSxFQUNsQixHQUFHLENBQUMsa0JBQWtCLFdBQVcsd0JBQXdCLGNBQWMsYUFBYSxPQUFPLENBQUM7QUFFNUYsK0JBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxVQUFVLFVBQVc7QUFDMUIsMkJBQXVCLE1BQU07QUFBQSxFQUMvQixHQUFHLENBQUMsUUFBUSx3QkFBd0IsU0FBUyxDQUFDO0FBRTlDLCtCQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsVUFBVztBQUNoQixRQUFJLGNBQWM7QUFDbEIsVUFBTSxhQUFhLElBQUksZ0JBQWdCO0FBRXZDLFVBQU0sMEJBQTBCLFlBQVk7QUFDMUMsVUFBSTtBQUNGLGNBQU0sT0FBTyxNQUFNLG1DQUFtQztBQUFBLFVBQ3BELHlCQUF5QjtBQUFBLFVBQ3pCLFFBQVEsV0FBVztBQUFBLFFBQ3JCLENBQUM7QUFDRCxZQUFJLFlBQWE7QUFDakIsK0JBQXVCLFNBQVMsSUFBSSxFQUFFLFlBQVksQ0FBQztBQUFBLE1BQ3JELFNBQVMsT0FBTztBQUNkLFlBQUksaUJBQWlCLGdCQUFnQixNQUFNLFNBQVMsYUFBYztBQUFBLE1BQ3BFO0FBQUEsSUFDRjtBQUVBLFNBQUssd0JBQXdCO0FBQzdCLFdBQU8sTUFBTTtBQUNYLG9CQUFjO0FBQ2QsaUJBQVcsTUFBTTtBQUFBLElBQ25CO0FBQUEsRUFDRixHQUFHLENBQUMsU0FBUyxDQUFDO0FBRWQsUUFBTSx1QkFBbUIsdUJBQVEsTUFBTSxRQUFRLFdBQVcsQ0FBQyxNQUFNLFNBQVMsQ0FBQztBQUMzRSwrQkFBVSxNQUFNO0FBQ2QsOEJBQTBCLGdCQUFnQjtBQUMxQyxXQUFPLE1BQU07QUFDWCxrQ0FBNEI7QUFBQSxJQUM5QjtBQUFBLEVBQ0YsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0FBRXJCLFFBQU0sZUFBZSxTQUFTLFFBQVEsTUFBTTtBQUM1QyxRQUFNLGFBQWEsT0FBTyxRQUFRLHVCQUF1QixXQUFXLE9BQU8scUJBQXFCO0FBQ2hHLFFBQU0sa0JBQWtCLGVBQWU7QUFDdkMsUUFBTSxzQkFBc0IsZUFBZTtBQUMzQyxRQUFNLHVCQUF1QixtQkFBbUIsUUFBUSxPQUFPO0FBQy9ELFFBQU0sY0FBYyx1QkFBdUI7QUFDM0MsUUFBTSxzQkFBc0IsNkJBQTZCO0FBQUEsSUFDdkQ7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLG1CQUFtQixRQUFRO0FBQUEsSUFDM0I7QUFBQSxFQUNGLENBQUM7QUFDRCxRQUFNLG1CQUFlLHVCQUFRLE1BQU07QUFDakMsUUFBSSxjQUFjO0FBQ2hCLGFBQU87QUFBQSxRQUNMLGlCQUFpQjtBQUFBLFFBQ2pCLFNBQVM7QUFBQSxRQUNULGdCQUFnQjtBQUFBLFFBQ2hCLGVBQWUsQ0FBQztBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUVBLFdBQU8sZ0NBQWdDO0FBQUEsTUFDckM7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsUUFBUTtBQUFBLElBQ1YsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLHFCQUFxQixjQUFjLHFCQUFxQixhQUFhLFVBQVUsQ0FBQztBQUNwRixRQUFNLDZCQUE2QixnQkFBaUIsQ0FBQyx1QkFBdUIsYUFBYSxvQkFBb0I7QUFDN0csUUFBTSw4QkFBOEIsQ0FBQyxnQkFBZ0IsYUFBYSxvQkFBb0I7QUFDdEYsUUFBTSxvQkFBcUIsZ0JBQWdCLG9CQUFxQiw4QkFBOEI7QUFDOUYsUUFBTSx5QkFBeUIsQ0FBQyxnQkFBZ0IsYUFBYSxvQkFBb0I7QUFDakYsUUFBTSxnQkFBZ0IsbUJBQW1CO0FBQ3pDLFFBQU0sV0FBVyxNQUFNLFNBQVM7QUFDaEMsUUFBTSxvQkFBb0IseUJBQXlCLFNBQVMsUUFBUSxRQUFRLEdBQUc7QUFBQSxJQUM3RSx1QkFBdUI7QUFBQSxJQUN2Qix1QkFBdUI7QUFBQSxJQUN2QixhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUEsRUFDWixDQUFDO0FBQ0QsUUFBTSx1QkFBbUIsdUJBQVEsTUFBTSx1QkFBdUIsaUJBQWlCLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztBQUNyRyxRQUFNLDhCQUEwQix1QkFBUSxNQUFNLGtCQUFrQixLQUFLLEVBQUUsWUFBWSxHQUFHLENBQUMsaUJBQWlCLENBQUM7QUFDekcsUUFBTSxnQ0FBNEIsdUJBQVEsTUFBTSxTQUFTLG1CQUFtQixFQUFFLFlBQVksR0FBRyxDQUFDLG1CQUFtQixDQUFDO0FBQ2xILFFBQU0sMkJBQTJCLDZCQUE2QjtBQUM5RCxRQUFNLGVBQVcsdUJBQVEsTUFBTTtBQUM3QixRQUFJLE9BQU8sYUFBYSxZQUFhLFFBQU87QUFDNUMsV0FBTyxTQUFTLFNBQVMsaUJBQWlCLElBQUksS0FBSztBQUFBLEVBQ3JELEdBQUcsQ0FBQyxDQUFDO0FBQ0wsUUFBTSx1QkFBbUIsdUJBQVEsTUFBTTtBQUNyQyxVQUFNLGFBQWEsaUJBQWlCLFNBQVMsUUFBUSxXQUFXLENBQUM7QUFDakUsUUFBSSxXQUFZLFFBQU8sVUFBVSxVQUFVO0FBQzNDLFdBQU8sVUFBVSxvQkFBSSxLQUFLLENBQUM7QUFBQSxFQUM3QixHQUFHLENBQUMsUUFBUSxXQUFXLENBQUM7QUFDeEIsUUFBTSwrQkFBK0I7QUFDckMsUUFBTSxnQ0FBZ0M7QUFFdEMsUUFBTSwwQkFBMEI7QUFDaEMsUUFBTSw4QkFBOEI7QUFFcEMsK0JBQVUsTUFBTTtBQUNkLFFBQUksY0FBYztBQUNsQixRQUFJLGVBQXFEO0FBQ3pELFFBQUkseUJBQWlEO0FBRXJELFVBQU0sd0JBQXdCLE1BQU07QUFDbEMsVUFBSSxjQUFjO0FBQ2hCLHFCQUFhLFlBQVk7QUFDekIsdUJBQWU7QUFBQSxNQUNqQjtBQUNBLFVBQUksd0JBQXdCO0FBQzFCLCtCQUF1QixNQUFNO0FBQzdCLGlDQUF5QjtBQUFBLE1BQzNCO0FBQUEsSUFDRjtBQUVBLFFBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxhQUFhLENBQUMsOEJBQThCLDZCQUE2QjtBQUM3RywrQkFBeUIsS0FBSztBQUM5Qiw2QkFBdUIsRUFBRTtBQUN6QixvQ0FBOEIsS0FBSztBQUNuQyxtQ0FBNkIsRUFBRTtBQUMvQixzQ0FBZ0MsRUFBRTtBQUNsQyxrQ0FBNEIsRUFBRTtBQUM5QixvQ0FBOEIsRUFBRTtBQUNoQyxhQUFPLE1BQU07QUFDWCw4QkFBc0I7QUFBQSxNQUN4QjtBQUFBLElBQ0Y7QUFFQSxRQUFJLENBQUMsMkJBQTJCLENBQUMsMEJBQTBCO0FBQ3pELCtCQUF5QixLQUFLO0FBQzlCLDZCQUF1QixFQUFFO0FBQ3pCLG9DQUE4QixLQUFLO0FBQ25DLG1DQUE2QixFQUFFO0FBQy9CLHNDQUFnQyxFQUFFO0FBQ2xDLGtDQUE0QixFQUFFO0FBQzlCLG9DQUE4QixFQUFFO0FBQ2hDLGFBQU8sTUFBTTtBQUNYLDhCQUFzQjtBQUFBLE1BQ3hCO0FBQUEsSUFDRjtBQUVBLFFBQUksNEJBQTRCLDBCQUEwQjtBQUN4RCwyQkFBcUIsaUNBQWlDO0FBQ3RELG1DQUE2QixpQ0FBaUM7QUFDOUQsK0JBQXlCLEtBQUs7QUFDOUIsNkJBQXVCLEVBQUU7QUFDekIsb0NBQThCLEtBQUs7QUFDbkMsc0NBQWdDLEVBQUU7QUFDbEMsa0NBQTRCLEVBQUU7QUFDOUIsb0NBQThCLEVBQUU7QUFDaEMsYUFBTyxNQUFNO0FBQ1gsOEJBQXNCO0FBQUEsTUFDeEI7QUFBQSxJQUNGO0FBRUEsbUJBQWUsV0FBVyxZQUFZO0FBQ3BDLCtCQUF5QixJQUFJLGdCQUFnQjtBQUM3QywrQkFBeUIsSUFBSTtBQUM3Qiw2QkFBdUIsRUFBRTtBQUN6QixvQ0FBOEIsS0FBSztBQUNuQyxtQ0FBNkIsRUFBRTtBQUMvQixzQ0FBZ0MsRUFBRTtBQUNsQyxrQ0FBNEIsRUFBRTtBQUM5QixvQ0FBOEIsRUFBRTtBQUVoQyxVQUFJO0FBQ0YsY0FBTSxXQUFXLE1BQU07QUFBQSxVQUNyQjtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFlBQ0UseUJBQXlCO0FBQUEsWUFDekIsUUFBUSx1QkFBdUI7QUFBQSxVQUNqQztBQUFBLFFBQ0Y7QUFFQSxZQUFJLFlBQWE7QUFFakIsWUFBSSxDQUFDLFNBQVMsV0FBVyxDQUFDLFNBQVMsUUFBUSxDQUFDLE9BQU8sU0FBUyxPQUFPLFNBQVMsS0FBSyxJQUFJLENBQUMsR0FBRztBQUN2RiwwQ0FBZ0MsRUFBRTtBQUNsQyxzQ0FBNEIsRUFBRTtBQUM5Qix3Q0FBOEIsRUFBRTtBQUNoQztBQUFBLFlBQ0UsU0FBUyxTQUFTLE9BQU8sS0FBSyxLQUFLLDBDQUEwQyx1Q0FBdUM7QUFBQSxVQUN0SDtBQUNBLHdDQUE4QixJQUFJO0FBQ2xDO0FBQUEsUUFDRjtBQUlBLGNBQU0sMEJBQTBCLE9BQU8sU0FBUyxLQUFLLElBQUk7QUFDekQsY0FBTSxpQ0FBaUMsMEJBQTBCO0FBQ2pFLGNBQU0sd0JBQXdCLDZCQUE2Qiw4QkFBOEI7QUFDekYsY0FBTSx1QkFBdUIsNkJBQTZCLHVCQUF1QjtBQUNqRixxQ0FBNkIscUJBQXFCO0FBQ2xELHdDQUFnQyxvQkFBb0I7QUFDcEQsNkJBQXFCLHFCQUFxQjtBQUUxQyxjQUFNLG9CQUFvQixTQUFTLFNBQVMsS0FBSyxJQUFJLEtBQUs7QUFDMUQsY0FBTSxTQUFTLFNBQVMsU0FBUyxLQUFLLE1BQU07QUFDNUMsb0NBQTRCLGlCQUFpQjtBQUM3QyxzQ0FBOEIsTUFBTTtBQUNwQyxjQUFNLGdCQUFnQixnQ0FBZ0MsQ0FBQyxLQUFLLEtBQUssa0RBQWtELGNBQWM7QUFDakksY0FBTSxvQkFBb0IseUJBQXlCLG1CQUFtQixRQUFRLEtBQUs7QUFDbkYsY0FBTSwwQkFBMEIsU0FBUyxHQUFHLGFBQWEsSUFBSSxpQkFBaUIsS0FBSyxNQUFNLE1BQU0sR0FBRyxhQUFhLElBQUksaUJBQWlCO0FBQ3BJLCtCQUF1Qix1QkFBdUIsR0FBRyx1QkFBdUIsTUFBTSxvQkFBb0IsS0FBSyx1QkFBdUI7QUFDOUgsc0NBQThCLEtBQUs7QUFBQSxNQUNyQyxTQUFTLE9BQU87QUFDZCxZQUFJLFlBQWE7QUFDakIsWUFBSSxpQkFBaUIsZ0JBQWdCLE1BQU0sU0FBUyxhQUFjO0FBRWxFLFlBQUksaUJBQWlCLGVBQWU7QUFDbEMsY0FBSSxNQUFNLFdBQVcsS0FBSztBQUN4Qix5Q0FBNkIsRUFBRTtBQUMvQiw0Q0FBZ0MsRUFBRTtBQUNsQyx3Q0FBNEIsRUFBRTtBQUM5QiwwQ0FBOEIsRUFBRTtBQUNoQyxtQ0FBdUIsS0FBSyx1Q0FBdUMscUNBQXFDLENBQUM7QUFDekcsMENBQThCLElBQUk7QUFDbEM7QUFBQSxVQUNGO0FBRUEsY0FBSSxNQUFNLFdBQVcsT0FBTyxNQUFNLFdBQVcsS0FBSztBQUNoRCx5Q0FBNkIsRUFBRTtBQUMvQiw0Q0FBZ0MsRUFBRTtBQUNsQyx3Q0FBNEIsRUFBRTtBQUM5QiwwQ0FBOEIsRUFBRTtBQUNoQztBQUFBLGNBQ0UsU0FBUyxNQUFNLE9BQU8sS0FBSyxLQUFLLDBDQUEwQyx1Q0FBdUM7QUFBQSxZQUNuSDtBQUNBLDBDQUE4QixJQUFJO0FBQ2xDO0FBQUEsVUFDRjtBQUVBLHVDQUE2QixFQUFFO0FBQy9CLDBDQUFnQyxFQUFFO0FBQ2xDLHNDQUE0QixFQUFFO0FBQzlCLHdDQUE4QixFQUFFO0FBQ2hDO0FBQUEsWUFDRSxTQUFTLE1BQU0sT0FBTyxLQUFLLEtBQUssMENBQTBDLHVDQUF1QztBQUFBLFVBQ25IO0FBQ0Esd0NBQThCLElBQUk7QUFDbEM7QUFBQSxRQUNGO0FBRUEscUNBQTZCLEVBQUU7QUFDL0Isd0NBQWdDLEVBQUU7QUFDbEMsb0NBQTRCLEVBQUU7QUFDOUIsc0NBQThCLEVBQUU7QUFDaEMsK0JBQXVCLEtBQUssMENBQTBDLHVDQUF1QyxDQUFDO0FBQzlHLHNDQUE4QixJQUFJO0FBQUEsTUFDcEMsVUFBRTtBQUNBLFlBQUksQ0FBQyxhQUFhO0FBQ2hCLG1DQUF5QixLQUFLO0FBQUEsUUFDaEM7QUFBQSxNQUNGO0FBQUEsSUFDRixHQUFHLHlCQUF5QjtBQUU1QixXQUFPLE1BQU07QUFDWCxvQkFBYztBQUNkLDRCQUFzQjtBQUFBLElBQ3hCO0FBQUEsRUFDRixHQUFHO0FBQUEsSUFDRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSx1QkFBbUIsMkJBQVksTUFBTTtBQUN6QyxRQUFJLGdCQUFnQixhQUFhLENBQUMsUUFBUTtBQUN4QztBQUFBLElBQ0Y7QUFFQSxRQUFJLENBQUMsbUJBQW1CO0FBQ3RCLGtCQUFZO0FBQ1o7QUFBQSxJQUNGO0FBRUEsa0JBQWMsRUFBRTtBQUNoQixpQkFBYSxJQUFJO0FBQ2pCLDJCQUF1QixNQUFNO0FBQzdCLGNBQVUsS0FBSyx1Q0FBdUMsaUJBQWlCLENBQUM7QUFBQSxFQUMxRSxHQUFHLENBQUMsbUJBQW1CLFFBQVEsd0JBQXdCLGNBQWMsV0FBVyxXQUFXLENBQUM7QUFFNUYsUUFBTSx1QkFBbUIsMkJBQVksTUFBTTtBQUN6QyxRQUFJLGNBQWM7QUFDaEIsMkJBQXFCLHlCQUF5QjtBQUFBLFFBQzVDLGlCQUFpQjtBQUFBLE1BQ25CLENBQUM7QUFDRDtBQUFBLElBQ0Y7QUFFQSxRQUFJLENBQUMsVUFBVztBQUVoQixpQkFBYSxLQUFLO0FBQ2xCLGtCQUFjLEVBQUU7QUFDaEIsMkJBQXVCLE1BQU07QUFDN0IsY0FBVSxLQUFLLGlCQUFpQixRQUFRLENBQUM7QUFBQSxFQUMzQyxHQUFHLENBQUMsUUFBUSx3QkFBd0IsY0FBYyxTQUFTLENBQUM7QUFHNUQsUUFBTSxnQ0FBNEIsMkJBQVksTUFBTTtBQUNsRCxRQUFJLENBQUMsa0JBQWtCO0FBQ3JCLGtCQUFZO0FBQ1o7QUFBQSxJQUNGO0FBRUEsUUFBSSxjQUFjO0FBQ2hCO0FBQUEsSUFDRjtBQUVBLHlCQUFxQiwwQ0FBMEM7QUFBQSxNQUM3RCxpQkFBaUI7QUFBQSxJQUNuQixDQUFDO0FBQUEsRUFDSCxHQUFHLENBQUMsa0JBQWtCLGNBQWMsV0FBVyxXQUFXLENBQUM7QUFHM0QsUUFBTSwrQkFBMkIsMkJBQVksTUFBTTtBQUNqRCxRQUFJLENBQUMsV0FBVyxDQUFDLHdCQUF3QjtBQUN2QyxrQkFBWTtBQUNaO0FBQUEsSUFDRjtBQUVBLFFBQUksY0FBYztBQUNoQjtBQUFBLElBQ0Y7QUFFQSxVQUFNLFlBQVksK0NBQStDLG1CQUFtQixPQUFPLENBQUM7QUFDNUYseUJBQXFCLFdBQVc7QUFBQSxNQUM5QixpQkFBaUI7QUFBQSxJQUNuQixDQUFDO0FBQUEsRUFDSCxHQUFHLENBQUMsd0JBQXdCLGNBQWMsV0FBVyxhQUFhLE9BQU8sQ0FBQztBQUcxRSxRQUFNLDJCQUF1QjtBQUFBLElBQzNCLENBQUMsV0FBMkI7QUFDMUIsVUFBSSxDQUFDLFdBQVcsQ0FBQyx3QkFBd0I7QUFDdkMsb0JBQVk7QUFDWjtBQUFBLE1BQ0Y7QUFFQSxVQUFJLGNBQWM7QUFDaEI7QUFBQSxNQUNGO0FBRUEsWUFBTSxRQUFRLElBQUksZ0JBQWdCO0FBQUEsUUFDaEM7QUFBQSxRQUNBLGNBQWM7QUFBQSxNQUNoQixDQUFDO0FBQ0QsMkJBQXFCLG1CQUFtQixNQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQUEsUUFDMUQsaUJBQWlCO0FBQUEsTUFDbkIsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLENBQUMsd0JBQXdCLGNBQWMsV0FBVyxhQUFhLE9BQU87QUFBQSxFQUN4RTtBQUVBLFFBQU0saUNBQTZCLDJCQUFZLE1BQU07QUFDbkQseUJBQXFCLEtBQUs7QUFBQSxFQUM1QixHQUFHLENBQUMsb0JBQW9CLENBQUM7QUFFekIsUUFBTSwrQkFBMkIsMkJBQVksTUFBTTtBQUNqRCx5QkFBcUIsTUFBTTtBQUFBLEVBQzdCLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztBQUV6QixRQUFNLDZCQUF5QiwyQkFBWSxDQUFDLG1CQUEyQjtBQUNyRSxVQUFNLHFCQUFxQixTQUFTLGNBQWM7QUFDbEQsUUFBSSxDQUFDLG1CQUFvQjtBQUV6QixVQUFNLFlBQVksMkNBQTJDLG1CQUFtQixrQkFBa0IsQ0FBQztBQUNuRyx5QkFBcUIsU0FBUztBQUFBLEVBQ2hDLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSwyQkFBdUI7QUFBQSxJQUMzQixDQUNFLFdBQ0EsWUFLRztBQUNILFlBQU0sYUFBYSxTQUFTLFNBQVM7QUFDckMsWUFBTSxjQUFjLFNBQVMsT0FBTztBQUNwQyxVQUFJLENBQUMsY0FBYyxDQUFDLFlBQWE7QUFFakMsWUFBTSxXQUFXLFNBQVMsU0FBUyxTQUFTLFNBQVM7QUFDckQsWUFBTSxZQUFZLCtDQUErQyxtQkFBbUIsV0FBVyxDQUFDLGNBQWMsbUJBQW1CLFVBQVUsQ0FBQyxHQUFHLFdBQVcsU0FBUyxRQUFRLEtBQUssRUFBRTtBQUNsTCwyQkFBcUIsV0FBVztBQUFBLFFBQzlCLGlCQUFpQixTQUFTLG1CQUFtQjtBQUFBLFFBQzdDLGlCQUFpQixTQUFTLG1CQUFtQjtBQUFBLE1BQy9DLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxDQUFDLE9BQU87QUFBQSxFQUNWO0FBRUEsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsNkJBQTZCO0FBQUEsSUFDN0I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGOzs7QUN2cUJFLElBQUFDLHNCQUFBO0FBREssSUFBTSxnQkFBZ0IsTUFDM0IsOENBQUMsU0FBSSxTQUFRLGFBQVksTUFBSyxRQUFPLFFBQU8sZ0JBQWUsYUFBYSxLQUFLLGVBQVksUUFBTyxXQUFVLFVBQ3hHO0FBQUEsK0NBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLCtIQUE4SDtBQUFBLEVBQ25MLDZDQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSx3Q0FBdUM7QUFBQSxFQUM1Riw2Q0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsNkJBQTRCO0FBQUEsRUFDakYsNkNBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLFlBQVc7QUFBQSxFQUNoRSw2Q0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsWUFBVztBQUFBLEdBQ2xFO0FBR0ssSUFBTSxpQkFBaUIsTUFDNUIsNkNBQUMsU0FBSSxTQUFRLGFBQVksTUFBSyxRQUFPLFFBQU8sZ0JBQWUsYUFBYSxLQUFLLGVBQVksUUFBTyxXQUFVLFVBQ3hHLHVEQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSw2S0FBNEssR0FDbk87QUFHSyxJQUFNLGNBQWMsTUFDekIsOENBQUMsU0FBSSxTQUFRLGFBQVksTUFBSyxRQUFPLFFBQU8sZ0JBQWUsYUFBYSxLQUFLLGVBQVksUUFBTyxXQUFVLFVBQ3hHO0FBQUEsK0NBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLDBLQUF5SztBQUFBLEVBQzlOLDZDQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSwrREFBOEQ7QUFBQSxFQUNuSCw2Q0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsV0FBVTtBQUFBLEdBQ2pFOzs7QUw4bEJZLElBQUFDLHNCQUFBO0FBOWxCZCxJQUFNLGtCQUFrQjtBQUN4QixJQUFNLG9DQUFvQztBQUUxQyxJQUFNLGFBQWEsQ0FBSyxPQUFZLE1BQWMsYUFBMEI7QUFDMUUsTUFBSSxDQUFDLE1BQU0sT0FBUSxRQUFPLENBQUM7QUFDM0IsUUFBTSxXQUFXLEtBQUssSUFBSSxHQUFHLElBQUk7QUFDakMsUUFBTSxTQUFTLFdBQVcsS0FBSztBQUMvQixTQUFPLE1BQU0sTUFBTSxPQUFPLFFBQVEsUUFBUTtBQUM1QztBQUdBLElBQU0seUJBQXlCLENBQUMsVUFBNEI7QUFDMUQsUUFBTSxTQUFTLE9BQU8sS0FBSztBQUMzQixTQUFPLE9BQU8sU0FBUyxNQUFNLEtBQUssU0FBUztBQUM3QztBQUdPLElBQU0sMEJBQTBCLE1BQU07QUFDM0MsMEJBQXdCO0FBQUEsSUFDdEIsT0FBTyxTQUFTLE9BQU8saUJBQWlCO0FBQUEsSUFDeEMsVUFBVSxTQUFTLE9BQU8saUJBQWlCO0FBQUEsSUFDM0MsU0FBUyxTQUFTLE9BQU8sZ0JBQWdCO0FBQUEsRUFDM0MsQ0FBQztBQUNIO0FBR08sSUFBTSxzQ0FBc0MsTUFBTTtBQUN2RCxRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixJQUFJLGVBQWU7QUFDbkIsUUFBTSxZQUFZLFVBQVUscUJBQXFCLE1BQU07QUFDdkQsUUFBTSxtQkFBbUIsVUFBVSxxQkFBcUIsS0FBSztBQUM3RCxRQUFNLFVBQVUsU0FBUyxPQUFPLG9CQUFvQjtBQUNwRCxRQUFNLFlBQVksU0FBUyxPQUFPLHNCQUFzQixFQUFFLFlBQVk7QUFDdEUsUUFBTSxlQUFlLGNBQWM7QUFDbkMsUUFBTSxpQ0FBaUMsNkJBQTZCO0FBQUEsSUFDbEU7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsbUJBQW1CO0FBQUEsSUFDbkI7QUFBQSxFQUNGLENBQUM7QUFDRCxRQUFNLHFDQUFxQyxvQkFBb0IsQ0FBQztBQUNoRSxRQUFNLHVCQUFtQixzQkFBOEIsSUFBSTtBQUMzRCxRQUFNLHdCQUFvQixzQkFBTyxFQUFFO0FBQ25DLFFBQU0scUJBQWlCLHNCQUFnQyxJQUFJO0FBQzNELFFBQU0sc0JBQWtCLHNCQUFnQyxJQUFJO0FBQzVELFFBQU0sQ0FBQywwQkFBMEIsMkJBQTJCLFFBQUksd0JBQVMsS0FBSztBQUM5RSxRQUFNLENBQUMseUJBQXlCLDBCQUEwQixRQUFJLHdCQUFTLEVBQUU7QUFDekUsUUFBTSxDQUFDLGtDQUFrQyxtQ0FBbUMsUUFBSSx3QkFBUyxLQUFLO0FBQzlGLFFBQU0sQ0FBQyxvQkFBb0IscUJBQXFCLFFBQUksd0JBQVMsRUFBRTtBQUMvRCxRQUFNLGlDQUE2QixzQkFBTyxFQUFFO0FBRTVDLFFBQU0sdUJBQW1CO0FBQUEsSUFDdkIsT0FBTztBQUFBLE1BQ0wsT0FBTyxLQUFLLHNCQUFzQixPQUFPO0FBQUEsTUFDekMsTUFBTSxLQUFLLHFCQUFxQixVQUFVO0FBQUEsTUFDMUMsTUFBTSxLQUFLLHFCQUFxQixNQUFNO0FBQUEsTUFDdEMsTUFBTSxLQUFLLHFCQUFxQixNQUFNO0FBQUEsSUFDeEM7QUFBQSxJQUNBLENBQUM7QUFBQSxFQUNIO0FBRUEsUUFBTSxjQUFjLDJCQUEyQjtBQUFBLElBQzdDO0FBQUEsSUFDQSxrQkFBa0I7QUFBQSxJQUNsQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsYUFBYTtBQUFBLEVBQ2YsQ0FBQztBQUVELFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLElBQUk7QUFFSixRQUFNLGlDQUFpQyxvQkFBb0IsQ0FBQztBQUM1RCxRQUFNLGlDQUFpQyxhQUFhO0FBQ3BELFFBQU0sc0JBQXNCLGFBQWEsY0FBYyxTQUFTO0FBQ2hFLFFBQU0saUJBQWlCLGFBQWEsb0JBQW9CO0FBQ3hELFFBQU0sb0JBQW9CLE9BQU8sUUFBUSx1QkFBdUIsV0FBVyxPQUFPLHFCQUFxQjtBQUN2RyxRQUFNLDBCQUNKLHNCQUFzQixxQ0FBcUMsQ0FBQztBQUM5RCxRQUFNLG1CQUFtQixDQUFDLGlCQUFpQixrQkFBa0IsMkJBQTJCLGNBQWM7QUFDdEcsUUFBTSx5QkFBeUIsNkJBQTZCLGdCQUFnQixDQUFDLENBQUM7QUFDOUUsUUFBTSxFQUFFLCtCQUErQixJQUFJLDRCQUE0QjtBQUV2RSxRQUFNLEVBQUUsT0FBTyxhQUFhLGNBQWMsZUFBZSxjQUFjLElBQUksaUJBQWlCO0FBQUEsSUFDMUYsb0JBQW9CLEtBQUssZUFBZSxJQUFJO0FBQUEsSUFDNUMsbUJBQW1CLEtBQUssY0FBYyxRQUFRO0FBQUEsRUFDaEQsQ0FBQztBQUVELFFBQU0sa0NBQThCLDJCQUFZLE1BQU07QUFDcEQsK0JBQTJCLFVBQVU7QUFDckMsK0JBQTJCLEVBQUU7QUFDN0Isd0NBQW9DLEtBQUs7QUFBQSxFQUMzQyxHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0seUJBQXFCLDJCQUFZLE1BQU07QUFDM0MsZ0NBQTRCO0FBQzVCLGlCQUFhO0FBQUEsRUFDZixHQUFHLENBQUMsY0FBYywyQkFBMkIsQ0FBQztBQUU5QyxRQUFNLDBCQUFzQiwyQkFBWSxNQUFNO0FBQzVDLGdDQUE0QjtBQUM1QixrQkFBYztBQUFBLEVBQ2hCLEdBQUcsQ0FBQyxlQUFlLDJCQUEyQixDQUFDO0FBRS9DLFFBQU0seUJBQXFCLDJCQUFZLFlBQVk7QUFDakQsa0JBQWMsRUFBRTtBQUNoQixVQUFNLGNBQWM7QUFBQSxNQUNsQjtBQUFBLE1BQ0EsU0FBUyxDQUFDLFFBQVE7QUFDaEIsc0JBQWMsR0FBRztBQUNqQixrQkFBVSxHQUFHO0FBQUEsTUFDZjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLE1BQU0sZUFBZSxlQUFlLFNBQVMsQ0FBQztBQUVsRCxRQUFNLG1CQUFtQixLQUFLLGtCQUFrQixTQUFTO0FBQ3pELFFBQU0sa0JBQWtCLE1BQU0sY0FBYyxLQUFLLGNBQWMsUUFBUTtBQUN2RSxRQUFNLG1CQUFtQixPQUNyQixtQkFDQSxDQUFDLFFBQVEsYUFDUCxLQUFLLGFBQWEsSUFBSSxJQUNyQixNQUFNLGVBQWUsS0FBSyxlQUFlLElBQUk7QUFFcEQsUUFBTSwrQkFBMkIsMkJBQVksTUFBTTtBQUNqRCxRQUFJLENBQUMsUUFBUSxZQUFZO0FBQ3ZCLDBCQUFvQjtBQUNwQjtBQUFBLElBQ0Y7QUFFQSxTQUFLLG1CQUFtQjtBQUFBLEVBQzFCLEdBQUcsQ0FBQyxNQUFNLHFCQUFxQixvQkFBb0IsVUFBVSxDQUFDO0FBRTlELFFBQU0sbUJBQWUsdUJBQVEsTUFBTSxXQUFXLE9BQU8sVUFBVSxlQUFlLEdBQUcsQ0FBQyxVQUFVLEtBQUssQ0FBQztBQUNsRyxRQUFNLGlCQUFpQixLQUFLLE1BQU0sTUFBTSxVQUFVLEtBQUssZUFBZTtBQUN0RSxRQUFNLHNCQUFrQjtBQUFBLElBQ3RCLE1BQU0seUJBQXlCLFFBQVEsZUFBZSxNQUFNLFNBQVMsNEJBQTRCLFFBQVEsWUFBWSxDQUFDO0FBQUEsSUFDdEgsQ0FBQywwQkFBMEIsUUFBUSxjQUFjLFFBQVEsV0FBVztBQUFBLEVBQ3RFO0FBQ0EsUUFBTSx5QkFBeUIsTUFBTSxTQUFTLEtBQUssdUJBQXVCLFFBQVEsV0FBVztBQUM3RixRQUFNLDJCQUEyQixDQUFDO0FBQ2xDLFFBQU0sbUJBQWUsdUJBQVEsTUFBTTtBQUNqQyxVQUFNLGNBQWMsU0FBUyxRQUFRLE1BQU07QUFDM0MsVUFBTSxnQkFBZ0IsU0FBUyxnQkFBZ0I7QUFDL0MsUUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsWUFBWSxZQUFZLE1BQU0sY0FBYyxZQUFZLEdBQUc7QUFDL0YsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLFlBQVksU0FBUyxRQUFRLFFBQVE7QUFDM0MsV0FBTyxZQUFZLEdBQUcsU0FBUyxLQUFLLFdBQVcsTUFBTTtBQUFBLEVBQ3ZELEdBQUcsQ0FBQyxrQkFBa0IsUUFBUSxRQUFRLFFBQVEsUUFBUSxDQUFDO0FBRXZELFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsSUFBSSwrQkFBK0I7QUFBQSxJQUNqQztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxjQUFjO0FBQUEsSUFDZCxnQkFBZ0I7QUFBQSxJQUNoQjtBQUFBLElBQ0E7QUFBQSxJQUNBLG9CQUFvQixTQUFTLFFBQVEsWUFBWTtBQUFBLElBQ2pELG9CQUFvQixTQUFTLFFBQVEsUUFBUTtBQUFBLElBQzdDLGtCQUFrQjtBQUFBLElBQ2xCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLHFCQUFxQjtBQUFBLElBQ3JCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLDJCQUEyQixRQUFRO0FBQUEsSUFDbkMsY0FBYztBQUFBLElBQ2Q7QUFBQSxJQUNBLGlCQUFpQixDQUFDLG1CQUFtQjtBQUNuQyx3QkFBa0IsVUFBVSxTQUFTLGNBQWM7QUFBQSxJQUNyRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxnQkFBQUMsUUFBTSxVQUFVLE1BQU07QUFDcEIsUUFBSSxVQUFXO0FBQ2YsMEJBQXNCLFNBQVMsWUFBWSxDQUFDO0FBQUEsRUFDOUMsR0FBRyxDQUFDLFdBQVcsWUFBWSxDQUFDO0FBRTVCLFFBQU0sc0NBQWtDO0FBQUEsSUFDdEMsT0FBTyxrQkFBMEI7QUFDL0IsWUFBTSxnQkFBZ0IsU0FBUyxhQUFhO0FBQzVDLFlBQU0sS0FBSyxNQUFNLGdDQUFnQyxhQUFhO0FBQzlELFVBQUksSUFBSTtBQUNOLDhCQUFzQixhQUFhO0FBQ25DLDBCQUFrQixhQUFhO0FBQy9CLHFCQUFhLElBQUk7QUFBQSxNQUNuQjtBQUVBLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxDQUFDLGlDQUFpQyxtQkFBbUIsWUFBWTtBQUFBLEVBQ25FO0FBRUEsUUFBTSxpQ0FBNkI7QUFBQSxJQUNqQyxDQUFDLFVBQWtCO0FBQ2pCLFlBQU0sWUFBWSxTQUFTLEtBQUs7QUFDaEMsWUFBTSxnQkFBZ0IsU0FBUyxrQkFBa0I7QUFDakQsVUFBSSxjQUFjLGVBQWU7QUFDL0IsMEJBQWtCLFNBQVM7QUFDM0I7QUFBQSxNQUNGO0FBRUEsWUFBTSwyQkFDSixDQUFDLGdCQUFnQixhQUFhLDhCQUE4QixNQUFNLFNBQVM7QUFFN0UsVUFBSSxDQUFDLDBCQUEwQjtBQUM3QiwwQkFBa0IsU0FBUztBQUMzQiw4QkFBc0IsU0FBUztBQUMvQjtBQUFBLE1BQ0Y7QUFFQSxVQUFJLFFBQVEsTUFBTSxNQUFNO0FBQ3RCLDBCQUFrQixhQUFhO0FBQy9CO0FBQUEsTUFDRjtBQUVBLHdCQUFrQixTQUFTO0FBQzNCLGtCQUFZO0FBQUEsUUFDVixPQUFPLEtBQUssK0NBQStDLGNBQWM7QUFBQSxRQUN6RSxTQUFTO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsUUFDQSxhQUFhLEtBQUssZUFBZSxJQUFJO0FBQUEsUUFDckMsVUFBVSxNQUFNO0FBQ2QsNEJBQWtCLGFBQWE7QUFBQSxRQUNqQztBQUFBLFFBQ0EsV0FBVyxZQUFZO0FBQ3JCLGlCQUFPLGdDQUFnQyxTQUFTO0FBQUEsUUFDbEQ7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ047QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLDJDQUF1QztBQUFBLElBQzNDLENBQUMsVUFBa0I7QUFDakIsWUFBTSxZQUFZLG9DQUFvQyxLQUFLO0FBQzNELFlBQU0sZ0JBQWdCLG9DQUFvQyx3QkFBd0I7QUFDbEYsVUFBSSxjQUFjLGNBQWU7QUFFakMsWUFBTSwyQkFDSixDQUFDLGdCQUFnQixhQUFhLDhCQUE4QixNQUFNLFNBQVM7QUFFN0UsVUFBSSxDQUFDLDBCQUEwQjtBQUM3QixvQ0FBNEIsU0FBUztBQUNyQztBQUFBLE1BQ0Y7QUFFQSxVQUFJLFFBQVEsTUFBTSxLQUFNO0FBRXhCLGtDQUE0QixTQUFTO0FBQ3JDLGtCQUFZO0FBQUEsUUFDVixPQUFPLEtBQUssb0RBQW9ELGNBQWM7QUFBQSxRQUM5RSxTQUFTO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsUUFDQSxhQUFhLEtBQUssZUFBZSxJQUFJO0FBQUEsUUFDckMsVUFBVSxNQUFNO0FBQ2Qsc0NBQTRCLGFBQWE7QUFBQSxRQUMzQztBQUFBLFFBQ0EsV0FBVyxZQUFZO0FBQ3JCLGdCQUFNLEtBQUssTUFBTSwwQ0FBMEMsU0FBUztBQUNwRSxjQUFJLElBQUk7QUFDTix5QkFBYSxJQUFJO0FBQUEsVUFDbkI7QUFDQSxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ047QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSwrQkFDSixDQUFDLGdCQUNELGFBQ0EsOEJBQ0EsTUFBTSxTQUFTLEtBQ2YsU0FBUyxjQUFjLE1BQU0sU0FBUyxrQkFBa0I7QUFFMUQsUUFBTSw0Q0FBd0MsMkJBQVksTUFBTTtBQUM5RCxRQUFJLENBQUMsNkJBQThCO0FBQ25DLHNCQUFrQixTQUFTLGtCQUFrQixDQUFDO0FBQUEsRUFDaEQsR0FBRyxDQUFDLG9CQUFvQiw4QkFBOEIsaUJBQWlCLENBQUM7QUFFeEUsUUFBTSx5Q0FBcUMsMkJBQVksWUFBWTtBQUNqRSxRQUFJLDhCQUE4QjtBQUNoQyxZQUFNLEtBQUssTUFBTSxnQ0FBZ0MsY0FBYztBQUMvRCxVQUFJLENBQUMsR0FBSSxRQUFPO0FBQUEsSUFDbEI7QUFFQSxXQUFPLGFBQWE7QUFBQSxFQUN0QixHQUFHLENBQUMsZ0JBQWdCLGlDQUFpQyxjQUFjLDRCQUE0QixDQUFDO0FBRWhHLFFBQU0sOEJBQThCLCtCQUNoQyxLQUFLLCtDQUErQyxjQUFjLElBQ2xFO0FBQ0osUUFBTSxnQ0FBZ0MsK0JBQ2xDO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxFQUNGLElBQ0E7QUFDSixRQUFNLG9DQUFvQywrQkFBK0IsS0FBSyxlQUFlLElBQUksSUFBSTtBQUVyRyxRQUFNLDJCQUF1QjtBQUFBLElBQzNCLE9BQU8sY0FBc0I7QUFDM0IsWUFBTSxhQUFhLFNBQVMsU0FBUztBQUNyQyxVQUFJLENBQUMsY0FBYyxRQUFRLDBCQUEwQjtBQUNuRDtBQUFBLE1BQ0Y7QUFFQSxVQUFJLGFBQWEsNEJBQTRCO0FBQzNDLGNBQU0sS0FBSyxNQUFNLG1DQUFtQztBQUNwRCxZQUFJLENBQUMsSUFBSTtBQUNQO0FBQUEsUUFDRjtBQUVBLDZCQUFxQixZQUFZO0FBQUEsVUFDL0IsTUFBTTtBQUFBLFVBQ04saUJBQWlCO0FBQUEsVUFDakIsaUJBQWlCO0FBQUEsUUFDbkIsQ0FBQztBQUNEO0FBQUEsTUFDRjtBQUVBLDJCQUFxQixVQUFVO0FBQUEsSUFDakM7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLHdCQUFvQiwyQkFBWSxNQUFNO0FBQzFDLFFBQUksY0FBYztBQUNoQixZQUFNLGlCQUFpQixTQUFTLGtCQUFrQixPQUFPO0FBQ3pELFVBQUksQ0FBQyxlQUFnQjtBQUNyQiwyQ0FBcUM7QUFBQSxRQUNuQyxTQUFTO0FBQUEsTUFDWCxDQUFDO0FBQ0QscUNBQStCO0FBQy9CLGtDQUE0QixJQUFJO0FBQ2hDLDZCQUF1QixjQUFjO0FBQ3JDO0FBQUEsSUFDRjtBQUVBLHNCQUFrQjtBQUFBLEVBQ3BCLEdBQUcsQ0FBQyxjQUFjLHNCQUFzQixDQUFDO0FBRXpDLFFBQU0sOEJBQTBCO0FBQUEsSUFDOUIsQ0FBQyxXQUF1RTtBQUN0RSxVQUFJLENBQUMsd0JBQXdCO0FBQzNCO0FBQUEsTUFDRjtBQUVBLFlBQU0sY0FBYyxLQUFLLE9BQU8sVUFBVSxPQUFPLFFBQVE7QUFDekQsWUFBTSxxQkFDSixRQUFRLHVCQUF1QixRQUFRLFFBQVEsdUJBQXVCLFNBQ2xFLEtBQUssaUJBQWlCLFNBQVMsSUFDL0Isc0JBQXNCLE9BQU8sa0JBQWtCO0FBQ3JELFlBQU0sa0JBQWtCLHNCQUFzQixPQUFPLFVBQVU7QUFDL0QsWUFBTSxvQkFBb0I7QUFBQSxRQUN4QjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0YsRUFBRSxRQUFRLFFBQVEsSUFBSTtBQUN0QixZQUFNLGlCQUFpQixTQUFTLFFBQVEsaUJBQWlCO0FBQ3pELGlDQUEyQixVQUFVO0FBQ3JDLGlDQUEyQixjQUFjO0FBQ3pDLDBDQUFvQyxJQUFJO0FBRXhDLGtCQUFZO0FBQUEsUUFDVixPQUFPO0FBQUEsUUFDUCxTQUFTO0FBQUEsUUFDVCxhQUFhO0FBQUEsUUFDYixXQUFXLFlBQVk7QUFDckIsZ0JBQU0sS0FBSyxNQUFNO0FBQUEsWUFDZixPQUFPO0FBQUEsWUFDUDtBQUFBLFlBQ0EsMkJBQTJCO0FBQUEsVUFDN0I7QUFDQSxjQUFJLElBQUk7QUFDTiwyQ0FBK0I7QUFDL0Isd0NBQTRCO0FBQzVCLHlCQUFhO0FBQ2IsOEJBQWtCO0FBQUEsVUFDcEI7QUFDQSxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEscUNBQW1DO0FBQUEsSUFDakMsTUFBTSxRQUFRO0FBQUEsSUFDZCxXQUFXLE1BQU07QUFBQSxJQUNqQjtBQUFBLElBQ0E7QUFBQSxJQUNBLFlBQVk7QUFBQSxJQUNaLFVBQVU7QUFBQSxJQUNWLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLGNBQWM7QUFBQSxJQUNkO0FBQUEsSUFDQSxlQUFlO0FBQUEsSUFDZixpQkFBaUIsTUFBTTtBQUNyQixxQ0FBK0I7QUFDL0IsMkJBQXFCLHVCQUF1QjtBQUFBLElBQzlDO0FBQUEsSUFDQSxrQkFBa0I7QUFBQSxJQUNsQixvQkFBb0I7QUFBQSxJQUNwQixpQkFBaUI7QUFBQSxJQUNqQixxQkFBcUI7QUFBQSxJQUNyQjtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLDJCQUF1QiwyQkFBWSxDQUFDLFdBQStCO0FBQ3ZFLFVBQU0sT0FBTztBQUNiLFFBQUksQ0FBQyxRQUFRLE9BQU8sS0FBSyxZQUFZLFdBQVksUUFBTztBQUN4RCxVQUFNLE9BQU8sS0FBSyxRQUFxQiwyQkFBMkI7QUFDbEUsUUFBSSxDQUFDLEtBQU0sUUFBTztBQUNsQixRQUFJLENBQUMsaUJBQWlCLFNBQVMsU0FBUyxJQUFJLEVBQUcsUUFBTztBQUN0RCxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsQ0FBQztBQUVMLHlCQUF1QjtBQUFBLElBQ3JCLGNBQWM7QUFBQSxJQUNkO0FBQUEsSUFDQSxPQUFPO0FBQUEsSUFDUDtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sa0JBQWtCLCtCQUErQjtBQUFBLElBQ3JELFNBQVMsU0FBUyxRQUFRLGdCQUFnQixPQUFPO0FBQUEsSUFDakQsV0FBVztBQUFBLElBQ1gsY0FBYyxTQUFTLFFBQVEsWUFBWTtBQUFBLElBQzNDLGtCQUFrQixDQUFDLGdCQUFnQixhQUFhO0FBQUEsSUFDaEQ7QUFBQSxJQUNBLGVBQWUsQ0FBQztBQUFBLElBQ2hCLGFBQWE7QUFBQSxJQUNiLGFBQWE7QUFBQSxJQUNiLGFBQWEsQ0FBQyxXQUFXO0FBQ3ZCLFlBQU0sZ0JBQWdCLFNBQVMsUUFBUSxNQUFNO0FBQzdDLFVBQUksQ0FBQyxlQUFlO0FBQ2xCLDBCQUFrQjtBQUNsQjtBQUFBLE1BQ0Y7QUFFQSxVQUFJLFFBQVEsa0JBQWtCLE1BQU07QUFDbEMsMEJBQWtCO0FBQ2xCO0FBQUEsTUFDRjtBQUVBLFlBQU0saUJBQWlCLFNBQVMsUUFBUSxnQkFBZ0IsT0FBTztBQUMvRCxZQUFNLFFBQVEsSUFBSSxnQkFBZ0I7QUFBQSxRQUNoQyxRQUFRO0FBQUEsUUFDUixNQUFNO0FBQUEsUUFDTixRQUFRO0FBQUEsTUFDVixDQUFDO0FBQ0QsVUFBSSxnQkFBZ0I7QUFDbEIsdUNBQStCO0FBQUEsVUFDN0IsUUFBUTtBQUFBLFVBQ1IsUUFBUTtBQUFBLFVBQ1IsU0FBUztBQUFBLFFBQ1gsQ0FBQztBQUNELGNBQU0sSUFBSSxXQUFXLGNBQWM7QUFBQSxNQUNyQztBQUNBLDJCQUFxQix3QkFBd0IsTUFBTSxTQUFTLENBQUMsRUFBRTtBQUFBLElBQ2pFO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSxtQkFBZTtBQUFBLElBQ25CLE1BQU07QUFBQSxNQUNKO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixPQUFPLEtBQUssK0JBQStCLGNBQWM7QUFBQSxRQUN6RCxNQUFNLDZDQUFDLGlCQUFjO0FBQUEsUUFDckIsU0FBUyxnQkFBZ0I7QUFBQSxNQUMzQjtBQUFBLE1BQ0E7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLE9BQU8sS0FBSyxnQ0FBZ0MsaUJBQWlCO0FBQUEsUUFDN0QsTUFBTSw2Q0FBQyxrQkFBZTtBQUFBLFFBQ3RCLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osT0FBTyxLQUFLLDZCQUE2QixhQUFhO0FBQUEsUUFDdEQsTUFBTSw2Q0FBQyxlQUFZO0FBQUEsUUFDbkIsU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGO0FBQUEsSUFDQSxDQUFDLDBCQUEwQiwwQkFBMEIsZ0JBQWdCLGdCQUFnQjtBQUFBLEVBQ3ZGO0FBRUEsUUFBTSxzQkFDSixDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQyxnQkFBZ0IsYUFBYSxjQUFjLFNBQVM7QUFDbkgsUUFBTSxVQUFVLENBQUMsZ0JBQWdCLGFBQWE7QUFDOUMsUUFBTSwwQkFBMEIsU0FBUyxRQUFRLGlCQUFpQixFQUFFLEtBQUssRUFBRSxTQUFTO0FBQ3BGLFFBQU0sb0JBQXVDLDBCQUEwQixTQUFTO0FBQ2hGLFFBQU0sWUFBWSxtQ0FDaEIsOENBQUMsU0FBSSxXQUFVLGVBQ2I7QUFBQSxpREFBQyxXQUFNLFdBQVUsNEJBQ2QsZUFBSyxxQ0FBcUMsZ0JBQWdCLEdBQzdEO0FBQUEsSUFDQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsV0FBVTtBQUFBLFFBQ1YsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsVUFBVSxDQUFDLFVBQVU7QUFDbkIsZ0JBQU0sWUFBWSxNQUFNLE9BQU8sU0FBUztBQUN4QyxxQ0FBMkIsVUFBVTtBQUNyQyxxQ0FBMkIsU0FBUztBQUFBLFFBQ3RDO0FBQUEsUUFDQSxjQUFZLEtBQUsscUNBQXFDLGdCQUFnQjtBQUFBO0FBQUEsSUFDeEU7QUFBQSxLQUNGLElBQ0U7QUFFSixTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0Esc0JBQXNCO0FBQUEsSUFDdEI7QUFBQSxJQUNBO0FBQUEsSUFDQSw2QkFBNkI7QUFBQSxJQUM3QjtBQUFBLElBQ0Esc0JBQXNCO0FBQUEsSUFDdEI7QUFBQSxJQUNBO0FBQUEsSUFDQSxjQUFjO0FBQUEsRUFDaEI7QUFDRjs7O0FQL2xCTSxJQUFBQyxzQkFBQTtBQW5ITixJQUFNLGdDQUFnQztBQUN0QyxJQUFNLDBCQUEwQjtBQUdoQyxJQUFNLGlDQUFpQyxNQUFNO0FBQzNDLFFBQU0sZUFBZSxTQUFTLE9BQU8sMEJBQTBCO0FBQy9ELE1BQUksQ0FBQyxhQUFjO0FBQ25CLCtCQUE2QixZQUFZO0FBQzNDO0FBRUEsSUFBTSxnQ0FBZ0MsTUFBTTtBQUMxQyxRQUFNLGFBQWEsb0NBQW9DO0FBQ3ZELFFBQU0sRUFBRSxnQkFBZ0IsSUFBSSxlQUFlO0FBQzNDLFFBQU0sRUFBRSxpQkFBaUIsZ0JBQWdCLElBQUksNEJBQTRCO0FBQ3pFLFFBQU0sMEJBQTBCLGNBQUFDLFFBQU0sT0FBTyxFQUFFO0FBRS9DLGdCQUFBQSxRQUFNLFVBQVUsTUFBTTtBQUNwQixVQUFNLGlCQUFpQix3Q0FBd0MsV0FBVyxPQUFPO0FBQ2pGLDRCQUF3QixVQUFVLGdCQUFnQixXQUFXO0FBQUEsRUFDL0QsR0FBRyxDQUFDLFdBQVcsT0FBTyxDQUFDO0FBRXZCLFFBQU0saUNBQWlDLGNBQUFBLFFBQU0sWUFBWSxNQUFNO0FBQzdELFVBQU0saUJBQWlCLFNBQVMsd0JBQXdCLE9BQU87QUFDL0QsUUFBSSxDQUFDLGVBQWdCLFFBQU87QUFFNUIsb0JBQWdCO0FBQUEsTUFDZCxTQUFTLHlDQUF5QyxlQUFlO0FBQUEsTUFDakUsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsT0FBTyxDQUFDO0FBQUEsTUFDUixPQUFPO0FBQUEsSUFDVCxDQUFDO0FBRUQsNEJBQXdCLFVBQVU7QUFDbEMsV0FBTztBQUFBLEVBQ1QsR0FBRyxDQUFDLGlCQUFpQixlQUFlLENBQUM7QUFFckMsUUFBTSxnQ0FBZ0MsY0FBQUEsUUFBTSxZQUFZLE1BQU07QUFDNUQsUUFBSSwrQkFBK0IsR0FBRztBQUNwQztBQUFBLElBQ0Y7QUFFQSxVQUFNLGNBQWMsZ0JBQWdCO0FBQ3BDLFFBQUksQ0FBQyxZQUFhO0FBQ2xCLG9CQUFnQixXQUFXO0FBQUEsRUFDN0IsR0FBRyxDQUFDLGdDQUFnQyxpQkFBaUIsZUFBZSxDQUFDO0FBRXJFLGdCQUFBQSxRQUFNLFVBQVUsTUFBTTtBQUNwQixVQUFNLGFBQWEsU0FBUyxlQUFlLGVBQWU7QUFDMUQsUUFBSSxDQUFDLFdBQVk7QUFFakIsZUFBVyxhQUFhLGlCQUFpQix1QkFBdUI7QUFFaEUsV0FBTyxNQUFNO0FBQ1gsaUJBQVcsZ0JBQWdCLGVBQWU7QUFBQSxJQUM1QztBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFFTCxnQkFBQUEsUUFBTSxVQUFVLE1BQU07QUFDcEIsVUFBTSxhQUFhLFNBQVMsZUFBZSxlQUFlO0FBQzFELFFBQUksQ0FBQyxXQUFZO0FBRWpCLFVBQU0sd0JBQXdCLENBQUMsVUFBaUI7QUFDOUMsWUFBTSxlQUFlO0FBQ3JCLFlBQU0sZ0JBQWdCO0FBQ3RCLFlBQU0seUJBQXlCO0FBRS9CLFlBQU0sd0JBQXdCLE1BQU07QUFDbEMsc0NBQThCO0FBQzlCLGVBQU8saUNBQWlDO0FBQ3hDLGVBQU8sU0FBUyxPQUFPO0FBQUEsTUFDekI7QUFFQSxVQUFJLE9BQU8sT0FBTywyQkFBMkIsWUFBWTtBQUN2RCxlQUFPLHVCQUF1QixxQkFBcUI7QUFDbkQ7QUFBQSxNQUNGO0FBRUEsNEJBQXNCO0FBQUEsSUFDeEI7QUFFQSxlQUFXLGlCQUFpQixTQUFTLHVCQUF1QixJQUFJO0FBQ2hFLFdBQU8sTUFBTTtBQUNYLGlCQUFXLG9CQUFvQixTQUFTLHVCQUF1QixJQUFJO0FBQUEsSUFDckU7QUFBQSxFQUNGLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQztBQUVsQyxnQkFBQUEsUUFBTSxVQUFVLE1BQU07QUFDcEIsVUFBTSxtQkFBbUIsQ0FBQyxVQUFVO0FBQ2xDLFVBQUksT0FBTyxTQUFTLE1BQU0sTUFBTSxZQUFZLE1BQU07QUFDaEQ7QUFBQSxNQUNGO0FBRUEsWUFBTSx3QkFBd0IsTUFBTTtBQUNsQyxzQ0FBOEI7QUFDOUIsZUFBTyxpQ0FBaUM7QUFDeEMsZUFBTyxTQUFTLFFBQVEsdUJBQXVCO0FBQUEsTUFDakQ7QUFFQSxVQUFJLE9BQU8sT0FBTywyQkFBMkIsWUFBWTtBQUN2RCxlQUFPLHVCQUF1QixxQkFBcUI7QUFDbkQ7QUFBQSxNQUNGO0FBRUEsNEJBQXNCO0FBQUEsSUFDeEI7QUFFQSxXQUFPLGlCQUFpQixZQUFZLGdCQUFnQjtBQUNwRCxXQUFPLE1BQU07QUFDWCxhQUFPLG9CQUFvQixZQUFZLGdCQUFnQjtBQUFBLElBQ3pEO0FBQUEsRUFDRixHQUFHLENBQUMsNkJBQTZCLENBQUM7QUFFbEMsU0FDRSw4Q0FBQyxTQUFJLFdBQVUsYUFDYjtBQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFPLFdBQVc7QUFBQSxRQUNsQixZQUFZLFdBQVc7QUFBQSxRQUN2QixRQUFRLFdBQVc7QUFBQSxRQUNuQixNQUFNLFdBQVc7QUFBQSxRQUNqQiwwQkFBMEIsV0FBVztBQUFBLFFBQ3JDLGtCQUFrQixXQUFXO0FBQUEsUUFDN0IsaUJBQWlCLFdBQVc7QUFBQSxRQUM1QixrQkFBa0IsV0FBVztBQUFBLFFBQzdCLFdBQVcsV0FBVztBQUFBLFFBQ3RCLGdCQUFnQixXQUFXO0FBQUEsUUFDM0IsaUJBQWlCLFdBQVc7QUFBQSxRQUM1QixrQkFBa0IsV0FBVyxnQkFBZ0I7QUFBQSxRQUM3QyxpQkFBaUIsV0FBVyxnQkFBZ0I7QUFBQSxRQUM1Qyw0QkFBNEIsV0FBVyxnQkFBZ0I7QUFBQSxRQUN2RCwyQkFBMkIsV0FBVyxnQkFBZ0I7QUFBQSxRQUN0RCxzQkFBc0IsV0FBVyxnQkFBZ0I7QUFBQSxRQUNqRCx5QkFBeUIsV0FBVyxnQkFBZ0I7QUFBQSxRQUNwRCxzQkFBc0IsV0FBVyxnQkFBZ0I7QUFBQSxRQUNqRCxzQkFBc0IsV0FBVyxnQkFBZ0I7QUFBQSxRQUNqRCx1QkFBdUIsV0FBVyxnQkFBZ0I7QUFBQSxRQUNsRCx5QkFBeUIsV0FBVyxnQkFBZ0I7QUFBQSxRQUNwRCxXQUFXLFdBQVc7QUFBQSxRQUN0QixVQUFVLFdBQVc7QUFBQSxRQUNyQixzQkFBc0IsQ0FBQyxTQUFTO0FBQzlCLGVBQUssV0FBVyxnQkFBZ0IsbUJBQW1CLE1BQU0sUUFBUTtBQUFBLFFBQ25FO0FBQUEsUUFDQSx1QkFBdUIsQ0FBQyxTQUFTO0FBQy9CLGVBQUssV0FBVyxnQkFBZ0IsbUJBQW1CLE1BQU0sU0FBUztBQUFBLFFBQ3BFO0FBQUEsUUFDQSxvQkFBb0IsTUFBTTtBQUN4QixlQUFLLFdBQVcsZ0JBQWdCLGlCQUFpQixXQUFXLGVBQWUsT0FBTztBQUFBLFFBQ3BGO0FBQUEsUUFDQSxxQkFBcUIsTUFBTSxXQUFXLGdCQUFnQixrQkFBa0IsV0FBVyxnQkFBZ0IsT0FBTztBQUFBLFFBQzFHLHFCQUFxQixXQUFXLGdCQUFnQjtBQUFBLFFBQ2hELHNCQUFzQixNQUFNO0FBQzFCLGVBQUssV0FBVyxnQkFBZ0IsbUJBQW1CO0FBQUEsUUFDckQ7QUFBQSxRQUNBLHlCQUF5QixXQUFXLGdCQUFnQjtBQUFBO0FBQUEsSUFDdEQ7QUFBQSxJQUVBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxXQUFVO0FBQUEsUUFDVixPQUFPLEVBQUUsU0FBUyxXQUFXLGFBQWEsV0FBVywyQkFBMkIsU0FBUyxPQUFPO0FBQUEsUUFFaEc7QUFBQSx1REFBQyxTQUFJLFdBQVUsc0JBQXFCLFNBQVEsYUFBWSxNQUFLLFVBQVMsY0FBWSxLQUFLLGtCQUFrQixTQUFTLEdBQ2hILHVEQUFDLFlBQU8sV0FBVSx1QkFBc0IsSUFBRyxNQUFLLElBQUcsTUFBSyxHQUFFLEtBQUksYUFBWSxLQUFJLEdBQ2hGO0FBQUEsVUFDQyxLQUFLLGtCQUFrQixTQUFTO0FBQUE7QUFBQTtBQUFBLElBQ25DO0FBQUEsSUFFQyxXQUFXLGVBQWUsNkNBQUMsU0FBSSxXQUFVLGVBQWUscUJBQVcsY0FBYSxJQUFTO0FBQUEsSUFFekYsQ0FBQyxXQUFXLGFBQWEsQ0FBQyxXQUFXLDRCQUE0QixDQUFDLFdBQVcsZ0JBQWdCLFdBQVcsU0FDdkc7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE1BQU07QUFBQSxVQUNKLGNBQWMsV0FBVztBQUFBLFVBQ3pCLFdBQVcsV0FBVztBQUFBLFVBQ3RCLHFCQUFxQixXQUFXO0FBQUEsVUFDaEMsbUJBQW1CLFdBQVc7QUFBQSxRQUNoQztBQUFBLFFBQ0EsZUFBZTtBQUFBLFVBQ2IseUJBQXlCLFdBQVc7QUFBQSxVQUNwQyw2QkFBNkIsV0FBVztBQUFBLFVBQ3hDLGtCQUFrQixXQUFXO0FBQUEsUUFDL0I7QUFBQSxRQUNBLFFBQVEsV0FBVztBQUFBLFFBQ25CLGNBQWMsV0FBVztBQUFBLFFBQ3pCLGNBQWMsV0FBVztBQUFBLFFBQ3pCLHlCQUF5QixXQUFXO0FBQUEsUUFDcEMsMEJBQTBCLFdBQVc7QUFBQSxRQUNyQyw2QkFBNkIsV0FBVztBQUFBLFFBQ3hDLG1CQUFtQixXQUFXO0FBQUEsUUFDOUIsK0JBQStCLFdBQVc7QUFBQSxRQUMxQyxpQkFBaUIsV0FBVztBQUFBLFFBQzVCLGtCQUFrQixXQUFXO0FBQUEsUUFDN0IsZ0JBQWdCLFdBQVc7QUFBQSxRQUMzQixtQkFBbUIsV0FBVztBQUFBLFFBQzlCLG1CQUFtQixXQUFXO0FBQUEsUUFDOUIsMEJBQTBCLFdBQVc7QUFBQSxRQUNyQyw4QkFBOEIsV0FBVztBQUFBLFFBQ3pDLDBCQUEwQixXQUFXO0FBQUEsUUFDckMsNEJBQTRCLFdBQVc7QUFBQSxRQUN2QywwQkFBMEIsV0FBVztBQUFBLFFBQ3JDLHdCQUF3QixXQUFXO0FBQUEsUUFDbkMsd0JBQXdCLFdBQVc7QUFBQSxRQUNuQywyQkFBMkIsV0FBVztBQUFBLFFBQ3RDLDJCQUEyQixXQUFXO0FBQUEsUUFDdEMsa0NBQWtDLFdBQVc7QUFBQTtBQUFBLElBQy9DLElBQ0U7QUFBQSxJQUVILENBQUMsV0FBVyxnQkFBZ0IsQ0FBQyxXQUFXLGFBQWEsQ0FBQyxXQUFXLDRCQUE0QixDQUFDLFdBQVcsZUFDeEc7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLGNBQWMsV0FBVztBQUFBLFFBQ3pCLDJCQUEyQixTQUFTLFdBQVcsNEJBQTRCLFdBQVcsUUFBUSxZQUFZO0FBQUEsUUFDMUcsZ0JBQWdCLFdBQVc7QUFBQSxRQUMzQixVQUFVLFdBQVc7QUFBQSxRQUNyQixZQUFZLEtBQUssdUJBQXVCLE9BQU87QUFBQSxRQUMvQyxXQUFXLEtBQUsseUJBQXlCLGtDQUFrQztBQUFBLFFBQzNFLGtCQUFrQixXQUFXO0FBQUEsUUFDN0IsY0FBYyxXQUFXO0FBQUEsUUFDekIsa0JBQWtCLFdBQVc7QUFBQSxRQUM3QixZQUFZLFdBQVc7QUFBQTtBQUFBLElBQ3pCLElBQ0U7QUFBQSxJQUVILFdBQVcsc0JBQ1Y7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFNBQVMsV0FBVyxhQUFhO0FBQUEsUUFDakMsTUFBTSxXQUFXLFFBQVEsV0FBVztBQUFBLFFBQ3BDLFVBQVUsV0FBVztBQUFBLFFBQ3JCLGVBQWUsV0FBVztBQUFBO0FBQUEsSUFDNUIsSUFDRTtBQUFBLElBRUgsV0FBVyxVQUNWO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxXQUFXLEtBQUssNkJBQTZCLHFCQUFrQjtBQUFBLFFBQy9ELE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLGVBQWUsS0FBSyw2QkFBNkIscUJBQWtCO0FBQUEsUUFDbkUsV0FBVyxXQUFXO0FBQUE7QUFBQSxJQUN4QixJQUNFO0FBQUEsS0FDTjtBQUVKO0FBR0EsSUFBTSx5QkFBeUIsTUFBTTtBQUNuQyxTQUNFLDZDQUFDLGdDQUFxQix5QkFBdUIsTUFDM0MsdURBQUMsaUNBQThCLEdBQ2pDO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsaUNBQStCO0FBQy9CLFFBQU0sU0FBUyxTQUFTLGVBQWUsMkJBQTJCO0FBQ2xFLE1BQUksQ0FBQyxPQUFRO0FBQ2IsbUJBQWlCLFFBQVEsNkNBQUMsMEJBQXVCLENBQUU7QUFDckQ7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLGlDQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJSZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgInJlc3BvbnNlIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJSZWFjdCJdCn0K
