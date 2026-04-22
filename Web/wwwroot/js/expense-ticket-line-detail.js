import {
  clearExpenseTicketSheetSyncState,
  readExpenseTicketSheetSyncState,
  saveExpenseTicketSheetSyncState,
  syncExpenseLinkedTicketSheetLine
} from "./chunks/chunk-4OIFNO6E.js";
import {
  mapExpenseTicketDetailHeader,
  mapExpenseTicketDetailLine
} from "./chunks/chunk-L2QBQ4WC.js";
import {
  resolveExpenseSheetEditAccess,
  useExpenseTicketLinkSheetGate
} from "./chunks/chunk-BR2AQFKV.js";
import "./chunks/chunk-2H26NNTY.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-54VKJ5RM.js";
import "./chunks/chunk-4BE3ZFCK.js";
import {
  appendExpenseTicketReturnQuery,
  isManagingOtherExpenseUser,
  normalizeExpenseTicketReturnContext,
  resolveExpenseTicketReturnContext,
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
  deleteExpenseSheetTicketLine,
  fetchExpenseSheetTicket,
  safeText,
  updateExpenseSheetTicketLine
} from "./chunks/chunk-TC2T4EQZ.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-YWX6VBOY.js";
import "./chunks/chunk-KUDPX4K4.js";
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
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-[var(--radius-xl)]", children: [
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
            value: line.description || "-",
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
            value: formatQtyValue(line.qty)
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
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-center gap-3 text-sm text-slate-600", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: status }) })
    ] })
  ] });
};
var ExpenseTicketLineDetailForm_default = ExpenseTicketLineDetailForm;

// Web/wwwroot/react/src/pages/gastos/tickets/line/useExpenseTicketLineDetailMutations.ts
var import_react = __toESM(require_react());
var useExpenseTicketLineDetailMutations = ({
  busy,
  isEditing,
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
    if (!canEditTicket) {
      showPermissionModal();
      return false;
    }
    const normalizedDescription = String(draftDescription || "").trim();
    const parsedQty = parseDecimalInput(draftQty);
    const parsedPrice = parseDecimalInput(draftPrice);
    if (!normalizedDescription || parsedQty === null || parsedQty <= 0 || parsedPrice === null || parsedPrice <= 0) {
      const message = indT("ExpenseSheets_Line_Validation_AmountQty", "Quantity and price must be greater than 0.");
      setModalError(message);
      setStatus(message);
      return false;
    }
    const validatedSheetId = await validateLinkedSheetBeforeMutation();
    if (validatedSheetId === null) {
      return false;
    }
    const result = await executeExpenseMutation({
      startStatus: indT("ExpenseSheets_Line_Detail_Updating", "Updating expense line..."),
      fallbackErrorMessage: indT("ExpenseSheets_Detail_UpdateError", "Update error."),
      setModalError,
      setBusy,
      setStatus,
      action: async () => {
        const response = await updateExpenseSheetTicketLine(fileId, lineRecId, {
          description: normalizedDescription,
          qty: Number(parsedQty),
          price: Number(parsedPrice),
          totalAmount: Number(parsedQty) * Number(parsedPrice)
        });
        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
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
            throw new Error(message);
          }
        }
        setStatus(indT("ExpenseSheets_Line_Detail_Updated", "Expense line updated"));
        setIsEditing(false);
        return true;
      }
    });
    return result.ok;
  }, [
    busy,
    canEditTicket,
    draftDescription,
    draftPrice,
    draftQty,
    fileId,
    isEditing,
    lineRecId,
    onLinkedSheetSyncFailure,
    onLinkedSheetSyncSuccess,
    setBusy,
    setIsEditing,
    setModalError,
    setStatus,
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
  const [isEditing, setIsEditing] = (0, import_react2.useState)(false);
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
      if (!fileId || !lineRecId) {
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
  }, [fileId, hasAccess, lineRecId, onForbidden]);
  (0, import_react2.useEffect)(() => {
    if (!line || isEditing) return;
    hydrateDraftFromLine(line);
  }, [hydrateDraftFromLine, isEditing, line]);
  const hasActiveProcess = (0, import_react2.useMemo)(() => busy || isEditing, [busy, isEditing]);
  (0, import_react2.useEffect)(() => {
    setExpenseNavigationGuard(hasActiveProcess);
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [hasActiveProcess]);
  const handleEnableEdit = (0, import_react2.useCallback)(() => {
    if (isLoading || !header || !line) {
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
  }, [canEditTicket, header, hydrateDraftFromLine, isLoading, line, onForbidden]);
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
  isLocked,
  permissionsReady = true,
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
    isCreateMode: false,
    isLocked,
    permissionsReady,
    canCreate: false,
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
var ExpenseTicketLineDetailContent = () => {
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
  const [sheetSyncBlocked, setSheetSyncBlocked] = (0, import_react3.useState)(() => !!readExpenseTicketSheetSyncState(fileId));
  const [sheetSyncBlockedMessage, setSheetSyncBlockedMessage] = (0, import_react3.useState)(
    () => safeText(readExpenseTicketSheetSyncState(fileId)?.message)
  );
  import_react3.default.useEffect(() => {
    if (!explicitReturnContext) return;
    saveExpenseTicketReturnContext(explicitReturnContext);
  }, [explicitReturnContext]);
  import_react3.default.useEffect(() => {
    const syncState = readExpenseTicketSheetSyncState(fileId);
    setSheetSyncBlocked(!!syncState);
    setSheetSyncBlockedMessage(safeText(syncState?.message));
  }, [fileId]);
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
  const calculatedAmountPreview = isEditing && draftQtyValue != null && draftQtyValue > 0 && draftPriceValue != null && draftPriceValue > 0 ? draftQtyValue * draftPriceValue : line?.totalAmount ?? null;
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
  import_react3.default.useEffect(() => {
    if (!shouldBlockWorkflowExit || !ticketDetailUrl) {
      return;
    }
    const backButton = document.getElementById("globalBackBtn");
    const handleTopbarBack = (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation?.();
      navigateToExpenseUrl(ticketDetailUrl, {
        askConfirmation: false,
        bypassGuardOnce: true
      });
    };
    const handleNativeBack = (event) => {
      if (event?.state && event.state.indTrap === true) {
        return;
      }
      window.__indBypassNavigationGuardOnce?.();
      window.location.replace(ticketDetailUrl);
    };
    backButton?.addEventListener("click", handleTopbarBack, true);
    window.addEventListener("popstate", handleNativeBack);
    return () => {
      backButton?.removeEventListener("click", handleTopbarBack, true);
      window.removeEventListener("popstate", handleNativeBack);
    };
  }, [shouldBlockWorkflowExit, ticketDetailUrl]);
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
  const { handleUpdate, handleDelete } = useExpenseTicketLineDetailMutations({
    busy,
    isEditing,
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
    onLinkedSheetSyncFailure: (message) => {
      setSheetSyncBlocked(true);
      setSheetSyncBlockedMessage(message);
      setStatus(message);
    },
    onLinkedSheetSyncSuccess: () => {
      setSheetSyncBlocked(false);
      setSheetSyncBlockedMessage("");
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
    isLocked: isContextLocked || isManagingOtherUser,
    permissionsReady: managementBootstrapReady,
    canEditTicket: canEditTicket && canEditLinkedTicket,
    canDeleteTicket: canDeleteTicket && canEditLinkedTicket,
    fileId,
    setModalError,
    handleEnableEdit: handleEnableEditInContext,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
    onSaveSuccess: () => {
      reloadExpensePage();
    },
    onDeleteSuccess: () => {
      if (!ticketDetailUrl) return;
      navigateToExpenseUrl(ticketDetailUrl, {
        askConfirmation: false,
        bypassGuardOnce: true
      });
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
    !isLoading && !errorMessage && header && line ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ExpenseTicketLineDetailForm_default,
      {
        header,
        line,
        status,
        isEditing,
        draftDescription,
        draftQty,
        draftPrice,
        priceText,
        amountText,
        onDraftDescriptionChange: setDraftDescription,
        onDraftQtyChange: setDraftQty,
        onDraftPriceChange: setDraftPrice
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2xpbmUvRXhwZW5zZVRpY2tldExpbmVEZXRhaWxQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmVEZXRhaWxGb3JtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvbGluZS91c2VFeHBlbnNlVGlja2V0TGluZURldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvbGluZS91c2VFeHBlbnNlVGlja2V0TGluZURldGFpbFN0YXRlLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9saW5lL3VzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9ucy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XHJcbmltcG9ydCB7IHVzZUF1dGhDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsRm9ybSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGluZURldGFpbEZvcm0udHN4XCI7XHJcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi8uLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHsgcGFyc2VEZWNpbWFsSW5wdXQgfSBmcm9tIFwiLi4vLi4vaG9va3MvZXhwZW5zZU11dGF0aW9uVXRpbHMudHNcIjtcbmltcG9ydCB7IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VVc2VyIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VNYW5hZ2VkVXNlclNjb3BlLnRzXCI7XG5pbXBvcnQgeyBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsIHJlbG9hZEV4cGVuc2VQYWdlLCBuYXZpZ2F0ZVRvRXhwZW5zZVVybCwgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuaW1wb3J0IHsgcmVhZEV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUudHNcIjtcbmltcG9ydCB7XG4gIGFwcGVuZEV4cGVuc2VUaWNrZXRSZXR1cm5RdWVyeSxcbiAgbm9ybWFsaXplRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXG4gIHJlc29sdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcbiAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZSB9IGZyb20gXCIuLi91c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldExpbmVEZXRhaWxNdXRhdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0TGluZURldGFpbE11dGF0aW9ucy50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldExpbmVEZXRhaWxTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsU3RhdGUudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9ucy50c1wiO1xuXHJcbi8vIEluaXRpYWxpemVzIGF1dGggc2VlZCBmb3IgZXhwZW5zZSBBUEkgY2FsbHMgYmVmb3JlIGlzbGFuZCBlZmZlY3RzIHJ1bi5cclxuY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XHJcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgoe1xyXG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXHJcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcclxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIENvbnN1bWVzIHRoZSBvbmUtdGltZSBlZGl0IGhhbmRvZmYgc28gbGF0ZXIgcmVsb2FkcyByZXR1cm4gdG8gbm9ybWFsIHZpZXcgbW9kZS5cclxuY29uc3QgY29uc3VtZVRpY2tldExpbmVFZGl0TW9kZVF1ZXJ5ID0gKCkgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY3VycmVudFVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gIGlmIChzYWZlVGV4dChjdXJyZW50VXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJtb2RlXCIpKS50b0xvd2VyQ2FzZSgpICE9PSBcImVkaXRcIikge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY3VycmVudFVybC5zZWFyY2hQYXJhbXMuZGVsZXRlKFwibW9kZVwiKTtcclxuICBjb25zdCBuZXh0VXJsID0gYCR7Y3VycmVudFVybC5wYXRobmFtZX0ke2N1cnJlbnRVcmwuc2VhcmNofSR7Y3VycmVudFVybC5oYXNofWA7XHJcbiAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHdpbmRvdy5oaXN0b3J5LnN0YXRlLCBcIlwiLCBuZXh0VXJsKTtcclxufTtcblxuY29uc3QgcmVzb2x2ZUxpbmtlZFRpY2tldEJsb2NrZWRNZXNzYWdlID0gKGlzUGFpZDogYm9vbGVhbik6IHN0cmluZyA9PiB7XG4gIGlmIChpc1BhaWQpIHtcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1BhaWRSZWFkT25seVwiLCBcIkxhcyBob2phcyBkZSBnYXN0byBwYWdhZGFzIHNvbiBkZSBzb2xvIGxlY3R1cmEuXCIpO1xuICB9XG5cbiAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9SZWFkT25seUJ5U3RhdHVzXCIsIFwiTm8gc2UgcHVlZGUgZWRpdGFyIGVzdGEgaG9qYSBkZSBnYXN0b3MgZW4gZWwgZXN0YWRvIGFjdHVhbC5cIik7XG59O1xuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsQ29udGVudCA9ICgpID0+IHtcbiAgY29uc3Qge1xuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcbiAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgY3VycmVudENybVVzZXJJZCxcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXG4gICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxuICB9ID0gdXNlQXV0aENvbnRleHQoKTtcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJWaWV3XCIpO1xyXG4gIGNvbnN0IGNhbkVkaXRUaWNrZXRCeU1vZHVsZSA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiRWRpdFwiKTtcclxuICBjb25zdCBjYW5EZWxldGVUaWNrZXRCeU1vZHVsZSA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiRnVsbEFjY2Vzc1wiKTtcclxuICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1RJQ0tFVF9GSUxFX0lEX18pO1xyXG4gIGNvbnN0IGxpbmVSZWNJZCA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfVElDS0VUX0xJTkVfSURfXyk7XHJcbiAgY29uc3Qgcm91dGVQYXJhbXMgPSB1c2VNZW1vKCgpID0+IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCksIFtdKTtcbiAgY29uc3Qgc3RhcnRJbkVkaXRNb2RlID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChyb3V0ZVBhcmFtcy5nZXQoXCJtb2RlXCIpKS50b0xvd2VyQ2FzZSgpID09PSBcImVkaXRcIiwgW3JvdXRlUGFyYW1zXSk7XG4gIGNvbnN0IHJvdXRlT3JpZ2luID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChyb3V0ZVBhcmFtcy5nZXQoXCJvcmlnaW5cIikpLnRvTG93ZXJDYXNlKCksIFtyb3V0ZVBhcmFtc10pO1xuICBjb25zdCByb3V0ZVNoZWV0SWQgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcInNoZWV0SWRcIikpLCBbcm91dGVQYXJhbXNdKTtcbiAgY29uc3Qgcm91dGVTaGVldExpbmVSZWNJZCA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwic2hlZXRMaW5lUmVjSWRcIikpLCBbcm91dGVQYXJhbXNdKTtcbiAgY29uc3QgZXhwbGljaXRSZXR1cm5Db250ZXh0ID0gdXNlTWVtbyhcbiAgICAoKSA9PlxuICAgICAgbm9ybWFsaXplRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoe1xuICAgICAgICBmaWxlSWQsXG4gICAgICAgIG9yaWdpbjogcm91dGVPcmlnaW4sXG4gICAgICAgIHNoZWV0SWQ6IHJvdXRlU2hlZXRJZCxcbiAgICAgICAgc2hlZXRMaW5lUmVjSWQ6IHJvdXRlU2hlZXRMaW5lUmVjSWQsXG4gICAgICB9KSxcbiAgICBbZmlsZUlkLCByb3V0ZU9yaWdpbiwgcm91dGVTaGVldElkLCByb3V0ZVNoZWV0TGluZVJlY0lkXVxuICApO1xuICBjb25zdCB0aWNrZXRSZXR1cm5Db250ZXh0ID0gdXNlTWVtbyhcbiAgICAoKSA9PiByZXNvbHZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoZmlsZUlkLCBleHBsaWNpdFJldHVybkNvbnRleHQpLFxuICAgIFtleHBsaWNpdFJldHVybkNvbnRleHQsIGZpbGVJZF1cbiAgKTtcbiAgY29uc3QgZGV0YWlsT3JpZ2luID0gdGlja2V0UmV0dXJuQ29udGV4dD8ub3JpZ2luIHx8IHJvdXRlT3JpZ2luO1xuICBjb25zdCBhdXRvRWRpdEF0dGVtcHRlZFJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IFtzaGVldFN5bmNCbG9ja2VkLCBzZXRTaGVldFN5bmNCbG9ja2VkXSA9IHVzZVN0YXRlKCgpID0+ICEhcmVhZEV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZShmaWxlSWQpKTtcbiAgY29uc3QgW3NoZWV0U3luY0Jsb2NrZWRNZXNzYWdlLCBzZXRTaGVldFN5bmNCbG9ja2VkTWVzc2FnZV0gPSB1c2VTdGF0ZSgoKSA9PlxuICAgIHNhZmVUZXh0KHJlYWRFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoZmlsZUlkKT8ubWVzc2FnZSlcbiAgKTtcblxyXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFleHBsaWNpdFJldHVybkNvbnRleHQpIHJldHVybjtcbiAgICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoZXhwbGljaXRSZXR1cm5Db250ZXh0KTtcbiAgfSwgW2V4cGxpY2l0UmV0dXJuQ29udGV4dF0pO1xuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgc3luY1N0YXRlID0gcmVhZEV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZShmaWxlSWQpO1xuICAgIHNldFNoZWV0U3luY0Jsb2NrZWQoISFzeW5jU3RhdGUpO1xuICAgIHNldFNoZWV0U3luY0Jsb2NrZWRNZXNzYWdlKHNhZmVUZXh0KHN5bmNTdGF0ZT8ubWVzc2FnZSkpO1xuICB9LCBbZmlsZUlkXSk7XG5cclxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFzdGFydEluRWRpdE1vZGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN1bWVUaWNrZXRMaW5lRWRpdE1vZGVRdWVyeSgpO1xyXG4gIH0sIFtzdGFydEluRWRpdE1vZGVdKTtcclxuICBjb25zdCBpc01hbmFnaW5nT3RoZXJVc2VyID0gaXNNYW5hZ2luZ090aGVyRXhwZW5zZVVzZXIoe1xyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICB9KTtcclxuICBjb25zdCBjYW5FZGl0VGlja2V0ID0gY2FuRWRpdFRpY2tldEJ5TW9kdWxlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyO1xyXG4gIGNvbnN0IGNhbkRlbGV0ZVRpY2tldCA9IGNhbkRlbGV0ZVRpY2tldEJ5TW9kdWxlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyO1xyXG5cclxuICBjb25zdCB7XHJcbiAgICBoZWFkZXIsXHJcbiAgICBsaW5lLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgYnVzeSxcclxuICAgIHN0YXR1cyxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG1vZGFsRXJyb3IsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRRdHksXHJcbiAgICBkcmFmdFByaWNlLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRRdHksXHJcbiAgICBzZXREcmFmdFByaWNlLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsU3RhdGUoe1xuICAgIGhhc0FjY2VzcyxcbiAgICBjYW5FZGl0VGlja2V0LFxuICAgIGZpbGVJZCxcbiAgICBsaW5lUmVjSWQsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuXG4gIGNvbnN0IGxpbmtlZEV4cGVuc2VTaGVldElkID0gdXNlTWVtbyhcbiAgICAoKSA9PiBzYWZlVGV4dCh0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkIHx8IGhlYWRlcj8uaG9qYUdhc3Rvc0lkRGlzcGxheSB8fCByb3V0ZVNoZWV0SWQpLFxuICAgIFtoZWFkZXI/LmhvamFHYXN0b3NJZERpc3BsYXksIHJvdXRlU2hlZXRJZCwgdGlja2V0UmV0dXJuQ29udGV4dF1cbiAgKTtcbiAgY29uc3QgeyBsaW5rU2hlZXRMb2NrZWQsIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlLCBsaW5rU2hlZXRDaGVja0J1c3kgfSA9IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlKHtcbiAgICBpc0xpbmtNb2RlOiAhIWxpbmtlZEV4cGVuc2VTaGVldElkLFxuICAgIGxpbmtTaGVldElkOiBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcbiAgICBjYW5Qcm9jZXNzTGlua01vZGU6IHRydWUsXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcbiAgICByZXNvbHZlQmxvY2tlZE1lc3NhZ2U6IHJlc29sdmVMaW5rZWRUaWNrZXRCbG9ja2VkTWVzc2FnZSxcbiAgfSk7XG4gIGNvbnN0IGNhbkVkaXRMaW5rZWRUaWNrZXQgPSAhbGlua2VkRXhwZW5zZVNoZWV0SWQgfHwgKCFsaW5rU2hlZXRDaGVja0J1c3kgJiYgIWxpbmtTaGVldExvY2tlZCk7XG4gIGNvbnN0IGFsbG93QXNzaWduZWREcmFmdEVkaXQgPSBkZXRhaWxPcmlnaW4gPT09IFwic2hlZXQtY3JlYXRlXCIgfHwgKCEhbGlua2VkRXhwZW5zZVNoZWV0SWQgJiYgY2FuRWRpdExpbmtlZFRpY2tldCk7XG4gIGNvbnN0IHBlbmRpbmdGaXJzdExpbmsgPVxuICAgIGRldGFpbE9yaWdpbiA9PT0gXCJzaGVldC1jcmVhdGVcIiAmJiAhIXNhZmVUZXh0KHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQgfHwgcm91dGVTaGVldElkKSAmJiAhc2FmZVRleHQoaGVhZGVyPy5ob2phR2FzdG9zSWREaXNwbGF5KTtcbiAgY29uc3Qgd29ya2Zsb3dCbG9ja2VkTWVzc2FnZSA9IHBlbmRpbmdGaXJzdExpbmtcbiAgICA/IGluZFQoXCJFeHBlbnNlVGlja2V0c19TaGVldFN5bmNfUGVuZGluZ1NhdmVSZXF1aXJlZFwiLCBcIlNhdmUgdGhlIHRpY2tldCBiZWZvcmUgbGVhdmluZyB0aGlzIGZsb3cuXCIpXG4gICAgOiBzaGVldFN5bmNCbG9ja2VkTWVzc2FnZSB8fFxuICAgICAgaW5kVChcbiAgICAgICAgXCJFeHBlbnNlVGlja2V0c19TaGVldFN5bmNfUmV0cnlSZXF1aXJlZFwiLFxuICAgICAgICBcIlRpY2tldCBkYXRhIGNoYW5nZWQsIGJ1dCB3ZSBjb3VsZCBub3Qgc3luYyB0aGUgZXhwZW5zZSBsaW5lLiBTYXZlIGFnYWluIGJlZm9yZSBsZWF2aW5nLlwiXG4gICAgICApO1xuICBjb25zdCBzaG91bGRCbG9ja1dvcmtmbG93RXhpdCA9IHBlbmRpbmdGaXJzdExpbmsgfHwgc2hlZXRTeW5jQmxvY2tlZDtcbiAgY29uc3QgaGFuZGxlRW5hYmxlRWRpdEluQ29udGV4dCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAobGlua1NoZWV0Q2hlY2tCdXN5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGxpbmtlZEV4cGVuc2VTaGVldElkICYmIGxpbmtTaGVldExvY2tlZCkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAgIHNhZmVUZXh0KGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlKSB8fFxuICAgICAgICByZXNvbHZlTGlua2VkVGlja2V0QmxvY2tlZE1lc3NhZ2UoZmFsc2UpO1xuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBoYW5kbGVFbmFibGVFZGl0KCk7XG4gIH0sIFtcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlLFxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcbiAgICBsaW5rU2hlZXRMb2NrZWQsXG4gICAgbGlua2VkRXhwZW5zZVNoZWV0SWQsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBzZXRTdGF0dXMsXG4gIF0pO1xuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFzaG91bGRCbG9ja1dvcmtmbG93RXhpdCkge1xuICAgICAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCh7XG4gICAgICBhY3RpdmU6IHRydWUsXG4gICAgICBtZXNzYWdlOiB3b3JrZmxvd0Jsb2NrZWRNZXNzYWdlLFxuICAgICAgYmxvY2s6IHRydWUsXG4gICAgfSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCgpO1xuICAgIH07XG4gIH0sIFtidXN5LCBpc0VkaXRpbmcsIHNob3VsZEJsb2NrV29ya2Zsb3dFeGl0LCB3b3JrZmxvd0Jsb2NrZWRNZXNzYWdlXSk7XG5cclxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghc3RhcnRJbkVkaXRNb2RlIHx8IGF1dG9FZGl0QXR0ZW1wdGVkUmVmLmN1cnJlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGlzTG9hZGluZyB8fCAhaGVhZGVyIHx8ICFsaW5lIHx8IGxpbmtTaGVldENoZWNrQnVzeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF1dG9FZGl0QXR0ZW1wdGVkUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgIGhhbmRsZUVuYWJsZUVkaXRJbkNvbnRleHQoKTtcbiAgfSwgW2hhbmRsZUVuYWJsZUVkaXRJbkNvbnRleHQsIGhlYWRlciwgaXNMb2FkaW5nLCBsaW5lLCBsaW5rU2hlZXRDaGVja0J1c3ksIHN0YXJ0SW5FZGl0TW9kZV0pO1xuXHJcbiAgY29uc3QgZHJhZnRRdHlWYWx1ZSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0UXR5KTtcclxuICBjb25zdCBkcmFmdFByaWNlVmFsdWUgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFByaWNlKTtcclxuICBjb25zdCBjYWxjdWxhdGVkQW1vdW50UHJldmlldyA9XHJcbiAgICBpc0VkaXRpbmcgJiYgZHJhZnRRdHlWYWx1ZSAhPSBudWxsICYmIGRyYWZ0UXR5VmFsdWUgPiAwICYmIGRyYWZ0UHJpY2VWYWx1ZSAhPSBudWxsICYmIGRyYWZ0UHJpY2VWYWx1ZSA+IDBcclxuICAgICAgPyBkcmFmdFF0eVZhbHVlICogZHJhZnRQcmljZVZhbHVlXHJcbiAgICAgIDogbGluZT8udG90YWxBbW91bnQgPz8gbnVsbDtcclxuXHJcbiAgY29uc3QgYW1vdW50VGV4dCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koY2FsY3VsYXRlZEFtb3VudFByZXZpZXcsIHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSksXHJcbiAgICBbY2FsY3VsYXRlZEFtb3VudFByZXZpZXcsIGhlYWRlcj8uY3VycmVuY3lDb2RlXVxyXG4gICk7XHJcbiAgY29uc3QgcHJpY2VUZXh0ID0gdXNlTWVtbyhcbiAgICAoKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kobGluZT8ucHJpY2UgPz8gbnVsbCwgc2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpKSxcbiAgICBbaGVhZGVyPy5jdXJyZW5jeUNvZGUsIGxpbmU/LnByaWNlXVxuICApO1xuICBjb25zdCBpc0Fzc2lnbmVkVGlja2V0ID0gaGVhZGVyPy5zdGF0dXMgPT09IDE7XG4gIGNvbnN0IGlzQ29udGV4dExvY2tlZCA9IChpc0Fzc2lnbmVkVGlja2V0ICYmICFhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0KSB8fCAoISFsaW5rZWRFeHBlbnNlU2hlZXRJZCAmJiBsaW5rU2hlZXRMb2NrZWQpO1xuICBjb25zdCB0aWNrZXREZXRhaWxVcmwgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBzYWZlRmlsZUlkID0gc2FmZVRleHQoZmlsZUlkKTtcbiAgICBpZiAoIXNhZmVGaWxlSWQpIHJldHVybiBcIlwiO1xuICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XG4gICAgICBmaWxlSWQ6IHNhZmVGaWxlSWQsXG4gICAgfSk7XHJcbiAgICBhcHBlbmRFeHBlbnNlVGlja2V0UmV0dXJuUXVlcnkocXVlcnksIHRpY2tldFJldHVybkNvbnRleHQpO1xuICAgIHJldHVybiBgL0dhc3Rvcy9UaWNrZXREZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWA7XG4gIH0sIFtmaWxlSWQsIHRpY2tldFJldHVybkNvbnRleHRdKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghc2hvdWxkQmxvY2tXb3JrZmxvd0V4aXQgfHwgIXRpY2tldERldGFpbFVybCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEJhY2tCdG5cIik7XG4gICAgY29uc3QgaGFuZGxlVG9wYmFyQmFjayA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbj8uKCk7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0aWNrZXREZXRhaWxVcmwsIHtcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVOYXRpdmVCYWNrID0gKGV2ZW50OiBQb3BTdGF0ZUV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQ/LnN0YXRlICYmIGV2ZW50LnN0YXRlLmluZFRyYXAgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHRpY2tldERldGFpbFVybCk7XG4gICAgfTtcblxuICAgIGJhY2tCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVUb3BiYXJCYWNrLCB0cnVlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGhhbmRsZU5hdGl2ZUJhY2spO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBiYWNrQnV0dG9uPy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlVG9wYmFyQmFjaywgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGhhbmRsZU5hdGl2ZUJhY2spO1xuICAgIH07XG4gIH0sIFtzaG91bGRCbG9ja1dvcmtmbG93RXhpdCwgdGlja2V0RGV0YWlsVXJsXSk7XG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcclxuICAgICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtLCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXNdKTtcclxuXHJcbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XG4gICAgOiAhYnVzeSAmJiBtb2RhbEVycm9yXG4gICAgICA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKVxuICAgICAgOiBtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghc2hvdWxkQmxvY2tXb3JrZmxvd0V4aXQgfHwgYnVzeSkgcmV0dXJuO1xuICAgIGlmICghd29ya2Zsb3dCbG9ja2VkTWVzc2FnZSB8fCBzdGF0dXMgPT09IHdvcmtmbG93QmxvY2tlZE1lc3NhZ2UpIHJldHVybjtcbiAgICBzZXRTdGF0dXMod29ya2Zsb3dCbG9ja2VkTWVzc2FnZSk7XG4gIH0sIFtidXN5LCBzZXRTdGF0dXMsIHNob3VsZEJsb2NrV29ya2Zsb3dFeGl0LCBzdGF0dXMsIHdvcmtmbG93QmxvY2tlZE1lc3NhZ2VdKTtcblxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZvaWQgaGFuZGxlTW9kYWxDb25maXJtKCk7XHJcbiAgfSwgW2J1c3ksIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtLCBtb2RhbEVycm9yXSk7XHJcblxyXG4gIGNvbnN0IHsgaGFuZGxlVXBkYXRlLCBoYW5kbGVEZWxldGUgfSA9IHVzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsTXV0YXRpb25zKHtcbiAgICBidXN5LFxuICAgIGlzRWRpdGluZyxcbiAgICBjYW5FZGl0VGlja2V0OiBjYW5FZGl0VGlja2V0ICYmIGNhbkVkaXRMaW5rZWRUaWNrZXQsXG4gICAgY2FuRGVsZXRlVGlja2V0OiBjYW5EZWxldGVUaWNrZXQgJiYgY2FuRWRpdExpbmtlZFRpY2tldCxcbiAgICBmaWxlSWQsXG4gICAgbGluZVJlY0lkLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRRdHksXG4gICAgZHJhZnRQcmljZSxcbiAgICBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgIG9uTGlua2VkU2hlZXRTeW5jRmFpbHVyZTogKG1lc3NhZ2UpID0+IHtcbiAgICAgIHNldFNoZWV0U3luY0Jsb2NrZWQodHJ1ZSk7XG4gICAgICBzZXRTaGVldFN5bmNCbG9ja2VkTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcbiAgICB9LFxuICAgIG9uTGlua2VkU2hlZXRTeW5jU3VjY2VzczogKCkgPT4ge1xuICAgICAgc2V0U2hlZXRTeW5jQmxvY2tlZChmYWxzZSk7XG4gICAgICBzZXRTaGVldFN5bmNCbG9ja2VkTWVzc2FnZShcIlwiKTtcbiAgICB9LFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNFZGl0aW5nLFxuICB9KTtcblxuICB1c2VFeHBlbnNlVGlja2V0TGluZURldGFpbFRvcGJhckFjdGlvbnMoe1xuICAgIGJ1c3ksXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxuICAgIGlzRWRpdGluZyxcbiAgICBpc0xvY2tlZDogaXNDb250ZXh0TG9ja2VkIHx8IGlzTWFuYWdpbmdPdGhlclVzZXIsXG4gICAgcGVybWlzc2lvbnNSZWFkeTogbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxuICAgIGNhbkVkaXRUaWNrZXQ6IGNhbkVkaXRUaWNrZXQgJiYgY2FuRWRpdExpbmtlZFRpY2tldCxcbiAgICBjYW5EZWxldGVUaWNrZXQ6IGNhbkRlbGV0ZVRpY2tldCAmJiBjYW5FZGl0TGlua2VkVGlja2V0LFxuICAgIGZpbGVJZCxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQ6IGhhbmRsZUVuYWJsZUVkaXRJbkNvbnRleHQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgIHJlbG9hZEV4cGVuc2VQYWdlKCk7XG4gICAgfSxcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgIGlmICghdGlja2V0RGV0YWlsVXJsKSByZXR1cm47XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0aWNrZXREZXRhaWxVcmwsIHtcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gIH0pO1xuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXtidXN5fVxyXG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17c3RhdHVzfVxyXG4gICAgICAgIG9uQ29uZmlybT17aGFuZGxlTW9kYWxCdXR0b25Db25maXJtfVxyXG4gICAgICAgIG9uQ2FuY2VsPXtjbG9zZUNvbmZpcm19XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCJcclxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBpc0xvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XHJcbiAgICAgID5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxyXG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge2Vycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57ZXJyb3JNZXNzYWdlfTwvZGl2PiA6IG51bGx9XHJcblxyXG4gICAgICB7IWlzTG9hZGluZyAmJiAhZXJyb3JNZXNzYWdlICYmIGhlYWRlciAmJiBsaW5lID8gKFxyXG4gICAgICAgIDxFeHBlbnNlVGlja2V0TGluZURldGFpbEZvcm1cclxuICAgICAgICAgIGhlYWRlcj17aGVhZGVyfVxyXG4gICAgICAgICAgbGluZT17bGluZX1cclxuICAgICAgICAgIHN0YXR1cz17c3RhdHVzfVxyXG4gICAgICAgICAgaXNFZGl0aW5nPXtpc0VkaXRpbmd9XHJcbiAgICAgICAgICBkcmFmdERlc2NyaXB0aW9uPXtkcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgZHJhZnRRdHk9e2RyYWZ0UXR5fVxyXG4gICAgICAgICAgZHJhZnRQcmljZT17ZHJhZnRQcmljZX1cclxuICAgICAgICAgIHByaWNlVGV4dD17cHJpY2VUZXh0fVxyXG4gICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cclxuICAgICAgICAgIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZT17c2V0RHJhZnREZXNjcmlwdGlvbn1cclxuICAgICAgICAgIG9uRHJhZnRRdHlDaGFuZ2U9e3NldERyYWZ0UXR5fVxyXG4gICAgICAgICAgb25EcmFmdFByaWNlQ2hhbmdlPXtzZXREcmFmdFByaWNlfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgdGlja2V0IGxpbmUgZGV0YWlsLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0TGluZURldGFpbFBhZ2UgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cclxuICAgICAgPEV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsQ29udGVudCAvPlxyXG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cclxuICApO1xyXG59O1xyXG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XHJcbiAgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGgoKTtcclxuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2UtdGlja2V0LWxpbmUtZGV0YWlsLXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsUGFnZSAvPik7XHJcbn07XHJcblxyXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsUGFnZTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciwgRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlciwgZm9ybWF0RXhwZW5zZU51bWJlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VTZWN0aW9uRGl2aWRlciBmcm9tIFwiLi9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4XCI7XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsRm9ybVByb3BzID0ge1xyXG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlcjtcclxuICBsaW5lOiBFeHBlbnNlVGlja2V0RGV0YWlsTGluZTtcclxuICBzdGF0dXM6IHN0cmluZztcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGRyYWZ0UXR5OiBzdHJpbmc7XHJcbiAgZHJhZnRQcmljZTogc3RyaW5nO1xyXG4gIHByaWNlVGV4dDogc3RyaW5nO1xyXG4gIGFtb3VudFRleHQ6IHN0cmluZztcclxuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRRdHlDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRQcmljZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXRRdHlWYWx1ZSA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VOdW1iZXIodmFsdWUsIHtcclxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgZmFsbGJhY2s6IFwiLVwiLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gUmVhZC1vbmx5IGFuZCBlZGl0YWJsZSBmb3JtIHJlbmRlcmVyIGZvciBvbmUgdGlja2V0IGxpbmUuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsRm9ybSA9ICh7XHJcbiAgaGVhZGVyLFxyXG4gIGxpbmUsXHJcbiAgc3RhdHVzLFxyXG4gIGlzRWRpdGluZyxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRyYWZ0UXR5LFxyXG4gIGRyYWZ0UHJpY2UsXHJcbiAgcHJpY2VUZXh0LFxyXG4gIGFtb3VudFRleHQsXHJcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlLFxyXG4gIG9uRHJhZnRRdHlDaGFuZ2UsXHJcbiAgb25EcmFmdFByaWNlQ2hhbmdlLFxyXG59OiBFeHBlbnNlVGlja2V0TGluZURldGFpbEZvcm1Qcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzcGFjZS15LTBcIj5cclxuICAgICAgPEV4cGVuc2VTZWN0aW9uRGl2aWRlclxyXG4gICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lXCIsIFwiTGluZVwiKX1cclxuICAgICAgICBjbGFzc05hbWU9XCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlci0tc3BhY2VkXCJcclxuICAgICAgICBsYWJlbENsYXNzTmFtZT1cImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyX19sYWJlbC0tdGl0bGVcIlxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicmVsYXRpdmUgc2hhZG93LXhzIGdsYXNzLXBhbmVsIHAtNCBzcGFjZS15LTQgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV1cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX0ZpbGVJZFwiLCBcIlRpY2tldFwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2hlYWRlci5maWxlSWQgfHwgXCItXCJ9XHJcbiAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cclxuICAgICAgICAgICAgICB2YWx1ZT17bGluZS5kZXNjcmlwdGlvbiB8fCBcIi1cIn1cclxuICAgICAgICAgICAgICBmdWxsV2lkdGhcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAge2lzRWRpdGluZyA/IChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUXR5XCIsIFwiUXVhbnRpdHlcIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICBpbnB1dE1vZGU9XCJkZWNpbWFsXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFF0eX1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnRRdHlDaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxyXG4gICAgICAgICAgICAgICAgb25CbHVyPXsoZXZlbnQpID0+XHJcbiAgICAgICAgICAgICAgICAgIG9uRHJhZnRRdHlDaGFuZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKGV2ZW50LnRhcmdldC52YWx1ZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICBmYWxsYmFjazogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9RdHlcIiwgXCJRdWFudGl0eVwiKX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9RdHlcIiwgXCJRdWFudGl0eVwiKX1cclxuICAgICAgICAgICAgICB2YWx1ZT17Zm9ybWF0UXR5VmFsdWUobGluZS5xdHkpfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XHJcbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9QcmljZVwiLCBcIlByaWNlXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgaW5wdXRNb2RlPVwiZGVjaW1hbFwiXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRQcmljZX1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnRQcmljZUNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XHJcbiAgICAgICAgICAgICAgICBvbkJsdXI9eyhldmVudCkgPT5cclxuICAgICAgICAgICAgICAgICAgb25EcmFmdFByaWNlQ2hhbmdlKFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihldmVudC50YXJnZXQudmFsdWUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgICAgICAgICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgICAgICAgICAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZmFsbGJhY2s6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJpY2VcIiwgXCJQcmljZVwiKX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9QcmljZVwiLCBcIlByaWNlXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtwcmljZVRleHQgfHwgXCItXCJ9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQW1vdW50XCIsIFwiQW1vdW50XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17YW1vdW50VGV4dCB8fCBcIi1cIn1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgPHNwYW4+e3N0YXR1c308L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldExpbmVEZXRhaWxGb3JtO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24sIHBhcnNlRGVjaW1hbElucHV0IH0gZnJvbSBcIi4uLy4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XG5pbXBvcnQgeyBzeW5jRXhwZW5zZUxpbmtlZFRpY2tldFNoZWV0TGluZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTGlua2VkVGlja2V0U2hlZXRTeW5jLnRzXCI7XG5pbXBvcnQgeyByZXNvbHZlRXhwZW5zZVNoZWV0RWRpdEFjY2VzcyB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlU2hlZXRFZGl0QWNjZXNzLnRzXCI7XG5pbXBvcnQgeyBjbGVhckV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZSwgc2F2ZUV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUudHNcIjtcbmltcG9ydCB7IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldExpbmUsIHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldExpbmUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcblxudHlwZSBVc2VFeHBlbnNlVGlja2V0TGluZURldGFpbE11dGF0aW9uc0FyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgY2FuRWRpdFRpY2tldDogYm9vbGVhbjtcbiAgY2FuRGVsZXRlVGlja2V0OiBib29sZWFuO1xuICBmaWxlSWQ6IHN0cmluZztcbiAgbGluZVJlY0lkOiBzdHJpbmc7XG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcbiAgZHJhZnRRdHk6IHN0cmluZztcbiAgZHJhZnRQcmljZTogc3RyaW5nO1xuICBsaW5rZWRFeHBlbnNlU2hlZXRJZD86IHN0cmluZztcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcbiAgY2FuTWFuYWdlT3RoZXJVc2VyczogYm9vbGVhbjtcbiAgY3VycmVudEF4VXNlcklkOiBzdHJpbmc7XG4gIGN1cnJlbnRDcm1Vc2VySWQ6IHN0cmluZztcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkOiBzdHJpbmc7XG4gIG9uTGlua2VkU2hlZXRTeW5jRmFpbHVyZT86IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uTGlua2VkU2hlZXRTeW5jU3VjY2Vzcz86ICgpID0+IHZvaWQ7XG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xufTtcblxyXG4vLyBFbmNhcHN1bGF0ZXMgdXBkYXRlIGFuZCBkZWxldGUgbXV0YXRpb25zIGZvciB0aWNrZXQgbGluZSBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0TGluZURldGFpbE11dGF0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBpc0VkaXRpbmcsXHJcbiAgY2FuRWRpdFRpY2tldCxcclxuICBjYW5EZWxldGVUaWNrZXQsXHJcbiAgZmlsZUlkLFxuICBsaW5lUmVjSWQsXG4gIGRyYWZ0RGVzY3JpcHRpb24sXG4gIGRyYWZ0UXR5LFxuICBkcmFmdFByaWNlLFxuICBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcbiAgYWxsb3dTZWxmTWFuYWdlbWVudCxcbiAgY2FuTWFuYWdlT3RoZXJVc2VycyxcbiAgY3VycmVudEF4VXNlcklkLFxuICBjdXJyZW50Q3JtVXNlcklkLFxuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXG4gIG9uTGlua2VkU2hlZXRTeW5jRmFpbHVyZSxcbiAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzLFxuICBzZXRNb2RhbEVycm9yLFxuICBzZXRCdXN5LFxuICBzZXRTdGF0dXMsXG4gIHNldElzRWRpdGluZyxcbn06IFVzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xuICBjb25zdCB2YWxpZGF0ZUxpbmtlZFNoZWV0QmVmb3JlTXV0YXRpb24gPSB1c2VDYWxsYmFjayhhc3luYyAoKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiA9PiB7XG4gICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChsaW5rZWRFeHBlbnNlU2hlZXRJZCk7XG4gICAgaWYgKCFzYWZlU2hlZXRJZCkge1xuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgY29uc3QgYWNjZXNzUmVzdWx0ID0gYXdhaXQgcmVzb2x2ZUV4cGVuc2VTaGVldEVkaXRBY2Nlc3Moe1xuICAgICAgc2hlZXRJZDogc2FmZVNoZWV0SWQsXG4gICAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxuICAgICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcbiAgICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICB9KTtcbiAgICBpZiAoIWFjY2Vzc1Jlc3VsdC5pc0xvY2tlZCkge1xuICAgICAgcmV0dXJuIHNhZmVTaGVldElkO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgc2FmZVRleHQoYWNjZXNzUmVzdWx0LmJsb2NrZWRNZXNzYWdlKSB8fFxuICAgICAgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1JlYWRPbmx5QnlTdGF0dXNcIiwgXCJObyBzZSBwdWVkZSBlZGl0YXIgZXN0YSBob2phIGRlIGdhc3RvcyBlbiBlbCBlc3RhZG8gYWN0dWFsLlwiKTtcbiAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xuICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSwgW1xuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcbiAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgY3VycmVudENybVVzZXJJZCxcbiAgICBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBzZXRTdGF0dXMsXG4gIF0pO1xuXG4gIGNvbnN0IGhhbmRsZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjYW5FZGl0VGlja2V0KSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5vcm1hbGl6ZWREZXNjcmlwdGlvbiA9IFN0cmluZyhkcmFmdERlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgIGNvbnN0IHBhcnNlZFF0eSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0UXR5KTtcclxuICAgIGNvbnN0IHBhcnNlZFByaWNlID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRQcmljZSk7XHJcblxyXG4gICAgaWYgKCFub3JtYWxpemVkRGVzY3JpcHRpb24gfHwgcGFyc2VkUXR5ID09PSBudWxsIHx8IHBhcnNlZFF0eSA8PSAwIHx8IHBhcnNlZFByaWNlID09PSBudWxsIHx8IHBhcnNlZFByaWNlIDw9IDApIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVfVmFsaWRhdGlvbl9BbW91bnRRdHlcIiwgXCJRdWFudGl0eSBhbmQgcHJpY2UgbXVzdCBiZSBncmVhdGVyIHRoYW4gMC5cIik7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB2YWxpZGF0ZWRTaGVldElkID0gYXdhaXQgdmFsaWRhdGVMaW5rZWRTaGVldEJlZm9yZU11dGF0aW9uKCk7XG4gICAgaWYgKHZhbGlkYXRlZFNoZWV0SWQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcbiAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lX0RldGFpbF9VcGRhdGluZ1wiLCBcIlVwZGF0aW5nIGV4cGVuc2UgbGluZS4uLlwiKSxcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpLFxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldExpbmUoZmlsZUlkLCBsaW5lUmVjSWQsIHtcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBub3JtYWxpemVkRGVzY3JpcHRpb24sXHJcbiAgICAgICAgICBxdHk6IE51bWJlcihwYXJzZWRRdHkpLFxyXG4gICAgICAgICAgcHJpY2U6IE51bWJlcihwYXJzZWRQcmljZSksXHJcbiAgICAgICAgICB0b3RhbEFtb3VudDogTnVtYmVyKHBhcnNlZFF0eSkgKiBOdW1iZXIocGFyc2VkUHJpY2UpLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbGlkYXRlZFNoZWV0SWQpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgc3luY0V4cGVuc2VMaW5rZWRUaWNrZXRTaGVldExpbmUoe1xuICAgICAgICAgICAgICBmaWxlSWQsXG4gICAgICAgICAgICAgIHNoZWV0SWQ6IHZhbGlkYXRlZFNoZWV0SWQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKCk7XG4gICAgICAgICAgICBvbkxpbmtlZFNoZWV0U3luY1N1Y2Nlc3M/LigpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBFcnJvclxuICAgICAgICAgICAgICAgID8gZXJyb3IubWVzc2FnZVxuICAgICAgICAgICAgICAgIDogaW5kVChcbiAgICAgICAgICAgICAgICAgICAgXCJFeHBlbnNlVGlja2V0c19TaGVldFN5bmNfUmV0cnlSZXF1aXJlZFwiLFxuICAgICAgICAgICAgICAgICAgICBcIlRpY2tldCBkYXRhIGNoYW5nZWQsIGJ1dCB3ZSBjb3VsZCBub3Qgc3luYyB0aGUgZXhwZW5zZSBsaW5lLiBTYXZlIGFnYWluIGJlZm9yZSBsZWF2aW5nLlwiXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZSh7XG4gICAgICAgICAgICAgIGZpbGVJZCxcbiAgICAgICAgICAgICAgc2hlZXRJZDogdmFsaWRhdGVkU2hlZXRJZCxcbiAgICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlPy4obWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVfRGV0YWlsX1VwZGF0ZWRcIiwgXCJFeHBlbnNlIGxpbmUgdXBkYXRlZFwiKSk7XG4gICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICB9LCBbXHJcbiAgICBidXN5LFxyXG4gICAgY2FuRWRpdFRpY2tldCxcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdFByaWNlLFxyXG4gICAgZHJhZnRRdHksXHJcbiAgICBmaWxlSWQsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBsaW5lUmVjSWQsXG4gICAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlLFxuICAgIG9uTGlua2VkU2hlZXRTeW5jU3VjY2VzcyxcbiAgICBzZXRCdXN5LFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldFN0YXR1cyxcbiAgICB2YWxpZGF0ZUxpbmtlZFNoZWV0QmVmb3JlTXV0YXRpb24sXG4gIF0pO1xuXG4gIGNvbnN0IGhhbmRsZURlbGV0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY2FuRGVsZXRlVGlja2V0KSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsaWRhdGVkU2hlZXRJZCA9IGF3YWl0IHZhbGlkYXRlTGlua2VkU2hlZXRCZWZvcmVNdXRhdGlvbigpO1xuICAgIGlmICh2YWxpZGF0ZWRTaGVldElkID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XG4gICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBleHBlbnNlIGxpbmUuLi5cIiksXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUVycm9yXCIsIFwiRGVsZXRlIGVycm9yLlwiKSxcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldEJ1c3ksXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRMaW5lKGZpbGVJZCwgbGluZVJlY0lkKTtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbGlkYXRlZFNoZWV0SWQpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgc3luY0V4cGVuc2VMaW5rZWRUaWNrZXRTaGVldExpbmUoe1xuICAgICAgICAgICAgICBmaWxlSWQsXG4gICAgICAgICAgICAgIHNoZWV0SWQ6IHZhbGlkYXRlZFNoZWV0SWQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKCk7XG4gICAgICAgICAgICBvbkxpbmtlZFNoZWV0U3luY1N1Y2Nlc3M/LigpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBFcnJvclxuICAgICAgICAgICAgICAgID8gZXJyb3IubWVzc2FnZVxuICAgICAgICAgICAgICAgIDogaW5kVChcbiAgICAgICAgICAgICAgICAgICAgXCJFeHBlbnNlVGlja2V0c19TaGVldFN5bmNfUmV0cnlSZXF1aXJlZFwiLFxuICAgICAgICAgICAgICAgICAgICBcIlRpY2tldCBkYXRhIGNoYW5nZWQsIGJ1dCB3ZSBjb3VsZCBub3Qgc3luYyB0aGUgZXhwZW5zZSBsaW5lLiBTYXZlIGFnYWluIGJlZm9yZSBsZWF2aW5nLlwiXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZSh7XG4gICAgICAgICAgICAgIGZpbGVJZCxcbiAgICAgICAgICAgICAgc2hlZXRJZDogdmFsaWRhdGVkU2hlZXRJZCxcbiAgICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlPy4obWVzc2FnZSk7XG4gICAgICAgICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVfRGV0YWlsX0RlbGV0ZWRcIiwgXCJFeHBlbnNlIGxpbmUgZGVsZXRlZFwiKSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQub2s7XG4gIH0sIFtcbiAgICBidXN5LFxuICAgIGNhbkRlbGV0ZVRpY2tldCxcbiAgICBmaWxlSWQsXG4gICAgbGluZVJlY0lkLFxuICAgIG9uTGlua2VkU2hlZXRTeW5jRmFpbHVyZSxcbiAgICBvbkxpbmtlZFNoZWV0U3luY1N1Y2Nlc3MsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldFN0YXR1cyxcbiAgICB2YWxpZGF0ZUxpbmtlZFNoZWV0QmVmb3JlTXV0YXRpb24sXG4gIF0pO1xuXG4gIHJldHVybiB7XG4gICAgaGFuZGxlVXBkYXRlLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHtcclxuICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXHJcbiAgbmF2aWdhdGVUb0V4cGVuc2VVcmwsXHJcbiAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIG1hcEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIsXHJcbiAgbWFwRXhwZW5zZVRpY2tldERldGFpbExpbmUsXHJcbiAgdHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLFxyXG4gIHR5cGUgRXhwZW5zZVRpY2tldERldGFpbExpbmUsXHJcbn0gZnJvbSBcIi4uL2RldGFpbC9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldExpbmVEZXRhaWxTdGF0ZUFyZ3MgPSB7XG4gIGhhc0FjY2VzczogYm9vbGVhbjtcbiAgY2FuRWRpdFRpY2tldDogYm9vbGVhbjtcbiAgZmlsZUlkOiBzdHJpbmc7XG4gIGxpbmVSZWNJZDogc3RyaW5nO1xuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcbn07XG5cclxuLy8gT3ducyBzdGF0ZSBhbmQgYmVoYXZpb3IgZm9yIHRpY2tldCBsaW5lIGRldGFpbCBwYWdlIChyZWFkIGFuZCBlZGl0KS5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsU3RhdGUgPSAoe1xuICBoYXNBY2Nlc3MsXG4gIGNhbkVkaXRUaWNrZXQsXG4gIGZpbGVJZCxcbiAgbGluZVJlY0lkLFxuICBvbkZvcmJpZGRlbixcbn06IFVzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsU3RhdGVBcmdzKSA9PiB7XG4gIGNvbnN0IFtoZWFkZXIsIHNldEhlYWRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2xpbmUsIHNldExpbmVdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldERldGFpbExpbmUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtpc0VkaXRpbmcsIHNldElzRWRpdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW21vZGFsRXJyb3IsIHNldE1vZGFsRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0RGVzY3JpcHRpb24sIHNldERyYWZ0RGVzY3JpcHRpb25dID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0UXR5LCBzZXREcmFmdFF0eV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRQcmljZSwgc2V0RHJhZnRQcmljZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgY29uc3QgaHlkcmF0ZURyYWZ0RnJvbUxpbmUgPSB1c2VDYWxsYmFjaygobmV4dExpbmU6IEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIHwgbnVsbCkgPT4ge1xyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbihzYWZlVGV4dChuZXh0TGluZT8uZGVzY3JpcHRpb24pKTtcclxuICAgIHNldERyYWZ0UXR5KFxyXG4gICAgICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIobmV4dExpbmU/LnF0eSwge1xyXG4gICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICAgICAgZmFsbGJhY2s6IFwiXCIsXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgc2V0RHJhZnRQcmljZShcclxuICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKG5leHRMaW5lPy5wcmljZSwge1xyXG4gICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICAgICAgZmFsbGJhY2s6IFwiXCIsXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGxvYWREZXRhaWwgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGlmICghaGFzQWNjZXNzKSB7XHJcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghZmlsZUlkIHx8ICFsaW5lUmVjSWQpIHtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIlRpY2tldHNfRGV0YWlsX05vdEZvdW5kXCIsIFwiVGlja2V0IHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0KGZpbGVJZCwge1xyXG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZT8uTWVzc2FnZSB8fCBpbmRUKFwiVGlja2V0c19EZXRhaWxfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0IGRldGFpbC5cIikpO1xyXG4gICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZFRpY2tldCA9XHJcbiAgICAgICAgICBpdGVtcy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnk/LkZpbGVJZCkudG9VcHBlckNhc2UoKSA9PT0gZmlsZUlkLnRvVXBwZXJDYXNlKCkpIHx8IGl0ZW1zWzBdIHx8IG51bGw7XHJcblxyXG4gICAgICAgIGlmICghc2VsZWN0ZWRUaWNrZXQpIHtcclxuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiVGlja2V0c19EZXRhaWxfTm90Rm91bmRcIiwgXCJUaWNrZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1hcHBlZEhlYWRlciA9IG1hcEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIoc2VsZWN0ZWRUaWNrZXQpO1xyXG4gICAgICAgIGNvbnN0IG1hcHBlZExpbmVzID0gKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRUaWNrZXQuTGluZXMpID8gc2VsZWN0ZWRUaWNrZXQuTGluZXMgOiBbXSkubWFwKChlbnRyeSkgPT5cclxuICAgICAgICAgIG1hcEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lKGVudHJ5KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRMaW5lID1cclxuICAgICAgICAgIG1hcHBlZExpbmVzLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeS5yZWNJZCkudG9VcHBlckNhc2UoKSA9PT0gbGluZVJlY0lkLnRvVXBwZXJDYXNlKCkpIHx8IG51bGw7XHJcblxyXG4gICAgICAgIGlmICghc2VsZWN0ZWRMaW5lKSB7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIlRpY2tldHNfRGV0YWlsX05vdEZvdW5kXCIsIFwiVGlja2V0IHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihtYXBwZWRIZWFkZXIpO1xyXG4gICAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEhlYWRlcihtYXBwZWRIZWFkZXIpO1xyXG4gICAgICAgIHNldExpbmUoc2VsZWN0ZWRMaW5lKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIlRpY2tldHNfRGV0YWlsX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldCBkZXRhaWwuXCIpKTtcclxuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZvaWQgbG9hZERldGFpbCgpO1xyXG4gIH0sIFtmaWxlSWQsIGhhc0FjY2VzcywgbGluZVJlY0lkLCBvbkZvcmJpZGRlbl0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFsaW5lIHx8IGlzRWRpdGluZykgcmV0dXJuO1xyXG4gICAgaHlkcmF0ZURyYWZ0RnJvbUxpbmUobGluZSk7XHJcbiAgfSwgW2h5ZHJhdGVEcmFmdEZyb21MaW5lLCBpc0VkaXRpbmcsIGxpbmVdKTtcclxuXHJcbiAgY29uc3QgaGFzQWN0aXZlUHJvY2VzcyA9IHVzZU1lbW8oKCkgPT4gYnVzeSB8fCBpc0VkaXRpbmcsIFtidXN5LCBpc0VkaXRpbmddKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZChoYXNBY3RpdmVQcm9jZXNzKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCgpO1xyXG4gICAgfTtcclxuICB9LCBbaGFzQWN0aXZlUHJvY2Vzc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChpc0xvYWRpbmcgfHwgIWhlYWRlciB8fCAhbGluZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghY2FuRWRpdFRpY2tldCkge1xuICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XHJcblxyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XG4gICAgaHlkcmF0ZURyYWZ0RnJvbUxpbmUobGluZSk7XG4gICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9FZGl0aW5nRW5hYmxlZFwiLCBcIkVkaXRpbmcgZW5hYmxlZFwiKSk7XG4gIH0sIFtjYW5FZGl0VGlja2V0LCBoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21MaW5lLCBpc0xvYWRpbmcsIGxpbmUsIG9uRm9yYmlkZGVuXSk7XG5cclxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFpc0VkaXRpbmcpIHJldHVybjtcclxuXHJcbiAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGh5ZHJhdGVEcmFmdEZyb21MaW5lKGxpbmUpO1xyXG4gICAgc2V0U3RhdHVzKGluZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpKTtcclxuICB9LCBbaHlkcmF0ZURyYWZ0RnJvbUxpbmUsIGlzRWRpdGluZywgbGluZV0pO1xyXG5cclxuICBjb25zdCBuYXZpZ2F0ZVRvVGlja2V0RGV0YWlsID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qgc2FmZUZpbGVJZCA9IHNhZmVUZXh0KGZpbGVJZCk7XHJcbiAgICBpZiAoIXNhZmVGaWxlSWQpIHJldHVybjtcclxuXHJcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/ZmlsZUlkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVGaWxlSWQpfWApO1xyXG4gIH0sIFtmaWxlSWRdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGhlYWRlcixcclxuICAgIGxpbmUsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBidXN5LFxyXG4gICAgc3RhdHVzLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxFcnJvcixcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdFF0eSxcclxuICAgIGRyYWZ0UHJpY2UsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBzZXREcmFmdFF0eSxcclxuICAgIHNldERyYWZ0UHJpY2UsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICAgIG5hdmlnYXRlVG9UaWNrZXREZXRhaWwsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zLnRzXCI7XHJcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXRMaW5lRGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbE9wZW46IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGlzTG9ja2VkOiBib29sZWFuO1xyXG4gIHBlcm1pc3Npb25zUmVhZHk/OiBib29sZWFuO1xyXG4gIGNhbkVkaXRUaWNrZXQ6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlVGlja2V0OiBib29sZWFuO1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgaGFuZGxlRGVsZXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XHJcbiAgb25EZWxldGVTdWNjZXNzPzogKCkgPT4gdm9pZDtcclxuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcclxuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XHJcbiAgfSkgPT4gdm9pZDtcclxuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBDb29yZGluYXRlcyB0b3BiYXIgaWNvbiBzdGF0ZSBhbmQgZGlzcGF0Y2ggYWN0aW9ucyBmb3IgdGlja2V0IGxpbmUgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldExpbmVEZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsT3BlbixcclxuICBpc0VkaXRpbmcsXHJcbiAgaXNMb2NrZWQsXHJcbiAgcGVybWlzc2lvbnNSZWFkeSA9IHRydWUsXHJcbiAgY2FuRWRpdFRpY2tldCxcclxuICBjYW5EZWxldGVUaWNrZXQsXHJcbiAgZmlsZUlkLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIGhhbmRsZVVwZGF0ZSxcclxuICBoYW5kbGVEZWxldGUsXHJcbiAgb25TYXZlU3VjY2VzcyxcclxuICBvbkRlbGV0ZVN1Y2Nlc3MsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0TGluZURldGFpbFRvcGJhckFjdGlvbnNBcmdzKSA9PiB7XHJcbiAgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zKHtcclxuICAgIGFjdGlvbkdyb3VwSWQ6IFwiZXhwZW5zZS10aWNrZXQtbGluZS1kZXRhaWwtYWN0aW9uc1wiLFxyXG4gICAgaWRzOiB7XHJcbiAgICAgIGVkaXRJY29uSWQ6IFwiZXhwZW5zZVRpY2tldExpbmVFZGl0SWNvblwiLFxyXG4gICAgICBzYXZlSWNvbklkOiBcImV4cGVuc2VUaWNrZXRMaW5lU2F2ZUljb25cIixcclxuICAgICAgZGVsZXRlQnRuSWQ6IFwiZXhwZW5zZVRpY2tldExpbmVEZWxldGVCdG5cIixcclxuICAgICAgY2FuY2VsQnRuSWQ6IFwiZXhwZW5zZVRpY2tldExpbmVDYW5jZWxCdG5cIixcclxuICAgIH0sXHJcbiAgICBldmVudHM6IHtcclxuICAgICAgZWRpdEV2ZW50OiBcImV4cGVuc2UtdGlja2V0LWxpbmUtZGV0YWlsLWVkaXRcIixcclxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtbGluZS1kZXRhaWwtZGVsZXRlXCIsXHJcbiAgICAgIGNhbmNlbEV2ZW50OiBcImV4cGVuc2UtdGlja2V0LWxpbmUtZGV0YWlsLWNhbmNlbC1lZGl0XCIsXHJcbiAgICB9LFxyXG4gICAgYnVzeSxcclxuICAgIG1vZGFsT3BlbixcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzQ3JlYXRlTW9kZTogZmFsc2UsXHJcbiAgICBpc0xvY2tlZCxcclxuICAgIHBlcm1pc3Npb25zUmVhZHksXHJcbiAgICBjYW5DcmVhdGU6IGZhbHNlLFxyXG4gICAgY2FuRWRpdDogY2FuRWRpdFRpY2tldCxcclxuICAgIGNhbkRlbGV0ZTogY2FuRGVsZXRlVGlja2V0LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlU2F2ZTogaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgc2F2ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiU2F2ZSBjaGFuZ2VzXCIpLFxyXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXHJcbiAgICBzYXZlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXHJcbiAgICBkZWxldGVDb25maXJtVGl0bGU6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9UaXRsZVwiLCBcIkRlbGV0ZVwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiQ29uZmlybV9EZWxldGVfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/XCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpLFxyXG4gICAgb25TYXZlU3VjY2VzcyxcclxuICAgIG9uRGVsZXRlU3VjY2Vzczogb25EZWxldGVTdWNjZXNzIHx8ICgoKSA9PiB7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD9maWxlSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoZmlsZUlkKX1gKTtcclxuICAgIH0pLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQXNEOzs7QUNnRGhEO0FBMUJOLElBQU0saUJBQWlCLENBQUMsVUFBaUM7QUFDdkQsU0FBTyxvQkFBb0IsT0FBTztBQUFBLElBQ2hDLHVCQUF1QjtBQUFBLElBQ3ZCLHVCQUF1QjtBQUFBLElBQ3ZCLGFBQWE7QUFBQSxJQUNiLFVBQVU7QUFBQSxFQUNaLENBQUM7QUFDSDtBQUdBLElBQU0sOEJBQThCLENBQUM7QUFBQSxFQUNuQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBd0M7QUFDdEMsU0FDRSw2Q0FBQyxhQUFRLFdBQVUsYUFDakI7QUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTyxLQUFLLHNCQUFzQixNQUFNO0FBQUEsUUFDeEMsV0FBVTtBQUFBLFFBQ1YsZ0JB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QztBQUVELFNBQ0UsOENBQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsTUFBTSxNQUFNO0FBQUEsUUFDWixPQUFPLE1BQU07QUFBQSxRQUNiLFNBQVMsTUFBTTtBQUFBLFFBQ2YsYUFBYTtBQUFBLFFBQ2IsWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsWUFBWSxNQUFNO0FBQUEsUUFDbEIsYUFBYSxNQUFNO0FBQUEsUUFDbkI7QUFBQSxRQUNBLE9BQU87QUFBQSxRQUNQO0FBQUEsUUFDQSxXQUFXO0FBQUEsUUFDWCxVQUFVO0FBQUE7QUFBQSxJQUNaO0FBQUEsSUFFQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsV0FBVTtBQUFBLFFBQ1YsT0FBTyxFQUFFLFNBQVMsWUFBWSxTQUFTLE9BQU87QUFBQSxRQUU5QztBQUFBLHVEQUFDLFNBQUksV0FBVSx1QkFBc0IsU0FBUSxhQUFZLE1BQUssVUFBUyxjQUFZLEtBQUssa0JBQWtCLFNBQVMsR0FDakgsdURBQUMsWUFBTyxXQUFVLHVCQUFzQixJQUFHLE1BQUssSUFBRyxNQUFLLEdBQUUsS0FBSSxhQUFZLEtBQUksR0FDaEY7QUFBQSxVQUNDLEtBQUssa0JBQWtCLFNBQVM7QUFBQTtBQUFBO0FBQUEsSUFDbkM7QUFBQSxJQUVDLGVBQWUsNkNBQUMsU0FBSSxXQUFVLGVBQWUsd0JBQWEsSUFBUztBQUFBLElBRW5FLENBQUMsYUFBYSxDQUFDLGdCQUFnQixVQUFVLE9BQ3hDO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSwwQkFBMEI7QUFBQSxRQUMxQixrQkFBa0I7QUFBQSxRQUNsQixvQkFBb0I7QUFBQTtBQUFBLElBQ3RCLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLDhCQUE4QixNQUFNO0FBQ3hDLFNBQ0UsNkNBQUMsZ0NBQXFCLHlCQUF1QixNQUMzQyx1REFBQyxrQ0FBK0IsR0FDbEM7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLGlDQUFpQztBQUN4RSxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLCtCQUE0QixDQUFFO0FBQzFEO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxzQ0FBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiXQp9Cg==
