import {
  SingleDatePicker
} from "./chunks/chunk-DU37RXVC.js";
import {
  ExpenseTicketPreviewModal_default,
  ExpenseTicketStickyPreview_default,
  hasExpenseTicketImagePreviewSource,
  useExpenseTicketImagePreview
} from "./chunks/chunk-JWWNO5AR.js";
import {
  mapBooleanEnumOptions,
  mapWindowEnumOptions
} from "./chunks/chunk-YM2TI2W6.js";
import {
  mapExpenseTicketDetailHeader
} from "./chunks/chunk-PDRLNPAE.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-NVOGBGSJ.js";
import "./chunks/chunk-HFIH26AP.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-WNGAZ2I2.js";
import "./chunks/chunk-YMDESVRK.js";
import "./chunks/chunk-XB6OXILH.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-FRTU3UIU.js";
import "./chunks/chunk-4BE3ZFCK.js";
import {
  isManagingOtherExpenseRecord,
  resolveExpenseSheetDetailPolicy,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-W2KZFDOK.js";
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
} from "./chunks/chunk-FJXF5IDK.js";
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
} from "./chunks/chunk-MDZH67KN.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-IHXECQHV.js";
import {
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  toExpenseApiDdMmYyyy
} from "./chunks/chunk-SRZDJTMJ.js";
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
  const priceText = (0, import_react6.useMemo)(
    () => formatAmountWithCurrency(line?.price ?? null, safeText(header?.currencyCode)),
    [header?.currencyCode, line?.price]
  );
  const amountText = (0, import_react6.useMemo)(
    () => formatAmountWithCurrency(calculatedAmountPreview, safeText(header?.currencyCode)),
    [calculatedAmountPreview, header?.currencyCode]
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
  const internationalOptions = (0, import_react6.useMemo)(
    () => mapBooleanEnumOptions(getExpenseInternationalOptions()),
    []
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
      typeInputRef,
      priceInputRef,
      qtyInputRef,
      typeInvalid,
      priceInvalid,
      qtyInvalid,
      onDraftDescriptionChange: setDraftDescription,
      onDraftTransDateChange: setDraftTransDate,
      onDraftTypeValueCodeChange: handleDraftTypeValueCodeChange,
      onDraftPriceChange: handleDraftPriceChange,
      onDraftQtyChange: handleDraftQtyChange,
      onDraftProjectIdChange: setDraftProjectId,
      onDraftInternationalChange: setDraftInternational,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL0V4cGVuc2VTaGVldExpbmVEZXRhaWxQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0TGluZUZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2ludGVybmF0aW9uYWxPcHRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGluZS91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGluZS91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpbmUvdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbENvbmZpcm1EaWFsb2cudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpbmUvdXNlRXhwZW5zZVNoZWV0TGluZVRpY2tldFByZXZpZXcudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL0V4cGVuc2VTaGVldExpbmVEZXRhaWxWaWV3LnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpbmUvdXNlRXhwZW5zZVNoZWV0TGluZVR5cGVWYWxpZGF0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCB7IHVzZUF1dGhDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xyXG5pbXBvcnQgeyBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgfSBmcm9tIFwiLi4vZXhwZW5zZUZvcm1hdHRlcnMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VTaGVldExpbmVGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VTaGVldExpbmVGb3JtLnRzeFwiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlSW50ZXJuYXRpb25hbExhYmVsLCBnZXRFeHBlbnNlSW50ZXJuYXRpb25hbE9wdGlvbnMgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2ludGVybmF0aW9uYWxPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB7IHBhcnNlRGVjaW1hbElucHV0IH0gZnJvbSBcIi4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwsIHJlbG9hZEV4cGVuc2VQYWdlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dC50c1wiO1xyXG5pbXBvcnQge1xyXG4gIG1hcEJvb2xlYW5FbnVtT3B0aW9ucyxcclxuICBtYXBXaW5kb3dFbnVtT3B0aW9ucyxcclxuICB0eXBlIEV4cGVuc2VTZWxlY3RPcHRpb24sXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxNdXRhdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbENvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsQ29uZmlybURpYWxvZy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0TGluZVRpY2tldFByZXZpZXcgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRMaW5lVGlja2V0UHJldmlldy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVNoZWV0TGluZURldGFpbFZpZXcgZnJvbSBcIi4vRXhwZW5zZVNoZWV0TGluZURldGFpbFZpZXcudHN4XCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldExpbmVUeXBlVmFsaWRhdGlvbiB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldExpbmVUeXBlVmFsaWRhdGlvbi50c1wiO1xyXG5cclxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxyXG5jb25zdCBib290c3RyYXBFeHBlbnNlQXBpQXV0aCA9ICgpID0+IHtcclxuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCh7XHJcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcclxuICAgIGVudHJhT2lkOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxyXG4gICAgYXBwQ29kZTogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gQ29uc3VtZXMgdGhlIG9uZS10aW1lIGVkaXQgaGFuZG9mZiBmcm9tIHNoZWV0IGRldGFpbCBzbyBsYXRlciByZWxvYWRzIHJldHVybiB0byBub3JtYWwgdmlldyBtb2RlLlxyXG5jb25zdCBjb25zdW1lTGluZUVkaXRNb2RlUXVlcnkgPSAoKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGNvbnN0IGN1cnJlbnRVcmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICBpZiAoc2FmZVRleHQoY3VycmVudFVybC5zZWFyY2hQYXJhbXMuZ2V0KFwibW9kZVwiKSkudG9Mb3dlckNhc2UoKSAhPT0gXCJlZGl0XCIpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGN1cnJlbnRVcmwuc2VhcmNoUGFyYW1zLmRlbGV0ZShcIm1vZGVcIik7XHJcbiAgY29uc3QgbmV4dFVybCA9IGAke2N1cnJlbnRVcmwucGF0aG5hbWV9JHtjdXJyZW50VXJsLnNlYXJjaH0ke2N1cnJlbnRVcmwuaGFzaH1gO1xyXG4gIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh3aW5kb3cuaGlzdG9yeS5zdGF0ZSwgXCJcIiwgbmV4dFVybCk7XHJcbn07XHJcblxyXG5jb25zdCBFeHBlbnNlU2hlZXRMaW5lRGV0YWlsQ29udGVudCA9ICgpID0+IHtcclxuICBjb25zdCB7XHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgfSA9IHVzZUF1dGhDb250ZXh0KCk7XHJcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJWaWV3XCIpO1xyXG4gIGNvbnN0IHNoZWV0SWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX0lEX18pO1xyXG4gIGNvbnN0IGxpbmVJZCA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfTElORV9JRF9fKTtcclxuICBjb25zdCBsaW5lTW9kZSA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfTElORV9NT0RFX18pLnRvTG93ZXJDYXNlKCk7XHJcbiAgY29uc3QgaXNDcmVhdGVNb2RlID0gbGluZU1vZGUgPT09IFwiY3JlYXRlXCI7XHJcbiAgY29uc3Qgc3RhcnRJbkVkaXRNb2RlID0gbGluZU1vZGUgPT09IFwiZWRpdFwiO1xyXG4gIGNvbnN0IFtpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsIHNldElzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXN0YXJ0SW5FZGl0TW9kZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3VtZUxpbmVFZGl0TW9kZVF1ZXJ5KCk7XHJcbiAgfSwgW3N0YXJ0SW5FZGl0TW9kZV0pO1xyXG5cclxuICBjb25zdCB7XHJcbiAgICBoZWFkZXIsXHJcbiAgICBsaW5lLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgYnVzeSxcclxuICAgIHN0YXR1cyxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG1vZGFsRXJyb3IsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICBkcmFmdFR5cGVWYWx1ZUNvZGUsXHJcbiAgICBkcmFmdFByaWNlLFxyXG4gICAgZHJhZnRRdHksXHJcbiAgICBkcmFmdFByb2plY3RJZCxcclxuICAgIGRyYWZ0SW50ZXJuYXRpb25hbCxcclxuICAgIGlzS21UeXBlLFxyXG4gICAgaXNGdWVsUHJpY2VMb2FkaW5nLFxyXG4gICAgZnVlbFByaWNlTWVzc2FnZSxcclxuICAgIGZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yLFxyXG4gICAgaXNTaGVldExvY2tlZCxcclxuICAgIGlzTGluZUVkaXRMb2NrZWQsXHJcbiAgICBpc0xpbmVEZWxldGVMb2NrZWQsXHJcbiAgICBoYXNMaW5rZWRUaWNrZXQsXHJcbiAgICBsaW5rZWRUaWNrZXRGaWxlSWQsXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlQ3VycmVudCxcclxuICAgIGNhbkVkaXRFeHBlbnNlQ3VycmVudCxcclxuICAgIGNhbkRlbGV0ZUV4cGVuc2VDdXJyZW50LFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRUcmFuc0RhdGUsXHJcbiAgICBzZXREcmFmdFR5cGVWYWx1ZUNvZGUsXHJcbiAgICBzZXREcmFmdFByaWNlLFxyXG4gICAgc2V0RHJhZnRRdHksXHJcbiAgICBzZXREcmFmdFByb2plY3RJZCxcclxuICAgIHNldERyYWZ0SW50ZXJuYXRpb25hbCxcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgbmF2aWdhdGVUb1NoZWV0RGV0YWlsLFxyXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGUoe1xyXG4gICAgaGFzQWNjZXNzLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgc2hlZXRJZCxcclxuICAgIGxpbmVJZCxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIHN0YXJ0SW5FZGl0TW9kZSxcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB7XHJcbiAgICB0eXBlSW52YWxpZCxcclxuICAgIHByaWNlSW52YWxpZCxcclxuICAgIHF0eUludmFsaWQsXHJcbiAgICB0eXBlSW5wdXRSZWYsXHJcbiAgICBwcmljZUlucHV0UmVmLFxyXG4gICAgcXR5SW5wdXRSZWYsXHJcbiAgICBmb2N1c1R5cGVGaWVsZCxcclxuICAgIGZvY3VzQW1vdW50RmllbGRzLFxyXG4gICAgaGFuZGxlRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlLFxyXG4gICAgaGFuZGxlRHJhZnRQcmljZUNoYW5nZSxcclxuICAgIGhhbmRsZURyYWZ0UXR5Q2hhbmdlLFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXRMaW5lVHlwZVZhbGlkYXRpb24oe1xyXG4gICAgZHJhZnRUeXBlVmFsdWVDb2RlLFxyXG4gICAgZHJhZnRQcmljZSxcclxuICAgIGRyYWZ0UXR5LFxyXG4gICAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlLFxyXG4gICAgc2V0RHJhZnRQcmljZSxcclxuICAgIHNldERyYWZ0UXR5LFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBkcmFmdFByaWNlVmFsdWUgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFByaWNlKTtcclxuICBjb25zdCBkcmFmdFF0eVZhbHVlID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRRdHkpO1xyXG4gIGNvbnN0IGNhbGN1bGF0ZWRBbW91bnRQcmV2aWV3ID1cclxuICAgIGlzRWRpdGluZyAmJiBkcmFmdFByaWNlVmFsdWUgIT0gbnVsbCAmJiBkcmFmdFByaWNlVmFsdWUgPiAwICYmIGRyYWZ0UXR5VmFsdWUgIT0gbnVsbCAmJiBkcmFmdFF0eVZhbHVlID4gMFxyXG4gICAgICA/IGRyYWZ0UHJpY2VWYWx1ZSAqIGRyYWZ0UXR5VmFsdWVcclxuICAgICAgOiBsaW5lPy5hbW91bnQgPz8gbnVsbDtcclxuICBjb25zdCBwcmljZVRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGxpbmU/LnByaWNlID8/IG51bGwsIHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSksXHJcbiAgICBbaGVhZGVyPy5jdXJyZW5jeUNvZGUsIGxpbmU/LnByaWNlXVxyXG4gICk7XHJcbiAgY29uc3QgYW1vdW50VGV4dCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koY2FsY3VsYXRlZEFtb3VudFByZXZpZXcsIHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSksXHJcbiAgICBbY2FsY3VsYXRlZEFtb3VudFByZXZpZXcsIGhlYWRlcj8uY3VycmVuY3lDb2RlXVxyXG4gICk7XHJcbiAgY29uc3QgcHJvamVjdFZhbHVlID0gc2FmZVRleHQobGluZT8ucHJvaklkIHx8IGhlYWRlcj8ucHJvaklkKTtcbiAgY29uc3Qgc2hlZXREZXNjcmlwdGlvbiA9IHNhZmVUZXh0KGhlYWRlcj8uZGVzY3JpcHRpb24pIHx8IFwiLVwiO1xyXG4gIGNvbnN0IGludGVybmFjaW9uYWxMYWJlbCA9IGdldEV4cGVuc2VJbnRlcm5hdGlvbmFsTGFiZWwobGluZT8uaW50ZXJuYWNpb25hbCk7XHJcbiAgY29uc3Qge1xyXG4gICAgc2hvd1N0aWNreVByZXZpZXcsXHJcbiAgICBwcmV2aWV3T3BlbixcclxuICAgIHByZXZpZXdCdXN5LFxyXG4gICAgcHJldmlld0Vycm9yLFxyXG4gICAgcHJldmlld0ltYWdlVXJsLFxyXG4gICAgcHJldmlld1NjYWxlLFxyXG4gICAgcHJldmlld1RyYW5zbGF0ZSxcclxuICAgIHByZXZpZXdTdXJmYWNlUmVmLFxyXG4gICAgcHJldmlld0ZpbGVOYW1lLFxyXG4gICAgcHJldmlld0FsdFRleHQsXHJcbiAgICBvcGVuUHJldmlldyxcclxuICAgIGNsb3NlUHJldmlldyxcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kLFxyXG4gICAgaGFuZGxlUHJldmlld1doZWVsLFxyXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXRMaW5lVGlja2V0UHJldmlldyh7XHJcbiAgICBsaW5rZWRUaWNrZXRGaWxlSWQsXHJcbiAgICBoYXNMaW5rZWRUaWNrZXQsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGdhc3RvVHlwZU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4ge1xyXG4gICAgY29uc3Qgc291cmNlID0gQXJyYXkuaXNBcnJheSh3aW5kb3cuX19FWFBFTlNFX0dBU1RPX1RZUEVTX18pID8gd2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fIDogW107XHJcbiAgICBjb25zdCBtYXBwZWQgPSBtYXBXaW5kb3dFbnVtT3B0aW9ucyhzb3VyY2UpO1xyXG5cclxuICAgIGNvbnN0IGN1cnJlbnRUeXBlQ29kZSA9IHNhZmVUZXh0KGxpbmU/LnR5cGVWYWx1ZUNvZGUpO1xyXG4gICAgY29uc3QgY3VycmVudFR5cGVMYWJlbCA9IHNhZmVUZXh0KGxpbmU/LnR5cGVWYWx1ZSk7XHJcbiAgICBpZiAoY3VycmVudFR5cGVDb2RlICYmICFtYXBwZWQuc29tZSgoaXRlbSkgPT4gaXRlbS52YWx1ZSA9PT0gY3VycmVudFR5cGVDb2RlKSkge1xyXG4gICAgICBtYXBwZWQucHVzaCh7XHJcbiAgICAgICAgdmFsdWU6IGN1cnJlbnRUeXBlQ29kZSxcclxuICAgICAgICB0ZXh0OiBjdXJyZW50VHlwZUxhYmVsIHx8IGN1cnJlbnRUeXBlQ29kZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1hcHBlZDtcclxuICB9LCBbbGluZT8udHlwZVZhbHVlLCBsaW5lPy50eXBlVmFsdWVDb2RlXSk7XHJcblxyXG4gIGNvbnN0IGludGVybmF0aW9uYWxPcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFxyXG4gICAgKCkgPT4gbWFwQm9vbGVhbkVudW1PcHRpb25zKGdldEV4cGVuc2VJbnRlcm5hdGlvbmFsT3B0aW9ucygpKSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qge1xyXG4gICAgbW9kYWwsXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICAgIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgICBtb2RhbENhbmNlbFRleHQsXHJcbiAgICBtb2RhbENvbmZpcm1UZXh0LFxyXG4gICAgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtLFxyXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsQ29uZmlybURpYWxvZyh7XHJcbiAgICBidXN5LFxyXG4gICAgbW9kYWxFcnJvcixcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHsgaGFuZGxlVXBkYXRlLCBoYW5kbGVEZWxldGUgfSA9IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxNdXRhdGlvbnMoe1xyXG4gICAgYnVzeSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzRWRpdExvY2tlZDogaXNMaW5lRWRpdExvY2tlZCxcclxuICAgIGlzRGVsZXRlTG9ja2VkOiBpc0xpbmVEZWxldGVMb2NrZWQsXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiBjYW5DcmVhdGVFeHBlbnNlQ3VycmVudCxcclxuICAgIGNhbkVkaXRFeHBlbnNlOiBjYW5FZGl0RXhwZW5zZUN1cnJlbnQsXHJcbiAgICBjYW5EZWxldGVFeHBlbnNlOiBjYW5EZWxldGVFeHBlbnNlQ3VycmVudCxcclxuICAgIHNoZWV0SWQsXHJcbiAgICBsaW5lSWQsXHJcbiAgICBsaW5lLFxyXG4gICAgbGlua2VkVGlja2V0RmlsZUlkLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0VHJhbnNEYXRlLFxyXG4gICAgZHJhZnRUeXBlVmFsdWVDb2RlLFxyXG4gICAgZHJhZnRQcmljZSxcclxuICAgIGRyYWZ0UXR5LFxyXG4gICAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgICBkcmFmdEludGVybmF0aW9uYWwsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIG9uSW52YWxpZFR5cGU6IGZvY3VzVHlwZUZpZWxkLFxyXG4gICAgb25JbnZhbGlkQW1vdW50UXR5OiBmb2N1c0Ftb3VudEZpZWxkcyxcclxuICAgIG9uQ3JlYXRlU3VjY2VzczogKCkgPT4ge30sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGxpbmVUb3BiYXJBY3Rpb25Nb2RlID1cclxuICAgICFjYW5FZGl0RXhwZW5zZUN1cnJlbnQgJiYgIWNhbkRlbGV0ZUV4cGVuc2VDdXJyZW50XHJcbiAgICAgID8gXCJ2aWV3X29ubHlcIlxyXG4gICAgICA6IFwiZGVmYXVsdFwiO1xyXG5cclxuICBjb25zdCBoYW5kbGVFZGl0TGlua2VkVGlja2V0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qgc2FmZUZpbGVJZCA9IHNhZmVUZXh0KGxpbmtlZFRpY2tldEZpbGVJZCk7XHJcbiAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHNoZWV0SWQpO1xyXG4gICAgY29uc3Qgc2FmZUxpbmVJZCA9IHNhZmVUZXh0KGxpbmVJZCB8fCBsaW5lPy5saW5lUmVjSWQpO1xyXG4gICAgaWYgKCFzYWZlRmlsZUlkIHx8ICFzYWZlU2hlZXRJZCB8fCAhc2FmZUxpbmVJZCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgIGZpbGVJZDogc2FmZUZpbGVJZCxcclxuICAgICAgb3JpZ2luOiBcImV4cGVuc2UtbGluZVwiLFxyXG4gICAgICBzaGVldElkOiBzYWZlU2hlZXRJZCxcclxuICAgICAgc2hlZXRMaW5lUmVjSWQ6IHNhZmVMaW5lSWQsXHJcbiAgICAgIG1vZGU6IFwiZWRpdFwiLFxyXG4gICAgfSk7XHJcbiAgICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoe1xyXG4gICAgICBmaWxlSWQ6IHNhZmVGaWxlSWQsXHJcbiAgICAgIG9yaWdpbjogXCJleHBlbnNlLWxpbmVcIixcclxuICAgICAgc2hlZXRJZDogc2FmZVNoZWV0SWQsXHJcbiAgICAgIHNoZWV0TGluZVJlY0lkOiBzYWZlTGluZUlkLFxyXG4gICAgfSk7XHJcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcclxuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXHJcbiAgICB9KTtcclxuICB9LCBbaXNFZGl0aW5nLCBsaW5lPy5saW5lUmVjSWQsIGxpbmVJZCwgbGlua2VkVGlja2V0RmlsZUlkLCBzaGVldElkXSk7XHJcblxyXG4gIHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zKHtcclxuICAgIGJ1c3k6IGJ1c3kgfHwgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLFxyXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXHJcbiAgICBhY3Rpb25Nb2RlOiBsaW5lVG9wYmFyQWN0aW9uTW9kZSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHk6IG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6IGNhbkNyZWF0ZUV4cGVuc2VDdXJyZW50LFxyXG4gICAgY2FuRWRpdEV4cGVuc2U6IGNhbkVkaXRFeHBlbnNlQ3VycmVudCxcclxuICAgIGNhbkRlbGV0ZUV4cGVuc2U6IGNhbkRlbGV0ZUV4cGVuc2VDdXJyZW50LFxyXG4gICAgc2hlZXRJZCxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0OiBoYXNMaW5rZWRUaWNrZXQgPyBoYW5kbGVFZGl0TGlua2VkVGlja2V0IDogaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBvblNhdmVTdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgICBzZXRJc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUodHJ1ZSk7XHJcbiAgICAgICAgbmF2aWdhdGVUb1NoZWV0RGV0YWlsKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xyXG4gICAgfSxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVPcGVuTGlua2VkVGlja2V0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qgc2FmZUZpbGVJZCA9IHNhZmVUZXh0KGxpbmtlZFRpY2tldEZpbGVJZCk7XHJcbiAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHNoZWV0SWQpO1xyXG4gICAgY29uc3Qgc2FmZUxpbmVJZCA9IHNhZmVUZXh0KGxpbmVJZCB8fCBsaW5lPy5saW5lUmVjSWQpO1xyXG4gICAgaWYgKCFzYWZlRmlsZUlkIHx8ICFzYWZlU2hlZXRJZCB8fCAhc2FmZUxpbmVJZCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgIGZpbGVJZDogc2FmZUZpbGVJZCxcclxuICAgICAgb3JpZ2luOiBcImV4cGVuc2UtbGluZVwiLFxyXG4gICAgICBzaGVldElkOiBzYWZlU2hlZXRJZCxcclxuICAgICAgc2hlZXRMaW5lUmVjSWQ6IHNhZmVMaW5lSWQsXHJcbiAgICB9KTtcclxuICAgIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCh7XHJcbiAgICAgIGZpbGVJZDogc2FmZUZpbGVJZCxcclxuICAgICAgb3JpZ2luOiBcImV4cGVuc2UtbGluZVwiLFxyXG4gICAgICBzaGVldElkOiBzYWZlU2hlZXRJZCxcclxuICAgICAgc2hlZXRMaW5lUmVjSWQ6IHNhZmVMaW5lSWQsXHJcbiAgICB9KTtcclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcclxuICAgIH0pO1xyXG4gIH0sIFtpc0VkaXRpbmcsIGxpbmU/LmxpbmVSZWNJZCwgbGluZUlkLCBsaW5rZWRUaWNrZXRGaWxlSWQsIHNoZWV0SWRdKTtcclxuXHJcbiAgY29uc3QgZGV0YWlsQm9keSA9XHJcbiAgICAhaXNMb2FkaW5nICYmICFpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgJiYgIWVycm9yTWVzc2FnZSAmJiBsaW5lID8gKFxyXG4gICAgICA8RXhwZW5zZVNoZWV0TGluZUZvcm1cclxuICAgICAgICBsaW5lPXtsaW5lfVxyXG4gICAgICAgIGZhbGxiYWNrRGF0ZT17c2FmZVRleHQoaGVhZGVyPy5jcmVhdGVkRGF0ZSl9XHJcbiAgICAgICAgc2hlZXREZXNjcmlwdGlvbj17c2hlZXREZXNjcmlwdGlvbn1cclxuICAgICAgICBwcm9qZWN0VmFsdWU9e3Byb2plY3RWYWx1ZX1cclxuICAgICAgICBwcmljZVRleHQ9e3ByaWNlVGV4dH1cclxuICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxyXG4gICAgICAgIGludGVybmFjaW9uYWxMYWJlbD17aW50ZXJuYWNpb25hbExhYmVsfVxyXG4gICAgICAgIGlzS21UeXBlPXtpc0ttVHlwZX1cclxuICAgICAgICBpc0Z1ZWxQcmljZUxvYWRpbmc9e2lzRnVlbFByaWNlTG9hZGluZ31cclxuICAgICAgICBmdWVsUHJpY2VNZXNzYWdlPXtmdWVsUHJpY2VNZXNzYWdlfVxyXG4gICAgICAgIGZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yPXtmdWVsUHJpY2VNZXNzYWdlSXNFcnJvcn1cclxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cclxuICAgICAgICBpc0VkaXRpbmc9e2lzRWRpdGluZ31cclxuICAgICAgICBnYXN0b1R5cGVPcHRpb25zPXtnYXN0b1R5cGVPcHRpb25zfVxyXG4gICAgICAgIGludGVybmF0aW9uYWxPcHRpb25zPXtpbnRlcm5hdGlvbmFsT3B0aW9uc31cclxuICAgICAgICBkcmFmdERlc2NyaXB0aW9uPXtkcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgIGRyYWZ0VHJhbnNEYXRlPXtkcmFmdFRyYW5zRGF0ZX1cclxuICAgICAgICBkcmFmdFR5cGVWYWx1ZUNvZGU9e2RyYWZ0VHlwZVZhbHVlQ29kZX1cclxuICAgICAgICBkcmFmdFByaWNlPXtkcmFmdFByaWNlfVxyXG4gICAgICAgIGRyYWZ0UXR5PXtkcmFmdFF0eX1cclxuICAgICAgICBkcmFmdFByb2plY3RJZD17ZHJhZnRQcm9qZWN0SWR9XHJcbiAgICAgICAgZHJhZnRJbnRlcm5hdGlvbmFsPXtkcmFmdEludGVybmF0aW9uYWx9XHJcbiAgICAgICAgdHlwZUlucHV0UmVmPXt0eXBlSW5wdXRSZWZ9XHJcbiAgICAgICAgcHJpY2VJbnB1dFJlZj17cHJpY2VJbnB1dFJlZn1cclxuICAgICAgICBxdHlJbnB1dFJlZj17cXR5SW5wdXRSZWZ9XHJcbiAgICAgICAgdHlwZUludmFsaWQ9e3R5cGVJbnZhbGlkfVxyXG4gICAgICAgIHByaWNlSW52YWxpZD17cHJpY2VJbnZhbGlkfVxyXG4gICAgICAgIHF0eUludmFsaWQ9e3F0eUludmFsaWR9XHJcbiAgICAgICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlPXtzZXREcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2U9e3NldERyYWZ0VHJhbnNEYXRlfVxyXG4gICAgICAgIG9uRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlPXtoYW5kbGVEcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2V9XHJcbiAgICAgICAgb25EcmFmdFByaWNlQ2hhbmdlPXtoYW5kbGVEcmFmdFByaWNlQ2hhbmdlfVxyXG4gICAgICAgIG9uRHJhZnRRdHlDaGFuZ2U9e2hhbmRsZURyYWZ0UXR5Q2hhbmdlfVxyXG4gICAgICAgIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2U9e3NldERyYWZ0UHJvamVjdElkfVxyXG4gICAgICAgIG9uRHJhZnRJbnRlcm5hdGlvbmFsQ2hhbmdlPXtzZXREcmFmdEludGVybmF0aW9uYWx9XHJcbiAgICAgICAgbGlua2VkVGlja2V0RmlsZUlkPXtsaW5rZWRUaWNrZXRGaWxlSWR9XHJcbiAgICAgICAgc2hvd0xpbmtlZFRpY2tldEZpZWxkPXtoYXNMaW5rZWRUaWNrZXR9XHJcbiAgICAgICAgb25PcGVuTGlua2VkVGlja2V0PXtoYW5kbGVPcGVuTGlua2VkVGlja2V0fVxyXG4gICAgICAvPlxyXG4gICAgKSA6IG51bGw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8RXhwZW5zZVNoZWV0TGluZURldGFpbFZpZXdcclxuICAgICAgbW9kYWw9e3tcclxuICAgICAgICBvcGVuOiBtb2RhbC5vcGVuLFxyXG4gICAgICAgIHRpdGxlOiBtb2RhbC50aXRsZSxcclxuICAgICAgICBtZXNzYWdlOiBtb2RhbC5tZXNzYWdlLFxyXG4gICAgICAgIGNvbmZpcm1UZXh0OiBtb2RhbENvbmZpcm1UZXh0LFxyXG4gICAgICAgIGNhbmNlbFRleHQ6IG1vZGFsQ2FuY2VsVGV4dCxcclxuICAgICAgICBsb2FkaW5nVGV4dDogbW9kYWxMb2FkaW5nVGV4dCxcclxuICAgICAgICBzaG93Q2FuY2VsOiBtb2RhbC5zaG93Q2FuY2VsLFxyXG4gICAgICAgIHNob3dDb25maXJtOiBtb2RhbC5zaG93Q29uZmlybSxcclxuICAgICAgICBidXN5OiBidXN5IHx8IGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSxcclxuICAgICAgICBlcnJvcjogbW9kYWxFcnJvcixcclxuICAgICAgICBzdGF0dXMsXHJcbiAgICAgICAgb25Db25maXJtOiBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgICAgICAgb25DYW5jZWw6IGNsb3NlQ29uZmlybSxcclxuICAgICAgfX1cclxuICAgICAgcHJldmlldz17e1xyXG4gICAgICAgIG9wZW46IHByZXZpZXdPcGVuLFxyXG4gICAgICAgIGJ1c3k6IHByZXZpZXdCdXN5LFxyXG4gICAgICAgIGVycm9yOiBwcmV2aWV3RXJyb3IsXHJcbiAgICAgICAgaW1hZ2VVcmw6IHByZXZpZXdJbWFnZVVybCxcclxuICAgICAgICBpbWFnZUFsdDogcHJldmlld0FsdFRleHQsXHJcbiAgICAgICAgZmlsZU5hbWU6IHByZXZpZXdGaWxlTmFtZSxcclxuICAgICAgICBzY2FsZTogcHJldmlld1NjYWxlLFxyXG4gICAgICAgIHRyYW5zbGF0ZTogcHJldmlld1RyYW5zbGF0ZSxcclxuICAgICAgICBzdXJmYWNlUmVmOiBwcmV2aWV3U3VyZmFjZVJlZixcclxuICAgICAgICBzaG93U3RpY2t5UHJldmlldyxcclxuICAgICAgICBvbk9wZW46IG9wZW5QcmV2aWV3LFxyXG4gICAgICAgIG9uQ2xvc2U6IGNsb3NlUHJldmlldyxcclxuICAgICAgICBvblBvaW50ZXJEb3duOiBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24sXHJcbiAgICAgICAgb25Qb2ludGVyTW92ZTogaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlLFxyXG4gICAgICAgIG9uUG9pbnRlckVuZDogaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXHJcbiAgICAgICAgb25XaGVlbDogaGFuZGxlUHJldmlld1doZWVsLFxyXG4gICAgICB9fVxyXG4gICAgICBjb250ZW50PXt7XHJcbiAgICAgICAgaXNMb2FkaW5nLFxyXG4gICAgICAgIGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSxcclxuICAgICAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICAgICAgZGV0YWlsQm9keSxcclxuICAgICAgfX1cclxuICAgIC8+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgZXhwZW5zZSBzaGVldCBsaW5lIGRldGFpbC5cclxuY29uc3QgRXhwZW5zZVNoZWV0TGluZURldGFpbFBhZ2UgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cclxuICAgICAgPEV4cGVuc2VTaGVldExpbmVEZXRhaWxDb250ZW50IC8+XHJcbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS1saW5lLWRldGFpbC1yb290XCIpO1xyXG4gIGlmICghcm9vdEVsKSByZXR1cm47XHJcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxFeHBlbnNlU2hlZXRMaW5lRGV0YWlsUGFnZSAvPik7XHJcbn07XHJcblxyXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldExpbmVEZXRhaWxQYWdlO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IFNpbmdsZURhdGVQaWNrZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TaW5nbGVEYXRlUGlja2VyLnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIsIGZvcm1hdEV4cGVuc2VOdW1iZXIgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dCBmcm9tIFwiLi9FeHBlbnNlUHJvamVjdEZpbHRlcklucHV0LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVJlYWRPbmx5RmllbGQgZnJvbSBcIi4vRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgZnJvbSBcIi4vRXhwZW5zZVNlY3Rpb25EaXZpZGVyLnRzeFwiO1xyXG5cclxudHlwZSBFeHBlbnNlU2hlZXRMaW5lRm9ybVByb3BzID0ge1xyXG4gIGxpbmU6IEV4cGVuc2VTaGVldExpbmU7XHJcbiAgZmFsbGJhY2tEYXRlOiBzdHJpbmc7XHJcbiAgc2hlZXREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIHByb2plY3RWYWx1ZTogc3RyaW5nO1xyXG4gIHByaWNlVGV4dDogc3RyaW5nO1xyXG4gIGFtb3VudFRleHQ6IHN0cmluZztcclxuICBpbnRlcm5hY2lvbmFsTGFiZWw6IHN0cmluZztcclxuICBpc0ttVHlwZTogYm9vbGVhbjtcclxuICBpc0Z1ZWxQcmljZUxvYWRpbmc6IGJvb2xlYW47XHJcbiAgZnVlbFByaWNlTWVzc2FnZTogc3RyaW5nO1xyXG4gIGZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yOiBib29sZWFuO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBnYXN0b1R5cGVPcHRpb25zOiBFeHBlbnNlU2VsZWN0T3B0aW9uW107XHJcbiAgaW50ZXJuYXRpb25hbE9wdGlvbnM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXTtcclxuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZHJhZnRUcmFuc0RhdGU6IHN0cmluZztcclxuICBkcmFmdFR5cGVWYWx1ZUNvZGU6IHN0cmluZztcclxuICBkcmFmdFByaWNlOiBzdHJpbmc7XHJcbiAgZHJhZnRRdHk6IHN0cmluZztcclxuICBkcmFmdFByb2plY3RJZDogc3RyaW5nO1xyXG4gIGRyYWZ0SW50ZXJuYXRpb25hbDogc3RyaW5nO1xyXG4gIGxpbmtlZFRpY2tldEZpbGVJZDogc3RyaW5nO1xyXG4gIHNob3dMaW5rZWRUaWNrZXRGaWVsZDogYm9vbGVhbjtcclxuICB0eXBlSW5wdXRSZWY/OiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgcHJpY2VJbnB1dFJlZj86IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICBxdHlJbnB1dFJlZj86IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICB0eXBlSW52YWxpZD86IGJvb2xlYW47XHJcbiAgcHJpY2VJbnZhbGlkPzogYm9vbGVhbjtcclxuICBxdHlJbnZhbGlkPzogYm9vbGVhbjtcclxuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0UHJpY2VDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRRdHlDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRJbnRlcm5hdGlvbmFsQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbk9wZW5MaW5rZWRUaWNrZXQ6ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXRRdHlWYWx1ZSA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VOdW1iZXIodmFsdWUsIHtcclxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgZmFsbGJhY2s6IFwiLVwiLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gUHVyZSBmb3JtIHJlbmRlcmVyIGZvciBleHBlbnNlIGxpbmUgZGV0YWlsIGluIHJlYWQgYW5kIGVkaXQgbW9kZXMuXHJcbmNvbnN0IEV4cGVuc2VTaGVldExpbmVGb3JtID0gKHtcclxuICBsaW5lLFxyXG4gIGZhbGxiYWNrRGF0ZSxcclxuICBzaGVldERlc2NyaXB0aW9uOiBfc2hlZXREZXNjcmlwdGlvbixcclxuICBwcm9qZWN0VmFsdWUsXHJcbiAgcHJpY2VUZXh0LFxyXG4gIGFtb3VudFRleHQsXHJcbiAgaW50ZXJuYWNpb25hbExhYmVsLFxyXG4gIGlzS21UeXBlLFxyXG4gIGlzRnVlbFByaWNlTG9hZGluZyxcclxuICBmdWVsUHJpY2VNZXNzYWdlLFxyXG4gIGZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yLFxyXG4gIHN0YXR1cyxcclxuICBpc0VkaXRpbmcsXHJcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcclxuICBpbnRlcm5hdGlvbmFsT3B0aW9ucyxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRyYWZ0VHJhbnNEYXRlLFxyXG4gIGRyYWZ0VHlwZVZhbHVlQ29kZSxcclxuICBkcmFmdFByaWNlLFxyXG4gIGRyYWZ0UXR5LFxyXG4gIGRyYWZ0UHJvamVjdElkLFxyXG4gIGRyYWZ0SW50ZXJuYXRpb25hbCxcclxuICBsaW5rZWRUaWNrZXRGaWxlSWQsXHJcbiAgc2hvd0xpbmtlZFRpY2tldEZpZWxkLFxyXG4gIHR5cGVJbnB1dFJlZixcclxuICBwcmljZUlucHV0UmVmLFxyXG4gIHF0eUlucHV0UmVmLFxyXG4gIHR5cGVJbnZhbGlkID0gZmFsc2UsXHJcbiAgcHJpY2VJbnZhbGlkID0gZmFsc2UsXHJcbiAgcXR5SW52YWxpZCA9IGZhbHNlLFxyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZSxcclxuICBvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlLFxyXG4gIG9uRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlLFxyXG4gIG9uRHJhZnRQcmljZUNoYW5nZSxcclxuICBvbkRyYWZ0UXR5Q2hhbmdlLFxyXG4gIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2UsXHJcbiAgb25EcmFmdEludGVybmF0aW9uYWxDaGFuZ2UsXHJcbiAgb25PcGVuTGlua2VkVGlja2V0LFxyXG59OiBFeHBlbnNlU2hlZXRMaW5lRm9ybVByb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNwYWNlLXktMFwiPlxyXG4gICAgICA8RXhwZW5zZVNlY3Rpb25EaXZpZGVyXHJcbiAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVcIiwgXCJMaW5lXCIpfVxyXG4gICAgICAgIGNsYXNzTmFtZT1cImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyLS1zcGFjZWRcIlxyXG4gICAgICAgIGxhYmVsQ2xhc3NOYW1lPVwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXJfX2xhYmVsLS10aXRsZVwiXHJcbiAgICAgIC8+XHJcblxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgICAge2lzRWRpdGluZyA/IChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCI+XHJcbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0RGVzY3JpcHRpb259XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxyXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtzYWZlVGV4dChsaW5lLmRlc2NyaXB0aW9uKSB8fCBcIi1cIn1cclxuICAgICAgICAgICAgICBmdWxsV2lkdGhcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAge3Nob3dMaW5rZWRUaWNrZXRGaWVsZCA/IChcclxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX0ZpbGVJZFwiLCBcIlRpY2tldFwiKX1cclxuICAgICAgICAgICAgICB2YWx1ZT17bGlua2VkVGlja2V0RmlsZUlkfVxyXG4gICAgICAgICAgICAgIGZ1bGxXaWR0aFxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uT3BlbkxpbmtlZFRpY2tldH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlzaXRhLWZpZWxkLXRleHRcIj5cclxuICAgICAgICAgICAgICA8U2luZ2xlRGF0ZVBpY2tlclxyXG4gICAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0NyZWF0ZWREYXRlXCIsIFwiRGF0ZVwiKX1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFRyYW5zRGF0ZX1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmd9XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DcmVhdGVkRGF0ZVwiLCBcIkRhdGVcIil9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShcclxuICAgICAgICAgICAgICAgIHNhZmVUZXh0KGxpbmUudHJhbnNEYXRlIHx8IGZhbGxiYWNrRGF0ZSksXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9UeXBlXCIsIFwiVHlwZVwiKX1cclxuICAgICAgICAgICAgICBvcHRpb25zPXtnYXN0b1R5cGVPcHRpb25zfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFR5cGVWYWx1ZUNvZGUgfHwgXCJcIn1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgaW5wdXRSZWY9e3R5cGVJbnB1dFJlZn1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVHlwZVwiLCBcIlR5cGVcIil9XHJcbiAgICAgICAgICAgICAgaW52YWxpZD17dHlwZUludmFsaWR9XHJcbiAgICAgICAgICAgICAgdXNlUG9ydGFsPXtmYWxzZX1cclxuICAgICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1R5cGVcIiwgXCJUeXBlXCIpfSB2YWx1ZT17c2FmZVRleHQobGluZS50eXBlVmFsdWUpIHx8IFwiLVwifSAvPlxyXG4gICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XHJcbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9QcmljZVwiLCBcIlByaWNlXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICByZWY9e3ByaWNlSW5wdXRSZWZ9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2lzS21UeXBlID8gXCJmb3JtLWNvbnRyb2wgaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcImZvcm0tY29udHJvbFwifSR7XHJcbiAgICAgICAgICAgICAgICAgIHByaWNlSW52YWxpZCA/IFwiIGJvcmRlci1yb3NlLTQwMCBiZy1yb3NlLTUwIGZvY3VzOnJpbmctcm9zZS0yMDAgZm9jdXM6Ym9yZGVyLXJvc2UtNDAwXCIgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9YH1cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgIGlucHV0TW9kZT1cImRlY2ltYWxcIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0UHJpY2V9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0UHJpY2VDaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxyXG4gICAgICAgICAgICAgICAgb25CbHVyPXsoZXZlbnQpID0+XHJcbiAgICAgICAgICAgICAgICAgIG9uRHJhZnRQcmljZUNoYW5nZShcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXtpc0ttVHlwZX1cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0ttVHlwZX1cclxuICAgICAgICAgICAgICAgIGFyaWEtcmVhZG9ubHk9e2lzS21UeXBlfVxyXG4gICAgICAgICAgICAgICAgYXJpYS1pbnZhbGlkPXtwcmljZUludmFsaWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIn1cclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1ByaWNlXCIsIFwiUHJpY2VcIil9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICB7aXNLbVR5cGUgJiYgaXNGdWVsUHJpY2VMb2FkaW5nID8gKFxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgdGV4dC14c1wiPlxyXG4gICAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfRnVlbFByaWNlX0xvYWRpbmdcIiwgXCJMb2FkaW5nIGZ1ZWwgcHJpY2UuLi5cIil9XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgICAge2lzS21UeXBlICYmICFpc0Z1ZWxQcmljZUxvYWRpbmcgJiYgZnVlbFByaWNlTWVzc2FnZSA/IChcclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17ZnVlbFByaWNlTWVzc2FnZUlzRXJyb3IgPyBcInRleHQtZGFuZ2VyIHRleHQtc21cIiA6IFwidGV4dC1zbGF0ZS01MDAgdGV4dC14c1wifT57ZnVlbFByaWNlTWVzc2FnZX08L3A+XHJcbiAgICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9QcmljZVwiLCBcIlByaWNlXCIpfSB2YWx1ZT17cHJpY2VUZXh0IHx8IFwiLVwifSAvPlxyXG4gICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XHJcbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9RdHlcIiwgXCJRdWFudGl0eVwiKX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgcmVmPXtxdHlJbnB1dFJlZn1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCR7XHJcbiAgICAgICAgICAgICAgICAgIHF0eUludmFsaWQgPyBcIiBib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpyaW5nLXJvc2UtMjAwIGZvY3VzOmJvcmRlci1yb3NlLTQwMFwiIDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfWB9XHJcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICBpbnB1dE1vZGU9XCJkZWNpbWFsXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFF0eX1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnRRdHlDaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxyXG4gICAgICAgICAgICAgICAgb25CbHVyPXsoZXZlbnQpID0+XHJcbiAgICAgICAgICAgICAgICAgIG9uRHJhZnRRdHlDaGFuZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKGV2ZW50LnRhcmdldC52YWx1ZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICBmYWxsYmFjazogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhcmlhLWludmFsaWQ9e3F0eUludmFsaWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIn1cclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtmb3JtYXRRdHlWYWx1ZShsaW5lLnF0eSl9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQW1vdW50XCIsIFwiQW1vdW50XCIpfSB2YWx1ZT17YW1vdW50VGV4dCB8fCBcIi1cIn0gLz5cclxuXHJcbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgICA8RXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1Byb2plY3RfUGxhY2Vob2xkZXJcIiwgXCJQcm9qZWN0IGlkXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFByb2plY3RJZH1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdFByb2plY3RJZENoYW5nZX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICkgOiBwcm9qZWN0VmFsdWUgPyAoXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfSB2YWx1ZT17cHJvamVjdFZhbHVlfSAvPlxuICAgICAgICAgICkgOiBudWxsfVxuXHJcbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfSW50ZXJuYXRpb25hbFwiLCBcIkludGVybmF0aW9uYWxcIil9XHJcbiAgICAgICAgICAgICAgb3B0aW9ucz17aW50ZXJuYXRpb25hbE9wdGlvbnN9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0SW50ZXJuYXRpb25hbCB8fCBcIlwifVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0SW50ZXJuYXRpb25hbENoYW5nZX1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfSW50ZXJuYXRpb25hbFwiLCBcIkludGVybmF0aW9uYWxcIil9XHJcbiAgICAgICAgICAgICAgdXNlUG9ydGFsPXtmYWxzZX1cclxuICAgICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfSW50ZXJuYXRpb25hbFwiLCBcIkludGVybmF0aW9uYWxcIil9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e2ludGVybmFjaW9uYWxMYWJlbH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICA8c3Bhbj57c3RhdHVzfTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9zZWN0aW9uPlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXRMaW5lRm9ybTtcclxuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZUludGVybmF0aW9uYWxPcHRpb24gPSB7XHJcbiAgdmFsdWU6IGJvb2xlYW47XHJcbiAgdGV4dDogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gRml4ZWQgZW51bSBmb3IgXCJJbnRlcm5hY2lvbmFsXCIgZmllbGQgaW4gZXhwZW5zZSBzaGVldCBsaW5lcy5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VJbnRlcm5hdGlvbmFsT3B0aW9ucyA9ICgpOiBFeHBlbnNlSW50ZXJuYXRpb25hbE9wdGlvbltdID0+IFtcclxuICB7IHZhbHVlOiB0cnVlLCB0ZXh0OiBpbmRUKFwiRXhwZW5zZVNoZWV0c19JbnRlcm5hdGlvbmFsX1llc1wiLCBcIlNcdTAwRURcIikgfSxcclxuICB7IHZhbHVlOiBmYWxzZSwgdGV4dDogaW5kVChcIkV4cGVuc2VTaGVldHNfSW50ZXJuYXRpb25hbF9Ob1wiLCBcIk5vXCIpIH0sXHJcbl07XHJcblxyXG4vLyBNYXBzIG51bGxhYmxlIGJvb2xlYW4gdmFsdWVzIHRvIGZpeGVkIGVudW0gbGFiZWxzIGZvciByZWFkLW9ubHkgcmVuZGVyaW5nLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUludGVybmF0aW9uYWxMYWJlbCA9ICh2YWx1ZTogYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0ludGVybmF0aW9uYWxfWWVzXCIsIFwiU1x1MDBFRFwiKTtcclxuICB9XHJcblxyXG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcclxuICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19JbnRlcm5hdGlvbmFsX05vXCIsIFwiTm9cIik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gXCItXCI7XHJcbn07XHJcblxyXG4vLyBQYXJzZXMgdXNlciBpbnB1dCBiYWNrIHRvIG51bGxhYmxlIGJvb2xlYW4gZm9yIGZ1dHVyZSBlZGl0IG1vZGUuXHJcbmV4cG9ydCBjb25zdCBwYXJzZUV4cGVuc2VJbnRlcm5hdGlvbmFsVmFsdWUgPSAocmF3OiBzdHJpbmcgfCBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZCk6IGJvb2xlYW4gfCBudWxsID0+IHtcclxuICBpZiAocmF3ID09PSB0cnVlIHx8IHJhdyA9PT0gZmFsc2UpIHtcclxuICAgIHJldHVybiByYXc7XHJcbiAgfVxyXG5cclxuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcgfHwgXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKCF2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBpZiAodmFsdWUgPT09IFwidHJ1ZVwiIHx8IHZhbHVlID09PSBcIjFcIikge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBpZiAodmFsdWUgPT09IFwiZmFsc2VcIiB8fCB2YWx1ZSA9PT0gXCIwXCIpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVNoZWV0Q3JlYXRlTGluZVJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0TGluZSxcclxuICBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVxdWVzdCxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IHBhcnNlRXhwZW5zZUludGVybmF0aW9uYWxWYWx1ZSB9IGZyb20gXCIuLi9jb25zdGFudHMvaW50ZXJuYXRpb25hbE9wdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSwgdG9FeHBlbnNlQXBpRGRNbVl5eXkgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBleGVjdXRlRXhwZW5zZU11dGF0aW9uLCBwYXJzZURlY2ltYWxJbnB1dCB9IGZyb20gXCIuLi9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGNyZWF0ZUV4cGVuc2VTaGVldCxcclxuICBkZWxldGVFeHBlbnNlU2hlZXRMaW5lLFxyXG4gIGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldCxcclxuICBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRGaWxlLFxyXG4gIHVwZGF0ZUV4cGVuc2VTaGVldExpbmUsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIGlzRWRpdExvY2tlZDogYm9vbGVhbjtcclxuICBpc0RlbGV0ZUxvY2tlZDogYm9vbGVhbjtcclxuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkVkaXRFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgc2hlZXRJZDogc3RyaW5nO1xyXG4gIGxpbmVJZDogc3RyaW5nO1xyXG4gIGxpbmU6IEV4cGVuc2VTaGVldExpbmUgfCBudWxsO1xyXG4gIGxpbmtlZFRpY2tldEZpbGVJZDogc3RyaW5nO1xyXG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcclxuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIGRyYWZ0VHlwZVZhbHVlQ29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0UHJpY2U6IHN0cmluZztcclxuICBkcmFmdFF0eTogc3RyaW5nO1xyXG4gIGRyYWZ0UHJvamVjdElkOiBzdHJpbmc7XHJcbiAgZHJhZnRJbnRlcm5hdGlvbmFsOiBzdHJpbmc7XHJcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0QnVzeTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgb25JbnZhbGlkVHlwZT86ICgpID0+IHZvaWQ7XHJcbiAgb25JbnZhbGlkQW1vdW50UXR5PzogKCkgPT4gdm9pZDtcclxuICBvbkNyZWF0ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVMaW5lRGF0ZSA9IChyYXc6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIHRvRXhwZW5zZUFwaURkTW1ZeXl5KHJhdyk7XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZU51bWJlciA9IChyYXc6IHN0cmluZyk6IG51bWJlciB8IG51bGwgPT4gcGFyc2VEZWNpbWFsSW5wdXQocmF3KTtcclxuXHJcbi8vIEVuY2Fwc3VsYXRlcyB1cGRhdGUgYW5kIGRlbGV0ZSBtdXRhdGlvbnMgZm9yIGV4cGVuc2Ugc2hlZXQgbGluZSBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zID0gKHtcclxuICBidXN5LFxyXG4gIGlzRWRpdGluZyxcclxuICBpc0NyZWF0ZU1vZGUsXHJcbiAgaXNFZGl0TG9ja2VkLFxyXG4gIGlzRGVsZXRlTG9ja2VkLFxyXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXHJcbiAgY2FuRWRpdEV4cGVuc2UsXHJcbiAgY2FuRGVsZXRlRXhwZW5zZSxcclxuICBzaGVldElkLFxyXG4gIGxpbmVJZCxcclxuICBsaW5lLFxyXG4gIGxpbmtlZFRpY2tldEZpbGVJZCxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRyYWZ0VHJhbnNEYXRlLFxyXG4gIGRyYWZ0VHlwZVZhbHVlQ29kZSxcclxuICBkcmFmdFByaWNlLFxyXG4gIGRyYWZ0UXR5LFxyXG4gIGRyYWZ0UHJvamVjdElkLFxyXG4gIGRyYWZ0SW50ZXJuYXRpb25hbCxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIHNldEJ1c3ksXHJcbiAgc2V0U3RhdHVzLFxyXG4gIHNldElzRWRpdGluZyxcclxuICBvbkludmFsaWRUeXBlLFxyXG4gIG9uSW52YWxpZEFtb3VudFF0eSxcclxuICBvbkNyZWF0ZVN1Y2Nlc3MsXHJcbn06IFVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XHJcbiAgY29uc3QgaXNOb3RGb3VuZEVycm9yID0gKGVycm9yOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgICByZXR1cm4gZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDA0O1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGlzTWlzc2luZ1RpY2tldEZpbGVNZXNzYWdlID0gKG1lc3NhZ2U6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcobWVzc2FnZSB8fCBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhcmNoaXZvIGFzb2NpYWRvXCIpIHx8XHJcbiAgICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhcmNoaXZvIGFkanVudG9cIikgfHxcclxuICAgICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImFzc29jaWF0ZWQgZmlsZVwiKSB8fFxyXG4gICAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXR0YWNoZWQgZmlsZVwiKVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoaXNFZGl0TG9ja2VkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgY2FuUHJvY2VlZCA9IGlzQ3JlYXRlTW9kZSA/IGNhbkNyZWF0ZUV4cGVuc2UgOiBjYW5FZGl0RXhwZW5zZTtcclxuICAgIGlmICghY2FuUHJvY2VlZCkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IG5vcm1hbGl6ZUxpbmVEYXRlKGRyYWZ0VHJhbnNEYXRlKTtcclxuICAgIGNvbnN0IHBhcnNlZFR5cGVWYWx1ZSA9IE51bWJlci5wYXJzZUludChTdHJpbmcoZHJhZnRUeXBlVmFsdWVDb2RlIHx8IFwiXCIpLnRyaW0oKSwgMTApO1xyXG4gICAgY29uc3QgcGFyc2VkUHJpY2UgPSBwYXJzZU51bWJlcihkcmFmdFByaWNlKTtcclxuICAgIGNvbnN0IHBhcnNlZFF0eSA9IHBhcnNlTnVtYmVyKGRyYWZ0UXR5KTtcclxuICAgIGNvbnN0IHBhcnNlZEludGVybmF0aW9uYWwgPSBwYXJzZUV4cGVuc2VJbnRlcm5hdGlvbmFsVmFsdWUoZHJhZnRJbnRlcm5hdGlvbmFsKTtcclxuXHJcbiAgICBjb25zdCBoYXNWYWxpZFF0eVByaWNlID0gcGFyc2VkUXR5ICE9IG51bGwgJiYgcGFyc2VkUXR5ID4gMCAmJiBwYXJzZWRQcmljZSAhPSBudWxsICYmIHBhcnNlZFByaWNlID4gMDtcclxuICAgIGlmICghaGFzVmFsaWRRdHlQcmljZSkge1xyXG4gICAgICBvbkludmFsaWRBbW91bnRRdHk/LigpO1xyXG4gICAgICBjb25zdCB2YWxpZGF0aW9uTWVzc2FnZSA9IGluZFQoXHJcbiAgICAgICAgXCJFeHBlbnNlU2hlZXRzX0xpbmVfVmFsaWRhdGlvbl9BbW91bnRRdHlcIixcclxuICAgICAgICBcIlF1YW50aXR5IGFuZCBwcmljZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwLlwiXHJcbiAgICAgICk7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IodmFsaWRhdGlvbk1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXModmFsaWRhdGlvbk1lc3NhZ2UpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFub3JtYWxpemVkRGF0ZSkge1xyXG4gICAgICBzZXRNb2RhbEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gICAgICBzZXRTdGF0dXMoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZShwYXJzZWRUeXBlVmFsdWUpIHx8IHBhcnNlZFR5cGVWYWx1ZSA8PSAwKSB7XHJcbiAgICAgIG9uSW52YWxpZFR5cGU/LigpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgIHN0YXJ0U3RhdHVzOiBpc0NyZWF0ZU1vZGVcclxuICAgICAgICA/IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVfRGV0YWlsX0NyZWF0aW5nXCIsIFwiQ3JlYXRpbmcgZXhwZW5zZSBsaW5lLi4uXCIpXHJcbiAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9VcGRhdGluZ1wiLCBcIlVwZGF0aW5nIGV4cGVuc2UgbGluZS4uLlwiKSxcclxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldEJ1c3ksXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29tbW9uTGluZVBheWxvYWQgPSB7XHJcbiAgICAgICAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWREYXRlLFxyXG4gICAgICAgICAgdHlwZVZhbHVlOiBwYXJzZWRUeXBlVmFsdWUsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogU3RyaW5nKGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpLFxyXG4gICAgICAgICAgaW50ZXJuYWNpb25hbDogcGFyc2VkSW50ZXJuYXRpb25hbCA/PyBsaW5lPy5pbnRlcm5hY2lvbmFsID8/IGZhbHNlLFxyXG4gICAgICAgICAgdGlja2V0OiBsaW5lPy50aWNrZXQgPT09IHRydWUsXHJcbiAgICAgICAgICBxdHk6IE51bWJlcihwYXJzZWRRdHkpLFxyXG4gICAgICAgICAgcHJpY2U6IE51bWJlcihwYXJzZWRQcmljZSksXHJcbiAgICAgICAgICBwcm9qSWQ6IFN0cmluZyhkcmFmdFByb2plY3RJZCB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgaW5kQXR0YWNoRmlsZXM6IHNhZmVUZXh0KGxpbmU/LmluZEF0dGFjaEZpbGVzKSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBjcmVhdGVMaW5lUGF5bG9hZDogRXhwZW5zZVNoZWV0Q3JlYXRlTGluZVJlcXVlc3QgPSBjb21tb25MaW5lUGF5bG9hZDtcclxuICAgICAgICBjb25zdCB1cGRhdGVMaW5lUGF5bG9hZDogRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlcXVlc3QgPSBjb21tb25MaW5lUGF5bG9hZDtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBpc0NyZWF0ZU1vZGVcclxuICAgICAgICAgID8gYXdhaXQgY3JlYXRlRXhwZW5zZVNoZWV0KHtcclxuICAgICAgICAgICAgICBtb2RlOiAyLFxyXG4gICAgICAgICAgICAgIGV4aXN0aW5nSG9qYUdhc3Rvc0lkOiBzaGVldElkLFxyXG4gICAgICAgICAgICAgIGxpbmVzOiBbY3JlYXRlTGluZVBheWxvYWRdLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgOiBhd2FpdCB1cGRhdGVFeHBlbnNlU2hlZXRMaW5lKHNoZWV0SWQsIGxpbmVJZCwgdXBkYXRlTGluZVBheWxvYWQpO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfQ3JlYXRlZFwiLCBcIkV4cGVuc2UgbGluZSBjcmVhdGVkXCIpKTtcclxuICAgICAgICAgIG9uQ3JlYXRlU3VjY2VzcygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2UgbGluZSB1cGRhdGVkXCIpKTtcclxuICAgICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICB9LCBbXHJcbiAgICBidXN5LFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICAgIGNhbkVkaXRFeHBlbnNlLFxyXG4gICAgZHJhZnRQcmljZSxcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdEludGVybmF0aW9uYWwsXHJcbiAgICBkcmFmdFByb2plY3RJZCxcclxuICAgIGRyYWZ0UXR5LFxyXG4gICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICBkcmFmdFR5cGVWYWx1ZUNvZGUsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0VkaXRMb2NrZWQsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBsaW5lLFxyXG4gICAgbGluZUlkLFxyXG4gICAgb25DcmVhdGVTdWNjZXNzLFxyXG4gICAgb25JbnZhbGlkQW1vdW50UXR5LFxyXG4gICAgb25JbnZhbGlkVHlwZSxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2hlZXRJZCxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChpc0RlbGV0ZUxvY2tlZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5EZWxldGVFeHBlbnNlKSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBleHBlbnNlIGxpbmUuLi5cIiksXHJcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRXJyb3JcIiwgXCJEZWxldGUgZXJyb3IuXCIpLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRCdXN5LFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNhZmVMaW5rZWRUaWNrZXRGaWxlSWQgPSBzYWZlVGV4dChsaW5rZWRUaWNrZXRGaWxlSWQpO1xyXG4gICAgICAgIGlmIChzYWZlTGlua2VkVGlja2V0RmlsZUlkKSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVGaWxlUmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRGaWxlKHNhZmVMaW5rZWRUaWNrZXRGaWxlSWQpO1xyXG4gICAgICAgICAgICBpZiAoIWRlbGV0ZUZpbGVSZXNwb25zZS5TdWNjZXNzICYmICFpc01pc3NpbmdUaWNrZXRGaWxlTWVzc2FnZShkZWxldGVGaWxlUmVzcG9uc2UuTWVzc2FnZSkpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGVsZXRlRmlsZVJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgaWYgKCFpc05vdEZvdW5kRXJyb3IoZXJyb3IpKSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVUaWNrZXRSZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldChzYWZlTGlua2VkVGlja2V0RmlsZUlkKTtcclxuICAgICAgICAgICAgaWYgKCFkZWxldGVUaWNrZXRSZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRlbGV0ZVRpY2tldFJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgaWYgKCFpc05vdEZvdW5kRXJyb3IoZXJyb3IpKSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0TGluZShzaGVldElkLCBsaW5lSWQpO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfRGVsZXRlZFwiLCBcIkV4cGVuc2UgbGluZSBkZWxldGVkXCIpKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQub2s7XHJcbiAgfSwgW1xyXG4gICAgYnVzeSxcclxuICAgIGNhbkRlbGV0ZUV4cGVuc2UsXHJcbiAgICBpc0RlbGV0ZUxvY2tlZCxcclxuICAgIGxpbmVJZCxcclxuICAgIGxpbmtlZFRpY2tldEZpbGVJZCxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2hlZXRJZCxcclxuICBdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyB9IGZyb20gXCIuLi9ob29rcy91c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnNBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XHJcbiAgYWN0aW9uTW9kZT86IFwiZGVmYXVsdFwiIHwgXCJkZWxldGVfb25seVwiIHwgXCJ2aWV3X29ubHlcIjtcclxuICBwZXJtaXNzaW9uc1JlYWR5PzogYm9vbGVhbjtcclxuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkVkaXRFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgc2hlZXRJZDogc3RyaW5nO1xyXG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcclxuICBjYW5PcGVuU2F2ZUNvbmZpcm0/OiAoKSA9PiBib29sZWFuO1xyXG4gIGhhbmRsZVVwZGF0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBoYW5kbGVEZWxldGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgb25TYXZlU3VjY2VzczogKCkgPT4gdm9pZDtcclxuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcclxuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XHJcbiAgfSkgPT4gdm9pZDtcclxuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBDb29yZGluYXRlcyB0b3BiYXIgaWNvbiBzdGF0ZSBhbmQgZGlzcGF0Y2ggYWN0aW9ucyBmb3IgZXhwZW5zZSBzaGVldCBsaW5lIGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsT3BlbixcclxuICBpc0VkaXRpbmcsXHJcbiAgaXNDcmVhdGVNb2RlLFxyXG4gIGlzTG9ja2VkLFxyXG4gIGFjdGlvbk1vZGUgPSBcImRlZmF1bHRcIixcclxuICBwZXJtaXNzaW9uc1JlYWR5ID0gdHJ1ZSxcclxuICBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gIGNhbkVkaXRFeHBlbnNlLFxyXG4gIGNhbkRlbGV0ZUV4cGVuc2UsXHJcbiAgc2hlZXRJZCxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgaGFuZGxlVXBkYXRlLFxyXG4gIGhhbmRsZURlbGV0ZSxcclxuICBvblNhdmVTdWNjZXNzLFxyXG4gIG9wZW5Db25maXJtLFxyXG4gIGNsb3NlQ29uZmlybSxcclxufTogVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnNBcmdzKSA9PiB7XHJcbiAgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zKHtcclxuICAgIGFjdGlvbkdyb3VwSWQ6IFwiZXhwZW5zZS1saW5lLWRldGFpbC1hY3Rpb25zXCIsXHJcbiAgICBpZHM6IHtcclxuICAgICAgZWRpdEljb25JZDogXCJleHBlbnNlTGluZUVkaXRJY29uXCIsXHJcbiAgICAgIHNhdmVJY29uSWQ6IFwiZXhwZW5zZUxpbmVTYXZlSWNvblwiLFxyXG4gICAgICBkZWxldGVCdG5JZDogXCJleHBlbnNlTGluZURlbGV0ZUJ0blwiLFxyXG4gICAgICBjYW5jZWxCdG5JZDogXCJleHBlbnNlTGluZUNhbmNlbEJ0blwiLFxyXG4gICAgfSxcclxuICAgIGV2ZW50czoge1xyXG4gICAgICBlZGl0RXZlbnQ6IFwiZXhwZW5zZS1saW5lLWRldGFpbC1lZGl0XCIsXHJcbiAgICAgIGRlbGV0ZUV2ZW50OiBcImV4cGVuc2UtbGluZS1kZXRhaWwtZGVsZXRlXCIsXHJcbiAgICAgIGNhbmNlbEV2ZW50OiBcImV4cGVuc2UtbGluZS1kZXRhaWwtY2FuY2VsLWVkaXRcIixcclxuICAgIH0sXHJcbiAgICBidXN5LFxyXG4gICAgbW9kYWxPcGVuLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNMb2NrZWQsXHJcbiAgICBhY3Rpb25Nb2RlLFxyXG4gICAgcGVybWlzc2lvbnNSZWFkeSxcclxuICAgIGNhbkNyZWF0ZTogY2FuQ3JlYXRlRXhwZW5zZSxcclxuICAgIGNhbkVkaXQ6IGNhbkVkaXRFeHBlbnNlLFxyXG4gICAgY2FuRGVsZXRlOiBjYW5EZWxldGVFeHBlbnNlLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlU2F2ZTogaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgc2F2ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiU2F2ZSBjaGFuZ2VzXCIpLFxyXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXHJcbiAgICBzYXZlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXHJcbiAgICBkZWxldGVDb25maXJtVGl0bGU6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9UaXRsZVwiLCBcIkRlbGV0ZVwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiQ29uZmlybV9EZWxldGVfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/XCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpLFxyXG4gICAgb25TYXZlU3VjY2VzcyxcclxuICAgIG9uRGVsZXRlU3VjY2VzczogKCkgPT4ge1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNoZWV0SWQpfWApO1xyXG4gICAgfSxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gIH0pO1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbENvbmZpcm1EaWFsb2dBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxFcnJvcjogc3RyaW5nO1xyXG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbn07XHJcblxyXG4vLyBLZWVwcyBsaW5lIGRldGFpbCBjb25maXJtIGRpYWxvZyB3aXJpbmcgb3V0c2lkZSB0aGUgcGFnZSBjb21wb25lbnQuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsQ29uZmlybURpYWxvZyA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbEVycm9yLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgc2V0U3RhdHVzLFxyXG59OiBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsQ29uZmlybURpYWxvZ0FyZ3MpID0+IHtcclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcclxuICAgICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtLCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXNdKTtcclxuXHJcbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XHJcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcclxuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICFidXN5ICYmIG1vZGFsRXJyb3JcclxuICAgICAgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIilcclxuICAgICAgOiBtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2b2lkIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xyXG4gIH0sIFtidXN5LCBjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbW9kYWxFcnJvcl0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbW9kYWwsXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICAgIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgICBtb2RhbENhbmNlbFRleHQsXHJcbiAgICBtb2RhbENvbmZpcm1UZXh0LFxyXG4gICAgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0SGVhZGVyLCBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldERldGFpbCwgZ2V0RnVlbFByaWNlS20sIG1hcEV4cGVuc2VTaGVldEhlYWRlciwgbWFwRXhwZW5zZVNoZWV0TGluZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLFxyXG4gIG5hdmlnYXRlVG9FeHBlbnNlVXJsLFxyXG4gIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IGhhc0Fzc2lnbmVkVm91Y2hlciwgcGFyc2VFeHBlbnNlRGF0ZSwgc2FmZVRleHQsIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFLCB0b0V4cGVuc2VBcGlEZE1tWXl5eSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcbmltcG9ydCB7IHJlc29sdmVFeHBlbnNlU2hlZXREZXRhaWxQb2xpY3kgfSBmcm9tIFwiLi4vZGV0YWlsL2V4cGVuc2VTaGVldERldGFpbFBvbGljeS50c1wiO1xyXG5pbXBvcnQgeyBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VNYW5hZ2VkVXNlclNjb3BlLnRzXCI7XHJcblxyXG5jb25zdCBLTV9HQVNUT19UWVBFX0NPREUgPSBcIjNcIjtcclxuY29uc3QgRlVFTF9QUklDRV9ERUJPVU5DRV9NUyA9IDMwMDtcclxuY29uc3QgRlVFTF9QUklDRV9TT1VSQ0VfVVNFUl9DT05GSUcgPSBcIkNSTUhvamFHYXN0b3NVc2VyUHJpY2VLbUZlY2hhVGFibGVcIjtcclxuY29uc3QgRlVFTF9QUklDRV9TT1VSQ0VfR0xPQkFMX0NPTkZJRyA9IFwiQ1JNUGFyYW1ldGVyc1wiO1xyXG5jb25zdCBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRCA9IDI7XHJcbmNvbnN0IEVYUEVOU0VfU1RBVFVTX1BBSUQgPSA0O1xyXG5cclxuY29uc3QgdG9JbnB1dERhdGUgPSAocmF3Pzogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBwYXJzZUV4cGVuc2VEYXRlKHJhdyk7XHJcbiAgcmV0dXJuIHBhcnNlZCA/IHRvSXNvRGF0ZShwYXJzZWQpIDogXCJcIjtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdEVkaXRhYmxlTnVtYmVyID0gKHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKHZhbHVlLCB7XHJcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0RWRpdGFibGVRdWFudGl0eSA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcih2YWx1ZSwge1xyXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICBmYWxsYmFjazogXCJcIixcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUZ1ZWxUcmFuc0RhdGUgPSAocmF3OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiB0b0V4cGVuc2VBcGlEZE1tWXl5eShyYXcpO1xyXG59O1xyXG5cclxuLy8gUmVzb2x2ZXMgbG9jYWxpemVkIGZ1ZWwgcHJpY2Ugc291cmNlIG1lc3NhZ2VzIGZvciBrbm93biBiYWNrZW5kIHNvdXJjZXMuXHJcbmNvbnN0IHJlc29sdmVGdWVsUHJpY2VTb3VyY2VNZXNzYWdlID0gKHNvdXJjZTogc3RyaW5nLCBlZmZlY3RpdmVEYXRlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRTb3VyY2UgPSBzYWZlVGV4dChzb3VyY2UpO1xyXG4gIGlmIChub3JtYWxpemVkU291cmNlID09PSBGVUVMX1BSSUNFX1NPVVJDRV9VU0VSX0NPTkZJRykge1xyXG4gICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0Z1ZWxQcmljZV9Tb3VyY2VfVXNlckNvbmZpZ1wiLCBcIk9idGFpbmVkIGJ5IHVzZXIgY29uZmlndXJhdGlvbi5cIik7XHJcbiAgfVxyXG5cclxuICBpZiAobm9ybWFsaXplZFNvdXJjZSA9PT0gRlVFTF9QUklDRV9TT1VSQ0VfR0xPQkFMX0NPTkZJRykge1xyXG4gICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0Z1ZWxQcmljZV9Tb3VyY2VfR2xvYmFsQ29uZmlnXCIsIFwiT2J0YWluZWQgYnkgZ2xvYmFsIGNvbmZpZ3VyYXRpb24uXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc291cmNlTGFiZWwgPSBpbmRUKFwiRXhwZW5zZVNoZWV0c19GdWVsUHJpY2VfU291cmNlXCIsIFwiRnVlbCBwcmljZSBzb3VyY2VcIik7XHJcbiAgaWYgKCFub3JtYWxpemVkU291cmNlKSB7XHJcbiAgICByZXR1cm4gZWZmZWN0aXZlRGF0ZSA/IGAke3NvdXJjZUxhYmVsfTogJHtlZmZlY3RpdmVEYXRlfWAgOiBzb3VyY2VMYWJlbDtcclxuICB9XHJcblxyXG4gIHJldHVybiBlZmZlY3RpdmVEYXRlXHJcbiAgICA/IGAke3NvdXJjZUxhYmVsfTogJHtub3JtYWxpemVkU291cmNlfSAoJHtlZmZlY3RpdmVEYXRlfSlgXHJcbiAgICA6IGAke3NvdXJjZUxhYmVsfTogJHtub3JtYWxpemVkU291cmNlfWA7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZENyZWF0ZUxpbmVEcmFmdCA9IChiYXNlRGF0ZTogc3RyaW5nLCBwcm9qZWN0SWQ6IHN0cmluZyk6IEV4cGVuc2VTaGVldExpbmUgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBsaW5lUmVjSWQ6IFwiXCIsXHJcbiAgICB0cmFuc0RhdGU6IGJhc2VEYXRlLFxyXG4gICAgdHlwZVZhbHVlOiBcIlwiLFxyXG4gICAgdHlwZVZhbHVlQ29kZTogXCJcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxyXG4gICAgaW50ZXJuYWNpb25hbDogZmFsc2UsXHJcbiAgICB0aWNrZXQ6IGZhbHNlLFxyXG4gICAgcHJpY2U6IG51bGwsXHJcbiAgICBxdHk6IDEsXHJcbiAgICBhbW91bnQ6IG51bGwsXHJcbiAgICBwcm9qSWQ6IHByb2plY3RJZCxcclxuICAgIGluZEF0dGFjaEZpbGVzOiBcIlwiLFxyXG4gIH07XHJcbn07XHJcblxyXG50eXBlIFVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZUFyZ3MgPSB7XHJcbiAgaGFzQWNjZXNzOiBib29sZWFuO1xyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGJvb2xlYW47XHJcbiAgY2FuTWFuYWdlT3RoZXJVc2VyczogYm9vbGVhbjtcclxuICBjdXJyZW50QXhVc2VySWQ6IHN0cmluZztcclxuICBjdXJyZW50Q3JtVXNlcklkOiBzdHJpbmc7XHJcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkOiBzdHJpbmc7XHJcbiAgc2hlZXRJZDogc3RyaW5nO1xyXG4gIGxpbmVJZDogc3RyaW5nO1xyXG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcclxuICBzdGFydEluRWRpdE1vZGU6IGJvb2xlYW47XHJcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBPd25zIHN0YXRlIGFuZCBiZWhhdmlvciBmb3IgZXhwZW5zZSBsaW5lIGRldGFpbCBwYWdlIChyZWFkLCBlZGl0LCBjcmVhdGUpLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFN0YXRlID0gKHtcclxuICBoYXNBY2Nlc3MsXHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gIGN1cnJlbnRBeFVzZXJJZCxcclxuICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICBzaGVldElkLFxyXG4gIGxpbmVJZCxcclxuICBpc0NyZWF0ZU1vZGUsXHJcbiAgc3RhcnRJbkVkaXRNb2RlLFxyXG4gIG9uRm9yYmlkZGVuLFxyXG59OiBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGVBcmdzKSA9PiB7XHJcbiAgY29uc3QgW2hlYWRlciwgc2V0SGVhZGVyXSA9IHVzZVN0YXRlPEV4cGVuc2VTaGVldEhlYWRlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtsaW5lLCBzZXRMaW5lXSA9IHVzZVN0YXRlPEV4cGVuc2VTaGVldExpbmUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtpc0VkaXRpbmcsIHNldElzRWRpdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW21vZGFsRXJyb3IsIHNldE1vZGFsRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0RGVzY3JpcHRpb24sIHNldERyYWZ0RGVzY3JpcHRpb25dID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0VHJhbnNEYXRlLCBzZXREcmFmdFRyYW5zRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRUeXBlVmFsdWVDb2RlLCBzZXREcmFmdFR5cGVWYWx1ZUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0UHJpY2UsIHNldERyYWZ0UHJpY2VdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0UXR5LCBzZXREcmFmdFF0eV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRQcm9qZWN0SWQsIHNldERyYWZ0UHJvamVjdElkXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdEludGVybmF0aW9uYWwsIHNldERyYWZ0SW50ZXJuYXRpb25hbF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbaXNGdWVsUHJpY2VMb2FkaW5nLCBzZXRJc0Z1ZWxQcmljZUxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtmdWVsUHJpY2VNZXNzYWdlLCBzZXRGdWVsUHJpY2VNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtmdWVsUHJpY2VNZXNzYWdlSXNFcnJvciwgc2V0RnVlbFByaWNlTWVzc2FnZUlzRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICBjb25zdCBoeWRyYXRlRHJhZnRGcm9tTGluZSA9IHVzZUNhbGxiYWNrKChuZXh0TGluZTogRXhwZW5zZVNoZWV0TGluZSB8IG51bGwsIG5leHRIZWFkZXI6IEV4cGVuc2VTaGVldEhlYWRlciB8IG51bGwpID0+IHtcbiAgICBjb25zdCBpc0V4aXN0aW5nTGluZSA9ICEhc2FmZVRleHQobmV4dExpbmU/LmxpbmVSZWNJZCk7XG4gICAgY29uc3Qgbm9ybWFsaXplZExpbmVQcm9qZWN0SWQgPSBzYWZlVGV4dChuZXh0TGluZT8ucHJvaklkKTtcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uKHNhZmVUZXh0KG5leHRMaW5lPy5kZXNjcmlwdGlvbikpO1xuICAgIHNldERyYWZ0VHJhbnNEYXRlKHRvSW5wdXREYXRlKG5leHRMaW5lPy50cmFuc0RhdGUgfHwgbmV4dEhlYWRlcj8uY3JlYXRlZERhdGUpKTtcbiAgICBzZXREcmFmdFR5cGVWYWx1ZUNvZGUoc2FmZVRleHQobmV4dExpbmU/LnR5cGVWYWx1ZUNvZGUpKTtcbiAgICBzZXREcmFmdFByaWNlKGZvcm1hdEVkaXRhYmxlTnVtYmVyKG5leHRMaW5lPy5wcmljZSkpO1xuICAgIHNldERyYWZ0UXR5KGZvcm1hdEVkaXRhYmxlUXVhbnRpdHkobmV4dExpbmU/LnF0eSkpO1xuICAgIHNldERyYWZ0UHJvamVjdElkKGlzRXhpc3RpbmdMaW5lID8gbm9ybWFsaXplZExpbmVQcm9qZWN0SWQgOiAobm9ybWFsaXplZExpbmVQcm9qZWN0SWQgfHwgc2FmZVRleHQobmV4dEhlYWRlcj8ucHJvaklkKSkpO1xuICAgIHNldERyYWZ0SW50ZXJuYXRpb25hbChuZXh0TGluZT8uaW50ZXJuYWNpb25hbCA9PT0gdHJ1ZSA/IFwidHJ1ZVwiIDogbmV4dExpbmU/LmludGVybmFjaW9uYWwgPT09IGZhbHNlID8gXCJmYWxzZVwiIDogXCJcIik7XG4gIH0sIFtdKTtcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBsb2FkRGV0YWlsID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBpZiAoIWhhc0FjY2Vzcykge1xyXG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXNoZWV0SWQpIHtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IGxpbmUgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwoc2hlZXRJZCwge1xyXG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlPy5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGxpbmUgZGV0YWlsLlwiKSk7XHJcbiAgICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IHNoZWV0cyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XHJcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZFNoZWV0ID1cclxuICAgICAgICAgICAgc2hlZXRzLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uSG9qYUdhc3Rvc0lkKS50b1VwcGVyQ2FzZSgpID09PSBzaGVldElkLnRyaW0oKS50b1VwcGVyQ2FzZSgpKSB8fCBzaGVldHNbMF07XHJcblxyXG4gICAgICAgICAgaWYgKCFzZWxlY3RlZFNoZWV0KSB7XHJcbiAgICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgbGluZSB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IGxvYWRlZEhlYWRlciA9IG1hcEV4cGVuc2VTaGVldEhlYWRlcihzZWxlY3RlZFNoZWV0KTtcclxuICAgICAgICAgIGNvbnN0IGxvYWRlZFN0YXR1c0NvZGUgPSB0eXBlb2YgbG9hZGVkSGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IGxvYWRlZEhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgOiBudWxsO1xyXG4gICAgICAgICAgY29uc3QgaXNDcmVhdGVMb2NrZWRTdGF0dXMgPSBsb2FkZWRTdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRCB8fCBsb2FkZWRTdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19QQUlEO1xyXG4gICAgICAgICAgY29uc3QgaXNNYW5hZ2luZ090aGVyVXNlciA9IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQoe1xyXG4gICAgICAgICAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgICAgICAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICAgICAgICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgICAgICAgcmVjb3JkT3duZXJVc2VySWQ6IGxvYWRlZEhlYWRlci51c2VySWQsXHJcbiAgICAgICAgICAgIGlzQ3JlYXRlTW9kZTogZmFsc2UsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNvbnN0IGxvYWRlZFBvbGljeSA9IHJlc29sdmVFeHBlbnNlU2hlZXREZXRhaWxQb2xpY3koe1xyXG4gICAgICAgICAgICBzdGF0dXNDb2RlOiBsb2FkZWRTdGF0dXNDb2RlLFxyXG4gICAgICAgICAgICBpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgICAgICAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgICAgICAgICBpc1BhaWQ6IGlzQ3JlYXRlTG9ja2VkU3RhdHVzIHx8IGhhc0Fzc2lnbmVkVm91Y2hlcihsb2FkZWRIZWFkZXIudm91Y2hlciksXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmIChpc0NyZWF0ZUxvY2tlZFN0YXR1cyB8fCBoYXNBc3NpZ25lZFZvdWNoZXIobG9hZGVkSGVhZGVyLnZvdWNoZXIpKSB7XHJcbiAgICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUGFpZFJlYWRPbmx5XCIsIFwiUGFpZCBleHBlbnNlIHNoZWV0cyBhcmUgcmVhZC1vbmx5LlwiKSk7XHJcbiAgICAgICAgICAgIHNldEhlYWRlcihsb2FkZWRIZWFkZXIpO1xyXG4gICAgICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAobG9hZGVkUG9saWN5LmludGVyYWN0aW9uTW9kZSAhPT0gXCJmdWxsX2VkaXRcIikge1xyXG4gICAgICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgZHJhZnRMaW5lID0gYnVpbGRDcmVhdGVMaW5lRHJhZnQodG9Jc29EYXRlKG5ldyBEYXRlKCkpLCBzYWZlVGV4dChsb2FkZWRIZWFkZXIucHJvaklkKSk7XHJcbiAgICAgICAgICBzZXRIZWFkZXIobG9hZGVkSGVhZGVyKTtcclxuICAgICAgICAgIHNldExpbmUoZHJhZnRMaW5lKTtcclxuICAgICAgICAgIHNldElzRWRpdGluZyh0cnVlKTtcclxuICAgICAgICAgIGh5ZHJhdGVEcmFmdEZyb21MaW5lKGRyYWZ0TGluZSwgbG9hZGVkSGVhZGVyKTtcclxuICAgICAgICAgIHNldFN0YXR1cyhcIlwiKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghbGluZUlkKSB7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IGxpbmUgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwoc2hlZXRJZCwge1xyXG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZT8uTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBsaW5lIGRldGFpbC5cIikpO1xyXG4gICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNoZWV0cyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRTaGVldCA9XHJcbiAgICAgICAgICBzaGVldHMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5Py5Ib2phR2FzdG9zSWQpLnRvVXBwZXJDYXNlKCkgPT09IHNoZWV0SWQudHJpbSgpLnRvVXBwZXJDYXNlKCkpIHx8IHNoZWV0c1swXTtcclxuXHJcbiAgICAgICAgaWYgKCFzZWxlY3RlZFNoZWV0KSB7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IGxpbmUgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1hcHBlZEhlYWRlciA9IG1hcEV4cGVuc2VTaGVldEhlYWRlcihzZWxlY3RlZFNoZWV0KTtcclxuICAgICAgICBjb25zdCBtYXBwZWRMaW5lcyA9IChBcnJheS5pc0FycmF5KHNlbGVjdGVkU2hlZXQuTGluZXMpID8gc2VsZWN0ZWRTaGVldC5MaW5lcyA6IFtdKS5tYXAoKGVudHJ5KSA9PlxyXG4gICAgICAgICAgbWFwRXhwZW5zZVNoZWV0TGluZShlbnRyeSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkTGluZSA9XHJcbiAgICAgICAgICBtYXBwZWRMaW5lcy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnkubGluZVJlY0lkKS50b1VwcGVyQ2FzZSgpID09PSBsaW5lSWQudHJpbSgpLnRvVXBwZXJDYXNlKCkpIHx8IG51bGw7XHJcblxyXG4gICAgICAgIGlmICghc2VsZWN0ZWRMaW5lKSB7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IGxpbmUgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgICAgc2V0SGVhZGVyKG1hcHBlZEhlYWRlcik7XHJcbiAgICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0SGVhZGVyKG1hcHBlZEhlYWRlcik7XHJcbiAgICAgICAgc2V0TGluZShzZWxlY3RlZExpbmUpO1xyXG4gICAgICAgIGNvbnN0IGxvYWRlZFN0YXR1c0NvZGUgPSB0eXBlb2YgbWFwcGVkSGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IG1hcHBlZEhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgOiBudWxsO1xyXG4gICAgICAgIGNvbnN0IGxvYWRlZElzU2hlZXRBcHByb3ZlZCA9IGxvYWRlZFN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkVEO1xyXG4gICAgICAgIGNvbnN0IGxvYWRlZElzU2hlZXRQYWlkQnlTdGF0dXMgPSBsb2FkZWRTdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19QQUlEO1xyXG4gICAgICAgIGNvbnN0IGxvYWRlZElzU2hlZXRQYWlkID0gbG9hZGVkSXNTaGVldFBhaWRCeVN0YXR1cyB8fCBoYXNBc3NpZ25lZFZvdWNoZXIobWFwcGVkSGVhZGVyLnZvdWNoZXIpO1xyXG4gICAgICAgIGNvbnN0IGxvYWRlZEhhc0xpbmtlZFRpY2tldCA9ICEhc2FmZVRleHQoc2VsZWN0ZWRMaW5lLmZpbGVJZCk7XHJcbiAgICAgICAgY29uc3QgbG9hZGVkSXNNYW5hZ2luZ090aGVyVXNlciA9IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQoe1xyXG4gICAgICAgICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgICAgICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgICAgICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICAgICAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICAgICAgICByZWNvcmRPd25lclVzZXJJZDogbWFwcGVkSGVhZGVyLnVzZXJJZCxcclxuICAgICAgICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBsb2FkZWRQb2xpY3kgPSByZXNvbHZlRXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5KHtcclxuICAgICAgICAgIHN0YXR1c0NvZGU6IGxvYWRlZFN0YXR1c0NvZGUsXHJcbiAgICAgICAgICBpc01hbmFnaW5nT3RoZXJVc2VyOiBsb2FkZWRJc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgICAgICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgICAgICAgIGlzUGFpZDogbG9hZGVkSXNTaGVldFBhaWQsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHN0YXJ0SW5FZGl0TW9kZSAmJlxyXG4gICAgICAgICAgIWxvYWRlZElzU2hlZXRBcHByb3ZlZCAmJlxyXG4gICAgICAgICAgIWxvYWRlZElzU2hlZXRQYWlkICYmXHJcbiAgICAgICAgICAhbG9hZGVkSGFzTGlua2VkVGlja2V0ICYmXHJcbiAgICAgICAgICAhbG9hZGVkSXNNYW5hZ2luZ090aGVyVXNlciAmJlxyXG4gICAgICAgICAgbG9hZGVkUG9saWN5LmludGVyYWN0aW9uTW9kZSA9PT0gXCJmdWxsX2VkaXRcIlxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgc2V0SXNFZGl0aW5nKHRydWUpO1xyXG4gICAgICAgICAgaHlkcmF0ZURyYWZ0RnJvbUxpbmUoc2VsZWN0ZWRMaW5lLCBtYXBwZWRIZWFkZXIpO1xyXG4gICAgICAgICAgc2V0U3RhdHVzKFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgbGluZSBkZXRhaWwuXCIpKTtcclxuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZvaWQgbG9hZERldGFpbCgpO1xyXG4gIH0sIFtcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIGhhc0FjY2VzcyxcclxuICAgIGh5ZHJhdGVEcmFmdEZyb21MaW5lLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgc3RhcnRJbkVkaXRNb2RlLFxyXG4gICAgbGluZUlkLFxyXG4gICAgb25Gb3JiaWRkZW4sXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICBzaGVldElkLFxyXG4gIF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFsaW5lIHx8IGlzRWRpdGluZykgcmV0dXJuO1xyXG4gICAgaHlkcmF0ZURyYWZ0RnJvbUxpbmUobGluZSwgaGVhZGVyKTtcclxuICB9LCBbaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tTGluZSwgaXNFZGl0aW5nLCBsaW5lXSk7XHJcblxyXG4gIGNvbnN0IG5vcm1hbGl6ZWREcmFmdFR5cGVWYWx1ZUNvZGUgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KGRyYWZ0VHlwZVZhbHVlQ29kZSksIFtkcmFmdFR5cGVWYWx1ZUNvZGVdKTtcclxuICBjb25zdCBub3JtYWxpemVkRnVlbFRyYW5zRGF0ZSA9IHVzZU1lbW8oKCkgPT4gbm9ybWFsaXplRnVlbFRyYW5zRGF0ZShkcmFmdFRyYW5zRGF0ZSksIFtkcmFmdFRyYW5zRGF0ZV0pO1xyXG4gIGNvbnN0IGlzS21UeXBlID0gbm9ybWFsaXplZERyYWZ0VHlwZVZhbHVlQ29kZSA9PT0gS01fR0FTVE9fVFlQRV9DT0RFO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbGV0IGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICBsZXQgdGltZXI6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbCA9IG51bGw7XHJcbiAgICBsZXQgY29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgY29uc3QgY2xlYXJQZW5kaW5nID0gKCkgPT4ge1xyXG4gICAgICBpZiAodGltZXIpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gICAgICAgIHRpbWVyID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29udHJvbGxlcikge1xyXG4gICAgICAgIGNvbnRyb2xsZXIuYWJvcnQoKTtcclxuICAgICAgICBjb250cm9sbGVyID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoIWlzRWRpdGluZyB8fCAhaXNLbVR5cGUpIHtcclxuICAgICAgc2V0SXNGdWVsUHJpY2VMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNsZWFyUGVuZGluZygpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghbm9ybWFsaXplZEZ1ZWxUcmFuc0RhdGUpIHtcclxuICAgICAgc2V0SXNGdWVsUHJpY2VMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZShFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XHJcbiAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgY2xlYXJQZW5kaW5nKCk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcclxuICAgICAgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuICAgICAgc2V0SXNGdWVsUHJpY2VMb2FkaW5nKHRydWUpO1xyXG4gICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlKFwiXCIpO1xyXG4gICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlSXNFcnJvcihmYWxzZSk7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ2V0RnVlbFByaWNlS20obm9ybWFsaXplZEZ1ZWxUcmFuc0RhdGUsIHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2VzcyB8fCAhcmVzcG9uc2UuRGF0YSB8fCAhTnVtYmVyLmlzRmluaXRlKE51bWJlcihyZXNwb25zZS5EYXRhLlByaWNlS20pKSkge1xyXG4gICAgICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZShcclxuICAgICAgICAgICAgc2FmZVRleHQocmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRnVlbFByaWNlX05vdEZvdW5kXCIsIFwiQ291bGQgbm90IGxvYWQgZnVlbCBwcmljZSBmb3Iga20uXCIpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZXNvbHZlZFByaWNlID0gTnVtYmVyKHJlc3BvbnNlLkRhdGEuUHJpY2VLbSk7XHJcbiAgICAgICAgaWYgKHJlc29sdmVkUHJpY2UgPiAwKSB7XHJcbiAgICAgICAgICBzZXREcmFmdFByaWNlKGZvcm1hdEVkaXRhYmxlTnVtYmVyKHJlc29sdmVkUHJpY2UpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGEuU291cmNlKTtcclxuICAgICAgICBjb25zdCBlZmZlY3RpdmVEYXRlID0gc2FmZVRleHQocmVzcG9uc2UuRGF0YS5UcmFuc0RhdGUpIHx8IG5vcm1hbGl6ZWRGdWVsVHJhbnNEYXRlO1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSByZXNvbHZlRnVlbFByaWNlU291cmNlTWVzc2FnZShzb3VyY2UsIGVmZmVjdGl2ZURhdGUpO1xyXG4gICAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikgcmV0dXJuO1xyXG5cclxuICAgICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlKFxyXG4gICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBFcnJvclxyXG4gICAgICAgICAgICA/IGVycm9yLm1lc3NhZ2VcclxuICAgICAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GdWVsUHJpY2VfTm90Rm91bmRcIiwgXCJDb3VsZCBub3QgbG9hZCBmdWVsIHByaWNlIGZvciBrbS5cIilcclxuICAgICAgICApO1xyXG4gICAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIGlmICghaXNDYW5jZWxsZWQpIHtcclxuICAgICAgICAgIHNldElzRnVlbFByaWNlTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LCBGVUVMX1BSSUNFX0RFQk9VTkNFX01TKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpc0NhbmNlbGxlZCA9IHRydWU7XHJcbiAgICAgIGNsZWFyUGVuZGluZygpO1xyXG4gICAgfTtcclxuICB9LCBbaXNFZGl0aW5nLCBpc0ttVHlwZSwgbm9ybWFsaXplZEZ1ZWxUcmFuc0RhdGVdKTtcclxuXHJcbiAgY29uc3QgaGFzQWN0aXZlUHJvY2VzcyA9IHVzZU1lbW8oKCkgPT4gYnVzeSB8fCBpc0VkaXRpbmcsIFtidXN5LCBpc0VkaXRpbmddKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZChoYXNBY3RpdmVQcm9jZXNzKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCgpO1xyXG4gICAgfTtcclxuICB9LCBbaGFzQWN0aXZlUHJvY2Vzc10pO1xyXG5cclxuICBjb25zdCBzdGF0dXNDb2RlID0gdHlwZW9mIGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSBcIm51bWJlclwiID8gaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA6IG51bGw7XHJcbiAgY29uc3QgaXNTaGVldEFwcHJvdmVkID0gc3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfQVBQUk9WRUQ7XHJcbiAgY29uc3QgaXNTaGVldFBhaWRCeVN0YXR1cyA9IHN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX1BBSUQ7XHJcbiAgY29uc3QgaXNTaGVldFBhaWRCeVZvdWNoZXIgPSBoYXNBc3NpZ25lZFZvdWNoZXIoaGVhZGVyPy52b3VjaGVyKTtcclxuICBjb25zdCBpc1NoZWV0UGFpZCA9IGlzU2hlZXRQYWlkQnlTdGF0dXMgfHwgaXNTaGVldFBhaWRCeVZvdWNoZXI7XHJcbiAgY29uc3QgaXNNYW5hZ2luZ090aGVyVXNlciA9IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQoe1xyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICByZWNvcmRPd25lclVzZXJJZDogaGVhZGVyPy51c2VySWQsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgfSk7XHJcbiAgY29uc3QgZGV0YWlsUG9saWN5ID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBpZiAoIWhlYWRlcikge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGludGVyYWN0aW9uTW9kZTogXCJyZWFkX29ubHlcIiBhcyBjb25zdCxcclxuICAgICAgICBzaG93RmFiOiBmYWxzZSxcclxuICAgICAgICBjYW5EZWxldGVTaGVldDogZmFsc2UsXHJcbiAgICAgICAgc3RhdHVzQWN0aW9uczogW10sXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc29sdmVFeHBlbnNlU2hlZXREZXRhaWxQb2xpY3koe1xyXG4gICAgICBzdGF0dXNDb2RlLFxyXG4gICAgICBpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgICBpc1BhaWQ6IGlzU2hlZXRQYWlkLFxyXG4gICAgfSk7XHJcbiAgfSwgW2FsbG93U2VsZk1hbmFnZW1lbnQsIGhlYWRlciwgaXNNYW5hZ2luZ090aGVyVXNlciwgaXNTaGVldFBhaWQsIHN0YXR1c0NvZGVdKTtcclxuICBjb25zdCBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzID0gZGV0YWlsUG9saWN5LmludGVyYWN0aW9uTW9kZSA9PT0gXCJmdWxsX2VkaXRcIjtcclxuICBjb25zdCBjYW5DcmVhdGVFeHBlbnNlQ3VycmVudCA9IGNhblVzZUZ1bGxFZGl0RmVhdHVyZXM7XHJcbiAgY29uc3QgY2FuRWRpdEV4cGVuc2VDdXJyZW50ID0gY2FuVXNlRnVsbEVkaXRGZWF0dXJlcztcclxuICBjb25zdCBjYW5EZWxldGVFeHBlbnNlQ3VycmVudCA9IGNhblVzZUZ1bGxFZGl0RmVhdHVyZXM7XHJcbiAgY29uc3QgaXNTaGVldExvY2tlZCA9ICFjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzIHx8IGlzU2hlZXRBcHByb3ZlZCB8fCBpc1NoZWV0UGFpZDtcclxuICBjb25zdCBsaW5rZWRUaWNrZXRGaWxlSWQgPSBzYWZlVGV4dChsaW5lPy5maWxlSWQpO1xyXG4gIGNvbnN0IGhhc0xpbmtlZFRpY2tldCA9ICFpc0NyZWF0ZU1vZGUgJiYgISFsaW5rZWRUaWNrZXRGaWxlSWQ7XHJcbiAgY29uc3QgaXNMaW5lRWRpdExvY2tlZCA9IGlzU2hlZXRMb2NrZWQgfHwgaGFzTGlua2VkVGlja2V0O1xyXG4gIGNvbnN0IGlzTGluZURlbGV0ZUxvY2tlZCA9IGlzU2hlZXRMb2NrZWQ7XHJcbiAgY29uc3QgaXNMaW5lTG9ja2VkID0gaXNMaW5lRWRpdExvY2tlZDtcclxuXHJcbiAgY29uc3QgaGFuZGxlRW5hYmxlRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChpc0NyZWF0ZU1vZGUgfHwgaXNMb2FkaW5nIHx8ICFoZWFkZXIgfHwgIWxpbmUgfHwgaXNMaW5lRWRpdExvY2tlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjYW5FZGl0RXhwZW5zZUN1cnJlbnQpIHtcclxuICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XHJcbiAgICBoeWRyYXRlRHJhZnRGcm9tTGluZShsaW5lLCBoZWFkZXIpO1xyXG4gICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9FZGl0aW5nRW5hYmxlZFwiLCBcIkVkaXRpbmcgZW5hYmxlZFwiKSk7XHJcbiAgfSwgW2NhbkVkaXRFeHBlbnNlQ3VycmVudCwgaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tTGluZSwgaXNDcmVhdGVNb2RlLCBpc0xpbmVFZGl0TG9ja2VkLCBpc0xvYWRpbmcsIGxpbmUsIG9uRm9yYmlkZGVuXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNhbmNlbEVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNoZWV0SWQpfWA7XHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWlzRWRpdGluZykgcmV0dXJuO1xyXG5cclxuICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgaHlkcmF0ZURyYWZ0RnJvbUxpbmUobGluZSwgaGVhZGVyKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKSk7XHJcbiAgfSwgW2hlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUxpbmUsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nLCBsaW5lLCBzaGVldElkXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU9wZW5DcmVhdGVNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlQ3VycmVudCB8fCAhc2hlZXRJZCB8fCBpc1NoZWV0TG9ja2VkKSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXRMaW5lRGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzaGVldElkKX0mbW9kZT1jcmVhdGVgO1xyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsLCB7XHJcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxyXG4gICAgfSk7XHJcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2VDdXJyZW50LCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgaXNTaGVldExvY2tlZCwgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcclxuXHJcbiAgY29uc3QgbmF2aWdhdGVUb1NoZWV0RGV0YWlsID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChzaGVldElkKTtcclxuICAgIGlmICghc2FmZVNoZWV0SWQpIHJldHVybjtcclxuICAgIGNvbnN0IHRhcmdldFVybCA9IGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZVNoZWV0SWQpfWA7XHJcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwpO1xyXG4gIH0sIFtzaGVldElkXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoZWFkZXIsXHJcbiAgICBsaW5lLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgYnVzeSxcclxuICAgIHN0YXR1cyxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG1vZGFsRXJyb3IsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICBkcmFmdFR5cGVWYWx1ZUNvZGUsXHJcbiAgICBkcmFmdFByaWNlLFxyXG4gICAgZHJhZnRRdHksXHJcbiAgICBkcmFmdFByb2plY3RJZCxcclxuICAgIGRyYWZ0SW50ZXJuYXRpb25hbCxcclxuICAgIGlzS21UeXBlLFxyXG4gICAgaXNGdWVsUHJpY2VMb2FkaW5nLFxyXG4gICAgZnVlbFByaWNlTWVzc2FnZSxcclxuICAgIGZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yLFxyXG4gICAgaXNTaGVldFBhaWQsXHJcbiAgICBpc1NoZWV0TG9ja2VkLFxyXG4gICAgaXNMaW5lRWRpdExvY2tlZCxcclxuICAgIGlzTGluZURlbGV0ZUxvY2tlZCxcclxuICAgIGlzTGluZUxvY2tlZCxcclxuICAgIGhhc0xpbmtlZFRpY2tldCxcclxuICAgIGxpbmtlZFRpY2tldEZpbGVJZCxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2VDdXJyZW50LFxyXG4gICAgY2FuRWRpdEV4cGVuc2VDdXJyZW50LFxyXG4gICAgY2FuRGVsZXRlRXhwZW5zZUN1cnJlbnQsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBzZXREcmFmdFRyYW5zRGF0ZSxcclxuICAgIHNldERyYWZ0VHlwZVZhbHVlQ29kZSxcclxuICAgIHNldERyYWZ0UHJpY2UsXHJcbiAgICBzZXREcmFmdFF0eSxcclxuICAgIHNldERyYWZ0UHJvamVjdElkLFxyXG4gICAgc2V0RHJhZnRJbnRlcm5hdGlvbmFsLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVPcGVuQ3JlYXRlTW9kZSxcclxuICAgIG5hdmlnYXRlVG9TaGVldERldGFpbCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBtYXBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIH0gZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBoYXNFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3U291cmNlIH0gZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL2V4cGVuc2VUaWNrZXRQcmV2aWV3VXRpbHMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldyB9IGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VTaGVldExpbmVUaWNrZXRQcmV2aWV3QXJncyA9IHtcclxuICBsaW5rZWRUaWNrZXRGaWxlSWQ6IHN0cmluZztcclxuICBoYXNMaW5rZWRUaWNrZXQ6IGJvb2xlYW47XHJcbn07XHJcblxyXG4vLyBQaWNrcyB0aGUgbGlua2VkIHRpY2tldCBkZXRhaWwgaXRlbSBuZWVkZWQgdG8gcmVuZGVyIHRoZSBleGlzdGluZyBwcmV2aWV3IHNhZmVseSBmcm9tIHRoZSBsaW5lIHBhZ2UuXHJcbmNvbnN0IHJlc29sdmVMaW5rZWRUaWNrZXRQcmV2aWV3TWV0YWRhdGEgPSAoaXRlbXM6IHVua25vd25bXSwgbGlua2VkVGlja2V0RmlsZUlkOiBzdHJpbmcpID0+IHtcclxuICBjb25zdCBzYWZlTGlua2VkVGlja2V0RmlsZUlkID0gc2FmZVRleHQobGlua2VkVGlja2V0RmlsZUlkKTtcclxuICBpZiAoIXNhZmVMaW5rZWRUaWNrZXRGaWxlSWQgfHwgIUFycmF5LmlzQXJyYXkoaXRlbXMpIHx8IGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZmlsZU5hbWU6IFwiXCIsXHJcbiAgICAgIHNvdXJjZVVybDogXCJcIixcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb25zdCBzZWxlY3RlZEl0ZW0gPVxyXG4gICAgaXRlbXMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KChlbnRyeSBhcyB7IEZpbGVJZD86IHVua25vd24gfSk/LkZpbGVJZCkudG9VcHBlckNhc2UoKSA9PT0gc2FmZUxpbmtlZFRpY2tldEZpbGVJZC50b1VwcGVyQ2FzZSgpKSB8fFxyXG4gICAgaXRlbXNbMF07XHJcbiAgaWYgKCFzZWxlY3RlZEl0ZW0gfHwgdHlwZW9mIHNlbGVjdGVkSXRlbSAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZmlsZU5hbWU6IFwiXCIsXHJcbiAgICAgIHNvdXJjZVVybDogXCJcIixcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb25zdCBtYXBwZWRIZWFkZXIgPSBtYXBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyKHNlbGVjdGVkSXRlbSBhcyBQYXJhbWV0ZXJzPHR5cGVvZiBtYXBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyPlswXSk7XHJcbiAgcmV0dXJuIHtcclxuICAgIGZpbGVOYW1lOiBzYWZlVGV4dChtYXBwZWRIZWFkZXIuZmlsZU5hbWUpLFxyXG4gICAgc291cmNlVXJsOiBzYWZlVGV4dChtYXBwZWRIZWFkZXIudXJsRmlsZSksXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIExvYWRzIGxpbmtlZCB0aWNrZXQgcHJldmlldyBtZXRhZGF0YSB3aXRob3V0IGNoYW5naW5nIHRoZSBleGlzdGluZyBzaGVldC1saW5lIGRldGFpbCBjb250cmFjdC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldExpbmVUaWNrZXRQcmV2aWV3ID0gKHtcclxuICBsaW5rZWRUaWNrZXRGaWxlSWQsXHJcbiAgaGFzTGlua2VkVGlja2V0LFxyXG59OiBVc2VFeHBlbnNlU2hlZXRMaW5lVGlja2V0UHJldmlld0FyZ3MpID0+IHtcclxuICBjb25zdCBbcHJldmlld1NvdXJjZVVybCwgc2V0UHJldmlld1NvdXJjZVVybF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbcHJldmlld0ZpbGVOYW1lLCBzZXRQcmV2aWV3RmlsZU5hbWVdID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWhhc0xpbmtlZFRpY2tldCB8fCAhc2FmZVRleHQobGlua2VkVGlja2V0RmlsZUlkKSkge1xyXG4gICAgICBzZXRQcmV2aWV3U291cmNlVXJsKFwiXCIpO1xyXG4gICAgICBzZXRQcmV2aWV3RmlsZU5hbWUoXCJcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG5cclxuICAgIGNvbnN0IGxvYWRUaWNrZXRQcmV2aWV3TWV0YWRhdGEgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNldFByZXZpZXdTb3VyY2VVcmwoXCJcIik7XHJcbiAgICAgIHNldFByZXZpZXdGaWxlTmFtZShcIlwiKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldChsaW5rZWRUaWNrZXRGaWxlSWQsIHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNhbmNlbGxlZCkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWV0YWRhdGEgPSByZXNvbHZlTGlua2VkVGlja2V0UHJldmlld01ldGFkYXRhKHJlc3BvbnNlPy5JdGVtcyB8fCBbXSwgbGlua2VkVGlja2V0RmlsZUlkKTtcclxuICAgICAgICBzZXRQcmV2aWV3U291cmNlVXJsKG1ldGFkYXRhLnNvdXJjZVVybCk7XHJcbiAgICAgICAgc2V0UHJldmlld0ZpbGVOYW1lKG1ldGFkYXRhLmZpbGVOYW1lKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAoY2FuY2VsbGVkIHx8IChlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdm9pZCBsb2FkVGlja2V0UHJldmlld01ldGFkYXRhKCk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcclxuICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xyXG4gICAgfTtcclxuICB9LCBbaGFzTGlua2VkVGlja2V0LCBsaW5rZWRUaWNrZXRGaWxlSWRdKTtcclxuXHJcbiAgY29uc3Qgc2hvd1N0aWNreVByZXZpZXcgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gaGFzTGlua2VkVGlja2V0ICYmIGhhc0V4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdTb3VyY2UocHJldmlld1NvdXJjZVVybCksXHJcbiAgICBbaGFzTGlua2VkVGlja2V0LCBwcmV2aWV3U291cmNlVXJsXVxyXG4gICk7XHJcbiAgY29uc3QgcHJldmlld0FsdFRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gc2FmZVRleHQocHJldmlld0ZpbGVOYW1lKSB8fCBpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIiksXHJcbiAgICBbcHJldmlld0ZpbGVOYW1lXVxyXG4gICk7XHJcbiAgY29uc3QgcHJldmlldyA9IHVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcoe1xyXG4gICAgZmlsZUlkOiBsaW5rZWRUaWNrZXRGaWxlSWQsXHJcbiAgICBzb3VyY2VVcmw6IHByZXZpZXdTb3VyY2VVcmwsXHJcbiAgICBlbmFibGVkOiBzaG93U3RpY2t5UHJldmlldyxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gICAgcHJldmlld0ZpbGVOYW1lLFxyXG4gICAgcHJldmlld0FsdFRleHQsXHJcbiAgICAuLi5wcmV2aWV3LFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgUmVmT2JqZWN0LCBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0UHJldmlld01vZGFsIGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0UHJldmlld01vZGFsLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXcgZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL0V4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3LnRzeFwiO1xyXG5pbXBvcnQgdHlwZSB7IFRpY2tldFByZXZpZXdQb2ludCB9IGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VTaGVldExpbmVEZXRhaWxWaWV3UHJvcHMgPSB7XHJcbiAgbW9kYWw6IHtcclxuICAgIG9wZW46IGJvb2xlYW47XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ6IHN0cmluZztcclxuICAgIGNhbmNlbFRleHQ6IHN0cmluZztcclxuICAgIGxvYWRpbmdUZXh0OiBzdHJpbmc7XHJcbiAgICBzaG93Q2FuY2VsOiBib29sZWFuO1xyXG4gICAgc2hvd0NvbmZpcm06IGJvb2xlYW47XHJcbiAgICBidXN5OiBib29sZWFuO1xyXG4gICAgZXJyb3I6IHN0cmluZztcclxuICAgIHN0YXR1czogc3RyaW5nO1xyXG4gICAgb25Db25maXJtOiAoKSA9PiB2b2lkO1xyXG4gICAgb25DYW5jZWw6ICgpID0+IHZvaWQ7XHJcbiAgfTtcclxuICBwcmV2aWV3OiB7XHJcbiAgICBvcGVuOiBib29sZWFuO1xyXG4gICAgYnVzeTogYm9vbGVhbjtcclxuICAgIGVycm9yOiBzdHJpbmc7XHJcbiAgICBpbWFnZVVybDogc3RyaW5nO1xyXG4gICAgaW1hZ2VBbHQ6IHN0cmluZztcclxuICAgIGZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgICBzY2FsZTogbnVtYmVyO1xyXG4gICAgdHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQ7XHJcbiAgICBzdXJmYWNlUmVmOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICAgIHNob3dTdGlja3lQcmV2aWV3OiBib29sZWFuO1xyXG4gICAgb25PcGVuOiAoKSA9PiB2b2lkO1xyXG4gICAgb25DbG9zZTogKCkgPT4gdm9pZDtcclxuICAgIG9uUG9pbnRlckRvd246IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICAgIG9uUG9pbnRlck1vdmU6IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICAgIG9uUG9pbnRlckVuZDogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gICAgb25XaGVlbDogKGV2ZW50OiBSZWFjdC5XaGVlbEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICB9O1xyXG4gIGNvbnRlbnQ6IHtcclxuICAgIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICAgIGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZTogYm9vbGVhbjtcclxuICAgIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgZGV0YWlsQm9keTogUmVhY3ROb2RlO1xyXG4gIH07XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIHRoZSBsaW5lIGRldGFpbCBzaGVsbCB3aGlsZSB0aGUgcGFnZSBjb250YWluZXIga2VlcHMgb3duZXJzaGlwIG9mIG9yY2hlc3RyYXRpb24gYW5kIG11dGF0aW9ucy5cclxuY29uc3QgRXhwZW5zZVNoZWV0TGluZURldGFpbFZpZXcgPSAoeyBtb2RhbCwgcHJldmlldywgY29udGVudCB9OiBFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVmlld1Byb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbC5jb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbC5jYW5jZWxUZXh0fVxyXG4gICAgICAgIGxvYWRpbmdUZXh0PXttb2RhbC5sb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXttb2RhbC5idXN5fVxyXG4gICAgICAgIGVycm9yPXttb2RhbC5lcnJvcn1cclxuICAgICAgICBzdGF0dXM9e21vZGFsLnN0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e21vZGFsLm9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17bW9kYWwub25DYW5jZWx9XHJcbiAgICAgIC8+XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0UHJldmlld01vZGFsXHJcbiAgICAgICAgb3Blbj17cHJldmlldy5vcGVufVxyXG4gICAgICAgIGJ1c3k9e3ByZXZpZXcuYnVzeX1cclxuICAgICAgICBlcnJvcj17cHJldmlldy5lcnJvcn1cclxuICAgICAgICBpbWFnZVVybD17cHJldmlldy5pbWFnZVVybH1cclxuICAgICAgICBpbWFnZUFsdD17cHJldmlldy5pbWFnZUFsdH1cclxuICAgICAgICBzY2FsZT17cHJldmlldy5zY2FsZX1cclxuICAgICAgICB0cmFuc2xhdGU9e3ByZXZpZXcudHJhbnNsYXRlfVxyXG4gICAgICAgIHN1cmZhY2VSZWY9e3ByZXZpZXcuc3VyZmFjZVJlZn1cclxuICAgICAgICBvbkNsb3NlPXtwcmV2aWV3Lm9uQ2xvc2V9XHJcbiAgICAgICAgb25Qb2ludGVyRG93bj17cHJldmlldy5vblBvaW50ZXJEb3dufVxyXG4gICAgICAgIG9uUG9pbnRlck1vdmU9e3ByZXZpZXcub25Qb2ludGVyTW92ZX1cclxuICAgICAgICBvblBvaW50ZXJFbmQ9e3ByZXZpZXcub25Qb2ludGVyRW5kfVxyXG4gICAgICAgIG9uV2hlZWw9e3ByZXZpZXcub25XaGVlbH1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxyXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGNvbnRlbnQuaXNMb2FkaW5nIHx8IGNvbnRlbnQuaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cclxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtjb250ZW50LmVycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57Y29udGVudC5lcnJvck1lc3NhZ2V9PC9kaXY+IDogbnVsbH1cclxuXHJcbiAgICAgIHtjb250ZW50LmRldGFpbEJvZHkgPyAoXHJcbiAgICAgICAgcHJldmlldy5zaG93U3RpY2t5UHJldmlldyA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIGxnOmdyaWQgbGc6Z3JpZC1jb2xzLVttaW5tYXgoMCwxZnIpXzMyMHB4XSBsZzpnYXAtNCBsZzpzcGFjZS15LTBcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3RhcnQtMlwiPlxyXG4gICAgICAgICAgICAgIDxFeHBlbnNlVGlja2V0U3RpY2t5UHJldmlld1xyXG4gICAgICAgICAgICAgICAgYnVzeT17cHJldmlldy5idXN5fVxyXG4gICAgICAgICAgICAgICAgZXJyb3I9e3ByZXZpZXcuZXJyb3J9XHJcbiAgICAgICAgICAgICAgICBpbWFnZVVybD17cHJldmlldy5pbWFnZVVybH1cclxuICAgICAgICAgICAgICAgIGltYWdlQWx0PXtwcmV2aWV3LmltYWdlQWx0fVxyXG4gICAgICAgICAgICAgICAgZmlsZU5hbWU9e3ByZXZpZXcuZmlsZU5hbWV9XHJcbiAgICAgICAgICAgICAgICBvbk9wZW49e3ByZXZpZXcub25PcGVufVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBsZzpjb2wtc3RhcnQtMSBsZzpyb3ctc3RhcnQtMVwiPntjb250ZW50LmRldGFpbEJvZHl9PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgY29udGVudC5kZXRhaWxCb2R5XHJcbiAgICAgICAgKVxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVmlldztcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHBhcnNlRGVjaW1hbElucHV0IH0gZnJvbSBcIi4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VTaGVldExpbmVUeXBlVmFsaWRhdGlvbkFyZ3MgPSB7XHJcbiAgZHJhZnRUeXBlVmFsdWVDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRQcmljZTogc3RyaW5nO1xyXG4gIGRyYWZ0UXR5OiBzdHJpbmc7XHJcbiAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXREcmFmdFByaWNlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXREcmFmdFF0eTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbn07XHJcblxyXG4vLyBLZWVwcyBsaW5lIHNhdmUgdmFsaWRhdGlvbiBsb2NhbCBzbyBzYXZlIGZsb3cgY2FuIGJsb2NrIGJlZm9yZSBvcGVuaW5nIHRoZSBtb2RhbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldExpbmVUeXBlVmFsaWRhdGlvbiA9ICh7XHJcbiAgZHJhZnRUeXBlVmFsdWVDb2RlLFxyXG4gIGRyYWZ0UHJpY2UsXHJcbiAgZHJhZnRRdHksXHJcbiAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlLFxyXG4gIHNldERyYWZ0UHJpY2UsXHJcbiAgc2V0RHJhZnRRdHksXHJcbn06IFVzZUV4cGVuc2VTaGVldExpbmVUeXBlVmFsaWRhdGlvbkFyZ3MpID0+IHtcclxuICBjb25zdCBbdHlwZUludmFsaWQsIHNldFR5cGVJbnZhbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbcHJpY2VJbnZhbGlkLCBzZXRQcmljZUludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtxdHlJbnZhbGlkLCBzZXRRdHlJbnZhbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCB0eXBlSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHByaWNlSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHF0eUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuXHJcbiAgY29uc3QgZm9jdXNUeXBlRmllbGQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRUeXBlSW52YWxpZCh0cnVlKTtcclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICB0eXBlSW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcclxuICAgIH0pO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgZm9jdXNBbW91bnRGaWVsZHMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBwYXJzZWRRdHkgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFF0eSk7XHJcbiAgICBjb25zdCBwYXJzZWRQcmljZSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0UHJpY2UpO1xyXG4gICAgY29uc3QgcXR5SXNWYWxpZCA9IHBhcnNlZFF0eSAhPSBudWxsICYmIHBhcnNlZFF0eSA+IDA7XHJcbiAgICBjb25zdCBwcmljZUlzVmFsaWQgPSBwYXJzZWRQcmljZSAhPSBudWxsICYmIHBhcnNlZFByaWNlID4gMDtcclxuXHJcbiAgICBzZXRRdHlJbnZhbGlkKCFxdHlJc1ZhbGlkKTtcclxuICAgIHNldFByaWNlSW52YWxpZCghcHJpY2VJc1ZhbGlkKTtcclxuXHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgaWYgKCFxdHlJc1ZhbGlkKSB7XHJcbiAgICAgICAgcXR5SW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghcHJpY2VJc1ZhbGlkKSB7XHJcbiAgICAgICAgcHJpY2VJbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LCBbZHJhZnRQcmljZSwgZHJhZnRRdHldKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICBzZXRUeXBlSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIHNldERyYWZ0VHlwZVZhbHVlQ29kZSh2YWx1ZSk7XHJcbiAgICB9LFxyXG4gICAgW3NldERyYWZ0VHlwZVZhbHVlQ29kZV1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVEcmFmdFByaWNlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICBzZXRQcmljZUludmFsaWQoZmFsc2UpO1xyXG4gICAgICBzZXREcmFmdFByaWNlKHZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBbc2V0RHJhZnRQcmljZV1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVEcmFmdFF0eUNoYW5nZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgICAgc2V0UXR5SW52YWxpZChmYWxzZSk7XHJcbiAgICAgIHNldERyYWZ0UXR5KHZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBbc2V0RHJhZnRRdHldXHJcbiAgKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHBhcnNlZFByaWNlID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRQcmljZSk7XHJcbiAgICBpZiAocGFyc2VkUHJpY2UgIT0gbnVsbCAmJiBwYXJzZWRQcmljZSA+IDApIHtcclxuICAgICAgc2V0UHJpY2VJbnZhbGlkKGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbZHJhZnRQcmljZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgcGFyc2VkUXR5ID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRRdHkpO1xyXG4gICAgaWYgKHBhcnNlZFF0eSAhPSBudWxsICYmIHBhcnNlZFF0eSA+IDApIHtcclxuICAgICAgc2V0UXR5SW52YWxpZChmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW2RyYWZ0UXR5XSk7XHJcblxyXG4gIGNvbnN0IGNhbk9wZW5TYXZlQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHBhcnNlZFR5cGVWYWx1ZSA9IE51bWJlci5wYXJzZUludChTdHJpbmcoZHJhZnRUeXBlVmFsdWVDb2RlIHx8IFwiXCIpLnRyaW0oKSwgMTApO1xyXG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUocGFyc2VkVHlwZVZhbHVlKSB8fCBwYXJzZWRUeXBlVmFsdWUgPD0gMCkge1xyXG4gICAgICBmb2N1c1R5cGVGaWVsZCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFyc2VkUHJpY2UgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFByaWNlKTtcclxuICAgIGNvbnN0IHBhcnNlZFF0eSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0UXR5KTtcclxuICAgIGNvbnN0IGhhc1ZhbGlkUXR5UHJpY2UgPSBwYXJzZWRRdHkgIT0gbnVsbCAmJiBwYXJzZWRRdHkgPiAwICYmIHBhcnNlZFByaWNlICE9IG51bGwgJiYgcGFyc2VkUHJpY2UgPiAwO1xyXG4gICAgaWYgKGhhc1ZhbGlkUXR5UHJpY2UpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZm9jdXNBbW91bnRGaWVsZHMoKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LCBbZHJhZnRQcmljZSwgZHJhZnRRdHksIGRyYWZ0VHlwZVZhbHVlQ29kZSwgZm9jdXNBbW91bnRGaWVsZHMsIGZvY3VzVHlwZUZpZWxkXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlSW52YWxpZCxcclxuICAgIHByaWNlSW52YWxpZCxcclxuICAgIHF0eUludmFsaWQsXHJcbiAgICB0eXBlSW5wdXRSZWYsXHJcbiAgICBwcmljZUlucHV0UmVmLFxyXG4gICAgcXR5SW5wdXRSZWYsXHJcbiAgICBmb2N1c1R5cGVGaWVsZCxcclxuICAgIGZvY3VzQW1vdW50RmllbGRzLFxyXG4gICAgaGFuZGxlRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlLFxyXG4gICAgaGFuZGxlRHJhZnRQcmljZUNoYW5nZSxcclxuICAgIGhhbmRsZURyYWZ0UXR5Q2hhbmdlLFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gIH07XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBaUU7OztBQ3lHM0Q7QUFwRE4sSUFBTSxpQkFBaUIsQ0FBQyxVQUE2QztBQUNuRSxTQUFPLG9CQUFvQixPQUFPO0FBQUEsSUFDaEMsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsSUFDdkIsYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLEVBQ1osQ0FBQztBQUNIO0FBR0EsSUFBTSx1QkFBdUIsQ0FBQztBQUFBLEVBQzVCO0FBQUEsRUFDQTtBQUFBLEVBQ0Esa0JBQWtCO0FBQUEsRUFDbEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsY0FBYztBQUFBLEVBQ2QsZUFBZTtBQUFBLEVBQ2YsYUFBYTtBQUFBLEVBQ2I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBaUM7QUFDL0IsU0FDRSw2Q0FBQyxhQUFRLFdBQVUsYUFDakI7QUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTyxLQUFLLHNCQUFzQixNQUFNO0FBQUEs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TztBQUFBLFFBQ1AsV0FBVztBQUFBLFFBQ1gsWUFBWTtBQUFBLFFBQ1o7QUFBQSxRQUNBLFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxRQUNULGVBQWU7QUFBQSxRQUNmLGVBQWU7QUFBQSxRQUNmLGNBQWM7QUFBQSxRQUNkLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQTtBQUFBLEVBQ0Y7QUFFSjtBQUdBLElBQU0sNkJBQTZCLE1BQU07QUFDdkMsU0FDRSw2Q0FBQyxnQ0FBcUIseUJBQXVCLE1BQzNDLHVEQUFDLGlDQUE4QixHQUNqQztBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsMEJBQXdCO0FBQ3hCLFFBQU0sU0FBUyxTQUFTLGVBQWUsMEJBQTBCO0FBQ2pFLE1BQUksQ0FBQyxPQUFRO0FBQ2IsbUJBQWlCLFFBQVEsNkNBQUMsOEJBQTJCLENBQUU7QUFDekQ7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLHFDQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJyZXNwb25zZSIsICJzaGVldHMiLCAic2VsZWN0ZWRTaGVldCIsICJsb2FkZWRTdGF0dXNDb2RlIiwgImlzTWFuYWdpbmdPdGhlclVzZXIiLCAibG9hZGVkUG9saWN5IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
