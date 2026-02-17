import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-MH3GHYXK.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-UMXEPFA5.js";
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
  deleteExpenseSheet,
  fetchExpenseSheetDetail,
  formatAmountWithCurrency,
  formatExpenseDateParts,
  formatExpenseDisplayDate,
  getExchangeRate,
  getExpenseSheetDefaultCurrencyCode,
  hasAssignedVoucher,
  mapExpenseSheetHeader,
  mapExpenseSheetLine,
  navigateToExpenseUrl,
  parseExpenseDate,
  safeText,
  setExpenseNavigationGuard,
  toIsoDate,
  updateExpenseSheetHeader
} from "./chunks/chunk-3FT3FNFJ.js";
import {
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

// Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetDetailPage.tsx
var import_react3 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/components/ExpenseSheetHeaderForm.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ExpenseSheetHeaderForm = ({
  isCreateMode,
  isEditing,
  header,
  projectValue,
  voucherValue,
  isSheetPaid,
  isCurrencyLockedByLines,
  isExchangeRateLockedByLines,
  normalizedDraftCurrency,
  exchangeRateBaseCurrency,
  exchangeRateReferenceAmount,
  showExchangeRate,
  exchangeRateValue,
  exchangeRateValidationMessage,
  totalAmountText,
  draftDescription,
  draftProjectId,
  draftCurrencyCode,
  draftExchangeRate,
  isExchangeRateLoading,
  exchangeRateMessage,
  exchangeRateMessageIsError,
  onDraftDescriptionChange,
  onDraftProjectIdChange,
  onDraftCurrencyCodeChange,
  onDraftExchangeRateChange
}) => {
  const isForeignCurrency = isEditing && normalizedDraftCurrency !== "" && normalizedDraftCurrency !== exchangeRateBaseCurrency;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
    !isCreateMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_SheetId", "Sheet id"), value: safeText(header.hojaGastosId) || "-" }) : null,
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
        value: safeText(header.description) || "-",
        fullWidth: true
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
    !isEditing && isSheetPaid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Voucher", "Voucher"), value: voucherValue || "-" }) : null,
    isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sm:col-span-2 space-y-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `grid gap-4 ${isForeignCurrency ? "grid-cols-2" : "grid-cols-1"}`.trim(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ExpenseCurrencyFilterSelect_default,
          {
            label: indT("ExpenseSheets_Field_Currency", "Currency"),
            placeholder: indT("ExpenseSheets_Filter_Currency_Placeholder", "Currency code"),
            value: draftCurrencyCode,
            onChange: onDraftCurrencyCodeChange,
            disabled: !isEditing || isCurrencyLockedByLines,
            readOnly: !isEditing || isCurrencyLockedByLines,
            idBase: "expense-header-currency",
            preferDefaultCurrencyFromContext: isCreateMode
          }
        ),
        isForeignCurrency ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              className: `form-control ${exchangeRateValidationMessage ? "border-danger ring-1 ring-danger" : ""} ${isExchangeRateLockedByLines ? "ind-readonly-field" : ""}`,
              type: "number",
              step: "any",
              inputMode: "decimal",
              value: draftExchangeRate,
              onChange: (event) => onDraftExchangeRateChange(event.target.value || ""),
              "aria-label": indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate"),
              placeholder: indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate"),
              readOnly: isExchangeRateLockedByLines,
              disabled: isExchangeRateLockedByLines
            }
          )
        ] }) : null
      ] }),
      isForeignCurrency ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_Currency", "Currency") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              className: "form-control ind-readonly-field",
              value: exchangeRateBaseCurrency,
              "aria-label": indT("ExpenseSheets_Field_Currency", "Currency"),
              readOnly: true,
              disabled: true
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_Amount", "Amount") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              className: "form-control ind-readonly-field",
              value: String(exchangeRateReferenceAmount),
              "aria-label": indT("ExpenseSheets_Field_Amount", "Amount"),
              readOnly: true,
              disabled: true
            }
          )
        ] })
      ] }) : null,
      isForeignCurrency && isExchangeRateLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-slate-500 text-xs", children: indT("ExpenseSheets_ExchangeRate_Loading", "Consultando tipo de cambio...") }) : null,
      isForeignCurrency && exchangeRateValidationMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-danger text-sm", children: exchangeRateValidationMessage }) : null,
      isForeignCurrency && !isExchangeRateLoading && exchangeRateMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: exchangeRateMessageIsError ? "text-danger text-sm" : "text-slate-500 text-xs", children: exchangeRateMessage }) : null
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Currency", "Currency"), value: safeText(header.currencyCode) || "-" }),
    !isEditing && showExchangeRate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate"), value: exchangeRateValue }) : null,
    !isCreateMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_TotalAmount", "Total amount"), value: totalAmountText }) : null
  ] }) });
};
var ExpenseSheetHeaderForm_default = ExpenseSheetHeaderForm;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseLinesTimeline.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ExpenseLinesTimeline = ({
  visibleLines,
  currencyCode,
  totalLinePages,
  linePage,
  linesLabel,
  emptyText,
  paginationLabels,
  containerRef,
  onLinePageChange,
  onOpenLine
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "space-y-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseSectionDivider_default, { label: linesLabel, className: "expense-section-divider--spaced" }),
    visibleLines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "timeline-box timeline-empty", "data-empty-text": emptyText }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { ref: containerRef, className: "timeline-box", children: visibleLines.map((line, index) => {
      const lineId = safeText(line.lineRecId);
      const description = safeText(line.description);
      const amountText = formatAmountWithCurrency(line.amount ?? null, currencyCode);
      const dateParts = formatExpenseDateParts(safeText(line.transDate), document?.documentElement?.lang || "es-ES");
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "timeline-item", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        ExpenseTimelineCard_default,
        {
          dateParts,
          title: description || lineId || "-",
          amountText,
          onOpen: () => onOpenLine(lineId),
          titleClassName: "timeline-name expense-line-card__title"
        }
      ) }, `${lineId}-${index}`);
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailMutations.ts
var import_react = __toESM(require_react());
var normalizeExchangeRate = (raw) => parseDecimalInput(raw);
var areRatesEquivalent = (left, right) => {
  if (left == null || right == null) return false;
  return Math.abs(left - right) < 1e-6;
};
var useExpenseSheetDetailMutations = ({
  busy,
  isEditing,
  isCreateMode,
  isLocked,
  isCurrencyLockedByLines,
  isExchangeRateLockedByLines,
  lockedCurrencyCode,
  lockedExchangeRate,
  canCreateExpense,
  canEditExpense,
  canDeleteExpense,
  sheetId,
  draftDescription,
  draftCurrencyCode,
  draftExchangeRate,
  officialExchangeRateValue,
  draftProjectId,
  exchangeRateBaseCurrency,
  currentExpenseSheetStatus,
  onCreateSuccess,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing
}) => {
  const handleUpdate = (0, import_react.useCallback)(async () => {
    if (busy || !isEditing) return false;
    if (!isCreateMode && isLocked) return false;
    const canProceed = isCreateMode ? canCreateExpense : canEditExpense;
    if (!canProceed) {
      showPermissionModal();
      return false;
    }
    const normalizedCurrency = String(
      isCurrencyLockedByLines ? lockedCurrencyCode || draftCurrencyCode || "" : draftCurrencyCode || ""
    ).trim().toUpperCase();
    const normalizedDescription = String(draftDescription || "").trim();
    const normalizedProjectId = String(draftProjectId || "").trim();
    const normalizedExchangeRateRaw = String(
      isExchangeRateLockedByLines ? lockedExchangeRate || draftExchangeRate || "" : draftExchangeRate || ""
    );
    const normalizedBaseCurrency = String(exchangeRateBaseCurrency || "EUR").trim().toUpperCase() || "EUR";
    const requiresExchangeRate = normalizedCurrency !== "" && normalizedCurrency !== normalizedBaseCurrency;
    const parsedExchangeRate = normalizeExchangeRate(normalizedExchangeRateRaw);
    const officialExchangeRate = normalizeExchangeRate(officialExchangeRateValue);
    const originalExchangeRate = normalizeExchangeRate(lockedExchangeRate);
    const hasValidRate = parsedExchangeRate != null && parsedExchangeRate > 0;
    const hasManualRateEditOnUpdate = !isCreateMode && hasValidRate && (originalExchangeRate == null || !areRatesEquivalent(parsedExchangeRate, originalExchangeRate));
    const isManualExchangeRate = (() => {
      if (!requiresExchangeRate || !hasValidRate) return false;
      if (isExchangeRateLockedByLines) return false;
      if (!isCreateMode && !hasManualRateEditOnUpdate) return false;
      if (officialExchangeRate == null) return true;
      return !areRatesEquivalent(parsedExchangeRate, officialExchangeRate);
    })();
    const resolvedExchangeRateMode = isManualExchangeRate ? 1 : void 0;
    const resolvedExpenseSheetStatus = currentExpenseSheetStatus ?? (isManualExchangeRate ? 0 : void 0);
    if (isCreateMode) {
      if (!normalizedDescription) {
        const validationMessage = indT("ExpenseSheets_Validation_DescriptionRequired", "Description is required.");
        setModalError(validationMessage);
        setStatus(validationMessage);
        return false;
      }
      if (!normalizedCurrency) {
        const validationMessage = indT("ExpenseSheets_Validation_CurrencyRequired", "Currency is required.");
        setModalError(validationMessage);
        setStatus(validationMessage);
        return false;
      }
    }
    if (requiresExchangeRate && !hasValidRate) {
      const validationMessage = indT(
        "ExpenseSheets_Validation_ExchangeRateRequired",
        "Exchange rate is required when currency is different from base currency."
      );
      setModalError(validationMessage);
      setStatus(validationMessage);
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
          const payload2 = {
            mode: 1,
            existingHojaGastosId: void 0,
            description: normalizedDescription,
            currencyCode: normalizedCurrency,
            exchRate: hasValidRate ? Number(parsedExchangeRate) : 1,
            projId: normalizedProjectId || void 0,
            expenseSheetStatus: 0,
            exchangeRateMode: resolvedExchangeRateMode,
            lines: []
          };
          const response2 = await createExpenseSheet(payload2);
          if (!response2.Success) {
            throw new Error(response2.Message || indT("Api_RequestFailed", "Request failed."));
          }
          const createdSheetId = String(response2?.Data?.HojaGastosId || "").trim();
          if (!createdSheetId) {
            throw new Error(indT("Api_RequestFailed", "Request failed."));
          }
          onCreateSuccess(createdSheetId);
          setStatus(indT("Common_Save", "Save"));
          setIsEditing(false);
          return true;
        }
        const payload = {
          description: String(draftDescription || "").trim(),
          currencyCode: normalizedCurrency,
          exchRate: hasValidRate ? Number(parsedExchangeRate) : 1,
          projId: String(draftProjectId || "").trim() || void 0,
          expenseSheetStatus: resolvedExpenseSheetStatus,
          exchangeRateMode: resolvedExchangeRateMode
        };
        const response = await updateExpenseSheetHeader(sheetId, payload);
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
    canCreateExpense,
    canEditExpense,
    draftCurrencyCode,
    draftDescription,
    draftExchangeRate,
    officialExchangeRateValue,
    draftProjectId,
    exchangeRateBaseCurrency,
    currentExpenseSheetStatus,
    isCreateMode,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    isLocked,
    isEditing,
    lockedCurrencyCode,
    lockedExchangeRate,
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
  }, [busy, canDeleteExpense, isLocked, setBusy, setModalError, setStatus, sheetId]);
  return {
    handleUpdate,
    handleDelete
  };
};

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailTopbarActions.ts
var useExpenseSheetDetailTopbarActions = ({
  busy,
  modalOpen,
  isEditing,
  isCreateMode,
  isLocked,
  canEditExpense,
  canCreateExpense,
  canDeleteExpense,
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
    allowCreateModeActionsWhenLocked: true,
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
    deleteConfirmTitle: indT("ExpenseSheets_Detail_DeleteSheet_Title", "Delete expense sheet"),
    deleteConfirmMessage: indT("ExpenseSheets_Detail_DeleteSheet_Body", "Do you want to delete this expense sheet?"),
    deleteConfirmText: indT("Common_Delete", "Delete"),
    onSaveSuccess,
    onDeleteSuccess: () => {
      navigateToExpenseUrl("/Gastos/ExpenseSheets");
    },
    openConfirm,
    closeConfirm
  });
};

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailState.ts
var import_react2 = __toESM(require_react());

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
var normalizeExpenseExchangeRateMode = (value) => {
  const parsed = Number(value);
  if (parsed === 0 || parsed === 1) {
    return parsed;
  }
  return null;
};
var getExpenseExchangeRateModeLabel = (value) => {
  const normalized = normalizeExpenseExchangeRateMode(value);
  if (normalized === null) return "";
  const meta = EXCHANGE_RATE_MODE_META[normalized];
  return indT(meta.labelKey, meta.fallback);
};

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailState.ts
var EXCHANGE_RATE_DEBOUNCE_MS = 400;
var EXCHANGE_RATE_REFERENCE_AMOUNT = 100;
var formatExchangeRateInputValue = (value) => {
  if (!Number.isFinite(value)) return "";
  return String(Number(value.toFixed(6)));
};
var buildCreateHeaderDraft = () => {
  return {
    hojaGastosId: "",
    description: "",
    projId: "",
    voucher: "",
    currencyCode: "",
    totalAmount: null,
    expenseSheetStatus: 0,
    exchangeRateMode: 0,
    createdDate: "",
    exchRate: "1"
  };
};
var shouldShowExchangeRate = (value) => {
  if (!value) return false;
  const normalized = value.replace(/\s+/g, "").replace(",", ".");
  const parsed = Number(normalized);
  if (Number.isFinite(parsed)) {
    return Math.abs(parsed) > 0;
  }
  return true;
};
var useExpenseSheetDetailState = ({
  hasAccess,
  canCreateExpense,
  canEditExpense,
  sheetId,
  isCreateMode,
  onForbidden
}) => {
  const [header, setHeader] = (0, import_react2.useState)(null);
  const [lines, setLines] = (0, import_react2.useState)([]);
  const [linePage, setLinePage] = (0, import_react2.useState)(1);
  const [isLoading, setIsLoading] = (0, import_react2.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react2.useState)("");
  const [busy, setBusy] = (0, import_react2.useState)(false);
  const [status, setStatus] = (0, import_react2.useState)("");
  const [isEditing, setIsEditing] = (0, import_react2.useState)(false);
  const [modalError, setModalError] = (0, import_react2.useState)("");
  const [draftDescription, setDraftDescription] = (0, import_react2.useState)("");
  const [draftProjectId, setDraftProjectId] = (0, import_react2.useState)("");
  const [draftCurrencyCode, setDraftCurrencyCode] = (0, import_react2.useState)("");
  const [draftExchangeRate, setDraftExchangeRate] = (0, import_react2.useState)("");
  const [defaultCurrencyCode, setDefaultCurrencyCode] = (0, import_react2.useState)("");
  const [isExchangeRateLoading, setIsExchangeRateLoading] = (0, import_react2.useState)(false);
  const [exchangeRateMessage, setExchangeRateMessage] = (0, import_react2.useState)("");
  const [exchangeRateMessageIsError, setExchangeRateMessageIsError] = (0, import_react2.useState)(false);
  const [officialExchangeRateValue, setOfficialExchangeRateValue] = (0, import_react2.useState)("");
  const hydrateDraftFromHeader = (0, import_react2.useCallback)((nextHeader) => {
    setDraftDescription(safeText(nextHeader?.description));
    setDraftProjectId(safeText(nextHeader?.projId));
    setDraftCurrencyCode(safeText(nextHeader?.currencyCode));
    setDraftExchangeRate(safeText(nextHeader?.exchRate));
  }, []);
  (0, import_react2.useEffect)(() => {
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
  (0, import_react2.useEffect)(() => {
    if (!header || isEditing) return;
    hydrateDraftFromHeader(header);
  }, [header, hydrateDraftFromHeader, isEditing]);
  (0, import_react2.useEffect)(() => {
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
  const hasActiveProcess = (0, import_react2.useMemo)(() => busy || isEditing, [busy, isEditing]);
  (0, import_react2.useEffect)(() => {
    setExpenseNavigationGuard(hasActiveProcess);
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [hasActiveProcess]);
  const projectValue = safeText(header?.projId);
  const voucherValue = safeText(header?.voucher);
  const isSheetPaid = hasAssignedVoucher(voucherValue);
  const hasLines = lines.length > 0;
  const exchangeRateValue = safeText(header?.exchRate);
  const showExchangeRate = (0, import_react2.useMemo)(() => shouldShowExchangeRate(exchangeRateValue), [exchangeRateValue]);
  const normalizedDraftCurrency = (0, import_react2.useMemo)(() => draftCurrencyCode.trim().toUpperCase(), [draftCurrencyCode]);
  const normalizedDefaultCurrency = (0, import_react2.useMemo)(() => safeText(defaultCurrencyCode).toUpperCase(), [defaultCurrencyCode]);
  const exchangeRateBaseCurrency = normalizedDefaultCurrency || "EUR";
  const uiLocale = (0, import_react2.useMemo)(() => {
    if (typeof document === "undefined") return "es-ES";
    return safeText(document.documentElement?.lang) || "es-ES";
  }, []);
  const formExchangeDate = (0, import_react2.useMemo)(() => {
    const parsedDate = parseExpenseDate(safeText(header?.createdDate));
    if (parsedDate) return toIsoDate(parsedDate);
    return toIsoDate(/* @__PURE__ */ new Date());
  }, [header?.createdDate]);
  const exchangeRateRequired = isEditing && normalizedDraftCurrency !== "" && normalizedDraftCurrency !== exchangeRateBaseCurrency;
  const exchangeRateValidationMessage = exchangeRateRequired && !draftExchangeRate.trim() ? indT(
    "ExpenseSheets_Validation_ExchangeRateRequired",
    "Exchange rate is required when currency is different from base currency."
  ) : "";
  const isCurrencyLockedByLines = isEditing && hasLines;
  const isExchangeRateLockedByLines = isEditing && hasLines && showExchangeRate;
  (0, import_react2.useEffect)(() => {
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
    if (!isEditing || isExchangeRateLockedByLines) {
      setIsExchangeRateLoading(false);
      setExchangeRateMessage("");
      setExchangeRateMessageIsError(false);
      setOfficialExchangeRateValue("");
      return () => {
        clearRequestArtifacts();
      };
    }
    if (!normalizedDraftCurrency || !exchangeRateBaseCurrency) {
      setIsExchangeRateLoading(false);
      setExchangeRateMessage("");
      setExchangeRateMessageIsError(false);
      setOfficialExchangeRateValue("");
      return () => {
        clearRequestArtifacts();
      };
    }
    if (normalizedDraftCurrency === exchangeRateBaseCurrency) {
      setDraftExchangeRate("1");
      setOfficialExchangeRateValue("1");
      setIsExchangeRateLoading(false);
      setExchangeRateMessage("");
      setExchangeRateMessageIsError(false);
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
      try {
        const response = await getExchangeRate(
          normalizedDraftCurrency,
          exchangeRateBaseCurrency,
          formExchangeDate,
          {
            suppressPermissionModal: true,
            signal: requestAbortController.signal
          }
        );
        if (isCancelled) return;
        if (!response.Success || !response.Data || !Number.isFinite(Number(response.Data.Rate))) {
          setExchangeRateMessage(
            safeText(response.Message) || indT("ExpenseSheets_ExchangeRate_Unavailable", "No se pudo obtener el tipo de cambio.")
          );
          setExchangeRateMessageIsError(true);
          return;
        }
        const officialRateForAmount100 = Number(response.Data.Rate) * EXCHANGE_RATE_REFERENCE_AMOUNT;
        const nextExchangeRateValue = formatExchangeRateInputValue(officialRateForAmount100);
        setOfficialExchangeRateValue(nextExchangeRateValue);
        setDraftExchangeRate(nextExchangeRateValue);
        const effectiveRateDate = safeText(response.Data.Date) || formExchangeDate;
        const source = safeText(response.Data.Source);
        const officialLabel = getExpenseExchangeRateModeLabel(0) || indT("ExpenseSheets_Filter_ExchangeRateMode_Official", "T.C. Oficial");
        const localizedRateDate = formatExpenseDisplayDate(effectiveRateDate, uiLocale) || effectiveRateDate;
        setExchangeRateMessage(source ? `${officialLabel} ${localizedRateDate} (${source})` : `${officialLabel} ${localizedRateDate}`);
        setExchangeRateMessageIsError(false);
      } catch (error) {
        if (isCancelled) return;
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (error instanceof ApiFetchError) {
          if (error.status === 404) {
            setOfficialExchangeRateValue("");
            setExchangeRateMessage(indT("ExpenseSheets_ExchangeRate_NotFound", "No hay tipo de cambio para la fecha"));
            setExchangeRateMessageIsError(true);
            return;
          }
          if (error.status === 422 || error.status === 500) {
            setOfficialExchangeRateValue("");
            setExchangeRateMessage(
              safeText(error.message) || indT("ExpenseSheets_ExchangeRate_Unavailable", "No se pudo obtener el tipo de cambio.")
            );
            setExchangeRateMessageIsError(true);
            return;
          }
          setOfficialExchangeRateValue("");
          setExchangeRateMessage(
            safeText(error.message) || indT("ExpenseSheets_ExchangeRate_Unavailable", "No se pudo obtener el tipo de cambio.")
          );
          setExchangeRateMessageIsError(true);
          return;
        }
        setOfficialExchangeRateValue("");
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
    formExchangeDate,
    exchangeRateBaseCurrency,
    isEditing,
    isExchangeRateLockedByLines,
    normalizedDraftCurrency,
    uiLocale,
    setDraftExchangeRate
  ]);
  const handleEnableEdit = (0, import_react2.useCallback)(() => {
    if (isCreateMode || isLoading || !header || isSheetPaid) {
      return;
    }
    if (!canEditExpense) {
      onForbidden();
      return;
    }
    setModalError("");
    setIsEditing(true);
    hydrateDraftFromHeader(header);
    setStatus(indT("ExpenseSheets_Detail_EditingEnabled", "Editing enabled"));
  }, [canEditExpense, header, hydrateDraftFromHeader, isCreateMode, isLoading, isSheetPaid, onForbidden]);
  const handleCancelEdit = (0, import_react2.useCallback)(() => {
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
  const handleOpenCreateSheetMode = (0, import_react2.useCallback)(() => {
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
  const handleOpenCreateLineMode = (0, import_react2.useCallback)(() => {
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
  const navigateToCreatedSheet = (0, import_react2.useCallback)((createdSheetId) => {
    const safeCreatedSheetId = safeText(createdSheetId);
    if (!safeCreatedSheetId) return;
    const targetUrl = `/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(safeCreatedSheetId)}`;
    navigateToExpenseUrl(targetUrl);
  }, []);
  const navigateToLineDetail = (0, import_react2.useCallback)(
    (lineRecId) => {
      const safeLineId = safeText(lineRecId);
      const safeSheetId = safeText(sheetId);
      if (!safeLineId || !safeSheetId) return;
      const targetUrl = `/Gastos/ExpenseSheetLineDetail?hojaGastosId=${encodeURIComponent(safeSheetId)}&lineRecId=${encodeURIComponent(safeLineId)}`;
      navigateToExpenseUrl(targetUrl, {
        askConfirmation: true,
        bypassGuardOnce: false
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
    officialExchangeRateValue,
    isExchangeRateLoading,
    exchangeRateMessage,
    exchangeRateMessageIsError,
    projectValue,
    voucherValue,
    isSheetPaid,
    exchangeRateValue,
    showExchangeRate,
    normalizedDraftCurrency,
    exchangeRateBaseCurrency,
    exchangeRateReferenceAmount: EXCHANGE_RATE_REFERENCE_AMOUNT,
    exchangeRateValidationMessage,
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
    handleEnableEdit,
    handleCancelEdit,
    handleOpenCreateSheetMode,
    handleOpenCreateLineMode,
    navigateToCreatedSheet,
    navigateToLineDetail
  };
};

// Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetDetailPage.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var LINES_PAGE_SIZE = 6;
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
var ExpenseSheetDetailPageContent = () => {
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const canEditExpense = canAccess("GASTOS_HOJA_GASTO", "Edit");
  const canDeleteExpense = canAccess("GASTOS_HOJA_GASTO", "FullAccess");
  const canCreateExpense = canAccess("GASTOS_HOJA_GASTO", "Add");
  const sheetId = safeText(window.__EXPENSE_SHEET_ID__);
  const sheetMode = safeText(window.__EXPENSE_SHEET_MODE__).toLowerCase();
  const isCreateMode = sheetMode === "create";
  const lineContainerRef = (0, import_react3.useRef)(null);
  const createdSheetIdRef = (0, import_react3.useRef)("");
  const paginationLabels = (0, import_react3.useMemo)(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last")
    }),
    []
  );
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
    officialExchangeRateValue,
    isExchangeRateLoading,
    exchangeRateMessage,
    exchangeRateMessageIsError,
    projectValue,
    voucherValue,
    isSheetPaid,
    exchangeRateValue,
    showExchangeRate,
    normalizedDraftCurrency,
    exchangeRateBaseCurrency,
    exchangeRateReferenceAmount,
    exchangeRateValidationMessage,
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
    handleEnableEdit,
    handleCancelEdit,
    handleOpenCreateLineMode,
    navigateToCreatedSheet,
    navigateToLineDetail
  } = useExpenseSheetDetailState({
    hasAccess,
    canCreateExpense,
    canEditExpense,
    sheetId,
    isCreateMode,
    onForbidden: showPermissionModal
  });
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
  }, [busy, handleConfirm]);
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
  const visibleLines = (0, import_react3.useMemo)(() => pagedSlice(lines, linePage, LINES_PAGE_SIZE), [linePage, lines]);
  const totalLinePages = Math.ceil((lines.length || 0) / LINES_PAGE_SIZE);
  const totalAmountText = (0, import_react3.useMemo)(
    () => formatAmountWithCurrency(header?.totalAmount ?? null, safeText(header?.currencyCode)),
    [header]
  );
  const { handleUpdate, handleDelete } = useExpenseSheetDetailMutations({
    busy,
    isEditing,
    isCreateMode,
    isLocked: isSheetPaid,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    lockedCurrencyCode: safeText(header?.currencyCode),
    lockedExchangeRate: safeText(header?.exchRate),
    canCreateExpense,
    canEditExpense,
    canDeleteExpense,
    sheetId,
    draftDescription,
    draftCurrencyCode,
    draftExchangeRate,
    officialExchangeRateValue,
    draftProjectId,
    currentExpenseSheetStatus: header?.expenseSheetStatus,
    exchangeRateBaseCurrency,
    onCreateSuccess: (createdSheetId) => {
      createdSheetIdRef.current = safeText(createdSheetId);
    },
    setModalError,
    setBusy,
    setStatus,
    setIsEditing
  });
  const handleSaveSuccess = (0, import_react3.useCallback)(() => {
    if (isCreateMode) {
      navigateToCreatedSheet(createdSheetIdRef.current);
      return;
    }
    window.location.reload();
  }, [isCreateMode, navigateToCreatedSheet]);
  useExpenseSheetDetailTopbarActions({
    busy,
    modalOpen: modal.open,
    isEditing,
    isCreateMode,
    isLocked: isSheetPaid,
    canCreateExpense,
    canEditExpense,
    canDeleteExpense,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
    onSaveSuccess: handleSaveSuccess,
    openConfirm,
    closeConfirm
  });
  const resolveClickableCard = (0, import_react3.useCallback)((target) => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "space-y-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "div",
      {
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: isLoading ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-danger", children: errorMessage }) : null,
    !isLoading && !errorMessage && header ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      ExpenseSheetHeaderForm_default,
      {
        isCreateMode,
        isEditing,
        header,
        projectValue,
        voucherValue,
        isSheetPaid,
        isCurrencyLockedByLines,
        isExchangeRateLockedByLines,
        normalizedDraftCurrency,
        exchangeRateBaseCurrency,
        exchangeRateReferenceAmount,
        showExchangeRate,
        exchangeRateValue,
        exchangeRateValidationMessage,
        totalAmountText,
        draftDescription,
        draftProjectId,
        draftCurrencyCode,
        draftExchangeRate,
        isExchangeRateLoading,
        exchangeRateMessage,
        exchangeRateMessageIsError,
        onDraftDescriptionChange: setDraftDescription,
        onDraftProjectIdChange: setDraftProjectId,
        onDraftCurrencyCodeChange: setDraftCurrencyCode,
        onDraftExchangeRateChange: setDraftExchangeRate
      }
    ) : null,
    !isCreateMode && !isLoading && !errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      ExpenseLinesTimeline_default,
      {
        visibleLines,
        currencyCode: safeText(header?.currencyCode),
        totalLinePages,
        linePage,
        linesLabel: indT("ExpenseSheets_Lines", "Lines"),
        emptyText: indT("ExpenseSheets_NoLines", "No lines for this expense sheet."),
        paginationLabels,
        containerRef: lineContainerRef,
        onLinePageChange: setLinePage,
        onOpenLine: navigateToLineDetail
      }
    ) : null,
    canCreateExpense && !isCreateMode ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      FloatingActionButton_default,
      {
        route: "",
        ariaLabel: indT("Common_Create", "Create"),
        size: 76,
        right: 16,
        bottom: 24,
        onClick: handleOpenCreateLineMode
      }
    ) : null
  ] });
};
var ExpenseSheetDetailPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(VisitasPageProviders_default, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseSheetDetailPageContent, {}) });
};
var mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-sheet-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseSheetDetailPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseSheetDetailPage_default = ExpenseSheetDetailPage;
export {
  ExpenseSheetDetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlTGluZXNUaW1lbGluZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb25zdGFudHMvZXhjaGFuZ2VSYXRlRW50cnlNb2RlQ2F0YWxvZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3hcIjtcbmltcG9ydCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeFwiO1xuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XG5pbXBvcnQgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlU2hlZXRIZWFkZXJGb3JtLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VMaW5lc1RpbWVsaW5lIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VMaW5lc1RpbWVsaW5lLnRzeFwiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9ucy50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUudHNcIjtcblxuY29uc3QgTElORVNfUEFHRV9TSVpFID0gNjtcblxuY29uc3QgcGFnZWRTbGljZSA9IDxULD4oaXRlbXM6IFRbXSwgcGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKTogVFtdID0+IHtcbiAgaWYgKCFpdGVtcy5sZW5ndGgpIHJldHVybiBbXTtcbiAgY29uc3Qgc2FmZVBhZ2UgPSBNYXRoLm1heCgxLCBwYWdlKTtcbiAgY29uc3Qgc3RhcnQgPSAoc2FmZVBhZ2UgLSAxKSAqIHBhZ2VTaXplO1xuICByZXR1cm4gaXRlbXMuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgcGFnZVNpemUpO1xufTtcblxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxuY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXG4gIH0pO1xufTtcblxuY29uc3QgRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiVmlld1wiKTtcbiAgY29uc3QgY2FuRWRpdEV4cGVuc2UgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkVkaXRcIik7XG4gIGNvbnN0IGNhbkRlbGV0ZUV4cGVuc2UgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkZ1bGxBY2Nlc3NcIik7XG4gIGNvbnN0IGNhbkNyZWF0ZUV4cGVuc2UgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkFkZFwiKTtcbiAgY29uc3Qgc2hlZXRJZCA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfU0hFRVRfSURfXyk7XG4gIGNvbnN0IHNoZWV0TW9kZSA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfU0hFRVRfTU9ERV9fKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBpc0NyZWF0ZU1vZGUgPSBzaGVldE1vZGUgPT09IFwiY3JlYXRlXCI7XG4gIGNvbnN0IGxpbmVDb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgY3JlYXRlZFNoZWV0SWRSZWYgPSB1c2VSZWYoXCJcIik7XG5cbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxuICAgIH0pLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3Qge1xuICAgIGhlYWRlcixcbiAgICBsaW5lcyxcbiAgICBsaW5lUGFnZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGJ1c3ksXG4gICAgc3RhdHVzLFxuICAgIGlzRWRpdGluZyxcbiAgICBtb2RhbEVycm9yLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvYWRpbmcsXG4gICAgZXhjaGFuZ2VSYXRlTWVzc2FnZSxcbiAgICBleGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcixcbiAgICBwcm9qZWN0VmFsdWUsXG4gICAgdm91Y2hlclZhbHVlLFxuICAgIGlzU2hlZXRQYWlkLFxuICAgIGV4Y2hhbmdlUmF0ZVZhbHVlLFxuICAgIHNob3dFeGNoYW5nZVJhdGUsXG4gICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxuICAgIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCxcbiAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSxcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXG4gICAgc2V0TGluZVBhZ2UsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNFZGl0aW5nLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcbiAgICBzZXREcmFmdFByb2plY3RJZCxcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLFxuICAgIG5hdmlnYXRlVG9DcmVhdGVkU2hlZXQsXG4gICAgbmF2aWdhdGVUb0xpbmVEZXRhaWwsXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZSh7XG4gICAgaGFzQWNjZXNzLFxuICAgIGNhbkNyZWF0ZUV4cGVuc2UsXG4gICAgY2FuRWRpdEV4cGVuc2UsXG4gICAgc2hlZXRJZCxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxuICB9KTtcblxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcbiAgICAgIGJ1c3ksXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XG4gICAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcbiAgICAgICAgc2V0U3RhdHVzKG1zZyk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9LCBbYnVzeSwgaGFuZGxlQ29uZmlybV0pO1xuXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpO1xuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxuICAgIDogKCFidXN5ICYmIG1vZGFsRXJyb3IgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIikgOiAobW9kYWwuY29uZmlybVRleHQgfHwgaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIikpKTtcblxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBoYW5kbGVNb2RhbENvbmZpcm0oKTtcbiAgfSwgW2J1c3ksIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtLCBtb2RhbEVycm9yXSk7XG5cbiAgY29uc3QgdmlzaWJsZUxpbmVzID0gdXNlTWVtbygoKSA9PiBwYWdlZFNsaWNlKGxpbmVzLCBsaW5lUGFnZSwgTElORVNfUEFHRV9TSVpFKSwgW2xpbmVQYWdlLCBsaW5lc10pO1xuICBjb25zdCB0b3RhbExpbmVQYWdlcyA9IE1hdGguY2VpbCgobGluZXMubGVuZ3RoIHx8IDApIC8gTElORVNfUEFHRV9TSVpFKTtcbiAgY29uc3QgdG90YWxBbW91bnRUZXh0ID0gdXNlTWVtbyhcbiAgICAoKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koaGVhZGVyPy50b3RhbEFtb3VudCA/PyBudWxsLCBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSkpLFxuICAgIFtoZWFkZXJdXG4gICk7XG5cbiAgY29uc3QgeyBoYW5kbGVVcGRhdGUsIGhhbmRsZURlbGV0ZSB9ID0gdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zKHtcbiAgICBidXN5LFxuICAgIGlzRWRpdGluZyxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNMb2NrZWQ6IGlzU2hlZXRQYWlkLFxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgICBsb2NrZWRDdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcbiAgICBsb2NrZWRFeGNoYW5nZVJhdGU6IHNhZmVUZXh0KGhlYWRlcj8uZXhjaFJhdGUpLFxuICAgIGNhbkNyZWF0ZUV4cGVuc2UsXG4gICAgY2FuRWRpdEV4cGVuc2UsXG4gICAgY2FuRGVsZXRlRXhwZW5zZSxcbiAgICBzaGVldElkLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcbiAgICBkcmFmdFByb2plY3RJZCxcbiAgICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzOiBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyxcbiAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gICAgb25DcmVhdGVTdWNjZXNzOiAoY3JlYXRlZFNoZWV0SWQpID0+IHtcbiAgICAgIGNyZWF0ZWRTaGVldElkUmVmLmN1cnJlbnQgPSBzYWZlVGV4dChjcmVhdGVkU2hlZXRJZCk7XG4gICAgfSxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgfSk7XG5cbiAgY29uc3QgaGFuZGxlU2F2ZVN1Y2Nlc3MgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldChjcmVhdGVkU2hlZXRJZFJlZi5jdXJyZW50KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIH0sIFtpc0NyZWF0ZU1vZGUsIG5hdmlnYXRlVG9DcmVhdGVkU2hlZXRdKTtcblxuICB1c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zKHtcbiAgICBidXN5LFxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcbiAgICBpc0VkaXRpbmcsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzTG9ja2VkOiBpc1NoZWV0UGFpZCxcbiAgICBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGNhbkVkaXRFeHBlbnNlLFxuICAgIGNhbkRlbGV0ZUV4cGVuc2UsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlVXBkYXRlLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgICBvblNhdmVTdWNjZXNzOiBoYW5kbGVTYXZlU3VjY2VzcyxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gIH0pO1xuXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xuICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCFsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY2FyZDtcbiAgfSwgW10pO1xuXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoe1xuICAgIGNvbnRhaW5lclJlZjogbGluZUNvbnRhaW5lclJlZixcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgaXRlbXM6IHZpc2libGVMaW5lcyxcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcbiAgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgPENvbmZpcm1Nb2RhbFxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XG4gICAgICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbENhbmNlbFRleHR9XG4gICAgICAgIGxvYWRpbmdUZXh0PXttb2RhbExvYWRpbmdUZXh0fVxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XG4gICAgICAgIGJ1c3k9e2J1c3l9XG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cbiAgICAgICAgb25Db25maXJtPXtoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm19XG4gICAgICAgIG9uQ2FuY2VsPXtjbG9zZUNvbmZpcm19XG4gICAgICAvPlxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cbiAgICAgID5cbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cbiAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtlcnJvck1lc3NhZ2UgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxuXG4gICAgICB7IWlzTG9hZGluZyAmJiAhZXJyb3JNZXNzYWdlICYmIGhlYWRlciA/IChcbiAgICAgICAgPEV4cGVuc2VTaGVldEhlYWRlckZvcm1cbiAgICAgICAgICBpc0NyZWF0ZU1vZGU9e2lzQ3JlYXRlTW9kZX1cbiAgICAgICAgICBpc0VkaXRpbmc9e2lzRWRpdGluZ31cbiAgICAgICAgICBoZWFkZXI9e2hlYWRlcn1cbiAgICAgICAgICBwcm9qZWN0VmFsdWU9e3Byb2plY3RWYWx1ZX1cbiAgICAgICAgICB2b3VjaGVyVmFsdWU9e3ZvdWNoZXJWYWx1ZX1cbiAgICAgICAgICBpc1NoZWV0UGFpZD17aXNTaGVldFBhaWR9XG4gICAgICAgICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXM9e2lzQ3VycmVuY3lMb2NrZWRCeUxpbmVzfVxuICAgICAgICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcz17aXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzfVxuICAgICAgICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5PXtub3JtYWxpemVkRHJhZnRDdXJyZW5jeX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k9e2V4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQ9e2V4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudH1cbiAgICAgICAgICBzaG93RXhjaGFuZ2VSYXRlPXtzaG93RXhjaGFuZ2VSYXRlfVxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZVZhbHVlPXtleGNoYW5nZVJhdGVWYWx1ZX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZT17ZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2V9XG4gICAgICAgICAgdG90YWxBbW91bnRUZXh0PXt0b3RhbEFtb3VudFRleHR9XG4gICAgICAgICAgZHJhZnREZXNjcmlwdGlvbj17ZHJhZnREZXNjcmlwdGlvbn1cbiAgICAgICAgICBkcmFmdFByb2plY3RJZD17ZHJhZnRQcm9qZWN0SWR9XG4gICAgICAgICAgZHJhZnRDdXJyZW5jeUNvZGU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxuICAgICAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlPXtkcmFmdEV4Y2hhbmdlUmF0ZX1cbiAgICAgICAgICBpc0V4Y2hhbmdlUmF0ZUxvYWRpbmc9e2lzRXhjaGFuZ2VSYXRlTG9hZGluZ31cbiAgICAgICAgICBleGNoYW5nZVJhdGVNZXNzYWdlPXtleGNoYW5nZVJhdGVNZXNzYWdlfVxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yPXtleGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcn1cbiAgICAgICAgICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U9e3NldERyYWZ0RGVzY3JpcHRpb259XG4gICAgICAgICAgb25EcmFmdFByb2plY3RJZENoYW5nZT17c2V0RHJhZnRQcm9qZWN0SWR9XG4gICAgICAgICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZT17c2V0RHJhZnRDdXJyZW5jeUNvZGV9XG4gICAgICAgICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZT17c2V0RHJhZnRFeGNoYW5nZVJhdGV9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgeyFpc0NyZWF0ZU1vZGUgJiYgIWlzTG9hZGluZyAmJiAhZXJyb3JNZXNzYWdlID8gKFxuICAgICAgICA8RXhwZW5zZUxpbmVzVGltZWxpbmVcbiAgICAgICAgICB2aXNpYmxlTGluZXM9e3Zpc2libGVMaW5lc31cbiAgICAgICAgICBjdXJyZW5jeUNvZGU9e3NhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKX1cbiAgICAgICAgICB0b3RhbExpbmVQYWdlcz17dG90YWxMaW5lUGFnZXN9XG4gICAgICAgICAgbGluZVBhZ2U9e2xpbmVQYWdlfVxuICAgICAgICAgIGxpbmVzTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVzXCIsIFwiTGluZXNcIil9XG4gICAgICAgICAgZW1wdHlUZXh0PXtpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob0xpbmVzXCIsIFwiTm8gbGluZXMgZm9yIHRoaXMgZXhwZW5zZSBzaGVldC5cIil9XG4gICAgICAgICAgcGFnaW5hdGlvbkxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cbiAgICAgICAgICBjb250YWluZXJSZWY9e2xpbmVDb250YWluZXJSZWZ9XG4gICAgICAgICAgb25MaW5lUGFnZUNoYW5nZT17c2V0TGluZVBhZ2V9XG4gICAgICAgICAgb25PcGVuTGluZT17bmF2aWdhdGVUb0xpbmVEZXRhaWx9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cblxuICAgICAge2NhbkNyZWF0ZUV4cGVuc2UgJiYgIWlzQ3JlYXRlTW9kZSA/IChcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXG4gICAgICAgICAgcm91dGU9XCJcIlxuICAgICAgICAgIGFyaWFMYWJlbD17aW5kVChcIkNvbW1vbl9DcmVhdGVcIiwgXCJDcmVhdGVcIil9XG4gICAgICAgICAgc2l6ZT17NzZ9XG4gICAgICAgICAgcmlnaHQ9ezE2fVxuICAgICAgICAgIGJvdHRvbT17MjR9XG4gICAgICAgICAgb25DbGljaz17aGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxuY29uc3QgRXhwZW5zZVNoZWV0RGV0YWlsUGFnZSA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnM+XG4gICAgICA8RXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRlbnQgLz5cbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICApO1xufTtcblxuY29uc3QgbW91bnQgPSAoKSA9PiB7XG4gIGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoKCk7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS1zaGVldC1kZXRhaWwtcm9vdFwiKTtcbiAgaWYgKCFyb290RWwpIHJldHVybjtcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxFeHBlbnNlU2hlZXREZXRhaWxQYWdlIC8+KTtcbn07XG5cbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXREZXRhaWxQYWdlO1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRIZWFkZXIgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dCBmcm9tIFwiLi9FeHBlbnNlUHJvamVjdEZpbHRlcklucHV0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VSZWFkT25seUZpZWxkIGZyb20gXCIuL0V4cGVuc2VSZWFkT25seUZpZWxkLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckZvcm1Qcm9wcyA9IHtcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGhlYWRlcjogRXhwZW5zZVNoZWV0SGVhZGVyO1xuICBwcm9qZWN0VmFsdWU6IHN0cmluZztcbiAgdm91Y2hlclZhbHVlOiBzdHJpbmc7XG4gIGlzU2hlZXRQYWlkOiBib29sZWFuO1xuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xuICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeTogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50OiBudW1iZXI7XG4gIHNob3dFeGNoYW5nZVJhdGU6IGJvb2xlYW47XG4gIGV4Y2hhbmdlUmF0ZVZhbHVlOiBzdHJpbmc7XG4gIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlOiBzdHJpbmc7XG4gIHRvdGFsQW1vdW50VGV4dDogc3RyaW5nO1xuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGRyYWZ0UHJvamVjdElkOiBzdHJpbmc7XG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGRyYWZ0RXhjaGFuZ2VSYXRlOiBzdHJpbmc7XG4gIGlzRXhjaGFuZ2VSYXRlTG9hZGluZzogYm9vbGVhbjtcbiAgZXhjaGFuZ2VSYXRlTWVzc2FnZTogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcjogYm9vbGVhbjtcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdFByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbi8vIFB1cmUgcHJlc2VudGF0aW9uYWwgaGVhZGVyIGZvcm0gZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsL2NyZWF0ZSBzY3JlZW5zLlxuY29uc3QgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybSA9ICh7XG4gIGlzQ3JlYXRlTW9kZSxcbiAgaXNFZGl0aW5nLFxuICBoZWFkZXIsXG4gIHByb2plY3RWYWx1ZSxcbiAgdm91Y2hlclZhbHVlLFxuICBpc1NoZWV0UGFpZCxcbiAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXG4gIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LFxuICBzaG93RXhjaGFuZ2VSYXRlLFxuICBleGNoYW5nZVJhdGVWYWx1ZSxcbiAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXG4gIHRvdGFsQW1vdW50VGV4dCxcbiAgZHJhZnREZXNjcmlwdGlvbixcbiAgZHJhZnRQcm9qZWN0SWQsXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgaXNFeGNoYW5nZVJhdGVMb2FkaW5nLFxuICBleGNoYW5nZVJhdGVNZXNzYWdlLFxuICBleGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcixcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlLFxuICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlLFxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlLFxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlLFxufTogRXhwZW5zZVNoZWV0SGVhZGVyRm9ybVByb3BzKSA9PiB7XG4gIGNvbnN0IGlzRm9yZWlnbkN1cnJlbmN5ID1cbiAgICBpc0VkaXRpbmcgJiYgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgIT09IFwiXCIgJiYgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgIT09IGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeTtcblxuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInJlbGF0aXZlIHNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgeyFpc0NyZWF0ZU1vZGUgPyAoXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TaGVldElkXCIsIFwiU2hlZXQgaWRcIil9IHZhbHVlPXtzYWZlVGV4dChoZWFkZXIuaG9qYUdhc3Rvc0lkKSB8fCBcIi1cIn0gLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHtpc0VkaXRpbmcgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnREZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtzYWZlVGV4dChoZWFkZXIuZGVzY3JpcHRpb24pIHx8IFwiLVwifVxuICAgICAgICAgICAgZnVsbFdpZHRoXG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICA8RXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Qcm9qZWN0X1BsYWNlaG9sZGVyXCIsIFwiUHJvamVjdCBpZFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtkcmFmdFByb2plY3RJZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0UHJvamVjdElkQ2hhbmdlfVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmd9XG4gICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cbiAgICAgICAgICAvPlxuICAgICAgICApIDogcHJvamVjdFZhbHVlID8gKFxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9IHZhbHVlPXtwcm9qZWN0VmFsdWV9IC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7IWlzRWRpdGluZyAmJiBpc1NoZWV0UGFpZCA/IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1ZvdWNoZXJcIiwgXCJWb3VjaGVyXCIpfSB2YWx1ZT17dm91Y2hlclZhbHVlIHx8IFwiLVwifSAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtOmNvbC1zcGFuLTIgc3BhY2UteS0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGdyaWQgZ2FwLTQgJHtpc0ZvcmVpZ25DdXJyZW5jeSA/IFwiZ3JpZC1jb2xzLTJcIiA6IFwiZ3JpZC1jb2xzLTFcIn1gLnRyaW0oKX0+XG4gICAgICAgICAgICAgIDxFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RcbiAgICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5X1BsYWNlaG9sZGVyXCIsIFwiQ3VycmVuY3kgY29kZVwiKX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRDdXJyZW5jeUNvZGV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmcgfHwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmcgfHwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XG4gICAgICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS1oZWFkZXItY3VycmVuY3lcIlxuICAgICAgICAgICAgICAgIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0PXtpc0NyZWF0ZU1vZGV9XG4gICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAge2lzRm9yZWlnbkN1cnJlbmN5ID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCAke2V4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlID8gXCJib3JkZXItZGFuZ2VyIHJpbmctMSByaW5nLWRhbmdlclwiIDogXCJcIn0gJHtpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIn1gfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3RlcD1cImFueVwiXG4gICAgICAgICAgICAgICAgICAgIGlucHV0TW9kZT1cImRlY2ltYWxcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRFeGNoYW5nZVJhdGV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeGNoYW5nZVJhdGVcIiwgXCJFeGNoYW5nZSByYXRlXCIpfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX1cbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9e2lzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHtpc0ZvcmVpZ25DdXJyZW5jeSA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGluZC1yZWFkb25seS1maWVsZFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3l9XG4gICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQW1vdW50XCIsIFwiQW1vdW50XCIpfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGluZC1yZWFkb25seS1maWVsZFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtTdHJpbmcoZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50KX1cbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQW1vdW50XCIsIFwiQW1vdW50XCIpfVxuICAgICAgICAgICAgICAgICAgICByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgICAge2lzRm9yZWlnbkN1cnJlbmN5ICYmIGlzRXhjaGFuZ2VSYXRlTG9hZGluZyA/IChcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgdGV4dC14c1wiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfTG9hZGluZ1wiLCBcIkNvbnN1bHRhbmRvIHRpcG8gZGUgY2FtYmlvLi4uXCIpfTwvcD5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAge2lzRm9yZWlnbkN1cnJlbmN5ICYmIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlID8gPHAgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXIgdGV4dC1zbVwiPntleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZX08L3A+IDogbnVsbH1cbiAgICAgICAgICAgIHtpc0ZvcmVpZ25DdXJyZW5jeSAmJiAhaXNFeGNoYW5nZVJhdGVMb2FkaW5nICYmIGV4Y2hhbmdlUmF0ZU1lc3NhZ2UgPyAoXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17ZXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IgPyBcInRleHQtZGFuZ2VyIHRleHQtc21cIiA6IFwidGV4dC1zbGF0ZS01MDAgdGV4dC14c1wifT57ZXhjaGFuZ2VSYXRlTWVzc2FnZX08L3A+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9IHZhbHVlPXtzYWZlVGV4dChoZWFkZXIuY3VycmVuY3lDb2RlKSB8fCBcIi1cIn0gLz5cbiAgICAgICAgKX1cbiAgICAgICAgeyFpc0VkaXRpbmcgJiYgc2hvd0V4Y2hhbmdlUmF0ZSA/IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4Y2hhbmdlUmF0ZVwiLCBcIkV4Y2hhbmdlIHJhdGVcIil9IHZhbHVlPXtleGNoYW5nZVJhdGVWYWx1ZX0gLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHshaXNDcmVhdGVNb2RlID8gPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Ub3RhbEFtb3VudFwiLCBcIlRvdGFsIGFtb3VudFwiKX0gdmFsdWU9e3RvdGFsQW1vdW50VGV4dH0gLz4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURhdGVQYXJ0cywgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgZnJvbSBcIi4vRXhwZW5zZVNlY3Rpb25EaXZpZGVyLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4vRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcblxudHlwZSBQYWdpbmF0aW9uTGFiZWxzID0ge1xuICBmaXJzdDogc3RyaW5nO1xuICBwcmV2OiBzdHJpbmc7XG4gIG5leHQ6IHN0cmluZztcbiAgbGFzdDogc3RyaW5nO1xufTtcblxudHlwZSBFeHBlbnNlTGluZXNUaW1lbGluZVByb3BzID0ge1xuICB2aXNpYmxlTGluZXM6IEV4cGVuc2VTaGVldExpbmVbXTtcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIHRvdGFsTGluZVBhZ2VzOiBudW1iZXI7XG4gIGxpbmVQYWdlOiBudW1iZXI7XG4gIGxpbmVzTGFiZWw6IHN0cmluZztcbiAgZW1wdHlUZXh0OiBzdHJpbmc7XG4gIHBhZ2luYXRpb25MYWJlbHM6IFBhZ2luYXRpb25MYWJlbHM7XG4gIGNvbnRhaW5lclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG4gIG9uTGluZVBhZ2VDaGFuZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XG4gIG9uT3BlbkxpbmU6IChsaW5lUmVjSWQ6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbi8vIER1bWIgdGltZWxpbmUgZm9yIGV4cGVuc2Ugc2hlZXQgbGluZXMgd2l0aCBzdGFuZGFyZCBjYXJkIGFuZCBwYWdpbmF0aW9uIGxheW91dC5cbmNvbnN0IEV4cGVuc2VMaW5lc1RpbWVsaW5lID0gKHtcbiAgdmlzaWJsZUxpbmVzLFxuICBjdXJyZW5jeUNvZGUsXG4gIHRvdGFsTGluZVBhZ2VzLFxuICBsaW5lUGFnZSxcbiAgbGluZXNMYWJlbCxcbiAgZW1wdHlUZXh0LFxuICBwYWdpbmF0aW9uTGFiZWxzLFxuICBjb250YWluZXJSZWYsXG4gIG9uTGluZVBhZ2VDaGFuZ2UsXG4gIG9uT3BlbkxpbmUsXG59OiBFeHBlbnNlTGluZXNUaW1lbGluZVByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic3BhY2UteS0wXCI+XG4gICAgICA8RXhwZW5zZVNlY3Rpb25EaXZpZGVyIGxhYmVsPXtsaW5lc0xhYmVsfSBjbGFzc05hbWU9XCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlci0tc3BhY2VkXCIgLz5cblxuICAgICAge3Zpc2libGVMaW5lcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtYm94IHRpbWVsaW5lLWVtcHR5XCIgZGF0YS1lbXB0eS10ZXh0PXtlbXB0eVRleHR9IC8+XG4gICAgICApIDogKFxuICAgICAgICA8ZGl2IHJlZj17Y29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cbiAgICAgICAgICB7dmlzaWJsZUxpbmVzLm1hcCgobGluZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmVJZCA9IHNhZmVUZXh0KGxpbmUubGluZVJlY0lkKTtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gc2FmZVRleHQobGluZS5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBjb25zdCBhbW91bnRUZXh0ID0gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGxpbmUuYW1vdW50ID8/IG51bGwsIGN1cnJlbmN5Q29kZSk7XG4gICAgICAgICAgICBjb25zdCBkYXRlUGFydHMgPSBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzKHNhZmVUZXh0KGxpbmUudHJhbnNEYXRlKSwgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCIpO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17YCR7bGluZUlkfS0ke2luZGV4fWB9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17ZGVzY3JpcHRpb24gfHwgbGluZUlkIHx8IFwiLVwifVxuICAgICAgICAgICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cbiAgICAgICAgICAgICAgICAgIG9uT3Blbj17KCkgPT4gb25PcGVuTGluZShsaW5lSWQpfVxuICAgICAgICAgICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJ0aW1lbGluZS1uYW1lIGV4cGVuc2UtbGluZS1jYXJkX190aXRsZVwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxuICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbExpbmVQYWdlc31cbiAgICAgICAgY3VycmVudFBhZ2U9e2xpbmVQYWdlfVxuICAgICAgICBvblBhZ2VDaGFuZ2U9e29uTGluZVBhZ2VDaGFuZ2V9XG4gICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cbiAgICAgIC8+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUxpbmVzVGltZWxpbmU7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCwgRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24sIHBhcnNlRGVjaW1hbElucHV0IH0gZnJvbSBcIi4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XG5pbXBvcnQge1xuICBjcmVhdGVFeHBlbnNlU2hlZXQsXG4gIGRlbGV0ZUV4cGVuc2VTaGVldCxcbiAgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyLFxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9uc0FyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBpc0xvY2tlZDogYm9vbGVhbjtcbiAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XG4gIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lczogYm9vbGVhbjtcbiAgbG9ja2VkQ3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGxvY2tlZEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xuICBjYW5FZGl0RXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRGVsZXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgc2hlZXRJZDogc3RyaW5nO1xuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGRyYWZ0RXhjaGFuZ2VSYXRlOiBzdHJpbmc7XG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWU6IHN0cmluZztcbiAgZHJhZnRQcm9qZWN0SWQ6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5OiBzdHJpbmc7XG4gIGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXM/OiBudW1iZXIgfCBudWxsO1xuICBvbkNyZWF0ZVN1Y2Nlc3M6IChjcmVhdGVkU2hlZXRJZDogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRNb2RhbEVycm9yOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0QnVzeTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICBzZXRTdGF0dXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRJc0VkaXRpbmc6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+Pjtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUV4Y2hhbmdlUmF0ZSA9IChyYXc6IHN0cmluZyk6IG51bWJlciB8IG51bGwgPT4gcGFyc2VEZWNpbWFsSW5wdXQocmF3KTtcbi8vIENvbXBhcmVzIHJhdGVzIHdpdGggdG9sZXJhbmNlIHRvIGF2b2lkIGZsb2F0aW5nIHBvaW50IG1pc21hdGNoIG9uIHBheWxvYWQgbW9kZS5cbmNvbnN0IGFyZVJhdGVzRXF1aXZhbGVudCA9IChsZWZ0OiBudW1iZXIgfCBudWxsLCByaWdodDogbnVtYmVyIHwgbnVsbCk6IGJvb2xlYW4gPT4ge1xuICBpZiAobGVmdCA9PSBudWxsIHx8IHJpZ2h0ID09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIE1hdGguYWJzKGxlZnQgLSByaWdodCkgPCAwLjAwMDAwMTtcbn07XG5cbi8vIEVuY2Fwc3VsYXRlcyB1cGRhdGUgYW5kIGRlbGV0ZSBtdXRhdGlvbnMgZm9yIGV4cGVuc2Ugc2hlZXQgaGVhZGVyIGRldGFpbC5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMgPSAoe1xuICBidXN5LFxuICBpc0VkaXRpbmcsXG4gIGlzQ3JlYXRlTW9kZSxcbiAgaXNMb2NrZWQsXG4gIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXG4gIGxvY2tlZEN1cnJlbmN5Q29kZSxcbiAgbG9ja2VkRXhjaGFuZ2VSYXRlLFxuICBjYW5DcmVhdGVFeHBlbnNlLFxuICBjYW5FZGl0RXhwZW5zZSxcbiAgY2FuRGVsZXRlRXhwZW5zZSxcbiAgc2hlZXRJZCxcbiAgZHJhZnREZXNjcmlwdGlvbixcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxuICBkcmFmdFByb2plY3RJZCxcbiAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxuICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzLFxuICBvbkNyZWF0ZVN1Y2Nlc3MsXG4gIHNldE1vZGFsRXJyb3IsXG4gIHNldEJ1c3ksXG4gIHNldFN0YXR1cyxcbiAgc2V0SXNFZGl0aW5nLFxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGJ1c3kgfHwgIWlzRWRpdGluZykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghaXNDcmVhdGVNb2RlICYmIGlzTG9ja2VkKSByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBjYW5Qcm9jZWVkID0gaXNDcmVhdGVNb2RlID8gY2FuQ3JlYXRlRXhwZW5zZSA6IGNhbkVkaXRFeHBlbnNlO1xuICAgIGlmICghY2FuUHJvY2VlZCkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW5jeSA9IFN0cmluZyhcbiAgICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzID8gKGxvY2tlZEN1cnJlbmN5Q29kZSB8fCBkcmFmdEN1cnJlbmN5Q29kZSB8fCBcIlwiKSA6IChkcmFmdEN1cnJlbmN5Q29kZSB8fCBcIlwiKVxuICAgIClcbiAgICAgIC50cmltKClcbiAgICAgIC50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWREZXNjcmlwdGlvbiA9IFN0cmluZyhkcmFmdERlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBjb25zdCBub3JtYWxpemVkUHJvamVjdElkID0gU3RyaW5nKGRyYWZ0UHJvamVjdElkIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBjb25zdCBub3JtYWxpemVkRXhjaGFuZ2VSYXRlUmF3ID0gU3RyaW5nKFxuICAgICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzID8gKGxvY2tlZEV4Y2hhbmdlUmF0ZSB8fCBkcmFmdEV4Y2hhbmdlUmF0ZSB8fCBcIlwiKSA6IChkcmFmdEV4Y2hhbmdlUmF0ZSB8fCBcIlwiKVxuICAgICk7XG4gICAgY29uc3Qgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSA9IFN0cmluZyhleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kgfHwgXCJFVVJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCkgfHwgXCJFVVJcIjtcbiAgICBjb25zdCByZXF1aXJlc0V4Y2hhbmdlUmF0ZSA9IG5vcm1hbGl6ZWRDdXJyZW5jeSAhPT0gXCJcIiAmJiBub3JtYWxpemVkQ3VycmVuY3kgIT09IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3k7XG4gICAgY29uc3QgcGFyc2VkRXhjaGFuZ2VSYXRlID0gbm9ybWFsaXplRXhjaGFuZ2VSYXRlKG5vcm1hbGl6ZWRFeGNoYW5nZVJhdGVSYXcpO1xuICAgIGNvbnN0IG9mZmljaWFsRXhjaGFuZ2VSYXRlID0gbm9ybWFsaXplRXhjaGFuZ2VSYXRlKG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUpO1xuICAgIGNvbnN0IG9yaWdpbmFsRXhjaGFuZ2VSYXRlID0gbm9ybWFsaXplRXhjaGFuZ2VSYXRlKGxvY2tlZEV4Y2hhbmdlUmF0ZSk7XG4gICAgY29uc3QgaGFzVmFsaWRSYXRlID0gcGFyc2VkRXhjaGFuZ2VSYXRlICE9IG51bGwgJiYgcGFyc2VkRXhjaGFuZ2VSYXRlID4gMDtcbiAgICBjb25zdCBoYXNNYW51YWxSYXRlRWRpdE9uVXBkYXRlID1cbiAgICAgICFpc0NyZWF0ZU1vZGUgJiZcbiAgICAgIGhhc1ZhbGlkUmF0ZSAmJlxuICAgICAgKG9yaWdpbmFsRXhjaGFuZ2VSYXRlID09IG51bGwgfHwgIWFyZVJhdGVzRXF1aXZhbGVudChwYXJzZWRFeGNoYW5nZVJhdGUsIG9yaWdpbmFsRXhjaGFuZ2VSYXRlKSk7XG4gICAgLy8gT25seSBzZW5kIGV4Y2hhbmdlUmF0ZU1vZGUgd2hlbiB0aGUgdXNlciBhY3R1YWxseSBjaGFuZ2VkIHRoZSByYXRlIG1hbnVhbGx5LlxuICAgIGNvbnN0IGlzTWFudWFsRXhjaGFuZ2VSYXRlID0gKCgpID0+IHtcbiAgICAgIGlmICghcmVxdWlyZXNFeGNoYW5nZVJhdGUgfHwgIWhhc1ZhbGlkUmF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcykgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKCFpc0NyZWF0ZU1vZGUgJiYgIWhhc01hbnVhbFJhdGVFZGl0T25VcGRhdGUpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChvZmZpY2lhbEV4Y2hhbmdlUmF0ZSA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICAgIHJldHVybiAhYXJlUmF0ZXNFcXVpdmFsZW50KHBhcnNlZEV4Y2hhbmdlUmF0ZSwgb2ZmaWNpYWxFeGNoYW5nZVJhdGUpO1xuICAgIH0pKCk7XG4gICAgY29uc3QgcmVzb2x2ZWRFeGNoYW5nZVJhdGVNb2RlID0gaXNNYW51YWxFeGNoYW5nZVJhdGUgPyAxIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHJlc29sdmVkRXhwZW5zZVNoZWV0U3RhdHVzID0gY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cyA/PyAoaXNNYW51YWxFeGNoYW5nZVJhdGUgPyAwIDogdW5kZWZpbmVkKTtcblxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgIGlmICghbm9ybWFsaXplZERlc2NyaXB0aW9uKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25NZXNzYWdlID0gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9EZXNjcmlwdGlvblJlcXVpcmVkXCIsIFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWQuXCIpO1xuICAgICAgICBzZXRNb2RhbEVycm9yKHZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICAgICAgc2V0U3RhdHVzKHZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW5jeSkge1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uTWVzc2FnZSA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fQ3VycmVuY3lSZXF1aXJlZFwiLCBcIkN1cnJlbmN5IGlzIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgc2V0TW9kYWxFcnJvcih2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICAgIHNldFN0YXR1cyh2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVxdWlyZXNFeGNoYW5nZVJhdGUgJiYgIWhhc1ZhbGlkUmF0ZSkge1xuICAgICAgY29uc3QgdmFsaWRhdGlvbk1lc3NhZ2UgPSBpbmRUKFxuICAgICAgICBcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9FeGNoYW5nZVJhdGVSZXF1aXJlZFwiLFxuICAgICAgICBcIkV4Y2hhbmdlIHJhdGUgaXMgcmVxdWlyZWQgd2hlbiBjdXJyZW5jeSBpcyBkaWZmZXJlbnQgZnJvbSBiYXNlIGN1cnJlbmN5LlwiXG4gICAgICApO1xuICAgICAgc2V0TW9kYWxFcnJvcih2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICBzZXRTdGF0dXModmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xuICAgICAgc3RhcnRTdGF0dXM6IGlzQ3JlYXRlTW9kZVxuICAgICAgICA/IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIilcbiAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRpbmdcIiwgXCJVcGRhdGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXG4gICAgICBzZXRNb2RhbEVycm9yLFxuICAgICAgc2V0QnVzeSxcbiAgICAgIHNldFN0YXR1cyxcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICAgICAgY29uc3QgcGF5bG9hZDogRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCA9IHtcbiAgICAgICAgICAgIG1vZGU6IDEsXG4gICAgICAgICAgICBleGlzdGluZ0hvamFHYXN0b3NJZDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IG5vcm1hbGl6ZWREZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGN1cnJlbmN5Q29kZTogbm9ybWFsaXplZEN1cnJlbmN5LFxuICAgICAgICAgICAgZXhjaFJhdGU6IGhhc1ZhbGlkUmF0ZSA/IE51bWJlcihwYXJzZWRFeGNoYW5nZVJhdGUpIDogMSxcbiAgICAgICAgICAgIHByb2pJZDogbm9ybWFsaXplZFByb2plY3RJZCB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICBleHBlbnNlU2hlZXRTdGF0dXM6IDAsXG4gICAgICAgICAgICBleGNoYW5nZVJhdGVNb2RlOiByZXNvbHZlZEV4Y2hhbmdlUmF0ZU1vZGUsXG4gICAgICAgICAgICBsaW5lczogW10sXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY3JlYXRlRXhwZW5zZVNoZWV0KHBheWxvYWQpO1xuXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGNyZWF0ZWRTaGVldElkID0gU3RyaW5nKHJlc3BvbnNlPy5EYXRhPy5Ib2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpO1xuICAgICAgICAgIGlmICghY3JlYXRlZFNoZWV0SWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG9uQ3JlYXRlU3VjY2VzcyhjcmVhdGVkU2hlZXRJZCk7XG4gICAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIikpO1xuICAgICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXlsb2FkOiBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0ID0ge1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoZHJhZnREZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXG4gICAgICAgICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVkQ3VycmVuY3ksXG4gICAgICAgICAgZXhjaFJhdGU6IGhhc1ZhbGlkUmF0ZSA/IE51bWJlcihwYXJzZWRFeGNoYW5nZVJhdGUpIDogMSxcbiAgICAgICAgICBwcm9qSWQ6IFN0cmluZyhkcmFmdFByb2plY3RJZCB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgIGV4cGVuc2VTaGVldFN0YXR1czogcmVzb2x2ZWRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlTW9kZTogcmVzb2x2ZWRFeGNoYW5nZVJhdGVNb2RlLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyKHNoZWV0SWQsIHBheWxvYWQpO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IHVwZGF0ZWRcIikpO1xuICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xuICB9LCBbXG4gICAgYnVzeSxcbiAgICBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGNhbkVkaXRFeHBlbnNlLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcbiAgICBkcmFmdFByb2plY3RJZCxcbiAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gICAgY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cyxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICAgIGlzTG9ja2VkLFxuICAgIGlzRWRpdGluZyxcbiAgICBsb2NrZWRDdXJyZW5jeUNvZGUsXG4gICAgbG9ja2VkRXhjaGFuZ2VSYXRlLFxuICAgIG9uQ3JlYXRlU3VjY2VzcyxcbiAgICBzZXRCdXN5LFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldFN0YXR1cyxcbiAgICBzaGVldElkLFxuICBdKTtcblxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoaXNMb2NrZWQpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWNhbkRlbGV0ZUV4cGVuc2UpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcbiAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIiksXG4gICAgICBzZXRNb2RhbEVycm9yLFxuICAgICAgc2V0QnVzeSxcbiAgICAgIHNldFN0YXR1cyxcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldChzaGVldElkKTtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVkXCIsIFwiRXhwZW5zZSBzaGVldCBkZWxldGVkXCIpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcbiAgfSwgW2J1c3ksIGNhbkRlbGV0ZUV4cGVuc2UsIGlzTG9ja2VkLCBzZXRCdXN5LCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXMsIHNoZWV0SWRdKTtcblxuICByZXR1cm4ge1xuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zIH0gZnJvbSBcIi4uL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50c1wiO1xuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcblxudHlwZSBVc2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncyA9IHtcbiAgYnVzeTogYm9vbGVhbjtcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XG4gIGNhbkVkaXRFeHBlbnNlOiBib29sZWFuO1xuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xuICBjYW5EZWxldGVFeHBlbnNlOiBib29sZWFuO1xuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICBoYW5kbGVEZWxldGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XG4gIG9wZW5Db25maXJtOiAob3B0czoge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XG4gIH0pID0+IHZvaWQ7XG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcbn07XG5cbi8vIENvb3JkaW5hdGVzIHRvcGJhciBpY29uIHN0YXRlIGFuZCBkaXNwYXRjaCBhY3Rpb25zIGZvciBleHBlbnNlIHNoZWV0IGRldGFpbC5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcbiAgYnVzeSxcbiAgbW9kYWxPcGVuLFxuICBpc0VkaXRpbmcsXG4gIGlzQ3JlYXRlTW9kZSxcbiAgaXNMb2NrZWQsXG4gIGNhbkVkaXRFeHBlbnNlLFxuICBjYW5DcmVhdGVFeHBlbnNlLFxuICBjYW5EZWxldGVFeHBlbnNlLFxuICBzZXRNb2RhbEVycm9yLFxuICBoYW5kbGVFbmFibGVFZGl0LFxuICBoYW5kbGVDYW5jZWxFZGl0LFxuICBoYW5kbGVVcGRhdGUsXG4gIGhhbmRsZURlbGV0ZSxcbiAgb25TYXZlU3VjY2VzcyxcbiAgb3BlbkNvbmZpcm0sXG4gIGNsb3NlQ29uZmlybSxcbn06IFVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnNBcmdzKSA9PiB7XG4gIHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyh7XG4gICAgaWRzOiB7XG4gICAgICBlZGl0SWNvbklkOiBcImV4cGVuc2VFZGl0SWNvblwiLFxuICAgICAgc2F2ZUljb25JZDogXCJleHBlbnNlU2F2ZUljb25cIixcbiAgICAgIGRlbGV0ZUJ0bklkOiBcImV4cGVuc2VEZWxldGVCdG5cIixcbiAgICAgIGNhbmNlbEJ0bklkOiBcImV4cGVuc2VDYW5jZWxCdG5cIixcbiAgICB9LFxuICAgIGV2ZW50czoge1xuICAgICAgZWRpdEV2ZW50OiBcImV4cGVuc2UtZGV0YWlsLWVkaXRcIixcbiAgICAgIGRlbGV0ZUV2ZW50OiBcImV4cGVuc2UtZGV0YWlsLWRlbGV0ZVwiLFxuICAgICAgY2FuY2VsRXZlbnQ6IFwiZXhwZW5zZS1kZXRhaWwtY2FuY2VsLWVkaXRcIixcbiAgICB9LFxuICAgIGJ1c3ksXG4gICAgbW9kYWxPcGVuLFxuICAgIGlzRWRpdGluZyxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNMb2NrZWQsXG4gICAgYWxsb3dDcmVhdGVNb2RlQWN0aW9uc1doZW5Mb2NrZWQ6IHRydWUsXG4gICAgY2FuQ3JlYXRlOiBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGNhbkVkaXQ6IGNhbkVkaXRFeHBlbnNlLFxuICAgIGNhbkRlbGV0ZTogY2FuRGVsZXRlRXhwZW5zZSxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVTYXZlOiBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIHNhdmVDb25maXJtVGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19UaXRsZVwiLCBcIlNhdmUgY2hhbmdlc1wiKSxcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gc2F2ZSBjaGFuZ2VzP1wiKSxcbiAgICBzYXZlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXG4gICAgZGVsZXRlQ29uZmlybVRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlU2hlZXRfVGl0bGVcIiwgXCJEZWxldGUgZXhwZW5zZSBzaGVldFwiKSxcbiAgICBkZWxldGVDb25maXJtTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZVNoZWV0X0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBleHBlbnNlIHNoZWV0P1wiKSxcbiAgICBkZWxldGVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIiksXG4gICAgb25TYXZlU3VjY2VzcyxcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCIpO1xuICAgIH0sXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgY2xvc2VDb25maXJtLFxuICB9KTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7XG4gIEV4cGVuc2VTaGVldEhlYWRlcixcbiAgRXhwZW5zZVNoZWV0TGluZSxcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHtcbiAgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwsXG4gIGdldEV4Y2hhbmdlUmF0ZSxcbiAgZ2V0RXhwZW5zZVNoZWV0RGVmYXVsdEN1cnJlbmN5Q29kZSxcbiAgbWFwRXhwZW5zZVNoZWV0SGVhZGVyLFxuICBtYXBFeHBlbnNlU2hlZXRMaW5lLFxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHtcbiAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLFxuICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCxcbiAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCxcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leGNoYW5nZVJhdGVFbnRyeU1vZGVDYXRhbG9nLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIGhhc0Fzc2lnbmVkVm91Y2hlciwgcGFyc2VFeHBlbnNlRGF0ZSwgc2FmZVRleHQsIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuXG5jb25zdCBFWENIQU5HRV9SQVRFX0RFQk9VTkNFX01TID0gNDAwO1xuY29uc3QgRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5UID0gMTAwO1xuXG4vLyBOb3JtYWxpemVzIGV4Y2hhbmdlLXJhdGUgbnVtYmVycyBmb3IgbnVtZXJpYyBpbnB1dCBjb250cm9scy5cbmNvbnN0IGZvcm1hdEV4Y2hhbmdlUmF0ZUlucHV0VmFsdWUgPSAodmFsdWU6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gIGlmICghTnVtYmVyLmlzRmluaXRlKHZhbHVlKSkgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBTdHJpbmcoTnVtYmVyKHZhbHVlLnRvRml4ZWQoNikpKTtcbn07XG5cbmNvbnN0IGJ1aWxkQ3JlYXRlSGVhZGVyRHJhZnQgPSAoKTogRXhwZW5zZVNoZWV0SGVhZGVyID0+IHtcbiAgcmV0dXJuIHtcbiAgICBob2phR2FzdG9zSWQ6IFwiXCIsXG4gICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgcHJvaklkOiBcIlwiLFxuICAgIHZvdWNoZXI6IFwiXCIsXG4gICAgY3VycmVuY3lDb2RlOiBcIlwiLFxuICAgIHRvdGFsQW1vdW50OiBudWxsLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogMCxcbiAgICBleGNoYW5nZVJhdGVNb2RlOiAwLFxuICAgIGNyZWF0ZWREYXRlOiBcIlwiLFxuICAgIGV4Y2hSYXRlOiBcIjFcIixcbiAgfTtcbn07XG5cbmNvbnN0IHNob3VsZFNob3dFeGNoYW5nZVJhdGUgPSAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3Qgbm9ybWFsaXplZCA9IHZhbHVlLnJlcGxhY2UoL1xccysvZywgXCJcIikucmVwbGFjZShcIixcIiwgXCIuXCIpO1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIobm9ybWFsaXplZCk7XG4gIGlmIChOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSkge1xuICAgIHJldHVybiBNYXRoLmFicyhwYXJzZWQpID4gMDtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxudHlwZSBVc2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZUFyZ3MgPSB7XG4gIGhhc0FjY2VzczogYm9vbGVhbjtcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XG4gIHNoZWV0SWQ6IHN0cmluZztcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcbn07XG5cbi8vIE93bnMgc3RhdGUgYW5kIGJlaGF2aW9yIGZvciBleHBlbnNlIHNoZWV0IGRldGFpbCBwYWdlIChyZWFkLCBlZGl0LCBjcmVhdGUpLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlID0gKHtcbiAgaGFzQWNjZXNzLFxuICBjYW5DcmVhdGVFeHBlbnNlLFxuICBjYW5FZGl0RXhwZW5zZSxcbiAgc2hlZXRJZCxcbiAgaXNDcmVhdGVNb2RlLFxuICBvbkZvcmJpZGRlbixcbn06IFVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlQXJncykgPT4ge1xuICBjb25zdCBbaGVhZGVyLCBzZXRIZWFkZXJdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0SGVhZGVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtsaW5lcywgc2V0TGluZXNdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0TGluZVtdPihbXSk7XG4gIGNvbnN0IFtsaW5lUGFnZSwgc2V0TGluZVBhZ2VdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtpc0VkaXRpbmcsIHNldElzRWRpdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnREZXNjcmlwdGlvbiwgc2V0RHJhZnREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0UHJvamVjdElkLCBzZXREcmFmdFByb2plY3RJZF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0Q3VycmVuY3lDb2RlLCBzZXREcmFmdEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0RXhjaGFuZ2VSYXRlLCBzZXREcmFmdEV4Y2hhbmdlUmF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RlZmF1bHRDdXJyZW5jeUNvZGUsIHNldERlZmF1bHRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtpc0V4Y2hhbmdlUmF0ZUxvYWRpbmcsIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtleGNoYW5nZVJhdGVNZXNzYWdlLCBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IsIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW29mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWVdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgY29uc3QgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciA9IHVzZUNhbGxiYWNrKChuZXh0SGVhZGVyOiBFeHBlbnNlU2hlZXRIZWFkZXIgfCBudWxsKSA9PiB7XG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbihzYWZlVGV4dChuZXh0SGVhZGVyPy5kZXNjcmlwdGlvbikpO1xuICAgIHNldERyYWZ0UHJvamVjdElkKHNhZmVUZXh0KG5leHRIZWFkZXI/LnByb2pJZCkpO1xuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlKHNhZmVUZXh0KG5leHRIZWFkZXI/LmN1cnJlbmN5Q29kZSkpO1xuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlKHNhZmVUZXh0KG5leHRIZWFkZXI/LmV4Y2hSYXRlKSk7XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGxvYWREZXRhaWwgPSBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoIWhhc0FjY2Vzcykge1xuICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlKSB7XG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkcmFmdEhlYWRlciA9IGJ1aWxkQ3JlYXRlSGVhZGVyRHJhZnQoKTtcbiAgICAgICAgc2V0SGVhZGVyKGRyYWZ0SGVhZGVyKTtcbiAgICAgICAgc2V0TGluZXMoW10pO1xuICAgICAgICBzZXRMaW5lUGFnZSgxKTtcbiAgICAgICAgc2V0SXNFZGl0aW5nKHRydWUpO1xuICAgICAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGRyYWZ0SGVhZGVyKTtcbiAgICAgICAgc2V0U3RhdHVzKFwiXCIpO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzaGVldElkKSB7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgIHNldExpbmVzKFtdKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwoc2hlZXRJZCwge1xuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlPy5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlwiKSk7XG4gICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICAgIHNldExpbmVzKFtdKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaGVldHMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xuICAgICAgICBjb25zdCBzZWxlY3RlZFNoZWV0ID1cbiAgICAgICAgICBzaGVldHMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5Py5Ib2phR2FzdG9zSWQpLnRvVXBwZXJDYXNlKCkgPT09IHNoZWV0SWQudHJpbSgpLnRvVXBwZXJDYXNlKCkpIHx8IHNoZWV0c1swXTtcblxuICAgICAgICBpZiAoIXNlbGVjdGVkU2hlZXQpIHtcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IHdhcyBub3QgZm91bmQuXCIpKTtcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgICAgc2V0TGluZXMoW10pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5leHRIZWFkZXIgPSBtYXBFeHBlbnNlU2hlZXRIZWFkZXIoc2VsZWN0ZWRTaGVldCk7XG4gICAgICAgIGNvbnN0IG5leHRMaW5lcyA9IChBcnJheS5pc0FycmF5KHNlbGVjdGVkU2hlZXQuTGluZXMpID8gc2VsZWN0ZWRTaGVldC5MaW5lcyA6IFtdKS5tYXAoKGVudHJ5KSA9PlxuICAgICAgICAgIG1hcEV4cGVuc2VTaGVldExpbmUoZW50cnkpXG4gICAgICAgICk7XG4gICAgICAgIHNldEhlYWRlcihuZXh0SGVhZGVyKTtcbiAgICAgICAgc2V0TGluZXMobmV4dExpbmVzKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShcbiAgICAgICAgICBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlwiKVxuICAgICAgICApO1xuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgIHNldExpbmVzKFtdKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZvaWQgbG9hZERldGFpbCgpO1xuICB9LCBbY2FuQ3JlYXRlRXhwZW5zZSwgaGFzQWNjZXNzLCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyLCBpc0NyZWF0ZU1vZGUsIG9uRm9yYmlkZGVuLCBzaGVldElkXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWhlYWRlciB8fCBpc0VkaXRpbmcpIHJldHVybjtcbiAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGhlYWRlcik7XG4gIH0sIFtoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzRWRpdGluZ10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFoYXNBY2Nlc3MpIHJldHVybjtcbiAgICBsZXQgaXNDYW5jZWxsZWQgPSBmYWxzZTtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gICAgY29uc3QgbG9hZERlZmF1bHRDdXJyZW5jeUNvZGUgPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBjb2RlID0gYXdhaXQgZ2V0RXhwZW5zZVNoZWV0RGVmYXVsdEN1cnJlbmN5Q29kZSh7XG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICBzZXREZWZhdWx0Q3VycmVuY3lDb2RlKHNhZmVUZXh0KGNvZGUpLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSByZXR1cm47XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZvaWQgbG9hZERlZmF1bHRDdXJyZW5jeUNvZGUoKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaXNDYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xuICAgIH07XG4gIH0sIFtoYXNBY2Nlc3NdKTtcblxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbygoKSA9PiBidXN5IHx8IGlzRWRpdGluZywgW2J1c3ksIGlzRWRpdGluZ10pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoaGFzQWN0aXZlUHJvY2Vzcyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCgpO1xuICAgIH07XG4gIH0sIFtoYXNBY3RpdmVQcm9jZXNzXSk7XG5cbiAgY29uc3QgcHJvamVjdFZhbHVlID0gc2FmZVRleHQoaGVhZGVyPy5wcm9qSWQpO1xuICBjb25zdCB2b3VjaGVyVmFsdWUgPSBzYWZlVGV4dChoZWFkZXI/LnZvdWNoZXIpO1xuICBjb25zdCBpc1NoZWV0UGFpZCA9IGhhc0Fzc2lnbmVkVm91Y2hlcih2b3VjaGVyVmFsdWUpO1xuICBjb25zdCBoYXNMaW5lcyA9IGxpbmVzLmxlbmd0aCA+IDA7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZVZhbHVlID0gc2FmZVRleHQoaGVhZGVyPy5leGNoUmF0ZSk7XG4gIGNvbnN0IHNob3dFeGNoYW5nZVJhdGUgPSB1c2VNZW1vKCgpID0+IHNob3VsZFNob3dFeGNoYW5nZVJhdGUoZXhjaGFuZ2VSYXRlVmFsdWUpLCBbZXhjaGFuZ2VSYXRlVmFsdWVdKTtcbiAgY29uc3Qgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgPSB1c2VNZW1vKCgpID0+IGRyYWZ0Q3VycmVuY3lDb2RlLnRyaW0oKS50b1VwcGVyQ2FzZSgpLCBbZHJhZnRDdXJyZW5jeUNvZGVdKTtcbiAgY29uc3Qgbm9ybWFsaXplZERlZmF1bHRDdXJyZW5jeSA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQoZGVmYXVsdEN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSwgW2RlZmF1bHRDdXJyZW5jeUNvZGVdKTtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5ID0gbm9ybWFsaXplZERlZmF1bHRDdXJyZW5jeSB8fCBcIkVVUlwiO1xuICBjb25zdCB1aUxvY2FsZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBcImVzLUVTXCI7XG4gICAgcmV0dXJuIHNhZmVUZXh0KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudD8ubGFuZykgfHwgXCJlcy1FU1wiO1xuICB9LCBbXSk7XG4gIGNvbnN0IGZvcm1FeGNoYW5nZURhdGUgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBwYXJzZWREYXRlID0gcGFyc2VFeHBlbnNlRGF0ZShzYWZlVGV4dChoZWFkZXI/LmNyZWF0ZWREYXRlKSk7XG4gICAgaWYgKHBhcnNlZERhdGUpIHJldHVybiB0b0lzb0RhdGUocGFyc2VkRGF0ZSk7XG4gICAgcmV0dXJuIHRvSXNvRGF0ZShuZXcgRGF0ZSgpKTtcbiAgfSwgW2hlYWRlcj8uY3JlYXRlZERhdGVdKTtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlUmVxdWlyZWQgPVxuICAgIGlzRWRpdGluZyAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gXCJcIiAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5O1xuICBjb25zdCBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSA9XG4gICAgZXhjaGFuZ2VSYXRlUmVxdWlyZWQgJiYgIWRyYWZ0RXhjaGFuZ2VSYXRlLnRyaW0oKVxuICAgICAgPyBpbmRUKFxuICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0V4Y2hhbmdlUmF0ZVJlcXVpcmVkXCIsXG4gICAgICAgICAgXCJFeGNoYW5nZSByYXRlIGlzIHJlcXVpcmVkIHdoZW4gY3VycmVuY3kgaXMgZGlmZmVyZW50IGZyb20gYmFzZSBjdXJyZW5jeS5cIlxuICAgICAgICApXG4gICAgICA6IFwiXCI7XG4gIGNvbnN0IGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzID0gaXNFZGl0aW5nICYmIGhhc0xpbmVzO1xuICBjb25zdCBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMgPSBpc0VkaXRpbmcgJiYgaGFzTGluZXMgJiYgc2hvd0V4Y2hhbmdlUmF0ZTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xuICAgIGxldCByZXF1ZXN0VGltZXI6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IHJlcXVlc3RBYm9ydENvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlciB8IG51bGwgPSBudWxsO1xuXG4gICAgY29uc3QgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzID0gKCkgPT4ge1xuICAgICAgaWYgKHJlcXVlc3RUaW1lcikge1xuICAgICAgICBjbGVhclRpbWVvdXQocmVxdWVzdFRpbWVyKTtcbiAgICAgICAgcmVxdWVzdFRpbWVyID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmIChyZXF1ZXN0QWJvcnRDb250cm9sbGVyKSB7XG4gICAgICAgIHJlcXVlc3RBYm9ydENvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICAgICAgcmVxdWVzdEFib3J0Q29udHJvbGxlciA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICghaXNFZGl0aW5nIHx8IGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcykge1xuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICghbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgfHwgIWV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSkge1xuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChub3JtYWxpemVkRHJhZnRDdXJyZW5jeSA9PT0gZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5KSB7XG4gICAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShcIjFcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiMVwiKTtcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyhmYWxzZSk7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFwiXCIpO1xuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJlcXVlc3RUaW1lciA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgcmVxdWVzdEFib3J0Q29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldEV4Y2hhbmdlUmF0ZShcbiAgICAgICAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcbiAgICAgICAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gICAgICAgICAgZm9ybUV4Y2hhbmdlRGF0ZSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHNpZ25hbDogcmVxdWVzdEFib3J0Q29udHJvbGxlci5zaWduYWwsXG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2VzcyB8fCAhcmVzcG9uc2UuRGF0YSB8fCAhTnVtYmVyLmlzRmluaXRlKE51bWJlcihyZXNwb25zZS5EYXRhLlJhdGUpKSkge1xuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXG4gICAgICAgICAgICBzYWZlVGV4dChyZXNwb25zZS5NZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvZmZpY2lhbFJhdGVGb3JBbW91bnQxMDAgPSBOdW1iZXIocmVzcG9uc2UuRGF0YS5SYXRlKSAqIEVYQ0hBTkdFX1JBVEVfUkVGRVJFTkNFX0FNT1VOVDtcbiAgICAgICAgY29uc3QgbmV4dEV4Y2hhbmdlUmF0ZVZhbHVlID0gZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZShvZmZpY2lhbFJhdGVGb3JBbW91bnQxMDApO1xuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKG5leHRFeGNoYW5nZVJhdGVWYWx1ZSk7XG4gICAgICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlKG5leHRFeGNoYW5nZVJhdGVWYWx1ZSk7XG5cbiAgICAgICAgY29uc3QgZWZmZWN0aXZlUmF0ZURhdGUgPSBzYWZlVGV4dChyZXNwb25zZS5EYXRhLkRhdGUpIHx8IGZvcm1FeGNoYW5nZURhdGU7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGEuU291cmNlKTtcbiAgICAgICAgY29uc3Qgb2ZmaWNpYWxMYWJlbCA9IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlTGFiZWwoMCkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0V4Y2hhbmdlUmF0ZU1vZGVfT2ZmaWNpYWxcIiwgXCJULkMuIE9maWNpYWxcIik7XG4gICAgICAgIGNvbnN0IGxvY2FsaXplZFJhdGVEYXRlID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGVmZmVjdGl2ZVJhdGVEYXRlLCB1aUxvY2FsZSkgfHwgZWZmZWN0aXZlUmF0ZURhdGU7XG4gICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2Uoc291cmNlID8gYCR7b2ZmaWNpYWxMYWJlbH0gJHtsb2NhbGl6ZWRSYXRlRGF0ZX0gKCR7c291cmNlfSlgIDogYCR7b2ZmaWNpYWxMYWJlbH0gJHtsb2NhbGl6ZWRSYXRlRGF0ZX1gKTtcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikgcmV0dXJuO1xuXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9Ob3RGb3VuZFwiLCBcIk5vIGhheSB0aXBvIGRlIGNhbWJpbyBwYXJhIGxhIGZlY2hhXCIpKTtcbiAgICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQyMiB8fCBlcnJvci5zdGF0dXMgPT09IDUwMCkge1xuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcbiAgICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXG4gICAgICAgICAgICAgIHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXG4gICAgICAgICAgICBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIikpO1xuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmICghaXNDYW5jZWxsZWQpIHtcbiAgICAgICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgRVhDSEFOR0VfUkFURV9ERUJPVU5DRV9NUyk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaXNDYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XG4gICAgfTtcbiAgfSwgW1xuICAgIGZvcm1FeGNoYW5nZURhdGUsXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxuICAgIGlzRWRpdGluZyxcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXG4gICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXG4gICAgdWlMb2NhbGUsXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXG4gIF0pO1xuXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGlzQ3JlYXRlTW9kZSB8fCBpc0xvYWRpbmcgfHwgIWhlYWRlciB8fCBpc1NoZWV0UGFpZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghY2FuRWRpdEV4cGVuc2UpIHtcbiAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XG4gICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihoZWFkZXIpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIikpO1xuICB9LCBbY2FuRWRpdEV4cGVuc2UsIGhlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNDcmVhdGVNb2RlLCBpc0xvYWRpbmcsIGlzU2hlZXRQYWlkLCBvbkZvcmJpZGRlbl0pO1xuXG4gIGNvbnN0IGhhbmRsZUNhbmNlbEVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldHNcIiwge1xuICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWlzRWRpdGluZykgcmV0dXJuO1xuXG4gICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIoaGVhZGVyKTtcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xuICB9LCBbaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZ10pO1xuXG4gIC8vIE9wZW5zIGV4cGVuc2Ugc2hlZXQgY3JlYXRlIG1vZGUgZnJvbSBsaXN0LWxldmVsIGVudHJ5IHBvaW50cy5cbiAgY29uc3QgaGFuZGxlT3BlbkNyZWF0ZVNoZWV0TW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UpIHtcbiAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/bW9kZT1jcmVhdGVcIiwge1xuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXG4gICAgfSk7XG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgb25Gb3JiaWRkZW5dKTtcblxuICAvLyBPcGVucyBleHBlbnNlIGxpbmUgY3JlYXRlIG1vZGUgZnJvbSBhbiBleGlzdGluZyBleHBlbnNlIHNoZWV0IGRldGFpbC5cbiAgY29uc3QgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSB8fCAhc2hlZXRJZCkge1xuICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0TGluZURldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCl9Jm1vZGU9Y3JlYXRlYDtcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwsIHtcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxuICAgIH0pO1xuICB9LCBbY2FuQ3JlYXRlRXhwZW5zZSwgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIG9uRm9yYmlkZGVuLCBzaGVldElkXSk7XG5cbiAgY29uc3QgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldCA9IHVzZUNhbGxiYWNrKChjcmVhdGVkU2hlZXRJZDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qgc2FmZUNyZWF0ZWRTaGVldElkID0gc2FmZVRleHQoY3JlYXRlZFNoZWV0SWQpO1xuICAgIGlmICghc2FmZUNyZWF0ZWRTaGVldElkKSByZXR1cm47XG5cbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVDcmVhdGVkU2hlZXRJZCl9YDtcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgbmF2aWdhdGVUb0xpbmVEZXRhaWwgPSB1c2VDYWxsYmFjayhcbiAgICAobGluZVJlY0lkOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHNhZmVMaW5lSWQgPSBzYWZlVGV4dChsaW5lUmVjSWQpO1xuICAgICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChzaGVldElkKTtcbiAgICAgIGlmICghc2FmZUxpbmVJZCB8fCAhc2FmZVNoZWV0SWQpIHJldHVybjtcblxuICAgICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0TGluZURldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZVNoZWV0SWQpfSZsaW5lUmVjSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZUxpbmVJZCl9YDtcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xuICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXG4gICAgICAgIGJ5cGFzc0d1YXJkT25jZTogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtzaGVldElkXVxuICApO1xuXG4gIHJldHVybiB7XG4gICAgaGVhZGVyLFxuICAgIGxpbmVzLFxuICAgIGxpbmVQYWdlLFxuICAgIGlzTG9hZGluZyxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgYnVzeSxcbiAgICBzdGF0dXMsXG4gICAgaXNFZGl0aW5nLFxuICAgIG1vZGFsRXJyb3IsXG4gICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICBkcmFmdFByb2plY3RJZCxcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxuICAgIGlzRXhjaGFuZ2VSYXRlTG9hZGluZyxcbiAgICBleGNoYW5nZVJhdGVNZXNzYWdlLFxuICAgIGV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yLFxuICAgIHByb2plY3RWYWx1ZSxcbiAgICB2b3VjaGVyVmFsdWUsXG4gICAgaXNTaGVldFBhaWQsXG4gICAgZXhjaGFuZ2VSYXRlVmFsdWUsXG4gICAgc2hvd0V4Y2hhbmdlUmF0ZSxcbiAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcbiAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50OiBFWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQsXG4gICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXG4gICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICAgIHNldExpbmVQYWdlLFxuICAgIHNldExpbmVzLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZU9wZW5DcmVhdGVTaGVldE1vZGUsXG4gICAgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLFxuICAgIG5hdmlnYXRlVG9DcmVhdGVkU2hlZXQsXG4gICAgbmF2aWdhdGVUb0xpbmVEZXRhaWwsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcblxudHlwZSBFeGNoYW5nZVJhdGVNb2RlVWlNZXRhID0ge1xuICBsYWJlbEtleTogc3RyaW5nO1xuICBmYWxsYmFjazogc3RyaW5nO1xufTtcblxuY29uc3QgRVhDSEFOR0VfUkFURV9NT0RFX01FVEE6IFJlY29yZDxFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGUsIEV4Y2hhbmdlUmF0ZU1vZGVVaU1ldGE+ID0ge1xuICAwOiB7XG4gICAgbGFiZWxLZXk6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9PZmZpY2lhbFwiLFxuICAgIGZhbGxiYWNrOiBcIlQuQy4gT2ZpY2lhbFwiLFxuICB9LFxuICAxOiB7XG4gICAgbGFiZWxLZXk6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9NYW51YWxcIixcbiAgICBmYWxsYmFjazogXCJULkMuIE1hbnVhbFwiLFxuICB9LFxufTtcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfTU9ERV9DT0RFUzogRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDb2RlW10gPSBbMCwgMV07XG5cbi8vIEtlZXBzIGV4Y2hhbmdlIHJhdGUgbW9kZSB2YWx1ZXMgY29uc3RyYWluZWQgdG8gbnVtZXJpYyAwIG9yIDEuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGUgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHBhcnNlZCA9PT0gMCB8fCBwYXJzZWQgPT09IDEpIHtcbiAgICByZXR1cm4gcGFyc2VkO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuLy8gQnVpbGRzIGZpeGVkIG9wdGlvbnMgZm9yIHRoZSBleGNoYW5nZSByYXRlIG1vZGUgZmlsdGVyLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlT3B0aW9ucyA9ICgpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xuICByZXR1cm4gRVhDSEFOR0VfUkFURV9NT0RFX0NPREVTXG4gICAgLm1hcCgoY29kZSkgPT4ge1xuICAgICAgY29uc3QgbWV0YSA9IEVYQ0hBTkdFX1JBVEVfTU9ERV9NRVRBW2NvZGVdO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IFN0cmluZyhjb2RlKSxcbiAgICAgICAgdGV4dDogaW5kVChtZXRhLmxhYmVsS2V5LCBtZXRhLmZhbGxiYWNrKSxcbiAgICAgIH07XG4gICAgfSk7XG59O1xuXG4vLyBSZXR1cm5zIGEgbG9jYWxpemVkIG1vZGUgbGFiZWwgb3IgZW1wdHkgdGV4dCBmb3Igbm9uLXNlbGVjdGVkIHZhbHVlcy5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlKHZhbHVlKTtcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IG51bGwpIHJldHVybiBcIlwiO1xuICBjb25zdCBtZXRhID0gRVhDSEFOR0VfUkFURV9NT0RFX01FVEFbbm9ybWFsaXplZF07XG4gIHJldHVybiBpbmRUKG1ldGEubGFiZWxLZXksIG1ldGEuZmFsbGJhY2spO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUFvRDs7O0FDeUUxQztBQW5DVixJQUFNLHlCQUF5QixDQUFDO0FBQUEsRUFDOUI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBbUM7QUFDakMsUUFBTSxvQkFDSixhQUFhLDRCQUE0QixNQUFNLDRCQUE0QjtBQUU3RSxTQUNFLDRDQUFDLGFBQVEsV0FBVSxvRkFDakIsdURBQUMsU0FBSSxXQUFVLHlDQUNaO0FBQUEsS0FBQyxlQUNBLDRDQUFDLGdDQUFxQixPQUFPLEtBQUssK0JBQStCLFVBQVUsR0FBRyxPQUFPLFNBQVMsT0FBTyxZQUFZLEtBQUssS0FBSyxJQUN6SDtBQUFBLElBQ0gsWUFDQyw2Q0FBQyxTQUFJLFdBQVUsNkJBQ2I7QUFBQSxrREFBQyxXQUFNLFdBQVUsNEJBQTRCLGVBQUssbUNBQW1DLGFBQWEsR0FBRTtBQUFBLE1BQ3BH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QzFCLHdCQUF3QjtBQUFBLFFBQ3hCLDJCQUEyQjtBQUFBLFFBQzNCLDJCQUEyQjtBQUFBO0FBQUEsSUFDN0IsSUFDRTtBQUFBLElBRUgsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsZUFDL0I7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQSxjQUFjLFNBQVMsUUFBUSxZQUFZO0FBQUEsUUFDM0M7QUFBQSxRQUNBO0FBQUEsUUFDQSxZQUFZLEtBQUssdUJBQXVCLE9BQU87QUFBQSxRQUMvQyxXQUFXLEtBQUsseUJBQXlCLGtDQUFrQztBQUFBLFFBQzNFO0FBQUEsUUFDQSxjQUFjO0FBQUEsUUFDZCxrQkFBa0I7QUFBQSxRQUNsQixZQUFZO0FBQUE7QUFBQSxJQUNkLElBQ0U7QUFBQSxJQUVILG9CQUFvQixDQUFDLGVBQ3BCO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFNO0FBQUEsUUFDTixXQUFXLEtBQUssaUJBQWlCLFFBQVE7QUFBQSxRQUN6QyxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUE7QUFBQSxJQUNYLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLHlCQUF5QixNQUFNO0FBQ25DLFNBQ0UsNkNBQUMsZ0NBQ0MsdURBQUMsaUNBQThCLEdBQ2pDO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSwyQkFBMkI7QUFDbEUsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQywwQkFBdUIsQ0FBRTtBQUNyRDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8saUNBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAicGF5bG9hZCIsICJyZXNwb25zZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
