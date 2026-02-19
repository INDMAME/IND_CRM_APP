import {
  SingleDatePicker
} from "./chunks/chunk-M7JWNVNF.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-OIXZFBF6.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-SKJH2HTO.js";
import "./chunks/chunk-K7MECJ5E.js";
import {
  ExpenseProjectFilterInput_default,
  clearExpenseNavigationGuard,
  configureExpenseApiAuth,
  createExpenseSheet,
  deleteExpenseSheetLine,
  fetchExpenseSheetDetail,
  formatAmountWithCurrency,
  formatExpenseDisplayDate,
  getFuelPriceKm,
  hasAssignedVoucher,
  mapExpenseSheetHeader,
  mapExpenseSheetLine,
  navigateToExpenseUrl,
  parseExpenseDate,
  safeText,
  setExpenseNavigationGuard,
  toIsoDate,
  updateExpenseSheetLine
} from "./chunks/chunk-2CQI6C7W.js";
import {
  SelectCombobox_default,
  VisitasPageProviders_default
} from "./chunks/chunk-XJBPFDRJ.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-3H4F5G6V.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  ApiFetchError,
  canAccess,
  indT,
  showPermissionModal
} from "./chunks/chunk-OO4T3BDP.js";
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
              className: "form-control",
              type: "number",
              step: "any",
              inputMode: "decimal",
              value: draftPrice,
              onChange: (event) => onDraftPriceChange(event.target.value || ""),
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
              type: "number",
              step: "any",
              inputMode: "decimal",
              value: draftQty,
              onChange: (event) => onDraftQtyChange(event.target.value || ""),
              "aria-label": indT("ExpenseSheets_Field_Qty", "Quantity")
            }
          )
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ExpenseReadOnlyField_default,
          {
            label: indT("ExpenseSheets_Field_Qty", "Quantity"),
            value: line.qty != null ? String(line.qty) : "-"
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

// Web/wwwroot/react/src/pages/gastos/utils/expenseSelectOptions.ts
var normalizeExpenseOptionValue = (value) => {
  return String(value ?? "").trim();
};
var mapWindowEnumOptions = (source) => {
  return source.map((item) => ({
    value: normalizeExpenseOptionValue(item?.value ?? item?.Value),
    text: normalizeExpenseOptionValue(item?.text ?? item?.Text)
  })).filter((item) => item.value && item.text);
};
var mapBooleanEnumOptions = (source) => {
  return source.map((item) => ({
    value: item.value ? "true" : "false",
    text: normalizeExpenseOptionValue(item.text)
  }));
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
var toInputDate = (raw) => {
  const parsed = parseExpenseDate(raw);
  return parsed ? toIsoDate(parsed) : "";
};
var formatEditableNumber = (value) => {
  if (value === null || value === void 0 || Number.isNaN(Number(value))) {
    return "";
  }
  return String(value);
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
    setDraftQty(formatEditableNumber(nextLine?.qty));
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
          if (hasAssignedVoucher(loadedHeader.voucher)) {
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
        const message = source ? `${indT("ExpenseSheets_FuelPrice_Source", "Fuel price source")}: ${source} (${effectiveDate})` : `${indT("ExpenseSheets_FuelPrice_Source", "Fuel price source")}: ${effectiveDate}`;
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
  const isSheetPaid = hasAssignedVoucher(header?.voucher);
  const handleEnableEdit = (0, import_react2.useCallback)(() => {
    if (isCreateMode || isLoading || !header || !line || isSheetPaid) {
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
  }, [canEditExpense, header, hydrateDraftFromLine, isCreateMode, isLoading, isSheetPaid, line, onForbidden]);
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
    if (!canCreateExpense || !sheetId) {
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
  }, [canCreateExpense, isCreateMode, isEditing, onForbidden, sheetId]);
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
    isSheetPaid,
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
    isLocked: isSheetPaid,
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
    isLocked: isSheetPaid,
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
    canCreateExpense && !isCreateMode ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL0V4cGVuc2VTaGVldExpbmVEZXRhaWxQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0TGluZUZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2ludGVybmF0aW9uYWxPcHRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxNdXRhdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGluZS91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3hcIjtcbmltcG9ydCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeFwiO1xuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IEV4cGVuc2VTaGVldExpbmVGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VTaGVldExpbmVGb3JtLnRzeFwiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZUludGVybmF0aW9uYWxMYWJlbCwgZ2V0RXhwZW5zZUludGVybmF0aW9uYWxPcHRpb25zIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9pbnRlcm5hdGlvbmFsT3B0aW9ucy50c1wiO1xuaW1wb3J0IHsgcGFyc2VEZWNpbWFsSW5wdXQgfSBmcm9tIFwiLi4vaG9va3MvZXhwZW5zZU11dGF0aW9uVXRpbHMudHNcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQge1xuICBtYXBCb29sZWFuRW51bU9wdGlvbnMsXG4gIG1hcFdpbmRvd0VudW1PcHRpb25zLFxuICB0eXBlIEV4cGVuc2VTZWxlY3RPcHRpb24sXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxNdXRhdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxTdGF0ZS50c1wiO1xuXG4vLyBJbml0aWFsaXplcyBhdXRoIHNlZWQgZm9yIGV4cGVuc2UgQVBJIGNhbGxzIGJlZm9yZSBpc2xhbmQgZWZmZWN0cyBydW4uXG5jb25zdCBib290c3RyYXBFeHBlbnNlQXBpQXV0aCA9ICgpID0+IHtcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgoe1xuICAgIHRva2VuOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxuICAgIGVudHJhT2lkOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcbiAgfSk7XG59O1xuXG5jb25zdCBFeHBlbnNlU2hlZXRMaW5lRGV0YWlsQ29udGVudCA9ICgpID0+IHtcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJWaWV3XCIpO1xuICBjb25zdCBjYW5FZGl0RXhwZW5zZSA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiRWRpdFwiKTtcbiAgY29uc3QgY2FuRGVsZXRlRXhwZW5zZSA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiRnVsbEFjY2Vzc1wiKTtcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZSA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiQWRkXCIpO1xuICBjb25zdCBzaGVldElkID0gc2FmZVRleHQod2luZG93Ll9fRVhQRU5TRV9TSEVFVF9JRF9fKTtcbiAgY29uc3QgbGluZUlkID0gc2FmZVRleHQod2luZG93Ll9fRVhQRU5TRV9MSU5FX0lEX18pO1xuICBjb25zdCBsaW5lTW9kZSA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfTElORV9NT0RFX18pLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGlzQ3JlYXRlTW9kZSA9IGxpbmVNb2RlID09PSBcImNyZWF0ZVwiO1xuICBjb25zdCBbaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLCBzZXRJc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IHtcbiAgICBoZWFkZXIsXG4gICAgbGluZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGJ1c3ksXG4gICAgc3RhdHVzLFxuICAgIGlzRWRpdGluZyxcbiAgICBtb2RhbEVycm9yLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRUcmFuc0RhdGUsXG4gICAgZHJhZnRUeXBlVmFsdWVDb2RlLFxuICAgIGRyYWZ0UHJpY2UsXG4gICAgZHJhZnRRdHksXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgZHJhZnRJbnRlcm5hdGlvbmFsLFxuICAgIGlzS21UeXBlLFxuICAgIGlzRnVlbFByaWNlTG9hZGluZyxcbiAgICBmdWVsUHJpY2VNZXNzYWdlLFxuICAgIGZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yLFxuICAgIGlzU2hlZXRQYWlkLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXG4gICAgc2V0RHJhZnRUcmFuc0RhdGUsXG4gICAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlLFxuICAgIHNldERyYWZ0UHJpY2UsXG4gICAgc2V0RHJhZnRRdHksXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXG4gICAgc2V0RHJhZnRJbnRlcm5hdGlvbmFsLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVPcGVuQ3JlYXRlTW9kZSxcbiAgICBuYXZpZ2F0ZVRvU2hlZXREZXRhaWwsXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGUoe1xuICAgIGhhc0FjY2VzcyxcbiAgICBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGNhbkVkaXRFeHBlbnNlLFxuICAgIHNoZWV0SWQsXG4gICAgbGluZUlkLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcbiAgfSk7XG5cbiAgY29uc3QgZHJhZnRQcmljZVZhbHVlID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRQcmljZSk7XG4gIGNvbnN0IGRyYWZ0UXR5VmFsdWUgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFF0eSk7XG4gIGNvbnN0IGNhbGN1bGF0ZWRBbW91bnRQcmV2aWV3ID1cbiAgICBpc0VkaXRpbmcgJiYgZHJhZnRQcmljZVZhbHVlICE9IG51bGwgJiYgZHJhZnRQcmljZVZhbHVlID4gMCAmJiBkcmFmdFF0eVZhbHVlICE9IG51bGwgJiYgZHJhZnRRdHlWYWx1ZSA+IDBcbiAgICAgID8gZHJhZnRQcmljZVZhbHVlICogZHJhZnRRdHlWYWx1ZVxuICAgICAgOiBsaW5lPy5hbW91bnQgPz8gbnVsbDtcbiAgY29uc3QgcHJpY2VUZXh0ID0gdXNlTWVtbyhcbiAgICAoKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kobGluZT8ucHJpY2UgPz8gbnVsbCwgc2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpKSxcbiAgICBbaGVhZGVyPy5jdXJyZW5jeUNvZGUsIGxpbmU/LnByaWNlXVxuICApO1xuICBjb25zdCBhbW91bnRUZXh0ID0gdXNlTWVtbyhcbiAgICAoKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koY2FsY3VsYXRlZEFtb3VudFByZXZpZXcsIHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSksXG4gICAgW2NhbGN1bGF0ZWRBbW91bnRQcmV2aWV3LCBoZWFkZXI/LmN1cnJlbmN5Q29kZV1cbiAgKTtcbiAgY29uc3QgcHJvamVjdFZhbHVlID0gc2FmZVRleHQobGluZT8ucHJvaklkIHx8IGhlYWRlcj8ucHJvaklkKTtcbiAgY29uc3Qgc2hlZXREZXNjcmlwdGlvbiA9IHNhZmVUZXh0KGhlYWRlcj8uZGVzY3JpcHRpb24pIHx8IFwiLVwiO1xuICBjb25zdCBpbnRlcm5hY2lvbmFsTGFiZWwgPSBnZXRFeHBlbnNlSW50ZXJuYXRpb25hbExhYmVsKGxpbmU/LmludGVybmFjaW9uYWwpO1xuXG4gIGNvbnN0IGdhc3RvVHlwZU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4ge1xuICAgIGNvbnN0IHNvdXJjZSA9IEFycmF5LmlzQXJyYXkod2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fKSA/IHdpbmRvdy5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXyA6IFtdO1xuICAgIGNvbnN0IG1hcHBlZCA9IG1hcFdpbmRvd0VudW1PcHRpb25zKHNvdXJjZSk7XG5cbiAgICBjb25zdCBjdXJyZW50VHlwZUNvZGUgPSBzYWZlVGV4dChsaW5lPy50eXBlVmFsdWVDb2RlKTtcbiAgICBjb25zdCBjdXJyZW50VHlwZUxhYmVsID0gc2FmZVRleHQobGluZT8udHlwZVZhbHVlKTtcbiAgICBpZiAoY3VycmVudFR5cGVDb2RlICYmICFtYXBwZWQuc29tZSgoaXRlbSkgPT4gaXRlbS52YWx1ZSA9PT0gY3VycmVudFR5cGVDb2RlKSkge1xuICAgICAgbWFwcGVkLnB1c2goe1xuICAgICAgICB2YWx1ZTogY3VycmVudFR5cGVDb2RlLFxuICAgICAgICB0ZXh0OiBjdXJyZW50VHlwZUxhYmVsIHx8IGN1cnJlbnRUeXBlQ29kZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXBwZWQ7XG4gIH0sIFtsaW5lPy50eXBlVmFsdWUsIGxpbmU/LnR5cGVWYWx1ZUNvZGVdKTtcblxuICBjb25zdCBpbnRlcm5hdGlvbmFsT3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPihcbiAgICAoKSA9PiBtYXBCb29sZWFuRW51bU9wdGlvbnMoZ2V0RXhwZW5zZUludGVybmF0aW9uYWxPcHRpb25zKCkpLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xuICAgICAgYnVzeSxcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xuICAgICAgICBzZXRTdGF0dXMobXNnKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtLCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXNdKTtcblxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcbiAgICA6ICFidXN5ICYmIG1vZGFsRXJyb3JcbiAgICAgID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpXG4gICAgICA6IG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpO1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xuICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xuICB9LCBbYnVzeSwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm0sIG1vZGFsRXJyb3JdKTtcblxuICBjb25zdCB7IGhhbmRsZVVwZGF0ZSwgaGFuZGxlRGVsZXRlIH0gPSB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zKHtcbiAgICBidXN5LFxuICAgIGlzRWRpdGluZyxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNMb2NrZWQ6IGlzU2hlZXRQYWlkLFxuICAgIGNhbkNyZWF0ZUV4cGVuc2UsXG4gICAgY2FuRWRpdEV4cGVuc2UsXG4gICAgY2FuRGVsZXRlRXhwZW5zZSxcbiAgICBzaGVldElkLFxuICAgIGxpbmVJZCxcbiAgICBsaW5lLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRUcmFuc0RhdGUsXG4gICAgZHJhZnRUeXBlVmFsdWVDb2RlLFxuICAgIGRyYWZ0UHJpY2UsXG4gICAgZHJhZnRRdHksXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgZHJhZnRJbnRlcm5hdGlvbmFsLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNFZGl0aW5nLFxuICAgIG9uQ3JlYXRlU3VjY2VzczogKCkgPT4ge30sXG4gIH0pO1xuXG4gIHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zKHtcbiAgICBidXN5OiBidXN5IHx8IGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSxcbiAgICBtb2RhbE9wZW46IG1vZGFsLm9wZW4sXG4gICAgaXNFZGl0aW5nLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBpc0xvY2tlZDogaXNTaGVldFBhaWQsXG4gICAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgICBjYW5FZGl0RXhwZW5zZSxcbiAgICBjYW5EZWxldGVFeHBlbnNlLFxuICAgIHNoZWV0SWQsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlVXBkYXRlLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgICBvblNhdmVTdWNjZXNzOiAoKSA9PiB7XG4gICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICAgIHNldElzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSh0cnVlKTtcbiAgICAgICAgbmF2aWdhdGVUb1NoZWV0RGV0YWlsKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0sXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgY2xvc2VDb25maXJtLFxuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICA8Q29uZmlybU1vZGFsXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsQ29uZmlybVRleHR9XG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cbiAgICAgICAgYnVzeT17YnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGV9XG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cbiAgICAgICAgb25Db25maXJtPXtoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm19XG4gICAgICAgIG9uQ2FuY2VsPXtjbG9zZUNvbmZpcm19XG4gICAgICAvPlxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XG4gICAgICA+XG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7ZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntlcnJvck1lc3NhZ2V9PC9kaXY+IDogbnVsbH1cblxuICAgICAgeyFpc0xvYWRpbmcgJiYgIWlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhZXJyb3JNZXNzYWdlICYmIGxpbmUgPyAoXG4gICAgICAgIDxFeHBlbnNlU2hlZXRMaW5lRm9ybVxuICAgICAgICAgIGxpbmU9e2xpbmV9XG4gICAgICAgICAgZmFsbGJhY2tEYXRlPXtzYWZlVGV4dChoZWFkZXI/LmNyZWF0ZWREYXRlKX1cbiAgICAgICAgICBzaGVldERlc2NyaXB0aW9uPXtzaGVldERlc2NyaXB0aW9ufVxuICAgICAgICAgIHByb2plY3RWYWx1ZT17cHJvamVjdFZhbHVlfVxuICAgICAgICAgIHByaWNlVGV4dD17cHJpY2VUZXh0fVxuICAgICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XG4gICAgICAgICAgaW50ZXJuYWNpb25hbExhYmVsPXtpbnRlcm5hY2lvbmFsTGFiZWx9XG4gICAgICAgICAgaXNLbVR5cGU9e2lzS21UeXBlfVxuICAgICAgICAgIGlzRnVlbFByaWNlTG9hZGluZz17aXNGdWVsUHJpY2VMb2FkaW5nfVxuICAgICAgICAgIGZ1ZWxQcmljZU1lc3NhZ2U9e2Z1ZWxQcmljZU1lc3NhZ2V9XG4gICAgICAgICAgZnVlbFByaWNlTWVzc2FnZUlzRXJyb3I9e2Z1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yfVxuICAgICAgICAgIHN0YXR1cz17c3RhdHVzfVxuICAgICAgICAgIGlzRWRpdGluZz17aXNFZGl0aW5nfVxuICAgICAgICAgIGdhc3RvVHlwZU9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XG4gICAgICAgICAgaW50ZXJuYXRpb25hbE9wdGlvbnM9e2ludGVybmF0aW9uYWxPcHRpb25zfVxuICAgICAgICAgIGRyYWZ0RGVzY3JpcHRpb249e2RyYWZ0RGVzY3JpcHRpb259XG4gICAgICAgICAgZHJhZnRUcmFuc0RhdGU9e2RyYWZ0VHJhbnNEYXRlfVxuICAgICAgICAgIGRyYWZ0VHlwZVZhbHVlQ29kZT17ZHJhZnRUeXBlVmFsdWVDb2RlfVxuICAgICAgICAgIGRyYWZ0UHJpY2U9e2RyYWZ0UHJpY2V9XG4gICAgICAgICAgZHJhZnRRdHk9e2RyYWZ0UXR5fVxuICAgICAgICAgIGRyYWZ0UHJvamVjdElkPXtkcmFmdFByb2plY3RJZH1cbiAgICAgICAgICBkcmFmdEludGVybmF0aW9uYWw9e2RyYWZ0SW50ZXJuYXRpb25hbH1cbiAgICAgICAgICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U9e3NldERyYWZ0RGVzY3JpcHRpb259XG4gICAgICAgICAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZT17c2V0RHJhZnRUcmFuc0RhdGV9XG4gICAgICAgICAgb25EcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2U9e3NldERyYWZ0VHlwZVZhbHVlQ29kZX1cbiAgICAgICAgICBvbkRyYWZ0UHJpY2VDaGFuZ2U9e3NldERyYWZ0UHJpY2V9XG4gICAgICAgICAgb25EcmFmdFF0eUNoYW5nZT17c2V0RHJhZnRRdHl9XG4gICAgICAgICAgb25EcmFmdFByb2plY3RJZENoYW5nZT17c2V0RHJhZnRQcm9qZWN0SWR9XG4gICAgICAgICAgb25EcmFmdEludGVybmF0aW9uYWxDaGFuZ2U9e3NldERyYWZ0SW50ZXJuYXRpb25hbH1cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7Y2FuQ3JlYXRlRXhwZW5zZSAmJiAhaXNDcmVhdGVNb2RlID8gKFxuICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b25cbiAgICAgICAgICByb3V0ZT1cIlwiXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiQ29tbW9uX0NyZWF0ZVwiLCBcIkNyZWF0ZVwiKX1cbiAgICAgICAgICBzaXplPXs3Nn1cbiAgICAgICAgICByaWdodD17MTZ9XG4gICAgICAgICAgYm90dG9tPXsyNH1cbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVPcGVuQ3JlYXRlTW9kZX1cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gTWFpbiBwYWdlIGVudHJ5IGZvciBleHBlbnNlIHNoZWV0IGxpbmUgZGV0YWlsLlxuY29uc3QgRXhwZW5zZVNoZWV0TGluZURldGFpbFBhZ2UgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICAgICAgPEV4cGVuc2VTaGVldExpbmVEZXRhaWxDb250ZW50IC8+XG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgKTtcbn07XG5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2UtbGluZS1kZXRhaWwtcm9vdFwiKTtcbiAgaWYgKCFyb290RWwpIHJldHVybjtcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxFeHBlbnNlU2hlZXRMaW5lRGV0YWlsUGFnZSAvPik7XG59O1xuXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0TGluZURldGFpbFBhZ2U7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0TGluZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQgZnJvbSBcIi4vRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dC50c3hcIjtcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcbmltcG9ydCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgZnJvbSBcIi4vRXhwZW5zZVNlY3Rpb25EaXZpZGVyLnRzeFwiO1xuXG50eXBlIEV4cGVuc2VTaGVldExpbmVGb3JtUHJvcHMgPSB7XG4gIGxpbmU6IEV4cGVuc2VTaGVldExpbmU7XG4gIGZhbGxiYWNrRGF0ZTogc3RyaW5nO1xuICBzaGVldERlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHByb2plY3RWYWx1ZTogc3RyaW5nO1xuICBwcmljZVRleHQ6IHN0cmluZztcbiAgYW1vdW50VGV4dDogc3RyaW5nO1xuICBpbnRlcm5hY2lvbmFsTGFiZWw6IHN0cmluZztcbiAgaXNLbVR5cGU6IGJvb2xlYW47XG4gIGlzRnVlbFByaWNlTG9hZGluZzogYm9vbGVhbjtcbiAgZnVlbFByaWNlTWVzc2FnZTogc3RyaW5nO1xuICBmdWVsUHJpY2VNZXNzYWdlSXNFcnJvcjogYm9vbGVhbjtcbiAgc3RhdHVzOiBzdHJpbmc7XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgZ2FzdG9UeXBlT3B0aW9uczogRXhwZW5zZVNlbGVjdE9wdGlvbltdO1xuICBpbnRlcm5hdGlvbmFsT3B0aW9uczogRXhwZW5zZVNlbGVjdE9wdGlvbltdO1xuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XG4gIGRyYWZ0VHlwZVZhbHVlQ29kZTogc3RyaW5nO1xuICBkcmFmdFByaWNlOiBzdHJpbmc7XG4gIGRyYWZ0UXR5OiBzdHJpbmc7XG4gIGRyYWZ0UHJvamVjdElkOiBzdHJpbmc7XG4gIGRyYWZ0SW50ZXJuYXRpb25hbDogc3RyaW5nO1xuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0UHJpY2VDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0UXR5Q2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdFByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRJbnRlcm5hdGlvbmFsQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbi8vIFB1cmUgZm9ybSByZW5kZXJlciBmb3IgZXhwZW5zZSBsaW5lIGRldGFpbCBpbiByZWFkIGFuZCBlZGl0IG1vZGVzLlxuY29uc3QgRXhwZW5zZVNoZWV0TGluZUZvcm0gPSAoe1xuICBsaW5lLFxuICBmYWxsYmFja0RhdGUsXG4gIHNoZWV0RGVzY3JpcHRpb24sXG4gIHByb2plY3RWYWx1ZSxcbiAgcHJpY2VUZXh0LFxuICBhbW91bnRUZXh0LFxuICBpbnRlcm5hY2lvbmFsTGFiZWwsXG4gIGlzS21UeXBlLFxuICBpc0Z1ZWxQcmljZUxvYWRpbmcsXG4gIGZ1ZWxQcmljZU1lc3NhZ2UsXG4gIGZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yLFxuICBzdGF0dXMsXG4gIGlzRWRpdGluZyxcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcbiAgaW50ZXJuYXRpb25hbE9wdGlvbnMsXG4gIGRyYWZ0RGVzY3JpcHRpb24sXG4gIGRyYWZ0VHJhbnNEYXRlLFxuICBkcmFmdFR5cGVWYWx1ZUNvZGUsXG4gIGRyYWZ0UHJpY2UsXG4gIGRyYWZ0UXR5LFxuICBkcmFmdFByb2plY3RJZCxcbiAgZHJhZnRJbnRlcm5hdGlvbmFsLFxuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UsXG4gIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2UsXG4gIG9uRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlLFxuICBvbkRyYWZ0UHJpY2VDaGFuZ2UsXG4gIG9uRHJhZnRRdHlDaGFuZ2UsXG4gIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2UsXG4gIG9uRHJhZnRJbnRlcm5hdGlvbmFsQ2hhbmdlLFxufTogRXhwZW5zZVNoZWV0TGluZUZvcm1Qcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNwYWNlLXktMFwiPlxuICAgICAgPEV4cGVuc2VTZWN0aW9uRGl2aWRlclxuICAgICAgICBsYWJlbD17c2hlZXREZXNjcmlwdGlvbn1cbiAgICAgICAgY2xhc3NOYW1lPVwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXItLXNwYWNlZFwiXG4gICAgICAgIGxhYmVsQ2xhc3NOYW1lPVwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXJfX2xhYmVsLS10aXRsZVwiXG4gICAgICAvPlxuXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX08L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdERlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XG4gICAgICAgICAgICAgIHZhbHVlPXtzYWZlVGV4dChsaW5lLmRlc2NyaXB0aW9uKSB8fCBcIi1cIn1cbiAgICAgICAgICAgICAgZnVsbFdpZHRoXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpdGEtZmllbGQtdGV4dFwiPlxuICAgICAgICAgICAgICA8U2luZ2xlRGF0ZVBpY2tlclxuICAgICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DcmVhdGVkRGF0ZVwiLCBcIkRhdGVcIil9XG4gICAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0VHJhbnNEYXRlfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3JlYXRlZERhdGVcIiwgXCJEYXRlXCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17Zm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKFxuICAgICAgICAgICAgICAgIHNhZmVUZXh0KGxpbmUudHJhbnNEYXRlIHx8IGZhbGxiYWNrRGF0ZSksXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCJcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXG4gICAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1R5cGVcIiwgXCJUeXBlXCIpfVxuICAgICAgICAgICAgICBvcHRpb25zPXtnYXN0b1R5cGVPcHRpb25zfVxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRUeXBlVmFsdWVDb2RlIHx8IFwiXCJ9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0VHlwZVZhbHVlQ29kZUNoYW5nZX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1R5cGVcIiwgXCJUeXBlXCIpfVxuICAgICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxuICAgICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICAgICAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9UeXBlXCIsIFwiVHlwZVwiKX0gdmFsdWU9e3NhZmVUZXh0KGxpbmUudHlwZVZhbHVlKSB8fCBcIi1cIn0gLz5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9QcmljZVwiLCBcIlByaWNlXCIpfTwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgc3RlcD1cImFueVwiXG4gICAgICAgICAgICAgICAgaW5wdXRNb2RlPVwiZGVjaW1hbFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0UHJpY2V9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdFByaWNlQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9QcmljZVwiLCBcIlByaWNlXCIpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB7aXNLbVR5cGUgJiYgaXNGdWVsUHJpY2VMb2FkaW5nID8gKFxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GdWVsUHJpY2VfTG9hZGluZ1wiLCBcIkxvYWRpbmcgZnVlbCBwcmljZS4uLlwiKX1cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICB7aXNLbVR5cGUgJiYgIWlzRnVlbFByaWNlTG9hZGluZyAmJiBmdWVsUHJpY2VNZXNzYWdlID8gKFxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17ZnVlbFByaWNlTWVzc2FnZUlzRXJyb3IgPyBcInRleHQtZGFuZ2VyIHRleHQtc21cIiA6IFwidGV4dC1zbGF0ZS01MDAgdGV4dC14c1wifT57ZnVlbFByaWNlTWVzc2FnZX08L3A+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJpY2VcIiwgXCJQcmljZVwiKX0gdmFsdWU9e3ByaWNlVGV4dCB8fCBcIi1cIn0gLz5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9RdHlcIiwgXCJRdWFudGl0eVwiKX08L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgIHN0ZXA9XCJhbnlcIlxuICAgICAgICAgICAgICAgIGlucHV0TW9kZT1cImRlY2ltYWxcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFF0eX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0UXR5Q2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9RdHlcIiwgXCJRdWFudGl0eVwiKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17bGluZS5xdHkgIT0gbnVsbCA/IFN0cmluZyhsaW5lLnF0eSkgOiBcIi1cIn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQW1vdW50XCIsIFwiQW1vdW50XCIpfSB2YWx1ZT17YW1vdW50VGV4dCB8fCBcIi1cIn0gLz5cblxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXG4gICAgICAgICAgICA8RXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfUHJvamVjdF9QbGFjZWhvbGRlclwiLCBcIlByb2plY3QgaWRcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFByb2plY3RJZH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRQcm9qZWN0SWRDaGFuZ2V9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IHByb2plY3RWYWx1ZSA/IChcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9IHZhbHVlPXtwcm9qZWN0VmFsdWV9IC8+XG4gICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9JbnRlcm5hdGlvbmFsXCIsIFwiSW50ZXJuYXRpb25hbFwiKX1cbiAgICAgICAgICAgICAgb3B0aW9ucz17aW50ZXJuYXRpb25hbE9wdGlvbnN9XG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdEludGVybmF0aW9uYWwgfHwgXCJcIn1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRJbnRlcm5hdGlvbmFsQ2hhbmdlfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfSW50ZXJuYXRpb25hbFwiLCBcIkludGVybmF0aW9uYWxcIil9XG4gICAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XG4gICAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0ludGVybmF0aW9uYWxcIiwgXCJJbnRlcm5hdGlvbmFsXCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17aW50ZXJuYWNpb25hbExhYmVsfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XG4gICAgICAgICAgPHNwYW4+e3N0YXR1c308L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldExpbmVGb3JtO1xuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuXG5leHBvcnQgdHlwZSBFeHBlbnNlSW50ZXJuYXRpb25hbE9wdGlvbiA9IHtcbiAgdmFsdWU6IGJvb2xlYW47XG4gIHRleHQ6IHN0cmluZztcbn07XG5cbi8vIEZpeGVkIGVudW0gZm9yIFwiSW50ZXJuYWNpb25hbFwiIGZpZWxkIGluIGV4cGVuc2Ugc2hlZXQgbGluZXMuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUludGVybmF0aW9uYWxPcHRpb25zID0gKCk6IEV4cGVuc2VJbnRlcm5hdGlvbmFsT3B0aW9uW10gPT4gW1xuICB7IHZhbHVlOiB0cnVlLCB0ZXh0OiBpbmRUKFwiRXhwZW5zZVNoZWV0c19JbnRlcm5hdGlvbmFsX1llc1wiLCBcIlNpXCIpIH0sXG4gIHsgdmFsdWU6IGZhbHNlLCB0ZXh0OiBpbmRUKFwiRXhwZW5zZVNoZWV0c19JbnRlcm5hdGlvbmFsX05vXCIsIFwiTm9cIikgfSxcbl07XG5cbi8vIE1hcHMgbnVsbGFibGUgYm9vbGVhbiB2YWx1ZXMgdG8gZml4ZWQgZW51bSBsYWJlbHMgZm9yIHJlYWQtb25seSByZW5kZXJpbmcuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUludGVybmF0aW9uYWxMYWJlbCA9ICh2YWx1ZTogYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xuICBpZiAodmFsdWUgPT09IHRydWUpIHtcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfSW50ZXJuYXRpb25hbF9ZZXNcIiwgXCJTaVwiKTtcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfSW50ZXJuYXRpb25hbF9Ob1wiLCBcIk5vXCIpO1xuICB9XG5cbiAgcmV0dXJuIFwiLVwiO1xufTtcblxuLy8gUGFyc2VzIHVzZXIgaW5wdXQgYmFjayB0byBudWxsYWJsZSBib29sZWFuIGZvciBmdXR1cmUgZWRpdCBtb2RlLlxuZXhwb3J0IGNvbnN0IHBhcnNlRXhwZW5zZUludGVybmF0aW9uYWxWYWx1ZSA9IChyYXc6IHN0cmluZyB8IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB8IG51bGwgPT4ge1xuICBpZiAocmF3ID09PSB0cnVlIHx8IHJhdyA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gcmF3O1xuICB9XG5cbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3IHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAodmFsdWUgPT09IFwidHJ1ZVwiIHx8IHZhbHVlID09PSBcIjFcIikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHZhbHVlID09PSBcImZhbHNlXCIgfHwgdmFsdWUgPT09IFwiMFwiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuIiwgImltcG9ydCB0eXBlIHsgUmVhY3ROb2RlIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCB0eXBlIEV4cGVuc2VTZWxlY3RPcHRpb24gPSB7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIHRleHQ6IHN0cmluZztcbiAgaWNvbj86IFJlYWN0Tm9kZTtcbn07XG5cbnR5cGUgV2luZG93RW51bUl0ZW0gPSB7XG4gIHZhbHVlPzogdW5rbm93bjtcbiAgVmFsdWU/OiB1bmtub3duO1xuICB0ZXh0PzogdW5rbm93bjtcbiAgVGV4dD86IHVua25vd247XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRXhwZW5zZU9wdGlvblZhbHVlID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSA/PyBcIlwiKS50cmltKCk7XG59O1xuXG4vLyBNYXBzIG1peGVkLWNhc2UgZW51bSBwYXlsb2FkcyAoVmFsdWUvdmFsdWUgKyBUZXh0L3RleHQpIGludG8gb25lIG5vcm1hbGl6ZWQgbGlzdC5cbmV4cG9ydCBjb25zdCBtYXBXaW5kb3dFbnVtT3B0aW9ucyA9IChzb3VyY2U6IFdpbmRvd0VudW1JdGVtW10pOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xuICByZXR1cm4gc291cmNlXG4gICAgLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAgIHZhbHVlOiBub3JtYWxpemVFeHBlbnNlT3B0aW9uVmFsdWUoaXRlbT8udmFsdWUgPz8gaXRlbT8uVmFsdWUpLFxuICAgICAgdGV4dDogbm9ybWFsaXplRXhwZW5zZU9wdGlvblZhbHVlKGl0ZW0/LnRleHQgPz8gaXRlbT8uVGV4dCksXG4gICAgfSkpXG4gICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbS52YWx1ZSAmJiBpdGVtLnRleHQpO1xufTtcblxuLy8gQ29udmVydHMgYm9vbGVhbiBlbnVtcyB0byBzZWxlY3Qgb3B0aW9ucyB3aXRoIHN0cmluZyBib29sZWFuIHZhbHVlcy5cbmV4cG9ydCBjb25zdCBtYXBCb29sZWFuRW51bU9wdGlvbnMgPSAoc291cmNlOiBBcnJheTx7IHZhbHVlOiBib29sZWFuOyB0ZXh0OiBzdHJpbmcgfT4pOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xuICByZXR1cm4gc291cmNlLm1hcCgoaXRlbSkgPT4gKHtcbiAgICB2YWx1ZTogaXRlbS52YWx1ZSA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiLFxuICAgIHRleHQ6IG5vcm1hbGl6ZUV4cGVuc2VPcHRpb25WYWx1ZShpdGVtLnRleHQpLFxuICB9KSk7XG59O1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgdHlwZSB7XG4gIEV4cGVuc2VTaGVldENyZWF0ZUxpbmVSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRMaW5lLFxuICBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVxdWVzdCxcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgcGFyc2VFeHBlbnNlSW50ZXJuYXRpb25hbFZhbHVlIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9pbnRlcm5hdGlvbmFsT3B0aW9ucy50c1wiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24sIHBhcnNlRGVjaW1hbElucHV0IH0gZnJvbSBcIi4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XG5pbXBvcnQgeyBjcmVhdGVFeHBlbnNlU2hlZXQsIGRlbGV0ZUV4cGVuc2VTaGVldExpbmUsIHVwZGF0ZUV4cGVuc2VTaGVldExpbmUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxNdXRhdGlvbnNBcmdzID0ge1xuICBidXN5OiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkVkaXRFeHBlbnNlOiBib29sZWFuO1xuICBjYW5EZWxldGVFeHBlbnNlOiBib29sZWFuO1xuICBzaGVldElkOiBzdHJpbmc7XG4gIGxpbmVJZDogc3RyaW5nO1xuICBsaW5lOiBFeHBlbnNlU2hlZXRMaW5lIHwgbnVsbDtcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xuICBkcmFmdFR5cGVWYWx1ZUNvZGU6IHN0cmluZztcbiAgZHJhZnRQcmljZTogc3RyaW5nO1xuICBkcmFmdFF0eTogc3RyaW5nO1xuICBkcmFmdFByb2plY3RJZDogc3RyaW5nO1xuICBkcmFmdEludGVybmF0aW9uYWw6IHN0cmluZztcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIG9uQ3JlYXRlU3VjY2VzczogKCkgPT4gdm9pZDtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUxpbmVEYXRlID0gKHJhdzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3IHx8IFwiXCIpLnRyaW0oKTtcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XG5cbiAgaWYgKC9eXFxkezh9JC8udGVzdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBpZiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoLy0vZywgXCJcIik7XG4gIH1cblxuICBjb25zdCBwYXJzZWQgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gIGlmIChOdW1iZXIuaXNOYU4ocGFyc2VkLmdldFRpbWUoKSkpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIGNvbnN0IHl5eXkgPSBwYXJzZWQuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbW0gPSBTdHJpbmcocGFyc2VkLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIGNvbnN0IGRkID0gU3RyaW5nKHBhcnNlZC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgcmV0dXJuIGAke3l5eXl9JHttbX0ke2RkfWA7XG59O1xuXG5jb25zdCBwYXJzZU51bWJlciA9IChyYXc6IHN0cmluZyk6IG51bWJlciB8IG51bGwgPT4gcGFyc2VEZWNpbWFsSW5wdXQocmF3KTtcblxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgZXhwZW5zZSBzaGVldCBsaW5lIGRldGFpbC5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zID0gKHtcbiAgYnVzeSxcbiAgaXNFZGl0aW5nLFxuICBpc0NyZWF0ZU1vZGUsXG4gIGlzTG9ja2VkLFxuICBjYW5DcmVhdGVFeHBlbnNlLFxuICBjYW5FZGl0RXhwZW5zZSxcbiAgY2FuRGVsZXRlRXhwZW5zZSxcbiAgc2hlZXRJZCxcbiAgbGluZUlkLFxuICBsaW5lLFxuICBkcmFmdERlc2NyaXB0aW9uLFxuICBkcmFmdFRyYW5zRGF0ZSxcbiAgZHJhZnRUeXBlVmFsdWVDb2RlLFxuICBkcmFmdFByaWNlLFxuICBkcmFmdFF0eSxcbiAgZHJhZnRQcm9qZWN0SWQsXG4gIGRyYWZ0SW50ZXJuYXRpb25hbCxcbiAgc2V0TW9kYWxFcnJvcixcbiAgc2V0QnVzeSxcbiAgc2V0U3RhdHVzLFxuICBzZXRJc0VkaXRpbmcsXG4gIG9uQ3JlYXRlU3VjY2Vzcyxcbn06IFVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XG4gIGNvbnN0IGhhbmRsZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGlzTG9ja2VkKSByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBjYW5Qcm9jZWVkID0gaXNDcmVhdGVNb2RlID8gY2FuQ3JlYXRlRXhwZW5zZSA6IGNhbkVkaXRFeHBlbnNlO1xuICAgIGlmICghY2FuUHJvY2VlZCkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IG5vcm1hbGl6ZWREYXRlID0gbm9ybWFsaXplTGluZURhdGUoZHJhZnRUcmFuc0RhdGUpO1xuICAgIGNvbnN0IHBhcnNlZFR5cGVWYWx1ZSA9IE51bWJlci5wYXJzZUludChTdHJpbmcoZHJhZnRUeXBlVmFsdWVDb2RlIHx8IFwiXCIpLnRyaW0oKSwgMTApO1xuICAgIGNvbnN0IHBhcnNlZFByaWNlID0gcGFyc2VOdW1iZXIoZHJhZnRQcmljZSk7XG4gICAgY29uc3QgcGFyc2VkUXR5ID0gcGFyc2VOdW1iZXIoZHJhZnRRdHkpO1xuICAgIGNvbnN0IHBhcnNlZEludGVybmF0aW9uYWwgPSBwYXJzZUV4cGVuc2VJbnRlcm5hdGlvbmFsVmFsdWUoZHJhZnRJbnRlcm5hdGlvbmFsKTtcblxuICAgIGNvbnN0IGhhc1ZhbGlkUXR5UHJpY2UgPSBwYXJzZWRRdHkgIT0gbnVsbCAmJiBwYXJzZWRRdHkgPiAwICYmIHBhcnNlZFByaWNlICE9IG51bGwgJiYgcGFyc2VkUHJpY2UgPiAwO1xuICAgIGlmICghaGFzVmFsaWRRdHlQcmljZSkge1xuICAgICAgY29uc3QgdmFsaWRhdGlvbk1lc3NhZ2UgPSBpbmRUKFxuICAgICAgICBcIkV4cGVuc2VTaGVldHNfTGluZV9WYWxpZGF0aW9uX0Ftb3VudFF0eVwiLFxuICAgICAgICBcIlF1YW50aXR5IGFuZCBwcmljZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwLlwiXG4gICAgICApO1xuICAgICAgc2V0TW9kYWxFcnJvcih2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICBzZXRTdGF0dXModmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghbm9ybWFsaXplZERhdGUgfHwgIU51bWJlci5pc0Zpbml0ZShwYXJzZWRUeXBlVmFsdWUpIHx8IHBhcnNlZFR5cGVWYWx1ZSA8PSAwKSB7XG4gICAgICBjb25zdCB2YWxpZGF0aW9uTWVzc2FnZSA9IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcbiAgICAgIHNldE1vZGFsRXJyb3IodmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgICAgc2V0U3RhdHVzKHZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcbiAgICAgIHN0YXJ0U3RhdHVzOiBpc0NyZWF0ZU1vZGVcbiAgICAgICAgPyBpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9DcmVhdGluZ1wiLCBcIkNyZWF0aW5nIGV4cGVuc2UgbGluZS4uLlwiKVxuICAgICAgICA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgZXhwZW5zZSBsaW5lLi4uXCIpLFxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXG4gICAgICBzZXRNb2RhbEVycm9yLFxuICAgICAgc2V0QnVzeSxcbiAgICAgIHNldFN0YXR1cyxcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBjb21tb25MaW5lUGF5bG9hZCA9IHtcbiAgICAgICAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWREYXRlLFxuICAgICAgICAgIHR5cGVWYWx1ZTogcGFyc2VkVHlwZVZhbHVlLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoZHJhZnREZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXG4gICAgICAgICAgaW50ZXJuYWNpb25hbDogcGFyc2VkSW50ZXJuYXRpb25hbCA/PyBsaW5lPy5pbnRlcm5hY2lvbmFsID8/IGZhbHNlLFxuICAgICAgICAgIHRpY2tldDogbGluZT8udGlja2V0ID09PSB0cnVlLFxuICAgICAgICAgIHF0eTogTnVtYmVyKHBhcnNlZFF0eSksXG4gICAgICAgICAgcHJpY2U6IE51bWJlcihwYXJzZWRQcmljZSksXG4gICAgICAgICAgcHJvaklkOiBTdHJpbmcoZHJhZnRQcm9qZWN0SWQgfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICBpbmRBdHRhY2hGaWxlczogc2FmZVRleHQobGluZT8uaW5kQXR0YWNoRmlsZXMpLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGNyZWF0ZUxpbmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRDcmVhdGVMaW5lUmVxdWVzdCA9IGNvbW1vbkxpbmVQYXlsb2FkO1xuICAgICAgICBjb25zdCB1cGRhdGVMaW5lUGF5bG9hZDogRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlcXVlc3QgPSBjb21tb25MaW5lUGF5bG9hZDtcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGlzQ3JlYXRlTW9kZVxuICAgICAgICAgID8gYXdhaXQgY3JlYXRlRXhwZW5zZVNoZWV0KHtcbiAgICAgICAgICAgICAgbW9kZTogMixcbiAgICAgICAgICAgICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IHNoZWV0SWQsXG4gICAgICAgICAgICAgIGxpbmVzOiBbY3JlYXRlTGluZVBheWxvYWRdLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICA6IGF3YWl0IHVwZGF0ZUV4cGVuc2VTaGVldExpbmUoc2hlZXRJZCwgbGluZUlkLCB1cGRhdGVMaW5lUGF5bG9hZCk7XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfQ3JlYXRlZFwiLCBcIkV4cGVuc2UgbGluZSBjcmVhdGVkXCIpKTtcbiAgICAgICAgICBvbkNyZWF0ZVN1Y2Nlc3MoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2UgbGluZSB1cGRhdGVkXCIpKTtcbiAgICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQub2s7XG4gIH0sIFtcbiAgICBidXN5LFxuICAgIGNhbkNyZWF0ZUV4cGVuc2UsXG4gICAgY2FuRWRpdEV4cGVuc2UsXG4gICAgZHJhZnRQcmljZSxcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0SW50ZXJuYXRpb25hbCxcbiAgICBkcmFmdFByb2plY3RJZCxcbiAgICBkcmFmdFF0eSxcbiAgICBkcmFmdFRyYW5zRGF0ZSxcbiAgICBkcmFmdFR5cGVWYWx1ZUNvZGUsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzTG9ja2VkLFxuICAgIGlzRWRpdGluZyxcbiAgICBsaW5lLFxuICAgIGxpbmVJZCxcbiAgICBvbkNyZWF0ZVN1Y2Nlc3MsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRJc0VkaXRpbmcsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBzZXRTdGF0dXMsXG4gICAgc2hlZXRJZCxcbiAgXSk7XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGlzTG9ja2VkKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjYW5EZWxldGVFeHBlbnNlKSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XG4gICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBleHBlbnNlIGxpbmUuLi5cIiksXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUVycm9yXCIsIFwiRGVsZXRlIGVycm9yLlwiKSxcbiAgICAgIHNldE1vZGFsRXJyb3IsXG4gICAgICBzZXRCdXN5LFxuICAgICAgc2V0U3RhdHVzLFxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0TGluZShzaGVldElkLCBsaW5lSWQpO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfRGVsZXRlZFwiLCBcIkV4cGVuc2UgbGluZSBkZWxldGVkXCIpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcbiAgfSwgW2J1c3ksIGNhbkRlbGV0ZUV4cGVuc2UsIGlzTG9ja2VkLCBsaW5lSWQsIHNldEJ1c3ksIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1cywgc2hlZXRJZF0pO1xuXG4gIHJldHVybiB7XG4gICAgaGFuZGxlVXBkYXRlLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMgfSBmcm9tIFwiLi4vaG9va3MvdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zQXJncyA9IHtcbiAgYnVzeTogYm9vbGVhbjtcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkVkaXRFeHBlbnNlOiBib29sZWFuO1xuICBjYW5EZWxldGVFeHBlbnNlOiBib29sZWFuO1xuICBzaGVldElkOiBzdHJpbmc7XG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcbiAgb25TYXZlU3VjY2VzczogKCkgPT4gdm9pZDtcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcbiAgfSkgPT4gdm9pZDtcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gc3RhdGUgYW5kIGRpc3BhdGNoIGFjdGlvbnMgZm9yIGV4cGVuc2Ugc2hlZXQgbGluZSBkZXRhaWwuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnMgPSAoe1xuICBidXN5LFxuICBtb2RhbE9wZW4sXG4gIGlzRWRpdGluZyxcbiAgaXNDcmVhdGVNb2RlLFxuICBpc0xvY2tlZCxcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgY2FuRWRpdEV4cGVuc2UsXG4gIGNhbkRlbGV0ZUV4cGVuc2UsXG4gIHNoZWV0SWQsXG4gIHNldE1vZGFsRXJyb3IsXG4gIGhhbmRsZUVuYWJsZUVkaXQsXG4gIGhhbmRsZUNhbmNlbEVkaXQsXG4gIGhhbmRsZVVwZGF0ZSxcbiAgaGFuZGxlRGVsZXRlLFxuICBvblNhdmVTdWNjZXNzLFxuICBvcGVuQ29uZmlybSxcbiAgY2xvc2VDb25maXJtLFxufTogVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFRvcGJhckFjdGlvbnNBcmdzKSA9PiB7XG4gIHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyh7XG4gICAgaWRzOiB7XG4gICAgICBlZGl0SWNvbklkOiBcImV4cGVuc2VMaW5lRWRpdEljb25cIixcbiAgICAgIHNhdmVJY29uSWQ6IFwiZXhwZW5zZUxpbmVTYXZlSWNvblwiLFxuICAgICAgZGVsZXRlQnRuSWQ6IFwiZXhwZW5zZUxpbmVEZWxldGVCdG5cIixcbiAgICAgIGNhbmNlbEJ0bklkOiBcImV4cGVuc2VMaW5lQ2FuY2VsQnRuXCIsXG4gICAgfSxcbiAgICBldmVudHM6IHtcbiAgICAgIGVkaXRFdmVudDogXCJleHBlbnNlLWxpbmUtZGV0YWlsLWVkaXRcIixcbiAgICAgIGRlbGV0ZUV2ZW50OiBcImV4cGVuc2UtbGluZS1kZXRhaWwtZGVsZXRlXCIsXG4gICAgICBjYW5jZWxFdmVudDogXCJleHBlbnNlLWxpbmUtZGV0YWlsLWNhbmNlbC1lZGl0XCIsXG4gICAgfSxcbiAgICBidXN5LFxuICAgIG1vZGFsT3BlbixcbiAgICBpc0VkaXRpbmcsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzTG9ja2VkLFxuICAgIGNhbkNyZWF0ZTogY2FuQ3JlYXRlRXhwZW5zZSxcbiAgICBjYW5FZGl0OiBjYW5FZGl0RXhwZW5zZSxcbiAgICBjYW5EZWxldGU6IGNhbkRlbGV0ZUV4cGVuc2UsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlU2F2ZTogaGFuZGxlVXBkYXRlLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgICBzYXZlQ29uZmlybVRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJTYXZlIGNoYW5nZXNcIiksXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXG4gICAgc2F2ZUNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX1NhdmVcIiwgXCJTYXZlXCIpLFxuICAgIGRlbGV0ZUNvbmZpcm1UaXRsZTogaW5kVChcIkNvbmZpcm1fRGVsZXRlX1RpdGxlXCIsIFwiRGVsZXRlXCIpLFxuICAgIGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiQ29uZmlybV9EZWxldGVfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/XCIpLFxuICAgIGRlbGV0ZUNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKSxcbiAgICBvblNhdmVTdWNjZXNzLFxuICAgIG9uRGVsZXRlU3VjY2VzczogKCkgPT4ge1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzaGVldElkKX1gKTtcbiAgICB9LFxuICAgIG9wZW5Db25maXJtLFxuICAgIGNsb3NlQ29uZmlybSxcbiAgfSk7XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRIZWFkZXIsIEV4cGVuc2VTaGVldExpbmUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldERldGFpbCwgZ2V0RnVlbFByaWNlS20sIG1hcEV4cGVuc2VTaGVldEhlYWRlciwgbWFwRXhwZW5zZVNoZWV0TGluZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQge1xuICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXG4gIG5hdmlnYXRlVG9FeHBlbnNlVXJsLFxuICBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLFxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcbmltcG9ydCB7IGhhc0Fzc2lnbmVkVm91Y2hlciwgcGFyc2VFeHBlbnNlRGF0ZSwgc2FmZVRleHQsIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuXG5jb25zdCBLTV9HQVNUT19UWVBFX0NPREUgPSBcIjNcIjtcbmNvbnN0IEZVRUxfUFJJQ0VfREVCT1VOQ0VfTVMgPSAzMDA7XG5cbmNvbnN0IHRvSW5wdXREYXRlID0gKHJhdz86IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcbiAgcmV0dXJuIHBhcnNlZCA/IHRvSXNvRGF0ZShwYXJzZWQpIDogXCJcIjtcbn07XG5cbmNvbnN0IGZvcm1hdEVkaXRhYmxlTnVtYmVyID0gKHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgTnVtYmVyLmlzTmFOKE51bWJlcih2YWx1ZSkpKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUZ1ZWxUcmFuc0RhdGUgPSAocmF3OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcgfHwgXCJcIikudHJpbSgpO1xuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcblxuICBpZiAoL15cXGR7OH0kLy50ZXN0KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGlmICgvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvLS9nLCBcIlwiKTtcbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgaWYgKE51bWJlci5pc05hTihwYXJzZWQuZ2V0VGltZSgpKSkge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgY29uc3QgeXl5eSA9IHBhcnNlZC5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBtbSA9IFN0cmluZyhwYXJzZWQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgY29uc3QgZGQgPSBTdHJpbmcocGFyc2VkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICByZXR1cm4gYCR7eXl5eX0ke21tfSR7ZGR9YDtcbn07XG5cbmNvbnN0IGJ1aWxkQ3JlYXRlTGluZURyYWZ0ID0gKGJhc2VEYXRlOiBzdHJpbmcsIHByb2plY3RJZDogc3RyaW5nKTogRXhwZW5zZVNoZWV0TGluZSA9PiB7XG4gIHJldHVybiB7XG4gICAgbGluZVJlY0lkOiBcIlwiLFxuICAgIHRyYW5zRGF0ZTogYmFzZURhdGUsXG4gICAgdHlwZVZhbHVlOiBcIlwiLFxuICAgIHR5cGVWYWx1ZUNvZGU6IFwiXCIsXG4gICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgaW50ZXJuYWNpb25hbDogZmFsc2UsXG4gICAgdGlja2V0OiBmYWxzZSxcbiAgICBwcmljZTogbnVsbCxcbiAgICBxdHk6IDEsXG4gICAgYW1vdW50OiBudWxsLFxuICAgIHByb2pJZDogcHJvamVjdElkLFxuICAgIGluZEF0dGFjaEZpbGVzOiBcIlwiLFxuICB9O1xufTtcblxudHlwZSBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGVBcmdzID0ge1xuICBoYXNBY2Nlc3M6IGJvb2xlYW47XG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkVkaXRFeHBlbnNlOiBib29sZWFuO1xuICBzaGVldElkOiBzdHJpbmc7XG4gIGxpbmVJZDogc3RyaW5nO1xuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gT3ducyBzdGF0ZSBhbmQgYmVoYXZpb3IgZm9yIGV4cGVuc2UgbGluZSBkZXRhaWwgcGFnZSAocmVhZCwgZWRpdCwgY3JlYXRlKS5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGUgPSAoe1xuICBoYXNBY2Nlc3MsXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXG4gIGNhbkVkaXRFeHBlbnNlLFxuICBzaGVldElkLFxuICBsaW5lSWQsXG4gIGlzQ3JlYXRlTW9kZSxcbiAgb25Gb3JiaWRkZW4sXG59OiBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGVBcmdzKSA9PiB7XG4gIGNvbnN0IFtoZWFkZXIsIHNldEhlYWRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRIZWFkZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2xpbmUsIHNldExpbmVdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0TGluZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbaXNFZGl0aW5nLCBzZXRJc0VkaXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbW9kYWxFcnJvciwgc2V0TW9kYWxFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0RGVzY3JpcHRpb24sIHNldERyYWZ0RGVzY3JpcHRpb25dID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdFRyYW5zRGF0ZSwgc2V0RHJhZnRUcmFuc0RhdGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdFR5cGVWYWx1ZUNvZGUsIHNldERyYWZ0VHlwZVZhbHVlQ29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0UHJpY2UsIHNldERyYWZ0UHJpY2VdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdFF0eSwgc2V0RHJhZnRRdHldID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdFByb2plY3RJZCwgc2V0RHJhZnRQcm9qZWN0SWRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdEludGVybmF0aW9uYWwsIHNldERyYWZ0SW50ZXJuYXRpb25hbF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2lzRnVlbFByaWNlTG9hZGluZywgc2V0SXNGdWVsUHJpY2VMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Z1ZWxQcmljZU1lc3NhZ2UsIHNldEZ1ZWxQcmljZU1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtmdWVsUHJpY2VNZXNzYWdlSXNFcnJvciwgc2V0RnVlbFByaWNlTWVzc2FnZUlzRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGh5ZHJhdGVEcmFmdEZyb21MaW5lID0gdXNlQ2FsbGJhY2soKG5leHRMaW5lOiBFeHBlbnNlU2hlZXRMaW5lIHwgbnVsbCwgbmV4dEhlYWRlcjogRXhwZW5zZVNoZWV0SGVhZGVyIHwgbnVsbCkgPT4ge1xuICAgIHNldERyYWZ0RGVzY3JpcHRpb24oc2FmZVRleHQobmV4dExpbmU/LmRlc2NyaXB0aW9uKSk7XG4gICAgc2V0RHJhZnRUcmFuc0RhdGUodG9JbnB1dERhdGUobmV4dExpbmU/LnRyYW5zRGF0ZSB8fCBuZXh0SGVhZGVyPy5jcmVhdGVkRGF0ZSkpO1xuICAgIHNldERyYWZ0VHlwZVZhbHVlQ29kZShzYWZlVGV4dChuZXh0TGluZT8udHlwZVZhbHVlQ29kZSkpO1xuICAgIHNldERyYWZ0UHJpY2UoZm9ybWF0RWRpdGFibGVOdW1iZXIobmV4dExpbmU/LnByaWNlKSk7XG4gICAgc2V0RHJhZnRRdHkoZm9ybWF0RWRpdGFibGVOdW1iZXIobmV4dExpbmU/LnF0eSkpO1xuICAgIHNldERyYWZ0UHJvamVjdElkKHNhZmVUZXh0KG5leHRMaW5lPy5wcm9qSWQgfHwgbmV4dEhlYWRlcj8ucHJvaklkKSk7XG4gICAgc2V0RHJhZnRJbnRlcm5hdGlvbmFsKG5leHRMaW5lPy5pbnRlcm5hY2lvbmFsID09PSB0cnVlID8gXCJ0cnVlXCIgOiBuZXh0TGluZT8uaW50ZXJuYWNpb25hbCA9PT0gZmFsc2UgPyBcImZhbHNlXCIgOiBcIlwiKTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbG9hZERldGFpbCA9IGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghaGFzQWNjZXNzKSB7XG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzaGVldElkKSB7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgbGluZSB3YXMgbm90IGZvdW5kLlwiKSk7XG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgc2V0TGluZShudWxsKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgICAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UpIHtcbiAgICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldERldGFpbChzaGVldElkLCB7XG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZT8uTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBsaW5lIGRldGFpbC5cIikpO1xuICAgICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICAgICAgc2V0TGluZShudWxsKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBzaGVldHMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkU2hlZXQgPVxuICAgICAgICAgICAgc2hlZXRzLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uSG9qYUdhc3Rvc0lkKS50b1VwcGVyQ2FzZSgpID09PSBzaGVldElkLnRyaW0oKS50b1VwcGVyQ2FzZSgpKSB8fCBzaGVldHNbMF07XG5cbiAgICAgICAgICBpZiAoIXNlbGVjdGVkU2hlZXQpIHtcbiAgICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgbGluZSB3YXMgbm90IGZvdW5kLlwiKSk7XG4gICAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgICAgICBzZXRMaW5lKG51bGwpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGxvYWRlZEhlYWRlciA9IG1hcEV4cGVuc2VTaGVldEhlYWRlcihzZWxlY3RlZFNoZWV0KTtcbiAgICAgICAgICBpZiAoaGFzQXNzaWduZWRWb3VjaGVyKGxvYWRlZEhlYWRlci52b3VjaGVyKSkge1xuICAgICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9QYWlkUmVhZE9ubHlcIiwgXCJQYWlkIGV4cGVuc2Ugc2hlZXRzIGFyZSByZWFkLW9ubHkuXCIpKTtcbiAgICAgICAgICAgIHNldEhlYWRlcihsb2FkZWRIZWFkZXIpO1xuICAgICAgICAgICAgc2V0TGluZShudWxsKTtcbiAgICAgICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZHJhZnRMaW5lID0gYnVpbGRDcmVhdGVMaW5lRHJhZnQodG9Jc29EYXRlKG5ldyBEYXRlKCkpLCBzYWZlVGV4dChsb2FkZWRIZWFkZXIucHJvaklkKSk7XG4gICAgICAgICAgc2V0SGVhZGVyKGxvYWRlZEhlYWRlcik7XG4gICAgICAgICAgc2V0TGluZShkcmFmdExpbmUpO1xuICAgICAgICAgIHNldElzRWRpdGluZyh0cnVlKTtcbiAgICAgICAgICBoeWRyYXRlRHJhZnRGcm9tTGluZShkcmFmdExpbmUsIGxvYWRlZEhlYWRlcik7XG4gICAgICAgICAgc2V0U3RhdHVzKFwiXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbGluZUlkKSB7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCBsaW5lIHdhcyBub3QgZm91bmQuXCIpKTtcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgICAgc2V0TGluZShudWxsKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKHNoZWV0SWQsIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZT8uTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBsaW5lIGRldGFpbC5cIikpO1xuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgICBzZXRMaW5lKG51bGwpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNoZWV0cyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkU2hlZXQgPVxuICAgICAgICAgIHNoZWV0cy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnk/LkhvamFHYXN0b3NJZCkudG9VcHBlckNhc2UoKSA9PT0gc2hlZXRJZC50cmltKCkudG9VcHBlckNhc2UoKSkgfHwgc2hlZXRzWzBdO1xuXG4gICAgICAgIGlmICghc2VsZWN0ZWRTaGVldCkge1xuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgbGluZSB3YXMgbm90IGZvdW5kLlwiKSk7XG4gICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICAgIHNldExpbmUobnVsbCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWFwcGVkSGVhZGVyID0gbWFwRXhwZW5zZVNoZWV0SGVhZGVyKHNlbGVjdGVkU2hlZXQpO1xuICAgICAgICBjb25zdCBtYXBwZWRMaW5lcyA9IChBcnJheS5pc0FycmF5KHNlbGVjdGVkU2hlZXQuTGluZXMpID8gc2VsZWN0ZWRTaGVldC5MaW5lcyA6IFtdKS5tYXAoKGVudHJ5KSA9PlxuICAgICAgICAgIG1hcEV4cGVuc2VTaGVldExpbmUoZW50cnkpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkTGluZSA9XG4gICAgICAgICAgbWFwcGVkTGluZXMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5LmxpbmVSZWNJZCkudG9VcHBlckNhc2UoKSA9PT0gbGluZUlkLnRyaW0oKS50b1VwcGVyQ2FzZSgpKSB8fCBudWxsO1xuXG4gICAgICAgIGlmICghc2VsZWN0ZWRMaW5lKSB7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCBsaW5lIHdhcyBub3QgZm91bmQuXCIpKTtcbiAgICAgICAgICBzZXRIZWFkZXIobWFwcGVkSGVhZGVyKTtcbiAgICAgICAgICBzZXRMaW5lKG51bGwpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEhlYWRlcihtYXBwZWRIZWFkZXIpO1xuICAgICAgICBzZXRMaW5lKHNlbGVjdGVkTGluZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBsaW5lIGRldGFpbC5cIikpO1xuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgIHNldExpbmUobnVsbCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2b2lkIGxvYWREZXRhaWwoKTtcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2UsIGhhc0FjY2VzcywgaHlkcmF0ZURyYWZ0RnJvbUxpbmUsIGlzQ3JlYXRlTW9kZSwgbGluZUlkLCBvbkZvcmJpZGRlbiwgc2hlZXRJZF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFsaW5lIHx8IGlzRWRpdGluZykgcmV0dXJuO1xuICAgIGh5ZHJhdGVEcmFmdEZyb21MaW5lKGxpbmUsIGhlYWRlcik7XG4gIH0sIFtoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21MaW5lLCBpc0VkaXRpbmcsIGxpbmVdKTtcblxuICBjb25zdCBub3JtYWxpemVkRHJhZnRUeXBlVmFsdWVDb2RlID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChkcmFmdFR5cGVWYWx1ZUNvZGUpLCBbZHJhZnRUeXBlVmFsdWVDb2RlXSk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRGdWVsVHJhbnNEYXRlID0gdXNlTWVtbygoKSA9PiBub3JtYWxpemVGdWVsVHJhbnNEYXRlKGRyYWZ0VHJhbnNEYXRlKSwgW2RyYWZ0VHJhbnNEYXRlXSk7XG4gIGNvbnN0IGlzS21UeXBlID0gbm9ybWFsaXplZERyYWZ0VHlwZVZhbHVlQ29kZSA9PT0gS01fR0FTVE9fVFlQRV9DT0RFO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGlzQ2FuY2VsbGVkID0gZmFsc2U7XG4gICAgbGV0IHRpbWVyOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGwgPSBudWxsO1xuICAgIGxldCBjb250cm9sbGVyOiBBYm9ydENvbnRyb2xsZXIgfCBudWxsID0gbnVsbDtcblxuICAgIGNvbnN0IGNsZWFyUGVuZGluZyA9ICgpID0+IHtcbiAgICAgIGlmICh0aW1lcikge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICB9XG4gICAgICBpZiAoY29udHJvbGxlcikge1xuICAgICAgICBjb250cm9sbGVyLmFib3J0KCk7XG4gICAgICAgIGNvbnRyb2xsZXIgPSBudWxsO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoIWlzRWRpdGluZyB8fCAhaXNLbVR5cGUpIHtcbiAgICAgIHNldElzRnVlbFByaWNlTG9hZGluZyhmYWxzZSk7XG4gICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlKFwiXCIpO1xuICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY2xlYXJQZW5kaW5nKCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICghbm9ybWFsaXplZEZ1ZWxUcmFuc0RhdGUpIHtcbiAgICAgIHNldElzRnVlbFByaWNlTG9hZGluZyhmYWxzZSk7XG4gICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlKGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XG4gICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNsZWFyUGVuZGluZygpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aW1lciA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgIHNldElzRnVlbFByaWNlTG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlSXNFcnJvcihmYWxzZSk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ2V0RnVlbFByaWNlS20obm9ybWFsaXplZEZ1ZWxUcmFuc0RhdGUsIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MgfHwgIXJlc3BvbnNlLkRhdGEgfHwgIU51bWJlci5pc0Zpbml0ZShOdW1iZXIocmVzcG9uc2UuRGF0YS5QcmljZUttKSkpIHtcbiAgICAgICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlKFxuICAgICAgICAgICAgc2FmZVRleHQocmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRnVlbFByaWNlX05vdEZvdW5kXCIsIFwiQ291bGQgbm90IGxvYWQgZnVlbCBwcmljZSBmb3Iga20uXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNvbHZlZFByaWNlID0gTnVtYmVyKHJlc3BvbnNlLkRhdGEuUHJpY2VLbSk7XG4gICAgICAgIGlmIChyZXNvbHZlZFByaWNlID4gMCkge1xuICAgICAgICAgIHNldERyYWZ0UHJpY2UoZm9ybWF0RWRpdGFibGVOdW1iZXIocmVzb2x2ZWRQcmljZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc291cmNlID0gc2FmZVRleHQocmVzcG9uc2UuRGF0YS5Tb3VyY2UpO1xuICAgICAgICBjb25zdCBlZmZlY3RpdmVEYXRlID0gc2FmZVRleHQocmVzcG9uc2UuRGF0YS5UcmFuc0RhdGUpIHx8IG5vcm1hbGl6ZWRGdWVsVHJhbnNEYXRlO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gc291cmNlXG4gICAgICAgICAgPyBgJHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GdWVsUHJpY2VfU291cmNlXCIsIFwiRnVlbCBwcmljZSBzb3VyY2VcIil9OiAke3NvdXJjZX0gKCR7ZWZmZWN0aXZlRGF0ZX0pYFxuICAgICAgICAgIDogYCR7aW5kVChcIkV4cGVuc2VTaGVldHNfRnVlbFByaWNlX1NvdXJjZVwiLCBcIkZ1ZWwgcHJpY2Ugc291cmNlXCIpfTogJHtlZmZlY3RpdmVEYXRlfWA7XG4gICAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIHNldEZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHJldHVybjtcblxuICAgICAgICBzZXRGdWVsUHJpY2VNZXNzYWdlKFxuICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3JcbiAgICAgICAgICAgID8gZXJyb3IubWVzc2FnZVxuICAgICAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GdWVsUHJpY2VfTm90Rm91bmRcIiwgXCJDb3VsZCBub3QgbG9hZCBmdWVsIHByaWNlIGZvciBrbS5cIilcbiAgICAgICAgKTtcbiAgICAgICAgc2V0RnVlbFByaWNlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoIWlzQ2FuY2VsbGVkKSB7XG4gICAgICAgICAgc2V0SXNGdWVsUHJpY2VMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIEZVRUxfUFJJQ0VfREVCT1VOQ0VfTVMpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlzQ2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgIGNsZWFyUGVuZGluZygpO1xuICAgIH07XG4gIH0sIFtpc0VkaXRpbmcsIGlzS21UeXBlLCBub3JtYWxpemVkRnVlbFRyYW5zRGF0ZV0pO1xuXG4gIGNvbnN0IGhhc0FjdGl2ZVByb2Nlc3MgPSB1c2VNZW1vKCgpID0+IGJ1c3kgfHwgaXNFZGl0aW5nLCBbYnVzeSwgaXNFZGl0aW5nXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZChoYXNBY3RpdmVQcm9jZXNzKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKCk7XG4gICAgfTtcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcblxuICBjb25zdCBpc1NoZWV0UGFpZCA9IGhhc0Fzc2lnbmVkVm91Y2hlcihoZWFkZXI/LnZvdWNoZXIpO1xuXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGlzQ3JlYXRlTW9kZSB8fCBpc0xvYWRpbmcgfHwgIWhlYWRlciB8fCAhbGluZSB8fCBpc1NoZWV0UGFpZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghY2FuRWRpdEV4cGVuc2UpIHtcbiAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XG4gICAgaHlkcmF0ZURyYWZ0RnJvbUxpbmUobGluZSwgaGVhZGVyKTtcbiAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0VkaXRpbmdFbmFibGVkXCIsIFwiRWRpdGluZyBlbmFibGVkXCIpKTtcbiAgfSwgW2NhbkVkaXRFeHBlbnNlLCBoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21MaW5lLCBpc0NyZWF0ZU1vZGUsIGlzTG9hZGluZywgaXNTaGVldFBhaWQsIGxpbmUsIG9uRm9yYmlkZGVuXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNoZWV0SWQpfWA7XG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsLCB7XG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghaXNFZGl0aW5nKSByZXR1cm47XG5cbiAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgaHlkcmF0ZURyYWZ0RnJvbUxpbmUobGluZSwgaGVhZGVyKTtcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xuICB9LCBbaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tTGluZSwgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIGxpbmUsIHNoZWV0SWRdKTtcblxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlTW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UgfHwgIXNoZWV0SWQpIHtcbiAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldFVybCA9IGAvR2FzdG9zL0V4cGVuc2VTaGVldExpbmVEZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNoZWV0SWQpfSZtb2RlPWNyZWF0ZWA7XG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsLCB7XG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcbiAgICB9KTtcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2UsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nLCBvbkZvcmJpZGRlbiwgc2hlZXRJZF0pO1xuXG4gIGNvbnN0IG5hdmlnYXRlVG9TaGVldERldGFpbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHNoZWV0SWQpO1xuICAgIGlmICghc2FmZVNoZWV0SWQpIHJldHVybjtcbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVTaGVldElkKX1gO1xuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCk7XG4gIH0sIFtzaGVldElkXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBoZWFkZXIsXG4gICAgbGluZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGJ1c3ksXG4gICAgc3RhdHVzLFxuICAgIGlzRWRpdGluZyxcbiAgICBtb2RhbEVycm9yLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRUcmFuc0RhdGUsXG4gICAgZHJhZnRUeXBlVmFsdWVDb2RlLFxuICAgIGRyYWZ0UHJpY2UsXG4gICAgZHJhZnRRdHksXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgZHJhZnRJbnRlcm5hdGlvbmFsLFxuICAgIGlzS21UeXBlLFxuICAgIGlzRnVlbFByaWNlTG9hZGluZyxcbiAgICBmdWVsUHJpY2VNZXNzYWdlLFxuICAgIGZ1ZWxQcmljZU1lc3NhZ2VJc0Vycm9yLFxuICAgIGlzU2hlZXRQYWlkLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXG4gICAgc2V0RHJhZnRUcmFuc0RhdGUsXG4gICAgc2V0RHJhZnRUeXBlVmFsdWVDb2RlLFxuICAgIHNldERyYWZ0UHJpY2UsXG4gICAgc2V0RHJhZnRRdHksXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXG4gICAgc2V0RHJhZnRJbnRlcm5hdGlvbmFsLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVPcGVuQ3JlYXRlTW9kZSxcbiAgICBuYXZpZ2F0ZVRvU2hlZXREZXRhaWwsXG4gIH07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQXNEOzs7QUM2RWhEO0FBakNOLElBQU0sdUJBQXVCLENBQUM7QUFBQSxFQUM1QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVB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QyxXQUFVO0FBQUEsUUFDVixPQUFPLEVBQUUsU0FBUyxhQUFhLDJCQUEyQixTQUFTLE9BQU87QUFBQSxRQUUxRTtBQUFBLHVEQUFDLFNBQUksV0FBVSx1QkFBc0IsU0FBUSxhQUFZLE1BQUssVUFBUyxjQUFZLEtBQUssa0JBQWtCLFNBQVMsR0FDakgsdURBQUMsWUFBTyxXQUFVLHVCQUFzQixJQUFHLE1BQUssSUFBRyxNQUFLLEdBQUUsS0FBSSxhQUFZLEtBQUksR0FDaEY7QUFBQSxVQUNDLEtBQUssa0JBQWtCLFNBQVM7QUFBQTtBQUFBO0FBQUEsSUFDbkM7QUFBQSxJQUVDLGVBQWUsNkNBQUMsU0FBSSxXQUFVLGVBQWUsd0JBQWEsSUFBUztBQUFBLElBRW5FLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLGdCQUFnQixPQUMzRDtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBLGNBQWMsU0FBUyxRQUFRLFdBQVc7QUFBQSxRQUMxQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLDBCQUEwQjtBQUFBLFFBQzFCLHdCQUF3QjtBQUFBLFFBQ3hCLDRCQUE0QjtBQUFBLFFBQzVCLG9CQUFvQjtBQUFBLFFBQ3BCLGtCQUFrQjtBQUFBLFFBQ2xCLHdCQUF3QjtBQUFBLFFBQ3hCLDRCQUE0QjtBQUFBO0FBQUEsSUFDOUIsSUFDRTtBQUFBLElBRUgsb0JBQW9CLENBQUMsZUFDcEI7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE9BQU07QUFBQSxRQUNOLFdBQVcsS0FBSyxpQkFBaUIsUUFBUTtBQUFBLFFBQ3pDLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQTtBQUFBLElBQ1gsSUFDRTtBQUFBLEtBQ047QUFFSjtBQUdBLElBQU0sNkJBQTZCLE1BQU07QUFDdkMsU0FDRSw2Q0FBQyxnQ0FDQyx1REFBQyxpQ0FBOEIsR0FDakM7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLDBCQUEwQjtBQUNqRSxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLDhCQUEyQixDQUFFO0FBQ3pEO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxxQ0FBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJyZXNwb25zZSIsICJzaGVldHMiLCAic2VsZWN0ZWRTaGVldCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
