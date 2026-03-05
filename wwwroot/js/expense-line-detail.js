import {
  SingleDatePicker
} from "./chunks/chunk-AS4EE5L2.js";
import {
  mapBooleanEnumOptions,
  mapWindowEnumOptions
} from "./chunks/chunk-BVPBMOU4.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-YJQJ6JSM.js";
import "./chunks/chunk-NE4KB4CT.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-GIUUNBHM.js";
import "./chunks/chunk-6YXFJB4W.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-XNARBSRN.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-XXAOM63C.js";
import "./chunks/chunk-K7MECJ5E.js";
import {
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  clearExpenseNavigationGuard,
  configureExpenseApiAuth,
  createExpenseSheet,
  deleteExpenseSheetLine,
  deleteExpenseSheetTicket,
  deleteExpenseSheetTicketFile,
  fetchExpenseSheetDetail,
  formatAmountWithCurrency,
  formatExpenseDisplayDate,
  formatExpenseInputNumber,
  formatExpenseNumber,
  getFuelPriceKm,
  hasAssignedVoucher,
  mapExpenseSheetHeader,
  mapExpenseSheetLine,
  navigateToExpenseUrl,
  parseExpenseDate,
  safeText,
  setExpenseNavigationGuard,
  toExpenseApiDdMmYyyy,
  toIsoDate,
  updateExpenseSheetLine
} from "./chunks/chunk-GGS3XUX2.js";
import {
  VisitasPageProviders_default
} from "./chunks/chunk-EVHUYAZN.js";
import {
  ApiFetchError,
  canAccess,
  indT,
  showPermissionModal
} from "./chunks/chunk-PU3BESI6.js";
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
  sheetDescription: _sheetDescription,
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
  linkedTicketFileId,
  showLinkedTicketField,
  onDraftDescriptionChange,
  onDraftTransDateChange,
  onDraftTypeValueCodeChange,
  onDraftPriceChange,
  onDraftQtyChange,
  onDraftProjectIdChange,
  onDraftInternationalChange,
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
  setModalError,
  setBusy,
  setStatus,
  setIsEditing,
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
    if (!normalizedDate) {
      setModalError(EXPENSE_API_DATE_FORMAT_MESSAGE);
      setStatus(EXPENSE_API_DATE_FORMAT_MESSAGE);
      return false;
    }
    if (!Number.isFinite(parsedTypeValue) || parsedTypeValue <= 0) {
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
    isEditLocked,
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
    actionMode,
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
  const linkedTicketFileId = safeText(line?.fileId);
  const hasLinkedTicket = !isCreateMode && !!linkedTicketFileId;
  const isLineEditLocked = isSheetLocked || hasLinkedTicket;
  const isLineDeleteLocked = isSheetLocked;
  const isLineLocked = isLineEditLocked;
  const handleEnableEdit = (0, import_react2.useCallback)(() => {
    if (isCreateMode || isLoading || !header || !line || isLineEditLocked) {
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
  }, [canEditExpense, header, hydrateDraftFromLine, isCreateMode, isLineEditLocked, isLoading, line, onForbidden]);
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
    isLineEditLocked,
    isLineDeleteLocked,
    isLineLocked,
    hasLinkedTicket,
    linkedTicketFileId,
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
    isLineEditLocked,
    isLineDeleteLocked,
    hasLinkedTicket,
    linkedTicketFileId,
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
    () => formatAmountWithCurrency(calculatedAmountPreview, safeText(header?.currencyCode)),
    [calculatedAmountPreview, header?.currencyCode]
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
    isEditLocked: isLineEditLocked,
    isDeleteLocked: isLineDeleteLocked,
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
    setModalError,
    setBusy,
    setStatus,
    setIsEditing,
    onCreateSuccess: () => {
    }
  });
  const lineTopbarActionMode = hasLinkedTicket && !isSheetLocked ? "delete_only" : "default";
  useExpenseSheetLineDetailTopbarActions({
    busy: busy || isRedirectingAfterCreate,
    modalOpen: modal.open,
    isEditing,
    isCreateMode,
    isLocked: isSheetLocked,
    actionMode: lineTopbarActionMode,
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
  const handleOpenLinkedTicket = (0, import_react3.useCallback)(() => {
    const safeFileId = safeText(linkedTicketFileId);
    const safeSheetId = safeText(sheetId);
    const safeLineId = safeText(lineId || line?.lineRecId);
    if (!safeFileId || !safeSheetId || !safeLineId) return;
    const query = new URLSearchParams({
      fileId: safeFileId,
      origin: "expense-line",
      sheetId: safeSheetId,
      lineRecId: safeLineId
    });
    navigateToExpenseUrl(`/Gastos/TicketDetail?${query.toString()}`, {
      askConfirmation: isEditing
    });
  }, [isEditing, line?.lineRecId, lineId, linkedTicketFileId, sheetId]);
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
        onDraftInternationalChange: setDraftInternational,
        linkedTicketFileId,
        showLinkedTicketField: hasLinkedTicket,
        onOpenLinkedTicket: handleOpenLinkedTicket
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL0V4cGVuc2VTaGVldExpbmVEZXRhaWxQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0TGluZUZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2ludGVybmF0aW9uYWxPcHRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGluZS91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGluZS91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpbmUvdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFN0YXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XG5pbXBvcnQgRXhwZW5zZVNoZWV0TGluZUZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0TGluZUZvcm0udHN4XCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlSW50ZXJuYXRpb25hbExhYmVsLCBnZXRFeHBlbnNlSW50ZXJuYXRpb25hbE9wdGlvbnMgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2ludGVybmF0aW9uYWxPcHRpb25zLnRzXCI7XG5pbXBvcnQgeyBwYXJzZURlY2ltYWxJbnB1dCB9IGZyb20gXCIuLi9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50c1wiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQge1xuICBtYXBCb29sZWFuRW51bU9wdGlvbnMsXG4gIG1hcFdpbmRvd0VudW1PcHRpb25zLFxuICB0eXBlIEV4cGVuc2VTZWxlY3RPcHRpb24sXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxNdXRhdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZS50c1wiO1xuXG4vLyBJbml0aWFsaXplcyBhdXRoIHNlZWQgZm9yIGV4cGVuc2UgQVBJIGNhbGxzIGJlZm9yZSBpc2xhbmQgZWZmZWN0cyBydW4uXG5jb25zdCBib290c3RyYXBFeHBlbnNlQXBpQXV0aCA9ICgpID0+IHtcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgoe1xuICAgIHRva2VuOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxuICAgIGVudHJhT2lkOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcbiAgfSk7XG59O1xuXG5jb25zdCBFeHBlbnNlU2hlZXRMaW5lRGV0YWlsQ29udGVudCA9ICgpID0+IHtcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJWaWV3XCIpO1xuICBjb25zdCBjYW5FZGl0RXhwZW5zZSA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiRWRpdFwiKTtcbiAgY29uc3QgY2FuRGVsZXRlRXhwZW5zZSA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiRnVsbEFjY2Vzc1wiKTtcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZSA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiQWRkXCIpO1xuICBjb25zdCBzaGVldElkID0gc2FmZVRleHQod2luZG93Ll9fRVhQRU5TRV9TSEVFVF9JRF9fKTtcbiAgY29uc3QgbGluZUlkID0gc2FmZVRleHQod2luZG93Ll9fRVhQRU5TRV9MSU5FX0lEX18pO1xuICBjb25zdCBsaW5lTW9kZSA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfTElORV9NT0RFX18pLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGlzQ3JlYXRlTW9kZSA9IGxpbmVNb2RlID09PSBcImNyZWF0ZVwiO1xuICBjb25zdCBbaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLCBzZXRJc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IHtcbiAgICBoZWFkZXIsXG4gICAgbGluZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGJ1c3ksXG4gICAgc3RhdHVzLFxuICAgIGlzRWRpdGluZyxcbiAgICBtb2RhbEVycm9yLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRUcmFuc0RhdGUsXG4gICAgZHJhZnRUeXBlVmFsdWVDb2RlLFxuICAgIGRyYWZ0UHJpY2UsXG4gICAgZHJhZnRRdHksXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgZHJhZnRJbnRlcm5hdGlvbmFsLFxuICAgIGlzS21UeXBlLFxuICAgIGlzRnVlbFByaWNlTG9hZGluZyxcbiAgICBmdWVsUHJpY2VNZXNzYWdlLFxuICAgIGZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yLFxuICAgIGlzU2hlZXRMb2NrZWQsXG4gICAgaXNMaW5lRWRpdExvY2tlZCxcbiAgICBpc0xpbmVEZWxldGVMb2NrZWQsXG4gICAgaGFzTGlua2VkVGlja2V0LFxuICAgIGxpbmtlZFRpY2tldEZpbGVJZCxcbiAgICBzZXRCdXN5LFxuICAgIHNldFN0YXR1cyxcbiAgICBzZXRJc0VkaXRpbmcsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxuICAgIHNldERyYWZ0VHJhbnNEYXRlLFxuICAgIHNldERyYWZ0VHlwZVZhbHVlQ29kZSxcbiAgICBzZXREcmFmdFByaWNlLFxuICAgIHNldERyYWZ0UXR5LFxuICAgIHNldERyYWZ0UHJvamVjdElkLFxuICAgIHNldERyYWZ0SW50ZXJuYXRpb25hbCxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgbmF2aWdhdGVUb1NoZWV0RGV0YWlsLFxuICB9ID0gdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFN0YXRlKHtcbiAgICBoYXNBY2Nlc3MsXG4gICAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgICBjYW5FZGl0RXhwZW5zZSxcbiAgICBzaGVldElkLFxuICAgIGxpbmVJZCxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuXG4gIGNvbnN0IGRyYWZ0UHJpY2VWYWx1ZSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0UHJpY2UpO1xuICBjb25zdCBkcmFmdFF0eVZhbHVlID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRRdHkpO1xuICBjb25zdCBjYWxjdWxhdGVkQW1vdW50UHJldmlldyA9XG4gICAgaXNFZGl0aW5nICYmIGRyYWZ0UHJpY2VWYWx1ZSAhPSBudWxsICYmIGRyYWZ0UHJpY2VWYWx1ZSA+IDAgJiYgZHJhZnRRdHlWYWx1ZSAhPSBudWxsICYmIGRyYWZ0UXR5VmFsdWUgPiAwXG4gICAgICA/IGRyYWZ0UHJpY2VWYWx1ZSAqIGRyYWZ0UXR5VmFsdWVcbiAgICAgIDogbGluZT8uYW1vdW50ID8/IG51bGw7XG4gIGNvbnN0IHByaWNlVGV4dCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGxpbmU/LnByaWNlID8/IG51bGwsIHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSksXG4gICAgW2hlYWRlcj8uY3VycmVuY3lDb2RlLCBsaW5lPy5wcmljZV1cbiAgKTtcbiAgY29uc3QgYW1vdW50VGV4dCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGNhbGN1bGF0ZWRBbW91bnRQcmV2aWV3LCBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSkpLFxuICAgIFtjYWxjdWxhdGVkQW1vdW50UHJldmlldywgaGVhZGVyPy5jdXJyZW5jeUNvZGVdXG4gICk7XG4gIGNvbnN0IHByb2plY3RWYWx1ZSA9IHNhZmVUZXh0KGxpbmU/LnByb2pJZCB8fCBoZWFkZXI/LnByb2pJZCk7XG4gIGNvbnN0IHNoZWV0RGVzY3JpcHRpb24gPSBzYWZlVGV4dChoZWFkZXI/LmRlc2NyaXB0aW9uKSB8fCBcIi1cIjtcbiAgY29uc3QgaW50ZXJuYWNpb25hbExhYmVsID0gZ2V0RXhwZW5zZUludGVybmF0aW9uYWxMYWJlbChsaW5lPy5pbnRlcm5hY2lvbmFsKTtcblxuICBjb25zdCBnYXN0b1R5cGVPcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KCgpID0+IHtcbiAgICBjb25zdCBzb3VyY2UgPSBBcnJheS5pc0FycmF5KHdpbmRvdy5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXykgPyB3aW5kb3cuX19FWFBFTlNFX0dBU1RPX1RZUEVTX18gOiBbXTtcbiAgICBjb25zdCBtYXBwZWQgPSBtYXBXaW5kb3dFbnVtT3B0aW9ucyhzb3VyY2UpO1xuXG4gICAgY29uc3QgY3VycmVudFR5cGVDb2RlID0gc2FmZVRleHQobGluZT8udHlwZVZhbHVlQ29kZSk7XG4gICAgY29uc3QgY3VycmVudFR5cGVMYWJlbCA9IHNhZmVUZXh0KGxpbmU/LnR5cGVWYWx1ZSk7XG4gICAgaWYgKGN1cnJlbnRUeXBlQ29kZSAmJiAhbWFwcGVkLnNvbWUoKGl0ZW0pID0+IGl0ZW0udmFsdWUgPT09IGN1cnJlbnRUeXBlQ29kZSkpIHtcbiAgICAgIG1hcHBlZC5wdXNoKHtcbiAgICAgICAgdmFsdWU6IGN1cnJlbnRUeXBlQ29kZSxcbiAgICAgICAgdGV4dDogY3VycmVudFR5cGVMYWJlbCB8fCBjdXJyZW50VHlwZUNvZGUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwcGVkO1xuICB9LCBbbGluZT8udHlwZVZhbHVlLCBsaW5lPy50eXBlVmFsdWVDb2RlXSk7XG5cbiAgY29uc3QgaW50ZXJuYXRpb25hbE9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXG4gICAgKCkgPT4gbWFwQm9vbGVhbkVudW1PcHRpb25zKGdldEV4cGVuc2VJbnRlcm5hdGlvbmFsT3B0aW9ucygpKSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxuICB9KTtcblxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcbiAgICAgIGJ1c3ksXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XG4gICAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcbiAgICAgICAgc2V0U3RhdHVzKG1zZyk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9LCBbYnVzeSwgaGFuZGxlQ29uZmlybSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzXSk7XG5cbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XG4gICAgOiAhYnVzeSAmJiBtb2RhbEVycm9yXG4gICAgICA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKVxuICAgICAgOiBtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKTtcblxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBoYW5kbGVNb2RhbENvbmZpcm0oKTtcbiAgfSwgW2J1c3ksIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtLCBtb2RhbEVycm9yXSk7XG5cbiAgY29uc3QgeyBoYW5kbGVVcGRhdGUsIGhhbmRsZURlbGV0ZSB9ID0gdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9ucyh7XG4gICAgYnVzeSxcbiAgICBpc0VkaXRpbmcsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzRWRpdExvY2tlZDogaXNMaW5lRWRpdExvY2tlZCxcbiAgICBpc0RlbGV0ZUxvY2tlZDogaXNMaW5lRGVsZXRlTG9ja2VkLFxuICAgIGNhbkNyZWF0ZUV4cGVuc2UsXG4gICAgY2FuRWRpdEV4cGVuc2UsXG4gICAgY2FuRGVsZXRlRXhwZW5zZSxcbiAgICBzaGVldElkLFxuICAgIGxpbmVJZCxcbiAgICBsaW5lLFxuICAgIGxpbmtlZFRpY2tldEZpbGVJZCxcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0VHJhbnNEYXRlLFxuICAgIGRyYWZ0VHlwZVZhbHVlQ29kZSxcbiAgICBkcmFmdFByaWNlLFxuICAgIGRyYWZ0UXR5LFxuICAgIGRyYWZ0UHJvamVjdElkLFxuICAgIGRyYWZ0SW50ZXJuYXRpb25hbCxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgICBvbkNyZWF0ZVN1Y2Nlc3M6ICgpID0+IHt9LFxuICB9KTtcblxuICBjb25zdCBsaW5lVG9wYmFyQWN0aW9uTW9kZSA9IGhhc0xpbmtlZFRpY2tldCAmJiAhaXNTaGVldExvY2tlZCA/IFwiZGVsZXRlX29ubHlcIiA6IFwiZGVmYXVsdFwiO1xuXG4gIHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zKHtcbiAgICBidXN5OiBidXN5IHx8IGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSxcbiAgICBtb2RhbE9wZW46IG1vZGFsLm9wZW4sXG4gICAgaXNFZGl0aW5nLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBpc0xvY2tlZDogaXNTaGVldExvY2tlZCxcbiAgICBhY3Rpb25Nb2RlOiBsaW5lVG9wYmFyQWN0aW9uTW9kZSxcbiAgICBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGNhbkVkaXRFeHBlbnNlLFxuICAgIGNhbkRlbGV0ZUV4cGVuc2UsXG4gICAgc2hlZXRJZCxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgICAgc2V0SXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlKHRydWUpO1xuICAgICAgICBuYXZpZ2F0ZVRvU2hlZXREZXRhaWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZU9wZW5MaW5rZWRUaWNrZXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3Qgc2FmZUZpbGVJZCA9IHNhZmVUZXh0KGxpbmtlZFRpY2tldEZpbGVJZCk7XG4gICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChzaGVldElkKTtcbiAgICBjb25zdCBzYWZlTGluZUlkID0gc2FmZVRleHQobGluZUlkIHx8IGxpbmU/LmxpbmVSZWNJZCk7XG4gICAgaWYgKCFzYWZlRmlsZUlkIHx8ICFzYWZlU2hlZXRJZCB8fCAhc2FmZUxpbmVJZCkgcmV0dXJuO1xuXG4gICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgIGZpbGVJZDogc2FmZUZpbGVJZCxcbiAgICAgIG9yaWdpbjogXCJleHBlbnNlLWxpbmVcIixcbiAgICAgIHNoZWV0SWQ6IHNhZmVTaGVldElkLFxuICAgICAgbGluZVJlY0lkOiBzYWZlTGluZUlkLFxuICAgIH0pO1xuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXG4gICAgfSk7XG4gIH0sIFtpc0VkaXRpbmcsIGxpbmU/LmxpbmVSZWNJZCwgbGluZUlkLCBsaW5rZWRUaWNrZXRGaWxlSWQsIHNoZWV0SWRdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICA8Q29uZmlybU1vZGFsXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsQ29uZmlybVRleHR9XG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cbiAgICAgICAgYnVzeT17YnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGV9XG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cbiAgICAgICAgb25Db25maXJtPXtoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm19XG4gICAgICAgIG9uQ2FuY2VsPXtjbG9zZUNvbmZpcm19XG4gICAgICAvPlxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XG4gICAgICA+XG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7ZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntlcnJvck1lc3NhZ2V9PC9kaXY+IDogbnVsbH1cblxuICAgICAgeyFpc0xvYWRpbmcgJiYgIWlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhZXJyb3JNZXNzYWdlICYmIGxpbmUgPyAoXG4gICAgICAgIDxFeHBlbnNlU2hlZXRMaW5lRm9ybVxuICAgICAgICAgIGxpbmU9e2xpbmV9XG4gICAgICAgICAgZmFsbGJhY2tEYXRlPXtzYWZlVGV4dChoZWFkZXI/LmNyZWF0ZWREYXRlKX1cbiAgICAgICAgICBzaGVldERlc2NyaXB0aW9uPXtzaGVldERlc2NyaXB0aW9ufVxuICAgICAgICAgIHByb2plY3RWYWx1ZT17cHJvamVjdFZhbHVlfVxuICAgICAgICAgIHByaWNlVGV4dD17cHJpY2VUZXh0fVxuICAgICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XG4gICAgICAgICAgaW50ZXJuYWNpb25hbExhYmVsPXtpbnRlcm5hY2lvbmFsTGFiZWx9XG4gICAgICAgICAgaXNLbVR5cGU9e2lzS21UeXBlfVxuICAgICAgICAgIGlzRnVlbFByaWNlTG9hZGluZz17aXNGdWVsUHJpY2VMb2FkaW5nfVxuICAgICAgICAgIGZ1ZWxQcmljZU1lc3NhZ2U9e2Z1ZWxQcmljZU1lc3NhZ2V9XG4gICAgICAgICAgZnVlbFByaWNlTWVzc2FnZUlzRXJyb3I9e2Z1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yfVxuICAgICAgICAgIHN0YXR1cz17c3RhdHVzfVxuICAgICAgICAgIGlzRWRpdGluZz17aXNFZGl0aW5nfVxuICAgICAgICAgIGdhc3RvVHlwZU9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XG4gICAgICAgICAgaW50ZXJuYXRpb25hbE9wdGlvbnM9e2ludGVybmF0aW9uYWxPcHRpb25zfVxuICAgICAgICAgIGRyYWZ0RGVzY3JpcHRpb249e2RyYWZ0RGVzY3JpcHRpb259XG4gICAgICAgICAgZHJhZnRUcmFuc0RhdGU9e2RyYWZ0VHJhbnNEYXRlfVxuICAgICAgICAgIGRyYWZ0VHlwZVZhbHVlQ29kZT17ZHJhZnRUeXBlVmFsdWVDb2RlfVxuICAgICAgICAgIGRyYWZ0UHJpY2U9e2RyYWZ0UHJpY2V9XG4gICAgICAgICAgZHJhZnRRdHk9e2RyYWZ0UXR5fVxuICAgICAgICAgIGRyYWZ0UHJvamVjdElkPXtkcmFmdFByb2plY3RJZH1cbiAgICAgICAgICBkcmFmdEludGVybmF0aW9uYWw9e2RyYWZ0SW50ZXJuYXRpb25hbH1cbiAgICAgICAgICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U9e3NldERyYWZ0RGVzY3JpcHRpb259XG4gICAgICAgICAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZT17c2V0RHJhZnRUcmFuc0RhdGV9XG4gICAgICAgICAgb25EcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2U9e3NldERyYWZ0VHlwZVZhbHVlQ29kZX1cbiAgICAgICAgICBvbkRyYWZ0UHJpY2VDaGFuZ2U9e3NldERyYWZ0UHJpY2V9XG4gICAgICAgICAgb25EcmFmdFF0eUNoYW5nZT17c2V0RHJhZnRRdHl9XG4gICAgICAgICAgb25EcmFmdFByb2plY3RJZENoYW5nZT17c2V0RHJhZnRQcm9qZWN0SWR9XG4gICAgICAgICAgb25EcmFmdEludGVybmF0aW9uYWxDaGFuZ2U9e3NldERyYWZ0SW50ZXJuYXRpb25hbH1cbiAgICAgICAgICBsaW5rZWRUaWNrZXRGaWxlSWQ9e2xpbmtlZFRpY2tldEZpbGVJZH1cbiAgICAgICAgICBzaG93TGlua2VkVGlja2V0RmllbGQ9e2hhc0xpbmtlZFRpY2tldH1cbiAgICAgICAgICBvbk9wZW5MaW5rZWRUaWNrZXQ9e2hhbmRsZU9wZW5MaW5rZWRUaWNrZXR9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cblxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gTWFpbiBwYWdlIGVudHJ5IGZvciBleHBlbnNlIHNoZWV0IGxpbmUgZGV0YWlsLlxuY29uc3QgRXhwZW5zZVNoZWV0TGluZURldGFpbFBhZ2UgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICAgICAgPEV4cGVuc2VTaGVldExpbmVEZXRhaWxDb250ZW50IC8+XG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgKTtcbn07XG5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2UtbGluZS1kZXRhaWwtcm9vdFwiKTtcbiAgaWYgKCFyb290RWwpIHJldHVybjtcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxFeHBlbnNlU2hlZXRMaW5lRGV0YWlsUGFnZSAvPik7XG59O1xuXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0TGluZURldGFpbFBhZ2U7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0TGluZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyLCBmb3JtYXRFeHBlbnNlTnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcbmltcG9ydCBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0IGZyb20gXCIuL0V4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVJlYWRPbmx5RmllbGQgZnJvbSBcIi4vRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVNlY3Rpb25EaXZpZGVyIGZyb20gXCIuL0V4cGVuc2VTZWN0aW9uRGl2aWRlci50c3hcIjtcblxudHlwZSBFeHBlbnNlU2hlZXRMaW5lRm9ybVByb3BzID0ge1xuICBsaW5lOiBFeHBlbnNlU2hlZXRMaW5lO1xuICBmYWxsYmFja0RhdGU6IHN0cmluZztcbiAgc2hlZXREZXNjcmlwdGlvbjogc3RyaW5nO1xuICBwcm9qZWN0VmFsdWU6IHN0cmluZztcbiAgcHJpY2VUZXh0OiBzdHJpbmc7XG4gIGFtb3VudFRleHQ6IHN0cmluZztcbiAgaW50ZXJuYWNpb25hbExhYmVsOiBzdHJpbmc7XG4gIGlzS21UeXBlOiBib29sZWFuO1xuICBpc0Z1ZWxQcmljZUxvYWRpbmc6IGJvb2xlYW47XG4gIGZ1ZWxQcmljZU1lc3NhZ2U6IHN0cmluZztcbiAgZnVlbFByaWNlTWVzc2FnZUlzRXJyb3I6IGJvb2xlYW47XG4gIHN0YXR1czogc3RyaW5nO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGdhc3RvVHlwZU9wdGlvbnM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXTtcbiAgaW50ZXJuYXRpb25hbE9wdGlvbnM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXTtcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xuICBkcmFmdFR5cGVWYWx1ZUNvZGU6IHN0cmluZztcbiAgZHJhZnRQcmljZTogc3RyaW5nO1xuICBkcmFmdFF0eTogc3RyaW5nO1xuICBkcmFmdFByb2plY3RJZDogc3RyaW5nO1xuICBkcmFmdEludGVybmF0aW9uYWw6IHN0cmluZztcbiAgbGlua2VkVGlja2V0RmlsZUlkOiBzdHJpbmc7XG4gIHNob3dMaW5rZWRUaWNrZXRGaWVsZDogYm9vbGVhbjtcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdFByaWNlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdFF0eUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0SW50ZXJuYXRpb25hbENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uT3BlbkxpbmtlZFRpY2tldDogKCkgPT4gdm9pZDtcbn07XG5cbmNvbnN0IGZvcm1hdFF0eVZhbHVlID0gKHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VOdW1iZXIodmFsdWUsIHtcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgIGZhbGxiYWNrOiBcIi1cIixcbiAgfSk7XG59O1xuXG4vLyBQdXJlIGZvcm0gcmVuZGVyZXIgZm9yIGV4cGVuc2UgbGluZSBkZXRhaWwgaW4gcmVhZCBhbmQgZWRpdCBtb2Rlcy5cbmNvbnN0IEV4cGVuc2VTaGVldExpbmVGb3JtID0gKHtcbiAgbGluZSxcbiAgZmFsbGJhY2tEYXRlLFxuICBzaGVldERlc2NyaXB0aW9uOiBfc2hlZXREZXNjcmlwdGlvbixcbiAgcHJvamVjdFZhbHVlLFxuICBwcmljZVRleHQsXG4gIGFtb3VudFRleHQsXG4gIGludGVybmFjaW9uYWxMYWJlbCxcbiAgaXNLbVR5cGUsXG4gIGlzRnVlbFByaWNlTG9hZGluZyxcbiAgZnVlbFByaWNlTWVzc2FnZSxcbiAgZnVlbFByaWNlTWVzc2FnZUlzRXJyb3IsXG4gIHN0YXR1cyxcbiAgaXNFZGl0aW5nLFxuICBnYXN0b1R5cGVPcHRpb25zLFxuICBpbnRlcm5hdGlvbmFsT3B0aW9ucyxcbiAgZHJhZnREZXNjcmlwdGlvbixcbiAgZHJhZnRUcmFuc0RhdGUsXG4gIGRyYWZ0VHlwZVZhbHVlQ29kZSxcbiAgZHJhZnRQcmljZSxcbiAgZHJhZnRRdHksXG4gIGRyYWZ0UHJvamVjdElkLFxuICBkcmFmdEludGVybmF0aW9uYWwsXG4gIGxpbmtlZFRpY2tldEZpbGVJZCxcbiAgc2hvd0xpbmtlZFRpY2tldEZpZWxkLFxuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UsXG4gIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2UsXG4gIG9uRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlLFxuICBvbkRyYWZ0UHJpY2VDaGFuZ2UsXG4gIG9uRHJhZnRRdHlDaGFuZ2UsXG4gIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2UsXG4gIG9uRHJhZnRJbnRlcm5hdGlvbmFsQ2hhbmdlLFxuICBvbk9wZW5MaW5rZWRUaWNrZXQsXG59OiBFeHBlbnNlU2hlZXRMaW5lRm9ybVByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic3BhY2UteS0wXCI+XG4gICAgICA8RXhwZW5zZVNlY3Rpb25EaXZpZGVyXG4gICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lXCIsIFwiTGluZVwiKX1cbiAgICAgICAgY2xhc3NOYW1lPVwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXItLXNwYWNlZFwiXG4gICAgICAgIGxhYmVsQ2xhc3NOYW1lPVwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXJfX2xhYmVsLS10aXRsZVwiXG4gICAgICAvPlxuXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX08L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdERlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XG4gICAgICAgICAgICAgIHZhbHVlPXtzYWZlVGV4dChsaW5lLmRlc2NyaXB0aW9uKSB8fCBcIi1cIn1cbiAgICAgICAgICAgICAgZnVsbFdpZHRoXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7c2hvd0xpbmtlZFRpY2tldEZpZWxkID8gKFxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXtsaW5rZWRUaWNrZXRGaWxlSWR9XG4gICAgICAgICAgICAgIGZ1bGxXaWR0aFxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbk9wZW5MaW5rZWRUaWNrZXR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlzaXRhLWZpZWxkLXRleHRcIj5cbiAgICAgICAgICAgICAgPFNpbmdsZURhdGVQaWNrZXJcbiAgICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3JlYXRlZERhdGVcIiwgXCJEYXRlXCIpfVxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFRyYW5zRGF0ZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdFRyYW5zRGF0ZUNoYW5nZX1cbiAgICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0NyZWF0ZWREYXRlXCIsIFwiRGF0ZVwiKX1cbiAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShcbiAgICAgICAgICAgICAgICBzYWZlVGV4dChsaW5lLnRyYW5zRGF0ZSB8fCBmYWxsYmFja0RhdGUpLFxuICAgICAgICAgICAgICAgIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9UeXBlXCIsIFwiVHlwZVwiKX1cbiAgICAgICAgICAgICAgb3B0aW9ucz17Z2FzdG9UeXBlT3B0aW9uc31cbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0VHlwZVZhbHVlQ29kZSB8fCBcIlwifVxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2V9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9UeXBlXCIsIFwiVHlwZVwiKX1cbiAgICAgICAgICAgICAgdXNlUG9ydGFsPXtmYWxzZX1cbiAgICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVHlwZVwiLCBcIlR5cGVcIil9IHZhbHVlPXtzYWZlVGV4dChsaW5lLnR5cGVWYWx1ZSkgfHwgXCItXCJ9IC8+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJpY2VcIiwgXCJQcmljZVwiKX08L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2lzS21UeXBlID8gXCJmb3JtLWNvbnRyb2wgaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcImZvcm0tY29udHJvbFwifVxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICBpbnB1dE1vZGU9XCJkZWNpbWFsXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRQcmljZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0UHJpY2VDaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxuICAgICAgICAgICAgICAgIG9uQmx1cj17KGV2ZW50KSA9PlxuICAgICAgICAgICAgICAgICAgb25EcmFmdFByaWNlQ2hhbmdlKFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlLCB7XG4gICAgICAgICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgICAgICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICAgICAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBmYWxsYmFjazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9e2lzS21UeXBlfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0ttVHlwZX1cbiAgICAgICAgICAgICAgICBhcmlhLXJlYWRvbmx5PXtpc0ttVHlwZX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9QcmljZVwiLCBcIlByaWNlXCIpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB7aXNLbVR5cGUgJiYgaXNGdWVsUHJpY2VMb2FkaW5nID8gKFxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GdWVsUHJpY2VfTG9hZGluZ1wiLCBcIkxvYWRpbmcgZnVlbCBwcmljZS4uLlwiKX1cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICB7aXNLbVR5cGUgJiYgIWlzRnVlbFByaWNlTG9hZGluZyAmJiBmdWVsUHJpY2VNZXNzYWdlID8gKFxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17ZnVlbFByaWNlTWVzc2FnZUlzRXJyb3IgPyBcInRleHQtZGFuZ2VyIHRleHQtc21cIiA6IFwidGV4dC1zbGF0ZS01MDAgdGV4dC14c1wifT57ZnVlbFByaWNlTWVzc2FnZX08L3A+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJpY2VcIiwgXCJQcmljZVwiKX0gdmFsdWU9e3ByaWNlVGV4dCB8fCBcIi1cIn0gLz5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9RdHlcIiwgXCJRdWFudGl0eVwiKX08L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICBpbnB1dE1vZGU9XCJkZWNpbWFsXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRRdHl9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdFF0eUNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgICAgICAgb25CbHVyPXsoZXZlbnQpID0+XG4gICAgICAgICAgICAgICAgICBvbkRyYWZ0UXR5Q2hhbmdlKFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlLCB7XG4gICAgICAgICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgICAgICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICAgICAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBmYWxsYmFjazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUXR5XCIsIFwiUXVhbnRpdHlcIil9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9RdHlcIiwgXCJRdWFudGl0eVwiKX1cbiAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1hdFF0eVZhbHVlKGxpbmUucXR5KX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQW1vdW50XCIsIFwiQW1vdW50XCIpfSB2YWx1ZT17YW1vdW50VGV4dCB8fCBcIi1cIn0gLz5cblxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXG4gICAgICAgICAgICA8RXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfUHJvamVjdF9QbGFjZWhvbGRlclwiLCBcIlByb2plY3QgaWRcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFByb2plY3RJZH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRQcm9qZWN0SWRDaGFuZ2V9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IHByb2plY3RWYWx1ZSA/IChcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9IHZhbHVlPXtwcm9qZWN0VmFsdWV9IC8+XG4gICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9JbnRlcm5hdGlvbmFsXCIsIFwiSW50ZXJuYXRpb25hbFwiKX1cbiAgICAgICAgICAgICAgb3B0aW9ucz17aW50ZXJuYXRpb25hbE9wdGlvbnN9XG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdEludGVybmF0aW9uYWwgfHwgXCJcIn1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRJbnRlcm5hdGlvbmFsQ2hhbmdlfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfSW50ZXJuYXRpb25hbFwiLCBcIkludGVybmF0aW9uYWxcIil9XG4gICAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XG4gICAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0ludGVybmF0aW9uYWxcIiwgXCJJbnRlcm5hdGlvbmFsXCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17aW50ZXJuYWNpb25hbExhYmVsfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XG4gICAgICAgICAgPHNwYW4+e3N0YXR1c308L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldExpbmVGb3JtO1xuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuXG5leHBvcnQgdHlwZSBFeHBlbnNlSW50ZXJuYXRpb25hbE9wdGlvbiA9IHtcbiAgdmFsdWU6IGJvb2xlYW47XG4gIHRleHQ6IHN0cmluZztcbn07XG5cbi8vIEZpeGVkIGVudW0gZm9yIFwiSW50ZXJuYWNpb25hbFwiIGZpZWxkIGluIGV4cGVuc2Ugc2hlZXQgbGluZXMuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUludGVybmF0aW9uYWxPcHRpb25zID0gKCk6IEV4cGVuc2VJbnRlcm5hdGlvbmFsT3B0aW9uW10gPT4gW1xuICB7IHZhbHVlOiB0cnVlLCB0ZXh0OiBpbmRUKFwiRXhwZW5zZVNoZWV0c19JbnRlcm5hdGlvbmFsX1llc1wiLCBcIlNpXCIpIH0sXG4gIHsgdmFsdWU6IGZhbHNlLCB0ZXh0OiBpbmRUKFwiRXhwZW5zZVNoZWV0c19JbnRlcm5hdGlvbmFsX05vXCIsIFwiTm9cIikgfSxcbl07XG5cbi8vIE1hcHMgbnVsbGFibGUgYm9vbGVhbiB2YWx1ZXMgdG8gZml4ZWQgZW51bSBsYWJlbHMgZm9yIHJlYWQtb25seSByZW5kZXJpbmcuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUludGVybmF0aW9uYWxMYWJlbCA9ICh2YWx1ZTogYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xuICBpZiAodmFsdWUgPT09IHRydWUpIHtcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfSW50ZXJuYXRpb25hbF9ZZXNcIiwgXCJTaVwiKTtcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfSW50ZXJuYXRpb25hbF9Ob1wiLCBcIk5vXCIpO1xuICB9XG5cbiAgcmV0dXJuIFwiLVwiO1xufTtcblxuLy8gUGFyc2VzIHVzZXIgaW5wdXQgYmFjayB0byBudWxsYWJsZSBib29sZWFuIGZvciBmdXR1cmUgZWRpdCBtb2RlLlxuZXhwb3J0IGNvbnN0IHBhcnNlRXhwZW5zZUludGVybmF0aW9uYWxWYWx1ZSA9IChyYXc6IHN0cmluZyB8IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB8IG51bGwgPT4ge1xuICBpZiAocmF3ID09PSB0cnVlIHx8IHJhdyA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gcmF3O1xuICB9XG5cbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3IHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAodmFsdWUgPT09IFwidHJ1ZVwiIHx8IHZhbHVlID09PSBcIjFcIikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHZhbHVlID09PSBcImZhbHNlXCIgfHwgdmFsdWUgPT09IFwiMFwiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVNoZWV0Q3JlYXRlTGluZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldExpbmUsXG4gIEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBwYXJzZUV4cGVuc2VJbnRlcm5hdGlvbmFsVmFsdWUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2ludGVybmF0aW9uYWxPcHRpb25zLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSwgdG9FeHBlbnNlQXBpRGRNbVl5eXkgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xuaW1wb3J0IHsgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbiwgcGFyc2VEZWNpbWFsSW5wdXQgfSBmcm9tIFwiLi4vaG9va3MvZXhwZW5zZU11dGF0aW9uVXRpbHMudHNcIjtcbmltcG9ydCB7XG4gIGNyZWF0ZUV4cGVuc2VTaGVldCxcbiAgZGVsZXRlRXhwZW5zZVNoZWV0TGluZSxcbiAgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0LFxuICBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRGaWxlLFxuICB1cGRhdGVFeHBlbnNlU2hlZXRMaW5lLFxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxNdXRhdGlvbnNBcmdzID0ge1xuICBidXN5OiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcbiAgaXNFZGl0TG9ja2VkOiBib29sZWFuO1xuICBpc0RlbGV0ZUxvY2tlZDogYm9vbGVhbjtcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIHNoZWV0SWQ6IHN0cmluZztcbiAgbGluZUlkOiBzdHJpbmc7XG4gIGxpbmU6IEV4cGVuc2VTaGVldExpbmUgfCBudWxsO1xuICBsaW5rZWRUaWNrZXRGaWxlSWQ6IHN0cmluZztcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xuICBkcmFmdFR5cGVWYWx1ZUNvZGU6IHN0cmluZztcbiAgZHJhZnRQcmljZTogc3RyaW5nO1xuICBkcmFmdFF0eTogc3RyaW5nO1xuICBkcmFmdFByb2plY3RJZDogc3RyaW5nO1xuICBkcmFmdEludGVybmF0aW9uYWw6IHN0cmluZztcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIG9uQ3JlYXRlU3VjY2VzczogKCkgPT4gdm9pZDtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUxpbmVEYXRlID0gKHJhdzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIHRvRXhwZW5zZUFwaURkTW1ZeXl5KHJhdyk7XG59O1xuXG5jb25zdCBwYXJzZU51bWJlciA9IChyYXc6IHN0cmluZyk6IG51bWJlciB8IG51bGwgPT4gcGFyc2VEZWNpbWFsSW5wdXQocmF3KTtcblxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgZXhwZW5zZSBzaGVldCBsaW5lIGRldGFpbC5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zID0gKHtcbiAgYnVzeSxcbiAgaXNFZGl0aW5nLFxuICBpc0NyZWF0ZU1vZGUsXG4gIGlzRWRpdExvY2tlZCxcbiAgaXNEZWxldGVMb2NrZWQsXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXG4gIGNhbkVkaXRFeHBlbnNlLFxuICBjYW5EZWxldGVFeHBlbnNlLFxuICBzaGVldElkLFxuICBsaW5lSWQsXG4gIGxpbmUsXG4gIGxpbmtlZFRpY2tldEZpbGVJZCxcbiAgZHJhZnREZXNjcmlwdGlvbixcbiAgZHJhZnRUcmFuc0RhdGUsXG4gIGRyYWZ0VHlwZVZhbHVlQ29kZSxcbiAgZHJhZnRQcmljZSxcbiAgZHJhZnRRdHksXG4gIGRyYWZ0UHJvamVjdElkLFxuICBkcmFmdEludGVybmF0aW9uYWwsXG4gIHNldE1vZGFsRXJyb3IsXG4gIHNldEJ1c3ksXG4gIHNldFN0YXR1cyxcbiAgc2V0SXNFZGl0aW5nLFxuICBvbkNyZWF0ZVN1Y2Nlc3MsXG59OiBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xuICBjb25zdCBpc05vdEZvdW5kRXJyb3IgPSAoZXJyb3I6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDA0O1xuICB9O1xuXG4gIGNvbnN0IGlzTWlzc2luZ1RpY2tldEZpbGVNZXNzYWdlID0gKG1lc3NhZ2U6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKG1lc3NhZ2UgfHwgXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gKFxuICAgICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImFyY2hpdm8gYXNvY2lhZG9cIikgfHxcbiAgICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhcmNoaXZvIGFkanVudG9cIikgfHxcbiAgICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhc3NvY2lhdGVkIGZpbGVcIikgfHxcbiAgICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhdHRhY2hlZCBmaWxlXCIpXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGJ1c3kgfHwgIWlzRWRpdGluZykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChpc0VkaXRMb2NrZWQpIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IGNhblByb2NlZWQgPSBpc0NyZWF0ZU1vZGUgPyBjYW5DcmVhdGVFeHBlbnNlIDogY2FuRWRpdEV4cGVuc2U7XG4gICAgaWYgKCFjYW5Qcm9jZWVkKSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9ybWFsaXplZERhdGUgPSBub3JtYWxpemVMaW5lRGF0ZShkcmFmdFRyYW5zRGF0ZSk7XG4gICAgY29uc3QgcGFyc2VkVHlwZVZhbHVlID0gTnVtYmVyLnBhcnNlSW50KFN0cmluZyhkcmFmdFR5cGVWYWx1ZUNvZGUgfHwgXCJcIikudHJpbSgpLCAxMCk7XG4gICAgY29uc3QgcGFyc2VkUHJpY2UgPSBwYXJzZU51bWJlcihkcmFmdFByaWNlKTtcbiAgICBjb25zdCBwYXJzZWRRdHkgPSBwYXJzZU51bWJlcihkcmFmdFF0eSk7XG4gICAgY29uc3QgcGFyc2VkSW50ZXJuYXRpb25hbCA9IHBhcnNlRXhwZW5zZUludGVybmF0aW9uYWxWYWx1ZShkcmFmdEludGVybmF0aW9uYWwpO1xuXG4gICAgY29uc3QgaGFzVmFsaWRRdHlQcmljZSA9IHBhcnNlZFF0eSAhPSBudWxsICYmIHBhcnNlZFF0eSA+IDAgJiYgcGFyc2VkUHJpY2UgIT0gbnVsbCAmJiBwYXJzZWRQcmljZSA+IDA7XG4gICAgaWYgKCFoYXNWYWxpZFF0eVByaWNlKSB7XG4gICAgICBjb25zdCB2YWxpZGF0aW9uTWVzc2FnZSA9IGluZFQoXG4gICAgICAgIFwiRXhwZW5zZVNoZWV0c19MaW5lX1ZhbGlkYXRpb25fQW1vdW50UXR5XCIsXG4gICAgICAgIFwiUXVhbnRpdHkgYW5kIHByaWNlIG11c3QgYmUgZ3JlYXRlciB0aGFuIDAuXCJcbiAgICAgICk7XG4gICAgICBzZXRNb2RhbEVycm9yKHZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICAgIHNldFN0YXR1cyh2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFub3JtYWxpemVkRGF0ZSkge1xuICAgICAgc2V0TW9kYWxFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgICAgIHNldFN0YXR1cyhFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZShwYXJzZWRUeXBlVmFsdWUpIHx8IHBhcnNlZFR5cGVWYWx1ZSA8PSAwKSB7XG4gICAgICBjb25zdCB2YWxpZGF0aW9uTWVzc2FnZSA9IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcbiAgICAgIHNldE1vZGFsRXJyb3IodmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgICAgc2V0U3RhdHVzKHZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcbiAgICAgIHN0YXJ0U3RhdHVzOiBpc0NyZWF0ZU1vZGVcbiAgICAgICAgPyBpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9DcmVhdGluZ1wiLCBcIkNyZWF0aW5nIGV4cGVuc2UgbGluZS4uLlwiKVxuICAgICAgICA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgZXhwZW5zZSBsaW5lLi4uXCIpLFxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXG4gICAgICBzZXRNb2RhbEVycm9yLFxuICAgICAgc2V0QnVzeSxcbiAgICAgIHNldFN0YXR1cyxcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBjb21tb25MaW5lUGF5bG9hZCA9IHtcbiAgICAgICAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWREYXRlLFxuICAgICAgICAgIHR5cGVWYWx1ZTogcGFyc2VkVHlwZVZhbHVlLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoZHJhZnREZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXG4gICAgICAgICAgaW50ZXJuYWNpb25hbDogcGFyc2VkSW50ZXJuYXRpb25hbCA/PyBsaW5lPy5pbnRlcm5hY2lvbmFsID8/IGZhbHNlLFxuICAgICAgICAgIHRpY2tldDogbGluZT8udGlja2V0ID09PSB0cnVlLFxuICAgICAgICAgIHF0eTogTnVtYmVyKHBhcnNlZFF0eSksXG4gICAgICAgICAgcHJpY2U6IE51bWJlcihwYXJzZWRQcmljZSksXG4gICAgICAgICAgcHJvaklkOiBTdHJpbmcoZHJhZnRQcm9qZWN0SWQgfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICBpbmRBdHRhY2hGaWxlczogc2FmZVRleHQobGluZT8uaW5kQXR0YWNoRmlsZXMpLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGNyZWF0ZUxpbmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRDcmVhdGVMaW5lUmVxdWVzdCA9IGNvbW1vbkxpbmVQYXlsb2FkO1xuICAgICAgICBjb25zdCB1cGRhdGVMaW5lUGF5bG9hZDogRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlcXVlc3QgPSBjb21tb25MaW5lUGF5bG9hZDtcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGlzQ3JlYXRlTW9kZVxuICAgICAgICAgID8gYXdhaXQgY3JlYXRlRXhwZW5zZVNoZWV0KHtcbiAgICAgICAgICAgICAgbW9kZTogMixcbiAgICAgICAgICAgICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IHNoZWV0SWQsXG4gICAgICAgICAgICAgIGxpbmVzOiBbY3JlYXRlTGluZVBheWxvYWRdLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICA6IGF3YWl0IHVwZGF0ZUV4cGVuc2VTaGVldExpbmUoc2hlZXRJZCwgbGluZUlkLCB1cGRhdGVMaW5lUGF5bG9hZCk7XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfQ3JlYXRlZFwiLCBcIkV4cGVuc2UgbGluZSBjcmVhdGVkXCIpKTtcbiAgICAgICAgICBvbkNyZWF0ZVN1Y2Nlc3MoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2UgbGluZSB1cGRhdGVkXCIpKTtcbiAgICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQub2s7XG4gIH0sIFtcbiAgICBidXN5LFxuICAgIGNhbkNyZWF0ZUV4cGVuc2UsXG4gICAgY2FuRWRpdEV4cGVuc2UsXG4gICAgZHJhZnRQcmljZSxcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0SW50ZXJuYXRpb25hbCxcbiAgICBkcmFmdFByb2plY3RJZCxcbiAgICBkcmFmdFF0eSxcbiAgICBkcmFmdFRyYW5zRGF0ZSxcbiAgICBkcmFmdFR5cGVWYWx1ZUNvZGUsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzRWRpdExvY2tlZCxcbiAgICBpc0VkaXRpbmcsXG4gICAgbGluZSxcbiAgICBsaW5lSWQsXG4gICAgb25DcmVhdGVTdWNjZXNzLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0SXNFZGl0aW5nLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0U3RhdHVzLFxuICAgIHNoZWV0SWQsXG4gIF0pO1xuXG4gIGNvbnN0IGhhbmRsZURlbGV0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChpc0RlbGV0ZUxvY2tlZCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY2FuRGVsZXRlRXhwZW5zZSkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xuICAgICAgc3RhcnRTdGF0dXM6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVfRGV0YWlsX0RlbGV0aW5nXCIsIFwiRGVsZXRpbmcgZXhwZW5zZSBsaW5lLi4uXCIpLFxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIiksXG4gICAgICBzZXRNb2RhbEVycm9yLFxuICAgICAgc2V0QnVzeSxcbiAgICAgIHNldFN0YXR1cyxcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBzYWZlTGlua2VkVGlja2V0RmlsZUlkID0gc2FmZVRleHQobGlua2VkVGlja2V0RmlsZUlkKTtcbiAgICAgICAgaWYgKHNhZmVMaW5rZWRUaWNrZXRGaWxlSWQpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZGVsZXRlRmlsZVJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0RmlsZShzYWZlTGlua2VkVGlja2V0RmlsZUlkKTtcbiAgICAgICAgICAgIGlmICghZGVsZXRlRmlsZVJlc3BvbnNlLlN1Y2Nlc3MgJiYgIWlzTWlzc2luZ1RpY2tldEZpbGVNZXNzYWdlKGRlbGV0ZUZpbGVSZXNwb25zZS5NZXNzYWdlKSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGVsZXRlRmlsZVJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKCFpc05vdEZvdW5kRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBkZWxldGVUaWNrZXRSZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldChzYWZlTGlua2VkVGlja2V0RmlsZUlkKTtcbiAgICAgICAgICAgIGlmICghZGVsZXRlVGlja2V0UmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGVsZXRlVGlja2V0UmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoIWlzTm90Rm91bmRFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRMaW5lKHNoZWV0SWQsIGxpbmVJZCk7XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9EZWxldGVkXCIsIFwiRXhwZW5zZSBsaW5lIGRlbGV0ZWRcIikpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xuICB9LCBbXG4gICAgYnVzeSxcbiAgICBjYW5EZWxldGVFeHBlbnNlLFxuICAgIGlzRGVsZXRlTG9ja2VkLFxuICAgIGxpbmVJZCxcbiAgICBsaW5rZWRUaWNrZXRGaWxlSWQsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldFN0YXR1cyxcbiAgICBzaGVldElkLFxuICBdKTtcblxuICByZXR1cm4ge1xuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zIH0gZnJvbSBcIi4uL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50c1wiO1xuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcblxudHlwZSBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XG4gIGlzTG9ja2VkOiBib29sZWFuO1xuICBhY3Rpb25Nb2RlPzogXCJkZWZhdWx0XCIgfCBcImRlbGV0ZV9vbmx5XCIgfCBcInZpZXdfb25seVwiO1xuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xuICBjYW5FZGl0RXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRGVsZXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgc2hlZXRJZDogc3RyaW5nO1xuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICBoYW5kbGVEZWxldGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XG4gIG9wZW5Db25maXJtOiAob3B0czoge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XG4gIH0pID0+IHZvaWQ7XG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcbn07XG5cbi8vIENvb3JkaW5hdGVzIHRvcGJhciBpY29uIHN0YXRlIGFuZCBkaXNwYXRjaCBhY3Rpb25zIGZvciBleHBlbnNlIHNoZWV0IGxpbmUgZGV0YWlsLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcbiAgYnVzeSxcbiAgbW9kYWxPcGVuLFxuICBpc0VkaXRpbmcsXG4gIGlzQ3JlYXRlTW9kZSxcbiAgaXNMb2NrZWQsXG4gIGFjdGlvbk1vZGUgPSBcImRlZmF1bHRcIixcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgY2FuRWRpdEV4cGVuc2UsXG4gIGNhbkRlbGV0ZUV4cGVuc2UsXG4gIHNoZWV0SWQsXG4gIHNldE1vZGFsRXJyb3IsXG4gIGhhbmRsZUVuYWJsZUVkaXQsXG4gIGhhbmRsZUNhbmNlbEVkaXQsXG4gIGhhbmRsZVVwZGF0ZSxcbiAgaGFuZGxlRGVsZXRlLFxuICBvblNhdmVTdWNjZXNzLFxuICBvcGVuQ29uZmlybSxcbiAgY2xvc2VDb25maXJtLFxufTogVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnNBcmdzKSA9PiB7XG4gIHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyh7XG4gICAgaWRzOiB7XG4gICAgICBlZGl0SWNvbklkOiBcImV4cGVuc2VMaW5lRWRpdEljb25cIixcbiAgICAgIHNhdmVJY29uSWQ6IFwiZXhwZW5zZUxpbmVTYXZlSWNvblwiLFxuICAgICAgZGVsZXRlQnRuSWQ6IFwiZXhwZW5zZUxpbmVEZWxldGVCdG5cIixcbiAgICAgIGNhbmNlbEJ0bklkOiBcImV4cGVuc2VMaW5lQ2FuY2VsQnRuXCIsXG4gICAgfSxcbiAgICBldmVudHM6IHtcbiAgICAgIGVkaXRFdmVudDogXCJleHBlbnNlLWxpbmUtZGV0YWlsLWVkaXRcIixcbiAgICAgIGRlbGV0ZUV2ZW50OiBcImV4cGVuc2UtbGluZS1kZXRhaWwtZGVsZXRlXCIsXG4gICAgICBjYW5jZWxFdmVudDogXCJleHBlbnNlLWxpbmUtZGV0YWlsLWNhbmNlbC1lZGl0XCIsXG4gICAgfSxcbiAgICBidXN5LFxuICAgIG1vZGFsT3BlbixcbiAgICBpc0VkaXRpbmcsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzTG9ja2VkLFxuICAgIGFjdGlvbk1vZGUsXG4gICAgY2FuQ3JlYXRlOiBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGNhbkVkaXQ6IGNhbkVkaXRFeHBlbnNlLFxuICAgIGNhbkRlbGV0ZTogY2FuRGVsZXRlRXhwZW5zZSxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVTYXZlOiBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIHNhdmVDb25maXJtVGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19UaXRsZVwiLCBcIlNhdmUgY2hhbmdlc1wiKSxcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gc2F2ZSBjaGFuZ2VzP1wiKSxcbiAgICBzYXZlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXG4gICAgZGVsZXRlQ29uZmlybVRpdGxlOiBpbmRUKFwiQ29uZmlybV9EZWxldGVfVGl0bGVcIiwgXCJEZWxldGVcIiksXG4gICAgZGVsZXRlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgaXRlbT9cIiksXG4gICAgZGVsZXRlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpLFxuICAgIG9uU2F2ZVN1Y2Nlc3MsXG4gICAgb25EZWxldGVTdWNjZXNzOiAoKSA9PiB7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNoZWV0SWQpfWApO1xuICAgIH0sXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgY2xvc2VDb25maXJtLFxuICB9KTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldEhlYWRlciwgRXhwZW5zZVNoZWV0TGluZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsLCBnZXRGdWVsUHJpY2VLbSwgbWFwRXhwZW5zZVNoZWV0SGVhZGVyLCBtYXBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7XG4gIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCxcbiAgbmF2aWdhdGVUb0V4cGVuc2VVcmwsXG4gIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuaW1wb3J0IHsgaGFzQXNzaWduZWRWb3VjaGVyLCBwYXJzZUV4cGVuc2VEYXRlLCBzYWZlVGV4dCwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFLCB0b0V4cGVuc2VBcGlEZE1tWXl5eSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xuXG5jb25zdCBLTV9HQVNUT19UWVBFX0NPREUgPSBcIjNcIjtcbmNvbnN0IEZVRUxfUFJJQ0VfREVCT1VOQ0VfTVMgPSAzMDA7XG5jb25zdCBGVUVMX1BSSUNFX1NPVVJDRV9VU0VSX0NPTkZJRyA9IFwiQ1JNSG9qYUdhc3Rvc1VzZXJQcmljZUttRmVjaGFUYWJsZVwiO1xuY29uc3QgRlVFTF9QUklDRV9TT1VSQ0VfR0xPQkFMX0NPTkZJRyA9IFwiQ1JNUGFyYW1ldGVyc1wiO1xuY29uc3QgRVhQRU5TRV9TVEFUVVNfQVBQUk9WRUQgPSAyO1xuY29uc3QgRVhQRU5TRV9TVEFUVVNfUEFJRCA9IDQ7XG5cbmNvbnN0IHRvSW5wdXREYXRlID0gKHJhdz86IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcbiAgcmV0dXJuIHBhcnNlZCA/IHRvSXNvRGF0ZShwYXJzZWQpIDogXCJcIjtcbn07XG5cbmNvbnN0IGZvcm1hdEVkaXRhYmxlTnVtYmVyID0gKHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcih2YWx1ZSwge1xuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgZmFsbGJhY2s6IFwiXCIsXG4gIH0pO1xufTtcblxuY29uc3QgZm9ybWF0RWRpdGFibGVRdWFudGl0eSA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIodmFsdWUsIHtcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgIGZhbGxiYWNrOiBcIlwiLFxuICB9KTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUZ1ZWxUcmFuc0RhdGUgPSAocmF3OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gdG9FeHBlbnNlQXBpRGRNbVl5eXkocmF3KTtcbn07XG5cbi8vIFJlc29sdmVzIGxvY2FsaXplZCBmdWVsIHByaWNlIHNvdXJjZSBtZXNzYWdlcyBmb3Iga25vd24gYmFja2VuZCBzb3VyY2VzLlxuY29uc3QgcmVzb2x2ZUZ1ZWxQcmljZVNvdXJjZU1lc3NhZ2UgPSAoc291cmNlOiBzdHJpbmcsIGVmZmVjdGl2ZURhdGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRTb3VyY2UgPSBzYWZlVGV4dChzb3VyY2UpO1xuICBpZiAobm9ybWFsaXplZFNvdXJjZSA9PT0gRlVFTF9QUklDRV9TT1VSQ0VfVVNFUl9DT05GSUcpIHtcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfRnVlbFByaWNlX1NvdXJjZV9Vc2VyQ29uZmlnXCIsIFwiT2J0YWluZWQgYnkgdXNlciBjb25maWd1cmF0aW9uLlwiKTtcbiAgfVxuXG4gIGlmIChub3JtYWxpemVkU291cmNlID09PSBGVUVMX1BSSUNFX1NPVVJDRV9HTE9CQUxfQ09ORklHKSB7XG4gICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0Z1ZWxQcmljZV9Tb3VyY2VfR2xvYmFsQ29uZmlnXCIsIFwiT2J0YWluZWQgYnkgZ2xvYmFsIGNvbmZpZ3VyYXRpb24uXCIpO1xuICB9XG5cbiAgY29uc3Qgc291cmNlTGFiZWwgPSBpbmRUKFwiRXhwZW5zZVNoZWV0c19GdWVsUHJpY2VfU291cmNlXCIsIFwiRnVlbCBwcmljZSBzb3VyY2VcIik7XG4gIGlmICghbm9ybWFsaXplZFNvdXJjZSkge1xuICAgIHJldHVybiBlZmZlY3RpdmVEYXRlID8gYCR7c291cmNlTGFiZWx9OiAke2VmZmVjdGl2ZURhdGV9YCA6IHNvdXJjZUxhYmVsO1xuICB9XG5cbiAgcmV0dXJuIGVmZmVjdGl2ZURhdGVcbiAgICA/IGAke3NvdXJjZUxhYmVsfTogJHtub3JtYWxpemVkU291cmNlfSAoJHtlZmZlY3RpdmVEYXRlfSlgXG4gICAgOiBgJHtzb3VyY2VMYWJlbH06ICR7bm9ybWFsaXplZFNvdXJjZX1gO1xufTtcblxuY29uc3QgYnVpbGRDcmVhdGVMaW5lRHJhZnQgPSAoYmFzZURhdGU6IHN0cmluZywgcHJvamVjdElkOiBzdHJpbmcpOiBFeHBlbnNlU2hlZXRMaW5lID0+IHtcbiAgcmV0dXJuIHtcbiAgICBsaW5lUmVjSWQ6IFwiXCIsXG4gICAgdHJhbnNEYXRlOiBiYXNlRGF0ZSxcbiAgICB0eXBlVmFsdWU6IFwiXCIsXG4gICAgdHlwZVZhbHVlQ29kZTogXCJcIixcbiAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICBpbnRlcm5hY2lvbmFsOiBmYWxzZSxcbiAgICB0aWNrZXQ6IGZhbHNlLFxuICAgIHByaWNlOiBudWxsLFxuICAgIHF0eTogMSxcbiAgICBhbW91bnQ6IG51bGwsXG4gICAgcHJvaklkOiBwcm9qZWN0SWQsXG4gICAgaW5kQXR0YWNoRmlsZXM6IFwiXCIsXG4gIH07XG59O1xuXG50eXBlIFVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZUFyZ3MgPSB7XG4gIGhhc0FjY2VzczogYm9vbGVhbjtcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XG4gIHNoZWV0SWQ6IHN0cmluZztcbiAgbGluZUlkOiBzdHJpbmc7XG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBPd25zIHN0YXRlIGFuZCBiZWhhdmlvciBmb3IgZXhwZW5zZSBsaW5lIGRldGFpbCBwYWdlIChyZWFkLCBlZGl0LCBjcmVhdGUpLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZSA9ICh7XG4gIGhhc0FjY2VzcyxcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgY2FuRWRpdEV4cGVuc2UsXG4gIHNoZWV0SWQsXG4gIGxpbmVJZCxcbiAgaXNDcmVhdGVNb2RlLFxuICBvbkZvcmJpZGRlbixcbn06IFVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZUFyZ3MpID0+IHtcbiAgY29uc3QgW2hlYWRlciwgc2V0SGVhZGVyXSA9IHVzZVN0YXRlPEV4cGVuc2VTaGVldEhlYWRlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbGluZSwgc2V0TGluZV0gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRMaW5lIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtpc0VkaXRpbmcsIHNldElzRWRpdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnREZXNjcmlwdGlvbiwgc2V0RHJhZnREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0VHJhbnNEYXRlLCBzZXREcmFmdFRyYW5zRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0VHlwZVZhbHVlQ29kZSwgc2V0RHJhZnRUeXBlVmFsdWVDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRQcmljZSwgc2V0RHJhZnRQcmljZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0UXR5LCBzZXREcmFmdFF0eV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0UHJvamVjdElkLCBzZXREcmFmdFByb2plY3RJZF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0SW50ZXJuYXRpb25hbCwgc2V0RHJhZnRJbnRlcm5hdGlvbmFsXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbaXNGdWVsUHJpY2VMb2FkaW5nLCBzZXRJc0Z1ZWxQcmljZUxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZnVlbFByaWNlTWVzc2FnZSwgc2V0RnVlbFByaWNlTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2Z1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yLCBzZXRGdWVsUHJpY2VNZXNzYWdlSXNFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaHlkcmF0ZURyYWZ0RnJvbUxpbmUgPSB1c2VDYWxsYmFjaygobmV4dExpbmU6IEV4cGVuc2VTaGVldExpbmUgfCBudWxsLCBuZXh0SGVhZGVyOiBFeHBlbnNlU2hlZXRIZWFkZXIgfCBudWxsKSA9PiB7XG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbihzYWZlVGV4dChuZXh0TGluZT8uZGVzY3JpcHRpb24pKTtcbiAgICBzZXREcmFmdFRyYW5zRGF0ZSh0b0lucHV0RGF0ZShuZXh0TGluZT8udHJhbnNEYXRlIHx8IG5leHRIZWFkZXI/LmNyZWF0ZWREYXRlKSk7XG4gICAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlKHNhZmVUZXh0KG5leHRMaW5lPy50eXBlVmFsdWVDb2RlKSk7XG4gICAgc2V0RHJhZnRQcmljZShmb3JtYXRFZGl0YWJsZU51bWJlcihuZXh0TGluZT8ucHJpY2UpKTtcbiAgICBzZXREcmFmdFF0eShmb3JtYXRFZGl0YWJsZVF1YW50aXR5KG5leHRMaW5lPy5xdHkpKTtcbiAgICBzZXREcmFmdFByb2plY3RJZChzYWZlVGV4dChuZXh0TGluZT8ucHJvaklkIHx8IG5leHRIZWFkZXI/LnByb2pJZCkpO1xuICAgIHNldERyYWZ0SW50ZXJuYXRpb25hbChuZXh0TGluZT8uaW50ZXJuYWNpb25hbCA9PT0gdHJ1ZSA/IFwidHJ1ZVwiIDogbmV4dExpbmU/LmludGVybmFjaW9uYWwgPT09IGZhbHNlID8gXCJmYWxzZVwiIDogXCJcIik7XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGxvYWREZXRhaWwgPSBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoIWhhc0FjY2Vzcykge1xuICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghc2hlZXRJZCkge1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IGxpbmUgd2FzIG5vdCBmb3VuZC5cIikpO1xuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgIHNldExpbmUobnVsbCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICAgICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlKSB7XG4gICAgICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwoc2hlZXRJZCwge1xuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgbGluZSBkZXRhaWwuXCIpKTtcbiAgICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgICAgIHNldExpbmUobnVsbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgc2hlZXRzID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZFNoZWV0ID1cbiAgICAgICAgICAgIHNoZWV0cy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnk/LkhvamFHYXN0b3NJZCkudG9VcHBlckNhc2UoKSA9PT0gc2hlZXRJZC50cmltKCkudG9VcHBlckNhc2UoKSkgfHwgc2hlZXRzWzBdO1xuXG4gICAgICAgICAgaWYgKCFzZWxlY3RlZFNoZWV0KSB7XG4gICAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IGxpbmUgd2FzIG5vdCBmb3VuZC5cIikpO1xuICAgICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICAgICAgc2V0TGluZShudWxsKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBsb2FkZWRIZWFkZXIgPSBtYXBFeHBlbnNlU2hlZXRIZWFkZXIoc2VsZWN0ZWRTaGVldCk7XG4gICAgICAgICAgY29uc3QgbG9hZGVkU3RhdHVzQ29kZSA9IHR5cGVvZiBsb2FkZWRIZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzID09PSBcIm51bWJlclwiID8gbG9hZGVkSGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA6IG51bGw7XG4gICAgICAgICAgY29uc3QgaXNDcmVhdGVMb2NrZWRTdGF0dXMgPSBsb2FkZWRTdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRCB8fCBsb2FkZWRTdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19QQUlEO1xuICAgICAgICAgIGlmIChpc0NyZWF0ZUxvY2tlZFN0YXR1cyB8fCBoYXNBc3NpZ25lZFZvdWNoZXIobG9hZGVkSGVhZGVyLnZvdWNoZXIpKSB7XG4gICAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1BhaWRSZWFkT25seVwiLCBcIlBhaWQgZXhwZW5zZSBzaGVldHMgYXJlIHJlYWQtb25seS5cIikpO1xuICAgICAgICAgICAgc2V0SGVhZGVyKGxvYWRlZEhlYWRlcik7XG4gICAgICAgICAgICBzZXRMaW5lKG51bGwpO1xuICAgICAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBkcmFmdExpbmUgPSBidWlsZENyZWF0ZUxpbmVEcmFmdCh0b0lzb0RhdGUobmV3IERhdGUoKSksIHNhZmVUZXh0KGxvYWRlZEhlYWRlci5wcm9qSWQpKTtcbiAgICAgICAgICBzZXRIZWFkZXIobG9hZGVkSGVhZGVyKTtcbiAgICAgICAgICBzZXRMaW5lKGRyYWZ0TGluZSk7XG4gICAgICAgICAgc2V0SXNFZGl0aW5nKHRydWUpO1xuICAgICAgICAgIGh5ZHJhdGVEcmFmdEZyb21MaW5lKGRyYWZ0TGluZSwgbG9hZGVkSGVhZGVyKTtcbiAgICAgICAgICBzZXRTdGF0dXMoXCJcIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFsaW5lSWQpIHtcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IGxpbmUgd2FzIG5vdCBmb3VuZC5cIikpO1xuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgICBzZXRMaW5lKG51bGwpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwoc2hlZXRJZCwge1xuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlPy5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGxpbmUgZGV0YWlsLlwiKSk7XG4gICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICAgIHNldExpbmUobnVsbCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2hlZXRzID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRTaGVldCA9XG4gICAgICAgICAgc2hlZXRzLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uSG9qYUdhc3Rvc0lkKS50b1VwcGVyQ2FzZSgpID09PSBzaGVldElkLnRyaW0oKS50b1VwcGVyQ2FzZSgpKSB8fCBzaGVldHNbMF07XG5cbiAgICAgICAgaWYgKCFzZWxlY3RlZFNoZWV0KSB7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCBsaW5lIHdhcyBub3QgZm91bmQuXCIpKTtcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgICAgc2V0TGluZShudWxsKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtYXBwZWRIZWFkZXIgPSBtYXBFeHBlbnNlU2hlZXRIZWFkZXIoc2VsZWN0ZWRTaGVldCk7XG4gICAgICAgIGNvbnN0IG1hcHBlZExpbmVzID0gKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRTaGVldC5MaW5lcykgPyBzZWxlY3RlZFNoZWV0LkxpbmVzIDogW10pLm1hcCgoZW50cnkpID0+XG4gICAgICAgICAgbWFwRXhwZW5zZVNoZWV0TGluZShlbnRyeSlcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRMaW5lID1cbiAgICAgICAgICBtYXBwZWRMaW5lcy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnkubGluZVJlY0lkKS50b1VwcGVyQ2FzZSgpID09PSBsaW5lSWQudHJpbSgpLnRvVXBwZXJDYXNlKCkpIHx8IG51bGw7XG5cbiAgICAgICAgaWYgKCFzZWxlY3RlZExpbmUpIHtcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IGxpbmUgd2FzIG5vdCBmb3VuZC5cIikpO1xuICAgICAgICAgIHNldEhlYWRlcihtYXBwZWRIZWFkZXIpO1xuICAgICAgICAgIHNldExpbmUobnVsbCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0SGVhZGVyKG1hcHBlZEhlYWRlcik7XG4gICAgICAgIHNldExpbmUoc2VsZWN0ZWRMaW5lKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGxpbmUgZGV0YWlsLlwiKSk7XG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgc2V0TGluZShudWxsKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZvaWQgbG9hZERldGFpbCgpO1xuICB9LCBbY2FuQ3JlYXRlRXhwZW5zZSwgaGFzQWNjZXNzLCBoeWRyYXRlRHJhZnRGcm9tTGluZSwgaXNDcmVhdGVNb2RlLCBsaW5lSWQsIG9uRm9yYmlkZGVuLCBzaGVldElkXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWxpbmUgfHwgaXNFZGl0aW5nKSByZXR1cm47XG4gICAgaHlkcmF0ZURyYWZ0RnJvbUxpbmUobGluZSwgaGVhZGVyKTtcbiAgfSwgW2hlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUxpbmUsIGlzRWRpdGluZywgbGluZV0pO1xuXG4gIGNvbnN0IG5vcm1hbGl6ZWREcmFmdFR5cGVWYWx1ZUNvZGUgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KGRyYWZ0VHlwZVZhbHVlQ29kZSksIFtkcmFmdFR5cGVWYWx1ZUNvZGVdKTtcbiAgY29uc3Qgbm9ybWFsaXplZEZ1ZWxUcmFuc0RhdGUgPSB1c2VNZW1vKCgpID0+IG5vcm1hbGl6ZUZ1ZWxUcmFuc0RhdGUoZHJhZnRUcmFuc0RhdGUpLCBbZHJhZnRUcmFuc0RhdGVdKTtcbiAgY29uc3QgaXNLbVR5cGUgPSBub3JtYWxpemVkRHJhZnRUeXBlVmFsdWVDb2RlID09PSBLTV9HQVNUT19UWVBFX0NPREU7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgaXNDYW5jZWxsZWQgPSBmYWxzZTtcbiAgICBsZXQgdGltZXI6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlciB8IG51bGwgPSBudWxsO1xuXG4gICAgY29uc3QgY2xlYXJQZW5kaW5nID0gKCkgPT4ge1xuICAgICAgaWYgKHRpbWVyKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmIChjb250cm9sbGVyKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICAgICAgY29udHJvbGxlciA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICghaXNFZGl0aW5nIHx8ICFpc0ttVHlwZSkge1xuICAgICAgc2V0SXNGdWVsUHJpY2VMb2FkaW5nKGZhbHNlKTtcbiAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlSXNFcnJvcihmYWxzZSk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBjbGVhclBlbmRpbmcoKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKCFub3JtYWxpemVkRnVlbFRyYW5zRGF0ZSkge1xuICAgICAgc2V0SXNGdWVsUHJpY2VMb2FkaW5nKGZhbHNlKTtcbiAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2UoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNsZWFyUGVuZGluZygpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aW1lciA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgIHNldElzRnVlbFByaWNlTG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlSXNFcnJvcihmYWxzZSk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ2V0RnVlbFByaWNlS20obm9ybWFsaXplZEZ1ZWxUcmFuc0RhdGUsIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MgfHwgIXJlc3BvbnNlLkRhdGEgfHwgIU51bWJlci5pc0Zpbml0ZShOdW1iZXIocmVzcG9uc2UuRGF0YS5QcmljZUttKSkpIHtcbiAgICAgICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlKFxuICAgICAgICAgICAgc2FmZVRleHQocmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRnVlbFByaWNlX05vdEZvdW5kXCIsIFwiQ291bGQgbm90IGxvYWQgZnVlbCBwcmljZSBmb3Iga20uXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNvbHZlZFByaWNlID0gTnVtYmVyKHJlc3BvbnNlLkRhdGEuUHJpY2VLbSk7XG4gICAgICAgIGlmIChyZXNvbHZlZFByaWNlID4gMCkge1xuICAgICAgICAgIHNldERyYWZ0UHJpY2UoZm9ybWF0RWRpdGFibGVOdW1iZXIocmVzb2x2ZWRQcmljZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc291cmNlID0gc2FmZVRleHQocmVzcG9uc2UuRGF0YS5Tb3VyY2UpO1xuICAgICAgICBjb25zdCBlZmZlY3RpdmVEYXRlID0gc2FmZVRleHQocmVzcG9uc2UuRGF0YS5UcmFuc0RhdGUpIHx8IG5vcm1hbGl6ZWRGdWVsVHJhbnNEYXRlO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gcmVzb2x2ZUZ1ZWxQcmljZVNvdXJjZU1lc3NhZ2Uoc291cmNlLCBlZmZlY3RpdmVEYXRlKTtcbiAgICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikgcmV0dXJuO1xuXG4gICAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2UoXG4gICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBFcnJvclxuICAgICAgICAgICAgPyBlcnJvci5tZXNzYWdlXG4gICAgICAgICAgICA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0Z1ZWxQcmljZV9Ob3RGb3VuZFwiLCBcIkNvdWxkIG5vdCBsb2FkIGZ1ZWwgcHJpY2UgZm9yIGttLlwiKVxuICAgICAgICApO1xuICAgICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmICghaXNDYW5jZWxsZWQpIHtcbiAgICAgICAgICBzZXRJc0Z1ZWxQcmljZUxvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgRlVFTF9QUklDRV9ERUJPVU5DRV9NUyk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaXNDYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgY2xlYXJQZW5kaW5nKCk7XG4gICAgfTtcbiAgfSwgW2lzRWRpdGluZywgaXNLbVR5cGUsIG5vcm1hbGl6ZWRGdWVsVHJhbnNEYXRlXSk7XG5cbiAgY29uc3QgaGFzQWN0aXZlUHJvY2VzcyA9IHVzZU1lbW8oKCkgPT4gYnVzeSB8fCBpc0VkaXRpbmcsIFtidXN5LCBpc0VkaXRpbmddKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKGhhc0FjdGl2ZVByb2Nlc3MpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcbiAgICB9O1xuICB9LCBbaGFzQWN0aXZlUHJvY2Vzc10pO1xuXG4gIGNvbnN0IHN0YXR1c0NvZGUgPSB0eXBlb2YgaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMgPT09IFwibnVtYmVyXCIgPyBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzIDogbnVsbDtcbiAgY29uc3QgaXNTaGVldEFwcHJvdmVkID0gc3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfQVBQUk9WRUQ7XG4gIGNvbnN0IGlzU2hlZXRQYWlkQnlTdGF0dXMgPSBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19QQUlEO1xuICBjb25zdCBpc1NoZWV0UGFpZEJ5Vm91Y2hlciA9IGhhc0Fzc2lnbmVkVm91Y2hlcihoZWFkZXI/LnZvdWNoZXIpO1xuICBjb25zdCBpc1NoZWV0UGFpZCA9IGlzU2hlZXRQYWlkQnlTdGF0dXMgfHwgaXNTaGVldFBhaWRCeVZvdWNoZXI7XG4gIGNvbnN0IGlzU2hlZXRMb2NrZWQgPSBpc1NoZWV0QXBwcm92ZWQgfHwgaXNTaGVldFBhaWQ7XG4gIGNvbnN0IGxpbmtlZFRpY2tldEZpbGVJZCA9IHNhZmVUZXh0KGxpbmU/LmZpbGVJZCk7XG4gIGNvbnN0IGhhc0xpbmtlZFRpY2tldCA9ICFpc0NyZWF0ZU1vZGUgJiYgISFsaW5rZWRUaWNrZXRGaWxlSWQ7XG4gIGNvbnN0IGlzTGluZUVkaXRMb2NrZWQgPSBpc1NoZWV0TG9ja2VkIHx8IGhhc0xpbmtlZFRpY2tldDtcbiAgY29uc3QgaXNMaW5lRGVsZXRlTG9ja2VkID0gaXNTaGVldExvY2tlZDtcbiAgY29uc3QgaXNMaW5lTG9ja2VkID0gaXNMaW5lRWRpdExvY2tlZDtcblxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChpc0NyZWF0ZU1vZGUgfHwgaXNMb2FkaW5nIHx8ICFoZWFkZXIgfHwgIWxpbmUgfHwgaXNMaW5lRWRpdExvY2tlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghY2FuRWRpdEV4cGVuc2UpIHtcbiAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XG4gICAgaHlkcmF0ZURyYWZ0RnJvbUxpbmUobGluZSwgaGVhZGVyKTtcbiAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0VkaXRpbmdFbmFibGVkXCIsIFwiRWRpdGluZyBlbmFibGVkXCIpKTtcbiAgfSwgW2NhbkVkaXRFeHBlbnNlLCBoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21MaW5lLCBpc0NyZWF0ZU1vZGUsIGlzTGluZUVkaXRMb2NrZWQsIGlzTG9hZGluZywgbGluZSwgb25Gb3JiaWRkZW5dKTtcblxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IHRhcmdldFVybCA9IGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCl9YDtcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwsIHtcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiB0cnVlLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFpc0VkaXRpbmcpIHJldHVybjtcblxuICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBoeWRyYXRlRHJhZnRGcm9tTGluZShsaW5lLCBoZWFkZXIpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKSk7XG4gIH0sIFtoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21MaW5lLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgbGluZSwgc2hlZXRJZF0pO1xuXG4gIGNvbnN0IGhhbmRsZU9wZW5DcmVhdGVNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSB8fCAhc2hlZXRJZCB8fCBpc1NoZWV0TG9ja2VkKSB7XG4gICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXRMaW5lRGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzaGVldElkKX0mbW9kZT1jcmVhdGVgO1xuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXG4gICAgfSk7XG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgaXNTaGVldExvY2tlZCwgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcblxuICBjb25zdCBuYXZpZ2F0ZVRvU2hlZXREZXRhaWwgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChzaGVldElkKTtcbiAgICBpZiAoIXNhZmVTaGVldElkKSByZXR1cm47XG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlU2hlZXRJZCl9YDtcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwpO1xuICB9LCBbc2hlZXRJZF0pO1xuXG4gIHJldHVybiB7XG4gICAgaGVhZGVyLFxuICAgIGxpbmUsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBidXN5LFxuICAgIHN0YXR1cyxcbiAgICBpc0VkaXRpbmcsXG4gICAgbW9kYWxFcnJvcixcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0VHJhbnNEYXRlLFxuICAgIGRyYWZ0VHlwZVZhbHVlQ29kZSxcbiAgICBkcmFmdFByaWNlLFxuICAgIGRyYWZ0UXR5LFxuICAgIGRyYWZ0UHJvamVjdElkLFxuICAgIGRyYWZ0SW50ZXJuYXRpb25hbCxcbiAgICBpc0ttVHlwZSxcbiAgICBpc0Z1ZWxQcmljZUxvYWRpbmcsXG4gICAgZnVlbFByaWNlTWVzc2FnZSxcbiAgICBmdWVsUHJpY2VNZXNzYWdlSXNFcnJvcixcbiAgICBpc1NoZWV0UGFpZCxcbiAgICBpc1NoZWV0TG9ja2VkLFxuICAgIGlzTGluZUVkaXRMb2NrZWQsXG4gICAgaXNMaW5lRGVsZXRlTG9ja2VkLFxuICAgIGlzTGluZUxvY2tlZCxcbiAgICBoYXNMaW5rZWRUaWNrZXQsXG4gICAgbGlua2VkVGlja2V0RmlsZUlkLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXG4gICAgc2V0RHJhZnRUcmFuc0RhdGUsXG4gICAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlLFxuICAgIHNldERyYWZ0UHJpY2UsXG4gICAgc2V0RHJhZnRRdHksXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXG4gICAgc2V0RHJhZnRJbnRlcm5hdGlvbmFsLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVPcGVuQ3JlYXRlTW9kZSxcbiAgICBuYXZpZ2F0ZVRvU2hlZXREZXRhaWwsXG4gIH07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUFzRDs7O0FDNkZoRDtBQTlDTixJQUFNLGlCQUFpQixDQUFDLFVBQTZDO0FBQ25FLFNBQU8sb0JBQW9CLE9BQU87QUFBQSxJQUNoQyx1QkFBdUI7QUFBQSxJQUN2Qix1QkFBdUI7QUFBQSxJQUN2QixhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUEsRUFDWixDQUFDO0FBQ0g7QUFHQSxJQUFNLHVCQUF1QixDQUFDO0FBQUEsRUFDNUI7QUFBQSxFQUNBO0FBQUEsRUFDQSxrQkFBa0I7QUFBQSxFQUNsQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtB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LElBQVM7QUFBQSxJQUVuRSxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQyxnQkFBZ0IsT0FDM0Q7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQSxjQUFjLFNBQVMsUUFBUSxXQUFXO0FBQUEsUUFDMUM7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSwwQkFBMEI7QUFBQSxRQUMxQix3QkFBd0I7QUFBQSxRQUN4Qiw0QkFBNEI7QUFBQSxRQUM1QixvQkFBb0I7QUFBQSxRQUNwQixrQkFBa0I7QUFBQSxRQUNsQix3QkFBd0I7QUFBQSxRQUN4Qiw0QkFBNEI7QUFBQSxRQUM1QjtBQUFBLFFBQ0EsdUJBQXVCO0FBQUEsUUFDdkIsb0JBQW9CO0FBQUE7QUFBQSxJQUN0QixJQUNFO0FBQUEsS0FFTjtBQUVKO0FBR0EsSUFBTSw2QkFBNkIsTUFBTTtBQUN2QyxTQUNFLDZDQUFDLGdDQUNDLHVEQUFDLGlDQUE4QixHQUNqQztBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsMEJBQXdCO0FBQ3hCLFFBQU0sU0FBUyxTQUFTLGVBQWUsMEJBQTBCO0FBQ2pFLE1BQUksQ0FBQyxPQUFRO0FBQ2IsbUJBQWlCLFFBQVEsNkNBQUMsOEJBQTJCLENBQUU7QUFDekQ7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLHFDQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgInJlc3BvbnNlIiwgInNoZWV0cyIsICJzZWxlY3RlZFNoZWV0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
