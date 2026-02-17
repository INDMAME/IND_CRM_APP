import {
  SingleDatePicker
} from "./chunks/chunk-M7JWNVNF.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-3VBDZSFB.js";
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
  hasAssignedVoucher,
  mapExpenseSheetHeader,
  mapExpenseSheetLine,
  navigateToExpenseUrl,
  parseExpenseDate,
  safeText,
  setExpenseNavigationGuard,
  toIsoDate,
  updateExpenseSheetLine
} from "./chunks/chunk-3FT3FNFJ.js";
import {
  SelectCombobox_default,
  VisitasPageProviders_default
} from "./chunks/chunk-I765HG2F.js";
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
  amountText,
  internacionalLabel,
  status,
  isEditing,
  gastoTypeOptions,
  internationalOptions,
  draftDescription,
  draftTransDate,
  draftTypeValueCode,
  draftAmount,
  draftQty,
  draftProjectId,
  draftInternational,
  onDraftDescriptionChange,
  onDraftTransDateChange,
  onDraftTypeValueCodeChange,
  onDraftAmountChange,
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_Amount", "Amount") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              className: "form-control",
              type: "number",
              step: "any",
              inputMode: "decimal",
              value: draftAmount,
              onChange: (event) => onDraftAmountChange(event.target.value || ""),
              "aria-label": indT("ExpenseSheets_Field_Amount", "Amount")
            }
          )
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Amount", "Amount"), value: amountText || "-" }),
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
  draftAmount,
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
    const parsedAmount = parseNumber(draftAmount);
    const parsedQty = parseNumber(draftQty);
    const parsedInternational = parseExpenseInternationalValue(draftInternational);
    const hasValidQtyAmount = parsedQty != null && parsedQty > 0 && parsedAmount != null && parsedAmount >= 0;
    if (!hasValidQtyAmount) {
      const validationMessage = indT(
        "ExpenseSheets_Line_Validation_AmountQty",
        "Quantity must be greater than 0 and amount cannot be negative."
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
          qty: parsedQty,
          projId: String(draftProjectId || "").trim() || void 0,
          indAttachFiles: safeText(line?.indAttachFiles)
        };
        const createLinePayload = {
          ...commonLinePayload,
          amount: parsedAmount
        };
        const updateLinePayload = {
          ...commonLinePayload,
          Amount: parsedAmount
        };
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
    draftAmount,
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
var buildCreateLineDraft = (baseDate, projectId) => {
  return {
    lineRecId: "",
    transDate: baseDate,
    typeValue: "",
    typeValueCode: "",
    description: "",
    internacional: false,
    ticket: false,
    qty: 1,
    amount: 0,
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
  const [draftAmount, setDraftAmount] = (0, import_react2.useState)("");
  const [draftQty, setDraftQty] = (0, import_react2.useState)("");
  const [draftProjectId, setDraftProjectId] = (0, import_react2.useState)("");
  const [draftInternational, setDraftInternational] = (0, import_react2.useState)("");
  const hydrateDraftFromLine = (0, import_react2.useCallback)((nextLine, nextHeader) => {
    setDraftDescription(safeText(nextLine?.description));
    setDraftTransDate(toInputDate(nextLine?.transDate || nextHeader?.createdDate));
    setDraftTypeValueCode(safeText(nextLine?.typeValueCode));
    setDraftAmount(formatEditableNumber(nextLine?.amount));
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
    draftAmount,
    draftQty,
    draftProjectId,
    draftInternational,
    isSheetPaid,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setDraftDescription,
    setDraftTransDate,
    setDraftTypeValueCode,
    setDraftAmount,
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
    draftAmount,
    draftQty,
    draftProjectId,
    draftInternational,
    isSheetPaid,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setDraftDescription,
    setDraftTransDate,
    setDraftTypeValueCode,
    setDraftAmount,
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
  const amountText = (0, import_react3.useMemo)(
    () => formatAmountWithCurrency(line?.amount ?? null, safeText(header?.currencyCode)),
    [header?.currencyCode, line?.amount]
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
    draftAmount,
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
    busy,
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
        busy,
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
        style: { display: isLoading ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "text-danger", children: errorMessage }) : null,
    !isLoading && !errorMessage && line ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ExpenseSheetLineForm_default,
      {
        line,
        fallbackDate: safeText(header?.createdDate),
        sheetDescription,
        projectValue,
        amountText,
        internacionalLabel,
        status,
        isEditing,
        gastoTypeOptions,
        internationalOptions,
        draftDescription,
        draftTransDate,
        draftTypeValueCode,
        draftAmount,
        draftQty,
        draftProjectId,
        draftInternational,
        onDraftDescriptionChange: setDraftDescription,
        onDraftTransDateChange: setDraftTransDate,
        onDraftTypeValueCodeChange: setDraftTypeValueCode,
        onDraftAmountChange: setDraftAmount,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL0V4cGVuc2VTaGVldExpbmVEZXRhaWxQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0TGluZUZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2ludGVybmF0aW9uYWxPcHRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxNdXRhdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvbGluZS91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XG5pbXBvcnQgRXhwZW5zZVNoZWV0TGluZUZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0TGluZUZvcm0udHN4XCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlSW50ZXJuYXRpb25hbExhYmVsLCBnZXRFeHBlbnNlSW50ZXJuYXRpb25hbE9wdGlvbnMgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2ludGVybmF0aW9uYWxPcHRpb25zLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHtcbiAgbWFwQm9vbGVhbkVudW1PcHRpb25zLFxuICBtYXBXaW5kb3dFbnVtT3B0aW9ucyxcbiAgdHlwZSBFeHBlbnNlU2VsZWN0T3B0aW9uLFxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxNdXRhdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGUudHNcIjtcblxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxuY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXG4gIH0pO1xufTtcblxuY29uc3QgRXhwZW5zZVNoZWV0TGluZURldGFpbENvbnRlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiVmlld1wiKTtcbiAgY29uc3QgY2FuRWRpdEV4cGVuc2UgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkVkaXRcIik7XG4gIGNvbnN0IGNhbkRlbGV0ZUV4cGVuc2UgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkZ1bGxBY2Nlc3NcIik7XG4gIGNvbnN0IGNhbkNyZWF0ZUV4cGVuc2UgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkFkZFwiKTtcbiAgY29uc3Qgc2hlZXRJZCA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfU0hFRVRfSURfXyk7XG4gIGNvbnN0IGxpbmVJZCA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfTElORV9JRF9fKTtcbiAgY29uc3QgbGluZU1vZGUgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX0xJTkVfTU9ERV9fKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBpc0NyZWF0ZU1vZGUgPSBsaW5lTW9kZSA9PT0gXCJjcmVhdGVcIjtcblxuICBjb25zdCB7XG4gICAgaGVhZGVyLFxuICAgIGxpbmUsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBidXN5LFxuICAgIHN0YXR1cyxcbiAgICBpc0VkaXRpbmcsXG4gICAgbW9kYWxFcnJvcixcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0VHJhbnNEYXRlLFxuICAgIGRyYWZ0VHlwZVZhbHVlQ29kZSxcbiAgICBkcmFmdEFtb3VudCxcbiAgICBkcmFmdFF0eSxcbiAgICBkcmFmdFByb2plY3RJZCxcbiAgICBkcmFmdEludGVybmF0aW9uYWwsXG4gICAgaXNTaGVldFBhaWQsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNFZGl0aW5nLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcbiAgICBzZXREcmFmdFRyYW5zRGF0ZSxcbiAgICBzZXREcmFmdFR5cGVWYWx1ZUNvZGUsXG4gICAgc2V0RHJhZnRBbW91bnQsXG4gICAgc2V0RHJhZnRRdHksXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXG4gICAgc2V0RHJhZnRJbnRlcm5hdGlvbmFsLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVPcGVuQ3JlYXRlTW9kZSxcbiAgICBuYXZpZ2F0ZVRvU2hlZXREZXRhaWwsXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsU3RhdGUoe1xuICAgIGhhc0FjY2VzcyxcbiAgICBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGNhbkVkaXRFeHBlbnNlLFxuICAgIHNoZWV0SWQsXG4gICAgbGluZUlkLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcbiAgfSk7XG5cbiAgY29uc3QgYW1vdW50VGV4dCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGxpbmU/LmFtb3VudCA/PyBudWxsLCBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSkpLFxuICAgIFtoZWFkZXI/LmN1cnJlbmN5Q29kZSwgbGluZT8uYW1vdW50XVxuICApO1xuICBjb25zdCBwcm9qZWN0VmFsdWUgPSBzYWZlVGV4dChsaW5lPy5wcm9qSWQgfHwgaGVhZGVyPy5wcm9qSWQpO1xuICBjb25zdCBzaGVldERlc2NyaXB0aW9uID0gc2FmZVRleHQoaGVhZGVyPy5kZXNjcmlwdGlvbikgfHwgXCItXCI7XG4gIGNvbnN0IGludGVybmFjaW9uYWxMYWJlbCA9IGdldEV4cGVuc2VJbnRlcm5hdGlvbmFsTGFiZWwobGluZT8uaW50ZXJuYWNpb25hbCk7XG5cbiAgY29uc3QgZ2FzdG9UeXBlT3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiB7XG4gICAgY29uc3Qgc291cmNlID0gQXJyYXkuaXNBcnJheSh3aW5kb3cuX19FWFBFTlNFX0dBU1RPX1RZUEVTX18pID8gd2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fIDogW107XG4gICAgY29uc3QgbWFwcGVkID0gbWFwV2luZG93RW51bU9wdGlvbnMoc291cmNlKTtcblxuICAgIGNvbnN0IGN1cnJlbnRUeXBlQ29kZSA9IHNhZmVUZXh0KGxpbmU/LnR5cGVWYWx1ZUNvZGUpO1xuICAgIGNvbnN0IGN1cnJlbnRUeXBlTGFiZWwgPSBzYWZlVGV4dChsaW5lPy50eXBlVmFsdWUpO1xuICAgIGlmIChjdXJyZW50VHlwZUNvZGUgJiYgIW1hcHBlZC5zb21lKChpdGVtKSA9PiBpdGVtLnZhbHVlID09PSBjdXJyZW50VHlwZUNvZGUpKSB7XG4gICAgICBtYXBwZWQucHVzaCh7XG4gICAgICAgIHZhbHVlOiBjdXJyZW50VHlwZUNvZGUsXG4gICAgICAgIHRleHQ6IGN1cnJlbnRUeXBlTGFiZWwgfHwgY3VycmVudFR5cGVDb2RlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcHBlZDtcbiAgfSwgW2xpbmU/LnR5cGVWYWx1ZSwgbGluZT8udHlwZVZhbHVlQ29kZV0pO1xuXG4gIGNvbnN0IGludGVybmF0aW9uYWxPcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFxuICAgICgpID0+IG1hcEJvb2xlYW5FbnVtT3B0aW9ucyhnZXRFeHBlbnNlSW50ZXJuYXRpb25hbE9wdGlvbnMoKSksXG4gICAgW11cbiAgKTtcblxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcbiAgICBkZWZhdWx0Q29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpLFxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKSxcbiAgfSk7XG5cbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XG4gICAgICBidXN5LFxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xuICAgICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm0sIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1c10pO1xuXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpO1xuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxuICAgIDogIWJ1c3kgJiYgbW9kYWxFcnJvclxuICAgICAgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIilcbiAgICAgIDogbW9kYWwuY29uZmlybVRleHQgfHwgaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIik7XG5cbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghYnVzeSAmJiBtb2RhbEVycm9yKSB7XG4gICAgICBjbG9zZUNvbmZpcm0oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaGFuZGxlTW9kYWxDb25maXJtKCk7XG4gIH0sIFtidXN5LCBjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbW9kYWxFcnJvcl0pO1xuXG4gIGNvbnN0IHsgaGFuZGxlVXBkYXRlLCBoYW5kbGVEZWxldGUgfSA9IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxNdXRhdGlvbnMoe1xuICAgIGJ1c3ksXG4gICAgaXNFZGl0aW5nLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBpc0xvY2tlZDogaXNTaGVldFBhaWQsXG4gICAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgICBjYW5FZGl0RXhwZW5zZSxcbiAgICBjYW5EZWxldGVFeHBlbnNlLFxuICAgIHNoZWV0SWQsXG4gICAgbGluZUlkLFxuICAgIGxpbmUsXG4gICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICBkcmFmdFRyYW5zRGF0ZSxcbiAgICBkcmFmdFR5cGVWYWx1ZUNvZGUsXG4gICAgZHJhZnRBbW91bnQsXG4gICAgZHJhZnRRdHksXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgZHJhZnRJbnRlcm5hdGlvbmFsLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNFZGl0aW5nLFxuICAgIG9uQ3JlYXRlU3VjY2VzczogKCkgPT4ge30sXG4gIH0pO1xuXG4gIHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zKHtcbiAgICBidXN5LFxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcbiAgICBpc0VkaXRpbmcsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzTG9ja2VkOiBpc1NoZWV0UGFpZCxcbiAgICBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGNhbkVkaXRFeHBlbnNlLFxuICAgIGNhbkRlbGV0ZUV4cGVuc2UsXG4gICAgc2hlZXRJZCxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgICAgbmF2aWdhdGVUb1NoZWV0RGV0YWlsKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0sXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgY2xvc2VDb25maXJtLFxuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICA8Q29uZmlybU1vZGFsXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsQ29uZmlybVRleHR9XG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cbiAgICAgICAgYnVzeT17YnVzeX1cbiAgICAgICAgZXJyb3I9e21vZGFsRXJyb3J9XG4gICAgICAgIHN0YXR1cz17c3RhdHVzfVxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cbiAgICAgICAgb25DYW5jZWw9e2Nsb3NlQ29uZmlybX1cbiAgICAgIC8+XG5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCJcbiAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogaXNMb2FkaW5nID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxuICAgICAgPlxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XG4gICAgICA8L2Rpdj5cblxuICAgICAge2Vycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57ZXJyb3JNZXNzYWdlfTwvZGl2PiA6IG51bGx9XG5cbiAgICAgIHshaXNMb2FkaW5nICYmICFlcnJvck1lc3NhZ2UgJiYgbGluZSA/IChcbiAgICAgICAgPEV4cGVuc2VTaGVldExpbmVGb3JtXG4gICAgICAgICAgbGluZT17bGluZX1cbiAgICAgICAgICBmYWxsYmFja0RhdGU9e3NhZmVUZXh0KGhlYWRlcj8uY3JlYXRlZERhdGUpfVxuICAgICAgICAgIHNoZWV0RGVzY3JpcHRpb249e3NoZWV0RGVzY3JpcHRpb259XG4gICAgICAgICAgcHJvamVjdFZhbHVlPXtwcm9qZWN0VmFsdWV9XG4gICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cbiAgICAgICAgICBpbnRlcm5hY2lvbmFsTGFiZWw9e2ludGVybmFjaW9uYWxMYWJlbH1cbiAgICAgICAgICBzdGF0dXM9e3N0YXR1c31cbiAgICAgICAgICBpc0VkaXRpbmc9e2lzRWRpdGluZ31cbiAgICAgICAgICBnYXN0b1R5cGVPcHRpb25zPXtnYXN0b1R5cGVPcHRpb25zfVxuICAgICAgICAgIGludGVybmF0aW9uYWxPcHRpb25zPXtpbnRlcm5hdGlvbmFsT3B0aW9uc31cbiAgICAgICAgICBkcmFmdERlc2NyaXB0aW9uPXtkcmFmdERlc2NyaXB0aW9ufVxuICAgICAgICAgIGRyYWZ0VHJhbnNEYXRlPXtkcmFmdFRyYW5zRGF0ZX1cbiAgICAgICAgICBkcmFmdFR5cGVWYWx1ZUNvZGU9e2RyYWZ0VHlwZVZhbHVlQ29kZX1cbiAgICAgICAgICBkcmFmdEFtb3VudD17ZHJhZnRBbW91bnR9XG4gICAgICAgICAgZHJhZnRRdHk9e2RyYWZ0UXR5fVxuICAgICAgICAgIGRyYWZ0UHJvamVjdElkPXtkcmFmdFByb2plY3RJZH1cbiAgICAgICAgICBkcmFmdEludGVybmF0aW9uYWw9e2RyYWZ0SW50ZXJuYXRpb25hbH1cbiAgICAgICAgICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U9e3NldERyYWZ0RGVzY3JpcHRpb259XG4gICAgICAgICAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZT17c2V0RHJhZnRUcmFuc0RhdGV9XG4gICAgICAgICAgb25EcmFmdFR5cGVWYWx1ZUNvZGVDaGFuZ2U9e3NldERyYWZ0VHlwZVZhbHVlQ29kZX1cbiAgICAgICAgICBvbkRyYWZ0QW1vdW50Q2hhbmdlPXtzZXREcmFmdEFtb3VudH1cbiAgICAgICAgICBvbkRyYWZ0UXR5Q2hhbmdlPXtzZXREcmFmdFF0eX1cbiAgICAgICAgICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlPXtzZXREcmFmdFByb2plY3RJZH1cbiAgICAgICAgICBvbkRyYWZ0SW50ZXJuYXRpb25hbENoYW5nZT17c2V0RHJhZnRJbnRlcm5hdGlvbmFsfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIHtjYW5DcmVhdGVFeHBlbnNlICYmICFpc0NyZWF0ZU1vZGUgPyAoXG4gICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxuICAgICAgICAgIHJvdXRlPVwiXCJcbiAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJDb21tb25fQ3JlYXRlXCIsIFwiQ3JlYXRlXCIpfVxuICAgICAgICAgIHNpemU9ezc2fVxuICAgICAgICAgIHJpZ2h0PXsxNn1cbiAgICAgICAgICBib3R0b209ezI0fVxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZU9wZW5DcmVhdGVNb2RlfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2Ugc2hlZXQgbGluZSBkZXRhaWwuXG5jb25zdCBFeHBlbnNlU2hlZXRMaW5lRGV0YWlsUGFnZSA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnM+XG4gICAgICA8RXhwZW5zZVNoZWV0TGluZURldGFpbENvbnRlbnQgLz5cbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICApO1xufTtcblxuY29uc3QgbW91bnQgPSAoKSA9PiB7XG4gIGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoKCk7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS1saW5lLWRldGFpbC1yb290XCIpO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VTaGVldExpbmVEZXRhaWxQYWdlIC8+KTtcbn07XG5cbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXRMaW5lRGV0YWlsUGFnZTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcbmltcG9ydCBTaW5nbGVEYXRlUGlja2VyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2luZ2xlRGF0ZVBpY2tlci50c3hcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dCBmcm9tIFwiLi9FeHBlbnNlUHJvamVjdEZpbHRlcklucHV0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VSZWFkT25seUZpZWxkIGZyb20gXCIuL0V4cGVuc2VSZWFkT25seUZpZWxkLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VTZWN0aW9uRGl2aWRlciBmcm9tIFwiLi9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4XCI7XG5cbnR5cGUgRXhwZW5zZVNoZWV0TGluZUZvcm1Qcm9wcyA9IHtcbiAgbGluZTogRXhwZW5zZVNoZWV0TGluZTtcbiAgZmFsbGJhY2tEYXRlOiBzdHJpbmc7XG4gIHNoZWV0RGVzY3JpcHRpb246IHN0cmluZztcbiAgcHJvamVjdFZhbHVlOiBzdHJpbmc7XG4gIGFtb3VudFRleHQ6IHN0cmluZztcbiAgaW50ZXJuYWNpb25hbExhYmVsOiBzdHJpbmc7XG4gIHN0YXR1czogc3RyaW5nO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGdhc3RvVHlwZU9wdGlvbnM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXTtcbiAgaW50ZXJuYXRpb25hbE9wdGlvbnM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXTtcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xuICBkcmFmdFR5cGVWYWx1ZUNvZGU6IHN0cmluZztcbiAgZHJhZnRBbW91bnQ6IHN0cmluZztcbiAgZHJhZnRRdHk6IHN0cmluZztcbiAgZHJhZnRQcm9qZWN0SWQ6IHN0cmluZztcbiAgZHJhZnRJbnRlcm5hdGlvbmFsOiBzdHJpbmc7XG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0VHlwZVZhbHVlQ29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRBbW91bnRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0UXR5Q2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdFByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRJbnRlcm5hdGlvbmFsQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbi8vIFB1cmUgZm9ybSByZW5kZXJlciBmb3IgZXhwZW5zZSBsaW5lIGRldGFpbCBpbiByZWFkIGFuZCBlZGl0IG1vZGVzLlxuY29uc3QgRXhwZW5zZVNoZWV0TGluZUZvcm0gPSAoe1xuICBsaW5lLFxuICBmYWxsYmFja0RhdGUsXG4gIHNoZWV0RGVzY3JpcHRpb24sXG4gIHByb2plY3RWYWx1ZSxcbiAgYW1vdW50VGV4dCxcbiAgaW50ZXJuYWNpb25hbExhYmVsLFxuICBzdGF0dXMsXG4gIGlzRWRpdGluZyxcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcbiAgaW50ZXJuYXRpb25hbE9wdGlvbnMsXG4gIGRyYWZ0RGVzY3JpcHRpb24sXG4gIGRyYWZ0VHJhbnNEYXRlLFxuICBkcmFmdFR5cGVWYWx1ZUNvZGUsXG4gIGRyYWZ0QW1vdW50LFxuICBkcmFmdFF0eSxcbiAgZHJhZnRQcm9qZWN0SWQsXG4gIGRyYWZ0SW50ZXJuYXRpb25hbCxcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlLFxuICBvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlLFxuICBvbkRyYWZ0VHlwZVZhbHVlQ29kZUNoYW5nZSxcbiAgb25EcmFmdEFtb3VudENoYW5nZSxcbiAgb25EcmFmdFF0eUNoYW5nZSxcbiAgb25EcmFmdFByb2plY3RJZENoYW5nZSxcbiAgb25EcmFmdEludGVybmF0aW9uYWxDaGFuZ2UsXG59OiBFeHBlbnNlU2hlZXRMaW5lRm9ybVByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic3BhY2UteS0wXCI+XG4gICAgICA8RXhwZW5zZVNlY3Rpb25EaXZpZGVyXG4gICAgICAgIGxhYmVsPXtzaGVldERlc2NyaXB0aW9ufVxuICAgICAgICBjbGFzc05hbWU9XCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlci0tc3BhY2VkXCJcbiAgICAgICAgbGFiZWxDbGFzc05hbWU9XCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlcl9fbGFiZWwtLXRpdGxlXCJcbiAgICAgIC8+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInJlbGF0aXZlIHNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtOmNvbC1zcGFuLTIgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfTwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0RGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cbiAgICAgICAgICAgICAgdmFsdWU9e3NhZmVUZXh0KGxpbmUuZGVzY3JpcHRpb24pIHx8IFwiLVwifVxuICAgICAgICAgICAgICBmdWxsV2lkdGhcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpc2l0YS1maWVsZC10ZXh0XCI+XG4gICAgICAgICAgICAgIDxTaW5nbGVEYXRlUGlja2VyXG4gICAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0NyZWF0ZWREYXRlXCIsIFwiRGF0ZVwiKX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRUcmFuc0RhdGV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRUcmFuc0RhdGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmd9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmd9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DcmVhdGVkRGF0ZVwiLCBcIkRhdGVcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXtmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoXG4gICAgICAgICAgICAgICAgc2FmZVRleHQobGluZS50cmFuc0RhdGUgfHwgZmFsbGJhY2tEYXRlKSxcbiAgICAgICAgICAgICAgICBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVHlwZVwiLCBcIlR5cGVcIil9XG4gICAgICAgICAgICAgIG9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFR5cGVWYWx1ZUNvZGUgfHwgXCJcIn1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRUeXBlVmFsdWVDb2RlQ2hhbmdlfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVHlwZVwiLCBcIlR5cGVcIil9XG4gICAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XG4gICAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1R5cGVcIiwgXCJUeXBlXCIpfSB2YWx1ZT17c2FmZVRleHQobGluZS50eXBlVmFsdWUpIHx8IFwiLVwifSAvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Ftb3VudFwiLCBcIkFtb3VudFwiKX08L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgIHN0ZXA9XCJhbnlcIlxuICAgICAgICAgICAgICAgIGlucHV0TW9kZT1cImRlY2ltYWxcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdEFtb3VudH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0QW1vdW50Q2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9BbW91bnRcIiwgXCJBbW91bnRcIil9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9BbW91bnRcIiwgXCJBbW91bnRcIil9IHZhbHVlPXthbW91bnRUZXh0IHx8IFwiLVwifSAvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfTwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgc3RlcD1cImFueVwiXG4gICAgICAgICAgICAgICAgaW5wdXRNb2RlPVwiZGVjaW1hbFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0UXR5fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnRRdHlDaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUXR5XCIsIFwiUXVhbnRpdHlcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXtsaW5lLnF0eSAhPSBudWxsID8gU3RyaW5nKGxpbmUucXR5KSA6IFwiLVwifVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICAgIDxFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0XG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Qcm9qZWN0X1BsYWNlaG9sZGVyXCIsIFwiUHJvamVjdCBpZFwiKX1cbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0UHJvamVjdElkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdFByb2plY3RJZENoYW5nZX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmd9XG4gICAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogcHJvamVjdFZhbHVlID8gKFxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX0gdmFsdWU9e3Byb2plY3RWYWx1ZX0gLz5cbiAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXG4gICAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0ludGVybmF0aW9uYWxcIiwgXCJJbnRlcm5hdGlvbmFsXCIpfVxuICAgICAgICAgICAgICBvcHRpb25zPXtpbnRlcm5hdGlvbmFsT3B0aW9uc31cbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0SW50ZXJuYXRpb25hbCB8fCBcIlwifVxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEludGVybmF0aW9uYWxDaGFuZ2V9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9JbnRlcm5hdGlvbmFsXCIsIFwiSW50ZXJuYXRpb25hbFwiKX1cbiAgICAgICAgICAgICAgdXNlUG9ydGFsPXtmYWxzZX1cbiAgICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfSW50ZXJuYXRpb25hbFwiLCBcIkludGVybmF0aW9uYWxcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXtpbnRlcm5hY2lvbmFsTGFiZWx9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHRleHQtc20gdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAgICA8c3Bhbj57c3RhdHVzfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0TGluZUZvcm07XG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbmV4cG9ydCB0eXBlIEV4cGVuc2VJbnRlcm5hdGlvbmFsT3B0aW9uID0ge1xuICB2YWx1ZTogYm9vbGVhbjtcbiAgdGV4dDogc3RyaW5nO1xufTtcblxuLy8gRml4ZWQgZW51bSBmb3IgXCJJbnRlcm5hY2lvbmFsXCIgZmllbGQgaW4gZXhwZW5zZSBzaGVldCBsaW5lcy5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlSW50ZXJuYXRpb25hbE9wdGlvbnMgPSAoKTogRXhwZW5zZUludGVybmF0aW9uYWxPcHRpb25bXSA9PiBbXG4gIHsgdmFsdWU6IHRydWUsIHRleHQ6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ludGVybmF0aW9uYWxfWWVzXCIsIFwiU2lcIikgfSxcbiAgeyB2YWx1ZTogZmFsc2UsIHRleHQ6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ludGVybmF0aW9uYWxfTm9cIiwgXCJOb1wiKSB9LFxuXTtcblxuLy8gTWFwcyBudWxsYWJsZSBib29sZWFuIHZhbHVlcyB0byBmaXhlZCBlbnVtIGxhYmVscyBmb3IgcmVhZC1vbmx5IHJlbmRlcmluZy5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlSW50ZXJuYXRpb25hbExhYmVsID0gKHZhbHVlOiBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19JbnRlcm5hdGlvbmFsX1llc1wiLCBcIlNpXCIpO1xuICB9XG5cbiAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xuICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19JbnRlcm5hdGlvbmFsX05vXCIsIFwiTm9cIik7XG4gIH1cblxuICByZXR1cm4gXCItXCI7XG59O1xuXG4vLyBQYXJzZXMgdXNlciBpbnB1dCBiYWNrIHRvIG51bGxhYmxlIGJvb2xlYW4gZm9yIGZ1dHVyZSBlZGl0IG1vZGUuXG5leHBvcnQgY29uc3QgcGFyc2VFeHBlbnNlSW50ZXJuYXRpb25hbFZhbHVlID0gKHJhdzogc3RyaW5nIHwgYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQpOiBib29sZWFuIHwgbnVsbCA9PiB7XG4gIGlmIChyYXcgPT09IHRydWUgfHwgcmF3ID09PSBmYWxzZSkge1xuICAgIHJldHVybiByYXc7XG4gIH1cblxuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcgfHwgXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PT0gXCJ0cnVlXCIgfHwgdmFsdWUgPT09IFwiMVwiKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAodmFsdWUgPT09IFwiZmFsc2VcIiB8fCB2YWx1ZSA9PT0gXCIwXCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IHR5cGUgRXhwZW5zZVNlbGVjdE9wdGlvbiA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgdGV4dDogc3RyaW5nO1xuICBpY29uPzogUmVhY3ROb2RlO1xufTtcblxudHlwZSBXaW5kb3dFbnVtSXRlbSA9IHtcbiAgdmFsdWU/OiB1bmtub3duO1xuICBWYWx1ZT86IHVua25vd247XG4gIHRleHQ/OiB1bmtub3duO1xuICBUZXh0PzogdW5rbm93bjtcbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlT3B0aW9uVmFsdWUgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gU3RyaW5nKHZhbHVlID8/IFwiXCIpLnRyaW0oKTtcbn07XG5cbi8vIE1hcHMgbWl4ZWQtY2FzZSBlbnVtIHBheWxvYWRzIChWYWx1ZS92YWx1ZSArIFRleHQvdGV4dCkgaW50byBvbmUgbm9ybWFsaXplZCBsaXN0LlxuZXhwb3J0IGNvbnN0IG1hcFdpbmRvd0VudW1PcHRpb25zID0gKHNvdXJjZTogV2luZG93RW51bUl0ZW1bXSk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XG4gIHJldHVybiBzb3VyY2VcbiAgICAubWFwKChpdGVtKSA9PiAoe1xuICAgICAgdmFsdWU6IG5vcm1hbGl6ZUV4cGVuc2VPcHRpb25WYWx1ZShpdGVtPy52YWx1ZSA/PyBpdGVtPy5WYWx1ZSksXG4gICAgICB0ZXh0OiBub3JtYWxpemVFeHBlbnNlT3B0aW9uVmFsdWUoaXRlbT8udGV4dCA/PyBpdGVtPy5UZXh0KSxcbiAgICB9KSlcbiAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnZhbHVlICYmIGl0ZW0udGV4dCk7XG59O1xuXG4vLyBDb252ZXJ0cyBib29sZWFuIGVudW1zIHRvIHNlbGVjdCBvcHRpb25zIHdpdGggc3RyaW5nIGJvb2xlYW4gdmFsdWVzLlxuZXhwb3J0IGNvbnN0IG1hcEJvb2xlYW5FbnVtT3B0aW9ucyA9IChzb3VyY2U6IEFycmF5PHsgdmFsdWU6IGJvb2xlYW47IHRleHQ6IHN0cmluZyB9Pik6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XG4gIHJldHVybiBzb3VyY2UubWFwKChpdGVtKSA9PiAoe1xuICAgIHZhbHVlOiBpdGVtLnZhbHVlID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIsXG4gICAgdGV4dDogbm9ybWFsaXplRXhwZW5zZU9wdGlvblZhbHVlKGl0ZW0udGV4dCksXG4gIH0pKTtcbn07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVNoZWV0Q3JlYXRlTGluZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldExpbmUsXG4gIEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBwYXJzZUV4cGVuc2VJbnRlcm5hdGlvbmFsVmFsdWUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2ludGVybmF0aW9uYWxPcHRpb25zLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbiwgcGFyc2VEZWNpbWFsSW5wdXQgfSBmcm9tIFwiLi4vaG9va3MvZXhwZW5zZU11dGF0aW9uVXRpbHMudHNcIjtcbmltcG9ydCB7IGNyZWF0ZUV4cGVuc2VTaGVldCwgZGVsZXRlRXhwZW5zZVNoZWV0TGluZSwgdXBkYXRlRXhwZW5zZVNoZWV0TGluZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbE11dGF0aW9uc0FyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBpc0xvY2tlZDogYm9vbGVhbjtcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIHNoZWV0SWQ6IHN0cmluZztcbiAgbGluZUlkOiBzdHJpbmc7XG4gIGxpbmU6IEV4cGVuc2VTaGVldExpbmUgfCBudWxsO1xuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XG4gIGRyYWZ0VHlwZVZhbHVlQ29kZTogc3RyaW5nO1xuICBkcmFmdEFtb3VudDogc3RyaW5nO1xuICBkcmFmdFF0eTogc3RyaW5nO1xuICBkcmFmdFByb2plY3RJZDogc3RyaW5nO1xuICBkcmFmdEludGVybmF0aW9uYWw6IHN0cmluZztcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIG9uQ3JlYXRlU3VjY2VzczogKCkgPT4gdm9pZDtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUxpbmVEYXRlID0gKHJhdzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3IHx8IFwiXCIpLnRyaW0oKTtcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XG5cbiAgaWYgKC9eXFxkezh9JC8udGVzdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBpZiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoLy0vZywgXCJcIik7XG4gIH1cblxuICBjb25zdCBwYXJzZWQgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gIGlmIChOdW1iZXIuaXNOYU4ocGFyc2VkLmdldFRpbWUoKSkpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIGNvbnN0IHl5eXkgPSBwYXJzZWQuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbW0gPSBTdHJpbmcocGFyc2VkLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIGNvbnN0IGRkID0gU3RyaW5nKHBhcnNlZC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgcmV0dXJuIGAke3l5eXl9JHttbX0ke2RkfWA7XG59O1xuXG5jb25zdCBwYXJzZU51bWJlciA9IChyYXc6IHN0cmluZyk6IG51bWJlciB8IG51bGwgPT4gcGFyc2VEZWNpbWFsSW5wdXQocmF3KTtcblxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgZXhwZW5zZSBzaGVldCBsaW5lIGRldGFpbC5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zID0gKHtcbiAgYnVzeSxcbiAgaXNFZGl0aW5nLFxuICBpc0NyZWF0ZU1vZGUsXG4gIGlzTG9ja2VkLFxuICBjYW5DcmVhdGVFeHBlbnNlLFxuICBjYW5FZGl0RXhwZW5zZSxcbiAgY2FuRGVsZXRlRXhwZW5zZSxcbiAgc2hlZXRJZCxcbiAgbGluZUlkLFxuICBsaW5lLFxuICBkcmFmdERlc2NyaXB0aW9uLFxuICBkcmFmdFRyYW5zRGF0ZSxcbiAgZHJhZnRUeXBlVmFsdWVDb2RlLFxuICBkcmFmdEFtb3VudCxcbiAgZHJhZnRRdHksXG4gIGRyYWZ0UHJvamVjdElkLFxuICBkcmFmdEludGVybmF0aW9uYWwsXG4gIHNldE1vZGFsRXJyb3IsXG4gIHNldEJ1c3ksXG4gIHNldFN0YXR1cyxcbiAgc2V0SXNFZGl0aW5nLFxuICBvbkNyZWF0ZVN1Y2Nlc3MsXG59OiBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGJ1c3kgfHwgIWlzRWRpdGluZykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChpc0xvY2tlZCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgY2FuUHJvY2VlZCA9IGlzQ3JlYXRlTW9kZSA/IGNhbkNyZWF0ZUV4cGVuc2UgOiBjYW5FZGl0RXhwZW5zZTtcbiAgICBpZiAoIWNhblByb2NlZWQpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IG5vcm1hbGl6ZUxpbmVEYXRlKGRyYWZ0VHJhbnNEYXRlKTtcbiAgICBjb25zdCBwYXJzZWRUeXBlVmFsdWUgPSBOdW1iZXIucGFyc2VJbnQoU3RyaW5nKGRyYWZ0VHlwZVZhbHVlQ29kZSB8fCBcIlwiKS50cmltKCksIDEwKTtcbiAgICBjb25zdCBwYXJzZWRBbW91bnQgPSBwYXJzZU51bWJlcihkcmFmdEFtb3VudCk7XG4gICAgY29uc3QgcGFyc2VkUXR5ID0gcGFyc2VOdW1iZXIoZHJhZnRRdHkpO1xuICAgIGNvbnN0IHBhcnNlZEludGVybmF0aW9uYWwgPSBwYXJzZUV4cGVuc2VJbnRlcm5hdGlvbmFsVmFsdWUoZHJhZnRJbnRlcm5hdGlvbmFsKTtcblxuICAgIGNvbnN0IGhhc1ZhbGlkUXR5QW1vdW50ID0gcGFyc2VkUXR5ICE9IG51bGwgJiYgcGFyc2VkUXR5ID4gMCAmJiBwYXJzZWRBbW91bnQgIT0gbnVsbCAmJiBwYXJzZWRBbW91bnQgPj0gMDtcbiAgICBpZiAoIWhhc1ZhbGlkUXR5QW1vdW50KSB7XG4gICAgICBjb25zdCB2YWxpZGF0aW9uTWVzc2FnZSA9IGluZFQoXG4gICAgICAgIFwiRXhwZW5zZVNoZWV0c19MaW5lX1ZhbGlkYXRpb25fQW1vdW50UXR5XCIsXG4gICAgICAgIFwiUXVhbnRpdHkgbXVzdCBiZSBncmVhdGVyIHRoYW4gMCBhbmQgYW1vdW50IGNhbm5vdCBiZSBuZWdhdGl2ZS5cIlxuICAgICAgKTtcbiAgICAgIHNldE1vZGFsRXJyb3IodmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgICAgc2V0U3RhdHVzKHZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIW5vcm1hbGl6ZWREYXRlIHx8ICFOdW1iZXIuaXNGaW5pdGUocGFyc2VkVHlwZVZhbHVlKSB8fCBwYXJzZWRUeXBlVmFsdWUgPD0gMCkge1xuICAgICAgY29uc3QgdmFsaWRhdGlvbk1lc3NhZ2UgPSBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIik7XG4gICAgICBzZXRNb2RhbEVycm9yKHZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICAgIHNldFN0YXR1cyh2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XG4gICAgICBzdGFydFN0YXR1czogaXNDcmVhdGVNb2RlXG4gICAgICAgID8gaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfQ3JlYXRpbmdcIiwgXCJDcmVhdGluZyBleHBlbnNlIGxpbmUuLi5cIilcbiAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9VcGRhdGluZ1wiLCBcIlVwZGF0aW5nIGV4cGVuc2UgbGluZS4uLlwiKSxcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpLFxuICAgICAgc2V0TW9kYWxFcnJvcixcbiAgICAgIHNldEJ1c3ksXG4gICAgICBzZXRTdGF0dXMsXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgY29tbW9uTGluZVBheWxvYWQgPSB7XG4gICAgICAgICAgdHJhbnNEYXRlOiBub3JtYWxpemVkRGF0ZSxcbiAgICAgICAgICB0eXBlVmFsdWU6IHBhcnNlZFR5cGVWYWx1ZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogU3RyaW5nKGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpLFxuICAgICAgICAgIGludGVybmFjaW9uYWw6IHBhcnNlZEludGVybmF0aW9uYWwgPz8gbGluZT8uaW50ZXJuYWNpb25hbCA/PyBmYWxzZSxcbiAgICAgICAgICB0aWNrZXQ6IGxpbmU/LnRpY2tldCA9PT0gdHJ1ZSxcbiAgICAgICAgICBxdHk6IHBhcnNlZFF0eSxcbiAgICAgICAgICBwcm9qSWQ6IFN0cmluZyhkcmFmdFByb2plY3RJZCB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgIGluZEF0dGFjaEZpbGVzOiBzYWZlVGV4dChsaW5lPy5pbmRBdHRhY2hGaWxlcyksXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgY3JlYXRlTGluZVBheWxvYWQ6IEV4cGVuc2VTaGVldENyZWF0ZUxpbmVSZXF1ZXN0ID0ge1xuICAgICAgICAgIC4uLmNvbW1vbkxpbmVQYXlsb2FkLFxuICAgICAgICAgIGFtb3VudDogcGFyc2VkQW1vdW50LFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZUxpbmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVxdWVzdCA9IHtcbiAgICAgICAgICAuLi5jb21tb25MaW5lUGF5bG9hZCxcbiAgICAgICAgICBBbW91bnQ6IHBhcnNlZEFtb3VudCxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGlzQ3JlYXRlTW9kZVxuICAgICAgICAgID8gYXdhaXQgY3JlYXRlRXhwZW5zZVNoZWV0KHtcbiAgICAgICAgICAgICAgbW9kZTogMixcbiAgICAgICAgICAgICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IHNoZWV0SWQsXG4gICAgICAgICAgICAgIGxpbmVzOiBbY3JlYXRlTGluZVBheWxvYWRdLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICA6IGF3YWl0IHVwZGF0ZUV4cGVuc2VTaGVldExpbmUoc2hlZXRJZCwgbGluZUlkLCB1cGRhdGVMaW5lUGF5bG9hZCk7XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfQ3JlYXRlZFwiLCBcIkV4cGVuc2UgbGluZSBjcmVhdGVkXCIpKTtcbiAgICAgICAgICBvbkNyZWF0ZVN1Y2Nlc3MoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2UgbGluZSB1cGRhdGVkXCIpKTtcbiAgICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQub2s7XG4gIH0sIFtcbiAgICBidXN5LFxuICAgIGNhbkNyZWF0ZUV4cGVuc2UsXG4gICAgY2FuRWRpdEV4cGVuc2UsXG4gICAgZHJhZnRBbW91bnQsXG4gICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICBkcmFmdEludGVybmF0aW9uYWwsXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgZHJhZnRRdHksXG4gICAgZHJhZnRUcmFuc0RhdGUsXG4gICAgZHJhZnRUeXBlVmFsdWVDb2RlLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBpc0xvY2tlZCxcbiAgICBpc0VkaXRpbmcsXG4gICAgbGluZSxcbiAgICBsaW5lSWQsXG4gICAgb25DcmVhdGVTdWNjZXNzLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0SXNFZGl0aW5nLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0U3RhdHVzLFxuICAgIHNoZWV0SWQsXG4gIF0pO1xuXG4gIGNvbnN0IGhhbmRsZURlbGV0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChpc0xvY2tlZCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY2FuRGVsZXRlRXhwZW5zZSkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xuICAgICAgc3RhcnRTdGF0dXM6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVfRGV0YWlsX0RlbGV0aW5nXCIsIFwiRGVsZXRpbmcgZXhwZW5zZSBsaW5lLi4uXCIpLFxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIiksXG4gICAgICBzZXRNb2RhbEVycm9yLFxuICAgICAgc2V0QnVzeSxcbiAgICAgIHNldFN0YXR1cyxcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldExpbmUoc2hlZXRJZCwgbGluZUlkKTtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVfRGV0YWlsX0RlbGV0ZWRcIiwgXCJFeHBlbnNlIGxpbmUgZGVsZXRlZFwiKSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQub2s7XG4gIH0sIFtidXN5LCBjYW5EZWxldGVFeHBlbnNlLCBpc0xvY2tlZCwgbGluZUlkLCBzZXRCdXN5LCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXMsIHNoZWV0SWRdKTtcblxuICByZXR1cm4ge1xuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zIH0gZnJvbSBcIi4uL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50c1wiO1xuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcblxudHlwZSBVc2VFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XG4gIGlzTG9ja2VkOiBib29sZWFuO1xuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xuICBjYW5FZGl0RXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRGVsZXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgc2hlZXRJZDogc3RyaW5nO1xuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICBoYW5kbGVEZWxldGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XG4gIG9wZW5Db25maXJtOiAob3B0czoge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XG4gIH0pID0+IHZvaWQ7XG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcbn07XG5cbi8vIENvb3JkaW5hdGVzIHRvcGJhciBpY29uIHN0YXRlIGFuZCBkaXNwYXRjaCBhY3Rpb25zIGZvciBleHBlbnNlIHNoZWV0IGxpbmUgZGV0YWlsLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcbiAgYnVzeSxcbiAgbW9kYWxPcGVuLFxuICBpc0VkaXRpbmcsXG4gIGlzQ3JlYXRlTW9kZSxcbiAgaXNMb2NrZWQsXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXG4gIGNhbkVkaXRFeHBlbnNlLFxuICBjYW5EZWxldGVFeHBlbnNlLFxuICBzaGVldElkLFxuICBzZXRNb2RhbEVycm9yLFxuICBoYW5kbGVFbmFibGVFZGl0LFxuICBoYW5kbGVDYW5jZWxFZGl0LFxuICBoYW5kbGVVcGRhdGUsXG4gIGhhbmRsZURlbGV0ZSxcbiAgb25TYXZlU3VjY2VzcyxcbiAgb3BlbkNvbmZpcm0sXG4gIGNsb3NlQ29uZmlybSxcbn06IFVzZUV4cGVuc2VTaGVldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zQXJncykgPT4ge1xuICB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMoe1xuICAgIGlkczoge1xuICAgICAgZWRpdEljb25JZDogXCJleHBlbnNlTGluZUVkaXRJY29uXCIsXG4gICAgICBzYXZlSWNvbklkOiBcImV4cGVuc2VMaW5lU2F2ZUljb25cIixcbiAgICAgIGRlbGV0ZUJ0bklkOiBcImV4cGVuc2VMaW5lRGVsZXRlQnRuXCIsXG4gICAgICBjYW5jZWxCdG5JZDogXCJleHBlbnNlTGluZUNhbmNlbEJ0blwiLFxuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICBlZGl0RXZlbnQ6IFwiZXhwZW5zZS1saW5lLWRldGFpbC1lZGl0XCIsXG4gICAgICBkZWxldGVFdmVudDogXCJleHBlbnNlLWxpbmUtZGV0YWlsLWRlbGV0ZVwiLFxuICAgICAgY2FuY2VsRXZlbnQ6IFwiZXhwZW5zZS1saW5lLWRldGFpbC1jYW5jZWwtZWRpdFwiLFxuICAgIH0sXG4gICAgYnVzeSxcbiAgICBtb2RhbE9wZW4sXG4gICAgaXNFZGl0aW5nLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBpc0xvY2tlZCxcbiAgICBjYW5DcmVhdGU6IGNhbkNyZWF0ZUV4cGVuc2UsXG4gICAgY2FuRWRpdDogY2FuRWRpdEV4cGVuc2UsXG4gICAgY2FuRGVsZXRlOiBjYW5EZWxldGVFeHBlbnNlLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZVNhdmU6IGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gICAgc2F2ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiU2F2ZSBjaGFuZ2VzXCIpLFxuICAgIHNhdmVDb25maXJtTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBzYXZlIGNoYW5nZXM/XCIpLFxuICAgIHNhdmVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSxcbiAgICBkZWxldGVDb25maXJtVGl0bGU6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9UaXRsZVwiLCBcIkRlbGV0ZVwiKSxcbiAgICBkZWxldGVDb25maXJtTWVzc2FnZTogaW5kVChcIkNvbmZpcm1fRGVsZXRlX0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBpdGVtP1wiKSxcbiAgICBkZWxldGVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIiksXG4gICAgb25TYXZlU3VjY2VzcyxcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCl9YCk7XG4gICAgfSxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gIH0pO1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0SGVhZGVyLCBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwsIG1hcEV4cGVuc2VTaGVldEhlYWRlciwgbWFwRXhwZW5zZVNoZWV0TGluZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQge1xuICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXG4gIG5hdmlnYXRlVG9FeHBlbnNlVXJsLFxuICBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLFxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcbmltcG9ydCB7IGhhc0Fzc2lnbmVkVm91Y2hlciwgcGFyc2VFeHBlbnNlRGF0ZSwgc2FmZVRleHQsIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuXG5jb25zdCB0b0lucHV0RGF0ZSA9IChyYXc/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZUV4cGVuc2VEYXRlKHJhdyk7XG4gIHJldHVybiBwYXJzZWQgPyB0b0lzb0RhdGUocGFyc2VkKSA6IFwiXCI7XG59O1xuXG5jb25zdCBmb3JtYXRFZGl0YWJsZU51bWJlciA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IE51bWJlci5pc05hTihOdW1iZXIodmFsdWUpKSkge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG59O1xuXG5jb25zdCBidWlsZENyZWF0ZUxpbmVEcmFmdCA9IChiYXNlRGF0ZTogc3RyaW5nLCBwcm9qZWN0SWQ6IHN0cmluZyk6IEV4cGVuc2VTaGVldExpbmUgPT4ge1xuICByZXR1cm4ge1xuICAgIGxpbmVSZWNJZDogXCJcIixcbiAgICB0cmFuc0RhdGU6IGJhc2VEYXRlLFxuICAgIHR5cGVWYWx1ZTogXCJcIixcbiAgICB0eXBlVmFsdWVDb2RlOiBcIlwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgIGludGVybmFjaW9uYWw6IGZhbHNlLFxuICAgIHRpY2tldDogZmFsc2UsXG4gICAgcXR5OiAxLFxuICAgIGFtb3VudDogMCxcbiAgICBwcm9qSWQ6IHByb2plY3RJZCxcbiAgICBpbmRBdHRhY2hGaWxlczogXCJcIixcbiAgfTtcbn07XG5cbnR5cGUgVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFN0YXRlQXJncyA9IHtcbiAgaGFzQWNjZXNzOiBib29sZWFuO1xuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xuICBjYW5FZGl0RXhwZW5zZTogYm9vbGVhbjtcbiAgc2hlZXRJZDogc3RyaW5nO1xuICBsaW5lSWQ6IHN0cmluZztcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcbn07XG5cbi8vIE93bnMgc3RhdGUgYW5kIGJlaGF2aW9yIGZvciBleHBlbnNlIGxpbmUgZGV0YWlsIHBhZ2UgKHJlYWQsIGVkaXQsIGNyZWF0ZSkuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFN0YXRlID0gKHtcbiAgaGFzQWNjZXNzLFxuICBjYW5DcmVhdGVFeHBlbnNlLFxuICBjYW5FZGl0RXhwZW5zZSxcbiAgc2hlZXRJZCxcbiAgbGluZUlkLFxuICBpc0NyZWF0ZU1vZGUsXG4gIG9uRm9yYmlkZGVuLFxufTogVXNlRXhwZW5zZVNoZWV0TGluZURldGFpbFN0YXRlQXJncykgPT4ge1xuICBjb25zdCBbaGVhZGVyLCBzZXRIZWFkZXJdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0SGVhZGVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtsaW5lLCBzZXRMaW5lXSA9IHVzZVN0YXRlPEV4cGVuc2VTaGVldExpbmUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2lzRWRpdGluZywgc2V0SXNFZGl0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW21vZGFsRXJyb3IsIHNldE1vZGFsRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdERlc2NyaXB0aW9uLCBzZXREcmFmdERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRUcmFuc0RhdGUsIHNldERyYWZ0VHJhbnNEYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRUeXBlVmFsdWVDb2RlLCBzZXREcmFmdFR5cGVWYWx1ZUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdEFtb3VudCwgc2V0RHJhZnRBbW91bnRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdFF0eSwgc2V0RHJhZnRRdHldID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdFByb2plY3RJZCwgc2V0RHJhZnRQcm9qZWN0SWRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdEludGVybmF0aW9uYWwsIHNldERyYWZ0SW50ZXJuYXRpb25hbF0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICBjb25zdCBoeWRyYXRlRHJhZnRGcm9tTGluZSA9IHVzZUNhbGxiYWNrKChuZXh0TGluZTogRXhwZW5zZVNoZWV0TGluZSB8IG51bGwsIG5leHRIZWFkZXI6IEV4cGVuc2VTaGVldEhlYWRlciB8IG51bGwpID0+IHtcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uKHNhZmVUZXh0KG5leHRMaW5lPy5kZXNjcmlwdGlvbikpO1xuICAgIHNldERyYWZ0VHJhbnNEYXRlKHRvSW5wdXREYXRlKG5leHRMaW5lPy50cmFuc0RhdGUgfHwgbmV4dEhlYWRlcj8uY3JlYXRlZERhdGUpKTtcbiAgICBzZXREcmFmdFR5cGVWYWx1ZUNvZGUoc2FmZVRleHQobmV4dExpbmU/LnR5cGVWYWx1ZUNvZGUpKTtcbiAgICBzZXREcmFmdEFtb3VudChmb3JtYXRFZGl0YWJsZU51bWJlcihuZXh0TGluZT8uYW1vdW50KSk7XG4gICAgc2V0RHJhZnRRdHkoZm9ybWF0RWRpdGFibGVOdW1iZXIobmV4dExpbmU/LnF0eSkpO1xuICAgIHNldERyYWZ0UHJvamVjdElkKHNhZmVUZXh0KG5leHRMaW5lPy5wcm9qSWQgfHwgbmV4dEhlYWRlcj8ucHJvaklkKSk7XG4gICAgc2V0RHJhZnRJbnRlcm5hdGlvbmFsKG5leHRMaW5lPy5pbnRlcm5hY2lvbmFsID09PSB0cnVlID8gXCJ0cnVlXCIgOiBuZXh0TGluZT8uaW50ZXJuYWNpb25hbCA9PT0gZmFsc2UgPyBcImZhbHNlXCIgOiBcIlwiKTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbG9hZERldGFpbCA9IGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghaGFzQWNjZXNzKSB7XG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzaGVldElkKSB7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgbGluZSB3YXMgbm90IGZvdW5kLlwiKSk7XG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgc2V0TGluZShudWxsKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgICAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UpIHtcbiAgICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldERldGFpbChzaGVldElkLCB7XG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZT8uTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBsaW5lIGRldGFpbC5cIikpO1xuICAgICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICAgICAgc2V0TGluZShudWxsKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBzaGVldHMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkU2hlZXQgPVxuICAgICAgICAgICAgc2hlZXRzLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uSG9qYUdhc3Rvc0lkKS50b1VwcGVyQ2FzZSgpID09PSBzaGVldElkLnRyaW0oKS50b1VwcGVyQ2FzZSgpKSB8fCBzaGVldHNbMF07XG5cbiAgICAgICAgICBpZiAoIXNlbGVjdGVkU2hlZXQpIHtcbiAgICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgbGluZSB3YXMgbm90IGZvdW5kLlwiKSk7XG4gICAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgICAgICBzZXRMaW5lKG51bGwpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGxvYWRlZEhlYWRlciA9IG1hcEV4cGVuc2VTaGVldEhlYWRlcihzZWxlY3RlZFNoZWV0KTtcbiAgICAgICAgICBpZiAoaGFzQXNzaWduZWRWb3VjaGVyKGxvYWRlZEhlYWRlci52b3VjaGVyKSkge1xuICAgICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9QYWlkUmVhZE9ubHlcIiwgXCJQYWlkIGV4cGVuc2Ugc2hlZXRzIGFyZSByZWFkLW9ubHkuXCIpKTtcbiAgICAgICAgICAgIHNldEhlYWRlcihsb2FkZWRIZWFkZXIpO1xuICAgICAgICAgICAgc2V0TGluZShudWxsKTtcbiAgICAgICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZHJhZnRMaW5lID0gYnVpbGRDcmVhdGVMaW5lRHJhZnQodG9Jc29EYXRlKG5ldyBEYXRlKCkpLCBzYWZlVGV4dChsb2FkZWRIZWFkZXIucHJvaklkKSk7XG4gICAgICAgICAgc2V0SGVhZGVyKGxvYWRlZEhlYWRlcik7XG4gICAgICAgICAgc2V0TGluZShkcmFmdExpbmUpO1xuICAgICAgICAgIHNldElzRWRpdGluZyh0cnVlKTtcbiAgICAgICAgICBoeWRyYXRlRHJhZnRGcm9tTGluZShkcmFmdExpbmUsIGxvYWRlZEhlYWRlcik7XG4gICAgICAgICAgc2V0U3RhdHVzKFwiXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbGluZUlkKSB7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCBsaW5lIHdhcyBub3QgZm91bmQuXCIpKTtcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgICAgc2V0TGluZShudWxsKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKHNoZWV0SWQsIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZT8uTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBsaW5lIGRldGFpbC5cIikpO1xuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgICBzZXRMaW5lKG51bGwpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNoZWV0cyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkU2hlZXQgPVxuICAgICAgICAgIHNoZWV0cy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnk/LkhvamFHYXN0b3NJZCkudG9VcHBlckNhc2UoKSA9PT0gc2hlZXRJZC50cmltKCkudG9VcHBlckNhc2UoKSkgfHwgc2hlZXRzWzBdO1xuXG4gICAgICAgIGlmICghc2VsZWN0ZWRTaGVldCkge1xuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgbGluZSB3YXMgbm90IGZvdW5kLlwiKSk7XG4gICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICAgIHNldExpbmUobnVsbCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWFwcGVkSGVhZGVyID0gbWFwRXhwZW5zZVNoZWV0SGVhZGVyKHNlbGVjdGVkU2hlZXQpO1xuICAgICAgICBjb25zdCBtYXBwZWRMaW5lcyA9IChBcnJheS5pc0FycmF5KHNlbGVjdGVkU2hlZXQuTGluZXMpID8gc2VsZWN0ZWRTaGVldC5MaW5lcyA6IFtdKS5tYXAoKGVudHJ5KSA9PlxuICAgICAgICAgIG1hcEV4cGVuc2VTaGVldExpbmUoZW50cnkpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkTGluZSA9XG4gICAgICAgICAgbWFwcGVkTGluZXMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5LmxpbmVSZWNJZCkudG9VcHBlckNhc2UoKSA9PT0gbGluZUlkLnRyaW0oKS50b1VwcGVyQ2FzZSgpKSB8fCBudWxsO1xuXG4gICAgICAgIGlmICghc2VsZWN0ZWRMaW5lKSB7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCBsaW5lIHdhcyBub3QgZm91bmQuXCIpKTtcbiAgICAgICAgICBzZXRIZWFkZXIobWFwcGVkSGVhZGVyKTtcbiAgICAgICAgICBzZXRMaW5lKG51bGwpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEhlYWRlcihtYXBwZWRIZWFkZXIpO1xuICAgICAgICBzZXRMaW5lKHNlbGVjdGVkTGluZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBsaW5lIGRldGFpbC5cIikpO1xuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgIHNldExpbmUobnVsbCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2b2lkIGxvYWREZXRhaWwoKTtcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2UsIGhhc0FjY2VzcywgaHlkcmF0ZURyYWZ0RnJvbUxpbmUsIGlzQ3JlYXRlTW9kZSwgbGluZUlkLCBvbkZvcmJpZGRlbiwgc2hlZXRJZF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFsaW5lIHx8IGlzRWRpdGluZykgcmV0dXJuO1xuICAgIGh5ZHJhdGVEcmFmdEZyb21MaW5lKGxpbmUsIGhlYWRlcik7XG4gIH0sIFtoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21MaW5lLCBpc0VkaXRpbmcsIGxpbmVdKTtcblxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbygoKSA9PiBidXN5IHx8IGlzRWRpdGluZywgW2J1c3ksIGlzRWRpdGluZ10pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoaGFzQWN0aXZlUHJvY2Vzcyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCgpO1xuICAgIH07XG4gIH0sIFtoYXNBY3RpdmVQcm9jZXNzXSk7XG5cbiAgY29uc3QgaXNTaGVldFBhaWQgPSBoYXNBc3NpZ25lZFZvdWNoZXIoaGVhZGVyPy52b3VjaGVyKTtcblxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChpc0NyZWF0ZU1vZGUgfHwgaXNMb2FkaW5nIHx8ICFoZWFkZXIgfHwgIWxpbmUgfHwgaXNTaGVldFBhaWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWNhbkVkaXRFeHBlbnNlKSB7XG4gICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xuICAgIGh5ZHJhdGVEcmFmdEZyb21MaW5lKGxpbmUsIGhlYWRlcik7XG4gICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9FZGl0aW5nRW5hYmxlZFwiLCBcIkVkaXRpbmcgZW5hYmxlZFwiKSk7XG4gIH0sIFtjYW5FZGl0RXhwZW5zZSwgaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tTGluZSwgaXNDcmVhdGVNb2RlLCBpc0xvYWRpbmcsIGlzU2hlZXRQYWlkLCBsaW5lLCBvbkZvcmJpZGRlbl0pO1xuXG4gIGNvbnN0IGhhbmRsZUNhbmNlbEVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzaGVldElkKX1gO1xuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xuICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWlzRWRpdGluZykgcmV0dXJuO1xuXG4gICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIGh5ZHJhdGVEcmFmdEZyb21MaW5lKGxpbmUsIGhlYWRlcik7XG4gICAgc2V0U3RhdHVzKGluZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpKTtcbiAgfSwgW2hlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUxpbmUsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nLCBsaW5lLCBzaGVldElkXSk7XG5cbiAgY29uc3QgaGFuZGxlT3BlbkNyZWF0ZU1vZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlIHx8ICFzaGVldElkKSB7XG4gICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXRMaW5lRGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzaGVldElkKX0mbW9kZT1jcmVhdGVgO1xuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXG4gICAgfSk7XG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcblxuICBjb25zdCBuYXZpZ2F0ZVRvU2hlZXREZXRhaWwgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChzaGVldElkKTtcbiAgICBpZiAoIXNhZmVTaGVldElkKSByZXR1cm47XG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlU2hlZXRJZCl9YDtcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwpO1xuICB9LCBbc2hlZXRJZF0pO1xuXG4gIHJldHVybiB7XG4gICAgaGVhZGVyLFxuICAgIGxpbmUsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBidXN5LFxuICAgIHN0YXR1cyxcbiAgICBpc0VkaXRpbmcsXG4gICAgbW9kYWxFcnJvcixcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0VHJhbnNEYXRlLFxuICAgIGRyYWZ0VHlwZVZhbHVlQ29kZSxcbiAgICBkcmFmdEFtb3VudCxcbiAgICBkcmFmdFF0eSxcbiAgICBkcmFmdFByb2plY3RJZCxcbiAgICBkcmFmdEludGVybmF0aW9uYWwsXG4gICAgaXNTaGVldFBhaWQsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNFZGl0aW5nLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcbiAgICBzZXREcmFmdFRyYW5zRGF0ZSxcbiAgICBzZXREcmFmdFR5cGVWYWx1ZUNvZGUsXG4gICAgc2V0RHJhZnRBbW91bnQsXG4gICAgc2V0RHJhZnRRdHksXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXG4gICAgc2V0RHJhZnRJbnRlcm5hdGlvbmFsLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVPcGVuQ3JlYXRlTW9kZSxcbiAgICBuYXZpZ2F0ZVRvU2hlZXREZXRhaWwsXG4gIH07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBNEM7OztBQ21FdEM7QUE1Qk4sSUFBTSx1QkFBdUIsQ0FBQztBQUFBLEVBQzVCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFpQztBQUMvQixTQUNFLDZDQUFDLGFBQVEsV0FBVSxhQUNqQjtBQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFPO0FBQUEsUUFDUCxXQUFVO0FBQUEsUUFDVixnQkFBZTtBQUFBO0FBQUEsSUFDakI7QUFBQSxJQUVBLDZDQUFDLGFBQVEsV0FBVSxvRkFDakI7QUFBQSxtREFBQyxTQUFJLFdBQVUseUNBQ1o7QUFBQSxvQkFDQyw2Q0FBQyxTQUFJLFdBQVUsNkJBQ2I7QUFBQSxzREFBQyxXQUFNLFdBQVUsNEJBQTRCLGVBQUssbUNBQW1DLGFBQWEsR0FBRTtBQUFBLFVBQ3BHO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxXQUFVO0FBQUEsY0FDVixPQUFPO0FBQUEsY0FDUCxVQUFVLENBQUMsVUFBVSx5QkFBeUIsTUFBTSxPQUFPLFNBQVMsRUFBRTtBQUFBLGNBQ3RFLGNBQVksS0FBSyxtQ0FBbUMsYUFBYTtBQUFBO0FBQUEsVUFDbkU7QUFBQSxXQUNGLElBRUE7QUFBQSxVQUFD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U0FBUSxhQUFZLE1BQUssVUFBUyxjQUFZLEtBQUssa0JBQWtCLFNBQVMsR0FDakgsdURBQUMsWUFBTyxXQUFVLHVCQUFzQixJQUFHLE1BQUssSUFBRyxNQUFLLEdBQUUsS0FBSSxhQUFZLEtBQUksR0FDaEY7QUFBQSxVQUNDLEtBQUssa0JBQWtCLFNBQVM7QUFBQTtBQUFBO0FBQUEsSUFDbkM7QUFBQSxJQUVDLGVBQWUsNkNBQUMsU0FBSSxXQUFVLGVBQWUsd0JBQWEsSUFBUztBQUFBLElBRW5FLENBQUMsYUFBYSxDQUFDLGdCQUFnQixPQUM5QjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBLGNBQWMsU0FBUyxRQUFRLFdBQVc7QUFBQSxRQUMxQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSwwQkFBMEI7QUFBQSxRQUMxQix3QkFBd0I7QUFBQSxRQUN4Qiw0QkFBNEI7QUFBQSxRQUM1QixxQkFBcUI7QUFBQSxRQUNyQixrQkFBa0I7QUFBQSxRQUNsQix3QkFBd0I7QUFBQSxRQUN4Qiw0QkFBNEI7QUFBQTtBQUFBLElBQzlCLElBQ0U7QUFBQSxJQUVILG9CQUFvQixDQUFDLGVBQ3BCO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFNO0FBQUEsUUFDTixXQUFXLEtBQUssaUJBQWlCLFFBQVE7QUFBQSxRQUN6QyxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUE7QUFBQSxJQUNYLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLDZCQUE2QixNQUFNO0FBQ3ZDLFNBQ0UsNkNBQUMsZ0NBQ0MsdURBQUMsaUNBQThCLEdBQ2pDO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSwwQkFBMEI7QUFDakUsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQyw4QkFBMkIsQ0FBRTtBQUN6RDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8scUNBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAicmVzcG9uc2UiLCAic2hlZXRzIiwgInNlbGVjdGVkU2hlZXQiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
