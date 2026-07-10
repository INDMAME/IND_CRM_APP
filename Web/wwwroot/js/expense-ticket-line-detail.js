import {
  clearExpenseTicketSheetSyncState,
  readExpenseTicketSheetSyncState,
  saveExpenseTicketSheetSyncState,
  syncExpenseLinkedTicketSheetLine
} from "./chunks/chunk-V4UK6QOF.js";
import {
  mapExpenseTicketDetailHeader,
  mapExpenseTicketDetailLine
} from "./chunks/chunk-P4AXZIYH.js";
import {
  resolveExpenseSheetEditAccess,
  useExpenseTicketLinkSheetGate
} from "./chunks/chunk-HTWIUBNH.js";
import "./chunks/chunk-2H26NNTY.js";
import {
  ExpenseReadOnlyField_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-74756UZW.js";
import "./chunks/chunk-4BE3ZFCK.js";
import {
  appendExpenseTicketReturnQuery,
  normalizeExpenseTicketReturnContext,
  resolveExpenseTicketReturnContext,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-COCWZQGI.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-SMHFZFDC.js";
import "./chunks/chunk-CBDB7NMA.js";
import {
  clearExpenseNavigationGuard,
  formatAmountWithCurrency,
  formatExpenseInputNumber,
  formatExpenseNumber,
  isManagingOtherExpenseUser,
  navigateToExpenseUrl,
  reloadExpensePage,
  setExpenseNavigationGuard
} from "./chunks/chunk-DDCTTA2H.js";
import {
  configureExpenseApiAuth,
  createExpenseSheetTicketLine,
  deleteExpenseSheetTicketLine,
  fetchExpenseSheetTicket,
  isValidTicketLineAmount,
  resolveTicketLineAmount,
  safeText,
  updateExpenseSheetTicketLine
} from "./chunks/chunk-63PNSQ5Z.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-4B23OARV.js";
import "./chunks/chunk-UYN2TXUI.js";
import "./chunks/chunk-ZBKHPZJX.js";
import "./chunks/chunk-DY2B5JHI.js";
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

// Web/wwwroot/react/src/pages/gastos/tickets/line/ExpenseTicketLineDetailPage.tsx
var import_react3 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/components/ExpenseTicketLineDetailForm.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var formatQtyValue = (value) => {
  return formatExpenseNumber(value, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
    fallback: "-"
  });
};
var ExpenseTicketLineDetailForm = ({
  header,
  line,
  isEditing,
  draftDescription,
  draftQty,
  draftPrice,
  priceText,
  amountText,
  onDraftDescriptionChange,
  onDraftQtyChange,
  onDraftPriceChange
}) => {
  const quantityField = isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_Qty", "Quantity") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "input",
      {
        className: "form-control text-right tabular-nums",
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
      value: formatQtyValue(line?.qty ?? null),
      valueAlign: "right"
    }
  );
  const priceField = isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_Price", "Price") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "input",
      {
        className: "form-control text-right tabular-nums",
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
        "aria-label": indT("ExpenseSheets_Field_Price", "Price")
      }
    )
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ExpenseReadOnlyField_default,
    {
      label: indT("ExpenseSheets_Field_Price", "Price"),
      value: priceText || "-",
      valueAlign: "right"
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "space-y-0", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-[#e2e8f0] rounded-[var(--radius-xl)]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ExpenseReadOnlyField_default,
      {
        label: indT("Tickets_Field_FileId", "Ticket Id."),
        value: header.fileId || "-"
      }
    ),
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
        value: line?.description || "-",
        fullWidth: true
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-2 gap-3 md:col-span-2 md:gap-4", children: [
      quantityField,
      priceField
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ExpenseReadOnlyField_default,
      {
        label: indT("ExpenseSheets_Field_Amount", "Amount"),
        value: amountText || "-",
        valueAlign: "right"
      }
    )
  ] }) }) });
};
var ExpenseTicketLineDetailForm_default = ExpenseTicketLineDetailForm;

// Web/wwwroot/react/src/pages/gastos/tickets/line/useExpenseTicketLineDetailMutations.ts
var import_react = __toESM(require_react());
var useExpenseTicketLineDetailMutations = ({
  busy,
  isEditing,
  isCreateMode,
  canCreateTicket,
  canEditTicket,
  canDeleteTicket,
  fileId,
  lineRecId,
  draftDescription,
  draftQty,
  draftPrice,
  linkedExpenseSheetId,
  allowSelfManagement,
  canManageOtherUsers,
  currentAxUserId,
  currentCrmUserId,
  selectedManagedUserId,
  skipLinkedSheetSyncOnCreate = false,
  onLinkedSheetSyncFailure,
  onLinkedSheetSyncSuccess,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing
}) => {
  const validateLinkedSheetBeforeMutation = (0, import_react.useCallback)(async () => {
    const safeSheetId = safeText(linkedExpenseSheetId);
    if (!safeSheetId) {
      return "";
    }
    const accessResult = await resolveExpenseSheetEditAccess({
      sheetId: safeSheetId,
      allowSelfManagement,
      canManageOtherUsers,
      currentAxUserId,
      currentCrmUserId,
      selectedManagedUserId,
      suppressPermissionModal: true
    });
    if (!accessResult.isLocked) {
      return safeSheetId;
    }
    const message = safeText(accessResult.blockedMessage) || indT("ExpenseSheets_Detail_ReadOnlyByStatus", "No se puede editar esta hoja de gastos en el estado actual.");
    setModalError(message);
    setStatus(message);
    return null;
  }, [
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    linkedExpenseSheetId,
    selectedManagedUserId,
    setModalError,
    setStatus
  ]);
  const handleUpdate = (0, import_react.useCallback)(async () => {
    if (busy || !isEditing) return false;
    const canProceed = isCreateMode ? canCreateTicket : canEditTicket;
    if (!canProceed) {
      showPermissionModal();
      return false;
    }
    const normalizedDescription = String(draftDescription || "").trim();
    const parsedQty = parseDecimalInput(draftQty);
    const parsedPrice = parseDecimalInput(draftPrice);
    const parsedLine = {
      qty: parsedQty,
      price: parsedPrice
    };
    const lineAmount = resolveTicketLineAmount(parsedLine);
    if (!normalizedDescription || !isValidTicketLineAmount(parsedLine) || lineAmount === null) {
      const message = indT(
        "ExpenseTickets_Line_Validation_AmountQty",
        "La cantidad no puede ser negativa, el precio no puede ser 0 y la cantidad 0 solo se permite en descuentos negativos."
      );
      setModalError(message);
      setStatus(message);
      return false;
    }
    const validatedSheetId = await validateLinkedSheetBeforeMutation();
    if (validatedSheetId === null) {
      return false;
    }
    const result = await executeExpenseMutation({
      startStatus: isCreateMode ? indT("ExpenseSheets_Line_Detail_Creating", "Creating expense line...") : indT("ExpenseSheets_Line_Detail_Updating", "Updating expense line..."),
      fallbackErrorMessage: indT("ExpenseSheets_Detail_UpdateError", "Update error."),
      setModalError,
      setBusy,
      setStatus,
      action: async () => {
        const payload = {
          description: normalizedDescription,
          qty: Number(parsedQty),
          price: Number(parsedPrice),
          totalAmount: Number(lineAmount)
        };
        const response = isCreateMode ? await createExpenseSheetTicketLine(fileId, payload) : await updateExpenseSheetTicketLine(fileId, lineRecId, payload);
        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
        }
        if (validatedSheetId && !(isCreateMode && skipLinkedSheetSyncOnCreate)) {
          try {
            await syncExpenseLinkedTicketSheetLine({
              fileId,
              sheetId: validatedSheetId
            });
            clearExpenseTicketSheetSyncState();
            onLinkedSheetSyncSuccess?.();
          } catch (error) {
            const message = error instanceof Error ? error.message : indT(
              "ExpenseTickets_SheetSync_RetryRequired",
              "Ticket data changed, but we could not sync the expense line. Save again before leaving."
            );
            saveExpenseTicketSheetSyncState({
              fileId,
              sheetId: validatedSheetId,
              message
            });
            onLinkedSheetSyncFailure?.(message);
            if (!isCreateMode) {
              throw new Error(message);
            }
          }
        } else if (isCreateMode) {
          clearExpenseTicketSheetSyncState();
          onLinkedSheetSyncSuccess?.();
        }
        setStatus(
          isCreateMode ? indT("ExpenseSheets_Line_Detail_Created", "Expense line created") : indT("ExpenseSheets_Line_Detail_Updated", "Expense line updated")
        );
        if (!isCreateMode) {
          setIsEditing(false);
        }
        return true;
      }
    });
    return result.ok;
  }, [
    busy,
    canCreateTicket,
    canEditTicket,
    draftDescription,
    draftPrice,
    draftQty,
    fileId,
    isCreateMode,
    isEditing,
    lineRecId,
    onLinkedSheetSyncFailure,
    onLinkedSheetSyncSuccess,
    setBusy,
    setIsEditing,
    setModalError,
    setStatus,
    skipLinkedSheetSyncOnCreate,
    validateLinkedSheetBeforeMutation
  ]);
  const handleDelete = (0, import_react.useCallback)(async () => {
    if (busy) return false;
    if (!canDeleteTicket) {
      showPermissionModal();
      return false;
    }
    const validatedSheetId = await validateLinkedSheetBeforeMutation();
    if (validatedSheetId === null) {
      return false;
    }
    const result = await executeExpenseMutation({
      startStatus: indT("ExpenseSheets_Line_Detail_Deleting", "Deleting expense line..."),
      fallbackErrorMessage: indT("ExpenseSheets_Detail_DeleteError", "Delete error."),
      setModalError,
      setBusy,
      setStatus,
      action: async () => {
        const response = await deleteExpenseSheetTicketLine(fileId, lineRecId);
        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
        }
        if (validatedSheetId) {
          try {
            await syncExpenseLinkedTicketSheetLine({
              fileId,
              sheetId: validatedSheetId
            });
            clearExpenseTicketSheetSyncState();
            onLinkedSheetSyncSuccess?.();
          } catch (error) {
            const message = error instanceof Error ? error.message : indT(
              "ExpenseTickets_SheetSync_RetryRequired",
              "Ticket data changed, but we could not sync the expense line. Save again before leaving."
            );
            saveExpenseTicketSheetSyncState({
              fileId,
              sheetId: validatedSheetId,
              message
            });
            onLinkedSheetSyncFailure?.(message);
            setStatus(message);
          }
        }
        setStatus(indT("ExpenseSheets_Line_Detail_Deleted", "Expense line deleted"));
        return true;
      }
    });
    return result.ok;
  }, [
    busy,
    canDeleteTicket,
    fileId,
    lineRecId,
    onLinkedSheetSyncFailure,
    onLinkedSheetSyncSuccess,
    setBusy,
    setModalError,
    setStatus,
    validateLinkedSheetBeforeMutation
  ]);
  return {
    handleUpdate,
    handleDelete
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/line/useExpenseTicketLineDetailState.ts
var import_react2 = __toESM(require_react());
var useExpenseTicketLineDetailState = ({
  hasAccess,
  isCreateMode,
  canEditTicket,
  fileId,
  lineRecId,
  onForbidden
}) => {
  const [header, setHeader] = (0, import_react2.useState)(null);
  const [line, setLine] = (0, import_react2.useState)(null);
  const [isLoading, setIsLoading] = (0, import_react2.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react2.useState)("");
  const [busy, setBusy] = (0, import_react2.useState)(false);
  const [status, setStatus] = (0, import_react2.useState)("");
  const [isEditing, setIsEditing] = (0, import_react2.useState)(() => isCreateMode);
  const [modalError, setModalError] = (0, import_react2.useState)("");
  const [draftDescription, setDraftDescription] = (0, import_react2.useState)("");
  const [draftQty, setDraftQty] = (0, import_react2.useState)("");
  const [draftPrice, setDraftPrice] = (0, import_react2.useState)("");
  const hydrateDraftFromLine = (0, import_react2.useCallback)((nextLine) => {
    setDraftDescription(safeText(nextLine?.description));
    setDraftQty(
      formatExpenseInputNumber(nextLine?.qty, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
        fallback: ""
      })
    );
    setDraftPrice(
      formatExpenseInputNumber(nextLine?.price, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
        fallback: ""
      })
    );
  }, []);
  (0, import_react2.useEffect)(() => {
    const loadDetail = async () => {
      if (!hasAccess) {
        onForbidden();
        return;
      }
      if (!fileId || !isCreateMode && !lineRecId) {
        setErrorMessage(indT("Tickets_Detail_NotFound", "Ticket was not found."));
        setHeader(null);
        setLine(null);
        return;
      }
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await fetchExpenseSheetTicket(fileId, {
          suppressPermissionModal: true
        });
        if (response?.Success === false) {
          setErrorMessage(response?.Message || indT("Tickets_Detail_LoadError", "Could not load ticket detail."));
          setHeader(null);
          setLine(null);
          return;
        }
        const items = Array.isArray(response?.Items) ? response.Items : [];
        const selectedTicket = items.find((entry) => safeText(entry?.FileId).toUpperCase() === fileId.toUpperCase()) || items[0] || null;
        if (!selectedTicket) {
          setErrorMessage(indT("Tickets_Detail_NotFound", "Ticket was not found."));
          setHeader(null);
          setLine(null);
          return;
        }
        const mappedHeader = mapExpenseTicketDetailHeader(selectedTicket);
        const mappedLines = (Array.isArray(selectedTicket.Lines) ? selectedTicket.Lines : []).map(
          (entry) => mapExpenseTicketDetailLine(entry)
        );
        if (isCreateMode) {
          setHeader(mappedHeader);
          setLine(null);
          return;
        }
        const selectedLine = mappedLines.find((entry) => safeText(entry.recId).toUpperCase() === lineRecId.toUpperCase()) || null;
        if (!selectedLine) {
          setErrorMessage(indT("Tickets_Detail_NotFound", "Ticket was not found."));
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
        setErrorMessage(error instanceof Error ? error.message : indT("Tickets_Detail_LoadError", "Could not load ticket detail."));
        setHeader(null);
        setLine(null);
      } finally {
        setIsLoading(false);
      }
    };
    void loadDetail();
  }, [fileId, hasAccess, isCreateMode, lineRecId, onForbidden]);
  (0, import_react2.useEffect)(() => {
    if (!line || isEditing) return;
    hydrateDraftFromLine(line);
  }, [hydrateDraftFromLine, isEditing, line]);
  (0, import_react2.useEffect)(() => {
    if (!isCreateMode || isLoading || !header) return;
    setDraftDescription("");
    setDraftQty("");
    setDraftPrice("");
  }, [header, isCreateMode, isLoading]);
  const hasActiveProcess = (0, import_react2.useMemo)(() => busy || isEditing, [busy, isEditing]);
  (0, import_react2.useEffect)(() => {
    setExpenseNavigationGuard(hasActiveProcess);
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [hasActiveProcess]);
  const handleEnableEdit = (0, import_react2.useCallback)(() => {
    if (isCreateMode || isLoading || !header || !line) {
      return;
    }
    if (!canEditTicket) {
      onForbidden();
      return;
    }
    setModalError("");
    setIsEditing(true);
    hydrateDraftFromLine(line);
    setStatus(indT("ExpenseSheets_Detail_EditingEnabled", "Editing enabled"));
  }, [canEditTicket, header, hydrateDraftFromLine, isCreateMode, isLoading, line, onForbidden]);
  const handleCancelEdit = (0, import_react2.useCallback)(() => {
    if (!isEditing) return;
    setIsEditing(false);
    setModalError("");
    hydrateDraftFromLine(line);
    setStatus(indT("Common_Cancel", "Cancel"));
  }, [hydrateDraftFromLine, isEditing, line]);
  const navigateToTicketDetail = (0, import_react2.useCallback)(() => {
    const safeFileId = safeText(fileId);
    if (!safeFileId) return;
    navigateToExpenseUrl(`/Gastos/TicketDetail?fileId=${encodeURIComponent(safeFileId)}`);
  }, [fileId]);
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
    draftQty,
    draftPrice,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setDraftDescription,
    setDraftQty,
    setDraftPrice,
    handleEnableEdit,
    handleCancelEdit,
    navigateToTicketDetail
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/line/useExpenseTicketLineDetailTopbarActions.ts
var useExpenseTicketLineDetailTopbarActions = ({
  busy,
  modalOpen,
  isEditing,
  isCreateMode,
  isLocked,
  permissionsReady = true,
  canCreateTicket,
  canEditTicket,
  canDeleteTicket,
  fileId,
  setModalError,
  handleEnableEdit,
  handleCancelEdit,
  handleUpdate,
  handleDelete,
  onSaveSuccess,
  onDeleteSuccess,
  openConfirm,
  closeConfirm
}) => {
  useExpenseTopbarCrudActions({
    actionGroupId: "expense-ticket-line-detail-actions",
    ids: {
      editIconId: "expenseTicketLineEditIcon",
      saveIconId: "expenseTicketLineSaveIcon",
      deleteBtnId: "expenseTicketLineDeleteBtn",
      cancelBtnId: "expenseTicketLineCancelBtn"
    },
    events: {
      editEvent: "expense-ticket-line-detail-edit",
      deleteEvent: "expense-ticket-line-detail-delete",
      cancelEvent: "expense-ticket-line-detail-cancel-edit"
    },
    busy,
    modalOpen,
    isEditing,
    isCreateMode,
    isLocked,
    permissionsReady,
    canCreate: canCreateTicket,
    canEdit: canEditTicket,
    canDelete: canDeleteTicket,
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
    onDeleteSuccess: onDeleteSuccess || (() => {
      navigateToExpenseUrl(`/Gastos/TicketDetail?fileId=${encodeURIComponent(fileId)}`);
    }),
    openConfirm,
    closeConfirm
  });
};

// Web/wwwroot/react/src/pages/gastos/tickets/line/ExpenseTicketLineDetailPage.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var bootstrapExpenseApiAuth = () => {
  configureExpenseApiAuth({
    token: safeText(window.__IND_API_TOKEN__),
    entraOid: safeText(window.__IND_ENTRA_OID__),
    appCode: safeText(window.__IND_APP_CODE__)
  });
};
var consumeTicketLineEditModeQuery = () => {
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
var resolveLinkedTicketBlockedMessage = (isPaid) => {
  if (isPaid) {
    return indT("ExpenseSheets_Detail_PaidReadOnly", "Las hojas de gasto pagadas son de solo lectura.");
  }
  return indT("ExpenseSheets_Detail_ReadOnlyByStatus", "No se puede editar esta hoja de gastos en el estado actual.");
};
var ExpenseTicketLineDetailModal = ({
  modal,
  confirmText,
  cancelText,
  loadingText,
  busy,
  error,
  status,
  onConfirm,
  onCancel
}) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
  ConfirmModal,
  {
    open: modal.open,
    title: modal.title,
    message: modal.message,
    confirmText,
    cancelText,
    loadingText,
    showCancel: modal.showCancel,
    showConfirm: modal.showConfirm,
    busy,
    error,
    status,
    onConfirm,
    onCancel
  }
);
var ExpenseTicketLineDetailLoader = ({ isLoading }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
  "div",
  {
    className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-zinc-700",
    style: { display: isLoading ? "flex" : "none" },
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { className: "ind-spinner size-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
      indT("Common_Loading", "Loading")
    ]
  }
);
var useExpenseTicketLineDetailViewModel = () => {
  const {
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    managementBootstrapReady
  } = useAuthContext();
  const hasAccess = canAccess("GASTOS_TICKETS", "View");
  const canEditTicketByModule = canAccess("GASTOS_TICKETS", "Edit");
  const canDeleteTicketByModule = canAccess("GASTOS_TICKETS", "FullAccess");
  const fileId = safeText(window.__EXPENSE_TICKET_FILE_ID__);
  const lineRecId = safeText(window.__EXPENSE_TICKET_LINE_ID__);
  const routeParams = (0, import_react3.useMemo)(() => new URLSearchParams(window.location.search), []);
  const isCreateMode = (0, import_react3.useMemo)(() => safeText(routeParams.get("mode")).toLowerCase() === "create", [routeParams]);
  const startInEditMode = (0, import_react3.useMemo)(() => safeText(routeParams.get("mode")).toLowerCase() === "edit", [routeParams]);
  const routeOrigin = (0, import_react3.useMemo)(() => safeText(routeParams.get("origin")).toLowerCase(), [routeParams]);
  const routeSheetId = (0, import_react3.useMemo)(() => safeText(routeParams.get("sheetId")), [routeParams]);
  const routeSheetLineRecId = (0, import_react3.useMemo)(() => safeText(routeParams.get("sheetLineRecId")), [routeParams]);
  const explicitReturnContext = (0, import_react3.useMemo)(
    () => normalizeExpenseTicketReturnContext({
      fileId,
      origin: routeOrigin,
      sheetId: routeSheetId,
      sheetLineRecId: routeSheetLineRecId
    }),
    [fileId, routeOrigin, routeSheetId, routeSheetLineRecId]
  );
  const ticketReturnContext = (0, import_react3.useMemo)(
    () => resolveExpenseTicketReturnContext(fileId, explicitReturnContext),
    [explicitReturnContext, fileId]
  );
  const detailOrigin = ticketReturnContext?.origin || routeOrigin;
  const autoEditAttemptedRef = import_react3.default.useRef(false);
  const sheetSyncState = readExpenseTicketSheetSyncState(fileId);
  const sheetSyncBlocked = !!sheetSyncState;
  const sheetSyncBlockedMessage = safeText(sheetSyncState?.message);
  import_react3.default.useEffect(() => {
    if (!explicitReturnContext) return;
    saveExpenseTicketReturnContext(explicitReturnContext);
  }, [explicitReturnContext]);
  import_react3.default.useEffect(() => {
    if (!startInEditMode) {
      return;
    }
    consumeTicketLineEditModeQuery();
  }, [startInEditMode]);
  const isManagingOtherUser = isManagingOtherExpenseUser({
    canManageOtherUsers,
    currentAxUserId,
    selectedManagedUserId
  });
  const canCreateTicketLine = canEditTicketByModule && !isManagingOtherUser;
  const canEditTicket = canEditTicketByModule && !isManagingOtherUser;
  const canDeleteTicket = canDeleteTicketByModule && !isManagingOtherUser;
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
    draftQty,
    draftPrice,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setDraftDescription,
    setDraftQty,
    setDraftPrice,
    handleEnableEdit,
    handleCancelEdit
  } = useExpenseTicketLineDetailState({
    hasAccess,
    isCreateMode,
    canEditTicket,
    fileId,
    lineRecId,
    onForbidden: showPermissionModal
  });
  const linkedExpenseSheetId = (0, import_react3.useMemo)(
    () => safeText(ticketReturnContext?.sheetId || header?.hojaGastosIdDisplay || routeSheetId),
    [header?.hojaGastosIdDisplay, routeSheetId, ticketReturnContext]
  );
  const { linkSheetLocked, linkSheetBlockedMessage, linkSheetCheckBusy } = useExpenseTicketLinkSheetGate({
    isLinkMode: !!linkedExpenseSheetId,
    linkSheetId: linkedExpenseSheetId,
    canProcessLinkMode: true,
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    resolveBlockedMessage: resolveLinkedTicketBlockedMessage
  });
  const canEditLinkedTicket = !linkedExpenseSheetId || !linkSheetCheckBusy && !linkSheetLocked;
  const canCreateLinkedTicketLine = !linkedExpenseSheetId || !linkSheetCheckBusy && !linkSheetLocked;
  const allowAssignedDraftEdit = detailOrigin === "sheet-create" || !!linkedExpenseSheetId && canEditLinkedTicket;
  const pendingFirstLink = detailOrigin === "sheet-create" && !!safeText(ticketReturnContext?.sheetId || routeSheetId) && !safeText(header?.hojaGastosIdDisplay);
  const workflowBlockedMessage = pendingFirstLink ? indT("ExpenseTickets_SheetSync_PendingSaveRequired", "Save the ticket before leaving this flow.") : sheetSyncBlockedMessage || indT(
    "ExpenseTickets_SheetSync_RetryRequired",
    "Ticket data changed, but we could not sync the expense line. Save again before leaving."
  );
  const shouldBlockWorkflowExit = pendingFirstLink || sheetSyncBlocked && (isEditing || isCreateMode);
  const hasNavigationGuard = busy || isEditing || shouldBlockWorkflowExit;
  const navigationGuardMessage = shouldBlockWorkflowExit ? workflowBlockedMessage : void 0;
  const handleEnableEditInContext = (0, import_react3.useCallback)(() => {
    if (linkSheetCheckBusy) {
      return;
    }
    if (linkedExpenseSheetId && linkSheetLocked) {
      const message = safeText(linkSheetBlockedMessage) || resolveLinkedTicketBlockedMessage(false);
      setModalError(message);
      setStatus(message);
      return;
    }
    handleEnableEdit();
  }, [
    handleEnableEdit,
    linkSheetBlockedMessage,
    linkSheetCheckBusy,
    linkSheetLocked,
    linkedExpenseSheetId,
    setModalError,
    setStatus
  ]);
  import_react3.default.useEffect(() => {
    if (!hasNavigationGuard) {
      clearExpenseNavigationGuard();
      return;
    }
    setExpenseNavigationGuard({
      active: true,
      message: navigationGuardMessage,
      block: shouldBlockWorkflowExit
    });
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [hasNavigationGuard, navigationGuardMessage, shouldBlockWorkflowExit]);
  import_react3.default.useEffect(() => {
    if (!startInEditMode || autoEditAttemptedRef.current) {
      return;
    }
    if (isLoading || !header || !line || linkSheetCheckBusy) {
      return;
    }
    autoEditAttemptedRef.current = true;
    handleEnableEditInContext();
  }, [handleEnableEditInContext, header, isLoading, line, linkSheetCheckBusy, startInEditMode]);
  const draftQtyValue = parseDecimalInput(draftQty);
  const draftPriceValue = parseDecimalInput(draftPrice);
  const calculatedAmountPreview = isEditing && draftQtyValue != null && draftPriceValue != null && draftPriceValue !== 0 ? resolveTicketLineAmount({ qty: draftQtyValue, price: draftPriceValue }) : line?.totalAmount ?? null;
  const amountText = (0, import_react3.useMemo)(
    () => formatAmountWithCurrency(calculatedAmountPreview, safeText(header?.currencyCode)),
    [calculatedAmountPreview, header?.currencyCode]
  );
  const priceText = (0, import_react3.useMemo)(
    () => formatAmountWithCurrency(line?.price ?? null, safeText(header?.currencyCode)),
    [header?.currencyCode, line?.price]
  );
  const isAssignedTicket = header?.status === 1;
  const isContextLocked = isAssignedTicket && !allowAssignedDraftEdit || !!linkedExpenseSheetId && linkSheetLocked;
  const ticketDetailUrl = (0, import_react3.useMemo)(() => {
    const safeFileId = safeText(fileId);
    if (!safeFileId) return "";
    const query = new URLSearchParams({
      fileId: safeFileId
    });
    appendExpenseTicketReturnQuery(query, ticketReturnContext);
    return `/Gastos/TicketDetail?${query.toString()}`;
  }, [fileId, ticketReturnContext]);
  const ticketDetailEditUrl = (0, import_react3.useMemo)(() => {
    const safeFileId = safeText(fileId);
    if (!safeFileId) return "";
    const query = new URLSearchParams({
      fileId: safeFileId,
      mode: "edit"
    });
    appendExpenseTicketReturnQuery(query, ticketReturnContext);
    return `/Gastos/TicketDetail?${query.toString()}`;
  }, [fileId, ticketReturnContext]);
  const preferredTicketDetailUrl = pendingFirstLink ? ticketDetailEditUrl : ticketDetailUrl;
  import_react3.default.useEffect(() => {
    if (!shouldBlockWorkflowExit || !preferredTicketDetailUrl) {
      return;
    }
    const backButton = document.getElementById("globalBackBtn");
    const handleTopbarBack = (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation?.();
      navigateToExpenseUrl(preferredTicketDetailUrl, {
        askConfirmation: false,
        bypassGuardOnce: true
      });
    };
    const handleNativeBack = (event) => {
      if (event?.state && event.state.indTrap === true) {
        return;
      }
      window.__indBypassNavigationGuardOnce?.();
      window.location.replace(preferredTicketDetailUrl);
    };
    backButton?.addEventListener("click", handleTopbarBack, true);
    window.addEventListener("popstate", handleNativeBack);
    return () => {
      backButton?.removeEventListener("click", handleTopbarBack, true);
      window.removeEventListener("popstate", handleNativeBack);
    };
  }, [preferredTicketDetailUrl, shouldBlockWorkflowExit]);
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
  import_react3.default.useEffect(() => {
    if (!shouldBlockWorkflowExit || busy) return;
    if (!workflowBlockedMessage || status === workflowBlockedMessage) return;
    setStatus(workflowBlockedMessage);
  }, [busy, setStatus, shouldBlockWorkflowExit, status, workflowBlockedMessage]);
  const handleModalButtonConfirm = (0, import_react3.useCallback)(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }
    void handleModalConfirm();
  }, [busy, closeConfirm, handleModalConfirm, modalError]);
  const handleCancelEditInContext = (0, import_react3.useCallback)(() => {
    if (!isCreateMode) {
      handleCancelEdit();
      return;
    }
    if (!preferredTicketDetailUrl) {
      return;
    }
    navigateToExpenseUrl(preferredTicketDetailUrl, {
      askConfirmation: !shouldBlockWorkflowExit,
      bypassGuardOnce: shouldBlockWorkflowExit
    });
  }, [handleCancelEdit, isCreateMode, preferredTicketDetailUrl, shouldBlockWorkflowExit]);
  const { handleUpdate, handleDelete } = useExpenseTicketLineDetailMutations({
    busy,
    isEditing,
    isCreateMode,
    canCreateTicket: canCreateTicketLine && canCreateLinkedTicketLine,
    canEditTicket: canEditTicket && canEditLinkedTicket,
    canDeleteTicket: canDeleteTicket && canEditLinkedTicket,
    fileId,
    lineRecId,
    draftDescription,
    draftQty,
    draftPrice,
    linkedExpenseSheetId,
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    skipLinkedSheetSyncOnCreate: pendingFirstLink,
    onLinkedSheetSyncFailure: (message) => {
      setStatus(message);
    },
    setModalError,
    setBusy,
    setStatus,
    setIsEditing
  });
  useExpenseTicketLineDetailTopbarActions({
    busy,
    modalOpen: modal.open,
    isEditing,
    isCreateMode,
    isLocked: isContextLocked || isManagingOtherUser,
    permissionsReady: managementBootstrapReady,
    canCreateTicket: canCreateTicketLine && canCreateLinkedTicketLine,
    canEditTicket: canEditTicket && canEditLinkedTicket,
    canDeleteTicket: canDeleteTicket && canEditLinkedTicket,
    fileId,
    setModalError,
    handleEnableEdit: handleEnableEditInContext,
    handleCancelEdit: handleCancelEditInContext,
    handleUpdate,
    handleDelete,
    onSaveSuccess: () => {
      if (isCreateMode) {
        const returnUrl = readExpenseTicketSheetSyncState(fileId) ? ticketDetailEditUrl : preferredTicketDetailUrl;
        if (!returnUrl) return;
        navigateToExpenseUrl(returnUrl, {
          askConfirmation: false,
          bypassGuardOnce: true
        });
        return;
      }
      reloadExpensePage();
    },
    onDeleteSuccess: () => {
      if (!preferredTicketDetailUrl) return;
      navigateToExpenseUrl(preferredTicketDetailUrl, {
        askConfirmation: false,
        bypassGuardOnce: true
      });
    },
    openConfirm,
    closeConfirm
  });
  return {
    modal,
    modalConfirmText,
    modalCancelText,
    modalLoadingText,
    busy,
    modalError,
    status,
    handleModalButtonConfirm,
    closeConfirm,
    isLoading,
    errorMessage,
    header,
    line,
    isCreateMode,
    isEditing,
    draftDescription,
    draftQty,
    draftPrice,
    priceText,
    amountText,
    setDraftDescription,
    setDraftQty,
    setDraftPrice
  };
};
var ExpenseTicketLineDetailContent = () => {
  const view = useExpenseTicketLineDetailViewModel();
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ExpenseTicketLineDetailModal,
      {
        modal: view.modal,
        confirmText: view.modalConfirmText,
        cancelText: view.modalCancelText,
        loadingText: view.modalLoadingText,
        busy: view.busy,
        error: view.modalError,
        status: view.status,
        onConfirm: view.handleModalButtonConfirm,
        onCancel: view.closeConfirm
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseTicketLineDetailLoader, { isLoading: view.isLoading }),
    view.errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "text-danger", children: view.errorMessage }) : null,
    !view.isLoading && !view.errorMessage && view.header && (view.line || view.isCreateMode) ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ExpenseTicketLineDetailForm_default,
      {
        header: view.header,
        line: view.line,
        isEditing: view.isEditing,
        draftDescription: view.draftDescription,
        draftQty: view.draftQty,
        draftPrice: view.draftPrice,
        priceText: view.priceText,
        amountText: view.amountText,
        onDraftDescriptionChange: view.setDraftDescription,
        onDraftQtyChange: view.setDraftQty,
        onDraftPriceChange: view.setDraftPrice
      }
    ) : null
  ] });
};
var ExpenseTicketLineDetailPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(VisitasPageProviders_default, { enableExpenseManagement: true, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseTicketLineDetailContent, {}) });
};
var mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-ticket-line-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseTicketLineDetailPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseTicketLineDetailPage_default = ExpenseTicketLineDetailPage;
export {
  ExpenseTicketLineDetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2xpbmUvRXhwZW5zZVRpY2tldExpbmVEZXRhaWxQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmVEZXRhaWxGb3JtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvbGluZS91c2VFeHBlbnNlVGlja2V0TGluZURldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvbGluZS91c2VFeHBlbnNlVGlja2V0TGluZURldGFpbFN0YXRlLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9saW5lL3VzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9ucy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcclxuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldExpbmVEZXRhaWxGb3JtIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5lRGV0YWlsRm9ybS50c3hcIjtcclxuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uLy4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XHJcbmltcG9ydCB7IHBhcnNlRGVjaW1hbElucHV0IH0gZnJvbSBcIi4uLy4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgaXNNYW5hZ2luZ090aGVyRXhwZW5zZVVzZXIgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZU1hbmFnZWRVc2VyU2NvcGUudHNcIjtcclxuaW1wb3J0IHsgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLCByZWxvYWRFeHBlbnNlUGFnZSwgbmF2aWdhdGVUb0V4cGVuc2VVcmwsIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHsgcmVhZEV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZVRpY2tldExpbmVBbW91bnQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldExpbmVBbW91bnQudHNcIjtcclxuaW1wb3J0IHtcclxuICBhcHBlbmRFeHBlbnNlVGlja2V0UmV0dXJuUXVlcnksXHJcbiAgbm9ybWFsaXplRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgcmVzb2x2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldExpbmtTaGVldEdhdGUgfSBmcm9tIFwiLi4vdXNlRXhwZW5zZVRpY2tldExpbmtTaGVldEdhdGUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldExpbmVEZXRhaWxNdXRhdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0TGluZURldGFpbE11dGF0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0TGluZURldGFpbFN0YXRlIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldExpbmVEZXRhaWxTdGF0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0TGluZURldGFpbFRvcGJhckFjdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0TGluZURldGFpbFRvcGJhckFjdGlvbnMudHNcIjtcclxuXHJcbi8vIEluaXRpYWxpemVzIGF1dGggc2VlZCBmb3IgZXhwZW5zZSBBUEkgY2FsbHMgYmVmb3JlIGlzbGFuZCBlZmZlY3RzIHJ1bi5cclxuY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XHJcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgoe1xyXG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXHJcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcclxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIENvbnN1bWVzIHRoZSBvbmUtdGltZSBlZGl0IGhhbmRvZmYgc28gbGF0ZXIgcmVsb2FkcyByZXR1cm4gdG8gbm9ybWFsIHZpZXcgbW9kZS5cclxuY29uc3QgY29uc3VtZVRpY2tldExpbmVFZGl0TW9kZVF1ZXJ5ID0gKCkgPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjb25zdCBjdXJyZW50VXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgaWYgKHNhZmVUZXh0KGN1cnJlbnRVcmwuc2VhcmNoUGFyYW1zLmdldChcIm1vZGVcIikpLnRvTG93ZXJDYXNlKCkgIT09IFwiZWRpdFwiKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjdXJyZW50VXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoXCJtb2RlXCIpO1xyXG4gIGNvbnN0IG5leHRVcmwgPSBgJHtjdXJyZW50VXJsLnBhdGhuYW1lfSR7Y3VycmVudFVybC5zZWFyY2h9JHtjdXJyZW50VXJsLmhhc2h9YDtcclxuICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUod2luZG93Lmhpc3Rvcnkuc3RhdGUsIFwiXCIsIG5leHRVcmwpO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZUxpbmtlZFRpY2tldEJsb2NrZWRNZXNzYWdlID0gKGlzUGFpZDogYm9vbGVhbik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKGlzUGFpZCkge1xyXG4gICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9QYWlkUmVhZE9ubHlcIiwgXCJMYXMgaG9qYXMgZGUgZ2FzdG8gcGFnYWRhcyBzb24gZGUgc29sbyBsZWN0dXJhLlwiKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUmVhZE9ubHlCeVN0YXR1c1wiLCBcIk5vIHNlIHB1ZWRlIGVkaXRhciBlc3RhIGhvamEgZGUgZ2FzdG9zIGVuIGVsIGVzdGFkbyBhY3R1YWwuXCIpO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0TGluZURldGFpbE1vZGFsUHJvcHMgPSB7XHJcbiAgbW9kYWw6IHtcclxuICAgIG9wZW46IGJvb2xlYW47XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgc2hvd0NhbmNlbDogYm9vbGVhbjtcclxuICAgIHNob3dDb25maXJtOiBib29sZWFuO1xyXG4gIH07XHJcbiAgY29uZmlybVRleHQ6IHN0cmluZztcclxuICBjYW5jZWxUZXh0OiBzdHJpbmc7XHJcbiAgbG9hZGluZ1RleHQ6IHN0cmluZztcclxuICBidXN5OiBib29sZWFuO1xyXG4gIGVycm9yOiBzdHJpbmc7XHJcbiAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgb25Db25maXJtOiAoKSA9PiB2b2lkO1xyXG4gIG9uQ2FuY2VsOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gS2VlcHMgdGhlIGNvbmZpcm1hdGlvbiBtb2RhbCBtYXJrdXAgb3V0IG9mIHRoZSBwYWdlIG9yY2hlc3RyYXRpb24gY29tcG9uZW50LlxyXG5jb25zdCBFeHBlbnNlVGlja2V0TGluZURldGFpbE1vZGFsID0gKHtcclxuICBtb2RhbCxcclxuICBjb25maXJtVGV4dCxcclxuICBjYW5jZWxUZXh0LFxyXG4gIGxvYWRpbmdUZXh0LFxyXG4gIGJ1c3ksXHJcbiAgZXJyb3IsXHJcbiAgc3RhdHVzLFxyXG4gIG9uQ29uZmlybSxcclxuICBvbkNhbmNlbCxcclxufTogRXhwZW5zZVRpY2tldExpbmVEZXRhaWxNb2RhbFByb3BzKSA9PiAoXHJcbiAgPENvbmZpcm1Nb2RhbFxyXG4gICAgb3Blbj17bW9kYWwub3Blbn1cclxuICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XHJcbiAgICBjb25maXJtVGV4dD17Y29uZmlybVRleHR9XHJcbiAgICBjYW5jZWxUZXh0PXtjYW5jZWxUZXh0fVxyXG4gICAgbG9hZGluZ1RleHQ9e2xvYWRpbmdUZXh0fVxyXG4gICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cclxuICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgIGJ1c3k9e2J1c3l9XHJcbiAgICBlcnJvcj17ZXJyb3J9XHJcbiAgICBzdGF0dXM9e3N0YXR1c31cclxuICAgIG9uQ29uZmlybT17b25Db25maXJtfVxyXG4gICAgb25DYW5jZWw9e29uQ2FuY2VsfVxyXG4gIC8+XHJcbik7XHJcblxyXG4vLyBSZW5kZXJzIHRoZSBzaGFyZWQgbG9hZGVyIHN0YXRlIGZvciB0aWNrZXQgbGluZSBkZXRhaWwuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsTG9hZGVyID0gKHsgaXNMb2FkaW5nIH06IHsgaXNMb2FkaW5nOiBib29sZWFuIH0pID0+IChcclxuICA8ZGl2XHJcbiAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC16aW5jLTcwMFwiXHJcbiAgICBzdHlsZT17eyBkaXNwbGF5OiBpc0xvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XHJcbiAgPlxyXG4gICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBzaXplLTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxyXG4gICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cclxuICAgIDwvc3ZnPlxyXG4gICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgPC9kaXY+XHJcbik7XHJcblxyXG5jb25zdCB1c2VFeHBlbnNlVGlja2V0TGluZURldGFpbFZpZXdNb2RlbCA9ICgpID0+IHtcclxuICBjb25zdCB7XHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgfSA9IHVzZUF1dGhDb250ZXh0KCk7XHJcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJWaWV3XCIpO1xyXG4gIGNvbnN0IGNhbkVkaXRUaWNrZXRCeU1vZHVsZSA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiRWRpdFwiKTtcclxuICBjb25zdCBjYW5EZWxldGVUaWNrZXRCeU1vZHVsZSA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiRnVsbEFjY2Vzc1wiKTtcclxuICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1RJQ0tFVF9GSUxFX0lEX18pO1xyXG4gIGNvbnN0IGxpbmVSZWNJZCA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfVElDS0VUX0xJTkVfSURfXyk7XHJcbiAgY29uc3Qgcm91dGVQYXJhbXMgPSB1c2VNZW1vKCgpID0+IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCksIFtdKTtcclxuICBjb25zdCBpc0NyZWF0ZU1vZGUgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcIm1vZGVcIikpLnRvTG93ZXJDYXNlKCkgPT09IFwiY3JlYXRlXCIsIFtyb3V0ZVBhcmFtc10pO1xyXG4gIGNvbnN0IHN0YXJ0SW5FZGl0TW9kZSA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwibW9kZVwiKSkudG9Mb3dlckNhc2UoKSA9PT0gXCJlZGl0XCIsIFtyb3V0ZVBhcmFtc10pO1xyXG4gIGNvbnN0IHJvdXRlT3JpZ2luID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChyb3V0ZVBhcmFtcy5nZXQoXCJvcmlnaW5cIikpLnRvTG93ZXJDYXNlKCksIFtyb3V0ZVBhcmFtc10pO1xyXG4gIGNvbnN0IHJvdXRlU2hlZXRJZCA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwic2hlZXRJZFwiKSksIFtyb3V0ZVBhcmFtc10pO1xyXG4gIGNvbnN0IHJvdXRlU2hlZXRMaW5lUmVjSWQgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcInNoZWV0TGluZVJlY0lkXCIpKSwgW3JvdXRlUGFyYW1zXSk7XHJcbiAgY29uc3QgZXhwbGljaXRSZXR1cm5Db250ZXh0ID0gdXNlTWVtbyhcclxuICAgICgpID0+XHJcbiAgICAgIG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcclxuICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgb3JpZ2luOiByb3V0ZU9yaWdpbixcclxuICAgICAgICBzaGVldElkOiByb3V0ZVNoZWV0SWQsXHJcbiAgICAgICAgc2hlZXRMaW5lUmVjSWQ6IHJvdXRlU2hlZXRMaW5lUmVjSWQsXHJcbiAgICAgIH0pLFxyXG4gICAgW2ZpbGVJZCwgcm91dGVPcmlnaW4sIHJvdXRlU2hlZXRJZCwgcm91dGVTaGVldExpbmVSZWNJZF1cclxuICApO1xyXG4gIGNvbnN0IHRpY2tldFJldHVybkNvbnRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gcmVzb2x2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KGZpbGVJZCwgZXhwbGljaXRSZXR1cm5Db250ZXh0KSxcclxuICAgIFtleHBsaWNpdFJldHVybkNvbnRleHQsIGZpbGVJZF1cclxuICApO1xyXG4gIGNvbnN0IGRldGFpbE9yaWdpbiA9IHRpY2tldFJldHVybkNvbnRleHQ/Lm9yaWdpbiB8fCByb3V0ZU9yaWdpbjtcclxuICBjb25zdCBhdXRvRWRpdEF0dGVtcHRlZFJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XHJcbiAgY29uc3Qgc2hlZXRTeW5jU3RhdGUgPSByZWFkRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKGZpbGVJZCk7XHJcbiAgY29uc3Qgc2hlZXRTeW5jQmxvY2tlZCA9ICEhc2hlZXRTeW5jU3RhdGU7XHJcbiAgY29uc3Qgc2hlZXRTeW5jQmxvY2tlZE1lc3NhZ2UgPSBzYWZlVGV4dChzaGVldFN5bmNTdGF0ZT8ubWVzc2FnZSk7XHJcblxyXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWV4cGxpY2l0UmV0dXJuQ29udGV4dCkgcmV0dXJuO1xyXG4gICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KGV4cGxpY2l0UmV0dXJuQ29udGV4dCk7XHJcbiAgfSwgW2V4cGxpY2l0UmV0dXJuQ29udGV4dF0pO1xyXG5cclxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFzdGFydEluRWRpdE1vZGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN1bWVUaWNrZXRMaW5lRWRpdE1vZGVRdWVyeSgpO1xyXG4gIH0sIFtzdGFydEluRWRpdE1vZGVdKTtcclxuICBjb25zdCBpc01hbmFnaW5nT3RoZXJVc2VyID0gaXNNYW5hZ2luZ090aGVyRXhwZW5zZVVzZXIoe1xyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICB9KTtcclxuICBjb25zdCBjYW5DcmVhdGVUaWNrZXRMaW5lID0gY2FuRWRpdFRpY2tldEJ5TW9kdWxlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyO1xyXG4gIGNvbnN0IGNhbkVkaXRUaWNrZXQgPSBjYW5FZGl0VGlja2V0QnlNb2R1bGUgJiYgIWlzTWFuYWdpbmdPdGhlclVzZXI7XHJcbiAgY29uc3QgY2FuRGVsZXRlVGlja2V0ID0gY2FuRGVsZXRlVGlja2V0QnlNb2R1bGUgJiYgIWlzTWFuYWdpbmdPdGhlclVzZXI7XHJcbiAgY29uc3Qge1xyXG4gICAgaGVhZGVyLFxyXG4gICAgbGluZSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGJ1c3ksXHJcbiAgICBzdGF0dXMsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtb2RhbEVycm9yLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0UXR5LFxyXG4gICAgZHJhZnRQcmljZSxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgIHNldERyYWZ0UXR5LFxyXG4gICAgc2V0RHJhZnRQcmljZSxcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0TGluZURldGFpbFN0YXRlKHtcclxuICAgIGhhc0FjY2VzcyxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGNhbkVkaXRUaWNrZXQsXHJcbiAgICBmaWxlSWQsXHJcbiAgICBsaW5lUmVjSWQsXHJcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICB9KTtcclxuICBjb25zdCBsaW5rZWRFeHBlbnNlU2hlZXRJZCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBzYWZlVGV4dCh0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkIHx8IGhlYWRlcj8uaG9qYUdhc3Rvc0lkRGlzcGxheSB8fCByb3V0ZVNoZWV0SWQpLFxyXG4gICAgW2hlYWRlcj8uaG9qYUdhc3Rvc0lkRGlzcGxheSwgcm91dGVTaGVldElkLCB0aWNrZXRSZXR1cm5Db250ZXh0XVxyXG4gICk7XHJcbiAgY29uc3QgeyBsaW5rU2hlZXRMb2NrZWQsIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlLCBsaW5rU2hlZXRDaGVja0J1c3kgfSA9IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlKHtcclxuICAgIGlzTGlua01vZGU6ICEhbGlua2VkRXhwZW5zZVNoZWV0SWQsXHJcbiAgICBsaW5rU2hlZXRJZDogbGlua2VkRXhwZW5zZVNoZWV0SWQsXHJcbiAgICBjYW5Qcm9jZXNzTGlua01vZGU6IHRydWUsXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICByZXNvbHZlQmxvY2tlZE1lc3NhZ2U6IHJlc29sdmVMaW5rZWRUaWNrZXRCbG9ja2VkTWVzc2FnZSxcclxuICB9KTtcclxuICBjb25zdCBjYW5FZGl0TGlua2VkVGlja2V0ID0gIWxpbmtlZEV4cGVuc2VTaGVldElkIHx8ICghbGlua1NoZWV0Q2hlY2tCdXN5ICYmICFsaW5rU2hlZXRMb2NrZWQpO1xyXG4gIGNvbnN0IGNhbkNyZWF0ZUxpbmtlZFRpY2tldExpbmUgPSAhbGlua2VkRXhwZW5zZVNoZWV0SWQgfHwgKCFsaW5rU2hlZXRDaGVja0J1c3kgJiYgIWxpbmtTaGVldExvY2tlZCk7XHJcbiAgY29uc3QgYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCA9IGRldGFpbE9yaWdpbiA9PT0gXCJzaGVldC1jcmVhdGVcIiB8fCAoISFsaW5rZWRFeHBlbnNlU2hlZXRJZCAmJiBjYW5FZGl0TGlua2VkVGlja2V0KTtcclxuICBjb25zdCBwZW5kaW5nRmlyc3RMaW5rID1cclxuICAgIGRldGFpbE9yaWdpbiA9PT0gXCJzaGVldC1jcmVhdGVcIiAmJiAhIXNhZmVUZXh0KHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQgfHwgcm91dGVTaGVldElkKSAmJiAhc2FmZVRleHQoaGVhZGVyPy5ob2phR2FzdG9zSWREaXNwbGF5KTtcclxuICBjb25zdCB3b3JrZmxvd0Jsb2NrZWRNZXNzYWdlID0gcGVuZGluZ0ZpcnN0TGlua1xyXG4gICAgPyBpbmRUKFwiRXhwZW5zZVRpY2tldHNfU2hlZXRTeW5jX1BlbmRpbmdTYXZlUmVxdWlyZWRcIiwgXCJTYXZlIHRoZSB0aWNrZXQgYmVmb3JlIGxlYXZpbmcgdGhpcyBmbG93LlwiKVxyXG4gICAgOiBzaGVldFN5bmNCbG9ja2VkTWVzc2FnZSB8fFxyXG4gICAgICBpbmRUKFxyXG4gICAgICAgIFwiRXhwZW5zZVRpY2tldHNfU2hlZXRTeW5jX1JldHJ5UmVxdWlyZWRcIixcclxuICAgICAgICBcIlRpY2tldCBkYXRhIGNoYW5nZWQsIGJ1dCB3ZSBjb3VsZCBub3Qgc3luYyB0aGUgZXhwZW5zZSBsaW5lLiBTYXZlIGFnYWluIGJlZm9yZSBsZWF2aW5nLlwiXHJcbiAgICAgICk7XHJcbiAgY29uc3Qgc2hvdWxkQmxvY2tXb3JrZmxvd0V4aXQgPSBwZW5kaW5nRmlyc3RMaW5rIHx8IChzaGVldFN5bmNCbG9ja2VkICYmIChpc0VkaXRpbmcgfHwgaXNDcmVhdGVNb2RlKSk7XG4gIGNvbnN0IGhhc05hdmlnYXRpb25HdWFyZCA9IGJ1c3kgfHwgaXNFZGl0aW5nIHx8IHNob3VsZEJsb2NrV29ya2Zsb3dFeGl0O1xuICBjb25zdCBuYXZpZ2F0aW9uR3VhcmRNZXNzYWdlID0gc2hvdWxkQmxvY2tXb3JrZmxvd0V4aXQgPyB3b3JrZmxvd0Jsb2NrZWRNZXNzYWdlIDogdW5kZWZpbmVkO1xuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0SW5Db250ZXh0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGxpbmtTaGVldENoZWNrQnVzeSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxpbmtlZEV4cGVuc2VTaGVldElkICYmIGxpbmtTaGVldExvY2tlZCkge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID1cclxuICAgICAgICBzYWZlVGV4dChsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZSkgfHxcclxuICAgICAgICByZXNvbHZlTGlua2VkVGlja2V0QmxvY2tlZE1lc3NhZ2UoZmFsc2UpO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0KCk7XHJcbiAgfSwgW1xyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlLFxyXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gICAgbGlua1NoZWV0TG9ja2VkLFxyXG4gICAgbGlua2VkRXhwZW5zZVNoZWV0SWQsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gIF0pO1xyXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFoYXNOYXZpZ2F0aW9uR3VhcmQpIHtcbiAgICAgIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoe1xuICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgbWVzc2FnZTogbmF2aWdhdGlvbkd1YXJkTWVzc2FnZSxcbiAgICAgIGJsb2NrOiBzaG91bGRCbG9ja1dvcmtmbG93RXhpdCxcbiAgICB9KTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKCk7XG4gICAgfTtcbiAgfSwgW2hhc05hdmlnYXRpb25HdWFyZCwgbmF2aWdhdGlvbkd1YXJkTWVzc2FnZSwgc2hvdWxkQmxvY2tXb3JrZmxvd0V4aXRdKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghc3RhcnRJbkVkaXRNb2RlIHx8IGF1dG9FZGl0QXR0ZW1wdGVkUmVmLmN1cnJlbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzTG9hZGluZyB8fCAhaGVhZGVyIHx8ICFsaW5lIHx8IGxpbmtTaGVldENoZWNrQnVzeSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgYXV0b0VkaXRBdHRlbXB0ZWRSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICBoYW5kbGVFbmFibGVFZGl0SW5Db250ZXh0KCk7XHJcbiAgfSwgW2hhbmRsZUVuYWJsZUVkaXRJbkNvbnRleHQsIGhlYWRlciwgaXNMb2FkaW5nLCBsaW5lLCBsaW5rU2hlZXRDaGVja0J1c3ksIHN0YXJ0SW5FZGl0TW9kZV0pO1xyXG4gIGNvbnN0IGRyYWZ0UXR5VmFsdWUgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFF0eSk7XHJcbiAgY29uc3QgZHJhZnRQcmljZVZhbHVlID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRQcmljZSk7XHJcbiAgY29uc3QgY2FsY3VsYXRlZEFtb3VudFByZXZpZXcgPVxyXG4gICAgaXNFZGl0aW5nICYmIGRyYWZ0UXR5VmFsdWUgIT0gbnVsbCAmJiBkcmFmdFByaWNlVmFsdWUgIT0gbnVsbCAmJiBkcmFmdFByaWNlVmFsdWUgIT09IDBcclxuICAgICAgPyByZXNvbHZlVGlja2V0TGluZUFtb3VudCh7IHF0eTogZHJhZnRRdHlWYWx1ZSwgcHJpY2U6IGRyYWZ0UHJpY2VWYWx1ZSB9KVxyXG4gICAgICA6IGxpbmU/LnRvdGFsQW1vdW50ID8/IG51bGw7XHJcbiAgY29uc3QgYW1vdW50VGV4dCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koY2FsY3VsYXRlZEFtb3VudFByZXZpZXcsIHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSksXHJcbiAgICBbY2FsY3VsYXRlZEFtb3VudFByZXZpZXcsIGhlYWRlcj8uY3VycmVuY3lDb2RlXVxyXG4gICk7XHJcbiAgY29uc3QgcHJpY2VUZXh0ID0gdXNlTWVtbyhcclxuICAgICgpID0+IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShsaW5lPy5wcmljZSA/PyBudWxsLCBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSkpLFxyXG4gICAgW2hlYWRlcj8uY3VycmVuY3lDb2RlLCBsaW5lPy5wcmljZV1cclxuICApO1xyXG4gIGNvbnN0IGlzQXNzaWduZWRUaWNrZXQgPSBoZWFkZXI/LnN0YXR1cyA9PT0gMTtcclxuICBjb25zdCBpc0NvbnRleHRMb2NrZWQgPSAoaXNBc3NpZ25lZFRpY2tldCAmJiAhYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCkgfHwgKCEhbGlua2VkRXhwZW5zZVNoZWV0SWQgJiYgbGlua1NoZWV0TG9ja2VkKTtcclxuICBjb25zdCB0aWNrZXREZXRhaWxVcmwgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IHNhZmVGaWxlSWQgPSBzYWZlVGV4dChmaWxlSWQpO1xyXG4gICAgaWYgKCFzYWZlRmlsZUlkKSByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgIGZpbGVJZDogc2FmZUZpbGVJZCxcclxuICAgIH0pO1xyXG4gICAgYXBwZW5kRXhwZW5zZVRpY2tldFJldHVyblF1ZXJ5KHF1ZXJ5LCB0aWNrZXRSZXR1cm5Db250ZXh0KTtcclxuICAgIHJldHVybiBgL0dhc3Rvcy9UaWNrZXREZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWA7XHJcbiAgfSwgW2ZpbGVJZCwgdGlja2V0UmV0dXJuQ29udGV4dF0pO1xyXG4gIGNvbnN0IHRpY2tldERldGFpbEVkaXRVcmwgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IHNhZmVGaWxlSWQgPSBzYWZlVGV4dChmaWxlSWQpO1xyXG4gICAgaWYgKCFzYWZlRmlsZUlkKSByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgIGZpbGVJZDogc2FmZUZpbGVJZCxcclxuICAgICAgbW9kZTogXCJlZGl0XCIsXHJcbiAgICB9KTtcclxuICAgIGFwcGVuZEV4cGVuc2VUaWNrZXRSZXR1cm5RdWVyeShxdWVyeSwgdGlja2V0UmV0dXJuQ29udGV4dCk7XHJcbiAgICByZXR1cm4gYC9HYXN0b3MvVGlja2V0RGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gO1xyXG4gIH0sIFtmaWxlSWQsIHRpY2tldFJldHVybkNvbnRleHRdKTtcclxuICBjb25zdCBwcmVmZXJyZWRUaWNrZXREZXRhaWxVcmwgPSBwZW5kaW5nRmlyc3RMaW5rID8gdGlja2V0RGV0YWlsRWRpdFVybCA6IHRpY2tldERldGFpbFVybDtcclxuXHJcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghc2hvdWxkQmxvY2tXb3JrZmxvd0V4aXQgfHwgIXByZWZlcnJlZFRpY2tldERldGFpbFVybCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYmFja0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsQmFja0J0blwiKTtcclxuICAgIGNvbnN0IGhhbmRsZVRvcGJhckJhY2sgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24/LigpO1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChwcmVmZXJyZWRUaWNrZXREZXRhaWxVcmwsIHtcclxuICAgICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxyXG4gICAgICAgIGJ5cGFzc0d1YXJkT25jZTogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgaGFuZGxlTmF0aXZlQmFjayA9IChldmVudDogUG9wU3RhdGVFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQ/LnN0YXRlICYmIGV2ZW50LnN0YXRlLmluZFRyYXAgPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShwcmVmZXJyZWRUaWNrZXREZXRhaWxVcmwpO1xyXG4gICAgfTtcclxuXHJcbiAgICBiYWNrQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlVG9wYmFyQmFjaywgdHJ1ZSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGhhbmRsZU5hdGl2ZUJhY2spO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgYmFja0J1dHRvbj8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVRvcGJhckJhY2ssIHRydWUpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGhhbmRsZU5hdGl2ZUJhY2spO1xyXG4gICAgfTtcclxuICB9LCBbcHJlZmVycmVkVGlja2V0RGV0YWlsVXJsLCBzaG91bGRCbG9ja1dvcmtmbG93RXhpdF0pO1xyXG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXHJcbiAgfSk7XHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm0sIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1c10pO1xyXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XHJcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcclxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxyXG4gICAgOiAhYnVzeSAmJiBtb2RhbEVycm9yXHJcbiAgICAgID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpXHJcbiAgICAgIDogbW9kYWwuY29uZmlybVRleHQgfHwgaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIik7XHJcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghc2hvdWxkQmxvY2tXb3JrZmxvd0V4aXQgfHwgYnVzeSkgcmV0dXJuO1xyXG4gICAgaWYgKCF3b3JrZmxvd0Jsb2NrZWRNZXNzYWdlIHx8IHN0YXR1cyA9PT0gd29ya2Zsb3dCbG9ja2VkTWVzc2FnZSkgcmV0dXJuO1xyXG4gICAgc2V0U3RhdHVzKHdvcmtmbG93QmxvY2tlZE1lc3NhZ2UpO1xyXG4gIH0sIFtidXN5LCBzZXRTdGF0dXMsIHNob3VsZEJsb2NrV29ya2Zsb3dFeGl0LCBzdGF0dXMsIHdvcmtmbG93QmxvY2tlZE1lc3NhZ2VdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZvaWQgaGFuZGxlTW9kYWxDb25maXJtKCk7XHJcbiAgfSwgW2J1c3ksIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtLCBtb2RhbEVycm9yXSk7XHJcbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdEluQ29udGV4dCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgIGhhbmRsZUNhbmNlbEVkaXQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghcHJlZmVycmVkVGlja2V0RGV0YWlsVXJsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChwcmVmZXJyZWRUaWNrZXREZXRhaWxVcmwsIHtcclxuICAgICAgYXNrQ29uZmlybWF0aW9uOiAhc2hvdWxkQmxvY2tXb3JrZmxvd0V4aXQsXHJcbiAgICAgIGJ5cGFzc0d1YXJkT25jZTogc2hvdWxkQmxvY2tXb3JrZmxvd0V4aXQsXHJcbiAgICB9KTtcclxuICB9LCBbaGFuZGxlQ2FuY2VsRWRpdCwgaXNDcmVhdGVNb2RlLCBwcmVmZXJyZWRUaWNrZXREZXRhaWxVcmwsIHNob3VsZEJsb2NrV29ya2Zsb3dFeGl0XSk7XHJcbiAgY29uc3QgeyBoYW5kbGVVcGRhdGUsIGhhbmRsZURlbGV0ZSB9ID0gdXNlRXhwZW5zZVRpY2tldExpbmVEZXRhaWxNdXRhdGlvbnMoe1xyXG4gICAgYnVzeSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGNhbkNyZWF0ZVRpY2tldDogY2FuQ3JlYXRlVGlja2V0TGluZSAmJiBjYW5DcmVhdGVMaW5rZWRUaWNrZXRMaW5lLFxyXG4gICAgY2FuRWRpdFRpY2tldDogY2FuRWRpdFRpY2tldCAmJiBjYW5FZGl0TGlua2VkVGlja2V0LFxyXG4gICAgY2FuRGVsZXRlVGlja2V0OiBjYW5EZWxldGVUaWNrZXQgJiYgY2FuRWRpdExpbmtlZFRpY2tldCxcclxuICAgIGZpbGVJZCxcclxuICAgIGxpbmVSZWNJZCxcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdFF0eSxcclxuICAgIGRyYWZ0UHJpY2UsXHJcbiAgICBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHNraXBMaW5rZWRTaGVldFN5bmNPbkNyZWF0ZTogcGVuZGluZ0ZpcnN0TGluayxcclxuICAgIG9uTGlua2VkU2hlZXRTeW5jRmFpbHVyZTogKG1lc3NhZ2UpID0+IHtcclxuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgfSxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gIH0pO1xyXG4gIHVzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9ucyh7XHJcbiAgICBidXN5LFxyXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNMb2NrZWQ6IGlzQ29udGV4dExvY2tlZCB8fCBpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgcGVybWlzc2lvbnNSZWFkeTogbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gICAgY2FuQ3JlYXRlVGlja2V0OiBjYW5DcmVhdGVUaWNrZXRMaW5lICYmIGNhbkNyZWF0ZUxpbmtlZFRpY2tldExpbmUsXHJcbiAgICBjYW5FZGl0VGlja2V0OiBjYW5FZGl0VGlja2V0ICYmIGNhbkVkaXRMaW5rZWRUaWNrZXQsXHJcbiAgICBjYW5EZWxldGVUaWNrZXQ6IGNhbkRlbGV0ZVRpY2tldCAmJiBjYW5FZGl0TGlua2VkVGlja2V0LFxyXG4gICAgZmlsZUlkLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQ6IGhhbmRsZUVuYWJsZUVkaXRJbkNvbnRleHQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0OiBoYW5kbGVDYW5jZWxFZGl0SW5Db250ZXh0LFxyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgb25TYXZlU3VjY2VzczogKCkgPT4ge1xyXG4gICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgICAgY29uc3QgcmV0dXJuVXJsID0gcmVhZEV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZShmaWxlSWQpID8gdGlja2V0RGV0YWlsRWRpdFVybCA6IHByZWZlcnJlZFRpY2tldERldGFpbFVybDtcclxuICAgICAgICBpZiAoIXJldHVyblVybCkgcmV0dXJuO1xyXG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHJldHVyblVybCwge1xyXG4gICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcclxuICAgICAgICAgIGJ5cGFzc0d1YXJkT25jZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlbG9hZEV4cGVuc2VQYWdlKCk7XHJcbiAgICB9LFxyXG4gICAgb25EZWxldGVTdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgIGlmICghcHJlZmVycmVkVGlja2V0RGV0YWlsVXJsKSByZXR1cm47XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHByZWZlcnJlZFRpY2tldERldGFpbFVybCwge1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG1vZGFsLFxyXG4gICAgbW9kYWxDb25maXJtVGV4dCxcclxuICAgIG1vZGFsQ2FuY2VsVGV4dCxcclxuICAgIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgICBidXN5LFxyXG4gICAgbW9kYWxFcnJvcixcclxuICAgIHN0YXR1cyxcclxuICAgIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGhlYWRlcixcclxuICAgIGxpbmUsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRRdHksXHJcbiAgICBkcmFmdFByaWNlLFxyXG4gICAgcHJpY2VUZXh0LFxyXG4gICAgYW1vdW50VGV4dCxcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBzZXREcmFmdFF0eSxcclxuICAgIHNldERyYWZ0UHJpY2UsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsQ29udGVudCA9ICgpID0+IHtcclxuICBjb25zdCB2aWV3ID0gdXNlRXhwZW5zZVRpY2tldExpbmVEZXRhaWxWaWV3TW9kZWwoKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0TGluZURldGFpbE1vZGFsXHJcbiAgICAgICAgbW9kYWw9e3ZpZXcubW9kYWx9XHJcbiAgICAgICAgY29uZmlybVRleHQ9e3ZpZXcubW9kYWxDb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXt2aWV3Lm1vZGFsQ2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17dmlldy5tb2RhbExvYWRpbmdUZXh0fVxyXG4gICAgICAgIGJ1c3k9e3ZpZXcuYnVzeX1cclxuICAgICAgICBlcnJvcj17dmlldy5tb2RhbEVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17dmlldy5zdGF0dXN9XHJcbiAgICAgICAgb25Db25maXJtPXt2aWV3LmhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17dmlldy5jbG9zZUNvbmZpcm19XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICA8RXhwZW5zZVRpY2tldExpbmVEZXRhaWxMb2FkZXIgaXNMb2FkaW5nPXt2aWV3LmlzTG9hZGluZ30gLz5cclxuXHJcbiAgICAgIHt2aWV3LmVycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57dmlldy5lcnJvck1lc3NhZ2V9PC9kaXY+IDogbnVsbH1cclxuXHJcbiAgICAgIHshdmlldy5pc0xvYWRpbmcgJiYgIXZpZXcuZXJyb3JNZXNzYWdlICYmIHZpZXcuaGVhZGVyICYmICh2aWV3LmxpbmUgfHwgdmlldy5pc0NyZWF0ZU1vZGUpID8gKFxyXG4gICAgICAgIDxFeHBlbnNlVGlja2V0TGluZURldGFpbEZvcm1cclxuICAgICAgICAgIGhlYWRlcj17dmlldy5oZWFkZXJ9XHJcbiAgICAgICAgICBsaW5lPXt2aWV3LmxpbmV9XHJcbiAgICAgICAgICBpc0VkaXRpbmc9e3ZpZXcuaXNFZGl0aW5nfVxyXG4gICAgICAgICAgZHJhZnREZXNjcmlwdGlvbj17dmlldy5kcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgZHJhZnRRdHk9e3ZpZXcuZHJhZnRRdHl9XHJcbiAgICAgICAgICBkcmFmdFByaWNlPXt2aWV3LmRyYWZ0UHJpY2V9XHJcbiAgICAgICAgICBwcmljZVRleHQ9e3ZpZXcucHJpY2VUZXh0fVxyXG4gICAgICAgICAgYW1vdW50VGV4dD17dmlldy5hbW91bnRUZXh0fVxyXG4gICAgICAgICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlPXt2aWV3LnNldERyYWZ0RGVzY3JpcHRpb259XHJcbiAgICAgICAgICBvbkRyYWZ0UXR5Q2hhbmdlPXt2aWV3LnNldERyYWZ0UXR5fVxyXG4gICAgICAgICAgb25EcmFmdFByaWNlQ2hhbmdlPXt2aWV3LnNldERyYWZ0UHJpY2V9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gTWFpbiBwYWdlIGVudHJ5IGZvciB0aWNrZXQgbGluZSBkZXRhaWwuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsUGFnZSA9ICgpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzIGVuYWJsZUV4cGVuc2VNYW5hZ2VtZW50PlxyXG4gICAgICA8RXhwZW5zZVRpY2tldExpbmVEZXRhaWxDb250ZW50IC8+XHJcbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS10aWNrZXQtbGluZS1kZXRhaWwtcm9vdFwiKTtcclxuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xyXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVRpY2tldExpbmVEZXRhaWxQYWdlIC8+KTtcclxufTtcclxuXHJcbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldExpbmVEZXRhaWxQYWdlO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLCBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyLCBmb3JtYXRFeHBlbnNlTnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VSZWFkT25seUZpZWxkIGZyb20gXCIuL0V4cGVuc2VSZWFkT25seUZpZWxkLnRzeFwiO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0TGluZURldGFpbEZvcm1Qcm9wcyA9IHtcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXI7XHJcbiAgbGluZTogRXhwZW5zZVRpY2tldERldGFpbExpbmUgfCBudWxsO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZHJhZnRRdHk6IHN0cmluZztcclxuICBkcmFmdFByaWNlOiBzdHJpbmc7XHJcbiAgcHJpY2VUZXh0OiBzdHJpbmc7XHJcbiAgYW1vdW50VGV4dDogc3RyaW5nO1xyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdFF0eUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdFByaWNlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdFF0eVZhbHVlID0gKHZhbHVlOiBudW1iZXIgfCBudWxsKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gZm9ybWF0RXhwZW5zZU51bWJlcih2YWx1ZSwge1xyXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICBmYWxsYmFjazogXCItXCIsXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBSZWFkLW9ubHkgYW5kIGVkaXRhYmxlIGZvcm0gcmVuZGVyZXIgZm9yIG9uZSB0aWNrZXQgbGluZS5cclxuY29uc3QgRXhwZW5zZVRpY2tldExpbmVEZXRhaWxGb3JtID0gKHtcclxuICBoZWFkZXIsXHJcbiAgbGluZSxcclxuICBpc0VkaXRpbmcsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkcmFmdFF0eSxcclxuICBkcmFmdFByaWNlLFxyXG4gIHByaWNlVGV4dCxcclxuICBhbW91bnRUZXh0LFxyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZSxcclxuICBvbkRyYWZ0UXR5Q2hhbmdlLFxyXG4gIG9uRHJhZnRQcmljZUNoYW5nZSxcclxufTogRXhwZW5zZVRpY2tldExpbmVEZXRhaWxGb3JtUHJvcHMpID0+IHtcclxuICBjb25zdCBxdWFudGl0eUZpZWxkID0gaXNFZGl0aW5nID8gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxyXG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfTwvbGFiZWw+XHJcbiAgICAgIDxpbnB1dFxyXG4gICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCB0ZXh0LXJpZ2h0IHRhYnVsYXItbnVtc1wiXHJcbiAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgIGlucHV0TW9kZT1cImRlY2ltYWxcIlxyXG4gICAgICAgIHZhbHVlPXtkcmFmdFF0eX1cclxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0UXR5Q2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cclxuICAgICAgICBvbkJsdXI9eyhldmVudCkgPT5cclxuICAgICAgICAgIG9uRHJhZnRRdHlDaGFuZ2UoXHJcbiAgICAgICAgICAgIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihldmVudC50YXJnZXQudmFsdWUsIHtcclxuICAgICAgICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9RdHlcIiwgXCJRdWFudGl0eVwiKX1cclxuICAgICAgLz5cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfVxyXG4gICAgICB2YWx1ZT17Zm9ybWF0UXR5VmFsdWUobGluZT8ucXR5ID8/IG51bGwpfVxyXG4gICAgICB2YWx1ZUFsaWduPVwicmlnaHRcIlxyXG4gICAgLz5cclxuICApO1xyXG4gIGNvbnN0IHByaWNlRmllbGQgPSBpc0VkaXRpbmcgPyAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XHJcbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJpY2VcIiwgXCJQcmljZVwiKX08L2xhYmVsPlxyXG4gICAgICA8aW5wdXRcclxuICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgdGV4dC1yaWdodCB0YWJ1bGFyLW51bXNcIlxyXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICBpbnB1dE1vZGU9XCJkZWNpbWFsXCJcclxuICAgICAgICB2YWx1ZT17ZHJhZnRQcmljZX1cclxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0UHJpY2VDaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxyXG4gICAgICAgIG9uQmx1cj17KGV2ZW50KSA9PlxyXG4gICAgICAgICAgb25EcmFmdFByaWNlQ2hhbmdlKFxyXG4gICAgICAgICAgICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICBmYWxsYmFjazogXCJcIixcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJpY2VcIiwgXCJQcmljZVwiKX1cclxuICAgICAgLz5cclxuICAgIDwvZGl2PlxyXG4gICkgOiAoXHJcbiAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1ByaWNlXCIsIFwiUHJpY2VcIil9XHJcbiAgICAgIHZhbHVlPXtwcmljZVRleHQgfHwgXCItXCJ9XHJcbiAgICAgIHZhbHVlQWxpZ249XCJyaWdodFwiXHJcbiAgICAvPlxyXG4gICk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzcGFjZS15LTBcIj5cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicmVsYXRpdmUgc2hhZG93LXhzIGdsYXNzLXBhbmVsIHAtNCBzcGFjZS15LTQgYm9yZGVyIGJvcmRlci1bI2UyZThmMF0gcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV1cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmllbGRfRmlsZUlkXCIsIFwiVGlja2V0IElkLlwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2hlYWRlci5maWxlSWQgfHwgXCItXCJ9XHJcbiAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cclxuICAgICAgICAgICAgICB2YWx1ZT17bGluZT8uZGVzY3JpcHRpb24gfHwgXCItXCJ9XHJcbiAgICAgICAgICAgICAgZnVsbFdpZHRoXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMyBtZDpjb2wtc3Bhbi0yIG1kOmdhcC00XCI+XHJcbiAgICAgICAgICAgIHtxdWFudGl0eUZpZWxkfVxyXG4gICAgICAgICAgICB7cHJpY2VGaWVsZH1cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQW1vdW50XCIsIFwiQW1vdW50XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17YW1vdW50VGV4dCB8fCBcIi1cIn1cclxuICAgICAgICAgICAgdmFsdWVBbGlnbj1cInJpZ2h0XCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldExpbmVEZXRhaWxGb3JtO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24sIHBhcnNlRGVjaW1hbElucHV0IH0gZnJvbSBcIi4uLy4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHN5bmNFeHBlbnNlTGlua2VkVGlja2V0U2hlZXRMaW5lIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VMaW5rZWRUaWNrZXRTaGVldFN5bmMudHNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZUV4cGVuc2VTaGVldEVkaXRBY2Nlc3MgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVNoZWV0RWRpdEFjY2Vzcy50c1wiO1xyXG5pbXBvcnQgeyBjbGVhckV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZSwgc2F2ZUV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0TGluZSwgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0TGluZSwgdXBkYXRlRXhwZW5zZVNoZWV0VGlja2V0TGluZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IGlzVmFsaWRUaWNrZXRMaW5lQW1vdW50LCByZXNvbHZlVGlja2V0TGluZUFtb3VudCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVGlja2V0TGluZUFtb3VudC50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0TGluZURldGFpbE11dGF0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIGNhbkNyZWF0ZVRpY2tldDogYm9vbGVhbjtcclxuICBjYW5FZGl0VGlja2V0OiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZVRpY2tldDogYm9vbGVhbjtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBsaW5lUmVjSWQ6IHN0cmluZztcclxuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZHJhZnRRdHk6IHN0cmluZztcclxuICBkcmFmdFByaWNlOiBzdHJpbmc7XHJcbiAgbGlua2VkRXhwZW5zZVNoZWV0SWQ/OiBzdHJpbmc7XHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcclxuICBjYW5NYW5hZ2VPdGhlclVzZXJzOiBib29sZWFuO1xyXG4gIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nO1xyXG4gIGN1cnJlbnRDcm1Vc2VySWQ6IHN0cmluZztcclxuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQ6IHN0cmluZztcclxuICBza2lwTGlua2VkU2hlZXRTeW5jT25DcmVhdGU/OiBib29sZWFuO1xyXG4gIG9uTGlua2VkU2hlZXRTeW5jRmFpbHVyZT86IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzPzogKCkgPT4gdm9pZDtcclxuICBzZXRNb2RhbEVycm9yOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRJc0VkaXRpbmc6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxufTtcclxuXHJcbi8vIEVuY2Fwc3VsYXRlcyB1cGRhdGUgYW5kIGRlbGV0ZSBtdXRhdGlvbnMgZm9yIHRpY2tldCBsaW5lIGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsTXV0YXRpb25zID0gKHtcclxuICBidXN5LFxyXG4gIGlzRWRpdGluZyxcclxuICBpc0NyZWF0ZU1vZGUsXHJcbiAgY2FuQ3JlYXRlVGlja2V0LFxyXG4gIGNhbkVkaXRUaWNrZXQsXHJcbiAgY2FuRGVsZXRlVGlja2V0LFxyXG4gIGZpbGVJZCxcclxuICBsaW5lUmVjSWQsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkcmFmdFF0eSxcclxuICBkcmFmdFByaWNlLFxyXG4gIGxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICBjdXJyZW50QXhVc2VySWQsXHJcbiAgY3VycmVudENybVVzZXJJZCxcclxuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgc2tpcExpbmtlZFNoZWV0U3luY09uQ3JlYXRlID0gZmFsc2UsXHJcbiAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlLFxyXG4gIG9uTGlua2VkU2hlZXRTeW5jU3VjY2VzcyxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIHNldEJ1c3ksXHJcbiAgc2V0U3RhdHVzLFxyXG4gIHNldElzRWRpdGluZyxcclxufTogVXNlRXhwZW5zZVRpY2tldExpbmVEZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XHJcbiAgY29uc3QgdmFsaWRhdGVMaW5rZWRTaGVldEJlZm9yZU11dGF0aW9uID0gdXNlQ2FsbGJhY2soYXN5bmMgKCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4gPT4ge1xyXG4gICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChsaW5rZWRFeHBlbnNlU2hlZXRJZCk7XHJcbiAgICBpZiAoIXNhZmVTaGVldElkKSB7XHJcbiAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFjY2Vzc1Jlc3VsdCA9IGF3YWl0IHJlc29sdmVFeHBlbnNlU2hlZXRFZGl0QWNjZXNzKHtcclxuICAgICAgc2hlZXRJZDogc2FmZVNoZWV0SWQsXHJcbiAgICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgICAgY3VycmVudENybVVzZXJJZCxcclxuICAgICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgIH0pO1xyXG4gICAgaWYgKCFhY2Nlc3NSZXN1bHQuaXNMb2NrZWQpIHtcclxuICAgICAgcmV0dXJuIHNhZmVTaGVldElkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1lc3NhZ2UgPVxyXG4gICAgICBzYWZlVGV4dChhY2Nlc3NSZXN1bHQuYmxvY2tlZE1lc3NhZ2UpIHx8XHJcbiAgICAgIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9SZWFkT25seUJ5U3RhdHVzXCIsIFwiTm8gc2UgcHVlZGUgZWRpdGFyIGVzdGEgaG9qYSBkZSBnYXN0b3MgZW4gZWwgZXN0YWRvIGFjdHVhbC5cIik7XHJcbiAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSwgW1xyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgbGlua2VkRXhwZW5zZVNoZWV0SWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBjYW5Qcm9jZWVkID0gaXNDcmVhdGVNb2RlID8gY2FuQ3JlYXRlVGlja2V0IDogY2FuRWRpdFRpY2tldDtcclxuICAgIGlmICghY2FuUHJvY2VlZCkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBub3JtYWxpemVkRGVzY3JpcHRpb24gPSBTdHJpbmcoZHJhZnREZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XHJcbiAgICBjb25zdCBwYXJzZWRRdHkgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFF0eSk7XHJcbiAgICBjb25zdCBwYXJzZWRQcmljZSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0UHJpY2UpO1xyXG4gICAgY29uc3QgcGFyc2VkTGluZSA9IHtcclxuICAgICAgcXR5OiBwYXJzZWRRdHksXHJcbiAgICAgIHByaWNlOiBwYXJzZWRQcmljZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBsaW5lQW1vdW50ID0gcmVzb2x2ZVRpY2tldExpbmVBbW91bnQocGFyc2VkTGluZSk7XHJcblxyXG4gICAgaWYgKCFub3JtYWxpemVkRGVzY3JpcHRpb24gfHwgIWlzVmFsaWRUaWNrZXRMaW5lQW1vdW50KHBhcnNlZExpbmUpIHx8IGxpbmVBbW91bnQgPT09IG51bGwpIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXHJcbiAgICAgICAgXCJFeHBlbnNlVGlja2V0c19MaW5lX1ZhbGlkYXRpb25fQW1vdW50UXR5XCIsXHJcbiAgICAgICAgXCJMYSBjYW50aWRhZCBubyBwdWVkZSBzZXIgbmVnYXRpdmEsIGVsIHByZWNpbyBubyBwdWVkZSBzZXIgMCB5IGxhIGNhbnRpZGFkIDAgc29sbyBzZSBwZXJtaXRlIGVuIGRlc2N1ZW50b3MgbmVnYXRpdm9zLlwiXHJcbiAgICAgICk7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZhbGlkYXRlZFNoZWV0SWQgPSBhd2FpdCB2YWxpZGF0ZUxpbmtlZFNoZWV0QmVmb3JlTXV0YXRpb24oKTtcclxuICAgIGlmICh2YWxpZGF0ZWRTaGVldElkID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcclxuICAgICAgc3RhcnRTdGF0dXM6IGlzQ3JlYXRlTW9kZVxyXG4gICAgICAgID8gaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfQ3JlYXRpbmdcIiwgXCJDcmVhdGluZyBleHBlbnNlIGxpbmUuLi5cIilcclxuICAgICAgICA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgZXhwZW5zZSBsaW5lLi4uXCIpLFxyXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKSxcclxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xyXG4gICAgICAgICAgZGVzY3JpcHRpb246IG5vcm1hbGl6ZWREZXNjcmlwdGlvbixcclxuICAgICAgICAgIHF0eTogTnVtYmVyKHBhcnNlZFF0eSksXHJcbiAgICAgICAgICBwcmljZTogTnVtYmVyKHBhcnNlZFByaWNlKSxcclxuICAgICAgICAgIHRvdGFsQW1vdW50OiBOdW1iZXIobGluZUFtb3VudCksXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGlzQ3JlYXRlTW9kZVxyXG4gICAgICAgICAgPyBhd2FpdCBjcmVhdGVFeHBlbnNlU2hlZXRUaWNrZXRMaW5lKGZpbGVJZCwgcGF5bG9hZClcclxuICAgICAgICAgIDogYXdhaXQgdXBkYXRlRXhwZW5zZVNoZWV0VGlja2V0TGluZShmaWxlSWQsIGxpbmVSZWNJZCwgcGF5bG9hZCk7XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWxpZGF0ZWRTaGVldElkICYmICEoaXNDcmVhdGVNb2RlICYmIHNraXBMaW5rZWRTaGVldFN5bmNPbkNyZWF0ZSkpIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHN5bmNFeHBlbnNlTGlua2VkVGlja2V0U2hlZXRMaW5lKHtcclxuICAgICAgICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgICAgICAgc2hlZXRJZDogdmFsaWRhdGVkU2hlZXRJZCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKCk7XHJcbiAgICAgICAgICAgIG9uTGlua2VkU2hlZXRTeW5jU3VjY2Vzcz8uKCk7XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID1cclxuICAgICAgICAgICAgICBlcnJvciBpbnN0YW5jZW9mIEVycm9yXHJcbiAgICAgICAgICAgICAgICA/IGVycm9yLm1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIDogaW5kVChcclxuICAgICAgICAgICAgICAgICAgICBcIkV4cGVuc2VUaWNrZXRzX1NoZWV0U3luY19SZXRyeVJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJUaWNrZXQgZGF0YSBjaGFuZ2VkLCBidXQgd2UgY291bGQgbm90IHN5bmMgdGhlIGV4cGVuc2UgbGluZS4gU2F2ZSBhZ2FpbiBiZWZvcmUgbGVhdmluZy5cIlxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBzYXZlRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKHtcclxuICAgICAgICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgICAgICAgc2hlZXRJZDogdmFsaWRhdGVkU2hlZXRJZCxcclxuICAgICAgICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlPy4obWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGlmICghaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKCk7XHJcbiAgICAgICAgICBvbkxpbmtlZFNoZWV0U3luY1N1Y2Nlc3M/LigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0U3RhdHVzKFxyXG4gICAgICAgICAgaXNDcmVhdGVNb2RlXHJcbiAgICAgICAgICAgID8gaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfQ3JlYXRlZFwiLCBcIkV4cGVuc2UgbGluZSBjcmVhdGVkXCIpXHJcbiAgICAgICAgICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2UgbGluZSB1cGRhdGVkXCIpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoIWlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xyXG4gIH0sIFtcclxuICAgIGJ1c3ksXHJcbiAgICBjYW5DcmVhdGVUaWNrZXQsXHJcbiAgICBjYW5FZGl0VGlja2V0LFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0UHJpY2UsXHJcbiAgICBkcmFmdFF0eSxcclxuICAgIGZpbGVJZCxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGxpbmVSZWNJZCxcclxuICAgIG9uTGlua2VkU2hlZXRTeW5jRmFpbHVyZSxcclxuICAgIG9uTGlua2VkU2hlZXRTeW5jU3VjY2VzcyxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2tpcExpbmtlZFNoZWV0U3luY09uQ3JlYXRlLFxyXG4gICAgdmFsaWRhdGVMaW5rZWRTaGVldEJlZm9yZU11dGF0aW9uLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5EZWxldGVUaWNrZXQpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmFsaWRhdGVkU2hlZXRJZCA9IGF3YWl0IHZhbGlkYXRlTGlua2VkU2hlZXRCZWZvcmVNdXRhdGlvbigpO1xyXG4gICAgaWYgKHZhbGlkYXRlZFNoZWV0SWQgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBleHBlbnNlIGxpbmUuLi5cIiksXHJcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRXJyb3JcIiwgXCJEZWxldGUgZXJyb3IuXCIpLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRCdXN5LFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0TGluZShmaWxlSWQsIGxpbmVSZWNJZCk7XHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZhbGlkYXRlZFNoZWV0SWQpIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHN5bmNFeHBlbnNlTGlua2VkVGlja2V0U2hlZXRMaW5lKHtcclxuICAgICAgICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgICAgICAgc2hlZXRJZDogdmFsaWRhdGVkU2hlZXRJZCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKCk7XHJcbiAgICAgICAgICAgIG9uTGlua2VkU2hlZXRTeW5jU3VjY2Vzcz8uKCk7XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID1cclxuICAgICAgICAgICAgICBlcnJvciBpbnN0YW5jZW9mIEVycm9yXHJcbiAgICAgICAgICAgICAgICA/IGVycm9yLm1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIDogaW5kVChcclxuICAgICAgICAgICAgICAgICAgICBcIkV4cGVuc2VUaWNrZXRzX1NoZWV0U3luY19SZXRyeVJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJUaWNrZXQgZGF0YSBjaGFuZ2VkLCBidXQgd2UgY291bGQgbm90IHN5bmMgdGhlIGV4cGVuc2UgbGluZS4gU2F2ZSBhZ2FpbiBiZWZvcmUgbGVhdmluZy5cIlxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBzYXZlRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKHtcclxuICAgICAgICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgICAgICAgc2hlZXRJZDogdmFsaWRhdGVkU2hlZXRJZCxcclxuICAgICAgICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlPy4obWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9EZWxldGVkXCIsIFwiRXhwZW5zZSBsaW5lIGRlbGV0ZWRcIikpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICB9LCBbXHJcbiAgICBidXN5LFxyXG4gICAgY2FuRGVsZXRlVGlja2V0LFxyXG4gICAgZmlsZUlkLFxyXG4gICAgbGluZVJlY0lkLFxyXG4gICAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlLFxyXG4gICAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICB2YWxpZGF0ZUxpbmtlZFNoZWV0QmVmb3JlTXV0YXRpb24sXHJcbiAgXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHtcclxuICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXHJcbiAgbmF2aWdhdGVUb0V4cGVuc2VVcmwsXHJcbiAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIG1hcEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIsXHJcbiAgbWFwRXhwZW5zZVRpY2tldERldGFpbExpbmUsXHJcbiAgdHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLFxyXG4gIHR5cGUgRXhwZW5zZVRpY2tldERldGFpbExpbmUsXHJcbn0gZnJvbSBcIi4uL2RldGFpbC9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldExpbmVEZXRhaWxTdGF0ZUFyZ3MgPSB7XHJcbiAgaGFzQWNjZXNzOiBib29sZWFuO1xyXG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcclxuICBjYW5FZGl0VGlja2V0OiBib29sZWFuO1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGxpbmVSZWNJZDogc3RyaW5nO1xyXG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gT3ducyBzdGF0ZSBhbmQgYmVoYXZpb3IgZm9yIHRpY2tldCBsaW5lIGRldGFpbCBwYWdlIChyZWFkIGFuZCBlZGl0KS5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsU3RhdGUgPSAoe1xyXG4gIGhhc0FjY2VzcyxcclxuICBpc0NyZWF0ZU1vZGUsXHJcbiAgY2FuRWRpdFRpY2tldCxcclxuICBmaWxlSWQsXHJcbiAgbGluZVJlY0lkLFxyXG4gIG9uRm9yYmlkZGVuLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0TGluZURldGFpbFN0YXRlQXJncykgPT4ge1xyXG4gIGNvbnN0IFtoZWFkZXIsIHNldEhlYWRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2xpbmUsIHNldExpbmVdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldERldGFpbExpbmUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtpc0VkaXRpbmcsIHNldElzRWRpdGluZ10gPSB1c2VTdGF0ZSgoKSA9PiBpc0NyZWF0ZU1vZGUpO1xyXG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdERlc2NyaXB0aW9uLCBzZXREcmFmdERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdFF0eSwgc2V0RHJhZnRRdHldID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0UHJpY2UsIHNldERyYWZ0UHJpY2VdID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIGNvbnN0IGh5ZHJhdGVEcmFmdEZyb21MaW5lID0gdXNlQ2FsbGJhY2soKG5leHRMaW5lOiBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB8IG51bGwpID0+IHtcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24oc2FmZVRleHQobmV4dExpbmU/LmRlc2NyaXB0aW9uKSk7XHJcbiAgICBzZXREcmFmdFF0eShcclxuICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKG5leHRMaW5lPy5xdHksIHtcclxuICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICAgIHNldERyYWZ0UHJpY2UoXHJcbiAgICAgIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihuZXh0TGluZT8ucHJpY2UsIHtcclxuICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBsb2FkRGV0YWlsID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBpZiAoIWhhc0FjY2Vzcykge1xyXG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWZpbGVJZCB8fCAoIWlzQ3JlYXRlTW9kZSAmJiAhbGluZVJlY0lkKSkge1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiVGlja2V0c19EZXRhaWxfTm90Rm91bmRcIiwgXCJUaWNrZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXQoZmlsZUlkLCB7XHJcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlPy5NZXNzYWdlIHx8IGluZFQoXCJUaWNrZXRzX0RldGFpbF9Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXQgZGV0YWlsLlwiKSk7XHJcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGlja2V0ID1cclxuICAgICAgICAgIGl0ZW1zLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uRmlsZUlkKS50b1VwcGVyQ2FzZSgpID09PSBmaWxlSWQudG9VcHBlckNhc2UoKSkgfHwgaXRlbXNbMF0gfHwgbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKCFzZWxlY3RlZFRpY2tldCkge1xyXG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJUaWNrZXRzX0RldGFpbF9Ob3RGb3VuZFwiLCBcIlRpY2tldCB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWFwcGVkSGVhZGVyID0gbWFwRXhwZW5zZVRpY2tldERldGFpbEhlYWRlcihzZWxlY3RlZFRpY2tldCk7XHJcbiAgICAgICAgY29uc3QgbWFwcGVkTGluZXMgPSAoQXJyYXkuaXNBcnJheShzZWxlY3RlZFRpY2tldC5MaW5lcykgPyBzZWxlY3RlZFRpY2tldC5MaW5lcyA6IFtdKS5tYXAoKGVudHJ5KSA9PlxyXG4gICAgICAgICAgbWFwRXhwZW5zZVRpY2tldERldGFpbExpbmUoZW50cnkpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgICAgICBzZXRIZWFkZXIobWFwcGVkSGVhZGVyKTtcclxuICAgICAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzZWxlY3RlZExpbmUgPVxyXG4gICAgICAgICAgbWFwcGVkTGluZXMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5LnJlY0lkKS50b1VwcGVyQ2FzZSgpID09PSBsaW5lUmVjSWQudG9VcHBlckNhc2UoKSkgfHwgbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKCFzZWxlY3RlZExpbmUpIHtcclxuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiVGlja2V0c19EZXRhaWxfTm90Rm91bmRcIiwgXCJUaWNrZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgICAgc2V0SGVhZGVyKG1hcHBlZEhlYWRlcik7XHJcbiAgICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0SGVhZGVyKG1hcHBlZEhlYWRlcik7XHJcbiAgICAgICAgc2V0TGluZShzZWxlY3RlZExpbmUpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiVGlja2V0c19EZXRhaWxfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0IGRldGFpbC5cIikpO1xyXG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdm9pZCBsb2FkRGV0YWlsKCk7XHJcbiAgfSwgW2ZpbGVJZCwgaGFzQWNjZXNzLCBpc0NyZWF0ZU1vZGUsIGxpbmVSZWNJZCwgb25Gb3JiaWRkZW5dKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghbGluZSB8fCBpc0VkaXRpbmcpIHJldHVybjtcclxuICAgIGh5ZHJhdGVEcmFmdEZyb21MaW5lKGxpbmUpO1xyXG4gIH0sIFtoeWRyYXRlRHJhZnRGcm9tTGluZSwgaXNFZGl0aW5nLCBsaW5lXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWlzQ3JlYXRlTW9kZSB8fCBpc0xvYWRpbmcgfHwgIWhlYWRlcikgcmV0dXJuO1xyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbihcIlwiKTtcclxuICAgIHNldERyYWZ0UXR5KFwiXCIpO1xyXG4gICAgc2V0RHJhZnRQcmljZShcIlwiKTtcclxuICB9LCBbaGVhZGVyLCBpc0NyZWF0ZU1vZGUsIGlzTG9hZGluZ10pO1xyXG5cclxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbygoKSA9PiBidXN5IHx8IGlzRWRpdGluZywgW2J1c3ksIGlzRWRpdGluZ10pO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKGhhc0FjdGl2ZVByb2Nlc3MpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtoYXNBY3RpdmVQcm9jZXNzXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlIHx8IGlzTG9hZGluZyB8fCAhaGVhZGVyIHx8ICFsaW5lKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWNhbkVkaXRUaWNrZXQpIHtcclxuICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XHJcbiAgICBoeWRyYXRlRHJhZnRGcm9tTGluZShsaW5lKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIikpO1xyXG4gIH0sIFtjYW5FZGl0VGlja2V0LCBoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21MaW5lLCBpc0NyZWF0ZU1vZGUsIGlzTG9hZGluZywgbGluZSwgb25Gb3JiaWRkZW5dKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghaXNFZGl0aW5nKSByZXR1cm47XHJcblxyXG4gICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBoeWRyYXRlRHJhZnRGcm9tTGluZShsaW5lKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKSk7XHJcbiAgfSwgW2h5ZHJhdGVEcmFmdEZyb21MaW5lLCBpc0VkaXRpbmcsIGxpbmVdKTtcclxuXHJcbiAgY29uc3QgbmF2aWdhdGVUb1RpY2tldERldGFpbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHNhZmVGaWxlSWQgPSBzYWZlVGV4dChmaWxlSWQpO1xyXG4gICAgaWYgKCFzYWZlRmlsZUlkKSByZXR1cm47XHJcblxyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsP2ZpbGVJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlRmlsZUlkKX1gKTtcclxuICB9LCBbZmlsZUlkXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoZWFkZXIsXHJcbiAgICBsaW5lLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgYnVzeSxcclxuICAgIHN0YXR1cyxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG1vZGFsRXJyb3IsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRRdHksXHJcbiAgICBkcmFmdFByaWNlLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRRdHksXHJcbiAgICBzZXREcmFmdFByaWNlLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBuYXZpZ2F0ZVRvVGlja2V0RGV0YWlsLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0TGluZURldGFpbFRvcGJhckFjdGlvbnNBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XHJcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XHJcbiAgY2FuQ3JlYXRlVGlja2V0OiBib29sZWFuO1xyXG4gIGNhbkVkaXRUaWNrZXQ6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlVGlja2V0OiBib29sZWFuO1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgaGFuZGxlRGVsZXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XHJcbiAgb25EZWxldGVTdWNjZXNzPzogKCkgPT4gdm9pZDtcclxuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcclxuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XHJcbiAgICBvbkNhbmNlbD86ICgpID0+IHZvaWQ7XHJcbiAgfSkgPT4gdm9pZDtcclxuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBDb29yZGluYXRlcyB0b3BiYXIgaWNvbiBzdGF0ZSBhbmQgZGlzcGF0Y2ggYWN0aW9ucyBmb3IgdGlja2V0IGxpbmUgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsT3BlbixcclxuICBpc0VkaXRpbmcsXHJcbiAgaXNDcmVhdGVNb2RlLFxyXG4gIGlzTG9ja2VkLFxyXG4gIHBlcm1pc3Npb25zUmVhZHkgPSB0cnVlLFxyXG4gIGNhbkNyZWF0ZVRpY2tldCxcclxuICBjYW5FZGl0VGlja2V0LFxyXG4gIGNhbkRlbGV0ZVRpY2tldCxcclxuICBmaWxlSWQsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgaGFuZGxlVXBkYXRlLFxyXG4gIGhhbmRsZURlbGV0ZSxcclxuICBvblNhdmVTdWNjZXNzLFxyXG4gIG9uRGVsZXRlU3VjY2VzcyxcclxuICBvcGVuQ29uZmlybSxcclxuICBjbG9zZUNvbmZpcm0sXHJcbn06IFVzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcclxuICB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMoe1xyXG4gICAgYWN0aW9uR3JvdXBJZDogXCJleHBlbnNlLXRpY2tldC1saW5lLWRldGFpbC1hY3Rpb25zXCIsXHJcbiAgICBpZHM6IHtcclxuICAgICAgZWRpdEljb25JZDogXCJleHBlbnNlVGlja2V0TGluZUVkaXRJY29uXCIsXHJcbiAgICAgIHNhdmVJY29uSWQ6IFwiZXhwZW5zZVRpY2tldExpbmVTYXZlSWNvblwiLFxyXG4gICAgICBkZWxldGVCdG5JZDogXCJleHBlbnNlVGlja2V0TGluZURlbGV0ZUJ0blwiLFxyXG4gICAgICBjYW5jZWxCdG5JZDogXCJleHBlbnNlVGlja2V0TGluZUNhbmNlbEJ0blwiLFxyXG4gICAgfSxcclxuICAgIGV2ZW50czoge1xyXG4gICAgICBlZGl0RXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtbGluZS1kZXRhaWwtZWRpdFwiLFxyXG4gICAgICBkZWxldGVFdmVudDogXCJleHBlbnNlLXRpY2tldC1saW5lLWRldGFpbC1kZWxldGVcIixcclxuICAgICAgY2FuY2VsRXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtbGluZS1kZXRhaWwtY2FuY2VsLWVkaXRcIixcclxuICAgIH0sXHJcbiAgICBidXN5LFxyXG4gICAgbW9kYWxPcGVuLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNMb2NrZWQsXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5LFxyXG4gICAgY2FuQ3JlYXRlOiBjYW5DcmVhdGVUaWNrZXQsXHJcbiAgICBjYW5FZGl0OiBjYW5FZGl0VGlja2V0LFxyXG4gICAgY2FuRGVsZXRlOiBjYW5EZWxldGVUaWNrZXQsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVTYXZlOiBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBzYXZlQ29uZmlybVRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJTYXZlIGNoYW5nZXNcIiksXHJcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gc2F2ZSBjaGFuZ2VzP1wiKSxcclxuICAgIHNhdmVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1UaXRsZTogaW5kVChcIkNvbmZpcm1fRGVsZXRlX1RpdGxlXCIsIFwiRGVsZXRlXCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgaXRlbT9cIiksXHJcbiAgICBkZWxldGVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIiksXHJcbiAgICBvblNhdmVTdWNjZXNzLFxyXG4gICAgb25EZWxldGVTdWNjZXNzOiBvbkRlbGV0ZVN1Y2Nlc3MgfHwgKCgpID0+IHtcclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsP2ZpbGVJZD0ke2VuY29kZVVSSUNvbXBvbmVudChmaWxlSWQpfWApO1xyXG4gICAgfSksXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBNEM7OztBQzRDeEM7QUF4QkosSUFBTSxpQkFBaUIsQ0FBQyxVQUFpQztBQUN2RCxTQUFPLG9CQUFvQixPQUFPO0FBQUEsSUFDaEMsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsSUFDdkIsYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLEVBQ1osQ0FBQztBQUNIO0FBR0EsSUFBTSw4QkFBOEIsQ0FBQztBQUFBLEVBQ25DO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQXdDO0FBQ3RDLFFBQU0sZ0JBQWdCLFlBQ3BCLDZDQUFDLFNBQUksV0FBVSxlQUNiO0FBQUEsZ0RBQUMsV0FBTSxXQUFVLDRCQUE0QixlQUFLLDJCQUEyQixVQUFVLEdBQUU7QUFBQSxJQUN6RjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsV0FBVTtBQUFBLFFBQ1YsTUFBSztBQUFBLFFBQ0wsV0FBVTtBQUFBLFFBQ1YsT0FBTztBQUFBLFFBQ1AsVUFBVSxDQUFDLFVBQVUsaUJBQWlCLE1BQU0sT0FBTyxTQUFTLEVBQUU7QUFBQSxRQUM5RCxRQUFRLENBQUMsVUFDUDtBQUFBLFVBQ0UseUJBQXlCLE1BQU0sT0FBTyxPQUFPO0FBQUEsWUFDM0MsdUJBQXVCO0FBQUEsWUFDdkIsdUJBQXVCO0FBQUEsWUFD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LElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTSxpQ0FBaUMsTUFBTTtBQUMzQyxRQUFNLE9BQU8sb0NBQW9DO0FBRWpELFNBQ0UsOENBQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTyxLQUFLO0FBQUEsUUFDWixhQUFhLEtBQUs7QUFBQSxRQUNsQixZQUFZLEtBQUs7QUFBQSxRQUNqQixhQUFhLEtBQUs7QUFBQSxRQUNsQixNQUFNLEtBQUs7QUFBQSxRQUNYLE9BQU8sS0FBSztBQUFBLFFBQ1osUUFBUSxLQUFLO0FBQUEsUUFDYixXQUFXLEtBQUs7QUFBQSxRQUNoQixVQUFVLEtBQUs7QUFBQTtBQUFBLElBQ2pCO0FBQUEsSUFFQSw2Q0FBQyxpQ0FBOEIsV0FBVyxLQUFLLFdBQVc7QUFBQSxJQUV6RCxLQUFLLGVBQWUsNkNBQUMsU0FBSSxXQUFVLGVBQWUsZUFBSyxjQUFhLElBQVM7QUFBQSxJQUU3RSxDQUFDLEtBQUssYUFBYSxDQUFDLEtBQUssZ0JBQWdCLEtBQUssV0FBVyxLQUFLLFFBQVEsS0FBSyxnQkFDMUU7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFFBQVEsS0FBSztBQUFBLFFBQ2IsTUFBTSxLQUFLO0FBQUEsUUFDWCxXQUFXLEtBQUs7QUFBQSxRQUNoQixrQkFBa0IsS0FBSztBQUFBLFFBQ3ZCLFVBQVUsS0FBSztBQUFBLFFBQ2YsWUFBWSxLQUFLO0FBQUEsUUFDakIsV0FBVyxLQUFLO0FBQUEsUUFDaEIsWUFBWSxLQUFLO0FBQUEsUUFDakIsMEJBQTBCLEtBQUs7QUFBQSxRQUMvQixrQkFBa0IsS0FBSztBQUFBLFFBQ3ZCLG9CQUFvQixLQUFLO0FBQUE7QUFBQSxJQUMzQixJQUNFO0FBQUEsS0FDTjtBQUVKO0FBR0EsSUFBTSw4QkFBOEIsTUFBTTtBQUN4QyxTQUNFLDZDQUFDLGdDQUFxQix5QkFBdUIsTUFDM0MsdURBQUMsa0NBQStCLEdBQ2xDO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxpQ0FBaUM7QUFDeEUsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQywrQkFBNEIsQ0FBRTtBQUMxRDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sc0NBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0Il0KfQo=
