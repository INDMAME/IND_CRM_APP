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
  isFromSheetLink,
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
    if (isFromSheetLink) return;
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
    isFromSheetLink,
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
  isFromSheetLink,
  isLoading,
  header,
  handleEnableEdit,
  canAttemptAutoEdit
}) => {
  const autoEditAttemptedRef = (0, import_react12.useRef)(false);
  (0, import_react12.useEffect)(() => {
    if (!autoEditMode || isFromSheetLink || autoEditAttemptedRef.current) return;
    if (isLoading || !header || !canAttemptAutoEdit) return;
    autoEditAttemptedRef.current = true;
    handleEnableEdit();
  }, [autoEditMode, canAttemptAutoEdit, handleEnableEdit, header, isFromSheetLink, isLoading]);
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
    isFromSheetLink,
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
    isFromSheetLink,
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
  const canEditTicketInContext = canEditTicket && canEditLinkedTicket && !isFromSheetLink;
  const canCreateTicketLineInContext = canEditTicketInContext && !isContextLocked && !sheetSyncBlocked;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFJvdXRlQ29udGV4dC50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5LnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRDdXJyZW5jeVNldHRsZW1lbnRGaWVsZHMudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVTZWN0aW9uLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL0V4cGVuc2VUaWNrZXREZXRhaWxWaWV3LnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldFRvcGJhckJhY2tMb2NrLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24sIHsgdHlwZSBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCB7IHVzZUF1dGhDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XHJcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xyXG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XHJcbmltcG9ydCB7IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoLCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLCBuYXZpZ2F0ZVRvRXhwZW5zZVVybCwgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBpc01hbmFnaW5nT3RoZXJFeHBlbnNlVXNlciB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTWFuYWdlZFVzZXJTY29wZS50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlR2FzdG9UeXBlT3B0aW9ucyB9IGZyb20gXCIuLi8uLi9jb25zdGFudHMvZXhwZW5zZUdhc3RvVHlwZUNhdGFsb2cudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB7IGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHJlYWRFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VMaW5lQ3VycmVuY3lDb2RlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VMaW5lQ3VycmVuY3kudHNcIjtcclxuaW1wb3J0IHtcclxuICBidWlsZEV4cGVuc2VFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZSxcclxuICBmZXRjaEV4cGVuc2VPZmZpY2lhbEV4Y2hhbmdlUmF0ZSxcclxuICBmb3JtYXRFeHBlbnNlRXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZSxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUV4Y2hhbmdlUmF0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZSB9IGZyb20gXCIuLi91c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbEVkaXRvci50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbFJvdXRlQ29udGV4dC50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsRGlzcGxheSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5LnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsQ29uZmlybVN0YXRlLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsSW50ZXJhY3Rpb25zLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0RGV0YWlsVmlldyBmcm9tIFwiLi9FeHBlbnNlVGlja2V0RGV0YWlsVmlldy50c3hcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmUudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUgfSBmcm9tIFwiLi4vdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdQYW5lbC50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldFRvcGJhckJhY2tMb2NrIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldFRvcGJhckJhY2tMb2NrLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIsIEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XG5cclxuY29uc3QgTElORVNfUEFHRV9TSVpFID0gNjtcclxuXHJcbmNvbnN0IE5ld0xpbmVJY29uID0gKCkgPT4gKFxyXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwic2l6ZS01XCI+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0zIDE5YzMuMzMzIC0yIDUgLTQgNSAtNmMwIC0zIC0xIC0zIC0yIC0zcy0yLjAzMiAxLjA4NSAtMiAzYy4wMzQgMi4wNDggMS42NTggMi44NzcgMi41IDRjMS41IDIgMi41IDIuNSAzLjUgMWMuNjY3IC0xIDEuMTY3IC0xLjgzMyAxLjUgLTIuNWMxIDIuMzMzIDIuMzMzIDMuNSA0IDMuNWgyLjVcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMjAgMTd2LTEyYzAgLTEuMTIxIC0uODc5IC0yIC0yIC0ycy0yIC44NzkgLTIgMnYxMmwyIDJsMiAtMlwiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNiA3aDRcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgcGFnZWRTbGljZSA9IDxULD4oaXRlbXM6IFRbXSwgcGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKTogVFtdID0+IHtcclxuICBpZiAoIWl0ZW1zLmxlbmd0aCkgcmV0dXJuIFtdO1xyXG4gIGNvbnN0IHNhZmVQYWdlID0gTWF0aC5tYXgoMSwgcGFnZSk7XHJcbiAgY29uc3Qgc3RhcnQgPSAoc2FmZVBhZ2UgLSAxKSAqIHBhZ2VTaXplO1xyXG4gIHJldHVybiBpdGVtcy5zbGljZShzdGFydCwgc3RhcnQgKyBwYWdlU2l6ZSk7XHJcbn07XHJcblxyXG4vLyBJbml0aWFsaXplcyBhdXRoIHNlZWQgZm9yIGV4cGVuc2UgQVBJIGNhbGxzIGJlZm9yZSBpc2xhbmQgZWZmZWN0cyBydW4uXHJcbmNvbnN0IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoID0gKCkgPT4ge1xyXG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcclxuICAgIHRva2VuOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxyXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXHJcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlTGlua2VkVGlja2V0QmxvY2tlZE1lc3NhZ2UgPSAoaXNQYWlkOiBib29sZWFuKTogc3RyaW5nID0+IHtcclxuICBpZiAoaXNQYWlkKSB7XHJcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1BhaWRSZWFkT25seVwiLCBcIkxhcyBob2phcyBkZSBnYXN0byBwYWdhZGFzIHNvbiBkZSBzb2xvIGxlY3R1cmEuXCIpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9SZWFkT25seUJ5U3RhdHVzXCIsIFwiTm8gc2UgcHVlZGUgZWRpdGFyIGVzdGEgaG9qYSBkZSBnYXN0b3MgZW4gZWwgZXN0YWRvIGFjdHVhbC5cIik7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxNb2RhbFZpZXcgPSAoe1xyXG4gIG1vZGFsLFxyXG4gIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgbW9kYWxDYW5jZWxUZXh0LFxyXG4gIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgYnVzeSxcclxuICBtb2RhbEVycm9yLFxyXG4gIHN0YXR1cyxcclxuICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiB7XHJcbiAgbW9kYWw6IHtcclxuICAgIG9wZW46IGJvb2xlYW47XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgc2hvd0NhbmNlbDogYm9vbGVhbjtcclxuICAgIHNob3dDb25maXJtOiBib29sZWFuO1xyXG4gIH07XHJcbiAgbW9kYWxDb25maXJtVGV4dDogc3RyaW5nO1xyXG4gIG1vZGFsQ2FuY2VsVGV4dDogc3RyaW5nO1xyXG4gIG1vZGFsTG9hZGluZ1RleHQ6IHN0cmluZztcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsRXJyb3I6IHN0cmluZztcclxuICBzdGF0dXM6IHN0cmluZztcclxuICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xyXG59KSA9PiAoe1xyXG4gIG9wZW46IG1vZGFsLm9wZW4sXHJcbiAgdGl0bGU6IG1vZGFsLnRpdGxlLFxyXG4gIG1lc3NhZ2U6IG1vZGFsLm1lc3NhZ2UsXHJcbiAgY29uZmlybVRleHQ6IG1vZGFsQ29uZmlybVRleHQsXHJcbiAgY2FuY2VsVGV4dDogbW9kYWxDYW5jZWxUZXh0LFxyXG4gIGxvYWRpbmdUZXh0OiBtb2RhbExvYWRpbmdUZXh0LFxyXG4gIHNob3dDYW5jZWw6IG1vZGFsLnNob3dDYW5jZWwsXHJcbiAgc2hvd0NvbmZpcm06IG1vZGFsLnNob3dDb25maXJtLFxyXG4gIGJ1c3ksXHJcbiAgZXJyb3I6IG1vZGFsRXJyb3IsXHJcbiAgc3RhdHVzLFxyXG4gIG9uQ29uZmlybTogaGFuZGxlTW9kYWxCdXR0b25Db25maXJtLFxyXG4gIG9uQ2FuY2VsOiBjbG9zZUNvbmZpcm0sXHJcbn0pO1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1ZpZXcgPSAoe1xyXG4gIHByZXZpZXdPcGVuLFxyXG4gIHByZXZpZXdCdXN5LFxyXG4gIHByZXZpZXdFcnJvcixcclxuICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgcHJldmlld0FsdFRleHQsXHJcbiAgcHJldmlld1NjYWxlLFxyXG4gIHByZXZpZXdUcmFuc2xhdGUsXHJcbiAgcHJldmlld1N1cmZhY2VSZWYsXHJcbiAgY2xvc2VQcmV2aWV3LFxyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcclxuICBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXHJcbiAgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXHJcbn06IHtcclxuICBwcmV2aWV3T3BlbjogYm9vbGVhbjtcclxuICBwcmV2aWV3QnVzeTogYm9vbGVhbjtcclxuICBwcmV2aWV3RXJyb3I6IHN0cmluZztcclxuICBwcmV2aWV3SW1hZ2VVcmw6IHN0cmluZztcclxuICBwcmV2aWV3QWx0VGV4dDogc3RyaW5nO1xyXG4gIHByZXZpZXdTY2FsZTogbnVtYmVyO1xyXG4gIHByZXZpZXdUcmFuc2xhdGU6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfTtcclxuICBwcmV2aWV3U3VyZmFjZVJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgY2xvc2VQcmV2aWV3OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bjogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZTogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbn0pID0+ICh7XHJcbiAgb3BlbjogcHJldmlld09wZW4sXHJcbiAgYnVzeTogcHJldmlld0J1c3ksXHJcbiAgZXJyb3I6IHByZXZpZXdFcnJvcixcclxuICBpbWFnZVVybDogcHJldmlld0ltYWdlVXJsLFxyXG4gIGltYWdlQWx0OiBwcmV2aWV3QWx0VGV4dCxcclxuICBzY2FsZTogcHJldmlld1NjYWxlLFxyXG4gIHRyYW5zbGF0ZTogcHJldmlld1RyYW5zbGF0ZSxcclxuICBzdXJmYWNlUmVmOiBwcmV2aWV3U3VyZmFjZVJlZixcclxuICBvbkNsb3NlOiBjbG9zZVByZXZpZXcsXHJcbiAgb25Qb2ludGVyRG93bjogaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gIG9uUG9pbnRlck1vdmU6IGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcclxuICBvblBvaW50ZXJFbmQ6IGhhbmRsZVByZXZpZXdQb2ludGVyRW5kLFxyXG59KTtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZVZpZXcgPSB7XHJcbiAgdmlzaWJsZTogYm9vbGVhbjtcclxuICBwcm9qZWN0SWQ6IHN0cmluZztcclxuICByZWltYnVyc2FibGVFeHBlbnNlOiBudW1iZXI7XHJcbiAgaXNMb2FkaW5nOiBib29sZWFuO1xyXG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gIGRpc2FibGVkOiBib29sZWFuO1xyXG4gIG9uUHJvamVjdElkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvblJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2U6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXcgPSAoe1xyXG4gIGlzTG9hZGluZyxcclxuICBlcnJvck1lc3NhZ2UsXHJcbiAgaGVhZGVyLFxyXG4gIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gIHByZXZpZXdCdXN5LFxyXG4gIHByZXZpZXdFcnJvcixcclxuICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgcHJldmlld0FsdFRleHQsXHJcbiAgb3BlbkZpbGUsXHJcbiAgc3RhdHVzTGFiZWwsXHJcbiAgZ2FzdG9UeXBlTGFiZWwsXHJcbiAgdG90YWxBbW91bnRUZXh0LFxyXG4gIHRyYW5zRGF0ZVRleHQsXHJcbiAgdGlja2V0VGltZVRleHQsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkZXNjcmlwdGlvbkludmFsaWQsXHJcbiAgZGVzY3JpcHRpb25JbnB1dFJlZixcclxuICBkcmFmdEdhc3RvVHlwZSxcclxuICBnYXN0b1R5cGVJbnZhbGlkLFxyXG4gIGdhc3RvVHlwZUlucHV0UmVmLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGN1cnJlbmN5Q29kZUludmFsaWQsXHJcbiAgY3VycmVuY3lJbnB1dFJlZixcclxuICBkcmFmdFRvdGFsQW1vdW50LFxyXG4gIHRvdGFsQW1vdW50SW52YWxpZCxcclxuICB0b3RhbEFtb3VudElucHV0UmVmLFxyXG4gIGRyYWZ0QW1vdW50TVNULFxyXG4gIGFtb3VudE1TVEludmFsaWQsXHJcbiAgYW1vdW50TVNUSW5wdXRSZWYsXHJcbiAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgZXhjaGFuZ2VSYXRlSW52YWxpZCxcclxuICBleGNoYW5nZVJhdGVJbnB1dFJlZixcclxuICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSxcclxuICBsb2NhbEN1cnJlbmN5Q29kZSxcclxuICBkcmFmdFRyYW5zRGF0ZSxcclxuICBkcmFmdFRpY2tldFRpbWUsXHJcbiAgZHJhZnRVcmxGaWxlLFxyXG4gIGRyYWZ0RmlsZU5hbWUsXHJcbiAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICBzZXREcmFmdEdhc3RvVHlwZSxcclxuICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICBzZXREcmFmdFRvdGFsQW1vdW50LFxyXG4gIHNldERyYWZ0QW1vdW50TVNULFxyXG4gIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIGNvbW1pdERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIGlzRnJvbVNoZWV0TGluayxcclxuICBsaW5rZWRMaW5lLFxyXG4gIGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQsXHJcbiAgdmlzaWJsZUxpbmVzLFxyXG4gIHRvdGFsTGluZVBhZ2VzLFxyXG4gIGxpbmVQYWdlLFxyXG4gIHNhZmVDdXJyZW5jeUNvZGUsXHJcbiAgcGFnaW5hdGlvbkxhYmVscyxcclxuICBsaW5lQ29udGFpbmVyUmVmLFxyXG4gIHNldExpbmVQYWdlLFxyXG4gIG9wZW5MaW5lRGV0YWlsLFxyXG59OiB7XHJcbiAgaXNMb2FkaW5nOiBib29sZWFuO1xyXG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw7XHJcbiAgc2hvd1N0aWNreVByZXZpZXc6IGJvb2xlYW47XHJcbiAgcHJldmlld0J1c3k6IGJvb2xlYW47XHJcbiAgcHJldmlld0Vycm9yOiBzdHJpbmc7XHJcbiAgcHJldmlld0ltYWdlVXJsOiBzdHJpbmc7XHJcbiAgcHJldmlld0FsdFRleHQ6IHN0cmluZztcclxuICBvcGVuRmlsZTogKCkgPT4gdm9pZDtcclxuICBzdGF0dXNMYWJlbDogc3RyaW5nO1xyXG4gIGdhc3RvVHlwZUxhYmVsOiBzdHJpbmc7XHJcbiAgdG90YWxBbW91bnRUZXh0OiBzdHJpbmc7XHJcbiAgdHJhbnNEYXRlVGV4dDogc3RyaW5nO1xyXG4gIHRpY2tldFRpbWVUZXh0OiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGdhc3RvVHlwZU9wdGlvbnM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXTtcclxuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb25JbnZhbGlkOiBib29sZWFuO1xyXG4gIGRlc2NyaXB0aW9uSW5wdXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcclxuICBnYXN0b1R5cGVJbnZhbGlkOiBib29sZWFuO1xyXG4gIGdhc3RvVHlwZUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZDogYm9vbGVhbjtcclxuICBjdXJyZW5jeUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIGRyYWZ0VG90YWxBbW91bnQ6IHN0cmluZztcclxuICB0b3RhbEFtb3VudEludmFsaWQ6IGJvb2xlYW47XHJcbiAgdG90YWxBbW91bnRJbnB1dFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICBkcmFmdEFtb3VudE1TVDogc3RyaW5nO1xyXG4gIGFtb3VudE1TVEludmFsaWQ6IGJvb2xlYW47XHJcbiAgYW1vdW50TVNUSW5wdXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcclxuICBleGNoYW5nZVJhdGVJbnZhbGlkOiBib29sZWFuO1xyXG4gIGV4Y2hhbmdlUmF0ZUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlOiBzdHJpbmc7XHJcbiAgbG9jYWxDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIGRyYWZ0VGlja2V0VGltZTogc3RyaW5nO1xyXG4gIGRyYWZ0VXJsRmlsZTogc3RyaW5nO1xyXG4gIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcclxuICBzZXREcmFmdERlc2NyaXB0aW9uOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXREcmFmdEdhc3RvVHlwZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0RHJhZnRDdXJyZW5jeUNvZGU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldERyYWZ0VG90YWxBbW91bnQ6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldERyYWZ0QW1vdW50TVNUOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXREcmFmdEV4Y2hhbmdlUmF0ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgY29tbWl0RHJhZnRFeGNoYW5nZVJhdGU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGlzRnJvbVNoZWV0TGluazogYm9vbGVhbjtcclxuICBsaW5rZWRMaW5lOiBFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lVmlldztcclxuICBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0OiAoKSA9PiB2b2lkO1xyXG4gIHZpc2libGVMaW5lczogRXhwZW5zZVRpY2tldERldGFpbExpbmVbXTtcclxuICB0b3RhbExpbmVQYWdlczogbnVtYmVyO1xyXG4gIGxpbmVQYWdlOiBudW1iZXI7XHJcbiAgc2FmZUN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIHBhZ2luYXRpb25MYWJlbHM6IHtcclxuICAgIGZpcnN0OiBzdHJpbmc7XHJcbiAgICBwcmV2OiBzdHJpbmc7XHJcbiAgICBuZXh0OiBzdHJpbmc7XHJcbiAgICBsYXN0OiBzdHJpbmc7XHJcbiAgfTtcclxuICBsaW5lQ29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBzZXRMaW5lUGFnZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcclxuICBvcGVuTGluZURldGFpbDogKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG59KSA9PiAoe1xyXG4gIGlzTG9hZGluZyxcclxuICBlcnJvck1lc3NhZ2UsXHJcbiAgaGVhZGVyLFxyXG4gIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gIHByZXZpZXdCdXN5LFxyXG4gIHByZXZpZXdFcnJvcixcclxuICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgcHJldmlld0ZpbGVOYW1lOiBwcmV2aWV3QWx0VGV4dCxcclxuICBwcmV2aWV3QWx0VGV4dCxcclxuICBvbk9wZW5QcmV2aWV3OiBvcGVuRmlsZSxcclxuICBzdGF0dXNMYWJlbCxcclxuICBnYXN0b1R5cGVMYWJlbCxcclxuICB0b3RhbEFtb3VudFRleHQsXHJcbiAgdHJhbnNEYXRlVGV4dCxcclxuICB0aWNrZXRUaW1lVGV4dCxcclxuICBpc0VkaXRpbmcsXHJcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICBkZXNjcmlwdGlvbklucHV0UmVmLFxyXG4gIGRyYWZ0R2FzdG9UeXBlLFxyXG4gIGdhc3RvVHlwZUludmFsaWQsXHJcbiAgZ2FzdG9UeXBlSW5wdXRSZWYsXHJcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICBjdXJyZW5jeUlucHV0UmVmLFxyXG4gIGRyYWZ0VG90YWxBbW91bnQsXHJcbiAgdG90YWxBbW91bnRJbnZhbGlkLFxyXG4gIHRvdGFsQW1vdW50SW5wdXRSZWYsXHJcbiAgZHJhZnRBbW91bnRNU1QsXHJcbiAgYW1vdW50TVNUSW52YWxpZCxcclxuICBhbW91bnRNU1RJbnB1dFJlZixcclxuICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICBleGNoYW5nZVJhdGVJbnZhbGlkLFxyXG4gIGV4Y2hhbmdlUmF0ZUlucHV0UmVmLFxyXG4gIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlLFxyXG4gIGxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0VHJhbnNEYXRlLFxyXG4gIGRyYWZ0VGlja2V0VGltZSxcclxuICBkcmFmdFVybEZpbGUsXHJcbiAgZHJhZnRGaWxlTmFtZSxcclxuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U6IHNldERyYWZ0RGVzY3JpcHRpb24sXHJcbiAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZTogc2V0RHJhZnRHYXN0b1R5cGUsXHJcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgb25EcmFmdFRvdGFsQW1vdW50Q2hhbmdlOiBzZXREcmFmdFRvdGFsQW1vdW50LFxyXG4gIG9uRHJhZnRBbW91bnRNU1RDaGFuZ2U6IHNldERyYWZ0QW1vdW50TVNULFxyXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U6IHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDb21taXQ6IGNvbW1pdERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIG9uT3BlbkZpbGU6IG9wZW5GaWxlLFxyXG4gIG9uT3BlbkV4cGVuc2VTaGVldDogaXNGcm9tU2hlZXRMaW5rID8gdW5kZWZpbmVkIDogaGFuZGxlT3BlbkV4cGVuc2VTaGVldCxcclxuICBsaW5rZWRMaW5lLFxyXG4gIHZpc2libGVMaW5lcyxcclxuICB0b3RhbExpbmVQYWdlcyxcclxuICBsaW5lUGFnZSxcclxuICBjdXJyZW5jeUNvZGU6IHNhZmVDdXJyZW5jeUNvZGUsXHJcbiAgcGFnaW5hdGlvbkxhYmVscyxcclxuICBjb250YWluZXJSZWY6IGxpbmVDb250YWluZXJSZWYsXHJcbiAgb25MaW5lUGFnZUNoYW5nZTogc2V0TGluZVBhZ2UsXHJcbiAgb25PcGVuTGluZTogb3BlbkxpbmVEZXRhaWwsXHJcbn0pO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3QXJncyA9IFBhcmFtZXRlcnM8dHlwZW9mIGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbE1vZGFsVmlldz5bMF07XHJcbnR5cGUgRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3QXJncyA9IFBhcmFtZXRlcnM8dHlwZW9mIGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3PlswXTtcclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXdBcmdzID0gUGFyYW1ldGVyczx0eXBlb2YgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXc+WzBdO1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUGFnZVZpZXdNb2RlbCA9ICh7XHJcbiAgbW9kYWxBcmdzLFxyXG4gIHByZXZpZXdBcmdzLFxyXG4gIGNvbnRlbnRBcmdzLFxyXG59OiB7XHJcbiAgbW9kYWxBcmdzOiBFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3QXJncztcclxuICBwcmV2aWV3QXJnczogRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3QXJncztcclxuICBjb250ZW50QXJnczogRXhwZW5zZVRpY2tldERldGFpbENvbnRlbnRWaWV3QXJncztcclxufSkgPT4gKHtcclxuICBtb2RhbDogYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3KG1vZGFsQXJncyksXHJcbiAgcHJldmlldzogYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1ZpZXcocHJldmlld0FyZ3MpLFxyXG4gIGNvbnRlbnQ6IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbENvbnRlbnRWaWV3KGNvbnRlbnRBcmdzKSxcclxufSk7XHJcblxyXG4vLyBLZWVwcyBmaWx0ZXIgY2FjaGUgd2lyaW5nIGFuZCBiYWNrIG5hdmlnYXRpb24gb3V0c2lkZSB0aGUgcGFnZSBjb250YWluZXIgYm9keS5cclxuY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbE5hdmlnYXRpb25TdGF0ZSA9ICh7XHJcbiAgZmlsZUlkLFxyXG4gIGRldGFpbE9yaWdpbixcclxuICBoZWFkZXJUcmFuc0RhdGUsXHJcbiAgY29udGV4dExpbmVSZWNJZCxcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG59OiB7XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgZGV0YWlsT3JpZ2luOiBzdHJpbmc7XHJcbiAgaGVhZGVyVHJhbnNEYXRlOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xyXG4gIGNvbnRleHRMaW5lUmVjSWQ6IHN0cmluZztcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0OiBSZXR1cm5UeXBlPHR5cGVvZiB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0PltcInRpY2tldFJldHVybkNvbnRleHRcIl07XHJcbn0pID0+IHtcclxuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgc2F2ZUNhY2hlZFN0YXRlLCBtYXJrUmVzZXRGaWx0ZXJzUmV0dXJuLCBjbGVhckNhY2hlZFN0YXRlIH0gPSB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlKCk7XHJcblxyXG4gIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxCYWNrTmF2aWdhdGlvbih7XHJcbiAgICBmaWxlSWQsXHJcbiAgICBkZXRhaWxPcmlnaW4sXHJcbiAgICBoZWFkZXJUcmFuc0RhdGUsXHJcbiAgICBjb250ZXh0TGluZVJlY0lkLFxyXG4gICAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxuICAgIHJlYWRDYWNoZWRTdGF0ZSxcclxuICAgIHNhdmVDYWNoZWRTdGF0ZSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG1hcmtSZXNldEZpbHRlcnNSZXR1cm4sXHJcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBSdW5zIHRoZSBvbmUtc2hvdCBhdXRvIGVkaXQgdHJhbnNpdGlvbiBmb3IgbGlua2VkIGNvbnRleHRzIGFmdGVyIGRldGFpbCBkYXRhIGlzIHJlYWR5LlxyXG5jb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQXV0b0VkaXQgPSAoe1xyXG4gIGF1dG9FZGl0TW9kZSxcclxuICBpc0Zyb21TaGVldExpbmssXHJcbiAgaXNMb2FkaW5nLFxyXG4gIGhlYWRlcixcclxuICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gIGNhbkF0dGVtcHRBdXRvRWRpdCxcclxufToge1xyXG4gIGF1dG9FZGl0TW9kZTogYm9vbGVhbjtcclxuICBpc0Zyb21TaGVldExpbms6IGJvb2xlYW47XHJcbiAgaXNMb2FkaW5nOiBib29sZWFuO1xyXG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw7XHJcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcclxuICBjYW5BdHRlbXB0QXV0b0VkaXQ6IGJvb2xlYW47XHJcbn0pID0+IHtcclxuICBjb25zdCBhdXRvRWRpdEF0dGVtcHRlZFJlZiA9IHVzZVJlZihmYWxzZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWF1dG9FZGl0TW9kZSB8fCBpc0Zyb21TaGVldExpbmsgfHwgYXV0b0VkaXRBdHRlbXB0ZWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgaWYgKGlzTG9hZGluZyB8fCAhaGVhZGVyIHx8ICFjYW5BdHRlbXB0QXV0b0VkaXQpIHJldHVybjtcclxuXHJcbiAgICBhdXRvRWRpdEF0dGVtcHRlZFJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQoKTtcclxuICB9LCBbYXV0b0VkaXRNb2RlLCBjYW5BdHRlbXB0QXV0b0VkaXQsIGhhbmRsZUVuYWJsZUVkaXQsIGhlYWRlciwgaXNGcm9tU2hlZXRMaW5rLCBpc0xvYWRpbmddKTtcclxufTtcclxuXHJcbi8vIFJlc29sdmVzIHBlcm1pc3Npb24gYW5kIGFjdGluZy11c2VyIHN0YXRlIHNvIHRoZSBwYWdlIGNvbnRhaW5lciBzdGF5cyBmb2N1c2VkIG9uIG9yY2hlc3RyYXRpb24uXHJcbmNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQZXJtaXNzaW9uU3RhdGUgPSAoKSA9PiB7XHJcbiAgY29uc3Qge1xyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gIH0gPSB1c2VBdXRoQ29udGV4dCgpO1xyXG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiVmlld1wiKTtcclxuICBjb25zdCBjYW5FZGl0VGlja2V0QnlNb2R1bGUgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIkVkaXRcIik7XHJcbiAgY29uc3QgY2FuRGVsZXRlVGlja2V0QnlNb2R1bGUgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIkZ1bGxBY2Nlc3NcIik7XHJcbiAgY29uc3QgaXNNYW5hZ2luZ090aGVyVXNlciA9IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VVc2VyKHtcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBjYW5FZGl0VGlja2V0OiBjYW5FZGl0VGlja2V0QnlNb2R1bGUgJiYgIWlzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICBjYW5EZWxldGVUaWNrZXQ6IGNhbkRlbGV0ZVRpY2tldEJ5TW9kdWxlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gT3ducyB0aGUgdGlja2V0IGRldGFpbCBwYWdlIG9yY2hlc3RyYXRpb24gd2hpbGUgdGhlIGNvbXBvbmVudCBzdGF5cyB0aGluIGZvciByZW5kZXJpbmcuXHJcbmNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQYWdlVmlld01vZGVsID0gKCkgPT4ge1xyXG4gIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfVElDS0VUX0ZJTEVfSURfXyk7XHJcbiAgY29uc3QgbGluZUNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHtcclxuICAgIGF1dG9FZGl0TW9kZSxcclxuICAgIGRldGFpbE9yaWdpbixcclxuICAgIGNvbnRleHRTaGVldElkLFxyXG4gICAgY29udGV4dExpbmVSZWNJZCxcclxuICAgIGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSxcclxuICAgIGlzRnJvbUV4cGVuc2VMaW5lLFxyXG4gICAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gICAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxuICB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbFJvdXRlQ29udGV4dCgpO1xyXG4gIGNvbnN0IHtcclxuICAgIGhhc0FjY2VzcyxcclxuICAgIGNhbkVkaXRUaWNrZXQsXHJcbiAgICBjYW5EZWxldGVUaWNrZXQsXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQZXJtaXNzaW9uU3RhdGUoKTtcclxuICBjb25zdCBnYXN0b1R5cGVPcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KCgpID0+IGdldEV4cGVuc2VHYXN0b1R5cGVPcHRpb25zKCksIFtdKTtcclxuICBjb25zdCBnYXN0b1R5cGVMYWJlbE1hcCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcclxuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIGdhc3RvVHlwZU9wdGlvbnMpIHtcclxuICAgICAgbWFwLnNldChTdHJpbmcob3B0aW9uLnZhbHVlKSwgb3B0aW9uLnRleHQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1hcDtcclxuICB9LCBbZ2FzdG9UeXBlT3B0aW9uc10pO1xyXG4gIGNvbnN0IHsgaGVhZGVyLCBsaW5lcywgaXNMb2FkaW5nLCBlcnJvck1lc3NhZ2UsIHJlbG9hZERldGFpbCB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlKHtcclxuICAgIGhhc0FjY2VzcyxcclxuICAgIGZpbGVJZCxcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gIH0pO1xyXG4gIGNvbnN0IGxpbmtlZEV4cGVuc2VTaGVldElkID0gdXNlTWVtbyhcclxuICAgICgpID0+IHNhZmVUZXh0KHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQgfHwgY29udGV4dFNoZWV0SWQgfHwgaGVhZGVyPy5ob2phR2FzdG9zSWREaXNwbGF5KSxcclxuICAgIFtjb250ZXh0U2hlZXRJZCwgaGVhZGVyPy5ob2phR2FzdG9zSWREaXNwbGF5LCB0aWNrZXRSZXR1cm5Db250ZXh0XVxyXG4gICk7XHJcbiAgY29uc3QgbGlua2VkU2hlZXRMaW5lID0gdXNlRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZSh7XHJcbiAgICBlbmFibGVkOiAhIWxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gICAgc2hlZXRJZDogbGlua2VkRXhwZW5zZVNoZWV0SWQsXHJcbiAgICBsaW5lUmVjSWQ6IGNvbnRleHRMaW5lUmVjSWQsXHJcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICB9KTtcclxuICBjb25zdCB7XHJcbiAgICBsaW5rU2hlZXRMb2NrZWQsXHJcbiAgICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZSxcclxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcclxuICB9ID0gdXNlRXhwZW5zZVRpY2tldExpbmtTaGVldEdhdGUoe1xyXG4gICAgaXNMaW5rTW9kZTogISFsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICAgIGxpbmtTaGVldElkOiBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICAgIGNhblByb2Nlc3NMaW5rTW9kZTogdHJ1ZSxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHJlc29sdmVCbG9ja2VkTWVzc2FnZTogcmVzb2x2ZUxpbmtlZFRpY2tldEJsb2NrZWRNZXNzYWdlLFxyXG4gIH0pO1xyXG4gIGNvbnN0IFtzaGVldFN5bmNCbG9ja2VkLCBzZXRTaGVldFN5bmNCbG9ja2VkXSA9IHVzZVN0YXRlKCgpID0+ICEhcmVhZEV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZShmaWxlSWQpKTtcclxuICBjb25zdCBbc2hlZXRTeW5jQmxvY2tlZE1lc3NhZ2UsIHNldFNoZWV0U3luY0Jsb2NrZWRNZXNzYWdlXSA9IHVzZVN0YXRlKCgpID0+XHJcbiAgICBzYWZlVGV4dChyZWFkRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKGZpbGVJZCk/Lm1lc3NhZ2UpXHJcbiAgKTtcclxuICBjb25zdCBleGNoYW5nZVJhdGVSZXF1ZXN0SWRSZWYgPSB1c2VSZWYoMCk7XHJcbiAgY29uc3QgW2V4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlLCBzZXRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbY29udGV4dERlZmF1bHRDdXJyZW5jeUNvZGUsIHNldENvbnRleHREZWZhdWx0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbGV0IGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG5cclxuICAgIGNvbnN0IGxvYWREZWZhdWx0Q3VycmVuY3lDb2RlID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBjb25zdCBkZWZhdWx0Q3VycmVuY3lDb2RlID0gbm9ybWFsaXplRXhwZW5zZUxpbmVDdXJyZW5jeUNvZGUoXHJcbiAgICAgICAgYXdhaXQgZ2V0RXhwZW5zZVNoZWV0RGVmYXVsdEN1cnJlbmN5Q29kZSh7XHJcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmICghaXNDYW5jZWxsZWQpIHtcclxuICAgICAgICBzZXRDb250ZXh0RGVmYXVsdEN1cnJlbmN5Q29kZShkZWZhdWx0Q3VycmVuY3lDb2RlKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2b2lkIGxvYWREZWZhdWx0Q3VycmVuY3lDb2RlKCk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaXNDYW5jZWxsZWQgPSB0cnVlO1xyXG4gICAgICBjb250cm9sbGVyLmFib3J0KCk7XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHN5bmNTdGF0ZSA9IHJlYWRFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoZmlsZUlkKTtcclxuICAgIHNldFNoZWV0U3luY0Jsb2NrZWQoISFzeW5jU3RhdGUpO1xyXG4gICAgc2V0U2hlZXRTeW5jQmxvY2tlZE1lc3NhZ2Uoc2FmZVRleHQoc3luY1N0YXRlPy5tZXNzYWdlKSk7XHJcbiAgfSwgW2ZpbGVJZF0pO1xyXG5cclxuICBjb25zdCBwZW5kaW5nRmlyc3RMaW5rID1cclxuICAgIGRldGFpbE9yaWdpbiA9PT0gXCJzaGVldC1jcmVhdGVcIiAmJiAhIXNhZmVUZXh0KHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQgfHwgY29udGV4dFNoZWV0SWQpICYmICFzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZERpc3BsYXkpO1xyXG4gIGNvbnN0IHNoZWV0V29ya2Zsb3dCbG9ja01lc3NhZ2UgPSBwZW5kaW5nRmlyc3RMaW5rXHJcbiAgICA/IGluZFQoXCJFeHBlbnNlVGlja2V0c19TaGVldFN5bmNfUGVuZGluZ1NhdmVSZXF1aXJlZFwiLCBcIlNhdmUgdGhlIHRpY2tldCBiZWZvcmUgbGVhdmluZyB0aGlzIGZsb3cuXCIpXHJcbiAgICA6IHNoZWV0U3luY0Jsb2NrZWRNZXNzYWdlIHx8XHJcbiAgICAgIGluZFQoXHJcbiAgICAgICAgXCJFeHBlbnNlVGlja2V0c19TaGVldFN5bmNfUmV0cnlSZXF1aXJlZFwiLFxyXG4gICAgICAgIFwiVGlja2V0IGRhdGEgY2hhbmdlZCwgYnV0IHdlIGNvdWxkIG5vdCBzeW5jIHRoZSBleHBlbnNlIGxpbmUuIFNhdmUgYWdhaW4gYmVmb3JlIGxlYXZpbmcuXCJcclxuICAgICAgKTtcclxuXG4gIGNvbnN0IHsgbWFya1Jlc2V0RmlsdGVyc1JldHVybiwgY2xlYXJDYWNoZWRTdGF0ZSB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbE5hdmlnYXRpb25TdGF0ZSh7XG4gICAgZmlsZUlkLFxyXG4gICAgZGV0YWlsT3JpZ2luLFxyXG4gICAgaGVhZGVyVHJhbnNEYXRlOiBoZWFkZXI/LnRyYW5zRGF0ZSxcclxuICAgIGNvbnRleHRMaW5lUmVjSWQsXHJcbiAgICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIH0pO1xyXG4gIGNvbnN0IGNhbkVkaXRMaW5rZWRUaWNrZXQgPSAhbGlua2VkRXhwZW5zZVNoZWV0SWQgfHwgKCFsaW5rU2hlZXRDaGVja0J1c3kgJiYgIWxpbmtTaGVldExvY2tlZCk7XHJcbiAgY29uc3QgYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCA9IGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSB8fCAoISFsaW5rZWRFeHBlbnNlU2hlZXRJZCAmJiBjYW5FZGl0TGlua2VkVGlja2V0KTtcclxuICBjb25zdCB0aWNrZXRMb2NhbEN1cnJlbmN5Q29kZSA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBub3JtYWxpemVFeHBlbnNlTGluZUN1cnJlbmN5Q29kZShsaW5rZWRTaGVldExpbmUubG9jYWxDdXJyZW5jeUNvZGUgfHwgY29udGV4dERlZmF1bHRDdXJyZW5jeUNvZGUpLFxyXG4gICAgW2NvbnRleHREZWZhdWx0Q3VycmVuY3lDb2RlLCBsaW5rZWRTaGVldExpbmUubG9jYWxDdXJyZW5jeUNvZGVdXHJcbiAgKTtcclxuICBjb25zdCB7XHJcbiAgICBidXN5LFxyXG4gICAgc3RhdHVzLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxFcnJvcixcclxuICAgIGxpbmVQYWdlLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICAgIGRlc2NyaXB0aW9uSW5wdXRSZWYsXHJcbiAgICBkcmFmdEdhc3RvVHlwZSxcclxuICAgIGdhc3RvVHlwZUludmFsaWQsXHJcbiAgICBnYXN0b1R5cGVJbnB1dFJlZixcclxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICAgIGN1cnJlbmN5SW5wdXRSZWYsXHJcbiAgICBkcmFmdFRvdGFsQW1vdW50LFxyXG4gICAgdG90YWxBbW91bnRJbnZhbGlkLFxyXG4gICAgdG90YWxBbW91bnRJbnB1dFJlZixcclxuICAgIGRyYWZ0QW1vdW50TVNULFxyXG4gICAgYW1vdW50TVNUSW52YWxpZCxcclxuICAgIGFtb3VudE1TVElucHV0UmVmLFxyXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBleGNoYW5nZVJhdGVJbnZhbGlkLFxyXG4gICAgZXhjaGFuZ2VSYXRlSW5wdXRSZWYsXHJcbiAgICBsb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgIGRyYWZ0VHJhbnNEYXRlLFxyXG4gICAgZHJhZnRUaWNrZXRUaW1lLFxyXG4gICAgZHJhZnRDb21lbnRhcmlvLFxyXG4gICAgZHJhZnRVcmxGaWxlLFxyXG4gICAgZHJhZnRGaWxlTmFtZSxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRHYXN0b1R5cGUsXHJcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIHNldERyYWZ0VG90YWxBbW91bnQsXHJcbiAgICBzZXREcmFmdEFtb3VudE1TVCxcclxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgY29tbWl0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbEVkaXRvcih7XHJcbiAgICBoZWFkZXIsXHJcbiAgICBsaW5rZWRFeHBlbnNlTGluZTogbGlua2VkU2hlZXRMaW5lLmxpbmUsXHJcbiAgICBsb2NhbEN1cnJlbmN5Q29kZTogdGlja2V0TG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICBsaW5lQ291bnQ6IGxpbmVzLmxlbmd0aCxcclxuICAgIHBhZ2VTaXplOiBMSU5FU19QQUdFX1NJWkUsXHJcbiAgICBjYW5FZGl0VGlja2V0OiBjYW5FZGl0VGlja2V0ICYmIGNhbkVkaXRMaW5rZWRUaWNrZXQsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0LFxyXG4gICAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXHJcbiAgfSk7XHJcbiAgY29uc3QgaGFuZGxlVGlja2V0Q3VycmVuY3lDb2RlQ2hhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICBjb25zdCBuZXh0Q3VycmVuY3lDb2RlID0gbm9ybWFsaXplRXhwZW5zZUxpbmVDdXJyZW5jeUNvZGUodmFsdWUpO1xyXG4gICAgICBzZXREcmFmdEN1cnJlbmN5Q29kZShuZXh0Q3VycmVuY3lDb2RlKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UoXCJcIik7XHJcblxyXG4gICAgICBpZiAoIW5leHRDdXJyZW5jeUNvZGUgfHwgIWxvY2FsQ3VycmVuY3lDb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobmV4dEN1cnJlbmN5Q29kZSA9PT0gbm9ybWFsaXplRXhwZW5zZUxpbmVDdXJyZW5jeUNvZGUobG9jYWxDdXJyZW5jeUNvZGUpKSB7XHJcbiAgICAgICAgZXhjaGFuZ2VSYXRlUmVxdWVzdElkUmVmLmN1cnJlbnQgKz0gMTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJlcXVlc3RJZCA9IGV4Y2hhbmdlUmF0ZVJlcXVlc3RJZFJlZi5jdXJyZW50ICsgMTtcclxuICAgICAgZXhjaGFuZ2VSYXRlUmVxdWVzdElkUmVmLmN1cnJlbnQgPSByZXF1ZXN0SWQ7XHJcblxyXG4gICAgICB2b2lkIChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IG9mZmljaWFsRXhjaGFuZ2VSYXRlID0gYXdhaXQgZmV0Y2hFeHBlbnNlT2ZmaWNpYWxFeGNoYW5nZVJhdGUoe1xyXG4gICAgICAgICAgICBsb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgICAgICAgICAgZXhwZW5zZUN1cnJlbmN5Q29kZTogbmV4dEN1cnJlbmN5Q29kZSxcclxuICAgICAgICAgICAgZGF0ZTogZHJhZnRUcmFuc0RhdGUgfHwgaGVhZGVyPy50aWNrZXREYXRlIHx8IGhlYWRlcj8udHJhbnNEYXRlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBpZiAocmVxdWVzdElkICE9PSBleGNoYW5nZVJhdGVSZXF1ZXN0SWRSZWYuY3VycmVudCB8fCAhb2ZmaWNpYWxFeGNoYW5nZVJhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbW1pdERyYWZ0RXhjaGFuZ2VSYXRlKGZvcm1hdEV4cGVuc2VFeGNoYW5nZVJhdGVJbnB1dFZhbHVlKG9mZmljaWFsRXhjaGFuZ2VSYXRlLmV4Y2hhbmdlUmF0ZSksIG5leHRDdXJyZW5jeUNvZGUpO1xyXG4gICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UoXHJcbiAgICAgICAgICAgIGJ1aWxkRXhwZW5zZUV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKHtcclxuICAgICAgICAgICAgICByYXdSYXRlOiBvZmZpY2lhbEV4Y2hhbmdlUmF0ZS5yYXdSYXRlLFxyXG4gICAgICAgICAgICAgIGRhdGU6IG9mZmljaWFsRXhjaGFuZ2VSYXRlLmRhdGUsXHJcbiAgICAgICAgICAgICAgc291cmNlOiBvZmZpY2lhbEV4Y2hhbmdlUmF0ZS5zb3VyY2UsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBpZiAocmVxdWVzdElkICE9PSBleGNoYW5nZVJhdGVSZXF1ZXN0SWRSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgbWVzc2FnZSA9XHJcbiAgICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgc2FmZVRleHQoZXJyb3IubWVzc2FnZSlcclxuICAgICAgICAgICAgICA/IHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpO1xyXG4gICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KSgpO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgY29tbWl0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICAgIGRyYWZ0VHJhbnNEYXRlLFxyXG4gICAgICBoZWFkZXI/LnRpY2tldERhdGUsXHJcbiAgICAgIGhlYWRlcj8udHJhbnNEYXRlLFxyXG4gICAgICBsb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBdXHJcbiAgKTtcclxuICBjb25zdCBoYW5kbGVUaWNrZXRFeGNoYW5nZVJhdGVDaGFuZ2UgPSB1c2VDYWxsYmFjayhcclxuICAgICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKFwiXCIpO1xyXG4gICAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSh2YWx1ZSk7XHJcbiAgICB9LFxyXG4gICAgW3NldERyYWZ0RXhjaGFuZ2VSYXRlXVxyXG4gICk7XHJcbiAgY29uc3QgaGFuZGxlVGlja2V0RXhjaGFuZ2VSYXRlQ29tbWl0ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZShcIlwiKTtcclxuICAgICAgY29tbWl0RHJhZnRFeGNoYW5nZVJhdGUodmFsdWUpO1xyXG4gICAgfSxcclxuICAgIFtjb21taXREcmFmdEV4Y2hhbmdlUmF0ZV1cclxuICApO1xyXG4gIGNvbnN0IGhhbmRsZVRpY2tldEFtb3VudE1TVENoYW5nZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldERyYWZ0QW1vdW50TVNUKHZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBbc2V0RHJhZnRBbW91bnRNU1RdXHJcbiAgKTtcclxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0SW5Db250ZXh0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGxpbmtTaGVldENoZWNrQnVzeSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxpbmtlZEV4cGVuc2VTaGVldElkICYmIGxpbmtTaGVldExvY2tlZCkge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID1cclxuICAgICAgICBzYWZlVGV4dChsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZSkgfHxcclxuICAgICAgICByZXNvbHZlTGlua2VkVGlja2V0QmxvY2tlZE1lc3NhZ2UoZmFsc2UpO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZShcIlwiKTtcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQoKTtcclxuICB9LCBbXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UsXHJcbiAgICBsaW5rU2hlZXRDaGVja0J1c3ksXHJcbiAgICBsaW5rU2hlZXRMb2NrZWQsXHJcbiAgICBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgXSk7XHJcbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdEluQ29udGV4dCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKFwiXCIpO1xyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCgpO1xyXG4gICAgbGlua2VkU2hlZXRMaW5lLnJlc2V0RHJhZnRQcm9qZWN0SWQoKTtcclxuICAgIGxpbmtlZFNoZWV0TGluZS5yZXNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSgpO1xyXG4gIH0sIFtoYW5kbGVDYW5jZWxFZGl0LCBsaW5rZWRTaGVldExpbmUucmVzZXREcmFmdFByb2plY3RJZCwgbGlua2VkU2hlZXRMaW5lLnJlc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlXSk7XHJcbiAgY29uc3QgeyBwYWdpbmF0aW9uTGFiZWxzLCBwcmV2aWV3QWx0VGV4dCwgc3RhdHVzTGFiZWwsIGdhc3RvVHlwZUxhYmVsLCB0b3RhbEFtb3VudFRleHQsIHRyYW5zRGF0ZVRleHQsIHRpY2tldFRpbWVUZXh0IH0gPVxyXG4gICAgdXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXkoe1xyXG4gICAgICBoZWFkZXIsXHJcbiAgICAgIGRyYWZ0R2FzdG9UeXBlLFxyXG4gICAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgICAgZHJhZnRUb3RhbEFtb3VudCxcclxuICAgICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICAgIGRyYWZ0VGlja2V0VGltZSxcclxuICAgICAgZHJhZnRGaWxlTmFtZSxcclxuICAgICAgaXNFZGl0aW5nLFxyXG4gICAgICBnYXN0b1R5cGVMYWJlbE1hcCxcclxuICAgIH0pO1xyXG4gIGNvbnN0IHtcclxuICAgIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gICAgcHJldmlld09wZW4sXHJcbiAgICBwcmV2aWV3QnVzeSxcclxuICAgIHByZXZpZXdFcnJvcixcclxuICAgIHByZXZpZXdJbWFnZVVybCxcclxuICAgIHByZXZpZXdTY2FsZSxcclxuICAgIHByZXZpZXdUcmFuc2xhdGUsXHJcbiAgICBwcmV2aWV3U3VyZmFjZVJlZixcclxuICAgIG9wZW5QcmV2aWV3LFxyXG4gICAgY2xvc2VQcmV2aWV3LFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlLFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWwoe1xyXG4gICAgZmlsZUlkLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgZHJhZnRVcmxGaWxlLFxyXG4gICAgaGVhZGVyVXJsRmlsZTogaGVhZGVyPy51cmxGaWxlLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB2aXNpYmxlTGluZXMgPSB1c2VNZW1vKCgpID0+IHBhZ2VkU2xpY2UobGluZXMsIGxpbmVQYWdlLCBMSU5FU19QQUdFX1NJWkUpLCBbbGluZVBhZ2UsIGxpbmVzXSk7XHJcbiAgY29uc3QgdG90YWxMaW5lUGFnZXMgPSBNYXRoLmNlaWwoKGxpbmVzLmxlbmd0aCB8fCAwKSAvIExJTkVTX1BBR0VfU0laRSk7XHJcblxyXG4gIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxBdXRvRWRpdCh7XHJcbiAgICBhdXRvRWRpdE1vZGUsXHJcbiAgICBpc0Zyb21TaGVldExpbmssXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBoZWFkZXIsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0OiBoYW5kbGVFbmFibGVFZGl0SW5Db250ZXh0LFxyXG4gICAgY2FuQXR0ZW1wdEF1dG9FZGl0OiAhbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB7IGhhbmRsZVVwZGF0ZSwgaGFuZGxlUGVyc2lzdEhlYWRlckRyYWZ0LCBoYW5kbGVEZWxldGUgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnMoe1xyXG4gICAgYnVzeSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGNhbkVkaXRUaWNrZXQ6IGNhbkVkaXRUaWNrZXQgJiYgY2FuRWRpdExpbmtlZFRpY2tldCxcclxuICAgIGNhbkRlbGV0ZVRpY2tldDogY2FuRGVsZXRlVGlja2V0ICYmIGNhbkVkaXRMaW5rZWRUaWNrZXQsXHJcbiAgICBmaWxlSWQsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRHYXN0b1R5cGUsXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIGRyYWZ0VG90YWxBbW91bnQsXHJcbiAgICBkcmFmdEFtb3VudE1TVCxcclxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgbG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICBkcmFmdFRyYW5zRGF0ZSxcclxuICAgIGRyYWZ0VGlja2V0VGltZSxcclxuICAgIGRyYWZ0Q29tZW50YXJpbyxcclxuICAgIGRyYWZ0VXJsRmlsZSxcclxuICAgIGRyYWZ0RmlsZU5hbWUsXHJcbiAgICBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICAgIGxpbmtlZEV4cGVuc2VMaW5lUmVjSWQ6IGlzRnJvbUV4cGVuc2VMaW5lID8gY29udGV4dExpbmVSZWNJZCA6IFwiXCIsXHJcbiAgICBsaW5rZWRFeHBlbnNlTGluZVByb2plY3RJZDogbGlua2VkU2hlZXRMaW5lLmRyYWZ0UHJvamVjdElkLFxyXG4gICAgbGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWRDaGFuZ2VkOiBpc0Zyb21FeHBlbnNlTGluZSAmJiBsaW5rZWRTaGVldExpbmUucHJvamVjdElkQ2hhbmdlZCxcclxuICAgIGxpbmtlZEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZTogbGlua2VkU2hlZXRMaW5lLmRyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgIGxpbmtlZEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZWQ6IGlzRnJvbUV4cGVuc2VMaW5lICYmIGxpbmtlZFNoZWV0TGluZS5yZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlZCxcclxuICAgIGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dDogaXNGcm9tRXhwZW5zZUxpbmUgJiYgbGlua2VkRXhwZW5zZVNoZWV0SWQgJiYgY29udGV4dExpbmVSZWNJZFxyXG4gICAgICA/IHtcclxuICAgICAgICAgIHNoZWV0SWQ6IGxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gICAgICAgICAgbGluZVJlY0lkOiBjb250ZXh0TGluZVJlY0lkLFxyXG4gICAgICAgIH1cclxuICAgICAgOiBudWxsLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlOiAobWVzc2FnZSkgPT4ge1xyXG4gICAgICBzZXRTaGVldFN5bmNCbG9ja2VkKHRydWUpO1xyXG4gICAgICBzZXRTaGVldFN5bmNCbG9ja2VkTWVzc2FnZShtZXNzYWdlKTtcclxuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgfSxcclxuICAgIG9uTGlua2VkU2hlZXRTeW5jU3VjY2VzczogKCkgPT4ge1xyXG4gICAgICBzZXRTaGVldFN5bmNCbG9ja2VkKGZhbHNlKTtcclxuICAgICAgc2V0U2hlZXRTeW5jQmxvY2tlZE1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIGxpbmtlZFNoZWV0TGluZS5hY2NlcHREcmFmdFByb2plY3RJZCgpO1xyXG4gICAgICBsaW5rZWRTaGVldExpbmUuYWNjZXB0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlKCk7XHJcbiAgICB9LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIG1vZGFsTG9hZGluZ1RleHQsIG1vZGFsQ2FuY2VsVGV4dCwgbW9kYWxDb25maXJtVGV4dCwgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtIH0gPVxyXG4gICAgdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZSh7XHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG1vZGFsRXJyb3IsXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgIH0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFzaGVldFN5bmNCbG9ja2VkIHx8IGJ1c3kpIHJldHVybjtcclxuICAgIGlmICghc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSkgcmV0dXJuO1xyXG4gICAgaWYgKHN0YXR1cyA9PT0gc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSkgcmV0dXJuO1xyXG4gICAgc2V0U3RhdHVzKHNoZWV0V29ya2Zsb3dCbG9ja01lc3NhZ2UpO1xyXG4gIH0sIFtidXN5LCBzZXRTdGF0dXMsIHNoZWV0V29ya2Zsb3dCbG9ja01lc3NhZ2UsIHNoZWV0U3luY0Jsb2NrZWQsIHN0YXR1c10pO1xyXG5cclxuICBjb25zdCBpc0Fzc2lnbmVkVGlja2V0ID0gaGVhZGVyPy5zdGF0dXMgPT09IDE7XHJcbiAgY29uc3QgaXNDb250ZXh0TG9ja2VkID0gKGlzQXNzaWduZWRUaWNrZXQgJiYgIWFsbG93QXNzaWduZWREcmFmdEVkaXQpIHx8ICghIWxpbmtlZEV4cGVuc2VTaGVldElkICYmIGxpbmtTaGVldExvY2tlZCk7XHJcbiAgY29uc3QgY2FuRWRpdFRpY2tldEluQ29udGV4dCA9IGNhbkVkaXRUaWNrZXQgJiYgY2FuRWRpdExpbmtlZFRpY2tldCAmJiAhaXNGcm9tU2hlZXRMaW5rO1xyXG4gIGNvbnN0IGNhbkNyZWF0ZVRpY2tldExpbmVJbkNvbnRleHQgPSBjYW5FZGl0VGlja2V0SW5Db250ZXh0ICYmICFpc0NvbnRleHRMb2NrZWQgJiYgIXNoZWV0U3luY0Jsb2NrZWQ7XHJcbiAgY29uc3QgY2FuRGVsZXRlVGlja2V0SW5Db250ZXh0ID0gY2FuRGVsZXRlVGlja2V0ICYmIGNhbkVkaXRMaW5rZWRUaWNrZXQgJiYgIWlzRnJvbVNoZWV0TGluaztcclxuICBjb25zdCBjYW5EZWxldGVVbmxpbmtlZFRpY2tldEFmdGVyU3luY0Vycm9yID1cbiAgICBwZW5kaW5nRmlyc3RMaW5rICYmXG4gICAgc2hlZXRTeW5jQmxvY2tlZCAmJlxuICAgIGNhbkRlbGV0ZVRpY2tldEluQ29udGV4dCAmJlxuICAgICEhc2FmZVRleHQoZmlsZUlkKSAmJlxuICAgICEhaGVhZGVyICYmXG4gICAgIXNhZmVUZXh0KGhlYWRlci5ob2phR2FzdG9zSWREaXNwbGF5KTtcbiAgLy8gSGFyZCBibG9ja2luZyBpcyBsaW1pdGVkIHRvIGVkaXQgb3IgbmV3bHkgY3JlYXRlZCByZWNvdmVyeSBmbG93czsgcmVhZC1vbmx5IHN5bmMgZXJyb3JzIG11c3Qgc3RheSBuYXZpZ2FibGUuXG4gIGNvbnN0IHNob3VsZEhhcmRCbG9ja1dvcmtmbG93RXhpdCA9IHBlbmRpbmdGaXJzdExpbmsgfHwgKHNoZWV0U3luY0Jsb2NrZWQgJiYgaXNFZGl0aW5nKTtcbiAgY29uc3QgaGFzTmF2aWdhdGlvbkd1YXJkID0gYnVzeSB8fCBpc0VkaXRpbmcgfHwgc2hvdWxkSGFyZEJsb2NrV29ya2Zsb3dFeGl0O1xuICBjb25zdCBuYXZpZ2F0aW9uR3VhcmRNZXNzYWdlID0gc2hvdWxkSGFyZEJsb2NrV29ya2Zsb3dFeGl0ID8gc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSA6IHVuZGVmaW5lZDtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaGFzTmF2aWdhdGlvbkd1YXJkKSB7XG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKHtcbiAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgIG1lc3NhZ2U6IG5hdmlnYXRpb25HdWFyZE1lc3NhZ2UsXG4gICAgICBibG9jazogc2hvdWxkSGFyZEJsb2NrV29ya2Zsb3dFeGl0LFxuICAgIH0pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcbiAgICB9O1xuICB9LCBbaGFzTmF2aWdhdGlvbkd1YXJkLCBuYXZpZ2F0aW9uR3VhcmRNZXNzYWdlLCBzaG91bGRIYXJkQmxvY2tXb3JrZmxvd0V4aXRdKTtcblxyXG4gIHVzZUV4cGVuc2VUaWNrZXRUb3BiYXJCYWNrTG9jayh7XG4gICAgbG9ja2VkOiBzaG91bGRIYXJkQmxvY2tXb3JrZmxvd0V4aXQsXG4gICAgbWVzc2FnZTogc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSxcbiAgfSk7XG4gIGNvbnN0IHRpY2tldFRvcGJhckFjdGlvbk1vZGU6IFwiZGVmYXVsdFwiIHwgXCJzYXZlX29ubHlcIiB8IFwic2F2ZV9kZWxldGVcIiB8IFwidmlld19vbmx5XCIgPVxyXG4gICAgcGVuZGluZ0ZpcnN0TGluayAmJiBpc0VkaXRpbmdcclxuICAgICAgPyBjYW5EZWxldGVVbmxpbmtlZFRpY2tldEFmdGVyU3luY0Vycm9yXHJcbiAgICAgICAgPyBcInNhdmVfZGVsZXRlXCJcclxuICAgICAgICA6IFwic2F2ZV9vbmx5XCJcclxuICAgICAgOiAhY2FuRWRpdFRpY2tldEluQ29udGV4dCAmJiAhY2FuRGVsZXRlVGlja2V0SW5Db250ZXh0XHJcbiAgICAgICAgPyBcInZpZXdfb25seVwiXHJcbiAgICAgICAgOiBcImRlZmF1bHRcIjtcclxuXHJcbiAgdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMoe1xyXG4gICAgYnVzeSxcclxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzTG9ja2VkOiBpc0NvbnRleHRMb2NrZWQsXHJcbiAgICBpc0RlbGV0ZUxvY2tlZDogY2FuRGVsZXRlVW5saW5rZWRUaWNrZXRBZnRlclN5bmNFcnJvciA/IGZhbHNlIDogdW5kZWZpbmVkLFxyXG4gICAgYWN0aW9uTW9kZTogdGlja2V0VG9wYmFyQWN0aW9uTW9kZSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHk6IG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICAgIGNhbkVkaXRUaWNrZXQ6IGNhbkVkaXRUaWNrZXRJbkNvbnRleHQsXHJcbiAgICBjYW5EZWxldGVUaWNrZXQ6IGNhbkRlbGV0ZVRpY2tldEluQ29udGV4dCxcclxuICAgIGZpbGVJZCxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0OiBoYW5kbGVFbmFibGVFZGl0SW5Db250ZXh0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdDogaGFuZGxlQ2FuY2VsRWRpdEluQ29udGV4dCxcclxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICAgIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgaWYgKChpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUgfHwgaXNGcm9tRXhwZW5zZUxpbmUpICYmIGxpbmtlZEV4cGVuc2VTaGVldElkKSB7XHJcbiAgICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xyXG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsKGxpbmtlZEV4cGVuc2VTaGVldElkKSwge1xyXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdm9pZCByZWxvYWREZXRhaWwoKTtcclxuICAgIH0sXHJcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgaWYgKHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQpIHtcclxuICAgICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XHJcbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwodGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkKSwge1xyXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbWFya1Jlc2V0RmlsdGVyc1JldHVybigpO1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvVGlja2V0c1wiLCB7XHJcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBvcGVuQ3JlYXRlTGluZURldGFpbCwgb3BlbkxpbmVEZXRhaWwsIHJlc29sdmVDbGlja2FibGVDYXJkLCBvcGVuRmlsZSwgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCB9ID1cclxuICAgIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMoe1xyXG4gICAgYnVzeSxcclxuICAgIGZpbGVJZCxcbiAgICBjb250ZXh0U2hlZXRJZDogbGlua2VkRXhwZW5zZVNoZWV0SWQsXG4gICAgaXNGcm9tU2hlZXRMaW5rLFxuICAgIGhlYWRlckV4cGVuc2VTaGVldElkOiBzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZERpc3BsYXkpLFxuICAgIGlzRWRpdGluZyxcbiAgICBjYW5PcGVuU2F2ZUNvbmZpcm0sXG4gICAgaGFuZGxlUGVyc2lzdEhlYWRlckRyYWZ0LFxuICAgIGJ5cGFzc1dvcmtmbG93R3VhcmQ6IHNob3VsZEhhcmRCbG9ja1dvcmtmbG93RXhpdCxcbiAgICBsaW5lQ29udGFpbmVyUmVmLFxuICAgIG9wZW5QcmV2aWV3LFxuICAgIHRpY2tldFJldHVybkNvbnRleHQsXG4gIH0pO1xuXHJcbiAgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyh7XHJcbiAgICBjb250YWluZXJSZWY6IGxpbmVDb250YWluZXJSZWYsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBpdGVtczogdmlzaWJsZUxpbmVzLFxyXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGRldGFpbFZpZXcgPSBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlVmlld01vZGVsKHtcclxuICAgIG1vZGFsQXJnczoge1xyXG4gICAgICBtb2RhbCxcclxuICAgICAgbW9kYWxDb25maXJtVGV4dCxcclxuICAgICAgbW9kYWxDYW5jZWxUZXh0LFxyXG4gICAgICBtb2RhbExvYWRpbmdUZXh0LFxyXG4gICAgICBidXN5LFxyXG4gICAgICBtb2RhbEVycm9yLFxyXG4gICAgICBzdGF0dXMsXHJcbiAgICAgIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcclxuICAgICAgY2xvc2VDb25maXJtLFxyXG4gICAgfSxcclxuICAgIHByZXZpZXdBcmdzOiB7XHJcbiAgICAgIHByZXZpZXdPcGVuLFxyXG4gICAgICBwcmV2aWV3QnVzeSxcclxuICAgICAgcHJldmlld0Vycm9yLFxyXG4gICAgICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgICAgIHByZXZpZXdBbHRUZXh0LFxyXG4gICAgICBwcmV2aWV3U2NhbGUsXHJcbiAgICAgIHByZXZpZXdUcmFuc2xhdGUsXHJcbiAgICAgIHByZXZpZXdTdXJmYWNlUmVmLFxyXG4gICAgICBjbG9zZVByZXZpZXcsXHJcbiAgICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcclxuICAgICAgaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlLFxyXG4gICAgICBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxuICAgIH0sXHJcbiAgICBjb250ZW50QXJnczoge1xyXG4gICAgICBpc0xvYWRpbmcsXHJcbiAgICAgIGVycm9yTWVzc2FnZSxcclxuICAgICAgaGVhZGVyLFxyXG4gICAgICBzaG93U3RpY2t5UHJldmlldyxcclxuICAgICAgcHJldmlld0J1c3ksXHJcbiAgICAgIHByZXZpZXdFcnJvcixcclxuICAgICAgcHJldmlld0ltYWdlVXJsLFxyXG4gICAgICBwcmV2aWV3QWx0VGV4dCxcclxuICAgICAgb3BlbkZpbGUsXHJcbiAgICAgIHN0YXR1c0xhYmVsLFxyXG4gICAgICBnYXN0b1R5cGVMYWJlbCxcclxuICAgICAgdG90YWxBbW91bnRUZXh0LFxyXG4gICAgICB0cmFuc0RhdGVUZXh0LFxyXG4gICAgICB0aWNrZXRUaW1lVGV4dCxcclxuICAgICAgaXNFZGl0aW5nLFxyXG4gICAgICBnYXN0b1R5cGVPcHRpb25zLFxyXG4gICAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgICBkZXNjcmlwdGlvbkludmFsaWQsXHJcbiAgICAgIGRlc2NyaXB0aW9uSW5wdXRSZWYsXHJcbiAgICAgIGRyYWZ0R2FzdG9UeXBlLFxyXG4gICAgICBnYXN0b1R5cGVJbnZhbGlkLFxyXG4gICAgICBnYXN0b1R5cGVJbnB1dFJlZixcclxuICAgICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICAgIGN1cnJlbmN5Q29kZUludmFsaWQsXHJcbiAgICAgIGN1cnJlbmN5SW5wdXRSZWYsXHJcbiAgICAgIGRyYWZ0VG90YWxBbW91bnQsXHJcbiAgICAgIHRvdGFsQW1vdW50SW52YWxpZCxcclxuICAgICAgdG90YWxBbW91bnRJbnB1dFJlZixcclxuICAgICAgZHJhZnRBbW91bnRNU1QsXHJcbiAgICAgIGFtb3VudE1TVEludmFsaWQsXHJcbiAgICAgIGFtb3VudE1TVElucHV0UmVmLFxyXG4gICAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgICAgZXhjaGFuZ2VSYXRlSW52YWxpZCxcclxuICAgICAgZXhjaGFuZ2VSYXRlSW5wdXRSZWYsXHJcbiAgICAgIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlLFxyXG4gICAgICBsb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICAgIGRyYWZ0VGlja2V0VGltZSxcclxuICAgICAgZHJhZnRVcmxGaWxlLFxyXG4gICAgICBkcmFmdEZpbGVOYW1lLFxyXG4gICAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgICBzZXREcmFmdEdhc3RvVHlwZSxcclxuICAgICAgc2V0RHJhZnRDdXJyZW5jeUNvZGU6IGhhbmRsZVRpY2tldEN1cnJlbmN5Q29kZUNoYW5nZSxcclxuICAgICAgc2V0RHJhZnRUb3RhbEFtb3VudCxcclxuICAgICAgc2V0RHJhZnRBbW91bnRNU1Q6IGhhbmRsZVRpY2tldEFtb3VudE1TVENoYW5nZSxcclxuICAgICAgc2V0RHJhZnRFeGNoYW5nZVJhdGU6IGhhbmRsZVRpY2tldEV4Y2hhbmdlUmF0ZUNoYW5nZSxcclxuICAgICAgY29tbWl0RHJhZnRFeGNoYW5nZVJhdGU6IGhhbmRsZVRpY2tldEV4Y2hhbmdlUmF0ZUNvbW1pdCxcclxuICAgICAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gICAgICBsaW5rZWRMaW5lOiB7XHJcbiAgICAgICAgdmlzaWJsZTogaXNGcm9tRXhwZW5zZUxpbmUsXHJcbiAgICAgICAgcHJvamVjdElkOiBsaW5rZWRTaGVldExpbmUuZHJhZnRQcm9qZWN0SWQsXHJcbiAgICAgICAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogbGlua2VkU2hlZXRMaW5lLmRyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgICAgICBpc0xvYWRpbmc6IGxpbmtlZFNoZWV0TGluZS5pc0xvYWRpbmcsXHJcbiAgICAgICAgZXJyb3JNZXNzYWdlOiBsaW5rZWRTaGVldExpbmUuZXJyb3JNZXNzYWdlLFxyXG4gICAgICAgIGRpc2FibGVkOiBidXN5IHx8IGlzQ29udGV4dExvY2tlZCB8fCBsaW5rZWRTaGVldExpbmUuaXNMb2FkaW5nLFxyXG4gICAgICAgIG9uUHJvamVjdElkQ2hhbmdlOiBsaW5rZWRTaGVldExpbmUuc2V0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICAgICAgb25SZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlOiBsaW5rZWRTaGVldExpbmUuc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgICB9LFxyXG4gICAgICBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0LFxyXG4gICAgICB2aXNpYmxlTGluZXMsXHJcbiAgICAgIHRvdGFsTGluZVBhZ2VzLFxyXG4gICAgICBsaW5lUGFnZSxcclxuICAgICAgc2FmZUN1cnJlbmN5Q29kZTogaXNFZGl0aW5nID8gZHJhZnRDdXJyZW5jeUNvZGUgOiBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSksXHJcbiAgICAgIHBhZ2luYXRpb25MYWJlbHMsXHJcbiAgICAgIGxpbmVDb250YWluZXJSZWYsXHJcbiAgICAgIHNldExpbmVQYWdlLFxyXG4gICAgICBvcGVuTGluZURldGFpbCxcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5kZXRhaWxWaWV3LFxyXG4gICAgY2FuU2hvd0NyZWF0ZUxpbmVGYWI6IGNhbkNyZWF0ZVRpY2tldExpbmVJbkNvbnRleHQgJiYgIWlzTG9hZGluZyAmJiAhZXJyb3JNZXNzYWdlICYmICEhc2FmZVRleHQoZmlsZUlkKSAmJiAhIWhlYWRlcixcclxuICAgIGlzQ3JlYXRlTGluZUZhYkRpc2FibGVkOiBidXN5IHx8ICFoZWFkZXIsXHJcbiAgICBvcGVuQ3JlYXRlTGluZURldGFpbCxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgRXhwZW5zZVRpY2tldERldGFpbFBhZ2VDb250ZW50ID0gKCkgPT4ge1xyXG4gIGNvbnN0IGRldGFpbFZpZXcgPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUGFnZVZpZXdNb2RlbCgpO1xyXG4gIGNvbnN0IGZhYk1lbnVJdGVtcyA9IHVzZU1lbW88RmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbVtdPihcclxuICAgICgpID0+IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiBcIm5ldy10aWNrZXQtbGluZVwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfTmV3TGluZVwiLCBcIk51ZXZhIExpbmVhXCIpLFxyXG4gICAgICAgIGljb246IDxOZXdMaW5lSWNvbiAvPixcclxuICAgICAgICBvbkNsaWNrOiAoKSA9PiB7XHJcbiAgICAgICAgICB2b2lkIGRldGFpbFZpZXcub3BlbkNyZWF0ZUxpbmVEZXRhaWwoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpc2FibGVkOiBkZXRhaWxWaWV3LmlzQ3JlYXRlTGluZUZhYkRpc2FibGVkLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICAgIFtkZXRhaWxWaWV3XVxyXG4gICk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8RXhwZW5zZVRpY2tldERldGFpbFZpZXcgbW9kYWw9e2RldGFpbFZpZXcubW9kYWx9IHByZXZpZXc9e2RldGFpbFZpZXcucHJldmlld30gY29udGVudD17ZGV0YWlsVmlldy5jb250ZW50fSAvPlxyXG4gICAgICB7ZGV0YWlsVmlldy5jYW5TaG93Q3JlYXRlTGluZUZhYiA/IChcclxuICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b25cclxuICAgICAgICAgIGFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0FjdGlvbnNcIiwgXCJBY2Npb25lcyByYXBpZGFzXCIpfVxyXG4gICAgICAgICAgc2l6ZT17NzZ9XHJcbiAgICAgICAgICByaWdodD17MTZ9XHJcbiAgICAgICAgICBib3R0b209ezI0fVxyXG4gICAgICAgICAgbWVudUFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0FjdGlvbnNcIiwgXCJBY2Npb25lcyByYXBpZGFzXCIpfVxyXG4gICAgICAgICAgbWVudUl0ZW1zPXtmYWJNZW51SXRlbXN9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuLy8gTWFpbiBwYWdlIGVudHJ5IGZvciBleHBlbnNlIHRpY2tldCBkZXRhaWwuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnMgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQ+XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0RGV0YWlsUGFnZUNvbnRlbnQgLz5cclxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XHJcbiAgKTtcclxufTtcclxuXHJcbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xyXG4gIGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoKCk7XHJcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtcm9vdFwiKTtcclxuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xyXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVRpY2tldERldGFpbFBhZ2UgLz4pO1xyXG59O1xyXG5cclxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0RGV0YWlsUGFnZTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0IH0gZnJvbSBcIi4uLy4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50cy9leHBlbnNlR2FzdG9UeXBlQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyBleGVjdXRlRXhwZW5zZU11dGF0aW9uLCBwYXJzZURlY2ltYWxJbnB1dCB9IGZyb20gXCIuLi8uLi9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGRlbGV0ZUV4cGVuc2VTaGVldExpbmUsXHJcbiAgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0LFxyXG4gIGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldEZpbGUsXHJcbiAgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwsXHJcbiAgdXBkYXRlRXhwZW5zZVNoZWV0VGlja2V0LFxyXG59IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UsIHRvRXhwZW5zZUFwaURkTW1ZeXl5IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgc3luY0V4cGVuc2VMaW5rZWRUaWNrZXRTaGVldExpbmUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUxpbmtlZFRpY2tldFNoZWV0U3luYy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGlzRXhwZW5zZUxpbmVGb3JlaWduQ3VycmVuY3ksXHJcbiAgcmVzb2x2ZUV4cGVuc2VMaW5lQW1vdW50TVNURm9yQ3VycmVuY3lQYXlsb2FkLFxyXG4gIHJlc29sdmVFeHBlbnNlTGluZUV4Y2hhbmdlUmF0ZUZvckN1cnJlbmN5LFxyXG59IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTGluZUN1cnJlbmN5LnRzXCI7XHJcbmltcG9ydCB7IHJlc29sdmVFeHBlbnNlU2hlZXRFZGl0QWNjZXNzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VTaGVldEVkaXRBY2Nlc3MudHNcIjtcclxuaW1wb3J0IHsgY2xlYXJFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUsIHNhdmVFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIERlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCA9IHtcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgbGluZVJlY0lkOiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnNBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGNhbkVkaXRUaWNrZXQ6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlVGlja2V0OiBib29sZWFuO1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcclxuICBkcmFmdEdhc3RvVHlwZTogc3RyaW5nO1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRUb3RhbEFtb3VudDogc3RyaW5nO1xyXG4gIGRyYWZ0QW1vdW50TVNUOiBzdHJpbmc7XHJcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcclxuICBsb2NhbEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgZHJhZnRUaWNrZXRUaW1lOiBzdHJpbmc7XHJcbiAgZHJhZnRDb21lbnRhcmlvOiBzdHJpbmc7XHJcbiAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XHJcbiAgZHJhZnRGaWxlTmFtZTogc3RyaW5nO1xyXG4gIGxpbmtlZEV4cGVuc2VTaGVldElkPzogc3RyaW5nO1xyXG4gIGxpbmtlZEV4cGVuc2VMaW5lUmVjSWQ/OiBzdHJpbmc7XHJcbiAgbGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWQ/OiBzdHJpbmc7XHJcbiAgbGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWRDaGFuZ2VkPzogYm9vbGVhbjtcclxuICBsaW5rZWRFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2U/OiBudW1iZXIgfCBudWxsO1xyXG4gIGxpbmtlZEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZWQ/OiBib29sZWFuO1xyXG4gIGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dD86IERlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCB8IG51bGw7XHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcclxuICBjYW5NYW5hZ2VPdGhlclVzZXJzOiBib29sZWFuO1xyXG4gIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nO1xyXG4gIGN1cnJlbnRDcm1Vc2VySWQ6IHN0cmluZztcclxuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQ6IHN0cmluZztcclxuICBvbkxpbmtlZFNoZWV0U3luY0ZhaWx1cmU/OiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uTGlua2VkU2hlZXRTeW5jU3VjY2Vzcz86ICgpID0+IHZvaWQ7XHJcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0QnVzeTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbn07XHJcblxyXG4vLyBUcmllcyB0byBpbmZlciBhIHNhZmUgZXh0ZW5zaW9uIGZvciB1cGRhdGUgcGF5bG9hZCBmcm9tIGZpbGUgbmFtZSBvciBVUkwuXHJcbmNvbnN0IHJlc29sdmVUaWNrZXRGaWxlRXh0ZW5zaW9uID0gKGZpbGVOYW1lOiBzdHJpbmcsIHVybEZpbGU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgY29uc3Qgc291cmNlID0gU3RyaW5nKGZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSB8fCBTdHJpbmcodXJsRmlsZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgY29uc3QgbWF0Y2ggPSBzb3VyY2UubWF0Y2goL1xcLihbYS16QS1aMC05XXsxLDEwfSkoPzokfFs/I10pLyk7XHJcbiAgaWYgKCFtYXRjaCB8fCAhbWF0Y2hbMV0pIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgcmV0dXJuIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XHJcbn07XHJcblxyXG5jb25zdCBpc05vdEZvdW5kRXJyb3IgPSAoZXJyb3I6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDA0O1xyXG59O1xyXG5cclxuY29uc3QgaXNNaXNzaW5nVGlja2V0RmlsZU1lc3NhZ2UgPSAobWVzc2FnZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcobWVzc2FnZSB8fCBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhcmNoaXZvIGFzb2NpYWRvXCIpIHx8XHJcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXJjaGl2byBhZGp1bnRvXCIpIHx8XHJcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXNzb2NpYXRlZCBmaWxlXCIpIHx8XHJcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXR0YWNoZWQgZmlsZVwiKVxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBFbmNhcHN1bGF0ZXMgdXBkYXRlIGFuZCBkZWxldGUgbXV0YXRpb25zIGZvciB0aWNrZXQgaGVhZGVyIGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGNhbkVkaXRUaWNrZXQsXHJcbiAgY2FuRGVsZXRlVGlja2V0LFxyXG4gIGZpbGVJZCxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRyYWZ0R2FzdG9UeXBlLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0VG90YWxBbW91bnQsXHJcbiAgZHJhZnRBbW91bnRNU1QsXHJcbiAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgbG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgZHJhZnRUaWNrZXRUaW1lLFxyXG4gIGRyYWZ0Q29tZW50YXJpbyxcclxuICBkcmFmdFVybEZpbGUsXHJcbiAgZHJhZnRGaWxlTmFtZSxcclxuICBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICBsaW5rZWRFeHBlbnNlTGluZVJlY0lkLFxyXG4gIGxpbmtlZEV4cGVuc2VMaW5lUHJvamVjdElkLFxyXG4gIGxpbmtlZEV4cGVuc2VMaW5lUHJvamVjdElkQ2hhbmdlZCA9IGZhbHNlLFxyXG4gIGxpbmtlZEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICBsaW5rZWRFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2VkID0gZmFsc2UsXHJcbiAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0LFxyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICBjdXJyZW50QXhVc2VySWQsXHJcbiAgY3VycmVudENybVVzZXJJZCxcclxuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlLFxyXG4gIG9uTGlua2VkU2hlZXRTeW5jU3VjY2VzcyxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIHNldEJ1c3ksXHJcbiAgc2V0U3RhdHVzLFxyXG4gIHNldElzRWRpdGluZyxcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9uc0FyZ3MpID0+IHtcclxuICBjb25zdCB2YWxpZGF0ZUxpbmtlZFNoZWV0QmVmb3JlTXV0YXRpb24gPSB1c2VDYWxsYmFjayhhc3luYyAoKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiA9PiB7XHJcbiAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KGxpbmtlZEV4cGVuc2VTaGVldElkKTtcclxuICAgIGlmICghc2FmZVNoZWV0SWQpIHtcclxuICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWNjZXNzUmVzdWx0ID0gYXdhaXQgcmVzb2x2ZUV4cGVuc2VTaGVldEVkaXRBY2Nlc3Moe1xyXG4gICAgICBzaGVldElkOiBzYWZlU2hlZXRJZCxcclxuICAgICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICBpZiAoIWFjY2Vzc1Jlc3VsdC5pc0xvY2tlZCkge1xyXG4gICAgICByZXR1cm4gc2FmZVNoZWV0SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWVzc2FnZSA9XHJcbiAgICAgIHNhZmVUZXh0KGFjY2Vzc1Jlc3VsdC5ibG9ja2VkTWVzc2FnZSkgfHxcclxuICAgICAgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1JlYWRPbmx5QnlTdGF0dXNcIiwgXCJObyBzZSBwdWVkZSBlZGl0YXIgZXN0YSBob2phIGRlIGdhc3RvcyBlbiBlbCBlc3RhZG8gYWN0dWFsLlwiKTtcclxuICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9LCBbXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgXSk7XHJcblxyXG4gIGNvbnN0IHJ1bkhlYWRlclVwZGF0ZSA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jICh7XG4gICAgICBzeW5jU2hlZXRMaW5lLFxuICAgICAgY29udGludWVPblNoZWV0U3luY0ZhaWx1cmUgPSBmYWxzZSxcbiAgICB9OiB7XG4gICAgICBzeW5jU2hlZXRMaW5lOiBib29sZWFuO1xuICAgICAgY29udGludWVPblNoZWV0U3luY0ZhaWx1cmU/OiBib29sZWFuO1xuICAgIH0pOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcbiAgICAgIGlmIChidXN5IHx8ICFpc0VkaXRpbmcpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKCFjYW5FZGl0VGlja2V0KSB7XHJcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgbm9ybWFsaXplZERlc2NyaXB0aW9uID0gU3RyaW5nKGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpO1xyXG4gICAgICBpZiAoIW5vcm1hbGl6ZWREZXNjcmlwdGlvbikge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0Rlc2NyaXB0aW9uUmVxdWlyZWRcIiwgXCJEZXNjcmlwdGlvbiBpcyByZXF1aXJlZC5cIik7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3kgPSBTdHJpbmcoZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgIGlmICghbm9ybWFsaXplZEN1cnJlbmN5KSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fQ3VycmVuY3lSZXF1aXJlZFwiLCBcIkN1cnJlbmN5IGlzIHJlcXVpcmVkLlwiKTtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHBhcnNlZFRvdGFsQW1vdW50ID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRUb3RhbEFtb3VudCk7XHJcbiAgICAgIGlmIChwYXJzZWRUb3RhbEFtb3VudCA9PSBudWxsIHx8IHBhcnNlZFRvdGFsQW1vdW50IDwgMCkge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiVGlja2V0c19WYWxpZGF0aW9uX1RvdGFsQW1vdW50UmVxdWlyZWRcIiwgXCJUb3RhbCBhbW91bnQgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gMC5cIik7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwYXJzZWRBbW91bnRNU1QgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdEFtb3VudE1TVCk7XHJcbiAgICAgIGNvbnN0IHBhcnNlZEV4Y2hhbmdlUmF0ZSA9IHBhcnNlRGVjaW1hbElucHV0KGRyYWZ0RXhjaGFuZ2VSYXRlKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZExvY2FsQ3VycmVuY3kgPSBzYWZlVGV4dChsb2NhbEN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKTtcclxuICAgICAgY29uc3QgcmVxdWlyZXNGb3JlaWduQ3VycmVuY3lTZXR0bGVtZW50ID0gaXNFeHBlbnNlTGluZUZvcmVpZ25DdXJyZW5jeShub3JtYWxpemVkQ3VycmVuY3ksIG5vcm1hbGl6ZWRMb2NhbEN1cnJlbmN5KTtcclxuICAgICAgY29uc3QgaGFzRm9yZWlnbkN1cnJlbmN5U2V0dGxlbWVudCA9XHJcbiAgICAgICAgIXJlcXVpcmVzRm9yZWlnbkN1cnJlbmN5U2V0dGxlbWVudCB8fFxyXG4gICAgICAgIChwYXJzZWRFeGNoYW5nZVJhdGUgIT0gbnVsbCAmJiBwYXJzZWRFeGNoYW5nZVJhdGUgPiAwKSB8fFxyXG4gICAgICAgIChwYXJzZWRBbW91bnRNU1QgIT0gbnVsbCAmJiBwYXJzZWRBbW91bnRNU1QgPiAwKTtcclxuICAgICAgaWYgKCFoYXNGb3JlaWduQ3VycmVuY3lTZXR0bGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXHJcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTGluZV9WYWxpZGF0aW9uX0ZvcmVpZ25DdXJyZW5jeVNldHRsZW1lbnRcIixcclxuICAgICAgICAgIFwiRm9yZWlnbiBjdXJyZW5jeSBsaW5lcyByZXF1aXJlIGFuIGV4Y2hhbmdlIHJhdGUgZ3JlYXRlciB0aGFuIDAgb3IgYSByZWltYnVyc2VtZW50IGFtb3VudC5cIlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwYXJzZWRHYXN0b1R5cGUgPSB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlKGRyYWZ0R2FzdG9UeXBlLCB7IGFsbG93Tm9uZTogZmFsc2UgfSk7XHJcbiAgICAgIGlmIChwYXJzZWRHYXN0b1R5cGUgPT09IG51bGwpIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIlRpY2tldHNfVmFsaWRhdGlvbl9DYXRlZ29yeVJlcXVpcmVkXCIsIFwiQ2F0ZWdvcnkgaXMgcmVxdWlyZWQuXCIpO1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmF3VHJhbnNEYXRlID0gU3RyaW5nKGRyYWZ0VHJhbnNEYXRlIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IHJhd1RyYW5zRGF0ZSA/IHRvRXhwZW5zZUFwaURkTW1ZeXl5KHJhd1RyYW5zRGF0ZSkgOiBcIlwiO1xyXG4gICAgICBpZiAocmF3VHJhbnNEYXRlICYmICFub3JtYWxpemVkVHJhbnNEYXRlKSB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICAgICAgICBzZXRTdGF0dXMoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB2YWxpZGF0ZWRTaGVldElkID0gYXdhaXQgdmFsaWRhdGVMaW5rZWRTaGVldEJlZm9yZU11dGF0aW9uKCk7XHJcbiAgICAgIGlmICh2YWxpZGF0ZWRTaGVldElkID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwYXlsb2FkQW1vdW50TVNUID0gcmVzb2x2ZUV4cGVuc2VMaW5lQW1vdW50TVNURm9yQ3VycmVuY3lQYXlsb2FkKFxyXG4gICAgICAgIHBhcnNlZFRvdGFsQW1vdW50LFxyXG4gICAgICAgIHBhcnNlZEFtb3VudE1TVCxcclxuICAgICAgICBub3JtYWxpemVkQ3VycmVuY3ksXHJcbiAgICAgICAgbm9ybWFsaXplZExvY2FsQ3VycmVuY3lcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgcGF5bG9hZEV4Y2hhbmdlUmF0ZSA9IHJlc29sdmVFeHBlbnNlTGluZUV4Y2hhbmdlUmF0ZUZvckN1cnJlbmN5KFxyXG4gICAgICAgIG5vcm1hbGl6ZWRDdXJyZW5jeSxcclxuICAgICAgICBub3JtYWxpemVkTG9jYWxDdXJyZW5jeSxcclxuICAgICAgICBwYXJzZWRFeGNoYW5nZVJhdGVcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCA9IHtcclxuICAgICAgICBkZXNjcmlwdGlvbjogbm9ybWFsaXplZERlc2NyaXB0aW9uLFxyXG4gICAgICAgIGN1cnJlbmN5Q29kZTogbm9ybWFsaXplZEN1cnJlbmN5LFxyXG4gICAgICAgIHRvdGFsQW1vdW50OiBOdW1iZXIocGFyc2VkVG90YWxBbW91bnQpLFxyXG4gICAgICAgIGFtb3VudE1TVDogcGF5bG9hZEFtb3VudE1TVCA/PyB1bmRlZmluZWQsXHJcbiAgICAgICAgZXhjaFJhdGU6IHBheWxvYWRFeGNoYW5nZVJhdGUgPz8gdW5kZWZpbmVkLFxyXG4gICAgICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplZFRyYW5zRGF0ZSB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgdGlja2V0RGF0ZTogbm9ybWFsaXplZFRyYW5zRGF0ZSB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgdGlja2V0VGltZTogc2FmZVRleHQoZHJhZnRUaWNrZXRUaW1lKSB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgY29tZW50YXJpbzogU3RyaW5nKGRyYWZ0Q29tZW50YXJpbyB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIHVybEZpbGU6IFN0cmluZyhkcmFmdFVybEZpbGUgfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICBmaWxlTmFtZTogU3RyaW5nKGRyYWZ0RmlsZU5hbWUgfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICBmaWxlRXh0ZW5zaW9uOiByZXNvbHZlVGlja2V0RmlsZUV4dGVuc2lvbihkcmFmdEZpbGVOYW1lLCBkcmFmdFVybEZpbGUpLFxyXG4gICAgICAgIGdhc3RvVHlwZTogcGFyc2VkR2FzdG9UeXBlLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgICAgc3RhcnRTdGF0dXM6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGluZ1wiLCBcIlVwZGF0aW5nIGV4cGVuc2Ugc2hlZXQuLi5cIiksXHJcbiAgICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgICBzZXRCdXN5LFxyXG4gICAgICAgIHNldFN0YXR1cyxcclxuICAgICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdXBkYXRlRXhwZW5zZVNoZWV0VGlja2V0KGZpbGVJZCwgcGF5bG9hZCk7XHJcbiAgICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChzeW5jU2hlZXRMaW5lICYmIHZhbGlkYXRlZFNoZWV0SWQpIHtcbiAgICAgICAgICAgIGxldCBzaGVldFN5bmNGYWlsdXJlTWVzc2FnZSA9IFwiXCI7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCBzeW5jUGF5bG9hZCA9IHtcbiAgICAgICAgICAgICAgICBmaWxlSWQsXG4gICAgICAgICAgICAgICAgc2hlZXRJZDogdmFsaWRhdGVkU2hlZXRJZCxcbiAgICAgICAgICAgICAgICBsaW5lUmVjSWQ6IHNhZmVUZXh0KGxpbmtlZEV4cGVuc2VMaW5lUmVjSWQpIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIGN1cnJlbmN5Q29kZU92ZXJyaWRlOiBub3JtYWxpemVkQ3VycmVuY3ksXHJcbiAgICAgICAgICAgICAgICBhbW91bnRNU1RPdmVycmlkZTogcGF5bG9hZEFtb3VudE1TVCxcclxuICAgICAgICAgICAgICAgIGV4Y2hhbmdlUmF0ZU92ZXJyaWRlOiBwYXlsb2FkRXhjaGFuZ2VSYXRlID8/IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIC4uLihsaW5rZWRFeHBlbnNlTGluZVByb2plY3RJZENoYW5nZWRcclxuICAgICAgICAgICAgICAgICAgPyB7IHByb2plY3RJZE92ZXJyaWRlOiBzYWZlVGV4dChsaW5rZWRFeHBlbnNlTGluZVByb2plY3RJZCkgfVxyXG4gICAgICAgICAgICAgICAgICA6IHt9KSxcclxuICAgICAgICAgICAgICAgIC4uLihsaW5rZWRFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2VkXHJcbiAgICAgICAgICAgICAgICAgID8geyByZWltYnVyc2FibGVFeHBlbnNlT3ZlcnJpZGU6IGxpbmtlZEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZSB9XHJcbiAgICAgICAgICAgICAgICAgIDoge30pLFxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgYXdhaXQgc3luY0V4cGVuc2VMaW5rZWRUaWNrZXRTaGVldExpbmUoc3luY1BheWxvYWQpO1xyXG4gICAgICAgICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKCk7XHJcbiAgICAgICAgICAgICAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzPy4oKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID1cclxuICAgICAgICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3JcclxuICAgICAgICAgICAgICAgICAgPyBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgIDogaW5kVChcclxuICAgICAgICAgICAgICAgICAgICAgIFwiRXhwZW5zZVRpY2tldHNfU2hlZXRTeW5jX1JldHJ5UmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgIFwiVGlja2V0IGRhdGEgY2hhbmdlZCwgYnV0IHdlIGNvdWxkIG5vdCBzeW5jIHRoZSBleHBlbnNlIGxpbmUuIFNhdmUgYWdhaW4gYmVmb3JlIGxlYXZpbmcuXCJcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIHNhdmVFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoe1xuICAgICAgICAgICAgICAgIGZpbGVJZCxcbiAgICAgICAgICAgICAgICBzaGVldElkOiB2YWxpZGF0ZWRTaGVldElkLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBvbkxpbmtlZFNoZWV0U3luY0ZhaWx1cmU/LihtZXNzYWdlKTtcbiAgICAgICAgICAgICAgaWYgKCFjb250aW51ZU9uU2hlZXRTeW5jRmFpbHVyZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzaGVldFN5bmNGYWlsdXJlTWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2hlZXRTeW5jRmFpbHVyZU1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgc2V0U3RhdHVzKHNoZWV0U3luY0ZhaWx1cmVNZXNzYWdlKTtcbiAgICAgICAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBzaGVldCB1cGRhdGVkXCIpKTtcbiAgICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gcmVzdWx0Lm9rO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgYnVzeSxcclxuICAgICAgY2FuRWRpdFRpY2tldCxcclxuICAgICAgZHJhZnRDb21lbnRhcmlvLFxyXG4gICAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgICAgZHJhZnRGaWxlTmFtZSxcclxuICAgICAgZHJhZnRHYXN0b1R5cGUsXHJcbiAgICAgIGRyYWZ0QW1vdW50TVNULFxyXG4gICAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgICAgZHJhZnRUb3RhbEFtb3VudCxcclxuICAgICAgZHJhZnRUaWNrZXRUaW1lLFxyXG4gICAgICBkcmFmdFRyYW5zRGF0ZSxcclxuICAgICAgZHJhZnRVcmxGaWxlLFxyXG4gICAgICBmaWxlSWQsXHJcbiAgICAgIGlzRWRpdGluZyxcclxuICAgICAgbG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICAgIGxpbmtlZEV4cGVuc2VMaW5lUHJvamVjdElkLFxyXG4gICAgICBsaW5rZWRFeHBlbnNlTGluZVByb2plY3RJZENoYW5nZWQsXHJcbiAgICAgIGxpbmtlZEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgICAgbGlua2VkRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlZCxcclxuICAgICAgbGlua2VkRXhwZW5zZUxpbmVSZWNJZCxcbiAgICAgIG9uTGlua2VkU2hlZXRTeW5jRmFpbHVyZSxcbiAgICAgIG9uTGlua2VkU2hlZXRTeW5jU3VjY2VzcyxcbiAgICAgIHNldEJ1c3ksXG4gICAgICBzZXRJc0VkaXRpbmcsXG4gICAgICBzZXRNb2RhbEVycm9yLFxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICB2YWxpZGF0ZUxpbmtlZFNoZWV0QmVmb3JlTXV0YXRpb24sXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVXBkYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgcmV0dXJuIHJ1bkhlYWRlclVwZGF0ZSh7XHJcbiAgICAgIHN5bmNTaGVldExpbmU6IHRydWUsXHJcbiAgICB9KTtcclxuICB9LCBbcnVuSGVhZGVyVXBkYXRlXSk7XG5cbiAgY29uc3QgaGFuZGxlUGVyc2lzdEhlYWRlckRyYWZ0ID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIC8vIE9wZW5pbmcgYSB0aWNrZXQgbGluZSBzaG91bGQgcGVyc2lzdCBhbGwgcG9zc2libGUgbGlua2VkLXNoZWV0IGNoYW5nZXMsIGJ1dFxuICAgIC8vIHNoZWV0IHZhbGlkYXRpb24gZmFpbHVyZXMgbXVzdCBub3QgcHJldmVudCB0aGUgdXNlciBmcm9tIGZpeGluZyB0aGF0IGxpbmUuXG4gICAgcmV0dXJuIHJ1bkhlYWRlclVwZGF0ZSh7XG4gICAgICBzeW5jU2hlZXRMaW5lOlxuICAgICAgICBsaW5rZWRFeHBlbnNlTGluZVByb2plY3RJZENoYW5nZWQgfHxcbiAgICAgICAgbGlua2VkRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlZCB8fFxuICAgICAgICAhIXNhZmVUZXh0KGxpbmtlZEV4cGVuc2VTaGVldElkKSxcbiAgICAgIGNvbnRpbnVlT25TaGVldFN5bmNGYWlsdXJlOiB0cnVlLFxuICAgIH0pO1xuICB9LCBbXG4gICAgbGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWRDaGFuZ2VkLFxuICAgIGxpbmtlZEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZWQsXG4gICAgbGlua2VkRXhwZW5zZVNoZWV0SWQsXG4gICAgcnVuSGVhZGVyVXBkYXRlLFxuICBdKTtcblxyXG4gIGNvbnN0IHJlc29sdmVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQgPSB1c2VDYWxsYmFjayhhc3luYyAoKTogUHJvbWlzZTxEZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQgfCBudWxsPiA9PiB7XHJcbiAgICBpZiAoZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0KSB7XHJcbiAgICAgIHJldHVybiBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChsaW5rZWRFeHBlbnNlU2hlZXRJZCk7XHJcbiAgICBpZiAoIXNhZmVTaGVldElkKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwoc2FmZVNoZWV0SWQsIHtcclxuICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZS5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xyXG4gICAgY29uc3QgZGV0YWlsID0gaXRlbXMuZmluZCgoZW50cnkpID0+IGVudHJ5ICYmIHR5cGVvZiBlbnRyeSA9PT0gXCJvYmplY3RcIikgfHwgbnVsbDtcclxuICAgIGNvbnN0IGxpbmVzID0gQXJyYXkuaXNBcnJheShkZXRhaWw/LkxpbmVzKSA/IGRldGFpbC5MaW5lcyA6IFtdO1xyXG4gICAgY29uc3QgbWF0Y2hpbmdMaW5lID0gbGluZXMuZmluZCgobGluZSkgPT4gc2FmZVRleHQobGluZT8uRmlsZUlkKSA9PT0gZmlsZUlkKTtcclxuICAgIGNvbnN0IGxpbmVSZWNJZCA9IHNhZmVUZXh0KG1hdGNoaW5nTGluZT8uUmVjSWQpO1xyXG5cclxuICAgIGlmICghbGluZVJlY0lkKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNoZWV0SWQ6IHNhZmVTaGVldElkLFxyXG4gICAgICBsaW5lUmVjSWQsXHJcbiAgICB9O1xyXG4gIH0sIFtkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQsIGZpbGVJZCwgbGlua2VkRXhwZW5zZVNoZWV0SWRdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICghY2FuRGVsZXRlVGlja2V0KSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZhbGlkYXRlZFNoZWV0SWQgPSBhd2FpdCB2YWxpZGF0ZUxpbmtlZFNoZWV0QmVmb3JlTXV0YXRpb24oKTtcclxuICAgIGlmICh2YWxpZGF0ZWRTaGVldElkID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcclxuICAgICAgc3RhcnRTdGF0dXM6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGV4cGVuc2Ugc2hlZXQuLi5cIiksXHJcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRXJyb3JcIiwgXCJEZWxldGUgZXJyb3IuXCIpLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRCdXN5LFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpbmtlZExpbmVDb250ZXh0ID0gYXdhaXQgcmVzb2x2ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCgpO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgZGVsZXRlRmlsZVJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0RmlsZShmaWxlSWQsIHtcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmICghZGVsZXRlRmlsZVJlc3BvbnNlLlN1Y2Nlc3MgJiYgIWlzTWlzc2luZ1RpY2tldEZpbGVNZXNzYWdlKGRlbGV0ZUZpbGVSZXNwb25zZS5NZXNzYWdlKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGVsZXRlRmlsZVJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgaWYgKCFpc05vdEZvdW5kRXJyb3IoZXJyb3IpKSB7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXQoZmlsZUlkKTtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGlua2VkTGluZUNvbnRleHQpIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmVEZWxldGVSZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldExpbmUoXHJcbiAgICAgICAgICAgICAgbGlua2VkTGluZUNvbnRleHQuc2hlZXRJZCxcclxuICAgICAgICAgICAgICBsaW5rZWRMaW5lQ29udGV4dC5saW5lUmVjSWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsaW5lRGVsZXRlUmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihsaW5lRGVsZXRlUmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAvLyBUaGUgbGlua2VkIGxpbmUgY2FuIGJlIGF1dG8tcmVtb3ZlZCBieSBiYWNrZW5kIGNhc2NhZGU7IGtlZXAgZmxvdyBzdWNjZXNzZnVsIGluIHRoYXQgY2FzZS5cclxuICAgICAgICAgICAgaWYgKCFpc05vdEZvdW5kRXJyb3IoZXJyb3IpKSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgZGVsZXRlZFwiKSk7XHJcbiAgICAgICAgaWYgKHZhbGlkYXRlZFNoZWV0SWQpIHtcclxuICAgICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKCk7XHJcbiAgICAgICAgICBvbkxpbmtlZFNoZWV0U3luY1N1Y2Nlc3M/LigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQub2s7XHJcbiAgfSwgW1xyXG4gICAgYnVzeSxcclxuICAgIGNhbkRlbGV0ZVRpY2tldCxcclxuICAgIGZpbGVJZCxcclxuICAgIG9uTGlua2VkU2hlZXRTeW5jU3VjY2VzcyxcclxuICAgIHJlc29sdmVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHZhbGlkYXRlTGlua2VkU2hlZXRCZWZvcmVNdXRhdGlvbixcclxuICBdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZVBlcnNpc3RIZWFkZXJEcmFmdCxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnNBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBpc0xvY2tlZDogYm9vbGVhbjtcclxuICBpc0RlbGV0ZUxvY2tlZD86IGJvb2xlYW47XHJcbiAgYWN0aW9uTW9kZT86IFwiZGVmYXVsdFwiIHwgXCJkZWxldGVfb25seVwiIHwgXCJzYXZlX29ubHlcIiB8IFwic2F2ZV9kZWxldGVcIiB8IFwidmlld19vbmx5XCI7XHJcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XHJcbiAgY2FuRWRpdFRpY2tldDogYm9vbGVhbjtcclxuICBjYW5EZWxldGVUaWNrZXQ6IGJvb2xlYW47XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGNhbk9wZW5TYXZlQ29uZmlybT86ICgpID0+IGJvb2xlYW47XHJcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBvblNhdmVTdWNjZXNzOiAoKSA9PiB2b2lkO1xyXG4gIG9uRGVsZXRlU3VjY2Vzcz86ICgpID0+IHZvaWQ7XHJcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xyXG4gICAgb25DYW5jZWw/OiAoKSA9PiB2b2lkO1xyXG4gIH0pID0+IHZvaWQ7XHJcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gc3RhdGUgYW5kIGRpc3BhdGNoIGFjdGlvbnMgZm9yIHRpY2tldCBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbE9wZW4sXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzTG9ja2VkLFxyXG4gIGlzRGVsZXRlTG9ja2VkLFxyXG4gIGFjdGlvbk1vZGUgPSBcImRlZmF1bHRcIixcclxuICBwZXJtaXNzaW9uc1JlYWR5ID0gdHJ1ZSxcclxuICBjYW5FZGl0VGlja2V0LFxyXG4gIGNhbkRlbGV0ZVRpY2tldCxcclxuICBmaWxlSWQsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gIGhhbmRsZVVwZGF0ZSxcclxuICBoYW5kbGVEZWxldGUsXHJcbiAgb25TYXZlU3VjY2VzcyxcclxuICBvbkRlbGV0ZVN1Y2Nlc3MsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcclxuICB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMoe1xyXG4gICAgYWN0aW9uR3JvdXBJZDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtYWN0aW9uc1wiLFxyXG4gICAgaWRzOiB7XHJcbiAgICAgIGVkaXRJY29uSWQ6IFwiZXhwZW5zZVRpY2tldEVkaXRJY29uXCIsXHJcbiAgICAgIHNhdmVJY29uSWQ6IFwiZXhwZW5zZVRpY2tldFNhdmVJY29uXCIsXHJcbiAgICAgIGRlbGV0ZUJ0bklkOiBcImV4cGVuc2VUaWNrZXREZWxldGVCdG5cIixcclxuICAgICAgY2FuY2VsQnRuSWQ6IFwiZXhwZW5zZVRpY2tldENhbmNlbEJ0blwiLFxyXG4gICAgfSxcclxuICAgIGV2ZW50czoge1xyXG4gICAgICBlZGl0RXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWVkaXRcIixcclxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWRlbGV0ZVwiLFxyXG4gICAgICBjYW5jZWxFdmVudDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtY2FuY2VsLWVkaXRcIixcclxuICAgIH0sXHJcbiAgICBidXN5LFxyXG4gICAgbW9kYWxPcGVuLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlOiBmYWxzZSxcclxuICAgIGlzTG9ja2VkLFxyXG4gICAgaXNEZWxldGVMb2NrZWQsXHJcbiAgICBhY3Rpb25Nb2RlLFxyXG4gICAgcGVybWlzc2lvbnNSZWFkeSxcclxuICAgIGNhbkNyZWF0ZTogZmFsc2UsXHJcbiAgICBjYW5FZGl0OiBjYW5FZGl0VGlja2V0LFxyXG4gICAgY2FuRGVsZXRlOiBjYW5EZWxldGVUaWNrZXQsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgICBoYW5kbGVTYXZlOiBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBzYXZlQ29uZmlybVRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJTYXZlIGNoYW5nZXNcIiksXHJcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gc2F2ZSBjaGFuZ2VzP1wiKSxcclxuICAgIHNhdmVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1UaXRsZTogaW5kVChcIkNvbmZpcm1fRGVsZXRlX1RpdGxlXCIsIFwiRGVsZXRlXCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgaXRlbT9cIiksXHJcbiAgICBkZWxldGVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIiksXHJcbiAgICBvblNhdmVTdWNjZXNzLFxyXG4gICAgb25EZWxldGVTdWNjZXNzOiBvbkRlbGV0ZVN1Y2Nlc3MgfHwgKCgpID0+IG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9UaWNrZXRzXCIpKSxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gIH0pO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVkdWNlciwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IERpc3BhdGNoLCBTZXRTdGF0ZUFjdGlvbiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uLy4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGNhbGN1bGF0ZUV4cGVuc2VMaW5lQW1vdW50TVNURm9yQ3VycmVuY3ksXHJcbiAgY2FsY3VsYXRlRXhwZW5zZUxpbmVFeGNoYW5nZVJhdGVGb3JDdXJyZW5jeSxcclxuICBpc0V4cGVuc2VMaW5lRm9yZWlnbkN1cnJlbmN5LFxyXG4gIGlzRXhwZW5zZUxpbmVTYW1lUmVpbWJ1cnNlbWVudEN1cnJlbmN5LFxyXG4gIHJlc29sdmVFeHBlbnNlTGluZUV4Y2hhbmdlUmF0ZUZvckN1cnJlbmN5LFxyXG59IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTGluZUN1cnJlbmN5LnRzXCI7XHJcbmltcG9ydCB7IHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzL2V4cGVuc2VHYXN0b1R5cGVDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IHBhcnNlRXhwZW5zZURhdGUsIHNhZmVUZXh0LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHtcclxuICBhcmVFeHBlbnNlTnVtZXJpY0lucHV0c0VxdWl2YWxlbnQsXHJcbiAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyLFxyXG4gIHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuXHJcbnR5cGUgRHJhZnRTdGF0ZSA9IHtcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGdhc3RvVHlwZTogc3RyaW5nO1xyXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIHRvdGFsQW1vdW50OiBzdHJpbmc7XHJcbiAgYW1vdW50TVNUOiBzdHJpbmc7XHJcbiAgZXhjaGFuZ2VSYXRlOiBzdHJpbmc7XHJcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgdGlja2V0VGltZTogc3RyaW5nO1xyXG4gIGNvbWVudGFyaW86IHN0cmluZztcclxuICB1cmxGaWxlOiBzdHJpbmc7XHJcbiAgZmlsZU5hbWU6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgRWRpdG9yU3RhdGUgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBzdGF0dXM6IHN0cmluZztcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgbW9kYWxFcnJvcjogc3RyaW5nO1xyXG4gIGxpbmVQYWdlOiBudW1iZXI7XHJcbiAgYW1vdW50TVNUTWFudWFsbHlFZGl0ZWQ6IGJvb2xlYW47XHJcbiAgZHJhZnQ6IERyYWZ0U3RhdGU7XHJcbn07XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3JBcmdzID0ge1xyXG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw7XHJcbiAgbGlua2VkRXhwZW5zZUxpbmU/OiBFeHBlbnNlU2hlZXRMaW5lIHwgbnVsbDtcclxuICBsb2NhbEN1cnJlbmN5Q29kZT86IHN0cmluZztcclxuICBsaW5lQ291bnQ6IG51bWJlcjtcclxuICBwYWdlU2l6ZTogbnVtYmVyO1xyXG4gIGNhbkVkaXRUaWNrZXQ6IGJvb2xlYW47XHJcbiAgaXNMb2FkaW5nOiBib29sZWFuO1xyXG4gIGFsbG93QXNzaWduZWREcmFmdEVkaXQ6IGJvb2xlYW47XHJcbiAgaXNGcm9tU2hlZXRMaW5rOiBib29sZWFuO1xyXG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxudHlwZSBFZGl0b3JBY3Rpb24gPVxyXG4gIHwge1xyXG4gICAgICB0eXBlOiBcImh5ZHJhdGVfZnJvbV9oZWFkZXJcIjtcclxuICAgICAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbDtcclxuICAgICAgbGlua2VkRXhwZW5zZUxpbmU/OiBFeHBlbnNlU2hlZXRMaW5lIHwgbnVsbDtcclxuICAgICAgbG9jYWxDdXJyZW5jeUNvZGU/OiBzdHJpbmc7XHJcbiAgICB9XHJcbiAgfCB7XHJcbiAgICAgIHR5cGU6IFwicGF0Y2hfc3RhdGVcIjtcclxuICAgICAgcGF0Y2g6IFBhcnRpYWw8UGljazxFZGl0b3JTdGF0ZSwgXCJidXN5XCIgfCBcInN0YXR1c1wiIHwgXCJpc0VkaXRpbmdcIiB8IFwibW9kYWxFcnJvclwiIHwgXCJsaW5lUGFnZVwiIHwgXCJhbW91bnRNU1RNYW51YWxseUVkaXRlZFwiPj47XHJcbiAgICB9XHJcbiAgfCB7IHR5cGU6IFwicGF0Y2hfZHJhZnRcIjsgcGF0Y2g6IFBhcnRpYWw8RHJhZnRTdGF0ZT47IGFtb3VudE1TVE1hbnVhbGx5RWRpdGVkPzogYm9vbGVhbiB9XHJcbiAgfCB7IHR5cGU6IFwic2V0X2RyYWZ0X2ZpZWxkXCI7IGZpZWxkOiBrZXlvZiBEcmFmdFN0YXRlOyB2YWx1ZTogc3RyaW5nIH07XHJcblxyXG5jb25zdCBjcmVhdGVFbXB0eURyYWZ0ID0gKCk6IERyYWZ0U3RhdGUgPT4gKHtcclxuICBkZXNjcmlwdGlvbjogXCJcIixcclxuICBnYXN0b1R5cGU6IFwiXCIsXHJcbiAgY3VycmVuY3lDb2RlOiBcIlwiLFxyXG4gIHRvdGFsQW1vdW50OiBcIlwiLFxyXG4gIGFtb3VudE1TVDogXCJcIixcclxuICBleGNoYW5nZVJhdGU6IFwiXCIsXHJcbiAgdHJhbnNEYXRlOiBcIlwiLFxyXG4gIHRpY2tldFRpbWU6IFwiXCIsXHJcbiAgY29tZW50YXJpbzogXCJcIixcclxuICB1cmxGaWxlOiBcIlwiLFxyXG4gIGZpbGVOYW1lOiBcIlwiLFxyXG59KTtcclxuXHJcbmNvbnN0IHRvSW5wdXREYXRlID0gKHJhdz86IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlRGF0ZShyYXcpO1xyXG4gIHJldHVybiBwYXJzZWQgPyB0b0lzb0RhdGUocGFyc2VkKSA6IFwiXCI7XHJcbn07XHJcblxyXG5jb25zdCB0b0lucHV0VGltZSA9IChyYXc/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gc2FmZVRleHQocmF3KTtcclxuICBpZiAoIXZhbHVlIHx8IHZhbHVlID09PSBcIjBcIikgcmV0dXJuIFwiXCI7XHJcblxyXG4gIGNvbnN0IHNlY29uZHNWYWx1ZSA9IE51bWJlcih2YWx1ZSk7XHJcbiAgaWYgKE51bWJlci5pc0ludGVnZXIoc2Vjb25kc1ZhbHVlKSAmJiBzZWNvbmRzVmFsdWUgPj0gMCAmJiBzZWNvbmRzVmFsdWUgPD0gODYzOTkpIHtcclxuICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihzZWNvbmRzVmFsdWUgLyAzNjAwKTtcclxuICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNvbmRzVmFsdWUgJSAzNjAwKSAvIDYwKTtcclxuICAgIGNvbnN0IHNlY29uZHMgPSBzZWNvbmRzVmFsdWUgJSA2MDtcclxuICAgIHJldHVybiBbaG91cnMsIG1pbnV0ZXMsIHNlY29uZHNdLm1hcCgoZW50cnkpID0+IFN0cmluZyhlbnRyeSkucGFkU3RhcnQoMiwgXCIwXCIpKS5qb2luKFwiOlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG1hdGNoID0gdmFsdWUubWF0Y2goL14oXFxkezEsMn0pOihbMC01XVxcZCkoPzo6KFswLTVdXFxkKSk/JC8pO1xyXG4gIGlmICghbWF0Y2gpIHJldHVybiBcIlwiO1xyXG5cclxuICBjb25zdCBob3VycyA9IE51bWJlci5wYXJzZUludChtYXRjaFsxXSB8fCBcIlwiLCAxMCk7XHJcbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGhvdXJzKSB8fCBob3VycyA8IDAgfHwgaG91cnMgPiAyMykgcmV0dXJuIFwiXCI7XHJcblxyXG4gIHJldHVybiBgJHtTdHJpbmcoaG91cnMpLnBhZFN0YXJ0KDIsIFwiMFwiKX06JHttYXRjaFsyXX06JHttYXRjaFszXSB8fCBcIjAwXCJ9YDtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBzYWZlVGV4dCh2YWx1ZSkudG9VcHBlckNhc2UoKTtcclxuXHJcbmNvbnN0IHRvRmluaXRlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0RWRpdGFibGVNb25leSA9ICh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcih2YWx1ZSwge1xyXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICBmYWxsYmFjazogXCJcIixcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdEVkaXRhYmxlRXhjaGFuZ2VSYXRlID0gKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKHZhbHVlLCB7XHJcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDcsXHJcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDcsXHJcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRBbW91bnRNU1RQYXRjaEZyb21FeGNoYW5nZVJhdGUgPSAoXHJcbiAgdG90YWxBbW91bnQ6IHN0cmluZyxcclxuICBleGNoYW5nZVJhdGU6IHN0cmluZyxcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZyxcclxuICByZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlOiBzdHJpbmcsXHJcbiAgYW1vdW50TVNUTWFudWFsbHlFZGl0ZWQ6IGJvb2xlYW5cclxuKTogUGFydGlhbDxEcmFmdFN0YXRlPiA9PiB7XHJcbiAgaWYgKGFtb3VudE1TVE1hbnVhbGx5RWRpdGVkICYmIGlzRXhwZW5zZUxpbmVTYW1lUmVpbWJ1cnNlbWVudEN1cnJlbmN5KGN1cnJlbmN5Q29kZSwgcmVpbWJ1cnNlbWVudEN1cnJlbmN5Q29kZSkpIHtcclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZFRvdGFsQW1vdW50ID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHRvdGFsQW1vdW50KTtcclxuICBjb25zdCBwYXJzZWRFeGNoYW5nZVJhdGUgPSByZXNvbHZlRXhwZW5zZUxpbmVFeGNoYW5nZVJhdGVGb3JDdXJyZW5jeShcclxuICAgIGN1cnJlbmN5Q29kZSxcclxuICAgIHJlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGUsXHJcbiAgICBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQoZXhjaGFuZ2VSYXRlKVxyXG4gICk7XHJcbiAgY29uc3QgbmV4dEFtb3VudE1TVCA9XHJcbiAgICBwYXJzZWRUb3RhbEFtb3VudCAhPSBudWxsXHJcbiAgICAgID8gY2FsY3VsYXRlRXhwZW5zZUxpbmVBbW91bnRNU1RGb3JDdXJyZW5jeShcclxuICAgICAgICAgIHBhcnNlZFRvdGFsQW1vdW50LFxyXG4gICAgICAgICAgcGFyc2VkRXhjaGFuZ2VSYXRlLFxyXG4gICAgICAgICAgY3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgcmVpbWJ1cnNlbWVudEN1cnJlbmN5Q29kZVxyXG4gICAgICAgIClcclxuICAgICAgOiBudWxsO1xyXG5cclxuICByZXR1cm4gbmV4dEFtb3VudE1TVCAhPSBudWxsID8geyBhbW91bnRNU1Q6IGZvcm1hdEVkaXRhYmxlTW9uZXkobmV4dEFtb3VudE1TVCkgfSA6IHt9O1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRFeGNoYW5nZVJhdGVQYXRjaEZyb21BbW91bnRNU1QgPSAoXHJcbiAgdG90YWxBbW91bnQ6IHN0cmluZyxcclxuICBhbW91bnRNU1Q6IHN0cmluZyxcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZyxcclxuICByZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlOiBzdHJpbmcsXHJcbiAgY3VycmVudEV4Y2hhbmdlUmF0ZTogc3RyaW5nXHJcbik6IFBhcnRpYWw8RHJhZnRTdGF0ZT4gPT4ge1xyXG4gIGNvbnN0IHBhcnNlZFRvdGFsQW1vdW50ID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHRvdGFsQW1vdW50KTtcclxuICBjb25zdCBwYXJzZWRBbW91bnRNU1QgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQoYW1vdW50TVNUKTtcclxuICBjb25zdCBuZXh0RXhjaGFuZ2VSYXRlID1cclxuICAgIHBhcnNlZFRvdGFsQW1vdW50ICE9IG51bGwgJiYgcGFyc2VkQW1vdW50TVNUICE9IG51bGxcclxuICAgICAgPyBjYWxjdWxhdGVFeHBlbnNlTGluZUV4Y2hhbmdlUmF0ZUZvckN1cnJlbmN5KFxyXG4gICAgICAgICAgcGFyc2VkVG90YWxBbW91bnQsXHJcbiAgICAgICAgICBwYXJzZWRBbW91bnRNU1QsXHJcbiAgICAgICAgICBjdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICByZWltYnVyc2VtZW50Q3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgY3VycmVudEV4Y2hhbmdlUmF0ZVxyXG4gICAgICAgIClcclxuICAgICAgOiBpc0V4cGVuc2VMaW5lU2FtZVJlaW1idXJzZW1lbnRDdXJyZW5jeShjdXJyZW5jeUNvZGUsIHJlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGUpXHJcbiAgICAgICAgPyByZXNvbHZlRXhwZW5zZUxpbmVFeGNoYW5nZVJhdGVGb3JDdXJyZW5jeShjdXJyZW5jeUNvZGUsIHJlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGUsIGN1cnJlbnRFeGNoYW5nZVJhdGUpXHJcbiAgICAgIDogbnVsbDtcclxuXHJcbiAgcmV0dXJuIG5leHRFeGNoYW5nZVJhdGUgIT0gbnVsbCA/IHsgZXhjaGFuZ2VSYXRlOiBmb3JtYXRFZGl0YWJsZUV4Y2hhbmdlUmF0ZShuZXh0RXhjaGFuZ2VSYXRlKSB9IDoge307XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlRXhjaGFuZ2VSYXRlRm9yU2V0dGxlbWVudCA9IChcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZyxcclxuICBsb2NhbEN1cnJlbmN5Q29kZTogc3RyaW5nLFxyXG4gIGV4Y2hhbmdlUmF0ZTogc3RyaW5nXHJcbik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKCFpc0V4cGVuc2VMaW5lRm9yZWlnbkN1cnJlbmN5KGN1cnJlbmN5Q29kZSwgbG9jYWxDdXJyZW5jeUNvZGUpKSB7XHJcbiAgICByZXR1cm4gZm9ybWF0RWRpdGFibGVFeGNoYW5nZVJhdGUoMTAwKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZEV4Y2hhbmdlUmF0ZSA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChleGNoYW5nZVJhdGUpO1xyXG4gIGlmIChwYXJzZWRFeGNoYW5nZVJhdGUgIT0gbnVsbCAmJiBwYXJzZWRFeGNoYW5nZVJhdGUgPiAwKSB7XHJcbiAgICByZXR1cm4gZXhjaGFuZ2VSYXRlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGV4Y2hhbmdlUmF0ZTtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkTG9jYWxDdXJyZW5jeVNldHRsZW1lbnRQYXRjaCA9IChcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZyxcclxuICBsb2NhbEN1cnJlbmN5Q29kZTogc3RyaW5nLFxyXG4gIHRvdGFsQW1vdW50OiBzdHJpbmcsXHJcbiAgZXhjaGFuZ2VSYXRlOiBzdHJpbmcsXHJcbiAgYW1vdW50TVNUTWFudWFsbHlFZGl0ZWQ6IGJvb2xlYW5cclxuKTogUGFydGlhbDxEcmFmdFN0YXRlPiA9PiB7XHJcbiAgaWYgKGlzRXhwZW5zZUxpbmVGb3JlaWduQ3VycmVuY3koY3VycmVuY3lDb2RlLCBsb2NhbEN1cnJlbmN5Q29kZSkpIHtcclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZFRvdGFsQW1vdW50ID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHRvdGFsQW1vdW50KTtcclxuICByZXR1cm4ge1xyXG4gICAgZXhjaGFuZ2VSYXRlOiBmb3JtYXRFZGl0YWJsZUV4Y2hhbmdlUmF0ZShcclxuICAgICAgcmVzb2x2ZUV4cGVuc2VMaW5lRXhjaGFuZ2VSYXRlRm9yQ3VycmVuY3koY3VycmVuY3lDb2RlLCBsb2NhbEN1cnJlbmN5Q29kZSwgZXhjaGFuZ2VSYXRlKVxyXG4gICAgKSxcclxuICAgIC4uLighYW1vdW50TVNUTWFudWFsbHlFZGl0ZWQgJiYgcGFyc2VkVG90YWxBbW91bnQgIT0gbnVsbCA/IHsgYW1vdW50TVNUOiBmb3JtYXRFZGl0YWJsZU1vbmV5KHBhcnNlZFRvdGFsQW1vdW50KSB9IDoge30pLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVEcmFmdEZyb21IZWFkZXIgPSAoXHJcbiAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbCxcclxuICBsaW5rZWRFeHBlbnNlTGluZTogRXhwZW5zZVNoZWV0TGluZSB8IG51bGwgfCB1bmRlZmluZWQsXHJcbiAgbG9jYWxDdXJyZW5jeUNvZGU6IHN0cmluZyB8IHVuZGVmaW5lZFxyXG4pOiBEcmFmdFN0YXRlID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkTG9jYWxDdXJyZW5jeUNvZGUgPVxyXG4gICAgbm9ybWFsaXplQ3VycmVuY3lDb2RlKGxvY2FsQ3VycmVuY3lDb2RlKSB8fCBub3JtYWxpemVDdXJyZW5jeUNvZGUobGlua2VkRXhwZW5zZUxpbmU/LmN1cnJlbmN5Q29kZSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbmN5Q29kZSA9XHJcbiAgICBub3JtYWxpemVDdXJyZW5jeUNvZGUoaGVhZGVyPy5jdXJyZW5jeUNvZGUpIHx8IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShsaW5rZWRFeHBlbnNlTGluZT8uY3VycmVuY3lDb2RlKSB8fCBub3JtYWxpemVkTG9jYWxDdXJyZW5jeUNvZGU7XHJcbiAgY29uc3QgdG90YWxBbW91bnQgPVxuICAgIHRvRmluaXRlTnVtYmVyKGhlYWRlcj8udG90YWxBbW91bnRDdXJyZW5jeSA/PyBoZWFkZXI/LnRvdGFsQW1vdW50KSA/P1xuICAgIHRvRmluaXRlTnVtYmVyKGxpbmtlZEV4cGVuc2VMaW5lPy5hbW91bnQpID8/XG4gICAgdG9GaW5pdGVOdW1iZXIobGlua2VkRXhwZW5zZUxpbmU/LnByaWNlKTtcbiAgY29uc3QgdGlja2V0RXhjaGFuZ2VSYXRlID0gdG9GaW5pdGVOdW1iZXIoaGVhZGVyPy5leGNoUmF0ZSA/PyBsaW5rZWRFeHBlbnNlTGluZT8uZXhjaFJhdGUpO1xuICBjb25zdCB0aWNrZXRBbW91bnRNU1QgPSB0b0Zpbml0ZU51bWJlcihoZWFkZXI/LnZpc2libGVSZWltYnVyc2FibGVUb3RhbCA/PyBoZWFkZXI/LmFtb3VudE1TVCA/PyBsaW5rZWRFeHBlbnNlTGluZT8uYW1vdW50TVNUKTtcbiAgY29uc3Qgc2FtZUN1cnJlbmN5ID0gaXNFeHBlbnNlTGluZVNhbWVSZWltYnVyc2VtZW50Q3VycmVuY3kobm9ybWFsaXplZEN1cnJlbmN5Q29kZSwgbm9ybWFsaXplZExvY2FsQ3VycmVuY3lDb2RlKTtcclxuICBjb25zdCBleGNoYW5nZVJhdGUgPSBzYW1lQ3VycmVuY3lcclxuICAgID8gMTAwXHJcbiAgICA6IHRpY2tldEV4Y2hhbmdlUmF0ZSAhPSBudWxsICYmIHRpY2tldEV4Y2hhbmdlUmF0ZSA+IDBcclxuICAgICAgPyB0aWNrZXRFeGNoYW5nZVJhdGVcclxuICAgICAgOiBudWxsO1xyXG4gIGNvbnN0IGNhbGN1bGF0ZWRBbW91bnRNU1QgPVxyXG4gICAgdG90YWxBbW91bnQgIT0gbnVsbFxyXG4gICAgICA/IGNhbGN1bGF0ZUV4cGVuc2VMaW5lQW1vdW50TVNURm9yQ3VycmVuY3koXHJcbiAgICAgICAgICB0b3RhbEFtb3VudCxcclxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZSxcclxuICAgICAgICAgIG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICBub3JtYWxpemVkTG9jYWxDdXJyZW5jeUNvZGVcclxuICAgICAgICApXHJcbiAgICAgIDogbnVsbDtcclxuICBjb25zdCBhbW91bnRNU1QgPSB0aWNrZXRBbW91bnRNU1QgPz8gY2FsY3VsYXRlZEFtb3VudE1TVCA/PyAoc2FtZUN1cnJlbmN5ID8gdG90YWxBbW91bnQgOiBudWxsKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChoZWFkZXI/LmRlc2NyaXB0aW9uKSxcclxuICAgIGdhc3RvVHlwZTogaGVhZGVyPy5nYXN0b1R5cGUgPT09IG51bGwgfHwgaGVhZGVyPy5nYXN0b1R5cGUgPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBTdHJpbmcoaGVhZGVyLmdhc3RvVHlwZSksXHJcbiAgICBjdXJyZW5jeUNvZGU6IG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUsXHJcbiAgICB0b3RhbEFtb3VudDogZm9ybWF0RWRpdGFibGVNb25leSh0b3RhbEFtb3VudCksXHJcbiAgICBhbW91bnRNU1Q6IGZvcm1hdEVkaXRhYmxlTW9uZXkoYW1vdW50TVNUKSxcclxuICAgIGV4Y2hhbmdlUmF0ZTogZm9ybWF0RWRpdGFibGVFeGNoYW5nZVJhdGUoZXhjaGFuZ2VSYXRlKSxcclxuICAgIHRyYW5zRGF0ZTogdG9JbnB1dERhdGUoaGVhZGVyPy50aWNrZXREYXRlIHx8IGhlYWRlcj8udHJhbnNEYXRlKSxcclxuICAgIHRpY2tldFRpbWU6IHRvSW5wdXRUaW1lKGhlYWRlcj8udGlja2V0VGltZSksXHJcbiAgICBjb21lbnRhcmlvOiBzYWZlVGV4dChoZWFkZXI/LmNvbWVudGFyaW8pLFxyXG4gICAgdXJsRmlsZTogc2FmZVRleHQoaGVhZGVyPy51cmxGaWxlKSxcclxuICAgIGZpbGVOYW1lOiBzYWZlVGV4dChoZWFkZXI/LmZpbGVOYW1lKSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlSW5pdGlhbFN0YXRlID0gKCk6IEVkaXRvclN0YXRlID0+ICh7XHJcbiAgYnVzeTogZmFsc2UsXHJcbiAgc3RhdHVzOiBcIlwiLFxyXG4gIGlzRWRpdGluZzogZmFsc2UsXHJcbiAgbW9kYWxFcnJvcjogXCJcIixcclxuICBsaW5lUGFnZTogMSxcclxuICBhbW91bnRNU1RNYW51YWxseUVkaXRlZDogZmFsc2UsXHJcbiAgZHJhZnQ6IGNyZWF0ZUVtcHR5RHJhZnQoKSxcclxufSk7XHJcblxyXG5jb25zdCBpc1ZhbGlkUmVxdWlyZWRHYXN0b1R5cGUgPSAocmF3VmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gIHJldHVybiB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlKHJhd1ZhbHVlLCB7IGFsbG93Tm9uZTogZmFsc2UgfSkgIT09IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBlZGl0b3JSZWR1Y2VyID0gKHN0YXRlOiBFZGl0b3JTdGF0ZSwgYWN0aW9uOiBFZGl0b3JBY3Rpb24pOiBFZGl0b3JTdGF0ZSA9PiB7XHJcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgY2FzZSBcImh5ZHJhdGVfZnJvbV9oZWFkZXJcIjpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICBhbW91bnRNU1RNYW51YWxseUVkaXRlZDogZmFsc2UsXHJcbiAgICAgICAgZHJhZnQ6IGNyZWF0ZURyYWZ0RnJvbUhlYWRlcihhY3Rpb24uaGVhZGVyLCBhY3Rpb24ubGlua2VkRXhwZW5zZUxpbmUsIGFjdGlvbi5sb2NhbEN1cnJlbmN5Q29kZSksXHJcbiAgICAgIH07XHJcbiAgICBjYXNlIFwicGF0Y2hfc3RhdGVcIjpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAuLi5hY3Rpb24ucGF0Y2gsXHJcbiAgICAgIH07XHJcbiAgICBjYXNlIFwic2V0X2RyYWZ0X2ZpZWxkXCI6XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgZHJhZnQ6IHtcclxuICAgICAgICAgIC4uLnN0YXRlLmRyYWZ0LFxyXG4gICAgICAgICAgW2FjdGlvbi5maWVsZF06IGFjdGlvbi52YWx1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgY2FzZSBcInBhdGNoX2RyYWZ0XCI6XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgYW1vdW50TVNUTWFudWFsbHlFZGl0ZWQ6IGFjdGlvbi5hbW91bnRNU1RNYW51YWxseUVkaXRlZCA/PyBzdGF0ZS5hbW91bnRNU1RNYW51YWxseUVkaXRlZCxcclxuICAgICAgICBkcmFmdDoge1xyXG4gICAgICAgICAgLi4uc3RhdGUuZHJhZnQsXHJcbiAgICAgICAgICAuLi5hY3Rpb24ucGF0Y2gsXHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBzdGF0ZTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlU2V0U3RhdGVWYWx1ZSA9IDxULD4odmFsdWU6IFNldFN0YXRlQWN0aW9uPFQ+LCBjdXJyZW50OiBUKTogVCA9PiB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gKHZhbHVlIGFzIChwcmV2U3RhdGU6IFQpID0+IFQpKGN1cnJlbnQpIDogdmFsdWU7XHJcbn07XHJcblxyXG4vLyBPd25zIHBhZ2UtbG9jYWwgZWRpdCwgZHJhZnQsIGFuZCBsaW5lIHBhZ2luZyBzdGF0ZSBmb3IgdGlja2V0IGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3IgPSAoe1xyXG4gIGhlYWRlcixcclxuICBsaW5rZWRFeHBlbnNlTGluZSxcclxuICBsb2NhbEN1cnJlbmN5Q29kZSxcclxuICBsaW5lQ291bnQsXHJcbiAgcGFnZVNpemUsXHJcbiAgY2FuRWRpdFRpY2tldCxcclxuICBpc0xvYWRpbmcsXHJcbiAgYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCxcclxuICBpc0Zyb21TaGVldExpbmssXHJcbiAgb25Gb3JiaWRkZW4sXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3JBcmdzKSA9PiB7XHJcbiAgY29uc3QgW3N0YXRlLCBkaXNwYXRjaF0gPSB1c2VSZWR1Y2VyKGVkaXRvclJlZHVjZXIsIHVuZGVmaW5lZCwgY3JlYXRlSW5pdGlhbFN0YXRlKTtcclxuICBjb25zdCBbZGVzY3JpcHRpb25JbnZhbGlkLCBzZXREZXNjcmlwdGlvbkludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtnYXN0b1R5cGVJbnZhbGlkLCBzZXRHYXN0b1R5cGVJbnZhbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbY3VycmVuY3lDb2RlSW52YWxpZCwgc2V0Q3VycmVuY3lDb2RlSW52YWxpZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3RvdGFsQW1vdW50SW52YWxpZCwgc2V0VG90YWxBbW91bnRJbnZhbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbYW1vdW50TVNUSW52YWxpZCwgc2V0QW1vdW50TVNUSW52YWxpZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2V4Y2hhbmdlUmF0ZUludmFsaWQsIHNldEV4Y2hhbmdlUmF0ZUludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGdhc3RvVHlwZUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBjdXJyZW5jeUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCB0b3RhbEFtb3VudElucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBhbW91bnRNU1RJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGVmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlID1cclxuICAgIG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShsb2NhbEN1cnJlbmN5Q29kZSkgfHwgbm9ybWFsaXplQ3VycmVuY3lDb2RlKGxpbmtlZEV4cGVuc2VMaW5lPy5jdXJyZW5jeUNvZGUpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHN0YXRlLmlzRWRpdGluZykgcmV0dXJuO1xyXG4gICAgZGlzcGF0Y2goeyB0eXBlOiBcImh5ZHJhdGVfZnJvbV9oZWFkZXJcIiwgaGVhZGVyLCBsaW5rZWRFeHBlbnNlTGluZSwgbG9jYWxDdXJyZW5jeUNvZGU6IGVmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlIH0pO1xyXG4gIH0sIFtlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSwgaGVhZGVyLCBsaW5rZWRFeHBlbnNlTGluZSwgc3RhdGUuaXNFZGl0aW5nXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBtYXhQYWdlID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKGxpbmVDb3VudCAvIHBhZ2VTaXplKSk7XHJcbiAgICBpZiAoc3RhdGUubGluZVBhZ2UgPiBtYXhQYWdlKSB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBsaW5lUGFnZTogbWF4UGFnZSB9IH0pO1xyXG4gICAgfVxyXG4gIH0sIFtsaW5lQ291bnQsIHBhZ2VTaXplLCBzdGF0ZS5saW5lUGFnZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHN0YXRlLmlzRWRpdGluZykgcmV0dXJuO1xyXG4gICAgc2V0RGVzY3JpcHRpb25JbnZhbGlkKGZhbHNlKTtcclxuICAgIHNldEdhc3RvVHlwZUludmFsaWQoZmFsc2UpO1xyXG4gICAgc2V0Q3VycmVuY3lDb2RlSW52YWxpZChmYWxzZSk7XHJcbiAgICBzZXRUb3RhbEFtb3VudEludmFsaWQoZmFsc2UpO1xyXG4gICAgc2V0QW1vdW50TVNUSW52YWxpZChmYWxzZSk7XHJcbiAgICBzZXRFeGNoYW5nZVJhdGVJbnZhbGlkKGZhbHNlKTtcclxuICB9LCBbc3RhdGUuaXNFZGl0aW5nXSk7XHJcblxyXG4gIGNvbnN0IHNldEJ1c3kgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxib29sZWFuPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBidXN5OiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuYnVzeSkgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuYnVzeV1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRTdGF0dXMgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxzdHJpbmc+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IHN0YXR1czogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLnN0YXR1cykgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuc3RhdHVzXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldElzRWRpdGluZyA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPGJvb2xlYW4+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IGlzRWRpdGluZzogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmlzRWRpdGluZykgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuaXNFZGl0aW5nXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldE1vZGFsRXJyb3IgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxzdHJpbmc+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IG1vZGFsRXJyb3I6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5tb2RhbEVycm9yKSB9IH0pO1xyXG4gICAgfSxcclxuICAgIFtzdGF0ZS5tb2RhbEVycm9yXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldExpbmVQYWdlID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248bnVtYmVyPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBsaW5lUGFnZTogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmxpbmVQYWdlKSB9IH0pO1xyXG4gICAgfSxcclxuICAgIFtzdGF0ZS5saW5lUGFnZV1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXREcmFmdERlc2NyaXB0aW9uID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIHNldERlc2NyaXB0aW9uSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcInNldF9kcmFmdF9maWVsZFwiLFxyXG4gICAgICAgIGZpZWxkOiBcImRlc2NyaXB0aW9uXCIsXHJcbiAgICAgICAgdmFsdWU6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5kZXNjcmlwdGlvbiksXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtzdGF0ZS5kcmFmdC5kZXNjcmlwdGlvbl1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXREcmFmdEdhc3RvVHlwZSA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBzZXRHYXN0b1R5cGVJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwic2V0X2RyYWZ0X2ZpZWxkXCIsXHJcbiAgICAgICAgZmllbGQ6IFwiZ2FzdG9UeXBlXCIsXHJcbiAgICAgICAgdmFsdWU6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5nYXN0b1R5cGUpLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuZHJhZnQuZ2FzdG9UeXBlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldERyYWZ0Q3VycmVuY3lDb2RlID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIHNldEN1cnJlbmN5Q29kZUludmFsaWQoZmFsc2UpO1xyXG4gICAgICBzZXRBbW91bnRNU1RJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIGNvbnN0IG5leHRDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUocmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSkpO1xyXG4gICAgICBjb25zdCBuZXh0UGF0Y2g6IFBhcnRpYWw8RHJhZnRTdGF0ZT4gPSB7XHJcbiAgICAgICAgY3VycmVuY3lDb2RlOiBuZXh0Q3VycmVuY3lDb2RlLFxyXG4gICAgICAgIC4uLmJ1aWxkTG9jYWxDdXJyZW5jeVNldHRsZW1lbnRQYXRjaChcclxuICAgICAgICAgIG5leHRDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICBlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgICAgICAgIHN0YXRlLmRyYWZ0LnRvdGFsQW1vdW50LFxyXG4gICAgICAgICAgc3RhdGUuZHJhZnQuZXhjaGFuZ2VSYXRlLFxyXG4gICAgICAgICAgZmFsc2VcclxuICAgICAgICApLFxyXG4gICAgICB9O1xyXG4gICAgICBpZiAoIW5leHRQYXRjaC5hbW91bnRNU1QpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgICAgbmV4dFBhdGNoLFxyXG4gICAgICAgICAgYnVpbGRBbW91bnRNU1RQYXRjaEZyb21FeGNoYW5nZVJhdGUoXHJcbiAgICAgICAgICAgIHN0YXRlLmRyYWZ0LnRvdGFsQW1vdW50LFxyXG4gICAgICAgICAgICBzdGF0ZS5kcmFmdC5leGNoYW5nZVJhdGUsXHJcbiAgICAgICAgICAgIG5leHRDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICAgIGVmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgICBmYWxzZVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwicGF0Y2hfZHJhZnRcIixcclxuICAgICAgICBwYXRjaDogbmV4dFBhdGNoLFxyXG4gICAgICAgIGFtb3VudE1TVE1hbnVhbGx5RWRpdGVkOiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW2VmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlLCBzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUsIHN0YXRlLmRyYWZ0LmV4Y2hhbmdlUmF0ZSwgc3RhdGUuZHJhZnQudG90YWxBbW91bnRdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2V0RHJhZnRUb3RhbEFtb3VudCA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBzZXRUb3RhbEFtb3VudEludmFsaWQoZmFsc2UpO1xyXG4gICAgICBzZXRBbW91bnRNU1RJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIGNvbnN0IG5leHRUb3RhbEFtb3VudCA9IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC50b3RhbEFtb3VudCk7XHJcbiAgICAgIGNvbnN0IGVmZmVjdGl2ZUV4Y2hhbmdlUmF0ZSA9IHJlc29sdmVFeGNoYW5nZVJhdGVGb3JTZXR0bGVtZW50KFxyXG4gICAgICAgIHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSxcclxuICAgICAgICBlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgICAgICBzdGF0ZS5kcmFmdC5leGNoYW5nZVJhdGVcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgbmV4dFBhdGNoOiBQYXJ0aWFsPERyYWZ0U3RhdGU+ID0ge1xyXG4gICAgICAgIHRvdGFsQW1vdW50OiBuZXh0VG90YWxBbW91bnQsXHJcbiAgICAgICAgLi4uYnVpbGRBbW91bnRNU1RQYXRjaEZyb21FeGNoYW5nZVJhdGUoXHJcbiAgICAgICAgICBuZXh0VG90YWxBbW91bnQsXHJcbiAgICAgICAgICBlZmZlY3RpdmVFeGNoYW5nZVJhdGUsXHJcbiAgICAgICAgICBzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICBlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgICAgICAgIHN0YXRlLmFtb3VudE1TVE1hbnVhbGx5RWRpdGVkXHJcbiAgICAgICAgKSxcclxuICAgICAgfTtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwicGF0Y2hfZHJhZnRcIixcclxuICAgICAgICBwYXRjaDogbmV4dFBhdGNoLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGVmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gICAgICBzdGF0ZS5hbW91bnRNU1RNYW51YWxseUVkaXRlZCxcclxuICAgICAgc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlLFxyXG4gICAgICBzdGF0ZS5kcmFmdC5leGNoYW5nZVJhdGUsXHJcbiAgICAgIHN0YXRlLmRyYWZ0LnRvdGFsQW1vdW50LFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldERyYWZ0QW1vdW50TVNUID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIHNldEFtb3VudE1TVEludmFsaWQoZmFsc2UpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgY29uc3QgbmV4dEFtb3VudE1TVCA9IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5hbW91bnRNU1QpO1xyXG4gICAgICBpZiAoYXJlRXhwZW5zZU51bWVyaWNJbnB1dHNFcXVpdmFsZW50KG5leHRBbW91bnRNU1QsIHN0YXRlLmRyYWZ0LmFtb3VudE1TVCkpIHtcclxuICAgICAgICBpZiAobmV4dEFtb3VudE1TVCAhPT0gc3RhdGUuZHJhZnQuYW1vdW50TVNUKSB7XHJcbiAgICAgICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwicGF0Y2hfZHJhZnRcIixcclxuICAgICAgICAgICAgcGF0Y2g6IHtcclxuICAgICAgICAgICAgICBhbW91bnRNU1Q6IG5leHRBbW91bnRNU1QsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJwYXRjaF9kcmFmdFwiLFxyXG4gICAgICAgIHBhdGNoOiB7XHJcbiAgICAgICAgICBhbW91bnRNU1Q6IG5leHRBbW91bnRNU1QsXHJcbiAgICAgICAgICAuLi5idWlsZEV4Y2hhbmdlUmF0ZVBhdGNoRnJvbUFtb3VudE1TVChcclxuICAgICAgICAgICAgc3RhdGUuZHJhZnQudG90YWxBbW91bnQsXHJcbiAgICAgICAgICAgIG5leHRBbW91bnRNU1QsXHJcbiAgICAgICAgICAgIHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSxcclxuICAgICAgICAgICAgZWZmZWN0aXZlTG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICAgIHN0YXRlLmRyYWZ0LmV4Y2hhbmdlUmF0ZVxyXG4gICAgICAgICAgKSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFtb3VudE1TVE1hbnVhbGx5RWRpdGVkOiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbZWZmZWN0aXZlTG9jYWxDdXJyZW5jeUNvZGUsIHN0YXRlLmRyYWZ0LmFtb3VudE1TVCwgc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlLCBzdGF0ZS5kcmFmdC5leGNoYW5nZVJhdGUsIHN0YXRlLmRyYWZ0LnRvdGFsQW1vdW50XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldERyYWZ0RXhjaGFuZ2VSYXRlID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZUludmFsaWQoZmFsc2UpO1xyXG4gICAgICBzZXRBbW91bnRNU1RJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgY29uc3QgbmV4dEV4Y2hhbmdlUmF0ZSA9IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5leGNoYW5nZVJhdGUpO1xyXG4gICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJwYXRjaF9kcmFmdFwiLFxyXG4gICAgICAgIHBhdGNoOiB7XHJcbiAgICAgICAgICBleGNoYW5nZVJhdGU6IG5leHRFeGNoYW5nZVJhdGUsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLmRyYWZ0LmV4Y2hhbmdlUmF0ZV1cclxuICApO1xyXG5cclxuICBjb25zdCBjb21taXREcmFmdEV4Y2hhbmdlUmF0ZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHZhbHVlOiBzdHJpbmcsIGN1cnJlbmN5Q29kZU92ZXJyaWRlPzogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZUludmFsaWQoZmFsc2UpO1xyXG4gICAgICBzZXRBbW91bnRNU1RJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgY29uc3QgZWZmZWN0aXZlQ3VycmVuY3lDb2RlID0gY3VycmVuY3lDb2RlT3ZlcnJpZGVcclxuICAgICAgICA/IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGVPdmVycmlkZSlcclxuICAgICAgICA6IHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZTtcclxuICAgICAgY29uc3QgbmV4dEV4Y2hhbmdlUmF0ZSA9IGZvcm1hdEVkaXRhYmxlRXhjaGFuZ2VSYXRlKFxyXG4gICAgICAgIHJlc29sdmVFeGNoYW5nZVJhdGVGb3JTZXR0bGVtZW50KFxyXG4gICAgICAgICAgZWZmZWN0aXZlQ3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgZWZmZWN0aXZlTG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICB2YWx1ZVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwicGF0Y2hfZHJhZnRcIixcclxuICAgICAgICBwYXRjaDoge1xyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlOiBuZXh0RXhjaGFuZ2VSYXRlLFxyXG4gICAgICAgICAgLi4uYnVpbGRBbW91bnRNU1RQYXRjaEZyb21FeGNoYW5nZVJhdGUoXHJcbiAgICAgICAgICAgIHN0YXRlLmRyYWZ0LnRvdGFsQW1vdW50LFxyXG4gICAgICAgICAgICBuZXh0RXhjaGFuZ2VSYXRlLFxyXG4gICAgICAgICAgICBlZmZlY3RpdmVDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICAgIGVmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgICBzdGF0ZS5hbW91bnRNU1RNYW51YWxseUVkaXRlZFxyXG4gICAgICAgICAgKSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbZWZmZWN0aXZlTG9jYWxDdXJyZW5jeUNvZGUsIHN0YXRlLmFtb3VudE1TVE1hbnVhbGx5RWRpdGVkLCBzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUsIHN0YXRlLmRyYWZ0LnRvdGFsQW1vdW50XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWhlYWRlciB8fCBpc0xvYWRpbmcpIHJldHVybjtcclxuICAgIGlmIChpc0Zyb21TaGVldExpbmspIHJldHVybjtcclxuICAgIGlmIChoZWFkZXIuc3RhdHVzID09PSAxICYmICFhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0KSByZXR1cm47XHJcbiAgICBpZiAoIWNhbkVkaXRUaWNrZXQpIHtcclxuICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdhc3RvVHlwZUludmFsaWQoZmFsc2UpO1xyXG4gICAgc2V0Q3VycmVuY3lDb2RlSW52YWxpZChmYWxzZSk7XHJcbiAgICBzZXRUb3RhbEFtb3VudEludmFsaWQoZmFsc2UpO1xyXG4gICAgc2V0QW1vdW50TVNUSW52YWxpZChmYWxzZSk7XHJcbiAgICBzZXRFeGNoYW5nZVJhdGVJbnZhbGlkKGZhbHNlKTtcclxuICAgIGRpc3BhdGNoKHsgdHlwZTogXCJoeWRyYXRlX2Zyb21faGVhZGVyXCIsIGhlYWRlciwgbGlua2VkRXhwZW5zZUxpbmUsIGxvY2FsQ3VycmVuY3lDb2RlOiBlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSB9KTtcclxuICAgIGRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLFxyXG4gICAgICBwYXRjaDoge1xyXG4gICAgICAgIG1vZGFsRXJyb3I6IFwiXCIsXHJcbiAgICAgICAgaXNFZGl0aW5nOiB0cnVlLFxyXG4gICAgICAgIHN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0VkaXRpbmdFbmFibGVkXCIsIFwiRWRpdGluZyBlbmFibGVkXCIpLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSwgW1xyXG4gICAgYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCxcclxuICAgIGNhbkVkaXRUaWNrZXQsXHJcbiAgICBlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSxcclxuICAgIGhlYWRlcixcclxuICAgIGlzRnJvbVNoZWV0TGluayxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGxpbmtlZEV4cGVuc2VMaW5lLFxyXG4gICAgb25Gb3JiaWRkZW4sXHJcbiAgXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNhbmNlbEVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIXN0YXRlLmlzRWRpdGluZykgcmV0dXJuO1xyXG4gICAgaWYgKCFoZWFkZXIpIHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IGlzRWRpdGluZzogZmFsc2UgfSB9KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdhc3RvVHlwZUludmFsaWQoZmFsc2UpO1xyXG4gICAgc2V0Q3VycmVuY3lDb2RlSW52YWxpZChmYWxzZSk7XHJcbiAgICBzZXRUb3RhbEFtb3VudEludmFsaWQoZmFsc2UpO1xyXG4gICAgc2V0QW1vdW50TVNUSW52YWxpZChmYWxzZSk7XHJcbiAgICBzZXRFeGNoYW5nZVJhdGVJbnZhbGlkKGZhbHNlKTtcclxuICAgIGRpc3BhdGNoKHsgdHlwZTogXCJoeWRyYXRlX2Zyb21faGVhZGVyXCIsIGhlYWRlciwgbGlua2VkRXhwZW5zZUxpbmUsIGxvY2FsQ3VycmVuY3lDb2RlOiBlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSB9KTtcclxuICAgIGRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLFxyXG4gICAgICBwYXRjaDoge1xyXG4gICAgICAgIGlzRWRpdGluZzogZmFsc2UsXHJcbiAgICAgICAgbW9kYWxFcnJvcjogXCJcIixcclxuICAgICAgICBzdGF0dXM6IGluZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSwgW2VmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlLCBoZWFkZXIsIGxpbmtlZEV4cGVuc2VMaW5lLCBzdGF0ZS5pc0VkaXRpbmddKTtcclxuXHJcbiAgY29uc3QgY2FuT3BlblNhdmVDb25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZERlc2NyaXB0aW9uID0gU3RyaW5nKHN0YXRlLmRyYWZ0LmRlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUgPSBTdHJpbmcoc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlIHx8IFwiXCIpLnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgY29uc3QgcGFyc2VkVG90YWxBbW91bnQgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQoc3RhdGUuZHJhZnQudG90YWxBbW91bnQpO1xyXG4gICAgY29uc3QgcGFyc2VkQW1vdW50TVNUID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHN0YXRlLmRyYWZ0LmFtb3VudE1TVCk7XHJcbiAgICBjb25zdCBwYXJzZWRFeGNoYW5nZVJhdGUgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQoc3RhdGUuZHJhZnQuZXhjaGFuZ2VSYXRlKTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uSXNWYWxpZCA9ICEhbm9ybWFsaXplZERlc2NyaXB0aW9uO1xyXG4gICAgY29uc3QgZ2FzdG9UeXBlSXNWYWxpZCA9IGlzVmFsaWRSZXF1aXJlZEdhc3RvVHlwZShzdGF0ZS5kcmFmdC5nYXN0b1R5cGUpO1xyXG4gICAgY29uc3QgY3VycmVuY3lJc1ZhbGlkID0gISFub3JtYWxpemVkQ3VycmVuY3lDb2RlO1xyXG4gICAgY29uc3QgdG90YWxBbW91bnRJc1ZhbGlkID0gcGFyc2VkVG90YWxBbW91bnQgIT0gbnVsbCAmJiBwYXJzZWRUb3RhbEFtb3VudCA+PSAwO1xyXG4gICAgY29uc3QgcmVxdWlyZXNGb3JlaWduQ3VycmVuY3lTZXR0bGVtZW50ID0gaXNFeHBlbnNlTGluZUZvcmVpZ25DdXJyZW5jeShub3JtYWxpemVkQ3VycmVuY3lDb2RlLCBlZmZlY3RpdmVMb2NhbEN1cnJlbmN5Q29kZSk7XHJcbiAgICBjb25zdCBoYXNGb3JlaWduQ3VycmVuY3lTZXR0bGVtZW50ID1cclxuICAgICAgIXJlcXVpcmVzRm9yZWlnbkN1cnJlbmN5U2V0dGxlbWVudCB8fFxyXG4gICAgICAocGFyc2VkRXhjaGFuZ2VSYXRlICE9IG51bGwgJiYgcGFyc2VkRXhjaGFuZ2VSYXRlID4gMCkgfHxcclxuICAgICAgKHBhcnNlZEFtb3VudE1TVCAhPSBudWxsICYmIHBhcnNlZEFtb3VudE1TVCA+IDApO1xyXG5cclxuICAgIHNldERlc2NyaXB0aW9uSW52YWxpZCghZGVzY3JpcHRpb25Jc1ZhbGlkKTtcclxuICAgIHNldEdhc3RvVHlwZUludmFsaWQoIWdhc3RvVHlwZUlzVmFsaWQpO1xyXG4gICAgc2V0Q3VycmVuY3lDb2RlSW52YWxpZCghY3VycmVuY3lJc1ZhbGlkKTtcclxuICAgIHNldFRvdGFsQW1vdW50SW52YWxpZCghdG90YWxBbW91bnRJc1ZhbGlkKTtcclxuICAgIHNldEV4Y2hhbmdlUmF0ZUludmFsaWQoIWhhc0ZvcmVpZ25DdXJyZW5jeVNldHRsZW1lbnQpO1xyXG4gICAgc2V0QW1vdW50TVNUSW52YWxpZCghaGFzRm9yZWlnbkN1cnJlbmN5U2V0dGxlbWVudCk7XHJcblxyXG4gICAgaWYgKGRlc2NyaXB0aW9uSXNWYWxpZCAmJiBnYXN0b1R5cGVJc1ZhbGlkICYmIGN1cnJlbmN5SXNWYWxpZCAmJiB0b3RhbEFtb3VudElzVmFsaWQgJiYgaGFzRm9yZWlnbkN1cnJlbmN5U2V0dGxlbWVudCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtZXNzYWdlID0gIWRlc2NyaXB0aW9uSXNWYWxpZFxyXG4gICAgICA/IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fRGVzY3JpcHRpb25SZXF1aXJlZFwiLCBcIkRlc2NyaXB0aW9uIGlzIHJlcXVpcmVkLlwiKVxyXG4gICAgICA6ICFnYXN0b1R5cGVJc1ZhbGlkXHJcbiAgICAgICAgPyBpbmRUKFwiVGlja2V0c19WYWxpZGF0aW9uX0NhdGVnb3J5UmVxdWlyZWRcIiwgXCJDYXRlZ29yeSBpcyByZXF1aXJlZC5cIilcclxuICAgICAgICA6ICFjdXJyZW5jeUlzVmFsaWRcclxuICAgICAgICAgID8gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9DdXJyZW5jeVJlcXVpcmVkXCIsIFwiQ3VycmVuY3kgaXMgcmVxdWlyZWQuXCIpXHJcbiAgICAgICAgICA6ICF0b3RhbEFtb3VudElzVmFsaWRcclxuICAgICAgICAgICAgPyBpbmRUKFwiVGlja2V0c19WYWxpZGF0aW9uX1RvdGFsQW1vdW50UmVxdWlyZWRcIiwgXCJUb3RhbCBhbW91bnQgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gMC5cIilcclxuICAgICAgICAgICAgOiBpbmRUKFxyXG4gICAgICAgICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX0xpbmVfVmFsaWRhdGlvbl9Gb3JlaWduQ3VycmVuY3lTZXR0bGVtZW50XCIsXHJcbiAgICAgICAgICAgICAgICBcIkZvcmVpZ24gY3VycmVuY3kgbGluZXMgcmVxdWlyZSBhbiBleGNoYW5nZSByYXRlIGdyZWF0ZXIgdGhhbiAwIG9yIGEgcmVpbWJ1cnNlbWVudCBhbW91bnQuXCJcclxuICAgICAgICAgICAgICApO1xyXG5cclxuICAgIGRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLFxyXG4gICAgICBwYXRjaDoge1xyXG4gICAgICAgIG1vZGFsRXJyb3I6IG1lc3NhZ2UsXHJcbiAgICAgICAgc3RhdHVzOiBtZXNzYWdlLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgIGlmICghZGVzY3JpcHRpb25Jc1ZhbGlkKSB7XHJcbiAgICAgICAgZGVzY3JpcHRpb25JbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFnYXN0b1R5cGVJc1ZhbGlkKSB7XHJcbiAgICAgICAgZ2FzdG9UeXBlSW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghY3VycmVuY3lJc1ZhbGlkKSB7XHJcbiAgICAgICAgY3VycmVuY3lJbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCF0b3RhbEFtb3VudElzVmFsaWQpIHtcclxuICAgICAgICB0b3RhbEFtb3VudElucHV0UmVmLmN1cnJlbnQ/LmZvY3VzKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWhhc0ZvcmVpZ25DdXJyZW5jeVNldHRsZW1lbnQpIHtcclxuICAgICAgICBleGNoYW5nZVJhdGVJbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSwgW1xyXG4gICAgZWZmZWN0aXZlTG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgICBzdGF0ZS5kcmFmdC5hbW91bnRNU1QsXHJcbiAgICBzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUsXHJcbiAgICBzdGF0ZS5kcmFmdC5kZXNjcmlwdGlvbixcclxuICAgIHN0YXRlLmRyYWZ0LmV4Y2hhbmdlUmF0ZSxcclxuICAgIHN0YXRlLmRyYWZ0Lmdhc3RvVHlwZSxcclxuICAgIHN0YXRlLmRyYWZ0LnRvdGFsQW1vdW50LFxyXG4gIF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgYnVzeTogc3RhdGUuYnVzeSxcclxuICAgIHN0YXR1czogc3RhdGUuc3RhdHVzLFxyXG4gICAgaXNFZGl0aW5nOiBzdGF0ZS5pc0VkaXRpbmcsXHJcbiAgICBtb2RhbEVycm9yOiBzdGF0ZS5tb2RhbEVycm9yLFxyXG4gICAgbGluZVBhZ2U6IHN0YXRlLmxpbmVQYWdlLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbjogc3RhdGUuZHJhZnQuZGVzY3JpcHRpb24sXHJcbiAgICBkZXNjcmlwdGlvbkludmFsaWQsXHJcbiAgICBkZXNjcmlwdGlvbklucHV0UmVmLFxyXG4gICAgZHJhZnRHYXN0b1R5cGU6IHN0YXRlLmRyYWZ0Lmdhc3RvVHlwZSxcclxuICAgIGdhc3RvVHlwZUludmFsaWQsXHJcbiAgICBnYXN0b1R5cGVJbnB1dFJlZixcclxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUsXHJcbiAgICBjdXJyZW5jeUNvZGVJbnZhbGlkLFxyXG4gICAgY3VycmVuY3lJbnB1dFJlZixcclxuICAgIGRyYWZ0VG90YWxBbW91bnQ6IHN0YXRlLmRyYWZ0LnRvdGFsQW1vdW50LFxyXG4gICAgdG90YWxBbW91bnRJbnZhbGlkLFxyXG4gICAgdG90YWxBbW91bnRJbnB1dFJlZixcclxuICAgIGRyYWZ0QW1vdW50TVNUOiBzdGF0ZS5kcmFmdC5hbW91bnRNU1QsXHJcbiAgICBhbW91bnRNU1RJbnZhbGlkLFxyXG4gICAgYW1vdW50TVNUSW5wdXRSZWYsXHJcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZTogc3RhdGUuZHJhZnQuZXhjaGFuZ2VSYXRlLFxyXG4gICAgZXhjaGFuZ2VSYXRlSW52YWxpZCxcclxuICAgIGV4Y2hhbmdlUmF0ZUlucHV0UmVmLFxyXG4gICAgbG9jYWxDdXJyZW5jeUNvZGU6IGVmZmVjdGl2ZUxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gICAgZHJhZnRUcmFuc0RhdGU6IHN0YXRlLmRyYWZ0LnRyYW5zRGF0ZSxcclxuICAgIGRyYWZ0VGlja2V0VGltZTogc3RhdGUuZHJhZnQudGlja2V0VGltZSxcclxuICAgIGRyYWZ0Q29tZW50YXJpbzogc3RhdGUuZHJhZnQuY29tZW50YXJpbyxcclxuICAgIGRyYWZ0VXJsRmlsZTogc3RhdGUuZHJhZnQudXJsRmlsZSxcclxuICAgIGRyYWZ0RmlsZU5hbWU6IHN0YXRlLmRyYWZ0LmZpbGVOYW1lLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRMaW5lUGFnZSxcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBzZXREcmFmdEdhc3RvVHlwZSxcclxuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgc2V0RHJhZnRUb3RhbEFtb3VudCxcclxuICAgIHNldERyYWZ0QW1vdW50TVNULFxyXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBjb21taXREcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHtcclxuICBub3JtYWxpemVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxuICByZXNvbHZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG59IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dC50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxuLy8gUGFyc2VzIHJvdXRlIGNvbnRleHQgb25jZSBhbmQgZXhwb3NlcyBzdGFibGUgZmxhZ3MgZm9yIHRpY2tldCBkZXRhaWwgZmxvd3MuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0ID0gKCkgPT4ge1xyXG4gIGNvbnN0IHJvdXRlUGFyYW1zID0gdXNlTWVtbygoKSA9PiBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpLCBbXSk7XHJcbiAgY29uc3QgZmlsZUlkID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1RJQ0tFVF9GSUxFX0lEX18pLCBbXSk7XHJcbiAgY29uc3QgYXV0b0VkaXRNb2RlID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChyb3V0ZVBhcmFtcy5nZXQoXCJtb2RlXCIpKS50b0xvd2VyQ2FzZSgpID09PSBcImVkaXRcIiwgW3JvdXRlUGFyYW1zXSk7XHJcbiAgY29uc3Qgcm91dGVPcmlnaW4gPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcIm9yaWdpblwiKSkudG9Mb3dlckNhc2UoKSwgW3JvdXRlUGFyYW1zXSk7XHJcbiAgY29uc3Qgcm91dGVTaGVldElkID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChyb3V0ZVBhcmFtcy5nZXQoXCJzaGVldElkXCIpKSwgW3JvdXRlUGFyYW1zXSk7XHJcbiAgY29uc3Qgcm91dGVTaGVldExpbmVSZWNJZCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBzYWZlVGV4dChyb3V0ZVBhcmFtcy5nZXQoXCJzaGVldExpbmVSZWNJZFwiKSB8fCByb3V0ZVBhcmFtcy5nZXQoXCJsaW5lUmVjSWRcIikpLFxyXG4gICAgW3JvdXRlUGFyYW1zXVxyXG4gICk7XHJcbiAgY29uc3QgZXhwbGljaXRSZXR1cm5Db250ZXh0ID0gdXNlTWVtbyhcclxuICAgICgpID0+XHJcbiAgICAgIG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcclxuICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgb3JpZ2luOiByb3V0ZU9yaWdpbixcclxuICAgICAgICBzaGVldElkOiByb3V0ZVNoZWV0SWQsXHJcbiAgICAgICAgc2hlZXRMaW5lUmVjSWQ6IHJvdXRlU2hlZXRMaW5lUmVjSWQsXHJcbiAgICAgIH0pLFxyXG4gICAgW2ZpbGVJZCwgcm91dGVPcmlnaW4sIHJvdXRlU2hlZXRJZCwgcm91dGVTaGVldExpbmVSZWNJZF1cclxuICApO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFleHBsaWNpdFJldHVybkNvbnRleHQpIHJldHVybjtcclxuICAgIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dChleHBsaWNpdFJldHVybkNvbnRleHQpO1xyXG4gIH0sIFtleHBsaWNpdFJldHVybkNvbnRleHRdKTtcclxuXHJcbiAgcmV0dXJuIHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgdGlja2V0UmV0dXJuQ29udGV4dCA9IHJlc29sdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dChmaWxlSWQsIGV4cGxpY2l0UmV0dXJuQ29udGV4dCk7XHJcbiAgICBjb25zdCBkZXRhaWxPcmlnaW4gPSB0aWNrZXRSZXR1cm5Db250ZXh0Py5vcmlnaW4gfHwgcm91dGVPcmlnaW47XHJcbiAgICBjb25zdCBjb250ZXh0U2hlZXRJZCA9IHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQgfHwgcm91dGVTaGVldElkO1xyXG4gICAgY29uc3QgY29udGV4dExpbmVSZWNJZCA9IHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0TGluZVJlY0lkIHx8IHJvdXRlU2hlZXRMaW5lUmVjSWQ7XHJcbiAgICBjb25zdCBpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUgPSBkZXRhaWxPcmlnaW4gPT09IFwic2hlZXQtY3JlYXRlXCI7XHJcbiAgICBjb25zdCBpc0Zyb21FeHBlbnNlTGluZSA9IGRldGFpbE9yaWdpbiA9PT0gXCJleHBlbnNlLWxpbmVcIiAmJiAhIWNvbnRleHRTaGVldElkICYmICEhY29udGV4dExpbmVSZWNJZDtcclxuICAgIGNvbnN0IGlzRnJvbVNoZWV0TGluayA9IGRldGFpbE9yaWdpbiA9PT0gXCJzaGVldC1saW5rXCIgJiYgISFjb250ZXh0U2hlZXRJZDtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhdXRvRWRpdE1vZGUsXHJcbiAgICAgIGRldGFpbE9yaWdpbixcclxuICAgICAgY29udGV4dFNoZWV0SWQsXHJcbiAgICAgIGNvbnRleHRMaW5lUmVjSWQsXHJcbiAgICAgIGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSxcclxuICAgICAgaXNGcm9tRXhwZW5zZUxpbmUsXHJcbiAgICAgIGlzRnJvbVNoZWV0TGluayxcclxuICAgICAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxuICAgIH07XHJcbiAgfSwgW2F1dG9FZGl0TW9kZSwgZXhwbGljaXRSZXR1cm5Db250ZXh0LCBmaWxlSWQsIHJvdXRlT3JpZ2luLCByb3V0ZVNoZWV0SWQsIHJvdXRlU2hlZXRMaW5lUmVjSWRdKTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uLy4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbCB9IGZyb20gXCIuLi8uLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5QXJncyA9IHtcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xyXG4gIGRyYWZ0R2FzdG9UeXBlOiBzdHJpbmc7XHJcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBkcmFmdFRvdGFsQW1vdW50OiBzdHJpbmc7XHJcbiAgZHJhZnRUcmFuc0RhdGU6IHN0cmluZztcclxuICBkcmFmdFRpY2tldFRpbWU6IHN0cmluZztcclxuICBkcmFmdEZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGdhc3RvVHlwZUxhYmVsTWFwOiBNYXA8c3RyaW5nLCBzdHJpbmc+O1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0RXhwZW5zZURpc3BsYXlUaW1lID0gKHJhdz86IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSBzYWZlVGV4dChyYXcpO1xyXG4gIGlmICghdmFsdWUgfHwgdmFsdWUgPT09IFwiMFwiKSByZXR1cm4gXCJcIjtcclxuXHJcbiAgY29uc3Qgc2Vjb25kc1ZhbHVlID0gTnVtYmVyKHZhbHVlKTtcclxuICBpZiAoTnVtYmVyLmlzSW50ZWdlcihzZWNvbmRzVmFsdWUpICYmIHNlY29uZHNWYWx1ZSA+PSAwICYmIHNlY29uZHNWYWx1ZSA8PSA4NjM5OSkge1xyXG4gICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHNlY29uZHNWYWx1ZSAvIDM2MDApO1xyXG4gICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY29uZHNWYWx1ZSAlIDM2MDApIC8gNjApO1xyXG4gICAgY29uc3Qgc2Vjb25kcyA9IHNlY29uZHNWYWx1ZSAlIDYwO1xyXG4gICAgcmV0dXJuIFtob3VycywgbWludXRlcywgc2Vjb25kc10ubWFwKChlbnRyeSkgPT4gU3RyaW5nKGVudHJ5KS5wYWRTdGFydCgyLCBcIjBcIikpLmpvaW4oXCI6XCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbWF0Y2ggPSB2YWx1ZS5tYXRjaCgvXihcXGR7MSwyfSk6KFswLTVdXFxkKSg/OjooWzAtNV1cXGQpKT8kLyk7XHJcbiAgaWYgKCFtYXRjaCkgcmV0dXJuIHZhbHVlO1xyXG5cclxuICBjb25zdCBob3VycyA9IE51bWJlci5wYXJzZUludChtYXRjaFsxXSB8fCBcIlwiLCAxMCk7XHJcbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGhvdXJzKSB8fCBob3VycyA8IDAgfHwgaG91cnMgPiAyMykgcmV0dXJuIHZhbHVlO1xyXG5cclxuICByZXR1cm4gYCR7U3RyaW5nKGhvdXJzKS5wYWRTdGFydCgyLCBcIjBcIil9OiR7bWF0Y2hbMl19OiR7bWF0Y2hbM10gfHwgXCIwMFwifWA7XHJcbn07XHJcblxyXG4vLyBDZW50cmFsaXplcyBkaXNwbGF5LW9ubHkgdmFsdWVzIHNvIHRoZSBwYWdlIGNvbnRhaW5lciBzdGF5cyBmb2N1c2VkIG9uIGZsb3cgd2lyaW5nLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXkgPSAoe1xyXG4gIGhlYWRlcixcclxuICBkcmFmdEdhc3RvVHlwZSxcclxuICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICBkcmFmdFRvdGFsQW1vdW50LFxyXG4gIGRyYWZ0VHJhbnNEYXRlLFxyXG4gIGRyYWZ0VGlja2V0VGltZSxcclxuICBkcmFmdEZpbGVOYW1lLFxyXG4gIGlzRWRpdGluZyxcclxuICBnYXN0b1R5cGVMYWJlbE1hcCxcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXlBcmdzKSA9PiB7XHJcbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiAoe1xyXG4gICAgICBmaXJzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9GaXJzdFwiLCBcIkZpcnN0XCIpLFxyXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcclxuICAgICAgbmV4dDogaW5kVChcIkhpc3RvcnlfUGFnZV9OZXh0XCIsIFwiTmV4dFwiKSxcclxuICAgICAgbGFzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKSxcclxuICAgIH0pLFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICBjb25zdCBwcmV2aWV3QWx0VGV4dCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBzYWZlVGV4dChpc0VkaXRpbmcgPyBkcmFmdEZpbGVOYW1lIDogaGVhZGVyPy5maWxlTmFtZSkgfHwgaW5kVChcIlRpY2tldHNfRmllbGRfRmlsZUlkXCIsIFwiVGlja2V0XCIpLFxyXG4gICAgW2RyYWZ0RmlsZU5hbWUsIGhlYWRlcj8uZmlsZU5hbWUsIGlzRWRpdGluZ11cclxuICApO1xyXG5cclxuICBjb25zdCBzdGF0dXNMYWJlbCA9IHVzZU1lbW8oKCkgPT4gZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsKGhlYWRlcj8uc3RhdHVzKSwgW2hlYWRlcj8uc3RhdHVzXSk7XHJcblxyXG4gIGNvbnN0IGdhc3RvVHlwZUxhYmVsID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50R2FzdG9UeXBlID0gaXNFZGl0aW5nID8gZHJhZnRHYXN0b1R5cGUgOiBoZWFkZXI/Lmdhc3RvVHlwZSA9PT0gbnVsbCA/IFwiXCIgOiBTdHJpbmcoaGVhZGVyPy5nYXN0b1R5cGUgPz8gXCJcIik7XHJcbiAgICBpZiAoIWN1cnJlbnRHYXN0b1R5cGUpIHtcclxuICAgICAgcmV0dXJuIGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdhc3RvVHlwZUxhYmVsTWFwLmdldChTdHJpbmcoY3VycmVudEdhc3RvVHlwZSkpIHx8IFN0cmluZyhjdXJyZW50R2FzdG9UeXBlKTtcclxuICB9LCBbZHJhZnRHYXN0b1R5cGUsIGdhc3RvVHlwZUxhYmVsTWFwLCBoZWFkZXI/Lmdhc3RvVHlwZSwgaXNFZGl0aW5nXSk7XHJcblxyXG4gIGNvbnN0IHRvdGFsQW1vdW50VGV4dCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGVkaXRhYmxlVG90YWxBbW91bnQgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQoZHJhZnRUb3RhbEFtb3VudCk7XG4gICAgICByZXR1cm4gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KFxuICAgICAgICBpc0VkaXRpbmcgJiYgZWRpdGFibGVUb3RhbEFtb3VudCAhPSBudWxsXG4gICAgICAgICAgPyBlZGl0YWJsZVRvdGFsQW1vdW50XG4gICAgICAgICAgOiBoZWFkZXI/LnRvdGFsQW1vdW50Q3VycmVuY3kgPz8gaGVhZGVyPy50b3RhbEFtb3VudCA/PyBudWxsLFxuICAgICAgICAoaXNFZGl0aW5nID8gZHJhZnRDdXJyZW5jeUNvZGUgOiBoZWFkZXI/LmN1cnJlbmN5Q29kZSkgfHwgaGVhZGVyPy5jdXJyZW5jeUNvZGVcbiAgICAgICk7XG4gICAgfSxcbiAgICBbZHJhZnRDdXJyZW5jeUNvZGUsIGRyYWZ0VG90YWxBbW91bnQsIGhlYWRlcj8uY3VycmVuY3lDb2RlLCBoZWFkZXI/LnRvdGFsQW1vdW50LCBoZWFkZXI/LnRvdGFsQW1vdW50Q3VycmVuY3ksIGlzRWRpdGluZ11cbiAgKTtcblxyXG4gIGNvbnN0IHRyYW5zRGF0ZVRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGlzRWRpdGluZyA/IGRyYWZ0VHJhbnNEYXRlIDogaGVhZGVyPy50aWNrZXREYXRlIHx8IGhlYWRlcj8udHJhbnNEYXRlLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIiksXHJcbiAgICBbZHJhZnRUcmFuc0RhdGUsIGhlYWRlcj8udGlja2V0RGF0ZSwgaGVhZGVyPy50cmFuc0RhdGUsIGlzRWRpdGluZ11cclxuICApO1xyXG5cclxuICBjb25zdCB0aWNrZXRUaW1lVGV4dCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBmb3JtYXRFeHBlbnNlRGlzcGxheVRpbWUoaXNFZGl0aW5nID8gZHJhZnRUaWNrZXRUaW1lIDogaGVhZGVyPy50aWNrZXRUaW1lKSxcclxuICAgIFtkcmFmdFRpY2tldFRpbWUsIGhlYWRlcj8udGlja2V0VGltZSwgaXNFZGl0aW5nXVxyXG4gICk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gICAgcHJldmlld0FsdFRleHQsXHJcbiAgICBzdGF0dXNMYWJlbCxcclxuICAgIGdhc3RvVHlwZUxhYmVsLFxyXG4gICAgdG90YWxBbW91bnRUZXh0LFxyXG4gICAgdHJhbnNEYXRlVGV4dCxcclxuICAgIHRpY2tldFRpbWVUZXh0LFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGVBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxFcnJvcjogc3RyaW5nO1xyXG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldFN0YXR1czogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBFbmNhcHN1bGF0ZXMgY29uZmlybSBtb2RhbCBzdGF0ZSBzbyB0aGUgcGFnZSBjb250YWluZXIgc3RheXMgZm9jdXNlZCBvbiBmbG93IHdpcmluZy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGUgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgbW9kYWxFcnJvcixcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIHNldFN0YXR1cyxcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZUFyZ3MpID0+IHtcclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcclxuICAgICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtLCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXNdKTtcclxuXHJcbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XHJcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcclxuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICFidXN5ICYmIG1vZGFsRXJyb3JcclxuICAgICAgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIilcclxuICAgICAgOiBtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZvaWQgaGFuZGxlTW9kYWxDb25maXJtKCk7XHJcbiAgfSwgW2J1c3ksIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtLCBtb2RhbEVycm9yXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBtb2RhbCxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gICAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICAgIG1vZGFsQ2FuY2VsVGV4dCxcclxuICAgIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgUmVmT2JqZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgYXBwZW5kRXhwZW5zZVRpY2tldFJldHVyblF1ZXJ5LFxyXG4gIGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsLFxyXG4gIHR5cGUgRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnNBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgY29udGV4dFNoZWV0SWQ6IHN0cmluZztcclxuICBpc0Zyb21TaGVldExpbms6IGJvb2xlYW47XHJcbiAgaGVhZGVyRXhwZW5zZVNoZWV0SWQ6IHN0cmluZztcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgY2FuT3BlblNhdmVDb25maXJtOiAoKSA9PiBib29sZWFuO1xyXG4gIGhhbmRsZVBlcnNpc3RIZWFkZXJEcmFmdDogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBieXBhc3NXb3JrZmxvd0d1YXJkOiBib29sZWFuO1xyXG4gIGxpbmVDb250YWluZXJSZWY6IFJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIG9wZW5QcmV2aWV3OiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xyXG4gIHRpY2tldFJldHVybkNvbnRleHQ/OiBFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCB8IG51bGw7XHJcbn07XHJcblxyXG4vLyBHcm91cHMgdGlja2V0IGRldGFpbCBuYXZpZ2F0aW9uIGFuZCBsaW5lLWNhcmQgaW50ZXJhY3Rpb25zIGJlaGluZCBzdGFibGUgY2FsbGJhY2tzLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBmaWxlSWQsXHJcbiAgY29udGV4dFNoZWV0SWQsXHJcbiAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gIGhlYWRlckV4cGVuc2VTaGVldElkLFxyXG4gIGlzRWRpdGluZyxcclxuICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgaGFuZGxlUGVyc2lzdEhlYWRlckRyYWZ0LFxyXG4gIGJ5cGFzc1dvcmtmbG93R3VhcmQsXHJcbiAgbGluZUNvbnRhaW5lclJlZixcclxuICBvcGVuUHJldmlldyxcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsSW50ZXJhY3Rpb25zQXJncykgPT4ge1xyXG4gIGNvbnN0IHBlcnNpc3RIZWFkZXJEcmFmdElmTmVlZGVkID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKCFpc0VkaXRpbmcpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjYW5PcGVuU2F2ZUNvbmZpcm0oKSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGhhbmRsZVBlcnNpc3RIZWFkZXJEcmFmdCgpO1xyXG4gIH0sIFtjYW5PcGVuU2F2ZUNvbmZpcm0sIGhhbmRsZVBlcnNpc3RIZWFkZXJEcmFmdCwgaXNFZGl0aW5nXSk7XHJcblxyXG4gIGNvbnN0IG9wZW5MaW5lRGV0YWlsID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAocmF3TGluZVJlY0lkOiBzdHJpbmcpID0+IHtcclxuICAgICAgaWYgKGlzRnJvbVNoZWV0TGluaykgcmV0dXJuO1xyXG4gICAgICBpZiAoYnVzeSkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBsaW5lUmVjSWQgPSBzYWZlVGV4dChyYXdMaW5lUmVjSWQpO1xyXG4gICAgICBpZiAoIWxpbmVSZWNJZCB8fCAhZmlsZUlkKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBzaG91bGRPcGVuSW5FZGl0TW9kZSA9IGlzRWRpdGluZztcclxuICAgICAgaWYgKHNob3VsZE9wZW5JbkVkaXRNb2RlKSB7XHJcbiAgICAgICAgY29uc3QgdXBkYXRlT2sgPSBhd2FpdCBwZXJzaXN0SGVhZGVyRHJhZnRJZk5lZWRlZCgpO1xyXG4gICAgICAgIGlmICghdXBkYXRlT2spIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgIGxpbmVSZWNJZCxcclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChzaG91bGRPcGVuSW5FZGl0TW9kZSkge1xyXG4gICAgICAgIHF1ZXJ5LnNldChcIm1vZGVcIiwgXCJlZGl0XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGFwcGVuZEV4cGVuc2VUaWNrZXRSZXR1cm5RdWVyeShxdWVyeSwgdGlja2V0UmV0dXJuQ29udGV4dCk7XHJcblxyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXRMaW5lRGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcclxuICAgICAgICBieXBhc3NHdWFyZE9uY2U6IHNob3VsZE9wZW5JbkVkaXRNb2RlIHx8IGJ5cGFzc1dvcmtmbG93R3VhcmQsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgYnVzeSxcclxuICAgICAgYnlwYXNzV29ya2Zsb3dHdWFyZCxcclxuICAgICAgZmlsZUlkLFxyXG4gICAgICBpc0VkaXRpbmcsXHJcbiAgICAgIGlzRnJvbVNoZWV0TGluayxcclxuICAgICAgcGVyc2lzdEhlYWRlckRyYWZ0SWZOZWVkZWQsXHJcbiAgICAgIHRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb3BlbkNyZWF0ZUxpbmVEZXRhaWwgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoaXNGcm9tU2hlZXRMaW5rKSByZXR1cm47XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuO1xyXG4gICAgaWYgKCFmaWxlSWQpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB1cGRhdGVPayA9IGF3YWl0IHBlcnNpc3RIZWFkZXJEcmFmdElmTmVlZGVkKCk7XHJcbiAgICBpZiAoIXVwZGF0ZU9rKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICBmaWxlSWQsXHJcbiAgICAgIG1vZGU6IFwiY3JlYXRlXCIsXHJcbiAgICB9KTtcclxuICAgIGFwcGVuZEV4cGVuc2VUaWNrZXRSZXR1cm5RdWVyeShxdWVyeSwgdGlja2V0UmV0dXJuQ29udGV4dCk7XHJcblxyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0TGluZURldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxyXG4gICAgICBieXBhc3NHdWFyZE9uY2U6IGlzRWRpdGluZyB8fCBieXBhc3NXb3JrZmxvd0d1YXJkLFxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGJ5cGFzc1dvcmtmbG93R3VhcmQsIGZpbGVJZCwgaXNFZGl0aW5nLCBpc0Zyb21TaGVldExpbmssIHBlcnNpc3RIZWFkZXJEcmFmdElmTmVlZGVkLCB0aWNrZXRSZXR1cm5Db250ZXh0XSk7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcclxuICAgICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xyXG4gICAgICBjb25zdCBjYXJkID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XHJcbiAgICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XHJcbiAgICAgIGlmICghbGluZUNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XHJcbiAgICAgIHJldHVybiBjYXJkO1xyXG4gICAgfSxcclxuICAgIFtsaW5lQ29udGFpbmVyUmVmXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG9wZW5GaWxlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgdm9pZCBvcGVuUHJldmlldygpO1xyXG4gIH0sIFtvcGVuUHJldmlld10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGlzRnJvbVNoZWV0TGluaykgcmV0dXJuO1xyXG4gICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dCh0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkIHx8IGhlYWRlckV4cGVuc2VTaGVldElkIHx8IGNvbnRleHRTaGVldElkKTtcclxuICAgIGlmICghc2FmZVNoZWV0SWQpIHJldHVybjtcclxuXHJcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChidWlsZEV4cGVuc2VTaGVldERldGFpbFVybChzYWZlU2hlZXRJZCksIHtcclxuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXHJcbiAgICB9KTtcclxuICB9LCBbY29udGV4dFNoZWV0SWQsIGhlYWRlckV4cGVuc2VTaGVldElkLCBpc0VkaXRpbmcsIGlzRnJvbVNoZWV0TGluaywgdGlja2V0UmV0dXJuQ29udGV4dF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgb3BlbkNyZWF0ZUxpbmVEZXRhaWwsXHJcbiAgICBvcGVuTGluZURldGFpbCxcclxuICAgIHJlc29sdmVDbGlja2FibGVDYXJkLFxyXG4gICAgb3BlbkZpbGUsXHJcbiAgICBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0LFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lTZXR0bGVtZW50RmllbGRzIGZyb20gXCIuL0V4cGVuc2VDdXJyZW5jeVNldHRsZW1lbnRGaWVsZHMudHN4XCI7XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXRDdXJyZW5jeVNldHRsZW1lbnRGaWVsZHNQcm9wcyA9IHtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgZXhwZW5zZUN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGV4cGVuc2VDdXJyZW5jeUludmFsaWQ6IGJvb2xlYW47XHJcbiAgZXhwZW5zZUN1cnJlbmN5SW5wdXRSZWY6IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICBsb2NhbEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xyXG4gIGV4Y2hhbmdlUmF0ZUludmFsaWQ6IGJvb2xlYW47XHJcbiAgZXhjaGFuZ2VSYXRlSW5wdXRSZWY6IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZTogc3RyaW5nO1xyXG4gIGFtb3VudEN1cnJlbmN5OiBzdHJpbmc7XHJcbiAgYW1vdW50Q3VycmVuY3lJbnZhbGlkOiBib29sZWFuO1xyXG4gIGFtb3VudEN1cnJlbmN5SW5wdXRSZWY6IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICByZWltYnVyc2VtZW50QW1vdW50OiBzdHJpbmc7XHJcbiAgcmVpbWJ1cnNlbWVudEFtb3VudEludmFsaWQ6IGJvb2xlYW47XHJcbiAgcmVpbWJ1cnNlbWVudEFtb3VudElucHV0UmVmOiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgb25FeHBlbnNlQ3VycmVuY3lDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkV4Y2hhbmdlUmF0ZUNvbW1pdD86ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uQW1vdW50Q3VycmVuY3lDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uUmVpbWJ1cnNlbWVudEFtb3VudENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBLZWVwcyB0aWNrZXQgZGV0YWlsIHdpcmVkIHRvIHRoZSBzYW1lIHNldHRsZW1lbnQgY29tcG9uZW50IHVzZWQgYnkgZXhwZW5zZSBsaW5lcy5cclxuY29uc3QgRXhwZW5zZVRpY2tldEN1cnJlbmN5U2V0dGxlbWVudEZpZWxkcyA9ICh7XHJcbiAgaXNFZGl0aW5nLFxyXG4gIGV4cGVuc2VDdXJyZW5jeUNvZGUsXHJcbiAgZXhwZW5zZUN1cnJlbmN5SW52YWxpZCxcclxuICBleHBlbnNlQ3VycmVuY3lJbnB1dFJlZixcclxuICBsb2NhbEN1cnJlbmN5Q29kZSxcclxuICBleGNoYW5nZVJhdGUsXHJcbiAgZXhjaGFuZ2VSYXRlSW52YWxpZCxcclxuICBleGNoYW5nZVJhdGVJbnB1dFJlZixcclxuICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSxcclxuICBhbW91bnRDdXJyZW5jeSxcclxuICBhbW91bnRDdXJyZW5jeUludmFsaWQsXHJcbiAgYW1vdW50Q3VycmVuY3lJbnB1dFJlZixcclxuICByZWltYnVyc2VtZW50QW1vdW50LFxyXG4gIHJlaW1idXJzZW1lbnRBbW91bnRJbnZhbGlkLFxyXG4gIHJlaW1idXJzZW1lbnRBbW91bnRJbnB1dFJlZixcclxuICBvbkV4cGVuc2VDdXJyZW5jeUNoYW5nZSxcclxuICBvbkV4Y2hhbmdlUmF0ZUNoYW5nZSxcclxuICBvbkV4Y2hhbmdlUmF0ZUNvbW1pdCxcclxuICBvbkFtb3VudEN1cnJlbmN5Q2hhbmdlLFxyXG4gIG9uUmVpbWJ1cnNlbWVudEFtb3VudENoYW5nZSxcclxufTogRXhwZW5zZVRpY2tldEN1cnJlbmN5U2V0dGxlbWVudEZpZWxkc1Byb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxFeHBlbnNlQ3VycmVuY3lTZXR0bGVtZW50RmllbGRzXHJcbiAgICAgIGlzRWRpdGluZz17aXNFZGl0aW5nfVxyXG4gICAgICBleHBlbnNlQ3VycmVuY3lDb2RlPXtleHBlbnNlQ3VycmVuY3lDb2RlfVxyXG4gICAgICBleHBlbnNlQ3VycmVuY3lJbnZhbGlkPXtleHBlbnNlQ3VycmVuY3lJbnZhbGlkfVxyXG4gICAgICBleHBlbnNlQ3VycmVuY3lJbnB1dFJlZj17ZXhwZW5zZUN1cnJlbmN5SW5wdXRSZWZ9XHJcbiAgICAgIGxvY2FsQ3VycmVuY3lDb2RlPXtsb2NhbEN1cnJlbmN5Q29kZX1cclxuICAgICAgZXhjaGFuZ2VSYXRlPXtleGNoYW5nZVJhdGV9XHJcbiAgICAgIGV4Y2hhbmdlUmF0ZUludmFsaWQ9e2V4Y2hhbmdlUmF0ZUludmFsaWR9XHJcbiAgICAgIGV4Y2hhbmdlUmF0ZUlucHV0UmVmPXtleGNoYW5nZVJhdGVJbnB1dFJlZn1cclxuICAgICAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U9e2V4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlfVxyXG4gICAgICBhbW91bnRDdXJyZW5jeT17YW1vdW50Q3VycmVuY3l9XHJcbiAgICAgIGFtb3VudEN1cnJlbmN5TW9kZT1cImVkaXRhYmxlXCJcclxuICAgICAgYW1vdW50Q3VycmVuY3lJbnZhbGlkPXthbW91bnRDdXJyZW5jeUludmFsaWR9XHJcbiAgICAgIGFtb3VudEN1cnJlbmN5SW5wdXRSZWY9e2Ftb3VudEN1cnJlbmN5SW5wdXRSZWZ9XHJcbiAgICAgIHJlaW1idXJzZW1lbnRBbW91bnQ9e3JlaW1idXJzZW1lbnRBbW91bnR9XHJcbiAgICAgIHJlaW1idXJzZW1lbnRBbW91bnRJbnZhbGlkPXtyZWltYnVyc2VtZW50QW1vdW50SW52YWxpZH1cclxuICAgICAgcmVpbWJ1cnNlbWVudEFtb3VudElucHV0UmVmPXtyZWltYnVyc2VtZW50QW1vdW50SW5wdXRSZWZ9XHJcbiAgICAgIG9uRXhwZW5zZUN1cnJlbmN5Q2hhbmdlPXtvbkV4cGVuc2VDdXJyZW5jeUNoYW5nZX1cclxuICAgICAgb25FeGNoYW5nZVJhdGVDaGFuZ2U9e29uRXhjaGFuZ2VSYXRlQ2hhbmdlfVxyXG4gICAgICBvbkV4Y2hhbmdlUmF0ZUNvbW1pdD17b25FeGNoYW5nZVJhdGVDb21taXR9XHJcbiAgICAgIG9uQW1vdW50Q3VycmVuY3lDaGFuZ2U9e29uQW1vdW50Q3VycmVuY3lDaGFuZ2V9XHJcbiAgICAgIG9uUmVpbWJ1cnNlbWVudEFtb3VudENoYW5nZT17b25SZWltYnVyc2VtZW50QW1vdW50Q2hhbmdlfVxyXG4gICAgLz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldEN1cnJlbmN5U2V0dGxlbWVudEZpZWxkcztcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfSBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGhhc0V4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdTb3VyY2UgfSBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvZXhwZW5zZVRpY2tldFByZXZpZXdVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRDdXJyZW5jeVNldHRsZW1lbnRGaWVsZHMgZnJvbSBcIi4vRXhwZW5zZVRpY2tldEN1cnJlbmN5U2V0dGxlbWVudEZpZWxkcy50c3hcIjtcclxuXHJcbmNvbnN0IGhhc1JlYWxFeHBlbnNlU2hlZXRWYWx1ZSA9ICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHNhZmVUZXh0KHZhbHVlKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIGZhbHNlO1xyXG4gIGlmIChub3JtYWxpemVkID09PSBcIi1cIiB8fCBub3JtYWxpemVkID09PSBcIjBcIikgcmV0dXJuIGZhbHNlO1xyXG4gIGlmIChub3JtYWxpemVkID09PSBcIm4vYVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwibmFcIikgcmV0dXJuIGZhbHNlO1xyXG4gIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybVByb3BzID0ge1xyXG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlcjtcclxuICBzdGF0dXNMYWJlbDogc3RyaW5nO1xyXG4gIGdhc3RvVHlwZUxhYmVsOiBzdHJpbmc7XHJcbiAgdG90YWxBbW91bnRUZXh0OiBzdHJpbmc7XHJcbiAgdHJhbnNEYXRlVGV4dDogc3RyaW5nO1xyXG4gIHRpY2tldFRpbWVUZXh0OiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGdhc3RvVHlwZU9wdGlvbnM6IEFycmF5PHsgdmFsdWU6IHN0cmluZzsgdGV4dDogc3RyaW5nIH0+O1xyXG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcclxuICBkZXNjcmlwdGlvbkludmFsaWQ6IGJvb2xlYW47XHJcbiAgZGVzY3JpcHRpb25JbnB1dFJlZjogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIGRyYWZ0R2FzdG9UeXBlOiBzdHJpbmc7XHJcbiAgZ2FzdG9UeXBlSW52YWxpZDogYm9vbGVhbjtcclxuICBnYXN0b1R5cGVJbnB1dFJlZjogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZDogYm9vbGVhbjtcclxuICBjdXJyZW5jeUlucHV0UmVmOiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgZHJhZnRUb3RhbEFtb3VudDogc3RyaW5nO1xyXG4gIHRvdGFsQW1vdW50SW52YWxpZDogYm9vbGVhbjtcclxuICB0b3RhbEFtb3VudElucHV0UmVmOiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcclxuICBleGNoYW5nZVJhdGVJbnZhbGlkOiBib29sZWFuO1xyXG4gIGV4Y2hhbmdlUmF0ZUlucHV0UmVmOiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U6IHN0cmluZztcclxuICBkcmFmdEFtb3VudE1TVDogc3RyaW5nO1xyXG4gIGFtb3VudE1TVEludmFsaWQ6IGJvb2xlYW47XHJcbiAgYW1vdW50TVNUSW5wdXRSZWY6IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICBsb2NhbEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgZHJhZnRUaWNrZXRUaW1lOiBzdHJpbmc7XHJcbiAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XHJcbiAgZHJhZnRGaWxlTmFtZTogc3RyaW5nO1xyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdFRvdGFsQW1vdW50Q2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ29tbWl0PzogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdEFtb3VudE1TVENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25PcGVuRmlsZTogKCkgPT4gdm9pZDtcclxuICBvbk9wZW5FeHBlbnNlU2hlZXQ/OiAoKSA9PiB2b2lkO1xyXG4gIGhpZGVPcGVuRmlsZUFjdGlvbj86IGJvb2xlYW47XHJcbiAgY2hpbGRyZW4/OiBSZWFjdC5SZWFjdE5vZGU7XHJcbn07XHJcblxyXG4vLyBSZWFkLW9ubHkgYW5kIGVkaXRhYmxlIGhlYWRlciBmb3JtIGZvciB0aWNrZXQgZGV0YWlsLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybSA9ICh7XHJcbiAgaGVhZGVyLFxyXG4gIHN0YXR1c0xhYmVsLFxyXG4gIGdhc3RvVHlwZUxhYmVsLFxyXG4gIHRvdGFsQW1vdW50VGV4dCxcclxuICB0cmFuc0RhdGVUZXh0LFxyXG4gIHRpY2tldFRpbWVUZXh0LFxyXG4gIGlzRWRpdGluZyxcclxuICBnYXN0b1R5cGVPcHRpb25zLFxyXG4gIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgZGVzY3JpcHRpb25JbnZhbGlkLFxyXG4gIGRlc2NyaXB0aW9uSW5wdXRSZWYsXHJcbiAgZHJhZnRHYXN0b1R5cGUsXHJcbiAgZ2FzdG9UeXBlSW52YWxpZCxcclxuICBnYXN0b1R5cGVJbnB1dFJlZixcclxuICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICBjdXJyZW5jeUNvZGVJbnZhbGlkLFxyXG4gIGN1cnJlbmN5SW5wdXRSZWYsXHJcbiAgZHJhZnRUb3RhbEFtb3VudCxcclxuICB0b3RhbEFtb3VudEludmFsaWQsXHJcbiAgdG90YWxBbW91bnRJbnB1dFJlZixcclxuICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICBleGNoYW5nZVJhdGVJbnZhbGlkLFxyXG4gIGV4Y2hhbmdlUmF0ZUlucHV0UmVmLFxyXG4gIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlLFxyXG4gIGRyYWZ0QW1vdW50TVNULFxyXG4gIGFtb3VudE1TVEludmFsaWQsXHJcbiAgYW1vdW50TVNUSW5wdXRSZWYsXHJcbiAgbG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgZHJhZnRUaWNrZXRUaW1lLFxyXG4gIGRyYWZ0VXJsRmlsZSxcclxuICBkcmFmdEZpbGVOYW1lLFxyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZSxcclxuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlLFxyXG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2UsXHJcbiAgb25EcmFmdFRvdGFsQW1vdW50Q2hhbmdlLFxyXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2UsXHJcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNvbW1pdCxcclxuICBvbkRyYWZ0QW1vdW50TVNUQ2hhbmdlLFxyXG4gIG9uT3BlbkZpbGUsXHJcbiAgb25PcGVuRXhwZW5zZVNoZWV0LFxyXG4gIGhpZGVPcGVuRmlsZUFjdGlvbiA9IGZhbHNlLFxyXG4gIGNoaWxkcmVuLFxyXG59OiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybVByb3BzKSA9PiB7XHJcbiAgY29uc3QgcHJldmlld1VybCA9IHNhZmVUZXh0KGlzRWRpdGluZyA/IGRyYWZ0VXJsRmlsZSA6IGhlYWRlci51cmxGaWxlKTtcclxuICBjb25zdCBjYW5PcGVuRmlsZSA9IGhhc0V4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdTb3VyY2UocHJldmlld1VybCk7XHJcbiAgY29uc3Qgc2hvd0V4cGVuc2VTaGVldEZpZWxkID0gaGFzUmVhbEV4cGVuc2VTaGVldFZhbHVlKGhlYWRlci5ob2phR2FzdG9zSWREaXNwbGF5KTtcclxuICBjb25zdCBsb2NhbGUgPSBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIjtcclxuICBjb25zdCBkaXNwbGF5RGF0ZVRleHQgPVxyXG4gICAgdHJhbnNEYXRlVGV4dCB8fFxyXG4gICAgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGhlYWRlci50aWNrZXREYXRlIHx8IGhlYWRlci50cmFuc0RhdGUsIGxvY2FsZSkgfHxcclxuICAgIFwiLVwiO1xyXG4gIGNvbnN0IGxvY2tlZERyYWZ0RGF0ZVRleHQgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoZHJhZnRUcmFuc0RhdGUsIGxvY2FsZSkgfHwgZGlzcGxheURhdGVUZXh0O1xyXG4gIGNvbnN0IGNhdGVnb3J5RmllbGQgPSBpc0VkaXRpbmcgPyAoXHJcbiAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxyXG4gICAgICBvcHRpb25zPXtnYXN0b1R5cGVPcHRpb25zfVxyXG4gICAgICB2YWx1ZT17ZHJhZnRHYXN0b1R5cGV9XHJcbiAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlfVxyXG4gICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIil9XHJcbiAgICAgIGlucHV0UmVmPXtnYXN0b1R5cGVJbnB1dFJlZn1cclxuICAgICAgaW52YWxpZD17Z2FzdG9UeXBlSW52YWxpZH1cclxuICAgICAgdXNlUG9ydGFsXHJcbiAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cclxuICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XHJcbiAgICAvPlxyXG4gICkgOiAoXHJcbiAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxyXG4gICAgICB2YWx1ZT17Z2FzdG9UeXBlTGFiZWwgfHwgXCItXCJ9XHJcbiAgICAvPlxyXG4gICk7XHJcbiAgY29uc3Qgc3RhdHVzRmllbGQgPSAoXHJcbiAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX1N0YXR1c1wiLCBcIlN0YXR1c1wiKX1cclxuICAgICAgdmFsdWU9e3N0YXR1c0xhYmVsIHx8IFwiLVwifVxyXG4gICAgLz5cclxuICApO1xyXG4gIGNvbnN0IHRpY2tldEZpZWxkID0gKFxyXG4gICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXQgSWQuXCIpfVxyXG4gICAgICB2YWx1ZT17aGVhZGVyLmZpbGVJZCB8fCBcIi1cIn1cclxuICAgIC8+XHJcbiAgKTtcclxuICBjb25zdCBleHBlbnNlU2hlZXRGaWVsZCA9IHNob3dFeHBlbnNlU2hlZXRGaWVsZCA/IChcclxuICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmllbGRfRXhwZW5zZVNoZWV0RGlzcGxheVwiLCBcIkV4cGVuc2Ugc2hlZXQgSWQuXCIpfVxyXG4gICAgICB2YWx1ZT17aGVhZGVyLmhvamFHYXN0b3NJZERpc3BsYXkgfHwgXCItXCJ9XHJcbiAgICAgIG9uQ2xpY2s9e29uT3BlbkV4cGVuc2VTaGVldH1cclxuICAgIC8+XHJcbiAgKSA6IG51bGw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXppbmMtMjAwIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kOmNvbC1zcGFuLTIgc3BhY2UteS0xLjVcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIHJlZj17ZGVzY3JpcHRpb25JbnB1dFJlZn1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb3JtLWNvbnRyb2wke2Rlc2NyaXB0aW9uSW52YWxpZCA/IFwiIGJvcmRlci1yb3NlLTQwMCBiZy1yb3NlLTUwIGZvY3VzOmJvcmRlci1yb3NlLTQwMCBmb2N1czpyaW5nLXJvc2UtMjAwXCIgOiBcIlwifWB9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0RGVzY3JpcHRpb259XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cclxuICAgICAgICAgICAgICBhcmlhLWludmFsaWQ9e2Rlc2NyaXB0aW9uSW52YWxpZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwifVxyXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17aGVhZGVyLmRlc2NyaXB0aW9uIHx8IFwiLVwifVxyXG4gICAgICAgICAgICBmdWxsV2lkdGhcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKX1cclxuXHJcbiAgICAgICAgPEV4cGVuc2VUaWNrZXRDdXJyZW5jeVNldHRsZW1lbnRGaWVsZHNcclxuICAgICAgICAgIGlzRWRpdGluZz17aXNFZGl0aW5nfVxyXG4gICAgICAgICAgZXhwZW5zZUN1cnJlbmN5Q29kZT17aXNFZGl0aW5nID8gZHJhZnRDdXJyZW5jeUNvZGUgOiBzYWZlVGV4dChoZWFkZXIuY3VycmVuY3lDb2RlKX1cclxuICAgICAgICAgIGV4cGVuc2VDdXJyZW5jeUludmFsaWQ9e2N1cnJlbmN5Q29kZUludmFsaWR9XHJcbiAgICAgICAgICBleHBlbnNlQ3VycmVuY3lJbnB1dFJlZj17Y3VycmVuY3lJbnB1dFJlZn1cclxuICAgICAgICAgIGxvY2FsQ3VycmVuY3lDb2RlPXtsb2NhbEN1cnJlbmN5Q29kZX1cclxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZT17ZHJhZnRFeGNoYW5nZVJhdGV9XHJcbiAgICAgICAgICBleGNoYW5nZVJhdGVJbnZhbGlkPXtleGNoYW5nZVJhdGVJbnZhbGlkfVxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlSW5wdXRSZWY9e2V4Y2hhbmdlUmF0ZUlucHV0UmVmfVxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U9e2V4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlfVxyXG4gICAgICAgICAgYW1vdW50Q3VycmVuY3k9e2lzRWRpdGluZyA/IGRyYWZ0VG90YWxBbW91bnQgOiB0b3RhbEFtb3VudFRleHQgfHwgXCItXCJ9XHJcbiAgICAgICAgICBhbW91bnRDdXJyZW5jeUludmFsaWQ9e3RvdGFsQW1vdW50SW52YWxpZH1cclxuICAgICAgICAgIGFtb3VudEN1cnJlbmN5SW5wdXRSZWY9e3RvdGFsQW1vdW50SW5wdXRSZWZ9XHJcbiAgICAgICAgICByZWltYnVyc2VtZW50QW1vdW50PXtkcmFmdEFtb3VudE1TVH1cclxuICAgICAgICAgIHJlaW1idXJzZW1lbnRBbW91bnRJbnZhbGlkPXthbW91bnRNU1RJbnZhbGlkfVxyXG4gICAgICAgICAgcmVpbWJ1cnNlbWVudEFtb3VudElucHV0UmVmPXthbW91bnRNU1RJbnB1dFJlZn1cclxuICAgICAgICAgIG9uRXhwZW5zZUN1cnJlbmN5Q2hhbmdlPXtvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlfVxyXG4gICAgICAgICAgb25FeGNoYW5nZVJhdGVDaGFuZ2U9e29uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2V9XHJcbiAgICAgICAgICBvbkV4Y2hhbmdlUmF0ZUNvbW1pdD17b25EcmFmdEV4Y2hhbmdlUmF0ZUNvbW1pdH1cclxuICAgICAgICAgIG9uQW1vdW50Q3VycmVuY3lDaGFuZ2U9e29uRHJhZnRUb3RhbEFtb3VudENoYW5nZX1cclxuICAgICAgICAgIG9uUmVpbWJ1cnNlbWVudEFtb3VudENoYW5nZT17b25EcmFmdEFtb3VudE1TVENoYW5nZX1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kOmNvbC1zcGFuLTIgZ3JpZCBncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9UaWNrZXREYXRlXCIsIFwiRGF0ZVwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2lzRWRpdGluZyA/IGxvY2tlZERyYWZ0RGF0ZVRleHQgOiBkaXNwbGF5RGF0ZVRleHR9XHJcbiAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmllbGRfVGlja2V0VGltZVwiLCBcIlRpbWVcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtpc0VkaXRpbmcgPyBkcmFmdFRpY2tldFRpbWUgfHwgdGlja2V0VGltZVRleHQgfHwgXCItXCIgOiB0aWNrZXRUaW1lVGV4dCB8fCBcIi1cIn1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWQ6Y29sLXNwYW4tMiBncmlkIGdyaWQtY29scy0yIGdhcC00XCI+XHJcbiAgICAgICAgICB7Y2F0ZWdvcnlGaWVsZH1cclxuICAgICAgICAgIHtzdGF0dXNGaWVsZH1cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAge2V4cGVuc2VTaGVldEZpZWxkID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZDpjb2wtc3Bhbi0yIGdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTRcIj5cclxuICAgICAgICAgICAge3RpY2tldEZpZWxkfVxyXG4gICAgICAgICAgICB7ZXhwZW5zZVNoZWV0RmllbGR9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgdGlja2V0RmllbGRcclxuICAgICAgICApfVxyXG5cclxuICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge2Nhbk9wZW5GaWxlICYmICFoaWRlT3BlbkZpbGVBY3Rpb24gPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktZW5kXCI+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCJcclxuICAgICAgICAgICAgb25DbGljaz17b25PcGVuRmlsZX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge2luZFQoXCJUaWNrZXRzX0RldGFpbF9WaWV3QXR0YWNobWVudFwiLCBcIlZlciBhZGp1bnRvXCIpfVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGdldEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZUxhYmVsLFxyXG4gIGdldEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZU9wdGlvbnMsXHJcbiAgbm9ybWFsaXplRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlLFxyXG59IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2VDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0IGZyb20gXCIuL0V4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZVNlY3Rpb25Qcm9wcyA9IHtcclxuICBwcm9qZWN0SWQ6IHN0cmluZztcclxuICByZWltYnVyc2FibGVFeHBlbnNlOiBudW1iZXI7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgZXJyb3JNZXNzYWdlPzogc3RyaW5nO1xyXG4gIG9uUHJvamVjdElkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvblJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2U6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyBsaW5rZWQgZXhwZW5zZS1zaGVldCBsaW5lIGZpZWxkcyBpbmxpbmUgaW5zaWRlIHRoZSB0aWNrZXQgZGV0YWlsIGZvcm0uXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVTZWN0aW9uID0gKHtcclxuICBwcm9qZWN0SWQsXHJcbiAgcmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICBpc0VkaXRpbmcsXHJcbiAgaXNMb2FkaW5nLFxyXG4gIGRpc2FibGVkID0gZmFsc2UsXHJcbiAgZXJyb3JNZXNzYWdlID0gXCJcIixcclxuICBvblByb2plY3RJZENoYW5nZSxcclxuICBvblJlaW1idXJzYWJsZUV4cGVuc2VDaGFuZ2UsXHJcbn06IEV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVTZWN0aW9uUHJvcHMpID0+IHtcclxuICBjb25zdCByZWltYnVyc2FibGVFeHBlbnNlT3B0aW9ucyA9IFJlYWN0LnVzZU1lbW8oKCkgPT4gZ2V0RXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlT3B0aW9ucygpLCBbXSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFJlaW1idXJzYWJsZUV4cGVuc2UgPSBub3JtYWxpemVFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2UocmVpbWJ1cnNhYmxlRXhwZW5zZSk7XHJcbiAgY29uc3QgcmVpbWJ1cnNhYmxlRXhwZW5zZUxhYmVsID0gZ2V0RXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlTGFiZWwobm9ybWFsaXplZFJlaW1idXJzYWJsZUV4cGVuc2UpO1xyXG4gIGNvbnN0IHByb2plY3RGaWVsZCA9IGlzRWRpdGluZyA/IChcclxuICAgIDxFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0XHJcbiAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX1cclxuICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Qcm9qZWN0X1BsYWNlaG9sZGVyXCIsIFwiUHJvamVjdCBpZFwiKX1cclxuICAgICAgdmFsdWU9e3Byb2plY3RJZH1cclxuICAgICAgb25DaGFuZ2U9e29uUHJvamVjdElkQ2hhbmdlfVxyXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgIHJlYWRPbmx5PXtkaXNhYmxlZH1cclxuICAgIC8+XHJcbiAgKSA6IChcclxuICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9XHJcbiAgICAgIHZhbHVlPXtwcm9qZWN0SWQgfHwgXCItXCJ9XHJcbiAgICAvPlxyXG4gICk7XHJcbiAgY29uc3QgcmVpbWJ1cnNhYmxlRXhwZW5zZUZpZWxkID0gaXNFZGl0aW5nID8gKFxyXG4gICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9SZWltYnVyc2FibGVFeHBlbnNlXCIsIFwiUmVpbWJ1cnNhYmxlXCIpfVxyXG4gICAgICBvcHRpb25zPXtyZWltYnVyc2FibGVFeHBlbnNlT3B0aW9uc31cclxuICAgICAgdmFsdWU9e1N0cmluZyhub3JtYWxpemVkUmVpbWJ1cnNhYmxlRXhwZW5zZSl9XHJcbiAgICAgIG9uQ2hhbmdlPXsodmFsdWUpID0+IG9uUmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZShub3JtYWxpemVFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2UodmFsdWUpKX1cclxuICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1JlaW1idXJzYWJsZUV4cGVuc2VcIiwgXCJSZWltYnVyc2FibGVcIil9XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICByZWFkT25seT17ZGlzYWJsZWR9XG4gICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cbiAgICAvPlxyXG4gICkgOiAoXHJcbiAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1JlaW1idXJzYWJsZUV4cGVuc2VcIiwgXCJSZWltYnVyc2FibGVcIil9XHJcbiAgICAgIHZhbHVlPXtyZWltYnVyc2FibGVFeHBlbnNlTGFiZWx9XHJcbiAgICAvPlxyXG4gICk7XHJcblxyXG4gIGlmIChpc0xvYWRpbmcpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWQ6Y29sLXNwYW4tMiBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtemluYy03MDBcIj5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIHNpemUtNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XHJcbiAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgaWYgKGVycm9yTWVzc2FnZSkge1xyXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwibWQ6Y29sLXNwYW4tMiB0ZXh0LWRhbmdlciB0ZXh0LXNtXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj47XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtZDpjb2wtc3Bhbi0yIGdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTMgbWQ6Z2FwLTRcIj5cclxuICAgICAge3Byb2plY3RGaWVsZH1cclxuICAgICAge3JlaW1idXJzYWJsZUV4cGVuc2VGaWVsZH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lU2VjdGlvbjtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBSZWZPYmplY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tIFwiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybS50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVTZWN0aW9uIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVTZWN0aW9uLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldExpbmVzTGlzdCBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGluZXNMaXN0LnRzeFwiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIsIEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0UHJldmlld01vZGFsIGZyb20gXCIuL0V4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWwudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0U3RpY2t5UHJldmlldyBmcm9tIFwiLi9FeHBlbnNlVGlja2V0U3RpY2t5UHJldmlldy50c3hcIjtcclxuaW1wb3J0IHR5cGUgeyBUaWNrZXRQcmV2aWV3UG9pbnQgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzXCI7XHJcblxyXG50eXBlIFBhZ2luYXRpb25MYWJlbHMgPSB7XHJcbiAgZmlyc3Q6IHN0cmluZztcclxuICBwcmV2OiBzdHJpbmc7XHJcbiAgbmV4dDogc3RyaW5nO1xyXG4gIGxhc3Q6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldERldGFpbFZpZXdQcm9wcyA9IHtcclxuICBtb2RhbDoge1xyXG4gICAgb3BlbjogYm9vbGVhbjtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBjb25maXJtVGV4dDogc3RyaW5nO1xyXG4gICAgY2FuY2VsVGV4dDogc3RyaW5nO1xyXG4gICAgbG9hZGluZ1RleHQ6IHN0cmluZztcclxuICAgIHNob3dDYW5jZWw6IGJvb2xlYW47XHJcbiAgICBzaG93Q29uZmlybTogYm9vbGVhbjtcclxuICAgIGJ1c3k6IGJvb2xlYW47XHJcbiAgICBlcnJvcjogc3RyaW5nO1xyXG4gICAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbiAgICBvbkNhbmNlbDogKCkgPT4gdm9pZDtcclxuICB9O1xyXG4gIHByZXZpZXc6IHtcclxuICAgIG9wZW46IGJvb2xlYW47XHJcbiAgICBidXN5OiBib29sZWFuO1xyXG4gICAgZXJyb3I6IHN0cmluZztcclxuICAgIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICBpbWFnZUFsdDogc3RyaW5nO1xyXG4gICAgc2NhbGU6IG51bWJlcjtcclxuICAgIHRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50O1xyXG4gICAgc3VyZmFjZVJlZjogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xyXG4gICAgb25Qb2ludGVyRG93bjogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gICAgb25Qb2ludGVyTW92ZTogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gICAgb25Qb2ludGVyRW5kOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgfTtcclxuICBjb250ZW50OiB7XHJcbiAgICBpc0xvYWRpbmc6IGJvb2xlYW47XHJcbiAgICBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICAgIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw7XHJcbiAgICBzaG93U3RpY2t5UHJldmlldzogYm9vbGVhbjtcclxuICAgIHByZXZpZXdCdXN5OiBib29sZWFuO1xyXG4gICAgcHJldmlld0Vycm9yOiBzdHJpbmc7XHJcbiAgICBwcmV2aWV3SW1hZ2VVcmw6IHN0cmluZztcclxuICAgIHByZXZpZXdGaWxlTmFtZTogc3RyaW5nO1xyXG4gICAgcHJldmlld0FsdFRleHQ6IHN0cmluZztcclxuICAgIG9uT3BlblByZXZpZXc6ICgpID0+IHZvaWQ7XHJcbiAgICBzdGF0dXNMYWJlbDogc3RyaW5nO1xyXG4gICAgZ2FzdG9UeXBlTGFiZWw6IHN0cmluZztcclxuICAgIHRvdGFsQW1vdW50VGV4dDogc3RyaW5nO1xyXG4gICAgdHJhbnNEYXRlVGV4dDogc3RyaW5nO1xyXG4gICAgdGlja2V0VGltZVRleHQ6IHN0cmluZztcclxuICAgIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICAgIGdhc3RvVHlwZU9wdGlvbnM6IEFycmF5PHsgdmFsdWU6IHN0cmluZzsgdGV4dDogc3RyaW5nIH0+O1xyXG4gICAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gICAgZGVzY3JpcHRpb25JbnZhbGlkOiBib29sZWFuO1xyXG4gICAgZGVzY3JpcHRpb25JbnB1dFJlZjogUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICAgIGRyYWZ0R2FzdG9UeXBlOiBzdHJpbmc7XHJcbiAgICBnYXN0b1R5cGVJbnZhbGlkOiBib29sZWFuO1xyXG4gICAgZ2FzdG9UeXBlSW5wdXRSZWY6IFJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gICAgY3VycmVuY3lDb2RlSW52YWxpZDogYm9vbGVhbjtcclxuICAgIGN1cnJlbmN5SW5wdXRSZWY6IFJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgICBkcmFmdFRvdGFsQW1vdW50OiBzdHJpbmc7XHJcbiAgICB0b3RhbEFtb3VudEludmFsaWQ6IGJvb2xlYW47XHJcbiAgICB0b3RhbEFtb3VudElucHV0UmVmOiBSZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gICAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcclxuICAgIGV4Y2hhbmdlUmF0ZUludmFsaWQ6IGJvb2xlYW47XHJcbiAgICBleGNoYW5nZVJhdGVJbnB1dFJlZjogUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICAgIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBkcmFmdEFtb3VudE1TVDogc3RyaW5nO1xyXG4gICAgYW1vdW50TVNUSW52YWxpZDogYm9vbGVhbjtcclxuICAgIGFtb3VudE1TVElucHV0UmVmOiBSZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gICAgbG9jYWxDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICAgIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgICBkcmFmdFRpY2tldFRpbWU6IHN0cmluZztcclxuICAgIGRyYWZ0VXJsRmlsZTogc3RyaW5nO1xyXG4gICAgZHJhZnRGaWxlTmFtZTogc3RyaW5nO1xyXG4gICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICAgIG9uRHJhZnRHYXN0b1R5cGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICBvbkRyYWZ0VG90YWxBbW91bnRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ29tbWl0OiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICAgIG9uRHJhZnRBbW91bnRNU1RDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgb25PcGVuRmlsZTogKCkgPT4gdm9pZDtcclxuICAgIG9uT3BlbkV4cGVuc2VTaGVldD86ICgpID0+IHZvaWQ7XHJcbiAgICBsaW5rZWRMaW5lOiB7XHJcbiAgICAgIHZpc2libGU6IGJvb2xlYW47XHJcbiAgICAgIHByb2plY3RJZDogc3RyaW5nO1xyXG4gICAgICByZWltYnVyc2FibGVFeHBlbnNlOiBudW1iZXI7XHJcbiAgICAgIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICAgICAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICAgIGRpc2FibGVkOiBib29sZWFuO1xyXG4gICAgICBvblByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICAgIG9uUmVpbWJ1cnNhYmxlRXhwZW5zZUNoYW5nZTogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQ7XHJcbiAgICB9O1xyXG4gICAgdmlzaWJsZUxpbmVzOiBFeHBlbnNlVGlja2V0RGV0YWlsTGluZVtdO1xyXG4gICAgdG90YWxMaW5lUGFnZXM6IG51bWJlcjtcclxuICAgIGxpbmVQYWdlOiBudW1iZXI7XHJcbiAgICBjdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICAgIHBhZ2luYXRpb25MYWJlbHM6IFBhZ2luYXRpb25MYWJlbHM7XHJcbiAgICBjb250YWluZXJSZWY6IFJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gICAgb25MaW5lUGFnZUNoYW5nZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcclxuICAgIG9uT3BlbkxpbmU6IChsaW5lUmVjSWQ6IHN0cmluZykgPT4gdm9pZDtcclxuICB9O1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyB0aGUgdGlja2V0IGRldGFpbCB2aWV3IHdoaWxlIHRoZSBwYWdlIGNvbnRhaW5lciBvd25zIG9yY2hlc3RyYXRpb24uXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3ID0gKHsgbW9kYWwsIHByZXZpZXcsIGNvbnRlbnQgfTogRXhwZW5zZVRpY2tldERldGFpbFZpZXdQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGRldGFpbEJvZHkgPSAoXHJcbiAgICA8PlxyXG4gICAgICA8RXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm1cclxuICAgICAgICBoZWFkZXI9e2NvbnRlbnQuaGVhZGVyfVxyXG4gICAgICAgIHN0YXR1c0xhYmVsPXtjb250ZW50LnN0YXR1c0xhYmVsfVxyXG4gICAgICAgIGdhc3RvVHlwZUxhYmVsPXtjb250ZW50Lmdhc3RvVHlwZUxhYmVsfVxyXG4gICAgICAgIHRvdGFsQW1vdW50VGV4dD17Y29udGVudC50b3RhbEFtb3VudFRleHR9XHJcbiAgICAgICAgdHJhbnNEYXRlVGV4dD17Y29udGVudC50cmFuc0RhdGVUZXh0fVxyXG4gICAgICAgIHRpY2tldFRpbWVUZXh0PXtjb250ZW50LnRpY2tldFRpbWVUZXh0fVxyXG4gICAgICAgIGlzRWRpdGluZz17Y29udGVudC5pc0VkaXRpbmd9XHJcbiAgICAgICAgZ2FzdG9UeXBlT3B0aW9ucz17Y29udGVudC5nYXN0b1R5cGVPcHRpb25zfVxyXG4gICAgICAgIGRyYWZ0RGVzY3JpcHRpb249e2NvbnRlbnQuZHJhZnREZXNjcmlwdGlvbn1cclxuICAgICAgICBkZXNjcmlwdGlvbkludmFsaWQ9e2NvbnRlbnQuZGVzY3JpcHRpb25JbnZhbGlkfVxyXG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXRSZWY9e2NvbnRlbnQuZGVzY3JpcHRpb25JbnB1dFJlZn1cclxuICAgICAgICBkcmFmdEdhc3RvVHlwZT17Y29udGVudC5kcmFmdEdhc3RvVHlwZX1cclxuICAgICAgICBnYXN0b1R5cGVJbnZhbGlkPXtjb250ZW50Lmdhc3RvVHlwZUludmFsaWR9XHJcbiAgICAgICAgZ2FzdG9UeXBlSW5wdXRSZWY9e2NvbnRlbnQuZ2FzdG9UeXBlSW5wdXRSZWZ9XHJcbiAgICAgICAgZHJhZnRDdXJyZW5jeUNvZGU9e2NvbnRlbnQuZHJhZnRDdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgY3VycmVuY3lDb2RlSW52YWxpZD17Y29udGVudC5jdXJyZW5jeUNvZGVJbnZhbGlkfVxyXG4gICAgICAgIGN1cnJlbmN5SW5wdXRSZWY9e2NvbnRlbnQuY3VycmVuY3lJbnB1dFJlZn1cclxuICAgICAgICBkcmFmdFRvdGFsQW1vdW50PXtjb250ZW50LmRyYWZ0VG90YWxBbW91bnR9XHJcbiAgICAgICAgdG90YWxBbW91bnRJbnZhbGlkPXtjb250ZW50LnRvdGFsQW1vdW50SW52YWxpZH1cclxuICAgICAgICB0b3RhbEFtb3VudElucHV0UmVmPXtjb250ZW50LnRvdGFsQW1vdW50SW5wdXRSZWZ9XHJcbiAgICAgICAgZHJhZnRFeGNoYW5nZVJhdGU9e2NvbnRlbnQuZHJhZnRFeGNoYW5nZVJhdGV9XHJcbiAgICAgICAgZXhjaGFuZ2VSYXRlSW52YWxpZD17Y29udGVudC5leGNoYW5nZVJhdGVJbnZhbGlkfVxyXG4gICAgICAgIGV4Y2hhbmdlUmF0ZUlucHV0UmVmPXtjb250ZW50LmV4Y2hhbmdlUmF0ZUlucHV0UmVmfVxyXG4gICAgICAgIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlPXtjb250ZW50LmV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlfVxyXG4gICAgICAgIGRyYWZ0QW1vdW50TVNUPXtjb250ZW50LmRyYWZ0QW1vdW50TVNUfVxyXG4gICAgICAgIGFtb3VudE1TVEludmFsaWQ9e2NvbnRlbnQuYW1vdW50TVNUSW52YWxpZH1cclxuICAgICAgICBhbW91bnRNU1RJbnB1dFJlZj17Y29udGVudC5hbW91bnRNU1RJbnB1dFJlZn1cclxuICAgICAgICBsb2NhbEN1cnJlbmN5Q29kZT17Y29udGVudC5sb2NhbEN1cnJlbmN5Q29kZX1cclxuICAgICAgICBkcmFmdFRyYW5zRGF0ZT17Y29udGVudC5kcmFmdFRyYW5zRGF0ZX1cclxuICAgICAgICBkcmFmdFRpY2tldFRpbWU9e2NvbnRlbnQuZHJhZnRUaWNrZXRUaW1lfVxyXG4gICAgICAgIGRyYWZ0VXJsRmlsZT17Y29udGVudC5kcmFmdFVybEZpbGV9XHJcbiAgICAgICAgZHJhZnRGaWxlTmFtZT17Y29udGVudC5kcmFmdEZpbGVOYW1lfVxyXG4gICAgICAgIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZT17Y29udGVudC5vbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2V9XHJcbiAgICAgICAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZT17Y29udGVudC5vbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlfVxyXG4gICAgICAgIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U9e2NvbnRlbnQub25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cclxuICAgICAgICBvbkRyYWZ0VG90YWxBbW91bnRDaGFuZ2U9e2NvbnRlbnQub25EcmFmdFRvdGFsQW1vdW50Q2hhbmdlfVxyXG4gICAgICAgIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U9e2NvbnRlbnQub25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZX1cclxuICAgICAgICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ29tbWl0PXtjb250ZW50Lm9uRHJhZnRFeGNoYW5nZVJhdGVDb21taXR9XHJcbiAgICAgICAgb25EcmFmdEFtb3VudE1TVENoYW5nZT17Y29udGVudC5vbkRyYWZ0QW1vdW50TVNUQ2hhbmdlfVxyXG4gICAgICAgIG9uT3BlbkZpbGU9e2NvbnRlbnQub25PcGVuRmlsZX1cclxuICAgICAgICBvbk9wZW5FeHBlbnNlU2hlZXQ9e2NvbnRlbnQub25PcGVuRXhwZW5zZVNoZWV0fVxyXG4gICAgICAgIGhpZGVPcGVuRmlsZUFjdGlvbj17Y29udGVudC5zaG93U3RpY2t5UHJldmlld31cclxuICAgICAgPlxyXG4gICAgICAgIHtjb250ZW50LmxpbmtlZExpbmUudmlzaWJsZSA/IChcclxuICAgICAgICAgIDxFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lU2VjdGlvblxyXG4gICAgICAgICAgICBwcm9qZWN0SWQ9e2NvbnRlbnQubGlua2VkTGluZS5wcm9qZWN0SWR9XHJcbiAgICAgICAgICAgIHJlaW1idXJzYWJsZUV4cGVuc2U9e2NvbnRlbnQubGlua2VkTGluZS5yZWltYnVyc2FibGVFeHBlbnNlfVxyXG4gICAgICAgICAgICBpc0VkaXRpbmc9e2NvbnRlbnQuaXNFZGl0aW5nfVxyXG4gICAgICAgICAgICBpc0xvYWRpbmc9e2NvbnRlbnQubGlua2VkTGluZS5pc0xvYWRpbmd9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtjb250ZW50LmxpbmtlZExpbmUuZGlzYWJsZWR9XHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZT17Y29udGVudC5saW5rZWRMaW5lLmVycm9yTWVzc2FnZX1cclxuICAgICAgICAgICAgb25Qcm9qZWN0SWRDaGFuZ2U9e2NvbnRlbnQubGlua2VkTGluZS5vblByb2plY3RJZENoYW5nZX1cclxuICAgICAgICAgICAgb25SZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlPXtjb250ZW50LmxpbmtlZExpbmUub25SZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgPC9FeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybT5cclxuICAgICAgPEV4cGVuc2VUaWNrZXRMaW5lc0xpc3RcclxuICAgICAgICB2aXNpYmxlTGluZXM9e2NvbnRlbnQudmlzaWJsZUxpbmVzfVxyXG4gICAgICAgIHRvdGFsTGluZVBhZ2VzPXtjb250ZW50LnRvdGFsTGluZVBhZ2VzfVxyXG4gICAgICAgIGxpbmVQYWdlPXtjb250ZW50LmxpbmVQYWdlfVxyXG4gICAgICAgIGN1cnJlbmN5Q29kZT17Y29udGVudC5jdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgcGFnaW5hdGlvbkxhYmVscz17Y29udGVudC5wYWdpbmF0aW9uTGFiZWxzfVxyXG4gICAgICAgIGNvbnRhaW5lclJlZj17Y29udGVudC5jb250YWluZXJSZWZ9XHJcbiAgICAgICAgb25MaW5lUGFnZUNoYW5nZT17Y29udGVudC5vbkxpbmVQYWdlQ2hhbmdlfVxyXG4gICAgICAgIG9uT3BlbkxpbmU9e2NvbnRlbnQub25PcGVuTGluZX1cclxuICAgICAgLz5cclxuICAgIDwvPlxyXG4gICk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxyXG4gICAgICA8Q29uZmlybU1vZGFsXHJcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cclxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XHJcbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cclxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWwuY29uZmlybVRleHR9XHJcbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWwuY2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWwubG9hZGluZ1RleHR9XHJcbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cclxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XHJcbiAgICAgICAgYnVzeT17bW9kYWwuYnVzeX1cclxuICAgICAgICBlcnJvcj17bW9kYWwuZXJyb3J9XHJcbiAgICAgICAgc3RhdHVzPXttb2RhbC5zdGF0dXN9XHJcbiAgICAgICAgb25Db25maXJtPXttb2RhbC5vbkNvbmZpcm19XHJcbiAgICAgICAgb25DYW5jZWw9e21vZGFsLm9uQ2FuY2VsfVxyXG4gICAgICAvPlxyXG4gICAgICA8RXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbFxyXG4gICAgICAgIG9wZW49e3ByZXZpZXcub3Blbn1cclxuICAgICAgICBidXN5PXtwcmV2aWV3LmJ1c3l9XHJcbiAgICAgICAgZXJyb3I9e3ByZXZpZXcuZXJyb3J9XHJcbiAgICAgICAgaW1hZ2VVcmw9e3ByZXZpZXcuaW1hZ2VVcmx9XHJcbiAgICAgICAgaW1hZ2VBbHQ9e3ByZXZpZXcuaW1hZ2VBbHR9XHJcbiAgICAgICAgc2NhbGU9e3ByZXZpZXcuc2NhbGV9XHJcbiAgICAgICAgdHJhbnNsYXRlPXtwcmV2aWV3LnRyYW5zbGF0ZX1cclxuICAgICAgICBzdXJmYWNlUmVmPXtwcmV2aWV3LnN1cmZhY2VSZWZ9XHJcbiAgICAgICAgb25DbG9zZT17cHJldmlldy5vbkNsb3NlfVxyXG4gICAgICAgIG9uUG9pbnRlckRvd249e3ByZXZpZXcub25Qb2ludGVyRG93bn1cclxuICAgICAgICBvblBvaW50ZXJNb3ZlPXtwcmV2aWV3Lm9uUG9pbnRlck1vdmV9XHJcbiAgICAgICAgb25Qb2ludGVyRW5kPXtwcmV2aWV3Lm9uUG9pbnRlckVuZH1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC16aW5jLTcwMFwiXHJcbiAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogY29udGVudC5pc0xvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XHJcbiAgICAgID5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIHNpemUtNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XHJcbiAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7Y29udGVudC5lcnJvck1lc3NhZ2UgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2NvbnRlbnQuZXJyb3JNZXNzYWdlfTwvZGl2PiA6IG51bGx9XHJcblxyXG4gICAgICB7IWNvbnRlbnQuaXNMb2FkaW5nICYmICFjb250ZW50LmVycm9yTWVzc2FnZSAmJiBjb250ZW50LmhlYWRlciA/IChcclxuICAgICAgICBjb250ZW50LnNob3dTdGlja3lQcmV2aWV3ID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIG1pbi13LTAgbWF4LXctZnVsbCBncmlkLWNvbHMtMSBnYXAteS0yIGxnOmdyaWQtY29scy1bbWlubWF4KDAsMWZyKV8zMjBweF0gbGc6Z2FwLTRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4tdy0wIG1heC13LWZ1bGwgbGc6Y29sLXN0YXJ0LTJcIj5cclxuICAgICAgICAgICAgICA8RXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXdcclxuICAgICAgICAgICAgICAgIGJ1c3k9e2NvbnRlbnQucHJldmlld0J1c3l9XHJcbiAgICAgICAgICAgICAgICBlcnJvcj17Y29udGVudC5wcmV2aWV3RXJyb3J9XHJcbiAgICAgICAgICAgICAgICBpbWFnZVVybD17Y29udGVudC5wcmV2aWV3SW1hZ2VVcmx9XHJcbiAgICAgICAgICAgICAgICBpbWFnZUFsdD17Y29udGVudC5wcmV2aWV3QWx0VGV4dH1cclxuICAgICAgICAgICAgICAgIGZpbGVOYW1lPXtjb250ZW50LnByZXZpZXdGaWxlTmFtZX1cclxuICAgICAgICAgICAgICAgIG9uT3Blbj17Y29udGVudC5vbk9wZW5QcmV2aWV3fVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi13LTAgc3BhY2UteS0yIGxnOmNvbC1zdGFydC0xIGxnOnJvdy1zdGFydC0xXCI+e2RldGFpbEJvZHl9PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgZGV0YWlsQm9keVxyXG4gICAgICAgIClcclxuICAgICAgKSA6IG51bGx9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldERldGFpbFZpZXc7XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0RGV0YWlsRHRvLCBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uLy4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIERFRkFVTFRfTElORV9SRUlNQlVSU0FCTEVfRVhQRU5TRSxcclxuICBub3JtYWxpemVFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbn0gZnJvbSBcIi4uLy4uL2NvbnN0YW50cy9leHBlbnNlUmVpbWJ1cnNhYmxlRXhwZW5zZUNhdGFsb2cudHNcIjtcclxuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwsIG1hcEV4cGVuc2VTaGVldExpbmUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lQXJncyA9IHtcclxuICBlbmFibGVkOiBib29sZWFuO1xyXG4gIHNoZWV0SWQ6IHN0cmluZztcclxuICBsaW5lUmVjSWQ6IHN0cmluZztcclxuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IHNlbGVjdFNoZWV0ID0gKGl0ZW1zOiBFeHBlbnNlU2hlZXREZXRhaWxEdG9bXSwgc2hlZXRJZDogc3RyaW5nKTogRXhwZW5zZVNoZWV0RGV0YWlsRHRvIHwgbnVsbCA9PiB7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChzaGVldElkKS50b1VwcGVyQ2FzZSgpO1xyXG4gIGlmICghQXJyYXkuaXNBcnJheShpdGVtcykgfHwgaXRlbXMubGVuZ3RoIDwgMSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgaXRlbXMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5Py5Ib2phR2FzdG9zSWQgPz8gZW50cnk/LmhvamFHYXN0b3NJZCkudG9VcHBlckNhc2UoKSA9PT0gc2FmZVNoZWV0SWQpIHx8XHJcbiAgICBpdGVtc1swXSB8fFxyXG4gICAgbnVsbFxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBzZWxlY3RMaW5lID0gKHNoZWV0OiBFeHBlbnNlU2hlZXREZXRhaWxEdG8sIGxpbmVSZWNJZDogc3RyaW5nKTogRXhwZW5zZVNoZWV0TGluZSB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IHNhZmVMaW5lUmVjSWQgPSBzYWZlVGV4dChsaW5lUmVjSWQpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3Qgc291cmNlTGluZXMgPSBzaGVldC5MaW5lcyA/PyBzaGVldC5saW5lcyA/PyBbXTtcclxuICBjb25zdCBtYXBwZWRMaW5lcyA9IEFycmF5LmlzQXJyYXkoc291cmNlTGluZXMpID8gc291cmNlTGluZXMubWFwKChlbnRyeSkgPT4gbWFwRXhwZW5zZVNoZWV0TGluZShlbnRyeSkpIDogW107XHJcblxyXG4gIHJldHVybiBtYXBwZWRMaW5lcy5maW5kKChsaW5lKSA9PiBzYWZlVGV4dChsaW5lLmxpbmVSZWNJZCkudG9VcHBlckNhc2UoKSA9PT0gc2FmZUxpbmVSZWNJZCkgfHwgbnVsbDtcclxufTtcclxuXHJcbi8vIExvYWRzIHRoZSBleHBlbnNlLXNoZWV0IGxpbmUgdGhhdCBnaXZlcyBjb250ZXh0dWFsIGZpZWxkcyB0byBhIGxpbmtlZCB0aWNrZXQgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZSA9ICh7XHJcbiAgZW5hYmxlZCxcclxuICBzaGVldElkLFxyXG4gIGxpbmVSZWNJZCxcclxuICBvbkZvcmJpZGRlbixcclxufTogVXNlRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZUFyZ3MpID0+IHtcclxuICBjb25zdCBbbGluZSwgc2V0TGluZV0gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRMaW5lIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW29yaWdpbmFsUHJvamVjdElkLCBzZXRPcmlnaW5hbFByb2plY3RJZF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRQcm9qZWN0SWQsIHNldERyYWZ0UHJvamVjdElkXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtvcmlnaW5hbFJlaW1idXJzYWJsZUV4cGVuc2UsIHNldE9yaWdpbmFsUmVpbWJ1cnNhYmxlRXhwZW5zZV0gPSB1c2VTdGF0ZShERUZBVUxUX0xJTkVfUkVJTUJVUlNBQkxFX0VYUEVOU0UpO1xyXG4gIGNvbnN0IFtkcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UsIHNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZV0gPSB1c2VTdGF0ZShERUZBVUxUX0xJTkVfUkVJTUJVUlNBQkxFX0VYUEVOU0UpO1xyXG4gIGNvbnN0IFtsb2NhbEN1cnJlbmN5Q29kZSwgc2V0TG9jYWxDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIGNvbnN0IHJlbG9hZExpbmUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHNoZWV0SWQpO1xyXG4gICAgY29uc3Qgc2FmZUxpbmVSZWNJZCA9IHNhZmVUZXh0KGxpbmVSZWNJZCk7XHJcbiAgICBpZiAoIWVuYWJsZWQgfHwgIXNhZmVTaGVldElkKSB7XHJcbiAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgIHNldE9yaWdpbmFsUHJvamVjdElkKFwiXCIpO1xyXG4gICAgICBzZXREcmFmdFByb2plY3RJZChcIlwiKTtcclxuICAgICAgc2V0T3JpZ2luYWxSZWltYnVyc2FibGVFeHBlbnNlKERFRkFVTFRfTElORV9SRUlNQlVSU0FCTEVfRVhQRU5TRSk7XHJcbiAgICAgIHNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZShERUZBVUxUX0xJTkVfUkVJTUJVUlNBQkxFX0VYUEVOU0UpO1xyXG4gICAgICBzZXRMb2NhbEN1cnJlbmN5Q29kZShcIlwiKTtcclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SXNMb2FkaW5nKHRydWUpO1xyXG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwoc2FmZVNoZWV0SWQsIHtcclxuICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICBzZXRPcmlnaW5hbFByb2plY3RJZChcIlwiKTtcclxuICAgICAgICBzZXREcmFmdFByb2plY3RJZChcIlwiKTtcclxuICAgICAgICBzZXRPcmlnaW5hbFJlaW1idXJzYWJsZUV4cGVuc2UoREVGQVVMVF9MSU5FX1JFSU1CVVJTQUJMRV9FWFBFTlNFKTtcclxuICAgICAgICBzZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UoREVGQVVMVF9MSU5FX1JFSU1CVVJTQUJMRV9FWFBFTlNFKTtcclxuICAgICAgICBzZXRMb2NhbEN1cnJlbmN5Q29kZShcIlwiKTtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHNoZWV0ID0gc2VsZWN0U2hlZXQocmVzcG9uc2U/Lkl0ZW1zIHx8IFtdLCBzYWZlU2hlZXRJZCk7XHJcbiAgICAgIGNvbnN0IHNoZWV0TG9jYWxDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChzaGVldD8uQ3VycmVuY3lDb2RlID8/IHNoZWV0Py5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkTGluZSA9IHNoZWV0ICYmIHNhZmVMaW5lUmVjSWQgPyBzZWxlY3RMaW5lKHNoZWV0LCBzYWZlTGluZVJlY0lkKSA6IG51bGw7XHJcbiAgICAgIGlmICghc2FmZUxpbmVSZWNJZCkge1xyXG4gICAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgICAgc2V0T3JpZ2luYWxQcm9qZWN0SWQoXCJcIik7XHJcbiAgICAgICAgc2V0RHJhZnRQcm9qZWN0SWQoXCJcIik7XHJcbiAgICAgICAgc2V0T3JpZ2luYWxSZWltYnVyc2FibGVFeHBlbnNlKERFRkFVTFRfTElORV9SRUlNQlVSU0FCTEVfRVhQRU5TRSk7XHJcbiAgICAgICAgc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlKERFRkFVTFRfTElORV9SRUlNQlVSU0FCTEVfRVhQRU5TRSk7XHJcbiAgICAgICAgc2V0TG9jYWxDdXJyZW5jeUNvZGUoc2hlZXRMb2NhbEN1cnJlbmN5Q29kZSk7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFzZWxlY3RlZExpbmUpIHtcclxuICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgIHNldE9yaWdpbmFsUHJvamVjdElkKFwiXCIpO1xyXG4gICAgICAgIHNldERyYWZ0UHJvamVjdElkKFwiXCIpO1xyXG4gICAgICAgIHNldE9yaWdpbmFsUmVpbWJ1cnNhYmxlRXhwZW5zZShERUZBVUxUX0xJTkVfUkVJTUJVUlNBQkxFX0VYUEVOU0UpO1xyXG4gICAgICAgIHNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZShERUZBVUxUX0xJTkVfUkVJTUJVUlNBQkxFX0VYUEVOU0UpO1xyXG4gICAgICAgIHNldExvY2FsQ3VycmVuY3lDb2RlKHNoZWV0TG9jYWxDdXJyZW5jeUNvZGUpO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcHJvamVjdElkID0gc2FmZVRleHQoc2VsZWN0ZWRMaW5lLnByb2pJZCk7XHJcbiAgICAgIGNvbnN0IHJlaW1idXJzYWJsZUV4cGVuc2UgPSBub3JtYWxpemVFeHBlbnNlTGluZVJlaW1idXJzYWJsZUV4cGVuc2Uoc2VsZWN0ZWRMaW5lLnJlaW1idXJzYWJsZUV4cGVuc2UpO1xyXG4gICAgICBzZXRMaW5lKHNlbGVjdGVkTGluZSk7XHJcbiAgICAgIHNldE9yaWdpbmFsUHJvamVjdElkKHByb2plY3RJZCk7XHJcbiAgICAgIHNldERyYWZ0UHJvamVjdElkKHByb2plY3RJZCk7XHJcbiAgICAgIHNldE9yaWdpbmFsUmVpbWJ1cnNhYmxlRXhwZW5zZShyZWltYnVyc2FibGVFeHBlbnNlKTtcclxuICAgICAgc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlKHJlaW1idXJzYWJsZUV4cGVuc2UpO1xyXG4gICAgICBzZXRMb2NhbEN1cnJlbmN5Q29kZShzaGVldExvY2FsQ3VycmVuY3lDb2RlKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgc2V0T3JpZ2luYWxQcm9qZWN0SWQoXCJcIik7XHJcbiAgICAgIHNldERyYWZ0UHJvamVjdElkKFwiXCIpO1xyXG4gICAgICBzZXRPcmlnaW5hbFJlaW1idXJzYWJsZUV4cGVuc2UoREVGQVVMVF9MSU5FX1JFSU1CVVJTQUJMRV9FWFBFTlNFKTtcclxuICAgICAgc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlKERFRkFVTFRfTElORV9SRUlNQlVSU0FCTEVfRVhQRU5TRSk7XHJcbiAgICAgIHNldExvY2FsQ3VycmVuY3lDb2RlKFwiXCIpO1xyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0IGRldGFpbC5cIikpO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbZW5hYmxlZCwgbGluZVJlY0lkLCBvbkZvcmJpZGRlbiwgc2hlZXRJZF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgdm9pZCByZWxvYWRMaW5lKCk7XHJcbiAgfSwgW3JlbG9hZExpbmVdKTtcclxuXHJcbiAgY29uc3QgcHJvamVjdElkQ2hhbmdlZCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBzYWZlVGV4dChkcmFmdFByb2plY3RJZCkgIT09IHNhZmVUZXh0KG9yaWdpbmFsUHJvamVjdElkKSxcclxuICAgIFtkcmFmdFByb2plY3RJZCwgb3JpZ2luYWxQcm9qZWN0SWRdXHJcbiAgKTtcclxuICBjb25zdCByZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlZCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBkcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UgIT09IG9yaWdpbmFsUmVpbWJ1cnNhYmxlRXhwZW5zZSxcclxuICAgIFtkcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UsIG9yaWdpbmFsUmVpbWJ1cnNhYmxlRXhwZW5zZV1cclxuICApO1xyXG4gIGNvbnN0IHJlc2V0RHJhZnRQcm9qZWN0SWQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXREcmFmdFByb2plY3RJZChvcmlnaW5hbFByb2plY3RJZCk7XHJcbiAgfSwgW29yaWdpbmFsUHJvamVjdElkXSk7XHJcbiAgY29uc3QgcmVzZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2Uob3JpZ2luYWxSZWltYnVyc2FibGVFeHBlbnNlKTtcclxuICB9LCBbb3JpZ2luYWxSZWltYnVyc2FibGVFeHBlbnNlXSk7XHJcbiAgY29uc3QgYWNjZXB0RHJhZnRQcm9qZWN0SWQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBzYWZlUHJvamVjdElkID0gc2FmZVRleHQoZHJhZnRQcm9qZWN0SWQpO1xyXG4gICAgc2V0T3JpZ2luYWxQcm9qZWN0SWQoc2FmZVByb2plY3RJZCk7XHJcbiAgICBzZXREcmFmdFByb2plY3RJZChzYWZlUHJvamVjdElkKTtcclxuICB9LCBbZHJhZnRQcm9qZWN0SWRdKTtcclxuICBjb25zdCBhY2NlcHREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBzYWZlUmVpbWJ1cnNhYmxlRXhwZW5zZSA9IG5vcm1hbGl6ZUV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZShkcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UpO1xyXG4gICAgc2V0T3JpZ2luYWxSZWltYnVyc2FibGVFeHBlbnNlKHNhZmVSZWltYnVyc2FibGVFeHBlbnNlKTtcclxuICAgIHNldERyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZShzYWZlUmVpbWJ1cnNhYmxlRXhwZW5zZSk7XHJcbiAgfSwgW2RyYWZ0UmVpbWJ1cnNhYmxlRXhwZW5zZV0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbGluZSxcclxuICAgIGxvY2FsQ3VycmVuY3lDb2RlLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgb3JpZ2luYWxQcm9qZWN0SWQsXHJcbiAgICBkcmFmdFByb2plY3RJZCxcclxuICAgIHByb2plY3RJZENoYW5nZWQsXHJcbiAgICBvcmlnaW5hbFJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbiAgICBkcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbiAgICByZWltYnVyc2FibGVFeHBlbnNlQ2hhbmdlZCxcclxuICAgIHNldERyYWZ0UHJvamVjdElkLFxyXG4gICAgc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgcmVzZXREcmFmdFByb2plY3RJZCxcclxuICAgIHJlc2V0RHJhZnRSZWltYnVyc2FibGVFeHBlbnNlLFxyXG4gICAgYWNjZXB0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICBhY2NlcHREcmFmdFJlaW1idXJzYWJsZUV4cGVuc2UsXHJcbiAgICByZWxvYWRMaW5lLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSB9IGZyb20gXCIuLi91c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwsXHJcbiAgYnVpbGRFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVXJsLFxyXG4gIGJ1aWxkRXhwZW5zZVRpY2tldExpbmtVcmwsXHJcbiAgdHlwZSBFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgdG9FeHBlbnNlSXNvRGF0ZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxCYWNrTmF2aWdhdGlvbkFyZ3MgPSB7XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgZGV0YWlsT3JpZ2luOiBzdHJpbmc7XHJcbiAgaGVhZGVyVHJhbnNEYXRlOiB1bmtub3duO1xyXG4gIGNvbnRleHRMaW5lUmVjSWQ/OiBzdHJpbmc7XHJcbiAgdGlja2V0UmV0dXJuQ29udGV4dD86IEV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0IHwgbnVsbDtcclxuICByZWFkQ2FjaGVkU3RhdGU6ICgpID0+IEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUgfCBudWxsO1xyXG4gIHNhdmVDYWNoZWRTdGF0ZTogKHN0YXRlOiBFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gS2VlcHMgbmF0aXZlIGJhY2sgbmF2aWdhdGlvbiBhbGlnbmVkIHdpdGggdGhlIHRpY2tldCBlbnRyeSBwb2ludCBhbmQgcHJlc2VydmVzIGNhY2hlZCBsaW5rLW1vZGUgc3RhdGUuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb24gPSAoe1xyXG4gIGZpbGVJZCxcclxuICBkZXRhaWxPcmlnaW4sXHJcbiAgaGVhZGVyVHJhbnNEYXRlLFxyXG4gIGNvbnRleHRMaW5lUmVjSWQsXHJcbiAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxuICByZWFkQ2FjaGVkU3RhdGUsXHJcbiAgc2F2ZUNhY2hlZFN0YXRlLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb25BcmdzKSA9PiB7XHJcbiAgY29uc3Qgc2hvdWxkUmV0dXJuVG9UaWNrZXRMaXN0ID0gdGlja2V0UmV0dXJuQ29udGV4dD8ub3JpZ2luID09PSBcInNoZWV0LWxpbmtcIiB8fCAhdGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZDtcclxuXHJcbiAgY29uc3QgbmF0aXZlQmFja1VybCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgaWYgKHRpY2tldFJldHVybkNvbnRleHQ/Lm9yaWdpbiA9PT0gXCJzaGVldC1saW5rXCIgJiYgdGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkKSB7XHJcbiAgICAgIHJldHVybiBidWlsZEV4cGVuc2VUaWNrZXRMaW5rVXJsKHRpY2tldFJldHVybkNvbnRleHQuc2hlZXRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRpY2tldFJldHVybkNvbnRleHQ/Lm9yaWdpbiA9PT0gXCJleHBlbnNlLWxpbmVcIiAmJiB0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0SWQpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkRXhwZW5zZVNoZWV0TGluZURldGFpbFVybCh0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0SWQsIHRpY2tldFJldHVybkNvbnRleHQuc2hlZXRMaW5lUmVjSWQgfHwgY29udGV4dExpbmVSZWNJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsKHRpY2tldFJldHVybkNvbnRleHQuc2hlZXRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRldGFpbE9yaWdpbiA9PT0gXCJ0aWNrZXQtY3JlYXRlXCIpIHtcclxuICAgICAgY29uc3QgdGlja2V0RGF0ZSA9IHRvRXhwZW5zZUlzb0RhdGUoaGVhZGVyVHJhbnNEYXRlKSB8fCB0b0V4cGVuc2VJc29EYXRlKG5ldyBEYXRlKCkpO1xyXG4gICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICAgIHRpY2tldEZpbGVJZDogZmlsZUlkLFxyXG4gICAgICAgIHRpY2tldERhdGUsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGAvR2FzdG9zL1RpY2tldHM/JHtxdWVyeS50b1N0cmluZygpfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFwiL0dhc3Rvcy9UaWNrZXRzXCI7XHJcbiAgfSwgW2NvbnRleHRMaW5lUmVjSWQsIGRldGFpbE9yaWdpbiwgZmlsZUlkLCBoZWFkZXJUcmFuc0RhdGUsIHRpY2tldFJldHVybkNvbnRleHRdKTtcclxuXHJcbiAgY29uc3QgcmVhcm1FeHBlbnNlVGlja2V0c1JldHVyblN0YXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgY2FjaGVkU3RhdGUgPSByZWFkQ2FjaGVkU3RhdGUoKTtcclxuICAgIGlmICghY2FjaGVkU3RhdGUpIHJldHVybjtcclxuICAgIHNhdmVDYWNoZWRTdGF0ZShjYWNoZWRTdGF0ZSk7XHJcbiAgfSwgW3JlYWRDYWNoZWRTdGF0ZSwgc2F2ZUNhY2hlZFN0YXRlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEJhY2tCdG5cIik7XHJcbiAgICBpZiAoIWJhY2tCdXR0b24pIHJldHVybjtcclxuXHJcbiAgICBiYWNrQnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtYmFjay11cmxcIiwgbmF0aXZlQmFja1VybCk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBiYWNrQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtYmFjay11cmxcIik7XHJcbiAgICB9O1xyXG4gIH0sIFtmaWxlSWQsIG5hdGl2ZUJhY2tVcmxdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghZmlsZUlkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaGFuZGxlTmF0aXZlQmFjayA9IChldmVudDogUG9wU3RhdGVFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQ/LnN0YXRlICYmIGV2ZW50LnN0YXRlLmluZFRyYXAgPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGV4ZWN1dGVCYWNrTmF2aWdhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZiAoc2hvdWxkUmV0dXJuVG9UaWNrZXRMaXN0KSB7XHJcbiAgICAgICAgICByZWFybUV4cGVuc2VUaWNrZXRzUmV0dXJuU3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UobmF0aXZlQmFja1VybCk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbihleGVjdXRlQmFja05hdmlnYXRpb24pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgaGFuZGxlTmF0aXZlQmFjayk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGhhbmRsZU5hdGl2ZUJhY2spO1xyXG4gICAgfTtcclxuICB9LCBbZmlsZUlkLCBuYXRpdmVCYWNrVXJsLCByZWFybUV4cGVuc2VUaWNrZXRzUmV0dXJuU3RhdGUsIHNob3VsZFJldHVyblRvVGlja2V0TGlzdF0pO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldy50c1wiO1xyXG5pbXBvcnQgeyBoYXNFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3U291cmNlIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldFByZXZpZXdVdGlscy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsQXJncyA9IHtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XHJcbiAgaGVhZGVyVXJsRmlsZT86IHN0cmluZyB8IG51bGw7XHJcbn07XHJcblxyXG4vLyBDZW50cmFsaXplcyBzdGlja3ktcHJldmlldyBhdmFpbGFiaWxpdHkgYW5kIGltYWdlIGxvYWRpbmcgZm9yIHRpY2tldCBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsID0gKHtcclxuICBmaWxlSWQsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGRyYWZ0VXJsRmlsZSxcclxuICBoZWFkZXJVcmxGaWxlLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsQXJncykgPT4ge1xyXG4gIGNvbnN0IHByZXZpZXdTb3VyY2VVcmwgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KGlzRWRpdGluZyA/IGRyYWZ0VXJsRmlsZSA6IGhlYWRlclVybEZpbGUpLCBbZHJhZnRVcmxGaWxlLCBoZWFkZXJVcmxGaWxlLCBpc0VkaXRpbmddKTtcclxuICBjb25zdCBzaG93U3RpY2t5UHJldmlldyA9IHVzZU1lbW8oKCkgPT4gaGFzRXhwZW5zZVRpY2tldEltYWdlUHJldmlld1NvdXJjZShwcmV2aWV3U291cmNlVXJsKSwgW3ByZXZpZXdTb3VyY2VVcmxdKTtcclxuICBjb25zdCBwcmV2aWV3ID0gdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldyh7XHJcbiAgICBmaWxlSWQsXHJcbiAgICBzb3VyY2VVcmw6IHByZXZpZXdTb3VyY2VVcmwsXHJcbiAgICBlbmFibGVkOiBzaG93U3RpY2t5UHJldmlldyxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gICAgLi4ucHJldmlldyxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VUaWNrZXRUb3BiYXJCYWNrTG9ja0FyZ3MgPSB7XG4gIGxvY2tlZDogYm9vbGVhbjtcbiAgbWVzc2FnZT86IHN0cmluZztcbn07XG5cbi8vIExvY2tzIHRoZSBzaGFyZWQgdG9wYmFyIGJhY2sgYnV0dG9uIHdoaWxlIGEgbGlua2VkIHRpY2tldCBtdXN0IHN0YXkgaW4gdGhlIHJlY292ZXJ5IGZsb3cuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldFRvcGJhckJhY2tMb2NrID0gKHtcbiAgbG9ja2VkLFxuICBtZXNzYWdlLFxufTogVXNlRXhwZW5zZVRpY2tldFRvcGJhckJhY2tMb2NrQXJncyk6IHZvaWQgPT4ge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEJhY2tCdG5cIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xuICAgIGlmICghYmFja0J1dHRvbikgcmV0dXJuO1xuXG4gICAgY29uc3QgcHJldmlvdXNEaXNhYmxlZCA9IGJhY2tCdXR0b24uZGlzYWJsZWQ7XG4gICAgY29uc3QgcHJldmlvdXNBcmlhRGlzYWJsZWQgPSBiYWNrQnV0dG9uLmdldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIik7XG4gICAgY29uc3QgcHJldmlvdXNUaXRsZSA9IGJhY2tCdXR0b24uZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgY29uc3QgbG9ja01lc3NhZ2UgPSBzYWZlVGV4dChtZXNzYWdlKTtcblxuICAgIGlmIChsb2NrZWQpIHtcbiAgICAgIGJhY2tCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgYmFja0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICAgIGlmIChsb2NrTWVzc2FnZSkge1xuICAgICAgICBiYWNrQnV0dG9uLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIGxvY2tNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFwcmV2aW91c0Rpc2FibGVkKSB7XG4gICAgICBiYWNrQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICBiYWNrQnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgXCJmYWxzZVwiKTtcbiAgICAgIGlmIChwcmV2aW91c1RpdGxlID09PSBudWxsKSB7XG4gICAgICAgIGJhY2tCdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGJhY2tCdXR0b24uZGlzYWJsZWQgPSBwcmV2aW91c0Rpc2FibGVkO1xuICAgICAgaWYgKHByZXZpb3VzQXJpYURpc2FibGVkID09PSBudWxsKSB7XG4gICAgICAgIGJhY2tCdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJhY2tCdXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCBwcmV2aW91c0FyaWFEaXNhYmxlZCk7XG4gICAgICB9XG4gICAgICBpZiAocHJldmlvdXNUaXRsZSA9PT0gbnVsbCkge1xuICAgICAgICBiYWNrQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYmFja0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBwcmV2aW91c1RpdGxlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBbbG9ja2VkLCBtZXNzYWdlXSk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxpQkFBeUU7OztBQ0F6RSxtQkFBbUM7QUFxRW5DLElBQU0sNkJBQTZCLENBQUMsVUFBa0IsWUFBd0M7QUFDNUYsUUFBTSxTQUFTLE9BQU8sWUFBWSxFQUFFLEVBQUUsS0FBSyxLQUFLLE9BQU8sV0FBVyxFQUFFLEVBQUUsS0FBSztBQUMzRSxRQUFNLFFBQVEsT0FBTyxNQUFNLGlDQUFpQztBQUM1RCxNQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFHLFFBQU87QUFDaEMsU0FBTyxNQUFNLENBQUMsRUFBRSxZQUFZO0FBQzlCO0FBRUEsSUFBTSxrQkFBa0IsQ0FBQyxVQUE0QjtBQUNuRCxTQUFPLGlCQUFpQixpQkFBaUIsTUFBTSxXQUFXO0FBQzVEO0FBRUEsSUFBTSw2QkFBNkIsQ0FBQyxZQUE4QjtBQUNoRSxRQUFNLGFBQWEsT0FBTyxXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWTtBQUM1RCxNQUFJLENBQUMsV0FBWSxRQUFPO0FBRXhCLFNBQ0UsV0FBVyxTQUFTLGtCQUFrQixLQUN0QyxXQUFXLFNBQVMsaUJBQWlCLEtBQ3JDLFdBQVcsU0FBUyxpQkFBaUIsS0FDckMsV0FBVyxTQUFTLGVBQWU7QUFFdkM7QUFHTyxJQUFNLGtDQUFrQyxDQUFDO0FBQUEsRUFDOUM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxvQ0FBb0M7QUFBQSxFQUNwQztBQUFBLEVBQ0EsOENBQThDO0FBQUEsRUFDOUM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQTJDO0FBQ3pDLFFBQU0sd0NBQW9DLDBCQUFZLFlBQW9DO0FBQ3hGLFVBQU0sY0FBYyxTQUFTLG9CQUFvQjtBQUNqRCxRQUFJLENBQUMsYUFBYTtBQUNoQixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sZUFBZSxNQUFNLDhCQUE4QjtBQUFBLE1BQ3ZELFNBQVM7QUFBQSxNQUNUO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EseUJBQXlCO0FBQUEsSUFDM0IsQ0FBQztBQUNELFFBQUksQ0FBQyxhQUFhLFVBQVU7QUFDMUIsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLFVBQ0osU0FBUyxhQUFhLGNBQWMsS0FDcEMsS0FBSyx5Q0FBeUMsNkRBQTZEO0FBQzdHLGtCQUFjLE9BQU87QUFDckIsY0FBVSxPQUFPO0FBQ2pCLFdBQU87QUFBQSxFQUNULEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sc0JBQWtCO0FBQUEsSUFDdEIsT0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBLDZCQUE2QjtBQUFBLElBQy9CLE1BR3dCO0FBQ3RCLFVBQUksUUFBUSxDQUFDLFVBQVcsUUFBTztBQUMvQixVQUFJLENBQUMsZUFBZTtBQUNsQiw0QkFBb0I7QUFDcEIsZUFBTztBQUFBLE1BQ1Q7QUFFQSxZQUFNLHdCQUF3QixPQUFPLG9CQUFvQixFQUFFLEVBQUUsS0FBSztBQUNsRSxVQUFJLENBQUMsdUJBQXVCO0FBQzFCLGNBQU0sVUFBVSxLQUFLLGdEQUFnRCwwQkFBMEI7QUFDL0Ysc0JBQWMsT0FBTztBQUNyQixrQkFBVSxPQUFPO0FBQ2pCLGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxxQkFBcUIsT0FBTyxxQkFBcUIsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZO0FBQzlFLFVBQUksQ0FBQyxvQkFBb0I7QUFDdkIsY0FBTSxVQUFVLEtBQUssNkNBQTZDLHVCQUF1QjtBQUN6RixzQkFBYyxPQUFPO0FBQ3JCLGtCQUFVLE9BQU87QUFDakIsZUFBTztBQUFBLE1BQ1Q7QUFFQSxZQUFNLG9CQUFvQixrQkFBa0IsZ0JBQWdCO0FBQzVELFVBQUkscUJBQXFCLFFBQVEsb0JBQW9CLEdBQUc7QUFDdEQsY0FBTSxVQUFVLEtBQUssMENBQTBDLGtEQUFrRDtBQUNqSCxzQkFBYyxPQUFPO0FBQ3JCLGtCQUFVLE9BQU87QUFDakIsZUFBTztBQUFBLE1BQ1Q7QUFFQSxZQUFNLGtCQUFrQixrQkFBa0IsY0FBYztBQUN4RCxZQUFNLHFCQUFxQixrQkFBa0IsaUJBQWlCO0FBQzlELFlBQU0sMEJBQTBCLFNBQVMsaUJBQWlCLEVBQUUsWUFBWTtBQUN4RSxZQUFNLG9DQUFvQyw2QkFBNkIsb0JBQW9CLHVCQUF1QjtBQUNsSCxZQUFNLCtCQUNKLENBQUMscUNBQ0Esc0JBQXNCLFFBQVEscUJBQXFCLEtBQ25ELG1CQUFtQixRQUFRLGtCQUFrQjtBQUNoRCxVQUFJLENBQUMsOEJBQThCO0FBQ2pDLGNBQU0sVUFBVTtBQUFBLFVBQ2Q7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUNBLHNCQUFjLE9BQU87QUFDckIsa0JBQVUsT0FBTztBQUNqQixlQUFPO0FBQUEsTUFDVDtBQUVBLFlBQU0sa0JBQWtCLHVCQUF1QixnQkFBZ0IsRUFBRSxXQUFXLE1BQU0sQ0FBQztBQUNuRixVQUFJLG9CQUFvQixNQUFNO0FBQzVCLGNBQU0sVUFBVSxLQUFLLHVDQUF1Qyx1QkFBdUI7QUFDbkYsc0JBQWMsT0FBTztBQUNyQixrQkFBVSxPQUFPO0FBQ2pCLGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxlQUFlLE9BQU8sa0JBQWtCLEVBQUUsRUFBRSxLQUFLO0FBQ3ZELFlBQU0sc0JBQXNCLGVBQWUscUJBQXFCLFlBQVksSUFBSTtBQUNoRixVQUFJLGdCQUFnQixDQUFDLHFCQUFxQjtBQUN4QyxzQkFBYywrQkFBK0I7QUFDN0Msa0JBQVUsK0JBQStCO0FBQ3pDLGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxtQkFBbUIsTUFBTSxrQ0FBa0M7QUFDakUsVUFBSSxxQkFBcUIsTUFBTTtBQUM3QixlQUFPO0FBQUEsTUFDVDtBQUVBLFlBQU0sbUJBQW1CO0FBQUEsUUFDdkI7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQ0EsWUFBTSxzQkFBc0I7QUFBQSxRQUMxQjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUNBLFlBQU0sVUFBMkM7QUFBQSxRQUMvQyxhQUFhO0FBQUEsUUFDYixjQUFjO0FBQUEsUUFDZCxhQUFhLE9BQU8saUJBQWlCO0FBQUEsUUFDckMsV0FBVyxvQkFBb0I7QUFBQSxRQUMvQixVQUFVLHVCQUF1QjtBQUFBLFFBQ2pDLFdBQVcsdUJBQXVCO0FBQUEsUUFDbEMsWUFBWSx1QkFBdUI7QUFBQSxRQUNuQyxZQUFZLFNBQVMsZUFBZSxLQUFLO0FBQUEsUUFDekMsWUFBWSxPQUFPLG1CQUFtQixFQUFFLEVBQUUsS0FBSyxLQUFLO0FBQUEsUUFDcEQsU0FBUyxPQUFPLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxLQUFLO0FBQUEsUUFDOUMsVUFBVSxPQUFPLGlCQUFpQixFQUFFLEVBQUUsS0FBSyxLQUFLO0FBQUEsUUFDaEQsZUFBZSwyQkFBMkIsZUFBZSxZQUFZO0FBQUEsUUFDckUsV0FBVztBQUFBLE1BQ2I7QUFFQSxZQUFNLFNBQVMsTUFBTSx1QkFBdUI7QUFBQSxRQUMxQyxhQUFhLEtBQUssaUNBQWlDLDJCQUEyQjtBQUFBLFFBQzlFLHNCQUFzQixLQUFLLG9DQUFvQyxlQUFlO0FBQUEsUUFDOUU7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsUUFBUSxZQUFZO0FBQ2xCLGdCQUFNLFdBQVcsTUFBTSx5QkFBeUIsUUFBUSxPQUFPO0FBQy9ELGNBQUksQ0FBQyxTQUFTLFNBQVM7QUFDbkIsa0JBQU0sSUFBSSxNQUFNLFNBQVMsV0FBVyxLQUFLLHFDQUFxQyxnQkFBZ0IsQ0FBQztBQUFBLFVBQ25HO0FBRUEsY0FBSSxpQkFBaUIsa0JBQWtCO0FBQ3JDLGdCQUFJLDBCQUEwQjtBQUM5QixnQkFBSTtBQUNGLG9CQUFNLGNBQWM7QUFBQSxnQkFDbEI7QUFBQSxnQkFDQSxTQUFTO0FBQUEsZ0JBQ1QsV0FBVyxTQUFTLHNCQUFzQixLQUFLO0FBQUEsZ0JBQy9DLHNCQUFzQjtBQUFBLGdCQUN0QixtQkFBbUI7QUFBQSxnQkFDbkIsc0JBQXNCLHVCQUF1QjtBQUFBLGdCQUM3QyxHQUFJLG9DQUNBLEVBQUUsbUJBQW1CLFNBQVMsMEJBQTBCLEVBQUUsSUFDMUQsQ0FBQztBQUFBLGdCQUNMLEdBQUksOENBQ0EsRUFBRSw2QkFBNkIscUNBQXFDLElBQ3BFLENBQUM7QUFBQSxjQUNQO0FBQ0Esb0JBQU0saUNBQWlDLFdBQVc7QUFDbEQsK0NBQWlDO0FBQ2pDLHlDQUEyQjtBQUFBLFlBQzdCLFNBQVMsT0FBTztBQUNkLG9CQUFNLFVBQ0osaUJBQWlCLFFBQ2IsTUFBTSxVQUNOO0FBQUEsZ0JBQ0U7QUFBQSxnQkFDQTtBQUFBLGNBQ0Y7QUFDTiw4Q0FBZ0M7QUFBQSxnQkFDOUI7QUFBQSxnQkFDQSxTQUFTO0FBQUEsZ0JBQ1Q7QUFBQSxjQUNGLENBQUM7QUFDRCx5Q0FBMkIsT0FBTztBQUNsQyxrQkFBSSxDQUFDLDRCQUE0QjtBQUMvQixzQkFBTSxJQUFJLE1BQU0sT0FBTztBQUFBLGNBQ3pCO0FBQ0Esd0NBQTBCO0FBQUEsWUFDNUI7QUFDQSxnQkFBSSx5QkFBeUI7QUFDM0Isd0JBQVUsdUJBQXVCO0FBQ2pDLDJCQUFhLEtBQUs7QUFDbEIscUJBQU87QUFBQSxZQUNUO0FBQUEsVUFDRjtBQUVBLG9CQUFVLEtBQUssZ0NBQWdDLHVCQUF1QixDQUFDO0FBQ3ZFLHVCQUFhLEtBQUs7QUFDbEIsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRixDQUFDO0FBRUQsYUFBTyxPQUFPO0FBQUEsSUFDaEI7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxtQkFBZSwwQkFBWSxZQUFZO0FBQzNDLFdBQU8sZ0JBQWdCO0FBQUEsTUFDckIsZUFBZTtBQUFBLElBQ2pCLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxlQUFlLENBQUM7QUFFcEIsUUFBTSwrQkFBMkIsMEJBQVksWUFBWTtBQUd2RCxXQUFPLGdCQUFnQjtBQUFBLE1BQ3JCLGVBQ0UscUNBQ0EsK0NBQ0EsQ0FBQyxDQUFDLFNBQVMsb0JBQW9CO0FBQUEsTUFDakMsNEJBQTRCO0FBQUEsSUFDOUIsQ0FBQztBQUFBLEVBQ0gsR0FBRztBQUFBLElBQ0Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLHNDQUFrQywwQkFBWSxZQUE0RDtBQUM5RyxRQUFJLGdDQUFnQztBQUNsQyxhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sY0FBYyxTQUFTLG9CQUFvQjtBQUNqRCxRQUFJLENBQUMsYUFBYTtBQUNoQixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sV0FBVyxNQUFNLHdCQUF3QixhQUFhO0FBQUEsTUFDMUQseUJBQXlCO0FBQUEsSUFDM0IsQ0FBQztBQUNELFVBQU0sUUFBUSxNQUFNLFFBQVEsU0FBUyxLQUFLLElBQUksU0FBUyxRQUFRLENBQUM7QUFDaEUsVUFBTSxTQUFTLE1BQU0sS0FBSyxDQUFDLFVBQVUsU0FBUyxPQUFPLFVBQVUsUUFBUSxLQUFLO0FBQzVFLFVBQU0sUUFBUSxNQUFNLFFBQVEsUUFBUSxLQUFLLElBQUksT0FBTyxRQUFRLENBQUM7QUFDN0QsVUFBTSxlQUFlLE1BQU0sS0FBSyxDQUFDLFNBQVMsU0FBUyxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQzNFLFVBQU0sWUFBWSxTQUFTLGNBQWMsS0FBSztBQUU5QyxRQUFJLENBQUMsV0FBVztBQUNkLGFBQU87QUFBQSxJQUNUO0FBRUEsV0FBTztBQUFBLE1BQ0wsU0FBUztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsRUFDRixHQUFHLENBQUMsZ0NBQWdDLFFBQVEsb0JBQW9CLENBQUM7QUFFakUsUUFBTSxtQkFBZSwwQkFBWSxZQUFZO0FBQzNDLFFBQUksS0FBTSxRQUFPO0FBQ2pCLFFBQUksQ0FBQyxpQkFBaUI7QUFDcEIsMEJBQW9CO0FBQ3BCLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxtQkFBbUIsTUFBTSxrQ0FBa0M7QUFDakUsUUFBSSxxQkFBcUIsTUFBTTtBQUM3QixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sU0FBUyxNQUFNLHVCQUF1QjtBQUFBLE1BQzFDLGFBQWEsS0FBSyxpQ0FBaUMsMkJBQTJCO0FBQUEsTUFDOUUsc0JBQXNCLEtBQUssb0NBQW9DLGVBQWU7QUFBQSxNQUM5RTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxRQUFRLFlBQVk7QUFDbEIsY0FBTSxvQkFBb0IsTUFBTSxnQ0FBZ0M7QUFFaEUsWUFBSTtBQUNGLGdCQUFNLHFCQUFxQixNQUFNLDZCQUE2QixRQUFRO0FBQUEsWUFDcEUseUJBQXlCO0FBQUEsVUFDM0IsQ0FBQztBQUNELGNBQUksQ0FBQyxtQkFBbUIsV0FBVyxDQUFDLDJCQUEyQixtQkFBbUIsT0FBTyxHQUFHO0FBQzFGLGtCQUFNLElBQUksTUFBTSxtQkFBbUIsV0FBVyxLQUFLLHFDQUFxQyxnQkFBZ0IsQ0FBQztBQUFBLFVBQzNHO0FBQUEsUUFDRixTQUFTLE9BQU87QUFDZCxjQUFJLENBQUMsZ0JBQWdCLEtBQUssR0FBRztBQUMzQixrQkFBTTtBQUFBLFVBQ1I7QUFBQSxRQUNGO0FBRUEsY0FBTSxXQUFXLE1BQU0seUJBQXlCLE1BQU07QUFDdEQsWUFBSSxDQUFDLFNBQVMsU0FBUztBQUNyQixnQkFBTSxJQUFJLE1BQU0sU0FBUyxXQUFXLEtBQUsscUNBQXFDLGdCQUFnQixDQUFDO0FBQUEsUUFDakc7QUFFQSxZQUFJLG1CQUFtQjtBQUNyQixjQUFJO0FBQ0Ysa0JBQU0scUJBQXFCLE1BQU07QUFBQSxjQUMvQixrQkFBa0I7QUFBQSxjQUNsQixrQkFBa0I7QUFBQSxjQUNsQjtBQUFBLGdCQUNFLHlCQUF5QjtBQUFBLGNBQzNCO0FBQUEsWUFDRjtBQUVBLGdCQUFJLENBQUMsbUJBQW1CLFNBQVM7QUFDL0Isb0JBQU0sSUFBSSxNQUFNLG1CQUFtQixXQUFXLEtBQUsscUNBQXFDLGdCQUFnQixDQUFDO0FBQUEsWUFDM0c7QUFBQSxVQUNGLFNBQVMsT0FBTztBQUVkLGdCQUFJLENBQUMsZ0JBQWdCLEtBQUssR0FBRztBQUMzQixvQkFBTTtBQUFBLFlBQ1I7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUVBLGtCQUFVLEtBQUssZ0NBQWdDLHVCQUF1QixDQUFDO0FBQ3ZFLFlBQUksa0JBQWtCO0FBQ3BCLDJDQUFpQztBQUNqQyxxQ0FBMkI7QUFBQSxRQUM3QjtBQUNBLGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRixDQUFDO0FBRUQsV0FBTyxPQUFPO0FBQUEsRUFDaEIsR0FBRztBQUFBLElBQ0Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBQ3pkTyxJQUFNLHNDQUFzQyxDQUFDO0FBQUEsRUFDbEQ7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxhQUFhO0FBQUEsRUFDYixtQkFBbUI7QUFBQSxFQUNuQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQStDO0FBQzdDLDhCQUE0QjtBQUFBLElBQzFCLGVBQWU7QUFBQSxJQUNmLEtBQUs7QUFBQSxNQUNILFlBQVk7QUFBQSxNQUNaLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixXQUFXO0FBQUEsTUFDWCxhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsY0FBYztBQUFBLElBQ2Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFNBQVM7QUFBQSxJQUNULFdBQVc7QUFBQSxJQUNYO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxZQUFZO0FBQUEsSUFDWjtBQUFBLElBQ0Esa0JBQWtCLEtBQUssMENBQTBDLGNBQWM7QUFBQSxJQUMvRSxvQkFBb0IsS0FBSyx5Q0FBeUMsOEJBQThCO0FBQUEsSUFDaEcsaUJBQWlCLEtBQUssZUFBZSxNQUFNO0FBQUEsSUFDM0Msb0JBQW9CLEtBQUssd0JBQXdCLFFBQVE7QUFBQSxJQUN6RCxzQkFBc0IsS0FBSyx1QkFBdUIsa0NBQWtDO0FBQUEsSUFDcEYsbUJBQW1CLEtBQUssaUJBQWlCLFFBQVE7QUFBQSxJQUNqRDtBQUFBLElBQ0EsaUJBQWlCLG9CQUFvQixNQUFNLHFCQUFxQixpQkFBaUI7QUFBQSxJQUNqRjtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFDSDs7O0FDakdBLElBQUFDLGdCQUFxRTtBQXVFckUsSUFBTSxtQkFBbUIsT0FBbUI7QUFBQSxFQUMxQyxhQUFhO0FBQUEsRUFDYixXQUFXO0FBQUEsRUFDWCxjQUFjO0FBQUEsRUFDZCxhQUFhO0FBQUEsRUFDYixXQUFXO0FBQUEsRUFDWCxjQUFjO0FBQUEsRUFDZCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixZQUFZO0FBQUEsRUFDWixTQUFTO0FBQUEsRUFDVCxVQUFVO0FBQ1o7QUFFQSxJQUFNLGNBQWMsQ0FBQyxRQUF5QjtBQUM1QyxRQUFNLFNBQVMsaUJBQWlCLEdBQUc7QUFDbkMsU0FBTyxTQUFTLFVBQVUsTUFBTSxJQUFJO0FBQ3RDO0FBRUEsSUFBTSxjQUFjLENBQUMsUUFBeUI7QUFDNUMsUUFBTSxRQUFRLFNBQVMsR0FBRztBQUMxQixNQUFJLENBQUMsU0FBUyxVQUFVLElBQUssUUFBTztBQUVwQyxRQUFNLGVBQWUsT0FBTyxLQUFLO0FBQ2pDLE1BQUksT0FBTyxVQUFVLFlBQVksS0FBSyxnQkFBZ0IsS0FBSyxnQkFBZ0IsT0FBTztBQUNoRixVQUFNQyxTQUFRLEtBQUssTUFBTSxlQUFlLElBQUk7QUFDNUMsVUFBTSxVQUFVLEtBQUssTUFBTyxlQUFlLE9BQVEsRUFBRTtBQUNyRCxVQUFNLFVBQVUsZUFBZTtBQUMvQixXQUFPLENBQUNBLFFBQU8sU0FBUyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsT0FBTyxLQUFLLEVBQUUsU0FBUyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRztBQUFBLEVBQzFGO0FBRUEsUUFBTSxRQUFRLE1BQU0sTUFBTSxzQ0FBc0M7QUFDaEUsTUFBSSxDQUFDLE1BQU8sUUFBTztBQUVuQixRQUFNLFFBQVEsT0FBTyxTQUFTLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRTtBQUNoRCxNQUFJLENBQUMsT0FBTyxVQUFVLEtBQUssS0FBSyxRQUFRLEtBQUssUUFBUSxHQUFJLFFBQU87QUFFaEUsU0FBTyxHQUFHLE9BQU8sS0FBSyxFQUFFLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUk7QUFDMUU7QUFFQSxJQUFNLHdCQUF3QixDQUFDLFVBQTJCLFNBQVMsS0FBSyxFQUFFLFlBQVk7QUFFdEYsSUFBTSxpQkFBaUIsQ0FBQyxVQUFrQztBQUN4RCxRQUFNLFNBQVMsT0FBTyxLQUFLO0FBQzNCLFNBQU8sT0FBTyxTQUFTLE1BQU0sSUFBSSxTQUFTO0FBQzVDO0FBRUEsSUFBTSxzQkFBc0IsQ0FBQyxVQUFzRDtBQUNqRixTQUFPLHlCQUF5QixPQUFPO0FBQUEsSUFDckMsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsSUFDdkIsYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLEVBQ1osQ0FBQztBQUNIO0FBRUEsSUFBTSw2QkFBNkIsQ0FBQyxVQUFzRDtBQUN4RixTQUFPLHlCQUF5QixPQUFPO0FBQUEsSUFDckMsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsSUFDdkIsYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLEVBQ1osQ0FBQztBQUNIO0FBRUEsSUFBTSxzQ0FBc0MsQ0FDMUMsYUFDQSxjQUNBLGNBQ0EsMkJBQ0EsNEJBQ3dCO0FBQ3hCLE1BQUksMkJBQTJCLHVDQUF1QyxjQUFjLHlCQUF5QixHQUFHO0FBQzlHLFdBQU8sQ0FBQztBQUFBLEVBQ1Y7QUFFQSxRQUFNLG9CQUFvQix5QkFBeUIsV0FBVztBQUM5RCxRQUFNLHFCQUFxQjtBQUFBLElBQ3pCO0FBQUEsSUFDQTtBQUFBLElBQ0EseUJBQXlCLFlBQVk7QUFBQSxFQUN2QztBQUNBLFFBQU0sZ0JBQ0oscUJBQXFCLE9BQ2pCO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsSUFDQTtBQUVOLFNBQU8saUJBQWlCLE9BQU8sRUFBRSxXQUFXLG9CQUFvQixhQUFhLEVBQUUsSUFBSSxDQUFDO0FBQ3RGO0FBRUEsSUFBTSxzQ0FBc0MsQ0FDMUMsYUFDQSxXQUNBLGNBQ0EsMkJBQ0Esd0JBQ3dCO0FBQ3hCLFFBQU0sb0JBQW9CLHlCQUF5QixXQUFXO0FBQzlELFFBQU0sa0JBQWtCLHlCQUF5QixTQUFTO0FBQzFELFFBQU0sbUJBQ0oscUJBQXFCLFFBQVEsbUJBQW1CLE9BQzVDO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLElBQ0EsdUNBQXVDLGNBQWMseUJBQXlCLElBQzVFLDBDQUEwQyxjQUFjLDJCQUEyQixtQkFBbUIsSUFDeEc7QUFFTixTQUFPLG9CQUFvQixPQUFPLEVBQUUsY0FBYywyQkFBMkIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDO0FBQ3RHO0FBRUEsSUFBTSxtQ0FBbUMsQ0FDdkMsY0FDQSxtQkFDQSxpQkFDVztBQUNYLE1BQUksQ0FBQyw2QkFBNkIsY0FBYyxpQkFBaUIsR0FBRztBQUNsRSxXQUFPLDJCQUEyQixHQUFHO0FBQUEsRUFDdkM7QUFFQSxRQUFNLHFCQUFxQix5QkFBeUIsWUFBWTtBQUNoRSxNQUFJLHNCQUFzQixRQUFRLHFCQUFxQixHQUFHO0FBQ3hELFdBQU87QUFBQSxFQUNUO0FBRUEsU0FBTztBQUNUO0FBRUEsSUFBTSxvQ0FBb0MsQ0FDeEMsY0FDQSxtQkFDQSxhQUNBLGNBQ0EsNEJBQ3dCO0FBQ3hCLE1BQUksNkJBQTZCLGNBQWMsaUJBQWlCLEdBQUc7QUFDakUsV0FBTyxDQUFDO0FBQUEsRUFDVjtBQUVBLFFBQU0sb0JBQW9CLHlCQUF5QixXQUFXO0FBQzlELFNBQU87QUFBQSxJQUNMLGNBQWM7QUFBQSxNQUNaLDBDQUEwQyxjQUFjLG1CQUFtQixZQUFZO0FBQUEsSUFDekY7QUFBQSxJQUNBLEdBQUksQ0FBQywyQkFBMkIscUJBQXFCLE9BQU8sRUFBRSxXQUFXLG9CQUFvQixpQkFBaUIsRUFBRSxJQUFJLENBQUM7QUFBQSxFQUN2SDtBQUNGO0FBRUEsSUFBTSx3QkFBd0IsQ0FDNUIsUUFDQSxtQkFDQSxzQkFDZTtBQUNmLFFBQU0sOEJBQ0osc0JBQXNCLGlCQUFpQixLQUFLLHNCQUFzQixtQkFBbUIsWUFBWTtBQUNuRyxRQUFNLHlCQUNKLHNCQUFzQixRQUFRLFlBQVksS0FBSyxzQkFBc0IsbUJBQW1CLFlBQVksS0FBSztBQUMzRyxRQUFNLGNBQ0osZUFBZSxRQUFRLHVCQUF1QixRQUFRLFdBQVcsS0FDakUsZUFBZSxtQkFBbUIsTUFBTSxLQUN4QyxlQUFlLG1CQUFtQixLQUFLO0FBQ3pDLFFBQU0scUJBQXFCLGVBQWUsUUFBUSxZQUFZLG1CQUFtQixRQUFRO0FBQ3pGLFFBQU0sa0JBQWtCLGVBQWUsUUFBUSw0QkFBNEIsUUFBUSxhQUFhLG1CQUFtQixTQUFTO0FBQzVILFFBQU0sZUFBZSx1Q0FBdUMsd0JBQXdCLDJCQUEyQjtBQUMvRyxRQUFNLGVBQWUsZUFDakIsTUFDQSxzQkFBc0IsUUFBUSxxQkFBcUIsSUFDakQscUJBQ0E7QUFDTixRQUFNLHNCQUNKLGVBQWUsT0FDWDtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLElBQ0E7QUFDTixRQUFNLFlBQVksbUJBQW1CLHdCQUF3QixlQUFlLGNBQWM7QUFFMUYsU0FBTztBQUFBLElBQ0wsYUFBYSxTQUFTLFFBQVEsV0FBVztBQUFBLElBQ3pDLFdBQVcsUUFBUSxjQUFjLFFBQVEsUUFBUSxjQUFjLFNBQVksS0FBSyxPQUFPLE9BQU8sU0FBUztBQUFBLElBQ3ZHLGNBQWM7QUFBQSxJQUNkLGFBQWEsb0JBQW9CLFdBQVc7QUFBQSxJQUM1QyxXQUFXLG9CQUFvQixTQUFTO0FBQUEsSUFDeEMsY0FBYywyQkFBMkIsWUFBWTtBQUFBLElBQ3JELFdBQVcsWUFBWSxRQUFRLGNBQWMsUUFBUSxTQUFTO0FBQUEsSUFDOUQsWUFBWSxZQUFZLFFBQVEsVUFBVTtBQUFBLElBQzFDLFlBQVksU0FBUyxRQUFRLFVBQVU7QUFBQSxJQUN2QyxTQUFTLFNBQVMsUUFBUSxPQUFPO0FBQUEsSUFDakMsVUFBVSxTQUFTLFFBQVEsUUFBUTtBQUFBLEVBQ3JDO0FBQ0Y7QUFFQSxJQUFNLHFCQUFxQixPQUFvQjtBQUFBLEVBQzdDLE1BQU07QUFBQSxFQUNOLFFBQVE7QUFBQSxFQUNSLFdBQVc7QUFBQSxFQUNYLFlBQVk7QUFBQSxFQUNaLFVBQVU7QUFBQSxFQUNWLHlCQUF5QjtBQUFBLEVBQ3pCLE9BQU8saUJBQWlCO0FBQzFCO0FBRUEsSUFBTSwyQkFBMkIsQ0FBQyxhQUE4QjtBQUM5RCxTQUFPLHVCQUF1QixVQUFVLEVBQUUsV0FBVyxNQUFNLENBQUMsTUFBTTtBQUNwRTtBQUVBLElBQU0sZ0JBQWdCLENBQUMsT0FBb0IsV0FBc0M7QUFDL0UsVUFBUSxPQUFPLE1BQU07QUFBQSxJQUNuQixLQUFLO0FBQ0gsYUFBTztBQUFBLFFBQ0wsR0FBRztBQUFBLFFBQ0gseUJBQXlCO0FBQUEsUUFDekIsT0FBTyxzQkFBc0IsT0FBTyxRQUFRLE9BQU8sbUJBQW1CLE9BQU8saUJBQWlCO0FBQUEsTUFDaEc7QUFBQSxJQUNGLEtBQUs7QUFDSCxhQUFPO0FBQUEsUUFDTCxHQUFHO0FBQUEsUUFDSCxHQUFHLE9BQU87QUFBQSxNQUNaO0FBQUEsSUFDRixLQUFLO0FBQ0gsYUFBTztBQUFBLFFBQ0wsR0FBRztBQUFBLFFBQ0gsT0FBTztBQUFBLFVBQ0wsR0FBRyxNQUFNO0FBQUEsVUFDVCxDQUFDLE9BQU8sS0FBSyxHQUFHLE9BQU87QUFBQSxRQUN6QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLEtBQUs7QUFDSCxhQUFPO0FBQUEsUUFDTCxHQUFHO0FBQUEsUUFDSCx5QkFBeUIsT0FBTywyQkFBMkIsTUFBTTtBQUFBLFFBQ2pFLE9BQU87QUFBQSxVQUNMLEdBQUcsTUFBTTtBQUFBLFVBQ1QsR0FBRyxPQUFPO0FBQUEsUUFDWjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQ0UsYUFBTztBQUFBLEVBQ1g7QUFDRjtBQUVBLElBQU0sdUJBQXVCLENBQUssT0FBMEIsWUFBa0I7QUFDNUUsU0FBTyxPQUFPLFVBQVUsYUFBYyxNQUE4QixPQUFPLElBQUk7QUFDakY7QUFHTyxJQUFNLCtCQUErQixDQUFDO0FBQUEsRUFDM0M7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUF3QztBQUN0QyxRQUFNLENBQUMsT0FBTyxRQUFRLFFBQUksMEJBQVcsZUFBZSxRQUFXLGtCQUFrQjtBQUNqRixRQUFNLENBQUMsb0JBQW9CLHFCQUFxQixRQUFJLHdCQUFTLEtBQUs7QUFDbEUsUUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsUUFBSSx3QkFBUyxLQUFLO0FBQzlELFFBQU0sQ0FBQyxxQkFBcUIsc0JBQXNCLFFBQUksd0JBQVMsS0FBSztBQUNwRSxRQUFNLENBQUMsb0JBQW9CLHFCQUFxQixRQUFJLHdCQUFTLEtBQUs7QUFDbEUsUUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsUUFBSSx3QkFBUyxLQUFLO0FBQzlELFFBQU0sQ0FBQyxxQkFBcUIsc0JBQXNCLFFBQUksd0JBQVMsS0FBSztBQUNwRSxRQUFNLDBCQUFzQixzQkFBZ0MsSUFBSTtBQUNoRSxRQUFNLHdCQUFvQixzQkFBZ0MsSUFBSTtBQUM5RCxRQUFNLHVCQUFtQixzQkFBZ0MsSUFBSTtBQUM3RCxRQUFNLDBCQUFzQixzQkFBZ0MsSUFBSTtBQUNoRSxRQUFNLHdCQUFvQixzQkFBZ0MsSUFBSTtBQUM5RCxRQUFNLDJCQUF1QixzQkFBZ0MsSUFBSTtBQUNqRSxRQUFNLDZCQUNKLHNCQUFzQixpQkFBaUIsS0FBSyxzQkFBc0IsbUJBQW1CLFlBQVk7QUFFbkcsK0JBQVUsTUFBTTtBQUNkLFFBQUksTUFBTSxVQUFXO0FBQ3JCLGFBQVMsRUFBRSxNQUFNLHVCQUF1QixRQUFRLG1CQUFtQixtQkFBbUIsMkJBQTJCLENBQUM7QUFBQSxFQUNwSCxHQUFHLENBQUMsNEJBQTRCLFFBQVEsbUJBQW1CLE1BQU0sU0FBUyxDQUFDO0FBRTNFLCtCQUFVLE1BQU07QUFDZCxVQUFNLFVBQVUsS0FBSyxJQUFJLEdBQUcsS0FBSyxLQUFLLFlBQVksUUFBUSxDQUFDO0FBQzNELFFBQUksTUFBTSxXQUFXLFNBQVM7QUFDNUIsZUFBUyxFQUFFLE1BQU0sZUFBZSxPQUFPLEVBQUUsVUFBVSxRQUFRLEVBQUUsQ0FBQztBQUFBLElBQ2hFO0FBQUEsRUFDRixHQUFHLENBQUMsV0FBVyxVQUFVLE1BQU0sUUFBUSxDQUFDO0FBRXhDLCtCQUFVLE1BQU07QUFDZCxRQUFJLE1BQU0sVUFBVztBQUNyQiwwQkFBc0IsS0FBSztBQUMzQix3QkFBb0IsS0FBSztBQUN6QiwyQkFBdUIsS0FBSztBQUM1QiwwQkFBc0IsS0FBSztBQUMzQix3QkFBb0IsS0FBSztBQUN6QiwyQkFBdUIsS0FBSztBQUFBLEVBQzlCLEdBQUcsQ0FBQyxNQUFNLFNBQVMsQ0FBQztBQUVwQixRQUFNLGNBQVU7QUFBQSxJQUNkLENBQUMsVUFBVTtBQUNULGVBQVMsRUFBRSxNQUFNLGVBQWUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLE9BQU8sTUFBTSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQUEsSUFDNUY7QUFBQSxJQUNBLENBQUMsTUFBTSxJQUFJO0FBQUEsRUFDYjtBQUVBLFFBQU0sZ0JBQVk7QUFBQSxJQUNoQixDQUFDLFVBQVU7QUFDVCxlQUFTLEVBQUUsTUFBTSxlQUFlLE9BQU8sRUFBRSxRQUFRLHFCQUFxQixPQUFPLE1BQU0sTUFBTSxFQUFFLEVBQUUsQ0FBQztBQUFBLElBQ2hHO0FBQUEsSUFDQSxDQUFDLE1BQU0sTUFBTTtBQUFBLEVBQ2Y7QUFFQSxRQUFNLG1CQUFlO0FBQUEsSUFDbkIsQ0FBQyxVQUFVO0FBQ1QsZUFBUyxFQUFFLE1BQU0sZUFBZSxPQUFPLEVBQUUsV0FBVyxxQkFBcUIsT0FBTyxNQUFNLFNBQVMsRUFBRSxFQUFFLENBQUM7QUFBQSxJQUN0RztBQUFBLElBQ0EsQ0FBQyxNQUFNLFNBQVM7QUFBQSxFQUNsQjtBQUVBLFFBQU0sb0JBQWdCO0FBQUEsSUFDcEIsQ0FBQyxVQUFVO0FBQ1QsZUFBUyxFQUFFLE1BQU0sZUFBZSxPQUFPLEVBQUUsWUFBWSxxQkFBcUIsT0FBTyxNQUFNLFVBQVUsRUFBRSxFQUFFLENBQUM7QUFBQSxJQUN4RztBQUFBLElBQ0EsQ0FBQyxNQUFNLFVBQVU7QUFBQSxFQUNuQjtBQUVBLFFBQU0sa0JBQWM7QUFBQSxJQUNsQixDQUFDLFVBQVU7QUFDVCxlQUFTLEVBQUUsTUFBTSxlQUFlLE9BQU8sRUFBRSxVQUFVLHFCQUFxQixPQUFPLE1BQU0sUUFBUSxFQUFFLEVBQUUsQ0FBQztBQUFBLElBQ3BHO0FBQUEsSUFDQSxDQUFDLE1BQU0sUUFBUTtBQUFBLEVBQ2pCO0FBRUEsUUFBTSwwQkFBc0I7QUFBQSxJQUMxQixDQUFDLFVBQVU7QUFDVCw0QkFBc0IsS0FBSztBQUMzQixlQUFTO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxPQUFPLHFCQUFxQixPQUFPLE1BQU0sTUFBTSxXQUFXO0FBQUEsTUFDNUQsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLENBQUMsTUFBTSxNQUFNLFdBQVc7QUFBQSxFQUMxQjtBQUVBLFFBQU0sd0JBQW9CO0FBQUEsSUFDeEIsQ0FBQyxVQUFVO0FBQ1QsMEJBQW9CLEtBQUs7QUFDekIsZUFBUztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsT0FBTyxxQkFBcUIsT0FBTyxNQUFNLE1BQU0sU0FBUztBQUFBLE1BQzFELENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxDQUFDLE1BQU0sTUFBTSxTQUFTO0FBQUEsRUFDeEI7QUFFQSxRQUFNLDJCQUF1QjtBQUFBLElBQzNCLENBQUMsVUFBVTtBQUNULDZCQUF1QixLQUFLO0FBQzVCLDBCQUFvQixLQUFLO0FBQ3pCLDZCQUF1QixLQUFLO0FBQzVCLFlBQU0sbUJBQW1CLHNCQUFzQixxQkFBcUIsT0FBTyxNQUFNLE1BQU0sWUFBWSxDQUFDO0FBQ3BHLFlBQU0sWUFBaUM7QUFBQSxRQUNyQyxjQUFjO0FBQUEsUUFDZCxHQUFHO0FBQUEsVUFDRDtBQUFBLFVBQ0E7QUFBQSxVQUNBLE1BQU0sTUFBTTtBQUFBLFVBQ1osTUFBTSxNQUFNO0FBQUEsVUFDWjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQ0EsVUFBSSxDQUFDLFVBQVUsV0FBVztBQUN4QixlQUFPO0FBQUEsVUFDTDtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU0sTUFBTTtBQUFBLFlBQ1osTUFBTSxNQUFNO0FBQUEsWUFDWjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQ0EsZUFBUztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AseUJBQXlCO0FBQUEsTUFDM0IsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLENBQUMsNEJBQTRCLE1BQU0sTUFBTSxjQUFjLE1BQU0sTUFBTSxjQUFjLE1BQU0sTUFBTSxXQUFXO0FBQUEsRUFDMUc7QUFFQSxRQUFNLDBCQUFzQjtBQUFBLElBQzFCLENBQUMsVUFBVTtBQUNULDRCQUFzQixLQUFLO0FBQzNCLDBCQUFvQixLQUFLO0FBQ3pCLDZCQUF1QixLQUFLO0FBQzVCLFlBQU0sa0JBQWtCLHFCQUFxQixPQUFPLE1BQU0sTUFBTSxXQUFXO0FBQzNFLFlBQU0sd0JBQXdCO0FBQUEsUUFDNUIsTUFBTSxNQUFNO0FBQUEsUUFDWjtBQUFBLFFBQ0EsTUFBTSxNQUFNO0FBQUEsTUFDZDtBQUNBLFlBQU0sWUFBaUM7QUFBQSxRQUNyQyxhQUFhO0FBQUEsUUFDYixHQUFHO0FBQUEsVUFDRDtBQUFBLFVBQ0E7QUFBQSxVQUNBLE1BQU0sTUFBTTtBQUFBLFVBQ1o7QUFBQSxVQUNBLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUNBLGVBQVM7QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxNQUNULENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFBQSxNQUNBLE1BQU07QUFBQSxNQUNOLE1BQU0sTUFBTTtBQUFBLE1BQ1osTUFBTSxNQUFNO0FBQUEsTUFDWixNQUFNLE1BQU07QUFBQSxJQUNkO0FBQUEsRUFDRjtBQUVBLFFBQU0sd0JBQW9CO0FBQUEsSUFDeEIsQ0FBQyxVQUFVO0FBQ1QsMEJBQW9CLEtBQUs7QUFDekIsNkJBQXVCLEtBQUs7QUFDNUIsWUFBTSxnQkFBZ0IscUJBQXFCLE9BQU8sTUFBTSxNQUFNLFNBQVM7QUFDdkUsVUFBSSxrQ0FBa0MsZUFBZSxNQUFNLE1BQU0sU0FBUyxHQUFHO0FBQzNFLFlBQUksa0JBQWtCLE1BQU0sTUFBTSxXQUFXO0FBQzNDLG1CQUFTO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTCxXQUFXO0FBQUEsWUFDYjtBQUFBLFVBQ0YsQ0FBQztBQUFBLFFBQ0g7QUFDQTtBQUFBLE1BQ0Y7QUFFQSxlQUFTO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsVUFDTCxXQUFXO0FBQUEsVUFDWCxHQUFHO0FBQUEsWUFDRCxNQUFNLE1BQU07QUFBQSxZQUNaO0FBQUEsWUFDQSxNQUFNLE1BQU07QUFBQSxZQUNaO0FBQUEsWUFDQSxNQUFNLE1BQU07QUFBQSxVQUNkO0FBQUEsUUFDRjtBQUFBLFFBQ0EseUJBQXlCO0FBQUEsTUFDM0IsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLENBQUMsNEJBQTRCLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxjQUFjLE1BQU0sTUFBTSxjQUFjLE1BQU0sTUFBTSxXQUFXO0FBQUEsRUFDakk7QUFFQSxRQUFNLDJCQUF1QjtBQUFBLElBQzNCLENBQUMsVUFBVTtBQUNULDZCQUF1QixLQUFLO0FBQzVCLDBCQUFvQixLQUFLO0FBQ3pCLFlBQU0sbUJBQW1CLHFCQUFxQixPQUFPLE1BQU0sTUFBTSxZQUFZO0FBQzdFLGVBQVM7QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxVQUNMLGNBQWM7QUFBQSxRQUNoQjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLENBQUMsTUFBTSxNQUFNLFlBQVk7QUFBQSxFQUMzQjtBQUVBLFFBQU0sOEJBQTBCO0FBQUEsSUFDOUIsQ0FBQyxPQUFlLHlCQUFrQztBQUNoRCw2QkFBdUIsS0FBSztBQUM1QiwwQkFBb0IsS0FBSztBQUN6QixZQUFNLHdCQUF3Qix1QkFDMUIsc0JBQXNCLG9CQUFvQixJQUMxQyxNQUFNLE1BQU07QUFDaEIsWUFBTSxtQkFBbUI7QUFBQSxRQUN2QjtBQUFBLFVBQ0U7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQ0EsZUFBUztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFVBQ0wsY0FBYztBQUFBLFVBQ2QsR0FBRztBQUFBLFlBQ0QsTUFBTSxNQUFNO0FBQUEsWUFDWjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQSxNQUFNO0FBQUEsVUFDUjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxDQUFDLDRCQUE0QixNQUFNLHlCQUF5QixNQUFNLE1BQU0sY0FBYyxNQUFNLE1BQU0sV0FBVztBQUFBLEVBQy9HO0FBRUEsUUFBTSx1QkFBbUIsMkJBQVksTUFBTTtBQUN6QyxRQUFJLENBQUMsVUFBVSxVQUFXO0FBQzFCLFFBQUksZ0JBQWlCO0FBQ3JCLFFBQUksT0FBTyxXQUFXLEtBQUssQ0FBQyx1QkFBd0I7QUFDcEQsUUFBSSxDQUFDLGVBQWU7QUFDbEIsa0JBQVk7QUFDWjtBQUFBLElBQ0Y7QUFFQSx3QkFBb0IsS0FBSztBQUN6QiwyQkFBdUIsS0FBSztBQUM1QiwwQkFBc0IsS0FBSztBQUMzQix3QkFBb0IsS0FBSztBQUN6QiwyQkFBdUIsS0FBSztBQUM1QixhQUFTLEVBQUUsTUFBTSx1QkFBdUIsUUFBUSxtQkFBbUIsbUJBQW1CLDJCQUEyQixDQUFDO0FBQ2xILGFBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLFlBQVk7QUFBQSxRQUNaLFdBQVc7QUFBQSxRQUNYLFFBQVEsS0FBSyx1Q0FBdUMsaUJBQWlCO0FBQUEsTUFDdkU7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNILEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sdUJBQW1CLDJCQUFZLE1BQU07QUFDekMsUUFBSSxDQUFDLE1BQU0sVUFBVztBQUN0QixRQUFJLENBQUMsUUFBUTtBQUNYLGVBQVMsRUFBRSxNQUFNLGVBQWUsT0FBTyxFQUFFLFdBQVcsTUFBTSxFQUFFLENBQUM7QUFDN0Q7QUFBQSxJQUNGO0FBRUEsd0JBQW9CLEtBQUs7QUFDekIsMkJBQXVCLEtBQUs7QUFDNUIsMEJBQXNCLEtBQUs7QUFDM0Isd0JBQW9CLEtBQUs7QUFDekIsMkJBQXVCLEtBQUs7QUFDNUIsYUFBUyxFQUFFLE1BQU0sdUJBQXVCLFFBQVEsbUJBQW1CLG1CQUFtQiwyQkFBMkIsQ0FBQztBQUNsSCxhQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxXQUFXO0FBQUEsUUFDWCxZQUFZO0FBQUEsUUFDWixRQUFRLEtBQUssaUJBQWlCLFFBQVE7QUFBQSxNQUN4QztBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLDRCQUE0QixRQUFRLG1CQUFtQixNQUFNLFNBQVMsQ0FBQztBQUUzRSxRQUFNLHlCQUFxQiwyQkFBWSxNQUFNO0FBQzNDLFVBQU0sd0JBQXdCLE9BQU8sTUFBTSxNQUFNLGVBQWUsRUFBRSxFQUFFLEtBQUs7QUFDekUsVUFBTSx5QkFBeUIsT0FBTyxNQUFNLE1BQU0sZ0JBQWdCLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWTtBQUN6RixVQUFNLG9CQUFvQix5QkFBeUIsTUFBTSxNQUFNLFdBQVc7QUFDMUUsVUFBTSxrQkFBa0IseUJBQXlCLE1BQU0sTUFBTSxTQUFTO0FBQ3RFLFVBQU0scUJBQXFCLHlCQUF5QixNQUFNLE1BQU0sWUFBWTtBQUM1RSxVQUFNLHFCQUFxQixDQUFDLENBQUM7QUFDN0IsVUFBTSxtQkFBbUIseUJBQXlCLE1BQU0sTUFBTSxTQUFTO0FBQ3ZFLFVBQU0sa0JBQWtCLENBQUMsQ0FBQztBQUMxQixVQUFNLHFCQUFxQixxQkFBcUIsUUFBUSxxQkFBcUI7QUFDN0UsVUFBTSxvQ0FBb0MsNkJBQTZCLHdCQUF3QiwwQkFBMEI7QUFDekgsVUFBTSwrQkFDSixDQUFDLHFDQUNBLHNCQUFzQixRQUFRLHFCQUFxQixLQUNuRCxtQkFBbUIsUUFBUSxrQkFBa0I7QUFFaEQsMEJBQXNCLENBQUMsa0JBQWtCO0FBQ3pDLHdCQUFvQixDQUFDLGdCQUFnQjtBQUNyQywyQkFBdUIsQ0FBQyxlQUFlO0FBQ3ZDLDBCQUFzQixDQUFDLGtCQUFrQjtBQUN6QywyQkFBdUIsQ0FBQyw0QkFBNEI7QUFDcEQsd0JBQW9CLENBQUMsNEJBQTRCO0FBRWpELFFBQUksc0JBQXNCLG9CQUFvQixtQkFBbUIsc0JBQXNCLDhCQUE4QjtBQUNuSCxhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sVUFBVSxDQUFDLHFCQUNiLEtBQUssZ0RBQWdELDBCQUEwQixJQUMvRSxDQUFDLG1CQUNDLEtBQUssdUNBQXVDLHVCQUF1QixJQUNuRSxDQUFDLGtCQUNDLEtBQUssNkNBQTZDLHVCQUF1QixJQUN6RSxDQUFDLHFCQUNDLEtBQUssMENBQTBDLGtEQUFrRCxJQUNqRztBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUVWLGFBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLFlBQVk7QUFBQSxRQUNaLFFBQVE7QUFBQSxNQUNWO0FBQUEsSUFDRixDQUFDO0FBRUQsV0FBTyxzQkFBc0IsTUFBTTtBQUNqQyxVQUFJLENBQUMsb0JBQW9CO0FBQ3ZCLDRCQUFvQixTQUFTLE1BQU07QUFDbkM7QUFBQSxNQUNGO0FBRUEsVUFBSSxDQUFDLGtCQUFrQjtBQUNyQiwwQkFBa0IsU0FBUyxNQUFNO0FBQ2pDO0FBQUEsTUFDRjtBQUVBLFVBQUksQ0FBQyxpQkFBaUI7QUFDcEIseUJBQWlCLFNBQVMsTUFBTTtBQUNoQztBQUFBLE1BQ0Y7QUFFQSxVQUFJLENBQUMsb0JBQW9CO0FBQ3ZCLDRCQUFvQixTQUFTLE1BQU07QUFDbkM7QUFBQSxNQUNGO0FBRUEsVUFBSSxDQUFDLDhCQUE4QjtBQUNqQyw2QkFBcUIsU0FBUyxNQUFNO0FBQUEsTUFDdEM7QUFBQSxJQUNGLENBQUM7QUFFRCxXQUFPO0FBQUEsRUFDVCxHQUFHO0FBQUEsSUFDRDtBQUFBLElBQ0EsTUFBTSxNQUFNO0FBQUEsSUFDWixNQUFNLE1BQU07QUFBQSxJQUNaLE1BQU0sTUFBTTtBQUFBLElBQ1osTUFBTSxNQUFNO0FBQUEsSUFDWixNQUFNLE1BQU07QUFBQSxJQUNaLE1BQU0sTUFBTTtBQUFBLEVBQ2QsQ0FBQztBQUVELFNBQU87QUFBQSxJQUNMLE1BQU0sTUFBTTtBQUFBLElBQ1osUUFBUSxNQUFNO0FBQUEsSUFDZCxXQUFXLE1BQU07QUFBQSxJQUNqQixZQUFZLE1BQU07QUFBQSxJQUNsQixVQUFVLE1BQU07QUFBQSxJQUNoQixrQkFBa0IsTUFBTSxNQUFNO0FBQUEsSUFDOUI7QUFBQSxJQUNBO0FBQUEsSUFDQSxnQkFBZ0IsTUFBTSxNQUFNO0FBQUEsSUFDNUI7QUFBQSxJQUNBO0FBQUEsSUFDQSxtQkFBbUIsTUFBTSxNQUFNO0FBQUEsSUFDL0I7QUFBQSxJQUNBO0FBQUEsSUFDQSxrQkFBa0IsTUFBTSxNQUFNO0FBQUEsSUFDOUI7QUFBQSxJQUNBO0FBQUEsSUFDQSxnQkFBZ0IsTUFBTSxNQUFNO0FBQUEsSUFDNUI7QUFBQSxJQUNBO0FBQUEsSUFDQSxtQkFBbUIsTUFBTSxNQUFNO0FBQUEsSUFDL0I7QUFBQSxJQUNBO0FBQUEsSUFDQSxtQkFBbUI7QUFBQSxJQUNuQixnQkFBZ0IsTUFBTSxNQUFNO0FBQUEsSUFDNUIsaUJBQWlCLE1BQU0sTUFBTTtBQUFBLElBQzdCLGlCQUFpQixNQUFNLE1BQU07QUFBQSxJQUM3QixjQUFjLE1BQU0sTUFBTTtBQUFBLElBQzFCLGVBQWUsTUFBTSxNQUFNO0FBQUEsSUFDM0I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjs7O0FDM3dCQSxJQUFBQyxnQkFBbUM7QUFTNUIsSUFBTSxxQ0FBcUMsTUFBTTtBQUN0RCxRQUFNLGtCQUFjLHVCQUFRLE1BQU0sSUFBSSxnQkFBZ0IsT0FBTyxTQUFTLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDakYsUUFBTSxhQUFTLHVCQUFRLE1BQU0sU0FBUyxPQUFPLDBCQUEwQixHQUFHLENBQUMsQ0FBQztBQUM1RSxRQUFNLG1CQUFlLHVCQUFRLE1BQU0sU0FBUyxZQUFZLElBQUksTUFBTSxDQUFDLEVBQUUsWUFBWSxNQUFNLFFBQVEsQ0FBQyxXQUFXLENBQUM7QUFDNUcsUUFBTSxrQkFBYyx1QkFBUSxNQUFNLFNBQVMsWUFBWSxJQUFJLFFBQVEsQ0FBQyxFQUFFLFlBQVksR0FBRyxDQUFDLFdBQVcsQ0FBQztBQUNsRyxRQUFNLG1CQUFlLHVCQUFRLE1BQU0sU0FBUyxZQUFZLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7QUFDdEYsUUFBTSwwQkFBc0I7QUFBQSxJQUMxQixNQUFNLFNBQVMsWUFBWSxJQUFJLGdCQUFnQixLQUFLLFlBQVksSUFBSSxXQUFXLENBQUM7QUFBQSxJQUNoRixDQUFDLFdBQVc7QUFBQSxFQUNkO0FBQ0EsUUFBTSw0QkFBd0I7QUFBQSxJQUM1QixNQUNFLG9DQUFvQztBQUFBLE1BQ2xDO0FBQUEsTUFDQSxRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxnQkFBZ0I7QUFBQSxJQUNsQixDQUFDO0FBQUEsSUFDSCxDQUFDLFFBQVEsYUFBYSxjQUFjLG1CQUFtQjtBQUFBLEVBQ3pEO0FBRUEsK0JBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxzQkFBdUI7QUFDNUIsbUNBQStCLHFCQUFxQjtBQUFBLEVBQ3RELEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQztBQUUxQixhQUFPLHVCQUFRLE1BQU07QUFDbkIsVUFBTSxzQkFBc0Isa0NBQWtDLFFBQVEscUJBQXFCO0FBQzNGLFVBQU0sZUFBZSxxQkFBcUIsVUFBVTtBQUNwRCxVQUFNLGlCQUFpQixxQkFBcUIsV0FBVztBQUN2RCxVQUFNLG1CQUFtQixxQkFBcUIsa0JBQWtCO0FBQ2hFLFVBQU0sMkJBQTJCLGlCQUFpQjtBQUNsRCxVQUFNLG9CQUFvQixpQkFBaUIsa0JBQWtCLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ25GLFVBQU0sa0JBQWtCLGlCQUFpQixnQkFBZ0IsQ0FBQyxDQUFDO0FBRTNELFdBQU87QUFBQSxNQUNMO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGLEdBQUcsQ0FBQyxjQUFjLHVCQUF1QixRQUFRLGFBQWEsY0FBYyxtQkFBbUIsQ0FBQztBQUNsRzs7O0FDdkRBLElBQUFDLGdCQUF3QjtBQW9CeEIsSUFBTSwyQkFBMkIsQ0FBQyxRQUF5QjtBQUN6RCxRQUFNLFFBQVEsU0FBUyxHQUFHO0FBQzFCLE1BQUksQ0FBQyxTQUFTLFVBQVUsSUFBSyxRQUFPO0FBRXBDLFFBQU0sZUFBZSxPQUFPLEtBQUs7QUFDakMsTUFBSSxPQUFPLFVBQVUsWUFBWSxLQUFLLGdCQUFnQixLQUFLLGdCQUFnQixPQUFPO0FBQ2hGLFVBQU1DLFNBQVEsS0FBSyxNQUFNLGVBQWUsSUFBSTtBQUM1QyxVQUFNLFVBQVUsS0FBSyxNQUFPLGVBQWUsT0FBUSxFQUFFO0FBQ3JELFVBQU0sVUFBVSxlQUFlO0FBQy9CLFdBQU8sQ0FBQ0EsUUFBTyxTQUFTLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxPQUFPLEtBQUssRUFBRSxTQUFTLEdBQUcsR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHO0FBQUEsRUFDMUY7QUFFQSxRQUFNLFFBQVEsTUFBTSxNQUFNLHNDQUFzQztBQUNoRSxNQUFJLENBQUMsTUFBTyxRQUFPO0FBRW5CLFFBQU0sUUFBUSxPQUFPLFNBQVMsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFO0FBQ2hELE1BQUksQ0FBQyxPQUFPLFVBQVUsS0FBSyxLQUFLLFFBQVEsS0FBSyxRQUFRLEdBQUksUUFBTztBQUVoRSxTQUFPLEdBQUcsT0FBTyxLQUFLLEVBQUUsU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSTtBQUMxRTtBQUdPLElBQU0sZ0NBQWdDLENBQUM7QUFBQSxFQUM1QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBeUM7QUFDdkMsUUFBTSx1QkFBbUI7QUFBQSxJQUN2QixPQUFPO0FBQUEsTUFDTCxPQUFPLEtBQUssc0JBQXNCLE9BQU87QUFBQSxNQUN6QyxNQUFNLEtBQUsscUJBQXFCLFVBQVU7QUFBQSxNQUMxQyxNQUFNLEtBQUsscUJBQXFCLE1BQU07QUFBQSxNQUN0QyxNQUFNLEtBQUsscUJBQXFCLE1BQU07QUFBQSxJQUN4QztBQUFBLElBQ0EsQ0FBQztBQUFBLEVBQ0g7QUFFQSxRQUFNLHFCQUFpQjtBQUFBLElBQ3JCLE1BQU0sU0FBUyxZQUFZLGdCQUFnQixRQUFRLFFBQVEsS0FBSyxLQUFLLHdCQUF3QixRQUFRO0FBQUEsSUFDckcsQ0FBQyxlQUFlLFFBQVEsVUFBVSxTQUFTO0FBQUEsRUFDN0M7QUFFQSxRQUFNLGtCQUFjLHVCQUFRLE1BQU0sNEJBQTRCLFFBQVEsTUFBTSxHQUFHLENBQUMsUUFBUSxNQUFNLENBQUM7QUFFL0YsUUFBTSxxQkFBaUIsdUJBQVEsTUFBTTtBQUNuQyxVQUFNLG1CQUFtQixZQUFZLGlCQUFpQixRQUFRLGNBQWMsT0FBTyxLQUFLLE9BQU8sUUFBUSxhQUFhLEVBQUU7QUFDdEgsUUFBSSxDQUFDLGtCQUFrQjtBQUNyQixhQUFPLEtBQUssdUJBQXVCLEtBQUs7QUFBQSxJQUMxQztBQUNBLFdBQU8sa0JBQWtCLElBQUksT0FBTyxnQkFBZ0IsQ0FBQyxLQUFLLE9BQU8sZ0JBQWdCO0FBQUEsRUFDbkYsR0FBRyxDQUFDLGdCQUFnQixtQkFBbUIsUUFBUSxXQUFXLFNBQVMsQ0FBQztBQUVwRSxRQUFNLHNCQUFrQjtBQUFBLElBQ3RCLE1BQU07QUFDSixZQUFNLHNCQUFzQix5QkFBeUIsZ0JBQWdCO0FBQ3JFLGFBQU87QUFBQSxRQUNMLGFBQWEsdUJBQXVCLE9BQ2hDLHNCQUNBLFFBQVEsdUJBQXVCLFFBQVEsZUFBZTtBQUFBLFNBQ3pELFlBQVksb0JBQW9CLFFBQVEsaUJBQWlCLFFBQVE7QUFBQSxNQUNwRTtBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUMsbUJBQW1CLGtCQUFrQixRQUFRLGNBQWMsUUFBUSxhQUFhLFFBQVEscUJBQXFCLFNBQVM7QUFBQSxFQUN6SDtBQUVBLFFBQU0sb0JBQWdCO0FBQUEsSUFDcEIsTUFBTSx5QkFBeUIsWUFBWSxpQkFBaUIsUUFBUSxjQUFjLFFBQVEsV0FBVyxVQUFVLGlCQUFpQixRQUFRLE9BQU87QUFBQSxJQUMvSSxDQUFDLGdCQUFnQixRQUFRLFlBQVksUUFBUSxXQUFXLFNBQVM7QUFBQSxFQUNuRTtBQUVBLFFBQU0scUJBQWlCO0FBQUEsSUFDckIsTUFBTSx5QkFBeUIsWUFBWSxrQkFBa0IsUUFBUSxVQUFVO0FBQUEsSUFDL0UsQ0FBQyxpQkFBaUIsUUFBUSxZQUFZLFNBQVM7QUFBQSxFQUNqRDtBQUVBLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGOzs7QUM5R0EsSUFBQUMsZ0JBQTRCO0FBWXJCLElBQU0scUNBQXFDLENBQUM7QUFBQSxFQUNqRDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQThDO0FBQzVDLFFBQU0sRUFBRSxPQUFPLGFBQWEsY0FBYyxjQUFjLElBQUksaUJBQWlCO0FBQUEsSUFDM0Usb0JBQW9CLEtBQUssZUFBZSxJQUFJO0FBQUEsSUFDNUMsbUJBQW1CLEtBQUssY0FBYyxRQUFRO0FBQUEsRUFDaEQsQ0FBQztBQUVELFFBQU0seUJBQXFCLDJCQUFZLFlBQVk7QUFDakQsa0JBQWMsRUFBRTtBQUNoQixVQUFNLGNBQWM7QUFBQSxNQUNsQjtBQUFBLE1BQ0EsU0FBUyxDQUFDLFFBQVE7QUFDaEIsc0JBQWMsR0FBRztBQUNqQixrQkFBVSxHQUFHO0FBQUEsTUFDZjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLE1BQU0sZUFBZSxlQUFlLFNBQVMsQ0FBQztBQUVsRCxRQUFNLG1CQUFtQixLQUFLLGtCQUFrQixTQUFTO0FBQ3pELFFBQU0sa0JBQWtCLE1BQU0sY0FBYyxLQUFLLGNBQWMsUUFBUTtBQUN2RSxRQUFNLG1CQUFtQixPQUNyQixtQkFDQSxDQUFDLFFBQVEsYUFDUCxLQUFLLGFBQWEsSUFBSSxJQUN0QixNQUFNLGVBQWUsS0FBSyxlQUFlLElBQUk7QUFFbkQsUUFBTSwrQkFBMkIsMkJBQVksTUFBTTtBQUNqRCxRQUFJLENBQUMsUUFBUSxZQUFZO0FBQ3ZCLG1CQUFhO0FBQ2I7QUFBQSxJQUNGO0FBQ0EsU0FBSyxtQkFBbUI7QUFBQSxFQUMxQixHQUFHLENBQUMsTUFBTSxjQUFjLG9CQUFvQixVQUFVLENBQUM7QUFFdkQsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBQzNEQSxJQUFBQyxnQkFBNEI7QUEwQnJCLElBQU0scUNBQXFDLENBQUM7QUFBQSxFQUNqRDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBOEM7QUFDNUMsUUFBTSxpQ0FBNkIsMkJBQVksWUFBWTtBQUN6RCxRQUFJLENBQUMsV0FBVztBQUNkLGFBQU87QUFBQSxJQUNUO0FBRUEsUUFBSSxDQUFDLG1CQUFtQixHQUFHO0FBQ3pCLGFBQU87QUFBQSxJQUNUO0FBRUEsV0FBTyx5QkFBeUI7QUFBQSxFQUNsQyxHQUFHLENBQUMsb0JBQW9CLDBCQUEwQixTQUFTLENBQUM7QUFFNUQsUUFBTSxxQkFBaUI7QUFBQSxJQUNyQixPQUFPLGlCQUF5QjtBQUM5QixVQUFJLGdCQUFpQjtBQUNyQixVQUFJLEtBQU07QUFDVixZQUFNLFlBQVksU0FBUyxZQUFZO0FBQ3ZDLFVBQUksQ0FBQyxhQUFhLENBQUMsT0FBUTtBQUUzQixZQUFNLHVCQUF1QjtBQUM3QixVQUFJLHNCQUFzQjtBQUN4QixjQUFNLFdBQVcsTUFBTSwyQkFBMkI7QUFDbEQsWUFBSSxDQUFDLFVBQVU7QUFDYjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBRUEsWUFBTSxRQUFRLElBQUksZ0JBQWdCO0FBQUEsUUFDaEM7QUFBQSxRQUNBO0FBQUEsTUFDRixDQUFDO0FBQ0QsVUFBSSxzQkFBc0I7QUFDeEIsY0FBTSxJQUFJLFFBQVEsTUFBTTtBQUFBLE1BQzFCO0FBQ0EscUNBQStCLE9BQU8sbUJBQW1CO0FBRXpELDJCQUFxQiw0QkFBNEIsTUFBTSxTQUFTLENBQUMsSUFBSTtBQUFBLFFBQ25FLGlCQUFpQjtBQUFBLFFBQ2pCLGlCQUFpQix3QkFBd0I7QUFBQSxNQUMzQyxDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLDJCQUF1QiwyQkFBWSxZQUFZO0FBQ25ELFFBQUksZ0JBQWlCO0FBQ3JCLFFBQUksS0FBTTtBQUNWLFFBQUksQ0FBQyxPQUFRO0FBRWIsVUFBTSxXQUFXLE1BQU0sMkJBQTJCO0FBQ2xELFFBQUksQ0FBQyxVQUFVO0FBQ2I7QUFBQSxJQUNGO0FBRUEsVUFBTSxRQUFRLElBQUksZ0JBQWdCO0FBQUEsTUFDaEM7QUFBQSxNQUNBLE1BQU07QUFBQSxJQUNSLENBQUM7QUFDRCxtQ0FBK0IsT0FBTyxtQkFBbUI7QUFFekQseUJBQXFCLDRCQUE0QixNQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQUEsTUFDbkUsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCLGFBQWE7QUFBQSxJQUNoQyxDQUFDO0FBQUEsRUFDSCxHQUFHLENBQUMsTUFBTSxxQkFBcUIsUUFBUSxXQUFXLGlCQUFpQiw0QkFBNEIsbUJBQW1CLENBQUM7QUFFbkgsUUFBTSwyQkFBdUI7QUFBQSxJQUMzQixDQUFDLFdBQStCO0FBQzlCLFlBQU0sT0FBTztBQUNiLFVBQUksQ0FBQyxRQUFRLE9BQU8sS0FBSyxZQUFZLFdBQVksUUFBTztBQUN4RCxZQUFNLE9BQU8sS0FBSyxRQUFxQiwyQkFBMkI7QUFDbEUsVUFBSSxDQUFDLEtBQU0sUUFBTztBQUNsQixVQUFJLENBQUMsaUJBQWlCLFNBQVMsU0FBUyxJQUFJLEVBQUcsUUFBTztBQUN0RCxhQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsQ0FBQyxnQkFBZ0I7QUFBQSxFQUNuQjtBQUVBLFFBQU0sZUFBVywyQkFBWSxNQUFNO0FBQ2pDLFNBQUssWUFBWTtBQUFBLEVBQ25CLEdBQUcsQ0FBQyxXQUFXLENBQUM7QUFFaEIsUUFBTSw2QkFBeUIsMkJBQVksTUFBTTtBQUMvQyxRQUFJLGdCQUFpQjtBQUNyQixVQUFNLGNBQWMsU0FBUyxxQkFBcUIsV0FBVyx3QkFBd0IsY0FBYztBQUNuRyxRQUFJLENBQUMsWUFBYTtBQUVsQix5QkFBcUIsMkJBQTJCLFdBQVcsR0FBRztBQUFBLE1BQzVELGlCQUFpQjtBQUFBLElBQ25CLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxnQkFBZ0Isc0JBQXNCLFdBQVcsaUJBQWlCLG1CQUFtQixDQUFDO0FBRTFGLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjs7O0FDakdJO0FBdkJKLElBQU0sd0NBQXdDLENBQUM7QUFBQSxFQUM3QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFrRDtBQUNoRCxTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0Esb0JBQW1CO0FBQUEsTUFDbkI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQTtBQUFBLEVBQ0Y7QUFFSjtBQUVBLElBQU8sZ0RBQVE7OztBQzJDWCxJQUFBQyxzQkFBQTtBQTlHSixJQUFNLDJCQUEyQixDQUFDLFVBQTJCO0FBQzNELFFBQU0sYUFBYSxTQUFTLEtBQUssRUFBRSxZQUFZO0FBQy9DLE1BQUksQ0FBQyxXQUFZLFFBQU87QUFDeEIsTUFBSSxlQUFlLE9BQU8sZUFBZSxJQUFLLFFBQU87QUFDckQsTUFBSSxlQUFlLFNBQVMsZUFBZSxLQUFNLFFBQU87QUFDeEQsU0FBTztBQUNUO0FBaURBLElBQU0sZ0NBQWdDLENBQUM7QUFBQSxFQUNyQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLHFCQUFxQjtBQUFBLEVBQ3JCO0FBQ0YsTUFBMEM7QUFDeEMsUUFBTSxhQUFhLFNBQVMsWUFBWSxlQUFlLE9BQU8sT0FBTztBQUNyRSxRQUFNLGNBQWMsbUNBQW1DLFVBQVU7QUFDakUsUUFBTSx3QkFBd0IseUJBQXlCLE9BQU8sbUJBQW1CO0FBQ2pGLFFBQU0sU0FBUyxVQUFVLGlCQUFpQixRQUFRO0FBQ2xELFFBQU0sa0JBQ0osaUJBQ0EseUJBQXlCLE9BQU8sY0FBYyxPQUFPLFdBQVcsTUFBTSxLQUN0RTtBQUNGLFFBQU0sc0JBQXNCLHlCQUF5QixnQkFBZ0IsTUFBTSxLQUFLO0FBQ2hGLFFBQU0sZ0JBQWdCLFlBQ3BCO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxPQUFPLEtBQUssMkJBQTJCLFVBQVU7QUFBQSxNQUNqRCxTQUFTO0FBQUEsTUFDVCxPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixhQUFhLEtBQUssMkJBQTJCLFVBQVU7QUFBQSxNQUN2RCxVQUFVO0FBQUEsTUFDVixTQUFTO0FBQUEsTUFDVCxXQUFTO0FBQUEsTUFDVCxnQkFBZ0I7QUFBQSxNQUNoQixrQkFBa0I7QUFBQTtBQUFBLEVBQ3BCLElBRUE7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDLE9BQU8sS0FBSywyQkFBMkIsVUFBVTtBQUFBLE1BQ2pELE9BQU8sa0JBQWtCO0FBQUE7QUFBQSxFQUMzQjtBQUVGLFFBQU0sY0FDSjtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsT0FBTyxLQUFLLHdCQUF3QixRQUFRO0FBQUEsTUFDNUMsT0FBTyxlQUFlO0FBQUE7QUFBQSxFQUN4QjtBQUVGLFFBQU0sY0FDSjtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsT0FBTyxLQUFLLHdCQUF3QixZQUFZO0FBQUEsTUFDaEQsT0FBTyxPQUFPLFVBQVU7QUFBQTtBQUFBLEVBQzFCO0FBRUYsUUFBTSxvQkFBb0Isd0JBQ3hCO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxPQUFPLEtBQUsscUNBQXFDLG1CQUFtQjtBQUFBLE1BQ3BFLE9BQU8sT0FBTyx1QkFBdUI7QUFBQSxNQUNyQyxTQUFTO0FBQUE7QUFBQSxFQUNYLElBQ0U7QUFFSixTQUNFLDhDQUFDLGFBQVEsV0FBVSxrR0FDakI7QUFBQSxrREFBQyxTQUFJLFdBQVUseUNBQ1o7QUFBQSxrQkFDQyw4Q0FBQyxTQUFJLFdBQVUsNkJBQ2I7QUFBQSxxREFBQyxXQUFNLFdBQVUsNEJBQTRCLGVBQUssbUNBQW1DLGFBQWEsR0FBRTtBQUFBLFFBQ3BHO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxLQUFLO0FBQUEsWUFDTCxXQUFXLGVBQWUscUJBQXFCLDBFQUEwRSxFQUFFO0FBQUEsWUFDM0gsT0FBTztBQUFBLFlBQ1AsVUFBVSxDQUFDLFVBQVUseUJBQXlCLE1BQU0sT0FBTyxTQUFTLEVBQUU7QUFBQSxZQUN0RSxnQkFBYyxxQkFBcUIsU0FBUztBQUFBLFlBQzVDLGNBQVksS0FBSyxtQ0FBbUMsYUFBYTtBQUFBO0FBQUEsUUFDbkU7QUFBQSxTQUNGLElBRUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE9BQU8sS0FBSyxtQ0FBbUMsYUFBYTtBQUFBLFVBQzVELE9BQU8sT0FBTyxlQUFlO0FBQUEsVUFDN0IsV0FBUztBQUFBO0FBQUEsTUFDWDtBQUFBLE1BR0Y7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDO0FBQUEsVUFDQSxxQkFBcUIsWUFBWSxvQkFBb0IsU0FBUyxPQUFPLFlBQVk7QUFBQSxVQUNqRix3QkFBd0I7QUFBQSxVQUN4Qix5QkFBeUI7QUFBQSxVQUN6QjtBQUFBLFVBQ0EsY0FBYztBQUFBLFVBQ2Q7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsZ0JBQWdCLFlBQVksbUJBQW1CLG1CQUFtQjtBQUFBLFVBQ2xFLHVCQUF1QjtBQUFBLFVBQ3ZCLHdCQUF3QjtBQUFBLFVBQ3hCLHFCQUFxQjtBQUFBLFVBQ3JCLDRCQUE0QjtBQUFBLFVBQzVCLDZCQUE2QjtBQUFBLFVBQzdCLHlCQUF5QjtBQUFBLFVBQ3pCLHNCQUFzQjtBQUFBLFVBQ3RCLHNCQUFzQjtBQUFBLFVBQ3RCLHdCQUF3QjtBQUFBLFVBQ3hCLDZCQUE2QjtBQUFBO0FBQUEsTUFDL0I7QUFBQSxNQUVBLDhDQUFDLFNBQUksV0FBVSx3Q0FDYjtBQUFBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxPQUFPLEtBQUssNEJBQTRCLE1BQU07QUFBQSxZQUM5QyxPQUFPLFlBQVksc0JBQXNCO0FBQUE7QUFBQSxRQUMzQztBQUFBLFFBRUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLE9BQU8sS0FBSyw0QkFBNEIsTUFBTTtBQUFBLFlBQzlDLE9BQU8sWUFBWSxtQkFBbUIsa0JBQWtCLE1BQU0sa0JBQWtCO0FBQUE7QUFBQSxRQUNsRjtBQUFBLFNBQ0Y7QUFBQSxNQUVBLDhDQUFDLFNBQUksV0FBVSx3Q0FDWjtBQUFBO0FBQUEsUUFDQTtBQUFBLFNBQ0g7QUFBQSxNQUVDLG9CQUNDLDhDQUFDLFNBQUksV0FBVSx3Q0FDWjtBQUFBO0FBQUEsUUFDQTtBQUFBLFNBQ0gsSUFFQTtBQUFBLE1BR0Q7QUFBQSxPQUNIO0FBQUEsSUFFQyxlQUFlLENBQUMscUJBQ2YsNkNBQUMsU0FBSSxXQUFVLG9CQUNiO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxNQUFLO0FBQUEsUUFDTCxXQUFVO0FBQUEsUUFDVixTQUFTO0FBQUEsUUFFUixlQUFLLGlDQUFpQyxhQUFhO0FBQUE7QUFBQSxJQUN0RCxHQUNGLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFFQSxJQUFPLHdDQUFROzs7QUN2UGYsSUFBQUMsZ0JBQWtCO0FBcUNkLElBQUFDLHNCQUFBO0FBZEosSUFBTSxzQ0FBc0MsQ0FBQztBQUFBLEVBQzNDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxXQUFXO0FBQUEsRUFDWCxlQUFlO0FBQUEsRUFDZjtBQUFBLEVBQ0E7QUFDRixNQUFnRDtBQUM5QyxRQUFNLDZCQUE2QixjQUFBQyxRQUFNLFFBQVEsTUFBTSx5Q0FBeUMsR0FBRyxDQUFDLENBQUM7QUFDckcsUUFBTSxnQ0FBZ0Msd0NBQXdDLG1CQUFtQjtBQUNqRyxRQUFNLDJCQUEyQix1Q0FBdUMsNkJBQTZCO0FBQ3JHLFFBQU0sZUFBZSxZQUNuQjtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsT0FBTyxLQUFLLCtCQUErQixTQUFTO0FBQUEsTUFDcEQsYUFBYSxLQUFLLDRDQUE0QyxZQUFZO0FBQUEsTUFDMUUsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1Y7QUFBQSxNQUNBLFVBQVU7QUFBQTtBQUFBLEVBQ1osSUFFQTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsT0FBTyxLQUFLLCtCQUErQixTQUFTO0FBQUEsTUFDcEQsT0FBTyxhQUFhO0FBQUE7QUFBQSxFQUN0QjtBQUVGLFFBQU0sMkJBQTJCLFlBQy9CO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxPQUFPLEtBQUssMkNBQTJDLGNBQWM7QUFBQSxNQUNyRSxTQUFTO0FBQUEsTUFDVCxPQUFPLE9BQU8sNkJBQTZCO0FBQUEsTUFDM0MsVUFBVSxDQUFDLFVBQVUsNEJBQTRCLHdDQUF3QyxLQUFLLENBQUM7QUFBQSxNQUMvRixhQUFhLEtBQUssMkNBQTJDLGNBQWM7QUFBQSxNQUMzRTtBQUFBLE1BQ0EsVUFBVTtBQUFBLE1BQ1YsZ0JBQWdCO0FBQUEsTUFDaEIsa0JBQWtCO0FBQUE7QUFBQSxFQUNwQixJQUVBO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxPQUFPLEtBQUssMkNBQTJDLGNBQWM7QUFBQSxNQUNyRSxPQUFPO0FBQUE7QUFBQSxFQUNUO0FBR0YsTUFBSSxXQUFXO0FBQ2IsV0FDRSw4Q0FBQyxTQUFJLFdBQVUsK0RBQ2I7QUFBQSxtREFBQyxTQUFJLFdBQVUsc0JBQXFCLFNBQVEsYUFBWSxNQUFLLFVBQVMsY0FBWSxLQUFLLGtCQUFrQixTQUFTLEdBQ2hILHVEQUFDLFlBQU8sV0FBVSx1QkFBc0IsSUFBRyxNQUFLLElBQUcsTUFBSyxHQUFFLEtBQUksYUFBWSxLQUFJLEdBQ2hGO0FBQUEsTUFDQyxLQUFLLGtCQUFrQixTQUFTO0FBQUEsT0FDbkM7QUFBQSxFQUVKO0FBRUEsTUFBSSxjQUFjO0FBQ2hCLFdBQU8sNkNBQUMsU0FBSSxXQUFVLHFDQUFxQyx3QkFBYTtBQUFBLEVBQzFFO0FBRUEsU0FDRSw4Q0FBQyxTQUFJLFdBQVUsaURBQ1o7QUFBQTtBQUFBLElBQ0E7QUFBQSxLQUNIO0FBRUo7QUFFQSxJQUFPLDhDQUFROzs7QUMrQlgsSUFBQUMsc0JBQUE7QUFGSixJQUFNLDBCQUEwQixDQUFDLEVBQUUsT0FBTyxTQUFTLFFBQVEsTUFBb0M7QUFDN0YsUUFBTSxhQUNKLDhFQUNFO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFFBQVEsUUFBUTtBQUFBLFFBQ2hCLGFBQWEsUUFBUTtBQUFBLFFBQ3JCLGdCQUFnQixRQUFRO0FBQUEsUUFDeEIsaUJBQWlCLFFBQVE7QUFBQSxRQUN6QixlQUFlLFFBQVE7QUFBQSxRQUN2QixnQkFBZ0IsUUFBUTtBQUFBLFFBQ3hCLFdBQVcsUUFBUTtBQUFBLFFBQ25CLGtCQUFrQixRQUFRO0FBQUEsUUFDMUIsa0JBQWtCLFFBQVE7QUFBQSxRQUMxQixvQkFBb0IsUUFBUTtBQUFBLFFBQzVCLHFCQUFxQixRQUFRO0FBQUEsUUFDN0IsZ0JBQWdCLFFBQVE7QUFBQSxRQUN4QixrQkFBa0IsUUFBUTtBQUFBLFFBQzFCLG1CQUFtQixRQUFRO0FBQUEsUUFDM0IsbUJBQW1CLFFBQVE7QUFBQSxRQUMzQixxQkFBcUIsUUFBUTtBQUFBLFFBQzdCLGtCQUFrQixRQUFRO0FBQUEsUUFDMUIsa0JBQWtCLFFBQVE7QUFBQSxRQUMxQixvQkFBb0IsUUFBUTtBQUFBLFFBQzVCLHFCQUFxQixRQUFRO0FBQUEsUUFDN0IsbUJBQW1CLFFBQVE7QUFBQSxRQUMzQixxQkFBcUIsUUFBUTtBQUFBLFFBQzdCLHNCQUFzQixRQUFRO0FBQUEsUUFDOUIseUJBQXlCLFFBQVE7QUFBQSxRQUNqQyxnQkFBZ0IsUUFBUTtBQUFBLFFBQ3hCLGtCQUFrQixRQUFRO0FBQUEsUUFDMUIsbUJBQW1CLFFBQVE7QUFBQSxRQUMzQixtQkFBbUIsUUFBUTtBQUFBLFFBQzNCLGdCQUFnQixRQUFRO0FBQUEsUUFDeEIsaUJBQWlCLFFBQVE7QUFBQSxRQUN6QixjQUFjLFFBQVE7QUFBQSxRQUN0QixlQUFlLFFBQVE7QUFBQSxRQUN2QiwwQkFBMEIsUUFBUTtBQUFBLFFBQ2xDLHdCQUF3QixRQUFRO0FBQUEsUUFDaEMsMkJBQTJCLFFBQVE7QUFBQSxRQUNuQywwQkFBMEIsUUFBUTtBQUFBLFFBQ2xDLDJCQUEyQixRQUFRO0FBQUEsUUFDbkMsMkJBQTJCLFFBQVE7QUFBQSxRQUNuQyx3QkFBd0IsUUFBUTtBQUFBLFFBQ2hDLFlBQVksUUFBUTtBQUFBLFFBQ3BCLG9CQUFvQixRQUFRO0FBQUEsUUFDNUIsb0JBQW9CLFFBQVE7QUFBQSxRQUUzQixrQkFBUSxXQUFXLFVBQ2xCO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxXQUFXLFFBQVEsV0FBVztBQUFBLFlBQzlCLHFCQUFxQixRQUFRLFdBQVc7QUFBQSxZQUN4QyxXQUFXLFFBQVE7QUFBQSxZQUNuQixXQUFXLFFBQVEsV0FBVztBQUFBLFlBQzlCLFVBQVUsUUFBUSxXQUFXO0FBQUEsWUFDN0IsY0FBYyxRQUFRLFdBQVc7QUFBQSxZQUNqQyxtQkFBbUIsUUFBUSxXQUFXO0FBQUEsWUFDdEMsNkJBQTZCLFFBQVEsV0FBVztBQUFBO0FBQUEsUUFDbEQsSUFDRTtBQUFBO0FBQUEsSUFDTjtBQUFBLElBQ0E7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLGNBQWMsUUFBUTtBQUFBLFFBQ3RCLGdCQUFnQixRQUFRO0FBQUEsUUFDeEIsVUFBVSxRQUFRO0FBQUEsUUFDbEIsY0FBYyxRQUFRO0FBQUEsUUFDdEIsa0JBQWtCLFFBQVE7QUFBQSxRQUMxQixjQUFjLFFBQVE7QUFBQSxRQUN0QixrQkFBa0IsUUFBUTtBQUFBLFFBQzFCLFlBQVksUUFBUTtBQUFBO0FBQUEsSUFDdEI7QUFBQSxLQUNGO0FBR0YsU0FDRSw4Q0FBQyxTQUFJLFdBQVUsYUFDYjtBQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxNQUFNLE1BQU07QUFBQSxRQUNaLE9BQU8sTUFBTTtBQUFBLFFBQ2IsU0FBUyxNQUFNO0FBQUEsUUFDZixhQUFhLE1BQU07QUFBQSxRQUNuQixZQUFZLE1BQU07QUFBQSxRQUNsQixhQUFhLE1BQU07QUFBQSxRQUNuQixZQUFZLE1BQU07QUFBQSxRQUNsQixhQUFhLE1BQU07QUFBQSxRQUNuQixNQUFNLE1BQU07QUFBQSxRQUNaLE9BQU8sTUFBTTtBQUFBLFFBQ2IsUUFBUSxNQUFNO0FBQUEsUUFDZCxXQUFXLE1BQU07QUFBQSxRQUNqQixVQUFVLE1BQU07QUFBQTtBQUFBLElBQ2xCO0FBQUEsSUFDQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsTUFBTSxRQUFRO0FBQUEsUUFDZCxNQUFNLFFBQVE7QUFBQSxRQUNkLE9BQU8sUUFBUTtBQUFBLFFBQ2YsVUFBVSxRQUFRO0FBQUEsUUFDbEIsVUFBVSxRQUFRO0FBQUEsUUFDbEIsT0FBTyxRQUFRO0FBQUEsUUFDZixXQUFXLFFBQVE7QUFBQSxRQUNuQixZQUFZLFFBQVE7QUFBQSxRQUNwQixTQUFTLFFBQVE7QUFBQSxRQUNqQixlQUFlLFFBQVE7QUFBQSxRQUN2QixlQUFlLFFBQVE7QUFBQSxRQUN2QixjQUFjLFFBQVE7QUFBQTtBQUFBLElBQ3hCO0FBQUEsSUFFQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsV0FBVTtBQUFBLFFBQ1YsT0FBTyxFQUFFLFNBQVMsUUFBUSxZQUFZLFNBQVMsT0FBTztBQUFBLFFBRXREO0FBQUEsdURBQUMsU0FBSSxXQUFVLHNCQUFxQixTQUFRLGFBQVksTUFBSyxVQUFTLGNBQVksS0FBSyxrQkFBa0IsU0FBUyxHQUNoSCx1REFBQyxZQUFPLFdBQVUsdUJBQXNCLElBQUcsTUFBSyxJQUFHLE1BQUssR0FBRSxLQUFJLGFBQVksS0FBSSxHQUNoRjtBQUFBLFVBQ0MsS0FBSyxrQkFBa0IsU0FBUztBQUFBO0FBQUE7QUFBQSxJQUNuQztBQUFBLElBRUMsUUFBUSxlQUFlLDZDQUFDLFNBQUksV0FBVSxlQUFlLGtCQUFRLGNBQWEsSUFBUztBQUFBLElBRW5GLENBQUMsUUFBUSxhQUFhLENBQUMsUUFBUSxnQkFBZ0IsUUFBUSxTQUN0RCxRQUFRLG9CQUNOLDhDQUFDLFNBQUksV0FBVSwyRkFDYjtBQUFBLG1EQUFDLFNBQUksV0FBVSxxQ0FDYjtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsTUFBTSxRQUFRO0FBQUEsVUFDZCxPQUFPLFFBQVE7QUFBQSxVQUNmLFVBQVUsUUFBUTtBQUFBLFVBQ2xCLFVBQVUsUUFBUTtBQUFBLFVBQ2xCLFVBQVUsUUFBUTtBQUFBLFVBQ2xCLFFBQVEsUUFBUTtBQUFBO0FBQUEsTUFDbEIsR0FDRjtBQUFBLE1BQ0EsNkNBQUMsU0FBSSxXQUFVLG1EQUFtRCxzQkFBVztBQUFBLE9BQy9FLElBRUEsYUFFQTtBQUFBLEtBQ047QUFFSjtBQUVBLElBQU8sa0NBQVE7OztBQ3RRZixJQUFBQyxnQkFBMEQ7QUFrQjFELElBQU0sY0FBYyxDQUFDLE9BQWdDLFlBQWtEO0FBQ3JHLFFBQU0sY0FBYyxTQUFTLE9BQU8sRUFBRSxZQUFZO0FBQ2xELE1BQUksQ0FBQyxNQUFNLFFBQVEsS0FBSyxLQUFLLE1BQU0sU0FBUyxHQUFHO0FBQzdDLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FDRSxNQUFNLEtBQUssQ0FBQyxVQUFVLFNBQVMsT0FBTyxnQkFBZ0IsT0FBTyxZQUFZLEVBQUUsWUFBWSxNQUFNLFdBQVcsS0FDeEcsTUFBTSxDQUFDLEtBQ1A7QUFFSjtBQUVBLElBQU0sYUFBYSxDQUFDLE9BQThCLGNBQStDO0FBQy9GLFFBQU0sZ0JBQWdCLFNBQVMsU0FBUyxFQUFFLFlBQVk7QUFDdEQsUUFBTSxjQUFjLE1BQU0sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNuRCxRQUFNLGNBQWMsTUFBTSxRQUFRLFdBQVcsSUFBSSxZQUFZLElBQUksQ0FBQyxVQUFVLG9CQUFvQixLQUFLLENBQUMsSUFBSSxDQUFDO0FBRTNHLFNBQU8sWUFBWSxLQUFLLENBQUMsU0FBUyxTQUFTLEtBQUssU0FBUyxFQUFFLFlBQVksTUFBTSxhQUFhLEtBQUs7QUFDakc7QUFHTyxJQUFNLGtDQUFrQyxDQUFDO0FBQUEsRUFDOUM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUEyQztBQUN6QyxRQUFNLENBQUMsTUFBTSxPQUFPLFFBQUksd0JBQWtDLElBQUk7QUFDOUQsUUFBTSxDQUFDLG1CQUFtQixvQkFBb0IsUUFBSSx3QkFBUyxFQUFFO0FBQzdELFFBQU0sQ0FBQyxnQkFBZ0IsaUJBQWlCLFFBQUksd0JBQVMsRUFBRTtBQUN2RCxRQUFNLENBQUMsNkJBQTZCLDhCQUE4QixRQUFJLHdCQUFTLGlDQUFpQztBQUNoSCxRQUFNLENBQUMsMEJBQTBCLDJCQUEyQixRQUFJLHdCQUFTLGlDQUFpQztBQUMxRyxRQUFNLENBQUMsbUJBQW1CLG9CQUFvQixRQUFJLHdCQUFTLEVBQUU7QUFDN0QsUUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHdCQUFTLEtBQUs7QUFDaEQsUUFBTSxDQUFDLGNBQWMsZUFBZSxRQUFJLHdCQUFTLEVBQUU7QUFFbkQsUUFBTSxpQkFBYSwyQkFBWSxZQUFZO0FBQ3pDLFVBQU0sY0FBYyxTQUFTLE9BQU87QUFDcEMsVUFBTSxnQkFBZ0IsU0FBUyxTQUFTO0FBQ3hDLFFBQUksQ0FBQyxXQUFXLENBQUMsYUFBYTtBQUM1QixjQUFRLElBQUk7QUFDWiwyQkFBcUIsRUFBRTtBQUN2Qix3QkFBa0IsRUFBRTtBQUNwQixxQ0FBK0IsaUNBQWlDO0FBQ2hFLGtDQUE0QixpQ0FBaUM7QUFDN0QsMkJBQXFCLEVBQUU7QUFDdkIsc0JBQWdCLEVBQUU7QUFDbEIsbUJBQWEsS0FBSztBQUNsQjtBQUFBLElBQ0Y7QUFFQSxpQkFBYSxJQUFJO0FBQ2pCLG9CQUFnQixFQUFFO0FBRWxCLFFBQUk7QUFDRixZQUFNLFdBQVcsTUFBTSx3QkFBd0IsYUFBYTtBQUFBLFFBQzFELHlCQUF5QjtBQUFBLE1BQzNCLENBQUM7QUFFRCxVQUFJLFVBQVUsWUFBWSxPQUFPO0FBQy9CLGdCQUFRLElBQUk7QUFDWiw2QkFBcUIsRUFBRTtBQUN2QiwwQkFBa0IsRUFBRTtBQUNwQix1Q0FBK0IsaUNBQWlDO0FBQ2hFLG9DQUE0QixpQ0FBaUM7QUFDN0QsNkJBQXFCLEVBQUU7QUFDdkIsd0JBQWdCLFVBQVUsV0FBVyxLQUFLLDJCQUEyQixzQ0FBc0MsQ0FBQztBQUM1RztBQUFBLE1BQ0Y7QUFFQSxZQUFNLFFBQVEsWUFBWSxVQUFVLFNBQVMsQ0FBQyxHQUFHLFdBQVc7QUFDNUQsWUFBTSx5QkFBeUIsU0FBUyxPQUFPLGdCQUFnQixPQUFPLFlBQVksRUFBRSxZQUFZO0FBQ2hHLFlBQU0sZUFBZSxTQUFTLGdCQUFnQixXQUFXLE9BQU8sYUFBYSxJQUFJO0FBQ2pGLFVBQUksQ0FBQyxlQUFlO0FBQ2xCLGdCQUFRLElBQUk7QUFDWiw2QkFBcUIsRUFBRTtBQUN2QiwwQkFBa0IsRUFBRTtBQUNwQix1Q0FBK0IsaUNBQWlDO0FBQ2hFLG9DQUE0QixpQ0FBaUM7QUFDN0QsNkJBQXFCLHNCQUFzQjtBQUMzQyx3QkFBZ0IsRUFBRTtBQUNsQjtBQUFBLE1BQ0Y7QUFFQSxVQUFJLENBQUMsY0FBYztBQUNqQixnQkFBUSxJQUFJO0FBQ1osNkJBQXFCLEVBQUU7QUFDdkIsMEJBQWtCLEVBQUU7QUFDcEIsdUNBQStCLGlDQUFpQztBQUNoRSxvQ0FBNEIsaUNBQWlDO0FBQzdELDZCQUFxQixzQkFBc0I7QUFDM0Msd0JBQWdCLEtBQUssMEJBQTBCLDhCQUE4QixDQUFDO0FBQzlFO0FBQUEsTUFDRjtBQUVBLFlBQU0sWUFBWSxTQUFTLGFBQWEsTUFBTTtBQUM5QyxZQUFNLHNCQUFzQix3Q0FBd0MsYUFBYSxtQkFBbUI7QUFDcEcsY0FBUSxZQUFZO0FBQ3BCLDJCQUFxQixTQUFTO0FBQzlCLHdCQUFrQixTQUFTO0FBQzNCLHFDQUErQixtQkFBbUI7QUFDbEQsa0NBQTRCLG1CQUFtQjtBQUMvQywyQkFBcUIsc0JBQXNCO0FBQUEsSUFDN0MsU0FBUyxPQUFPO0FBQ2QsVUFBSSxpQkFBaUIsaUJBQWlCLE1BQU0sV0FBVyxLQUFLO0FBQzFELG9CQUFZO0FBQ1o7QUFBQSxNQUNGO0FBRUEsY0FBUSxJQUFJO0FBQ1osMkJBQXFCLEVBQUU7QUFDdkIsd0JBQWtCLEVBQUU7QUFDcEIscUNBQStCLGlDQUFpQztBQUNoRSxrQ0FBNEIsaUNBQWlDO0FBQzdELDJCQUFxQixFQUFFO0FBQ3ZCLHNCQUFnQixpQkFBaUIsUUFBUSxNQUFNLFVBQVUsS0FBSywyQkFBMkIsc0NBQXNDLENBQUM7QUFBQSxJQUNsSSxVQUFFO0FBQ0EsbUJBQWEsS0FBSztBQUFBLElBQ3BCO0FBQUEsRUFDRixHQUFHLENBQUMsU0FBUyxXQUFXLGFBQWEsT0FBTyxDQUFDO0FBRTdDLCtCQUFVLE1BQU07QUFDZCxTQUFLLFdBQVc7QUFBQSxFQUNsQixHQUFHLENBQUMsVUFBVSxDQUFDO0FBRWYsUUFBTSx1QkFBbUI7QUFBQSxJQUN2QixNQUFNLFNBQVMsY0FBYyxNQUFNLFNBQVMsaUJBQWlCO0FBQUEsSUFDN0QsQ0FBQyxnQkFBZ0IsaUJBQWlCO0FBQUEsRUFDcEM7QUFDQSxRQUFNLGlDQUE2QjtBQUFBLElBQ2pDLE1BQU0sNkJBQTZCO0FBQUEsSUFDbkMsQ0FBQywwQkFBMEIsMkJBQTJCO0FBQUEsRUFDeEQ7QUFDQSxRQUFNLDBCQUFzQiwyQkFBWSxNQUFNO0FBQzVDLHNCQUFrQixpQkFBaUI7QUFBQSxFQUNyQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7QUFDdEIsUUFBTSxvQ0FBZ0MsMkJBQVksTUFBTTtBQUN0RCxnQ0FBNEIsMkJBQTJCO0FBQUEsRUFDekQsR0FBRyxDQUFDLDJCQUEyQixDQUFDO0FBQ2hDLFFBQU0sMkJBQXVCLDJCQUFZLE1BQU07QUFDN0MsVUFBTSxnQkFBZ0IsU0FBUyxjQUFjO0FBQzdDLHlCQUFxQixhQUFhO0FBQ2xDLHNCQUFrQixhQUFhO0FBQUEsRUFDakMsR0FBRyxDQUFDLGNBQWMsQ0FBQztBQUNuQixRQUFNLHFDQUFpQywyQkFBWSxNQUFNO0FBQ3ZELFVBQU0sMEJBQTBCLHdDQUF3Qyx3QkFBd0I7QUFDaEcsbUNBQStCLHVCQUF1QjtBQUN0RCxnQ0FBNEIsdUJBQXVCO0FBQUEsRUFDckQsR0FBRyxDQUFDLHdCQUF3QixDQUFDO0FBRTdCLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjs7O0FDNUxBLElBQUFDLGdCQUFnRDtBQXFCekMsSUFBTSx1Q0FBdUMsQ0FBQztBQUFBLEVBQ25EO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBZ0Q7QUFDOUMsUUFBTSwyQkFBMkIscUJBQXFCLFdBQVcsZ0JBQWdCLENBQUMscUJBQXFCO0FBRXZHLFFBQU0sb0JBQWdCLHVCQUFRLE1BQU07QUFDbEMsUUFBSSxxQkFBcUIsV0FBVyxnQkFBZ0Isb0JBQW9CLFNBQVM7QUFDL0UsYUFBTywwQkFBMEIsb0JBQW9CLE9BQU87QUFBQSxJQUM5RDtBQUVBLFFBQUkscUJBQXFCLFdBQVcsa0JBQWtCLG9CQUFvQixTQUFTO0FBQ2pGLGFBQU8sK0JBQStCLG9CQUFvQixTQUFTLG9CQUFvQixrQkFBa0IsZ0JBQWdCO0FBQUEsSUFDM0g7QUFFQSxRQUFJLHFCQUFxQixTQUFTO0FBQ2hDLGFBQU8sMkJBQTJCLG9CQUFvQixPQUFPO0FBQUEsSUFDL0Q7QUFFQSxRQUFJLGlCQUFpQixpQkFBaUI7QUFDcEMsWUFBTSxhQUFhLGlCQUFpQixlQUFlLEtBQUssaUJBQWlCLG9CQUFJLEtBQUssQ0FBQztBQUNuRixZQUFNLFFBQVEsSUFBSSxnQkFBZ0I7QUFBQSxRQUNoQyxjQUFjO0FBQUEsUUFDZDtBQUFBLE1BQ0YsQ0FBQztBQUVELGFBQU8sbUJBQW1CLE1BQU0sU0FBUyxDQUFDO0FBQUEsSUFDNUM7QUFFQSxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsa0JBQWtCLGNBQWMsUUFBUSxpQkFBaUIsbUJBQW1CLENBQUM7QUFFakYsUUFBTSxxQ0FBaUMsMkJBQVksTUFBTTtBQUN2RCxVQUFNLGNBQWMsZ0JBQWdCO0FBQ3BDLFFBQUksQ0FBQyxZQUFhO0FBQ2xCLG9CQUFnQixXQUFXO0FBQUEsRUFDN0IsR0FBRyxDQUFDLGlCQUFpQixlQUFlLENBQUM7QUFFckMsK0JBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxPQUFRO0FBRWIsVUFBTSxhQUFhLFNBQVMsZUFBZSxlQUFlO0FBQzFELFFBQUksQ0FBQyxXQUFZO0FBRWpCLGVBQVcsYUFBYSxpQkFBaUIsYUFBYTtBQUN0RCxXQUFPLE1BQU07QUFDWCxpQkFBVyxnQkFBZ0IsZUFBZTtBQUFBLElBQzVDO0FBQUEsRUFDRixHQUFHLENBQUMsUUFBUSxhQUFhLENBQUM7QUFFMUIsK0JBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxPQUFRO0FBRWIsVUFBTSxtQkFBbUIsQ0FBQyxVQUF5QjtBQUNqRCxVQUFJLE9BQU8sU0FBUyxNQUFNLE1BQU0sWUFBWSxNQUFNO0FBQ2hEO0FBQUEsTUFDRjtBQUVBLFlBQU0sd0JBQXdCLE1BQU07QUFDbEMsWUFBSSwwQkFBMEI7QUFDNUIseUNBQStCO0FBQUEsUUFDakM7QUFDQSxlQUFPLGlDQUFpQztBQUN4QyxlQUFPLFNBQVMsUUFBUSxhQUFhO0FBQUEsTUFDdkM7QUFFQSxVQUFJLE9BQU8sT0FBTywyQkFBMkIsWUFBWTtBQUN2RCxlQUFPLHVCQUF1QixxQkFBcUI7QUFDbkQ7QUFBQSxNQUNGO0FBRUEsNEJBQXNCO0FBQUEsSUFDeEI7QUFFQSxXQUFPLGlCQUFpQixZQUFZLGdCQUFnQjtBQUNwRCxXQUFPLE1BQU07QUFDWCxhQUFPLG9CQUFvQixZQUFZLGdCQUFnQjtBQUFBLElBQ3pEO0FBQUEsRUFDRixHQUFHLENBQUMsUUFBUSxlQUFlLGdDQUFnQyx3QkFBd0IsQ0FBQztBQUN0Rjs7O0FDekdBLElBQUFDLGlCQUF3QjtBQWFqQixJQUFNLHFDQUFxQyxDQUFDO0FBQUEsRUFDakQ7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUE4QztBQUM1QyxRQUFNLHVCQUFtQix3QkFBUSxNQUFNLFNBQVMsWUFBWSxlQUFlLGFBQWEsR0FBRyxDQUFDLGNBQWMsZUFBZSxTQUFTLENBQUM7QUFDbkksUUFBTSx3QkFBb0Isd0JBQVEsTUFBTSxtQ0FBbUMsZ0JBQWdCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztBQUNoSCxRQUFNLFVBQVUsNkJBQTZCO0FBQUEsSUFDM0M7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFNBQVM7QUFBQSxFQUNYLENBQUM7QUFFRCxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0EsR0FBRztBQUFBLEVBQ0w7QUFDRjs7O0FDL0JBLElBQUFDLGlCQUEwQjtBQVNuQixJQUFNLGlDQUFpQyxDQUFDO0FBQUEsRUFDN0M7QUFBQSxFQUNBO0FBQ0YsTUFBZ0Q7QUFDOUMsZ0NBQVUsTUFBTTtBQUNkLFVBQU0sYUFBYSxTQUFTLGVBQWUsZUFBZTtBQUMxRCxRQUFJLENBQUMsV0FBWTtBQUVqQixVQUFNLG1CQUFtQixXQUFXO0FBQ3BDLFVBQU0sdUJBQXVCLFdBQVcsYUFBYSxlQUFlO0FBQ3BFLFVBQU0sZ0JBQWdCLFdBQVcsYUFBYSxPQUFPO0FBQ3JELFVBQU0sY0FBYyxTQUFTLE9BQU87QUFFcEMsUUFBSSxRQUFRO0FBQ1YsaUJBQVcsV0FBVztBQUN0QixpQkFBVyxhQUFhLGlCQUFpQixNQUFNO0FBQy9DLFVBQUksYUFBYTtBQUNmLG1CQUFXLGFBQWEsU0FBUyxXQUFXO0FBQUEsTUFDOUM7QUFBQSxJQUNGLFdBQVcsQ0FBQyxrQkFBa0I7QUFDNUIsaUJBQVcsV0FBVztBQUN0QixpQkFBVyxhQUFhLGlCQUFpQixPQUFPO0FBQ2hELFVBQUksa0JBQWtCLE1BQU07QUFDMUIsbUJBQVcsZ0JBQWdCLE9BQU87QUFBQSxNQUNwQztBQUFBLElBQ0Y7QUFFQSxXQUFPLE1BQU07QUFDWCxpQkFBVyxXQUFXO0FBQ3RCLFVBQUkseUJBQXlCLE1BQU07QUFDakMsbUJBQVcsZ0JBQWdCLGVBQWU7QUFBQSxNQUM1QyxPQUFPO0FBQ0wsbUJBQVcsYUFBYSxpQkFBaUIsb0JBQW9CO0FBQUEsTUFDL0Q7QUFDQSxVQUFJLGtCQUFrQixNQUFNO0FBQzFCLG1CQUFXLGdCQUFnQixPQUFPO0FBQUEsTUFDcEMsT0FBTztBQUNMLG1CQUFXLGFBQWEsU0FBUyxhQUFhO0FBQUEsTUFDaEQ7QUFBQSxJQUNGO0FBQUEsRUFDRixHQUFHLENBQUMsUUFBUSxPQUFPLENBQUM7QUFDdEI7OztBZlJFLElBQUFDLHNCQUFBO0FBSEYsSUFBTSxrQkFBa0I7QUFFeEIsSUFBTSxjQUFjLE1BQ2xCLDhDQUFDLFNBQUksU0FBUSxhQUFZLE1BQUssUUFBTyxRQUFPLGdCQUFlLGFBQWEsS0FBSyxlQUFZLFFBQU8sV0FBVSxVQUN4RztBQUFBLCtDQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSwwS0FBeUs7QUFBQSxFQUM5Tiw2Q0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsK0RBQThEO0FBQUEsRUFDbkgsNkNBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLFdBQVU7QUFBQSxHQUNqRTtBQUdGLElBQU0sYUFBYSxDQUFLLE9BQVksTUFBYyxhQUEwQjtBQUMxRSxNQUFJLENBQUMsTUFBTSxPQUFRLFFBQU8sQ0FBQztBQUMzQixRQUFNLFdBQVcsS0FBSyxJQUFJLEdBQUcsSUFBSTtBQUNqQyxRQUFNLFNBQVMsV0FBVyxLQUFLO0FBQy9CLFNBQU8sTUFBTSxNQUFNLE9BQU8sUUFBUSxRQUFRO0FBQzVDO0FBR0EsSUFBTSwwQkFBMEIsTUFBTTtBQUNwQywwQkFBd0I7QUFBQSxJQUN0QixPQUFPLFNBQVMsT0FBTyxpQkFBaUI7QUFBQSxJQUN4QyxVQUFVLFNBQVMsT0FBTyxpQkFBaUI7QUFBQSxJQUMzQyxTQUFTLFNBQVMsT0FBTyxnQkFBZ0I7QUFBQSxFQUMzQyxDQUFDO0FBQ0g7QUFFQSxJQUFNLG9DQUFvQyxDQUFDLFdBQTRCO0FBQ3JFLE1BQUksUUFBUTtBQUNWLFdBQU8sS0FBSyxxQ0FBcUMsaURBQWlEO0FBQUEsRUFDcEc7QUFFQSxTQUFPLEtBQUsseUNBQXlDLDZEQUE2RDtBQUNwSDtBQUVBLElBQU0sb0NBQW9DLENBQUM7QUFBQSxFQUN6QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsT0FnQk87QUFBQSxFQUNMLE1BQU0sTUFBTTtBQUFBLEVBQ1osT0FBTyxNQUFNO0FBQUEsRUFDYixTQUFTLE1BQU07QUFBQSxFQUNmLGFBQWE7QUFBQSxFQUNiLFlBQVk7QUFBQSxFQUNaLGFBQWE7QUFBQSxFQUNiLFlBQVksTUFBTTtBQUFBLEVBQ2xCLGFBQWEsTUFBTTtBQUFBLEVBQ25CO0FBQUEsRUFDQSxPQUFPO0FBQUEsRUFDUDtBQUFBLEVBQ0EsV0FBVztBQUFBLEVBQ1gsVUFBVTtBQUNaO0FBRUEsSUFBTSxzQ0FBc0MsQ0FBQztBQUFBLEVBQzNDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixPQWFPO0FBQUEsRUFDTCxNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxVQUFVO0FBQUEsRUFDVixVQUFVO0FBQUEsRUFDVixPQUFPO0FBQUEsRUFDUCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixTQUFTO0FBQUEsRUFDVCxlQUFlO0FBQUEsRUFDZixlQUFlO0FBQUEsRUFDZixjQUFjO0FBQ2hCO0FBYUEsSUFBTSxzQ0FBc0MsQ0FBQztBQUFBLEVBQzNDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsT0FnRU87QUFBQSxFQUNMO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxpQkFBaUI7QUFBQSxFQUNqQjtBQUFBLEVBQ0EsZUFBZTtBQUFBLEVBQ2Y7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLDBCQUEwQjtBQUFBLEVBQzFCLHdCQUF3QjtBQUFBLEVBQ3hCLDJCQUEyQjtBQUFBLEVBQzNCLDBCQUEw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QUNGLENBQUM7QUFFRCxTQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxzQkFBc0IsZ0NBQWdDLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsU0FBUyxNQUFNLEtBQUssQ0FBQyxDQUFDO0FBQUEsSUFDN0cseUJBQXlCLFFBQVEsQ0FBQztBQUFBLElBQ2xDO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTSxpQ0FBaUMsTUFBTTtBQUMzQyxRQUFNLGFBQWEsb0NBQW9DO0FBQ3ZELFFBQU0sbUJBQWU7QUFBQSxJQUNuQixNQUFNO0FBQUEsTUFDSjtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osT0FBTyxLQUFLLDZCQUE2QixhQUFhO0FBQUEsUUFDdEQsTUFBTSw2Q0FBQyxlQUFZO0FBQUEsUUFDbkIsU0FBUyxNQUFNO0FBQ2IsZUFBSyxXQUFXLHFCQUFxQjtBQUFBLFFBQ3ZDO0FBQUEsUUFDQSxVQUFVLFdBQVc7QUFBQSxNQUN2QjtBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUMsVUFBVTtBQUFBLEVBQ2I7QUFFQSxTQUNFLDhFQUNFO0FBQUEsaURBQUMsbUNBQXdCLE9BQU8sV0FBVyxPQUFPLFNBQVMsV0FBVyxTQUFTLFNBQVMsV0FBVyxTQUFTO0FBQUEsSUFDM0csV0FBVyx1QkFDVjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsV0FBVyxLQUFLLDZCQUE2QixrQkFBa0I7QUFBQSxRQUMvRCxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixlQUFlLEtBQUssNkJBQTZCLGtCQUFrQjtBQUFBLFFBQ25FLFdBQVc7QUFBQTtBQUFBLElBQ2IsSUFDRTtBQUFBLEtBQ047QUFFSjtBQUdBLElBQU0sMEJBQTBCLE1BQU07QUFDcEMsU0FDRSw2Q0FBQyxnQ0FBcUIseUJBQXVCLE1BQzNDLHVEQUFDLGtDQUErQixHQUNsQztBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsMEJBQXdCO0FBQ3hCLFFBQU0sU0FBUyxTQUFTLGVBQWUsNEJBQTRCO0FBQ25FLE1BQUksQ0FBQyxPQUFRO0FBQ2IsbUJBQWlCLFFBQVEsNkNBQUMsMkJBQXdCLENBQUU7QUFDdEQ7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLGtDQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImhvdXJzIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaG91cnMiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJSZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
