import {
  SingleDatePicker
} from "./chunks/chunk-JGC2WDK5.js";
import {
  mapBooleanEnumOptions,
  mapWindowEnumOptions
} from "./chunks/chunk-BVPBMOU4.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-TKX6UB7Q.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-LEL2B4QS.js";
import "./chunks/chunk-K7MECJ5E.js";
import {
  ExpenseProjectFilterInput_default,
  clearExpenseNavigationGuard,
  navigateToExpenseUrl,
  setExpenseNavigationGuard
} from "./chunks/chunk-65QINMTM.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-3H4F5G6V.js";
import {
  configureExpenseApiAuth,
  createExpenseSheet,
  deleteExpenseSheetLine,
  fetchExpenseSheetDetail,
  formatAmountWithCurrency,
  formatExpenseDisplayDate,
  formatExpenseInputNumber,
  formatExpenseNumber,
  getFuelPriceKm,
  hasAssignedVoucher,
  mapExpenseSheetHeader,
  mapExpenseSheetLine,
  parseExpenseDate,
  safeText,
  toIsoDate,
  updateExpenseSheetLine
} from "./chunks/chunk-BDACNERN.js";
import {
  SelectCombobox_default,
  VisitasPageProviders_default
} from "./chunks/chunk-DY5H5SRS.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  ApiFetchError,
  canAccess,
  indT,
  showPermissionModal
} from "./chunks/chunk-TAYDLPRE.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/gastos/line/ExpenseSheetLineDetailPage.tsx
var import_react3 = __toESM(require_react());

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
var ExpenseSheetLineForm = ({
  line,
  fallbackDate,
  sheetDescription,
  projectValue,
  priceText,
  amountText,
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
  onDraftDescriptionChange,
  onDraftTransDateChange,
  onDraftTypeValueCodeChange,
  onDraftPriceChange,
  onDraftQtyChange,
  onDraftProjectIdChange,
  onDraftInternationalChange
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "space-y-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ExpenseSectionDivider_default,
      {
        label: sheetDescription,
        className: "expense-section-divider--spaced",
        labelClassName: "expense-section-divider__label--title"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl", children: [
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
            placeholder: indT("ExpenseSheets_Field_Type", "Type"),
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
              className: isKmType ? "form-control ind-readonly-field" : "form-control",
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
              className: "form-control",
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Amount", "Amount"), value: amountText || "-" }),
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
  { value: true, text: indT("ExpenseSheets_International_Yes", "Si") },
  { value: false, text: indT("ExpenseSheets_International_No", "No") }
];
var getExpenseInternationalLabel = (value) => {
  if (value === true) {
    return indT("ExpenseSheets_International_Yes", "Si");
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
var import_react = __toESM(require_react());
var normalizeLineDate = (raw) => {
  const value = String(raw || "").trim();
  if (!value) return "";
  if (/^\d{8}$/.test(value)) {
    return value;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value.replace(/-/g, "");
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }
  const yyyy = parsed.getFullYear();
  const mm = String(parsed.getMonth() + 1).padStart(2, "0");
  const dd = String(parsed.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
};
var parseNumber = (raw) => parseDecimalInput(raw);
var useExpenseSheetLineDetailMutations = ({
  busy,
  isEditing,
  isCreateMode,
  isLocked,
  canCreateExpense,
  canEditExpense,
  canDeleteExpense,
  sheetId,
  lineId,
  line,
  draftDescription,
  draftTransDate,
  draftTypeValueCode,
  draftPrice,
  draftQty,
  draftProjectId,
  draftInternational,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing,
  onCreateSuccess
}) => {
  const handleUpdate = (0, import_react.useCallback)(async () => {
    if (busy || !isEditing) return false;
    if (isLocked) return false;
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
    const hasValidQtyPrice = parsedQty != null && parsedQty > 0 && parsedPrice != null && parsedPrice > 0;
    if (!hasValidQtyPrice) {
      const validationMessage = indT(
        "ExpenseSheets_Line_Validation_AmountQty",
        "Quantity and price must be greater than 0."
      );
      setModalError(validationMessage);
      setStatus(validationMessage);
      return false;
    }
    if (!normalizedDate || !Number.isFinite(parsedTypeValue) || parsedTypeValue <= 0) {
      const validationMessage = indT("Api_RequestFailed", "Request failed.");
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
    draftProjectId,
    draftQty,
    draftTransDate,
    draftTypeValueCode,
    isCreateMode,
    isLocked,
    isEditing,
    line,
    lineId,
    onCreateSuccess,
    setBusy,
    setIsEditing,
    setModalError,
    setStatus,
    sheetId
  ]);
  const handleDelete = (0, import_react.useCallback)(async () => {
    if (busy) return false;
    if (isLocked) return false;
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
        const response = await deleteExpenseSheetLine(sheetId, lineId);
        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
        }
        setStatus(indT("ExpenseSheets_Line_Detail_Deleted", "Expense line deleted"));
        return true;
      }
    });
    return result.ok;
  }, [busy, canDeleteExpense, isLocked, lineId, setBusy, setModalError, setStatus, sheetId]);
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
  canCreateExpense,
  canEditExpense,
  canDeleteExpense,
  sheetId,
  setModalError,
  handleEnableEdit,
  handleCancelEdit,
  handleUpdate,
  handleDelete,
  onSaveSuccess,
  openConfirm,
  closeConfirm
}) => {
  useExpenseTopbarCrudActions({
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
    canCreate: canCreateExpense,
    canEdit: canEditExpense,
    canDelete: canDeleteExpense,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
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

// Web/wwwroot/react/src/pages/gastos/line/useExpenseSheetLineDetailState.ts
var import_react2 = __toESM(require_react());
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
var normalizeFuelTransDate = (raw) => {
  const value = String(raw || "").trim();
  if (!value) return "";
  if (/^\d{8}$/.test(value)) {
    return value;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value.replace(/-/g, "");
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }
  const yyyy = parsed.getFullYear();
  const mm = String(parsed.getMonth() + 1).padStart(2, "0");
  const dd = String(parsed.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
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
var buildCreateLineDraft = (baseDate, projectId) => {
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
    indAttachFiles: ""
  };
};
var useExpenseSheetLineDetailState = ({
  hasAccess,
  canCreateExpense,
  canEditExpense,
  sheetId,
  lineId,
  isCreateMode,
  onForbidden
}) => {
  const [header, setHeader] = (0, import_react2.useState)(null);
  const [line, setLine] = (0, import_react2.useState)(null);
  const [isLoading, setIsLoading] = (0, import_react2.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react2.useState)("");
  const [busy, setBusy] = (0, import_react2.useState)(false);
  const [status, setStatus] = (0, import_react2.useState)("");
  const [isEditing, setIsEditing] = (0, import_react2.useState)(false);
  const [modalError, setModalError] = (0, import_react2.useState)("");
  const [draftDescription, setDraftDescription] = (0, import_react2.useState)("");
  const [draftTransDate, setDraftTransDate] = (0, import_react2.useState)("");
  const [draftTypeValueCode, setDraftTypeValueCode] = (0, import_react2.useState)("");
  const [draftPrice, setDraftPrice] = (0, import_react2.useState)("");
  const [draftQty, setDraftQty] = (0, import_react2.useState)("");
  const [draftProjectId, setDraftProjectId] = (0, import_react2.useState)("");
  const [draftInternational, setDraftInternational] = (0, import_react2.useState)("");
  const [isFuelPriceLoading, setIsFuelPriceLoading] = (0, import_react2.useState)(false);
  const [fuelPriceMessage, setFuelPriceMessage] = (0, import_react2.useState)("");
  const [fuelPriceMessageIsError, setFuelPriceMessageIsError] = (0, import_react2.useState)(false);
  const hydrateDraftFromLine = (0, import_react2.useCallback)((nextLine, nextHeader) => {
    setDraftDescription(safeText(nextLine?.description));
    setDraftTransDate(toInputDate(nextLine?.transDate || nextHeader?.createdDate));
    setDraftTypeValueCode(safeText(nextLine?.typeValueCode));
    setDraftPrice(formatEditableNumber(nextLine?.price));
    setDraftQty(formatEditableQuantity(nextLine?.qty));
    setDraftProjectId(safeText(nextLine?.projId || nextHeader?.projId));
    setDraftInternational(nextLine?.internacional === true ? "true" : nextLine?.internacional === false ? "false" : "");
  }, []);
  (0, import_react2.useEffect)(() => {
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
          if (!canCreateExpense) {
            onForbidden();
            return;
          }
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
          const loadedStatusCode = typeof loadedHeader.expenseSheetStatus === "number" ? loadedHeader.expenseSheetStatus : null;
          const isCreateLockedStatus = loadedStatusCode === EXPENSE_STATUS_APPROVED || loadedStatusCode === EXPENSE_STATUS_PAID;
          if (isCreateLockedStatus || hasAssignedVoucher(loadedHeader.voucher)) {
            setErrorMessage(indT("ExpenseSheets_Detail_PaidReadOnly", "Paid expense sheets are read-only."));
            setHeader(loadedHeader);
            setLine(null);
            setIsEditing(false);
            return;
          }
          const draftLine = buildCreateLineDraft(toIsoDate(/* @__PURE__ */ new Date()), safeText(loadedHeader.projId));
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
  }, [canCreateExpense, hasAccess, hydrateDraftFromLine, isCreateMode, lineId, onForbidden, sheetId]);
  (0, import_react2.useEffect)(() => {
    if (!line || isEditing) return;
    hydrateDraftFromLine(line, header);
  }, [header, hydrateDraftFromLine, isEditing, line]);
  const normalizedDraftTypeValueCode = (0, import_react2.useMemo)(() => safeText(draftTypeValueCode), [draftTypeValueCode]);
  const normalizedFuelTransDate = (0, import_react2.useMemo)(() => normalizeFuelTransDate(draftTransDate), [draftTransDate]);
  const isKmType = normalizedDraftTypeValueCode === KM_GASTO_TYPE_CODE;
  (0, import_react2.useEffect)(() => {
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
      setFuelPriceMessage(indT("Api_RequestFailed", "Request failed."));
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
  const hasActiveProcess = (0, import_react2.useMemo)(() => busy || isEditing, [busy, isEditing]);
  (0, import_react2.useEffect)(() => {
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
  const isSheetLocked = isSheetApproved || isSheetPaid;
  const handleEnableEdit = (0, import_react2.useCallback)(() => {
    if (isCreateMode || isLoading || !header || !line || isSheetLocked) {
      return;
    }
    if (!canEditExpense) {
      onForbidden();
      return;
    }
    setModalError("");
    setIsEditing(true);
    hydrateDraftFromLine(line, header);
    setStatus(indT("ExpenseSheets_Detail_EditingEnabled", "Editing enabled"));
  }, [canEditExpense, header, hydrateDraftFromLine, isCreateMode, isLoading, isSheetLocked, line, onForbidden]);
  const handleCancelEdit = (0, import_react2.useCallback)(() => {
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
  const handleOpenCreateMode = (0, import_react2.useCallback)(() => {
    if (!canCreateExpense || !sheetId || isSheetLocked) {
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
  }, [canCreateExpense, isCreateMode, isEditing, isSheetLocked, onForbidden, sheetId]);
  const navigateToSheetDetail = (0, import_react2.useCallback)(() => {
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
    isKmType,
    isFuelPriceLoading,
    fuelPriceMessage,
    fuelPriceMessageIsError,
    isSheetPaid,
    isSheetLocked,
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
    handleEnableEdit,
    handleCancelEdit,
    handleOpenCreateMode,
    navigateToSheetDetail
  };
};

// Web/wwwroot/react/src/pages/gastos/line/ExpenseSheetLineDetailPage.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var bootstrapExpenseApiAuth = () => {
  configureExpenseApiAuth({
    token: safeText(window.__IND_API_TOKEN__),
    entraOid: safeText(window.__IND_ENTRA_OID__),
    appCode: safeText(window.__IND_APP_CODE__)
  });
};
var ExpenseSheetLineDetailContent = () => {
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const canEditExpense = canAccess("GASTOS_HOJA_GASTO", "Edit");
  const canDeleteExpense = canAccess("GASTOS_HOJA_GASTO", "FullAccess");
  const canCreateExpense = canAccess("GASTOS_HOJA_GASTO", "Add");
  const sheetId = safeText(window.__EXPENSE_SHEET_ID__);
  const lineId = safeText(window.__EXPENSE_LINE_ID__);
  const lineMode = safeText(window.__EXPENSE_LINE_MODE__).toLowerCase();
  const isCreateMode = lineMode === "create";
  const [isRedirectingAfterCreate, setIsRedirectingAfterCreate] = (0, import_react3.useState)(false);
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
    isKmType,
    isFuelPriceLoading,
    fuelPriceMessage,
    fuelPriceMessageIsError,
    isSheetLocked,
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
    handleEnableEdit,
    handleCancelEdit,
    handleOpenCreateMode,
    navigateToSheetDetail
  } = useExpenseSheetLineDetailState({
    hasAccess,
    canCreateExpense,
    canEditExpense,
    sheetId,
    lineId,
    isCreateMode,
    onForbidden: showPermissionModal
  });
  const draftPriceValue = parseDecimalInput(draftPrice);
  const draftQtyValue = parseDecimalInput(draftQty);
  const calculatedAmountPreview = isEditing && draftPriceValue != null && draftPriceValue > 0 && draftQtyValue != null && draftQtyValue > 0 ? draftPriceValue * draftQtyValue : line?.amount ?? null;
  const priceText = (0, import_react3.useMemo)(
    () => formatAmountWithCurrency(line?.price ?? null, safeText(header?.currencyCode)),
    [header?.currencyCode, line?.price]
  );
  const amountText = (0, import_react3.useMemo)(
    () => formatAmountWithCurrency(calculatedAmountPreview),
    [calculatedAmountPreview]
  );
  const projectValue = safeText(line?.projId || header?.projId);
  const sheetDescription = safeText(header?.description) || "-";
  const internacionalLabel = getExpenseInternationalLabel(line?.internacional);
  const gastoTypeOptions = (0, import_react3.useMemo)(() => {
    const source = Array.isArray(window.__EXPENSE_GASTO_TYPES__) ? window.__EXPENSE_GASTO_TYPES__ : [];
    const mapped = mapWindowEnumOptions(source);
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
  const internationalOptions = (0, import_react3.useMemo)(
    () => mapBooleanEnumOptions(getExpenseInternationalOptions()),
    []
  );
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
    handleModalConfirm();
  }, [busy, closeConfirm, handleModalConfirm, modalError]);
  const { handleUpdate, handleDelete } = useExpenseSheetLineDetailMutations({
    busy,
    isEditing,
    isCreateMode,
    isLocked: isSheetLocked,
    canCreateExpense,
    canEditExpense,
    canDeleteExpense,
    sheetId,
    lineId,
    line,
    draftDescription,
    draftTransDate,
    draftTypeValueCode,
    draftPrice,
    draftQty,
    draftProjectId,
    draftInternational,
    setModalError,
    setBusy,
    setStatus,
    setIsEditing,
    onCreateSuccess: () => {
    }
  });
  useExpenseSheetLineDetailTopbarActions({
    busy: busy || isRedirectingAfterCreate,
    modalOpen: modal.open,
    isEditing,
    isCreateMode,
    isLocked: isSheetLocked,
    canCreateExpense,
    canEditExpense,
    canDeleteExpense,
    sheetId,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
    onSaveSuccess: () => {
      if (isCreateMode) {
        setIsRedirectingAfterCreate(true);
        navigateToSheetDetail();
        return;
      }
      window.location.reload();
    },
    openConfirm,
    closeConfirm
  });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
        onConfirm: handleModalButtonConfirm,
        onCancel: closeConfirm
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "div",
      {
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: isLoading || isRedirectingAfterCreate ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "text-danger", children: errorMessage }) : null,
    !isLoading && !isRedirectingAfterCreate && !errorMessage && line ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ExpenseSheetLineForm_default,
      {
        line,
        fallbackDate: safeText(header?.createdDate),
        sheetDescription,
        projectValue,
        priceText,
        amountText,
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
        onDraftDescriptionChange: setDraftDescription,
        onDraftTransDateChange: setDraftTransDate,
        onDraftTypeValueCodeChange: setDraftTypeValueCode,
        onDraftPriceChange: setDraftPrice,
        onDraftQtyChange: setDraftQty,
        onDraftProjectIdChange: setDraftProjectId,
        onDraftInternationalChange: setDraftInternational
      }
    ) : null,
    canCreateExpense && !isCreateMode && !isSheetLocked ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      FloatingActionButton_default,
      {
        route: "",
        ariaLabel: indT("Common_Create", "Create"),
        size: 76,
        right: 16,
        bottom: 24,
        onClick: handleOpenCreateMode
      }
    ) : null
  ] });
};
var ExpenseSheetLineDetailPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(VisitasPageProviders_default, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseSheetLineDetailContent, {}) });
};
var mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-line-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseSheetLineDetailPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseSheetLineDetailPage_default = ExpenseSheetLineDetailPage;
export {
  ExpenseSheetLineDetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL0V4cGVuc2VTaGVldExpbmVEZXRhaWxQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0TGluZUZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2ludGVybmF0aW9uYWxPcHRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGluZS91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGluZS91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpbmUvdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFN0YXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XG5pbXBvcnQgeyBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgfSBmcm9tIFwiLi4vZXhwZW5zZUZvcm1hdHRlcnMudHNcIjtcbmltcG9ydCBFeHBlbnNlU2hlZXRMaW5lRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlU2hlZXRMaW5lRm9ybS50c3hcIjtcbmltcG9ydCB7IGdldEV4cGVuc2VJbnRlcm5hdGlvbmFsTGFiZWwsIGdldEV4cGVuc2VJbnRlcm5hdGlvbmFsT3B0aW9ucyB9IGZyb20gXCIuLi9jb25zdGFudHMvaW50ZXJuYXRpb25hbE9wdGlvbnMudHNcIjtcbmltcG9ydCB7IHBhcnNlRGVjaW1hbElucHV0IH0gZnJvbSBcIi4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHtcbiAgbWFwQm9vbGVhbkVudW1PcHRpb25zLFxuICBtYXBXaW5kb3dFbnVtT3B0aW9ucyxcbiAgdHlwZSBFeHBlbnNlU2VsZWN0T3B0aW9uLFxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxNdXRhdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGUudHNcIjtcblxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxuY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXG4gIH0pO1xufTtcblxuY29uc3QgRXhwZW5zZVNoZWV0TGluZURldGFpbENvbnRlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiVmlld1wiKTtcbiAgY29uc3QgY2FuRWRpdEV4cGVuc2UgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkVkaXRcIik7XG4gIGNvbnN0IGNhbkRlbGV0ZUV4cGVuc2UgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkZ1bGxBY2Nlc3NcIik7XG4gIGNvbnN0IGNhbkNyZWF0ZUV4cGVuc2UgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkFkZFwiKTtcbiAgY29uc3Qgc2hlZXRJZCA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfU0hFRVRfSURfXyk7XG4gIGNvbnN0IGxpbmVJZCA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfTElORV9JRF9fKTtcbiAgY29uc3QgbGluZU1vZGUgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX0xJTkVfTU9ERV9fKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBpc0NyZWF0ZU1vZGUgPSBsaW5lTW9kZSA9PT0gXCJjcmVhdGVcIjtcbiAgY29uc3QgW2lzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSwgc2V0SXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCB7XG4gICAgaGVhZGVyLFxuICAgIGxpbmUsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBidXN5LFxuICAgIHN0YXR1cyxcbiAgICBpc0VkaXRpbmcsXG4gICAgbW9kYWxFcnJvcixcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0VHJhbnNEYXRlLFxuICAgIGRyYWZ0VHlwZVZhbHVlQ29kZSxcbiAgICBkcmFmdFByaWNlLFxuICAgIGRyYWZ0UXR5LFxuICAgIGRyYWZ0UHJvamVjdElkLFxuICAgIGRyYWZ0SW50ZXJuYXRpb25hbCxcbiAgICBpc0ttVHlwZSxcbiAgICBpc0Z1ZWxQcmljZUxvYWRpbmcsXG4gICAgZnVlbFByaWNlTWVzc2FnZSxcbiAgICBmdWVsUHJpY2VNZXNzYWdlSXNFcnJvcixcbiAgICBpc1NoZWV0TG9ja2VkLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXG4gICAgc2V0RHJhZnRUcmFuc0RhdGUsXG4gICAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlLFxuICAgIHNldERyYWZ0UHJpY2UsXG4gICAgc2V0RHJhZnRRdHksXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXG4gICAgc2V0RHJhZnRJbnRlcm5hdGlvbmFsLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVPcGVuQ3JlYXRlTW9kZSxcbiAgICBuYXZpZ2F0ZVRvU2hlZXREZXRhaWwsXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGUoe1xuICAgIGhhc0FjY2VzcyxcbiAgICBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGNhbkVkaXRFeHBlbnNlLFxuICAgIHNoZWV0SWQsXG4gICAgbGluZUlkLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcbiAgfSk7XG5cbiAgY29uc3QgZHJhZnRQcmljZVZhbHVlID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRQcmljZSk7XG4gIGNvbnN0IGRyYWZ0UXR5VmFsdWUgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFF0eSk7XG4gIGNvbnN0IGNhbGN1bGF0ZWRBbW91bnRQcmV2aWV3ID1cbiAgICBpc0VkaXRpbmcgJiYgZHJhZnRQcmljZVZhbHVlICE9IG51bGwgJiYgZHJhZnRQcmljZVZhbHVlID4gMCAmJiBkcmFmdFF0eVZhbHVlICE9IG51bGwgJiYgZHJhZnRRdHlWYWx1ZSA+IDBcbiAgICAgID8gZHJhZnRQcmljZVZhbHVlICogZHJhZnRRdHlWYWx1ZVxuICAgICAgOiBsaW5lPy5hbW91bnQgPz8gbnVsbDtcbiAgY29uc3QgcHJpY2VUZXh0ID0gdXNlTWVtbyhcbiAgICAoKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kobGluZT8ucHJpY2UgPz8gbnVsbCwgc2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpKSxcbiAgICBbaGVhZGVyPy5jdXJyZW5jeUNvZGUsIGxpbmU/LnByaWNlXVxuICApO1xuICBjb25zdCBhbW91bnRUZXh0ID0gdXNlTWVtbyhcbiAgICAoKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koY2FsY3VsYXRlZEFtb3VudFByZXZpZXcpLFxuICAgIFtjYWxjdWxhdGVkQW1vdW50UHJldmlld11cbiAgKTtcbiAgY29uc3QgcHJvamVjdFZhbHVlID0gc2FmZVRleHQobGluZT8ucHJvaklkIHx8IGhlYWRlcj8ucHJvaklkKTtcbiAgY29uc3Qgc2hlZXREZXNjcmlwdGlvbiA9IHNhZmVUZXh0KGhlYWRlcj8uZGVzY3JpcHRpb24pIHx8IFwiLVwiO1xuICBjb25zdCBpbnRlcm5hY2lvbmFsTGFiZWwgPSBnZXRFeHBlbnNlSW50ZXJuYXRpb25hbExhYmVsKGxpbmU/LmludGVybmFjaW9uYWwpO1xuXG4gIGNvbnN0IGdhc3RvVHlwZU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4ge1xuICAgIGNvbnN0IHNvdXJjZSA9IEFycmF5LmlzQXJyYXkod2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fKSA/IHdpbmRvdy5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXyA6IFtdO1xuICAgIGNvbnN0IG1hcHBlZCA9IG1hcFdpbmRvd0VudW1PcHRpb25zKHNvdXJjZSk7XG5cbiAgICBjb25zdCBjdXJyZW50VHlwZUNvZGUgPSBzYWZlVGV4dChsaW5lPy50eXBlVmFsdWVDb2RlKTtcbiAgICBjb25zdCBjdXJyZW50VHlwZUxhYmVsID0gc2FmZVRleHQobGluZT8udHlwZVZhbHVlKTtcbiAgICBpZiAoY3VycmVudFR5cGVDb2RlICYmICFtYXBwZWQuc29tZSgoaXRlbSkgPT4gaXRlbS52YWx1ZSA9PT0gY3VycmVudFR5cGVDb2RlKSkge1xuICAgICAgbWFwcGVkLnB1c2goe1xuICAgICAgICB2YWx1ZTogY3VycmVudFR5cGVDb2RlLFxuICAgICAgICB0ZXh0OiBjdXJyZW50VHlwZUxhYmVsIHx8IGN1cnJlbnRUeXBlQ29kZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXBwZWQ7XG4gIH0sIFtsaW5lPy50eXBlVmFsdWUsIGxpbmU/LnR5cGVWYWx1ZUNvZGVdKTtcblxuICBjb25zdCBpbnRlcm5hdGlvbmFsT3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPihcbiAgICAoKSA9PiBtYXBCb29sZWFuRW51bU9wdGlvbnMoZ2V0RXhwZW5zZUludGVybmF0aW9uYWxPcHRpb25zKCkpLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xuICAgICAgYnVzeSxcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xuICAgICAgICBzZXRTdGF0dXMobXNnKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtLCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXNdKTtcblxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcbiAgICA6ICFidXN5ICYmIG1vZGFsRXJyb3JcbiAgICAgID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpXG4gICAgICA6IG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpO1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xuICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xuICB9LCBbYnVzeSwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm0sIG1vZGFsRXJyb3JdKTtcblxuICBjb25zdCB7IGhhbmRsZVVwZGF0ZSwgaGFuZGxlRGVsZXRlIH0gPSB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zKHtcbiAgICBidXN5LFxuICAgIGlzRWRpdGluZyxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXG4gICAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgICBjYW5FZGl0RXhwZW5zZSxcbiAgICBjYW5EZWxldGVFeHBlbnNlLFxuICAgIHNoZWV0SWQsXG4gICAgbGluZUlkLFxuICAgIGxpbmUsXG4gICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICBkcmFmdFRyYW5zRGF0ZSxcbiAgICBkcmFmdFR5cGVWYWx1ZUNvZGUsXG4gICAgZHJhZnRQcmljZSxcbiAgICBkcmFmdFF0eSxcbiAgICBkcmFmdFByb2plY3RJZCxcbiAgICBkcmFmdEludGVybmF0aW9uYWwsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBzZXRCdXN5LFxuICAgIHNldFN0YXR1cyxcbiAgICBzZXRJc0VkaXRpbmcsXG4gICAgb25DcmVhdGVTdWNjZXNzOiAoKSA9PiB7fSxcbiAgfSk7XG5cbiAgdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnMoe1xuICAgIGJ1c3k6IGJ1c3kgfHwgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLFxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcbiAgICBpc0VkaXRpbmcsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzTG9ja2VkOiBpc1NoZWV0TG9ja2VkLFxuICAgIGNhbkNyZWF0ZUV4cGVuc2UsXG4gICAgY2FuRWRpdEV4cGVuc2UsXG4gICAgY2FuRGVsZXRlRXhwZW5zZSxcbiAgICBzaGVldElkLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gICAgb25TYXZlU3VjY2VzczogKCkgPT4ge1xuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgICBzZXRJc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUodHJ1ZSk7XG4gICAgICAgIG5hdmlnYXRlVG9TaGVldERldGFpbCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9LFxuICAgIG9wZW5Db25maXJtLFxuICAgIGNsb3NlQ29uZmlybSxcbiAgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgPENvbmZpcm1Nb2RhbFxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XG4gICAgICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbENhbmNlbFRleHR9XG4gICAgICAgIGxvYWRpbmdUZXh0PXttb2RhbExvYWRpbmdUZXh0fVxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XG4gICAgICAgIGJ1c3k9e2J1c3kgfHwgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlfVxuICAgICAgICBlcnJvcj17bW9kYWxFcnJvcn1cbiAgICAgICAgc3RhdHVzPXtzdGF0dXN9XG4gICAgICAgIG9uQ29uZmlybT17aGFuZGxlTW9kYWxCdXR0b25Db25maXJtfVxuICAgICAgICBvbkNhbmNlbD17Y2xvc2VDb25maXJtfVxuICAgICAgLz5cblxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBpc0xvYWRpbmcgfHwgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxuICAgICAgPlxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XG4gICAgICA8L2Rpdj5cblxuICAgICAge2Vycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57ZXJyb3JNZXNzYWdlfTwvZGl2PiA6IG51bGx9XG5cbiAgICAgIHshaXNMb2FkaW5nICYmICFpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgJiYgIWVycm9yTWVzc2FnZSAmJiBsaW5lID8gKFxuICAgICAgICA8RXhwZW5zZVNoZWV0TGluZUZvcm1cbiAgICAgICAgICBsaW5lPXtsaW5lfVxuICAgICAgICAgIGZhbGxiYWNrRGF0ZT17c2FmZVRleHQoaGVhZGVyPy5jcmVhdGVkRGF0ZSl9XG4gICAgICAgICAgc2hlZXREZXNjcmlwdGlvbj17c2hlZXREZXNjcmlwdGlvbn1cbiAgICAgICAgICBwcm9qZWN0VmFsdWU9e3Byb2plY3RWYWx1ZX1cbiAgICAgICAgICBwcmljZVRleHQ9e3ByaWNlVGV4dH1cbiAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxuICAgICAgICAgIGludGVybmFjaW9uYWxMYWJlbD17aW50ZXJuYWNpb25hbExhYmVsfVxuICAgICAgICAgIGlzS21UeXBlPXtpc0ttVHlwZX1cbiAgICAgICAgICBpc0Z1ZWxQcmljZUxvYWRpbmc9e2lzRnVlbFByaWNlTG9hZGluZ31cbiAgICAgICAgICBmdWVsUHJpY2VNZXNzYWdlPXtmdWVsUHJpY2VNZXNzYWdlfVxuICAgICAgICAgIGZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yPXtmdWVsUHJpY2VNZXNzYWdlSXNFcnJvcn1cbiAgICAgICAgICBzdGF0dXM9e3N0YXR1c31cbiAgICAgICAgICBpc0VkaXRpbmc9e2lzRWRpdGluZ31cbiAgICAgICAgICBnYXN0b1R5cGVPcHRpb25zPXtnYXN0b1R5cGVPcHRpb25zfVxuICAgICAgICAgIGludGVybmF0aW9uYWxPcHRpb25zPXtpbnRlcm5hdGlvbmFsT3B0aW9uc31cbiAgICAgICAgICBkcmFmdERlc2NyaXB0aW9uPXtkcmFmdERlc2NyaXB0aW9ufVxuICAgICAgICAgIGRyYWZ0VHJhbnNEYXRlPXtkcmFmdFRyYW5zRGF0ZX1cbiAgICAgICAgICBkcmFmdFR5cGVWYWx1ZUNvZGU9e2RyYWZ0VHlwZVZhbHVlQ29kZX1cbiAgICAgICAgICBkcmFmdFByaWNlPXtkcmFmdFByaWNlfVxuICAgICAgICAgIGRyYWZ0UXR5PXtkcmFmdFF0eX1cbiAgICAgICAgICBkcmFmdFByb2plY3RJZD17ZHJhZnRQcm9qZWN0SWR9XG4gICAgICAgICAgZHJhZnRJbnRlcm5hdGlvbmFsPXtkcmFmdEludGVybmF0aW9uYWx9XG4gICAgICAgICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlPXtzZXREcmFmdERlc2NyaXB0aW9ufVxuICAgICAgICAgIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2U9e3NldERyYWZ0VHJhbnNEYXRlfVxuICAgICAgICAgIG9uRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlPXtzZXREcmFmdFR5cGVWYWx1ZUNvZGV9XG4gICAgICAgICAgb25EcmFmdFByaWNlQ2hhbmdlPXtzZXREcmFmdFByaWNlfVxuICAgICAgICAgIG9uRHJhZnRRdHlDaGFuZ2U9e3NldERyYWZ0UXR5fVxuICAgICAgICAgIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2U9e3NldERyYWZ0UHJvamVjdElkfVxuICAgICAgICAgIG9uRHJhZnRJbnRlcm5hdGlvbmFsQ2hhbmdlPXtzZXREcmFmdEludGVybmF0aW9uYWx9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cblxuICAgICAge2NhbkNyZWF0ZUV4cGVuc2UgJiYgIWlzQ3JlYXRlTW9kZSAmJiAhaXNTaGVldExvY2tlZCA/IChcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXG4gICAgICAgICAgcm91dGU9XCJcIlxuICAgICAgICAgIGFyaWFMYWJlbD17aW5kVChcIkNvbW1vbl9DcmVhdGVcIiwgXCJDcmVhdGVcIil9XG4gICAgICAgICAgc2l6ZT17NzZ9XG4gICAgICAgICAgcmlnaHQ9ezE2fVxuICAgICAgICAgIGJvdHRvbT17MjR9XG4gICAgICAgICAgb25DbGljaz17aGFuZGxlT3BlbkNyZWF0ZU1vZGV9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgZXhwZW5zZSBzaGVldCBsaW5lIGRldGFpbC5cbmNvbnN0IEV4cGVuc2VTaGVldExpbmVEZXRhaWxQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgICAgIDxFeHBlbnNlU2hlZXRMaW5lRGV0YWlsQ29udGVudCAvPlxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XG4gICk7XG59O1xuXG5jb25zdCBtb3VudCA9ICgpID0+IHtcbiAgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGgoKTtcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBlbnNlLWxpbmUtZGV0YWlsLXJvb3RcIik7XG4gIGlmICghcm9vdEVsKSByZXR1cm47XG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVNoZWV0TGluZURldGFpbFBhZ2UgLz4pO1xufTtcblxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldExpbmVEZXRhaWxQYWdlO1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IFNpbmdsZURhdGVQaWNrZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TaW5nbGVEYXRlUGlja2VyLnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldExpbmUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlciwgZm9ybWF0RXhwZW5zZU51bWJlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XG5pbXBvcnQgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dCBmcm9tIFwiLi9FeHBlbnNlUHJvamVjdEZpbHRlcklucHV0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VSZWFkT25seUZpZWxkIGZyb20gXCIuL0V4cGVuc2VSZWFkT25seUZpZWxkLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VTZWN0aW9uRGl2aWRlciBmcm9tIFwiLi9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4XCI7XG5cbnR5cGUgRXhwZW5zZVNoZWV0TGluZUZvcm1Qcm9wcyA9IHtcbiAgbGluZTogRXhwZW5zZVNoZWV0TGluZTtcbiAgZmFsbGJhY2tEYXRlOiBzdHJpbmc7XG4gIHNoZWV0RGVzY3JpcHRpb246IHN0cmluZztcbiAgcHJvamVjdFZhbHVlOiBzdHJpbmc7XG4gIHByaWNlVGV4dDogc3RyaW5nO1xuICBhbW91bnRUZXh0OiBzdHJpbmc7XG4gIGludGVybmFjaW9uYWxMYWJlbDogc3RyaW5nO1xuICBpc0ttVHlwZTogYm9vbGVhbjtcbiAgaXNGdWVsUHJpY2VMb2FkaW5nOiBib29sZWFuO1xuICBmdWVsUHJpY2VNZXNzYWdlOiBzdHJpbmc7XG4gIGZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yOiBib29sZWFuO1xuICBzdGF0dXM6IHN0cmluZztcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBnYXN0b1R5cGVPcHRpb25zOiBFeHBlbnNlU2VsZWN0T3B0aW9uW107XG4gIGludGVybmF0aW9uYWxPcHRpb25zOiBFeHBlbnNlU2VsZWN0T3B0aW9uW107XG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcbiAgZHJhZnRUcmFuc0RhdGU6IHN0cmluZztcbiAgZHJhZnRUeXBlVmFsdWVDb2RlOiBzdHJpbmc7XG4gIGRyYWZ0UHJpY2U6IHN0cmluZztcbiAgZHJhZnRRdHk6IHN0cmluZztcbiAgZHJhZnRQcm9qZWN0SWQ6IHN0cmluZztcbiAgZHJhZnRJbnRlcm5hdGlvbmFsOiBzdHJpbmc7XG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0VHlwZVZhbHVlQ29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRQcmljZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRRdHlDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdEludGVybmF0aW9uYWxDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxuY29uc3QgZm9ybWF0UXR5VmFsdWUgPSAodmFsdWU6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gZm9ybWF0RXhwZW5zZU51bWJlcih2YWx1ZSwge1xuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgZmFsbGJhY2s6IFwiLVwiLFxuICB9KTtcbn07XG5cbi8vIFB1cmUgZm9ybSByZW5kZXJlciBmb3IgZXhwZW5zZSBsaW5lIGRldGFpbCBpbiByZWFkIGFuZCBlZGl0IG1vZGVzLlxuY29uc3QgRXhwZW5zZVNoZWV0TGluZUZvcm0gPSAoe1xuICBsaW5lLFxuICBmYWxsYmFja0RhdGUsXG4gIHNoZWV0RGVzY3JpcHRpb24sXG4gIHByb2plY3RWYWx1ZSxcbiAgcHJpY2VUZXh0LFxuICBhbW91bnRUZXh0LFxuICBpbnRlcm5hY2lvbmFsTGFiZWwsXG4gIGlzS21UeXBlLFxuICBpc0Z1ZWxQcmljZUxvYWRpbmcsXG4gIGZ1ZWxQcmljZU1lc3NhZ2UsXG4gIGZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yLFxuICBzdGF0dXMsXG4gIGlzRWRpdGluZyxcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcbiAgaW50ZXJuYXRpb25hbE9wdGlvbnMsXG4gIGRyYWZ0RGVzY3JpcHRpb24sXG4gIGRyYWZ0VHJhbnNEYXRlLFxuICBkcmFmdFR5cGVWYWx1ZUNvZGUsXG4gIGRyYWZ0UHJpY2UsXG4gIGRyYWZ0UXR5LFxuICBkcmFmdFByb2plY3RJZCxcbiAgZHJhZnRJbnRlcm5hdGlvbmFsLFxuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UsXG4gIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2UsXG4gIG9uRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlLFxuICBvbkRyYWZ0UHJpY2VDaGFuZ2UsXG4gIG9uRHJhZnRRdHlDaGFuZ2UsXG4gIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2UsXG4gIG9uRHJhZnRJbnRlcm5hdGlvbmFsQ2hhbmdlLFxufTogRXhwZW5zZVNoZWV0TGluZUZvcm1Qcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNwYWNlLXktMFwiPlxuICAgICAgPEV4cGVuc2VTZWN0aW9uRGl2aWRlclxuICAgICAgICBsYWJlbD17c2hlZXREZXNjcmlwdGlvbn1cbiAgICAgICAgY2xhc3NOYW1lPVwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXItLXNwYWNlZFwiXG4gICAgICAgIGxhYmVsQ2xhc3NOYW1lPVwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXJfX2xhYmVsLS10aXRsZVwiXG4gICAgICAvPlxuXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX08L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdERlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XG4gICAgICAgICAgICAgIHZhbHVlPXtzYWZlVGV4dChsaW5lLmRlc2NyaXB0aW9uKSB8fCBcIi1cIn1cbiAgICAgICAgICAgICAgZnVsbFdpZHRoXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpdGEtZmllbGQtdGV4dFwiPlxuICAgICAgICAgICAgICA8U2luZ2xlRGF0ZVBpY2tlclxuICAgICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DcmVhdGVkRGF0ZVwiLCBcIkRhdGVcIil9XG4gICAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0VHJhbnNEYXRlfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3JlYXRlZERhdGVcIiwgXCJEYXRlXCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17Zm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKFxuICAgICAgICAgICAgICAgIHNhZmVUZXh0KGxpbmUudHJhbnNEYXRlIHx8IGZhbGxiYWNrRGF0ZSksXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCJcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXG4gICAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1R5cGVcIiwgXCJUeXBlXCIpfVxuICAgICAgICAgICAgICBvcHRpb25zPXtnYXN0b1R5cGVPcHRpb25zfVxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRUeXBlVmFsdWVDb2RlIHx8IFwiXCJ9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0VHlwZVZhbHVlQ29kZUNoYW5nZX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1R5cGVcIiwgXCJUeXBlXCIpfVxuICAgICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxuICAgICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICAgICAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9UeXBlXCIsIFwiVHlwZVwiKX0gdmFsdWU9e3NhZmVUZXh0KGxpbmUudHlwZVZhbHVlKSB8fCBcIi1cIn0gLz5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9QcmljZVwiLCBcIlByaWNlXCIpfTwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17aXNLbVR5cGUgPyBcImZvcm0tY29udHJvbCBpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwiZm9ybS1jb250cm9sXCJ9XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIGlucHV0TW9kZT1cImRlY2ltYWxcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFByaWNlfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnRQcmljZUNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgICAgICAgb25CbHVyPXsoZXZlbnQpID0+XG4gICAgICAgICAgICAgICAgICBvbkRyYWZ0UHJpY2VDaGFuZ2UoXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihldmVudC50YXJnZXQudmFsdWUsIHtcbiAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgICAgICAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIGZhbGxiYWNrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZWFkT25seT17aXNLbVR5cGV9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzS21UeXBlfVxuICAgICAgICAgICAgICAgIGFyaWEtcmVhZG9ubHk9e2lzS21UeXBlfVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1ByaWNlXCIsIFwiUHJpY2VcIil9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIHtpc0ttVHlwZSAmJiBpc0Z1ZWxQcmljZUxvYWRpbmcgPyAoXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX0Z1ZWxQcmljZV9Mb2FkaW5nXCIsIFwiTG9hZGluZyBmdWVsIHByaWNlLi4uXCIpfVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgIHtpc0ttVHlwZSAmJiAhaXNGdWVsUHJpY2VMb2FkaW5nICYmIGZ1ZWxQcmljZU1lc3NhZ2UgPyAoXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtmdWVsUHJpY2VNZXNzYWdlSXNFcnJvciA/IFwidGV4dC1kYW5nZXIgdGV4dC1zbVwiIDogXCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LXhzXCJ9PntmdWVsUHJpY2VNZXNzYWdlfTwvcD5cbiAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9QcmljZVwiLCBcIlByaWNlXCIpfSB2YWx1ZT17cHJpY2VUZXh0IHx8IFwiLVwifSAvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfTwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIGlucHV0TW9kZT1cImRlY2ltYWxcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFF0eX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0UXR5Q2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cbiAgICAgICAgICAgICAgICBvbkJsdXI9eyhldmVudCkgPT5cbiAgICAgICAgICAgICAgICAgIG9uRHJhZnRRdHlDaGFuZ2UoXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihldmVudC50YXJnZXQudmFsdWUsIHtcbiAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgICAgICAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIGZhbGxiYWNrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9RdHlcIiwgXCJRdWFudGl0eVwiKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17Zm9ybWF0UXR5VmFsdWUobGluZS5xdHkpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9BbW91bnRcIiwgXCJBbW91bnRcIil9IHZhbHVlPXthbW91bnRUZXh0IHx8IFwiLVwifSAvPlxuXG4gICAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICAgIDxFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0XG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Qcm9qZWN0X1BsYWNlaG9sZGVyXCIsIFwiUHJvamVjdCBpZFwiKX1cbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0UHJvamVjdElkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdFByb2plY3RJZENoYW5nZX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmd9XG4gICAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogcHJvamVjdFZhbHVlID8gKFxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX0gdmFsdWU9e3Byb2plY3RWYWx1ZX0gLz5cbiAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXG4gICAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0ludGVybmF0aW9uYWxcIiwgXCJJbnRlcm5hdGlvbmFsXCIpfVxuICAgICAgICAgICAgICBvcHRpb25zPXtpbnRlcm5hdGlvbmFsT3B0aW9uc31cbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0SW50ZXJuYXRpb25hbCB8fCBcIlwifVxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEludGVybmF0aW9uYWxDaGFuZ2V9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9JbnRlcm5hdGlvbmFsXCIsIFwiSW50ZXJuYXRpb25hbFwiKX1cbiAgICAgICAgICAgICAgdXNlUG9ydGFsPXtmYWxzZX1cbiAgICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfSW50ZXJuYXRpb25hbFwiLCBcIkludGVybmF0aW9uYWxcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXtpbnRlcm5hY2lvbmFsTGFiZWx9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHRleHQtc20gdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAgICA8c3Bhbj57c3RhdHVzfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0TGluZUZvcm07XG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbmV4cG9ydCB0eXBlIEV4cGVuc2VJbnRlcm5hdGlvbmFsT3B0aW9uID0ge1xuICB2YWx1ZTogYm9vbGVhbjtcbiAgdGV4dDogc3RyaW5nO1xufTtcblxuLy8gRml4ZWQgZW51bSBmb3IgXCJJbnRlcm5hY2lvbmFsXCIgZmllbGQgaW4gZXhwZW5zZSBzaGVldCBsaW5lcy5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlSW50ZXJuYXRpb25hbE9wdGlvbnMgPSAoKTogRXhwZW5zZUludGVybmF0aW9uYWxPcHRpb25bXSA9PiBbXG4gIHsgdmFsdWU6IHRydWUsIHRleHQ6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ludGVybmF0aW9uYWxfWWVzXCIsIFwiU2lcIikgfSxcbiAgeyB2YWx1ZTogZmFsc2UsIHRleHQ6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ludGVybmF0aW9uYWxfTm9cIiwgXCJOb1wiKSB9LFxuXTtcblxuLy8gTWFwcyBudWxsYWJsZSBib29sZWFuIHZhbHVlcyB0byBmaXhlZCBlbnVtIGxhYmVscyBmb3IgcmVhZC1vbmx5IHJlbmRlcmluZy5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlSW50ZXJuYXRpb25hbExhYmVsID0gKHZhbHVlOiBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19JbnRlcm5hdGlvbmFsX1llc1wiLCBcIlNpXCIpO1xuICB9XG5cbiAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xuICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19JbnRlcm5hdGlvbmFsX05vXCIsIFwiTm9cIik7XG4gIH1cblxuICByZXR1cm4gXCItXCI7XG59O1xuXG4vLyBQYXJzZXMgdXNlciBpbnB1dCBiYWNrIHRvIG51bGxhYmxlIGJvb2xlYW4gZm9yIGZ1dHVyZSBlZGl0IG1vZGUuXG5leHBvcnQgY29uc3QgcGFyc2VFeHBlbnNlSW50ZXJuYXRpb25hbFZhbHVlID0gKHJhdzogc3RyaW5nIHwgYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQpOiBib29sZWFuIHwgbnVsbCA9PiB7XG4gIGlmIChyYXcgPT09IHRydWUgfHwgcmF3ID09PSBmYWxzZSkge1xuICAgIHJldHVybiByYXc7XG4gIH1cblxuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcgfHwgXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PT0gXCJ0cnVlXCIgfHwgdmFsdWUgPT09IFwiMVwiKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAodmFsdWUgPT09IFwiZmFsc2VcIiB8fCB2YWx1ZSA9PT0gXCIwXCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVNoZWV0Q3JlYXRlTGluZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldExpbmUsXG4gIEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBwYXJzZUV4cGVuc2VJbnRlcm5hdGlvbmFsVmFsdWUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2ludGVybmF0aW9uYWxPcHRpb25zLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbiwgcGFyc2VEZWNpbWFsSW5wdXQgfSBmcm9tIFwiLi4vaG9va3MvZXhwZW5zZU11dGF0aW9uVXRpbHMudHNcIjtcbmltcG9ydCB7IGNyZWF0ZUV4cGVuc2VTaGVldCwgZGVsZXRlRXhwZW5zZVNoZWV0TGluZSwgdXBkYXRlRXhwZW5zZVNoZWV0TGluZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9uc0FyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBpc0xvY2tlZDogYm9vbGVhbjtcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIHNoZWV0SWQ6IHN0cmluZztcbiAgbGluZUlkOiBzdHJpbmc7XG4gIGxpbmU6IEV4cGVuc2VTaGVldExpbmUgfCBudWxsO1xuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XG4gIGRyYWZ0VHlwZVZhbHVlQ29kZTogc3RyaW5nO1xuICBkcmFmdFByaWNlOiBzdHJpbmc7XG4gIGRyYWZ0UXR5OiBzdHJpbmc7XG4gIGRyYWZ0UHJvamVjdElkOiBzdHJpbmc7XG4gIGRyYWZ0SW50ZXJuYXRpb25hbDogc3RyaW5nO1xuICBzZXRNb2RhbEVycm9yOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0QnVzeTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICBzZXRTdGF0dXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRJc0VkaXRpbmc6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgb25DcmVhdGVTdWNjZXNzOiAoKSA9PiB2b2lkO1xufTtcblxuY29uc3Qgbm9ybWFsaXplTGluZURhdGUgPSAocmF3OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcgfHwgXCJcIikudHJpbSgpO1xuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcblxuICBpZiAoL15cXGR7OH0kLy50ZXN0KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGlmICgvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvLS9nLCBcIlwiKTtcbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgaWYgKE51bWJlci5pc05hTihwYXJzZWQuZ2V0VGltZSgpKSkge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgY29uc3QgeXl5eSA9IHBhcnNlZC5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBtbSA9IFN0cmluZyhwYXJzZWQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgY29uc3QgZGQgPSBTdHJpbmcocGFyc2VkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICByZXR1cm4gYCR7eXl5eX0ke21tfSR7ZGR9YDtcbn07XG5cbmNvbnN0IHBhcnNlTnVtYmVyID0gKHJhdzogc3RyaW5nKTogbnVtYmVyIHwgbnVsbCA9PiBwYXJzZURlY2ltYWxJbnB1dChyYXcpO1xuXG4vLyBFbmNhcHN1bGF0ZXMgdXBkYXRlIGFuZCBkZWxldGUgbXV0YXRpb25zIGZvciBleHBlbnNlIHNoZWV0IGxpbmUgZGV0YWlsLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxNdXRhdGlvbnMgPSAoe1xuICBidXN5LFxuICBpc0VkaXRpbmcsXG4gIGlzQ3JlYXRlTW9kZSxcbiAgaXNMb2NrZWQsXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXG4gIGNhbkVkaXRFeHBlbnNlLFxuICBjYW5EZWxldGVFeHBlbnNlLFxuICBzaGVldElkLFxuICBsaW5lSWQsXG4gIGxpbmUsXG4gIGRyYWZ0RGVzY3JpcHRpb24sXG4gIGRyYWZ0VHJhbnNEYXRlLFxuICBkcmFmdFR5cGVWYWx1ZUNvZGUsXG4gIGRyYWZ0UHJpY2UsXG4gIGRyYWZ0UXR5LFxuICBkcmFmdFByb2plY3RJZCxcbiAgZHJhZnRJbnRlcm5hdGlvbmFsLFxuICBzZXRNb2RhbEVycm9yLFxuICBzZXRCdXN5LFxuICBzZXRTdGF0dXMsXG4gIHNldElzRWRpdGluZyxcbiAgb25DcmVhdGVTdWNjZXNzLFxufTogVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9uc0FyZ3MpID0+IHtcbiAgY29uc3QgaGFuZGxlVXBkYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChidXN5IHx8ICFpc0VkaXRpbmcpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoaXNMb2NrZWQpIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IGNhblByb2NlZWQgPSBpc0NyZWF0ZU1vZGUgPyBjYW5DcmVhdGVFeHBlbnNlIDogY2FuRWRpdEV4cGVuc2U7XG4gICAgaWYgKCFjYW5Qcm9jZWVkKSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9ybWFsaXplZERhdGUgPSBub3JtYWxpemVMaW5lRGF0ZShkcmFmdFRyYW5zRGF0ZSk7XG4gICAgY29uc3QgcGFyc2VkVHlwZVZhbHVlID0gTnVtYmVyLnBhcnNlSW50KFN0cmluZyhkcmFmdFR5cGVWYWx1ZUNvZGUgfHwgXCJcIikudHJpbSgpLCAxMCk7XG4gICAgY29uc3QgcGFyc2VkUHJpY2UgPSBwYXJzZU51bWJlcihkcmFmdFByaWNlKTtcbiAgICBjb25zdCBwYXJzZWRRdHkgPSBwYXJzZU51bWJlcihkcmFmdFF0eSk7XG4gICAgY29uc3QgcGFyc2VkSW50ZXJuYXRpb25hbCA9IHBhcnNlRXhwZW5zZUludGVybmF0aW9uYWxWYWx1ZShkcmFmdEludGVybmF0aW9uYWwpO1xuXG4gICAgY29uc3QgaGFzVmFsaWRRdHlQcmljZSA9IHBhcnNlZFF0eSAhPSBudWxsICYmIHBhcnNlZFF0eSA+IDAgJiYgcGFyc2VkUHJpY2UgIT0gbnVsbCAmJiBwYXJzZWRQcmljZSA+IDA7XG4gICAgaWYgKCFoYXNWYWxpZFF0eVByaWNlKSB7XG4gICAgICBjb25zdCB2YWxpZGF0aW9uTWVzc2FnZSA9IGluZFQoXG4gICAgICAgIFwiRXhwZW5zZVNoZWV0c19MaW5lX1ZhbGlkYXRpb25fQW1vdW50UXR5XCIsXG4gICAgICAgIFwiUXVhbnRpdHkgYW5kIHByaWNlIG11c3QgYmUgZ3JlYXRlciB0aGFuIDAuXCJcbiAgICAgICk7XG4gICAgICBzZXRNb2RhbEVycm9yKHZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICAgIHNldFN0YXR1cyh2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFub3JtYWxpemVkRGF0ZSB8fCAhTnVtYmVyLmlzRmluaXRlKHBhcnNlZFR5cGVWYWx1ZSkgfHwgcGFyc2VkVHlwZVZhbHVlIDw9IDApIHtcbiAgICAgIGNvbnN0IHZhbGlkYXRpb25NZXNzYWdlID0gaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpO1xuICAgICAgc2V0TW9kYWxFcnJvcih2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICBzZXRTdGF0dXModmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xuICAgICAgc3RhcnRTdGF0dXM6IGlzQ3JlYXRlTW9kZVxuICAgICAgICA/IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVfRGV0YWlsX0NyZWF0aW5nXCIsIFwiQ3JlYXRpbmcgZXhwZW5zZSBsaW5lLi4uXCIpXG4gICAgICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfVXBkYXRpbmdcIiwgXCJVcGRhdGluZyBleHBlbnNlIGxpbmUuLi5cIiksXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKSxcbiAgICAgIHNldE1vZGFsRXJyb3IsXG4gICAgICBzZXRCdXN5LFxuICAgICAgc2V0U3RhdHVzLFxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbW1vbkxpbmVQYXlsb2FkID0ge1xuICAgICAgICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplZERhdGUsXG4gICAgICAgICAgdHlwZVZhbHVlOiBwYXJzZWRUeXBlVmFsdWUsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFN0cmluZyhkcmFmdERlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKSxcbiAgICAgICAgICBpbnRlcm5hY2lvbmFsOiBwYXJzZWRJbnRlcm5hdGlvbmFsID8/IGxpbmU/LmludGVybmFjaW9uYWwgPz8gZmFsc2UsXG4gICAgICAgICAgdGlja2V0OiBsaW5lPy50aWNrZXQgPT09IHRydWUsXG4gICAgICAgICAgcXR5OiBOdW1iZXIocGFyc2VkUXR5KSxcbiAgICAgICAgICBwcmljZTogTnVtYmVyKHBhcnNlZFByaWNlKSxcbiAgICAgICAgICBwcm9qSWQ6IFN0cmluZyhkcmFmdFByb2plY3RJZCB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgIGluZEF0dGFjaEZpbGVzOiBzYWZlVGV4dChsaW5lPy5pbmRBdHRhY2hGaWxlcyksXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgY3JlYXRlTGluZVBheWxvYWQ6IEV4cGVuc2VTaGVldENyZWF0ZUxpbmVSZXF1ZXN0ID0gY29tbW9uTGluZVBheWxvYWQ7XG4gICAgICAgIGNvbnN0IHVwZGF0ZUxpbmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVxdWVzdCA9IGNvbW1vbkxpbmVQYXlsb2FkO1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gaXNDcmVhdGVNb2RlXG4gICAgICAgICAgPyBhd2FpdCBjcmVhdGVFeHBlbnNlU2hlZXQoe1xuICAgICAgICAgICAgICBtb2RlOiAyLFxuICAgICAgICAgICAgICBleGlzdGluZ0hvamFHYXN0b3NJZDogc2hlZXRJZCxcbiAgICAgICAgICAgICAgbGluZXM6IFtjcmVhdGVMaW5lUGF5bG9hZF0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIDogYXdhaXQgdXBkYXRlRXhwZW5zZVNoZWV0TGluZShzaGVldElkLCBsaW5lSWQsIHVwZGF0ZUxpbmVQYXlsb2FkKTtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9DcmVhdGVkXCIsIFwiRXhwZW5zZSBsaW5lIGNyZWF0ZWRcIikpO1xuICAgICAgICAgIG9uQ3JlYXRlU3VjY2VzcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBsaW5lIHVwZGF0ZWRcIikpO1xuICAgICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcbiAgfSwgW1xuICAgIGJ1c3ksXG4gICAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgICBjYW5FZGl0RXhwZW5zZSxcbiAgICBkcmFmdFByaWNlLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRJbnRlcm5hdGlvbmFsLFxuICAgIGRyYWZ0UHJvamVjdElkLFxuICAgIGRyYWZ0UXR5LFxuICAgIGRyYWZ0VHJhbnNEYXRlLFxuICAgIGRyYWZ0VHlwZVZhbHVlQ29kZSxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNMb2NrZWQsXG4gICAgaXNFZGl0aW5nLFxuICAgIGxpbmUsXG4gICAgbGluZUlkLFxuICAgIG9uQ3JlYXRlU3VjY2VzcyxcbiAgICBzZXRCdXN5LFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldFN0YXR1cyxcbiAgICBzaGVldElkLFxuICBdKTtcblxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoaXNMb2NrZWQpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWNhbkRlbGV0ZUV4cGVuc2UpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcbiAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGV4cGVuc2UgbGluZS4uLlwiKSxcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRXJyb3JcIiwgXCJEZWxldGUgZXJyb3IuXCIpLFxuICAgICAgc2V0TW9kYWxFcnJvcixcbiAgICAgIHNldEJ1c3ksXG4gICAgICBzZXRTdGF0dXMsXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRMaW5lKHNoZWV0SWQsIGxpbmVJZCk7XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9EZWxldGVkXCIsIFwiRXhwZW5zZSBsaW5lIGRlbGV0ZWRcIikpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xuICB9LCBbYnVzeSwgY2FuRGVsZXRlRXhwZW5zZSwgaXNMb2NrZWQsIGxpbmVJZCwgc2V0QnVzeSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzLCBzaGVldElkXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlRGVsZXRlLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyB9IGZyb20gXCIuLi9ob29rcy91c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMudHNcIjtcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnNBcmdzID0ge1xuICBidXN5OiBib29sZWFuO1xuICBtb2RhbE9wZW46IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBpc0xvY2tlZDogYm9vbGVhbjtcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIHNoZWV0SWQ6IHN0cmluZztcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XG4gIGhhbmRsZUNhbmNlbEVkaXQ6ICgpID0+IHZvaWQ7XG4gIGhhbmRsZVVwZGF0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcbiAgaGFuZGxlRGVsZXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICBvblNhdmVTdWNjZXNzOiAoKSA9PiB2b2lkO1xuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xuICB9KSA9PiB2b2lkO1xuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBDb29yZGluYXRlcyB0b3BiYXIgaWNvbiBzdGF0ZSBhbmQgZGlzcGF0Y2ggYWN0aW9ucyBmb3IgZXhwZW5zZSBzaGVldCBsaW5lIGRldGFpbC5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9ucyA9ICh7XG4gIGJ1c3ksXG4gIG1vZGFsT3BlbixcbiAgaXNFZGl0aW5nLFxuICBpc0NyZWF0ZU1vZGUsXG4gIGlzTG9ja2VkLFxuICBjYW5DcmVhdGVFeHBlbnNlLFxuICBjYW5FZGl0RXhwZW5zZSxcbiAgY2FuRGVsZXRlRXhwZW5zZSxcbiAgc2hlZXRJZCxcbiAgc2V0TW9kYWxFcnJvcixcbiAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgaGFuZGxlVXBkYXRlLFxuICBoYW5kbGVEZWxldGUsXG4gIG9uU2F2ZVN1Y2Nlc3MsXG4gIG9wZW5Db25maXJtLFxuICBjbG9zZUNvbmZpcm0sXG59OiBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcbiAgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zKHtcbiAgICBpZHM6IHtcbiAgICAgIGVkaXRJY29uSWQ6IFwiZXhwZW5zZUxpbmVFZGl0SWNvblwiLFxuICAgICAgc2F2ZUljb25JZDogXCJleHBlbnNlTGluZVNhdmVJY29uXCIsXG4gICAgICBkZWxldGVCdG5JZDogXCJleHBlbnNlTGluZURlbGV0ZUJ0blwiLFxuICAgICAgY2FuY2VsQnRuSWQ6IFwiZXhwZW5zZUxpbmVDYW5jZWxCdG5cIixcbiAgICB9LFxuICAgIGV2ZW50czoge1xuICAgICAgZWRpdEV2ZW50OiBcImV4cGVuc2UtbGluZS1kZXRhaWwtZWRpdFwiLFxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS1saW5lLWRldGFpbC1kZWxldGVcIixcbiAgICAgIGNhbmNlbEV2ZW50OiBcImV4cGVuc2UtbGluZS1kZXRhaWwtY2FuY2VsLWVkaXRcIixcbiAgICB9LFxuICAgIGJ1c3ksXG4gICAgbW9kYWxPcGVuLFxuICAgIGlzRWRpdGluZyxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNMb2NrZWQsXG4gICAgY2FuQ3JlYXRlOiBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGNhbkVkaXQ6IGNhbkVkaXRFeHBlbnNlLFxuICAgIGNhbkRlbGV0ZTogY2FuRGVsZXRlRXhwZW5zZSxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVTYXZlOiBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIHNhdmVDb25maXJtVGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19UaXRsZVwiLCBcIlNhdmUgY2hhbmdlc1wiKSxcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gc2F2ZSBjaGFuZ2VzP1wiKSxcbiAgICBzYXZlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXG4gICAgZGVsZXRlQ29uZmlybVRpdGxlOiBpbmRUKFwiQ29uZmlybV9EZWxldGVfVGl0bGVcIiwgXCJEZWxldGVcIiksXG4gICAgZGVsZXRlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgaXRlbT9cIiksXG4gICAgZGVsZXRlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpLFxuICAgIG9uU2F2ZVN1Y2Nlc3MsXG4gICAgb25EZWxldGVTdWNjZXNzOiAoKSA9PiB7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNoZWV0SWQpfWApO1xuICAgIH0sXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgY2xvc2VDb25maXJtLFxuICB9KTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldEhlYWRlciwgRXhwZW5zZVNoZWV0TGluZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsLCBnZXRGdWVsUHJpY2VLbSwgbWFwRXhwZW5zZVNoZWV0SGVhZGVyLCBtYXBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7XG4gIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCxcbiAgbmF2aWdhdGVUb0V4cGVuc2VVcmwsXG4gIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuaW1wb3J0IHsgaGFzQXNzaWduZWRWb3VjaGVyLCBwYXJzZUV4cGVuc2VEYXRlLCBzYWZlVGV4dCwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xuXG5jb25zdCBLTV9HQVNUT19UWVBFX0NPREUgPSBcIjNcIjtcbmNvbnN0IEZVRUxfUFJJQ0VfREVCT1VOQ0VfTVMgPSAzMDA7XG5jb25zdCBGVUVMX1BSSUNFX1NPVVJDRV9VU0VSX0NPTkZJRyA9IFwiQ1JNSG9qYUdhc3Rvc1VzZXJQcmljZUttRmVjaGFUYWJsZVwiO1xuY29uc3QgRlVFTF9QUklDRV9TT1VSQ0VfR0xPQkFMX0NPTkZJRyA9IFwiQ1JNUGFyYW1ldGVyc1wiO1xuY29uc3QgRVhQRU5TRV9TVEFUVVNfQVBQUk9WRUQgPSAyO1xuY29uc3QgRVhQRU5TRV9TVEFUVVNfUEFJRCA9IDQ7XG5cbmNvbnN0IHRvSW5wdXREYXRlID0gKHJhdz86IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcbiAgcmV0dXJuIHBhcnNlZCA/IHRvSXNvRGF0ZShwYXJzZWQpIDogXCJcIjtcbn07XG5cbmNvbnN0IGZvcm1hdEVkaXRhYmxlTnVtYmVyID0gKHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcih2YWx1ZSwge1xuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgZmFsbGJhY2s6IFwiXCIsXG4gIH0pO1xufTtcblxuY29uc3QgZm9ybWF0RWRpdGFibGVRdWFudGl0eSA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIodmFsdWUsIHtcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgIGZhbGxiYWNrOiBcIlwiLFxuICB9KTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUZ1ZWxUcmFuc0RhdGUgPSAocmF3OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcgfHwgXCJcIikudHJpbSgpO1xuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcblxuICBpZiAoL15cXGR7OH0kLy50ZXN0KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGlmICgvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvLS9nLCBcIlwiKTtcbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgaWYgKE51bWJlci5pc05hTihwYXJzZWQuZ2V0VGltZSgpKSkge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgY29uc3QgeXl5eSA9IHBhcnNlZC5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBtbSA9IFN0cmluZyhwYXJzZWQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgY29uc3QgZGQgPSBTdHJpbmcocGFyc2VkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICByZXR1cm4gYCR7eXl5eX0ke21tfSR7ZGR9YDtcbn07XG5cbi8vIFJlc29sdmVzIGxvY2FsaXplZCBmdWVsIHByaWNlIHNvdXJjZSBtZXNzYWdlcyBmb3Iga25vd24gYmFja2VuZCBzb3VyY2VzLlxuY29uc3QgcmVzb2x2ZUZ1ZWxQcmljZVNvdXJjZU1lc3NhZ2UgPSAoc291cmNlOiBzdHJpbmcsIGVmZmVjdGl2ZURhdGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRTb3VyY2UgPSBzYWZlVGV4dChzb3VyY2UpO1xuICBpZiAobm9ybWFsaXplZFNvdXJjZSA9PT0gRlVFTF9QUklDRV9TT1VSQ0VfVVNFUl9DT05GSUcpIHtcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfRnVlbFByaWNlX1NvdXJjZV9Vc2VyQ29uZmlnXCIsIFwiT2J0YWluZWQgYnkgdXNlciBjb25maWd1cmF0aW9uLlwiKTtcbiAgfVxuXG4gIGlmIChub3JtYWxpemVkU291cmNlID09PSBGVUVMX1BSSUNFX1NPVVJDRV9HTE9CQUxfQ09ORklHKSB7XG4gICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0Z1ZWxQcmljZV9Tb3VyY2VfR2xvYmFsQ29uZmlnXCIsIFwiT2J0YWluZWQgYnkgZ2xvYmFsIGNvbmZpZ3VyYXRpb24uXCIpO1xuICB9XG5cbiAgY29uc3Qgc291cmNlTGFiZWwgPSBpbmRUKFwiRXhwZW5zZVNoZWV0c19GdWVsUHJpY2VfU291cmNlXCIsIFwiRnVlbCBwcmljZSBzb3VyY2VcIik7XG4gIGlmICghbm9ybWFsaXplZFNvdXJjZSkge1xuICAgIHJldHVybiBlZmZlY3RpdmVEYXRlID8gYCR7c291cmNlTGFiZWx9OiAke2VmZmVjdGl2ZURhdGV9YCA6IHNvdXJjZUxhYmVsO1xuICB9XG5cbiAgcmV0dXJuIGVmZmVjdGl2ZURhdGVcbiAgICA/IGAke3NvdXJjZUxhYmVsfTogJHtub3JtYWxpemVkU291cmNlfSAoJHtlZmZlY3RpdmVEYXRlfSlgXG4gICAgOiBgJHtzb3VyY2VMYWJlbH06ICR7bm9ybWFsaXplZFNvdXJjZX1gO1xufTtcblxuY29uc3QgYnVpbGRDcmVhdGVMaW5lRHJhZnQgPSAoYmFzZURhdGU6IHN0cmluZywgcHJvamVjdElkOiBzdHJpbmcpOiBFeHBlbnNlU2hlZXRMaW5lID0+IHtcbiAgcmV0dXJuIHtcbiAgICBsaW5lUmVjSWQ6IFwiXCIsXG4gICAgdHJhbnNEYXRlOiBiYXNlRGF0ZSxcbiAgICB0eXBlVmFsdWU6IFwiXCIsXG4gICAgdHlwZVZhbHVlQ29kZTogXCJcIixcbiAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICBpbnRlcm5hY2lvbmFsOiBmYWxzZSxcbiAgICB0aWNrZXQ6IGZhbHNlLFxuICAgIHByaWNlOiBudWxsLFxuICAgIHF0eTogMSxcbiAgICBhbW91bnQ6IG51bGwsXG4gICAgcHJvaklkOiBwcm9qZWN0SWQsXG4gICAgaW5kQXR0YWNoRmlsZXM6IFwiXCIsXG4gIH07XG59O1xuXG50eXBlIFVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZUFyZ3MgPSB7XG4gIGhhc0FjY2VzczogYm9vbGVhbjtcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XG4gIHNoZWV0SWQ6IHN0cmluZztcbiAgbGluZUlkOiBzdHJpbmc7XG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBPd25zIHN0YXRlIGFuZCBiZWhhdmlvciBmb3IgZXhwZW5zZSBsaW5lIGRldGFpbCBwYWdlIChyZWFkLCBlZGl0LCBjcmVhdGUpLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZSA9ICh7XG4gIGhhc0FjY2VzcyxcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgY2FuRWRpdEV4cGVuc2UsXG4gIHNoZWV0SWQsXG4gIGxpbmVJZCxcbiAgaXNDcmVhdGVNb2RlLFxuICBvbkZvcmJpZGRlbixcbn06IFVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZUFyZ3MpID0+IHtcbiAgY29uc3QgW2hlYWRlciwgc2V0SGVhZGVyXSA9IHVzZVN0YXRlPEV4cGVuc2VTaGVldEhlYWRlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbGluZSwgc2V0TGluZV0gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRMaW5lIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtpc0VkaXRpbmcsIHNldElzRWRpdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnREZXNjcmlwdGlvbiwgc2V0RHJhZnREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0VHJhbnNEYXRlLCBzZXREcmFmdFRyYW5zRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0VHlwZVZhbHVlQ29kZSwgc2V0RHJhZnRUeXBlVmFsdWVDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRQcmljZSwgc2V0RHJhZnRQcmljZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0UXR5LCBzZXREcmFmdFF0eV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0UHJvamVjdElkLCBzZXREcmFmdFByb2plY3RJZF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0SW50ZXJuYXRpb25hbCwgc2V0RHJhZnRJbnRlcm5hdGlvbmFsXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbaXNGdWVsUHJpY2VMb2FkaW5nLCBzZXRJc0Z1ZWxQcmljZUxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZnVlbFByaWNlTWVzc2FnZSwgc2V0RnVlbFByaWNlTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2Z1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yLCBzZXRGdWVsUHJpY2VNZXNzYWdlSXNFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaHlkcmF0ZURyYWZ0RnJvbUxpbmUgPSB1c2VDYWxsYmFjaygobmV4dExpbmU6IEV4cGVuc2VTaGVldExpbmUgfCBudWxsLCBuZXh0SGVhZGVyOiBFeHBlbnNlU2hlZXRIZWFkZXIgfCBudWxsKSA9PiB7XG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbihzYWZlVGV4dChuZXh0TGluZT8uZGVzY3JpcHRpb24pKTtcbiAgICBzZXREcmFmdFRyYW5zRGF0ZSh0b0lucHV0RGF0ZShuZXh0TGluZT8udHJhbnNEYXRlIHx8IG5leHRIZWFkZXI/LmNyZWF0ZWREYXRlKSk7XG4gICAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlKHNhZmVUZXh0KG5leHRMaW5lPy50eXBlVmFsdWVDb2RlKSk7XG4gICAgc2V0RHJhZnRQcmljZShmb3JtYXRFZGl0YWJsZU51bWJlcihuZXh0TGluZT8ucHJpY2UpKTtcbiAgICBzZXREcmFmdFF0eShmb3JtYXRFZGl0YWJsZVF1YW50aXR5KG5leHRMaW5lPy5xdHkpKTtcbiAgICBzZXREcmFmdFByb2plY3RJZChzYWZlVGV4dChuZXh0TGluZT8ucHJvaklkIHx8IG5leHRIZWFkZXI/LnByb2pJZCkpO1xuICAgIHNldERyYWZ0SW50ZXJuYXRpb25hbChuZXh0TGluZT8uaW50ZXJuYWNpb25hbCA9PT0gdHJ1ZSA/IFwidHJ1ZVwiIDogbmV4dExpbmU/LmludGVybmFjaW9uYWwgPT09IGZhbHNlID8gXCJmYWxzZVwiIDogXCJcIik7XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGxvYWREZXRhaWwgPSBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoIWhhc0FjY2Vzcykge1xuICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghc2hlZXRJZCkge1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IGxpbmUgd2FzIG5vdCBmb3VuZC5cIikpO1xuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgIHNldExpbmUobnVsbCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICAgICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlKSB7XG4gICAgICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwoc2hlZXRJZCwge1xuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgbGluZSBkZXRhaWwuXCIpKTtcbiAgICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgICAgIHNldExpbmUobnVsbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgc2hlZXRzID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZFNoZWV0ID1cbiAgICAgICAgICAgIHNoZWV0cy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnk/LkhvamFHYXN0b3NJZCkudG9VcHBlckNhc2UoKSA9PT0gc2hlZXRJZC50cmltKCkudG9VcHBlckNhc2UoKSkgfHwgc2hlZXRzWzBdO1xuXG4gICAgICAgICAgaWYgKCFzZWxlY3RlZFNoZWV0KSB7XG4gICAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IGxpbmUgd2FzIG5vdCBmb3VuZC5cIikpO1xuICAgICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICAgICAgc2V0TGluZShudWxsKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBsb2FkZWRIZWFkZXIgPSBtYXBFeHBlbnNlU2hlZXRIZWFkZXIoc2VsZWN0ZWRTaGVldCk7XG4gICAgICAgICAgY29uc3QgbG9hZGVkU3RhdHVzQ29kZSA9IHR5cGVvZiBsb2FkZWRIZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzID09PSBcIm51bWJlclwiID8gbG9hZGVkSGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA6IG51bGw7XG4gICAgICAgICAgY29uc3QgaXNDcmVhdGVMb2NrZWRTdGF0dXMgPSBsb2FkZWRTdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRCB8fCBsb2FkZWRTdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19QQUlEO1xuICAgICAgICAgIGlmIChpc0NyZWF0ZUxvY2tlZFN0YXR1cyB8fCBoYXNBc3NpZ25lZFZvdWNoZXIobG9hZGVkSGVhZGVyLnZvdWNoZXIpKSB7XG4gICAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1BhaWRSZWFkT25seVwiLCBcIlBhaWQgZXhwZW5zZSBzaGVldHMgYXJlIHJlYWQtb25seS5cIikpO1xuICAgICAgICAgICAgc2V0SGVhZGVyKGxvYWRlZEhlYWRlcik7XG4gICAgICAgICAgICBzZXRMaW5lKG51bGwpO1xuICAgICAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBkcmFmdExpbmUgPSBidWlsZENyZWF0ZUxpbmVEcmFmdCh0b0lzb0RhdGUobmV3IERhdGUoKSksIHNhZmVUZXh0KGxvYWRlZEhlYWRlci5wcm9qSWQpKTtcbiAgICAgICAgICBzZXRIZWFkZXIobG9hZGVkSGVhZGVyKTtcbiAgICAgICAgICBzZXRMaW5lKGRyYWZ0TGluZSk7XG4gICAgICAgICAgc2V0SXNFZGl0aW5nKHRydWUpO1xuICAgICAgICAgIGh5ZHJhdGVEcmFmdEZyb21MaW5lKGRyYWZ0TGluZSwgbG9hZGVkSGVhZGVyKTtcbiAgICAgICAgICBzZXRTdGF0dXMoXCJcIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFsaW5lSWQpIHtcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IGxpbmUgd2FzIG5vdCBmb3VuZC5cIikpO1xuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgICBzZXRMaW5lKG51bGwpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwoc2hlZXRJZCwge1xuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlPy5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGxpbmUgZGV0YWlsLlwiKSk7XG4gICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICAgIHNldExpbmUobnVsbCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2hlZXRzID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRTaGVldCA9XG4gICAgICAgICAgc2hlZXRzLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uSG9qYUdhc3Rvc0lkKS50b1VwcGVyQ2FzZSgpID09PSBzaGVldElkLnRyaW0oKS50b1VwcGVyQ2FzZSgpKSB8fCBzaGVldHNbMF07XG5cbiAgICAgICAgaWYgKCFzZWxlY3RlZFNoZWV0KSB7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCBsaW5lIHdhcyBub3QgZm91bmQuXCIpKTtcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgICAgc2V0TGluZShudWxsKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtYXBwZWRIZWFkZXIgPSBtYXBFeHBlbnNlU2hlZXRIZWFkZXIoc2VsZWN0ZWRTaGVldCk7XG4gICAgICAgIGNvbnN0IG1hcHBlZExpbmVzID0gKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRTaGVldC5MaW5lcykgPyBzZWxlY3RlZFNoZWV0LkxpbmVzIDogW10pLm1hcCgoZW50cnkpID0+XG4gICAgICAgICAgbWFwRXhwZW5zZVNoZWV0TGluZShlbnRyeSlcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRMaW5lID1cbiAgICAgICAgICBtYXBwZWRMaW5lcy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnkubGluZVJlY0lkKS50b1VwcGVyQ2FzZSgpID09PSBsaW5lSWQudHJpbSgpLnRvVXBwZXJDYXNlKCkpIHx8IG51bGw7XG5cbiAgICAgICAgaWYgKCFzZWxlY3RlZExpbmUpIHtcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IGxpbmUgd2FzIG5vdCBmb3VuZC5cIikpO1xuICAgICAgICAgIHNldEhlYWRlcihtYXBwZWRIZWFkZXIpO1xuICAgICAgICAgIHNldExpbmUobnVsbCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0SGVhZGVyKG1hcHBlZEhlYWRlcik7XG4gICAgICAgIHNldExpbmUoc2VsZWN0ZWRMaW5lKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGxpbmUgZGV0YWlsLlwiKSk7XG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgc2V0TGluZShudWxsKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZvaWQgbG9hZERldGFpbCgpO1xuICB9LCBbY2FuQ3JlYXRlRXhwZW5zZSwgaGFzQWNjZXNzLCBoeWRyYXRlRHJhZnRGcm9tTGluZSwgaXNDcmVhdGVNb2RlLCBsaW5lSWQsIG9uRm9yYmlkZGVuLCBzaGVldElkXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWxpbmUgfHwgaXNFZGl0aW5nKSByZXR1cm47XG4gICAgaHlkcmF0ZURyYWZ0RnJvbUxpbmUobGluZSwgaGVhZGVyKTtcbiAgfSwgW2hlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUxpbmUsIGlzRWRpdGluZywgbGluZV0pO1xuXG4gIGNvbnN0IG5vcm1hbGl6ZWREcmFmdFR5cGVWYWx1ZUNvZGUgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KGRyYWZ0VHlwZVZhbHVlQ29kZSksIFtkcmFmdFR5cGVWYWx1ZUNvZGVdKTtcbiAgY29uc3Qgbm9ybWFsaXplZEZ1ZWxUcmFuc0RhdGUgPSB1c2VNZW1vKCgpID0+IG5vcm1hbGl6ZUZ1ZWxUcmFuc0RhdGUoZHJhZnRUcmFuc0RhdGUpLCBbZHJhZnRUcmFuc0RhdGVdKTtcbiAgY29uc3QgaXNLbVR5cGUgPSBub3JtYWxpemVkRHJhZnRUeXBlVmFsdWVDb2RlID09PSBLTV9HQVNUT19UWVBFX0NPREU7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgaXNDYW5jZWxsZWQgPSBmYWxzZTtcbiAgICBsZXQgdGltZXI6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlciB8IG51bGwgPSBudWxsO1xuXG4gICAgY29uc3QgY2xlYXJQZW5kaW5nID0gKCkgPT4ge1xuICAgICAgaWYgKHRpbWVyKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmIChjb250cm9sbGVyKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICAgICAgY29udHJvbGxlciA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICghaXNFZGl0aW5nIHx8ICFpc0ttVHlwZSkge1xuICAgICAgc2V0SXNGdWVsUHJpY2VMb2FkaW5nKGZhbHNlKTtcbiAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlSXNFcnJvcihmYWxzZSk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBjbGVhclBlbmRpbmcoKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKCFub3JtYWxpemVkRnVlbFRyYW5zRGF0ZSkge1xuICAgICAgc2V0SXNGdWVsUHJpY2VMb2FkaW5nKGZhbHNlKTtcbiAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2UoaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY2xlYXJQZW5kaW5nKCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHRpbWVyID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgICAgc2V0SXNGdWVsUHJpY2VMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZShcIlwiKTtcbiAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRGdWVsUHJpY2VLbShub3JtYWxpemVkRnVlbFRyYW5zRGF0ZSwge1xuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2VzcyB8fCAhcmVzcG9uc2UuRGF0YSB8fCAhTnVtYmVyLmlzRmluaXRlKE51bWJlcihyZXNwb25zZS5EYXRhLlByaWNlS20pKSkge1xuICAgICAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2UoXG4gICAgICAgICAgICBzYWZlVGV4dChyZXNwb25zZS5NZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19GdWVsUHJpY2VfTm90Rm91bmRcIiwgXCJDb3VsZCBub3QgbG9hZCBmdWVsIHByaWNlIGZvciBrbS5cIilcbiAgICAgICAgICApO1xuICAgICAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc29sdmVkUHJpY2UgPSBOdW1iZXIocmVzcG9uc2UuRGF0YS5QcmljZUttKTtcbiAgICAgICAgaWYgKHJlc29sdmVkUHJpY2UgPiAwKSB7XG4gICAgICAgICAgc2V0RHJhZnRQcmljZShmb3JtYXRFZGl0YWJsZU51bWJlcihyZXNvbHZlZFByaWNlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzb3VyY2UgPSBzYWZlVGV4dChyZXNwb25zZS5EYXRhLlNvdXJjZSk7XG4gICAgICAgIGNvbnN0IGVmZmVjdGl2ZURhdGUgPSBzYWZlVGV4dChyZXNwb25zZS5EYXRhLlRyYW5zRGF0ZSkgfHwgbm9ybWFsaXplZEZ1ZWxUcmFuc0RhdGU7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSByZXNvbHZlRnVlbFByaWNlU291cmNlTWVzc2FnZShzb3VyY2UsIGVmZmVjdGl2ZURhdGUpO1xuICAgICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlSXNFcnJvcihmYWxzZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSByZXR1cm47XG5cbiAgICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZShcbiAgICAgICAgICBlcnJvciBpbnN0YW5jZW9mIEVycm9yXG4gICAgICAgICAgICA/IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfRnVlbFByaWNlX05vdEZvdW5kXCIsIFwiQ291bGQgbm90IGxvYWQgZnVlbCBwcmljZSBmb3Iga20uXCIpXG4gICAgICAgICk7XG4gICAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKCFpc0NhbmNlbGxlZCkge1xuICAgICAgICAgIHNldElzRnVlbFByaWNlTG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBGVUVMX1BSSUNFX0RFQk9VTkNFX01TKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpc0NhbmNlbGxlZCA9IHRydWU7XG4gICAgICBjbGVhclBlbmRpbmcoKTtcbiAgICB9O1xuICB9LCBbaXNFZGl0aW5nLCBpc0ttVHlwZSwgbm9ybWFsaXplZEZ1ZWxUcmFuc0RhdGVdKTtcblxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbygoKSA9PiBidXN5IHx8IGlzRWRpdGluZywgW2J1c3ksIGlzRWRpdGluZ10pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoaGFzQWN0aXZlUHJvY2Vzcyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCgpO1xuICAgIH07XG4gIH0sIFtoYXNBY3RpdmVQcm9jZXNzXSk7XG5cbiAgY29uc3Qgc3RhdHVzQ29kZSA9IHR5cGVvZiBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgOiBudWxsO1xuICBjb25zdCBpc1NoZWV0QXBwcm92ZWQgPSBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRDtcbiAgY29uc3QgaXNTaGVldFBhaWRCeVN0YXR1cyA9IHN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX1BBSUQ7XG4gIGNvbnN0IGlzU2hlZXRQYWlkQnlWb3VjaGVyID0gaGFzQXNzaWduZWRWb3VjaGVyKGhlYWRlcj8udm91Y2hlcik7XG4gIGNvbnN0IGlzU2hlZXRQYWlkID0gaXNTaGVldFBhaWRCeVN0YXR1cyB8fCBpc1NoZWV0UGFpZEJ5Vm91Y2hlcjtcbiAgY29uc3QgaXNTaGVldExvY2tlZCA9IGlzU2hlZXRBcHByb3ZlZCB8fCBpc1NoZWV0UGFpZDtcblxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChpc0NyZWF0ZU1vZGUgfHwgaXNMb2FkaW5nIHx8ICFoZWFkZXIgfHwgIWxpbmUgfHwgaXNTaGVldExvY2tlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghY2FuRWRpdEV4cGVuc2UpIHtcbiAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XG4gICAgaHlkcmF0ZURyYWZ0RnJvbUxpbmUobGluZSwgaGVhZGVyKTtcbiAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0VkaXRpbmdFbmFibGVkXCIsIFwiRWRpdGluZyBlbmFibGVkXCIpKTtcbiAgfSwgW2NhbkVkaXRFeHBlbnNlLCBoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21MaW5lLCBpc0NyZWF0ZU1vZGUsIGlzTG9hZGluZywgaXNTaGVldExvY2tlZCwgbGluZSwgb25Gb3JiaWRkZW5dKTtcblxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IHRhcmdldFVybCA9IGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCl9YDtcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwsIHtcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiB0cnVlLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFpc0VkaXRpbmcpIHJldHVybjtcblxuICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBoeWRyYXRlRHJhZnRGcm9tTGluZShsaW5lLCBoZWFkZXIpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKSk7XG4gIH0sIFtoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21MaW5lLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgbGluZSwgc2hlZXRJZF0pO1xuXG4gIGNvbnN0IGhhbmRsZU9wZW5DcmVhdGVNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSB8fCAhc2hlZXRJZCB8fCBpc1NoZWV0TG9ja2VkKSB7XG4gICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXRMaW5lRGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzaGVldElkKX0mbW9kZT1jcmVhdGVgO1xuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXG4gICAgfSk7XG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgaXNTaGVldExvY2tlZCwgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcblxuICBjb25zdCBuYXZpZ2F0ZVRvU2hlZXREZXRhaWwgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChzaGVldElkKTtcbiAgICBpZiAoIXNhZmVTaGVldElkKSByZXR1cm47XG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlU2hlZXRJZCl9YDtcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwpO1xuICB9LCBbc2hlZXRJZF0pO1xuXG4gIHJldHVybiB7XG4gICAgaGVhZGVyLFxuICAgIGxpbmUsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBidXN5LFxuICAgIHN0YXR1cyxcbiAgICBpc0VkaXRpbmcsXG4gICAgbW9kYWxFcnJvcixcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0VHJhbnNEYXRlLFxuICAgIGRyYWZ0VHlwZVZhbHVlQ29kZSxcbiAgICBkcmFmdFByaWNlLFxuICAgIGRyYWZ0UXR5LFxuICAgIGRyYWZ0UHJvamVjdElkLFxuICAgIGRyYWZ0SW50ZXJuYXRpb25hbCxcbiAgICBpc0ttVHlwZSxcbiAgICBpc0Z1ZWxQcmljZUxvYWRpbmcsXG4gICAgZnVlbFByaWNlTWVzc2FnZSxcbiAgICBmdWVsUHJpY2VNZXNzYWdlSXNFcnJvcixcbiAgICBpc1NoZWV0UGFpZCxcbiAgICBpc1NoZWV0TG9ja2VkLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXG4gICAgc2V0RHJhZnRUcmFuc0RhdGUsXG4gICAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlLFxuICAgIHNldERyYWZ0UHJpY2UsXG4gICAgc2V0RHJhZnRRdHksXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXG4gICAgc2V0RHJhZnRJbnRlcm5hdGlvbmFsLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVPcGVuQ3JlYXRlTW9kZSxcbiAgICBuYXZpZ2F0ZVRvU2hlZXREZXRhaWwsXG4gIH07XG59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QUFNO0FBQUEsUUFDTixXQUFXLEtBQUssaUJBQWlCLFFBQVE7QUFBQSxRQUN6QyxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUE7QUFBQSxJQUNYLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLDZCQUE2QixNQUFNO0FBQ3ZDLFNBQ0UsNkNBQUMsZ0NBQ0MsdURBQUMsaUNBQThCLEdBQ2pDO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSwwQkFBMEI7QUFDakUsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQyw4QkFBMkIsQ0FBRTtBQUN6RDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8scUNBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAicmVzcG9uc2UiLCAic2hlZXRzIiwgInNlbGVjdGVkU2hlZXQiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
