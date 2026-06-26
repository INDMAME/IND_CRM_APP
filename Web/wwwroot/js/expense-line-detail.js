import {
  SingleDatePicker
} from "./chunks/chunk-6BFAITKE.js";
import {
  ExpenseTicketPreviewModal_default,
  ExpenseTicketStickyPreview_default,
  hasExpenseTicketImagePreviewSource,
  useExpenseTicketImagePreview
} from "./chunks/chunk-ZVZYHQGI.js";
import {
  ExpenseCurrencyFilterSelect_default
} from "./chunks/chunk-6ZWU6U6U.js";
import {
  mapExpenseTicketDetailHeader
} from "./chunks/chunk-KSIWAXD5.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-Y7PWEQHF.js";
import "./chunks/chunk-WQESTJQX.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-5FRAKTKT.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-GMPCIITL.js";
import "./chunks/chunk-4BE3ZFCK.js";
import {
  isManagingOtherExpenseRecord,
  resolveExpenseSheetDetailPolicy,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-WQGMDJUU.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-UXY4YQ3D.js";
import "./chunks/chunk-CBDB7NMA.js";
import {
  clearExpenseNavigationGuard,
  formatAmountWithCurrency,
  formatExpenseInputNumber,
  formatExpenseNumber,
  navigateToExpenseUrl,
  reloadExpensePage,
  setExpenseNavigationGuard
} from "./chunks/chunk-GYS3ZBXR.js";
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
} from "./chunks/chunk-GDLOXSCF.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-FBPSAJMQ.js";
import {
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  getExpenseGastoTypeOptions,
  mapBooleanEnumOptions,
  toExpenseApiDdMmYyyy
} from "./chunks/chunk-HGU6IHIX.js";
import "./chunks/chunk-ZBKHPZJX.js";
import "./chunks/chunk-DY2B5JHI.js";
import {
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
import "./chunks/chunk-6HGCHSZG.js";
import {
  __toESM
} from "./chunks/chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/pages/gastos/line/ExpenseSheetLineDetailPage.tsx
var import_react6 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/components/ExpenseSheetLineForm.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
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
  amountMSTText,
  isEditing,
  draftCurrencyCode,
  draftAmountMST,
  draftExchangeRate,
  localCurrencyCode,
  onDraftCurrencyCodeChange,
  onDraftAmountMSTChange,
  onDraftExchangeRateChange
}) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_AmountCurrency", "Amount currency"), value: amountText || "-" }),
  isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ExpenseCurrencyFilterSelect_default,
    {
      label: indT("ExpenseSheets_Field_Currency", "Currency"),
      placeholder: indT("ExpenseSheets_Filter_Currency_Placeholder", "Currency code"),
      value: draftCurrencyCode,
      onChange: onDraftCurrencyCodeChange,
      idBase: "expense-line-currency"
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ExpenseReadOnlyField_default,
    {
      label: indT("ExpenseSheets_Field_Currency", "Currency"),
      value: safeText(line.currencyCode) || localCurrencyCode || "-"
    }
  ),
  isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "input",
      {
        className: "form-control",
        type: "text",
        inputMode: "decimal",
        value: draftExchangeRate,
        onChange: (event) => onDraftExchangeRateChange(event.target.value || ""),
        onBlur: (event) => onDraftExchangeRateChange(
          formatExpenseInputNumber(event.target.value, {
            minimumFractionDigits: 7,
            maximumFractionDigits: 7,
            useGrouping: true,
            fallback: ""
          })
        ),
        "aria-label": indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate")
      }
    )
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ExpenseReadOnlyField_default,
    {
      label: indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate"),
      value: formatExpenseNumber(line.exchRate ?? null, {
        minimumFractionDigits: 7,
        maximumFractionDigits: 7,
        useGrouping: true,
        fallback: "-"
      })
    }
  ),
  isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_ReimbursementAmount", "Reimbursement amount") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "input",
      {
        className: "form-control",
        type: "text",
        inputMode: "decimal",
        value: draftAmountMST,
        onChange: (event) => onDraftAmountMSTChange(event.target.value || ""),
        onBlur: (event) => onDraftAmountMSTChange(
          formatExpenseInputNumber(event.target.value, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
            fallback: ""
          })
        ),
        "aria-label": indT("ExpenseSheets_Field_ReimbursementAmount", "Reimbursement amount")
      }
    )
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ExpenseReadOnlyField_default,
    {
      label: indT("ExpenseSheets_Field_ReimbursementAmount", "Reimbursement amount"),
      value: amountMSTText || "-"
    }
  )
] });
var ExpenseSheetLineForm = ({
  line,
  fallbackDate,
  sheetDescription: _sheetDescription,
  projectValue,
  priceText,
  amountText,
  amountMSTText,
  internacionalLabel,
  isKmType,
  isFuelPriceLoading,
  fuelPriceMessage,
  fuelPriceMessageIsError,
  status,
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
  draftCurrencyCode,
  draftAmountMST,
  draftExchangeRate,
  localCurrencyCode,
  linkedTicketFileId,
  showLinkedTicketField,
  typeInputRef,
  priceInputRef,
  qtyInputRef,
  typeInvalid = false,
  priceInvalid = false,
  qtyInvalid = false,
  onDraftDescriptionChange,
  onDraftTransDateChange,
  onDraftTypeValueCodeChange,
  onDraftPriceChange,
  onDraftQtyChange,
  onDraftProjectIdChange,
  onDraftInternationalChange,
  onDraftCurrencyCodeChange,
  onDraftAmountMSTChange,
  onDraftExchangeRateChange,
  onOpenLinkedTicket
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "space-y-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ExpenseSectionDivider_default,
      {
        label: indT("ExpenseSheets_Line", "Line"),
        className: "expense-section-divider--spaced",
        labelClassName: "expense-section-divider__label--title"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-[var(--radius-xl)]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sm:col-span-2 space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_Description", "Description") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              className: "form-control",
              value: draftDescription,
              onChange: (event) => onDraftDescriptionChange(event.target.value || ""),
              "aria-label": indT("ExpenseSheets_Field_Description", "Description")
            }
          )
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ExpenseReadOnlyField_default,
          {
            label: indT("ExpenseSheets_Field_Description", "Description"),
            value: safeText(line.description) || "-",
            fullWidth: true
          }
        ),
        showLinkedTicketField ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ExpenseReadOnlyField_default,
          {
            label: indT("Tickets_Field_FileId", "Ticket"),
            value: linkedTicketFileId,
            fullWidth: true,
            onClick: onOpenLinkedTicket
          }
        ) : null,
        isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "visita-field-text", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          SingleDatePicker,
          {
            label: indT("ExpenseSheets_Field_CreatedDate", "Date"),
            value: draftTransDate,
            onChange: onDraftTransDateChange,
            readOnly: !isEditing,
            disabled: !isEditing
          }
        ) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ExpenseReadOnlyField_default,
          {
            label: indT("ExpenseSheets_Field_CreatedDate", "Date"),
            value: formatExpenseDisplayDate(
              safeText(line.transDate || fallbackDate),
              document?.documentElement?.lang || "es-ES"
            )
          }
        ),
        isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          SelectCombobox_default,
          {
            label: indT("ExpenseSheets_Field_Type", "Type"),
            options: gastoTypeOptions,
            value: draftTypeValueCode || "",
            onChange: onDraftTypeValueCodeChange,
            inputRef: typeInputRef,
            placeholder: indT("ExpenseSheets_Field_Type", "Type"),
            invalid: typeInvalid,
            usePortal: false,
            allowTextInput: false,
            showSearchButton: false
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Type", "Type"), value: safeText(line.typeValue) || "-" }),
        isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_Price", "Price") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              ref: priceInputRef,
              className: `${isKmType ? "form-control ind-readonly-field" : "form-control"}${priceInvalid ? " border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400" : ""}`,
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
          isKmType && isFuelPriceLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-slate-500 text-xs", children: indT("ExpenseSheets_FuelPrice_Loading", "Loading fuel price...") }) : null,
          isKmType && !isFuelPriceLoading && fuelPriceMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: fuelPriceMessageIsError ? "text-danger text-sm" : "text-slate-500 text-xs", children: fuelPriceMessage }) : null
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Price", "Price"), value: priceText || "-" }),
        isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_Qty", "Quantity") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              ref: qtyInputRef,
              className: `form-control${qtyInvalid ? " border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400" : ""}`,
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
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ExpenseReadOnlyField_default,
          {
            label: indT("ExpenseSheets_Field_Qty", "Quantity"),
            value: formatQtyValue(line.qty)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ExpenseSheetLineCurrencyFields,
          {
            line,
            amountText,
            amountMSTText,
            isEditing,
            draftCurrencyCode,
            draftAmountMST,
            draftExchangeRate,
            localCurrencyCode,
            onDraftCurrencyCodeChange,
            onDraftAmountMSTChange,
            onDraftExchangeRateChange
          }
        ),
        isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ExpenseProjectFilterInput_default,
          {
            label: indT("ExpenseSheets_Field_Project", "Project"),
            placeholder: indT("ExpenseSheets_Filter_Project_Placeholder", "Project id"),
            value: draftProjectId,
            onChange: onDraftProjectIdChange,
            disabled: !isEditing,
            readOnly: !isEditing
          }
        ) : projectValue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Project", "Project"), value: projectValue }) : null,
        isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          SelectCombobox_default,
          {
            label: indT("ExpenseSheets_Field_International", "International"),
            options: internationalOptions,
            value: draftInternational || "",
            onChange: onDraftInternationalChange,
            placeholder: indT("ExpenseSheets_Field_International", "International"),
            usePortal: false,
            allowTextInput: false,
            showSearchButton: false
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ExpenseReadOnlyField_default,
          {
            label: indT("ExpenseSheets_Field_International", "International"),
            value: internacionalLabel
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-center gap-3 text-sm text-slate-600", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: status }) })
    ] })
  ] });
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

// Web/wwwroot/react/src/pages/gastos/utils/expenseLineCurrency.ts
var EXPENSE_LINE_EXCHANGE_RATE_REFERENCE_AMOUNT = 100;
var normalizeExpenseLineCurrencyCode = (value) => {
  return String(value || "").trim().toUpperCase();
};
var roundExpenseLineMoney = (value) => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};
var calculateExpenseLineAmountMST = (amount, exchangeRate) => {
  if (!Number.isFinite(amount) || amount <= 0 || !Number.isFinite(exchangeRate) || exchangeRate <= 0) {
    return null;
  }
  return roundExpenseLineMoney(amount * exchangeRate / EXPENSE_LINE_EXCHANGE_RATE_REFERENCE_AMOUNT);
};
var calculateExpenseLineExchangeRate = (amount, amountMST) => {
  if (!Number.isFinite(amount) || amount <= 0 || !Number.isFinite(amountMST) || amountMST <= 0) {
    return null;
  }
  return amountMST / amount * EXPENSE_LINE_EXCHANGE_RATE_REFERENCE_AMOUNT;
};

// Web/wwwroot/react/src/pages/gastos/line/useExpenseSheetLineDetailMutations.ts
var import_react = __toESM(require_react());
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
  draftCurrencyCode,
  draftAmountMST,
  draftExchangeRate,
  localCurrencyCode,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing,
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
  const handleUpdate = (0, import_react.useCallback)(async () => {
    if (busy || !isEditing) return false;
    if (isEditLocked) return false;
    const canProceed = isCreateMode ? canCreateExpense : canEditExpense;
    if (!canProceed) {
      showPermissionModal();
      return false;
    }
    const normalizedDate = normalizeLineDate(draftTransDate);
    const parsedTypeValue = Number.parseInt(String(draftTypeValueCode || "").trim(), 10);
    const parsedPrice = parseNumber(draftPrice);
    const parsedQty = parseNumber(draftQty);
    const parsedInternational = parseExpenseInternationalValue(draftInternational);
    const parsedAmountMST = parseNumber(draftAmountMST);
    const parsedExchangeRate = parseNumber(draftExchangeRate);
    const normalizedCurrencyCode = normalizeExpenseLineCurrencyCode(draftCurrencyCode);
    const normalizedLocalCurrencyCode = normalizeExpenseLineCurrencyCode(localCurrencyCode) || "EUR";
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
    if (!Number.isFinite(parsedTypeValue) || parsedTypeValue <= 0) {
      onInvalidType?.();
      return false;
    }
    const isForeignCurrency = !!normalizedCurrencyCode && normalizedCurrencyCode !== normalizedLocalCurrencyCode;
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
        const commonLinePayload = {
          transDate: normalizedDate,
          typeValue: parsedTypeValue,
          description: String(draftDescription || "").trim(),
          internacional: parsedInternational ?? line?.internacional ?? false,
          ticket: line?.ticket === true,
          qty: Number(parsedQty),
          price: Number(parsedPrice),
          projId: String(draftProjectId || "").trim() || void 0,
          currencyCode: normalizedCurrencyCode || void 0,
          amountMST: parsedAmountMST,
          exchRate: parsedExchangeRate != null && parsedExchangeRate > 0 ? parsedExchangeRate : null,
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
    isCreateMode,
    isEditLocked,
    isEditing,
    line,
    lineId,
    localCurrencyCode,
    onCreateSuccess,
    onInvalidAmountQty,
    onInvalidType,
    setBusy,
    setIsEditing,
    setModalError,
    setStatus,
    sheetId
  ]);
  const handleDelete = (0, import_react.useCallback)(async () => {
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
var import_react2 = __toESM(require_react());
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
  const handleModalConfirm = (0, import_react2.useCallback)(async () => {
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
  const handleModalButtonConfirm = (0, import_react2.useCallback)(() => {
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
var import_react3 = __toESM(require_react());
var KM_GASTO_TYPE_CODE = "3";
var FUEL_PRICE_DEBOUNCE_MS = 300;
var FUEL_PRICE_SOURCE_USER_CONFIG = "CRMHojaGastosUserPriceKmFechaTable";
var FUEL_PRICE_SOURCE_GLOBAL_CONFIG = "CRMParameters";
var EXPENSE_STATUS_APPROVED = 2;
var EXPENSE_STATUS_PAID = 4;
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
var buildCreateLineDraft = (baseDate, projectId, currencyCode) => {
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
  const [header, setHeader] = (0, import_react3.useState)(null);
  const [line, setLine] = (0, import_react3.useState)(null);
  const [isLoading, setIsLoading] = (0, import_react3.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react3.useState)("");
  const [busy, setBusy] = (0, import_react3.useState)(false);
  const [status, setStatus] = (0, import_react3.useState)("");
  const [isEditing, setIsEditing] = (0, import_react3.useState)(false);
  const [modalError, setModalError] = (0, import_react3.useState)("");
  const [draftDescription, setDraftDescription] = (0, import_react3.useState)("");
  const [draftTransDate, setDraftTransDate] = (0, import_react3.useState)("");
  const [draftTypeValueCode, setDraftTypeValueCode] = (0, import_react3.useState)("");
  const [draftPrice, setDraftPrice] = (0, import_react3.useState)("");
  const [draftQty, setDraftQty] = (0, import_react3.useState)("");
  const [draftProjectId, setDraftProjectId] = (0, import_react3.useState)("");
  const [draftInternational, setDraftInternational] = (0, import_react3.useState)("");
  const [draftCurrencyCode, setDraftCurrencyCode] = (0, import_react3.useState)("");
  const [draftAmountMST, setDraftAmountMST] = (0, import_react3.useState)("");
  const [draftExchangeRate, setDraftExchangeRate] = (0, import_react3.useState)("");
  const [isFuelPriceLoading, setIsFuelPriceLoading] = (0, import_react3.useState)(false);
  const [fuelPriceMessage, setFuelPriceMessage] = (0, import_react3.useState)("");
  const [fuelPriceMessageIsError, setFuelPriceMessageIsError] = (0, import_react3.useState)(false);
  const hydrateDraftFromLine = (0, import_react3.useCallback)((nextLine, nextHeader) => {
    const isExistingLine = !!safeText(nextLine?.lineRecId);
    const normalizedLineProjectId = safeText(nextLine?.projId);
    setDraftDescription(safeText(nextLine?.description));
    setDraftTransDate(toInputDate(nextLine?.transDate || nextHeader?.createdDate));
    setDraftTypeValueCode(safeText(nextLine?.typeValueCode));
    setDraftPrice(formatEditableNumber(nextLine?.price));
    setDraftQty(formatEditableQuantity(nextLine?.qty));
    setDraftProjectId(isExistingLine ? normalizedLineProjectId : normalizedLineProjectId || safeText(nextHeader?.projId));
    setDraftInternational(nextLine?.internacional === true ? "true" : nextLine?.internacional === false ? "false" : "");
    const localCurrencyCode = safeText(nextHeader?.currencyCode).toUpperCase() || "EUR";
    const lineCurrencyCode = safeText(nextLine?.currencyCode).toUpperCase() || localCurrencyCode;
    setDraftCurrencyCode(lineCurrencyCode);
    setDraftAmountMST(formatEditableNumber(nextLine?.amountMST));
    setDraftExchangeRate(formatEditableExchangeRate(nextLine?.exchRate ?? (lineCurrencyCode === localCurrencyCode ? 100 : null)));
  }, []);
  (0, import_react3.useEffect)(() => {
    const loadDetail = async () => {
      if (!hasAccess) {
        onForbidden();
        return;
      }
      if (!sheetId) {
        setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet line was not found."));
        setHeader(null);
        setLine(null);
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
            return;
          }
          const sheets2 = Array.isArray(response2?.Items) ? response2.Items : [];
          const selectedSheet2 = sheets2.find((entry) => safeText(entry?.HojaGastosId).toUpperCase() === sheetId.trim().toUpperCase()) || sheets2[0];
          if (!selectedSheet2) {
            setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet line was not found."));
            setHeader(null);
            setLine(null);
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
          setIsEditing(true);
          hydrateDraftFromLine(draftLine, loadedHeader);
          setStatus("");
          return;
        }
        if (!lineId) {
          setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet line was not found."));
          setHeader(null);
          setLine(null);
          return;
        }
        const response = await fetchExpenseSheetDetail(sheetId, {
          suppressPermissionModal: true
        });
        if (response?.Success === false) {
          setErrorMessage(response?.Message || indT("ExpenseSheets_LoadError", "Could not load line detail."));
          setHeader(null);
          setLine(null);
          return;
        }
        const sheets = Array.isArray(response?.Items) ? response.Items : [];
        const selectedSheet = sheets.find((entry) => safeText(entry?.HojaGastosId).toUpperCase() === sheetId.trim().toUpperCase()) || sheets[0];
        if (!selectedSheet) {
          setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet line was not found."));
          setHeader(null);
          setLine(null);
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
          return;
        }
        setHeader(mappedHeader);
        setLine(selectedLine);
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
  (0, import_react3.useEffect)(() => {
    if (!line || isEditing) return;
    hydrateDraftFromLine(line, header);
  }, [header, hydrateDraftFromLine, isEditing, line]);
  const normalizedDraftTypeValueCode = (0, import_react3.useMemo)(() => safeText(draftTypeValueCode), [draftTypeValueCode]);
  const normalizedFuelTransDate = (0, import_react3.useMemo)(() => normalizeFuelTransDate(draftTransDate), [draftTransDate]);
  const isKmType = normalizedDraftTypeValueCode === KM_GASTO_TYPE_CODE;
  (0, import_react3.useEffect)(() => {
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
  const hasActiveProcess = (0, import_react3.useMemo)(() => busy || isEditing, [busy, isEditing]);
  (0, import_react3.useEffect)(() => {
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
  const detailPolicy = (0, import_react3.useMemo)(() => {
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
  const handleEnableEdit = (0, import_react3.useCallback)(() => {
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
  const handleCancelEdit = (0, import_react3.useCallback)(() => {
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
  const handleOpenCreateMode = (0, import_react3.useCallback)(() => {
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
  const navigateToSheetDetail = (0, import_react3.useCallback)(() => {
    const safeSheetId = safeText(sheetId);
    if (!safeSheetId) return;
    const targetUrl = `/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(safeSheetId)}`;
    navigateToExpenseUrl(targetUrl);
  }, [sheetId]);
  return {
    header,
    line,
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
    setDraftCurrencyCode,
    setDraftAmountMST,
    setDraftExchangeRate,
    handleEnableEdit,
    handleCancelEdit,
    handleOpenCreateMode,
    navigateToSheetDetail
  };
};

// Web/wwwroot/react/src/pages/gastos/line/useExpenseSheetLineTicketPreview.ts
var import_react4 = __toESM(require_react());
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
  const [previewSourceUrl, setPreviewSourceUrl] = (0, import_react4.useState)("");
  const [previewFileName, setPreviewFileName] = (0, import_react4.useState)("");
  (0, import_react4.useEffect)(() => {
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
  const showStickyPreview = (0, import_react4.useMemo)(
    () => hasLinkedTicket && hasExpenseTicketImagePreviewSource(previewSourceUrl),
    [hasLinkedTicket, previewSourceUrl]
  );
  const previewAltText = (0, import_react4.useMemo)(
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

// Web/wwwroot/react/src/pages/gastos/line/ExpenseSheetLineDetailView.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ExpenseSheetLineDetailView = ({ modal, preview, content }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
        onPointerEnd: preview.onPointerEnd,
        onWheel: preview.onWheel
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "div",
      {
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: content.isLoading || content.isRedirectingAfterCreate ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    content.errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "text-danger", children: content.errorMessage }) : null,
    content.detailBody ? preview.showStickyPreview ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-4 lg:space-y-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "lg:col-start-2", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "space-y-2 lg:col-start-1 lg:row-start-1", children: content.detailBody })
    ] }) : content.detailBody : null
  ] });
};
var ExpenseSheetLineDetailView_default = ExpenseSheetLineDetailView;

// Web/wwwroot/react/src/pages/gastos/line/useExpenseSheetLineTypeValidation.ts
var import_react5 = __toESM(require_react());
var useExpenseSheetLineTypeValidation = ({
  draftTypeValueCode,
  draftPrice,
  draftQty,
  setDraftTypeValueCode,
  setDraftPrice,
  setDraftQty
}) => {
  const [typeInvalid, setTypeInvalid] = (0, import_react5.useState)(false);
  const [priceInvalid, setPriceInvalid] = (0, import_react5.useState)(false);
  const [qtyInvalid, setQtyInvalid] = (0, import_react5.useState)(false);
  const typeInputRef = (0, import_react5.useRef)(null);
  const priceInputRef = (0, import_react5.useRef)(null);
  const qtyInputRef = (0, import_react5.useRef)(null);
  const focusTypeField = (0, import_react5.useCallback)(() => {
    setTypeInvalid(true);
    window.requestAnimationFrame(() => {
      typeInputRef.current?.focus();
    });
  }, []);
  const focusAmountFields = (0, import_react5.useCallback)(() => {
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
  const handleDraftTypeValueCodeChange = (0, import_react5.useCallback)(
    (value) => {
      setTypeInvalid(false);
      setDraftTypeValueCode(value);
    },
    [setDraftTypeValueCode]
  );
  const handleDraftPriceChange = (0, import_react5.useCallback)(
    (value) => {
      setPriceInvalid(false);
      setDraftPrice(value);
    },
    [setDraftPrice]
  );
  const handleDraftQtyChange = (0, import_react5.useCallback)(
    (value) => {
      setQtyInvalid(false);
      setDraftQty(value);
    },
    [setDraftQty]
  );
  (0, import_react5.useEffect)(() => {
    const parsedPrice = parseDecimalInput(draftPrice);
    if (parsedPrice != null && parsedPrice > 0) {
      setPriceInvalid(false);
    }
  }, [draftPrice]);
  (0, import_react5.useEffect)(() => {
    const parsedQty = parseDecimalInput(draftQty);
    if (parsedQty != null && parsedQty > 0) {
      setQtyInvalid(false);
    }
  }, [draftQty]);
  const canOpenSaveConfirm = (0, import_react5.useCallback)(() => {
    const parsedTypeValue = Number.parseInt(String(draftTypeValueCode || "").trim(), 10);
    if (!Number.isFinite(parsedTypeValue) || parsedTypeValue <= 0) {
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
  }, [draftPrice, draftQty, draftTypeValueCode, focusAmountFields, focusTypeField]);
  return {
    typeInvalid,
    priceInvalid,
    qtyInvalid,
    typeInputRef,
    priceInputRef,
    qtyInputRef,
    focusTypeField,
    focusAmountFields,
    handleDraftTypeValueCodeChange,
    handleDraftPriceChange,
    handleDraftQtyChange,
    canOpenSaveConfirm
  };
};

// Web/wwwroot/react/src/pages/gastos/line/ExpenseSheetLineDetailPage.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
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
  const sheetId = safeText(window.__EXPENSE_SHEET_ID__);
  const lineId = safeText(window.__EXPENSE_LINE_ID__);
  const lineMode = safeText(window.__EXPENSE_LINE_MODE__).toLowerCase();
  const isCreateMode = lineMode === "create";
  const startInEditMode = lineMode === "edit";
  const [isRedirectingAfterCreate, setIsRedirectingAfterCreate] = (0, import_react6.useState)(false);
  (0, import_react6.useEffect)(() => {
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
    setDraftCurrencyCode,
    setDraftAmountMST,
    setDraftExchangeRate,
    handleEnableEdit,
    handleCancelEdit,
    navigateToSheetDetail
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
    typeInvalid,
    priceInvalid,
    qtyInvalid,
    typeInputRef,
    priceInputRef,
    qtyInputRef,
    focusTypeField,
    focusAmountFields,
    handleDraftTypeValueCodeChange,
    handleDraftPriceChange,
    handleDraftQtyChange,
    canOpenSaveConfirm
  } = useExpenseSheetLineTypeValidation({
    draftTypeValueCode,
    draftPrice,
    draftQty,
    setDraftTypeValueCode,
    setDraftPrice,
    setDraftQty
  });
  const draftPriceValue = parseDecimalInput(draftPrice);
  const draftQtyValue = parseDecimalInput(draftQty);
  const calculatedAmountPreview = isEditing && draftPriceValue != null && draftPriceValue > 0 && draftQtyValue != null && draftQtyValue > 0 ? draftPriceValue * draftQtyValue : line?.amount ?? null;
  const localCurrencyCode = normalizeExpenseLineCurrencyCode(header?.currencyCode) || "EUR";
  const effectiveLineCurrencyCode = normalizeExpenseLineCurrencyCode(isEditing ? draftCurrencyCode : line?.currencyCode) || localCurrencyCode;
  const priceText = (0, import_react6.useMemo)(
    () => formatAmountWithCurrency(line?.price ?? null, effectiveLineCurrencyCode),
    [effectiveLineCurrencyCode, line?.price]
  );
  const amountText = (0, import_react6.useMemo)(
    () => formatAmountWithCurrency(calculatedAmountPreview, effectiveLineCurrencyCode),
    [calculatedAmountPreview, effectiveLineCurrencyCode]
  );
  const amountMSTText = (0, import_react6.useMemo)(
    () => formatAmountWithCurrency(line?.amountMST ?? null, localCurrencyCode),
    [line?.amountMST, localCurrencyCode]
  );
  const projectValue = safeText(line?.projId || header?.projId);
  const sheetDescription = safeText(header?.description) || "-";
  const internacionalLabel = getExpenseInternationalLabel(line?.internacional);
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
    handlePreviewPointerEnd,
    handlePreviewWheel
  } = useExpenseSheetLineTicketPreview({
    linkedTicketFileId,
    hasLinkedTicket
  });
  const gastoTypeOptions = (0, import_react6.useMemo)(() => {
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
  const internationalOptions = (0, import_react6.useMemo)(
    () => mapBooleanEnumOptions(getExpenseInternationalOptions()),
    []
  );
  const formatLineMoneyInput = (0, import_react6.useCallback)((value) => {
    return formatExpenseInputNumber(value, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
      fallback: ""
    });
  }, []);
  const formatLineExchangeRateInput = (0, import_react6.useCallback)((value) => {
    return formatExpenseInputNumber(value, {
      minimumFractionDigits: 7,
      maximumFractionDigits: 7,
      useGrouping: true,
      fallback: ""
    });
  }, []);
  const resolveDraftLineAmount = (0, import_react6.useCallback)(
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
  const recalculateAmountMSTFromRate = (0, import_react6.useCallback)(
    (priceRaw, qtyRaw, exchangeRateRaw) => {
      const amount = resolveDraftLineAmount(priceRaw, qtyRaw);
      const exchangeRate = parseDecimalInput(exchangeRateRaw);
      const nextAmountMST = amount != null && exchangeRate != null ? calculateExpenseLineAmountMST(amount, exchangeRate) : null;
      if (nextAmountMST != null) {
        setDraftAmountMST(formatLineMoneyInput(nextAmountMST));
      }
    },
    [formatLineMoneyInput, resolveDraftLineAmount, setDraftAmountMST]
  );
  const handleLinePriceChange = (0, import_react6.useCallback)(
    (value) => {
      handleDraftPriceChange(value);
      recalculateAmountMSTFromRate(value, draftQty, draftExchangeRate);
    },
    [draftExchangeRate, draftQty, handleDraftPriceChange, recalculateAmountMSTFromRate]
  );
  const handleLineQtyChange = (0, import_react6.useCallback)(
    (value) => {
      handleDraftQtyChange(value);
      recalculateAmountMSTFromRate(draftPrice, value, draftExchangeRate);
    },
    [draftExchangeRate, draftPrice, handleDraftQtyChange, recalculateAmountMSTFromRate]
  );
  const handleLineCurrencyChange = (0, import_react6.useCallback)(
    (value) => {
      const nextCurrencyCode = normalizeExpenseLineCurrencyCode(value);
      setDraftCurrencyCode(nextCurrencyCode);
      if (nextCurrencyCode && nextCurrencyCode === localCurrencyCode && !parseDecimalInput(draftExchangeRate)) {
        const localExchangeRate = formatLineExchangeRateInput(100);
        setDraftExchangeRate(localExchangeRate);
        recalculateAmountMSTFromRate(draftPrice, draftQty, localExchangeRate);
        return;
      }
      recalculateAmountMSTFromRate(draftPrice, draftQty, draftExchangeRate);
    },
    [
      draftExchangeRate,
      draftPrice,
      draftQty,
      formatLineExchangeRateInput,
      localCurrencyCode,
      recalculateAmountMSTFromRate,
      setDraftCurrencyCode,
      setDraftExchangeRate
    ]
  );
  const handleLineExchangeRateChange = (0, import_react6.useCallback)(
    (value) => {
      setDraftExchangeRate(value);
      recalculateAmountMSTFromRate(draftPrice, draftQty, value);
    },
    [draftPrice, draftQty, recalculateAmountMSTFromRate, setDraftExchangeRate]
  );
  const handleLineAmountMSTChange = (0, import_react6.useCallback)(
    (value) => {
      setDraftAmountMST(value);
      const amount = resolveDraftLineAmount(draftPrice, draftQty);
      const amountMST = parseDecimalInput(value);
      const nextExchangeRate = amount != null && amountMST != null ? calculateExpenseLineExchangeRate(amount, amountMST) : null;
      if (nextExchangeRate != null) {
        setDraftExchangeRate(formatLineExchangeRateInput(nextExchangeRate));
      }
    },
    [draftPrice, draftQty, formatLineExchangeRateInput, resolveDraftLineAmount, setDraftAmountMST, setDraftExchangeRate]
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
    draftCurrencyCode,
    draftAmountMST,
    draftExchangeRate,
    localCurrencyCode,
    setModalError,
    setBusy,
    setStatus,
    setIsEditing,
    onInvalidType: focusTypeField,
    onInvalidAmountQty: focusAmountFields,
    onCreateSuccess: () => {
    }
  });
  const lineTopbarActionMode = !canEditExpenseCurrent && !canDeleteExpenseCurrent ? "view_only" : "default";
  const handleEditLinkedTicket = (0, import_react6.useCallback)(() => {
    const safeFileId = safeText(linkedTicketFileId);
    const safeSheetId = safeText(sheetId);
    const safeLineId = safeText(lineId || line?.lineRecId);
    if (!safeFileId || !safeSheetId || !safeLineId) return;
    const query = new URLSearchParams({
      fileId: safeFileId,
      origin: "expense-line",
      sheetId: safeSheetId,
      sheetLineRecId: safeLineId,
      mode: "edit"
    });
    saveExpenseTicketReturnContext({
      fileId: safeFileId,
      origin: "expense-line",
      sheetId: safeSheetId,
      sheetLineRecId: safeLineId
    });
    navigateToExpenseUrl(`/Gastos/TicketDetail?${query.toString()}`, {
      askConfirmation: isEditing
    });
  }, [isEditing, line?.lineRecId, lineId, linkedTicketFileId, sheetId]);
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
    handleCancelEdit,
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
  const handleOpenLinkedTicket = (0, import_react6.useCallback)(() => {
    const safeFileId = safeText(linkedTicketFileId);
    const safeSheetId = safeText(sheetId);
    const safeLineId = safeText(lineId || line?.lineRecId);
    if (!safeFileId || !safeSheetId || !safeLineId) return;
    const query = new URLSearchParams({
      fileId: safeFileId,
      origin: "expense-line",
      sheetId: safeSheetId,
      sheetLineRecId: safeLineId
    });
    saveExpenseTicketReturnContext({
      fileId: safeFileId,
      origin: "expense-line",
      sheetId: safeSheetId,
      sheetLineRecId: safeLineId
    });
    navigateToExpenseUrl(`/Gastos/TicketDetail?${query.toString()}`, {
      askConfirmation: isEditing
    });
  }, [isEditing, line?.lineRecId, lineId, linkedTicketFileId, sheetId]);
  const detailBody = !isLoading && !isRedirectingAfterCreate && !errorMessage && line ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    ExpenseSheetLineForm_default,
    {
      line,
      fallbackDate: safeText(header?.createdDate),
      sheetDescription,
      projectValue,
      priceText,
      amountText,
      amountMSTText,
      internacionalLabel,
      isKmType,
      isFuelPriceLoading,
      fuelPriceMessage,
      fuelPriceMessageIsError,
      status,
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
      draftCurrencyCode,
      draftAmountMST,
      draftExchangeRate,
      localCurrencyCode,
      typeInputRef,
      priceInputRef,
      qtyInputRef,
      typeInvalid,
      priceInvalid,
      qtyInvalid,
      onDraftDescriptionChange: setDraftDescription,
      onDraftTransDateChange: setDraftTransDate,
      onDraftTypeValueCodeChange: handleDraftTypeValueCodeChange,
      onDraftPriceChange: handleLinePriceChange,
      onDraftQtyChange: handleLineQtyChange,
      onDraftProjectIdChange: setDraftProjectId,
      onDraftInternationalChange: setDraftInternational,
      onDraftCurrencyCodeChange: handleLineCurrencyChange,
      onDraftAmountMSTChange: handleLineAmountMSTChange,
      onDraftExchangeRateChange: handleLineExchangeRateChange,
      linkedTicketFileId,
      showLinkedTicketField: hasLinkedTicket,
      onOpenLinkedTicket: handleOpenLinkedTicket
    }
  ) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        onPointerEnd: handlePreviewPointerEnd,
        onWheel: handlePreviewWheel
      },
      content: {
        isLoading,
        isRedirectingAfterCreate,
        errorMessage,
        detailBody
      }
    }
  );
};
var ExpenseSheetLineDetailPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(VisitasPageProviders_default, { enableExpenseManagement: true, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseSheetLineDetailContent, {}) });
};
var mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-line-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseSheetLineDetailPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseSheetLineDetailPage_default = ExpenseSheetLineDetailPage;
export {
  ExpenseSheetLineDetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL0V4cGVuc2VTaGVldExpbmVEZXRhaWxQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0TGluZUZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2ludGVybmF0aW9uYWxPcHRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZUxpbmVDdXJyZW5jeS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpbmUvdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpbmUvdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxDb25maXJtRGlhbG9nLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGluZS91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL3VzZUV4cGVuc2VTaGVldExpbmVUaWNrZXRQcmV2aWV3LnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGluZS9FeHBlbnNlU2hlZXRMaW5lRGV0YWlsVmlldy50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL3VzZUV4cGVuc2VTaGVldExpbmVUeXBlVmFsaWRhdGlvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xyXG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcclxuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlU2hlZXRMaW5lRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlU2hlZXRMaW5lRm9ybS50c3hcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZUludGVybmF0aW9uYWxMYWJlbCwgZ2V0RXhwZW5zZUludGVybmF0aW9uYWxPcHRpb25zIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9pbnRlcm5hdGlvbmFsT3B0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyBwYXJzZURlY2ltYWxJbnB1dCB9IGZyb20gXCIuLi9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsLCByZWxvYWRFeHBlbnNlUGFnZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcbmltcG9ydCB7IGdldEV4cGVuc2VHYXN0b1R5cGVPcHRpb25zIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlR2FzdG9UeXBlQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcbmltcG9ydCB7XG4gIGNhbGN1bGF0ZUV4cGVuc2VMaW5lQW1vdW50TVNULFxuICBjYWxjdWxhdGVFeHBlbnNlTGluZUV4Y2hhbmdlUmF0ZSxcbiAgbm9ybWFsaXplRXhwZW5zZUxpbmVDdXJyZW5jeUNvZGUsXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlTGluZUN1cnJlbmN5LnRzXCI7XG5pbXBvcnQge1xuICBtYXBCb29sZWFuRW51bU9wdGlvbnMsXG4gIHR5cGUgRXhwZW5zZVNlbGVjdE9wdGlvbixcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbENvbmZpcm1EaWFsb2cudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFN0YXRlIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFN0YXRlLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldExpbmVUaWNrZXRQcmV2aWV3IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0TGluZVRpY2tldFByZXZpZXcudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VTaGVldExpbmVEZXRhaWxWaWV3IGZyb20gXCIuL0V4cGVuc2VTaGVldExpbmVEZXRhaWxWaWV3LnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRMaW5lVHlwZVZhbGlkYXRpb24gfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRMaW5lVHlwZVZhbGlkYXRpb24udHNcIjtcclxuXHJcbi8vIEluaXRpYWxpemVzIGF1dGggc2VlZCBmb3IgZXhwZW5zZSBBUEkgY2FsbHMgYmVmb3JlIGlzbGFuZCBlZmZlY3RzIHJ1bi5cclxuY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XHJcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgoe1xyXG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXHJcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcclxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIENvbnN1bWVzIHRoZSBvbmUtdGltZSBlZGl0IGhhbmRvZmYgZnJvbSBzaGVldCBkZXRhaWwgc28gbGF0ZXIgcmVsb2FkcyByZXR1cm4gdG8gbm9ybWFsIHZpZXcgbW9kZS5cclxuY29uc3QgY29uc3VtZUxpbmVFZGl0TW9kZVF1ZXJ5ID0gKCkgPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjb25zdCBjdXJyZW50VXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgaWYgKHNhZmVUZXh0KGN1cnJlbnRVcmwuc2VhcmNoUGFyYW1zLmdldChcIm1vZGVcIikpLnRvTG93ZXJDYXNlKCkgIT09IFwiZWRpdFwiKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjdXJyZW50VXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoXCJtb2RlXCIpO1xyXG4gIGNvbnN0IG5leHRVcmwgPSBgJHtjdXJyZW50VXJsLnBhdGhuYW1lfSR7Y3VycmVudFVybC5zZWFyY2h9JHtjdXJyZW50VXJsLmhhc2h9YDtcclxuICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUod2luZG93Lmhpc3Rvcnkuc3RhdGUsIFwiXCIsIG5leHRVcmwpO1xyXG59O1xyXG5cclxuY29uc3QgRXhwZW5zZVNoZWV0TGluZURldGFpbENvbnRlbnQgPSAoKSA9PiB7XHJcbiAgY29uc3Qge1xyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gIH0gPSB1c2VBdXRoQ29udGV4dCgpO1xyXG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiVmlld1wiKTtcclxuICBjb25zdCBzaGVldElkID0gc2FmZVRleHQod2luZG93Ll9fRVhQRU5TRV9TSEVFVF9JRF9fKTtcclxuICBjb25zdCBsaW5lSWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX0xJTkVfSURfXyk7XHJcbiAgY29uc3QgbGluZU1vZGUgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX0xJTkVfTU9ERV9fKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IGlzQ3JlYXRlTW9kZSA9IGxpbmVNb2RlID09PSBcImNyZWF0ZVwiO1xyXG4gIGNvbnN0IHN0YXJ0SW5FZGl0TW9kZSA9IGxpbmVNb2RlID09PSBcImVkaXRcIjtcclxuICBjb25zdCBbaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLCBzZXRJc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFzdGFydEluRWRpdE1vZGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN1bWVMaW5lRWRpdE1vZGVRdWVyeSgpO1xyXG4gIH0sIFtzdGFydEluRWRpdE1vZGVdKTtcclxuXHJcbiAgY29uc3Qge1xyXG4gICAgaGVhZGVyLFxyXG4gICAgbGluZSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGJ1c3ksXHJcbiAgICBzdGF0dXMsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtb2RhbEVycm9yLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0VHJhbnNEYXRlLFxyXG4gICAgZHJhZnRUeXBlVmFsdWVDb2RlLFxyXG4gICAgZHJhZnRQcmljZSxcclxuICAgIGRyYWZ0UXR5LFxuICAgIGRyYWZ0UHJvamVjdElkLFxuICAgIGRyYWZ0SW50ZXJuYXRpb25hbCxcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBkcmFmdEFtb3VudE1TVCxcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgICBpc0ttVHlwZSxcclxuICAgIGlzRnVlbFByaWNlTG9hZGluZyxcclxuICAgIGZ1ZWxQcmljZU1lc3NhZ2UsXHJcbiAgICBmdWVsUHJpY2VNZXNzYWdlSXNFcnJvcixcclxuICAgIGlzU2hlZXRMb2NrZWQsXHJcbiAgICBpc0xpbmVFZGl0TG9ja2VkLFxyXG4gICAgaXNMaW5lRGVsZXRlTG9ja2VkLFxyXG4gICAgaGFzTGlua2VkVGlja2V0LFxyXG4gICAgbGlua2VkVGlja2V0RmlsZUlkLFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZUN1cnJlbnQsXHJcbiAgICBjYW5FZGl0RXhwZW5zZUN1cnJlbnQsXHJcbiAgICBjYW5EZWxldGVFeHBlbnNlQ3VycmVudCxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgIHNldERyYWZ0VHJhbnNEYXRlLFxyXG4gICAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlLFxyXG4gICAgc2V0RHJhZnRQcmljZSxcclxuICAgIHNldERyYWZ0UXR5LFxuICAgIHNldERyYWZ0UHJvamVjdElkLFxuICAgIHNldERyYWZ0SW50ZXJuYXRpb25hbCxcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBzZXREcmFmdEFtb3VudE1TVCxcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICAgIG5hdmlnYXRlVG9TaGVldERldGFpbCxcclxuICB9ID0gdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFN0YXRlKHtcclxuICAgIGhhc0FjY2VzcyxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHNoZWV0SWQsXHJcbiAgICBsaW5lSWQsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBzdGFydEluRWRpdE1vZGUsXHJcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICB9KTtcclxuXHJcbiAgY29uc3Qge1xyXG4gICAgdHlwZUludmFsaWQsXHJcbiAgICBwcmljZUludmFsaWQsXHJcbiAgICBxdHlJbnZhbGlkLFxyXG4gICAgdHlwZUlucHV0UmVmLFxyXG4gICAgcHJpY2VJbnB1dFJlZixcclxuICAgIHF0eUlucHV0UmVmLFxyXG4gICAgZm9jdXNUeXBlRmllbGQsXHJcbiAgICBmb2N1c0Ftb3VudEZpZWxkcyxcclxuICAgIGhhbmRsZURyYWZ0VHlwZVZhbHVlQ29kZUNoYW5nZSxcclxuICAgIGhhbmRsZURyYWZ0UHJpY2VDaGFuZ2UsXHJcbiAgICBoYW5kbGVEcmFmdFF0eUNoYW5nZSxcclxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICB9ID0gdXNlRXhwZW5zZVNoZWV0TGluZVR5cGVWYWxpZGF0aW9uKHtcclxuICAgIGRyYWZ0VHlwZVZhbHVlQ29kZSxcclxuICAgIGRyYWZ0UHJpY2UsXHJcbiAgICBkcmFmdFF0eSxcclxuICAgIHNldERyYWZ0VHlwZVZhbHVlQ29kZSxcclxuICAgIHNldERyYWZ0UHJpY2UsXHJcbiAgICBzZXREcmFmdFF0eSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZHJhZnRQcmljZVZhbHVlID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRQcmljZSk7XG4gIGNvbnN0IGRyYWZ0UXR5VmFsdWUgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFF0eSk7XG4gIGNvbnN0IGNhbGN1bGF0ZWRBbW91bnRQcmV2aWV3ID1cbiAgICBpc0VkaXRpbmcgJiYgZHJhZnRQcmljZVZhbHVlICE9IG51bGwgJiYgZHJhZnRQcmljZVZhbHVlID4gMCAmJiBkcmFmdFF0eVZhbHVlICE9IG51bGwgJiYgZHJhZnRRdHlWYWx1ZSA+IDBcbiAgICAgID8gZHJhZnRQcmljZVZhbHVlICogZHJhZnRRdHlWYWx1ZVxuICAgICAgOiBsaW5lPy5hbW91bnQgPz8gbnVsbDtcbiAgY29uc3QgbG9jYWxDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVFeHBlbnNlTGluZUN1cnJlbmN5Q29kZShoZWFkZXI/LmN1cnJlbmN5Q29kZSkgfHwgXCJFVVJcIjtcbiAgY29uc3QgZWZmZWN0aXZlTGluZUN1cnJlbmN5Q29kZSA9IG5vcm1hbGl6ZUV4cGVuc2VMaW5lQ3VycmVuY3lDb2RlKGlzRWRpdGluZyA/IGRyYWZ0Q3VycmVuY3lDb2RlIDogbGluZT8uY3VycmVuY3lDb2RlKSB8fCBsb2NhbEN1cnJlbmN5Q29kZTtcbiAgY29uc3QgcHJpY2VUZXh0ID0gdXNlTWVtbyhcbiAgICAoKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kobGluZT8ucHJpY2UgPz8gbnVsbCwgZWZmZWN0aXZlTGluZUN1cnJlbmN5Q29kZSksXG4gICAgW2VmZmVjdGl2ZUxpbmVDdXJyZW5jeUNvZGUsIGxpbmU/LnByaWNlXVxuICApO1xuICBjb25zdCBhbW91bnRUZXh0ID0gdXNlTWVtbyhcbiAgICAoKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koY2FsY3VsYXRlZEFtb3VudFByZXZpZXcsIGVmZmVjdGl2ZUxpbmVDdXJyZW5jeUNvZGUpLFxuICAgIFtjYWxjdWxhdGVkQW1vdW50UHJldmlldywgZWZmZWN0aXZlTGluZUN1cnJlbmN5Q29kZV1cbiAgKTtcbiAgY29uc3QgYW1vdW50TVNUVGV4dCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGxpbmU/LmFtb3VudE1TVCA/PyBudWxsLCBsb2NhbEN1cnJlbmN5Q29kZSksXG4gICAgW2xpbmU/LmFtb3VudE1TVCwgbG9jYWxDdXJyZW5jeUNvZGVdXG4gICk7XG4gIGNvbnN0IHByb2plY3RWYWx1ZSA9IHNhZmVUZXh0KGxpbmU/LnByb2pJZCB8fCBoZWFkZXI/LnByb2pJZCk7XG4gIGNvbnN0IHNoZWV0RGVzY3JpcHRpb24gPSBzYWZlVGV4dChoZWFkZXI/LmRlc2NyaXB0aW9uKSB8fCBcIi1cIjtcclxuICBjb25zdCBpbnRlcm5hY2lvbmFsTGFiZWwgPSBnZXRFeHBlbnNlSW50ZXJuYXRpb25hbExhYmVsKGxpbmU/LmludGVybmFjaW9uYWwpO1xyXG4gIGNvbnN0IHtcclxuICAgIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gICAgcHJldmlld09wZW4sXHJcbiAgICBwcmV2aWV3QnVzeSxcclxuICAgIHByZXZpZXdFcnJvcixcclxuICAgIHByZXZpZXdJbWFnZVVybCxcclxuICAgIHByZXZpZXdTY2FsZSxcclxuICAgIHByZXZpZXdUcmFuc2xhdGUsXHJcbiAgICBwcmV2aWV3U3VyZmFjZVJlZixcclxuICAgIHByZXZpZXdGaWxlTmFtZSxcclxuICAgIHByZXZpZXdBbHRUZXh0LFxyXG4gICAgb3BlblByZXZpZXcsXHJcbiAgICBjbG9zZVByZXZpZXcsXHJcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24sXHJcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXHJcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxuICAgIGhhbmRsZVByZXZpZXdXaGVlbCxcclxuICB9ID0gdXNlRXhwZW5zZVNoZWV0TGluZVRpY2tldFByZXZpZXcoe1xyXG4gICAgbGlua2VkVGlja2V0RmlsZUlkLFxyXG4gICAgaGFzTGlua2VkVGlja2V0LFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBnYXN0b1R5cGVPcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KCgpID0+IHtcbiAgICBjb25zdCBtYXBwZWQgPSBnZXRFeHBlbnNlR2FzdG9UeXBlT3B0aW9ucygpO1xuXG4gICAgY29uc3QgY3VycmVudFR5cGVDb2RlID0gc2FmZVRleHQobGluZT8udHlwZVZhbHVlQ29kZSk7XG4gICAgY29uc3QgY3VycmVudFR5cGVMYWJlbCA9IHNhZmVUZXh0KGxpbmU/LnR5cGVWYWx1ZSk7XHJcbiAgICBpZiAoY3VycmVudFR5cGVDb2RlICYmICFtYXBwZWQuc29tZSgoaXRlbSkgPT4gaXRlbS52YWx1ZSA9PT0gY3VycmVudFR5cGVDb2RlKSkge1xyXG4gICAgICBtYXBwZWQucHVzaCh7XHJcbiAgICAgICAgdmFsdWU6IGN1cnJlbnRUeXBlQ29kZSxcclxuICAgICAgICB0ZXh0OiBjdXJyZW50VHlwZUxhYmVsIHx8IGN1cnJlbnRUeXBlQ29kZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1hcHBlZDtcclxuICB9LCBbbGluZT8udHlwZVZhbHVlLCBsaW5lPy50eXBlVmFsdWVDb2RlXSk7XHJcblxyXG4gIGNvbnN0IGludGVybmF0aW9uYWxPcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFxuICAgICgpID0+IG1hcEJvb2xlYW5FbnVtT3B0aW9ucyhnZXRFeHBlbnNlSW50ZXJuYXRpb25hbE9wdGlvbnMoKSksXG4gICAgW11cbiAgKTtcblxuICBjb25zdCBmb3JtYXRMaW5lTW9uZXlJbnB1dCA9IHVzZUNhbGxiYWNrKCh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcih2YWx1ZSwge1xuICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgICBmYWxsYmFjazogXCJcIixcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGZvcm1hdExpbmVFeGNoYW5nZVJhdGVJbnB1dCA9IHVzZUNhbGxiYWNrKCh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcih2YWx1ZSwge1xuICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiA3LFxuICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiA3LFxuICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgICBmYWxsYmFjazogXCJcIixcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHJlc29sdmVEcmFmdExpbmVBbW91bnQgPSB1c2VDYWxsYmFjayhcbiAgICAocHJpY2VSYXc6IHN0cmluZywgcXR5UmF3OiBzdHJpbmcpOiBudW1iZXIgfCBudWxsID0+IHtcbiAgICAgIGNvbnN0IG5leHRQcmljZSA9IHBhcnNlRGVjaW1hbElucHV0KHByaWNlUmF3KTtcbiAgICAgIGNvbnN0IG5leHRRdHkgPSBwYXJzZURlY2ltYWxJbnB1dChxdHlSYXcpO1xuICAgICAgaWYgKG5leHRQcmljZSA9PSBudWxsIHx8IG5leHRQcmljZSA8PSAwIHx8IG5leHRRdHkgPT0gbnVsbCB8fCBuZXh0UXR5IDw9IDApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXh0UHJpY2UgKiBuZXh0UXR5O1xuICAgIH0sXG4gICAgW11cbiAgKTtcblxuICBjb25zdCByZWNhbGN1bGF0ZUFtb3VudE1TVEZyb21SYXRlID0gdXNlQ2FsbGJhY2soXG4gICAgKHByaWNlUmF3OiBzdHJpbmcsIHF0eVJhdzogc3RyaW5nLCBleGNoYW5nZVJhdGVSYXc6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgYW1vdW50ID0gcmVzb2x2ZURyYWZ0TGluZUFtb3VudChwcmljZVJhdywgcXR5UmF3KTtcbiAgICAgIGNvbnN0IGV4Y2hhbmdlUmF0ZSA9IHBhcnNlRGVjaW1hbElucHV0KGV4Y2hhbmdlUmF0ZVJhdyk7XG4gICAgICBjb25zdCBuZXh0QW1vdW50TVNUID0gYW1vdW50ICE9IG51bGwgJiYgZXhjaGFuZ2VSYXRlICE9IG51bGxcbiAgICAgICAgPyBjYWxjdWxhdGVFeHBlbnNlTGluZUFtb3VudE1TVChhbW91bnQsIGV4Y2hhbmdlUmF0ZSlcbiAgICAgICAgOiBudWxsO1xuICAgICAgaWYgKG5leHRBbW91bnRNU1QgIT0gbnVsbCkge1xuICAgICAgICBzZXREcmFmdEFtb3VudE1TVChmb3JtYXRMaW5lTW9uZXlJbnB1dChuZXh0QW1vdW50TVNUKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbZm9ybWF0TGluZU1vbmV5SW5wdXQsIHJlc29sdmVEcmFmdExpbmVBbW91bnQsIHNldERyYWZ0QW1vdW50TVNUXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZUxpbmVQcmljZUNoYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICBoYW5kbGVEcmFmdFByaWNlQ2hhbmdlKHZhbHVlKTtcbiAgICAgIHJlY2FsY3VsYXRlQW1vdW50TVNURnJvbVJhdGUodmFsdWUsIGRyYWZ0UXR5LCBkcmFmdEV4Y2hhbmdlUmF0ZSk7XG4gICAgfSxcbiAgICBbZHJhZnRFeGNoYW5nZVJhdGUsIGRyYWZ0UXR5LCBoYW5kbGVEcmFmdFByaWNlQ2hhbmdlLCByZWNhbGN1bGF0ZUFtb3VudE1TVEZyb21SYXRlXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZUxpbmVRdHlDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgaGFuZGxlRHJhZnRRdHlDaGFuZ2UodmFsdWUpO1xuICAgICAgcmVjYWxjdWxhdGVBbW91bnRNU1RGcm9tUmF0ZShkcmFmdFByaWNlLCB2YWx1ZSwgZHJhZnRFeGNoYW5nZVJhdGUpO1xuICAgIH0sXG4gICAgW2RyYWZ0RXhjaGFuZ2VSYXRlLCBkcmFmdFByaWNlLCBoYW5kbGVEcmFmdFF0eUNoYW5nZSwgcmVjYWxjdWxhdGVBbW91bnRNU1RGcm9tUmF0ZV1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVMaW5lQ3VycmVuY3lDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgbmV4dEN1cnJlbmN5Q29kZSA9IG5vcm1hbGl6ZUV4cGVuc2VMaW5lQ3VycmVuY3lDb2RlKHZhbHVlKTtcbiAgICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlKG5leHRDdXJyZW5jeUNvZGUpO1xuICAgICAgaWYgKG5leHRDdXJyZW5jeUNvZGUgJiYgbmV4dEN1cnJlbmN5Q29kZSA9PT0gbG9jYWxDdXJyZW5jeUNvZGUgJiYgIXBhcnNlRGVjaW1hbElucHV0KGRyYWZ0RXhjaGFuZ2VSYXRlKSkge1xuICAgICAgICBjb25zdCBsb2NhbEV4Y2hhbmdlUmF0ZSA9IGZvcm1hdExpbmVFeGNoYW5nZVJhdGVJbnB1dCgxMDApO1xuICAgICAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShsb2NhbEV4Y2hhbmdlUmF0ZSk7XG4gICAgICAgIHJlY2FsY3VsYXRlQW1vdW50TVNURnJvbVJhdGUoZHJhZnRQcmljZSwgZHJhZnRRdHksIGxvY2FsRXhjaGFuZ2VSYXRlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWNhbGN1bGF0ZUFtb3VudE1TVEZyb21SYXRlKGRyYWZ0UHJpY2UsIGRyYWZ0UXR5LCBkcmFmdEV4Y2hhbmdlUmF0ZSk7XG4gICAgfSxcbiAgICBbXG4gICAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgICAgIGRyYWZ0UHJpY2UsXG4gICAgICBkcmFmdFF0eSxcbiAgICAgIGZvcm1hdExpbmVFeGNoYW5nZVJhdGVJbnB1dCxcbiAgICAgIGxvY2FsQ3VycmVuY3lDb2RlLFxuICAgICAgcmVjYWxjdWxhdGVBbW91bnRNU1RGcm9tUmF0ZSxcbiAgICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxuICAgICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZUxpbmVFeGNoYW5nZVJhdGVDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUodmFsdWUpO1xuICAgICAgcmVjYWxjdWxhdGVBbW91bnRNU1RGcm9tUmF0ZShkcmFmdFByaWNlLCBkcmFmdFF0eSwgdmFsdWUpO1xuICAgIH0sXG4gICAgW2RyYWZ0UHJpY2UsIGRyYWZ0UXR5LCByZWNhbGN1bGF0ZUFtb3VudE1TVEZyb21SYXRlLCBzZXREcmFmdEV4Y2hhbmdlUmF0ZV1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVMaW5lQW1vdW50TVNUQ2hhbmdlID0gdXNlQ2FsbGJhY2soXG4gICAgKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgIHNldERyYWZ0QW1vdW50TVNUKHZhbHVlKTtcbiAgICAgIGNvbnN0IGFtb3VudCA9IHJlc29sdmVEcmFmdExpbmVBbW91bnQoZHJhZnRQcmljZSwgZHJhZnRRdHkpO1xuICAgICAgY29uc3QgYW1vdW50TVNUID0gcGFyc2VEZWNpbWFsSW5wdXQodmFsdWUpO1xuICAgICAgY29uc3QgbmV4dEV4Y2hhbmdlUmF0ZSA9IGFtb3VudCAhPSBudWxsICYmIGFtb3VudE1TVCAhPSBudWxsXG4gICAgICAgID8gY2FsY3VsYXRlRXhwZW5zZUxpbmVFeGNoYW5nZVJhdGUoYW1vdW50LCBhbW91bnRNU1QpXG4gICAgICAgIDogbnVsbDtcbiAgICAgIGlmIChuZXh0RXhjaGFuZ2VSYXRlICE9IG51bGwpIHtcbiAgICAgICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUoZm9ybWF0TGluZUV4Y2hhbmdlUmF0ZUlucHV0KG5leHRFeGNoYW5nZVJhdGUpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtkcmFmdFByaWNlLCBkcmFmdFF0eSwgZm9ybWF0TGluZUV4Y2hhbmdlUmF0ZUlucHV0LCByZXNvbHZlRHJhZnRMaW5lQW1vdW50LCBzZXREcmFmdEFtb3VudE1TVCwgc2V0RHJhZnRFeGNoYW5nZVJhdGVdXG4gICk7XG5cclxuICBjb25zdCB7XHJcbiAgICBtb2RhbCxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gICAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICAgIG1vZGFsQ2FuY2VsVGV4dCxcclxuICAgIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgfSA9IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxDb25maXJtRGlhbG9nKHtcclxuICAgIGJ1c3ksXHJcbiAgICBtb2RhbEVycm9yLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFN0YXR1cyxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBoYW5kbGVVcGRhdGUsIGhhbmRsZURlbGV0ZSB9ID0gdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9ucyh7XHJcbiAgICBidXN5LFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNFZGl0TG9ja2VkOiBpc0xpbmVFZGl0TG9ja2VkLFxyXG4gICAgaXNEZWxldGVMb2NrZWQ6IGlzTGluZURlbGV0ZUxvY2tlZCxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6IGNhbkNyZWF0ZUV4cGVuc2VDdXJyZW50LFxyXG4gICAgY2FuRWRpdEV4cGVuc2U6IGNhbkVkaXRFeHBlbnNlQ3VycmVudCxcclxuICAgIGNhbkRlbGV0ZUV4cGVuc2U6IGNhbkRlbGV0ZUV4cGVuc2VDdXJyZW50LFxyXG4gICAgc2hlZXRJZCxcclxuICAgIGxpbmVJZCxcclxuICAgIGxpbmUsXHJcbiAgICBsaW5rZWRUaWNrZXRGaWxlSWQsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICBkcmFmdFR5cGVWYWx1ZUNvZGUsXHJcbiAgICBkcmFmdFByaWNlLFxyXG4gICAgZHJhZnRRdHksXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgZHJhZnRJbnRlcm5hdGlvbmFsLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0QW1vdW50TVNULFxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICAgIGxvY2FsQ3VycmVuY3lDb2RlLFxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgb25JbnZhbGlkVHlwZTogZm9jdXNUeXBlRmllbGQsXHJcbiAgICBvbkludmFsaWRBbW91bnRRdHk6IGZvY3VzQW1vdW50RmllbGRzLFxyXG4gICAgb25DcmVhdGVTdWNjZXNzOiAoKSA9PiB7fSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgbGluZVRvcGJhckFjdGlvbk1vZGUgPVxyXG4gICAgIWNhbkVkaXRFeHBlbnNlQ3VycmVudCAmJiAhY2FuRGVsZXRlRXhwZW5zZUN1cnJlbnRcclxuICAgICAgPyBcInZpZXdfb25seVwiXHJcbiAgICAgIDogXCJkZWZhdWx0XCI7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUVkaXRMaW5rZWRUaWNrZXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBzYWZlRmlsZUlkID0gc2FmZVRleHQobGlua2VkVGlja2V0RmlsZUlkKTtcclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQoc2hlZXRJZCk7XHJcbiAgICBjb25zdCBzYWZlTGluZUlkID0gc2FmZVRleHQobGluZUlkIHx8IGxpbmU/LmxpbmVSZWNJZCk7XHJcbiAgICBpZiAoIXNhZmVGaWxlSWQgfHwgIXNhZmVTaGVldElkIHx8ICFzYWZlTGluZUlkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgZmlsZUlkOiBzYWZlRmlsZUlkLFxyXG4gICAgICBvcmlnaW46IFwiZXhwZW5zZS1saW5lXCIsXHJcbiAgICAgIHNoZWV0SWQ6IHNhZmVTaGVldElkLFxyXG4gICAgICBzaGVldExpbmVSZWNJZDogc2FmZUxpbmVJZCxcclxuICAgICAgbW9kZTogXCJlZGl0XCIsXHJcbiAgICB9KTtcclxuICAgIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCh7XHJcbiAgICAgIGZpbGVJZDogc2FmZUZpbGVJZCxcclxuICAgICAgb3JpZ2luOiBcImV4cGVuc2UtbGluZVwiLFxyXG4gICAgICBzaGVldElkOiBzYWZlU2hlZXRJZCxcclxuICAgICAgc2hlZXRMaW5lUmVjSWQ6IHNhZmVMaW5lSWQsXHJcbiAgICB9KTtcclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcclxuICAgIH0pO1xyXG4gIH0sIFtpc0VkaXRpbmcsIGxpbmU/LmxpbmVSZWNJZCwgbGluZUlkLCBsaW5rZWRUaWNrZXRGaWxlSWQsIHNoZWV0SWRdKTtcclxuXHJcbiAgdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnMoe1xyXG4gICAgYnVzeTogYnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXHJcbiAgICBtb2RhbE9wZW46IG1vZGFsLm9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0xvY2tlZDogaXNTaGVldExvY2tlZCxcclxuICAgIGFjdGlvbk1vZGU6IGxpbmVUb3BiYXJBY3Rpb25Nb2RlLFxyXG4gICAgcGVybWlzc2lvbnNSZWFkeTogbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogY2FuQ3JlYXRlRXhwZW5zZUN1cnJlbnQsXHJcbiAgICBjYW5FZGl0RXhwZW5zZTogY2FuRWRpdEV4cGVuc2VDdXJyZW50LFxyXG4gICAgY2FuRGVsZXRlRXhwZW5zZTogY2FuRGVsZXRlRXhwZW5zZUN1cnJlbnQsXHJcbiAgICBzaGVldElkLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQ6IGhhc0xpbmtlZFRpY2tldCA/IGhhbmRsZUVkaXRMaW5rZWRUaWNrZXQgOiBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICAgIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICAgIHNldElzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSh0cnVlKTtcclxuICAgICAgICBuYXZpZ2F0ZVRvU2hlZXREZXRhaWwoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlbG9hZEV4cGVuc2VQYWdlKCk7XHJcbiAgICB9LFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU9wZW5MaW5rZWRUaWNrZXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBzYWZlRmlsZUlkID0gc2FmZVRleHQobGlua2VkVGlja2V0RmlsZUlkKTtcclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQoc2hlZXRJZCk7XHJcbiAgICBjb25zdCBzYWZlTGluZUlkID0gc2FmZVRleHQobGluZUlkIHx8IGxpbmU/LmxpbmVSZWNJZCk7XHJcbiAgICBpZiAoIXNhZmVGaWxlSWQgfHwgIXNhZmVTaGVldElkIHx8ICFzYWZlTGluZUlkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgZmlsZUlkOiBzYWZlRmlsZUlkLFxyXG4gICAgICBvcmlnaW46IFwiZXhwZW5zZS1saW5lXCIsXHJcbiAgICAgIHNoZWV0SWQ6IHNhZmVTaGVldElkLFxyXG4gICAgICBzaGVldExpbmVSZWNJZDogc2FmZUxpbmVJZCxcclxuICAgIH0pO1xyXG4gICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcclxuICAgICAgZmlsZUlkOiBzYWZlRmlsZUlkLFxyXG4gICAgICBvcmlnaW46IFwiZXhwZW5zZS1saW5lXCIsXHJcbiAgICAgIHNoZWV0SWQ6IHNhZmVTaGVldElkLFxyXG4gICAgICBzaGVldExpbmVSZWNJZDogc2FmZUxpbmVJZCxcclxuICAgIH0pO1xyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxyXG4gICAgfSk7XHJcbiAgfSwgW2lzRWRpdGluZywgbGluZT8ubGluZVJlY0lkLCBsaW5lSWQsIGxpbmtlZFRpY2tldEZpbGVJZCwgc2hlZXRJZF0pO1xyXG5cclxuICBjb25zdCBkZXRhaWxCb2R5ID1cclxuICAgICFpc0xvYWRpbmcgJiYgIWlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhZXJyb3JNZXNzYWdlICYmIGxpbmUgPyAoXHJcbiAgICAgIDxFeHBlbnNlU2hlZXRMaW5lRm9ybVxyXG4gICAgICAgIGxpbmU9e2xpbmV9XHJcbiAgICAgICAgZmFsbGJhY2tEYXRlPXtzYWZlVGV4dChoZWFkZXI/LmNyZWF0ZWREYXRlKX1cclxuICAgICAgICBzaGVldERlc2NyaXB0aW9uPXtzaGVldERlc2NyaXB0aW9ufVxyXG4gICAgICAgIHByb2plY3RWYWx1ZT17cHJvamVjdFZhbHVlfVxyXG4gICAgICAgIHByaWNlVGV4dD17cHJpY2VUZXh0fVxyXG4gICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XG4gICAgICAgIGFtb3VudE1TVFRleHQ9e2Ftb3VudE1TVFRleHR9XG4gICAgICAgIGludGVybmFjaW9uYWxMYWJlbD17aW50ZXJuYWNpb25hbExhYmVsfVxyXG4gICAgICAgIGlzS21UeXBlPXtpc0ttVHlwZX1cclxuICAgICAgICBpc0Z1ZWxQcmljZUxvYWRpbmc9e2lzRnVlbFByaWNlTG9hZGluZ31cclxuICAgICAgICBmdWVsUHJpY2VNZXNzYWdlPXtmdWVsUHJpY2VNZXNzYWdlfVxyXG4gICAgICAgIGZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yPXtmdWVsUHJpY2VNZXNzYWdlSXNFcnJvcn1cclxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cclxuICAgICAgICBpc0VkaXRpbmc9e2lzRWRpdGluZ31cclxuICAgICAgICBnYXN0b1R5cGVPcHRpb25zPXtnYXN0b1R5cGVPcHRpb25zfVxyXG4gICAgICAgIGludGVybmF0aW9uYWxPcHRpb25zPXtpbnRlcm5hdGlvbmFsT3B0aW9uc31cclxuICAgICAgICBkcmFmdERlc2NyaXB0aW9uPXtkcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgIGRyYWZ0VHJhbnNEYXRlPXtkcmFmdFRyYW5zRGF0ZX1cclxuICAgICAgICBkcmFmdFR5cGVWYWx1ZUNvZGU9e2RyYWZ0VHlwZVZhbHVlQ29kZX1cclxuICAgICAgICBkcmFmdFByaWNlPXtkcmFmdFByaWNlfVxyXG4gICAgICAgIGRyYWZ0UXR5PXtkcmFmdFF0eX1cbiAgICAgICAgZHJhZnRQcm9qZWN0SWQ9e2RyYWZ0UHJvamVjdElkfVxuICAgICAgICBkcmFmdEludGVybmF0aW9uYWw9e2RyYWZ0SW50ZXJuYXRpb25hbH1cbiAgICAgICAgZHJhZnRDdXJyZW5jeUNvZGU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxuICAgICAgICBkcmFmdEFtb3VudE1TVD17ZHJhZnRBbW91bnRNU1R9XG4gICAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlPXtkcmFmdEV4Y2hhbmdlUmF0ZX1cbiAgICAgICAgbG9jYWxDdXJyZW5jeUNvZGU9e2xvY2FsQ3VycmVuY3lDb2RlfVxuICAgICAgICB0eXBlSW5wdXRSZWY9e3R5cGVJbnB1dFJlZn1cclxuICAgICAgICBwcmljZUlucHV0UmVmPXtwcmljZUlucHV0UmVmfVxyXG4gICAgICAgIHF0eUlucHV0UmVmPXtxdHlJbnB1dFJlZn1cclxuICAgICAgICB0eXBlSW52YWxpZD17dHlwZUludmFsaWR9XHJcbiAgICAgICAgcHJpY2VJbnZhbGlkPXtwcmljZUludmFsaWR9XHJcbiAgICAgICAgcXR5SW52YWxpZD17cXR5SW52YWxpZH1cclxuICAgICAgICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U9e3NldERyYWZ0RGVzY3JpcHRpb259XHJcbiAgICAgICAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZT17c2V0RHJhZnRUcmFuc0RhdGV9XHJcbiAgICAgICAgb25EcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2U9e2hhbmRsZURyYWZ0VHlwZVZhbHVlQ29kZUNoYW5nZX1cclxuICAgICAgICBvbkRyYWZ0UHJpY2VDaGFuZ2U9e2hhbmRsZUxpbmVQcmljZUNoYW5nZX1cbiAgICAgICAgb25EcmFmdFF0eUNoYW5nZT17aGFuZGxlTGluZVF0eUNoYW5nZX1cbiAgICAgICAgb25EcmFmdFByb2plY3RJZENoYW5nZT17c2V0RHJhZnRQcm9qZWN0SWR9XG4gICAgICAgIG9uRHJhZnRJbnRlcm5hdGlvbmFsQ2hhbmdlPXtzZXREcmFmdEludGVybmF0aW9uYWx9XG4gICAgICAgIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U9e2hhbmRsZUxpbmVDdXJyZW5jeUNoYW5nZX1cbiAgICAgICAgb25EcmFmdEFtb3VudE1TVENoYW5nZT17aGFuZGxlTGluZUFtb3VudE1TVENoYW5nZX1cbiAgICAgICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZT17aGFuZGxlTGluZUV4Y2hhbmdlUmF0ZUNoYW5nZX1cbiAgICAgICAgbGlua2VkVGlja2V0RmlsZUlkPXtsaW5rZWRUaWNrZXRGaWxlSWR9XHJcbiAgICAgICAgc2hvd0xpbmtlZFRpY2tldEZpZWxkPXtoYXNMaW5rZWRUaWNrZXR9XHJcbiAgICAgICAgb25PcGVuTGlua2VkVGlja2V0PXtoYW5kbGVPcGVuTGlua2VkVGlja2V0fVxyXG4gICAgICAvPlxyXG4gICAgKSA6IG51bGw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8RXhwZW5zZVNoZWV0TGluZURldGFpbFZpZXdcclxuICAgICAgbW9kYWw9e3tcclxuICAgICAgICBvcGVuOiBtb2RhbC5vcGVuLFxyXG4gICAgICAgIHRpdGxlOiBtb2RhbC50aXRsZSxcclxuICAgICAgICBtZXNzYWdlOiBtb2RhbC5tZXNzYWdlLFxyXG4gICAgICAgIGNvbmZpcm1UZXh0OiBtb2RhbENvbmZpcm1UZXh0LFxyXG4gICAgICAgIGNhbmNlbFRleHQ6IG1vZGFsQ2FuY2VsVGV4dCxcclxuICAgICAgICBsb2FkaW5nVGV4dDogbW9kYWxMb2FkaW5nVGV4dCxcclxuICAgICAgICBzaG93Q2FuY2VsOiBtb2RhbC5zaG93Q2FuY2VsLFxyXG4gICAgICAgIHNob3dDb25maXJtOiBtb2RhbC5zaG93Q29uZmlybSxcclxuICAgICAgICBidXN5OiBidXN5IHx8IGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSxcclxuICAgICAgICBlcnJvcjogbW9kYWxFcnJvcixcclxuICAgICAgICBzdGF0dXMsXHJcbiAgICAgICAgb25Db25maXJtOiBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgICAgICAgb25DYW5jZWw6IGNsb3NlQ29uZmlybSxcclxuICAgICAgfX1cclxuICAgICAgcHJldmlldz17e1xyXG4gICAgICAgIG9wZW46IHByZXZpZXdPcGVuLFxyXG4gICAgICAgIGJ1c3k6IHByZXZpZXdCdXN5LFxyXG4gICAgICAgIGVycm9yOiBwcmV2aWV3RXJyb3IsXHJcbiAgICAgICAgaW1hZ2VVcmw6IHByZXZpZXdJbWFnZVVybCxcclxuICAgICAgICBpbWFnZUFsdDogcHJldmlld0FsdFRleHQsXHJcbiAgICAgICAgZmlsZU5hbWU6IHByZXZpZXdGaWxlTmFtZSxcclxuICAgICAgICBzY2FsZTogcHJldmlld1NjYWxlLFxyXG4gICAgICAgIHRyYW5zbGF0ZTogcHJldmlld1RyYW5zbGF0ZSxcclxuICAgICAgICBzdXJmYWNlUmVmOiBwcmV2aWV3U3VyZmFjZVJlZixcclxuICAgICAgICBzaG93U3RpY2t5UHJldmlldyxcclxuICAgICAgICBvbk9wZW46IG9wZW5QcmV2aWV3LFxyXG4gICAgICAgIG9uQ2xvc2U6IGNsb3NlUHJldmlldyxcclxuICAgICAgICBvblBvaW50ZXJEb3duOiBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24sXHJcbiAgICAgICAgb25Qb2ludGVyTW92ZTogaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlLFxyXG4gICAgICAgIG9uUG9pbnRlckVuZDogaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXHJcbiAgICAgICAgb25XaGVlbDogaGFuZGxlUHJldmlld1doZWVsLFxyXG4gICAgICB9fVxyXG4gICAgICBjb250ZW50PXt7XHJcbiAgICAgICAgaXNMb2FkaW5nLFxyXG4gICAgICAgIGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSxcclxuICAgICAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICAgICAgZGV0YWlsQm9keSxcclxuICAgICAgfX1cclxuICAgIC8+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgZXhwZW5zZSBzaGVldCBsaW5lIGRldGFpbC5cclxuY29uc3QgRXhwZW5zZVNoZWV0TGluZURldGFpbFBhZ2UgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cclxuICAgICAgPEV4cGVuc2VTaGVldExpbmVEZXRhaWxDb250ZW50IC8+XHJcbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS1saW5lLWRldGFpbC1yb290XCIpO1xyXG4gIGlmICghcm9vdEVsKSByZXR1cm47XHJcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxFeHBlbnNlU2hlZXRMaW5lRGV0YWlsUGFnZSAvPik7XHJcbn07XHJcblxyXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldExpbmVEZXRhaWxQYWdlO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IFNpbmdsZURhdGVQaWNrZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TaW5nbGVEYXRlUGlja2VyLnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIsIGZvcm1hdEV4cGVuc2VOdW1iZXIgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dCBmcm9tIFwiLi9FeHBlbnNlUHJvamVjdEZpbHRlcklucHV0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVJlYWRPbmx5RmllbGQgZnJvbSBcIi4vRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVNlY3Rpb25EaXZpZGVyIGZyb20gXCIuL0V4cGVuc2VTZWN0aW9uRGl2aWRlci50c3hcIjtcblxyXG50eXBlIEV4cGVuc2VTaGVldExpbmVGb3JtUHJvcHMgPSB7XHJcbiAgbGluZTogRXhwZW5zZVNoZWV0TGluZTtcclxuICBmYWxsYmFja0RhdGU6IHN0cmluZztcclxuICBzaGVldERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgcHJvamVjdFZhbHVlOiBzdHJpbmc7XG4gIHByaWNlVGV4dDogc3RyaW5nO1xuICBhbW91bnRUZXh0OiBzdHJpbmc7XG4gIGFtb3VudE1TVFRleHQ6IHN0cmluZztcbiAgaW50ZXJuYWNpb25hbExhYmVsOiBzdHJpbmc7XHJcbiAgaXNLbVR5cGU6IGJvb2xlYW47XHJcbiAgaXNGdWVsUHJpY2VMb2FkaW5nOiBib29sZWFuO1xyXG4gIGZ1ZWxQcmljZU1lc3NhZ2U6IHN0cmluZztcclxuICBmdWVsUHJpY2VNZXNzYWdlSXNFcnJvcjogYm9vbGVhbjtcclxuICBzdGF0dXM6IHN0cmluZztcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgZ2FzdG9UeXBlT3B0aW9uczogRXhwZW5zZVNlbGVjdE9wdGlvbltdO1xyXG4gIGludGVybmF0aW9uYWxPcHRpb25zOiBFeHBlbnNlU2VsZWN0T3B0aW9uW107XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgZHJhZnRUeXBlVmFsdWVDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRQcmljZTogc3RyaW5nO1xyXG4gIGRyYWZ0UXR5OiBzdHJpbmc7XG4gIGRyYWZ0UHJvamVjdElkOiBzdHJpbmc7XG4gIGRyYWZ0SW50ZXJuYXRpb25hbDogc3RyaW5nO1xuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBkcmFmdEFtb3VudE1TVDogc3RyaW5nO1xuICBkcmFmdEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xuICBsb2NhbEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBsaW5rZWRUaWNrZXRGaWxlSWQ6IHN0cmluZztcclxuICBzaG93TGlua2VkVGlja2V0RmllbGQ6IGJvb2xlYW47XHJcbiAgdHlwZUlucHV0UmVmPzogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIHByaWNlSW5wdXRSZWY/OiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgcXR5SW5wdXRSZWY/OiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgdHlwZUludmFsaWQ/OiBib29sZWFuO1xyXG4gIHByaWNlSW52YWxpZD86IGJvb2xlYW47XHJcbiAgcXR5SW52YWxpZD86IGJvb2xlYW47XHJcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0VHlwZVZhbHVlQ29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdFByaWNlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0UXR5Q2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdFByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRJbnRlcm5hdGlvbmFsQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRBbW91bnRNU1RDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25PcGVuTGlua2VkVGlja2V0OiAoKSA9PiB2b2lkO1xufTtcblxyXG5jb25zdCBmb3JtYXRRdHlWYWx1ZSA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBmb3JtYXRFeHBlbnNlTnVtYmVyKHZhbHVlLCB7XG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICBmYWxsYmFjazogXCItXCIsXG4gIH0pO1xufTtcblxudHlwZSBFeHBlbnNlU2hlZXRMaW5lQ3VycmVuY3lGaWVsZHNQcm9wcyA9IHtcbiAgbGluZTogRXhwZW5zZVNoZWV0TGluZTtcbiAgYW1vdW50VGV4dDogc3RyaW5nO1xuICBhbW91bnRNU1RUZXh0OiBzdHJpbmc7XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgZHJhZnRBbW91bnRNU1Q6IHN0cmluZztcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcbiAgbG9jYWxDdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRBbW91bnRNU1RDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbi8vIFJlbmRlcnMgcGVyLWxpbmUgY3VycmVuY3kgYW5kIHJlaW1idXJzZW1lbnQgY29udHJvbHMuXG5jb25zdCBFeHBlbnNlU2hlZXRMaW5lQ3VycmVuY3lGaWVsZHMgPSAoe1xuICBsaW5lLFxuICBhbW91bnRUZXh0LFxuICBhbW91bnRNU1RUZXh0LFxuICBpc0VkaXRpbmcsXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICBkcmFmdEFtb3VudE1TVCxcbiAgZHJhZnRFeGNoYW5nZVJhdGUsXG4gIGxvY2FsQ3VycmVuY3lDb2RlLFxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlLFxuICBvbkRyYWZ0QW1vdW50TVNUQ2hhbmdlLFxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlLFxufTogRXhwZW5zZVNoZWV0TGluZUN1cnJlbmN5RmllbGRzUHJvcHMpID0+IChcbiAgPD5cbiAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Ftb3VudEN1cnJlbmN5XCIsIFwiQW1vdW50IGN1cnJlbmN5XCIpfSB2YWx1ZT17YW1vdW50VGV4dCB8fCBcIi1cIn0gLz5cblxuICAgIHtpc0VkaXRpbmcgPyAoXG4gICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XG4gICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5X1BsYWNlaG9sZGVyXCIsIFwiQ3VycmVuY3kgY29kZVwiKX1cbiAgICAgICAgdmFsdWU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxuICAgICAgICBvbkNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cbiAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS1saW5lLWN1cnJlbmN5XCJcbiAgICAgIC8+XG4gICAgKSA6IChcbiAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cbiAgICAgICAgdmFsdWU9e3NhZmVUZXh0KGxpbmUuY3VycmVuY3lDb2RlKSB8fCBsb2NhbEN1cnJlbmN5Q29kZSB8fCBcIi1cIn1cbiAgICAgIC8+XG4gICAgKX1cblxuICAgIHtpc0VkaXRpbmcgPyAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX08L2xhYmVsPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBpbnB1dE1vZGU9XCJkZWNpbWFsXCJcbiAgICAgICAgICB2YWx1ZT17ZHJhZnRFeGNoYW5nZVJhdGV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgb25CbHVyPXsoZXZlbnQpID0+XG4gICAgICAgICAgICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlKFxuICAgICAgICAgICAgICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlLCB7XG4gICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiA3LFxuICAgICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogNyxcbiAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmYWxsYmFjazogXCJcIixcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICkgOiAoXG4gICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4Y2hhbmdlUmF0ZVwiLCBcIkV4Y2hhbmdlIHJhdGVcIil9XG4gICAgICAgIHZhbHVlPXtmb3JtYXRFeHBlbnNlTnVtYmVyKGxpbmUuZXhjaFJhdGUgPz8gbnVsbCwge1xuICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogNyxcbiAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDcsXG4gICAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgICAgICAgZmFsbGJhY2s6IFwiLVwiLFxuICAgICAgICB9KX1cbiAgICAgIC8+XG4gICAgKX1cblxuICAgIHtpc0VkaXRpbmcgPyAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUmVpbWJ1cnNlbWVudEFtb3VudFwiLCBcIlJlaW1idXJzZW1lbnQgYW1vdW50XCIpfVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBpbnB1dE1vZGU9XCJkZWNpbWFsXCJcbiAgICAgICAgICB2YWx1ZT17ZHJhZnRBbW91bnRNU1R9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdEFtb3VudE1TVENoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgb25CbHVyPXsoZXZlbnQpID0+XG4gICAgICAgICAgICBvbkRyYWZ0QW1vdW50TVNUQ2hhbmdlKFxuICAgICAgICAgICAgICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlLCB7XG4gICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmYWxsYmFjazogXCJcIixcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUmVpbWJ1cnNlbWVudEFtb3VudFwiLCBcIlJlaW1idXJzZW1lbnQgYW1vdW50XCIpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKSA6IChcbiAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUmVpbWJ1cnNlbWVudEFtb3VudFwiLCBcIlJlaW1idXJzZW1lbnQgYW1vdW50XCIpfVxuICAgICAgICB2YWx1ZT17YW1vdW50TVNUVGV4dCB8fCBcIi1cIn1cbiAgICAgIC8+XG4gICAgKX1cbiAgPC8+XG4pO1xuXG4vLyBQdXJlIGZvcm0gcmVuZGVyZXIgZm9yIGV4cGVuc2UgbGluZSBkZXRhaWwgaW4gcmVhZCBhbmQgZWRpdCBtb2Rlcy5cbmNvbnN0IEV4cGVuc2VTaGVldExpbmVGb3JtID0gKHtcbiAgbGluZSxcclxuICBmYWxsYmFja0RhdGUsXHJcbiAgc2hlZXREZXNjcmlwdGlvbjogX3NoZWV0RGVzY3JpcHRpb24sXHJcbiAgcHJvamVjdFZhbHVlLFxuICBwcmljZVRleHQsXG4gIGFtb3VudFRleHQsXG4gIGFtb3VudE1TVFRleHQsXG4gIGludGVybmFjaW9uYWxMYWJlbCxcclxuICBpc0ttVHlwZSxcclxuICBpc0Z1ZWxQcmljZUxvYWRpbmcsXHJcbiAgZnVlbFByaWNlTWVzc2FnZSxcclxuICBmdWVsUHJpY2VNZXNzYWdlSXNFcnJvcixcclxuICBzdGF0dXMsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgaW50ZXJuYXRpb25hbE9wdGlvbnMsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkcmFmdFRyYW5zRGF0ZSxcclxuICBkcmFmdFR5cGVWYWx1ZUNvZGUsXHJcbiAgZHJhZnRQcmljZSxcclxuICBkcmFmdFF0eSxcbiAgZHJhZnRQcm9qZWN0SWQsXG4gIGRyYWZ0SW50ZXJuYXRpb25hbCxcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gIGRyYWZ0QW1vdW50TVNULFxuICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgbG9jYWxDdXJyZW5jeUNvZGUsXG4gIGxpbmtlZFRpY2tldEZpbGVJZCxcclxuICBzaG93TGlua2VkVGlja2V0RmllbGQsXHJcbiAgdHlwZUlucHV0UmVmLFxyXG4gIHByaWNlSW5wdXRSZWYsXHJcbiAgcXR5SW5wdXRSZWYsXHJcbiAgdHlwZUludmFsaWQgPSBmYWxzZSxcclxuICBwcmljZUludmFsaWQgPSBmYWxzZSxcclxuICBxdHlJbnZhbGlkID0gZmFsc2UsXHJcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlLFxyXG4gIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2UsXHJcbiAgb25EcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2UsXHJcbiAgb25EcmFmdFByaWNlQ2hhbmdlLFxyXG4gIG9uRHJhZnRRdHlDaGFuZ2UsXG4gIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2UsXG4gIG9uRHJhZnRJbnRlcm5hdGlvbmFsQ2hhbmdlLFxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlLFxuICBvbkRyYWZ0QW1vdW50TVNUQ2hhbmdlLFxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlLFxuICBvbk9wZW5MaW5rZWRUaWNrZXQsXG59OiBFeHBlbnNlU2hlZXRMaW5lRm9ybVByb3BzKSA9PiB7XG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzcGFjZS15LTBcIj5cclxuICAgICAgPEV4cGVuc2VTZWN0aW9uRGl2aWRlclxyXG4gICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lXCIsIFwiTGluZVwiKX1cclxuICAgICAgICBjbGFzc05hbWU9XCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlci0tc3BhY2VkXCJcclxuICAgICAgICBsYWJlbENsYXNzTmFtZT1cImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyX19sYWJlbC0tdGl0bGVcIlxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicmVsYXRpdmUgc2hhZG93LXhzIGdsYXNzLXBhbmVsIHAtNCBzcGFjZS15LTQgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV1cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cclxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cclxuICAgICAgICAgICAgICB2YWx1ZT17c2FmZVRleHQobGluZS5kZXNjcmlwdGlvbikgfHwgXCItXCJ9XHJcbiAgICAgICAgICAgICAgZnVsbFdpZHRoXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIHtzaG93TGlua2VkVGlja2V0RmllbGQgPyAoXHJcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIil9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e2xpbmtlZFRpY2tldEZpbGVJZH1cclxuICAgICAgICAgICAgICBmdWxsV2lkdGhcclxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbk9wZW5MaW5rZWRUaWNrZXR9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpc2l0YS1maWVsZC10ZXh0XCI+XHJcbiAgICAgICAgICAgICAgPFNpbmdsZURhdGVQaWNrZXJcclxuICAgICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DcmVhdGVkRGF0ZVwiLCBcIkRhdGVcIil9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRUcmFuc0RhdGV9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdFRyYW5zRGF0ZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nfVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmd9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3JlYXRlZERhdGVcIiwgXCJEYXRlXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoXHJcbiAgICAgICAgICAgICAgICBzYWZlVGV4dChsaW5lLnRyYW5zRGF0ZSB8fCBmYWxsYmFja0RhdGUpLFxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCJcclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVHlwZVwiLCBcIlR5cGVcIil9XHJcbiAgICAgICAgICAgICAgb3B0aW9ucz17Z2FzdG9UeXBlT3B0aW9uc31cclxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRUeXBlVmFsdWVDb2RlIHx8IFwiXCJ9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgIGlucHV0UmVmPXt0eXBlSW5wdXRSZWZ9XHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1R5cGVcIiwgXCJUeXBlXCIpfVxyXG4gICAgICAgICAgICAgIGludmFsaWQ9e3R5cGVJbnZhbGlkfVxyXG4gICAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9UeXBlXCIsIFwiVHlwZVwiKX0gdmFsdWU9e3NhZmVUZXh0KGxpbmUudHlwZVZhbHVlKSB8fCBcIi1cIn0gLz5cclxuICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAge2lzRWRpdGluZyA/IChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJpY2VcIiwgXCJQcmljZVwiKX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgcmVmPXtwcmljZUlucHV0UmVmfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtpc0ttVHlwZSA/IFwiZm9ybS1jb250cm9sIGluZC1yZWFkb25seS1maWVsZFwiIDogXCJmb3JtLWNvbnRyb2xcIn0ke1xyXG4gICAgICAgICAgICAgICAgICBwcmljZUludmFsaWQgPyBcIiBib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpyaW5nLXJvc2UtMjAwIGZvY3VzOmJvcmRlci1yb3NlLTQwMFwiIDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfWB9XHJcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICBpbnB1dE1vZGU9XCJkZWNpbWFsXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFByaWNlfVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdFByaWNlQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cclxuICAgICAgICAgICAgICAgIG9uQmx1cj17KGV2ZW50KSA9PlxyXG4gICAgICAgICAgICAgICAgICBvbkRyYWZ0UHJpY2VDaGFuZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKGV2ZW50LnRhcmdldC52YWx1ZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICBmYWxsYmFjazogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZWFkT25seT17aXNLbVR5cGV9XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNLbVR5cGV9XHJcbiAgICAgICAgICAgICAgICBhcmlhLXJlYWRvbmx5PXtpc0ttVHlwZX1cclxuICAgICAgICAgICAgICAgIGFyaWEtaW52YWxpZD17cHJpY2VJbnZhbGlkID8gXCJ0cnVlXCIgOiBcImZhbHNlXCJ9XHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9QcmljZVwiLCBcIlByaWNlXCIpfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAge2lzS21UeXBlICYmIGlzRnVlbFByaWNlTG9hZGluZyA/IChcclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIHRleHQteHNcIj5cclxuICAgICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX0Z1ZWxQcmljZV9Mb2FkaW5nXCIsIFwiTG9hZGluZyBmdWVsIHByaWNlLi4uXCIpfVxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAgICAgIHtpc0ttVHlwZSAmJiAhaXNGdWVsUHJpY2VMb2FkaW5nICYmIGZ1ZWxQcmljZU1lc3NhZ2UgPyAoXHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e2Z1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yID8gXCJ0ZXh0LWRhbmdlciB0ZXh0LXNtXCIgOiBcInRleHQtc2xhdGUtNTAwIHRleHQteHNcIn0+e2Z1ZWxQcmljZU1lc3NhZ2V9PC9wPlxyXG4gICAgICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJpY2VcIiwgXCJQcmljZVwiKX0gdmFsdWU9e3ByaWNlVGV4dCB8fCBcIi1cIn0gLz5cclxuICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAge2lzRWRpdGluZyA/IChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUXR5XCIsIFwiUXVhbnRpdHlcIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgIHJlZj17cXR5SW5wdXRSZWZ9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb3JtLWNvbnRyb2wke1xyXG4gICAgICAgICAgICAgICAgICBxdHlJbnZhbGlkID8gXCIgYm9yZGVyLXJvc2UtNDAwIGJnLXJvc2UtNTAgZm9jdXM6cmluZy1yb3NlLTIwMCBmb2N1czpib3JkZXItcm9zZS00MDBcIiA6IFwiXCJcclxuICAgICAgICAgICAgICAgIH1gfVxyXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgaW5wdXRNb2RlPVwiZGVjaW1hbFwiXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRRdHl9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0UXR5Q2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cclxuICAgICAgICAgICAgICAgIG9uQmx1cj17KGV2ZW50KSA9PlxyXG4gICAgICAgICAgICAgICAgICBvbkRyYWZ0UXR5Q2hhbmdlKFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihldmVudC50YXJnZXQudmFsdWUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgICAgICAgICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgICAgICAgICAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZmFsbGJhY2s6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYXJpYS1pbnZhbGlkPXtxdHlJbnZhbGlkID8gXCJ0cnVlXCIgOiBcImZhbHNlXCJ9XHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9RdHlcIiwgXCJRdWFudGl0eVwiKX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9RdHlcIiwgXCJRdWFudGl0eVwiKX1cclxuICAgICAgICAgICAgICB2YWx1ZT17Zm9ybWF0UXR5VmFsdWUobGluZS5xdHkpfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICA8RXhwZW5zZVNoZWV0TGluZUN1cnJlbmN5RmllbGRzXG4gICAgICAgICAgICBsaW5lPXtsaW5lfVxuICAgICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cbiAgICAgICAgICAgIGFtb3VudE1TVFRleHQ9e2Ftb3VudE1TVFRleHR9XG4gICAgICAgICAgICBpc0VkaXRpbmc9e2lzRWRpdGluZ31cbiAgICAgICAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlPXtkcmFmdEN1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgIGRyYWZ0QW1vdW50TVNUPXtkcmFmdEFtb3VudE1TVH1cbiAgICAgICAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlPXtkcmFmdEV4Y2hhbmdlUmF0ZX1cbiAgICAgICAgICAgIGxvY2FsQ3VycmVuY3lDb2RlPXtsb2NhbEN1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U9e29uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XG4gICAgICAgICAgICBvbkRyYWZ0QW1vdW50TVNUQ2hhbmdlPXtvbkRyYWZ0QW1vdW50TVNUQ2hhbmdlfVxuICAgICAgICAgICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZT17b25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICAgIDxFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0XG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1Byb2plY3RfUGxhY2Vob2xkZXJcIiwgXCJQcm9qZWN0IGlkXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFByb2plY3RJZH1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdFByb2plY3RJZENoYW5nZX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICkgOiBwcm9qZWN0VmFsdWUgPyAoXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfSB2YWx1ZT17cHJvamVjdFZhbHVlfSAvPlxuICAgICAgICAgICkgOiBudWxsfVxuXHJcbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfSW50ZXJuYXRpb25hbFwiLCBcIkludGVybmF0aW9uYWxcIil9XHJcbiAgICAgICAgICAgICAgb3B0aW9ucz17aW50ZXJuYXRpb25hbE9wdGlvbnN9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0SW50ZXJuYXRpb25hbCB8fCBcIlwifVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0SW50ZXJuYXRpb25hbENoYW5nZX1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfSW50ZXJuYXRpb25hbFwiLCBcIkludGVybmF0aW9uYWxcIil9XHJcbiAgICAgICAgICAgICAgdXNlUG9ydGFsPXtmYWxzZX1cclxuICAgICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfSW50ZXJuYXRpb25hbFwiLCBcIkludGVybmF0aW9uYWxcIil9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e2ludGVybmFjaW9uYWxMYWJlbH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICA8c3Bhbj57c3RhdHVzfTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9zZWN0aW9uPlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXRMaW5lRm9ybTtcclxuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZUludGVybmF0aW9uYWxPcHRpb24gPSB7XHJcbiAgdmFsdWU6IGJvb2xlYW47XHJcbiAgdGV4dDogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gRml4ZWQgZW51bSBmb3IgXCJJbnRlcm5hY2lvbmFsXCIgZmllbGQgaW4gZXhwZW5zZSBzaGVldCBsaW5lcy5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VJbnRlcm5hdGlvbmFsT3B0aW9ucyA9ICgpOiBFeHBlbnNlSW50ZXJuYXRpb25hbE9wdGlvbltdID0+IFtcclxuICB7IHZhbHVlOiB0cnVlLCB0ZXh0OiBpbmRUKFwiRXhwZW5zZVNoZWV0c19JbnRlcm5hdGlvbmFsX1llc1wiLCBcIlNcdTAwRURcIikgfSxcclxuICB7IHZhbHVlOiBmYWxzZSwgdGV4dDogaW5kVChcIkV4cGVuc2VTaGVldHNfSW50ZXJuYXRpb25hbF9Ob1wiLCBcIk5vXCIpIH0sXHJcbl07XHJcblxyXG4vLyBNYXBzIG51bGxhYmxlIGJvb2xlYW4gdmFsdWVzIHRvIGZpeGVkIGVudW0gbGFiZWxzIGZvciByZWFkLW9ubHkgcmVuZGVyaW5nLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUludGVybmF0aW9uYWxMYWJlbCA9ICh2YWx1ZTogYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0ludGVybmF0aW9uYWxfWWVzXCIsIFwiU1x1MDBFRFwiKTtcclxuICB9XHJcblxyXG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcclxuICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19JbnRlcm5hdGlvbmFsX05vXCIsIFwiTm9cIik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gXCItXCI7XHJcbn07XHJcblxyXG4vLyBQYXJzZXMgdXNlciBpbnB1dCBiYWNrIHRvIG51bGxhYmxlIGJvb2xlYW4gZm9yIGZ1dHVyZSBlZGl0IG1vZGUuXHJcbmV4cG9ydCBjb25zdCBwYXJzZUV4cGVuc2VJbnRlcm5hdGlvbmFsVmFsdWUgPSAocmF3OiBzdHJpbmcgfCBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZCk6IGJvb2xlYW4gfCBudWxsID0+IHtcclxuICBpZiAocmF3ID09PSB0cnVlIHx8IHJhdyA9PT0gZmFsc2UpIHtcclxuICAgIHJldHVybiByYXc7XHJcbiAgfVxyXG5cclxuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcgfHwgXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKCF2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBpZiAodmFsdWUgPT09IFwidHJ1ZVwiIHx8IHZhbHVlID09PSBcIjFcIikge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBpZiAodmFsdWUgPT09IFwiZmFsc2VcIiB8fCB2YWx1ZSA9PT0gXCIwXCIpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG4iLCAiZXhwb3J0IGNvbnN0IEVYUEVOU0VfTElORV9FWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQgPSAxMDA7XG5cbi8vIE5vcm1hbGl6ZXMgY3VycmVuY3kgaW5wdXQgYmVmb3JlIGNvbXBhcmluZyBvciBzZW5kaW5nIGxpbmUgY3VycmVuY3kgdmFsdWVzLlxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VMaW5lQ3VycmVuY3lDb2RlID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcbn07XG5cbi8vIFJvdW5kcyBsaW5lIGN1cnJlbmN5IGNhbGN1bGF0aW9ucyB0byB0aGUgY2VudHMgZXhwZWN0ZWQgYnkgdGhlIGV4cGVuc2UgVUkuXG5leHBvcnQgY29uc3Qgcm91bmRFeHBlbnNlTGluZU1vbmV5ID0gKHZhbHVlOiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICByZXR1cm4gTWF0aC5yb3VuZCgodmFsdWUgKyBOdW1iZXIuRVBTSUxPTikgKiAxMDApIC8gMTAwO1xufTtcblxuLy8gQ2FsY3VsYXRlcyByZWltYnVyc2VtZW50IGFtb3VudCBmcm9tIGFtb3VudCBhbmQgQVggZXhjaGFuZ2UtcmF0ZSByZWZlcmVuY2UgMTAwLlxuZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZUV4cGVuc2VMaW5lQW1vdW50TVNUID0gKGFtb3VudDogbnVtYmVyLCBleGNoYW5nZVJhdGU6IG51bWJlcik6IG51bWJlciB8IG51bGwgPT4ge1xuICBpZiAoIU51bWJlci5pc0Zpbml0ZShhbW91bnQpIHx8IGFtb3VudCA8PSAwIHx8ICFOdW1iZXIuaXNGaW5pdGUoZXhjaGFuZ2VSYXRlKSB8fCBleGNoYW5nZVJhdGUgPD0gMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHJvdW5kRXhwZW5zZUxpbmVNb25leSgoYW1vdW50ICogZXhjaGFuZ2VSYXRlKSAvIEVYUEVOU0VfTElORV9FWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQpO1xufTtcblxuLy8gQ2FsY3VsYXRlcyBBWCBleGNoYW5nZSByYXRlIGZyb20gYW1vdW50IGFuZCByZWltYnVyc2VtZW50IGFtb3VudC5cbmV4cG9ydCBjb25zdCBjYWxjdWxhdGVFeHBlbnNlTGluZUV4Y2hhbmdlUmF0ZSA9IChhbW91bnQ6IG51bWJlciwgYW1vdW50TVNUOiBudW1iZXIpOiBudW1iZXIgfCBudWxsID0+IHtcbiAgaWYgKCFOdW1iZXIuaXNGaW5pdGUoYW1vdW50KSB8fCBhbW91bnQgPD0gMCB8fCAhTnVtYmVyLmlzRmluaXRlKGFtb3VudE1TVCkgfHwgYW1vdW50TVNUIDw9IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAoYW1vdW50TVNUIC8gYW1vdW50KSAqIEVYUEVOU0VfTElORV9FWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQ7XG59O1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VTaGVldENyZWF0ZUxpbmVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldExpbmUsXHJcbiAgRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlcXVlc3QsXHJcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBwYXJzZUV4cGVuc2VJbnRlcm5hdGlvbmFsVmFsdWUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2ludGVybmF0aW9uYWxPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UsIHRvRXhwZW5zZUFwaURkTW1ZeXl5IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbiwgcGFyc2VEZWNpbWFsSW5wdXQgfSBmcm9tIFwiLi4vaG9va3MvZXhwZW5zZU11dGF0aW9uVXRpbHMudHNcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VMaW5lQ3VycmVuY3lDb2RlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VMaW5lQ3VycmVuY3kudHNcIjtcbmltcG9ydCB7XHJcbiAgY3JlYXRlRXhwZW5zZVNoZWV0LFxyXG4gIGRlbGV0ZUV4cGVuc2VTaGVldExpbmUsXHJcbiAgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0LFxyXG4gIGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldEZpbGUsXHJcbiAgdXBkYXRlRXhwZW5zZVNoZWV0TGluZSxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgaXNFZGl0TG9ja2VkOiBib29sZWFuO1xyXG4gIGlzRGVsZXRlTG9ja2VkOiBib29sZWFuO1xyXG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgbGluZUlkOiBzdHJpbmc7XHJcbiAgbGluZTogRXhwZW5zZVNoZWV0TGluZSB8IG51bGw7XHJcbiAgbGlua2VkVGlja2V0RmlsZUlkOiBzdHJpbmc7XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgZHJhZnRUeXBlVmFsdWVDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRQcmljZTogc3RyaW5nO1xyXG4gIGRyYWZ0UXR5OiBzdHJpbmc7XG4gIGRyYWZ0UHJvamVjdElkOiBzdHJpbmc7XG4gIGRyYWZ0SW50ZXJuYXRpb25hbDogc3RyaW5nO1xuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBkcmFmdEFtb3VudE1TVDogc3RyaW5nO1xuICBkcmFmdEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xuICBsb2NhbEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBzZXRNb2RhbEVycm9yOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0QnVzeTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgb25JbnZhbGlkVHlwZT86ICgpID0+IHZvaWQ7XHJcbiAgb25JbnZhbGlkQW1vdW50UXR5PzogKCkgPT4gdm9pZDtcclxuICBvbkNyZWF0ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVMaW5lRGF0ZSA9IChyYXc6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIHRvRXhwZW5zZUFwaURkTW1ZeXl5KHJhdyk7XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZU51bWJlciA9IChyYXc6IHN0cmluZyk6IG51bWJlciB8IG51bGwgPT4gcGFyc2VEZWNpbWFsSW5wdXQocmF3KTtcclxuXHJcbi8vIEVuY2Fwc3VsYXRlcyB1cGRhdGUgYW5kIGRlbGV0ZSBtdXRhdGlvbnMgZm9yIGV4cGVuc2Ugc2hlZXQgbGluZSBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zID0gKHtcclxuICBidXN5LFxyXG4gIGlzRWRpdGluZyxcclxuICBpc0NyZWF0ZU1vZGUsXHJcbiAgaXNFZGl0TG9ja2VkLFxyXG4gIGlzRGVsZXRlTG9ja2VkLFxyXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXHJcbiAgY2FuRWRpdEV4cGVuc2UsXHJcbiAgY2FuRGVsZXRlRXhwZW5zZSxcclxuICBzaGVldElkLFxyXG4gIGxpbmVJZCxcclxuICBsaW5lLFxyXG4gIGxpbmtlZFRpY2tldEZpbGVJZCxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRyYWZ0VHJhbnNEYXRlLFxyXG4gIGRyYWZ0VHlwZVZhbHVlQ29kZSxcclxuICBkcmFmdFByaWNlLFxyXG4gIGRyYWZ0UXR5LFxuICBkcmFmdFByb2plY3RJZCxcbiAgZHJhZnRJbnRlcm5hdGlvbmFsLFxuICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgZHJhZnRBbW91bnRNU1QsXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICBsb2NhbEN1cnJlbmN5Q29kZSxcbiAgc2V0TW9kYWxFcnJvcixcbiAgc2V0QnVzeSxcclxuICBzZXRTdGF0dXMsXHJcbiAgc2V0SXNFZGl0aW5nLFxyXG4gIG9uSW52YWxpZFR5cGUsXHJcbiAgb25JbnZhbGlkQW1vdW50UXR5LFxyXG4gIG9uQ3JlYXRlU3VjY2VzcyxcclxufTogVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9uc0FyZ3MpID0+IHtcclxuICBjb25zdCBpc05vdEZvdW5kRXJyb3IgPSAoZXJyb3I6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICAgIHJldHVybiBlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDQ7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaXNNaXNzaW5nVGlja2V0RmlsZU1lc3NhZ2UgPSAobWVzc2FnZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyhtZXNzYWdlIHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImFyY2hpdm8gYXNvY2lhZG9cIikgfHxcclxuICAgICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImFyY2hpdm8gYWRqdW50b1wiKSB8fFxyXG4gICAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXNzb2NpYXRlZCBmaWxlXCIpIHx8XHJcbiAgICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhdHRhY2hlZCBmaWxlXCIpXHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChidXN5IHx8ICFpc0VkaXRpbmcpIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChpc0VkaXRMb2NrZWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBjYW5Qcm9jZWVkID0gaXNDcmVhdGVNb2RlID8gY2FuQ3JlYXRlRXhwZW5zZSA6IGNhbkVkaXRFeHBlbnNlO1xyXG4gICAgaWYgKCFjYW5Qcm9jZWVkKSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5vcm1hbGl6ZWREYXRlID0gbm9ybWFsaXplTGluZURhdGUoZHJhZnRUcmFuc0RhdGUpO1xyXG4gICAgY29uc3QgcGFyc2VkVHlwZVZhbHVlID0gTnVtYmVyLnBhcnNlSW50KFN0cmluZyhkcmFmdFR5cGVWYWx1ZUNvZGUgfHwgXCJcIikudHJpbSgpLCAxMCk7XHJcbiAgICBjb25zdCBwYXJzZWRQcmljZSA9IHBhcnNlTnVtYmVyKGRyYWZ0UHJpY2UpO1xuICAgIGNvbnN0IHBhcnNlZFF0eSA9IHBhcnNlTnVtYmVyKGRyYWZ0UXR5KTtcbiAgICBjb25zdCBwYXJzZWRJbnRlcm5hdGlvbmFsID0gcGFyc2VFeHBlbnNlSW50ZXJuYXRpb25hbFZhbHVlKGRyYWZ0SW50ZXJuYXRpb25hbCk7XG4gICAgY29uc3QgcGFyc2VkQW1vdW50TVNUID0gcGFyc2VOdW1iZXIoZHJhZnRBbW91bnRNU1QpO1xuICAgIGNvbnN0IHBhcnNlZEV4Y2hhbmdlUmF0ZSA9IHBhcnNlTnVtYmVyKGRyYWZ0RXhjaGFuZ2VSYXRlKTtcbiAgICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3lDb2RlID0gbm9ybWFsaXplRXhwZW5zZUxpbmVDdXJyZW5jeUNvZGUoZHJhZnRDdXJyZW5jeUNvZGUpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRMb2NhbEN1cnJlbmN5Q29kZSA9IG5vcm1hbGl6ZUV4cGVuc2VMaW5lQ3VycmVuY3lDb2RlKGxvY2FsQ3VycmVuY3lDb2RlKSB8fCBcIkVVUlwiO1xuXG4gICAgY29uc3QgaGFzVmFsaWRRdHlQcmljZSA9IHBhcnNlZFF0eSAhPSBudWxsICYmIHBhcnNlZFF0eSA+IDAgJiYgcGFyc2VkUHJpY2UgIT0gbnVsbCAmJiBwYXJzZWRQcmljZSA+IDA7XG4gICAgaWYgKCFoYXNWYWxpZFF0eVByaWNlKSB7XHJcbiAgICAgIG9uSW52YWxpZEFtb3VudFF0eT8uKCk7XHJcbiAgICAgIGNvbnN0IHZhbGlkYXRpb25NZXNzYWdlID0gaW5kVChcclxuICAgICAgICBcIkV4cGVuc2VTaGVldHNfTGluZV9WYWxpZGF0aW9uX0Ftb3VudFF0eVwiLFxyXG4gICAgICAgIFwiUXVhbnRpdHkgYW5kIHByaWNlIG11c3QgYmUgZ3JlYXRlciB0aGFuIDAuXCJcclxuICAgICAgKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcih2YWxpZGF0aW9uTWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyh2YWxpZGF0aW9uTWVzc2FnZSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIW5vcm1hbGl6ZWREYXRlKSB7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgICAgIHNldFN0YXR1cyhFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKHBhcnNlZFR5cGVWYWx1ZSkgfHwgcGFyc2VkVHlwZVZhbHVlIDw9IDApIHtcbiAgICAgIG9uSW52YWxpZFR5cGU/LigpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGlzRm9yZWlnbkN1cnJlbmN5ID0gISFub3JtYWxpemVkQ3VycmVuY3lDb2RlICYmIG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUgIT09IG5vcm1hbGl6ZWRMb2NhbEN1cnJlbmN5Q29kZTtcbiAgICBjb25zdCBoYXNGb3JlaWduQ3VycmVuY3lTZXR0bGVtZW50ID1cbiAgICAgIChwYXJzZWRFeGNoYW5nZVJhdGUgIT0gbnVsbCAmJiBwYXJzZWRFeGNoYW5nZVJhdGUgPiAwKSB8fFxuICAgICAgKHBhcnNlZEFtb3VudE1TVCAhPSBudWxsICYmIHBhcnNlZEFtb3VudE1TVCA+IDApO1xuICAgIGlmIChpc0ZvcmVpZ25DdXJyZW5jeSAmJiAhaGFzRm9yZWlnbkN1cnJlbmN5U2V0dGxlbWVudCkge1xuICAgICAgY29uc3QgdmFsaWRhdGlvbk1lc3NhZ2UgPSBpbmRUKFxuICAgICAgICBcIkV4cGVuc2VTaGVldHNfTGluZV9WYWxpZGF0aW9uX0ZvcmVpZ25DdXJyZW5jeVNldHRsZW1lbnRcIixcbiAgICAgICAgXCJGb3JlaWduIGN1cnJlbmN5IGxpbmVzIHJlcXVpcmUgYW4gZXhjaGFuZ2UgcmF0ZSBncmVhdGVyIHRoYW4gMCBvciBhIHJlaW1idXJzZW1lbnQgYW1vdW50LlwiXG4gICAgICApO1xuICAgICAgc2V0TW9kYWxFcnJvcih2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICBzZXRTdGF0dXModmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xuICAgICAgc3RhcnRTdGF0dXM6IGlzQ3JlYXRlTW9kZVxyXG4gICAgICAgID8gaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfQ3JlYXRpbmdcIiwgXCJDcmVhdGluZyBleHBlbnNlIGxpbmUuLi5cIilcclxuICAgICAgICA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgZXhwZW5zZSBsaW5lLi4uXCIpLFxyXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKSxcclxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBjb21tb25MaW5lUGF5bG9hZCA9IHtcclxuICAgICAgICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplZERhdGUsXHJcbiAgICAgICAgICB0eXBlVmFsdWU6IHBhcnNlZFR5cGVWYWx1ZSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoZHJhZnREZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXHJcbiAgICAgICAgICBpbnRlcm5hY2lvbmFsOiBwYXJzZWRJbnRlcm5hdGlvbmFsID8/IGxpbmU/LmludGVybmFjaW9uYWwgPz8gZmFsc2UsXHJcbiAgICAgICAgICB0aWNrZXQ6IGxpbmU/LnRpY2tldCA9PT0gdHJ1ZSxcclxuICAgICAgICAgIHF0eTogTnVtYmVyKHBhcnNlZFF0eSksXHJcbiAgICAgICAgICBwcmljZTogTnVtYmVyKHBhcnNlZFByaWNlKSxcbiAgICAgICAgICBwcm9qSWQ6IFN0cmluZyhkcmFmdFByb2plY3RJZCB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgIGN1cnJlbmN5Q29kZTogbm9ybWFsaXplZEN1cnJlbmN5Q29kZSB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgYW1vdW50TVNUOiBwYXJzZWRBbW91bnRNU1QsXG4gICAgICAgICAgZXhjaFJhdGU6IHBhcnNlZEV4Y2hhbmdlUmF0ZSAhPSBudWxsICYmIHBhcnNlZEV4Y2hhbmdlUmF0ZSA+IDAgPyBwYXJzZWRFeGNoYW5nZVJhdGUgOiBudWxsLFxuICAgICAgICAgIGluZEF0dGFjaEZpbGVzOiBzYWZlVGV4dChsaW5lPy5pbmRBdHRhY2hGaWxlcyksXG4gICAgICAgIH07XG5cclxuICAgICAgICBjb25zdCBjcmVhdGVMaW5lUGF5bG9hZDogRXhwZW5zZVNoZWV0Q3JlYXRlTGluZVJlcXVlc3QgPSBjb21tb25MaW5lUGF5bG9hZDtcclxuICAgICAgICBjb25zdCB1cGRhdGVMaW5lUGF5bG9hZDogRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlcXVlc3QgPSBjb21tb25MaW5lUGF5bG9hZDtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBpc0NyZWF0ZU1vZGVcclxuICAgICAgICAgID8gYXdhaXQgY3JlYXRlRXhwZW5zZVNoZWV0KHtcclxuICAgICAgICAgICAgICBtb2RlOiAyLFxyXG4gICAgICAgICAgICAgIGV4aXN0aW5nSG9qYUdhc3Rvc0lkOiBzaGVldElkLFxyXG4gICAgICAgICAgICAgIGxpbmVzOiBbY3JlYXRlTGluZVBheWxvYWRdLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgOiBhd2FpdCB1cGRhdGVFeHBlbnNlU2hlZXRMaW5lKHNoZWV0SWQsIGxpbmVJZCwgdXBkYXRlTGluZVBheWxvYWQpO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfQ3JlYXRlZFwiLCBcIkV4cGVuc2UgbGluZSBjcmVhdGVkXCIpKTtcclxuICAgICAgICAgIG9uQ3JlYXRlU3VjY2VzcygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2UgbGluZSB1cGRhdGVkXCIpKTtcclxuICAgICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICB9LCBbXHJcbiAgICBidXN5LFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICAgIGNhbkVkaXRFeHBlbnNlLFxyXG4gICAgZHJhZnRQcmljZSxcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdEludGVybmF0aW9uYWwsXG4gICAgZHJhZnRBbW91bnRNU1QsXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgZHJhZnRRdHksXG4gICAgZHJhZnRUcmFuc0RhdGUsXG4gICAgZHJhZnRUeXBlVmFsdWVDb2RlLFxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzRWRpdExvY2tlZCxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGxpbmUsXG4gICAgbGluZUlkLFxuICAgIGxvY2FsQ3VycmVuY3lDb2RlLFxuICAgIG9uQ3JlYXRlU3VjY2VzcyxcbiAgICBvbkludmFsaWRBbW91bnRRdHksXHJcbiAgICBvbkludmFsaWRUeXBlLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzaGVldElkLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKGlzRGVsZXRlTG9ja2VkKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWNhbkRlbGV0ZUV4cGVuc2UpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGV4cGVuc2UgbGluZS4uLlwiKSxcclxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIiksXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldEJ1c3ksXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2FmZUxpbmtlZFRpY2tldEZpbGVJZCA9IHNhZmVUZXh0KGxpbmtlZFRpY2tldEZpbGVJZCk7XHJcbiAgICAgICAgaWYgKHNhZmVMaW5rZWRUaWNrZXRGaWxlSWQpIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUZpbGVSZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldEZpbGUoc2FmZUxpbmtlZFRpY2tldEZpbGVJZCk7XHJcbiAgICAgICAgICAgIGlmICghZGVsZXRlRmlsZVJlc3BvbnNlLlN1Y2Nlc3MgJiYgIWlzTWlzc2luZ1RpY2tldEZpbGVNZXNzYWdlKGRlbGV0ZUZpbGVSZXNwb25zZS5NZXNzYWdlKSkge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihkZWxldGVGaWxlUmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBpZiAoIWlzTm90Rm91bmRFcnJvcihlcnJvcikpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZVRpY2tldFJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0KHNhZmVMaW5rZWRUaWNrZXRGaWxlSWQpO1xyXG4gICAgICAgICAgICBpZiAoIWRlbGV0ZVRpY2tldFJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGVsZXRlVGlja2V0UmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBpZiAoIWlzTm90Rm91bmRFcnJvcihlcnJvcikpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRMaW5lKHNoZWV0SWQsIGxpbmVJZCk7XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9EZWxldGVkXCIsIFwiRXhwZW5zZSBsaW5lIGRlbGV0ZWRcIikpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICB9LCBbXHJcbiAgICBidXN5LFxyXG4gICAgY2FuRGVsZXRlRXhwZW5zZSxcclxuICAgIGlzRGVsZXRlTG9ja2VkLFxyXG4gICAgbGluZUlkLFxyXG4gICAgbGlua2VkVGlja2V0RmlsZUlkLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzaGVldElkLFxyXG4gIF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zIH0gZnJvbSBcIi4uL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbE9wZW46IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcclxuICBpc0xvY2tlZDogYm9vbGVhbjtcclxuICBhY3Rpb25Nb2RlPzogXCJkZWZhdWx0XCIgfCBcImRlbGV0ZV9vbmx5XCIgfCBcInZpZXdfb25seVwiO1xyXG4gIHBlcm1pc3Npb25zUmVhZHk/OiBib29sZWFuO1xyXG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGNhbk9wZW5TYXZlQ29uZmlybT86ICgpID0+IGJvb2xlYW47XHJcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBvblNhdmVTdWNjZXNzOiAoKSA9PiB2b2lkO1xyXG4gIG9wZW5Db25maXJtOiAob3B0czoge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xyXG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcclxuICB9KSA9PiB2b2lkO1xyXG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIENvb3JkaW5hdGVzIHRvcGJhciBpY29uIHN0YXRlIGFuZCBkaXNwYXRjaCBhY3Rpb25zIGZvciBleHBlbnNlIHNoZWV0IGxpbmUgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgbW9kYWxPcGVuLFxyXG4gIGlzRWRpdGluZyxcclxuICBpc0NyZWF0ZU1vZGUsXHJcbiAgaXNMb2NrZWQsXHJcbiAgYWN0aW9uTW9kZSA9IFwiZGVmYXVsdFwiLFxyXG4gIHBlcm1pc3Npb25zUmVhZHkgPSB0cnVlLFxyXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXHJcbiAgY2FuRWRpdEV4cGVuc2UsXHJcbiAgY2FuRGVsZXRlRXhwZW5zZSxcclxuICBzaGVldElkLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICBoYW5kbGVVcGRhdGUsXHJcbiAgaGFuZGxlRGVsZXRlLFxyXG4gIG9uU2F2ZVN1Y2Nlc3MsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcclxuICB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMoe1xyXG4gICAgYWN0aW9uR3JvdXBJZDogXCJleHBlbnNlLWxpbmUtZGV0YWlsLWFjdGlvbnNcIixcclxuICAgIGlkczoge1xyXG4gICAgICBlZGl0SWNvbklkOiBcImV4cGVuc2VMaW5lRWRpdEljb25cIixcclxuICAgICAgc2F2ZUljb25JZDogXCJleHBlbnNlTGluZVNhdmVJY29uXCIsXHJcbiAgICAgIGRlbGV0ZUJ0bklkOiBcImV4cGVuc2VMaW5lRGVsZXRlQnRuXCIsXHJcbiAgICAgIGNhbmNlbEJ0bklkOiBcImV4cGVuc2VMaW5lQ2FuY2VsQnRuXCIsXHJcbiAgICB9LFxyXG4gICAgZXZlbnRzOiB7XHJcbiAgICAgIGVkaXRFdmVudDogXCJleHBlbnNlLWxpbmUtZGV0YWlsLWVkaXRcIixcclxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS1saW5lLWRldGFpbC1kZWxldGVcIixcclxuICAgICAgY2FuY2VsRXZlbnQ6IFwiZXhwZW5zZS1saW5lLWRldGFpbC1jYW5jZWwtZWRpdFwiLFxyXG4gICAgfSxcclxuICAgIGJ1c3ksXHJcbiAgICBtb2RhbE9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0xvY2tlZCxcclxuICAgIGFjdGlvbk1vZGUsXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5LFxyXG4gICAgY2FuQ3JlYXRlOiBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gICAgY2FuRWRpdDogY2FuRWRpdEV4cGVuc2UsXHJcbiAgICBjYW5EZWxldGU6IGNhbkRlbGV0ZUV4cGVuc2UsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgICBoYW5kbGVTYXZlOiBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBzYXZlQ29uZmlybVRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJTYXZlIGNoYW5nZXNcIiksXHJcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gc2F2ZSBjaGFuZ2VzP1wiKSxcclxuICAgIHNhdmVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1UaXRsZTogaW5kVChcIkNvbmZpcm1fRGVsZXRlX1RpdGxlXCIsIFwiRGVsZXRlXCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgaXRlbT9cIiksXHJcbiAgICBkZWxldGVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIiksXHJcbiAgICBvblNhdmVTdWNjZXNzLFxyXG4gICAgb25EZWxldGVTdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCl9YCk7XHJcbiAgICB9LFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsQ29uZmlybURpYWxvZ0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbEVycm9yOiBzdHJpbmc7XHJcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxufTtcclxuXHJcbi8vIEtlZXBzIGxpbmUgZGV0YWlsIGNvbmZpcm0gZGlhbG9nIHdpcmluZyBvdXRzaWRlIHRoZSBwYWdlIGNvbXBvbmVudC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxDb25maXJtRGlhbG9nID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsRXJyb3IsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBzZXRTdGF0dXMsXHJcbn06IFVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxDb25maXJtRGlhbG9nQXJncykgPT4ge1xyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xyXG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcclxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm0sIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1c10pO1xyXG5cclxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcclxuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XHJcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcclxuICAgIDogIWJ1c3kgJiYgbW9kYWxFcnJvclxyXG4gICAgICA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKVxyXG4gICAgICA6IG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZvaWQgaGFuZGxlTW9kYWxDb25maXJtKCk7XHJcbiAgfSwgW2J1c3ksIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtLCBtb2RhbEVycm9yXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBtb2RhbCxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gICAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICAgIG1vZGFsQ2FuY2VsVGV4dCxcclxuICAgIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRIZWFkZXIsIEV4cGVuc2VTaGVldExpbmUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsLCBnZXRGdWVsUHJpY2VLbSwgbWFwRXhwZW5zZVNoZWV0SGVhZGVyLCBtYXBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHtcclxuICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXHJcbiAgbmF2aWdhdGVUb0V4cGVuc2VVcmwsXHJcbiAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHsgaGFzQXNzaWduZWRWb3VjaGVyLCBwYXJzZUV4cGVuc2VEYXRlLCBzYWZlVGV4dCwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UsIHRvRXhwZW5zZUFwaURkTW1ZeXl5IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZUV4cGVuc2VTaGVldERldGFpbFBvbGljeSB9IGZyb20gXCIuLi9kZXRhaWwvZXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5LnRzXCI7XHJcbmltcG9ydCB7IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU1hbmFnZWRVc2VyU2NvcGUudHNcIjtcclxuXHJcbmNvbnN0IEtNX0dBU1RPX1RZUEVfQ09ERSA9IFwiM1wiO1xyXG5jb25zdCBGVUVMX1BSSUNFX0RFQk9VTkNFX01TID0gMzAwO1xyXG5jb25zdCBGVUVMX1BSSUNFX1NPVVJDRV9VU0VSX0NPTkZJRyA9IFwiQ1JNSG9qYUdhc3Rvc1VzZXJQcmljZUttRmVjaGFUYWJsZVwiO1xyXG5jb25zdCBGVUVMX1BSSUNFX1NPVVJDRV9HTE9CQUxfQ09ORklHID0gXCJDUk1QYXJhbWV0ZXJzXCI7XHJcbmNvbnN0IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkVEID0gMjtcclxuY29uc3QgRVhQRU5TRV9TVEFUVVNfUEFJRCA9IDQ7XHJcblxyXG5jb25zdCB0b0lucHV0RGF0ZSA9IChyYXc/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcclxuICByZXR1cm4gcGFyc2VkID8gdG9Jc29EYXRlKHBhcnNlZCkgOiBcIlwiO1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0RWRpdGFibGVOdW1iZXIgPSAodmFsdWU6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIodmFsdWUsIHtcclxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgZmFsbGJhY2s6IFwiXCIsXHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXRFZGl0YWJsZVF1YW50aXR5ID0gKHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcih2YWx1ZSwge1xuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICBmYWxsYmFjazogXCJcIixcclxuICB9KTtcbn07XG5cbmNvbnN0IGZvcm1hdEVkaXRhYmxlRXhjaGFuZ2VSYXRlID0gKHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcih2YWx1ZSwge1xuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogNyxcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDcsXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgZmFsbGJhY2s6IFwiXCIsXG4gIH0pO1xufTtcblxuY29uc3Qgbm9ybWFsaXplRnVlbFRyYW5zRGF0ZSA9IChyYXc6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIHJldHVybiB0b0V4cGVuc2VBcGlEZE1tWXl5eShyYXcpO1xufTtcblxyXG4vLyBSZXNvbHZlcyBsb2NhbGl6ZWQgZnVlbCBwcmljZSBzb3VyY2UgbWVzc2FnZXMgZm9yIGtub3duIGJhY2tlbmQgc291cmNlcy5cclxuY29uc3QgcmVzb2x2ZUZ1ZWxQcmljZVNvdXJjZU1lc3NhZ2UgPSAoc291cmNlOiBzdHJpbmcsIGVmZmVjdGl2ZURhdGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFNvdXJjZSA9IHNhZmVUZXh0KHNvdXJjZSk7XHJcbiAgaWYgKG5vcm1hbGl6ZWRTb3VyY2UgPT09IEZVRUxfUFJJQ0VfU09VUkNFX1VTRVJfQ09ORklHKSB7XHJcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfRnVlbFByaWNlX1NvdXJjZV9Vc2VyQ29uZmlnXCIsIFwiT2J0YWluZWQgYnkgdXNlciBjb25maWd1cmF0aW9uLlwiKTtcclxuICB9XHJcblxyXG4gIGlmIChub3JtYWxpemVkU291cmNlID09PSBGVUVMX1BSSUNFX1NPVVJDRV9HTE9CQUxfQ09ORklHKSB7XHJcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfRnVlbFByaWNlX1NvdXJjZV9HbG9iYWxDb25maWdcIiwgXCJPYnRhaW5lZCBieSBnbG9iYWwgY29uZmlndXJhdGlvbi5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzb3VyY2VMYWJlbCA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX0Z1ZWxQcmljZV9Tb3VyY2VcIiwgXCJGdWVsIHByaWNlIHNvdXJjZVwiKTtcclxuICBpZiAoIW5vcm1hbGl6ZWRTb3VyY2UpIHtcclxuICAgIHJldHVybiBlZmZlY3RpdmVEYXRlID8gYCR7c291cmNlTGFiZWx9OiAke2VmZmVjdGl2ZURhdGV9YCA6IHNvdXJjZUxhYmVsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGVmZmVjdGl2ZURhdGVcclxuICAgID8gYCR7c291cmNlTGFiZWx9OiAke25vcm1hbGl6ZWRTb3VyY2V9ICgke2VmZmVjdGl2ZURhdGV9KWBcclxuICAgIDogYCR7c291cmNlTGFiZWx9OiAke25vcm1hbGl6ZWRTb3VyY2V9YDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkQ3JlYXRlTGluZURyYWZ0ID0gKGJhc2VEYXRlOiBzdHJpbmcsIHByb2plY3RJZDogc3RyaW5nLCBjdXJyZW5jeUNvZGU6IHN0cmluZyk6IEV4cGVuc2VTaGVldExpbmUgPT4ge1xuICByZXR1cm4ge1xuICAgIGxpbmVSZWNJZDogXCJcIixcbiAgICB0cmFuc0RhdGU6IGJhc2VEYXRlLFxuICAgIHR5cGVWYWx1ZTogXCJcIixcclxuICAgIHR5cGVWYWx1ZUNvZGU6IFwiXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJcIixcclxuICAgIGludGVybmFjaW9uYWw6IGZhbHNlLFxyXG4gICAgdGlja2V0OiBmYWxzZSxcclxuICAgIHByaWNlOiBudWxsLFxyXG4gICAgcXR5OiAxLFxuICAgIGFtb3VudDogbnVsbCxcbiAgICBwcm9qSWQ6IHByb2plY3RJZCxcbiAgICBjdXJyZW5jeUNvZGUsXG4gICAgYW1vdW50TVNUOiBudWxsLFxuICAgIGV4Y2hSYXRlOiAxMDAsXG4gICAgaW5kQXR0YWNoRmlsZXM6IFwiXCIsXG4gIH07XG59O1xuXHJcbnR5cGUgVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFN0YXRlQXJncyA9IHtcclxuICBoYXNBY2Nlc3M6IGJvb2xlYW47XHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcclxuICBjYW5NYW5hZ2VPdGhlclVzZXJzOiBib29sZWFuO1xyXG4gIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nO1xyXG4gIGN1cnJlbnRDcm1Vc2VySWQ6IHN0cmluZztcclxuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQ6IHN0cmluZztcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgbGluZUlkOiBzdHJpbmc7XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIHN0YXJ0SW5FZGl0TW9kZTogYm9vbGVhbjtcclxuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIE93bnMgc3RhdGUgYW5kIGJlaGF2aW9yIGZvciBleHBlbnNlIGxpbmUgZGV0YWlsIHBhZ2UgKHJlYWQsIGVkaXQsIGNyZWF0ZSkuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGUgPSAoe1xyXG4gIGhhc0FjY2VzcyxcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgY3VycmVudEF4VXNlcklkLFxyXG4gIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gIHNoZWV0SWQsXHJcbiAgbGluZUlkLFxyXG4gIGlzQ3JlYXRlTW9kZSxcclxuICBzdGFydEluRWRpdE1vZGUsXHJcbiAgb25Gb3JiaWRkZW4sXHJcbn06IFVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZUFyZ3MpID0+IHtcclxuICBjb25zdCBbaGVhZGVyLCBzZXRIZWFkZXJdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0SGVhZGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2xpbmUsIHNldExpbmVdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0TGluZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2lzRWRpdGluZywgc2V0SXNFZGl0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbW9kYWxFcnJvciwgc2V0TW9kYWxFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnREZXNjcmlwdGlvbiwgc2V0RHJhZnREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRUcmFuc0RhdGUsIHNldERyYWZ0VHJhbnNEYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdFR5cGVWYWx1ZUNvZGUsIHNldERyYWZ0VHlwZVZhbHVlQ29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRQcmljZSwgc2V0RHJhZnRQcmljZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRRdHksIHNldERyYWZ0UXR5XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRQcm9qZWN0SWQsIHNldERyYWZ0UHJvamVjdElkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRJbnRlcm5hdGlvbmFsLCBzZXREcmFmdEludGVybmF0aW9uYWxdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdEN1cnJlbmN5Q29kZSwgc2V0RHJhZnRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdEFtb3VudE1TVCwgc2V0RHJhZnRBbW91bnRNU1RdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdEV4Y2hhbmdlUmF0ZSwgc2V0RHJhZnRFeGNoYW5nZVJhdGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtpc0Z1ZWxQcmljZUxvYWRpbmcsIHNldElzRnVlbFByaWNlTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtmdWVsUHJpY2VNZXNzYWdlLCBzZXRGdWVsUHJpY2VNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtmdWVsUHJpY2VNZXNzYWdlSXNFcnJvciwgc2V0RnVlbFByaWNlTWVzc2FnZUlzRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICBjb25zdCBoeWRyYXRlRHJhZnRGcm9tTGluZSA9IHVzZUNhbGxiYWNrKChuZXh0TGluZTogRXhwZW5zZVNoZWV0TGluZSB8IG51bGwsIG5leHRIZWFkZXI6IEV4cGVuc2VTaGVldEhlYWRlciB8IG51bGwpID0+IHtcbiAgICBjb25zdCBpc0V4aXN0aW5nTGluZSA9ICEhc2FmZVRleHQobmV4dExpbmU/LmxpbmVSZWNJZCk7XG4gICAgY29uc3Qgbm9ybWFsaXplZExpbmVQcm9qZWN0SWQgPSBzYWZlVGV4dChuZXh0TGluZT8ucHJvaklkKTtcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uKHNhZmVUZXh0KG5leHRMaW5lPy5kZXNjcmlwdGlvbikpO1xuICAgIHNldERyYWZ0VHJhbnNEYXRlKHRvSW5wdXREYXRlKG5leHRMaW5lPy50cmFuc0RhdGUgfHwgbmV4dEhlYWRlcj8uY3JlYXRlZERhdGUpKTtcbiAgICBzZXREcmFmdFR5cGVWYWx1ZUNvZGUoc2FmZVRleHQobmV4dExpbmU/LnR5cGVWYWx1ZUNvZGUpKTtcbiAgICBzZXREcmFmdFByaWNlKGZvcm1hdEVkaXRhYmxlTnVtYmVyKG5leHRMaW5lPy5wcmljZSkpO1xuICAgIHNldERyYWZ0UXR5KGZvcm1hdEVkaXRhYmxlUXVhbnRpdHkobmV4dExpbmU/LnF0eSkpO1xuICAgIHNldERyYWZ0UHJvamVjdElkKGlzRXhpc3RpbmdMaW5lID8gbm9ybWFsaXplZExpbmVQcm9qZWN0SWQgOiAobm9ybWFsaXplZExpbmVQcm9qZWN0SWQgfHwgc2FmZVRleHQobmV4dEhlYWRlcj8ucHJvaklkKSkpO1xuICAgIHNldERyYWZ0SW50ZXJuYXRpb25hbChuZXh0TGluZT8uaW50ZXJuYWNpb25hbCA9PT0gdHJ1ZSA/IFwidHJ1ZVwiIDogbmV4dExpbmU/LmludGVybmFjaW9uYWwgPT09IGZhbHNlID8gXCJmYWxzZVwiIDogXCJcIik7XG4gICAgY29uc3QgbG9jYWxDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChuZXh0SGVhZGVyPy5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCkgfHwgXCJFVVJcIjtcbiAgICBjb25zdCBsaW5lQ3VycmVuY3lDb2RlID0gc2FmZVRleHQobmV4dExpbmU/LmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSB8fCBsb2NhbEN1cnJlbmN5Q29kZTtcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZShsaW5lQ3VycmVuY3lDb2RlKTtcbiAgICBzZXREcmFmdEFtb3VudE1TVChmb3JtYXRFZGl0YWJsZU51bWJlcihuZXh0TGluZT8uYW1vdW50TVNUKSk7XG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUoZm9ybWF0RWRpdGFibGVFeGNoYW5nZVJhdGUobmV4dExpbmU/LmV4Y2hSYXRlID8/IChsaW5lQ3VycmVuY3lDb2RlID09PSBsb2NhbEN1cnJlbmN5Q29kZSA/IDEwMCA6IG51bGwpKSk7XG4gIH0sIFtdKTtcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBsb2FkRGV0YWlsID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBpZiAoIWhhc0FjY2Vzcykge1xyXG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXNoZWV0SWQpIHtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IGxpbmUgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwoc2hlZXRJZCwge1xyXG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlPy5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGxpbmUgZGV0YWlsLlwiKSk7XHJcbiAgICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IHNoZWV0cyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XHJcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZFNoZWV0ID1cclxuICAgICAgICAgICAgc2hlZXRzLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uSG9qYUdhc3Rvc0lkKS50b1VwcGVyQ2FzZSgpID09PSBzaGVldElkLnRyaW0oKS50b1VwcGVyQ2FzZSgpKSB8fCBzaGVldHNbMF07XHJcblxyXG4gICAgICAgICAgaWYgKCFzZWxlY3RlZFNoZWV0KSB7XHJcbiAgICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgbGluZSB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IGxvYWRlZEhlYWRlciA9IG1hcEV4cGVuc2VTaGVldEhlYWRlcihzZWxlY3RlZFNoZWV0KTtcclxuICAgICAgICAgIGNvbnN0IGxvYWRlZFN0YXR1c0NvZGUgPSB0eXBlb2YgbG9hZGVkSGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IGxvYWRlZEhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgOiBudWxsO1xyXG4gICAgICAgICAgY29uc3QgaXNDcmVhdGVMb2NrZWRTdGF0dXMgPSBsb2FkZWRTdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRCB8fCBsb2FkZWRTdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19QQUlEO1xyXG4gICAgICAgICAgY29uc3QgaXNNYW5hZ2luZ090aGVyVXNlciA9IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQoe1xyXG4gICAgICAgICAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgICAgICAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICAgICAgICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgICAgICAgcmVjb3JkT3duZXJVc2VySWQ6IGxvYWRlZEhlYWRlci51c2VySWQsXHJcbiAgICAgICAgICAgIGlzQ3JlYXRlTW9kZTogZmFsc2UsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNvbnN0IGxvYWRlZFBvbGljeSA9IHJlc29sdmVFeHBlbnNlU2hlZXREZXRhaWxQb2xpY3koe1xyXG4gICAgICAgICAgICBzdGF0dXNDb2RlOiBsb2FkZWRTdGF0dXNDb2RlLFxyXG4gICAgICAgICAgICBpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgICAgICAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgICAgICAgICBpc1BhaWQ6IGlzQ3JlYXRlTG9ja2VkU3RhdHVzIHx8IGhhc0Fzc2lnbmVkVm91Y2hlcihsb2FkZWRIZWFkZXIudm91Y2hlciksXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmIChpc0NyZWF0ZUxvY2tlZFN0YXR1cyB8fCBoYXNBc3NpZ25lZFZvdWNoZXIobG9hZGVkSGVhZGVyLnZvdWNoZXIpKSB7XHJcbiAgICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUGFpZFJlYWRPbmx5XCIsIFwiUGFpZCBleHBlbnNlIHNoZWV0cyBhcmUgcmVhZC1vbmx5LlwiKSk7XHJcbiAgICAgICAgICAgIHNldEhlYWRlcihsb2FkZWRIZWFkZXIpO1xyXG4gICAgICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAobG9hZGVkUG9saWN5LmludGVyYWN0aW9uTW9kZSAhPT0gXCJmdWxsX2VkaXRcIikge1xyXG4gICAgICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgZHJhZnRMaW5lID0gYnVpbGRDcmVhdGVMaW5lRHJhZnQoXG4gICAgICAgICAgICB0b0lzb0RhdGUobmV3IERhdGUoKSksXG4gICAgICAgICAgICBzYWZlVGV4dChsb2FkZWRIZWFkZXIucHJvaklkKSxcbiAgICAgICAgICAgIHNhZmVUZXh0KGxvYWRlZEhlYWRlci5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCkgfHwgXCJFVVJcIlxuICAgICAgICAgICk7XG4gICAgICAgICAgc2V0SGVhZGVyKGxvYWRlZEhlYWRlcik7XHJcbiAgICAgICAgICBzZXRMaW5lKGRyYWZ0TGluZSk7XHJcbiAgICAgICAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XHJcbiAgICAgICAgICBoeWRyYXRlRHJhZnRGcm9tTGluZShkcmFmdExpbmUsIGxvYWRlZEhlYWRlcik7XHJcbiAgICAgICAgICBzZXRTdGF0dXMoXCJcIik7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWxpbmVJZCkge1xyXG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCBsaW5lIHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKHNoZWV0SWQsIHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgbGluZSBkZXRhaWwuXCIpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzaGVldHMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkU2hlZXQgPVxyXG4gICAgICAgICAgc2hlZXRzLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uSG9qYUdhc3Rvc0lkKS50b1VwcGVyQ2FzZSgpID09PSBzaGVldElkLnRyaW0oKS50b1VwcGVyQ2FzZSgpKSB8fCBzaGVldHNbMF07XHJcblxyXG4gICAgICAgIGlmICghc2VsZWN0ZWRTaGVldCkge1xyXG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCBsaW5lIHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtYXBwZWRIZWFkZXIgPSBtYXBFeHBlbnNlU2hlZXRIZWFkZXIoc2VsZWN0ZWRTaGVldCk7XHJcbiAgICAgICAgY29uc3QgbWFwcGVkTGluZXMgPSAoQXJyYXkuaXNBcnJheShzZWxlY3RlZFNoZWV0LkxpbmVzKSA/IHNlbGVjdGVkU2hlZXQuTGluZXMgOiBbXSkubWFwKChlbnRyeSkgPT5cclxuICAgICAgICAgIG1hcEV4cGVuc2VTaGVldExpbmUoZW50cnkpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZExpbmUgPVxyXG4gICAgICAgICAgbWFwcGVkTGluZXMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5LmxpbmVSZWNJZCkudG9VcHBlckNhc2UoKSA9PT0gbGluZUlkLnRyaW0oKS50b1VwcGVyQ2FzZSgpKSB8fCBudWxsO1xyXG5cclxuICAgICAgICBpZiAoIXNlbGVjdGVkTGluZSkge1xyXG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCBsaW5lIHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihtYXBwZWRIZWFkZXIpO1xyXG4gICAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEhlYWRlcihtYXBwZWRIZWFkZXIpO1xyXG4gICAgICAgIHNldExpbmUoc2VsZWN0ZWRMaW5lKTtcclxuICAgICAgICBjb25zdCBsb2FkZWRTdGF0dXNDb2RlID0gdHlwZW9mIG1hcHBlZEhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgPT09IFwibnVtYmVyXCIgPyBtYXBwZWRIZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzIDogbnVsbDtcclxuICAgICAgICBjb25zdCBsb2FkZWRJc1NoZWV0QXBwcm92ZWQgPSBsb2FkZWRTdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRDtcclxuICAgICAgICBjb25zdCBsb2FkZWRJc1NoZWV0UGFpZEJ5U3RhdHVzID0gbG9hZGVkU3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfUEFJRDtcclxuICAgICAgICBjb25zdCBsb2FkZWRJc1NoZWV0UGFpZCA9IGxvYWRlZElzU2hlZXRQYWlkQnlTdGF0dXMgfHwgaGFzQXNzaWduZWRWb3VjaGVyKG1hcHBlZEhlYWRlci52b3VjaGVyKTtcclxuICAgICAgICBjb25zdCBsb2FkZWRIYXNMaW5rZWRUaWNrZXQgPSAhIXNhZmVUZXh0KHNlbGVjdGVkTGluZS5maWxlSWQpO1xyXG4gICAgICAgIGNvbnN0IGxvYWRlZElzTWFuYWdpbmdPdGhlclVzZXIgPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkKHtcclxuICAgICAgICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICAgICAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICAgICAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgICAgICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgICAgICAgcmVjb3JkT3duZXJVc2VySWQ6IG1hcHBlZEhlYWRlci51c2VySWQsXHJcbiAgICAgICAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgbG9hZGVkUG9saWN5ID0gcmVzb2x2ZUV4cGVuc2VTaGVldERldGFpbFBvbGljeSh7XHJcbiAgICAgICAgICBzdGF0dXNDb2RlOiBsb2FkZWRTdGF0dXNDb2RlLFxyXG4gICAgICAgICAgaXNNYW5hZ2luZ090aGVyVXNlcjogbG9hZGVkSXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgICAgICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICAgICAgICBpc1BhaWQ6IGxvYWRlZElzU2hlZXRQYWlkLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBzdGFydEluRWRpdE1vZGUgJiZcclxuICAgICAgICAgICFsb2FkZWRJc1NoZWV0QXBwcm92ZWQgJiZcclxuICAgICAgICAgICFsb2FkZWRJc1NoZWV0UGFpZCAmJlxyXG4gICAgICAgICAgIWxvYWRlZEhhc0xpbmtlZFRpY2tldCAmJlxyXG4gICAgICAgICAgIWxvYWRlZElzTWFuYWdpbmdPdGhlclVzZXIgJiZcclxuICAgICAgICAgIGxvYWRlZFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgPT09IFwiZnVsbF9lZGl0XCJcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHNldElzRWRpdGluZyh0cnVlKTtcclxuICAgICAgICAgIGh5ZHJhdGVEcmFmdEZyb21MaW5lKHNlbGVjdGVkTGluZSwgbWFwcGVkSGVhZGVyKTtcclxuICAgICAgICAgIHNldFN0YXR1cyhcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGxpbmUgZGV0YWlsLlwiKSk7XHJcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2b2lkIGxvYWREZXRhaWwoKTtcclxuICB9LCBbXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBoeWRyYXRlRHJhZnRGcm9tTGluZSxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIHN0YXJ0SW5FZGl0TW9kZSxcclxuICAgIGxpbmVJZCxcclxuICAgIG9uRm9yYmlkZGVuLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgc2hlZXRJZCxcclxuICBdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghbGluZSB8fCBpc0VkaXRpbmcpIHJldHVybjtcclxuICAgIGh5ZHJhdGVEcmFmdEZyb21MaW5lKGxpbmUsIGhlYWRlcik7XHJcbiAgfSwgW2hlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUxpbmUsIGlzRWRpdGluZywgbGluZV0pO1xyXG5cclxuICBjb25zdCBub3JtYWxpemVkRHJhZnRUeXBlVmFsdWVDb2RlID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChkcmFmdFR5cGVWYWx1ZUNvZGUpLCBbZHJhZnRUeXBlVmFsdWVDb2RlXSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEZ1ZWxUcmFuc0RhdGUgPSB1c2VNZW1vKCgpID0+IG5vcm1hbGl6ZUZ1ZWxUcmFuc0RhdGUoZHJhZnRUcmFuc0RhdGUpLCBbZHJhZnRUcmFuc0RhdGVdKTtcclxuICBjb25zdCBpc0ttVHlwZSA9IG5vcm1hbGl6ZWREcmFmdFR5cGVWYWx1ZUNvZGUgPT09IEtNX0dBU1RPX1RZUEVfQ09ERTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgbGV0IHRpbWVyOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGwgPSBudWxsO1xyXG4gICAgbGV0IGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlciB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0IGNsZWFyUGVuZGluZyA9ICgpID0+IHtcclxuICAgICAgaWYgKHRpbWVyKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgICAgICB0aW1lciA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbnRyb2xsZXIpIHtcclxuICAgICAgICBjb250cm9sbGVyLmFib3J0KCk7XHJcbiAgICAgICAgY29udHJvbGxlciA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKCFpc0VkaXRpbmcgfHwgIWlzS21UeXBlKSB7XHJcbiAgICAgIHNldElzRnVlbFByaWNlTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICBjbGVhclBlbmRpbmcoKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIW5vcm1hbGl6ZWRGdWVsVHJhbnNEYXRlKSB7XHJcbiAgICAgIHNldElzRnVlbFByaWNlTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2UoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNsZWFyUGVuZGluZygpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRpbWVyID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcbiAgICAgIHNldElzRnVlbFByaWNlTG9hZGluZyh0cnVlKTtcclxuICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldEZ1ZWxQcmljZUttKG5vcm1hbGl6ZWRGdWVsVHJhbnNEYXRlLCB7XHJcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MgfHwgIXJlc3BvbnNlLkRhdGEgfHwgIU51bWJlci5pc0Zpbml0ZShOdW1iZXIocmVzcG9uc2UuRGF0YS5QcmljZUttKSkpIHtcclxuICAgICAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2UoXHJcbiAgICAgICAgICAgIHNhZmVUZXh0KHJlc3BvbnNlLk1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0Z1ZWxQcmljZV9Ob3RGb3VuZFwiLCBcIkNvdWxkIG5vdCBsb2FkIGZ1ZWwgcHJpY2UgZm9yIGttLlwiKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRQcmljZSA9IE51bWJlcihyZXNwb25zZS5EYXRhLlByaWNlS20pO1xyXG4gICAgICAgIGlmIChyZXNvbHZlZFByaWNlID4gMCkge1xyXG4gICAgICAgICAgc2V0RHJhZnRQcmljZShmb3JtYXRFZGl0YWJsZU51bWJlcihyZXNvbHZlZFByaWNlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzb3VyY2UgPSBzYWZlVGV4dChyZXNwb25zZS5EYXRhLlNvdXJjZSk7XHJcbiAgICAgICAgY29uc3QgZWZmZWN0aXZlRGF0ZSA9IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGEuVHJhbnNEYXRlKSB8fCBub3JtYWxpemVkRnVlbFRyYW5zRGF0ZTtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gcmVzb2x2ZUZ1ZWxQcmljZVNvdXJjZU1lc3NhZ2Uoc291cmNlLCBlZmZlY3RpdmVEYXRlKTtcclxuICAgICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcclxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHJldHVybjtcclxuXHJcbiAgICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZShcclxuICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3JcclxuICAgICAgICAgICAgPyBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfRnVlbFByaWNlX05vdEZvdW5kXCIsIFwiQ291bGQgbm90IGxvYWQgZnVlbCBwcmljZSBmb3Iga20uXCIpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlSXNFcnJvcih0cnVlKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBpZiAoIWlzQ2FuY2VsbGVkKSB7XHJcbiAgICAgICAgICBzZXRJc0Z1ZWxQcmljZUxvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgRlVFTF9QUklDRV9ERUJPVU5DRV9NUyk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaXNDYW5jZWxsZWQgPSB0cnVlO1xyXG4gICAgICBjbGVhclBlbmRpbmcoKTtcclxuICAgIH07XHJcbiAgfSwgW2lzRWRpdGluZywgaXNLbVR5cGUsIG5vcm1hbGl6ZWRGdWVsVHJhbnNEYXRlXSk7XHJcblxyXG4gIGNvbnN0IGhhc0FjdGl2ZVByb2Nlc3MgPSB1c2VNZW1vKCgpID0+IGJ1c3kgfHwgaXNFZGl0aW5nLCBbYnVzeSwgaXNFZGl0aW5nXSk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoaGFzQWN0aXZlUHJvY2Vzcyk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcclxuICAgIH07XHJcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcclxuXHJcbiAgY29uc3Qgc3RhdHVzQ29kZSA9IHR5cGVvZiBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgOiBudWxsO1xyXG4gIGNvbnN0IGlzU2hlZXRBcHByb3ZlZCA9IHN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkVEO1xyXG4gIGNvbnN0IGlzU2hlZXRQYWlkQnlTdGF0dXMgPSBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19QQUlEO1xyXG4gIGNvbnN0IGlzU2hlZXRQYWlkQnlWb3VjaGVyID0gaGFzQXNzaWduZWRWb3VjaGVyKGhlYWRlcj8udm91Y2hlcik7XHJcbiAgY29uc3QgaXNTaGVldFBhaWQgPSBpc1NoZWV0UGFpZEJ5U3RhdHVzIHx8IGlzU2hlZXRQYWlkQnlWb3VjaGVyO1xyXG4gIGNvbnN0IGlzTWFuYWdpbmdPdGhlclVzZXIgPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkKHtcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgcmVjb3JkT3duZXJVc2VySWQ6IGhlYWRlcj8udXNlcklkLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gIH0pO1xyXG4gIGNvbnN0IGRldGFpbFBvbGljeSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgaWYgKCFoZWFkZXIpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpbnRlcmFjdGlvbk1vZGU6IFwicmVhZF9vbmx5XCIgYXMgY29uc3QsXHJcbiAgICAgICAgc2hvd0ZhYjogZmFsc2UsXHJcbiAgICAgICAgY2FuRGVsZXRlU2hlZXQ6IGZhbHNlLFxyXG4gICAgICAgIHN0YXR1c0FjdGlvbnM6IFtdLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXNvbHZlRXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5KHtcclxuICAgICAgc3RhdHVzQ29kZSxcclxuICAgICAgaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgICAgaXNQYWlkOiBpc1NoZWV0UGFpZCxcclxuICAgIH0pO1xyXG4gIH0sIFthbGxvd1NlbGZNYW5hZ2VtZW50LCBoZWFkZXIsIGlzTWFuYWdpbmdPdGhlclVzZXIsIGlzU2hlZXRQYWlkLCBzdGF0dXNDb2RlXSk7XHJcbiAgY29uc3QgY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyA9IGRldGFpbFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgPT09IFwiZnVsbF9lZGl0XCI7XHJcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZUN1cnJlbnQgPSBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzO1xyXG4gIGNvbnN0IGNhbkVkaXRFeHBlbnNlQ3VycmVudCA9IGNhblVzZUZ1bGxFZGl0RmVhdHVyZXM7XHJcbiAgY29uc3QgY2FuRGVsZXRlRXhwZW5zZUN1cnJlbnQgPSBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzO1xyXG4gIGNvbnN0IGlzU2hlZXRMb2NrZWQgPSAhY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyB8fCBpc1NoZWV0QXBwcm92ZWQgfHwgaXNTaGVldFBhaWQ7XHJcbiAgY29uc3QgbGlua2VkVGlja2V0RmlsZUlkID0gc2FmZVRleHQobGluZT8uZmlsZUlkKTtcclxuICBjb25zdCBoYXNMaW5rZWRUaWNrZXQgPSAhaXNDcmVhdGVNb2RlICYmICEhbGlua2VkVGlja2V0RmlsZUlkO1xyXG4gIGNvbnN0IGlzTGluZUVkaXRMb2NrZWQgPSBpc1NoZWV0TG9ja2VkIHx8IGhhc0xpbmtlZFRpY2tldDtcclxuICBjb25zdCBpc0xpbmVEZWxldGVMb2NrZWQgPSBpc1NoZWV0TG9ja2VkO1xyXG4gIGNvbnN0IGlzTGluZUxvY2tlZCA9IGlzTGluZUVkaXRMb2NrZWQ7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlIHx8IGlzTG9hZGluZyB8fCAhaGVhZGVyIHx8ICFsaW5lIHx8IGlzTGluZUVkaXRMb2NrZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY2FuRWRpdEV4cGVuc2VDdXJyZW50KSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xyXG4gICAgaHlkcmF0ZURyYWZ0RnJvbUxpbmUobGluZSwgaGVhZGVyKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIikpO1xyXG4gIH0sIFtjYW5FZGl0RXhwZW5zZUN1cnJlbnQsIGhlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUxpbmUsIGlzQ3JlYXRlTW9kZSwgaXNMaW5lRWRpdExvY2tlZCwgaXNMb2FkaW5nLCBsaW5lLCBvbkZvcmJpZGRlbl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzaGVldElkKX1gO1xyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwsIHtcclxuICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc0VkaXRpbmcpIHJldHVybjtcclxuXHJcbiAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGh5ZHJhdGVEcmFmdEZyb21MaW5lKGxpbmUsIGhlYWRlcik7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xyXG4gIH0sIFtoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21MaW5lLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgbGluZSwgc2hlZXRJZF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlTW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZUN1cnJlbnQgfHwgIXNoZWV0SWQgfHwgaXNTaGVldExvY2tlZCkge1xyXG4gICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0TGluZURldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCl9Jm1vZGU9Y3JlYXRlYDtcclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xyXG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcclxuICAgIH0pO1xyXG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlQ3VycmVudCwgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIGlzU2hlZXRMb2NrZWQsIG9uRm9yYmlkZGVuLCBzaGVldElkXSk7XHJcblxyXG4gIGNvbnN0IG5hdmlnYXRlVG9TaGVldERldGFpbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQoc2hlZXRJZCk7XHJcbiAgICBpZiAoIXNhZmVTaGVldElkKSByZXR1cm47XHJcbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVTaGVldElkKX1gO1xyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsKTtcclxuICB9LCBbc2hlZXRJZF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGVhZGVyLFxyXG4gICAgbGluZSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGJ1c3ksXHJcbiAgICBzdGF0dXMsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtb2RhbEVycm9yLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0VHJhbnNEYXRlLFxyXG4gICAgZHJhZnRUeXBlVmFsdWVDb2RlLFxyXG4gICAgZHJhZnRQcmljZSxcclxuICAgIGRyYWZ0UXR5LFxuICAgIGRyYWZ0UHJvamVjdElkLFxuICAgIGRyYWZ0SW50ZXJuYXRpb25hbCxcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBkcmFmdEFtb3VudE1TVCxcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgICBpc0ttVHlwZSxcbiAgICBpc0Z1ZWxQcmljZUxvYWRpbmcsXHJcbiAgICBmdWVsUHJpY2VNZXNzYWdlLFxyXG4gICAgZnVlbFByaWNlTWVzc2FnZUlzRXJyb3IsXHJcbiAgICBpc1NoZWV0UGFpZCxcclxuICAgIGlzU2hlZXRMb2NrZWQsXHJcbiAgICBpc0xpbmVFZGl0TG9ja2VkLFxyXG4gICAgaXNMaW5lRGVsZXRlTG9ja2VkLFxyXG4gICAgaXNMaW5lTG9ja2VkLFxyXG4gICAgaGFzTGlua2VkVGlja2V0LFxyXG4gICAgbGlua2VkVGlja2V0RmlsZUlkLFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZUN1cnJlbnQsXHJcbiAgICBjYW5FZGl0RXhwZW5zZUN1cnJlbnQsXHJcbiAgICBjYW5EZWxldGVFeHBlbnNlQ3VycmVudCxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgIHNldERyYWZ0VHJhbnNEYXRlLFxyXG4gICAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlLFxyXG4gICAgc2V0RHJhZnRQcmljZSxcclxuICAgIHNldERyYWZ0UXR5LFxuICAgIHNldERyYWZ0UHJvamVjdElkLFxuICAgIHNldERyYWZ0SW50ZXJuYXRpb25hbCxcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBzZXREcmFmdEFtb3VudE1TVCxcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICAgIGhhbmRsZU9wZW5DcmVhdGVNb2RlLFxyXG4gICAgbmF2aWdhdGVUb1NoZWV0RGV0YWlsLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IG1hcEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfSBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGhhc0V4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdTb3VyY2UgfSBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvZXhwZW5zZVRpY2tldFByZXZpZXdVdGlscy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3IH0gZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVNoZWV0TGluZVRpY2tldFByZXZpZXdBcmdzID0ge1xyXG4gIGxpbmtlZFRpY2tldEZpbGVJZDogc3RyaW5nO1xyXG4gIGhhc0xpbmtlZFRpY2tldDogYm9vbGVhbjtcclxufTtcclxuXHJcbi8vIFBpY2tzIHRoZSBsaW5rZWQgdGlja2V0IGRldGFpbCBpdGVtIG5lZWRlZCB0byByZW5kZXIgdGhlIGV4aXN0aW5nIHByZXZpZXcgc2FmZWx5IGZyb20gdGhlIGxpbmUgcGFnZS5cclxuY29uc3QgcmVzb2x2ZUxpbmtlZFRpY2tldFByZXZpZXdNZXRhZGF0YSA9IChpdGVtczogdW5rbm93bltdLCBsaW5rZWRUaWNrZXRGaWxlSWQ6IHN0cmluZykgPT4ge1xyXG4gIGNvbnN0IHNhZmVMaW5rZWRUaWNrZXRGaWxlSWQgPSBzYWZlVGV4dChsaW5rZWRUaWNrZXRGaWxlSWQpO1xyXG4gIGlmICghc2FmZUxpbmtlZFRpY2tldEZpbGVJZCB8fCAhQXJyYXkuaXNBcnJheShpdGVtcykgfHwgaXRlbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBmaWxlTmFtZTogXCJcIixcclxuICAgICAgc291cmNlVXJsOiBcIlwiLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNlbGVjdGVkSXRlbSA9XHJcbiAgICBpdGVtcy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoKGVudHJ5IGFzIHsgRmlsZUlkPzogdW5rbm93biB9KT8uRmlsZUlkKS50b1VwcGVyQ2FzZSgpID09PSBzYWZlTGlua2VkVGlja2V0RmlsZUlkLnRvVXBwZXJDYXNlKCkpIHx8XHJcbiAgICBpdGVtc1swXTtcclxuICBpZiAoIXNlbGVjdGVkSXRlbSB8fCB0eXBlb2Ygc2VsZWN0ZWRJdGVtICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBmaWxlTmFtZTogXCJcIixcclxuICAgICAgc291cmNlVXJsOiBcIlwiLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG1hcHBlZEhlYWRlciA9IG1hcEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIoc2VsZWN0ZWRJdGVtIGFzIFBhcmFtZXRlcnM8dHlwZW9mIG1hcEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXI+WzBdKTtcclxuICByZXR1cm4ge1xyXG4gICAgZmlsZU5hbWU6IHNhZmVUZXh0KG1hcHBlZEhlYWRlci5maWxlTmFtZSksXHJcbiAgICBzb3VyY2VVcmw6IHNhZmVUZXh0KG1hcHBlZEhlYWRlci51cmxGaWxlKSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gTG9hZHMgbGlua2VkIHRpY2tldCBwcmV2aWV3IG1ldGFkYXRhIHdpdGhvdXQgY2hhbmdpbmcgdGhlIGV4aXN0aW5nIHNoZWV0LWxpbmUgZGV0YWlsIGNvbnRyYWN0LlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0TGluZVRpY2tldFByZXZpZXcgPSAoe1xyXG4gIGxpbmtlZFRpY2tldEZpbGVJZCxcclxuICBoYXNMaW5rZWRUaWNrZXQsXHJcbn06IFVzZUV4cGVuc2VTaGVldExpbmVUaWNrZXRQcmV2aWV3QXJncykgPT4ge1xyXG4gIGNvbnN0IFtwcmV2aWV3U291cmNlVXJsLCBzZXRQcmV2aWV3U291cmNlVXJsXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtwcmV2aWV3RmlsZU5hbWUsIHNldFByZXZpZXdGaWxlTmFtZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaGFzTGlua2VkVGlja2V0IHx8ICFzYWZlVGV4dChsaW5rZWRUaWNrZXRGaWxlSWQpKSB7XHJcbiAgICAgIHNldFByZXZpZXdTb3VyY2VVcmwoXCJcIik7XHJcbiAgICAgIHNldFByZXZpZXdGaWxlTmFtZShcIlwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjYW5jZWxsZWQgPSBmYWxzZTtcclxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcblxyXG4gICAgY29uc3QgbG9hZFRpY2tldFByZXZpZXdNZXRhZGF0YSA9IGFzeW5jICgpID0+IHtcclxuICAgICAgc2V0UHJldmlld1NvdXJjZVVybChcIlwiKTtcclxuICAgICAgc2V0UHJldmlld0ZpbGVOYW1lKFwiXCIpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0KGxpbmtlZFRpY2tldEZpbGVJZCwge1xyXG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY2FuY2VsbGVkKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtZXRhZGF0YSA9IHJlc29sdmVMaW5rZWRUaWNrZXRQcmV2aWV3TWV0YWRhdGEocmVzcG9uc2U/Lkl0ZW1zIHx8IFtdLCBsaW5rZWRUaWNrZXRGaWxlSWQpO1xyXG4gICAgICAgIHNldFByZXZpZXdTb3VyY2VVcmwobWV0YWRhdGEuc291cmNlVXJsKTtcclxuICAgICAgICBzZXRQcmV2aWV3RmlsZU5hbWUobWV0YWRhdGEuZmlsZU5hbWUpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChjYW5jZWxsZWQgfHwgKGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2b2lkIGxvYWRUaWNrZXRQcmV2aWV3TWV0YWRhdGEoKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjYW5jZWxsZWQgPSB0cnVlO1xyXG4gICAgICBjb250cm9sbGVyLmFib3J0KCk7XHJcbiAgICB9O1xyXG4gIH0sIFtoYXNMaW5rZWRUaWNrZXQsIGxpbmtlZFRpY2tldEZpbGVJZF0pO1xyXG5cclxuICBjb25zdCBzaG93U3RpY2t5UHJldmlldyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBoYXNMaW5rZWRUaWNrZXQgJiYgaGFzRXhwZW5zZVRpY2tldEltYWdlUHJldmlld1NvdXJjZShwcmV2aWV3U291cmNlVXJsKSxcclxuICAgIFtoYXNMaW5rZWRUaWNrZXQsIHByZXZpZXdTb3VyY2VVcmxdXHJcbiAgKTtcclxuICBjb25zdCBwcmV2aWV3QWx0VGV4dCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBzYWZlVGV4dChwcmV2aWV3RmlsZU5hbWUpIHx8IGluZFQoXCJUaWNrZXRzX0ZpZWxkX0ZpbGVJZFwiLCBcIlRpY2tldFwiKSxcclxuICAgIFtwcmV2aWV3RmlsZU5hbWVdXHJcbiAgKTtcclxuICBjb25zdCBwcmV2aWV3ID0gdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldyh7XHJcbiAgICBmaWxlSWQ6IGxpbmtlZFRpY2tldEZpbGVJZCxcclxuICAgIHNvdXJjZVVybDogcHJldmlld1NvdXJjZVVybCxcclxuICAgIGVuYWJsZWQ6IHNob3dTdGlja3lQcmV2aWV3LFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc2hvd1N0aWNreVByZXZpZXcsXHJcbiAgICBwcmV2aWV3RmlsZU5hbWUsXHJcbiAgICBwcmV2aWV3QWx0VGV4dCxcclxuICAgIC4uLnByZXZpZXcsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBSZWZPYmplY3QsIFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWwgZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL0V4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWwudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0U3RpY2t5UHJldmlldyBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvRXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXcudHN4XCI7XHJcbmltcG9ydCB0eXBlIHsgVGlja2V0UHJldmlld1BvaW50IH0gZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVNoZWV0TGluZURldGFpbFZpZXdQcm9wcyA9IHtcclxuICBtb2RhbDoge1xyXG4gICAgb3BlbjogYm9vbGVhbjtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBjb25maXJtVGV4dDogc3RyaW5nO1xyXG4gICAgY2FuY2VsVGV4dDogc3RyaW5nO1xyXG4gICAgbG9hZGluZ1RleHQ6IHN0cmluZztcclxuICAgIHNob3dDYW5jZWw6IGJvb2xlYW47XHJcbiAgICBzaG93Q29uZmlybTogYm9vbGVhbjtcclxuICAgIGJ1c3k6IGJvb2xlYW47XHJcbiAgICBlcnJvcjogc3RyaW5nO1xyXG4gICAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbiAgICBvbkNhbmNlbDogKCkgPT4gdm9pZDtcclxuICB9O1xyXG4gIHByZXZpZXc6IHtcclxuICAgIG9wZW46IGJvb2xlYW47XHJcbiAgICBidXN5OiBib29sZWFuO1xyXG4gICAgZXJyb3I6IHN0cmluZztcclxuICAgIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICBpbWFnZUFsdDogc3RyaW5nO1xyXG4gICAgZmlsZU5hbWU6IHN0cmluZztcclxuICAgIHNjYWxlOiBudW1iZXI7XHJcbiAgICB0cmFuc2xhdGU6IFRpY2tldFByZXZpZXdQb2ludDtcclxuICAgIHN1cmZhY2VSZWY6IFJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gICAgc2hvd1N0aWNreVByZXZpZXc6IGJvb2xlYW47XHJcbiAgICBvbk9wZW46ICgpID0+IHZvaWQ7XHJcbiAgICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xyXG4gICAgb25Qb2ludGVyRG93bjogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gICAgb25Qb2ludGVyTW92ZTogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gICAgb25Qb2ludGVyRW5kOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgICBvbldoZWVsOiAoZXZlbnQ6IFJlYWN0LldoZWVsRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIH07XHJcbiAgY29udGVudDoge1xyXG4gICAgaXNMb2FkaW5nOiBib29sZWFuO1xyXG4gICAgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlOiBib29sZWFuO1xyXG4gICAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBkZXRhaWxCb2R5OiBSZWFjdE5vZGU7XHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFJlbmRlcnMgdGhlIGxpbmUgZGV0YWlsIHNoZWxsIHdoaWxlIHRoZSBwYWdlIGNvbnRhaW5lciBrZWVwcyBvd25lcnNoaXAgb2Ygb3JjaGVzdHJhdGlvbiBhbmQgbXV0YXRpb25zLlxyXG5jb25zdCBFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVmlldyA9ICh7IG1vZGFsLCBwcmV2aWV3LCBjb250ZW50IH06IEV4cGVuc2VTaGVldExpbmVEZXRhaWxWaWV3UHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cclxuICAgICAgPENvbmZpcm1Nb2RhbFxyXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XHJcbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxyXG4gICAgICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XHJcbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsLmNvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsLmNhbmNlbFRleHR9XHJcbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsLmxvYWRpbmdUZXh0fVxyXG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XHJcbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxyXG4gICAgICAgIGJ1c3k9e21vZGFsLmJ1c3l9XHJcbiAgICAgICAgZXJyb3I9e21vZGFsLmVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17bW9kYWwuc3RhdHVzfVxyXG4gICAgICAgIG9uQ29uZmlybT17bW9kYWwub25Db25maXJtfVxyXG4gICAgICAgIG9uQ2FuY2VsPXttb2RhbC5vbkNhbmNlbH1cclxuICAgICAgLz5cclxuICAgICAgPEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWxcclxuICAgICAgICBvcGVuPXtwcmV2aWV3Lm9wZW59XHJcbiAgICAgICAgYnVzeT17cHJldmlldy5idXN5fVxyXG4gICAgICAgIGVycm9yPXtwcmV2aWV3LmVycm9yfVxyXG4gICAgICAgIGltYWdlVXJsPXtwcmV2aWV3LmltYWdlVXJsfVxyXG4gICAgICAgIGltYWdlQWx0PXtwcmV2aWV3LmltYWdlQWx0fVxyXG4gICAgICAgIHNjYWxlPXtwcmV2aWV3LnNjYWxlfVxyXG4gICAgICAgIHRyYW5zbGF0ZT17cHJldmlldy50cmFuc2xhdGV9XHJcbiAgICAgICAgc3VyZmFjZVJlZj17cHJldmlldy5zdXJmYWNlUmVmfVxyXG4gICAgICAgIG9uQ2xvc2U9e3ByZXZpZXcub25DbG9zZX1cclxuICAgICAgICBvblBvaW50ZXJEb3duPXtwcmV2aWV3Lm9uUG9pbnRlckRvd259XHJcbiAgICAgICAgb25Qb2ludGVyTW92ZT17cHJldmlldy5vblBvaW50ZXJNb3ZlfVxyXG4gICAgICAgIG9uUG9pbnRlckVuZD17cHJldmlldy5vblBvaW50ZXJFbmR9XHJcbiAgICAgICAgb25XaGVlbD17cHJldmlldy5vbldoZWVsfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXHJcbiAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogY29udGVudC5pc0xvYWRpbmcgfHwgY29udGVudC5pc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XHJcbiAgICAgID5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxyXG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge2NvbnRlbnQuZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntjb250ZW50LmVycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxyXG5cclxuICAgICAge2NvbnRlbnQuZGV0YWlsQm9keSA/IChcclxuICAgICAgICBwcmV2aWV3LnNob3dTdGlja3lQcmV2aWV3ID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgbGc6Z3JpZCBsZzpncmlkLWNvbHMtW21pbm1heCgwLDFmcilfMzIwcHhdIGxnOmdhcC00IGxnOnNwYWNlLXktMFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zdGFydC0yXCI+XHJcbiAgICAgICAgICAgICAgPEV4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3XHJcbiAgICAgICAgICAgICAgICBidXN5PXtwcmV2aWV3LmJ1c3l9XHJcbiAgICAgICAgICAgICAgICBlcnJvcj17cHJldmlldy5lcnJvcn1cclxuICAgICAgICAgICAgICAgIGltYWdlVXJsPXtwcmV2aWV3LmltYWdlVXJsfVxyXG4gICAgICAgICAgICAgICAgaW1hZ2VBbHQ9e3ByZXZpZXcuaW1hZ2VBbHR9XHJcbiAgICAgICAgICAgICAgICBmaWxlTmFtZT17cHJldmlldy5maWxlTmFtZX1cclxuICAgICAgICAgICAgICAgIG9uT3Blbj17cHJldmlldy5vbk9wZW59XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIGxnOmNvbC1zdGFydC0xIGxnOnJvdy1zdGFydC0xXCI+e2NvbnRlbnQuZGV0YWlsQm9keX08L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICBjb250ZW50LmRldGFpbEJvZHlcclxuICAgICAgICApXHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldExpbmVEZXRhaWxWaWV3O1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgcGFyc2VEZWNpbWFsSW5wdXQgfSBmcm9tIFwiLi4vaG9va3MvZXhwZW5zZU11dGF0aW9uVXRpbHMudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVNoZWV0TGluZVR5cGVWYWxpZGF0aW9uQXJncyA9IHtcclxuICBkcmFmdFR5cGVWYWx1ZUNvZGU6IHN0cmluZztcclxuICBkcmFmdFByaWNlOiBzdHJpbmc7XHJcbiAgZHJhZnRRdHk6IHN0cmluZztcclxuICBzZXREcmFmdFR5cGVWYWx1ZUNvZGU6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldERyYWZ0UHJpY2U6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldERyYWZ0UXR5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxufTtcclxuXHJcbi8vIEtlZXBzIGxpbmUgc2F2ZSB2YWxpZGF0aW9uIGxvY2FsIHNvIHNhdmUgZmxvdyBjYW4gYmxvY2sgYmVmb3JlIG9wZW5pbmcgdGhlIG1vZGFsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0TGluZVR5cGVWYWxpZGF0aW9uID0gKHtcclxuICBkcmFmdFR5cGVWYWx1ZUNvZGUsXHJcbiAgZHJhZnRQcmljZSxcclxuICBkcmFmdFF0eSxcclxuICBzZXREcmFmdFR5cGVWYWx1ZUNvZGUsXHJcbiAgc2V0RHJhZnRQcmljZSxcclxuICBzZXREcmFmdFF0eSxcclxufTogVXNlRXhwZW5zZVNoZWV0TGluZVR5cGVWYWxpZGF0aW9uQXJncykgPT4ge1xyXG4gIGNvbnN0IFt0eXBlSW52YWxpZCwgc2V0VHlwZUludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtwcmljZUludmFsaWQsIHNldFByaWNlSW52YWxpZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3F0eUludmFsaWQsIHNldFF0eUludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHR5cGVJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcHJpY2VJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcXR5SW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG5cclxuICBjb25zdCBmb2N1c1R5cGVGaWVsZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFR5cGVJbnZhbGlkKHRydWUpO1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgIHR5cGVJbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xyXG4gICAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBmb2N1c0Ftb3VudEZpZWxkcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHBhcnNlZFF0eSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0UXR5KTtcclxuICAgIGNvbnN0IHBhcnNlZFByaWNlID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRQcmljZSk7XHJcbiAgICBjb25zdCBxdHlJc1ZhbGlkID0gcGFyc2VkUXR5ICE9IG51bGwgJiYgcGFyc2VkUXR5ID4gMDtcclxuICAgIGNvbnN0IHByaWNlSXNWYWxpZCA9IHBhcnNlZFByaWNlICE9IG51bGwgJiYgcGFyc2VkUHJpY2UgPiAwO1xyXG5cclxuICAgIHNldFF0eUludmFsaWQoIXF0eUlzVmFsaWQpO1xyXG4gICAgc2V0UHJpY2VJbnZhbGlkKCFwcmljZUlzVmFsaWQpO1xyXG5cclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICBpZiAoIXF0eUlzVmFsaWQpIHtcclxuICAgICAgICBxdHlJbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFwcmljZUlzVmFsaWQpIHtcclxuICAgICAgICBwcmljZUlucHV0UmVmLmN1cnJlbnQ/LmZvY3VzKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sIFtkcmFmdFByaWNlLCBkcmFmdFF0eV0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVEcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2UgPSB1c2VDYWxsYmFjayhcclxuICAgICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHNldFR5cGVJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlKHZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBbc2V0RHJhZnRUeXBlVmFsdWVDb2RlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURyYWZ0UHJpY2VDaGFuZ2UgPSB1c2VDYWxsYmFjayhcclxuICAgICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHNldFByaWNlSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIHNldERyYWZ0UHJpY2UodmFsdWUpO1xyXG4gICAgfSxcclxuICAgIFtzZXREcmFmdFByaWNlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURyYWZ0UXR5Q2hhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICBzZXRRdHlJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgc2V0RHJhZnRRdHkodmFsdWUpO1xyXG4gICAgfSxcclxuICAgIFtzZXREcmFmdFF0eV1cclxuICApO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgcGFyc2VkUHJpY2UgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFByaWNlKTtcclxuICAgIGlmIChwYXJzZWRQcmljZSAhPSBudWxsICYmIHBhcnNlZFByaWNlID4gMCkge1xyXG4gICAgICBzZXRQcmljZUludmFsaWQoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtkcmFmdFByaWNlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBwYXJzZWRRdHkgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFF0eSk7XHJcbiAgICBpZiAocGFyc2VkUXR5ICE9IG51bGwgJiYgcGFyc2VkUXR5ID4gMCkge1xyXG4gICAgICBzZXRRdHlJbnZhbGlkKGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbZHJhZnRRdHldKTtcclxuXHJcbiAgY29uc3QgY2FuT3BlblNhdmVDb25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgcGFyc2VkVHlwZVZhbHVlID0gTnVtYmVyLnBhcnNlSW50KFN0cmluZyhkcmFmdFR5cGVWYWx1ZUNvZGUgfHwgXCJcIikudHJpbSgpLCAxMCk7XHJcbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZShwYXJzZWRUeXBlVmFsdWUpIHx8IHBhcnNlZFR5cGVWYWx1ZSA8PSAwKSB7XHJcbiAgICAgIGZvY3VzVHlwZUZpZWxkKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXJzZWRQcmljZSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0UHJpY2UpO1xyXG4gICAgY29uc3QgcGFyc2VkUXR5ID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRRdHkpO1xyXG4gICAgY29uc3QgaGFzVmFsaWRRdHlQcmljZSA9IHBhcnNlZFF0eSAhPSBudWxsICYmIHBhcnNlZFF0eSA+IDAgJiYgcGFyc2VkUHJpY2UgIT0gbnVsbCAmJiBwYXJzZWRQcmljZSA+IDA7XHJcbiAgICBpZiAoaGFzVmFsaWRRdHlQcmljZSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmb2N1c0Ftb3VudEZpZWxkcygpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sIFtkcmFmdFByaWNlLCBkcmFmdFF0eSwgZHJhZnRUeXBlVmFsdWVDb2RlLCBmb2N1c0Ftb3VudEZpZWxkcywgZm9jdXNUeXBlRmllbGRdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGVJbnZhbGlkLFxyXG4gICAgcHJpY2VJbnZhbGlkLFxyXG4gICAgcXR5SW52YWxpZCxcclxuICAgIHR5cGVJbnB1dFJlZixcclxuICAgIHByaWNlSW5wdXRSZWYsXHJcbiAgICBxdHlJbnB1dFJlZixcclxuICAgIGZvY3VzVHlwZUZpZWxkLFxyXG4gICAgZm9jdXNBbW91bnRGaWVsZHMsXHJcbiAgICBoYW5kbGVEcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2UsXHJcbiAgICBoYW5kbGVEcmFmdFByaWNlQ2hhbmdlLFxyXG4gICAgaGFuZGxlRHJhZnRRdHlDaGFuZ2UsXHJcbiAgICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgfTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUFpRTs7O0FDbUcvRDtBQXJDRixJQUFNLGlCQUFpQixDQUFDLFVBQTZDO0FBQ25FLFNBQU8sb0JBQW9CLE9BQU87QUFBQSxJQUNoQyx1QkFBdUI7QUFBQSxJQUN2Qix1QkFBdUI7QUFBQSxJQUN2QixhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUEsRUFDWixDQUFDO0FBQ0g7QUFpQkEsSUFBTSxpQ0FBaUMsQ0FBQztBQUFBLEVBQ3RDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxF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Q1QsZUFBZTtBQUFBLFFBQ2YsZUFBZTtBQUFBLFFBQ2YsY0FBYztBQUFBLFFBQ2QsU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBO0FBQUEsRUFDRjtBQUVKO0FBR0EsSUFBTSw2QkFBNkIsTUFBTTtBQUN2QyxTQUNFLDZDQUFDLGdDQUFxQix5QkFBdUIsTUFDM0MsdURBQUMsaUNBQThCLEdBQ2pDO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSwwQkFBMEI7QUFDakUsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQyw4QkFBMkIsQ0FBRTtBQUN6RDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8scUNBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgInJlc3BvbnNlIiwgInNoZWV0cyIsICJzZWxlY3RlZFNoZWV0IiwgImxvYWRlZFN0YXR1c0NvZGUiLCAiaXNNYW5hZ2luZ090aGVyVXNlciIsICJsb2FkZWRQb2xpY3kiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
