import {
  SingleDatePicker
} from "./chunks/chunk-TQTUWJA7.js";
import {
  mapBooleanEnumOptions,
  mapWindowEnumOptions
} from "./chunks/chunk-YM2TI2W6.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-GP7VR2XR.js";
import {
  resolveExpenseSheetDetailPolicy
} from "./chunks/chunk-JXC4T3HC.js";
import "./chunks/chunk-DYOWCOBG.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-S6U6GZC2.js";
import "./chunks/chunk-OSBLOXTE.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-LGHRS62I.js";
import "./chunks/chunk-4BE3ZFCK.js";
import {
  isManagingOtherExpenseRecord,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-VGALJWLD.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-ZHUOZUVW.js";
import "./chunks/chunk-CBDB7NMA.js";
import {
  clearExpenseNavigationGuard,
  formatAmountWithCurrency,
  formatExpenseInputNumber,
  formatExpenseNumber,
  navigateToExpenseUrl,
  reloadExpensePage,
  setExpenseNavigationGuard
} from "./chunks/chunk-S4F4JMPK.js";
import {
  configureExpenseApiAuth,
  createExpenseSheet,
  deleteExpenseSheetLine,
  deleteExpenseSheetTicket,
  deleteExpenseSheetTicketFile,
  fetchExpenseSheetDetail,
  formatExpenseDisplayDate,
  getFuelPriceKm,
  hasAssignedVoucher,
  mapExpenseSheetHeader,
  mapExpenseSheetLine,
  parseExpenseDate,
  safeText,
  toIsoDate,
  updateExpenseSheetLine
} from "./chunks/chunk-4VP3QYLY.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-JI5QGMWG.js";
import {
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  toExpenseApiDdMmYyyy
} from "./chunks/chunk-7CXSZQJB.js";
import "./chunks/chunk-ZBKHPZJX.js";
import {
  canAccess,
  showPermissionModal
} from "./chunks/chunk-ZHH4AWW7.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-2NKOKBT5.js";
import {
  ApiFetchError,
  indT
} from "./chunks/chunk-5TAE4PEJ.js";
import "./chunks/chunk-6HGCHSZG.js";
import {
  __toESM
} from "./chunks/chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/pages/gastos/line/ExpenseSheetLineDetailPage.tsx
var import_react5 = __toESM(require_react());

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

// Web/wwwroot/react/src/pages/gastos/line/useExpenseSheetLineTypeValidation.ts
var import_react4 = __toESM(require_react());
var useExpenseSheetLineTypeValidation = ({
  draftTypeValueCode,
  draftPrice,
  draftQty,
  setDraftTypeValueCode,
  setDraftPrice,
  setDraftQty
}) => {
  const [typeInvalid, setTypeInvalid] = (0, import_react4.useState)(false);
  const [priceInvalid, setPriceInvalid] = (0, import_react4.useState)(false);
  const [qtyInvalid, setQtyInvalid] = (0, import_react4.useState)(false);
  const typeInputRef = (0, import_react4.useRef)(null);
  const priceInputRef = (0, import_react4.useRef)(null);
  const qtyInputRef = (0, import_react4.useRef)(null);
  const focusTypeField = (0, import_react4.useCallback)(() => {
    setTypeInvalid(true);
    window.requestAnimationFrame(() => {
      typeInputRef.current?.focus();
    });
  }, []);
  const focusAmountFields = (0, import_react4.useCallback)(() => {
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
  const handleDraftTypeValueCodeChange = (0, import_react4.useCallback)(
    (value) => {
      setTypeInvalid(false);
      setDraftTypeValueCode(value);
    },
    [setDraftTypeValueCode]
  );
  const handleDraftPriceChange = (0, import_react4.useCallback)(
    (value) => {
      setPriceInvalid(false);
      setDraftPrice(value);
    },
    [setDraftPrice]
  );
  const handleDraftQtyChange = (0, import_react4.useCallback)(
    (value) => {
      setQtyInvalid(false);
      setDraftQty(value);
    },
    [setDraftQty]
  );
  (0, import_react4.useEffect)(() => {
    const parsedPrice = parseDecimalInput(draftPrice);
    if (parsedPrice != null && parsedPrice > 0) {
      setPriceInvalid(false);
    }
  }, [draftPrice]);
  (0, import_react4.useEffect)(() => {
    const parsedQty = parseDecimalInput(draftQty);
    if (parsedQty != null && parsedQty > 0) {
      setQtyInvalid(false);
    }
  }, [draftQty]);
  const canOpenSaveConfirm = (0, import_react4.useCallback)(() => {
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
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
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
  const [isRedirectingAfterCreate, setIsRedirectingAfterCreate] = (0, import_react5.useState)(false);
  (0, import_react5.useEffect)(() => {
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
  const priceText = (0, import_react5.useMemo)(
    () => formatAmountWithCurrency(line?.price ?? null, safeText(header?.currencyCode)),
    [header?.currencyCode, line?.price]
  );
  const amountText = (0, import_react5.useMemo)(
    () => formatAmountWithCurrency(calculatedAmountPreview, safeText(header?.currencyCode)),
    [calculatedAmountPreview, header?.currencyCode]
  );
  const projectValue = safeText(line?.projId || header?.projId);
  const sheetDescription = safeText(header?.description) || "-";
  const internacionalLabel = getExpenseInternationalLabel(line?.internacional);
  const gastoTypeOptions = (0, import_react5.useMemo)(() => {
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
  const internationalOptions = (0, import_react5.useMemo)(
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
  const lineTopbarActionMode = !canEditExpenseCurrent && !canDeleteExpenseCurrent ? "view_only" : hasLinkedTicket && !isSheetLocked ? "delete_only" : "default";
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
    handleEnableEdit,
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
  const handleOpenLinkedTicket = (0, import_react5.useCallback)(() => {
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
    saveExpenseTicketReturnContext({
      fileId: safeFileId,
      origin: "expense-line",
      sheetId: safeSheetId
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
    ) : null
  ] });
};
var ExpenseSheetLineDetailPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(VisitasPageProviders_default, { enableExpenseManagement: true, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseSheetLineDetailContent, {}) });
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL0V4cGVuc2VTaGVldExpbmVEZXRhaWxQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0TGluZUZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2ludGVybmF0aW9uYWxPcHRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGluZS91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGluZS91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpbmUvdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbENvbmZpcm1EaWFsb2cudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2xpbmUvdXNlRXhwZW5zZVNoZWV0TGluZVR5cGVWYWxpZGF0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xyXG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XHJcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVNoZWV0TGluZUZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0TGluZUZvcm0udHN4XCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VJbnRlcm5hdGlvbmFsTGFiZWwsIGdldEV4cGVuc2VJbnRlcm5hdGlvbmFsT3B0aW9ucyB9IGZyb20gXCIuLi9jb25zdGFudHMvaW50ZXJuYXRpb25hbE9wdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgcGFyc2VEZWNpbWFsSW5wdXQgfSBmcm9tIFwiLi4vaG9va3MvZXhwZW5zZU11dGF0aW9uVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCwgcmVsb2FkRXhwZW5zZVBhZ2UgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHsgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgbWFwQm9vbGVhbkVudW1PcHRpb25zLFxyXG4gIG1hcFdpbmRvd0VudW1PcHRpb25zLFxyXG4gIHR5cGUgRXhwZW5zZVNlbGVjdE9wdGlvbixcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxNdXRhdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsQ29uZmlybURpYWxvZyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxDb25maXJtRGlhbG9nLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRMaW5lVHlwZVZhbGlkYXRpb24gfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRMaW5lVHlwZVZhbGlkYXRpb24udHNcIjtcclxuXHJcbi8vIEluaXRpYWxpemVzIGF1dGggc2VlZCBmb3IgZXhwZW5zZSBBUEkgY2FsbHMgYmVmb3JlIGlzbGFuZCBlZmZlY3RzIHJ1bi5cclxuY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXG4gIH0pO1xufTtcblxuLy8gQ29uc3VtZXMgdGhlIG9uZS10aW1lIGVkaXQgaGFuZG9mZiBmcm9tIHNoZWV0IGRldGFpbCBzbyBsYXRlciByZWxvYWRzIHJldHVybiB0byBub3JtYWwgdmlldyBtb2RlLlxuY29uc3QgY29uc3VtZUxpbmVFZGl0TW9kZVF1ZXJ5ID0gKCkgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGN1cnJlbnRVcmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgaWYgKHNhZmVUZXh0KGN1cnJlbnRVcmwuc2VhcmNoUGFyYW1zLmdldChcIm1vZGVcIikpLnRvTG93ZXJDYXNlKCkgIT09IFwiZWRpdFwiKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY3VycmVudFVybC5zZWFyY2hQYXJhbXMuZGVsZXRlKFwibW9kZVwiKTtcbiAgY29uc3QgbmV4dFVybCA9IGAke2N1cnJlbnRVcmwucGF0aG5hbWV9JHtjdXJyZW50VXJsLnNlYXJjaH0ke2N1cnJlbnRVcmwuaGFzaH1gO1xuICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUod2luZG93Lmhpc3Rvcnkuc3RhdGUsIFwiXCIsIG5leHRVcmwpO1xufTtcblxuY29uc3QgRXhwZW5zZVNoZWV0TGluZURldGFpbENvbnRlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHtcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICB9ID0gdXNlQXV0aENvbnRleHQoKTtcclxuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIlZpZXdcIik7XHJcbiAgY29uc3Qgc2hlZXRJZCA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfU0hFRVRfSURfXyk7XHJcbiAgY29uc3QgbGluZUlkID0gc2FmZVRleHQod2luZG93Ll9fRVhQRU5TRV9MSU5FX0lEX18pO1xyXG4gIGNvbnN0IGxpbmVNb2RlID0gc2FmZVRleHQod2luZG93Ll9fRVhQRU5TRV9MSU5FX01PREVfXykudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgaXNDcmVhdGVNb2RlID0gbGluZU1vZGUgPT09IFwiY3JlYXRlXCI7XG4gIGNvbnN0IHN0YXJ0SW5FZGl0TW9kZSA9IGxpbmVNb2RlID09PSBcImVkaXRcIjtcbiAgY29uc3QgW2lzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSwgc2V0SXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghc3RhcnRJbkVkaXRNb2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3VtZUxpbmVFZGl0TW9kZVF1ZXJ5KCk7XG4gIH0sIFtzdGFydEluRWRpdE1vZGVdKTtcblxuICBjb25zdCB7XG4gICAgaGVhZGVyLFxyXG4gICAgbGluZSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGJ1c3ksXHJcbiAgICBzdGF0dXMsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtb2RhbEVycm9yLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0VHJhbnNEYXRlLFxyXG4gICAgZHJhZnRUeXBlVmFsdWVDb2RlLFxyXG4gICAgZHJhZnRQcmljZSxcclxuICAgIGRyYWZ0UXR5LFxyXG4gICAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgICBkcmFmdEludGVybmF0aW9uYWwsXHJcbiAgICBpc0ttVHlwZSxcclxuICAgIGlzRnVlbFByaWNlTG9hZGluZyxcclxuICAgIGZ1ZWxQcmljZU1lc3NhZ2UsXHJcbiAgICBmdWVsUHJpY2VNZXNzYWdlSXNFcnJvcixcclxuICAgIGlzU2hlZXRMb2NrZWQsXHJcbiAgICBpc0xpbmVFZGl0TG9ja2VkLFxyXG4gICAgaXNMaW5lRGVsZXRlTG9ja2VkLFxyXG4gICAgaGFzTGlua2VkVGlja2V0LFxyXG4gICAgbGlua2VkVGlja2V0RmlsZUlkLFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZUN1cnJlbnQsXHJcbiAgICBjYW5FZGl0RXhwZW5zZUN1cnJlbnQsXHJcbiAgICBjYW5EZWxldGVFeHBlbnNlQ3VycmVudCxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgIHNldERyYWZ0VHJhbnNEYXRlLFxyXG4gICAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlLFxyXG4gICAgc2V0RHJhZnRQcmljZSxcclxuICAgIHNldERyYWZ0UXR5LFxyXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICBzZXREcmFmdEludGVybmF0aW9uYWwsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICAgIG5hdmlnYXRlVG9TaGVldERldGFpbCxcclxuICB9ID0gdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFN0YXRlKHtcclxuICAgIGhhc0FjY2VzcyxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHNoZWV0SWQsXHJcbiAgICBsaW5lSWQsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBzdGFydEluRWRpdE1vZGUsXHJcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICB9KTtcclxuXHJcbiAgY29uc3Qge1xyXG4gICAgdHlwZUludmFsaWQsXHJcbiAgICBwcmljZUludmFsaWQsXHJcbiAgICBxdHlJbnZhbGlkLFxyXG4gICAgdHlwZUlucHV0UmVmLFxyXG4gICAgcHJpY2VJbnB1dFJlZixcclxuICAgIHF0eUlucHV0UmVmLFxyXG4gICAgZm9jdXNUeXBlRmllbGQsXHJcbiAgICBmb2N1c0Ftb3VudEZpZWxkcyxcclxuICAgIGhhbmRsZURyYWZ0VHlwZVZhbHVlQ29kZUNoYW5nZSxcclxuICAgIGhhbmRsZURyYWZ0UHJpY2VDaGFuZ2UsXHJcbiAgICBoYW5kbGVEcmFmdFF0eUNoYW5nZSxcclxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICB9ID0gdXNlRXhwZW5zZVNoZWV0TGluZVR5cGVWYWxpZGF0aW9uKHtcclxuICAgIGRyYWZ0VHlwZVZhbHVlQ29kZSxcclxuICAgIGRyYWZ0UHJpY2UsXHJcbiAgICBkcmFmdFF0eSxcclxuICAgIHNldERyYWZ0VHlwZVZhbHVlQ29kZSxcclxuICAgIHNldERyYWZ0UHJpY2UsXHJcbiAgICBzZXREcmFmdFF0eSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZHJhZnRQcmljZVZhbHVlID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRQcmljZSk7XHJcbiAgY29uc3QgZHJhZnRRdHlWYWx1ZSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0UXR5KTtcclxuICBjb25zdCBjYWxjdWxhdGVkQW1vdW50UHJldmlldyA9XHJcbiAgICBpc0VkaXRpbmcgJiYgZHJhZnRQcmljZVZhbHVlICE9IG51bGwgJiYgZHJhZnRQcmljZVZhbHVlID4gMCAmJiBkcmFmdFF0eVZhbHVlICE9IG51bGwgJiYgZHJhZnRRdHlWYWx1ZSA+IDBcclxuICAgICAgPyBkcmFmdFByaWNlVmFsdWUgKiBkcmFmdFF0eVZhbHVlXHJcbiAgICAgIDogbGluZT8uYW1vdW50ID8/IG51bGw7XHJcbiAgY29uc3QgcHJpY2VUZXh0ID0gdXNlTWVtbyhcclxuICAgICgpID0+IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShsaW5lPy5wcmljZSA/PyBudWxsLCBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSkpLFxyXG4gICAgW2hlYWRlcj8uY3VycmVuY3lDb2RlLCBsaW5lPy5wcmljZV1cclxuICApO1xyXG4gIGNvbnN0IGFtb3VudFRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGNhbGN1bGF0ZWRBbW91bnRQcmV2aWV3LCBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSkpLFxyXG4gICAgW2NhbGN1bGF0ZWRBbW91bnRQcmV2aWV3LCBoZWFkZXI/LmN1cnJlbmN5Q29kZV1cclxuICApO1xyXG4gIGNvbnN0IHByb2plY3RWYWx1ZSA9IHNhZmVUZXh0KGxpbmU/LnByb2pJZCB8fCBoZWFkZXI/LnByb2pJZCk7XHJcbiAgY29uc3Qgc2hlZXREZXNjcmlwdGlvbiA9IHNhZmVUZXh0KGhlYWRlcj8uZGVzY3JpcHRpb24pIHx8IFwiLVwiO1xyXG4gIGNvbnN0IGludGVybmFjaW9uYWxMYWJlbCA9IGdldEV4cGVuc2VJbnRlcm5hdGlvbmFsTGFiZWwobGluZT8uaW50ZXJuYWNpb25hbCk7XHJcblxyXG4gIGNvbnN0IGdhc3RvVHlwZU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4ge1xyXG4gICAgY29uc3Qgc291cmNlID0gQXJyYXkuaXNBcnJheSh3aW5kb3cuX19FWFBFTlNFX0dBU1RPX1RZUEVTX18pID8gd2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fIDogW107XHJcbiAgICBjb25zdCBtYXBwZWQgPSBtYXBXaW5kb3dFbnVtT3B0aW9ucyhzb3VyY2UpO1xyXG5cclxuICAgIGNvbnN0IGN1cnJlbnRUeXBlQ29kZSA9IHNhZmVUZXh0KGxpbmU/LnR5cGVWYWx1ZUNvZGUpO1xyXG4gICAgY29uc3QgY3VycmVudFR5cGVMYWJlbCA9IHNhZmVUZXh0KGxpbmU/LnR5cGVWYWx1ZSk7XHJcbiAgICBpZiAoY3VycmVudFR5cGVDb2RlICYmICFtYXBwZWQuc29tZSgoaXRlbSkgPT4gaXRlbS52YWx1ZSA9PT0gY3VycmVudFR5cGVDb2RlKSkge1xyXG4gICAgICBtYXBwZWQucHVzaCh7XHJcbiAgICAgICAgdmFsdWU6IGN1cnJlbnRUeXBlQ29kZSxcclxuICAgICAgICB0ZXh0OiBjdXJyZW50VHlwZUxhYmVsIHx8IGN1cnJlbnRUeXBlQ29kZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1hcHBlZDtcclxuICB9LCBbbGluZT8udHlwZVZhbHVlLCBsaW5lPy50eXBlVmFsdWVDb2RlXSk7XHJcblxyXG4gIGNvbnN0IGludGVybmF0aW9uYWxPcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFxyXG4gICAgKCkgPT4gbWFwQm9vbGVhbkVudW1PcHRpb25zKGdldEV4cGVuc2VJbnRlcm5hdGlvbmFsT3B0aW9ucygpKSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qge1xyXG4gICAgbW9kYWwsXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICAgIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgICBtb2RhbENhbmNlbFRleHQsXHJcbiAgICBtb2RhbENvbmZpcm1UZXh0LFxyXG4gICAgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtLFxyXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsQ29uZmlybURpYWxvZyh7XHJcbiAgICBidXN5LFxyXG4gICAgbW9kYWxFcnJvcixcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHsgaGFuZGxlVXBkYXRlLCBoYW5kbGVEZWxldGUgfSA9IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxNdXRhdGlvbnMoe1xyXG4gICAgYnVzeSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzRWRpdExvY2tlZDogaXNMaW5lRWRpdExvY2tlZCxcclxuICAgIGlzRGVsZXRlTG9ja2VkOiBpc0xpbmVEZWxldGVMb2NrZWQsXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiBjYW5DcmVhdGVFeHBlbnNlQ3VycmVudCxcclxuICAgIGNhbkVkaXRFeHBlbnNlOiBjYW5FZGl0RXhwZW5zZUN1cnJlbnQsXHJcbiAgICBjYW5EZWxldGVFeHBlbnNlOiBjYW5EZWxldGVFeHBlbnNlQ3VycmVudCxcclxuICAgIHNoZWV0SWQsXHJcbiAgICBsaW5lSWQsXHJcbiAgICBsaW5lLFxyXG4gICAgbGlua2VkVGlja2V0RmlsZUlkLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0VHJhbnNEYXRlLFxyXG4gICAgZHJhZnRUeXBlVmFsdWVDb2RlLFxyXG4gICAgZHJhZnRQcmljZSxcclxuICAgIGRyYWZ0UXR5LFxyXG4gICAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgICBkcmFmdEludGVybmF0aW9uYWwsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIG9uSW52YWxpZFR5cGU6IGZvY3VzVHlwZUZpZWxkLFxyXG4gICAgb25JbnZhbGlkQW1vdW50UXR5OiBmb2N1c0Ftb3VudEZpZWxkcyxcclxuICAgIG9uQ3JlYXRlU3VjY2VzczogKCkgPT4ge30sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGxpbmVUb3BiYXJBY3Rpb25Nb2RlID1cclxuICAgICFjYW5FZGl0RXhwZW5zZUN1cnJlbnQgJiYgIWNhbkRlbGV0ZUV4cGVuc2VDdXJyZW50XHJcbiAgICAgID8gXCJ2aWV3X29ubHlcIlxyXG4gICAgICA6IChoYXNMaW5rZWRUaWNrZXQgJiYgIWlzU2hlZXRMb2NrZWQgPyBcImRlbGV0ZV9vbmx5XCIgOiBcImRlZmF1bHRcIik7XHJcblxyXG4gIHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zKHtcclxuICAgIGJ1c3k6IGJ1c3kgfHwgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLFxyXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXHJcbiAgICBhY3Rpb25Nb2RlOiBsaW5lVG9wYmFyQWN0aW9uTW9kZSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHk6IG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6IGNhbkNyZWF0ZUV4cGVuc2VDdXJyZW50LFxyXG4gICAgY2FuRWRpdEV4cGVuc2U6IGNhbkVkaXRFeHBlbnNlQ3VycmVudCxcclxuICAgIGNhbkRlbGV0ZUV4cGVuc2U6IGNhbkRlbGV0ZUV4cGVuc2VDdXJyZW50LFxyXG4gICAgc2hlZXRJZCxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICAgIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICAgIHNldElzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSh0cnVlKTtcclxuICAgICAgICBuYXZpZ2F0ZVRvU2hlZXREZXRhaWwoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlbG9hZEV4cGVuc2VQYWdlKCk7XHJcbiAgICB9LFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU9wZW5MaW5rZWRUaWNrZXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBzYWZlRmlsZUlkID0gc2FmZVRleHQobGlua2VkVGlja2V0RmlsZUlkKTtcclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQoc2hlZXRJZCk7XHJcbiAgICBjb25zdCBzYWZlTGluZUlkID0gc2FmZVRleHQobGluZUlkIHx8IGxpbmU/LmxpbmVSZWNJZCk7XHJcbiAgICBpZiAoIXNhZmVGaWxlSWQgfHwgIXNhZmVTaGVldElkIHx8ICFzYWZlTGluZUlkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgZmlsZUlkOiBzYWZlRmlsZUlkLFxyXG4gICAgICBvcmlnaW46IFwiZXhwZW5zZS1saW5lXCIsXHJcbiAgICAgIHNoZWV0SWQ6IHNhZmVTaGVldElkLFxyXG4gICAgICBsaW5lUmVjSWQ6IHNhZmVMaW5lSWQsXHJcbiAgICB9KTtcclxuICAgIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCh7XHJcbiAgICAgIGZpbGVJZDogc2FmZUZpbGVJZCxcclxuICAgICAgb3JpZ2luOiBcImV4cGVuc2UtbGluZVwiLFxyXG4gICAgICBzaGVldElkOiBzYWZlU2hlZXRJZCxcclxuICAgIH0pO1xyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxyXG4gICAgfSk7XHJcbiAgfSwgW2lzRWRpdGluZywgbGluZT8ubGluZVJlY0lkLCBsaW5lSWQsIGxpbmtlZFRpY2tldEZpbGVJZCwgc2hlZXRJZF0pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cclxuICAgICAgPENvbmZpcm1Nb2RhbFxyXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XHJcbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxyXG4gICAgICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XHJcbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsQ29uZmlybVRleHR9XHJcbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWxDYW5jZWxUZXh0fVxyXG4gICAgICAgIGxvYWRpbmdUZXh0PXttb2RhbExvYWRpbmdUZXh0fVxyXG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XHJcbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxyXG4gICAgICAgIGJ1c3k9e2J1c3kgfHwgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlfVxyXG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17c3RhdHVzfVxyXG4gICAgICAgIG9uQ29uZmlybT17aGFuZGxlTW9kYWxCdXR0b25Db25maXJtfVxyXG4gICAgICAgIG9uQ2FuY2VsPXtjbG9zZUNvbmZpcm19XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCJcclxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBpc0xvYWRpbmcgfHwgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cclxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtlcnJvck1lc3NhZ2UgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxyXG5cclxuICAgICAgeyFpc0xvYWRpbmcgJiYgIWlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhZXJyb3JNZXNzYWdlICYmIGxpbmUgPyAoXHJcbiAgICAgICAgPEV4cGVuc2VTaGVldExpbmVGb3JtXHJcbiAgICAgICAgICBsaW5lPXtsaW5lfVxyXG4gICAgICAgICAgZmFsbGJhY2tEYXRlPXtzYWZlVGV4dChoZWFkZXI/LmNyZWF0ZWREYXRlKX1cclxuICAgICAgICAgIHNoZWV0RGVzY3JpcHRpb249e3NoZWV0RGVzY3JpcHRpb259XHJcbiAgICAgICAgICBwcm9qZWN0VmFsdWU9e3Byb2plY3RWYWx1ZX1cclxuICAgICAgICAgIHByaWNlVGV4dD17cHJpY2VUZXh0fVxyXG4gICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cclxuICAgICAgICAgIGludGVybmFjaW9uYWxMYWJlbD17aW50ZXJuYWNpb25hbExhYmVsfVxyXG4gICAgICAgICAgaXNLbVR5cGU9e2lzS21UeXBlfVxyXG4gICAgICAgICAgaXNGdWVsUHJpY2VMb2FkaW5nPXtpc0Z1ZWxQcmljZUxvYWRpbmd9XHJcbiAgICAgICAgICBmdWVsUHJpY2VNZXNzYWdlPXtmdWVsUHJpY2VNZXNzYWdlfVxyXG4gICAgICAgICAgZnVlbFByaWNlTWVzc2FnZUlzRXJyb3I9e2Z1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yfVxyXG4gICAgICAgICAgc3RhdHVzPXtzdGF0dXN9XHJcbiAgICAgICAgICBpc0VkaXRpbmc9e2lzRWRpdGluZ31cclxuICAgICAgICAgIGdhc3RvVHlwZU9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XHJcbiAgICAgICAgICBpbnRlcm5hdGlvbmFsT3B0aW9ucz17aW50ZXJuYXRpb25hbE9wdGlvbnN9XHJcbiAgICAgICAgICBkcmFmdERlc2NyaXB0aW9uPXtkcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgZHJhZnRUcmFuc0RhdGU9e2RyYWZ0VHJhbnNEYXRlfVxyXG4gICAgICAgICAgZHJhZnRUeXBlVmFsdWVDb2RlPXtkcmFmdFR5cGVWYWx1ZUNvZGV9XHJcbiAgICAgICAgICBkcmFmdFByaWNlPXtkcmFmdFByaWNlfVxyXG4gICAgICAgICAgZHJhZnRRdHk9e2RyYWZ0UXR5fVxyXG4gICAgICAgICAgZHJhZnRQcm9qZWN0SWQ9e2RyYWZ0UHJvamVjdElkfVxyXG4gICAgICAgICAgZHJhZnRJbnRlcm5hdGlvbmFsPXtkcmFmdEludGVybmF0aW9uYWx9XHJcbiAgICAgICAgICB0eXBlSW5wdXRSZWY9e3R5cGVJbnB1dFJlZn1cclxuICAgICAgICAgIHByaWNlSW5wdXRSZWY9e3ByaWNlSW5wdXRSZWZ9XHJcbiAgICAgICAgICBxdHlJbnB1dFJlZj17cXR5SW5wdXRSZWZ9XHJcbiAgICAgICAgICB0eXBlSW52YWxpZD17dHlwZUludmFsaWR9XHJcbiAgICAgICAgICBwcmljZUludmFsaWQ9e3ByaWNlSW52YWxpZH1cclxuICAgICAgICAgIHF0eUludmFsaWQ9e3F0eUludmFsaWR9XHJcbiAgICAgICAgICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U9e3NldERyYWZ0RGVzY3JpcHRpb259XHJcbiAgICAgICAgICBvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlPXtzZXREcmFmdFRyYW5zRGF0ZX1cclxuICAgICAgICAgIG9uRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlPXtoYW5kbGVEcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2V9XHJcbiAgICAgICAgICBvbkRyYWZ0UHJpY2VDaGFuZ2U9e2hhbmRsZURyYWZ0UHJpY2VDaGFuZ2V9XHJcbiAgICAgICAgICBvbkRyYWZ0UXR5Q2hhbmdlPXtoYW5kbGVEcmFmdFF0eUNoYW5nZX1cclxuICAgICAgICAgIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2U9e3NldERyYWZ0UHJvamVjdElkfVxyXG4gICAgICAgICAgb25EcmFmdEludGVybmF0aW9uYWxDaGFuZ2U9e3NldERyYWZ0SW50ZXJuYXRpb25hbH1cclxuICAgICAgICAgIGxpbmtlZFRpY2tldEZpbGVJZD17bGlua2VkVGlja2V0RmlsZUlkfVxyXG4gICAgICAgICAgc2hvd0xpbmtlZFRpY2tldEZpZWxkPXtoYXNMaW5rZWRUaWNrZXR9XHJcbiAgICAgICAgICBvbk9wZW5MaW5rZWRUaWNrZXQ9e2hhbmRsZU9wZW5MaW5rZWRUaWNrZXR9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgZXhwZW5zZSBzaGVldCBsaW5lIGRldGFpbC5cclxuY29uc3QgRXhwZW5zZVNoZWV0TGluZURldGFpbFBhZ2UgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cclxuICAgICAgPEV4cGVuc2VTaGVldExpbmVEZXRhaWxDb250ZW50IC8+XHJcbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS1saW5lLWRldGFpbC1yb290XCIpO1xyXG4gIGlmICghcm9vdEVsKSByZXR1cm47XHJcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxFeHBlbnNlU2hlZXRMaW5lRGV0YWlsUGFnZSAvPik7XHJcbn07XHJcblxyXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldExpbmVEZXRhaWxQYWdlO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IFNpbmdsZURhdGVQaWNrZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TaW5nbGVEYXRlUGlja2VyLnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIsIGZvcm1hdEV4cGVuc2VOdW1iZXIgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dCBmcm9tIFwiLi9FeHBlbnNlUHJvamVjdEZpbHRlcklucHV0LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVJlYWRPbmx5RmllbGQgZnJvbSBcIi4vRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgZnJvbSBcIi4vRXhwZW5zZVNlY3Rpb25EaXZpZGVyLnRzeFwiO1xyXG5cclxudHlwZSBFeHBlbnNlU2hlZXRMaW5lRm9ybVByb3BzID0ge1xyXG4gIGxpbmU6IEV4cGVuc2VTaGVldExpbmU7XHJcbiAgZmFsbGJhY2tEYXRlOiBzdHJpbmc7XHJcbiAgc2hlZXREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIHByb2plY3RWYWx1ZTogc3RyaW5nO1xyXG4gIHByaWNlVGV4dDogc3RyaW5nO1xyXG4gIGFtb3VudFRleHQ6IHN0cmluZztcclxuICBpbnRlcm5hY2lvbmFsTGFiZWw6IHN0cmluZztcclxuICBpc0ttVHlwZTogYm9vbGVhbjtcclxuICBpc0Z1ZWxQcmljZUxvYWRpbmc6IGJvb2xlYW47XHJcbiAgZnVlbFByaWNlTWVzc2FnZTogc3RyaW5nO1xyXG4gIGZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yOiBib29sZWFuO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBnYXN0b1R5cGVPcHRpb25zOiBFeHBlbnNlU2VsZWN0T3B0aW9uW107XHJcbiAgaW50ZXJuYXRpb25hbE9wdGlvbnM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXTtcclxuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZHJhZnRUcmFuc0RhdGU6IHN0cmluZztcclxuICBkcmFmdFR5cGVWYWx1ZUNvZGU6IHN0cmluZztcclxuICBkcmFmdFByaWNlOiBzdHJpbmc7XHJcbiAgZHJhZnRRdHk6IHN0cmluZztcclxuICBkcmFmdFByb2plY3RJZDogc3RyaW5nO1xyXG4gIGRyYWZ0SW50ZXJuYXRpb25hbDogc3RyaW5nO1xyXG4gIGxpbmtlZFRpY2tldEZpbGVJZDogc3RyaW5nO1xyXG4gIHNob3dMaW5rZWRUaWNrZXRGaWVsZDogYm9vbGVhbjtcclxuICB0eXBlSW5wdXRSZWY/OiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgcHJpY2VJbnB1dFJlZj86IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICBxdHlJbnB1dFJlZj86IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICB0eXBlSW52YWxpZD86IGJvb2xlYW47XHJcbiAgcHJpY2VJbnZhbGlkPzogYm9vbGVhbjtcclxuICBxdHlJbnZhbGlkPzogYm9vbGVhbjtcclxuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0UHJpY2VDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRRdHlDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRJbnRlcm5hdGlvbmFsQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbk9wZW5MaW5rZWRUaWNrZXQ6ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXRRdHlWYWx1ZSA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VOdW1iZXIodmFsdWUsIHtcclxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgZmFsbGJhY2s6IFwiLVwiLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gUHVyZSBmb3JtIHJlbmRlcmVyIGZvciBleHBlbnNlIGxpbmUgZGV0YWlsIGluIHJlYWQgYW5kIGVkaXQgbW9kZXMuXHJcbmNvbnN0IEV4cGVuc2VTaGVldExpbmVGb3JtID0gKHtcclxuICBsaW5lLFxyXG4gIGZhbGxiYWNrRGF0ZSxcclxuICBzaGVldERlc2NyaXB0aW9uOiBfc2hlZXREZXNjcmlwdGlvbixcclxuICBwcm9qZWN0VmFsdWUsXHJcbiAgcHJpY2VUZXh0LFxyXG4gIGFtb3VudFRleHQsXHJcbiAgaW50ZXJuYWNpb25hbExhYmVsLFxyXG4gIGlzS21UeXBlLFxyXG4gIGlzRnVlbFByaWNlTG9hZGluZyxcclxuICBmdWVsUHJpY2VNZXNzYWdlLFxyXG4gIGZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yLFxyXG4gIHN0YXR1cyxcclxuICBpc0VkaXRpbmcsXHJcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcclxuICBpbnRlcm5hdGlvbmFsT3B0aW9ucyxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRyYWZ0VHJhbnNEYXRlLFxyXG4gIGRyYWZ0VHlwZVZhbHVlQ29kZSxcclxuICBkcmFmdFByaWNlLFxyXG4gIGRyYWZ0UXR5LFxyXG4gIGRyYWZ0UHJvamVjdElkLFxyXG4gIGRyYWZ0SW50ZXJuYXRpb25hbCxcclxuICBsaW5rZWRUaWNrZXRGaWxlSWQsXHJcbiAgc2hvd0xpbmtlZFRpY2tldEZpZWxkLFxyXG4gIHR5cGVJbnB1dFJlZixcclxuICBwcmljZUlucHV0UmVmLFxyXG4gIHF0eUlucHV0UmVmLFxyXG4gIHR5cGVJbnZhbGlkID0gZmFsc2UsXHJcbiAgcHJpY2VJbnZhbGlkID0gZmFsc2UsXHJcbiAgcXR5SW52YWxpZCA9IGZhbHNlLFxyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZSxcclxuICBvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlLFxyXG4gIG9uRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlLFxyXG4gIG9uRHJhZnRQcmljZUNoYW5nZSxcclxuICBvbkRyYWZ0UXR5Q2hhbmdlLFxyXG4gIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2UsXHJcbiAgb25EcmFmdEludGVybmF0aW9uYWxDaGFuZ2UsXHJcbiAgb25PcGVuTGlua2VkVGlja2V0LFxyXG59OiBFeHBlbnNlU2hlZXRMaW5lRm9ybVByb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNwYWNlLXktMFwiPlxyXG4gICAgICA8RXhwZW5zZVNlY3Rpb25EaXZpZGVyXHJcbiAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVcIiwgXCJMaW5lXCIpfVxyXG4gICAgICAgIGNsYXNzTmFtZT1cImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyLS1zcGFjZWRcIlxyXG4gICAgICAgIGxhYmVsQ2xhc3NOYW1lPVwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXJfX2xhYmVsLS10aXRsZVwiXHJcbiAgICAgIC8+XHJcblxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgICAge2lzRWRpdGluZyA/IChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCI+XHJcbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0RGVzY3JpcHRpb259XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxyXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtzYWZlVGV4dChsaW5lLmRlc2NyaXB0aW9uKSB8fCBcIi1cIn1cclxuICAgICAgICAgICAgICBmdWxsV2lkdGhcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAge3Nob3dMaW5rZWRUaWNrZXRGaWVsZCA/IChcclxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX0ZpbGVJZFwiLCBcIlRpY2tldFwiKX1cclxuICAgICAgICAgICAgICB2YWx1ZT17bGlua2VkVGlja2V0RmlsZUlkfVxyXG4gICAgICAgICAgICAgIGZ1bGxXaWR0aFxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uT3BlbkxpbmtlZFRpY2tldH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlzaXRhLWZpZWxkLXRleHRcIj5cclxuICAgICAgICAgICAgICA8U2luZ2xlRGF0ZVBpY2tlclxyXG4gICAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0NyZWF0ZWREYXRlXCIsIFwiRGF0ZVwiKX1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFRyYW5zRGF0ZX1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmd9XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DcmVhdGVkRGF0ZVwiLCBcIkRhdGVcIil9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShcclxuICAgICAgICAgICAgICAgIHNhZmVUZXh0KGxpbmUudHJhbnNEYXRlIHx8IGZhbGxiYWNrRGF0ZSksXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9UeXBlXCIsIFwiVHlwZVwiKX1cclxuICAgICAgICAgICAgICBvcHRpb25zPXtnYXN0b1R5cGVPcHRpb25zfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFR5cGVWYWx1ZUNvZGUgfHwgXCJcIn1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgaW5wdXRSZWY9e3R5cGVJbnB1dFJlZn1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVHlwZVwiLCBcIlR5cGVcIil9XHJcbiAgICAgICAgICAgICAgaW52YWxpZD17dHlwZUludmFsaWR9XHJcbiAgICAgICAgICAgICAgdXNlUG9ydGFsPXtmYWxzZX1cclxuICAgICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1R5cGVcIiwgXCJUeXBlXCIpfSB2YWx1ZT17c2FmZVRleHQobGluZS50eXBlVmFsdWUpIHx8IFwiLVwifSAvPlxyXG4gICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XHJcbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9QcmljZVwiLCBcIlByaWNlXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICByZWY9e3ByaWNlSW5wdXRSZWZ9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2lzS21UeXBlID8gXCJmb3JtLWNvbnRyb2wgaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcImZvcm0tY29udHJvbFwifSR7XHJcbiAgICAgICAgICAgICAgICAgIHByaWNlSW52YWxpZCA/IFwiIGJvcmRlci1yb3NlLTQwMCBiZy1yb3NlLTUwIGZvY3VzOnJpbmctcm9zZS0yMDAgZm9jdXM6Ym9yZGVyLXJvc2UtNDAwXCIgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9YH1cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgIGlucHV0TW9kZT1cImRlY2ltYWxcIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0UHJpY2V9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0UHJpY2VDaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxyXG4gICAgICAgICAgICAgICAgb25CbHVyPXsoZXZlbnQpID0+XHJcbiAgICAgICAgICAgICAgICAgIG9uRHJhZnRQcmljZUNoYW5nZShcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXtpc0ttVHlwZX1cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0ttVHlwZX1cclxuICAgICAgICAgICAgICAgIGFyaWEtcmVhZG9ubHk9e2lzS21UeXBlfVxyXG4gICAgICAgICAgICAgICAgYXJpYS1pbnZhbGlkPXtwcmljZUludmFsaWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIn1cclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1ByaWNlXCIsIFwiUHJpY2VcIil9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICB7aXNLbVR5cGUgJiYgaXNGdWVsUHJpY2VMb2FkaW5nID8gKFxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgdGV4dC14c1wiPlxyXG4gICAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfRnVlbFByaWNlX0xvYWRpbmdcIiwgXCJMb2FkaW5nIGZ1ZWwgcHJpY2UuLi5cIil9XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgICAge2lzS21UeXBlICYmICFpc0Z1ZWxQcmljZUxvYWRpbmcgJiYgZnVlbFByaWNlTWVzc2FnZSA/IChcclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17ZnVlbFByaWNlTWVzc2FnZUlzRXJyb3IgPyBcInRleHQtZGFuZ2VyIHRleHQtc21cIiA6IFwidGV4dC1zbGF0ZS01MDAgdGV4dC14c1wifT57ZnVlbFByaWNlTWVzc2FnZX08L3A+XHJcbiAgICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9QcmljZVwiLCBcIlByaWNlXCIpfSB2YWx1ZT17cHJpY2VUZXh0IHx8IFwiLVwifSAvPlxyXG4gICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XHJcbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9RdHlcIiwgXCJRdWFudGl0eVwiKX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgcmVmPXtxdHlJbnB1dFJlZn1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCR7XHJcbiAgICAgICAgICAgICAgICAgIHF0eUludmFsaWQgPyBcIiBib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpyaW5nLXJvc2UtMjAwIGZvY3VzOmJvcmRlci1yb3NlLTQwMFwiIDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfWB9XHJcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICBpbnB1dE1vZGU9XCJkZWNpbWFsXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFF0eX1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnRRdHlDaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxyXG4gICAgICAgICAgICAgICAgb25CbHVyPXsoZXZlbnQpID0+XHJcbiAgICAgICAgICAgICAgICAgIG9uRHJhZnRRdHlDaGFuZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKGV2ZW50LnRhcmdldC52YWx1ZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICBmYWxsYmFjazogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhcmlhLWludmFsaWQ9e3F0eUludmFsaWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIn1cclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtmb3JtYXRRdHlWYWx1ZShsaW5lLnF0eSl9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQW1vdW50XCIsIFwiQW1vdW50XCIpfSB2YWx1ZT17YW1vdW50VGV4dCB8fCBcIi1cIn0gLz5cclxuXHJcbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgICA8RXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1Byb2plY3RfUGxhY2Vob2xkZXJcIiwgXCJQcm9qZWN0IGlkXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFByb2plY3RJZH1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdFByb2plY3RJZENoYW5nZX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICkgOiBwcm9qZWN0VmFsdWUgPyAoXHJcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9IHZhbHVlPXtwcm9qZWN0VmFsdWV9IC8+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfSW50ZXJuYXRpb25hbFwiLCBcIkludGVybmF0aW9uYWxcIil9XHJcbiAgICAgICAgICAgICAgb3B0aW9ucz17aW50ZXJuYXRpb25hbE9wdGlvbnN9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0SW50ZXJuYXRpb25hbCB8fCBcIlwifVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0SW50ZXJuYXRpb25hbENoYW5nZX1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfSW50ZXJuYXRpb25hbFwiLCBcIkludGVybmF0aW9uYWxcIil9XHJcbiAgICAgICAgICAgICAgdXNlUG9ydGFsPXtmYWxzZX1cclxuICAgICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfSW50ZXJuYXRpb25hbFwiLCBcIkludGVybmF0aW9uYWxcIil9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e2ludGVybmFjaW9uYWxMYWJlbH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICA8c3Bhbj57c3RhdHVzfTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9zZWN0aW9uPlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXRMaW5lRm9ybTtcclxuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZUludGVybmF0aW9uYWxPcHRpb24gPSB7XHJcbiAgdmFsdWU6IGJvb2xlYW47XHJcbiAgdGV4dDogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gRml4ZWQgZW51bSBmb3IgXCJJbnRlcm5hY2lvbmFsXCIgZmllbGQgaW4gZXhwZW5zZSBzaGVldCBsaW5lcy5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VJbnRlcm5hdGlvbmFsT3B0aW9ucyA9ICgpOiBFeHBlbnNlSW50ZXJuYXRpb25hbE9wdGlvbltdID0+IFtcclxuICB7IHZhbHVlOiB0cnVlLCB0ZXh0OiBpbmRUKFwiRXhwZW5zZVNoZWV0c19JbnRlcm5hdGlvbmFsX1llc1wiLCBcIlNcdTAwRURcIikgfSxcclxuICB7IHZhbHVlOiBmYWxzZSwgdGV4dDogaW5kVChcIkV4cGVuc2VTaGVldHNfSW50ZXJuYXRpb25hbF9Ob1wiLCBcIk5vXCIpIH0sXHJcbl07XHJcblxyXG4vLyBNYXBzIG51bGxhYmxlIGJvb2xlYW4gdmFsdWVzIHRvIGZpeGVkIGVudW0gbGFiZWxzIGZvciByZWFkLW9ubHkgcmVuZGVyaW5nLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUludGVybmF0aW9uYWxMYWJlbCA9ICh2YWx1ZTogYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0ludGVybmF0aW9uYWxfWWVzXCIsIFwiU1x1MDBFRFwiKTtcclxuICB9XHJcblxyXG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcclxuICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19JbnRlcm5hdGlvbmFsX05vXCIsIFwiTm9cIik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gXCItXCI7XHJcbn07XHJcblxyXG4vLyBQYXJzZXMgdXNlciBpbnB1dCBiYWNrIHRvIG51bGxhYmxlIGJvb2xlYW4gZm9yIGZ1dHVyZSBlZGl0IG1vZGUuXHJcbmV4cG9ydCBjb25zdCBwYXJzZUV4cGVuc2VJbnRlcm5hdGlvbmFsVmFsdWUgPSAocmF3OiBzdHJpbmcgfCBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZCk6IGJvb2xlYW4gfCBudWxsID0+IHtcclxuICBpZiAocmF3ID09PSB0cnVlIHx8IHJhdyA9PT0gZmFsc2UpIHtcclxuICAgIHJldHVybiByYXc7XHJcbiAgfVxyXG5cclxuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcgfHwgXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKCF2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBpZiAodmFsdWUgPT09IFwidHJ1ZVwiIHx8IHZhbHVlID09PSBcIjFcIikge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBpZiAodmFsdWUgPT09IFwiZmFsc2VcIiB8fCB2YWx1ZSA9PT0gXCIwXCIpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVNoZWV0Q3JlYXRlTGluZVJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0TGluZSxcclxuICBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVxdWVzdCxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IHBhcnNlRXhwZW5zZUludGVybmF0aW9uYWxWYWx1ZSB9IGZyb20gXCIuLi9jb25zdGFudHMvaW50ZXJuYXRpb25hbE9wdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSwgdG9FeHBlbnNlQXBpRGRNbVl5eXkgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBleGVjdXRlRXhwZW5zZU11dGF0aW9uLCBwYXJzZURlY2ltYWxJbnB1dCB9IGZyb20gXCIuLi9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGNyZWF0ZUV4cGVuc2VTaGVldCxcclxuICBkZWxldGVFeHBlbnNlU2hlZXRMaW5lLFxyXG4gIGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldCxcclxuICBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRGaWxlLFxyXG4gIHVwZGF0ZUV4cGVuc2VTaGVldExpbmUsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIGlzRWRpdExvY2tlZDogYm9vbGVhbjtcclxuICBpc0RlbGV0ZUxvY2tlZDogYm9vbGVhbjtcclxuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkVkaXRFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgc2hlZXRJZDogc3RyaW5nO1xyXG4gIGxpbmVJZDogc3RyaW5nO1xyXG4gIGxpbmU6IEV4cGVuc2VTaGVldExpbmUgfCBudWxsO1xyXG4gIGxpbmtlZFRpY2tldEZpbGVJZDogc3RyaW5nO1xyXG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcclxuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIGRyYWZ0VHlwZVZhbHVlQ29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0UHJpY2U6IHN0cmluZztcclxuICBkcmFmdFF0eTogc3RyaW5nO1xyXG4gIGRyYWZ0UHJvamVjdElkOiBzdHJpbmc7XHJcbiAgZHJhZnRJbnRlcm5hdGlvbmFsOiBzdHJpbmc7XHJcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0QnVzeTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgb25JbnZhbGlkVHlwZT86ICgpID0+IHZvaWQ7XHJcbiAgb25JbnZhbGlkQW1vdW50UXR5PzogKCkgPT4gdm9pZDtcclxuICBvbkNyZWF0ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVMaW5lRGF0ZSA9IChyYXc6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIHRvRXhwZW5zZUFwaURkTW1ZeXl5KHJhdyk7XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZU51bWJlciA9IChyYXc6IHN0cmluZyk6IG51bWJlciB8IG51bGwgPT4gcGFyc2VEZWNpbWFsSW5wdXQocmF3KTtcclxuXHJcbi8vIEVuY2Fwc3VsYXRlcyB1cGRhdGUgYW5kIGRlbGV0ZSBtdXRhdGlvbnMgZm9yIGV4cGVuc2Ugc2hlZXQgbGluZSBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zID0gKHtcclxuICBidXN5LFxyXG4gIGlzRWRpdGluZyxcclxuICBpc0NyZWF0ZU1vZGUsXHJcbiAgaXNFZGl0TG9ja2VkLFxyXG4gIGlzRGVsZXRlTG9ja2VkLFxyXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXHJcbiAgY2FuRWRpdEV4cGVuc2UsXHJcbiAgY2FuRGVsZXRlRXhwZW5zZSxcclxuICBzaGVldElkLFxyXG4gIGxpbmVJZCxcclxuICBsaW5lLFxyXG4gIGxpbmtlZFRpY2tldEZpbGVJZCxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRyYWZ0VHJhbnNEYXRlLFxyXG4gIGRyYWZ0VHlwZVZhbHVlQ29kZSxcclxuICBkcmFmdFByaWNlLFxyXG4gIGRyYWZ0UXR5LFxyXG4gIGRyYWZ0UHJvamVjdElkLFxyXG4gIGRyYWZ0SW50ZXJuYXRpb25hbCxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIHNldEJ1c3ksXHJcbiAgc2V0U3RhdHVzLFxyXG4gIHNldElzRWRpdGluZyxcclxuICBvbkludmFsaWRUeXBlLFxyXG4gIG9uSW52YWxpZEFtb3VudFF0eSxcclxuICBvbkNyZWF0ZVN1Y2Nlc3MsXHJcbn06IFVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XHJcbiAgY29uc3QgaXNOb3RGb3VuZEVycm9yID0gKGVycm9yOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgICByZXR1cm4gZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDA0O1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGlzTWlzc2luZ1RpY2tldEZpbGVNZXNzYWdlID0gKG1lc3NhZ2U6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcobWVzc2FnZSB8fCBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhcmNoaXZvIGFzb2NpYWRvXCIpIHx8XHJcbiAgICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhcmNoaXZvIGFkanVudG9cIikgfHxcclxuICAgICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImFzc29jaWF0ZWQgZmlsZVwiKSB8fFxyXG4gICAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXR0YWNoZWQgZmlsZVwiKVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoaXNFZGl0TG9ja2VkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgY2FuUHJvY2VlZCA9IGlzQ3JlYXRlTW9kZSA/IGNhbkNyZWF0ZUV4cGVuc2UgOiBjYW5FZGl0RXhwZW5zZTtcclxuICAgIGlmICghY2FuUHJvY2VlZCkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IG5vcm1hbGl6ZUxpbmVEYXRlKGRyYWZ0VHJhbnNEYXRlKTtcclxuICAgIGNvbnN0IHBhcnNlZFR5cGVWYWx1ZSA9IE51bWJlci5wYXJzZUludChTdHJpbmcoZHJhZnRUeXBlVmFsdWVDb2RlIHx8IFwiXCIpLnRyaW0oKSwgMTApO1xyXG4gICAgY29uc3QgcGFyc2VkUHJpY2UgPSBwYXJzZU51bWJlcihkcmFmdFByaWNlKTtcclxuICAgIGNvbnN0IHBhcnNlZFF0eSA9IHBhcnNlTnVtYmVyKGRyYWZ0UXR5KTtcclxuICAgIGNvbnN0IHBhcnNlZEludGVybmF0aW9uYWwgPSBwYXJzZUV4cGVuc2VJbnRlcm5hdGlvbmFsVmFsdWUoZHJhZnRJbnRlcm5hdGlvbmFsKTtcclxuXHJcbiAgICBjb25zdCBoYXNWYWxpZFF0eVByaWNlID0gcGFyc2VkUXR5ICE9IG51bGwgJiYgcGFyc2VkUXR5ID4gMCAmJiBwYXJzZWRQcmljZSAhPSBudWxsICYmIHBhcnNlZFByaWNlID4gMDtcclxuICAgIGlmICghaGFzVmFsaWRRdHlQcmljZSkge1xyXG4gICAgICBvbkludmFsaWRBbW91bnRRdHk/LigpO1xyXG4gICAgICBjb25zdCB2YWxpZGF0aW9uTWVzc2FnZSA9IGluZFQoXHJcbiAgICAgICAgXCJFeHBlbnNlU2hlZXRzX0xpbmVfVmFsaWRhdGlvbl9BbW91bnRRdHlcIixcclxuICAgICAgICBcIlF1YW50aXR5IGFuZCBwcmljZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwLlwiXHJcbiAgICAgICk7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IodmFsaWRhdGlvbk1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXModmFsaWRhdGlvbk1lc3NhZ2UpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFub3JtYWxpemVkRGF0ZSkge1xyXG4gICAgICBzZXRNb2RhbEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gICAgICBzZXRTdGF0dXMoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZShwYXJzZWRUeXBlVmFsdWUpIHx8IHBhcnNlZFR5cGVWYWx1ZSA8PSAwKSB7XHJcbiAgICAgIG9uSW52YWxpZFR5cGU/LigpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgIHN0YXJ0U3RhdHVzOiBpc0NyZWF0ZU1vZGVcclxuICAgICAgICA/IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVfRGV0YWlsX0NyZWF0aW5nXCIsIFwiQ3JlYXRpbmcgZXhwZW5zZSBsaW5lLi4uXCIpXHJcbiAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9VcGRhdGluZ1wiLCBcIlVwZGF0aW5nIGV4cGVuc2UgbGluZS4uLlwiKSxcclxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldEJ1c3ksXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29tbW9uTGluZVBheWxvYWQgPSB7XHJcbiAgICAgICAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWREYXRlLFxyXG4gICAgICAgICAgdHlwZVZhbHVlOiBwYXJzZWRUeXBlVmFsdWUsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogU3RyaW5nKGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpLFxyXG4gICAgICAgICAgaW50ZXJuYWNpb25hbDogcGFyc2VkSW50ZXJuYXRpb25hbCA/PyBsaW5lPy5pbnRlcm5hY2lvbmFsID8/IGZhbHNlLFxyXG4gICAgICAgICAgdGlja2V0OiBsaW5lPy50aWNrZXQgPT09IHRydWUsXHJcbiAgICAgICAgICBxdHk6IE51bWJlcihwYXJzZWRRdHkpLFxyXG4gICAgICAgICAgcHJpY2U6IE51bWJlcihwYXJzZWRQcmljZSksXHJcbiAgICAgICAgICBwcm9qSWQ6IFN0cmluZyhkcmFmdFByb2plY3RJZCB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgaW5kQXR0YWNoRmlsZXM6IHNhZmVUZXh0KGxpbmU/LmluZEF0dGFjaEZpbGVzKSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBjcmVhdGVMaW5lUGF5bG9hZDogRXhwZW5zZVNoZWV0Q3JlYXRlTGluZVJlcXVlc3QgPSBjb21tb25MaW5lUGF5bG9hZDtcclxuICAgICAgICBjb25zdCB1cGRhdGVMaW5lUGF5bG9hZDogRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlcXVlc3QgPSBjb21tb25MaW5lUGF5bG9hZDtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBpc0NyZWF0ZU1vZGVcclxuICAgICAgICAgID8gYXdhaXQgY3JlYXRlRXhwZW5zZVNoZWV0KHtcclxuICAgICAgICAgICAgICBtb2RlOiAyLFxyXG4gICAgICAgICAgICAgIGV4aXN0aW5nSG9qYUdhc3Rvc0lkOiBzaGVldElkLFxyXG4gICAgICAgICAgICAgIGxpbmVzOiBbY3JlYXRlTGluZVBheWxvYWRdLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgOiBhd2FpdCB1cGRhdGVFeHBlbnNlU2hlZXRMaW5lKHNoZWV0SWQsIGxpbmVJZCwgdXBkYXRlTGluZVBheWxvYWQpO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfQ3JlYXRlZFwiLCBcIkV4cGVuc2UgbGluZSBjcmVhdGVkXCIpKTtcclxuICAgICAgICAgIG9uQ3JlYXRlU3VjY2VzcygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2UgbGluZSB1cGRhdGVkXCIpKTtcclxuICAgICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICB9LCBbXHJcbiAgICBidXN5LFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICAgIGNhbkVkaXRFeHBlbnNlLFxyXG4gICAgZHJhZnRQcmljZSxcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdEludGVybmF0aW9uYWwsXHJcbiAgICBkcmFmdFByb2plY3RJZCxcclxuICAgIGRyYWZ0UXR5LFxyXG4gICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICBkcmFmdFR5cGVWYWx1ZUNvZGUsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0VkaXRMb2NrZWQsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBsaW5lLFxyXG4gICAgbGluZUlkLFxyXG4gICAgb25DcmVhdGVTdWNjZXNzLFxyXG4gICAgb25JbnZhbGlkQW1vdW50UXR5LFxyXG4gICAgb25JbnZhbGlkVHlwZSxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2hlZXRJZCxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChpc0RlbGV0ZUxvY2tlZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5EZWxldGVFeHBlbnNlKSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBleHBlbnNlIGxpbmUuLi5cIiksXHJcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRXJyb3JcIiwgXCJEZWxldGUgZXJyb3IuXCIpLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRCdXN5LFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNhZmVMaW5rZWRUaWNrZXRGaWxlSWQgPSBzYWZlVGV4dChsaW5rZWRUaWNrZXRGaWxlSWQpO1xyXG4gICAgICAgIGlmIChzYWZlTGlua2VkVGlja2V0RmlsZUlkKSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVGaWxlUmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRGaWxlKHNhZmVMaW5rZWRUaWNrZXRGaWxlSWQpO1xyXG4gICAgICAgICAgICBpZiAoIWRlbGV0ZUZpbGVSZXNwb25zZS5TdWNjZXNzICYmICFpc01pc3NpbmdUaWNrZXRGaWxlTWVzc2FnZShkZWxldGVGaWxlUmVzcG9uc2UuTWVzc2FnZSkpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGVsZXRlRmlsZVJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgaWYgKCFpc05vdEZvdW5kRXJyb3IoZXJyb3IpKSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVUaWNrZXRSZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldChzYWZlTGlua2VkVGlja2V0RmlsZUlkKTtcclxuICAgICAgICAgICAgaWYgKCFkZWxldGVUaWNrZXRSZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRlbGV0ZVRpY2tldFJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgaWYgKCFpc05vdEZvdW5kRXJyb3IoZXJyb3IpKSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0TGluZShzaGVldElkLCBsaW5lSWQpO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfRGVsZXRlZFwiLCBcIkV4cGVuc2UgbGluZSBkZWxldGVkXCIpKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQub2s7XHJcbiAgfSwgW1xyXG4gICAgYnVzeSxcclxuICAgIGNhbkRlbGV0ZUV4cGVuc2UsXHJcbiAgICBpc0RlbGV0ZUxvY2tlZCxcclxuICAgIGxpbmVJZCxcclxuICAgIGxpbmtlZFRpY2tldEZpbGVJZCxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2hlZXRJZCxcclxuICBdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyB9IGZyb20gXCIuLi9ob29rcy91c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnNBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XHJcbiAgYWN0aW9uTW9kZT86IFwiZGVmYXVsdFwiIHwgXCJkZWxldGVfb25seVwiIHwgXCJ2aWV3X29ubHlcIjtcclxuICBwZXJtaXNzaW9uc1JlYWR5PzogYm9vbGVhbjtcclxuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkVkaXRFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgc2hlZXRJZDogc3RyaW5nO1xyXG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcclxuICBjYW5PcGVuU2F2ZUNvbmZpcm0/OiAoKSA9PiBib29sZWFuO1xyXG4gIGhhbmRsZVVwZGF0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBoYW5kbGVEZWxldGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgb25TYXZlU3VjY2VzczogKCkgPT4gdm9pZDtcclxuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcclxuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XHJcbiAgfSkgPT4gdm9pZDtcclxuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBDb29yZGluYXRlcyB0b3BiYXIgaWNvbiBzdGF0ZSBhbmQgZGlzcGF0Y2ggYWN0aW9ucyBmb3IgZXhwZW5zZSBzaGVldCBsaW5lIGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsT3BlbixcclxuICBpc0VkaXRpbmcsXHJcbiAgaXNDcmVhdGVNb2RlLFxyXG4gIGlzTG9ja2VkLFxyXG4gIGFjdGlvbk1vZGUgPSBcImRlZmF1bHRcIixcclxuICBwZXJtaXNzaW9uc1JlYWR5ID0gdHJ1ZSxcclxuICBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gIGNhbkVkaXRFeHBlbnNlLFxyXG4gIGNhbkRlbGV0ZUV4cGVuc2UsXHJcbiAgc2hlZXRJZCxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgaGFuZGxlVXBkYXRlLFxyXG4gIGhhbmRsZURlbGV0ZSxcclxuICBvblNhdmVTdWNjZXNzLFxyXG4gIG9wZW5Db25maXJtLFxyXG4gIGNsb3NlQ29uZmlybSxcclxufTogVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnNBcmdzKSA9PiB7XHJcbiAgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zKHtcclxuICAgIGFjdGlvbkdyb3VwSWQ6IFwiZXhwZW5zZS1saW5lLWRldGFpbC1hY3Rpb25zXCIsXHJcbiAgICBpZHM6IHtcclxuICAgICAgZWRpdEljb25JZDogXCJleHBlbnNlTGluZUVkaXRJY29uXCIsXHJcbiAgICAgIHNhdmVJY29uSWQ6IFwiZXhwZW5zZUxpbmVTYXZlSWNvblwiLFxyXG4gICAgICBkZWxldGVCdG5JZDogXCJleHBlbnNlTGluZURlbGV0ZUJ0blwiLFxyXG4gICAgICBjYW5jZWxCdG5JZDogXCJleHBlbnNlTGluZUNhbmNlbEJ0blwiLFxyXG4gICAgfSxcclxuICAgIGV2ZW50czoge1xyXG4gICAgICBlZGl0RXZlbnQ6IFwiZXhwZW5zZS1saW5lLWRldGFpbC1lZGl0XCIsXHJcbiAgICAgIGRlbGV0ZUV2ZW50OiBcImV4cGVuc2UtbGluZS1kZXRhaWwtZGVsZXRlXCIsXHJcbiAgICAgIGNhbmNlbEV2ZW50OiBcImV4cGVuc2UtbGluZS1kZXRhaWwtY2FuY2VsLWVkaXRcIixcclxuICAgIH0sXHJcbiAgICBidXN5LFxyXG4gICAgbW9kYWxPcGVuLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNMb2NrZWQsXHJcbiAgICBhY3Rpb25Nb2RlLFxyXG4gICAgcGVybWlzc2lvbnNSZWFkeSxcclxuICAgIGNhbkNyZWF0ZTogY2FuQ3JlYXRlRXhwZW5zZSxcclxuICAgIGNhbkVkaXQ6IGNhbkVkaXRFeHBlbnNlLFxyXG4gICAgY2FuRGVsZXRlOiBjYW5EZWxldGVFeHBlbnNlLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlU2F2ZTogaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgc2F2ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiU2F2ZSBjaGFuZ2VzXCIpLFxyXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXHJcbiAgICBzYXZlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXHJcbiAgICBkZWxldGVDb25maXJtVGl0bGU6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9UaXRsZVwiLCBcIkRlbGV0ZVwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiQ29uZmlybV9EZWxldGVfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/XCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpLFxyXG4gICAgb25TYXZlU3VjY2VzcyxcclxuICAgIG9uRGVsZXRlU3VjY2VzczogKCkgPT4ge1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNoZWV0SWQpfWApO1xyXG4gICAgfSxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gIH0pO1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbENvbmZpcm1EaWFsb2dBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxFcnJvcjogc3RyaW5nO1xyXG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbn07XHJcblxyXG4vLyBLZWVwcyBsaW5lIGRldGFpbCBjb25maXJtIGRpYWxvZyB3aXJpbmcgb3V0c2lkZSB0aGUgcGFnZSBjb21wb25lbnQuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsQ29uZmlybURpYWxvZyA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbEVycm9yLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgc2V0U3RhdHVzLFxyXG59OiBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsQ29uZmlybURpYWxvZ0FyZ3MpID0+IHtcclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcclxuICAgICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtLCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXNdKTtcclxuXHJcbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XHJcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcclxuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICFidXN5ICYmIG1vZGFsRXJyb3JcclxuICAgICAgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIilcclxuICAgICAgOiBtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2b2lkIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xyXG4gIH0sIFtidXN5LCBjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbW9kYWxFcnJvcl0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbW9kYWwsXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICAgIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgICBtb2RhbENhbmNlbFRleHQsXHJcbiAgICBtb2RhbENvbmZpcm1UZXh0LFxyXG4gICAgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0SGVhZGVyLCBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldERldGFpbCwgZ2V0RnVlbFByaWNlS20sIG1hcEV4cGVuc2VTaGVldEhlYWRlciwgbWFwRXhwZW5zZVNoZWV0TGluZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLFxyXG4gIG5hdmlnYXRlVG9FeHBlbnNlVXJsLFxyXG4gIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IGhhc0Fzc2lnbmVkVm91Y2hlciwgcGFyc2VFeHBlbnNlRGF0ZSwgc2FmZVRleHQsIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFLCB0b0V4cGVuc2VBcGlEZE1tWXl5eSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcbmltcG9ydCB7IHJlc29sdmVFeHBlbnNlU2hlZXREZXRhaWxQb2xpY3kgfSBmcm9tIFwiLi4vZGV0YWlsL2V4cGVuc2VTaGVldERldGFpbFBvbGljeS50c1wiO1xyXG5pbXBvcnQgeyBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VNYW5hZ2VkVXNlclNjb3BlLnRzXCI7XHJcblxyXG5jb25zdCBLTV9HQVNUT19UWVBFX0NPREUgPSBcIjNcIjtcclxuY29uc3QgRlVFTF9QUklDRV9ERUJPVU5DRV9NUyA9IDMwMDtcclxuY29uc3QgRlVFTF9QUklDRV9TT1VSQ0VfVVNFUl9DT05GSUcgPSBcIkNSTUhvamFHYXN0b3NVc2VyUHJpY2VLbUZlY2hhVGFibGVcIjtcclxuY29uc3QgRlVFTF9QUklDRV9TT1VSQ0VfR0xPQkFMX0NPTkZJRyA9IFwiQ1JNUGFyYW1ldGVyc1wiO1xyXG5jb25zdCBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRCA9IDI7XHJcbmNvbnN0IEVYUEVOU0VfU1RBVFVTX1BBSUQgPSA0O1xyXG5cclxuY29uc3QgdG9JbnB1dERhdGUgPSAocmF3Pzogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBwYXJzZUV4cGVuc2VEYXRlKHJhdyk7XHJcbiAgcmV0dXJuIHBhcnNlZCA/IHRvSXNvRGF0ZShwYXJzZWQpIDogXCJcIjtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdEVkaXRhYmxlTnVtYmVyID0gKHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKHZhbHVlLCB7XHJcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0RWRpdGFibGVRdWFudGl0eSA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcih2YWx1ZSwge1xyXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICBmYWxsYmFjazogXCJcIixcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUZ1ZWxUcmFuc0RhdGUgPSAocmF3OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiB0b0V4cGVuc2VBcGlEZE1tWXl5eShyYXcpO1xyXG59O1xyXG5cclxuLy8gUmVzb2x2ZXMgbG9jYWxpemVkIGZ1ZWwgcHJpY2Ugc291cmNlIG1lc3NhZ2VzIGZvciBrbm93biBiYWNrZW5kIHNvdXJjZXMuXHJcbmNvbnN0IHJlc29sdmVGdWVsUHJpY2VTb3VyY2VNZXNzYWdlID0gKHNvdXJjZTogc3RyaW5nLCBlZmZlY3RpdmVEYXRlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRTb3VyY2UgPSBzYWZlVGV4dChzb3VyY2UpO1xyXG4gIGlmIChub3JtYWxpemVkU291cmNlID09PSBGVUVMX1BSSUNFX1NPVVJDRV9VU0VSX0NPTkZJRykge1xyXG4gICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0Z1ZWxQcmljZV9Tb3VyY2VfVXNlckNvbmZpZ1wiLCBcIk9idGFpbmVkIGJ5IHVzZXIgY29uZmlndXJhdGlvbi5cIik7XHJcbiAgfVxyXG5cclxuICBpZiAobm9ybWFsaXplZFNvdXJjZSA9PT0gRlVFTF9QUklDRV9TT1VSQ0VfR0xPQkFMX0NPTkZJRykge1xyXG4gICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0Z1ZWxQcmljZV9Tb3VyY2VfR2xvYmFsQ29uZmlnXCIsIFwiT2J0YWluZWQgYnkgZ2xvYmFsIGNvbmZpZ3VyYXRpb24uXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc291cmNlTGFiZWwgPSBpbmRUKFwiRXhwZW5zZVNoZWV0c19GdWVsUHJpY2VfU291cmNlXCIsIFwiRnVlbCBwcmljZSBzb3VyY2VcIik7XHJcbiAgaWYgKCFub3JtYWxpemVkU291cmNlKSB7XHJcbiAgICByZXR1cm4gZWZmZWN0aXZlRGF0ZSA/IGAke3NvdXJjZUxhYmVsfTogJHtlZmZlY3RpdmVEYXRlfWAgOiBzb3VyY2VMYWJlbDtcclxuICB9XHJcblxyXG4gIHJldHVybiBlZmZlY3RpdmVEYXRlXHJcbiAgICA/IGAke3NvdXJjZUxhYmVsfTogJHtub3JtYWxpemVkU291cmNlfSAoJHtlZmZlY3RpdmVEYXRlfSlgXHJcbiAgICA6IGAke3NvdXJjZUxhYmVsfTogJHtub3JtYWxpemVkU291cmNlfWA7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZENyZWF0ZUxpbmVEcmFmdCA9IChiYXNlRGF0ZTogc3RyaW5nLCBwcm9qZWN0SWQ6IHN0cmluZyk6IEV4cGVuc2VTaGVldExpbmUgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBsaW5lUmVjSWQ6IFwiXCIsXHJcbiAgICB0cmFuc0RhdGU6IGJhc2VEYXRlLFxyXG4gICAgdHlwZVZhbHVlOiBcIlwiLFxyXG4gICAgdHlwZVZhbHVlQ29kZTogXCJcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxyXG4gICAgaW50ZXJuYWNpb25hbDogZmFsc2UsXHJcbiAgICB0aWNrZXQ6IGZhbHNlLFxyXG4gICAgcHJpY2U6IG51bGwsXHJcbiAgICBxdHk6IDEsXHJcbiAgICBhbW91bnQ6IG51bGwsXHJcbiAgICBwcm9qSWQ6IHByb2plY3RJZCxcclxuICAgIGluZEF0dGFjaEZpbGVzOiBcIlwiLFxyXG4gIH07XHJcbn07XHJcblxyXG50eXBlIFVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZUFyZ3MgPSB7XHJcbiAgaGFzQWNjZXNzOiBib29sZWFuO1xyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGJvb2xlYW47XHJcbiAgY2FuTWFuYWdlT3RoZXJVc2VyczogYm9vbGVhbjtcclxuICBjdXJyZW50QXhVc2VySWQ6IHN0cmluZztcclxuICBjdXJyZW50Q3JtVXNlcklkOiBzdHJpbmc7XHJcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkOiBzdHJpbmc7XHJcbiAgc2hlZXRJZDogc3RyaW5nO1xyXG4gIGxpbmVJZDogc3RyaW5nO1xyXG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcclxuICBzdGFydEluRWRpdE1vZGU6IGJvb2xlYW47XHJcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBPd25zIHN0YXRlIGFuZCBiZWhhdmlvciBmb3IgZXhwZW5zZSBsaW5lIGRldGFpbCBwYWdlIChyZWFkLCBlZGl0LCBjcmVhdGUpLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFN0YXRlID0gKHtcclxuICBoYXNBY2Nlc3MsXHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gIGN1cnJlbnRBeFVzZXJJZCxcclxuICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICBzaGVldElkLFxyXG4gIGxpbmVJZCxcclxuICBpc0NyZWF0ZU1vZGUsXHJcbiAgc3RhcnRJbkVkaXRNb2RlLFxyXG4gIG9uRm9yYmlkZGVuLFxyXG59OiBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGVBcmdzKSA9PiB7XHJcbiAgY29uc3QgW2hlYWRlciwgc2V0SGVhZGVyXSA9IHVzZVN0YXRlPEV4cGVuc2VTaGVldEhlYWRlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtsaW5lLCBzZXRMaW5lXSA9IHVzZVN0YXRlPEV4cGVuc2VTaGVldExpbmUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtpc0VkaXRpbmcsIHNldElzRWRpdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW21vZGFsRXJyb3IsIHNldE1vZGFsRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0RGVzY3JpcHRpb24sIHNldERyYWZ0RGVzY3JpcHRpb25dID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0VHJhbnNEYXRlLCBzZXREcmFmdFRyYW5zRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRUeXBlVmFsdWVDb2RlLCBzZXREcmFmdFR5cGVWYWx1ZUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0UHJpY2UsIHNldERyYWZ0UHJpY2VdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0UXR5LCBzZXREcmFmdFF0eV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRQcm9qZWN0SWQsIHNldERyYWZ0UHJvamVjdElkXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdEludGVybmF0aW9uYWwsIHNldERyYWZ0SW50ZXJuYXRpb25hbF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbaXNGdWVsUHJpY2VMb2FkaW5nLCBzZXRJc0Z1ZWxQcmljZUxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtmdWVsUHJpY2VNZXNzYWdlLCBzZXRGdWVsUHJpY2VNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtmdWVsUHJpY2VNZXNzYWdlSXNFcnJvciwgc2V0RnVlbFByaWNlTWVzc2FnZUlzRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICBjb25zdCBoeWRyYXRlRHJhZnRGcm9tTGluZSA9IHVzZUNhbGxiYWNrKChuZXh0TGluZTogRXhwZW5zZVNoZWV0TGluZSB8IG51bGwsIG5leHRIZWFkZXI6IEV4cGVuc2VTaGVldEhlYWRlciB8IG51bGwpID0+IHtcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24oc2FmZVRleHQobmV4dExpbmU/LmRlc2NyaXB0aW9uKSk7XHJcbiAgICBzZXREcmFmdFRyYW5zRGF0ZSh0b0lucHV0RGF0ZShuZXh0TGluZT8udHJhbnNEYXRlIHx8IG5leHRIZWFkZXI/LmNyZWF0ZWREYXRlKSk7XHJcbiAgICBzZXREcmFmdFR5cGVWYWx1ZUNvZGUoc2FmZVRleHQobmV4dExpbmU/LnR5cGVWYWx1ZUNvZGUpKTtcclxuICAgIHNldERyYWZ0UHJpY2UoZm9ybWF0RWRpdGFibGVOdW1iZXIobmV4dExpbmU/LnByaWNlKSk7XHJcbiAgICBzZXREcmFmdFF0eShmb3JtYXRFZGl0YWJsZVF1YW50aXR5KG5leHRMaW5lPy5xdHkpKTtcclxuICAgIHNldERyYWZ0UHJvamVjdElkKHNhZmVUZXh0KG5leHRMaW5lPy5wcm9qSWQgfHwgbmV4dEhlYWRlcj8ucHJvaklkKSk7XHJcbiAgICBzZXREcmFmdEludGVybmF0aW9uYWwobmV4dExpbmU/LmludGVybmFjaW9uYWwgPT09IHRydWUgPyBcInRydWVcIiA6IG5leHRMaW5lPy5pbnRlcm5hY2lvbmFsID09PSBmYWxzZSA/IFwiZmFsc2VcIiA6IFwiXCIpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGxvYWREZXRhaWwgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGlmICghaGFzQWNjZXNzKSB7XHJcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghc2hlZXRJZCkge1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgbGluZSB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldERldGFpbChzaGVldElkLCB7XHJcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgbGluZSBkZXRhaWwuXCIpKTtcclxuICAgICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3Qgc2hlZXRzID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkU2hlZXQgPVxyXG4gICAgICAgICAgICBzaGVldHMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5Py5Ib2phR2FzdG9zSWQpLnRvVXBwZXJDYXNlKCkgPT09IHNoZWV0SWQudHJpbSgpLnRvVXBwZXJDYXNlKCkpIHx8IHNoZWV0c1swXTtcclxuXHJcbiAgICAgICAgICBpZiAoIXNlbGVjdGVkU2hlZXQpIHtcclxuICAgICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCBsaW5lIHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgbG9hZGVkSGVhZGVyID0gbWFwRXhwZW5zZVNoZWV0SGVhZGVyKHNlbGVjdGVkU2hlZXQpO1xyXG4gICAgICAgICAgY29uc3QgbG9hZGVkU3RhdHVzQ29kZSA9IHR5cGVvZiBsb2FkZWRIZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzID09PSBcIm51bWJlclwiID8gbG9hZGVkSGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA6IG51bGw7XHJcbiAgICAgICAgICBjb25zdCBpc0NyZWF0ZUxvY2tlZFN0YXR1cyA9IGxvYWRlZFN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkVEIHx8IGxvYWRlZFN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX1BBSUQ7XHJcbiAgICAgICAgICBjb25zdCBpc01hbmFnaW5nT3RoZXJVc2VyID0gaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCh7XHJcbiAgICAgICAgICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICAgICAgICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgICAgICAgICAgY3VycmVudENybVVzZXJJZCxcclxuICAgICAgICAgICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgICAgICAgICByZWNvcmRPd25lclVzZXJJZDogbG9hZGVkSGVhZGVyLnVzZXJJZCxcclxuICAgICAgICAgICAgaXNDcmVhdGVNb2RlOiBmYWxzZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgY29uc3QgbG9hZGVkUG9saWN5ID0gcmVzb2x2ZUV4cGVuc2VTaGVldERldGFpbFBvbGljeSh7XHJcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6IGxvYWRlZFN0YXR1c0NvZGUsXHJcbiAgICAgICAgICAgIGlzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICAgICAgICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICAgICAgICAgIGlzUGFpZDogaXNDcmVhdGVMb2NrZWRTdGF0dXMgfHwgaGFzQXNzaWduZWRWb3VjaGVyKGxvYWRlZEhlYWRlci52b3VjaGVyKSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYgKGlzQ3JlYXRlTG9ja2VkU3RhdHVzIHx8IGhhc0Fzc2lnbmVkVm91Y2hlcihsb2FkZWRIZWFkZXIudm91Y2hlcikpIHtcclxuICAgICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9QYWlkUmVhZE9ubHlcIiwgXCJQYWlkIGV4cGVuc2Ugc2hlZXRzIGFyZSByZWFkLW9ubHkuXCIpKTtcclxuICAgICAgICAgICAgc2V0SGVhZGVyKGxvYWRlZEhlYWRlcik7XHJcbiAgICAgICAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChsb2FkZWRQb2xpY3kuaW50ZXJhY3Rpb25Nb2RlICE9PSBcImZ1bGxfZWRpdFwiKSB7XHJcbiAgICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBkcmFmdExpbmUgPSBidWlsZENyZWF0ZUxpbmVEcmFmdCh0b0lzb0RhdGUobmV3IERhdGUoKSksIHNhZmVUZXh0KGxvYWRlZEhlYWRlci5wcm9qSWQpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihsb2FkZWRIZWFkZXIpO1xyXG4gICAgICAgICAgc2V0TGluZShkcmFmdExpbmUpO1xyXG4gICAgICAgICAgc2V0SXNFZGl0aW5nKHRydWUpO1xyXG4gICAgICAgICAgaHlkcmF0ZURyYWZ0RnJvbUxpbmUoZHJhZnRMaW5lLCBsb2FkZWRIZWFkZXIpO1xyXG4gICAgICAgICAgc2V0U3RhdHVzKFwiXCIpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFsaW5lSWQpIHtcclxuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgbGluZSB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldERldGFpbChzaGVldElkLCB7XHJcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlPy5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGxpbmUgZGV0YWlsLlwiKSk7XHJcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2hlZXRzID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZFNoZWV0ID1cclxuICAgICAgICAgIHNoZWV0cy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnk/LkhvamFHYXN0b3NJZCkudG9VcHBlckNhc2UoKSA9PT0gc2hlZXRJZC50cmltKCkudG9VcHBlckNhc2UoKSkgfHwgc2hlZXRzWzBdO1xyXG5cclxuICAgICAgICBpZiAoIXNlbGVjdGVkU2hlZXQpIHtcclxuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgbGluZSB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWFwcGVkSGVhZGVyID0gbWFwRXhwZW5zZVNoZWV0SGVhZGVyKHNlbGVjdGVkU2hlZXQpO1xyXG4gICAgICAgIGNvbnN0IG1hcHBlZExpbmVzID0gKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRTaGVldC5MaW5lcykgPyBzZWxlY3RlZFNoZWV0LkxpbmVzIDogW10pLm1hcCgoZW50cnkpID0+XHJcbiAgICAgICAgICBtYXBFeHBlbnNlU2hlZXRMaW5lKGVudHJ5KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRMaW5lID1cclxuICAgICAgICAgIG1hcHBlZExpbmVzLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeS5saW5lUmVjSWQpLnRvVXBwZXJDYXNlKCkgPT09IGxpbmVJZC50cmltKCkudG9VcHBlckNhc2UoKSkgfHwgbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKCFzZWxlY3RlZExpbmUpIHtcclxuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgbGluZSB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgICBzZXRIZWFkZXIobWFwcGVkSGVhZGVyKTtcclxuICAgICAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRIZWFkZXIobWFwcGVkSGVhZGVyKTtcclxuICAgICAgICBzZXRMaW5lKHNlbGVjdGVkTGluZSk7XHJcbiAgICAgICAgY29uc3QgbG9hZGVkU3RhdHVzQ29kZSA9IHR5cGVvZiBtYXBwZWRIZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzID09PSBcIm51bWJlclwiID8gbWFwcGVkSGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA6IG51bGw7XG4gICAgICAgIGNvbnN0IGxvYWRlZElzU2hlZXRBcHByb3ZlZCA9IGxvYWRlZFN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkVEO1xuICAgICAgICBjb25zdCBsb2FkZWRJc1NoZWV0UGFpZEJ5U3RhdHVzID0gbG9hZGVkU3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfUEFJRDtcbiAgICAgICAgY29uc3QgbG9hZGVkSXNTaGVldFBhaWQgPSBsb2FkZWRJc1NoZWV0UGFpZEJ5U3RhdHVzIHx8IGhhc0Fzc2lnbmVkVm91Y2hlcihtYXBwZWRIZWFkZXIudm91Y2hlcik7XG4gICAgICAgIGNvbnN0IGxvYWRlZEhhc0xpbmtlZFRpY2tldCA9ICEhc2FmZVRleHQoc2VsZWN0ZWRMaW5lLmZpbGVJZCk7XG4gICAgICAgIGNvbnN0IGxvYWRlZElzTWFuYWdpbmdPdGhlclVzZXIgPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkKHtcbiAgICAgICAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICAgICAgICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICAgICAgICBjdXJyZW50Q3JtVXNlcklkLFxuICAgICAgICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcbiAgICAgICAgICByZWNvcmRPd25lclVzZXJJZDogbWFwcGVkSGVhZGVyLnVzZXJJZCxcclxuICAgICAgICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBsb2FkZWRQb2xpY3kgPSByZXNvbHZlRXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5KHtcclxuICAgICAgICAgIHN0YXR1c0NvZGU6IGxvYWRlZFN0YXR1c0NvZGUsXHJcbiAgICAgICAgICBpc01hbmFnaW5nT3RoZXJVc2VyOiBsb2FkZWRJc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgICAgICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgICAgICAgIGlzUGFpZDogbG9hZGVkSXNTaGVldFBhaWQsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChcbiAgICAgICAgICBzdGFydEluRWRpdE1vZGUgJiZcbiAgICAgICAgICAhbG9hZGVkSXNTaGVldEFwcHJvdmVkICYmXG4gICAgICAgICAgIWxvYWRlZElzU2hlZXRQYWlkICYmXG4gICAgICAgICAgIWxvYWRlZEhhc0xpbmtlZFRpY2tldCAmJlxuICAgICAgICAgICFsb2FkZWRJc01hbmFnaW5nT3RoZXJVc2VyICYmXG4gICAgICAgICAgbG9hZGVkUG9saWN5LmludGVyYWN0aW9uTW9kZSA9PT0gXCJmdWxsX2VkaXRcIlxuICAgICAgICApIHtcbiAgICAgICAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XG4gICAgICAgICAgaHlkcmF0ZURyYWZ0RnJvbUxpbmUoc2VsZWN0ZWRMaW5lLCBtYXBwZWRIZWFkZXIpO1xuICAgICAgICAgIHNldFN0YXR1cyhcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGxpbmUgZGV0YWlsLlwiKSk7XHJcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2b2lkIGxvYWREZXRhaWwoKTtcclxuICB9LCBbXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBoeWRyYXRlRHJhZnRGcm9tTGluZSxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIHN0YXJ0SW5FZGl0TW9kZSxcclxuICAgIGxpbmVJZCxcclxuICAgIG9uRm9yYmlkZGVuLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgc2hlZXRJZCxcclxuICBdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghbGluZSB8fCBpc0VkaXRpbmcpIHJldHVybjtcclxuICAgIGh5ZHJhdGVEcmFmdEZyb21MaW5lKGxpbmUsIGhlYWRlcik7XHJcbiAgfSwgW2hlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUxpbmUsIGlzRWRpdGluZywgbGluZV0pO1xyXG5cclxuICBjb25zdCBub3JtYWxpemVkRHJhZnRUeXBlVmFsdWVDb2RlID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChkcmFmdFR5cGVWYWx1ZUNvZGUpLCBbZHJhZnRUeXBlVmFsdWVDb2RlXSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEZ1ZWxUcmFuc0RhdGUgPSB1c2VNZW1vKCgpID0+IG5vcm1hbGl6ZUZ1ZWxUcmFuc0RhdGUoZHJhZnRUcmFuc0RhdGUpLCBbZHJhZnRUcmFuc0RhdGVdKTtcclxuICBjb25zdCBpc0ttVHlwZSA9IG5vcm1hbGl6ZWREcmFmdFR5cGVWYWx1ZUNvZGUgPT09IEtNX0dBU1RPX1RZUEVfQ09ERTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgbGV0IHRpbWVyOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGwgPSBudWxsO1xyXG4gICAgbGV0IGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlciB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0IGNsZWFyUGVuZGluZyA9ICgpID0+IHtcclxuICAgICAgaWYgKHRpbWVyKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgICAgICB0aW1lciA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbnRyb2xsZXIpIHtcclxuICAgICAgICBjb250cm9sbGVyLmFib3J0KCk7XHJcbiAgICAgICAgY29udHJvbGxlciA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKCFpc0VkaXRpbmcgfHwgIWlzS21UeXBlKSB7XHJcbiAgICAgIHNldElzRnVlbFByaWNlTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICBjbGVhclBlbmRpbmcoKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIW5vcm1hbGl6ZWRGdWVsVHJhbnNEYXRlKSB7XHJcbiAgICAgIHNldElzRnVlbFByaWNlTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2UoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNsZWFyUGVuZGluZygpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRpbWVyID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcbiAgICAgIHNldElzRnVlbFByaWNlTG9hZGluZyh0cnVlKTtcclxuICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldEZ1ZWxQcmljZUttKG5vcm1hbGl6ZWRGdWVsVHJhbnNEYXRlLCB7XHJcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MgfHwgIXJlc3BvbnNlLkRhdGEgfHwgIU51bWJlci5pc0Zpbml0ZShOdW1iZXIocmVzcG9uc2UuRGF0YS5QcmljZUttKSkpIHtcclxuICAgICAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2UoXHJcbiAgICAgICAgICAgIHNhZmVUZXh0KHJlc3BvbnNlLk1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0Z1ZWxQcmljZV9Ob3RGb3VuZFwiLCBcIkNvdWxkIG5vdCBsb2FkIGZ1ZWwgcHJpY2UgZm9yIGttLlwiKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRQcmljZSA9IE51bWJlcihyZXNwb25zZS5EYXRhLlByaWNlS20pO1xyXG4gICAgICAgIGlmIChyZXNvbHZlZFByaWNlID4gMCkge1xyXG4gICAgICAgICAgc2V0RHJhZnRQcmljZShmb3JtYXRFZGl0YWJsZU51bWJlcihyZXNvbHZlZFByaWNlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzb3VyY2UgPSBzYWZlVGV4dChyZXNwb25zZS5EYXRhLlNvdXJjZSk7XHJcbiAgICAgICAgY29uc3QgZWZmZWN0aXZlRGF0ZSA9IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGEuVHJhbnNEYXRlKSB8fCBub3JtYWxpemVkRnVlbFRyYW5zRGF0ZTtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gcmVzb2x2ZUZ1ZWxQcmljZVNvdXJjZU1lc3NhZ2Uoc291cmNlLCBlZmZlY3RpdmVEYXRlKTtcclxuICAgICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcclxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHJldHVybjtcclxuXHJcbiAgICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZShcclxuICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3JcclxuICAgICAgICAgICAgPyBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfRnVlbFByaWNlX05vdEZvdW5kXCIsIFwiQ291bGQgbm90IGxvYWQgZnVlbCBwcmljZSBmb3Iga20uXCIpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlSXNFcnJvcih0cnVlKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBpZiAoIWlzQ2FuY2VsbGVkKSB7XHJcbiAgICAgICAgICBzZXRJc0Z1ZWxQcmljZUxvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgRlVFTF9QUklDRV9ERUJPVU5DRV9NUyk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaXNDYW5jZWxsZWQgPSB0cnVlO1xyXG4gICAgICBjbGVhclBlbmRpbmcoKTtcclxuICAgIH07XHJcbiAgfSwgW2lzRWRpdGluZywgaXNLbVR5cGUsIG5vcm1hbGl6ZWRGdWVsVHJhbnNEYXRlXSk7XHJcblxyXG4gIGNvbnN0IGhhc0FjdGl2ZVByb2Nlc3MgPSB1c2VNZW1vKCgpID0+IGJ1c3kgfHwgaXNFZGl0aW5nLCBbYnVzeSwgaXNFZGl0aW5nXSk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoaGFzQWN0aXZlUHJvY2Vzcyk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcclxuICAgIH07XHJcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcclxuXHJcbiAgY29uc3Qgc3RhdHVzQ29kZSA9IHR5cGVvZiBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgOiBudWxsO1xyXG4gIGNvbnN0IGlzU2hlZXRBcHByb3ZlZCA9IHN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkVEO1xyXG4gIGNvbnN0IGlzU2hlZXRQYWlkQnlTdGF0dXMgPSBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19QQUlEO1xyXG4gIGNvbnN0IGlzU2hlZXRQYWlkQnlWb3VjaGVyID0gaGFzQXNzaWduZWRWb3VjaGVyKGhlYWRlcj8udm91Y2hlcik7XHJcbiAgY29uc3QgaXNTaGVldFBhaWQgPSBpc1NoZWV0UGFpZEJ5U3RhdHVzIHx8IGlzU2hlZXRQYWlkQnlWb3VjaGVyO1xyXG4gIGNvbnN0IGlzTWFuYWdpbmdPdGhlclVzZXIgPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkKHtcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgcmVjb3JkT3duZXJVc2VySWQ6IGhlYWRlcj8udXNlcklkLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gIH0pO1xyXG4gIGNvbnN0IGRldGFpbFBvbGljeSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgaWYgKCFoZWFkZXIpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpbnRlcmFjdGlvbk1vZGU6IFwicmVhZF9vbmx5XCIgYXMgY29uc3QsXHJcbiAgICAgICAgc2hvd0ZhYjogZmFsc2UsXHJcbiAgICAgICAgY2FuRGVsZXRlU2hlZXQ6IGZhbHNlLFxyXG4gICAgICAgIHN0YXR1c0FjdGlvbnM6IFtdLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXNvbHZlRXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5KHtcclxuICAgICAgc3RhdHVzQ29kZSxcclxuICAgICAgaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgICAgaXNQYWlkOiBpc1NoZWV0UGFpZCxcclxuICAgIH0pO1xyXG4gIH0sIFthbGxvd1NlbGZNYW5hZ2VtZW50LCBoZWFkZXIsIGlzTWFuYWdpbmdPdGhlclVzZXIsIGlzU2hlZXRQYWlkLCBzdGF0dXNDb2RlXSk7XHJcbiAgY29uc3QgY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyA9IGRldGFpbFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgPT09IFwiZnVsbF9lZGl0XCI7XHJcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZUN1cnJlbnQgPSBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzO1xyXG4gIGNvbnN0IGNhbkVkaXRFeHBlbnNlQ3VycmVudCA9IGNhblVzZUZ1bGxFZGl0RmVhdHVyZXM7XHJcbiAgY29uc3QgY2FuRGVsZXRlRXhwZW5zZUN1cnJlbnQgPSBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzO1xyXG4gIGNvbnN0IGlzU2hlZXRMb2NrZWQgPSAhY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyB8fCBpc1NoZWV0QXBwcm92ZWQgfHwgaXNTaGVldFBhaWQ7XHJcbiAgY29uc3QgbGlua2VkVGlja2V0RmlsZUlkID0gc2FmZVRleHQobGluZT8uZmlsZUlkKTtcclxuICBjb25zdCBoYXNMaW5rZWRUaWNrZXQgPSAhaXNDcmVhdGVNb2RlICYmICEhbGlua2VkVGlja2V0RmlsZUlkO1xyXG4gIGNvbnN0IGlzTGluZUVkaXRMb2NrZWQgPSBpc1NoZWV0TG9ja2VkIHx8IGhhc0xpbmtlZFRpY2tldDtcclxuICBjb25zdCBpc0xpbmVEZWxldGVMb2NrZWQgPSBpc1NoZWV0TG9ja2VkO1xyXG4gIGNvbnN0IGlzTGluZUxvY2tlZCA9IGlzTGluZUVkaXRMb2NrZWQ7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlIHx8IGlzTG9hZGluZyB8fCAhaGVhZGVyIHx8ICFsaW5lIHx8IGlzTGluZUVkaXRMb2NrZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY2FuRWRpdEV4cGVuc2VDdXJyZW50KSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xyXG4gICAgaHlkcmF0ZURyYWZ0RnJvbUxpbmUobGluZSwgaGVhZGVyKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIikpO1xyXG4gIH0sIFtjYW5FZGl0RXhwZW5zZUN1cnJlbnQsIGhlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUxpbmUsIGlzQ3JlYXRlTW9kZSwgaXNMaW5lRWRpdExvY2tlZCwgaXNMb2FkaW5nLCBsaW5lLCBvbkZvcmJpZGRlbl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzaGVldElkKX1gO1xyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwsIHtcclxuICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc0VkaXRpbmcpIHJldHVybjtcclxuXHJcbiAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGh5ZHJhdGVEcmFmdEZyb21MaW5lKGxpbmUsIGhlYWRlcik7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xyXG4gIH0sIFtoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21MaW5lLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgbGluZSwgc2hlZXRJZF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlTW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZUN1cnJlbnQgfHwgIXNoZWV0SWQgfHwgaXNTaGVldExvY2tlZCkge1xyXG4gICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0TGluZURldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCl9Jm1vZGU9Y3JlYXRlYDtcclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xyXG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcclxuICAgIH0pO1xyXG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlQ3VycmVudCwgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIGlzU2hlZXRMb2NrZWQsIG9uRm9yYmlkZGVuLCBzaGVldElkXSk7XHJcblxyXG4gIGNvbnN0IG5hdmlnYXRlVG9TaGVldERldGFpbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQoc2hlZXRJZCk7XHJcbiAgICBpZiAoIXNhZmVTaGVldElkKSByZXR1cm47XHJcbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVTaGVldElkKX1gO1xyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsKTtcclxuICB9LCBbc2hlZXRJZF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGVhZGVyLFxyXG4gICAgbGluZSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGJ1c3ksXHJcbiAgICBzdGF0dXMsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtb2RhbEVycm9yLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0VHJhbnNEYXRlLFxyXG4gICAgZHJhZnRUeXBlVmFsdWVDb2RlLFxyXG4gICAgZHJhZnRQcmljZSxcclxuICAgIGRyYWZ0UXR5LFxyXG4gICAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgICBkcmFmdEludGVybmF0aW9uYWwsXHJcbiAgICBpc0ttVHlwZSxcclxuICAgIGlzRnVlbFByaWNlTG9hZGluZyxcclxuICAgIGZ1ZWxQcmljZU1lc3NhZ2UsXHJcbiAgICBmdWVsUHJpY2VNZXNzYWdlSXNFcnJvcixcclxuICAgIGlzU2hlZXRQYWlkLFxyXG4gICAgaXNTaGVldExvY2tlZCxcclxuICAgIGlzTGluZUVkaXRMb2NrZWQsXHJcbiAgICBpc0xpbmVEZWxldGVMb2NrZWQsXHJcbiAgICBpc0xpbmVMb2NrZWQsXHJcbiAgICBoYXNMaW5rZWRUaWNrZXQsXHJcbiAgICBsaW5rZWRUaWNrZXRGaWxlSWQsXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlQ3VycmVudCxcclxuICAgIGNhbkVkaXRFeHBlbnNlQ3VycmVudCxcclxuICAgIGNhbkRlbGV0ZUV4cGVuc2VDdXJyZW50LFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRUcmFuc0RhdGUsXHJcbiAgICBzZXREcmFmdFR5cGVWYWx1ZUNvZGUsXHJcbiAgICBzZXREcmFmdFByaWNlLFxyXG4gICAgc2V0RHJhZnRRdHksXHJcbiAgICBzZXREcmFmdFByb2plY3RJZCxcclxuICAgIHNldERyYWZ0SW50ZXJuYXRpb25hbCxcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlT3BlbkNyZWF0ZU1vZGUsXHJcbiAgICBuYXZpZ2F0ZVRvU2hlZXREZXRhaWwsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHBhcnNlRGVjaW1hbElucHV0IH0gZnJvbSBcIi4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VTaGVldExpbmVUeXBlVmFsaWRhdGlvbkFyZ3MgPSB7XHJcbiAgZHJhZnRUeXBlVmFsdWVDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRQcmljZTogc3RyaW5nO1xyXG4gIGRyYWZ0UXR5OiBzdHJpbmc7XHJcbiAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXREcmFmdFByaWNlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXREcmFmdFF0eTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbn07XHJcblxyXG4vLyBLZWVwcyBsaW5lIHNhdmUgdmFsaWRhdGlvbiBsb2NhbCBzbyBzYXZlIGZsb3cgY2FuIGJsb2NrIGJlZm9yZSBvcGVuaW5nIHRoZSBtb2RhbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldExpbmVUeXBlVmFsaWRhdGlvbiA9ICh7XHJcbiAgZHJhZnRUeXBlVmFsdWVDb2RlLFxyXG4gIGRyYWZ0UHJpY2UsXHJcbiAgZHJhZnRRdHksXHJcbiAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlLFxyXG4gIHNldERyYWZ0UHJpY2UsXHJcbiAgc2V0RHJhZnRRdHksXHJcbn06IFVzZUV4cGVuc2VTaGVldExpbmVUeXBlVmFsaWRhdGlvbkFyZ3MpID0+IHtcclxuICBjb25zdCBbdHlwZUludmFsaWQsIHNldFR5cGVJbnZhbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbcHJpY2VJbnZhbGlkLCBzZXRQcmljZUludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtxdHlJbnZhbGlkLCBzZXRRdHlJbnZhbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCB0eXBlSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHByaWNlSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHF0eUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuXHJcbiAgY29uc3QgZm9jdXNUeXBlRmllbGQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRUeXBlSW52YWxpZCh0cnVlKTtcclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICB0eXBlSW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcclxuICAgIH0pO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgZm9jdXNBbW91bnRGaWVsZHMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBwYXJzZWRRdHkgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFF0eSk7XHJcbiAgICBjb25zdCBwYXJzZWRQcmljZSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0UHJpY2UpO1xyXG4gICAgY29uc3QgcXR5SXNWYWxpZCA9IHBhcnNlZFF0eSAhPSBudWxsICYmIHBhcnNlZFF0eSA+IDA7XHJcbiAgICBjb25zdCBwcmljZUlzVmFsaWQgPSBwYXJzZWRQcmljZSAhPSBudWxsICYmIHBhcnNlZFByaWNlID4gMDtcclxuXHJcbiAgICBzZXRRdHlJbnZhbGlkKCFxdHlJc1ZhbGlkKTtcclxuICAgIHNldFByaWNlSW52YWxpZCghcHJpY2VJc1ZhbGlkKTtcclxuXHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgaWYgKCFxdHlJc1ZhbGlkKSB7XHJcbiAgICAgICAgcXR5SW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghcHJpY2VJc1ZhbGlkKSB7XHJcbiAgICAgICAgcHJpY2VJbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LCBbZHJhZnRQcmljZSwgZHJhZnRRdHldKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICBzZXRUeXBlSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIHNldERyYWZ0VHlwZVZhbHVlQ29kZSh2YWx1ZSk7XHJcbiAgICB9LFxyXG4gICAgW3NldERyYWZ0VHlwZVZhbHVlQ29kZV1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVEcmFmdFByaWNlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICBzZXRQcmljZUludmFsaWQoZmFsc2UpO1xyXG4gICAgICBzZXREcmFmdFByaWNlKHZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBbc2V0RHJhZnRQcmljZV1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVEcmFmdFF0eUNoYW5nZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgICAgc2V0UXR5SW52YWxpZChmYWxzZSk7XHJcbiAgICAgIHNldERyYWZ0UXR5KHZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBbc2V0RHJhZnRRdHldXHJcbiAgKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHBhcnNlZFByaWNlID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRQcmljZSk7XHJcbiAgICBpZiAocGFyc2VkUHJpY2UgIT0gbnVsbCAmJiBwYXJzZWRQcmljZSA+IDApIHtcclxuICAgICAgc2V0UHJpY2VJbnZhbGlkKGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbZHJhZnRQcmljZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgcGFyc2VkUXR5ID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRRdHkpO1xyXG4gICAgaWYgKHBhcnNlZFF0eSAhPSBudWxsICYmIHBhcnNlZFF0eSA+IDApIHtcclxuICAgICAgc2V0UXR5SW52YWxpZChmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW2RyYWZ0UXR5XSk7XHJcblxyXG4gIGNvbnN0IGNhbk9wZW5TYXZlQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHBhcnNlZFR5cGVWYWx1ZSA9IE51bWJlci5wYXJzZUludChTdHJpbmcoZHJhZnRUeXBlVmFsdWVDb2RlIHx8IFwiXCIpLnRyaW0oKSwgMTApO1xyXG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUocGFyc2VkVHlwZVZhbHVlKSB8fCBwYXJzZWRUeXBlVmFsdWUgPD0gMCkge1xyXG4gICAgICBmb2N1c1R5cGVGaWVsZCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFyc2VkUHJpY2UgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFByaWNlKTtcclxuICAgIGNvbnN0IHBhcnNlZFF0eSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0UXR5KTtcclxuICAgIGNvbnN0IGhhc1ZhbGlkUXR5UHJpY2UgPSBwYXJzZWRRdHkgIT0gbnVsbCAmJiBwYXJzZWRRdHkgPiAwICYmIHBhcnNlZFByaWNlICE9IG51bGwgJiYgcGFyc2VkUHJpY2UgPiAwO1xyXG4gICAgaWYgKGhhc1ZhbGlkUXR5UHJpY2UpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZm9jdXNBbW91bnRGaWVsZHMoKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LCBbZHJhZnRQcmljZSwgZHJhZnRRdHksIGRyYWZ0VHlwZVZhbHVlQ29kZSwgZm9jdXNBbW91bnRGaWVsZHMsIGZvY3VzVHlwZUZpZWxkXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlSW52YWxpZCxcclxuICAgIHByaWNlSW52YWxpZCxcclxuICAgIHF0eUludmFsaWQsXHJcbiAgICB0eXBlSW5wdXRSZWYsXHJcbiAgICBwcmljZUlucHV0UmVmLFxyXG4gICAgcXR5SW5wdXRSZWYsXHJcbiAgICBmb2N1c1R5cGVGaWVsZCxcclxuICAgIGZvY3VzQW1vdW50RmllbGRzLFxyXG4gICAgaGFuZGxlRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlLFxyXG4gICAgaGFuZGxlRHJhZnRQcmljZUNoYW5nZSxcclxuICAgIGhhbmRsZURyYWZ0UXR5Q2hhbmdlLFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gIH07XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBaUU7OztBQ3lHM0Q7QUFwRE4sSUFBTSxpQkFBaUIsQ0FBQyxVQUE2QztBQUNuRSxTQUFPLG9CQUFvQixPQUFPO0FBQUEsSUFDaEMsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsSUFDdkIsYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLEVBQ1osQ0FBQztBQUNIO0FBR0EsSUFBTSx1QkFBdUIsQ0FBQztBQUFBLEVBQzVCO0FBQUEsRUFDQTtBQUFBLEVBQ0Esa0JBQWtCO0FBQUEsRUFDbEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsY0FBYztBQUFBLEVBQ2QsZUFBZTtBQUFBLEVBQ2YsYUFBYTtBQUFB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QUFBLFFBQ0EsdUJBQXVCO0FBQUEsUUFDdkIsb0JBQW9CO0FBQUE7QUFBQSxJQUN0QixJQUNFO0FBQUEsS0FFTjtBQUVKO0FBR0EsSUFBTSw2QkFBNkIsTUFBTTtBQUN2QyxTQUNFLDZDQUFDLGdDQUFxQix5QkFBdUIsTUFDM0MsdURBQUMsaUNBQThCLEdBQ2pDO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSwwQkFBMEI7QUFDakUsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQyw4QkFBMkIsQ0FBRTtBQUN6RDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8scUNBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgInJlc3BvbnNlIiwgInNoZWV0cyIsICJzZWxlY3RlZFNoZWV0IiwgImxvYWRlZFN0YXR1c0NvZGUiLCAiaXNNYW5hZ2luZ090aGVyVXNlciIsICJsb2FkZWRQb2xpY3kiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
