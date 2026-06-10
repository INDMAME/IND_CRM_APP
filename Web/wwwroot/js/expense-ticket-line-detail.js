import {
  clearExpenseTicketSheetSyncState,
  readExpenseTicketSheetSyncState,
  saveExpenseTicketSheetSyncState,
  syncExpenseLinkedTicketSheetLine
} from "./chunks/chunk-6EG572TG.js";
import {
  mapExpenseTicketDetailHeader,
  mapExpenseTicketDetailLine
} from "./chunks/chunk-NBVNWHKN.js";
import {
  resolveExpenseSheetEditAccess,
  useExpenseTicketLinkSheetGate
} from "./chunks/chunk-5HCE2JSC.js";
import "./chunks/chunk-6CQY4MTW.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-FRTU3UIU.js";
import "./chunks/chunk-4BE3ZFCK.js";
import {
  appendExpenseTicketReturnQuery,
  isManagingOtherExpenseUser,
  normalizeExpenseTicketReturnContext,
  resolveExpenseTicketReturnContext,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-PNQZXR4W.js";
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
  createExpenseSheetTicketLine,
  deleteExpenseSheetTicketLine,
  fetchExpenseSheetTicket,
  isValidTicketLineAmount,
  resolveTicketLineAmount,
  safeText,
  updateExpenseSheetTicketLine
} from "./chunks/chunk-UNKHH33H.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-FZJKOUY3.js";
import "./chunks/chunk-SRZDJTMJ.js";
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
  status,
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "space-y-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ExpenseSectionDivider_default,
      {
        label: indT("ExpenseSheets_Line", "Line"),
        className: "expense-section-divider--spaced",
        labelClassName: "expense-section-divider__label--title"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-[#e2e8f0] rounded-[var(--radius-xl)]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ExpenseReadOnlyField_default,
          {
            label: indT("Tickets_Field_FileId", "Ticket"),
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
            value: formatQtyValue(line?.qty ?? null)
          }
        ),
        isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_Price", "Price") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              className: "form-control",
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
            value: priceText || "-"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ExpenseReadOnlyField_default,
          {
            label: indT("ExpenseSheets_Field_Amount", "Amount"),
            value: amountText || "-"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-center gap-3 text-sm text-[#00296bb8]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: status }) })
    ] })
  ] });
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
  const shouldBlockWorkflowExit = pendingFirstLink || sheetSyncBlocked;
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
    if (!shouldBlockWorkflowExit) {
      clearExpenseNavigationGuard();
      return;
    }
    setExpenseNavigationGuard({
      active: true,
      message: workflowBlockedMessage,
      block: true
    });
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [busy, isEditing, shouldBlockWorkflowExit, workflowBlockedMessage]);
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
        status: view.status,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2xpbmUvRXhwZW5zZVRpY2tldExpbmVEZXRhaWxQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmVEZXRhaWxGb3JtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvbGluZS91c2VFeHBlbnNlVGlja2V0TGluZURldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvbGluZS91c2VFeHBlbnNlVGlja2V0TGluZURldGFpbFN0YXRlLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9saW5lL3VzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9ucy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tIFwiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3hcIjtcclxuaW1wb3J0IHsgdXNlQXV0aENvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcclxuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsRm9ybSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGluZURldGFpbEZvcm0udHN4XCI7XHJcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi8uLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xyXG5pbXBvcnQgeyBwYXJzZURlY2ltYWxJbnB1dCB9IGZyb20gXCIuLi8uLi9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50c1wiO1xuaW1wb3J0IHsgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgaXNNYW5hZ2luZ090aGVyRXhwZW5zZVVzZXIgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZU1hbmFnZWRVc2VyU2NvcGUudHNcIjtcbmltcG9ydCB7IGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCwgcmVsb2FkRXhwZW5zZVBhZ2UsIG5hdmlnYXRlVG9FeHBlbnNlVXJsLCBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyByZWFkRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZS50c1wiO1xuaW1wb3J0IHsgcmVzb2x2ZVRpY2tldExpbmVBbW91bnQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldExpbmVBbW91bnQudHNcIjtcbmltcG9ydCB7XHJcbiAgYXBwZW5kRXhwZW5zZVRpY2tldFJldHVyblF1ZXJ5LFxyXG4gIG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIHJlc29sdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxuICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlIH0gZnJvbSBcIi4uL3VzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsTXV0YXRpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldExpbmVEZXRhaWxNdXRhdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldExpbmVEZXRhaWxTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XHJcblxyXG4vLyBJbml0aWFsaXplcyBhdXRoIHNlZWQgZm9yIGV4cGVuc2UgQVBJIGNhbGxzIGJlZm9yZSBpc2xhbmQgZWZmZWN0cyBydW4uXHJcbmNvbnN0IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoID0gKCkgPT4ge1xyXG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcclxuICAgIHRva2VuOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxyXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXHJcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBDb25zdW1lcyB0aGUgb25lLXRpbWUgZWRpdCBoYW5kb2ZmIHNvIGxhdGVyIHJlbG9hZHMgcmV0dXJuIHRvIG5vcm1hbCB2aWV3IG1vZGUuXHJcbmNvbnN0IGNvbnN1bWVUaWNrZXRMaW5lRWRpdE1vZGVRdWVyeSA9ICgpID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY3VycmVudFVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gIGlmIChzYWZlVGV4dChjdXJyZW50VXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJtb2RlXCIpKS50b0xvd2VyQ2FzZSgpICE9PSBcImVkaXRcIikge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY3VycmVudFVybC5zZWFyY2hQYXJhbXMuZGVsZXRlKFwibW9kZVwiKTtcclxuICBjb25zdCBuZXh0VXJsID0gYCR7Y3VycmVudFVybC5wYXRobmFtZX0ke2N1cnJlbnRVcmwuc2VhcmNofSR7Y3VycmVudFVybC5oYXNofWA7XHJcbiAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHdpbmRvdy5oaXN0b3J5LnN0YXRlLCBcIlwiLCBuZXh0VXJsKTtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVMaW5rZWRUaWNrZXRCbG9ja2VkTWVzc2FnZSA9IChpc1BhaWQ6IGJvb2xlYW4pOiBzdHJpbmcgPT4ge1xuICBpZiAoaXNQYWlkKSB7XG4gICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9QYWlkUmVhZE9ubHlcIiwgXCJMYXMgaG9qYXMgZGUgZ2FzdG8gcGFnYWRhcyBzb24gZGUgc29sbyBsZWN0dXJhLlwiKTtcbiAgfVxuXG4gIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUmVhZE9ubHlCeVN0YXR1c1wiLCBcIk5vIHNlIHB1ZWRlIGVkaXRhciBlc3RhIGhvamEgZGUgZ2FzdG9zIGVuIGVsIGVzdGFkbyBhY3R1YWwuXCIpO1xufTtcblxudHlwZSBFeHBlbnNlVGlja2V0TGluZURldGFpbE1vZGFsUHJvcHMgPSB7XG4gIG1vZGFsOiB7XG4gICAgb3BlbjogYm9vbGVhbjtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBzaG93Q2FuY2VsOiBib29sZWFuO1xuICAgIHNob3dDb25maXJtOiBib29sZWFuO1xuICB9O1xuICBjb25maXJtVGV4dDogc3RyaW5nO1xuICBjYW5jZWxUZXh0OiBzdHJpbmc7XG4gIGxvYWRpbmdUZXh0OiBzdHJpbmc7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIGVycm9yOiBzdHJpbmc7XG4gIHN0YXR1czogc3RyaW5nO1xuICBvbkNvbmZpcm06ICgpID0+IHZvaWQ7XG4gIG9uQ2FuY2VsOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gS2VlcHMgdGhlIGNvbmZpcm1hdGlvbiBtb2RhbCBtYXJrdXAgb3V0IG9mIHRoZSBwYWdlIG9yY2hlc3RyYXRpb24gY29tcG9uZW50LlxuY29uc3QgRXhwZW5zZVRpY2tldExpbmVEZXRhaWxNb2RhbCA9ICh7XG4gIG1vZGFsLFxuICBjb25maXJtVGV4dCxcbiAgY2FuY2VsVGV4dCxcbiAgbG9hZGluZ1RleHQsXG4gIGJ1c3ksXG4gIGVycm9yLFxuICBzdGF0dXMsXG4gIG9uQ29uZmlybSxcbiAgb25DYW5jZWwsXG59OiBFeHBlbnNlVGlja2V0TGluZURldGFpbE1vZGFsUHJvcHMpID0+IChcbiAgPENvbmZpcm1Nb2RhbFxuICAgIG9wZW49e21vZGFsLm9wZW59XG4gICAgdGl0bGU9e21vZGFsLnRpdGxlfVxuICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XG4gICAgY29uZmlybVRleHQ9e2NvbmZpcm1UZXh0fVxuICAgIGNhbmNlbFRleHQ9e2NhbmNlbFRleHR9XG4gICAgbG9hZGluZ1RleHQ9e2xvYWRpbmdUZXh0fVxuICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XG4gICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxuICAgIGJ1c3k9e2J1c3l9XG4gICAgZXJyb3I9e2Vycm9yfVxuICAgIHN0YXR1cz17c3RhdHVzfVxuICAgIG9uQ29uZmlybT17b25Db25maXJtfVxuICAgIG9uQ2FuY2VsPXtvbkNhbmNlbH1cbiAgLz5cbik7XG5cbi8vIFJlbmRlcnMgdGhlIHNoYXJlZCBsb2FkZXIgc3RhdGUgZm9yIHRpY2tldCBsaW5lIGRldGFpbC5cbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsTG9hZGVyID0gKHsgaXNMb2FkaW5nIH06IHsgaXNMb2FkaW5nOiBib29sZWFuIH0pID0+IChcbiAgPGRpdlxuICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXppbmMtNzAwXCJcbiAgICBzdHlsZT17eyBkaXNwbGF5OiBpc0xvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XG4gID5cbiAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIHNpemUtNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XG4gICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cbiAgICA8L3N2Zz5cbiAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cbiAgPC9kaXY+XG4pO1xuXG5jb25zdCB1c2VFeHBlbnNlVGlja2V0TGluZURldGFpbFZpZXdNb2RlbCA9ICgpID0+IHtcbiAgY29uc3Qge1xyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gIH0gPSB1c2VBdXRoQ29udGV4dCgpO1xyXG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiVmlld1wiKTtcclxuICBjb25zdCBjYW5FZGl0VGlja2V0QnlNb2R1bGUgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIkVkaXRcIik7XHJcbiAgY29uc3QgY2FuRGVsZXRlVGlja2V0QnlNb2R1bGUgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIkZ1bGxBY2Nlc3NcIik7XHJcbiAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQod2luZG93Ll9fRVhQRU5TRV9USUNLRVRfRklMRV9JRF9fKTtcclxuICBjb25zdCBsaW5lUmVjSWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1RJQ0tFVF9MSU5FX0lEX18pO1xyXG4gIGNvbnN0IHJvdXRlUGFyYW1zID0gdXNlTWVtbygoKSA9PiBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpLCBbXSk7XHJcbiAgY29uc3QgaXNDcmVhdGVNb2RlID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChyb3V0ZVBhcmFtcy5nZXQoXCJtb2RlXCIpKS50b0xvd2VyQ2FzZSgpID09PSBcImNyZWF0ZVwiLCBbcm91dGVQYXJhbXNdKTtcclxuICBjb25zdCBzdGFydEluRWRpdE1vZGUgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcIm1vZGVcIikpLnRvTG93ZXJDYXNlKCkgPT09IFwiZWRpdFwiLCBbcm91dGVQYXJhbXNdKTtcclxuICBjb25zdCByb3V0ZU9yaWdpbiA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwib3JpZ2luXCIpKS50b0xvd2VyQ2FzZSgpLCBbcm91dGVQYXJhbXNdKTtcclxuICBjb25zdCByb3V0ZVNoZWV0SWQgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcInNoZWV0SWRcIikpLCBbcm91dGVQYXJhbXNdKTtcclxuICBjb25zdCByb3V0ZVNoZWV0TGluZVJlY0lkID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChyb3V0ZVBhcmFtcy5nZXQoXCJzaGVldExpbmVSZWNJZFwiKSksIFtyb3V0ZVBhcmFtc10pO1xyXG4gIGNvbnN0IGV4cGxpY2l0UmV0dXJuQ29udGV4dCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PlxyXG4gICAgICBub3JtYWxpemVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCh7XHJcbiAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgIG9yaWdpbjogcm91dGVPcmlnaW4sXHJcbiAgICAgICAgc2hlZXRJZDogcm91dGVTaGVldElkLFxyXG4gICAgICAgIHNoZWV0TGluZVJlY0lkOiByb3V0ZVNoZWV0TGluZVJlY0lkLFxyXG4gICAgICB9KSxcclxuICAgIFtmaWxlSWQsIHJvdXRlT3JpZ2luLCByb3V0ZVNoZWV0SWQsIHJvdXRlU2hlZXRMaW5lUmVjSWRdXHJcbiAgKTtcclxuICBjb25zdCB0aWNrZXRSZXR1cm5Db250ZXh0ID0gdXNlTWVtbyhcclxuICAgICgpID0+IHJlc29sdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dChmaWxlSWQsIGV4cGxpY2l0UmV0dXJuQ29udGV4dCksXHJcbiAgICBbZXhwbGljaXRSZXR1cm5Db250ZXh0LCBmaWxlSWRdXHJcbiAgKTtcclxuICBjb25zdCBkZXRhaWxPcmlnaW4gPSB0aWNrZXRSZXR1cm5Db250ZXh0Py5vcmlnaW4gfHwgcm91dGVPcmlnaW47XHJcbiAgY29uc3QgYXV0b0VkaXRBdHRlbXB0ZWRSZWYgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xyXG4gIGNvbnN0IHNoZWV0U3luY1N0YXRlID0gcmVhZEV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZShmaWxlSWQpO1xuICBjb25zdCBzaGVldFN5bmNCbG9ja2VkID0gISFzaGVldFN5bmNTdGF0ZTtcbiAgY29uc3Qgc2hlZXRTeW5jQmxvY2tlZE1lc3NhZ2UgPSBzYWZlVGV4dChzaGVldFN5bmNTdGF0ZT8ubWVzc2FnZSk7XG5cclxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFleHBsaWNpdFJldHVybkNvbnRleHQpIHJldHVybjtcclxuICAgIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dChleHBsaWNpdFJldHVybkNvbnRleHQpO1xyXG4gIH0sIFtleHBsaWNpdFJldHVybkNvbnRleHRdKTtcclxuXHJcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghc3RhcnRJbkVkaXRNb2RlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdW1lVGlja2V0TGluZUVkaXRNb2RlUXVlcnkoKTtcclxuICB9LCBbc3RhcnRJbkVkaXRNb2RlXSk7XHJcbiAgY29uc3QgaXNNYW5hZ2luZ090aGVyVXNlciA9IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VVc2VyKHtcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgfSk7XG4gIGNvbnN0IGNhbkNyZWF0ZVRpY2tldExpbmUgPSBjYW5FZGl0VGlja2V0QnlNb2R1bGUgJiYgIWlzTWFuYWdpbmdPdGhlclVzZXI7XG4gIGNvbnN0IGNhbkVkaXRUaWNrZXQgPSBjYW5FZGl0VGlja2V0QnlNb2R1bGUgJiYgIWlzTWFuYWdpbmdPdGhlclVzZXI7XG4gIGNvbnN0IGNhbkRlbGV0ZVRpY2tldCA9IGNhbkRlbGV0ZVRpY2tldEJ5TW9kdWxlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyO1xuICBjb25zdCB7XG4gICAgaGVhZGVyLFxyXG4gICAgbGluZSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGJ1c3ksXHJcbiAgICBzdGF0dXMsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtb2RhbEVycm9yLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRRdHksXG4gICAgZHJhZnRQcmljZSxcbiAgICBzZXRCdXN5LFxuICAgIHNldFN0YXR1cyxcbiAgICBzZXRJc0VkaXRpbmcsXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXG4gICAgc2V0RHJhZnRRdHksXG4gICAgc2V0RHJhZnRQcmljZSxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0TGluZURldGFpbFN0YXRlKHtcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBjYW5FZGl0VGlja2V0LFxyXG4gICAgZmlsZUlkLFxyXG4gICAgbGluZVJlY0lkLFxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxuICB9KTtcbiAgY29uc3QgbGlua2VkRXhwZW5zZVNoZWV0SWQgPSB1c2VNZW1vKFxuICAgICgpID0+IHNhZmVUZXh0KHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQgfHwgaGVhZGVyPy5ob2phR2FzdG9zSWREaXNwbGF5IHx8IHJvdXRlU2hlZXRJZCksXHJcbiAgICBbaGVhZGVyPy5ob2phR2FzdG9zSWREaXNwbGF5LCByb3V0ZVNoZWV0SWQsIHRpY2tldFJldHVybkNvbnRleHRdXHJcbiAgKTtcclxuICBjb25zdCB7IGxpbmtTaGVldExvY2tlZCwgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UsIGxpbmtTaGVldENoZWNrQnVzeSB9ID0gdXNlRXhwZW5zZVRpY2tldExpbmtTaGVldEdhdGUoe1xyXG4gICAgaXNMaW5rTW9kZTogISFsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICAgIGxpbmtTaGVldElkOiBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICAgIGNhblByb2Nlc3NMaW5rTW9kZTogdHJ1ZSxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHJlc29sdmVCbG9ja2VkTWVzc2FnZTogcmVzb2x2ZUxpbmtlZFRpY2tldEJsb2NrZWRNZXNzYWdlLFxyXG4gIH0pO1xyXG4gIGNvbnN0IGNhbkVkaXRMaW5rZWRUaWNrZXQgPSAhbGlua2VkRXhwZW5zZVNoZWV0SWQgfHwgKCFsaW5rU2hlZXRDaGVja0J1c3kgJiYgIWxpbmtTaGVldExvY2tlZCk7XHJcbiAgY29uc3QgY2FuQ3JlYXRlTGlua2VkVGlja2V0TGluZSA9ICFsaW5rZWRFeHBlbnNlU2hlZXRJZCB8fCAoIWxpbmtTaGVldENoZWNrQnVzeSAmJiAhbGlua1NoZWV0TG9ja2VkKTtcclxuICBjb25zdCBhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0ID0gZGV0YWlsT3JpZ2luID09PSBcInNoZWV0LWNyZWF0ZVwiIHx8ICghIWxpbmtlZEV4cGVuc2VTaGVldElkICYmIGNhbkVkaXRMaW5rZWRUaWNrZXQpO1xyXG4gIGNvbnN0IHBlbmRpbmdGaXJzdExpbmsgPVxyXG4gICAgZGV0YWlsT3JpZ2luID09PSBcInNoZWV0LWNyZWF0ZVwiICYmICEhc2FmZVRleHQodGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCB8fCByb3V0ZVNoZWV0SWQpICYmICFzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZERpc3BsYXkpO1xyXG4gIGNvbnN0IHdvcmtmbG93QmxvY2tlZE1lc3NhZ2UgPSBwZW5kaW5nRmlyc3RMaW5rXHJcbiAgICA/IGluZFQoXCJFeHBlbnNlVGlja2V0c19TaGVldFN5bmNfUGVuZGluZ1NhdmVSZXF1aXJlZFwiLCBcIlNhdmUgdGhlIHRpY2tldCBiZWZvcmUgbGVhdmluZyB0aGlzIGZsb3cuXCIpXHJcbiAgICA6IHNoZWV0U3luY0Jsb2NrZWRNZXNzYWdlIHx8XHJcbiAgICAgIGluZFQoXHJcbiAgICAgICAgXCJFeHBlbnNlVGlja2V0c19TaGVldFN5bmNfUmV0cnlSZXF1aXJlZFwiLFxyXG4gICAgICAgIFwiVGlja2V0IGRhdGEgY2hhbmdlZCwgYnV0IHdlIGNvdWxkIG5vdCBzeW5jIHRoZSBleHBlbnNlIGxpbmUuIFNhdmUgYWdhaW4gYmVmb3JlIGxlYXZpbmcuXCJcclxuICAgICAgKTtcclxuICBjb25zdCBzaG91bGRCbG9ja1dvcmtmbG93RXhpdCA9IHBlbmRpbmdGaXJzdExpbmsgfHwgc2hlZXRTeW5jQmxvY2tlZDtcclxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0SW5Db250ZXh0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGxpbmtTaGVldENoZWNrQnVzeSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxpbmtlZEV4cGVuc2VTaGVldElkICYmIGxpbmtTaGVldExvY2tlZCkge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID1cclxuICAgICAgICBzYWZlVGV4dChsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZSkgfHxcclxuICAgICAgICByZXNvbHZlTGlua2VkVGlja2V0QmxvY2tlZE1lc3NhZ2UoZmFsc2UpO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0KCk7XHJcbiAgfSwgW1xyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlLFxyXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gICAgbGlua1NoZWV0TG9ja2VkLFxyXG4gICAgbGlua2VkRXhwZW5zZVNoZWV0SWQsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldFN0YXR1cyxcbiAgXSk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFzaG91bGRCbG9ja1dvcmtmbG93RXhpdCkge1xyXG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoe1xyXG4gICAgICBhY3RpdmU6IHRydWUsXHJcbiAgICAgIG1lc3NhZ2U6IHdvcmtmbG93QmxvY2tlZE1lc3NhZ2UsXHJcbiAgICAgIGJsb2NrOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcclxuICAgIH07XG4gIH0sIFtidXN5LCBpc0VkaXRpbmcsIHNob3VsZEJsb2NrV29ya2Zsb3dFeGl0LCB3b3JrZmxvd0Jsb2NrZWRNZXNzYWdlXSk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFzdGFydEluRWRpdE1vZGUgfHwgYXV0b0VkaXRBdHRlbXB0ZWRSZWYuY3VycmVudCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoaXNMb2FkaW5nIHx8ICFoZWFkZXIgfHwgIWxpbmUgfHwgbGlua1NoZWV0Q2hlY2tCdXN5KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBhdXRvRWRpdEF0dGVtcHRlZFJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgIGhhbmRsZUVuYWJsZUVkaXRJbkNvbnRleHQoKTtcbiAgfSwgW2hhbmRsZUVuYWJsZUVkaXRJbkNvbnRleHQsIGhlYWRlciwgaXNMb2FkaW5nLCBsaW5lLCBsaW5rU2hlZXRDaGVja0J1c3ksIHN0YXJ0SW5FZGl0TW9kZV0pO1xuICBjb25zdCBkcmFmdFF0eVZhbHVlID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRRdHkpO1xuICBjb25zdCBkcmFmdFByaWNlVmFsdWUgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFByaWNlKTtcbiAgY29uc3QgY2FsY3VsYXRlZEFtb3VudFByZXZpZXcgPVxuICAgIGlzRWRpdGluZyAmJiBkcmFmdFF0eVZhbHVlICE9IG51bGwgJiYgZHJhZnRQcmljZVZhbHVlICE9IG51bGwgJiYgZHJhZnRQcmljZVZhbHVlICE9PSAwXG4gICAgICA/IHJlc29sdmVUaWNrZXRMaW5lQW1vdW50KHsgcXR5OiBkcmFmdFF0eVZhbHVlLCBwcmljZTogZHJhZnRQcmljZVZhbHVlIH0pXG4gICAgICA6IGxpbmU/LnRvdGFsQW1vdW50ID8/IG51bGw7XG4gIGNvbnN0IGFtb3VudFRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShjYWxjdWxhdGVkQW1vdW50UHJldmlldywgc2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpKSxcclxuICAgIFtjYWxjdWxhdGVkQW1vdW50UHJldmlldywgaGVhZGVyPy5jdXJyZW5jeUNvZGVdXHJcbiAgKTtcclxuICBjb25zdCBwcmljZVRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGxpbmU/LnByaWNlID8/IG51bGwsIHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSksXHJcbiAgICBbaGVhZGVyPy5jdXJyZW5jeUNvZGUsIGxpbmU/LnByaWNlXVxyXG4gICk7XHJcbiAgY29uc3QgaXNBc3NpZ25lZFRpY2tldCA9IGhlYWRlcj8uc3RhdHVzID09PSAxO1xyXG4gIGNvbnN0IGlzQ29udGV4dExvY2tlZCA9IChpc0Fzc2lnbmVkVGlja2V0ICYmICFhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0KSB8fCAoISFsaW5rZWRFeHBlbnNlU2hlZXRJZCAmJiBsaW5rU2hlZXRMb2NrZWQpO1xyXG4gIGNvbnN0IHRpY2tldERldGFpbFVybCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3Qgc2FmZUZpbGVJZCA9IHNhZmVUZXh0KGZpbGVJZCk7XHJcbiAgICBpZiAoIXNhZmVGaWxlSWQpIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgZmlsZUlkOiBzYWZlRmlsZUlkLFxyXG4gICAgfSk7XHJcbiAgICBhcHBlbmRFeHBlbnNlVGlja2V0UmV0dXJuUXVlcnkocXVlcnksIHRpY2tldFJldHVybkNvbnRleHQpO1xyXG4gICAgcmV0dXJuIGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YDtcclxuICB9LCBbZmlsZUlkLCB0aWNrZXRSZXR1cm5Db250ZXh0XSk7XHJcbiAgY29uc3QgdGlja2V0RGV0YWlsRWRpdFVybCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3Qgc2FmZUZpbGVJZCA9IHNhZmVUZXh0KGZpbGVJZCk7XHJcbiAgICBpZiAoIXNhZmVGaWxlSWQpIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgZmlsZUlkOiBzYWZlRmlsZUlkLFxyXG4gICAgICBtb2RlOiBcImVkaXRcIixcclxuICAgIH0pO1xyXG4gICAgYXBwZW5kRXhwZW5zZVRpY2tldFJldHVyblF1ZXJ5KHF1ZXJ5LCB0aWNrZXRSZXR1cm5Db250ZXh0KTtcclxuICAgIHJldHVybiBgL0dhc3Rvcy9UaWNrZXREZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWA7XHJcbiAgfSwgW2ZpbGVJZCwgdGlja2V0UmV0dXJuQ29udGV4dF0pO1xyXG4gIGNvbnN0IHByZWZlcnJlZFRpY2tldERldGFpbFVybCA9IHBlbmRpbmdGaXJzdExpbmsgPyB0aWNrZXREZXRhaWxFZGl0VXJsIDogdGlja2V0RGV0YWlsVXJsO1xyXG5cclxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFzaG91bGRCbG9ja1dvcmtmbG93RXhpdCB8fCAhcHJlZmVycmVkVGlja2V0RGV0YWlsVXJsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBiYWNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxCYWNrQnRuXCIpO1xyXG4gICAgY29uc3QgaGFuZGxlVG9wYmFyQmFjayA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbj8uKCk7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHByZWZlcnJlZFRpY2tldERldGFpbFVybCwge1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH07XHJcbiAgICBjb25zdCBoYW5kbGVOYXRpdmVCYWNrID0gKGV2ZW50OiBQb3BTdGF0ZUV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudD8uc3RhdGUgJiYgZXZlbnQuc3RhdGUuaW5kVHJhcCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHByZWZlcnJlZFRpY2tldERldGFpbFVybCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGJhY2tCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVUb3BiYXJCYWNrLCB0cnVlKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgaGFuZGxlTmF0aXZlQmFjayk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBiYWNrQnV0dG9uPy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlVG9wYmFyQmFjaywgdHJ1ZSk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgaGFuZGxlTmF0aXZlQmFjayk7XHJcbiAgICB9O1xyXG4gIH0sIFtwcmVmZXJyZWRUaWNrZXREZXRhaWxVcmwsIHNob3VsZEJsb2NrV29ya2Zsb3dFeGl0XSk7XHJcblxyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxuICB9KTtcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcclxuICAgICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgfSxcbiAgICB9KTtcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm0sIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1c10pO1xuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcclxuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICFidXN5ICYmIG1vZGFsRXJyb3JcbiAgICAgID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpXG4gICAgICA6IG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghc2hvdWxkQmxvY2tXb3JrZmxvd0V4aXQgfHwgYnVzeSkgcmV0dXJuO1xyXG4gICAgaWYgKCF3b3JrZmxvd0Jsb2NrZWRNZXNzYWdlIHx8IHN0YXR1cyA9PT0gd29ya2Zsb3dCbG9ja2VkTWVzc2FnZSkgcmV0dXJuO1xyXG4gICAgc2V0U3RhdHVzKHdvcmtmbG93QmxvY2tlZE1lc3NhZ2UpO1xyXG4gIH0sIFtidXN5LCBzZXRTdGF0dXMsIHNob3VsZEJsb2NrV29ya2Zsb3dFeGl0LCBzdGF0dXMsIHdvcmtmbG93QmxvY2tlZE1lc3NhZ2VdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cbiAgICB2b2lkIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xuICB9LCBbYnVzeSwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm0sIG1vZGFsRXJyb3JdKTtcbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdEluQ29udGV4dCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICBoYW5kbGVDYW5jZWxFZGl0KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXByZWZlcnJlZFRpY2tldERldGFpbFVybCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwocHJlZmVycmVkVGlja2V0RGV0YWlsVXJsLCB7XHJcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogIXNob3VsZEJsb2NrV29ya2Zsb3dFeGl0LFxyXG4gICAgICBieXBhc3NHdWFyZE9uY2U6IHNob3VsZEJsb2NrV29ya2Zsb3dFeGl0LFxuICAgIH0pO1xuICB9LCBbaGFuZGxlQ2FuY2VsRWRpdCwgaXNDcmVhdGVNb2RlLCBwcmVmZXJyZWRUaWNrZXREZXRhaWxVcmwsIHNob3VsZEJsb2NrV29ya2Zsb3dFeGl0XSk7XG4gIGNvbnN0IHsgaGFuZGxlVXBkYXRlLCBoYW5kbGVEZWxldGUgfSA9IHVzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsTXV0YXRpb25zKHtcbiAgICBidXN5LFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgY2FuQ3JlYXRlVGlja2V0OiBjYW5DcmVhdGVUaWNrZXRMaW5lICYmIGNhbkNyZWF0ZUxpbmtlZFRpY2tldExpbmUsXHJcbiAgICBjYW5FZGl0VGlja2V0OiBjYW5FZGl0VGlja2V0ICYmIGNhbkVkaXRMaW5rZWRUaWNrZXQsXHJcbiAgICBjYW5EZWxldGVUaWNrZXQ6IGNhbkRlbGV0ZVRpY2tldCAmJiBjYW5FZGl0TGlua2VkVGlja2V0LFxyXG4gICAgZmlsZUlkLFxyXG4gICAgbGluZVJlY0lkLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRRdHksXG4gICAgZHJhZnRQcmljZSxcbiAgICBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICBza2lwTGlua2VkU2hlZXRTeW5jT25DcmVhdGU6IHBlbmRpbmdGaXJzdExpbmssXG4gICAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlOiAobWVzc2FnZSkgPT4ge1xuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xuICAgIH0sXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgfSk7XG4gIHVzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9ucyh7XG4gICAgYnVzeSxcclxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzTG9ja2VkOiBpc0NvbnRleHRMb2NrZWQgfHwgaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgIHBlcm1pc3Npb25zUmVhZHk6IG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICAgIGNhbkNyZWF0ZVRpY2tldDogY2FuQ3JlYXRlVGlja2V0TGluZSAmJiBjYW5DcmVhdGVMaW5rZWRUaWNrZXRMaW5lLFxyXG4gICAgY2FuRWRpdFRpY2tldDogY2FuRWRpdFRpY2tldCAmJiBjYW5FZGl0TGlua2VkVGlja2V0LFxyXG4gICAgY2FuRGVsZXRlVGlja2V0OiBjYW5EZWxldGVUaWNrZXQgJiYgY2FuRWRpdExpbmtlZFRpY2tldCxcclxuICAgIGZpbGVJZCxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0OiBoYW5kbGVFbmFibGVFZGl0SW5Db250ZXh0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdDogaGFuZGxlQ2FuY2VsRWRpdEluQ29udGV4dCxcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICAgIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICAgIGNvbnN0IHJldHVyblVybCA9IHJlYWRFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoZmlsZUlkKSA/IHRpY2tldERldGFpbEVkaXRVcmwgOiBwcmVmZXJyZWRUaWNrZXREZXRhaWxVcmw7XHJcbiAgICAgICAgaWYgKCFyZXR1cm5VcmwpIHJldHVybjtcclxuICAgICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChyZXR1cm5VcmwsIHtcclxuICAgICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICBieXBhc3NHdWFyZE9uY2U6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xyXG4gICAgfSxcclxuICAgIG9uRGVsZXRlU3VjY2VzczogKCkgPT4ge1xyXG4gICAgICBpZiAoIXByZWZlcnJlZFRpY2tldERldGFpbFVybCkgcmV0dXJuO1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChwcmVmZXJyZWRUaWNrZXREZXRhaWxVcmwsIHtcclxuICAgICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxyXG4gICAgICAgIGJ5cGFzc0d1YXJkT25jZTogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7XG4gICAgbW9kYWwsXG4gICAgbW9kYWxDb25maXJtVGV4dCxcbiAgICBtb2RhbENhbmNlbFRleHQsXG4gICAgbW9kYWxMb2FkaW5nVGV4dCxcbiAgICBidXN5LFxuICAgIG1vZGFsRXJyb3IsXG4gICAgc3RhdHVzLFxuICAgIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBoZWFkZXIsXG4gICAgbGluZSxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNFZGl0aW5nLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRRdHksXG4gICAgZHJhZnRQcmljZSxcbiAgICBwcmljZVRleHQsXG4gICAgYW1vdW50VGV4dCxcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxuICAgIHNldERyYWZ0UXR5LFxuICAgIHNldERyYWZ0UHJpY2UsXG4gIH07XG59O1xuXG5jb25zdCBFeHBlbnNlVGlja2V0TGluZURldGFpbENvbnRlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHZpZXcgPSB1c2VFeHBlbnNlVGlja2V0TGluZURldGFpbFZpZXdNb2RlbCgpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgIDxFeHBlbnNlVGlja2V0TGluZURldGFpbE1vZGFsXG4gICAgICAgIG1vZGFsPXt2aWV3Lm1vZGFsfVxuICAgICAgICBjb25maXJtVGV4dD17dmlldy5tb2RhbENvbmZpcm1UZXh0fVxuICAgICAgICBjYW5jZWxUZXh0PXt2aWV3Lm1vZGFsQ2FuY2VsVGV4dH1cbiAgICAgICAgbG9hZGluZ1RleHQ9e3ZpZXcubW9kYWxMb2FkaW5nVGV4dH1cbiAgICAgICAgYnVzeT17dmlldy5idXN5fVxuICAgICAgICBlcnJvcj17dmlldy5tb2RhbEVycm9yfVxuICAgICAgICBzdGF0dXM9e3ZpZXcuc3RhdHVzfVxuICAgICAgICBvbkNvbmZpcm09e3ZpZXcuaGFuZGxlTW9kYWxCdXR0b25Db25maXJtfVxuICAgICAgICBvbkNhbmNlbD17dmlldy5jbG9zZUNvbmZpcm19XG4gICAgICAvPlxuXG4gICAgICA8RXhwZW5zZVRpY2tldExpbmVEZXRhaWxMb2FkZXIgaXNMb2FkaW5nPXt2aWV3LmlzTG9hZGluZ30gLz5cblxuICAgICAge3ZpZXcuZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPnt2aWV3LmVycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxuXG4gICAgICB7IXZpZXcuaXNMb2FkaW5nICYmICF2aWV3LmVycm9yTWVzc2FnZSAmJiB2aWV3LmhlYWRlciAmJiAodmlldy5saW5lIHx8IHZpZXcuaXNDcmVhdGVNb2RlKSA/IChcbiAgICAgICAgPEV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsRm9ybVxuICAgICAgICAgIGhlYWRlcj17dmlldy5oZWFkZXJ9XG4gICAgICAgICAgbGluZT17dmlldy5saW5lfVxuICAgICAgICAgIHN0YXR1cz17dmlldy5zdGF0dXN9XG4gICAgICAgICAgaXNFZGl0aW5nPXt2aWV3LmlzRWRpdGluZ31cbiAgICAgICAgICBkcmFmdERlc2NyaXB0aW9uPXt2aWV3LmRyYWZ0RGVzY3JpcHRpb259XG4gICAgICAgICAgZHJhZnRRdHk9e3ZpZXcuZHJhZnRRdHl9XG4gICAgICAgICAgZHJhZnRQcmljZT17dmlldy5kcmFmdFByaWNlfVxuICAgICAgICAgIHByaWNlVGV4dD17dmlldy5wcmljZVRleHR9XG4gICAgICAgICAgYW1vdW50VGV4dD17dmlldy5hbW91bnRUZXh0fVxuICAgICAgICAgIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZT17dmlldy5zZXREcmFmdERlc2NyaXB0aW9ufVxuICAgICAgICAgIG9uRHJhZnRRdHlDaGFuZ2U9e3ZpZXcuc2V0RHJhZnRRdHl9XG4gICAgICAgICAgb25EcmFmdFByaWNlQ2hhbmdlPXt2aWV3LnNldERyYWZ0UHJpY2V9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cclxuLy8gTWFpbiBwYWdlIGVudHJ5IGZvciB0aWNrZXQgbGluZSBkZXRhaWwuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsUGFnZSA9ICgpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzIGVuYWJsZUV4cGVuc2VNYW5hZ2VtZW50PlxyXG4gICAgICA8RXhwZW5zZVRpY2tldExpbmVEZXRhaWxDb250ZW50IC8+XHJcbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS10aWNrZXQtbGluZS1kZXRhaWwtcm9vdFwiKTtcclxuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xyXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVRpY2tldExpbmVEZXRhaWxQYWdlIC8+KTtcclxufTtcclxuXHJcbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldExpbmVEZXRhaWxQYWdlO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLCBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyLCBmb3JtYXRFeHBlbnNlTnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VSZWFkT25seUZpZWxkIGZyb20gXCIuL0V4cGVuc2VSZWFkT25seUZpZWxkLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVNlY3Rpb25EaXZpZGVyIGZyb20gXCIuL0V4cGVuc2VTZWN0aW9uRGl2aWRlci50c3hcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldExpbmVEZXRhaWxGb3JtUHJvcHMgPSB7XHJcbiAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyO1xyXG4gIGxpbmU6IEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIHwgbnVsbDtcclxuICBzdGF0dXM6IHN0cmluZztcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xuICBkcmFmdFF0eTogc3RyaW5nO1xuICBkcmFmdFByaWNlOiBzdHJpbmc7XG4gIHByaWNlVGV4dDogc3RyaW5nO1xuICBhbW91bnRUZXh0OiBzdHJpbmc7XG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRRdHlDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0UHJpY2VDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxyXG5jb25zdCBmb3JtYXRRdHlWYWx1ZSA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBmb3JtYXRFeHBlbnNlTnVtYmVyKHZhbHVlLCB7XG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICBmYWxsYmFjazogXCItXCIsXG4gIH0pO1xufTtcblxuLy8gUmVhZC1vbmx5IGFuZCBlZGl0YWJsZSBmb3JtIHJlbmRlcmVyIGZvciBvbmUgdGlja2V0IGxpbmUuXG5jb25zdCBFeHBlbnNlVGlja2V0TGluZURldGFpbEZvcm0gPSAoe1xuICBoZWFkZXIsXG4gIGxpbmUsXG4gIHN0YXR1cyxcclxuICBpc0VkaXRpbmcsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcbiAgZHJhZnRRdHksXG4gIGRyYWZ0UHJpY2UsXG4gIHByaWNlVGV4dCxcbiAgYW1vdW50VGV4dCxcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlLFxuICBvbkRyYWZ0UXR5Q2hhbmdlLFxuICBvbkRyYWZ0UHJpY2VDaGFuZ2UsXG59OiBFeHBlbnNlVGlja2V0TGluZURldGFpbEZvcm1Qcm9wcykgPT4ge1xuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic3BhY2UteS0wXCI+XHJcbiAgICAgIDxFeHBlbnNlU2VjdGlvbkRpdmlkZXJcclxuICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfTGluZVwiLCBcIkxpbmVcIil9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXItLXNwYWNlZFwiXHJcbiAgICAgICAgbGFiZWxDbGFzc05hbWU9XCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlcl9fbGFiZWwtLXRpdGxlXCJcclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInJlbGF0aXZlIHNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItWyNlMmU4ZjBdIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtoZWFkZXIuZmlsZUlkIHx8IFwiLVwifVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtOmNvbC1zcGFuLTIgc3BhY2UteS0xLjVcIj5cclxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnREZXNjcmlwdGlvbn1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e2xpbmU/LmRlc2NyaXB0aW9uIHx8IFwiLVwifVxyXG4gICAgICAgICAgICAgIGZ1bGxXaWR0aFxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XHJcbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9RdHlcIiwgXCJRdWFudGl0eVwiKX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgIGlucHV0TW9kZT1cImRlY2ltYWxcIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0UXR5fVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdFF0eUNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XHJcbiAgICAgICAgICAgICAgICBvbkJsdXI9eyhldmVudCkgPT5cclxuICAgICAgICAgICAgICAgICAgb25EcmFmdFF0eUNoYW5nZShcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtmb3JtYXRRdHlWYWx1ZShsaW5lPy5xdHkgPz8gbnVsbCl9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cclxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1ByaWNlXCIsIFwiUHJpY2VcIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICBpbnB1dE1vZGU9XCJkZWNpbWFsXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFByaWNlfVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdFByaWNlQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cclxuICAgICAgICAgICAgICAgIG9uQmx1cj17KGV2ZW50KSA9PlxyXG4gICAgICAgICAgICAgICAgICBvbkRyYWZ0UHJpY2VDaGFuZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKGV2ZW50LnRhcmdldC52YWx1ZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICBmYWxsYmFjazogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9QcmljZVwiLCBcIlByaWNlXCIpfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJpY2VcIiwgXCJQcmljZVwiKX1cbiAgICAgICAgICAgICAgdmFsdWU9e3ByaWNlVGV4dCB8fCBcIi1cIn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Ftb3VudFwiLCBcIkFtb3VudFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXthbW91bnRUZXh0IHx8IFwiLVwifVxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1zbSB0ZXh0LVsjMDAyOTZiYjhdXCI+XG4gICAgICAgICAgPHNwYW4+e3N0YXR1c308L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldExpbmVEZXRhaWxGb3JtO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24sIHBhcnNlRGVjaW1hbElucHV0IH0gZnJvbSBcIi4uLy4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHN5bmNFeHBlbnNlTGlua2VkVGlja2V0U2hlZXRMaW5lIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VMaW5rZWRUaWNrZXRTaGVldFN5bmMudHNcIjtcbmltcG9ydCB7IHJlc29sdmVFeHBlbnNlU2hlZXRFZGl0QWNjZXNzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VTaGVldEVkaXRBY2Nlc3MudHNcIjtcbmltcG9ydCB7IGNsZWFyRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlLCBzYXZlRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZS50c1wiO1xuaW1wb3J0IHsgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0TGluZSwgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0TGluZSwgdXBkYXRlRXhwZW5zZVNoZWV0VGlja2V0TGluZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBpc1ZhbGlkVGlja2V0TGluZUFtb3VudCwgcmVzb2x2ZVRpY2tldExpbmVBbW91bnQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldExpbmVBbW91bnQudHNcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0TGluZURldGFpbE11dGF0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIGNhbkNyZWF0ZVRpY2tldDogYm9vbGVhbjtcclxuICBjYW5FZGl0VGlja2V0OiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZVRpY2tldDogYm9vbGVhbjtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBsaW5lUmVjSWQ6IHN0cmluZztcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xuICBkcmFmdFF0eTogc3RyaW5nO1xuICBkcmFmdFByaWNlOiBzdHJpbmc7XG4gIGxpbmtlZEV4cGVuc2VTaGVldElkPzogc3RyaW5nO1xuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xyXG4gIGNhbk1hbmFnZU90aGVyVXNlcnM6IGJvb2xlYW47XHJcbiAgY3VycmVudEF4VXNlcklkOiBzdHJpbmc7XHJcbiAgY3VycmVudENybVVzZXJJZDogc3RyaW5nO1xyXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZDogc3RyaW5nO1xyXG4gIHNraXBMaW5rZWRTaGVldFN5bmNPbkNyZWF0ZT86IGJvb2xlYW47XHJcbiAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlPzogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkxpbmtlZFNoZWV0U3luY1N1Y2Nlc3M/OiAoKSA9PiB2b2lkO1xyXG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxuICBzZXRTdGF0dXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG59O1xyXG5cclxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgdGlja2V0IGxpbmUgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldExpbmVEZXRhaWxNdXRhdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzQ3JlYXRlTW9kZSxcclxuICBjYW5DcmVhdGVUaWNrZXQsXHJcbiAgY2FuRWRpdFRpY2tldCxcclxuICBjYW5EZWxldGVUaWNrZXQsXHJcbiAgZmlsZUlkLFxyXG4gIGxpbmVSZWNJZCxcbiAgZHJhZnREZXNjcmlwdGlvbixcbiAgZHJhZnRRdHksXG4gIGRyYWZ0UHJpY2UsXG4gIGxpbmtlZEV4cGVuc2VTaGVldElkLFxuICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgY3VycmVudEF4VXNlcklkLFxyXG4gIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gIHNraXBMaW5rZWRTaGVldFN5bmNPbkNyZWF0ZSA9IGZhbHNlLFxyXG4gIG9uTGlua2VkU2hlZXRTeW5jRmFpbHVyZSxcclxuICBvbkxpbmtlZFNoZWV0U3luY1N1Y2Nlc3MsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBzZXRCdXN5LFxyXG4gIHNldFN0YXR1cyxcclxuICBzZXRJc0VkaXRpbmcsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xyXG4gIGNvbnN0IHZhbGlkYXRlTGlua2VkU2hlZXRCZWZvcmVNdXRhdGlvbiA9IHVzZUNhbGxiYWNrKGFzeW5jICgpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+ID0+IHtcclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQobGlua2VkRXhwZW5zZVNoZWV0SWQpO1xyXG4gICAgaWYgKCFzYWZlU2hlZXRJZCkge1xyXG4gICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhY2Nlc3NSZXN1bHQgPSBhd2FpdCByZXNvbHZlRXhwZW5zZVNoZWV0RWRpdEFjY2Vzcyh7XHJcbiAgICAgIHNoZWV0SWQ6IHNhZmVTaGVldElkLFxyXG4gICAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIGlmICghYWNjZXNzUmVzdWx0LmlzTG9ja2VkKSB7XHJcbiAgICAgIHJldHVybiBzYWZlU2hlZXRJZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtZXNzYWdlID1cclxuICAgICAgc2FmZVRleHQoYWNjZXNzUmVzdWx0LmJsb2NrZWRNZXNzYWdlKSB8fFxyXG4gICAgICBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUmVhZE9ubHlCeVN0YXR1c1wiLCBcIk5vIHNlIHB1ZWRlIGVkaXRhciBlc3RhIGhvamEgZGUgZ2FzdG9zIGVuIGVsIGVzdGFkbyBhY3R1YWwuXCIpO1xyXG4gICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0sIFtcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIGxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFN0YXR1cyxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVXBkYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kgfHwgIWlzRWRpdGluZykgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgY2FuUHJvY2VlZCA9IGlzQ3JlYXRlTW9kZSA/IGNhbkNyZWF0ZVRpY2tldCA6IGNhbkVkaXRUaWNrZXQ7XHJcbiAgICBpZiAoIWNhblByb2NlZWQpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgbm9ybWFsaXplZERlc2NyaXB0aW9uID0gU3RyaW5nKGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpO1xuICAgIGNvbnN0IHBhcnNlZFF0eSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0UXR5KTtcbiAgICBjb25zdCBwYXJzZWRQcmljZSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0UHJpY2UpO1xuICAgIGNvbnN0IHBhcnNlZExpbmUgPSB7XG4gICAgICBxdHk6IHBhcnNlZFF0eSxcbiAgICAgIHByaWNlOiBwYXJzZWRQcmljZSxcbiAgICB9O1xuICAgIGNvbnN0IGxpbmVBbW91bnQgPSByZXNvbHZlVGlja2V0TGluZUFtb3VudChwYXJzZWRMaW5lKTtcblxuICAgIGlmICghbm9ybWFsaXplZERlc2NyaXB0aW9uIHx8ICFpc1ZhbGlkVGlja2V0TGluZUFtb3VudChwYXJzZWRMaW5lKSB8fCBsaW5lQW1vdW50ID09PSBudWxsKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcbiAgICAgICAgXCJFeHBlbnNlVGlja2V0c19MaW5lX1ZhbGlkYXRpb25fQW1vdW50UXR5XCIsXG4gICAgICAgIFwiTGEgY2FudGlkYWQgbm8gcHVlZGUgc2VyIG5lZ2F0aXZhLCBlbCBwcmVjaW8gbm8gcHVlZGUgc2VyIDAgeSBsYSBjYW50aWRhZCAwIHNvbG8gc2UgcGVybWl0ZSBlbiBkZXNjdWVudG9zIG5lZ2F0aXZvcy5cIlxuICAgICAgKTtcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsaWRhdGVkU2hlZXRJZCA9IGF3YWl0IHZhbGlkYXRlTGlua2VkU2hlZXRCZWZvcmVNdXRhdGlvbigpO1xuICAgIGlmICh2YWxpZGF0ZWRTaGVldElkID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICBzdGFydFN0YXR1czogaXNDcmVhdGVNb2RlXHJcbiAgICAgICAgPyBpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9DcmVhdGluZ1wiLCBcIkNyZWF0aW5nIGV4cGVuc2UgbGluZS4uLlwiKVxyXG4gICAgICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfVXBkYXRpbmdcIiwgXCJVcGRhdGluZyBleHBlbnNlIGxpbmUuLi5cIiksXHJcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRCdXN5LFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAgZGVzY3JpcHRpb246IG5vcm1hbGl6ZWREZXNjcmlwdGlvbixcbiAgICAgICAgICBxdHk6IE51bWJlcihwYXJzZWRRdHkpLFxuICAgICAgICAgIHByaWNlOiBOdW1iZXIocGFyc2VkUHJpY2UpLFxuICAgICAgICAgIHRvdGFsQW1vdW50OiBOdW1iZXIobGluZUFtb3VudCksXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gaXNDcmVhdGVNb2RlXHJcbiAgICAgICAgICA/IGF3YWl0IGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldExpbmUoZmlsZUlkLCBwYXlsb2FkKVxyXG4gICAgICAgICAgOiBhd2FpdCB1cGRhdGVFeHBlbnNlU2hlZXRUaWNrZXRMaW5lKGZpbGVJZCwgbGluZVJlY0lkLCBwYXlsb2FkKTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZhbGlkYXRlZFNoZWV0SWQgJiYgIShpc0NyZWF0ZU1vZGUgJiYgc2tpcExpbmtlZFNoZWV0U3luY09uQ3JlYXRlKSkge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgc3luY0V4cGVuc2VMaW5rZWRUaWNrZXRTaGVldExpbmUoe1xyXG4gICAgICAgICAgICAgIGZpbGVJZCxcclxuICAgICAgICAgICAgICBzaGVldElkOiB2YWxpZGF0ZWRTaGVldElkLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY2xlYXJFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoKTtcclxuICAgICAgICAgICAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzPy4oKTtcclxuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPVxyXG4gICAgICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3JcclxuICAgICAgICAgICAgICAgID8gZXJyb3IubWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgOiBpbmRUKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiRXhwZW5zZVRpY2tldHNfU2hlZXRTeW5jX1JldHJ5UmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBcIlRpY2tldCBkYXRhIGNoYW5nZWQsIGJ1dCB3ZSBjb3VsZCBub3Qgc3luYyB0aGUgZXhwZW5zZSBsaW5lLiBTYXZlIGFnYWluIGJlZm9yZSBsZWF2aW5nLlwiXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHNhdmVFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoe1xyXG4gICAgICAgICAgICAgIGZpbGVJZCxcclxuICAgICAgICAgICAgICBzaGVldElkOiB2YWxpZGF0ZWRTaGVldElkLFxyXG4gICAgICAgICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBvbkxpbmtlZFNoZWV0U3luY0ZhaWx1cmU/LihtZXNzYWdlKTtcclxuICAgICAgICAgICAgaWYgKCFpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICAgICAgY2xlYXJFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoKTtcclxuICAgICAgICAgIG9uTGlua2VkU2hlZXRTeW5jU3VjY2Vzcz8uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTdGF0dXMoXHJcbiAgICAgICAgICBpc0NyZWF0ZU1vZGVcclxuICAgICAgICAgICAgPyBpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9DcmVhdGVkXCIsIFwiRXhwZW5zZSBsaW5lIGNyZWF0ZWRcIilcclxuICAgICAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBsaW5lIHVwZGF0ZWRcIilcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmICghaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQub2s7XHJcbiAgfSwgW1xyXG4gICAgYnVzeSxcclxuICAgIGNhbkNyZWF0ZVRpY2tldCxcclxuICAgIGNhbkVkaXRUaWNrZXQsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0UHJpY2UsXG4gICAgZHJhZnRRdHksXG4gICAgZmlsZUlkLFxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGxpbmVSZWNJZCxcclxuICAgIG9uTGlua2VkU2hlZXRTeW5jRmFpbHVyZSxcclxuICAgIG9uTGlua2VkU2hlZXRTeW5jU3VjY2VzcyxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2tpcExpbmtlZFNoZWV0U3luY09uQ3JlYXRlLFxyXG4gICAgdmFsaWRhdGVMaW5rZWRTaGVldEJlZm9yZU11dGF0aW9uLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5EZWxldGVUaWNrZXQpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmFsaWRhdGVkU2hlZXRJZCA9IGF3YWl0IHZhbGlkYXRlTGlua2VkU2hlZXRCZWZvcmVNdXRhdGlvbigpO1xyXG4gICAgaWYgKHZhbGlkYXRlZFNoZWV0SWQgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBleHBlbnNlIGxpbmUuLi5cIiksXHJcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRXJyb3JcIiwgXCJEZWxldGUgZXJyb3IuXCIpLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRCdXN5LFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0TGluZShmaWxlSWQsIGxpbmVSZWNJZCk7XHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZhbGlkYXRlZFNoZWV0SWQpIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHN5bmNFeHBlbnNlTGlua2VkVGlja2V0U2hlZXRMaW5lKHtcclxuICAgICAgICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgICAgICAgc2hlZXRJZDogdmFsaWRhdGVkU2hlZXRJZCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKCk7XHJcbiAgICAgICAgICAgIG9uTGlua2VkU2hlZXRTeW5jU3VjY2Vzcz8uKCk7XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID1cclxuICAgICAgICAgICAgICBlcnJvciBpbnN0YW5jZW9mIEVycm9yXHJcbiAgICAgICAgICAgICAgICA/IGVycm9yLm1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIDogaW5kVChcclxuICAgICAgICAgICAgICAgICAgICBcIkV4cGVuc2VUaWNrZXRzX1NoZWV0U3luY19SZXRyeVJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJUaWNrZXQgZGF0YSBjaGFuZ2VkLCBidXQgd2UgY291bGQgbm90IHN5bmMgdGhlIGV4cGVuc2UgbGluZS4gU2F2ZSBhZ2FpbiBiZWZvcmUgbGVhdmluZy5cIlxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBzYXZlRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKHtcclxuICAgICAgICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgICAgICAgc2hlZXRJZDogdmFsaWRhdGVkU2hlZXRJZCxcclxuICAgICAgICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlPy4obWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9EZWxldGVkXCIsIFwiRXhwZW5zZSBsaW5lIGRlbGV0ZWRcIikpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICB9LCBbXHJcbiAgICBidXN5LFxyXG4gICAgY2FuRGVsZXRlVGlja2V0LFxyXG4gICAgZmlsZUlkLFxyXG4gICAgbGluZVJlY0lkLFxyXG4gICAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlLFxyXG4gICAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICB2YWxpZGF0ZUxpbmtlZFNoZWV0QmVmb3JlTXV0YXRpb24sXHJcbiAgXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHtcclxuICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXHJcbiAgbmF2aWdhdGVUb0V4cGVuc2VVcmwsXHJcbiAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIG1hcEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIsXHJcbiAgbWFwRXhwZW5zZVRpY2tldERldGFpbExpbmUsXHJcbiAgdHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLFxyXG4gIHR5cGUgRXhwZW5zZVRpY2tldERldGFpbExpbmUsXHJcbn0gZnJvbSBcIi4uL2RldGFpbC9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldExpbmVEZXRhaWxTdGF0ZUFyZ3MgPSB7XHJcbiAgaGFzQWNjZXNzOiBib29sZWFuO1xyXG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcclxuICBjYW5FZGl0VGlja2V0OiBib29sZWFuO1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGxpbmVSZWNJZDogc3RyaW5nO1xyXG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gT3ducyBzdGF0ZSBhbmQgYmVoYXZpb3IgZm9yIHRpY2tldCBsaW5lIGRldGFpbCBwYWdlIChyZWFkIGFuZCBlZGl0KS5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsU3RhdGUgPSAoe1xyXG4gIGhhc0FjY2VzcyxcclxuICBpc0NyZWF0ZU1vZGUsXHJcbiAgY2FuRWRpdFRpY2tldCxcclxuICBmaWxlSWQsXHJcbiAgbGluZVJlY0lkLFxyXG4gIG9uRm9yYmlkZGVuLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0TGluZURldGFpbFN0YXRlQXJncykgPT4ge1xyXG4gIGNvbnN0IFtoZWFkZXIsIHNldEhlYWRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2xpbmUsIHNldExpbmVdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldERldGFpbExpbmUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtpc0VkaXRpbmcsIHNldElzRWRpdGluZ10gPSB1c2VTdGF0ZSgoKSA9PiBpc0NyZWF0ZU1vZGUpO1xyXG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdERlc2NyaXB0aW9uLCBzZXREcmFmdERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRRdHksIHNldERyYWZ0UXR5XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRQcmljZSwgc2V0RHJhZnRQcmljZV0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICBjb25zdCBoeWRyYXRlRHJhZnRGcm9tTGluZSA9IHVzZUNhbGxiYWNrKChuZXh0TGluZTogRXhwZW5zZVRpY2tldERldGFpbExpbmUgfCBudWxsKSA9PiB7XG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbihzYWZlVGV4dChuZXh0TGluZT8uZGVzY3JpcHRpb24pKTtcbiAgICBzZXREcmFmdFF0eShcclxuICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKG5leHRMaW5lPy5xdHksIHtcclxuICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICAgIHNldERyYWZ0UHJpY2UoXG4gICAgICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIobmV4dExpbmU/LnByaWNlLCB7XG4gICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICAgICAgZmFsbGJhY2s6IFwiXCIsXG4gICAgICB9KVxuICAgICk7XG4gIH0sIFtdKTtcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBsb2FkRGV0YWlsID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBpZiAoIWhhc0FjY2Vzcykge1xyXG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWZpbGVJZCB8fCAoIWlzQ3JlYXRlTW9kZSAmJiAhbGluZVJlY0lkKSkge1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiVGlja2V0c19EZXRhaWxfTm90Rm91bmRcIiwgXCJUaWNrZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXQoZmlsZUlkLCB7XHJcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlPy5NZXNzYWdlIHx8IGluZFQoXCJUaWNrZXRzX0RldGFpbF9Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXQgZGV0YWlsLlwiKSk7XHJcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGlja2V0ID1cclxuICAgICAgICAgIGl0ZW1zLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uRmlsZUlkKS50b1VwcGVyQ2FzZSgpID09PSBmaWxlSWQudG9VcHBlckNhc2UoKSkgfHwgaXRlbXNbMF0gfHwgbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKCFzZWxlY3RlZFRpY2tldCkge1xyXG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJUaWNrZXRzX0RldGFpbF9Ob3RGb3VuZFwiLCBcIlRpY2tldCB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWFwcGVkSGVhZGVyID0gbWFwRXhwZW5zZVRpY2tldERldGFpbEhlYWRlcihzZWxlY3RlZFRpY2tldCk7XHJcbiAgICAgICAgY29uc3QgbWFwcGVkTGluZXMgPSAoQXJyYXkuaXNBcnJheShzZWxlY3RlZFRpY2tldC5MaW5lcykgPyBzZWxlY3RlZFRpY2tldC5MaW5lcyA6IFtdKS5tYXAoKGVudHJ5KSA9PlxyXG4gICAgICAgICAgbWFwRXhwZW5zZVRpY2tldERldGFpbExpbmUoZW50cnkpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgICAgICBzZXRIZWFkZXIobWFwcGVkSGVhZGVyKTtcclxuICAgICAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzZWxlY3RlZExpbmUgPVxyXG4gICAgICAgICAgbWFwcGVkTGluZXMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5LnJlY0lkKS50b1VwcGVyQ2FzZSgpID09PSBsaW5lUmVjSWQudG9VcHBlckNhc2UoKSkgfHwgbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKCFzZWxlY3RlZExpbmUpIHtcclxuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiVGlja2V0c19EZXRhaWxfTm90Rm91bmRcIiwgXCJUaWNrZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgICAgc2V0SGVhZGVyKG1hcHBlZEhlYWRlcik7XHJcbiAgICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0SGVhZGVyKG1hcHBlZEhlYWRlcik7XHJcbiAgICAgICAgc2V0TGluZShzZWxlY3RlZExpbmUpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiVGlja2V0c19EZXRhaWxfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0IGRldGFpbC5cIikpO1xyXG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdm9pZCBsb2FkRGV0YWlsKCk7XHJcbiAgfSwgW2ZpbGVJZCwgaGFzQWNjZXNzLCBpc0NyZWF0ZU1vZGUsIGxpbmVSZWNJZCwgb25Gb3JiaWRkZW5dKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghbGluZSB8fCBpc0VkaXRpbmcpIHJldHVybjtcclxuICAgIGh5ZHJhdGVEcmFmdEZyb21MaW5lKGxpbmUpO1xyXG4gIH0sIFtoeWRyYXRlRHJhZnRGcm9tTGluZSwgaXNFZGl0aW5nLCBsaW5lXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWlzQ3JlYXRlTW9kZSB8fCBpc0xvYWRpbmcgfHwgIWhlYWRlcikgcmV0dXJuO1xyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbihcIlwiKTtcbiAgICBzZXREcmFmdFF0eShcIlwiKTtcbiAgICBzZXREcmFmdFByaWNlKFwiXCIpO1xuICB9LCBbaGVhZGVyLCBpc0NyZWF0ZU1vZGUsIGlzTG9hZGluZ10pO1xuXHJcbiAgY29uc3QgaGFzQWN0aXZlUHJvY2VzcyA9IHVzZU1lbW8oKCkgPT4gYnVzeSB8fCBpc0VkaXRpbmcsIFtidXN5LCBpc0VkaXRpbmddKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZChoYXNBY3RpdmVQcm9jZXNzKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCgpO1xyXG4gICAgfTtcclxuICB9LCBbaGFzQWN0aXZlUHJvY2Vzc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSB8fCBpc0xvYWRpbmcgfHwgIWhlYWRlciB8fCAhbGluZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjYW5FZGl0VGlja2V0KSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xyXG4gICAgaHlkcmF0ZURyYWZ0RnJvbUxpbmUobGluZSk7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0VkaXRpbmdFbmFibGVkXCIsIFwiRWRpdGluZyBlbmFibGVkXCIpKTtcclxuICB9LCBbY2FuRWRpdFRpY2tldCwgaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tTGluZSwgaXNDcmVhdGVNb2RlLCBpc0xvYWRpbmcsIGxpbmUsIG9uRm9yYmlkZGVuXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNhbmNlbEVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWlzRWRpdGluZykgcmV0dXJuO1xyXG5cclxuICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgaHlkcmF0ZURyYWZ0RnJvbUxpbmUobGluZSk7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xyXG4gIH0sIFtoeWRyYXRlRHJhZnRGcm9tTGluZSwgaXNFZGl0aW5nLCBsaW5lXSk7XHJcblxyXG4gIGNvbnN0IG5hdmlnYXRlVG9UaWNrZXREZXRhaWwgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBzYWZlRmlsZUlkID0gc2FmZVRleHQoZmlsZUlkKTtcclxuICAgIGlmICghc2FmZUZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD9maWxlSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZUZpbGVJZCl9YCk7XHJcbiAgfSwgW2ZpbGVJZF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGVhZGVyLFxyXG4gICAgbGluZSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGJ1c3ksXHJcbiAgICBzdGF0dXMsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtb2RhbEVycm9yLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICBkcmFmdFF0eSxcbiAgICBkcmFmdFByaWNlLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcbiAgICBzZXREcmFmdFF0eSxcbiAgICBzZXREcmFmdFByaWNlLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBuYXZpZ2F0ZVRvVGlja2V0RGV0YWlsLFxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIGlzTG9ja2VkOiBib29sZWFuO1xyXG4gIHBlcm1pc3Npb25zUmVhZHk/OiBib29sZWFuO1xyXG4gIGNhbkNyZWF0ZVRpY2tldDogYm9vbGVhbjtcclxuICBjYW5FZGl0VGlja2V0OiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZVRpY2tldDogYm9vbGVhbjtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUNhbmNlbEVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBvblNhdmVTdWNjZXNzOiAoKSA9PiB2b2lkO1xyXG4gIG9uRGVsZXRlU3VjY2Vzcz86ICgpID0+IHZvaWQ7XHJcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xyXG4gIH0pID0+IHZvaWQ7XHJcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gc3RhdGUgYW5kIGRpc3BhdGNoIGFjdGlvbnMgZm9yIHRpY2tldCBsaW5lIGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbE9wZW4sXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzQ3JlYXRlTW9kZSxcclxuICBpc0xvY2tlZCxcclxuICBwZXJtaXNzaW9uc1JlYWR5ID0gdHJ1ZSxcclxuICBjYW5DcmVhdGVUaWNrZXQsXHJcbiAgY2FuRWRpdFRpY2tldCxcclxuICBjYW5EZWxldGVUaWNrZXQsXHJcbiAgZmlsZUlkLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIGhhbmRsZVVwZGF0ZSxcclxuICBoYW5kbGVEZWxldGUsXHJcbiAgb25TYXZlU3VjY2VzcyxcclxuICBvbkRlbGV0ZVN1Y2Nlc3MsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0TGluZURldGFpbFRvcGJhckFjdGlvbnNBcmdzKSA9PiB7XHJcbiAgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zKHtcclxuICAgIGFjdGlvbkdyb3VwSWQ6IFwiZXhwZW5zZS10aWNrZXQtbGluZS1kZXRhaWwtYWN0aW9uc1wiLFxyXG4gICAgaWRzOiB7XHJcbiAgICAgIGVkaXRJY29uSWQ6IFwiZXhwZW5zZVRpY2tldExpbmVFZGl0SWNvblwiLFxyXG4gICAgICBzYXZlSWNvbklkOiBcImV4cGVuc2VUaWNrZXRMaW5lU2F2ZUljb25cIixcclxuICAgICAgZGVsZXRlQnRuSWQ6IFwiZXhwZW5zZVRpY2tldExpbmVEZWxldGVCdG5cIixcclxuICAgICAgY2FuY2VsQnRuSWQ6IFwiZXhwZW5zZVRpY2tldExpbmVDYW5jZWxCdG5cIixcclxuICAgIH0sXHJcbiAgICBldmVudHM6IHtcclxuICAgICAgZWRpdEV2ZW50OiBcImV4cGVuc2UtdGlja2V0LWxpbmUtZGV0YWlsLWVkaXRcIixcclxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtbGluZS1kZXRhaWwtZGVsZXRlXCIsXHJcbiAgICAgIGNhbmNlbEV2ZW50OiBcImV4cGVuc2UtdGlja2V0LWxpbmUtZGV0YWlsLWNhbmNlbC1lZGl0XCIsXHJcbiAgICB9LFxyXG4gICAgYnVzeSxcclxuICAgIG1vZGFsT3BlbixcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzTG9ja2VkLFxyXG4gICAgcGVybWlzc2lvbnNSZWFkeSxcclxuICAgIGNhbkNyZWF0ZTogY2FuQ3JlYXRlVGlja2V0LFxyXG4gICAgY2FuRWRpdDogY2FuRWRpdFRpY2tldCxcclxuICAgIGNhbkRlbGV0ZTogY2FuRGVsZXRlVGlja2V0LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlU2F2ZTogaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgc2F2ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiU2F2ZSBjaGFuZ2VzXCIpLFxyXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXHJcbiAgICBzYXZlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXHJcbiAgICBkZWxldGVDb25maXJtVGl0bGU6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9UaXRsZVwiLCBcIkRlbGV0ZVwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiQ29uZmlybV9EZWxldGVfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/XCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpLFxyXG4gICAgb25TYXZlU3VjY2VzcyxcclxuICAgIG9uRGVsZXRlU3VjY2Vzczogb25EZWxldGVTdWNjZXNzIHx8ICgoKSA9PiB7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD9maWxlSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoZmlsZUlkKX1gKTtcclxuICAgIH0pLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUE0Qzs7O0FDZ0R0QztBQTFCTixJQUFN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
