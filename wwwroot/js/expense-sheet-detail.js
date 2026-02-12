import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseProjectFilterInput_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-SPX7OF4P.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-TJCFPVBB.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-SLMYNQP5.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-4POUG5VJ.js";
import "./chunks/chunk-K7MECJ5E.js";
import {
  clearExpenseNavigationGuard,
  createExpenseSheet,
  deleteExpenseSheet,
  fetchExpenseSheetDetail,
  formatAmountWithCurrency,
  formatExpenseDateParts,
  hasAssignedVoucher,
  navigateToExpenseUrl,
  safeText,
  setExpenseNavigationGuard,
  updateExpenseSheetHeader
} from "./chunks/chunk-CHD5EVDL.js";
import {
  VisitasPageProviders_default
} from "./chunks/chunk-WPRFFVHK.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-3H4F5G6V.js";
import {
  ApiFetchError,
  canAccess,
  indT,
  showPermissionModal
} from "./chunks/chunk-FICWEV5U.js";
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
  showExchangeRate,
  exchangeRateValue,
  exchangeRateValidationMessage,
  totalAmountText,
  draftDescription,
  draftProjectId,
  draftCurrencyCode,
  draftExchangeRate,
  onDraftDescriptionChange,
  onDraftProjectIdChange,
  onDraftCurrencyCodeChange,
  onDraftExchangeRateChange
}) => {
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
    isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ExpenseCurrencyFilterSelect_default,
      {
        label: indT("ExpenseSheets_Field_Currency", "Currency"),
        placeholder: indT("ExpenseSheets_Filter_Currency_Placeholder", "Currency code"),
        value: draftCurrencyCode,
        onChange: onDraftCurrencyCodeChange,
        disabled: !isEditing || isCurrencyLockedByLines,
        readOnly: !isEditing || isCurrencyLockedByLines,
        idBase: "expense-header-currency"
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Currency", "Currency"), value: safeText(header.currencyCode) || "-" }),
    isEditing ? normalizedDraftCurrency !== "EUR" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
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
      ),
      exchangeRateValidationMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-danger text-sm", children: exchangeRateValidationMessage }) : null
    ] }) : null : showExchangeRate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate"), value: exchangeRateValue }) : null,
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
  draftProjectId,
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
    const requiresExchangeRate = normalizedCurrency !== "" && normalizedCurrency !== "EUR";
    const parsedExchangeRate = normalizeExchangeRate(normalizedExchangeRateRaw);
    const hasValidRate = parsedExchangeRate != null && parsedExchangeRate > 0;
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
        "Exchange rate is required when currency is different from EUR."
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
            existingHojaGastosId: null,
            description: normalizedDescription,
            currencyCode: normalizedCurrency,
            exchRate: hasValidRate ? Number(parsedExchangeRate) : 1,
            projId: normalizedProjectId || null,
            lines: []
          };
          const response2 = await createExpenseSheet(payload2);
          if (!response2.success) {
            throw new Error(response2.message || indT("Api_RequestFailed", "Request failed."));
          }
          const createdSheetId = String(response2?.data?.hojaGastosId || response2?.data?.HojaGastosId || "").trim();
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
          projId: String(draftProjectId || "").trim() || null
        };
        const response = await updateExpenseSheetHeader(sheetId, payload);
        if (!response.success) {
          throw new Error(response.message || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
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
    draftProjectId,
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
        if (!response.success) {
          throw new Error(response.message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
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
var buildCreateHeaderDraft = () => {
  return {
    hojaGastosId: "",
    description: "",
    projId: "",
    voucher: "",
    currencyCode: "",
    totalAmountMST: null,
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
        if (response?.success === false || !response?.data) {
          setErrorMessage(response?.message || indT("ExpenseSheets_LoadError", "Could not load expense sheet detail."));
          setHeader(null);
          setLines([]);
          return;
        }
        const nextHeader = response.data.header || null;
        const nextLines = Array.isArray(response.data.lines) ? response.data.lines : [];
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
  const exchangeRateRequired = isEditing && normalizedDraftCurrency !== "" && normalizedDraftCurrency !== "EUR";
  const exchangeRateValidationMessage = exchangeRateRequired && !draftExchangeRate.trim() ? indT(
    "ExpenseSheets_Validation_ExchangeRateRequired",
    "Exchange rate is required when currency is different from EUR."
  ) : "";
  const isCurrencyLockedByLines = isEditing && hasLines;
  const isExchangeRateLockedByLines = isEditing && hasLines && showExchangeRate;
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
    projectValue,
    voucherValue,
    isSheetPaid,
    exchangeRateValue,
    showExchangeRate,
    normalizedDraftCurrency,
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
    projectValue,
    voucherValue,
    isSheetPaid,
    exchangeRateValue,
    showExchangeRate,
    normalizedDraftCurrency,
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
    () => formatAmountWithCurrency(header?.totalAmountMST ?? null, safeText(header?.currencyCode)),
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
    draftProjectId,
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
        showExchangeRate,
        exchangeRateValue,
        exchangeRateValidationMessage,
        totalAmountText,
        draftDescription,
        draftProjectId,
        draftCurrencyCode,
        draftExchangeRate,
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
  const rootEl = document.getElementById("expense-sheet-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseSheetDetailPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseSheetDetailPage_default = ExpenseSheetDetailPage;
export {
  ExpenseSheetDetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlTGluZXNUaW1lbGluZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0TGluZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IEV4cGVuc2VTaGVldEhlYWRlckZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0SGVhZGVyRm9ybS50c3hcIjtcbmltcG9ydCBFeHBlbnNlTGluZXNUaW1lbGluZSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlTGluZXNUaW1lbGluZS50c3hcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlLnRzXCI7XG5cbmNvbnN0IExJTkVTX1BBR0VfU0laRSA9IDY7XG5cbmNvbnN0IHBhZ2VkU2xpY2UgPSA8VCw+KGl0ZW1zOiBUW10sIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcik6IFRbXSA9PiB7XG4gIGlmICghaXRlbXMubGVuZ3RoKSByZXR1cm4gW107XG4gIGNvbnN0IHNhZmVQYWdlID0gTWF0aC5tYXgoMSwgcGFnZSk7XG4gIGNvbnN0IHN0YXJ0ID0gKHNhZmVQYWdlIC0gMSkgKiBwYWdlU2l6ZTtcbiAgcmV0dXJuIGl0ZW1zLnNsaWNlKHN0YXJ0LCBzdGFydCArIHBhZ2VTaXplKTtcbn07XG5cbmNvbnN0IEV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250ZW50ID0gKCkgPT4ge1xuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIlZpZXdcIik7XG4gIGNvbnN0IGNhbkVkaXRFeHBlbnNlID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJFZGl0XCIpO1xuICBjb25zdCBjYW5EZWxldGVFeHBlbnNlID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJGdWxsQWNjZXNzXCIpO1xuICBjb25zdCBjYW5DcmVhdGVFeHBlbnNlID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJBZGRcIik7XG4gIGNvbnN0IHNoZWV0SWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX0lEX18pO1xuICBjb25zdCBzaGVldE1vZGUgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX01PREVfXykudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgaXNDcmVhdGVNb2RlID0gc2hlZXRNb2RlID09PSBcImNyZWF0ZVwiO1xuICBjb25zdCBsaW5lQ29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGNyZWF0ZWRTaGVldElkUmVmID0gdXNlUmVmKFwiXCIpO1xuXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxuICAgICgpID0+ICh7XG4gICAgICBmaXJzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9GaXJzdFwiLCBcIkZpcnN0XCIpLFxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXG4gICAgICBuZXh0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpLFxuICAgICAgbGFzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKSxcbiAgICB9KSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IHtcbiAgICBoZWFkZXIsXG4gICAgbGluZXMsXG4gICAgbGluZVBhZ2UsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBidXN5LFxuICAgIHN0YXR1cyxcbiAgICBpc0VkaXRpbmcsXG4gICAgbW9kYWxFcnJvcixcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0UHJvamVjdElkLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICAgIHByb2plY3RWYWx1ZSxcbiAgICB2b3VjaGVyVmFsdWUsXG4gICAgaXNTaGVldFBhaWQsXG4gICAgZXhjaGFuZ2VSYXRlVmFsdWUsXG4gICAgc2hvd0V4Y2hhbmdlUmF0ZSxcbiAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcbiAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSxcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXG4gICAgc2V0TGluZVBhZ2UsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNFZGl0aW5nLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcbiAgICBzZXREcmFmdFByb2plY3RJZCxcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLFxuICAgIG5hdmlnYXRlVG9DcmVhdGVkU2hlZXQsXG4gICAgbmF2aWdhdGVUb0xpbmVEZXRhaWwsXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZSh7XG4gICAgaGFzQWNjZXNzLFxuICAgIGNhbkNyZWF0ZUV4cGVuc2UsXG4gICAgY2FuRWRpdEV4cGVuc2UsXG4gICAgc2hlZXRJZCxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxuICB9KTtcblxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcbiAgICAgIGJ1c3ksXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XG4gICAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcbiAgICAgICAgc2V0U3RhdHVzKG1zZyk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9LCBbYnVzeSwgaGFuZGxlQ29uZmlybV0pO1xuXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpO1xuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxuICAgIDogKCFidXN5ICYmIG1vZGFsRXJyb3IgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIikgOiAobW9kYWwuY29uZmlybVRleHQgfHwgaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIikpKTtcblxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBoYW5kbGVNb2RhbENvbmZpcm0oKTtcbiAgfSwgW2J1c3ksIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtLCBtb2RhbEVycm9yXSk7XG5cbiAgY29uc3QgdmlzaWJsZUxpbmVzID0gdXNlTWVtbygoKSA9PiBwYWdlZFNsaWNlKGxpbmVzLCBsaW5lUGFnZSwgTElORVNfUEFHRV9TSVpFKSwgW2xpbmVQYWdlLCBsaW5lc10pO1xuICBjb25zdCB0b3RhbExpbmVQYWdlcyA9IE1hdGguY2VpbCgobGluZXMubGVuZ3RoIHx8IDApIC8gTElORVNfUEFHRV9TSVpFKTtcbiAgY29uc3QgdG90YWxBbW91bnRUZXh0ID0gdXNlTWVtbyhcbiAgICAoKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koaGVhZGVyPy50b3RhbEFtb3VudE1TVCA/PyBudWxsLCBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSkpLFxuICAgIFtoZWFkZXJdXG4gICk7XG5cbiAgY29uc3QgeyBoYW5kbGVVcGRhdGUsIGhhbmRsZURlbGV0ZSB9ID0gdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zKHtcbiAgICBidXN5LFxuICAgIGlzRWRpdGluZyxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNMb2NrZWQ6IGlzU2hlZXRQYWlkLFxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgICBsb2NrZWRDdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcbiAgICBsb2NrZWRFeGNoYW5nZVJhdGU6IHNhZmVUZXh0KGhlYWRlcj8uZXhjaFJhdGUpLFxuICAgIGNhbkNyZWF0ZUV4cGVuc2UsXG4gICAgY2FuRWRpdEV4cGVuc2UsXG4gICAgY2FuRGVsZXRlRXhwZW5zZSxcbiAgICBzaGVldElkLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgb25DcmVhdGVTdWNjZXNzOiAoY3JlYXRlZFNoZWV0SWQpID0+IHtcbiAgICAgIGNyZWF0ZWRTaGVldElkUmVmLmN1cnJlbnQgPSBzYWZlVGV4dChjcmVhdGVkU2hlZXRJZCk7XG4gICAgfSxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgfSk7XG5cbiAgY29uc3QgaGFuZGxlU2F2ZVN1Y2Nlc3MgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldChjcmVhdGVkU2hlZXRJZFJlZi5jdXJyZW50KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIH0sIFtpc0NyZWF0ZU1vZGUsIG5hdmlnYXRlVG9DcmVhdGVkU2hlZXRdKTtcblxuICB1c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zKHtcbiAgICBidXN5LFxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcbiAgICBpc0VkaXRpbmcsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzTG9ja2VkOiBpc1NoZWV0UGFpZCxcbiAgICBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGNhbkVkaXRFeHBlbnNlLFxuICAgIGNhbkRlbGV0ZUV4cGVuc2UsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlVXBkYXRlLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgICBvblNhdmVTdWNjZXNzOiBoYW5kbGVTYXZlU3VjY2VzcyxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gIH0pO1xuXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xuICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCFsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY2FyZDtcbiAgfSwgW10pO1xuXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoe1xuICAgIGNvbnRhaW5lclJlZjogbGluZUNvbnRhaW5lclJlZixcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgaXRlbXM6IHZpc2libGVMaW5lcyxcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcbiAgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgPENvbmZpcm1Nb2RhbFxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XG4gICAgICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbENhbmNlbFRleHR9XG4gICAgICAgIGxvYWRpbmdUZXh0PXttb2RhbExvYWRpbmdUZXh0fVxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XG4gICAgICAgIGJ1c3k9e2J1c3l9XG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cbiAgICAgICAgb25Db25maXJtPXtoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm19XG4gICAgICAgIG9uQ2FuY2VsPXtjbG9zZUNvbmZpcm19XG4gICAgICAvPlxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cbiAgICAgID5cbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cbiAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtlcnJvck1lc3NhZ2UgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxuXG4gICAgICB7IWlzTG9hZGluZyAmJiAhZXJyb3JNZXNzYWdlICYmIGhlYWRlciA/IChcbiAgICAgICAgPEV4cGVuc2VTaGVldEhlYWRlckZvcm1cbiAgICAgICAgICBpc0NyZWF0ZU1vZGU9e2lzQ3JlYXRlTW9kZX1cbiAgICAgICAgICBpc0VkaXRpbmc9e2lzRWRpdGluZ31cbiAgICAgICAgICBoZWFkZXI9e2hlYWRlcn1cbiAgICAgICAgICBwcm9qZWN0VmFsdWU9e3Byb2plY3RWYWx1ZX1cbiAgICAgICAgICB2b3VjaGVyVmFsdWU9e3ZvdWNoZXJWYWx1ZX1cbiAgICAgICAgICBpc1NoZWV0UGFpZD17aXNTaGVldFBhaWR9XG4gICAgICAgICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXM9e2lzQ3VycmVuY3lMb2NrZWRCeUxpbmVzfVxuICAgICAgICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcz17aXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzfVxuICAgICAgICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5PXtub3JtYWxpemVkRHJhZnRDdXJyZW5jeX1cbiAgICAgICAgICBzaG93RXhjaGFuZ2VSYXRlPXtzaG93RXhjaGFuZ2VSYXRlfVxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZVZhbHVlPXtleGNoYW5nZVJhdGVWYWx1ZX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZT17ZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2V9XG4gICAgICAgICAgdG90YWxBbW91bnRUZXh0PXt0b3RhbEFtb3VudFRleHR9XG4gICAgICAgICAgZHJhZnREZXNjcmlwdGlvbj17ZHJhZnREZXNjcmlwdGlvbn1cbiAgICAgICAgICBkcmFmdFByb2plY3RJZD17ZHJhZnRQcm9qZWN0SWR9XG4gICAgICAgICAgZHJhZnRDdXJyZW5jeUNvZGU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxuICAgICAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlPXtkcmFmdEV4Y2hhbmdlUmF0ZX1cbiAgICAgICAgICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U9e3NldERyYWZ0RGVzY3JpcHRpb259XG4gICAgICAgICAgb25EcmFmdFByb2plY3RJZENoYW5nZT17c2V0RHJhZnRQcm9qZWN0SWR9XG4gICAgICAgICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZT17c2V0RHJhZnRDdXJyZW5jeUNvZGV9XG4gICAgICAgICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZT17c2V0RHJhZnRFeGNoYW5nZVJhdGV9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgeyFpc0NyZWF0ZU1vZGUgJiYgIWlzTG9hZGluZyAmJiAhZXJyb3JNZXNzYWdlID8gKFxuICAgICAgICA8RXhwZW5zZUxpbmVzVGltZWxpbmVcbiAgICAgICAgICB2aXNpYmxlTGluZXM9e3Zpc2libGVMaW5lc31cbiAgICAgICAgICBjdXJyZW5jeUNvZGU9e3NhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKX1cbiAgICAgICAgICB0b3RhbExpbmVQYWdlcz17dG90YWxMaW5lUGFnZXN9XG4gICAgICAgICAgbGluZVBhZ2U9e2xpbmVQYWdlfVxuICAgICAgICAgIGxpbmVzTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVzXCIsIFwiTGluZXNcIil9XG4gICAgICAgICAgZW1wdHlUZXh0PXtpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob0xpbmVzXCIsIFwiTm8gbGluZXMgZm9yIHRoaXMgZXhwZW5zZSBzaGVldC5cIil9XG4gICAgICAgICAgcGFnaW5hdGlvbkxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cbiAgICAgICAgICBjb250YWluZXJSZWY9e2xpbmVDb250YWluZXJSZWZ9XG4gICAgICAgICAgb25MaW5lUGFnZUNoYW5nZT17c2V0TGluZVBhZ2V9XG4gICAgICAgICAgb25PcGVuTGluZT17bmF2aWdhdGVUb0xpbmVEZXRhaWx9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cblxuICAgICAge2NhbkNyZWF0ZUV4cGVuc2UgJiYgIWlzQ3JlYXRlTW9kZSA/IChcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXG4gICAgICAgICAgcm91dGU9XCJcIlxuICAgICAgICAgIGFyaWFMYWJlbD17aW5kVChcIkNvbW1vbl9DcmVhdGVcIiwgXCJDcmVhdGVcIil9XG4gICAgICAgICAgc2l6ZT17NzZ9XG4gICAgICAgICAgcmlnaHQ9ezE2fVxuICAgICAgICAgIGJvdHRvbT17MjR9XG4gICAgICAgICAgb25DbGljaz17aGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxuY29uc3QgRXhwZW5zZVNoZWV0RGV0YWlsUGFnZSA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnM+XG4gICAgICA8RXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRlbnQgLz5cbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICApO1xufTtcblxuY29uc3QgbW91bnQgPSAoKSA9PiB7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS1zaGVldC1kZXRhaWwtcm9vdFwiKTtcbiAgaWYgKCFyb290RWwpIHJldHVybjtcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxFeHBlbnNlU2hlZXREZXRhaWxQYWdlIC8+KTtcbn07XG5cbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXREZXRhaWxQYWdlO1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRIZWFkZXIgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dCBmcm9tIFwiLi9FeHBlbnNlUHJvamVjdEZpbHRlcklucHV0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VSZWFkT25seUZpZWxkIGZyb20gXCIuL0V4cGVuc2VSZWFkT25seUZpZWxkLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckZvcm1Qcm9wcyA9IHtcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGhlYWRlcjogRXhwZW5zZVNoZWV0SGVhZGVyO1xuICBwcm9qZWN0VmFsdWU6IHN0cmluZztcbiAgdm91Y2hlclZhbHVlOiBzdHJpbmc7XG4gIGlzU2hlZXRQYWlkOiBib29sZWFuO1xuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xuICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeTogc3RyaW5nO1xuICBzaG93RXhjaGFuZ2VSYXRlOiBib29sZWFuO1xuICBleGNoYW5nZVJhdGVWYWx1ZTogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZTogc3RyaW5nO1xuICB0b3RhbEFtb3VudFRleHQ6IHN0cmluZztcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xuICBkcmFmdFByb2plY3RJZDogc3RyaW5nO1xuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBkcmFmdEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxuLy8gUHVyZSBwcmVzZW50YXRpb25hbCBoZWFkZXIgZm9ybSBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwvY3JlYXRlIHNjcmVlbnMuXG5jb25zdCBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtID0gKHtcbiAgaXNDcmVhdGVNb2RlLFxuICBpc0VkaXRpbmcsXG4gIGhlYWRlcixcbiAgcHJvamVjdFZhbHVlLFxuICB2b3VjaGVyVmFsdWUsXG4gIGlzU2hlZXRQYWlkLFxuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcbiAgc2hvd0V4Y2hhbmdlUmF0ZSxcbiAgZXhjaGFuZ2VSYXRlVmFsdWUsXG4gIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlLFxuICB0b3RhbEFtb3VudFRleHQsXG4gIGRyYWZ0RGVzY3JpcHRpb24sXG4gIGRyYWZ0UHJvamVjdElkLFxuICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgZHJhZnRFeGNoYW5nZVJhdGUsXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZSxcbiAgb25EcmFmdFByb2plY3RJZENoYW5nZSxcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZSxcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZSxcbn06IEV4cGVuc2VTaGVldEhlYWRlckZvcm1Qcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInJlbGF0aXZlIHNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgeyFpc0NyZWF0ZU1vZGUgPyAoXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TaGVldElkXCIsIFwiU2hlZXQgaWRcIil9IHZhbHVlPXtzYWZlVGV4dChoZWFkZXIuaG9qYUdhc3Rvc0lkKSB8fCBcIi1cIn0gLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHtpc0VkaXRpbmcgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnREZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtzYWZlVGV4dChoZWFkZXIuZGVzY3JpcHRpb24pIHx8IFwiLVwifVxuICAgICAgICAgICAgZnVsbFdpZHRoXG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICA8RXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Qcm9qZWN0X1BsYWNlaG9sZGVyXCIsIFwiUHJvamVjdCBpZFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtkcmFmdFByb2plY3RJZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0UHJvamVjdElkQ2hhbmdlfVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmd9XG4gICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cbiAgICAgICAgICAvPlxuICAgICAgICApIDogcHJvamVjdFZhbHVlID8gKFxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9IHZhbHVlPXtwcm9qZWN0VmFsdWV9IC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7IWlzRWRpdGluZyAmJiBpc1NoZWV0UGFpZCA/IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1ZvdWNoZXJcIiwgXCJWb3VjaGVyXCIpfSB2YWx1ZT17dm91Y2hlclZhbHVlIHx8IFwiLVwifSAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxuICAgICAgICAgICAgdmFsdWU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XG4gICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cbiAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nIHx8IGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzfVxuICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS1oZWFkZXItY3VycmVuY3lcIlxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfSB2YWx1ZT17c2FmZVRleHQoaGVhZGVyLmN1cnJlbmN5Q29kZSkgfHwgXCItXCJ9IC8+XG4gICAgICAgICl9XG4gICAgICAgIHtpc0VkaXRpbmcgPyAoXG4gICAgICAgICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgIT09IFwiRVVSXCIgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX08L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb3JtLWNvbnRyb2wgJHtleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSA/IFwiYm9yZGVyLWRhbmdlciByaW5nLTEgcmluZy1kYW5nZXJcIiA6IFwiXCJ9ICR7aXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwiXCJ9YH1cbiAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICBzdGVwPVwiYW55XCJcbiAgICAgICAgICAgICAgICBpbnB1dE1vZGU9XCJkZWNpbWFsXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRFeGNoYW5nZVJhdGV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX1cbiAgICAgICAgICAgICAgICByZWFkT25seT17aXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIHtleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSA/IDxwIGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyIHRleHQtc21cIj57ZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2V9PC9wPiA6IG51bGx9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogbnVsbFxuICAgICAgICApIDogc2hvd0V4Y2hhbmdlUmF0ZSA/IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4Y2hhbmdlUmF0ZVwiLCBcIkV4Y2hhbmdlIHJhdGVcIil9IHZhbHVlPXtleGNoYW5nZVJhdGVWYWx1ZX0gLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHshaXNDcmVhdGVNb2RlID8gPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Ub3RhbEFtb3VudFwiLCBcIlRvdGFsIGFtb3VudFwiKX0gdmFsdWU9e3RvdGFsQW1vdW50VGV4dH0gLz4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURhdGVQYXJ0cywgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgZnJvbSBcIi4vRXhwZW5zZVNlY3Rpb25EaXZpZGVyLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4vRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcblxudHlwZSBQYWdpbmF0aW9uTGFiZWxzID0ge1xuICBmaXJzdDogc3RyaW5nO1xuICBwcmV2OiBzdHJpbmc7XG4gIG5leHQ6IHN0cmluZztcbiAgbGFzdDogc3RyaW5nO1xufTtcblxudHlwZSBFeHBlbnNlTGluZXNUaW1lbGluZVByb3BzID0ge1xuICB2aXNpYmxlTGluZXM6IEV4cGVuc2VTaGVldExpbmVbXTtcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIHRvdGFsTGluZVBhZ2VzOiBudW1iZXI7XG4gIGxpbmVQYWdlOiBudW1iZXI7XG4gIGxpbmVzTGFiZWw6IHN0cmluZztcbiAgZW1wdHlUZXh0OiBzdHJpbmc7XG4gIHBhZ2luYXRpb25MYWJlbHM6IFBhZ2luYXRpb25MYWJlbHM7XG4gIGNvbnRhaW5lclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG4gIG9uTGluZVBhZ2VDaGFuZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XG4gIG9uT3BlbkxpbmU6IChsaW5lUmVjSWQ6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbi8vIER1bWIgdGltZWxpbmUgZm9yIGV4cGVuc2Ugc2hlZXQgbGluZXMgd2l0aCBzdGFuZGFyZCBjYXJkIGFuZCBwYWdpbmF0aW9uIGxheW91dC5cbmNvbnN0IEV4cGVuc2VMaW5lc1RpbWVsaW5lID0gKHtcbiAgdmlzaWJsZUxpbmVzLFxuICBjdXJyZW5jeUNvZGUsXG4gIHRvdGFsTGluZVBhZ2VzLFxuICBsaW5lUGFnZSxcbiAgbGluZXNMYWJlbCxcbiAgZW1wdHlUZXh0LFxuICBwYWdpbmF0aW9uTGFiZWxzLFxuICBjb250YWluZXJSZWYsXG4gIG9uTGluZVBhZ2VDaGFuZ2UsXG4gIG9uT3BlbkxpbmUsXG59OiBFeHBlbnNlTGluZXNUaW1lbGluZVByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic3BhY2UteS0wXCI+XG4gICAgICA8RXhwZW5zZVNlY3Rpb25EaXZpZGVyIGxhYmVsPXtsaW5lc0xhYmVsfSBjbGFzc05hbWU9XCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlci0tc3BhY2VkXCIgLz5cblxuICAgICAge3Zpc2libGVMaW5lcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtYm94IHRpbWVsaW5lLWVtcHR5XCIgZGF0YS1lbXB0eS10ZXh0PXtlbXB0eVRleHR9IC8+XG4gICAgICApIDogKFxuICAgICAgICA8ZGl2IHJlZj17Y29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cbiAgICAgICAgICB7dmlzaWJsZUxpbmVzLm1hcCgobGluZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmVJZCA9IHNhZmVUZXh0KGxpbmUubGluZVJlY0lkKTtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gc2FmZVRleHQobGluZS5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBjb25zdCBhbW91bnRUZXh0ID0gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGxpbmUuYW1vdW50ID8/IG51bGwsIGN1cnJlbmN5Q29kZSk7XG4gICAgICAgICAgICBjb25zdCBkYXRlUGFydHMgPSBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzKHNhZmVUZXh0KGxpbmUudHJhbnNEYXRlKSwgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCIpO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17YCR7bGluZUlkfS0ke2luZGV4fWB9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17ZGVzY3JpcHRpb24gfHwgbGluZUlkIHx8IFwiLVwifVxuICAgICAgICAgICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cbiAgICAgICAgICAgICAgICAgIG9uT3Blbj17KCkgPT4gb25PcGVuTGluZShsaW5lSWQpfVxuICAgICAgICAgICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJ0aW1lbGluZS1uYW1lIGV4cGVuc2UtbGluZS1jYXJkX190aXRsZVwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxuICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbExpbmVQYWdlc31cbiAgICAgICAgY3VycmVudFBhZ2U9e2xpbmVQYWdlfVxuICAgICAgICBvblBhZ2VDaGFuZ2U9e29uTGluZVBhZ2VDaGFuZ2V9XG4gICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cbiAgICAgIC8+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUxpbmVzVGltZWxpbmU7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24sIHBhcnNlRGVjaW1hbElucHV0IH0gZnJvbSBcIi4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XG5pbXBvcnQge1xuICBjcmVhdGVFeHBlbnNlU2hlZXQsXG4gIGRlbGV0ZUV4cGVuc2VTaGVldCxcbiAgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyLFxuICB0eXBlIEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QsXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zQXJncyA9IHtcbiAgYnVzeTogYm9vbGVhbjtcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XG4gIGlzTG9ja2VkOiBib29sZWFuO1xuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xuICBsb2NrZWRDdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgbG9ja2VkRXhjaGFuZ2VSYXRlOiBzdHJpbmc7XG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkVkaXRFeHBlbnNlOiBib29sZWFuO1xuICBjYW5EZWxldGVFeHBlbnNlOiBib29sZWFuO1xuICBzaGVldElkOiBzdHJpbmc7XG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcbiAgZHJhZnRQcm9qZWN0SWQ6IHN0cmluZztcbiAgb25DcmVhdGVTdWNjZXNzOiAoY3JlYXRlZFNoZWV0SWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG59O1xuXG5jb25zdCBub3JtYWxpemVFeGNoYW5nZVJhdGUgPSAocmF3OiBzdHJpbmcpOiBudW1iZXIgfCBudWxsID0+IHBhcnNlRGVjaW1hbElucHV0KHJhdyk7XG5cbi8vIEVuY2Fwc3VsYXRlcyB1cGRhdGUgYW5kIGRlbGV0ZSBtdXRhdGlvbnMgZm9yIGV4cGVuc2Ugc2hlZXQgaGVhZGVyIGRldGFpbC5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMgPSAoe1xuICBidXN5LFxuICBpc0VkaXRpbmcsXG4gIGlzQ3JlYXRlTW9kZSxcbiAgaXNMb2NrZWQsXG4gIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXG4gIGxvY2tlZEN1cnJlbmN5Q29kZSxcbiAgbG9ja2VkRXhjaGFuZ2VSYXRlLFxuICBjYW5DcmVhdGVFeHBlbnNlLFxuICBjYW5FZGl0RXhwZW5zZSxcbiAgY2FuRGVsZXRlRXhwZW5zZSxcbiAgc2hlZXRJZCxcbiAgZHJhZnREZXNjcmlwdGlvbixcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICBkcmFmdFByb2plY3RJZCxcbiAgb25DcmVhdGVTdWNjZXNzLFxuICBzZXRNb2RhbEVycm9yLFxuICBzZXRCdXN5LFxuICBzZXRTdGF0dXMsXG4gIHNldElzRWRpdGluZyxcbn06IFVzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9uc0FyZ3MpID0+IHtcbiAgY29uc3QgaGFuZGxlVXBkYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChidXN5IHx8ICFpc0VkaXRpbmcpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWlzQ3JlYXRlTW9kZSAmJiBpc0xvY2tlZCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgY2FuUHJvY2VlZCA9IGlzQ3JlYXRlTW9kZSA/IGNhbkNyZWF0ZUV4cGVuc2UgOiBjYW5FZGl0RXhwZW5zZTtcbiAgICBpZiAoIWNhblByb2NlZWQpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3kgPSBTdHJpbmcoXG4gICAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyA/IChsb2NrZWRDdXJyZW5jeUNvZGUgfHwgZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIikgOiAoZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIilcbiAgICApXG4gICAgICAudHJpbSgpXG4gICAgICAudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBub3JtYWxpemVkRGVzY3JpcHRpb24gPSBTdHJpbmcoZHJhZnREZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XG4gICAgY29uc3Qgbm9ybWFsaXplZFByb2plY3RJZCA9IFN0cmluZyhkcmFmdFByb2plY3RJZCB8fCBcIlwiKS50cmltKCk7XG4gICAgY29uc3Qgbm9ybWFsaXplZEV4Y2hhbmdlUmF0ZVJhdyA9IFN0cmluZyhcbiAgICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyA/IChsb2NrZWRFeGNoYW5nZVJhdGUgfHwgZHJhZnRFeGNoYW5nZVJhdGUgfHwgXCJcIikgOiAoZHJhZnRFeGNoYW5nZVJhdGUgfHwgXCJcIilcbiAgICApO1xuICAgIGNvbnN0IHJlcXVpcmVzRXhjaGFuZ2VSYXRlID0gbm9ybWFsaXplZEN1cnJlbmN5ICE9PSBcIlwiICYmIG5vcm1hbGl6ZWRDdXJyZW5jeSAhPT0gXCJFVVJcIjtcbiAgICBjb25zdCBwYXJzZWRFeGNoYW5nZVJhdGUgPSBub3JtYWxpemVFeGNoYW5nZVJhdGUobm9ybWFsaXplZEV4Y2hhbmdlUmF0ZVJhdyk7XG4gICAgY29uc3QgaGFzVmFsaWRSYXRlID0gcGFyc2VkRXhjaGFuZ2VSYXRlICE9IG51bGwgJiYgcGFyc2VkRXhjaGFuZ2VSYXRlID4gMDtcblxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgIGlmICghbm9ybWFsaXplZERlc2NyaXB0aW9uKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25NZXNzYWdlID0gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9EZXNjcmlwdGlvblJlcXVpcmVkXCIsIFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWQuXCIpO1xuICAgICAgICBzZXRNb2RhbEVycm9yKHZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICAgICAgc2V0U3RhdHVzKHZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW5jeSkge1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uTWVzc2FnZSA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fQ3VycmVuY3lSZXF1aXJlZFwiLCBcIkN1cnJlbmN5IGlzIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgc2V0TW9kYWxFcnJvcih2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICAgIHNldFN0YXR1cyh2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVxdWlyZXNFeGNoYW5nZVJhdGUgJiYgIWhhc1ZhbGlkUmF0ZSkge1xuICAgICAgY29uc3QgdmFsaWRhdGlvbk1lc3NhZ2UgPSBpbmRUKFxuICAgICAgICBcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9FeGNoYW5nZVJhdGVSZXF1aXJlZFwiLFxuICAgICAgICBcIkV4Y2hhbmdlIHJhdGUgaXMgcmVxdWlyZWQgd2hlbiBjdXJyZW5jeSBpcyBkaWZmZXJlbnQgZnJvbSBFVVIuXCJcbiAgICAgICk7XG4gICAgICBzZXRNb2RhbEVycm9yKHZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICAgIHNldFN0YXR1cyh2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XG4gICAgICBzdGFydFN0YXR1czogaXNDcmVhdGVNb2RlXG4gICAgICAgID8gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKVxuICAgICAgICA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGluZ1wiLCBcIlVwZGF0aW5nIGV4cGVuc2Ugc2hlZXQuLi5cIiksXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKSxcbiAgICAgIHNldE1vZGFsRXJyb3IsXG4gICAgICBzZXRCdXN5LFxuICAgICAgc2V0U3RhdHVzLFxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgICAgICBjb25zdCBwYXlsb2FkOiBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgbW9kZTogMSxcbiAgICAgICAgICAgIGV4aXN0aW5nSG9qYUdhc3Rvc0lkOiBudWxsLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IG5vcm1hbGl6ZWREZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGN1cnJlbmN5Q29kZTogbm9ybWFsaXplZEN1cnJlbmN5LFxuICAgICAgICAgICAgZXhjaFJhdGU6IGhhc1ZhbGlkUmF0ZSA/IE51bWJlcihwYXJzZWRFeGNoYW5nZVJhdGUpIDogMSxcbiAgICAgICAgICAgIHByb2pJZDogbm9ybWFsaXplZFByb2plY3RJZCB8fCBudWxsLFxuICAgICAgICAgICAgbGluZXM6IFtdLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNyZWF0ZUV4cGVuc2VTaGVldChwYXlsb2FkKTtcblxuICAgICAgICAgIGlmICghcmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLm1lc3NhZ2UgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBjcmVhdGVkU2hlZXRJZCA9IFN0cmluZyhyZXNwb25zZT8uZGF0YT8uaG9qYUdhc3Rvc0lkIHx8IHJlc3BvbnNlPy5kYXRhPy5Ib2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpO1xuICAgICAgICAgIGlmICghY3JlYXRlZFNoZWV0SWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG9uQ3JlYXRlU3VjY2VzcyhjcmVhdGVkU2hlZXRJZCk7XG4gICAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIikpO1xuICAgICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXlsb2FkOiBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0ID0ge1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoZHJhZnREZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXG4gICAgICAgICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVkQ3VycmVuY3ksXG4gICAgICAgICAgZXhjaFJhdGU6IGhhc1ZhbGlkUmF0ZSA/IE51bWJlcihwYXJzZWRFeGNoYW5nZVJhdGUpIDogMSxcbiAgICAgICAgICBwcm9qSWQ6IFN0cmluZyhkcmFmdFByb2plY3RJZCB8fCBcIlwiKS50cmltKCkgfHwgbnVsbCxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHVwZGF0ZUV4cGVuc2VTaGVldEhlYWRlcihzaGVldElkLCBwYXlsb2FkKTtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UubWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBzaGVldCB1cGRhdGVkXCIpKTtcbiAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcbiAgfSwgW1xuICAgIGJ1c3ksXG4gICAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgICBjYW5FZGl0RXhwZW5zZSxcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICAgIGRyYWZ0UHJvamVjdElkLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXG4gICAgaXNMb2NrZWQsXG4gICAgaXNFZGl0aW5nLFxuICAgIGxvY2tlZEN1cnJlbmN5Q29kZSxcbiAgICBsb2NrZWRFeGNoYW5nZVJhdGUsXG4gICAgb25DcmVhdGVTdWNjZXNzLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0SXNFZGl0aW5nLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0U3RhdHVzLFxuICAgIHNoZWV0SWQsXG4gIF0pO1xuXG4gIGNvbnN0IGhhbmRsZURlbGV0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChpc0xvY2tlZCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY2FuRGVsZXRlRXhwZW5zZSkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xuICAgICAgc3RhcnRTdGF0dXM6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGV4cGVuc2Ugc2hlZXQuLi5cIiksXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUVycm9yXCIsIFwiRGVsZXRlIGVycm9yLlwiKSxcbiAgICAgIHNldE1vZGFsRXJyb3IsXG4gICAgICBzZXRCdXN5LFxuICAgICAgc2V0U3RhdHVzLFxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0KHNoZWV0SWQpO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5tZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IGRlbGV0ZWRcIikpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xuICB9LCBbYnVzeSwgY2FuRGVsZXRlRXhwZW5zZSwgaXNMb2NrZWQsIHNldEJ1c3ksIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1cywgc2hlZXRJZF0pO1xuXG4gIHJldHVybiB7XG4gICAgaGFuZGxlVXBkYXRlLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMgfSBmcm9tIFwiLi4vaG9va3MvdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnNBcmdzID0ge1xuICBidXN5OiBib29sZWFuO1xuICBtb2RhbE9wZW46IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBpc0xvY2tlZDogYm9vbGVhbjtcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcbiAgb25TYXZlU3VjY2VzczogKCkgPT4gdm9pZDtcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcbiAgfSkgPT4gdm9pZDtcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gc3RhdGUgYW5kIGRpc3BhdGNoIGFjdGlvbnMgZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMgPSAoe1xuICBidXN5LFxuICBtb2RhbE9wZW4sXG4gIGlzRWRpdGluZyxcbiAgaXNDcmVhdGVNb2RlLFxuICBpc0xvY2tlZCxcbiAgY2FuRWRpdEV4cGVuc2UsXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXG4gIGNhbkRlbGV0ZUV4cGVuc2UsXG4gIHNldE1vZGFsRXJyb3IsXG4gIGhhbmRsZUVuYWJsZUVkaXQsXG4gIGhhbmRsZUNhbmNlbEVkaXQsXG4gIGhhbmRsZVVwZGF0ZSxcbiAgaGFuZGxlRGVsZXRlLFxuICBvblNhdmVTdWNjZXNzLFxuICBvcGVuQ29uZmlybSxcbiAgY2xvc2VDb25maXJtLFxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcbiAgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zKHtcbiAgICBpZHM6IHtcbiAgICAgIGVkaXRJY29uSWQ6IFwiZXhwZW5zZUVkaXRJY29uXCIsXG4gICAgICBzYXZlSWNvbklkOiBcImV4cGVuc2VTYXZlSWNvblwiLFxuICAgICAgZGVsZXRlQnRuSWQ6IFwiZXhwZW5zZURlbGV0ZUJ0blwiLFxuICAgICAgY2FuY2VsQnRuSWQ6IFwiZXhwZW5zZUNhbmNlbEJ0blwiLFxuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICBlZGl0RXZlbnQ6IFwiZXhwZW5zZS1kZXRhaWwtZWRpdFwiLFxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS1kZXRhaWwtZGVsZXRlXCIsXG4gICAgICBjYW5jZWxFdmVudDogXCJleHBlbnNlLWRldGFpbC1jYW5jZWwtZWRpdFwiLFxuICAgIH0sXG4gICAgYnVzeSxcbiAgICBtb2RhbE9wZW4sXG4gICAgaXNFZGl0aW5nLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBpc0xvY2tlZCxcbiAgICBhbGxvd0NyZWF0ZU1vZGVBY3Rpb25zV2hlbkxvY2tlZDogdHJ1ZSxcbiAgICBjYW5DcmVhdGU6IGNhbkNyZWF0ZUV4cGVuc2UsXG4gICAgY2FuRWRpdDogY2FuRWRpdEV4cGVuc2UsXG4gICAgY2FuRGVsZXRlOiBjYW5EZWxldGVFeHBlbnNlLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZVNhdmU6IGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gICAgc2F2ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiU2F2ZSBjaGFuZ2VzXCIpLFxuICAgIHNhdmVDb25maXJtTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBzYXZlIGNoYW5nZXM/XCIpLFxuICAgIHNhdmVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSxcbiAgICBkZWxldGVDb25maXJtVGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVTaGVldF9UaXRsZVwiLCBcIkRlbGV0ZSBleHBlbnNlIHNoZWV0XCIpLFxuICAgIGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlU2hlZXRfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGV4cGVuc2Ugc2hlZXQ/XCIpLFxuICAgIGRlbGV0ZUNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKSxcbiAgICBvblNhdmVTdWNjZXNzLFxuICAgIG9uRGVsZXRlU3VjY2VzczogKCkgPT4ge1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldHNcIik7XG4gICAgfSxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gIH0pO1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVNoZWV0SGVhZGVyLFxuICBFeHBlbnNlU2hlZXRMaW5lLFxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldERldGFpbCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQge1xuICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXG4gIG5hdmlnYXRlVG9FeHBlbnNlVXJsLFxuICBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLFxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcbmltcG9ydCB7IGhhc0Fzc2lnbmVkVm91Y2hlciwgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcblxuY29uc3QgYnVpbGRDcmVhdGVIZWFkZXJEcmFmdCA9ICgpOiBFeHBlbnNlU2hlZXRIZWFkZXIgPT4ge1xuICByZXR1cm4ge1xuICAgIGhvamFHYXN0b3NJZDogXCJcIixcbiAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICBwcm9qSWQ6IFwiXCIsXG4gICAgdm91Y2hlcjogXCJcIixcbiAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXG4gICAgdG90YWxBbW91bnRNU1Q6IG51bGwsXG4gICAgZXhjaFJhdGU6IFwiMVwiLFxuICB9O1xufTtcblxuY29uc3Qgc2hvdWxkU2hvd0V4Y2hhbmdlUmF0ZSA9ICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIGlmICghdmFsdWUpIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBub3JtYWxpemVkID0gdmFsdWUucmVwbGFjZSgvXFxzKy9nLCBcIlwiKS5yZXBsYWNlKFwiLFwiLCBcIi5cIik7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcihub3JtYWxpemVkKTtcbiAgaWYgKE51bWJlci5pc0Zpbml0ZShwYXJzZWQpKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKHBhcnNlZCkgPiAwO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG50eXBlIFVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlQXJncyA9IHtcbiAgaGFzQWNjZXNzOiBib29sZWFuO1xuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xuICBjYW5FZGl0RXhwZW5zZTogYm9vbGVhbjtcbiAgc2hlZXRJZDogc3RyaW5nO1xuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gT3ducyBzdGF0ZSBhbmQgYmVoYXZpb3IgZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsIHBhZ2UgKHJlYWQsIGVkaXQsIGNyZWF0ZSkuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUgPSAoe1xuICBoYXNBY2Nlc3MsXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXG4gIGNhbkVkaXRFeHBlbnNlLFxuICBzaGVldElkLFxuICBpc0NyZWF0ZU1vZGUsXG4gIG9uRm9yYmlkZGVuLFxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGVBcmdzKSA9PiB7XG4gIGNvbnN0IFtoZWFkZXIsIHNldEhlYWRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRIZWFkZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2xpbmVzLCBzZXRMaW5lc10gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRMaW5lW10+KFtdKTtcbiAgY29uc3QgW2xpbmVQYWdlLCBzZXRMaW5lUGFnZV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2lzRWRpdGluZywgc2V0SXNFZGl0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW21vZGFsRXJyb3IsIHNldE1vZGFsRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdERlc2NyaXB0aW9uLCBzZXREcmFmdERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRQcm9qZWN0SWQsIHNldERyYWZ0UHJvamVjdElkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRDdXJyZW5jeUNvZGUsIHNldERyYWZ0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRFeGNoYW5nZVJhdGUsIHNldERyYWZ0RXhjaGFuZ2VSYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIGNvbnN0IGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIgPSB1c2VDYWxsYmFjaygobmV4dEhlYWRlcjogRXhwZW5zZVNoZWV0SGVhZGVyIHwgbnVsbCkgPT4ge1xuICAgIHNldERyYWZ0RGVzY3JpcHRpb24oc2FmZVRleHQobmV4dEhlYWRlcj8uZGVzY3JpcHRpb24pKTtcbiAgICBzZXREcmFmdFByb2plY3RJZChzYWZlVGV4dChuZXh0SGVhZGVyPy5wcm9qSWQpKTtcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZShzYWZlVGV4dChuZXh0SGVhZGVyPy5jdXJyZW5jeUNvZGUpKTtcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShzYWZlVGV4dChuZXh0SGVhZGVyPy5leGNoUmF0ZSkpO1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBsb2FkRGV0YWlsID0gYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCFoYXNBY2Nlc3MpIHtcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSkge1xuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZHJhZnRIZWFkZXIgPSBidWlsZENyZWF0ZUhlYWRlckRyYWZ0KCk7XG4gICAgICAgIHNldEhlYWRlcihkcmFmdEhlYWRlcik7XG4gICAgICAgIHNldExpbmVzKFtdKTtcbiAgICAgICAgc2V0TGluZVBhZ2UoMSk7XG4gICAgICAgIHNldElzRWRpdGluZyh0cnVlKTtcbiAgICAgICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihkcmFmdEhlYWRlcik7XG4gICAgICAgIHNldFN0YXR1cyhcIlwiKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghc2hlZXRJZCkge1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IHdhcyBub3QgZm91bmQuXCIpKTtcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICBzZXRMaW5lcyhbXSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKHNoZWV0SWQsIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlPy5zdWNjZXNzID09PSBmYWxzZSB8fCAhcmVzcG9uc2U/LmRhdGEpIHtcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lm1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpKTtcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgICAgc2V0TGluZXMoW10pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5leHRIZWFkZXIgPSByZXNwb25zZS5kYXRhLmhlYWRlciB8fCBudWxsO1xuICAgICAgICBjb25zdCBuZXh0TGluZXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlLmRhdGEubGluZXMpID8gcmVzcG9uc2UuZGF0YS5saW5lcyA6IFtdO1xuICAgICAgICBzZXRIZWFkZXIobmV4dEhlYWRlcik7XG4gICAgICAgIHNldExpbmVzKG5leHRMaW5lcyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoXG4gICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0IGRldGFpbC5cIilcbiAgICAgICAgKTtcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICBzZXRMaW5lcyhbXSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2b2lkIGxvYWREZXRhaWwoKTtcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2UsIGhhc0FjY2VzcywgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNDcmVhdGVNb2RlLCBvbkZvcmJpZGRlbiwgc2hlZXRJZF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFoZWFkZXIgfHwgaXNFZGl0aW5nKSByZXR1cm47XG4gICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihoZWFkZXIpO1xuICB9LCBbaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyLCBpc0VkaXRpbmddKTtcblxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbygoKSA9PiBidXN5IHx8IGlzRWRpdGluZywgW2J1c3ksIGlzRWRpdGluZ10pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoaGFzQWN0aXZlUHJvY2Vzcyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCgpO1xuICAgIH07XG4gIH0sIFtoYXNBY3RpdmVQcm9jZXNzXSk7XG5cbiAgY29uc3QgcHJvamVjdFZhbHVlID0gc2FmZVRleHQoaGVhZGVyPy5wcm9qSWQpO1xuICBjb25zdCB2b3VjaGVyVmFsdWUgPSBzYWZlVGV4dChoZWFkZXI/LnZvdWNoZXIpO1xuICBjb25zdCBpc1NoZWV0UGFpZCA9IGhhc0Fzc2lnbmVkVm91Y2hlcih2b3VjaGVyVmFsdWUpO1xuICBjb25zdCBoYXNMaW5lcyA9IGxpbmVzLmxlbmd0aCA+IDA7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZVZhbHVlID0gc2FmZVRleHQoaGVhZGVyPy5leGNoUmF0ZSk7XG4gIGNvbnN0IHNob3dFeGNoYW5nZVJhdGUgPSB1c2VNZW1vKCgpID0+IHNob3VsZFNob3dFeGNoYW5nZVJhdGUoZXhjaGFuZ2VSYXRlVmFsdWUpLCBbZXhjaGFuZ2VSYXRlVmFsdWVdKTtcbiAgY29uc3Qgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgPSB1c2VNZW1vKCgpID0+IGRyYWZ0Q3VycmVuY3lDb2RlLnRyaW0oKS50b1VwcGVyQ2FzZSgpLCBbZHJhZnRDdXJyZW5jeUNvZGVdKTtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlUmVxdWlyZWQgPSBpc0VkaXRpbmcgJiYgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgIT09IFwiXCIgJiYgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgIT09IFwiRVVSXCI7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlID1cbiAgICBleGNoYW5nZVJhdGVSZXF1aXJlZCAmJiAhZHJhZnRFeGNoYW5nZVJhdGUudHJpbSgpXG4gICAgICA/IGluZFQoXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fRXhjaGFuZ2VSYXRlUmVxdWlyZWRcIixcbiAgICAgICAgICBcIkV4Y2hhbmdlIHJhdGUgaXMgcmVxdWlyZWQgd2hlbiBjdXJyZW5jeSBpcyBkaWZmZXJlbnQgZnJvbSBFVVIuXCJcbiAgICAgICAgKVxuICAgICAgOiBcIlwiO1xuICBjb25zdCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyA9IGlzRWRpdGluZyAmJiBoYXNMaW5lcztcbiAgY29uc3QgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzID0gaXNFZGl0aW5nICYmIGhhc0xpbmVzICYmIHNob3dFeGNoYW5nZVJhdGU7XG5cbiAgY29uc3QgaGFuZGxlRW5hYmxlRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoaXNDcmVhdGVNb2RlIHx8IGlzTG9hZGluZyB8fCAhaGVhZGVyIHx8IGlzU2hlZXRQYWlkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFjYW5FZGl0RXhwZW5zZSkge1xuICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIHNldElzRWRpdGluZyh0cnVlKTtcbiAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGhlYWRlcik7XG4gICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9FZGl0aW5nRW5hYmxlZFwiLCBcIkVkaXRpbmcgZW5hYmxlZFwiKSk7XG4gIH0sIFtjYW5FZGl0RXhwZW5zZSwgaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyLCBpc0NyZWF0ZU1vZGUsIGlzTG9hZGluZywgaXNTaGVldFBhaWQsIG9uRm9yYmlkZGVuXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvRXhwZW5zZVNoZWV0c1wiLCB7XG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghaXNFZGl0aW5nKSByZXR1cm47XG5cbiAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihoZWFkZXIpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKSk7XG4gIH0sIFtoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nXSk7XG5cbiAgLy8gT3BlbnMgZXhwZW5zZSBzaGVldCBjcmVhdGUgbW9kZSBmcm9tIGxpc3QtbGV2ZWwgZW50cnkgcG9pbnRzLlxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlU2hlZXRNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSkge1xuICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9tb2RlPWNyZWF0ZVwiLCB7XG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcbiAgICB9KTtcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2UsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nLCBvbkZvcmJpZGRlbl0pO1xuXG4gIC8vIE9wZW5zIGV4cGVuc2UgbGluZSBjcmVhdGUgbW9kZSBmcm9tIGFuIGV4aXN0aW5nIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlIHx8ICFzaGVldElkKSB7XG4gICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXRMaW5lRGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzaGVldElkKX0mbW9kZT1jcmVhdGVgO1xuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXG4gICAgfSk7XG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcblxuICBjb25zdCBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0ID0gdXNlQ2FsbGJhY2soKGNyZWF0ZWRTaGVldElkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBzYWZlQ3JlYXRlZFNoZWV0SWQgPSBzYWZlVGV4dChjcmVhdGVkU2hlZXRJZCk7XG4gICAgaWYgKCFzYWZlQ3JlYXRlZFNoZWV0SWQpIHJldHVybjtcblxuICAgIGNvbnN0IHRhcmdldFVybCA9IGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZUNyZWF0ZWRTaGVldElkKX1gO1xuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBuYXZpZ2F0ZVRvTGluZURldGFpbCA9IHVzZUNhbGxiYWNrKFxuICAgIChsaW5lUmVjSWQ6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3Qgc2FmZUxpbmVJZCA9IHNhZmVUZXh0KGxpbmVSZWNJZCk7XG4gICAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHNoZWV0SWQpO1xuICAgICAgaWYgKCFzYWZlTGluZUlkIHx8ICFzYWZlU2hlZXRJZCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXRMaW5lRGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlU2hlZXRJZCl9JmxpbmVSZWNJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlTGluZUlkKX1gO1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsLCB7XG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW3NoZWV0SWRdXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBoZWFkZXIsXG4gICAgbGluZXMsXG4gICAgbGluZVBhZ2UsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBidXN5LFxuICAgIHN0YXR1cyxcbiAgICBpc0VkaXRpbmcsXG4gICAgbW9kYWxFcnJvcixcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0UHJvamVjdElkLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICAgIHByb2plY3RWYWx1ZSxcbiAgICB2b3VjaGVyVmFsdWUsXG4gICAgaXNTaGVldFBhaWQsXG4gICAgZXhjaGFuZ2VSYXRlVmFsdWUsXG4gICAgc2hvd0V4Y2hhbmdlUmF0ZSxcbiAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcbiAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSxcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXG4gICAgc2V0TGluZVBhZ2UsXG4gICAgc2V0TGluZXMsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNFZGl0aW5nLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcbiAgICBzZXREcmFmdFByb2plY3RJZCxcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlT3BlbkNyZWF0ZVNoZWV0TW9kZSxcbiAgICBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsXG4gICAgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldCxcbiAgICBuYXZpZ2F0ZVRvTGluZURldGFpbCxcbiAgfTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQW9EOzs7QUM0RDFDO0FBM0JWLElBQU0seUJBQXlCLENBQUM7QUFBQSxFQUM5QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBbUM7QUFDakMsU0FDRSw0Q0FBQyxhQUFRLFdBQVUsb0ZBQ2pCLHVEQUFDLFNBQUksV0FBVSx5Q0FDWjtBQUFBLEtBQUMsZUFDQSw0Q0FBQyxnQ0FBcUIsT0FBTyxLQUFLLCtCQUErQixVQUFVLEdBQUcsT0FBTyxTQUFTLE9BQU8sWUFBWSxLQUFLLEtBQUssSUFDekg7QUFBQSxJQUNILFlBQ0MsNkNBQUMsU0FBSSxXQUFVLDZCQUNiO0FBQUEsa0RBQUMsV0FBTSxXQUFVLDRCQUE0QixlQUFLLG1DQUFtQyxhQUFhLEdBQUU7QUFBQSxNQUNwRztBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsV0FBVTtBQUFBLFVBQ1YsT0FBTztBQUFBLFVBQ1AsVUFBVSxDQUFDLFVBQVUseUJBQXlCLE1BQU0sT0FBTyxTQUFTLEVBQUU7QUFBQSxVQUN0RSxjQUFZLEtBQUssbUNBQW1DLGFBQWE7QUFBQTtBQUFBLE1BQ25FO0FBQUEsT0FDRixJQUVBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFPLEtBQUssbUNBQW1DLGFB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RTtBQUFBLElBRUgsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsZUFDL0I7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQSxjQUFjLFNBQVMsUUFBUSxZQUFZO0FBQUEsUUFDM0M7QUFBQSxRQUNBO0FBQUEsUUFDQSxZQUFZLEtBQUssdUJBQXVCLE9BQU87QUFBQSxRQUMvQyxXQUFXLEtBQUsseUJBQXlCLGtDQUFrQztBQUFBLFFBQzNFO0FBQUEsUUFDQSxjQUFjO0FBQUEsUUFDZCxrQkFBa0I7QUFBQSxRQUNsQixZQUFZO0FBQUE7QUFBQSxJQUNkLElBQ0U7QUFBQSxJQUVILG9CQUFvQixDQUFDLGVBQ3BCO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFNO0FBQUEsUUFDTixXQUFXLEtBQUssaUJBQWlCLFFBQVE7QUFBQSxRQUN6QyxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUE7QUFBQSxJQUNYLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLHlCQUF5QixNQUFNO0FBQ25DLFNBQ0UsNkNBQUMsZ0NBQ0MsdURBQUMsaUNBQThCLEdBQ2pDO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQixRQUFNLFNBQVMsU0FBUyxlQUFlLDJCQUEyQjtBQUNsRSxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLDBCQUF1QixDQUFFO0FBQ3JEO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxpQ0FBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJwYXlsb2FkIiwgInJlc3BvbnNlIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
