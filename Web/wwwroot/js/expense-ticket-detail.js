import {
  ExpenseTicketPreviewModal_default,
  ExpenseTicketStickyPreview_default,
  hasExpenseTicketImagePreviewSource,
  useExpenseTicketImagePreview
} from "./chunks/chunk-ZVZYHQGI.js";
import {
  getExpenseTicketStatusLabel,
  useExpenseTicketsFilterCache
} from "./chunks/chunk-ZXOWJLKZ.js";
import {
  ExpenseCurrencyFilterSelect_default
} from "./chunks/chunk-6ZWU6U6U.js";
import {
  clearExpenseTicketSheetSyncState,
  readExpenseTicketSheetSyncState,
  saveExpenseTicketSheetSyncState,
  syncExpenseLinkedTicketSheetLine
} from "./chunks/chunk-A2ZBZD7S.js";
import {
  mapExpenseTicketDetailHeader,
  mapExpenseTicketDetailLine
} from "./chunks/chunk-KSIWAXD5.js";
import {
  resolveExpenseSheetEditAccess,
  useExpenseTicketLinkSheetGate
} from "./chunks/chunk-D5H5AETT.js";
import "./chunks/chunk-6CQY4MTW.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-Y7PWEQHF.js";
import {
  ExpenseTimelineCard_default
} from "./chunks/chunk-C2UHVVSW.js";
import "./chunks/chunk-WQESTJQX.js";
import {
  CompactPagination_default,
  FloatingActionButton_default,
  useTimelineCardEffects
} from "./chunks/chunk-2YXSM2RQ.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-5FRAKTKT.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-GMPCIITL.js";
import "./chunks/chunk-4BE3ZFCK.js";
import {
  appendExpenseTicketReturnQuery,
  buildExpenseSheetDetailUrl,
  buildExpenseSheetLineDetailUrl,
  buildExpenseTicketLinkUrl,
  isManagingOtherExpenseUser,
  normalizeExpenseTicketReturnContext,
  resolveExpenseTicketReturnContext,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-WQGMDJUU.js";
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
  parseExpenseNumericInput,
  setExpenseNavigationGuard
} from "./chunks/chunk-GYS3ZBXR.js";
import {
  adjustExpenseSheetTicketTotalAmount,
  configureExpenseApiAuth,
  deleteExpenseSheetLine,
  deleteExpenseSheetTicket,
  deleteExpenseSheetTicketFile,
  fetchExpenseSheetDetail,
  fetchExpenseSheetTicket,
  formatExpenseDisplayDate,
  mapExpenseSheetLine,
  parseExpenseDate,
  safeText,
  toIsoDate,
  updateExpenseSheetTicket
} from "./chunks/chunk-GDLOXSCF.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-FBPSAJMQ.js";
import {
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  getExpenseGastoTypeOptions,
  toExpenseApiDdMmYyyy,
  toExpenseGastoTypeCode,
  toExpenseIsoDate
} from "./chunks/chunk-HGU6IHIX.js";
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

// Web/wwwroot/react/src/pages/gastos/tickets/detail/ExpenseTicketDetailPage.tsx
var import_react11 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketDetailState.ts
var import_react = __toESM(require_react());
var useExpenseTicketDetailState = ({ hasAccess, fileId, onForbidden }) => {
  const [header, setHeader] = (0, import_react.useState)(null);
  const [lines, setLines] = (0, import_react.useState)([]);
  const [isLoading, setIsLoading] = (0, import_react.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react.useState)("");
  const reloadDetail = (0, import_react.useCallback)(async () => {
    if (!hasAccess) {
      onForbidden();
      return;
    }
    const safeFileId = safeText(fileId);
    if (!safeFileId) {
      setErrorMessage(indT("Tickets_Detail_NotFound", "Ticket was not found."));
      setHeader(null);
      setLines([]);
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetchExpenseSheetTicket(safeFileId, {
        suppressPermissionModal: true
      });
      if (response?.Success === false) {
        setErrorMessage(response?.Message || indT("Tickets_Detail_LoadError", "Could not load ticket detail."));
        setHeader(null);
        setLines([]);
        return;
      }
      const items = Array.isArray(response?.Items) ? response.Items : [];
      const selected = items.find((entry) => safeText(entry?.FileId).toUpperCase() === safeFileId.toUpperCase()) || items[0] || null;
      if (!selected) {
        setErrorMessage(indT("Tickets_Detail_NotFound", "Ticket was not found."));
        setHeader(null);
        setLines([]);
        return;
      }
      const mappedHeader = mapExpenseTicketDetailHeader(selected);
      const mappedLines = (Array.isArray(selected.Lines) ? selected.Lines : []).map(
        (line) => mapExpenseTicketDetailLine(line)
      );
      setHeader(mappedHeader);
      setLines(mappedLines);
    } catch (error) {
      if (error instanceof ApiFetchError && error.status === 403) {
        onForbidden();
        return;
      }
      setErrorMessage(error instanceof Error ? error.message : indT("Tickets_Detail_LoadError", "Could not load ticket detail."));
      setHeader(null);
      setLines([]);
    } finally {
      setIsLoading(false);
    }
  }, [fileId, hasAccess, onForbidden]);
  (0, import_react.useEffect)(() => {
    void reloadDetail();
  }, [reloadDetail]);
  return {
    header,
    lines,
    isLoading,
    errorMessage,
    reloadDetail
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketDetailMutations.ts
var import_react2 = __toESM(require_react());
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
  currentTotalAmount,
  draftTransDate,
  draftTicketTime,
  draftComentario,
  draftUrlFile,
  draftFileName,
  linkedExpenseSheetId,
  linkedExpenseLineRecId,
  linkedExpenseLineProjectId,
  linkedExpenseLineProjectIdChanged = false,
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
  const validateLinkedSheetBeforeMutation = (0, import_react2.useCallback)(async () => {
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
  const runHeaderUpdate = (0, import_react2.useCallback)(
    async ({ syncSheetLine }) => {
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
      const payload = {
        description: normalizedDescription,
        currencyCode: normalizedCurrency,
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
          const previousTotalAmount = Number(currentTotalAmount ?? 0);
          const hasTotalAmountChange = Math.abs(Number(parsedTotalAmount) - previousTotalAmount) >= 5e-3;
          if (hasTotalAmountChange) {
            const totalAdjustmentResponse = await adjustExpenseSheetTicketTotalAmount(fileId, {
              totalAmount: Number(parsedTotalAmount)
            });
            if (!totalAdjustmentResponse.Success) {
              throw new Error(totalAdjustmentResponse.Message || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
            }
          }
          if (syncSheetLine && validatedSheetId) {
            try {
              const syncPayload = {
                fileId,
                sheetId: validatedSheetId,
                lineRecId: safeText(linkedExpenseLineRecId) || void 0,
                ...linkedExpenseLineProjectIdChanged ? { projectIdOverride: safeText(linkedExpenseLineProjectId) } : {}
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
              throw new Error(message);
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
      draftTotalAmount,
      draftTicketTime,
      draftTransDate,
      draftUrlFile,
      fileId,
      isEditing,
      currentTotalAmount,
      linkedExpenseLineProjectId,
      linkedExpenseLineProjectIdChanged,
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
  const handleUpdate = (0, import_react2.useCallback)(async () => {
    return runHeaderUpdate({
      syncSheetLine: true
    });
  }, [runHeaderUpdate]);
  const handlePersistHeaderDraft = (0, import_react2.useCallback)(async () => {
    return runHeaderUpdate({
      syncSheetLine: linkedExpenseLineProjectIdChanged
    });
  }, [linkedExpenseLineProjectIdChanged, runHeaderUpdate]);
  const resolveLinkedExpenseLineContext = (0, import_react2.useCallback)(async () => {
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
  const handleDelete = (0, import_react2.useCallback)(async () => {
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
var import_react3 = __toESM(require_react());
var createEmptyDraft = () => ({
  description: "",
  gastoType: "",
  currencyCode: "",
  totalAmount: "",
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
var createDraftFromHeader = (header) => {
  return {
    description: safeText(header?.description),
    gastoType: header?.gastoType === null || header?.gastoType === void 0 ? "" : String(header.gastoType),
    currencyCode: safeText(header?.currencyCode).toUpperCase(),
    totalAmount: formatExpenseInputNumber(header?.totalAmount, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
      fallback: ""
    }),
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
  draft: createEmptyDraft()
});
var isValidRequiredGastoType = (rawValue) => {
  const parsedValue = Number.parseInt(String(rawValue || "").trim(), 10);
  return Number.isInteger(parsedValue) && parsedValue > 0;
};
var editorReducer = (state, action) => {
  switch (action.type) {
    case "hydrate_from_header":
      return {
        ...state,
        draft: createDraftFromHeader(action.header)
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
    default:
      return state;
  }
};
var resolveSetStateValue = (value, current) => {
  return typeof value === "function" ? value(current) : value;
};
var useExpenseTicketDetailEditor = ({
  header,
  lineCount,
  pageSize,
  canEditTicket,
  isLoading,
  allowAssignedDraftEdit,
  isFromSheetLink,
  onForbidden
}) => {
  const [state, dispatch] = (0, import_react3.useReducer)(editorReducer, void 0, createInitialState);
  const [descriptionInvalid, setDescriptionInvalid] = (0, import_react3.useState)(false);
  const [gastoTypeInvalid, setGastoTypeInvalid] = (0, import_react3.useState)(false);
  const [currencyCodeInvalid, setCurrencyCodeInvalid] = (0, import_react3.useState)(false);
  const [totalAmountInvalid, setTotalAmountInvalid] = (0, import_react3.useState)(false);
  const descriptionInputRef = (0, import_react3.useRef)(null);
  const gastoTypeInputRef = (0, import_react3.useRef)(null);
  const currencyInputRef = (0, import_react3.useRef)(null);
  const totalAmountInputRef = (0, import_react3.useRef)(null);
  (0, import_react3.useEffect)(() => {
    if (state.isEditing) return;
    dispatch({ type: "hydrate_from_header", header });
  }, [header, state.isEditing]);
  (0, import_react3.useEffect)(() => {
    const maxPage = Math.max(1, Math.ceil(lineCount / pageSize));
    if (state.linePage > maxPage) {
      dispatch({ type: "patch_state", patch: { linePage: maxPage } });
    }
  }, [lineCount, pageSize, state.linePage]);
  (0, import_react3.useEffect)(() => {
    if (state.isEditing) return;
    setDescriptionInvalid(false);
    setGastoTypeInvalid(false);
    setCurrencyCodeInvalid(false);
    setTotalAmountInvalid(false);
  }, [state.isEditing]);
  const setBusy = (0, import_react3.useCallback)(
    (value) => {
      dispatch({ type: "patch_state", patch: { busy: resolveSetStateValue(value, state.busy) } });
    },
    [state.busy]
  );
  const setStatus = (0, import_react3.useCallback)(
    (value) => {
      dispatch({ type: "patch_state", patch: { status: resolveSetStateValue(value, state.status) } });
    },
    [state.status]
  );
  const setIsEditing = (0, import_react3.useCallback)(
    (value) => {
      dispatch({ type: "patch_state", patch: { isEditing: resolveSetStateValue(value, state.isEditing) } });
    },
    [state.isEditing]
  );
  const setModalError = (0, import_react3.useCallback)(
    (value) => {
      dispatch({ type: "patch_state", patch: { modalError: resolveSetStateValue(value, state.modalError) } });
    },
    [state.modalError]
  );
  const setLinePage = (0, import_react3.useCallback)(
    (value) => {
      dispatch({ type: "patch_state", patch: { linePage: resolveSetStateValue(value, state.linePage) } });
    },
    [state.linePage]
  );
  const setDraftDescription = (0, import_react3.useCallback)(
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
  const setDraftGastoType = (0, import_react3.useCallback)(
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
  const setDraftCurrencyCode = (0, import_react3.useCallback)(
    (value) => {
      setCurrencyCodeInvalid(false);
      dispatch({
        type: "set_draft_field",
        field: "currencyCode",
        value: resolveSetStateValue(value, state.draft.currencyCode)
      });
    },
    [state.draft.currencyCode]
  );
  const setDraftTotalAmount = (0, import_react3.useCallback)(
    (value) => {
      setTotalAmountInvalid(false);
      dispatch({
        type: "set_draft_field",
        field: "totalAmount",
        value: resolveSetStateValue(value, state.draft.totalAmount)
      });
    },
    [state.draft.totalAmount]
  );
  const handleEnableEdit = (0, import_react3.useCallback)(() => {
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
    dispatch({ type: "hydrate_from_header", header });
    dispatch({
      type: "patch_state",
      patch: {
        modalError: "",
        isEditing: true,
        status: indT("ExpenseSheets_Detail_EditingEnabled", "Editing enabled")
      }
    });
  }, [allowAssignedDraftEdit, canEditTicket, header, isFromSheetLink, isLoading, onForbidden]);
  const handleCancelEdit = (0, import_react3.useCallback)(() => {
    if (!state.isEditing) return;
    if (!header) {
      dispatch({ type: "patch_state", patch: { isEditing: false } });
      return;
    }
    setGastoTypeInvalid(false);
    setCurrencyCodeInvalid(false);
    setTotalAmountInvalid(false);
    dispatch({ type: "hydrate_from_header", header });
    dispatch({
      type: "patch_state",
      patch: {
        isEditing: false,
        modalError: "",
        status: indT("Common_Cancel", "Cancel")
      }
    });
  }, [header, state.isEditing]);
  const canOpenSaveConfirm = (0, import_react3.useCallback)(() => {
    const normalizedDescription = String(state.draft.description || "").trim();
    const normalizedCurrencyCode = String(state.draft.currencyCode || "").trim().toUpperCase();
    const parsedTotalAmount = parseExpenseNumericInput(state.draft.totalAmount);
    const descriptionIsValid = !!normalizedDescription;
    const gastoTypeIsValid = isValidRequiredGastoType(state.draft.gastoType);
    const currencyIsValid = !!normalizedCurrencyCode;
    const totalAmountIsValid = parsedTotalAmount != null && parsedTotalAmount >= 0;
    setDescriptionInvalid(!descriptionIsValid);
    setGastoTypeInvalid(!gastoTypeIsValid);
    setCurrencyCodeInvalid(!currencyIsValid);
    setTotalAmountInvalid(!totalAmountIsValid);
    if (descriptionIsValid && gastoTypeIsValid && currencyIsValid && totalAmountIsValid) {
      return true;
    }
    const message = !descriptionIsValid ? indT("ExpenseSheets_Validation_DescriptionRequired", "Description is required.") : !gastoTypeIsValid ? indT("Tickets_Validation_CategoryRequired", "Category is required.") : !currencyIsValid ? indT("ExpenseSheets_Validation_CurrencyRequired", "Currency is required.") : indT("Tickets_Validation_TotalAmountRequired", "Total amount must be greater than or equal to 0.");
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
      }
    });
    return false;
  }, [state.draft.currencyCode, state.draft.description, state.draft.gastoType, state.draft.totalAmount]);
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
    canOpenSaveConfirm,
    handleEnableEdit,
    handleCancelEdit
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketDetailRouteContext.ts
var import_react4 = __toESM(require_react());
var useExpenseTicketDetailRouteContext = () => {
  const routeParams = (0, import_react4.useMemo)(() => new URLSearchParams(window.location.search), []);
  const fileId = (0, import_react4.useMemo)(() => safeText(window.__EXPENSE_TICKET_FILE_ID__), []);
  const autoEditMode = (0, import_react4.useMemo)(() => safeText(routeParams.get("mode")).toLowerCase() === "edit", [routeParams]);
  const routeOrigin = (0, import_react4.useMemo)(() => safeText(routeParams.get("origin")).toLowerCase(), [routeParams]);
  const routeSheetId = (0, import_react4.useMemo)(() => safeText(routeParams.get("sheetId")), [routeParams]);
  const routeSheetLineRecId = (0, import_react4.useMemo)(
    () => safeText(routeParams.get("sheetLineRecId") || routeParams.get("lineRecId")),
    [routeParams]
  );
  const explicitReturnContext = (0, import_react4.useMemo)(
    () => normalizeExpenseTicketReturnContext({
      fileId,
      origin: routeOrigin,
      sheetId: routeSheetId,
      sheetLineRecId: routeSheetLineRecId
    }),
    [fileId, routeOrigin, routeSheetId, routeSheetLineRecId]
  );
  (0, import_react4.useEffect)(() => {
    if (!explicitReturnContext) return;
    saveExpenseTicketReturnContext(explicitReturnContext);
  }, [explicitReturnContext]);
  return (0, import_react4.useMemo)(() => {
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
var import_react5 = __toESM(require_react());
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
  const paginationLabels = (0, import_react5.useMemo)(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last")
    }),
    []
  );
  const previewAltText = (0, import_react5.useMemo)(
    () => safeText(isEditing ? draftFileName : header?.fileName) || indT("Tickets_Field_FileId", "Ticket"),
    [draftFileName, header?.fileName, isEditing]
  );
  const statusLabel = (0, import_react5.useMemo)(() => getExpenseTicketStatusLabel(header?.status), [header?.status]);
  const gastoTypeLabel = (0, import_react5.useMemo)(() => {
    const currentGastoType = isEditing ? draftGastoType : header?.gastoType === null ? "" : String(header?.gastoType ?? "");
    if (!currentGastoType) {
      return indT("Common_NotAvailable", "N/A");
    }
    return gastoTypeLabelMap.get(String(currentGastoType)) || String(currentGastoType);
  }, [draftGastoType, gastoTypeLabelMap, header?.gastoType, isEditing]);
  const totalAmountText = (0, import_react5.useMemo)(
    () => {
      const editableTotalAmount = parseExpenseNumericInput(draftTotalAmount);
      return formatAmountWithCurrency(
        isEditing && editableTotalAmount != null ? editableTotalAmount : header?.totalAmount ?? null,
        (isEditing ? draftCurrencyCode : header?.currencyCode) || header?.currencyCode
      );
    },
    [draftCurrencyCode, draftTotalAmount, header?.currencyCode, header?.totalAmount, isEditing]
  );
  const transDateText = (0, import_react5.useMemo)(
    () => formatExpenseDisplayDate(isEditing ? draftTransDate : header?.ticketDate || header?.transDate, document?.documentElement?.lang || "es-ES"),
    [draftTransDate, header?.ticketDate, header?.transDate, isEditing]
  );
  const ticketTimeText = (0, import_react5.useMemo)(
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
var import_react6 = __toESM(require_react());
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
  const handleModalConfirm = (0, import_react6.useCallback)(async () => {
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
  const handleModalButtonConfirm = (0, import_react6.useCallback)(() => {
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
var import_react7 = __toESM(require_react());
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
  const persistHeaderDraftIfNeeded = (0, import_react7.useCallback)(async () => {
    if (!isEditing) {
      return true;
    }
    if (!canOpenSaveConfirm()) {
      return false;
    }
    return handlePersistHeaderDraft();
  }, [canOpenSaveConfirm, handlePersistHeaderDraft, isEditing]);
  const openLineDetail = (0, import_react7.useCallback)(
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
  const openCreateLineDetail = (0, import_react7.useCallback)(async () => {
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
  const resolveClickableCard = (0, import_react7.useCallback)(
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
  const openFile = (0, import_react7.useCallback)(() => {
    void openPreview();
  }, [openPreview]);
  const handleOpenExpenseSheet = (0, import_react7.useCallback)(() => {
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

// Web/wwwroot/react/src/pages/gastos/components/ExpenseTicketDetailHeaderForm.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
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
  draftTransDate,
  draftTicketTime,
  draftUrlFile,
  draftFileName,
  onDraftDescriptionChange,
  onDraftGastoTypeChange,
  onDraftCurrencyCodeChange,
  onDraftTotalAmountChange,
  onOpenFile,
  onOpenExpenseSheet,
  hideOpenFileAction = false
}) => {
  const previewUrl = safeText(isEditing ? draftUrlFile : header.urlFile);
  const canOpenFile = hasExpenseTicketImagePreviewSource(previewUrl);
  const showExpenseSheetField = hasRealExpenseSheetValue(header.hojaGastosIdDisplay);
  const locale = document?.documentElement?.lang || "es-ES";
  const displayDateText = transDateText || formatExpenseDisplayDate(header.ticketDate || header.transDate, locale) || "-";
  const lockedDraftDateText = formatExpenseDisplayDate(draftTransDate, locale) || displayDateText;
  const handleTotalAmountBlur = () => {
    onDraftTotalAmountChange(
      formatExpenseInputNumber(draftTotalAmount, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
        fallback: ""
      })
    );
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-zinc-200 rounded-[var(--radius-xl)]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ExpenseReadOnlyField_default,
        {
          label: indT("Tickets_Field_FileId", "Ticket"),
          value: header.fileId || "-"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ExpenseReadOnlyField_default,
        {
          label: indT("Tickets_Field_Status", "Status"),
          value: statusLabel || "-"
        }
      ),
      isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sm:col-span-2 space-y-1.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_Description", "Description") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ExpenseReadOnlyField_default,
        {
          label: indT("ExpenseSheets_Field_Description", "Description"),
          value: header.description || "-",
          fullWidth: true
        }
      ),
      isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
      ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ExpenseReadOnlyField_default,
        {
          label: indT("Tickets_Filter_Category", "Category"),
          value: gastoTypeLabel || "-"
        }
      ),
      showExpenseSheetField ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ExpenseReadOnlyField_default,
        {
          label: indT("Tickets_Field_ExpenseSheetDisplay", "Expense sheet"),
          value: header.hojaGastosIdDisplay || "-",
          onClick: onOpenExpenseSheet
        }
      ) : null,
      isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ExpenseCurrencyFilterSelect_default,
        {
          label: indT("ExpenseSheets_Field_Currency", "Currency"),
          placeholder: indT("ExpenseSheets_Field_Currency", "Currency"),
          value: draftCurrencyCode,
          onChange: onDraftCurrencyCodeChange,
          invalid: currencyCodeInvalid,
          inputRef: currencyInputRef,
          idBase: "expense-ticket-detail-currency"
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ExpenseReadOnlyField_default,
        {
          label: indT("ExpenseSheets_Field_Currency", "Currency"),
          value: header.currencyCode || "-"
        }
      ),
      isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_TotalAmount", "Total amount") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            ref: totalAmountInputRef,
            className: `form-control${totalAmountInvalid ? " border-rose-400 bg-rose-50 focus:border-rose-400 focus:ring-rose-200" : ""}`,
            value: draftTotalAmount,
            onChange: (event) => onDraftTotalAmountChange(event.target.value || ""),
            onBlur: handleTotalAmountBlur,
            inputMode: "decimal",
            "aria-invalid": totalAmountInvalid ? "true" : "false",
            "aria-label": indT("ExpenseSheets_Field_TotalAmount", "Total amount")
          }
        )
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ExpenseReadOnlyField_default,
        {
          label: indT("ExpenseSheets_Field_TotalAmount", "Total amount"),
          value: totalAmountText || "-"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ExpenseReadOnlyField_default,
        {
          label: indT("Tickets_Field_TicketDate", "Ticket date"),
          value: isEditing ? lockedDraftDateText : displayDateText
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ExpenseReadOnlyField_default,
        {
          label: indT("Tickets_Field_TicketTime", "Ticket time"),
          value: isEditing ? draftTicketTime || ticketTimeText || "-" : ticketTimeText || "-"
        }
      )
    ] }),
    canOpenFile && !hideOpenFileAction ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ExpenseTicketLinkedSheetLineSection = ({
  projectId,
  isEditing,
  isLoading,
  disabled = false,
  errorMessage = "",
  onProjectIdChange
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "space-y-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseSectionDivider_default, { label: indT("ExpenseSheets_Line_Expense", "Expense line"), className: "expense-section-divider--spaced" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-zinc-200 rounded-[var(--radius-xl)]", children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center gap-2 text-sm text-zinc-700", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { className: "ind-spinner size-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
      indT("Common_Loading", "Loading")
    ] }) : errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "text-danger text-sm", children: errorMessage }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ExpenseProjectFilterInput_default,
      {
        label: indT("ExpenseSheets_Field_Project", "Project"),
        placeholder: indT("ExpenseSheets_Filter_Project_Placeholder", "Project id"),
        value: projectId,
        onChange: onProjectIdChange,
        disabled,
        readOnly: disabled
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ExpenseReadOnlyField_default,
      {
        label: indT("ExpenseSheets_Field_Project", "Project"),
        value: projectId || "-"
      }
    ) }) })
  ] });
};
var ExpenseTicketLinkedSheetLineSection_default = ExpenseTicketLinkedSheetLineSection;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseTicketLinesList.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var formatQtyValue = (value) => {
  return formatExpenseNumber(value, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
    fallback: "-"
  });
};
var EMPTY_DATE_PARTS = {
  year: "--",
  month: "--",
  day: "--"
};
var TICKET_LINE_DATE_PANEL_ICON = /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "size-10 text-[#00296be0]",
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M14 3v4a1 1 0 0 0 1 1h4" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M9 7l1 0" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M9 13l6 0" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M13 17l2 0" })
    ]
  }
);
var ExpenseTicketLinesList = ({
  visibleLines,
  totalLinePages,
  linePage,
  currencyCode,
  paginationLabels,
  containerRef,
  onLinePageChange,
  onOpenLine
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "space-y-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseSectionDivider_default, { label: indT("Tickets_Detail_Lines", "Lines"), className: "expense-section-divider--spaced" }),
    visibleLines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "timeline-box timeline-empty", "data-empty-text": indT("Tickets_Detail_NoLines", "No lines for this ticket.") }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { ref: containerRef, className: "timeline-box", children: visibleLines.map((line) => {
      const amountText = formatAmountWithCurrency(line.totalAmount, currencyCode);
      const qtyText = formatQtyValue(line.qty);
      const priceText = formatAmountWithCurrency(line.price, currencyCode);
      const title = line.description || line.recId || "-";
      const primarySubtitleParts = [
        line.adjustmentAmount ? indT("Enum_GastoType_AdjustmentAmount", "Adjustment amount") : "",
        `${indT("ExpenseSheets_Field_Qty", "Quantity")}: ${qtyText}`,
        `${indT("ExpenseSheets_Field_Price", "Price")}: ${priceText}`
      ].filter(Boolean);
      const primarySubtitle = primarySubtitleParts.join("   ");
      const subtitle = primarySubtitle;
      const lineKey = String(line.recId || "").trim() || [line.description, line.totalAmount, line.price, line.qty].map((value) => String(value || "").trim()).join("|");
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "timeline-item", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        ExpenseTimelineCard_default,
        {
          dateParts: EMPTY_DATE_PARTS,
          datePanelContent: TICKET_LINE_DATE_PANEL_ICON,
          title,
          subtitle,
          subtitleClassName: "expense-sheet-card__subtitle expense-line-card__meta text-left",
          amountText,
          onOpen: () => onOpenLine(line.recId),
          titleClassName: "timeline-name expense-line-card__title text-left"
        }
      ) }, lineKey);
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var ExpenseTicketLinesList_default = ExpenseTicketLinesList;

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
        draftTransDate: content.draftTransDate,
        draftTicketTime: content.draftTicketTime,
        draftUrlFile: content.draftUrlFile,
        draftFileName: content.draftFileName,
        onDraftDescriptionChange: content.onDraftDescriptionChange,
        onDraftGastoTypeChange: content.onDraftGastoTypeChange,
        onDraftCurrencyCodeChange: content.onDraftCurrencyCodeChange,
        onDraftTotalAmountChange: content.onDraftTotalAmountChange,
        onOpenFile: content.onOpenFile,
        onOpenExpenseSheet: content.onOpenExpenseSheet,
        hideOpenFileAction: content.showStickyPreview
      }
    ),
    content.linkedLine.visible ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      ExpenseTicketLinkedSheetLineSection_default,
      {
        projectId: content.linkedLine.projectId,
        isEditing: content.isEditing,
        isLoading: content.linkedLine.isLoading,
        disabled: content.linkedLine.disabled,
        errorMessage: content.linkedLine.errorMessage,
        onProjectIdChange: content.linkedLine.onProjectIdChange
      }
    ) : null,
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
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-sm text-zinc-600", children: content.status })
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
        onPointerEnd: preview.onPointerEnd,
        onWheel: preview.onWheel
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
    !content.isLoading && !content.errorMessage && content.header ? content.showStickyPreview ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "grid gap-y-2 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "lg:col-start-2", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "space-y-2 lg:col-start-1 lg:row-start-1", children: detailBody })
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
  const [isLoading, setIsLoading] = (0, import_react8.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react8.useState)("");
  const reloadLine = (0, import_react8.useCallback)(async () => {
    const safeSheetId = safeText(sheetId);
    const safeLineRecId = safeText(lineRecId);
    if (!enabled || !safeSheetId || !safeLineRecId) {
      setLine(null);
      setOriginalProjectId("");
      setDraftProjectId("");
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
        setErrorMessage(response?.Message || indT("ExpenseSheets_LoadError", "Could not load expense sheet detail."));
        return;
      }
      const sheet = selectSheet(response?.Items || [], safeSheetId);
      const selectedLine = sheet ? selectLine(sheet, safeLineRecId) : null;
      if (!selectedLine) {
        setLine(null);
        setOriginalProjectId("");
        setDraftProjectId("");
        setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet was not found."));
        return;
      }
      const projectId = safeText(selectedLine.projId);
      setLine(selectedLine);
      setOriginalProjectId(projectId);
      setDraftProjectId(projectId);
    } catch (error) {
      if (error instanceof ApiFetchError && error.status === 403) {
        onForbidden();
        return;
      }
      setLine(null);
      setOriginalProjectId("");
      setDraftProjectId("");
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
  const resetDraftProjectId = (0, import_react8.useCallback)(() => {
    setDraftProjectId(originalProjectId);
  }, [originalProjectId]);
  const acceptDraftProjectId = (0, import_react8.useCallback)(() => {
    const safeProjectId = safeText(draftProjectId);
    setOriginalProjectId(safeProjectId);
    setDraftProjectId(safeProjectId);
  }, [draftProjectId]);
  return {
    line,
    isLoading,
    errorMessage,
    originalProjectId,
    draftProjectId,
    projectIdChanged,
    setDraftProjectId,
    resetDraftProjectId,
    acceptDraftProjectId,
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
  handlePreviewPointerEnd,
  handlePreviewWheel
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
  onPointerEnd: handlePreviewPointerEnd,
  onWheel: handlePreviewWheel
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
  draftTransDate,
  draftTicketTime,
  draftUrlFile,
  draftFileName,
  setDraftDescription,
  setDraftGastoType,
  setDraftCurrencyCode,
  setDraftTotalAmount,
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
  openLineDetail,
  status
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
  draftTransDate,
  draftTicketTime,
  draftUrlFile,
  draftFileName,
  onDraftDescriptionChange: setDraftDescription,
  onDraftGastoTypeChange: setDraftGastoType,
  onDraftCurrencyCodeChange: setDraftCurrencyCode,
  onDraftTotalAmountChange: setDraftTotalAmount,
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
  onOpenLine: openLineDetail,
  status
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
  const autoEditAttemptedRef = (0, import_react11.useRef)(false);
  (0, import_react11.useEffect)(() => {
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
  const lineContainerRef = (0, import_react11.useRef)(null);
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
  const gastoTypeOptions = (0, import_react11.useMemo)(() => getExpenseGastoTypeOptions(), []);
  const gastoTypeLabelMap = (0, import_react11.useMemo)(() => {
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
  const linkedExpenseSheetId = (0, import_react11.useMemo)(
    () => safeText(ticketReturnContext?.sheetId || contextSheetId || header?.hojaGastosIdDisplay),
    [contextSheetId, header?.hojaGastosIdDisplay, ticketReturnContext]
  );
  const linkedSheetLine = useExpenseTicketLinkedSheetLine({
    enabled: isFromExpenseLine,
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
  const [sheetSyncBlocked, setSheetSyncBlocked] = (0, import_react11.useState)(() => !!readExpenseTicketSheetSyncState(fileId));
  const [sheetSyncBlockedMessage, setSheetSyncBlockedMessage] = (0, import_react11.useState)(
    () => safeText(readExpenseTicketSheetSyncState(fileId)?.message)
  );
  (0, import_react11.useEffect)(() => {
    const syncState = readExpenseTicketSheetSyncState(fileId);
    setSheetSyncBlocked(!!syncState);
    setSheetSyncBlockedMessage(safeText(syncState?.message));
  }, [fileId]);
  const pendingFirstLink = detailOrigin === "sheet-create" && !!safeText(ticketReturnContext?.sheetId || contextSheetId) && !safeText(header?.hojaGastosIdDisplay);
  const sheetWorkflowBlockMessage = pendingFirstLink ? indT("ExpenseTickets_SheetSync_PendingSaveRequired", "Save the ticket before leaving this flow.") : sheetSyncBlockedMessage || indT(
    "ExpenseTickets_SheetSync_RetryRequired",
    "Ticket data changed, but we could not sync the expense line. Save again before leaving."
  );
  const shouldBlockWorkflowExit = pendingFirstLink || sheetSyncBlocked;
  (0, import_react11.useEffect)(() => {
    if (!shouldBlockWorkflowExit) {
      clearExpenseNavigationGuard();
      return;
    }
    setExpenseNavigationGuard({
      active: true,
      message: sheetWorkflowBlockMessage,
      block: true
    });
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [sheetWorkflowBlockMessage, shouldBlockWorkflowExit]);
  (0, import_react11.useEffect)(() => {
    const backButton = document.getElementById("globalBackBtn");
    if (!backButton) return;
    const previousDisabled = backButton.disabled;
    if (pendingFirstLink) {
      backButton.disabled = true;
      backButton.setAttribute("aria-disabled", "true");
    } else if (!previousDisabled) {
      backButton.disabled = false;
      backButton.setAttribute("aria-disabled", "false");
    }
    return () => {
      backButton.disabled = previousDisabled;
      backButton.setAttribute("aria-disabled", previousDisabled ? "true" : "false");
    };
  }, [pendingFirstLink]);
  const { markResetFiltersReturn, clearCachedState } = useExpenseTicketDetailNavigationState({
    fileId,
    detailOrigin,
    headerTransDate: header?.transDate,
    contextLineRecId,
    ticketReturnContext
  });
  const canEditLinkedTicket = !linkedExpenseSheetId || !linkSheetCheckBusy && !linkSheetLocked;
  const allowAssignedDraftEdit = isFromExpenseSheetCreate || !!linkedExpenseSheetId && canEditLinkedTicket;
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
    canOpenSaveConfirm,
    handleEnableEdit,
    handleCancelEdit
  } = useExpenseTicketDetailEditor({
    header,
    lineCount: lines.length,
    pageSize: LINES_PAGE_SIZE,
    canEditTicket: canEditTicket && canEditLinkedTicket,
    isLoading,
    allowAssignedDraftEdit,
    isFromSheetLink,
    onForbidden: showPermissionModal
  });
  const handleEnableEditInContext = (0, import_react11.useCallback)(() => {
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
  const handleCancelEditInContext = (0, import_react11.useCallback)(() => {
    handleCancelEdit();
    linkedSheetLine.resetDraftProjectId();
  }, [handleCancelEdit, linkedSheetLine.resetDraftProjectId]);
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
    handlePreviewPointerEnd,
    handlePreviewWheel
  } = useExpenseTicketDetailPreviewPanel({
    fileId,
    isEditing,
    draftUrlFile,
    headerUrlFile: header?.urlFile
  });
  const visibleLines = (0, import_react11.useMemo)(() => pagedSlice(lines, linePage, LINES_PAGE_SIZE), [linePage, lines]);
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
    currentTotalAmount: header?.totalAmount,
    draftTransDate,
    draftTicketTime,
    draftComentario,
    draftUrlFile,
    draftFileName,
    linkedExpenseSheetId,
    linkedExpenseLineRecId: isFromExpenseLine ? contextLineRecId : "",
    linkedExpenseLineProjectId: linkedSheetLine.draftProjectId,
    linkedExpenseLineProjectIdChanged: isFromExpenseLine && linkedSheetLine.projectIdChanged,
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
  (0, import_react11.useEffect)(() => {
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
  const ticketTopbarActionMode = pendingFirstLink && isEditing ? "save_only" : !canEditTicketInContext && !canDeleteTicketInContext ? "view_only" : "default";
  useExpenseTicketDetailTopbarActions({
    busy,
    modalOpen: modal.open,
    isEditing,
    isLocked: isContextLocked,
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
    bypassWorkflowGuard: shouldBlockWorkflowExit,
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
      handlePreviewPointerEnd,
      handlePreviewWheel
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
      draftTransDate,
      draftTicketTime,
      draftUrlFile,
      draftFileName,
      setDraftDescription,
      setDraftGastoType,
      setDraftCurrencyCode,
      setDraftTotalAmount,
      isFromSheetLink,
      linkedLine: {
        visible: isFromExpenseLine,
        projectId: linkedSheetLine.draftProjectId,
        isLoading: linkedSheetLine.isLoading,
        errorMessage: linkedSheetLine.errorMessage,
        disabled: busy || isContextLocked || linkedSheetLine.isLoading,
        onProjectIdChange: linkedSheetLine.setDraftProjectId
      },
      handleOpenExpenseSheet,
      visibleLines,
      totalLinePages,
      linePage,
      safeCurrencyCode: isEditing ? draftCurrencyCode : safeText(header?.currencyCode),
      paginationLabels,
      lineContainerRef,
      setLinePage,
      openLineDetail,
      status
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
  const fabMenuItems = (0, import_react11.useMemo)(
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFJvdXRlQ29udGV4dC50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5LnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZVNlY3Rpb24udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGluZXNMaXN0LnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL0V4cGVuc2VUaWNrZXREZXRhaWxWaWV3LnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24sIHsgdHlwZSBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCB7IHVzZUF1dGhDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XHJcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xyXG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XHJcbmltcG9ydCB7IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCwgbmF2aWdhdGVUb0V4cGVuc2VVcmwsIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcbmltcG9ydCB7IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VVc2VyIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VNYW5hZ2VkVXNlclNjb3BlLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlR2FzdG9UeXBlT3B0aW9ucyB9IGZyb20gXCIuLi8uLi9jb25zdGFudHMvZXhwZW5zZUdhc3RvVHlwZUNhdGFsb2cudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuaW1wb3J0IHsgYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgcmVhZEV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldExpbmtTaGVldEdhdGUgfSBmcm9tIFwiLi4vdXNlRXhwZW5zZVRpY2tldExpbmtTaGVldEdhdGUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbEVkaXRvciB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3IudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbFJvdXRlQ29udGV4dCB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXkgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsRGlzcGxheS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQ29uZmlybVN0YXRlIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsSW50ZXJhY3Rpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9ucy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldERldGFpbFZpZXcgZnJvbSBcIi4vRXhwZW5zZVRpY2tldERldGFpbFZpZXcudHN4XCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUgfSBmcm9tIFwiLi4vdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb24gfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdQYW5lbCB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWwudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLCBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5cclxuY29uc3QgTElORVNfUEFHRV9TSVpFID0gNjtcblxyXG5jb25zdCBOZXdMaW5lSWNvbiA9ICgpID0+IChcclxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cInNpemUtNVwiPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMyAxOWMzLjMzMyAtMiA1IC00IDUgLTZjMCAtMyAtMSAtMyAtMiAtM3MtMi4wMzIgMS4wODUgLTIgM2MuMDM0IDIuMDQ4IDEuNjU4IDIuODc3IDIuNSA0YzEuNSAyIDIuNSAyLjUgMy41IDFjLjY2NyAtMSAxLjE2NyAtMS44MzMgMS41IC0yLjVjMSAyLjMzMyAyLjMzMyAzLjUgNCAzLjVoMi41XCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTIwIDE3di0xMmMwIC0xLjEyMSAtLjg3OSAtMiAtMiAtMnMtMiAuODc5IC0yIDJ2MTJsMiAybDIgLTJcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTYgN2g0XCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IHBhZ2VkU2xpY2UgPSA8VCw+KGl0ZW1zOiBUW10sIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcik6IFRbXSA9PiB7XHJcbiAgaWYgKCFpdGVtcy5sZW5ndGgpIHJldHVybiBbXTtcclxuICBjb25zdCBzYWZlUGFnZSA9IE1hdGgubWF4KDEsIHBhZ2UpO1xyXG4gIGNvbnN0IHN0YXJ0ID0gKHNhZmVQYWdlIC0gMSkgKiBwYWdlU2l6ZTtcclxuICByZXR1cm4gaXRlbXMuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgcGFnZVNpemUpO1xyXG59O1xyXG5cclxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxyXG5jb25zdCBib290c3RyYXBFeHBlbnNlQXBpQXV0aCA9ICgpID0+IHtcclxuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCh7XHJcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcclxuICAgIGVudHJhT2lkOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxyXG4gICAgYXBwQ29kZTogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZUxpbmtlZFRpY2tldEJsb2NrZWRNZXNzYWdlID0gKGlzUGFpZDogYm9vbGVhbik6IHN0cmluZyA9PiB7XG4gIGlmIChpc1BhaWQpIHtcclxuICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUGFpZFJlYWRPbmx5XCIsIFwiTGFzIGhvamFzIGRlIGdhc3RvIHBhZ2FkYXMgc29uIGRlIHNvbG8gbGVjdHVyYS5cIik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1JlYWRPbmx5QnlTdGF0dXNcIiwgXCJObyBzZSBwdWVkZSBlZGl0YXIgZXN0YSBob2phIGRlIGdhc3RvcyBlbiBlbCBlc3RhZG8gYWN0dWFsLlwiKTtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbE1vZGFsVmlldyA9ICh7XHJcbiAgbW9kYWwsXHJcbiAgbW9kYWxDb25maXJtVGV4dCxcclxuICBtb2RhbENhbmNlbFRleHQsXHJcbiAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICBidXN5LFxyXG4gIG1vZGFsRXJyb3IsXHJcbiAgc3RhdHVzLFxyXG4gIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcclxuICBjbG9zZUNvbmZpcm0sXHJcbn06IHtcclxuICBtb2RhbDoge1xyXG4gICAgb3BlbjogYm9vbGVhbjtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBzaG93Q2FuY2VsOiBib29sZWFuO1xyXG4gICAgc2hvd0NvbmZpcm06IGJvb2xlYW47XHJcbiAgfTtcclxuICBtb2RhbENvbmZpcm1UZXh0OiBzdHJpbmc7XHJcbiAgbW9kYWxDYW5jZWxUZXh0OiBzdHJpbmc7XHJcbiAgbW9kYWxMb2FkaW5nVGV4dDogc3RyaW5nO1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxFcnJvcjogc3RyaW5nO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybTogKCkgPT4gdm9pZDtcclxuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbn0pID0+ICh7XHJcbiAgb3BlbjogbW9kYWwub3BlbixcclxuICB0aXRsZTogbW9kYWwudGl0bGUsXHJcbiAgbWVzc2FnZTogbW9kYWwubWVzc2FnZSxcclxuICBjb25maXJtVGV4dDogbW9kYWxDb25maXJtVGV4dCxcclxuICBjYW5jZWxUZXh0OiBtb2RhbENhbmNlbFRleHQsXHJcbiAgbG9hZGluZ1RleHQ6IG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgc2hvd0NhbmNlbDogbW9kYWwuc2hvd0NhbmNlbCxcclxuICBzaG93Q29uZmlybTogbW9kYWwuc2hvd0NvbmZpcm0sXHJcbiAgYnVzeSxcclxuICBlcnJvcjogbW9kYWxFcnJvcixcclxuICBzdGF0dXMsXHJcbiAgb25Db25maXJtOiBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgb25DYW5jZWw6IGNsb3NlQ29uZmlybSxcclxufSk7XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3VmlldyA9ICh7XHJcbiAgcHJldmlld09wZW4sXHJcbiAgcHJldmlld0J1c3ksXHJcbiAgcHJldmlld0Vycm9yLFxyXG4gIHByZXZpZXdJbWFnZVVybCxcclxuICBwcmV2aWV3QWx0VGV4dCxcclxuICBwcmV2aWV3U2NhbGUsXHJcbiAgcHJldmlld1RyYW5zbGF0ZSxcclxuICBwcmV2aWV3U3VyZmFjZVJlZixcclxuICBjbG9zZVByZXZpZXcsXHJcbiAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcclxuICBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxuICBoYW5kbGVQcmV2aWV3V2hlZWwsXHJcbn06IHtcclxuICBwcmV2aWV3T3BlbjogYm9vbGVhbjtcclxuICBwcmV2aWV3QnVzeTogYm9vbGVhbjtcclxuICBwcmV2aWV3RXJyb3I6IHN0cmluZztcclxuICBwcmV2aWV3SW1hZ2VVcmw6IHN0cmluZztcclxuICBwcmV2aWV3QWx0VGV4dDogc3RyaW5nO1xyXG4gIHByZXZpZXdTY2FsZTogbnVtYmVyO1xyXG4gIHByZXZpZXdUcmFuc2xhdGU6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfTtcclxuICBwcmV2aWV3U3VyZmFjZVJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgY2xvc2VQcmV2aWV3OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bjogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZTogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgaGFuZGxlUHJldmlld1doZWVsOiAoZXZlbnQ6IFJlYWN0LldoZWVsRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG59KSA9PiAoe1xyXG4gIG9wZW46IHByZXZpZXdPcGVuLFxyXG4gIGJ1c3k6IHByZXZpZXdCdXN5LFxyXG4gIGVycm9yOiBwcmV2aWV3RXJyb3IsXHJcbiAgaW1hZ2VVcmw6IHByZXZpZXdJbWFnZVVybCxcclxuICBpbWFnZUFsdDogcHJldmlld0FsdFRleHQsXHJcbiAgc2NhbGU6IHByZXZpZXdTY2FsZSxcclxuICB0cmFuc2xhdGU6IHByZXZpZXdUcmFuc2xhdGUsXHJcbiAgc3VyZmFjZVJlZjogcHJldmlld1N1cmZhY2VSZWYsXHJcbiAgb25DbG9zZTogY2xvc2VQcmV2aWV3LFxyXG4gIG9uUG9pbnRlckRvd246IGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcclxuICBvblBvaW50ZXJNb3ZlOiBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXHJcbiAgb25Qb2ludGVyRW5kOiBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxuICBvbldoZWVsOiBoYW5kbGVQcmV2aWV3V2hlZWwsXHJcbn0pO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lVmlldyA9IHtcclxuICB2aXNpYmxlOiBib29sZWFuO1xyXG4gIHByb2plY3RJZDogc3RyaW5nO1xyXG4gIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICBkaXNhYmxlZDogYm9vbGVhbjtcclxuICBvblByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxDb250ZW50VmlldyA9ICh7XHJcbiAgaXNMb2FkaW5nLFxyXG4gIGVycm9yTWVzc2FnZSxcclxuICBoZWFkZXIsXHJcbiAgc2hvd1N0aWNreVByZXZpZXcsXHJcbiAgcHJldmlld0J1c3ksXHJcbiAgcHJldmlld0Vycm9yLFxyXG4gIHByZXZpZXdJbWFnZVVybCxcclxuICBwcmV2aWV3QWx0VGV4dCxcclxuICBvcGVuRmlsZSxcclxuICBzdGF0dXNMYWJlbCxcclxuICBnYXN0b1R5cGVMYWJlbCxcclxuICB0b3RhbEFtb3VudFRleHQsXHJcbiAgdHJhbnNEYXRlVGV4dCxcclxuICB0aWNrZXRUaW1lVGV4dCxcclxuICBpc0VkaXRpbmcsXHJcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICBkZXNjcmlwdGlvbklucHV0UmVmLFxyXG4gIGRyYWZ0R2FzdG9UeXBlLFxuICBnYXN0b1R5cGVJbnZhbGlkLFxuICBnYXN0b1R5cGVJbnB1dFJlZixcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gIGN1cnJlbmN5Q29kZUludmFsaWQsXG4gIGN1cnJlbmN5SW5wdXRSZWYsXG4gIGRyYWZ0VG90YWxBbW91bnQsXG4gIHRvdGFsQW1vdW50SW52YWxpZCxcbiAgdG90YWxBbW91bnRJbnB1dFJlZixcbiAgZHJhZnRUcmFuc0RhdGUsXG4gIGRyYWZ0VGlja2V0VGltZSxcbiAgZHJhZnRVcmxGaWxlLFxuICBkcmFmdEZpbGVOYW1lLFxuICBzZXREcmFmdERlc2NyaXB0aW9uLFxuICBzZXREcmFmdEdhc3RvVHlwZSxcbiAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXG4gIHNldERyYWZ0VG90YWxBbW91bnQsXG4gIGlzRnJvbVNoZWV0TGluayxcbiAgbGlua2VkTGluZSxcbiAgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCxcbiAgdmlzaWJsZUxpbmVzLFxyXG4gIHRvdGFsTGluZVBhZ2VzLFxyXG4gIGxpbmVQYWdlLFxyXG4gIHNhZmVDdXJyZW5jeUNvZGUsXHJcbiAgcGFnaW5hdGlvbkxhYmVscyxcclxuICBsaW5lQ29udGFpbmVyUmVmLFxyXG4gIHNldExpbmVQYWdlLFxyXG4gIG9wZW5MaW5lRGV0YWlsLFxyXG4gIHN0YXR1cyxcclxufToge1xyXG4gIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xyXG4gIHNob3dTdGlja3lQcmV2aWV3OiBib29sZWFuO1xyXG4gIHByZXZpZXdCdXN5OiBib29sZWFuO1xyXG4gIHByZXZpZXdFcnJvcjogc3RyaW5nO1xyXG4gIHByZXZpZXdJbWFnZVVybDogc3RyaW5nO1xyXG4gIHByZXZpZXdBbHRUZXh0OiBzdHJpbmc7XHJcbiAgb3BlbkZpbGU6ICgpID0+IHZvaWQ7XHJcbiAgc3RhdHVzTGFiZWw6IHN0cmluZztcclxuICBnYXN0b1R5cGVMYWJlbDogc3RyaW5nO1xyXG4gIHRvdGFsQW1vdW50VGV4dDogc3RyaW5nO1xyXG4gIHRyYW5zRGF0ZVRleHQ6IHN0cmluZztcclxuICB0aWNrZXRUaW1lVGV4dDogc3RyaW5nO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBnYXN0b1R5cGVPcHRpb25zOiBFeHBlbnNlU2VsZWN0T3B0aW9uW107XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uSW52YWxpZDogYm9vbGVhbjtcclxuICBkZXNjcmlwdGlvbklucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIGRyYWZ0R2FzdG9UeXBlOiBzdHJpbmc7XG4gIGdhc3RvVHlwZUludmFsaWQ6IGJvb2xlYW47XG4gIGdhc3RvVHlwZUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBjdXJyZW5jeUNvZGVJbnZhbGlkOiBib29sZWFuO1xuICBjdXJyZW5jeUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xuICBkcmFmdFRvdGFsQW1vdW50OiBzdHJpbmc7XG4gIHRvdGFsQW1vdW50SW52YWxpZDogYm9vbGVhbjtcbiAgdG90YWxBbW91bnRJbnB1dFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcbiAgZHJhZnRUcmFuc0RhdGU6IHN0cmluZztcbiAgZHJhZnRUaWNrZXRUaW1lOiBzdHJpbmc7XG4gIGRyYWZ0VXJsRmlsZTogc3RyaW5nO1xuICBkcmFmdEZpbGVOYW1lOiBzdHJpbmc7XG4gIHNldERyYWZ0RGVzY3JpcHRpb246ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXREcmFmdEdhc3RvVHlwZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldERyYWZ0Q3VycmVuY3lDb2RlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0RHJhZnRUb3RhbEFtb3VudDogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGlzRnJvbVNoZWV0TGluazogYm9vbGVhbjtcbiAgbGlua2VkTGluZTogRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZVZpZXc7XG4gIGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQ6ICgpID0+IHZvaWQ7XG4gIHZpc2libGVMaW5lczogRXhwZW5zZVRpY2tldERldGFpbExpbmVbXTtcclxuICB0b3RhbExpbmVQYWdlczogbnVtYmVyO1xyXG4gIGxpbmVQYWdlOiBudW1iZXI7XHJcbiAgc2FmZUN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIHBhZ2luYXRpb25MYWJlbHM6IHtcclxuICAgIGZpcnN0OiBzdHJpbmc7XHJcbiAgICBwcmV2OiBzdHJpbmc7XHJcbiAgICBuZXh0OiBzdHJpbmc7XHJcbiAgICBsYXN0OiBzdHJpbmc7XHJcbiAgfTtcclxuICBsaW5lQ29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBzZXRMaW5lUGFnZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcclxuICBvcGVuTGluZURldGFpbDogKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG59KSA9PiAoe1xyXG4gIGlzTG9hZGluZyxcclxuICBlcnJvck1lc3NhZ2UsXHJcbiAgaGVhZGVyLFxyXG4gIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gIHByZXZpZXdCdXN5LFxyXG4gIHByZXZpZXdFcnJvcixcclxuICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgcHJldmlld0ZpbGVOYW1lOiBwcmV2aWV3QWx0VGV4dCxcclxuICBwcmV2aWV3QWx0VGV4dCxcclxuICBvbk9wZW5QcmV2aWV3OiBvcGVuRmlsZSxcclxuICBzdGF0dXNMYWJlbCxcclxuICBnYXN0b1R5cGVMYWJlbCxcclxuICB0b3RhbEFtb3VudFRleHQsXHJcbiAgdHJhbnNEYXRlVGV4dCxcclxuICB0aWNrZXRUaW1lVGV4dCxcclxuICBpc0VkaXRpbmcsXHJcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICBkZXNjcmlwdGlvbklucHV0UmVmLFxyXG4gIGRyYWZ0R2FzdG9UeXBlLFxuICBnYXN0b1R5cGVJbnZhbGlkLFxuICBnYXN0b1R5cGVJbnB1dFJlZixcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gIGN1cnJlbmN5Q29kZUludmFsaWQsXG4gIGN1cnJlbmN5SW5wdXRSZWYsXG4gIGRyYWZ0VG90YWxBbW91bnQsXG4gIHRvdGFsQW1vdW50SW52YWxpZCxcbiAgdG90YWxBbW91bnRJbnB1dFJlZixcbiAgZHJhZnRUcmFuc0RhdGUsXG4gIGRyYWZ0VGlja2V0VGltZSxcbiAgZHJhZnRVcmxGaWxlLFxuICBkcmFmdEZpbGVOYW1lLFxuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U6IHNldERyYWZ0RGVzY3JpcHRpb24sXG4gIG9uRHJhZnRHYXN0b1R5cGVDaGFuZ2U6IHNldERyYWZ0R2FzdG9UeXBlLFxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiBzZXREcmFmdEN1cnJlbmN5Q29kZSxcbiAgb25EcmFmdFRvdGFsQW1vdW50Q2hhbmdlOiBzZXREcmFmdFRvdGFsQW1vdW50LFxuICBvbk9wZW5GaWxlOiBvcGVuRmlsZSxcbiAgb25PcGVuRXhwZW5zZVNoZWV0OiBpc0Zyb21TaGVldExpbmsgPyB1bmRlZmluZWQgOiBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0LFxuICBsaW5rZWRMaW5lLFxyXG4gIHZpc2libGVMaW5lcyxcclxuICB0b3RhbExpbmVQYWdlcyxcclxuICBsaW5lUGFnZSxcclxuICBjdXJyZW5jeUNvZGU6IHNhZmVDdXJyZW5jeUNvZGUsXHJcbiAgcGFnaW5hdGlvbkxhYmVscyxcclxuICBjb250YWluZXJSZWY6IGxpbmVDb250YWluZXJSZWYsXHJcbiAgb25MaW5lUGFnZUNoYW5nZTogc2V0TGluZVBhZ2UsXHJcbiAgb25PcGVuTGluZTogb3BlbkxpbmVEZXRhaWwsXHJcbiAgc3RhdHVzLFxyXG59KTtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldERldGFpbE1vZGFsVmlld0FyZ3MgPSBQYXJhbWV0ZXJzPHR5cGVvZiBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxNb2RhbFZpZXc+WzBdO1xyXG50eXBlIEV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3Vmlld0FyZ3MgPSBQYXJhbWV0ZXJzPHR5cGVvZiBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3Vmlldz5bMF07XHJcbnR5cGUgRXhwZW5zZVRpY2tldERldGFpbENvbnRlbnRWaWV3QXJncyA9IFBhcmFtZXRlcnM8dHlwZW9mIGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbENvbnRlbnRWaWV3PlswXTtcclxuXHJcbmNvbnN0IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbFBhZ2VWaWV3TW9kZWwgPSAoe1xyXG4gIG1vZGFsQXJncyxcclxuICBwcmV2aWV3QXJncyxcclxuICBjb250ZW50QXJncyxcclxufToge1xyXG4gIG1vZGFsQXJnczogRXhwZW5zZVRpY2tldERldGFpbE1vZGFsVmlld0FyZ3M7XHJcbiAgcHJldmlld0FyZ3M6IEV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3Vmlld0FyZ3M7XHJcbiAgY29udGVudEFyZ3M6IEV4cGVuc2VUaWNrZXREZXRhaWxDb250ZW50Vmlld0FyZ3M7XHJcbn0pID0+ICh7XHJcbiAgbW9kYWw6IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbE1vZGFsVmlldyhtb2RhbEFyZ3MpLFxyXG4gIHByZXZpZXc6IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3KHByZXZpZXdBcmdzKSxcclxuICBjb250ZW50OiBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxDb250ZW50Vmlldyhjb250ZW50QXJncyksXHJcbn0pO1xyXG5cclxuLy8gS2VlcHMgZmlsdGVyIGNhY2hlIHdpcmluZyBhbmQgYmFjayBuYXZpZ2F0aW9uIG91dHNpZGUgdGhlIHBhZ2UgY29udGFpbmVyIGJvZHkuXHJcbmNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxOYXZpZ2F0aW9uU3RhdGUgPSAoe1xyXG4gIGZpbGVJZCxcclxuICBkZXRhaWxPcmlnaW4sXHJcbiAgaGVhZGVyVHJhbnNEYXRlLFxyXG4gIGNvbnRleHRMaW5lUmVjSWQsXHJcbiAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxufToge1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGRldGFpbE9yaWdpbjogc3RyaW5nO1xyXG4gIGhlYWRlclRyYW5zRGF0ZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcclxuICBjb250ZXh0TGluZVJlY0lkOiBzdHJpbmc7XHJcbiAgdGlja2V0UmV0dXJuQ29udGV4dDogUmV0dXJuVHlwZTx0eXBlb2YgdXNlRXhwZW5zZVRpY2tldERldGFpbFJvdXRlQ29udGV4dD5bXCJ0aWNrZXRSZXR1cm5Db250ZXh0XCJdO1xyXG59KSA9PiB7XHJcbiAgY29uc3QgeyByZWFkQ2FjaGVkU3RhdGUsIHNhdmVDYWNoZWRTdGF0ZSwgbWFya1Jlc2V0RmlsdGVyc1JldHVybiwgY2xlYXJDYWNoZWRTdGF0ZSB9ID0gdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZSgpO1xyXG5cclxuICB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb24oe1xyXG4gICAgZmlsZUlkLFxyXG4gICAgZGV0YWlsT3JpZ2luLFxyXG4gICAgaGVhZGVyVHJhbnNEYXRlLFxyXG4gICAgY29udGV4dExpbmVSZWNJZCxcclxuICAgIHRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgICByZWFkQ2FjaGVkU3RhdGUsXHJcbiAgICBzYXZlQ2FjaGVkU3RhdGUsXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBtYXJrUmVzZXRGaWx0ZXJzUmV0dXJuLFxyXG4gICAgY2xlYXJDYWNoZWRTdGF0ZSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gUnVucyB0aGUgb25lLXNob3QgYXV0byBlZGl0IHRyYW5zaXRpb24gZm9yIGxpbmtlZCBjb250ZXh0cyBhZnRlciBkZXRhaWwgZGF0YSBpcyByZWFkeS5cclxuY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbEF1dG9FZGl0ID0gKHtcclxuICBhdXRvRWRpdE1vZGUsXHJcbiAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gIGlzTG9hZGluZyxcclxuICBoZWFkZXIsXHJcbiAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICBjYW5BdHRlbXB0QXV0b0VkaXQsXHJcbn06IHtcclxuICBhdXRvRWRpdE1vZGU6IGJvb2xlYW47XHJcbiAgaXNGcm9tU2hlZXRMaW5rOiBib29sZWFuO1xyXG4gIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xyXG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgY2FuQXR0ZW1wdEF1dG9FZGl0OiBib29sZWFuO1xyXG59KSA9PiB7XHJcbiAgY29uc3QgYXV0b0VkaXRBdHRlbXB0ZWRSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFhdXRvRWRpdE1vZGUgfHwgaXNGcm9tU2hlZXRMaW5rIHx8IGF1dG9FZGl0QXR0ZW1wdGVkUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgIGlmIChpc0xvYWRpbmcgfHwgIWhlYWRlciB8fCAhY2FuQXR0ZW1wdEF1dG9FZGl0KSByZXR1cm47XHJcblxyXG4gICAgYXV0b0VkaXRBdHRlbXB0ZWRSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICBoYW5kbGVFbmFibGVFZGl0KCk7XHJcbiAgfSwgW2F1dG9FZGl0TW9kZSwgY2FuQXR0ZW1wdEF1dG9FZGl0LCBoYW5kbGVFbmFibGVFZGl0LCBoZWFkZXIsIGlzRnJvbVNoZWV0TGluaywgaXNMb2FkaW5nXSk7XHJcbn07XHJcblxyXG4vLyBSZXNvbHZlcyBwZXJtaXNzaW9uIGFuZCBhY3RpbmctdXNlciBzdGF0ZSBzbyB0aGUgcGFnZSBjb250YWluZXIgc3RheXMgZm9jdXNlZCBvbiBvcmNoZXN0cmF0aW9uLlxyXG5jb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUGVybWlzc2lvblN0YXRlID0gKCkgPT4ge1xyXG4gIGNvbnN0IHtcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICB9ID0gdXNlQXV0aENvbnRleHQoKTtcclxuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIlZpZXdcIik7XHJcbiAgY29uc3QgY2FuRWRpdFRpY2tldEJ5TW9kdWxlID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJFZGl0XCIpO1xyXG4gIGNvbnN0IGNhbkRlbGV0ZVRpY2tldEJ5TW9kdWxlID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJGdWxsQWNjZXNzXCIpO1xyXG4gIGNvbnN0IGlzTWFuYWdpbmdPdGhlclVzZXIgPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlVXNlcih7XHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGFzQWNjZXNzLFxyXG4gICAgY2FuRWRpdFRpY2tldDogY2FuRWRpdFRpY2tldEJ5TW9kdWxlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgY2FuRGVsZXRlVGlja2V0OiBjYW5EZWxldGVUaWNrZXRCeU1vZHVsZSAmJiAhaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIGlzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIE93bnMgdGhlIHRpY2tldCBkZXRhaWwgcGFnZSBvcmNoZXN0cmF0aW9uIHdoaWxlIHRoZSBjb21wb25lbnQgc3RheXMgdGhpbiBmb3IgcmVuZGVyaW5nLlxyXG5jb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUGFnZVZpZXdNb2RlbCA9ICgpID0+IHtcclxuICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1RJQ0tFVF9GSUxFX0lEX18pO1xyXG4gIGNvbnN0IGxpbmVDb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCB7XHJcbiAgICBhdXRvRWRpdE1vZGUsXHJcbiAgICBkZXRhaWxPcmlnaW4sXHJcbiAgICBjb250ZXh0U2hlZXRJZCxcclxuICAgIGNvbnRleHRMaW5lUmVjSWQsXHJcbiAgICBpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUsXHJcbiAgICBpc0Zyb21FeHBlbnNlTGluZSxcclxuICAgIGlzRnJvbVNoZWV0TGluayxcclxuICAgIHRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQoKTtcclxuICBjb25zdCB7XHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBjYW5FZGl0VGlja2V0LFxyXG4gICAgY2FuRGVsZXRlVGlja2V0LFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUGVybWlzc2lvblN0YXRlKCk7XHJcbiAgY29uc3QgZ2FzdG9UeXBlT3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiBnZXRFeHBlbnNlR2FzdG9UeXBlT3B0aW9ucygpLCBbXSk7XG4gIGNvbnN0IGdhc3RvVHlwZUxhYmVsTWFwID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xyXG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgZ2FzdG9UeXBlT3B0aW9ucykge1xyXG4gICAgICBtYXAuc2V0KFN0cmluZyhvcHRpb24udmFsdWUpLCBvcHRpb24udGV4dCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWFwO1xyXG4gIH0sIFtnYXN0b1R5cGVPcHRpb25zXSk7XHJcbiAgY29uc3QgeyBoZWFkZXIsIGxpbmVzLCBpc0xvYWRpbmcsIGVycm9yTWVzc2FnZSwgcmVsb2FkRGV0YWlsIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUoe1xyXG4gICAgaGFzQWNjZXNzLFxyXG4gICAgZmlsZUlkLFxyXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXHJcbiAgfSk7XHJcbiAgY29uc3QgbGlua2VkRXhwZW5zZVNoZWV0SWQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gc2FmZVRleHQodGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCB8fCBjb250ZXh0U2hlZXRJZCB8fCBoZWFkZXI/LmhvamFHYXN0b3NJZERpc3BsYXkpLFxyXG4gICAgW2NvbnRleHRTaGVldElkLCBoZWFkZXI/LmhvamFHYXN0b3NJZERpc3BsYXksIHRpY2tldFJldHVybkNvbnRleHRdXHJcbiAgKTtcclxuICBjb25zdCBsaW5rZWRTaGVldExpbmUgPSB1c2VFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lKHtcclxuICAgIGVuYWJsZWQ6IGlzRnJvbUV4cGVuc2VMaW5lLFxyXG4gICAgc2hlZXRJZDogbGlua2VkRXhwZW5zZVNoZWV0SWQsXHJcbiAgICBsaW5lUmVjSWQ6IGNvbnRleHRMaW5lUmVjSWQsXHJcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICB9KTtcclxuICBjb25zdCB7XHJcbiAgICBsaW5rU2hlZXRMb2NrZWQsXHJcbiAgICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZSxcclxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcclxuICB9ID0gdXNlRXhwZW5zZVRpY2tldExpbmtTaGVldEdhdGUoe1xyXG4gICAgaXNMaW5rTW9kZTogISFsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICAgIGxpbmtTaGVldElkOiBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICAgIGNhblByb2Nlc3NMaW5rTW9kZTogdHJ1ZSxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHJlc29sdmVCbG9ja2VkTWVzc2FnZTogcmVzb2x2ZUxpbmtlZFRpY2tldEJsb2NrZWRNZXNzYWdlLFxyXG4gIH0pO1xyXG4gIGNvbnN0IFtzaGVldFN5bmNCbG9ja2VkLCBzZXRTaGVldFN5bmNCbG9ja2VkXSA9IHVzZVN0YXRlKCgpID0+ICEhcmVhZEV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZShmaWxlSWQpKTtcclxuICBjb25zdCBbc2hlZXRTeW5jQmxvY2tlZE1lc3NhZ2UsIHNldFNoZWV0U3luY0Jsb2NrZWRNZXNzYWdlXSA9IHVzZVN0YXRlKCgpID0+XHJcbiAgICBzYWZlVGV4dChyZWFkRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKGZpbGVJZCk/Lm1lc3NhZ2UpXHJcbiAgKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHN5bmNTdGF0ZSA9IHJlYWRFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoZmlsZUlkKTtcclxuICAgIHNldFNoZWV0U3luY0Jsb2NrZWQoISFzeW5jU3RhdGUpO1xyXG4gICAgc2V0U2hlZXRTeW5jQmxvY2tlZE1lc3NhZ2Uoc2FmZVRleHQoc3luY1N0YXRlPy5tZXNzYWdlKSk7XHJcbiAgfSwgW2ZpbGVJZF0pO1xyXG5cclxuICBjb25zdCBwZW5kaW5nRmlyc3RMaW5rID1cclxuICAgIGRldGFpbE9yaWdpbiA9PT0gXCJzaGVldC1jcmVhdGVcIiAmJiAhIXNhZmVUZXh0KHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQgfHwgY29udGV4dFNoZWV0SWQpICYmICFzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZERpc3BsYXkpO1xyXG4gIGNvbnN0IHNoZWV0V29ya2Zsb3dCbG9ja01lc3NhZ2UgPSBwZW5kaW5nRmlyc3RMaW5rXHJcbiAgICA/IGluZFQoXCJFeHBlbnNlVGlja2V0c19TaGVldFN5bmNfUGVuZGluZ1NhdmVSZXF1aXJlZFwiLCBcIlNhdmUgdGhlIHRpY2tldCBiZWZvcmUgbGVhdmluZyB0aGlzIGZsb3cuXCIpXHJcbiAgICA6IHNoZWV0U3luY0Jsb2NrZWRNZXNzYWdlIHx8XHJcbiAgICAgIGluZFQoXHJcbiAgICAgICAgXCJFeHBlbnNlVGlja2V0c19TaGVldFN5bmNfUmV0cnlSZXF1aXJlZFwiLFxyXG4gICAgICAgIFwiVGlja2V0IGRhdGEgY2hhbmdlZCwgYnV0IHdlIGNvdWxkIG5vdCBzeW5jIHRoZSBleHBlbnNlIGxpbmUuIFNhdmUgYWdhaW4gYmVmb3JlIGxlYXZpbmcuXCJcclxuICAgICAgKTtcclxuICBjb25zdCBzaG91bGRCbG9ja1dvcmtmbG93RXhpdCA9IHBlbmRpbmdGaXJzdExpbmsgfHwgc2hlZXRTeW5jQmxvY2tlZDtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghc2hvdWxkQmxvY2tXb3JrZmxvd0V4aXQpIHtcclxuICAgICAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKHtcclxuICAgICAgYWN0aXZlOiB0cnVlLFxyXG4gICAgICBtZXNzYWdlOiBzaGVldFdvcmtmbG93QmxvY2tNZXNzYWdlLFxyXG4gICAgICBibG9jazogdHJ1ZSxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtzaGVldFdvcmtmbG93QmxvY2tNZXNzYWdlLCBzaG91bGRCbG9ja1dvcmtmbG93RXhpdF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgYmFja0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsQmFja0J0blwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XHJcbiAgICBpZiAoIWJhY2tCdXR0b24pIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBwcmV2aW91c0Rpc2FibGVkID0gYmFja0J1dHRvbi5kaXNhYmxlZDtcclxuICAgIGlmIChwZW5kaW5nRmlyc3RMaW5rKSB7XHJcbiAgICAgIGJhY2tCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICBiYWNrQnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xyXG4gICAgfSBlbHNlIGlmICghcHJldmlvdXNEaXNhYmxlZCkge1xyXG4gICAgICBiYWNrQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgIGJhY2tCdXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCBcImZhbHNlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGJhY2tCdXR0b24uZGlzYWJsZWQgPSBwcmV2aW91c0Rpc2FibGVkO1xyXG4gICAgICBiYWNrQnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgcHJldmlvdXNEaXNhYmxlZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiKTtcclxuICAgIH07XHJcbiAgfSwgW3BlbmRpbmdGaXJzdExpbmtdKTtcclxuXHJcbiAgY29uc3QgeyBtYXJrUmVzZXRGaWx0ZXJzUmV0dXJuLCBjbGVhckNhY2hlZFN0YXRlIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsTmF2aWdhdGlvblN0YXRlKHtcclxuICAgIGZpbGVJZCxcclxuICAgIGRldGFpbE9yaWdpbixcclxuICAgIGhlYWRlclRyYW5zRGF0ZTogaGVhZGVyPy50cmFuc0RhdGUsXHJcbiAgICBjb250ZXh0TGluZVJlY0lkLFxyXG4gICAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxuICB9KTtcclxuICBjb25zdCBjYW5FZGl0TGlua2VkVGlja2V0ID0gIWxpbmtlZEV4cGVuc2VTaGVldElkIHx8ICghbGlua1NoZWV0Q2hlY2tCdXN5ICYmICFsaW5rU2hlZXRMb2NrZWQpO1xyXG4gIGNvbnN0IGFsbG93QXNzaWduZWREcmFmdEVkaXQgPSBpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUgfHwgKCEhbGlua2VkRXhwZW5zZVNoZWV0SWQgJiYgY2FuRWRpdExpbmtlZFRpY2tldCk7XHJcbiAgY29uc3Qge1xyXG4gICAgYnVzeSxcclxuICAgIHN0YXR1cyxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG1vZGFsRXJyb3IsXHJcbiAgICBsaW5lUGFnZSxcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkZXNjcmlwdGlvbkludmFsaWQsXHJcbiAgICBkZXNjcmlwdGlvbklucHV0UmVmLFxyXG4gICAgZHJhZnRHYXN0b1R5cGUsXG4gICAgZ2FzdG9UeXBlSW52YWxpZCxcbiAgICBnYXN0b1R5cGVJbnB1dFJlZixcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBjdXJyZW5jeUNvZGVJbnZhbGlkLFxuICAgIGN1cnJlbmN5SW5wdXRSZWYsXG4gICAgZHJhZnRUb3RhbEFtb3VudCxcbiAgICB0b3RhbEFtb3VudEludmFsaWQsXG4gICAgdG90YWxBbW91bnRJbnB1dFJlZixcbiAgICBkcmFmdFRyYW5zRGF0ZSxcbiAgICBkcmFmdFRpY2tldFRpbWUsXG4gICAgZHJhZnRDb21lbnRhcmlvLFxuICAgIGRyYWZ0VXJsRmlsZSxcbiAgICBkcmFmdEZpbGVOYW1lLFxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxuICAgIHNldERyYWZ0R2FzdG9UeXBlLFxuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIHNldERyYWZ0VG90YWxBbW91bnQsXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yKHtcclxuICAgIGhlYWRlcixcclxuICAgIGxpbmVDb3VudDogbGluZXMubGVuZ3RoLFxyXG4gICAgcGFnZVNpemU6IExJTkVTX1BBR0VfU0laRSxcclxuICAgIGNhbkVkaXRUaWNrZXQ6IGNhbkVkaXRUaWNrZXQgJiYgY2FuRWRpdExpbmtlZFRpY2tldCxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGFsbG93QXNzaWduZWREcmFmdEVkaXQsXHJcbiAgICBpc0Zyb21TaGVldExpbmssXHJcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICB9KTtcclxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0SW5Db250ZXh0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGxpbmtTaGVldENoZWNrQnVzeSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxpbmtlZEV4cGVuc2VTaGVldElkICYmIGxpbmtTaGVldExvY2tlZCkge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID1cclxuICAgICAgICBzYWZlVGV4dChsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZSkgfHxcclxuICAgICAgICByZXNvbHZlTGlua2VkVGlja2V0QmxvY2tlZE1lc3NhZ2UoZmFsc2UpO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0KCk7XHJcbiAgfSwgW1xyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlLFxyXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gICAgbGlua1NoZWV0TG9ja2VkLFxyXG4gICAgbGlua2VkRXhwZW5zZVNoZWV0SWQsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gIF0pO1xyXG4gIGNvbnN0IGhhbmRsZUNhbmNlbEVkaXRJbkNvbnRleHQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0KCk7XHJcbiAgICBsaW5rZWRTaGVldExpbmUucmVzZXREcmFmdFByb2plY3RJZCgpO1xyXG4gIH0sIFtoYW5kbGVDYW5jZWxFZGl0LCBsaW5rZWRTaGVldExpbmUucmVzZXREcmFmdFByb2plY3RJZF0pO1xyXG4gIGNvbnN0IHsgcGFnaW5hdGlvbkxhYmVscywgcHJldmlld0FsdFRleHQsIHN0YXR1c0xhYmVsLCBnYXN0b1R5cGVMYWJlbCwgdG90YWxBbW91bnRUZXh0LCB0cmFuc0RhdGVUZXh0LCB0aWNrZXRUaW1lVGV4dCB9ID1cclxuICAgIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5KHtcclxuICAgICAgaGVhZGVyLFxuICAgICAgZHJhZnRHYXN0b1R5cGUsXG4gICAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICAgIGRyYWZ0VG90YWxBbW91bnQsXG4gICAgICBkcmFmdFRyYW5zRGF0ZSxcbiAgICAgIGRyYWZ0VGlja2V0VGltZSxcbiAgICAgIGRyYWZ0RmlsZU5hbWUsXG4gICAgICBpc0VkaXRpbmcsXG4gICAgICBnYXN0b1R5cGVMYWJlbE1hcCxcbiAgICB9KTtcclxuICBjb25zdCB7XHJcbiAgICBzaG93U3RpY2t5UHJldmlldyxcclxuICAgIHByZXZpZXdPcGVuLFxyXG4gICAgcHJldmlld0J1c3ksXHJcbiAgICBwcmV2aWV3RXJyb3IsXHJcbiAgICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgICBwcmV2aWV3U2NhbGUsXHJcbiAgICBwcmV2aWV3VHJhbnNsYXRlLFxyXG4gICAgcHJldmlld1N1cmZhY2VSZWYsXHJcbiAgICBvcGVuUHJldmlldyxcclxuICAgIGNsb3NlUHJldmlldyxcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kLFxyXG4gICAgaGFuZGxlUHJldmlld1doZWVsLFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsKHtcclxuICAgIGZpbGVJZCxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGRyYWZ0VXJsRmlsZSxcclxuICAgIGhlYWRlclVybEZpbGU6IGhlYWRlcj8udXJsRmlsZSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgdmlzaWJsZUxpbmVzID0gdXNlTWVtbygoKSA9PiBwYWdlZFNsaWNlKGxpbmVzLCBsaW5lUGFnZSwgTElORVNfUEFHRV9TSVpFKSwgW2xpbmVQYWdlLCBsaW5lc10pO1xyXG4gIGNvbnN0IHRvdGFsTGluZVBhZ2VzID0gTWF0aC5jZWlsKChsaW5lcy5sZW5ndGggfHwgMCkgLyBMSU5FU19QQUdFX1NJWkUpO1xyXG5cclxuICB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQXV0b0VkaXQoe1xyXG4gICAgYXV0b0VkaXRNb2RlLFxyXG4gICAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgaGVhZGVyLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdDogaGFuZGxlRW5hYmxlRWRpdEluQ29udGV4dCxcclxuICAgIGNhbkF0dGVtcHRBdXRvRWRpdDogIWxpbmtTaGVldENoZWNrQnVzeSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBoYW5kbGVVcGRhdGUsIGhhbmRsZVBlcnNpc3RIZWFkZXJEcmFmdCwgaGFuZGxlRGVsZXRlIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zKHtcclxuICAgIGJ1c3ksXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBjYW5FZGl0VGlja2V0OiBjYW5FZGl0VGlja2V0ICYmIGNhbkVkaXRMaW5rZWRUaWNrZXQsXHJcbiAgICBjYW5EZWxldGVUaWNrZXQ6IGNhbkRlbGV0ZVRpY2tldCAmJiBjYW5FZGl0TGlua2VkVGlja2V0LFxyXG4gICAgZmlsZUlkLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICBkcmFmdEdhc3RvVHlwZSxcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBkcmFmdFRvdGFsQW1vdW50LFxuICAgIGN1cnJlbnRUb3RhbEFtb3VudDogaGVhZGVyPy50b3RhbEFtb3VudCxcbiAgICBkcmFmdFRyYW5zRGF0ZSxcbiAgICBkcmFmdFRpY2tldFRpbWUsXG4gICAgZHJhZnRDb21lbnRhcmlvLFxuICAgIGRyYWZ0VXJsRmlsZSxcbiAgICBkcmFmdEZpbGVOYW1lLFxyXG4gICAgbGlua2VkRXhwZW5zZVNoZWV0SWQsXHJcbiAgICBsaW5rZWRFeHBlbnNlTGluZVJlY0lkOiBpc0Zyb21FeHBlbnNlTGluZSA/IGNvbnRleHRMaW5lUmVjSWQgOiBcIlwiLFxyXG4gICAgbGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWQ6IGxpbmtlZFNoZWV0TGluZS5kcmFmdFByb2plY3RJZCxcclxuICAgIGxpbmtlZEV4cGVuc2VMaW5lUHJvamVjdElkQ2hhbmdlZDogaXNGcm9tRXhwZW5zZUxpbmUgJiYgbGlua2VkU2hlZXRMaW5lLnByb2plY3RJZENoYW5nZWQsXHJcbiAgICBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQ6IGlzRnJvbUV4cGVuc2VMaW5lICYmIGxpbmtlZEV4cGVuc2VTaGVldElkICYmIGNvbnRleHRMaW5lUmVjSWRcclxuICAgICAgPyB7XHJcbiAgICAgICAgICBzaGVldElkOiBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICAgICAgICAgIGxpbmVSZWNJZDogY29udGV4dExpbmVSZWNJZCxcclxuICAgICAgICB9XHJcbiAgICAgIDogbnVsbCxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIG9uTGlua2VkU2hlZXRTeW5jRmFpbHVyZTogKG1lc3NhZ2UpID0+IHtcclxuICAgICAgc2V0U2hlZXRTeW5jQmxvY2tlZCh0cnVlKTtcclxuICAgICAgc2V0U2hlZXRTeW5jQmxvY2tlZE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgIH0sXHJcbiAgICBvbkxpbmtlZFNoZWV0U3luY1N1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgc2V0U2hlZXRTeW5jQmxvY2tlZChmYWxzZSk7XHJcbiAgICAgIHNldFNoZWV0U3luY0Jsb2NrZWRNZXNzYWdlKFwiXCIpO1xyXG4gICAgICBsaW5rZWRTaGVldExpbmUuYWNjZXB0RHJhZnRQcm9qZWN0SWQoKTtcclxuICAgIH0sXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgbW9kYWxMb2FkaW5nVGV4dCwgbW9kYWxDYW5jZWxUZXh0LCBtb2RhbENvbmZpcm1UZXh0LCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gfSA9XHJcbiAgICB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQ29uZmlybVN0YXRlKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgbW9kYWxFcnJvcixcclxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgfSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXNoZWV0U3luY0Jsb2NrZWQgfHwgYnVzeSkgcmV0dXJuO1xyXG4gICAgaWYgKCFzaGVldFdvcmtmbG93QmxvY2tNZXNzYWdlKSByZXR1cm47XHJcbiAgICBpZiAoc3RhdHVzID09PSBzaGVldFdvcmtmbG93QmxvY2tNZXNzYWdlKSByZXR1cm47XHJcbiAgICBzZXRTdGF0dXMoc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSk7XHJcbiAgfSwgW2J1c3ksIHNldFN0YXR1cywgc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSwgc2hlZXRTeW5jQmxvY2tlZCwgc3RhdHVzXSk7XHJcblxyXG4gIGNvbnN0IGlzQXNzaWduZWRUaWNrZXQgPSBoZWFkZXI/LnN0YXR1cyA9PT0gMTtcclxuICBjb25zdCBpc0NvbnRleHRMb2NrZWQgPSAoaXNBc3NpZ25lZFRpY2tldCAmJiAhYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCkgfHwgKCEhbGlua2VkRXhwZW5zZVNoZWV0SWQgJiYgbGlua1NoZWV0TG9ja2VkKTtcclxuICBjb25zdCBjYW5FZGl0VGlja2V0SW5Db250ZXh0ID0gY2FuRWRpdFRpY2tldCAmJiBjYW5FZGl0TGlua2VkVGlja2V0ICYmICFpc0Zyb21TaGVldExpbms7XHJcbiAgY29uc3QgY2FuQ3JlYXRlVGlja2V0TGluZUluQ29udGV4dCA9IGNhbkVkaXRUaWNrZXRJbkNvbnRleHQgJiYgIWlzQ29udGV4dExvY2tlZCAmJiAhc2hlZXRTeW5jQmxvY2tlZDtcclxuICBjb25zdCBjYW5EZWxldGVUaWNrZXRJbkNvbnRleHQgPSBjYW5EZWxldGVUaWNrZXQgJiYgY2FuRWRpdExpbmtlZFRpY2tldCAmJiAhaXNGcm9tU2hlZXRMaW5rO1xyXG4gIGNvbnN0IHRpY2tldFRvcGJhckFjdGlvbk1vZGU6IFwiZGVmYXVsdFwiIHwgXCJzYXZlX29ubHlcIiB8IFwidmlld19vbmx5XCIgPVxyXG4gICAgcGVuZGluZ0ZpcnN0TGluayAmJiBpc0VkaXRpbmdcclxuICAgICAgPyBcInNhdmVfb25seVwiXHJcbiAgICAgIDogIWNhbkVkaXRUaWNrZXRJbkNvbnRleHQgJiYgIWNhbkRlbGV0ZVRpY2tldEluQ29udGV4dFxyXG4gICAgICAgID8gXCJ2aWV3X29ubHlcIlxyXG4gICAgICAgIDogXCJkZWZhdWx0XCI7XHJcblxyXG4gIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zKHtcclxuICAgIGJ1c3ksXHJcbiAgICBtb2RhbE9wZW46IG1vZGFsLm9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0xvY2tlZDogaXNDb250ZXh0TG9ja2VkLFxyXG4gICAgYWN0aW9uTW9kZTogdGlja2V0VG9wYmFyQWN0aW9uTW9kZSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHk6IG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICAgIGNhbkVkaXRUaWNrZXQ6IGNhbkVkaXRUaWNrZXRJbkNvbnRleHQsXHJcbiAgICBjYW5EZWxldGVUaWNrZXQ6IGNhbkRlbGV0ZVRpY2tldEluQ29udGV4dCxcclxuICAgIGZpbGVJZCxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0OiBoYW5kbGVFbmFibGVFZGl0SW5Db250ZXh0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdDogaGFuZGxlQ2FuY2VsRWRpdEluQ29udGV4dCxcclxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICAgIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgaWYgKChpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUgfHwgaXNGcm9tRXhwZW5zZUxpbmUpICYmIGxpbmtlZEV4cGVuc2VTaGVldElkKSB7XHJcbiAgICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xyXG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsKGxpbmtlZEV4cGVuc2VTaGVldElkKSwge1xyXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdm9pZCByZWxvYWREZXRhaWwoKTtcclxuICAgIH0sXHJcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgaWYgKHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQpIHtcclxuICAgICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XHJcbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwodGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkKSwge1xyXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbWFya1Jlc2V0RmlsdGVyc1JldHVybigpO1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvVGlja2V0c1wiLCB7XHJcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBvcGVuQ3JlYXRlTGluZURldGFpbCwgb3BlbkxpbmVEZXRhaWwsIHJlc29sdmVDbGlja2FibGVDYXJkLCBvcGVuRmlsZSwgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCB9ID1cclxuICAgIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMoe1xyXG4gICAgYnVzeSxcclxuICAgIGZpbGVJZCxcclxuICAgIGNvbnRleHRTaGVldElkOiBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICAgIGlzRnJvbVNoZWV0TGluayxcclxuICAgIGhlYWRlckV4cGVuc2VTaGVldElkOiBzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZERpc3BsYXkpLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlUGVyc2lzdEhlYWRlckRyYWZ0LFxyXG4gICAgYnlwYXNzV29ya2Zsb3dHdWFyZDogc2hvdWxkQmxvY2tXb3JrZmxvd0V4aXQsXHJcbiAgICBsaW5lQ29udGFpbmVyUmVmLFxyXG4gICAgb3BlblByZXZpZXcsXHJcbiAgICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIH0pO1xyXG5cclxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcclxuICAgIGNvbnRhaW5lclJlZjogbGluZUNvbnRhaW5lclJlZixcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGl0ZW1zOiB2aXNpYmxlTGluZXMsXHJcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZGV0YWlsVmlldyA9IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbFBhZ2VWaWV3TW9kZWwoe1xyXG4gICAgbW9kYWxBcmdzOiB7XHJcbiAgICAgIG1vZGFsLFxyXG4gICAgICBtb2RhbENvbmZpcm1UZXh0LFxyXG4gICAgICBtb2RhbENhbmNlbFRleHQsXHJcbiAgICAgIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG1vZGFsRXJyb3IsXHJcbiAgICAgIHN0YXR1cyxcclxuICAgICAgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtLFxyXG4gICAgICBjbG9zZUNvbmZpcm0sXHJcbiAgICB9LFxyXG4gICAgcHJldmlld0FyZ3M6IHtcclxuICAgICAgcHJldmlld09wZW4sXHJcbiAgICAgIHByZXZpZXdCdXN5LFxyXG4gICAgICBwcmV2aWV3RXJyb3IsXHJcbiAgICAgIHByZXZpZXdJbWFnZVVybCxcclxuICAgICAgcHJldmlld0FsdFRleHQsXHJcbiAgICAgIHByZXZpZXdTY2FsZSxcclxuICAgICAgcHJldmlld1RyYW5zbGF0ZSxcclxuICAgICAgcHJldmlld1N1cmZhY2VSZWYsXHJcbiAgICAgIGNsb3NlUHJldmlldyxcclxuICAgICAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gICAgICBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXHJcbiAgICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kLFxyXG4gICAgICBoYW5kbGVQcmV2aWV3V2hlZWwsXHJcbiAgICB9LFxyXG4gICAgY29udGVudEFyZ3M6IHtcclxuICAgICAgaXNMb2FkaW5nLFxyXG4gICAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICAgIGhlYWRlcixcclxuICAgICAgc2hvd1N0aWNreVByZXZpZXcsXHJcbiAgICAgIHByZXZpZXdCdXN5LFxyXG4gICAgICBwcmV2aWV3RXJyb3IsXHJcbiAgICAgIHByZXZpZXdJbWFnZVVybCxcclxuICAgICAgcHJldmlld0FsdFRleHQsXHJcbiAgICAgIG9wZW5GaWxlLFxyXG4gICAgICBzdGF0dXNMYWJlbCxcclxuICAgICAgZ2FzdG9UeXBlTGFiZWwsXHJcbiAgICAgIHRvdGFsQW1vdW50VGV4dCxcclxuICAgICAgdHJhbnNEYXRlVGV4dCxcclxuICAgICAgdGlja2V0VGltZVRleHQsXHJcbiAgICAgIGlzRWRpdGluZyxcclxuICAgICAgZ2FzdG9UeXBlT3B0aW9ucyxcclxuICAgICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgICAgZGVzY3JpcHRpb25JbnZhbGlkLFxyXG4gICAgICBkZXNjcmlwdGlvbklucHV0UmVmLFxyXG4gICAgICBkcmFmdEdhc3RvVHlwZSxcbiAgICAgIGdhc3RvVHlwZUludmFsaWQsXG4gICAgICBnYXN0b1R5cGVJbnB1dFJlZixcbiAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgICAgY3VycmVuY3lDb2RlSW52YWxpZCxcbiAgICAgIGN1cnJlbmN5SW5wdXRSZWYsXG4gICAgICBkcmFmdFRvdGFsQW1vdW50LFxuICAgICAgdG90YWxBbW91bnRJbnZhbGlkLFxuICAgICAgdG90YWxBbW91bnRJbnB1dFJlZixcbiAgICAgIGRyYWZ0VHJhbnNEYXRlLFxuICAgICAgZHJhZnRUaWNrZXRUaW1lLFxuICAgICAgZHJhZnRVcmxGaWxlLFxuICAgICAgZHJhZnRGaWxlTmFtZSxcbiAgICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXG4gICAgICBzZXREcmFmdEdhc3RvVHlwZSxcbiAgICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxuICAgICAgc2V0RHJhZnRUb3RhbEFtb3VudCxcbiAgICAgIGlzRnJvbVNoZWV0TGluayxcbiAgICAgIGxpbmtlZExpbmU6IHtcclxuICAgICAgICB2aXNpYmxlOiBpc0Zyb21FeHBlbnNlTGluZSxcclxuICAgICAgICBwcm9qZWN0SWQ6IGxpbmtlZFNoZWV0TGluZS5kcmFmdFByb2plY3RJZCxcclxuICAgICAgICBpc0xvYWRpbmc6IGxpbmtlZFNoZWV0TGluZS5pc0xvYWRpbmcsXHJcbiAgICAgICAgZXJyb3JNZXNzYWdlOiBsaW5rZWRTaGVldExpbmUuZXJyb3JNZXNzYWdlLFxyXG4gICAgICAgIGRpc2FibGVkOiBidXN5IHx8IGlzQ29udGV4dExvY2tlZCB8fCBsaW5rZWRTaGVldExpbmUuaXNMb2FkaW5nLFxyXG4gICAgICAgIG9uUHJvamVjdElkQ2hhbmdlOiBsaW5rZWRTaGVldExpbmUuc2V0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICAgIH0sXHJcbiAgICAgIGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQsXHJcbiAgICAgIHZpc2libGVMaW5lcyxcclxuICAgICAgdG90YWxMaW5lUGFnZXMsXHJcbiAgICAgIGxpbmVQYWdlLFxyXG4gICAgICBzYWZlQ3VycmVuY3lDb2RlOiBpc0VkaXRpbmcgPyBkcmFmdEN1cnJlbmN5Q29kZSA6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcclxuICAgICAgcGFnaW5hdGlvbkxhYmVscyxcclxuICAgICAgbGluZUNvbnRhaW5lclJlZixcclxuICAgICAgc2V0TGluZVBhZ2UsXHJcbiAgICAgIG9wZW5MaW5lRGV0YWlsLFxyXG4gICAgICBzdGF0dXMsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgLi4uZGV0YWlsVmlldyxcclxuICAgIGNhblNob3dDcmVhdGVMaW5lRmFiOiBjYW5DcmVhdGVUaWNrZXRMaW5lSW5Db250ZXh0ICYmICFpc0xvYWRpbmcgJiYgIWVycm9yTWVzc2FnZSAmJiAhIXNhZmVUZXh0KGZpbGVJZCkgJiYgISFoZWFkZXIsXHJcbiAgICBpc0NyZWF0ZUxpbmVGYWJEaXNhYmxlZDogYnVzeSB8fCAhaGVhZGVyLFxyXG4gICAgb3BlbkNyZWF0ZUxpbmVEZXRhaWwsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlQ29udGVudCA9ICgpID0+IHtcclxuICBjb25zdCBkZXRhaWxWaWV3ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbFBhZ2VWaWV3TW9kZWwoKTtcclxuICBjb25zdCBmYWJNZW51SXRlbXMgPSB1c2VNZW1vPEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW1bXT4oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogXCJuZXctdGlja2V0LWxpbmVcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX05ld0xpbmVcIiwgXCJOdWV2YSBMaW5lYVwiKSxcclxuICAgICAgICBpY29uOiA8TmV3TGluZUljb24gLz4sXHJcbiAgICAgICAgb25DbGljazogKCkgPT4ge1xyXG4gICAgICAgICAgdm9pZCBkZXRhaWxWaWV3Lm9wZW5DcmVhdGVMaW5lRGV0YWlsKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkaXNhYmxlZDogZGV0YWlsVmlldy5pc0NyZWF0ZUxpbmVGYWJEaXNhYmxlZCxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgICBbZGV0YWlsVmlld11cclxuICApO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3IG1vZGFsPXtkZXRhaWxWaWV3Lm1vZGFsfSBwcmV2aWV3PXtkZXRhaWxWaWV3LnByZXZpZXd9IGNvbnRlbnQ9e2RldGFpbFZpZXcuY29udGVudH0gLz5cclxuICAgICAge2RldGFpbFZpZXcuY2FuU2hvd0NyZWF0ZUxpbmVGYWIgPyAoXHJcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXHJcbiAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgcmFwaWRhc1wiKX1cclxuICAgICAgICAgIHNpemU9ezc2fVxyXG4gICAgICAgICAgcmlnaHQ9ezE2fVxyXG4gICAgICAgICAgYm90dG9tPXsyNH1cclxuICAgICAgICAgIG1lbnVBcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgcmFwaWRhc1wiKX1cclxuICAgICAgICAgIG1lbnVJdGVtcz17ZmFiTWVudUl0ZW1zfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC8+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgZXhwZW5zZSB0aWNrZXQgZGV0YWlsLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0RGV0YWlsUGFnZSA9ICgpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzIGVuYWJsZUV4cGVuc2VNYW5hZ2VtZW50PlxyXG4gICAgICA8RXhwZW5zZVRpY2tldERldGFpbFBhZ2VDb250ZW50IC8+XHJcbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlIC8+KTtcclxufTtcclxuXHJcbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldERldGFpbFBhZ2U7XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLCBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBtYXBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLCBtYXBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGVBcmdzID0ge1xyXG4gIGhhc0FjY2VzczogYm9vbGVhbjtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIE93bnMgcmVhZCBzdGF0ZSBhbmQgQVBJIGxvYWRpbmcgYmVoYXZpb3IgZm9yIHRoZSB0aWNrZXQgZGV0YWlsIHBhZ2UuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUgPSAoeyBoYXNBY2Nlc3MsIGZpbGVJZCwgb25Gb3JiaWRkZW4gfTogVXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlQXJncykgPT4ge1xyXG4gIGNvbnN0IFtoZWFkZXIsIHNldEhlYWRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2xpbmVzLCBzZXRMaW5lc10gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0RGV0YWlsTGluZVtdPihbXSk7XHJcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIGNvbnN0IHJlbG9hZERldGFpbCA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmICghaGFzQWNjZXNzKSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzYWZlRmlsZUlkID0gc2FmZVRleHQoZmlsZUlkKTtcclxuICAgIGlmICghc2FmZUZpbGVJZCkge1xyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIlRpY2tldHNfRGV0YWlsX05vdEZvdW5kXCIsIFwiVGlja2V0IHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XHJcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldChzYWZlRmlsZUlkLCB7XHJcbiAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZT8uTWVzc2FnZSB8fCBpbmRUKFwiVGlja2V0c19EZXRhaWxfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0IGRldGFpbC5cIikpO1xyXG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkID1cclxuICAgICAgICBpdGVtcy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnk/LkZpbGVJZCkudG9VcHBlckNhc2UoKSA9PT0gc2FmZUZpbGVJZC50b1VwcGVyQ2FzZSgpKSB8fCBpdGVtc1swXSB8fCBudWxsO1xyXG5cclxuICAgICAgaWYgKCFzZWxlY3RlZCkge1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiVGlja2V0c19EZXRhaWxfTm90Rm91bmRcIiwgXCJUaWNrZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBtYXBwZWRIZWFkZXIgPSBtYXBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyKHNlbGVjdGVkKTtcclxuICAgICAgY29uc3QgbWFwcGVkTGluZXMgPSAoQXJyYXkuaXNBcnJheShzZWxlY3RlZC5MaW5lcykgPyBzZWxlY3RlZC5MaW5lcyA6IFtdKS5tYXAoKGxpbmUpID0+XHJcbiAgICAgICAgbWFwRXhwZW5zZVRpY2tldERldGFpbExpbmUobGluZSlcclxuICAgICAgKTtcclxuICAgICAgc2V0SGVhZGVyKG1hcHBlZEhlYWRlcik7XHJcbiAgICAgIHNldExpbmVzKG1hcHBlZExpbmVzKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIlRpY2tldHNfRGV0YWlsX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldCBkZXRhaWwuXCIpKTtcclxuICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtmaWxlSWQsIGhhc0FjY2Vzcywgb25Gb3JiaWRkZW5dKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHZvaWQgcmVsb2FkRGV0YWlsKCk7XHJcbiAgfSwgW3JlbG9hZERldGFpbF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGVhZGVyLFxyXG4gICAgbGluZXMsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICByZWxvYWREZXRhaWwsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCB9IGZyb20gXCIuLi8uLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzL2V4cGVuc2VHYXN0b1R5cGVDYXRhbG9nLnRzXCI7XG5pbXBvcnQgeyBleGVjdXRlRXhwZW5zZU11dGF0aW9uLCBwYXJzZURlY2ltYWxJbnB1dCB9IGZyb20gXCIuLi8uLi9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50c1wiO1xuaW1wb3J0IHtcbiAgYWRqdXN0RXhwZW5zZVNoZWV0VGlja2V0VG90YWxBbW91bnQsXG4gIGRlbGV0ZUV4cGVuc2VTaGVldExpbmUsXG4gIGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldCxcbiAgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0RmlsZSxcbiAgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwsXG4gIHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldCxcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UsIHRvRXhwZW5zZUFwaURkTW1ZeXl5IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcbmltcG9ydCB7IHN5bmNFeHBlbnNlTGlua2VkVGlja2V0U2hlZXRMaW5lIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VMaW5rZWRUaWNrZXRTaGVldFN5bmMudHNcIjtcbmltcG9ydCB7IHJlc29sdmVFeHBlbnNlU2hlZXRFZGl0QWNjZXNzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VTaGVldEVkaXRBY2Nlc3MudHNcIjtcbmltcG9ydCB7IGNsZWFyRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlLCBzYXZlRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZS50c1wiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuXHJcbnR5cGUgRGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0ID0ge1xyXG4gIHNoZWV0SWQ6IHN0cmluZztcclxuICBsaW5lUmVjSWQ6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgY2FuRWRpdFRpY2tldDogYm9vbGVhbjtcclxuICBjYW5EZWxldGVUaWNrZXQ6IGJvb2xlYW47XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xuICBkcmFmdEdhc3RvVHlwZTogc3RyaW5nO1xuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBkcmFmdFRvdGFsQW1vdW50OiBzdHJpbmc7XG4gIGN1cnJlbnRUb3RhbEFtb3VudD86IG51bWJlciB8IG51bGw7XG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XG4gIGRyYWZ0VGlja2V0VGltZTogc3RyaW5nO1xuICBkcmFmdENvbWVudGFyaW86IHN0cmluZztcbiAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XG4gIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcbiAgbGlua2VkRXhwZW5zZVNoZWV0SWQ/OiBzdHJpbmc7XHJcbiAgbGlua2VkRXhwZW5zZUxpbmVSZWNJZD86IHN0cmluZztcclxuICBsaW5rZWRFeHBlbnNlTGluZVByb2plY3RJZD86IHN0cmluZztcclxuICBsaW5rZWRFeHBlbnNlTGluZVByb2plY3RJZENoYW5nZWQ/OiBib29sZWFuO1xyXG4gIGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dD86IERlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCB8IG51bGw7XHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcclxuICBjYW5NYW5hZ2VPdGhlclVzZXJzOiBib29sZWFuO1xyXG4gIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nO1xyXG4gIGN1cnJlbnRDcm1Vc2VySWQ6IHN0cmluZztcclxuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQ6IHN0cmluZztcclxuICBvbkxpbmtlZFNoZWV0U3luY0ZhaWx1cmU/OiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uTGlua2VkU2hlZXRTeW5jU3VjY2Vzcz86ICgpID0+IHZvaWQ7XHJcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0QnVzeTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbn07XHJcblxyXG4vLyBUcmllcyB0byBpbmZlciBhIHNhZmUgZXh0ZW5zaW9uIGZvciB1cGRhdGUgcGF5bG9hZCBmcm9tIGZpbGUgbmFtZSBvciBVUkwuXG5jb25zdCByZXNvbHZlVGlja2V0RmlsZUV4dGVuc2lvbiA9IChmaWxlTmFtZTogc3RyaW5nLCB1cmxGaWxlOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICBjb25zdCBzb3VyY2UgPSBTdHJpbmcoZmlsZU5hbWUgfHwgXCJcIikudHJpbSgpIHx8IFN0cmluZyh1cmxGaWxlIHx8IFwiXCIpLnRyaW0oKTtcclxuICBjb25zdCBtYXRjaCA9IHNvdXJjZS5tYXRjaCgvXFwuKFthLXpBLVowLTldezEsMTB9KSg/OiR8Wz8jXSkvKTtcclxuICBpZiAoIW1hdGNoIHx8ICFtYXRjaFsxXSkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICByZXR1cm4gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbmNvbnN0IGlzTm90Rm91bmRFcnJvciA9IChlcnJvcjogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xyXG4gIHJldHVybiBlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDQ7XHJcbn07XHJcblxyXG5jb25zdCBpc01pc3NpbmdUaWNrZXRGaWxlTWVzc2FnZSA9IChtZXNzYWdlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyhtZXNzYWdlIHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImFyY2hpdm8gYXNvY2lhZG9cIikgfHxcclxuICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhcmNoaXZvIGFkanVudG9cIikgfHxcclxuICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhc3NvY2lhdGVkIGZpbGVcIikgfHxcclxuICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhdHRhY2hlZCBmaWxlXCIpXHJcbiAgKTtcclxufTtcclxuXHJcbi8vIEVuY2Fwc3VsYXRlcyB1cGRhdGUgYW5kIGRlbGV0ZSBtdXRhdGlvbnMgZm9yIHRpY2tldCBoZWFkZXIgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBpc0VkaXRpbmcsXHJcbiAgY2FuRWRpdFRpY2tldCxcclxuICBjYW5EZWxldGVUaWNrZXQsXHJcbiAgZmlsZUlkLFxuICBkcmFmdERlc2NyaXB0aW9uLFxuICBkcmFmdEdhc3RvVHlwZSxcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gIGRyYWZ0VG90YWxBbW91bnQsXG4gIGN1cnJlbnRUb3RhbEFtb3VudCxcbiAgZHJhZnRUcmFuc0RhdGUsXG4gIGRyYWZ0VGlja2V0VGltZSxcbiAgZHJhZnRDb21lbnRhcmlvLFxuICBkcmFmdFVybEZpbGUsXG4gIGRyYWZ0RmlsZU5hbWUsXG4gIGxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gIGxpbmtlZEV4cGVuc2VMaW5lUmVjSWQsXHJcbiAgbGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWQsXHJcbiAgbGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWRDaGFuZ2VkID0gZmFsc2UsXHJcbiAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0LFxyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICBjdXJyZW50QXhVc2VySWQsXHJcbiAgY3VycmVudENybVVzZXJJZCxcclxuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlLFxyXG4gIG9uTGlua2VkU2hlZXRTeW5jU3VjY2VzcyxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIHNldEJ1c3ksXHJcbiAgc2V0U3RhdHVzLFxyXG4gIHNldElzRWRpdGluZyxcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9uc0FyZ3MpID0+IHtcclxuICBjb25zdCB2YWxpZGF0ZUxpbmtlZFNoZWV0QmVmb3JlTXV0YXRpb24gPSB1c2VDYWxsYmFjayhhc3luYyAoKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiA9PiB7XHJcbiAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KGxpbmtlZEV4cGVuc2VTaGVldElkKTtcclxuICAgIGlmICghc2FmZVNoZWV0SWQpIHtcclxuICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWNjZXNzUmVzdWx0ID0gYXdhaXQgcmVzb2x2ZUV4cGVuc2VTaGVldEVkaXRBY2Nlc3Moe1xyXG4gICAgICBzaGVldElkOiBzYWZlU2hlZXRJZCxcclxuICAgICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICBpZiAoIWFjY2Vzc1Jlc3VsdC5pc0xvY2tlZCkge1xyXG4gICAgICByZXR1cm4gc2FmZVNoZWV0SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWVzc2FnZSA9XHJcbiAgICAgIHNhZmVUZXh0KGFjY2Vzc1Jlc3VsdC5ibG9ja2VkTWVzc2FnZSkgfHxcclxuICAgICAgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1JlYWRPbmx5QnlTdGF0dXNcIiwgXCJObyBzZSBwdWVkZSBlZGl0YXIgZXN0YSBob2phIGRlIGdhc3RvcyBlbiBlbCBlc3RhZG8gYWN0dWFsLlwiKTtcclxuICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9LCBbXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgXSk7XHJcblxyXG4gIGNvbnN0IHJ1bkhlYWRlclVwZGF0ZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKHsgc3luY1NoZWV0TGluZSB9OiB7IHN5bmNTaGVldExpbmU6IGJvb2xlYW4gfSk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xyXG4gICAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmICghY2FuRWRpdFRpY2tldCkge1xyXG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWREZXNjcmlwdGlvbiA9IFN0cmluZyhkcmFmdERlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgICAgaWYgKCFub3JtYWxpemVkRGVzY3JpcHRpb24pIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9EZXNjcmlwdGlvblJlcXVpcmVkXCIsIFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWQuXCIpO1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbmN5ID0gU3RyaW5nKGRyYWZ0Q3VycmVuY3lDb2RlIHx8IFwiXCIpLnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgaWYgKCFub3JtYWxpemVkQ3VycmVuY3kpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fQ3VycmVuY3lSZXF1aXJlZFwiLCBcIkN1cnJlbmN5IGlzIHJlcXVpcmVkLlwiKTtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyc2VkVG90YWxBbW91bnQgPSBwYXJzZURlY2ltYWxJbnB1dChkcmFmdFRvdGFsQW1vdW50KTtcbiAgICAgIGlmIChwYXJzZWRUb3RhbEFtb3VudCA9PSBudWxsIHx8IHBhcnNlZFRvdGFsQW1vdW50IDwgMCkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIlRpY2tldHNfVmFsaWRhdGlvbl9Ub3RhbEFtb3VudFJlcXVpcmVkXCIsIFwiVG90YWwgYW1vdW50IG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIDAuXCIpO1xuICAgICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xuICAgICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyc2VkR2FzdG9UeXBlID0gdG9FeHBlbnNlR2FzdG9UeXBlQ29kZShkcmFmdEdhc3RvVHlwZSwgeyBhbGxvd05vbmU6IGZhbHNlIH0pO1xuICAgICAgaWYgKHBhcnNlZEdhc3RvVHlwZSA9PT0gbnVsbCkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIlRpY2tldHNfVmFsaWRhdGlvbl9DYXRlZ29yeVJlcXVpcmVkXCIsIFwiQ2F0ZWdvcnkgaXMgcmVxdWlyZWQuXCIpO1xuICAgICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xuICAgICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmF3VHJhbnNEYXRlID0gU3RyaW5nKGRyYWZ0VHJhbnNEYXRlIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc0RhdGUgPSByYXdUcmFuc0RhdGUgPyB0b0V4cGVuc2VBcGlEZE1tWXl5eShyYXdUcmFuc0RhdGUpIDogXCJcIjtcbiAgICAgIGlmIChyYXdUcmFuc0RhdGUgJiYgIW5vcm1hbGl6ZWRUcmFuc0RhdGUpIHtcbiAgICAgICAgc2V0TW9kYWxFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgICAgICAgc2V0U3RhdHVzKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZhbGlkYXRlZFNoZWV0SWQgPSBhd2FpdCB2YWxpZGF0ZUxpbmtlZFNoZWV0QmVmb3JlTXV0YXRpb24oKTtcbiAgICAgIGlmICh2YWxpZGF0ZWRTaGVldElkID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxyXG4gICAgICBjb25zdCBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0ID0ge1xuICAgICAgICBkZXNjcmlwdGlvbjogbm9ybWFsaXplZERlc2NyaXB0aW9uLFxuICAgICAgICBjdXJyZW5jeUNvZGU6IG5vcm1hbGl6ZWRDdXJyZW5jeSxcbiAgICAgICAgdHJhbnNEYXRlOiBub3JtYWxpemVkVHJhbnNEYXRlIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgdGlja2V0RGF0ZTogbm9ybWFsaXplZFRyYW5zRGF0ZSB8fCB1bmRlZmluZWQsXG4gICAgICAgIHRpY2tldFRpbWU6IHNhZmVUZXh0KGRyYWZ0VGlja2V0VGltZSkgfHwgdW5kZWZpbmVkLFxuICAgICAgICBjb21lbnRhcmlvOiBTdHJpbmcoZHJhZnRDb21lbnRhcmlvIHx8IFwiXCIpLnRyaW0oKSB8fCB1bmRlZmluZWQsXG4gICAgICAgIHVybEZpbGU6IFN0cmluZyhkcmFmdFVybEZpbGUgfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgZmlsZU5hbWU6IFN0cmluZyhkcmFmdEZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSB8fCB1bmRlZmluZWQsXG4gICAgICAgIGZpbGVFeHRlbnNpb246IHJlc29sdmVUaWNrZXRGaWxlRXh0ZW5zaW9uKGRyYWZ0RmlsZU5hbWUsIGRyYWZ0VXJsRmlsZSksXHJcbiAgICAgICAgZ2FzdG9UeXBlOiBwYXJzZWRHYXN0b1R5cGUsXG4gICAgICB9O1xuXHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRpbmdcIiwgXCJVcGRhdGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxyXG4gICAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpLFxyXG4gICAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgICAgc2V0QnVzeSxcclxuICAgICAgICBzZXRTdGF0dXMsXHJcbiAgICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldChmaWxlSWQsIHBheWxvYWQpO1xyXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBwcmV2aW91c1RvdGFsQW1vdW50ID0gTnVtYmVyKGN1cnJlbnRUb3RhbEFtb3VudCA/PyAwKTtcbiAgICAgICAgICBjb25zdCBoYXNUb3RhbEFtb3VudENoYW5nZSA9IE1hdGguYWJzKE51bWJlcihwYXJzZWRUb3RhbEFtb3VudCkgLSBwcmV2aW91c1RvdGFsQW1vdW50KSA+PSAwLjAwNTtcbiAgICAgICAgICBpZiAoaGFzVG90YWxBbW91bnRDaGFuZ2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsQWRqdXN0bWVudFJlc3BvbnNlID0gYXdhaXQgYWRqdXN0RXhwZW5zZVNoZWV0VGlja2V0VG90YWxBbW91bnQoZmlsZUlkLCB7XG4gICAgICAgICAgICAgIHRvdGFsQW1vdW50OiBOdW1iZXIocGFyc2VkVG90YWxBbW91bnQpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXRvdGFsQWRqdXN0bWVudFJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRvdGFsQWRqdXN0bWVudFJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3luY1NoZWV0TGluZSAmJiB2YWxpZGF0ZWRTaGVldElkKSB7XG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHN5bmNQYXlsb2FkID0ge1xyXG4gICAgICAgICAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgICAgICAgICAgc2hlZXRJZDogdmFsaWRhdGVkU2hlZXRJZCxcclxuICAgICAgICAgICAgICAgIGxpbmVSZWNJZDogc2FmZVRleHQobGlua2VkRXhwZW5zZUxpbmVSZWNJZCkgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgLi4uKGxpbmtlZEV4cGVuc2VMaW5lUHJvamVjdElkQ2hhbmdlZFxyXG4gICAgICAgICAgICAgICAgICA/IHsgcHJvamVjdElkT3ZlcnJpZGU6IHNhZmVUZXh0KGxpbmtlZEV4cGVuc2VMaW5lUHJvamVjdElkKSB9XHJcbiAgICAgICAgICAgICAgICAgIDoge30pLFxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgYXdhaXQgc3luY0V4cGVuc2VMaW5rZWRUaWNrZXRTaGVldExpbmUoc3luY1BheWxvYWQpO1xyXG4gICAgICAgICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKCk7XHJcbiAgICAgICAgICAgICAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzPy4oKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID1cclxuICAgICAgICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3JcclxuICAgICAgICAgICAgICAgICAgPyBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgIDogaW5kVChcclxuICAgICAgICAgICAgICAgICAgICAgIFwiRXhwZW5zZVRpY2tldHNfU2hlZXRTeW5jX1JldHJ5UmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgIFwiVGlja2V0IGRhdGEgY2hhbmdlZCwgYnV0IHdlIGNvdWxkIG5vdCBzeW5jIHRoZSBleHBlbnNlIGxpbmUuIFNhdmUgYWdhaW4gYmVmb3JlIGxlYXZpbmcuXCJcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIHNhdmVFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgICAgICAgICAgc2hlZXRJZDogdmFsaWRhdGVkU2hlZXRJZCxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlPy4obWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBzaGVldCB1cGRhdGVkXCIpKTtcclxuICAgICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQub2s7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBidXN5LFxyXG4gICAgICBjYW5FZGl0VGlja2V0LFxyXG4gICAgICBkcmFmdENvbWVudGFyaW8sXG4gICAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgICBkcmFmdEZpbGVOYW1lLFxuICAgICAgZHJhZnRHYXN0b1R5cGUsXG4gICAgICBkcmFmdFRvdGFsQW1vdW50LFxuICAgICAgZHJhZnRUaWNrZXRUaW1lLFxuICAgICAgZHJhZnRUcmFuc0RhdGUsXG4gICAgICBkcmFmdFVybEZpbGUsXG4gICAgICBmaWxlSWQsXG4gICAgICBpc0VkaXRpbmcsXG4gICAgICBjdXJyZW50VG90YWxBbW91bnQsXG4gICAgICBsaW5rZWRFeHBlbnNlTGluZVByb2plY3RJZCxcclxuICAgICAgbGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWRDaGFuZ2VkLFxyXG4gICAgICBsaW5rZWRFeHBlbnNlTGluZVJlY0lkLFxyXG4gICAgICBvbkxpbmtlZFNoZWV0U3luY0ZhaWx1cmUsXHJcbiAgICAgIG9uTGlua2VkU2hlZXRTeW5jU3VjY2VzcyxcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIHZhbGlkYXRlTGlua2VkU2hlZXRCZWZvcmVNdXRhdGlvbixcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICByZXR1cm4gcnVuSGVhZGVyVXBkYXRlKHtcclxuICAgICAgc3luY1NoZWV0TGluZTogdHJ1ZSxcclxuICAgIH0pO1xyXG4gIH0sIFtydW5IZWFkZXJVcGRhdGVdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUGVyc2lzdEhlYWRlckRyYWZ0ID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgcmV0dXJuIHJ1bkhlYWRlclVwZGF0ZSh7XHJcbiAgICAgIHN5bmNTaGVldExpbmU6IGxpbmtlZEV4cGVuc2VMaW5lUHJvamVjdElkQ2hhbmdlZCxcclxuICAgIH0pO1xyXG4gIH0sIFtsaW5rZWRFeHBlbnNlTGluZVByb2plY3RJZENoYW5nZWQsIHJ1bkhlYWRlclVwZGF0ZV0pO1xyXG5cclxuICBjb25zdCByZXNvbHZlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0ID0gdXNlQ2FsbGJhY2soYXN5bmMgKCk6IFByb21pc2U8RGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0IHwgbnVsbD4gPT4ge1xyXG4gICAgaWYgKGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCkge1xyXG4gICAgICByZXR1cm4gZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQobGlua2VkRXhwZW5zZVNoZWV0SWQpO1xyXG4gICAgaWYgKCFzYWZlU2hlZXRJZCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKHNhZmVTaGVldElkLCB7XHJcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2UuSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICAgIGNvbnN0IGRldGFpbCA9IGl0ZW1zLmZpbmQoKGVudHJ5KSA9PiBlbnRyeSAmJiB0eXBlb2YgZW50cnkgPT09IFwib2JqZWN0XCIpIHx8IG51bGw7XHJcbiAgICBjb25zdCBsaW5lcyA9IEFycmF5LmlzQXJyYXkoZGV0YWlsPy5MaW5lcykgPyBkZXRhaWwuTGluZXMgOiBbXTtcclxuICAgIGNvbnN0IG1hdGNoaW5nTGluZSA9IGxpbmVzLmZpbmQoKGxpbmUpID0+IHNhZmVUZXh0KGxpbmU/LkZpbGVJZCkgPT09IGZpbGVJZCk7XHJcbiAgICBjb25zdCBsaW5lUmVjSWQgPSBzYWZlVGV4dChtYXRjaGluZ0xpbmU/LlJlY0lkKTtcclxuXHJcbiAgICBpZiAoIWxpbmVSZWNJZCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzaGVldElkOiBzYWZlU2hlZXRJZCxcclxuICAgICAgbGluZVJlY0lkLFxyXG4gICAgfTtcclxuICB9LCBbZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0LCBmaWxlSWQsIGxpbmtlZEV4cGVuc2VTaGVldElkXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURlbGV0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWNhbkRlbGV0ZVRpY2tldCkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2YWxpZGF0ZWRTaGVldElkID0gYXdhaXQgdmFsaWRhdGVMaW5rZWRTaGVldEJlZm9yZU11dGF0aW9uKCk7XHJcbiAgICBpZiAodmFsaWRhdGVkU2hlZXRJZCA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxyXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUVycm9yXCIsIFwiRGVsZXRlIGVycm9yLlwiKSxcclxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBsaW5rZWRMaW5lQ29udGV4dCA9IGF3YWl0IHJlc29sdmVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQoKTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGRlbGV0ZUZpbGVSZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldEZpbGUoZmlsZUlkLCB7XHJcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBpZiAoIWRlbGV0ZUZpbGVSZXNwb25zZS5TdWNjZXNzICYmICFpc01pc3NpbmdUaWNrZXRGaWxlTWVzc2FnZShkZWxldGVGaWxlUmVzcG9uc2UuTWVzc2FnZSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRlbGV0ZUZpbGVSZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGlmICghaXNOb3RGb3VuZEVycm9yKGVycm9yKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0KGZpbGVJZCk7XHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxpbmtlZExpbmVDb250ZXh0KSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5lRGVsZXRlUmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRMaW5lKFxyXG4gICAgICAgICAgICAgIGxpbmtlZExpbmVDb250ZXh0LnNoZWV0SWQsXHJcbiAgICAgICAgICAgICAgbGlua2VkTGluZUNvbnRleHQubGluZVJlY0lkLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbGluZURlbGV0ZVJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobGluZURlbGV0ZVJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgLy8gVGhlIGxpbmtlZCBsaW5lIGNhbiBiZSBhdXRvLXJlbW92ZWQgYnkgYmFja2VuZCBjYXNjYWRlOyBrZWVwIGZsb3cgc3VjY2Vzc2Z1bCBpbiB0aGF0IGNhc2UuXHJcbiAgICAgICAgICAgIGlmICghaXNOb3RGb3VuZEVycm9yKGVycm9yKSkge1xyXG4gICAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IGRlbGV0ZWRcIikpO1xyXG4gICAgICAgIGlmICh2YWxpZGF0ZWRTaGVldElkKSB7XHJcbiAgICAgICAgICBjbGVhckV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZSgpO1xyXG4gICAgICAgICAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzPy4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xyXG4gIH0sIFtcclxuICAgIGJ1c3ksXHJcbiAgICBjYW5EZWxldGVUaWNrZXQsXHJcbiAgICBmaWxlSWQsXHJcbiAgICBvbkxpbmtlZFNoZWV0U3luY1N1Y2Nlc3MsXHJcbiAgICByZXNvbHZlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0LFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICB2YWxpZGF0ZUxpbmtlZFNoZWV0QmVmb3JlTXV0YXRpb24sXHJcbiAgXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zLnRzXCI7XHJcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XHJcbiAgYWN0aW9uTW9kZT86IFwiZGVmYXVsdFwiIHwgXCJkZWxldGVfb25seVwiIHwgXCJzYXZlX29ubHlcIiB8IFwidmlld19vbmx5XCI7XHJcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XHJcbiAgY2FuRWRpdFRpY2tldDogYm9vbGVhbjtcclxuICBjYW5EZWxldGVUaWNrZXQ6IGJvb2xlYW47XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGNhbk9wZW5TYXZlQ29uZmlybT86ICgpID0+IGJvb2xlYW47XHJcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBvblNhdmVTdWNjZXNzOiAoKSA9PiB2b2lkO1xyXG4gIG9uRGVsZXRlU3VjY2Vzcz86ICgpID0+IHZvaWQ7XHJcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xyXG4gIH0pID0+IHZvaWQ7XHJcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gc3RhdGUgYW5kIGRpc3BhdGNoIGFjdGlvbnMgZm9yIHRpY2tldCBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbE9wZW4sXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzTG9ja2VkLFxyXG4gIGFjdGlvbk1vZGUgPSBcImRlZmF1bHRcIixcclxuICBwZXJtaXNzaW9uc1JlYWR5ID0gdHJ1ZSxcclxuICBjYW5FZGl0VGlja2V0LFxyXG4gIGNhbkRlbGV0ZVRpY2tldCxcclxuICBmaWxlSWQsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gIGhhbmRsZVVwZGF0ZSxcclxuICBoYW5kbGVEZWxldGUsXHJcbiAgb25TYXZlU3VjY2VzcyxcclxuICBvbkRlbGV0ZVN1Y2Nlc3MsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcclxuICB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMoe1xyXG4gICAgYWN0aW9uR3JvdXBJZDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtYWN0aW9uc1wiLFxyXG4gICAgaWRzOiB7XHJcbiAgICAgIGVkaXRJY29uSWQ6IFwiZXhwZW5zZVRpY2tldEVkaXRJY29uXCIsXHJcbiAgICAgIHNhdmVJY29uSWQ6IFwiZXhwZW5zZVRpY2tldFNhdmVJY29uXCIsXHJcbiAgICAgIGRlbGV0ZUJ0bklkOiBcImV4cGVuc2VUaWNrZXREZWxldGVCdG5cIixcclxuICAgICAgY2FuY2VsQnRuSWQ6IFwiZXhwZW5zZVRpY2tldENhbmNlbEJ0blwiLFxyXG4gICAgfSxcclxuICAgIGV2ZW50czoge1xyXG4gICAgICBlZGl0RXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWVkaXRcIixcclxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWRlbGV0ZVwiLFxyXG4gICAgICBjYW5jZWxFdmVudDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtY2FuY2VsLWVkaXRcIixcclxuICAgIH0sXHJcbiAgICBidXN5LFxyXG4gICAgbW9kYWxPcGVuLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlOiBmYWxzZSxcclxuICAgIGlzTG9ja2VkLFxyXG4gICAgYWN0aW9uTW9kZSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHksXHJcbiAgICBjYW5DcmVhdGU6IGZhbHNlLFxyXG4gICAgY2FuRWRpdDogY2FuRWRpdFRpY2tldCxcclxuICAgIGNhbkRlbGV0ZTogY2FuRGVsZXRlVGlja2V0LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlU2F2ZTogaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgc2F2ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiU2F2ZSBjaGFuZ2VzXCIpLFxyXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXHJcbiAgICBzYXZlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXHJcbiAgICBkZWxldGVDb25maXJtVGl0bGU6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9UaXRsZVwiLCBcIkRlbGV0ZVwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiQ29uZmlybV9EZWxldGVfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/XCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpLFxyXG4gICAgb25TYXZlU3VjY2VzcyxcclxuICAgIG9uRGVsZXRlU3VjY2Vzczogb25EZWxldGVTdWNjZXNzIHx8ICgoKSA9PiBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvVGlja2V0c1wiKSksXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZHVjZXIsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBEaXNwYXRjaCwgU2V0U3RhdGVBY3Rpb24gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBwYXJzZUV4cGVuc2VEYXRlLCBzYWZlVGV4dCwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIsIHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcblxyXG50eXBlIERyYWZ0U3RhdGUgPSB7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgZ2FzdG9UeXBlOiBzdHJpbmc7XG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICB0b3RhbEFtb3VudDogc3RyaW5nO1xuICB0cmFuc0RhdGU6IHN0cmluZztcbiAgdGlja2V0VGltZTogc3RyaW5nO1xuICBjb21lbnRhcmlvOiBzdHJpbmc7XG4gIHVybEZpbGU6IHN0cmluZztcbiAgZmlsZU5hbWU6IHN0cmluZztcbn07XHJcblxyXG50eXBlIEVkaXRvclN0YXRlID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIG1vZGFsRXJyb3I6IHN0cmluZztcclxuICBsaW5lUGFnZTogbnVtYmVyO1xyXG4gIGRyYWZ0OiBEcmFmdFN0YXRlO1xyXG59O1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yQXJncyA9IHtcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xyXG4gIGxpbmVDb3VudDogbnVtYmVyO1xyXG4gIHBhZ2VTaXplOiBudW1iZXI7XHJcbiAgY2FuRWRpdFRpY2tldDogYm9vbGVhbjtcclxuICBpc0xvYWRpbmc6IGJvb2xlYW47XHJcbiAgYWxsb3dBc3NpZ25lZERyYWZ0RWRpdDogYm9vbGVhbjtcclxuICBpc0Zyb21TaGVldExpbms6IGJvb2xlYW47XHJcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG50eXBlIEVkaXRvckFjdGlvbiA9XHJcbiAgfCB7IHR5cGU6IFwiaHlkcmF0ZV9mcm9tX2hlYWRlclwiOyBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsIH1cclxuICB8IHtcclxuICAgICAgdHlwZTogXCJwYXRjaF9zdGF0ZVwiO1xyXG4gICAgICBwYXRjaDogUGFydGlhbDxQaWNrPEVkaXRvclN0YXRlLCBcImJ1c3lcIiB8IFwic3RhdHVzXCIgfCBcImlzRWRpdGluZ1wiIHwgXCJtb2RhbEVycm9yXCIgfCBcImxpbmVQYWdlXCI+PjtcclxuICAgIH1cclxuICB8IHsgdHlwZTogXCJzZXRfZHJhZnRfZmllbGRcIjsgZmllbGQ6IGtleW9mIERyYWZ0U3RhdGU7IHZhbHVlOiBzdHJpbmcgfTtcclxuXHJcbmNvbnN0IGNyZWF0ZUVtcHR5RHJhZnQgPSAoKTogRHJhZnRTdGF0ZSA9PiAoe1xyXG4gIGRlc2NyaXB0aW9uOiBcIlwiLFxuICBnYXN0b1R5cGU6IFwiXCIsXG4gIGN1cnJlbmN5Q29kZTogXCJcIixcbiAgdG90YWxBbW91bnQ6IFwiXCIsXG4gIHRyYW5zRGF0ZTogXCJcIixcbiAgdGlja2V0VGltZTogXCJcIixcbiAgY29tZW50YXJpbzogXCJcIixcbiAgdXJsRmlsZTogXCJcIixcbiAgZmlsZU5hbWU6IFwiXCIsXG59KTtcclxuXHJcbmNvbnN0IHRvSW5wdXREYXRlID0gKHJhdz86IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcbiAgcmV0dXJuIHBhcnNlZCA/IHRvSXNvRGF0ZShwYXJzZWQpIDogXCJcIjtcbn07XG5cbmNvbnN0IHRvSW5wdXRUaW1lID0gKHJhdz86IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHZhbHVlID0gc2FmZVRleHQocmF3KTtcbiAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PT0gXCIwXCIpIHJldHVybiBcIlwiO1xuXG4gIGNvbnN0IHNlY29uZHNWYWx1ZSA9IE51bWJlcih2YWx1ZSk7XG4gIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHNlY29uZHNWYWx1ZSkgJiYgc2Vjb25kc1ZhbHVlID49IDAgJiYgc2Vjb25kc1ZhbHVlIDw9IDg2Mzk5KSB7XG4gICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHNlY29uZHNWYWx1ZSAvIDM2MDApO1xuICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNvbmRzVmFsdWUgJSAzNjAwKSAvIDYwKTtcbiAgICBjb25zdCBzZWNvbmRzID0gc2Vjb25kc1ZhbHVlICUgNjA7XG4gICAgcmV0dXJuIFtob3VycywgbWludXRlcywgc2Vjb25kc10ubWFwKChlbnRyeSkgPT4gU3RyaW5nKGVudHJ5KS5wYWRTdGFydCgyLCBcIjBcIikpLmpvaW4oXCI6XCIpO1xuICB9XG5cbiAgY29uc3QgbWF0Y2ggPSB2YWx1ZS5tYXRjaCgvXihcXGR7MSwyfSk6KFswLTVdXFxkKSg/OjooWzAtNV1cXGQpKT8kLyk7XG4gIGlmICghbWF0Y2gpIHJldHVybiBcIlwiO1xuXG4gIGNvbnN0IGhvdXJzID0gTnVtYmVyLnBhcnNlSW50KG1hdGNoWzFdIHx8IFwiXCIsIDEwKTtcbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGhvdXJzKSB8fCBob3VycyA8IDAgfHwgaG91cnMgPiAyMykgcmV0dXJuIFwiXCI7XG5cbiAgcmV0dXJuIGAke1N0cmluZyhob3VycykucGFkU3RhcnQoMiwgXCIwXCIpfToke21hdGNoWzJdfToke21hdGNoWzNdIHx8IFwiMDBcIn1gO1xufTtcblxuY29uc3QgY3JlYXRlRHJhZnRGcm9tSGVhZGVyID0gKGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGwpOiBEcmFmdFN0YXRlID0+IHtcbiAgcmV0dXJuIHtcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoaGVhZGVyPy5kZXNjcmlwdGlvbiksXG4gICAgZ2FzdG9UeXBlOiBoZWFkZXI/Lmdhc3RvVHlwZSA9PT0gbnVsbCB8fCBoZWFkZXI/Lmdhc3RvVHlwZSA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IFN0cmluZyhoZWFkZXIuZ2FzdG9UeXBlKSxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpLFxuICAgIHRvdGFsQW1vdW50OiBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoaGVhZGVyPy50b3RhbEFtb3VudCwge1xuICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgICBmYWxsYmFjazogXCJcIixcbiAgICB9KSxcbiAgICB0cmFuc0RhdGU6IHRvSW5wdXREYXRlKGhlYWRlcj8udGlja2V0RGF0ZSB8fCBoZWFkZXI/LnRyYW5zRGF0ZSksXG4gICAgdGlja2V0VGltZTogdG9JbnB1dFRpbWUoaGVhZGVyPy50aWNrZXRUaW1lKSxcbiAgICBjb21lbnRhcmlvOiBzYWZlVGV4dChoZWFkZXI/LmNvbWVudGFyaW8pLFxuICAgIHVybEZpbGU6IHNhZmVUZXh0KGhlYWRlcj8udXJsRmlsZSksXG4gICAgZmlsZU5hbWU6IHNhZmVUZXh0KGhlYWRlcj8uZmlsZU5hbWUpLFxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlSW5pdGlhbFN0YXRlID0gKCk6IEVkaXRvclN0YXRlID0+ICh7XHJcbiAgYnVzeTogZmFsc2UsXHJcbiAgc3RhdHVzOiBcIlwiLFxyXG4gIGlzRWRpdGluZzogZmFsc2UsXHJcbiAgbW9kYWxFcnJvcjogXCJcIixcclxuICBsaW5lUGFnZTogMSxcclxuICBkcmFmdDogY3JlYXRlRW1wdHlEcmFmdCgpLFxyXG59KTtcclxuXHJcbmNvbnN0IGlzVmFsaWRSZXF1aXJlZEdhc3RvVHlwZSA9IChyYXdWYWx1ZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgcGFyc2VkVmFsdWUgPSBOdW1iZXIucGFyc2VJbnQoU3RyaW5nKHJhd1ZhbHVlIHx8IFwiXCIpLnRyaW0oKSwgMTApO1xyXG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZFZhbHVlKSAmJiBwYXJzZWRWYWx1ZSA+IDA7XHJcbn07XHJcblxyXG5jb25zdCBlZGl0b3JSZWR1Y2VyID0gKHN0YXRlOiBFZGl0b3JTdGF0ZSwgYWN0aW9uOiBFZGl0b3JBY3Rpb24pOiBFZGl0b3JTdGF0ZSA9PiB7XHJcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgY2FzZSBcImh5ZHJhdGVfZnJvbV9oZWFkZXJcIjpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICBkcmFmdDogY3JlYXRlRHJhZnRGcm9tSGVhZGVyKGFjdGlvbi5oZWFkZXIpLFxyXG4gICAgICB9O1xyXG4gICAgY2FzZSBcInBhdGNoX3N0YXRlXCI6XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgLi4uYWN0aW9uLnBhdGNoLFxyXG4gICAgICB9O1xyXG4gICAgY2FzZSBcInNldF9kcmFmdF9maWVsZFwiOlxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIGRyYWZ0OiB7XHJcbiAgICAgICAgICAuLi5zdGF0ZS5kcmFmdCxcclxuICAgICAgICAgIFthY3Rpb24uZmllbGRdOiBhY3Rpb24udmFsdWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBzdGF0ZTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlU2V0U3RhdGVWYWx1ZSA9IDxULD4odmFsdWU6IFNldFN0YXRlQWN0aW9uPFQ+LCBjdXJyZW50OiBUKTogVCA9PiB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gKHZhbHVlIGFzIChwcmV2U3RhdGU6IFQpID0+IFQpKGN1cnJlbnQpIDogdmFsdWU7XHJcbn07XHJcblxyXG4vLyBPd25zIHBhZ2UtbG9jYWwgZWRpdCwgZHJhZnQsIGFuZCBsaW5lIHBhZ2luZyBzdGF0ZSBmb3IgdGlja2V0IGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3IgPSAoe1xyXG4gIGhlYWRlcixcclxuICBsaW5lQ291bnQsXHJcbiAgcGFnZVNpemUsXHJcbiAgY2FuRWRpdFRpY2tldCxcclxuICBpc0xvYWRpbmcsXHJcbiAgYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCxcclxuICBpc0Zyb21TaGVldExpbmssXHJcbiAgb25Gb3JiaWRkZW4sXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3JBcmdzKSA9PiB7XHJcbiAgY29uc3QgW3N0YXRlLCBkaXNwYXRjaF0gPSB1c2VSZWR1Y2VyKGVkaXRvclJlZHVjZXIsIHVuZGVmaW5lZCwgY3JlYXRlSW5pdGlhbFN0YXRlKTtcclxuICBjb25zdCBbZGVzY3JpcHRpb25JbnZhbGlkLCBzZXREZXNjcmlwdGlvbkludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZ2FzdG9UeXBlSW52YWxpZCwgc2V0R2FzdG9UeXBlSW52YWxpZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtjdXJyZW5jeUNvZGVJbnZhbGlkLCBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3RvdGFsQW1vdW50SW52YWxpZCwgc2V0VG90YWxBbW91bnRJbnZhbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgZGVzY3JpcHRpb25JbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGdhc3RvVHlwZUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgY3VycmVuY3lJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHRvdGFsQW1vdW50SW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChzdGF0ZS5pc0VkaXRpbmcpIHJldHVybjtcclxuICAgIGRpc3BhdGNoKHsgdHlwZTogXCJoeWRyYXRlX2Zyb21faGVhZGVyXCIsIGhlYWRlciB9KTtcclxuICB9LCBbaGVhZGVyLCBzdGF0ZS5pc0VkaXRpbmddKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IG1heFBhZ2UgPSBNYXRoLm1heCgxLCBNYXRoLmNlaWwobGluZUNvdW50IC8gcGFnZVNpemUpKTtcclxuICAgIGlmIChzdGF0ZS5saW5lUGFnZSA+IG1heFBhZ2UpIHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IGxpbmVQYWdlOiBtYXhQYWdlIH0gfSk7XHJcbiAgICB9XHJcbiAgfSwgW2xpbmVDb3VudCwgcGFnZVNpemUsIHN0YXRlLmxpbmVQYWdlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc3RhdGUuaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBzZXREZXNjcmlwdGlvbkludmFsaWQoZmFsc2UpO1xuICAgIHNldEdhc3RvVHlwZUludmFsaWQoZmFsc2UpO1xuICAgIHNldEN1cnJlbmN5Q29kZUludmFsaWQoZmFsc2UpO1xuICAgIHNldFRvdGFsQW1vdW50SW52YWxpZChmYWxzZSk7XG4gIH0sIFtzdGF0ZS5pc0VkaXRpbmddKTtcblxyXG4gIGNvbnN0IHNldEJ1c3kgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxib29sZWFuPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBidXN5OiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuYnVzeSkgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuYnVzeV1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRTdGF0dXMgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxzdHJpbmc+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IHN0YXR1czogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLnN0YXR1cykgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuc3RhdHVzXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldElzRWRpdGluZyA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPGJvb2xlYW4+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IGlzRWRpdGluZzogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmlzRWRpdGluZykgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuaXNFZGl0aW5nXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldE1vZGFsRXJyb3IgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxzdHJpbmc+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IG1vZGFsRXJyb3I6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5tb2RhbEVycm9yKSB9IH0pO1xyXG4gICAgfSxcclxuICAgIFtzdGF0ZS5tb2RhbEVycm9yXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldExpbmVQYWdlID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248bnVtYmVyPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBsaW5lUGFnZTogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmxpbmVQYWdlKSB9IH0pO1xyXG4gICAgfSxcclxuICAgIFtzdGF0ZS5saW5lUGFnZV1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXREcmFmdERlc2NyaXB0aW9uID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIHNldERlc2NyaXB0aW9uSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcInNldF9kcmFmdF9maWVsZFwiLFxyXG4gICAgICAgIGZpZWxkOiBcImRlc2NyaXB0aW9uXCIsXHJcbiAgICAgICAgdmFsdWU6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5kZXNjcmlwdGlvbiksXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtzdGF0ZS5kcmFmdC5kZXNjcmlwdGlvbl1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXREcmFmdEdhc3RvVHlwZSA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBzZXRHYXN0b1R5cGVJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwic2V0X2RyYWZ0X2ZpZWxkXCIsXHJcbiAgICAgICAgZmllbGQ6IFwiZ2FzdG9UeXBlXCIsXHJcbiAgICAgICAgdmFsdWU6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5nYXN0b1R5cGUpLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuZHJhZnQuZ2FzdG9UeXBlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldERyYWZ0Q3VycmVuY3lDb2RlID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwic2V0X2RyYWZ0X2ZpZWxkXCIsXHJcbiAgICAgICAgZmllbGQ6IFwiY3VycmVuY3lDb2RlXCIsXHJcbiAgICAgICAgdmFsdWU6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUpLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlXVxyXG4gICk7XG5cbiAgY29uc3Qgc2V0RHJhZnRUb3RhbEFtb3VudCA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcbiAgICAodmFsdWUpID0+IHtcbiAgICAgIHNldFRvdGFsQW1vdW50SW52YWxpZChmYWxzZSk7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFwic2V0X2RyYWZ0X2ZpZWxkXCIsXG4gICAgICAgIGZpZWxkOiBcInRvdGFsQW1vdW50XCIsXG4gICAgICAgIHZhbHVlOiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuZHJhZnQudG90YWxBbW91bnQpLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbc3RhdGUuZHJhZnQudG90YWxBbW91bnRdXG4gICk7XG5cclxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFoZWFkZXIgfHwgaXNMb2FkaW5nKSByZXR1cm47XHJcbiAgICBpZiAoaXNGcm9tU2hlZXRMaW5rKSByZXR1cm47XHJcbiAgICBpZiAoaGVhZGVyLnN0YXR1cyA9PT0gMSAmJiAhYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCkgcmV0dXJuO1xyXG4gICAgaWYgKCFjYW5FZGl0VGlja2V0KSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRHYXN0b1R5cGVJbnZhbGlkKGZhbHNlKTtcbiAgICBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkKGZhbHNlKTtcbiAgICBzZXRUb3RhbEFtb3VudEludmFsaWQoZmFsc2UpO1xuICAgIGRpc3BhdGNoKHsgdHlwZTogXCJoeWRyYXRlX2Zyb21faGVhZGVyXCIsIGhlYWRlciB9KTtcclxuICAgIGRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLFxyXG4gICAgICBwYXRjaDoge1xyXG4gICAgICAgIG1vZGFsRXJyb3I6IFwiXCIsXHJcbiAgICAgICAgaXNFZGl0aW5nOiB0cnVlLFxyXG4gICAgICAgIHN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0VkaXRpbmdFbmFibGVkXCIsIFwiRWRpdGluZyBlbmFibGVkXCIpLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSwgW2FsbG93QXNzaWduZWREcmFmdEVkaXQsIGNhbkVkaXRUaWNrZXQsIGhlYWRlciwgaXNGcm9tU2hlZXRMaW5rLCBpc0xvYWRpbmcsIG9uRm9yYmlkZGVuXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNhbmNlbEVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIXN0YXRlLmlzRWRpdGluZykgcmV0dXJuO1xyXG4gICAgaWYgKCFoZWFkZXIpIHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IGlzRWRpdGluZzogZmFsc2UgfSB9KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdhc3RvVHlwZUludmFsaWQoZmFsc2UpO1xuICAgIHNldEN1cnJlbmN5Q29kZUludmFsaWQoZmFsc2UpO1xuICAgIHNldFRvdGFsQW1vdW50SW52YWxpZChmYWxzZSk7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiBcImh5ZHJhdGVfZnJvbV9oZWFkZXJcIiwgaGVhZGVyIH0pO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBcInBhdGNoX3N0YXRlXCIsXHJcbiAgICAgIHBhdGNoOiB7XHJcbiAgICAgICAgaXNFZGl0aW5nOiBmYWxzZSxcclxuICAgICAgICBtb2RhbEVycm9yOiBcIlwiLFxyXG4gICAgICAgIHN0YXR1czogaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LCBbaGVhZGVyLCBzdGF0ZS5pc0VkaXRpbmddKTtcclxuXHJcbiAgY29uc3QgY2FuT3BlblNhdmVDb25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZERlc2NyaXB0aW9uID0gU3RyaW5nKHN0YXRlLmRyYWZ0LmRlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3lDb2RlID0gU3RyaW5nKHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBwYXJzZWRUb3RhbEFtb3VudCA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChzdGF0ZS5kcmFmdC50b3RhbEFtb3VudCk7XG4gICAgY29uc3QgZGVzY3JpcHRpb25Jc1ZhbGlkID0gISFub3JtYWxpemVkRGVzY3JpcHRpb247XG4gICAgY29uc3QgZ2FzdG9UeXBlSXNWYWxpZCA9IGlzVmFsaWRSZXF1aXJlZEdhc3RvVHlwZShzdGF0ZS5kcmFmdC5nYXN0b1R5cGUpO1xuICAgIGNvbnN0IGN1cnJlbmN5SXNWYWxpZCA9ICEhbm9ybWFsaXplZEN1cnJlbmN5Q29kZTtcbiAgICBjb25zdCB0b3RhbEFtb3VudElzVmFsaWQgPSBwYXJzZWRUb3RhbEFtb3VudCAhPSBudWxsICYmIHBhcnNlZFRvdGFsQW1vdW50ID49IDA7XG5cbiAgICBzZXREZXNjcmlwdGlvbkludmFsaWQoIWRlc2NyaXB0aW9uSXNWYWxpZCk7XG4gICAgc2V0R2FzdG9UeXBlSW52YWxpZCghZ2FzdG9UeXBlSXNWYWxpZCk7XG4gICAgc2V0Q3VycmVuY3lDb2RlSW52YWxpZCghY3VycmVuY3lJc1ZhbGlkKTtcbiAgICBzZXRUb3RhbEFtb3VudEludmFsaWQoIXRvdGFsQW1vdW50SXNWYWxpZCk7XG5cbiAgICBpZiAoZGVzY3JpcHRpb25Jc1ZhbGlkICYmIGdhc3RvVHlwZUlzVmFsaWQgJiYgY3VycmVuY3lJc1ZhbGlkICYmIHRvdGFsQW1vdW50SXNWYWxpZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZSA9ICFkZXNjcmlwdGlvbklzVmFsaWRcclxuICAgICAgPyBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0Rlc2NyaXB0aW9uUmVxdWlyZWRcIiwgXCJEZXNjcmlwdGlvbiBpcyByZXF1aXJlZC5cIilcbiAgICAgIDogIWdhc3RvVHlwZUlzVmFsaWRcbiAgICAgICAgPyBpbmRUKFwiVGlja2V0c19WYWxpZGF0aW9uX0NhdGVnb3J5UmVxdWlyZWRcIiwgXCJDYXRlZ29yeSBpcyByZXF1aXJlZC5cIilcbiAgICAgICAgOiAhY3VycmVuY3lJc1ZhbGlkXG4gICAgICAgICAgPyBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0N1cnJlbmN5UmVxdWlyZWRcIiwgXCJDdXJyZW5jeSBpcyByZXF1aXJlZC5cIilcbiAgICAgICAgICA6IGluZFQoXCJUaWNrZXRzX1ZhbGlkYXRpb25fVG90YWxBbW91bnRSZXF1aXJlZFwiLCBcIlRvdGFsIGFtb3VudCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAwLlwiKTtcblxyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBcInBhdGNoX3N0YXRlXCIsXHJcbiAgICAgIHBhdGNoOiB7XHJcbiAgICAgICAgbW9kYWxFcnJvcjogbWVzc2FnZSxcclxuICAgICAgICBzdGF0dXM6IG1lc3NhZ2UsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgaWYgKCFkZXNjcmlwdGlvbklzVmFsaWQpIHtcclxuICAgICAgICBkZXNjcmlwdGlvbklucHV0UmVmLmN1cnJlbnQ/LmZvY3VzKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWdhc3RvVHlwZUlzVmFsaWQpIHtcclxuICAgICAgICBnYXN0b1R5cGVJbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFjdXJyZW5jeUlzVmFsaWQpIHtcbiAgICAgICAgY3VycmVuY3lJbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghdG90YWxBbW91bnRJc1ZhbGlkKSB7XG4gICAgICAgIHRvdGFsQW1vdW50SW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSwgW3N0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSwgc3RhdGUuZHJhZnQuZGVzY3JpcHRpb24sIHN0YXRlLmRyYWZ0Lmdhc3RvVHlwZSwgc3RhdGUuZHJhZnQudG90YWxBbW91bnRdKTtcblxyXG4gIHJldHVybiB7XHJcbiAgICBidXN5OiBzdGF0ZS5idXN5LFxyXG4gICAgc3RhdHVzOiBzdGF0ZS5zdGF0dXMsXHJcbiAgICBpc0VkaXRpbmc6IHN0YXRlLmlzRWRpdGluZyxcclxuICAgIG1vZGFsRXJyb3I6IHN0YXRlLm1vZGFsRXJyb3IsXHJcbiAgICBsaW5lUGFnZTogc3RhdGUubGluZVBhZ2UsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uOiBzdGF0ZS5kcmFmdC5kZXNjcmlwdGlvbixcclxuICAgIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICAgIGRlc2NyaXB0aW9uSW5wdXRSZWYsXHJcbiAgICBkcmFmdEdhc3RvVHlwZTogc3RhdGUuZHJhZnQuZ2FzdG9UeXBlLFxyXG4gICAgZ2FzdG9UeXBlSW52YWxpZCxcclxuICAgIGdhc3RvVHlwZUlucHV0UmVmLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSxcbiAgICBjdXJyZW5jeUNvZGVJbnZhbGlkLFxuICAgIGN1cnJlbmN5SW5wdXRSZWYsXG4gICAgZHJhZnRUb3RhbEFtb3VudDogc3RhdGUuZHJhZnQudG90YWxBbW91bnQsXG4gICAgdG90YWxBbW91bnRJbnZhbGlkLFxuICAgIHRvdGFsQW1vdW50SW5wdXRSZWYsXG4gICAgZHJhZnRUcmFuc0RhdGU6IHN0YXRlLmRyYWZ0LnRyYW5zRGF0ZSxcbiAgICBkcmFmdFRpY2tldFRpbWU6IHN0YXRlLmRyYWZ0LnRpY2tldFRpbWUsXG4gICAgZHJhZnRDb21lbnRhcmlvOiBzdGF0ZS5kcmFmdC5jb21lbnRhcmlvLFxuICAgIGRyYWZ0VXJsRmlsZTogc3RhdGUuZHJhZnQudXJsRmlsZSxcbiAgICBkcmFmdEZpbGVOYW1lOiBzdGF0ZS5kcmFmdC5maWxlTmFtZSxcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldExpbmVQYWdlLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcbiAgICBzZXREcmFmdEdhc3RvVHlwZSxcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBzZXREcmFmdFRvdGFsQW1vdW50LFxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7XHJcbiAgbm9ybWFsaXplRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgcmVzb2x2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuXHJcbi8vIFBhcnNlcyByb3V0ZSBjb250ZXh0IG9uY2UgYW5kIGV4cG9zZXMgc3RhYmxlIGZsYWdzIGZvciB0aWNrZXQgZGV0YWlsIGZsb3dzLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbFJvdXRlQ29udGV4dCA9ICgpID0+IHtcclxuICBjb25zdCByb3V0ZVBhcmFtcyA9IHVzZU1lbW8oKCkgPT4gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKSwgW10pO1xyXG4gIGNvbnN0IGZpbGVJZCA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQod2luZG93Ll9fRVhQRU5TRV9USUNLRVRfRklMRV9JRF9fKSwgW10pO1xyXG4gIGNvbnN0IGF1dG9FZGl0TW9kZSA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwibW9kZVwiKSkudG9Mb3dlckNhc2UoKSA9PT0gXCJlZGl0XCIsIFtyb3V0ZVBhcmFtc10pO1xyXG4gIGNvbnN0IHJvdXRlT3JpZ2luID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChyb3V0ZVBhcmFtcy5nZXQoXCJvcmlnaW5cIikpLnRvTG93ZXJDYXNlKCksIFtyb3V0ZVBhcmFtc10pO1xyXG4gIGNvbnN0IHJvdXRlU2hlZXRJZCA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwic2hlZXRJZFwiKSksIFtyb3V0ZVBhcmFtc10pO1xyXG4gIGNvbnN0IHJvdXRlU2hlZXRMaW5lUmVjSWQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwic2hlZXRMaW5lUmVjSWRcIikgfHwgcm91dGVQYXJhbXMuZ2V0KFwibGluZVJlY0lkXCIpKSxcclxuICAgIFtyb3V0ZVBhcmFtc11cclxuICApO1xyXG4gIGNvbnN0IGV4cGxpY2l0UmV0dXJuQ29udGV4dCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PlxyXG4gICAgICBub3JtYWxpemVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCh7XHJcbiAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgIG9yaWdpbjogcm91dGVPcmlnaW4sXHJcbiAgICAgICAgc2hlZXRJZDogcm91dGVTaGVldElkLFxyXG4gICAgICAgIHNoZWV0TGluZVJlY0lkOiByb3V0ZVNoZWV0TGluZVJlY0lkLFxyXG4gICAgICB9KSxcclxuICAgIFtmaWxlSWQsIHJvdXRlT3JpZ2luLCByb3V0ZVNoZWV0SWQsIHJvdXRlU2hlZXRMaW5lUmVjSWRdXHJcbiAgKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghZXhwbGljaXRSZXR1cm5Db250ZXh0KSByZXR1cm47XHJcbiAgICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoZXhwbGljaXRSZXR1cm5Db250ZXh0KTtcclxuICB9LCBbZXhwbGljaXRSZXR1cm5Db250ZXh0XSk7XHJcblxyXG4gIHJldHVybiB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IHRpY2tldFJldHVybkNvbnRleHQgPSByZXNvbHZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoZmlsZUlkLCBleHBsaWNpdFJldHVybkNvbnRleHQpO1xyXG4gICAgY29uc3QgZGV0YWlsT3JpZ2luID0gdGlja2V0UmV0dXJuQ29udGV4dD8ub3JpZ2luIHx8IHJvdXRlT3JpZ2luO1xyXG4gICAgY29uc3QgY29udGV4dFNoZWV0SWQgPSB0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkIHx8IHJvdXRlU2hlZXRJZDtcclxuICAgIGNvbnN0IGNvbnRleHRMaW5lUmVjSWQgPSB0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldExpbmVSZWNJZCB8fCByb3V0ZVNoZWV0TGluZVJlY0lkO1xyXG4gICAgY29uc3QgaXNGcm9tRXhwZW5zZVNoZWV0Q3JlYXRlID0gZGV0YWlsT3JpZ2luID09PSBcInNoZWV0LWNyZWF0ZVwiO1xyXG4gICAgY29uc3QgaXNGcm9tRXhwZW5zZUxpbmUgPSBkZXRhaWxPcmlnaW4gPT09IFwiZXhwZW5zZS1saW5lXCIgJiYgISFjb250ZXh0U2hlZXRJZCAmJiAhIWNvbnRleHRMaW5lUmVjSWQ7XHJcbiAgICBjb25zdCBpc0Zyb21TaGVldExpbmsgPSBkZXRhaWxPcmlnaW4gPT09IFwic2hlZXQtbGlua1wiICYmICEhY29udGV4dFNoZWV0SWQ7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYXV0b0VkaXRNb2RlLFxyXG4gICAgICBkZXRhaWxPcmlnaW4sXHJcbiAgICAgIGNvbnRleHRTaGVldElkLFxyXG4gICAgICBjb250ZXh0TGluZVJlY0lkLFxyXG4gICAgICBpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUsXHJcbiAgICAgIGlzRnJvbUV4cGVuc2VMaW5lLFxyXG4gICAgICBpc0Zyb21TaGVldExpbmssXHJcbiAgICAgIHRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgICB9O1xyXG4gIH0sIFthdXRvRWRpdE1vZGUsIGV4cGxpY2l0UmV0dXJuQ29udGV4dCwgZmlsZUlkLCByb3V0ZU9yaWdpbiwgcm91dGVTaGVldElkLCByb3V0ZVNoZWV0TGluZVJlY0lkXSk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi8uLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50cy9leHBlbnNlVGlja2V0U3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXlBcmdzID0ge1xyXG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw7XG4gIGRyYWZ0R2FzdG9UeXBlOiBzdHJpbmc7XG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGRyYWZ0VG90YWxBbW91bnQ6IHN0cmluZztcbiAgZHJhZnRUcmFuc0RhdGU6IHN0cmluZztcbiAgZHJhZnRUaWNrZXRUaW1lOiBzdHJpbmc7XG4gIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBnYXN0b1R5cGVMYWJlbE1hcDogTWFwPHN0cmluZywgc3RyaW5nPjtcbn07XG5cbmNvbnN0IGZvcm1hdEV4cGVuc2VEaXNwbGF5VGltZSA9IChyYXc/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCB2YWx1ZSA9IHNhZmVUZXh0KHJhdyk7XG4gIGlmICghdmFsdWUgfHwgdmFsdWUgPT09IFwiMFwiKSByZXR1cm4gXCJcIjtcblxuICBjb25zdCBzZWNvbmRzVmFsdWUgPSBOdW1iZXIodmFsdWUpO1xuICBpZiAoTnVtYmVyLmlzSW50ZWdlcihzZWNvbmRzVmFsdWUpICYmIHNlY29uZHNWYWx1ZSA+PSAwICYmIHNlY29uZHNWYWx1ZSA8PSA4NjM5OSkge1xuICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihzZWNvbmRzVmFsdWUgLyAzNjAwKTtcbiAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2Vjb25kc1ZhbHVlICUgMzYwMCkgLyA2MCk7XG4gICAgY29uc3Qgc2Vjb25kcyA9IHNlY29uZHNWYWx1ZSAlIDYwO1xuICAgIHJldHVybiBbaG91cnMsIG1pbnV0ZXMsIHNlY29uZHNdLm1hcCgoZW50cnkpID0+IFN0cmluZyhlbnRyeSkucGFkU3RhcnQoMiwgXCIwXCIpKS5qb2luKFwiOlwiKTtcbiAgfVxuXG4gIGNvbnN0IG1hdGNoID0gdmFsdWUubWF0Y2goL14oXFxkezEsMn0pOihbMC01XVxcZCkoPzo6KFswLTVdXFxkKSk/JC8pO1xuICBpZiAoIW1hdGNoKSByZXR1cm4gdmFsdWU7XG5cbiAgY29uc3QgaG91cnMgPSBOdW1iZXIucGFyc2VJbnQobWF0Y2hbMV0gfHwgXCJcIiwgMTApO1xuICBpZiAoIU51bWJlci5pc0ludGVnZXIoaG91cnMpIHx8IGhvdXJzIDwgMCB8fCBob3VycyA+IDIzKSByZXR1cm4gdmFsdWU7XG5cbiAgcmV0dXJuIGAke1N0cmluZyhob3VycykucGFkU3RhcnQoMiwgXCIwXCIpfToke21hdGNoWzJdfToke21hdGNoWzNdIHx8IFwiMDBcIn1gO1xufTtcblxuLy8gQ2VudHJhbGl6ZXMgZGlzcGxheS1vbmx5IHZhbHVlcyBzbyB0aGUgcGFnZSBjb250YWluZXIgc3RheXMgZm9jdXNlZCBvbiBmbG93IHdpcmluZy5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsRGlzcGxheSA9ICh7XG4gIGhlYWRlcixcbiAgZHJhZnRHYXN0b1R5cGUsXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICBkcmFmdFRvdGFsQW1vdW50LFxuICBkcmFmdFRyYW5zRGF0ZSxcbiAgZHJhZnRUaWNrZXRUaW1lLFxuICBkcmFmdEZpbGVOYW1lLFxuICBpc0VkaXRpbmcsXG4gIGdhc3RvVHlwZUxhYmVsTWFwLFxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXlBcmdzKSA9PiB7XG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgZmlyc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKSxcclxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXHJcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXHJcbiAgICAgIGxhc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIiksXHJcbiAgICB9KSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgcHJldmlld0FsdFRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gc2FmZVRleHQoaXNFZGl0aW5nID8gZHJhZnRGaWxlTmFtZSA6IGhlYWRlcj8uZmlsZU5hbWUpIHx8IGluZFQoXCJUaWNrZXRzX0ZpZWxkX0ZpbGVJZFwiLCBcIlRpY2tldFwiKSxcclxuICAgIFtkcmFmdEZpbGVOYW1lLCBoZWFkZXI/LmZpbGVOYW1lLCBpc0VkaXRpbmddXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc3RhdHVzTGFiZWwgPSB1c2VNZW1vKCgpID0+IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbChoZWFkZXI/LnN0YXR1cyksIFtoZWFkZXI/LnN0YXR1c10pO1xyXG5cclxuICBjb25zdCBnYXN0b1R5cGVMYWJlbCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgY3VycmVudEdhc3RvVHlwZSA9IGlzRWRpdGluZyA/IGRyYWZ0R2FzdG9UeXBlIDogaGVhZGVyPy5nYXN0b1R5cGUgPT09IG51bGwgPyBcIlwiIDogU3RyaW5nKGhlYWRlcj8uZ2FzdG9UeXBlID8/IFwiXCIpO1xyXG4gICAgaWYgKCFjdXJyZW50R2FzdG9UeXBlKSB7XHJcbiAgICAgIHJldHVybiBpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBnYXN0b1R5cGVMYWJlbE1hcC5nZXQoU3RyaW5nKGN1cnJlbnRHYXN0b1R5cGUpKSB8fCBTdHJpbmcoY3VycmVudEdhc3RvVHlwZSk7XHJcbiAgfSwgW2RyYWZ0R2FzdG9UeXBlLCBnYXN0b1R5cGVMYWJlbE1hcCwgaGVhZGVyPy5nYXN0b1R5cGUsIGlzRWRpdGluZ10pO1xyXG5cclxuICBjb25zdCB0b3RhbEFtb3VudFRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+IHtcbiAgICAgIGNvbnN0IGVkaXRhYmxlVG90YWxBbW91bnQgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQoZHJhZnRUb3RhbEFtb3VudCk7XG4gICAgICByZXR1cm4gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KFxuICAgICAgICBpc0VkaXRpbmcgJiYgZWRpdGFibGVUb3RhbEFtb3VudCAhPSBudWxsID8gZWRpdGFibGVUb3RhbEFtb3VudCA6IGhlYWRlcj8udG90YWxBbW91bnQgPz8gbnVsbCxcbiAgICAgICAgKGlzRWRpdGluZyA/IGRyYWZ0Q3VycmVuY3lDb2RlIDogaGVhZGVyPy5jdXJyZW5jeUNvZGUpIHx8IGhlYWRlcj8uY3VycmVuY3lDb2RlXG4gICAgICApO1xuICAgIH0sXG4gICAgW2RyYWZ0Q3VycmVuY3lDb2RlLCBkcmFmdFRvdGFsQW1vdW50LCBoZWFkZXI/LmN1cnJlbmN5Q29kZSwgaGVhZGVyPy50b3RhbEFtb3VudCwgaXNFZGl0aW5nXVxuICApO1xuXHJcbiAgY29uc3QgdHJhbnNEYXRlVGV4dCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGlzRWRpdGluZyA/IGRyYWZ0VHJhbnNEYXRlIDogaGVhZGVyPy50aWNrZXREYXRlIHx8IGhlYWRlcj8udHJhbnNEYXRlLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIiksXG4gICAgW2RyYWZ0VHJhbnNEYXRlLCBoZWFkZXI/LnRpY2tldERhdGUsIGhlYWRlcj8udHJhbnNEYXRlLCBpc0VkaXRpbmddXG4gICk7XG5cbiAgY29uc3QgdGlja2V0VGltZVRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+IGZvcm1hdEV4cGVuc2VEaXNwbGF5VGltZShpc0VkaXRpbmcgPyBkcmFmdFRpY2tldFRpbWUgOiBoZWFkZXI/LnRpY2tldFRpbWUpLFxuICAgIFtkcmFmdFRpY2tldFRpbWUsIGhlYWRlcj8udGlja2V0VGltZSwgaXNFZGl0aW5nXVxuICApO1xuXG4gIHJldHVybiB7XG4gICAgcGFnaW5hdGlvbkxhYmVscyxcclxuICAgIHByZXZpZXdBbHRUZXh0LFxyXG4gICAgc3RhdHVzTGFiZWwsXHJcbiAgICBnYXN0b1R5cGVMYWJlbCxcbiAgICB0b3RhbEFtb3VudFRleHQsXG4gICAgdHJhbnNEYXRlVGV4dCxcbiAgICB0aWNrZXRUaW1lVGV4dCxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsQ29uZmlybVN0YXRlQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsRXJyb3I6IHN0cmluZztcclxuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRTdGF0dXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gRW5jYXBzdWxhdGVzIGNvbmZpcm0gbW9kYWwgc3RhdGUgc28gdGhlIHBhZ2UgY29udGFpbmVyIHN0YXlzIGZvY3VzZWQgb24gZmxvdyB3aXJpbmcuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQ29uZmlybVN0YXRlID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsRXJyb3IsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBzZXRTdGF0dXMsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGVBcmdzKSA9PiB7XHJcbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XHJcbiAgICBkZWZhdWx0Q29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpLFxyXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XHJcbiAgICAgICAgc2V0U3RhdHVzKG1zZyk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LCBbYnVzeSwgaGFuZGxlQ29uZmlybSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzXSk7XHJcblxyXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XHJcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcclxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxyXG4gICAgOiAhYnVzeSAmJiBtb2RhbEVycm9yXHJcbiAgICAgID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpXHJcbiAgICAgIDogbW9kYWwuY29uZmlybVRleHQgfHwgaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIik7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghYnVzeSAmJiBtb2RhbEVycm9yKSB7XHJcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2b2lkIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xyXG4gIH0sIFtidXN5LCBjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbW9kYWxFcnJvcl0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbW9kYWwsXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICAgIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgICBtb2RhbENhbmNlbFRleHQsXHJcbiAgICBtb2RhbENvbmZpcm1UZXh0LFxyXG4gICAgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGFwcGVuZEV4cGVuc2VUaWNrZXRSZXR1cm5RdWVyeSxcclxuICBidWlsZEV4cGVuc2VTaGVldERldGFpbFVybCxcclxuICB0eXBlIEV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG59IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dC50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsSW50ZXJhY3Rpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGNvbnRleHRTaGVldElkOiBzdHJpbmc7XHJcbiAgaXNGcm9tU2hlZXRMaW5rOiBib29sZWFuO1xyXG4gIGhlYWRlckV4cGVuc2VTaGVldElkOiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGNhbk9wZW5TYXZlQ29uZmlybTogKCkgPT4gYm9vbGVhbjtcclxuICBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQ6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgYnlwYXNzV29ya2Zsb3dHdWFyZDogYm9vbGVhbjtcclxuICBsaW5lQ29udGFpbmVyUmVmOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBvcGVuUHJldmlldzogKCkgPT4gUHJvbWlzZTx2b2lkPjtcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0PzogRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQgfCBudWxsO1xyXG59O1xyXG5cclxuLy8gR3JvdXBzIHRpY2tldCBkZXRhaWwgbmF2aWdhdGlvbiBhbmQgbGluZS1jYXJkIGludGVyYWN0aW9ucyBiZWhpbmQgc3RhYmxlIGNhbGxiYWNrcy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgZmlsZUlkLFxyXG4gIGNvbnRleHRTaGVldElkLFxyXG4gIGlzRnJvbVNoZWV0TGluayxcclxuICBoZWFkZXJFeHBlbnNlU2hlZXRJZCxcclxuICBpc0VkaXRpbmcsXHJcbiAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gIGhhbmRsZVBlcnNpc3RIZWFkZXJEcmFmdCxcclxuICBieXBhc3NXb3JrZmxvd0d1YXJkLFxyXG4gIGxpbmVDb250YWluZXJSZWYsXHJcbiAgb3BlblByZXZpZXcsXHJcbiAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9uc0FyZ3MpID0+IHtcclxuICBjb25zdCBwZXJzaXN0SGVhZGVyRHJhZnRJZk5lZWRlZCA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmICghaXNFZGl0aW5nKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY2FuT3BlblNhdmVDb25maXJtKCkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQoKTtcclxuICB9LCBbY2FuT3BlblNhdmVDb25maXJtLCBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQsIGlzRWRpdGluZ10pO1xyXG5cclxuICBjb25zdCBvcGVuTGluZURldGFpbCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKHJhd0xpbmVSZWNJZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGlmIChpc0Zyb21TaGVldExpbmspIHJldHVybjtcclxuICAgICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgICAgY29uc3QgbGluZVJlY0lkID0gc2FmZVRleHQocmF3TGluZVJlY0lkKTtcclxuICAgICAgaWYgKCFsaW5lUmVjSWQgfHwgIWZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3Qgc2hvdWxkT3BlbkluRWRpdE1vZGUgPSBpc0VkaXRpbmc7XHJcbiAgICAgIGlmIChzaG91bGRPcGVuSW5FZGl0TW9kZSkge1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZU9rID0gYXdhaXQgcGVyc2lzdEhlYWRlckRyYWZ0SWZOZWVkZWQoKTtcclxuICAgICAgICBpZiAoIXVwZGF0ZU9rKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICAgIGZpbGVJZCxcclxuICAgICAgICBsaW5lUmVjSWQsXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoc2hvdWxkT3BlbkluRWRpdE1vZGUpIHtcclxuICAgICAgICBxdWVyeS5zZXQoXCJtb2RlXCIsIFwiZWRpdFwiKTtcclxuICAgICAgfVxyXG4gICAgICBhcHBlbmRFeHBlbnNlVGlja2V0UmV0dXJuUXVlcnkocXVlcnksIHRpY2tldFJldHVybkNvbnRleHQpO1xyXG5cclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0TGluZURldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiBzaG91bGRPcGVuSW5FZGl0TW9kZSB8fCBieXBhc3NXb3JrZmxvd0d1YXJkLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIGJ5cGFzc1dvcmtmbG93R3VhcmQsXHJcbiAgICAgIGZpbGVJZCxcclxuICAgICAgaXNFZGl0aW5nLFxyXG4gICAgICBpc0Zyb21TaGVldExpbmssXHJcbiAgICAgIHBlcnNpc3RIZWFkZXJEcmFmdElmTmVlZGVkLFxyXG4gICAgICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG9wZW5DcmVhdGVMaW5lRGV0YWlsID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGlzRnJvbVNoZWV0TGluaykgcmV0dXJuO1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgIGlmICghZmlsZUlkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgdXBkYXRlT2sgPSBhd2FpdCBwZXJzaXN0SGVhZGVyRHJhZnRJZk5lZWRlZCgpO1xyXG4gICAgaWYgKCF1cGRhdGVPaykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgZmlsZUlkLFxyXG4gICAgICBtb2RlOiBcImNyZWF0ZVwiLFxyXG4gICAgfSk7XHJcbiAgICBhcHBlbmRFeHBlbnNlVGlja2V0UmV0dXJuUXVlcnkocXVlcnksIHRpY2tldFJldHVybkNvbnRleHQpO1xyXG5cclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldExpbmVEZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcclxuICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcclxuICAgICAgYnlwYXNzR3VhcmRPbmNlOiBpc0VkaXRpbmcgfHwgYnlwYXNzV29ya2Zsb3dHdWFyZCxcclxuICAgIH0pO1xyXG4gIH0sIFtidXN5LCBieXBhc3NXb3JrZmxvd0d1YXJkLCBmaWxlSWQsIGlzRWRpdGluZywgaXNGcm9tU2hlZXRMaW5rLCBwZXJzaXN0SGVhZGVyRHJhZnRJZk5lZWRlZCwgdGlja2V0UmV0dXJuQ29udGV4dF0pO1xyXG5cclxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcclxuICAgICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xyXG4gICAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xyXG4gICAgICBpZiAoIWxpbmVDb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xyXG4gICAgICByZXR1cm4gY2FyZDtcclxuICAgIH0sXHJcbiAgICBbbGluZUNvbnRhaW5lclJlZl1cclxuICApO1xyXG5cclxuICBjb25zdCBvcGVuRmlsZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHZvaWQgb3BlblByZXZpZXcoKTtcclxuICB9LCBbb3BlblByZXZpZXddKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChpc0Zyb21TaGVldExpbmspIHJldHVybjtcclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQodGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCB8fCBoZWFkZXJFeHBlbnNlU2hlZXRJZCB8fCBjb250ZXh0U2hlZXRJZCk7XHJcbiAgICBpZiAoIXNhZmVTaGVldElkKSByZXR1cm47XHJcblxyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwoc2FmZVNoZWV0SWQpLCB7XHJcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxyXG4gICAgfSk7XHJcbiAgfSwgW2NvbnRleHRTaGVldElkLCBoZWFkZXJFeHBlbnNlU2hlZXRJZCwgaXNFZGl0aW5nLCBpc0Zyb21TaGVldExpbmssIHRpY2tldFJldHVybkNvbnRleHRdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG9wZW5DcmVhdGVMaW5lRGV0YWlsLFxyXG4gICAgb3BlbkxpbmVEZXRhaWwsXHJcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcclxuICAgIG9wZW5GaWxlLFxyXG4gICAgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB9IGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcbmltcG9ydCB7IGhhc0V4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdTb3VyY2UgfSBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvZXhwZW5zZVRpY2tldFByZXZpZXdVdGlscy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0LnRzeFwiO1xuXHJcbmNvbnN0IGhhc1JlYWxFeHBlbnNlU2hlZXRWYWx1ZSA9ICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHNhZmVUZXh0KHZhbHVlKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIGZhbHNlO1xyXG4gIGlmIChub3JtYWxpemVkID09PSBcIi1cIiB8fCBub3JtYWxpemVkID09PSBcIjBcIikgcmV0dXJuIGZhbHNlO1xyXG4gIGlmIChub3JtYWxpemVkID09PSBcIm4vYVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwibmFcIikgcmV0dXJuIGZhbHNlO1xyXG4gIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybVByb3BzID0ge1xyXG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlcjtcclxuICBzdGF0dXNMYWJlbDogc3RyaW5nO1xyXG4gIGdhc3RvVHlwZUxhYmVsOiBzdHJpbmc7XG4gIHRvdGFsQW1vdW50VGV4dDogc3RyaW5nO1xuICB0cmFuc0RhdGVUZXh0OiBzdHJpbmc7XG4gIHRpY2tldFRpbWVUZXh0OiBzdHJpbmc7XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgZ2FzdG9UeXBlT3B0aW9uczogQXJyYXk8eyB2YWx1ZTogc3RyaW5nOyB0ZXh0OiBzdHJpbmcgfT47XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uSW52YWxpZDogYm9vbGVhbjtcclxuICBkZXNjcmlwdGlvbklucHV0UmVmOiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcbiAgZ2FzdG9UeXBlSW52YWxpZDogYm9vbGVhbjtcbiAgZ2FzdG9UeXBlSW5wdXRSZWY6IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgY3VycmVuY3lDb2RlSW52YWxpZDogYm9vbGVhbjtcbiAgY3VycmVuY3lJbnB1dFJlZjogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuICBkcmFmdFRvdGFsQW1vdW50OiBzdHJpbmc7XG4gIHRvdGFsQW1vdW50SW52YWxpZDogYm9vbGVhbjtcbiAgdG90YWxBbW91bnRJbnB1dFJlZjogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xuICBkcmFmdFRpY2tldFRpbWU6IHN0cmluZztcbiAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XG4gIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0VG90YWxBbW91bnRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbk9wZW5GaWxlOiAoKSA9PiB2b2lkO1xuICBvbk9wZW5FeHBlbnNlU2hlZXQ/OiAoKSA9PiB2b2lkO1xuICBoaWRlT3BlbkZpbGVBY3Rpb24/OiBib29sZWFuO1xufTtcblxyXG4vLyBSZWFkLW9ubHkgYW5kIGVkaXRhYmxlIGhlYWRlciBmb3JtIGZvciB0aWNrZXQgZGV0YWlsLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybSA9ICh7XHJcbiAgaGVhZGVyLFxyXG4gIHN0YXR1c0xhYmVsLFxyXG4gIGdhc3RvVHlwZUxhYmVsLFxuICB0b3RhbEFtb3VudFRleHQsXG4gIHRyYW5zRGF0ZVRleHQsXG4gIHRpY2tldFRpbWVUZXh0LFxuICBpc0VkaXRpbmcsXG4gIGdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkZXNjcmlwdGlvbkludmFsaWQsXHJcbiAgZGVzY3JpcHRpb25JbnB1dFJlZixcclxuICBkcmFmdEdhc3RvVHlwZSxcbiAgZ2FzdG9UeXBlSW52YWxpZCxcbiAgZ2FzdG9UeXBlSW5wdXRSZWYsXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICBjdXJyZW5jeUNvZGVJbnZhbGlkLFxuICBjdXJyZW5jeUlucHV0UmVmLFxuICBkcmFmdFRvdGFsQW1vdW50LFxuICB0b3RhbEFtb3VudEludmFsaWQsXG4gIHRvdGFsQW1vdW50SW5wdXRSZWYsXG4gIGRyYWZ0VHJhbnNEYXRlLFxuICBkcmFmdFRpY2tldFRpbWUsXG4gIGRyYWZ0VXJsRmlsZSxcbiAgZHJhZnRGaWxlTmFtZSxcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlLFxuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlLFxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlLFxuICBvbkRyYWZ0VG90YWxBbW91bnRDaGFuZ2UsXG4gIG9uT3BlbkZpbGUsXG4gIG9uT3BlbkV4cGVuc2VTaGVldCxcbiAgaGlkZU9wZW5GaWxlQWN0aW9uID0gZmFsc2UsXG59OiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybVByb3BzKSA9PiB7XG4gIGNvbnN0IHByZXZpZXdVcmwgPSBzYWZlVGV4dChpc0VkaXRpbmcgPyBkcmFmdFVybEZpbGUgOiBoZWFkZXIudXJsRmlsZSk7XG4gIGNvbnN0IGNhbk9wZW5GaWxlID0gaGFzRXhwZW5zZVRpY2tldEltYWdlUHJldmlld1NvdXJjZShwcmV2aWV3VXJsKTtcbiAgY29uc3Qgc2hvd0V4cGVuc2VTaGVldEZpZWxkID0gaGFzUmVhbEV4cGVuc2VTaGVldFZhbHVlKGhlYWRlci5ob2phR2FzdG9zSWREaXNwbGF5KTtcbiAgY29uc3QgbG9jYWxlID0gZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCI7XG4gIGNvbnN0IGRpc3BsYXlEYXRlVGV4dCA9XG4gICAgdHJhbnNEYXRlVGV4dCB8fFxuICAgIGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShoZWFkZXIudGlja2V0RGF0ZSB8fCBoZWFkZXIudHJhbnNEYXRlLCBsb2NhbGUpIHx8XG4gICAgXCItXCI7XG4gIGNvbnN0IGxvY2tlZERyYWZ0RGF0ZVRleHQgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoZHJhZnRUcmFuc0RhdGUsIGxvY2FsZSkgfHwgZGlzcGxheURhdGVUZXh0O1xuICBjb25zdCBoYW5kbGVUb3RhbEFtb3VudEJsdXIgPSAoKSA9PiB7XG4gICAgb25EcmFmdFRvdGFsQW1vdW50Q2hhbmdlKFxuICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKGRyYWZ0VG90YWxBbW91bnQsIHtcbiAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgICAgICBmYWxsYmFjazogXCJcIixcbiAgICAgIH0pXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInJlbGF0aXZlIHNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItemluYy0yMDAgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV1cIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX0ZpbGVJZFwiLCBcIlRpY2tldFwiKX1cclxuICAgICAgICAgIHZhbHVlPXtoZWFkZXIuZmlsZUlkIHx8IFwiLVwifVxyXG4gICAgICAgIC8+XHJcblxyXG4gICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX1N0YXR1c1wiLCBcIlN0YXR1c1wiKX1cclxuICAgICAgICAgIHZhbHVlPXtzdGF0dXNMYWJlbCB8fCBcIi1cIn1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX08L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICByZWY9e2Rlc2NyaXB0aW9uSW5wdXRSZWZ9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sJHtkZXNjcmlwdGlvbkludmFsaWQgPyBcIiBib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpib3JkZXItcm9zZS00MDAgZm9jdXM6cmluZy1yb3NlLTIwMFwiIDogXCJcIn1gfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XHJcbiAgICAgICAgICAgICAgYXJpYS1pbnZhbGlkPXtkZXNjcmlwdGlvbkludmFsaWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIn1cclxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2hlYWRlci5kZXNjcmlwdGlvbiB8fCBcIi1cIn1cclxuICAgICAgICAgICAgZnVsbFdpZHRoXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcblxyXG4gICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxyXG4gICAgICAgICAgICBvcHRpb25zPXtnYXN0b1R5cGVPcHRpb25zfVxyXG4gICAgICAgICAgICB2YWx1ZT17ZHJhZnRHYXN0b1R5cGV9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIil9XHJcbiAgICAgICAgICAgIGlucHV0UmVmPXtnYXN0b1R5cGVJbnB1dFJlZn1cclxuICAgICAgICAgICAgaW52YWxpZD17Z2FzdG9UeXBlSW52YWxpZH1cclxuICAgICAgICAgICAgdXNlUG9ydGFsXHJcbiAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cclxuICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17Z2FzdG9UeXBlTGFiZWwgfHwgXCItXCJ9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcblxyXG4gICAgICAgIHtzaG93RXhwZW5zZVNoZWV0RmllbGQgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX0V4cGVuc2VTaGVldERpc3BsYXlcIiwgXCJFeHBlbnNlIHNoZWV0XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17aGVhZGVyLmhvamFHYXN0b3NJZERpc3BsYXkgfHwgXCItXCJ9XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uT3BlbkV4cGVuc2VTaGVldH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cclxuICAgICAgICAgICAgaW52YWxpZD17Y3VycmVuY3lDb2RlSW52YWxpZH1cclxuICAgICAgICAgICAgaW5wdXRSZWY9e2N1cnJlbmN5SW5wdXRSZWZ9XHJcbiAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtdGlja2V0LWRldGFpbC1jdXJyZW5jeVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtoZWFkZXIuY3VycmVuY3lDb2RlIHx8IFwiLVwifVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApfVxyXG5cclxuICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVG90YWxBbW91bnRcIiwgXCJUb3RhbCBhbW91bnRcIil9PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICByZWY9e3RvdGFsQW1vdW50SW5wdXRSZWZ9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCR7dG90YWxBbW91bnRJbnZhbGlkID8gXCIgYm9yZGVyLXJvc2UtNDAwIGJnLXJvc2UtNTAgZm9jdXM6Ym9yZGVyLXJvc2UtNDAwIGZvY3VzOnJpbmctcm9zZS0yMDBcIiA6IFwiXCJ9YH1cbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0VG90YWxBbW91bnR9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnRUb3RhbEFtb3VudENoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgICAgIG9uQmx1cj17aGFuZGxlVG90YWxBbW91bnRCbHVyfVxuICAgICAgICAgICAgICBpbnB1dE1vZGU9XCJkZWNpbWFsXCJcbiAgICAgICAgICAgICAgYXJpYS1pbnZhbGlkPXt0b3RhbEFtb3VudEludmFsaWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIn1cbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVG90YWxBbW91bnRcIiwgXCJUb3RhbCBhbW91bnRcIil9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1RvdGFsQW1vdW50XCIsIFwiVG90YWwgYW1vdW50XCIpfVxuICAgICAgICAgICAgdmFsdWU9e3RvdGFsQW1vdW50VGV4dCB8fCBcIi1cIn1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuXHJcbiAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX1RpY2tldERhdGVcIiwgXCJUaWNrZXQgZGF0ZVwiKX1cbiAgICAgICAgICB2YWx1ZT17aXNFZGl0aW5nID8gbG9ja2VkRHJhZnREYXRlVGV4dCA6IGRpc3BsYXlEYXRlVGV4dH1cbiAgICAgICAgLz5cblxuICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmllbGRfVGlja2V0VGltZVwiLCBcIlRpY2tldCB0aW1lXCIpfVxuICAgICAgICAgIHZhbHVlPXtpc0VkaXRpbmcgPyBkcmFmdFRpY2tldFRpbWUgfHwgdGlja2V0VGltZVRleHQgfHwgXCItXCIgOiB0aWNrZXRUaW1lVGV4dCB8fCBcIi1cIn1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuXHJcbiAgICAgIHtjYW5PcGVuRmlsZSAmJiAhaGlkZU9wZW5GaWxlQWN0aW9uID8gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWVuZFwiPlxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiXHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uT3BlbkZpbGV9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtpbmRUKFwiVGlja2V0c19EZXRhaWxfVmlld0F0dGFjaG1lbnRcIiwgXCJWZXIgYWRqdW50b1wiKX1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dCBmcm9tIFwiLi9FeHBlbnNlUHJvamVjdEZpbHRlcklucHV0LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVJlYWRPbmx5RmllbGQgZnJvbSBcIi4vRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgZnJvbSBcIi4vRXhwZW5zZVNlY3Rpb25EaXZpZGVyLnRzeFwiO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lU2VjdGlvblByb3BzID0ge1xyXG4gIHByb2plY3RJZDogc3RyaW5nO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBpc0xvYWRpbmc6IGJvb2xlYW47XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIGVycm9yTWVzc2FnZT86IHN0cmluZztcclxuICBvblByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIGV4cGVuc2Utc2hlZXQgbGluZSBmaWVsZHMgdGhhdCBhcmUgZWRpdGVkIGZyb20gdGhlIGxpbmtlZCB0aWNrZXQgZGV0YWlsIGZsb3cuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVTZWN0aW9uID0gKHtcclxuICBwcm9qZWN0SWQsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzTG9hZGluZyxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIGVycm9yTWVzc2FnZSA9IFwiXCIsXHJcbiAgb25Qcm9qZWN0SWRDaGFuZ2UsXHJcbn06IEV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVTZWN0aW9uUHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNwYWNlLXktMFwiPlxuICAgICAgPEV4cGVuc2VTZWN0aW9uRGl2aWRlciBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9FeHBlbnNlXCIsIFwiRXhwZW5zZSBsaW5lXCIpfSBjbGFzc05hbWU9XCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlci0tc3BhY2VkXCIgLz5cblxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXppbmMtMjAwIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCI+XHJcbiAgICAgICAge2lzTG9hZGluZyA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXppbmMtNzAwXCI+XHJcbiAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgc2l6ZS01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cclxuICAgICAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IGVycm9yTWVzc2FnZSA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXIgdGV4dC1zbVwiPntlcnJvck1lc3NhZ2V9PC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgICAgIDxFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0XHJcbiAgICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9XHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1Byb2plY3RfUGxhY2Vob2xkZXJcIiwgXCJQcm9qZWN0IGlkXCIpfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e3Byb2plY3RJZH1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvblByb2plY3RJZENoYW5nZX1cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXtkaXNhYmxlZH1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e3Byb2plY3RJZCB8fCBcIi1cIn1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9zZWN0aW9uPlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lU2VjdGlvbjtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VEYXRlUGFydHMgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VOdW1iZXIgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVNlY3Rpb25EaXZpZGVyIGZyb20gXCIuL0V4cGVuc2VTZWN0aW9uRGl2aWRlci50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4vRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcclxuXHJcbnR5cGUgUGFnaW5hdGlvbkxhYmVscyA9IHtcclxuICBmaXJzdDogc3RyaW5nO1xyXG4gIHByZXY6IHN0cmluZztcclxuICBuZXh0OiBzdHJpbmc7XHJcbiAgbGFzdDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0TGluZXNMaXN0UHJvcHMgPSB7XHJcbiAgdmlzaWJsZUxpbmVzOiBFeHBlbnNlVGlja2V0RGV0YWlsTGluZVtdO1xyXG4gIHRvdGFsTGluZVBhZ2VzOiBudW1iZXI7XHJcbiAgbGluZVBhZ2U6IG51bWJlcjtcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBwYWdpbmF0aW9uTGFiZWxzOiBQYWdpbmF0aW9uTGFiZWxzO1xyXG4gIGNvbnRhaW5lclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgb25MaW5lUGFnZUNoYW5nZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcclxuICBvbk9wZW5MaW5lOiAobGluZVJlY0lkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXRRdHlWYWx1ZSA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBmb3JtYXRFeHBlbnNlTnVtYmVyKHZhbHVlLCB7XG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICBmYWxsYmFjazogXCItXCIsXG4gIH0pO1xufTtcblxuY29uc3QgRU1QVFlfREFURV9QQVJUUzogRXhwZW5zZURhdGVQYXJ0cyA9IHtcbiAgeWVhcjogXCItLVwiLFxuICBtb250aDogXCItLVwiLFxuICBkYXk6IFwiLS1cIixcbn07XHJcblxyXG5jb25zdCBUSUNLRVRfTElORV9EQVRFX1BBTkVMX0lDT04gPSAoXHJcbiAgPHN2Z1xyXG4gICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgIGZpbGw9XCJub25lXCJcclxuICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICBzdHJva2VXaWR0aD1cIjFcIlxyXG4gICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcclxuICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgY2xhc3NOYW1lPVwic2l6ZS0xMCB0ZXh0LVsjMDAyOTZiZTBdXCJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gID5cclxuICAgIDxwYXRoIHN0cm9rZT1cIm5vbmVcIiBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMTQgM3Y0YTEgMSAwIDAgMCAxIDFoNFwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTE3IDIxaC0xMGEyIDIgMCAwIDEgLTIgLTJ2LTE0YTIgMiAwIDAgMSAyIC0yaDdsNSA1djExYTIgMiAwIDAgMSAtMiAyXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNOSA3bDEgMFwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTkgMTNsNiAwXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMTMgMTdsMiAwXCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbi8vIFRpY2tldCBsaW5lcyBzZWN0aW9uIHJlbmRlcmVkIHdpdGggdGltZWxpbmUgY2FyZHMgYW5kIHBhZ2luZyBjb250cm9scy5cclxuY29uc3QgRXhwZW5zZVRpY2tldExpbmVzTGlzdCA9ICh7XHJcbiAgdmlzaWJsZUxpbmVzLFxyXG4gIHRvdGFsTGluZVBhZ2VzLFxyXG4gIGxpbmVQYWdlLFxyXG4gIGN1cnJlbmN5Q29kZSxcclxuICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gIGNvbnRhaW5lclJlZixcclxuICBvbkxpbmVQYWdlQ2hhbmdlLFxyXG4gIG9uT3BlbkxpbmUsXHJcbn06IEV4cGVuc2VUaWNrZXRMaW5lc0xpc3RQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzcGFjZS15LTBcIj5cclxuICAgICAgPEV4cGVuc2VTZWN0aW9uRGl2aWRlciBsYWJlbD17aW5kVChcIlRpY2tldHNfRGV0YWlsX0xpbmVzXCIsIFwiTGluZXNcIil9IGNsYXNzTmFtZT1cImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyLS1zcGFjZWRcIiAvPlxyXG5cclxuICAgICAge3Zpc2libGVMaW5lcy5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2luZFQoXCJUaWNrZXRzX0RldGFpbF9Ob0xpbmVzXCIsIFwiTm8gbGluZXMgZm9yIHRoaXMgdGlja2V0LlwiKX0gLz5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8ZGl2IHJlZj17Y29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cclxuICAgICAgICAgIHt2aXNpYmxlTGluZXMubWFwKChsaW5lKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFtb3VudFRleHQgPSBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kobGluZS50b3RhbEFtb3VudCwgY3VycmVuY3lDb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IHF0eVRleHQgPSBmb3JtYXRRdHlWYWx1ZShsaW5lLnF0eSk7XG4gICAgICAgICAgICBjb25zdCBwcmljZVRleHQgPSBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kobGluZS5wcmljZSwgY3VycmVuY3lDb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gbGluZS5kZXNjcmlwdGlvbiB8fCBsaW5lLnJlY0lkIHx8IFwiLVwiO1xuICAgICAgICAgICAgY29uc3QgcHJpbWFyeVN1YnRpdGxlUGFydHMgPSBbXG4gICAgICAgICAgICAgIGxpbmUuYWRqdXN0bWVudEFtb3VudCA/IGluZFQoXCJFbnVtX0dhc3RvVHlwZV9BZGp1c3RtZW50QW1vdW50XCIsIFwiQWRqdXN0bWVudCBhbW91bnRcIikgOiBcIlwiLFxuICAgICAgICAgICAgICBgJHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9RdHlcIiwgXCJRdWFudGl0eVwiKX06ICR7cXR5VGV4dH1gLFxuICAgICAgICAgICAgICBgJHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9QcmljZVwiLCBcIlByaWNlXCIpfTogJHtwcmljZVRleHR9YCxcbiAgICAgICAgICAgIF0uZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICAgICAgY29uc3QgcHJpbWFyeVN1YnRpdGxlID0gcHJpbWFyeVN1YnRpdGxlUGFydHMuam9pbihcIiAgIFwiKTtcbiAgICAgICAgICAgIGNvbnN0IHN1YnRpdGxlID0gcHJpbWFyeVN1YnRpdGxlO1xuICAgICAgICAgICAgY29uc3QgbGluZUtleSA9XG4gICAgICAgICAgICAgIFN0cmluZyhsaW5lLnJlY0lkIHx8IFwiXCIpLnRyaW0oKSB8fFxuICAgICAgICAgICAgICBbbGluZS5kZXNjcmlwdGlvbiwgbGluZS50b3RhbEFtb3VudCwgbGluZS5wcmljZSwgbGluZS5xdHldXG4gICAgICAgICAgICAgICAgLm1hcCgodmFsdWUpID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCJ8XCIpO1xuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2xpbmVLZXl9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgIDxFeHBlbnNlVGltZWxpbmVDYXJkXHJcbiAgICAgICAgICAgICAgICAgIGRhdGVQYXJ0cz17RU1QVFlfREFURV9QQVJUU31cclxuICAgICAgICAgICAgICAgICAgZGF0ZVBhbmVsQ29udGVudD17VElDS0VUX0xJTkVfREFURV9QQU5FTF9JQ09OfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgICAgICAgICAgc3VidGl0bGU9e3N1YnRpdGxlfVxuICAgICAgICAgICAgICAgICAgc3VidGl0bGVDbGFzc05hbWU9XCJleHBlbnNlLXNoZWV0LWNhcmRfX3N1YnRpdGxlIGV4cGVuc2UtbGluZS1jYXJkX19tZXRhIHRleHQtbGVmdFwiXG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxuICAgICAgICAgICAgICAgICAgb25PcGVuPXsoKSA9PiBvbk9wZW5MaW5lKGxpbmUucmVjSWQpfVxuICAgICAgICAgICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJ0aW1lbGluZS1uYW1lIGV4cGVuc2UtbGluZS1jYXJkX190aXRsZSB0ZXh0LWxlZnRcIlxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxyXG4gICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsTGluZVBhZ2VzfVxyXG4gICAgICAgIGN1cnJlbnRQYWdlPXtsaW5lUGFnZX1cclxuICAgICAgICBvblBhZ2VDaGFuZ2U9e29uTGluZVBhZ2VDaGFuZ2V9XHJcbiAgICAgICAgbGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxyXG4gICAgICAvPlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0TGluZXNMaXN0O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZVNlY3Rpb24gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZVNlY3Rpb24udHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0TGluZXNMaXN0IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5lc0xpc3QudHN4XCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciwgRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWwgZnJvbSBcIi4vRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3IGZyb20gXCIuL0V4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3LnRzeFwiO1xyXG5pbXBvcnQgdHlwZSB7IFRpY2tldFByZXZpZXdQb2ludCB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcudHNcIjtcclxuXHJcbnR5cGUgUGFnaW5hdGlvbkxhYmVscyA9IHtcclxuICBmaXJzdDogc3RyaW5nO1xyXG4gIHByZXY6IHN0cmluZztcclxuICBuZXh0OiBzdHJpbmc7XHJcbiAgbGFzdDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsVmlld1Byb3BzID0ge1xyXG4gIG1vZGFsOiB7XHJcbiAgICBvcGVuOiBib29sZWFuO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0OiBzdHJpbmc7XHJcbiAgICBjYW5jZWxUZXh0OiBzdHJpbmc7XHJcbiAgICBsb2FkaW5nVGV4dDogc3RyaW5nO1xyXG4gICAgc2hvd0NhbmNlbDogYm9vbGVhbjtcclxuICAgIHNob3dDb25maXJtOiBib29sZWFuO1xyXG4gICAgYnVzeTogYm9vbGVhbjtcclxuICAgIGVycm9yOiBzdHJpbmc7XHJcbiAgICBzdGF0dXM6IHN0cmluZztcclxuICAgIG9uQ29uZmlybTogKCkgPT4gdm9pZDtcclxuICAgIG9uQ2FuY2VsOiAoKSA9PiB2b2lkO1xyXG4gIH07XHJcbiAgcHJldmlldzoge1xyXG4gICAgb3BlbjogYm9vbGVhbjtcclxuICAgIGJ1c3k6IGJvb2xlYW47XHJcbiAgICBlcnJvcjogc3RyaW5nO1xyXG4gICAgaW1hZ2VVcmw6IHN0cmluZztcclxuICAgIGltYWdlQWx0OiBzdHJpbmc7XHJcbiAgICBzY2FsZTogbnVtYmVyO1xyXG4gICAgdHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQ7XHJcbiAgICBzdXJmYWNlUmVmOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICAgIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XHJcbiAgICBvblBvaW50ZXJEb3duOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgICBvblBvaW50ZXJNb3ZlOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgICBvblBvaW50ZXJFbmQ6IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICAgIG9uV2hlZWw6IChldmVudDogUmVhY3QuV2hlZWxFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgfTtcclxuICBjb250ZW50OiB7XHJcbiAgICBpc0xvYWRpbmc6IGJvb2xlYW47XHJcbiAgICBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICAgIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw7XHJcbiAgICBzaG93U3RpY2t5UHJldmlldzogYm9vbGVhbjtcclxuICAgIHByZXZpZXdCdXN5OiBib29sZWFuO1xyXG4gICAgcHJldmlld0Vycm9yOiBzdHJpbmc7XHJcbiAgICBwcmV2aWV3SW1hZ2VVcmw6IHN0cmluZztcclxuICAgIHByZXZpZXdGaWxlTmFtZTogc3RyaW5nO1xyXG4gICAgcHJldmlld0FsdFRleHQ6IHN0cmluZztcclxuICAgIG9uT3BlblByZXZpZXc6ICgpID0+IHZvaWQ7XHJcbiAgICBzdGF0dXNMYWJlbDogc3RyaW5nO1xyXG4gICAgZ2FzdG9UeXBlTGFiZWw6IHN0cmluZztcclxuICAgIHRvdGFsQW1vdW50VGV4dDogc3RyaW5nO1xyXG4gICAgdHJhbnNEYXRlVGV4dDogc3RyaW5nO1xyXG4gICAgdGlja2V0VGltZVRleHQ6IHN0cmluZztcclxuICAgIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICAgIGdhc3RvVHlwZU9wdGlvbnM6IEFycmF5PHsgdmFsdWU6IHN0cmluZzsgdGV4dDogc3RyaW5nIH0+O1xyXG4gICAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gICAgZGVzY3JpcHRpb25JbnZhbGlkOiBib29sZWFuO1xyXG4gICAgZGVzY3JpcHRpb25JbnB1dFJlZjogUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICAgIGRyYWZ0R2FzdG9UeXBlOiBzdHJpbmc7XG4gICAgZ2FzdG9UeXBlSW52YWxpZDogYm9vbGVhbjtcbiAgICBnYXN0b1R5cGVJbnB1dFJlZjogUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcbiAgICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICAgIGN1cnJlbmN5Q29kZUludmFsaWQ6IGJvb2xlYW47XG4gICAgY3VycmVuY3lJbnB1dFJlZjogUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcbiAgICBkcmFmdFRvdGFsQW1vdW50OiBzdHJpbmc7XG4gICAgdG90YWxBbW91bnRJbnZhbGlkOiBib29sZWFuO1xuICAgIHRvdGFsQW1vdW50SW5wdXRSZWY6IFJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XG4gICAgZHJhZnRUcmFuc0RhdGU6IHN0cmluZztcbiAgICBkcmFmdFRpY2tldFRpbWU6IHN0cmluZztcbiAgICBkcmFmdFVybEZpbGU6IHN0cmluZztcbiAgICBkcmFmdEZpbGVOYW1lOiBzdHJpbmc7XG4gICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgICBvbkRyYWZ0VG90YWxBbW91bnRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICAgIG9uT3BlbkZpbGU6ICgpID0+IHZvaWQ7XG4gICAgb25PcGVuRXhwZW5zZVNoZWV0PzogKCkgPT4gdm9pZDtcbiAgICBsaW5rZWRMaW5lOiB7XHJcbiAgICAgIHZpc2libGU6IGJvb2xlYW47XHJcbiAgICAgIHByb2plY3RJZDogc3RyaW5nO1xyXG4gICAgICBpc0xvYWRpbmc6IGJvb2xlYW47XHJcbiAgICAgIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgICBkaXNhYmxlZDogYm9vbGVhbjtcclxuICAgICAgb25Qcm9qZWN0SWRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgfTtcclxuICAgIHZpc2libGVMaW5lczogRXhwZW5zZVRpY2tldERldGFpbExpbmVbXTtcclxuICAgIHRvdGFsTGluZVBhZ2VzOiBudW1iZXI7XHJcbiAgICBsaW5lUGFnZTogbnVtYmVyO1xyXG4gICAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgICBwYWdpbmF0aW9uTGFiZWxzOiBQYWdpbmF0aW9uTGFiZWxzO1xyXG4gICAgY29udGFpbmVyUmVmOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICAgIG9uTGluZVBhZ2VDaGFuZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XHJcbiAgICBvbk9wZW5MaW5lOiAobGluZVJlY0lkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICBzdGF0dXM6IHN0cmluZztcclxuICB9O1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyB0aGUgdGlja2V0IGRldGFpbCB2aWV3IHdoaWxlIHRoZSBwYWdlIGNvbnRhaW5lciBvd25zIG9yY2hlc3RyYXRpb24uXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3ID0gKHsgbW9kYWwsIHByZXZpZXcsIGNvbnRlbnQgfTogRXhwZW5zZVRpY2tldERldGFpbFZpZXdQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGRldGFpbEJvZHkgPSAoXHJcbiAgICA8PlxyXG4gICAgICA8RXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm1cclxuICAgICAgICBoZWFkZXI9e2NvbnRlbnQuaGVhZGVyfVxyXG4gICAgICAgIHN0YXR1c0xhYmVsPXtjb250ZW50LnN0YXR1c0xhYmVsfVxyXG4gICAgICAgIGdhc3RvVHlwZUxhYmVsPXtjb250ZW50Lmdhc3RvVHlwZUxhYmVsfVxyXG4gICAgICAgIHRvdGFsQW1vdW50VGV4dD17Y29udGVudC50b3RhbEFtb3VudFRleHR9XHJcbiAgICAgICAgdHJhbnNEYXRlVGV4dD17Y29udGVudC50cmFuc0RhdGVUZXh0fVxyXG4gICAgICAgIHRpY2tldFRpbWVUZXh0PXtjb250ZW50LnRpY2tldFRpbWVUZXh0fVxyXG4gICAgICAgIGlzRWRpdGluZz17Y29udGVudC5pc0VkaXRpbmd9XHJcbiAgICAgICAgZ2FzdG9UeXBlT3B0aW9ucz17Y29udGVudC5nYXN0b1R5cGVPcHRpb25zfVxyXG4gICAgICAgIGRyYWZ0RGVzY3JpcHRpb249e2NvbnRlbnQuZHJhZnREZXNjcmlwdGlvbn1cclxuICAgICAgICBkZXNjcmlwdGlvbkludmFsaWQ9e2NvbnRlbnQuZGVzY3JpcHRpb25JbnZhbGlkfVxyXG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXRSZWY9e2NvbnRlbnQuZGVzY3JpcHRpb25JbnB1dFJlZn1cclxuICAgICAgICBkcmFmdEdhc3RvVHlwZT17Y29udGVudC5kcmFmdEdhc3RvVHlwZX1cclxuICAgICAgICBnYXN0b1R5cGVJbnZhbGlkPXtjb250ZW50Lmdhc3RvVHlwZUludmFsaWR9XHJcbiAgICAgICAgZ2FzdG9UeXBlSW5wdXRSZWY9e2NvbnRlbnQuZ2FzdG9UeXBlSW5wdXRSZWZ9XHJcbiAgICAgICAgZHJhZnRDdXJyZW5jeUNvZGU9e2NvbnRlbnQuZHJhZnRDdXJyZW5jeUNvZGV9XG4gICAgICAgIGN1cnJlbmN5Q29kZUludmFsaWQ9e2NvbnRlbnQuY3VycmVuY3lDb2RlSW52YWxpZH1cbiAgICAgICAgY3VycmVuY3lJbnB1dFJlZj17Y29udGVudC5jdXJyZW5jeUlucHV0UmVmfVxuICAgICAgICBkcmFmdFRvdGFsQW1vdW50PXtjb250ZW50LmRyYWZ0VG90YWxBbW91bnR9XG4gICAgICAgIHRvdGFsQW1vdW50SW52YWxpZD17Y29udGVudC50b3RhbEFtb3VudEludmFsaWR9XG4gICAgICAgIHRvdGFsQW1vdW50SW5wdXRSZWY9e2NvbnRlbnQudG90YWxBbW91bnRJbnB1dFJlZn1cbiAgICAgICAgZHJhZnRUcmFuc0RhdGU9e2NvbnRlbnQuZHJhZnRUcmFuc0RhdGV9XG4gICAgICAgIGRyYWZ0VGlja2V0VGltZT17Y29udGVudC5kcmFmdFRpY2tldFRpbWV9XG4gICAgICAgIGRyYWZ0VXJsRmlsZT17Y29udGVudC5kcmFmdFVybEZpbGV9XG4gICAgICAgIGRyYWZ0RmlsZU5hbWU9e2NvbnRlbnQuZHJhZnRGaWxlTmFtZX1cbiAgICAgICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlPXtjb250ZW50Lm9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZX1cbiAgICAgICAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZT17Y29udGVudC5vbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlfVxuICAgICAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlPXtjb250ZW50Lm9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XG4gICAgICAgIG9uRHJhZnRUb3RhbEFtb3VudENoYW5nZT17Y29udGVudC5vbkRyYWZ0VG90YWxBbW91bnRDaGFuZ2V9XG4gICAgICAgIG9uT3BlbkZpbGU9e2NvbnRlbnQub25PcGVuRmlsZX1cbiAgICAgICAgb25PcGVuRXhwZW5zZVNoZWV0PXtjb250ZW50Lm9uT3BlbkV4cGVuc2VTaGVldH1cbiAgICAgICAgaGlkZU9wZW5GaWxlQWN0aW9uPXtjb250ZW50LnNob3dTdGlja3lQcmV2aWV3fVxyXG4gICAgICAvPlxyXG4gICAgICB7Y29udGVudC5saW5rZWRMaW5lLnZpc2libGUgPyAoXHJcbiAgICAgICAgPEV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVTZWN0aW9uXHJcbiAgICAgICAgICBwcm9qZWN0SWQ9e2NvbnRlbnQubGlua2VkTGluZS5wcm9qZWN0SWR9XHJcbiAgICAgICAgICBpc0VkaXRpbmc9e2NvbnRlbnQuaXNFZGl0aW5nfVxyXG4gICAgICAgICAgaXNMb2FkaW5nPXtjb250ZW50LmxpbmtlZExpbmUuaXNMb2FkaW5nfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e2NvbnRlbnQubGlua2VkTGluZS5kaXNhYmxlZH1cclxuICAgICAgICAgIGVycm9yTWVzc2FnZT17Y29udGVudC5saW5rZWRMaW5lLmVycm9yTWVzc2FnZX1cclxuICAgICAgICAgIG9uUHJvamVjdElkQ2hhbmdlPXtjb250ZW50LmxpbmtlZExpbmUub25Qcm9qZWN0SWRDaGFuZ2V9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0TGluZXNMaXN0XHJcbiAgICAgICAgdmlzaWJsZUxpbmVzPXtjb250ZW50LnZpc2libGVMaW5lc31cclxuICAgICAgICB0b3RhbExpbmVQYWdlcz17Y29udGVudC50b3RhbExpbmVQYWdlc31cclxuICAgICAgICBsaW5lUGFnZT17Y29udGVudC5saW5lUGFnZX1cclxuICAgICAgICBjdXJyZW5jeUNvZGU9e2NvbnRlbnQuY3VycmVuY3lDb2RlfVxyXG4gICAgICAgIHBhZ2luYXRpb25MYWJlbHM9e2NvbnRlbnQucGFnaW5hdGlvbkxhYmVsc31cclxuICAgICAgICBjb250YWluZXJSZWY9e2NvbnRlbnQuY29udGFpbmVyUmVmfVxyXG4gICAgICAgIG9uTGluZVBhZ2VDaGFuZ2U9e2NvbnRlbnQub25MaW5lUGFnZUNoYW5nZX1cclxuICAgICAgICBvbk9wZW5MaW5lPXtjb250ZW50Lm9uT3BlbkxpbmV9XHJcbiAgICAgIC8+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXppbmMtNjAwXCI+e2NvbnRlbnQuc3RhdHVzfTwvZGl2PlxyXG4gICAgPC8+XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbC5jb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbC5jYW5jZWxUZXh0fVxyXG4gICAgICAgIGxvYWRpbmdUZXh0PXttb2RhbC5sb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXttb2RhbC5idXN5fVxyXG4gICAgICAgIGVycm9yPXttb2RhbC5lcnJvcn1cclxuICAgICAgICBzdGF0dXM9e21vZGFsLnN0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e21vZGFsLm9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17bW9kYWwub25DYW5jZWx9XHJcbiAgICAgIC8+XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0UHJldmlld01vZGFsXHJcbiAgICAgICAgb3Blbj17cHJldmlldy5vcGVufVxyXG4gICAgICAgIGJ1c3k9e3ByZXZpZXcuYnVzeX1cclxuICAgICAgICBlcnJvcj17cHJldmlldy5lcnJvcn1cclxuICAgICAgICBpbWFnZVVybD17cHJldmlldy5pbWFnZVVybH1cclxuICAgICAgICBpbWFnZUFsdD17cHJldmlldy5pbWFnZUFsdH1cclxuICAgICAgICBzY2FsZT17cHJldmlldy5zY2FsZX1cclxuICAgICAgICB0cmFuc2xhdGU9e3ByZXZpZXcudHJhbnNsYXRlfVxyXG4gICAgICAgIHN1cmZhY2VSZWY9e3ByZXZpZXcuc3VyZmFjZVJlZn1cclxuICAgICAgICBvbkNsb3NlPXtwcmV2aWV3Lm9uQ2xvc2V9XHJcbiAgICAgICAgb25Qb2ludGVyRG93bj17cHJldmlldy5vblBvaW50ZXJEb3dufVxyXG4gICAgICAgIG9uUG9pbnRlck1vdmU9e3ByZXZpZXcub25Qb2ludGVyTW92ZX1cclxuICAgICAgICBvblBvaW50ZXJFbmQ9e3ByZXZpZXcub25Qb2ludGVyRW5kfVxyXG4gICAgICAgIG9uV2hlZWw9e3ByZXZpZXcub25XaGVlbH1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC16aW5jLTcwMFwiXHJcbiAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogY29udGVudC5pc0xvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XHJcbiAgICAgID5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIHNpemUtNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XHJcbiAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7Y29udGVudC5lcnJvck1lc3NhZ2UgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2NvbnRlbnQuZXJyb3JNZXNzYWdlfTwvZGl2PiA6IG51bGx9XHJcblxyXG4gICAgICB7IWNvbnRlbnQuaXNMb2FkaW5nICYmICFjb250ZW50LmVycm9yTWVzc2FnZSAmJiBjb250ZW50LmhlYWRlciA/IChcclxuICAgICAgICBjb250ZW50LnNob3dTdGlja3lQcmV2aWV3ID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdhcC15LTIgbGc6Z3JpZC1jb2xzLVttaW5tYXgoMCwxZnIpXzMyMHB4XSBsZzpnYXAtNFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zdGFydC0yXCI+XHJcbiAgICAgICAgICAgICAgPEV4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3XHJcbiAgICAgICAgICAgICAgICBidXN5PXtjb250ZW50LnByZXZpZXdCdXN5fVxyXG4gICAgICAgICAgICAgICAgZXJyb3I9e2NvbnRlbnQucHJldmlld0Vycm9yfVxyXG4gICAgICAgICAgICAgICAgaW1hZ2VVcmw9e2NvbnRlbnQucHJldmlld0ltYWdlVXJsfVxyXG4gICAgICAgICAgICAgICAgaW1hZ2VBbHQ9e2NvbnRlbnQucHJldmlld0FsdFRleHR9XHJcbiAgICAgICAgICAgICAgICBmaWxlTmFtZT17Y29udGVudC5wcmV2aWV3RmlsZU5hbWV9XHJcbiAgICAgICAgICAgICAgICBvbk9wZW49e2NvbnRlbnQub25PcGVuUHJldmlld31cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgbGc6Y29sLXN0YXJ0LTEgbGc6cm93LXN0YXJ0LTFcIj57ZGV0YWlsQm9keX08L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICBkZXRhaWxCb2R5XHJcbiAgICAgICAgKVxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0RGV0YWlsVmlldztcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXREZXRhaWxEdG8sIEV4cGVuc2VTaGVldExpbmUgfSBmcm9tIFwiLi4vLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsLCBtYXBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZUFyZ3MgPSB7XHJcbiAgZW5hYmxlZDogYm9vbGVhbjtcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgbGluZVJlY0lkOiBzdHJpbmc7XHJcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBzZWxlY3RTaGVldCA9IChpdGVtczogRXhwZW5zZVNoZWV0RGV0YWlsRHRvW10sIHNoZWV0SWQ6IHN0cmluZyk6IEV4cGVuc2VTaGVldERldGFpbER0byB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQoc2hlZXRJZCkudG9VcHBlckNhc2UoKTtcclxuICBpZiAoIUFycmF5LmlzQXJyYXkoaXRlbXMpIHx8IGl0ZW1zLmxlbmd0aCA8IDEpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIGl0ZW1zLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uSG9qYUdhc3Rvc0lkID8/IGVudHJ5Py5ob2phR2FzdG9zSWQpLnRvVXBwZXJDYXNlKCkgPT09IHNhZmVTaGVldElkKSB8fFxyXG4gICAgaXRlbXNbMF0gfHxcclxuICAgIG51bGxcclxuICApO1xyXG59O1xyXG5cclxuY29uc3Qgc2VsZWN0TGluZSA9IChzaGVldDogRXhwZW5zZVNoZWV0RGV0YWlsRHRvLCBsaW5lUmVjSWQ6IHN0cmluZyk6IEV4cGVuc2VTaGVldExpbmUgfCBudWxsID0+IHtcclxuICBjb25zdCBzYWZlTGluZVJlY0lkID0gc2FmZVRleHQobGluZVJlY0lkKS50b1VwcGVyQ2FzZSgpO1xyXG4gIGNvbnN0IHNvdXJjZUxpbmVzID0gc2hlZXQuTGluZXMgPz8gc2hlZXQubGluZXMgPz8gW107XHJcbiAgY29uc3QgbWFwcGVkTGluZXMgPSBBcnJheS5pc0FycmF5KHNvdXJjZUxpbmVzKSA/IHNvdXJjZUxpbmVzLm1hcCgoZW50cnkpID0+IG1hcEV4cGVuc2VTaGVldExpbmUoZW50cnkpKSA6IFtdO1xyXG5cclxuICByZXR1cm4gbWFwcGVkTGluZXMuZmluZCgobGluZSkgPT4gc2FmZVRleHQobGluZS5saW5lUmVjSWQpLnRvVXBwZXJDYXNlKCkgPT09IHNhZmVMaW5lUmVjSWQpIHx8IG51bGw7XHJcbn07XHJcblxyXG4vLyBMb2FkcyB0aGUgZXhwZW5zZS1zaGVldCBsaW5lIHRoYXQgZ2l2ZXMgY29udGV4dHVhbCBmaWVsZHMgdG8gYSBsaW5rZWQgdGlja2V0IGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmUgPSAoe1xyXG4gIGVuYWJsZWQsXHJcbiAgc2hlZXRJZCxcclxuICBsaW5lUmVjSWQsXHJcbiAgb25Gb3JiaWRkZW4sXHJcbn06IFVzZUV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVBcmdzKSA9PiB7XHJcbiAgY29uc3QgW2xpbmUsIHNldExpbmVdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0TGluZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtvcmlnaW5hbFByb2plY3RJZCwgc2V0T3JpZ2luYWxQcm9qZWN0SWRdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0UHJvamVjdElkLCBzZXREcmFmdFByb2plY3RJZF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgY29uc3QgcmVsb2FkTGluZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQoc2hlZXRJZCk7XHJcbiAgICBjb25zdCBzYWZlTGluZVJlY0lkID0gc2FmZVRleHQobGluZVJlY0lkKTtcclxuICAgIGlmICghZW5hYmxlZCB8fCAhc2FmZVNoZWV0SWQgfHwgIXNhZmVMaW5lUmVjSWQpIHtcclxuICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgc2V0T3JpZ2luYWxQcm9qZWN0SWQoXCJcIik7XHJcbiAgICAgIHNldERyYWZ0UHJvamVjdElkKFwiXCIpO1xyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XHJcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldERldGFpbChzYWZlU2hlZXRJZCwge1xyXG4gICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICAgIHNldE9yaWdpbmFsUHJvamVjdElkKFwiXCIpO1xyXG4gICAgICAgIHNldERyYWZ0UHJvamVjdElkKFwiXCIpO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZT8uTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0IGRldGFpbC5cIikpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgc2hlZXQgPSBzZWxlY3RTaGVldChyZXNwb25zZT8uSXRlbXMgfHwgW10sIHNhZmVTaGVldElkKTtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWRMaW5lID0gc2hlZXQgPyBzZWxlY3RMaW5lKHNoZWV0LCBzYWZlTGluZVJlY0lkKSA6IG51bGw7XHJcbiAgICAgIGlmICghc2VsZWN0ZWRMaW5lKSB7XHJcbiAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICBzZXRPcmlnaW5hbFByb2plY3RJZChcIlwiKTtcclxuICAgICAgICBzZXREcmFmdFByb2plY3RJZChcIlwiKTtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHByb2plY3RJZCA9IHNhZmVUZXh0KHNlbGVjdGVkTGluZS5wcm9qSWQpO1xyXG4gICAgICBzZXRMaW5lKHNlbGVjdGVkTGluZSk7XHJcbiAgICAgIHNldE9yaWdpbmFsUHJvamVjdElkKHByb2plY3RJZCk7XHJcbiAgICAgIHNldERyYWZ0UHJvamVjdElkKHByb2plY3RJZCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgIHNldE9yaWdpbmFsUHJvamVjdElkKFwiXCIpO1xyXG4gICAgICBzZXREcmFmdFByb2plY3RJZChcIlwiKTtcclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW2VuYWJsZWQsIGxpbmVSZWNJZCwgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHZvaWQgcmVsb2FkTGluZSgpO1xyXG4gIH0sIFtyZWxvYWRMaW5lXSk7XHJcblxyXG4gIGNvbnN0IHByb2plY3RJZENoYW5nZWQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gc2FmZVRleHQoZHJhZnRQcm9qZWN0SWQpICE9PSBzYWZlVGV4dChvcmlnaW5hbFByb2plY3RJZCksXHJcbiAgICBbZHJhZnRQcm9qZWN0SWQsIG9yaWdpbmFsUHJvamVjdElkXVxyXG4gICk7XHJcbiAgY29uc3QgcmVzZXREcmFmdFByb2plY3RJZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldERyYWZ0UHJvamVjdElkKG9yaWdpbmFsUHJvamVjdElkKTtcclxuICB9LCBbb3JpZ2luYWxQcm9qZWN0SWRdKTtcclxuICBjb25zdCBhY2NlcHREcmFmdFByb2plY3RJZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHNhZmVQcm9qZWN0SWQgPSBzYWZlVGV4dChkcmFmdFByb2plY3RJZCk7XHJcbiAgICBzZXRPcmlnaW5hbFByb2plY3RJZChzYWZlUHJvamVjdElkKTtcclxuICAgIHNldERyYWZ0UHJvamVjdElkKHNhZmVQcm9qZWN0SWQpO1xyXG4gIH0sIFtkcmFmdFByb2plY3RJZF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbGluZSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIG9yaWdpbmFsUHJvamVjdElkLFxyXG4gICAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgICBwcm9qZWN0SWRDaGFuZ2VkLFxyXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICByZXNldERyYWZ0UHJvamVjdElkLFxyXG4gICAgYWNjZXB0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICByZWxvYWRMaW5lLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSB9IGZyb20gXCIuLi91c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwsXHJcbiAgYnVpbGRFeHBlbnNlU2hlZXRMaW5lRGV0YWlsVXJsLFxyXG4gIGJ1aWxkRXhwZW5zZVRpY2tldExpbmtVcmwsXHJcbiAgdHlwZSBFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgdG9FeHBlbnNlSXNvRGF0ZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxCYWNrTmF2aWdhdGlvbkFyZ3MgPSB7XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgZGV0YWlsT3JpZ2luOiBzdHJpbmc7XHJcbiAgaGVhZGVyVHJhbnNEYXRlOiB1bmtub3duO1xyXG4gIGNvbnRleHRMaW5lUmVjSWQ/OiBzdHJpbmc7XHJcbiAgdGlja2V0UmV0dXJuQ29udGV4dD86IEV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0IHwgbnVsbDtcclxuICByZWFkQ2FjaGVkU3RhdGU6ICgpID0+IEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUgfCBudWxsO1xyXG4gIHNhdmVDYWNoZWRTdGF0ZTogKHN0YXRlOiBFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gS2VlcHMgbmF0aXZlIGJhY2sgbmF2aWdhdGlvbiBhbGlnbmVkIHdpdGggdGhlIHRpY2tldCBlbnRyeSBwb2ludCBhbmQgcHJlc2VydmVzIGNhY2hlZCBsaW5rLW1vZGUgc3RhdGUuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb24gPSAoe1xyXG4gIGZpbGVJZCxcclxuICBkZXRhaWxPcmlnaW4sXHJcbiAgaGVhZGVyVHJhbnNEYXRlLFxyXG4gIGNvbnRleHRMaW5lUmVjSWQsXHJcbiAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxuICByZWFkQ2FjaGVkU3RhdGUsXHJcbiAgc2F2ZUNhY2hlZFN0YXRlLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb25BcmdzKSA9PiB7XHJcbiAgY29uc3Qgc2hvdWxkUmV0dXJuVG9UaWNrZXRMaXN0ID0gdGlja2V0UmV0dXJuQ29udGV4dD8ub3JpZ2luID09PSBcInNoZWV0LWxpbmtcIiB8fCAhdGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZDtcclxuXHJcbiAgY29uc3QgbmF0aXZlQmFja1VybCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgaWYgKHRpY2tldFJldHVybkNvbnRleHQ/Lm9yaWdpbiA9PT0gXCJzaGVldC1saW5rXCIgJiYgdGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkKSB7XHJcbiAgICAgIHJldHVybiBidWlsZEV4cGVuc2VUaWNrZXRMaW5rVXJsKHRpY2tldFJldHVybkNvbnRleHQuc2hlZXRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRpY2tldFJldHVybkNvbnRleHQ/Lm9yaWdpbiA9PT0gXCJleHBlbnNlLWxpbmVcIiAmJiB0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0SWQpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkRXhwZW5zZVNoZWV0TGluZURldGFpbFVybCh0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0SWQsIHRpY2tldFJldHVybkNvbnRleHQuc2hlZXRMaW5lUmVjSWQgfHwgY29udGV4dExpbmVSZWNJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsKHRpY2tldFJldHVybkNvbnRleHQuc2hlZXRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRldGFpbE9yaWdpbiA9PT0gXCJ0aWNrZXQtY3JlYXRlXCIpIHtcclxuICAgICAgY29uc3QgdGlja2V0RGF0ZSA9IHRvRXhwZW5zZUlzb0RhdGUoaGVhZGVyVHJhbnNEYXRlKSB8fCB0b0V4cGVuc2VJc29EYXRlKG5ldyBEYXRlKCkpO1xyXG4gICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICAgIHRpY2tldEZpbGVJZDogZmlsZUlkLFxyXG4gICAgICAgIHRpY2tldERhdGUsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGAvR2FzdG9zL1RpY2tldHM/JHtxdWVyeS50b1N0cmluZygpfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFwiL0dhc3Rvcy9UaWNrZXRzXCI7XHJcbiAgfSwgW2NvbnRleHRMaW5lUmVjSWQsIGRldGFpbE9yaWdpbiwgZmlsZUlkLCBoZWFkZXJUcmFuc0RhdGUsIHRpY2tldFJldHVybkNvbnRleHRdKTtcclxuXHJcbiAgY29uc3QgcmVhcm1FeHBlbnNlVGlja2V0c1JldHVyblN0YXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgY2FjaGVkU3RhdGUgPSByZWFkQ2FjaGVkU3RhdGUoKTtcclxuICAgIGlmICghY2FjaGVkU3RhdGUpIHJldHVybjtcclxuICAgIHNhdmVDYWNoZWRTdGF0ZShjYWNoZWRTdGF0ZSk7XHJcbiAgfSwgW3JlYWRDYWNoZWRTdGF0ZSwgc2F2ZUNhY2hlZFN0YXRlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEJhY2tCdG5cIik7XHJcbiAgICBpZiAoIWJhY2tCdXR0b24pIHJldHVybjtcclxuXHJcbiAgICBiYWNrQnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtYmFjay11cmxcIiwgbmF0aXZlQmFja1VybCk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBiYWNrQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtYmFjay11cmxcIik7XHJcbiAgICB9O1xyXG4gIH0sIFtmaWxlSWQsIG5hdGl2ZUJhY2tVcmxdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghZmlsZUlkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaGFuZGxlTmF0aXZlQmFjayA9IChldmVudDogUG9wU3RhdGVFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQ/LnN0YXRlICYmIGV2ZW50LnN0YXRlLmluZFRyYXAgPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGV4ZWN1dGVCYWNrTmF2aWdhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZiAoc2hvdWxkUmV0dXJuVG9UaWNrZXRMaXN0KSB7XHJcbiAgICAgICAgICByZWFybUV4cGVuc2VUaWNrZXRzUmV0dXJuU3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UobmF0aXZlQmFja1VybCk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbihleGVjdXRlQmFja05hdmlnYXRpb24pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgaGFuZGxlTmF0aXZlQmFjayk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGhhbmRsZU5hdGl2ZUJhY2spO1xyXG4gICAgfTtcclxuICB9LCBbZmlsZUlkLCBuYXRpdmVCYWNrVXJsLCByZWFybUV4cGVuc2VUaWNrZXRzUmV0dXJuU3RhdGUsIHNob3VsZFJldHVyblRvVGlja2V0TGlzdF0pO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldy50c1wiO1xyXG5pbXBvcnQgeyBoYXNFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3U291cmNlIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldFByZXZpZXdVdGlscy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsQXJncyA9IHtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XHJcbiAgaGVhZGVyVXJsRmlsZT86IHN0cmluZyB8IG51bGw7XHJcbn07XHJcblxyXG4vLyBDZW50cmFsaXplcyBzdGlja3ktcHJldmlldyBhdmFpbGFiaWxpdHkgYW5kIGltYWdlIGxvYWRpbmcgZm9yIHRpY2tldCBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsID0gKHtcclxuICBmaWxlSWQsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGRyYWZ0VXJsRmlsZSxcclxuICBoZWFkZXJVcmxGaWxlLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsQXJncykgPT4ge1xyXG4gIGNvbnN0IHByZXZpZXdTb3VyY2VVcmwgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KGlzRWRpdGluZyA/IGRyYWZ0VXJsRmlsZSA6IGhlYWRlclVybEZpbGUpLCBbZHJhZnRVcmxGaWxlLCBoZWFkZXJVcmxGaWxlLCBpc0VkaXRpbmddKTtcclxuICBjb25zdCBzaG93U3RpY2t5UHJldmlldyA9IHVzZU1lbW8oKCkgPT4gaGFzRXhwZW5zZVRpY2tldEltYWdlUHJldmlld1NvdXJjZShwcmV2aWV3U291cmNlVXJsKSwgW3ByZXZpZXdTb3VyY2VVcmxdKTtcclxuICBjb25zdCBwcmV2aWV3ID0gdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldyh7XHJcbiAgICBmaWxlSWQsXHJcbiAgICBzb3VyY2VVcmw6IHByZXZpZXdTb3VyY2VVcmwsXHJcbiAgICBlbmFibGVkOiBzaG93U3RpY2t5UHJldmlldyxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gICAgLi4ucHJldmlldyxcclxuICB9O1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsaUJBQXlFOzs7QUNBekUsbUJBQWlEO0FBZTFDLElBQU0sOEJBQThCLENBQUMsRUFBRSxXQUFXLFFBQVEsWUFBWSxNQUF1QztBQUNsSCxRQUFNLENBQUMsUUFBUSxTQUFTLFFBQUksdUJBQTJDLElBQUk7QUFDM0UsUUFBTSxDQUFDLE9BQU8sUUFBUSxRQUFJLHVCQUFvQyxDQUFDLENBQUM7QUFDaEUsUUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHVCQUFTLEtBQUs7QUFDaEQsUUFBTSxDQUFDLGNBQWMsZUFBZSxRQUFJLHVCQUFTLEVBQUU7QUFFbkQsUUFBTSxtQkFBZSwwQkFBWSxZQUFZO0FBQzNDLFFBQUksQ0FBQyxXQUFXO0FBQ2Qsa0JBQVk7QUFDWjtBQUFBLElBQ0Y7QUFFQSxVQUFNLGFBQWEsU0FBUyxNQUFNO0FBQ2xDLFFBQUksQ0FBQyxZQUFZO0FBQ2Ysc0JBQWdCLEtBQUssMkJB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LEVBQ2YsY0FBYztBQUFBLEVBQ2QsU0FBUztBQUNYO0FBV0EsSUFBTSxzQ0FBc0MsQ0FBQztBQUFBLEVBQzNDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixPQXNETztBQUFBLEVBQ0w7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGlCQUFpQjtBQUFBLEVBQ2pCO0FBQUEsRUFDQSxlQUFlO0FBQUEsRUFDZjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLDBC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QyxVQUFVO0FBQUEsRUFDYjtBQUVBLFNBQ0UsOEVBQ0U7QUFBQSxpREFBQyxtQ0FBd0IsT0FBTyxXQUFXLE9BQU8sU0FBUyxXQUFXLFNBQVMsU0FBUyxXQUFXLFNBQVM7QUFBQSxJQUMzRyxXQUFXLHVCQUNWO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxXQUFXLEtBQUssNkJBQTZCLGtCQUFrQjtBQUFBLFFBQy9ELE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLGVBQWUsS0FBSyw2QkFBNkIsa0JBQWtCO0FBQUEsUUFDbkUsV0FBVztBQUFBO0FBQUEsSUFDYixJQUNFO0FBQUEsS0FDTjtBQUVKO0FBR0EsSUFBTSwwQkFBMEIsTUFBTTtBQUNwQyxTQUNFLDZDQUFDLGdDQUFxQix5QkFBdUIsTUFDM0MsdURBQUMsa0NBQStCLEdBQ2xDO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSw0QkFBNEI7QUFDbkUsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQywyQkFBd0IsQ0FBRTtBQUN0RDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sa0NBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImhvdXJzIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaG91cnMiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
