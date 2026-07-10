import {
  ExpenseCurrencySettlementFields_default,
  ExpenseTicketLinesList_default,
  ExpenseTicketPreviewModal_default,
  ExpenseTicketStickyPreview_default,
  buildExpenseExchangeRateInfoMessage,
  fetchExpenseOfficialExchangeRate,
  formatExpenseExchangeRateInputValue,
  hasExpenseTicketImagePreviewSource,
  useExpenseTicketDetailState,
  useExpenseTicketImagePreview
} from "./chunks/chunk-XCHASNWW.js";
import {
  getExpenseTicketStatusLabel,
  useExpenseTicketsFilterCache
} from "./chunks/chunk-KSHBY5Q3.js";
import "./chunks/chunk-NQ4U2E7D.js";
import {
  clearExpenseTicketSheetSyncState,
  readExpenseTicketSheetSyncState,
  saveExpenseTicketSheetSyncState,
  syncExpenseLinkedTicketSheetLine
} from "./chunks/chunk-V4UK6QOF.js";
import {
  calculateExpenseLineAmountMSTForCurrency,
  calculateExpenseLineExchangeRateForCurrency,
  isExpenseLineForeignCurrency,
  isExpenseLineSameReimbursementCurrency,
  normalizeExpenseLineCurrencyCode,
  resolveExpenseLineAmountMSTForCurrencyPayload,
  resolveExpenseLineExchangeRateForCurrency
} from "./chunks/chunk-P4AXZIYH.js";
import {
  resolveExpenseSheetEditAccess,
  useExpenseTicketLinkSheetGate
} from "./chunks/chunk-HTWIUBNH.js";
import "./chunks/chunk-2H26NNTY.js";
import "./chunks/chunk-YAWCN7JA.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-TDNM2Z4R.js";
import "./chunks/chunk-KLQHZ5CJ.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-LZSH3IN4.js";
import {
  useTimelineCardEffects
} from "./chunks/chunk-GLDIL3AG.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-SSILOGLX.js";
import {
  DEFAULT_LINE_REIMBURSABLE_EXPENSE,
  ExpenseReadOnlyField_default,
  executeExpenseMutation,
  getExpenseLineReimbursableExpenseLabel,
  getExpenseLineReimbursableExpenseOptions,
  normalizeExpenseLineReimbursableExpense,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-74756UZW.js";
import "./chunks/chunk-4BE3ZFCK.js";
import {
  EXPENSE_TICKET_LINK_FAILURE_REPAIR_INTENT,
  appendExpenseTicketReturnQuery,
  buildExpenseSheetDetailUrl,
  buildExpenseSheetLineDetailUrl,
  buildExpenseTicketLinkUrl,
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
  areExpenseNumericInputsEquivalent,
  clearExpenseNavigationGuard,
  formatAmountWithCurrency,
  formatExpenseInputNumber,
  isManagingOtherExpenseUser,
  navigateToExpenseUrl,
  parseExpenseNumericInput,
  setExpenseNavigationGuard
} from "./chunks/chunk-DDCTTA2H.js";
import {
  configureExpenseApiAuth,
  deleteExpenseSheetLine,
  deleteExpenseSheetTicket,
  deleteExpenseSheetTicketFile,
  fetchExpenseSheetDetail,
  formatExpenseDisplayDate,
  getExpenseSheetDefaultCurrencyCode,
  mapExpenseSheetLine,
  parseExpenseDate,
  safeText,
  toIsoDate,
  updateExpenseSheetTicket
} from "./chunks/chunk-63PNSQ5Z.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-4B23OARV.js";
import {
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  getExpenseGastoTypeOptions,
  toExpenseApiDdMmYyyy,
  toExpenseGastoTypeCode,
  toExpenseIsoDate
} from "./chunks/chunk-UYN2TXUI.js";
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

// Web/wwwroot/react/src/pages/gastos/tickets/detail/ExpenseTicketDetailPage.tsx
var import_react12 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketDetailMutations.ts
var import_react = __toESM(require_react());
var resolveTicketFileExtension = (fileName, urlFile) => {
  const source = String(fileName || "").trim() || String(urlFile || "").trim();
  const match = source.match(/\.([a-zA-Z0-9]{1,10})(?:$|[?#])/);
  if (!match || !match[1]) return void 0;
  return match[1].toLowerCase();
};
var isNotFoundError = (error) => {
  return error instanceof ApiFetchError && error.status === 404;
};
var isMissingTicketFileMessage = (message) => {
  const normalized = String(message || "").trim().toLowerCase();
  if (!normalized) return false;
  return normalized.includes("archivo asociado") || normalized.includes("archivo adjunto") || normalized.includes("associated file") || normalized.includes("attached file");
};
var useExpenseTicketDetailMutations = ({
  busy,
  isEditing,
  canEditTicket,
  canDeleteTicket,
  fileId,
  draftDescription,
  draftGastoType,
  draftCurrencyCode,
  draftTotalAmount,
  draftAmountMST,
  draftExchangeRate,
  localCurrencyCode,
  draftTransDate,
  draftTicketTime,
  draftComentario,
  draftUrlFile,
  draftFileName,
  saveStrategy,
  linkedExpenseSheetId,
  linkedExpenseLineRecId,
  linkedExpenseLineProjectId,
  linkedExpenseLineProjectIdChanged = false,
  linkedExpenseLineReimbursableExpense,
  linkedExpenseLineReimbursableExpenseChanged = false,
  deleteLinkedExpenseLineContext,
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
  const runHeaderUpdate = (0, import_react.useCallback)(
    async ({
      syncSheetLine,
      continueOnSheetSyncFailure = false
    }) => {
      if (busy || !isEditing) return false;
      if (!canEditTicket) {
        showPermissionModal();
        return false;
      }
      const normalizedDescription = String(draftDescription || "").trim();
      if (!normalizedDescription) {
        const message = indT("ExpenseSheets_Validation_DescriptionRequired", "Description is required.");
        setModalError(message);
        setStatus(message);
        return false;
      }
      const normalizedCurrency = String(draftCurrencyCode || "").trim().toUpperCase();
      if (!normalizedCurrency) {
        const message = indT("ExpenseSheets_Validation_CurrencyRequired", "Currency is required.");
        setModalError(message);
        setStatus(message);
        return false;
      }
      const parsedTotalAmount = parseDecimalInput(draftTotalAmount);
      if (parsedTotalAmount == null || parsedTotalAmount < 0) {
        const message = indT("Tickets_Validation_TotalAmountRequired", "Total amount must be greater than or equal to 0.");
        setModalError(message);
        setStatus(message);
        return false;
      }
      const parsedAmountMST = parseDecimalInput(draftAmountMST);
      const parsedExchangeRate = parseDecimalInput(draftExchangeRate);
      const normalizedLocalCurrency = safeText(localCurrencyCode).toUpperCase();
      const requiresForeignCurrencySettlement = isExpenseLineForeignCurrency(normalizedCurrency, normalizedLocalCurrency);
      const hasForeignCurrencySettlement = !requiresForeignCurrencySettlement || parsedExchangeRate != null && parsedExchangeRate > 0 || parsedAmountMST != null && parsedAmountMST > 0;
      if (!hasForeignCurrencySettlement) {
        const message = indT(
          "ExpenseSheets_Line_Validation_ForeignCurrencySettlement",
          "Foreign currency lines require an exchange rate greater than 0 or a reimbursement amount."
        );
        setModalError(message);
        setStatus(message);
        return false;
      }
      const parsedGastoType = toExpenseGastoTypeCode(draftGastoType, { allowNone: false });
      if (parsedGastoType === null) {
        const message = indT("Tickets_Validation_CategoryRequired", "Category is required.");
        setModalError(message);
        setStatus(message);
        return false;
      }
      const rawTransDate = String(draftTransDate || "").trim();
      const normalizedTransDate = rawTransDate ? toExpenseApiDdMmYyyy(rawTransDate) : "";
      if (rawTransDate && !normalizedTransDate) {
        setModalError(EXPENSE_API_DATE_FORMAT_MESSAGE);
        setStatus(EXPENSE_API_DATE_FORMAT_MESSAGE);
        return false;
      }
      const validatedSheetId = syncSheetLine ? await validateLinkedSheetBeforeMutation() : "";
      if (validatedSheetId === null) {
        return false;
      }
      const payloadAmountMST = resolveExpenseLineAmountMSTForCurrencyPayload(
        parsedTotalAmount,
        parsedAmountMST,
        normalizedCurrency,
        normalizedLocalCurrency
      );
      const payloadExchangeRate = resolveExpenseLineExchangeRateForCurrency(
        normalizedCurrency,
        normalizedLocalCurrency,
        parsedExchangeRate
      );
      const payload = {
        description: normalizedDescription,
        currencyCode: normalizedCurrency,
        totalAmount: Number(parsedTotalAmount),
        amountMST: payloadAmountMST ?? void 0,
        exchRate: payloadExchangeRate ?? void 0,
        transDate: normalizedTransDate || void 0,
        ticketDate: normalizedTransDate || void 0,
        ticketTime: safeText(draftTicketTime) || void 0,
        comentario: String(draftComentario || "").trim() || void 0,
        urlFile: String(draftUrlFile || "").trim() || void 0,
        fileName: String(draftFileName || "").trim() || void 0,
        fileExtension: resolveTicketFileExtension(draftFileName, draftUrlFile),
        gastoType: parsedGastoType
      };
      const result = await executeExpenseMutation({
        startStatus: indT("ExpenseSheets_Detail_Updating", "Updating expense sheet..."),
        fallbackErrorMessage: indT("ExpenseSheets_Detail_UpdateError", "Update error."),
        setModalError,
        setBusy,
        setStatus,
        action: async () => {
          const response = await updateExpenseSheetTicket(fileId, payload);
          if (!response.Success) {
            throw new Error(response.Message || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
          }
          if (syncSheetLine && validatedSheetId) {
            let sheetSyncFailureMessage = "";
            try {
              const syncPayload = {
                fileId,
                sheetId: validatedSheetId,
                lineRecId: safeText(linkedExpenseLineRecId) || void 0,
                currencyCodeOverride: normalizedCurrency,
                amountMSTOverride: payloadAmountMST,
                exchangeRateOverride: payloadExchangeRate ?? void 0,
                ...linkedExpenseLineProjectIdChanged ? { projectIdOverride: safeText(linkedExpenseLineProjectId) } : {},
                ...linkedExpenseLineReimbursableExpenseChanged ? { reimbursableExpenseOverride: linkedExpenseLineReimbursableExpense } : {}
              };
              await syncExpenseLinkedTicketSheetLine(syncPayload);
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
              if (!continueOnSheetSyncFailure) {
                throw new Error(message);
              }
              sheetSyncFailureMessage = message;
            }
            if (sheetSyncFailureMessage) {
              setStatus(sheetSyncFailureMessage);
              setIsEditing(false);
              return true;
            }
          }
          setStatus(indT("ExpenseSheets_Detail_Updated", "Expense sheet updated"));
          setIsEditing(false);
          return true;
        }
      });
      return result.ok;
    },
    [
      busy,
      canEditTicket,
      draftComentario,
      draftCurrencyCode,
      draftDescription,
      draftFileName,
      draftGastoType,
      draftAmountMST,
      draftExchangeRate,
      draftTotalAmount,
      draftTicketTime,
      draftTransDate,
      draftUrlFile,
      fileId,
      isEditing,
      localCurrencyCode,
      linkedExpenseLineProjectId,
      linkedExpenseLineProjectIdChanged,
      linkedExpenseLineReimbursableExpense,
      linkedExpenseLineReimbursableExpenseChanged,
      linkedExpenseLineRecId,
      onLinkedSheetSyncFailure,
      onLinkedSheetSyncSuccess,
      setBusy,
      setIsEditing,
      setModalError,
      setStatus,
      validateLinkedSheetBeforeMutation
    ]
  );
  const handleUpdate = (0, import_react.useCallback)(async () => {
    return runHeaderUpdate({
      syncSheetLine: saveStrategy === "ticket-and-sheet-line"
    });
  }, [runHeaderUpdate, saveStrategy]);
  const handlePersistHeaderDraft = (0, import_react.useCallback)(async () => {
    return runHeaderUpdate({
      syncSheetLine: saveStrategy === "ticket-and-sheet-line" && (linkedExpenseLineProjectIdChanged || linkedExpenseLineReimbursableExpenseChanged || !!safeText(linkedExpenseSheetId)),
      continueOnSheetSyncFailure: true
    });
  }, [
    linkedExpenseLineProjectIdChanged,
    linkedExpenseLineReimbursableExpenseChanged,
    linkedExpenseSheetId,
    runHeaderUpdate,
    saveStrategy
  ]);
  const resolveLinkedExpenseLineContext = (0, import_react.useCallback)(async () => {
    if (deleteLinkedExpenseLineContext) {
      return deleteLinkedExpenseLineContext;
    }
    const safeSheetId = safeText(linkedExpenseSheetId);
    if (!safeSheetId) {
      return null;
    }
    const response = await fetchExpenseSheetDetail(safeSheetId, {
      suppressPermissionModal: true
    });
    const items = Array.isArray(response.Items) ? response.Items : [];
    const detail = items.find((entry) => entry && typeof entry === "object") || null;
    const lines = Array.isArray(detail?.Lines) ? detail.Lines : [];
    const matchingLine = lines.find((line) => safeText(line?.FileId) === fileId);
    const lineRecId = safeText(matchingLine?.RecId);
    if (!lineRecId) {
      return null;
    }
    return {
      sheetId: safeSheetId,
      lineRecId
    };
  }, [deleteLinkedExpenseLineContext, fileId, linkedExpenseSheetId]);
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
      startStatus: indT("ExpenseSheets_Detail_Deleting", "Deleting expense sheet..."),
      fallbackErrorMessage: indT("ExpenseSheets_Detail_DeleteError", "Delete error."),
      setModalError,
      setBusy,
      setStatus,
      action: async () => {
        const linkedLineContext = await resolveLinkedExpenseLineContext();
        try {
          const deleteFileResponse = await deleteExpenseSheetTicketFile(fileId, {
            suppressPermissionModal: true
          });
          if (!deleteFileResponse.Success && !isMissingTicketFileMessage(deleteFileResponse.Message)) {
            throw new Error(deleteFileResponse.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
          }
        } catch (error) {
          if (!isNotFoundError(error)) {
            throw error;
          }
        }
        const response = await deleteExpenseSheetTicket(fileId);
        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
        }
        if (linkedLineContext) {
          try {
            const lineDeleteResponse = await deleteExpenseSheetLine(
              linkedLineContext.sheetId,
              linkedLineContext.lineRecId,
              {
                suppressPermissionModal: true
              }
            );
            if (!lineDeleteResponse.Success) {
              throw new Error(lineDeleteResponse.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
            }
          } catch (error) {
            if (!isNotFoundError(error)) {
              throw error;
            }
          }
        }
        setStatus(indT("ExpenseSheets_Detail_Deleted", "Expense sheet deleted"));
        if (validatedSheetId) {
          clearExpenseTicketSheetSyncState();
          onLinkedSheetSyncSuccess?.();
        }
        return true;
      }
    });
    return result.ok;
  }, [
    busy,
    canDeleteTicket,
    fileId,
    onLinkedSheetSyncSuccess,
    resolveLinkedExpenseLineContext,
    setBusy,
    setModalError,
    setStatus,
    validateLinkedSheetBeforeMutation
  ]);
  return {
    handleUpdate,
    handlePersistHeaderDraft,
    handleDelete
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketDetailTopbarActions.ts
var useExpenseTicketDetailTopbarActions = ({
  busy,
  modalOpen,
  isEditing,
  isLocked,
  isDeleteLocked,
  actionMode = "default",
  permissionsReady = true,
  canEditTicket,
  canDeleteTicket,
  fileId,
  setModalError,
  handleEnableEdit,
  handleCancelEdit,
  canOpenSaveConfirm,
  handleUpdate,
  handleDelete,
  onSaveSuccess,
  onDeleteSuccess,
  openConfirm,
  closeConfirm
}) => {
  useExpenseTopbarCrudActions({
    actionGroupId: "expense-ticket-detail-actions",
    ids: {
      editIconId: "expenseTicketEditIcon",
      saveIconId: "expenseTicketSaveIcon",
      deleteBtnId: "expenseTicketDeleteBtn",
      cancelBtnId: "expenseTicketCancelBtn"
    },
    events: {
      editEvent: "expense-ticket-detail-edit",
      deleteEvent: "expense-ticket-detail-delete",
      cancelEvent: "expense-ticket-detail-cancel-edit"
    },
    busy,
    modalOpen,
    isEditing,
    isCreateMode: false,
    isLocked,
    isDeleteLocked,
    actionMode,
    permissionsReady,
    canCreate: false,
    canEdit: canEditTicket,
    canDelete: canDeleteTicket,
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
    onDeleteSuccess: onDeleteSuccess || (() => navigateToExpenseUrl("/Gastos/Tickets")),
    openConfirm,
    closeConfirm
  });
};

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketDetailEditor.ts
var import_react2 = __toESM(require_react());
var createEmptyDraft = () => ({
  description: "",
  gastoType: "",
  currencyCode: "",
  totalAmount: "",
  amountMST: "",
  exchangeRate: "",
  transDate: "",
  ticketTime: "",
  comentario: "",
  urlFile: "",
  fileName: ""
});
var toInputDate = (raw) => {
  const parsed = parseExpenseDate(raw);
  return parsed ? toIsoDate(parsed) : "";
};
var toInputTime = (raw) => {
  const value = safeText(raw);
  if (!value || value === "0") return "";
  const secondsValue = Number(value);
  if (Number.isInteger(secondsValue) && secondsValue >= 0 && secondsValue <= 86399) {
    const hours2 = Math.floor(secondsValue / 3600);
    const minutes = Math.floor(secondsValue % 3600 / 60);
    const seconds = secondsValue % 60;
    return [hours2, minutes, seconds].map((entry) => String(entry).padStart(2, "0")).join(":");
  }
  const match = value.match(/^(\d{1,2}):([0-5]\d)(?::([0-5]\d))?$/);
  if (!match) return "";
  const hours = Number.parseInt(match[1] || "", 10);
  if (!Number.isInteger(hours) || hours < 0 || hours > 23) return "";
  return `${String(hours).padStart(2, "0")}:${match[2]}:${match[3] || "00"}`;
};
var normalizeCurrencyCode = (value) => safeText(value).toUpperCase();
var toFiniteNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};
var formatEditableMoney = (value) => {
  return formatExpenseInputNumber(value, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
    fallback: ""
  });
};
var formatEditableExchangeRate = (value) => {
  return formatExpenseInputNumber(value, {
    minimumFractionDigits: 7,
    maximumFractionDigits: 7,
    useGrouping: true,
    fallback: ""
  });
};
var buildAmountMSTPatchFromExchangeRate = (totalAmount, exchangeRate, currencyCode, reimbursementCurrencyCode, amountMSTManuallyEdited) => {
  if (amountMSTManuallyEdited && isExpenseLineSameReimbursementCurrency(currencyCode, reimbursementCurrencyCode)) {
    return {};
  }
  const parsedTotalAmount = parseExpenseNumericInput(totalAmount);
  const parsedExchangeRate = resolveExpenseLineExchangeRateForCurrency(
    currencyCode,
    reimbursementCurrencyCode,
    parseExpenseNumericInput(exchangeRate)
  );
  const nextAmountMST = parsedTotalAmount != null ? calculateExpenseLineAmountMSTForCurrency(
    parsedTotalAmount,
    parsedExchangeRate,
    currencyCode,
    reimbursementCurrencyCode
  ) : null;
  return nextAmountMST != null ? { amountMST: formatEditableMoney(nextAmountMST) } : {};
};
var buildExchangeRatePatchFromAmountMST = (totalAmount, amountMST, currencyCode, reimbursementCurrencyCode, currentExchangeRate) => {
  const parsedTotalAmount = parseExpenseNumericInput(totalAmount);
  const parsedAmountMST = parseExpenseNumericInput(amountMST);
  const nextExchangeRate = parsedTotalAmount != null && parsedAmountMST != null ? calculateExpenseLineExchangeRateForCurrency(
    parsedTotalAmount,
    parsedAmountMST,
    currencyCode,
    reimbursementCurrencyCode,
    currentExchangeRate
  ) : isExpenseLineSameReimbursementCurrency(currencyCode, reimbursementCurrencyCode) ? resolveExpenseLineExchangeRateForCurrency(currencyCode, reimbursementCurrencyCode, currentExchangeRate) : null;
  return nextExchangeRate != null ? { exchangeRate: formatEditableExchangeRate(nextExchangeRate) } : {};
};
var resolveExchangeRateForSettlement = (currencyCode, localCurrencyCode, exchangeRate) => {
  if (!isExpenseLineForeignCurrency(currencyCode, localCurrencyCode)) {
    return formatEditableExchangeRate(100);
  }
  const parsedExchangeRate = parseExpenseNumericInput(exchangeRate);
  if (parsedExchangeRate != null && parsedExchangeRate > 0) {
    return exchangeRate;
  }
  return exchangeRate;
};
var buildLocalCurrencySettlementPatch = (currencyCode, localCurrencyCode, totalAmount, exchangeRate, amountMSTManuallyEdited) => {
  if (isExpenseLineForeignCurrency(currencyCode, localCurrencyCode)) {
    return {};
  }
  const parsedTotalAmount = parseExpenseNumericInput(totalAmount);
  return {
    exchangeRate: formatEditableExchangeRate(
      resolveExpenseLineExchangeRateForCurrency(currencyCode, localCurrencyCode, exchangeRate)
    ),
    ...!amountMSTManuallyEdited && parsedTotalAmount != null ? { amountMST: formatEditableMoney(parsedTotalAmount) } : {}
  };
};
var createDraftFromHeader = (header, linkedExpenseLine, localCurrencyCode) => {
  const normalizedLocalCurrencyCode = normalizeCurrencyCode(localCurrencyCode) || normalizeCurrencyCode(linkedExpenseLine?.currencyCode);
  const normalizedCurrencyCode = normalizeCurrencyCode(header?.currencyCode) || normalizeCurrencyCode(linkedExpenseLine?.currencyCode) || normalizedLocalCurrencyCode;
  const totalAmount = toFiniteNumber(header?.totalAmountCurrency ?? header?.totalAmount) ?? toFiniteNumber(linkedExpenseLine?.amount) ?? toFiniteNumber(linkedExpenseLine?.price);
  const ticketExchangeRate = toFiniteNumber(header?.exchRate ?? linkedExpenseLine?.exchRate);
  const ticketAmountMST = toFiniteNumber(header?.visibleReimbursableTotal ?? header?.amountMST ?? linkedExpenseLine?.amountMST);
  const sameCurrency = isExpenseLineSameReimbursementCurrency(normalizedCurrencyCode, normalizedLocalCurrencyCode);
  const exchangeRate = sameCurrency ? 100 : ticketExchangeRate != null && ticketExchangeRate > 0 ? ticketExchangeRate : null;
  const calculatedAmountMST = totalAmount != null ? calculateExpenseLineAmountMSTForCurrency(
    totalAmount,
    exchangeRate,
    normalizedCurrencyCode,
    normalizedLocalCurrencyCode
  ) : null;
  const amountMST = ticketAmountMST ?? calculatedAmountMST ?? (sameCurrency ? totalAmount : null);
  return {
    description: safeText(header?.description),
    gastoType: header?.gastoType === null || header?.gastoType === void 0 ? "" : String(header.gastoType),
    currencyCode: normalizedCurrencyCode,
    totalAmount: formatEditableMoney(totalAmount),
    amountMST: formatEditableMoney(amountMST),
    exchangeRate: formatEditableExchangeRate(exchangeRate),
    transDate: toInputDate(header?.ticketDate || header?.transDate),
    ticketTime: toInputTime(header?.ticketTime),
    comentario: safeText(header?.comentario),
    urlFile: safeText(header?.urlFile),
    fileName: safeText(header?.fileName)
  };
};
var createInitialState = () => ({
  busy: false,
  status: "",
  isEditing: false,
  modalError: "",
  linePage: 1,
  amountMSTManuallyEdited: false,
  draft: createEmptyDraft()
});
var isValidRequiredGastoType = (rawValue) => {
  return toExpenseGastoTypeCode(rawValue, { allowNone: false }) !== null;
};
var editorReducer = (state, action) => {
  switch (action.type) {
    case "hydrate_from_header":
      return {
        ...state,
        amountMSTManuallyEdited: false,
        draft: createDraftFromHeader(action.header, action.linkedExpenseLine, action.localCurrencyCode)
      };
    case "patch_state":
      return {
        ...state,
        ...action.patch
      };
    case "set_draft_field":
      return {
        ...state,
        draft: {
          ...state.draft,
          [action.field]: action.value
        }
      };
    case "patch_draft":
      return {
        ...state,
        amountMSTManuallyEdited: action.amountMSTManuallyEdited ?? state.amountMSTManuallyEdited,
        draft: {
          ...state.draft,
          ...action.patch
        }
      };
    default:
      return state;
  }
};
var resolveSetStateValue = (value, current) => {
  return typeof value === "function" ? value(current) : value;
};
var useExpenseTicketDetailEditor = ({
  header,
  linkedExpenseLine,
  localCurrencyCode,
  lineCount,
  pageSize,
  canEditTicket,
  isLoading,
  allowAssignedDraftEdit,
  isSheetLinkReadOnly,
  onForbidden
}) => {
  const [state, dispatch] = (0, import_react2.useReducer)(editorReducer, void 0, createInitialState);
  const [descriptionInvalid, setDescriptionInvalid] = (0, import_react2.useState)(false);
  const [gastoTypeInvalid, setGastoTypeInvalid] = (0, import_react2.useState)(false);
  const [currencyCodeInvalid, setCurrencyCodeInvalid] = (0, import_react2.useState)(false);
  const [totalAmountInvalid, setTotalAmountInvalid] = (0, import_react2.useState)(false);
  const [amountMSTInvalid, setAmountMSTInvalid] = (0, import_react2.useState)(false);
  const [exchangeRateInvalid, setExchangeRateInvalid] = (0, import_react2.useState)(false);
  const descriptionInputRef = (0, import_react2.useRef)(null);
  const gastoTypeInputRef = (0, import_react2.useRef)(null);
  const currencyInputRef = (0, import_react2.useRef)(null);
  const totalAmountInputRef = (0, import_react2.useRef)(null);
  const amountMSTInputRef = (0, import_react2.useRef)(null);
  const exchangeRateInputRef = (0, import_react2.useRef)(null);
  const effectiveLocalCurrencyCode = normalizeCurrencyCode(localCurrencyCode) || normalizeCurrencyCode(linkedExpenseLine?.currencyCode);
  (0, import_react2.useEffect)(() => {
    if (state.isEditing) return;
    dispatch({ type: "hydrate_from_header", header, linkedExpenseLine, localCurrencyCode: effectiveLocalCurrencyCode });
  }, [effectiveLocalCurrencyCode, header, linkedExpenseLine, state.isEditing]);
  (0, import_react2.useEffect)(() => {
    const maxPage = Math.max(1, Math.ceil(lineCount / pageSize));
    if (state.linePage > maxPage) {
      dispatch({ type: "patch_state", patch: { linePage: maxPage } });
    }
  }, [lineCount, pageSize, state.linePage]);
  (0, import_react2.useEffect)(() => {
    if (state.isEditing) return;
    setDescriptionInvalid(false);
    setGastoTypeInvalid(false);
    setCurrencyCodeInvalid(false);
    setTotalAmountInvalid(false);
    setAmountMSTInvalid(false);
    setExchangeRateInvalid(false);
  }, [state.isEditing]);
  const setBusy = (0, import_react2.useCallback)(
    (value) => {
      dispatch({ type: "patch_state", patch: { busy: resolveSetStateValue(value, state.busy) } });
    },
    [state.busy]
  );
  const setStatus = (0, import_react2.useCallback)(
    (value) => {
      dispatch({ type: "patch_state", patch: { status: resolveSetStateValue(value, state.status) } });
    },
    [state.status]
  );
  const setIsEditing = (0, import_react2.useCallback)(
    (value) => {
      dispatch({ type: "patch_state", patch: { isEditing: resolveSetStateValue(value, state.isEditing) } });
    },
    [state.isEditing]
  );
  const setModalError = (0, import_react2.useCallback)(
    (value) => {
      dispatch({ type: "patch_state", patch: { modalError: resolveSetStateValue(value, state.modalError) } });
    },
    [state.modalError]
  );
  const setLinePage = (0, import_react2.useCallback)(
    (value) => {
      dispatch({ type: "patch_state", patch: { linePage: resolveSetStateValue(value, state.linePage) } });
    },
    [state.linePage]
  );
  const setDraftDescription = (0, import_react2.useCallback)(
    (value) => {
      setDescriptionInvalid(false);
      dispatch({
        type: "set_draft_field",
        field: "description",
        value: resolveSetStateValue(value, state.draft.description)
      });
    },
    [state.draft.description]
  );
  const setDraftGastoType = (0, import_react2.useCallback)(
    (value) => {
      setGastoTypeInvalid(false);
      dispatch({
        type: "set_draft_field",
        field: "gastoType",
        value: resolveSetStateValue(value, state.draft.gastoType)
      });
    },
    [state.draft.gastoType]
  );
  const setDraftCurrencyCode = (0, import_react2.useCallback)(
    (value) => {
      setCurrencyCodeInvalid(false);
      setAmountMSTInvalid(false);
      setExchangeRateInvalid(false);
      const nextCurrencyCode = normalizeCurrencyCode(resolveSetStateValue(value, state.draft.currencyCode));
      const nextPatch = {
        currencyCode: nextCurrencyCode,
        ...buildLocalCurrencySettlementPatch(
          nextCurrencyCode,
          effectiveLocalCurrencyCode,
          state.draft.totalAmount,
          state.draft.exchangeRate,
          false
        )
      };
      if (!nextPatch.amountMST) {
        Object.assign(
          nextPatch,
          buildAmountMSTPatchFromExchangeRate(
            state.draft.totalAmount,
            state.draft.exchangeRate,
            nextCurrencyCode,
            effectiveLocalCurrencyCode,
            false
          )
        );
      }
      dispatch({
        type: "patch_draft",
        patch: nextPatch,
        amountMSTManuallyEdited: false
      });
    },
    [effectiveLocalCurrencyCode, state.draft.currencyCode, state.draft.exchangeRate, state.draft.totalAmount]
  );
  const setDraftTotalAmount = (0, import_react2.useCallback)(
    (value) => {
      setTotalAmountInvalid(false);
      setAmountMSTInvalid(false);
      setExchangeRateInvalid(false);
      const nextTotalAmount = resolveSetStateValue(value, state.draft.totalAmount);
      const effectiveExchangeRate = resolveExchangeRateForSettlement(
        state.draft.currencyCode,
        effectiveLocalCurrencyCode,
        state.draft.exchangeRate
      );
      const nextPatch = {
        totalAmount: nextTotalAmount,
        ...buildAmountMSTPatchFromExchangeRate(
          nextTotalAmount,
          effectiveExchangeRate,
          state.draft.currencyCode,
          effectiveLocalCurrencyCode,
          state.amountMSTManuallyEdited
        )
      };
      dispatch({
        type: "patch_draft",
        patch: nextPatch
      });
    },
    [
      effectiveLocalCurrencyCode,
      state.amountMSTManuallyEdited,
      state.draft.currencyCode,
      state.draft.exchangeRate,
      state.draft.totalAmount
    ]
  );
  const setDraftAmountMST = (0, import_react2.useCallback)(
    (value) => {
      setAmountMSTInvalid(false);
      setExchangeRateInvalid(false);
      const nextAmountMST = resolveSetStateValue(value, state.draft.amountMST);
      if (areExpenseNumericInputsEquivalent(nextAmountMST, state.draft.amountMST)) {
        if (nextAmountMST !== state.draft.amountMST) {
          dispatch({
            type: "patch_draft",
            patch: {
              amountMST: nextAmountMST
            }
          });
        }
        return;
      }
      dispatch({
        type: "patch_draft",
        patch: {
          amountMST: nextAmountMST,
          ...buildExchangeRatePatchFromAmountMST(
            state.draft.totalAmount,
            nextAmountMST,
            state.draft.currencyCode,
            effectiveLocalCurrencyCode,
            state.draft.exchangeRate
          )
        },
        amountMSTManuallyEdited: true
      });
    },
    [effectiveLocalCurrencyCode, state.draft.amountMST, state.draft.currencyCode, state.draft.exchangeRate, state.draft.totalAmount]
  );
  const setDraftExchangeRate = (0, import_react2.useCallback)(
    (value) => {
      setExchangeRateInvalid(false);
      setAmountMSTInvalid(false);
      const nextExchangeRate = resolveSetStateValue(value, state.draft.exchangeRate);
      dispatch({
        type: "patch_draft",
        patch: {
          exchangeRate: nextExchangeRate
        }
      });
    },
    [state.draft.exchangeRate]
  );
  const commitDraftExchangeRate = (0, import_react2.useCallback)(
    (value, currencyCodeOverride) => {
      setExchangeRateInvalid(false);
      setAmountMSTInvalid(false);
      const effectiveCurrencyCode = currencyCodeOverride ? normalizeCurrencyCode(currencyCodeOverride) : state.draft.currencyCode;
      const nextExchangeRate = formatEditableExchangeRate(
        resolveExchangeRateForSettlement(
          effectiveCurrencyCode,
          effectiveLocalCurrencyCode,
          value
        )
      );
      dispatch({
        type: "patch_draft",
        patch: {
          exchangeRate: nextExchangeRate,
          ...buildAmountMSTPatchFromExchangeRate(
            state.draft.totalAmount,
            nextExchangeRate,
            effectiveCurrencyCode,
            effectiveLocalCurrencyCode,
            state.amountMSTManuallyEdited
          )
        }
      });
    },
    [effectiveLocalCurrencyCode, state.amountMSTManuallyEdited, state.draft.currencyCode, state.draft.totalAmount]
  );
  const handleEnableEdit = (0, import_react2.useCallback)(() => {
    if (!header || isLoading) return;
    if (isSheetLinkReadOnly) return;
    if (header.status === 1 && !allowAssignedDraftEdit) return;
    if (!canEditTicket) {
      onForbidden();
      return;
    }
    setGastoTypeInvalid(false);
    setCurrencyCodeInvalid(false);
    setTotalAmountInvalid(false);
    setAmountMSTInvalid(false);
    setExchangeRateInvalid(false);
    dispatch({ type: "hydrate_from_header", header, linkedExpenseLine, localCurrencyCode: effectiveLocalCurrencyCode });
    dispatch({
      type: "patch_state",
      patch: {
        modalError: "",
        isEditing: true,
        status: indT("ExpenseSheets_Detail_EditingEnabled", "Editing enabled")
      }
    });
  }, [
    allowAssignedDraftEdit,
    canEditTicket,
    effectiveLocalCurrencyCode,
    header,
    isSheetLinkReadOnly,
    isLoading,
    linkedExpenseLine,
    onForbidden
  ]);
  const handleCancelEdit = (0, import_react2.useCallback)(() => {
    if (!state.isEditing) return;
    if (!header) {
      dispatch({ type: "patch_state", patch: { isEditing: false } });
      return;
    }
    setGastoTypeInvalid(false);
    setCurrencyCodeInvalid(false);
    setTotalAmountInvalid(false);
    setAmountMSTInvalid(false);
    setExchangeRateInvalid(false);
    dispatch({ type: "hydrate_from_header", header, linkedExpenseLine, localCurrencyCode: effectiveLocalCurrencyCode });
    dispatch({
      type: "patch_state",
      patch: {
        isEditing: false,
        modalError: "",
        status: indT("Common_Cancel", "Cancel")
      }
    });
  }, [effectiveLocalCurrencyCode, header, linkedExpenseLine, state.isEditing]);
  const canOpenSaveConfirm = (0, import_react2.useCallback)(() => {
    const normalizedDescription = String(state.draft.description || "").trim();
    const normalizedCurrencyCode = String(state.draft.currencyCode || "").trim().toUpperCase();
    const parsedTotalAmount = parseExpenseNumericInput(state.draft.totalAmount);
    const parsedAmountMST = parseExpenseNumericInput(state.draft.amountMST);
    const parsedExchangeRate = parseExpenseNumericInput(state.draft.exchangeRate);
    const descriptionIsValid = !!normalizedDescription;
    const gastoTypeIsValid = isValidRequiredGastoType(state.draft.gastoType);
    const currencyIsValid = !!normalizedCurrencyCode;
    const totalAmountIsValid = parsedTotalAmount != null && parsedTotalAmount >= 0;
    const requiresForeignCurrencySettlement = isExpenseLineForeignCurrency(normalizedCurrencyCode, effectiveLocalCurrencyCode);
    const hasForeignCurrencySettlement = !requiresForeignCurrencySettlement || parsedExchangeRate != null && parsedExchangeRate > 0 || parsedAmountMST != null && parsedAmountMST > 0;
    setDescriptionInvalid(!descriptionIsValid);
    setGastoTypeInvalid(!gastoTypeIsValid);
    setCurrencyCodeInvalid(!currencyIsValid);
    setTotalAmountInvalid(!totalAmountIsValid);
    setExchangeRateInvalid(!hasForeignCurrencySettlement);
    setAmountMSTInvalid(!hasForeignCurrencySettlement);
    if (descriptionIsValid && gastoTypeIsValid && currencyIsValid && totalAmountIsValid && hasForeignCurrencySettlement) {
      return true;
    }
    const message = !descriptionIsValid ? indT("ExpenseSheets_Validation_DescriptionRequired", "Description is required.") : !gastoTypeIsValid ? indT("Tickets_Validation_CategoryRequired", "Category is required.") : !currencyIsValid ? indT("ExpenseSheets_Validation_CurrencyRequired", "Currency is required.") : !totalAmountIsValid ? indT("Tickets_Validation_TotalAmountRequired", "Total amount must be greater than or equal to 0.") : indT(
      "ExpenseSheets_Line_Validation_ForeignCurrencySettlement",
      "Foreign currency lines require an exchange rate greater than 0 or a reimbursement amount."
    );
    dispatch({
      type: "patch_state",
      patch: {
        modalError: message,
        status: message
      }
    });
    window.requestAnimationFrame(() => {
      if (!descriptionIsValid) {
        descriptionInputRef.current?.focus();
        return;
      }
      if (!gastoTypeIsValid) {
        gastoTypeInputRef.current?.focus();
        return;
      }
      if (!currencyIsValid) {
        currencyInputRef.current?.focus();
        return;
      }
      if (!totalAmountIsValid) {
        totalAmountInputRef.current?.focus();
        return;
      }
      if (!hasForeignCurrencySettlement) {
        exchangeRateInputRef.current?.focus();
      }
    });
    return false;
  }, [
    effectiveLocalCurrencyCode,
    state.draft.amountMST,
    state.draft.currencyCode,
    state.draft.description,
    state.draft.exchangeRate,
    state.draft.gastoType,
    state.draft.totalAmount
  ]);
  return {
    busy: state.busy,
    status: state.status,
    isEditing: state.isEditing,
    modalError: state.modalError,
    linePage: state.linePage,
    draftDescription: state.draft.description,
    descriptionInvalid,
    descriptionInputRef,
    draftGastoType: state.draft.gastoType,
    gastoTypeInvalid,
    gastoTypeInputRef,
    draftCurrencyCode: state.draft.currencyCode,
    currencyCodeInvalid,
    currencyInputRef,
    draftTotalAmount: state.draft.totalAmount,
    totalAmountInvalid,
    totalAmountInputRef,
    draftAmountMST: state.draft.amountMST,
    amountMSTInvalid,
    amountMSTInputRef,
    draftExchangeRate: state.draft.exchangeRate,
    exchangeRateInvalid,
    exchangeRateInputRef,
    localCurrencyCode: effectiveLocalCurrencyCode,
    draftTransDate: state.draft.transDate,
    draftTicketTime: state.draft.ticketTime,
    draftComentario: state.draft.comentario,
    draftUrlFile: state.draft.urlFile,
    draftFileName: state.draft.fileName,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setLinePage,
    setDraftDescription,
    setDraftGastoType,
    setDraftCurrencyCode,
    setDraftTotalAmount,
    setDraftAmountMST,
    setDraftExchangeRate,
    commitDraftExchangeRate,
    canOpenSaveConfirm,
    handleEnableEdit,
    handleCancelEdit
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketDetailRouteContext.ts
var import_react3 = __toESM(require_react());
var useExpenseTicketDetailRouteContext = () => {
  const routeParams = (0, import_react3.useMemo)(() => new URLSearchParams(window.location.search), []);
  const fileId = (0, import_react3.useMemo)(() => safeText(window.__EXPENSE_TICKET_FILE_ID__), []);
  const autoEditMode = (0, import_react3.useMemo)(() => safeText(routeParams.get("mode")).toLowerCase() === "edit", [routeParams]);
  const routeIntent = (0, import_react3.useMemo)(() => safeText(routeParams.get("intent")).toLowerCase(), [routeParams]);
  const routeOrigin = (0, import_react3.useMemo)(() => safeText(routeParams.get("origin")).toLowerCase(), [routeParams]);
  const routeSheetId = (0, import_react3.useMemo)(() => safeText(routeParams.get("sheetId")), [routeParams]);
  const routeSheetLineRecId = (0, import_react3.useMemo)(
    () => safeText(routeParams.get("sheetLineRecId") || routeParams.get("lineRecId")),
    [routeParams]
  );
  const explicitReturnContext = (0, import_react3.useMemo)(
    () => normalizeExpenseTicketReturnContext({
      fileId,
      origin: routeOrigin,
      sheetId: routeSheetId,
      sheetLineRecId: routeSheetLineRecId
    }),
    [fileId, routeOrigin, routeSheetId, routeSheetLineRecId]
  );
  (0, import_react3.useEffect)(() => {
    if (!explicitReturnContext) return;
    saveExpenseTicketReturnContext(explicitReturnContext);
  }, [explicitReturnContext]);
  return (0, import_react3.useMemo)(() => {
    const ticketReturnContext = resolveExpenseTicketReturnContext(fileId, explicitReturnContext);
    const detailOrigin = ticketReturnContext?.origin || routeOrigin;
    const contextSheetId = ticketReturnContext?.sheetId || routeSheetId;
    const contextLineRecId = ticketReturnContext?.sheetLineRecId || routeSheetLineRecId;
    const isFromExpenseSheetCreate = detailOrigin === "sheet-create";
    const isFromExpenseLine = detailOrigin === "expense-line" && !!contextSheetId && !!contextLineRecId;
    const isFromSheetLink = detailOrigin === "sheet-link" && !!contextSheetId;
    const isLinkFailureRepair = isFromSheetLink && autoEditMode && routeIntent === EXPENSE_TICKET_LINK_FAILURE_REPAIR_INTENT;
    return {
      autoEditMode,
      detailOrigin,
      contextSheetId,
      contextLineRecId,
      isFromExpenseSheetCreate,
      isFromExpenseLine,
      isFromSheetLink,
      isLinkFailureRepair,
      ticketReturnContext
    };
  }, [autoEditMode, explicitReturnContext, fileId, routeIntent, routeOrigin, routeSheetId, routeSheetLineRecId]);
};

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketDetailDisplay.ts
var import_react4 = __toESM(require_react());
var formatExpenseDisplayTime = (raw) => {
  const value = safeText(raw);
  if (!value || value === "0") return "";
  const secondsValue = Number(value);
  if (Number.isInteger(secondsValue) && secondsValue >= 0 && secondsValue <= 86399) {
    const hours2 = Math.floor(secondsValue / 3600);
    const minutes = Math.floor(secondsValue % 3600 / 60);
    const seconds = secondsValue % 60;
    return [hours2, minutes, seconds].map((entry) => String(entry).padStart(2, "0")).join(":");
  }
  const match = value.match(/^(\d{1,2}):([0-5]\d)(?::([0-5]\d))?$/);
  if (!match) return value;
  const hours = Number.parseInt(match[1] || "", 10);
  if (!Number.isInteger(hours) || hours < 0 || hours > 23) return value;
  return `${String(hours).padStart(2, "0")}:${match[2]}:${match[3] || "00"}`;
};
var useExpenseTicketDetailDisplay = ({
  header,
  draftGastoType,
  draftCurrencyCode,
  draftTotalAmount,
  draftTransDate,
  draftTicketTime,
  draftFileName,
  isEditing,
  gastoTypeLabelMap
}) => {
  const paginationLabels = (0, import_react4.useMemo)(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last")
    }),
    []
  );
  const previewAltText = (0, import_react4.useMemo)(
    () => safeText(isEditing ? draftFileName : header?.fileName) || indT("Tickets_Field_FileId", "Ticket"),
    [draftFileName, header?.fileName, isEditing]
  );
  const statusLabel = (0, import_react4.useMemo)(() => getExpenseTicketStatusLabel(header?.status), [header?.status]);
  const gastoTypeLabel = (0, import_react4.useMemo)(() => {
    const currentGastoType = isEditing ? draftGastoType : header?.gastoType === null ? "" : String(header?.gastoType ?? "");
    if (!currentGastoType) {
      return indT("Common_NotAvailable", "N/A");
    }
    return gastoTypeLabelMap.get(String(currentGastoType)) || String(currentGastoType);
  }, [draftGastoType, gastoTypeLabelMap, header?.gastoType, isEditing]);
  const totalAmountText = (0, import_react4.useMemo)(
    () => {
      const editableTotalAmount = parseExpenseNumericInput(draftTotalAmount);
      return formatAmountWithCurrency(
        isEditing && editableTotalAmount != null ? editableTotalAmount : header?.totalAmountCurrency ?? header?.totalAmount ?? null,
        (isEditing ? draftCurrencyCode : header?.currencyCode) || header?.currencyCode
      );
    },
    [draftCurrencyCode, draftTotalAmount, header?.currencyCode, header?.totalAmount, header?.totalAmountCurrency, isEditing]
  );
  const transDateText = (0, import_react4.useMemo)(
    () => formatExpenseDisplayDate(isEditing ? draftTransDate : header?.ticketDate || header?.transDate, document?.documentElement?.lang || "es-ES"),
    [draftTransDate, header?.ticketDate, header?.transDate, isEditing]
  );
  const ticketTimeText = (0, import_react4.useMemo)(
    () => formatExpenseDisplayTime(isEditing ? draftTicketTime : header?.ticketTime),
    [draftTicketTime, header?.ticketTime, isEditing]
  );
  return {
    paginationLabels,
    previewAltText,
    statusLabel,
    gastoTypeLabel,
    totalAmountText,
    transDateText,
    ticketTimeText
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketDetailConfirmState.ts
var import_react5 = __toESM(require_react());
var useExpenseTicketDetailConfirmState = ({
  busy,
  modalError,
  setModalError,
  setStatus
}) => {
  const { modal, openConfirm, closeConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "OK"),
    defaultCancelText: indT("Confirm_No", "Cancel")
  });
  const handleModalConfirm = (0, import_react5.useCallback)(async () => {
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
  const handleModalButtonConfirm = (0, import_react5.useCallback)(() => {
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

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketDetailInteractions.ts
var import_react6 = __toESM(require_react());
var useExpenseTicketDetailInteractions = ({
  busy,
  fileId,
  contextSheetId,
  isFromSheetLink,
  headerExpenseSheetId,
  isEditing,
  canOpenSaveConfirm,
  handlePersistHeaderDraft,
  bypassWorkflowGuard,
  lineContainerRef,
  openPreview,
  ticketReturnContext
}) => {
  const persistHeaderDraftIfNeeded = (0, import_react6.useCallback)(async () => {
    if (!isEditing) {
      return true;
    }
    if (!canOpenSaveConfirm()) {
      return false;
    }
    return handlePersistHeaderDraft();
  }, [canOpenSaveConfirm, handlePersistHeaderDraft, isEditing]);
  const openLineDetail = (0, import_react6.useCallback)(
    async (rawLineRecId) => {
      if (isFromSheetLink) return;
      if (busy) return;
      const lineRecId = safeText(rawLineRecId);
      if (!lineRecId || !fileId) return;
      const shouldOpenInEditMode = isEditing;
      if (shouldOpenInEditMode) {
        const updateOk = await persistHeaderDraftIfNeeded();
        if (!updateOk) {
          return;
        }
      }
      const query = new URLSearchParams({
        fileId,
        lineRecId
      });
      if (shouldOpenInEditMode) {
        query.set("mode", "edit");
      }
      appendExpenseTicketReturnQuery(query, ticketReturnContext);
      navigateToExpenseUrl(`/Gastos/TicketLineDetail?${query.toString()}`, {
        askConfirmation: false,
        bypassGuardOnce: shouldOpenInEditMode || bypassWorkflowGuard
      });
    },
    [
      busy,
      bypassWorkflowGuard,
      fileId,
      isEditing,
      isFromSheetLink,
      persistHeaderDraftIfNeeded,
      ticketReturnContext
    ]
  );
  const openCreateLineDetail = (0, import_react6.useCallback)(async () => {
    if (isFromSheetLink) return;
    if (busy) return;
    if (!fileId) return;
    const updateOk = await persistHeaderDraftIfNeeded();
    if (!updateOk) {
      return;
    }
    const query = new URLSearchParams({
      fileId,
      mode: "create"
    });
    appendExpenseTicketReturnQuery(query, ticketReturnContext);
    navigateToExpenseUrl(`/Gastos/TicketLineDetail?${query.toString()}`, {
      askConfirmation: false,
      bypassGuardOnce: isEditing || bypassWorkflowGuard
    });
  }, [busy, bypassWorkflowGuard, fileId, isEditing, isFromSheetLink, persistHeaderDraftIfNeeded, ticketReturnContext]);
  const resolveClickableCard = (0, import_react6.useCallback)(
    (target) => {
      const node = target;
      if (!node || typeof node.closest !== "function") return null;
      const card = node.closest(".timeline-card--clickable");
      if (!card) return null;
      if (!lineContainerRef.current?.contains(card)) return null;
      return card;
    },
    [lineContainerRef]
  );
  const openFile = (0, import_react6.useCallback)(() => {
    void openPreview();
  }, [openPreview]);
  const handleOpenExpenseSheet = (0, import_react6.useCallback)(() => {
    if (isFromSheetLink) return;
    const safeSheetId = safeText(ticketReturnContext?.sheetId || headerExpenseSheetId || contextSheetId);
    if (!safeSheetId) return;
    navigateToExpenseUrl(buildExpenseSheetDetailUrl(safeSheetId), {
      askConfirmation: isEditing
    });
  }, [contextSheetId, headerExpenseSheetId, isEditing, isFromSheetLink, ticketReturnContext]);
  return {
    openCreateLineDetail,
    openLineDetail,
    resolveClickableCard,
    openFile,
    handleOpenExpenseSheet
  };
};

// Web/wwwroot/react/src/pages/gastos/components/ExpenseTicketCurrencySettlementFields.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ExpenseTicketCurrencySettlementFields = ({
  isEditing,
  expenseCurrencyCode,
  expenseCurrencyInvalid,
  expenseCurrencyInputRef,
  localCurrencyCode,
  exchangeRate,
  exchangeRateInvalid,
  exchangeRateInputRef,
  exchangeRateInfoMessage,
  amountCurrency,
  amountCurrencyInvalid,
  amountCurrencyInputRef,
  reimbursementAmount,
  reimbursementAmountInvalid,
  reimbursementAmountInputRef,
  onExpenseCurrencyChange,
  onExchangeRateChange,
  onExchangeRateCommit,
  onAmountCurrencyChange,
  onReimbursementAmountChange
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ExpenseCurrencySettlementFields_default,
    {
      isEditing,
      expenseCurrencyCode,
      expenseCurrencyInvalid,
      expenseCurrencyInputRef,
      localCurrencyCode,
      exchangeRate,
      exchangeRateInvalid,
      exchangeRateInputRef,
      exchangeRateInfoMessage,
      amountCurrency,
      amountCurrencyMode: "editable",
      amountCurrencyInvalid,
      amountCurrencyInputRef,
      reimbursementAmount,
      reimbursementAmountInvalid,
      reimbursementAmountInputRef,
      onExpenseCurrencyChange,
      onExchangeRateChange,
      onExchangeRateCommit,
      onAmountCurrencyChange,
      onReimbursementAmountChange
    }
  );
};
var ExpenseTicketCurrencySettlementFields_default = ExpenseTicketCurrencySettlementFields;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseTicketDetailHeaderForm.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var hasRealExpenseSheetValue = (value) => {
  const normalized = safeText(value).toLowerCase();
  if (!normalized) return false;
  if (normalized === "-" || normalized === "0") return false;
  if (normalized === "n/a" || normalized === "na") return false;
  return true;
};
var ExpenseTicketDetailHeaderForm = ({
  header,
  statusLabel,
  gastoTypeLabel,
  totalAmountText,
  transDateText,
  ticketTimeText,
  isEditing,
  gastoTypeOptions,
  draftDescription,
  descriptionInvalid,
  descriptionInputRef,
  draftGastoType,
  gastoTypeInvalid,
  gastoTypeInputRef,
  draftCurrencyCode,
  currencyCodeInvalid,
  currencyInputRef,
  draftTotalAmount,
  totalAmountInvalid,
  totalAmountInputRef,
  draftExchangeRate,
  exchangeRateInvalid,
  exchangeRateInputRef,
  exchangeRateInfoMessage,
  draftAmountMST,
  amountMSTInvalid,
  amountMSTInputRef,
  localCurrencyCode,
  draftTransDate,
  draftTicketTime,
  draftUrlFile,
  draftFileName,
  onDraftDescriptionChange,
  onDraftGastoTypeChange,
  onDraftCurrencyCodeChange,
  onDraftTotalAmountChange,
  onDraftExchangeRateChange,
  onDraftExchangeRateCommit,
  onDraftAmountMSTChange,
  onOpenFile,
  onOpenExpenseSheet,
  hideOpenFileAction = false,
  children
}) => {
  const previewUrl = safeText(isEditing ? draftUrlFile : header.urlFile);
  const canOpenFile = hasExpenseTicketImagePreviewSource(previewUrl);
  const showExpenseSheetField = hasRealExpenseSheetValue(header.hojaGastosIdDisplay);
  const locale = document?.documentElement?.lang || "es-ES";
  const displayDateText = transDateText || formatExpenseDisplayDate(header.ticketDate || header.transDate, locale) || "-";
  const lockedDraftDateText = formatExpenseDisplayDate(draftTransDate, locale) || displayDateText;
  const categoryField = isEditing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    SelectCombobox_default,
    {
      label: indT("Tickets_Filter_Category", "Category"),
      options: gastoTypeOptions,
      value: draftGastoType,
      onChange: onDraftGastoTypeChange,
      placeholder: indT("Tickets_Filter_Category", "Category"),
      inputRef: gastoTypeInputRef,
      invalid: gastoTypeInvalid,
      usePortal: true,
      allowTextInput: false,
      showSearchButton: false
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    ExpenseReadOnlyField_default,
    {
      label: indT("Tickets_Filter_Category", "Category"),
      value: gastoTypeLabel || "-"
    }
  );
  const statusField = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    ExpenseReadOnlyField_default,
    {
      label: indT("Tickets_Field_Status", "Status"),
      value: statusLabel || "-"
    }
  );
  const ticketField = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    ExpenseReadOnlyField_default,
    {
      label: indT("Tickets_Field_FileId", "Ticket Id."),
      value: header.fileId || "-"
    }
  );
  const expenseSheetField = showExpenseSheetField ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    ExpenseReadOnlyField_default,
    {
      label: indT("Tickets_Field_ExpenseSheetDisplay", "Expense sheet Id."),
      value: header.hojaGastosIdDisplay || "-",
      onClick: onOpenExpenseSheet
    }
  ) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-zinc-200 rounded-[var(--radius-xl)]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      isEditing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "md:col-span-2 space-y-1.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_Description", "Description") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "input",
          {
            ref: descriptionInputRef,
            className: `form-control${descriptionInvalid ? " border-rose-400 bg-rose-50 focus:border-rose-400 focus:ring-rose-200" : ""}`,
            value: draftDescription,
            onChange: (event) => onDraftDescriptionChange(event.target.value || ""),
            "aria-invalid": descriptionInvalid ? "true" : "false",
            "aria-label": indT("ExpenseSheets_Field_Description", "Description")
          }
        )
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        ExpenseReadOnlyField_default,
        {
          label: indT("ExpenseSheets_Field_Description", "Description"),
          value: header.description || "-",
          fullWidth: true
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        ExpenseTicketCurrencySettlementFields_default,
        {
          isEditing,
          expenseCurrencyCode: isEditing ? draftCurrencyCode : safeText(header.currencyCode),
          expenseCurrencyInvalid: currencyCodeInvalid,
          expenseCurrencyInputRef: currencyInputRef,
          localCurrencyCode,
          exchangeRate: draftExchangeRate,
          exchangeRateInvalid,
          exchangeRateInputRef,
          exchangeRateInfoMessage,
          amountCurrency: isEditing ? draftTotalAmount : totalAmountText || "-",
          amountCurrencyInvalid: totalAmountInvalid,
          amountCurrencyInputRef: totalAmountInputRef,
          reimbursementAmount: draftAmountMST,
          reimbursementAmountInvalid: amountMSTInvalid,
          reimbursementAmountInputRef: amountMSTInputRef,
          onExpenseCurrencyChange: onDraftCurrencyCodeChange,
          onExchangeRateChange: onDraftExchangeRateChange,
          onExchangeRateCommit: onDraftExchangeRateCommit,
          onAmountCurrencyChange: onDraftTotalAmountChange,
          onReimbursementAmountChange: onDraftAmountMSTChange
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "md:col-span-2 grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          ExpenseReadOnlyField_default,
          {
            label: indT("Tickets_Field_TicketDate", "Date"),
            value: isEditing ? lockedDraftDateText : displayDateText
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          ExpenseReadOnlyField_default,
          {
            label: indT("Tickets_Field_TicketTime", "Time"),
            value: isEditing ? draftTicketTime || ticketTimeText || "-" : ticketTimeText || "-"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "md:col-span-2 grid grid-cols-2 gap-4", children: [
        categoryField,
        statusField
      ] }),
      expenseSheetField ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "md:col-span-2 grid grid-cols-2 gap-4", children: [
        ticketField,
        expenseSheetField
      ] }) : ticketField,
      children
    ] }),
    canOpenFile && !hideOpenFileAction ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "button",
      {
        type: "button",
        className: "ind-action-btn px-3 py-1.5 text-xs",
        onClick: onOpenFile,
        children: indT("Tickets_Detail_ViewAttachment", "Ver adjunto")
      }
    ) }) : null
  ] });
};
var ExpenseTicketDetailHeaderForm_default = ExpenseTicketDetailHeaderForm;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseTicketLinkedSheetLineSection.tsx
var import_react7 = __toESM(require_react());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var ExpenseTicketLinkedSheetLineSection = ({
  projectId,
  reimbursableExpense,
  isEditing,
  isLoading,
  disabled = false,
  errorMessage = "",
  onProjectIdChange,
  onReimbursableExpenseChange
}) => {
  const reimbursableExpenseOptions = import_react7.default.useMemo(() => getExpenseLineReimbursableExpenseOptions(), []);
  const normalizedReimbursableExpense = normalizeExpenseLineReimbursableExpense(reimbursableExpense);
  const reimbursableExpenseLabel = getExpenseLineReimbursableExpenseLabel(normalizedReimbursableExpense);
  const projectField = isEditing ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    ExpenseProjectFilterInput_default,
    {
      label: indT("ExpenseSheets_Field_Project", "Project"),
      placeholder: indT("ExpenseSheets_Filter_Project_Placeholder", "Project id"),
      value: projectId,
      onChange: onProjectIdChange,
      disabled,
      readOnly: disabled
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    ExpenseReadOnlyField_default,
    {
      label: indT("ExpenseSheets_Field_Project", "Project"),
      value: projectId || "-"
    }
  );
  const reimbursableExpenseField = isEditing ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    SelectCombobox_default,
    {
      label: indT("ExpenseSheets_Field_ReimbursableExpense", "Reimbursable"),
      options: reimbursableExpenseOptions,
      value: String(normalizedReimbursableExpense),
      onChange: (value) => onReimbursableExpenseChange(normalizeExpenseLineReimbursableExpense(value)),
      placeholder: indT("ExpenseSheets_Field_ReimbursableExpense", "Reimbursable"),
      disabled,
      readOnly: disabled,
      allowTextInput: false,
      showSearchButton: false
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    ExpenseReadOnlyField_default,
    {
      label: indT("ExpenseSheets_Field_ReimbursableExpense", "Reimbursable"),
      value: reimbursableExpenseLabel
    }
  );
  if (isLoading) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "md:col-span-2 flex items-center gap-2 text-sm text-zinc-700", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { className: "ind-spinner size-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
      indT("Common_Loading", "Loading")
    ] });
  }
  if (errorMessage) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "md:col-span-2 text-danger text-sm", children: errorMessage });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "md:col-span-2 grid grid-cols-2 gap-3 md:gap-4", children: [
    projectField,
    reimbursableExpenseField
  ] });
};
var ExpenseTicketLinkedSheetLineSection_default = ExpenseTicketLinkedSheetLineSection;

// Web/wwwroot/react/src/pages/gastos/tickets/detail/ExpenseTicketDetailView.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var ExpenseTicketDetailView = ({ modal, preview, content }) => {
  const detailBody = /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      ExpenseTicketDetailHeaderForm_default,
      {
        header: content.header,
        statusLabel: content.statusLabel,
        gastoTypeLabel: content.gastoTypeLabel,
        totalAmountText: content.totalAmountText,
        transDateText: content.transDateText,
        ticketTimeText: content.ticketTimeText,
        isEditing: content.isEditing,
        gastoTypeOptions: content.gastoTypeOptions,
        draftDescription: content.draftDescription,
        descriptionInvalid: content.descriptionInvalid,
        descriptionInputRef: content.descriptionInputRef,
        draftGastoType: content.draftGastoType,
        gastoTypeInvalid: content.gastoTypeInvalid,
        gastoTypeInputRef: content.gastoTypeInputRef,
        draftCurrencyCode: content.draftCurrencyCode,
        currencyCodeInvalid: content.currencyCodeInvalid,
        currencyInputRef: content.currencyInputRef,
        draftTotalAmount: content.draftTotalAmount,
        totalAmountInvalid: content.totalAmountInvalid,
        totalAmountInputRef: content.totalAmountInputRef,
        draftExchangeRate: content.draftExchangeRate,
        exchangeRateInvalid: content.exchangeRateInvalid,
        exchangeRateInputRef: content.exchangeRateInputRef,
        exchangeRateInfoMessage: content.exchangeRateInfoMessage,
        draftAmountMST: content.draftAmountMST,
        amountMSTInvalid: content.amountMSTInvalid,
        amountMSTInputRef: content.amountMSTInputRef,
        localCurrencyCode: content.localCurrencyCode,
        draftTransDate: content.draftTransDate,
        draftTicketTime: content.draftTicketTime,
        draftUrlFile: content.draftUrlFile,
        draftFileName: content.draftFileName,
        onDraftDescriptionChange: content.onDraftDescriptionChange,
        onDraftGastoTypeChange: content.onDraftGastoTypeChange,
        onDraftCurrencyCodeChange: content.onDraftCurrencyCodeChange,
        onDraftTotalAmountChange: content.onDraftTotalAmountChange,
        onDraftExchangeRateChange: content.onDraftExchangeRateChange,
        onDraftExchangeRateCommit: content.onDraftExchangeRateCommit,
        onDraftAmountMSTChange: content.onDraftAmountMSTChange,
        onOpenFile: content.onOpenFile,
        onOpenExpenseSheet: content.onOpenExpenseSheet,
        hideOpenFileAction: content.showStickyPreview,
        children: content.linkedLine.visible ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          ExpenseTicketLinkedSheetLineSection_default,
          {
            projectId: content.linkedLine.projectId,
            reimbursableExpense: content.linkedLine.reimbursableExpense,
            isEditing: content.isEditing,
            isLoading: content.linkedLine.isLoading,
            disabled: content.linkedLine.disabled,
            errorMessage: content.linkedLine.errorMessage,
            onProjectIdChange: content.linkedLine.onProjectIdChange,
            onReimbursableExpenseChange: content.linkedLine.onReimbursableExpenseChange
          }
        ) : null
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      ExpenseTicketLinesList_default,
      {
        visibleLines: content.visibleLines,
        totalLinePages: content.totalLinePages,
        linePage: content.linePage,
        currencyCode: content.currencyCode,
        paginationLabels: content.paginationLabels,
        containerRef: content.containerRef,
        onLinePageChange: content.onLinePageChange,
        onOpenLine: content.onOpenLine
      }
    )
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
        onPointerEnd: preview.onPointerEnd
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "div",
      {
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-zinc-700",
        style: { display: content.isLoading ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { className: "ind-spinner size-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    content.errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-danger", children: content.errorMessage }) : null,
    !content.isLoading && !content.errorMessage && content.header ? content.showStickyPreview ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "grid min-w-0 max-w-full grid-cols-1 gap-y-2 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "min-w-0 max-w-full lg:col-start-2", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ExpenseTicketStickyPreview_default,
        {
          busy: content.previewBusy,
          error: content.previewError,
          imageUrl: content.previewImageUrl,
          imageAlt: content.previewAltText,
          fileName: content.previewFileName,
          onOpen: content.onOpenPreview
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "min-w-0 space-y-2 lg:col-start-1 lg:row-start-1", children: detailBody })
    ] }) : detailBody : null
  ] });
};
var ExpenseTicketDetailView_default = ExpenseTicketDetailView;

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketLinkedSheetLine.ts
var import_react8 = __toESM(require_react());
var selectSheet = (items, sheetId) => {
  const safeSheetId = safeText(sheetId).toUpperCase();
  if (!Array.isArray(items) || items.length < 1) {
    return null;
  }
  return items.find((entry) => safeText(entry?.HojaGastosId ?? entry?.hojaGastosId).toUpperCase() === safeSheetId) || items[0] || null;
};
var selectLine = (sheet, lineRecId) => {
  const safeLineRecId = safeText(lineRecId).toUpperCase();
  const sourceLines = sheet.Lines ?? sheet.lines ?? [];
  const mappedLines = Array.isArray(sourceLines) ? sourceLines.map((entry) => mapExpenseSheetLine(entry)) : [];
  return mappedLines.find((line) => safeText(line.lineRecId).toUpperCase() === safeLineRecId) || null;
};
var useExpenseTicketLinkedSheetLine = ({
  enabled,
  sheetId,
  lineRecId,
  onForbidden
}) => {
  const [line, setLine] = (0, import_react8.useState)(null);
  const [originalProjectId, setOriginalProjectId] = (0, import_react8.useState)("");
  const [draftProjectId, setDraftProjectId] = (0, import_react8.useState)("");
  const [originalReimbursableExpense, setOriginalReimbursableExpense] = (0, import_react8.useState)(DEFAULT_LINE_REIMBURSABLE_EXPENSE);
  const [draftReimbursableExpense, setDraftReimbursableExpense] = (0, import_react8.useState)(DEFAULT_LINE_REIMBURSABLE_EXPENSE);
  const [localCurrencyCode, setLocalCurrencyCode] = (0, import_react8.useState)("");
  const [isLoading, setIsLoading] = (0, import_react8.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react8.useState)("");
  const reloadLine = (0, import_react8.useCallback)(async () => {
    const safeSheetId = safeText(sheetId);
    const safeLineRecId = safeText(lineRecId);
    if (!enabled || !safeSheetId) {
      setLine(null);
      setOriginalProjectId("");
      setDraftProjectId("");
      setOriginalReimbursableExpense(DEFAULT_LINE_REIMBURSABLE_EXPENSE);
      setDraftReimbursableExpense(DEFAULT_LINE_REIMBURSABLE_EXPENSE);
      setLocalCurrencyCode("");
      setErrorMessage("");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetchExpenseSheetDetail(safeSheetId, {
        suppressPermissionModal: true
      });
      if (response?.Success === false) {
        setLine(null);
        setOriginalProjectId("");
        setDraftProjectId("");
        setOriginalReimbursableExpense(DEFAULT_LINE_REIMBURSABLE_EXPENSE);
        setDraftReimbursableExpense(DEFAULT_LINE_REIMBURSABLE_EXPENSE);
        setLocalCurrencyCode("");
        setErrorMessage(response?.Message || indT("ExpenseSheets_LoadError", "Could not load expense sheet detail."));
        return;
      }
      const sheet = selectSheet(response?.Items || [], safeSheetId);
      const sheetLocalCurrencyCode = safeText(sheet?.CurrencyCode ?? sheet?.currencyCode).toUpperCase();
      const selectedLine = sheet && safeLineRecId ? selectLine(sheet, safeLineRecId) : null;
      if (!safeLineRecId) {
        setLine(null);
        setOriginalProjectId("");
        setDraftProjectId("");
        setOriginalReimbursableExpense(DEFAULT_LINE_REIMBURSABLE_EXPENSE);
        setDraftReimbursableExpense(DEFAULT_LINE_REIMBURSABLE_EXPENSE);
        setLocalCurrencyCode(sheetLocalCurrencyCode);
        setErrorMessage("");
        return;
      }
      if (!selectedLine) {
        setLine(null);
        setOriginalProjectId("");
        setDraftProjectId("");
        setOriginalReimbursableExpense(DEFAULT_LINE_REIMBURSABLE_EXPENSE);
        setDraftReimbursableExpense(DEFAULT_LINE_REIMBURSABLE_EXPENSE);
        setLocalCurrencyCode(sheetLocalCurrencyCode);
        setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet was not found."));
        return;
      }
      const projectId = safeText(selectedLine.projId);
      const reimbursableExpense = normalizeExpenseLineReimbursableExpense(selectedLine.reimbursableExpense);
      setLine(selectedLine);
      setOriginalProjectId(projectId);
      setDraftProjectId(projectId);
      setOriginalReimbursableExpense(reimbursableExpense);
      setDraftReimbursableExpense(reimbursableExpense);
      setLocalCurrencyCode(sheetLocalCurrencyCode);
    } catch (error) {
      if (error instanceof ApiFetchError && error.status === 403) {
        onForbidden();
        return;
      }
      setLine(null);
      setOriginalProjectId("");
      setDraftProjectId("");
      setOriginalReimbursableExpense(DEFAULT_LINE_REIMBURSABLE_EXPENSE);
      setDraftReimbursableExpense(DEFAULT_LINE_REIMBURSABLE_EXPENSE);
      setLocalCurrencyCode("");
      setErrorMessage(error instanceof Error ? error.message : indT("ExpenseSheets_LoadError", "Could not load expense sheet detail."));
    } finally {
      setIsLoading(false);
    }
  }, [enabled, lineRecId, onForbidden, sheetId]);
  (0, import_react8.useEffect)(() => {
    void reloadLine();
  }, [reloadLine]);
  const projectIdChanged = (0, import_react8.useMemo)(
    () => safeText(draftProjectId) !== safeText(originalProjectId),
    [draftProjectId, originalProjectId]
  );
  const reimbursableExpenseChanged = (0, import_react8.useMemo)(
    () => draftReimbursableExpense !== originalReimbursableExpense,
    [draftReimbursableExpense, originalReimbursableExpense]
  );
  const resetDraftProjectId = (0, import_react8.useCallback)(() => {
    setDraftProjectId(originalProjectId);
  }, [originalProjectId]);
  const resetDraftReimbursableExpense = (0, import_react8.useCallback)(() => {
    setDraftReimbursableExpense(originalReimbursableExpense);
  }, [originalReimbursableExpense]);
  const acceptDraftProjectId = (0, import_react8.useCallback)(() => {
    const safeProjectId = safeText(draftProjectId);
    setOriginalProjectId(safeProjectId);
    setDraftProjectId(safeProjectId);
  }, [draftProjectId]);
  const acceptDraftReimbursableExpense = (0, import_react8.useCallback)(() => {
    const safeReimbursableExpense = normalizeExpenseLineReimbursableExpense(draftReimbursableExpense);
    setOriginalReimbursableExpense(safeReimbursableExpense);
    setDraftReimbursableExpense(safeReimbursableExpense);
  }, [draftReimbursableExpense]);
  return {
    line,
    localCurrencyCode,
    isLoading,
    errorMessage,
    originalProjectId,
    draftProjectId,
    projectIdChanged,
    originalReimbursableExpense,
    draftReimbursableExpense,
    reimbursableExpenseChanged,
    setDraftProjectId,
    setDraftReimbursableExpense,
    resetDraftProjectId,
    resetDraftReimbursableExpense,
    acceptDraftProjectId,
    acceptDraftReimbursableExpense,
    reloadLine
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketDetailBackNavigation.ts
var import_react9 = __toESM(require_react());
var useExpenseTicketDetailBackNavigation = ({
  fileId,
  detailOrigin,
  headerTransDate,
  contextLineRecId,
  ticketReturnContext,
  readCachedState,
  saveCachedState
}) => {
  const shouldReturnToTicketList = ticketReturnContext?.origin === "sheet-link" || !ticketReturnContext?.sheetId;
  const nativeBackUrl = (0, import_react9.useMemo)(() => {
    if (ticketReturnContext?.origin === "sheet-link" && ticketReturnContext.sheetId) {
      return buildExpenseTicketLinkUrl(ticketReturnContext.sheetId);
    }
    if (ticketReturnContext?.origin === "expense-line" && ticketReturnContext.sheetId) {
      return buildExpenseSheetLineDetailUrl(ticketReturnContext.sheetId, ticketReturnContext.sheetLineRecId || contextLineRecId);
    }
    if (ticketReturnContext?.sheetId) {
      return buildExpenseSheetDetailUrl(ticketReturnContext.sheetId);
    }
    if (detailOrigin === "ticket-create") {
      const ticketDate = toExpenseIsoDate(headerTransDate) || toExpenseIsoDate(/* @__PURE__ */ new Date());
      const query = new URLSearchParams({
        ticketFileId: fileId,
        ticketDate
      });
      return `/Gastos/Tickets?${query.toString()}`;
    }
    return "/Gastos/Tickets";
  }, [contextLineRecId, detailOrigin, fileId, headerTransDate, ticketReturnContext]);
  const rearmExpenseTicketsReturnState = (0, import_react9.useCallback)(() => {
    const cachedState = readCachedState();
    if (!cachedState) return;
    saveCachedState(cachedState);
  }, [readCachedState, saveCachedState]);
  (0, import_react9.useEffect)(() => {
    if (!fileId) return;
    const backButton = document.getElementById("globalBackBtn");
    if (!backButton) return;
    backButton.setAttribute("data-back-url", nativeBackUrl);
    return () => {
      backButton.removeAttribute("data-back-url");
    };
  }, [fileId, nativeBackUrl]);
  (0, import_react9.useEffect)(() => {
    if (!fileId) return;
    const handleNativeBack = (event) => {
      if (event?.state && event.state.indTrap === true) {
        return;
      }
      const executeBackNavigation = () => {
        if (shouldReturnToTicketList) {
          rearmExpenseTicketsReturnState();
        }
        window.__indBypassNavigationGuardOnce?.();
        window.location.replace(nativeBackUrl);
      };
      if (typeof window.__indRequestNavigation === "function") {
        window.__indRequestNavigation(executeBackNavigation);
        return;
      }
      executeBackNavigation();
    };
    window.addEventListener("popstate", handleNativeBack);
    return () => {
      window.removeEventListener("popstate", handleNativeBack);
    };
  }, [fileId, nativeBackUrl, rearmExpenseTicketsReturnState, shouldReturnToTicketList]);
};

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketDetailPreviewPanel.ts
var import_react10 = __toESM(require_react());
var useExpenseTicketDetailPreviewPanel = ({
  fileId,
  isEditing,
  draftUrlFile,
  headerUrlFile
}) => {
  const previewSourceUrl = (0, import_react10.useMemo)(() => safeText(isEditing ? draftUrlFile : headerUrlFile), [draftUrlFile, headerUrlFile, isEditing]);
  const showStickyPreview = (0, import_react10.useMemo)(() => hasExpenseTicketImagePreviewSource(previewSourceUrl), [previewSourceUrl]);
  const preview = useExpenseTicketImagePreview({
    fileId,
    sourceUrl: previewSourceUrl,
    enabled: showStickyPreview
  });
  return {
    showStickyPreview,
    ...preview
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketTopbarBackLock.ts
var import_react11 = __toESM(require_react());
var useExpenseTicketTopbarBackLock = ({
  locked,
  message
}) => {
  (0, import_react11.useEffect)(() => {
    const backButton = document.getElementById("globalBackBtn");
    if (!backButton) return;
    const previousDisabled = backButton.disabled;
    const previousAriaDisabled = backButton.getAttribute("aria-disabled");
    const previousTitle = backButton.getAttribute("title");
    const lockMessage = safeText(message);
    if (locked) {
      backButton.disabled = true;
      backButton.setAttribute("aria-disabled", "true");
      if (lockMessage) {
        backButton.setAttribute("title", lockMessage);
      }
    } else if (!previousDisabled) {
      backButton.disabled = false;
      backButton.setAttribute("aria-disabled", "false");
      if (previousTitle === null) {
        backButton.removeAttribute("title");
      }
    }
    return () => {
      backButton.disabled = previousDisabled;
      if (previousAriaDisabled === null) {
        backButton.removeAttribute("aria-disabled");
      } else {
        backButton.setAttribute("aria-disabled", previousAriaDisabled);
      }
      if (previousTitle === null) {
        backButton.removeAttribute("title");
      } else {
        backButton.setAttribute("title", previousTitle);
      }
    };
  }, [locked, message]);
};

// Web/wwwroot/react/src/pages/gastos/tickets/detail/ExpenseTicketDetailPage.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var LINES_PAGE_SIZE = 6;
var NewLineIcon = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "size-5", children: [
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 19c3.333 -2 5 -4 5 -6c0 -3 -1 -3 -2 -3s-2.032 1.085 -2 3c.034 2.048 1.658 2.877 2.5 4c1.5 2 2.5 2.5 3.5 1c.667 -1 1.167 -1.833 1.5 -2.5c1 2.333 2.333 3.5 4 3.5h2.5" }),
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2" }),
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16 7h4" })
] });
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
var resolveLinkedTicketBlockedMessage = (isPaid) => {
  if (isPaid) {
    return indT("ExpenseSheets_Detail_PaidReadOnly", "Las hojas de gasto pagadas son de solo lectura.");
  }
  return indT("ExpenseSheets_Detail_ReadOnlyByStatus", "No se puede editar esta hoja de gastos en el estado actual.");
};
var buildExpenseTicketDetailModalView = ({
  modal,
  modalConfirmText,
  modalCancelText,
  modalLoadingText,
  busy,
  modalError,
  status,
  handleModalButtonConfirm,
  closeConfirm
}) => ({
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
});
var buildExpenseTicketDetailPreviewView = ({
  previewOpen,
  previewBusy,
  previewError,
  previewImageUrl,
  previewAltText,
  previewScale,
  previewTranslate,
  previewSurfaceRef,
  closePreview,
  handlePreviewPointerDown,
  handlePreviewPointerMove,
  handlePreviewPointerEnd
}) => ({
  open: previewOpen,
  busy: previewBusy,
  error: previewError,
  imageUrl: previewImageUrl,
  imageAlt: previewAltText,
  scale: previewScale,
  translate: previewTranslate,
  surfaceRef: previewSurfaceRef,
  onClose: closePreview,
  onPointerDown: handlePreviewPointerDown,
  onPointerMove: handlePreviewPointerMove,
  onPointerEnd: handlePreviewPointerEnd
});
var buildExpenseTicketDetailContentView = ({
  isLoading,
  errorMessage,
  header,
  showStickyPreview,
  previewBusy,
  previewError,
  previewImageUrl,
  previewAltText,
  openFile,
  statusLabel,
  gastoTypeLabel,
  totalAmountText,
  transDateText,
  ticketTimeText,
  isEditing,
  gastoTypeOptions,
  draftDescription,
  descriptionInvalid,
  descriptionInputRef,
  draftGastoType,
  gastoTypeInvalid,
  gastoTypeInputRef,
  draftCurrencyCode,
  currencyCodeInvalid,
  currencyInputRef,
  draftTotalAmount,
  totalAmountInvalid,
  totalAmountInputRef,
  draftAmountMST,
  amountMSTInvalid,
  amountMSTInputRef,
  draftExchangeRate,
  exchangeRateInvalid,
  exchangeRateInputRef,
  exchangeRateInfoMessage,
  localCurrencyCode,
  draftTransDate,
  draftTicketTime,
  draftUrlFile,
  draftFileName,
  setDraftDescription,
  setDraftGastoType,
  setDraftCurrencyCode,
  setDraftTotalAmount,
  setDraftAmountMST,
  setDraftExchangeRate,
  commitDraftExchangeRate,
  isFromSheetLink,
  linkedLine,
  handleOpenExpenseSheet,
  visibleLines,
  totalLinePages,
  linePage,
  safeCurrencyCode,
  paginationLabels,
  lineContainerRef,
  setLinePage,
  openLineDetail
}) => ({
  isLoading,
  errorMessage,
  header,
  showStickyPreview,
  previewBusy,
  previewError,
  previewImageUrl,
  previewFileName: previewAltText,
  previewAltText,
  onOpenPreview: openFile,
  statusLabel,
  gastoTypeLabel,
  totalAmountText,
  transDateText,
  ticketTimeText,
  isEditing,
  gastoTypeOptions,
  draftDescription,
  descriptionInvalid,
  descriptionInputRef,
  draftGastoType,
  gastoTypeInvalid,
  gastoTypeInputRef,
  draftCurrencyCode,
  currencyCodeInvalid,
  currencyInputRef,
  draftTotalAmount,
  totalAmountInvalid,
  totalAmountInputRef,
  draftAmountMST,
  amountMSTInvalid,
  amountMSTInputRef,
  draftExchangeRate,
  exchangeRateInvalid,
  exchangeRateInputRef,
  exchangeRateInfoMessage,
  localCurrencyCode,
  draftTransDate,
  draftTicketTime,
  draftUrlFile,
  draftFileName,
  onDraftDescriptionChange: setDraftDescription,
  onDraftGastoTypeChange: setDraftGastoType,
  onDraftCurrencyCodeChange: setDraftCurrencyCode,
  onDraftTotalAmountChange: setDraftTotalAmount,
  onDraftAmountMSTChange: setDraftAmountMST,
  onDraftExchangeRateChange: setDraftExchangeRate,
  onDraftExchangeRateCommit: commitDraftExchangeRate,
  onOpenFile: openFile,
  onOpenExpenseSheet: isFromSheetLink ? void 0 : handleOpenExpenseSheet,
  linkedLine,
  visibleLines,
  totalLinePages,
  linePage,
  currencyCode: safeCurrencyCode,
  paginationLabels,
  containerRef: lineContainerRef,
  onLinePageChange: setLinePage,
  onOpenLine: openLineDetail
});
var buildExpenseTicketDetailPageViewModel = ({
  modalArgs,
  previewArgs,
  contentArgs
}) => ({
  modal: buildExpenseTicketDetailModalView(modalArgs),
  preview: buildExpenseTicketDetailPreviewView(previewArgs),
  content: buildExpenseTicketDetailContentView(contentArgs)
});
var useExpenseTicketDetailNavigationState = ({
  fileId,
  detailOrigin,
  headerTransDate,
  contextLineRecId,
  ticketReturnContext
}) => {
  const { readCachedState, saveCachedState, markResetFiltersReturn, clearCachedState } = useExpenseTicketsFilterCache();
  useExpenseTicketDetailBackNavigation({
    fileId,
    detailOrigin,
    headerTransDate,
    contextLineRecId,
    ticketReturnContext,
    readCachedState,
    saveCachedState
  });
  return {
    markResetFiltersReturn,
    clearCachedState
  };
};
var useExpenseTicketDetailAutoEdit = ({
  autoEditMode,
  canAutoEditInContext,
  isLoading,
  header,
  handleEnableEdit,
  canAttemptAutoEdit
}) => {
  const autoEditAttemptedRef = (0, import_react12.useRef)(false);
  (0, import_react12.useEffect)(() => {
    if (!autoEditMode || !canAutoEditInContext || autoEditAttemptedRef.current) return;
    if (isLoading || !header || !canAttemptAutoEdit) return;
    autoEditAttemptedRef.current = true;
    handleEnableEdit();
  }, [autoEditMode, canAttemptAutoEdit, canAutoEditInContext, handleEnableEdit, header, isLoading]);
};
var useExpenseTicketDetailPermissionState = () => {
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
  const isManagingOtherUser = isManagingOtherExpenseUser({
    canManageOtherUsers,
    currentAxUserId,
    selectedManagedUserId
  });
  return {
    hasAccess,
    canEditTicket: canEditTicketByModule && !isManagingOtherUser,
    canDeleteTicket: canDeleteTicketByModule && !isManagingOtherUser,
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    isManagingOtherUser,
    managementBootstrapReady
  };
};
var useExpenseTicketDetailPageViewModel = () => {
  const fileId = safeText(window.__EXPENSE_TICKET_FILE_ID__);
  const lineContainerRef = (0, import_react12.useRef)(null);
  const {
    autoEditMode,
    detailOrigin,
    contextSheetId,
    contextLineRecId,
    isFromExpenseSheetCreate,
    isFromExpenseLine,
    isFromSheetLink,
    isLinkFailureRepair,
    ticketReturnContext
  } = useExpenseTicketDetailRouteContext();
  const canEditFromSheetLinkFailure = isLinkFailureRepair;
  const saveStrategy = isLinkFailureRepair ? "ticket-only" : "ticket-and-sheet-line";
  const {
    hasAccess,
    canEditTicket,
    canDeleteTicket,
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    managementBootstrapReady
  } = useExpenseTicketDetailPermissionState();
  const gastoTypeOptions = (0, import_react12.useMemo)(() => getExpenseGastoTypeOptions(), []);
  const gastoTypeLabelMap = (0, import_react12.useMemo)(() => {
    const map = /* @__PURE__ */ new Map();
    for (const option of gastoTypeOptions) {
      map.set(String(option.value), option.text);
    }
    return map;
  }, [gastoTypeOptions]);
  const { header, lines, isLoading, errorMessage, reloadDetail } = useExpenseTicketDetailState({
    hasAccess,
    fileId,
    onForbidden: showPermissionModal
  });
  const linkedExpenseSheetId = (0, import_react12.useMemo)(
    () => safeText(ticketReturnContext?.sheetId || contextSheetId || header?.hojaGastosIdDisplay),
    [contextSheetId, header?.hojaGastosIdDisplay, ticketReturnContext]
  );
  const linkedSheetLine = useExpenseTicketLinkedSheetLine({
    enabled: !!linkedExpenseSheetId,
    sheetId: linkedExpenseSheetId,
    lineRecId: contextLineRecId,
    onForbidden: showPermissionModal
  });
  const {
    linkSheetLocked,
    linkSheetBlockedMessage,
    linkSheetCheckBusy
  } = useExpenseTicketLinkSheetGate({
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
  const [sheetSyncBlocked, setSheetSyncBlocked] = (0, import_react12.useState)(() => !!readExpenseTicketSheetSyncState(fileId));
  const [sheetSyncBlockedMessage, setSheetSyncBlockedMessage] = (0, import_react12.useState)(
    () => safeText(readExpenseTicketSheetSyncState(fileId)?.message)
  );
  const exchangeRateRequestIdRef = (0, import_react12.useRef)(0);
  const [exchangeRateInfoMessage, setExchangeRateInfoMessage] = (0, import_react12.useState)("");
  const [contextDefaultCurrencyCode, setContextDefaultCurrencyCode] = (0, import_react12.useState)("");
  (0, import_react12.useEffect)(() => {
    let isCancelled = false;
    const controller = new AbortController();
    const loadDefaultCurrencyCode = async () => {
      const defaultCurrencyCode = normalizeExpenseLineCurrencyCode(
        await getExpenseSheetDefaultCurrencyCode({
          suppressPermissionModal: true,
          signal: controller.signal
        })
      );
      if (!isCancelled) {
        setContextDefaultCurrencyCode(defaultCurrencyCode);
      }
    };
    void loadDefaultCurrencyCode();
    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, []);
  (0, import_react12.useEffect)(() => {
    const syncState = readExpenseTicketSheetSyncState(fileId);
    setSheetSyncBlocked(!!syncState);
    setSheetSyncBlockedMessage(safeText(syncState?.message));
  }, [fileId]);
  const pendingFirstLink = detailOrigin === "sheet-create" && !!safeText(ticketReturnContext?.sheetId || contextSheetId) && !safeText(header?.hojaGastosIdDisplay);
  const sheetWorkflowBlockMessage = pendingFirstLink ? indT("ExpenseTickets_SheetSync_PendingSaveRequired", "Save the ticket before leaving this flow.") : sheetSyncBlockedMessage || indT(
    "ExpenseTickets_SheetSync_RetryRequired",
    "Ticket data changed, but we could not sync the expense line. Save again before leaving."
  );
  const { markResetFiltersReturn, clearCachedState } = useExpenseTicketDetailNavigationState({
    fileId,
    detailOrigin,
    headerTransDate: header?.transDate,
    contextLineRecId,
    ticketReturnContext
  });
  const canEditLinkedTicket = !linkedExpenseSheetId || !linkSheetCheckBusy && !linkSheetLocked;
  const allowAssignedDraftEdit = isFromExpenseSheetCreate || !!linkedExpenseSheetId && canEditLinkedTicket;
  const ticketLocalCurrencyCode = (0, import_react12.useMemo)(
    () => normalizeExpenseLineCurrencyCode(linkedSheetLine.localCurrencyCode || contextDefaultCurrencyCode),
    [contextDefaultCurrencyCode, linkedSheetLine.localCurrencyCode]
  );
  const {
    busy,
    status,
    isEditing,
    modalError,
    linePage,
    draftDescription,
    descriptionInvalid,
    descriptionInputRef,
    draftGastoType,
    gastoTypeInvalid,
    gastoTypeInputRef,
    draftCurrencyCode,
    currencyCodeInvalid,
    currencyInputRef,
    draftTotalAmount,
    totalAmountInvalid,
    totalAmountInputRef,
    draftAmountMST,
    amountMSTInvalid,
    amountMSTInputRef,
    draftExchangeRate,
    exchangeRateInvalid,
    exchangeRateInputRef,
    localCurrencyCode,
    draftTransDate,
    draftTicketTime,
    draftComentario,
    draftUrlFile,
    draftFileName,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setLinePage,
    setDraftDescription,
    setDraftGastoType,
    setDraftCurrencyCode,
    setDraftTotalAmount,
    setDraftAmountMST,
    setDraftExchangeRate,
    commitDraftExchangeRate,
    canOpenSaveConfirm,
    handleEnableEdit,
    handleCancelEdit
  } = useExpenseTicketDetailEditor({
    header,
    linkedExpenseLine: linkedSheetLine.line,
    localCurrencyCode: ticketLocalCurrencyCode,
    lineCount: lines.length,
    pageSize: LINES_PAGE_SIZE,
    canEditTicket: canEditTicket && canEditLinkedTicket,
    isLoading,
    allowAssignedDraftEdit,
    isSheetLinkReadOnly: isFromSheetLink && !canEditFromSheetLinkFailure,
    onForbidden: showPermissionModal
  });
  const handleTicketCurrencyCodeChange = (0, import_react12.useCallback)(
    (value) => {
      const nextCurrencyCode = normalizeExpenseLineCurrencyCode(value);
      setDraftCurrencyCode(nextCurrencyCode);
      setExchangeRateInfoMessage("");
      if (!nextCurrencyCode || !localCurrencyCode) {
        return;
      }
      if (nextCurrencyCode === normalizeExpenseLineCurrencyCode(localCurrencyCode)) {
        exchangeRateRequestIdRef.current += 1;
        return;
      }
      const requestId = exchangeRateRequestIdRef.current + 1;
      exchangeRateRequestIdRef.current = requestId;
      void (async () => {
        try {
          const officialExchangeRate = await fetchExpenseOfficialExchangeRate({
            localCurrencyCode,
            expenseCurrencyCode: nextCurrencyCode,
            date: draftTransDate || header?.ticketDate || header?.transDate
          });
          if (requestId !== exchangeRateRequestIdRef.current || !officialExchangeRate) {
            return;
          }
          commitDraftExchangeRate(formatExpenseExchangeRateInputValue(officialExchangeRate.exchangeRate), nextCurrencyCode);
          setExchangeRateInfoMessage(
            buildExpenseExchangeRateInfoMessage({
              rawRate: officialExchangeRate.rawRate,
              date: officialExchangeRate.date,
              source: officialExchangeRate.source
            })
          );
        } catch (error) {
          if (requestId !== exchangeRateRequestIdRef.current) {
            return;
          }
          const message = error instanceof Error && safeText(error.message) ? safeText(error.message) : indT("ExpenseSheets_ExchangeRate_Unavailable", "No se pudo obtener el tipo de cambio.");
          setExchangeRateInfoMessage(message);
        }
      })();
    },
    [
      commitDraftExchangeRate,
      draftTransDate,
      header?.ticketDate,
      header?.transDate,
      localCurrencyCode,
      setDraftCurrencyCode
    ]
  );
  const handleTicketExchangeRateChange = (0, import_react12.useCallback)(
    (value) => {
      setExchangeRateInfoMessage("");
      setDraftExchangeRate(value);
    },
    [setDraftExchangeRate]
  );
  const handleTicketExchangeRateCommit = (0, import_react12.useCallback)(
    (value) => {
      setExchangeRateInfoMessage("");
      commitDraftExchangeRate(value);
    },
    [commitDraftExchangeRate]
  );
  const handleTicketAmountMSTChange = (0, import_react12.useCallback)(
    (value) => {
      setExchangeRateInfoMessage("");
      setDraftAmountMST(value);
    },
    [setDraftAmountMST]
  );
  const handleEnableEditInContext = (0, import_react12.useCallback)(() => {
    if (linkSheetCheckBusy) {
      return;
    }
    if (linkedExpenseSheetId && linkSheetLocked) {
      const message = safeText(linkSheetBlockedMessage) || resolveLinkedTicketBlockedMessage(false);
      setModalError(message);
      setStatus(message);
      return;
    }
    setExchangeRateInfoMessage("");
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
  const handleCancelEditInContext = (0, import_react12.useCallback)(() => {
    setExchangeRateInfoMessage("");
    handleCancelEdit();
    linkedSheetLine.resetDraftProjectId();
    linkedSheetLine.resetDraftReimbursableExpense();
  }, [handleCancelEdit, linkedSheetLine.resetDraftProjectId, linkedSheetLine.resetDraftReimbursableExpense]);
  const { paginationLabels, previewAltText, statusLabel, gastoTypeLabel, totalAmountText, transDateText, ticketTimeText } = useExpenseTicketDetailDisplay({
    header,
    draftGastoType,
    draftCurrencyCode,
    draftTotalAmount,
    draftTransDate,
    draftTicketTime,
    draftFileName,
    isEditing,
    gastoTypeLabelMap
  });
  const {
    showStickyPreview,
    previewOpen,
    previewBusy,
    previewError,
    previewImageUrl,
    previewScale,
    previewTranslate,
    previewSurfaceRef,
    openPreview,
    closePreview,
    handlePreviewPointerDown,
    handlePreviewPointerMove,
    handlePreviewPointerEnd
  } = useExpenseTicketDetailPreviewPanel({
    fileId,
    isEditing,
    draftUrlFile,
    headerUrlFile: header?.urlFile
  });
  const visibleLines = (0, import_react12.useMemo)(() => pagedSlice(lines, linePage, LINES_PAGE_SIZE), [linePage, lines]);
  const totalLinePages = Math.ceil((lines.length || 0) / LINES_PAGE_SIZE);
  useExpenseTicketDetailAutoEdit({
    autoEditMode,
    canAutoEditInContext: !isFromSheetLink || canEditFromSheetLinkFailure,
    isLoading,
    header,
    handleEnableEdit: handleEnableEditInContext,
    canAttemptAutoEdit: !linkSheetCheckBusy
  });
  const { handleUpdate, handlePersistHeaderDraft, handleDelete } = useExpenseTicketDetailMutations({
    busy,
    isEditing,
    canEditTicket: canEditTicket && canEditLinkedTicket,
    canDeleteTicket: canDeleteTicket && canEditLinkedTicket,
    fileId,
    draftDescription,
    draftGastoType,
    draftCurrencyCode,
    draftTotalAmount,
    draftAmountMST,
    draftExchangeRate,
    localCurrencyCode,
    draftTransDate,
    draftTicketTime,
    draftComentario,
    draftUrlFile,
    draftFileName,
    saveStrategy,
    linkedExpenseSheetId,
    linkedExpenseLineRecId: isFromExpenseLine ? contextLineRecId : "",
    linkedExpenseLineProjectId: linkedSheetLine.draftProjectId,
    linkedExpenseLineProjectIdChanged: isFromExpenseLine && linkedSheetLine.projectIdChanged,
    linkedExpenseLineReimbursableExpense: linkedSheetLine.draftReimbursableExpense,
    linkedExpenseLineReimbursableExpenseChanged: isFromExpenseLine && linkedSheetLine.reimbursableExpenseChanged,
    deleteLinkedExpenseLineContext: isFromExpenseLine && linkedExpenseSheetId && contextLineRecId ? {
      sheetId: linkedExpenseSheetId,
      lineRecId: contextLineRecId
    } : null,
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
      linkedSheetLine.acceptDraftProjectId();
      linkedSheetLine.acceptDraftReimbursableExpense();
    },
    setModalError,
    setBusy,
    setStatus,
    setIsEditing
  });
  const { modal, openConfirm, closeConfirm, modalLoadingText, modalCancelText, modalConfirmText, handleModalButtonConfirm } = useExpenseTicketDetailConfirmState({
    busy,
    modalError,
    setModalError,
    setStatus
  });
  (0, import_react12.useEffect)(() => {
    if (!sheetSyncBlocked || busy) return;
    if (!sheetWorkflowBlockMessage) return;
    if (status === sheetWorkflowBlockMessage) return;
    setStatus(sheetWorkflowBlockMessage);
  }, [busy, setStatus, sheetWorkflowBlockMessage, sheetSyncBlocked, status]);
  const isAssignedTicket = header?.status === 1;
  const isContextLocked = isAssignedTicket && !allowAssignedDraftEdit || !!linkedExpenseSheetId && linkSheetLocked;
  const canEditTicketInContext = canEditTicket && canEditLinkedTicket && (!isFromSheetLink || canEditFromSheetLinkFailure);
  const canCreateTicketLineInContext = canEditTicketInContext && !isFromSheetLink && !isContextLocked && !sheetSyncBlocked;
  const canDeleteTicketInContext = canDeleteTicket && canEditLinkedTicket && !isFromSheetLink;
  const canDeleteUnlinkedTicketAfterSyncError = pendingFirstLink && sheetSyncBlocked && canDeleteTicketInContext && !!safeText(fileId) && !!header && !safeText(header.hojaGastosIdDisplay);
  const shouldHardBlockWorkflowExit = pendingFirstLink || sheetSyncBlocked && isEditing;
  const hasNavigationGuard = busy || isEditing || shouldHardBlockWorkflowExit;
  const navigationGuardMessage = shouldHardBlockWorkflowExit ? sheetWorkflowBlockMessage : void 0;
  (0, import_react12.useEffect)(() => {
    if (!hasNavigationGuard) {
      clearExpenseNavigationGuard();
      return;
    }
    setExpenseNavigationGuard({
      active: true,
      message: navigationGuardMessage,
      block: shouldHardBlockWorkflowExit
    });
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [hasNavigationGuard, navigationGuardMessage, shouldHardBlockWorkflowExit]);
  useExpenseTicketTopbarBackLock({
    locked: shouldHardBlockWorkflowExit,
    message: sheetWorkflowBlockMessage
  });
  const ticketTopbarActionMode = pendingFirstLink && isEditing ? canDeleteUnlinkedTicketAfterSyncError ? "save_delete" : "save_only" : !canEditTicketInContext && !canDeleteTicketInContext ? "view_only" : "default";
  useExpenseTicketDetailTopbarActions({
    busy,
    modalOpen: modal.open,
    isEditing,
    isLocked: isContextLocked,
    isDeleteLocked: canDeleteUnlinkedTicketAfterSyncError ? false : void 0,
    actionMode: ticketTopbarActionMode,
    permissionsReady: managementBootstrapReady,
    canEditTicket: canEditTicketInContext,
    canDeleteTicket: canDeleteTicketInContext,
    fileId,
    setModalError,
    handleEnableEdit: handleEnableEditInContext,
    handleCancelEdit: handleCancelEditInContext,
    canOpenSaveConfirm,
    handleUpdate,
    handleDelete,
    onSaveSuccess: () => {
      if ((isFromExpenseSheetCreate || isFromExpenseLine) && linkedExpenseSheetId) {
        clearCachedState();
        navigateToExpenseUrl(buildExpenseSheetDetailUrl(linkedExpenseSheetId), {
          bypassGuardOnce: true
        });
        return;
      }
      void reloadDetail();
    },
    onDeleteSuccess: () => {
      if (ticketReturnContext?.sheetId) {
        clearCachedState();
        navigateToExpenseUrl(buildExpenseSheetDetailUrl(ticketReturnContext.sheetId), {
          bypassGuardOnce: true
        });
        return;
      }
      markResetFiltersReturn();
      navigateToExpenseUrl("/Gastos/Tickets", {
        bypassGuardOnce: true
      });
    },
    openConfirm,
    closeConfirm
  });
  const { openCreateLineDetail, openLineDetail, resolveClickableCard, openFile, handleOpenExpenseSheet } = useExpenseTicketDetailInteractions({
    busy,
    fileId,
    contextSheetId: linkedExpenseSheetId,
    isFromSheetLink,
    headerExpenseSheetId: safeText(header?.hojaGastosIdDisplay),
    isEditing,
    canOpenSaveConfirm,
    handlePersistHeaderDraft,
    bypassWorkflowGuard: shouldHardBlockWorkflowExit,
    lineContainerRef,
    openPreview,
    ticketReturnContext
  });
  useTimelineCardEffects({
    containerRef: lineContainerRef,
    errorMessage,
    items: visibleLines,
    resolveClickableCard
  });
  const detailView = buildExpenseTicketDetailPageViewModel({
    modalArgs: {
      modal,
      modalConfirmText,
      modalCancelText,
      modalLoadingText,
      busy,
      modalError,
      status,
      handleModalButtonConfirm,
      closeConfirm
    },
    previewArgs: {
      previewOpen,
      previewBusy,
      previewError,
      previewImageUrl,
      previewAltText,
      previewScale,
      previewTranslate,
      previewSurfaceRef,
      closePreview,
      handlePreviewPointerDown,
      handlePreviewPointerMove,
      handlePreviewPointerEnd
    },
    contentArgs: {
      isLoading,
      errorMessage,
      header,
      showStickyPreview,
      previewBusy,
      previewError,
      previewImageUrl,
      previewAltText,
      openFile,
      statusLabel,
      gastoTypeLabel,
      totalAmountText,
      transDateText,
      ticketTimeText,
      isEditing,
      gastoTypeOptions,
      draftDescription,
      descriptionInvalid,
      descriptionInputRef,
      draftGastoType,
      gastoTypeInvalid,
      gastoTypeInputRef,
      draftCurrencyCode,
      currencyCodeInvalid,
      currencyInputRef,
      draftTotalAmount,
      totalAmountInvalid,
      totalAmountInputRef,
      draftAmountMST,
      amountMSTInvalid,
      amountMSTInputRef,
      draftExchangeRate,
      exchangeRateInvalid,
      exchangeRateInputRef,
      exchangeRateInfoMessage,
      localCurrencyCode,
      draftTransDate,
      draftTicketTime,
      draftUrlFile,
      draftFileName,
      setDraftDescription,
      setDraftGastoType,
      setDraftCurrencyCode: handleTicketCurrencyCodeChange,
      setDraftTotalAmount,
      setDraftAmountMST: handleTicketAmountMSTChange,
      setDraftExchangeRate: handleTicketExchangeRateChange,
      commitDraftExchangeRate: handleTicketExchangeRateCommit,
      isFromSheetLink,
      linkedLine: {
        visible: isFromExpenseLine,
        projectId: linkedSheetLine.draftProjectId,
        reimbursableExpense: linkedSheetLine.draftReimbursableExpense,
        isLoading: linkedSheetLine.isLoading,
        errorMessage: linkedSheetLine.errorMessage,
        disabled: busy || isContextLocked || linkedSheetLine.isLoading,
        onProjectIdChange: linkedSheetLine.setDraftProjectId,
        onReimbursableExpenseChange: linkedSheetLine.setDraftReimbursableExpense
      },
      handleOpenExpenseSheet,
      visibleLines,
      totalLinePages,
      linePage,
      safeCurrencyCode: isEditing ? draftCurrencyCode : safeText(header?.currencyCode),
      paginationLabels,
      lineContainerRef,
      setLinePage,
      openLineDetail
    }
  });
  return {
    ...detailView,
    canShowCreateLineFab: canCreateTicketLineInContext && !isLoading && !errorMessage && !!safeText(fileId) && !!header,
    isCreateLineFabDisabled: busy || !header,
    openCreateLineDetail
  };
};
var ExpenseTicketDetailPageContent = () => {
  const detailView = useExpenseTicketDetailPageViewModel();
  const fabMenuItems = (0, import_react12.useMemo)(
    () => [
      {
        id: "new-ticket-line",
        label: indT("ExpenseSheets_Fab_NewLine", "Nueva Linea"),
        icon: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(NewLineIcon, {}),
        onClick: () => {
          void detailView.openCreateLineDetail();
        },
        disabled: detailView.isCreateLineFabDisabled
      }
    ],
    [detailView]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ExpenseTicketDetailView_default, { modal: detailView.modal, preview: detailView.preview, content: detailView.content }),
    detailView.canShowCreateLineFab ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      FloatingActionButton_default,
      {
        ariaLabel: indT("ExpenseSheets_Fab_Actions", "Acciones rapidas"),
        size: 76,
        right: 16,
        bottom: 24,
        menuAriaLabel: indT("ExpenseSheets_Fab_Actions", "Acciones rapidas"),
        menuItems: fabMenuItems
      }
    ) : null
  ] });
};
var ExpenseTicketDetailPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(VisitasPageProviders_default, { enableExpenseManagement: true, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ExpenseTicketDetailPageContent, {}) });
};
var mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-ticket-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ExpenseTicketDetailPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseTicketDetailPage_default = ExpenseTicketDetailPage;
export {
  ExpenseTicketDetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFJvdXRlQ29udGV4dC50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5LnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRDdXJyZW5jeVNldHRsZW1lbnRGaWVsZHMudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVTZWN0aW9uLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL0V4cGVuc2VUaWNrZXREZXRhaWxWaWV3LnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldFRvcGJhckJhY2tMb2NrLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24sIHsgdHlwZSBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCB7IHVzZUF1dGhDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XHJcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xyXG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XHJcbmltcG9ydCB7IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoLCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLCBuYXZpZ2F0ZVRvRXhwZW5zZVVybCwgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBpc01hbmFnaW5nT3RoZXJFeHBlbnNlVXNlciB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTWFuYWdlZFVzZXJTY29wZS50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlR2FzdG9UeXBlT3B0aW9ucyB9IGZyb20gXCIuLi8uLi9jb25zdGFudHMvZXhwZW5zZUdhc3RvVHlwZUNhdGFsb2cudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB7IGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHJlYWRFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VMaW5lQ3VycmVuY3lDb2RlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VMaW5lQ3VycmVuY3kudHNcIjtcclxuaW1wb3J0IHtcclxuICBidWlsZEV4cGVuc2VFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZSxcclxuICBmZXRjaEV4cGVuc2VPZmZpY2lhbEV4Y2hhbmdlUmF0ZSxcclxuICBmb3JtYXRFeHBlbnNlRXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZSxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUV4Y2hhbmdlUmF0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZSB9IGZyb20gXCIuLi91c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUudHNcIjtcclxuaW1wb3J0IHtcbiAgdXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9ucyxcbiAgdHlwZSBFeHBlbnNlVGlja2V0U2F2ZVN0cmF0ZWd5LFxufSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3IgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXkudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3IGZyb20gXCIuL0V4cGVuc2VUaWNrZXREZXRhaWxWaWV3LnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZSB9IGZyb20gXCIuLi91c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb24gfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb24udHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWwgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0VG9wYmFyQmFja0xvY2sgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0VG9wYmFyQmFja0xvY2sudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciwgRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcblxyXG5jb25zdCBMSU5FU19QQUdFX1NJWkUgPSA2O1xyXG5cclxuY29uc3QgTmV3TGluZUljb24gPSAoKSA9PiAoXHJcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD17MS41fSBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzc05hbWU9XCJzaXplLTVcIj5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTMgMTljMy4zMzMgLTIgNSAtNCA1IC02YzAgLTMgLTEgLTMgLTIgLTNzLTIuMDMyIDEuMDg1IC0yIDNjLjAzNCAyLjA0OCAxLjY1OCAyLjg3NyAyLjUgNGMxLjUgMiAyLjUgMi41IDMuNSAxYy42NjcgLTEgMS4xNjcgLTEuODMzIDEuNSAtMi41YzEgMi4zMzMgMi4zMzMgMy41IDQgMy41aDIuNVwiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0yMCAxN3YtMTJjMCAtMS4xMjEgLS44NzkgLTIgLTIgLTJzLTIgLjg3OSAtMiAydjEybDIgMmwyIC0yXCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE2IDdoNFwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG5jb25zdCBwYWdlZFNsaWNlID0gPFQsPihpdGVtczogVFtdLCBwYWdlOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIpOiBUW10gPT4ge1xyXG4gIGlmICghaXRlbXMubGVuZ3RoKSByZXR1cm4gW107XHJcbiAgY29uc3Qgc2FmZVBhZ2UgPSBNYXRoLm1heCgxLCBwYWdlKTtcclxuICBjb25zdCBzdGFydCA9IChzYWZlUGFnZSAtIDEpICogcGFnZVNpemU7XHJcbiAgcmV0dXJuIGl0ZW1zLnNsaWNlKHN0YXJ0LCBzdGFydCArIHBhZ2VTaXplKTtcclxufTtcclxuXHJcbi8vIEluaXRpYWxpemVzIGF1dGggc2VlZCBmb3IgZXhwZW5zZSBBUEkgY2FsbHMgYmVmb3JlIGlzbGFuZCBlZmZlY3RzIHJ1bi5cclxuY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XHJcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgoe1xyXG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXHJcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcclxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVMaW5rZWRUaWNrZXRCbG9ja2VkTWVzc2FnZSA9IChpc1BhaWQ6IGJvb2xlYW4pOiBzdHJpbmcgPT4ge1xyXG4gIGlmIChpc1BhaWQpIHtcclxuICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUGFpZFJlYWRPbmx5XCIsIFwiTGFzIGhvamFzIGRlIGdhc3RvIHBhZ2FkYXMgc29uIGRlIHNvbG8gbGVjdHVyYS5cIik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1JlYWRPbmx5QnlTdGF0dXNcIiwgXCJObyBzZSBwdWVkZSBlZGl0YXIgZXN0YSBob2phIGRlIGdhc3RvcyBlbiBlbCBlc3RhZG8gYWN0dWFsLlwiKTtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbE1vZGFsVmlldyA9ICh7XHJcbiAgbW9kYWwsXHJcbiAgbW9kYWxDb25maXJtVGV4dCxcclxuICBtb2RhbENhbmNlbFRleHQsXHJcbiAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICBidXN5LFxyXG4gIG1vZGFsRXJyb3IsXHJcbiAgc3RhdHVzLFxyXG4gIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcclxuICBjbG9zZUNvbmZpcm0sXHJcbn06IHtcclxuICBtb2RhbDoge1xyXG4gICAgb3BlbjogYm9vbGVhbjtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBzaG93Q2FuY2VsOiBib29sZWFuO1xyXG4gICAgc2hvd0NvbmZpcm06IGJvb2xlYW47XHJcbiAgfTtcclxuICBtb2RhbENvbmZpcm1UZXh0OiBzdHJpbmc7XHJcbiAgbW9kYWxDYW5jZWxUZXh0OiBzdHJpbmc7XHJcbiAgbW9kYWxMb2FkaW5nVGV4dDogc3RyaW5nO1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxFcnJvcjogc3RyaW5nO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybTogKCkgPT4gdm9pZDtcclxuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbn0pID0+ICh7XHJcbiAgb3BlbjogbW9kYWwub3BlbixcclxuICB0aXRsZTogbW9kYWwudGl0bGUsXHJcbiAgbWVzc2FnZTogbW9kYWwubWVzc2FnZSxcclxuICBjb25maXJtVGV4dDogbW9kYWxDb25maXJtVGV4dCxcclxuICBjYW5jZWxUZXh0OiBtb2RhbENhbmNlbFRleHQsXHJcbiAgbG9hZGluZ1RleHQ6IG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgc2hvd0NhbmNlbDogbW9kYWwuc2hvd0NhbmNlbCxcclxuICBzaG93Q29uZmlybTogbW9kYWwuc2hvd0NvbmZpcm0sXHJcbiAgYnVzeSxcclxuICBlcnJvcjogbW9kYWxFcnJvcixcclxuICBzdGF0dXMsXHJcbiAgb25Db25maXJtOiBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgb25DYW5jZWw6IGNsb3NlQ29uZmlybSxcclxufSk7XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3VmlldyA9ICh7XHJcbiAgcHJldmlld09wZW4sXHJcbiAgcHJldmlld0J1c3ksXHJcbiAgcHJldmlld0Vycm9yLFxyXG4gIHByZXZpZXdJbWFnZVVybCxcclxuICBwcmV2aWV3QWx0VGV4dCxcclxuICBwcmV2aWV3U2NhbGUsXHJcbiAgcHJldmlld1RyYW5zbGF0ZSxcclxuICBwcmV2aWV3U3VyZmFjZVJlZixcclxuICBjbG9zZVByZXZpZXcsXHJcbiAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcclxuICBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxufToge1xyXG4gIHByZXZpZXdPcGVuOiBib29sZWFuO1xyXG4gIHByZXZpZXdCdXN5OiBib29sZWFuO1xyXG4gIHByZXZpZXdFcnJvcjogc3RyaW5nO1xyXG4gIHByZXZpZXdJbWFnZVVybDogc3RyaW5nO1xyXG4gIHByZXZpZXdBbHRUZXh0OiBzdHJpbmc7XHJcbiAgcHJldmlld1NjYWxlOiBudW1iZXI7XHJcbiAgcHJldmlld1RyYW5zbGF0ZTogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9O1xyXG4gIHByZXZpZXdTdXJmYWNlUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBjbG9zZVByZXZpZXc6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQ6IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxufSkgPT4gKHtcclxuICBvcGVuOiBwcmV2aWV3T3BlbixcclxuICBidXN5OiBwcmV2aWV3QnVzeSxcclxuICBlcnJvcjogcHJldmlld0Vycm9yLFxyXG4gIGltYWdlVXJsOiBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgaW1hZ2VBbHQ6IHByZXZpZXdBbHRUZXh0LFxyXG4gIHNjYWxlOiBwcmV2aWV3U2NhbGUsXHJcbiAgdHJhbnNsYXRlOiBwcmV2aWV3VHJhbnNsYXRlLFxyXG4gIHN1cmZhY2VSZWY6IHByZXZpZXdTdXJmYWNlUmVmLFxyXG4gIG9uQ2xvc2U6IGNsb3NlUHJldmlldyxcclxuICBvblBvaW50ZXJEb3duOiBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24sXHJcbiAgb25Qb2ludGVyTW92ZTogaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlLFxyXG4gIG9uUG9pbnRlckVuZDogaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXHJcbn0pO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lVmlldyA9IHtcclxuICB2aXNpYmxlOiBib29sZWFuO1xyXG4gIHByb2plY3RJZDogc3RyaW5nO1xyXG4gIHJlaW1idXJzYWJsZUV4cGVuc2U6IG51bWJlcjtcclxuICBpc0xvYWRpbmc6IGJvb2xlYW47XHJcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgb25Qcm9qZWN0SWRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uUmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZTogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxDb250ZW50VmlldyA9ICh7XHJcbiAgaXNMb2FkaW5nLFxyXG4gIGVycm9yTWVzc2FnZSxcclxuICBoZWFkZXIsXHJcbiAgc2hvd1N0aWNreVByZXZpZXcsXHJcbiAgcHJldmlld0J1c3ksXHJcbiAgcHJldmlld0Vycm9yLFxyXG4gIHByZXZpZXdJbWFnZVVybCxcclxuICBwcmV2aWV3QWx0VGV4dCxcclxuICBvcGVuRmlsZSxcclxuICBzdGF0dXNMYWJlbCxcclxuICBnYXN0b1R5cGVMYWJlbCxcclxuICB0b3RhbEFtb3VudFRleHQsXHJcbiAgdHJhbnNEYXRlVGV4dCxcclxuICB0aWNrZXRUaW1lVGV4dCxcclxuICBpc0VkaXRpbmcsXHJcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICBkZXNjcmlwdGlvbklucHV0UmVmLFxyXG4gIGRyYWZ0R2FzdG9UeXBlLFxyXG4gIGdhc3RvVHlwZUludmFsaWQsXHJcbiAgZ2FzdG9UeXBlSW5wdXRSZWYsXHJcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICBjdXJyZW5jeUlucHV0UmVmLFxyXG4gIGRyYWZ0VG90YWxBbW91bnQsXHJcbiAgdG90YWxBbW91bnRJbnZhbGlkLFxyXG4gIHRvdGFsQW1vdW50SW5wdXRSZWYsXHJcbiAgZHJhZnRBbW91bnRNU1QsXHJcbiAgYW1vdW50TVNUSW52YWxpZCxcclxuICBhbW91bnRNU1RJbnB1dFJlZixcclxuICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICBleGNoYW5nZVJhdGVJbnZhbGlkLFxyXG4gIGV4Y2hhbmdlUmF0ZUlucHV0UmVmLFxyXG4gIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlLFxyXG4gIGxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0VHJhbnNEYXRlLFxyXG4gIGRyYWZ0VGlja2V0VGltZSxcclxuICBkcmFmdFVybEZpbGUsXHJcbiAgZHJhZnRGaWxlTmFtZSxcclxuICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gIHNldERyYWZ0R2FzdG9UeXBlLFxyXG4gIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIHNldERyYWZ0VG90YWxBbW91bnQsXHJcbiAgc2V0RHJhZnRBbW91bnRNU1QsXHJcbiAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgY29tbWl0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gIGxpbmtlZExpbmUsXHJcbiAgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCxcclxuICB2aXNpYmxlTGluZXMsXHJcbiAgdG90YWxMaW5lUGFnZXMsXHJcbiAgbGluZVBhZ2UsXHJcbiAgc2FmZUN1cnJlbmN5Q29kZSxcclxuICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gIGxpbmVDb250YWluZXJSZWYsXHJcbiAgc2V0TGluZVBhZ2UsXHJcbiAgb3BlbkxpbmVEZXRhaWwsXHJcbn06IHtcclxuICBpc0xvYWRpbmc6IGJvb2xlYW47XHJcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbDtcclxuICBzaG93U3RpY2t5UHJldmlldzogYm9vbGVhbjtcclxuICBwcmV2aWV3QnVzeTogYm9vbGVhbjtcclxuICBwcmV2aWV3RXJyb3I6IHN0cmluZztcclxuICBwcmV2aWV3SW1hZ2VVcmw6IHN0cmluZztcclxuICBwcmV2aWV3QWx0VGV4dDogc3RyaW5nO1xyXG4gIG9wZW5GaWxlOiAoKSA9PiB2b2lkO1xyXG4gIHN0YXR1c0xhYmVsOiBzdHJpbmc7XHJcbiAgZ2FzdG9UeXBlTGFiZWw6IHN0cmluZztcclxuICB0b3RhbEFtb3VudFRleHQ6IHN0cmluZztcclxuICB0cmFuc0RhdGVUZXh0OiBzdHJpbmc7XHJcbiAgdGlja2V0VGltZVRleHQ6IHN0cmluZztcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgZ2FzdG9UeXBlT3B0aW9uczogRXhwZW5zZVNlbGVjdE9wdGlvbltdO1xyXG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcclxuICBkZXNjcmlwdGlvbkludmFsaWQ6IGJvb2xlYW47XHJcbiAgZGVzY3JpcHRpb25JbnB1dFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICBkcmFmdEdhc3RvVHlwZTogc3RyaW5nO1xyXG4gIGdhc3RvVHlwZUludmFsaWQ6IGJvb2xlYW47XHJcbiAgZ2FzdG9UeXBlSW5wdXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBjdXJyZW5jeUNvZGVJbnZhbGlkOiBib29sZWFuO1xyXG4gIGN1cnJlbmN5SW5wdXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgZHJhZnRUb3RhbEFtb3VudDogc3RyaW5nO1xyXG4gIHRvdGFsQW1vdW50SW52YWxpZDogYm9vbGVhbjtcclxuICB0b3RhbEFtb3VudElucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIGRyYWZ0QW1vdW50TVNUOiBzdHJpbmc7XHJcbiAgYW1vdW50TVNUSW52YWxpZDogYm9vbGVhbjtcclxuICBhbW91bnRNU1RJbnB1dFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICBkcmFmdEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xyXG4gIGV4Y2hhbmdlUmF0ZUludmFsaWQ6IGJvb2xlYW47XHJcbiAgZXhjaGFuZ2VSYXRlSW5wdXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U6IHN0cmluZztcclxuICBsb2NhbEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgZHJhZnRUaWNrZXRUaW1lOiBzdHJpbmc7XHJcbiAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XHJcbiAgZHJhZnRGaWxlTmFtZTogc3RyaW5nO1xyXG4gIHNldERyYWZ0RGVzY3JpcHRpb246ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldERyYWZ0R2FzdG9UeXBlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXREcmFmdEN1cnJlbmN5Q29kZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0RHJhZnRUb3RhbEFtb3VudDogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0RHJhZnRBbW91bnRNU1Q6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldERyYWZ0RXhjaGFuZ2VSYXRlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBjb21taXREcmFmdEV4Y2hhbmdlUmF0ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgaXNGcm9tU2hlZXRMaW5rOiBib29sZWFuO1xyXG4gIGxpbmtlZExpbmU6IEV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVWaWV3O1xyXG4gIGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQ6ICgpID0+IHZvaWQ7XHJcbiAgdmlzaWJsZUxpbmVzOiBFeHBlbnNlVGlja2V0RGV0YWlsTGluZVtdO1xyXG4gIHRvdGFsTGluZVBhZ2VzOiBudW1iZXI7XHJcbiAgbGluZVBhZ2U6IG51bWJlcjtcclxuICBzYWZlQ3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgcGFnaW5hdGlvbkxhYmVsczoge1xyXG4gICAgZmlyc3Q6IHN0cmluZztcclxuICAgIHByZXY6IHN0cmluZztcclxuICAgIG5leHQ6IHN0cmluZztcclxuICAgIGxhc3Q6IHN0cmluZztcclxuICB9O1xyXG4gIGxpbmVDb250YWluZXJSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIHNldExpbmVQYWdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xyXG4gIG9wZW5MaW5lRGV0YWlsOiAobGluZVJlY0lkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn0pID0+ICh7XHJcbiAgaXNMb2FkaW5nLFxyXG4gIGVycm9yTWVzc2FnZSxcclxuICBoZWFkZXIsXHJcbiAgc2hvd1N0aWNreVByZXZpZXcsXHJcbiAgcHJldmlld0J1c3ksXHJcbiAgcHJldmlld0Vycm9yLFxyXG4gIHByZXZpZXdJbWFnZVVybCxcclxuICBwcmV2aWV3RmlsZU5hbWU6IHByZXZpZXdBbHRUZXh0LFxyXG4gIHByZXZpZXdBbHRUZXh0LFxyXG4gIG9uT3BlblByZXZpZXc6IG9wZW5GaWxlLFxyXG4gIHN0YXR1c0xhYmVsLFxyXG4gIGdhc3RvVHlwZUxhYmVsLFxyXG4gIHRvdGFsQW1vdW50VGV4dCxcclxuICB0cmFuc0RhdGVUZXh0LFxyXG4gIHRpY2tldFRpbWVUZXh0LFxyXG4gIGlzRWRpdGluZyxcclxuICBnYXN0b1R5cGVPcHRpb25zLFxyXG4gIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgZGVzY3JpcHRpb25JbnZhbGlkLFxyXG4gIGRlc2NyaXB0aW9uSW5wdXRSZWYsXHJcbiAgZHJhZnRHYXN0b1R5cGUsXHJcbiAgZ2FzdG9UeXBlSW52YWxpZCxcclxuICBnYXN0b1R5cGVJbnB1dFJlZixcclxuICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICBjdXJyZW5jeUNvZGVJbnZhbGlkLFxyXG4gIGN1cnJlbmN5SW5wdXRSZWYsXHJcbiAgZHJhZnRUb3RhbEFtb3VudCxcclxuICB0b3RhbEFtb3VudEludmFsaWQsXHJcbiAgdG90YWxBbW91bnRJbnB1dFJlZixcclxuICBkcmFmdEFtb3VudE1TVCxcclxuICBhbW91bnRNU1RJbnZhbGlkLFxyXG4gIGFtb3VudE1TVElucHV0UmVmLFxyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIGV4Y2hhbmdlUmF0ZUludmFsaWQsXHJcbiAgZXhjaGFuZ2VSYXRlSW5wdXRSZWYsXHJcbiAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UsXHJcbiAgbG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgZHJhZnRUaWNrZXRUaW1lLFxyXG4gIGRyYWZ0VXJsRmlsZSxcclxuICBkcmFmdEZpbGVOYW1lLFxyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlOiBzZXREcmFmdEdhc3RvVHlwZSxcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICBvbkRyYWZ0VG90YWxBbW91bnRDaGFuZ2U6IHNldERyYWZ0VG90YWxBbW91bnQsXHJcbiAgb25EcmFmdEFtb3VudE1TVENoYW5nZTogc2V0RHJhZnRBbW91bnRNU1QsXHJcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZTogc2V0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNvbW1pdDogY29tbWl0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgb25PcGVuRmlsZTogb3BlbkZpbGUsXHJcbiAgb25PcGVuRXhwZW5zZVNoZWV0OiBpc0Zyb21TaGVldExpbmsgPyB1bmRlZmluZWQgOiBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0LFxyXG4gIGxpbmtlZExpbmUsXHJcbiAgdmlzaWJsZUxpbmVzLFxyXG4gIHRvdGFsTGluZVBhZ2VzLFxyXG4gIGxpbmVQYWdlLFxyXG4gIGN1cnJlbmN5Q29kZTogc2FmZUN1cnJlbmN5Q29kZSxcclxuICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gIGNvbnRhaW5lclJlZjogbGluZUNvbnRhaW5lclJlZixcclxuICBvbkxpbmVQYWdlQ2hhbmdlOiBzZXRMaW5lUGFnZSxcclxuICBvbk9wZW5MaW5lOiBvcGVuTGluZURldGFpbCxcclxufSk7XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXREZXRhaWxNb2RhbFZpZXdBcmdzID0gUGFyYW1ldGVyczx0eXBlb2YgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3PlswXTtcclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1ZpZXdBcmdzID0gUGFyYW1ldGVyczx0eXBlb2YgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1ZpZXc+WzBdO1xyXG50eXBlIEV4cGVuc2VUaWNrZXREZXRhaWxDb250ZW50Vmlld0FyZ3MgPSBQYXJhbWV0ZXJzPHR5cGVvZiBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxDb250ZW50Vmlldz5bMF07XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlVmlld01vZGVsID0gKHtcclxuICBtb2RhbEFyZ3MsXHJcbiAgcHJldmlld0FyZ3MsXHJcbiAgY29udGVudEFyZ3MsXHJcbn06IHtcclxuICBtb2RhbEFyZ3M6IEV4cGVuc2VUaWNrZXREZXRhaWxNb2RhbFZpZXdBcmdzO1xyXG4gIHByZXZpZXdBcmdzOiBFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1ZpZXdBcmdzO1xyXG4gIGNvbnRlbnRBcmdzOiBFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXdBcmdzO1xyXG59KSA9PiAoe1xyXG4gIG1vZGFsOiBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxNb2RhbFZpZXcobW9kYWxBcmdzKSxcclxuICBwcmV2aWV3OiBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3VmlldyhwcmV2aWV3QXJncyksXHJcbiAgY29udGVudDogYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXcoY29udGVudEFyZ3MpLFxyXG59KTtcclxuXHJcbi8vIEtlZXBzIGZpbHRlciBjYWNoZSB3aXJpbmcgYW5kIGJhY2sgbmF2aWdhdGlvbiBvdXRzaWRlIHRoZSBwYWdlIGNvbnRhaW5lciBib2R5LlxyXG5jb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsTmF2aWdhdGlvblN0YXRlID0gKHtcclxuICBmaWxlSWQsXHJcbiAgZGV0YWlsT3JpZ2luLFxyXG4gIGhlYWRlclRyYW5zRGF0ZSxcclxuICBjb250ZXh0TGluZVJlY0lkLFxyXG4gIHRpY2tldFJldHVybkNvbnRleHQsXHJcbn06IHtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBkZXRhaWxPcmlnaW46IHN0cmluZztcclxuICBoZWFkZXJUcmFuc0RhdGU6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ7XHJcbiAgY29udGV4dExpbmVSZWNJZDogc3RyaW5nO1xyXG4gIHRpY2tldFJldHVybkNvbnRleHQ6IFJldHVyblR5cGU8dHlwZW9mIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQ+W1widGlja2V0UmV0dXJuQ29udGV4dFwiXTtcclxufSkgPT4ge1xyXG4gIGNvbnN0IHsgcmVhZENhY2hlZFN0YXRlLCBzYXZlQ2FjaGVkU3RhdGUsIG1hcmtSZXNldEZpbHRlcnNSZXR1cm4sIGNsZWFyQ2FjaGVkU3RhdGUgfSA9IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUoKTtcclxuXHJcbiAgdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uKHtcclxuICAgIGZpbGVJZCxcclxuICAgIGRldGFpbE9yaWdpbixcclxuICAgIGhlYWRlclRyYW5zRGF0ZSxcclxuICAgIGNvbnRleHRMaW5lUmVjSWQsXHJcbiAgICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gICAgcmVhZENhY2hlZFN0YXRlLFxyXG4gICAgc2F2ZUNhY2hlZFN0YXRlLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbWFya1Jlc2V0RmlsdGVyc1JldHVybixcclxuICAgIGNsZWFyQ2FjaGVkU3RhdGUsXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFJ1bnMgdGhlIG9uZS1zaG90IGF1dG8gZWRpdCB0cmFuc2l0aW9uIGZvciBsaW5rZWQgY29udGV4dHMgYWZ0ZXIgZGV0YWlsIGRhdGEgaXMgcmVhZHkuXHJcbmNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxBdXRvRWRpdCA9ICh7XG4gIGF1dG9FZGl0TW9kZSxcbiAgY2FuQXV0b0VkaXRJbkNvbnRleHQsXG4gIGlzTG9hZGluZyxcbiAgaGVhZGVyLFxuICBoYW5kbGVFbmFibGVFZGl0LFxuICBjYW5BdHRlbXB0QXV0b0VkaXQsXG59OiB7XG4gIGF1dG9FZGl0TW9kZTogYm9vbGVhbjtcbiAgY2FuQXV0b0VkaXRJbkNvbnRleHQ6IGJvb2xlYW47XG4gIGlzTG9hZGluZzogYm9vbGVhbjtcbiAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbDtcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcbiAgY2FuQXR0ZW1wdEF1dG9FZGl0OiBib29sZWFuO1xufSkgPT4ge1xuICBjb25zdCBhdXRvRWRpdEF0dGVtcHRlZFJlZiA9IHVzZVJlZihmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWF1dG9FZGl0TW9kZSB8fCAhY2FuQXV0b0VkaXRJbkNvbnRleHQgfHwgYXV0b0VkaXRBdHRlbXB0ZWRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGlmIChpc0xvYWRpbmcgfHwgIWhlYWRlciB8fCAhY2FuQXR0ZW1wdEF1dG9FZGl0KSByZXR1cm47XG5cbiAgICBhdXRvRWRpdEF0dGVtcHRlZFJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICBoYW5kbGVFbmFibGVFZGl0KCk7XG4gIH0sIFthdXRvRWRpdE1vZGUsIGNhbkF0dGVtcHRBdXRvRWRpdCwgY2FuQXV0b0VkaXRJbkNvbnRleHQsIGhhbmRsZUVuYWJsZUVkaXQsIGhlYWRlciwgaXNMb2FkaW5nXSk7XG59O1xuXHJcbi8vIFJlc29sdmVzIHBlcm1pc3Npb24gYW5kIGFjdGluZy11c2VyIHN0YXRlIHNvIHRoZSBwYWdlIGNvbnRhaW5lciBzdGF5cyBmb2N1c2VkIG9uIG9yY2hlc3RyYXRpb24uXHJcbmNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQZXJtaXNzaW9uU3RhdGUgPSAoKSA9PiB7XHJcbiAgY29uc3Qge1xyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gIH0gPSB1c2VBdXRoQ29udGV4dCgpO1xyXG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiVmlld1wiKTtcclxuICBjb25zdCBjYW5FZGl0VGlja2V0QnlNb2R1bGUgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIkVkaXRcIik7XHJcbiAgY29uc3QgY2FuRGVsZXRlVGlja2V0QnlNb2R1bGUgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIkZ1bGxBY2Nlc3NcIik7XHJcbiAgY29uc3QgaXNNYW5hZ2luZ090aGVyVXNlciA9IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VVc2VyKHtcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBjYW5FZGl0VGlja2V0OiBjYW5FZGl0VGlja2V0QnlNb2R1bGUgJiYgIWlzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICBjYW5EZWxldGVUaWNrZXQ6IGNhbkRlbGV0ZVRpY2tldEJ5TW9kdWxlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gT3ducyB0aGUgdGlja2V0IGRldGFpbCBwYWdlIG9yY2hlc3RyYXRpb24gd2hpbGUgdGhlIGNvbXBvbmVudCBzdGF5cyB0aGluIGZvciByZW5kZXJpbmcuXHJcbmNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQYWdlVmlld01vZGVsID0gKCkgPT4ge1xyXG4gIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfVElDS0VUX0ZJTEVfSURfXyk7XHJcbiAgY29uc3QgbGluZUNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHtcclxuICAgIGF1dG9FZGl0TW9kZSxcclxuICAgIGRldGFpbE9yaWdpbixcclxuICAgIGNvbnRleHRTaGVldElkLFxyXG4gICAgY29udGV4dExpbmVSZWNJZCxcclxuICAgIGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSxcclxuICAgIGlzRnJvbUV4cGVuc2VMaW5lLFxuICAgIGlzRnJvbVNoZWV0TGluayxcbiAgICBpc0xpbmtGYWlsdXJlUmVwYWlyLFxuICAgIHRpY2tldFJldHVybkNvbnRleHQsXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0KCk7XG4gIGNvbnN0IGNhbkVkaXRGcm9tU2hlZXRMaW5rRmFpbHVyZSA9IGlzTGlua0ZhaWx1cmVSZXBhaXI7XG4gIGNvbnN0IHNhdmVTdHJhdGVneTogRXhwZW5zZVRpY2tldFNhdmVTdHJhdGVneSA9IGlzTGlua0ZhaWx1cmVSZXBhaXIgPyBcInRpY2tldC1vbmx5XCIgOiBcInRpY2tldC1hbmQtc2hlZXQtbGluZVwiO1xuICBjb25zdCB7XHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBjYW5FZGl0VGlja2V0LFxyXG4gICAgY2FuRGVsZXRlVGlja2V0LFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUGVybWlzc2lvblN0YXRlKCk7XHJcbiAgY29uc3QgZ2FzdG9UeXBlT3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiBnZXRFeHBlbnNlR2FzdG9UeXBlT3B0aW9ucygpLCBbXSk7XHJcbiAgY29uc3QgZ2FzdG9UeXBlTGFiZWxNYXAgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XHJcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBnYXN0b1R5cGVPcHRpb25zKSB7XHJcbiAgICAgIG1hcC5zZXQoU3RyaW5nKG9wdGlvbi52YWx1ZSksIG9wdGlvbi50ZXh0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBtYXA7XHJcbiAgfSwgW2dhc3RvVHlwZU9wdGlvbnNdKTtcclxuICBjb25zdCB7IGhlYWRlciwgbGluZXMsIGlzTG9hZGluZywgZXJyb3JNZXNzYWdlLCByZWxvYWREZXRhaWwgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZSh7XHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBmaWxlSWQsXHJcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICB9KTtcclxuICBjb25zdCBsaW5rZWRFeHBlbnNlU2hlZXRJZCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBzYWZlVGV4dCh0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkIHx8IGNvbnRleHRTaGVldElkIHx8IGhlYWRlcj8uaG9qYUdhc3Rvc0lkRGlzcGxheSksXHJcbiAgICBbY29udGV4dFNoZWV0SWQsIGhlYWRlcj8uaG9qYUdhc3Rvc0lkRGlzcGxheSwgdGlja2V0UmV0dXJuQ29udGV4dF1cclxuICApO1xyXG4gIGNvbnN0IGxpbmtlZFNoZWV0TGluZSA9IHVzZUV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmUoe1xyXG4gICAgZW5hYmxlZDogISFsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICAgIHNoZWV0SWQ6IGxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gICAgbGluZVJlY0lkOiBjb250ZXh0TGluZVJlY0lkLFxyXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXHJcbiAgfSk7XHJcbiAgY29uc3Qge1xyXG4gICAgbGlua1NoZWV0TG9ja2VkLFxyXG4gICAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UsXHJcbiAgICBsaW5rU2hlZXRDaGVja0J1c3ksXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlKHtcclxuICAgIGlzTGlua01vZGU6ICEhbGlua2VkRXhwZW5zZVNoZWV0SWQsXHJcbiAgICBsaW5rU2hlZXRJZDogbGlua2VkRXhwZW5zZVNoZWV0SWQsXHJcbiAgICBjYW5Qcm9jZXNzTGlua01vZGU6IHRydWUsXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICByZXNvbHZlQmxvY2tlZE1lc3NhZ2U6IHJlc29sdmVMaW5rZWRUaWNrZXRCbG9ja2VkTWVzc2FnZSxcclxuICB9KTtcclxuICBjb25zdCBbc2hlZXRTeW5jQmxvY2tlZCwgc2V0U2hlZXRTeW5jQmxvY2tlZF0gPSB1c2VTdGF0ZSgoKSA9PiAhIXJlYWRFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoZmlsZUlkKSk7XHJcbiAgY29uc3QgW3NoZWV0U3luY0Jsb2NrZWRNZXNzYWdlLCBzZXRTaGVldFN5bmNCbG9ja2VkTWVzc2FnZV0gPSB1c2VTdGF0ZSgoKSA9PlxyXG4gICAgc2FmZVRleHQocmVhZEV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZShmaWxlSWQpPy5tZXNzYWdlKVxyXG4gICk7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlUmVxdWVzdElkUmVmID0gdXNlUmVmKDApO1xyXG4gIGNvbnN0IFtleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSwgc2V0RXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2NvbnRleHREZWZhdWx0Q3VycmVuY3lDb2RlLCBzZXRDb250ZXh0RGVmYXVsdEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuXHJcbiAgICBjb25zdCBsb2FkRGVmYXVsdEN1cnJlbmN5Q29kZSA9IGFzeW5jICgpID0+IHtcclxuICAgICAgY29uc3QgZGVmYXVsdEN1cnJlbmN5Q29kZSA9IG5vcm1hbGl6ZUV4cGVuc2VMaW5lQ3VycmVuY3lDb2RlKFxyXG4gICAgICAgIGF3YWl0IGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUoe1xyXG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAoIWlzQ2FuY2VsbGVkKSB7XHJcbiAgICAgICAgc2V0Q29udGV4dERlZmF1bHRDdXJyZW5jeUNvZGUoZGVmYXVsdEN1cnJlbmN5Q29kZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdm9pZCBsb2FkRGVmYXVsdEN1cnJlbmN5Q29kZSgpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlzQ2FuY2VsbGVkID0gdHJ1ZTtcclxuICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBzeW5jU3RhdGUgPSByZWFkRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKGZpbGVJZCk7XHJcbiAgICBzZXRTaGVldFN5bmNCbG9ja2VkKCEhc3luY1N0YXRlKTtcclxuICAgIHNldFNoZWV0U3luY0Jsb2NrZWRNZXNzYWdlKHNhZmVUZXh0KHN5bmNTdGF0ZT8ubWVzc2FnZSkpO1xyXG4gIH0sIFtmaWxlSWRdKTtcclxuXHJcbiAgY29uc3QgcGVuZGluZ0ZpcnN0TGluayA9XHJcbiAgICBkZXRhaWxPcmlnaW4gPT09IFwic2hlZXQtY3JlYXRlXCIgJiYgISFzYWZlVGV4dCh0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkIHx8IGNvbnRleHRTaGVldElkKSAmJiAhc2FmZVRleHQoaGVhZGVyPy5ob2phR2FzdG9zSWREaXNwbGF5KTtcclxuICBjb25zdCBzaGVldFdvcmtmbG93QmxvY2tNZXNzYWdlID0gcGVuZGluZ0ZpcnN0TGlua1xyXG4gICAgPyBpbmRUKFwiRXhwZW5zZVRpY2tldHNfU2hlZXRTeW5jX1BlbmRpbmdTYXZlUmVxdWlyZWRcIiwgXCJTYXZlIHRoZSB0aWNrZXQgYmVmb3JlIGxlYXZpbmcgdGhpcyBmbG93LlwiKVxyXG4gICAgOiBzaGVldFN5bmNCbG9ja2VkTWVzc2FnZSB8fFxyXG4gICAgICBpbmRUKFxyXG4gICAgICAgIFwiRXhwZW5zZVRpY2tldHNfU2hlZXRTeW5jX1JldHJ5UmVxdWlyZWRcIixcclxuICAgICAgICBcIlRpY2tldCBkYXRhIGNoYW5nZWQsIGJ1dCB3ZSBjb3VsZCBub3Qgc3luYyB0aGUgZXhwZW5zZSBsaW5lLiBTYXZlIGFnYWluIGJlZm9yZSBsZWF2aW5nLlwiXHJcbiAgICAgICk7XHJcblxuICBjb25zdCB7IG1hcmtSZXNldEZpbHRlcnNSZXR1cm4sIGNsZWFyQ2FjaGVkU3RhdGUgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxOYXZpZ2F0aW9uU3RhdGUoe1xuICAgIGZpbGVJZCxcclxuICAgIGRldGFpbE9yaWdpbixcclxuICAgIGhlYWRlclRyYW5zRGF0ZTogaGVhZGVyPy50cmFuc0RhdGUsXHJcbiAgICBjb250ZXh0TGluZVJlY0lkLFxyXG4gICAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxuICB9KTtcclxuICBjb25zdCBjYW5FZGl0TGlua2VkVGlja2V0ID0gIWxpbmtlZEV4cGVuc2VTaGVldElkIHx8ICghbGlua1NoZWV0Q2hlY2tCdXN5ICYmICFsaW5rU2hlZXRMb2NrZWQpO1xyXG4gIGNvbnN0IGFsbG93QXNzaWduZWREcmFmdEVkaXQgPSBpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUgfHwgKCEhbGlua2VkRXhwZW5zZVNoZWV0SWQgJiYgY2FuRWRpdExpbmtlZFRpY2tldCk7XHJcbiAgY29uc3QgdGlja2V0TG9jYWxDdXJyZW5jeUNvZGUgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gbm9ybWFsaXplRXhwZW5zZUxpbmVDdXJyZW5jeUNvZGUobGlua2VkU2hlZXRMaW5lLmxvY2FsQ3VycmVuY3lDb2RlIHx8IGNvbnRleHREZWZhdWx0Q3VycmVuY3lDb2RlKSxcclxuICAgIFtjb250ZXh0RGVmYXVsdEN1cnJlbmN5Q29kZSwgbGlua2VkU2hlZXRMaW5lLmxvY2FsQ3VycmVuY3lDb2RlXVxyXG4gICk7XHJcbiAgY29uc3Qge1xyXG4gICAgYnVzeSxcclxuICAgIHN0YXR1cyxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG1vZGFsRXJyb3IsXHJcbiAgICBsaW5lUGFnZSxcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkZXNjcmlwdGlvbkludmFsaWQsXHJcbiAgICBkZXNjcmlwdGlvbklucHV0UmVmLFxyXG4gICAgZHJhZnRHYXN0b1R5cGUsXHJcbiAgICBnYXN0b1R5cGVJbnZhbGlkLFxyXG4gICAgZ2FzdG9UeXBlSW5wdXRSZWYsXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIGN1cnJlbmN5Q29kZUludmFsaWQsXHJcbiAgICBjdXJyZW5jeUlucHV0UmVmLFxyXG4gICAgZHJhZnRUb3RhbEFtb3VudCxcclxuICAgIHRvdGFsQW1vdW50SW52YWxpZCxcclxuICAgIHRvdGFsQW1vdW50SW5wdXRSZWYsXHJcbiAgICBkcmFmdEFtb3VudE1TVCxcclxuICAgIGFtb3VudE1TVEludmFsaWQsXHJcbiAgICBhbW91bnRNU1RJbnB1dFJlZixcclxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgZXhjaGFuZ2VSYXRlSW52YWxpZCxcclxuICAgIGV4Y2hhbmdlUmF0ZUlucHV0UmVmLFxyXG4gICAgbG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICBkcmFmdFRyYW5zRGF0ZSxcclxuICAgIGRyYWZ0VGlja2V0VGltZSxcclxuICAgIGRyYWZ0Q29tZW50YXJpbyxcclxuICAgIGRyYWZ0VXJsRmlsZSxcclxuICAgIGRyYWZ0RmlsZU5hbWUsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldExpbmVQYWdlLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgIHNldERyYWZ0R2FzdG9UeXBlLFxyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBzZXREcmFmdFRvdGFsQW1vdW50LFxyXG4gICAgc2V0RHJhZnRBbW91bnRNU1QsXHJcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIGNvbW1pdERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3Ioe1xuICAgIGhlYWRlcixcbiAgICBsaW5rZWRFeHBlbnNlTGluZTogbGlua2VkU2hlZXRMaW5lLmxpbmUsXG4gICAgbG9jYWxDdXJyZW5jeUNvZGU6IHRpY2tldExvY2FsQ3VycmVuY3lDb2RlLFxuICAgIGxpbmVDb3VudDogbGluZXMubGVuZ3RoLFxyXG4gICAgcGFnZVNpemU6IExJTkVTX1BBR0VfU0laRSxcclxuICAgIGNhbkVkaXRUaWNrZXQ6IGNhbkVkaXRUaWNrZXQgJiYgY2FuRWRpdExpbmtlZFRpY2tldCxcbiAgICBpc0xvYWRpbmcsXG4gICAgYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCxcbiAgICBpc1NoZWV0TGlua1JlYWRPbmx5OiBpc0Zyb21TaGVldExpbmsgJiYgIWNhbkVkaXRGcm9tU2hlZXRMaW5rRmFpbHVyZSxcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcbiAgfSk7XG4gIGNvbnN0IGhhbmRsZVRpY2tldEN1cnJlbmN5Q29kZUNoYW5nZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3QgbmV4dEN1cnJlbmN5Q29kZSA9IG5vcm1hbGl6ZUV4cGVuc2VMaW5lQ3VycmVuY3lDb2RlKHZhbHVlKTtcclxuICAgICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUobmV4dEN1cnJlbmN5Q29kZSk7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKFwiXCIpO1xyXG5cclxuICAgICAgaWYgKCFuZXh0Q3VycmVuY3lDb2RlIHx8ICFsb2NhbEN1cnJlbmN5Q29kZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG5leHRDdXJyZW5jeUNvZGUgPT09IG5vcm1hbGl6ZUV4cGVuc2VMaW5lQ3VycmVuY3lDb2RlKGxvY2FsQ3VycmVuY3lDb2RlKSkge1xyXG4gICAgICAgIGV4Y2hhbmdlUmF0ZVJlcXVlc3RJZFJlZi5jdXJyZW50ICs9IDE7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByZXF1ZXN0SWQgPSBleGNoYW5nZVJhdGVSZXF1ZXN0SWRSZWYuY3VycmVudCArIDE7XHJcbiAgICAgIGV4Y2hhbmdlUmF0ZVJlcXVlc3RJZFJlZi5jdXJyZW50ID0gcmVxdWVzdElkO1xyXG5cclxuICAgICAgdm9pZCAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCBvZmZpY2lhbEV4Y2hhbmdlUmF0ZSA9IGF3YWl0IGZldGNoRXhwZW5zZU9mZmljaWFsRXhjaGFuZ2VSYXRlKHtcclxuICAgICAgICAgICAgbG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICAgIGV4cGVuc2VDdXJyZW5jeUNvZGU6IG5leHRDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICAgIGRhdGU6IGRyYWZ0VHJhbnNEYXRlIHx8IGhlYWRlcj8udGlja2V0RGF0ZSB8fCBoZWFkZXI/LnRyYW5zRGF0ZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYgKHJlcXVlc3RJZCAhPT0gZXhjaGFuZ2VSYXRlUmVxdWVzdElkUmVmLmN1cnJlbnQgfHwgIW9mZmljaWFsRXhjaGFuZ2VSYXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb21taXREcmFmdEV4Y2hhbmdlUmF0ZShmb3JtYXRFeHBlbnNlRXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZShvZmZpY2lhbEV4Y2hhbmdlUmF0ZS5leGNoYW5nZVJhdGUpLCBuZXh0Q3VycmVuY3lDb2RlKTtcclxuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKFxyXG4gICAgICAgICAgICBidWlsZEV4cGVuc2VFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgcmF3UmF0ZTogb2ZmaWNpYWxFeGNoYW5nZVJhdGUucmF3UmF0ZSxcclxuICAgICAgICAgICAgICBkYXRlOiBvZmZpY2lhbEV4Y2hhbmdlUmF0ZS5kYXRlLFxyXG4gICAgICAgICAgICAgIHNvdXJjZTogb2ZmaWNpYWxFeGNoYW5nZVJhdGUuc291cmNlLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgaWYgKHJlcXVlc3RJZCAhPT0gZXhjaGFuZ2VSYXRlUmVxdWVzdElkUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPVxyXG4gICAgICAgICAgICBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgPyBzYWZlVGV4dChlcnJvci5tZXNzYWdlKVxyXG4gICAgICAgICAgICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX1VuYXZhaWxhYmxlXCIsIFwiTm8gc2UgcHVkbyBvYnRlbmVyIGVsIHRpcG8gZGUgY2FtYmlvLlwiKTtcclxuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkoKTtcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGNvbW1pdERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgICBkcmFmdFRyYW5zRGF0ZSxcclxuICAgICAgaGVhZGVyPy50aWNrZXREYXRlLFxyXG4gICAgICBoZWFkZXI/LnRyYW5zRGF0ZSxcclxuICAgICAgbG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgXVxyXG4gICk7XHJcbiAgY29uc3QgaGFuZGxlVGlja2V0RXhjaGFuZ2VSYXRlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUodmFsdWUpO1xyXG4gICAgfSxcclxuICAgIFtzZXREcmFmdEV4Y2hhbmdlUmF0ZV1cclxuICApO1xyXG4gIGNvbnN0IGhhbmRsZVRpY2tldEV4Y2hhbmdlUmF0ZUNvbW1pdCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UoXCJcIik7XHJcbiAgICAgIGNvbW1pdERyYWZ0RXhjaGFuZ2VSYXRlKHZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBbY29tbWl0RHJhZnRFeGNoYW5nZVJhdGVdXHJcbiAgKTtcclxuICBjb25zdCBoYW5kbGVUaWNrZXRBbW91bnRNU1RDaGFuZ2UgPSB1c2VDYWxsYmFjayhcclxuICAgICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKFwiXCIpO1xyXG4gICAgICBzZXREcmFmdEFtb3VudE1TVCh2YWx1ZSk7XHJcbiAgICB9LFxyXG4gICAgW3NldERyYWZ0QW1vdW50TVNUXVxyXG4gICk7XHJcbiAgY29uc3QgaGFuZGxlRW5hYmxlRWRpdEluQ29udGV4dCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChsaW5rU2hlZXRDaGVja0J1c3kpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsaW5rZWRFeHBlbnNlU2hlZXRJZCAmJiBsaW5rU2hlZXRMb2NrZWQpIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9XHJcbiAgICAgICAgc2FmZVRleHQobGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UpIHx8XHJcbiAgICAgICAgcmVzb2x2ZUxpbmtlZFRpY2tldEJsb2NrZWRNZXNzYWdlKGZhbHNlKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UoXCJcIik7XHJcbiAgICBoYW5kbGVFbmFibGVFZGl0KCk7XHJcbiAgfSwgW1xyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlLFxyXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gICAgbGlua1NoZWV0TG9ja2VkLFxyXG4gICAgbGlua2VkRXhwZW5zZVNoZWV0SWQsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gIF0pO1xyXG4gIGNvbnN0IGhhbmRsZUNhbmNlbEVkaXRJbkNvbnRleHQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZShcIlwiKTtcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQoKTtcclxuICAgIGxpbmtlZFNoZWV0TGluZS5yZXNldERyYWZ0UHJvamVjdElkKCk7XHJcbiAgICBsaW5rZWRTaGVldExpbmUucmVzZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UoKTtcclxuICB9LCBbaGFuZGxlQ2FuY2VsRWRpdCwgbGlua2VkU2hlZXRMaW5lLnJlc2V0RHJhZnRQcm9qZWN0SWQsIGxpbmtlZFNoZWV0TGluZS5yZXNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZV0pO1xyXG4gIGNvbnN0IHsgcGFnaW5hdGlvbkxhYmVscywgcHJldmlld0FsdFRleHQsIHN0YXR1c0xhYmVsLCBnYXN0b1R5cGVMYWJlbCwgdG90YWxBbW91bnRUZXh0LCB0cmFuc0RhdGVUZXh0LCB0aWNrZXRUaW1lVGV4dCB9ID1cclxuICAgIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5KHtcclxuICAgICAgaGVhZGVyLFxyXG4gICAgICBkcmFmdEdhc3RvVHlwZSxcclxuICAgICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICAgIGRyYWZ0VG90YWxBbW91bnQsXHJcbiAgICAgIGRyYWZ0VHJhbnNEYXRlLFxyXG4gICAgICBkcmFmdFRpY2tldFRpbWUsXHJcbiAgICAgIGRyYWZ0RmlsZU5hbWUsXHJcbiAgICAgIGlzRWRpdGluZyxcclxuICAgICAgZ2FzdG9UeXBlTGFiZWxNYXAsXHJcbiAgICB9KTtcclxuICBjb25zdCB7XHJcbiAgICBzaG93U3RpY2t5UHJldmlldyxcclxuICAgIHByZXZpZXdPcGVuLFxyXG4gICAgcHJldmlld0J1c3ksXHJcbiAgICBwcmV2aWV3RXJyb3IsXHJcbiAgICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgICBwcmV2aWV3U2NhbGUsXHJcbiAgICBwcmV2aWV3VHJhbnNsYXRlLFxyXG4gICAgcHJldmlld1N1cmZhY2VSZWYsXHJcbiAgICBvcGVuUHJldmlldyxcclxuICAgIGNsb3NlUHJldmlldyxcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kLFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsKHtcclxuICAgIGZpbGVJZCxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGRyYWZ0VXJsRmlsZSxcclxuICAgIGhlYWRlclVybEZpbGU6IGhlYWRlcj8udXJsRmlsZSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgdmlzaWJsZUxpbmVzID0gdXNlTWVtbygoKSA9PiBwYWdlZFNsaWNlKGxpbmVzLCBsaW5lUGFnZSwgTElORVNfUEFHRV9TSVpFKSwgW2xpbmVQYWdlLCBsaW5lc10pO1xyXG4gIGNvbnN0IHRvdGFsTGluZVBhZ2VzID0gTWF0aC5jZWlsKChsaW5lcy5sZW5ndGggfHwgMCkgLyBMSU5FU19QQUdFX1NJWkUpO1xyXG5cclxuICB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQXV0b0VkaXQoe1xuICAgIGF1dG9FZGl0TW9kZSxcbiAgICBjYW5BdXRvRWRpdEluQ29udGV4dDogIWlzRnJvbVNoZWV0TGluayB8fCBjYW5FZGl0RnJvbVNoZWV0TGlua0ZhaWx1cmUsXG4gICAgaXNMb2FkaW5nLFxuICAgIGhlYWRlcixcbiAgICBoYW5kbGVFbmFibGVFZGl0OiBoYW5kbGVFbmFibGVFZGl0SW5Db250ZXh0LFxuICAgIGNhbkF0dGVtcHRBdXRvRWRpdDogIWxpbmtTaGVldENoZWNrQnVzeSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBoYW5kbGVVcGRhdGUsIGhhbmRsZVBlcnNpc3RIZWFkZXJEcmFmdCwgaGFuZGxlRGVsZXRlIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zKHtcclxuICAgIGJ1c3ksXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBjYW5FZGl0VGlja2V0OiBjYW5FZGl0VGlja2V0ICYmIGNhbkVkaXRMaW5rZWRUaWNrZXQsXHJcbiAgICBjYW5EZWxldGVUaWNrZXQ6IGNhbkRlbGV0ZVRpY2tldCAmJiBjYW5FZGl0TGlua2VkVGlja2V0LFxyXG4gICAgZmlsZUlkLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0R2FzdG9UeXBlLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBkcmFmdFRvdGFsQW1vdW50LFxyXG4gICAgZHJhZnRBbW91bnRNU1QsXHJcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIGxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICBkcmFmdFRpY2tldFRpbWUsXHJcbiAgICBkcmFmdENvbWVudGFyaW8sXG4gICAgZHJhZnRVcmxGaWxlLFxuICAgIGRyYWZ0RmlsZU5hbWUsXG4gICAgc2F2ZVN0cmF0ZWd5LFxuICAgIGxpbmtlZEV4cGVuc2VTaGVldElkLFxuICAgIGxpbmtlZEV4cGVuc2VMaW5lUmVjSWQ6IGlzRnJvbUV4cGVuc2VMaW5lID8gY29udGV4dExpbmVSZWNJZCA6IFwiXCIsXHJcbiAgICBsaW5rZWRFeHBlbnNlTGluZVByb2plY3RJZDogbGlua2VkU2hlZXRMaW5lLmRyYWZ0UHJvamVjdElkLFxyXG4gICAgbGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWRDaGFuZ2VkOiBpc0Zyb21FeHBlbnNlTGluZSAmJiBsaW5rZWRTaGVldExpbmUucHJvamVjdElkQ2hhbmdlZCxcclxuICAgIGxpbmtlZEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZTogbGlua2VkU2hlZXRMaW5lLmRyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgIGxpbmtlZEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZWQ6IGlzRnJvbUV4cGVuc2VMaW5lICYmIGxpbmtlZFNoZWV0TGluZS5yZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlZCxcclxuICAgIGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dDogaXNGcm9tRXhwZW5zZUxpbmUgJiYgbGlua2VkRXhwZW5zZVNoZWV0SWQgJiYgY29udGV4dExpbmVSZWNJZFxyXG4gICAgICA/IHtcclxuICAgICAgICAgIHNoZWV0SWQ6IGxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gICAgICAgICAgbGluZVJlY0lkOiBjb250ZXh0TGluZVJlY0lkLFxyXG4gICAgICAgIH1cclxuICAgICAgOiBudWxsLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlOiAobWVzc2FnZSkgPT4ge1xyXG4gICAgICBzZXRTaGVldFN5bmNCbG9ja2VkKHRydWUpO1xyXG4gICAgICBzZXRTaGVldFN5bmNCbG9ja2VkTWVzc2FnZShtZXNzYWdlKTtcclxuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgfSxcclxuICAgIG9uTGlua2VkU2hlZXRTeW5jU3VjY2VzczogKCkgPT4ge1xyXG4gICAgICBzZXRTaGVldFN5bmNCbG9ja2VkKGZhbHNlKTtcclxuICAgICAgc2V0U2hlZXRTeW5jQmxvY2tlZE1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIGxpbmtlZFNoZWV0TGluZS5hY2NlcHREcmFmdFByb2plY3RJZCgpO1xyXG4gICAgICBsaW5rZWRTaGVldExpbmUuYWNjZXB0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlKCk7XHJcbiAgICB9LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIG1vZGFsTG9hZGluZ1RleHQsIG1vZGFsQ2FuY2VsVGV4dCwgbW9kYWxDb25maXJtVGV4dCwgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtIH0gPVxyXG4gICAgdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZSh7XHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG1vZGFsRXJyb3IsXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgIH0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFzaGVldFN5bmNCbG9ja2VkIHx8IGJ1c3kpIHJldHVybjtcclxuICAgIGlmICghc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSkgcmV0dXJuO1xyXG4gICAgaWYgKHN0YXR1cyA9PT0gc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSkgcmV0dXJuO1xyXG4gICAgc2V0U3RhdHVzKHNoZWV0V29ya2Zsb3dCbG9ja01lc3NhZ2UpO1xyXG4gIH0sIFtidXN5LCBzZXRTdGF0dXMsIHNoZWV0V29ya2Zsb3dCbG9ja01lc3NhZ2UsIHNoZWV0U3luY0Jsb2NrZWQsIHN0YXR1c10pO1xyXG5cclxuICBjb25zdCBpc0Fzc2lnbmVkVGlja2V0ID0gaGVhZGVyPy5zdGF0dXMgPT09IDE7XG4gIGNvbnN0IGlzQ29udGV4dExvY2tlZCA9IChpc0Fzc2lnbmVkVGlja2V0ICYmICFhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0KSB8fCAoISFsaW5rZWRFeHBlbnNlU2hlZXRJZCAmJiBsaW5rU2hlZXRMb2NrZWQpO1xuICBjb25zdCBjYW5FZGl0VGlja2V0SW5Db250ZXh0ID0gY2FuRWRpdFRpY2tldCAmJiBjYW5FZGl0TGlua2VkVGlja2V0ICYmICghaXNGcm9tU2hlZXRMaW5rIHx8IGNhbkVkaXRGcm9tU2hlZXRMaW5rRmFpbHVyZSk7XG4gIGNvbnN0IGNhbkNyZWF0ZVRpY2tldExpbmVJbkNvbnRleHQgPSBjYW5FZGl0VGlja2V0SW5Db250ZXh0ICYmICFpc0Zyb21TaGVldExpbmsgJiYgIWlzQ29udGV4dExvY2tlZCAmJiAhc2hlZXRTeW5jQmxvY2tlZDtcbiAgY29uc3QgY2FuRGVsZXRlVGlja2V0SW5Db250ZXh0ID0gY2FuRGVsZXRlVGlja2V0ICYmIGNhbkVkaXRMaW5rZWRUaWNrZXQgJiYgIWlzRnJvbVNoZWV0TGluaztcclxuICBjb25zdCBjYW5EZWxldGVVbmxpbmtlZFRpY2tldEFmdGVyU3luY0Vycm9yID1cbiAgICBwZW5kaW5nRmlyc3RMaW5rICYmXG4gICAgc2hlZXRTeW5jQmxvY2tlZCAmJlxuICAgIGNhbkRlbGV0ZVRpY2tldEluQ29udGV4dCAmJlxuICAgICEhc2FmZVRleHQoZmlsZUlkKSAmJlxuICAgICEhaGVhZGVyICYmXG4gICAgIXNhZmVUZXh0KGhlYWRlci5ob2phR2FzdG9zSWREaXNwbGF5KTtcbiAgLy8gSGFyZCBibG9ja2luZyBpcyBsaW1pdGVkIHRvIGVkaXQgb3IgbmV3bHkgY3JlYXRlZCByZWNvdmVyeSBmbG93czsgcmVhZC1vbmx5IHN5bmMgZXJyb3JzIG11c3Qgc3RheSBuYXZpZ2FibGUuXG4gIGNvbnN0IHNob3VsZEhhcmRCbG9ja1dvcmtmbG93RXhpdCA9IHBlbmRpbmdGaXJzdExpbmsgfHwgKHNoZWV0U3luY0Jsb2NrZWQgJiYgaXNFZGl0aW5nKTtcbiAgY29uc3QgaGFzTmF2aWdhdGlvbkd1YXJkID0gYnVzeSB8fCBpc0VkaXRpbmcgfHwgc2hvdWxkSGFyZEJsb2NrV29ya2Zsb3dFeGl0O1xuICBjb25zdCBuYXZpZ2F0aW9uR3VhcmRNZXNzYWdlID0gc2hvdWxkSGFyZEJsb2NrV29ya2Zsb3dFeGl0ID8gc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSA6IHVuZGVmaW5lZDtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaGFzTmF2aWdhdGlvbkd1YXJkKSB7XG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKHtcbiAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgIG1lc3NhZ2U6IG5hdmlnYXRpb25HdWFyZE1lc3NhZ2UsXG4gICAgICBibG9jazogc2hvdWxkSGFyZEJsb2NrV29ya2Zsb3dFeGl0LFxuICAgIH0pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcbiAgICB9O1xuICB9LCBbaGFzTmF2aWdhdGlvbkd1YXJkLCBuYXZpZ2F0aW9uR3VhcmRNZXNzYWdlLCBzaG91bGRIYXJkQmxvY2tXb3JrZmxvd0V4aXRdKTtcblxyXG4gIHVzZUV4cGVuc2VUaWNrZXRUb3BiYXJCYWNrTG9jayh7XG4gICAgbG9ja2VkOiBzaG91bGRIYXJkQmxvY2tXb3JrZmxvd0V4aXQsXG4gICAgbWVzc2FnZTogc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSxcbiAgfSk7XG4gIGNvbnN0IHRpY2tldFRvcGJhckFjdGlvbk1vZGU6IFwiZGVmYXVsdFwiIHwgXCJzYXZlX29ubHlcIiB8IFwic2F2ZV9kZWxldGVcIiB8IFwidmlld19vbmx5XCIgPVxyXG4gICAgcGVuZGluZ0ZpcnN0TGluayAmJiBpc0VkaXRpbmdcclxuICAgICAgPyBjYW5EZWxldGVVbmxpbmtlZFRpY2tldEFmdGVyU3luY0Vycm9yXHJcbiAgICAgICAgPyBcInNhdmVfZGVsZXRlXCJcclxuICAgICAgICA6IFwic2F2ZV9vbmx5XCJcclxuICAgICAgOiAhY2FuRWRpdFRpY2tldEluQ29udGV4dCAmJiAhY2FuRGVsZXRlVGlja2V0SW5Db250ZXh0XHJcbiAgICAgICAgPyBcInZpZXdfb25seVwiXHJcbiAgICAgICAgOiBcImRlZmF1bHRcIjtcclxuXHJcbiAgdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMoe1xyXG4gICAgYnVzeSxcclxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzTG9ja2VkOiBpc0NvbnRleHRMb2NrZWQsXHJcbiAgICBpc0RlbGV0ZUxvY2tlZDogY2FuRGVsZXRlVW5saW5rZWRUaWNrZXRBZnRlclN5bmNFcnJvciA/IGZhbHNlIDogdW5kZWZpbmVkLFxyXG4gICAgYWN0aW9uTW9kZTogdGlja2V0VG9wYmFyQWN0aW9uTW9kZSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHk6IG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICAgIGNhbkVkaXRUaWNrZXQ6IGNhbkVkaXRUaWNrZXRJbkNvbnRleHQsXHJcbiAgICBjYW5EZWxldGVUaWNrZXQ6IGNhbkRlbGV0ZVRpY2tldEluQ29udGV4dCxcclxuICAgIGZpbGVJZCxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0OiBoYW5kbGVFbmFibGVFZGl0SW5Db250ZXh0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdDogaGFuZGxlQ2FuY2VsRWRpdEluQ29udGV4dCxcclxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICAgIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgaWYgKChpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUgfHwgaXNGcm9tRXhwZW5zZUxpbmUpICYmIGxpbmtlZEV4cGVuc2VTaGVldElkKSB7XHJcbiAgICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xyXG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsKGxpbmtlZEV4cGVuc2VTaGVldElkKSwge1xyXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdm9pZCByZWxvYWREZXRhaWwoKTtcclxuICAgIH0sXHJcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgaWYgKHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQpIHtcclxuICAgICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XHJcbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwodGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkKSwge1xyXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbWFya1Jlc2V0RmlsdGVyc1JldHVybigpO1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvVGlja2V0c1wiLCB7XHJcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBvcGVuQ3JlYXRlTGluZURldGFpbCwgb3BlbkxpbmVEZXRhaWwsIHJlc29sdmVDbGlja2FibGVDYXJkLCBvcGVuRmlsZSwgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCB9ID1cclxuICAgIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMoe1xyXG4gICAgYnVzeSxcclxuICAgIGZpbGVJZCxcbiAgICBjb250ZXh0U2hlZXRJZDogbGlua2VkRXhwZW5zZVNoZWV0SWQsXG4gICAgaXNGcm9tU2hlZXRMaW5rLFxuICAgIGhlYWRlckV4cGVuc2VTaGVldElkOiBzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZERpc3BsYXkpLFxuICAgIGlzRWRpdGluZyxcbiAgICBjYW5PcGVuU2F2ZUNvbmZpcm0sXG4gICAgaGFuZGxlUGVyc2lzdEhlYWRlckRyYWZ0LFxuICAgIGJ5cGFzc1dvcmtmbG93R3VhcmQ6IHNob3VsZEhhcmRCbG9ja1dvcmtmbG93RXhpdCxcbiAgICBsaW5lQ29udGFpbmVyUmVmLFxuICAgIG9wZW5QcmV2aWV3LFxuICAgIHRpY2tldFJldHVybkNvbnRleHQsXG4gIH0pO1xuXHJcbiAgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyh7XHJcbiAgICBjb250YWluZXJSZWY6IGxpbmVDb250YWluZXJSZWYsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBpdGVtczogdmlzaWJsZUxpbmVzLFxyXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGRldGFpbFZpZXcgPSBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlVmlld01vZGVsKHtcclxuICAgIG1vZGFsQXJnczoge1xyXG4gICAgICBtb2RhbCxcclxuICAgICAgbW9kYWxDb25maXJtVGV4dCxcclxuICAgICAgbW9kYWxDYW5jZWxUZXh0LFxyXG4gICAgICBtb2RhbExvYWRpbmdUZXh0LFxyXG4gICAgICBidXN5LFxyXG4gICAgICBtb2RhbEVycm9yLFxyXG4gICAgICBzdGF0dXMsXHJcbiAgICAgIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcclxuICAgICAgY2xvc2VDb25maXJtLFxyXG4gICAgfSxcclxuICAgIHByZXZpZXdBcmdzOiB7XHJcbiAgICAgIHByZXZpZXdPcGVuLFxyXG4gICAgICBwcmV2aWV3QnVzeSxcclxuICAgICAgcHJldmlld0Vycm9yLFxyXG4gICAgICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgICAgIHByZXZpZXdBbHRUZXh0LFxyXG4gICAgICBwcmV2aWV3U2NhbGUsXHJcbiAgICAgIHByZXZpZXdUcmFuc2xhdGUsXHJcbiAgICAgIHByZXZpZXdTdXJmYWNlUmVmLFxyXG4gICAgICBjbG9zZVByZXZpZXcsXHJcbiAgICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcclxuICAgICAgaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlLFxyXG4gICAgICBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxuICAgIH0sXHJcbiAgICBjb250ZW50QXJnczoge1xyXG4gICAgICBpc0xvYWRpbmcsXHJcbiAgICAgIGVycm9yTWVzc2FnZSxcclxuICAgICAgaGVhZGVyLFxyXG4gICAgICBzaG93U3RpY2t5UHJldmlldyxcclxuICAgICAgcHJldmlld0J1c3ksXHJcbiAgICAgIHByZXZpZXdFcnJvcixcclxuICAgICAgcHJldmlld0ltYWdlVXJsLFxyXG4gICAgICBwcmV2aWV3QWx0VGV4dCxcclxuICAgICAgb3BlbkZpbGUsXHJcbiAgICAgIHN0YXR1c0xhYmVsLFxyXG4gICAgICBnYXN0b1R5cGVMYWJlbCxcclxuICAgICAgdG90YWxBbW91bnRUZXh0LFxyXG4gICAgICB0cmFuc0RhdGVUZXh0LFxyXG4gICAgICB0aWNrZXRUaW1lVGV4dCxcclxuICAgICAgaXNFZGl0aW5nLFxyXG4gICAgICBnYXN0b1R5cGVPcHRpb25zLFxyXG4gICAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgICBkZXNjcmlwdGlvbkludmFsaWQsXHJcbiAgICAgIGRlc2NyaXB0aW9uSW5wdXRSZWYsXHJcbiAgICAgIGRyYWZ0R2FzdG9UeXBlLFxyXG4gICAgICBnYXN0b1R5cGVJbnZhbGlkLFxyXG4gICAgICBnYXN0b1R5cGVJbnB1dFJlZixcclxuICAgICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICAgIGN1cnJlbmN5Q29kZUludmFsaWQsXHJcbiAgICAgIGN1cnJlbmN5SW5wdXRSZWYsXHJcbiAgICAgIGRyYWZ0VG90YWxBbW91bnQsXHJcbiAgICAgIHRvdGFsQW1vdW50SW52YWxpZCxcclxuICAgICAgdG90YWxBbW91bnRJbnB1dFJlZixcclxuICAgICAgZHJhZnRBbW91bnRNU1QsXHJcbiAgICAgIGFtb3VudE1TVEludmFsaWQsXHJcbiAgICAgIGFtb3VudE1TVElucHV0UmVmLFxyXG4gICAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgICAgZXhjaGFuZ2VSYXRlSW52YWxpZCxcclxuICAgICAgZXhjaGFuZ2VSYXRlSW5wdXRSZWYsXHJcbiAgICAgIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlLFxyXG4gICAgICBsb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICAgIGRyYWZ0VGlja2V0VGltZSxcclxuICAgICAgZHJhZnRVcmxGaWxlLFxyXG4gICAgICBkcmFmdEZpbGVOYW1lLFxyXG4gICAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgICBzZXREcmFmdEdhc3RvVHlwZSxcclxuICAgICAgc2V0RHJhZnRDdXJyZW5jeUNvZGU6IGhhbmRsZVRpY2tldEN1cnJlbmN5Q29kZUNoYW5nZSxcclxuICAgICAgc2V0RHJhZnRUb3RhbEFtb3VudCxcclxuICAgICAgc2V0RHJhZnRBbW91bnRNU1Q6IGhhbmRsZVRpY2tldEFtb3VudE1TVENoYW5nZSxcclxuICAgICAgc2V0RHJhZnRFeGNoYW5nZVJhdGU6IGhhbmRsZVRpY2tldEV4Y2hhbmdlUmF0ZUNoYW5nZSxcclxuICAgICAgY29tbWl0RHJhZnRFeGNoYW5nZVJhdGU6IGhhbmRsZVRpY2tldEV4Y2hhbmdlUmF0ZUNvbW1pdCxcclxuICAgICAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gICAgICBsaW5rZWRMaW5lOiB7XHJcbiAgICAgICAgdmlzaWJsZTogaXNGcm9tRXhwZW5zZUxpbmUsXHJcbiAgICAgICAgcHJvamVjdElkOiBsaW5rZWRTaGVldExpbmUuZHJhZnRQcm9qZWN0SWQsXHJcbiAgICAgICAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogbGlua2VkU2hlZXRMaW5lLmRyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgICAgICBpc0xvYWRpbmc6IGxpbmtlZFNoZWV0TGluZS5pc0xvYWRpbmcsXHJcbiAgICAgICAgZXJyb3JNZXNzYWdlOiBsaW5rZWRTaGVldExpbmUuZXJyb3JNZXNzYWdlLFxyXG4gICAgICAgIGRpc2FibGVkOiBidXN5IHx8IGlzQ29udGV4dExvY2tlZCB8fCBsaW5rZWRTaGVldExpbmUuaXNMb2FkaW5nLFxyXG4gICAgICAgIG9uUHJvamVjdElkQ2hhbmdlOiBsaW5rZWRTaGVldExpbmUuc2V0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICAgICAgb25SZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlOiBsaW5rZWRTaGVldExpbmUuc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgICB9LFxyXG4gICAgICBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0LFxyXG4gICAgICB2aXNpYmxlTGluZXMsXHJcbiAgICAgIHRvdGFsTGluZVBhZ2VzLFxyXG4gICAgICBsaW5lUGFnZSxcclxuICAgICAgc2FmZUN1cnJlbmN5Q29kZTogaXNFZGl0aW5nID8gZHJhZnRDdXJyZW5jeUNvZGUgOiBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSksXHJcbiAgICAgIHBhZ2luYXRpb25MYWJlbHMsXHJcbiAgICAgIGxpbmVDb250YWluZXJSZWYsXHJcbiAgICAgIHNldExpbmVQYWdlLFxyXG4gICAgICBvcGVuTGluZURldGFpbCxcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5kZXRhaWxWaWV3LFxyXG4gICAgY2FuU2hvd0NyZWF0ZUxpbmVGYWI6IGNhbkNyZWF0ZVRpY2tldExpbmVJbkNvbnRleHQgJiYgIWlzTG9hZGluZyAmJiAhZXJyb3JNZXNzYWdlICYmICEhc2FmZVRleHQoZmlsZUlkKSAmJiAhIWhlYWRlcixcclxuICAgIGlzQ3JlYXRlTGluZUZhYkRpc2FibGVkOiBidXN5IHx8ICFoZWFkZXIsXHJcbiAgICBvcGVuQ3JlYXRlTGluZURldGFpbCxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgRXhwZW5zZVRpY2tldERldGFpbFBhZ2VDb250ZW50ID0gKCkgPT4ge1xyXG4gIGNvbnN0IGRldGFpbFZpZXcgPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUGFnZVZpZXdNb2RlbCgpO1xyXG4gIGNvbnN0IGZhYk1lbnVJdGVtcyA9IHVzZU1lbW88RmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbVtdPihcclxuICAgICgpID0+IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiBcIm5ldy10aWNrZXQtbGluZVwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfTmV3TGluZVwiLCBcIk51ZXZhIExpbmVhXCIpLFxyXG4gICAgICAgIGljb246IDxOZXdMaW5lSWNvbiAvPixcclxuICAgICAgICBvbkNsaWNrOiAoKSA9PiB7XHJcbiAgICAgICAgICB2b2lkIGRldGFpbFZpZXcub3BlbkNyZWF0ZUxpbmVEZXRhaWwoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpc2FibGVkOiBkZXRhaWxWaWV3LmlzQ3JlYXRlTGluZUZhYkRpc2FibGVkLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICAgIFtkZXRhaWxWaWV3XVxyXG4gICk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8RXhwZW5zZVRpY2tldERldGFpbFZpZXcgbW9kYWw9e2RldGFpbFZpZXcubW9kYWx9IHByZXZpZXc9e2RldGFpbFZpZXcucHJldmlld30gY29udGVudD17ZGV0YWlsVmlldy5jb250ZW50fSAvPlxyXG4gICAgICB7ZGV0YWlsVmlldy5jYW5TaG93Q3JlYXRlTGluZUZhYiA/IChcclxuICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b25cclxuICAgICAgICAgIGFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0FjdGlvbnNcIiwgXCJBY2Npb25lcyByYXBpZGFzXCIpfVxyXG4gICAgICAgICAgc2l6ZT17NzZ9XHJcbiAgICAgICAgICByaWdodD17MTZ9XHJcbiAgICAgICAgICBib3R0b209ezI0fVxyXG4gICAgICAgICAgbWVudUFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0FjdGlvbnNcIiwgXCJBY2Npb25lcyByYXBpZGFzXCIpfVxyXG4gICAgICAgICAgbWVudUl0ZW1zPXtmYWJNZW51SXRlbXN9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuLy8gTWFpbiBwYWdlIGVudHJ5IGZvciBleHBlbnNlIHRpY2tldCBkZXRhaWwuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnMgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQ+XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0RGV0YWlsUGFnZUNvbnRlbnQgLz5cclxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XHJcbiAgKTtcclxufTtcclxuXHJcbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xyXG4gIGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoKCk7XHJcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtcm9vdFwiKTtcclxuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xyXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVRpY2tldERldGFpbFBhZ2UgLz4pO1xyXG59O1xyXG5cclxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0RGV0YWlsUGFnZTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0IH0gZnJvbSBcIi4uLy4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50cy9leHBlbnNlR2FzdG9UeXBlQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyBleGVjdXRlRXhwZW5zZU11dGF0aW9uLCBwYXJzZURlY2ltYWxJbnB1dCB9IGZyb20gXCIuLi8uLi9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGRlbGV0ZUV4cGVuc2VTaGVldExpbmUsXHJcbiAgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0LFxyXG4gIGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldEZpbGUsXHJcbiAgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwsXHJcbiAgdXBkYXRlRXhwZW5zZVNoZWV0VGlja2V0LFxyXG59IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UsIHRvRXhwZW5zZUFwaURkTW1ZeXl5IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgc3luY0V4cGVuc2VMaW5rZWRUaWNrZXRTaGVldExpbmUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUxpbmtlZFRpY2tldFNoZWV0U3luYy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGlzRXhwZW5zZUxpbmVGb3JlaWduQ3VycmVuY3ksXHJcbiAgcmVzb2x2ZUV4cGVuc2VMaW5lQW1vdW50TVNURm9yQ3VycmVuY3lQYXlsb2FkLFxyXG4gIHJlc29sdmVFeHBlbnNlTGluZUV4Y2hhbmdlUmF0ZUZvckN1cnJlbmN5LFxyXG59IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTGluZUN1cnJlbmN5LnRzXCI7XHJcbmltcG9ydCB7IHJlc29sdmVFeHBlbnNlU2hlZXRFZGl0QWNjZXNzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VTaGVldEVkaXRBY2Nlc3MudHNcIjtcclxuaW1wb3J0IHsgY2xlYXJFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUsIHNhdmVFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIERlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCA9IHtcbiAgc2hlZXRJZDogc3RyaW5nO1xuICBsaW5lUmVjSWQ6IHN0cmluZztcbn07XG5cbi8vIERlZmluZXMgd2hldGhlciBhIHRpY2tldCBzYXZlIG1heSBzeW5jaHJvbml6ZSBpdHMgZXhwZW5zZS1zaGVldCBsaW5lLlxuZXhwb3J0IHR5cGUgRXhwZW5zZVRpY2tldFNhdmVTdHJhdGVneSA9IFwidGlja2V0LW9ubHlcIiB8IFwidGlja2V0LWFuZC1zaGVldC1saW5lXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9uc0FyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGNhbkVkaXRUaWNrZXQ6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlVGlja2V0OiBib29sZWFuO1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcclxuICBkcmFmdEdhc3RvVHlwZTogc3RyaW5nO1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRUb3RhbEFtb3VudDogc3RyaW5nO1xyXG4gIGRyYWZ0QW1vdW50TVNUOiBzdHJpbmc7XHJcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcclxuICBsb2NhbEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgZHJhZnRUaWNrZXRUaW1lOiBzdHJpbmc7XHJcbiAgZHJhZnRDb21lbnRhcmlvOiBzdHJpbmc7XG4gIGRyYWZ0VXJsRmlsZTogc3RyaW5nO1xuICBkcmFmdEZpbGVOYW1lOiBzdHJpbmc7XG4gIHNhdmVTdHJhdGVneTogRXhwZW5zZVRpY2tldFNhdmVTdHJhdGVneTtcbiAgbGlua2VkRXhwZW5zZVNoZWV0SWQ/OiBzdHJpbmc7XG4gIGxpbmtlZEV4cGVuc2VMaW5lUmVjSWQ/OiBzdHJpbmc7XHJcbiAgbGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWQ/OiBzdHJpbmc7XHJcbiAgbGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWRDaGFuZ2VkPzogYm9vbGVhbjtcclxuICBsaW5rZWRFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2U/OiBudW1iZXIgfCBudWxsO1xyXG4gIGxpbmtlZEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZWQ/OiBib29sZWFuO1xyXG4gIGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dD86IERlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCB8IG51bGw7XHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcclxuICBjYW5NYW5hZ2VPdGhlclVzZXJzOiBib29sZWFuO1xyXG4gIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nO1xyXG4gIGN1cnJlbnRDcm1Vc2VySWQ6IHN0cmluZztcclxuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQ6IHN0cmluZztcclxuICBvbkxpbmtlZFNoZWV0U3luY0ZhaWx1cmU/OiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uTGlua2VkU2hlZXRTeW5jU3VjY2Vzcz86ICgpID0+IHZvaWQ7XHJcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0QnVzeTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbn07XHJcblxyXG4vLyBUcmllcyB0byBpbmZlciBhIHNhZmUgZXh0ZW5zaW9uIGZvciB1cGRhdGUgcGF5bG9hZCBmcm9tIGZpbGUgbmFtZSBvciBVUkwuXHJcbmNvbnN0IHJlc29sdmVUaWNrZXRGaWxlRXh0ZW5zaW9uID0gKGZpbGVOYW1lOiBzdHJpbmcsIHVybEZpbGU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgY29uc3Qgc291cmNlID0gU3RyaW5nKGZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSB8fCBTdHJpbmcodXJsRmlsZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgY29uc3QgbWF0Y2ggPSBzb3VyY2UubWF0Y2goL1xcLihbYS16QS1aMC05XXsxLDEwfSkoPzokfFs/I10pLyk7XHJcbiAgaWYgKCFtYXRjaCB8fCAhbWF0Y2hbMV0pIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgcmV0dXJuIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XHJcbn07XHJcblxyXG5jb25zdCBpc05vdEZvdW5kRXJyb3IgPSAoZXJyb3I6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDA0O1xyXG59O1xyXG5cclxuY29uc3QgaXNNaXNzaW5nVGlja2V0RmlsZU1lc3NhZ2UgPSAobWVzc2FnZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcobWVzc2FnZSB8fCBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhcmNoaXZvIGFzb2NpYWRvXCIpIHx8XHJcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXJjaGl2byBhZGp1bnRvXCIpIHx8XHJcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXNzb2NpYXRlZCBmaWxlXCIpIHx8XHJcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXR0YWNoZWQgZmlsZVwiKVxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBFbmNhcHN1bGF0ZXMgdXBkYXRlIGFuZCBkZWxldGUgbXV0YXRpb25zIGZvciB0aWNrZXQgaGVhZGVyIGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGNhbkVkaXRUaWNrZXQsXHJcbiAgY2FuRGVsZXRlVGlja2V0LFxyXG4gIGZpbGVJZCxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRyYWZ0R2FzdG9UeXBlLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0VG90YWxBbW91bnQsXHJcbiAgZHJhZnRBbW91bnRNU1QsXHJcbiAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgbG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgZHJhZnRUaWNrZXRUaW1lLFxyXG4gIGRyYWZ0Q29tZW50YXJpbyxcbiAgZHJhZnRVcmxGaWxlLFxuICBkcmFmdEZpbGVOYW1lLFxuICBzYXZlU3RyYXRlZ3ksXG4gIGxpbmtlZEV4cGVuc2VTaGVldElkLFxuICBsaW5rZWRFeHBlbnNlTGluZVJlY0lkLFxyXG4gIGxpbmtlZEV4cGVuc2VMaW5lUHJvamVjdElkLFxyXG4gIGxpbmtlZEV4cGVuc2VMaW5lUHJvamVjdElkQ2hhbmdlZCA9IGZhbHNlLFxyXG4gIGxpbmtlZEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICBsaW5rZWRFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2VkID0gZmFsc2UsXHJcbiAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0LFxyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICBjdXJyZW50QXhVc2VySWQsXHJcbiAgY3VycmVudENybVVzZXJJZCxcclxuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlLFxyXG4gIG9uTGlua2VkU2hlZXRTeW5jU3VjY2VzcyxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIHNldEJ1c3ksXHJcbiAgc2V0U3RhdHVzLFxyXG4gIHNldElzRWRpdGluZyxcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9uc0FyZ3MpID0+IHtcclxuICBjb25zdCB2YWxpZGF0ZUxpbmtlZFNoZWV0QmVmb3JlTXV0YXRpb24gPSB1c2VDYWxsYmFjayhhc3luYyAoKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiA9PiB7XHJcbiAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KGxpbmtlZEV4cGVuc2VTaGVldElkKTtcclxuICAgIGlmICghc2FmZVNoZWV0SWQpIHtcclxuICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWNjZXNzUmVzdWx0ID0gYXdhaXQgcmVzb2x2ZUV4cGVuc2VTaGVldEVkaXRBY2Nlc3Moe1xyXG4gICAgICBzaGVldElkOiBzYWZlU2hlZXRJZCxcclxuICAgICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICBpZiAoIWFjY2Vzc1Jlc3VsdC5pc0xvY2tlZCkge1xyXG4gICAgICByZXR1cm4gc2FmZVNoZWV0SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWVzc2FnZSA9XHJcbiAgICAgIHNhZmVUZXh0KGFjY2Vzc1Jlc3VsdC5ibG9ja2VkTWVzc2FnZSkgfHxcclxuICAgICAgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1JlYWRPbmx5QnlTdGF0dXNcIiwgXCJObyBzZSBwdWVkZSBlZGl0YXIgZXN0YSBob2phIGRlIGdhc3RvcyBlbiBlbCBlc3RhZG8gYWN0dWFsLlwiKTtcclxuICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9LCBbXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgXSk7XHJcblxyXG4gIGNvbnN0IHJ1bkhlYWRlclVwZGF0ZSA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jICh7XG4gICAgICBzeW5jU2hlZXRMaW5lLFxuICAgICAgY29udGludWVPblNoZWV0U3luY0ZhaWx1cmUgPSBmYWxzZSxcbiAgICB9OiB7XG4gICAgICBzeW5jU2hlZXRMaW5lOiBib29sZWFuO1xuICAgICAgY29udGludWVPblNoZWV0U3luY0ZhaWx1cmU/OiBib29sZWFuO1xuICAgIH0pOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcbiAgICAgIGlmIChidXN5IHx8ICFpc0VkaXRpbmcpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKCFjYW5FZGl0VGlja2V0KSB7XHJcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgbm9ybWFsaXplZERlc2NyaXB0aW9uID0gU3RyaW5nKGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpO1xyXG4gICAgICBpZiAoIW5vcm1hbGl6ZWREZXNjcmlwdGlvbikge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0Rlc2NyaXB0aW9uUmVxdWlyZWRcIiwgXCJEZXNjcmlwdGlvbiBpcyByZXF1aXJlZC5cIik7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3kgPSBTdHJpbmcoZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgIGlmICghbm9ybWFsaXplZEN1cnJlbmN5KSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fQ3VycmVuY3lSZXF1aXJlZFwiLCBcIkN1cnJlbmN5IGlzIHJlcXVpcmVkLlwiKTtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHBhcnNlZFRvdGFsQW1vdW50ID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRUb3RhbEFtb3VudCk7XHJcbiAgICAgIGlmIChwYXJzZWRUb3RhbEFtb3VudCA9PSBudWxsIHx8IHBhcnNlZFRvdGFsQW1vdW50IDwgMCkge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiVGlja2V0c19WYWxpZGF0aW9uX1RvdGFsQW1vdW50UmVxdWlyZWRcIiwgXCJUb3RhbCBhbW91bnQgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gMC5cIik7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwYXJzZWRBbW91bnRNU1QgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdEFtb3VudE1TVCk7XHJcbiAgICAgIGNvbnN0IHBhcnNlZEV4Y2hhbmdlUmF0ZSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0RXhjaGFuZ2VSYXRlKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZExvY2FsQ3VycmVuY3kgPSBzYWZlVGV4dChsb2NhbEN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKTtcclxuICAgICAgY29uc3QgcmVxdWlyZXNGb3JlaWduQ3VycmVuY3lTZXR0bGVtZW50ID0gaXNFeHBlbnNlTGluZUZvcmVpZ25DdXJyZW5jeShub3JtYWxpemVkQ3VycmVuY3ksIG5vcm1hbGl6ZWRMb2NhbEN1cnJlbmN5KTtcclxuICAgICAgY29uc3QgaGFzRm9yZWlnbkN1cnJlbmN5U2V0dGxlbWVudCA9XHJcbiAgICAgICAgIXJlcXVpcmVzRm9yZWlnbkN1cnJlbmN5U2V0dGxlbWVudCB8fFxyXG4gICAgICAgIChwYXJzZWRFeGNoYW5nZVJhdGUgIT0gbnVsbCAmJiBwYXJzZWRFeGNoYW5nZVJhdGUgPiAwKSB8fFxyXG4gICAgICAgIChwYXJzZWRBbW91bnRNU1QgIT0gbnVsbCAmJiBwYXJzZWRBbW91bnRNU1QgPiAwKTtcclxuICAgICAgaWYgKCFoYXNGb3JlaWduQ3VycmVuY3lTZXR0bGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXHJcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTGluZV9WYWxpZGF0aW9uX0ZvcmVpZ25DdXJyZW5jeVNldHRsZW1lbnRcIixcclxuICAgICAgICAgIFwiRm9yZWlnbiBjdXJyZW5jeSBsaW5lcyByZXF1aXJlIGFuIGV4Y2hhbmdlIHJhdGUgZ3JlYXRlciB0aGFuIDAgb3IgYSByZWltYnVyc2VtZW50IGFtb3VudC5cIlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwYXJzZWRHYXN0b1R5cGUgPSB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlKGRyYWZ0R2FzdG9UeXBlLCB7IGFsbG93Tm9uZTogZmFsc2UgfSk7XHJcbiAgICAgIGlmIChwYXJzZWRHYXN0b1R5cGUgPT09IG51bGwpIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIlRpY2tldHNfVmFsaWRhdGlvbl9DYXRlZ29yeVJlcXVpcmVkXCIsIFwiQ2F0ZWdvcnkgaXMgcmVxdWlyZWQuXCIpO1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmF3VHJhbnNEYXRlID0gU3RyaW5nKGRyYWZ0VHJhbnNEYXRlIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IHJhd1RyYW5zRGF0ZSA/IHRvRXhwZW5zZUFwaURkTW1ZeXl5KHJhd1RyYW5zRGF0ZSkgOiBcIlwiO1xyXG4gICAgICBpZiAocmF3VHJhbnNEYXRlICYmICFub3JtYWxpemVkVHJhbnNEYXRlKSB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICAgICAgICBzZXRTdGF0dXMoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB2YWxpZGF0ZWRTaGVldElkID0gc3luY1NoZWV0TGluZSA/IGF3YWl0IHZhbGlkYXRlTGlua2VkU2hlZXRCZWZvcmVNdXRhdGlvbigpIDogXCJcIjtcbiAgICAgIGlmICh2YWxpZGF0ZWRTaGVldElkID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcGF5bG9hZEFtb3VudE1TVCA9IHJlc29sdmVFeHBlbnNlTGluZUFtb3VudE1TVEZvckN1cnJlbmN5UGF5bG9hZChcclxuICAgICAgICBwYXJzZWRUb3RhbEFtb3VudCxcclxuICAgICAgICBwYXJzZWRBbW91bnRNU1QsXHJcbiAgICAgICAgbm9ybWFsaXplZEN1cnJlbmN5LFxyXG4gICAgICAgIG5vcm1hbGl6ZWRMb2NhbEN1cnJlbmN5XHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHBheWxvYWRFeGNoYW5nZVJhdGUgPSByZXNvbHZlRXhwZW5zZUxpbmVFeGNoYW5nZVJhdGVGb3JDdXJyZW5jeShcclxuICAgICAgICBub3JtYWxpemVkQ3VycmVuY3ksXHJcbiAgICAgICAgbm9ybWFsaXplZExvY2FsQ3VycmVuY3ksXHJcbiAgICAgICAgcGFyc2VkRXhjaGFuZ2VSYXRlXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3QgPSB7XHJcbiAgICAgICAgZGVzY3JpcHRpb246IG5vcm1hbGl6ZWREZXNjcmlwdGlvbixcclxuICAgICAgICBjdXJyZW5jeUNvZGU6IG5vcm1hbGl6ZWRDdXJyZW5jeSxcclxuICAgICAgICB0b3RhbEFtb3VudDogTnVtYmVyKHBhcnNlZFRvdGFsQW1vdW50KSxcclxuICAgICAgICBhbW91bnRNU1Q6IHBheWxvYWRBbW91bnRNU1QgPz8gdW5kZWZpbmVkLFxyXG4gICAgICAgIGV4Y2hSYXRlOiBwYXlsb2FkRXhjaGFuZ2VSYXRlID8/IHVuZGVmaW5lZCxcclxuICAgICAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWRUcmFuc0RhdGUgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIHRpY2tldERhdGU6IG5vcm1hbGl6ZWRUcmFuc0RhdGUgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIHRpY2tldFRpbWU6IHNhZmVUZXh0KGRyYWZ0VGlja2V0VGltZSkgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIGNvbWVudGFyaW86IFN0cmluZyhkcmFmdENvbWVudGFyaW8gfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICB1cmxGaWxlOiBTdHJpbmcoZHJhZnRVcmxGaWxlIHx8IFwiXCIpLnRyaW0oKSB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgZmlsZU5hbWU6IFN0cmluZyhkcmFmdEZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgZmlsZUV4dGVuc2lvbjogcmVzb2x2ZVRpY2tldEZpbGVFeHRlbnNpb24oZHJhZnRGaWxlTmFtZSwgZHJhZnRVcmxGaWxlKSxcclxuICAgICAgICBnYXN0b1R5cGU6IHBhcnNlZEdhc3RvVHlwZSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRpbmdcIiwgXCJVcGRhdGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxyXG4gICAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpLFxyXG4gICAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgICAgc2V0QnVzeSxcclxuICAgICAgICBzZXRTdGF0dXMsXHJcbiAgICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldChmaWxlSWQsIHBheWxvYWQpO1xyXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoc3luY1NoZWV0TGluZSAmJiB2YWxpZGF0ZWRTaGVldElkKSB7XG4gICAgICAgICAgICBsZXQgc2hlZXRTeW5jRmFpbHVyZU1lc3NhZ2UgPSBcIlwiO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3luY1BheWxvYWQgPSB7XG4gICAgICAgICAgICAgICAgZmlsZUlkLFxuICAgICAgICAgICAgICAgIHNoZWV0SWQ6IHZhbGlkYXRlZFNoZWV0SWQsXG4gICAgICAgICAgICAgICAgbGluZVJlY0lkOiBzYWZlVGV4dChsaW5rZWRFeHBlbnNlTGluZVJlY0lkKSB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBjdXJyZW5jeUNvZGVPdmVycmlkZTogbm9ybWFsaXplZEN1cnJlbmN5LFxyXG4gICAgICAgICAgICAgICAgYW1vdW50TVNUT3ZlcnJpZGU6IHBheWxvYWRBbW91bnRNU1QsXHJcbiAgICAgICAgICAgICAgICBleGNoYW5nZVJhdGVPdmVycmlkZTogcGF5bG9hZEV4Y2hhbmdlUmF0ZSA/PyB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAuLi4obGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWRDaGFuZ2VkXHJcbiAgICAgICAgICAgICAgICAgID8geyBwcm9qZWN0SWRPdmVycmlkZTogc2FmZVRleHQobGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWQpIH1cclxuICAgICAgICAgICAgICAgICAgOiB7fSksXHJcbiAgICAgICAgICAgICAgICAuLi4obGlua2VkRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlZFxyXG4gICAgICAgICAgICAgICAgICA/IHsgcmVpbWJ1cnNhYmxlRXhwZW5zZU92ZXJyaWRlOiBsaW5rZWRFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2UgfVxyXG4gICAgICAgICAgICAgICAgICA6IHt9KSxcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgIGF3YWl0IHN5bmNFeHBlbnNlTGlua2VkVGlja2V0U2hlZXRMaW5lKHN5bmNQYXlsb2FkKTtcclxuICAgICAgICAgICAgICBjbGVhckV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgIG9uTGlua2VkU2hlZXRTeW5jU3VjY2Vzcz8uKCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9XHJcbiAgICAgICAgICAgICAgICBlcnJvciBpbnN0YW5jZW9mIEVycm9yXHJcbiAgICAgICAgICAgICAgICAgID8gZXJyb3IubWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICA6IGluZFQoXHJcbiAgICAgICAgICAgICAgICAgICAgICBcIkV4cGVuc2VUaWNrZXRzX1NoZWV0U3luY19SZXRyeVJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBcIlRpY2tldCBkYXRhIGNoYW5nZWQsIGJ1dCB3ZSBjb3VsZCBub3Qgc3luYyB0aGUgZXhwZW5zZSBsaW5lLiBTYXZlIGFnYWluIGJlZm9yZSBsZWF2aW5nLlwiXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICBzYXZlRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKHtcbiAgICAgICAgICAgICAgICBmaWxlSWQsXG4gICAgICAgICAgICAgICAgc2hlZXRJZDogdmFsaWRhdGVkU2hlZXRJZCxcbiAgICAgICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlPy4obWVzc2FnZSk7XG4gICAgICAgICAgICAgIGlmICghY29udGludWVPblNoZWV0U3luY0ZhaWx1cmUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2hlZXRTeW5jRmFpbHVyZU1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNoZWV0U3luY0ZhaWx1cmVNZXNzYWdlKSB7XG4gICAgICAgICAgICAgIHNldFN0YXR1cyhzaGVldFN5bmNGYWlsdXJlTWVzc2FnZSk7XG4gICAgICAgICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgdXBkYXRlZFwiKSk7XG4gICAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIGNhbkVkaXRUaWNrZXQsXHJcbiAgICAgIGRyYWZ0Q29tZW50YXJpbyxcclxuICAgICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICAgIGRyYWZ0RmlsZU5hbWUsXHJcbiAgICAgIGRyYWZ0R2FzdG9UeXBlLFxyXG4gICAgICBkcmFmdEFtb3VudE1TVCxcclxuICAgICAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICAgIGRyYWZ0VG90YWxBbW91bnQsXHJcbiAgICAgIGRyYWZ0VGlja2V0VGltZSxcclxuICAgICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICAgIGRyYWZ0VXJsRmlsZSxcclxuICAgICAgZmlsZUlkLFxyXG4gICAgICBpc0VkaXRpbmcsXHJcbiAgICAgIGxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gICAgICBsaW5rZWRFeHBlbnNlTGluZVByb2plY3RJZCxcclxuICAgICAgbGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWRDaGFuZ2VkLFxyXG4gICAgICBsaW5rZWRFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbiAgICAgIGxpbmtlZEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZWQsXHJcbiAgICAgIGxpbmtlZEV4cGVuc2VMaW5lUmVjSWQsXG4gICAgICBvbkxpbmtlZFNoZWV0U3luY0ZhaWx1cmUsXG4gICAgICBvbkxpbmtlZFNoZWV0U3luY1N1Y2Nlc3MsXG4gICAgICBzZXRCdXN5LFxuICAgICAgc2V0SXNFZGl0aW5nLFxuICAgICAgc2V0TW9kYWxFcnJvcixcbiAgICAgIHNldFN0YXR1cyxcbiAgICAgIHZhbGlkYXRlTGlua2VkU2hlZXRCZWZvcmVNdXRhdGlvbixcbiAgICBdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlVXBkYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIHJldHVybiBydW5IZWFkZXJVcGRhdGUoe1xuICAgICAgc3luY1NoZWV0TGluZTogc2F2ZVN0cmF0ZWd5ID09PSBcInRpY2tldC1hbmQtc2hlZXQtbGluZVwiLFxuICAgIH0pO1xuICB9LCBbcnVuSGVhZGVyVXBkYXRlLCBzYXZlU3RyYXRlZ3ldKTtcblxuICBjb25zdCBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgLy8gT3BlbmluZyBhIHRpY2tldCBsaW5lIHNob3VsZCBwZXJzaXN0IGFsbCBwb3NzaWJsZSBsaW5rZWQtc2hlZXQgY2hhbmdlcywgYnV0XG4gICAgLy8gc2hlZXQgdmFsaWRhdGlvbiBmYWlsdXJlcyBtdXN0IG5vdCBwcmV2ZW50IHRoZSB1c2VyIGZyb20gZml4aW5nIHRoYXQgbGluZS5cbiAgICByZXR1cm4gcnVuSGVhZGVyVXBkYXRlKHtcbiAgICAgIHN5bmNTaGVldExpbmU6XG4gICAgICAgIHNhdmVTdHJhdGVneSA9PT0gXCJ0aWNrZXQtYW5kLXNoZWV0LWxpbmVcIiAmJlxuICAgICAgICAobGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWRDaGFuZ2VkIHx8XG4gICAgICAgICAgbGlua2VkRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlZCB8fFxuICAgICAgICAgICEhc2FmZVRleHQobGlua2VkRXhwZW5zZVNoZWV0SWQpKSxcbiAgICAgIGNvbnRpbnVlT25TaGVldFN5bmNGYWlsdXJlOiB0cnVlLFxuICAgIH0pO1xuICB9LCBbXG4gICAgbGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWRDaGFuZ2VkLFxuICAgIGxpbmtlZEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZWQsXG4gICAgbGlua2VkRXhwZW5zZVNoZWV0SWQsXG4gICAgcnVuSGVhZGVyVXBkYXRlLFxuICAgIHNhdmVTdHJhdGVneSxcbiAgXSk7XG5cclxuICBjb25zdCByZXNvbHZlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0ID0gdXNlQ2FsbGJhY2soYXN5bmMgKCk6IFByb21pc2U8RGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0IHwgbnVsbD4gPT4ge1xyXG4gICAgaWYgKGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCkge1xyXG4gICAgICByZXR1cm4gZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQobGlua2VkRXhwZW5zZVNoZWV0SWQpO1xyXG4gICAgaWYgKCFzYWZlU2hlZXRJZCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKHNhZmVTaGVldElkLCB7XHJcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2UuSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICAgIGNvbnN0IGRldGFpbCA9IGl0ZW1zLmZpbmQoKGVudHJ5KSA9PiBlbnRyeSAmJiB0eXBlb2YgZW50cnkgPT09IFwib2JqZWN0XCIpIHx8IG51bGw7XHJcbiAgICBjb25zdCBsaW5lcyA9IEFycmF5LmlzQXJyYXkoZGV0YWlsPy5MaW5lcykgPyBkZXRhaWwuTGluZXMgOiBbXTtcclxuICAgIGNvbnN0IG1hdGNoaW5nTGluZSA9IGxpbmVzLmZpbmQoKGxpbmUpID0+IHNhZmVUZXh0KGxpbmU/LkZpbGVJZCkgPT09IGZpbGVJZCk7XHJcbiAgICBjb25zdCBsaW5lUmVjSWQgPSBzYWZlVGV4dChtYXRjaGluZ0xpbmU/LlJlY0lkKTtcclxuXHJcbiAgICBpZiAoIWxpbmVSZWNJZCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzaGVldElkOiBzYWZlU2hlZXRJZCxcclxuICAgICAgbGluZVJlY0lkLFxyXG4gICAgfTtcclxuICB9LCBbZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0LCBmaWxlSWQsIGxpbmtlZEV4cGVuc2VTaGVldElkXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURlbGV0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWNhbkRlbGV0ZVRpY2tldCkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2YWxpZGF0ZWRTaGVldElkID0gYXdhaXQgdmFsaWRhdGVMaW5rZWRTaGVldEJlZm9yZU11dGF0aW9uKCk7XHJcbiAgICBpZiAodmFsaWRhdGVkU2hlZXRJZCA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxyXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUVycm9yXCIsIFwiRGVsZXRlIGVycm9yLlwiKSxcclxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBsaW5rZWRMaW5lQ29udGV4dCA9IGF3YWl0IHJlc29sdmVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQoKTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGRlbGV0ZUZpbGVSZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldEZpbGUoZmlsZUlkLCB7XHJcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBpZiAoIWRlbGV0ZUZpbGVSZXNwb25zZS5TdWNjZXNzICYmICFpc01pc3NpbmdUaWNrZXRGaWxlTWVzc2FnZShkZWxldGVGaWxlUmVzcG9uc2UuTWVzc2FnZSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRlbGV0ZUZpbGVSZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGlmICghaXNOb3RGb3VuZEVycm9yKGVycm9yKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0KGZpbGVJZCk7XHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxpbmtlZExpbmVDb250ZXh0KSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5lRGVsZXRlUmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRMaW5lKFxyXG4gICAgICAgICAgICAgIGxpbmtlZExpbmVDb250ZXh0LnNoZWV0SWQsXHJcbiAgICAgICAgICAgICAgbGlua2VkTGluZUNvbnRleHQubGluZVJlY0lkLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbGluZURlbGV0ZVJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobGluZURlbGV0ZVJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgLy8gVGhlIGxpbmtlZCBsaW5lIGNhbiBiZSBhdXRvLXJlbW92ZWQgYnkgYmFja2VuZCBjYXNjYWRlOyBrZWVwIGZsb3cgc3VjY2Vzc2Z1bCBpbiB0aGF0IGNhc2UuXHJcbiAgICAgICAgICAgIGlmICghaXNOb3RGb3VuZEVycm9yKGVycm9yKSkge1xyXG4gICAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IGRlbGV0ZWRcIikpO1xyXG4gICAgICAgIGlmICh2YWxpZGF0ZWRTaGVldElkKSB7XHJcbiAgICAgICAgICBjbGVhckV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZSgpO1xyXG4gICAgICAgICAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzPy4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xyXG4gIH0sIFtcclxuICAgIGJ1c3ksXHJcbiAgICBjYW5EZWxldGVUaWNrZXQsXHJcbiAgICBmaWxlSWQsXHJcbiAgICBvbkxpbmtlZFNoZWV0U3luY1N1Y2Nlc3MsXHJcbiAgICByZXNvbHZlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0LFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICB2YWxpZGF0ZUxpbmtlZFNoZWV0QmVmb3JlTXV0YXRpb24sXHJcbiAgXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zLnRzXCI7XHJcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XHJcbiAgaXNEZWxldGVMb2NrZWQ/OiBib29sZWFuO1xyXG4gIGFjdGlvbk1vZGU/OiBcImRlZmF1bHRcIiB8IFwiZGVsZXRlX29ubHlcIiB8IFwic2F2ZV9vbmx5XCIgfCBcInNhdmVfZGVsZXRlXCIgfCBcInZpZXdfb25seVwiO1xyXG4gIHBlcm1pc3Npb25zUmVhZHk/OiBib29sZWFuO1xyXG4gIGNhbkVkaXRUaWNrZXQ6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlVGlja2V0OiBib29sZWFuO1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcclxuICBjYW5PcGVuU2F2ZUNvbmZpcm0/OiAoKSA9PiBib29sZWFuO1xyXG4gIGhhbmRsZVVwZGF0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBoYW5kbGVEZWxldGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgb25TYXZlU3VjY2VzczogKCkgPT4gdm9pZDtcclxuICBvbkRlbGV0ZVN1Y2Nlc3M/OiAoKSA9PiB2b2lkO1xyXG4gIG9wZW5Db25maXJtOiAob3B0czoge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xyXG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcclxuICAgIG9uQ2FuY2VsPzogKCkgPT4gdm9pZDtcclxuICB9KSA9PiB2b2lkO1xyXG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIENvb3JkaW5hdGVzIHRvcGJhciBpY29uIHN0YXRlIGFuZCBkaXNwYXRjaCBhY3Rpb25zIGZvciB0aWNrZXQgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgbW9kYWxPcGVuLFxyXG4gIGlzRWRpdGluZyxcclxuICBpc0xvY2tlZCxcclxuICBpc0RlbGV0ZUxvY2tlZCxcclxuICBhY3Rpb25Nb2RlID0gXCJkZWZhdWx0XCIsXHJcbiAgcGVybWlzc2lvbnNSZWFkeSA9IHRydWUsXHJcbiAgY2FuRWRpdFRpY2tldCxcclxuICBjYW5EZWxldGVUaWNrZXQsXHJcbiAgZmlsZUlkLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICBoYW5kbGVVcGRhdGUsXHJcbiAgaGFuZGxlRGVsZXRlLFxyXG4gIG9uU2F2ZVN1Y2Nlc3MsXHJcbiAgb25EZWxldGVTdWNjZXNzLFxyXG4gIG9wZW5Db25maXJtLFxyXG4gIGNsb3NlQ29uZmlybSxcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnNBcmdzKSA9PiB7XHJcbiAgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zKHtcclxuICAgIGFjdGlvbkdyb3VwSWQ6IFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWFjdGlvbnNcIixcclxuICAgIGlkczoge1xyXG4gICAgICBlZGl0SWNvbklkOiBcImV4cGVuc2VUaWNrZXRFZGl0SWNvblwiLFxyXG4gICAgICBzYXZlSWNvbklkOiBcImV4cGVuc2VUaWNrZXRTYXZlSWNvblwiLFxyXG4gICAgICBkZWxldGVCdG5JZDogXCJleHBlbnNlVGlja2V0RGVsZXRlQnRuXCIsXHJcbiAgICAgIGNhbmNlbEJ0bklkOiBcImV4cGVuc2VUaWNrZXRDYW5jZWxCdG5cIixcclxuICAgIH0sXHJcbiAgICBldmVudHM6IHtcclxuICAgICAgZWRpdEV2ZW50OiBcImV4cGVuc2UtdGlja2V0LWRldGFpbC1lZGl0XCIsXHJcbiAgICAgIGRlbGV0ZUV2ZW50OiBcImV4cGVuc2UtdGlja2V0LWRldGFpbC1kZWxldGVcIixcclxuICAgICAgY2FuY2VsRXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWNhbmNlbC1lZGl0XCIsXHJcbiAgICB9LFxyXG4gICAgYnVzeSxcclxuICAgIG1vZGFsT3BlbixcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzQ3JlYXRlTW9kZTogZmFsc2UsXHJcbiAgICBpc0xvY2tlZCxcclxuICAgIGlzRGVsZXRlTG9ja2VkLFxyXG4gICAgYWN0aW9uTW9kZSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHksXHJcbiAgICBjYW5DcmVhdGU6IGZhbHNlLFxyXG4gICAgY2FuRWRpdDogY2FuRWRpdFRpY2tldCxcclxuICAgIGNhbkRlbGV0ZTogY2FuRGVsZXRlVGlja2V0LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlU2F2ZTogaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgc2F2ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiU2F2ZSBjaGFuZ2VzXCIpLFxyXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXHJcbiAgICBzYXZlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXHJcbiAgICBkZWxldGVDb25maXJtVGl0bGU6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9UaXRsZVwiLCBcIkRlbGV0ZVwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiQ29uZmlybV9EZWxldGVfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/XCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpLFxyXG4gICAgb25TYXZlU3VjY2VzcyxcclxuICAgIG9uRGVsZXRlU3VjY2Vzczogb25EZWxldGVTdWNjZXNzIHx8ICgoKSA9PiBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvVGlja2V0c1wiKSksXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZHVjZXIsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBEaXNwYXRjaCwgU2V0U3RhdGVBY3Rpb24gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0TGluZSB9IGZyb20gXCIuLi8uLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHtcclxuICBjYWxjdWxhdGVFeHBlbnNlTGluZUFtb3VudE1TVEZvckN1cnJlbmN5LFxyXG4gIGNhbGN1bGF0ZUV4cGVuc2VMaW5lRXhjaGFuZ2VSYXRlRm9yQ3VycmVuY3ksXHJcbiAgaXNFeHBlbnNlTGluZUZvcmVpZ25DdXJyZW5jeSxcclxuICBpc0V4cGVuc2VMaW5lU2FtZVJlaW1idXJzZW1lbnRDdXJyZW5jeSxcclxuICByZXNvbHZlRXhwZW5zZUxpbmVFeGNoYW5nZVJhdGVGb3JDdXJyZW5jeSxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUxpbmVDdXJyZW5jeS50c1wiO1xyXG5pbXBvcnQgeyB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50cy9leHBlbnNlR2FzdG9UeXBlQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyBwYXJzZUV4cGVuc2VEYXRlLCBzYWZlVGV4dCwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgYXJlRXhwZW5zZU51bWVyaWNJbnB1dHNFcXVpdmFsZW50LFxyXG4gIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcixcclxuICBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcblxyXG50eXBlIERyYWZ0U3RhdGUgPSB7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBnYXN0b1R5cGU6IHN0cmluZztcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICB0b3RhbEFtb3VudDogc3RyaW5nO1xyXG4gIGFtb3VudE1TVDogc3RyaW5nO1xyXG4gIGV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xyXG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIHRpY2tldFRpbWU6IHN0cmluZztcclxuICBjb21lbnRhcmlvOiBzdHJpbmc7XHJcbiAgdXJsRmlsZTogc3RyaW5nO1xyXG4gIGZpbGVOYW1lOiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEVkaXRvclN0YXRlID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIG1vZGFsRXJyb3I6IHN0cmluZztcclxuICBsaW5lUGFnZTogbnVtYmVyO1xyXG4gIGFtb3VudE1TVE1hbnVhbGx5RWRpdGVkOiBib29sZWFuO1xyXG4gIGRyYWZ0OiBEcmFmdFN0YXRlO1xyXG59O1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yQXJncyA9IHtcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xyXG4gIGxpbmtlZEV4cGVuc2VMaW5lPzogRXhwZW5zZVNoZWV0TGluZSB8IG51bGw7XHJcbiAgbG9jYWxDdXJyZW5jeUNvZGU/OiBzdHJpbmc7XHJcbiAgbGluZUNvdW50OiBudW1iZXI7XHJcbiAgcGFnZVNpemU6IG51bWJlcjtcclxuICBjYW5FZGl0VGlja2V0OiBib29sZWFuO1xuICBpc0xvYWRpbmc6IGJvb2xlYW47XG4gIGFsbG93QXNzaWduZWREcmFmdEVkaXQ6IGJvb2xlYW47XG4gIGlzU2hlZXRMaW5rUmVhZE9ubHk6IGJvb2xlYW47XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xufTtcblxyXG50eXBlIEVkaXRvckFjdGlvbiA9XHJcbiAgfCB7XHJcbiAgICAgIHR5cGU6IFwiaHlkcmF0ZV9mcm9tX2hlYWRlclwiO1xyXG4gICAgICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xyXG4gICAgICBsaW5rZWRFeHBlbnNlTGluZT86IEV4cGVuc2VTaGVldExpbmUgfCBudWxsO1xyXG4gICAgICBsb2NhbEN1cnJlbmN5Q29kZT86IHN0cmluZztcclxuICAgIH1cclxuICB8IHtcclxuICAgICAgdHlwZTogXCJwYXRjaF9zdGF0ZVwiO1xyXG4gICAgICBwYXRjaDogUGFydGlhbDxQaWNrPEVkaXRvclN0YXRlLCBcImJ1c3lcIiB8IFwic3RhdHVzXCIgfCBcImlzRWRpdGluZ1wiIHwgXCJtb2RhbEVycm9yXCIgfCBcImxpbmVQYWdlXCIgfCBcImFtb3VudE1TVE1hbnVhbGx5RWRpdGVkXCI+PjtcclxuICAgIH1cclxuICB8IHsgdHlwZTogXCJwYXRjaF9kcmFmdFwiOyBwYXRjaDogUGFydGlhbDxEcmFmdFN0YXRlPjsgYW1vdW50TVNUTWFudWFsbHlFZGl0ZWQ/OiBib29sZWFuIH1cclxuICB8IHsgdHlwZTogXCJzZXRfZHJhZnRfZmllbGRcIjsgZmllbGQ6IGtleW9mIERyYWZ0U3RhdGU7IHZhbHVlOiBzdHJpbmcgfTtcclxuXHJcbmNvbnN0IGNyZWF0ZUVtcHR5RHJhZnQgPSAoKTogRHJhZnRTdGF0ZSA9PiAoe1xyXG4gIGRlc2NyaXB0aW9uOiBcIlwiLFxyXG4gIGdhc3RvVHlwZTogXCJcIixcclxuICBjdXJyZW5jeUNvZGU6IFwiXCIsXHJcbiAgdG90YWxBbW91bnQ6IFwiXCIsXHJcbiAgYW1vdW50TVNUOiBcIlwiLFxyXG4gIGV4Y2hhbmdlUmF0ZTogXCJcIixcclxuICB0cmFuc0RhdGU6IFwiXCIsXHJcbiAgdGlja2V0VGltZTogXCJcIixcclxuICBjb21lbnRhcmlvOiBcIlwiLFxyXG4gIHVybEZpbGU6IFwiXCIsXHJcbiAgZmlsZU5hbWU6IFwiXCIsXHJcbn0pO1xyXG5cclxuY29uc3QgdG9JbnB1dERhdGUgPSAocmF3Pzogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBwYXJzZUV4cGVuc2VEYXRlKHJhdyk7XHJcbiAgcmV0dXJuIHBhcnNlZCA/IHRvSXNvRGF0ZShwYXJzZWQpIDogXCJcIjtcclxufTtcclxuXHJcbmNvbnN0IHRvSW5wdXRUaW1lID0gKHJhdz86IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSBzYWZlVGV4dChyYXcpO1xyXG4gIGlmICghdmFsdWUgfHwgdmFsdWUgPT09IFwiMFwiKSByZXR1cm4gXCJcIjtcclxuXHJcbiAgY29uc3Qgc2Vjb25kc1ZhbHVlID0gTnVtYmVyKHZhbHVlKTtcclxuICBpZiAoTnVtYmVyLmlzSW50ZWdlcihzZWNvbmRzVmFsdWUpICYmIHNlY29uZHNWYWx1ZSA+PSAwICYmIHNlY29uZHNWYWx1ZSA8PSA4NjM5OSkge1xyXG4gICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHNlY29uZHNWYWx1ZSAvIDM2MDApO1xyXG4gICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY29uZHNWYWx1ZSAlIDM2MDApIC8gNjApO1xyXG4gICAgY29uc3Qgc2Vjb25kcyA9IHNlY29uZHNWYWx1ZSAlIDYwO1xyXG4gICAgcmV0dXJuIFtob3VycywgbWludXRlcywgc2Vjb25kc10ubWFwKChlbnRyeSkgPT4gU3RyaW5nKGVudHJ5KS5wYWRTdGFydCgyLCBcIjBcIikpLmpvaW4oXCI6XCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbWF0Y2ggPSB2YWx1ZS5tYXRjaCgvXihcXGR7MSwyfSk6KFswLTVdXFxkKSg/OjooWzAtNV1cXGQpKT8kLyk7XHJcbiAgaWYgKCFtYXRjaCkgcmV0dXJuIFwiXCI7XHJcblxyXG4gIGNvbnN0IGhvdXJzID0gTnVtYmVyLnBhcnNlSW50KG1hdGNoWzFdIHx8IFwiXCIsIDEwKTtcclxuICBpZiAoIU51bWJlci5pc0ludGVnZXIoaG91cnMpIHx8IGhvdXJzIDwgMCB8fCBob3VycyA+IDIzKSByZXR1cm4gXCJcIjtcclxuXHJcbiAgcmV0dXJuIGAke1N0cmluZyhob3VycykucGFkU3RhcnQoMiwgXCIwXCIpfToke21hdGNoWzJdfToke21hdGNoWzNdIHx8IFwiMDBcIn1gO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplQ3VycmVuY3lDb2RlID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHNhZmVUZXh0KHZhbHVlKS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuY29uc3QgdG9GaW5pdGVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXRFZGl0YWJsZU1vbmV5ID0gKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKHZhbHVlLCB7XHJcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0RWRpdGFibGVFeGNoYW5nZVJhdGUgPSAodmFsdWU6IG51bWJlciB8IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIodmFsdWUsIHtcclxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogNyxcclxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogNyxcclxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgZmFsbGJhY2s6IFwiXCIsXHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEFtb3VudE1TVFBhdGNoRnJvbUV4Y2hhbmdlUmF0ZSA9IChcclxuICB0b3RhbEFtb3VudDogc3RyaW5nLFxyXG4gIGV4Y2hhbmdlUmF0ZTogc3RyaW5nLFxyXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nLFxyXG4gIHJlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGU6IHN0cmluZyxcclxuICBhbW91bnRNU1RNYW51YWxseUVkaXRlZDogYm9vbGVhblxyXG4pOiBQYXJ0aWFsPERyYWZ0U3RhdGU+ID0+IHtcclxuICBpZiAoYW1vdW50TVNUTWFudWFsbHlFZGl0ZWQgJiYgaXNFeHBlbnNlTGluZVNhbWVSZWltYnVyc2VtZW50Q3VycmVuY3koY3VycmVuY3lDb2RlLCByZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlKSkge1xyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGFyc2VkVG90YWxBbW91bnQgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQodG90YWxBbW91bnQpO1xyXG4gIGNvbnN0IHBhcnNlZEV4Y2hhbmdlUmF0ZSA9IHJlc29sdmVFeHBlbnNlTGluZUV4Y2hhbmdlUmF0ZUZvckN1cnJlbmN5KFxyXG4gICAgY3VycmVuY3lDb2RlLFxyXG4gICAgcmVpbWJ1cnNlbWVudEN1cnJlbmN5Q29kZSxcclxuICAgIHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChleGNoYW5nZVJhdGUpXHJcbiAgKTtcclxuICBjb25zdCBuZXh0QW1vdW50TVNUID1cclxuICAgIHBhcnNlZFRvdGFsQW1vdW50ICE9IG51bGxcclxuICAgICAgPyBjYWxjdWxhdGVFeHBlbnNlTGluZUFtb3VudE1TVEZvckN1cnJlbmN5KFxyXG4gICAgICAgICAgcGFyc2VkVG90YWxBbW91bnQsXHJcbiAgICAgICAgICBwYXJzZWRFeGNoYW5nZVJhdGUsXHJcbiAgICAgICAgICBjdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICByZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlXHJcbiAgICAgICAgKVxyXG4gICAgICA6IG51bGw7XHJcblxyXG4gIHJldHVybiBuZXh0QW1vdW50TVNUICE9IG51bGwgPyB7IGFtb3VudE1TVDogZm9ybWF0RWRpdGFibGVNb25leShuZXh0QW1vdW50TVNUKSB9IDoge307XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEV4Y2hhbmdlUmF0ZVBhdGNoRnJvbUFtb3VudE1TVCA9IChcclxuICB0b3RhbEFtb3VudDogc3RyaW5nLFxyXG4gIGFtb3VudE1TVDogc3RyaW5nLFxyXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nLFxyXG4gIHJlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGU6IHN0cmluZyxcclxuICBjdXJyZW50RXhjaGFuZ2VSYXRlOiBzdHJpbmdcclxuKTogUGFydGlhbDxEcmFmdFN0YXRlPiA9PiB7XHJcbiAgY29uc3QgcGFyc2VkVG90YWxBbW91bnQgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQodG90YWxBbW91bnQpO1xyXG4gIGNvbnN0IHBhcnNlZEFtb3VudE1TVCA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChhbW91bnRNU1QpO1xyXG4gIGNvbnN0IG5leHRFeGNoYW5nZVJhdGUgPVxyXG4gICAgcGFyc2VkVG90YWxBbW91bnQgIT0gbnVsbCAmJiBwYXJzZWRBbW91bnRNU1QgIT0gbnVsbFxyXG4gICAgICA/IGNhbGN1bGF0ZUV4cGVuc2VMaW5lRXhjaGFuZ2VSYXRlRm9yQ3VycmVuY3koXHJcbiAgICAgICAgICBwYXJzZWRUb3RhbEFtb3VudCxcclxuICAgICAgICAgIHBhcnNlZEFtb3VudE1TVCxcclxuICAgICAgICAgIGN1cnJlbmN5Q29kZSxcclxuICAgICAgICAgIHJlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICBjdXJyZW50RXhjaGFuZ2VSYXRlXHJcbiAgICAgICAgKVxyXG4gICAgICA6IGlzRXhwZW5zZUxpbmVTYW1lUmVpbWJ1cnNlbWVudEN1cnJlbmN5KGN1cnJlbmN5Q29kZSwgcmVpbWJ1cnNlbWVudEN1cnJlbmN5Q29kZSlcclxuICAgICAgICA/IHJlc29sdmVFeHBlbnNlTGluZUV4Y2hhbmdlUmF0ZUZvckN1cnJlbmN5KGN1cnJlbmN5Q29kZSwgcmVpbWJ1cnNlbWVudEN1cnJlbmN5Q29kZSwgY3VycmVudEV4Y2hhbmdlUmF0ZSlcclxuICAgICAgOiBudWxsO1xyXG5cclxuICByZXR1cm4gbmV4dEV4Y2hhbmdlUmF0ZSAhPSBudWxsID8geyBleGNoYW5nZVJhdGU6IGZvcm1hdEVkaXRhYmxlRXhjaGFuZ2VSYXRlKG5leHRFeGNoYW5nZVJhdGUpIH0gOiB7fTtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVFeGNoYW5nZVJhdGVGb3JTZXR0bGVtZW50ID0gKFxyXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nLFxyXG4gIGxvY2FsQ3VycmVuY3lDb2RlOiBzdHJpbmcsXHJcbiAgZXhjaGFuZ2VSYXRlOiBzdHJpbmdcclxuKTogc3RyaW5nID0+IHtcclxuICBpZiAoIWlzRXhwZW5zZUxpbmVGb3JlaWduQ3VycmVuY3koY3VycmVuY3lDb2RlLCBsb2NhbEN1cnJlbmN5Q29kZSkpIHtcclxuICAgIHJldHVybiBmb3JtYXRFZGl0YWJsZUV4Y2hhbmdlUmF0ZSgxMDApO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGFyc2VkRXhjaGFuZ2VSYXRlID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KGV4Y2hhbmdlUmF0ZSk7XHJcbiAgaWYgKHBhcnNlZEV4Y2hhbmdlUmF0ZSAhPSBudWxsICYmIHBhcnNlZEV4Y2hhbmdlUmF0ZSA+IDApIHtcclxuICAgIHJldHVybiBleGNoYW5nZVJhdGU7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZXhjaGFuZ2VSYXRlO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRMb2NhbEN1cnJlbmN5U2V0dGxlbWVudFBhdGNoID0gKFxyXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nLFxyXG4gIGxvY2FsQ3VycmVuY3lDb2RlOiBzdHJpbmcsXHJcbiAgdG90YWxBbW91bnQ6IHN0cmluZyxcclxuICBleGNoYW5nZVJhdGU6IHN0cmluZyxcclxuICBhbW91bnRNU1RNYW51YWxseUVkaXRlZDogYm9vbGVhblxyXG4pOiBQYXJ0aWFsPERyYWZ0U3RhdGU+ID0+IHtcclxuICBpZiAoaXNFeHBlbnNlTGluZUZvcmVpZ25DdXJyZW5jeShjdXJyZW5jeUNvZGUsIGxvY2FsQ3VycmVuY3lDb2RlKSkge1xyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGFyc2VkVG90YWxBbW91bnQgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQodG90YWxBbW91bnQpO1xyXG4gIHJldHVybiB7XHJcbiAgICBleGNoYW5nZVJhdGU6IGZvcm1hdEVkaXRhYmxlRXhjaGFuZ2VSYXRlKFxyXG4gICAgICByZXNvbHZlRXhwZW5zZUxpbmVFeGNoYW5nZVJhdGVGb3JDdXJyZW5jeShjdXJyZW5jeUNvZGUsIGxvY2FsQ3VycmVuY3lDb2RlLCBleGNoYW5nZVJhdGUpXHJcbiAgICApLFxyXG4gICAgLi4uKCFhbW91bnRNU1RNYW51YWxseUVkaXRlZCAmJiBwYXJzZWRUb3RhbEFtb3VudCAhPSBudWxsID8geyBhbW91bnRNU1Q6IGZvcm1hdEVkaXRhYmxlTW9uZXkocGFyc2VkVG90YWxBbW91bnQpIH0gOiB7fSksXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IGNyZWF0ZURyYWZ0RnJvbUhlYWRlciA9IChcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsLFxyXG4gIGxpbmtlZEV4cGVuc2VMaW5lOiBFeHBlbnNlU2hlZXRMaW5lIHwgbnVsbCB8IHVuZGVmaW5lZCxcclxuICBsb2NhbEN1cnJlbmN5Q29kZTogc3RyaW5nIHwgdW5kZWZpbmVkXHJcbik6IERyYWZ0U3RhdGUgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRMb2NhbEN1cnJlbmN5Q29kZSA9XHJcbiAgICBub3JtYWxpemVDdXJyZW5jeUNvZGUobG9jYWxDdXJyZW5jeUNvZGUpIHx8IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShsaW5rZWRFeHBlbnNlTGluZT8uY3VycmVuY3lDb2RlKTtcclxuICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3lDb2RlID1cclxuICAgIG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShoZWFkZXI/LmN1cnJlbmN5Q29kZSkgfHwgbm9ybWFsaXplQ3VycmVuY3lDb2RlKGxpbmtlZEV4cGVuc2VMaW5lPy5jdXJyZW5jeUNvZGUpIHx8IG5vcm1hbGl6ZWRMb2NhbEN1cnJlbmN5Q29kZTtcclxuICBjb25zdCB0b3RhbEFtb3VudCA9XG4gICAgdG9GaW5pdGVOdW1iZXIoaGVhZGVyPy50b3RhbEFtb3VudEN1cnJlbmN5ID8/IGhlYWRlcj8udG90YWxBbW91bnQpID8/XG4gICAgdG9GaW5pdGVOdW1iZXIobGlua2VkRXhwZW5zZUxpbmU/LmFtb3VudCkgPz9cbiAgICB0b0Zpbml0ZU51bWJlcihsaW5rZWRFeHBlbnNlTGluZT8ucHJpY2UpO1xuICBjb25zdCB0aWNrZXRFeGNoYW5nZVJhdGUgPSB0b0Zpbml0ZU51bWJlcihoZWFkZXI/LmV4Y2hSYXRlID8/IGxpbmtlZEV4cGVuc2VMaW5lPy5leGNoUmF0ZSk7XG4gIGNvbnN0IHRpY2tldEFtb3VudE1TVCA9IHRvRmluaXRlTnVtYmVyKGhlYWRlcj8udmlzaWJsZVJlaW1idXJzYWJsZVRvdGFsID8/IGhlYWRlcj8uYW1vdW50TVNUID8/IGxpbmtlZEV4cGVuc2VMaW5lPy5hbW91bnRNU1QpO1xuICBjb25zdCBzYW1lQ3VycmVuY3kgPSBpc0V4cGVuc2VMaW5lU2FtZVJlaW1idXJzZW1lbnRDdXJyZW5jeShub3JtYWxpemVkQ3VycmVuY3lDb2RlLCBub3JtYWxpemVkTG9jYWxDdXJyZW5jeUNvZGUpO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZSA9IHNhbWVDdXJyZW5jeVxyXG4gICAgPyAxMDBcclxuICAgIDogdGlja2V0RXhjaGFuZ2VSYXRlICE9IG51bGwgJiYgdGlja2V0RXhjaGFuZ2VSYXRlID4gMFxyXG4gICAgICA/IHRpY2tldEV4Y2hhbmdlUmF0ZVxyXG4gICAgICA6IG51bGw7XHJcbiAgY29uc3QgY2FsY3VsYXRlZEFtb3VudE1TVCA9XHJcbiAgICB0b3RhbEFtb3VudCAhPSBudWxsXHJcbiAgICAgID8gY2FsY3VsYXRlRXhwZW5zZUxpbmVBbW91bnRNU1RGb3JDdXJyZW5jeShcclxuICAgICAgICAgIHRvdGFsQW1vdW50LFxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlLFxyXG4gICAgICAgICAgbm9ybWFsaXplZEN1cnJlbmN5Q29kZSxcclxuICAgICAgICAgIG5vcm1hbGl6ZWRMb2NhbEN1cnJlbmN5Q29kZVxyXG4gICAgICAgIClcclxuICAgICAgOiBudWxsO1xyXG4gIGNvbnN0IGFtb3VudE1TVCA9IHRpY2tldEFtb3VudE1TVCA/PyBjYWxjdWxhdGVkQW1vdW50TVNUID8/IChzYW1lQ3VycmVuY3kgPyB0b3RhbEFtb3VudCA6IG51bGwpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KGhlYWRlcj8uZGVzY3JpcHRpb24pLFxyXG4gICAgZ2FzdG9UeXBlOiBoZWFkZXI/Lmdhc3RvVHlwZSA9PT0gbnVsbCB8fCBoZWFkZXI/Lmdhc3RvVHlwZSA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IFN0cmluZyhoZWFkZXIuZ2FzdG9UeXBlKSxcclxuICAgIGN1cnJlbmN5Q29kZTogbm9ybWFsaXplZEN1cnJlbmN5Q29kZSxcclxuICAgIHRvdGFsQW1vdW50OiBmb3JtYXRFZGl0YWJsZU1vbmV5KHRvdGFsQW1vdW50KSxcclxuICAgIGFtb3VudE1TVDogZm9ybWF0RWRpdGFibGVNb25leShhbW91bnRNU1QpLFxyXG4gICAgZXhjaGFuZ2VSYXRlOiBmb3JtYXRFZGl0YWJsZUV4Y2hhbmdlUmF0ZShleGNoYW5nZVJhdGUpLFxyXG4gICAgdHJhbnNEYXRlOiB0b0lucHV0RGF0ZShoZWFkZXI/LnRpY2tldERhdGUgfHwgaGVhZGVyPy50cmFuc0RhdGUpLFxyXG4gICAgdGlja2V0VGltZTogdG9JbnB1dFRpbWUoaGVhZGVyPy50aWNrZXRUaW1lKSxcclxuICAgIGNvbWVudGFyaW86IHNhZmVUZXh0KGhlYWRlcj8uY29tZW50YXJpbyksXHJcbiAgICB1cmxGaWxlOiBzYWZlVGV4dChoZWFkZXI/LnVybEZpbGUpLFxyXG4gICAgZmlsZU5hbWU6IHNhZmVUZXh0KGhlYWRlcj8uZmlsZU5hbWUpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVJbml0aWFsU3RhdGUgPSAoKTogRWRpdG9yU3RhdGUgPT4gKHtcclxuICBidXN5OiBmYWxzZSxcclxuICBzdGF0dXM6IFwiXCIsXHJcbiAgaXNFZGl0aW5nOiBmYWxzZSxcclxuICBtb2RhbEVycm9yOiBcIlwiLFxyXG4gIGxpbmVQYWdlOiAxLFxyXG4gIGFtb3VudE1TVE1hbnVhbGx5RWRpdGVkOiBmYWxzZSxcclxuICBkcmFmdDogY3JlYXRlRW1wdHlEcmFmdCgpLFxyXG59KTtcclxuXHJcbmNvbnN0IGlzVmFsaWRSZXF1aXJlZEdhc3RvVHlwZSA9IChyYXdWYWx1ZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUocmF3VmFsdWUsIHsgYWxsb3dOb25lOiBmYWxzZSB9KSAhPT0gbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IGVkaXRvclJlZHVjZXIgPSAoc3RhdGU6IEVkaXRvclN0YXRlLCBhY3Rpb246IEVkaXRvckFjdGlvbik6IEVkaXRvclN0YXRlID0+IHtcclxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICBjYXNlIFwiaHlkcmF0ZV9mcm9tX2hlYWRlclwiOlxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIGFtb3VudE1TVE1hbnVhbGx5RWRpdGVkOiBmYWxzZSxcclxuICAgICAgICBkcmFmdDogY3JlYXRlRHJhZnRGcm9tSGVhZGVyKGFjdGlvbi5oZWFkZXIsIGFjdGlvbi5saW5rZWRFeHBlbnNlTGluZSwgYWN0aW9uLmxvY2FsQ3VycmVuY3lDb2RlKSxcclxuICAgICAgfTtcclxuICAgIGNhc2UgXCJwYXRjaF9zdGF0ZVwiOlxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIC4uLmFjdGlvbi5wYXRjaCxcclxuICAgICAgfTtcclxuICAgIGNhc2UgXCJzZXRfZHJhZnRfZmllbGRcIjpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICBkcmFmdDoge1xyXG4gICAgICAgICAgLi4uc3RhdGUuZHJhZnQsXHJcbiAgICAgICAgICBbYWN0aW9uLmZpZWxkXTogYWN0aW9uLnZhbHVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICBjYXNlIFwicGF0Y2hfZHJhZnRcIjpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICBhbW91bnRNU1RNYW51YWxseUVkaXRlZDogYWN0aW9uLmFtb3VudE1TVE1hbnVhbGx5RWRpdGVkID8/IHN0YXRlLmFtb3VudE1TVE1hbnVhbGx5RWRpdGVkLFxyXG4gICAgICAgIGRyYWZ0OiB7XHJcbiAgICAgICAgICAuLi5zdGF0ZS5kcmFmdCxcclxuICAgICAgICAgIC4uLmFjdGlvbi5wYXRjaCxcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVTZXRTdGF0ZVZhbHVlID0gPFQsPih2YWx1ZTogU2V0U3RhdGVBY3Rpb248VD4sIGN1cnJlbnQ6IFQpOiBUID0+IHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgPyAodmFsdWUgYXMgKHByZXZTdGF0ZTogVCkgPT4gVCkoY3VycmVudCkgOiB2YWx1ZTtcclxufTtcclxuXHJcbi8vIE93bnMgcGFnZS1sb2NhbCBlZGl0LCBkcmFmdCwgYW5kIGxpbmUgcGFnaW5nIHN0YXRlIGZvciB0aWNrZXQgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbEVkaXRvciA9ICh7XHJcbiAgaGVhZGVyLFxyXG4gIGxpbmtlZEV4cGVuc2VMaW5lLFxyXG4gIGxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gIGxpbmVDb3VudCxcclxuICBwYWdlU2l6ZSxcclxuICBjYW5FZGl0VGlja2V0LFxuICBpc0xvYWRpbmcsXG4gIGFsbG93QXNzaWduZWREcmFmdEVkaXQsXG4gIGlzU2hlZXRMaW5rUmVhZE9ubHksXG4gIG9uRm9yYmlkZGVuLFxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbEVkaXRvckFyZ3MpID0+IHtcbiAgY29uc3QgW3N0YXRlLCBkaXNwYXRjaF0gPSB1c2VSZWR1Y2VyKGVkaXRvclJlZHVjZXIsIHVuZGVmaW5lZCwgY3JlYXRlSW5pdGlhbFN0YXRlKTtcclxuICBjb25zdCBbZGVzY3JpcHRpb25JbnZhbGlkLCBzZXREZXNjcmlwdGlvbkludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtnYXN0b1R5cGVJbnZhbGlkLCBzZXRHYXN0b1R5cGVJbnZhbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbY3VycmVuY3lDb2RlSW52YWxpZCwgc2V0Q3VycmVuY3lDb2RlSW52YWxpZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3RvdGFsQW1vdW50SW52YWxpZCwgc2V0VG90YWxBbW91bnRJbnZhbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbYW1vdW50TVNUSW52YWxpZCwgc2V0QW1vdW50TVNUSW52YWxpZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2V4Y2hhbmdlUmF0ZUludmFsaWQsIHNldEV4Y2hhbmdlUmF0ZUludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGdhc3RvVHlwZUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBjdXJyZW5jeUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCB0b3RhbEFtb3VudElucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBhbW91bnRNU1RJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGVmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlID1cclxuICAgIG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShsb2NhbEN1cnJlbmN5Q29kZSkgfHwgbm9ybWFsaXplQ3VycmVuY3lDb2RlKGxpbmtlZEV4cGVuc2VMaW5lPy5jdXJyZW5jeUNvZGUpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHN0YXRlLmlzRWRpdGluZykgcmV0dXJuO1xyXG4gICAgZGlzcGF0Y2goeyB0eXBlOiBcImh5ZHJhdGVfZnJvbV9oZWFkZXJcIiwgaGVhZGVyLCBsaW5rZWRFeHBlbnNlTGluZSwgbG9jYWxDdXJyZW5jeUNvZGU6IGVmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlIH0pO1xyXG4gIH0sIFtlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSwgaGVhZGVyLCBsaW5rZWRFeHBlbnNlTGluZSwgc3RhdGUuaXNFZGl0aW5nXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBtYXhQYWdlID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKGxpbmVDb3VudCAvIHBhZ2VTaXplKSk7XHJcbiAgICBpZiAoc3RhdGUubGluZVBhZ2UgPiBtYXhQYWdlKSB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBsaW5lUGFnZTogbWF4UGFnZSB9IH0pO1xyXG4gICAgfVxyXG4gIH0sIFtsaW5lQ291bnQsIHBhZ2VTaXplLCBzdGF0ZS5saW5lUGFnZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHN0YXRlLmlzRWRpdGluZykgcmV0dXJuO1xyXG4gICAgc2V0RGVzY3JpcHRpb25JbnZhbGlkKGZhbHNlKTtcclxuICAgIHNldEdhc3RvVHlwZUludmFsaWQoZmFsc2UpO1xyXG4gICAgc2V0Q3VycmVuY3lDb2RlSW52YWxpZChmYWxzZSk7XHJcbiAgICBzZXRUb3RhbEFtb3VudEludmFsaWQoZmFsc2UpO1xyXG4gICAgc2V0QW1vdW50TVNUSW52YWxpZChmYWxzZSk7XHJcbiAgICBzZXRFeGNoYW5nZVJhdGVJbnZhbGlkKGZhbHNlKTtcclxuICB9LCBbc3RhdGUuaXNFZGl0aW5nXSk7XHJcblxyXG4gIGNvbnN0IHNldEJ1c3kgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxib29sZWFuPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBidXN5OiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuYnVzeSkgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuYnVzeV1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRTdGF0dXMgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxzdHJpbmc+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IHN0YXR1czogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLnN0YXR1cykgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuc3RhdHVzXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldElzRWRpdGluZyA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPGJvb2xlYW4+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IGlzRWRpdGluZzogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmlzRWRpdGluZykgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuaXNFZGl0aW5nXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldE1vZGFsRXJyb3IgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxzdHJpbmc+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IG1vZGFsRXJyb3I6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5tb2RhbEVycm9yKSB9IH0pO1xyXG4gICAgfSxcclxuICAgIFtzdGF0ZS5tb2RhbEVycm9yXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldExpbmVQYWdlID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248bnVtYmVyPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBsaW5lUGFnZTogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmxpbmVQYWdlKSB9IH0pO1xyXG4gICAgfSxcclxuICAgIFtzdGF0ZS5saW5lUGFnZV1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXREcmFmdERlc2NyaXB0aW9uID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIHNldERlc2NyaXB0aW9uSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcInNldF9kcmFmdF9maWVsZFwiLFxyXG4gICAgICAgIGZpZWxkOiBcImRlc2NyaXB0aW9uXCIsXHJcbiAgICAgICAgdmFsdWU6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5kZXNjcmlwdGlvbiksXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtzdGF0ZS5kcmFmdC5kZXNjcmlwdGlvbl1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXREcmFmdEdhc3RvVHlwZSA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBzZXRHYXN0b1R5cGVJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwic2V0X2RyYWZ0X2ZpZWxkXCIsXHJcbiAgICAgICAgZmllbGQ6IFwiZ2FzdG9UeXBlXCIsXHJcbiAgICAgICAgdmFsdWU6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5nYXN0b1R5cGUpLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuZHJhZnQuZ2FzdG9UeXBlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldERyYWZ0Q3VycmVuY3lDb2RlID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIHNldEN1cnJlbmN5Q29kZUludmFsaWQoZmFsc2UpO1xyXG4gICAgICBzZXRBbW91bnRNU1RJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIGNvbnN0IG5leHRDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUocmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSkpO1xyXG4gICAgICBjb25zdCBuZXh0UGF0Y2g6IFBhcnRpYWw8RHJhZnRTdGF0ZT4gPSB7XHJcbiAgICAgICAgY3VycmVuY3lDb2RlOiBuZXh0Q3VycmVuY3lDb2RlLFxyXG4gICAgICAgIC4uLmJ1aWxkTG9jYWxDdXJyZW5jeVNldHRsZW1lbnRQYXRjaChcclxuICAgICAgICAgIG5leHRDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICBlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgICAgICAgIHN0YXRlLmRyYWZ0LnRvdGFsQW1vdW50LFxyXG4gICAgICAgICAgc3RhdGUuZHJhZnQuZXhjaGFuZ2VSYXRlLFxyXG4gICAgICAgICAgZmFsc2VcclxuICAgICAgICApLFxyXG4gICAgICB9O1xyXG4gICAgICBpZiAoIW5leHRQYXRjaC5hbW91bnRNU1QpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgICAgbmV4dFBhdGNoLFxyXG4gICAgICAgICAgYnVpbGRBbW91bnRNU1RQYXRjaEZyb21FeGNoYW5nZVJhdGUoXHJcbiAgICAgICAgICAgIHN0YXRlLmRyYWZ0LnRvdGFsQW1vdW50LFxyXG4gICAgICAgICAgICBzdGF0ZS5kcmFmdC5leGNoYW5nZVJhdGUsXHJcbiAgICAgICAgICAgIG5leHRDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICAgIGVmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgICBmYWxzZVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwicGF0Y2hfZHJhZnRcIixcclxuICAgICAgICBwYXRjaDogbmV4dFBhdGNoLFxyXG4gICAgICAgIGFtb3VudE1TVE1hbnVhbGx5RWRpdGVkOiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW2VmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlLCBzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUsIHN0YXRlLmRyYWZ0LmV4Y2hhbmdlUmF0ZSwgc3RhdGUuZHJhZnQudG90YWxBbW91bnRdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2V0RHJhZnRUb3RhbEFtb3VudCA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBzZXRUb3RhbEFtb3VudEludmFsaWQoZmFsc2UpO1xyXG4gICAgICBzZXRBbW91bnRNU1RJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIGNvbnN0IG5leHRUb3RhbEFtb3VudCA9IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC50b3RhbEFtb3VudCk7XHJcbiAgICAgIGNvbnN0IGVmZmVjdGl2ZUV4Y2hhbmdlUmF0ZSA9IHJlc29sdmVFeGNoYW5nZVJhdGVGb3JTZXR0bGVtZW50KFxyXG4gICAgICAgIHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSxcclxuICAgICAgICBlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgICAgICBzdGF0ZS5kcmFmdC5leGNoYW5nZVJhdGVcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgbmV4dFBhdGNoOiBQYXJ0aWFsPERyYWZ0U3RhdGU+ID0ge1xyXG4gICAgICAgIHRvdGFsQW1vdW50OiBuZXh0VG90YWxBbW91bnQsXHJcbiAgICAgICAgLi4uYnVpbGRBbW91bnRNU1RQYXRjaEZyb21FeGNoYW5nZVJhdGUoXHJcbiAgICAgICAgICBuZXh0VG90YWxBbW91bnQsXHJcbiAgICAgICAgICBlZmZlY3RpdmVFeGNoYW5nZVJhdGUsXHJcbiAgICAgICAgICBzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICBlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgICAgICAgIHN0YXRlLmFtb3VudE1TVE1hbnVhbGx5RWRpdGVkXHJcbiAgICAgICAgKSxcclxuICAgICAgfTtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwicGF0Y2hfZHJhZnRcIixcclxuICAgICAgICBwYXRjaDogbmV4dFBhdGNoLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGVmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gICAgICBzdGF0ZS5hbW91bnRNU1RNYW51YWxseUVkaXRlZCxcclxuICAgICAgc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlLFxyXG4gICAgICBzdGF0ZS5kcmFmdC5leGNoYW5nZVJhdGUsXHJcbiAgICAgIHN0YXRlLmRyYWZ0LnRvdGFsQW1vdW50LFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldERyYWZ0QW1vdW50TVNUID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIHNldEFtb3VudE1TVEludmFsaWQoZmFsc2UpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgY29uc3QgbmV4dEFtb3VudE1TVCA9IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5hbW91bnRNU1QpO1xyXG4gICAgICBpZiAoYXJlRXhwZW5zZU51bWVyaWNJbnB1dHNFcXVpdmFsZW50KG5leHRBbW91bnRNU1QsIHN0YXRlLmRyYWZ0LmFtb3VudE1TVCkpIHtcclxuICAgICAgICBpZiAobmV4dEFtb3VudE1TVCAhPT0gc3RhdGUuZHJhZnQuYW1vdW50TVNUKSB7XHJcbiAgICAgICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwicGF0Y2hfZHJhZnRcIixcclxuICAgICAgICAgICAgcGF0Y2g6IHtcclxuICAgICAgICAgICAgICBhbW91bnRNU1Q6IG5leHRBbW91bnRNU1QsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJwYXRjaF9kcmFmdFwiLFxyXG4gICAgICAgIHBhdGNoOiB7XHJcbiAgICAgICAgICBhbW91bnRNU1Q6IG5leHRBbW91bnRNU1QsXHJcbiAgICAgICAgICAuLi5idWlsZEV4Y2hhbmdlUmF0ZVBhdGNoRnJvbUFtb3VudE1TVChcclxuICAgICAgICAgICAgc3RhdGUuZHJhZnQudG90YWxBbW91bnQsXHJcbiAgICAgICAgICAgIG5leHRBbW91bnRNU1QsXHJcbiAgICAgICAgICAgIHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSxcclxuICAgICAgICAgICAgZWZmZWN0aXZlTG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICAgIHN0YXRlLmRyYWZ0LmV4Y2hhbmdlUmF0ZVxyXG4gICAgICAgICAgKSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFtb3VudE1TVE1hbnVhbGx5RWRpdGVkOiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbZWZmZWN0aXZlTG9jYWxDdXJyZW5jeUNvZGUsIHN0YXRlLmRyYWZ0LmFtb3VudE1TVCwgc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlLCBzdGF0ZS5kcmFmdC5leGNoYW5nZVJhdGUsIHN0YXRlLmRyYWZ0LnRvdGFsQW1vdW50XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldERyYWZ0RXhjaGFuZ2VSYXRlID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZUludmFsaWQoZmFsc2UpO1xyXG4gICAgICBzZXRBbW91bnRNU1RJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgY29uc3QgbmV4dEV4Y2hhbmdlUmF0ZSA9IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5leGNoYW5nZVJhdGUpO1xyXG4gICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJwYXRjaF9kcmFmdFwiLFxyXG4gICAgICAgIHBhdGNoOiB7XHJcbiAgICAgICAgICBleGNoYW5nZVJhdGU6IG5leHRFeGNoYW5nZVJhdGUsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLmRyYWZ0LmV4Y2hhbmdlUmF0ZV1cclxuICApO1xyXG5cclxuICBjb25zdCBjb21taXREcmFmdEV4Y2hhbmdlUmF0ZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHZhbHVlOiBzdHJpbmcsIGN1cnJlbmN5Q29kZU92ZXJyaWRlPzogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZUludmFsaWQoZmFsc2UpO1xyXG4gICAgICBzZXRBbW91bnRNU1RJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgY29uc3QgZWZmZWN0aXZlQ3VycmVuY3lDb2RlID0gY3VycmVuY3lDb2RlT3ZlcnJpZGVcclxuICAgICAgICA/IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGVPdmVycmlkZSlcclxuICAgICAgICA6IHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZTtcclxuICAgICAgY29uc3QgbmV4dEV4Y2hhbmdlUmF0ZSA9IGZvcm1hdEVkaXRhYmxlRXhjaGFuZ2VSYXRlKFxyXG4gICAgICAgIHJlc29sdmVFeGNoYW5nZVJhdGVGb3JTZXR0bGVtZW50KFxyXG4gICAgICAgICAgZWZmZWN0aXZlQ3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgZWZmZWN0aXZlTG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICB2YWx1ZVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwicGF0Y2hfZHJhZnRcIixcclxuICAgICAgICBwYXRjaDoge1xyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlOiBuZXh0RXhjaGFuZ2VSYXRlLFxyXG4gICAgICAgICAgLi4uYnVpbGRBbW91bnRNU1RQYXRjaEZyb21FeGNoYW5nZVJhdGUoXHJcbiAgICAgICAgICAgIHN0YXRlLmRyYWZ0LnRvdGFsQW1vdW50LFxyXG4gICAgICAgICAgICBuZXh0RXhjaGFuZ2VSYXRlLFxyXG4gICAgICAgICAgICBlZmZlY3RpdmVDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICAgIGVmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgICBzdGF0ZS5hbW91bnRNU1RNYW51YWxseUVkaXRlZFxyXG4gICAgICAgICAgKSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbZWZmZWN0aXZlTG9jYWxDdXJyZW5jeUNvZGUsIHN0YXRlLmFtb3VudE1TVE1hbnVhbGx5RWRpdGVkLCBzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUsIHN0YXRlLmRyYWZ0LnRvdGFsQW1vdW50XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFoZWFkZXIgfHwgaXNMb2FkaW5nKSByZXR1cm47XG4gICAgaWYgKGlzU2hlZXRMaW5rUmVhZE9ubHkpIHJldHVybjtcbiAgICBpZiAoaGVhZGVyLnN0YXR1cyA9PT0gMSAmJiAhYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCkgcmV0dXJuO1xuICAgIGlmICghY2FuRWRpdFRpY2tldCkge1xuICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRHYXN0b1R5cGVJbnZhbGlkKGZhbHNlKTtcclxuICAgIHNldEN1cnJlbmN5Q29kZUludmFsaWQoZmFsc2UpO1xyXG4gICAgc2V0VG90YWxBbW91bnRJbnZhbGlkKGZhbHNlKTtcclxuICAgIHNldEFtb3VudE1TVEludmFsaWQoZmFsc2UpO1xyXG4gICAgc2V0RXhjaGFuZ2VSYXRlSW52YWxpZChmYWxzZSk7XHJcbiAgICBkaXNwYXRjaCh7IHR5cGU6IFwiaHlkcmF0ZV9mcm9tX2hlYWRlclwiLCBoZWFkZXIsIGxpbmtlZEV4cGVuc2VMaW5lLCBsb2NhbEN1cnJlbmN5Q29kZTogZWZmZWN0aXZlTG9jYWxDdXJyZW5jeUNvZGUgfSk7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFwicGF0Y2hfc3RhdGVcIixcclxuICAgICAgcGF0Y2g6IHtcclxuICAgICAgICBtb2RhbEVycm9yOiBcIlwiLFxyXG4gICAgICAgIGlzRWRpdGluZzogdHJ1ZSxcclxuICAgICAgICBzdGF0dXM6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9FZGl0aW5nRW5hYmxlZFwiLCBcIkVkaXRpbmcgZW5hYmxlZFwiKSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0sIFtcclxuICAgIGFsbG93QXNzaWduZWREcmFmdEVkaXQsXG4gICAgY2FuRWRpdFRpY2tldCxcbiAgICBlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSxcbiAgICBoZWFkZXIsXG4gICAgaXNTaGVldExpbmtSZWFkT25seSxcbiAgICBpc0xvYWRpbmcsXG4gICAgbGlua2VkRXhwZW5zZUxpbmUsXG4gICAgb25Gb3JiaWRkZW4sXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFzdGF0ZS5pc0VkaXRpbmcpIHJldHVybjtcclxuICAgIGlmICghaGVhZGVyKSB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBpc0VkaXRpbmc6IGZhbHNlIH0gfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRHYXN0b1R5cGVJbnZhbGlkKGZhbHNlKTtcclxuICAgIHNldEN1cnJlbmN5Q29kZUludmFsaWQoZmFsc2UpO1xyXG4gICAgc2V0VG90YWxBbW91bnRJbnZhbGlkKGZhbHNlKTtcclxuICAgIHNldEFtb3VudE1TVEludmFsaWQoZmFsc2UpO1xyXG4gICAgc2V0RXhjaGFuZ2VSYXRlSW52YWxpZChmYWxzZSk7XHJcbiAgICBkaXNwYXRjaCh7IHR5cGU6IFwiaHlkcmF0ZV9mcm9tX2hlYWRlclwiLCBoZWFkZXIsIGxpbmtlZEV4cGVuc2VMaW5lLCBsb2NhbEN1cnJlbmN5Q29kZTogZWZmZWN0aXZlTG9jYWxDdXJyZW5jeUNvZGUgfSk7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFwicGF0Y2hfc3RhdGVcIixcclxuICAgICAgcGF0Y2g6IHtcclxuICAgICAgICBpc0VkaXRpbmc6IGZhbHNlLFxyXG4gICAgICAgIG1vZGFsRXJyb3I6IFwiXCIsXHJcbiAgICAgICAgc3RhdHVzOiBpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0sIFtlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSwgaGVhZGVyLCBsaW5rZWRFeHBlbnNlTGluZSwgc3RhdGUuaXNFZGl0aW5nXSk7XHJcblxyXG4gIGNvbnN0IGNhbk9wZW5TYXZlQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWREZXNjcmlwdGlvbiA9IFN0cmluZyhzdGF0ZS5kcmFmdC5kZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XHJcbiAgICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3lDb2RlID0gU3RyaW5nKHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxuICAgIGNvbnN0IHBhcnNlZFRvdGFsQW1vdW50ID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHN0YXRlLmRyYWZ0LnRvdGFsQW1vdW50KTtcclxuICAgIGNvbnN0IHBhcnNlZEFtb3VudE1TVCA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChzdGF0ZS5kcmFmdC5hbW91bnRNU1QpO1xyXG4gICAgY29uc3QgcGFyc2VkRXhjaGFuZ2VSYXRlID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHN0YXRlLmRyYWZ0LmV4Y2hhbmdlUmF0ZSk7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbklzVmFsaWQgPSAhIW5vcm1hbGl6ZWREZXNjcmlwdGlvbjtcclxuICAgIGNvbnN0IGdhc3RvVHlwZUlzVmFsaWQgPSBpc1ZhbGlkUmVxdWlyZWRHYXN0b1R5cGUoc3RhdGUuZHJhZnQuZ2FzdG9UeXBlKTtcclxuICAgIGNvbnN0IGN1cnJlbmN5SXNWYWxpZCA9ICEhbm9ybWFsaXplZEN1cnJlbmN5Q29kZTtcclxuICAgIGNvbnN0IHRvdGFsQW1vdW50SXNWYWxpZCA9IHBhcnNlZFRvdGFsQW1vdW50ICE9IG51bGwgJiYgcGFyc2VkVG90YWxBbW91bnQgPj0gMDtcclxuICAgIGNvbnN0IHJlcXVpcmVzRm9yZWlnbkN1cnJlbmN5U2V0dGxlbWVudCA9IGlzRXhwZW5zZUxpbmVGb3JlaWduQ3VycmVuY3kobm9ybWFsaXplZEN1cnJlbmN5Q29kZSwgZWZmZWN0aXZlTG9jYWxDdXJyZW5jeUNvZGUpO1xyXG4gICAgY29uc3QgaGFzRm9yZWlnbkN1cnJlbmN5U2V0dGxlbWVudCA9XHJcbiAgICAgICFyZXF1aXJlc0ZvcmVpZ25DdXJyZW5jeVNldHRsZW1lbnQgfHxcclxuICAgICAgKHBhcnNlZEV4Y2hhbmdlUmF0ZSAhPSBudWxsICYmIHBhcnNlZEV4Y2hhbmdlUmF0ZSA+IDApIHx8XHJcbiAgICAgIChwYXJzZWRBbW91bnRNU1QgIT0gbnVsbCAmJiBwYXJzZWRBbW91bnRNU1QgPiAwKTtcclxuXHJcbiAgICBzZXREZXNjcmlwdGlvbkludmFsaWQoIWRlc2NyaXB0aW9uSXNWYWxpZCk7XHJcbiAgICBzZXRHYXN0b1R5cGVJbnZhbGlkKCFnYXN0b1R5cGVJc1ZhbGlkKTtcclxuICAgIHNldEN1cnJlbmN5Q29kZUludmFsaWQoIWN1cnJlbmN5SXNWYWxpZCk7XHJcbiAgICBzZXRUb3RhbEFtb3VudEludmFsaWQoIXRvdGFsQW1vdW50SXNWYWxpZCk7XHJcbiAgICBzZXRFeGNoYW5nZVJhdGVJbnZhbGlkKCFoYXNGb3JlaWduQ3VycmVuY3lTZXR0bGVtZW50KTtcclxuICAgIHNldEFtb3VudE1TVEludmFsaWQoIWhhc0ZvcmVpZ25DdXJyZW5jeVNldHRsZW1lbnQpO1xyXG5cclxuICAgIGlmIChkZXNjcmlwdGlvbklzVmFsaWQgJiYgZ2FzdG9UeXBlSXNWYWxpZCAmJiBjdXJyZW5jeUlzVmFsaWQgJiYgdG90YWxBbW91bnRJc1ZhbGlkICYmIGhhc0ZvcmVpZ25DdXJyZW5jeVNldHRsZW1lbnQpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWVzc2FnZSA9ICFkZXNjcmlwdGlvbklzVmFsaWRcclxuICAgICAgPyBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0Rlc2NyaXB0aW9uUmVxdWlyZWRcIiwgXCJEZXNjcmlwdGlvbiBpcyByZXF1aXJlZC5cIilcclxuICAgICAgOiAhZ2FzdG9UeXBlSXNWYWxpZFxyXG4gICAgICAgID8gaW5kVChcIlRpY2tldHNfVmFsaWRhdGlvbl9DYXRlZ29yeVJlcXVpcmVkXCIsIFwiQ2F0ZWdvcnkgaXMgcmVxdWlyZWQuXCIpXHJcbiAgICAgICAgOiAhY3VycmVuY3lJc1ZhbGlkXHJcbiAgICAgICAgICA/IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fQ3VycmVuY3lSZXF1aXJlZFwiLCBcIkN1cnJlbmN5IGlzIHJlcXVpcmVkLlwiKVxyXG4gICAgICAgICAgOiAhdG90YWxBbW91bnRJc1ZhbGlkXHJcbiAgICAgICAgICAgID8gaW5kVChcIlRpY2tldHNfVmFsaWRhdGlvbl9Ub3RhbEFtb3VudFJlcXVpcmVkXCIsIFwiVG90YWwgYW1vdW50IG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIDAuXCIpXHJcbiAgICAgICAgICAgIDogaW5kVChcclxuICAgICAgICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19MaW5lX1ZhbGlkYXRpb25fRm9yZWlnbkN1cnJlbmN5U2V0dGxlbWVudFwiLFxyXG4gICAgICAgICAgICAgICAgXCJGb3JlaWduIGN1cnJlbmN5IGxpbmVzIHJlcXVpcmUgYW4gZXhjaGFuZ2UgcmF0ZSBncmVhdGVyIHRoYW4gMCBvciBhIHJlaW1idXJzZW1lbnQgYW1vdW50LlwiXHJcbiAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFwicGF0Y2hfc3RhdGVcIixcclxuICAgICAgcGF0Y2g6IHtcclxuICAgICAgICBtb2RhbEVycm9yOiBtZXNzYWdlLFxyXG4gICAgICAgIHN0YXR1czogbWVzc2FnZSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICBpZiAoIWRlc2NyaXB0aW9uSXNWYWxpZCkge1xyXG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghZ2FzdG9UeXBlSXNWYWxpZCkge1xyXG4gICAgICAgIGdhc3RvVHlwZUlucHV0UmVmLmN1cnJlbnQ/LmZvY3VzKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWN1cnJlbmN5SXNWYWxpZCkge1xyXG4gICAgICAgIGN1cnJlbmN5SW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghdG90YWxBbW91bnRJc1ZhbGlkKSB7XHJcbiAgICAgICAgdG90YWxBbW91bnRJbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFoYXNGb3JlaWduQ3VycmVuY3lTZXR0bGVtZW50KSB7XHJcbiAgICAgICAgZXhjaGFuZ2VSYXRlSW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sIFtcclxuICAgIGVmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gICAgc3RhdGUuZHJhZnQuYW1vdW50TVNULFxyXG4gICAgc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlLFxyXG4gICAgc3RhdGUuZHJhZnQuZGVzY3JpcHRpb24sXHJcbiAgICBzdGF0ZS5kcmFmdC5leGNoYW5nZVJhdGUsXHJcbiAgICBzdGF0ZS5kcmFmdC5nYXN0b1R5cGUsXHJcbiAgICBzdGF0ZS5kcmFmdC50b3RhbEFtb3VudCxcclxuICBdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGJ1c3k6IHN0YXRlLmJ1c3ksXHJcbiAgICBzdGF0dXM6IHN0YXRlLnN0YXR1cyxcclxuICAgIGlzRWRpdGluZzogc3RhdGUuaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxFcnJvcjogc3RhdGUubW9kYWxFcnJvcixcclxuICAgIGxpbmVQYWdlOiBzdGF0ZS5saW5lUGFnZSxcclxuICAgIGRyYWZ0RGVzY3JpcHRpb246IHN0YXRlLmRyYWZ0LmRlc2NyaXB0aW9uLFxyXG4gICAgZGVzY3JpcHRpb25JbnZhbGlkLFxyXG4gICAgZGVzY3JpcHRpb25JbnB1dFJlZixcclxuICAgIGRyYWZ0R2FzdG9UeXBlOiBzdGF0ZS5kcmFmdC5nYXN0b1R5cGUsXHJcbiAgICBnYXN0b1R5cGVJbnZhbGlkLFxyXG4gICAgZ2FzdG9UeXBlSW5wdXRSZWYsXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZTogc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlLFxyXG4gICAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICAgIGN1cnJlbmN5SW5wdXRSZWYsXHJcbiAgICBkcmFmdFRvdGFsQW1vdW50OiBzdGF0ZS5kcmFmdC50b3RhbEFtb3VudCxcclxuICAgIHRvdGFsQW1vdW50SW52YWxpZCxcclxuICAgIHRvdGFsQW1vdW50SW5wdXRSZWYsXHJcbiAgICBkcmFmdEFtb3VudE1TVDogc3RhdGUuZHJhZnQuYW1vdW50TVNULFxyXG4gICAgYW1vdW50TVNUSW52YWxpZCxcclxuICAgIGFtb3VudE1TVElucHV0UmVmLFxyXG4gICAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0YXRlLmRyYWZ0LmV4Y2hhbmdlUmF0ZSxcclxuICAgIGV4Y2hhbmdlUmF0ZUludmFsaWQsXHJcbiAgICBleGNoYW5nZVJhdGVJbnB1dFJlZixcclxuICAgIGxvY2FsQ3VycmVuY3lDb2RlOiBlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgIGRyYWZ0VHJhbnNEYXRlOiBzdGF0ZS5kcmFmdC50cmFuc0RhdGUsXHJcbiAgICBkcmFmdFRpY2tldFRpbWU6IHN0YXRlLmRyYWZ0LnRpY2tldFRpbWUsXHJcbiAgICBkcmFmdENvbWVudGFyaW86IHN0YXRlLmRyYWZ0LmNvbWVudGFyaW8sXHJcbiAgICBkcmFmdFVybEZpbGU6IHN0YXRlLmRyYWZ0LnVybEZpbGUsXHJcbiAgICBkcmFmdEZpbGVOYW1lOiBzdGF0ZS5kcmFmdC5maWxlTmFtZSxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRHYXN0b1R5cGUsXHJcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIHNldERyYWZ0VG90YWxBbW91bnQsXHJcbiAgICBzZXREcmFmdEFtb3VudE1TVCxcclxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgY29tbWl0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7XG4gIEVYUEVOU0VfVElDS0VUX0xJTktfRkFJTFVSRV9SRVBBSVJfSU5URU5ULFxuICBub3JtYWxpemVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcbiAgcmVzb2x2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxuICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXG59IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dC50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxuLy8gUGFyc2VzIHJvdXRlIGNvbnRleHQgb25jZSBhbmQgZXhwb3NlcyBzdGFibGUgZmxhZ3MgZm9yIHRpY2tldCBkZXRhaWwgZmxvd3MuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0ID0gKCkgPT4ge1xyXG4gIGNvbnN0IHJvdXRlUGFyYW1zID0gdXNlTWVtbygoKSA9PiBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpLCBbXSk7XHJcbiAgY29uc3QgZmlsZUlkID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1RJQ0tFVF9GSUxFX0lEX18pLCBbXSk7XG4gIGNvbnN0IGF1dG9FZGl0TW9kZSA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwibW9kZVwiKSkudG9Mb3dlckNhc2UoKSA9PT0gXCJlZGl0XCIsIFtyb3V0ZVBhcmFtc10pO1xuICBjb25zdCByb3V0ZUludGVudCA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwiaW50ZW50XCIpKS50b0xvd2VyQ2FzZSgpLCBbcm91dGVQYXJhbXNdKTtcbiAgY29uc3Qgcm91dGVPcmlnaW4gPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcIm9yaWdpblwiKSkudG9Mb3dlckNhc2UoKSwgW3JvdXRlUGFyYW1zXSk7XG4gIGNvbnN0IHJvdXRlU2hlZXRJZCA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwic2hlZXRJZFwiKSksIFtyb3V0ZVBhcmFtc10pO1xyXG4gIGNvbnN0IHJvdXRlU2hlZXRMaW5lUmVjSWQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwic2hlZXRMaW5lUmVjSWRcIikgfHwgcm91dGVQYXJhbXMuZ2V0KFwibGluZVJlY0lkXCIpKSxcclxuICAgIFtyb3V0ZVBhcmFtc11cclxuICApO1xyXG4gIGNvbnN0IGV4cGxpY2l0UmV0dXJuQ29udGV4dCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PlxyXG4gICAgICBub3JtYWxpemVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCh7XHJcbiAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgIG9yaWdpbjogcm91dGVPcmlnaW4sXHJcbiAgICAgICAgc2hlZXRJZDogcm91dGVTaGVldElkLFxyXG4gICAgICAgIHNoZWV0TGluZVJlY0lkOiByb3V0ZVNoZWV0TGluZVJlY0lkLFxyXG4gICAgICB9KSxcclxuICAgIFtmaWxlSWQsIHJvdXRlT3JpZ2luLCByb3V0ZVNoZWV0SWQsIHJvdXRlU2hlZXRMaW5lUmVjSWRdXHJcbiAgKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghZXhwbGljaXRSZXR1cm5Db250ZXh0KSByZXR1cm47XHJcbiAgICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoZXhwbGljaXRSZXR1cm5Db250ZXh0KTtcclxuICB9LCBbZXhwbGljaXRSZXR1cm5Db250ZXh0XSk7XHJcblxyXG4gIHJldHVybiB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IHRpY2tldFJldHVybkNvbnRleHQgPSByZXNvbHZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoZmlsZUlkLCBleHBsaWNpdFJldHVybkNvbnRleHQpO1xyXG4gICAgY29uc3QgZGV0YWlsT3JpZ2luID0gdGlja2V0UmV0dXJuQ29udGV4dD8ub3JpZ2luIHx8IHJvdXRlT3JpZ2luO1xyXG4gICAgY29uc3QgY29udGV4dFNoZWV0SWQgPSB0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkIHx8IHJvdXRlU2hlZXRJZDtcclxuICAgIGNvbnN0IGNvbnRleHRMaW5lUmVjSWQgPSB0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldExpbmVSZWNJZCB8fCByb3V0ZVNoZWV0TGluZVJlY0lkO1xyXG4gICAgY29uc3QgaXNGcm9tRXhwZW5zZVNoZWV0Q3JlYXRlID0gZGV0YWlsT3JpZ2luID09PSBcInNoZWV0LWNyZWF0ZVwiO1xuICAgIGNvbnN0IGlzRnJvbUV4cGVuc2VMaW5lID0gZGV0YWlsT3JpZ2luID09PSBcImV4cGVuc2UtbGluZVwiICYmICEhY29udGV4dFNoZWV0SWQgJiYgISFjb250ZXh0TGluZVJlY0lkO1xuICAgIGNvbnN0IGlzRnJvbVNoZWV0TGluayA9IGRldGFpbE9yaWdpbiA9PT0gXCJzaGVldC1saW5rXCIgJiYgISFjb250ZXh0U2hlZXRJZDtcbiAgICBjb25zdCBpc0xpbmtGYWlsdXJlUmVwYWlyID1cbiAgICAgIGlzRnJvbVNoZWV0TGluayAmJiBhdXRvRWRpdE1vZGUgJiYgcm91dGVJbnRlbnQgPT09IEVYUEVOU0VfVElDS0VUX0xJTktfRkFJTFVSRV9SRVBBSVJfSU5URU5UO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGF1dG9FZGl0TW9kZSxcclxuICAgICAgZGV0YWlsT3JpZ2luLFxyXG4gICAgICBjb250ZXh0U2hlZXRJZCxcclxuICAgICAgY29udGV4dExpbmVSZWNJZCxcclxuICAgICAgaXNGcm9tRXhwZW5zZVNoZWV0Q3JlYXRlLFxyXG4gICAgICBpc0Zyb21FeHBlbnNlTGluZSxcbiAgICAgIGlzRnJvbVNoZWV0TGluayxcbiAgICAgIGlzTGlua0ZhaWx1cmVSZXBhaXIsXG4gICAgICB0aWNrZXRSZXR1cm5Db250ZXh0LFxuICAgIH07XG4gIH0sIFthdXRvRWRpdE1vZGUsIGV4cGxpY2l0UmV0dXJuQ29udGV4dCwgZmlsZUlkLCByb3V0ZUludGVudCwgcm91dGVPcmlnaW4sIHJvdXRlU2hlZXRJZCwgcm91dGVTaGVldExpbmVSZWNJZF0pO1xufTtcbiIsICJpbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi8uLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlVGlja2V0U3RhdHVzTGFiZWwgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzL2V4cGVuc2VUaWNrZXRTdGF0dXNDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsRGlzcGxheUFyZ3MgPSB7XHJcbiAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbDtcclxuICBkcmFmdEdhc3RvVHlwZTogc3RyaW5nO1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRUb3RhbEFtb3VudDogc3RyaW5nO1xyXG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgZHJhZnRUaWNrZXRUaW1lOiBzdHJpbmc7XHJcbiAgZHJhZnRGaWxlTmFtZTogc3RyaW5nO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBnYXN0b1R5cGVMYWJlbE1hcDogTWFwPHN0cmluZywgc3RyaW5nPjtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdEV4cGVuc2VEaXNwbGF5VGltZSA9IChyYXc/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gc2FmZVRleHQocmF3KTtcclxuICBpZiAoIXZhbHVlIHx8IHZhbHVlID09PSBcIjBcIikgcmV0dXJuIFwiXCI7XHJcblxyXG4gIGNvbnN0IHNlY29uZHNWYWx1ZSA9IE51bWJlcih2YWx1ZSk7XHJcbiAgaWYgKE51bWJlci5pc0ludGVnZXIoc2Vjb25kc1ZhbHVlKSAmJiBzZWNvbmRzVmFsdWUgPj0gMCAmJiBzZWNvbmRzVmFsdWUgPD0gODYzOTkpIHtcclxuICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihzZWNvbmRzVmFsdWUgLyAzNjAwKTtcclxuICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNvbmRzVmFsdWUgJSAzNjAwKSAvIDYwKTtcclxuICAgIGNvbnN0IHNlY29uZHMgPSBzZWNvbmRzVmFsdWUgJSA2MDtcclxuICAgIHJldHVybiBbaG91cnMsIG1pbnV0ZXMsIHNlY29uZHNdLm1hcCgoZW50cnkpID0+IFN0cmluZyhlbnRyeSkucGFkU3RhcnQoMiwgXCIwXCIpKS5qb2luKFwiOlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG1hdGNoID0gdmFsdWUubWF0Y2goL14oXFxkezEsMn0pOihbMC01XVxcZCkoPzo6KFswLTVdXFxkKSk/JC8pO1xyXG4gIGlmICghbWF0Y2gpIHJldHVybiB2YWx1ZTtcclxuXHJcbiAgY29uc3QgaG91cnMgPSBOdW1iZXIucGFyc2VJbnQobWF0Y2hbMV0gfHwgXCJcIiwgMTApO1xyXG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihob3VycykgfHwgaG91cnMgPCAwIHx8IGhvdXJzID4gMjMpIHJldHVybiB2YWx1ZTtcclxuXHJcbiAgcmV0dXJuIGAke1N0cmluZyhob3VycykucGFkU3RhcnQoMiwgXCIwXCIpfToke21hdGNoWzJdfToke21hdGNoWzNdIHx8IFwiMDBcIn1gO1xyXG59O1xyXG5cclxuLy8gQ2VudHJhbGl6ZXMgZGlzcGxheS1vbmx5IHZhbHVlcyBzbyB0aGUgcGFnZSBjb250YWluZXIgc3RheXMgZm9jdXNlZCBvbiBmbG93IHdpcmluZy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5ID0gKHtcclxuICBoZWFkZXIsXHJcbiAgZHJhZnRHYXN0b1R5cGUsXHJcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgZHJhZnRUb3RhbEFtb3VudCxcclxuICBkcmFmdFRyYW5zRGF0ZSxcclxuICBkcmFmdFRpY2tldFRpbWUsXHJcbiAgZHJhZnRGaWxlTmFtZSxcclxuICBpc0VkaXRpbmcsXHJcbiAgZ2FzdG9UeXBlTGFiZWxNYXAsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5QXJncykgPT4ge1xyXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgZmlyc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKSxcclxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXHJcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXHJcbiAgICAgIGxhc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIiksXHJcbiAgICB9KSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgcHJldmlld0FsdFRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gc2FmZVRleHQoaXNFZGl0aW5nID8gZHJhZnRGaWxlTmFtZSA6IGhlYWRlcj8uZmlsZU5hbWUpIHx8IGluZFQoXCJUaWNrZXRzX0ZpZWxkX0ZpbGVJZFwiLCBcIlRpY2tldFwiKSxcclxuICAgIFtkcmFmdEZpbGVOYW1lLCBoZWFkZXI/LmZpbGVOYW1lLCBpc0VkaXRpbmddXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc3RhdHVzTGFiZWwgPSB1c2VNZW1vKCgpID0+IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbChoZWFkZXI/LnN0YXR1cyksIFtoZWFkZXI/LnN0YXR1c10pO1xyXG5cclxuICBjb25zdCBnYXN0b1R5cGVMYWJlbCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgY3VycmVudEdhc3RvVHlwZSA9IGlzRWRpdGluZyA/IGRyYWZ0R2FzdG9UeXBlIDogaGVhZGVyPy5nYXN0b1R5cGUgPT09IG51bGwgPyBcIlwiIDogU3RyaW5nKGhlYWRlcj8uZ2FzdG9UeXBlID8/IFwiXCIpO1xyXG4gICAgaWYgKCFjdXJyZW50R2FzdG9UeXBlKSB7XHJcbiAgICAgIHJldHVybiBpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBnYXN0b1R5cGVMYWJlbE1hcC5nZXQoU3RyaW5nKGN1cnJlbnRHYXN0b1R5cGUpKSB8fCBTdHJpbmcoY3VycmVudEdhc3RvVHlwZSk7XHJcbiAgfSwgW2RyYWZ0R2FzdG9UeXBlLCBnYXN0b1R5cGVMYWJlbE1hcCwgaGVhZGVyPy5nYXN0b1R5cGUsIGlzRWRpdGluZ10pO1xyXG5cclxuICBjb25zdCB0b3RhbEFtb3VudFRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4ge1xyXG4gICAgICBjb25zdCBlZGl0YWJsZVRvdGFsQW1vdW50ID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KGRyYWZ0VG90YWxBbW91bnQpO1xuICAgICAgcmV0dXJuIGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShcbiAgICAgICAgaXNFZGl0aW5nICYmIGVkaXRhYmxlVG90YWxBbW91bnQgIT0gbnVsbFxuICAgICAgICAgID8gZWRpdGFibGVUb3RhbEFtb3VudFxuICAgICAgICAgIDogaGVhZGVyPy50b3RhbEFtb3VudEN1cnJlbmN5ID8/IGhlYWRlcj8udG90YWxBbW91bnQgPz8gbnVsbCxcbiAgICAgICAgKGlzRWRpdGluZyA/IGRyYWZ0Q3VycmVuY3lDb2RlIDogaGVhZGVyPy5jdXJyZW5jeUNvZGUpIHx8IGhlYWRlcj8uY3VycmVuY3lDb2RlXG4gICAgICApO1xuICAgIH0sXG4gICAgW2RyYWZ0Q3VycmVuY3lDb2RlLCBkcmFmdFRvdGFsQW1vdW50LCBoZWFkZXI/LmN1cnJlbmN5Q29kZSwgaGVhZGVyPy50b3RhbEFtb3VudCwgaGVhZGVyPy50b3RhbEFtb3VudEN1cnJlbmN5LCBpc0VkaXRpbmddXG4gICk7XG5cclxuICBjb25zdCB0cmFuc0RhdGVUZXh0ID0gdXNlTWVtbyhcclxuICAgICgpID0+IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShpc0VkaXRpbmcgPyBkcmFmdFRyYW5zRGF0ZSA6IGhlYWRlcj8udGlja2V0RGF0ZSB8fCBoZWFkZXI/LnRyYW5zRGF0ZSwgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCIpLFxyXG4gICAgW2RyYWZ0VHJhbnNEYXRlLCBoZWFkZXI/LnRpY2tldERhdGUsIGhlYWRlcj8udHJhbnNEYXRlLCBpc0VkaXRpbmddXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgdGlja2V0VGltZVRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gZm9ybWF0RXhwZW5zZURpc3BsYXlUaW1lKGlzRWRpdGluZyA/IGRyYWZ0VGlja2V0VGltZSA6IGhlYWRlcj8udGlja2V0VGltZSksXHJcbiAgICBbZHJhZnRUaWNrZXRUaW1lLCBoZWFkZXI/LnRpY2tldFRpbWUsIGlzRWRpdGluZ11cclxuICApO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcGFnaW5hdGlvbkxhYmVscyxcclxuICAgIHByZXZpZXdBbHRUZXh0LFxyXG4gICAgc3RhdHVzTGFiZWwsXHJcbiAgICBnYXN0b1R5cGVMYWJlbCxcclxuICAgIHRvdGFsQW1vdW50VGV4dCxcclxuICAgIHRyYW5zRGF0ZVRleHQsXHJcbiAgICB0aWNrZXRUaW1lVGV4dCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsQ29uZmlybVN0YXRlQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsRXJyb3I6IHN0cmluZztcclxuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRTdGF0dXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gRW5jYXBzdWxhdGVzIGNvbmZpcm0gbW9kYWwgc3RhdGUgc28gdGhlIHBhZ2UgY29udGFpbmVyIHN0YXlzIGZvY3VzZWQgb24gZmxvdyB3aXJpbmcuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQ29uZmlybVN0YXRlID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsRXJyb3IsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBzZXRTdGF0dXMsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGVBcmdzKSA9PiB7XHJcbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XHJcbiAgICBkZWZhdWx0Q29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpLFxyXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XHJcbiAgICAgICAgc2V0U3RhdHVzKG1zZyk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LCBbYnVzeSwgaGFuZGxlQ29uZmlybSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzXSk7XHJcblxyXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XHJcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcclxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxyXG4gICAgOiAhYnVzeSAmJiBtb2RhbEVycm9yXHJcbiAgICAgID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpXHJcbiAgICAgIDogbW9kYWwuY29uZmlybVRleHQgfHwgaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIik7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghYnVzeSAmJiBtb2RhbEVycm9yKSB7XHJcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2b2lkIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xyXG4gIH0sIFtidXN5LCBjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbW9kYWxFcnJvcl0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbW9kYWwsXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICAgIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgICBtb2RhbENhbmNlbFRleHQsXHJcbiAgICBtb2RhbENvbmZpcm1UZXh0LFxyXG4gICAgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGFwcGVuZEV4cGVuc2VUaWNrZXRSZXR1cm5RdWVyeSxcclxuICBidWlsZEV4cGVuc2VTaGVldERldGFpbFVybCxcclxuICB0eXBlIEV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG59IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dC50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsSW50ZXJhY3Rpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGNvbnRleHRTaGVldElkOiBzdHJpbmc7XHJcbiAgaXNGcm9tU2hlZXRMaW5rOiBib29sZWFuO1xyXG4gIGhlYWRlckV4cGVuc2VTaGVldElkOiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGNhbk9wZW5TYXZlQ29uZmlybTogKCkgPT4gYm9vbGVhbjtcclxuICBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQ6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgYnlwYXNzV29ya2Zsb3dHdWFyZDogYm9vbGVhbjtcclxuICBsaW5lQ29udGFpbmVyUmVmOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBvcGVuUHJldmlldzogKCkgPT4gUHJvbWlzZTx2b2lkPjtcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0PzogRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQgfCBudWxsO1xyXG59O1xyXG5cclxuLy8gR3JvdXBzIHRpY2tldCBkZXRhaWwgbmF2aWdhdGlvbiBhbmQgbGluZS1jYXJkIGludGVyYWN0aW9ucyBiZWhpbmQgc3RhYmxlIGNhbGxiYWNrcy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgZmlsZUlkLFxyXG4gIGNvbnRleHRTaGVldElkLFxyXG4gIGlzRnJvbVNoZWV0TGluayxcclxuICBoZWFkZXJFeHBlbnNlU2hlZXRJZCxcclxuICBpc0VkaXRpbmcsXHJcbiAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gIGhhbmRsZVBlcnNpc3RIZWFkZXJEcmFmdCxcclxuICBieXBhc3NXb3JrZmxvd0d1YXJkLFxyXG4gIGxpbmVDb250YWluZXJSZWYsXHJcbiAgb3BlblByZXZpZXcsXHJcbiAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9uc0FyZ3MpID0+IHtcclxuICBjb25zdCBwZXJzaXN0SGVhZGVyRHJhZnRJZk5lZWRlZCA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmICghaXNFZGl0aW5nKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY2FuT3BlblNhdmVDb25maXJtKCkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQoKTtcclxuICB9LCBbY2FuT3BlblNhdmVDb25maXJtLCBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQsIGlzRWRpdGluZ10pO1xyXG5cclxuICBjb25zdCBvcGVuTGluZURldGFpbCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKHJhd0xpbmVSZWNJZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGlmIChpc0Zyb21TaGVldExpbmspIHJldHVybjtcclxuICAgICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgICAgY29uc3QgbGluZVJlY0lkID0gc2FmZVRleHQocmF3TGluZVJlY0lkKTtcclxuICAgICAgaWYgKCFsaW5lUmVjSWQgfHwgIWZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3Qgc2hvdWxkT3BlbkluRWRpdE1vZGUgPSBpc0VkaXRpbmc7XHJcbiAgICAgIGlmIChzaG91bGRPcGVuSW5FZGl0TW9kZSkge1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZU9rID0gYXdhaXQgcGVyc2lzdEhlYWRlckRyYWZ0SWZOZWVkZWQoKTtcclxuICAgICAgICBpZiAoIXVwZGF0ZU9rKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICAgIGZpbGVJZCxcclxuICAgICAgICBsaW5lUmVjSWQsXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoc2hvdWxkT3BlbkluRWRpdE1vZGUpIHtcclxuICAgICAgICBxdWVyeS5zZXQoXCJtb2RlXCIsIFwiZWRpdFwiKTtcclxuICAgICAgfVxyXG4gICAgICBhcHBlbmRFeHBlbnNlVGlja2V0UmV0dXJuUXVlcnkocXVlcnksIHRpY2tldFJldHVybkNvbnRleHQpO1xyXG5cclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0TGluZURldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiBzaG91bGRPcGVuSW5FZGl0TW9kZSB8fCBieXBhc3NXb3JrZmxvd0d1YXJkLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIGJ5cGFzc1dvcmtmbG93R3VhcmQsXHJcbiAgICAgIGZpbGVJZCxcclxuICAgICAgaXNFZGl0aW5nLFxyXG4gICAgICBpc0Zyb21TaGVldExpbmssXHJcbiAgICAgIHBlcnNpc3RIZWFkZXJEcmFmdElmTmVlZGVkLFxyXG4gICAgICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG9wZW5DcmVhdGVMaW5lRGV0YWlsID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGlzRnJvbVNoZWV0TGluaykgcmV0dXJuO1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgIGlmICghZmlsZUlkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgdXBkYXRlT2sgPSBhd2FpdCBwZXJzaXN0SGVhZGVyRHJhZnRJZk5lZWRlZCgpO1xyXG4gICAgaWYgKCF1cGRhdGVPaykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgZmlsZUlkLFxyXG4gICAgICBtb2RlOiBcImNyZWF0ZVwiLFxyXG4gICAgfSk7XHJcbiAgICBhcHBlbmRFeHBlbnNlVGlja2V0UmV0dXJuUXVlcnkocXVlcnksIHRpY2tldFJldHVybkNvbnRleHQpO1xyXG5cclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldExpbmVEZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcclxuICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcclxuICAgICAgYnlwYXNzR3VhcmRPbmNlOiBpc0VkaXRpbmcgfHwgYnlwYXNzV29ya2Zsb3dHdWFyZCxcclxuICAgIH0pO1xyXG4gIH0sIFtidXN5LCBieXBhc3NXb3JrZmxvd0d1YXJkLCBmaWxlSWQsIGlzRWRpdGluZywgaXNGcm9tU2hlZXRMaW5rLCBwZXJzaXN0SGVhZGVyRHJhZnRJZk5lZWRlZCwgdGlja2V0UmV0dXJuQ29udGV4dF0pO1xyXG5cclxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcclxuICAgICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xyXG4gICAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xyXG4gICAgICBpZiAoIWxpbmVDb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xyXG4gICAgICByZXR1cm4gY2FyZDtcclxuICAgIH0sXHJcbiAgICBbbGluZUNvbnRhaW5lclJlZl1cclxuICApO1xyXG5cclxuICBjb25zdCBvcGVuRmlsZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHZvaWQgb3BlblByZXZpZXcoKTtcclxuICB9LCBbb3BlblByZXZpZXddKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChpc0Zyb21TaGVldExpbmspIHJldHVybjtcclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQodGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCB8fCBoZWFkZXJFeHBlbnNlU2hlZXRJZCB8fCBjb250ZXh0U2hlZXRJZCk7XHJcbiAgICBpZiAoIXNhZmVTaGVldElkKSByZXR1cm47XHJcblxyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwoc2FmZVNoZWV0SWQpLCB7XHJcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxyXG4gICAgfSk7XHJcbiAgfSwgW2NvbnRleHRTaGVldElkLCBoZWFkZXJFeHBlbnNlU2hlZXRJZCwgaXNFZGl0aW5nLCBpc0Zyb21TaGVldExpbmssIHRpY2tldFJldHVybkNvbnRleHRdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG9wZW5DcmVhdGVMaW5lRGV0YWlsLFxyXG4gICAgb3BlbkxpbmVEZXRhaWwsXHJcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcclxuICAgIG9wZW5GaWxlLFxyXG4gICAgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5U2V0dGxlbWVudEZpZWxkcyBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lTZXR0bGVtZW50RmllbGRzLnRzeFwiO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0Q3VycmVuY3lTZXR0bGVtZW50RmllbGRzUHJvcHMgPSB7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGV4cGVuc2VDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBleHBlbnNlQ3VycmVuY3lJbnZhbGlkOiBib29sZWFuO1xyXG4gIGV4cGVuc2VDdXJyZW5jeUlucHV0UmVmOiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgbG9jYWxDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBleGNoYW5nZVJhdGU6IHN0cmluZztcclxuICBleGNoYW5nZVJhdGVJbnZhbGlkOiBib29sZWFuO1xyXG4gIGV4Y2hhbmdlUmF0ZUlucHV0UmVmOiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U6IHN0cmluZztcclxuICBhbW91bnRDdXJyZW5jeTogc3RyaW5nO1xyXG4gIGFtb3VudEN1cnJlbmN5SW52YWxpZDogYm9vbGVhbjtcclxuICBhbW91bnRDdXJyZW5jeUlucHV0UmVmOiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgcmVpbWJ1cnNlbWVudEFtb3VudDogc3RyaW5nO1xyXG4gIHJlaW1idXJzZW1lbnRBbW91bnRJbnZhbGlkOiBib29sZWFuO1xyXG4gIHJlaW1idXJzZW1lbnRBbW91bnRJbnB1dFJlZjogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIG9uRXhwZW5zZUN1cnJlbmN5Q2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkV4Y2hhbmdlUmF0ZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25FeGNoYW5nZVJhdGVDb21taXQ/OiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkFtb3VudEN1cnJlbmN5Q2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvblJlaW1idXJzZW1lbnRBbW91bnRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gS2VlcHMgdGlja2V0IGRldGFpbCB3aXJlZCB0byB0aGUgc2FtZSBzZXR0bGVtZW50IGNvbXBvbmVudCB1c2VkIGJ5IGV4cGVuc2UgbGluZXMuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRDdXJyZW5jeVNldHRsZW1lbnRGaWVsZHMgPSAoe1xyXG4gIGlzRWRpdGluZyxcclxuICBleHBlbnNlQ3VycmVuY3lDb2RlLFxyXG4gIGV4cGVuc2VDdXJyZW5jeUludmFsaWQsXHJcbiAgZXhwZW5zZUN1cnJlbmN5SW5wdXRSZWYsXHJcbiAgbG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgZXhjaGFuZ2VSYXRlLFxyXG4gIGV4Y2hhbmdlUmF0ZUludmFsaWQsXHJcbiAgZXhjaGFuZ2VSYXRlSW5wdXRSZWYsXHJcbiAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UsXHJcbiAgYW1vdW50Q3VycmVuY3ksXHJcbiAgYW1vdW50Q3VycmVuY3lJbnZhbGlkLFxyXG4gIGFtb3VudEN1cnJlbmN5SW5wdXRSZWYsXHJcbiAgcmVpbWJ1cnNlbWVudEFtb3VudCxcclxuICByZWltYnVyc2VtZW50QW1vdW50SW52YWxpZCxcclxuICByZWltYnVyc2VtZW50QW1vdW50SW5wdXRSZWYsXHJcbiAgb25FeHBlbnNlQ3VycmVuY3lDaGFuZ2UsXHJcbiAgb25FeGNoYW5nZVJhdGVDaGFuZ2UsXHJcbiAgb25FeGNoYW5nZVJhdGVDb21taXQsXHJcbiAgb25BbW91bnRDdXJyZW5jeUNoYW5nZSxcclxuICBvblJlaW1idXJzZW1lbnRBbW91bnRDaGFuZ2UsXHJcbn06IEV4cGVuc2VUaWNrZXRDdXJyZW5jeVNldHRsZW1lbnRGaWVsZHNQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8RXhwZW5zZUN1cnJlbmN5U2V0dGxlbWVudEZpZWxkc1xyXG4gICAgICBpc0VkaXRpbmc9e2lzRWRpdGluZ31cclxuICAgICAgZXhwZW5zZUN1cnJlbmN5Q29kZT17ZXhwZW5zZUN1cnJlbmN5Q29kZX1cclxuICAgICAgZXhwZW5zZUN1cnJlbmN5SW52YWxpZD17ZXhwZW5zZUN1cnJlbmN5SW52YWxpZH1cclxuICAgICAgZXhwZW5zZUN1cnJlbmN5SW5wdXRSZWY9e2V4cGVuc2VDdXJyZW5jeUlucHV0UmVmfVxyXG4gICAgICBsb2NhbEN1cnJlbmN5Q29kZT17bG9jYWxDdXJyZW5jeUNvZGV9XHJcbiAgICAgIGV4Y2hhbmdlUmF0ZT17ZXhjaGFuZ2VSYXRlfVxyXG4gICAgICBleGNoYW5nZVJhdGVJbnZhbGlkPXtleGNoYW5nZVJhdGVJbnZhbGlkfVxyXG4gICAgICBleGNoYW5nZVJhdGVJbnB1dFJlZj17ZXhjaGFuZ2VSYXRlSW5wdXRSZWZ9XHJcbiAgICAgIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlPXtleGNoYW5nZVJhdGVJbmZvTWVzc2FnZX1cclxuICAgICAgYW1vdW50Q3VycmVuY3k9e2Ftb3VudEN1cnJlbmN5fVxyXG4gICAgICBhbW91bnRDdXJyZW5jeU1vZGU9XCJlZGl0YWJsZVwiXHJcbiAgICAgIGFtb3VudEN1cnJlbmN5SW52YWxpZD17YW1vdW50Q3VycmVuY3lJbnZhbGlkfVxyXG4gICAgICBhbW91bnRDdXJyZW5jeUlucHV0UmVmPXthbW91bnRDdXJyZW5jeUlucHV0UmVmfVxyXG4gICAgICByZWltYnVyc2VtZW50QW1vdW50PXtyZWltYnVyc2VtZW50QW1vdW50fVxyXG4gICAgICByZWltYnVyc2VtZW50QW1vdW50SW52YWxpZD17cmVpbWJ1cnNlbWVudEFtb3VudEludmFsaWR9XHJcbiAgICAgIHJlaW1idXJzZW1lbnRBbW91bnRJbnB1dFJlZj17cmVpbWJ1cnNlbWVudEFtb3VudElucHV0UmVmfVxyXG4gICAgICBvbkV4cGVuc2VDdXJyZW5jeUNoYW5nZT17b25FeHBlbnNlQ3VycmVuY3lDaGFuZ2V9XHJcbiAgICAgIG9uRXhjaGFuZ2VSYXRlQ2hhbmdlPXtvbkV4Y2hhbmdlUmF0ZUNoYW5nZX1cclxuICAgICAgb25FeGNoYW5nZVJhdGVDb21taXQ9e29uRXhjaGFuZ2VSYXRlQ29tbWl0fVxyXG4gICAgICBvbkFtb3VudEN1cnJlbmN5Q2hhbmdlPXtvbkFtb3VudEN1cnJlbmN5Q2hhbmdlfVxyXG4gICAgICBvblJlaW1idXJzZW1lbnRBbW91bnRDaGFuZ2U9e29uUmVpbWJ1cnNlbWVudEFtb3VudENoYW5nZX1cclxuICAgIC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRDdXJyZW5jeVNldHRsZW1lbnRGaWVsZHM7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIH0gZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBoYXNFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3U291cmNlIH0gZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL2V4cGVuc2VUaWNrZXRQcmV2aWV3VXRpbHMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVJlYWRPbmx5RmllbGQgZnJvbSBcIi4vRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0Q3VycmVuY3lTZXR0bGVtZW50RmllbGRzIGZyb20gXCIuL0V4cGVuc2VUaWNrZXRDdXJyZW5jeVNldHRsZW1lbnRGaWVsZHMudHN4XCI7XHJcblxyXG5jb25zdCBoYXNSZWFsRXhwZW5zZVNoZWV0VmFsdWUgPSAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBzYWZlVGV4dCh2YWx1ZSkudG9Mb3dlckNhc2UoKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBmYWxzZTtcclxuICBpZiAobm9ybWFsaXplZCA9PT0gXCItXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIwXCIpIHJldHVybiBmYWxzZTtcclxuICBpZiAobm9ybWFsaXplZCA9PT0gXCJuL2FcIiB8fCBub3JtYWxpemVkID09PSBcIm5hXCIpIHJldHVybiBmYWxzZTtcclxuICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm1Qcm9wcyA9IHtcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXI7XHJcbiAgc3RhdHVzTGFiZWw6IHN0cmluZztcclxuICBnYXN0b1R5cGVMYWJlbDogc3RyaW5nO1xyXG4gIHRvdGFsQW1vdW50VGV4dDogc3RyaW5nO1xyXG4gIHRyYW5zRGF0ZVRleHQ6IHN0cmluZztcclxuICB0aWNrZXRUaW1lVGV4dDogc3RyaW5nO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBnYXN0b1R5cGVPcHRpb25zOiBBcnJheTx7IHZhbHVlOiBzdHJpbmc7IHRleHQ6IHN0cmluZyB9PjtcclxuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb25JbnZhbGlkOiBib29sZWFuO1xyXG4gIGRlc2NyaXB0aW9uSW5wdXRSZWY6IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICBkcmFmdEdhc3RvVHlwZTogc3RyaW5nO1xyXG4gIGdhc3RvVHlwZUludmFsaWQ6IGJvb2xlYW47XHJcbiAgZ2FzdG9UeXBlSW5wdXRSZWY6IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGN1cnJlbmN5Q29kZUludmFsaWQ6IGJvb2xlYW47XHJcbiAgY3VycmVuY3lJbnB1dFJlZjogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIGRyYWZ0VG90YWxBbW91bnQ6IHN0cmluZztcclxuICB0b3RhbEFtb3VudEludmFsaWQ6IGJvb2xlYW47XHJcbiAgdG90YWxBbW91bnRJbnB1dFJlZjogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlOiBzdHJpbmc7XHJcbiAgZXhjaGFuZ2VSYXRlSW52YWxpZDogYm9vbGVhbjtcclxuICBleGNoYW5nZVJhdGVJbnB1dFJlZjogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlOiBzdHJpbmc7XHJcbiAgZHJhZnRBbW91bnRNU1Q6IHN0cmluZztcclxuICBhbW91bnRNU1RJbnZhbGlkOiBib29sZWFuO1xyXG4gIGFtb3VudE1TVElucHV0UmVmOiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgbG9jYWxDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIGRyYWZ0VGlja2V0VGltZTogc3RyaW5nO1xyXG4gIGRyYWZ0VXJsRmlsZTogc3RyaW5nO1xyXG4gIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcclxuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRHYXN0b1R5cGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRUb3RhbEFtb3VudENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNvbW1pdD86ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRBbW91bnRNU1RDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uT3BlbkZpbGU6ICgpID0+IHZvaWQ7XHJcbiAgb25PcGVuRXhwZW5zZVNoZWV0PzogKCkgPT4gdm9pZDtcclxuICBoaWRlT3BlbkZpbGVBY3Rpb24/OiBib29sZWFuO1xyXG4gIGNoaWxkcmVuPzogUmVhY3QuUmVhY3ROb2RlO1xyXG59O1xyXG5cclxuLy8gUmVhZC1vbmx5IGFuZCBlZGl0YWJsZSBoZWFkZXIgZm9ybSBmb3IgdGlja2V0IGRldGFpbC5cclxuY29uc3QgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm0gPSAoe1xyXG4gIGhlYWRlcixcclxuICBzdGF0dXNMYWJlbCxcclxuICBnYXN0b1R5cGVMYWJlbCxcclxuICB0b3RhbEFtb3VudFRleHQsXHJcbiAgdHJhbnNEYXRlVGV4dCxcclxuICB0aWNrZXRUaW1lVGV4dCxcclxuICBpc0VkaXRpbmcsXHJcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICBkZXNjcmlwdGlvbklucHV0UmVmLFxyXG4gIGRyYWZ0R2FzdG9UeXBlLFxyXG4gIGdhc3RvVHlwZUludmFsaWQsXHJcbiAgZ2FzdG9UeXBlSW5wdXRSZWYsXHJcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICBjdXJyZW5jeUlucHV0UmVmLFxyXG4gIGRyYWZ0VG90YWxBbW91bnQsXHJcbiAgdG90YWxBbW91bnRJbnZhbGlkLFxyXG4gIHRvdGFsQW1vdW50SW5wdXRSZWYsXHJcbiAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgZXhjaGFuZ2VSYXRlSW52YWxpZCxcclxuICBleGNoYW5nZVJhdGVJbnB1dFJlZixcclxuICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSxcclxuICBkcmFmdEFtb3VudE1TVCxcclxuICBhbW91bnRNU1RJbnZhbGlkLFxyXG4gIGFtb3VudE1TVElucHV0UmVmLFxyXG4gIGxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0VHJhbnNEYXRlLFxyXG4gIGRyYWZ0VGlja2V0VGltZSxcclxuICBkcmFmdFVybEZpbGUsXHJcbiAgZHJhZnRGaWxlTmFtZSxcclxuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UsXHJcbiAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZSxcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlLFxyXG4gIG9uRHJhZnRUb3RhbEFtb3VudENoYW5nZSxcclxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlLFxyXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDb21taXQsXHJcbiAgb25EcmFmdEFtb3VudE1TVENoYW5nZSxcclxuICBvbk9wZW5GaWxlLFxyXG4gIG9uT3BlbkV4cGVuc2VTaGVldCxcclxuICBoaWRlT3BlbkZpbGVBY3Rpb24gPSBmYWxzZSxcclxuICBjaGlsZHJlbixcclxufTogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm1Qcm9wcykgPT4ge1xyXG4gIGNvbnN0IHByZXZpZXdVcmwgPSBzYWZlVGV4dChpc0VkaXRpbmcgPyBkcmFmdFVybEZpbGUgOiBoZWFkZXIudXJsRmlsZSk7XHJcbiAgY29uc3QgY2FuT3BlbkZpbGUgPSBoYXNFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3U291cmNlKHByZXZpZXdVcmwpO1xyXG4gIGNvbnN0IHNob3dFeHBlbnNlU2hlZXRGaWVsZCA9IGhhc1JlYWxFeHBlbnNlU2hlZXRWYWx1ZShoZWFkZXIuaG9qYUdhc3Rvc0lkRGlzcGxheSk7XHJcbiAgY29uc3QgbG9jYWxlID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCI7XHJcbiAgY29uc3QgZGlzcGxheURhdGVUZXh0ID1cclxuICAgIHRyYW5zRGF0ZVRleHQgfHxcclxuICAgIGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShoZWFkZXIudGlja2V0RGF0ZSB8fCBoZWFkZXIudHJhbnNEYXRlLCBsb2NhbGUpIHx8XHJcbiAgICBcIi1cIjtcclxuICBjb25zdCBsb2NrZWREcmFmdERhdGVUZXh0ID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGRyYWZ0VHJhbnNEYXRlLCBsb2NhbGUpIHx8IGRpc3BsYXlEYXRlVGV4dDtcclxuICBjb25zdCBjYXRlZ29yeUZpZWxkID0gaXNFZGl0aW5nID8gKFxyXG4gICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cclxuICAgICAgb3B0aW9ucz17Z2FzdG9UeXBlT3B0aW9uc31cclxuICAgICAgdmFsdWU9e2RyYWZ0R2FzdG9UeXBlfVxyXG4gICAgICBvbkNoYW5nZT17b25EcmFmdEdhc3RvVHlwZUNoYW5nZX1cclxuICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxyXG4gICAgICBpbnB1dFJlZj17Z2FzdG9UeXBlSW5wdXRSZWZ9XHJcbiAgICAgIGludmFsaWQ9e2dhc3RvVHlwZUludmFsaWR9XHJcbiAgICAgIHVzZVBvcnRhbFxyXG4gICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XHJcbiAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxyXG4gICAgLz5cclxuICApIDogKFxyXG4gICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cclxuICAgICAgdmFsdWU9e2dhc3RvVHlwZUxhYmVsIHx8IFwiLVwifVxyXG4gICAgLz5cclxuICApO1xyXG4gIGNvbnN0IHN0YXR1c0ZpZWxkID0gKFxyXG4gICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XHJcbiAgICAgIHZhbHVlPXtzdGF0dXNMYWJlbCB8fCBcIi1cIn1cclxuICAgIC8+XHJcbiAgKTtcclxuICBjb25zdCB0aWNrZXRGaWVsZCA9IChcclxuICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmllbGRfRmlsZUlkXCIsIFwiVGlja2V0IElkLlwiKX1cclxuICAgICAgdmFsdWU9e2hlYWRlci5maWxlSWQgfHwgXCItXCJ9XHJcbiAgICAvPlxyXG4gICk7XHJcbiAgY29uc3QgZXhwZW5zZVNoZWV0RmllbGQgPSBzaG93RXhwZW5zZVNoZWV0RmllbGQgPyAoXHJcbiAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX0V4cGVuc2VTaGVldERpc3BsYXlcIiwgXCJFeHBlbnNlIHNoZWV0IElkLlwiKX1cclxuICAgICAgdmFsdWU9e2hlYWRlci5ob2phR2FzdG9zSWREaXNwbGF5IHx8IFwiLVwifVxyXG4gICAgICBvbkNsaWNrPXtvbk9wZW5FeHBlbnNlU2hlZXR9XHJcbiAgICAvPlxyXG4gICkgOiBudWxsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicmVsYXRpdmUgc2hhZG93LXhzIGdsYXNzLXBhbmVsIHAtNCBzcGFjZS15LTQgYm9yZGVyIGJvcmRlci16aW5jLTIwMCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cclxuICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZDpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX08L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICByZWY9e2Rlc2NyaXB0aW9uSW5wdXRSZWZ9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sJHtkZXNjcmlwdGlvbkludmFsaWQgPyBcIiBib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpib3JkZXItcm9zZS00MDAgZm9jdXM6cmluZy1yb3NlLTIwMFwiIDogXCJcIn1gfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XHJcbiAgICAgICAgICAgICAgYXJpYS1pbnZhbGlkPXtkZXNjcmlwdGlvbkludmFsaWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIn1cclxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2hlYWRlci5kZXNjcmlwdGlvbiB8fCBcIi1cIn1cclxuICAgICAgICAgICAgZnVsbFdpZHRoXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcblxyXG4gICAgICAgIDxFeHBlbnNlVGlja2V0Q3VycmVuY3lTZXR0bGVtZW50RmllbGRzXHJcbiAgICAgICAgICBpc0VkaXRpbmc9e2lzRWRpdGluZ31cclxuICAgICAgICAgIGV4cGVuc2VDdXJyZW5jeUNvZGU9e2lzRWRpdGluZyA/IGRyYWZ0Q3VycmVuY3lDb2RlIDogc2FmZVRleHQoaGVhZGVyLmN1cnJlbmN5Q29kZSl9XHJcbiAgICAgICAgICBleHBlbnNlQ3VycmVuY3lJbnZhbGlkPXtjdXJyZW5jeUNvZGVJbnZhbGlkfVxyXG4gICAgICAgICAgZXhwZW5zZUN1cnJlbmN5SW5wdXRSZWY9e2N1cnJlbmN5SW5wdXRSZWZ9XHJcbiAgICAgICAgICBsb2NhbEN1cnJlbmN5Q29kZT17bG9jYWxDdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgICBleGNoYW5nZVJhdGU9e2RyYWZ0RXhjaGFuZ2VSYXRlfVxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlSW52YWxpZD17ZXhjaGFuZ2VSYXRlSW52YWxpZH1cclxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZUlucHV0UmVmPXtleGNoYW5nZVJhdGVJbnB1dFJlZn1cclxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlPXtleGNoYW5nZVJhdGVJbmZvTWVzc2FnZX1cclxuICAgICAgICAgIGFtb3VudEN1cnJlbmN5PXtpc0VkaXRpbmcgPyBkcmFmdFRvdGFsQW1vdW50IDogdG90YWxBbW91bnRUZXh0IHx8IFwiLVwifVxyXG4gICAgICAgICAgYW1vdW50Q3VycmVuY3lJbnZhbGlkPXt0b3RhbEFtb3VudEludmFsaWR9XHJcbiAgICAgICAgICBhbW91bnRDdXJyZW5jeUlucHV0UmVmPXt0b3RhbEFtb3VudElucHV0UmVmfVxyXG4gICAgICAgICAgcmVpbWJ1cnNlbWVudEFtb3VudD17ZHJhZnRBbW91bnRNU1R9XHJcbiAgICAgICAgICByZWltYnVyc2VtZW50QW1vdW50SW52YWxpZD17YW1vdW50TVNUSW52YWxpZH1cclxuICAgICAgICAgIHJlaW1idXJzZW1lbnRBbW91bnRJbnB1dFJlZj17YW1vdW50TVNUSW5wdXRSZWZ9XHJcbiAgICAgICAgICBvbkV4cGVuc2VDdXJyZW5jeUNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cclxuICAgICAgICAgIG9uRXhjaGFuZ2VSYXRlQ2hhbmdlPXtvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlfVxyXG4gICAgICAgICAgb25FeGNoYW5nZVJhdGVDb21taXQ9e29uRHJhZnRFeGNoYW5nZVJhdGVDb21taXR9XHJcbiAgICAgICAgICBvbkFtb3VudEN1cnJlbmN5Q2hhbmdlPXtvbkRyYWZ0VG90YWxBbW91bnRDaGFuZ2V9XHJcbiAgICAgICAgICBvblJlaW1idXJzZW1lbnRBbW91bnRDaGFuZ2U9e29uRHJhZnRBbW91bnRNU1RDaGFuZ2V9XHJcbiAgICAgICAgLz5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZDpjb2wtc3Bhbi0yIGdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTRcIj5cclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmllbGRfVGlja2V0RGF0ZVwiLCBcIkRhdGVcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtpc0VkaXRpbmcgPyBsb2NrZWREcmFmdERhdGVUZXh0IDogZGlzcGxheURhdGVUZXh0fVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX1RpY2tldFRpbWVcIiwgXCJUaW1lXCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17aXNFZGl0aW5nID8gZHJhZnRUaWNrZXRUaW1lIHx8IHRpY2tldFRpbWVUZXh0IHx8IFwiLVwiIDogdGlja2V0VGltZVRleHQgfHwgXCItXCJ9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kOmNvbC1zcGFuLTIgZ3JpZCBncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgICAge2NhdGVnb3J5RmllbGR9XHJcbiAgICAgICAgICB7c3RhdHVzRmllbGR9XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHtleHBlbnNlU2hlZXRGaWVsZCA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWQ6Y29sLXNwYW4tMiBncmlkIGdyaWQtY29scy0yIGdhcC00XCI+XHJcbiAgICAgICAgICAgIHt0aWNrZXRGaWVsZH1cclxuICAgICAgICAgICAge2V4cGVuc2VTaGVldEZpZWxkfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIHRpY2tldEZpZWxkXHJcbiAgICAgICAgKX1cclxuXHJcbiAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtjYW5PcGVuRmlsZSAmJiAhaGlkZU9wZW5GaWxlQWN0aW9uID8gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWVuZFwiPlxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiXHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uT3BlbkZpbGV9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtpbmRUKFwiVGlja2V0c19EZXRhaWxfVmlld0F0dGFjaG1lbnRcIiwgXCJWZXIgYWRqdW50b1wiKX1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHtcclxuICBnZXRFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2VMYWJlbCxcclxuICBnZXRFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2VPcHRpb25zLFxyXG4gIG5vcm1hbGl6ZUV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxufSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VSZWltYnVyc2FibGVFeHBlbnNlQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dCBmcm9tIFwiLi9FeHBlbnNlUHJvamVjdEZpbHRlcklucHV0LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVJlYWRPbmx5RmllbGQgZnJvbSBcIi4vRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4XCI7XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVTZWN0aW9uUHJvcHMgPSB7XHJcbiAgcHJvamVjdElkOiBzdHJpbmc7XHJcbiAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogbnVtYmVyO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBpc0xvYWRpbmc6IGJvb2xlYW47XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIGVycm9yTWVzc2FnZT86IHN0cmluZztcclxuICBvblByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25SZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIFJlbmRlcnMgbGlua2VkIGV4cGVuc2Utc2hlZXQgbGluZSBmaWVsZHMgaW5saW5lIGluc2lkZSB0aGUgdGlja2V0IGRldGFpbCBmb3JtLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lU2VjdGlvbiA9ICh7XHJcbiAgcHJvamVjdElkLFxyXG4gIHJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzTG9hZGluZyxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIGVycm9yTWVzc2FnZSA9IFwiXCIsXHJcbiAgb25Qcm9qZWN0SWRDaGFuZ2UsXHJcbiAgb25SZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlLFxyXG59OiBFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lU2VjdGlvblByb3BzKSA9PiB7XHJcbiAgY29uc3QgcmVpbWJ1cnNhYmxlRXhwZW5zZU9wdGlvbnMgPSBSZWFjdC51c2VNZW1vKCgpID0+IGdldEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZU9wdGlvbnMoKSwgW10pO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRSZWltYnVyc2FibGVFeHBlbnNlID0gbm9ybWFsaXplRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlKHJlaW1idXJzYWJsZUV4cGVuc2UpO1xyXG4gIGNvbnN0IHJlaW1idXJzYWJsZUV4cGVuc2VMYWJlbCA9IGdldEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZUxhYmVsKG5vcm1hbGl6ZWRSZWltYnVyc2FibGVFeHBlbnNlKTtcclxuICBjb25zdCBwcm9qZWN0RmllbGQgPSBpc0VkaXRpbmcgPyAoXHJcbiAgICA8RXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFxyXG4gICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9XHJcbiAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfUHJvamVjdF9QbGFjZWhvbGRlclwiLCBcIlByb2plY3QgaWRcIil9XHJcbiAgICAgIHZhbHVlPXtwcm9qZWN0SWR9XHJcbiAgICAgIG9uQ2hhbmdlPXtvblByb2plY3RJZENoYW5nZX1cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICByZWFkT25seT17ZGlzYWJsZWR9XHJcbiAgICAvPlxyXG4gICkgOiAoXHJcbiAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxyXG4gICAgICB2YWx1ZT17cHJvamVjdElkIHx8IFwiLVwifVxyXG4gICAgLz5cclxuICApO1xyXG4gIGNvbnN0IHJlaW1idXJzYWJsZUV4cGVuc2VGaWVsZCA9IGlzRWRpdGluZyA/IChcclxuICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUmVpbWJ1cnNhYmxlRXhwZW5zZVwiLCBcIlJlaW1idXJzYWJsZVwiKX1cclxuICAgICAgb3B0aW9ucz17cmVpbWJ1cnNhYmxlRXhwZW5zZU9wdGlvbnN9XHJcbiAgICAgIHZhbHVlPXtTdHJpbmcobm9ybWFsaXplZFJlaW1idXJzYWJsZUV4cGVuc2UpfVxyXG4gICAgICBvbkNoYW5nZT17KHZhbHVlKSA9PiBvblJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2Uobm9ybWFsaXplRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlKHZhbHVlKSl9XHJcbiAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9SZWltYnVyc2FibGVFeHBlbnNlXCIsIFwiUmVpbWJ1cnNhYmxlXCIpfVxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgcmVhZE9ubHk9e2Rpc2FibGVkfVxuICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XG4gICAgLz5cclxuICApIDogKFxyXG4gICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9SZWltYnVyc2FibGVFeHBlbnNlXCIsIFwiUmVpbWJ1cnNhYmxlXCIpfVxyXG4gICAgICB2YWx1ZT17cmVpbWJ1cnNhYmxlRXhwZW5zZUxhYmVsfVxyXG4gICAgLz5cclxuICApO1xyXG5cclxuICBpZiAoaXNMb2FkaW5nKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kOmNvbC1zcGFuLTIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXppbmMtNzAwXCI+XHJcbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBzaXplLTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxyXG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGlmIChlcnJvck1lc3NhZ2UpIHtcclxuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm1kOmNvbC1zcGFuLTIgdGV4dC1kYW5nZXIgdGV4dC1zbVwiPntlcnJvck1lc3NhZ2V9PC9kaXY+O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWQ6Y29sLXNwYW4tMiBncmlkIGdyaWQtY29scy0yIGdhcC0zIG1kOmdhcC00XCI+XHJcbiAgICAgIHtwcm9qZWN0RmllbGR9XHJcbiAgICAgIHtyZWltYnVyc2FibGVFeHBlbnNlRmllbGR9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZVNlY3Rpb247XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgUmVmT2JqZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm0udHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lU2VjdGlvbiBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lU2VjdGlvbi50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRMaW5lc0xpc3QgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmVzTGlzdC50c3hcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLCBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbCBmcm9tIFwiLi9FeHBlbnNlVGlja2V0UHJldmlld01vZGFsLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXcgZnJvbSBcIi4vRXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXcudHN4XCI7XHJcbmltcG9ydCB0eXBlIHsgVGlja2V0UHJldmlld1BvaW50IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldy50c1wiO1xyXG5cclxudHlwZSBQYWdpbmF0aW9uTGFiZWxzID0ge1xyXG4gIGZpcnN0OiBzdHJpbmc7XHJcbiAgcHJldjogc3RyaW5nO1xyXG4gIG5leHQ6IHN0cmluZztcclxuICBsYXN0OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3UHJvcHMgPSB7XHJcbiAgbW9kYWw6IHtcclxuICAgIG9wZW46IGJvb2xlYW47XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ6IHN0cmluZztcclxuICAgIGNhbmNlbFRleHQ6IHN0cmluZztcclxuICAgIGxvYWRpbmdUZXh0OiBzdHJpbmc7XHJcbiAgICBzaG93Q2FuY2VsOiBib29sZWFuO1xyXG4gICAgc2hvd0NvbmZpcm06IGJvb2xlYW47XHJcbiAgICBidXN5OiBib29sZWFuO1xyXG4gICAgZXJyb3I6IHN0cmluZztcclxuICAgIHN0YXR1czogc3RyaW5nO1xyXG4gICAgb25Db25maXJtOiAoKSA9PiB2b2lkO1xyXG4gICAgb25DYW5jZWw6ICgpID0+IHZvaWQ7XHJcbiAgfTtcclxuICBwcmV2aWV3OiB7XHJcbiAgICBvcGVuOiBib29sZWFuO1xyXG4gICAgYnVzeTogYm9vbGVhbjtcclxuICAgIGVycm9yOiBzdHJpbmc7XHJcbiAgICBpbWFnZVVybDogc3RyaW5nO1xyXG4gICAgaW1hZ2VBbHQ6IHN0cmluZztcclxuICAgIHNjYWxlOiBudW1iZXI7XHJcbiAgICB0cmFuc2xhdGU6IFRpY2tldFByZXZpZXdQb2ludDtcclxuICAgIHN1cmZhY2VSZWY6IFJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gICAgb25DbG9zZTogKCkgPT4gdm9pZDtcclxuICAgIG9uUG9pbnRlckRvd246IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICAgIG9uUG9pbnRlck1vdmU6IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICAgIG9uUG9pbnRlckVuZDogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIH07XHJcbiAgY29udGVudDoge1xyXG4gICAgaXNMb2FkaW5nOiBib29sZWFuO1xyXG4gICAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xyXG4gICAgc2hvd1N0aWNreVByZXZpZXc6IGJvb2xlYW47XHJcbiAgICBwcmV2aWV3QnVzeTogYm9vbGVhbjtcclxuICAgIHByZXZpZXdFcnJvcjogc3RyaW5nO1xyXG4gICAgcHJldmlld0ltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICBwcmV2aWV3RmlsZU5hbWU6IHN0cmluZztcclxuICAgIHByZXZpZXdBbHRUZXh0OiBzdHJpbmc7XHJcbiAgICBvbk9wZW5QcmV2aWV3OiAoKSA9PiB2b2lkO1xyXG4gICAgc3RhdHVzTGFiZWw6IHN0cmluZztcclxuICAgIGdhc3RvVHlwZUxhYmVsOiBzdHJpbmc7XHJcbiAgICB0b3RhbEFtb3VudFRleHQ6IHN0cmluZztcclxuICAgIHRyYW5zRGF0ZVRleHQ6IHN0cmluZztcclxuICAgIHRpY2tldFRpbWVUZXh0OiBzdHJpbmc7XHJcbiAgICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgICBnYXN0b1R5cGVPcHRpb25zOiBBcnJheTx7IHZhbHVlOiBzdHJpbmc7IHRleHQ6IHN0cmluZyB9PjtcclxuICAgIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIGRlc2NyaXB0aW9uSW52YWxpZDogYm9vbGVhbjtcclxuICAgIGRlc2NyaXB0aW9uSW5wdXRSZWY6IFJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgICBkcmFmdEdhc3RvVHlwZTogc3RyaW5nO1xyXG4gICAgZ2FzdG9UeXBlSW52YWxpZDogYm9vbGVhbjtcclxuICAgIGdhc3RvVHlwZUlucHV0UmVmOiBSZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICAgIGN1cnJlbmN5Q29kZUludmFsaWQ6IGJvb2xlYW47XHJcbiAgICBjdXJyZW5jeUlucHV0UmVmOiBSZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gICAgZHJhZnRUb3RhbEFtb3VudDogc3RyaW5nO1xyXG4gICAgdG90YWxBbW91bnRJbnZhbGlkOiBib29sZWFuO1xyXG4gICAgdG90YWxBbW91bnRJbnB1dFJlZjogUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlOiBzdHJpbmc7XHJcbiAgICBleGNoYW5nZVJhdGVJbnZhbGlkOiBib29sZWFuO1xyXG4gICAgZXhjaGFuZ2VSYXRlSW5wdXRSZWY6IFJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgZHJhZnRBbW91bnRNU1Q6IHN0cmluZztcclxuICAgIGFtb3VudE1TVEludmFsaWQ6IGJvb2xlYW47XHJcbiAgICBhbW91bnRNU1RJbnB1dFJlZjogUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICAgIGxvY2FsQ3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gICAgZHJhZnRUaWNrZXRUaW1lOiBzdHJpbmc7XHJcbiAgICBkcmFmdFVybEZpbGU6IHN0cmluZztcclxuICAgIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcclxuICAgIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICAgIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgb25EcmFmdFRvdGFsQW1vdW50Q2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICAgIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNvbW1pdDogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICBvbkRyYWZ0QW1vdW50TVNUQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICAgIG9uT3BlbkZpbGU6ICgpID0+IHZvaWQ7XHJcbiAgICBvbk9wZW5FeHBlbnNlU2hlZXQ/OiAoKSA9PiB2b2lkO1xyXG4gICAgbGlua2VkTGluZToge1xyXG4gICAgICB2aXNpYmxlOiBib29sZWFuO1xyXG4gICAgICBwcm9qZWN0SWQ6IHN0cmluZztcclxuICAgICAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogbnVtYmVyO1xyXG4gICAgICBpc0xvYWRpbmc6IGJvb2xlYW47XHJcbiAgICAgIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgICBkaXNhYmxlZDogYm9vbGVhbjtcclxuICAgICAgb25Qcm9qZWN0SWRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgICBvblJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2U6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xyXG4gICAgfTtcclxuICAgIHZpc2libGVMaW5lczogRXhwZW5zZVRpY2tldERldGFpbExpbmVbXTtcclxuICAgIHRvdGFsTGluZVBhZ2VzOiBudW1iZXI7XHJcbiAgICBsaW5lUGFnZTogbnVtYmVyO1xyXG4gICAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgICBwYWdpbmF0aW9uTGFiZWxzOiBQYWdpbmF0aW9uTGFiZWxzO1xyXG4gICAgY29udGFpbmVyUmVmOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICAgIG9uTGluZVBhZ2VDaGFuZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XHJcbiAgICBvbk9wZW5MaW5lOiAobGluZVJlY0lkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFJlbmRlcnMgdGhlIHRpY2tldCBkZXRhaWwgdmlldyB3aGlsZSB0aGUgcGFnZSBjb250YWluZXIgb3ducyBvcmNoZXN0cmF0aW9uLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0RGV0YWlsVmlldyA9ICh7IG1vZGFsLCBwcmV2aWV3LCBjb250ZW50IH06IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3UHJvcHMpID0+IHtcclxuICBjb25zdCBkZXRhaWxCb2R5ID0gKFxyXG4gICAgPD5cclxuICAgICAgPEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtXHJcbiAgICAgICAgaGVhZGVyPXtjb250ZW50LmhlYWRlcn1cclxuICAgICAgICBzdGF0dXNMYWJlbD17Y29udGVudC5zdGF0dXNMYWJlbH1cclxuICAgICAgICBnYXN0b1R5cGVMYWJlbD17Y29udGVudC5nYXN0b1R5cGVMYWJlbH1cclxuICAgICAgICB0b3RhbEFtb3VudFRleHQ9e2NvbnRlbnQudG90YWxBbW91bnRUZXh0fVxyXG4gICAgICAgIHRyYW5zRGF0ZVRleHQ9e2NvbnRlbnQudHJhbnNEYXRlVGV4dH1cclxuICAgICAgICB0aWNrZXRUaW1lVGV4dD17Y29udGVudC50aWNrZXRUaW1lVGV4dH1cclxuICAgICAgICBpc0VkaXRpbmc9e2NvbnRlbnQuaXNFZGl0aW5nfVxyXG4gICAgICAgIGdhc3RvVHlwZU9wdGlvbnM9e2NvbnRlbnQuZ2FzdG9UeXBlT3B0aW9uc31cclxuICAgICAgICBkcmFmdERlc2NyaXB0aW9uPXtjb250ZW50LmRyYWZ0RGVzY3JpcHRpb259XHJcbiAgICAgICAgZGVzY3JpcHRpb25JbnZhbGlkPXtjb250ZW50LmRlc2NyaXB0aW9uSW52YWxpZH1cclxuICAgICAgICBkZXNjcmlwdGlvbklucHV0UmVmPXtjb250ZW50LmRlc2NyaXB0aW9uSW5wdXRSZWZ9XHJcbiAgICAgICAgZHJhZnRHYXN0b1R5cGU9e2NvbnRlbnQuZHJhZnRHYXN0b1R5cGV9XHJcbiAgICAgICAgZ2FzdG9UeXBlSW52YWxpZD17Y29udGVudC5nYXN0b1R5cGVJbnZhbGlkfVxyXG4gICAgICAgIGdhc3RvVHlwZUlucHV0UmVmPXtjb250ZW50Lmdhc3RvVHlwZUlucHV0UmVmfVxyXG4gICAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlPXtjb250ZW50LmRyYWZ0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgIGN1cnJlbmN5Q29kZUludmFsaWQ9e2NvbnRlbnQuY3VycmVuY3lDb2RlSW52YWxpZH1cclxuICAgICAgICBjdXJyZW5jeUlucHV0UmVmPXtjb250ZW50LmN1cnJlbmN5SW5wdXRSZWZ9XHJcbiAgICAgICAgZHJhZnRUb3RhbEFtb3VudD17Y29udGVudC5kcmFmdFRvdGFsQW1vdW50fVxyXG4gICAgICAgIHRvdGFsQW1vdW50SW52YWxpZD17Y29udGVudC50b3RhbEFtb3VudEludmFsaWR9XHJcbiAgICAgICAgdG90YWxBbW91bnRJbnB1dFJlZj17Y29udGVudC50b3RhbEFtb3VudElucHV0UmVmfVxyXG4gICAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlPXtjb250ZW50LmRyYWZ0RXhjaGFuZ2VSYXRlfVxyXG4gICAgICAgIGV4Y2hhbmdlUmF0ZUludmFsaWQ9e2NvbnRlbnQuZXhjaGFuZ2VSYXRlSW52YWxpZH1cclxuICAgICAgICBleGNoYW5nZVJhdGVJbnB1dFJlZj17Y29udGVudC5leGNoYW5nZVJhdGVJbnB1dFJlZn1cclxuICAgICAgICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZT17Y29udGVudC5leGNoYW5nZVJhdGVJbmZvTWVzc2FnZX1cclxuICAgICAgICBkcmFmdEFtb3VudE1TVD17Y29udGVudC5kcmFmdEFtb3VudE1TVH1cclxuICAgICAgICBhbW91bnRNU1RJbnZhbGlkPXtjb250ZW50LmFtb3VudE1TVEludmFsaWR9XHJcbiAgICAgICAgYW1vdW50TVNUSW5wdXRSZWY9e2NvbnRlbnQuYW1vdW50TVNUSW5wdXRSZWZ9XHJcbiAgICAgICAgbG9jYWxDdXJyZW5jeUNvZGU9e2NvbnRlbnQubG9jYWxDdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgZHJhZnRUcmFuc0RhdGU9e2NvbnRlbnQuZHJhZnRUcmFuc0RhdGV9XHJcbiAgICAgICAgZHJhZnRUaWNrZXRUaW1lPXtjb250ZW50LmRyYWZ0VGlja2V0VGltZX1cclxuICAgICAgICBkcmFmdFVybEZpbGU9e2NvbnRlbnQuZHJhZnRVcmxGaWxlfVxyXG4gICAgICAgIGRyYWZ0RmlsZU5hbWU9e2NvbnRlbnQuZHJhZnRGaWxlTmFtZX1cclxuICAgICAgICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U9e2NvbnRlbnQub25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlfVxyXG4gICAgICAgIG9uRHJhZnRHYXN0b1R5cGVDaGFuZ2U9e2NvbnRlbnQub25EcmFmdEdhc3RvVHlwZUNoYW5nZX1cclxuICAgICAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlPXtjb250ZW50Lm9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XHJcbiAgICAgICAgb25EcmFmdFRvdGFsQW1vdW50Q2hhbmdlPXtjb250ZW50Lm9uRHJhZnRUb3RhbEFtb3VudENoYW5nZX1cclxuICAgICAgICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlPXtjb250ZW50Lm9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2V9XHJcbiAgICAgICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNvbW1pdD17Y29udGVudC5vbkRyYWZ0RXhjaGFuZ2VSYXRlQ29tbWl0fVxyXG4gICAgICAgIG9uRHJhZnRBbW91bnRNU1RDaGFuZ2U9e2NvbnRlbnQub25EcmFmdEFtb3VudE1TVENoYW5nZX1cclxuICAgICAgICBvbk9wZW5GaWxlPXtjb250ZW50Lm9uT3BlbkZpbGV9XHJcbiAgICAgICAgb25PcGVuRXhwZW5zZVNoZWV0PXtjb250ZW50Lm9uT3BlbkV4cGVuc2VTaGVldH1cclxuICAgICAgICBoaWRlT3BlbkZpbGVBY3Rpb249e2NvbnRlbnQuc2hvd1N0aWNreVByZXZpZXd9XHJcbiAgICAgID5cclxuICAgICAgICB7Y29udGVudC5saW5rZWRMaW5lLnZpc2libGUgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZVNlY3Rpb25cclxuICAgICAgICAgICAgcHJvamVjdElkPXtjb250ZW50LmxpbmtlZExpbmUucHJvamVjdElkfVxyXG4gICAgICAgICAgICByZWltYnVyc2FibGVFeHBlbnNlPXtjb250ZW50LmxpbmtlZExpbmUucmVpbWJ1cnNhYmxlRXhwZW5zZX1cclxuICAgICAgICAgICAgaXNFZGl0aW5nPXtjb250ZW50LmlzRWRpdGluZ31cclxuICAgICAgICAgICAgaXNMb2FkaW5nPXtjb250ZW50LmxpbmtlZExpbmUuaXNMb2FkaW5nfVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17Y29udGVudC5saW5rZWRMaW5lLmRpc2FibGVkfVxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U9e2NvbnRlbnQubGlua2VkTGluZS5lcnJvck1lc3NhZ2V9XHJcbiAgICAgICAgICAgIG9uUHJvamVjdElkQ2hhbmdlPXtjb250ZW50LmxpbmtlZExpbmUub25Qcm9qZWN0SWRDaGFuZ2V9XHJcbiAgICAgICAgICAgIG9uUmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZT17Y29udGVudC5saW5rZWRMaW5lLm9uUmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgIDwvRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm0+XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0TGluZXNMaXN0XHJcbiAgICAgICAgdmlzaWJsZUxpbmVzPXtjb250ZW50LnZpc2libGVMaW5lc31cclxuICAgICAgICB0b3RhbExpbmVQYWdlcz17Y29udGVudC50b3RhbExpbmVQYWdlc31cclxuICAgICAgICBsaW5lUGFnZT17Y29udGVudC5saW5lUGFnZX1cclxuICAgICAgICBjdXJyZW5jeUNvZGU9e2NvbnRlbnQuY3VycmVuY3lDb2RlfVxyXG4gICAgICAgIHBhZ2luYXRpb25MYWJlbHM9e2NvbnRlbnQucGFnaW5hdGlvbkxhYmVsc31cclxuICAgICAgICBjb250YWluZXJSZWY9e2NvbnRlbnQuY29udGFpbmVyUmVmfVxyXG4gICAgICAgIG9uTGluZVBhZ2VDaGFuZ2U9e2NvbnRlbnQub25MaW5lUGFnZUNoYW5nZX1cclxuICAgICAgICBvbk9wZW5MaW5lPXtjb250ZW50Lm9uT3BlbkxpbmV9XHJcbiAgICAgIC8+XHJcbiAgICA8Lz5cclxuICApO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cclxuICAgICAgPENvbmZpcm1Nb2RhbFxyXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XHJcbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxyXG4gICAgICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XHJcbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsLmNvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsLmNhbmNlbFRleHR9XHJcbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsLmxvYWRpbmdUZXh0fVxyXG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XHJcbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxyXG4gICAgICAgIGJ1c3k9e21vZGFsLmJ1c3l9XHJcbiAgICAgICAgZXJyb3I9e21vZGFsLmVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17bW9kYWwuc3RhdHVzfVxyXG4gICAgICAgIG9uQ29uZmlybT17bW9kYWwub25Db25maXJtfVxyXG4gICAgICAgIG9uQ2FuY2VsPXttb2RhbC5vbkNhbmNlbH1cclxuICAgICAgLz5cclxuICAgICAgPEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWxcclxuICAgICAgICBvcGVuPXtwcmV2aWV3Lm9wZW59XHJcbiAgICAgICAgYnVzeT17cHJldmlldy5idXN5fVxyXG4gICAgICAgIGVycm9yPXtwcmV2aWV3LmVycm9yfVxyXG4gICAgICAgIGltYWdlVXJsPXtwcmV2aWV3LmltYWdlVXJsfVxyXG4gICAgICAgIGltYWdlQWx0PXtwcmV2aWV3LmltYWdlQWx0fVxyXG4gICAgICAgIHNjYWxlPXtwcmV2aWV3LnNjYWxlfVxyXG4gICAgICAgIHRyYW5zbGF0ZT17cHJldmlldy50cmFuc2xhdGV9XHJcbiAgICAgICAgc3VyZmFjZVJlZj17cHJldmlldy5zdXJmYWNlUmVmfVxyXG4gICAgICAgIG9uQ2xvc2U9e3ByZXZpZXcub25DbG9zZX1cclxuICAgICAgICBvblBvaW50ZXJEb3duPXtwcmV2aWV3Lm9uUG9pbnRlckRvd259XHJcbiAgICAgICAgb25Qb2ludGVyTW92ZT17cHJldmlldy5vblBvaW50ZXJNb3ZlfVxyXG4gICAgICAgIG9uUG9pbnRlckVuZD17cHJldmlldy5vblBvaW50ZXJFbmR9XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtemluYy03MDBcIlxyXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGNvbnRlbnQuaXNMb2FkaW5nID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBzaXplLTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxyXG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge2NvbnRlbnQuZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntjb250ZW50LmVycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxyXG5cclxuICAgICAgeyFjb250ZW50LmlzTG9hZGluZyAmJiAhY29udGVudC5lcnJvck1lc3NhZ2UgJiYgY29udGVudC5oZWFkZXIgPyAoXHJcbiAgICAgICAgY29udGVudC5zaG93U3RpY2t5UHJldmlldyA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBtaW4tdy0wIG1heC13LWZ1bGwgZ3JpZC1jb2xzLTEgZ2FwLXktMiBsZzpncmlkLWNvbHMtW21pbm1heCgwLDFmcilfMzIwcHhdIGxnOmdhcC00XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLXctMCBtYXgtdy1mdWxsIGxnOmNvbC1zdGFydC0yXCI+XHJcbiAgICAgICAgICAgICAgPEV4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3XHJcbiAgICAgICAgICAgICAgICBidXN5PXtjb250ZW50LnByZXZpZXdCdXN5fVxyXG4gICAgICAgICAgICAgICAgZXJyb3I9e2NvbnRlbnQucHJldmlld0Vycm9yfVxyXG4gICAgICAgICAgICAgICAgaW1hZ2VVcmw9e2NvbnRlbnQucHJldmlld0ltYWdlVXJsfVxyXG4gICAgICAgICAgICAgICAgaW1hZ2VBbHQ9e2NvbnRlbnQucHJldmlld0FsdFRleHR9XHJcbiAgICAgICAgICAgICAgICBmaWxlTmFtZT17Y29udGVudC5wcmV2aWV3RmlsZU5hbWV9XHJcbiAgICAgICAgICAgICAgICBvbk9wZW49e2NvbnRlbnQub25PcGVuUHJldmlld31cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4tdy0wIHNwYWNlLXktMiBsZzpjb2wtc3RhcnQtMSBsZzpyb3ctc3RhcnQtMVwiPntkZXRhaWxCb2R5fTwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIGRldGFpbEJvZHlcclxuICAgICAgICApXHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldERldGFpbER0bywgRXhwZW5zZVNoZWV0TGluZSB9IGZyb20gXCIuLi8uLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHtcclxuICBERUZBVUxUX0xJTkVfUkVJTUJVUlNBQkxFX0VYUEVOU0UsXHJcbiAgbm9ybWFsaXplRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlLFxyXG59IGZyb20gXCIuLi8uLi9jb25zdGFudHMvZXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2VDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsLCBtYXBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZUFyZ3MgPSB7XHJcbiAgZW5hYmxlZDogYm9vbGVhbjtcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgbGluZVJlY0lkOiBzdHJpbmc7XHJcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBzZWxlY3RTaGVldCA9IChpdGVtczogRXhwZW5zZVNoZWV0RGV0YWlsRHRvW10sIHNoZWV0SWQ6IHN0cmluZyk6IEV4cGVuc2VTaGVldERldGFpbER0byB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQoc2hlZXRJZCkudG9VcHBlckNhc2UoKTtcclxuICBpZiAoIUFycmF5LmlzQXJyYXkoaXRlbXMpIHx8IGl0ZW1zLmxlbmd0aCA8IDEpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIGl0ZW1zLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uSG9qYUdhc3Rvc0lkID8/IGVudHJ5Py5ob2phR2FzdG9zSWQpLnRvVXBwZXJDYXNlKCkgPT09IHNhZmVTaGVldElkKSB8fFxyXG4gICAgaXRlbXNbMF0gfHxcclxuICAgIG51bGxcclxuICApO1xyXG59O1xyXG5cclxuY29uc3Qgc2VsZWN0TGluZSA9IChzaGVldDogRXhwZW5zZVNoZWV0RGV0YWlsRHRvLCBsaW5lUmVjSWQ6IHN0cmluZyk6IEV4cGVuc2VTaGVldExpbmUgfCBudWxsID0+IHtcclxuICBjb25zdCBzYWZlTGluZVJlY0lkID0gc2FmZVRleHQobGluZVJlY0lkKS50b1VwcGVyQ2FzZSgpO1xyXG4gIGNvbnN0IHNvdXJjZUxpbmVzID0gc2hlZXQuTGluZXMgPz8gc2hlZXQubGluZXMgPz8gW107XHJcbiAgY29uc3QgbWFwcGVkTGluZXMgPSBBcnJheS5pc0FycmF5KHNvdXJjZUxpbmVzKSA/IHNvdXJjZUxpbmVzLm1hcCgoZW50cnkpID0+IG1hcEV4cGVuc2VTaGVldExpbmUoZW50cnkpKSA6IFtdO1xyXG5cclxuICByZXR1cm4gbWFwcGVkTGluZXMuZmluZCgobGluZSkgPT4gc2FmZVRleHQobGluZS5saW5lUmVjSWQpLnRvVXBwZXJDYXNlKCkgPT09IHNhZmVMaW5lUmVjSWQpIHx8IG51bGw7XHJcbn07XHJcblxyXG4vLyBMb2FkcyB0aGUgZXhwZW5zZS1zaGVldCBsaW5lIHRoYXQgZ2l2ZXMgY29udGV4dHVhbCBmaWVsZHMgdG8gYSBsaW5rZWQgdGlja2V0IGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmUgPSAoe1xyXG4gIGVuYWJsZWQsXHJcbiAgc2hlZXRJZCxcclxuICBsaW5lUmVjSWQsXHJcbiAgb25Gb3JiaWRkZW4sXHJcbn06IFVzZUV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVBcmdzKSA9PiB7XHJcbiAgY29uc3QgW2xpbmUsIHNldExpbmVdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0TGluZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtvcmlnaW5hbFByb2plY3RJZCwgc2V0T3JpZ2luYWxQcm9qZWN0SWRdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0UHJvamVjdElkLCBzZXREcmFmdFByb2plY3RJZF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbb3JpZ2luYWxSZWltYnVyc2FibGVFeHBlbnNlLCBzZXRPcmlnaW5hbFJlaW1idXJzYWJsZUV4cGVuc2VdID0gdXNlU3RhdGUoREVGQVVMVF9MSU5FX1JFSU1CVVJTQUJMRV9FWFBFTlNFKTtcclxuICBjb25zdCBbZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLCBzZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2VdID0gdXNlU3RhdGUoREVGQVVMVF9MSU5FX1JFSU1CVVJTQUJMRV9FWFBFTlNFKTtcclxuICBjb25zdCBbbG9jYWxDdXJyZW5jeUNvZGUsIHNldExvY2FsQ3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCByZWxvYWRMaW5lID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChzaGVldElkKTtcclxuICAgIGNvbnN0IHNhZmVMaW5lUmVjSWQgPSBzYWZlVGV4dChsaW5lUmVjSWQpO1xyXG4gICAgaWYgKCFlbmFibGVkIHx8ICFzYWZlU2hlZXRJZCkge1xyXG4gICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICBzZXRPcmlnaW5hbFByb2plY3RJZChcIlwiKTtcclxuICAgICAgc2V0RHJhZnRQcm9qZWN0SWQoXCJcIik7XHJcbiAgICAgIHNldE9yaWdpbmFsUmVpbWJ1cnNhYmxlRXhwZW5zZShERUZBVUxUX0xJTkVfUkVJTUJVUlNBQkxFX0VYUEVOU0UpO1xyXG4gICAgICBzZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UoREVGQVVMVF9MSU5FX1JFSU1CVVJTQUJMRV9FWFBFTlNFKTtcclxuICAgICAgc2V0TG9jYWxDdXJyZW5jeUNvZGUoXCJcIik7XHJcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldElzTG9hZGluZyh0cnVlKTtcclxuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKHNhZmVTaGVldElkLCB7XHJcbiAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgICAgc2V0T3JpZ2luYWxQcm9qZWN0SWQoXCJcIik7XHJcbiAgICAgICAgc2V0RHJhZnRQcm9qZWN0SWQoXCJcIik7XHJcbiAgICAgICAgc2V0T3JpZ2luYWxSZWltYnVyc2FibGVFeHBlbnNlKERFRkFVTFRfTElORV9SRUlNQlVSU0FCTEVfRVhQRU5TRSk7XHJcbiAgICAgICAgc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlKERFRkFVTFRfTElORV9SRUlNQlVSU0FCTEVfRVhQRU5TRSk7XHJcbiAgICAgICAgc2V0TG9jYWxDdXJyZW5jeUNvZGUoXCJcIik7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlPy5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlwiKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBzaGVldCA9IHNlbGVjdFNoZWV0KHJlc3BvbnNlPy5JdGVtcyB8fCBbXSwgc2FmZVNoZWV0SWQpO1xyXG4gICAgICBjb25zdCBzaGVldExvY2FsQ3VycmVuY3lDb2RlID0gc2FmZVRleHQoc2hlZXQ/LkN1cnJlbmN5Q29kZSA/PyBzaGVldD8uY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICBjb25zdCBzZWxlY3RlZExpbmUgPSBzaGVldCAmJiBzYWZlTGluZVJlY0lkID8gc2VsZWN0TGluZShzaGVldCwgc2FmZUxpbmVSZWNJZCkgOiBudWxsO1xyXG4gICAgICBpZiAoIXNhZmVMaW5lUmVjSWQpIHtcclxuICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgIHNldE9yaWdpbmFsUHJvamVjdElkKFwiXCIpO1xyXG4gICAgICAgIHNldERyYWZ0UHJvamVjdElkKFwiXCIpO1xyXG4gICAgICAgIHNldE9yaWdpbmFsUmVpbWJ1cnNhYmxlRXhwZW5zZShERUZBVUxUX0xJTkVfUkVJTUJVUlNBQkxFX0VYUEVOU0UpO1xyXG4gICAgICAgIHNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZShERUZBVUxUX0xJTkVfUkVJTUJVUlNBQkxFX0VYUEVOU0UpO1xyXG4gICAgICAgIHNldExvY2FsQ3VycmVuY3lDb2RlKHNoZWV0TG9jYWxDdXJyZW5jeUNvZGUpO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghc2VsZWN0ZWRMaW5lKSB7XHJcbiAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICBzZXRPcmlnaW5hbFByb2plY3RJZChcIlwiKTtcclxuICAgICAgICBzZXREcmFmdFByb2plY3RJZChcIlwiKTtcclxuICAgICAgICBzZXRPcmlnaW5hbFJlaW1idXJzYWJsZUV4cGVuc2UoREVGQVVMVF9MSU5FX1JFSU1CVVJTQUJMRV9FWFBFTlNFKTtcclxuICAgICAgICBzZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UoREVGQVVMVF9MSU5FX1JFSU1CVVJTQUJMRV9FWFBFTlNFKTtcclxuICAgICAgICBzZXRMb2NhbEN1cnJlbmN5Q29kZShzaGVldExvY2FsQ3VycmVuY3lDb2RlKTtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHByb2plY3RJZCA9IHNhZmVUZXh0KHNlbGVjdGVkTGluZS5wcm9qSWQpO1xyXG4gICAgICBjb25zdCByZWltYnVyc2FibGVFeHBlbnNlID0gbm9ybWFsaXplRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlKHNlbGVjdGVkTGluZS5yZWltYnVyc2FibGVFeHBlbnNlKTtcclxuICAgICAgc2V0TGluZShzZWxlY3RlZExpbmUpO1xyXG4gICAgICBzZXRPcmlnaW5hbFByb2plY3RJZChwcm9qZWN0SWQpO1xyXG4gICAgICBzZXREcmFmdFByb2plY3RJZChwcm9qZWN0SWQpO1xyXG4gICAgICBzZXRPcmlnaW5hbFJlaW1idXJzYWJsZUV4cGVuc2UocmVpbWJ1cnNhYmxlRXhwZW5zZSk7XHJcbiAgICAgIHNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZShyZWltYnVyc2FibGVFeHBlbnNlKTtcclxuICAgICAgc2V0TG9jYWxDdXJyZW5jeUNvZGUoc2hlZXRMb2NhbEN1cnJlbmN5Q29kZSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgIHNldE9yaWdpbmFsUHJvamVjdElkKFwiXCIpO1xyXG4gICAgICBzZXREcmFmdFByb2plY3RJZChcIlwiKTtcclxuICAgICAgc2V0T3JpZ2luYWxSZWltYnVyc2FibGVFeHBlbnNlKERFRkFVTFRfTElORV9SRUlNQlVSU0FCTEVfRVhQRU5TRSk7XHJcbiAgICAgIHNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZShERUZBVUxUX0xJTkVfUkVJTUJVUlNBQkxFX0VYUEVOU0UpO1xyXG4gICAgICBzZXRMb2NhbEN1cnJlbmN5Q29kZShcIlwiKTtcclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW2VuYWJsZWQsIGxpbmVSZWNJZCwgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHZvaWQgcmVsb2FkTGluZSgpO1xyXG4gIH0sIFtyZWxvYWRMaW5lXSk7XHJcblxyXG4gIGNvbnN0IHByb2plY3RJZENoYW5nZWQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gc2FmZVRleHQoZHJhZnRQcm9qZWN0SWQpICE9PSBzYWZlVGV4dChvcmlnaW5hbFByb2plY3RJZCksXHJcbiAgICBbZHJhZnRQcm9qZWN0SWQsIG9yaWdpbmFsUHJvamVjdElkXVxyXG4gICk7XHJcbiAgY29uc3QgcmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZWQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlICE9PSBvcmlnaW5hbFJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbiAgICBbZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLCBvcmlnaW5hbFJlaW1idXJzYWJsZUV4cGVuc2VdXHJcbiAgKTtcclxuICBjb25zdCByZXNldERyYWZ0UHJvamVjdElkID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQob3JpZ2luYWxQcm9qZWN0SWQpO1xyXG4gIH0sIFtvcmlnaW5hbFByb2plY3RJZF0pO1xyXG4gIGNvbnN0IHJlc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlKG9yaWdpbmFsUmVpbWJ1cnNhYmxlRXhwZW5zZSk7XHJcbiAgfSwgW29yaWdpbmFsUmVpbWJ1cnNhYmxlRXhwZW5zZV0pO1xyXG4gIGNvbnN0IGFjY2VwdERyYWZ0UHJvamVjdElkID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qgc2FmZVByb2plY3RJZCA9IHNhZmVUZXh0KGRyYWZ0UHJvamVjdElkKTtcclxuICAgIHNldE9yaWdpbmFsUHJvamVjdElkKHNhZmVQcm9qZWN0SWQpO1xyXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQoc2FmZVByb2plY3RJZCk7XHJcbiAgfSwgW2RyYWZ0UHJvamVjdElkXSk7XHJcbiAgY29uc3QgYWNjZXB0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qgc2FmZVJlaW1idXJzYWJsZUV4cGVuc2UgPSBub3JtYWxpemVFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2UoZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlKTtcclxuICAgIHNldE9yaWdpbmFsUmVpbWJ1cnNhYmxlRXhwZW5zZShzYWZlUmVpbWJ1cnNhYmxlRXhwZW5zZSk7XHJcbiAgICBzZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2Uoc2FmZVJlaW1idXJzYWJsZUV4cGVuc2UpO1xyXG4gIH0sIFtkcmFmdFJlaW1idXJzYWJsZUV4cGVuc2VdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGxpbmUsXHJcbiAgICBsb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIG9yaWdpbmFsUHJvamVjdElkLFxyXG4gICAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgICBwcm9qZWN0SWRDaGFuZ2VkLFxyXG4gICAgb3JpZ2luYWxSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgcmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZWQsXHJcbiAgICBzZXREcmFmdFByb2plY3RJZCxcclxuICAgIHNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgIHJlc2V0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICByZXNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgIGFjY2VwdERyYWZ0UHJvamVjdElkLFxyXG4gICAgYWNjZXB0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgcmVsb2FkTGluZSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUgfSBmcm9tIFwiLi4vdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZS50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsLFxyXG4gIGJ1aWxkRXhwZW5zZVNoZWV0TGluZURldGFpbFVybCxcclxuICBidWlsZEV4cGVuc2VUaWNrZXRMaW5rVXJsLFxyXG4gIHR5cGUgRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHRvRXhwZW5zZUlzb0RhdGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb25BcmdzID0ge1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGRldGFpbE9yaWdpbjogc3RyaW5nO1xyXG4gIGhlYWRlclRyYW5zRGF0ZTogdW5rbm93bjtcclxuICBjb250ZXh0TGluZVJlY0lkPzogc3RyaW5nO1xyXG4gIHRpY2tldFJldHVybkNvbnRleHQ/OiBFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCB8IG51bGw7XHJcbiAgcmVhZENhY2hlZFN0YXRlOiAoKSA9PiBFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlIHwgbnVsbDtcclxuICBzYXZlQ2FjaGVkU3RhdGU6IChzdGF0ZTogRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIEtlZXBzIG5hdGl2ZSBiYWNrIG5hdmlnYXRpb24gYWxpZ25lZCB3aXRoIHRoZSB0aWNrZXQgZW50cnkgcG9pbnQgYW5kIHByZXNlcnZlcyBjYWNoZWQgbGluay1tb2RlIHN0YXRlLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uID0gKHtcclxuICBmaWxlSWQsXHJcbiAgZGV0YWlsT3JpZ2luLFxyXG4gIGhlYWRlclRyYW5zRGF0ZSxcclxuICBjb250ZXh0TGluZVJlY0lkLFxyXG4gIHRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgcmVhZENhY2hlZFN0YXRlLFxyXG4gIHNhdmVDYWNoZWRTdGF0ZSxcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uQXJncykgPT4ge1xyXG4gIGNvbnN0IHNob3VsZFJldHVyblRvVGlja2V0TGlzdCA9IHRpY2tldFJldHVybkNvbnRleHQ/Lm9yaWdpbiA9PT0gXCJzaGVldC1saW5rXCIgfHwgIXRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQ7XHJcblxyXG4gIGNvbnN0IG5hdGl2ZUJhY2tVcmwgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGlmICh0aWNrZXRSZXR1cm5Db250ZXh0Py5vcmlnaW4gPT09IFwic2hlZXQtbGlua1wiICYmIHRpY2tldFJldHVybkNvbnRleHQuc2hlZXRJZCkge1xyXG4gICAgICByZXR1cm4gYnVpbGRFeHBlbnNlVGlja2V0TGlua1VybCh0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aWNrZXRSZXR1cm5Db250ZXh0Py5vcmlnaW4gPT09IFwiZXhwZW5zZS1saW5lXCIgJiYgdGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkKSB7XHJcbiAgICAgIHJldHVybiBidWlsZEV4cGVuc2VTaGVldExpbmVEZXRhaWxVcmwodGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkLCB0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0TGluZVJlY0lkIHx8IGNvbnRleHRMaW5lUmVjSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkKSB7XHJcbiAgICAgIHJldHVybiBidWlsZEV4cGVuc2VTaGVldERldGFpbFVybCh0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkZXRhaWxPcmlnaW4gPT09IFwidGlja2V0LWNyZWF0ZVwiKSB7XHJcbiAgICAgIGNvbnN0IHRpY2tldERhdGUgPSB0b0V4cGVuc2VJc29EYXRlKGhlYWRlclRyYW5zRGF0ZSkgfHwgdG9FeHBlbnNlSXNvRGF0ZShuZXcgRGF0ZSgpKTtcclxuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICB0aWNrZXRGaWxlSWQ6IGZpbGVJZCxcclxuICAgICAgICB0aWNrZXREYXRlLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBgL0dhc3Rvcy9UaWNrZXRzPyR7cXVlcnkudG9TdHJpbmcoKX1gO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBcIi9HYXN0b3MvVGlja2V0c1wiO1xyXG4gIH0sIFtjb250ZXh0TGluZVJlY0lkLCBkZXRhaWxPcmlnaW4sIGZpbGVJZCwgaGVhZGVyVHJhbnNEYXRlLCB0aWNrZXRSZXR1cm5Db250ZXh0XSk7XHJcblxyXG4gIGNvbnN0IHJlYXJtRXhwZW5zZVRpY2tldHNSZXR1cm5TdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGNhY2hlZFN0YXRlID0gcmVhZENhY2hlZFN0YXRlKCk7XHJcbiAgICBpZiAoIWNhY2hlZFN0YXRlKSByZXR1cm47XHJcbiAgICBzYXZlQ2FjaGVkU3RhdGUoY2FjaGVkU3RhdGUpO1xyXG4gIH0sIFtyZWFkQ2FjaGVkU3RhdGUsIHNhdmVDYWNoZWRTdGF0ZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFmaWxlSWQpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBiYWNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxCYWNrQnRuXCIpO1xyXG4gICAgaWYgKCFiYWNrQnV0dG9uKSByZXR1cm47XHJcblxyXG4gICAgYmFja0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWJhY2stdXJsXCIsIG5hdGl2ZUJhY2tVcmwpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgYmFja0J1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLWJhY2stdXJsXCIpO1xyXG4gICAgfTtcclxuICB9LCBbZmlsZUlkLCBuYXRpdmVCYWNrVXJsXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZU5hdGl2ZUJhY2sgPSAoZXZlbnQ6IFBvcFN0YXRlRXZlbnQpID0+IHtcclxuICAgICAgaWYgKGV2ZW50Py5zdGF0ZSAmJiBldmVudC5zdGF0ZS5pbmRUcmFwID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBleGVjdXRlQmFja05hdmlnYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHNob3VsZFJldHVyblRvVGlja2V0TGlzdCkge1xyXG4gICAgICAgICAgcmVhcm1FeHBlbnNlVGlja2V0c1JldHVyblN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKG5hdGl2ZUJhY2tVcmwpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24oZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGV4ZWN1dGVCYWNrTmF2aWdhdGlvbigpO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGhhbmRsZU5hdGl2ZUJhY2spO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBoYW5kbGVOYXRpdmVCYWNrKTtcclxuICAgIH07XHJcbiAgfSwgW2ZpbGVJZCwgbmF0aXZlQmFja1VybCwgcmVhcm1FeHBlbnNlVGlja2V0c1JldHVyblN0YXRlLCBzaG91bGRSZXR1cm5Ub1RpY2tldExpc3RdKTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcudHNcIjtcclxuaW1wb3J0IHsgaGFzRXhwZW5zZVRpY2tldEltYWdlUHJldmlld1NvdXJjZSB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRQcmV2aWV3VXRpbHMudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdQYW5lbEFyZ3MgPSB7XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGRyYWZ0VXJsRmlsZTogc3RyaW5nO1xyXG4gIGhlYWRlclVybEZpbGU/OiBzdHJpbmcgfCBudWxsO1xyXG59O1xyXG5cclxuLy8gQ2VudHJhbGl6ZXMgc3RpY2t5LXByZXZpZXcgYXZhaWxhYmlsaXR5IGFuZCBpbWFnZSBsb2FkaW5nIGZvciB0aWNrZXQgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdQYW5lbCA9ICh7XHJcbiAgZmlsZUlkLFxyXG4gIGlzRWRpdGluZyxcclxuICBkcmFmdFVybEZpbGUsXHJcbiAgaGVhZGVyVXJsRmlsZSxcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdQYW5lbEFyZ3MpID0+IHtcclxuICBjb25zdCBwcmV2aWV3U291cmNlVXJsID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChpc0VkaXRpbmcgPyBkcmFmdFVybEZpbGUgOiBoZWFkZXJVcmxGaWxlKSwgW2RyYWZ0VXJsRmlsZSwgaGVhZGVyVXJsRmlsZSwgaXNFZGl0aW5nXSk7XHJcbiAgY29uc3Qgc2hvd1N0aWNreVByZXZpZXcgPSB1c2VNZW1vKCgpID0+IGhhc0V4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdTb3VyY2UocHJldmlld1NvdXJjZVVybCksIFtwcmV2aWV3U291cmNlVXJsXSk7XHJcbiAgY29uc3QgcHJldmlldyA9IHVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcoe1xyXG4gICAgZmlsZUlkLFxyXG4gICAgc291cmNlVXJsOiBwcmV2aWV3U291cmNlVXJsLFxyXG4gICAgZW5hYmxlZDogc2hvd1N0aWNreVByZXZpZXcsXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzaG93U3RpY2t5UHJldmlldyxcclxuICAgIC4uLnByZXZpZXcsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcblxudHlwZSBVc2VFeHBlbnNlVGlja2V0VG9wYmFyQmFja0xvY2tBcmdzID0ge1xuICBsb2NrZWQ6IGJvb2xlYW47XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG59O1xuXG4vLyBMb2NrcyB0aGUgc2hhcmVkIHRvcGJhciBiYWNrIGJ1dHRvbiB3aGlsZSBhIGxpbmtlZCB0aWNrZXQgbXVzdCBzdGF5IGluIHRoZSByZWNvdmVyeSBmbG93LlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRUb3BiYXJCYWNrTG9jayA9ICh7XG4gIGxvY2tlZCxcbiAgbWVzc2FnZSxcbn06IFVzZUV4cGVuc2VUaWNrZXRUb3BiYXJCYWNrTG9ja0FyZ3MpOiB2b2lkID0+IHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBiYWNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxCYWNrQnRuXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbiAgICBpZiAoIWJhY2tCdXR0b24pIHJldHVybjtcblxuICAgIGNvbnN0IHByZXZpb3VzRGlzYWJsZWQgPSBiYWNrQnV0dG9uLmRpc2FibGVkO1xuICAgIGNvbnN0IHByZXZpb3VzQXJpYURpc2FibGVkID0gYmFja0J1dHRvbi5nZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIpO1xuICAgIGNvbnN0IHByZXZpb3VzVGl0bGUgPSBiYWNrQnV0dG9uLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICAgIGNvbnN0IGxvY2tNZXNzYWdlID0gc2FmZVRleHQobWVzc2FnZSk7XG5cbiAgICBpZiAobG9ja2VkKSB7XG4gICAgICBiYWNrQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIGJhY2tCdXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgICBpZiAobG9ja01lc3NhZ2UpIHtcbiAgICAgICAgYmFja0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBsb2NrTWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghcHJldmlvdXNEaXNhYmxlZCkge1xuICAgICAgYmFja0J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgYmFja0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIFwiZmFsc2VcIik7XG4gICAgICBpZiAocHJldmlvdXNUaXRsZSA9PT0gbnVsbCkge1xuICAgICAgICBiYWNrQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBiYWNrQnV0dG9uLmRpc2FibGVkID0gcHJldmlvdXNEaXNhYmxlZDtcbiAgICAgIGlmIChwcmV2aW91c0FyaWFEaXNhYmxlZCA9PT0gbnVsbCkge1xuICAgICAgICBiYWNrQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiYWNrQnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgcHJldmlvdXNBcmlhRGlzYWJsZWQpO1xuICAgICAgfVxuICAgICAgaWYgKHByZXZpb3VzVGl0bGUgPT09IG51bGwpIHtcbiAgICAgICAgYmFja0J1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJhY2tCdXR0b24uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgcHJldmlvdXNUaXRsZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW2xvY2tlZCwgbWVzc2FnZV0pO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFB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QUFjO0FBQ2hCO0FBYUEsSUFBTSxzQ0FBc0MsQ0FBQztBQUFBLEVBQzNDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsT0FnRU87QUFBQSxFQUNMO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxpQkFBaUI7QUFBQSxFQUNqQjtBQUFBLEVBQ0EsZUFBZTtBQUFBLEVBQ2Y7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLDBCQUEwQjtBQUFBLEVBQzFCLHdCQUF3QjtBQUFBLEVBQ3hCLDJCQUEyQjtBQUFBLEVBQzNCLDBCQUEwQjtBQUFBLEVBQzFCLHdCQUF3QjtBQUFBLEVBQ3hCLDJCQUEyQjtBQUFBLEVBQzNCLDJCQUEyQjtBQUFBLEVBQzNCLFlBQVk7QUFBQSxFQUNaLG9CQUFvQixrQkFBa0IsU0FBWTtBQUFBLEVBQ2xEO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxjQUFjO0FBQUEsRUFDZDtBQUFBLEVBQ0EsY0FBYztBQUFBLEVBQ2Qsa0JBQWtCO0FBQUEsRUFDbEIsWUFBWTtBQUNkO0FBTUEsSUFBTSx3Q0FBd0MsQ0FBQztBQUFBLEVBQzdDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixPQUlPO0FBQUEsRUFDTCxPQUFPLGtDQUFrQyxTQUFTO0FBQUEsRUFDbEQsU0FBUyxvQ0FBb0MsV0FBVztBQUFBLEVBQ3hELFNBQVMsb0NBQW9DLFdBQVc7QUFDMUQ7QUFHQSxJQUFNLHdDQUF3QyxDQUFDO0FBQUEsRUFDN0M7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFNTTtBQUNKLFFBQU0sRUFBRSxpQkFBaUIsaUJBQWlCLHdCQUF3QixpQkFBaUIsSUFBSSw2QkFBNkI7QUFFcEgsdUNBQXFDO0FBQUEsSUFDbkM7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7QUFHQSxJQUFNLGlDQUFpQyxDQUFDO0FBQUEsRUFDdEM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BT007QUFDSixRQUFNLDJCQUF1Qix1QkFBTyxLQUFLO0FBRXpDLGdDQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLHFCQUFxQixRQUFTO0FBQzVFLFFBQUksYUFBYSxDQUFDLFVBQVUsQ0FBQyxtQkFBb0I7QUFFakQseUJBQXFCLFVBQVU7QUFDL0IscUJBQWlCO0FBQUEsRUFDbkIsR0FBRyxDQUFDLGNBQWMsb0JBQW9CLHNCQUFzQixrQkFBa0IsUUFBUSxTQUFTLENBQUM7QUFDbEc7QUFHQSxJQUFNLHdDQUF3QyxNQUFNO0FBQ2xELFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLElBQUksZUFBZTtBQUNuQixRQUFNLFlBQVksVUFBVSxrQkFBa0IsTUFBTTtBQUNwRCxRQUFNLHdCQUF3QixVQUFVLGtCQUFrQixNQUFNO0FBQ2hFLFFBQU0sMEJBQTBCLFVBQVUsa0JBQWtCLFlBQVk7QUFDeEUsUUFBTSxzQkFBc0IsMkJBQTJCO0FBQUEsSUFDckQ7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQSxlQUFlLHlCQUF5QixDQUFDO0FBQUEsSUFDekMsaUJBQWlCLDJCQUEyQixDQUFDO0FBQUEsSUFDN0M7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7QUFHQSxJQUFNLHNDQUFzQyxNQUFNO0FBQ2hELFFBQU0sU0FBUyxTQUFTLE9BQU8sMEJBQTBCO0FBQ3pELFFBQU0sdUJBQW1CLHVCQUE4QixJQUFJO0FBQzNELFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLElBQUksbUNBQW1DO0FBQ3ZDLFFBQU0sOEJBQThCO0FBQ3BDLFFBQU0sZUFBMEMsc0JBQXNCLGdCQUFnQjtBQUN0RixRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixJQUFJLHNDQUFzQztBQUMxQyxRQUFNLHVCQUFtQix3QkFBK0IsTUFBTSwyQkFBMkIsR0FBRyxDQUFDLENBQUM7QUFDOUYsUUFBTSx3QkFBb0Isd0JBQVEsTUFBTTtBQUN0QyxVQUFNLE1BQU0sb0JBQUksSUFBb0I7QUFDcEMsZUFBVyxVQUFVLGtCQUFrQjtBQUNyQyxVQUFJLElBQUksT0FBTyxPQUFPLEtBQUssR0FBRyxPQUFPLElBQUk7QUFBQSxJQUMzQztBQUNBLFdBQU87QUFBQSxFQUNULEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztBQUNyQixRQUFNLEVBQUUsUUFBUSxPQUFPLFdBQVcsY0FBYyxhQUFhLElBQUksNEJBQTRCO0FBQUEsSUFDM0Y7QUFBQSxJQUNBO0FBQUEsSUFDQSxhQUFhO0FBQUEsRUFDZixDQUFDO0FBQ0QsUUFBTSwyQkFBdUI7QUFBQSxJQUMzQixNQUFNLFNBQVMscUJBQXFCLFdBQVcsa0JBQWtCLFFBQVEsbUJBQW1CO0FBQUEsSUFDNUYsQ0FBQyxnQkFBZ0IsUUFBUSxxQkFBcUIsbUJBQW1CO0FBQUEsRUFDbkU7QUFDQSxRQUFNLGtCQUFrQixnQ0FBZ0M7QUFBQSxJQUN0RCxTQUFTLENBQUMsQ0FBQztBQUFBLElBQ1gsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsYUFBYTtBQUFBLEVBQ2YsQ0FBQztBQUNELFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLElBQUksOEJBQThCO0FBQUEsSUFDaEMsWUFBWSxDQUFDLENBQUM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLG9CQUFvQjtBQUFBLElBQ3BCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsdUJBQXVCO0FBQUEsRUFDekIsQ0FBQztBQUNELFFBQU0sQ0FBQyxrQkFBa0IsbUJBQW1CLFFBQUkseUJBQVMsTUFBTSxDQUFDLENBQUMsZ0NBQWdDLE1BQU0sQ0FBQztBQUN4RyxRQUFNLENBQUMseUJBQXlCLDBCQUEwQixRQUFJO0FBQUEsSUFBUyxNQUNyRSxTQUFTLGdDQUFnQyxNQUFNLEdBQUcsT0FBTztBQUFBLEVBQzNEO0FBQ0EsUUFBTSwrQkFBMkIsdUJBQU8sQ0FBQztBQUN6QyxRQUFNLENBQUMseUJBQXlCLDBCQUEwQixRQUFJLHlCQUFTLEVBQUU7QUFDekUsUUFBTSxDQUFDLDRCQUE0Qiw2QkFBNkIsUUFBSSx5QkFBUyxFQUFFO0FBRS9FLGdDQUFVLE1BQU07QUFDZCxRQUFJLGNBQWM7QUFDbEIsVUFBTSxhQUFhLElBQUksZ0JBQWdCO0FBRXZDLFVBQU0sMEJBQTBCLFlBQVk7QUFDMUMsWUFBTSxzQkFBc0I7QUFBQSxRQUMxQixNQUFNLG1DQUFtQztBQUFBLFVBQ3ZDLHlCQUF5QjtBQUFBLFVBQ3pCLFFBQVEsV0FBVztBQUFBLFFBQ3JCLENBQUM7QUFBQSxNQUNIO0FBRUEsVUFBSSxDQUFDLGFBQWE7QUFDaEIsc0NBQThCLG1CQUFtQjtBQUFBLE1BQ25EO0FBQUEsSUFDRjtBQUVBLFNBQUssd0JBQXdCO0FBRTdCLFdBQU8sTUFBTTtBQUNYLG9CQUFjO0FBQ2QsaUJBQVcsTUFBTTtBQUFBLElBQ25CO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLGdDQUFVLE1BQU07QUFDZCxVQUFNLFlBQVksZ0NBQWdDLE1BQU07QUFDeEQsd0JBQW9CLENBQUMsQ0FBQyxTQUFTO0FBQy9CLCtCQUEyQixTQUFTLFdBQVcsT0FBTyxDQUFDO0FBQUEsRUFDekQsR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUVYLFFBQU0sbUJBQ0osaUJBQWlCLGtCQUFrQixDQUFDLENBQUMsU0FBUyxxQkFBcUIsV0FBVyxjQUFjLEtBQUssQ0FBQyxTQUFTLFFBQVEsbUJBQW1CO0FBQ3hJLFFBQU0sNEJBQTRCLG1CQUM5QixLQUFLLGdEQUFnRCwyQ0FBMkMsSUFDaEcsMkJBQ0E7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFFSixRQUFNLEVBQUUsd0JBQXdCLGlCQUFpQixJQUFJLHNDQUFzQztBQUFBLElBQ3pGO0FBQUEsSUFDQTtBQUFBLElBQ0EsaUJBQWlCLFFBQVE7QUFBQSxJQUN6QjtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFDRCxRQUFNLHNCQUFzQixDQUFDLHdCQUF5QixDQUFDLHNCQUFzQixDQUFDO0FBQzlFLFFBQU0seUJBQXlCLDRCQUE2QixDQUFDLENBQUMsd0JBQXdCO0FBQ3RGLFFBQU0sOEJBQTBCO0FBQUEsSUFDOUIsTUFBTSxpQ0FBaUMsZ0JBQWdCLHFCQUFxQiwwQkFBMEI7QUFBQSxJQUN0RyxDQUFDLDRCQUE0QixnQkFBZ0IsaUJBQWlCO0FBQUEsRUFDaEU7QUFDQSxRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLElBQUksNkJBQTZCO0FBQUEsSUFDL0I7QUFBQSxJQUNBLG1CQUFtQixnQkFBZ0I7QUFBQSxJQUNuQyxtQkFBbUI7QUFBQSxJQUNuQixXQUFXLE1BQU07QUFBQSxJQUNqQixVQUFVO0FBQUEsSUFDVixlQUFlLGlCQUFpQjtBQUFBLElBQ2hDO0FBQUEsSUFDQTtBQUFBLElBQ0EscUJBQXFCLG1CQUFtQixDQUFDO0FBQUEsSUFDekMsYUFBYTtBQUFBLEVBQ2YsQ0FBQztBQUNELFFBQU0scUNBQWlDO0FBQUEsSUFDckMsQ0FBQyxVQUFrQjtBQUNqQixZQUFNLG1CQUFtQixpQ0FBaUMsS0FBSztBQUMvRCwyQkFBcUIsZ0JBQWdCO0FBQ3JDLGlDQUEyQixFQUFFO0FBRTdCLFVBQUksQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUI7QUFDM0M7QUFBQSxNQUNGO0FBRUEsVUFBSSxxQkFBcUIsaUNBQWlDLGlCQUFpQixHQUFHO0FBQzVFLGlDQUF5QixXQUFXO0FBQ3BDO0FBQUEsTUFDRjtBQUVBLFlBQU0sWUFBWSx5QkFBeUIsVUFBVTtBQUNyRCwrQkFBeUIsVUFBVTtBQUVuQyxZQUFNLFlBQVk7QUFDaEIsWUFBSTtBQUNGLGdCQUFNLHVCQUF1QixNQUFNLGlDQUFpQztBQUFBLFlBQ2xFO0FBQUEsWUFDQSxxQkFBcUI7QUFBQSxZQUNyQixNQUFNLGtCQUFrQixRQUFRLGNBQWMsUUFBUTtBQUFBLFVBQ3hELENBQUM7QUFDRCxjQUFJLGNBQWMseUJBQXlCLFdBQVcsQ0FBQyxzQkFBc0I7QUFDM0U7QUFBQSxVQUNGO0FBRUEsa0NBQXdCLG9DQUFvQyxxQkFBcUIsWUFBWSxHQUFHLGdCQUFnQjtBQUNoSDtBQUFBLFlBQ0Usb0NBQW9DO0FBQUEsY0FDbEMsU0FBUyxxQkFBcUI7QUFBQSxjQUM5QixNQUFNLHFCQUFxQjtBQUFBLGNBQzNCLFFBQVEscUJBQXFCO0FBQUEsWUFDL0IsQ0FBQztBQUFBLFVBQ0g7QUFBQSxRQUNGLFNBQVMsT0FBTztBQUNkLGNBQUksY0FBYyx5QkFBeUIsU0FBUztBQUNsRDtBQUFBLFVBQ0Y7QUFFQSxnQkFBTSxVQUNKLGlCQUFpQixTQUFTLFNBQVMsTUFBTSxPQUFPLElBQzVDLFNBQVMsTUFBTSxPQUFPLElBQ3RCLEtBQUssMENBQTBDLHVDQUF1QztBQUM1RixxQ0FBMkIsT0FBTztBQUFBLFFBQ3BDO0FBQUEsTUFDRixHQUFHO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLE1BQ0EsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDQSxRQUFNLHFDQUFpQztBQUFBLElBQ3JDLENBQUMsVUFBa0I7QUFDakIsaUNBQTJCLEVBQUU7QUFDN0IsMkJBQXFCLEtBQUs7QUFBQSxJQUM1QjtBQUFBLElBQ0EsQ0FBQyxvQkFBb0I7QUFBQSxFQUN2QjtBQUNBLFFBQU0scUNBQWlDO0FBQUEsSUFDckMsQ0FBQyxVQUFrQjtBQUNqQixpQ0FBMkIsRUFBRTtBQUM3Qiw4QkFBd0IsS0FBSztBQUFBLElBQy9CO0FBQUEsSUFDQSxDQUFDLHVCQUF1QjtBQUFBLEVBQzFCO0FBQ0EsUUFBTSxrQ0FBOEI7QUFBQSxJQUNsQyxDQUFDLFVBQWtCO0FBQ2pCLGlDQUEyQixFQUFFO0FBQzdCLHdCQUFrQixLQUFLO0FBQUEsSUFDekI7QUFBQSxJQUNBLENBQUMsaUJBQWlCO0FBQUEsRUFDcEI7QUFDQSxRQUFNLGdDQUE0Qiw0QkFBWSxNQUFNO0FBQ2xELFFBQUksb0JBQW9CO0FBQ3RCO0FBQUEsSUFDRjtBQUVBLFFBQUksd0JBQXdCLGlCQUFpQjtBQUMzQyxZQUFNLFVBQ0osU0FBUyx1QkFBdUIsS0FDaEMsa0NBQWtDLEtBQUs7QUFDekMsb0JBQWMsT0FBTztBQUNyQixnQkFBVSxPQUFPO0FBQ2pCO0FBQUEsSUFDRjtBQUVBLCtCQUEyQixFQUFFO0FBQzdCLHFCQUFpQjtBQUFBLEVBQ25CLEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBQ0QsUUFBTSxnQ0FBNEIsNEJBQVksTUFBTTtBQUNsRCwrQkFBMkIsRUFBRTtBQUM3QixxQkFBaUI7QUFDakIsb0JBQWdCLG9CQUFvQjtBQUNwQyxvQkFBZ0IsOEJBQThCO0FBQUEsRUFDaEQsR0FBRyxDQUFDLGtCQUFrQixnQkFBZ0IscUJBQXFCLGdCQUFnQiw2QkFBNkIsQ0FBQztBQUN6RyxRQUFNLEVBQUUsa0JBQWtCLGdCQUFnQixhQUFhLGdCQUFnQixpQkFBaUIsZUFBZSxlQUFlLElBQ3BILDhCQUE4QjtBQUFBLElBQzVCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFDSCxRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsSUFBSSxtQ0FBbUM7QUFBQSxJQUNyQztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxlQUFlLFFBQVE7QUFBQSxFQUN6QixDQUFDO0FBRUQsUUFBTSxtQkFBZSx3QkFBUSxNQUFNLFdBQVcsT0FBTyxVQUFVLGVBQWUsR0FBRyxDQUFDLFVBQVUsS0FBSyxDQUFDO0FBQ2xHLFFBQU0saUJBQWlCLEtBQUssTUFBTSxNQUFNLFVBQVUsS0FBSyxlQUFlO0FBRXRFLGlDQUErQjtBQUFBLElBQzdCO0FBQUEsSUFDQSxzQkFBc0IsQ0FBQyxtQkFBbUI7QUFBQSxJQUMxQztBQUFBLElBQ0E7QUFBQSxJQUNBLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQixDQUFDO0FBQUEsRUFDdkIsQ0FBQztBQUVELFFBQU0sRUFBRSxjQUFjLDBCQUEwQixhQUFhLElBQUksZ0NBQWdDO0FBQUEsSUFDL0Y7QUFBQSxJQUNBO0FBQUEsSUFDQSxlQUFlLGlCQUFpQjtBQUFBLElBQ2hDLGlCQUFpQixtQkFBbUI7QUFBQSxJQUNwQztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSx3QkFBd0Isb0JBQW9CLG1CQUFtQjtBQUFBLElBQy9ELDRCQUE0QixnQkFBZ0I7QUFBQSxJQUM1QyxtQ0FBbUMscUJBQXFCLGdCQUFnQjtBQUFBLElBQ3hFLHNDQUFzQyxnQkFBZ0I7QUFBQSxJQUN0RCw2Q0FBNkMscUJBQXFCLGdCQUFnQjtBQUFBLElBQ2xGLGdDQUFnQyxxQkFBcUIsd0JBQXdCLG1CQUN6RTtBQUFBLE1BQ0UsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLElBQ2IsSUFDQTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSwwQkFBMEIsQ0FBQyxZQUFZO0FBQ3JDLDBCQUFvQixJQUFJO0FBQ3hCLGlDQUEyQixPQUFPO0FBQ2xDLGdCQUFVLE9BQU87QUFBQSxJQUNuQjtBQUFBLElBQ0EsMEJBQTBCLE1BQU07QUFDOUIsMEJBQW9CLEtBQUs7QUFDekIsaUNBQTJCLEVBQUU7QUFDN0Isc0JBQWdCLHFCQUFxQjtBQUNyQyxzQkFBZ0IsK0JBQStCO0FBQUEsSUFDakQ7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSxFQUFFLE9BQU8sYUFBYSxjQUFjLGtCQUFrQixpQkFBaUIsa0JBQWtCLHlCQUF5QixJQUN0SCxtQ0FBbUM7QUFBQSxJQUNqQztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVILGdDQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsb0JBQW9CLEtBQU07QUFDL0IsUUFBSSxDQUFDLDBCQUEyQjtBQUNoQyxRQUFJLFdBQVcsMEJBQTJCO0FBQzFDLGNBQVUseUJBQXlCO0FBQUEsRUFDckMsR0FBRyxDQUFDLE1BQU0sV0FBVywyQkFBMkIsa0JBQWtCLE1BQU0sQ0FBQztBQUV6RSxRQUFNLG1CQUFtQixRQUFRLFdBQVc7QUFDNUMsUUFBTSxrQkFBbUIsb0JBQW9CLENBQUMsMEJBQTRCLENBQUMsQ0FBQyx3QkFBd0I7QUFDcEcsUUFBTSx5QkFBeUIsaUJBQWlCLHdCQUF3QixDQUFDLG1CQUFtQjtBQUM1RixRQUFNLCtCQUErQiwwQkFBMEIsQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQztBQUN4RyxRQUFNLDJCQUEyQixtQkFBbUIsdUJBQXVCLENBQUM7QUFDNUUsUUFBTSx3Q0FDSixvQkFDQSxvQkFDQSw0QkFDQSxDQUFDLENBQUMsU0FBUyxNQUFNLEtBQ2pCLENBQUMsQ0FBQyxVQUNGLENBQUMsU0FBUyxPQUFPLG1CQUFtQjtBQUV0QyxRQUFNLDhCQUE4QixvQkFBcUIsb0JBQW9CO0FBQzdFLFFBQU0scUJBQXFCLFFBQVEsYUFBYTtBQUNoRCxRQUFNLHlCQUF5Qiw4QkFBOEIsNEJBQTRCO0FBRXpGLGdDQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsb0JBQW9CO0FBQ3ZCLGtDQUE0QjtBQUM1QjtBQUFBLElBQ0Y7QUFFQSw4QkFBMEI7QUFBQSxNQUN4QixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxPQUFPO0FBQUEsSUFDVCxDQUFDO0FBQ0QsV0FBTyxNQUFNO0FBQ1gsa0NBQTRCO0FBQUEsSUFDOUI7QUFBQSxFQUNGLEdBQUcsQ0FBQyxvQkFBb0Isd0JBQXdCLDJCQUEyQixDQUFDO0FBRTVFLGlDQUErQjtBQUFBLElBQzdCLFFBQVE7QUFBQSxJQUNSLFNBQVM7QUFBQSxFQUNYLENBQUM7QUFDRCxRQUFNLHlCQUNKLG9CQUFvQixZQUNoQix3Q0FDRSxnQkFDQSxjQUNGLENBQUMsMEJBQTBCLENBQUMsMkJBQzFCLGNBQ0E7QUFFUixzQ0FBb0M7QUFBQSxJQUNsQztBQUFBLElBQ0EsV0FBVyxNQUFNO0FBQUEsSUFDakI7QUFBQSxJQUNBLFVBQVU7QUFBQSxJQUNWLGdCQUFnQix3Q0FBd0MsUUFBUTtBQUFBLElBQ2hFLFlBQVk7QUFBQSxJQUNaLGtCQUFrQjtBQUFBLElBQ2xCLGVBQWU7QUFBQSxJQUNmLGlCQUFpQjtBQUFBLElBQ2pCO0FBQUEsSUFDQTtBQUFBLElBQ0Esa0JBQWtCO0FBQUEsSUFDbEIsa0JBQWtCO0FBQUEsSUFDbEI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsZUFBZSxNQUFNO0FBQ25CLFdBQUssNEJBQTRCLHNCQUFzQixzQkFBc0I7QUFDM0UseUJBQWlCO0FBQ2pCLDZCQUFxQiwyQkFBMkIsb0JBQW9CLEdBQUc7QUFBQSxVQUNyRSxpQkFBaUI7QUFBQSxRQUNuQixDQUFDO0FBQ0Q7QUFBQSxNQUNGO0FBRUEsV0FBSyxhQUFhO0FBQUEsSUFDcEI7QUFBQSxJQUNBLGlCQUFpQixNQUFNO0FBQ3JCLFVBQUkscUJBQXFCLFNBQVM7QUFDaEMseUJBQWlCO0FBQ2pCLDZCQUFxQiwyQkFBMkIsb0JBQW9CLE9BQU8sR0FBRztBQUFBLFVBQzVFLGlCQUFpQjtBQUFBLFFBQ25CLENBQUM7QUFDRDtBQUFBLE1BQ0Y7QUFFQSw2QkFBdUI7QUFDdkIsMkJBQXFCLG1CQUFtQjtBQUFBLFFBQ3RDLGlCQUFpQjtBQUFBLE1BQ25CLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLEVBQUUsc0JBQXNCLGdCQUFnQixzQkFBc0IsVUFBVSx1QkFBdUIsSUFDbkcsbUNBQW1DO0FBQUEsSUFDbkM7QUFBQSxJQUNBO0FBQUEsSUFDQSxnQkFBZ0I7QUFBQSxJQUNoQjtBQUFBLElBQ0Esc0JBQXNCLFNBQVMsUUFBUSxtQkFBbUI7QUFBQSxJQUMxRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxxQkFBcUI7QUFBQSxJQUNyQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQseUJBQXVCO0FBQUEsSUFDckIsY0FBYztBQUFBLElBQ2Q7QUFBQSxJQUNBLE9BQU87QUFBQSxJQUNQO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSxhQUFhLHNDQUFzQztBQUFBLElBQ3ZELFdBQVc7QUFBQSxNQUNUO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxhQUFhO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0Esc0JBQXNCO0FBQUEsTUFDdEI7QUFBQSxNQUNBLG1CQUFtQjtBQUFBLE1BQ25CLHNCQUFzQjtBQUFBLE1BQ3RCLHlCQUF5QjtBQUFBLE1BQ3pCO0FBQUEsTUFDQSxZQUFZO0FBQUEsUUFDVixTQUFTO0FBQUEsUUFDVCxXQUFXLGdCQUFnQjtBQUFBLFFBQzNCLHFCQUFxQixnQkFBZ0I7QUFBQSxRQUNyQyxXQUFXLGdCQUFnQjtBQUFBLFFBQzNCLGNBQWMsZ0JBQWdCO0FBQUEsUUFDOUIsVUFBVSxRQUFRLG1CQUFtQixnQkFBZ0I7QUFBQSxRQUNyRCxtQkFBbUIsZ0JBQWdCO0FBQUEsUUFDbkMsNkJBQTZCLGdCQUFnQjtBQUFBLE1BQy9DO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0Esa0JBQWtCLFlBQVksb0JBQW9CLFNBQVMsUUFBUSxZQUFZO0FBQUEsTUFDL0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBRUQsU0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0gsc0JBQXNCLGdDQUFnQyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsTUFBTSxLQUFLLENBQUMsQ0FBQztBQUFBLElBQzdHLHlCQUF5QixRQUFRLENBQUM7QUFBQSxJQUNsQztBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU0saUNBQWlDLE1BQU07QUFDM0MsUUFBTSxhQUFhLG9DQUFvQztBQUN2RCxRQUFNLG1CQUFlO0FBQUEsSUFDbkIsTUFBTTtBQUFBLE1BQ0o7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLE9BQU8sS0FBSyw2QkFBNkIsYUFBYTtBQUFBLFFBQ3RELE1BQU0sNkNBQUMsZUFBWTtBQUFBLFFBQ25CLFNBQVMsTUFBTTtBQUNiLGVBQUssV0FBVyxxQkFBcUI7QUFBQSxRQUN2QztBQUFBLFFBQ0EsVUFBVSxXQUFXO0FBQUEsTUFDdkI7QUFBQSxJQUNGO0FBQUEsSUFDQSxDQUFDLFVBQVU7QUFBQSxFQUNiO0FBRUEsU0FDRSw4RUFDRTtBQUFBLGlEQUFDLG1DQUF3QixPQUFPLFdBQVcsT0FBTyxTQUFTLFdBQVcsU0FBUyxTQUFTLFdBQVcsU0FBUztBQUFBLElBQzNHLFdBQVcsdUJBQ1Y7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVcsS0FBSyw2QkFBNkIsa0JBQWtCO0FBQUEsUUFDL0QsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsZUFBZSxLQUFLLDZCQUE2QixrQkFBa0I7QUFBQSxRQUNuRSxXQUFXO0FBQUE7QUFBQSxJQUNiLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLDBCQUEwQixNQUFNO0FBQ3BDLFNBQ0UsNkNBQUMsZ0NBQXFCLHlCQUF1QixNQUMzQyx1REFBQyxrQ0FBK0IsR0FDbEM7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLDRCQUE0QjtBQUNuRSxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLDJCQUF3QixDQUFFO0FBQ3REO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxrQ0FBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJob3VycyIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImhvdXJzIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
