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
} from "./chunks/chunk-ZI7HEKLS.js";
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
  appendExpenseTicketReturnQuery,
  buildExpenseSheetDetailUrl,
  buildExpenseSheetLineDetailUrl,
  buildExpenseTicketLinkUrl,
  normalizeExpenseTicketReturnContext,
  resolveExpenseTicketReturnContext,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-3FZNNGIE.js";
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
      const validatedSheetId = await validateLinkedSheetBeforeMutation();
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
      syncSheetLine: true
    });
  }, [runHeaderUpdate]);
  const handlePersistHeaderDraft = (0, import_react.useCallback)(async () => {
    return runHeaderUpdate({
      syncSheetLine: linkedExpenseLineProjectIdChanged || linkedExpenseLineReimbursableExpenseChanged || !!safeText(linkedExpenseSheetId),
      continueOnSheetSyncFailure: true
    });
  }, [
    linkedExpenseLineProjectIdChanged,
    linkedExpenseLineReimbursableExpenseChanged,
    linkedExpenseSheetId,
    runHeaderUpdate
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
    return {
      autoEditMode,
      detailOrigin,
      contextSheetId,
      contextLineRecId,
      isFromExpenseSheetCreate,
      isFromExpenseLine,
      isFromSheetLink,
      ticketReturnContext
    };
  }, [autoEditMode, explicitReturnContext, fileId, routeOrigin, routeSheetId, routeSheetLineRecId]);
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
    ticketReturnContext
  } = useExpenseTicketDetailRouteContext();
  const canEditFromSheetLinkFailure = isFromSheetLink && autoEditMode;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFJvdXRlQ29udGV4dC50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5LnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRDdXJyZW5jeVNldHRsZW1lbnRGaWVsZHMudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVTZWN0aW9uLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL0V4cGVuc2VUaWNrZXREZXRhaWxWaWV3LnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldFRvcGJhckJhY2tMb2NrLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24sIHsgdHlwZSBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCB7IHVzZUF1dGhDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XHJcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xyXG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XHJcbmltcG9ydCB7IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoLCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLCBuYXZpZ2F0ZVRvRXhwZW5zZVVybCwgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBpc01hbmFnaW5nT3RoZXJFeHBlbnNlVXNlciB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTWFuYWdlZFVzZXJTY29wZS50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlR2FzdG9UeXBlT3B0aW9ucyB9IGZyb20gXCIuLi8uLi9jb25zdGFudHMvZXhwZW5zZUdhc3RvVHlwZUNhdGFsb2cudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB7IGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHJlYWRFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VMaW5lQ3VycmVuY3lDb2RlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VMaW5lQ3VycmVuY3kudHNcIjtcclxuaW1wb3J0IHtcclxuICBidWlsZEV4cGVuc2VFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZSxcclxuICBmZXRjaEV4cGVuc2VPZmZpY2lhbEV4Y2hhbmdlUmF0ZSxcclxuICBmb3JtYXRFeHBlbnNlRXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZSxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUV4Y2hhbmdlUmF0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZSB9IGZyb20gXCIuLi91c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbEVkaXRvci50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbFJvdXRlQ29udGV4dC50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsRGlzcGxheSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5LnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsQ29uZmlybVN0YXRlLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsSW50ZXJhY3Rpb25zLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0RGV0YWlsVmlldyBmcm9tIFwiLi9FeHBlbnNlVGlja2V0RGV0YWlsVmlldy50c3hcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmUudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUgfSBmcm9tIFwiLi4vdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdQYW5lbC50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldFRvcGJhckJhY2tMb2NrIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldFRvcGJhckJhY2tMb2NrLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIsIEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XG5cclxuY29uc3QgTElORVNfUEFHRV9TSVpFID0gNjtcclxuXHJcbmNvbnN0IE5ld0xpbmVJY29uID0gKCkgPT4gKFxyXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwic2l6ZS01XCI+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0zIDE5YzMuMzMzIC0yIDUgLTQgNSAtNmMwIC0zIC0xIC0zIC0yIC0zcy0yLjAzMiAxLjA4NSAtMiAzYy4wMzQgMi4wNDggMS42NTggMi44NzcgMi41IDRjMS41IDIgMi41IDIuNSAzLjUgMWMuNjY3IC0xIDEuMTY3IC0xLjgzMyAxLjUgLTIuNWMxIDIuMzMzIDIuMzMzIDMuNSA0IDMuNWgyLjVcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMjAgMTd2LTEyYzAgLTEuMTIxIC0uODc5IC0yIC0yIC0ycy0yIC44NzkgLTIgMnYxMmwyIDJsMiAtMlwiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNiA3aDRcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgcGFnZWRTbGljZSA9IDxULD4oaXRlbXM6IFRbXSwgcGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKTogVFtdID0+IHtcclxuICBpZiAoIWl0ZW1zLmxlbmd0aCkgcmV0dXJuIFtdO1xyXG4gIGNvbnN0IHNhZmVQYWdlID0gTWF0aC5tYXgoMSwgcGFnZSk7XHJcbiAgY29uc3Qgc3RhcnQgPSAoc2FmZVBhZ2UgLSAxKSAqIHBhZ2VTaXplO1xyXG4gIHJldHVybiBpdGVtcy5zbGljZShzdGFydCwgc3RhcnQgKyBwYWdlU2l6ZSk7XHJcbn07XHJcblxyXG4vLyBJbml0aWFsaXplcyBhdXRoIHNlZWQgZm9yIGV4cGVuc2UgQVBJIGNhbGxzIGJlZm9yZSBpc2xhbmQgZWZmZWN0cyBydW4uXHJcbmNvbnN0IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoID0gKCkgPT4ge1xyXG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcclxuICAgIHRva2VuOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxyXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXHJcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlTGlua2VkVGlja2V0QmxvY2tlZE1lc3NhZ2UgPSAoaXNQYWlkOiBib29sZWFuKTogc3RyaW5nID0+IHtcclxuICBpZiAoaXNQYWlkKSB7XHJcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1BhaWRSZWFkT25seVwiLCBcIkxhcyBob2phcyBkZSBnYXN0byBwYWdhZGFzIHNvbiBkZSBzb2xvIGxlY3R1cmEuXCIpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9SZWFkT25seUJ5U3RhdHVzXCIsIFwiTm8gc2UgcHVlZGUgZWRpdGFyIGVzdGEgaG9qYSBkZSBnYXN0b3MgZW4gZWwgZXN0YWRvIGFjdHVhbC5cIik7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxNb2RhbFZpZXcgPSAoe1xyXG4gIG1vZGFsLFxyXG4gIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgbW9kYWxDYW5jZWxUZXh0LFxyXG4gIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgYnVzeSxcclxuICBtb2RhbEVycm9yLFxyXG4gIHN0YXR1cyxcclxuICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiB7XHJcbiAgbW9kYWw6IHtcclxuICAgIG9wZW46IGJvb2xlYW47XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgc2hvd0NhbmNlbDogYm9vbGVhbjtcclxuICAgIHNob3dDb25maXJtOiBib29sZWFuO1xyXG4gIH07XHJcbiAgbW9kYWxDb25maXJtVGV4dDogc3RyaW5nO1xyXG4gIG1vZGFsQ2FuY2VsVGV4dDogc3RyaW5nO1xyXG4gIG1vZGFsTG9hZGluZ1RleHQ6IHN0cmluZztcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsRXJyb3I6IHN0cmluZztcclxuICBzdGF0dXM6IHN0cmluZztcclxuICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xyXG59KSA9PiAoe1xyXG4gIG9wZW46IG1vZGFsLm9wZW4sXHJcbiAgdGl0bGU6IG1vZGFsLnRpdGxlLFxyXG4gIG1lc3NhZ2U6IG1vZGFsLm1lc3NhZ2UsXHJcbiAgY29uZmlybVRleHQ6IG1vZGFsQ29uZmlybVRleHQsXHJcbiAgY2FuY2VsVGV4dDogbW9kYWxDYW5jZWxUZXh0LFxyXG4gIGxvYWRpbmdUZXh0OiBtb2RhbExvYWRpbmdUZXh0LFxyXG4gIHNob3dDYW5jZWw6IG1vZGFsLnNob3dDYW5jZWwsXHJcbiAgc2hvd0NvbmZpcm06IG1vZGFsLnNob3dDb25maXJtLFxyXG4gIGJ1c3ksXHJcbiAgZXJyb3I6IG1vZGFsRXJyb3IsXHJcbiAgc3RhdHVzLFxyXG4gIG9uQ29uZmlybTogaGFuZGxlTW9kYWxCdXR0b25Db25maXJtLFxyXG4gIG9uQ2FuY2VsOiBjbG9zZUNvbmZpcm0sXHJcbn0pO1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1ZpZXcgPSAoe1xyXG4gIHByZXZpZXdPcGVuLFxyXG4gIHByZXZpZXdCdXN5LFxyXG4gIHByZXZpZXdFcnJvcixcclxuICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgcHJldmlld0FsdFRleHQsXHJcbiAgcHJldmlld1NjYWxlLFxyXG4gIHByZXZpZXdUcmFuc2xhdGUsXHJcbiAgcHJldmlld1N1cmZhY2VSZWYsXHJcbiAgY2xvc2VQcmV2aWV3LFxyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcclxuICBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXHJcbiAgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXHJcbn06IHtcclxuICBwcmV2aWV3T3BlbjogYm9vbGVhbjtcclxuICBwcmV2aWV3QnVzeTogYm9vbGVhbjtcclxuICBwcmV2aWV3RXJyb3I6IHN0cmluZztcclxuICBwcmV2aWV3SW1hZ2VVcmw6IHN0cmluZztcclxuICBwcmV2aWV3QWx0VGV4dDogc3RyaW5nO1xyXG4gIHByZXZpZXdTY2FsZTogbnVtYmVyO1xyXG4gIHByZXZpZXdUcmFuc2xhdGU6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfTtcclxuICBwcmV2aWV3U3VyZmFjZVJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgY2xvc2VQcmV2aWV3OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bjogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZTogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbn0pID0+ICh7XHJcbiAgb3BlbjogcHJldmlld09wZW4sXHJcbiAgYnVzeTogcHJldmlld0J1c3ksXHJcbiAgZXJyb3I6IHByZXZpZXdFcnJvcixcclxuICBpbWFnZVVybDogcHJldmlld0ltYWdlVXJsLFxyXG4gIGltYWdlQWx0OiBwcmV2aWV3QWx0VGV4dCxcclxuICBzY2FsZTogcHJldmlld1NjYWxlLFxyXG4gIHRyYW5zbGF0ZTogcHJldmlld1RyYW5zbGF0ZSxcclxuICBzdXJmYWNlUmVmOiBwcmV2aWV3U3VyZmFjZVJlZixcclxuICBvbkNsb3NlOiBjbG9zZVByZXZpZXcsXHJcbiAgb25Qb2ludGVyRG93bjogaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gIG9uUG9pbnRlck1vdmU6IGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcclxuICBvblBvaW50ZXJFbmQ6IGhhbmRsZVByZXZpZXdQb2ludGVyRW5kLFxyXG59KTtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZVZpZXcgPSB7XHJcbiAgdmlzaWJsZTogYm9vbGVhbjtcclxuICBwcm9qZWN0SWQ6IHN0cmluZztcclxuICByZWltYnVyc2FibGVFeHBlbnNlOiBudW1iZXI7XHJcbiAgaXNMb2FkaW5nOiBib29sZWFuO1xyXG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gIGRpc2FibGVkOiBib29sZWFuO1xyXG4gIG9uUHJvamVjdElkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvblJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2U6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXcgPSAoe1xyXG4gIGlzTG9hZGluZyxcclxuICBlcnJvck1lc3NhZ2UsXHJcbiAgaGVhZGVyLFxyXG4gIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gIHByZXZpZXdCdXN5LFxyXG4gIHByZXZpZXdFcnJvcixcclxuICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgcHJldmlld0FsdFRleHQsXHJcbiAgb3BlbkZpbGUsXHJcbiAgc3RhdHVzTGFiZWwsXHJcbiAgZ2FzdG9UeXBlTGFiZWwsXHJcbiAgdG90YWxBbW91bnRUZXh0LFxyXG4gIHRyYW5zRGF0ZVRleHQsXHJcbiAgdGlja2V0VGltZVRleHQsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkZXNjcmlwdGlvbkludmFsaWQsXHJcbiAgZGVzY3JpcHRpb25JbnB1dFJlZixcclxuICBkcmFmdEdhc3RvVHlwZSxcclxuICBnYXN0b1R5cGVJbnZhbGlkLFxyXG4gIGdhc3RvVHlwZUlucHV0UmVmLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGN1cnJlbmN5Q29kZUludmFsaWQsXHJcbiAgY3VycmVuY3lJbnB1dFJlZixcclxuICBkcmFmdFRvdGFsQW1vdW50LFxyXG4gIHRvdGFsQW1vdW50SW52YWxpZCxcclxuICB0b3RhbEFtb3VudElucHV0UmVmLFxyXG4gIGRyYWZ0QW1vdW50TVNULFxyXG4gIGFtb3VudE1TVEludmFsaWQsXHJcbiAgYW1vdW50TVNUSW5wdXRSZWYsXHJcbiAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgZXhjaGFuZ2VSYXRlSW52YWxpZCxcclxuICBleGNoYW5nZVJhdGVJbnB1dFJlZixcclxuICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSxcclxuICBsb2NhbEN1cnJlbmN5Q29kZSxcclxuICBkcmFmdFRyYW5zRGF0ZSxcclxuICBkcmFmdFRpY2tldFRpbWUsXHJcbiAgZHJhZnRVcmxGaWxlLFxyXG4gIGRyYWZ0RmlsZU5hbWUsXHJcbiAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICBzZXREcmFmdEdhc3RvVHlwZSxcclxuICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICBzZXREcmFmdFRvdGFsQW1vdW50LFxyXG4gIHNldERyYWZ0QW1vdW50TVNULFxyXG4gIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIGNvbW1pdERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIGlzRnJvbVNoZWV0TGluayxcclxuICBsaW5rZWRMaW5lLFxyXG4gIGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQsXHJcbiAgdmlzaWJsZUxpbmVzLFxyXG4gIHRvdGFsTGluZVBhZ2VzLFxyXG4gIGxpbmVQYWdlLFxyXG4gIHNhZmVDdXJyZW5jeUNvZGUsXHJcbiAgcGFnaW5hdGlvbkxhYmVscyxcclxuICBsaW5lQ29udGFpbmVyUmVmLFxyXG4gIHNldExpbmVQYWdlLFxyXG4gIG9wZW5MaW5lRGV0YWlsLFxyXG59OiB7XHJcbiAgaXNMb2FkaW5nOiBib29sZWFuO1xyXG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw7XHJcbiAgc2hvd1N0aWNreVByZXZpZXc6IGJvb2xlYW47XHJcbiAgcHJldmlld0J1c3k6IGJvb2xlYW47XHJcbiAgcHJldmlld0Vycm9yOiBzdHJpbmc7XHJcbiAgcHJldmlld0ltYWdlVXJsOiBzdHJpbmc7XHJcbiAgcHJldmlld0FsdFRleHQ6IHN0cmluZztcclxuICBvcGVuRmlsZTogKCkgPT4gdm9pZDtcclxuICBzdGF0dXNMYWJlbDogc3RyaW5nO1xyXG4gIGdhc3RvVHlwZUxhYmVsOiBzdHJpbmc7XHJcbiAgdG90YWxBbW91bnRUZXh0OiBzdHJpbmc7XHJcbiAgdHJhbnNEYXRlVGV4dDogc3RyaW5nO1xyXG4gIHRpY2tldFRpbWVUZXh0OiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGdhc3RvVHlwZU9wdGlvbnM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXTtcclxuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb25JbnZhbGlkOiBib29sZWFuO1xyXG4gIGRlc2NyaXB0aW9uSW5wdXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcclxuICBnYXN0b1R5cGVJbnZhbGlkOiBib29sZWFuO1xyXG4gIGdhc3RvVHlwZUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZDogYm9vbGVhbjtcclxuICBjdXJyZW5jeUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIGRyYWZ0VG90YWxBbW91bnQ6IHN0cmluZztcclxuICB0b3RhbEFtb3VudEludmFsaWQ6IGJvb2xlYW47XHJcbiAgdG90YWxBbW91bnRJbnB1dFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICBkcmFmdEFtb3VudE1TVDogc3RyaW5nO1xyXG4gIGFtb3VudE1TVEludmFsaWQ6IGJvb2xlYW47XHJcbiAgYW1vdW50TVNUSW5wdXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcclxuICBleGNoYW5nZVJhdGVJbnZhbGlkOiBib29sZWFuO1xyXG4gIGV4Y2hhbmdlUmF0ZUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlOiBzdHJpbmc7XHJcbiAgbG9jYWxDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIGRyYWZ0VGlja2V0VGltZTogc3RyaW5nO1xyXG4gIGRyYWZ0VXJsRmlsZTogc3RyaW5nO1xyXG4gIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcclxuICBzZXREcmFmdERlc2NyaXB0aW9uOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXREcmFmdEdhc3RvVHlwZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0RHJhZnRDdXJyZW5jeUNvZGU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldERyYWZ0VG90YWxBbW91bnQ6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldERyYWZ0QW1vdW50TVNUOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXREcmFmdEV4Y2hhbmdlUmF0ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgY29tbWl0RHJhZnRFeGNoYW5nZVJhdGU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGlzRnJvbVNoZWV0TGluazogYm9vbGVhbjtcclxuICBsaW5rZWRMaW5lOiBFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lVmlldztcclxuICBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0OiAoKSA9PiB2b2lkO1xyXG4gIHZpc2libGVMaW5lczogRXhwZW5zZVRpY2tldERldGFpbExpbmVbXTtcclxuICB0b3RhbExpbmVQYWdlczogbnVtYmVyO1xyXG4gIGxpbmVQYWdlOiBudW1iZXI7XHJcbiAgc2FmZUN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIHBhZ2luYXRpb25MYWJlbHM6IHtcclxuICAgIGZpcnN0OiBzdHJpbmc7XHJcbiAgICBwcmV2OiBzdHJpbmc7XHJcbiAgICBuZXh0OiBzdHJpbmc7XHJcbiAgICBsYXN0OiBzdHJpbmc7XHJcbiAgfTtcclxuICBsaW5lQ29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBzZXRMaW5lUGFnZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcclxuICBvcGVuTGluZURldGFpbDogKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG59KSA9PiAoe1xyXG4gIGlzTG9hZGluZyxcclxuICBlcnJvck1lc3NhZ2UsXHJcbiAgaGVhZGVyLFxyXG4gIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gIHByZXZpZXdCdXN5LFxyXG4gIHByZXZpZXdFcnJvcixcclxuICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgcHJldmlld0ZpbGVOYW1lOiBwcmV2aWV3QWx0VGV4dCxcclxuICBwcmV2aWV3QWx0VGV4dCxcclxuICBvbk9wZW5QcmV2aWV3OiBvcGVuRmlsZSxcclxuICBzdGF0dXNMYWJlbCxcclxuICBnYXN0b1R5cGVMYWJlbCxcclxuICB0b3RhbEFtb3VudFRleHQsXHJcbiAgdHJhbnNEYXRlVGV4dCxcclxuICB0aWNrZXRUaW1lVGV4dCxcclxuICBpc0VkaXRpbmcsXHJcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICBkZXNjcmlwdGlvbklucHV0UmVmLFxyXG4gIGRyYWZ0R2FzdG9UeXBlLFxyXG4gIGdhc3RvVHlwZUludmFsaWQsXHJcbiAgZ2FzdG9UeXBlSW5wdXRSZWYsXHJcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICBjdXJyZW5jeUlucHV0UmVmLFxyXG4gIGRyYWZ0VG90YWxBbW91bnQsXHJcbiAgdG90YWxBbW91bnRJbnZhbGlkLFxyXG4gIHRvdGFsQW1vdW50SW5wdXRSZWYsXHJcbiAgZHJhZnRBbW91bnRNU1QsXHJcbiAgYW1vdW50TVNUSW52YWxpZCxcclxuICBhbW91bnRNU1RJbnB1dFJlZixcclxuICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICBleGNoYW5nZVJhdGVJbnZhbGlkLFxyXG4gIGV4Y2hhbmdlUmF0ZUlucHV0UmVmLFxyXG4gIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlLFxyXG4gIGxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0VHJhbnNEYXRlLFxyXG4gIGRyYWZ0VGlja2V0VGltZSxcclxuICBkcmFmdFVybEZpbGUsXHJcbiAgZHJhZnRGaWxlTmFtZSxcclxuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U6IHNldERyYWZ0RGVzY3JpcHRpb24sXHJcbiAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZTogc2V0RHJhZnRHYXN0b1R5cGUsXHJcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgb25EcmFmdFRvdGFsQW1vdW50Q2hhbmdlOiBzZXREcmFmdFRvdGFsQW1vdW50LFxyXG4gIG9uRHJhZnRBbW91bnRNU1RDaGFuZ2U6IHNldERyYWZ0QW1vdW50TVNULFxyXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U6IHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDb21taXQ6IGNvbW1pdERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIG9uT3BlbkZpbGU6IG9wZW5GaWxlLFxyXG4gIG9uT3BlbkV4cGVuc2VTaGVldDogaXNGcm9tU2hlZXRMaW5rID8gdW5kZWZpbmVkIDogaGFuZGxlT3BlbkV4cGVuc2VTaGVldCxcclxuICBsaW5rZWRMaW5lLFxyXG4gIHZpc2libGVMaW5lcyxcclxuICB0b3RhbExpbmVQYWdlcyxcclxuICBsaW5lUGFnZSxcclxuICBjdXJyZW5jeUNvZGU6IHNhZmVDdXJyZW5jeUNvZGUsXHJcbiAgcGFnaW5hdGlvbkxhYmVscyxcclxuICBjb250YWluZXJSZWY6IGxpbmVDb250YWluZXJSZWYsXHJcbiAgb25MaW5lUGFnZUNoYW5nZTogc2V0TGluZVBhZ2UsXHJcbiAgb25PcGVuTGluZTogb3BlbkxpbmVEZXRhaWwsXHJcbn0pO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3QXJncyA9IFBhcmFtZXRlcnM8dHlwZW9mIGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbE1vZGFsVmlldz5bMF07XHJcbnR5cGUgRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3QXJncyA9IFBhcmFtZXRlcnM8dHlwZW9mIGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3PlswXTtcclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXdBcmdzID0gUGFyYW1ldGVyczx0eXBlb2YgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXc+WzBdO1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUGFnZVZpZXdNb2RlbCA9ICh7XHJcbiAgbW9kYWxBcmdzLFxyXG4gIHByZXZpZXdBcmdzLFxyXG4gIGNvbnRlbnRBcmdzLFxyXG59OiB7XHJcbiAgbW9kYWxBcmdzOiBFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3QXJncztcclxuICBwcmV2aWV3QXJnczogRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3QXJncztcclxuICBjb250ZW50QXJnczogRXhwZW5zZVRpY2tldERldGFpbENvbnRlbnRWaWV3QXJncztcclxufSkgPT4gKHtcclxuICBtb2RhbDogYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3KG1vZGFsQXJncyksXHJcbiAgcHJldmlldzogYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1ZpZXcocHJldmlld0FyZ3MpLFxyXG4gIGNvbnRlbnQ6IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbENvbnRlbnRWaWV3KGNvbnRlbnRBcmdzKSxcclxufSk7XHJcblxyXG4vLyBLZWVwcyBmaWx0ZXIgY2FjaGUgd2lyaW5nIGFuZCBiYWNrIG5hdmlnYXRpb24gb3V0c2lkZSB0aGUgcGFnZSBjb250YWluZXIgYm9keS5cclxuY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbE5hdmlnYXRpb25TdGF0ZSA9ICh7XHJcbiAgZmlsZUlkLFxyXG4gIGRldGFpbE9yaWdpbixcclxuICBoZWFkZXJUcmFuc0RhdGUsXHJcbiAgY29udGV4dExpbmVSZWNJZCxcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG59OiB7XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgZGV0YWlsT3JpZ2luOiBzdHJpbmc7XHJcbiAgaGVhZGVyVHJhbnNEYXRlOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xyXG4gIGNvbnRleHRMaW5lUmVjSWQ6IHN0cmluZztcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0OiBSZXR1cm5UeXBlPHR5cGVvZiB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0PltcInRpY2tldFJldHVybkNvbnRleHRcIl07XHJcbn0pID0+IHtcclxuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgc2F2ZUNhY2hlZFN0YXRlLCBtYXJrUmVzZXRGaWx0ZXJzUmV0dXJuLCBjbGVhckNhY2hlZFN0YXRlIH0gPSB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlKCk7XHJcblxyXG4gIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxCYWNrTmF2aWdhdGlvbih7XHJcbiAgICBmaWxlSWQsXHJcbiAgICBkZXRhaWxPcmlnaW4sXHJcbiAgICBoZWFkZXJUcmFuc0RhdGUsXHJcbiAgICBjb250ZXh0TGluZVJlY0lkLFxyXG4gICAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxuICAgIHJlYWRDYWNoZWRTdGF0ZSxcclxuICAgIHNhdmVDYWNoZWRTdGF0ZSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG1hcmtSZXNldEZpbHRlcnNSZXR1cm4sXHJcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBSdW5zIHRoZSBvbmUtc2hvdCBhdXRvIGVkaXQgdHJhbnNpdGlvbiBmb3IgbGlua2VkIGNvbnRleHRzIGFmdGVyIGRldGFpbCBkYXRhIGlzIHJlYWR5LlxyXG5jb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQXV0b0VkaXQgPSAoe1xuICBhdXRvRWRpdE1vZGUsXG4gIGNhbkF1dG9FZGl0SW5Db250ZXh0LFxuICBpc0xvYWRpbmcsXG4gIGhlYWRlcixcbiAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgY2FuQXR0ZW1wdEF1dG9FZGl0LFxufToge1xuICBhdXRvRWRpdE1vZGU6IGJvb2xlYW47XG4gIGNhbkF1dG9FZGl0SW5Db250ZXh0OiBib29sZWFuO1xuICBpc0xvYWRpbmc6IGJvb2xlYW47XG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw7XG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XG4gIGNhbkF0dGVtcHRBdXRvRWRpdDogYm9vbGVhbjtcbn0pID0+IHtcbiAgY29uc3QgYXV0b0VkaXRBdHRlbXB0ZWRSZWYgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFhdXRvRWRpdE1vZGUgfHwgIWNhbkF1dG9FZGl0SW5Db250ZXh0IHx8IGF1dG9FZGl0QXR0ZW1wdGVkUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBpZiAoaXNMb2FkaW5nIHx8ICFoZWFkZXIgfHwgIWNhbkF0dGVtcHRBdXRvRWRpdCkgcmV0dXJuO1xuXG4gICAgYXV0b0VkaXRBdHRlbXB0ZWRSZWYuY3VycmVudCA9IHRydWU7XG4gICAgaGFuZGxlRW5hYmxlRWRpdCgpO1xuICB9LCBbYXV0b0VkaXRNb2RlLCBjYW5BdHRlbXB0QXV0b0VkaXQsIGNhbkF1dG9FZGl0SW5Db250ZXh0LCBoYW5kbGVFbmFibGVFZGl0LCBoZWFkZXIsIGlzTG9hZGluZ10pO1xufTtcblxyXG4vLyBSZXNvbHZlcyBwZXJtaXNzaW9uIGFuZCBhY3RpbmctdXNlciBzdGF0ZSBzbyB0aGUgcGFnZSBjb250YWluZXIgc3RheXMgZm9jdXNlZCBvbiBvcmNoZXN0cmF0aW9uLlxyXG5jb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUGVybWlzc2lvblN0YXRlID0gKCkgPT4ge1xyXG4gIGNvbnN0IHtcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICB9ID0gdXNlQXV0aENvbnRleHQoKTtcclxuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIlZpZXdcIik7XHJcbiAgY29uc3QgY2FuRWRpdFRpY2tldEJ5TW9kdWxlID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJFZGl0XCIpO1xyXG4gIGNvbnN0IGNhbkRlbGV0ZVRpY2tldEJ5TW9kdWxlID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJGdWxsQWNjZXNzXCIpO1xyXG4gIGNvbnN0IGlzTWFuYWdpbmdPdGhlclVzZXIgPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlVXNlcih7XHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGFzQWNjZXNzLFxyXG4gICAgY2FuRWRpdFRpY2tldDogY2FuRWRpdFRpY2tldEJ5TW9kdWxlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgY2FuRGVsZXRlVGlja2V0OiBjYW5EZWxldGVUaWNrZXRCeU1vZHVsZSAmJiAhaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIGlzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIE93bnMgdGhlIHRpY2tldCBkZXRhaWwgcGFnZSBvcmNoZXN0cmF0aW9uIHdoaWxlIHRoZSBjb21wb25lbnQgc3RheXMgdGhpbiBmb3IgcmVuZGVyaW5nLlxyXG5jb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUGFnZVZpZXdNb2RlbCA9ICgpID0+IHtcclxuICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1RJQ0tFVF9GSUxFX0lEX18pO1xyXG4gIGNvbnN0IGxpbmVDb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCB7XHJcbiAgICBhdXRvRWRpdE1vZGUsXHJcbiAgICBkZXRhaWxPcmlnaW4sXHJcbiAgICBjb250ZXh0U2hlZXRJZCxcclxuICAgIGNvbnRleHRMaW5lUmVjSWQsXHJcbiAgICBpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUsXHJcbiAgICBpc0Zyb21FeHBlbnNlTGluZSxcbiAgICBpc0Zyb21TaGVldExpbmssXG4gICAgdGlja2V0UmV0dXJuQ29udGV4dCxcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQoKTtcbiAgY29uc3QgY2FuRWRpdEZyb21TaGVldExpbmtGYWlsdXJlID0gaXNGcm9tU2hlZXRMaW5rICYmIGF1dG9FZGl0TW9kZTtcbiAgY29uc3Qge1xyXG4gICAgaGFzQWNjZXNzLFxyXG4gICAgY2FuRWRpdFRpY2tldCxcclxuICAgIGNhbkRlbGV0ZVRpY2tldCxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbFBlcm1pc3Npb25TdGF0ZSgpO1xyXG4gIGNvbnN0IGdhc3RvVHlwZU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4gZ2V0RXhwZW5zZUdhc3RvVHlwZU9wdGlvbnMoKSwgW10pO1xyXG4gIGNvbnN0IGdhc3RvVHlwZUxhYmVsTWFwID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xyXG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgZ2FzdG9UeXBlT3B0aW9ucykge1xyXG4gICAgICBtYXAuc2V0KFN0cmluZyhvcHRpb24udmFsdWUpLCBvcHRpb24udGV4dCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWFwO1xyXG4gIH0sIFtnYXN0b1R5cGVPcHRpb25zXSk7XHJcbiAgY29uc3QgeyBoZWFkZXIsIGxpbmVzLCBpc0xvYWRpbmcsIGVycm9yTWVzc2FnZSwgcmVsb2FkRGV0YWlsIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUoe1xyXG4gICAgaGFzQWNjZXNzLFxyXG4gICAgZmlsZUlkLFxyXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXHJcbiAgfSk7XHJcbiAgY29uc3QgbGlua2VkRXhwZW5zZVNoZWV0SWQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gc2FmZVRleHQodGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCB8fCBjb250ZXh0U2hlZXRJZCB8fCBoZWFkZXI/LmhvamFHYXN0b3NJZERpc3BsYXkpLFxyXG4gICAgW2NvbnRleHRTaGVldElkLCBoZWFkZXI/LmhvamFHYXN0b3NJZERpc3BsYXksIHRpY2tldFJldHVybkNvbnRleHRdXHJcbiAgKTtcclxuICBjb25zdCBsaW5rZWRTaGVldExpbmUgPSB1c2VFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lKHtcclxuICAgIGVuYWJsZWQ6ICEhbGlua2VkRXhwZW5zZVNoZWV0SWQsXHJcbiAgICBzaGVldElkOiBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICAgIGxpbmVSZWNJZDogY29udGV4dExpbmVSZWNJZCxcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gIH0pO1xyXG4gIGNvbnN0IHtcclxuICAgIGxpbmtTaGVldExvY2tlZCxcclxuICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlLFxyXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZSh7XHJcbiAgICBpc0xpbmtNb2RlOiAhIWxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gICAgbGlua1NoZWV0SWQ6IGxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gICAgY2FuUHJvY2Vzc0xpbmtNb2RlOiB0cnVlLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgcmVzb2x2ZUJsb2NrZWRNZXNzYWdlOiByZXNvbHZlTGlua2VkVGlja2V0QmxvY2tlZE1lc3NhZ2UsXHJcbiAgfSk7XHJcbiAgY29uc3QgW3NoZWV0U3luY0Jsb2NrZWQsIHNldFNoZWV0U3luY0Jsb2NrZWRdID0gdXNlU3RhdGUoKCkgPT4gISFyZWFkRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKGZpbGVJZCkpO1xyXG4gIGNvbnN0IFtzaGVldFN5bmNCbG9ja2VkTWVzc2FnZSwgc2V0U2hlZXRTeW5jQmxvY2tlZE1lc3NhZ2VdID0gdXNlU3RhdGUoKCkgPT5cclxuICAgIHNhZmVUZXh0KHJlYWRFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoZmlsZUlkKT8ubWVzc2FnZSlcclxuICApO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZVJlcXVlc3RJZFJlZiA9IHVzZVJlZigwKTtcclxuICBjb25zdCBbZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UsIHNldEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtjb250ZXh0RGVmYXVsdEN1cnJlbmN5Q29kZSwgc2V0Q29udGV4dERlZmF1bHRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBsZXQgaXNDYW5jZWxsZWQgPSBmYWxzZTtcclxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcblxyXG4gICAgY29uc3QgbG9hZERlZmF1bHRDdXJyZW5jeUNvZGUgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGRlZmF1bHRDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVFeHBlbnNlTGluZUN1cnJlbmN5Q29kZShcclxuICAgICAgICBhd2FpdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlKHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKCFpc0NhbmNlbGxlZCkge1xyXG4gICAgICAgIHNldENvbnRleHREZWZhdWx0Q3VycmVuY3lDb2RlKGRlZmF1bHRDdXJyZW5jeUNvZGUpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZvaWQgbG9hZERlZmF1bHRDdXJyZW5jeUNvZGUoKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpc0NhbmNlbGxlZCA9IHRydWU7XHJcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoKTtcclxuICAgIH07XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgc3luY1N0YXRlID0gcmVhZEV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZShmaWxlSWQpO1xyXG4gICAgc2V0U2hlZXRTeW5jQmxvY2tlZCghIXN5bmNTdGF0ZSk7XHJcbiAgICBzZXRTaGVldFN5bmNCbG9ja2VkTWVzc2FnZShzYWZlVGV4dChzeW5jU3RhdGU/Lm1lc3NhZ2UpKTtcclxuICB9LCBbZmlsZUlkXSk7XHJcblxyXG4gIGNvbnN0IHBlbmRpbmdGaXJzdExpbmsgPVxyXG4gICAgZGV0YWlsT3JpZ2luID09PSBcInNoZWV0LWNyZWF0ZVwiICYmICEhc2FmZVRleHQodGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCB8fCBjb250ZXh0U2hlZXRJZCkgJiYgIXNhZmVUZXh0KGhlYWRlcj8uaG9qYUdhc3Rvc0lkRGlzcGxheSk7XHJcbiAgY29uc3Qgc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSA9IHBlbmRpbmdGaXJzdExpbmtcclxuICAgID8gaW5kVChcIkV4cGVuc2VUaWNrZXRzX1NoZWV0U3luY19QZW5kaW5nU2F2ZVJlcXVpcmVkXCIsIFwiU2F2ZSB0aGUgdGlja2V0IGJlZm9yZSBsZWF2aW5nIHRoaXMgZmxvdy5cIilcclxuICAgIDogc2hlZXRTeW5jQmxvY2tlZE1lc3NhZ2UgfHxcclxuICAgICAgaW5kVChcclxuICAgICAgICBcIkV4cGVuc2VUaWNrZXRzX1NoZWV0U3luY19SZXRyeVJlcXVpcmVkXCIsXHJcbiAgICAgICAgXCJUaWNrZXQgZGF0YSBjaGFuZ2VkLCBidXQgd2UgY291bGQgbm90IHN5bmMgdGhlIGV4cGVuc2UgbGluZS4gU2F2ZSBhZ2FpbiBiZWZvcmUgbGVhdmluZy5cIlxyXG4gICAgICApO1xyXG5cbiAgY29uc3QgeyBtYXJrUmVzZXRGaWx0ZXJzUmV0dXJuLCBjbGVhckNhY2hlZFN0YXRlIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsTmF2aWdhdGlvblN0YXRlKHtcbiAgICBmaWxlSWQsXHJcbiAgICBkZXRhaWxPcmlnaW4sXHJcbiAgICBoZWFkZXJUcmFuc0RhdGU6IGhlYWRlcj8udHJhbnNEYXRlLFxyXG4gICAgY29udGV4dExpbmVSZWNJZCxcclxuICAgIHRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgfSk7XHJcbiAgY29uc3QgY2FuRWRpdExpbmtlZFRpY2tldCA9ICFsaW5rZWRFeHBlbnNlU2hlZXRJZCB8fCAoIWxpbmtTaGVldENoZWNrQnVzeSAmJiAhbGlua1NoZWV0TG9ja2VkKTtcclxuICBjb25zdCBhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0ID0gaXNGcm9tRXhwZW5zZVNoZWV0Q3JlYXRlIHx8ICghIWxpbmtlZEV4cGVuc2VTaGVldElkICYmIGNhbkVkaXRMaW5rZWRUaWNrZXQpO1xyXG4gIGNvbnN0IHRpY2tldExvY2FsQ3VycmVuY3lDb2RlID0gdXNlTWVtbyhcclxuICAgICgpID0+IG5vcm1hbGl6ZUV4cGVuc2VMaW5lQ3VycmVuY3lDb2RlKGxpbmtlZFNoZWV0TGluZS5sb2NhbEN1cnJlbmN5Q29kZSB8fCBjb250ZXh0RGVmYXVsdEN1cnJlbmN5Q29kZSksXHJcbiAgICBbY29udGV4dERlZmF1bHRDdXJyZW5jeUNvZGUsIGxpbmtlZFNoZWV0TGluZS5sb2NhbEN1cnJlbmN5Q29kZV1cclxuICApO1xyXG4gIGNvbnN0IHtcclxuICAgIGJ1c3ksXHJcbiAgICBzdGF0dXMsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtb2RhbEVycm9yLFxyXG4gICAgbGluZVBhZ2UsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZGVzY3JpcHRpb25JbnZhbGlkLFxyXG4gICAgZGVzY3JpcHRpb25JbnB1dFJlZixcclxuICAgIGRyYWZ0R2FzdG9UeXBlLFxyXG4gICAgZ2FzdG9UeXBlSW52YWxpZCxcclxuICAgIGdhc3RvVHlwZUlucHV0UmVmLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBjdXJyZW5jeUNvZGVJbnZhbGlkLFxyXG4gICAgY3VycmVuY3lJbnB1dFJlZixcclxuICAgIGRyYWZ0VG90YWxBbW91bnQsXHJcbiAgICB0b3RhbEFtb3VudEludmFsaWQsXHJcbiAgICB0b3RhbEFtb3VudElucHV0UmVmLFxyXG4gICAgZHJhZnRBbW91bnRNU1QsXHJcbiAgICBhbW91bnRNU1RJbnZhbGlkLFxyXG4gICAgYW1vdW50TVNUSW5wdXRSZWYsXHJcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIGV4Y2hhbmdlUmF0ZUludmFsaWQsXHJcbiAgICBleGNoYW5nZVJhdGVJbnB1dFJlZixcclxuICAgIGxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICBkcmFmdFRpY2tldFRpbWUsXHJcbiAgICBkcmFmdENvbWVudGFyaW8sXHJcbiAgICBkcmFmdFVybEZpbGUsXHJcbiAgICBkcmFmdEZpbGVOYW1lLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRMaW5lUGFnZSxcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBzZXREcmFmdEdhc3RvVHlwZSxcclxuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgc2V0RHJhZnRUb3RhbEFtb3VudCxcclxuICAgIHNldERyYWZ0QW1vdW50TVNULFxyXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBjb21taXREcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yKHtcbiAgICBoZWFkZXIsXG4gICAgbGlua2VkRXhwZW5zZUxpbmU6IGxpbmtlZFNoZWV0TGluZS5saW5lLFxuICAgIGxvY2FsQ3VycmVuY3lDb2RlOiB0aWNrZXRMb2NhbEN1cnJlbmN5Q29kZSxcbiAgICBsaW5lQ291bnQ6IGxpbmVzLmxlbmd0aCxcclxuICAgIHBhZ2VTaXplOiBMSU5FU19QQUdFX1NJWkUsXHJcbiAgICBjYW5FZGl0VGlja2V0OiBjYW5FZGl0VGlja2V0ICYmIGNhbkVkaXRMaW5rZWRUaWNrZXQsXG4gICAgaXNMb2FkaW5nLFxuICAgIGFsbG93QXNzaWduZWREcmFmdEVkaXQsXG4gICAgaXNTaGVldExpbmtSZWFkT25seTogaXNGcm9tU2hlZXRMaW5rICYmICFjYW5FZGl0RnJvbVNoZWV0TGlua0ZhaWx1cmUsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuICBjb25zdCBoYW5kbGVUaWNrZXRDdXJyZW5jeUNvZGVDaGFuZ2UgPSB1c2VDYWxsYmFjayhcclxuICAgICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5leHRDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVFeHBlbnNlTGluZUN1cnJlbmN5Q29kZSh2YWx1ZSk7XHJcbiAgICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlKG5leHRDdXJyZW5jeUNvZGUpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZShcIlwiKTtcclxuXHJcbiAgICAgIGlmICghbmV4dEN1cnJlbmN5Q29kZSB8fCAhbG9jYWxDdXJyZW5jeUNvZGUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChuZXh0Q3VycmVuY3lDb2RlID09PSBub3JtYWxpemVFeHBlbnNlTGluZUN1cnJlbmN5Q29kZShsb2NhbEN1cnJlbmN5Q29kZSkpIHtcclxuICAgICAgICBleGNoYW5nZVJhdGVSZXF1ZXN0SWRSZWYuY3VycmVudCArPSAxO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVxdWVzdElkID0gZXhjaGFuZ2VSYXRlUmVxdWVzdElkUmVmLmN1cnJlbnQgKyAxO1xyXG4gICAgICBleGNoYW5nZVJhdGVSZXF1ZXN0SWRSZWYuY3VycmVudCA9IHJlcXVlc3RJZDtcclxuXHJcbiAgICAgIHZvaWQgKGFzeW5jICgpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3Qgb2ZmaWNpYWxFeGNoYW5nZVJhdGUgPSBhd2FpdCBmZXRjaEV4cGVuc2VPZmZpY2lhbEV4Y2hhbmdlUmF0ZSh7XHJcbiAgICAgICAgICAgIGxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgICBleHBlbnNlQ3VycmVuY3lDb2RlOiBuZXh0Q3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgICBkYXRlOiBkcmFmdFRyYW5zRGF0ZSB8fCBoZWFkZXI/LnRpY2tldERhdGUgfHwgaGVhZGVyPy50cmFuc0RhdGUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmIChyZXF1ZXN0SWQgIT09IGV4Y2hhbmdlUmF0ZVJlcXVlc3RJZFJlZi5jdXJyZW50IHx8ICFvZmZpY2lhbEV4Y2hhbmdlUmF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29tbWl0RHJhZnRFeGNoYW5nZVJhdGUoZm9ybWF0RXhwZW5zZUV4Y2hhbmdlUmF0ZUlucHV0VmFsdWUob2ZmaWNpYWxFeGNoYW5nZVJhdGUuZXhjaGFuZ2VSYXRlKSwgbmV4dEN1cnJlbmN5Q29kZSk7XHJcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZShcclxuICAgICAgICAgICAgYnVpbGRFeHBlbnNlRXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgIHJhd1JhdGU6IG9mZmljaWFsRXhjaGFuZ2VSYXRlLnJhd1JhdGUsXHJcbiAgICAgICAgICAgICAgZGF0ZTogb2ZmaWNpYWxFeGNoYW5nZVJhdGUuZGF0ZSxcclxuICAgICAgICAgICAgICBzb3VyY2U6IG9mZmljaWFsRXhjaGFuZ2VSYXRlLnNvdXJjZSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGlmIChyZXF1ZXN0SWQgIT09IGV4Y2hhbmdlUmF0ZVJlcXVlc3RJZFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBtZXNzYWdlID1cclxuICAgICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBzYWZlVGV4dChlcnJvci5tZXNzYWdlKVxyXG4gICAgICAgICAgICAgID8gc2FmZVRleHQoZXJyb3IubWVzc2FnZSlcclxuICAgICAgICAgICAgICA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIik7XHJcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZShtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pKCk7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBjb21taXREcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICAgIGhlYWRlcj8udGlja2V0RGF0ZSxcclxuICAgICAgaGVhZGVyPy50cmFuc0RhdGUsXHJcbiAgICAgIGxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gICAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIF1cclxuICApO1xyXG4gIGNvbnN0IGhhbmRsZVRpY2tldEV4Y2hhbmdlUmF0ZUNoYW5nZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlKHZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBbc2V0RHJhZnRFeGNoYW5nZVJhdGVdXHJcbiAgKTtcclxuICBjb25zdCBoYW5kbGVUaWNrZXRFeGNoYW5nZVJhdGVDb21taXQgPSB1c2VDYWxsYmFjayhcclxuICAgICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKFwiXCIpO1xyXG4gICAgICBjb21taXREcmFmdEV4Y2hhbmdlUmF0ZSh2YWx1ZSk7XHJcbiAgICB9LFxyXG4gICAgW2NvbW1pdERyYWZ0RXhjaGFuZ2VSYXRlXVxyXG4gICk7XHJcbiAgY29uc3QgaGFuZGxlVGlja2V0QW1vdW50TVNUQ2hhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RHJhZnRBbW91bnRNU1QodmFsdWUpO1xyXG4gICAgfSxcclxuICAgIFtzZXREcmFmdEFtb3VudE1TVF1cclxuICApO1xyXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXRJbkNvbnRleHQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAobGlua1NoZWV0Q2hlY2tCdXN5KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGlua2VkRXhwZW5zZVNoZWV0SWQgJiYgbGlua1NoZWV0TG9ja2VkKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPVxyXG4gICAgICAgIHNhZmVUZXh0KGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlKSB8fFxyXG4gICAgICAgIHJlc29sdmVMaW5rZWRUaWNrZXRCbG9ja2VkTWVzc2FnZShmYWxzZSk7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKFwiXCIpO1xyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCgpO1xyXG4gIH0sIFtcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZSxcclxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcclxuICAgIGxpbmtTaGVldExvY2tlZCxcclxuICAgIGxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFN0YXR1cyxcclxuICBdKTtcclxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0SW5Db250ZXh0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0RXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UoXCJcIik7XHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0KCk7XHJcbiAgICBsaW5rZWRTaGVldExpbmUucmVzZXREcmFmdFByb2plY3RJZCgpO1xyXG4gICAgbGlua2VkU2hlZXRMaW5lLnJlc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlKCk7XHJcbiAgfSwgW2hhbmRsZUNhbmNlbEVkaXQsIGxpbmtlZFNoZWV0TGluZS5yZXNldERyYWZ0UHJvamVjdElkLCBsaW5rZWRTaGVldExpbmUucmVzZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2VdKTtcclxuICBjb25zdCB7IHBhZ2luYXRpb25MYWJlbHMsIHByZXZpZXdBbHRUZXh0LCBzdGF0dXNMYWJlbCwgZ2FzdG9UeXBlTGFiZWwsIHRvdGFsQW1vdW50VGV4dCwgdHJhbnNEYXRlVGV4dCwgdGlja2V0VGltZVRleHQgfSA9XHJcbiAgICB1c2VFeHBlbnNlVGlja2V0RGV0YWlsRGlzcGxheSh7XHJcbiAgICAgIGhlYWRlcixcclxuICAgICAgZHJhZnRHYXN0b1R5cGUsXHJcbiAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgICBkcmFmdFRvdGFsQW1vdW50LFxyXG4gICAgICBkcmFmdFRyYW5zRGF0ZSxcclxuICAgICAgZHJhZnRUaWNrZXRUaW1lLFxyXG4gICAgICBkcmFmdEZpbGVOYW1lLFxyXG4gICAgICBpc0VkaXRpbmcsXHJcbiAgICAgIGdhc3RvVHlwZUxhYmVsTWFwLFxyXG4gICAgfSk7XHJcbiAgY29uc3Qge1xyXG4gICAgc2hvd1N0aWNreVByZXZpZXcsXHJcbiAgICBwcmV2aWV3T3BlbixcclxuICAgIHByZXZpZXdCdXN5LFxyXG4gICAgcHJldmlld0Vycm9yLFxyXG4gICAgcHJldmlld0ltYWdlVXJsLFxyXG4gICAgcHJldmlld1NjYWxlLFxyXG4gICAgcHJldmlld1RyYW5zbGF0ZSxcclxuICAgIHByZXZpZXdTdXJmYWNlUmVmLFxyXG4gICAgb3BlblByZXZpZXcsXHJcbiAgICBjbG9zZVByZXZpZXcsXHJcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24sXHJcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXHJcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxuICB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdQYW5lbCh7XHJcbiAgICBmaWxlSWQsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBkcmFmdFVybEZpbGUsXHJcbiAgICBoZWFkZXJVcmxGaWxlOiBoZWFkZXI/LnVybEZpbGUsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHZpc2libGVMaW5lcyA9IHVzZU1lbW8oKCkgPT4gcGFnZWRTbGljZShsaW5lcywgbGluZVBhZ2UsIExJTkVTX1BBR0VfU0laRSksIFtsaW5lUGFnZSwgbGluZXNdKTtcclxuICBjb25zdCB0b3RhbExpbmVQYWdlcyA9IE1hdGguY2VpbCgobGluZXMubGVuZ3RoIHx8IDApIC8gTElORVNfUEFHRV9TSVpFKTtcclxuXHJcbiAgdXNlRXhwZW5zZVRpY2tldERldGFpbEF1dG9FZGl0KHtcbiAgICBhdXRvRWRpdE1vZGUsXG4gICAgY2FuQXV0b0VkaXRJbkNvbnRleHQ6ICFpc0Zyb21TaGVldExpbmsgfHwgY2FuRWRpdEZyb21TaGVldExpbmtGYWlsdXJlLFxuICAgIGlzTG9hZGluZyxcbiAgICBoZWFkZXIsXG4gICAgaGFuZGxlRW5hYmxlRWRpdDogaGFuZGxlRW5hYmxlRWRpdEluQ29udGV4dCxcbiAgICBjYW5BdHRlbXB0QXV0b0VkaXQ6ICFsaW5rU2hlZXRDaGVja0J1c3ksXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHsgaGFuZGxlVXBkYXRlLCBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQsIGhhbmRsZURlbGV0ZSB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9ucyh7XHJcbiAgICBidXN5LFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgY2FuRWRpdFRpY2tldDogY2FuRWRpdFRpY2tldCAmJiBjYW5FZGl0TGlua2VkVGlja2V0LFxyXG4gICAgY2FuRGVsZXRlVGlja2V0OiBjYW5EZWxldGVUaWNrZXQgJiYgY2FuRWRpdExpbmtlZFRpY2tldCxcclxuICAgIGZpbGVJZCxcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdEdhc3RvVHlwZSxcclxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgZHJhZnRUb3RhbEFtb3VudCxcclxuICAgIGRyYWZ0QW1vdW50TVNULFxyXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBsb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgIGRyYWZ0VHJhbnNEYXRlLFxyXG4gICAgZHJhZnRUaWNrZXRUaW1lLFxyXG4gICAgZHJhZnRDb21lbnRhcmlvLFxyXG4gICAgZHJhZnRVcmxGaWxlLFxyXG4gICAgZHJhZnRGaWxlTmFtZSxcclxuICAgIGxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gICAgbGlua2VkRXhwZW5zZUxpbmVSZWNJZDogaXNGcm9tRXhwZW5zZUxpbmUgPyBjb250ZXh0TGluZVJlY0lkIDogXCJcIixcclxuICAgIGxpbmtlZEV4cGVuc2VMaW5lUHJvamVjdElkOiBsaW5rZWRTaGVldExpbmUuZHJhZnRQcm9qZWN0SWQsXHJcbiAgICBsaW5rZWRFeHBlbnNlTGluZVByb2plY3RJZENoYW5nZWQ6IGlzRnJvbUV4cGVuc2VMaW5lICYmIGxpbmtlZFNoZWV0TGluZS5wcm9qZWN0SWRDaGFuZ2VkLFxyXG4gICAgbGlua2VkRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlOiBsaW5rZWRTaGVldExpbmUuZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgbGlua2VkRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlZDogaXNGcm9tRXhwZW5zZUxpbmUgJiYgbGlua2VkU2hlZXRMaW5lLnJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2VkLFxyXG4gICAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0OiBpc0Zyb21FeHBlbnNlTGluZSAmJiBsaW5rZWRFeHBlbnNlU2hlZXRJZCAmJiBjb250ZXh0TGluZVJlY0lkXHJcbiAgICAgID8ge1xyXG4gICAgICAgICAgc2hlZXRJZDogbGlua2VkRXhwZW5zZVNoZWV0SWQsXHJcbiAgICAgICAgICBsaW5lUmVjSWQ6IGNvbnRleHRMaW5lUmVjSWQsXHJcbiAgICAgICAgfVxyXG4gICAgICA6IG51bGwsXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICBvbkxpbmtlZFNoZWV0U3luY0ZhaWx1cmU6IChtZXNzYWdlKSA9PiB7XHJcbiAgICAgIHNldFNoZWV0U3luY0Jsb2NrZWQodHJ1ZSk7XHJcbiAgICAgIHNldFNoZWV0U3luY0Jsb2NrZWRNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICB9LFxyXG4gICAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgIHNldFNoZWV0U3luY0Jsb2NrZWQoZmFsc2UpO1xyXG4gICAgICBzZXRTaGVldFN5bmNCbG9ja2VkTWVzc2FnZShcIlwiKTtcclxuICAgICAgbGlua2VkU2hlZXRMaW5lLmFjY2VwdERyYWZ0UHJvamVjdElkKCk7XHJcbiAgICAgIGxpbmtlZFNoZWV0TGluZS5hY2NlcHREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UoKTtcclxuICAgIH0sXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgbW9kYWxMb2FkaW5nVGV4dCwgbW9kYWxDYW5jZWxUZXh0LCBtb2RhbENvbmZpcm1UZXh0LCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gfSA9XHJcbiAgICB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQ29uZmlybVN0YXRlKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgbW9kYWxFcnJvcixcclxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgfSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXNoZWV0U3luY0Jsb2NrZWQgfHwgYnVzeSkgcmV0dXJuO1xyXG4gICAgaWYgKCFzaGVldFdvcmtmbG93QmxvY2tNZXNzYWdlKSByZXR1cm47XHJcbiAgICBpZiAoc3RhdHVzID09PSBzaGVldFdvcmtmbG93QmxvY2tNZXNzYWdlKSByZXR1cm47XHJcbiAgICBzZXRTdGF0dXMoc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSk7XHJcbiAgfSwgW2J1c3ksIHNldFN0YXR1cywgc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSwgc2hlZXRTeW5jQmxvY2tlZCwgc3RhdHVzXSk7XHJcblxyXG4gIGNvbnN0IGlzQXNzaWduZWRUaWNrZXQgPSBoZWFkZXI/LnN0YXR1cyA9PT0gMTtcbiAgY29uc3QgaXNDb250ZXh0TG9ja2VkID0gKGlzQXNzaWduZWRUaWNrZXQgJiYgIWFsbG93QXNzaWduZWREcmFmdEVkaXQpIHx8ICghIWxpbmtlZEV4cGVuc2VTaGVldElkICYmIGxpbmtTaGVldExvY2tlZCk7XG4gIGNvbnN0IGNhbkVkaXRUaWNrZXRJbkNvbnRleHQgPSBjYW5FZGl0VGlja2V0ICYmIGNhbkVkaXRMaW5rZWRUaWNrZXQgJiYgKCFpc0Zyb21TaGVldExpbmsgfHwgY2FuRWRpdEZyb21TaGVldExpbmtGYWlsdXJlKTtcbiAgY29uc3QgY2FuQ3JlYXRlVGlja2V0TGluZUluQ29udGV4dCA9IGNhbkVkaXRUaWNrZXRJbkNvbnRleHQgJiYgIWlzRnJvbVNoZWV0TGluayAmJiAhaXNDb250ZXh0TG9ja2VkICYmICFzaGVldFN5bmNCbG9ja2VkO1xuICBjb25zdCBjYW5EZWxldGVUaWNrZXRJbkNvbnRleHQgPSBjYW5EZWxldGVUaWNrZXQgJiYgY2FuRWRpdExpbmtlZFRpY2tldCAmJiAhaXNGcm9tU2hlZXRMaW5rO1xyXG4gIGNvbnN0IGNhbkRlbGV0ZVVubGlua2VkVGlja2V0QWZ0ZXJTeW5jRXJyb3IgPVxuICAgIHBlbmRpbmdGaXJzdExpbmsgJiZcbiAgICBzaGVldFN5bmNCbG9ja2VkICYmXG4gICAgY2FuRGVsZXRlVGlja2V0SW5Db250ZXh0ICYmXG4gICAgISFzYWZlVGV4dChmaWxlSWQpICYmXG4gICAgISFoZWFkZXIgJiZcbiAgICAhc2FmZVRleHQoaGVhZGVyLmhvamFHYXN0b3NJZERpc3BsYXkpO1xuICAvLyBIYXJkIGJsb2NraW5nIGlzIGxpbWl0ZWQgdG8gZWRpdCBvciBuZXdseSBjcmVhdGVkIHJlY292ZXJ5IGZsb3dzOyByZWFkLW9ubHkgc3luYyBlcnJvcnMgbXVzdCBzdGF5IG5hdmlnYWJsZS5cbiAgY29uc3Qgc2hvdWxkSGFyZEJsb2NrV29ya2Zsb3dFeGl0ID0gcGVuZGluZ0ZpcnN0TGluayB8fCAoc2hlZXRTeW5jQmxvY2tlZCAmJiBpc0VkaXRpbmcpO1xuICBjb25zdCBoYXNOYXZpZ2F0aW9uR3VhcmQgPSBidXN5IHx8IGlzRWRpdGluZyB8fCBzaG91bGRIYXJkQmxvY2tXb3JrZmxvd0V4aXQ7XG4gIGNvbnN0IG5hdmlnYXRpb25HdWFyZE1lc3NhZ2UgPSBzaG91bGRIYXJkQmxvY2tXb3JrZmxvd0V4aXQgPyBzaGVldFdvcmtmbG93QmxvY2tNZXNzYWdlIDogdW5kZWZpbmVkO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFoYXNOYXZpZ2F0aW9uR3VhcmQpIHtcbiAgICAgIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoe1xuICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgbWVzc2FnZTogbmF2aWdhdGlvbkd1YXJkTWVzc2FnZSxcbiAgICAgIGJsb2NrOiBzaG91bGRIYXJkQmxvY2tXb3JrZmxvd0V4aXQsXG4gICAgfSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCgpO1xuICAgIH07XG4gIH0sIFtoYXNOYXZpZ2F0aW9uR3VhcmQsIG5hdmlnYXRpb25HdWFyZE1lc3NhZ2UsIHNob3VsZEhhcmRCbG9ja1dvcmtmbG93RXhpdF0pO1xuXHJcbiAgdXNlRXhwZW5zZVRpY2tldFRvcGJhckJhY2tMb2NrKHtcbiAgICBsb2NrZWQ6IHNob3VsZEhhcmRCbG9ja1dvcmtmbG93RXhpdCxcbiAgICBtZXNzYWdlOiBzaGVldFdvcmtmbG93QmxvY2tNZXNzYWdlLFxuICB9KTtcbiAgY29uc3QgdGlja2V0VG9wYmFyQWN0aW9uTW9kZTogXCJkZWZhdWx0XCIgfCBcInNhdmVfb25seVwiIHwgXCJzYXZlX2RlbGV0ZVwiIHwgXCJ2aWV3X29ubHlcIiA9XHJcbiAgICBwZW5kaW5nRmlyc3RMaW5rICYmIGlzRWRpdGluZ1xyXG4gICAgICA/IGNhbkRlbGV0ZVVubGlua2VkVGlja2V0QWZ0ZXJTeW5jRXJyb3JcclxuICAgICAgICA/IFwic2F2ZV9kZWxldGVcIlxyXG4gICAgICAgIDogXCJzYXZlX29ubHlcIlxyXG4gICAgICA6ICFjYW5FZGl0VGlja2V0SW5Db250ZXh0ICYmICFjYW5EZWxldGVUaWNrZXRJbkNvbnRleHRcclxuICAgICAgICA/IFwidmlld19vbmx5XCJcclxuICAgICAgICA6IFwiZGVmYXVsdFwiO1xyXG5cclxuICB1c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucyh7XHJcbiAgICBidXN5LFxyXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNMb2NrZWQ6IGlzQ29udGV4dExvY2tlZCxcclxuICAgIGlzRGVsZXRlTG9ja2VkOiBjYW5EZWxldGVVbmxpbmtlZFRpY2tldEFmdGVyU3luY0Vycm9yID8gZmFsc2UgOiB1bmRlZmluZWQsXHJcbiAgICBhY3Rpb25Nb2RlOiB0aWNrZXRUb3BiYXJBY3Rpb25Nb2RlLFxyXG4gICAgcGVybWlzc2lvbnNSZWFkeTogbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gICAgY2FuRWRpdFRpY2tldDogY2FuRWRpdFRpY2tldEluQ29udGV4dCxcclxuICAgIGNhbkRlbGV0ZVRpY2tldDogY2FuRGVsZXRlVGlja2V0SW5Db250ZXh0LFxyXG4gICAgZmlsZUlkLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQ6IGhhbmRsZUVuYWJsZUVkaXRJbkNvbnRleHQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0OiBoYW5kbGVDYW5jZWxFZGl0SW5Db250ZXh0LFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgb25TYXZlU3VjY2VzczogKCkgPT4ge1xyXG4gICAgICBpZiAoKGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSB8fCBpc0Zyb21FeHBlbnNlTGluZSkgJiYgbGlua2VkRXhwZW5zZVNoZWV0SWQpIHtcclxuICAgICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XHJcbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwobGlua2VkRXhwZW5zZVNoZWV0SWQpLCB7XHJcbiAgICAgICAgICBieXBhc3NHdWFyZE9uY2U6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2b2lkIHJlbG9hZERldGFpbCgpO1xyXG4gICAgfSxcclxuICAgIG9uRGVsZXRlU3VjY2VzczogKCkgPT4ge1xyXG4gICAgICBpZiAodGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCkge1xyXG4gICAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcclxuICAgICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChidWlsZEV4cGVuc2VTaGVldERldGFpbFVybCh0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0SWQpLCB7XHJcbiAgICAgICAgICBieXBhc3NHdWFyZE9uY2U6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBtYXJrUmVzZXRGaWx0ZXJzUmV0dXJuKCk7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9UaWNrZXRzXCIsIHtcclxuICAgICAgICBieXBhc3NHdWFyZE9uY2U6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB7IG9wZW5DcmVhdGVMaW5lRGV0YWlsLCBvcGVuTGluZURldGFpbCwgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsIG9wZW5GaWxlLCBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0IH0gPVxyXG4gICAgdXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9ucyh7XHJcbiAgICBidXN5LFxyXG4gICAgZmlsZUlkLFxuICAgIGNvbnRleHRTaGVldElkOiBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcbiAgICBpc0Zyb21TaGVldExpbmssXG4gICAgaGVhZGVyRXhwZW5zZVNoZWV0SWQ6IHNhZmVUZXh0KGhlYWRlcj8uaG9qYUdhc3Rvc0lkRGlzcGxheSksXG4gICAgaXNFZGl0aW5nLFxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcbiAgICBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQsXG4gICAgYnlwYXNzV29ya2Zsb3dHdWFyZDogc2hvdWxkSGFyZEJsb2NrV29ya2Zsb3dFeGl0LFxuICAgIGxpbmVDb250YWluZXJSZWYsXG4gICAgb3BlblByZXZpZXcsXG4gICAgdGlja2V0UmV0dXJuQ29udGV4dCxcbiAgfSk7XG5cclxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcclxuICAgIGNvbnRhaW5lclJlZjogbGluZUNvbnRhaW5lclJlZixcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGl0ZW1zOiB2aXNpYmxlTGluZXMsXHJcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZGV0YWlsVmlldyA9IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbFBhZ2VWaWV3TW9kZWwoe1xyXG4gICAgbW9kYWxBcmdzOiB7XHJcbiAgICAgIG1vZGFsLFxyXG4gICAgICBtb2RhbENvbmZpcm1UZXh0LFxyXG4gICAgICBtb2RhbENhbmNlbFRleHQsXHJcbiAgICAgIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG1vZGFsRXJyb3IsXHJcbiAgICAgIHN0YXR1cyxcclxuICAgICAgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtLFxyXG4gICAgICBjbG9zZUNvbmZpcm0sXHJcbiAgICB9LFxyXG4gICAgcHJldmlld0FyZ3M6IHtcclxuICAgICAgcHJldmlld09wZW4sXHJcbiAgICAgIHByZXZpZXdCdXN5LFxyXG4gICAgICBwcmV2aWV3RXJyb3IsXHJcbiAgICAgIHByZXZpZXdJbWFnZVVybCxcclxuICAgICAgcHJldmlld0FsdFRleHQsXHJcbiAgICAgIHByZXZpZXdTY2FsZSxcclxuICAgICAgcHJldmlld1RyYW5zbGF0ZSxcclxuICAgICAgcHJldmlld1N1cmZhY2VSZWYsXHJcbiAgICAgIGNsb3NlUHJldmlldyxcclxuICAgICAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gICAgICBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXHJcbiAgICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kLFxyXG4gICAgfSxcclxuICAgIGNvbnRlbnRBcmdzOiB7XHJcbiAgICAgIGlzTG9hZGluZyxcclxuICAgICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgICBoZWFkZXIsXHJcbiAgICAgIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gICAgICBwcmV2aWV3QnVzeSxcclxuICAgICAgcHJldmlld0Vycm9yLFxyXG4gICAgICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgICAgIHByZXZpZXdBbHRUZXh0LFxyXG4gICAgICBvcGVuRmlsZSxcclxuICAgICAgc3RhdHVzTGFiZWwsXHJcbiAgICAgIGdhc3RvVHlwZUxhYmVsLFxyXG4gICAgICB0b3RhbEFtb3VudFRleHQsXHJcbiAgICAgIHRyYW5zRGF0ZVRleHQsXHJcbiAgICAgIHRpY2tldFRpbWVUZXh0LFxyXG4gICAgICBpc0VkaXRpbmcsXHJcbiAgICAgIGdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICAgIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICAgICAgZGVzY3JpcHRpb25JbnB1dFJlZixcclxuICAgICAgZHJhZnRHYXN0b1R5cGUsXHJcbiAgICAgIGdhc3RvVHlwZUludmFsaWQsXHJcbiAgICAgIGdhc3RvVHlwZUlucHV0UmVmLFxyXG4gICAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgICAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICAgICAgY3VycmVuY3lJbnB1dFJlZixcclxuICAgICAgZHJhZnRUb3RhbEFtb3VudCxcclxuICAgICAgdG90YWxBbW91bnRJbnZhbGlkLFxyXG4gICAgICB0b3RhbEFtb3VudElucHV0UmVmLFxyXG4gICAgICBkcmFmdEFtb3VudE1TVCxcclxuICAgICAgYW1vdW50TVNUSW52YWxpZCxcclxuICAgICAgYW1vdW50TVNUSW5wdXRSZWYsXHJcbiAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgICBleGNoYW5nZVJhdGVJbnZhbGlkLFxyXG4gICAgICBleGNoYW5nZVJhdGVJbnB1dFJlZixcclxuICAgICAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UsXHJcbiAgICAgIGxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gICAgICBkcmFmdFRyYW5zRGF0ZSxcclxuICAgICAgZHJhZnRUaWNrZXRUaW1lLFxyXG4gICAgICBkcmFmdFVybEZpbGUsXHJcbiAgICAgIGRyYWZ0RmlsZU5hbWUsXHJcbiAgICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICAgIHNldERyYWZ0R2FzdG9UeXBlLFxyXG4gICAgICBzZXREcmFmdEN1cnJlbmN5Q29kZTogaGFuZGxlVGlja2V0Q3VycmVuY3lDb2RlQ2hhbmdlLFxyXG4gICAgICBzZXREcmFmdFRvdGFsQW1vdW50LFxyXG4gICAgICBzZXREcmFmdEFtb3VudE1TVDogaGFuZGxlVGlja2V0QW1vdW50TVNUQ2hhbmdlLFxyXG4gICAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZTogaGFuZGxlVGlja2V0RXhjaGFuZ2VSYXRlQ2hhbmdlLFxyXG4gICAgICBjb21taXREcmFmdEV4Y2hhbmdlUmF0ZTogaGFuZGxlVGlja2V0RXhjaGFuZ2VSYXRlQ29tbWl0LFxyXG4gICAgICBpc0Zyb21TaGVldExpbmssXHJcbiAgICAgIGxpbmtlZExpbmU6IHtcclxuICAgICAgICB2aXNpYmxlOiBpc0Zyb21FeHBlbnNlTGluZSxcclxuICAgICAgICBwcm9qZWN0SWQ6IGxpbmtlZFNoZWV0TGluZS5kcmFmdFByb2plY3RJZCxcclxuICAgICAgICByZWltYnVyc2FibGVFeHBlbnNlOiBsaW5rZWRTaGVldExpbmUuZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgICAgIGlzTG9hZGluZzogbGlua2VkU2hlZXRMaW5lLmlzTG9hZGluZyxcclxuICAgICAgICBlcnJvck1lc3NhZ2U6IGxpbmtlZFNoZWV0TGluZS5lcnJvck1lc3NhZ2UsXHJcbiAgICAgICAgZGlzYWJsZWQ6IGJ1c3kgfHwgaXNDb250ZXh0TG9ja2VkIHx8IGxpbmtlZFNoZWV0TGluZS5pc0xvYWRpbmcsXHJcbiAgICAgICAgb25Qcm9qZWN0SWRDaGFuZ2U6IGxpbmtlZFNoZWV0TGluZS5zZXREcmFmdFByb2plY3RJZCxcclxuICAgICAgICBvblJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2U6IGxpbmtlZFNoZWV0TGluZS5zZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQsXHJcbiAgICAgIHZpc2libGVMaW5lcyxcclxuICAgICAgdG90YWxMaW5lUGFnZXMsXHJcbiAgICAgIGxpbmVQYWdlLFxyXG4gICAgICBzYWZlQ3VycmVuY3lDb2RlOiBpc0VkaXRpbmcgPyBkcmFmdEN1cnJlbmN5Q29kZSA6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcclxuICAgICAgcGFnaW5hdGlvbkxhYmVscyxcclxuICAgICAgbGluZUNvbnRhaW5lclJlZixcclxuICAgICAgc2V0TGluZVBhZ2UsXHJcbiAgICAgIG9wZW5MaW5lRGV0YWlsLFxyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLmRldGFpbFZpZXcsXHJcbiAgICBjYW5TaG93Q3JlYXRlTGluZUZhYjogY2FuQ3JlYXRlVGlja2V0TGluZUluQ29udGV4dCAmJiAhaXNMb2FkaW5nICYmICFlcnJvck1lc3NhZ2UgJiYgISFzYWZlVGV4dChmaWxlSWQpICYmICEhaGVhZGVyLFxyXG4gICAgaXNDcmVhdGVMaW5lRmFiRGlzYWJsZWQ6IGJ1c3kgfHwgIWhlYWRlcixcclxuICAgIG9wZW5DcmVhdGVMaW5lRGV0YWlsLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBFeHBlbnNlVGlja2V0RGV0YWlsUGFnZUNvbnRlbnQgPSAoKSA9PiB7XHJcbiAgY29uc3QgZGV0YWlsVmlldyA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQYWdlVmlld01vZGVsKCk7XHJcbiAgY29uc3QgZmFiTWVudUl0ZW1zID0gdXNlTWVtbzxGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW10+KFxyXG4gICAgKCkgPT4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IFwibmV3LXRpY2tldC1saW5lXCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9OZXdMaW5lXCIsIFwiTnVldmEgTGluZWFcIiksXHJcbiAgICAgICAgaWNvbjogPE5ld0xpbmVJY29uIC8+LFxyXG4gICAgICAgIG9uQ2xpY2s6ICgpID0+IHtcclxuICAgICAgICAgIHZvaWQgZGV0YWlsVmlldy5vcGVuQ3JlYXRlTGluZURldGFpbCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlzYWJsZWQ6IGRldGFpbFZpZXcuaXNDcmVhdGVMaW5lRmFiRGlzYWJsZWQsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgW2RldGFpbFZpZXddXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0RGV0YWlsVmlldyBtb2RhbD17ZGV0YWlsVmlldy5tb2RhbH0gcHJldmlldz17ZGV0YWlsVmlldy5wcmV2aWV3fSBjb250ZW50PXtkZXRhaWxWaWV3LmNvbnRlbnR9IC8+XHJcbiAgICAgIHtkZXRhaWxWaWV3LmNhblNob3dDcmVhdGVMaW5lRmFiID8gKFxyXG4gICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxyXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJhcGlkYXNcIil9XHJcbiAgICAgICAgICBzaXplPXs3Nn1cclxuICAgICAgICAgIHJpZ2h0PXsxNn1cclxuICAgICAgICAgIGJvdHRvbT17MjR9XHJcbiAgICAgICAgICBtZW51QXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJhcGlkYXNcIil9XHJcbiAgICAgICAgICBtZW51SXRlbXM9e2ZhYk1lbnVJdGVtc31cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvPlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2UgdGlja2V0IGRldGFpbC5cclxuY29uc3QgRXhwZW5zZVRpY2tldERldGFpbFBhZ2UgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cclxuICAgICAgPEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlQ29udGVudCAvPlxyXG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cclxuICApO1xyXG59O1xyXG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XHJcbiAgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGgoKTtcclxuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2UtdGlja2V0LWRldGFpbC1yb290XCIpO1xyXG4gIGlmICghcm9vdEVsKSByZXR1cm47XHJcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxFeHBlbnNlVGlja2V0RGV0YWlsUGFnZSAvPik7XHJcbn07XHJcblxyXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3QgfSBmcm9tIFwiLi4vLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzL2V4cGVuc2VHYXN0b1R5cGVDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24sIHBhcnNlRGVjaW1hbElucHV0IH0gZnJvbSBcIi4uLy4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgZGVsZXRlRXhwZW5zZVNoZWV0TGluZSxcclxuICBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXQsXHJcbiAgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0RmlsZSxcclxuICBmZXRjaEV4cGVuc2VTaGVldERldGFpbCxcclxuICB1cGRhdGVFeHBlbnNlU2hlZXRUaWNrZXQsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSwgdG9FeHBlbnNlQXBpRGRNbVl5eXkgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBzeW5jRXhwZW5zZUxpbmtlZFRpY2tldFNoZWV0TGluZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTGlua2VkVGlja2V0U2hlZXRTeW5jLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgaXNFeHBlbnNlTGluZUZvcmVpZ25DdXJyZW5jeSxcclxuICByZXNvbHZlRXhwZW5zZUxpbmVBbW91bnRNU1RGb3JDdXJyZW5jeVBheWxvYWQsXHJcbiAgcmVzb2x2ZUV4cGVuc2VMaW5lRXhjaGFuZ2VSYXRlRm9yQ3VycmVuY3ksXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VMaW5lQ3VycmVuY3kudHNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZUV4cGVuc2VTaGVldEVkaXRBY2Nlc3MgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVNoZWV0RWRpdEFjY2Vzcy50c1wiO1xyXG5pbXBvcnQgeyBjbGVhckV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZSwgc2F2ZUV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuXHJcbnR5cGUgRGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0ID0ge1xyXG4gIHNoZWV0SWQ6IHN0cmluZztcclxuICBsaW5lUmVjSWQ6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgY2FuRWRpdFRpY2tldDogYm9vbGVhbjtcclxuICBjYW5EZWxldGVUaWNrZXQ6IGJvb2xlYW47XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGRyYWZ0R2FzdG9UeXBlOiBzdHJpbmc7XHJcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBkcmFmdFRvdGFsQW1vdW50OiBzdHJpbmc7XHJcbiAgZHJhZnRBbW91bnRNU1Q6IHN0cmluZztcclxuICBkcmFmdEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xyXG4gIGxvY2FsQ3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRUcmFuc0RhdGU6IHN0cmluZztcclxuICBkcmFmdFRpY2tldFRpbWU6IHN0cmluZztcclxuICBkcmFmdENvbWVudGFyaW86IHN0cmluZztcclxuICBkcmFmdFVybEZpbGU6IHN0cmluZztcclxuICBkcmFmdEZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgbGlua2VkRXhwZW5zZVNoZWV0SWQ/OiBzdHJpbmc7XHJcbiAgbGlua2VkRXhwZW5zZUxpbmVSZWNJZD86IHN0cmluZztcclxuICBsaW5rZWRFeHBlbnNlTGluZVByb2plY3RJZD86IHN0cmluZztcclxuICBsaW5rZWRFeHBlbnNlTGluZVByb2plY3RJZENoYW5nZWQ/OiBib29sZWFuO1xyXG4gIGxpbmtlZEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZT86IG51bWJlciB8IG51bGw7XHJcbiAgbGlua2VkRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlZD86IGJvb2xlYW47XHJcbiAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0PzogRGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0IHwgbnVsbDtcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xyXG4gIGNhbk1hbmFnZU90aGVyVXNlcnM6IGJvb2xlYW47XHJcbiAgY3VycmVudEF4VXNlcklkOiBzdHJpbmc7XHJcbiAgY3VycmVudENybVVzZXJJZDogc3RyaW5nO1xyXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZDogc3RyaW5nO1xyXG4gIG9uTGlua2VkU2hlZXRTeW5jRmFpbHVyZT86IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzPzogKCkgPT4gdm9pZDtcclxuICBzZXRNb2RhbEVycm9yOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRJc0VkaXRpbmc6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxufTtcclxuXHJcbi8vIFRyaWVzIHRvIGluZmVyIGEgc2FmZSBleHRlbnNpb24gZm9yIHVwZGF0ZSBwYXlsb2FkIGZyb20gZmlsZSBuYW1lIG9yIFVSTC5cclxuY29uc3QgcmVzb2x2ZVRpY2tldEZpbGVFeHRlbnNpb24gPSAoZmlsZU5hbWU6IHN0cmluZywgdXJsRmlsZTogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcclxuICBjb25zdCBzb3VyY2UgPSBTdHJpbmcoZmlsZU5hbWUgfHwgXCJcIikudHJpbSgpIHx8IFN0cmluZyh1cmxGaWxlIHx8IFwiXCIpLnRyaW0oKTtcclxuICBjb25zdCBtYXRjaCA9IHNvdXJjZS5tYXRjaCgvXFwuKFthLXpBLVowLTldezEsMTB9KSg/OiR8Wz8jXSkvKTtcclxuICBpZiAoIW1hdGNoIHx8ICFtYXRjaFsxXSkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICByZXR1cm4gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbmNvbnN0IGlzTm90Rm91bmRFcnJvciA9IChlcnJvcjogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xyXG4gIHJldHVybiBlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDQ7XHJcbn07XHJcblxyXG5jb25zdCBpc01pc3NpbmdUaWNrZXRGaWxlTWVzc2FnZSA9IChtZXNzYWdlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyhtZXNzYWdlIHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImFyY2hpdm8gYXNvY2lhZG9cIikgfHxcclxuICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhcmNoaXZvIGFkanVudG9cIikgfHxcclxuICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhc3NvY2lhdGVkIGZpbGVcIikgfHxcclxuICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhdHRhY2hlZCBmaWxlXCIpXHJcbiAgKTtcclxufTtcclxuXHJcbi8vIEVuY2Fwc3VsYXRlcyB1cGRhdGUgYW5kIGRlbGV0ZSBtdXRhdGlvbnMgZm9yIHRpY2tldCBoZWFkZXIgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBpc0VkaXRpbmcsXHJcbiAgY2FuRWRpdFRpY2tldCxcclxuICBjYW5EZWxldGVUaWNrZXQsXHJcbiAgZmlsZUlkLFxyXG4gIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgZHJhZnRHYXN0b1R5cGUsXHJcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgZHJhZnRUb3RhbEFtb3VudCxcclxuICBkcmFmdEFtb3VudE1TVCxcclxuICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICBsb2NhbEN1cnJlbmN5Q29kZSxcclxuICBkcmFmdFRyYW5zRGF0ZSxcclxuICBkcmFmdFRpY2tldFRpbWUsXHJcbiAgZHJhZnRDb21lbnRhcmlvLFxyXG4gIGRyYWZ0VXJsRmlsZSxcclxuICBkcmFmdEZpbGVOYW1lLFxyXG4gIGxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gIGxpbmtlZEV4cGVuc2VMaW5lUmVjSWQsXHJcbiAgbGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWQsXHJcbiAgbGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWRDaGFuZ2VkID0gZmFsc2UsXHJcbiAgbGlua2VkRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gIGxpbmtlZEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZWQgPSBmYWxzZSxcclxuICBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQsXHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gIGN1cnJlbnRBeFVzZXJJZCxcclxuICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICBvbkxpbmtlZFNoZWV0U3luY0ZhaWx1cmUsXHJcbiAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgc2V0QnVzeSxcclxuICBzZXRTdGF0dXMsXHJcbiAgc2V0SXNFZGl0aW5nLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xyXG4gIGNvbnN0IHZhbGlkYXRlTGlua2VkU2hlZXRCZWZvcmVNdXRhdGlvbiA9IHVzZUNhbGxiYWNrKGFzeW5jICgpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+ID0+IHtcclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQobGlua2VkRXhwZW5zZVNoZWV0SWQpO1xyXG4gICAgaWYgKCFzYWZlU2hlZXRJZCkge1xyXG4gICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhY2Nlc3NSZXN1bHQgPSBhd2FpdCByZXNvbHZlRXhwZW5zZVNoZWV0RWRpdEFjY2Vzcyh7XHJcbiAgICAgIHNoZWV0SWQ6IHNhZmVTaGVldElkLFxyXG4gICAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIGlmICghYWNjZXNzUmVzdWx0LmlzTG9ja2VkKSB7XHJcbiAgICAgIHJldHVybiBzYWZlU2hlZXRJZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtZXNzYWdlID1cclxuICAgICAgc2FmZVRleHQoYWNjZXNzUmVzdWx0LmJsb2NrZWRNZXNzYWdlKSB8fFxyXG4gICAgICBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUmVhZE9ubHlCeVN0YXR1c1wiLCBcIk5vIHNlIHB1ZWRlIGVkaXRhciBlc3RhIGhvamEgZGUgZ2FzdG9zIGVuIGVsIGVzdGFkbyBhY3R1YWwuXCIpO1xyXG4gICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0sIFtcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIGxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFN0YXR1cyxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgcnVuSGVhZGVyVXBkYXRlID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKHtcbiAgICAgIHN5bmNTaGVldExpbmUsXG4gICAgICBjb250aW51ZU9uU2hlZXRTeW5jRmFpbHVyZSA9IGZhbHNlLFxuICAgIH06IHtcbiAgICAgIHN5bmNTaGVldExpbmU6IGJvb2xlYW47XG4gICAgICBjb250aW51ZU9uU2hlZXRTeW5jRmFpbHVyZT86IGJvb2xlYW47XG4gICAgfSk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICAgICAgaWYgKGJ1c3kgfHwgIWlzRWRpdGluZykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoIWNhbkVkaXRUaWNrZXQpIHtcclxuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBub3JtYWxpemVkRGVzY3JpcHRpb24gPSBTdHJpbmcoZHJhZnREZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XHJcbiAgICAgIGlmICghbm9ybWFsaXplZERlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fRGVzY3JpcHRpb25SZXF1aXJlZFwiLCBcIkRlc2NyaXB0aW9uIGlzIHJlcXVpcmVkLlwiKTtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW5jeSA9IFN0cmluZyhkcmFmdEN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxuICAgICAgaWYgKCFub3JtYWxpemVkQ3VycmVuY3kpIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9DdXJyZW5jeVJlcXVpcmVkXCIsIFwiQ3VycmVuY3kgaXMgcmVxdWlyZWQuXCIpO1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcGFyc2VkVG90YWxBbW91bnQgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFRvdGFsQW1vdW50KTtcclxuICAgICAgaWYgKHBhcnNlZFRvdGFsQW1vdW50ID09IG51bGwgfHwgcGFyc2VkVG90YWxBbW91bnQgPCAwKSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJUaWNrZXRzX1ZhbGlkYXRpb25fVG90YWxBbW91bnRSZXF1aXJlZFwiLCBcIlRvdGFsIGFtb3VudCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAwLlwiKTtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHBhcnNlZEFtb3VudE1TVCA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0QW1vdW50TVNUKTtcclxuICAgICAgY29uc3QgcGFyc2VkRXhjaGFuZ2VSYXRlID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRFeGNoYW5nZVJhdGUpO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkTG9jYWxDdXJyZW5jeSA9IHNhZmVUZXh0KGxvY2FsQ3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICBjb25zdCByZXF1aXJlc0ZvcmVpZ25DdXJyZW5jeVNldHRsZW1lbnQgPSBpc0V4cGVuc2VMaW5lRm9yZWlnbkN1cnJlbmN5KG5vcm1hbGl6ZWRDdXJyZW5jeSwgbm9ybWFsaXplZExvY2FsQ3VycmVuY3kpO1xyXG4gICAgICBjb25zdCBoYXNGb3JlaWduQ3VycmVuY3lTZXR0bGVtZW50ID1cclxuICAgICAgICAhcmVxdWlyZXNGb3JlaWduQ3VycmVuY3lTZXR0bGVtZW50IHx8XHJcbiAgICAgICAgKHBhcnNlZEV4Y2hhbmdlUmF0ZSAhPSBudWxsICYmIHBhcnNlZEV4Y2hhbmdlUmF0ZSA+IDApIHx8XHJcbiAgICAgICAgKHBhcnNlZEFtb3VudE1TVCAhPSBudWxsICYmIHBhcnNlZEFtb3VudE1TVCA+IDApO1xyXG4gICAgICBpZiAoIWhhc0ZvcmVpZ25DdXJyZW5jeVNldHRsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcclxuICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19MaW5lX1ZhbGlkYXRpb25fRm9yZWlnbkN1cnJlbmN5U2V0dGxlbWVudFwiLFxyXG4gICAgICAgICAgXCJGb3JlaWduIGN1cnJlbmN5IGxpbmVzIHJlcXVpcmUgYW4gZXhjaGFuZ2UgcmF0ZSBncmVhdGVyIHRoYW4gMCBvciBhIHJlaW1idXJzZW1lbnQgYW1vdW50LlwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHBhcnNlZEdhc3RvVHlwZSA9IHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUoZHJhZnRHYXN0b1R5cGUsIHsgYWxsb3dOb25lOiBmYWxzZSB9KTtcclxuICAgICAgaWYgKHBhcnNlZEdhc3RvVHlwZSA9PT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiVGlja2V0c19WYWxpZGF0aW9uX0NhdGVnb3J5UmVxdWlyZWRcIiwgXCJDYXRlZ29yeSBpcyByZXF1aXJlZC5cIik7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByYXdUcmFuc0RhdGUgPSBTdHJpbmcoZHJhZnRUcmFuc0RhdGUgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkVHJhbnNEYXRlID0gcmF3VHJhbnNEYXRlID8gdG9FeHBlbnNlQXBpRGRNbVl5eXkocmF3VHJhbnNEYXRlKSA6IFwiXCI7XHJcbiAgICAgIGlmIChyYXdUcmFuc0RhdGUgJiYgIW5vcm1hbGl6ZWRUcmFuc0RhdGUpIHtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gICAgICAgIHNldFN0YXR1cyhFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHZhbGlkYXRlZFNoZWV0SWQgPSBhd2FpdCB2YWxpZGF0ZUxpbmtlZFNoZWV0QmVmb3JlTXV0YXRpb24oKTtcclxuICAgICAgaWYgKHZhbGlkYXRlZFNoZWV0SWQgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHBheWxvYWRBbW91bnRNU1QgPSByZXNvbHZlRXhwZW5zZUxpbmVBbW91bnRNU1RGb3JDdXJyZW5jeVBheWxvYWQoXHJcbiAgICAgICAgcGFyc2VkVG90YWxBbW91bnQsXHJcbiAgICAgICAgcGFyc2VkQW1vdW50TVNULFxyXG4gICAgICAgIG5vcm1hbGl6ZWRDdXJyZW5jeSxcclxuICAgICAgICBub3JtYWxpemVkTG9jYWxDdXJyZW5jeVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBwYXlsb2FkRXhjaGFuZ2VSYXRlID0gcmVzb2x2ZUV4cGVuc2VMaW5lRXhjaGFuZ2VSYXRlRm9yQ3VycmVuY3koXHJcbiAgICAgICAgbm9ybWFsaXplZEN1cnJlbmN5LFxyXG4gICAgICAgIG5vcm1hbGl6ZWRMb2NhbEN1cnJlbmN5LFxyXG4gICAgICAgIHBhcnNlZEV4Y2hhbmdlUmF0ZVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0ID0ge1xyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub3JtYWxpemVkRGVzY3JpcHRpb24sXHJcbiAgICAgICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVkQ3VycmVuY3ksXHJcbiAgICAgICAgdG90YWxBbW91bnQ6IE51bWJlcihwYXJzZWRUb3RhbEFtb3VudCksXHJcbiAgICAgICAgYW1vdW50TVNUOiBwYXlsb2FkQW1vdW50TVNUID8/IHVuZGVmaW5lZCxcclxuICAgICAgICBleGNoUmF0ZTogcGF5bG9hZEV4Y2hhbmdlUmF0ZSA/PyB1bmRlZmluZWQsXHJcbiAgICAgICAgdHJhbnNEYXRlOiBub3JtYWxpemVkVHJhbnNEYXRlIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICB0aWNrZXREYXRlOiBub3JtYWxpemVkVHJhbnNEYXRlIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICB0aWNrZXRUaW1lOiBzYWZlVGV4dChkcmFmdFRpY2tldFRpbWUpIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICBjb21lbnRhcmlvOiBTdHJpbmcoZHJhZnRDb21lbnRhcmlvIHx8IFwiXCIpLnRyaW0oKSB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgdXJsRmlsZTogU3RyaW5nKGRyYWZ0VXJsRmlsZSB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIGZpbGVOYW1lOiBTdHJpbmcoZHJhZnRGaWxlTmFtZSB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIGZpbGVFeHRlbnNpb246IHJlc29sdmVUaWNrZXRGaWxlRXh0ZW5zaW9uKGRyYWZ0RmlsZU5hbWUsIGRyYWZ0VXJsRmlsZSksXHJcbiAgICAgICAgZ2FzdG9UeXBlOiBwYXJzZWRHYXN0b1R5cGUsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcclxuICAgICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcclxuICAgICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKSxcclxuICAgICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICAgIHNldEJ1c3ksXHJcbiAgICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1cGRhdGVFeHBlbnNlU2hlZXRUaWNrZXQoZmlsZUlkLCBwYXlsb2FkKTtcclxuICAgICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHN5bmNTaGVldExpbmUgJiYgdmFsaWRhdGVkU2hlZXRJZCkge1xuICAgICAgICAgICAgbGV0IHNoZWV0U3luY0ZhaWx1cmVNZXNzYWdlID0gXCJcIjtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNvbnN0IHN5bmNQYXlsb2FkID0ge1xuICAgICAgICAgICAgICAgIGZpbGVJZCxcbiAgICAgICAgICAgICAgICBzaGVldElkOiB2YWxpZGF0ZWRTaGVldElkLFxuICAgICAgICAgICAgICAgIGxpbmVSZWNJZDogc2FmZVRleHQobGlua2VkRXhwZW5zZUxpbmVSZWNJZCkgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgY3VycmVuY3lDb2RlT3ZlcnJpZGU6IG5vcm1hbGl6ZWRDdXJyZW5jeSxcclxuICAgICAgICAgICAgICAgIGFtb3VudE1TVE92ZXJyaWRlOiBwYXlsb2FkQW1vdW50TVNULFxyXG4gICAgICAgICAgICAgICAgZXhjaGFuZ2VSYXRlT3ZlcnJpZGU6IHBheWxvYWRFeGNoYW5nZVJhdGUgPz8gdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgLi4uKGxpbmtlZEV4cGVuc2VMaW5lUHJvamVjdElkQ2hhbmdlZFxyXG4gICAgICAgICAgICAgICAgICA/IHsgcHJvamVjdElkT3ZlcnJpZGU6IHNhZmVUZXh0KGxpbmtlZEV4cGVuc2VMaW5lUHJvamVjdElkKSB9XHJcbiAgICAgICAgICAgICAgICAgIDoge30pLFxyXG4gICAgICAgICAgICAgICAgLi4uKGxpbmtlZEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZWRcclxuICAgICAgICAgICAgICAgICAgPyB7IHJlaW1idXJzYWJsZUV4cGVuc2VPdmVycmlkZTogbGlua2VkRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlIH1cclxuICAgICAgICAgICAgICAgICAgOiB7fSksXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICBhd2FpdCBzeW5jRXhwZW5zZUxpbmtlZFRpY2tldFNoZWV0TGluZShzeW5jUGF5bG9hZCk7XHJcbiAgICAgICAgICAgICAgY2xlYXJFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoKTtcclxuICAgICAgICAgICAgICBvbkxpbmtlZFNoZWV0U3luY1N1Y2Nlc3M/LigpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPVxyXG4gICAgICAgICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBFcnJvclxyXG4gICAgICAgICAgICAgICAgICA/IGVycm9yLm1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgOiBpbmRUKFxyXG4gICAgICAgICAgICAgICAgICAgICAgXCJFeHBlbnNlVGlja2V0c19TaGVldFN5bmNfUmV0cnlSZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgXCJUaWNrZXQgZGF0YSBjaGFuZ2VkLCBidXQgd2UgY291bGQgbm90IHN5bmMgdGhlIGV4cGVuc2UgbGluZS4gU2F2ZSBhZ2FpbiBiZWZvcmUgbGVhdmluZy5cIlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZmlsZUlkLFxuICAgICAgICAgICAgICAgIHNoZWV0SWQ6IHZhbGlkYXRlZFNoZWV0SWQsXG4gICAgICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIG9uTGlua2VkU2hlZXRTeW5jRmFpbHVyZT8uKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICBpZiAoIWNvbnRpbnVlT25TaGVldFN5bmNGYWlsdXJlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNoZWV0U3luY0ZhaWx1cmVNZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzaGVldFN5bmNGYWlsdXJlTWVzc2FnZSkge1xuICAgICAgICAgICAgICBzZXRTdGF0dXMoc2hlZXRTeW5jRmFpbHVyZU1lc3NhZ2UpO1xuICAgICAgICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IHVwZGF0ZWRcIikpO1xuICAgICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQub2s7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBidXN5LFxyXG4gICAgICBjYW5FZGl0VGlja2V0LFxyXG4gICAgICBkcmFmdENvbWVudGFyaW8sXHJcbiAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgICBkcmFmdEZpbGVOYW1lLFxyXG4gICAgICBkcmFmdEdhc3RvVHlwZSxcclxuICAgICAgZHJhZnRBbW91bnRNU1QsXHJcbiAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgICBkcmFmdFRvdGFsQW1vdW50LFxyXG4gICAgICBkcmFmdFRpY2tldFRpbWUsXHJcbiAgICAgIGRyYWZ0VHJhbnNEYXRlLFxyXG4gICAgICBkcmFmdFVybEZpbGUsXHJcbiAgICAgIGZpbGVJZCxcclxuICAgICAgaXNFZGl0aW5nLFxyXG4gICAgICBsb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgICAgbGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWQsXHJcbiAgICAgIGxpbmtlZEV4cGVuc2VMaW5lUHJvamVjdElkQ2hhbmdlZCxcclxuICAgICAgbGlua2VkRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgICBsaW5rZWRFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2VkLFxyXG4gICAgICBsaW5rZWRFeHBlbnNlTGluZVJlY0lkLFxuICAgICAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlLFxuICAgICAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzLFxuICAgICAgc2V0QnVzeSxcbiAgICAgIHNldElzRWRpdGluZyxcbiAgICAgIHNldE1vZGFsRXJyb3IsXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIHZhbGlkYXRlTGlua2VkU2hlZXRCZWZvcmVNdXRhdGlvbixcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICByZXR1cm4gcnVuSGVhZGVyVXBkYXRlKHtcclxuICAgICAgc3luY1NoZWV0TGluZTogdHJ1ZSxcclxuICAgIH0pO1xyXG4gIH0sIFtydW5IZWFkZXJVcGRhdGVdKTtcblxuICBjb25zdCBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgLy8gT3BlbmluZyBhIHRpY2tldCBsaW5lIHNob3VsZCBwZXJzaXN0IGFsbCBwb3NzaWJsZSBsaW5rZWQtc2hlZXQgY2hhbmdlcywgYnV0XG4gICAgLy8gc2hlZXQgdmFsaWRhdGlvbiBmYWlsdXJlcyBtdXN0IG5vdCBwcmV2ZW50IHRoZSB1c2VyIGZyb20gZml4aW5nIHRoYXQgbGluZS5cbiAgICByZXR1cm4gcnVuSGVhZGVyVXBkYXRlKHtcbiAgICAgIHN5bmNTaGVldExpbmU6XG4gICAgICAgIGxpbmtlZEV4cGVuc2VMaW5lUHJvamVjdElkQ2hhbmdlZCB8fFxuICAgICAgICBsaW5rZWRFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2VkIHx8XG4gICAgICAgICEhc2FmZVRleHQobGlua2VkRXhwZW5zZVNoZWV0SWQpLFxuICAgICAgY29udGludWVPblNoZWV0U3luY0ZhaWx1cmU6IHRydWUsXG4gICAgfSk7XG4gIH0sIFtcbiAgICBsaW5rZWRFeHBlbnNlTGluZVByb2plY3RJZENoYW5nZWQsXG4gICAgbGlua2VkRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlZCxcbiAgICBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcbiAgICBydW5IZWFkZXJVcGRhdGUsXG4gIF0pO1xuXHJcbiAgY29uc3QgcmVzb2x2ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCA9IHVzZUNhbGxiYWNrKGFzeW5jICgpOiBQcm9taXNlPERlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCB8IG51bGw+ID0+IHtcclxuICAgIGlmIChkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQpIHtcclxuICAgICAgcmV0dXJuIGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KGxpbmtlZEV4cGVuc2VTaGVldElkKTtcclxuICAgIGlmICghc2FmZVNoZWV0SWQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldERldGFpbChzYWZlU2hlZXRJZCwge1xyXG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlLkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XHJcbiAgICBjb25zdCBkZXRhaWwgPSBpdGVtcy5maW5kKChlbnRyeSkgPT4gZW50cnkgJiYgdHlwZW9mIGVudHJ5ID09PSBcIm9iamVjdFwiKSB8fCBudWxsO1xyXG4gICAgY29uc3QgbGluZXMgPSBBcnJheS5pc0FycmF5KGRldGFpbD8uTGluZXMpID8gZGV0YWlsLkxpbmVzIDogW107XHJcbiAgICBjb25zdCBtYXRjaGluZ0xpbmUgPSBsaW5lcy5maW5kKChsaW5lKSA9PiBzYWZlVGV4dChsaW5lPy5GaWxlSWQpID09PSBmaWxlSWQpO1xyXG4gICAgY29uc3QgbGluZVJlY0lkID0gc2FmZVRleHQobWF0Y2hpbmdMaW5lPy5SZWNJZCk7XHJcblxyXG4gICAgaWYgKCFsaW5lUmVjSWQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2hlZXRJZDogc2FmZVNoZWV0SWQsXHJcbiAgICAgIGxpbmVSZWNJZCxcclxuICAgIH07XHJcbiAgfSwgW2RlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCwgZmlsZUlkLCBsaW5rZWRFeHBlbnNlU2hlZXRJZF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5EZWxldGVUaWNrZXQpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmFsaWRhdGVkU2hlZXRJZCA9IGF3YWl0IHZhbGlkYXRlTGlua2VkU2hlZXRCZWZvcmVNdXRhdGlvbigpO1xyXG4gICAgaWYgKHZhbGlkYXRlZFNoZWV0SWQgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0aW5nXCIsIFwiRGVsZXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcclxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIiksXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldEJ1c3ksXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGlua2VkTGluZUNvbnRleHQgPSBhd2FpdCByZXNvbHZlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0KCk7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCBkZWxldGVGaWxlUmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRGaWxlKGZpbGVJZCwge1xyXG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYgKCFkZWxldGVGaWxlUmVzcG9uc2UuU3VjY2VzcyAmJiAhaXNNaXNzaW5nVGlja2V0RmlsZU1lc3NhZ2UoZGVsZXRlRmlsZVJlc3BvbnNlLk1lc3NhZ2UpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihkZWxldGVGaWxlUmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBpZiAoIWlzTm90Rm91bmRFcnJvcihlcnJvcikpIHtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldChmaWxlSWQpO1xyXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChsaW5rZWRMaW5lQ29udGV4dCkge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgbGluZURlbGV0ZVJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0TGluZShcclxuICAgICAgICAgICAgICBsaW5rZWRMaW5lQ29udGV4dC5zaGVldElkLFxyXG4gICAgICAgICAgICAgIGxpbmtlZExpbmVDb250ZXh0LmxpbmVSZWNJZCxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWxpbmVEZWxldGVSZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGxpbmVEZWxldGVSZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIC8vIFRoZSBsaW5rZWQgbGluZSBjYW4gYmUgYXV0by1yZW1vdmVkIGJ5IGJhY2tlbmQgY2FzY2FkZTsga2VlcCBmbG93IHN1Y2Nlc3NmdWwgaW4gdGhhdCBjYXNlLlxyXG4gICAgICAgICAgICBpZiAoIWlzTm90Rm91bmRFcnJvcihlcnJvcikpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVkXCIsIFwiRXhwZW5zZSBzaGVldCBkZWxldGVkXCIpKTtcclxuICAgICAgICBpZiAodmFsaWRhdGVkU2hlZXRJZCkge1xyXG4gICAgICAgICAgY2xlYXJFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoKTtcclxuICAgICAgICAgIG9uTGlua2VkU2hlZXRTeW5jU3VjY2Vzcz8uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICB9LCBbXHJcbiAgICBidXN5LFxyXG4gICAgY2FuRGVsZXRlVGlja2V0LFxyXG4gICAgZmlsZUlkLFxyXG4gICAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzLFxyXG4gICAgcmVzb2x2ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgdmFsaWRhdGVMaW5rZWRTaGVldEJlZm9yZU11dGF0aW9uLFxyXG4gIF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlUGVyc2lzdEhlYWRlckRyYWZ0LFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbE9wZW46IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGlzTG9ja2VkOiBib29sZWFuO1xyXG4gIGlzRGVsZXRlTG9ja2VkPzogYm9vbGVhbjtcclxuICBhY3Rpb25Nb2RlPzogXCJkZWZhdWx0XCIgfCBcImRlbGV0ZV9vbmx5XCIgfCBcInNhdmVfb25seVwiIHwgXCJzYXZlX2RlbGV0ZVwiIHwgXCJ2aWV3X29ubHlcIjtcclxuICBwZXJtaXNzaW9uc1JlYWR5PzogYm9vbGVhbjtcclxuICBjYW5FZGl0VGlja2V0OiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZVRpY2tldDogYm9vbGVhbjtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUNhbmNlbEVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgY2FuT3BlblNhdmVDb25maXJtPzogKCkgPT4gYm9vbGVhbjtcclxuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgaGFuZGxlRGVsZXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XHJcbiAgb25EZWxldGVTdWNjZXNzPzogKCkgPT4gdm9pZDtcclxuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcclxuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XHJcbiAgICBvbkNhbmNlbD86ICgpID0+IHZvaWQ7XHJcbiAgfSkgPT4gdm9pZDtcclxuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBDb29yZGluYXRlcyB0b3BiYXIgaWNvbiBzdGF0ZSBhbmQgZGlzcGF0Y2ggYWN0aW9ucyBmb3IgdGlja2V0IGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsT3BlbixcclxuICBpc0VkaXRpbmcsXHJcbiAgaXNMb2NrZWQsXHJcbiAgaXNEZWxldGVMb2NrZWQsXHJcbiAgYWN0aW9uTW9kZSA9IFwiZGVmYXVsdFwiLFxyXG4gIHBlcm1pc3Npb25zUmVhZHkgPSB0cnVlLFxyXG4gIGNhbkVkaXRUaWNrZXQsXHJcbiAgY2FuRGVsZXRlVGlja2V0LFxyXG4gIGZpbGVJZCxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgaGFuZGxlVXBkYXRlLFxyXG4gIGhhbmRsZURlbGV0ZSxcclxuICBvblNhdmVTdWNjZXNzLFxyXG4gIG9uRGVsZXRlU3VjY2VzcyxcclxuICBvcGVuQ29uZmlybSxcclxuICBjbG9zZUNvbmZpcm0sXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncykgPT4ge1xyXG4gIHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25Hcm91cElkOiBcImV4cGVuc2UtdGlja2V0LWRldGFpbC1hY3Rpb25zXCIsXHJcbiAgICBpZHM6IHtcclxuICAgICAgZWRpdEljb25JZDogXCJleHBlbnNlVGlja2V0RWRpdEljb25cIixcclxuICAgICAgc2F2ZUljb25JZDogXCJleHBlbnNlVGlja2V0U2F2ZUljb25cIixcclxuICAgICAgZGVsZXRlQnRuSWQ6IFwiZXhwZW5zZVRpY2tldERlbGV0ZUJ0blwiLFxyXG4gICAgICBjYW5jZWxCdG5JZDogXCJleHBlbnNlVGlja2V0Q2FuY2VsQnRuXCIsXHJcbiAgICB9LFxyXG4gICAgZXZlbnRzOiB7XHJcbiAgICAgIGVkaXRFdmVudDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtZWRpdFwiLFxyXG4gICAgICBkZWxldGVFdmVudDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtZGVsZXRlXCIsXHJcbiAgICAgIGNhbmNlbEV2ZW50OiBcImV4cGVuc2UtdGlja2V0LWRldGFpbC1jYW5jZWwtZWRpdFwiLFxyXG4gICAgfSxcclxuICAgIGJ1c3ksXHJcbiAgICBtb2RhbE9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0NyZWF0ZU1vZGU6IGZhbHNlLFxyXG4gICAgaXNMb2NrZWQsXHJcbiAgICBpc0RlbGV0ZUxvY2tlZCxcclxuICAgIGFjdGlvbk1vZGUsXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5LFxyXG4gICAgY2FuQ3JlYXRlOiBmYWxzZSxcclxuICAgIGNhbkVkaXQ6IGNhbkVkaXRUaWNrZXQsXHJcbiAgICBjYW5EZWxldGU6IGNhbkRlbGV0ZVRpY2tldCxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICAgIGhhbmRsZVNhdmU6IGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICAgIHNhdmVDb25maXJtVGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19UaXRsZVwiLCBcIlNhdmUgY2hhbmdlc1wiKSxcclxuICAgIHNhdmVDb25maXJtTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBzYXZlIGNoYW5nZXM/XCIpLFxyXG4gICAgc2F2ZUNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX1NhdmVcIiwgXCJTYXZlXCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybVRpdGxlOiBpbmRUKFwiQ29uZmlybV9EZWxldGVfVGl0bGVcIiwgXCJEZWxldGVcIiksXHJcbiAgICBkZWxldGVDb25maXJtTWVzc2FnZTogaW5kVChcIkNvbmZpcm1fRGVsZXRlX0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBpdGVtP1wiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKSxcclxuICAgIG9uU2F2ZVN1Y2Nlc3MsXHJcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6IG9uRGVsZXRlU3VjY2VzcyB8fCAoKCkgPT4gbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL1RpY2tldHNcIikpLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWR1Y2VyLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgRGlzcGF0Y2gsIFNldFN0YXRlQWN0aW9uIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldExpbmUgfSBmcm9tIFwiLi4vLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgY2FsY3VsYXRlRXhwZW5zZUxpbmVBbW91bnRNU1RGb3JDdXJyZW5jeSxcclxuICBjYWxjdWxhdGVFeHBlbnNlTGluZUV4Y2hhbmdlUmF0ZUZvckN1cnJlbmN5LFxyXG4gIGlzRXhwZW5zZUxpbmVGb3JlaWduQ3VycmVuY3ksXHJcbiAgaXNFeHBlbnNlTGluZVNhbWVSZWltYnVyc2VtZW50Q3VycmVuY3ksXHJcbiAgcmVzb2x2ZUV4cGVuc2VMaW5lRXhjaGFuZ2VSYXRlRm9yQ3VycmVuY3ksXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VMaW5lQ3VycmVuY3kudHNcIjtcclxuaW1wb3J0IHsgdG9FeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi8uLi9jb25zdGFudHMvZXhwZW5zZUdhc3RvVHlwZUNhdGFsb2cudHNcIjtcclxuaW1wb3J0IHsgcGFyc2VFeHBlbnNlRGF0ZSwgc2FmZVRleHQsIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGFyZUV4cGVuc2VOdW1lcmljSW5wdXRzRXF1aXZhbGVudCxcclxuICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIsXHJcbiAgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0LFxyXG59IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5cclxudHlwZSBEcmFmdFN0YXRlID0ge1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZ2FzdG9UeXBlOiBzdHJpbmc7XHJcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgdG90YWxBbW91bnQ6IHN0cmluZztcclxuICBhbW91bnRNU1Q6IHN0cmluZztcclxuICBleGNoYW5nZVJhdGU6IHN0cmluZztcclxuICB0cmFuc0RhdGU6IHN0cmluZztcclxuICB0aWNrZXRUaW1lOiBzdHJpbmc7XHJcbiAgY29tZW50YXJpbzogc3RyaW5nO1xyXG4gIHVybEZpbGU6IHN0cmluZztcclxuICBmaWxlTmFtZTogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBFZGl0b3JTdGF0ZSA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBtb2RhbEVycm9yOiBzdHJpbmc7XHJcbiAgbGluZVBhZ2U6IG51bWJlcjtcclxuICBhbW91bnRNU1RNYW51YWxseUVkaXRlZDogYm9vbGVhbjtcclxuICBkcmFmdDogRHJhZnRTdGF0ZTtcclxufTtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbEVkaXRvckFyZ3MgPSB7XHJcbiAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbDtcclxuICBsaW5rZWRFeHBlbnNlTGluZT86IEV4cGVuc2VTaGVldExpbmUgfCBudWxsO1xyXG4gIGxvY2FsQ3VycmVuY3lDb2RlPzogc3RyaW5nO1xyXG4gIGxpbmVDb3VudDogbnVtYmVyO1xyXG4gIHBhZ2VTaXplOiBudW1iZXI7XHJcbiAgY2FuRWRpdFRpY2tldDogYm9vbGVhbjtcbiAgaXNMb2FkaW5nOiBib29sZWFuO1xuICBhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0OiBib29sZWFuO1xuICBpc1NoZWV0TGlua1JlYWRPbmx5OiBib29sZWFuO1xuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcbn07XG5cclxudHlwZSBFZGl0b3JBY3Rpb24gPVxyXG4gIHwge1xyXG4gICAgICB0eXBlOiBcImh5ZHJhdGVfZnJvbV9oZWFkZXJcIjtcclxuICAgICAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbDtcclxuICAgICAgbGlua2VkRXhwZW5zZUxpbmU/OiBFeHBlbnNlU2hlZXRMaW5lIHwgbnVsbDtcclxuICAgICAgbG9jYWxDdXJyZW5jeUNvZGU/OiBzdHJpbmc7XHJcbiAgICB9XHJcbiAgfCB7XHJcbiAgICAgIHR5cGU6IFwicGF0Y2hfc3RhdGVcIjtcclxuICAgICAgcGF0Y2g6IFBhcnRpYWw8UGljazxFZGl0b3JTdGF0ZSwgXCJidXN5XCIgfCBcInN0YXR1c1wiIHwgXCJpc0VkaXRpbmdcIiB8IFwibW9kYWxFcnJvclwiIHwgXCJsaW5lUGFnZVwiIHwgXCJhbW91bnRNU1RNYW51YWxseUVkaXRlZFwiPj47XHJcbiAgICB9XHJcbiAgfCB7IHR5cGU6IFwicGF0Y2hfZHJhZnRcIjsgcGF0Y2g6IFBhcnRpYWw8RHJhZnRTdGF0ZT47IGFtb3VudE1TVE1hbnVhbGx5RWRpdGVkPzogYm9vbGVhbiB9XHJcbiAgfCB7IHR5cGU6IFwic2V0X2RyYWZ0X2ZpZWxkXCI7IGZpZWxkOiBrZXlvZiBEcmFmdFN0YXRlOyB2YWx1ZTogc3RyaW5nIH07XHJcblxyXG5jb25zdCBjcmVhdGVFbXB0eURyYWZ0ID0gKCk6IERyYWZ0U3RhdGUgPT4gKHtcclxuICBkZXNjcmlwdGlvbjogXCJcIixcclxuICBnYXN0b1R5cGU6IFwiXCIsXHJcbiAgY3VycmVuY3lDb2RlOiBcIlwiLFxyXG4gIHRvdGFsQW1vdW50OiBcIlwiLFxyXG4gIGFtb3VudE1TVDogXCJcIixcclxuICBleGNoYW5nZVJhdGU6IFwiXCIsXHJcbiAgdHJhbnNEYXRlOiBcIlwiLFxyXG4gIHRpY2tldFRpbWU6IFwiXCIsXHJcbiAgY29tZW50YXJpbzogXCJcIixcclxuICB1cmxGaWxlOiBcIlwiLFxyXG4gIGZpbGVOYW1lOiBcIlwiLFxyXG59KTtcclxuXHJcbmNvbnN0IHRvSW5wdXREYXRlID0gKHJhdz86IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlRGF0ZShyYXcpO1xyXG4gIHJldHVybiBwYXJzZWQgPyB0b0lzb0RhdGUocGFyc2VkKSA6IFwiXCI7XHJcbn07XHJcblxyXG5jb25zdCB0b0lucHV0VGltZSA9IChyYXc/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gc2FmZVRleHQocmF3KTtcclxuICBpZiAoIXZhbHVlIHx8IHZhbHVlID09PSBcIjBcIikgcmV0dXJuIFwiXCI7XHJcblxyXG4gIGNvbnN0IHNlY29uZHNWYWx1ZSA9IE51bWJlcih2YWx1ZSk7XHJcbiAgaWYgKE51bWJlci5pc0ludGVnZXIoc2Vjb25kc1ZhbHVlKSAmJiBzZWNvbmRzVmFsdWUgPj0gMCAmJiBzZWNvbmRzVmFsdWUgPD0gODYzOTkpIHtcclxuICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihzZWNvbmRzVmFsdWUgLyAzNjAwKTtcclxuICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNvbmRzVmFsdWUgJSAzNjAwKSAvIDYwKTtcclxuICAgIGNvbnN0IHNlY29uZHMgPSBzZWNvbmRzVmFsdWUgJSA2MDtcclxuICAgIHJldHVybiBbaG91cnMsIG1pbnV0ZXMsIHNlY29uZHNdLm1hcCgoZW50cnkpID0+IFN0cmluZyhlbnRyeSkucGFkU3RhcnQoMiwgXCIwXCIpKS5qb2luKFwiOlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG1hdGNoID0gdmFsdWUubWF0Y2goL14oXFxkezEsMn0pOihbMC01XVxcZCkoPzo6KFswLTVdXFxkKSk/JC8pO1xyXG4gIGlmICghbWF0Y2gpIHJldHVybiBcIlwiO1xyXG5cclxuICBjb25zdCBob3VycyA9IE51bWJlci5wYXJzZUludChtYXRjaFsxXSB8fCBcIlwiLCAxMCk7XHJcbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGhvdXJzKSB8fCBob3VycyA8IDAgfHwgaG91cnMgPiAyMykgcmV0dXJuIFwiXCI7XHJcblxyXG4gIHJldHVybiBgJHtTdHJpbmcoaG91cnMpLnBhZFN0YXJ0KDIsIFwiMFwiKX06JHttYXRjaFsyXX06JHttYXRjaFszXSB8fCBcIjAwXCJ9YDtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBzYWZlVGV4dCh2YWx1ZSkudG9VcHBlckNhc2UoKTtcclxuXHJcbmNvbnN0IHRvRmluaXRlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0RWRpdGFibGVNb25leSA9ICh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcih2YWx1ZSwge1xyXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICBmYWxsYmFjazogXCJcIixcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdEVkaXRhYmxlRXhjaGFuZ2VSYXRlID0gKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKHZhbHVlLCB7XHJcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDcsXHJcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDcsXHJcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRBbW91bnRNU1RQYXRjaEZyb21FeGNoYW5nZVJhdGUgPSAoXHJcbiAgdG90YWxBbW91bnQ6IHN0cmluZyxcclxuICBleGNoYW5nZVJhdGU6IHN0cmluZyxcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZyxcclxuICByZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlOiBzdHJpbmcsXHJcbiAgYW1vdW50TVNUTWFudWFsbHlFZGl0ZWQ6IGJvb2xlYW5cclxuKTogUGFydGlhbDxEcmFmdFN0YXRlPiA9PiB7XHJcbiAgaWYgKGFtb3VudE1TVE1hbnVhbGx5RWRpdGVkICYmIGlzRXhwZW5zZUxpbmVTYW1lUmVpbWJ1cnNlbWVudEN1cnJlbmN5KGN1cnJlbmN5Q29kZSwgcmVpbWJ1cnNlbWVudEN1cnJlbmN5Q29kZSkpIHtcclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZFRvdGFsQW1vdW50ID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHRvdGFsQW1vdW50KTtcclxuICBjb25zdCBwYXJzZWRFeGNoYW5nZVJhdGUgPSByZXNvbHZlRXhwZW5zZUxpbmVFeGNoYW5nZVJhdGVGb3JDdXJyZW5jeShcclxuICAgIGN1cnJlbmN5Q29kZSxcclxuICAgIHJlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGUsXHJcbiAgICBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQoZXhjaGFuZ2VSYXRlKVxyXG4gICk7XHJcbiAgY29uc3QgbmV4dEFtb3VudE1TVCA9XHJcbiAgICBwYXJzZWRUb3RhbEFtb3VudCAhPSBudWxsXHJcbiAgICAgID8gY2FsY3VsYXRlRXhwZW5zZUxpbmVBbW91bnRNU1RGb3JDdXJyZW5jeShcclxuICAgICAgICAgIHBhcnNlZFRvdGFsQW1vdW50LFxyXG4gICAgICAgICAgcGFyc2VkRXhjaGFuZ2VSYXRlLFxyXG4gICAgICAgICAgY3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgcmVpbWJ1cnNlbWVudEN1cnJlbmN5Q29kZVxyXG4gICAgICAgIClcclxuICAgICAgOiBudWxsO1xyXG5cclxuICByZXR1cm4gbmV4dEFtb3VudE1TVCAhPSBudWxsID8geyBhbW91bnRNU1Q6IGZvcm1hdEVkaXRhYmxlTW9uZXkobmV4dEFtb3VudE1TVCkgfSA6IHt9O1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRFeGNoYW5nZVJhdGVQYXRjaEZyb21BbW91bnRNU1QgPSAoXHJcbiAgdG90YWxBbW91bnQ6IHN0cmluZyxcclxuICBhbW91bnRNU1Q6IHN0cmluZyxcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZyxcclxuICByZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlOiBzdHJpbmcsXHJcbiAgY3VycmVudEV4Y2hhbmdlUmF0ZTogc3RyaW5nXHJcbik6IFBhcnRpYWw8RHJhZnRTdGF0ZT4gPT4ge1xyXG4gIGNvbnN0IHBhcnNlZFRvdGFsQW1vdW50ID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHRvdGFsQW1vdW50KTtcclxuICBjb25zdCBwYXJzZWRBbW91bnRNU1QgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQoYW1vdW50TVNUKTtcclxuICBjb25zdCBuZXh0RXhjaGFuZ2VSYXRlID1cclxuICAgIHBhcnNlZFRvdGFsQW1vdW50ICE9IG51bGwgJiYgcGFyc2VkQW1vdW50TVNUICE9IG51bGxcclxuICAgICAgPyBjYWxjdWxhdGVFeHBlbnNlTGluZUV4Y2hhbmdlUmF0ZUZvckN1cnJlbmN5KFxyXG4gICAgICAgICAgcGFyc2VkVG90YWxBbW91bnQsXHJcbiAgICAgICAgICBwYXJzZWRBbW91bnRNU1QsXHJcbiAgICAgICAgICBjdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICByZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgY3VycmVudEV4Y2hhbmdlUmF0ZVxyXG4gICAgICAgIClcclxuICAgICAgOiBpc0V4cGVuc2VMaW5lU2FtZVJlaW1idXJzZW1lbnRDdXJyZW5jeShjdXJyZW5jeUNvZGUsIHJlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGUpXHJcbiAgICAgICAgPyByZXNvbHZlRXhwZW5zZUxpbmVFeGNoYW5nZVJhdGVGb3JDdXJyZW5jeShjdXJyZW5jeUNvZGUsIHJlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGUsIGN1cnJlbnRFeGNoYW5nZVJhdGUpXHJcbiAgICAgIDogbnVsbDtcclxuXHJcbiAgcmV0dXJuIG5leHRFeGNoYW5nZVJhdGUgIT0gbnVsbCA/IHsgZXhjaGFuZ2VSYXRlOiBmb3JtYXRFZGl0YWJsZUV4Y2hhbmdlUmF0ZShuZXh0RXhjaGFuZ2VSYXRlKSB9IDoge307XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlRXhjaGFuZ2VSYXRlRm9yU2V0dGxlbWVudCA9IChcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZyxcclxuICBsb2NhbEN1cnJlbmN5Q29kZTogc3RyaW5nLFxyXG4gIGV4Y2hhbmdlUmF0ZTogc3RyaW5nXHJcbik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKCFpc0V4cGVuc2VMaW5lRm9yZWlnbkN1cnJlbmN5KGN1cnJlbmN5Q29kZSwgbG9jYWxDdXJyZW5jeUNvZGUpKSB7XHJcbiAgICByZXR1cm4gZm9ybWF0RWRpdGFibGVFeGNoYW5nZVJhdGUoMTAwKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZEV4Y2hhbmdlUmF0ZSA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChleGNoYW5nZVJhdGUpO1xyXG4gIGlmIChwYXJzZWRFeGNoYW5nZVJhdGUgIT0gbnVsbCAmJiBwYXJzZWRFeGNoYW5nZVJhdGUgPiAwKSB7XHJcbiAgICByZXR1cm4gZXhjaGFuZ2VSYXRlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGV4Y2hhbmdlUmF0ZTtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkTG9jYWxDdXJyZW5jeVNldHRsZW1lbnRQYXRjaCA9IChcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZyxcclxuICBsb2NhbEN1cnJlbmN5Q29kZTogc3RyaW5nLFxyXG4gIHRvdGFsQW1vdW50OiBzdHJpbmcsXHJcbiAgZXhjaGFuZ2VSYXRlOiBzdHJpbmcsXHJcbiAgYW1vdW50TVNUTWFudWFsbHlFZGl0ZWQ6IGJvb2xlYW5cclxuKTogUGFydGlhbDxEcmFmdFN0YXRlPiA9PiB7XHJcbiAgaWYgKGlzRXhwZW5zZUxpbmVGb3JlaWduQ3VycmVuY3koY3VycmVuY3lDb2RlLCBsb2NhbEN1cnJlbmN5Q29kZSkpIHtcclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZFRvdGFsQW1vdW50ID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHRvdGFsQW1vdW50KTtcclxuICByZXR1cm4ge1xyXG4gICAgZXhjaGFuZ2VSYXRlOiBmb3JtYXRFZGl0YWJsZUV4Y2hhbmdlUmF0ZShcclxuICAgICAgcmVzb2x2ZUV4cGVuc2VMaW5lRXhjaGFuZ2VSYXRlRm9yQ3VycmVuY3koY3VycmVuY3lDb2RlLCBsb2NhbEN1cnJlbmN5Q29kZSwgZXhjaGFuZ2VSYXRlKVxyXG4gICAgKSxcclxuICAgIC4uLighYW1vdW50TVNUTWFudWFsbHlFZGl0ZWQgJiYgcGFyc2VkVG90YWxBbW91bnQgIT0gbnVsbCA/IHsgYW1vdW50TVNUOiBmb3JtYXRFZGl0YWJsZU1vbmV5KHBhcnNlZFRvdGFsQW1vdW50KSB9IDoge30pLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVEcmFmdEZyb21IZWFkZXIgPSAoXHJcbiAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbCxcclxuICBsaW5rZWRFeHBlbnNlTGluZTogRXhwZW5zZVNoZWV0TGluZSB8IG51bGwgfCB1bmRlZmluZWQsXHJcbiAgbG9jYWxDdXJyZW5jeUNvZGU6IHN0cmluZyB8IHVuZGVmaW5lZFxyXG4pOiBEcmFmdFN0YXRlID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkTG9jYWxDdXJyZW5jeUNvZGUgPVxyXG4gICAgbm9ybWFsaXplQ3VycmVuY3lDb2RlKGxvY2FsQ3VycmVuY3lDb2RlKSB8fCBub3JtYWxpemVDdXJyZW5jeUNvZGUobGlua2VkRXhwZW5zZUxpbmU/LmN1cnJlbmN5Q29kZSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbmN5Q29kZSA9XHJcbiAgICBub3JtYWxpemVDdXJyZW5jeUNvZGUoaGVhZGVyPy5jdXJyZW5jeUNvZGUpIHx8IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShsaW5rZWRFeHBlbnNlTGluZT8uY3VycmVuY3lDb2RlKSB8fCBub3JtYWxpemVkTG9jYWxDdXJyZW5jeUNvZGU7XHJcbiAgY29uc3QgdG90YWxBbW91bnQgPVxuICAgIHRvRmluaXRlTnVtYmVyKGhlYWRlcj8udG90YWxBbW91bnRDdXJyZW5jeSA/PyBoZWFkZXI/LnRvdGFsQW1vdW50KSA/P1xuICAgIHRvRmluaXRlTnVtYmVyKGxpbmtlZEV4cGVuc2VMaW5lPy5hbW91bnQpID8/XG4gICAgdG9GaW5pdGVOdW1iZXIobGlua2VkRXhwZW5zZUxpbmU/LnByaWNlKTtcbiAgY29uc3QgdGlja2V0RXhjaGFuZ2VSYXRlID0gdG9GaW5pdGVOdW1iZXIoaGVhZGVyPy5leGNoUmF0ZSA/PyBsaW5rZWRFeHBlbnNlTGluZT8uZXhjaFJhdGUpO1xuICBjb25zdCB0aWNrZXRBbW91bnRNU1QgPSB0b0Zpbml0ZU51bWJlcihoZWFkZXI/LnZpc2libGVSZWltYnVyc2FibGVUb3RhbCA/PyBoZWFkZXI/LmFtb3VudE1TVCA/PyBsaW5rZWRFeHBlbnNlTGluZT8uYW1vdW50TVNUKTtcbiAgY29uc3Qgc2FtZUN1cnJlbmN5ID0gaXNFeHBlbnNlTGluZVNhbWVSZWltYnVyc2VtZW50Q3VycmVuY3kobm9ybWFsaXplZEN1cnJlbmN5Q29kZSwgbm9ybWFsaXplZExvY2FsQ3VycmVuY3lDb2RlKTtcclxuICBjb25zdCBleGNoYW5nZVJhdGUgPSBzYW1lQ3VycmVuY3lcclxuICAgID8gMTAwXHJcbiAgICA6IHRpY2tldEV4Y2hhbmdlUmF0ZSAhPSBudWxsICYmIHRpY2tldEV4Y2hhbmdlUmF0ZSA+IDBcclxuICAgICAgPyB0aWNrZXRFeGNoYW5nZVJhdGVcclxuICAgICAgOiBudWxsO1xyXG4gIGNvbnN0IGNhbGN1bGF0ZWRBbW91bnRNU1QgPVxyXG4gICAgdG90YWxBbW91bnQgIT0gbnVsbFxyXG4gICAgICA/IGNhbGN1bGF0ZUV4cGVuc2VMaW5lQW1vdW50TVNURm9yQ3VycmVuY3koXHJcbiAgICAgICAgICB0b3RhbEFtb3VudCxcclxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZSxcclxuICAgICAgICAgIG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICBub3JtYWxpemVkTG9jYWxDdXJyZW5jeUNvZGVcclxuICAgICAgICApXHJcbiAgICAgIDogbnVsbDtcclxuICBjb25zdCBhbW91bnRNU1QgPSB0aWNrZXRBbW91bnRNU1QgPz8gY2FsY3VsYXRlZEFtb3VudE1TVCA/PyAoc2FtZUN1cnJlbmN5ID8gdG90YWxBbW91bnQgOiBudWxsKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChoZWFkZXI/LmRlc2NyaXB0aW9uKSxcclxuICAgIGdhc3RvVHlwZTogaGVhZGVyPy5nYXN0b1R5cGUgPT09IG51bGwgfHwgaGVhZGVyPy5nYXN0b1R5cGUgPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBTdHJpbmcoaGVhZGVyLmdhc3RvVHlwZSksXHJcbiAgICBjdXJyZW5jeUNvZGU6IG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUsXHJcbiAgICB0b3RhbEFtb3VudDogZm9ybWF0RWRpdGFibGVNb25leSh0b3RhbEFtb3VudCksXHJcbiAgICBhbW91bnRNU1Q6IGZvcm1hdEVkaXRhYmxlTW9uZXkoYW1vdW50TVNUKSxcclxuICAgIGV4Y2hhbmdlUmF0ZTogZm9ybWF0RWRpdGFibGVFeGNoYW5nZVJhdGUoZXhjaGFuZ2VSYXRlKSxcclxuICAgIHRyYW5zRGF0ZTogdG9JbnB1dERhdGUoaGVhZGVyPy50aWNrZXREYXRlIHx8IGhlYWRlcj8udHJhbnNEYXRlKSxcclxuICAgIHRpY2tldFRpbWU6IHRvSW5wdXRUaW1lKGhlYWRlcj8udGlja2V0VGltZSksXHJcbiAgICBjb21lbnRhcmlvOiBzYWZlVGV4dChoZWFkZXI/LmNvbWVudGFyaW8pLFxyXG4gICAgdXJsRmlsZTogc2FmZVRleHQoaGVhZGVyPy51cmxGaWxlKSxcclxuICAgIGZpbGVOYW1lOiBzYWZlVGV4dChoZWFkZXI/LmZpbGVOYW1lKSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlSW5pdGlhbFN0YXRlID0gKCk6IEVkaXRvclN0YXRlID0+ICh7XHJcbiAgYnVzeTogZmFsc2UsXHJcbiAgc3RhdHVzOiBcIlwiLFxyXG4gIGlzRWRpdGluZzogZmFsc2UsXHJcbiAgbW9kYWxFcnJvcjogXCJcIixcclxuICBsaW5lUGFnZTogMSxcclxuICBhbW91bnRNU1RNYW51YWxseUVkaXRlZDogZmFsc2UsXHJcbiAgZHJhZnQ6IGNyZWF0ZUVtcHR5RHJhZnQoKSxcclxufSk7XHJcblxyXG5jb25zdCBpc1ZhbGlkUmVxdWlyZWRHYXN0b1R5cGUgPSAocmF3VmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gIHJldHVybiB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlKHJhd1ZhbHVlLCB7IGFsbG93Tm9uZTogZmFsc2UgfSkgIT09IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBlZGl0b3JSZWR1Y2VyID0gKHN0YXRlOiBFZGl0b3JTdGF0ZSwgYWN0aW9uOiBFZGl0b3JBY3Rpb24pOiBFZGl0b3JTdGF0ZSA9PiB7XHJcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgY2FzZSBcImh5ZHJhdGVfZnJvbV9oZWFkZXJcIjpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICBhbW91bnRNU1RNYW51YWxseUVkaXRlZDogZmFsc2UsXHJcbiAgICAgICAgZHJhZnQ6IGNyZWF0ZURyYWZ0RnJvbUhlYWRlcihhY3Rpb24uaGVhZGVyLCBhY3Rpb24ubGlua2VkRXhwZW5zZUxpbmUsIGFjdGlvbi5sb2NhbEN1cnJlbmN5Q29kZSksXHJcbiAgICAgIH07XHJcbiAgICBjYXNlIFwicGF0Y2hfc3RhdGVcIjpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAuLi5hY3Rpb24ucGF0Y2gsXHJcbiAgICAgIH07XHJcbiAgICBjYXNlIFwic2V0X2RyYWZ0X2ZpZWxkXCI6XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgZHJhZnQ6IHtcclxuICAgICAgICAgIC4uLnN0YXRlLmRyYWZ0LFxyXG4gICAgICAgICAgW2FjdGlvbi5maWVsZF06IGFjdGlvbi52YWx1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgY2FzZSBcInBhdGNoX2RyYWZ0XCI6XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgYW1vdW50TVNUTWFudWFsbHlFZGl0ZWQ6IGFjdGlvbi5hbW91bnRNU1RNYW51YWxseUVkaXRlZCA/PyBzdGF0ZS5hbW91bnRNU1RNYW51YWxseUVkaXRlZCxcclxuICAgICAgICBkcmFmdDoge1xyXG4gICAgICAgICAgLi4uc3RhdGUuZHJhZnQsXHJcbiAgICAgICAgICAuLi5hY3Rpb24ucGF0Y2gsXHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBzdGF0ZTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlU2V0U3RhdGVWYWx1ZSA9IDxULD4odmFsdWU6IFNldFN0YXRlQWN0aW9uPFQ+LCBjdXJyZW50OiBUKTogVCA9PiB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gKHZhbHVlIGFzIChwcmV2U3RhdGU6IFQpID0+IFQpKGN1cnJlbnQpIDogdmFsdWU7XHJcbn07XHJcblxyXG4vLyBPd25zIHBhZ2UtbG9jYWwgZWRpdCwgZHJhZnQsIGFuZCBsaW5lIHBhZ2luZyBzdGF0ZSBmb3IgdGlja2V0IGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3IgPSAoe1xyXG4gIGhlYWRlcixcclxuICBsaW5rZWRFeHBlbnNlTGluZSxcclxuICBsb2NhbEN1cnJlbmN5Q29kZSxcclxuICBsaW5lQ291bnQsXHJcbiAgcGFnZVNpemUsXHJcbiAgY2FuRWRpdFRpY2tldCxcbiAgaXNMb2FkaW5nLFxuICBhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0LFxuICBpc1NoZWV0TGlua1JlYWRPbmx5LFxuICBvbkZvcmJpZGRlbixcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3JBcmdzKSA9PiB7XG4gIGNvbnN0IFtzdGF0ZSwgZGlzcGF0Y2hdID0gdXNlUmVkdWNlcihlZGl0b3JSZWR1Y2VyLCB1bmRlZmluZWQsIGNyZWF0ZUluaXRpYWxTdGF0ZSk7XHJcbiAgY29uc3QgW2Rlc2NyaXB0aW9uSW52YWxpZCwgc2V0RGVzY3JpcHRpb25JbnZhbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZ2FzdG9UeXBlSW52YWxpZCwgc2V0R2FzdG9UeXBlSW52YWxpZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2N1cnJlbmN5Q29kZUludmFsaWQsIHNldEN1cnJlbmN5Q29kZUludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFt0b3RhbEFtb3VudEludmFsaWQsIHNldFRvdGFsQW1vdW50SW52YWxpZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Ftb3VudE1TVEludmFsaWQsIHNldEFtb3VudE1TVEludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtleGNoYW5nZVJhdGVJbnZhbGlkLCBzZXRFeGNoYW5nZVJhdGVJbnZhbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBkZXNjcmlwdGlvbklucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBnYXN0b1R5cGVJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgY3VycmVuY3lJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgdG90YWxBbW91bnRJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgYW1vdW50TVNUSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSA9XHJcbiAgICBub3JtYWxpemVDdXJyZW5jeUNvZGUobG9jYWxDdXJyZW5jeUNvZGUpIHx8IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShsaW5rZWRFeHBlbnNlTGluZT8uY3VycmVuY3lDb2RlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChzdGF0ZS5pc0VkaXRpbmcpIHJldHVybjtcclxuICAgIGRpc3BhdGNoKHsgdHlwZTogXCJoeWRyYXRlX2Zyb21faGVhZGVyXCIsIGhlYWRlciwgbGlua2VkRXhwZW5zZUxpbmUsIGxvY2FsQ3VycmVuY3lDb2RlOiBlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSB9KTtcclxuICB9LCBbZWZmZWN0aXZlTG9jYWxDdXJyZW5jeUNvZGUsIGhlYWRlciwgbGlua2VkRXhwZW5zZUxpbmUsIHN0YXRlLmlzRWRpdGluZ10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgbWF4UGFnZSA9IE1hdGgubWF4KDEsIE1hdGguY2VpbChsaW5lQ291bnQgLyBwYWdlU2l6ZSkpO1xyXG4gICAgaWYgKHN0YXRlLmxpbmVQYWdlID4gbWF4UGFnZSkge1xyXG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwicGF0Y2hfc3RhdGVcIiwgcGF0Y2g6IHsgbGluZVBhZ2U6IG1heFBhZ2UgfSB9KTtcclxuICAgIH1cclxuICB9LCBbbGluZUNvdW50LCBwYWdlU2l6ZSwgc3RhdGUubGluZVBhZ2VdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChzdGF0ZS5pc0VkaXRpbmcpIHJldHVybjtcclxuICAgIHNldERlc2NyaXB0aW9uSW52YWxpZChmYWxzZSk7XHJcbiAgICBzZXRHYXN0b1R5cGVJbnZhbGlkKGZhbHNlKTtcclxuICAgIHNldEN1cnJlbmN5Q29kZUludmFsaWQoZmFsc2UpO1xyXG4gICAgc2V0VG90YWxBbW91bnRJbnZhbGlkKGZhbHNlKTtcclxuICAgIHNldEFtb3VudE1TVEludmFsaWQoZmFsc2UpO1xyXG4gICAgc2V0RXhjaGFuZ2VSYXRlSW52YWxpZChmYWxzZSk7XHJcbiAgfSwgW3N0YXRlLmlzRWRpdGluZ10pO1xyXG5cclxuICBjb25zdCBzZXRCdXN5ID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwicGF0Y2hfc3RhdGVcIiwgcGF0Y2g6IHsgYnVzeTogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmJ1c3kpIH0gfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLmJ1c3ldXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2V0U3RhdHVzID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBzdGF0dXM6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5zdGF0dXMpIH0gfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLnN0YXR1c11cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRJc0VkaXRpbmcgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxib29sZWFuPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBpc0VkaXRpbmc6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5pc0VkaXRpbmcpIH0gfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLmlzRWRpdGluZ11cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRNb2RhbEVycm9yID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBtb2RhbEVycm9yOiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUubW9kYWxFcnJvcikgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUubW9kYWxFcnJvcl1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRMaW5lUGFnZSA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPG51bWJlcj4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwicGF0Y2hfc3RhdGVcIiwgcGF0Y2g6IHsgbGluZVBhZ2U6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5saW5lUGFnZSkgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUubGluZVBhZ2VdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2V0RHJhZnREZXNjcmlwdGlvbiA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBzZXREZXNjcmlwdGlvbkludmFsaWQoZmFsc2UpO1xyXG4gICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJzZXRfZHJhZnRfZmllbGRcIixcclxuICAgICAgICBmaWVsZDogXCJkZXNjcmlwdGlvblwiLFxyXG4gICAgICAgIHZhbHVlOiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuZHJhZnQuZGVzY3JpcHRpb24pLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuZHJhZnQuZGVzY3JpcHRpb25dXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2V0RHJhZnRHYXN0b1R5cGUgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxzdHJpbmc+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgc2V0R2FzdG9UeXBlSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcInNldF9kcmFmdF9maWVsZFwiLFxyXG4gICAgICAgIGZpZWxkOiBcImdhc3RvVHlwZVwiLFxyXG4gICAgICAgIHZhbHVlOiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuZHJhZnQuZ2FzdG9UeXBlKSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLmRyYWZ0Lmdhc3RvVHlwZV1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXREcmFmdEN1cnJlbmN5Q29kZSA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgc2V0QW1vdW50TVNUSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZUludmFsaWQoZmFsc2UpO1xyXG4gICAgICBjb25zdCBuZXh0Q3VycmVuY3lDb2RlID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUpKTtcclxuICAgICAgY29uc3QgbmV4dFBhdGNoOiBQYXJ0aWFsPERyYWZ0U3RhdGU+ID0ge1xyXG4gICAgICAgIGN1cnJlbmN5Q29kZTogbmV4dEN1cnJlbmN5Q29kZSxcclxuICAgICAgICAuLi5idWlsZExvY2FsQ3VycmVuY3lTZXR0bGVtZW50UGF0Y2goXHJcbiAgICAgICAgICBuZXh0Q3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgZWZmZWN0aXZlTG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICBzdGF0ZS5kcmFmdC50b3RhbEFtb3VudCxcclxuICAgICAgICAgIHN0YXRlLmRyYWZ0LmV4Y2hhbmdlUmF0ZSxcclxuICAgICAgICAgIGZhbHNlXHJcbiAgICAgICAgKSxcclxuICAgICAgfTtcclxuICAgICAgaWYgKCFuZXh0UGF0Y2guYW1vdW50TVNUKSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbihcclxuICAgICAgICAgIG5leHRQYXRjaCxcclxuICAgICAgICAgIGJ1aWxkQW1vdW50TVNUUGF0Y2hGcm9tRXhjaGFuZ2VSYXRlKFxyXG4gICAgICAgICAgICBzdGF0ZS5kcmFmdC50b3RhbEFtb3VudCxcclxuICAgICAgICAgICAgc3RhdGUuZHJhZnQuZXhjaGFuZ2VSYXRlLFxyXG4gICAgICAgICAgICBuZXh0Q3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgICBlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgICAgICAgICAgZmFsc2VcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcInBhdGNoX2RyYWZ0XCIsXHJcbiAgICAgICAgcGF0Y2g6IG5leHRQYXRjaCxcclxuICAgICAgICBhbW91bnRNU1RNYW51YWxseUVkaXRlZDogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSwgc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlLCBzdGF0ZS5kcmFmdC5leGNoYW5nZVJhdGUsIHN0YXRlLmRyYWZ0LnRvdGFsQW1vdW50XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldERyYWZ0VG90YWxBbW91bnQgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxzdHJpbmc+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgc2V0VG90YWxBbW91bnRJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgc2V0QW1vdW50TVNUSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZUludmFsaWQoZmFsc2UpO1xyXG4gICAgICBjb25zdCBuZXh0VG90YWxBbW91bnQgPSByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuZHJhZnQudG90YWxBbW91bnQpO1xyXG4gICAgICBjb25zdCBlZmZlY3RpdmVFeGNoYW5nZVJhdGUgPSByZXNvbHZlRXhjaGFuZ2VSYXRlRm9yU2V0dGxlbWVudChcclxuICAgICAgICBzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgZWZmZWN0aXZlTG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgc3RhdGUuZHJhZnQuZXhjaGFuZ2VSYXRlXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG5leHRQYXRjaDogUGFydGlhbDxEcmFmdFN0YXRlPiA9IHtcclxuICAgICAgICB0b3RhbEFtb3VudDogbmV4dFRvdGFsQW1vdW50LFxyXG4gICAgICAgIC4uLmJ1aWxkQW1vdW50TVNUUGF0Y2hGcm9tRXhjaGFuZ2VSYXRlKFxyXG4gICAgICAgICAgbmV4dFRvdGFsQW1vdW50LFxyXG4gICAgICAgICAgZWZmZWN0aXZlRXhjaGFuZ2VSYXRlLFxyXG4gICAgICAgICAgc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgZWZmZWN0aXZlTG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICBzdGF0ZS5hbW91bnRNU1RNYW51YWxseUVkaXRlZFxyXG4gICAgICAgICksXHJcbiAgICAgIH07XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcInBhdGNoX2RyYWZ0XCIsXHJcbiAgICAgICAgcGF0Y2g6IG5leHRQYXRjaCxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgICAgc3RhdGUuYW1vdW50TVNUTWFudWFsbHlFZGl0ZWQsXHJcbiAgICAgIHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSxcclxuICAgICAgc3RhdGUuZHJhZnQuZXhjaGFuZ2VSYXRlLFxyXG4gICAgICBzdGF0ZS5kcmFmdC50b3RhbEFtb3VudCxcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXREcmFmdEFtb3VudE1TVCA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBzZXRBbW91bnRNU1RJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIGNvbnN0IG5leHRBbW91bnRNU1QgPSByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuZHJhZnQuYW1vdW50TVNUKTtcclxuICAgICAgaWYgKGFyZUV4cGVuc2VOdW1lcmljSW5wdXRzRXF1aXZhbGVudChuZXh0QW1vdW50TVNULCBzdGF0ZS5kcmFmdC5hbW91bnRNU1QpKSB7XHJcbiAgICAgICAgaWYgKG5leHRBbW91bnRNU1QgIT09IHN0YXRlLmRyYWZ0LmFtb3VudE1TVCkge1xyXG4gICAgICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlOiBcInBhdGNoX2RyYWZ0XCIsXHJcbiAgICAgICAgICAgIHBhdGNoOiB7XHJcbiAgICAgICAgICAgICAgYW1vdW50TVNUOiBuZXh0QW1vdW50TVNULFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwicGF0Y2hfZHJhZnRcIixcclxuICAgICAgICBwYXRjaDoge1xyXG4gICAgICAgICAgYW1vdW50TVNUOiBuZXh0QW1vdW50TVNULFxyXG4gICAgICAgICAgLi4uYnVpbGRFeGNoYW5nZVJhdGVQYXRjaEZyb21BbW91bnRNU1QoXHJcbiAgICAgICAgICAgIHN0YXRlLmRyYWZ0LnRvdGFsQW1vdW50LFxyXG4gICAgICAgICAgICBuZXh0QW1vdW50TVNULFxyXG4gICAgICAgICAgICBzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICAgIGVmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgICBzdGF0ZS5kcmFmdC5leGNoYW5nZVJhdGVcclxuICAgICAgICAgICksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhbW91bnRNU1RNYW51YWxseUVkaXRlZDogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW2VmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlLCBzdGF0ZS5kcmFmdC5hbW91bnRNU1QsIHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSwgc3RhdGUuZHJhZnQuZXhjaGFuZ2VSYXRlLCBzdGF0ZS5kcmFmdC50b3RhbEFtb3VudF1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXREcmFmdEV4Y2hhbmdlUmF0ZSA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgc2V0QW1vdW50TVNUSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIGNvbnN0IG5leHRFeGNoYW5nZVJhdGUgPSByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuZHJhZnQuZXhjaGFuZ2VSYXRlKTtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwicGF0Y2hfZHJhZnRcIixcclxuICAgICAgICBwYXRjaDoge1xyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlOiBuZXh0RXhjaGFuZ2VSYXRlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtzdGF0ZS5kcmFmdC5leGNoYW5nZVJhdGVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgY29tbWl0RHJhZnRFeGNoYW5nZVJhdGUgPSB1c2VDYWxsYmFjayhcclxuICAgICh2YWx1ZTogc3RyaW5nLCBjdXJyZW5jeUNvZGVPdmVycmlkZT86IHN0cmluZykgPT4ge1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgc2V0QW1vdW50TVNUSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIGNvbnN0IGVmZmVjdGl2ZUN1cnJlbmN5Q29kZSA9IGN1cnJlbmN5Q29kZU92ZXJyaWRlXHJcbiAgICAgICAgPyBub3JtYWxpemVDdXJyZW5jeUNvZGUoY3VycmVuY3lDb2RlT3ZlcnJpZGUpXHJcbiAgICAgICAgOiBzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGU7XHJcbiAgICAgIGNvbnN0IG5leHRFeGNoYW5nZVJhdGUgPSBmb3JtYXRFZGl0YWJsZUV4Y2hhbmdlUmF0ZShcclxuICAgICAgICByZXNvbHZlRXhjaGFuZ2VSYXRlRm9yU2V0dGxlbWVudChcclxuICAgICAgICAgIGVmZmVjdGl2ZUN1cnJlbmN5Q29kZSxcclxuICAgICAgICAgIGVmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgdmFsdWVcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcInBhdGNoX2RyYWZ0XCIsXHJcbiAgICAgICAgcGF0Y2g6IHtcclxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZTogbmV4dEV4Y2hhbmdlUmF0ZSxcclxuICAgICAgICAgIC4uLmJ1aWxkQW1vdW50TVNUUGF0Y2hGcm9tRXhjaGFuZ2VSYXRlKFxyXG4gICAgICAgICAgICBzdGF0ZS5kcmFmdC50b3RhbEFtb3VudCxcclxuICAgICAgICAgICAgbmV4dEV4Y2hhbmdlUmF0ZSxcclxuICAgICAgICAgICAgZWZmZWN0aXZlQ3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgICBlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgICAgICAgICAgc3RhdGUuYW1vdW50TVNUTWFudWFsbHlFZGl0ZWRcclxuICAgICAgICAgICksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW2VmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlLCBzdGF0ZS5hbW91bnRNU1RNYW51YWxseUVkaXRlZCwgc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlLCBzdGF0ZS5kcmFmdC50b3RhbEFtb3VudF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghaGVhZGVyIHx8IGlzTG9hZGluZykgcmV0dXJuO1xuICAgIGlmIChpc1NoZWV0TGlua1JlYWRPbmx5KSByZXR1cm47XG4gICAgaWYgKGhlYWRlci5zdGF0dXMgPT09IDEgJiYgIWFsbG93QXNzaWduZWREcmFmdEVkaXQpIHJldHVybjtcbiAgICBpZiAoIWNhbkVkaXRUaWNrZXQpIHtcbiAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R2FzdG9UeXBlSW52YWxpZChmYWxzZSk7XHJcbiAgICBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkKGZhbHNlKTtcclxuICAgIHNldFRvdGFsQW1vdW50SW52YWxpZChmYWxzZSk7XHJcbiAgICBzZXRBbW91bnRNU1RJbnZhbGlkKGZhbHNlKTtcclxuICAgIHNldEV4Y2hhbmdlUmF0ZUludmFsaWQoZmFsc2UpO1xyXG4gICAgZGlzcGF0Y2goeyB0eXBlOiBcImh5ZHJhdGVfZnJvbV9oZWFkZXJcIiwgaGVhZGVyLCBsaW5rZWRFeHBlbnNlTGluZSwgbG9jYWxDdXJyZW5jeUNvZGU6IGVmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlIH0pO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBcInBhdGNoX3N0YXRlXCIsXHJcbiAgICAgIHBhdGNoOiB7XHJcbiAgICAgICAgbW9kYWxFcnJvcjogXCJcIixcclxuICAgICAgICBpc0VkaXRpbmc6IHRydWUsXHJcbiAgICAgICAgc3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LCBbXHJcbiAgICBhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0LFxuICAgIGNhbkVkaXRUaWNrZXQsXG4gICAgZWZmZWN0aXZlTG9jYWxDdXJyZW5jeUNvZGUsXG4gICAgaGVhZGVyLFxuICAgIGlzU2hlZXRMaW5rUmVhZE9ubHksXG4gICAgaXNMb2FkaW5nLFxuICAgIGxpbmtlZEV4cGVuc2VMaW5lLFxuICAgIG9uRm9yYmlkZGVuLFxuICBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghc3RhdGUuaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBpZiAoIWhlYWRlcikge1xyXG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwicGF0Y2hfc3RhdGVcIiwgcGF0Y2g6IHsgaXNFZGl0aW5nOiBmYWxzZSB9IH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R2FzdG9UeXBlSW52YWxpZChmYWxzZSk7XHJcbiAgICBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkKGZhbHNlKTtcclxuICAgIHNldFRvdGFsQW1vdW50SW52YWxpZChmYWxzZSk7XHJcbiAgICBzZXRBbW91bnRNU1RJbnZhbGlkKGZhbHNlKTtcclxuICAgIHNldEV4Y2hhbmdlUmF0ZUludmFsaWQoZmFsc2UpO1xyXG4gICAgZGlzcGF0Y2goeyB0eXBlOiBcImh5ZHJhdGVfZnJvbV9oZWFkZXJcIiwgaGVhZGVyLCBsaW5rZWRFeHBlbnNlTGluZSwgbG9jYWxDdXJyZW5jeUNvZGU6IGVmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlIH0pO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBcInBhdGNoX3N0YXRlXCIsXHJcbiAgICAgIHBhdGNoOiB7XHJcbiAgICAgICAgaXNFZGl0aW5nOiBmYWxzZSxcclxuICAgICAgICBtb2RhbEVycm9yOiBcIlwiLFxyXG4gICAgICAgIHN0YXR1czogaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LCBbZWZmZWN0aXZlTG9jYWxDdXJyZW5jeUNvZGUsIGhlYWRlciwgbGlua2VkRXhwZW5zZUxpbmUsIHN0YXRlLmlzRWRpdGluZ10pO1xyXG5cclxuICBjb25zdCBjYW5PcGVuU2F2ZUNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBub3JtYWxpemVkRGVzY3JpcHRpb24gPSBTdHJpbmcoc3RhdGUuZHJhZnQuZGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbmN5Q29kZSA9IFN0cmluZyhzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBjb25zdCBwYXJzZWRUb3RhbEFtb3VudCA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChzdGF0ZS5kcmFmdC50b3RhbEFtb3VudCk7XHJcbiAgICBjb25zdCBwYXJzZWRBbW91bnRNU1QgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQoc3RhdGUuZHJhZnQuYW1vdW50TVNUKTtcclxuICAgIGNvbnN0IHBhcnNlZEV4Y2hhbmdlUmF0ZSA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChzdGF0ZS5kcmFmdC5leGNoYW5nZVJhdGUpO1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb25Jc1ZhbGlkID0gISFub3JtYWxpemVkRGVzY3JpcHRpb247XHJcbiAgICBjb25zdCBnYXN0b1R5cGVJc1ZhbGlkID0gaXNWYWxpZFJlcXVpcmVkR2FzdG9UeXBlKHN0YXRlLmRyYWZ0Lmdhc3RvVHlwZSk7XHJcbiAgICBjb25zdCBjdXJyZW5jeUlzVmFsaWQgPSAhIW5vcm1hbGl6ZWRDdXJyZW5jeUNvZGU7XHJcbiAgICBjb25zdCB0b3RhbEFtb3VudElzVmFsaWQgPSBwYXJzZWRUb3RhbEFtb3VudCAhPSBudWxsICYmIHBhcnNlZFRvdGFsQW1vdW50ID49IDA7XHJcbiAgICBjb25zdCByZXF1aXJlc0ZvcmVpZ25DdXJyZW5jeVNldHRsZW1lbnQgPSBpc0V4cGVuc2VMaW5lRm9yZWlnbkN1cnJlbmN5KG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUsIGVmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlKTtcclxuICAgIGNvbnN0IGhhc0ZvcmVpZ25DdXJyZW5jeVNldHRsZW1lbnQgPVxyXG4gICAgICAhcmVxdWlyZXNGb3JlaWduQ3VycmVuY3lTZXR0bGVtZW50IHx8XHJcbiAgICAgIChwYXJzZWRFeGNoYW5nZVJhdGUgIT0gbnVsbCAmJiBwYXJzZWRFeGNoYW5nZVJhdGUgPiAwKSB8fFxyXG4gICAgICAocGFyc2VkQW1vdW50TVNUICE9IG51bGwgJiYgcGFyc2VkQW1vdW50TVNUID4gMCk7XHJcblxyXG4gICAgc2V0RGVzY3JpcHRpb25JbnZhbGlkKCFkZXNjcmlwdGlvbklzVmFsaWQpO1xyXG4gICAgc2V0R2FzdG9UeXBlSW52YWxpZCghZ2FzdG9UeXBlSXNWYWxpZCk7XHJcbiAgICBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkKCFjdXJyZW5jeUlzVmFsaWQpO1xyXG4gICAgc2V0VG90YWxBbW91bnRJbnZhbGlkKCF0b3RhbEFtb3VudElzVmFsaWQpO1xyXG4gICAgc2V0RXhjaGFuZ2VSYXRlSW52YWxpZCghaGFzRm9yZWlnbkN1cnJlbmN5U2V0dGxlbWVudCk7XHJcbiAgICBzZXRBbW91bnRNU1RJbnZhbGlkKCFoYXNGb3JlaWduQ3VycmVuY3lTZXR0bGVtZW50KTtcclxuXHJcbiAgICBpZiAoZGVzY3JpcHRpb25Jc1ZhbGlkICYmIGdhc3RvVHlwZUlzVmFsaWQgJiYgY3VycmVuY3lJc1ZhbGlkICYmIHRvdGFsQW1vdW50SXNWYWxpZCAmJiBoYXNGb3JlaWduQ3VycmVuY3lTZXR0bGVtZW50KSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1lc3NhZ2UgPSAhZGVzY3JpcHRpb25Jc1ZhbGlkXHJcbiAgICAgID8gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9EZXNjcmlwdGlvblJlcXVpcmVkXCIsIFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWQuXCIpXHJcbiAgICAgIDogIWdhc3RvVHlwZUlzVmFsaWRcclxuICAgICAgICA/IGluZFQoXCJUaWNrZXRzX1ZhbGlkYXRpb25fQ2F0ZWdvcnlSZXF1aXJlZFwiLCBcIkNhdGVnb3J5IGlzIHJlcXVpcmVkLlwiKVxyXG4gICAgICAgIDogIWN1cnJlbmN5SXNWYWxpZFxyXG4gICAgICAgICAgPyBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0N1cnJlbmN5UmVxdWlyZWRcIiwgXCJDdXJyZW5jeSBpcyByZXF1aXJlZC5cIilcclxuICAgICAgICAgIDogIXRvdGFsQW1vdW50SXNWYWxpZFxyXG4gICAgICAgICAgICA/IGluZFQoXCJUaWNrZXRzX1ZhbGlkYXRpb25fVG90YWxBbW91bnRSZXF1aXJlZFwiLCBcIlRvdGFsIGFtb3VudCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAwLlwiKVxyXG4gICAgICAgICAgICA6IGluZFQoXHJcbiAgICAgICAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTGluZV9WYWxpZGF0aW9uX0ZvcmVpZ25DdXJyZW5jeVNldHRsZW1lbnRcIixcclxuICAgICAgICAgICAgICAgIFwiRm9yZWlnbiBjdXJyZW5jeSBsaW5lcyByZXF1aXJlIGFuIGV4Y2hhbmdlIHJhdGUgZ3JlYXRlciB0aGFuIDAgb3IgYSByZWltYnVyc2VtZW50IGFtb3VudC5cIlxyXG4gICAgICAgICAgICAgICk7XHJcblxyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBcInBhdGNoX3N0YXRlXCIsXHJcbiAgICAgIHBhdGNoOiB7XHJcbiAgICAgICAgbW9kYWxFcnJvcjogbWVzc2FnZSxcclxuICAgICAgICBzdGF0dXM6IG1lc3NhZ2UsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgaWYgKCFkZXNjcmlwdGlvbklzVmFsaWQpIHtcclxuICAgICAgICBkZXNjcmlwdGlvbklucHV0UmVmLmN1cnJlbnQ/LmZvY3VzKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWdhc3RvVHlwZUlzVmFsaWQpIHtcclxuICAgICAgICBnYXN0b1R5cGVJbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFjdXJyZW5jeUlzVmFsaWQpIHtcclxuICAgICAgICBjdXJyZW5jeUlucHV0UmVmLmN1cnJlbnQ/LmZvY3VzKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXRvdGFsQW1vdW50SXNWYWxpZCkge1xyXG4gICAgICAgIHRvdGFsQW1vdW50SW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghaGFzRm9yZWlnbkN1cnJlbmN5U2V0dGxlbWVudCkge1xyXG4gICAgICAgIGV4Y2hhbmdlUmF0ZUlucHV0UmVmLmN1cnJlbnQ/LmZvY3VzKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LCBbXHJcbiAgICBlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgIHN0YXRlLmRyYWZ0LmFtb3VudE1TVCxcclxuICAgIHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSxcclxuICAgIHN0YXRlLmRyYWZ0LmRlc2NyaXB0aW9uLFxyXG4gICAgc3RhdGUuZHJhZnQuZXhjaGFuZ2VSYXRlLFxyXG4gICAgc3RhdGUuZHJhZnQuZ2FzdG9UeXBlLFxyXG4gICAgc3RhdGUuZHJhZnQudG90YWxBbW91bnQsXHJcbiAgXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBidXN5OiBzdGF0ZS5idXN5LFxyXG4gICAgc3RhdHVzOiBzdGF0ZS5zdGF0dXMsXHJcbiAgICBpc0VkaXRpbmc6IHN0YXRlLmlzRWRpdGluZyxcclxuICAgIG1vZGFsRXJyb3I6IHN0YXRlLm1vZGFsRXJyb3IsXHJcbiAgICBsaW5lUGFnZTogc3RhdGUubGluZVBhZ2UsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uOiBzdGF0ZS5kcmFmdC5kZXNjcmlwdGlvbixcclxuICAgIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICAgIGRlc2NyaXB0aW9uSW5wdXRSZWYsXHJcbiAgICBkcmFmdEdhc3RvVHlwZTogc3RhdGUuZHJhZnQuZ2FzdG9UeXBlLFxyXG4gICAgZ2FzdG9UeXBlSW52YWxpZCxcclxuICAgIGdhc3RvVHlwZUlucHV0UmVmLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSxcclxuICAgIGN1cnJlbmN5Q29kZUludmFsaWQsXHJcbiAgICBjdXJyZW5jeUlucHV0UmVmLFxyXG4gICAgZHJhZnRUb3RhbEFtb3VudDogc3RhdGUuZHJhZnQudG90YWxBbW91bnQsXHJcbiAgICB0b3RhbEFtb3VudEludmFsaWQsXHJcbiAgICB0b3RhbEFtb3VudElucHV0UmVmLFxyXG4gICAgZHJhZnRBbW91bnRNU1Q6IHN0YXRlLmRyYWZ0LmFtb3VudE1TVCxcclxuICAgIGFtb3VudE1TVEludmFsaWQsXHJcbiAgICBhbW91bnRNU1RJbnB1dFJlZixcclxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlOiBzdGF0ZS5kcmFmdC5leGNoYW5nZVJhdGUsXHJcbiAgICBleGNoYW5nZVJhdGVJbnZhbGlkLFxyXG4gICAgZXhjaGFuZ2VSYXRlSW5wdXRSZWYsXHJcbiAgICBsb2NhbEN1cnJlbmN5Q29kZTogZWZmZWN0aXZlTG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICBkcmFmdFRyYW5zRGF0ZTogc3RhdGUuZHJhZnQudHJhbnNEYXRlLFxyXG4gICAgZHJhZnRUaWNrZXRUaW1lOiBzdGF0ZS5kcmFmdC50aWNrZXRUaW1lLFxyXG4gICAgZHJhZnRDb21lbnRhcmlvOiBzdGF0ZS5kcmFmdC5jb21lbnRhcmlvLFxyXG4gICAgZHJhZnRVcmxGaWxlOiBzdGF0ZS5kcmFmdC51cmxGaWxlLFxyXG4gICAgZHJhZnRGaWxlTmFtZTogc3RhdGUuZHJhZnQuZmlsZU5hbWUsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldExpbmVQYWdlLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgIHNldERyYWZ0R2FzdG9UeXBlLFxyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBzZXREcmFmdFRvdGFsQW1vdW50LFxyXG4gICAgc2V0RHJhZnRBbW91bnRNU1QsXHJcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIGNvbW1pdERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQge1xyXG4gIG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIHJlc29sdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxuICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG4vLyBQYXJzZXMgcm91dGUgY29udGV4dCBvbmNlIGFuZCBleHBvc2VzIHN0YWJsZSBmbGFncyBmb3IgdGlja2V0IGRldGFpbCBmbG93cy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQgPSAoKSA9PiB7XHJcbiAgY29uc3Qgcm91dGVQYXJhbXMgPSB1c2VNZW1vKCgpID0+IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCksIFtdKTtcclxuICBjb25zdCBmaWxlSWQgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfVElDS0VUX0ZJTEVfSURfXyksIFtdKTtcclxuICBjb25zdCBhdXRvRWRpdE1vZGUgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcIm1vZGVcIikpLnRvTG93ZXJDYXNlKCkgPT09IFwiZWRpdFwiLCBbcm91dGVQYXJhbXNdKTtcclxuICBjb25zdCByb3V0ZU9yaWdpbiA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwib3JpZ2luXCIpKS50b0xvd2VyQ2FzZSgpLCBbcm91dGVQYXJhbXNdKTtcclxuICBjb25zdCByb3V0ZVNoZWV0SWQgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcInNoZWV0SWRcIikpLCBbcm91dGVQYXJhbXNdKTtcclxuICBjb25zdCByb3V0ZVNoZWV0TGluZVJlY0lkID0gdXNlTWVtbyhcclxuICAgICgpID0+IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcInNoZWV0TGluZVJlY0lkXCIpIHx8IHJvdXRlUGFyYW1zLmdldChcImxpbmVSZWNJZFwiKSksXHJcbiAgICBbcm91dGVQYXJhbXNdXHJcbiAgKTtcclxuICBjb25zdCBleHBsaWNpdFJldHVybkNvbnRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT5cclxuICAgICAgbm9ybWFsaXplRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoe1xyXG4gICAgICAgIGZpbGVJZCxcclxuICAgICAgICBvcmlnaW46IHJvdXRlT3JpZ2luLFxyXG4gICAgICAgIHNoZWV0SWQ6IHJvdXRlU2hlZXRJZCxcclxuICAgICAgICBzaGVldExpbmVSZWNJZDogcm91dGVTaGVldExpbmVSZWNJZCxcclxuICAgICAgfSksXHJcbiAgICBbZmlsZUlkLCByb3V0ZU9yaWdpbiwgcm91dGVTaGVldElkLCByb3V0ZVNoZWV0TGluZVJlY0lkXVxyXG4gICk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWV4cGxpY2l0UmV0dXJuQ29udGV4dCkgcmV0dXJuO1xyXG4gICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KGV4cGxpY2l0UmV0dXJuQ29udGV4dCk7XHJcbiAgfSwgW2V4cGxpY2l0UmV0dXJuQ29udGV4dF0pO1xyXG5cclxuICByZXR1cm4gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCB0aWNrZXRSZXR1cm5Db250ZXh0ID0gcmVzb2x2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KGZpbGVJZCwgZXhwbGljaXRSZXR1cm5Db250ZXh0KTtcclxuICAgIGNvbnN0IGRldGFpbE9yaWdpbiA9IHRpY2tldFJldHVybkNvbnRleHQ/Lm9yaWdpbiB8fCByb3V0ZU9yaWdpbjtcclxuICAgIGNvbnN0IGNvbnRleHRTaGVldElkID0gdGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCB8fCByb3V0ZVNoZWV0SWQ7XHJcbiAgICBjb25zdCBjb250ZXh0TGluZVJlY0lkID0gdGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRMaW5lUmVjSWQgfHwgcm91dGVTaGVldExpbmVSZWNJZDtcclxuICAgIGNvbnN0IGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSA9IGRldGFpbE9yaWdpbiA9PT0gXCJzaGVldC1jcmVhdGVcIjtcclxuICAgIGNvbnN0IGlzRnJvbUV4cGVuc2VMaW5lID0gZGV0YWlsT3JpZ2luID09PSBcImV4cGVuc2UtbGluZVwiICYmICEhY29udGV4dFNoZWV0SWQgJiYgISFjb250ZXh0TGluZVJlY0lkO1xyXG4gICAgY29uc3QgaXNGcm9tU2hlZXRMaW5rID0gZGV0YWlsT3JpZ2luID09PSBcInNoZWV0LWxpbmtcIiAmJiAhIWNvbnRleHRTaGVldElkO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGF1dG9FZGl0TW9kZSxcclxuICAgICAgZGV0YWlsT3JpZ2luLFxyXG4gICAgICBjb250ZXh0U2hlZXRJZCxcclxuICAgICAgY29udGV4dExpbmVSZWNJZCxcclxuICAgICAgaXNGcm9tRXhwZW5zZVNoZWV0Q3JlYXRlLFxyXG4gICAgICBpc0Zyb21FeHBlbnNlTGluZSxcclxuICAgICAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gICAgICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gICAgfTtcclxuICB9LCBbYXV0b0VkaXRNb2RlLCBleHBsaWNpdFJldHVybkNvbnRleHQsIGZpbGVJZCwgcm91dGVPcmlnaW4sIHJvdXRlU2hlZXRJZCwgcm91dGVTaGVldExpbmVSZWNJZF0pO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgfSBmcm9tIFwiLi4vLi4vZXhwZW5zZUZvcm1hdHRlcnMudHNcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50cy9leHBlbnNlVGlja2V0U3RhdHVzQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXlBcmdzID0ge1xyXG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw7XHJcbiAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcclxuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0VG90YWxBbW91bnQ6IHN0cmluZztcclxuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIGRyYWZ0VGlja2V0VGltZTogc3RyaW5nO1xyXG4gIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgZ2FzdG9UeXBlTGFiZWxNYXA6IE1hcDxzdHJpbmcsIHN0cmluZz47XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXRFeHBlbnNlRGlzcGxheVRpbWUgPSAocmF3Pzogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCB2YWx1ZSA9IHNhZmVUZXh0KHJhdyk7XHJcbiAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PT0gXCIwXCIpIHJldHVybiBcIlwiO1xyXG5cclxuICBjb25zdCBzZWNvbmRzVmFsdWUgPSBOdW1iZXIodmFsdWUpO1xyXG4gIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHNlY29uZHNWYWx1ZSkgJiYgc2Vjb25kc1ZhbHVlID49IDAgJiYgc2Vjb25kc1ZhbHVlIDw9IDg2Mzk5KSB7XHJcbiAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3Ioc2Vjb25kc1ZhbHVlIC8gMzYwMCk7XHJcbiAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2Vjb25kc1ZhbHVlICUgMzYwMCkgLyA2MCk7XHJcbiAgICBjb25zdCBzZWNvbmRzID0gc2Vjb25kc1ZhbHVlICUgNjA7XHJcbiAgICByZXR1cm4gW2hvdXJzLCBtaW51dGVzLCBzZWNvbmRzXS5tYXAoKGVudHJ5KSA9PiBTdHJpbmcoZW50cnkpLnBhZFN0YXJ0KDIsIFwiMFwiKSkuam9pbihcIjpcIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBtYXRjaCA9IHZhbHVlLm1hdGNoKC9eKFxcZHsxLDJ9KTooWzAtNV1cXGQpKD86OihbMC01XVxcZCkpPyQvKTtcclxuICBpZiAoIW1hdGNoKSByZXR1cm4gdmFsdWU7XHJcblxyXG4gIGNvbnN0IGhvdXJzID0gTnVtYmVyLnBhcnNlSW50KG1hdGNoWzFdIHx8IFwiXCIsIDEwKTtcclxuICBpZiAoIU51bWJlci5pc0ludGVnZXIoaG91cnMpIHx8IGhvdXJzIDwgMCB8fCBob3VycyA+IDIzKSByZXR1cm4gdmFsdWU7XHJcblxyXG4gIHJldHVybiBgJHtTdHJpbmcoaG91cnMpLnBhZFN0YXJ0KDIsIFwiMFwiKX06JHttYXRjaFsyXX06JHttYXRjaFszXSB8fCBcIjAwXCJ9YDtcclxufTtcclxuXHJcbi8vIENlbnRyYWxpemVzIGRpc3BsYXktb25seSB2YWx1ZXMgc28gdGhlIHBhZ2UgY29udGFpbmVyIHN0YXlzIGZvY3VzZWQgb24gZmxvdyB3aXJpbmcuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsRGlzcGxheSA9ICh7XHJcbiAgaGVhZGVyLFxyXG4gIGRyYWZ0R2FzdG9UeXBlLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0VG90YWxBbW91bnQsXHJcbiAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgZHJhZnRUaWNrZXRUaW1lLFxyXG4gIGRyYWZ0RmlsZU5hbWUsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGdhc3RvVHlwZUxhYmVsTWFwLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsRGlzcGxheUFyZ3MpID0+IHtcclxuICBjb25zdCBwYWdpbmF0aW9uTGFiZWxzID0gdXNlTWVtbyhcclxuICAgICgpID0+ICh7XHJcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXHJcbiAgICAgIHByZXY6IGluZFQoXCJIaXN0b3J5X1BhZ2VfUHJldlwiLCBcIlByZXZpb3VzXCIpLFxyXG4gICAgICBuZXh0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpLFxyXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxyXG4gICAgfSksXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHByZXZpZXdBbHRUZXh0ID0gdXNlTWVtbyhcclxuICAgICgpID0+IHNhZmVUZXh0KGlzRWRpdGluZyA/IGRyYWZ0RmlsZU5hbWUgOiBoZWFkZXI/LmZpbGVOYW1lKSB8fCBpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIiksXHJcbiAgICBbZHJhZnRGaWxlTmFtZSwgaGVhZGVyPy5maWxlTmFtZSwgaXNFZGl0aW5nXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHN0YXR1c0xhYmVsID0gdXNlTWVtbygoKSA9PiBnZXRFeHBlbnNlVGlja2V0U3RhdHVzTGFiZWwoaGVhZGVyPy5zdGF0dXMpLCBbaGVhZGVyPy5zdGF0dXNdKTtcclxuXHJcbiAgY29uc3QgZ2FzdG9UeXBlTGFiZWwgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IGN1cnJlbnRHYXN0b1R5cGUgPSBpc0VkaXRpbmcgPyBkcmFmdEdhc3RvVHlwZSA6IGhlYWRlcj8uZ2FzdG9UeXBlID09PSBudWxsID8gXCJcIiA6IFN0cmluZyhoZWFkZXI/Lmdhc3RvVHlwZSA/PyBcIlwiKTtcclxuICAgIGlmICghY3VycmVudEdhc3RvVHlwZSkge1xyXG4gICAgICByZXR1cm4gaW5kVChcIkNvbW1vbl9Ob3RBdmFpbGFibGVcIiwgXCJOL0FcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2FzdG9UeXBlTGFiZWxNYXAuZ2V0KFN0cmluZyhjdXJyZW50R2FzdG9UeXBlKSkgfHwgU3RyaW5nKGN1cnJlbnRHYXN0b1R5cGUpO1xyXG4gIH0sIFtkcmFmdEdhc3RvVHlwZSwgZ2FzdG9UeXBlTGFiZWxNYXAsIGhlYWRlcj8uZ2FzdG9UeXBlLCBpc0VkaXRpbmddKTtcclxuXHJcbiAgY29uc3QgdG90YWxBbW91bnRUZXh0ID0gdXNlTWVtbyhcclxuICAgICgpID0+IHtcclxuICAgICAgY29uc3QgZWRpdGFibGVUb3RhbEFtb3VudCA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChkcmFmdFRvdGFsQW1vdW50KTtcbiAgICAgIHJldHVybiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koXG4gICAgICAgIGlzRWRpdGluZyAmJiBlZGl0YWJsZVRvdGFsQW1vdW50ICE9IG51bGxcbiAgICAgICAgICA/IGVkaXRhYmxlVG90YWxBbW91bnRcbiAgICAgICAgICA6IGhlYWRlcj8udG90YWxBbW91bnRDdXJyZW5jeSA/PyBoZWFkZXI/LnRvdGFsQW1vdW50ID8/IG51bGwsXG4gICAgICAgIChpc0VkaXRpbmcgPyBkcmFmdEN1cnJlbmN5Q29kZSA6IGhlYWRlcj8uY3VycmVuY3lDb2RlKSB8fCBoZWFkZXI/LmN1cnJlbmN5Q29kZVxuICAgICAgKTtcbiAgICB9LFxuICAgIFtkcmFmdEN1cnJlbmN5Q29kZSwgZHJhZnRUb3RhbEFtb3VudCwgaGVhZGVyPy5jdXJyZW5jeUNvZGUsIGhlYWRlcj8udG90YWxBbW91bnQsIGhlYWRlcj8udG90YWxBbW91bnRDdXJyZW5jeSwgaXNFZGl0aW5nXVxuICApO1xuXHJcbiAgY29uc3QgdHJhbnNEYXRlVGV4dCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoaXNFZGl0aW5nID8gZHJhZnRUcmFuc0RhdGUgOiBoZWFkZXI/LnRpY2tldERhdGUgfHwgaGVhZGVyPy50cmFuc0RhdGUsIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiKSxcclxuICAgIFtkcmFmdFRyYW5zRGF0ZSwgaGVhZGVyPy50aWNrZXREYXRlLCBoZWFkZXI/LnRyYW5zRGF0ZSwgaXNFZGl0aW5nXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHRpY2tldFRpbWVUZXh0ID0gdXNlTWVtbyhcclxuICAgICgpID0+IGZvcm1hdEV4cGVuc2VEaXNwbGF5VGltZShpc0VkaXRpbmcgPyBkcmFmdFRpY2tldFRpbWUgOiBoZWFkZXI/LnRpY2tldFRpbWUpLFxyXG4gICAgW2RyYWZ0VGlja2V0VGltZSwgaGVhZGVyPy50aWNrZXRUaW1lLCBpc0VkaXRpbmddXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHBhZ2luYXRpb25MYWJlbHMsXHJcbiAgICBwcmV2aWV3QWx0VGV4dCxcclxuICAgIHN0YXR1c0xhYmVsLFxyXG4gICAgZ2FzdG9UeXBlTGFiZWwsXHJcbiAgICB0b3RhbEFtb3VudFRleHQsXHJcbiAgICB0cmFuc0RhdGVUZXh0LFxyXG4gICAgdGlja2V0VGltZVRleHQsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZUFyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbEVycm9yOiBzdHJpbmc7XHJcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0U3RhdHVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIEVuY2Fwc3VsYXRlcyBjb25maXJtIG1vZGFsIHN0YXRlIHNvIHRoZSBwYWdlIGNvbnRhaW5lciBzdGF5cyBmb2N1c2VkIG9uIGZsb3cgd2lyaW5nLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZSA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbEVycm9yLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgc2V0U3RhdHVzLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsQ29uZmlybVN0YXRlQXJncykgPT4ge1xyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xyXG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcclxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm0sIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1c10pO1xyXG5cclxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcclxuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XHJcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcclxuICAgIDogIWJ1c3kgJiYgbW9kYWxFcnJvclxyXG4gICAgICA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKVxyXG4gICAgICA6IG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdm9pZCBoYW5kbGVNb2RhbENvbmZpcm0oKTtcclxuICB9LCBbYnVzeSwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm0sIG1vZGFsRXJyb3JdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG1vZGFsLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgICBtb2RhbExvYWRpbmdUZXh0LFxyXG4gICAgbW9kYWxDYW5jZWxUZXh0LFxyXG4gICAgbW9kYWxDb25maXJtVGV4dCxcclxuICAgIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBSZWZPYmplY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHtcclxuICBhcHBlbmRFeHBlbnNlVGlja2V0UmV0dXJuUXVlcnksXHJcbiAgYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwsXHJcbiAgdHlwZSBFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBjb250ZXh0U2hlZXRJZDogc3RyaW5nO1xyXG4gIGlzRnJvbVNoZWV0TGluazogYm9vbGVhbjtcclxuICBoZWFkZXJFeHBlbnNlU2hlZXRJZDogc3RyaW5nO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBjYW5PcGVuU2F2ZUNvbmZpcm06ICgpID0+IGJvb2xlYW47XHJcbiAgaGFuZGxlUGVyc2lzdEhlYWRlckRyYWZ0OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGJ5cGFzc1dvcmtmbG93R3VhcmQ6IGJvb2xlYW47XHJcbiAgbGluZUNvbnRhaW5lclJlZjogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgb3BlblByZXZpZXc6ICgpID0+IFByb21pc2U8dm9pZD47XHJcbiAgdGlja2V0UmV0dXJuQ29udGV4dD86IEV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0IHwgbnVsbDtcclxufTtcclxuXHJcbi8vIEdyb3VwcyB0aWNrZXQgZGV0YWlsIG5hdmlnYXRpb24gYW5kIGxpbmUtY2FyZCBpbnRlcmFjdGlvbnMgYmVoaW5kIHN0YWJsZSBjYWxsYmFja3MuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsSW50ZXJhY3Rpb25zID0gKHtcclxuICBidXN5LFxyXG4gIGZpbGVJZCxcclxuICBjb250ZXh0U2hlZXRJZCxcclxuICBpc0Zyb21TaGVldExpbmssXHJcbiAgaGVhZGVyRXhwZW5zZVNoZWV0SWQsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQsXHJcbiAgYnlwYXNzV29ya2Zsb3dHdWFyZCxcclxuICBsaW5lQ29udGFpbmVyUmVmLFxyXG4gIG9wZW5QcmV2aWV3LFxyXG4gIHRpY2tldFJldHVybkNvbnRleHQsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnNBcmdzKSA9PiB7XHJcbiAgY29uc3QgcGVyc2lzdEhlYWRlckRyYWZ0SWZOZWVkZWQgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoIWlzRWRpdGluZykge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWNhbk9wZW5TYXZlQ29uZmlybSgpKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaGFuZGxlUGVyc2lzdEhlYWRlckRyYWZ0KCk7XHJcbiAgfSwgW2Nhbk9wZW5TYXZlQ29uZmlybSwgaGFuZGxlUGVyc2lzdEhlYWRlckRyYWZ0LCBpc0VkaXRpbmddKTtcclxuXHJcbiAgY29uc3Qgb3BlbkxpbmVEZXRhaWwgPSB1c2VDYWxsYmFjayhcclxuICAgIGFzeW5jIChyYXdMaW5lUmVjSWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICBpZiAoaXNGcm9tU2hlZXRMaW5rKSByZXR1cm47XHJcbiAgICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICAgIGNvbnN0IGxpbmVSZWNJZCA9IHNhZmVUZXh0KHJhd0xpbmVSZWNJZCk7XHJcbiAgICAgIGlmICghbGluZVJlY0lkIHx8ICFmaWxlSWQpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IHNob3VsZE9wZW5JbkVkaXRNb2RlID0gaXNFZGl0aW5nO1xyXG4gICAgICBpZiAoc2hvdWxkT3BlbkluRWRpdE1vZGUpIHtcclxuICAgICAgICBjb25zdCB1cGRhdGVPayA9IGF3YWl0IHBlcnNpc3RIZWFkZXJEcmFmdElmTmVlZGVkKCk7XHJcbiAgICAgICAgaWYgKCF1cGRhdGVPaykge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgbGluZVJlY0lkLFxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKHNob3VsZE9wZW5JbkVkaXRNb2RlKSB7XHJcbiAgICAgICAgcXVlcnkuc2V0KFwibW9kZVwiLCBcImVkaXRcIik7XHJcbiAgICAgIH1cclxuICAgICAgYXBwZW5kRXhwZW5zZVRpY2tldFJldHVyblF1ZXJ5KHF1ZXJ5LCB0aWNrZXRSZXR1cm5Db250ZXh0KTtcclxuXHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldExpbmVEZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcclxuICAgICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxyXG4gICAgICAgIGJ5cGFzc0d1YXJkT25jZTogc2hvdWxkT3BlbkluRWRpdE1vZGUgfHwgYnlwYXNzV29ya2Zsb3dHdWFyZCxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBidXN5LFxyXG4gICAgICBieXBhc3NXb3JrZmxvd0d1YXJkLFxyXG4gICAgICBmaWxlSWQsXHJcbiAgICAgIGlzRWRpdGluZyxcclxuICAgICAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gICAgICBwZXJzaXN0SGVhZGVyRHJhZnRJZk5lZWRlZCxcclxuICAgICAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCBvcGVuQ3JlYXRlTGluZURldGFpbCA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChpc0Zyb21TaGVldExpbmspIHJldHVybjtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHVwZGF0ZU9rID0gYXdhaXQgcGVyc2lzdEhlYWRlckRyYWZ0SWZOZWVkZWQoKTtcclxuICAgIGlmICghdXBkYXRlT2spIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgIGZpbGVJZCxcclxuICAgICAgbW9kZTogXCJjcmVhdGVcIixcclxuICAgIH0pO1xyXG4gICAgYXBwZW5kRXhwZW5zZVRpY2tldFJldHVyblF1ZXJ5KHF1ZXJ5LCB0aWNrZXRSZXR1cm5Db250ZXh0KTtcclxuXHJcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXRMaW5lRGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXHJcbiAgICAgIGJ5cGFzc0d1YXJkT25jZTogaXNFZGl0aW5nIHx8IGJ5cGFzc1dvcmtmbG93R3VhcmQsXHJcbiAgICB9KTtcclxuICB9LCBbYnVzeSwgYnlwYXNzV29ya2Zsb3dHdWFyZCwgZmlsZUlkLCBpc0VkaXRpbmcsIGlzRnJvbVNoZWV0TGluaywgcGVyc2lzdEhlYWRlckRyYWZ0SWZOZWVkZWQsIHRpY2tldFJldHVybkNvbnRleHRdKTtcclxuXHJcbiAgY29uc3QgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgPSB1c2VDYWxsYmFjayhcclxuICAgICh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xyXG4gICAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICAgICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XHJcbiAgICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcclxuICAgICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcclxuICAgICAgaWYgKCFsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcclxuICAgICAgcmV0dXJuIGNhcmQ7XHJcbiAgICB9LFxyXG4gICAgW2xpbmVDb250YWluZXJSZWZdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb3BlbkZpbGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICB2b2lkIG9wZW5QcmV2aWV3KCk7XHJcbiAgfSwgW29wZW5QcmV2aWV3XSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoaXNGcm9tU2hlZXRMaW5rKSByZXR1cm47XHJcbiAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQgfHwgaGVhZGVyRXhwZW5zZVNoZWV0SWQgfHwgY29udGV4dFNoZWV0SWQpO1xyXG4gICAgaWYgKCFzYWZlU2hlZXRJZCkgcmV0dXJuO1xyXG5cclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsKHNhZmVTaGVldElkKSwge1xyXG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcclxuICAgIH0pO1xyXG4gIH0sIFtjb250ZXh0U2hlZXRJZCwgaGVhZGVyRXhwZW5zZVNoZWV0SWQsIGlzRWRpdGluZywgaXNGcm9tU2hlZXRMaW5rLCB0aWNrZXRSZXR1cm5Db250ZXh0XSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBvcGVuQ3JlYXRlTGluZURldGFpbCxcclxuICAgIG9wZW5MaW5lRGV0YWlsLFxyXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXHJcbiAgICBvcGVuRmlsZSxcclxuICAgIGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeVNldHRsZW1lbnRGaWVsZHMgZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5U2V0dGxlbWVudEZpZWxkcy50c3hcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldEN1cnJlbmN5U2V0dGxlbWVudEZpZWxkc1Byb3BzID0ge1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBleHBlbnNlQ3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZXhwZW5zZUN1cnJlbmN5SW52YWxpZDogYm9vbGVhbjtcclxuICBleHBlbnNlQ3VycmVuY3lJbnB1dFJlZjogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIGxvY2FsQ3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZXhjaGFuZ2VSYXRlOiBzdHJpbmc7XHJcbiAgZXhjaGFuZ2VSYXRlSW52YWxpZDogYm9vbGVhbjtcclxuICBleGNoYW5nZVJhdGVJbnB1dFJlZjogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlOiBzdHJpbmc7XHJcbiAgYW1vdW50Q3VycmVuY3k6IHN0cmluZztcclxuICBhbW91bnRDdXJyZW5jeUludmFsaWQ6IGJvb2xlYW47XHJcbiAgYW1vdW50Q3VycmVuY3lJbnB1dFJlZjogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIHJlaW1idXJzZW1lbnRBbW91bnQ6IHN0cmluZztcclxuICByZWltYnVyc2VtZW50QW1vdW50SW52YWxpZDogYm9vbGVhbjtcclxuICByZWltYnVyc2VtZW50QW1vdW50SW5wdXRSZWY6IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICBvbkV4cGVuc2VDdXJyZW5jeUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25FeGNoYW5nZVJhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRXhjaGFuZ2VSYXRlQ29tbWl0PzogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25BbW91bnRDdXJyZW5jeUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25SZWltYnVyc2VtZW50QW1vdW50Q2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIEtlZXBzIHRpY2tldCBkZXRhaWwgd2lyZWQgdG8gdGhlIHNhbWUgc2V0dGxlbWVudCBjb21wb25lbnQgdXNlZCBieSBleHBlbnNlIGxpbmVzLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0Q3VycmVuY3lTZXR0bGVtZW50RmllbGRzID0gKHtcclxuICBpc0VkaXRpbmcsXHJcbiAgZXhwZW5zZUN1cnJlbmN5Q29kZSxcclxuICBleHBlbnNlQ3VycmVuY3lJbnZhbGlkLFxyXG4gIGV4cGVuc2VDdXJyZW5jeUlucHV0UmVmLFxyXG4gIGxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gIGV4Y2hhbmdlUmF0ZSxcclxuICBleGNoYW5nZVJhdGVJbnZhbGlkLFxyXG4gIGV4Y2hhbmdlUmF0ZUlucHV0UmVmLFxyXG4gIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlLFxyXG4gIGFtb3VudEN1cnJlbmN5LFxyXG4gIGFtb3VudEN1cnJlbmN5SW52YWxpZCxcclxuICBhbW91bnRDdXJyZW5jeUlucHV0UmVmLFxyXG4gIHJlaW1idXJzZW1lbnRBbW91bnQsXHJcbiAgcmVpbWJ1cnNlbWVudEFtb3VudEludmFsaWQsXHJcbiAgcmVpbWJ1cnNlbWVudEFtb3VudElucHV0UmVmLFxyXG4gIG9uRXhwZW5zZUN1cnJlbmN5Q2hhbmdlLFxyXG4gIG9uRXhjaGFuZ2VSYXRlQ2hhbmdlLFxyXG4gIG9uRXhjaGFuZ2VSYXRlQ29tbWl0LFxyXG4gIG9uQW1vdW50Q3VycmVuY3lDaGFuZ2UsXHJcbiAgb25SZWltYnVyc2VtZW50QW1vdW50Q2hhbmdlLFxyXG59OiBFeHBlbnNlVGlja2V0Q3VycmVuY3lTZXR0bGVtZW50RmllbGRzUHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPEV4cGVuc2VDdXJyZW5jeVNldHRsZW1lbnRGaWVsZHNcclxuICAgICAgaXNFZGl0aW5nPXtpc0VkaXRpbmd9XHJcbiAgICAgIGV4cGVuc2VDdXJyZW5jeUNvZGU9e2V4cGVuc2VDdXJyZW5jeUNvZGV9XHJcbiAgICAgIGV4cGVuc2VDdXJyZW5jeUludmFsaWQ9e2V4cGVuc2VDdXJyZW5jeUludmFsaWR9XHJcbiAgICAgIGV4cGVuc2VDdXJyZW5jeUlucHV0UmVmPXtleHBlbnNlQ3VycmVuY3lJbnB1dFJlZn1cclxuICAgICAgbG9jYWxDdXJyZW5jeUNvZGU9e2xvY2FsQ3VycmVuY3lDb2RlfVxyXG4gICAgICBleGNoYW5nZVJhdGU9e2V4Y2hhbmdlUmF0ZX1cclxuICAgICAgZXhjaGFuZ2VSYXRlSW52YWxpZD17ZXhjaGFuZ2VSYXRlSW52YWxpZH1cclxuICAgICAgZXhjaGFuZ2VSYXRlSW5wdXRSZWY9e2V4Y2hhbmdlUmF0ZUlucHV0UmVmfVxyXG4gICAgICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZT17ZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2V9XHJcbiAgICAgIGFtb3VudEN1cnJlbmN5PXthbW91bnRDdXJyZW5jeX1cclxuICAgICAgYW1vdW50Q3VycmVuY3lNb2RlPVwiZWRpdGFibGVcIlxyXG4gICAgICBhbW91bnRDdXJyZW5jeUludmFsaWQ9e2Ftb3VudEN1cnJlbmN5SW52YWxpZH1cclxuICAgICAgYW1vdW50Q3VycmVuY3lJbnB1dFJlZj17YW1vdW50Q3VycmVuY3lJbnB1dFJlZn1cclxuICAgICAgcmVpbWJ1cnNlbWVudEFtb3VudD17cmVpbWJ1cnNlbWVudEFtb3VudH1cclxuICAgICAgcmVpbWJ1cnNlbWVudEFtb3VudEludmFsaWQ9e3JlaW1idXJzZW1lbnRBbW91bnRJbnZhbGlkfVxyXG4gICAgICByZWltYnVyc2VtZW50QW1vdW50SW5wdXRSZWY9e3JlaW1idXJzZW1lbnRBbW91bnRJbnB1dFJlZn1cclxuICAgICAgb25FeHBlbnNlQ3VycmVuY3lDaGFuZ2U9e29uRXhwZW5zZUN1cnJlbmN5Q2hhbmdlfVxyXG4gICAgICBvbkV4Y2hhbmdlUmF0ZUNoYW5nZT17b25FeGNoYW5nZVJhdGVDaGFuZ2V9XHJcbiAgICAgIG9uRXhjaGFuZ2VSYXRlQ29tbWl0PXtvbkV4Y2hhbmdlUmF0ZUNvbW1pdH1cclxuICAgICAgb25BbW91bnRDdXJyZW5jeUNoYW5nZT17b25BbW91bnRDdXJyZW5jeUNoYW5nZX1cclxuICAgICAgb25SZWltYnVyc2VtZW50QW1vdW50Q2hhbmdlPXtvblJlaW1idXJzZW1lbnRBbW91bnRDaGFuZ2V9XHJcbiAgICAvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0Q3VycmVuY3lTZXR0bGVtZW50RmllbGRzO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB9IGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgaGFzRXhwZW5zZVRpY2tldEltYWdlUHJldmlld1NvdXJjZSB9IGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0UHJldmlld1V0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VSZWFkT25seUZpZWxkIGZyb20gXCIuL0V4cGVuc2VSZWFkT25seUZpZWxkLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldEN1cnJlbmN5U2V0dGxlbWVudEZpZWxkcyBmcm9tIFwiLi9FeHBlbnNlVGlja2V0Q3VycmVuY3lTZXR0bGVtZW50RmllbGRzLnRzeFwiO1xyXG5cclxuY29uc3QgaGFzUmVhbEV4cGVuc2VTaGVldFZhbHVlID0gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gZmFsc2U7XHJcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwiLVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwiMFwiKSByZXR1cm4gZmFsc2U7XHJcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwibi9hXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJuYVwiKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtUHJvcHMgPSB7XHJcbiAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyO1xyXG4gIHN0YXR1c0xhYmVsOiBzdHJpbmc7XHJcbiAgZ2FzdG9UeXBlTGFiZWw6IHN0cmluZztcclxuICB0b3RhbEFtb3VudFRleHQ6IHN0cmluZztcclxuICB0cmFuc0RhdGVUZXh0OiBzdHJpbmc7XHJcbiAgdGlja2V0VGltZVRleHQ6IHN0cmluZztcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgZ2FzdG9UeXBlT3B0aW9uczogQXJyYXk8eyB2YWx1ZTogc3RyaW5nOyB0ZXh0OiBzdHJpbmcgfT47XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uSW52YWxpZDogYm9vbGVhbjtcclxuICBkZXNjcmlwdGlvbklucHV0UmVmOiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcclxuICBnYXN0b1R5cGVJbnZhbGlkOiBib29sZWFuO1xyXG4gIGdhc3RvVHlwZUlucHV0UmVmOiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBjdXJyZW5jeUNvZGVJbnZhbGlkOiBib29sZWFuO1xyXG4gIGN1cnJlbmN5SW5wdXRSZWY6IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICBkcmFmdFRvdGFsQW1vdW50OiBzdHJpbmc7XHJcbiAgdG90YWxBbW91bnRJbnZhbGlkOiBib29sZWFuO1xyXG4gIHRvdGFsQW1vdW50SW5wdXRSZWY6IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICBkcmFmdEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xyXG4gIGV4Y2hhbmdlUmF0ZUludmFsaWQ6IGJvb2xlYW47XHJcbiAgZXhjaGFuZ2VSYXRlSW5wdXRSZWY6IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZTogc3RyaW5nO1xyXG4gIGRyYWZ0QW1vdW50TVNUOiBzdHJpbmc7XHJcbiAgYW1vdW50TVNUSW52YWxpZDogYm9vbGVhbjtcclxuICBhbW91bnRNU1RJbnB1dFJlZjogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIGxvY2FsQ3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRUcmFuc0RhdGU6IHN0cmluZztcclxuICBkcmFmdFRpY2tldFRpbWU6IHN0cmluZztcclxuICBkcmFmdFVybEZpbGU6IHN0cmluZztcclxuICBkcmFmdEZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0VG90YWxBbW91bnRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDb21taXQ/OiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0QW1vdW50TVNUQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbk9wZW5GaWxlOiAoKSA9PiB2b2lkO1xyXG4gIG9uT3BlbkV4cGVuc2VTaGVldD86ICgpID0+IHZvaWQ7XHJcbiAgaGlkZU9wZW5GaWxlQWN0aW9uPzogYm9vbGVhbjtcclxuICBjaGlsZHJlbj86IFJlYWN0LlJlYWN0Tm9kZTtcclxufTtcclxuXHJcbi8vIFJlYWQtb25seSBhbmQgZWRpdGFibGUgaGVhZGVyIGZvcm0gZm9yIHRpY2tldCBkZXRhaWwuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtID0gKHtcclxuICBoZWFkZXIsXHJcbiAgc3RhdHVzTGFiZWwsXHJcbiAgZ2FzdG9UeXBlTGFiZWwsXHJcbiAgdG90YWxBbW91bnRUZXh0LFxyXG4gIHRyYW5zRGF0ZVRleHQsXHJcbiAgdGlja2V0VGltZVRleHQsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkZXNjcmlwdGlvbkludmFsaWQsXHJcbiAgZGVzY3JpcHRpb25JbnB1dFJlZixcclxuICBkcmFmdEdhc3RvVHlwZSxcclxuICBnYXN0b1R5cGVJbnZhbGlkLFxyXG4gIGdhc3RvVHlwZUlucHV0UmVmLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGN1cnJlbmN5Q29kZUludmFsaWQsXHJcbiAgY3VycmVuY3lJbnB1dFJlZixcclxuICBkcmFmdFRvdGFsQW1vdW50LFxyXG4gIHRvdGFsQW1vdW50SW52YWxpZCxcclxuICB0b3RhbEFtb3VudElucHV0UmVmLFxyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIGV4Y2hhbmdlUmF0ZUludmFsaWQsXHJcbiAgZXhjaGFuZ2VSYXRlSW5wdXRSZWYsXHJcbiAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UsXHJcbiAgZHJhZnRBbW91bnRNU1QsXHJcbiAgYW1vdW50TVNUSW52YWxpZCxcclxuICBhbW91bnRNU1RJbnB1dFJlZixcclxuICBsb2NhbEN1cnJlbmN5Q29kZSxcclxuICBkcmFmdFRyYW5zRGF0ZSxcclxuICBkcmFmdFRpY2tldFRpbWUsXHJcbiAgZHJhZnRVcmxGaWxlLFxyXG4gIGRyYWZ0RmlsZU5hbWUsXHJcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlLFxyXG4gIG9uRHJhZnRHYXN0b1R5cGVDaGFuZ2UsXHJcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZSxcclxuICBvbkRyYWZ0VG90YWxBbW91bnRDaGFuZ2UsXHJcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZSxcclxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ29tbWl0LFxyXG4gIG9uRHJhZnRBbW91bnRNU1RDaGFuZ2UsXHJcbiAgb25PcGVuRmlsZSxcclxuICBvbk9wZW5FeHBlbnNlU2hlZXQsXHJcbiAgaGlkZU9wZW5GaWxlQWN0aW9uID0gZmFsc2UsXHJcbiAgY2hpbGRyZW4sXHJcbn06IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtUHJvcHMpID0+IHtcclxuICBjb25zdCBwcmV2aWV3VXJsID0gc2FmZVRleHQoaXNFZGl0aW5nID8gZHJhZnRVcmxGaWxlIDogaGVhZGVyLnVybEZpbGUpO1xyXG4gIGNvbnN0IGNhbk9wZW5GaWxlID0gaGFzRXhwZW5zZVRpY2tldEltYWdlUHJldmlld1NvdXJjZShwcmV2aWV3VXJsKTtcclxuICBjb25zdCBzaG93RXhwZW5zZVNoZWV0RmllbGQgPSBoYXNSZWFsRXhwZW5zZVNoZWV0VmFsdWUoaGVhZGVyLmhvamFHYXN0b3NJZERpc3BsYXkpO1xyXG4gIGNvbnN0IGxvY2FsZSA9IGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiO1xyXG4gIGNvbnN0IGRpc3BsYXlEYXRlVGV4dCA9XHJcbiAgICB0cmFuc0RhdGVUZXh0IHx8XHJcbiAgICBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoaGVhZGVyLnRpY2tldERhdGUgfHwgaGVhZGVyLnRyYW5zRGF0ZSwgbG9jYWxlKSB8fFxyXG4gICAgXCItXCI7XHJcbiAgY29uc3QgbG9ja2VkRHJhZnREYXRlVGV4dCA9IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShkcmFmdFRyYW5zRGF0ZSwgbG9jYWxlKSB8fCBkaXNwbGF5RGF0ZVRleHQ7XHJcbiAgY29uc3QgY2F0ZWdvcnlGaWVsZCA9IGlzRWRpdGluZyA/IChcclxuICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIil9XHJcbiAgICAgIG9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XHJcbiAgICAgIHZhbHVlPXtkcmFmdEdhc3RvVHlwZX1cclxuICAgICAgb25DaGFuZ2U9e29uRHJhZnRHYXN0b1R5cGVDaGFuZ2V9XHJcbiAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cclxuICAgICAgaW5wdXRSZWY9e2dhc3RvVHlwZUlucHV0UmVmfVxyXG4gICAgICBpbnZhbGlkPXtnYXN0b1R5cGVJbnZhbGlkfVxyXG4gICAgICB1c2VQb3J0YWxcclxuICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxyXG4gICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cclxuICAgIC8+XHJcbiAgKSA6IChcclxuICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIil9XHJcbiAgICAgIHZhbHVlPXtnYXN0b1R5cGVMYWJlbCB8fCBcIi1cIn1cclxuICAgIC8+XHJcbiAgKTtcclxuICBjb25zdCBzdGF0dXNGaWVsZCA9IChcclxuICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmllbGRfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfVxyXG4gICAgICB2YWx1ZT17c3RhdHVzTGFiZWwgfHwgXCItXCJ9XHJcbiAgICAvPlxyXG4gICk7XHJcbiAgY29uc3QgdGlja2V0RmllbGQgPSAoXHJcbiAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX0ZpbGVJZFwiLCBcIlRpY2tldCBJZC5cIil9XHJcbiAgICAgIHZhbHVlPXtoZWFkZXIuZmlsZUlkIHx8IFwiLVwifVxyXG4gICAgLz5cclxuICApO1xyXG4gIGNvbnN0IGV4cGVuc2VTaGVldEZpZWxkID0gc2hvd0V4cGVuc2VTaGVldEZpZWxkID8gKFxyXG4gICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9FeHBlbnNlU2hlZXREaXNwbGF5XCIsIFwiRXhwZW5zZSBzaGVldCBJZC5cIil9XHJcbiAgICAgIHZhbHVlPXtoZWFkZXIuaG9qYUdhc3Rvc0lkRGlzcGxheSB8fCBcIi1cIn1cclxuICAgICAgb25DbGljaz17b25PcGVuRXhwZW5zZVNoZWV0fVxyXG4gICAgLz5cclxuICApIDogbnVsbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInJlbGF0aXZlIHNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItemluYy0yMDAgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV1cIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XHJcbiAgICAgICAge2lzRWRpdGluZyA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWQ6Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgcmVmPXtkZXNjcmlwdGlvbklucHV0UmVmfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCR7ZGVzY3JpcHRpb25JbnZhbGlkID8gXCIgYm9yZGVyLXJvc2UtNDAwIGJnLXJvc2UtNTAgZm9jdXM6Ym9yZGVyLXJvc2UtNDAwIGZvY3VzOnJpbmctcm9zZS0yMDBcIiA6IFwiXCJ9YH1cclxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnREZXNjcmlwdGlvbn1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxyXG4gICAgICAgICAgICAgIGFyaWEtaW52YWxpZD17ZGVzY3JpcHRpb25JbnZhbGlkID8gXCJ0cnVlXCIgOiBcImZhbHNlXCJ9XHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtoZWFkZXIuZGVzY3JpcHRpb24gfHwgXCItXCJ9XHJcbiAgICAgICAgICAgIGZ1bGxXaWR0aFxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApfVxyXG5cclxuICAgICAgICA8RXhwZW5zZVRpY2tldEN1cnJlbmN5U2V0dGxlbWVudEZpZWxkc1xyXG4gICAgICAgICAgaXNFZGl0aW5nPXtpc0VkaXRpbmd9XHJcbiAgICAgICAgICBleHBlbnNlQ3VycmVuY3lDb2RlPXtpc0VkaXRpbmcgPyBkcmFmdEN1cnJlbmN5Q29kZSA6IHNhZmVUZXh0KGhlYWRlci5jdXJyZW5jeUNvZGUpfVxyXG4gICAgICAgICAgZXhwZW5zZUN1cnJlbmN5SW52YWxpZD17Y3VycmVuY3lDb2RlSW52YWxpZH1cclxuICAgICAgICAgIGV4cGVuc2VDdXJyZW5jeUlucHV0UmVmPXtjdXJyZW5jeUlucHV0UmVmfVxyXG4gICAgICAgICAgbG9jYWxDdXJyZW5jeUNvZGU9e2xvY2FsQ3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlPXtkcmFmdEV4Y2hhbmdlUmF0ZX1cclxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZUludmFsaWQ9e2V4Y2hhbmdlUmF0ZUludmFsaWR9XHJcbiAgICAgICAgICBleGNoYW5nZVJhdGVJbnB1dFJlZj17ZXhjaGFuZ2VSYXRlSW5wdXRSZWZ9XHJcbiAgICAgICAgICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZT17ZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2V9XHJcbiAgICAgICAgICBhbW91bnRDdXJyZW5jeT17aXNFZGl0aW5nID8gZHJhZnRUb3RhbEFtb3VudCA6IHRvdGFsQW1vdW50VGV4dCB8fCBcIi1cIn1cclxuICAgICAgICAgIGFtb3VudEN1cnJlbmN5SW52YWxpZD17dG90YWxBbW91bnRJbnZhbGlkfVxyXG4gICAgICAgICAgYW1vdW50Q3VycmVuY3lJbnB1dFJlZj17dG90YWxBbW91bnRJbnB1dFJlZn1cclxuICAgICAgICAgIHJlaW1idXJzZW1lbnRBbW91bnQ9e2RyYWZ0QW1vdW50TVNUfVxyXG4gICAgICAgICAgcmVpbWJ1cnNlbWVudEFtb3VudEludmFsaWQ9e2Ftb3VudE1TVEludmFsaWR9XHJcbiAgICAgICAgICByZWltYnVyc2VtZW50QW1vdW50SW5wdXRSZWY9e2Ftb3VudE1TVElucHV0UmVmfVxyXG4gICAgICAgICAgb25FeHBlbnNlQ3VycmVuY3lDaGFuZ2U9e29uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XHJcbiAgICAgICAgICBvbkV4Y2hhbmdlUmF0ZUNoYW5nZT17b25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZX1cclxuICAgICAgICAgIG9uRXhjaGFuZ2VSYXRlQ29tbWl0PXtvbkRyYWZ0RXhjaGFuZ2VSYXRlQ29tbWl0fVxyXG4gICAgICAgICAgb25BbW91bnRDdXJyZW5jeUNoYW5nZT17b25EcmFmdFRvdGFsQW1vdW50Q2hhbmdlfVxyXG4gICAgICAgICAgb25SZWltYnVyc2VtZW50QW1vdW50Q2hhbmdlPXtvbkRyYWZ0QW1vdW50TVNUQ2hhbmdlfVxyXG4gICAgICAgIC8+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWQ6Y29sLXNwYW4tMiBncmlkIGdyaWQtY29scy0yIGdhcC00XCI+XHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX1RpY2tldERhdGVcIiwgXCJEYXRlXCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17aXNFZGl0aW5nID8gbG9ja2VkRHJhZnREYXRlVGV4dCA6IGRpc3BsYXlEYXRlVGV4dH1cclxuICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9UaWNrZXRUaW1lXCIsIFwiVGltZVwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2lzRWRpdGluZyA/IGRyYWZ0VGlja2V0VGltZSB8fCB0aWNrZXRUaW1lVGV4dCB8fCBcIi1cIiA6IHRpY2tldFRpbWVUZXh0IHx8IFwiLVwifVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZDpjb2wtc3Bhbi0yIGdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTRcIj5cclxuICAgICAgICAgIHtjYXRlZ29yeUZpZWxkfVxyXG4gICAgICAgICAge3N0YXR1c0ZpZWxkfVxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7ZXhwZW5zZVNoZWV0RmllbGQgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kOmNvbC1zcGFuLTIgZ3JpZCBncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgICAgICB7dGlja2V0RmllbGR9XHJcbiAgICAgICAgICAgIHtleHBlbnNlU2hlZXRGaWVsZH1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICB0aWNrZXRGaWVsZFxyXG4gICAgICAgICl9XHJcblxyXG4gICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7Y2FuT3BlbkZpbGUgJiYgIWhpZGVPcGVuRmlsZUFjdGlvbiA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1lbmRcIj5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIlxyXG4gICAgICAgICAgICBvbkNsaWNrPXtvbk9wZW5GaWxlfVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7aW5kVChcIlRpY2tldHNfRGV0YWlsX1ZpZXdBdHRhY2htZW50XCIsIFwiVmVyIGFkanVudG9cIil9XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgZ2V0RXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlTGFiZWwsXHJcbiAgZ2V0RXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlT3B0aW9ucyxcclxuICBub3JtYWxpemVFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbn0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlUmVpbWJ1cnNhYmxlRXhwZW5zZUNhdGFsb2cudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQgZnJvbSBcIi4vRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VSZWFkT25seUZpZWxkIGZyb20gXCIuL0V4cGVuc2VSZWFkT25seUZpZWxkLnRzeFwiO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lU2VjdGlvblByb3BzID0ge1xyXG4gIHByb2plY3RJZDogc3RyaW5nO1xyXG4gIHJlaW1idXJzYWJsZUV4cGVuc2U6IG51bWJlcjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgaXNMb2FkaW5nOiBib29sZWFuO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBlcnJvck1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgb25Qcm9qZWN0SWRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uUmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZTogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIGxpbmtlZCBleHBlbnNlLXNoZWV0IGxpbmUgZmllbGRzIGlubGluZSBpbnNpZGUgdGhlIHRpY2tldCBkZXRhaWwgZm9ybS5cclxuY29uc3QgRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZVNlY3Rpb24gPSAoe1xyXG4gIHByb2plY3RJZCxcclxuICByZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gIGlzRWRpdGluZyxcclxuICBpc0xvYWRpbmcsXHJcbiAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICBlcnJvck1lc3NhZ2UgPSBcIlwiLFxyXG4gIG9uUHJvamVjdElkQ2hhbmdlLFxyXG4gIG9uUmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZSxcclxufTogRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZVNlY3Rpb25Qcm9wcykgPT4ge1xyXG4gIGNvbnN0IHJlaW1idXJzYWJsZUV4cGVuc2VPcHRpb25zID0gUmVhY3QudXNlTWVtbygoKSA9PiBnZXRFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2VPcHRpb25zKCksIFtdKTtcclxuICBjb25zdCBub3JtYWxpemVkUmVpbWJ1cnNhYmxlRXhwZW5zZSA9IG5vcm1hbGl6ZUV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZShyZWltYnVyc2FibGVFeHBlbnNlKTtcclxuICBjb25zdCByZWltYnVyc2FibGVFeHBlbnNlTGFiZWwgPSBnZXRFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2VMYWJlbChub3JtYWxpemVkUmVpbWJ1cnNhYmxlRXhwZW5zZSk7XHJcbiAgY29uc3QgcHJvamVjdEZpZWxkID0gaXNFZGl0aW5nID8gKFxyXG4gICAgPEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXRcclxuICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxyXG4gICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1Byb2plY3RfUGxhY2Vob2xkZXJcIiwgXCJQcm9qZWN0IGlkXCIpfVxyXG4gICAgICB2YWx1ZT17cHJvamVjdElkfVxyXG4gICAgICBvbkNoYW5nZT17b25Qcm9qZWN0SWRDaGFuZ2V9XHJcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgcmVhZE9ubHk9e2Rpc2FibGVkfVxyXG4gICAgLz5cclxuICApIDogKFxyXG4gICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX1cclxuICAgICAgdmFsdWU9e3Byb2plY3RJZCB8fCBcIi1cIn1cclxuICAgIC8+XHJcbiAgKTtcclxuICBjb25zdCByZWltYnVyc2FibGVFeHBlbnNlRmllbGQgPSBpc0VkaXRpbmcgPyAoXHJcbiAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1JlaW1idXJzYWJsZUV4cGVuc2VcIiwgXCJSZWltYnVyc2FibGVcIil9XHJcbiAgICAgIG9wdGlvbnM9e3JlaW1idXJzYWJsZUV4cGVuc2VPcHRpb25zfVxyXG4gICAgICB2YWx1ZT17U3RyaW5nKG5vcm1hbGl6ZWRSZWltYnVyc2FibGVFeHBlbnNlKX1cclxuICAgICAgb25DaGFuZ2U9eyh2YWx1ZSkgPT4gb25SZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlKG5vcm1hbGl6ZUV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZSh2YWx1ZSkpfVxyXG4gICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUmVpbWJ1cnNhYmxlRXhwZW5zZVwiLCBcIlJlaW1idXJzYWJsZVwiKX1cbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIHJlYWRPbmx5PXtkaXNhYmxlZH1cbiAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxuICAgIC8+XHJcbiAgKSA6IChcclxuICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUmVpbWJ1cnNhYmxlRXhwZW5zZVwiLCBcIlJlaW1idXJzYWJsZVwiKX1cclxuICAgICAgdmFsdWU9e3JlaW1idXJzYWJsZUV4cGVuc2VMYWJlbH1cclxuICAgIC8+XHJcbiAgKTtcclxuXHJcbiAgaWYgKGlzTG9hZGluZykge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZDpjb2wtc3Bhbi0yIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC16aW5jLTcwMFwiPlxyXG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgc2l6ZS01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cclxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBpZiAoZXJyb3JNZXNzYWdlKSB7XHJcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJtZDpjb2wtc3Bhbi0yIHRleHQtZGFuZ2VyIHRleHQtc21cIj57ZXJyb3JNZXNzYWdlfTwvZGl2PjtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kOmNvbC1zcGFuLTIgZ3JpZCBncmlkLWNvbHMtMiBnYXAtMyBtZDpnYXAtNFwiPlxyXG4gICAgICB7cHJvamVjdEZpZWxkfVxyXG4gICAgICB7cmVpbWJ1cnNhYmxlRXhwZW5zZUZpZWxkfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVTZWN0aW9uO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZVNlY3Rpb24gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZVNlY3Rpb24udHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0TGluZXNMaXN0IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5lc0xpc3QudHN4XCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciwgRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWwgZnJvbSBcIi4vRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3IGZyb20gXCIuL0V4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3LnRzeFwiO1xyXG5pbXBvcnQgdHlwZSB7IFRpY2tldFByZXZpZXdQb2ludCB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcudHNcIjtcclxuXHJcbnR5cGUgUGFnaW5hdGlvbkxhYmVscyA9IHtcclxuICBmaXJzdDogc3RyaW5nO1xyXG4gIHByZXY6IHN0cmluZztcclxuICBuZXh0OiBzdHJpbmc7XHJcbiAgbGFzdDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsVmlld1Byb3BzID0ge1xyXG4gIG1vZGFsOiB7XHJcbiAgICBvcGVuOiBib29sZWFuO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0OiBzdHJpbmc7XHJcbiAgICBjYW5jZWxUZXh0OiBzdHJpbmc7XHJcbiAgICBsb2FkaW5nVGV4dDogc3RyaW5nO1xyXG4gICAgc2hvd0NhbmNlbDogYm9vbGVhbjtcclxuICAgIHNob3dDb25maXJtOiBib29sZWFuO1xyXG4gICAgYnVzeTogYm9vbGVhbjtcclxuICAgIGVycm9yOiBzdHJpbmc7XHJcbiAgICBzdGF0dXM6IHN0cmluZztcclxuICAgIG9uQ29uZmlybTogKCkgPT4gdm9pZDtcclxuICAgIG9uQ2FuY2VsOiAoKSA9PiB2b2lkO1xyXG4gIH07XHJcbiAgcHJldmlldzoge1xyXG4gICAgb3BlbjogYm9vbGVhbjtcclxuICAgIGJ1c3k6IGJvb2xlYW47XHJcbiAgICBlcnJvcjogc3RyaW5nO1xyXG4gICAgaW1hZ2VVcmw6IHN0cmluZztcclxuICAgIGltYWdlQWx0OiBzdHJpbmc7XHJcbiAgICBzY2FsZTogbnVtYmVyO1xyXG4gICAgdHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQ7XHJcbiAgICBzdXJmYWNlUmVmOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICAgIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XHJcbiAgICBvblBvaW50ZXJEb3duOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgICBvblBvaW50ZXJNb3ZlOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgICBvblBvaW50ZXJFbmQ6IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICB9O1xyXG4gIGNvbnRlbnQ6IHtcclxuICAgIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICAgIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbDtcclxuICAgIHNob3dTdGlja3lQcmV2aWV3OiBib29sZWFuO1xyXG4gICAgcHJldmlld0J1c3k6IGJvb2xlYW47XHJcbiAgICBwcmV2aWV3RXJyb3I6IHN0cmluZztcclxuICAgIHByZXZpZXdJbWFnZVVybDogc3RyaW5nO1xyXG4gICAgcHJldmlld0ZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgICBwcmV2aWV3QWx0VGV4dDogc3RyaW5nO1xyXG4gICAgb25PcGVuUHJldmlldzogKCkgPT4gdm9pZDtcclxuICAgIHN0YXR1c0xhYmVsOiBzdHJpbmc7XHJcbiAgICBnYXN0b1R5cGVMYWJlbDogc3RyaW5nO1xyXG4gICAgdG90YWxBbW91bnRUZXh0OiBzdHJpbmc7XHJcbiAgICB0cmFuc0RhdGVUZXh0OiBzdHJpbmc7XHJcbiAgICB0aWNrZXRUaW1lVGV4dDogc3RyaW5nO1xyXG4gICAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gICAgZ2FzdG9UeXBlT3B0aW9uczogQXJyYXk8eyB2YWx1ZTogc3RyaW5nOyB0ZXh0OiBzdHJpbmcgfT47XHJcbiAgICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICBkZXNjcmlwdGlvbkludmFsaWQ6IGJvb2xlYW47XHJcbiAgICBkZXNjcmlwdGlvbklucHV0UmVmOiBSZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gICAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcclxuICAgIGdhc3RvVHlwZUludmFsaWQ6IGJvb2xlYW47XHJcbiAgICBnYXN0b1R5cGVJbnB1dFJlZjogUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgICBjdXJyZW5jeUNvZGVJbnZhbGlkOiBib29sZWFuO1xyXG4gICAgY3VycmVuY3lJbnB1dFJlZjogUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICAgIGRyYWZ0VG90YWxBbW91bnQ6IHN0cmluZztcclxuICAgIHRvdGFsQW1vdW50SW52YWxpZDogYm9vbGVhbjtcclxuICAgIHRvdGFsQW1vdW50SW5wdXRSZWY6IFJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xyXG4gICAgZXhjaGFuZ2VSYXRlSW52YWxpZDogYm9vbGVhbjtcclxuICAgIGV4Y2hhbmdlUmF0ZUlucHV0UmVmOiBSZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gICAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U6IHN0cmluZztcclxuICAgIGRyYWZ0QW1vdW50TVNUOiBzdHJpbmc7XHJcbiAgICBhbW91bnRNU1RJbnZhbGlkOiBib29sZWFuO1xyXG4gICAgYW1vdW50TVNUSW5wdXRSZWY6IFJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgICBsb2NhbEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gICAgZHJhZnRUcmFuc0RhdGU6IHN0cmluZztcclxuICAgIGRyYWZ0VGlja2V0VGltZTogc3RyaW5nO1xyXG4gICAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XHJcbiAgICBkcmFmdEZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICAgIG9uRHJhZnRUb3RhbEFtb3VudENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICAgIG9uRHJhZnRFeGNoYW5nZVJhdGVDb21taXQ6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgb25EcmFmdEFtb3VudE1TVENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICBvbk9wZW5GaWxlOiAoKSA9PiB2b2lkO1xyXG4gICAgb25PcGVuRXhwZW5zZVNoZWV0PzogKCkgPT4gdm9pZDtcclxuICAgIGxpbmtlZExpbmU6IHtcclxuICAgICAgdmlzaWJsZTogYm9vbGVhbjtcclxuICAgICAgcHJvamVjdElkOiBzdHJpbmc7XHJcbiAgICAgIHJlaW1idXJzYWJsZUV4cGVuc2U6IG51bWJlcjtcclxuICAgICAgaXNMb2FkaW5nOiBib29sZWFuO1xyXG4gICAgICBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICAgICAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICAgIG9uUHJvamVjdElkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICAgICAgb25SZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZDtcclxuICAgIH07XHJcbiAgICB2aXNpYmxlTGluZXM6IEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lW107XHJcbiAgICB0b3RhbExpbmVQYWdlczogbnVtYmVyO1xyXG4gICAgbGluZVBhZ2U6IG51bWJlcjtcclxuICAgIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gICAgcGFnaW5hdGlvbkxhYmVsczogUGFnaW5hdGlvbkxhYmVscztcclxuICAgIGNvbnRhaW5lclJlZjogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgICBvbkxpbmVQYWdlQ2hhbmdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xyXG4gICAgb25PcGVuTGluZTogKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIH07XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIHRoZSB0aWNrZXQgZGV0YWlsIHZpZXcgd2hpbGUgdGhlIHBhZ2UgY29udGFpbmVyIG93bnMgb3JjaGVzdHJhdGlvbi5cclxuY29uc3QgRXhwZW5zZVRpY2tldERldGFpbFZpZXcgPSAoeyBtb2RhbCwgcHJldmlldywgY29udGVudCB9OiBFeHBlbnNlVGlja2V0RGV0YWlsVmlld1Byb3BzKSA9PiB7XHJcbiAgY29uc3QgZGV0YWlsQm9keSA9IChcclxuICAgIDw+XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybVxyXG4gICAgICAgIGhlYWRlcj17Y29udGVudC5oZWFkZXJ9XHJcbiAgICAgICAgc3RhdHVzTGFiZWw9e2NvbnRlbnQuc3RhdHVzTGFiZWx9XHJcbiAgICAgICAgZ2FzdG9UeXBlTGFiZWw9e2NvbnRlbnQuZ2FzdG9UeXBlTGFiZWx9XHJcbiAgICAgICAgdG90YWxBbW91bnRUZXh0PXtjb250ZW50LnRvdGFsQW1vdW50VGV4dH1cclxuICAgICAgICB0cmFuc0RhdGVUZXh0PXtjb250ZW50LnRyYW5zRGF0ZVRleHR9XHJcbiAgICAgICAgdGlja2V0VGltZVRleHQ9e2NvbnRlbnQudGlja2V0VGltZVRleHR9XHJcbiAgICAgICAgaXNFZGl0aW5nPXtjb250ZW50LmlzRWRpdGluZ31cclxuICAgICAgICBnYXN0b1R5cGVPcHRpb25zPXtjb250ZW50Lmdhc3RvVHlwZU9wdGlvbnN9XHJcbiAgICAgICAgZHJhZnREZXNjcmlwdGlvbj17Y29udGVudC5kcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgIGRlc2NyaXB0aW9uSW52YWxpZD17Y29udGVudC5kZXNjcmlwdGlvbkludmFsaWR9XHJcbiAgICAgICAgZGVzY3JpcHRpb25JbnB1dFJlZj17Y29udGVudC5kZXNjcmlwdGlvbklucHV0UmVmfVxyXG4gICAgICAgIGRyYWZ0R2FzdG9UeXBlPXtjb250ZW50LmRyYWZ0R2FzdG9UeXBlfVxyXG4gICAgICAgIGdhc3RvVHlwZUludmFsaWQ9e2NvbnRlbnQuZ2FzdG9UeXBlSW52YWxpZH1cclxuICAgICAgICBnYXN0b1R5cGVJbnB1dFJlZj17Y29udGVudC5nYXN0b1R5cGVJbnB1dFJlZn1cclxuICAgICAgICBkcmFmdEN1cnJlbmN5Q29kZT17Y29udGVudC5kcmFmdEN1cnJlbmN5Q29kZX1cclxuICAgICAgICBjdXJyZW5jeUNvZGVJbnZhbGlkPXtjb250ZW50LmN1cnJlbmN5Q29kZUludmFsaWR9XHJcbiAgICAgICAgY3VycmVuY3lJbnB1dFJlZj17Y29udGVudC5jdXJyZW5jeUlucHV0UmVmfVxyXG4gICAgICAgIGRyYWZ0VG90YWxBbW91bnQ9e2NvbnRlbnQuZHJhZnRUb3RhbEFtb3VudH1cclxuICAgICAgICB0b3RhbEFtb3VudEludmFsaWQ9e2NvbnRlbnQudG90YWxBbW91bnRJbnZhbGlkfVxyXG4gICAgICAgIHRvdGFsQW1vdW50SW5wdXRSZWY9e2NvbnRlbnQudG90YWxBbW91bnRJbnB1dFJlZn1cclxuICAgICAgICBkcmFmdEV4Y2hhbmdlUmF0ZT17Y29udGVudC5kcmFmdEV4Y2hhbmdlUmF0ZX1cclxuICAgICAgICBleGNoYW5nZVJhdGVJbnZhbGlkPXtjb250ZW50LmV4Y2hhbmdlUmF0ZUludmFsaWR9XHJcbiAgICAgICAgZXhjaGFuZ2VSYXRlSW5wdXRSZWY9e2NvbnRlbnQuZXhjaGFuZ2VSYXRlSW5wdXRSZWZ9XHJcbiAgICAgICAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U9e2NvbnRlbnQuZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2V9XHJcbiAgICAgICAgZHJhZnRBbW91bnRNU1Q9e2NvbnRlbnQuZHJhZnRBbW91bnRNU1R9XHJcbiAgICAgICAgYW1vdW50TVNUSW52YWxpZD17Y29udGVudC5hbW91bnRNU1RJbnZhbGlkfVxyXG4gICAgICAgIGFtb3VudE1TVElucHV0UmVmPXtjb250ZW50LmFtb3VudE1TVElucHV0UmVmfVxyXG4gICAgICAgIGxvY2FsQ3VycmVuY3lDb2RlPXtjb250ZW50LmxvY2FsQ3VycmVuY3lDb2RlfVxyXG4gICAgICAgIGRyYWZ0VHJhbnNEYXRlPXtjb250ZW50LmRyYWZ0VHJhbnNEYXRlfVxyXG4gICAgICAgIGRyYWZ0VGlja2V0VGltZT17Y29udGVudC5kcmFmdFRpY2tldFRpbWV9XHJcbiAgICAgICAgZHJhZnRVcmxGaWxlPXtjb250ZW50LmRyYWZ0VXJsRmlsZX1cclxuICAgICAgICBkcmFmdEZpbGVOYW1lPXtjb250ZW50LmRyYWZ0RmlsZU5hbWV9XHJcbiAgICAgICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlPXtjb250ZW50Lm9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZX1cclxuICAgICAgICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlPXtjb250ZW50Lm9uRHJhZnRHYXN0b1R5cGVDaGFuZ2V9XHJcbiAgICAgICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZT17Y29udGVudC5vbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlfVxyXG4gICAgICAgIG9uRHJhZnRUb3RhbEFtb3VudENoYW5nZT17Y29udGVudC5vbkRyYWZ0VG90YWxBbW91bnRDaGFuZ2V9XHJcbiAgICAgICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZT17Y29udGVudC5vbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlfVxyXG4gICAgICAgIG9uRHJhZnRFeGNoYW5nZVJhdGVDb21taXQ9e2NvbnRlbnQub25EcmFmdEV4Y2hhbmdlUmF0ZUNvbW1pdH1cclxuICAgICAgICBvbkRyYWZ0QW1vdW50TVNUQ2hhbmdlPXtjb250ZW50Lm9uRHJhZnRBbW91bnRNU1RDaGFuZ2V9XHJcbiAgICAgICAgb25PcGVuRmlsZT17Y29udGVudC5vbk9wZW5GaWxlfVxyXG4gICAgICAgIG9uT3BlbkV4cGVuc2VTaGVldD17Y29udGVudC5vbk9wZW5FeHBlbnNlU2hlZXR9XHJcbiAgICAgICAgaGlkZU9wZW5GaWxlQWN0aW9uPXtjb250ZW50LnNob3dTdGlja3lQcmV2aWV3fVxyXG4gICAgICA+XHJcbiAgICAgICAge2NvbnRlbnQubGlua2VkTGluZS52aXNpYmxlID8gKFxyXG4gICAgICAgICAgPEV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVTZWN0aW9uXHJcbiAgICAgICAgICAgIHByb2plY3RJZD17Y29udGVudC5saW5rZWRMaW5lLnByb2plY3RJZH1cclxuICAgICAgICAgICAgcmVpbWJ1cnNhYmxlRXhwZW5zZT17Y29udGVudC5saW5rZWRMaW5lLnJlaW1idXJzYWJsZUV4cGVuc2V9XHJcbiAgICAgICAgICAgIGlzRWRpdGluZz17Y29udGVudC5pc0VkaXRpbmd9XHJcbiAgICAgICAgICAgIGlzTG9hZGluZz17Y29udGVudC5saW5rZWRMaW5lLmlzTG9hZGluZ31cclxuICAgICAgICAgICAgZGlzYWJsZWQ9e2NvbnRlbnQubGlua2VkTGluZS5kaXNhYmxlZH1cclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXtjb250ZW50LmxpbmtlZExpbmUuZXJyb3JNZXNzYWdlfVxyXG4gICAgICAgICAgICBvblByb2plY3RJZENoYW5nZT17Y29udGVudC5saW5rZWRMaW5lLm9uUHJvamVjdElkQ2hhbmdlfVxyXG4gICAgICAgICAgICBvblJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2U9e2NvbnRlbnQubGlua2VkTGluZS5vblJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2V9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICA8L0V4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtPlxyXG4gICAgICA8RXhwZW5zZVRpY2tldExpbmVzTGlzdFxyXG4gICAgICAgIHZpc2libGVMaW5lcz17Y29udGVudC52aXNpYmxlTGluZXN9XHJcbiAgICAgICAgdG90YWxMaW5lUGFnZXM9e2NvbnRlbnQudG90YWxMaW5lUGFnZXN9XHJcbiAgICAgICAgbGluZVBhZ2U9e2NvbnRlbnQubGluZVBhZ2V9XHJcbiAgICAgICAgY3VycmVuY3lDb2RlPXtjb250ZW50LmN1cnJlbmN5Q29kZX1cclxuICAgICAgICBwYWdpbmF0aW9uTGFiZWxzPXtjb250ZW50LnBhZ2luYXRpb25MYWJlbHN9XHJcbiAgICAgICAgY29udGFpbmVyUmVmPXtjb250ZW50LmNvbnRhaW5lclJlZn1cclxuICAgICAgICBvbkxpbmVQYWdlQ2hhbmdlPXtjb250ZW50Lm9uTGluZVBhZ2VDaGFuZ2V9XHJcbiAgICAgICAgb25PcGVuTGluZT17Y29udGVudC5vbk9wZW5MaW5lfVxyXG4gICAgICAvPlxyXG4gICAgPC8+XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbC5jb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbC5jYW5jZWxUZXh0fVxyXG4gICAgICAgIGxvYWRpbmdUZXh0PXttb2RhbC5sb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXttb2RhbC5idXN5fVxyXG4gICAgICAgIGVycm9yPXttb2RhbC5lcnJvcn1cclxuICAgICAgICBzdGF0dXM9e21vZGFsLnN0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e21vZGFsLm9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17bW9kYWwub25DYW5jZWx9XHJcbiAgICAgIC8+XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0UHJldmlld01vZGFsXHJcbiAgICAgICAgb3Blbj17cHJldmlldy5vcGVufVxyXG4gICAgICAgIGJ1c3k9e3ByZXZpZXcuYnVzeX1cclxuICAgICAgICBlcnJvcj17cHJldmlldy5lcnJvcn1cclxuICAgICAgICBpbWFnZVVybD17cHJldmlldy5pbWFnZVVybH1cclxuICAgICAgICBpbWFnZUFsdD17cHJldmlldy5pbWFnZUFsdH1cclxuICAgICAgICBzY2FsZT17cHJldmlldy5zY2FsZX1cclxuICAgICAgICB0cmFuc2xhdGU9e3ByZXZpZXcudHJhbnNsYXRlfVxyXG4gICAgICAgIHN1cmZhY2VSZWY9e3ByZXZpZXcuc3VyZmFjZVJlZn1cclxuICAgICAgICBvbkNsb3NlPXtwcmV2aWV3Lm9uQ2xvc2V9XHJcbiAgICAgICAgb25Qb2ludGVyRG93bj17cHJldmlldy5vblBvaW50ZXJEb3dufVxyXG4gICAgICAgIG9uUG9pbnRlck1vdmU9e3ByZXZpZXcub25Qb2ludGVyTW92ZX1cclxuICAgICAgICBvblBvaW50ZXJFbmQ9e3ByZXZpZXcub25Qb2ludGVyRW5kfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXppbmMtNzAwXCJcclxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBjb250ZW50LmlzTG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgc2l6ZS01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cclxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtjb250ZW50LmVycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57Y29udGVudC5lcnJvck1lc3NhZ2V9PC9kaXY+IDogbnVsbH1cclxuXHJcbiAgICAgIHshY29udGVudC5pc0xvYWRpbmcgJiYgIWNvbnRlbnQuZXJyb3JNZXNzYWdlICYmIGNvbnRlbnQuaGVhZGVyID8gKFxyXG4gICAgICAgIGNvbnRlbnQuc2hvd1N0aWNreVByZXZpZXcgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgbWluLXctMCBtYXgtdy1mdWxsIGdyaWQtY29scy0xIGdhcC15LTIgbGc6Z3JpZC1jb2xzLVttaW5tYXgoMCwxZnIpXzMyMHB4XSBsZzpnYXAtNFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi13LTAgbWF4LXctZnVsbCBsZzpjb2wtc3RhcnQtMlwiPlxyXG4gICAgICAgICAgICAgIDxFeHBlbnNlVGlja2V0U3RpY2t5UHJldmlld1xyXG4gICAgICAgICAgICAgICAgYnVzeT17Y29udGVudC5wcmV2aWV3QnVzeX1cclxuICAgICAgICAgICAgICAgIGVycm9yPXtjb250ZW50LnByZXZpZXdFcnJvcn1cclxuICAgICAgICAgICAgICAgIGltYWdlVXJsPXtjb250ZW50LnByZXZpZXdJbWFnZVVybH1cclxuICAgICAgICAgICAgICAgIGltYWdlQWx0PXtjb250ZW50LnByZXZpZXdBbHRUZXh0fVxyXG4gICAgICAgICAgICAgICAgZmlsZU5hbWU9e2NvbnRlbnQucHJldmlld0ZpbGVOYW1lfVxyXG4gICAgICAgICAgICAgICAgb25PcGVuPXtjb250ZW50Lm9uT3BlblByZXZpZXd9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLXctMCBzcGFjZS15LTIgbGc6Y29sLXN0YXJ0LTEgbGc6cm93LXN0YXJ0LTFcIj57ZGV0YWlsQm9keX08L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICBkZXRhaWxCb2R5XHJcbiAgICAgICAgKVxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0RGV0YWlsVmlldztcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXREZXRhaWxEdG8sIEV4cGVuc2VTaGVldExpbmUgfSBmcm9tIFwiLi4vLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgREVGQVVMVF9MSU5FX1JFSU1CVVJTQUJMRV9FWFBFTlNFLFxyXG4gIG5vcm1hbGl6ZUV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxufSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzL2V4cGVuc2VSZWltYnVyc2FibGVFeHBlbnNlQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldERldGFpbCwgbWFwRXhwZW5zZVNoZWV0TGluZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVBcmdzID0ge1xyXG4gIGVuYWJsZWQ6IGJvb2xlYW47XHJcbiAgc2hlZXRJZDogc3RyaW5nO1xyXG4gIGxpbmVSZWNJZDogc3RyaW5nO1xyXG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuY29uc3Qgc2VsZWN0U2hlZXQgPSAoaXRlbXM6IEV4cGVuc2VTaGVldERldGFpbER0b1tdLCBzaGVldElkOiBzdHJpbmcpOiBFeHBlbnNlU2hlZXREZXRhaWxEdG8gfCBudWxsID0+IHtcclxuICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHNoZWV0SWQpLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KGl0ZW1zKSB8fCBpdGVtcy5sZW5ndGggPCAxKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICBpdGVtcy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnk/LkhvamFHYXN0b3NJZCA/PyBlbnRyeT8uaG9qYUdhc3Rvc0lkKS50b1VwcGVyQ2FzZSgpID09PSBzYWZlU2hlZXRJZCkgfHxcclxuICAgIGl0ZW1zWzBdIHx8XHJcbiAgICBudWxsXHJcbiAgKTtcclxufTtcclxuXHJcbmNvbnN0IHNlbGVjdExpbmUgPSAoc2hlZXQ6IEV4cGVuc2VTaGVldERldGFpbER0bywgbGluZVJlY0lkOiBzdHJpbmcpOiBFeHBlbnNlU2hlZXRMaW5lIHwgbnVsbCA9PiB7XHJcbiAgY29uc3Qgc2FmZUxpbmVSZWNJZCA9IHNhZmVUZXh0KGxpbmVSZWNJZCkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBzb3VyY2VMaW5lcyA9IHNoZWV0LkxpbmVzID8/IHNoZWV0LmxpbmVzID8/IFtdO1xyXG4gIGNvbnN0IG1hcHBlZExpbmVzID0gQXJyYXkuaXNBcnJheShzb3VyY2VMaW5lcykgPyBzb3VyY2VMaW5lcy5tYXAoKGVudHJ5KSA9PiBtYXBFeHBlbnNlU2hlZXRMaW5lKGVudHJ5KSkgOiBbXTtcclxuXHJcbiAgcmV0dXJuIG1hcHBlZExpbmVzLmZpbmQoKGxpbmUpID0+IHNhZmVUZXh0KGxpbmUubGluZVJlY0lkKS50b1VwcGVyQ2FzZSgpID09PSBzYWZlTGluZVJlY0lkKSB8fCBudWxsO1xyXG59O1xyXG5cclxuLy8gTG9hZHMgdGhlIGV4cGVuc2Utc2hlZXQgbGluZSB0aGF0IGdpdmVzIGNvbnRleHR1YWwgZmllbGRzIHRvIGEgbGlua2VkIHRpY2tldCBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lID0gKHtcclxuICBlbmFibGVkLFxyXG4gIHNoZWV0SWQsXHJcbiAgbGluZVJlY0lkLFxyXG4gIG9uRm9yYmlkZGVuLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lQXJncykgPT4ge1xyXG4gIGNvbnN0IFtsaW5lLCBzZXRMaW5lXSA9IHVzZVN0YXRlPEV4cGVuc2VTaGVldExpbmUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbb3JpZ2luYWxQcm9qZWN0SWQsIHNldE9yaWdpbmFsUHJvamVjdElkXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdFByb2plY3RJZCwgc2V0RHJhZnRQcm9qZWN0SWRdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW29yaWdpbmFsUmVpbWJ1cnNhYmxlRXhwZW5zZSwgc2V0T3JpZ2luYWxSZWltYnVyc2FibGVFeHBlbnNlXSA9IHVzZVN0YXRlKERFRkFVTFRfTElORV9SRUlNQlVSU0FCTEVfRVhQRU5TRSk7XHJcbiAgY29uc3QgW2RyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSwgc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlXSA9IHVzZVN0YXRlKERFRkFVTFRfTElORV9SRUlNQlVSU0FCTEVfRVhQRU5TRSk7XHJcbiAgY29uc3QgW2xvY2FsQ3VycmVuY3lDb2RlLCBzZXRMb2NhbEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgY29uc3QgcmVsb2FkTGluZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQoc2hlZXRJZCk7XHJcbiAgICBjb25zdCBzYWZlTGluZVJlY0lkID0gc2FmZVRleHQobGluZVJlY0lkKTtcclxuICAgIGlmICghZW5hYmxlZCB8fCAhc2FmZVNoZWV0SWQpIHtcclxuICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgc2V0T3JpZ2luYWxQcm9qZWN0SWQoXCJcIik7XHJcbiAgICAgIHNldERyYWZ0UHJvamVjdElkKFwiXCIpO1xyXG4gICAgICBzZXRPcmlnaW5hbFJlaW1idXJzYWJsZUV4cGVuc2UoREVGQVVMVF9MSU5FX1JFSU1CVVJTQUJMRV9FWFBFTlNFKTtcclxuICAgICAgc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlKERFRkFVTFRfTElORV9SRUlNQlVSU0FCTEVfRVhQRU5TRSk7XHJcbiAgICAgIHNldExvY2FsQ3VycmVuY3lDb2RlKFwiXCIpO1xyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XHJcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldERldGFpbChzYWZlU2hlZXRJZCwge1xyXG4gICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgIHNldE9yaWdpbmFsUHJvamVjdElkKFwiXCIpO1xyXG4gICAgICAgIHNldERyYWZ0UHJvamVjdElkKFwiXCIpO1xyXG4gICAgICAgIHNldE9yaWdpbmFsUmVpbWJ1cnNhYmxlRXhwZW5zZShERUZBVUxUX0xJTkVfUkVJTUJVUlNBQkxFX0VYUEVOU0UpO1xyXG4gICAgICAgIHNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZShERUZBVUxUX0xJTkVfUkVJTUJVUlNBQkxFX0VYUEVOU0UpO1xyXG4gICAgICAgIHNldExvY2FsQ3VycmVuY3lDb2RlKFwiXCIpO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZT8uTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0IGRldGFpbC5cIikpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgc2hlZXQgPSBzZWxlY3RTaGVldChyZXNwb25zZT8uSXRlbXMgfHwgW10sIHNhZmVTaGVldElkKTtcclxuICAgICAgY29uc3Qgc2hlZXRMb2NhbEN1cnJlbmN5Q29kZSA9IHNhZmVUZXh0KHNoZWV0Py5DdXJyZW5jeUNvZGUgPz8gc2hlZXQ/LmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKTtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWRMaW5lID0gc2hlZXQgJiYgc2FmZUxpbmVSZWNJZCA/IHNlbGVjdExpbmUoc2hlZXQsIHNhZmVMaW5lUmVjSWQpIDogbnVsbDtcclxuICAgICAgaWYgKCFzYWZlTGluZVJlY0lkKSB7XHJcbiAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICBzZXRPcmlnaW5hbFByb2plY3RJZChcIlwiKTtcclxuICAgICAgICBzZXREcmFmdFByb2plY3RJZChcIlwiKTtcclxuICAgICAgICBzZXRPcmlnaW5hbFJlaW1idXJzYWJsZUV4cGVuc2UoREVGQVVMVF9MSU5FX1JFSU1CVVJTQUJMRV9FWFBFTlNFKTtcclxuICAgICAgICBzZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UoREVGQVVMVF9MSU5FX1JFSU1CVVJTQUJMRV9FWFBFTlNFKTtcclxuICAgICAgICBzZXRMb2NhbEN1cnJlbmN5Q29kZShzaGVldExvY2FsQ3VycmVuY3lDb2RlKTtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXNlbGVjdGVkTGluZSkge1xyXG4gICAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgICAgc2V0T3JpZ2luYWxQcm9qZWN0SWQoXCJcIik7XHJcbiAgICAgICAgc2V0RHJhZnRQcm9qZWN0SWQoXCJcIik7XHJcbiAgICAgICAgc2V0T3JpZ2luYWxSZWltYnVyc2FibGVFeHBlbnNlKERFRkFVTFRfTElORV9SRUlNQlVSU0FCTEVfRVhQRU5TRSk7XHJcbiAgICAgICAgc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlKERFRkFVTFRfTElORV9SRUlNQlVSU0FCTEVfRVhQRU5TRSk7XHJcbiAgICAgICAgc2V0TG9jYWxDdXJyZW5jeUNvZGUoc2hlZXRMb2NhbEN1cnJlbmN5Q29kZSk7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwcm9qZWN0SWQgPSBzYWZlVGV4dChzZWxlY3RlZExpbmUucHJvaklkKTtcclxuICAgICAgY29uc3QgcmVpbWJ1cnNhYmxlRXhwZW5zZSA9IG5vcm1hbGl6ZUV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZShzZWxlY3RlZExpbmUucmVpbWJ1cnNhYmxlRXhwZW5zZSk7XHJcbiAgICAgIHNldExpbmUoc2VsZWN0ZWRMaW5lKTtcclxuICAgICAgc2V0T3JpZ2luYWxQcm9qZWN0SWQocHJvamVjdElkKTtcclxuICAgICAgc2V0RHJhZnRQcm9qZWN0SWQocHJvamVjdElkKTtcclxuICAgICAgc2V0T3JpZ2luYWxSZWltYnVyc2FibGVFeHBlbnNlKHJlaW1idXJzYWJsZUV4cGVuc2UpO1xyXG4gICAgICBzZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UocmVpbWJ1cnNhYmxlRXhwZW5zZSk7XHJcbiAgICAgIHNldExvY2FsQ3VycmVuY3lDb2RlKHNoZWV0TG9jYWxDdXJyZW5jeUNvZGUpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICBzZXRPcmlnaW5hbFByb2plY3RJZChcIlwiKTtcclxuICAgICAgc2V0RHJhZnRQcm9qZWN0SWQoXCJcIik7XHJcbiAgICAgIHNldE9yaWdpbmFsUmVpbWJ1cnNhYmxlRXhwZW5zZShERUZBVUxUX0xJTkVfUkVJTUJVUlNBQkxFX0VYUEVOU0UpO1xyXG4gICAgICBzZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UoREVGQVVMVF9MSU5FX1JFSU1CVVJTQUJMRV9FWFBFTlNFKTtcclxuICAgICAgc2V0TG9jYWxDdXJyZW5jeUNvZGUoXCJcIik7XHJcbiAgICAgIHNldEVycm9yTWVzc2FnZShlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlwiKSk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtlbmFibGVkLCBsaW5lUmVjSWQsIG9uRm9yYmlkZGVuLCBzaGVldElkXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICB2b2lkIHJlbG9hZExpbmUoKTtcclxuICB9LCBbcmVsb2FkTGluZV0pO1xyXG5cclxuICBjb25zdCBwcm9qZWN0SWRDaGFuZ2VkID0gdXNlTWVtbyhcclxuICAgICgpID0+IHNhZmVUZXh0KGRyYWZ0UHJvamVjdElkKSAhPT0gc2FmZVRleHQob3JpZ2luYWxQcm9qZWN0SWQpLFxyXG4gICAgW2RyYWZ0UHJvamVjdElkLCBvcmlnaW5hbFByb2plY3RJZF1cclxuICApO1xyXG4gIGNvbnN0IHJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2VkID0gdXNlTWVtbyhcclxuICAgICgpID0+IGRyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSAhPT0gb3JpZ2luYWxSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgW2RyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSwgb3JpZ2luYWxSZWltYnVyc2FibGVFeHBlbnNlXVxyXG4gICk7XHJcbiAgY29uc3QgcmVzZXREcmFmdFByb2plY3RJZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldERyYWZ0UHJvamVjdElkKG9yaWdpbmFsUHJvamVjdElkKTtcclxuICB9LCBbb3JpZ2luYWxQcm9qZWN0SWRdKTtcclxuICBjb25zdCByZXNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZShvcmlnaW5hbFJlaW1idXJzYWJsZUV4cGVuc2UpO1xyXG4gIH0sIFtvcmlnaW5hbFJlaW1idXJzYWJsZUV4cGVuc2VdKTtcclxuICBjb25zdCBhY2NlcHREcmFmdFByb2plY3RJZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHNhZmVQcm9qZWN0SWQgPSBzYWZlVGV4dChkcmFmdFByb2plY3RJZCk7XHJcbiAgICBzZXRPcmlnaW5hbFByb2plY3RJZChzYWZlUHJvamVjdElkKTtcclxuICAgIHNldERyYWZ0UHJvamVjdElkKHNhZmVQcm9qZWN0SWQpO1xyXG4gIH0sIFtkcmFmdFByb2plY3RJZF0pO1xyXG4gIGNvbnN0IGFjY2VwdERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHNhZmVSZWltYnVyc2FibGVFeHBlbnNlID0gbm9ybWFsaXplRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlKGRyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSk7XHJcbiAgICBzZXRPcmlnaW5hbFJlaW1idXJzYWJsZUV4cGVuc2Uoc2FmZVJlaW1idXJzYWJsZUV4cGVuc2UpO1xyXG4gICAgc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlKHNhZmVSZWltYnVyc2FibGVFeHBlbnNlKTtcclxuICB9LCBbZHJhZnRSZWltYnVyc2FibGVFeHBlbnNlXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBsaW5lLFxyXG4gICAgbG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBvcmlnaW5hbFByb2plY3RJZCxcclxuICAgIGRyYWZ0UHJvamVjdElkLFxyXG4gICAgcHJvamVjdElkQ2hhbmdlZCxcclxuICAgIG9yaWdpbmFsUmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgIGRyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgIHJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2VkLFxyXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICBzZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbiAgICByZXNldERyYWZ0UHJvamVjdElkLFxyXG4gICAgcmVzZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbiAgICBhY2NlcHREcmFmdFByb2plY3RJZCxcclxuICAgIGFjY2VwdERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgIHJlbG9hZExpbmUsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlIH0gZnJvbSBcIi4uL3VzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUudHNcIjtcclxuaW1wb3J0IHtcclxuICBidWlsZEV4cGVuc2VTaGVldERldGFpbFVybCxcclxuICBidWlsZEV4cGVuc2VTaGVldExpbmVEZXRhaWxVcmwsXHJcbiAgYnVpbGRFeHBlbnNlVGlja2V0TGlua1VybCxcclxuICB0eXBlIEV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG59IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dC50c1wiO1xyXG5pbXBvcnQgeyB0b0V4cGVuc2VJc29EYXRlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uQXJncyA9IHtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBkZXRhaWxPcmlnaW46IHN0cmluZztcclxuICBoZWFkZXJUcmFuc0RhdGU6IHVua25vd247XHJcbiAgY29udGV4dExpbmVSZWNJZD86IHN0cmluZztcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0PzogRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQgfCBudWxsO1xyXG4gIHJlYWRDYWNoZWRTdGF0ZTogKCkgPT4gRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSB8IG51bGw7XHJcbiAgc2F2ZUNhY2hlZFN0YXRlOiAoc3RhdGU6IEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBLZWVwcyBuYXRpdmUgYmFjayBuYXZpZ2F0aW9uIGFsaWduZWQgd2l0aCB0aGUgdGlja2V0IGVudHJ5IHBvaW50IGFuZCBwcmVzZXJ2ZXMgY2FjaGVkIGxpbmstbW9kZSBzdGF0ZS5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxCYWNrTmF2aWdhdGlvbiA9ICh7XHJcbiAgZmlsZUlkLFxyXG4gIGRldGFpbE9yaWdpbixcclxuICBoZWFkZXJUcmFuc0RhdGUsXHJcbiAgY29udGV4dExpbmVSZWNJZCxcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIHJlYWRDYWNoZWRTdGF0ZSxcclxuICBzYXZlQ2FjaGVkU3RhdGUsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxCYWNrTmF2aWdhdGlvbkFyZ3MpID0+IHtcclxuICBjb25zdCBzaG91bGRSZXR1cm5Ub1RpY2tldExpc3QgPSB0aWNrZXRSZXR1cm5Db250ZXh0Py5vcmlnaW4gPT09IFwic2hlZXQtbGlua1wiIHx8ICF0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkO1xyXG5cclxuICBjb25zdCBuYXRpdmVCYWNrVXJsID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBpZiAodGlja2V0UmV0dXJuQ29udGV4dD8ub3JpZ2luID09PSBcInNoZWV0LWxpbmtcIiAmJiB0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0SWQpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkRXhwZW5zZVRpY2tldExpbmtVcmwodGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGlja2V0UmV0dXJuQ29udGV4dD8ub3JpZ2luID09PSBcImV4cGVuc2UtbGluZVwiICYmIHRpY2tldFJldHVybkNvbnRleHQuc2hlZXRJZCkge1xyXG4gICAgICByZXR1cm4gYnVpbGRFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVXJsKHRpY2tldFJldHVybkNvbnRleHQuc2hlZXRJZCwgdGlja2V0UmV0dXJuQ29udGV4dC5zaGVldExpbmVSZWNJZCB8fCBjb250ZXh0TGluZVJlY0lkKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCkge1xyXG4gICAgICByZXR1cm4gYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwodGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGV0YWlsT3JpZ2luID09PSBcInRpY2tldC1jcmVhdGVcIikge1xyXG4gICAgICBjb25zdCB0aWNrZXREYXRlID0gdG9FeHBlbnNlSXNvRGF0ZShoZWFkZXJUcmFuc0RhdGUpIHx8IHRvRXhwZW5zZUlzb0RhdGUobmV3IERhdGUoKSk7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgICAgdGlja2V0RmlsZUlkOiBmaWxlSWQsXHJcbiAgICAgICAgdGlja2V0RGF0ZSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gYC9HYXN0b3MvVGlja2V0cz8ke3F1ZXJ5LnRvU3RyaW5nKCl9YDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gXCIvR2FzdG9zL1RpY2tldHNcIjtcclxuICB9LCBbY29udGV4dExpbmVSZWNJZCwgZGV0YWlsT3JpZ2luLCBmaWxlSWQsIGhlYWRlclRyYW5zRGF0ZSwgdGlja2V0UmV0dXJuQ29udGV4dF0pO1xyXG5cclxuICBjb25zdCByZWFybUV4cGVuc2VUaWNrZXRzUmV0dXJuU3RhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBjYWNoZWRTdGF0ZSA9IHJlYWRDYWNoZWRTdGF0ZSgpO1xyXG4gICAgaWYgKCFjYWNoZWRTdGF0ZSkgcmV0dXJuO1xyXG4gICAgc2F2ZUNhY2hlZFN0YXRlKGNhY2hlZFN0YXRlKTtcclxuICB9LCBbcmVhZENhY2hlZFN0YXRlLCBzYXZlQ2FjaGVkU3RhdGVdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghZmlsZUlkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgYmFja0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsQmFja0J0blwiKTtcclxuICAgIGlmICghYmFja0J1dHRvbikgcmV0dXJuO1xyXG5cclxuICAgIGJhY2tCdXR0b24uc2V0QXR0cmlidXRlKFwiZGF0YS1iYWNrLXVybFwiLCBuYXRpdmVCYWNrVXJsKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGJhY2tCdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1iYWNrLXVybFwiKTtcclxuICAgIH07XHJcbiAgfSwgW2ZpbGVJZCwgbmF0aXZlQmFja1VybF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFmaWxlSWQpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVOYXRpdmVCYWNrID0gKGV2ZW50OiBQb3BTdGF0ZUV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudD8uc3RhdGUgJiYgZXZlbnQuc3RhdGUuaW5kVHJhcCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChzaG91bGRSZXR1cm5Ub1RpY2tldExpc3QpIHtcclxuICAgICAgICAgIHJlYXJtRXhwZW5zZVRpY2tldHNSZXR1cm5TdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShuYXRpdmVCYWNrVXJsKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uKGV4ZWN1dGVCYWNrTmF2aWdhdGlvbik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBleGVjdXRlQmFja05hdmlnYXRpb24oKTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBoYW5kbGVOYXRpdmVCYWNrKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgaGFuZGxlTmF0aXZlQmFjayk7XHJcbiAgICB9O1xyXG4gIH0sIFtmaWxlSWQsIG5hdGl2ZUJhY2tVcmwsIHJlYXJtRXhwZW5zZVRpY2tldHNSZXR1cm5TdGF0ZSwgc2hvdWxkUmV0dXJuVG9UaWNrZXRMaXN0XSk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzXCI7XHJcbmltcG9ydCB7IGhhc0V4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdTb3VyY2UgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0UHJldmlld1V0aWxzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWxBcmdzID0ge1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBkcmFmdFVybEZpbGU6IHN0cmluZztcclxuICBoZWFkZXJVcmxGaWxlPzogc3RyaW5nIHwgbnVsbDtcclxufTtcclxuXHJcbi8vIENlbnRyYWxpemVzIHN0aWNreS1wcmV2aWV3IGF2YWlsYWJpbGl0eSBhbmQgaW1hZ2UgbG9hZGluZyBmb3IgdGlja2V0IGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWwgPSAoe1xyXG4gIGZpbGVJZCxcclxuICBpc0VkaXRpbmcsXHJcbiAgZHJhZnRVcmxGaWxlLFxyXG4gIGhlYWRlclVybEZpbGUsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWxBcmdzKSA9PiB7XHJcbiAgY29uc3QgcHJldmlld1NvdXJjZVVybCA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQoaXNFZGl0aW5nID8gZHJhZnRVcmxGaWxlIDogaGVhZGVyVXJsRmlsZSksIFtkcmFmdFVybEZpbGUsIGhlYWRlclVybEZpbGUsIGlzRWRpdGluZ10pO1xyXG4gIGNvbnN0IHNob3dTdGlja3lQcmV2aWV3ID0gdXNlTWVtbygoKSA9PiBoYXNFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3U291cmNlKHByZXZpZXdTb3VyY2VVcmwpLCBbcHJldmlld1NvdXJjZVVybF0pO1xyXG4gIGNvbnN0IHByZXZpZXcgPSB1c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3KHtcclxuICAgIGZpbGVJZCxcclxuICAgIHNvdXJjZVVybDogcHJldmlld1NvdXJjZVVybCxcclxuICAgIGVuYWJsZWQ6IHNob3dTdGlja3lQcmV2aWV3LFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc2hvd1N0aWNreVByZXZpZXcsXHJcbiAgICAuLi5wcmV2aWV3LFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVRpY2tldFRvcGJhckJhY2tMb2NrQXJncyA9IHtcbiAgbG9ja2VkOiBib29sZWFuO1xuICBtZXNzYWdlPzogc3RyaW5nO1xufTtcblxuLy8gTG9ja3MgdGhlIHNoYXJlZCB0b3BiYXIgYmFjayBidXR0b24gd2hpbGUgYSBsaW5rZWQgdGlja2V0IG11c3Qgc3RheSBpbiB0aGUgcmVjb3ZlcnkgZmxvdy5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0VG9wYmFyQmFja0xvY2sgPSAoe1xuICBsb2NrZWQsXG4gIG1lc3NhZ2UsXG59OiBVc2VFeHBlbnNlVGlja2V0VG9wYmFyQmFja0xvY2tBcmdzKTogdm9pZCA9PiB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgYmFja0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsQmFja0J0blwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG4gICAgaWYgKCFiYWNrQnV0dG9uKSByZXR1cm47XG5cbiAgICBjb25zdCBwcmV2aW91c0Rpc2FibGVkID0gYmFja0J1dHRvbi5kaXNhYmxlZDtcbiAgICBjb25zdCBwcmV2aW91c0FyaWFEaXNhYmxlZCA9IGJhY2tCdXR0b24uZ2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiKTtcbiAgICBjb25zdCBwcmV2aW91c1RpdGxlID0gYmFja0J1dHRvbi5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICBjb25zdCBsb2NrTWVzc2FnZSA9IHNhZmVUZXh0KG1lc3NhZ2UpO1xuXG4gICAgaWYgKGxvY2tlZCkge1xuICAgICAgYmFja0J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICBiYWNrQnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgICAgaWYgKGxvY2tNZXNzYWdlKSB7XG4gICAgICAgIGJhY2tCdXR0b24uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgbG9ja01lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXByZXZpb3VzRGlzYWJsZWQpIHtcbiAgICAgIGJhY2tCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIGJhY2tCdXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCBcImZhbHNlXCIpO1xuICAgICAgaWYgKHByZXZpb3VzVGl0bGUgPT09IG51bGwpIHtcbiAgICAgICAgYmFja0J1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgYmFja0J1dHRvbi5kaXNhYmxlZCA9IHByZXZpb3VzRGlzYWJsZWQ7XG4gICAgICBpZiAocHJldmlvdXNBcmlhRGlzYWJsZWQgPT09IG51bGwpIHtcbiAgICAgICAgYmFja0J1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYmFja0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIHByZXZpb3VzQXJpYURpc2FibGVkKTtcbiAgICAgIH1cbiAgICAgIGlmIChwcmV2aW91c1RpdGxlID09PSBudWxsKSB7XG4gICAgICAgIGJhY2tCdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiYWNrQnV0dG9uLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIHByZXZpb3VzVGl0bGUpO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtsb2NrZWQsIG1lc3NhZ2VdKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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LEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixPQWdFTztBQUFBLEVBQ0w7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGlCQUFpQjtBQUFBLEVBQ2pCO0FBQUEsRUFDQSxlQUFlO0FBQUEsRUFDZjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7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QUNuRSxXQUFXO0FBQUE7QUFBQSxJQUNiLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLDBCQUEwQixNQUFNO0FBQ3BDLFNBQ0UsNkNBQUMsZ0NBQXFCLHlCQUF1QixNQUMzQyx1REFBQyxrQ0FBK0IsR0FDbEM7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLDRCQUE0QjtBQUNuRSxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLDJCQUF3QixDQUFFO0FBQ3REO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxrQ0FBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJob3VycyIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImhvdXJzIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
