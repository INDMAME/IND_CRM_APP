import {
  ExpenseTicketPreviewModal_default,
  ExpenseTicketStickyPreview_default,
  hasExpenseTicketImagePreviewSource,
  useExpenseTicketImagePreview
} from "./chunks/chunk-NJTJMEK7.js";
import {
  SingleDatePicker
} from "./chunks/chunk-TQTUWJA7.js";
import {
  mapBooleanEnumOptions,
  mapWindowEnumOptions
} from "./chunks/chunk-YM2TI2W6.js";
import {
  mapExpenseTicketDetailHeader
} from "./chunks/chunk-L2QBQ4WC.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-OF6ODLTW.js";
import "./chunks/chunk-6JJRBKFS.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-QKSAMRAN.js";
import "./chunks/chunk-OSBLOXTE.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-54VKJ5RM.js";
import "./chunks/chunk-4BE3ZFCK.js";
import {
  isManagingOtherExpenseRecord,
  resolveExpenseSheetDetailPolicy,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-EA3W6EVI.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-PDB5ASGP.js";
import "./chunks/chunk-CBDB7NMA.js";
import {
  clearExpenseNavigationGuard,
  formatAmountWithCurrency,
  formatExpenseInputNumber,
  formatExpenseNumber,
  navigateToExpenseUrl,
  reloadExpensePage,
  setExpenseNavigationGuard
} from "./chunks/chunk-FFNIMRB6.js";
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
} from "./chunks/chunk-TC2T4EQZ.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-YWX6VBOY.js";
import {
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  toExpenseApiDdMmYyyy
} from "./chunks/chunk-KUDPX4K4.js";
import "./chunks/chunk-ZBKHPZJX.js";
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
  indT
} from "./chunks/chunk-PNIKV5DC.js";
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
    setDraftDescription(safeText(nextLine?.description));
    setDraftTransDate(toInputDate(nextLine?.transDate || nextHeader?.createdDate));
    setDraftTypeValueCode(safeText(nextLine?.typeValueCode));
    setDraftPrice(formatEditableNumber(nextLine?.price));
    setDraftQty(formatEditableQuantity(nextLine?.qty));
    setDraftProjectId(safeText(nextLine?.projId || nextHeader?.projId));
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL0V4cGVuc2VTaGVldExpbmVEZXRhaWxQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0TGluZUZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2ludGVybmF0aW9uYWxPcHRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGluZS91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGluZS91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpbmUvdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbENvbmZpcm1EaWFsb2cudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpbmUvdXNlRXhwZW5zZVNoZWV0TGluZVRpY2tldFByZXZpZXcudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL0V4cGVuc2VTaGVldExpbmVEZXRhaWxWaWV3LnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpbmUvdXNlRXhwZW5zZVNoZWV0TGluZVR5cGVWYWxpZGF0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IHsgdXNlQXV0aENvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IEV4cGVuc2VTaGVldExpbmVGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VTaGVldExpbmVGb3JtLnRzeFwiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZUludGVybmF0aW9uYWxMYWJlbCwgZ2V0RXhwZW5zZUludGVybmF0aW9uYWxPcHRpb25zIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9pbnRlcm5hdGlvbmFsT3B0aW9ucy50c1wiO1xuaW1wb3J0IHsgcGFyc2VEZWNpbWFsSW5wdXQgfSBmcm9tIFwiLi4vaG9va3MvZXhwZW5zZU11dGF0aW9uVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCwgcmVsb2FkRXhwZW5zZVBhZ2UgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHsgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XG5pbXBvcnQge1xuICBtYXBCb29sZWFuRW51bU9wdGlvbnMsXG4gIG1hcFdpbmRvd0VudW1PcHRpb25zLFxuICB0eXBlIEV4cGVuc2VTZWxlY3RPcHRpb24sXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxNdXRhdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbENvbmZpcm1EaWFsb2cudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0TGluZVRpY2tldFByZXZpZXcgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRMaW5lVGlja2V0UHJldmlldy50c1wiO1xuaW1wb3J0IEV4cGVuc2VTaGVldExpbmVEZXRhaWxWaWV3IGZyb20gXCIuL0V4cGVuc2VTaGVldExpbmVEZXRhaWxWaWV3LnRzeFwiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0TGluZVR5cGVWYWxpZGF0aW9uIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0TGluZVR5cGVWYWxpZGF0aW9uLnRzXCI7XG5cclxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxyXG5jb25zdCBib290c3RyYXBFeHBlbnNlQXBpQXV0aCA9ICgpID0+IHtcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgoe1xuICAgIHRva2VuOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxuICAgIGVudHJhT2lkOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcbiAgfSk7XG59O1xuXG4vLyBDb25zdW1lcyB0aGUgb25lLXRpbWUgZWRpdCBoYW5kb2ZmIGZyb20gc2hlZXQgZGV0YWlsIHNvIGxhdGVyIHJlbG9hZHMgcmV0dXJuIHRvIG5vcm1hbCB2aWV3IG1vZGUuXG5jb25zdCBjb25zdW1lTGluZUVkaXRNb2RlUXVlcnkgPSAoKSA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgY3VycmVudFVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICBpZiAoc2FmZVRleHQoY3VycmVudFVybC5zZWFyY2hQYXJhbXMuZ2V0KFwibW9kZVwiKSkudG9Mb3dlckNhc2UoKSAhPT0gXCJlZGl0XCIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjdXJyZW50VXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoXCJtb2RlXCIpO1xuICBjb25zdCBuZXh0VXJsID0gYCR7Y3VycmVudFVybC5wYXRobmFtZX0ke2N1cnJlbnRVcmwuc2VhcmNofSR7Y3VycmVudFVybC5oYXNofWA7XG4gIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh3aW5kb3cuaGlzdG9yeS5zdGF0ZSwgXCJcIiwgbmV4dFVybCk7XG59O1xuXG5jb25zdCBFeHBlbnNlU2hlZXRMaW5lRGV0YWlsQ29udGVudCA9ICgpID0+IHtcbiAgY29uc3Qge1xyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gIH0gPSB1c2VBdXRoQ29udGV4dCgpO1xyXG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiVmlld1wiKTtcclxuICBjb25zdCBzaGVldElkID0gc2FmZVRleHQod2luZG93Ll9fRVhQRU5TRV9TSEVFVF9JRF9fKTtcclxuICBjb25zdCBsaW5lSWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX0xJTkVfSURfXyk7XHJcbiAgY29uc3QgbGluZU1vZGUgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX0xJTkVfTU9ERV9fKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBpc0NyZWF0ZU1vZGUgPSBsaW5lTW9kZSA9PT0gXCJjcmVhdGVcIjtcbiAgY29uc3Qgc3RhcnRJbkVkaXRNb2RlID0gbGluZU1vZGUgPT09IFwiZWRpdFwiO1xuICBjb25zdCBbaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLCBzZXRJc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFzdGFydEluRWRpdE1vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdW1lTGluZUVkaXRNb2RlUXVlcnkoKTtcbiAgfSwgW3N0YXJ0SW5FZGl0TW9kZV0pO1xuXG4gIGNvbnN0IHtcbiAgICBoZWFkZXIsXHJcbiAgICBsaW5lLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgYnVzeSxcclxuICAgIHN0YXR1cyxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG1vZGFsRXJyb3IsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICBkcmFmdFR5cGVWYWx1ZUNvZGUsXHJcbiAgICBkcmFmdFByaWNlLFxyXG4gICAgZHJhZnRRdHksXHJcbiAgICBkcmFmdFByb2plY3RJZCxcclxuICAgIGRyYWZ0SW50ZXJuYXRpb25hbCxcclxuICAgIGlzS21UeXBlLFxyXG4gICAgaXNGdWVsUHJpY2VMb2FkaW5nLFxyXG4gICAgZnVlbFByaWNlTWVzc2FnZSxcclxuICAgIGZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yLFxyXG4gICAgaXNTaGVldExvY2tlZCxcclxuICAgIGlzTGluZUVkaXRMb2NrZWQsXHJcbiAgICBpc0xpbmVEZWxldGVMb2NrZWQsXHJcbiAgICBoYXNMaW5rZWRUaWNrZXQsXHJcbiAgICBsaW5rZWRUaWNrZXRGaWxlSWQsXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlQ3VycmVudCxcclxuICAgIGNhbkVkaXRFeHBlbnNlQ3VycmVudCxcclxuICAgIGNhbkRlbGV0ZUV4cGVuc2VDdXJyZW50LFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRUcmFuc0RhdGUsXHJcbiAgICBzZXREcmFmdFR5cGVWYWx1ZUNvZGUsXHJcbiAgICBzZXREcmFmdFByaWNlLFxyXG4gICAgc2V0RHJhZnRRdHksXHJcbiAgICBzZXREcmFmdFByb2plY3RJZCxcclxuICAgIHNldERyYWZ0SW50ZXJuYXRpb25hbCxcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgbmF2aWdhdGVUb1NoZWV0RGV0YWlsLFxyXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGUoe1xyXG4gICAgaGFzQWNjZXNzLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgc2hlZXRJZCxcclxuICAgIGxpbmVJZCxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIHN0YXJ0SW5FZGl0TW9kZSxcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB7XHJcbiAgICB0eXBlSW52YWxpZCxcclxuICAgIHByaWNlSW52YWxpZCxcclxuICAgIHF0eUludmFsaWQsXHJcbiAgICB0eXBlSW5wdXRSZWYsXHJcbiAgICBwcmljZUlucHV0UmVmLFxyXG4gICAgcXR5SW5wdXRSZWYsXHJcbiAgICBmb2N1c1R5cGVGaWVsZCxcclxuICAgIGZvY3VzQW1vdW50RmllbGRzLFxyXG4gICAgaGFuZGxlRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlLFxyXG4gICAgaGFuZGxlRHJhZnRQcmljZUNoYW5nZSxcclxuICAgIGhhbmRsZURyYWZ0UXR5Q2hhbmdlLFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXRMaW5lVHlwZVZhbGlkYXRpb24oe1xyXG4gICAgZHJhZnRUeXBlVmFsdWVDb2RlLFxyXG4gICAgZHJhZnRQcmljZSxcclxuICAgIGRyYWZ0UXR5LFxyXG4gICAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlLFxyXG4gICAgc2V0RHJhZnRQcmljZSxcclxuICAgIHNldERyYWZ0UXR5LFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBkcmFmdFByaWNlVmFsdWUgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFByaWNlKTtcclxuICBjb25zdCBkcmFmdFF0eVZhbHVlID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRRdHkpO1xyXG4gIGNvbnN0IGNhbGN1bGF0ZWRBbW91bnRQcmV2aWV3ID1cclxuICAgIGlzRWRpdGluZyAmJiBkcmFmdFByaWNlVmFsdWUgIT0gbnVsbCAmJiBkcmFmdFByaWNlVmFsdWUgPiAwICYmIGRyYWZ0UXR5VmFsdWUgIT0gbnVsbCAmJiBkcmFmdFF0eVZhbHVlID4gMFxyXG4gICAgICA/IGRyYWZ0UHJpY2VWYWx1ZSAqIGRyYWZ0UXR5VmFsdWVcclxuICAgICAgOiBsaW5lPy5hbW91bnQgPz8gbnVsbDtcclxuICBjb25zdCBwcmljZVRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGxpbmU/LnByaWNlID8/IG51bGwsIHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSksXHJcbiAgICBbaGVhZGVyPy5jdXJyZW5jeUNvZGUsIGxpbmU/LnByaWNlXVxyXG4gICk7XHJcbiAgY29uc3QgYW1vdW50VGV4dCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koY2FsY3VsYXRlZEFtb3VudFByZXZpZXcsIHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSksXHJcbiAgICBbY2FsY3VsYXRlZEFtb3VudFByZXZpZXcsIGhlYWRlcj8uY3VycmVuY3lDb2RlXVxyXG4gICk7XHJcbiAgY29uc3QgcHJvamVjdFZhbHVlID0gc2FmZVRleHQobGluZT8ucHJvaklkIHx8IGhlYWRlcj8ucHJvaklkKTtcbiAgY29uc3Qgc2hlZXREZXNjcmlwdGlvbiA9IHNhZmVUZXh0KGhlYWRlcj8uZGVzY3JpcHRpb24pIHx8IFwiLVwiO1xuICBjb25zdCBpbnRlcm5hY2lvbmFsTGFiZWwgPSBnZXRFeHBlbnNlSW50ZXJuYXRpb25hbExhYmVsKGxpbmU/LmludGVybmFjaW9uYWwpO1xuICBjb25zdCB7XG4gICAgc2hvd1N0aWNreVByZXZpZXcsXG4gICAgcHJldmlld09wZW4sXG4gICAgcHJldmlld0J1c3ksXG4gICAgcHJldmlld0Vycm9yLFxuICAgIHByZXZpZXdJbWFnZVVybCxcbiAgICBwcmV2aWV3U2NhbGUsXG4gICAgcHJldmlld1RyYW5zbGF0ZSxcbiAgICBwcmV2aWV3U3VyZmFjZVJlZixcbiAgICBwcmV2aWV3RmlsZU5hbWUsXG4gICAgcHJldmlld0FsdFRleHQsXG4gICAgb3BlblByZXZpZXcsXG4gICAgY2xvc2VQcmV2aWV3LFxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXG4gICAgaGFuZGxlUHJldmlld1doZWVsLFxuICB9ID0gdXNlRXhwZW5zZVNoZWV0TGluZVRpY2tldFByZXZpZXcoe1xuICAgIGxpbmtlZFRpY2tldEZpbGVJZCxcbiAgICBoYXNMaW5rZWRUaWNrZXQsXG4gIH0pO1xuXHJcbiAgY29uc3QgZ2FzdG9UeXBlT3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiB7XHJcbiAgICBjb25zdCBzb3VyY2UgPSBBcnJheS5pc0FycmF5KHdpbmRvdy5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXykgPyB3aW5kb3cuX19FWFBFTlNFX0dBU1RPX1RZUEVTX18gOiBbXTtcclxuICAgIGNvbnN0IG1hcHBlZCA9IG1hcFdpbmRvd0VudW1PcHRpb25zKHNvdXJjZSk7XHJcblxyXG4gICAgY29uc3QgY3VycmVudFR5cGVDb2RlID0gc2FmZVRleHQobGluZT8udHlwZVZhbHVlQ29kZSk7XHJcbiAgICBjb25zdCBjdXJyZW50VHlwZUxhYmVsID0gc2FmZVRleHQobGluZT8udHlwZVZhbHVlKTtcclxuICAgIGlmIChjdXJyZW50VHlwZUNvZGUgJiYgIW1hcHBlZC5zb21lKChpdGVtKSA9PiBpdGVtLnZhbHVlID09PSBjdXJyZW50VHlwZUNvZGUpKSB7XHJcbiAgICAgIG1hcHBlZC5wdXNoKHtcclxuICAgICAgICB2YWx1ZTogY3VycmVudFR5cGVDb2RlLFxyXG4gICAgICAgIHRleHQ6IGN1cnJlbnRUeXBlTGFiZWwgfHwgY3VycmVudFR5cGVDb2RlLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWFwcGVkO1xyXG4gIH0sIFtsaW5lPy50eXBlVmFsdWUsIGxpbmU/LnR5cGVWYWx1ZUNvZGVdKTtcclxuXHJcbiAgY29uc3QgaW50ZXJuYXRpb25hbE9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXHJcbiAgICAoKSA9PiBtYXBCb29sZWFuRW51bU9wdGlvbnMoZ2V0RXhwZW5zZUludGVybmF0aW9uYWxPcHRpb25zKCkpLFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICBjb25zdCB7XHJcbiAgICBtb2RhbCxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gICAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICAgIG1vZGFsQ2FuY2VsVGV4dCxcclxuICAgIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgfSA9IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxDb25maXJtRGlhbG9nKHtcclxuICAgIGJ1c3ksXHJcbiAgICBtb2RhbEVycm9yLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFN0YXR1cyxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBoYW5kbGVVcGRhdGUsIGhhbmRsZURlbGV0ZSB9ID0gdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9ucyh7XHJcbiAgICBidXN5LFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNFZGl0TG9ja2VkOiBpc0xpbmVFZGl0TG9ja2VkLFxyXG4gICAgaXNEZWxldGVMb2NrZWQ6IGlzTGluZURlbGV0ZUxvY2tlZCxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6IGNhbkNyZWF0ZUV4cGVuc2VDdXJyZW50LFxyXG4gICAgY2FuRWRpdEV4cGVuc2U6IGNhbkVkaXRFeHBlbnNlQ3VycmVudCxcclxuICAgIGNhbkRlbGV0ZUV4cGVuc2U6IGNhbkRlbGV0ZUV4cGVuc2VDdXJyZW50LFxyXG4gICAgc2hlZXRJZCxcclxuICAgIGxpbmVJZCxcclxuICAgIGxpbmUsXHJcbiAgICBsaW5rZWRUaWNrZXRGaWxlSWQsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICBkcmFmdFR5cGVWYWx1ZUNvZGUsXHJcbiAgICBkcmFmdFByaWNlLFxyXG4gICAgZHJhZnRRdHksXHJcbiAgICBkcmFmdFByb2plY3RJZCxcclxuICAgIGRyYWZ0SW50ZXJuYXRpb25hbCxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgb25JbnZhbGlkVHlwZTogZm9jdXNUeXBlRmllbGQsXHJcbiAgICBvbkludmFsaWRBbW91bnRRdHk6IGZvY3VzQW1vdW50RmllbGRzLFxyXG4gICAgb25DcmVhdGVTdWNjZXNzOiAoKSA9PiB7fSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgbGluZVRvcGJhckFjdGlvbk1vZGUgPVxuICAgICFjYW5FZGl0RXhwZW5zZUN1cnJlbnQgJiYgIWNhbkRlbGV0ZUV4cGVuc2VDdXJyZW50XG4gICAgICA/IFwidmlld19vbmx5XCJcbiAgICAgIDogXCJkZWZhdWx0XCI7XG5cbiAgY29uc3QgaGFuZGxlRWRpdExpbmtlZFRpY2tldCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBzYWZlRmlsZUlkID0gc2FmZVRleHQobGlua2VkVGlja2V0RmlsZUlkKTtcbiAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHNoZWV0SWQpO1xuICAgIGNvbnN0IHNhZmVMaW5lSWQgPSBzYWZlVGV4dChsaW5lSWQgfHwgbGluZT8ubGluZVJlY0lkKTtcbiAgICBpZiAoIXNhZmVGaWxlSWQgfHwgIXNhZmVTaGVldElkIHx8ICFzYWZlTGluZUlkKSByZXR1cm47XG5cbiAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgICAgZmlsZUlkOiBzYWZlRmlsZUlkLFxuICAgICAgb3JpZ2luOiBcImV4cGVuc2UtbGluZVwiLFxuICAgICAgc2hlZXRJZDogc2FmZVNoZWV0SWQsXG4gICAgICBzaGVldExpbmVSZWNJZDogc2FmZUxpbmVJZCxcbiAgICAgIG1vZGU6IFwiZWRpdFwiLFxuICAgIH0pO1xuICAgIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCh7XG4gICAgICBmaWxlSWQ6IHNhZmVGaWxlSWQsXG4gICAgICBvcmlnaW46IFwiZXhwZW5zZS1saW5lXCIsXG4gICAgICBzaGVldElkOiBzYWZlU2hlZXRJZCxcbiAgICAgIHNoZWV0TGluZVJlY0lkOiBzYWZlTGluZUlkLFxuICAgIH0pO1xuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXG4gICAgfSk7XG4gIH0sIFtpc0VkaXRpbmcsIGxpbmU/LmxpbmVSZWNJZCwgbGluZUlkLCBsaW5rZWRUaWNrZXRGaWxlSWQsIHNoZWV0SWRdKTtcblxuICB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9ucyh7XG4gICAgYnVzeTogYnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXHJcbiAgICBhY3Rpb25Nb2RlOiBsaW5lVG9wYmFyQWN0aW9uTW9kZSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHk6IG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6IGNhbkNyZWF0ZUV4cGVuc2VDdXJyZW50LFxuICAgIGNhbkVkaXRFeHBlbnNlOiBjYW5FZGl0RXhwZW5zZUN1cnJlbnQsXG4gICAgY2FuRGVsZXRlRXhwZW5zZTogY2FuRGVsZXRlRXhwZW5zZUN1cnJlbnQsXG4gICAgc2hlZXRJZCxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQ6IGhhc0xpbmtlZFRpY2tldCA/IGhhbmRsZUVkaXRMaW5rZWRUaWNrZXQgOiBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBvblNhdmVTdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgICBzZXRJc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUodHJ1ZSk7XHJcbiAgICAgICAgbmF2aWdhdGVUb1NoZWV0RGV0YWlsKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xyXG4gICAgfSxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVPcGVuTGlua2VkVGlja2V0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IHNhZmVGaWxlSWQgPSBzYWZlVGV4dChsaW5rZWRUaWNrZXRGaWxlSWQpO1xuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQoc2hlZXRJZCk7XG4gICAgY29uc3Qgc2FmZUxpbmVJZCA9IHNhZmVUZXh0KGxpbmVJZCB8fCBsaW5lPy5saW5lUmVjSWQpO1xuICAgIGlmICghc2FmZUZpbGVJZCB8fCAhc2FmZVNoZWV0SWQgfHwgIXNhZmVMaW5lSWQpIHJldHVybjtcblxyXG4gICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgIGZpbGVJZDogc2FmZUZpbGVJZCxcbiAgICAgIG9yaWdpbjogXCJleHBlbnNlLWxpbmVcIixcbiAgICAgIHNoZWV0SWQ6IHNhZmVTaGVldElkLFxuICAgICAgc2hlZXRMaW5lUmVjSWQ6IHNhZmVMaW5lSWQsXG4gICAgfSk7XG4gICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcbiAgICAgIGZpbGVJZDogc2FmZUZpbGVJZCxcbiAgICAgIG9yaWdpbjogXCJleHBlbnNlLWxpbmVcIixcbiAgICAgIHNoZWV0SWQ6IHNhZmVTaGVldElkLFxuICAgICAgc2hlZXRMaW5lUmVjSWQ6IHNhZmVMaW5lSWQsXG4gICAgfSk7XG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcbiAgICB9KTtcbiAgfSwgW2lzRWRpdGluZywgbGluZT8ubGluZVJlY0lkLCBsaW5lSWQsIGxpbmtlZFRpY2tldEZpbGVJZCwgc2hlZXRJZF0pO1xuXG4gIGNvbnN0IGRldGFpbEJvZHkgPVxuICAgICFpc0xvYWRpbmcgJiYgIWlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhZXJyb3JNZXNzYWdlICYmIGxpbmUgPyAoXG4gICAgICA8RXhwZW5zZVNoZWV0TGluZUZvcm1cbiAgICAgICAgbGluZT17bGluZX1cbiAgICAgICAgZmFsbGJhY2tEYXRlPXtzYWZlVGV4dChoZWFkZXI/LmNyZWF0ZWREYXRlKX1cbiAgICAgICAgc2hlZXREZXNjcmlwdGlvbj17c2hlZXREZXNjcmlwdGlvbn1cbiAgICAgICAgcHJvamVjdFZhbHVlPXtwcm9qZWN0VmFsdWV9XG4gICAgICAgIHByaWNlVGV4dD17cHJpY2VUZXh0fVxuICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxuICAgICAgICBpbnRlcm5hY2lvbmFsTGFiZWw9e2ludGVybmFjaW9uYWxMYWJlbH1cbiAgICAgICAgaXNLbVR5cGU9e2lzS21UeXBlfVxuICAgICAgICBpc0Z1ZWxQcmljZUxvYWRpbmc9e2lzRnVlbFByaWNlTG9hZGluZ31cbiAgICAgICAgZnVlbFByaWNlTWVzc2FnZT17ZnVlbFByaWNlTWVzc2FnZX1cbiAgICAgICAgZnVlbFByaWNlTWVzc2FnZUlzRXJyb3I9e2Z1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yfVxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cbiAgICAgICAgaXNFZGl0aW5nPXtpc0VkaXRpbmd9XG4gICAgICAgIGdhc3RvVHlwZU9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XG4gICAgICAgIGludGVybmF0aW9uYWxPcHRpb25zPXtpbnRlcm5hdGlvbmFsT3B0aW9uc31cbiAgICAgICAgZHJhZnREZXNjcmlwdGlvbj17ZHJhZnREZXNjcmlwdGlvbn1cbiAgICAgICAgZHJhZnRUcmFuc0RhdGU9e2RyYWZ0VHJhbnNEYXRlfVxuICAgICAgICBkcmFmdFR5cGVWYWx1ZUNvZGU9e2RyYWZ0VHlwZVZhbHVlQ29kZX1cbiAgICAgICAgZHJhZnRQcmljZT17ZHJhZnRQcmljZX1cbiAgICAgICAgZHJhZnRRdHk9e2RyYWZ0UXR5fVxuICAgICAgICBkcmFmdFByb2plY3RJZD17ZHJhZnRQcm9qZWN0SWR9XG4gICAgICAgIGRyYWZ0SW50ZXJuYXRpb25hbD17ZHJhZnRJbnRlcm5hdGlvbmFsfVxuICAgICAgICB0eXBlSW5wdXRSZWY9e3R5cGVJbnB1dFJlZn1cbiAgICAgICAgcHJpY2VJbnB1dFJlZj17cHJpY2VJbnB1dFJlZn1cbiAgICAgICAgcXR5SW5wdXRSZWY9e3F0eUlucHV0UmVmfVxuICAgICAgICB0eXBlSW52YWxpZD17dHlwZUludmFsaWR9XG4gICAgICAgIHByaWNlSW52YWxpZD17cHJpY2VJbnZhbGlkfVxuICAgICAgICBxdHlJbnZhbGlkPXtxdHlJbnZhbGlkfVxuICAgICAgICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U9e3NldERyYWZ0RGVzY3JpcHRpb259XG4gICAgICAgIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2U9e3NldERyYWZ0VHJhbnNEYXRlfVxuICAgICAgICBvbkRyYWZ0VHlwZVZhbHVlQ29kZUNoYW5nZT17aGFuZGxlRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlfVxuICAgICAgICBvbkRyYWZ0UHJpY2VDaGFuZ2U9e2hhbmRsZURyYWZ0UHJpY2VDaGFuZ2V9XG4gICAgICAgIG9uRHJhZnRRdHlDaGFuZ2U9e2hhbmRsZURyYWZ0UXR5Q2hhbmdlfVxuICAgICAgICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlPXtzZXREcmFmdFByb2plY3RJZH1cbiAgICAgICAgb25EcmFmdEludGVybmF0aW9uYWxDaGFuZ2U9e3NldERyYWZ0SW50ZXJuYXRpb25hbH1cbiAgICAgICAgbGlua2VkVGlja2V0RmlsZUlkPXtsaW5rZWRUaWNrZXRGaWxlSWR9XG4gICAgICAgIHNob3dMaW5rZWRUaWNrZXRGaWVsZD17aGFzTGlua2VkVGlja2V0fVxuICAgICAgICBvbk9wZW5MaW5rZWRUaWNrZXQ9e2hhbmRsZU9wZW5MaW5rZWRUaWNrZXR9XG4gICAgICAvPlxuICAgICkgOiBudWxsO1xuXG4gIHJldHVybiAoXG4gICAgPEV4cGVuc2VTaGVldExpbmVEZXRhaWxWaWV3XG4gICAgICBtb2RhbD17e1xuICAgICAgICBvcGVuOiBtb2RhbC5vcGVuLFxuICAgICAgICB0aXRsZTogbW9kYWwudGl0bGUsXG4gICAgICAgIG1lc3NhZ2U6IG1vZGFsLm1lc3NhZ2UsXG4gICAgICAgIGNvbmZpcm1UZXh0OiBtb2RhbENvbmZpcm1UZXh0LFxuICAgICAgICBjYW5jZWxUZXh0OiBtb2RhbENhbmNlbFRleHQsXG4gICAgICAgIGxvYWRpbmdUZXh0OiBtb2RhbExvYWRpbmdUZXh0LFxuICAgICAgICBzaG93Q2FuY2VsOiBtb2RhbC5zaG93Q2FuY2VsLFxuICAgICAgICBzaG93Q29uZmlybTogbW9kYWwuc2hvd0NvbmZpcm0sXG4gICAgICAgIGJ1c3k6IGJ1c3kgfHwgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLFxuICAgICAgICBlcnJvcjogbW9kYWxFcnJvcixcbiAgICAgICAgc3RhdHVzLFxuICAgICAgICBvbkNvbmZpcm06IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcbiAgICAgICAgb25DYW5jZWw6IGNsb3NlQ29uZmlybSxcbiAgICAgIH19XG4gICAgICBwcmV2aWV3PXt7XG4gICAgICAgIG9wZW46IHByZXZpZXdPcGVuLFxuICAgICAgICBidXN5OiBwcmV2aWV3QnVzeSxcbiAgICAgICAgZXJyb3I6IHByZXZpZXdFcnJvcixcbiAgICAgICAgaW1hZ2VVcmw6IHByZXZpZXdJbWFnZVVybCxcbiAgICAgICAgaW1hZ2VBbHQ6IHByZXZpZXdBbHRUZXh0LFxuICAgICAgICBmaWxlTmFtZTogcHJldmlld0ZpbGVOYW1lLFxuICAgICAgICBzY2FsZTogcHJldmlld1NjYWxlLFxuICAgICAgICB0cmFuc2xhdGU6IHByZXZpZXdUcmFuc2xhdGUsXG4gICAgICAgIHN1cmZhY2VSZWY6IHByZXZpZXdTdXJmYWNlUmVmLFxuICAgICAgICBzaG93U3RpY2t5UHJldmlldyxcbiAgICAgICAgb25PcGVuOiBvcGVuUHJldmlldyxcbiAgICAgICAgb25DbG9zZTogY2xvc2VQcmV2aWV3LFxuICAgICAgICBvblBvaW50ZXJEb3duOiBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24sXG4gICAgICAgIG9uUG9pbnRlck1vdmU6IGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcbiAgICAgICAgb25Qb2ludGVyRW5kOiBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcbiAgICAgICAgb25XaGVlbDogaGFuZGxlUHJldmlld1doZWVsLFxuICAgICAgfX1cbiAgICAgIGNvbnRlbnQ9e3tcbiAgICAgICAgaXNMb2FkaW5nLFxuICAgICAgICBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXG4gICAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgICAgZGV0YWlsQm9keSxcbiAgICAgIH19XG4gICAgLz5cbiAgKTtcbn07XG5cclxuLy8gTWFpbiBwYWdlIGVudHJ5IGZvciBleHBlbnNlIHNoZWV0IGxpbmUgZGV0YWlsLlxyXG5jb25zdCBFeHBlbnNlU2hlZXRMaW5lRGV0YWlsUGFnZSA9ICgpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzIGVuYWJsZUV4cGVuc2VNYW5hZ2VtZW50PlxyXG4gICAgICA8RXhwZW5zZVNoZWV0TGluZURldGFpbENvbnRlbnQgLz5cclxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XHJcbiAgKTtcclxufTtcclxuXHJcbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xyXG4gIGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoKCk7XHJcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBlbnNlLWxpbmUtZGV0YWlsLXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VTaGVldExpbmVEZXRhaWxQYWdlIC8+KTtcclxufTtcclxuXHJcbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0TGluZURldGFpbFBhZ2U7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldExpbmUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlciwgZm9ybWF0RXhwZW5zZU51bWJlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0IGZyb20gXCIuL0V4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VTZWN0aW9uRGl2aWRlciBmcm9tIFwiLi9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4XCI7XHJcblxyXG50eXBlIEV4cGVuc2VTaGVldExpbmVGb3JtUHJvcHMgPSB7XHJcbiAgbGluZTogRXhwZW5zZVNoZWV0TGluZTtcclxuICBmYWxsYmFja0RhdGU6IHN0cmluZztcclxuICBzaGVldERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgcHJvamVjdFZhbHVlOiBzdHJpbmc7XHJcbiAgcHJpY2VUZXh0OiBzdHJpbmc7XHJcbiAgYW1vdW50VGV4dDogc3RyaW5nO1xyXG4gIGludGVybmFjaW9uYWxMYWJlbDogc3RyaW5nO1xyXG4gIGlzS21UeXBlOiBib29sZWFuO1xyXG4gIGlzRnVlbFByaWNlTG9hZGluZzogYm9vbGVhbjtcclxuICBmdWVsUHJpY2VNZXNzYWdlOiBzdHJpbmc7XHJcbiAgZnVlbFByaWNlTWVzc2FnZUlzRXJyb3I6IGJvb2xlYW47XHJcbiAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGdhc3RvVHlwZU9wdGlvbnM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXTtcclxuICBpbnRlcm5hdGlvbmFsT3B0aW9uczogRXhwZW5zZVNlbGVjdE9wdGlvbltdO1xyXG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcclxuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIGRyYWZ0VHlwZVZhbHVlQ29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0UHJpY2U6IHN0cmluZztcclxuICBkcmFmdFF0eTogc3RyaW5nO1xyXG4gIGRyYWZ0UHJvamVjdElkOiBzdHJpbmc7XHJcbiAgZHJhZnRJbnRlcm5hdGlvbmFsOiBzdHJpbmc7XHJcbiAgbGlua2VkVGlja2V0RmlsZUlkOiBzdHJpbmc7XHJcbiAgc2hvd0xpbmtlZFRpY2tldEZpZWxkOiBib29sZWFuO1xyXG4gIHR5cGVJbnB1dFJlZj86IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICBwcmljZUlucHV0UmVmPzogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIHF0eUlucHV0UmVmPzogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIHR5cGVJbnZhbGlkPzogYm9vbGVhbjtcclxuICBwcmljZUludmFsaWQ/OiBib29sZWFuO1xyXG4gIHF0eUludmFsaWQ/OiBib29sZWFuO1xyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRQcmljZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdFF0eUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdFByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdEludGVybmF0aW9uYWxDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uT3BlbkxpbmtlZFRpY2tldDogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdFF0eVZhbHVlID0gKHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gZm9ybWF0RXhwZW5zZU51bWJlcih2YWx1ZSwge1xyXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICBmYWxsYmFjazogXCItXCIsXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBQdXJlIGZvcm0gcmVuZGVyZXIgZm9yIGV4cGVuc2UgbGluZSBkZXRhaWwgaW4gcmVhZCBhbmQgZWRpdCBtb2Rlcy5cclxuY29uc3QgRXhwZW5zZVNoZWV0TGluZUZvcm0gPSAoe1xyXG4gIGxpbmUsXHJcbiAgZmFsbGJhY2tEYXRlLFxyXG4gIHNoZWV0RGVzY3JpcHRpb246IF9zaGVldERlc2NyaXB0aW9uLFxyXG4gIHByb2plY3RWYWx1ZSxcclxuICBwcmljZVRleHQsXHJcbiAgYW1vdW50VGV4dCxcclxuICBpbnRlcm5hY2lvbmFsTGFiZWwsXHJcbiAgaXNLbVR5cGUsXHJcbiAgaXNGdWVsUHJpY2VMb2FkaW5nLFxyXG4gIGZ1ZWxQcmljZU1lc3NhZ2UsXHJcbiAgZnVlbFByaWNlTWVzc2FnZUlzRXJyb3IsXHJcbiAgc3RhdHVzLFxyXG4gIGlzRWRpdGluZyxcclxuICBnYXN0b1R5cGVPcHRpb25zLFxyXG4gIGludGVybmF0aW9uYWxPcHRpb25zLFxyXG4gIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgZHJhZnRUeXBlVmFsdWVDb2RlLFxyXG4gIGRyYWZ0UHJpY2UsXHJcbiAgZHJhZnRRdHksXHJcbiAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgZHJhZnRJbnRlcm5hdGlvbmFsLFxyXG4gIGxpbmtlZFRpY2tldEZpbGVJZCxcclxuICBzaG93TGlua2VkVGlja2V0RmllbGQsXHJcbiAgdHlwZUlucHV0UmVmLFxyXG4gIHByaWNlSW5wdXRSZWYsXHJcbiAgcXR5SW5wdXRSZWYsXHJcbiAgdHlwZUludmFsaWQgPSBmYWxzZSxcclxuICBwcmljZUludmFsaWQgPSBmYWxzZSxcclxuICBxdHlJbnZhbGlkID0gZmFsc2UsXHJcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlLFxyXG4gIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2UsXHJcbiAgb25EcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2UsXHJcbiAgb25EcmFmdFByaWNlQ2hhbmdlLFxyXG4gIG9uRHJhZnRRdHlDaGFuZ2UsXHJcbiAgb25EcmFmdFByb2plY3RJZENoYW5nZSxcclxuICBvbkRyYWZ0SW50ZXJuYXRpb25hbENoYW5nZSxcclxuICBvbk9wZW5MaW5rZWRUaWNrZXQsXHJcbn06IEV4cGVuc2VTaGVldExpbmVGb3JtUHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic3BhY2UteS0wXCI+XHJcbiAgICAgIDxFeHBlbnNlU2VjdGlvbkRpdmlkZXJcclxuICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfTGluZVwiLCBcIkxpbmVcIil9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXItLXNwYWNlZFwiXHJcbiAgICAgICAgbGFiZWxDbGFzc05hbWU9XCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlcl9fbGFiZWwtLXRpdGxlXCJcclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInJlbGF0aXZlIHNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XHJcbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtOmNvbC1zcGFuLTIgc3BhY2UteS0xLjVcIj5cclxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnREZXNjcmlwdGlvbn1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e3NhZmVUZXh0KGxpbmUuZGVzY3JpcHRpb24pIHx8IFwiLVwifVxyXG4gICAgICAgICAgICAgIGZ1bGxXaWR0aFxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICB7c2hvd0xpbmtlZFRpY2tldEZpZWxkID8gKFxyXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmllbGRfRmlsZUlkXCIsIFwiVGlja2V0XCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtsaW5rZWRUaWNrZXRGaWxlSWR9XHJcbiAgICAgICAgICAgICAgZnVsbFdpZHRoXHJcbiAgICAgICAgICAgICAgb25DbGljaz17b25PcGVuTGlua2VkVGlja2V0fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAge2lzRWRpdGluZyA/IChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpdGEtZmllbGQtdGV4dFwiPlxyXG4gICAgICAgICAgICAgIDxTaW5nbGVEYXRlUGlja2VyXHJcbiAgICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3JlYXRlZERhdGVcIiwgXCJEYXRlXCIpfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0VHJhbnNEYXRlfVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRUcmFuc0RhdGVDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0NyZWF0ZWREYXRlXCIsIFwiRGF0ZVwiKX1cclxuICAgICAgICAgICAgICB2YWx1ZT17Zm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKFxyXG4gICAgICAgICAgICAgICAgc2FmZVRleHQobGluZS50cmFuc0RhdGUgfHwgZmFsbGJhY2tEYXRlKSxcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiXHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAge2lzRWRpdGluZyA/IChcclxuICAgICAgICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1R5cGVcIiwgXCJUeXBlXCIpfVxyXG4gICAgICAgICAgICAgIG9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0VHlwZVZhbHVlQ29kZSB8fCBcIlwifVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0VHlwZVZhbHVlQ29kZUNoYW5nZX1cclxuICAgICAgICAgICAgICBpbnB1dFJlZj17dHlwZUlucHV0UmVmfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9UeXBlXCIsIFwiVHlwZVwiKX1cclxuICAgICAgICAgICAgICBpbnZhbGlkPXt0eXBlSW52YWxpZH1cclxuICAgICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cclxuICAgICAgICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVHlwZVwiLCBcIlR5cGVcIil9IHZhbHVlPXtzYWZlVGV4dChsaW5lLnR5cGVWYWx1ZSkgfHwgXCItXCJ9IC8+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cclxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1ByaWNlXCIsIFwiUHJpY2VcIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgIHJlZj17cHJpY2VJbnB1dFJlZn1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7aXNLbVR5cGUgPyBcImZvcm0tY29udHJvbCBpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwiZm9ybS1jb250cm9sXCJ9JHtcclxuICAgICAgICAgICAgICAgICAgcHJpY2VJbnZhbGlkID8gXCIgYm9yZGVyLXJvc2UtNDAwIGJnLXJvc2UtNTAgZm9jdXM6cmluZy1yb3NlLTIwMCBmb2N1czpib3JkZXItcm9zZS00MDBcIiA6IFwiXCJcclxuICAgICAgICAgICAgICAgIH1gfVxyXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgaW5wdXRNb2RlPVwiZGVjaW1hbFwiXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRQcmljZX1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnRQcmljZUNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XHJcbiAgICAgICAgICAgICAgICBvbkJsdXI9eyhldmVudCkgPT5cclxuICAgICAgICAgICAgICAgICAgb25EcmFmdFByaWNlQ2hhbmdlKFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihldmVudC50YXJnZXQudmFsdWUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgICAgICAgICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgICAgICAgICAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZmFsbGJhY2s6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9e2lzS21UeXBlfVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzS21UeXBlfVxyXG4gICAgICAgICAgICAgICAgYXJpYS1yZWFkb25seT17aXNLbVR5cGV9XHJcbiAgICAgICAgICAgICAgICBhcmlhLWludmFsaWQ9e3ByaWNlSW52YWxpZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwifVxyXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJpY2VcIiwgXCJQcmljZVwiKX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIHtpc0ttVHlwZSAmJiBpc0Z1ZWxQcmljZUxvYWRpbmcgPyAoXHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LXhzXCI+XHJcbiAgICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GdWVsUHJpY2VfTG9hZGluZ1wiLCBcIkxvYWRpbmcgZnVlbCBwcmljZS4uLlwiKX1cclxuICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgICB7aXNLbVR5cGUgJiYgIWlzRnVlbFByaWNlTG9hZGluZyAmJiBmdWVsUHJpY2VNZXNzYWdlID8gKFxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtmdWVsUHJpY2VNZXNzYWdlSXNFcnJvciA/IFwidGV4dC1kYW5nZXIgdGV4dC1zbVwiIDogXCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LXhzXCJ9PntmdWVsUHJpY2VNZXNzYWdlfTwvcD5cclxuICAgICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1ByaWNlXCIsIFwiUHJpY2VcIil9IHZhbHVlPXtwcmljZVRleHQgfHwgXCItXCJ9IC8+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cclxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICByZWY9e3F0eUlucHV0UmVmfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sJHtcclxuICAgICAgICAgICAgICAgICAgcXR5SW52YWxpZCA/IFwiIGJvcmRlci1yb3NlLTQwMCBiZy1yb3NlLTUwIGZvY3VzOnJpbmctcm9zZS0yMDAgZm9jdXM6Ym9yZGVyLXJvc2UtNDAwXCIgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9YH1cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgIGlucHV0TW9kZT1cImRlY2ltYWxcIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0UXR5fVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdFF0eUNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XHJcbiAgICAgICAgICAgICAgICBvbkJsdXI9eyhldmVudCkgPT5cclxuICAgICAgICAgICAgICAgICAgb25EcmFmdFF0eUNoYW5nZShcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFyaWEtaW52YWxpZD17cXR5SW52YWxpZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwifVxyXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUXR5XCIsIFwiUXVhbnRpdHlcIil9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUXR5XCIsIFwiUXVhbnRpdHlcIil9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1hdFF0eVZhbHVlKGxpbmUucXR5KX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9BbW91bnRcIiwgXCJBbW91bnRcIil9IHZhbHVlPXthbW91bnRUZXh0IHx8IFwiLVwifSAvPlxyXG5cclxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICAgIDxFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0XHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfUHJvamVjdF9QbGFjZWhvbGRlclwiLCBcIlByb2plY3QgaWRcIil9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0UHJvamVjdElkfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0UHJvamVjdElkQ2hhbmdlfVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxyXG4gICAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKSA6IHByb2plY3RWYWx1ZSA/IChcclxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX0gdmFsdWU9e3Byb2plY3RWYWx1ZX0gLz5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9JbnRlcm5hdGlvbmFsXCIsIFwiSW50ZXJuYXRpb25hbFwiKX1cclxuICAgICAgICAgICAgICBvcHRpb25zPXtpbnRlcm5hdGlvbmFsT3B0aW9uc31cclxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRJbnRlcm5hdGlvbmFsIHx8IFwiXCJ9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRJbnRlcm5hdGlvbmFsQ2hhbmdlfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9JbnRlcm5hdGlvbmFsXCIsIFwiSW50ZXJuYXRpb25hbFwiKX1cclxuICAgICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cclxuICAgICAgICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9JbnRlcm5hdGlvbmFsXCIsIFwiSW50ZXJuYXRpb25hbFwiKX1cclxuICAgICAgICAgICAgICB2YWx1ZT17aW50ZXJuYWNpb25hbExhYmVsfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHRleHQtc20gdGV4dC1zbGF0ZS02MDBcIj5cclxuICAgICAgICAgIDxzcGFuPntzdGF0dXN9PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L3NlY3Rpb24+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldExpbmVGb3JtO1xyXG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlSW50ZXJuYXRpb25hbE9wdGlvbiA9IHtcclxuICB2YWx1ZTogYm9vbGVhbjtcclxuICB0ZXh0OiBzdHJpbmc7XHJcbn07XHJcblxyXG4vLyBGaXhlZCBlbnVtIGZvciBcIkludGVybmFjaW9uYWxcIiBmaWVsZCBpbiBleHBlbnNlIHNoZWV0IGxpbmVzLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUludGVybmF0aW9uYWxPcHRpb25zID0gKCk6IEV4cGVuc2VJbnRlcm5hdGlvbmFsT3B0aW9uW10gPT4gW1xyXG4gIHsgdmFsdWU6IHRydWUsIHRleHQ6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ludGVybmF0aW9uYWxfWWVzXCIsIFwiU1x1MDBFRFwiKSB9LFxyXG4gIHsgdmFsdWU6IGZhbHNlLCB0ZXh0OiBpbmRUKFwiRXhwZW5zZVNoZWV0c19JbnRlcm5hdGlvbmFsX05vXCIsIFwiTm9cIikgfSxcclxuXTtcclxuXHJcbi8vIE1hcHMgbnVsbGFibGUgYm9vbGVhbiB2YWx1ZXMgdG8gZml4ZWQgZW51bSBsYWJlbHMgZm9yIHJlYWQtb25seSByZW5kZXJpbmcuXHJcbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlSW50ZXJuYXRpb25hbExhYmVsID0gKHZhbHVlOiBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSB0cnVlKSB7XHJcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfSW50ZXJuYXRpb25hbF9ZZXNcIiwgXCJTXHUwMEVEXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xyXG4gICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0ludGVybmF0aW9uYWxfTm9cIiwgXCJOb1wiKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBcIi1cIjtcclxufTtcclxuXHJcbi8vIFBhcnNlcyB1c2VyIGlucHV0IGJhY2sgdG8gbnVsbGFibGUgYm9vbGVhbiBmb3IgZnV0dXJlIGVkaXQgbW9kZS5cclxuZXhwb3J0IGNvbnN0IHBhcnNlRXhwZW5zZUludGVybmF0aW9uYWxWYWx1ZSA9IChyYXc6IHN0cmluZyB8IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB8IG51bGwgPT4ge1xyXG4gIGlmIChyYXcgPT09IHRydWUgfHwgcmF3ID09PSBmYWxzZSkge1xyXG4gICAgcmV0dXJuIHJhdztcclxuICB9XHJcblxyXG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKHJhdyB8fCBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICBpZiAoIXZhbHVlKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGlmICh2YWx1ZSA9PT0gXCJ0cnVlXCIgfHwgdmFsdWUgPT09IFwiMVwiKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGlmICh2YWx1ZSA9PT0gXCJmYWxzZVwiIHx8IHZhbHVlID09PSBcIjBcIikge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlU2hlZXRDcmVhdGVMaW5lUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRMaW5lLFxyXG4gIEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxyXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgcGFyc2VFeHBlbnNlSW50ZXJuYXRpb25hbFZhbHVlIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9pbnRlcm5hdGlvbmFsT3B0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFLCB0b0V4cGVuc2VBcGlEZE1tWXl5eSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24sIHBhcnNlRGVjaW1hbElucHV0IH0gZnJvbSBcIi4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgY3JlYXRlRXhwZW5zZVNoZWV0LFxyXG4gIGRlbGV0ZUV4cGVuc2VTaGVldExpbmUsXHJcbiAgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0LFxyXG4gIGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldEZpbGUsXHJcbiAgdXBkYXRlRXhwZW5zZVNoZWV0TGluZSxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgaXNFZGl0TG9ja2VkOiBib29sZWFuO1xyXG4gIGlzRGVsZXRlTG9ja2VkOiBib29sZWFuO1xyXG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgbGluZUlkOiBzdHJpbmc7XHJcbiAgbGluZTogRXhwZW5zZVNoZWV0TGluZSB8IG51bGw7XHJcbiAgbGlua2VkVGlja2V0RmlsZUlkOiBzdHJpbmc7XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgZHJhZnRUeXBlVmFsdWVDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRQcmljZTogc3RyaW5nO1xyXG4gIGRyYWZ0UXR5OiBzdHJpbmc7XHJcbiAgZHJhZnRQcm9qZWN0SWQ6IHN0cmluZztcclxuICBkcmFmdEludGVybmF0aW9uYWw6IHN0cmluZztcclxuICBzZXRNb2RhbEVycm9yOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRJc0VkaXRpbmc6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxuICBvbkludmFsaWRUeXBlPzogKCkgPT4gdm9pZDtcclxuICBvbkludmFsaWRBbW91bnRRdHk/OiAoKSA9PiB2b2lkO1xyXG4gIG9uQ3JlYXRlU3VjY2VzczogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUxpbmVEYXRlID0gKHJhdzogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gdG9FeHBlbnNlQXBpRGRNbVl5eXkocmF3KTtcclxufTtcclxuXHJcbmNvbnN0IHBhcnNlTnVtYmVyID0gKHJhdzogc3RyaW5nKTogbnVtYmVyIHwgbnVsbCA9PiBwYXJzZURlY2ltYWxJbnB1dChyYXcpO1xyXG5cclxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgZXhwZW5zZSBzaGVldCBsaW5lIGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxNdXRhdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzQ3JlYXRlTW9kZSxcclxuICBpc0VkaXRMb2NrZWQsXHJcbiAgaXNEZWxldGVMb2NrZWQsXHJcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICBjYW5FZGl0RXhwZW5zZSxcclxuICBjYW5EZWxldGVFeHBlbnNlLFxyXG4gIHNoZWV0SWQsXHJcbiAgbGluZUlkLFxyXG4gIGxpbmUsXHJcbiAgbGlua2VkVGlja2V0RmlsZUlkLFxyXG4gIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgZHJhZnRUeXBlVmFsdWVDb2RlLFxyXG4gIGRyYWZ0UHJpY2UsXHJcbiAgZHJhZnRRdHksXHJcbiAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgZHJhZnRJbnRlcm5hdGlvbmFsLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgc2V0QnVzeSxcclxuICBzZXRTdGF0dXMsXHJcbiAgc2V0SXNFZGl0aW5nLFxyXG4gIG9uSW52YWxpZFR5cGUsXHJcbiAgb25JbnZhbGlkQW1vdW50UXR5LFxyXG4gIG9uQ3JlYXRlU3VjY2VzcyxcclxufTogVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9uc0FyZ3MpID0+IHtcclxuICBjb25zdCBpc05vdEZvdW5kRXJyb3IgPSAoZXJyb3I6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICAgIHJldHVybiBlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDQ7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaXNNaXNzaW5nVGlja2V0RmlsZU1lc3NhZ2UgPSAobWVzc2FnZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyhtZXNzYWdlIHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImFyY2hpdm8gYXNvY2lhZG9cIikgfHxcclxuICAgICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImFyY2hpdm8gYWRqdW50b1wiKSB8fFxyXG4gICAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXNzb2NpYXRlZCBmaWxlXCIpIHx8XHJcbiAgICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhdHRhY2hlZCBmaWxlXCIpXHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChidXN5IHx8ICFpc0VkaXRpbmcpIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChpc0VkaXRMb2NrZWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBjYW5Qcm9jZWVkID0gaXNDcmVhdGVNb2RlID8gY2FuQ3JlYXRlRXhwZW5zZSA6IGNhbkVkaXRFeHBlbnNlO1xyXG4gICAgaWYgKCFjYW5Qcm9jZWVkKSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5vcm1hbGl6ZWREYXRlID0gbm9ybWFsaXplTGluZURhdGUoZHJhZnRUcmFuc0RhdGUpO1xyXG4gICAgY29uc3QgcGFyc2VkVHlwZVZhbHVlID0gTnVtYmVyLnBhcnNlSW50KFN0cmluZyhkcmFmdFR5cGVWYWx1ZUNvZGUgfHwgXCJcIikudHJpbSgpLCAxMCk7XHJcbiAgICBjb25zdCBwYXJzZWRQcmljZSA9IHBhcnNlTnVtYmVyKGRyYWZ0UHJpY2UpO1xyXG4gICAgY29uc3QgcGFyc2VkUXR5ID0gcGFyc2VOdW1iZXIoZHJhZnRRdHkpO1xyXG4gICAgY29uc3QgcGFyc2VkSW50ZXJuYXRpb25hbCA9IHBhcnNlRXhwZW5zZUludGVybmF0aW9uYWxWYWx1ZShkcmFmdEludGVybmF0aW9uYWwpO1xyXG5cclxuICAgIGNvbnN0IGhhc1ZhbGlkUXR5UHJpY2UgPSBwYXJzZWRRdHkgIT0gbnVsbCAmJiBwYXJzZWRRdHkgPiAwICYmIHBhcnNlZFByaWNlICE9IG51bGwgJiYgcGFyc2VkUHJpY2UgPiAwO1xyXG4gICAgaWYgKCFoYXNWYWxpZFF0eVByaWNlKSB7XHJcbiAgICAgIG9uSW52YWxpZEFtb3VudFF0eT8uKCk7XHJcbiAgICAgIGNvbnN0IHZhbGlkYXRpb25NZXNzYWdlID0gaW5kVChcclxuICAgICAgICBcIkV4cGVuc2VTaGVldHNfTGluZV9WYWxpZGF0aW9uX0Ftb3VudFF0eVwiLFxyXG4gICAgICAgIFwiUXVhbnRpdHkgYW5kIHByaWNlIG11c3QgYmUgZ3JlYXRlciB0aGFuIDAuXCJcclxuICAgICAgKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcih2YWxpZGF0aW9uTWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyh2YWxpZGF0aW9uTWVzc2FnZSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIW5vcm1hbGl6ZWREYXRlKSB7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgICAgIHNldFN0YXR1cyhFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKHBhcnNlZFR5cGVWYWx1ZSkgfHwgcGFyc2VkVHlwZVZhbHVlIDw9IDApIHtcclxuICAgICAgb25JbnZhbGlkVHlwZT8uKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcclxuICAgICAgc3RhcnRTdGF0dXM6IGlzQ3JlYXRlTW9kZVxyXG4gICAgICAgID8gaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfQ3JlYXRpbmdcIiwgXCJDcmVhdGluZyBleHBlbnNlIGxpbmUuLi5cIilcclxuICAgICAgICA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgZXhwZW5zZSBsaW5lLi4uXCIpLFxyXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKSxcclxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBjb21tb25MaW5lUGF5bG9hZCA9IHtcclxuICAgICAgICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplZERhdGUsXHJcbiAgICAgICAgICB0eXBlVmFsdWU6IHBhcnNlZFR5cGVWYWx1ZSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoZHJhZnREZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXHJcbiAgICAgICAgICBpbnRlcm5hY2lvbmFsOiBwYXJzZWRJbnRlcm5hdGlvbmFsID8/IGxpbmU/LmludGVybmFjaW9uYWwgPz8gZmFsc2UsXHJcbiAgICAgICAgICB0aWNrZXQ6IGxpbmU/LnRpY2tldCA9PT0gdHJ1ZSxcclxuICAgICAgICAgIHF0eTogTnVtYmVyKHBhcnNlZFF0eSksXHJcbiAgICAgICAgICBwcmljZTogTnVtYmVyKHBhcnNlZFByaWNlKSxcclxuICAgICAgICAgIHByb2pJZDogU3RyaW5nKGRyYWZ0UHJvamVjdElkIHx8IFwiXCIpLnRyaW0oKSB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgICBpbmRBdHRhY2hGaWxlczogc2FmZVRleHQobGluZT8uaW5kQXR0YWNoRmlsZXMpLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGNyZWF0ZUxpbmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRDcmVhdGVMaW5lUmVxdWVzdCA9IGNvbW1vbkxpbmVQYXlsb2FkO1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZUxpbmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVxdWVzdCA9IGNvbW1vbkxpbmVQYXlsb2FkO1xyXG5cclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGlzQ3JlYXRlTW9kZVxyXG4gICAgICAgICAgPyBhd2FpdCBjcmVhdGVFeHBlbnNlU2hlZXQoe1xyXG4gICAgICAgICAgICAgIG1vZGU6IDIsXHJcbiAgICAgICAgICAgICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IHNoZWV0SWQsXHJcbiAgICAgICAgICAgICAgbGluZXM6IFtjcmVhdGVMaW5lUGF5bG9hZF0sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICA6IGF3YWl0IHVwZGF0ZUV4cGVuc2VTaGVldExpbmUoc2hlZXRJZCwgbGluZUlkLCB1cGRhdGVMaW5lUGF5bG9hZCk7XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9DcmVhdGVkXCIsIFwiRXhwZW5zZSBsaW5lIGNyZWF0ZWRcIikpO1xyXG4gICAgICAgICAgb25DcmVhdGVTdWNjZXNzKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBsaW5lIHVwZGF0ZWRcIikpO1xyXG4gICAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xyXG4gIH0sIFtcclxuICAgIGJ1c3ksXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gICAgY2FuRWRpdEV4cGVuc2UsXHJcbiAgICBkcmFmdFByaWNlLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0SW50ZXJuYXRpb25hbCxcclxuICAgIGRyYWZ0UHJvamVjdElkLFxyXG4gICAgZHJhZnRRdHksXHJcbiAgICBkcmFmdFRyYW5zRGF0ZSxcclxuICAgIGRyYWZ0VHlwZVZhbHVlQ29kZSxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzRWRpdExvY2tlZCxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGxpbmUsXHJcbiAgICBsaW5lSWQsXHJcbiAgICBvbkNyZWF0ZVN1Y2Nlc3MsXHJcbiAgICBvbkludmFsaWRBbW91bnRRdHksXHJcbiAgICBvbkludmFsaWRUeXBlLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzaGVldElkLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKGlzRGVsZXRlTG9ja2VkKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWNhbkRlbGV0ZUV4cGVuc2UpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGV4cGVuc2UgbGluZS4uLlwiKSxcclxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIiksXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldEJ1c3ksXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2FmZUxpbmtlZFRpY2tldEZpbGVJZCA9IHNhZmVUZXh0KGxpbmtlZFRpY2tldEZpbGVJZCk7XHJcbiAgICAgICAgaWYgKHNhZmVMaW5rZWRUaWNrZXRGaWxlSWQpIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUZpbGVSZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldEZpbGUoc2FmZUxpbmtlZFRpY2tldEZpbGVJZCk7XHJcbiAgICAgICAgICAgIGlmICghZGVsZXRlRmlsZVJlc3BvbnNlLlN1Y2Nlc3MgJiYgIWlzTWlzc2luZ1RpY2tldEZpbGVNZXNzYWdlKGRlbGV0ZUZpbGVSZXNwb25zZS5NZXNzYWdlKSkge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihkZWxldGVGaWxlUmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBpZiAoIWlzTm90Rm91bmRFcnJvcihlcnJvcikpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZVRpY2tldFJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0KHNhZmVMaW5rZWRUaWNrZXRGaWxlSWQpO1xyXG4gICAgICAgICAgICBpZiAoIWRlbGV0ZVRpY2tldFJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGVsZXRlVGlja2V0UmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBpZiAoIWlzTm90Rm91bmRFcnJvcihlcnJvcikpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRMaW5lKHNoZWV0SWQsIGxpbmVJZCk7XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9EZWxldGVkXCIsIFwiRXhwZW5zZSBsaW5lIGRlbGV0ZWRcIikpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICB9LCBbXHJcbiAgICBidXN5LFxyXG4gICAgY2FuRGVsZXRlRXhwZW5zZSxcclxuICAgIGlzRGVsZXRlTG9ja2VkLFxyXG4gICAgbGluZUlkLFxyXG4gICAgbGlua2VkVGlja2V0RmlsZUlkLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzaGVldElkLFxyXG4gIF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zIH0gZnJvbSBcIi4uL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbE9wZW46IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcclxuICBpc0xvY2tlZDogYm9vbGVhbjtcclxuICBhY3Rpb25Nb2RlPzogXCJkZWZhdWx0XCIgfCBcImRlbGV0ZV9vbmx5XCIgfCBcInZpZXdfb25seVwiO1xyXG4gIHBlcm1pc3Npb25zUmVhZHk/OiBib29sZWFuO1xyXG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGNhbk9wZW5TYXZlQ29uZmlybT86ICgpID0+IGJvb2xlYW47XHJcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBvblNhdmVTdWNjZXNzOiAoKSA9PiB2b2lkO1xyXG4gIG9wZW5Db25maXJtOiAob3B0czoge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xyXG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcclxuICB9KSA9PiB2b2lkO1xyXG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIENvb3JkaW5hdGVzIHRvcGJhciBpY29uIHN0YXRlIGFuZCBkaXNwYXRjaCBhY3Rpb25zIGZvciBleHBlbnNlIHNoZWV0IGxpbmUgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgbW9kYWxPcGVuLFxyXG4gIGlzRWRpdGluZyxcclxuICBpc0NyZWF0ZU1vZGUsXHJcbiAgaXNMb2NrZWQsXHJcbiAgYWN0aW9uTW9kZSA9IFwiZGVmYXVsdFwiLFxyXG4gIHBlcm1pc3Npb25zUmVhZHkgPSB0cnVlLFxyXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXHJcbiAgY2FuRWRpdEV4cGVuc2UsXHJcbiAgY2FuRGVsZXRlRXhwZW5zZSxcclxuICBzaGVldElkLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICBoYW5kbGVVcGRhdGUsXHJcbiAgaGFuZGxlRGVsZXRlLFxyXG4gIG9uU2F2ZVN1Y2Nlc3MsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcclxuICB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMoe1xyXG4gICAgYWN0aW9uR3JvdXBJZDogXCJleHBlbnNlLWxpbmUtZGV0YWlsLWFjdGlvbnNcIixcclxuICAgIGlkczoge1xyXG4gICAgICBlZGl0SWNvbklkOiBcImV4cGVuc2VMaW5lRWRpdEljb25cIixcclxuICAgICAgc2F2ZUljb25JZDogXCJleHBlbnNlTGluZVNhdmVJY29uXCIsXHJcbiAgICAgIGRlbGV0ZUJ0bklkOiBcImV4cGVuc2VMaW5lRGVsZXRlQnRuXCIsXHJcbiAgICAgIGNhbmNlbEJ0bklkOiBcImV4cGVuc2VMaW5lQ2FuY2VsQnRuXCIsXHJcbiAgICB9LFxyXG4gICAgZXZlbnRzOiB7XHJcbiAgICAgIGVkaXRFdmVudDogXCJleHBlbnNlLWxpbmUtZGV0YWlsLWVkaXRcIixcclxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS1saW5lLWRldGFpbC1kZWxldGVcIixcclxuICAgICAgY2FuY2VsRXZlbnQ6IFwiZXhwZW5zZS1saW5lLWRldGFpbC1jYW5jZWwtZWRpdFwiLFxyXG4gICAgfSxcclxuICAgIGJ1c3ksXHJcbiAgICBtb2RhbE9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0xvY2tlZCxcclxuICAgIGFjdGlvbk1vZGUsXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5LFxyXG4gICAgY2FuQ3JlYXRlOiBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gICAgY2FuRWRpdDogY2FuRWRpdEV4cGVuc2UsXHJcbiAgICBjYW5EZWxldGU6IGNhbkRlbGV0ZUV4cGVuc2UsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgICBoYW5kbGVTYXZlOiBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBzYXZlQ29uZmlybVRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJTYXZlIGNoYW5nZXNcIiksXHJcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gc2F2ZSBjaGFuZ2VzP1wiKSxcclxuICAgIHNhdmVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1UaXRsZTogaW5kVChcIkNvbmZpcm1fRGVsZXRlX1RpdGxlXCIsIFwiRGVsZXRlXCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgaXRlbT9cIiksXHJcbiAgICBkZWxldGVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIiksXHJcbiAgICBvblNhdmVTdWNjZXNzLFxyXG4gICAgb25EZWxldGVTdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCl9YCk7XHJcbiAgICB9LFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsQ29uZmlybURpYWxvZ0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbEVycm9yOiBzdHJpbmc7XHJcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxufTtcclxuXHJcbi8vIEtlZXBzIGxpbmUgZGV0YWlsIGNvbmZpcm0gZGlhbG9nIHdpcmluZyBvdXRzaWRlIHRoZSBwYWdlIGNvbXBvbmVudC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxDb25maXJtRGlhbG9nID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsRXJyb3IsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBzZXRTdGF0dXMsXHJcbn06IFVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxDb25maXJtRGlhbG9nQXJncykgPT4ge1xyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xyXG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcclxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm0sIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1c10pO1xyXG5cclxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcclxuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XHJcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcclxuICAgIDogIWJ1c3kgJiYgbW9kYWxFcnJvclxyXG4gICAgICA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKVxyXG4gICAgICA6IG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZvaWQgaGFuZGxlTW9kYWxDb25maXJtKCk7XHJcbiAgfSwgW2J1c3ksIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtLCBtb2RhbEVycm9yXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBtb2RhbCxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gICAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICAgIG1vZGFsQ2FuY2VsVGV4dCxcclxuICAgIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRIZWFkZXIsIEV4cGVuc2VTaGVldExpbmUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsLCBnZXRGdWVsUHJpY2VLbSwgbWFwRXhwZW5zZVNoZWV0SGVhZGVyLCBtYXBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHtcclxuICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXHJcbiAgbmF2aWdhdGVUb0V4cGVuc2VVcmwsXHJcbiAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHsgaGFzQXNzaWduZWRWb3VjaGVyLCBwYXJzZUV4cGVuc2VEYXRlLCBzYWZlVGV4dCwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UsIHRvRXhwZW5zZUFwaURkTW1ZeXl5IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZUV4cGVuc2VTaGVldERldGFpbFBvbGljeSB9IGZyb20gXCIuLi9kZXRhaWwvZXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5LnRzXCI7XHJcbmltcG9ydCB7IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU1hbmFnZWRVc2VyU2NvcGUudHNcIjtcclxuXHJcbmNvbnN0IEtNX0dBU1RPX1RZUEVfQ09ERSA9IFwiM1wiO1xyXG5jb25zdCBGVUVMX1BSSUNFX0RFQk9VTkNFX01TID0gMzAwO1xyXG5jb25zdCBGVUVMX1BSSUNFX1NPVVJDRV9VU0VSX0NPTkZJRyA9IFwiQ1JNSG9qYUdhc3Rvc1VzZXJQcmljZUttRmVjaGFUYWJsZVwiO1xyXG5jb25zdCBGVUVMX1BSSUNFX1NPVVJDRV9HTE9CQUxfQ09ORklHID0gXCJDUk1QYXJhbWV0ZXJzXCI7XHJcbmNvbnN0IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkVEID0gMjtcclxuY29uc3QgRVhQRU5TRV9TVEFUVVNfUEFJRCA9IDQ7XHJcblxyXG5jb25zdCB0b0lucHV0RGF0ZSA9IChyYXc/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcclxuICByZXR1cm4gcGFyc2VkID8gdG9Jc29EYXRlKHBhcnNlZCkgOiBcIlwiO1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0RWRpdGFibGVOdW1iZXIgPSAodmFsdWU6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIodmFsdWUsIHtcclxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgZmFsbGJhY2s6IFwiXCIsXHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXRFZGl0YWJsZVF1YW50aXR5ID0gKHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKHZhbHVlLCB7XHJcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplRnVlbFRyYW5zRGF0ZSA9IChyYXc6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIHRvRXhwZW5zZUFwaURkTW1ZeXl5KHJhdyk7XHJcbn07XHJcblxyXG4vLyBSZXNvbHZlcyBsb2NhbGl6ZWQgZnVlbCBwcmljZSBzb3VyY2UgbWVzc2FnZXMgZm9yIGtub3duIGJhY2tlbmQgc291cmNlcy5cclxuY29uc3QgcmVzb2x2ZUZ1ZWxQcmljZVNvdXJjZU1lc3NhZ2UgPSAoc291cmNlOiBzdHJpbmcsIGVmZmVjdGl2ZURhdGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFNvdXJjZSA9IHNhZmVUZXh0KHNvdXJjZSk7XHJcbiAgaWYgKG5vcm1hbGl6ZWRTb3VyY2UgPT09IEZVRUxfUFJJQ0VfU09VUkNFX1VTRVJfQ09ORklHKSB7XHJcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfRnVlbFByaWNlX1NvdXJjZV9Vc2VyQ29uZmlnXCIsIFwiT2J0YWluZWQgYnkgdXNlciBjb25maWd1cmF0aW9uLlwiKTtcclxuICB9XHJcblxyXG4gIGlmIChub3JtYWxpemVkU291cmNlID09PSBGVUVMX1BSSUNFX1NPVVJDRV9HTE9CQUxfQ09ORklHKSB7XHJcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfRnVlbFByaWNlX1NvdXJjZV9HbG9iYWxDb25maWdcIiwgXCJPYnRhaW5lZCBieSBnbG9iYWwgY29uZmlndXJhdGlvbi5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzb3VyY2VMYWJlbCA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX0Z1ZWxQcmljZV9Tb3VyY2VcIiwgXCJGdWVsIHByaWNlIHNvdXJjZVwiKTtcclxuICBpZiAoIW5vcm1hbGl6ZWRTb3VyY2UpIHtcclxuICAgIHJldHVybiBlZmZlY3RpdmVEYXRlID8gYCR7c291cmNlTGFiZWx9OiAke2VmZmVjdGl2ZURhdGV9YCA6IHNvdXJjZUxhYmVsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGVmZmVjdGl2ZURhdGVcclxuICAgID8gYCR7c291cmNlTGFiZWx9OiAke25vcm1hbGl6ZWRTb3VyY2V9ICgke2VmZmVjdGl2ZURhdGV9KWBcclxuICAgIDogYCR7c291cmNlTGFiZWx9OiAke25vcm1hbGl6ZWRTb3VyY2V9YDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkQ3JlYXRlTGluZURyYWZ0ID0gKGJhc2VEYXRlOiBzdHJpbmcsIHByb2plY3RJZDogc3RyaW5nKTogRXhwZW5zZVNoZWV0TGluZSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGxpbmVSZWNJZDogXCJcIixcclxuICAgIHRyYW5zRGF0ZTogYmFzZURhdGUsXHJcbiAgICB0eXBlVmFsdWU6IFwiXCIsXHJcbiAgICB0eXBlVmFsdWVDb2RlOiBcIlwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiXCIsXHJcbiAgICBpbnRlcm5hY2lvbmFsOiBmYWxzZSxcclxuICAgIHRpY2tldDogZmFsc2UsXHJcbiAgICBwcmljZTogbnVsbCxcclxuICAgIHF0eTogMSxcclxuICAgIGFtb3VudDogbnVsbCxcclxuICAgIHByb2pJZDogcHJvamVjdElkLFxyXG4gICAgaW5kQXR0YWNoRmlsZXM6IFwiXCIsXHJcbiAgfTtcclxufTtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFN0YXRlQXJncyA9IHtcclxuICBoYXNBY2Nlc3M6IGJvb2xlYW47XHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcclxuICBjYW5NYW5hZ2VPdGhlclVzZXJzOiBib29sZWFuO1xyXG4gIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nO1xyXG4gIGN1cnJlbnRDcm1Vc2VySWQ6IHN0cmluZztcclxuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQ6IHN0cmluZztcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgbGluZUlkOiBzdHJpbmc7XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIHN0YXJ0SW5FZGl0TW9kZTogYm9vbGVhbjtcclxuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIE93bnMgc3RhdGUgYW5kIGJlaGF2aW9yIGZvciBleHBlbnNlIGxpbmUgZGV0YWlsIHBhZ2UgKHJlYWQsIGVkaXQsIGNyZWF0ZSkuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGUgPSAoe1xyXG4gIGhhc0FjY2VzcyxcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgY3VycmVudEF4VXNlcklkLFxyXG4gIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gIHNoZWV0SWQsXHJcbiAgbGluZUlkLFxyXG4gIGlzQ3JlYXRlTW9kZSxcclxuICBzdGFydEluRWRpdE1vZGUsXHJcbiAgb25Gb3JiaWRkZW4sXHJcbn06IFVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZUFyZ3MpID0+IHtcclxuICBjb25zdCBbaGVhZGVyLCBzZXRIZWFkZXJdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0SGVhZGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2xpbmUsIHNldExpbmVdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0TGluZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2lzRWRpdGluZywgc2V0SXNFZGl0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbW9kYWxFcnJvciwgc2V0TW9kYWxFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnREZXNjcmlwdGlvbiwgc2V0RHJhZnREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRUcmFuc0RhdGUsIHNldERyYWZ0VHJhbnNEYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdFR5cGVWYWx1ZUNvZGUsIHNldERyYWZ0VHlwZVZhbHVlQ29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRQcmljZSwgc2V0RHJhZnRQcmljZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRRdHksIHNldERyYWZ0UXR5XSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdFByb2plY3RJZCwgc2V0RHJhZnRQcm9qZWN0SWRdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0SW50ZXJuYXRpb25hbCwgc2V0RHJhZnRJbnRlcm5hdGlvbmFsXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtpc0Z1ZWxQcmljZUxvYWRpbmcsIHNldElzRnVlbFByaWNlTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Z1ZWxQcmljZU1lc3NhZ2UsIHNldEZ1ZWxQcmljZU1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2Z1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yLCBzZXRGdWVsUHJpY2VNZXNzYWdlSXNFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGh5ZHJhdGVEcmFmdEZyb21MaW5lID0gdXNlQ2FsbGJhY2soKG5leHRMaW5lOiBFeHBlbnNlU2hlZXRMaW5lIHwgbnVsbCwgbmV4dEhlYWRlcjogRXhwZW5zZVNoZWV0SGVhZGVyIHwgbnVsbCkgPT4ge1xyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbihzYWZlVGV4dChuZXh0TGluZT8uZGVzY3JpcHRpb24pKTtcclxuICAgIHNldERyYWZ0VHJhbnNEYXRlKHRvSW5wdXREYXRlKG5leHRMaW5lPy50cmFuc0RhdGUgfHwgbmV4dEhlYWRlcj8uY3JlYXRlZERhdGUpKTtcclxuICAgIHNldERyYWZ0VHlwZVZhbHVlQ29kZShzYWZlVGV4dChuZXh0TGluZT8udHlwZVZhbHVlQ29kZSkpO1xyXG4gICAgc2V0RHJhZnRQcmljZShmb3JtYXRFZGl0YWJsZU51bWJlcihuZXh0TGluZT8ucHJpY2UpKTtcclxuICAgIHNldERyYWZ0UXR5KGZvcm1hdEVkaXRhYmxlUXVhbnRpdHkobmV4dExpbmU/LnF0eSkpO1xyXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQoc2FmZVRleHQobmV4dExpbmU/LnByb2pJZCB8fCBuZXh0SGVhZGVyPy5wcm9qSWQpKTtcclxuICAgIHNldERyYWZ0SW50ZXJuYXRpb25hbChuZXh0TGluZT8uaW50ZXJuYWNpb25hbCA9PT0gdHJ1ZSA/IFwidHJ1ZVwiIDogbmV4dExpbmU/LmludGVybmFjaW9uYWwgPT09IGZhbHNlID8gXCJmYWxzZVwiIDogXCJcIik7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgbG9hZERldGFpbCA9IGFzeW5jICgpID0+IHtcclxuICAgICAgaWYgKCFoYXNBY2Nlc3MpIHtcclxuICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFzaGVldElkKSB7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCBsaW5lIHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKHNoZWV0SWQsIHtcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZT8uTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBsaW5lIGRldGFpbC5cIikpO1xyXG4gICAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBzaGVldHMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xyXG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRTaGVldCA9XHJcbiAgICAgICAgICAgIHNoZWV0cy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnk/LkhvamFHYXN0b3NJZCkudG9VcHBlckNhc2UoKSA9PT0gc2hlZXRJZC50cmltKCkudG9VcHBlckNhc2UoKSkgfHwgc2hlZXRzWzBdO1xyXG5cclxuICAgICAgICAgIGlmICghc2VsZWN0ZWRTaGVldCkge1xyXG4gICAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IGxpbmUgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBsb2FkZWRIZWFkZXIgPSBtYXBFeHBlbnNlU2hlZXRIZWFkZXIoc2VsZWN0ZWRTaGVldCk7XHJcbiAgICAgICAgICBjb25zdCBsb2FkZWRTdGF0dXNDb2RlID0gdHlwZW9mIGxvYWRlZEhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgPT09IFwibnVtYmVyXCIgPyBsb2FkZWRIZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzIDogbnVsbDtcclxuICAgICAgICAgIGNvbnN0IGlzQ3JlYXRlTG9ja2VkU3RhdHVzID0gbG9hZGVkU3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfQVBQUk9WRUQgfHwgbG9hZGVkU3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfUEFJRDtcclxuICAgICAgICAgIGNvbnN0IGlzTWFuYWdpbmdPdGhlclVzZXIgPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkKHtcclxuICAgICAgICAgICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgICAgICAgICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgICAgICAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgICAgICAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICAgICAgICAgIHJlY29yZE93bmVyVXNlcklkOiBsb2FkZWRIZWFkZXIudXNlcklkLFxyXG4gICAgICAgICAgICBpc0NyZWF0ZU1vZGU6IGZhbHNlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBjb25zdCBsb2FkZWRQb2xpY3kgPSByZXNvbHZlRXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5KHtcclxuICAgICAgICAgICAgc3RhdHVzQ29kZTogbG9hZGVkU3RhdHVzQ29kZSxcclxuICAgICAgICAgICAgaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgICAgICAgICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgICAgICAgICAgaXNQYWlkOiBpc0NyZWF0ZUxvY2tlZFN0YXR1cyB8fCBoYXNBc3NpZ25lZFZvdWNoZXIobG9hZGVkSGVhZGVyLnZvdWNoZXIpLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBpZiAoaXNDcmVhdGVMb2NrZWRTdGF0dXMgfHwgaGFzQXNzaWduZWRWb3VjaGVyKGxvYWRlZEhlYWRlci52b3VjaGVyKSkge1xyXG4gICAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1BhaWRSZWFkT25seVwiLCBcIlBhaWQgZXhwZW5zZSBzaGVldHMgYXJlIHJlYWQtb25seS5cIikpO1xyXG4gICAgICAgICAgICBzZXRIZWFkZXIobG9hZGVkSGVhZGVyKTtcclxuICAgICAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGxvYWRlZFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgIT09IFwiZnVsbF9lZGl0XCIpIHtcclxuICAgICAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IGRyYWZ0TGluZSA9IGJ1aWxkQ3JlYXRlTGluZURyYWZ0KHRvSXNvRGF0ZShuZXcgRGF0ZSgpKSwgc2FmZVRleHQobG9hZGVkSGVhZGVyLnByb2pJZCkpO1xyXG4gICAgICAgICAgc2V0SGVhZGVyKGxvYWRlZEhlYWRlcik7XHJcbiAgICAgICAgICBzZXRMaW5lKGRyYWZ0TGluZSk7XHJcbiAgICAgICAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XHJcbiAgICAgICAgICBoeWRyYXRlRHJhZnRGcm9tTGluZShkcmFmdExpbmUsIGxvYWRlZEhlYWRlcik7XHJcbiAgICAgICAgICBzZXRTdGF0dXMoXCJcIik7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWxpbmVJZCkge1xyXG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCBsaW5lIHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKHNoZWV0SWQsIHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgbGluZSBkZXRhaWwuXCIpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzaGVldHMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkU2hlZXQgPVxyXG4gICAgICAgICAgc2hlZXRzLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uSG9qYUdhc3Rvc0lkKS50b1VwcGVyQ2FzZSgpID09PSBzaGVldElkLnRyaW0oKS50b1VwcGVyQ2FzZSgpKSB8fCBzaGVldHNbMF07XHJcblxyXG4gICAgICAgIGlmICghc2VsZWN0ZWRTaGVldCkge1xyXG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCBsaW5lIHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtYXBwZWRIZWFkZXIgPSBtYXBFeHBlbnNlU2hlZXRIZWFkZXIoc2VsZWN0ZWRTaGVldCk7XHJcbiAgICAgICAgY29uc3QgbWFwcGVkTGluZXMgPSAoQXJyYXkuaXNBcnJheShzZWxlY3RlZFNoZWV0LkxpbmVzKSA/IHNlbGVjdGVkU2hlZXQuTGluZXMgOiBbXSkubWFwKChlbnRyeSkgPT5cclxuICAgICAgICAgIG1hcEV4cGVuc2VTaGVldExpbmUoZW50cnkpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZExpbmUgPVxyXG4gICAgICAgICAgbWFwcGVkTGluZXMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5LmxpbmVSZWNJZCkudG9VcHBlckNhc2UoKSA9PT0gbGluZUlkLnRyaW0oKS50b1VwcGVyQ2FzZSgpKSB8fCBudWxsO1xyXG5cclxuICAgICAgICBpZiAoIXNlbGVjdGVkTGluZSkge1xyXG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCBsaW5lIHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihtYXBwZWRIZWFkZXIpO1xyXG4gICAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEhlYWRlcihtYXBwZWRIZWFkZXIpO1xyXG4gICAgICAgIHNldExpbmUoc2VsZWN0ZWRMaW5lKTtcclxuICAgICAgICBjb25zdCBsb2FkZWRTdGF0dXNDb2RlID0gdHlwZW9mIG1hcHBlZEhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgPT09IFwibnVtYmVyXCIgPyBtYXBwZWRIZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzIDogbnVsbDtcbiAgICAgICAgY29uc3QgbG9hZGVkSXNTaGVldEFwcHJvdmVkID0gbG9hZGVkU3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfQVBQUk9WRUQ7XG4gICAgICAgIGNvbnN0IGxvYWRlZElzU2hlZXRQYWlkQnlTdGF0dXMgPSBsb2FkZWRTdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19QQUlEO1xuICAgICAgICBjb25zdCBsb2FkZWRJc1NoZWV0UGFpZCA9IGxvYWRlZElzU2hlZXRQYWlkQnlTdGF0dXMgfHwgaGFzQXNzaWduZWRWb3VjaGVyKG1hcHBlZEhlYWRlci52b3VjaGVyKTtcbiAgICAgICAgY29uc3QgbG9hZGVkSGFzTGlua2VkVGlja2V0ID0gISFzYWZlVGV4dChzZWxlY3RlZExpbmUuZmlsZUlkKTtcbiAgICAgICAgY29uc3QgbG9hZGVkSXNNYW5hZ2luZ090aGVyVXNlciA9IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQoe1xuICAgICAgICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gICAgICAgICAgY3VycmVudEF4VXNlcklkLFxuICAgICAgICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgICAgICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgICAgICAgIHJlY29yZE93bmVyVXNlcklkOiBtYXBwZWRIZWFkZXIudXNlcklkLFxyXG4gICAgICAgICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGxvYWRlZFBvbGljeSA9IHJlc29sdmVFeHBlbnNlU2hlZXREZXRhaWxQb2xpY3koe1xyXG4gICAgICAgICAgc3RhdHVzQ29kZTogbG9hZGVkU3RhdHVzQ29kZSxcclxuICAgICAgICAgIGlzTWFuYWdpbmdPdGhlclVzZXI6IGxvYWRlZElzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICAgICAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgICAgICAgaXNQYWlkOiBsb2FkZWRJc1NoZWV0UGFpZCxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHN0YXJ0SW5FZGl0TW9kZSAmJlxuICAgICAgICAgICFsb2FkZWRJc1NoZWV0QXBwcm92ZWQgJiZcbiAgICAgICAgICAhbG9hZGVkSXNTaGVldFBhaWQgJiZcbiAgICAgICAgICAhbG9hZGVkSGFzTGlua2VkVGlja2V0ICYmXG4gICAgICAgICAgIWxvYWRlZElzTWFuYWdpbmdPdGhlclVzZXIgJiZcbiAgICAgICAgICBsb2FkZWRQb2xpY3kuaW50ZXJhY3Rpb25Nb2RlID09PSBcImZ1bGxfZWRpdFwiXG4gICAgICAgICkge1xuICAgICAgICAgIHNldElzRWRpdGluZyh0cnVlKTtcbiAgICAgICAgICBoeWRyYXRlRHJhZnRGcm9tTGluZShzZWxlY3RlZExpbmUsIG1hcHBlZEhlYWRlcik7XG4gICAgICAgICAgc2V0U3RhdHVzKFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgbGluZSBkZXRhaWwuXCIpKTtcclxuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZvaWQgbG9hZERldGFpbCgpO1xyXG4gIH0sIFtcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIGhhc0FjY2VzcyxcclxuICAgIGh5ZHJhdGVEcmFmdEZyb21MaW5lLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgc3RhcnRJbkVkaXRNb2RlLFxyXG4gICAgbGluZUlkLFxyXG4gICAgb25Gb3JiaWRkZW4sXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICBzaGVldElkLFxyXG4gIF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFsaW5lIHx8IGlzRWRpdGluZykgcmV0dXJuO1xyXG4gICAgaHlkcmF0ZURyYWZ0RnJvbUxpbmUobGluZSwgaGVhZGVyKTtcclxuICB9LCBbaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tTGluZSwgaXNFZGl0aW5nLCBsaW5lXSk7XHJcblxyXG4gIGNvbnN0IG5vcm1hbGl6ZWREcmFmdFR5cGVWYWx1ZUNvZGUgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KGRyYWZ0VHlwZVZhbHVlQ29kZSksIFtkcmFmdFR5cGVWYWx1ZUNvZGVdKTtcclxuICBjb25zdCBub3JtYWxpemVkRnVlbFRyYW5zRGF0ZSA9IHVzZU1lbW8oKCkgPT4gbm9ybWFsaXplRnVlbFRyYW5zRGF0ZShkcmFmdFRyYW5zRGF0ZSksIFtkcmFmdFRyYW5zRGF0ZV0pO1xyXG4gIGNvbnN0IGlzS21UeXBlID0gbm9ybWFsaXplZERyYWZ0VHlwZVZhbHVlQ29kZSA9PT0gS01fR0FTVE9fVFlQRV9DT0RFO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbGV0IGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICBsZXQgdGltZXI6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbCA9IG51bGw7XHJcbiAgICBsZXQgY29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgY29uc3QgY2xlYXJQZW5kaW5nID0gKCkgPT4ge1xyXG4gICAgICBpZiAodGltZXIpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gICAgICAgIHRpbWVyID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29udHJvbGxlcikge1xyXG4gICAgICAgIGNvbnRyb2xsZXIuYWJvcnQoKTtcclxuICAgICAgICBjb250cm9sbGVyID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoIWlzRWRpdGluZyB8fCAhaXNLbVR5cGUpIHtcclxuICAgICAgc2V0SXNGdWVsUHJpY2VMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNsZWFyUGVuZGluZygpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghbm9ybWFsaXplZEZ1ZWxUcmFuc0RhdGUpIHtcclxuICAgICAgc2V0SXNGdWVsUHJpY2VMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZShFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XHJcbiAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgY2xlYXJQZW5kaW5nKCk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcclxuICAgICAgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuICAgICAgc2V0SXNGdWVsUHJpY2VMb2FkaW5nKHRydWUpO1xyXG4gICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlKFwiXCIpO1xyXG4gICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlSXNFcnJvcihmYWxzZSk7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ2V0RnVlbFByaWNlS20obm9ybWFsaXplZEZ1ZWxUcmFuc0RhdGUsIHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2VzcyB8fCAhcmVzcG9uc2UuRGF0YSB8fCAhTnVtYmVyLmlzRmluaXRlKE51bWJlcihyZXNwb25zZS5EYXRhLlByaWNlS20pKSkge1xyXG4gICAgICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZShcclxuICAgICAgICAgICAgc2FmZVRleHQocmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRnVlbFByaWNlX05vdEZvdW5kXCIsIFwiQ291bGQgbm90IGxvYWQgZnVlbCBwcmljZSBmb3Iga20uXCIpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZXNvbHZlZFByaWNlID0gTnVtYmVyKHJlc3BvbnNlLkRhdGEuUHJpY2VLbSk7XHJcbiAgICAgICAgaWYgKHJlc29sdmVkUHJpY2UgPiAwKSB7XHJcbiAgICAgICAgICBzZXREcmFmdFByaWNlKGZvcm1hdEVkaXRhYmxlTnVtYmVyKHJlc29sdmVkUHJpY2UpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGEuU291cmNlKTtcclxuICAgICAgICBjb25zdCBlZmZlY3RpdmVEYXRlID0gc2FmZVRleHQocmVzcG9uc2UuRGF0YS5UcmFuc0RhdGUpIHx8IG5vcm1hbGl6ZWRGdWVsVHJhbnNEYXRlO1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSByZXNvbHZlRnVlbFByaWNlU291cmNlTWVzc2FnZShzb3VyY2UsIGVmZmVjdGl2ZURhdGUpO1xyXG4gICAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikgcmV0dXJuO1xyXG5cclxuICAgICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlKFxyXG4gICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBFcnJvclxyXG4gICAgICAgICAgICA/IGVycm9yLm1lc3NhZ2VcclxuICAgICAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GdWVsUHJpY2VfTm90Rm91bmRcIiwgXCJDb3VsZCBub3QgbG9hZCBmdWVsIHByaWNlIGZvciBrbS5cIilcclxuICAgICAgICApO1xyXG4gICAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIGlmICghaXNDYW5jZWxsZWQpIHtcclxuICAgICAgICAgIHNldElzRnVlbFByaWNlTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LCBGVUVMX1BSSUNFX0RFQk9VTkNFX01TKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpc0NhbmNlbGxlZCA9IHRydWU7XHJcbiAgICAgIGNsZWFyUGVuZGluZygpO1xyXG4gICAgfTtcclxuICB9LCBbaXNFZGl0aW5nLCBpc0ttVHlwZSwgbm9ybWFsaXplZEZ1ZWxUcmFuc0RhdGVdKTtcclxuXHJcbiAgY29uc3QgaGFzQWN0aXZlUHJvY2VzcyA9IHVzZU1lbW8oKCkgPT4gYnVzeSB8fCBpc0VkaXRpbmcsIFtidXN5LCBpc0VkaXRpbmddKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZChoYXNBY3RpdmVQcm9jZXNzKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCgpO1xyXG4gICAgfTtcclxuICB9LCBbaGFzQWN0aXZlUHJvY2Vzc10pO1xyXG5cclxuICBjb25zdCBzdGF0dXNDb2RlID0gdHlwZW9mIGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSBcIm51bWJlclwiID8gaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA6IG51bGw7XHJcbiAgY29uc3QgaXNTaGVldEFwcHJvdmVkID0gc3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfQVBQUk9WRUQ7XHJcbiAgY29uc3QgaXNTaGVldFBhaWRCeVN0YXR1cyA9IHN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX1BBSUQ7XHJcbiAgY29uc3QgaXNTaGVldFBhaWRCeVZvdWNoZXIgPSBoYXNBc3NpZ25lZFZvdWNoZXIoaGVhZGVyPy52b3VjaGVyKTtcclxuICBjb25zdCBpc1NoZWV0UGFpZCA9IGlzU2hlZXRQYWlkQnlTdGF0dXMgfHwgaXNTaGVldFBhaWRCeVZvdWNoZXI7XHJcbiAgY29uc3QgaXNNYW5hZ2luZ090aGVyVXNlciA9IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQoe1xyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICByZWNvcmRPd25lclVzZXJJZDogaGVhZGVyPy51c2VySWQsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgfSk7XHJcbiAgY29uc3QgZGV0YWlsUG9saWN5ID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBpZiAoIWhlYWRlcikge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGludGVyYWN0aW9uTW9kZTogXCJyZWFkX29ubHlcIiBhcyBjb25zdCxcclxuICAgICAgICBzaG93RmFiOiBmYWxzZSxcclxuICAgICAgICBjYW5EZWxldGVTaGVldDogZmFsc2UsXHJcbiAgICAgICAgc3RhdHVzQWN0aW9uczogW10sXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc29sdmVFeHBlbnNlU2hlZXREZXRhaWxQb2xpY3koe1xyXG4gICAgICBzdGF0dXNDb2RlLFxyXG4gICAgICBpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgICBpc1BhaWQ6IGlzU2hlZXRQYWlkLFxyXG4gICAgfSk7XHJcbiAgfSwgW2FsbG93U2VsZk1hbmFnZW1lbnQsIGhlYWRlciwgaXNNYW5hZ2luZ090aGVyVXNlciwgaXNTaGVldFBhaWQsIHN0YXR1c0NvZGVdKTtcclxuICBjb25zdCBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzID0gZGV0YWlsUG9saWN5LmludGVyYWN0aW9uTW9kZSA9PT0gXCJmdWxsX2VkaXRcIjtcclxuICBjb25zdCBjYW5DcmVhdGVFeHBlbnNlQ3VycmVudCA9IGNhblVzZUZ1bGxFZGl0RmVhdHVyZXM7XHJcbiAgY29uc3QgY2FuRWRpdEV4cGVuc2VDdXJyZW50ID0gY2FuVXNlRnVsbEVkaXRGZWF0dXJlcztcclxuICBjb25zdCBjYW5EZWxldGVFeHBlbnNlQ3VycmVudCA9IGNhblVzZUZ1bGxFZGl0RmVhdHVyZXM7XHJcbiAgY29uc3QgaXNTaGVldExvY2tlZCA9ICFjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzIHx8IGlzU2hlZXRBcHByb3ZlZCB8fCBpc1NoZWV0UGFpZDtcclxuICBjb25zdCBsaW5rZWRUaWNrZXRGaWxlSWQgPSBzYWZlVGV4dChsaW5lPy5maWxlSWQpO1xyXG4gIGNvbnN0IGhhc0xpbmtlZFRpY2tldCA9ICFpc0NyZWF0ZU1vZGUgJiYgISFsaW5rZWRUaWNrZXRGaWxlSWQ7XHJcbiAgY29uc3QgaXNMaW5lRWRpdExvY2tlZCA9IGlzU2hlZXRMb2NrZWQgfHwgaGFzTGlua2VkVGlja2V0O1xyXG4gIGNvbnN0IGlzTGluZURlbGV0ZUxvY2tlZCA9IGlzU2hlZXRMb2NrZWQ7XHJcbiAgY29uc3QgaXNMaW5lTG9ja2VkID0gaXNMaW5lRWRpdExvY2tlZDtcclxuXHJcbiAgY29uc3QgaGFuZGxlRW5hYmxlRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChpc0NyZWF0ZU1vZGUgfHwgaXNMb2FkaW5nIHx8ICFoZWFkZXIgfHwgIWxpbmUgfHwgaXNMaW5lRWRpdExvY2tlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjYW5FZGl0RXhwZW5zZUN1cnJlbnQpIHtcclxuICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XHJcbiAgICBoeWRyYXRlRHJhZnRGcm9tTGluZShsaW5lLCBoZWFkZXIpO1xyXG4gICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9FZGl0aW5nRW5hYmxlZFwiLCBcIkVkaXRpbmcgZW5hYmxlZFwiKSk7XHJcbiAgfSwgW2NhbkVkaXRFeHBlbnNlQ3VycmVudCwgaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tTGluZSwgaXNDcmVhdGVNb2RlLCBpc0xpbmVFZGl0TG9ja2VkLCBpc0xvYWRpbmcsIGxpbmUsIG9uRm9yYmlkZGVuXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNhbmNlbEVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNoZWV0SWQpfWA7XHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWlzRWRpdGluZykgcmV0dXJuO1xyXG5cclxuICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgaHlkcmF0ZURyYWZ0RnJvbUxpbmUobGluZSwgaGVhZGVyKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKSk7XHJcbiAgfSwgW2hlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUxpbmUsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nLCBsaW5lLCBzaGVldElkXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU9wZW5DcmVhdGVNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlQ3VycmVudCB8fCAhc2hlZXRJZCB8fCBpc1NoZWV0TG9ja2VkKSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXRMaW5lRGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzaGVldElkKX0mbW9kZT1jcmVhdGVgO1xyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsLCB7XHJcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxyXG4gICAgfSk7XHJcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2VDdXJyZW50LCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgaXNTaGVldExvY2tlZCwgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcclxuXHJcbiAgY29uc3QgbmF2aWdhdGVUb1NoZWV0RGV0YWlsID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChzaGVldElkKTtcclxuICAgIGlmICghc2FmZVNoZWV0SWQpIHJldHVybjtcclxuICAgIGNvbnN0IHRhcmdldFVybCA9IGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZVNoZWV0SWQpfWA7XHJcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwpO1xyXG4gIH0sIFtzaGVldElkXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoZWFkZXIsXHJcbiAgICBsaW5lLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgYnVzeSxcclxuICAgIHN0YXR1cyxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG1vZGFsRXJyb3IsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICBkcmFmdFR5cGVWYWx1ZUNvZGUsXHJcbiAgICBkcmFmdFByaWNlLFxyXG4gICAgZHJhZnRRdHksXHJcbiAgICBkcmFmdFByb2plY3RJZCxcclxuICAgIGRyYWZ0SW50ZXJuYXRpb25hbCxcclxuICAgIGlzS21UeXBlLFxyXG4gICAgaXNGdWVsUHJpY2VMb2FkaW5nLFxyXG4gICAgZnVlbFByaWNlTWVzc2FnZSxcclxuICAgIGZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yLFxyXG4gICAgaXNTaGVldFBhaWQsXHJcbiAgICBpc1NoZWV0TG9ja2VkLFxyXG4gICAgaXNMaW5lRWRpdExvY2tlZCxcclxuICAgIGlzTGluZURlbGV0ZUxvY2tlZCxcclxuICAgIGlzTGluZUxvY2tlZCxcclxuICAgIGhhc0xpbmtlZFRpY2tldCxcclxuICAgIGxpbmtlZFRpY2tldEZpbGVJZCxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2VDdXJyZW50LFxyXG4gICAgY2FuRWRpdEV4cGVuc2VDdXJyZW50LFxyXG4gICAgY2FuRGVsZXRlRXhwZW5zZUN1cnJlbnQsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBzZXREcmFmdFRyYW5zRGF0ZSxcclxuICAgIHNldERyYWZ0VHlwZVZhbHVlQ29kZSxcclxuICAgIHNldERyYWZ0UHJpY2UsXHJcbiAgICBzZXREcmFmdFF0eSxcclxuICAgIHNldERyYWZ0UHJvamVjdElkLFxyXG4gICAgc2V0RHJhZnRJbnRlcm5hdGlvbmFsLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVPcGVuQ3JlYXRlTW9kZSxcclxuICAgIG5hdmlnYXRlVG9TaGVldERldGFpbCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgbWFwRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB9IGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcbmltcG9ydCB7IGhhc0V4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdTb3VyY2UgfSBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvZXhwZW5zZVRpY2tldFByZXZpZXdVdGlscy50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldyB9IGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVNoZWV0TGluZVRpY2tldFByZXZpZXdBcmdzID0ge1xuICBsaW5rZWRUaWNrZXRGaWxlSWQ6IHN0cmluZztcbiAgaGFzTGlua2VkVGlja2V0OiBib29sZWFuO1xufTtcblxuLy8gUGlja3MgdGhlIGxpbmtlZCB0aWNrZXQgZGV0YWlsIGl0ZW0gbmVlZGVkIHRvIHJlbmRlciB0aGUgZXhpc3RpbmcgcHJldmlldyBzYWZlbHkgZnJvbSB0aGUgbGluZSBwYWdlLlxuY29uc3QgcmVzb2x2ZUxpbmtlZFRpY2tldFByZXZpZXdNZXRhZGF0YSA9IChpdGVtczogdW5rbm93bltdLCBsaW5rZWRUaWNrZXRGaWxlSWQ6IHN0cmluZykgPT4ge1xuICBjb25zdCBzYWZlTGlua2VkVGlja2V0RmlsZUlkID0gc2FmZVRleHQobGlua2VkVGlja2V0RmlsZUlkKTtcbiAgaWYgKCFzYWZlTGlua2VkVGlja2V0RmlsZUlkIHx8ICFBcnJheS5pc0FycmF5KGl0ZW1zKSB8fCBpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZU5hbWU6IFwiXCIsXG4gICAgICBzb3VyY2VVcmw6IFwiXCIsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHNlbGVjdGVkSXRlbSA9XG4gICAgaXRlbXMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KChlbnRyeSBhcyB7IEZpbGVJZD86IHVua25vd24gfSk/LkZpbGVJZCkudG9VcHBlckNhc2UoKSA9PT0gc2FmZUxpbmtlZFRpY2tldEZpbGVJZC50b1VwcGVyQ2FzZSgpKSB8fFxuICAgIGl0ZW1zWzBdO1xuICBpZiAoIXNlbGVjdGVkSXRlbSB8fCB0eXBlb2Ygc2VsZWN0ZWRJdGVtICE9PSBcIm9iamVjdFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZpbGVOYW1lOiBcIlwiLFxuICAgICAgc291cmNlVXJsOiBcIlwiLFxuICAgIH07XG4gIH1cblxuICBjb25zdCBtYXBwZWRIZWFkZXIgPSBtYXBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyKHNlbGVjdGVkSXRlbSBhcyBQYXJhbWV0ZXJzPHR5cGVvZiBtYXBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyPlswXSk7XG4gIHJldHVybiB7XG4gICAgZmlsZU5hbWU6IHNhZmVUZXh0KG1hcHBlZEhlYWRlci5maWxlTmFtZSksXG4gICAgc291cmNlVXJsOiBzYWZlVGV4dChtYXBwZWRIZWFkZXIudXJsRmlsZSksXG4gIH07XG59O1xuXG4vLyBMb2FkcyBsaW5rZWQgdGlja2V0IHByZXZpZXcgbWV0YWRhdGEgd2l0aG91dCBjaGFuZ2luZyB0aGUgZXhpc3Rpbmcgc2hlZXQtbGluZSBkZXRhaWwgY29udHJhY3QuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0TGluZVRpY2tldFByZXZpZXcgPSAoe1xuICBsaW5rZWRUaWNrZXRGaWxlSWQsXG4gIGhhc0xpbmtlZFRpY2tldCxcbn06IFVzZUV4cGVuc2VTaGVldExpbmVUaWNrZXRQcmV2aWV3QXJncykgPT4ge1xuICBjb25zdCBbcHJldmlld1NvdXJjZVVybCwgc2V0UHJldmlld1NvdXJjZVVybF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3ByZXZpZXdGaWxlTmFtZSwgc2V0UHJldmlld0ZpbGVOYW1lXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFoYXNMaW5rZWRUaWNrZXQgfHwgIXNhZmVUZXh0KGxpbmtlZFRpY2tldEZpbGVJZCkpIHtcbiAgICAgIHNldFByZXZpZXdTb3VyY2VVcmwoXCJcIik7XG4gICAgICBzZXRQcmV2aWV3RmlsZU5hbWUoXCJcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgICBjb25zdCBsb2FkVGlja2V0UHJldmlld01ldGFkYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgICAgc2V0UHJldmlld1NvdXJjZVVybChcIlwiKTtcbiAgICAgIHNldFByZXZpZXdGaWxlTmFtZShcIlwiKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldChsaW5rZWRUaWNrZXRGaWxlSWQsIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoY2FuY2VsbGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0gcmVzb2x2ZUxpbmtlZFRpY2tldFByZXZpZXdNZXRhZGF0YShyZXNwb25zZT8uSXRlbXMgfHwgW10sIGxpbmtlZFRpY2tldEZpbGVJZCk7XG4gICAgICAgIHNldFByZXZpZXdTb3VyY2VVcmwobWV0YWRhdGEuc291cmNlVXJsKTtcbiAgICAgICAgc2V0UHJldmlld0ZpbGVOYW1lKG1ldGFkYXRhLmZpbGVOYW1lKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChjYW5jZWxsZWQgfHwgKGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB2b2lkIGxvYWRUaWNrZXRQcmV2aWV3TWV0YWRhdGEoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xuICAgIH07XG4gIH0sIFtoYXNMaW5rZWRUaWNrZXQsIGxpbmtlZFRpY2tldEZpbGVJZF0pO1xuXG4gIGNvbnN0IHNob3dTdGlja3lQcmV2aWV3ID0gdXNlTWVtbyhcbiAgICAoKSA9PiBoYXNMaW5rZWRUaWNrZXQgJiYgaGFzRXhwZW5zZVRpY2tldEltYWdlUHJldmlld1NvdXJjZShwcmV2aWV3U291cmNlVXJsKSxcbiAgICBbaGFzTGlua2VkVGlja2V0LCBwcmV2aWV3U291cmNlVXJsXVxuICApO1xuICBjb25zdCBwcmV2aWV3QWx0VGV4dCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gc2FmZVRleHQocHJldmlld0ZpbGVOYW1lKSB8fCBpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIiksXG4gICAgW3ByZXZpZXdGaWxlTmFtZV1cbiAgKTtcbiAgY29uc3QgcHJldmlldyA9IHVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcoe1xuICAgIGZpbGVJZDogbGlua2VkVGlja2V0RmlsZUlkLFxuICAgIHNvdXJjZVVybDogcHJldmlld1NvdXJjZVVybCxcbiAgICBlbmFibGVkOiBzaG93U3RpY2t5UHJldmlldyxcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBzaG93U3RpY2t5UHJldmlldyxcbiAgICBwcmV2aWV3RmlsZU5hbWUsXG4gICAgcHJldmlld0FsdFRleHQsXG4gICAgLi4ucHJldmlldyxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBSZWZPYmplY3QsIFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3hcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWwgZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL0V4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWwudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXcgZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL0V4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3LnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBUaWNrZXRQcmV2aWV3UG9pbnQgfSBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldy50c1wiO1xuXG50eXBlIEV4cGVuc2VTaGVldExpbmVEZXRhaWxWaWV3UHJvcHMgPSB7XG4gIG1vZGFsOiB7XG4gICAgb3BlbjogYm9vbGVhbjtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBjb25maXJtVGV4dDogc3RyaW5nO1xuICAgIGNhbmNlbFRleHQ6IHN0cmluZztcbiAgICBsb2FkaW5nVGV4dDogc3RyaW5nO1xuICAgIHNob3dDYW5jZWw6IGJvb2xlYW47XG4gICAgc2hvd0NvbmZpcm06IGJvb2xlYW47XG4gICAgYnVzeTogYm9vbGVhbjtcbiAgICBlcnJvcjogc3RyaW5nO1xuICAgIHN0YXR1czogc3RyaW5nO1xuICAgIG9uQ29uZmlybTogKCkgPT4gdm9pZDtcbiAgICBvbkNhbmNlbDogKCkgPT4gdm9pZDtcbiAgfTtcbiAgcHJldmlldzoge1xuICAgIG9wZW46IGJvb2xlYW47XG4gICAgYnVzeTogYm9vbGVhbjtcbiAgICBlcnJvcjogc3RyaW5nO1xuICAgIGltYWdlVXJsOiBzdHJpbmc7XG4gICAgaW1hZ2VBbHQ6IHN0cmluZztcbiAgICBmaWxlTmFtZTogc3RyaW5nO1xuICAgIHNjYWxlOiBudW1iZXI7XG4gICAgdHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQ7XG4gICAgc3VyZmFjZVJlZjogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG4gICAgc2hvd1N0aWNreVByZXZpZXc6IGJvb2xlYW47XG4gICAgb25PcGVuOiAoKSA9PiB2b2lkO1xuICAgIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gICAgb25Qb2ludGVyRG93bjogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xuICAgIG9uUG9pbnRlck1vdmU6IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcbiAgICBvblBvaW50ZXJFbmQ6IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcbiAgICBvbldoZWVsOiAoZXZlbnQ6IFJlYWN0LldoZWVsRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xuICB9O1xuICBjb250ZW50OiB7XG4gICAgaXNMb2FkaW5nOiBib29sZWFuO1xuICAgIGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZTogYm9vbGVhbjtcbiAgICBlcnJvck1lc3NhZ2U6IHN0cmluZztcbiAgICBkZXRhaWxCb2R5OiBSZWFjdE5vZGU7XG4gIH07XG59O1xuXG4vLyBSZW5kZXJzIHRoZSBsaW5lIGRldGFpbCBzaGVsbCB3aGlsZSB0aGUgcGFnZSBjb250YWluZXIga2VlcHMgb3duZXJzaGlwIG9mIG9yY2hlc3RyYXRpb24gYW5kIG11dGF0aW9ucy5cbmNvbnN0IEV4cGVuc2VTaGVldExpbmVEZXRhaWxWaWV3ID0gKHsgbW9kYWwsIHByZXZpZXcsIGNvbnRlbnQgfTogRXhwZW5zZVNoZWV0TGluZURldGFpbFZpZXdQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICA8Q29uZmlybU1vZGFsXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsLmNvbmZpcm1UZXh0fVxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbC5jYW5jZWxUZXh0fVxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWwubG9hZGluZ1RleHR9XG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cbiAgICAgICAgYnVzeT17bW9kYWwuYnVzeX1cbiAgICAgICAgZXJyb3I9e21vZGFsLmVycm9yfVxuICAgICAgICBzdGF0dXM9e21vZGFsLnN0YXR1c31cbiAgICAgICAgb25Db25maXJtPXttb2RhbC5vbkNvbmZpcm19XG4gICAgICAgIG9uQ2FuY2VsPXttb2RhbC5vbkNhbmNlbH1cbiAgICAgIC8+XG4gICAgICA8RXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbFxuICAgICAgICBvcGVuPXtwcmV2aWV3Lm9wZW59XG4gICAgICAgIGJ1c3k9e3ByZXZpZXcuYnVzeX1cbiAgICAgICAgZXJyb3I9e3ByZXZpZXcuZXJyb3J9XG4gICAgICAgIGltYWdlVXJsPXtwcmV2aWV3LmltYWdlVXJsfVxuICAgICAgICBpbWFnZUFsdD17cHJldmlldy5pbWFnZUFsdH1cbiAgICAgICAgc2NhbGU9e3ByZXZpZXcuc2NhbGV9XG4gICAgICAgIHRyYW5zbGF0ZT17cHJldmlldy50cmFuc2xhdGV9XG4gICAgICAgIHN1cmZhY2VSZWY9e3ByZXZpZXcuc3VyZmFjZVJlZn1cbiAgICAgICAgb25DbG9zZT17cHJldmlldy5vbkNsb3NlfVxuICAgICAgICBvblBvaW50ZXJEb3duPXtwcmV2aWV3Lm9uUG9pbnRlckRvd259XG4gICAgICAgIG9uUG9pbnRlck1vdmU9e3ByZXZpZXcub25Qb2ludGVyTW92ZX1cbiAgICAgICAgb25Qb2ludGVyRW5kPXtwcmV2aWV3Lm9uUG9pbnRlckVuZH1cbiAgICAgICAgb25XaGVlbD17cHJldmlldy5vbldoZWVsfVxuICAgICAgLz5cblxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBjb250ZW50LmlzTG9hZGluZyB8fCBjb250ZW50LmlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cbiAgICAgID5cbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cbiAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtjb250ZW50LmVycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57Y29udGVudC5lcnJvck1lc3NhZ2V9PC9kaXY+IDogbnVsbH1cblxuICAgICAge2NvbnRlbnQuZGV0YWlsQm9keSA/IChcbiAgICAgICAgcHJldmlldy5zaG93U3RpY2t5UHJldmlldyA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBsZzpncmlkIGxnOmdyaWQtY29scy1bbWlubWF4KDAsMWZyKV8zMjBweF0gbGc6Z2FwLTQgbGc6c3BhY2UteS0wXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zdGFydC0yXCI+XG4gICAgICAgICAgICAgIDxFeHBlbnNlVGlja2V0U3RpY2t5UHJldmlld1xuICAgICAgICAgICAgICAgIGJ1c3k9e3ByZXZpZXcuYnVzeX1cbiAgICAgICAgICAgICAgICBlcnJvcj17cHJldmlldy5lcnJvcn1cbiAgICAgICAgICAgICAgICBpbWFnZVVybD17cHJldmlldy5pbWFnZVVybH1cbiAgICAgICAgICAgICAgICBpbWFnZUFsdD17cHJldmlldy5pbWFnZUFsdH1cbiAgICAgICAgICAgICAgICBmaWxlTmFtZT17cHJldmlldy5maWxlTmFtZX1cbiAgICAgICAgICAgICAgICBvbk9wZW49e3ByZXZpZXcub25PcGVufVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBsZzpjb2wtc3RhcnQtMSBsZzpyb3ctc3RhcnQtMVwiPntjb250ZW50LmRldGFpbEJvZHl9PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgY29udGVudC5kZXRhaWxCb2R5XG4gICAgICAgIClcbiAgICAgICkgOiBudWxsfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0TGluZURldGFpbFZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgcGFyc2VEZWNpbWFsSW5wdXQgfSBmcm9tIFwiLi4vaG9va3MvZXhwZW5zZU11dGF0aW9uVXRpbHMudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVNoZWV0TGluZVR5cGVWYWxpZGF0aW9uQXJncyA9IHtcclxuICBkcmFmdFR5cGVWYWx1ZUNvZGU6IHN0cmluZztcclxuICBkcmFmdFByaWNlOiBzdHJpbmc7XHJcbiAgZHJhZnRRdHk6IHN0cmluZztcclxuICBzZXREcmFmdFR5cGVWYWx1ZUNvZGU6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldERyYWZ0UHJpY2U6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldERyYWZ0UXR5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxufTtcclxuXHJcbi8vIEtlZXBzIGxpbmUgc2F2ZSB2YWxpZGF0aW9uIGxvY2FsIHNvIHNhdmUgZmxvdyBjYW4gYmxvY2sgYmVmb3JlIG9wZW5pbmcgdGhlIG1vZGFsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0TGluZVR5cGVWYWxpZGF0aW9uID0gKHtcclxuICBkcmFmdFR5cGVWYWx1ZUNvZGUsXHJcbiAgZHJhZnRQcmljZSxcclxuICBkcmFmdFF0eSxcclxuICBzZXREcmFmdFR5cGVWYWx1ZUNvZGUsXHJcbiAgc2V0RHJhZnRQcmljZSxcclxuICBzZXREcmFmdFF0eSxcclxufTogVXNlRXhwZW5zZVNoZWV0TGluZVR5cGVWYWxpZGF0aW9uQXJncykgPT4ge1xyXG4gIGNvbnN0IFt0eXBlSW52YWxpZCwgc2V0VHlwZUludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtwcmljZUludmFsaWQsIHNldFByaWNlSW52YWxpZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3F0eUludmFsaWQsIHNldFF0eUludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHR5cGVJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcHJpY2VJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcXR5SW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG5cclxuICBjb25zdCBmb2N1c1R5cGVGaWVsZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFR5cGVJbnZhbGlkKHRydWUpO1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgIHR5cGVJbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xyXG4gICAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBmb2N1c0Ftb3VudEZpZWxkcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHBhcnNlZFF0eSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0UXR5KTtcclxuICAgIGNvbnN0IHBhcnNlZFByaWNlID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRQcmljZSk7XHJcbiAgICBjb25zdCBxdHlJc1ZhbGlkID0gcGFyc2VkUXR5ICE9IG51bGwgJiYgcGFyc2VkUXR5ID4gMDtcclxuICAgIGNvbnN0IHByaWNlSXNWYWxpZCA9IHBhcnNlZFByaWNlICE9IG51bGwgJiYgcGFyc2VkUHJpY2UgPiAwO1xyXG5cclxuICAgIHNldFF0eUludmFsaWQoIXF0eUlzVmFsaWQpO1xyXG4gICAgc2V0UHJpY2VJbnZhbGlkKCFwcmljZUlzVmFsaWQpO1xyXG5cclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICBpZiAoIXF0eUlzVmFsaWQpIHtcclxuICAgICAgICBxdHlJbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFwcmljZUlzVmFsaWQpIHtcclxuICAgICAgICBwcmljZUlucHV0UmVmLmN1cnJlbnQ/LmZvY3VzKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sIFtkcmFmdFByaWNlLCBkcmFmdFF0eV0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVEcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2UgPSB1c2VDYWxsYmFjayhcclxuICAgICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHNldFR5cGVJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlKHZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBbc2V0RHJhZnRUeXBlVmFsdWVDb2RlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURyYWZ0UHJpY2VDaGFuZ2UgPSB1c2VDYWxsYmFjayhcclxuICAgICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHNldFByaWNlSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIHNldERyYWZ0UHJpY2UodmFsdWUpO1xyXG4gICAgfSxcclxuICAgIFtzZXREcmFmdFByaWNlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURyYWZ0UXR5Q2hhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICBzZXRRdHlJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgc2V0RHJhZnRRdHkodmFsdWUpO1xyXG4gICAgfSxcclxuICAgIFtzZXREcmFmdFF0eV1cclxuICApO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgcGFyc2VkUHJpY2UgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFByaWNlKTtcclxuICAgIGlmIChwYXJzZWRQcmljZSAhPSBudWxsICYmIHBhcnNlZFByaWNlID4gMCkge1xyXG4gICAgICBzZXRQcmljZUludmFsaWQoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtkcmFmdFByaWNlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBwYXJzZWRRdHkgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFF0eSk7XHJcbiAgICBpZiAocGFyc2VkUXR5ICE9IG51bGwgJiYgcGFyc2VkUXR5ID4gMCkge1xyXG4gICAgICBzZXRRdHlJbnZhbGlkKGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbZHJhZnRRdHldKTtcclxuXHJcbiAgY29uc3QgY2FuT3BlblNhdmVDb25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgcGFyc2VkVHlwZVZhbHVlID0gTnVtYmVyLnBhcnNlSW50KFN0cmluZyhkcmFmdFR5cGVWYWx1ZUNvZGUgfHwgXCJcIikudHJpbSgpLCAxMCk7XHJcbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZShwYXJzZWRUeXBlVmFsdWUpIHx8IHBhcnNlZFR5cGVWYWx1ZSA8PSAwKSB7XHJcbiAgICAgIGZvY3VzVHlwZUZpZWxkKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXJzZWRQcmljZSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0UHJpY2UpO1xyXG4gICAgY29uc3QgcGFyc2VkUXR5ID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRRdHkpO1xyXG4gICAgY29uc3QgaGFzVmFsaWRRdHlQcmljZSA9IHBhcnNlZFF0eSAhPSBudWxsICYmIHBhcnNlZFF0eSA+IDAgJiYgcGFyc2VkUHJpY2UgIT0gbnVsbCAmJiBwYXJzZWRQcmljZSA+IDA7XHJcbiAgICBpZiAoaGFzVmFsaWRRdHlQcmljZSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmb2N1c0Ftb3VudEZpZWxkcygpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sIFtkcmFmdFByaWNlLCBkcmFmdFF0eSwgZHJhZnRUeXBlVmFsdWVDb2RlLCBmb2N1c0Ftb3VudEZpZWxkcywgZm9jdXNUeXBlRmllbGRdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGVJbnZhbGlkLFxyXG4gICAgcHJpY2VJbnZhbGlkLFxyXG4gICAgcXR5SW52YWxpZCxcclxuICAgIHR5cGVJbnB1dFJlZixcclxuICAgIHByaWNlSW5wdXRSZWYsXHJcbiAgICBxdHlJbnB1dFJlZixcclxuICAgIGZvY3VzVHlwZUZpZWxkLFxyXG4gICAgZm9jdXNBbW91bnRGaWVsZHMsXHJcbiAgICBoYW5kbGVEcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2UsXHJcbiAgICBoYW5kbGVEcmFmdFByaWNlQ2hhbmdlLFxyXG4gICAgaGFuZGxlRHJhZnRRdHlDaGFuZ2UsXHJcbiAgICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgfTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQWlFOzs7QUN5RzNE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QUEsTUFDQSwwQkFBMEI7QUFBQSxNQUMxQix3QkFBd0I7QUFBQSxNQUN4Qiw0QkFBNEI7QUFBQSxNQUM1QixvQkFBb0I7QUFBQSxNQUNwQixrQkFBa0I7QUFBQSxNQUNsQix3QkFBd0I7QUFBQSxNQUN4Qiw0QkFBNEI7QUFBQSxNQUM1QjtBQUFBLE1BQ0EsdUJBQXVCO0FBQUEsTUFDdkIsb0JBQW9CO0FBQUE7QUFBQSxFQUN0QixJQUNFO0FBRU4sU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsT0FBTztBQUFBLFFBQ0wsTUFBTSxNQUFNO0FBQUEsUUFDWixPQUFPLE1BQU07QUFBQSxRQUNiLFNBQVMsTUFBTTtBQUFBLFFBQ2YsYUFBYTtBQUFBLFFBQ2IsWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsWUFBWSxNQUFNO0FBQUEsUUFDbEIsYUFBYSxNQUFNO0FBQUEsUUFDbkIsTUFBTSxRQUFRO0FBQUEsUUFDZCxPQUFPO0FBQUEsUUFDUDtBQUFBLFFBQ0EsV0FBVztBQUFBLFFBQ1gsVUFBVTtBQUFBLE1BQ1o7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQSxRQUNWLFVBQVU7QUFBQSxRQUNWLFVBQVU7QUFBQSxRQUNWLE9BQU87QUFBQSxRQUNQLFdBQVc7QUFBQSxRQUNYLFlBQVk7QUFBQSxRQUNaO0FBQUEsUUFDQSxRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUEsUUFDVCxlQUFlO0FBQUEsUUFDZixlQUFlO0FBQUEsUUFDZixjQUFjO0FBQUEsUUFDZCxTQUFTO0FBQUEsTUFDWDtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUE7QUFBQSxFQUNGO0FBRUo7QUFHQSxJQUFNLDZCQUE2QixNQUFNO0FBQ3ZDLFNBQ0UsNkNBQUMsZ0NBQXFCLHlCQUF1QixNQUMzQyx1REFBQyxpQ0FBOEIsR0FDakM7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLDBCQUEwQjtBQUNqRSxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLDhCQUEyQixDQUFFO0FBQ3pEO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxxQ0FBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAicmVzcG9uc2UiLCAic2hlZXRzIiwgInNlbGVjdGVkU2hlZXQiLCAibG9hZGVkU3RhdHVzQ29kZSIsICJpc01hbmFnaW5nT3RoZXJVc2VyIiwgImxvYWRlZFBvbGljeSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
