import {
  SingleDatePicker
} from "./chunks/chunk-YG5LBP53.js";
import {
  ChevronDoubleLeftIcon_default,
  ChevronDoubleRightIcon_default,
  ChevronLeftIcon_default,
  ChevronRightIcon_default
} from "./chunks/chunk-SZH7644I.js";
import {
  ExpenseCurrencySettlementFields_default,
  ExpenseTicketLinesList_default,
  ExpenseTicketPreviewModal_default,
  ExpenseTicketStickyPreview_default,
  buildExpenseExchangeRateInfoMessage,
  fetchExpenseOfficialExchangeRate,
  formatExpenseExchangeRateInputValue,
  hasExpenseTicketImagePreviewSource,
  useExpenseTicketDetailState,
  useExpenseTicketImagePreview
} from "./chunks/chunk-XCHASNWW.js";
import "./chunks/chunk-NQ4U2E7D.js";
import {
  calculateExpenseLineAmountMSTForCurrency,
  calculateExpenseLineExchangeRateForCurrency,
  isExpenseLineForeignCurrency,
  isExpenseLineSameReimbursementCurrency,
  mapExpenseTicketDetailHeader,
  normalizeExpenseLineCurrencyCode,
  resolveExpenseLineAmountMSTForCurrencyPayload,
  resolveExpenseLineExchangeRateForCurrency
} from "./chunks/chunk-P4AXZIYH.js";
import {
  usePageBottomActionsVisibility
} from "./chunks/chunk-M3X3ULOE.js";
import "./chunks/chunk-YAWCN7JA.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-TDNM2Z4R.js";
import "./chunks/chunk-KLQHZ5CJ.js";
import {
  useTimelineCardEffects
} from "./chunks/chunk-GLDIL3AG.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-SSILOGLX.js";
import {
  DEFAULT_LINE_REIMBURSABLE_EXPENSE,
  ExpenseReadOnlyField_default,
  executeExpenseMutation,
  getExpenseLineReimbursableExpenseLabel,
  getExpenseLineReimbursableExpenseOptions,
  normalizeExpenseLineReimbursableExpense,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-74756UZW.js";
import "./chunks/chunk-4BE3ZFCK.js";
import {
  appendExpenseTicketReturnQuery,
  resolveExpenseSheetDetailPolicy,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-3FZNNGIE.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-SMHFZFDC.js";
import "./chunks/chunk-CBDB7NMA.js";
import {
  areExpenseNumericInputsEquivalent,
  clearExpenseNavigationGuard,
  formatAmountWithCurrency,
  formatExpenseInputNumber,
  formatExpenseNumber,
  isManagingOtherExpenseRecord,
  navigateToExpenseUrl,
  reloadExpensePage,
  setExpenseNavigationGuard
} from "./chunks/chunk-DDCTTA2H.js";
import {
  configureExpenseApiAuth,
  createExpenseSheet,
  deleteExpenseSheetLine,
  deleteExpenseSheetTicket,
  deleteExpenseSheetTicketFile,
  fetchExpenseSheetDetail,
  fetchExpenseSheetTicket,
  formatExpenseDisplayDate,
  getFuelPriceKm,
  hasAssignedVoucher,
  mapExpenseSheetHeader,
  mapExpenseSheetLine,
  parseExpenseDate,
  safeText,
  toIsoDate,
  updateExpenseSheetLine
} from "./chunks/chunk-63PNSQ5Z.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-4B23OARV.js";
import {
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  getExpenseGastoTypeOptions,
  mapBooleanEnumOptions,
  toExpenseApiDdMmYyyy,
  toExpenseGastoTypeCode
} from "./chunks/chunk-UYN2TXUI.js";
import "./chunks/chunk-ZBKHPZJX.js";
import "./chunks/chunk-DY2B5JHI.js";
import {
  canAccess,
  classNames,
  showPermissionModal
} from "./chunks/chunk-UNQYUM6B.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunks/chunk-2NKOKBT5.js";
import {
  ApiFetchError,
  indFormat,
  indT
} from "./chunks/chunk-PNIKV5DC.js";
import "./chunks/chunk-6HGCHSZG.js";
import {
  __toESM
} from "./chunks/chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/pages/gastos/line/ExpenseSheetLineDetailPage.tsx
var import_react7 = __toESM(require_react());

// Web/wwwroot/react/src/components/commons/RecordNavigator.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var RecordNavigatorButton = ({ label, disabled, icon: Icon, onClick }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      type: "button",
      className: classNames(
        "inline-flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-[5px] border-0 bg-transparent text-primary/80 transition",
        "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-0",
        disabled ? "cursor-not-allowed text-primary/25" : "hover:bg-primary/8 hover:text-primary active:bg-primary/10"
      ),
      "aria-label": label,
      title: label,
      disabled,
      onClick: (event) => {
        event.preventDefault();
        if (disabled) return;
        onClick();
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6", strokeWidth: 1.8, "aria-hidden": "true" })
    }
  );
};
var RecordNavigator = ({
  currentIndex,
  totalItems,
  labels,
  disabled = false,
  variant = "standard",
  className,
  onFirst,
  onPrevious,
  onNext,
  onLast
}) => {
  const safeTotal = Math.max(0, totalItems || 0);
  const safeCurrent = Math.min(Math.max(1, currentIndex || 1), safeTotal || 1);
  if (safeTotal <= 1) return null;
  const atFirst = safeCurrent <= 1;
  const atLast = safeCurrent >= safeTotal;
  const disableFirst = disabled || atFirst;
  const disablePrevious = disabled || atFirst;
  const disableNext = disabled || atLast;
  const disableLast = disabled || atLast;
  const spacingClassName = variant === "compact" ? "h-[64px] px-3 py-0" : "min-h-12 px-3 py-1.5";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "nav",
    {
      className: classNames(
        "grid grid-cols-[1fr_auto_1fr] items-center bg-transparent font-sans text-primary",
        spacingClassName,
        className || ""
      ),
      "aria-label": labels.navigation,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-start gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordNavigatorButton, { label: labels.first, disabled: disableFirst, icon: ChevronDoubleLeftIcon_default, onClick: onFirst }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordNavigatorButton, { label: labels.previous, disabled: disablePrevious, icon: ChevronLeftIcon_default, onClick: onPrevious })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-w-[7rem] text-center text-base font-bold leading-none text-primary", "aria-live": "polite", children: labels.position }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordNavigatorButton, { label: labels.next, disabled: disableNext, icon: ChevronRightIcon_default, onClick: onNext }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordNavigatorButton, { label: labels.last, disabled: disableLast, icon: ChevronDoubleRightIcon_default, onClick: onLast })
        ] })
      ]
    }
  );
};
var RecordNavigator_default = RecordNavigator;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseSheetLineForm.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var formatQtyValue = (value) => {
  return formatExpenseNumber(value, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
    fallback: "-"
  });
};
var ExpenseSheetLineCurrencyFields = ({
  line,
  amountText,
  draftAmountCurrency,
  amountMSTText,
  isEditing,
  draftCurrencyCode,
  draftAmountMST,
  draftExchangeRate,
  localCurrencyCode,
  exchangeRateInfoMessage,
  onDraftCurrencyCodeChange,
  onDraftAmountCurrencyChange,
  onDraftAmountMSTChange,
  onDraftExchangeRateChange,
  onDraftExchangeRateCommit
}) => {
  const normalizedExpenseCurrencyCode = safeText(isEditing ? draftCurrencyCode : line.currencyCode).toUpperCase();
  const exchangeRateValue = isEditing ? draftExchangeRate : formatExpenseNumber(line.exchRate ?? null, {
    minimumFractionDigits: 7,
    maximumFractionDigits: 7,
    useGrouping: true,
    fallback: "-"
  });
  const reimbursementAmountValue = isEditing ? draftAmountMST : amountMSTText || "-";
  const amountCurrencyEditable = isEditing && line.ticket !== true;
  const amountCurrencyValue = amountCurrencyEditable ? draftAmountCurrency : amountText || "-";
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    ExpenseCurrencySettlementFields_default,
    {
      isEditing,
      expenseCurrencyCode: normalizedExpenseCurrencyCode,
      localCurrencyCode,
      exchangeRate: exchangeRateValue,
      exchangeRateInfoMessage,
      amountCurrency: amountCurrencyValue,
      amountCurrencyMode: amountCurrencyEditable ? "editable" : "readonly",
      reimbursementAmount: reimbursementAmountValue,
      onExpenseCurrencyChange: onDraftCurrencyCodeChange,
      onAmountCurrencyChange: onDraftAmountCurrencyChange,
      onExchangeRateChange: onDraftExchangeRateChange,
      onExchangeRateCommit: onDraftExchangeRateCommit,
      onReimbursementAmountChange: onDraftAmountMSTChange
    }
  );
};
var ExpenseSheetLineForm = ({
  line,
  fallbackDate,
  sheetDescription: _sheetDescription,
  projectValue,
  priceText,
  amountText,
  draftAmountCurrency,
  amountMSTText,
  internacionalLabel,
  isKmType,
  isFuelPriceLoading,
  fuelPriceMessage,
  fuelPriceMessageIsError,
  isEditing,
  gastoTypeOptions,
  internationalOptions,
  draftDescription,
  draftTransDate,
  draftTypeValueCode,
  draftPrice,
  draftQty,
  draftProjectId,
  draftInternational,
  draftReimbursableExpense,
  draftCurrencyCode,
  draftAmountMST,
  draftExchangeRate,
  localCurrencyCode,
  exchangeRateInfoMessage,
  linkedTicketFileId,
  showLinkedTicketField,
  descriptionInputRef,
  typeInputRef,
  priceInputRef,
  qtyInputRef,
  descriptionInvalid = false,
  typeInvalid = false,
  priceInvalid = false,
  qtyInvalid = false,
  onDraftDescriptionChange,
  onDraftTransDateChange,
  onDraftTypeValueCodeChange,
  onDraftPriceChange,
  onDraftQtyChange,
  onDraftAmountCurrencyChange,
  onDraftProjectIdChange,
  onDraftInternationalChange,
  onDraftReimbursableExpenseChange,
  onDraftCurrencyCodeChange,
  onDraftAmountMSTChange,
  onDraftExchangeRateChange,
  onDraftExchangeRateCommit,
  onOpenLinkedTicket
}) => {
  const reimbursableExpenseOptions = import_react.default.useMemo(() => getExpenseLineReimbursableExpenseOptions(), []);
  const reimbursableExpenseValue = normalizeExpenseLineReimbursableExpense(
    isEditing ? draftReimbursableExpense : line.reimbursableExpense
  );
  const reimbursableExpenseLabel = getExpenseLineReimbursableExpenseLabel(reimbursableExpenseValue);
  const internationalField = isEditing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    SelectCombobox_default,
    {
      label: indT("ExpenseSheets_Field_International", "International"),
      options: internationalOptions,
      value: draftInternational || "",
      onChange: onDraftInternationalChange,
      placeholder: indT("ExpenseSheets_Field_International", "International"),
      allowTextInput: false,
      showSearchButton: false
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    ExpenseReadOnlyField_default,
    {
      label: indT("ExpenseSheets_Field_International", "International"),
      value: internacionalLabel
    }
  );
  const reimbursableExpenseField = isEditing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    SelectCombobox_default,
    {
      label: indT("ExpenseSheets_Field_ReimbursableExpense", "Reimbursable"),
      options: reimbursableExpenseOptions,
      value: String(reimbursableExpenseValue),
      onChange: (value) => onDraftReimbursableExpenseChange(normalizeExpenseLineReimbursableExpense(value)),
      placeholder: indT("ExpenseSheets_Field_ReimbursableExpense", "Reimbursable"),
      allowTextInput: false,
      showSearchButton: false
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    ExpenseReadOnlyField_default,
    {
      label: indT("ExpenseSheets_Field_ReimbursableExpense", "Reimbursable"),
      value: reimbursableExpenseLabel
    }
  );
  const descriptionField = isEditing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "sm:col-span-2 space-y-1.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_Description", "Description") }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "input",
      {
        ref: descriptionInputRef,
        className: `form-control${descriptionInvalid ? " border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400" : ""}`,
        value: draftDescription,
        onChange: (event) => onDraftDescriptionChange(event.target.value || ""),
        "aria-invalid": descriptionInvalid ? "true" : "false",
        "aria-label": indT("ExpenseSheets_Field_Description", "Description")
      }
    )
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    ExpenseReadOnlyField_default,
    {
      label: indT("ExpenseSheets_Field_Description", "Description"),
      value: safeText(line.description) || "-",
      fullWidth: true
    }
  );
  const linkedTicketField = showLinkedTicketField ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    ExpenseReadOnlyField_default,
    {
      label: indT("Tickets_Field_FileId", "Ticket Id."),
      value: linkedTicketFileId,
      onClick: onOpenLinkedTicket
    }
  ) : null;
  const quantityField = isEditing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_Qty", "Quantity") }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "input",
      {
        ref: qtyInputRef,
        className: `form-control text-right tabular-nums${qtyInvalid ? " border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400" : ""}`,
        type: "text",
        inputMode: "decimal",
        value: draftQty,
        onChange: (event) => onDraftQtyChange(event.target.value || ""),
        onBlur: (event) => onDraftQtyChange(
          formatExpenseInputNumber(event.target.value, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
            fallback: ""
          })
        ),
        "aria-invalid": qtyInvalid ? "true" : "false",
        "aria-label": indT("ExpenseSheets_Field_Qty", "Quantity")
      }
    )
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    ExpenseReadOnlyField_default,
    {
      label: indT("ExpenseSheets_Field_Qty", "Quantity"),
      value: formatQtyValue(line.qty),
      valueAlign: "right"
    }
  );
  const priceField = isEditing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_Price", "Price") }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "input",
      {
        ref: priceInputRef,
        className: `${isKmType ? "form-control ind-readonly-field" : "form-control"} text-right tabular-nums${priceInvalid ? " border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400" : ""}`,
        type: "text",
        inputMode: "decimal",
        value: draftPrice,
        onChange: (event) => onDraftPriceChange(event.target.value || ""),
        onBlur: (event) => onDraftPriceChange(
          formatExpenseInputNumber(event.target.value, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
            fallback: ""
          })
        ),
        readOnly: isKmType,
        disabled: isKmType,
        "aria-readonly": isKmType,
        "aria-invalid": priceInvalid ? "true" : "false",
        "aria-label": indT("ExpenseSheets_Field_Price", "Price")
      }
    ),
    isKmType && isFuelPriceLoading ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-slate-500 text-xs", children: indT("ExpenseSheets_FuelPrice_Loading", "Loading fuel price...") }) : null,
    isKmType && !isFuelPriceLoading && fuelPriceMessage ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: fuelPriceMessageIsError ? "text-danger text-sm" : "text-slate-500 text-xs", children: fuelPriceMessage }) : null
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Price", "Price"), value: priceText || "-", valueAlign: "right" });
  const dateField = isEditing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "visita-field-text", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    SingleDatePicker,
    {
      label: indT("ExpenseSheets_Field_CreatedDate", "Date"),
      value: draftTransDate,
      onChange: onDraftTransDateChange,
      readOnly: !isEditing,
      disabled: !isEditing
    }
  ) }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    ExpenseReadOnlyField_default,
    {
      label: indT("ExpenseSheets_Field_CreatedDate", "Date"),
      value: formatExpenseDisplayDate(
        safeText(line.transDate || fallbackDate),
        document?.documentElement?.lang || "es-ES"
      )
    }
  );
  const typeField = isEditing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    SelectCombobox_default,
    {
      label: indT("ExpenseSheets_Field_Type", "Category"),
      options: gastoTypeOptions,
      value: draftTypeValueCode || "",
      onChange: onDraftTypeValueCodeChange,
      inputRef: typeInputRef,
      placeholder: indT("ExpenseSheets_Field_Type", "Category"),
      invalid: typeInvalid,
      allowTextInput: false,
      showSearchButton: false
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Type", "Category"), value: safeText(line.typeValue) || "-" });
  const projectField = isEditing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    ExpenseProjectFilterInput_default,
    {
      label: indT("ExpenseSheets_Field_Project", "Project"),
      placeholder: indT("ExpenseSheets_Filter_Project_Placeholder", "Project id"),
      value: draftProjectId,
      onChange: onDraftProjectIdChange,
      disabled: !isEditing,
      readOnly: !isEditing
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Project", "Project"), value: projectValue });
  const quantityPriceFields = /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-2 gap-3 md:col-span-2 md:gap-4", children: [
    quantityField,
    priceField
  ] });
  const dateTypeFields = /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-2 gap-3 md:col-span-2 md:gap-4", children: [
    dateField,
    typeField
  ] });
  const projectTicketFields = linkedTicketField ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-2 gap-3 md:col-span-2 md:gap-4", children: [
    projectField,
    linkedTicketField
  ] }) : projectField;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "space-y-0", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-[var(--radius-xl)]", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
    descriptionField,
    quantityPriceFields,
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ExpenseSheetLineCurrencyFields,
      {
        line,
        amountText,
        draftAmountCurrency,
        amountMSTText,
        isEditing,
        draftCurrencyCode,
        draftAmountMST,
        draftExchangeRate,
        localCurrencyCode,
        exchangeRateInfoMessage,
        onDraftCurrencyCodeChange,
        onDraftAmountCurrencyChange,
        onDraftAmountMSTChange,
        onDraftExchangeRateChange,
        onDraftExchangeRateCommit
      }
    ),
    dateTypeFields,
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-2 gap-3 md:col-span-2 md:gap-4", children: [
      internationalField,
      reimbursableExpenseField
    ] }),
    projectTicketFields
  ] }) }) });
};
var ExpenseSheetLineForm_default = ExpenseSheetLineForm;

// Web/wwwroot/react/src/pages/gastos/constants/internationalOptions.ts
var getExpenseInternationalOptions = () => [
  { value: true, text: indT("ExpenseSheets_International_Yes", "S\xED") },
  { value: false, text: indT("ExpenseSheets_International_No", "No") }
];
var getExpenseInternationalLabel = (value) => {
  if (value === true) {
    return indT("ExpenseSheets_International_Yes", "S\xED");
  }
  if (value === false) {
    return indT("ExpenseSheets_International_No", "No");
  }
  return "-";
};
var parseExpenseInternationalValue = (raw) => {
  if (raw === true || raw === false) {
    return raw;
  }
  const value = String(raw || "").trim().toLowerCase();
  if (!value) {
    return null;
  }
  if (value === "true" || value === "1") {
    return true;
  }
  if (value === "false" || value === "0") {
    return false;
  }
  return null;
};

// Web/wwwroot/react/src/pages/gastos/line/useExpenseSheetLineDetailMutations.ts
var import_react2 = __toESM(require_react());
var normalizeLineDate = (raw) => {
  return toExpenseApiDdMmYyyy(raw);
};
var parseNumber = (raw) => parseDecimalInput(raw);
var useExpenseSheetLineDetailMutations = ({
  busy,
  isEditing,
  isCreateMode,
  isEditLocked,
  isDeleteLocked,
  canCreateExpense,
  canEditExpense,
  canDeleteExpense,
  sheetId,
  lineId,
  line,
  linkedTicketFileId,
  draftDescription,
  draftTransDate,
  draftTypeValueCode,
  draftPrice,
  draftQty,
  draftProjectId,
  draftInternational,
  draftReimbursableExpense,
  draftCurrencyCode,
  draftAmountMST,
  draftExchangeRate,
  localCurrencyCode,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing,
  onInvalidDescription,
  onInvalidType,
  onInvalidAmountQty,
  onCreateSuccess
}) => {
  const isNotFoundError = (error) => {
    return error instanceof ApiFetchError && error.status === 404;
  };
  const isMissingTicketFileMessage = (message) => {
    const normalized = String(message || "").trim().toLowerCase();
    if (!normalized) return false;
    return normalized.includes("archivo asociado") || normalized.includes("archivo adjunto") || normalized.includes("associated file") || normalized.includes("attached file");
  };
  const handleUpdate = (0, import_react2.useCallback)(async () => {
    if (busy || !isEditing) return false;
    if (isEditLocked) return false;
    const canProceed = isCreateMode ? canCreateExpense : canEditExpense;
    if (!canProceed) {
      showPermissionModal();
      return false;
    }
    const normalizedDate = normalizeLineDate(draftTransDate);
    const parsedTypeValue = toExpenseGastoTypeCode(draftTypeValueCode, { allowNone: false });
    const parsedPrice = parseNumber(draftPrice);
    const parsedQty = parseNumber(draftQty);
    const parsedInternational = parseExpenseInternationalValue(draftInternational);
    const normalizedReimbursableExpense = normalizeExpenseLineReimbursableExpense(draftReimbursableExpense);
    const parsedAmountMST = parseNumber(draftAmountMST);
    const parsedExchangeRate = parseNumber(draftExchangeRate);
    const normalizedCurrencyCode = normalizeExpenseLineCurrencyCode(draftCurrencyCode);
    const normalizedLocalCurrencyCode = normalizeExpenseLineCurrencyCode(localCurrencyCode) || "EUR";
    const normalizedDescription = String(draftDescription || "").trim();
    if (!normalizedDescription) {
      onInvalidDescription?.();
      const validationMessage = indT("ExpenseSheets_Validation_DescriptionRequired", "Description is required.");
      setModalError(validationMessage);
      setStatus(validationMessage);
      return false;
    }
    const hasValidQtyPrice = parsedQty != null && parsedQty > 0 && parsedPrice != null && parsedPrice > 0;
    if (!hasValidQtyPrice) {
      onInvalidAmountQty?.();
      const validationMessage = indT(
        "ExpenseSheets_Line_Validation_AmountQty",
        "Quantity and price must be greater than 0."
      );
      setModalError(validationMessage);
      setStatus(validationMessage);
      return false;
    }
    if (!normalizedDate) {
      setModalError(EXPENSE_API_DATE_FORMAT_MESSAGE);
      setStatus(EXPENSE_API_DATE_FORMAT_MESSAGE);
      return false;
    }
    if (parsedTypeValue === null) {
      onInvalidType?.();
      return false;
    }
    const isForeignCurrency = isExpenseLineForeignCurrency(normalizedCurrencyCode, normalizedLocalCurrencyCode);
    const hasForeignCurrencySettlement = parsedExchangeRate != null && parsedExchangeRate > 0 || parsedAmountMST != null && parsedAmountMST > 0;
    if (isForeignCurrency && !hasForeignCurrencySettlement) {
      const validationMessage = indT(
        "ExpenseSheets_Line_Validation_ForeignCurrencySettlement",
        "Foreign currency lines require an exchange rate greater than 0 or a reimbursement amount."
      );
      setModalError(validationMessage);
      setStatus(validationMessage);
      return false;
    }
    const result = await executeExpenseMutation({
      startStatus: isCreateMode ? indT("ExpenseSheets_Line_Detail_Creating", "Creating expense line...") : indT("ExpenseSheets_Line_Detail_Updating", "Updating expense line..."),
      fallbackErrorMessage: indT("ExpenseSheets_Detail_UpdateError", "Update error."),
      setModalError,
      setBusy,
      setStatus,
      action: async () => {
        const lineAmount = Number(parsedQty) * Number(parsedPrice);
        const payloadAmountMST = resolveExpenseLineAmountMSTForCurrencyPayload(
          lineAmount,
          parsedAmountMST,
          normalizedCurrencyCode,
          normalizedLocalCurrencyCode
        );
        const payloadExchangeRate = resolveExpenseLineExchangeRateForCurrency(
          normalizedCurrencyCode,
          normalizedLocalCurrencyCode,
          parsedExchangeRate
        );
        const commonLinePayload = {
          transDate: normalizedDate,
          typeValue: parsedTypeValue,
          description: normalizedDescription,
          internacional: parsedInternational ?? line?.internacional ?? false,
          ticket: line?.ticket === true,
          qty: Number(parsedQty),
          price: Number(parsedPrice),
          projId: String(draftProjectId || "").trim() || void 0,
          reimbursableExpense: normalizedReimbursableExpense,
          currencyCode: normalizedCurrencyCode || void 0,
          amountMST: payloadAmountMST,
          exchRate: payloadExchangeRate,
          indAttachFiles: safeText(line?.indAttachFiles)
        };
        const createLinePayload = commonLinePayload;
        const updateLinePayload = commonLinePayload;
        const response = isCreateMode ? await createExpenseSheet({
          mode: 2,
          existingHojaGastosId: sheetId,
          lines: [createLinePayload]
        }) : await updateExpenseSheetLine(sheetId, lineId, updateLinePayload);
        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
        }
        if (isCreateMode) {
          setStatus(indT("ExpenseSheets_Line_Detail_Created", "Expense line created"));
          onCreateSuccess();
        } else {
          setStatus(indT("ExpenseSheets_Line_Detail_Updated", "Expense line updated"));
          setIsEditing(false);
        }
        return true;
      }
    });
    return result.ok;
  }, [
    busy,
    canCreateExpense,
    canEditExpense,
    draftPrice,
    draftDescription,
    draftInternational,
    draftAmountMST,
    draftCurrencyCode,
    draftExchangeRate,
    draftProjectId,
    draftQty,
    draftTransDate,
    draftTypeValueCode,
    draftReimbursableExpense,
    isCreateMode,
    isEditLocked,
    isEditing,
    line,
    lineId,
    localCurrencyCode,
    onCreateSuccess,
    onInvalidDescription,
    onInvalidAmountQty,
    onInvalidType,
    setBusy,
    setIsEditing,
    setModalError,
    setStatus,
    sheetId
  ]);
  const handleDelete = (0, import_react2.useCallback)(async () => {
    if (busy) return false;
    if (isDeleteLocked) return false;
    if (!canDeleteExpense) {
      showPermissionModal();
      return false;
    }
    const result = await executeExpenseMutation({
      startStatus: indT("ExpenseSheets_Line_Detail_Deleting", "Deleting expense line..."),
      fallbackErrorMessage: indT("ExpenseSheets_Detail_DeleteError", "Delete error."),
      setModalError,
      setBusy,
      setStatus,
      action: async () => {
        const safeLinkedTicketFileId = safeText(linkedTicketFileId);
        if (safeLinkedTicketFileId) {
          try {
            const deleteFileResponse = await deleteExpenseSheetTicketFile(safeLinkedTicketFileId);
            if (!deleteFileResponse.Success && !isMissingTicketFileMessage(deleteFileResponse.Message)) {
              throw new Error(deleteFileResponse.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
            }
          } catch (error) {
            if (!isNotFoundError(error)) {
              throw error;
            }
          }
          try {
            const deleteTicketResponse = await deleteExpenseSheetTicket(safeLinkedTicketFileId);
            if (!deleteTicketResponse.Success) {
              throw new Error(deleteTicketResponse.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
            }
          } catch (error) {
            if (!isNotFoundError(error)) {
              throw error;
            }
          }
        }
        const response = await deleteExpenseSheetLine(sheetId, lineId);
        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
        }
        setStatus(indT("ExpenseSheets_Line_Detail_Deleted", "Expense line deleted"));
        return true;
      }
    });
    return result.ok;
  }, [
    busy,
    canDeleteExpense,
    isDeleteLocked,
    lineId,
    linkedTicketFileId,
    setBusy,
    setModalError,
    setStatus,
    sheetId
  ]);
  return {
    handleUpdate,
    handleDelete
  };
};

// Web/wwwroot/react/src/pages/gastos/line/useExpenseSheetLineDetailTopbarActions.ts
var useExpenseSheetLineDetailTopbarActions = ({
  busy,
  modalOpen,
  isEditing,
  isCreateMode,
  isLocked,
  actionMode = "default",
  permissionsReady = true,
  canCreateExpense,
  canEditExpense,
  canDeleteExpense,
  sheetId,
  setModalError,
  handleEnableEdit,
  handleCancelEdit,
  canOpenSaveConfirm,
  handleUpdate,
  handleDelete,
  onSaveSuccess,
  openConfirm,
  closeConfirm
}) => {
  useExpenseTopbarCrudActions({
    actionGroupId: "expense-line-detail-actions",
    ids: {
      editIconId: "expenseLineEditIcon",
      saveIconId: "expenseLineSaveIcon",
      deleteBtnId: "expenseLineDeleteBtn",
      cancelBtnId: "expenseLineCancelBtn"
    },
    events: {
      editEvent: "expense-line-detail-edit",
      deleteEvent: "expense-line-detail-delete",
      cancelEvent: "expense-line-detail-cancel-edit"
    },
    busy,
    modalOpen,
    isEditing,
    isCreateMode,
    isLocked,
    actionMode,
    permissionsReady,
    canCreate: canCreateExpense,
    canEdit: canEditExpense,
    canDelete: canDeleteExpense,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    canOpenSaveConfirm,
    handleSave: handleUpdate,
    handleDelete,
    saveConfirmTitle: indT("ExpenseSheets_Detail_SaveChanges_Title", "Save changes"),
    saveConfirmMessage: indT("ExpenseSheets_Detail_SaveChanges_Body", "Do you want to save changes?"),
    saveConfirmText: indT("Common_Save", "Save"),
    deleteConfirmTitle: indT("Confirm_Delete_Title", "Delete"),
    deleteConfirmMessage: indT("Confirm_Delete_Body", "Do you want to delete this item?"),
    deleteConfirmText: indT("Common_Delete", "Delete"),
    onSaveSuccess,
    onDeleteSuccess: () => {
      navigateToExpenseUrl(`/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(sheetId)}`);
    },
    openConfirm,
    closeConfirm
  });
};

// Web/wwwroot/react/src/pages/gastos/line/useExpenseSheetLineDetailConfirmDialog.ts
var import_react3 = __toESM(require_react());
var useExpenseSheetLineDetailConfirmDialog = ({
  busy,
  modalError,
  setModalError,
  setStatus
}) => {
  const { modal, openConfirm, closeConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "OK"),
    defaultCancelText: indT("Confirm_No", "Cancel")
  });
  const handleModalConfirm = (0, import_react3.useCallback)(async () => {
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
  const handleModalButtonConfirm = (0, import_react3.useCallback)(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }
    void handleModalConfirm();
  }, [busy, closeConfirm, handleModalConfirm, modalError]);
  return {
    modal,
    openConfirm,
    closeConfirm,
    modalLoadingText,
    modalCancelText,
    modalConfirmText,
    handleModalButtonConfirm
  };
};

// Web/wwwroot/react/src/pages/gastos/line/useExpenseSheetLineDetailState.ts
var import_react4 = __toESM(require_react());
var KM_GASTO_TYPE_CODE = "3";
var FUEL_PRICE_DEBOUNCE_MS = 300;
var FUEL_PRICE_SOURCE_USER_CONFIG = "CRMHojaGastosUserPriceKmFechaTable";
var FUEL_PRICE_SOURCE_GLOBAL_CONFIG = "CRMParameters";
var EXPENSE_STATUS_APPROVED = 2;
var EXPENSE_STATUS_PAID = 4;
var EMPTY_LINE_NAVIGATION = {
  currentIndex: 0,
  totalLines: 0,
  firstLineId: "",
  previousLineId: "",
  nextLineId: "",
  lastLineId: ""
};
var resolveLineNavigationId = (line) => {
  return safeText(line?.lineRecId);
};
var buildLineNavigation = (lines, currentLineId) => {
  const normalizedCurrentLineId = safeText(currentLineId).toUpperCase();
  if (!normalizedCurrentLineId || lines.length <= 0) {
    return EMPTY_LINE_NAVIGATION;
  }
  const currentIndex = lines.findIndex(
    (entry) => resolveLineNavigationId(entry).toUpperCase() === normalizedCurrentLineId
  );
  if (currentIndex < 0) {
    return EMPTY_LINE_NAVIGATION;
  }
  const firstNavigableLine = lines.find((entry) => !!resolveLineNavigationId(entry));
  const previousNavigableLine = lines.slice(0, currentIndex).reverse().find((entry) => !!resolveLineNavigationId(entry));
  const nextNavigableLine = lines.slice(currentIndex + 1).find((entry) => !!resolveLineNavigationId(entry));
  const lastNavigableLine = [...lines].reverse().find((entry) => !!resolveLineNavigationId(entry));
  return {
    currentIndex: currentIndex + 1,
    totalLines: lines.length,
    firstLineId: resolveLineNavigationId(firstNavigableLine),
    previousLineId: resolveLineNavigationId(previousNavigableLine),
    nextLineId: resolveLineNavigationId(nextNavigableLine),
    lastLineId: resolveLineNavigationId(lastNavigableLine)
  };
};
var toInputDate = (raw) => {
  const parsed = parseExpenseDate(raw);
  return parsed ? toIsoDate(parsed) : "";
};
var formatEditableNumber = (value) => {
  return formatExpenseInputNumber(value, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
    fallback: ""
  });
};
var formatEditableQuantity = (value) => {
  return formatExpenseInputNumber(value, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
    fallback: ""
  });
};
var formatEditableExchangeRate = (value) => {
  return formatExpenseInputNumber(value, {
    minimumFractionDigits: 7,
    maximumFractionDigits: 7,
    useGrouping: true,
    fallback: ""
  });
};
var normalizeFuelTransDate = (raw) => {
  return toExpenseApiDdMmYyyy(raw);
};
var resolveFuelPriceSourceMessage = (source, effectiveDate) => {
  const normalizedSource = safeText(source);
  if (normalizedSource === FUEL_PRICE_SOURCE_USER_CONFIG) {
    return indT("ExpenseSheets_FuelPrice_Source_UserConfig", "Obtained by user configuration.");
  }
  if (normalizedSource === FUEL_PRICE_SOURCE_GLOBAL_CONFIG) {
    return indT("ExpenseSheets_FuelPrice_Source_GlobalConfig", "Obtained by global configuration.");
  }
  const sourceLabel = indT("ExpenseSheets_FuelPrice_Source", "Fuel price source");
  if (!normalizedSource) {
    return effectiveDate ? `${sourceLabel}: ${effectiveDate}` : sourceLabel;
  }
  return effectiveDate ? `${sourceLabel}: ${normalizedSource} (${effectiveDate})` : `${sourceLabel}: ${normalizedSource}`;
};
var buildCreateLineDraft = (baseDate, projectId, currencyCode, reimbursableExpense = DEFAULT_LINE_REIMBURSABLE_EXPENSE) => {
  return {
    lineRecId: "",
    transDate: baseDate,
    typeValue: "",
    typeValueCode: "",
    description: "",
    internacional: false,
    ticket: false,
    price: null,
    qty: 1,
    amount: null,
    projId: projectId,
    reimbursableExpense,
    currencyCode,
    amountMST: null,
    exchRate: 100,
    indAttachFiles: ""
  };
};
var useExpenseSheetLineDetailState = ({
  hasAccess,
  allowSelfManagement,
  canManageOtherUsers,
  currentAxUserId,
  currentCrmUserId,
  selectedManagedUserId,
  sheetId,
  lineId,
  isCreateMode,
  startInEditMode,
  onForbidden
}) => {
  const [header, setHeader] = (0, import_react4.useState)(null);
  const [line, setLine] = (0, import_react4.useState)(null);
  const [isLoading, setIsLoading] = (0, import_react4.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react4.useState)("");
  const [busy, setBusy] = (0, import_react4.useState)(false);
  const [status, setStatus] = (0, import_react4.useState)("");
  const [isEditing, setIsEditing] = (0, import_react4.useState)(false);
  const [modalError, setModalError] = (0, import_react4.useState)("");
  const [draftDescription, setDraftDescription] = (0, import_react4.useState)("");
  const [draftTransDate, setDraftTransDate] = (0, import_react4.useState)("");
  const [draftTypeValueCode, setDraftTypeValueCode] = (0, import_react4.useState)("");
  const [draftPrice, setDraftPrice] = (0, import_react4.useState)("");
  const [draftQty, setDraftQty] = (0, import_react4.useState)("");
  const [draftProjectId, setDraftProjectId] = (0, import_react4.useState)("");
  const [draftInternational, setDraftInternational] = (0, import_react4.useState)("");
  const [draftReimbursableExpense, setDraftReimbursableExpense] = (0, import_react4.useState)(DEFAULT_LINE_REIMBURSABLE_EXPENSE);
  const [draftCurrencyCode, setDraftCurrencyCode] = (0, import_react4.useState)("");
  const [draftAmountMST, setDraftAmountMST] = (0, import_react4.useState)("");
  const [draftExchangeRate, setDraftExchangeRate] = (0, import_react4.useState)("");
  const [isFuelPriceLoading, setIsFuelPriceLoading] = (0, import_react4.useState)(false);
  const [fuelPriceMessage, setFuelPriceMessage] = (0, import_react4.useState)("");
  const [fuelPriceMessageIsError, setFuelPriceMessageIsError] = (0, import_react4.useState)(false);
  const [lineNavigation, setLineNavigation] = (0, import_react4.useState)(EMPTY_LINE_NAVIGATION);
  const hydrateDraftFromLine = (0, import_react4.useCallback)((nextLine, nextHeader) => {
    const isExistingLine = !!safeText(nextLine?.lineRecId);
    const normalizedLineProjectId = safeText(nextLine?.projId);
    setDraftDescription(safeText(nextLine?.description));
    setDraftTransDate(toInputDate(nextLine?.transDate || nextHeader?.createdDate));
    setDraftTypeValueCode(safeText(nextLine?.typeValueCode));
    setDraftPrice(formatEditableNumber(nextLine?.price));
    setDraftQty(formatEditableQuantity(nextLine?.qty));
    setDraftProjectId(isExistingLine ? normalizedLineProjectId : normalizedLineProjectId || safeText(nextHeader?.projId));
    setDraftInternational(nextLine?.internacional === true ? "true" : nextLine?.internacional === false ? "false" : "");
    setDraftReimbursableExpense(normalizeExpenseLineReimbursableExpense(nextLine?.reimbursableExpense));
    const localCurrencyCode = safeText(nextHeader?.currencyCode).toUpperCase() || "EUR";
    const lineCurrencyCode = safeText(nextLine?.currencyCode).toUpperCase() || localCurrencyCode;
    const lineAmountMST = nextLine?.visibleReimbursableTotal ?? nextLine?.amountMST ?? (isExpenseLineSameReimbursementCurrency(lineCurrencyCode, localCurrencyCode) ? nextLine?.amount : null);
    const lineExchangeRate = lineCurrencyCode === localCurrencyCode ? 100 : nextLine?.exchRate;
    setDraftCurrencyCode(lineCurrencyCode);
    setDraftAmountMST(formatEditableNumber(lineAmountMST));
    setDraftExchangeRate(formatEditableExchangeRate(lineExchangeRate));
  }, []);
  (0, import_react4.useEffect)(() => {
    const loadDetail = async () => {
      if (!hasAccess) {
        onForbidden();
        return;
      }
      if (!sheetId) {
        setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet line was not found."));
        setHeader(null);
        setLine(null);
        setLineNavigation(EMPTY_LINE_NAVIGATION);
        return;
      }
      setIsLoading(true);
      setErrorMessage("");
      try {
        if (isCreateMode) {
          const response2 = await fetchExpenseSheetDetail(sheetId, {
            suppressPermissionModal: true
          });
          if (response2?.Success === false) {
            setErrorMessage(response2?.Message || indT("ExpenseSheets_LoadError", "Could not load line detail."));
            setHeader(null);
            setLine(null);
            setLineNavigation(EMPTY_LINE_NAVIGATION);
            return;
          }
          const sheets2 = Array.isArray(response2?.Items) ? response2.Items : [];
          const selectedSheet2 = sheets2.find((entry) => safeText(entry?.HojaGastosId).toUpperCase() === sheetId.trim().toUpperCase()) || sheets2[0];
          if (!selectedSheet2) {
            setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet line was not found."));
            setHeader(null);
            setLine(null);
            setLineNavigation(EMPTY_LINE_NAVIGATION);
            return;
          }
          const loadedHeader = mapExpenseSheetHeader(selectedSheet2);
          const loadedStatusCode2 = typeof loadedHeader.expenseSheetStatus === "number" ? loadedHeader.expenseSheetStatus : null;
          const isCreateLockedStatus = loadedStatusCode2 === EXPENSE_STATUS_APPROVED || loadedStatusCode2 === EXPENSE_STATUS_PAID;
          const isManagingOtherUser2 = isManagingOtherExpenseRecord({
            canManageOtherUsers,
            currentAxUserId,
            currentCrmUserId,
            selectedManagedUserId,
            recordOwnerUserId: loadedHeader.userId,
            isCreateMode: false
          });
          const loadedPolicy2 = resolveExpenseSheetDetailPolicy({
            statusCode: loadedStatusCode2,
            isManagingOtherUser: isManagingOtherUser2,
            allowSelfManagement,
            isPaid: isCreateLockedStatus || hasAssignedVoucher(loadedHeader.voucher)
          });
          if (isCreateLockedStatus || hasAssignedVoucher(loadedHeader.voucher)) {
            setErrorMessage(indT("ExpenseSheets_Detail_PaidReadOnly", "Paid expense sheets are read-only."));
            setHeader(loadedHeader);
            setLine(null);
            setLineNavigation(EMPTY_LINE_NAVIGATION);
            setIsEditing(false);
            return;
          }
          if (loadedPolicy2.interactionMode !== "full_edit") {
            onForbidden();
            return;
          }
          const draftLine = buildCreateLineDraft(
            toIsoDate(/* @__PURE__ */ new Date()),
            safeText(loadedHeader.projId),
            safeText(loadedHeader.currencyCode).toUpperCase() || "EUR"
          );
          setHeader(loadedHeader);
          setLine(draftLine);
          setLineNavigation(EMPTY_LINE_NAVIGATION);
          setIsEditing(true);
          hydrateDraftFromLine(draftLine, loadedHeader);
          setStatus("");
          return;
        }
        if (!lineId) {
          setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet line was not found."));
          setHeader(null);
          setLine(null);
          setLineNavigation(EMPTY_LINE_NAVIGATION);
          return;
        }
        const response = await fetchExpenseSheetDetail(sheetId, {
          suppressPermissionModal: true
        });
        if (response?.Success === false) {
          setErrorMessage(response?.Message || indT("ExpenseSheets_LoadError", "Could not load line detail."));
          setHeader(null);
          setLine(null);
          setLineNavigation(EMPTY_LINE_NAVIGATION);
          return;
        }
        const sheets = Array.isArray(response?.Items) ? response.Items : [];
        const selectedSheet = sheets.find((entry) => safeText(entry?.HojaGastosId).toUpperCase() === sheetId.trim().toUpperCase()) || sheets[0];
        if (!selectedSheet) {
          setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet line was not found."));
          setHeader(null);
          setLine(null);
          setLineNavigation(EMPTY_LINE_NAVIGATION);
          return;
        }
        const mappedHeader = mapExpenseSheetHeader(selectedSheet);
        const mappedLines = (Array.isArray(selectedSheet.Lines) ? selectedSheet.Lines : []).map(
          (entry) => mapExpenseSheetLine(entry)
        );
        const selectedLine = mappedLines.find((entry) => safeText(entry.lineRecId).toUpperCase() === lineId.trim().toUpperCase()) || null;
        if (!selectedLine) {
          setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet line was not found."));
          setHeader(mappedHeader);
          setLine(null);
          setLineNavigation(EMPTY_LINE_NAVIGATION);
          return;
        }
        setHeader(mappedHeader);
        setLine(selectedLine);
        setLineNavigation(buildLineNavigation(mappedLines, selectedLine.lineRecId));
        const loadedStatusCode = typeof mappedHeader.expenseSheetStatus === "number" ? mappedHeader.expenseSheetStatus : null;
        const loadedIsSheetApproved = loadedStatusCode === EXPENSE_STATUS_APPROVED;
        const loadedIsSheetPaidByStatus = loadedStatusCode === EXPENSE_STATUS_PAID;
        const loadedIsSheetPaid = loadedIsSheetPaidByStatus || hasAssignedVoucher(mappedHeader.voucher);
        const loadedHasLinkedTicket = !!safeText(selectedLine.fileId);
        const loadedIsManagingOtherUser = isManagingOtherExpenseRecord({
          canManageOtherUsers,
          currentAxUserId,
          currentCrmUserId,
          selectedManagedUserId,
          recordOwnerUserId: mappedHeader.userId,
          isCreateMode
        });
        const loadedPolicy = resolveExpenseSheetDetailPolicy({
          statusCode: loadedStatusCode,
          isManagingOtherUser: loadedIsManagingOtherUser,
          allowSelfManagement,
          isPaid: loadedIsSheetPaid
        });
        if (startInEditMode && !loadedIsSheetApproved && !loadedIsSheetPaid && !loadedHasLinkedTicket && !loadedIsManagingOtherUser && loadedPolicy.interactionMode === "full_edit") {
          setIsEditing(true);
          hydrateDraftFromLine(selectedLine, mappedHeader);
          setStatus("");
        }
      } catch (error) {
        if (error instanceof ApiFetchError && error.status === 403) {
          onForbidden();
          return;
        }
        setErrorMessage(error instanceof Error ? error.message : indT("ExpenseSheets_LoadError", "Could not load line detail."));
        setHeader(null);
        setLine(null);
        setLineNavigation(EMPTY_LINE_NAVIGATION);
      } finally {
        setIsLoading(false);
      }
    };
    void loadDetail();
  }, [
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    hasAccess,
    hydrateDraftFromLine,
    isCreateMode,
    startInEditMode,
    lineId,
    onForbidden,
    selectedManagedUserId,
    sheetId
  ]);
  (0, import_react4.useEffect)(() => {
    if (!line || isEditing) return;
    hydrateDraftFromLine(line, header);
  }, [header, hydrateDraftFromLine, isEditing, line]);
  const normalizedDraftTypeValueCode = (0, import_react4.useMemo)(() => safeText(draftTypeValueCode), [draftTypeValueCode]);
  const normalizedFuelTransDate = (0, import_react4.useMemo)(() => normalizeFuelTransDate(draftTransDate), [draftTransDate]);
  const isKmType = normalizedDraftTypeValueCode === KM_GASTO_TYPE_CODE;
  (0, import_react4.useEffect)(() => {
    let isCancelled = false;
    let timer = null;
    let controller = null;
    const clearPending = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (controller) {
        controller.abort();
        controller = null;
      }
    };
    if (!isEditing || !isKmType) {
      setIsFuelPriceLoading(false);
      setFuelPriceMessage("");
      setFuelPriceMessageIsError(false);
      return () => {
        clearPending();
      };
    }
    if (!normalizedFuelTransDate) {
      setIsFuelPriceLoading(false);
      setFuelPriceMessage(EXPENSE_API_DATE_FORMAT_MESSAGE);
      setFuelPriceMessageIsError(true);
      return () => {
        clearPending();
      };
    }
    timer = setTimeout(async () => {
      controller = new AbortController();
      setIsFuelPriceLoading(true);
      setFuelPriceMessage("");
      setFuelPriceMessageIsError(false);
      try {
        const response = await getFuelPriceKm(normalizedFuelTransDate, {
          suppressPermissionModal: true,
          signal: controller.signal
        });
        if (isCancelled) return;
        if (!response.Success || !response.Data || !Number.isFinite(Number(response.Data.PriceKm))) {
          setFuelPriceMessage(
            safeText(response.Message) || indT("ExpenseSheets_FuelPrice_NotFound", "Could not load fuel price for km.")
          );
          setFuelPriceMessageIsError(true);
          return;
        }
        const resolvedPrice = Number(response.Data.PriceKm);
        if (resolvedPrice > 0) {
          setDraftPrice(formatEditableNumber(resolvedPrice));
        }
        const source = safeText(response.Data.Source);
        const effectiveDate = safeText(response.Data.TransDate) || normalizedFuelTransDate;
        const message = resolveFuelPriceSourceMessage(source, effectiveDate);
        setFuelPriceMessage(message);
        setFuelPriceMessageIsError(false);
      } catch (error) {
        if (isCancelled) return;
        if (error instanceof DOMException && error.name === "AbortError") return;
        setFuelPriceMessage(
          error instanceof Error ? error.message : indT("ExpenseSheets_FuelPrice_NotFound", "Could not load fuel price for km.")
        );
        setFuelPriceMessageIsError(true);
      } finally {
        if (!isCancelled) {
          setIsFuelPriceLoading(false);
        }
      }
    }, FUEL_PRICE_DEBOUNCE_MS);
    return () => {
      isCancelled = true;
      clearPending();
    };
  }, [isEditing, isKmType, normalizedFuelTransDate]);
  const hasActiveProcess = (0, import_react4.useMemo)(() => busy || isEditing, [busy, isEditing]);
  (0, import_react4.useEffect)(() => {
    setExpenseNavigationGuard(hasActiveProcess);
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [hasActiveProcess]);
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
    if (!header) {
      return {
        interactionMode: "read_only",
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
  }, [allowSelfManagement, header, isManagingOtherUser, isSheetPaid, statusCode]);
  const canUseFullEditFeatures = detailPolicy.interactionMode === "full_edit";
  const canCreateExpenseCurrent = canUseFullEditFeatures;
  const canEditExpenseCurrent = canUseFullEditFeatures;
  const canDeleteExpenseCurrent = canUseFullEditFeatures;
  const isSheetLocked = !canUseFullEditFeatures || isSheetApproved || isSheetPaid;
  const linkedTicketFileId = safeText(line?.fileId);
  const hasLinkedTicket = !isCreateMode && !!linkedTicketFileId;
  const isLineEditLocked = isSheetLocked || hasLinkedTicket;
  const isLineDeleteLocked = isSheetLocked;
  const isLineLocked = isLineEditLocked;
  const handleEnableEdit = (0, import_react4.useCallback)(() => {
    if (isCreateMode || isLoading || !header || !line || isLineEditLocked) {
      return;
    }
    if (!canEditExpenseCurrent) {
      onForbidden();
      return;
    }
    setModalError("");
    setIsEditing(true);
    hydrateDraftFromLine(line, header);
    setStatus(indT("ExpenseSheets_Detail_EditingEnabled", "Editing enabled"));
  }, [canEditExpenseCurrent, header, hydrateDraftFromLine, isCreateMode, isLineEditLocked, isLoading, line, onForbidden]);
  const handleCancelEdit = (0, import_react4.useCallback)(() => {
    const targetUrl = `/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(sheetId)}`;
    if (isCreateMode) {
      navigateToExpenseUrl(targetUrl, {
        askConfirmation: true
      });
      return;
    }
    if (!isEditing) return;
    setIsEditing(false);
    setModalError("");
    hydrateDraftFromLine(line, header);
    setStatus(indT("Common_Cancel", "Cancel"));
  }, [header, hydrateDraftFromLine, isCreateMode, isEditing, line, sheetId]);
  const handleOpenCreateMode = (0, import_react4.useCallback)(() => {
    if (!canCreateExpenseCurrent || !sheetId || isSheetLocked) {
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
  }, [canCreateExpenseCurrent, isCreateMode, isEditing, isSheetLocked, onForbidden, sheetId]);
  const navigateToSheetDetail = (0, import_react4.useCallback)(() => {
    const safeSheetId = safeText(sheetId);
    if (!safeSheetId) return;
    const targetUrl = `/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(safeSheetId)}`;
    navigateToExpenseUrl(targetUrl);
  }, [sheetId]);
  const navigateToLineDetail = (0, import_react4.useCallback)(
    (targetLineId) => {
      const safeSheetId = safeText(sheetId);
      const safeLineId = safeText(targetLineId);
      if (isCreateMode || !safeSheetId || !safeLineId) return;
      const query = new URLSearchParams({
        hojaGastosId: safeSheetId,
        lineRecId: safeLineId
      });
      navigateToExpenseUrl(`/Gastos/ExpenseSheetLineDetail?${query.toString()}`, {
        askConfirmation: isEditing
      });
    },
    [isCreateMode, isEditing, sheetId]
  );
  return {
    header,
    line,
    lineNavigation,
    isLoading,
    errorMessage,
    busy,
    status,
    isEditing,
    modalError,
    draftDescription,
    draftTransDate,
    draftTypeValueCode,
    draftPrice,
    draftQty,
    draftProjectId,
    draftInternational,
    draftReimbursableExpense,
    draftCurrencyCode,
    draftAmountMST,
    draftExchangeRate,
    isKmType,
    isFuelPriceLoading,
    fuelPriceMessage,
    fuelPriceMessageIsError,
    isSheetPaid,
    isSheetLocked,
    isLineEditLocked,
    isLineDeleteLocked,
    isLineLocked,
    hasLinkedTicket,
    linkedTicketFileId,
    canCreateExpenseCurrent,
    canEditExpenseCurrent,
    canDeleteExpenseCurrent,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setDraftDescription,
    setDraftTransDate,
    setDraftTypeValueCode,
    setDraftPrice,
    setDraftQty,
    setDraftProjectId,
    setDraftInternational,
    setDraftReimbursableExpense,
    setDraftCurrencyCode,
    setDraftAmountMST,
    setDraftExchangeRate,
    handleEnableEdit,
    handleCancelEdit,
    handleOpenCreateMode,
    navigateToSheetDetail,
    navigateToLineDetail
  };
};

// Web/wwwroot/react/src/pages/gastos/line/useExpenseSheetLineTicketPreview.ts
var import_react5 = __toESM(require_react());
var resolveLinkedTicketPreviewMetadata = (items, linkedTicketFileId) => {
  const safeLinkedTicketFileId = safeText(linkedTicketFileId);
  if (!safeLinkedTicketFileId || !Array.isArray(items) || items.length === 0) {
    return {
      fileName: "",
      sourceUrl: ""
    };
  }
  const selectedItem = items.find((entry) => safeText(entry?.FileId).toUpperCase() === safeLinkedTicketFileId.toUpperCase()) || items[0];
  if (!selectedItem || typeof selectedItem !== "object") {
    return {
      fileName: "",
      sourceUrl: ""
    };
  }
  const mappedHeader = mapExpenseTicketDetailHeader(selectedItem);
  return {
    fileName: safeText(mappedHeader.fileName),
    sourceUrl: safeText(mappedHeader.urlFile)
  };
};
var useExpenseSheetLineTicketPreview = ({
  linkedTicketFileId,
  hasLinkedTicket
}) => {
  const [previewSourceUrl, setPreviewSourceUrl] = (0, import_react5.useState)("");
  const [previewFileName, setPreviewFileName] = (0, import_react5.useState)("");
  (0, import_react5.useEffect)(() => {
    if (!hasLinkedTicket || !safeText(linkedTicketFileId)) {
      setPreviewSourceUrl("");
      setPreviewFileName("");
      return;
    }
    let cancelled = false;
    const controller = new AbortController();
    const loadTicketPreviewMetadata = async () => {
      setPreviewSourceUrl("");
      setPreviewFileName("");
      try {
        const response = await fetchExpenseSheetTicket(linkedTicketFileId, {
          suppressPermissionModal: true,
          signal: controller.signal
        });
        if (cancelled) {
          return;
        }
        if (response?.Success === false) {
          return;
        }
        const metadata = resolveLinkedTicketPreviewMetadata(response?.Items || [], linkedTicketFileId);
        setPreviewSourceUrl(metadata.sourceUrl);
        setPreviewFileName(metadata.fileName);
      } catch (error) {
        if (cancelled || error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    };
    void loadTicketPreviewMetadata();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [hasLinkedTicket, linkedTicketFileId]);
  const showStickyPreview = (0, import_react5.useMemo)(
    () => hasLinkedTicket && hasExpenseTicketImagePreviewSource(previewSourceUrl),
    [hasLinkedTicket, previewSourceUrl]
  );
  const previewAltText = (0, import_react5.useMemo)(
    () => safeText(previewFileName) || indT("Tickets_Field_FileId", "Ticket"),
    [previewFileName]
  );
  const preview = useExpenseTicketImagePreview({
    fileId: linkedTicketFileId,
    sourceUrl: previewSourceUrl,
    enabled: showStickyPreview
  });
  return {
    showStickyPreview,
    previewFileName,
    previewAltText,
    ...preview
  };
};

// Web/wwwroot/react/src/components/commons/PageBottomFixedContent.tsx
var import_react_dom = __toESM(require_react_dom());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var PAGE_BOTTOM_FIXED_CONTENT_TOP_PADDING_PX = 12;
var PAGE_BOTTOM_FIXED_CONTENT_COMPACT_TOP_PADDING_PX = 4;
var PAGE_BOTTOM_FIXED_CONTENT_SIDE_PADDING_PX = 8;
var PAGE_BOTTOM_FIXED_CONTENT_BOTTOM_PADDING = "calc(0.75rem + env(safe-area-inset-bottom, 0px))";
var PAGE_BOTTOM_FIXED_CONTENT_COMPACT_BOTTOM_PADDING = "calc(0.35rem + env(safe-area-inset-bottom, 0px))";
var PageBottomFixedContent = ({
  children,
  variant = "standard",
  className,
  innerClassName
}) => {
  const { reservedHeight, wrapperRef, contentInsets } = usePageBottomActionsVisibility();
  const portalTarget = typeof document === "undefined" ? null : document.body;
  const isCompact = variant === "compact";
  const topPaddingPx = isCompact ? PAGE_BOTTOM_FIXED_CONTENT_COMPACT_TOP_PADDING_PX : PAGE_BOTTOM_FIXED_CONTENT_TOP_PADDING_PX;
  const bottomPadding = isCompact ? PAGE_BOTTOM_FIXED_CONTENT_COMPACT_BOTTOM_PADDING : PAGE_BOTTOM_FIXED_CONTENT_BOTTOM_PADDING;
  if (!children) {
    return null;
  }
  const fixedContent = /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "div",
    {
      ref: wrapperRef,
      className: classNames(
        "fixed inset-x-0 bottom-0 z-1900 border-t border-slate-200/90 bg-white shadow-[0_-10px_28px_rgba(15,23,42,0.12)]",
        className || ""
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "div",
        {
          className: "w-full",
          style: {
            paddingTop: `${topPaddingPx}px`,
            paddingLeft: `${contentInsets?.left ?? PAGE_BOTTOM_FIXED_CONTENT_SIDE_PADDING_PX}px`,
            paddingRight: `${contentInsets?.right ?? PAGE_BOTTOM_FIXED_CONTENT_SIDE_PADDING_PX}px`,
            paddingBottom: bottomPadding
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: classNames("pointer-events-auto w-full", innerClassName || ""), children })
        }
      )
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { "aria-hidden": "true", style: { height: `${reservedHeight}px` } }),
    portalTarget ? (0, import_react_dom.createPortal)(fixedContent, portalTarget) : null
  ] });
};
var PageBottomFixedContent_default = PageBottomFixedContent;

// Web/wwwroot/react/src/pages/gastos/line/ExpenseSheetLineDetailView.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var ExpenseSheetLineDetailView = ({ modal, preview, content }) => {
  const showLineNavigator = Boolean(content.detailBody && content.lineNavigator);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      ConfirmModal,
      {
        open: modal.open,
        title: modal.title,
        message: modal.message,
        confirmText: modal.confirmText,
        cancelText: modal.cancelText,
        loadingText: modal.loadingText,
        showCancel: modal.showCancel,
        showConfirm: modal.showConfirm,
        busy: modal.busy,
        error: modal.error,
        status: modal.status,
        onConfirm: modal.onConfirm,
        onCancel: modal.onCancel
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      ExpenseTicketPreviewModal_default,
      {
        open: preview.open,
        busy: preview.busy,
        error: preview.error,
        imageUrl: preview.imageUrl,
        imageAlt: preview.imageAlt,
        scale: preview.scale,
        translate: preview.translate,
        surfaceRef: preview.surfaceRef,
        onClose: preview.onClose,
        onPointerDown: preview.onPointerDown,
        onPointerMove: preview.onPointerMove,
        onPointerEnd: preview.onPointerEnd
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "div",
      {
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: content.isLoading || content.isRedirectingAfterCreate ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    content.errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-danger", children: content.errorMessage }) : null,
    content.detailBody ? preview.showStickyPreview ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "min-w-0 max-w-full space-y-2 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-4 lg:space-y-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "min-w-0 max-w-full lg:col-start-2", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ExpenseTicketStickyPreview_default,
        {
          busy: preview.busy,
          error: preview.error,
          imageUrl: preview.imageUrl,
          imageAlt: preview.imageAlt,
          fileName: preview.fileName,
          onOpen: preview.onOpen
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "min-w-0 space-y-2 lg:col-start-1 lg:row-start-1", children: content.detailBody })
    ] }) : content.detailBody : null,
    showLineNavigator ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(PageBottomFixedContent_default, { variant: "compact", children: content.lineNavigator }) : null
  ] });
};
var ExpenseSheetLineDetailView_default = ExpenseSheetLineDetailView;

// Web/wwwroot/react/src/pages/gastos/line/useExpenseSheetLineTypeValidation.ts
var import_react6 = __toESM(require_react());
var useExpenseSheetLineTypeValidation = ({
  draftDescription,
  draftTypeValueCode,
  draftPrice,
  draftQty,
  setDraftDescription,
  setDraftTypeValueCode,
  setDraftPrice,
  setDraftQty
}) => {
  const [descriptionInvalid, setDescriptionInvalid] = (0, import_react6.useState)(false);
  const [typeInvalid, setTypeInvalid] = (0, import_react6.useState)(false);
  const [priceInvalid, setPriceInvalid] = (0, import_react6.useState)(false);
  const [qtyInvalid, setQtyInvalid] = (0, import_react6.useState)(false);
  const descriptionInputRef = (0, import_react6.useRef)(null);
  const typeInputRef = (0, import_react6.useRef)(null);
  const priceInputRef = (0, import_react6.useRef)(null);
  const qtyInputRef = (0, import_react6.useRef)(null);
  const focusDescriptionField = (0, import_react6.useCallback)(() => {
    setDescriptionInvalid(true);
    window.requestAnimationFrame(() => {
      descriptionInputRef.current?.focus();
    });
  }, []);
  const focusTypeField = (0, import_react6.useCallback)(() => {
    setTypeInvalid(true);
    window.requestAnimationFrame(() => {
      typeInputRef.current?.focus();
    });
  }, []);
  const focusAmountFields = (0, import_react6.useCallback)(() => {
    const parsedQty = parseDecimalInput(draftQty);
    const parsedPrice = parseDecimalInput(draftPrice);
    const qtyIsValid = parsedQty != null && parsedQty > 0;
    const priceIsValid = parsedPrice != null && parsedPrice > 0;
    setQtyInvalid(!qtyIsValid);
    setPriceInvalid(!priceIsValid);
    window.requestAnimationFrame(() => {
      if (!qtyIsValid) {
        qtyInputRef.current?.focus();
        return;
      }
      if (!priceIsValid) {
        priceInputRef.current?.focus();
      }
    });
  }, [draftPrice, draftQty]);
  const handleDraftDescriptionChange = (0, import_react6.useCallback)(
    (value) => {
      setDescriptionInvalid(false);
      setDraftDescription(value);
    },
    [setDraftDescription]
  );
  const handleDraftTypeValueCodeChange = (0, import_react6.useCallback)(
    (value) => {
      setTypeInvalid(false);
      setDraftTypeValueCode(value);
    },
    [setDraftTypeValueCode]
  );
  const handleDraftPriceChange = (0, import_react6.useCallback)(
    (value) => {
      setPriceInvalid(false);
      setDraftPrice(value);
    },
    [setDraftPrice]
  );
  const handleDraftQtyChange = (0, import_react6.useCallback)(
    (value) => {
      setQtyInvalid(false);
      setDraftQty(value);
    },
    [setDraftQty]
  );
  (0, import_react6.useEffect)(() => {
    if (String(draftDescription || "").trim()) {
      setDescriptionInvalid(false);
    }
  }, [draftDescription]);
  (0, import_react6.useEffect)(() => {
    const parsedPrice = parseDecimalInput(draftPrice);
    if (parsedPrice != null && parsedPrice > 0) {
      setPriceInvalid(false);
    }
  }, [draftPrice]);
  (0, import_react6.useEffect)(() => {
    const parsedQty = parseDecimalInput(draftQty);
    if (parsedQty != null && parsedQty > 0) {
      setQtyInvalid(false);
    }
  }, [draftQty]);
  const canOpenSaveConfirm = (0, import_react6.useCallback)(() => {
    if (!String(draftDescription || "").trim()) {
      focusDescriptionField();
      return false;
    }
    if (toExpenseGastoTypeCode(draftTypeValueCode, { allowNone: false }) === null) {
      focusTypeField();
      return false;
    }
    const parsedPrice = parseDecimalInput(draftPrice);
    const parsedQty = parseDecimalInput(draftQty);
    const hasValidQtyPrice = parsedQty != null && parsedQty > 0 && parsedPrice != null && parsedPrice > 0;
    if (hasValidQtyPrice) {
      return true;
    }
    focusAmountFields();
    return false;
  }, [draftDescription, draftPrice, draftQty, draftTypeValueCode, focusAmountFields, focusDescriptionField, focusTypeField]);
  return {
    descriptionInvalid,
    typeInvalid,
    priceInvalid,
    qtyInvalid,
    descriptionInputRef,
    typeInputRef,
    priceInputRef,
    qtyInputRef,
    focusDescriptionField,
    focusTypeField,
    focusAmountFields,
    handleDraftDescriptionChange,
    handleDraftTypeValueCodeChange,
    handleDraftPriceChange,
    handleDraftQtyChange,
    canOpenSaveConfirm
  };
};

// Web/wwwroot/react/src/pages/gastos/line/ExpenseSheetLineDetailPage.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var LINKED_TICKET_LINES_PAGE_SIZE = 6;
var pagedSlice = (items, page, pageSize) => {
  if (!items.length) return [];
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
};
var bootstrapExpenseApiAuth = () => {
  configureExpenseApiAuth({
    token: safeText(window.__IND_API_TOKEN__),
    entraOid: safeText(window.__IND_ENTRA_OID__),
    appCode: safeText(window.__IND_APP_CODE__)
  });
};
var consumeLineEditModeQuery = () => {
  if (typeof window === "undefined") {
    return;
  }
  const currentUrl = new URL(window.location.href);
  if (safeText(currentUrl.searchParams.get("mode")).toLowerCase() !== "edit") {
    return;
  }
  currentUrl.searchParams.delete("mode");
  const nextUrl = `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`;
  window.history.replaceState(window.history.state, "", nextUrl);
};
var ExpenseSheetLineDetailContent = () => {
  const {
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    managementBootstrapReady
  } = useAuthContext();
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const canViewLinkedTicketLines = canAccess("GASTOS_TICKETS", "View");
  const sheetId = safeText(window.__EXPENSE_SHEET_ID__);
  const lineId = safeText(window.__EXPENSE_LINE_ID__);
  const lineMode = safeText(window.__EXPENSE_LINE_MODE__).toLowerCase();
  const isCreateMode = lineMode === "create";
  const startInEditMode = lineMode === "edit";
  const [isRedirectingAfterCreate, setIsRedirectingAfterCreate] = (0, import_react7.useState)(false);
  const [linkedTicketLinePaging, setLinkedTicketLinePaging] = (0, import_react7.useState)({ fileId: "", page: 1 });
  const exchangeRateRequestIdRef = (0, import_react7.useRef)(0);
  const amountCurrencyManualEditRef = (0, import_react7.useRef)(false);
  const amountMSTManualEditRef = (0, import_react7.useRef)(false);
  const linkedTicketLineContainerRef = (0, import_react7.useRef)(null);
  const [exchangeRateInfoMessage, setExchangeRateInfoMessage] = (0, import_react7.useState)("");
  (0, import_react7.useEffect)(() => {
    if (!startInEditMode) {
      return;
    }
    consumeLineEditModeQuery();
  }, [startInEditMode]);
  const {
    header,
    line,
    isLoading,
    errorMessage,
    lineNavigation,
    busy,
    status,
    isEditing,
    modalError,
    draftDescription,
    draftTransDate,
    draftTypeValueCode,
    draftPrice,
    draftQty,
    draftProjectId,
    draftInternational,
    draftReimbursableExpense,
    draftCurrencyCode,
    draftAmountMST,
    draftExchangeRate,
    isKmType,
    isFuelPriceLoading,
    fuelPriceMessage,
    fuelPriceMessageIsError,
    isSheetLocked,
    isLineEditLocked,
    isLineDeleteLocked,
    hasLinkedTicket,
    linkedTicketFileId,
    canCreateExpenseCurrent,
    canEditExpenseCurrent,
    canDeleteExpenseCurrent,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setDraftDescription,
    setDraftTransDate,
    setDraftTypeValueCode,
    setDraftPrice,
    setDraftQty,
    setDraftProjectId,
    setDraftInternational,
    setDraftReimbursableExpense,
    setDraftCurrencyCode,
    setDraftAmountMST,
    setDraftExchangeRate,
    handleEnableEdit,
    handleCancelEdit,
    navigateToSheetDetail,
    navigateToLineDetail
  } = useExpenseSheetLineDetailState({
    hasAccess,
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    sheetId,
    lineId,
    isCreateMode,
    startInEditMode,
    onForbidden: showPermissionModal
  });
  const {
    descriptionInvalid,
    typeInvalid,
    priceInvalid,
    qtyInvalid,
    descriptionInputRef,
    typeInputRef,
    priceInputRef,
    qtyInputRef,
    focusDescriptionField,
    focusTypeField,
    focusAmountFields,
    handleDraftDescriptionChange,
    handleDraftTypeValueCodeChange,
    handleDraftPriceChange,
    handleDraftQtyChange,
    canOpenSaveConfirm
  } = useExpenseSheetLineTypeValidation({
    draftDescription,
    draftTypeValueCode,
    draftPrice,
    draftQty,
    setDraftDescription,
    setDraftTypeValueCode,
    setDraftPrice,
    setDraftQty
  });
  const formatLineMoneyInput = (0, import_react7.useCallback)((value) => {
    return formatExpenseInputNumber(value, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
      fallback: ""
    });
  }, []);
  const formatLineExchangeRateInput = (0, import_react7.useCallback)((value) => {
    return formatExpenseInputNumber(value, {
      minimumFractionDigits: 7,
      maximumFractionDigits: 7,
      useGrouping: true,
      fallback: ""
    });
  }, []);
  const localCurrencyCode = normalizeExpenseLineCurrencyCode(header?.currencyCode) || "EUR";
  const effectiveLineCurrencyCode = normalizeExpenseLineCurrencyCode(isEditing ? draftCurrencyCode : line?.currencyCode) || localCurrencyCode;
  const draftPriceValue = parseDecimalInput(draftPrice);
  const draftQtyValue = parseDecimalInput(draftQty);
  const calculatedAmountPreview = isEditing && draftPriceValue != null && draftPriceValue > 0 && draftQtyValue != null && draftQtyValue > 0 ? draftPriceValue * draftQtyValue : line?.amount ?? null;
  const [draftAmountCurrency, setDraftAmountCurrency] = (0, import_react7.useState)("");
  const priceText = (0, import_react7.useMemo)(
    () => formatAmountWithCurrency(line?.price ?? null, effectiveLineCurrencyCode),
    [effectiveLineCurrencyCode, line?.price]
  );
  const amountText = (0, import_react7.useMemo)(
    () => formatAmountWithCurrency(calculatedAmountPreview, effectiveLineCurrencyCode),
    [calculatedAmountPreview, effectiveLineCurrencyCode]
  );
  const displayAmountMST = isExpenseLineSameReimbursementCurrency(effectiveLineCurrencyCode, localCurrencyCode) ? line?.visibleReimbursableTotal ?? line?.amountMST ?? line?.amount ?? null : line?.visibleReimbursableTotal ?? line?.amountMST ?? null;
  const amountMSTText = (0, import_react7.useMemo)(
    () => formatAmountWithCurrency(displayAmountMST, localCurrencyCode),
    [displayAmountMST, localCurrencyCode]
  );
  const projectValue = safeText(line?.projId || header?.projId);
  const sheetDescription = safeText(header?.description) || "-";
  const internacionalLabel = getExpenseInternationalLabel(line?.internacional);
  const linkedTicketFileIdValue = safeText(linkedTicketFileId);
  const showLinkedTicketLines = hasLinkedTicket && !!linkedTicketFileIdValue && canViewLinkedTicketLines;
  (0, import_react7.useEffect)(() => {
    if (!isEditing) {
      amountCurrencyManualEditRef.current = false;
      amountMSTManualEditRef.current = false;
      setDraftAmountCurrency("");
      return;
    }
    if (amountCurrencyManualEditRef.current) {
      return;
    }
    setDraftAmountCurrency(formatLineMoneyInput(calculatedAmountPreview));
  }, [calculatedAmountPreview, formatLineMoneyInput, isEditing, line?.lineRecId]);
  (0, import_react7.useEffect)(() => {
    amountMSTManualEditRef.current = false;
  }, [isEditing, line?.lineRecId]);
  const linkedTicketDetail = useExpenseTicketDetailState({
    enabled: showLinkedTicketLines,
    hasAccess: canViewLinkedTicketLines,
    fileId: linkedTicketFileIdValue,
    onForbidden: showPermissionModal
  });
  const totalLinkedTicketLinePages = Math.ceil((linkedTicketDetail.lines.length || 0) / LINKED_TICKET_LINES_PAGE_SIZE);
  const requestedLinkedTicketLinePage = linkedTicketLinePaging.fileId === linkedTicketFileIdValue ? linkedTicketLinePaging.page : 1;
  const linkedTicketLinePage = totalLinkedTicketLinePages > 0 ? Math.min(Math.max(1, requestedLinkedTicketLinePage), totalLinkedTicketLinePages) : 1;
  const visibleLinkedTicketLines = (0, import_react7.useMemo)(
    () => pagedSlice(linkedTicketDetail.lines, linkedTicketLinePage, LINKED_TICKET_LINES_PAGE_SIZE),
    [linkedTicketDetail.lines, linkedTicketLinePage]
  );
  const linkedTicketLinePaginationLabels = (0, import_react7.useMemo)(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last")
    }),
    []
  );
  const handleLinkedTicketLinePageChange = (0, import_react7.useCallback)(
    (page) => {
      setLinkedTicketLinePaging({
        fileId: linkedTicketFileIdValue,
        page
      });
    },
    [linkedTicketFileIdValue]
  );
  const linkedTicketReturnContext = (0, import_react7.useMemo)(() => {
    const safeFileId = linkedTicketFileIdValue;
    const safeSheetId = safeText(sheetId);
    const safeLineId = safeText(lineId || line?.lineRecId);
    if (!safeFileId || !safeSheetId || !safeLineId) return null;
    return {
      fileId: safeFileId,
      origin: "expense-line",
      sheetId: safeSheetId,
      sheetLineRecId: safeLineId
    };
  }, [line?.lineRecId, lineId, linkedTicketFileIdValue, sheetId]);
  const resolveLinkedTicketLineCard = (0, import_react7.useCallback)(
    (target) => {
      const node = target;
      if (!node || typeof node.closest !== "function") return null;
      const card = node.closest(".timeline-card--clickable");
      if (!card) return null;
      if (!linkedTicketLineContainerRef.current?.contains(card)) return null;
      return card;
    },
    []
  );
  useTimelineCardEffects({
    containerRef: linkedTicketLineContainerRef,
    errorMessage: linkedTicketDetail.errorMessage,
    items: visibleLinkedTicketLines,
    resolveClickableCard: resolveLinkedTicketLineCard
  });
  const {
    showStickyPreview,
    previewOpen,
    previewBusy,
    previewError,
    previewImageUrl,
    previewScale,
    previewTranslate,
    previewSurfaceRef,
    previewFileName,
    previewAltText,
    openPreview,
    closePreview,
    handlePreviewPointerDown,
    handlePreviewPointerMove,
    handlePreviewPointerEnd
  } = useExpenseSheetLineTicketPreview({
    linkedTicketFileId,
    hasLinkedTicket
  });
  const gastoTypeOptions = (0, import_react7.useMemo)(() => {
    const mapped = getExpenseGastoTypeOptions();
    const currentTypeCode = safeText(line?.typeValueCode);
    const currentTypeLabel = safeText(line?.typeValue);
    if (currentTypeCode && !mapped.some((item) => item.value === currentTypeCode)) {
      mapped.push({
        value: currentTypeCode,
        text: currentTypeLabel || currentTypeCode
      });
    }
    return mapped;
  }, [line?.typeValue, line?.typeValueCode]);
  const internationalOptions = (0, import_react7.useMemo)(
    () => mapBooleanEnumOptions(getExpenseInternationalOptions()),
    []
  );
  const localExchangeRateInput = (0, import_react7.useMemo)(() => formatLineExchangeRateInput(100), [formatLineExchangeRateInput]);
  const isDraftCurrencyLocal = (0, import_react7.useMemo)(() => {
    const normalizedDraftCurrencyCode = normalizeExpenseLineCurrencyCode(draftCurrencyCode);
    return isExpenseLineSameReimbursementCurrency(normalizedDraftCurrencyCode, localCurrencyCode);
  }, [draftCurrencyCode, localCurrencyCode]);
  const resolveExchangeRateForLineCalculation = (0, import_react7.useCallback)(
    (exchangeRateRaw) => {
      if (isDraftCurrencyLocal) {
        if (exchangeRateRaw !== localExchangeRateInput) {
          setDraftExchangeRate(localExchangeRateInput);
        }
        return localExchangeRateInput;
      }
      return exchangeRateRaw;
    },
    [isDraftCurrencyLocal, localExchangeRateInput, setDraftExchangeRate]
  );
  const resolveDraftLineAmount = (0, import_react7.useCallback)(
    (priceRaw, qtyRaw) => {
      const nextPrice = parseDecimalInput(priceRaw);
      const nextQty = parseDecimalInput(qtyRaw);
      if (nextPrice == null || nextPrice <= 0 || nextQty == null || nextQty <= 0) {
        return null;
      }
      return nextPrice * nextQty;
    },
    []
  );
  const recalculateAmountMSTFromRate = (0, import_react7.useCallback)(
    (priceRaw, qtyRaw, exchangeRateRaw, currencyCodeOverride) => {
      const amount = resolveDraftLineAmount(priceRaw, qtyRaw);
      const normalizedCurrencyCode = currencyCodeOverride ? normalizeExpenseLineCurrencyCode(currencyCodeOverride) : normalizeExpenseLineCurrencyCode(draftCurrencyCode);
      if (amountMSTManualEditRef.current && isExpenseLineSameReimbursementCurrency(normalizedCurrencyCode, localCurrencyCode)) {
        return;
      }
      const exchangeRate = resolveExpenseLineExchangeRateForCurrency(
        normalizedCurrencyCode,
        localCurrencyCode,
        parseDecimalInput(exchangeRateRaw)
      );
      const nextAmountMST = amount != null ? calculateExpenseLineAmountMSTForCurrency(amount, exchangeRate, normalizedCurrencyCode, localCurrencyCode) : null;
      if (nextAmountMST != null) {
        setDraftAmountMST(formatLineMoneyInput(nextAmountMST));
      }
    },
    [draftCurrencyCode, formatLineMoneyInput, localCurrencyCode, resolveDraftLineAmount, setDraftAmountMST]
  );
  const loadOfficialLineExchangeRate = (0, import_react7.useCallback)(
    async (currencyCode, transDate) => {
      const nextCurrencyCode = normalizeExpenseLineCurrencyCode(currencyCode);
      if (!nextCurrencyCode || !localCurrencyCode) {
        setExchangeRateInfoMessage("");
        return;
      }
      const requestId = exchangeRateRequestIdRef.current + 1;
      exchangeRateRequestIdRef.current = requestId;
      try {
        const officialExchangeRate = await fetchExpenseOfficialExchangeRate({
          localCurrencyCode,
          expenseCurrencyCode: nextCurrencyCode,
          date: transDate
        });
        if (requestId !== exchangeRateRequestIdRef.current || !officialExchangeRate) {
          return;
        }
        const nextExchangeRate = formatExpenseExchangeRateInputValue(officialExchangeRate.exchangeRate);
        setDraftExchangeRate(nextExchangeRate);
        recalculateAmountMSTFromRate(draftPrice, draftQty, nextExchangeRate, nextCurrencyCode);
        setExchangeRateInfoMessage(
          buildExpenseExchangeRateInfoMessage({
            rawRate: officialExchangeRate.rawRate,
            date: officialExchangeRate.date,
            source: officialExchangeRate.source
          })
        );
      } catch (error) {
        if (requestId !== exchangeRateRequestIdRef.current) {
          return;
        }
        const message = error instanceof Error && safeText(error.message) ? safeText(error.message) : indT("ExpenseSheets_ExchangeRate_Unavailable", "No se pudo obtener el tipo de cambio.");
        setExchangeRateInfoMessage(message);
      }
    },
    [draftPrice, draftQty, localCurrencyCode, recalculateAmountMSTFromRate, setDraftExchangeRate]
  );
  const handleLinePriceChange = (0, import_react7.useCallback)(
    (value) => {
      amountCurrencyManualEditRef.current = false;
      handleDraftPriceChange(value);
      const nextAmount = resolveDraftLineAmount(value, draftQty);
      setDraftAmountCurrency(nextAmount != null ? formatLineMoneyInput(nextAmount) : "");
      const effectiveExchangeRate = resolveExchangeRateForLineCalculation(draftExchangeRate);
      recalculateAmountMSTFromRate(value, draftQty, effectiveExchangeRate);
    },
    [
      draftExchangeRate,
      draftQty,
      formatLineMoneyInput,
      handleDraftPriceChange,
      recalculateAmountMSTFromRate,
      resolveDraftLineAmount,
      resolveExchangeRateForLineCalculation
    ]
  );
  const handleLineQtyChange = (0, import_react7.useCallback)(
    (value) => {
      amountCurrencyManualEditRef.current = false;
      handleDraftQtyChange(value);
      const nextAmount = resolveDraftLineAmount(draftPrice, value);
      setDraftAmountCurrency(nextAmount != null ? formatLineMoneyInput(nextAmount) : "");
      const effectiveExchangeRate = resolveExchangeRateForLineCalculation(draftExchangeRate);
      recalculateAmountMSTFromRate(draftPrice, value, effectiveExchangeRate);
    },
    [
      draftExchangeRate,
      draftPrice,
      formatLineMoneyInput,
      handleDraftQtyChange,
      recalculateAmountMSTFromRate,
      resolveDraftLineAmount,
      resolveExchangeRateForLineCalculation
    ]
  );
  const handleLineAmountCurrencyChange = (0, import_react7.useCallback)(
    (value) => {
      amountCurrencyManualEditRef.current = true;
      setDraftAmountCurrency(value);
      const amount = parseDecimalInput(value);
      const qty = parseDecimalInput(draftQty);
      if (amount == null || amount <= 0 || qty == null || qty <= 0) {
        return;
      }
      handleDraftPriceChange(formatLineMoneyInput(amount / qty));
      const effectiveExchangeRate = resolveExchangeRateForLineCalculation(draftExchangeRate);
      const exchangeRate = resolveExpenseLineExchangeRateForCurrency(
        draftCurrencyCode,
        localCurrencyCode,
        parseDecimalInput(effectiveExchangeRate)
      );
      const sameReimbursementCurrency = isExpenseLineSameReimbursementCurrency(draftCurrencyCode, localCurrencyCode);
      if (sameReimbursementCurrency && amountMSTManualEditRef.current) {
        return;
      }
      const nextAmountMST = calculateExpenseLineAmountMSTForCurrency(
        amount,
        exchangeRate,
        draftCurrencyCode,
        localCurrencyCode
      );
      if (nextAmountMST != null) {
        setDraftAmountMST(formatLineMoneyInput(nextAmountMST));
      }
    },
    [
      draftExchangeRate,
      draftCurrencyCode,
      draftQty,
      formatLineMoneyInput,
      handleDraftPriceChange,
      localCurrencyCode,
      resolveExchangeRateForLineCalculation,
      setDraftAmountMST
    ]
  );
  const handleLineCurrencyChange = (0, import_react7.useCallback)(
    (value) => {
      const nextCurrencyCode = normalizeExpenseLineCurrencyCode(value);
      amountMSTManualEditRef.current = false;
      setDraftCurrencyCode(nextCurrencyCode);
      setExchangeRateInfoMessage("");
      if (nextCurrencyCode && nextCurrencyCode === localCurrencyCode) {
        exchangeRateRequestIdRef.current += 1;
        const nextExchangeRate = formatLineExchangeRateInput(
          resolveExpenseLineExchangeRateForCurrency(nextCurrencyCode, localCurrencyCode, draftExchangeRate)
        );
        setDraftExchangeRate(nextExchangeRate);
        recalculateAmountMSTFromRate(draftPrice, draftQty, nextExchangeRate, nextCurrencyCode);
        return;
      }
      void loadOfficialLineExchangeRate(nextCurrencyCode, draftTransDate);
    },
    [
      draftPrice,
      draftQty,
      draftTransDate,
      loadOfficialLineExchangeRate,
      localCurrencyCode,
      draftExchangeRate,
      formatLineExchangeRateInput,
      recalculateAmountMSTFromRate,
      setDraftCurrencyCode,
      setDraftExchangeRate
    ]
  );
  const handleLineTransDateChange = (0, import_react7.useCallback)(
    (value) => {
      setDraftTransDate(value);
      const currentCurrencyCode = normalizeExpenseLineCurrencyCode(draftCurrencyCode);
      if (currentCurrencyCode && currentCurrencyCode !== localCurrencyCode) {
        void loadOfficialLineExchangeRate(currentCurrencyCode, value);
      }
    },
    [draftCurrencyCode, loadOfficialLineExchangeRate, localCurrencyCode, setDraftTransDate]
  );
  const handleLineExchangeRateChange = (0, import_react7.useCallback)(
    (value) => {
      setExchangeRateInfoMessage("");
      setDraftExchangeRate(value);
    },
    [setDraftExchangeRate]
  );
  const handleLineExchangeRateCommit = (0, import_react7.useCallback)(
    (value) => {
      setExchangeRateInfoMessage("");
      const effectiveExchangeRate = resolveExchangeRateForLineCalculation(value);
      setDraftExchangeRate(formatLineExchangeRateInput(effectiveExchangeRate));
      recalculateAmountMSTFromRate(draftPrice, draftQty, effectiveExchangeRate);
    },
    [
      draftPrice,
      draftQty,
      formatLineExchangeRateInput,
      recalculateAmountMSTFromRate,
      resolveExchangeRateForLineCalculation,
      setDraftExchangeRate
    ]
  );
  const handleLineAmountMSTChange = (0, import_react7.useCallback)(
    (value) => {
      if (areExpenseNumericInputsEquivalent(value, draftAmountMST)) {
        if (value !== draftAmountMST) {
          setDraftAmountMST(value);
        }
        return;
      }
      amountMSTManualEditRef.current = true;
      setExchangeRateInfoMessage("");
      setDraftAmountMST(value);
      const amount = resolveDraftLineAmount(draftPrice, draftQty);
      const amountMST = parseDecimalInput(value);
      const nextExchangeRate = amount != null && amountMST != null ? calculateExpenseLineExchangeRateForCurrency(
        amount,
        amountMST,
        draftCurrencyCode,
        localCurrencyCode,
        draftExchangeRate
      ) : isExpenseLineSameReimbursementCurrency(draftCurrencyCode, localCurrencyCode) ? resolveExpenseLineExchangeRateForCurrency(draftCurrencyCode, localCurrencyCode, draftExchangeRate) : null;
      if (nextExchangeRate != null) {
        setDraftExchangeRate(formatLineExchangeRateInput(nextExchangeRate));
      }
    },
    [
      draftAmountMST,
      draftCurrencyCode,
      draftExchangeRate,
      draftPrice,
      draftQty,
      formatLineExchangeRateInput,
      localCurrencyCode,
      resolveDraftLineAmount,
      setDraftAmountMST,
      setDraftExchangeRate
    ]
  );
  const {
    modal,
    openConfirm,
    closeConfirm,
    modalLoadingText,
    modalCancelText,
    modalConfirmText,
    handleModalButtonConfirm
  } = useExpenseSheetLineDetailConfirmDialog({
    busy,
    modalError,
    setModalError,
    setStatus
  });
  const { handleUpdate, handleDelete } = useExpenseSheetLineDetailMutations({
    busy,
    isEditing,
    isCreateMode,
    isEditLocked: isLineEditLocked,
    isDeleteLocked: isLineDeleteLocked,
    canCreateExpense: canCreateExpenseCurrent,
    canEditExpense: canEditExpenseCurrent,
    canDeleteExpense: canDeleteExpenseCurrent,
    sheetId,
    lineId,
    line,
    linkedTicketFileId,
    draftDescription,
    draftTransDate,
    draftTypeValueCode,
    draftPrice,
    draftQty,
    draftProjectId,
    draftInternational,
    draftReimbursableExpense,
    draftCurrencyCode,
    draftAmountMST,
    draftExchangeRate,
    localCurrencyCode,
    setModalError,
    setBusy,
    setStatus,
    setIsEditing,
    onInvalidDescription: focusDescriptionField,
    onInvalidType: focusTypeField,
    onInvalidAmountQty: focusAmountFields,
    onCreateSuccess: () => {
    }
  });
  const lineTopbarActionMode = !canEditExpenseCurrent && !canDeleteExpenseCurrent ? "view_only" : "default";
  const handleCancelLineEdit = (0, import_react7.useCallback)(() => {
    setExchangeRateInfoMessage("");
    handleCancelEdit();
  }, [handleCancelEdit]);
  const handleEditLinkedTicket = (0, import_react7.useCallback)(() => {
    if (!linkedTicketReturnContext) return;
    const query = new URLSearchParams({
      fileId: linkedTicketReturnContext.fileId,
      mode: "edit"
    });
    appendExpenseTicketReturnQuery(query, linkedTicketReturnContext);
    saveExpenseTicketReturnContext(linkedTicketReturnContext);
    navigateToExpenseUrl(`/Gastos/TicketDetail?${query.toString()}`, {
      askConfirmation: isEditing
    });
  }, [isEditing, linkedTicketReturnContext]);
  useExpenseSheetLineDetailTopbarActions({
    busy: busy || isRedirectingAfterCreate,
    modalOpen: modal.open,
    isEditing,
    isCreateMode,
    isLocked: isSheetLocked,
    actionMode: lineTopbarActionMode,
    permissionsReady: managementBootstrapReady,
    canCreateExpense: canCreateExpenseCurrent,
    canEditExpense: canEditExpenseCurrent,
    canDeleteExpense: canDeleteExpenseCurrent,
    sheetId,
    setModalError,
    handleEnableEdit: hasLinkedTicket ? handleEditLinkedTicket : handleEnableEdit,
    handleCancelEdit: handleCancelLineEdit,
    canOpenSaveConfirm,
    handleUpdate,
    handleDelete,
    onSaveSuccess: () => {
      if (isCreateMode) {
        setIsRedirectingAfterCreate(true);
        navigateToSheetDetail();
        return;
      }
      reloadExpensePage();
    },
    openConfirm,
    closeConfirm
  });
  const handleOpenLinkedTicket = (0, import_react7.useCallback)(() => {
    if (!linkedTicketReturnContext) return;
    const query = new URLSearchParams({
      fileId: linkedTicketReturnContext.fileId
    });
    appendExpenseTicketReturnQuery(query, linkedTicketReturnContext);
    saveExpenseTicketReturnContext(linkedTicketReturnContext);
    navigateToExpenseUrl(`/Gastos/TicketDetail?${query.toString()}`, {
      askConfirmation: isEditing
    });
  }, [isEditing, linkedTicketReturnContext]);
  const handleOpenLinkedTicketLine = (0, import_react7.useCallback)(
    (ticketLineRecId) => {
      if (!linkedTicketReturnContext) return;
      const safeTicketLineRecId = safeText(ticketLineRecId);
      if (!safeTicketLineRecId) return;
      const query = new URLSearchParams({
        fileId: linkedTicketReturnContext.fileId,
        lineRecId: safeTicketLineRecId
      });
      if (isEditing) {
        query.set("mode", "edit");
      }
      appendExpenseTicketReturnQuery(query, linkedTicketReturnContext);
      saveExpenseTicketReturnContext(linkedTicketReturnContext);
      navigateToExpenseUrl(`/Gastos/TicketLineDetail?${query.toString()}`, {
        askConfirmation: isEditing
      });
    },
    [isEditing, linkedTicketReturnContext]
  );
  const lineNavigatorLabels = (0, import_react7.useMemo)(
    () => ({
      navigation: indT("RecordNavigator_AriaLabel", "Record navigation"),
      first: indT("History_Page_First", "First"),
      previous: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last"),
      position: indFormat(
        "RecordNavigator_Position",
        "{0} of {1}",
        lineNavigation.currentIndex,
        lineNavigation.totalLines
      )
    }),
    [lineNavigation.currentIndex, lineNavigation.totalLines]
  );
  const handleNavigateFirstLine = (0, import_react7.useCallback)(() => {
    navigateToLineDetail(lineNavigation.firstLineId);
  }, [lineNavigation.firstLineId, navigateToLineDetail]);
  const handleNavigatePreviousLine = (0, import_react7.useCallback)(() => {
    navigateToLineDetail(lineNavigation.previousLineId);
  }, [lineNavigation.previousLineId, navigateToLineDetail]);
  const handleNavigateNextLine = (0, import_react7.useCallback)(() => {
    navigateToLineDetail(lineNavigation.nextLineId);
  }, [lineNavigation.nextLineId, navigateToLineDetail]);
  const handleNavigateLastLine = (0, import_react7.useCallback)(() => {
    navigateToLineDetail(lineNavigation.lastLineId);
  }, [lineNavigation.lastLineId, navigateToLineDetail]);
  const lineNavigator = !isCreateMode && line && lineNavigation.totalLines > 1 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    RecordNavigator_default,
    {
      currentIndex: lineNavigation.currentIndex,
      totalItems: lineNavigation.totalLines,
      labels: lineNavigatorLabels,
      disabled: isLoading || busy || isRedirectingAfterCreate,
      variant: "compact",
      onFirst: handleNavigateFirstLine,
      onPrevious: handleNavigatePreviousLine,
      onNext: handleNavigateNextLine,
      onLast: handleNavigateLastLine
    }
  ) : null;
  const linkedTicketLinesSection = showLinkedTicketLines ? linkedTicketDetail.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-zinc-700", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { className: "ind-spinner size-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
    indT("Common_Loading", "Loading")
  ] }) : linkedTicketDetail.errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "text-danger", children: linkedTicketDetail.errorMessage }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    ExpenseTicketLinesList_default,
    {
      visibleLines: visibleLinkedTicketLines,
      totalLinePages: totalLinkedTicketLinePages,
      linePage: linkedTicketLinePage,
      currencyCode: safeText(linkedTicketDetail.header?.currencyCode) || effectiveLineCurrencyCode,
      paginationLabels: linkedTicketLinePaginationLabels,
      containerRef: linkedTicketLineContainerRef,
      onLinePageChange: handleLinkedTicketLinePageChange,
      onOpenLine: handleOpenLinkedTicketLine
    }
  ) : null;
  const detailBody = !isLoading && !isRedirectingAfterCreate && !errorMessage && line ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      ExpenseSheetLineForm_default,
      {
        line,
        fallbackDate: safeText(header?.createdDate),
        sheetDescription,
        projectValue,
        priceText,
        amountText,
        draftAmountCurrency,
        amountMSTText,
        internacionalLabel,
        isKmType,
        isFuelPriceLoading,
        fuelPriceMessage,
        fuelPriceMessageIsError,
        isEditing,
        gastoTypeOptions,
        internationalOptions,
        draftDescription,
        draftTransDate,
        draftTypeValueCode,
        draftPrice,
        draftQty,
        draftProjectId,
        draftInternational,
        draftReimbursableExpense,
        draftCurrencyCode,
        draftAmountMST,
        draftExchangeRate,
        localCurrencyCode,
        exchangeRateInfoMessage,
        descriptionInputRef,
        typeInputRef,
        priceInputRef,
        qtyInputRef,
        descriptionInvalid,
        typeInvalid,
        priceInvalid,
        qtyInvalid,
        onDraftDescriptionChange: handleDraftDescriptionChange,
        onDraftTransDateChange: handleLineTransDateChange,
        onDraftTypeValueCodeChange: handleDraftTypeValueCodeChange,
        onDraftPriceChange: handleLinePriceChange,
        onDraftQtyChange: handleLineQtyChange,
        onDraftAmountCurrencyChange: handleLineAmountCurrencyChange,
        onDraftProjectIdChange: setDraftProjectId,
        onDraftInternationalChange: setDraftInternational,
        onDraftReimbursableExpenseChange: setDraftReimbursableExpense,
        onDraftCurrencyCodeChange: handleLineCurrencyChange,
        onDraftAmountMSTChange: handleLineAmountMSTChange,
        onDraftExchangeRateChange: handleLineExchangeRateChange,
        onDraftExchangeRateCommit: handleLineExchangeRateCommit,
        linkedTicketFileId,
        showLinkedTicketField: hasLinkedTicket,
        onOpenLinkedTicket: handleOpenLinkedTicket
      }
    ),
    linkedTicketLinesSection
  ] }) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    ExpenseSheetLineDetailView_default,
    {
      modal: {
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
        onConfirm: handleModalButtonConfirm,
        onCancel: closeConfirm
      },
      preview: {
        open: previewOpen,
        busy: previewBusy,
        error: previewError,
        imageUrl: previewImageUrl,
        imageAlt: previewAltText,
        fileName: previewFileName,
        scale: previewScale,
        translate: previewTranslate,
        surfaceRef: previewSurfaceRef,
        showStickyPreview,
        onOpen: openPreview,
        onClose: closePreview,
        onPointerDown: handlePreviewPointerDown,
        onPointerMove: handlePreviewPointerMove,
        onPointerEnd: handlePreviewPointerEnd
      },
      content: {
        isLoading,
        isRedirectingAfterCreate,
        errorMessage,
        lineNavigator,
        detailBody
      }
    }
  );
};
var ExpenseSheetLineDetailPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(VisitasPageProviders_default, { enableExpenseManagement: true, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ExpenseSheetLineDetailContent, {}) });
};
var mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-line-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ExpenseSheetLineDetailPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseSheetLineDetailPage_default = ExpenseSheetLineDetailPage;
export {
  ExpenseSheetLineDetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL0V4cGVuc2VTaGVldExpbmVEZXRhaWxQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1JlY29yZE5hdmlnYXRvci50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldExpbmVGb3JtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbnN0YW50cy9pbnRlcm5hdGlvbmFsT3B0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpbmUvdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpbmUvdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxDb25maXJtRGlhbG9nLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGluZS91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL3VzZUV4cGVuc2VTaGVldExpbmVUaWNrZXRQcmV2aWV3LnRzIiwgIi4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvUGFnZUJvdHRvbUZpeGVkQ29udGVudC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL0V4cGVuc2VTaGVldExpbmVEZXRhaWxWaWV3LnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpbmUvdXNlRXhwZW5zZVNoZWV0TGluZVR5cGVWYWxpZGF0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcclxuaW1wb3J0IFJlY29yZE5hdmlnYXRvciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1JlY29yZE5hdmlnYXRvci50c3hcIjtcclxuaW1wb3J0IHsgdXNlQXV0aENvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcclxuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xyXG5pbXBvcnQgeyBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgfSBmcm9tIFwiLi4vZXhwZW5zZUZvcm1hdHRlcnMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VTaGVldExpbmVGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VTaGVldExpbmVGb3JtLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldExpbmVzTGlzdCBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGluZXNMaXN0LnRzeFwiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlSW50ZXJuYXRpb25hbExhYmVsLCBnZXRFeHBlbnNlSW50ZXJuYXRpb25hbE9wdGlvbnMgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2ludGVybmF0aW9uYWxPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB7IHBhcnNlRGVjaW1hbElucHV0IH0gZnJvbSBcIi4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwsIHJlbG9hZEV4cGVuc2VQYWdlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IGFwcGVuZEV4cGVuc2VUaWNrZXRSZXR1cm5RdWVyeSwgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VHYXN0b1R5cGVPcHRpb25zIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlR2FzdG9UeXBlQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyBhcmVFeHBlbnNlTnVtZXJpY0lucHV0c0VxdWl2YWxlbnQsIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgY2FsY3VsYXRlRXhwZW5zZUxpbmVBbW91bnRNU1RGb3JDdXJyZW5jeSxcclxuICBjYWxjdWxhdGVFeHBlbnNlTGluZUV4Y2hhbmdlUmF0ZUZvckN1cnJlbmN5LFxyXG4gIGlzRXhwZW5zZUxpbmVTYW1lUmVpbWJ1cnNlbWVudEN1cnJlbmN5LFxyXG4gIG5vcm1hbGl6ZUV4cGVuc2VMaW5lQ3VycmVuY3lDb2RlLFxyXG4gIHJlc29sdmVFeHBlbnNlTGluZUV4Y2hhbmdlUmF0ZUZvckN1cnJlbmN5LFxyXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlTGluZUN1cnJlbmN5LnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgYnVpbGRFeHBlbnNlRXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UsXHJcbiAgZmV0Y2hFeHBlbnNlT2ZmaWNpYWxFeGNoYW5nZVJhdGUsXHJcbiAgZm9ybWF0RXhwZW5zZUV4Y2hhbmdlUmF0ZUlucHV0VmFsdWUsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VFeGNoYW5nZVJhdGUudHNcIjtcclxuaW1wb3J0IHtcclxuICBtYXBCb29sZWFuRW51bU9wdGlvbnMsXHJcbiAgdHlwZSBFeHBlbnNlU2VsZWN0T3B0aW9uLFxyXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbENvbmZpcm1EaWFsb2cudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFN0YXRlIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFN0YXRlLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldExpbmVUaWNrZXRQcmV2aWV3IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0TGluZVRpY2tldFByZXZpZXcudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VTaGVldExpbmVEZXRhaWxWaWV3IGZyb20gXCIuL0V4cGVuc2VTaGVldExpbmVEZXRhaWxWaWV3LnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRMaW5lVHlwZVZhbGlkYXRpb24gfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRMaW5lVHlwZVZhbGlkYXRpb24udHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlIH0gZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZS50c1wiO1xyXG5cclxuY29uc3QgTElOS0VEX1RJQ0tFVF9MSU5FU19QQUdFX1NJWkUgPSA2O1xyXG5cclxuY29uc3QgcGFnZWRTbGljZSA9IDxULD4oaXRlbXM6IFRbXSwgcGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKTogVFtdID0+IHtcclxuICBpZiAoIWl0ZW1zLmxlbmd0aCkgcmV0dXJuIFtdO1xyXG4gIGNvbnN0IHNhZmVQYWdlID0gTWF0aC5tYXgoMSwgcGFnZSk7XHJcbiAgY29uc3Qgc3RhcnQgPSAoc2FmZVBhZ2UgLSAxKSAqIHBhZ2VTaXplO1xyXG4gIHJldHVybiBpdGVtcy5zbGljZShzdGFydCwgc3RhcnQgKyBwYWdlU2l6ZSk7XHJcbn07XHJcblxyXG4vLyBJbml0aWFsaXplcyBhdXRoIHNlZWQgZm9yIGV4cGVuc2UgQVBJIGNhbGxzIGJlZm9yZSBpc2xhbmQgZWZmZWN0cyBydW4uXHJcbmNvbnN0IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoID0gKCkgPT4ge1xyXG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcclxuICAgIHRva2VuOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxyXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXHJcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBDb25zdW1lcyB0aGUgb25lLXRpbWUgZWRpdCBoYW5kb2ZmIGZyb20gc2hlZXQgZGV0YWlsIHNvIGxhdGVyIHJlbG9hZHMgcmV0dXJuIHRvIG5vcm1hbCB2aWV3IG1vZGUuXHJcbmNvbnN0IGNvbnN1bWVMaW5lRWRpdE1vZGVRdWVyeSA9ICgpID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY3VycmVudFVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gIGlmIChzYWZlVGV4dChjdXJyZW50VXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJtb2RlXCIpKS50b0xvd2VyQ2FzZSgpICE9PSBcImVkaXRcIikge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY3VycmVudFVybC5zZWFyY2hQYXJhbXMuZGVsZXRlKFwibW9kZVwiKTtcclxuICBjb25zdCBuZXh0VXJsID0gYCR7Y3VycmVudFVybC5wYXRobmFtZX0ke2N1cnJlbnRVcmwuc2VhcmNofSR7Y3VycmVudFVybC5oYXNofWA7XHJcbiAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHdpbmRvdy5oaXN0b3J5LnN0YXRlLCBcIlwiLCBuZXh0VXJsKTtcclxufTtcclxuXHJcbmNvbnN0IEV4cGVuc2VTaGVldExpbmVEZXRhaWxDb250ZW50ID0gKCkgPT4ge1xyXG4gIGNvbnN0IHtcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICB9ID0gdXNlQXV0aENvbnRleHQoKTtcclxuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIlZpZXdcIik7XHJcbiAgY29uc3QgY2FuVmlld0xpbmtlZFRpY2tldExpbmVzID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJWaWV3XCIpO1xyXG4gIGNvbnN0IHNoZWV0SWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX0lEX18pO1xyXG4gIGNvbnN0IGxpbmVJZCA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfTElORV9JRF9fKTtcclxuICBjb25zdCBsaW5lTW9kZSA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfTElORV9NT0RFX18pLnRvTG93ZXJDYXNlKCk7XHJcbiAgY29uc3QgaXNDcmVhdGVNb2RlID0gbGluZU1vZGUgPT09IFwiY3JlYXRlXCI7XHJcbiAgY29uc3Qgc3RhcnRJbkVkaXRNb2RlID0gbGluZU1vZGUgPT09IFwiZWRpdFwiO1xyXG4gIGNvbnN0IFtpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsIHNldElzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2xpbmtlZFRpY2tldExpbmVQYWdpbmcsIHNldExpbmtlZFRpY2tldExpbmVQYWdpbmddID0gdXNlU3RhdGUoeyBmaWxlSWQ6IFwiXCIsIHBhZ2U6IDEgfSk7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlUmVxdWVzdElkUmVmID0gdXNlUmVmKDApO1xyXG4gIGNvbnN0IGFtb3VudEN1cnJlbmN5TWFudWFsRWRpdFJlZiA9IHVzZVJlZihmYWxzZSk7XHJcbiAgY29uc3QgYW1vdW50TVNUTWFudWFsRWRpdFJlZiA9IHVzZVJlZihmYWxzZSk7XHJcbiAgY29uc3QgbGlua2VkVGlja2V0TGluZUNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSwgc2V0RXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXN0YXJ0SW5FZGl0TW9kZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3VtZUxpbmVFZGl0TW9kZVF1ZXJ5KCk7XHJcbiAgfSwgW3N0YXJ0SW5FZGl0TW9kZV0pO1xyXG5cclxuICBjb25zdCB7XHJcbiAgICBoZWFkZXIsXHJcbiAgICBsaW5lLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgbGluZU5hdmlnYXRpb24sXHJcbiAgICBidXN5LFxyXG4gICAgc3RhdHVzLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxFcnJvcixcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdFRyYW5zRGF0ZSxcclxuICAgIGRyYWZ0VHlwZVZhbHVlQ29kZSxcclxuICAgIGRyYWZ0UHJpY2UsXHJcbiAgICBkcmFmdFF0eSxcclxuICAgIGRyYWZ0UHJvamVjdElkLFxyXG4gICAgZHJhZnRJbnRlcm5hdGlvbmFsLFxyXG4gICAgZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBkcmFmdEFtb3VudE1TVCxcclxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgaXNLbVR5cGUsXHJcbiAgICBpc0Z1ZWxQcmljZUxvYWRpbmcsXHJcbiAgICBmdWVsUHJpY2VNZXNzYWdlLFxyXG4gICAgZnVlbFByaWNlTWVzc2FnZUlzRXJyb3IsXHJcbiAgICBpc1NoZWV0TG9ja2VkLFxyXG4gICAgaXNMaW5lRWRpdExvY2tlZCxcclxuICAgIGlzTGluZURlbGV0ZUxvY2tlZCxcclxuICAgIGhhc0xpbmtlZFRpY2tldCxcclxuICAgIGxpbmtlZFRpY2tldEZpbGVJZCxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2VDdXJyZW50LFxyXG4gICAgY2FuRWRpdEV4cGVuc2VDdXJyZW50LFxyXG4gICAgY2FuRGVsZXRlRXhwZW5zZUN1cnJlbnQsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBzZXREcmFmdFRyYW5zRGF0ZSxcclxuICAgIHNldERyYWZ0VHlwZVZhbHVlQ29kZSxcclxuICAgIHNldERyYWZ0UHJpY2UsXHJcbiAgICBzZXREcmFmdFF0eSxcclxuICAgIHNldERyYWZ0UHJvamVjdElkLFxyXG4gICAgc2V0RHJhZnRJbnRlcm5hdGlvbmFsLFxyXG4gICAgc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBzZXREcmFmdEFtb3VudE1TVCxcclxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBuYXZpZ2F0ZVRvU2hlZXREZXRhaWwsXHJcbiAgICBuYXZpZ2F0ZVRvTGluZURldGFpbCxcclxuICB9ID0gdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFN0YXRlKHtcclxuICAgIGhhc0FjY2VzcyxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHNoZWV0SWQsXHJcbiAgICBsaW5lSWQsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBzdGFydEluRWRpdE1vZGUsXHJcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICB9KTtcclxuXHJcbiAgY29uc3Qge1xuICAgIGRlc2NyaXB0aW9uSW52YWxpZCxcbiAgICB0eXBlSW52YWxpZCxcbiAgICBwcmljZUludmFsaWQsXG4gICAgcXR5SW52YWxpZCxcbiAgICBkZXNjcmlwdGlvbklucHV0UmVmLFxuICAgIHR5cGVJbnB1dFJlZixcbiAgICBwcmljZUlucHV0UmVmLFxuICAgIHF0eUlucHV0UmVmLFxuICAgIGZvY3VzRGVzY3JpcHRpb25GaWVsZCxcbiAgICBmb2N1c1R5cGVGaWVsZCxcbiAgICBmb2N1c0Ftb3VudEZpZWxkcyxcbiAgICBoYW5kbGVEcmFmdERlc2NyaXB0aW9uQ2hhbmdlLFxuICAgIGhhbmRsZURyYWZ0VHlwZVZhbHVlQ29kZUNoYW5nZSxcbiAgICBoYW5kbGVEcmFmdFByaWNlQ2hhbmdlLFxuICAgIGhhbmRsZURyYWZ0UXR5Q2hhbmdlLFxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcbiAgfSA9IHVzZUV4cGVuc2VTaGVldExpbmVUeXBlVmFsaWRhdGlvbih7XG4gICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICBkcmFmdFR5cGVWYWx1ZUNvZGUsXG4gICAgZHJhZnRQcmljZSxcbiAgICBkcmFmdFF0eSxcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxuICAgIHNldERyYWZ0VHlwZVZhbHVlQ29kZSxcbiAgICBzZXREcmFmdFByaWNlLFxuICAgIHNldERyYWZ0UXR5LFxuICB9KTtcclxuXHJcbiAgY29uc3QgZm9ybWF0TGluZU1vbmV5SW5wdXQgPSB1c2VDYWxsYmFjaygodmFsdWU6IG51bWJlciB8IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gICAgcmV0dXJuIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcih2YWx1ZSwge1xyXG4gICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gICAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBmb3JtYXRMaW5lRXhjaGFuZ2VSYXRlSW5wdXQgPSB1c2VDYWxsYmFjaygodmFsdWU6IG51bWJlciB8IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gICAgcmV0dXJuIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcih2YWx1ZSwge1xyXG4gICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDcsXHJcbiAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogNyxcclxuICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gICAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBsb2NhbEN1cnJlbmN5Q29kZSA9IG5vcm1hbGl6ZUV4cGVuc2VMaW5lQ3VycmVuY3lDb2RlKGhlYWRlcj8uY3VycmVuY3lDb2RlKSB8fCBcIkVVUlwiO1xyXG4gIGNvbnN0IGVmZmVjdGl2ZUxpbmVDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVFeHBlbnNlTGluZUN1cnJlbmN5Q29kZShpc0VkaXRpbmcgPyBkcmFmdEN1cnJlbmN5Q29kZSA6IGxpbmU/LmN1cnJlbmN5Q29kZSkgfHwgbG9jYWxDdXJyZW5jeUNvZGU7XHJcbiAgY29uc3QgZHJhZnRQcmljZVZhbHVlID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRQcmljZSk7XHJcbiAgY29uc3QgZHJhZnRRdHlWYWx1ZSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0UXR5KTtcclxuICBjb25zdCBjYWxjdWxhdGVkQW1vdW50UHJldmlldyA9XHJcbiAgICBpc0VkaXRpbmcgJiYgZHJhZnRQcmljZVZhbHVlICE9IG51bGwgJiYgZHJhZnRQcmljZVZhbHVlID4gMCAmJiBkcmFmdFF0eVZhbHVlICE9IG51bGwgJiYgZHJhZnRRdHlWYWx1ZSA+IDBcclxuICAgICAgPyBkcmFmdFByaWNlVmFsdWUgKiBkcmFmdFF0eVZhbHVlXHJcbiAgICAgIDogbGluZT8uYW1vdW50ID8/IG51bGw7XHJcbiAgY29uc3QgW2RyYWZ0QW1vdW50Q3VycmVuY3ksIHNldERyYWZ0QW1vdW50Q3VycmVuY3ldID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgcHJpY2VUZXh0ID0gdXNlTWVtbyhcclxuICAgICgpID0+IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShsaW5lPy5wcmljZSA/PyBudWxsLCBlZmZlY3RpdmVMaW5lQ3VycmVuY3lDb2RlKSxcclxuICAgIFtlZmZlY3RpdmVMaW5lQ3VycmVuY3lDb2RlLCBsaW5lPy5wcmljZV1cclxuICApO1xyXG4gIGNvbnN0IGFtb3VudFRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGNhbGN1bGF0ZWRBbW91bnRQcmV2aWV3LCBlZmZlY3RpdmVMaW5lQ3VycmVuY3lDb2RlKSxcclxuICAgIFtjYWxjdWxhdGVkQW1vdW50UHJldmlldywgZWZmZWN0aXZlTGluZUN1cnJlbmN5Q29kZV1cclxuICApO1xyXG4gIGNvbnN0IGRpc3BsYXlBbW91bnRNU1QgPSBpc0V4cGVuc2VMaW5lU2FtZVJlaW1idXJzZW1lbnRDdXJyZW5jeShlZmZlY3RpdmVMaW5lQ3VycmVuY3lDb2RlLCBsb2NhbEN1cnJlbmN5Q29kZSlcbiAgICA/IGxpbmU/LnZpc2libGVSZWltYnVyc2FibGVUb3RhbCA/PyBsaW5lPy5hbW91bnRNU1QgPz8gbGluZT8uYW1vdW50ID8/IG51bGxcbiAgICA6IGxpbmU/LnZpc2libGVSZWltYnVyc2FibGVUb3RhbCA/PyBsaW5lPy5hbW91bnRNU1QgPz8gbnVsbDtcbiAgY29uc3QgYW1vdW50TVNUVGV4dCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koZGlzcGxheUFtb3VudE1TVCwgbG9jYWxDdXJyZW5jeUNvZGUpLFxyXG4gICAgW2Rpc3BsYXlBbW91bnRNU1QsIGxvY2FsQ3VycmVuY3lDb2RlXVxyXG4gICk7XHJcbiAgY29uc3QgcHJvamVjdFZhbHVlID0gc2FmZVRleHQobGluZT8ucHJvaklkIHx8IGhlYWRlcj8ucHJvaklkKTtcclxuICBjb25zdCBzaGVldERlc2NyaXB0aW9uID0gc2FmZVRleHQoaGVhZGVyPy5kZXNjcmlwdGlvbikgfHwgXCItXCI7XHJcbiAgY29uc3QgaW50ZXJuYWNpb25hbExhYmVsID0gZ2V0RXhwZW5zZUludGVybmF0aW9uYWxMYWJlbChsaW5lPy5pbnRlcm5hY2lvbmFsKTtcclxuICBjb25zdCBsaW5rZWRUaWNrZXRGaWxlSWRWYWx1ZSA9IHNhZmVUZXh0KGxpbmtlZFRpY2tldEZpbGVJZCk7XHJcbiAgY29uc3Qgc2hvd0xpbmtlZFRpY2tldExpbmVzID0gaGFzTGlua2VkVGlja2V0ICYmICEhbGlua2VkVGlja2V0RmlsZUlkVmFsdWUgJiYgY2FuVmlld0xpbmtlZFRpY2tldExpbmVzO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc0VkaXRpbmcpIHtcclxuICAgICAgYW1vdW50Q3VycmVuY3lNYW51YWxFZGl0UmVmLmN1cnJlbnQgPSBmYWxzZTtcclxuICAgICAgYW1vdW50TVNUTWFudWFsRWRpdFJlZi5jdXJyZW50ID0gZmFsc2U7XHJcbiAgICAgIHNldERyYWZ0QW1vdW50Q3VycmVuY3koXCJcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYW1vdW50Q3VycmVuY3lNYW51YWxFZGl0UmVmLmN1cnJlbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERyYWZ0QW1vdW50Q3VycmVuY3koZm9ybWF0TGluZU1vbmV5SW5wdXQoY2FsY3VsYXRlZEFtb3VudFByZXZpZXcpKTtcclxuICB9LCBbY2FsY3VsYXRlZEFtb3VudFByZXZpZXcsIGZvcm1hdExpbmVNb25leUlucHV0LCBpc0VkaXRpbmcsIGxpbmU/LmxpbmVSZWNJZF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgYW1vdW50TVNUTWFudWFsRWRpdFJlZi5jdXJyZW50ID0gZmFsc2U7XHJcbiAgfSwgW2lzRWRpdGluZywgbGluZT8ubGluZVJlY0lkXSk7XHJcbiAgY29uc3QgbGlua2VkVGlja2V0RGV0YWlsID0gdXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlKHtcclxuICAgIGVuYWJsZWQ6IHNob3dMaW5rZWRUaWNrZXRMaW5lcyxcclxuICAgIGhhc0FjY2VzczogY2FuVmlld0xpbmtlZFRpY2tldExpbmVzLFxyXG4gICAgZmlsZUlkOiBsaW5rZWRUaWNrZXRGaWxlSWRWYWx1ZSxcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gIH0pO1xyXG4gIGNvbnN0IHRvdGFsTGlua2VkVGlja2V0TGluZVBhZ2VzID0gTWF0aC5jZWlsKChsaW5rZWRUaWNrZXREZXRhaWwubGluZXMubGVuZ3RoIHx8IDApIC8gTElOS0VEX1RJQ0tFVF9MSU5FU19QQUdFX1NJWkUpO1xyXG4gIGNvbnN0IHJlcXVlc3RlZExpbmtlZFRpY2tldExpbmVQYWdlID1cclxuICAgIGxpbmtlZFRpY2tldExpbmVQYWdpbmcuZmlsZUlkID09PSBsaW5rZWRUaWNrZXRGaWxlSWRWYWx1ZVxyXG4gICAgICA/IGxpbmtlZFRpY2tldExpbmVQYWdpbmcucGFnZVxyXG4gICAgICA6IDE7XHJcbiAgY29uc3QgbGlua2VkVGlja2V0TGluZVBhZ2UgPVxyXG4gICAgdG90YWxMaW5rZWRUaWNrZXRMaW5lUGFnZXMgPiAwXHJcbiAgICAgID8gTWF0aC5taW4oTWF0aC5tYXgoMSwgcmVxdWVzdGVkTGlua2VkVGlja2V0TGluZVBhZ2UpLCB0b3RhbExpbmtlZFRpY2tldExpbmVQYWdlcylcclxuICAgICAgOiAxO1xyXG4gIGNvbnN0IHZpc2libGVMaW5rZWRUaWNrZXRMaW5lcyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBwYWdlZFNsaWNlKGxpbmtlZFRpY2tldERldGFpbC5saW5lcywgbGlua2VkVGlja2V0TGluZVBhZ2UsIExJTktFRF9USUNLRVRfTElORVNfUEFHRV9TSVpFKSxcclxuICAgIFtsaW5rZWRUaWNrZXREZXRhaWwubGluZXMsIGxpbmtlZFRpY2tldExpbmVQYWdlXVxyXG4gICk7XHJcbiAgY29uc3QgbGlua2VkVGlja2V0TGluZVBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgZmlyc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKSxcclxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXHJcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXHJcbiAgICAgIGxhc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIiksXHJcbiAgICB9KSxcclxuICAgIFtdXHJcbiAgKTtcclxuICBjb25zdCBoYW5kbGVMaW5rZWRUaWNrZXRMaW5lUGFnZUNoYW5nZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHBhZ2U6IG51bWJlcikgPT4ge1xyXG4gICAgICBzZXRMaW5rZWRUaWNrZXRMaW5lUGFnaW5nKHtcclxuICAgICAgICBmaWxlSWQ6IGxpbmtlZFRpY2tldEZpbGVJZFZhbHVlLFxyXG4gICAgICAgIHBhZ2UsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtsaW5rZWRUaWNrZXRGaWxlSWRWYWx1ZV1cclxuICApO1xyXG4gIGNvbnN0IGxpbmtlZFRpY2tldFJldHVybkNvbnRleHQgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IHNhZmVGaWxlSWQgPSBsaW5rZWRUaWNrZXRGaWxlSWRWYWx1ZTtcclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQoc2hlZXRJZCk7XHJcbiAgICBjb25zdCBzYWZlTGluZUlkID0gc2FmZVRleHQobGluZUlkIHx8IGxpbmU/LmxpbmVSZWNJZCk7XHJcbiAgICBpZiAoIXNhZmVGaWxlSWQgfHwgIXNhZmVTaGVldElkIHx8ICFzYWZlTGluZUlkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBmaWxlSWQ6IHNhZmVGaWxlSWQsXHJcbiAgICAgIG9yaWdpbjogXCJleHBlbnNlLWxpbmVcIiBhcyBjb25zdCxcclxuICAgICAgc2hlZXRJZDogc2FmZVNoZWV0SWQsXHJcbiAgICAgIHNoZWV0TGluZVJlY0lkOiBzYWZlTGluZUlkLFxyXG4gICAgfTtcclxuICB9LCBbbGluZT8ubGluZVJlY0lkLCBsaW5lSWQsIGxpbmtlZFRpY2tldEZpbGVJZFZhbHVlLCBzaGVldElkXSk7XHJcbiAgY29uc3QgcmVzb2x2ZUxpbmtlZFRpY2tldExpbmVDYXJkID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcclxuICAgICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xyXG4gICAgICBjb25zdCBjYXJkID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XHJcbiAgICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XHJcbiAgICAgIGlmICghbGlua2VkVGlja2V0TGluZUNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XHJcbiAgICAgIHJldHVybiBjYXJkO1xyXG4gICAgfSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyh7XHJcbiAgICBjb250YWluZXJSZWY6IGxpbmtlZFRpY2tldExpbmVDb250YWluZXJSZWYsXHJcbiAgICBlcnJvck1lc3NhZ2U6IGxpbmtlZFRpY2tldERldGFpbC5lcnJvck1lc3NhZ2UsXHJcbiAgICBpdGVtczogdmlzaWJsZUxpbmtlZFRpY2tldExpbmVzLFxyXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQ6IHJlc29sdmVMaW5rZWRUaWNrZXRMaW5lQ2FyZCxcclxuICB9KTtcclxuICBjb25zdCB7XHJcbiAgICBzaG93U3RpY2t5UHJldmlldyxcclxuICAgIHByZXZpZXdPcGVuLFxyXG4gICAgcHJldmlld0J1c3ksXHJcbiAgICBwcmV2aWV3RXJyb3IsXHJcbiAgICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgICBwcmV2aWV3U2NhbGUsXHJcbiAgICBwcmV2aWV3VHJhbnNsYXRlLFxyXG4gICAgcHJldmlld1N1cmZhY2VSZWYsXHJcbiAgICBwcmV2aWV3RmlsZU5hbWUsXHJcbiAgICBwcmV2aWV3QWx0VGV4dCxcclxuICAgIG9wZW5QcmV2aWV3LFxyXG4gICAgY2xvc2VQcmV2aWV3LFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlLFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXHJcbiAgfSA9IHVzZUV4cGVuc2VTaGVldExpbmVUaWNrZXRQcmV2aWV3KHtcclxuICAgIGxpbmtlZFRpY2tldEZpbGVJZCxcclxuICAgIGhhc0xpbmtlZFRpY2tldCxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZ2FzdG9UeXBlT3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiB7XHJcbiAgICBjb25zdCBtYXBwZWQgPSBnZXRFeHBlbnNlR2FzdG9UeXBlT3B0aW9ucygpO1xyXG5cclxuICAgIGNvbnN0IGN1cnJlbnRUeXBlQ29kZSA9IHNhZmVUZXh0KGxpbmU/LnR5cGVWYWx1ZUNvZGUpO1xyXG4gICAgY29uc3QgY3VycmVudFR5cGVMYWJlbCA9IHNhZmVUZXh0KGxpbmU/LnR5cGVWYWx1ZSk7XHJcbiAgICBpZiAoY3VycmVudFR5cGVDb2RlICYmICFtYXBwZWQuc29tZSgoaXRlbSkgPT4gaXRlbS52YWx1ZSA9PT0gY3VycmVudFR5cGVDb2RlKSkge1xyXG4gICAgICBtYXBwZWQucHVzaCh7XHJcbiAgICAgICAgdmFsdWU6IGN1cnJlbnRUeXBlQ29kZSxcclxuICAgICAgICB0ZXh0OiBjdXJyZW50VHlwZUxhYmVsIHx8IGN1cnJlbnRUeXBlQ29kZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1hcHBlZDtcclxuICB9LCBbbGluZT8udHlwZVZhbHVlLCBsaW5lPy50eXBlVmFsdWVDb2RlXSk7XHJcblxyXG4gIGNvbnN0IGludGVybmF0aW9uYWxPcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFxyXG4gICAgKCkgPT4gbWFwQm9vbGVhbkVudW1PcHRpb25zKGdldEV4cGVuc2VJbnRlcm5hdGlvbmFsT3B0aW9ucygpKSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgbG9jYWxFeGNoYW5nZVJhdGVJbnB1dCA9IHVzZU1lbW8oKCkgPT4gZm9ybWF0TGluZUV4Y2hhbmdlUmF0ZUlucHV0KDEwMCksIFtmb3JtYXRMaW5lRXhjaGFuZ2VSYXRlSW5wdXRdKTtcclxuICBjb25zdCBpc0RyYWZ0Q3VycmVuY3lMb2NhbCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3lDb2RlID0gbm9ybWFsaXplRXhwZW5zZUxpbmVDdXJyZW5jeUNvZGUoZHJhZnRDdXJyZW5jeUNvZGUpO1xyXG4gICAgcmV0dXJuIGlzRXhwZW5zZUxpbmVTYW1lUmVpbWJ1cnNlbWVudEN1cnJlbmN5KG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5Q29kZSwgbG9jYWxDdXJyZW5jeUNvZGUpO1xyXG4gIH0sIFtkcmFmdEN1cnJlbmN5Q29kZSwgbG9jYWxDdXJyZW5jeUNvZGVdKTtcclxuXHJcbiAgY29uc3QgcmVzb2x2ZUV4Y2hhbmdlUmF0ZUZvckxpbmVDYWxjdWxhdGlvbiA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV4Y2hhbmdlUmF0ZVJhdzogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICAgICAgaWYgKGlzRHJhZnRDdXJyZW5jeUxvY2FsKSB7XHJcbiAgICAgICAgaWYgKGV4Y2hhbmdlUmF0ZVJhdyAhPT0gbG9jYWxFeGNoYW5nZVJhdGVJbnB1dCkge1xyXG4gICAgICAgICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUobG9jYWxFeGNoYW5nZVJhdGVJbnB1dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsb2NhbEV4Y2hhbmdlUmF0ZUlucHV0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gZXhjaGFuZ2VSYXRlUmF3O1xyXG4gICAgfSxcclxuICAgIFtpc0RyYWZ0Q3VycmVuY3lMb2NhbCwgbG9jYWxFeGNoYW5nZVJhdGVJbnB1dCwgc2V0RHJhZnRFeGNoYW5nZVJhdGVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgcmVzb2x2ZURyYWZ0TGluZUFtb3VudCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHByaWNlUmF3OiBzdHJpbmcsIHF0eVJhdzogc3RyaW5nKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgICAgIGNvbnN0IG5leHRQcmljZSA9IHBhcnNlRGVjaW1hbElucHV0KHByaWNlUmF3KTtcclxuICAgICAgY29uc3QgbmV4dFF0eSA9IHBhcnNlRGVjaW1hbElucHV0KHF0eVJhdyk7XHJcbiAgICAgIGlmIChuZXh0UHJpY2UgPT0gbnVsbCB8fCBuZXh0UHJpY2UgPD0gMCB8fCBuZXh0UXR5ID09IG51bGwgfHwgbmV4dFF0eSA8PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXh0UHJpY2UgKiBuZXh0UXR5O1xyXG4gICAgfSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgcmVjYWxjdWxhdGVBbW91bnRNU1RGcm9tUmF0ZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHByaWNlUmF3OiBzdHJpbmcsIHF0eVJhdzogc3RyaW5nLCBleGNoYW5nZVJhdGVSYXc6IHN0cmluZywgY3VycmVuY3lDb2RlT3ZlcnJpZGU/OiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3QgYW1vdW50ID0gcmVzb2x2ZURyYWZ0TGluZUFtb3VudChwcmljZVJhdywgcXR5UmF3KTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbmN5Q29kZSA9IGN1cnJlbmN5Q29kZU92ZXJyaWRlXHJcbiAgICAgICAgPyBub3JtYWxpemVFeHBlbnNlTGluZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGVPdmVycmlkZSlcclxuICAgICAgICA6IG5vcm1hbGl6ZUV4cGVuc2VMaW5lQ3VycmVuY3lDb2RlKGRyYWZ0Q3VycmVuY3lDb2RlKTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGFtb3VudE1TVE1hbnVhbEVkaXRSZWYuY3VycmVudCAmJlxyXG4gICAgICAgIGlzRXhwZW5zZUxpbmVTYW1lUmVpbWJ1cnNlbWVudEN1cnJlbmN5KG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUsIGxvY2FsQ3VycmVuY3lDb2RlKVxyXG4gICAgICApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGV4Y2hhbmdlUmF0ZSA9IHJlc29sdmVFeHBlbnNlTGluZUV4Y2hhbmdlUmF0ZUZvckN1cnJlbmN5KFxyXG4gICAgICAgIG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgbG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgcGFyc2VEZWNpbWFsSW5wdXQoZXhjaGFuZ2VSYXRlUmF3KVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBuZXh0QW1vdW50TVNUID1cclxuICAgICAgICBhbW91bnQgIT0gbnVsbFxyXG4gICAgICAgICAgPyBjYWxjdWxhdGVFeHBlbnNlTGluZUFtb3VudE1TVEZvckN1cnJlbmN5KGFtb3VudCwgZXhjaGFuZ2VSYXRlLCBub3JtYWxpemVkQ3VycmVuY3lDb2RlLCBsb2NhbEN1cnJlbmN5Q29kZSlcclxuICAgICAgICAgIDogbnVsbDtcclxuICAgICAgaWYgKG5leHRBbW91bnRNU1QgIT0gbnVsbCkge1xyXG4gICAgICAgIHNldERyYWZ0QW1vdW50TVNUKGZvcm1hdExpbmVNb25leUlucHV0KG5leHRBbW91bnRNU1QpKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtkcmFmdEN1cnJlbmN5Q29kZSwgZm9ybWF0TGluZU1vbmV5SW5wdXQsIGxvY2FsQ3VycmVuY3lDb2RlLCByZXNvbHZlRHJhZnRMaW5lQW1vdW50LCBzZXREcmFmdEFtb3VudE1TVF1cclxuICApO1xyXG5cclxuICBjb25zdCBsb2FkT2ZmaWNpYWxMaW5lRXhjaGFuZ2VSYXRlID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAoY3VycmVuY3lDb2RlOiBzdHJpbmcsIHRyYW5zRGF0ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5leHRDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVFeHBlbnNlTGluZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGUpO1xyXG4gICAgICBpZiAoIW5leHRDdXJyZW5jeUNvZGUgfHwgIWxvY2FsQ3VycmVuY3lDb2RlKSB7XHJcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UoXCJcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByZXF1ZXN0SWQgPSBleGNoYW5nZVJhdGVSZXF1ZXN0SWRSZWYuY3VycmVudCArIDE7XHJcbiAgICAgIGV4Y2hhbmdlUmF0ZVJlcXVlc3RJZFJlZi5jdXJyZW50ID0gcmVxdWVzdElkO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBvZmZpY2lhbEV4Y2hhbmdlUmF0ZSA9IGF3YWl0IGZldGNoRXhwZW5zZU9mZmljaWFsRXhjaGFuZ2VSYXRlKHtcclxuICAgICAgICAgIGxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgZXhwZW5zZUN1cnJlbmN5Q29kZTogbmV4dEN1cnJlbmN5Q29kZSxcclxuICAgICAgICAgIGRhdGU6IHRyYW5zRGF0ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAocmVxdWVzdElkICE9PSBleGNoYW5nZVJhdGVSZXF1ZXN0SWRSZWYuY3VycmVudCB8fCAhb2ZmaWNpYWxFeGNoYW5nZVJhdGUpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5leHRFeGNoYW5nZVJhdGUgPSBmb3JtYXRFeHBlbnNlRXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZShvZmZpY2lhbEV4Y2hhbmdlUmF0ZS5leGNoYW5nZVJhdGUpO1xyXG4gICAgICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlKG5leHRFeGNoYW5nZVJhdGUpO1xyXG4gICAgICAgIHJlY2FsY3VsYXRlQW1vdW50TVNURnJvbVJhdGUoZHJhZnRQcmljZSwgZHJhZnRRdHksIG5leHRFeGNoYW5nZVJhdGUsIG5leHRDdXJyZW5jeUNvZGUpO1xyXG4gICAgICAgIHNldEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKFxyXG4gICAgICAgICAgYnVpbGRFeHBlbnNlRXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2Uoe1xyXG4gICAgICAgICAgICByYXdSYXRlOiBvZmZpY2lhbEV4Y2hhbmdlUmF0ZS5yYXdSYXRlLFxyXG4gICAgICAgICAgICBkYXRlOiBvZmZpY2lhbEV4Y2hhbmdlUmF0ZS5kYXRlLFxyXG4gICAgICAgICAgICBzb3VyY2U6IG9mZmljaWFsRXhjaGFuZ2VSYXRlLnNvdXJjZSxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAocmVxdWVzdElkICE9PSBleGNoYW5nZVJhdGVSZXF1ZXN0SWRSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9XHJcbiAgICAgICAgICBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgID8gc2FmZVRleHQoZXJyb3IubWVzc2FnZSlcclxuICAgICAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpO1xyXG4gICAgICAgIHNldEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW2RyYWZ0UHJpY2UsIGRyYWZ0UXR5LCBsb2NhbEN1cnJlbmN5Q29kZSwgcmVjYWxjdWxhdGVBbW91bnRNU1RGcm9tUmF0ZSwgc2V0RHJhZnRFeGNoYW5nZVJhdGVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTGluZVByaWNlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICBhbW91bnRDdXJyZW5jeU1hbnVhbEVkaXRSZWYuY3VycmVudCA9IGZhbHNlO1xyXG4gICAgICBoYW5kbGVEcmFmdFByaWNlQ2hhbmdlKHZhbHVlKTtcclxuICAgICAgY29uc3QgbmV4dEFtb3VudCA9IHJlc29sdmVEcmFmdExpbmVBbW91bnQodmFsdWUsIGRyYWZ0UXR5KTtcclxuICAgICAgc2V0RHJhZnRBbW91bnRDdXJyZW5jeShuZXh0QW1vdW50ICE9IG51bGwgPyBmb3JtYXRMaW5lTW9uZXlJbnB1dChuZXh0QW1vdW50KSA6IFwiXCIpO1xyXG4gICAgICBjb25zdCBlZmZlY3RpdmVFeGNoYW5nZVJhdGUgPSByZXNvbHZlRXhjaGFuZ2VSYXRlRm9yTGluZUNhbGN1bGF0aW9uKGRyYWZ0RXhjaGFuZ2VSYXRlKTtcclxuICAgICAgcmVjYWxjdWxhdGVBbW91bnRNU1RGcm9tUmF0ZSh2YWx1ZSwgZHJhZnRRdHksIGVmZmVjdGl2ZUV4Y2hhbmdlUmF0ZSk7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgICAgZHJhZnRRdHksXHJcbiAgICAgIGZvcm1hdExpbmVNb25leUlucHV0LFxyXG4gICAgICBoYW5kbGVEcmFmdFByaWNlQ2hhbmdlLFxyXG4gICAgICByZWNhbGN1bGF0ZUFtb3VudE1TVEZyb21SYXRlLFxyXG4gICAgICByZXNvbHZlRHJhZnRMaW5lQW1vdW50LFxyXG4gICAgICByZXNvbHZlRXhjaGFuZ2VSYXRlRm9yTGluZUNhbGN1bGF0aW9uLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUxpbmVRdHlDaGFuZ2UgPSB1c2VDYWxsYmFjayhcclxuICAgICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGFtb3VudEN1cnJlbmN5TWFudWFsRWRpdFJlZi5jdXJyZW50ID0gZmFsc2U7XHJcbiAgICAgIGhhbmRsZURyYWZ0UXR5Q2hhbmdlKHZhbHVlKTtcclxuICAgICAgY29uc3QgbmV4dEFtb3VudCA9IHJlc29sdmVEcmFmdExpbmVBbW91bnQoZHJhZnRQcmljZSwgdmFsdWUpO1xyXG4gICAgICBzZXREcmFmdEFtb3VudEN1cnJlbmN5KG5leHRBbW91bnQgIT0gbnVsbCA/IGZvcm1hdExpbmVNb25leUlucHV0KG5leHRBbW91bnQpIDogXCJcIik7XHJcbiAgICAgIGNvbnN0IGVmZmVjdGl2ZUV4Y2hhbmdlUmF0ZSA9IHJlc29sdmVFeGNoYW5nZVJhdGVGb3JMaW5lQ2FsY3VsYXRpb24oZHJhZnRFeGNoYW5nZVJhdGUpO1xyXG4gICAgICByZWNhbGN1bGF0ZUFtb3VudE1TVEZyb21SYXRlKGRyYWZ0UHJpY2UsIHZhbHVlLCBlZmZlY3RpdmVFeGNoYW5nZVJhdGUpO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICAgIGRyYWZ0UHJpY2UsXHJcbiAgICAgIGZvcm1hdExpbmVNb25leUlucHV0LFxyXG4gICAgICBoYW5kbGVEcmFmdFF0eUNoYW5nZSxcclxuICAgICAgcmVjYWxjdWxhdGVBbW91bnRNU1RGcm9tUmF0ZSxcclxuICAgICAgcmVzb2x2ZURyYWZ0TGluZUFtb3VudCxcclxuICAgICAgcmVzb2x2ZUV4Y2hhbmdlUmF0ZUZvckxpbmVDYWxjdWxhdGlvbixcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVMaW5lQW1vdW50Q3VycmVuY3lDaGFuZ2UgPSB1c2VDYWxsYmFjayhcclxuICAgICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGFtb3VudEN1cnJlbmN5TWFudWFsRWRpdFJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgICAgc2V0RHJhZnRBbW91bnRDdXJyZW5jeSh2YWx1ZSk7XHJcblxyXG4gICAgICBjb25zdCBhbW91bnQgPSBwYXJzZURlY2ltYWxJbnB1dCh2YWx1ZSk7XHJcbiAgICAgIGNvbnN0IHF0eSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0UXR5KTtcclxuICAgICAgaWYgKGFtb3VudCA9PSBudWxsIHx8IGFtb3VudCA8PSAwIHx8IHF0eSA9PSBudWxsIHx8IHF0eSA8PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBoYW5kbGVEcmFmdFByaWNlQ2hhbmdlKGZvcm1hdExpbmVNb25leUlucHV0KGFtb3VudCAvIHF0eSkpO1xyXG4gICAgICBjb25zdCBlZmZlY3RpdmVFeGNoYW5nZVJhdGUgPSByZXNvbHZlRXhjaGFuZ2VSYXRlRm9yTGluZUNhbGN1bGF0aW9uKGRyYWZ0RXhjaGFuZ2VSYXRlKTtcclxuICAgICAgY29uc3QgZXhjaGFuZ2VSYXRlID0gcmVzb2x2ZUV4cGVuc2VMaW5lRXhjaGFuZ2VSYXRlRm9yQ3VycmVuY3koXHJcbiAgICAgICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgbG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgcGFyc2VEZWNpbWFsSW5wdXQoZWZmZWN0aXZlRXhjaGFuZ2VSYXRlKVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBzYW1lUmVpbWJ1cnNlbWVudEN1cnJlbmN5ID0gaXNFeHBlbnNlTGluZVNhbWVSZWltYnVyc2VtZW50Q3VycmVuY3koZHJhZnRDdXJyZW5jeUNvZGUsIGxvY2FsQ3VycmVuY3lDb2RlKTtcclxuICAgICAgaWYgKHNhbWVSZWltYnVyc2VtZW50Q3VycmVuY3kgJiYgYW1vdW50TVNUTWFudWFsRWRpdFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBuZXh0QW1vdW50TVNUID0gY2FsY3VsYXRlRXhwZW5zZUxpbmVBbW91bnRNU1RGb3JDdXJyZW5jeShcclxuICAgICAgICBhbW91bnQsXHJcbiAgICAgICAgZXhjaGFuZ2VSYXRlLFxyXG4gICAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgICAgIGxvY2FsQ3VycmVuY3lDb2RlXHJcbiAgICAgICk7XHJcbiAgICAgIGlmIChuZXh0QW1vdW50TVNUICE9IG51bGwpIHtcclxuICAgICAgICBzZXREcmFmdEFtb3VudE1TVChmb3JtYXRMaW5lTW9uZXlJbnB1dChuZXh0QW1vdW50TVNUKSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgICAgZHJhZnRRdHksXHJcbiAgICAgIGZvcm1hdExpbmVNb25leUlucHV0LFxyXG4gICAgICBoYW5kbGVEcmFmdFByaWNlQ2hhbmdlLFxyXG4gICAgICBsb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgICAgcmVzb2x2ZUV4Y2hhbmdlUmF0ZUZvckxpbmVDYWxjdWxhdGlvbixcclxuICAgICAgc2V0RHJhZnRBbW91bnRNU1QsXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTGluZUN1cnJlbmN5Q2hhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICBjb25zdCBuZXh0Q3VycmVuY3lDb2RlID0gbm9ybWFsaXplRXhwZW5zZUxpbmVDdXJyZW5jeUNvZGUodmFsdWUpO1xyXG4gICAgICBhbW91bnRNU1RNYW51YWxFZGl0UmVmLmN1cnJlbnQgPSBmYWxzZTtcclxuICAgICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUobmV4dEN1cnJlbmN5Q29kZSk7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKFwiXCIpO1xyXG4gICAgICBpZiAobmV4dEN1cnJlbmN5Q29kZSAmJiBuZXh0Q3VycmVuY3lDb2RlID09PSBsb2NhbEN1cnJlbmN5Q29kZSkge1xyXG4gICAgICAgIGV4Y2hhbmdlUmF0ZVJlcXVlc3RJZFJlZi5jdXJyZW50ICs9IDE7XHJcbiAgICAgICAgY29uc3QgbmV4dEV4Y2hhbmdlUmF0ZSA9IGZvcm1hdExpbmVFeGNoYW5nZVJhdGVJbnB1dChcclxuICAgICAgICAgIHJlc29sdmVFeHBlbnNlTGluZUV4Y2hhbmdlUmF0ZUZvckN1cnJlbmN5KG5leHRDdXJyZW5jeUNvZGUsIGxvY2FsQ3VycmVuY3lDb2RlLCBkcmFmdEV4Y2hhbmdlUmF0ZSlcclxuICAgICAgICApO1xyXG4gICAgICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlKG5leHRFeGNoYW5nZVJhdGUpO1xyXG4gICAgICAgIHJlY2FsY3VsYXRlQW1vdW50TVNURnJvbVJhdGUoZHJhZnRQcmljZSwgZHJhZnRRdHksIG5leHRFeGNoYW5nZVJhdGUsIG5leHRDdXJyZW5jeUNvZGUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdm9pZCBsb2FkT2ZmaWNpYWxMaW5lRXhjaGFuZ2VSYXRlKG5leHRDdXJyZW5jeUNvZGUsIGRyYWZ0VHJhbnNEYXRlKTtcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGRyYWZ0UHJpY2UsXHJcbiAgICAgIGRyYWZ0UXR5LFxyXG4gICAgICBkcmFmdFRyYW5zRGF0ZSxcclxuICAgICAgbG9hZE9mZmljaWFsTGluZUV4Y2hhbmdlUmF0ZSxcclxuICAgICAgbG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgICBmb3JtYXRMaW5lRXhjaGFuZ2VSYXRlSW5wdXQsXHJcbiAgICAgIHJlY2FsY3VsYXRlQW1vdW50TVNURnJvbVJhdGUsXHJcbiAgICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVMaW5lVHJhbnNEYXRlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICBzZXREcmFmdFRyYW5zRGF0ZSh2YWx1ZSk7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVFeHBlbnNlTGluZUN1cnJlbmN5Q29kZShkcmFmdEN1cnJlbmN5Q29kZSk7XHJcbiAgICAgIGlmIChjdXJyZW50Q3VycmVuY3lDb2RlICYmIGN1cnJlbnRDdXJyZW5jeUNvZGUgIT09IGxvY2FsQ3VycmVuY3lDb2RlKSB7XHJcbiAgICAgICAgdm9pZCBsb2FkT2ZmaWNpYWxMaW5lRXhjaGFuZ2VSYXRlKGN1cnJlbnRDdXJyZW5jeUNvZGUsIHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtkcmFmdEN1cnJlbmN5Q29kZSwgbG9hZE9mZmljaWFsTGluZUV4Y2hhbmdlUmF0ZSwgbG9jYWxDdXJyZW5jeUNvZGUsIHNldERyYWZ0VHJhbnNEYXRlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUxpbmVFeGNoYW5nZVJhdGVDaGFuZ2UgPSB1c2VDYWxsYmFjayhcclxuICAgICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKFwiXCIpO1xyXG4gICAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSh2YWx1ZSk7XHJcbiAgICB9LFxyXG4gICAgW3NldERyYWZ0RXhjaGFuZ2VSYXRlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUxpbmVFeGNoYW5nZVJhdGVDb21taXQgPSB1c2VDYWxsYmFjayhcclxuICAgICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKFwiXCIpO1xyXG4gICAgICBjb25zdCBlZmZlY3RpdmVFeGNoYW5nZVJhdGUgPSByZXNvbHZlRXhjaGFuZ2VSYXRlRm9yTGluZUNhbGN1bGF0aW9uKHZhbHVlKTtcclxuICAgICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUoZm9ybWF0TGluZUV4Y2hhbmdlUmF0ZUlucHV0KGVmZmVjdGl2ZUV4Y2hhbmdlUmF0ZSkpO1xyXG4gICAgICByZWNhbGN1bGF0ZUFtb3VudE1TVEZyb21SYXRlKGRyYWZ0UHJpY2UsIGRyYWZ0UXR5LCBlZmZlY3RpdmVFeGNoYW5nZVJhdGUpO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgZHJhZnRQcmljZSxcclxuICAgICAgZHJhZnRRdHksXHJcbiAgICAgIGZvcm1hdExpbmVFeGNoYW5nZVJhdGVJbnB1dCxcclxuICAgICAgcmVjYWxjdWxhdGVBbW91bnRNU1RGcm9tUmF0ZSxcclxuICAgICAgcmVzb2x2ZUV4Y2hhbmdlUmF0ZUZvckxpbmVDYWxjdWxhdGlvbixcclxuICAgICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTGluZUFtb3VudE1TVENoYW5nZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgICAgaWYgKGFyZUV4cGVuc2VOdW1lcmljSW5wdXRzRXF1aXZhbGVudCh2YWx1ZSwgZHJhZnRBbW91bnRNU1QpKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSBkcmFmdEFtb3VudE1TVCkge1xyXG4gICAgICAgICAgc2V0RHJhZnRBbW91bnRNU1QodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFtb3VudE1TVE1hbnVhbEVkaXRSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKFwiXCIpO1xyXG4gICAgICBzZXREcmFmdEFtb3VudE1TVCh2YWx1ZSk7XHJcblxyXG4gICAgICBjb25zdCBhbW91bnQgPSByZXNvbHZlRHJhZnRMaW5lQW1vdW50KGRyYWZ0UHJpY2UsIGRyYWZ0UXR5KTtcclxuICAgICAgY29uc3QgYW1vdW50TVNUID0gcGFyc2VEZWNpbWFsSW5wdXQodmFsdWUpO1xyXG4gICAgICBjb25zdCBuZXh0RXhjaGFuZ2VSYXRlID1cclxuICAgICAgICBhbW91bnQgIT0gbnVsbCAmJiBhbW91bnRNU1QgIT0gbnVsbFxyXG4gICAgICAgICAgPyBjYWxjdWxhdGVFeHBlbnNlTGluZUV4Y2hhbmdlUmF0ZUZvckN1cnJlbmN5KFxyXG4gICAgICAgICAgICAgIGFtb3VudCxcclxuICAgICAgICAgICAgICBhbW91bnRNU1QsXHJcbiAgICAgICAgICAgICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICAgICAgbG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICAgICAgZHJhZnRFeGNoYW5nZVJhdGVcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgOiBpc0V4cGVuc2VMaW5lU2FtZVJlaW1idXJzZW1lbnRDdXJyZW5jeShkcmFmdEN1cnJlbmN5Q29kZSwgbG9jYWxDdXJyZW5jeUNvZGUpXHJcbiAgICAgICAgICAgID8gcmVzb2x2ZUV4cGVuc2VMaW5lRXhjaGFuZ2VSYXRlRm9yQ3VycmVuY3koZHJhZnRDdXJyZW5jeUNvZGUsIGxvY2FsQ3VycmVuY3lDb2RlLCBkcmFmdEV4Y2hhbmdlUmF0ZSlcclxuICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgICBpZiAobmV4dEV4Y2hhbmdlUmF0ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUoZm9ybWF0TGluZUV4Y2hhbmdlUmF0ZUlucHV0KG5leHRFeGNoYW5nZVJhdGUpKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgZHJhZnRBbW91bnRNU1QsXHJcbiAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgICAgZHJhZnRQcmljZSxcclxuICAgICAgZHJhZnRRdHksXHJcbiAgICAgIGZvcm1hdExpbmVFeGNoYW5nZVJhdGVJbnB1dCxcclxuICAgICAgbG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICAgIHJlc29sdmVEcmFmdExpbmVBbW91bnQsXHJcbiAgICAgIHNldERyYWZ0QW1vdW50TVNULFxyXG4gICAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCB7XHJcbiAgICBtb2RhbCxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gICAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICAgIG1vZGFsQ2FuY2VsVGV4dCxcclxuICAgIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgfSA9IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxDb25maXJtRGlhbG9nKHtcclxuICAgIGJ1c3ksXHJcbiAgICBtb2RhbEVycm9yLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFN0YXR1cyxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBoYW5kbGVVcGRhdGUsIGhhbmRsZURlbGV0ZSB9ID0gdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9ucyh7XHJcbiAgICBidXN5LFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNFZGl0TG9ja2VkOiBpc0xpbmVFZGl0TG9ja2VkLFxyXG4gICAgaXNEZWxldGVMb2NrZWQ6IGlzTGluZURlbGV0ZUxvY2tlZCxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6IGNhbkNyZWF0ZUV4cGVuc2VDdXJyZW50LFxyXG4gICAgY2FuRWRpdEV4cGVuc2U6IGNhbkVkaXRFeHBlbnNlQ3VycmVudCxcclxuICAgIGNhbkRlbGV0ZUV4cGVuc2U6IGNhbkRlbGV0ZUV4cGVuc2VDdXJyZW50LFxyXG4gICAgc2hlZXRJZCxcclxuICAgIGxpbmVJZCxcclxuICAgIGxpbmUsXHJcbiAgICBsaW5rZWRUaWNrZXRGaWxlSWQsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICBkcmFmdFR5cGVWYWx1ZUNvZGUsXHJcbiAgICBkcmFmdFByaWNlLFxyXG4gICAgZHJhZnRRdHksXHJcbiAgICBkcmFmdFByb2plY3RJZCxcclxuICAgIGRyYWZ0SW50ZXJuYXRpb25hbCxcclxuICAgIGRyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgZHJhZnRBbW91bnRNU1QsXHJcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIGxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgICBvbkludmFsaWREZXNjcmlwdGlvbjogZm9jdXNEZXNjcmlwdGlvbkZpZWxkLFxuICAgIG9uSW52YWxpZFR5cGU6IGZvY3VzVHlwZUZpZWxkLFxuICAgIG9uSW52YWxpZEFtb3VudFF0eTogZm9jdXNBbW91bnRGaWVsZHMsXG4gICAgb25DcmVhdGVTdWNjZXNzOiAoKSA9PiB7fSxcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGxpbmVUb3BiYXJBY3Rpb25Nb2RlID1cclxuICAgICFjYW5FZGl0RXhwZW5zZUN1cnJlbnQgJiYgIWNhbkRlbGV0ZUV4cGVuc2VDdXJyZW50XHJcbiAgICAgID8gXCJ2aWV3X29ubHlcIlxyXG4gICAgICA6IFwiZGVmYXVsdFwiO1xyXG5cclxuICBjb25zdCBoYW5kbGVDYW5jZWxMaW5lRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKFwiXCIpO1xyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCgpO1xyXG4gIH0sIFtoYW5kbGVDYW5jZWxFZGl0XSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUVkaXRMaW5rZWRUaWNrZXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWxpbmtlZFRpY2tldFJldHVybkNvbnRleHQpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICBmaWxlSWQ6IGxpbmtlZFRpY2tldFJldHVybkNvbnRleHQuZmlsZUlkLFxyXG4gICAgICBtb2RlOiBcImVkaXRcIixcclxuICAgIH0pO1xyXG4gICAgYXBwZW5kRXhwZW5zZVRpY2tldFJldHVyblF1ZXJ5KHF1ZXJ5LCBsaW5rZWRUaWNrZXRSZXR1cm5Db250ZXh0KTtcclxuICAgIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dChsaW5rZWRUaWNrZXRSZXR1cm5Db250ZXh0KTtcclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcclxuICAgIH0pO1xyXG4gIH0sIFtpc0VkaXRpbmcsIGxpbmtlZFRpY2tldFJldHVybkNvbnRleHRdKTtcclxuXHJcbiAgdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnMoe1xyXG4gICAgYnVzeTogYnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXHJcbiAgICBtb2RhbE9wZW46IG1vZGFsLm9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0xvY2tlZDogaXNTaGVldExvY2tlZCxcclxuICAgIGFjdGlvbk1vZGU6IGxpbmVUb3BiYXJBY3Rpb25Nb2RlLFxyXG4gICAgcGVybWlzc2lvbnNSZWFkeTogbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogY2FuQ3JlYXRlRXhwZW5zZUN1cnJlbnQsXHJcbiAgICBjYW5FZGl0RXhwZW5zZTogY2FuRWRpdEV4cGVuc2VDdXJyZW50LFxyXG4gICAgY2FuRGVsZXRlRXhwZW5zZTogY2FuRGVsZXRlRXhwZW5zZUN1cnJlbnQsXHJcbiAgICBzaGVldElkLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQ6IGhhc0xpbmtlZFRpY2tldCA/IGhhbmRsZUVkaXRMaW5rZWRUaWNrZXQgOiBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdDogaGFuZGxlQ2FuY2VsTGluZUVkaXQsXHJcbiAgICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBvblNhdmVTdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgICBzZXRJc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUodHJ1ZSk7XHJcbiAgICAgICAgbmF2aWdhdGVUb1NoZWV0RGV0YWlsKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xyXG4gICAgfSxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVPcGVuTGlua2VkVGlja2V0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFsaW5rZWRUaWNrZXRSZXR1cm5Db250ZXh0KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgZmlsZUlkOiBsaW5rZWRUaWNrZXRSZXR1cm5Db250ZXh0LmZpbGVJZCxcclxuICAgIH0pO1xyXG4gICAgYXBwZW5kRXhwZW5zZVRpY2tldFJldHVyblF1ZXJ5KHF1ZXJ5LCBsaW5rZWRUaWNrZXRSZXR1cm5Db250ZXh0KTtcclxuICAgIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dChsaW5rZWRUaWNrZXRSZXR1cm5Db250ZXh0KTtcclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcclxuICAgIH0pO1xyXG4gIH0sIFtpc0VkaXRpbmcsIGxpbmtlZFRpY2tldFJldHVybkNvbnRleHRdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkxpbmtlZFRpY2tldExpbmUgPSB1c2VDYWxsYmFjayhcclxuICAgICh0aWNrZXRMaW5lUmVjSWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICBpZiAoIWxpbmtlZFRpY2tldFJldHVybkNvbnRleHQpIHJldHVybjtcclxuICAgICAgY29uc3Qgc2FmZVRpY2tldExpbmVSZWNJZCA9IHNhZmVUZXh0KHRpY2tldExpbmVSZWNJZCk7XHJcbiAgICAgIGlmICghc2FmZVRpY2tldExpbmVSZWNJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICBmaWxlSWQ6IGxpbmtlZFRpY2tldFJldHVybkNvbnRleHQuZmlsZUlkLFxyXG4gICAgICAgIGxpbmVSZWNJZDogc2FmZVRpY2tldExpbmVSZWNJZCxcclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChpc0VkaXRpbmcpIHtcclxuICAgICAgICBxdWVyeS5zZXQoXCJtb2RlXCIsIFwiZWRpdFwiKTtcclxuICAgICAgfVxyXG4gICAgICBhcHBlbmRFeHBlbnNlVGlja2V0UmV0dXJuUXVlcnkocXVlcnksIGxpbmtlZFRpY2tldFJldHVybkNvbnRleHQpO1xyXG4gICAgICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQobGlua2VkVGlja2V0UmV0dXJuQ29udGV4dCk7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldExpbmVEZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcclxuICAgICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW2lzRWRpdGluZywgbGlua2VkVGlja2V0UmV0dXJuQ29udGV4dF1cclxuICApO1xyXG5cclxuICBjb25zdCBsaW5lTmF2aWdhdG9yTGFiZWxzID0gdXNlTWVtbyhcclxuICAgICgpID0+ICh7XHJcbiAgICAgIG5hdmlnYXRpb246IGluZFQoXCJSZWNvcmROYXZpZ2F0b3JfQXJpYUxhYmVsXCIsIFwiUmVjb3JkIG5hdmlnYXRpb25cIiksXHJcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXHJcbiAgICAgIHByZXZpb3VzOiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcclxuICAgICAgbmV4dDogaW5kVChcIkhpc3RvcnlfUGFnZV9OZXh0XCIsIFwiTmV4dFwiKSxcclxuICAgICAgbGFzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKSxcclxuICAgICAgcG9zaXRpb246IGluZEZvcm1hdChcclxuICAgICAgICBcIlJlY29yZE5hdmlnYXRvcl9Qb3NpdGlvblwiLFxyXG4gICAgICAgIFwiezB9IG9mIHsxfVwiLFxyXG4gICAgICAgIGxpbmVOYXZpZ2F0aW9uLmN1cnJlbnRJbmRleCxcclxuICAgICAgICBsaW5lTmF2aWdhdGlvbi50b3RhbExpbmVzXHJcbiAgICAgICksXHJcbiAgICB9KSxcclxuICAgIFtsaW5lTmF2aWdhdGlvbi5jdXJyZW50SW5kZXgsIGxpbmVOYXZpZ2F0aW9uLnRvdGFsTGluZXNdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTmF2aWdhdGVGaXJzdExpbmUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBuYXZpZ2F0ZVRvTGluZURldGFpbChsaW5lTmF2aWdhdGlvbi5maXJzdExpbmVJZCk7XHJcbiAgfSwgW2xpbmVOYXZpZ2F0aW9uLmZpcnN0TGluZUlkLCBuYXZpZ2F0ZVRvTGluZURldGFpbF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVOYXZpZ2F0ZVByZXZpb3VzTGluZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsKGxpbmVOYXZpZ2F0aW9uLnByZXZpb3VzTGluZUlkKTtcclxuICB9LCBbbGluZU5hdmlnYXRpb24ucHJldmlvdXNMaW5lSWQsIG5hdmlnYXRlVG9MaW5lRGV0YWlsXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU5hdmlnYXRlTmV4dExpbmUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBuYXZpZ2F0ZVRvTGluZURldGFpbChsaW5lTmF2aWdhdGlvbi5uZXh0TGluZUlkKTtcclxuICB9LCBbbGluZU5hdmlnYXRpb24ubmV4dExpbmVJZCwgbmF2aWdhdGVUb0xpbmVEZXRhaWxdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTmF2aWdhdGVMYXN0TGluZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsKGxpbmVOYXZpZ2F0aW9uLmxhc3RMaW5lSWQpO1xyXG4gIH0sIFtsaW5lTmF2aWdhdGlvbi5sYXN0TGluZUlkLCBuYXZpZ2F0ZVRvTGluZURldGFpbF0pO1xyXG5cclxuICBjb25zdCBsaW5lTmF2aWdhdG9yID1cclxuICAgICFpc0NyZWF0ZU1vZGUgJiYgbGluZSAmJiBsaW5lTmF2aWdhdGlvbi50b3RhbExpbmVzID4gMSA/IChcclxuICAgICAgPFJlY29yZE5hdmlnYXRvclxyXG4gICAgICAgIGN1cnJlbnRJbmRleD17bGluZU5hdmlnYXRpb24uY3VycmVudEluZGV4fVxyXG4gICAgICAgIHRvdGFsSXRlbXM9e2xpbmVOYXZpZ2F0aW9uLnRvdGFsTGluZXN9XHJcbiAgICAgICAgbGFiZWxzPXtsaW5lTmF2aWdhdG9yTGFiZWxzfVxyXG4gICAgICAgIGRpc2FibGVkPXtpc0xvYWRpbmcgfHwgYnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGV9XHJcbiAgICAgICAgdmFyaWFudD1cImNvbXBhY3RcIlxyXG4gICAgICAgIG9uRmlyc3Q9e2hhbmRsZU5hdmlnYXRlRmlyc3RMaW5lfVxyXG4gICAgICAgIG9uUHJldmlvdXM9e2hhbmRsZU5hdmlnYXRlUHJldmlvdXNMaW5lfVxyXG4gICAgICAgIG9uTmV4dD17aGFuZGxlTmF2aWdhdGVOZXh0TGluZX1cclxuICAgICAgICBvbkxhc3Q9e2hhbmRsZU5hdmlnYXRlTGFzdExpbmV9XHJcbiAgICAgIC8+XHJcbiAgICApIDogbnVsbDtcclxuXHJcbiAgY29uc3QgbGlua2VkVGlja2V0TGluZXNTZWN0aW9uID1cclxuICAgIHNob3dMaW5rZWRUaWNrZXRMaW5lcyA/IChcclxuICAgICAgbGlua2VkVGlja2V0RGV0YWlsLmlzTG9hZGluZyA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXppbmMtNzAwXCI+XHJcbiAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIHNpemUtNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XHJcbiAgICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IGxpbmtlZFRpY2tldERldGFpbC5lcnJvck1lc3NhZ2UgPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntsaW5rZWRUaWNrZXREZXRhaWwuZXJyb3JNZXNzYWdlfTwvZGl2PlxyXG4gICAgICApIDogKFxyXG4gICAgICAgIDxFeHBlbnNlVGlja2V0TGluZXNMaXN0XHJcbiAgICAgICAgICB2aXNpYmxlTGluZXM9e3Zpc2libGVMaW5rZWRUaWNrZXRMaW5lc31cclxuICAgICAgICAgIHRvdGFsTGluZVBhZ2VzPXt0b3RhbExpbmtlZFRpY2tldExpbmVQYWdlc31cclxuICAgICAgICAgIGxpbmVQYWdlPXtsaW5rZWRUaWNrZXRMaW5lUGFnZX1cclxuICAgICAgICAgIGN1cnJlbmN5Q29kZT17c2FmZVRleHQobGlua2VkVGlja2V0RGV0YWlsLmhlYWRlcj8uY3VycmVuY3lDb2RlKSB8fCBlZmZlY3RpdmVMaW5lQ3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgcGFnaW5hdGlvbkxhYmVscz17bGlua2VkVGlja2V0TGluZVBhZ2luYXRpb25MYWJlbHN9XHJcbiAgICAgICAgICBjb250YWluZXJSZWY9e2xpbmtlZFRpY2tldExpbmVDb250YWluZXJSZWZ9XHJcbiAgICAgICAgICBvbkxpbmVQYWdlQ2hhbmdlPXtoYW5kbGVMaW5rZWRUaWNrZXRMaW5lUGFnZUNoYW5nZX1cclxuICAgICAgICAgIG9uT3BlbkxpbmU9e2hhbmRsZU9wZW5MaW5rZWRUaWNrZXRMaW5lfVxyXG4gICAgICAgIC8+XHJcbiAgICAgIClcclxuICAgICkgOiBudWxsO1xyXG5cclxuICBjb25zdCBkZXRhaWxCb2R5ID1cclxuICAgICFpc0xvYWRpbmcgJiYgIWlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhZXJyb3JNZXNzYWdlICYmIGxpbmUgPyAoXHJcbiAgICAgIDw+XHJcbiAgICAgICAgPEV4cGVuc2VTaGVldExpbmVGb3JtXHJcbiAgICAgICAgICBsaW5lPXtsaW5lfVxyXG4gICAgICAgICAgZmFsbGJhY2tEYXRlPXtzYWZlVGV4dChoZWFkZXI/LmNyZWF0ZWREYXRlKX1cclxuICAgICAgICAgIHNoZWV0RGVzY3JpcHRpb249e3NoZWV0RGVzY3JpcHRpb259XHJcbiAgICAgICAgICBwcm9qZWN0VmFsdWU9e3Byb2plY3RWYWx1ZX1cclxuICAgICAgICAgIHByaWNlVGV4dD17cHJpY2VUZXh0fVxyXG4gICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cclxuICAgICAgICAgIGRyYWZ0QW1vdW50Q3VycmVuY3k9e2RyYWZ0QW1vdW50Q3VycmVuY3l9XHJcbiAgICAgICAgICBhbW91bnRNU1RUZXh0PXthbW91bnRNU1RUZXh0fVxyXG4gICAgICAgICAgaW50ZXJuYWNpb25hbExhYmVsPXtpbnRlcm5hY2lvbmFsTGFiZWx9XHJcbiAgICAgICAgICBpc0ttVHlwZT17aXNLbVR5cGV9XHJcbiAgICAgICAgICBpc0Z1ZWxQcmljZUxvYWRpbmc9e2lzRnVlbFByaWNlTG9hZGluZ31cclxuICAgICAgICAgIGZ1ZWxQcmljZU1lc3NhZ2U9e2Z1ZWxQcmljZU1lc3NhZ2V9XHJcbiAgICAgICAgICBmdWVsUHJpY2VNZXNzYWdlSXNFcnJvcj17ZnVlbFByaWNlTWVzc2FnZUlzRXJyb3J9XHJcbiAgICAgICAgICBpc0VkaXRpbmc9e2lzRWRpdGluZ31cclxuICAgICAgICAgIGdhc3RvVHlwZU9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XHJcbiAgICAgICAgICBpbnRlcm5hdGlvbmFsT3B0aW9ucz17aW50ZXJuYXRpb25hbE9wdGlvbnN9XHJcbiAgICAgICAgICBkcmFmdERlc2NyaXB0aW9uPXtkcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgZHJhZnRUcmFuc0RhdGU9e2RyYWZ0VHJhbnNEYXRlfVxyXG4gICAgICAgICAgZHJhZnRUeXBlVmFsdWVDb2RlPXtkcmFmdFR5cGVWYWx1ZUNvZGV9XHJcbiAgICAgICAgICBkcmFmdFByaWNlPXtkcmFmdFByaWNlfVxyXG4gICAgICAgICAgZHJhZnRRdHk9e2RyYWZ0UXR5fVxyXG4gICAgICAgICAgZHJhZnRQcm9qZWN0SWQ9e2RyYWZ0UHJvamVjdElkfVxyXG4gICAgICAgICAgZHJhZnRJbnRlcm5hdGlvbmFsPXtkcmFmdEludGVybmF0aW9uYWx9XHJcbiAgICAgICAgICBkcmFmdFJlaW1idXJzYWJsZUV4cGVuc2U9e2RyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZX1cclxuICAgICAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlPXtkcmFmdEN1cnJlbmN5Q29kZX1cclxuICAgICAgICAgIGRyYWZ0QW1vdW50TVNUPXtkcmFmdEFtb3VudE1TVH1cclxuICAgICAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlPXtkcmFmdEV4Y2hhbmdlUmF0ZX1cclxuICAgICAgICAgIGxvY2FsQ3VycmVuY3lDb2RlPXtsb2NhbEN1cnJlbmN5Q29kZX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZT17ZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2V9XG4gICAgICAgICAgZGVzY3JpcHRpb25JbnB1dFJlZj17ZGVzY3JpcHRpb25JbnB1dFJlZn1cbiAgICAgICAgICB0eXBlSW5wdXRSZWY9e3R5cGVJbnB1dFJlZn1cbiAgICAgICAgICBwcmljZUlucHV0UmVmPXtwcmljZUlucHV0UmVmfVxuICAgICAgICAgIHF0eUlucHV0UmVmPXtxdHlJbnB1dFJlZn1cbiAgICAgICAgICBkZXNjcmlwdGlvbkludmFsaWQ9e2Rlc2NyaXB0aW9uSW52YWxpZH1cbiAgICAgICAgICB0eXBlSW52YWxpZD17dHlwZUludmFsaWR9XG4gICAgICAgICAgcHJpY2VJbnZhbGlkPXtwcmljZUludmFsaWR9XG4gICAgICAgICAgcXR5SW52YWxpZD17cXR5SW52YWxpZH1cbiAgICAgICAgICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U9e2hhbmRsZURyYWZ0RGVzY3JpcHRpb25DaGFuZ2V9XG4gICAgICAgICAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZT17aGFuZGxlTGluZVRyYW5zRGF0ZUNoYW5nZX1cbiAgICAgICAgICBvbkRyYWZ0VHlwZVZhbHVlQ29kZUNoYW5nZT17aGFuZGxlRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlfVxyXG4gICAgICAgICAgb25EcmFmdFByaWNlQ2hhbmdlPXtoYW5kbGVMaW5lUHJpY2VDaGFuZ2V9XHJcbiAgICAgICAgICBvbkRyYWZ0UXR5Q2hhbmdlPXtoYW5kbGVMaW5lUXR5Q2hhbmdlfVxyXG4gICAgICAgICAgb25EcmFmdEFtb3VudEN1cnJlbmN5Q2hhbmdlPXtoYW5kbGVMaW5lQW1vdW50Q3VycmVuY3lDaGFuZ2V9XHJcbiAgICAgICAgICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlPXtzZXREcmFmdFByb2plY3RJZH1cclxuICAgICAgICAgIG9uRHJhZnRJbnRlcm5hdGlvbmFsQ2hhbmdlPXtzZXREcmFmdEludGVybmF0aW9uYWx9XHJcbiAgICAgICAgICBvbkRyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZT17c2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlfVxyXG4gICAgICAgICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZT17aGFuZGxlTGluZUN1cnJlbmN5Q2hhbmdlfVxyXG4gICAgICAgICAgb25EcmFmdEFtb3VudE1TVENoYW5nZT17aGFuZGxlTGluZUFtb3VudE1TVENoYW5nZX1cclxuICAgICAgICAgIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U9e2hhbmRsZUxpbmVFeGNoYW5nZVJhdGVDaGFuZ2V9XHJcbiAgICAgICAgICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ29tbWl0PXtoYW5kbGVMaW5lRXhjaGFuZ2VSYXRlQ29tbWl0fVxyXG4gICAgICAgICAgbGlua2VkVGlja2V0RmlsZUlkPXtsaW5rZWRUaWNrZXRGaWxlSWR9XHJcbiAgICAgICAgICBzaG93TGlua2VkVGlja2V0RmllbGQ9e2hhc0xpbmtlZFRpY2tldH1cclxuICAgICAgICAgIG9uT3BlbkxpbmtlZFRpY2tldD17aGFuZGxlT3BlbkxpbmtlZFRpY2tldH1cclxuICAgICAgICAvPlxyXG4gICAgICAgIHtsaW5rZWRUaWNrZXRMaW5lc1NlY3Rpb259XHJcbiAgICAgIDwvPlxyXG4gICAgKSA6IG51bGw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8RXhwZW5zZVNoZWV0TGluZURldGFpbFZpZXdcclxuICAgICAgbW9kYWw9e3tcclxuICAgICAgICBvcGVuOiBtb2RhbC5vcGVuLFxyXG4gICAgICAgIHRpdGxlOiBtb2RhbC50aXRsZSxcclxuICAgICAgICBtZXNzYWdlOiBtb2RhbC5tZXNzYWdlLFxyXG4gICAgICAgIGNvbmZpcm1UZXh0OiBtb2RhbENvbmZpcm1UZXh0LFxyXG4gICAgICAgIGNhbmNlbFRleHQ6IG1vZGFsQ2FuY2VsVGV4dCxcclxuICAgICAgICBsb2FkaW5nVGV4dDogbW9kYWxMb2FkaW5nVGV4dCxcclxuICAgICAgICBzaG93Q2FuY2VsOiBtb2RhbC5zaG93Q2FuY2VsLFxyXG4gICAgICAgIHNob3dDb25maXJtOiBtb2RhbC5zaG93Q29uZmlybSxcclxuICAgICAgICBidXN5OiBidXN5IHx8IGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSxcclxuICAgICAgICBlcnJvcjogbW9kYWxFcnJvcixcclxuICAgICAgICBzdGF0dXMsXHJcbiAgICAgICAgb25Db25maXJtOiBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgICAgICAgb25DYW5jZWw6IGNsb3NlQ29uZmlybSxcclxuICAgICAgfX1cclxuICAgICAgcHJldmlldz17e1xyXG4gICAgICAgIG9wZW46IHByZXZpZXdPcGVuLFxyXG4gICAgICAgIGJ1c3k6IHByZXZpZXdCdXN5LFxyXG4gICAgICAgIGVycm9yOiBwcmV2aWV3RXJyb3IsXHJcbiAgICAgICAgaW1hZ2VVcmw6IHByZXZpZXdJbWFnZVVybCxcclxuICAgICAgICBpbWFnZUFsdDogcHJldmlld0FsdFRleHQsXHJcbiAgICAgICAgZmlsZU5hbWU6IHByZXZpZXdGaWxlTmFtZSxcclxuICAgICAgICBzY2FsZTogcHJldmlld1NjYWxlLFxyXG4gICAgICAgIHRyYW5zbGF0ZTogcHJldmlld1RyYW5zbGF0ZSxcclxuICAgICAgICBzdXJmYWNlUmVmOiBwcmV2aWV3U3VyZmFjZVJlZixcclxuICAgICAgICBzaG93U3RpY2t5UHJldmlldyxcclxuICAgICAgICBvbk9wZW46IG9wZW5QcmV2aWV3LFxyXG4gICAgICAgIG9uQ2xvc2U6IGNsb3NlUHJldmlldyxcclxuICAgICAgICBvblBvaW50ZXJEb3duOiBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24sXHJcbiAgICAgICAgb25Qb2ludGVyTW92ZTogaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlLFxyXG4gICAgICAgIG9uUG9pbnRlckVuZDogaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXHJcbiAgICAgIH19XHJcbiAgICAgIGNvbnRlbnQ9e3tcclxuICAgICAgICBpc0xvYWRpbmcsXHJcbiAgICAgICAgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLFxyXG4gICAgICAgIGVycm9yTWVzc2FnZSxcclxuICAgICAgICBsaW5lTmF2aWdhdG9yLFxyXG4gICAgICAgIGRldGFpbEJvZHksXHJcbiAgICAgIH19XHJcbiAgICAvPlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2Ugc2hlZXQgbGluZSBkZXRhaWwuXHJcbmNvbnN0IEV4cGVuc2VTaGVldExpbmVEZXRhaWxQYWdlID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnMgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQ+XHJcbiAgICAgIDxFeHBlbnNlU2hlZXRMaW5lRGV0YWlsQ29udGVudCAvPlxyXG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cclxuICApO1xyXG59O1xyXG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XHJcbiAgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGgoKTtcclxuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2UtbGluZS1kZXRhaWwtcm9vdFwiKTtcclxuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xyXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVNoZWV0TGluZURldGFpbFBhZ2UgLz4pO1xyXG59O1xyXG5cclxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXRMaW5lRGV0YWlsUGFnZTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHtcclxuICBDaGV2cm9uRG91YmxlTGVmdEljb24sXHJcbiAgQ2hldnJvbkRvdWJsZVJpZ2h0SWNvbixcclxuICBDaGV2cm9uTGVmdEljb24sXHJcbiAgQ2hldnJvblJpZ2h0SWNvbixcclxufSBmcm9tIFwiQGhlcm9pY29ucy9yZWFjdC8yNC9vdXRsaW5lXCI7XHJcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xyXG5cclxudHlwZSBSZWNvcmROYXZpZ2F0b3JMYWJlbHMgPSB7XHJcbiAgbmF2aWdhdGlvbjogc3RyaW5nO1xyXG4gIGZpcnN0OiBzdHJpbmc7XHJcbiAgcHJldmlvdXM6IHN0cmluZztcclxuICBuZXh0OiBzdHJpbmc7XHJcbiAgbGFzdDogc3RyaW5nO1xyXG4gIHBvc2l0aW9uOiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFJlY29yZE5hdmlnYXRvclZhcmlhbnQgPSBcInN0YW5kYXJkXCIgfCBcImNvbXBhY3RcIjtcclxuXHJcbnR5cGUgUmVjb3JkTmF2aWdhdG9yUHJvcHMgPSB7XHJcbiAgY3VycmVudEluZGV4OiBudW1iZXI7XHJcbiAgdG90YWxJdGVtczogbnVtYmVyO1xyXG4gIGxhYmVsczogUmVjb3JkTmF2aWdhdG9yTGFiZWxzO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICB2YXJpYW50PzogUmVjb3JkTmF2aWdhdG9yVmFyaWFudDtcclxuICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgb25GaXJzdDogKCkgPT4gdm9pZDtcclxuICBvblByZXZpb3VzOiAoKSA9PiB2b2lkO1xyXG4gIG9uTmV4dDogKCkgPT4gdm9pZDtcclxuICBvbkxhc3Q6ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG50eXBlIFJlY29yZE5hdmlnYXRvckJ1dHRvblByb3BzID0ge1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgaWNvbjogUmVhY3QuQ29tcG9uZW50VHlwZTxSZWFjdC5Db21wb25lbnRQcm9wczxcInN2Z1wiPj47XHJcbiAgb25DbGljazogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIEljb24tb25seSBjb250cm9sIGZvciB0aGUgc2hhcmVkIHJlY29yZCBuYXZpZ2F0b3IuXHJcbmNvbnN0IFJlY29yZE5hdmlnYXRvckJ1dHRvbiA9ICh7IGxhYmVsLCBkaXNhYmxlZCwgaWNvbjogSWNvbiwgb25DbGljayB9OiBSZWNvcmROYXZpZ2F0b3JCdXR0b25Qcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8YnV0dG9uXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgXCJpbmxpbmUtZmxleCBoLTExIHctMTEgc2hyaW5rLTAgdG91Y2gtbWFuaXB1bGF0aW9uIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVs1cHhdIGJvcmRlci0wIGJnLXRyYW5zcGFyZW50IHRleHQtcHJpbWFyeS84MCB0cmFuc2l0aW9uXCIsXG4gICAgICAgIFwiZm9jdXMtdmlzaWJsZTpvdXRsaW5lLWhpZGRlbiBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctcHJpbWFyeS8zMCBmb2N1cy12aXNpYmxlOnJpbmctb2Zmc2V0LTBcIixcbiAgICAgICAgZGlzYWJsZWQgPyBcImN1cnNvci1ub3QtYWxsb3dlZCB0ZXh0LXByaW1hcnkvMjVcIiA6IFwiaG92ZXI6YmctcHJpbWFyeS84IGhvdmVyOnRleHQtcHJpbWFyeSBhY3RpdmU6YmctcHJpbWFyeS8xMFwiXG4gICAgICApfVxuICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XHJcbiAgICAgIHRpdGxlPXtsYWJlbH1cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuO1xyXG4gICAgICAgIG9uQ2xpY2soKTtcclxuICAgICAgfX1cbiAgICA+XG4gICAgICA8SWNvbiBjbGFzc05hbWU9XCJoLTYgdy02XCIgc3Ryb2tlV2lkdGg9ezEuOH0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICA8L2J1dHRvbj5cbiAgKTtcbn07XG5cclxuLy8gRHVtYiByZWNvcmQtdG8tcmVjb3JkIG5hdmlnYXRvciB3aXRoIGZpeGVkIGNvbnRyb2xzIGFuZCBjYWxsZXItb3duZWQgbmF2aWdhdGlvbiBzdGF0ZS5cclxuY29uc3QgUmVjb3JkTmF2aWdhdG9yID0gKHtcclxuICBjdXJyZW50SW5kZXgsXHJcbiAgdG90YWxJdGVtcyxcclxuICBsYWJlbHMsXHJcbiAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICB2YXJpYW50ID0gXCJzdGFuZGFyZFwiLFxyXG4gIGNsYXNzTmFtZSxcclxuICBvbkZpcnN0LFxyXG4gIG9uUHJldmlvdXMsXHJcbiAgb25OZXh0LFxyXG4gIG9uTGFzdCxcclxufTogUmVjb3JkTmF2aWdhdG9yUHJvcHMpID0+IHtcclxuICBjb25zdCBzYWZlVG90YWwgPSBNYXRoLm1heCgwLCB0b3RhbEl0ZW1zIHx8IDApO1xyXG4gIGNvbnN0IHNhZmVDdXJyZW50ID0gTWF0aC5taW4oTWF0aC5tYXgoMSwgY3VycmVudEluZGV4IHx8IDEpLCBzYWZlVG90YWwgfHwgMSk7XHJcbiAgaWYgKHNhZmVUb3RhbCA8PSAxKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgYXRGaXJzdCA9IHNhZmVDdXJyZW50IDw9IDE7XHJcbiAgY29uc3QgYXRMYXN0ID0gc2FmZUN1cnJlbnQgPj0gc2FmZVRvdGFsO1xyXG4gIGNvbnN0IGRpc2FibGVGaXJzdCA9IGRpc2FibGVkIHx8IGF0Rmlyc3Q7XG4gIGNvbnN0IGRpc2FibGVQcmV2aW91cyA9IGRpc2FibGVkIHx8IGF0Rmlyc3Q7XG4gIGNvbnN0IGRpc2FibGVOZXh0ID0gZGlzYWJsZWQgfHwgYXRMYXN0O1xuICBjb25zdCBkaXNhYmxlTGFzdCA9IGRpc2FibGVkIHx8IGF0TGFzdDtcbiAgY29uc3Qgc3BhY2luZ0NsYXNzTmFtZSA9IHZhcmlhbnQgPT09IFwiY29tcGFjdFwiID8gXCJoLVs2NHB4XSBweC0zIHB5LTBcIiA6IFwibWluLWgtMTIgcHgtMyBweS0xLjVcIjtcblxyXG4gIHJldHVybiAoXHJcbiAgICA8bmF2XHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICBcImdyaWQgZ3JpZC1jb2xzLVsxZnJfYXV0b18xZnJdIGl0ZW1zLWNlbnRlciBiZy10cmFuc3BhcmVudCBmb250LXNhbnMgdGV4dC1wcmltYXJ5XCIsXHJcbiAgICAgICAgc3BhY2luZ0NsYXNzTmFtZSxcclxuICAgICAgICBjbGFzc05hbWUgfHwgXCJcIlxyXG4gICAgICApfVxyXG4gICAgICBhcmlhLWxhYmVsPXtsYWJlbHMubmF2aWdhdGlvbn1cclxuICAgID5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LXN0YXJ0IGdhcC0yXCI+XHJcbiAgICAgICAgPFJlY29yZE5hdmlnYXRvckJ1dHRvbiBsYWJlbD17bGFiZWxzLmZpcnN0fSBkaXNhYmxlZD17ZGlzYWJsZUZpcnN0fSBpY29uPXtDaGV2cm9uRG91YmxlTGVmdEljb259IG9uQ2xpY2s9e29uRmlyc3R9IC8+XHJcbiAgICAgICAgPFJlY29yZE5hdmlnYXRvckJ1dHRvbiBsYWJlbD17bGFiZWxzLnByZXZpb3VzfSBkaXNhYmxlZD17ZGlzYWJsZVByZXZpb3VzfSBpY29uPXtDaGV2cm9uTGVmdEljb259IG9uQ2xpY2s9e29uUHJldmlvdXN9IC8+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4tdy1bN3JlbV0gdGV4dC1jZW50ZXIgdGV4dC1iYXNlIGZvbnQtYm9sZCBsZWFkaW5nLW5vbmUgdGV4dC1wcmltYXJ5XCIgYXJpYS1saXZlPVwicG9saXRlXCI+XG4gICAgICAgIHtsYWJlbHMucG9zaXRpb259XG4gICAgICA8L2Rpdj5cblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktZW5kIGdhcC0yXCI+XHJcbiAgICAgICAgPFJlY29yZE5hdmlnYXRvckJ1dHRvbiBsYWJlbD17bGFiZWxzLm5leHR9IGRpc2FibGVkPXtkaXNhYmxlTmV4dH0gaWNvbj17Q2hldnJvblJpZ2h0SWNvbn0gb25DbGljaz17b25OZXh0fSAvPlxyXG4gICAgICAgIDxSZWNvcmROYXZpZ2F0b3JCdXR0b24gbGFiZWw9e2xhYmVscy5sYXN0fSBkaXNhYmxlZD17ZGlzYWJsZUxhc3R9IGljb249e0NoZXZyb25Eb3VibGVSaWdodEljb259IG9uQ2xpY2s9e29uTGFzdH0gLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L25hdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgeyBSZWNvcmROYXZpZ2F0b3JMYWJlbHMsIFJlY29yZE5hdmlnYXRvclByb3BzIH07XHJcbmV4cG9ydCBkZWZhdWx0IFJlY29yZE5hdmlnYXRvcjtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCBTaW5nbGVEYXRlUGlja2VyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2luZ2xlRGF0ZVBpY2tlci50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0TGluZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyLCBmb3JtYXRFeHBlbnNlTnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQgZnJvbSBcIi4vRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VSZWFkT25seUZpZWxkIGZyb20gXCIuL0V4cGVuc2VSZWFkT25seUZpZWxkLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5U2V0dGxlbWVudEZpZWxkcyBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lTZXR0bGVtZW50RmllbGRzLnRzeFwiO1xyXG5pbXBvcnQge1xyXG4gIGdldEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZUxhYmVsLFxyXG4gIGdldEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZU9wdGlvbnMsXHJcbiAgbm9ybWFsaXplRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlLFxyXG59IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2VDYXRhbG9nLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VTaGVldExpbmVGb3JtUHJvcHMgPSB7XHJcbiAgbGluZTogRXhwZW5zZVNoZWV0TGluZTtcclxuICBmYWxsYmFja0RhdGU6IHN0cmluZztcclxuICBzaGVldERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgcHJvamVjdFZhbHVlOiBzdHJpbmc7XHJcbiAgcHJpY2VUZXh0OiBzdHJpbmc7XHJcbiAgYW1vdW50VGV4dDogc3RyaW5nO1xyXG4gIGRyYWZ0QW1vdW50Q3VycmVuY3k6IHN0cmluZztcclxuICBhbW91bnRNU1RUZXh0OiBzdHJpbmc7XHJcbiAgaW50ZXJuYWNpb25hbExhYmVsOiBzdHJpbmc7XHJcbiAgaXNLbVR5cGU6IGJvb2xlYW47XHJcbiAgaXNGdWVsUHJpY2VMb2FkaW5nOiBib29sZWFuO1xyXG4gIGZ1ZWxQcmljZU1lc3NhZ2U6IHN0cmluZztcclxuICBmdWVsUHJpY2VNZXNzYWdlSXNFcnJvcjogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgZ2FzdG9UeXBlT3B0aW9uczogRXhwZW5zZVNlbGVjdE9wdGlvbltdO1xyXG4gIGludGVybmF0aW9uYWxPcHRpb25zOiBFeHBlbnNlU2VsZWN0T3B0aW9uW107XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgZHJhZnRUeXBlVmFsdWVDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRQcmljZTogc3RyaW5nO1xyXG4gIGRyYWZ0UXR5OiBzdHJpbmc7XHJcbiAgZHJhZnRQcm9qZWN0SWQ6IHN0cmluZztcclxuICBkcmFmdEludGVybmF0aW9uYWw6IHN0cmluZztcclxuICBkcmFmdFJlaW1idXJzYWJsZUV4cGVuc2U6IG51bWJlciB8IG51bGw7XHJcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBkcmFmdEFtb3VudE1TVDogc3RyaW5nO1xyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlOiBzdHJpbmc7XHJcbiAgbG9jYWxDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZTogc3RyaW5nO1xyXG4gIGxpbmtlZFRpY2tldEZpbGVJZDogc3RyaW5nO1xuICBzaG93TGlua2VkVGlja2V0RmllbGQ6IGJvb2xlYW47XG4gIGRlc2NyaXB0aW9uSW5wdXRSZWY/OiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XG4gIHR5cGVJbnB1dFJlZj86IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcbiAgcHJpY2VJbnB1dFJlZj86IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcbiAgcXR5SW5wdXRSZWY/OiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XG4gIGRlc2NyaXB0aW9uSW52YWxpZD86IGJvb2xlYW47XG4gIHR5cGVJbnZhbGlkPzogYm9vbGVhbjtcbiAgcHJpY2VJbnZhbGlkPzogYm9vbGVhbjtcbiAgcXR5SW52YWxpZD86IGJvb2xlYW47XG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRQcmljZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdFF0eUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdEFtb3VudEN1cnJlbmN5Q2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0SW50ZXJuYXRpb25hbENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdFJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2U6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRBbW91bnRNU1RDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDb21taXQ/OiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbk9wZW5MaW5rZWRUaWNrZXQ6ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXRRdHlWYWx1ZSA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VOdW1iZXIodmFsdWUsIHtcclxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgZmFsbGJhY2s6IFwiLVwiLFxyXG4gIH0pO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlU2hlZXRMaW5lQ3VycmVuY3lGaWVsZHNQcm9wcyA9IHtcclxuICBsaW5lOiBFeHBlbnNlU2hlZXRMaW5lO1xyXG4gIGFtb3VudFRleHQ6IHN0cmluZztcclxuICBkcmFmdEFtb3VudEN1cnJlbmN5OiBzdHJpbmc7XHJcbiAgYW1vdW50TVNUVGV4dDogc3RyaW5nO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0QW1vdW50TVNUOiBzdHJpbmc7XHJcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcclxuICBsb2NhbEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlOiBzdHJpbmc7XHJcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdEFtb3VudEN1cnJlbmN5Q2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0QW1vdW50TVNUQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ29tbWl0PzogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIHBlci1saW5lIGN1cnJlbmN5IGFuZCByZWltYnVyc2VtZW50IGNvbnRyb2xzLlxyXG5jb25zdCBFeHBlbnNlU2hlZXRMaW5lQ3VycmVuY3lGaWVsZHMgPSAoe1xyXG4gIGxpbmUsXHJcbiAgYW1vdW50VGV4dCxcclxuICBkcmFmdEFtb3VudEN1cnJlbmN5LFxyXG4gIGFtb3VudE1TVFRleHQsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0QW1vdW50TVNULFxyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIGxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlLFxyXG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2UsXHJcbiAgb25EcmFmdEFtb3VudEN1cnJlbmN5Q2hhbmdlLFxyXG4gIG9uRHJhZnRBbW91bnRNU1RDaGFuZ2UsXHJcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZSxcclxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ29tbWl0LFxyXG59OiBFeHBlbnNlU2hlZXRMaW5lQ3VycmVuY3lGaWVsZHNQcm9wcykgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRFeHBlbnNlQ3VycmVuY3lDb2RlID0gc2FmZVRleHQoaXNFZGl0aW5nID8gZHJhZnRDdXJyZW5jeUNvZGUgOiBsaW5lLmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBleGNoYW5nZVJhdGVWYWx1ZSA9IGlzRWRpdGluZ1xyXG4gICAgPyBkcmFmdEV4Y2hhbmdlUmF0ZVxyXG4gICAgOiBmb3JtYXRFeHBlbnNlTnVtYmVyKGxpbmUuZXhjaFJhdGUgPz8gbnVsbCwge1xyXG4gICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogNyxcclxuICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDcsXHJcbiAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICAgICAgZmFsbGJhY2s6IFwiLVwiLFxyXG4gICAgICB9KTtcclxuICBjb25zdCByZWltYnVyc2VtZW50QW1vdW50VmFsdWUgPSBpc0VkaXRpbmcgPyBkcmFmdEFtb3VudE1TVCA6IGFtb3VudE1TVFRleHQgfHwgXCItXCI7XHJcbiAgY29uc3QgYW1vdW50Q3VycmVuY3lFZGl0YWJsZSA9IGlzRWRpdGluZyAmJiBsaW5lLnRpY2tldCAhPT0gdHJ1ZTtcclxuICBjb25zdCBhbW91bnRDdXJyZW5jeVZhbHVlID0gYW1vdW50Q3VycmVuY3lFZGl0YWJsZSA/IGRyYWZ0QW1vdW50Q3VycmVuY3kgOiBhbW91bnRUZXh0IHx8IFwiLVwiO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEV4cGVuc2VDdXJyZW5jeVNldHRsZW1lbnRGaWVsZHNcclxuICAgICAgaXNFZGl0aW5nPXtpc0VkaXRpbmd9XHJcbiAgICAgIGV4cGVuc2VDdXJyZW5jeUNvZGU9e25vcm1hbGl6ZWRFeHBlbnNlQ3VycmVuY3lDb2RlfVxyXG4gICAgICBsb2NhbEN1cnJlbmN5Q29kZT17bG9jYWxDdXJyZW5jeUNvZGV9XHJcbiAgICAgIGV4Y2hhbmdlUmF0ZT17ZXhjaGFuZ2VSYXRlVmFsdWV9XHJcbiAgICAgIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlPXtleGNoYW5nZVJhdGVJbmZvTWVzc2FnZX1cclxuICAgICAgYW1vdW50Q3VycmVuY3k9e2Ftb3VudEN1cnJlbmN5VmFsdWV9XHJcbiAgICAgIGFtb3VudEN1cnJlbmN5TW9kZT17YW1vdW50Q3VycmVuY3lFZGl0YWJsZSA/IFwiZWRpdGFibGVcIiA6IFwicmVhZG9ubHlcIn1cclxuICAgICAgcmVpbWJ1cnNlbWVudEFtb3VudD17cmVpbWJ1cnNlbWVudEFtb3VudFZhbHVlfVxyXG4gICAgICBvbkV4cGVuc2VDdXJyZW5jeUNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cclxuICAgICAgb25BbW91bnRDdXJyZW5jeUNoYW5nZT17b25EcmFmdEFtb3VudEN1cnJlbmN5Q2hhbmdlfVxyXG4gICAgICBvbkV4Y2hhbmdlUmF0ZUNoYW5nZT17b25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZX1cclxuICAgICAgb25FeGNoYW5nZVJhdGVDb21taXQ9e29uRHJhZnRFeGNoYW5nZVJhdGVDb21taXR9XHJcbiAgICAgIG9uUmVpbWJ1cnNlbWVudEFtb3VudENoYW5nZT17b25EcmFmdEFtb3VudE1TVENoYW5nZX1cclxuICAgIC8+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIFB1cmUgZm9ybSByZW5kZXJlciBmb3IgZXhwZW5zZSBsaW5lIGRldGFpbCBpbiByZWFkIGFuZCBlZGl0IG1vZGVzLlxyXG5jb25zdCBFeHBlbnNlU2hlZXRMaW5lRm9ybSA9ICh7XHJcbiAgbGluZSxcclxuICBmYWxsYmFja0RhdGUsXHJcbiAgc2hlZXREZXNjcmlwdGlvbjogX3NoZWV0RGVzY3JpcHRpb24sXHJcbiAgcHJvamVjdFZhbHVlLFxyXG4gIHByaWNlVGV4dCxcclxuICBhbW91bnRUZXh0LFxyXG4gIGRyYWZ0QW1vdW50Q3VycmVuY3ksXHJcbiAgYW1vdW50TVNUVGV4dCxcclxuICBpbnRlcm5hY2lvbmFsTGFiZWwsXHJcbiAgaXNLbVR5cGUsXHJcbiAgaXNGdWVsUHJpY2VMb2FkaW5nLFxyXG4gIGZ1ZWxQcmljZU1lc3NhZ2UsXHJcbiAgZnVlbFByaWNlTWVzc2FnZUlzRXJyb3IsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgaW50ZXJuYXRpb25hbE9wdGlvbnMsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkcmFmdFRyYW5zRGF0ZSxcclxuICBkcmFmdFR5cGVWYWx1ZUNvZGUsXHJcbiAgZHJhZnRQcmljZSxcclxuICBkcmFmdFF0eSxcclxuICBkcmFmdFByb2plY3RJZCxcclxuICBkcmFmdEludGVybmF0aW9uYWwsXHJcbiAgZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0QW1vdW50TVNULFxyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIGxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlLFxyXG4gIGxpbmtlZFRpY2tldEZpbGVJZCxcbiAgc2hvd0xpbmtlZFRpY2tldEZpZWxkLFxuICBkZXNjcmlwdGlvbklucHV0UmVmLFxuICB0eXBlSW5wdXRSZWYsXG4gIHByaWNlSW5wdXRSZWYsXG4gIHF0eUlucHV0UmVmLFxuICBkZXNjcmlwdGlvbkludmFsaWQgPSBmYWxzZSxcbiAgdHlwZUludmFsaWQgPSBmYWxzZSxcbiAgcHJpY2VJbnZhbGlkID0gZmFsc2UsXG4gIHF0eUludmFsaWQgPSBmYWxzZSxcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlLFxyXG4gIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2UsXHJcbiAgb25EcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2UsXHJcbiAgb25EcmFmdFByaWNlQ2hhbmdlLFxyXG4gIG9uRHJhZnRRdHlDaGFuZ2UsXHJcbiAgb25EcmFmdEFtb3VudEN1cnJlbmN5Q2hhbmdlLFxyXG4gIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2UsXHJcbiAgb25EcmFmdEludGVybmF0aW9uYWxDaGFuZ2UsXHJcbiAgb25EcmFmdFJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2UsXHJcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZSxcclxuICBvbkRyYWZ0QW1vdW50TVNUQ2hhbmdlLFxyXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2UsXHJcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNvbW1pdCxcclxuICBvbk9wZW5MaW5rZWRUaWNrZXQsXHJcbn06IEV4cGVuc2VTaGVldExpbmVGb3JtUHJvcHMpID0+IHtcclxuICBjb25zdCByZWltYnVyc2FibGVFeHBlbnNlT3B0aW9ucyA9IFJlYWN0LnVzZU1lbW8oKCkgPT4gZ2V0RXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlT3B0aW9ucygpLCBbXSk7XHJcbiAgY29uc3QgcmVpbWJ1cnNhYmxlRXhwZW5zZVZhbHVlID0gbm9ybWFsaXplRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlKFxyXG4gICAgaXNFZGl0aW5nID8gZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlIDogbGluZS5yZWltYnVyc2FibGVFeHBlbnNlXHJcbiAgKTtcclxuICBjb25zdCByZWltYnVyc2FibGVFeHBlbnNlTGFiZWwgPSBnZXRFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2VMYWJlbChyZWltYnVyc2FibGVFeHBlbnNlVmFsdWUpO1xyXG4gIGNvbnN0IGludGVybmF0aW9uYWxGaWVsZCA9IGlzRWRpdGluZyA/IChcclxuICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfSW50ZXJuYXRpb25hbFwiLCBcIkludGVybmF0aW9uYWxcIil9XHJcbiAgICAgIG9wdGlvbnM9e2ludGVybmF0aW9uYWxPcHRpb25zfVxyXG4gICAgICB2YWx1ZT17ZHJhZnRJbnRlcm5hdGlvbmFsIHx8IFwiXCJ9XG4gICAgICBvbkNoYW5nZT17b25EcmFmdEludGVybmF0aW9uYWxDaGFuZ2V9XG4gICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfSW50ZXJuYXRpb25hbFwiLCBcIkludGVybmF0aW9uYWxcIil9XG4gICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cbiAgICAvPlxyXG4gICkgOiAoXHJcbiAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0ludGVybmF0aW9uYWxcIiwgXCJJbnRlcm5hdGlvbmFsXCIpfVxyXG4gICAgICB2YWx1ZT17aW50ZXJuYWNpb25hbExhYmVsfVxyXG4gICAgLz5cclxuICApO1xyXG4gIGNvbnN0IHJlaW1idXJzYWJsZUV4cGVuc2VGaWVsZCA9IGlzRWRpdGluZyA/IChcclxuICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUmVpbWJ1cnNhYmxlRXhwZW5zZVwiLCBcIlJlaW1idXJzYWJsZVwiKX1cclxuICAgICAgb3B0aW9ucz17cmVpbWJ1cnNhYmxlRXhwZW5zZU9wdGlvbnN9XHJcbiAgICAgIHZhbHVlPXtTdHJpbmcocmVpbWJ1cnNhYmxlRXhwZW5zZVZhbHVlKX1cbiAgICAgIG9uQ2hhbmdlPXsodmFsdWUpID0+IG9uRHJhZnRSZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlKG5vcm1hbGl6ZUV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZSh2YWx1ZSkpfVxuICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1JlaW1idXJzYWJsZUV4cGVuc2VcIiwgXCJSZWltYnVyc2FibGVcIil9XG4gICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cbiAgICAvPlxyXG4gICkgOiAoXHJcbiAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1JlaW1idXJzYWJsZUV4cGVuc2VcIiwgXCJSZWltYnVyc2FibGVcIil9XHJcbiAgICAgIHZhbHVlPXtyZWltYnVyc2FibGVFeHBlbnNlTGFiZWx9XHJcbiAgICAvPlxyXG4gICk7XHJcbiAgY29uc3QgZGVzY3JpcHRpb25GaWVsZCA9IGlzRWRpdGluZyA/IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiPlxyXG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9PC9sYWJlbD5cbiAgICAgIDxpbnB1dFxuICAgICAgICByZWY9e2Rlc2NyaXB0aW9uSW5wdXRSZWZ9XG4gICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCR7XG4gICAgICAgICAgZGVzY3JpcHRpb25JbnZhbGlkID8gXCIgYm9yZGVyLXJvc2UtNDAwIGJnLXJvc2UtNTAgZm9jdXM6cmluZy1yb3NlLTIwMCBmb2N1czpib3JkZXItcm9zZS00MDBcIiA6IFwiXCJcbiAgICAgICAgfWB9XG4gICAgICAgIHZhbHVlPXtkcmFmdERlc2NyaXB0aW9ufVxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxuICAgICAgICBhcmlhLWludmFsaWQ9e2Rlc2NyaXB0aW9uSW52YWxpZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwifVxuICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKSA6IChcclxuICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cclxuICAgICAgdmFsdWU9e3NhZmVUZXh0KGxpbmUuZGVzY3JpcHRpb24pIHx8IFwiLVwifVxyXG4gICAgICBmdWxsV2lkdGhcclxuICAgIC8+XHJcbiAgKTtcclxuICBjb25zdCBsaW5rZWRUaWNrZXRGaWVsZCA9IHNob3dMaW5rZWRUaWNrZXRGaWVsZCA/IChcbiAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXQgSWQuXCIpfVxuICAgICAgdmFsdWU9e2xpbmtlZFRpY2tldEZpbGVJZH1cbiAgICAgIG9uQ2xpY2s9e29uT3BlbkxpbmtlZFRpY2tldH1cbiAgICAvPlxuICApIDogbnVsbDtcbiAgY29uc3QgcXVhbnRpdHlGaWVsZCA9IGlzRWRpdGluZyA/IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cclxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9RdHlcIiwgXCJRdWFudGl0eVwiKX08L2xhYmVsPlxyXG4gICAgICA8aW5wdXRcclxuICAgICAgICByZWY9e3F0eUlucHV0UmVmfVxyXG4gICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCB0ZXh0LXJpZ2h0IHRhYnVsYXItbnVtcyR7XHJcbiAgICAgICAgICBxdHlJbnZhbGlkID8gXCIgYm9yZGVyLXJvc2UtNDAwIGJnLXJvc2UtNTAgZm9jdXM6cmluZy1yb3NlLTIwMCBmb2N1czpib3JkZXItcm9zZS00MDBcIiA6IFwiXCJcclxuICAgICAgICB9YH1cclxuICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgaW5wdXRNb2RlPVwiZGVjaW1hbFwiXHJcbiAgICAgICAgdmFsdWU9e2RyYWZ0UXR5fVxyXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnRRdHlDaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxyXG4gICAgICAgIG9uQmx1cj17KGV2ZW50KSA9PlxyXG4gICAgICAgICAgb25EcmFmdFF0eUNoYW5nZShcclxuICAgICAgICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKGV2ZW50LnRhcmdldC52YWx1ZSwge1xyXG4gICAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgZmFsbGJhY2s6IFwiXCIsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyaWEtaW52YWxpZD17cXR5SW52YWxpZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwifVxyXG4gICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfVxyXG4gICAgICAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKSA6IChcclxuICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUXR5XCIsIFwiUXVhbnRpdHlcIil9XHJcbiAgICAgIHZhbHVlPXtmb3JtYXRRdHlWYWx1ZShsaW5lLnF0eSl9XHJcbiAgICAgIHZhbHVlQWxpZ249XCJyaWdodFwiXHJcbiAgICAvPlxyXG4gICk7XHJcbiAgY29uc3QgcHJpY2VGaWVsZCA9IGlzRWRpdGluZyA/IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cclxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9QcmljZVwiLCBcIlByaWNlXCIpfTwvbGFiZWw+XHJcbiAgICAgIDxpbnB1dFxyXG4gICAgICAgIHJlZj17cHJpY2VJbnB1dFJlZn1cclxuICAgICAgICBjbGFzc05hbWU9e2Ake2lzS21UeXBlID8gXCJmb3JtLWNvbnRyb2wgaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcImZvcm0tY29udHJvbFwifSB0ZXh0LXJpZ2h0IHRhYnVsYXItbnVtcyR7XHJcbiAgICAgICAgICBwcmljZUludmFsaWQgPyBcIiBib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpyaW5nLXJvc2UtMjAwIGZvY3VzOmJvcmRlci1yb3NlLTQwMFwiIDogXCJcIlxyXG4gICAgICAgIH1gfVxyXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICBpbnB1dE1vZGU9XCJkZWNpbWFsXCJcclxuICAgICAgICB2YWx1ZT17ZHJhZnRQcmljZX1cclxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0UHJpY2VDaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxyXG4gICAgICAgIG9uQmx1cj17KGV2ZW50KSA9PlxyXG4gICAgICAgICAgb25EcmFmdFByaWNlQ2hhbmdlKFxyXG4gICAgICAgICAgICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICBmYWxsYmFjazogXCJcIixcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVhZE9ubHk9e2lzS21UeXBlfVxyXG4gICAgICAgIGRpc2FibGVkPXtpc0ttVHlwZX1cclxuICAgICAgICBhcmlhLXJlYWRvbmx5PXtpc0ttVHlwZX1cclxuICAgICAgICBhcmlhLWludmFsaWQ9e3ByaWNlSW52YWxpZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwifVxyXG4gICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1ByaWNlXCIsIFwiUHJpY2VcIil9XHJcbiAgICAgIC8+XHJcbiAgICAgIHtpc0ttVHlwZSAmJiBpc0Z1ZWxQcmljZUxvYWRpbmcgPyAoXHJcbiAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgdGV4dC14c1wiPlxyXG4gICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX0Z1ZWxQcmljZV9Mb2FkaW5nXCIsIFwiTG9hZGluZyBmdWVsIHByaWNlLi4uXCIpfVxyXG4gICAgICAgIDwvcD5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICAgIHtpc0ttVHlwZSAmJiAhaXNGdWVsUHJpY2VMb2FkaW5nICYmIGZ1ZWxQcmljZU1lc3NhZ2UgPyAoXHJcbiAgICAgICAgPHAgY2xhc3NOYW1lPXtmdWVsUHJpY2VNZXNzYWdlSXNFcnJvciA/IFwidGV4dC1kYW5nZXIgdGV4dC1zbVwiIDogXCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LXhzXCJ9PntmdWVsUHJpY2VNZXNzYWdlfTwvcD5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICA8L2Rpdj5cclxuICApIDogKFxyXG4gICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9QcmljZVwiLCBcIlByaWNlXCIpfSB2YWx1ZT17cHJpY2VUZXh0IHx8IFwiLVwifSB2YWx1ZUFsaWduPVwicmlnaHRcIiAvPlxyXG4gICk7XHJcbiAgY29uc3QgZGF0ZUZpZWxkID0gaXNFZGl0aW5nID8gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpdGEtZmllbGQtdGV4dFwiPlxyXG4gICAgICA8U2luZ2xlRGF0ZVBpY2tlclxyXG4gICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DcmVhdGVkRGF0ZVwiLCBcIkRhdGVcIil9XHJcbiAgICAgICAgdmFsdWU9e2RyYWZ0VHJhbnNEYXRlfVxyXG4gICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlfVxyXG4gICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nfVxyXG4gICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxyXG4gICAgICAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKSA6IChcclxuICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3JlYXRlZERhdGVcIiwgXCJEYXRlXCIpfVxyXG4gICAgICB2YWx1ZT17Zm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKFxyXG4gICAgICAgIHNhZmVUZXh0KGxpbmUudHJhbnNEYXRlIHx8IGZhbGxiYWNrRGF0ZSksXHJcbiAgICAgICAgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCJcclxuICAgICAgKX1cclxuICAgIC8+XHJcbiAgKTtcclxuICBjb25zdCB0eXBlRmllbGQgPSBpc0VkaXRpbmcgPyAoXHJcbiAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1R5cGVcIiwgXCJDYXRlZ29yeVwiKX1cclxuICAgICAgb3B0aW9ucz17Z2FzdG9UeXBlT3B0aW9uc31cclxuICAgICAgdmFsdWU9e2RyYWZ0VHlwZVZhbHVlQ29kZSB8fCBcIlwifVxyXG4gICAgICBvbkNoYW5nZT17b25EcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2V9XHJcbiAgICAgIGlucHV0UmVmPXt0eXBlSW5wdXRSZWZ9XG4gICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVHlwZVwiLCBcIkNhdGVnb3J5XCIpfVxuICAgICAgaW52YWxpZD17dHlwZUludmFsaWR9XG4gICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cbiAgICAvPlxyXG4gICkgOiAoXHJcbiAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1R5cGVcIiwgXCJDYXRlZ29yeVwiKX0gdmFsdWU9e3NhZmVUZXh0KGxpbmUudHlwZVZhbHVlKSB8fCBcIi1cIn0gLz5cclxuICApO1xyXG4gIGNvbnN0IHByb2plY3RGaWVsZCA9IGlzRWRpdGluZyA/IChcclxuICAgIDxFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0XHJcbiAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX1cclxuICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Qcm9qZWN0X1BsYWNlaG9sZGVyXCIsIFwiUHJvamVjdCBpZFwiKX1cclxuICAgICAgdmFsdWU9e2RyYWZ0UHJvamVjdElkfVxyXG4gICAgICBvbkNoYW5nZT17b25EcmFmdFByb2plY3RJZENoYW5nZX1cclxuICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmd9XHJcbiAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nfVxyXG4gICAgLz5cclxuICApIDogKFxuICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9IHZhbHVlPXtwcm9qZWN0VmFsdWV9IC8+XG4gICk7XG4gIGNvbnN0IHF1YW50aXR5UHJpY2VGaWVsZHMgPSAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTMgbWQ6Y29sLXNwYW4tMiBtZDpnYXAtNFwiPlxyXG4gICAgICB7cXVhbnRpdHlGaWVsZH1cclxuICAgICAge3ByaWNlRmllbGR9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG4gIGNvbnN0IGRhdGVUeXBlRmllbGRzID0gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0zIG1kOmNvbC1zcGFuLTIgbWQ6Z2FwLTRcIj5cclxuICAgICAge2RhdGVGaWVsZH1cclxuICAgICAge3R5cGVGaWVsZH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbiAgY29uc3QgcHJvamVjdFRpY2tldEZpZWxkcyA9IGxpbmtlZFRpY2tldEZpZWxkID8gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMyBtZDpjb2wtc3Bhbi0yIG1kOmdhcC00XCI+XG4gICAgICB7cHJvamVjdEZpZWxkfVxuICAgICAge2xpbmtlZFRpY2tldEZpZWxkfVxuICAgIDwvZGl2PlxuICApIDogKFxuICAgIHByb2plY3RGaWVsZFxuICApO1xuXHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNwYWNlLXktMFwiPlxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgICAge2Rlc2NyaXB0aW9uRmllbGR9XHJcbiAgICAgICAgICB7cXVhbnRpdHlQcmljZUZpZWxkc31cclxuXHJcbiAgICAgICAgICA8RXhwZW5zZVNoZWV0TGluZUN1cnJlbmN5RmllbGRzXHJcbiAgICAgICAgICAgIGxpbmU9e2xpbmV9XHJcbiAgICAgICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XHJcbiAgICAgICAgICAgIGRyYWZ0QW1vdW50Q3VycmVuY3k9e2RyYWZ0QW1vdW50Q3VycmVuY3l9XHJcbiAgICAgICAgICAgIGFtb3VudE1TVFRleHQ9e2Ftb3VudE1TVFRleHR9XHJcbiAgICAgICAgICAgIGlzRWRpdGluZz17aXNFZGl0aW5nfVxyXG4gICAgICAgICAgICBkcmFmdEN1cnJlbmN5Q29kZT17ZHJhZnRDdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgICAgIGRyYWZ0QW1vdW50TVNUPXtkcmFmdEFtb3VudE1TVH1cclxuICAgICAgICAgICAgZHJhZnRFeGNoYW5nZVJhdGU9e2RyYWZ0RXhjaGFuZ2VSYXRlfVxyXG4gICAgICAgICAgICBsb2NhbEN1cnJlbmN5Q29kZT17bG9jYWxDdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgICAgIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlPXtleGNoYW5nZVJhdGVJbmZvTWVzc2FnZX1cclxuICAgICAgICAgICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cclxuICAgICAgICAgICAgb25EcmFmdEFtb3VudEN1cnJlbmN5Q2hhbmdlPXtvbkRyYWZ0QW1vdW50Q3VycmVuY3lDaGFuZ2V9XHJcbiAgICAgICAgICAgIG9uRHJhZnRBbW91bnRNU1RDaGFuZ2U9e29uRHJhZnRBbW91bnRNU1RDaGFuZ2V9XHJcbiAgICAgICAgICAgIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U9e29uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2V9XHJcbiAgICAgICAgICAgIG9uRHJhZnRFeGNoYW5nZVJhdGVDb21taXQ9e29uRHJhZnRFeGNoYW5nZVJhdGVDb21taXR9XHJcbiAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgIHtkYXRlVHlwZUZpZWxkc31cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTMgbWQ6Y29sLXNwYW4tMiBtZDpnYXAtNFwiPlxyXG4gICAgICAgICAgICB7aW50ZXJuYXRpb25hbEZpZWxkfVxyXG4gICAgICAgICAgICB7cmVpbWJ1cnNhYmxlRXhwZW5zZUZpZWxkfVxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAge3Byb2plY3RUaWNrZXRGaWVsZHN9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0TGluZUZvcm07XHJcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEV4cGVuc2VJbnRlcm5hdGlvbmFsT3B0aW9uID0ge1xyXG4gIHZhbHVlOiBib29sZWFuO1xyXG4gIHRleHQ6IHN0cmluZztcclxufTtcclxuXHJcbi8vIEZpeGVkIGVudW0gZm9yIFwiSW50ZXJuYWNpb25hbFwiIGZpZWxkIGluIGV4cGVuc2Ugc2hlZXQgbGluZXMuXHJcbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlSW50ZXJuYXRpb25hbE9wdGlvbnMgPSAoKTogRXhwZW5zZUludGVybmF0aW9uYWxPcHRpb25bXSA9PiBbXHJcbiAgeyB2YWx1ZTogdHJ1ZSwgdGV4dDogaW5kVChcIkV4cGVuc2VTaGVldHNfSW50ZXJuYXRpb25hbF9ZZXNcIiwgXCJTXHUwMEVEXCIpIH0sXHJcbiAgeyB2YWx1ZTogZmFsc2UsIHRleHQ6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ludGVybmF0aW9uYWxfTm9cIiwgXCJOb1wiKSB9LFxyXG5dO1xyXG5cclxuLy8gTWFwcyBudWxsYWJsZSBib29sZWFuIHZhbHVlcyB0byBmaXhlZCBlbnVtIGxhYmVscyBmb3IgcmVhZC1vbmx5IHJlbmRlcmluZy5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VJbnRlcm5hdGlvbmFsTGFiZWwgPSAodmFsdWU6IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICBpZiAodmFsdWUgPT09IHRydWUpIHtcclxuICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19JbnRlcm5hdGlvbmFsX1llc1wiLCBcIlNcdTAwRURcIik7XHJcbiAgfVxyXG5cclxuICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XHJcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfSW50ZXJuYXRpb25hbF9Ob1wiLCBcIk5vXCIpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFwiLVwiO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIHVzZXIgaW5wdXQgYmFjayB0byBudWxsYWJsZSBib29sZWFuIGZvciBmdXR1cmUgZWRpdCBtb2RlLlxyXG5leHBvcnQgY29uc3QgcGFyc2VFeHBlbnNlSW50ZXJuYXRpb25hbFZhbHVlID0gKHJhdzogc3RyaW5nIHwgYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQpOiBib29sZWFuIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHJhdyA9PT0gdHJ1ZSB8fCByYXcgPT09IGZhbHNlKSB7XHJcbiAgICByZXR1cm4gcmF3O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3IHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGlmICghdmFsdWUpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgaWYgKHZhbHVlID09PSBcInRydWVcIiB8fCB2YWx1ZSA9PT0gXCIxXCIpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgaWYgKHZhbHVlID09PSBcImZhbHNlXCIgfHwgdmFsdWUgPT09IFwiMFwiKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VTaGVldENyZWF0ZUxpbmVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldExpbmUsXHJcbiAgRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlcXVlc3QsXHJcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBwYXJzZUV4cGVuc2VJbnRlcm5hdGlvbmFsVmFsdWUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2ludGVybmF0aW9uYWxPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZSB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2VDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VHYXN0b1R5cGVDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UsIHRvRXhwZW5zZUFwaURkTW1ZeXl5IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbiwgcGFyc2VEZWNpbWFsSW5wdXQgfSBmcm9tIFwiLi4vaG9va3MvZXhwZW5zZU11dGF0aW9uVXRpbHMudHNcIjtcclxuaW1wb3J0IHtcclxuICBpc0V4cGVuc2VMaW5lRm9yZWlnbkN1cnJlbmN5LFxyXG4gIG5vcm1hbGl6ZUV4cGVuc2VMaW5lQ3VycmVuY3lDb2RlLFxyXG4gIHJlc29sdmVFeHBlbnNlTGluZUFtb3VudE1TVEZvckN1cnJlbmN5UGF5bG9hZCxcclxuICByZXNvbHZlRXhwZW5zZUxpbmVFeGNoYW5nZVJhdGVGb3JDdXJyZW5jeSxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUxpbmVDdXJyZW5jeS50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGNyZWF0ZUV4cGVuc2VTaGVldCxcclxuICBkZWxldGVFeHBlbnNlU2hlZXRMaW5lLFxyXG4gIGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldCxcclxuICBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRGaWxlLFxyXG4gIHVwZGF0ZUV4cGVuc2VTaGVldExpbmUsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIGlzRWRpdExvY2tlZDogYm9vbGVhbjtcclxuICBpc0RlbGV0ZUxvY2tlZDogYm9vbGVhbjtcclxuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkVkaXRFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgc2hlZXRJZDogc3RyaW5nO1xyXG4gIGxpbmVJZDogc3RyaW5nO1xyXG4gIGxpbmU6IEV4cGVuc2VTaGVldExpbmUgfCBudWxsO1xyXG4gIGxpbmtlZFRpY2tldEZpbGVJZDogc3RyaW5nO1xyXG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcclxuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIGRyYWZ0VHlwZVZhbHVlQ29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0UHJpY2U6IHN0cmluZztcclxuICBkcmFmdFF0eTogc3RyaW5nO1xyXG4gIGRyYWZ0UHJvamVjdElkOiBzdHJpbmc7XHJcbiAgZHJhZnRJbnRlcm5hdGlvbmFsOiBzdHJpbmc7XHJcbiAgZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlOiBudW1iZXIgfCBudWxsO1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRBbW91bnRNU1Q6IHN0cmluZztcclxuICBkcmFmdEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xyXG4gIGxvY2FsQ3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0QnVzeTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICBvbkludmFsaWREZXNjcmlwdGlvbj86ICgpID0+IHZvaWQ7XG4gIG9uSW52YWxpZFR5cGU/OiAoKSA9PiB2b2lkO1xuICBvbkludmFsaWRBbW91bnRRdHk/OiAoKSA9PiB2b2lkO1xuICBvbkNyZWF0ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplTGluZURhdGUgPSAocmF3OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiB0b0V4cGVuc2VBcGlEZE1tWXl5eShyYXcpO1xyXG59O1xyXG5cclxuY29uc3QgcGFyc2VOdW1iZXIgPSAocmF3OiBzdHJpbmcpOiBudW1iZXIgfCBudWxsID0+IHBhcnNlRGVjaW1hbElucHV0KHJhdyk7XHJcblxyXG4vLyBFbmNhcHN1bGF0ZXMgdXBkYXRlIGFuZCBkZWxldGUgbXV0YXRpb25zIGZvciBleHBlbnNlIHNoZWV0IGxpbmUgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBpc0VkaXRpbmcsXHJcbiAgaXNDcmVhdGVNb2RlLFxyXG4gIGlzRWRpdExvY2tlZCxcclxuICBpc0RlbGV0ZUxvY2tlZCxcclxuICBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gIGNhbkVkaXRFeHBlbnNlLFxyXG4gIGNhbkRlbGV0ZUV4cGVuc2UsXHJcbiAgc2hlZXRJZCxcclxuICBsaW5lSWQsXHJcbiAgbGluZSxcclxuICBsaW5rZWRUaWNrZXRGaWxlSWQsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkcmFmdFRyYW5zRGF0ZSxcclxuICBkcmFmdFR5cGVWYWx1ZUNvZGUsXHJcbiAgZHJhZnRQcmljZSxcclxuICBkcmFmdFF0eSxcclxuICBkcmFmdFByb2plY3RJZCxcclxuICBkcmFmdEludGVybmF0aW9uYWwsXHJcbiAgZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0QW1vdW50TVNULFxyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIGxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgc2V0QnVzeSxcbiAgc2V0U3RhdHVzLFxuICBzZXRJc0VkaXRpbmcsXG4gIG9uSW52YWxpZERlc2NyaXB0aW9uLFxuICBvbkludmFsaWRUeXBlLFxuICBvbkludmFsaWRBbW91bnRRdHksXG4gIG9uQ3JlYXRlU3VjY2Vzcyxcbn06IFVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XHJcbiAgY29uc3QgaXNOb3RGb3VuZEVycm9yID0gKGVycm9yOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgICByZXR1cm4gZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDA0O1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGlzTWlzc2luZ1RpY2tldEZpbGVNZXNzYWdlID0gKG1lc3NhZ2U6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcobWVzc2FnZSB8fCBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhcmNoaXZvIGFzb2NpYWRvXCIpIHx8XHJcbiAgICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhcmNoaXZvIGFkanVudG9cIikgfHxcclxuICAgICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImFzc29jaWF0ZWQgZmlsZVwiKSB8fFxyXG4gICAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXR0YWNoZWQgZmlsZVwiKVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoaXNFZGl0TG9ja2VkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgY2FuUHJvY2VlZCA9IGlzQ3JlYXRlTW9kZSA/IGNhbkNyZWF0ZUV4cGVuc2UgOiBjYW5FZGl0RXhwZW5zZTtcclxuICAgIGlmICghY2FuUHJvY2VlZCkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IG5vcm1hbGl6ZUxpbmVEYXRlKGRyYWZ0VHJhbnNEYXRlKTtcclxuICAgIGNvbnN0IHBhcnNlZFR5cGVWYWx1ZSA9IHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUoZHJhZnRUeXBlVmFsdWVDb2RlLCB7IGFsbG93Tm9uZTogZmFsc2UgfSk7XHJcbiAgICBjb25zdCBwYXJzZWRQcmljZSA9IHBhcnNlTnVtYmVyKGRyYWZ0UHJpY2UpO1xyXG4gICAgY29uc3QgcGFyc2VkUXR5ID0gcGFyc2VOdW1iZXIoZHJhZnRRdHkpO1xyXG4gICAgY29uc3QgcGFyc2VkSW50ZXJuYXRpb25hbCA9IHBhcnNlRXhwZW5zZUludGVybmF0aW9uYWxWYWx1ZShkcmFmdEludGVybmF0aW9uYWwpO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZFJlaW1idXJzYWJsZUV4cGVuc2UgPSBub3JtYWxpemVFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2UoZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlKTtcclxuICAgIGNvbnN0IHBhcnNlZEFtb3VudE1TVCA9IHBhcnNlTnVtYmVyKGRyYWZ0QW1vdW50TVNUKTtcbiAgICBjb25zdCBwYXJzZWRFeGNoYW5nZVJhdGUgPSBwYXJzZU51bWJlcihkcmFmdEV4Y2hhbmdlUmF0ZSk7XG4gICAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbmN5Q29kZSA9IG5vcm1hbGl6ZUV4cGVuc2VMaW5lQ3VycmVuY3lDb2RlKGRyYWZ0Q3VycmVuY3lDb2RlKTtcbiAgICBjb25zdCBub3JtYWxpemVkTG9jYWxDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVFeHBlbnNlTGluZUN1cnJlbmN5Q29kZShsb2NhbEN1cnJlbmN5Q29kZSkgfHwgXCJFVVJcIjtcbiAgICBjb25zdCBub3JtYWxpemVkRGVzY3JpcHRpb24gPSBTdHJpbmcoZHJhZnREZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XG5cbiAgICBpZiAoIW5vcm1hbGl6ZWREZXNjcmlwdGlvbikge1xuICAgICAgb25JbnZhbGlkRGVzY3JpcHRpb24/LigpO1xuICAgICAgY29uc3QgdmFsaWRhdGlvbk1lc3NhZ2UgPSBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0Rlc2NyaXB0aW9uUmVxdWlyZWRcIiwgXCJEZXNjcmlwdGlvbiBpcyByZXF1aXJlZC5cIik7XG4gICAgICBzZXRNb2RhbEVycm9yKHZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICAgIHNldFN0YXR1cyh2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgaGFzVmFsaWRRdHlQcmljZSA9IHBhcnNlZFF0eSAhPSBudWxsICYmIHBhcnNlZFF0eSA+IDAgJiYgcGFyc2VkUHJpY2UgIT0gbnVsbCAmJiBwYXJzZWRQcmljZSA+IDA7XG4gICAgaWYgKCFoYXNWYWxpZFF0eVByaWNlKSB7XG4gICAgICBvbkludmFsaWRBbW91bnRRdHk/LigpO1xyXG4gICAgICBjb25zdCB2YWxpZGF0aW9uTWVzc2FnZSA9IGluZFQoXHJcbiAgICAgICAgXCJFeHBlbnNlU2hlZXRzX0xpbmVfVmFsaWRhdGlvbl9BbW91bnRRdHlcIixcclxuICAgICAgICBcIlF1YW50aXR5IGFuZCBwcmljZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwLlwiXHJcbiAgICAgICk7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IodmFsaWRhdGlvbk1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXModmFsaWRhdGlvbk1lc3NhZ2UpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFub3JtYWxpemVkRGF0ZSkge1xyXG4gICAgICBzZXRNb2RhbEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gICAgICBzZXRTdGF0dXMoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocGFyc2VkVHlwZVZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgIG9uSW52YWxpZFR5cGU/LigpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNGb3JlaWduQ3VycmVuY3kgPSBpc0V4cGVuc2VMaW5lRm9yZWlnbkN1cnJlbmN5KG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUsIG5vcm1hbGl6ZWRMb2NhbEN1cnJlbmN5Q29kZSk7XHJcbiAgICBjb25zdCBoYXNGb3JlaWduQ3VycmVuY3lTZXR0bGVtZW50ID1cclxuICAgICAgKHBhcnNlZEV4Y2hhbmdlUmF0ZSAhPSBudWxsICYmIHBhcnNlZEV4Y2hhbmdlUmF0ZSA+IDApIHx8XHJcbiAgICAgIChwYXJzZWRBbW91bnRNU1QgIT0gbnVsbCAmJiBwYXJzZWRBbW91bnRNU1QgPiAwKTtcclxuICAgIGlmIChpc0ZvcmVpZ25DdXJyZW5jeSAmJiAhaGFzRm9yZWlnbkN1cnJlbmN5U2V0dGxlbWVudCkge1xyXG4gICAgICBjb25zdCB2YWxpZGF0aW9uTWVzc2FnZSA9IGluZFQoXHJcbiAgICAgICAgXCJFeHBlbnNlU2hlZXRzX0xpbmVfVmFsaWRhdGlvbl9Gb3JlaWduQ3VycmVuY3lTZXR0bGVtZW50XCIsXHJcbiAgICAgICAgXCJGb3JlaWduIGN1cnJlbmN5IGxpbmVzIHJlcXVpcmUgYW4gZXhjaGFuZ2UgcmF0ZSBncmVhdGVyIHRoYW4gMCBvciBhIHJlaW1idXJzZW1lbnQgYW1vdW50LlwiXHJcbiAgICAgICk7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IodmFsaWRhdGlvbk1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXModmFsaWRhdGlvbk1lc3NhZ2UpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgIHN0YXJ0U3RhdHVzOiBpc0NyZWF0ZU1vZGVcclxuICAgICAgICA/IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVfRGV0YWlsX0NyZWF0aW5nXCIsIFwiQ3JlYXRpbmcgZXhwZW5zZSBsaW5lLi4uXCIpXHJcbiAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9VcGRhdGluZ1wiLCBcIlVwZGF0aW5nIGV4cGVuc2UgbGluZS4uLlwiKSxcclxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldEJ1c3ksXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGluZUFtb3VudCA9IE51bWJlcihwYXJzZWRRdHkpICogTnVtYmVyKHBhcnNlZFByaWNlKTtcclxuICAgICAgICBjb25zdCBwYXlsb2FkQW1vdW50TVNUID0gcmVzb2x2ZUV4cGVuc2VMaW5lQW1vdW50TVNURm9yQ3VycmVuY3lQYXlsb2FkKFxyXG4gICAgICAgICAgbGluZUFtb3VudCxcclxuICAgICAgICAgIHBhcnNlZEFtb3VudE1TVCxcclxuICAgICAgICAgIG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICBub3JtYWxpemVkTG9jYWxDdXJyZW5jeUNvZGVcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWRFeGNoYW5nZVJhdGUgPSByZXNvbHZlRXhwZW5zZUxpbmVFeGNoYW5nZVJhdGVGb3JDdXJyZW5jeShcclxuICAgICAgICAgIG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICBub3JtYWxpemVkTG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICBwYXJzZWRFeGNoYW5nZVJhdGVcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IGNvbW1vbkxpbmVQYXlsb2FkID0ge1xyXG4gICAgICAgICAgdHJhbnNEYXRlOiBub3JtYWxpemVkRGF0ZSxcbiAgICAgICAgICB0eXBlVmFsdWU6IHBhcnNlZFR5cGVWYWx1ZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogbm9ybWFsaXplZERlc2NyaXB0aW9uLFxuICAgICAgICAgIGludGVybmFjaW9uYWw6IHBhcnNlZEludGVybmF0aW9uYWwgPz8gbGluZT8uaW50ZXJuYWNpb25hbCA/PyBmYWxzZSxcbiAgICAgICAgICB0aWNrZXQ6IGxpbmU/LnRpY2tldCA9PT0gdHJ1ZSxcbiAgICAgICAgICBxdHk6IE51bWJlcihwYXJzZWRRdHkpLFxyXG4gICAgICAgICAgcHJpY2U6IE51bWJlcihwYXJzZWRQcmljZSksXHJcbiAgICAgICAgICBwcm9qSWQ6IFN0cmluZyhkcmFmdFByb2plY3RJZCB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogbm9ybWFsaXplZFJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbiAgICAgICAgICBjdXJyZW5jeUNvZGU6IG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgYW1vdW50TVNUOiBwYXlsb2FkQW1vdW50TVNULFxyXG4gICAgICAgICAgZXhjaFJhdGU6IHBheWxvYWRFeGNoYW5nZVJhdGUsXHJcbiAgICAgICAgICBpbmRBdHRhY2hGaWxlczogc2FmZVRleHQobGluZT8uaW5kQXR0YWNoRmlsZXMpLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGNyZWF0ZUxpbmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRDcmVhdGVMaW5lUmVxdWVzdCA9IGNvbW1vbkxpbmVQYXlsb2FkO1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZUxpbmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVxdWVzdCA9IGNvbW1vbkxpbmVQYXlsb2FkO1xyXG5cclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGlzQ3JlYXRlTW9kZVxyXG4gICAgICAgICAgPyBhd2FpdCBjcmVhdGVFeHBlbnNlU2hlZXQoe1xyXG4gICAgICAgICAgICAgIG1vZGU6IDIsXHJcbiAgICAgICAgICAgICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IHNoZWV0SWQsXHJcbiAgICAgICAgICAgICAgbGluZXM6IFtjcmVhdGVMaW5lUGF5bG9hZF0sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICA6IGF3YWl0IHVwZGF0ZUV4cGVuc2VTaGVldExpbmUoc2hlZXRJZCwgbGluZUlkLCB1cGRhdGVMaW5lUGF5bG9hZCk7XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9DcmVhdGVkXCIsIFwiRXhwZW5zZSBsaW5lIGNyZWF0ZWRcIikpO1xyXG4gICAgICAgICAgb25DcmVhdGVTdWNjZXNzKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBsaW5lIHVwZGF0ZWRcIikpO1xyXG4gICAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xyXG4gIH0sIFtcclxuICAgIGJ1c3ksXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gICAgY2FuRWRpdEV4cGVuc2UsXHJcbiAgICBkcmFmdFByaWNlLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0SW50ZXJuYXRpb25hbCxcclxuICAgIGRyYWZ0QW1vdW50TVNULFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIGRyYWZ0UHJvamVjdElkLFxyXG4gICAgZHJhZnRRdHksXHJcbiAgICBkcmFmdFRyYW5zRGF0ZSxcclxuICAgIGRyYWZ0VHlwZVZhbHVlQ29kZSxcclxuICAgIGRyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzRWRpdExvY2tlZCxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGxpbmUsXHJcbiAgICBsaW5lSWQsXHJcbiAgICBsb2NhbEN1cnJlbmN5Q29kZSxcbiAgICBvbkNyZWF0ZVN1Y2Nlc3MsXG4gICAgb25JbnZhbGlkRGVzY3JpcHRpb24sXG4gICAgb25JbnZhbGlkQW1vdW50UXR5LFxuICAgIG9uSW52YWxpZFR5cGUsXG4gICAgc2V0QnVzeSxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzaGVldElkLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKGlzRGVsZXRlTG9ja2VkKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWNhbkRlbGV0ZUV4cGVuc2UpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGV4cGVuc2UgbGluZS4uLlwiKSxcclxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIiksXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldEJ1c3ksXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2FmZUxpbmtlZFRpY2tldEZpbGVJZCA9IHNhZmVUZXh0KGxpbmtlZFRpY2tldEZpbGVJZCk7XHJcbiAgICAgICAgaWYgKHNhZmVMaW5rZWRUaWNrZXRGaWxlSWQpIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUZpbGVSZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldEZpbGUoc2FmZUxpbmtlZFRpY2tldEZpbGVJZCk7XHJcbiAgICAgICAgICAgIGlmICghZGVsZXRlRmlsZVJlc3BvbnNlLlN1Y2Nlc3MgJiYgIWlzTWlzc2luZ1RpY2tldEZpbGVNZXNzYWdlKGRlbGV0ZUZpbGVSZXNwb25zZS5NZXNzYWdlKSkge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihkZWxldGVGaWxlUmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBpZiAoIWlzTm90Rm91bmRFcnJvcihlcnJvcikpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZVRpY2tldFJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0KHNhZmVMaW5rZWRUaWNrZXRGaWxlSWQpO1xyXG4gICAgICAgICAgICBpZiAoIWRlbGV0ZVRpY2tldFJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGVsZXRlVGlja2V0UmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBpZiAoIWlzTm90Rm91bmRFcnJvcihlcnJvcikpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRMaW5lKHNoZWV0SWQsIGxpbmVJZCk7XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9EZWxldGVkXCIsIFwiRXhwZW5zZSBsaW5lIGRlbGV0ZWRcIikpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICB9LCBbXHJcbiAgICBidXN5LFxyXG4gICAgY2FuRGVsZXRlRXhwZW5zZSxcclxuICAgIGlzRGVsZXRlTG9ja2VkLFxyXG4gICAgbGluZUlkLFxyXG4gICAgbGlua2VkVGlja2V0RmlsZUlkLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzaGVldElkLFxyXG4gIF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zIH0gZnJvbSBcIi4uL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbE9wZW46IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcclxuICBpc0xvY2tlZDogYm9vbGVhbjtcclxuICBhY3Rpb25Nb2RlPzogXCJkZWZhdWx0XCIgfCBcImRlbGV0ZV9vbmx5XCIgfCBcInZpZXdfb25seVwiO1xyXG4gIHBlcm1pc3Npb25zUmVhZHk/OiBib29sZWFuO1xyXG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGNhbk9wZW5TYXZlQ29uZmlybT86ICgpID0+IGJvb2xlYW47XHJcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBvblNhdmVTdWNjZXNzOiAoKSA9PiB2b2lkO1xyXG4gIG9wZW5Db25maXJtOiAob3B0czoge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xyXG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcclxuICAgIG9uQ2FuY2VsPzogKCkgPT4gdm9pZDtcclxuICB9KSA9PiB2b2lkO1xyXG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIENvb3JkaW5hdGVzIHRvcGJhciBpY29uIHN0YXRlIGFuZCBkaXNwYXRjaCBhY3Rpb25zIGZvciBleHBlbnNlIHNoZWV0IGxpbmUgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgbW9kYWxPcGVuLFxyXG4gIGlzRWRpdGluZyxcclxuICBpc0NyZWF0ZU1vZGUsXHJcbiAgaXNMb2NrZWQsXHJcbiAgYWN0aW9uTW9kZSA9IFwiZGVmYXVsdFwiLFxyXG4gIHBlcm1pc3Npb25zUmVhZHkgPSB0cnVlLFxyXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXHJcbiAgY2FuRWRpdEV4cGVuc2UsXHJcbiAgY2FuRGVsZXRlRXhwZW5zZSxcclxuICBzaGVldElkLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICBoYW5kbGVVcGRhdGUsXHJcbiAgaGFuZGxlRGVsZXRlLFxyXG4gIG9uU2F2ZVN1Y2Nlc3MsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcclxuICB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMoe1xyXG4gICAgYWN0aW9uR3JvdXBJZDogXCJleHBlbnNlLWxpbmUtZGV0YWlsLWFjdGlvbnNcIixcclxuICAgIGlkczoge1xyXG4gICAgICBlZGl0SWNvbklkOiBcImV4cGVuc2VMaW5lRWRpdEljb25cIixcclxuICAgICAgc2F2ZUljb25JZDogXCJleHBlbnNlTGluZVNhdmVJY29uXCIsXHJcbiAgICAgIGRlbGV0ZUJ0bklkOiBcImV4cGVuc2VMaW5lRGVsZXRlQnRuXCIsXHJcbiAgICAgIGNhbmNlbEJ0bklkOiBcImV4cGVuc2VMaW5lQ2FuY2VsQnRuXCIsXHJcbiAgICB9LFxyXG4gICAgZXZlbnRzOiB7XHJcbiAgICAgIGVkaXRFdmVudDogXCJleHBlbnNlLWxpbmUtZGV0YWlsLWVkaXRcIixcclxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS1saW5lLWRldGFpbC1kZWxldGVcIixcclxuICAgICAgY2FuY2VsRXZlbnQ6IFwiZXhwZW5zZS1saW5lLWRldGFpbC1jYW5jZWwtZWRpdFwiLFxyXG4gICAgfSxcclxuICAgIGJ1c3ksXHJcbiAgICBtb2RhbE9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0xvY2tlZCxcclxuICAgIGFjdGlvbk1vZGUsXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5LFxyXG4gICAgY2FuQ3JlYXRlOiBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gICAgY2FuRWRpdDogY2FuRWRpdEV4cGVuc2UsXHJcbiAgICBjYW5EZWxldGU6IGNhbkRlbGV0ZUV4cGVuc2UsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgICBoYW5kbGVTYXZlOiBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBzYXZlQ29uZmlybVRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJTYXZlIGNoYW5nZXNcIiksXHJcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gc2F2ZSBjaGFuZ2VzP1wiKSxcclxuICAgIHNhdmVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1UaXRsZTogaW5kVChcIkNvbmZpcm1fRGVsZXRlX1RpdGxlXCIsIFwiRGVsZXRlXCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgaXRlbT9cIiksXHJcbiAgICBkZWxldGVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIiksXHJcbiAgICBvblNhdmVTdWNjZXNzLFxyXG4gICAgb25EZWxldGVTdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCl9YCk7XHJcbiAgICB9LFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsQ29uZmlybURpYWxvZ0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbEVycm9yOiBzdHJpbmc7XHJcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxufTtcclxuXHJcbi8vIEtlZXBzIGxpbmUgZGV0YWlsIGNvbmZpcm0gZGlhbG9nIHdpcmluZyBvdXRzaWRlIHRoZSBwYWdlIGNvbXBvbmVudC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxDb25maXJtRGlhbG9nID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsRXJyb3IsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBzZXRTdGF0dXMsXHJcbn06IFVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxDb25maXJtRGlhbG9nQXJncykgPT4ge1xyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xyXG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcclxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm0sIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1c10pO1xyXG5cclxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcclxuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XHJcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcclxuICAgIDogIWJ1c3kgJiYgbW9kYWxFcnJvclxyXG4gICAgICA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKVxyXG4gICAgICA6IG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZvaWQgaGFuZGxlTW9kYWxDb25maXJtKCk7XHJcbiAgfSwgW2J1c3ksIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtLCBtb2RhbEVycm9yXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBtb2RhbCxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gICAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICAgIG1vZGFsQ2FuY2VsVGV4dCxcclxuICAgIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRIZWFkZXIsIEV4cGVuc2VTaGVldExpbmUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsLCBnZXRGdWVsUHJpY2VLbSwgbWFwRXhwZW5zZVNoZWV0SGVhZGVyLCBtYXBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHtcclxuICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXHJcbiAgbmF2aWdhdGVUb0V4cGVuc2VVcmwsXHJcbiAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHsgaGFzQXNzaWduZWRWb3VjaGVyLCBwYXJzZUV4cGVuc2VEYXRlLCBzYWZlVGV4dCwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UsIHRvRXhwZW5zZUFwaURkTW1ZeXl5IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZUV4cGVuc2VTaGVldERldGFpbFBvbGljeSB9IGZyb20gXCIuLi9kZXRhaWwvZXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5LnRzXCI7XHJcbmltcG9ydCB7IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU1hbmFnZWRVc2VyU2NvcGUudHNcIjtcclxuaW1wb3J0IHtcclxuICBERUZBVUxUX0xJTkVfUkVJTUJVUlNBQkxFX0VYUEVOU0UsXHJcbiAgbm9ybWFsaXplRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlLFxyXG59IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2VDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGlzRXhwZW5zZUxpbmVTYW1lUmVpbWJ1cnNlbWVudEN1cnJlbmN5IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VMaW5lQ3VycmVuY3kudHNcIjtcclxuXHJcbmNvbnN0IEtNX0dBU1RPX1RZUEVfQ09ERSA9IFwiM1wiO1xyXG5jb25zdCBGVUVMX1BSSUNFX0RFQk9VTkNFX01TID0gMzAwO1xyXG5jb25zdCBGVUVMX1BSSUNFX1NPVVJDRV9VU0VSX0NPTkZJRyA9IFwiQ1JNSG9qYUdhc3Rvc1VzZXJQcmljZUttRmVjaGFUYWJsZVwiO1xyXG5jb25zdCBGVUVMX1BSSUNFX1NPVVJDRV9HTE9CQUxfQ09ORklHID0gXCJDUk1QYXJhbWV0ZXJzXCI7XHJcbmNvbnN0IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkVEID0gMjtcclxuY29uc3QgRVhQRU5TRV9TVEFUVVNfUEFJRCA9IDQ7XHJcblxyXG50eXBlIEV4cGVuc2VTaGVldExpbmVOYXZpZ2F0aW9uID0ge1xyXG4gIGN1cnJlbnRJbmRleDogbnVtYmVyO1xyXG4gIHRvdGFsTGluZXM6IG51bWJlcjtcclxuICBmaXJzdExpbmVJZDogc3RyaW5nO1xyXG4gIHByZXZpb3VzTGluZUlkOiBzdHJpbmc7XHJcbiAgbmV4dExpbmVJZDogc3RyaW5nO1xyXG4gIGxhc3RMaW5lSWQ6IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IEVNUFRZX0xJTkVfTkFWSUdBVElPTjogRXhwZW5zZVNoZWV0TGluZU5hdmlnYXRpb24gPSB7XHJcbiAgY3VycmVudEluZGV4OiAwLFxyXG4gIHRvdGFsTGluZXM6IDAsXHJcbiAgZmlyc3RMaW5lSWQ6IFwiXCIsXHJcbiAgcHJldmlvdXNMaW5lSWQ6IFwiXCIsXHJcbiAgbmV4dExpbmVJZDogXCJcIixcclxuICBsYXN0TGluZUlkOiBcIlwiLFxyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZUxpbmVOYXZpZ2F0aW9uSWQgPSAobGluZTogRXhwZW5zZVNoZWV0TGluZSB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBzYWZlVGV4dChsaW5lPy5saW5lUmVjSWQpO1xyXG59O1xyXG5cclxuLy8gQnVpbGRzIGFkamFjZW50IGxpbmUgbmF2aWdhdGlvbiBmcm9tIHRoZSBhbHJlYWR5LWxvYWRlZCBzaGVldCBkZXRhaWwgbGluZXMuXHJcbmNvbnN0IGJ1aWxkTGluZU5hdmlnYXRpb24gPSAobGluZXM6IEV4cGVuc2VTaGVldExpbmVbXSwgY3VycmVudExpbmVJZDogc3RyaW5nKTogRXhwZW5zZVNoZWV0TGluZU5hdmlnYXRpb24gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50TGluZUlkID0gc2FmZVRleHQoY3VycmVudExpbmVJZCkudG9VcHBlckNhc2UoKTtcclxuICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW50TGluZUlkIHx8IGxpbmVzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICByZXR1cm4gRU1QVFlfTElORV9OQVZJR0FUSU9OO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY3VycmVudEluZGV4ID0gbGluZXMuZmluZEluZGV4KFxyXG4gICAgKGVudHJ5KSA9PiByZXNvbHZlTGluZU5hdmlnYXRpb25JZChlbnRyeSkudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZEN1cnJlbnRMaW5lSWRcclxuICApO1xyXG4gIGlmIChjdXJyZW50SW5kZXggPCAwKSB7XHJcbiAgICByZXR1cm4gRU1QVFlfTElORV9OQVZJR0FUSU9OO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZmlyc3ROYXZpZ2FibGVMaW5lID0gbGluZXMuZmluZCgoZW50cnkpID0+ICEhcmVzb2x2ZUxpbmVOYXZpZ2F0aW9uSWQoZW50cnkpKTtcclxuICBjb25zdCBwcmV2aW91c05hdmlnYWJsZUxpbmUgPSBsaW5lc1xyXG4gICAgLnNsaWNlKDAsIGN1cnJlbnRJbmRleClcclxuICAgIC5yZXZlcnNlKClcclxuICAgIC5maW5kKChlbnRyeSkgPT4gISFyZXNvbHZlTGluZU5hdmlnYXRpb25JZChlbnRyeSkpO1xyXG4gIGNvbnN0IG5leHROYXZpZ2FibGVMaW5lID0gbGluZXNcclxuICAgIC5zbGljZShjdXJyZW50SW5kZXggKyAxKVxyXG4gICAgLmZpbmQoKGVudHJ5KSA9PiAhIXJlc29sdmVMaW5lTmF2aWdhdGlvbklkKGVudHJ5KSk7XHJcbiAgY29uc3QgbGFzdE5hdmlnYWJsZUxpbmUgPSBbLi4ubGluZXNdLnJldmVyc2UoKS5maW5kKChlbnRyeSkgPT4gISFyZXNvbHZlTGluZU5hdmlnYXRpb25JZChlbnRyeSkpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY3VycmVudEluZGV4OiBjdXJyZW50SW5kZXggKyAxLFxyXG4gICAgdG90YWxMaW5lczogbGluZXMubGVuZ3RoLFxyXG4gICAgZmlyc3RMaW5lSWQ6IHJlc29sdmVMaW5lTmF2aWdhdGlvbklkKGZpcnN0TmF2aWdhYmxlTGluZSksXHJcbiAgICBwcmV2aW91c0xpbmVJZDogcmVzb2x2ZUxpbmVOYXZpZ2F0aW9uSWQocHJldmlvdXNOYXZpZ2FibGVMaW5lKSxcclxuICAgIG5leHRMaW5lSWQ6IHJlc29sdmVMaW5lTmF2aWdhdGlvbklkKG5leHROYXZpZ2FibGVMaW5lKSxcclxuICAgIGxhc3RMaW5lSWQ6IHJlc29sdmVMaW5lTmF2aWdhdGlvbklkKGxhc3ROYXZpZ2FibGVMaW5lKSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgdG9JbnB1dERhdGUgPSAocmF3Pzogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBwYXJzZUV4cGVuc2VEYXRlKHJhdyk7XHJcbiAgcmV0dXJuIHBhcnNlZCA/IHRvSXNvRGF0ZShwYXJzZWQpIDogXCJcIjtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdEVkaXRhYmxlTnVtYmVyID0gKHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKHZhbHVlLCB7XHJcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0RWRpdGFibGVRdWFudGl0eSA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcih2YWx1ZSwge1xyXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICBmYWxsYmFjazogXCJcIixcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdEVkaXRhYmxlRXhjaGFuZ2VSYXRlID0gKHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKHZhbHVlLCB7XHJcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDcsXHJcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDcsXHJcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplRnVlbFRyYW5zRGF0ZSA9IChyYXc6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIHRvRXhwZW5zZUFwaURkTW1ZeXl5KHJhdyk7XHJcbn07XHJcblxyXG4vLyBSZXNvbHZlcyBsb2NhbGl6ZWQgZnVlbCBwcmljZSBzb3VyY2UgbWVzc2FnZXMgZm9yIGtub3duIGJhY2tlbmQgc291cmNlcy5cclxuY29uc3QgcmVzb2x2ZUZ1ZWxQcmljZVNvdXJjZU1lc3NhZ2UgPSAoc291cmNlOiBzdHJpbmcsIGVmZmVjdGl2ZURhdGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFNvdXJjZSA9IHNhZmVUZXh0KHNvdXJjZSk7XHJcbiAgaWYgKG5vcm1hbGl6ZWRTb3VyY2UgPT09IEZVRUxfUFJJQ0VfU09VUkNFX1VTRVJfQ09ORklHKSB7XHJcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfRnVlbFByaWNlX1NvdXJjZV9Vc2VyQ29uZmlnXCIsIFwiT2J0YWluZWQgYnkgdXNlciBjb25maWd1cmF0aW9uLlwiKTtcclxuICB9XHJcblxyXG4gIGlmIChub3JtYWxpemVkU291cmNlID09PSBGVUVMX1BSSUNFX1NPVVJDRV9HTE9CQUxfQ09ORklHKSB7XHJcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfRnVlbFByaWNlX1NvdXJjZV9HbG9iYWxDb25maWdcIiwgXCJPYnRhaW5lZCBieSBnbG9iYWwgY29uZmlndXJhdGlvbi5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzb3VyY2VMYWJlbCA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX0Z1ZWxQcmljZV9Tb3VyY2VcIiwgXCJGdWVsIHByaWNlIHNvdXJjZVwiKTtcclxuICBpZiAoIW5vcm1hbGl6ZWRTb3VyY2UpIHtcclxuICAgIHJldHVybiBlZmZlY3RpdmVEYXRlID8gYCR7c291cmNlTGFiZWx9OiAke2VmZmVjdGl2ZURhdGV9YCA6IHNvdXJjZUxhYmVsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGVmZmVjdGl2ZURhdGVcclxuICAgID8gYCR7c291cmNlTGFiZWx9OiAke25vcm1hbGl6ZWRTb3VyY2V9ICgke2VmZmVjdGl2ZURhdGV9KWBcclxuICAgIDogYCR7c291cmNlTGFiZWx9OiAke25vcm1hbGl6ZWRTb3VyY2V9YDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkQ3JlYXRlTGluZURyYWZ0ID0gKFxyXG4gIGJhc2VEYXRlOiBzdHJpbmcsXHJcbiAgcHJvamVjdElkOiBzdHJpbmcsXHJcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmcsXHJcbiAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogbnVtYmVyID0gREVGQVVMVF9MSU5FX1JFSU1CVVJTQUJMRV9FWFBFTlNFXHJcbik6IEV4cGVuc2VTaGVldExpbmUgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBsaW5lUmVjSWQ6IFwiXCIsXHJcbiAgICB0cmFuc0RhdGU6IGJhc2VEYXRlLFxyXG4gICAgdHlwZVZhbHVlOiBcIlwiLFxyXG4gICAgdHlwZVZhbHVlQ29kZTogXCJcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxyXG4gICAgaW50ZXJuYWNpb25hbDogZmFsc2UsXHJcbiAgICB0aWNrZXQ6IGZhbHNlLFxyXG4gICAgcHJpY2U6IG51bGwsXHJcbiAgICBxdHk6IDEsXHJcbiAgICBhbW91bnQ6IG51bGwsXHJcbiAgICBwcm9qSWQ6IHByb2plY3RJZCxcclxuICAgIHJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbiAgICBjdXJyZW5jeUNvZGUsXHJcbiAgICBhbW91bnRNU1Q6IG51bGwsXHJcbiAgICBleGNoUmF0ZTogMTAwLFxyXG4gICAgaW5kQXR0YWNoRmlsZXM6IFwiXCIsXHJcbiAgfTtcclxufTtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFN0YXRlQXJncyA9IHtcclxuICBoYXNBY2Nlc3M6IGJvb2xlYW47XHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcclxuICBjYW5NYW5hZ2VPdGhlclVzZXJzOiBib29sZWFuO1xyXG4gIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nO1xyXG4gIGN1cnJlbnRDcm1Vc2VySWQ6IHN0cmluZztcclxuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQ6IHN0cmluZztcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgbGluZUlkOiBzdHJpbmc7XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIHN0YXJ0SW5FZGl0TW9kZTogYm9vbGVhbjtcclxuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIE93bnMgc3RhdGUgYW5kIGJlaGF2aW9yIGZvciBleHBlbnNlIGxpbmUgZGV0YWlsIHBhZ2UgKHJlYWQsIGVkaXQsIGNyZWF0ZSkuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGUgPSAoe1xyXG4gIGhhc0FjY2VzcyxcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgY3VycmVudEF4VXNlcklkLFxyXG4gIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gIHNoZWV0SWQsXHJcbiAgbGluZUlkLFxyXG4gIGlzQ3JlYXRlTW9kZSxcclxuICBzdGFydEluRWRpdE1vZGUsXHJcbiAgb25Gb3JiaWRkZW4sXHJcbn06IFVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZUFyZ3MpID0+IHtcclxuICBjb25zdCBbaGVhZGVyLCBzZXRIZWFkZXJdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0SGVhZGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2xpbmUsIHNldExpbmVdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0TGluZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2lzRWRpdGluZywgc2V0SXNFZGl0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbW9kYWxFcnJvciwgc2V0TW9kYWxFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnREZXNjcmlwdGlvbiwgc2V0RHJhZnREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRUcmFuc0RhdGUsIHNldERyYWZ0VHJhbnNEYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdFR5cGVWYWx1ZUNvZGUsIHNldERyYWZ0VHlwZVZhbHVlQ29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRQcmljZSwgc2V0RHJhZnRQcmljZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRRdHksIHNldERyYWZ0UXR5XSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdFByb2plY3RJZCwgc2V0RHJhZnRQcm9qZWN0SWRdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0SW50ZXJuYXRpb25hbCwgc2V0RHJhZnRJbnRlcm5hdGlvbmFsXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UsIHNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZV0gPSB1c2VTdGF0ZTxudW1iZXIgfCBudWxsPihERUZBVUxUX0xJTkVfUkVJTUJVUlNBQkxFX0VYUEVOU0UpO1xyXG4gIGNvbnN0IFtkcmFmdEN1cnJlbmN5Q29kZSwgc2V0RHJhZnRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0QW1vdW50TVNULCBzZXREcmFmdEFtb3VudE1TVF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRFeGNoYW5nZVJhdGUsIHNldERyYWZ0RXhjaGFuZ2VSYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtpc0Z1ZWxQcmljZUxvYWRpbmcsIHNldElzRnVlbFByaWNlTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Z1ZWxQcmljZU1lc3NhZ2UsIHNldEZ1ZWxQcmljZU1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2Z1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yLCBzZXRGdWVsUHJpY2VNZXNzYWdlSXNFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2xpbmVOYXZpZ2F0aW9uLCBzZXRMaW5lTmF2aWdhdGlvbl0gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRMaW5lTmF2aWdhdGlvbj4oRU1QVFlfTElORV9OQVZJR0FUSU9OKTtcclxuXHJcbiAgY29uc3QgaHlkcmF0ZURyYWZ0RnJvbUxpbmUgPSB1c2VDYWxsYmFjaygobmV4dExpbmU6IEV4cGVuc2VTaGVldExpbmUgfCBudWxsLCBuZXh0SGVhZGVyOiBFeHBlbnNlU2hlZXRIZWFkZXIgfCBudWxsKSA9PiB7XHJcbiAgICBjb25zdCBpc0V4aXN0aW5nTGluZSA9ICEhc2FmZVRleHQobmV4dExpbmU/LmxpbmVSZWNJZCk7XHJcbiAgICBjb25zdCBub3JtYWxpemVkTGluZVByb2plY3RJZCA9IHNhZmVUZXh0KG5leHRMaW5lPy5wcm9qSWQpO1xyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbihzYWZlVGV4dChuZXh0TGluZT8uZGVzY3JpcHRpb24pKTtcclxuICAgIHNldERyYWZ0VHJhbnNEYXRlKHRvSW5wdXREYXRlKG5leHRMaW5lPy50cmFuc0RhdGUgfHwgbmV4dEhlYWRlcj8uY3JlYXRlZERhdGUpKTtcclxuICAgIHNldERyYWZ0VHlwZVZhbHVlQ29kZShzYWZlVGV4dChuZXh0TGluZT8udHlwZVZhbHVlQ29kZSkpO1xyXG4gICAgc2V0RHJhZnRQcmljZShmb3JtYXRFZGl0YWJsZU51bWJlcihuZXh0TGluZT8ucHJpY2UpKTtcclxuICAgIHNldERyYWZ0UXR5KGZvcm1hdEVkaXRhYmxlUXVhbnRpdHkobmV4dExpbmU/LnF0eSkpO1xyXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQoaXNFeGlzdGluZ0xpbmUgPyBub3JtYWxpemVkTGluZVByb2plY3RJZCA6IChub3JtYWxpemVkTGluZVByb2plY3RJZCB8fCBzYWZlVGV4dChuZXh0SGVhZGVyPy5wcm9qSWQpKSk7XHJcbiAgICBzZXREcmFmdEludGVybmF0aW9uYWwobmV4dExpbmU/LmludGVybmFjaW9uYWwgPT09IHRydWUgPyBcInRydWVcIiA6IG5leHRMaW5lPy5pbnRlcm5hY2lvbmFsID09PSBmYWxzZSA/IFwiZmFsc2VcIiA6IFwiXCIpO1xyXG4gICAgc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlKG5vcm1hbGl6ZUV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZShuZXh0TGluZT8ucmVpbWJ1cnNhYmxlRXhwZW5zZSkpO1xyXG4gICAgY29uc3QgbG9jYWxDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChuZXh0SGVhZGVyPy5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCkgfHwgXCJFVVJcIjtcbiAgICBjb25zdCBsaW5lQ3VycmVuY3lDb2RlID0gc2FmZVRleHQobmV4dExpbmU/LmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSB8fCBsb2NhbEN1cnJlbmN5Q29kZTtcbiAgICBjb25zdCBsaW5lQW1vdW50TVNUID1cbiAgICAgIG5leHRMaW5lPy52aXNpYmxlUmVpbWJ1cnNhYmxlVG90YWwgPz9cbiAgICAgIG5leHRMaW5lPy5hbW91bnRNU1QgPz9cbiAgICAgIChpc0V4cGVuc2VMaW5lU2FtZVJlaW1idXJzZW1lbnRDdXJyZW5jeShsaW5lQ3VycmVuY3lDb2RlLCBsb2NhbEN1cnJlbmN5Q29kZSkgPyBuZXh0TGluZT8uYW1vdW50IDogbnVsbCk7XG4gICAgY29uc3QgbGluZUV4Y2hhbmdlUmF0ZSA9IGxpbmVDdXJyZW5jeUNvZGUgPT09IGxvY2FsQ3VycmVuY3lDb2RlXHJcbiAgICAgID8gMTAwXHJcbiAgICAgIDogbmV4dExpbmU/LmV4Y2hSYXRlO1xyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUobGluZUN1cnJlbmN5Q29kZSk7XHJcbiAgICBzZXREcmFmdEFtb3VudE1TVChmb3JtYXRFZGl0YWJsZU51bWJlcihsaW5lQW1vdW50TVNUKSk7XHJcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShmb3JtYXRFZGl0YWJsZUV4Y2hhbmdlUmF0ZShsaW5lRXhjaGFuZ2VSYXRlKSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgbG9hZERldGFpbCA9IGFzeW5jICgpID0+IHtcclxuICAgICAgaWYgKCFoYXNBY2Nlc3MpIHtcclxuICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFzaGVldElkKSB7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCBsaW5lIHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICBzZXRMaW5lTmF2aWdhdGlvbihFTVBUWV9MSU5FX05BVklHQVRJT04pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwoc2hlZXRJZCwge1xyXG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlPy5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGxpbmUgZGV0YWlsLlwiKSk7XHJcbiAgICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICAgICAgc2V0TGluZU5hdmlnYXRpb24oRU1QVFlfTElORV9OQVZJR0FUSU9OKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IHNoZWV0cyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XHJcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZFNoZWV0ID1cclxuICAgICAgICAgICAgc2hlZXRzLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uSG9qYUdhc3Rvc0lkKS50b1VwcGVyQ2FzZSgpID09PSBzaGVldElkLnRyaW0oKS50b1VwcGVyQ2FzZSgpKSB8fCBzaGVldHNbMF07XHJcblxyXG4gICAgICAgICAgaWYgKCFzZWxlY3RlZFNoZWV0KSB7XHJcbiAgICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgbGluZSB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICAgICAgc2V0TGluZU5hdmlnYXRpb24oRU1QVFlfTElORV9OQVZJR0FUSU9OKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IGxvYWRlZEhlYWRlciA9IG1hcEV4cGVuc2VTaGVldEhlYWRlcihzZWxlY3RlZFNoZWV0KTtcclxuICAgICAgICAgIGNvbnN0IGxvYWRlZFN0YXR1c0NvZGUgPSB0eXBlb2YgbG9hZGVkSGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IGxvYWRlZEhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgOiBudWxsO1xyXG4gICAgICAgICAgY29uc3QgaXNDcmVhdGVMb2NrZWRTdGF0dXMgPSBsb2FkZWRTdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRCB8fCBsb2FkZWRTdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19QQUlEO1xyXG4gICAgICAgICAgY29uc3QgaXNNYW5hZ2luZ090aGVyVXNlciA9IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQoe1xyXG4gICAgICAgICAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgICAgICAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICAgICAgICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgICAgICAgcmVjb3JkT3duZXJVc2VySWQ6IGxvYWRlZEhlYWRlci51c2VySWQsXHJcbiAgICAgICAgICAgIGlzQ3JlYXRlTW9kZTogZmFsc2UsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNvbnN0IGxvYWRlZFBvbGljeSA9IHJlc29sdmVFeHBlbnNlU2hlZXREZXRhaWxQb2xpY3koe1xyXG4gICAgICAgICAgICBzdGF0dXNDb2RlOiBsb2FkZWRTdGF0dXNDb2RlLFxyXG4gICAgICAgICAgICBpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgICAgICAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgICAgICAgICBpc1BhaWQ6IGlzQ3JlYXRlTG9ja2VkU3RhdHVzIHx8IGhhc0Fzc2lnbmVkVm91Y2hlcihsb2FkZWRIZWFkZXIudm91Y2hlciksXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmIChpc0NyZWF0ZUxvY2tlZFN0YXR1cyB8fCBoYXNBc3NpZ25lZFZvdWNoZXIobG9hZGVkSGVhZGVyLnZvdWNoZXIpKSB7XHJcbiAgICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUGFpZFJlYWRPbmx5XCIsIFwiUGFpZCBleHBlbnNlIHNoZWV0cyBhcmUgcmVhZC1vbmx5LlwiKSk7XHJcbiAgICAgICAgICAgIHNldEhlYWRlcihsb2FkZWRIZWFkZXIpO1xyXG4gICAgICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgICAgICBzZXRMaW5lTmF2aWdhdGlvbihFTVBUWV9MSU5FX05BVklHQVRJT04pO1xyXG4gICAgICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAobG9hZGVkUG9saWN5LmludGVyYWN0aW9uTW9kZSAhPT0gXCJmdWxsX2VkaXRcIikge1xyXG4gICAgICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgZHJhZnRMaW5lID0gYnVpbGRDcmVhdGVMaW5lRHJhZnQoXHJcbiAgICAgICAgICAgIHRvSXNvRGF0ZShuZXcgRGF0ZSgpKSxcclxuICAgICAgICAgICAgc2FmZVRleHQobG9hZGVkSGVhZGVyLnByb2pJZCksXHJcbiAgICAgICAgICAgIHNhZmVUZXh0KGxvYWRlZEhlYWRlci5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCkgfHwgXCJFVVJcIlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNldEhlYWRlcihsb2FkZWRIZWFkZXIpO1xyXG4gICAgICAgICAgc2V0TGluZShkcmFmdExpbmUpO1xyXG4gICAgICAgICAgc2V0TGluZU5hdmlnYXRpb24oRU1QVFlfTElORV9OQVZJR0FUSU9OKTtcclxuICAgICAgICAgIHNldElzRWRpdGluZyh0cnVlKTtcclxuICAgICAgICAgIGh5ZHJhdGVEcmFmdEZyb21MaW5lKGRyYWZ0TGluZSwgbG9hZGVkSGVhZGVyKTtcclxuICAgICAgICAgIHNldFN0YXR1cyhcIlwiKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghbGluZUlkKSB7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IGxpbmUgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICAgIHNldExpbmVOYXZpZ2F0aW9uKEVNUFRZX0xJTkVfTkFWSUdBVElPTik7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKHNoZWV0SWQsIHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgbGluZSBkZXRhaWwuXCIpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgICAgICBzZXRMaW5lTmF2aWdhdGlvbihFTVBUWV9MSU5FX05BVklHQVRJT04pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2hlZXRzID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZFNoZWV0ID1cclxuICAgICAgICAgIHNoZWV0cy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnk/LkhvamFHYXN0b3NJZCkudG9VcHBlckNhc2UoKSA9PT0gc2hlZXRJZC50cmltKCkudG9VcHBlckNhc2UoKSkgfHwgc2hlZXRzWzBdO1xyXG5cclxuICAgICAgICBpZiAoIXNlbGVjdGVkU2hlZXQpIHtcclxuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgbGluZSB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgICAgc2V0TGluZU5hdmlnYXRpb24oRU1QVFlfTElORV9OQVZJR0FUSU9OKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1hcHBlZEhlYWRlciA9IG1hcEV4cGVuc2VTaGVldEhlYWRlcihzZWxlY3RlZFNoZWV0KTtcclxuICAgICAgICBjb25zdCBtYXBwZWRMaW5lcyA9IChBcnJheS5pc0FycmF5KHNlbGVjdGVkU2hlZXQuTGluZXMpID8gc2VsZWN0ZWRTaGVldC5MaW5lcyA6IFtdKS5tYXAoKGVudHJ5KSA9PlxyXG4gICAgICAgICAgbWFwRXhwZW5zZVNoZWV0TGluZShlbnRyeSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkTGluZSA9XHJcbiAgICAgICAgICBtYXBwZWRMaW5lcy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnkubGluZVJlY0lkKS50b1VwcGVyQ2FzZSgpID09PSBsaW5lSWQudHJpbSgpLnRvVXBwZXJDYXNlKCkpIHx8IG51bGw7XHJcblxyXG4gICAgICAgIGlmICghc2VsZWN0ZWRMaW5lKSB7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IGxpbmUgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgICAgc2V0SGVhZGVyKG1hcHBlZEhlYWRlcik7XHJcbiAgICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgICAgc2V0TGluZU5hdmlnYXRpb24oRU1QVFlfTElORV9OQVZJR0FUSU9OKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEhlYWRlcihtYXBwZWRIZWFkZXIpO1xyXG4gICAgICAgIHNldExpbmUoc2VsZWN0ZWRMaW5lKTtcclxuICAgICAgICBzZXRMaW5lTmF2aWdhdGlvbihidWlsZExpbmVOYXZpZ2F0aW9uKG1hcHBlZExpbmVzLCBzZWxlY3RlZExpbmUubGluZVJlY0lkKSk7XHJcbiAgICAgICAgY29uc3QgbG9hZGVkU3RhdHVzQ29kZSA9IHR5cGVvZiBtYXBwZWRIZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzID09PSBcIm51bWJlclwiID8gbWFwcGVkSGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA6IG51bGw7XHJcbiAgICAgICAgY29uc3QgbG9hZGVkSXNTaGVldEFwcHJvdmVkID0gbG9hZGVkU3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfQVBQUk9WRUQ7XHJcbiAgICAgICAgY29uc3QgbG9hZGVkSXNTaGVldFBhaWRCeVN0YXR1cyA9IGxvYWRlZFN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX1BBSUQ7XHJcbiAgICAgICAgY29uc3QgbG9hZGVkSXNTaGVldFBhaWQgPSBsb2FkZWRJc1NoZWV0UGFpZEJ5U3RhdHVzIHx8IGhhc0Fzc2lnbmVkVm91Y2hlcihtYXBwZWRIZWFkZXIudm91Y2hlcik7XHJcbiAgICAgICAgY29uc3QgbG9hZGVkSGFzTGlua2VkVGlja2V0ID0gISFzYWZlVGV4dChzZWxlY3RlZExpbmUuZmlsZUlkKTtcclxuICAgICAgICBjb25zdCBsb2FkZWRJc01hbmFnaW5nT3RoZXJVc2VyID0gaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCh7XHJcbiAgICAgICAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgICAgICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgICAgICAgY3VycmVudENybVVzZXJJZCxcclxuICAgICAgICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgICAgIHJlY29yZE93bmVyVXNlcklkOiBtYXBwZWRIZWFkZXIudXNlcklkLFxyXG4gICAgICAgICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGxvYWRlZFBvbGljeSA9IHJlc29sdmVFeHBlbnNlU2hlZXREZXRhaWxQb2xpY3koe1xyXG4gICAgICAgICAgc3RhdHVzQ29kZTogbG9hZGVkU3RhdHVzQ29kZSxcclxuICAgICAgICAgIGlzTWFuYWdpbmdPdGhlclVzZXI6IGxvYWRlZElzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICAgICAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgICAgICAgaXNQYWlkOiBsb2FkZWRJc1NoZWV0UGFpZCxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgc3RhcnRJbkVkaXRNb2RlICYmXHJcbiAgICAgICAgICAhbG9hZGVkSXNTaGVldEFwcHJvdmVkICYmXHJcbiAgICAgICAgICAhbG9hZGVkSXNTaGVldFBhaWQgJiZcclxuICAgICAgICAgICFsb2FkZWRIYXNMaW5rZWRUaWNrZXQgJiZcclxuICAgICAgICAgICFsb2FkZWRJc01hbmFnaW5nT3RoZXJVc2VyICYmXHJcbiAgICAgICAgICBsb2FkZWRQb2xpY3kuaW50ZXJhY3Rpb25Nb2RlID09PSBcImZ1bGxfZWRpdFwiXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XHJcbiAgICAgICAgICBoeWRyYXRlRHJhZnRGcm9tTGluZShzZWxlY3RlZExpbmUsIG1hcHBlZEhlYWRlcik7XHJcbiAgICAgICAgICBzZXRTdGF0dXMoXCJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBsaW5lIGRldGFpbC5cIikpO1xyXG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgIHNldExpbmVOYXZpZ2F0aW9uKEVNUFRZX0xJTkVfTkFWSUdBVElPTik7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2b2lkIGxvYWREZXRhaWwoKTtcclxuICB9LCBbXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBoeWRyYXRlRHJhZnRGcm9tTGluZSxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIHN0YXJ0SW5FZGl0TW9kZSxcclxuICAgIGxpbmVJZCxcclxuICAgIG9uRm9yYmlkZGVuLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgc2hlZXRJZCxcclxuICBdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghbGluZSB8fCBpc0VkaXRpbmcpIHJldHVybjtcclxuICAgIGh5ZHJhdGVEcmFmdEZyb21MaW5lKGxpbmUsIGhlYWRlcik7XHJcbiAgfSwgW2hlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUxpbmUsIGlzRWRpdGluZywgbGluZV0pO1xyXG5cclxuICBjb25zdCBub3JtYWxpemVkRHJhZnRUeXBlVmFsdWVDb2RlID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChkcmFmdFR5cGVWYWx1ZUNvZGUpLCBbZHJhZnRUeXBlVmFsdWVDb2RlXSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEZ1ZWxUcmFuc0RhdGUgPSB1c2VNZW1vKCgpID0+IG5vcm1hbGl6ZUZ1ZWxUcmFuc0RhdGUoZHJhZnRUcmFuc0RhdGUpLCBbZHJhZnRUcmFuc0RhdGVdKTtcclxuICBjb25zdCBpc0ttVHlwZSA9IG5vcm1hbGl6ZWREcmFmdFR5cGVWYWx1ZUNvZGUgPT09IEtNX0dBU1RPX1RZUEVfQ09ERTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgbGV0IHRpbWVyOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGwgPSBudWxsO1xyXG4gICAgbGV0IGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlciB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0IGNsZWFyUGVuZGluZyA9ICgpID0+IHtcclxuICAgICAgaWYgKHRpbWVyKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgICAgICB0aW1lciA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbnRyb2xsZXIpIHtcclxuICAgICAgICBjb250cm9sbGVyLmFib3J0KCk7XHJcbiAgICAgICAgY29udHJvbGxlciA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKCFpc0VkaXRpbmcgfHwgIWlzS21UeXBlKSB7XHJcbiAgICAgIHNldElzRnVlbFByaWNlTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICBjbGVhclBlbmRpbmcoKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIW5vcm1hbGl6ZWRGdWVsVHJhbnNEYXRlKSB7XHJcbiAgICAgIHNldElzRnVlbFByaWNlTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2UoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNsZWFyUGVuZGluZygpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRpbWVyID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcbiAgICAgIHNldElzRnVlbFByaWNlTG9hZGluZyh0cnVlKTtcclxuICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldEZ1ZWxQcmljZUttKG5vcm1hbGl6ZWRGdWVsVHJhbnNEYXRlLCB7XHJcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MgfHwgIXJlc3BvbnNlLkRhdGEgfHwgIU51bWJlci5pc0Zpbml0ZShOdW1iZXIocmVzcG9uc2UuRGF0YS5QcmljZUttKSkpIHtcclxuICAgICAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2UoXHJcbiAgICAgICAgICAgIHNhZmVUZXh0KHJlc3BvbnNlLk1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0Z1ZWxQcmljZV9Ob3RGb3VuZFwiLCBcIkNvdWxkIG5vdCBsb2FkIGZ1ZWwgcHJpY2UgZm9yIGttLlwiKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRQcmljZSA9IE51bWJlcihyZXNwb25zZS5EYXRhLlByaWNlS20pO1xyXG4gICAgICAgIGlmIChyZXNvbHZlZFByaWNlID4gMCkge1xyXG4gICAgICAgICAgc2V0RHJhZnRQcmljZShmb3JtYXRFZGl0YWJsZU51bWJlcihyZXNvbHZlZFByaWNlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzb3VyY2UgPSBzYWZlVGV4dChyZXNwb25zZS5EYXRhLlNvdXJjZSk7XHJcbiAgICAgICAgY29uc3QgZWZmZWN0aXZlRGF0ZSA9IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGEuVHJhbnNEYXRlKSB8fCBub3JtYWxpemVkRnVlbFRyYW5zRGF0ZTtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gcmVzb2x2ZUZ1ZWxQcmljZVNvdXJjZU1lc3NhZ2Uoc291cmNlLCBlZmZlY3RpdmVEYXRlKTtcclxuICAgICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcclxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHJldHVybjtcclxuXHJcbiAgICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZShcclxuICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3JcclxuICAgICAgICAgICAgPyBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfRnVlbFByaWNlX05vdEZvdW5kXCIsIFwiQ291bGQgbm90IGxvYWQgZnVlbCBwcmljZSBmb3Iga20uXCIpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlSXNFcnJvcih0cnVlKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBpZiAoIWlzQ2FuY2VsbGVkKSB7XHJcbiAgICAgICAgICBzZXRJc0Z1ZWxQcmljZUxvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgRlVFTF9QUklDRV9ERUJPVU5DRV9NUyk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaXNDYW5jZWxsZWQgPSB0cnVlO1xyXG4gICAgICBjbGVhclBlbmRpbmcoKTtcclxuICAgIH07XHJcbiAgfSwgW2lzRWRpdGluZywgaXNLbVR5cGUsIG5vcm1hbGl6ZWRGdWVsVHJhbnNEYXRlXSk7XHJcblxyXG4gIGNvbnN0IGhhc0FjdGl2ZVByb2Nlc3MgPSB1c2VNZW1vKCgpID0+IGJ1c3kgfHwgaXNFZGl0aW5nLCBbYnVzeSwgaXNFZGl0aW5nXSk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoaGFzQWN0aXZlUHJvY2Vzcyk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcclxuICAgIH07XHJcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcclxuXHJcbiAgY29uc3Qgc3RhdHVzQ29kZSA9IHR5cGVvZiBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgOiBudWxsO1xyXG4gIGNvbnN0IGlzU2hlZXRBcHByb3ZlZCA9IHN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkVEO1xyXG4gIGNvbnN0IGlzU2hlZXRQYWlkQnlTdGF0dXMgPSBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19QQUlEO1xyXG4gIGNvbnN0IGlzU2hlZXRQYWlkQnlWb3VjaGVyID0gaGFzQXNzaWduZWRWb3VjaGVyKGhlYWRlcj8udm91Y2hlcik7XHJcbiAgY29uc3QgaXNTaGVldFBhaWQgPSBpc1NoZWV0UGFpZEJ5U3RhdHVzIHx8IGlzU2hlZXRQYWlkQnlWb3VjaGVyO1xyXG4gIGNvbnN0IGlzTWFuYWdpbmdPdGhlclVzZXIgPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkKHtcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgcmVjb3JkT3duZXJVc2VySWQ6IGhlYWRlcj8udXNlcklkLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gIH0pO1xyXG4gIGNvbnN0IGRldGFpbFBvbGljeSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgaWYgKCFoZWFkZXIpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpbnRlcmFjdGlvbk1vZGU6IFwicmVhZF9vbmx5XCIgYXMgY29uc3QsXHJcbiAgICAgICAgc2hvd0ZhYjogZmFsc2UsXHJcbiAgICAgICAgY2FuRGVsZXRlU2hlZXQ6IGZhbHNlLFxyXG4gICAgICAgIHN0YXR1c0FjdGlvbnM6IFtdLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXNvbHZlRXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5KHtcclxuICAgICAgc3RhdHVzQ29kZSxcclxuICAgICAgaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgICAgaXNQYWlkOiBpc1NoZWV0UGFpZCxcclxuICAgIH0pO1xyXG4gIH0sIFthbGxvd1NlbGZNYW5hZ2VtZW50LCBoZWFkZXIsIGlzTWFuYWdpbmdPdGhlclVzZXIsIGlzU2hlZXRQYWlkLCBzdGF0dXNDb2RlXSk7XHJcbiAgY29uc3QgY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyA9IGRldGFpbFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgPT09IFwiZnVsbF9lZGl0XCI7XHJcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZUN1cnJlbnQgPSBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzO1xyXG4gIGNvbnN0IGNhbkVkaXRFeHBlbnNlQ3VycmVudCA9IGNhblVzZUZ1bGxFZGl0RmVhdHVyZXM7XHJcbiAgY29uc3QgY2FuRGVsZXRlRXhwZW5zZUN1cnJlbnQgPSBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzO1xyXG4gIGNvbnN0IGlzU2hlZXRMb2NrZWQgPSAhY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyB8fCBpc1NoZWV0QXBwcm92ZWQgfHwgaXNTaGVldFBhaWQ7XHJcbiAgY29uc3QgbGlua2VkVGlja2V0RmlsZUlkID0gc2FmZVRleHQobGluZT8uZmlsZUlkKTtcclxuICBjb25zdCBoYXNMaW5rZWRUaWNrZXQgPSAhaXNDcmVhdGVNb2RlICYmICEhbGlua2VkVGlja2V0RmlsZUlkO1xyXG4gIGNvbnN0IGlzTGluZUVkaXRMb2NrZWQgPSBpc1NoZWV0TG9ja2VkIHx8IGhhc0xpbmtlZFRpY2tldDtcclxuICBjb25zdCBpc0xpbmVEZWxldGVMb2NrZWQgPSBpc1NoZWV0TG9ja2VkO1xyXG4gIGNvbnN0IGlzTGluZUxvY2tlZCA9IGlzTGluZUVkaXRMb2NrZWQ7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlIHx8IGlzTG9hZGluZyB8fCAhaGVhZGVyIHx8ICFsaW5lIHx8IGlzTGluZUVkaXRMb2NrZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY2FuRWRpdEV4cGVuc2VDdXJyZW50KSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xyXG4gICAgaHlkcmF0ZURyYWZ0RnJvbUxpbmUobGluZSwgaGVhZGVyKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIikpO1xyXG4gIH0sIFtjYW5FZGl0RXhwZW5zZUN1cnJlbnQsIGhlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUxpbmUsIGlzQ3JlYXRlTW9kZSwgaXNMaW5lRWRpdExvY2tlZCwgaXNMb2FkaW5nLCBsaW5lLCBvbkZvcmJpZGRlbl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzaGVldElkKX1gO1xyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwsIHtcclxuICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc0VkaXRpbmcpIHJldHVybjtcclxuXHJcbiAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGh5ZHJhdGVEcmFmdEZyb21MaW5lKGxpbmUsIGhlYWRlcik7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xyXG4gIH0sIFtoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21MaW5lLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgbGluZSwgc2hlZXRJZF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlTW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZUN1cnJlbnQgfHwgIXNoZWV0SWQgfHwgaXNTaGVldExvY2tlZCkge1xyXG4gICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0TGluZURldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCl9Jm1vZGU9Y3JlYXRlYDtcclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xyXG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcclxuICAgIH0pO1xyXG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlQ3VycmVudCwgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIGlzU2hlZXRMb2NrZWQsIG9uRm9yYmlkZGVuLCBzaGVldElkXSk7XHJcblxyXG4gIGNvbnN0IG5hdmlnYXRlVG9TaGVldERldGFpbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQoc2hlZXRJZCk7XHJcbiAgICBpZiAoIXNhZmVTaGVldElkKSByZXR1cm47XHJcbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVTaGVldElkKX1gO1xyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsKTtcclxuICB9LCBbc2hlZXRJZF0pO1xyXG5cclxuICBjb25zdCBuYXZpZ2F0ZVRvTGluZURldGFpbCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHRhcmdldExpbmVJZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQoc2hlZXRJZCk7XHJcbiAgICAgIGNvbnN0IHNhZmVMaW5lSWQgPSBzYWZlVGV4dCh0YXJnZXRMaW5lSWQpO1xyXG4gICAgICBpZiAoaXNDcmVhdGVNb2RlIHx8ICFzYWZlU2hlZXRJZCB8fCAhc2FmZUxpbmVJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICBob2phR2FzdG9zSWQ6IHNhZmVTaGVldElkLFxyXG4gICAgICAgIGxpbmVSZWNJZDogc2FmZUxpbmVJZCxcclxuICAgICAgfSk7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL0V4cGVuc2VTaGVldExpbmVEZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcclxuICAgICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW2lzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nLCBzaGVldElkXVxyXG4gICk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoZWFkZXIsXHJcbiAgICBsaW5lLFxyXG4gICAgbGluZU5hdmlnYXRpb24sXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBidXN5LFxyXG4gICAgc3RhdHVzLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxFcnJvcixcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdFRyYW5zRGF0ZSxcclxuICAgIGRyYWZ0VHlwZVZhbHVlQ29kZSxcclxuICAgIGRyYWZ0UHJpY2UsXHJcbiAgICBkcmFmdFF0eSxcclxuICAgIGRyYWZ0UHJvamVjdElkLFxyXG4gICAgZHJhZnRJbnRlcm5hdGlvbmFsLFxyXG4gICAgZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBkcmFmdEFtb3VudE1TVCxcclxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgaXNLbVR5cGUsXHJcbiAgICBpc0Z1ZWxQcmljZUxvYWRpbmcsXHJcbiAgICBmdWVsUHJpY2VNZXNzYWdlLFxyXG4gICAgZnVlbFByaWNlTWVzc2FnZUlzRXJyb3IsXHJcbiAgICBpc1NoZWV0UGFpZCxcclxuICAgIGlzU2hlZXRMb2NrZWQsXHJcbiAgICBpc0xpbmVFZGl0TG9ja2VkLFxyXG4gICAgaXNMaW5lRGVsZXRlTG9ja2VkLFxyXG4gICAgaXNMaW5lTG9ja2VkLFxyXG4gICAgaGFzTGlua2VkVGlja2V0LFxyXG4gICAgbGlua2VkVGlja2V0RmlsZUlkLFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZUN1cnJlbnQsXHJcbiAgICBjYW5FZGl0RXhwZW5zZUN1cnJlbnQsXHJcbiAgICBjYW5EZWxldGVFeHBlbnNlQ3VycmVudCxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgIHNldERyYWZ0VHJhbnNEYXRlLFxyXG4gICAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlLFxyXG4gICAgc2V0RHJhZnRQcmljZSxcclxuICAgIHNldERyYWZ0UXR5LFxyXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICBzZXREcmFmdEludGVybmF0aW9uYWwsXHJcbiAgICBzZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIHNldERyYWZ0QW1vdW50TVNULFxyXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICAgIGhhbmRsZU9wZW5DcmVhdGVNb2RlLFxyXG4gICAgbmF2aWdhdGVUb1NoZWV0RGV0YWlsLFxyXG4gICAgbmF2aWdhdGVUb0xpbmVEZXRhaWwsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IG1hcEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfSBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XG5pbXBvcnQgeyBoYXNFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3U291cmNlIH0gZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL2V4cGVuc2VUaWNrZXRQcmV2aWV3VXRpbHMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcgfSBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldy50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VTaGVldExpbmVUaWNrZXRQcmV2aWV3QXJncyA9IHtcbiAgbGlua2VkVGlja2V0RmlsZUlkOiBzdHJpbmc7XG4gIGhhc0xpbmtlZFRpY2tldDogYm9vbGVhbjtcbn07XG5cbi8vIFBpY2tzIHRoZSBsaW5rZWQgdGlja2V0IGRldGFpbCBpdGVtIG5lZWRlZCB0byByZW5kZXIgdGhlIGV4aXN0aW5nIHByZXZpZXcgc2FmZWx5IGZyb20gdGhlIGxpbmUgcGFnZS5cbmNvbnN0IHJlc29sdmVMaW5rZWRUaWNrZXRQcmV2aWV3TWV0YWRhdGEgPSAoaXRlbXM6IHVua25vd25bXSwgbGlua2VkVGlja2V0RmlsZUlkOiBzdHJpbmcpID0+IHtcbiAgY29uc3Qgc2FmZUxpbmtlZFRpY2tldEZpbGVJZCA9IHNhZmVUZXh0KGxpbmtlZFRpY2tldEZpbGVJZCk7XG4gIGlmICghc2FmZUxpbmtlZFRpY2tldEZpbGVJZCB8fCAhQXJyYXkuaXNBcnJheShpdGVtcykgfHwgaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZpbGVOYW1lOiBcIlwiLFxuICAgICAgc291cmNlVXJsOiBcIlwiLFxuICAgIH07XG4gIH1cblxuICBjb25zdCBzZWxlY3RlZEl0ZW0gPVxuICAgIGl0ZW1zLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dCgoZW50cnkgYXMgeyBGaWxlSWQ/OiB1bmtub3duIH0pPy5GaWxlSWQpLnRvVXBwZXJDYXNlKCkgPT09IHNhZmVMaW5rZWRUaWNrZXRGaWxlSWQudG9VcHBlckNhc2UoKSkgfHxcbiAgICBpdGVtc1swXTtcbiAgaWYgKCFzZWxlY3RlZEl0ZW0gfHwgdHlwZW9mIHNlbGVjdGVkSXRlbSAhPT0gXCJvYmplY3RcIikge1xuICAgIHJldHVybiB7XG4gICAgICBmaWxlTmFtZTogXCJcIixcbiAgICAgIHNvdXJjZVVybDogXCJcIixcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgbWFwcGVkSGVhZGVyID0gbWFwRXhwZW5zZVRpY2tldERldGFpbEhlYWRlcihzZWxlY3RlZEl0ZW0gYXMgUGFyYW1ldGVyczx0eXBlb2YgbWFwRXhwZW5zZVRpY2tldERldGFpbEhlYWRlcj5bMF0pO1xuICByZXR1cm4ge1xuICAgIGZpbGVOYW1lOiBzYWZlVGV4dChtYXBwZWRIZWFkZXIuZmlsZU5hbWUpLFxuICAgIHNvdXJjZVVybDogc2FmZVRleHQobWFwcGVkSGVhZGVyLnVybEZpbGUpLFxuICB9O1xufTtcblxuLy8gTG9hZHMgbGlua2VkIHRpY2tldCBwcmV2aWV3IG1ldGFkYXRhIHdpdGhvdXQgY2hhbmdpbmcgdGhlIGV4aXN0aW5nIHNoZWV0LWxpbmUgZGV0YWlsIGNvbnRyYWN0LlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldExpbmVUaWNrZXRQcmV2aWV3ID0gKHtcbiAgbGlua2VkVGlja2V0RmlsZUlkLFxuICBoYXNMaW5rZWRUaWNrZXQsXG59OiBVc2VFeHBlbnNlU2hlZXRMaW5lVGlja2V0UHJldmlld0FyZ3MpID0+IHtcbiAgY29uc3QgW3ByZXZpZXdTb3VyY2VVcmwsIHNldFByZXZpZXdTb3VyY2VVcmxdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtwcmV2aWV3RmlsZU5hbWUsIHNldFByZXZpZXdGaWxlTmFtZV0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaGFzTGlua2VkVGlja2V0IHx8ICFzYWZlVGV4dChsaW5rZWRUaWNrZXRGaWxlSWQpKSB7XG4gICAgICBzZXRQcmV2aWV3U291cmNlVXJsKFwiXCIpO1xuICAgICAgc2V0UHJldmlld0ZpbGVOYW1lKFwiXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBjYW5jZWxsZWQgPSBmYWxzZTtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gICAgY29uc3QgbG9hZFRpY2tldFByZXZpZXdNZXRhZGF0YSA9IGFzeW5jICgpID0+IHtcbiAgICAgIHNldFByZXZpZXdTb3VyY2VVcmwoXCJcIik7XG4gICAgICBzZXRQcmV2aWV3RmlsZU5hbWUoXCJcIik7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXQobGlua2VkVGlja2V0RmlsZUlkLCB7XG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGNhbmNlbGxlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXRhZGF0YSA9IHJlc29sdmVMaW5rZWRUaWNrZXRQcmV2aWV3TWV0YWRhdGEocmVzcG9uc2U/Lkl0ZW1zIHx8IFtdLCBsaW5rZWRUaWNrZXRGaWxlSWQpO1xuICAgICAgICBzZXRQcmV2aWV3U291cmNlVXJsKG1ldGFkYXRhLnNvdXJjZVVybCk7XG4gICAgICAgIHNldFByZXZpZXdGaWxlTmFtZShtZXRhZGF0YS5maWxlTmFtZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoY2FuY2VsbGVkIHx8IChlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdm9pZCBsb2FkVGlja2V0UHJldmlld01ldGFkYXRhKCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICB9O1xuICB9LCBbaGFzTGlua2VkVGlja2V0LCBsaW5rZWRUaWNrZXRGaWxlSWRdKTtcblxuICBjb25zdCBzaG93U3RpY2t5UHJldmlldyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gaGFzTGlua2VkVGlja2V0ICYmIGhhc0V4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdTb3VyY2UocHJldmlld1NvdXJjZVVybCksXG4gICAgW2hhc0xpbmtlZFRpY2tldCwgcHJldmlld1NvdXJjZVVybF1cbiAgKTtcbiAgY29uc3QgcHJldmlld0FsdFRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+IHNhZmVUZXh0KHByZXZpZXdGaWxlTmFtZSkgfHwgaW5kVChcIlRpY2tldHNfRmllbGRfRmlsZUlkXCIsIFwiVGlja2V0XCIpLFxuICAgIFtwcmV2aWV3RmlsZU5hbWVdXG4gICk7XG4gIGNvbnN0IHByZXZpZXcgPSB1c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3KHtcbiAgICBmaWxlSWQ6IGxpbmtlZFRpY2tldEZpbGVJZCxcbiAgICBzb3VyY2VVcmw6IHByZXZpZXdTb3VyY2VVcmwsXG4gICAgZW5hYmxlZDogc2hvd1N0aWNreVByZXZpZXcsXG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgc2hvd1N0aWNreVByZXZpZXcsXG4gICAgcHJldmlld0ZpbGVOYW1lLFxuICAgIHByZXZpZXdBbHRUZXh0LFxuICAgIC4uLnByZXZpZXcsXG4gIH07XG59O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xyXG5pbXBvcnQgeyB1c2VQYWdlQm90dG9tQWN0aW9uc1Zpc2liaWxpdHkgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlUGFnZUJvdHRvbUFjdGlvbnNWaXNpYmlsaXR5LnRzXCI7XHJcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xyXG5cclxuY29uc3QgUEFHRV9CT1RUT01fRklYRURfQ09OVEVOVF9UT1BfUEFERElOR19QWCA9IDEyO1xyXG5jb25zdCBQQUdFX0JPVFRPTV9GSVhFRF9DT05URU5UX0NPTVBBQ1RfVE9QX1BBRERJTkdfUFggPSA0O1xyXG5jb25zdCBQQUdFX0JPVFRPTV9GSVhFRF9DT05URU5UX1NJREVfUEFERElOR19QWCA9IDg7XHJcbmNvbnN0IFBBR0VfQk9UVE9NX0ZJWEVEX0NPTlRFTlRfQk9UVE9NX1BBRERJTkcgPSBcImNhbGMoMC43NXJlbSArIGVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tLCAwcHgpKVwiO1xyXG5jb25zdCBQQUdFX0JPVFRPTV9GSVhFRF9DT05URU5UX0NPTVBBQ1RfQk9UVE9NX1BBRERJTkcgPSBcImNhbGMoMC4zNXJlbSArIGVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tLCAwcHgpKVwiO1xyXG5cclxudHlwZSBQYWdlQm90dG9tRml4ZWRDb250ZW50VmFyaWFudCA9IFwic3RhbmRhcmRcIiB8IFwiY29tcGFjdFwiO1xyXG5cclxudHlwZSBQYWdlQm90dG9tRml4ZWRDb250ZW50UHJvcHMgPSB7XHJcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcclxuICB2YXJpYW50PzogUGFnZUJvdHRvbUZpeGVkQ29udGVudFZhcmlhbnQ7XHJcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIGlubmVyQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gS2VlcHMgYXJiaXRyYXJ5IHBhZ2UgY29udHJvbHMgdmlzaWJsZSBhdCB0aGUgYm90dG9tIHdoaWxlIHJlc2VydmluZyB0aGVpciBsYXlvdXQgaGVpZ2h0LlxyXG5jb25zdCBQYWdlQm90dG9tRml4ZWRDb250ZW50ID0gKHtcclxuICBjaGlsZHJlbixcclxuICB2YXJpYW50ID0gXCJzdGFuZGFyZFwiLFxyXG4gIGNsYXNzTmFtZSxcclxuICBpbm5lckNsYXNzTmFtZSxcclxufTogUGFnZUJvdHRvbUZpeGVkQ29udGVudFByb3BzKSA9PiB7XHJcbiAgY29uc3QgeyByZXNlcnZlZEhlaWdodCwgd3JhcHBlclJlZiwgY29udGVudEluc2V0cyB9ID0gdXNlUGFnZUJvdHRvbUFjdGlvbnNWaXNpYmlsaXR5KCk7XHJcbiAgY29uc3QgcG9ydGFsVGFyZ2V0ID0gdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiID8gbnVsbCA6IGRvY3VtZW50LmJvZHk7XHJcbiAgY29uc3QgaXNDb21wYWN0ID0gdmFyaWFudCA9PT0gXCJjb21wYWN0XCI7XHJcbiAgY29uc3QgdG9wUGFkZGluZ1B4ID0gaXNDb21wYWN0ID8gUEFHRV9CT1RUT01fRklYRURfQ09OVEVOVF9DT01QQUNUX1RPUF9QQURESU5HX1BYIDogUEFHRV9CT1RUT01fRklYRURfQ09OVEVOVF9UT1BfUEFERElOR19QWDtcclxuICBjb25zdCBib3R0b21QYWRkaW5nID0gaXNDb21wYWN0ID8gUEFHRV9CT1RUT01fRklYRURfQ09OVEVOVF9DT01QQUNUX0JPVFRPTV9QQURESU5HIDogUEFHRV9CT1RUT01fRklYRURfQ09OVEVOVF9CT1RUT01fUEFERElORztcclxuXHJcbiAgaWYgKCFjaGlsZHJlbikge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBmaXhlZENvbnRlbnQgPSAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIHJlZj17d3JhcHBlclJlZn1cclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgIFwiZml4ZWQgaW5zZXQteC0wIGJvdHRvbS0wIHotMTkwMCBib3JkZXItdCBib3JkZXItc2xhdGUtMjAwLzkwIGJnLXdoaXRlIHNoYWRvdy1bMF8tMTBweF8yOHB4X3JnYmEoMTUsMjMsNDIsMC4xMildXCIsXHJcbiAgICAgICAgY2xhc3NOYW1lIHx8IFwiXCJcclxuICAgICAgKX1cclxuICAgID5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXHJcbiAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgIHBhZGRpbmdUb3A6IGAke3RvcFBhZGRpbmdQeH1weGAsXHJcbiAgICAgICAgICBwYWRkaW5nTGVmdDogYCR7Y29udGVudEluc2V0cz8ubGVmdCA/PyBQQUdFX0JPVFRPTV9GSVhFRF9DT05URU5UX1NJREVfUEFERElOR19QWH1weGAsXHJcbiAgICAgICAgICBwYWRkaW5nUmlnaHQ6IGAke2NvbnRlbnRJbnNldHM/LnJpZ2h0ID8/IFBBR0VfQk9UVE9NX0ZJWEVEX0NPTlRFTlRfU0lERV9QQURESU5HX1BYfXB4YCxcclxuICAgICAgICAgIHBhZGRpbmdCb3R0b206IGJvdHRvbVBhZGRpbmcsXHJcbiAgICAgICAgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwicG9pbnRlci1ldmVudHMtYXV0byB3LWZ1bGxcIiwgaW5uZXJDbGFzc05hbWUgfHwgXCJcIil9PntjaGlsZHJlbn08L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPGRpdiBhcmlhLWhpZGRlbj1cInRydWVcIiBzdHlsZT17eyBoZWlnaHQ6IGAke3Jlc2VydmVkSGVpZ2h0fXB4YCB9fSAvPlxyXG4gICAgICB7cG9ydGFsVGFyZ2V0ID8gY3JlYXRlUG9ydGFsKGZpeGVkQ29udGVudCwgcG9ydGFsVGFyZ2V0KSA6IG51bGx9XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFnZUJvdHRvbUZpeGVkQ29udGVudDtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBSZWZPYmplY3QsIFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgUGFnZUJvdHRvbUZpeGVkQ29udGVudCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1BhZ2VCb3R0b21GaXhlZENvbnRlbnQudHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbCBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3IGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0U3RpY2t5UHJldmlldy50c3hcIjtcclxuaW1wb3J0IHR5cGUgeyBUaWNrZXRQcmV2aWV3UG9pbnQgfSBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldy50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVmlld1Byb3BzID0ge1xyXG4gIG1vZGFsOiB7XHJcbiAgICBvcGVuOiBib29sZWFuO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0OiBzdHJpbmc7XHJcbiAgICBjYW5jZWxUZXh0OiBzdHJpbmc7XHJcbiAgICBsb2FkaW5nVGV4dDogc3RyaW5nO1xyXG4gICAgc2hvd0NhbmNlbDogYm9vbGVhbjtcclxuICAgIHNob3dDb25maXJtOiBib29sZWFuO1xyXG4gICAgYnVzeTogYm9vbGVhbjtcclxuICAgIGVycm9yOiBzdHJpbmc7XHJcbiAgICBzdGF0dXM6IHN0cmluZztcclxuICAgIG9uQ29uZmlybTogKCkgPT4gdm9pZDtcclxuICAgIG9uQ2FuY2VsOiAoKSA9PiB2b2lkO1xyXG4gIH07XHJcbiAgcHJldmlldzoge1xyXG4gICAgb3BlbjogYm9vbGVhbjtcclxuICAgIGJ1c3k6IGJvb2xlYW47XHJcbiAgICBlcnJvcjogc3RyaW5nO1xyXG4gICAgaW1hZ2VVcmw6IHN0cmluZztcclxuICAgIGltYWdlQWx0OiBzdHJpbmc7XHJcbiAgICBmaWxlTmFtZTogc3RyaW5nO1xyXG4gICAgc2NhbGU6IG51bWJlcjtcclxuICAgIHRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50O1xyXG4gICAgc3VyZmFjZVJlZjogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgICBzaG93U3RpY2t5UHJldmlldzogYm9vbGVhbjtcclxuICAgIG9uT3BlbjogKCkgPT4gdm9pZDtcclxuICAgIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XHJcbiAgICBvblBvaW50ZXJEb3duOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgICBvblBvaW50ZXJNb3ZlOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgICBvblBvaW50ZXJFbmQ6IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICB9O1xyXG4gIGNvbnRlbnQ6IHtcclxuICAgIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICAgIGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZTogYm9vbGVhbjtcclxuICAgIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgbGluZU5hdmlnYXRvcjogUmVhY3ROb2RlO1xyXG4gICAgZGV0YWlsQm9keTogUmVhY3ROb2RlO1xyXG4gIH07XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIHRoZSBsaW5lIGRldGFpbCBzaGVsbCB3aGlsZSB0aGUgcGFnZSBjb250YWluZXIga2VlcHMgb3duZXJzaGlwIG9mIG9yY2hlc3RyYXRpb24gYW5kIG11dGF0aW9ucy5cclxuY29uc3QgRXhwZW5zZVNoZWV0TGluZURldGFpbFZpZXcgPSAoeyBtb2RhbCwgcHJldmlldywgY29udGVudCB9OiBFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVmlld1Byb3BzKSA9PiB7XHJcbiAgY29uc3Qgc2hvd0xpbmVOYXZpZ2F0b3IgPSBCb29sZWFuKGNvbnRlbnQuZGV0YWlsQm9keSAmJiBjb250ZW50LmxpbmVOYXZpZ2F0b3IpO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cclxuICAgICAgPENvbmZpcm1Nb2RhbFxyXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XHJcbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxyXG4gICAgICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XHJcbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsLmNvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsLmNhbmNlbFRleHR9XHJcbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsLmxvYWRpbmdUZXh0fVxyXG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XHJcbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxyXG4gICAgICAgIGJ1c3k9e21vZGFsLmJ1c3l9XHJcbiAgICAgICAgZXJyb3I9e21vZGFsLmVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17bW9kYWwuc3RhdHVzfVxyXG4gICAgICAgIG9uQ29uZmlybT17bW9kYWwub25Db25maXJtfVxyXG4gICAgICAgIG9uQ2FuY2VsPXttb2RhbC5vbkNhbmNlbH1cclxuICAgICAgLz5cclxuICAgICAgPEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWxcclxuICAgICAgICBvcGVuPXtwcmV2aWV3Lm9wZW59XHJcbiAgICAgICAgYnVzeT17cHJldmlldy5idXN5fVxyXG4gICAgICAgIGVycm9yPXtwcmV2aWV3LmVycm9yfVxyXG4gICAgICAgIGltYWdlVXJsPXtwcmV2aWV3LmltYWdlVXJsfVxyXG4gICAgICAgIGltYWdlQWx0PXtwcmV2aWV3LmltYWdlQWx0fVxyXG4gICAgICAgIHNjYWxlPXtwcmV2aWV3LnNjYWxlfVxyXG4gICAgICAgIHRyYW5zbGF0ZT17cHJldmlldy50cmFuc2xhdGV9XHJcbiAgICAgICAgc3VyZmFjZVJlZj17cHJldmlldy5zdXJmYWNlUmVmfVxyXG4gICAgICAgIG9uQ2xvc2U9e3ByZXZpZXcub25DbG9zZX1cclxuICAgICAgICBvblBvaW50ZXJEb3duPXtwcmV2aWV3Lm9uUG9pbnRlckRvd259XHJcbiAgICAgICAgb25Qb2ludGVyTW92ZT17cHJldmlldy5vblBvaW50ZXJNb3ZlfVxyXG4gICAgICAgIG9uUG9pbnRlckVuZD17cHJldmlldy5vblBvaW50ZXJFbmR9XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCJcclxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBjb250ZW50LmlzTG9hZGluZyB8fCBjb250ZW50LmlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XHJcbiAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7Y29udGVudC5lcnJvck1lc3NhZ2UgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2NvbnRlbnQuZXJyb3JNZXNzYWdlfTwvZGl2PiA6IG51bGx9XHJcblxyXG4gICAgICB7Y29udGVudC5kZXRhaWxCb2R5ID8gKFxyXG4gICAgICAgIHByZXZpZXcuc2hvd1N0aWNreVByZXZpZXcgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi13LTAgbWF4LXctZnVsbCBzcGFjZS15LTIgbGc6Z3JpZCBsZzpncmlkLWNvbHMtW21pbm1heCgwLDFmcilfMzIwcHhdIGxnOmdhcC00IGxnOnNwYWNlLXktMFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi13LTAgbWF4LXctZnVsbCBsZzpjb2wtc3RhcnQtMlwiPlxyXG4gICAgICAgICAgICAgIDxFeHBlbnNlVGlja2V0U3RpY2t5UHJldmlld1xyXG4gICAgICAgICAgICAgICAgYnVzeT17cHJldmlldy5idXN5fVxyXG4gICAgICAgICAgICAgICAgZXJyb3I9e3ByZXZpZXcuZXJyb3J9XHJcbiAgICAgICAgICAgICAgICBpbWFnZVVybD17cHJldmlldy5pbWFnZVVybH1cclxuICAgICAgICAgICAgICAgIGltYWdlQWx0PXtwcmV2aWV3LmltYWdlQWx0fVxyXG4gICAgICAgICAgICAgICAgZmlsZU5hbWU9e3ByZXZpZXcuZmlsZU5hbWV9XHJcbiAgICAgICAgICAgICAgICBvbk9wZW49e3ByZXZpZXcub25PcGVufVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi13LTAgc3BhY2UteS0yIGxnOmNvbC1zdGFydC0xIGxnOnJvdy1zdGFydC0xXCI+e2NvbnRlbnQuZGV0YWlsQm9keX08L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICBjb250ZW50LmRldGFpbEJvZHlcclxuICAgICAgICApXHJcbiAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAge3Nob3dMaW5lTmF2aWdhdG9yID8gPFBhZ2VCb3R0b21GaXhlZENvbnRlbnQgdmFyaWFudD1cImNvbXBhY3RcIj57Y29udGVudC5saW5lTmF2aWdhdG9yfTwvUGFnZUJvdHRvbUZpeGVkQ29udGVudD4gOiBudWxsfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldExpbmVEZXRhaWxWaWV3O1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgcGFyc2VEZWNpbWFsSW5wdXQgfSBmcm9tIFwiLi4vaG9va3MvZXhwZW5zZU11dGF0aW9uVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgdG9FeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZUdhc3RvVHlwZUNhdGFsb2cudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVNoZWV0TGluZVR5cGVWYWxpZGF0aW9uQXJncyA9IHtcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xuICBkcmFmdFR5cGVWYWx1ZUNvZGU6IHN0cmluZztcbiAgZHJhZnRQcmljZTogc3RyaW5nO1xuICBkcmFmdFF0eTogc3RyaW5nO1xuICBzZXREcmFmdERlc2NyaXB0aW9uOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0RHJhZnRQcmljZTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldERyYWZ0UXR5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+Pjtcbn07XG5cbi8vIEtlZXBzIGxpbmUgc2F2ZSB2YWxpZGF0aW9uIGxvY2FsIHNvIHNhdmUgZmxvdyBjYW4gYmxvY2sgYmVmb3JlIG9wZW5pbmcgdGhlIG1vZGFsLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldExpbmVUeXBlVmFsaWRhdGlvbiA9ICh7XG4gIGRyYWZ0RGVzY3JpcHRpb24sXG4gIGRyYWZ0VHlwZVZhbHVlQ29kZSxcbiAgZHJhZnRQcmljZSxcbiAgZHJhZnRRdHksXG4gIHNldERyYWZ0RGVzY3JpcHRpb24sXG4gIHNldERyYWZ0VHlwZVZhbHVlQ29kZSxcbiAgc2V0RHJhZnRQcmljZSxcbiAgc2V0RHJhZnRRdHksXG59OiBVc2VFeHBlbnNlU2hlZXRMaW5lVHlwZVZhbGlkYXRpb25BcmdzKSA9PiB7XG4gIGNvbnN0IFtkZXNjcmlwdGlvbkludmFsaWQsIHNldERlc2NyaXB0aW9uSW52YWxpZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFt0eXBlSW52YWxpZCwgc2V0VHlwZUludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcHJpY2VJbnZhbGlkLCBzZXRQcmljZUludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcXR5SW52YWxpZCwgc2V0UXR5SW52YWxpZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCB0eXBlSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBwcmljZUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcXR5SW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IGZvY3VzRGVzY3JpcHRpb25GaWVsZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXREZXNjcmlwdGlvbkludmFsaWQodHJ1ZSk7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBkZXNjcmlwdGlvbklucHV0UmVmLmN1cnJlbnQ/LmZvY3VzKCk7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBmb2N1c1R5cGVGaWVsZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRUeXBlSW52YWxpZCh0cnVlKTtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHR5cGVJbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xuICAgIH0pO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgZm9jdXNBbW91bnRGaWVsZHMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBwYXJzZWRRdHkgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFF0eSk7XHJcbiAgICBjb25zdCBwYXJzZWRQcmljZSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0UHJpY2UpO1xyXG4gICAgY29uc3QgcXR5SXNWYWxpZCA9IHBhcnNlZFF0eSAhPSBudWxsICYmIHBhcnNlZFF0eSA+IDA7XHJcbiAgICBjb25zdCBwcmljZUlzVmFsaWQgPSBwYXJzZWRQcmljZSAhPSBudWxsICYmIHBhcnNlZFByaWNlID4gMDtcclxuXHJcbiAgICBzZXRRdHlJbnZhbGlkKCFxdHlJc1ZhbGlkKTtcclxuICAgIHNldFByaWNlSW52YWxpZCghcHJpY2VJc1ZhbGlkKTtcclxuXHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgaWYgKCFxdHlJc1ZhbGlkKSB7XHJcbiAgICAgICAgcXR5SW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghcHJpY2VJc1ZhbGlkKSB7XHJcbiAgICAgICAgcHJpY2VJbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcbiAgfSwgW2RyYWZ0UHJpY2UsIGRyYWZ0UXR5XSk7XG5cbiAgY29uc3QgaGFuZGxlRHJhZnREZXNjcmlwdGlvbkNoYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICBzZXREZXNjcmlwdGlvbkludmFsaWQoZmFsc2UpO1xuICAgICAgc2V0RHJhZnREZXNjcmlwdGlvbih2YWx1ZSk7XG4gICAgfSxcbiAgICBbc2V0RHJhZnREZXNjcmlwdGlvbl1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVEcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgc2V0VHlwZUludmFsaWQoZmFsc2UpO1xuICAgICAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlKHZhbHVlKTtcbiAgICB9LFxyXG4gICAgW3NldERyYWZ0VHlwZVZhbHVlQ29kZV1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVEcmFmdFByaWNlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICBzZXRQcmljZUludmFsaWQoZmFsc2UpO1xyXG4gICAgICBzZXREcmFmdFByaWNlKHZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBbc2V0RHJhZnRQcmljZV1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVEcmFmdFF0eUNoYW5nZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgICAgc2V0UXR5SW52YWxpZChmYWxzZSk7XHJcbiAgICAgIHNldERyYWZ0UXR5KHZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBbc2V0RHJhZnRRdHldXG4gICk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoU3RyaW5nKGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpKSB7XG4gICAgICBzZXREZXNjcmlwdGlvbkludmFsaWQoZmFsc2UpO1xuICAgIH1cbiAgfSwgW2RyYWZ0RGVzY3JpcHRpb25dKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHBhcnNlZFByaWNlID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRQcmljZSk7XG4gICAgaWYgKHBhcnNlZFByaWNlICE9IG51bGwgJiYgcGFyc2VkUHJpY2UgPiAwKSB7XG4gICAgICBzZXRQcmljZUludmFsaWQoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtkcmFmdFByaWNlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBwYXJzZWRRdHkgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFF0eSk7XHJcbiAgICBpZiAocGFyc2VkUXR5ICE9IG51bGwgJiYgcGFyc2VkUXR5ID4gMCkge1xyXG4gICAgICBzZXRRdHlJbnZhbGlkKGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbZHJhZnRRdHldKTtcblxuICBjb25zdCBjYW5PcGVuU2F2ZUNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFTdHJpbmcoZHJhZnREZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCkpIHtcbiAgICAgIGZvY3VzRGVzY3JpcHRpb25GaWVsZCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0b0V4cGVuc2VHYXN0b1R5cGVDb2RlKGRyYWZ0VHlwZVZhbHVlQ29kZSwgeyBhbGxvd05vbmU6IGZhbHNlIH0pID09PSBudWxsKSB7XG4gICAgICBmb2N1c1R5cGVGaWVsZCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXJzZWRQcmljZSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0UHJpY2UpO1xyXG4gICAgY29uc3QgcGFyc2VkUXR5ID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRRdHkpO1xyXG4gICAgY29uc3QgaGFzVmFsaWRRdHlQcmljZSA9IHBhcnNlZFF0eSAhPSBudWxsICYmIHBhcnNlZFF0eSA+IDAgJiYgcGFyc2VkUHJpY2UgIT0gbnVsbCAmJiBwYXJzZWRQcmljZSA+IDA7XHJcbiAgICBpZiAoaGFzVmFsaWRRdHlQcmljZSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXG4gICAgZm9jdXNBbW91bnRGaWVsZHMoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sIFtkcmFmdERlc2NyaXB0aW9uLCBkcmFmdFByaWNlLCBkcmFmdFF0eSwgZHJhZnRUeXBlVmFsdWVDb2RlLCBmb2N1c0Ftb3VudEZpZWxkcywgZm9jdXNEZXNjcmlwdGlvbkZpZWxkLCBmb2N1c1R5cGVGaWVsZF0pO1xuXG4gIHJldHVybiB7XG4gICAgZGVzY3JpcHRpb25JbnZhbGlkLFxuICAgIHR5cGVJbnZhbGlkLFxuICAgIHByaWNlSW52YWxpZCxcbiAgICBxdHlJbnZhbGlkLFxuICAgIGRlc2NyaXB0aW9uSW5wdXRSZWYsXG4gICAgdHlwZUlucHV0UmVmLFxuICAgIHByaWNlSW5wdXRSZWYsXG4gICAgcXR5SW5wdXRSZWYsXG4gICAgZm9jdXNEZXNjcmlwdGlvbkZpZWxkLFxuICAgIGZvY3VzVHlwZUZpZWxkLFxuICAgIGZvY3VzQW1vdW50RmllbGRzLFxuICAgIGhhbmRsZURyYWZ0RGVzY3JpcHRpb25DaGFuZ2UsXG4gICAgaGFuZGxlRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlLFxuICAgIGhhbmRsZURyYWZ0UHJpY2VDaGFuZ2UsXG4gICAgaGFuZGxlRHJhZnRRdHlDaGFuZ2UsXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gIH07XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBeUU7OztBQzJEbkU7QUFsQk4sSUFBTSx3QkFBd0IsQ0FBQyxFQUFFLE9BQU8s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LFFBQ2IsU0FBUyxNQUFNO0FBQUEsUUFDZixhQUFhO0FBQUEsUUFDYixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixZQUFZLE1BQU07QUFBQSxRQUNsQixhQUFhLE1BQU07QUFBQSxRQUNuQixNQUFNLFFBQVE7QUFBQSxRQUNkLE9BQU87QUFBQSxRQUNQO0FBQUEsUUFDQSxXQUFXO0FBQUEsUUFDWCxVQUFVO0FBQUEsTUFDWjtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsVUFBVTtBQUFBLFFBQ1YsVUFBVTtBQUFBLFFBQ1YsVUFBVTtBQUFBLFFBQ1YsT0FBTztBQUFBLFFBQ1AsV0FBVztBQUFBLFFBQ1gsWUFBWTtBQUFBLFFBQ1o7QUFBQSxRQUNBLFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxRQUNULGVBQWU7QUFBQSxRQUNmLGVBQWU7QUFBQSxRQUNmLGNBQWM7QUFBQSxNQUNoQjtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBO0FBQUEsRUFDRjtBQUVKO0FBR0EsSUFBTSw2QkFBNkIsTUFBTTtBQUN2QyxTQUNFLDZDQUFDLGdDQUFxQix5QkFBdUIsTUFDM0MsdURBQUMsaUNBQThCLEdBQ2pDO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSwwQkFBMEI7QUFDakUsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQyw4QkFBMkIsQ0FBRTtBQUN6RDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8scUNBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAicmVzcG9uc2UiLCAic2hlZXRzIiwgInNlbGVjdGVkU2hlZXQiLCAibG9hZGVkU3RhdHVzQ29kZSIsICJpc01hbmFnaW5nT3RoZXJVc2VyIiwgImxvYWRlZFBvbGljeSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
