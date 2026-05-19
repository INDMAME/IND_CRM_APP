import {
  ExpenseTicketPreviewModal_default,
  ExpenseTicketStickyPreview_default,
  hasExpenseTicketImagePreviewSource,
  useExpenseTicketImagePreview
} from "./chunks/chunk-U2HB7HJP.js";
import {
  SingleDatePicker
} from "./chunks/chunk-3RR6MY4O.js";
import {
  getExpenseTicketStatusLabel,
  useExpenseTicketsFilterCache
} from "./chunks/chunk-UFSYGIE3.js";
import {
  mapWindowEnumOptions
} from "./chunks/chunk-YM2TI2W6.js";
import {
  clearExpenseTicketSheetSyncState,
  readExpenseTicketSheetSyncState,
  saveExpenseTicketSheetSyncState,
  syncExpenseLinkedTicketSheetLine
} from "./chunks/chunk-Q4BZIPG3.js";
import {
  mapExpenseTicketDetailHeader,
  mapExpenseTicketDetailLine
} from "./chunks/chunk-JVSSSXBJ.js";
import {
  resolveExpenseSheetEditAccess,
  useExpenseTicketLinkSheetGate
} from "./chunks/chunk-OJCATNR7.js";
import "./chunks/chunk-6CQY4MTW.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-RQJBQWKS.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-6TVWMV24.js";
import {
  CompactPagination_default,
  FloatingActionButton_default,
  useTimelineCardEffects
} from "./chunks/chunk-MYQREIJ7.js";
import "./chunks/chunk-HF2ANVLM.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-IKIXF6N3.js";
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
} from "./chunks/chunk-OZCLQCPX.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-UXY4YQ3D.js";
import "./chunks/chunk-CBDB7NMA.js";
import {
  clearExpenseNavigationGuard,
  formatAmountWithCurrency,
  formatExpenseNumber,
  navigateToExpenseUrl,
  setExpenseNavigationGuard
} from "./chunks/chunk-S4F4JMPK.js";
import {
  configureExpenseApiAuth,
  deleteExpenseSheetLine,
  deleteExpenseSheetTicket,
  deleteExpenseSheetTicketFile,
  fetchExpenseSheetDetail,
  fetchExpenseSheetTicket,
  formatExpenseDisplayDate,
  parseExpenseDate,
  safeText,
  toIsoDate,
  updateExpenseSheetTicket
} from "./chunks/chunk-XSHPMUMP.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-XUQXOD2Z.js";
import {
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  toExpenseApiDdMmYyyy,
  toExpenseIsoDate
} from "./chunks/chunk-SRZDJTMJ.js";
import "./chunks/chunk-ZBKHPZJX.js";
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
var import_react10 = __toESM(require_react());

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
var REQUIRED_GASTO_TYPES = /* @__PURE__ */ new Set([1, 2, 3, 4, 5, 6, 7, 8, 14]);
var parseOptionalInteger = (raw) => {
  const value = String(raw || "").trim();
  if (!value) return void 0;
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) ? parsed : void 0;
};
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
  draftTransDate,
  draftTicketTime,
  draftComentario,
  draftUrlFile,
  draftFileName,
  linkedExpenseSheetId,
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
      const parsedGastoType = parseOptionalInteger(draftGastoType);
      if (parsedGastoType === void 0 || !REQUIRED_GASTO_TYPES.has(parsedGastoType)) {
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
          if (syncSheetLine && validatedSheetId) {
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
      draftTicketTime,
      draftTransDate,
      draftUrlFile,
      fileId,
      isEditing,
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
      syncSheetLine: false
    });
  }, [runHeaderUpdate]);
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
  const descriptionInputRef = (0, import_react3.useRef)(null);
  const gastoTypeInputRef = (0, import_react3.useRef)(null);
  const currencyInputRef = (0, import_react3.useRef)(null);
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
  const setDraftTransDate = (0, import_react3.useCallback)(
    (value) => {
      dispatch({
        type: "set_draft_field",
        field: "transDate",
        value: resolveSetStateValue(value, state.draft.transDate)
      });
    },
    [state.draft.transDate]
  );
  const setDraftTicketTime = (0, import_react3.useCallback)(
    (value) => {
      dispatch({
        type: "set_draft_field",
        field: "ticketTime",
        value: resolveSetStateValue(value, state.draft.ticketTime)
      });
    },
    [state.draft.ticketTime]
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
    const descriptionIsValid = !!normalizedDescription;
    const gastoTypeIsValid = isValidRequiredGastoType(state.draft.gastoType);
    const currencyIsValid = !!normalizedCurrencyCode;
    setDescriptionInvalid(!descriptionIsValid);
    setGastoTypeInvalid(!gastoTypeIsValid);
    setCurrencyCodeInvalid(!currencyIsValid);
    if (descriptionIsValid && gastoTypeIsValid && currencyIsValid) {
      return true;
    }
    const message = !descriptionIsValid ? indT("ExpenseSheets_Validation_DescriptionRequired", "Description is required.") : !gastoTypeIsValid ? indT("Tickets_Validation_CategoryRequired", "Category is required.") : indT("ExpenseSheets_Validation_CurrencyRequired", "Currency is required.");
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
      currencyInputRef.current?.focus();
    });
    return false;
  }, [state.draft.currencyCode, state.draft.gastoType]);
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
    setDraftTransDate,
    setDraftTicketTime,
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
    () => formatAmountWithCurrency(header?.totalAmount ?? null, (isEditing ? draftCurrencyCode : header?.currencyCode) || header?.currencyCode),
    [draftCurrencyCode, header?.currencyCode, header?.totalAmount, isEditing]
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
  draftTransDate,
  draftTicketTime,
  draftUrlFile,
  draftFileName,
  onDraftDescriptionChange,
  onDraftGastoTypeChange,
  onDraftCurrencyCodeChange,
  onDraftTransDateChange,
  onDraftTicketTimeChange,
  onOpenFile,
  onOpenExpenseSheet,
  hideOpenFileAction = false
}) => {
  const previewUrl = safeText(isEditing ? draftUrlFile : header.urlFile);
  const canOpenFile = hasExpenseTicketImagePreviewSource(previewUrl);
  const showExpenseSheetField = hasRealExpenseSheetValue(header.hojaGastosIdDisplay);
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
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ExpenseReadOnlyField_default,
        {
          label: indT("ExpenseSheets_Field_TotalAmount", "Total amount"),
          value: totalAmountText || "-"
        }
      ),
      isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "visita-field-text", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        SingleDatePicker,
        {
          label: indT("Tickets_Field_TicketDate", "Ticket date"),
          value: draftTransDate,
          onChange: onDraftTransDateChange,
          readOnly: !isEditing,
          disabled: !isEditing
        }
      ) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ExpenseReadOnlyField_default,
        {
          label: indT("Tickets_Field_TicketDate", "Ticket date"),
          value: transDateText || formatExpenseDisplayDate(header.ticketDate || header.transDate, document?.documentElement?.lang || "es-ES") || "-"
        }
      ),
      isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("Tickets_Field_TicketTime", "Ticket time") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            className: "form-control",
            type: "time",
            step: 1,
            value: draftTicketTime,
            onChange: (event) => onDraftTicketTimeChange(event.target.value || ""),
            "aria-label": indT("Tickets_Field_TicketTime", "Ticket time")
          }
        )
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ExpenseReadOnlyField_default,
        {
          label: indT("Tickets_Field_TicketTime", "Ticket time"),
          value: ticketTimeText || "-"
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

// Web/wwwroot/react/src/pages/gastos/components/ExpenseTicketLinesList.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
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
var TICKET_LINE_DATE_PANEL_ICON = /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
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
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M14 3v4a1 1 0 0 0 1 1h4" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M9 7l1 0" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M9 13l6 0" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M13 17l2 0" })
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "space-y-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseSectionDivider_default, { label: indT("Tickets_Detail_Lines", "Lines"), className: "expense-section-divider--spaced" }),
    visibleLines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "timeline-box timeline-empty", "data-empty-text": indT("Tickets_Detail_NoLines", "No lines for this ticket.") }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { ref: containerRef, className: "timeline-box", children: visibleLines.map((line) => {
      const amountText = formatAmountWithCurrency(line.totalAmount, currencyCode);
      const qtyText = formatQtyValue(line.qty);
      const priceText = formatAmountWithCurrency(line.price, currencyCode);
      const title = line.description || line.recId || "-";
      const primarySubtitleParts = [
        `${indT("ExpenseSheets_Field_Qty", "Quantity")}: ${qtyText}`,
        `${indT("ExpenseSheets_Field_Price", "Price")}: ${priceText}`
      ].filter(Boolean);
      const primarySubtitle = primarySubtitleParts.join("   ");
      const subtitle = primarySubtitle;
      const lineKey = String(line.recId || "").trim() || [line.description, line.totalAmount, line.price, line.qty].map((value) => String(value || "").trim()).join("|");
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "timeline-item", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var ExpenseTicketLinesList_default = ExpenseTicketLinesList;

// Web/wwwroot/react/src/pages/gastos/tickets/detail/ExpenseTicketDetailView.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var ExpenseTicketDetailView = ({ modal, preview, content }) => {
  const detailBody = /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        draftTransDate: content.draftTransDate,
        draftTicketTime: content.draftTicketTime,
        draftUrlFile: content.draftUrlFile,
        draftFileName: content.draftFileName,
        onDraftDescriptionChange: content.onDraftDescriptionChange,
        onDraftGastoTypeChange: content.onDraftGastoTypeChange,
        onDraftCurrencyCodeChange: content.onDraftCurrencyCodeChange,
        onDraftTransDateChange: content.onDraftTransDateChange,
        onDraftTicketTimeChange: content.onDraftTicketTimeChange,
        onOpenFile: content.onOpenFile,
        onOpenExpenseSheet: content.onOpenExpenseSheet,
        hideOpenFileAction: content.showStickyPreview
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-sm text-zinc-600", children: content.status })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "div",
      {
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-zinc-700",
        style: { display: content.isLoading ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { className: "ind-spinner size-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    content.errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-danger", children: content.errorMessage }) : null,
    !content.isLoading && !content.errorMessage && content.header ? content.showStickyPreview ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid gap-y-2 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "lg:col-start-2", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "space-y-2 lg:col-start-1 lg:row-start-1", children: detailBody })
    ] }) : detailBody : null
  ] });
};
var ExpenseTicketDetailView_default = ExpenseTicketDetailView;

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketDetailBackNavigation.ts
var import_react8 = __toESM(require_react());
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
  const nativeBackUrl = (0, import_react8.useMemo)(() => {
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
  const rearmExpenseTicketsReturnState = (0, import_react8.useCallback)(() => {
    const cachedState = readCachedState();
    if (!cachedState) return;
    saveCachedState(cachedState);
  }, [readCachedState, saveCachedState]);
  (0, import_react8.useEffect)(() => {
    if (!fileId) return;
    const backButton = document.getElementById("globalBackBtn");
    if (!backButton) return;
    backButton.setAttribute("data-back-url", nativeBackUrl);
    return () => {
      backButton.removeAttribute("data-back-url");
    };
  }, [fileId, nativeBackUrl]);
  (0, import_react8.useEffect)(() => {
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
var import_react9 = __toESM(require_react());
var useExpenseTicketDetailPreviewPanel = ({
  fileId,
  isEditing,
  draftUrlFile,
  headerUrlFile
}) => {
  const previewSourceUrl = (0, import_react9.useMemo)(() => safeText(isEditing ? draftUrlFile : headerUrlFile), [draftUrlFile, headerUrlFile, isEditing]);
  const showStickyPreview = (0, import_react9.useMemo)(() => hasExpenseTicketImagePreviewSource(previewSourceUrl), [previewSourceUrl]);
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
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var ALLOWED_GASTO_TYPES = /* @__PURE__ */ new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);
var LINES_PAGE_SIZE = 6;
var GASTO_TYPE_LABEL_KEYS = {
  0: { key: "Enum_None", fallback: "None" },
  1: { key: "Enum_GastoType_Peaje", fallback: "Peaje" },
  2: { key: "Enum_GastoType_Parking", fallback: "Parking" },
  3: { key: "Enum_GastoType_Km", fallback: "Km" },
  4: { key: "Enum_GastoType_Desayuno", fallback: "Desayuno" },
  5: { key: "Enum_GastoType_Comida", fallback: "Comida" },
  6: { key: "Enum_GastoType_Cena", fallback: "Cena" },
  7: { key: "Enum_GastoType_Hotel", fallback: "Hotel" },
  8: { key: "Enum_GastoType_Varios", fallback: "Varios" },
  14: { key: "Enum_GastoType_Taxi", fallback: "Taxi" }
};
var NewLineIcon = () => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "size-5", children: [
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 19c3.333 -2 5 -4 5 -6c0 -3 -1 -3 -2 -3s-2.032 1.085 -2 3c.034 2.048 1.658 2.877 2.5 4c1.5 2 2.5 2.5 3.5 1c.667 -1 1.167 -1.833 1.5 -2.5c1 2.333 2.333 3.5 4 3.5h2.5" }),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2" }),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16 7h4" })
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
var buildFallbackGastoTypeOptions = () => {
  return Object.entries(GASTO_TYPE_LABEL_KEYS).map(([code, cfg]) => ({
    value: String(code),
    text: indT(cfg.key, cfg.fallback)
  })).sort((left, right) => Number(left.value) - Number(right.value));
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
  draftTransDate,
  draftTicketTime,
  draftUrlFile,
  draftFileName,
  setDraftDescription,
  setDraftGastoType,
  setDraftCurrencyCode,
  setDraftTransDate,
  setDraftTicketTime,
  isFromSheetLink,
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
  draftTransDate,
  draftTicketTime,
  draftUrlFile,
  draftFileName,
  onDraftDescriptionChange: setDraftDescription,
  onDraftGastoTypeChange: setDraftGastoType,
  onDraftCurrencyCodeChange: setDraftCurrencyCode,
  onDraftTransDateChange: setDraftTransDate,
  onDraftTicketTimeChange: setDraftTicketTime,
  onOpenFile: openFile,
  onOpenExpenseSheet: isFromSheetLink ? void 0 : handleOpenExpenseSheet,
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
  const autoEditAttemptedRef = (0, import_react10.useRef)(false);
  (0, import_react10.useEffect)(() => {
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
  const lineContainerRef = (0, import_react10.useRef)(null);
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
  const gastoTypeOptions = (0, import_react10.useMemo)(() => {
    const source = Array.isArray(window.__EXPENSE_GASTO_TYPES__) ? window.__EXPENSE_GASTO_TYPES__ : [];
    const mapped = mapWindowEnumOptions(source).filter((entry) => {
      const parsed = Number(entry.value);
      return Number.isInteger(parsed) && ALLOWED_GASTO_TYPES.has(parsed);
    });
    if (mapped.length > 0) {
      return mapped.sort((left, right) => Number(left.value) - Number(right.value));
    }
    return buildFallbackGastoTypeOptions();
  }, []);
  const gastoTypeLabelMap = (0, import_react10.useMemo)(() => {
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
  const linkedExpenseSheetId = (0, import_react10.useMemo)(
    () => safeText(ticketReturnContext?.sheetId || contextSheetId || header?.hojaGastosIdDisplay),
    [contextSheetId, header?.hojaGastosIdDisplay, ticketReturnContext]
  );
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
  const [sheetSyncBlocked, setSheetSyncBlocked] = (0, import_react10.useState)(() => !!readExpenseTicketSheetSyncState(fileId));
  const [sheetSyncBlockedMessage, setSheetSyncBlockedMessage] = (0, import_react10.useState)(
    () => safeText(readExpenseTicketSheetSyncState(fileId)?.message)
  );
  (0, import_react10.useEffect)(() => {
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
  (0, import_react10.useEffect)(() => {
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
  (0, import_react10.useEffect)(() => {
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
    setDraftTransDate,
    setDraftTicketTime,
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
  const handleEnableEditInContext = (0, import_react10.useCallback)(() => {
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
  const { paginationLabels, previewAltText, statusLabel, gastoTypeLabel, totalAmountText, transDateText, ticketTimeText } = useExpenseTicketDetailDisplay({
    header,
    draftGastoType,
    draftCurrencyCode,
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
  const visibleLines = (0, import_react10.useMemo)(() => pagedSlice(lines, linePage, LINES_PAGE_SIZE), [linePage, lines]);
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
    draftTransDate,
    draftTicketTime,
    draftComentario,
    draftUrlFile,
    draftFileName,
    linkedExpenseSheetId,
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
  (0, import_react10.useEffect)(() => {
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
    handleCancelEdit,
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
      draftTransDate,
      draftTicketTime,
      draftUrlFile,
      draftFileName,
      setDraftDescription,
      setDraftGastoType,
      setDraftCurrencyCode,
      setDraftTransDate,
      setDraftTicketTime,
      isFromSheetLink,
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
  const fabMenuItems = (0, import_react10.useMemo)(
    () => [
      {
        id: "new-ticket-line",
        label: indT("ExpenseSheets_Fab_NewLine", "Nueva Linea"),
        icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(NewLineIcon, {}),
        onClick: () => {
          void detailView.openCreateLineDetail();
        },
        disabled: detailView.isCreateLineFabDisabled
      }
    ],
    [detailView]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExpenseTicketDetailView_default, { modal: detailView.modal, preview: detailView.preview, content: detailView.content }),
    detailView.canShowCreateLineFab ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(VisitasPageProviders_default, { enableExpenseManagement: true, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExpenseTicketDetailPageContent, {}) });
};
var mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-ticket-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExpenseTicketDetailPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseTicketDetailPage_default = ExpenseTicketDetailPage;
export {
  ExpenseTicketDetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFJvdXRlQ29udGV4dC50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5LnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmVzTGlzdC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsVmlldy50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24sIHsgdHlwZSBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCB7IHVzZUF1dGhDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XHJcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xyXG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XHJcbmltcG9ydCB7IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLCBuYXZpZ2F0ZVRvRXhwZW5zZVVybCwgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBpc01hbmFnaW5nT3RoZXJFeHBlbnNlVXNlciB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTWFuYWdlZFVzZXJTY29wZS50c1wiO1xyXG5pbXBvcnQgeyBtYXBXaW5kb3dFbnVtT3B0aW9ucywgdHlwZSBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB7IGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHJlYWRFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlIH0gZnJvbSBcIi4uL3VzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3IgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXkudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3IGZyb20gXCIuL0V4cGVuc2VUaWNrZXREZXRhaWxWaWV3LnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlIH0gZnJvbSBcIi4uL3VzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWwgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciwgRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuXHJcbmNvbnN0IEFMTE9XRURfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XHJcbmNvbnN0IExJTkVTX1BBR0VfU0laRSA9IDY7XHJcbmNvbnN0IEdBU1RPX1RZUEVfTEFCRUxfS0VZUzogUmVjb3JkPG51bWJlciwgeyBrZXk6IHN0cmluZzsgZmFsbGJhY2s6IHN0cmluZyB9PiA9IHtcclxuICAwOiB7IGtleTogXCJFbnVtX05vbmVcIiwgZmFsbGJhY2s6IFwiTm9uZVwiIH0sXHJcbiAgMTogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfUGVhamVcIiwgZmFsbGJhY2s6IFwiUGVhamVcIiB9LFxyXG4gIDI6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1BhcmtpbmdcIiwgZmFsbGJhY2s6IFwiUGFya2luZ1wiIH0sXHJcbiAgMzogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfS21cIiwgZmFsbGJhY2s6IFwiS21cIiB9LFxyXG4gIDQ6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0Rlc2F5dW5vXCIsIGZhbGxiYWNrOiBcIkRlc2F5dW5vXCIgfSxcclxuICA1OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9Db21pZGFcIiwgZmFsbGJhY2s6IFwiQ29taWRhXCIgfSxcclxuICA2OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9DZW5hXCIsIGZhbGxiYWNrOiBcIkNlbmFcIiB9LFxyXG4gIDc6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0hvdGVsXCIsIGZhbGxiYWNrOiBcIkhvdGVsXCIgfSxcclxuICA4OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9WYXJpb3NcIiwgZmFsbGJhY2s6IFwiVmFyaW9zXCIgfSxcclxuICAxNDogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfVGF4aVwiLCBmYWxsYmFjazogXCJUYXhpXCIgfSxcclxufTtcclxuXHJcbmNvbnN0IE5ld0xpbmVJY29uID0gKCkgPT4gKFxyXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwic2l6ZS01XCI+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMyAxOWMzLjMzMyAtMiA1IC00IDUgLTZjMCAtMyAtMSAtMyAtMiAtM3MtMi4wMzIgMS4wODUgLTIgM2MuMDM0IDIuMDQ4IDEuNjU4IDIuODc3IDIuNSA0YzEuNSAyIDIuNSAyLjUgMy41IDFjLjY2NyAtMSAxLjE2NyAtMS44MzMgMS41IC0yLjVjMSAyLjMzMyAyLjMzMyAzLjUgNCAzLjVoMi41XCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTIwIDE3di0xMmMwIC0xLjEyMSAtLjg3OSAtMiAtMiAtMnMtMiAuODc5IC0yIDJ2MTJsMiAybDIgLTJcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTYgN2g0XCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IHBhZ2VkU2xpY2UgPSA8VCw+KGl0ZW1zOiBUW10sIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcik6IFRbXSA9PiB7XHJcbiAgaWYgKCFpdGVtcy5sZW5ndGgpIHJldHVybiBbXTtcclxuICBjb25zdCBzYWZlUGFnZSA9IE1hdGgubWF4KDEsIHBhZ2UpO1xyXG4gIGNvbnN0IHN0YXJ0ID0gKHNhZmVQYWdlIC0gMSkgKiBwYWdlU2l6ZTtcclxuICByZXR1cm4gaXRlbXMuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgcGFnZVNpemUpO1xyXG59O1xyXG5cclxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxyXG5jb25zdCBib290c3RyYXBFeHBlbnNlQXBpQXV0aCA9ICgpID0+IHtcclxuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCh7XHJcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcclxuICAgIGVudHJhT2lkOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxyXG4gICAgYXBwQ29kZTogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRGYWxsYmFja0dhc3RvVHlwZU9wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcclxuICByZXR1cm4gT2JqZWN0LmVudHJpZXMoR0FTVE9fVFlQRV9MQUJFTF9LRVlTKVxyXG4gICAgLm1hcCgoW2NvZGUsIGNmZ10pID0+ICh7XHJcbiAgICAgIHZhbHVlOiBTdHJpbmcoY29kZSksXHJcbiAgICAgIHRleHQ6IGluZFQoY2ZnLmtleSwgY2ZnLmZhbGxiYWNrKSxcclxuICAgIH0pKVxyXG4gICAgLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiBOdW1iZXIobGVmdC52YWx1ZSkgLSBOdW1iZXIocmlnaHQudmFsdWUpKTtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVMaW5rZWRUaWNrZXRCbG9ja2VkTWVzc2FnZSA9IChpc1BhaWQ6IGJvb2xlYW4pOiBzdHJpbmcgPT4ge1xyXG4gIGlmIChpc1BhaWQpIHtcclxuICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUGFpZFJlYWRPbmx5XCIsIFwiTGFzIGhvamFzIGRlIGdhc3RvIHBhZ2FkYXMgc29uIGRlIHNvbG8gbGVjdHVyYS5cIik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1JlYWRPbmx5QnlTdGF0dXNcIiwgXCJObyBzZSBwdWVkZSBlZGl0YXIgZXN0YSBob2phIGRlIGdhc3RvcyBlbiBlbCBlc3RhZG8gYWN0dWFsLlwiKTtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbE1vZGFsVmlldyA9ICh7XHJcbiAgbW9kYWwsXHJcbiAgbW9kYWxDb25maXJtVGV4dCxcclxuICBtb2RhbENhbmNlbFRleHQsXHJcbiAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICBidXN5LFxyXG4gIG1vZGFsRXJyb3IsXHJcbiAgc3RhdHVzLFxyXG4gIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcclxuICBjbG9zZUNvbmZpcm0sXHJcbn06IHtcclxuICBtb2RhbDoge1xyXG4gICAgb3BlbjogYm9vbGVhbjtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBzaG93Q2FuY2VsOiBib29sZWFuO1xyXG4gICAgc2hvd0NvbmZpcm06IGJvb2xlYW47XHJcbiAgfTtcclxuICBtb2RhbENvbmZpcm1UZXh0OiBzdHJpbmc7XHJcbiAgbW9kYWxDYW5jZWxUZXh0OiBzdHJpbmc7XHJcbiAgbW9kYWxMb2FkaW5nVGV4dDogc3RyaW5nO1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxFcnJvcjogc3RyaW5nO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybTogKCkgPT4gdm9pZDtcclxuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbn0pID0+ICh7XHJcbiAgb3BlbjogbW9kYWwub3BlbixcclxuICB0aXRsZTogbW9kYWwudGl0bGUsXHJcbiAgbWVzc2FnZTogbW9kYWwubWVzc2FnZSxcclxuICBjb25maXJtVGV4dDogbW9kYWxDb25maXJtVGV4dCxcclxuICBjYW5jZWxUZXh0OiBtb2RhbENhbmNlbFRleHQsXHJcbiAgbG9hZGluZ1RleHQ6IG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgc2hvd0NhbmNlbDogbW9kYWwuc2hvd0NhbmNlbCxcclxuICBzaG93Q29uZmlybTogbW9kYWwuc2hvd0NvbmZpcm0sXHJcbiAgYnVzeSxcclxuICBlcnJvcjogbW9kYWxFcnJvcixcclxuICBzdGF0dXMsXHJcbiAgb25Db25maXJtOiBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgb25DYW5jZWw6IGNsb3NlQ29uZmlybSxcclxufSk7XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3VmlldyA9ICh7XHJcbiAgcHJldmlld09wZW4sXHJcbiAgcHJldmlld0J1c3ksXHJcbiAgcHJldmlld0Vycm9yLFxyXG4gIHByZXZpZXdJbWFnZVVybCxcclxuICBwcmV2aWV3QWx0VGV4dCxcclxuICBwcmV2aWV3U2NhbGUsXHJcbiAgcHJldmlld1RyYW5zbGF0ZSxcclxuICBwcmV2aWV3U3VyZmFjZVJlZixcclxuICBjbG9zZVByZXZpZXcsXHJcbiAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcclxuICBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxuICBoYW5kbGVQcmV2aWV3V2hlZWwsXHJcbn06IHtcclxuICBwcmV2aWV3T3BlbjogYm9vbGVhbjtcclxuICBwcmV2aWV3QnVzeTogYm9vbGVhbjtcclxuICBwcmV2aWV3RXJyb3I6IHN0cmluZztcclxuICBwcmV2aWV3SW1hZ2VVcmw6IHN0cmluZztcclxuICBwcmV2aWV3QWx0VGV4dDogc3RyaW5nO1xyXG4gIHByZXZpZXdTY2FsZTogbnVtYmVyO1xyXG4gIHByZXZpZXdUcmFuc2xhdGU6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfTtcclxuICBwcmV2aWV3U3VyZmFjZVJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgY2xvc2VQcmV2aWV3OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bjogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZTogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgaGFuZGxlUHJldmlld1doZWVsOiAoZXZlbnQ6IFJlYWN0LldoZWVsRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG59KSA9PiAoe1xyXG4gIG9wZW46IHByZXZpZXdPcGVuLFxyXG4gIGJ1c3k6IHByZXZpZXdCdXN5LFxyXG4gIGVycm9yOiBwcmV2aWV3RXJyb3IsXHJcbiAgaW1hZ2VVcmw6IHByZXZpZXdJbWFnZVVybCxcclxuICBpbWFnZUFsdDogcHJldmlld0FsdFRleHQsXHJcbiAgc2NhbGU6IHByZXZpZXdTY2FsZSxcclxuICB0cmFuc2xhdGU6IHByZXZpZXdUcmFuc2xhdGUsXHJcbiAgc3VyZmFjZVJlZjogcHJldmlld1N1cmZhY2VSZWYsXHJcbiAgb25DbG9zZTogY2xvc2VQcmV2aWV3LFxyXG4gIG9uUG9pbnRlckRvd246IGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcclxuICBvblBvaW50ZXJNb3ZlOiBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXHJcbiAgb25Qb2ludGVyRW5kOiBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxuICBvbldoZWVsOiBoYW5kbGVQcmV2aWV3V2hlZWwsXHJcbn0pO1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXcgPSAoe1xyXG4gIGlzTG9hZGluZyxcclxuICBlcnJvck1lc3NhZ2UsXHJcbiAgaGVhZGVyLFxyXG4gIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gIHByZXZpZXdCdXN5LFxyXG4gIHByZXZpZXdFcnJvcixcclxuICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgcHJldmlld0FsdFRleHQsXHJcbiAgb3BlbkZpbGUsXHJcbiAgc3RhdHVzTGFiZWwsXHJcbiAgZ2FzdG9UeXBlTGFiZWwsXHJcbiAgdG90YWxBbW91bnRUZXh0LFxuICB0cmFuc0RhdGVUZXh0LFxuICB0aWNrZXRUaW1lVGV4dCxcbiAgaXNFZGl0aW5nLFxuICBnYXN0b1R5cGVPcHRpb25zLFxyXG4gIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgZGVzY3JpcHRpb25JbnZhbGlkLFxyXG4gIGRlc2NyaXB0aW9uSW5wdXRSZWYsXHJcbiAgZHJhZnRHYXN0b1R5cGUsXHJcbiAgZ2FzdG9UeXBlSW52YWxpZCxcclxuICBnYXN0b1R5cGVJbnB1dFJlZixcclxuICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICBjdXJyZW5jeUNvZGVJbnZhbGlkLFxyXG4gIGN1cnJlbmN5SW5wdXRSZWYsXG4gIGRyYWZ0VHJhbnNEYXRlLFxuICBkcmFmdFRpY2tldFRpbWUsXG4gIGRyYWZ0VXJsRmlsZSxcbiAgZHJhZnRGaWxlTmFtZSxcclxuICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gIHNldERyYWZ0R2FzdG9UeXBlLFxyXG4gIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxuICBzZXREcmFmdFRyYW5zRGF0ZSxcbiAgc2V0RHJhZnRUaWNrZXRUaW1lLFxuICBpc0Zyb21TaGVldExpbmssXG4gIGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQsXHJcbiAgdmlzaWJsZUxpbmVzLFxyXG4gIHRvdGFsTGluZVBhZ2VzLFxyXG4gIGxpbmVQYWdlLFxyXG4gIHNhZmVDdXJyZW5jeUNvZGUsXHJcbiAgcGFnaW5hdGlvbkxhYmVscyxcclxuICBsaW5lQ29udGFpbmVyUmVmLFxyXG4gIHNldExpbmVQYWdlLFxyXG4gIG9wZW5MaW5lRGV0YWlsLFxyXG4gIHN0YXR1cyxcclxufToge1xyXG4gIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xyXG4gIHNob3dTdGlja3lQcmV2aWV3OiBib29sZWFuO1xyXG4gIHByZXZpZXdCdXN5OiBib29sZWFuO1xyXG4gIHByZXZpZXdFcnJvcjogc3RyaW5nO1xyXG4gIHByZXZpZXdJbWFnZVVybDogc3RyaW5nO1xyXG4gIHByZXZpZXdBbHRUZXh0OiBzdHJpbmc7XHJcbiAgb3BlbkZpbGU6ICgpID0+IHZvaWQ7XHJcbiAgc3RhdHVzTGFiZWw6IHN0cmluZztcclxuICBnYXN0b1R5cGVMYWJlbDogc3RyaW5nO1xyXG4gIHRvdGFsQW1vdW50VGV4dDogc3RyaW5nO1xuICB0cmFuc0RhdGVUZXh0OiBzdHJpbmc7XG4gIHRpY2tldFRpbWVUZXh0OiBzdHJpbmc7XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgZ2FzdG9UeXBlT3B0aW9uczogRXhwZW5zZVNlbGVjdE9wdGlvbltdO1xyXG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcclxuICBkZXNjcmlwdGlvbkludmFsaWQ6IGJvb2xlYW47XHJcbiAgZGVzY3JpcHRpb25JbnB1dFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICBkcmFmdEdhc3RvVHlwZTogc3RyaW5nO1xyXG4gIGdhc3RvVHlwZUludmFsaWQ6IGJvb2xlYW47XHJcbiAgZ2FzdG9UeXBlSW5wdXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBjdXJyZW5jeUNvZGVJbnZhbGlkOiBib29sZWFuO1xyXG4gIGN1cnJlbmN5SW5wdXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XG4gIGRyYWZ0VGlja2V0VGltZTogc3RyaW5nO1xuICBkcmFmdFVybEZpbGU6IHN0cmluZztcbiAgZHJhZnRGaWxlTmFtZTogc3RyaW5nO1xyXG4gIHNldERyYWZ0RGVzY3JpcHRpb246ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldERyYWZ0R2FzdG9UeXBlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXREcmFmdEN1cnJlbmN5Q29kZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldERyYWZ0VHJhbnNEYXRlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0RHJhZnRUaWNrZXRUaW1lOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgaXNGcm9tU2hlZXRMaW5rOiBib29sZWFuO1xuICBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0OiAoKSA9PiB2b2lkO1xyXG4gIHZpc2libGVMaW5lczogRXhwZW5zZVRpY2tldERldGFpbExpbmVbXTtcclxuICB0b3RhbExpbmVQYWdlczogbnVtYmVyO1xyXG4gIGxpbmVQYWdlOiBudW1iZXI7XHJcbiAgc2FmZUN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIHBhZ2luYXRpb25MYWJlbHM6IHtcclxuICAgIGZpcnN0OiBzdHJpbmc7XHJcbiAgICBwcmV2OiBzdHJpbmc7XHJcbiAgICBuZXh0OiBzdHJpbmc7XHJcbiAgICBsYXN0OiBzdHJpbmc7XHJcbiAgfTtcclxuICBsaW5lQ29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBzZXRMaW5lUGFnZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcclxuICBvcGVuTGluZURldGFpbDogKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG59KSA9PiAoe1xyXG4gIGlzTG9hZGluZyxcclxuICBlcnJvck1lc3NhZ2UsXHJcbiAgaGVhZGVyLFxyXG4gIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gIHByZXZpZXdCdXN5LFxyXG4gIHByZXZpZXdFcnJvcixcclxuICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgcHJldmlld0ZpbGVOYW1lOiBwcmV2aWV3QWx0VGV4dCxcclxuICBwcmV2aWV3QWx0VGV4dCxcclxuICBvbk9wZW5QcmV2aWV3OiBvcGVuRmlsZSxcclxuICBzdGF0dXNMYWJlbCxcclxuICBnYXN0b1R5cGVMYWJlbCxcclxuICB0b3RhbEFtb3VudFRleHQsXG4gIHRyYW5zRGF0ZVRleHQsXG4gIHRpY2tldFRpbWVUZXh0LFxuICBpc0VkaXRpbmcsXG4gIGdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkZXNjcmlwdGlvbkludmFsaWQsXHJcbiAgZGVzY3JpcHRpb25JbnB1dFJlZixcclxuICBkcmFmdEdhc3RvVHlwZSxcclxuICBnYXN0b1R5cGVJbnZhbGlkLFxyXG4gIGdhc3RvVHlwZUlucHV0UmVmLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGN1cnJlbmN5Q29kZUludmFsaWQsXHJcbiAgY3VycmVuY3lJbnB1dFJlZixcbiAgZHJhZnRUcmFuc0RhdGUsXG4gIGRyYWZ0VGlja2V0VGltZSxcbiAgZHJhZnRVcmxGaWxlLFxuICBkcmFmdEZpbGVOYW1lLFxyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlOiBzZXREcmFmdEdhc3RvVHlwZSxcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiBzZXREcmFmdEN1cnJlbmN5Q29kZSxcbiAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZTogc2V0RHJhZnRUcmFuc0RhdGUsXG4gIG9uRHJhZnRUaWNrZXRUaW1lQ2hhbmdlOiBzZXREcmFmdFRpY2tldFRpbWUsXG4gIG9uT3BlbkZpbGU6IG9wZW5GaWxlLFxuICBvbk9wZW5FeHBlbnNlU2hlZXQ6IGlzRnJvbVNoZWV0TGluayA/IHVuZGVmaW5lZCA6IGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQsXHJcbiAgdmlzaWJsZUxpbmVzLFxyXG4gIHRvdGFsTGluZVBhZ2VzLFxyXG4gIGxpbmVQYWdlLFxyXG4gIGN1cnJlbmN5Q29kZTogc2FmZUN1cnJlbmN5Q29kZSxcclxuICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gIGNvbnRhaW5lclJlZjogbGluZUNvbnRhaW5lclJlZixcclxuICBvbkxpbmVQYWdlQ2hhbmdlOiBzZXRMaW5lUGFnZSxcclxuICBvbk9wZW5MaW5lOiBvcGVuTGluZURldGFpbCxcclxuICBzdGF0dXMsXHJcbn0pO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3QXJncyA9IFBhcmFtZXRlcnM8dHlwZW9mIGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbE1vZGFsVmlldz5bMF07XHJcbnR5cGUgRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3QXJncyA9IFBhcmFtZXRlcnM8dHlwZW9mIGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3PlswXTtcclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXdBcmdzID0gUGFyYW1ldGVyczx0eXBlb2YgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXc+WzBdO1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUGFnZVZpZXdNb2RlbCA9ICh7XHJcbiAgbW9kYWxBcmdzLFxyXG4gIHByZXZpZXdBcmdzLFxyXG4gIGNvbnRlbnRBcmdzLFxyXG59OiB7XHJcbiAgbW9kYWxBcmdzOiBFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3QXJncztcclxuICBwcmV2aWV3QXJnczogRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3QXJncztcclxuICBjb250ZW50QXJnczogRXhwZW5zZVRpY2tldERldGFpbENvbnRlbnRWaWV3QXJncztcclxufSkgPT4gKHtcclxuICBtb2RhbDogYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3KG1vZGFsQXJncyksXHJcbiAgcHJldmlldzogYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1ZpZXcocHJldmlld0FyZ3MpLFxyXG4gIGNvbnRlbnQ6IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbENvbnRlbnRWaWV3KGNvbnRlbnRBcmdzKSxcclxufSk7XHJcblxyXG4vLyBLZWVwcyBmaWx0ZXIgY2FjaGUgd2lyaW5nIGFuZCBiYWNrIG5hdmlnYXRpb24gb3V0c2lkZSB0aGUgcGFnZSBjb250YWluZXIgYm9keS5cclxuY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbE5hdmlnYXRpb25TdGF0ZSA9ICh7XHJcbiAgZmlsZUlkLFxyXG4gIGRldGFpbE9yaWdpbixcclxuICBoZWFkZXJUcmFuc0RhdGUsXHJcbiAgY29udGV4dExpbmVSZWNJZCxcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG59OiB7XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgZGV0YWlsT3JpZ2luOiBzdHJpbmc7XHJcbiAgaGVhZGVyVHJhbnNEYXRlOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xyXG4gIGNvbnRleHRMaW5lUmVjSWQ6IHN0cmluZztcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0OiBSZXR1cm5UeXBlPHR5cGVvZiB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0PltcInRpY2tldFJldHVybkNvbnRleHRcIl07XHJcbn0pID0+IHtcclxuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgc2F2ZUNhY2hlZFN0YXRlLCBtYXJrUmVzZXRGaWx0ZXJzUmV0dXJuLCBjbGVhckNhY2hlZFN0YXRlIH0gPSB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlKCk7XHJcblxyXG4gIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxCYWNrTmF2aWdhdGlvbih7XHJcbiAgICBmaWxlSWQsXHJcbiAgICBkZXRhaWxPcmlnaW4sXHJcbiAgICBoZWFkZXJUcmFuc0RhdGUsXHJcbiAgICBjb250ZXh0TGluZVJlY0lkLFxyXG4gICAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxuICAgIHJlYWRDYWNoZWRTdGF0ZSxcclxuICAgIHNhdmVDYWNoZWRTdGF0ZSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG1hcmtSZXNldEZpbHRlcnNSZXR1cm4sXHJcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBSdW5zIHRoZSBvbmUtc2hvdCBhdXRvIGVkaXQgdHJhbnNpdGlvbiBmb3IgbGlua2VkIGNvbnRleHRzIGFmdGVyIGRldGFpbCBkYXRhIGlzIHJlYWR5LlxyXG5jb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQXV0b0VkaXQgPSAoe1xyXG4gIGF1dG9FZGl0TW9kZSxcclxuICBpc0Zyb21TaGVldExpbmssXHJcbiAgaXNMb2FkaW5nLFxyXG4gIGhlYWRlcixcclxuICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gIGNhbkF0dGVtcHRBdXRvRWRpdCxcclxufToge1xyXG4gIGF1dG9FZGl0TW9kZTogYm9vbGVhbjtcclxuICBpc0Zyb21TaGVldExpbms6IGJvb2xlYW47XHJcbiAgaXNMb2FkaW5nOiBib29sZWFuO1xyXG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw7XHJcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcclxuICBjYW5BdHRlbXB0QXV0b0VkaXQ6IGJvb2xlYW47XHJcbn0pID0+IHtcclxuICBjb25zdCBhdXRvRWRpdEF0dGVtcHRlZFJlZiA9IHVzZVJlZihmYWxzZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWF1dG9FZGl0TW9kZSB8fCBpc0Zyb21TaGVldExpbmsgfHwgYXV0b0VkaXRBdHRlbXB0ZWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgaWYgKGlzTG9hZGluZyB8fCAhaGVhZGVyIHx8ICFjYW5BdHRlbXB0QXV0b0VkaXQpIHJldHVybjtcclxuXHJcbiAgICBhdXRvRWRpdEF0dGVtcHRlZFJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQoKTtcclxuICB9LCBbYXV0b0VkaXRNb2RlLCBjYW5BdHRlbXB0QXV0b0VkaXQsIGhhbmRsZUVuYWJsZUVkaXQsIGhlYWRlciwgaXNGcm9tU2hlZXRMaW5rLCBpc0xvYWRpbmddKTtcclxufTtcclxuXHJcbi8vIFJlc29sdmVzIHBlcm1pc3Npb24gYW5kIGFjdGluZy11c2VyIHN0YXRlIHNvIHRoZSBwYWdlIGNvbnRhaW5lciBzdGF5cyBmb2N1c2VkIG9uIG9yY2hlc3RyYXRpb24uXHJcbmNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQZXJtaXNzaW9uU3RhdGUgPSAoKSA9PiB7XHJcbiAgY29uc3Qge1xyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gIH0gPSB1c2VBdXRoQ29udGV4dCgpO1xyXG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiVmlld1wiKTtcclxuICBjb25zdCBjYW5FZGl0VGlja2V0QnlNb2R1bGUgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIkVkaXRcIik7XHJcbiAgY29uc3QgY2FuRGVsZXRlVGlja2V0QnlNb2R1bGUgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIkZ1bGxBY2Nlc3NcIik7XHJcbiAgY29uc3QgaXNNYW5hZ2luZ090aGVyVXNlciA9IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VVc2VyKHtcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBjYW5FZGl0VGlja2V0OiBjYW5FZGl0VGlja2V0QnlNb2R1bGUgJiYgIWlzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICBjYW5EZWxldGVUaWNrZXQ6IGNhbkRlbGV0ZVRpY2tldEJ5TW9kdWxlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gT3ducyB0aGUgdGlja2V0IGRldGFpbCBwYWdlIG9yY2hlc3RyYXRpb24gd2hpbGUgdGhlIGNvbXBvbmVudCBzdGF5cyB0aGluIGZvciByZW5kZXJpbmcuXHJcbmNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQYWdlVmlld01vZGVsID0gKCkgPT4ge1xyXG4gIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfVElDS0VUX0ZJTEVfSURfXyk7XHJcbiAgY29uc3QgbGluZUNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHtcclxuICAgIGF1dG9FZGl0TW9kZSxcclxuICAgIGRldGFpbE9yaWdpbixcclxuICAgIGNvbnRleHRTaGVldElkLFxyXG4gICAgY29udGV4dExpbmVSZWNJZCxcclxuICAgIGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSxcclxuICAgIGlzRnJvbUV4cGVuc2VMaW5lLFxyXG4gICAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gICAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxuICB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbFJvdXRlQ29udGV4dCgpO1xyXG4gIGNvbnN0IHtcclxuICAgIGhhc0FjY2VzcyxcclxuICAgIGNhbkVkaXRUaWNrZXQsXHJcbiAgICBjYW5EZWxldGVUaWNrZXQsXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQZXJtaXNzaW9uU3RhdGUoKTtcclxuICBjb25zdCBnYXN0b1R5cGVPcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KCgpID0+IHtcclxuICAgIGNvbnN0IHNvdXJjZSA9IEFycmF5LmlzQXJyYXkod2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fKSA/IHdpbmRvdy5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXyA6IFtdO1xyXG4gICAgY29uc3QgbWFwcGVkID0gbWFwV2luZG93RW51bU9wdGlvbnMoc291cmNlKS5maWx0ZXIoKGVudHJ5KSA9PiB7XHJcbiAgICAgIGNvbnN0IHBhcnNlZCA9IE51bWJlcihlbnRyeS52YWx1ZSk7XHJcbiAgICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgQUxMT1dFRF9HQVNUT19UWVBFUy5oYXMocGFyc2VkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChtYXBwZWQubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gbWFwcGVkLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiBOdW1iZXIobGVmdC52YWx1ZSkgLSBOdW1iZXIocmlnaHQudmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYnVpbGRGYWxsYmFja0dhc3RvVHlwZU9wdGlvbnMoKTtcclxuICB9LCBbXSk7XHJcbiAgY29uc3QgZ2FzdG9UeXBlTGFiZWxNYXAgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XHJcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBnYXN0b1R5cGVPcHRpb25zKSB7XHJcbiAgICAgIG1hcC5zZXQoU3RyaW5nKG9wdGlvbi52YWx1ZSksIG9wdGlvbi50ZXh0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBtYXA7XHJcbiAgfSwgW2dhc3RvVHlwZU9wdGlvbnNdKTtcclxuICBjb25zdCB7IGhlYWRlciwgbGluZXMsIGlzTG9hZGluZywgZXJyb3JNZXNzYWdlLCByZWxvYWREZXRhaWwgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZSh7XHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBmaWxlSWQsXHJcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICB9KTtcclxuICBjb25zdCBsaW5rZWRFeHBlbnNlU2hlZXRJZCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBzYWZlVGV4dCh0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkIHx8IGNvbnRleHRTaGVldElkIHx8IGhlYWRlcj8uaG9qYUdhc3Rvc0lkRGlzcGxheSksXHJcbiAgICBbY29udGV4dFNoZWV0SWQsIGhlYWRlcj8uaG9qYUdhc3Rvc0lkRGlzcGxheSwgdGlja2V0UmV0dXJuQ29udGV4dF1cclxuICApO1xyXG4gIGNvbnN0IHtcclxuICAgIGxpbmtTaGVldExvY2tlZCxcclxuICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlLFxyXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZSh7XHJcbiAgICBpc0xpbmtNb2RlOiAhIWxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gICAgbGlua1NoZWV0SWQ6IGxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gICAgY2FuUHJvY2Vzc0xpbmtNb2RlOiB0cnVlLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgcmVzb2x2ZUJsb2NrZWRNZXNzYWdlOiByZXNvbHZlTGlua2VkVGlja2V0QmxvY2tlZE1lc3NhZ2UsXHJcbiAgfSk7XHJcbiAgY29uc3QgW3NoZWV0U3luY0Jsb2NrZWQsIHNldFNoZWV0U3luY0Jsb2NrZWRdID0gdXNlU3RhdGUoKCkgPT4gISFyZWFkRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKGZpbGVJZCkpO1xyXG4gIGNvbnN0IFtzaGVldFN5bmNCbG9ja2VkTWVzc2FnZSwgc2V0U2hlZXRTeW5jQmxvY2tlZE1lc3NhZ2VdID0gdXNlU3RhdGUoKCkgPT5cclxuICAgIHNhZmVUZXh0KHJlYWRFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoZmlsZUlkKT8ubWVzc2FnZSlcclxuICApO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgc3luY1N0YXRlID0gcmVhZEV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZShmaWxlSWQpO1xyXG4gICAgc2V0U2hlZXRTeW5jQmxvY2tlZCghIXN5bmNTdGF0ZSk7XHJcbiAgICBzZXRTaGVldFN5bmNCbG9ja2VkTWVzc2FnZShzYWZlVGV4dChzeW5jU3RhdGU/Lm1lc3NhZ2UpKTtcclxuICB9LCBbZmlsZUlkXSk7XHJcblxyXG4gIGNvbnN0IHBlbmRpbmdGaXJzdExpbmsgPVxyXG4gICAgZGV0YWlsT3JpZ2luID09PSBcInNoZWV0LWNyZWF0ZVwiICYmICEhc2FmZVRleHQodGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCB8fCBjb250ZXh0U2hlZXRJZCkgJiYgIXNhZmVUZXh0KGhlYWRlcj8uaG9qYUdhc3Rvc0lkRGlzcGxheSk7XHJcbiAgY29uc3Qgc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSA9IHBlbmRpbmdGaXJzdExpbmtcclxuICAgID8gaW5kVChcIkV4cGVuc2VUaWNrZXRzX1NoZWV0U3luY19QZW5kaW5nU2F2ZVJlcXVpcmVkXCIsIFwiU2F2ZSB0aGUgdGlja2V0IGJlZm9yZSBsZWF2aW5nIHRoaXMgZmxvdy5cIilcclxuICAgIDogc2hlZXRTeW5jQmxvY2tlZE1lc3NhZ2UgfHxcclxuICAgICAgaW5kVChcclxuICAgICAgICBcIkV4cGVuc2VUaWNrZXRzX1NoZWV0U3luY19SZXRyeVJlcXVpcmVkXCIsXHJcbiAgICAgICAgXCJUaWNrZXQgZGF0YSBjaGFuZ2VkLCBidXQgd2UgY291bGQgbm90IHN5bmMgdGhlIGV4cGVuc2UgbGluZS4gU2F2ZSBhZ2FpbiBiZWZvcmUgbGVhdmluZy5cIlxyXG4gICAgICApO1xyXG4gIGNvbnN0IHNob3VsZEJsb2NrV29ya2Zsb3dFeGl0ID0gcGVuZGluZ0ZpcnN0TGluayB8fCBzaGVldFN5bmNCbG9ja2VkO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFzaG91bGRCbG9ja1dvcmtmbG93RXhpdCkge1xyXG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoe1xyXG4gICAgICBhY3RpdmU6IHRydWUsXHJcbiAgICAgIG1lc3NhZ2U6IHNoZWV0V29ya2Zsb3dCbG9ja01lc3NhZ2UsXHJcbiAgICAgIGJsb2NrOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcclxuICAgIH07XHJcbiAgfSwgW3NoZWV0V29ya2Zsb3dCbG9ja01lc3NhZ2UsIHNob3VsZEJsb2NrV29ya2Zsb3dFeGl0XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBiYWNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxCYWNrQnRuXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcclxuICAgIGlmICghYmFja0J1dHRvbikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHByZXZpb3VzRGlzYWJsZWQgPSBiYWNrQnV0dG9uLmRpc2FibGVkO1xyXG4gICAgaWYgKHBlbmRpbmdGaXJzdExpbmspIHtcclxuICAgICAgYmFja0J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgIGJhY2tCdXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCBcInRydWVcIik7XHJcbiAgICB9IGVsc2UgaWYgKCFwcmV2aW91c0Rpc2FibGVkKSB7XHJcbiAgICAgIGJhY2tCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgYmFja0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIFwiZmFsc2VcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgYmFja0J1dHRvbi5kaXNhYmxlZCA9IHByZXZpb3VzRGlzYWJsZWQ7XHJcbiAgICAgIGJhY2tCdXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCBwcmV2aW91c0Rpc2FibGVkID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIpO1xyXG4gICAgfTtcclxuICB9LCBbcGVuZGluZ0ZpcnN0TGlua10pO1xyXG5cclxuICBjb25zdCB7IG1hcmtSZXNldEZpbHRlcnNSZXR1cm4sIGNsZWFyQ2FjaGVkU3RhdGUgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxOYXZpZ2F0aW9uU3RhdGUoe1xyXG4gICAgZmlsZUlkLFxyXG4gICAgZGV0YWlsT3JpZ2luLFxyXG4gICAgaGVhZGVyVHJhbnNEYXRlOiBoZWFkZXI/LnRyYW5zRGF0ZSxcclxuICAgIGNvbnRleHRMaW5lUmVjSWQsXHJcbiAgICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIH0pO1xyXG4gIGNvbnN0IGNhbkVkaXRMaW5rZWRUaWNrZXQgPSAhbGlua2VkRXhwZW5zZVNoZWV0SWQgfHwgKCFsaW5rU2hlZXRDaGVja0J1c3kgJiYgIWxpbmtTaGVldExvY2tlZCk7XHJcbiAgY29uc3QgYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCA9IGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSB8fCAoISFsaW5rZWRFeHBlbnNlU2hlZXRJZCAmJiBjYW5FZGl0TGlua2VkVGlja2V0KTtcclxuICBjb25zdCB7XHJcbiAgICBidXN5LFxyXG4gICAgc3RhdHVzLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxFcnJvcixcclxuICAgIGxpbmVQYWdlLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICAgIGRlc2NyaXB0aW9uSW5wdXRSZWYsXHJcbiAgICBkcmFmdEdhc3RvVHlwZSxcclxuICAgIGdhc3RvVHlwZUludmFsaWQsXHJcbiAgICBnYXN0b1R5cGVJbnB1dFJlZixcclxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgY3VycmVuY3lDb2RlSW52YWxpZCxcbiAgICBjdXJyZW5jeUlucHV0UmVmLFxuICAgIGRyYWZ0VHJhbnNEYXRlLFxuICAgIGRyYWZ0VGlja2V0VGltZSxcbiAgICBkcmFmdENvbWVudGFyaW8sXG4gICAgZHJhZnRVcmxGaWxlLFxuICAgIGRyYWZ0RmlsZU5hbWUsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldExpbmVQYWdlLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgIHNldERyYWZ0R2FzdG9UeXBlLFxyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgc2V0RHJhZnRUcmFuc0RhdGUsXG4gICAgc2V0RHJhZnRUaWNrZXRUaW1lLFxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbEVkaXRvcih7XHJcbiAgICBoZWFkZXIsXHJcbiAgICBsaW5lQ291bnQ6IGxpbmVzLmxlbmd0aCxcclxuICAgIHBhZ2VTaXplOiBMSU5FU19QQUdFX1NJWkUsXHJcbiAgICBjYW5FZGl0VGlja2V0OiBjYW5FZGl0VGlja2V0ICYmIGNhbkVkaXRMaW5rZWRUaWNrZXQsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0LFxyXG4gICAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXHJcbiAgfSk7XHJcbiAgY29uc3QgaGFuZGxlRW5hYmxlRWRpdEluQ29udGV4dCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChsaW5rU2hlZXRDaGVja0J1c3kpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsaW5rZWRFeHBlbnNlU2hlZXRJZCAmJiBsaW5rU2hlZXRMb2NrZWQpIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9XHJcbiAgICAgICAgc2FmZVRleHQobGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UpIHx8XHJcbiAgICAgICAgcmVzb2x2ZUxpbmtlZFRpY2tldEJsb2NrZWRNZXNzYWdlKGZhbHNlKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCgpO1xyXG4gIH0sIFtcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZSxcclxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcclxuICAgIGxpbmtTaGVldExvY2tlZCxcclxuICAgIGxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFN0YXR1cyxcclxuICBdKTtcclxuICBjb25zdCB7IHBhZ2luYXRpb25MYWJlbHMsIHByZXZpZXdBbHRUZXh0LCBzdGF0dXNMYWJlbCwgZ2FzdG9UeXBlTGFiZWwsIHRvdGFsQW1vdW50VGV4dCwgdHJhbnNEYXRlVGV4dCwgdGlja2V0VGltZVRleHQgfSA9XG4gICAgdXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXkoe1xuICAgICAgaGVhZGVyLFxuICAgICAgZHJhZnRHYXN0b1R5cGUsXG4gICAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICAgIGRyYWZ0VHJhbnNEYXRlLFxuICAgICAgZHJhZnRUaWNrZXRUaW1lLFxuICAgICAgZHJhZnRGaWxlTmFtZSxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIGdhc3RvVHlwZUxhYmVsTWFwLFxyXG4gICAgfSk7XHJcbiAgY29uc3Qge1xyXG4gICAgc2hvd1N0aWNreVByZXZpZXcsXHJcbiAgICBwcmV2aWV3T3BlbixcclxuICAgIHByZXZpZXdCdXN5LFxyXG4gICAgcHJldmlld0Vycm9yLFxyXG4gICAgcHJldmlld0ltYWdlVXJsLFxyXG4gICAgcHJldmlld1NjYWxlLFxyXG4gICAgcHJldmlld1RyYW5zbGF0ZSxcclxuICAgIHByZXZpZXdTdXJmYWNlUmVmLFxyXG4gICAgb3BlblByZXZpZXcsXHJcbiAgICBjbG9zZVByZXZpZXcsXHJcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24sXHJcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXHJcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxuICAgIGhhbmRsZVByZXZpZXdXaGVlbCxcclxuICB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdQYW5lbCh7XHJcbiAgICBmaWxlSWQsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBkcmFmdFVybEZpbGUsXHJcbiAgICBoZWFkZXJVcmxGaWxlOiBoZWFkZXI/LnVybEZpbGUsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHZpc2libGVMaW5lcyA9IHVzZU1lbW8oKCkgPT4gcGFnZWRTbGljZShsaW5lcywgbGluZVBhZ2UsIExJTkVTX1BBR0VfU0laRSksIFtsaW5lUGFnZSwgbGluZXNdKTtcclxuICBjb25zdCB0b3RhbExpbmVQYWdlcyA9IE1hdGguY2VpbCgobGluZXMubGVuZ3RoIHx8IDApIC8gTElORVNfUEFHRV9TSVpFKTtcclxuXHJcbiAgdXNlRXhwZW5zZVRpY2tldERldGFpbEF1dG9FZGl0KHtcclxuICAgIGF1dG9FZGl0TW9kZSxcclxuICAgIGlzRnJvbVNoZWV0TGluayxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGhlYWRlcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQ6IGhhbmRsZUVuYWJsZUVkaXRJbkNvbnRleHQsXHJcbiAgICBjYW5BdHRlbXB0QXV0b0VkaXQ6ICFsaW5rU2hlZXRDaGVja0J1c3ksXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHsgaGFuZGxlVXBkYXRlLCBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQsIGhhbmRsZURlbGV0ZSB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9ucyh7XHJcbiAgICBidXN5LFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgY2FuRWRpdFRpY2tldDogY2FuRWRpdFRpY2tldCAmJiBjYW5FZGl0TGlua2VkVGlja2V0LFxyXG4gICAgY2FuRGVsZXRlVGlja2V0OiBjYW5EZWxldGVUaWNrZXQgJiYgY2FuRWRpdExpbmtlZFRpY2tldCxcclxuICAgIGZpbGVJZCxcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdEdhc3RvVHlwZSxcclxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0VHJhbnNEYXRlLFxuICAgIGRyYWZ0VGlja2V0VGltZSxcbiAgICBkcmFmdENvbWVudGFyaW8sXG4gICAgZHJhZnRVcmxGaWxlLFxyXG4gICAgZHJhZnRGaWxlTmFtZSxcclxuICAgIGxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gICAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0OiBpc0Zyb21FeHBlbnNlTGluZSAmJiBsaW5rZWRFeHBlbnNlU2hlZXRJZCAmJiBjb250ZXh0TGluZVJlY0lkXHJcbiAgICAgID8ge1xyXG4gICAgICAgICAgc2hlZXRJZDogbGlua2VkRXhwZW5zZVNoZWV0SWQsXHJcbiAgICAgICAgICBsaW5lUmVjSWQ6IGNvbnRleHRMaW5lUmVjSWQsXHJcbiAgICAgICAgfVxyXG4gICAgICA6IG51bGwsXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICBvbkxpbmtlZFNoZWV0U3luY0ZhaWx1cmU6IChtZXNzYWdlKSA9PiB7XHJcbiAgICAgIHNldFNoZWV0U3luY0Jsb2NrZWQodHJ1ZSk7XHJcbiAgICAgIHNldFNoZWV0U3luY0Jsb2NrZWRNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICB9LFxyXG4gICAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgIHNldFNoZWV0U3luY0Jsb2NrZWQoZmFsc2UpO1xyXG4gICAgICBzZXRTaGVldFN5bmNCbG9ja2VkTWVzc2FnZShcIlwiKTtcclxuICAgIH0sXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgbW9kYWxMb2FkaW5nVGV4dCwgbW9kYWxDYW5jZWxUZXh0LCBtb2RhbENvbmZpcm1UZXh0LCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gfSA9XHJcbiAgICB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQ29uZmlybVN0YXRlKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgbW9kYWxFcnJvcixcclxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgfSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXNoZWV0U3luY0Jsb2NrZWQgfHwgYnVzeSkgcmV0dXJuO1xyXG4gICAgaWYgKCFzaGVldFdvcmtmbG93QmxvY2tNZXNzYWdlKSByZXR1cm47XHJcbiAgICBpZiAoc3RhdHVzID09PSBzaGVldFdvcmtmbG93QmxvY2tNZXNzYWdlKSByZXR1cm47XHJcbiAgICBzZXRTdGF0dXMoc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSk7XHJcbiAgfSwgW2J1c3ksIHNldFN0YXR1cywgc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSwgc2hlZXRTeW5jQmxvY2tlZCwgc3RhdHVzXSk7XHJcblxyXG4gIGNvbnN0IGlzQXNzaWduZWRUaWNrZXQgPSBoZWFkZXI/LnN0YXR1cyA9PT0gMTtcclxuICBjb25zdCBpc0NvbnRleHRMb2NrZWQgPSAoaXNBc3NpZ25lZFRpY2tldCAmJiAhYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCkgfHwgKCEhbGlua2VkRXhwZW5zZVNoZWV0SWQgJiYgbGlua1NoZWV0TG9ja2VkKTtcclxuICBjb25zdCBjYW5FZGl0VGlja2V0SW5Db250ZXh0ID0gY2FuRWRpdFRpY2tldCAmJiBjYW5FZGl0TGlua2VkVGlja2V0ICYmICFpc0Zyb21TaGVldExpbms7XHJcbiAgY29uc3QgY2FuQ3JlYXRlVGlja2V0TGluZUluQ29udGV4dCA9IGNhbkVkaXRUaWNrZXRJbkNvbnRleHQgJiYgIWlzQ29udGV4dExvY2tlZCAmJiAhc2hlZXRTeW5jQmxvY2tlZDtcclxuICBjb25zdCBjYW5EZWxldGVUaWNrZXRJbkNvbnRleHQgPSBjYW5EZWxldGVUaWNrZXQgJiYgY2FuRWRpdExpbmtlZFRpY2tldCAmJiAhaXNGcm9tU2hlZXRMaW5rO1xyXG4gIGNvbnN0IHRpY2tldFRvcGJhckFjdGlvbk1vZGU6IFwiZGVmYXVsdFwiIHwgXCJzYXZlX29ubHlcIiB8IFwidmlld19vbmx5XCIgPVxyXG4gICAgcGVuZGluZ0ZpcnN0TGluayAmJiBpc0VkaXRpbmdcclxuICAgICAgPyBcInNhdmVfb25seVwiXHJcbiAgICAgIDogIWNhbkVkaXRUaWNrZXRJbkNvbnRleHQgJiYgIWNhbkRlbGV0ZVRpY2tldEluQ29udGV4dFxyXG4gICAgICAgID8gXCJ2aWV3X29ubHlcIlxyXG4gICAgICAgIDogXCJkZWZhdWx0XCI7XHJcblxyXG4gIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zKHtcclxuICAgIGJ1c3ksXHJcbiAgICBtb2RhbE9wZW46IG1vZGFsLm9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0xvY2tlZDogaXNDb250ZXh0TG9ja2VkLFxyXG4gICAgYWN0aW9uTW9kZTogdGlja2V0VG9wYmFyQWN0aW9uTW9kZSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHk6IG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICAgIGNhbkVkaXRUaWNrZXQ6IGNhbkVkaXRUaWNrZXRJbkNvbnRleHQsXHJcbiAgICBjYW5EZWxldGVUaWNrZXQ6IGNhbkRlbGV0ZVRpY2tldEluQ29udGV4dCxcclxuICAgIGZpbGVJZCxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0OiBoYW5kbGVFbmFibGVFZGl0SW5Db250ZXh0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICAgIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgaWYgKChpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUgfHwgaXNGcm9tRXhwZW5zZUxpbmUpICYmIGxpbmtlZEV4cGVuc2VTaGVldElkKSB7XHJcbiAgICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xyXG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsKGxpbmtlZEV4cGVuc2VTaGVldElkKSwge1xyXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdm9pZCByZWxvYWREZXRhaWwoKTtcclxuICAgIH0sXHJcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgaWYgKHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQpIHtcclxuICAgICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XHJcbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwodGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkKSwge1xyXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbWFya1Jlc2V0RmlsdGVyc1JldHVybigpO1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvVGlja2V0c1wiLCB7XHJcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBvcGVuQ3JlYXRlTGluZURldGFpbCwgb3BlbkxpbmVEZXRhaWwsIHJlc29sdmVDbGlja2FibGVDYXJkLCBvcGVuRmlsZSwgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCB9ID1cclxuICAgIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMoe1xyXG4gICAgYnVzeSxcclxuICAgIGZpbGVJZCxcclxuICAgIGNvbnRleHRTaGVldElkOiBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICAgIGlzRnJvbVNoZWV0TGluayxcclxuICAgIGhlYWRlckV4cGVuc2VTaGVldElkOiBzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZERpc3BsYXkpLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlUGVyc2lzdEhlYWRlckRyYWZ0LFxyXG4gICAgYnlwYXNzV29ya2Zsb3dHdWFyZDogc2hvdWxkQmxvY2tXb3JrZmxvd0V4aXQsXHJcbiAgICBsaW5lQ29udGFpbmVyUmVmLFxyXG4gICAgb3BlblByZXZpZXcsXHJcbiAgICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIH0pO1xyXG5cclxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcclxuICAgIGNvbnRhaW5lclJlZjogbGluZUNvbnRhaW5lclJlZixcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGl0ZW1zOiB2aXNpYmxlTGluZXMsXHJcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZGV0YWlsVmlldyA9IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbFBhZ2VWaWV3TW9kZWwoe1xyXG4gICAgbW9kYWxBcmdzOiB7XHJcbiAgICAgIG1vZGFsLFxyXG4gICAgICBtb2RhbENvbmZpcm1UZXh0LFxyXG4gICAgICBtb2RhbENhbmNlbFRleHQsXHJcbiAgICAgIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG1vZGFsRXJyb3IsXHJcbiAgICAgIHN0YXR1cyxcclxuICAgICAgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtLFxyXG4gICAgICBjbG9zZUNvbmZpcm0sXHJcbiAgICB9LFxyXG4gICAgcHJldmlld0FyZ3M6IHtcclxuICAgICAgcHJldmlld09wZW4sXHJcbiAgICAgIHByZXZpZXdCdXN5LFxyXG4gICAgICBwcmV2aWV3RXJyb3IsXHJcbiAgICAgIHByZXZpZXdJbWFnZVVybCxcclxuICAgICAgcHJldmlld0FsdFRleHQsXHJcbiAgICAgIHByZXZpZXdTY2FsZSxcclxuICAgICAgcHJldmlld1RyYW5zbGF0ZSxcclxuICAgICAgcHJldmlld1N1cmZhY2VSZWYsXHJcbiAgICAgIGNsb3NlUHJldmlldyxcclxuICAgICAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gICAgICBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXHJcbiAgICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kLFxyXG4gICAgICBoYW5kbGVQcmV2aWV3V2hlZWwsXHJcbiAgICB9LFxyXG4gICAgY29udGVudEFyZ3M6IHtcclxuICAgICAgaXNMb2FkaW5nLFxyXG4gICAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICAgIGhlYWRlcixcclxuICAgICAgc2hvd1N0aWNreVByZXZpZXcsXHJcbiAgICAgIHByZXZpZXdCdXN5LFxyXG4gICAgICBwcmV2aWV3RXJyb3IsXHJcbiAgICAgIHByZXZpZXdJbWFnZVVybCxcclxuICAgICAgcHJldmlld0FsdFRleHQsXHJcbiAgICAgIG9wZW5GaWxlLFxyXG4gICAgICBzdGF0dXNMYWJlbCxcclxuICAgICAgZ2FzdG9UeXBlTGFiZWwsXHJcbiAgICAgIHRvdGFsQW1vdW50VGV4dCxcbiAgICAgIHRyYW5zRGF0ZVRleHQsXG4gICAgICB0aWNrZXRUaW1lVGV4dCxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIGdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICAgIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICAgICAgZGVzY3JpcHRpb25JbnB1dFJlZixcclxuICAgICAgZHJhZnRHYXN0b1R5cGUsXHJcbiAgICAgIGdhc3RvVHlwZUludmFsaWQsXHJcbiAgICAgIGdhc3RvVHlwZUlucHV0UmVmLFxyXG4gICAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgICAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICAgICAgY3VycmVuY3lJbnB1dFJlZixcbiAgICAgIGRyYWZ0VHJhbnNEYXRlLFxuICAgICAgZHJhZnRUaWNrZXRUaW1lLFxuICAgICAgZHJhZnRVcmxGaWxlLFxuICAgICAgZHJhZnRGaWxlTmFtZSxcclxuICAgICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgICAgc2V0RHJhZnRHYXN0b1R5cGUsXHJcbiAgICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxuICAgICAgc2V0RHJhZnRUcmFuc0RhdGUsXG4gICAgICBzZXREcmFmdFRpY2tldFRpbWUsXG4gICAgICBpc0Zyb21TaGVldExpbmssXG4gICAgICBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0LFxyXG4gICAgICB2aXNpYmxlTGluZXMsXHJcbiAgICAgIHRvdGFsTGluZVBhZ2VzLFxyXG4gICAgICBsaW5lUGFnZSxcclxuICAgICAgc2FmZUN1cnJlbmN5Q29kZTogaXNFZGl0aW5nID8gZHJhZnRDdXJyZW5jeUNvZGUgOiBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSksXHJcbiAgICAgIHBhZ2luYXRpb25MYWJlbHMsXHJcbiAgICAgIGxpbmVDb250YWluZXJSZWYsXHJcbiAgICAgIHNldExpbmVQYWdlLFxyXG4gICAgICBvcGVuTGluZURldGFpbCxcclxuICAgICAgc3RhdHVzLFxyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLmRldGFpbFZpZXcsXHJcbiAgICBjYW5TaG93Q3JlYXRlTGluZUZhYjogY2FuQ3JlYXRlVGlja2V0TGluZUluQ29udGV4dCAmJiAhaXNMb2FkaW5nICYmICFlcnJvck1lc3NhZ2UgJiYgISFzYWZlVGV4dChmaWxlSWQpICYmICEhaGVhZGVyLFxyXG4gICAgaXNDcmVhdGVMaW5lRmFiRGlzYWJsZWQ6IGJ1c3kgfHwgIWhlYWRlcixcclxuICAgIG9wZW5DcmVhdGVMaW5lRGV0YWlsLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBFeHBlbnNlVGlja2V0RGV0YWlsUGFnZUNvbnRlbnQgPSAoKSA9PiB7XHJcbiAgY29uc3QgZGV0YWlsVmlldyA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQYWdlVmlld01vZGVsKCk7XHJcbiAgY29uc3QgZmFiTWVudUl0ZW1zID0gdXNlTWVtbzxGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW10+KFxyXG4gICAgKCkgPT4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IFwibmV3LXRpY2tldC1saW5lXCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9OZXdMaW5lXCIsIFwiTnVldmEgTGluZWFcIiksXHJcbiAgICAgICAgaWNvbjogPE5ld0xpbmVJY29uIC8+LFxyXG4gICAgICAgIG9uQ2xpY2s6ICgpID0+IHtcclxuICAgICAgICAgIHZvaWQgZGV0YWlsVmlldy5vcGVuQ3JlYXRlTGluZURldGFpbCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlzYWJsZWQ6IGRldGFpbFZpZXcuaXNDcmVhdGVMaW5lRmFiRGlzYWJsZWQsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgW2RldGFpbFZpZXddXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0RGV0YWlsVmlldyBtb2RhbD17ZGV0YWlsVmlldy5tb2RhbH0gcHJldmlldz17ZGV0YWlsVmlldy5wcmV2aWV3fSBjb250ZW50PXtkZXRhaWxWaWV3LmNvbnRlbnR9IC8+XHJcbiAgICAgIHtkZXRhaWxWaWV3LmNhblNob3dDcmVhdGVMaW5lRmFiID8gKFxyXG4gICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxyXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJhcGlkYXNcIil9XHJcbiAgICAgICAgICBzaXplPXs3Nn1cclxuICAgICAgICAgIHJpZ2h0PXsxNn1cclxuICAgICAgICAgIGJvdHRvbT17MjR9XHJcbiAgICAgICAgICBtZW51QXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJhcGlkYXNcIil9XHJcbiAgICAgICAgICBtZW51SXRlbXM9e2ZhYk1lbnVJdGVtc31cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvPlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2UgdGlja2V0IGRldGFpbC5cclxuY29uc3QgRXhwZW5zZVRpY2tldERldGFpbFBhZ2UgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cclxuICAgICAgPEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlQ29udGVudCAvPlxyXG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cclxuICApO1xyXG59O1xyXG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XHJcbiAgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGgoKTtcclxuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2UtdGlja2V0LWRldGFpbC1yb290XCIpO1xyXG4gIGlmICghcm9vdEVsKSByZXR1cm47XHJcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxFeHBlbnNlVGlja2V0RGV0YWlsUGFnZSAvPik7XHJcbn07XHJcblxyXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlO1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciwgRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgbWFwRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciwgbWFwRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlQXJncyA9IHtcclxuICBoYXNBY2Nlc3M6IGJvb2xlYW47XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBPd25zIHJlYWQgc3RhdGUgYW5kIEFQSSBsb2FkaW5nIGJlaGF2aW9yIGZvciB0aGUgdGlja2V0IGRldGFpbCBwYWdlLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlID0gKHsgaGFzQWNjZXNzLCBmaWxlSWQsIG9uRm9yYmlkZGVuIH06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZUFyZ3MpID0+IHtcclxuICBjb25zdCBbaGVhZGVyLCBzZXRIZWFkZXJdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtsaW5lcywgc2V0TGluZXNdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldERldGFpbExpbmVbXT4oW10pO1xyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCByZWxvYWREZXRhaWwgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoIWhhc0FjY2Vzcykge1xyXG4gICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2FmZUZpbGVJZCA9IHNhZmVUZXh0KGZpbGVJZCk7XHJcbiAgICBpZiAoIXNhZmVGaWxlSWQpIHtcclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJUaWNrZXRzX0RldGFpbF9Ob3RGb3VuZFwiLCBcIlRpY2tldCB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SXNMb2FkaW5nKHRydWUpO1xyXG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXQoc2FmZUZpbGVJZCwge1xyXG4gICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lk1lc3NhZ2UgfHwgaW5kVChcIlRpY2tldHNfRGV0YWlsX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldCBkZXRhaWwuXCIpKTtcclxuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xyXG4gICAgICBjb25zdCBzZWxlY3RlZCA9XHJcbiAgICAgICAgaXRlbXMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5Py5GaWxlSWQpLnRvVXBwZXJDYXNlKCkgPT09IHNhZmVGaWxlSWQudG9VcHBlckNhc2UoKSkgfHwgaXRlbXNbMF0gfHwgbnVsbDtcclxuXHJcbiAgICAgIGlmICghc2VsZWN0ZWQpIHtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIlRpY2tldHNfRGV0YWlsX05vdEZvdW5kXCIsIFwiVGlja2V0IHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbWFwcGVkSGVhZGVyID0gbWFwRXhwZW5zZVRpY2tldERldGFpbEhlYWRlcihzZWxlY3RlZCk7XHJcbiAgICAgIGNvbnN0IG1hcHBlZExpbmVzID0gKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWQuTGluZXMpID8gc2VsZWN0ZWQuTGluZXMgOiBbXSkubWFwKChsaW5lKSA9PlxyXG4gICAgICAgIG1hcEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lKGxpbmUpXHJcbiAgICAgICk7XHJcbiAgICAgIHNldEhlYWRlcihtYXBwZWRIZWFkZXIpO1xyXG4gICAgICBzZXRMaW5lcyhtYXBwZWRMaW5lcyk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldEVycm9yTWVzc2FnZShlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJUaWNrZXRzX0RldGFpbF9Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXQgZGV0YWlsLlwiKSk7XHJcbiAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbZmlsZUlkLCBoYXNBY2Nlc3MsIG9uRm9yYmlkZGVuXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICB2b2lkIHJlbG9hZERldGFpbCgpO1xyXG4gIH0sIFtyZWxvYWREZXRhaWxdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGhlYWRlcixcclxuICAgIGxpbmVzLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgcmVsb2FkRGV0YWlsLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCB9IGZyb20gXCIuLi8uLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbiB9IGZyb20gXCIuLi8uLi9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGRlbGV0ZUV4cGVuc2VTaGVldExpbmUsXHJcbiAgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0LFxyXG4gIGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldEZpbGUsXHJcbiAgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwsXHJcbiAgdXBkYXRlRXhwZW5zZVNoZWV0VGlja2V0LFxyXG59IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UsIHRvRXhwZW5zZUFwaURkTW1ZeXl5IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgc3luY0V4cGVuc2VMaW5rZWRUaWNrZXRTaGVldExpbmUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUxpbmtlZFRpY2tldFNoZWV0U3luYy50c1wiO1xyXG5pbXBvcnQgeyByZXNvbHZlRXhwZW5zZVNoZWV0RWRpdEFjY2VzcyB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlU2hlZXRFZGl0QWNjZXNzLnRzXCI7XHJcbmltcG9ydCB7IGNsZWFyRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlLCBzYXZlRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZS50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxudHlwZSBEZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQgPSB7XHJcbiAgc2hlZXRJZDogc3RyaW5nO1xyXG4gIGxpbmVSZWNJZDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBjYW5FZGl0VGlja2V0OiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZVRpY2tldDogYm9vbGVhbjtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcclxuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xuICBkcmFmdFRpY2tldFRpbWU6IHN0cmluZztcbiAgZHJhZnRDb21lbnRhcmlvOiBzdHJpbmc7XG4gIGRyYWZ0VXJsRmlsZTogc3RyaW5nO1xyXG4gIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcclxuICBsaW5rZWRFeHBlbnNlU2hlZXRJZD86IHN0cmluZztcclxuICBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQ/OiBEZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQgfCBudWxsO1xyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGJvb2xlYW47XHJcbiAgY2FuTWFuYWdlT3RoZXJVc2VyczogYm9vbGVhbjtcclxuICBjdXJyZW50QXhVc2VySWQ6IHN0cmluZztcclxuICBjdXJyZW50Q3JtVXNlcklkOiBzdHJpbmc7XHJcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkOiBzdHJpbmc7XHJcbiAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlPzogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkxpbmtlZFNoZWV0U3luY1N1Y2Nlc3M/OiAoKSA9PiB2b2lkO1xyXG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxuICBzZXRTdGF0dXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG59O1xyXG5cclxuY29uc3QgUkVRVUlSRURfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XHJcblxyXG5jb25zdCBwYXJzZU9wdGlvbmFsSW50ZWdlciA9IChyYXc6IHN0cmluZyk6IG51bWJlciB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3IHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlci5wYXJzZUludCh2YWx1ZSwgMTApO1xyXG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgPyBwYXJzZWQgOiB1bmRlZmluZWQ7XHJcbn07XHJcblxyXG4vLyBUcmllcyB0byBpbmZlciBhIHNhZmUgZXh0ZW5zaW9uIGZvciB1cGRhdGUgcGF5bG9hZCBmcm9tIGZpbGUgbmFtZSBvciBVUkwuXHJcbmNvbnN0IHJlc29sdmVUaWNrZXRGaWxlRXh0ZW5zaW9uID0gKGZpbGVOYW1lOiBzdHJpbmcsIHVybEZpbGU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgY29uc3Qgc291cmNlID0gU3RyaW5nKGZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSB8fCBTdHJpbmcodXJsRmlsZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgY29uc3QgbWF0Y2ggPSBzb3VyY2UubWF0Y2goL1xcLihbYS16QS1aMC05XXsxLDEwfSkoPzokfFs/I10pLyk7XHJcbiAgaWYgKCFtYXRjaCB8fCAhbWF0Y2hbMV0pIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgcmV0dXJuIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XHJcbn07XHJcblxyXG5jb25zdCBpc05vdEZvdW5kRXJyb3IgPSAoZXJyb3I6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDA0O1xyXG59O1xyXG5cclxuY29uc3QgaXNNaXNzaW5nVGlja2V0RmlsZU1lc3NhZ2UgPSAobWVzc2FnZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcobWVzc2FnZSB8fCBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhcmNoaXZvIGFzb2NpYWRvXCIpIHx8XHJcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXJjaGl2byBhZGp1bnRvXCIpIHx8XHJcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXNzb2NpYXRlZCBmaWxlXCIpIHx8XHJcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXR0YWNoZWQgZmlsZVwiKVxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBFbmNhcHN1bGF0ZXMgdXBkYXRlIGFuZCBkZWxldGUgbXV0YXRpb25zIGZvciB0aWNrZXQgaGVhZGVyIGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGNhbkVkaXRUaWNrZXQsXHJcbiAgY2FuRGVsZXRlVGlja2V0LFxyXG4gIGZpbGVJZCxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRyYWZ0R2FzdG9UeXBlLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICBkcmFmdFRyYW5zRGF0ZSxcbiAgZHJhZnRUaWNrZXRUaW1lLFxuICBkcmFmdENvbWVudGFyaW8sXG4gIGRyYWZ0VXJsRmlsZSxcclxuICBkcmFmdEZpbGVOYW1lLFxyXG4gIGxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gIGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCxcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgY3VycmVudEF4VXNlcklkLFxyXG4gIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gIG9uTGlua2VkU2hlZXRTeW5jRmFpbHVyZSxcclxuICBvbkxpbmtlZFNoZWV0U3luY1N1Y2Nlc3MsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBzZXRCdXN5LFxyXG4gIHNldFN0YXR1cyxcclxuICBzZXRJc0VkaXRpbmcsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XHJcbiAgY29uc3QgdmFsaWRhdGVMaW5rZWRTaGVldEJlZm9yZU11dGF0aW9uID0gdXNlQ2FsbGJhY2soYXN5bmMgKCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4gPT4ge1xyXG4gICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChsaW5rZWRFeHBlbnNlU2hlZXRJZCk7XHJcbiAgICBpZiAoIXNhZmVTaGVldElkKSB7XHJcbiAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFjY2Vzc1Jlc3VsdCA9IGF3YWl0IHJlc29sdmVFeHBlbnNlU2hlZXRFZGl0QWNjZXNzKHtcclxuICAgICAgc2hlZXRJZDogc2FmZVNoZWV0SWQsXHJcbiAgICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgICAgY3VycmVudENybVVzZXJJZCxcclxuICAgICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgIH0pO1xyXG4gICAgaWYgKCFhY2Nlc3NSZXN1bHQuaXNMb2NrZWQpIHtcclxuICAgICAgcmV0dXJuIHNhZmVTaGVldElkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1lc3NhZ2UgPVxyXG4gICAgICBzYWZlVGV4dChhY2Nlc3NSZXN1bHQuYmxvY2tlZE1lc3NhZ2UpIHx8XHJcbiAgICAgIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9SZWFkT25seUJ5U3RhdHVzXCIsIFwiTm8gc2UgcHVlZGUgZWRpdGFyIGVzdGEgaG9qYSBkZSBnYXN0b3MgZW4gZWwgZXN0YWRvIGFjdHVhbC5cIik7XHJcbiAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSwgW1xyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgbGlua2VkRXhwZW5zZVNoZWV0SWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBydW5IZWFkZXJVcGRhdGUgPSB1c2VDYWxsYmFjayhcclxuICAgIGFzeW5jICh7IHN5bmNTaGVldExpbmUgfTogeyBzeW5jU2hlZXRMaW5lOiBib29sZWFuIH0pOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcclxuICAgICAgaWYgKGJ1c3kgfHwgIWlzRWRpdGluZykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoIWNhbkVkaXRUaWNrZXQpIHtcclxuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBub3JtYWxpemVkRGVzY3JpcHRpb24gPSBTdHJpbmcoZHJhZnREZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XHJcbiAgICAgIGlmICghbm9ybWFsaXplZERlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fRGVzY3JpcHRpb25SZXF1aXJlZFwiLCBcIkRlc2NyaXB0aW9uIGlzIHJlcXVpcmVkLlwiKTtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW5jeSA9IFN0cmluZyhkcmFmdEN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxuICAgICAgaWYgKCFub3JtYWxpemVkQ3VycmVuY3kpIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9DdXJyZW5jeVJlcXVpcmVkXCIsIFwiQ3VycmVuY3kgaXMgcmVxdWlyZWQuXCIpO1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcGFyc2VkR2FzdG9UeXBlID0gcGFyc2VPcHRpb25hbEludGVnZXIoZHJhZnRHYXN0b1R5cGUpO1xyXG4gICAgICBpZiAocGFyc2VkR2FzdG9UeXBlID09PSB1bmRlZmluZWQgfHwgIVJFUVVJUkVEX0dBU1RPX1RZUEVTLmhhcyhwYXJzZWRHYXN0b1R5cGUpKSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJUaWNrZXRzX1ZhbGlkYXRpb25fQ2F0ZWdvcnlSZXF1aXJlZFwiLCBcIkNhdGVnb3J5IGlzIHJlcXVpcmVkLlwiKTtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJhd1RyYW5zRGF0ZSA9IFN0cmluZyhkcmFmdFRyYW5zRGF0ZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc0RhdGUgPSByYXdUcmFuc0RhdGUgPyB0b0V4cGVuc2VBcGlEZE1tWXl5eShyYXdUcmFuc0RhdGUpIDogXCJcIjtcclxuICAgICAgaWYgKHJhd1RyYW5zRGF0ZSAmJiAhbm9ybWFsaXplZFRyYW5zRGF0ZSkge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgICAgICAgc2V0U3RhdHVzKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgdmFsaWRhdGVkU2hlZXRJZCA9IGF3YWl0IHZhbGlkYXRlTGlua2VkU2hlZXRCZWZvcmVNdXRhdGlvbigpO1xyXG4gICAgICBpZiAodmFsaWRhdGVkU2hlZXRJZCA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCA9IHtcbiAgICAgICAgZGVzY3JpcHRpb246IG5vcm1hbGl6ZWREZXNjcmlwdGlvbixcbiAgICAgICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVkQ3VycmVuY3ksXG4gICAgICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplZFRyYW5zRGF0ZSB8fCB1bmRlZmluZWQsXG4gICAgICAgIHRpY2tldERhdGU6IG5vcm1hbGl6ZWRUcmFuc0RhdGUgfHwgdW5kZWZpbmVkLFxuICAgICAgICB0aWNrZXRUaW1lOiBzYWZlVGV4dChkcmFmdFRpY2tldFRpbWUpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgY29tZW50YXJpbzogU3RyaW5nKGRyYWZ0Q29tZW50YXJpbyB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgICB1cmxGaWxlOiBTdHJpbmcoZHJhZnRVcmxGaWxlIHx8IFwiXCIpLnRyaW0oKSB8fCB1bmRlZmluZWQsXG4gICAgICAgIGZpbGVOYW1lOiBTdHJpbmcoZHJhZnRGaWxlTmFtZSB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIGZpbGVFeHRlbnNpb246IHJlc29sdmVUaWNrZXRGaWxlRXh0ZW5zaW9uKGRyYWZ0RmlsZU5hbWUsIGRyYWZ0VXJsRmlsZSksXHJcbiAgICAgICAgZ2FzdG9UeXBlOiBwYXJzZWRHYXN0b1R5cGUgYXMgRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdFtcImdhc3RvVHlwZVwiXSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRpbmdcIiwgXCJVcGRhdGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxyXG4gICAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpLFxyXG4gICAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgICAgc2V0QnVzeSxcclxuICAgICAgICBzZXRTdGF0dXMsXHJcbiAgICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldChmaWxlSWQsIHBheWxvYWQpO1xyXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHN5bmNTaGVldExpbmUgJiYgdmFsaWRhdGVkU2hlZXRJZCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgIGF3YWl0IHN5bmNFeHBlbnNlTGlua2VkVGlja2V0U2hlZXRMaW5lKHtcclxuICAgICAgICAgICAgICAgIGZpbGVJZCxcclxuICAgICAgICAgICAgICAgIHNoZWV0SWQ6IHZhbGlkYXRlZFNoZWV0SWQsXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgY2xlYXJFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoKTtcclxuICAgICAgICAgICAgICBvbkxpbmtlZFNoZWV0U3luY1N1Y2Nlc3M/LigpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPVxyXG4gICAgICAgICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBFcnJvclxyXG4gICAgICAgICAgICAgICAgICA/IGVycm9yLm1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgOiBpbmRUKFxyXG4gICAgICAgICAgICAgICAgICAgICAgXCJFeHBlbnNlVGlja2V0c19TaGVldFN5bmNfUmV0cnlSZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgXCJUaWNrZXQgZGF0YSBjaGFuZ2VkLCBidXQgd2UgY291bGQgbm90IHN5bmMgdGhlIGV4cGVuc2UgbGluZS4gU2F2ZSBhZ2FpbiBiZWZvcmUgbGVhdmluZy5cIlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgICAgICAgICBzaGVldElkOiB2YWxpZGF0ZWRTaGVldElkLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBvbkxpbmtlZFNoZWV0U3luY0ZhaWx1cmU/LihtZXNzYWdlKTtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IHVwZGF0ZWRcIikpO1xyXG4gICAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIGNhbkVkaXRUaWNrZXQsXHJcbiAgICAgIGRyYWZ0Q29tZW50YXJpbyxcclxuICAgICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICAgIGRyYWZ0RmlsZU5hbWUsXHJcbiAgICAgIGRyYWZ0R2FzdG9UeXBlLFxuICAgICAgZHJhZnRUaWNrZXRUaW1lLFxuICAgICAgZHJhZnRUcmFuc0RhdGUsXG4gICAgICBkcmFmdFVybEZpbGUsXHJcbiAgICAgIGZpbGVJZCxcclxuICAgICAgaXNFZGl0aW5nLFxyXG4gICAgICBvbkxpbmtlZFNoZWV0U3luY0ZhaWx1cmUsXHJcbiAgICAgIG9uTGlua2VkU2hlZXRTeW5jU3VjY2VzcyxcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIHZhbGlkYXRlTGlua2VkU2hlZXRCZWZvcmVNdXRhdGlvbixcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICByZXR1cm4gcnVuSGVhZGVyVXBkYXRlKHtcclxuICAgICAgc3luY1NoZWV0TGluZTogdHJ1ZSxcclxuICAgIH0pO1xyXG4gIH0sIFtydW5IZWFkZXJVcGRhdGVdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUGVyc2lzdEhlYWRlckRyYWZ0ID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgcmV0dXJuIHJ1bkhlYWRlclVwZGF0ZSh7XHJcbiAgICAgIHN5bmNTaGVldExpbmU6IGZhbHNlLFxyXG4gICAgfSk7XHJcbiAgfSwgW3J1bkhlYWRlclVwZGF0ZV0pO1xyXG5cclxuICBjb25zdCByZXNvbHZlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0ID0gdXNlQ2FsbGJhY2soYXN5bmMgKCk6IFByb21pc2U8RGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0IHwgbnVsbD4gPT4ge1xyXG4gICAgaWYgKGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCkge1xyXG4gICAgICByZXR1cm4gZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQobGlua2VkRXhwZW5zZVNoZWV0SWQpO1xyXG4gICAgaWYgKCFzYWZlU2hlZXRJZCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKHNhZmVTaGVldElkLCB7XHJcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2UuSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICAgIGNvbnN0IGRldGFpbCA9IGl0ZW1zLmZpbmQoKGVudHJ5KSA9PiBlbnRyeSAmJiB0eXBlb2YgZW50cnkgPT09IFwib2JqZWN0XCIpIHx8IG51bGw7XHJcbiAgICBjb25zdCBsaW5lcyA9IEFycmF5LmlzQXJyYXkoZGV0YWlsPy5MaW5lcykgPyBkZXRhaWwuTGluZXMgOiBbXTtcclxuICAgIGNvbnN0IG1hdGNoaW5nTGluZSA9IGxpbmVzLmZpbmQoKGxpbmUpID0+IHNhZmVUZXh0KGxpbmU/LkZpbGVJZCkgPT09IGZpbGVJZCk7XHJcbiAgICBjb25zdCBsaW5lUmVjSWQgPSBzYWZlVGV4dChtYXRjaGluZ0xpbmU/LlJlY0lkKTtcclxuXHJcbiAgICBpZiAoIWxpbmVSZWNJZCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzaGVldElkOiBzYWZlU2hlZXRJZCxcclxuICAgICAgbGluZVJlY0lkLFxyXG4gICAgfTtcclxuICB9LCBbZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0LCBmaWxlSWQsIGxpbmtlZEV4cGVuc2VTaGVldElkXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURlbGV0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWNhbkRlbGV0ZVRpY2tldCkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2YWxpZGF0ZWRTaGVldElkID0gYXdhaXQgdmFsaWRhdGVMaW5rZWRTaGVldEJlZm9yZU11dGF0aW9uKCk7XHJcbiAgICBpZiAodmFsaWRhdGVkU2hlZXRJZCA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxyXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUVycm9yXCIsIFwiRGVsZXRlIGVycm9yLlwiKSxcclxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBsaW5rZWRMaW5lQ29udGV4dCA9IGF3YWl0IHJlc29sdmVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQoKTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGRlbGV0ZUZpbGVSZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldEZpbGUoZmlsZUlkLCB7XHJcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBpZiAoIWRlbGV0ZUZpbGVSZXNwb25zZS5TdWNjZXNzICYmICFpc01pc3NpbmdUaWNrZXRGaWxlTWVzc2FnZShkZWxldGVGaWxlUmVzcG9uc2UuTWVzc2FnZSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRlbGV0ZUZpbGVSZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGlmICghaXNOb3RGb3VuZEVycm9yKGVycm9yKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0KGZpbGVJZCk7XHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxpbmtlZExpbmVDb250ZXh0KSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5lRGVsZXRlUmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRMaW5lKFxyXG4gICAgICAgICAgICAgIGxpbmtlZExpbmVDb250ZXh0LnNoZWV0SWQsXHJcbiAgICAgICAgICAgICAgbGlua2VkTGluZUNvbnRleHQubGluZVJlY0lkLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbGluZURlbGV0ZVJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobGluZURlbGV0ZVJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgLy8gVGhlIGxpbmtlZCBsaW5lIGNhbiBiZSBhdXRvLXJlbW92ZWQgYnkgYmFja2VuZCBjYXNjYWRlOyBrZWVwIGZsb3cgc3VjY2Vzc2Z1bCBpbiB0aGF0IGNhc2UuXHJcbiAgICAgICAgICAgIGlmICghaXNOb3RGb3VuZEVycm9yKGVycm9yKSkge1xyXG4gICAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IGRlbGV0ZWRcIikpO1xyXG4gICAgICAgIGlmICh2YWxpZGF0ZWRTaGVldElkKSB7XHJcbiAgICAgICAgICBjbGVhckV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZSgpO1xyXG4gICAgICAgICAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzPy4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xyXG4gIH0sIFtcclxuICAgIGJ1c3ksXHJcbiAgICBjYW5EZWxldGVUaWNrZXQsXHJcbiAgICBmaWxlSWQsXHJcbiAgICBvbkxpbmtlZFNoZWV0U3luY1N1Y2Nlc3MsXHJcbiAgICByZXNvbHZlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0LFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICB2YWxpZGF0ZUxpbmtlZFNoZWV0QmVmb3JlTXV0YXRpb24sXHJcbiAgXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zLnRzXCI7XHJcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XHJcbiAgYWN0aW9uTW9kZT86IFwiZGVmYXVsdFwiIHwgXCJkZWxldGVfb25seVwiIHwgXCJzYXZlX29ubHlcIiB8IFwidmlld19vbmx5XCI7XHJcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XHJcbiAgY2FuRWRpdFRpY2tldDogYm9vbGVhbjtcclxuICBjYW5EZWxldGVUaWNrZXQ6IGJvb2xlYW47XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGNhbk9wZW5TYXZlQ29uZmlybT86ICgpID0+IGJvb2xlYW47XHJcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBvblNhdmVTdWNjZXNzOiAoKSA9PiB2b2lkO1xyXG4gIG9uRGVsZXRlU3VjY2Vzcz86ICgpID0+IHZvaWQ7XHJcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xyXG4gIH0pID0+IHZvaWQ7XHJcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gc3RhdGUgYW5kIGRpc3BhdGNoIGFjdGlvbnMgZm9yIHRpY2tldCBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbE9wZW4sXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzTG9ja2VkLFxyXG4gIGFjdGlvbk1vZGUgPSBcImRlZmF1bHRcIixcclxuICBwZXJtaXNzaW9uc1JlYWR5ID0gdHJ1ZSxcclxuICBjYW5FZGl0VGlja2V0LFxyXG4gIGNhbkRlbGV0ZVRpY2tldCxcclxuICBmaWxlSWQsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gIGhhbmRsZVVwZGF0ZSxcclxuICBoYW5kbGVEZWxldGUsXHJcbiAgb25TYXZlU3VjY2VzcyxcclxuICBvbkRlbGV0ZVN1Y2Nlc3MsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcclxuICB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMoe1xyXG4gICAgYWN0aW9uR3JvdXBJZDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtYWN0aW9uc1wiLFxyXG4gICAgaWRzOiB7XHJcbiAgICAgIGVkaXRJY29uSWQ6IFwiZXhwZW5zZVRpY2tldEVkaXRJY29uXCIsXHJcbiAgICAgIHNhdmVJY29uSWQ6IFwiZXhwZW5zZVRpY2tldFNhdmVJY29uXCIsXHJcbiAgICAgIGRlbGV0ZUJ0bklkOiBcImV4cGVuc2VUaWNrZXREZWxldGVCdG5cIixcclxuICAgICAgY2FuY2VsQnRuSWQ6IFwiZXhwZW5zZVRpY2tldENhbmNlbEJ0blwiLFxyXG4gICAgfSxcclxuICAgIGV2ZW50czoge1xyXG4gICAgICBlZGl0RXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWVkaXRcIixcclxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWRlbGV0ZVwiLFxyXG4gICAgICBjYW5jZWxFdmVudDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtY2FuY2VsLWVkaXRcIixcclxuICAgIH0sXHJcbiAgICBidXN5LFxyXG4gICAgbW9kYWxPcGVuLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlOiBmYWxzZSxcclxuICAgIGlzTG9ja2VkLFxyXG4gICAgYWN0aW9uTW9kZSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHksXHJcbiAgICBjYW5DcmVhdGU6IGZhbHNlLFxyXG4gICAgY2FuRWRpdDogY2FuRWRpdFRpY2tldCxcclxuICAgIGNhbkRlbGV0ZTogY2FuRGVsZXRlVGlja2V0LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlU2F2ZTogaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgc2F2ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiU2F2ZSBjaGFuZ2VzXCIpLFxyXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXHJcbiAgICBzYXZlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXHJcbiAgICBkZWxldGVDb25maXJtVGl0bGU6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9UaXRsZVwiLCBcIkRlbGV0ZVwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiQ29uZmlybV9EZWxldGVfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/XCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpLFxyXG4gICAgb25TYXZlU3VjY2VzcyxcclxuICAgIG9uRGVsZXRlU3VjY2Vzczogb25EZWxldGVTdWNjZXNzIHx8ICgoKSA9PiBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvVGlja2V0c1wiKSksXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZHVjZXIsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBEaXNwYXRjaCwgU2V0U3RhdGVBY3Rpb24gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHBhcnNlRXhwZW5zZURhdGUsIHNhZmVUZXh0LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcblxyXG50eXBlIERyYWZ0U3RhdGUgPSB7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBnYXN0b1R5cGU6IHN0cmluZztcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICB0aWNrZXRUaW1lOiBzdHJpbmc7XG4gIGNvbWVudGFyaW86IHN0cmluZztcbiAgdXJsRmlsZTogc3RyaW5nO1xuICBmaWxlTmFtZTogc3RyaW5nO1xufTtcclxuXHJcbnR5cGUgRWRpdG9yU3RhdGUgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBzdGF0dXM6IHN0cmluZztcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgbW9kYWxFcnJvcjogc3RyaW5nO1xyXG4gIGxpbmVQYWdlOiBudW1iZXI7XHJcbiAgZHJhZnQ6IERyYWZ0U3RhdGU7XHJcbn07XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3JBcmdzID0ge1xyXG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw7XHJcbiAgbGluZUNvdW50OiBudW1iZXI7XHJcbiAgcGFnZVNpemU6IG51bWJlcjtcclxuICBjYW5FZGl0VGlja2V0OiBib29sZWFuO1xyXG4gIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICBhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0OiBib29sZWFuO1xyXG4gIGlzRnJvbVNoZWV0TGluazogYm9vbGVhbjtcclxuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbnR5cGUgRWRpdG9yQWN0aW9uID1cclxuICB8IHsgdHlwZTogXCJoeWRyYXRlX2Zyb21faGVhZGVyXCI7IGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGwgfVxyXG4gIHwge1xyXG4gICAgICB0eXBlOiBcInBhdGNoX3N0YXRlXCI7XHJcbiAgICAgIHBhdGNoOiBQYXJ0aWFsPFBpY2s8RWRpdG9yU3RhdGUsIFwiYnVzeVwiIHwgXCJzdGF0dXNcIiB8IFwiaXNFZGl0aW5nXCIgfCBcIm1vZGFsRXJyb3JcIiB8IFwibGluZVBhZ2VcIj4+O1xyXG4gICAgfVxyXG4gIHwgeyB0eXBlOiBcInNldF9kcmFmdF9maWVsZFwiOyBmaWVsZDoga2V5b2YgRHJhZnRTdGF0ZTsgdmFsdWU6IHN0cmluZyB9O1xyXG5cclxuY29uc3QgY3JlYXRlRW1wdHlEcmFmdCA9ICgpOiBEcmFmdFN0YXRlID0+ICh7XHJcbiAgZGVzY3JpcHRpb246IFwiXCIsXHJcbiAgZ2FzdG9UeXBlOiBcIlwiLFxuICBjdXJyZW5jeUNvZGU6IFwiXCIsXG4gIHRyYW5zRGF0ZTogXCJcIixcbiAgdGlja2V0VGltZTogXCJcIixcbiAgY29tZW50YXJpbzogXCJcIixcbiAgdXJsRmlsZTogXCJcIixcbiAgZmlsZU5hbWU6IFwiXCIsXG59KTtcclxuXHJcbmNvbnN0IHRvSW5wdXREYXRlID0gKHJhdz86IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcbiAgcmV0dXJuIHBhcnNlZCA/IHRvSXNvRGF0ZShwYXJzZWQpIDogXCJcIjtcbn07XG5cbmNvbnN0IHRvSW5wdXRUaW1lID0gKHJhdz86IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHZhbHVlID0gc2FmZVRleHQocmF3KTtcbiAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PT0gXCIwXCIpIHJldHVybiBcIlwiO1xuXG4gIGNvbnN0IHNlY29uZHNWYWx1ZSA9IE51bWJlcih2YWx1ZSk7XG4gIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHNlY29uZHNWYWx1ZSkgJiYgc2Vjb25kc1ZhbHVlID49IDAgJiYgc2Vjb25kc1ZhbHVlIDw9IDg2Mzk5KSB7XG4gICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHNlY29uZHNWYWx1ZSAvIDM2MDApO1xuICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNvbmRzVmFsdWUgJSAzNjAwKSAvIDYwKTtcbiAgICBjb25zdCBzZWNvbmRzID0gc2Vjb25kc1ZhbHVlICUgNjA7XG4gICAgcmV0dXJuIFtob3VycywgbWludXRlcywgc2Vjb25kc10ubWFwKChlbnRyeSkgPT4gU3RyaW5nKGVudHJ5KS5wYWRTdGFydCgyLCBcIjBcIikpLmpvaW4oXCI6XCIpO1xuICB9XG5cbiAgY29uc3QgbWF0Y2ggPSB2YWx1ZS5tYXRjaCgvXihcXGR7MSwyfSk6KFswLTVdXFxkKSg/OjooWzAtNV1cXGQpKT8kLyk7XG4gIGlmICghbWF0Y2gpIHJldHVybiBcIlwiO1xuXG4gIGNvbnN0IGhvdXJzID0gTnVtYmVyLnBhcnNlSW50KG1hdGNoWzFdIHx8IFwiXCIsIDEwKTtcbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGhvdXJzKSB8fCBob3VycyA8IDAgfHwgaG91cnMgPiAyMykgcmV0dXJuIFwiXCI7XG5cbiAgcmV0dXJuIGAke1N0cmluZyhob3VycykucGFkU3RhcnQoMiwgXCIwXCIpfToke21hdGNoWzJdfToke21hdGNoWzNdIHx8IFwiMDBcIn1gO1xufTtcblxuY29uc3QgY3JlYXRlRHJhZnRGcm9tSGVhZGVyID0gKGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGwpOiBEcmFmdFN0YXRlID0+IHtcbiAgcmV0dXJuIHtcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoaGVhZGVyPy5kZXNjcmlwdGlvbiksXG4gICAgZ2FzdG9UeXBlOiBoZWFkZXI/Lmdhc3RvVHlwZSA9PT0gbnVsbCB8fCBoZWFkZXI/Lmdhc3RvVHlwZSA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IFN0cmluZyhoZWFkZXIuZ2FzdG9UeXBlKSxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpLFxuICAgIHRyYW5zRGF0ZTogdG9JbnB1dERhdGUoaGVhZGVyPy50aWNrZXREYXRlIHx8IGhlYWRlcj8udHJhbnNEYXRlKSxcbiAgICB0aWNrZXRUaW1lOiB0b0lucHV0VGltZShoZWFkZXI/LnRpY2tldFRpbWUpLFxuICAgIGNvbWVudGFyaW86IHNhZmVUZXh0KGhlYWRlcj8uY29tZW50YXJpbyksXG4gICAgdXJsRmlsZTogc2FmZVRleHQoaGVhZGVyPy51cmxGaWxlKSxcbiAgICBmaWxlTmFtZTogc2FmZVRleHQoaGVhZGVyPy5maWxlTmFtZSksXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVJbml0aWFsU3RhdGUgPSAoKTogRWRpdG9yU3RhdGUgPT4gKHtcclxuICBidXN5OiBmYWxzZSxcclxuICBzdGF0dXM6IFwiXCIsXHJcbiAgaXNFZGl0aW5nOiBmYWxzZSxcclxuICBtb2RhbEVycm9yOiBcIlwiLFxyXG4gIGxpbmVQYWdlOiAxLFxyXG4gIGRyYWZ0OiBjcmVhdGVFbXB0eURyYWZ0KCksXHJcbn0pO1xyXG5cclxuY29uc3QgaXNWYWxpZFJlcXVpcmVkR2FzdG9UeXBlID0gKHJhd1ZhbHVlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICBjb25zdCBwYXJzZWRWYWx1ZSA9IE51bWJlci5wYXJzZUludChTdHJpbmcocmF3VmFsdWUgfHwgXCJcIikudHJpbSgpLCAxMCk7XHJcbiAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIocGFyc2VkVmFsdWUpICYmIHBhcnNlZFZhbHVlID4gMDtcclxufTtcclxuXHJcbmNvbnN0IGVkaXRvclJlZHVjZXIgPSAoc3RhdGU6IEVkaXRvclN0YXRlLCBhY3Rpb246IEVkaXRvckFjdGlvbik6IEVkaXRvclN0YXRlID0+IHtcclxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICBjYXNlIFwiaHlkcmF0ZV9mcm9tX2hlYWRlclwiOlxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIGRyYWZ0OiBjcmVhdGVEcmFmdEZyb21IZWFkZXIoYWN0aW9uLmhlYWRlciksXHJcbiAgICAgIH07XHJcbiAgICBjYXNlIFwicGF0Y2hfc3RhdGVcIjpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAuLi5hY3Rpb24ucGF0Y2gsXHJcbiAgICAgIH07XHJcbiAgICBjYXNlIFwic2V0X2RyYWZ0X2ZpZWxkXCI6XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgZHJhZnQ6IHtcclxuICAgICAgICAgIC4uLnN0YXRlLmRyYWZ0LFxyXG4gICAgICAgICAgW2FjdGlvbi5maWVsZF06IGFjdGlvbi52YWx1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVTZXRTdGF0ZVZhbHVlID0gPFQsPih2YWx1ZTogU2V0U3RhdGVBY3Rpb248VD4sIGN1cnJlbnQ6IFQpOiBUID0+IHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgPyAodmFsdWUgYXMgKHByZXZTdGF0ZTogVCkgPT4gVCkoY3VycmVudCkgOiB2YWx1ZTtcclxufTtcclxuXHJcbi8vIE93bnMgcGFnZS1sb2NhbCBlZGl0LCBkcmFmdCwgYW5kIGxpbmUgcGFnaW5nIHN0YXRlIGZvciB0aWNrZXQgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbEVkaXRvciA9ICh7XHJcbiAgaGVhZGVyLFxyXG4gIGxpbmVDb3VudCxcclxuICBwYWdlU2l6ZSxcclxuICBjYW5FZGl0VGlja2V0LFxyXG4gIGlzTG9hZGluZyxcclxuICBhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0LFxyXG4gIGlzRnJvbVNoZWV0TGluayxcclxuICBvbkZvcmJpZGRlbixcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbEVkaXRvckFyZ3MpID0+IHtcclxuICBjb25zdCBbc3RhdGUsIGRpc3BhdGNoXSA9IHVzZVJlZHVjZXIoZWRpdG9yUmVkdWNlciwgdW5kZWZpbmVkLCBjcmVhdGVJbml0aWFsU3RhdGUpO1xyXG4gIGNvbnN0IFtkZXNjcmlwdGlvbkludmFsaWQsIHNldERlc2NyaXB0aW9uSW52YWxpZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2dhc3RvVHlwZUludmFsaWQsIHNldEdhc3RvVHlwZUludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtjdXJyZW5jeUNvZGVJbnZhbGlkLCBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBkZXNjcmlwdGlvbklucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBnYXN0b1R5cGVJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgY3VycmVuY3lJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc3RhdGUuaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBkaXNwYXRjaCh7IHR5cGU6IFwiaHlkcmF0ZV9mcm9tX2hlYWRlclwiLCBoZWFkZXIgfSk7XHJcbiAgfSwgW2hlYWRlciwgc3RhdGUuaXNFZGl0aW5nXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBtYXhQYWdlID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKGxpbmVDb3VudCAvIHBhZ2VTaXplKSk7XHJcbiAgICBpZiAoc3RhdGUubGluZVBhZ2UgPiBtYXhQYWdlKSB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBsaW5lUGFnZTogbWF4UGFnZSB9IH0pO1xyXG4gICAgfVxyXG4gIH0sIFtsaW5lQ291bnQsIHBhZ2VTaXplLCBzdGF0ZS5saW5lUGFnZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHN0YXRlLmlzRWRpdGluZykgcmV0dXJuO1xyXG4gICAgc2V0RGVzY3JpcHRpb25JbnZhbGlkKGZhbHNlKTtcclxuICAgIHNldEdhc3RvVHlwZUludmFsaWQoZmFsc2UpO1xyXG4gICAgc2V0Q3VycmVuY3lDb2RlSW52YWxpZChmYWxzZSk7XHJcbiAgfSwgW3N0YXRlLmlzRWRpdGluZ10pO1xyXG5cclxuICBjb25zdCBzZXRCdXN5ID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwicGF0Y2hfc3RhdGVcIiwgcGF0Y2g6IHsgYnVzeTogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmJ1c3kpIH0gfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLmJ1c3ldXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2V0U3RhdHVzID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBzdGF0dXM6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5zdGF0dXMpIH0gfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLnN0YXR1c11cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRJc0VkaXRpbmcgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxib29sZWFuPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBpc0VkaXRpbmc6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5pc0VkaXRpbmcpIH0gfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLmlzRWRpdGluZ11cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRNb2RhbEVycm9yID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBtb2RhbEVycm9yOiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUubW9kYWxFcnJvcikgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUubW9kYWxFcnJvcl1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRMaW5lUGFnZSA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPG51bWJlcj4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwicGF0Y2hfc3RhdGVcIiwgcGF0Y2g6IHsgbGluZVBhZ2U6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5saW5lUGFnZSkgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUubGluZVBhZ2VdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2V0RHJhZnREZXNjcmlwdGlvbiA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBzZXREZXNjcmlwdGlvbkludmFsaWQoZmFsc2UpO1xyXG4gICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJzZXRfZHJhZnRfZmllbGRcIixcclxuICAgICAgICBmaWVsZDogXCJkZXNjcmlwdGlvblwiLFxyXG4gICAgICAgIHZhbHVlOiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuZHJhZnQuZGVzY3JpcHRpb24pLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuZHJhZnQuZGVzY3JpcHRpb25dXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2V0RHJhZnRHYXN0b1R5cGUgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxzdHJpbmc+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgc2V0R2FzdG9UeXBlSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcInNldF9kcmFmdF9maWVsZFwiLFxyXG4gICAgICAgIGZpZWxkOiBcImdhc3RvVHlwZVwiLFxyXG4gICAgICAgIHZhbHVlOiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuZHJhZnQuZ2FzdG9UeXBlKSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLmRyYWZ0Lmdhc3RvVHlwZV1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXREcmFmdEN1cnJlbmN5Q29kZSA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwic2V0X2RyYWZ0X2ZpZWxkXCIsXHJcbiAgICAgICAgZmllbGQ6IFwiY3VycmVuY3lDb2RlXCIsXHJcbiAgICAgICAgdmFsdWU6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUpLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldERyYWZ0VHJhbnNEYXRlID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxuICAgICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBcInNldF9kcmFmdF9maWVsZFwiLFxuICAgICAgICBmaWVsZDogXCJ0cmFuc0RhdGVcIixcbiAgICAgICAgdmFsdWU6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC50cmFuc0RhdGUpLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuZHJhZnQudHJhbnNEYXRlXVxuICApO1xuXG4gIGNvbnN0IHNldERyYWZ0VGlja2V0VGltZSA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcbiAgICAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogXCJzZXRfZHJhZnRfZmllbGRcIixcbiAgICAgICAgZmllbGQ6IFwidGlja2V0VGltZVwiLFxuICAgICAgICB2YWx1ZTogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmRyYWZ0LnRpY2tldFRpbWUpLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbc3RhdGUuZHJhZnQudGlja2V0VGltZV1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFoZWFkZXIgfHwgaXNMb2FkaW5nKSByZXR1cm47XHJcbiAgICBpZiAoaXNGcm9tU2hlZXRMaW5rKSByZXR1cm47XHJcbiAgICBpZiAoaGVhZGVyLnN0YXR1cyA9PT0gMSAmJiAhYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCkgcmV0dXJuO1xyXG4gICAgaWYgKCFjYW5FZGl0VGlja2V0KSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRHYXN0b1R5cGVJbnZhbGlkKGZhbHNlKTtcclxuICAgIHNldEN1cnJlbmN5Q29kZUludmFsaWQoZmFsc2UpO1xyXG4gICAgZGlzcGF0Y2goeyB0eXBlOiBcImh5ZHJhdGVfZnJvbV9oZWFkZXJcIiwgaGVhZGVyIH0pO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBcInBhdGNoX3N0YXRlXCIsXHJcbiAgICAgIHBhdGNoOiB7XHJcbiAgICAgICAgbW9kYWxFcnJvcjogXCJcIixcclxuICAgICAgICBpc0VkaXRpbmc6IHRydWUsXHJcbiAgICAgICAgc3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LCBbYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCwgY2FuRWRpdFRpY2tldCwgaGVhZGVyLCBpc0Zyb21TaGVldExpbmssIGlzTG9hZGluZywgb25Gb3JiaWRkZW5dKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghc3RhdGUuaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBpZiAoIWhlYWRlcikge1xyXG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwicGF0Y2hfc3RhdGVcIiwgcGF0Y2g6IHsgaXNFZGl0aW5nOiBmYWxzZSB9IH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R2FzdG9UeXBlSW52YWxpZChmYWxzZSk7XHJcbiAgICBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkKGZhbHNlKTtcclxuICAgIGRpc3BhdGNoKHsgdHlwZTogXCJoeWRyYXRlX2Zyb21faGVhZGVyXCIsIGhlYWRlciB9KTtcclxuICAgIGRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLFxyXG4gICAgICBwYXRjaDoge1xyXG4gICAgICAgIGlzRWRpdGluZzogZmFsc2UsXHJcbiAgICAgICAgbW9kYWxFcnJvcjogXCJcIixcclxuICAgICAgICBzdGF0dXM6IGluZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSwgW2hlYWRlciwgc3RhdGUuaXNFZGl0aW5nXSk7XHJcblxyXG4gIGNvbnN0IGNhbk9wZW5TYXZlQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWREZXNjcmlwdGlvbiA9IFN0cmluZyhzdGF0ZS5kcmFmdC5kZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XHJcbiAgICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3lDb2RlID0gU3RyaW5nKHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uSXNWYWxpZCA9ICEhbm9ybWFsaXplZERlc2NyaXB0aW9uO1xyXG4gICAgY29uc3QgZ2FzdG9UeXBlSXNWYWxpZCA9IGlzVmFsaWRSZXF1aXJlZEdhc3RvVHlwZShzdGF0ZS5kcmFmdC5nYXN0b1R5cGUpO1xyXG4gICAgY29uc3QgY3VycmVuY3lJc1ZhbGlkID0gISFub3JtYWxpemVkQ3VycmVuY3lDb2RlO1xyXG5cclxuICAgIHNldERlc2NyaXB0aW9uSW52YWxpZCghZGVzY3JpcHRpb25Jc1ZhbGlkKTtcclxuICAgIHNldEdhc3RvVHlwZUludmFsaWQoIWdhc3RvVHlwZUlzVmFsaWQpO1xyXG4gICAgc2V0Q3VycmVuY3lDb2RlSW52YWxpZCghY3VycmVuY3lJc1ZhbGlkKTtcclxuXHJcbiAgICBpZiAoZGVzY3JpcHRpb25Jc1ZhbGlkICYmIGdhc3RvVHlwZUlzVmFsaWQgJiYgY3VycmVuY3lJc1ZhbGlkKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1lc3NhZ2UgPSAhZGVzY3JpcHRpb25Jc1ZhbGlkXHJcbiAgICAgID8gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9EZXNjcmlwdGlvblJlcXVpcmVkXCIsIFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWQuXCIpXHJcbiAgICAgIDogIWdhc3RvVHlwZUlzVmFsaWRcclxuICAgICAgICA/IGluZFQoXCJUaWNrZXRzX1ZhbGlkYXRpb25fQ2F0ZWdvcnlSZXF1aXJlZFwiLCBcIkNhdGVnb3J5IGlzIHJlcXVpcmVkLlwiKVxyXG4gICAgICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9DdXJyZW5jeVJlcXVpcmVkXCIsIFwiQ3VycmVuY3kgaXMgcmVxdWlyZWQuXCIpO1xyXG5cclxuICAgIGRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLFxyXG4gICAgICBwYXRjaDoge1xyXG4gICAgICAgIG1vZGFsRXJyb3I6IG1lc3NhZ2UsXHJcbiAgICAgICAgc3RhdHVzOiBtZXNzYWdlLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgIGlmICghZGVzY3JpcHRpb25Jc1ZhbGlkKSB7XHJcbiAgICAgICAgZGVzY3JpcHRpb25JbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFnYXN0b1R5cGVJc1ZhbGlkKSB7XHJcbiAgICAgICAgZ2FzdG9UeXBlSW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGN1cnJlbmN5SW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LCBbc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlLCBzdGF0ZS5kcmFmdC5nYXN0b1R5cGVdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGJ1c3k6IHN0YXRlLmJ1c3ksXHJcbiAgICBzdGF0dXM6IHN0YXRlLnN0YXR1cyxcclxuICAgIGlzRWRpdGluZzogc3RhdGUuaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxFcnJvcjogc3RhdGUubW9kYWxFcnJvcixcclxuICAgIGxpbmVQYWdlOiBzdGF0ZS5saW5lUGFnZSxcclxuICAgIGRyYWZ0RGVzY3JpcHRpb246IHN0YXRlLmRyYWZ0LmRlc2NyaXB0aW9uLFxyXG4gICAgZGVzY3JpcHRpb25JbnZhbGlkLFxyXG4gICAgZGVzY3JpcHRpb25JbnB1dFJlZixcclxuICAgIGRyYWZ0R2FzdG9UeXBlOiBzdGF0ZS5kcmFmdC5nYXN0b1R5cGUsXHJcbiAgICBnYXN0b1R5cGVJbnZhbGlkLFxyXG4gICAgZ2FzdG9UeXBlSW5wdXRSZWYsXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZTogc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlLFxuICAgIGN1cnJlbmN5Q29kZUludmFsaWQsXG4gICAgY3VycmVuY3lJbnB1dFJlZixcbiAgICBkcmFmdFRyYW5zRGF0ZTogc3RhdGUuZHJhZnQudHJhbnNEYXRlLFxuICAgIGRyYWZ0VGlja2V0VGltZTogc3RhdGUuZHJhZnQudGlja2V0VGltZSxcbiAgICBkcmFmdENvbWVudGFyaW86IHN0YXRlLmRyYWZ0LmNvbWVudGFyaW8sXG4gICAgZHJhZnRVcmxGaWxlOiBzdGF0ZS5kcmFmdC51cmxGaWxlLFxuICAgIGRyYWZ0RmlsZU5hbWU6IHN0YXRlLmRyYWZ0LmZpbGVOYW1lLFxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRHYXN0b1R5cGUsXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgc2V0RHJhZnRUcmFuc0RhdGUsXG4gICAgc2V0RHJhZnRUaWNrZXRUaW1lLFxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7XHJcbiAgbm9ybWFsaXplRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgcmVzb2x2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuXHJcbi8vIFBhcnNlcyByb3V0ZSBjb250ZXh0IG9uY2UgYW5kIGV4cG9zZXMgc3RhYmxlIGZsYWdzIGZvciB0aWNrZXQgZGV0YWlsIGZsb3dzLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbFJvdXRlQ29udGV4dCA9ICgpID0+IHtcclxuICBjb25zdCByb3V0ZVBhcmFtcyA9IHVzZU1lbW8oKCkgPT4gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKSwgW10pO1xyXG4gIGNvbnN0IGZpbGVJZCA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQod2luZG93Ll9fRVhQRU5TRV9USUNLRVRfRklMRV9JRF9fKSwgW10pO1xyXG4gIGNvbnN0IGF1dG9FZGl0TW9kZSA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwibW9kZVwiKSkudG9Mb3dlckNhc2UoKSA9PT0gXCJlZGl0XCIsIFtyb3V0ZVBhcmFtc10pO1xyXG4gIGNvbnN0IHJvdXRlT3JpZ2luID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChyb3V0ZVBhcmFtcy5nZXQoXCJvcmlnaW5cIikpLnRvTG93ZXJDYXNlKCksIFtyb3V0ZVBhcmFtc10pO1xyXG4gIGNvbnN0IHJvdXRlU2hlZXRJZCA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwic2hlZXRJZFwiKSksIFtyb3V0ZVBhcmFtc10pO1xyXG4gIGNvbnN0IHJvdXRlU2hlZXRMaW5lUmVjSWQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwic2hlZXRMaW5lUmVjSWRcIikgfHwgcm91dGVQYXJhbXMuZ2V0KFwibGluZVJlY0lkXCIpKSxcclxuICAgIFtyb3V0ZVBhcmFtc11cclxuICApO1xyXG4gIGNvbnN0IGV4cGxpY2l0UmV0dXJuQ29udGV4dCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PlxyXG4gICAgICBub3JtYWxpemVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCh7XHJcbiAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgIG9yaWdpbjogcm91dGVPcmlnaW4sXHJcbiAgICAgICAgc2hlZXRJZDogcm91dGVTaGVldElkLFxyXG4gICAgICAgIHNoZWV0TGluZVJlY0lkOiByb3V0ZVNoZWV0TGluZVJlY0lkLFxyXG4gICAgICB9KSxcclxuICAgIFtmaWxlSWQsIHJvdXRlT3JpZ2luLCByb3V0ZVNoZWV0SWQsIHJvdXRlU2hlZXRMaW5lUmVjSWRdXHJcbiAgKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghZXhwbGljaXRSZXR1cm5Db250ZXh0KSByZXR1cm47XHJcbiAgICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoZXhwbGljaXRSZXR1cm5Db250ZXh0KTtcclxuICB9LCBbZXhwbGljaXRSZXR1cm5Db250ZXh0XSk7XHJcblxyXG4gIHJldHVybiB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IHRpY2tldFJldHVybkNvbnRleHQgPSByZXNvbHZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoZmlsZUlkLCBleHBsaWNpdFJldHVybkNvbnRleHQpO1xyXG4gICAgY29uc3QgZGV0YWlsT3JpZ2luID0gdGlja2V0UmV0dXJuQ29udGV4dD8ub3JpZ2luIHx8IHJvdXRlT3JpZ2luO1xyXG4gICAgY29uc3QgY29udGV4dFNoZWV0SWQgPSB0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkIHx8IHJvdXRlU2hlZXRJZDtcclxuICAgIGNvbnN0IGNvbnRleHRMaW5lUmVjSWQgPSB0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldExpbmVSZWNJZCB8fCByb3V0ZVNoZWV0TGluZVJlY0lkO1xyXG4gICAgY29uc3QgaXNGcm9tRXhwZW5zZVNoZWV0Q3JlYXRlID0gZGV0YWlsT3JpZ2luID09PSBcInNoZWV0LWNyZWF0ZVwiO1xyXG4gICAgY29uc3QgaXNGcm9tRXhwZW5zZUxpbmUgPSBkZXRhaWxPcmlnaW4gPT09IFwiZXhwZW5zZS1saW5lXCIgJiYgISFjb250ZXh0U2hlZXRJZCAmJiAhIWNvbnRleHRMaW5lUmVjSWQ7XHJcbiAgICBjb25zdCBpc0Zyb21TaGVldExpbmsgPSBkZXRhaWxPcmlnaW4gPT09IFwic2hlZXQtbGlua1wiICYmICEhY29udGV4dFNoZWV0SWQ7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYXV0b0VkaXRNb2RlLFxyXG4gICAgICBkZXRhaWxPcmlnaW4sXHJcbiAgICAgIGNvbnRleHRTaGVldElkLFxyXG4gICAgICBjb250ZXh0TGluZVJlY0lkLFxyXG4gICAgICBpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUsXHJcbiAgICAgIGlzRnJvbUV4cGVuc2VMaW5lLFxyXG4gICAgICBpc0Zyb21TaGVldExpbmssXHJcbiAgICAgIHRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgICB9O1xyXG4gIH0sIFthdXRvRWRpdE1vZGUsIGV4cGxpY2l0UmV0dXJuQ29udGV4dCwgZmlsZUlkLCByb3V0ZU9yaWdpbiwgcm91dGVTaGVldElkLCByb3V0ZVNoZWV0TGluZVJlY0lkXSk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi8uLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlVGlja2V0U3RhdHVzTGFiZWwgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzL2V4cGVuc2VUaWNrZXRTdGF0dXNDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsRGlzcGxheUFyZ3MgPSB7XHJcbiAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbDtcclxuICBkcmFmdEdhc3RvVHlwZTogc3RyaW5nO1xuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xuICBkcmFmdFRpY2tldFRpbWU6IHN0cmluZztcbiAgZHJhZnRGaWxlTmFtZTogc3RyaW5nO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgZ2FzdG9UeXBlTGFiZWxNYXA6IE1hcDxzdHJpbmcsIHN0cmluZz47XG59O1xuXG5jb25zdCBmb3JtYXRFeHBlbnNlRGlzcGxheVRpbWUgPSAocmF3Pzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgdmFsdWUgPSBzYWZlVGV4dChyYXcpO1xuICBpZiAoIXZhbHVlIHx8IHZhbHVlID09PSBcIjBcIikgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3Qgc2Vjb25kc1ZhbHVlID0gTnVtYmVyKHZhbHVlKTtcbiAgaWYgKE51bWJlci5pc0ludGVnZXIoc2Vjb25kc1ZhbHVlKSAmJiBzZWNvbmRzVmFsdWUgPj0gMCAmJiBzZWNvbmRzVmFsdWUgPD0gODYzOTkpIHtcbiAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3Ioc2Vjb25kc1ZhbHVlIC8gMzYwMCk7XG4gICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY29uZHNWYWx1ZSAlIDM2MDApIC8gNjApO1xuICAgIGNvbnN0IHNlY29uZHMgPSBzZWNvbmRzVmFsdWUgJSA2MDtcbiAgICByZXR1cm4gW2hvdXJzLCBtaW51dGVzLCBzZWNvbmRzXS5tYXAoKGVudHJ5KSA9PiBTdHJpbmcoZW50cnkpLnBhZFN0YXJ0KDIsIFwiMFwiKSkuam9pbihcIjpcIik7XG4gIH1cblxuICBjb25zdCBtYXRjaCA9IHZhbHVlLm1hdGNoKC9eKFxcZHsxLDJ9KTooWzAtNV1cXGQpKD86OihbMC01XVxcZCkpPyQvKTtcbiAgaWYgKCFtYXRjaCkgcmV0dXJuIHZhbHVlO1xuXG4gIGNvbnN0IGhvdXJzID0gTnVtYmVyLnBhcnNlSW50KG1hdGNoWzFdIHx8IFwiXCIsIDEwKTtcbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGhvdXJzKSB8fCBob3VycyA8IDAgfHwgaG91cnMgPiAyMykgcmV0dXJuIHZhbHVlO1xuXG4gIHJldHVybiBgJHtTdHJpbmcoaG91cnMpLnBhZFN0YXJ0KDIsIFwiMFwiKX06JHttYXRjaFsyXX06JHttYXRjaFszXSB8fCBcIjAwXCJ9YDtcbn07XG5cbi8vIENlbnRyYWxpemVzIGRpc3BsYXktb25seSB2YWx1ZXMgc28gdGhlIHBhZ2UgY29udGFpbmVyIHN0YXlzIGZvY3VzZWQgb24gZmxvdyB3aXJpbmcuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXkgPSAoe1xuICBoZWFkZXIsXG4gIGRyYWZ0R2FzdG9UeXBlLFxuICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgZHJhZnRUcmFuc0RhdGUsXG4gIGRyYWZ0VGlja2V0VGltZSxcbiAgZHJhZnRGaWxlTmFtZSxcbiAgaXNFZGl0aW5nLFxuICBnYXN0b1R5cGVMYWJlbE1hcCxcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5QXJncykgPT4ge1xyXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgZmlyc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKSxcclxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXHJcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXHJcbiAgICAgIGxhc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIiksXHJcbiAgICB9KSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgcHJldmlld0FsdFRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gc2FmZVRleHQoaXNFZGl0aW5nID8gZHJhZnRGaWxlTmFtZSA6IGhlYWRlcj8uZmlsZU5hbWUpIHx8IGluZFQoXCJUaWNrZXRzX0ZpZWxkX0ZpbGVJZFwiLCBcIlRpY2tldFwiKSxcclxuICAgIFtkcmFmdEZpbGVOYW1lLCBoZWFkZXI/LmZpbGVOYW1lLCBpc0VkaXRpbmddXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc3RhdHVzTGFiZWwgPSB1c2VNZW1vKCgpID0+IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbChoZWFkZXI/LnN0YXR1cyksIFtoZWFkZXI/LnN0YXR1c10pO1xyXG5cclxuICBjb25zdCBnYXN0b1R5cGVMYWJlbCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgY3VycmVudEdhc3RvVHlwZSA9IGlzRWRpdGluZyA/IGRyYWZ0R2FzdG9UeXBlIDogaGVhZGVyPy5nYXN0b1R5cGUgPT09IG51bGwgPyBcIlwiIDogU3RyaW5nKGhlYWRlcj8uZ2FzdG9UeXBlID8/IFwiXCIpO1xyXG4gICAgaWYgKCFjdXJyZW50R2FzdG9UeXBlKSB7XHJcbiAgICAgIHJldHVybiBpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBnYXN0b1R5cGVMYWJlbE1hcC5nZXQoU3RyaW5nKGN1cnJlbnRHYXN0b1R5cGUpKSB8fCBTdHJpbmcoY3VycmVudEdhc3RvVHlwZSk7XHJcbiAgfSwgW2RyYWZ0R2FzdG9UeXBlLCBnYXN0b1R5cGVMYWJlbE1hcCwgaGVhZGVyPy5nYXN0b1R5cGUsIGlzRWRpdGluZ10pO1xyXG5cclxuICBjb25zdCB0b3RhbEFtb3VudFRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGhlYWRlcj8udG90YWxBbW91bnQgPz8gbnVsbCwgKGlzRWRpdGluZyA/IGRyYWZ0Q3VycmVuY3lDb2RlIDogaGVhZGVyPy5jdXJyZW5jeUNvZGUpIHx8IGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcclxuICAgIFtkcmFmdEN1cnJlbmN5Q29kZSwgaGVhZGVyPy5jdXJyZW5jeUNvZGUsIGhlYWRlcj8udG90YWxBbW91bnQsIGlzRWRpdGluZ11cclxuICApO1xyXG5cclxuICBjb25zdCB0cmFuc0RhdGVUZXh0ID0gdXNlTWVtbyhcbiAgICAoKSA9PiBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoaXNFZGl0aW5nID8gZHJhZnRUcmFuc0RhdGUgOiBoZWFkZXI/LnRpY2tldERhdGUgfHwgaGVhZGVyPy50cmFuc0RhdGUsIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiKSxcbiAgICBbZHJhZnRUcmFuc0RhdGUsIGhlYWRlcj8udGlja2V0RGF0ZSwgaGVhZGVyPy50cmFuc0RhdGUsIGlzRWRpdGluZ11cbiAgKTtcblxuICBjb25zdCB0aWNrZXRUaW1lVGV4dCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gZm9ybWF0RXhwZW5zZURpc3BsYXlUaW1lKGlzRWRpdGluZyA/IGRyYWZ0VGlja2V0VGltZSA6IGhlYWRlcj8udGlja2V0VGltZSksXG4gICAgW2RyYWZ0VGlja2V0VGltZSwgaGVhZGVyPy50aWNrZXRUaW1lLCBpc0VkaXRpbmddXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gICAgcHJldmlld0FsdFRleHQsXHJcbiAgICBzdGF0dXNMYWJlbCxcclxuICAgIGdhc3RvVHlwZUxhYmVsLFxuICAgIHRvdGFsQW1vdW50VGV4dCxcbiAgICB0cmFuc0RhdGVUZXh0LFxuICAgIHRpY2tldFRpbWVUZXh0LFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGVBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxFcnJvcjogc3RyaW5nO1xyXG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldFN0YXR1czogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBFbmNhcHN1bGF0ZXMgY29uZmlybSBtb2RhbCBzdGF0ZSBzbyB0aGUgcGFnZSBjb250YWluZXIgc3RheXMgZm9jdXNlZCBvbiBmbG93IHdpcmluZy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGUgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgbW9kYWxFcnJvcixcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIHNldFN0YXR1cyxcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZUFyZ3MpID0+IHtcclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcclxuICAgICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtLCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXNdKTtcclxuXHJcbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XHJcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcclxuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICFidXN5ICYmIG1vZGFsRXJyb3JcclxuICAgICAgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIilcclxuICAgICAgOiBtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZvaWQgaGFuZGxlTW9kYWxDb25maXJtKCk7XHJcbiAgfSwgW2J1c3ksIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtLCBtb2RhbEVycm9yXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBtb2RhbCxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gICAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICAgIG1vZGFsQ2FuY2VsVGV4dCxcclxuICAgIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgUmVmT2JqZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgYXBwZW5kRXhwZW5zZVRpY2tldFJldHVyblF1ZXJ5LFxyXG4gIGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsLFxyXG4gIHR5cGUgRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnNBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgY29udGV4dFNoZWV0SWQ6IHN0cmluZztcclxuICBpc0Zyb21TaGVldExpbms6IGJvb2xlYW47XHJcbiAgaGVhZGVyRXhwZW5zZVNoZWV0SWQ6IHN0cmluZztcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgY2FuT3BlblNhdmVDb25maXJtOiAoKSA9PiBib29sZWFuO1xyXG4gIGhhbmRsZVBlcnNpc3RIZWFkZXJEcmFmdDogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBieXBhc3NXb3JrZmxvd0d1YXJkOiBib29sZWFuO1xyXG4gIGxpbmVDb250YWluZXJSZWY6IFJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIG9wZW5QcmV2aWV3OiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xyXG4gIHRpY2tldFJldHVybkNvbnRleHQ/OiBFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCB8IG51bGw7XHJcbn07XHJcblxyXG4vLyBHcm91cHMgdGlja2V0IGRldGFpbCBuYXZpZ2F0aW9uIGFuZCBsaW5lLWNhcmQgaW50ZXJhY3Rpb25zIGJlaGluZCBzdGFibGUgY2FsbGJhY2tzLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBmaWxlSWQsXHJcbiAgY29udGV4dFNoZWV0SWQsXHJcbiAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gIGhlYWRlckV4cGVuc2VTaGVldElkLFxyXG4gIGlzRWRpdGluZyxcclxuICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgaGFuZGxlUGVyc2lzdEhlYWRlckRyYWZ0LFxyXG4gIGJ5cGFzc1dvcmtmbG93R3VhcmQsXHJcbiAgbGluZUNvbnRhaW5lclJlZixcclxuICBvcGVuUHJldmlldyxcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsSW50ZXJhY3Rpb25zQXJncykgPT4ge1xyXG4gIGNvbnN0IHBlcnNpc3RIZWFkZXJEcmFmdElmTmVlZGVkID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKCFpc0VkaXRpbmcpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjYW5PcGVuU2F2ZUNvbmZpcm0oKSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGhhbmRsZVBlcnNpc3RIZWFkZXJEcmFmdCgpO1xyXG4gIH0sIFtjYW5PcGVuU2F2ZUNvbmZpcm0sIGhhbmRsZVBlcnNpc3RIZWFkZXJEcmFmdCwgaXNFZGl0aW5nXSk7XHJcblxyXG4gIGNvbnN0IG9wZW5MaW5lRGV0YWlsID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAocmF3TGluZVJlY0lkOiBzdHJpbmcpID0+IHtcclxuICAgICAgaWYgKGlzRnJvbVNoZWV0TGluaykgcmV0dXJuO1xyXG4gICAgICBpZiAoYnVzeSkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBsaW5lUmVjSWQgPSBzYWZlVGV4dChyYXdMaW5lUmVjSWQpO1xyXG4gICAgICBpZiAoIWxpbmVSZWNJZCB8fCAhZmlsZUlkKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBzaG91bGRPcGVuSW5FZGl0TW9kZSA9IGlzRWRpdGluZztcclxuICAgICAgaWYgKHNob3VsZE9wZW5JbkVkaXRNb2RlKSB7XHJcbiAgICAgICAgY29uc3QgdXBkYXRlT2sgPSBhd2FpdCBwZXJzaXN0SGVhZGVyRHJhZnRJZk5lZWRlZCgpO1xyXG4gICAgICAgIGlmICghdXBkYXRlT2spIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgIGxpbmVSZWNJZCxcclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChzaG91bGRPcGVuSW5FZGl0TW9kZSkge1xyXG4gICAgICAgIHF1ZXJ5LnNldChcIm1vZGVcIiwgXCJlZGl0XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGFwcGVuZEV4cGVuc2VUaWNrZXRSZXR1cm5RdWVyeShxdWVyeSwgdGlja2V0UmV0dXJuQ29udGV4dCk7XHJcblxyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXRMaW5lRGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcclxuICAgICAgICBieXBhc3NHdWFyZE9uY2U6IHNob3VsZE9wZW5JbkVkaXRNb2RlIHx8IGJ5cGFzc1dvcmtmbG93R3VhcmQsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgYnVzeSxcclxuICAgICAgYnlwYXNzV29ya2Zsb3dHdWFyZCxcclxuICAgICAgZmlsZUlkLFxyXG4gICAgICBpc0VkaXRpbmcsXHJcbiAgICAgIGlzRnJvbVNoZWV0TGluayxcclxuICAgICAgcGVyc2lzdEhlYWRlckRyYWZ0SWZOZWVkZWQsXHJcbiAgICAgIHRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb3BlbkNyZWF0ZUxpbmVEZXRhaWwgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoaXNGcm9tU2hlZXRMaW5rKSByZXR1cm47XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuO1xyXG4gICAgaWYgKCFmaWxlSWQpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB1cGRhdGVPayA9IGF3YWl0IHBlcnNpc3RIZWFkZXJEcmFmdElmTmVlZGVkKCk7XHJcbiAgICBpZiAoIXVwZGF0ZU9rKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICBmaWxlSWQsXHJcbiAgICAgIG1vZGU6IFwiY3JlYXRlXCIsXHJcbiAgICB9KTtcclxuICAgIGFwcGVuZEV4cGVuc2VUaWNrZXRSZXR1cm5RdWVyeShxdWVyeSwgdGlja2V0UmV0dXJuQ29udGV4dCk7XHJcblxyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0TGluZURldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxyXG4gICAgICBieXBhc3NHdWFyZE9uY2U6IGlzRWRpdGluZyB8fCBieXBhc3NXb3JrZmxvd0d1YXJkLFxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGJ5cGFzc1dvcmtmbG93R3VhcmQsIGZpbGVJZCwgaXNFZGl0aW5nLCBpc0Zyb21TaGVldExpbmssIHBlcnNpc3RIZWFkZXJEcmFmdElmTmVlZGVkLCB0aWNrZXRSZXR1cm5Db250ZXh0XSk7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcclxuICAgICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xyXG4gICAgICBjb25zdCBjYXJkID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XHJcbiAgICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XHJcbiAgICAgIGlmICghbGluZUNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XHJcbiAgICAgIHJldHVybiBjYXJkO1xyXG4gICAgfSxcclxuICAgIFtsaW5lQ29udGFpbmVyUmVmXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG9wZW5GaWxlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgdm9pZCBvcGVuUHJldmlldygpO1xyXG4gIH0sIFtvcGVuUHJldmlld10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGlzRnJvbVNoZWV0TGluaykgcmV0dXJuO1xyXG4gICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dCh0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkIHx8IGhlYWRlckV4cGVuc2VTaGVldElkIHx8IGNvbnRleHRTaGVldElkKTtcclxuICAgIGlmICghc2FmZVNoZWV0SWQpIHJldHVybjtcclxuXHJcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChidWlsZEV4cGVuc2VTaGVldERldGFpbFVybChzYWZlU2hlZXRJZCksIHtcclxuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXHJcbiAgICB9KTtcclxuICB9LCBbY29udGV4dFNoZWV0SWQsIGhlYWRlckV4cGVuc2VTaGVldElkLCBpc0VkaXRpbmcsIGlzRnJvbVNoZWV0TGluaywgdGlja2V0UmV0dXJuQ29udGV4dF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgb3BlbkNyZWF0ZUxpbmVEZXRhaWwsXHJcbiAgICBvcGVuTGluZURldGFpbCxcclxuICAgIHJlc29sdmVDbGlja2FibGVDYXJkLFxyXG4gICAgb3BlbkZpbGUsXHJcbiAgICBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0LFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfSBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGhhc0V4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdTb3VyY2UgfSBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvZXhwZW5zZVRpY2tldFByZXZpZXdVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XHJcblxyXG5jb25zdCBoYXNSZWFsRXhwZW5zZVNoZWV0VmFsdWUgPSAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBzYWZlVGV4dCh2YWx1ZSkudG9Mb3dlckNhc2UoKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBmYWxzZTtcclxuICBpZiAobm9ybWFsaXplZCA9PT0gXCItXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIwXCIpIHJldHVybiBmYWxzZTtcclxuICBpZiAobm9ybWFsaXplZCA9PT0gXCJuL2FcIiB8fCBub3JtYWxpemVkID09PSBcIm5hXCIpIHJldHVybiBmYWxzZTtcclxuICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm1Qcm9wcyA9IHtcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXI7XHJcbiAgc3RhdHVzTGFiZWw6IHN0cmluZztcclxuICBnYXN0b1R5cGVMYWJlbDogc3RyaW5nO1xuICB0b3RhbEFtb3VudFRleHQ6IHN0cmluZztcbiAgdHJhbnNEYXRlVGV4dDogc3RyaW5nO1xuICB0aWNrZXRUaW1lVGV4dDogc3RyaW5nO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGdhc3RvVHlwZU9wdGlvbnM6IEFycmF5PHsgdmFsdWU6IHN0cmluZzsgdGV4dDogc3RyaW5nIH0+O1xyXG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcclxuICBkZXNjcmlwdGlvbkludmFsaWQ6IGJvb2xlYW47XHJcbiAgZGVzY3JpcHRpb25JbnB1dFJlZjogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIGRyYWZ0R2FzdG9UeXBlOiBzdHJpbmc7XHJcbiAgZ2FzdG9UeXBlSW52YWxpZDogYm9vbGVhbjtcclxuICBnYXN0b1R5cGVJbnB1dFJlZjogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZDogYm9vbGVhbjtcclxuICBjdXJyZW5jeUlucHV0UmVmOiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XG4gIGRyYWZ0VGlja2V0VGltZTogc3RyaW5nO1xuICBkcmFmdFVybEZpbGU6IHN0cmluZztcbiAgZHJhZnRGaWxlTmFtZTogc3RyaW5nO1xyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0VGlja2V0VGltZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uT3BlbkZpbGU6ICgpID0+IHZvaWQ7XG4gIG9uT3BlbkV4cGVuc2VTaGVldD86ICgpID0+IHZvaWQ7XHJcbiAgaGlkZU9wZW5GaWxlQWN0aW9uPzogYm9vbGVhbjtcclxufTtcclxuXHJcbi8vIFJlYWQtb25seSBhbmQgZWRpdGFibGUgaGVhZGVyIGZvcm0gZm9yIHRpY2tldCBkZXRhaWwuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtID0gKHtcclxuICBoZWFkZXIsXHJcbiAgc3RhdHVzTGFiZWwsXHJcbiAgZ2FzdG9UeXBlTGFiZWwsXG4gIHRvdGFsQW1vdW50VGV4dCxcbiAgdHJhbnNEYXRlVGV4dCxcbiAgdGlja2V0VGltZVRleHQsXG4gIGlzRWRpdGluZyxcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICBkZXNjcmlwdGlvbklucHV0UmVmLFxyXG4gIGRyYWZ0R2FzdG9UeXBlLFxyXG4gIGdhc3RvVHlwZUludmFsaWQsXHJcbiAgZ2FzdG9UeXBlSW5wdXRSZWYsXHJcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICBjdXJyZW5jeUlucHV0UmVmLFxuICBkcmFmdFRyYW5zRGF0ZSxcbiAgZHJhZnRUaWNrZXRUaW1lLFxuICBkcmFmdFVybEZpbGUsXG4gIGRyYWZ0RmlsZU5hbWUsXHJcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlLFxyXG4gIG9uRHJhZnRHYXN0b1R5cGVDaGFuZ2UsXHJcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZSxcbiAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZSxcbiAgb25EcmFmdFRpY2tldFRpbWVDaGFuZ2UsXG4gIG9uT3BlbkZpbGUsXG4gIG9uT3BlbkV4cGVuc2VTaGVldCxcclxuICBoaWRlT3BlbkZpbGVBY3Rpb24gPSBmYWxzZSxcclxufTogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm1Qcm9wcykgPT4ge1xyXG4gIGNvbnN0IHByZXZpZXdVcmwgPSBzYWZlVGV4dChpc0VkaXRpbmcgPyBkcmFmdFVybEZpbGUgOiBoZWFkZXIudXJsRmlsZSk7XHJcbiAgY29uc3QgY2FuT3BlbkZpbGUgPSBoYXNFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3U291cmNlKHByZXZpZXdVcmwpO1xyXG4gIGNvbnN0IHNob3dFeHBlbnNlU2hlZXRGaWVsZCA9IGhhc1JlYWxFeHBlbnNlU2hlZXRWYWx1ZShoZWFkZXIuaG9qYUdhc3Rvc0lkRGlzcGxheSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXppbmMtMjAwIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cclxuICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIil9XHJcbiAgICAgICAgICB2YWx1ZT17aGVhZGVyLmZpbGVJZCB8fCBcIi1cIn1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XHJcbiAgICAgICAgICB2YWx1ZT17c3RhdHVzTGFiZWwgfHwgXCItXCJ9XHJcbiAgICAgICAgLz5cclxuXHJcbiAgICAgICAge2lzRWRpdGluZyA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgcmVmPXtkZXNjcmlwdGlvbklucHV0UmVmfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCR7ZGVzY3JpcHRpb25JbnZhbGlkID8gXCIgYm9yZGVyLXJvc2UtNDAwIGJnLXJvc2UtNTAgZm9jdXM6Ym9yZGVyLXJvc2UtNDAwIGZvY3VzOnJpbmctcm9zZS0yMDBcIiA6IFwiXCJ9YH1cclxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnREZXNjcmlwdGlvbn1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxyXG4gICAgICAgICAgICAgIGFyaWEtaW52YWxpZD17ZGVzY3JpcHRpb25JbnZhbGlkID8gXCJ0cnVlXCIgOiBcImZhbHNlXCJ9XHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtoZWFkZXIuZGVzY3JpcHRpb24gfHwgXCItXCJ9XHJcbiAgICAgICAgICAgIGZ1bGxXaWR0aFxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApfVxyXG5cclxuICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cclxuICAgICAgICAgICAgb3B0aW9ucz17Z2FzdG9UeXBlT3B0aW9uc31cclxuICAgICAgICAgICAgdmFsdWU9e2RyYWZ0R2FzdG9UeXBlfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEdhc3RvVHlwZUNoYW5nZX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxyXG4gICAgICAgICAgICBpbnB1dFJlZj17Z2FzdG9UeXBlSW5wdXRSZWZ9XHJcbiAgICAgICAgICAgIGludmFsaWQ9e2dhc3RvVHlwZUludmFsaWR9XHJcbiAgICAgICAgICAgIHVzZVBvcnRhbFxyXG4gICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XHJcbiAgICAgICAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2dhc3RvVHlwZUxhYmVsIHx8IFwiLVwifVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApfVxyXG5cclxuICAgICAgICB7c2hvd0V4cGVuc2VTaGVldEZpZWxkID8gKFxyXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9FeHBlbnNlU2hlZXREaXNwbGF5XCIsIFwiRXhwZW5zZSBzaGVldFwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2hlYWRlci5ob2phR2FzdG9zSWREaXNwbGF5IHx8IFwiLVwifVxyXG4gICAgICAgICAgICBvbkNsaWNrPXtvbk9wZW5FeHBlbnNlU2hlZXR9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgPEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtkcmFmdEN1cnJlbmN5Q29kZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XHJcbiAgICAgICAgICAgIGludmFsaWQ9e2N1cnJlbmN5Q29kZUludmFsaWR9XHJcbiAgICAgICAgICAgIGlucHV0UmVmPXtjdXJyZW5jeUlucHV0UmVmfVxyXG4gICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLXRpY2tldC1kZXRhaWwtY3VycmVuY3lcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17aGVhZGVyLmN1cnJlbmN5Q29kZSB8fCBcIi1cIn1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKX1cclxuXHJcbiAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVG90YWxBbW91bnRcIiwgXCJUb3RhbCBhbW91bnRcIil9XHJcbiAgICAgICAgICB2YWx1ZT17dG90YWxBbW91bnRUZXh0IHx8IFwiLVwifVxyXG4gICAgICAgIC8+XHJcblxyXG4gICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpc2l0YS1maWVsZC10ZXh0XCI+XG4gICAgICAgICAgICA8U2luZ2xlRGF0ZVBpY2tlclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmllbGRfVGlja2V0RGF0ZVwiLCBcIlRpY2tldCBkYXRlXCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRUcmFuc0RhdGV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlfVxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmd9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogKFxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9UaWNrZXREYXRlXCIsIFwiVGlja2V0IGRhdGVcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXtcbiAgICAgICAgICAgICAgICB0cmFuc0RhdGVUZXh0IHx8XG4gICAgICAgICAgICAgICAgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGhlYWRlci50aWNrZXREYXRlIHx8IGhlYWRlci50cmFuc0RhdGUsIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiKSB8fFxuICAgICAgICAgICAgICAgIFwiLVwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cblxuICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIlRpY2tldHNfRmllbGRfVGlja2V0VGltZVwiLCBcIlRpY2tldCB0aW1lXCIpfTwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgdHlwZT1cInRpbWVcIlxuICAgICAgICAgICAgICBzdGVwPXsxfVxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRUaWNrZXRUaW1lfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0VGlja2V0VGltZUNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX1RpY2tldFRpbWVcIiwgXCJUaWNrZXQgdGltZVwiKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmllbGRfVGlja2V0VGltZVwiLCBcIlRpY2tldCB0aW1lXCIpfVxuICAgICAgICAgICAgdmFsdWU9e3RpY2tldFRpbWVUZXh0IHx8IFwiLVwifVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cblxyXG4gICAgICB7Y2FuT3BlbkZpbGUgJiYgIWhpZGVPcGVuRmlsZUFjdGlvbiA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1lbmRcIj5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIlxyXG4gICAgICAgICAgICBvbkNsaWNrPXtvbk9wZW5GaWxlfVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7aW5kVChcIlRpY2tldHNfRGV0YWlsX1ZpZXdBdHRhY2htZW50XCIsIFwiVmVyIGFkanVudG9cIil9XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZURhdGVQYXJ0cyB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgfSBmcm9tIFwiLi4vZXhwZW5zZUZvcm1hdHRlcnMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZU51bWJlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgZnJvbSBcIi4vRXhwZW5zZVNlY3Rpb25EaXZpZGVyLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpbWVsaW5lQ2FyZCBmcm9tIFwiLi9FeHBlbnNlVGltZWxpbmVDYXJkLnRzeFwiO1xyXG5cclxudHlwZSBQYWdpbmF0aW9uTGFiZWxzID0ge1xyXG4gIGZpcnN0OiBzdHJpbmc7XHJcbiAgcHJldjogc3RyaW5nO1xyXG4gIG5leHQ6IHN0cmluZztcclxuICBsYXN0OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXRMaW5lc0xpc3RQcm9wcyA9IHtcclxuICB2aXNpYmxlTGluZXM6IEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lW107XHJcbiAgdG90YWxMaW5lUGFnZXM6IG51bWJlcjtcclxuICBsaW5lUGFnZTogbnVtYmVyO1xyXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIHBhZ2luYXRpb25MYWJlbHM6IFBhZ2luYXRpb25MYWJlbHM7XHJcbiAgY29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBvbkxpbmVQYWdlQ2hhbmdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xyXG4gIG9uT3BlbkxpbmU6IChsaW5lUmVjSWQ6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdFF0eVZhbHVlID0gKHZhbHVlOiBudW1iZXIgfCBudWxsKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VOdW1iZXIodmFsdWUsIHtcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgIGZhbGxiYWNrOiBcIi1cIixcbiAgfSk7XG59O1xuXG5jb25zdCBFTVBUWV9EQVRFX1BBUlRTOiBFeHBlbnNlRGF0ZVBhcnRzID0ge1xuICB5ZWFyOiBcIi0tXCIsXG4gIG1vbnRoOiBcIi0tXCIsXG4gIGRheTogXCItLVwiLFxufTtcclxuXHJcbmNvbnN0IFRJQ0tFVF9MSU5FX0RBVEVfUEFORUxfSUNPTiA9IChcclxuICA8c3ZnXHJcbiAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxyXG4gICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgIHN0cm9rZVdpZHRoPVwiMVwiXHJcbiAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxyXG4gICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXHJcbiAgICBjbGFzc05hbWU9XCJzaXplLTEwIHRleHQtWyMwMDI5NmJlMF1cIlxuICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgPlxyXG4gICAgPHBhdGggc3Ryb2tlPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIiAvPlxyXG4gICAgPHBhdGggZD1cIk0xNCAzdjRhMSAxIDAgMCAwIDEgMWg0XCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMTcgMjFoLTEwYTIgMiAwIDAgMSAtMiAtMnYtMTRhMiAyIDAgMCAxIDIgLTJoN2w1IDV2MTFhMiAyIDAgMCAxIC0yIDJcIiAvPlxyXG4gICAgPHBhdGggZD1cIk05IDdsMSAwXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNOSAxM2w2IDBcIiAvPlxyXG4gICAgPHBhdGggZD1cIk0xMyAxN2wyIDBcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuLy8gVGlja2V0IGxpbmVzIHNlY3Rpb24gcmVuZGVyZWQgd2l0aCB0aW1lbGluZSBjYXJkcyBhbmQgcGFnaW5nIGNvbnRyb2xzLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0TGluZXNMaXN0ID0gKHtcclxuICB2aXNpYmxlTGluZXMsXHJcbiAgdG90YWxMaW5lUGFnZXMsXHJcbiAgbGluZVBhZ2UsXHJcbiAgY3VycmVuY3lDb2RlLFxyXG4gIHBhZ2luYXRpb25MYWJlbHMsXHJcbiAgY29udGFpbmVyUmVmLFxyXG4gIG9uTGluZVBhZ2VDaGFuZ2UsXHJcbiAgb25PcGVuTGluZSxcclxufTogRXhwZW5zZVRpY2tldExpbmVzTGlzdFByb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNwYWNlLXktMFwiPlxyXG4gICAgICA8RXhwZW5zZVNlY3Rpb25EaXZpZGVyIGxhYmVsPXtpbmRUKFwiVGlja2V0c19EZXRhaWxfTGluZXNcIiwgXCJMaW5lc1wiKX0gY2xhc3NOYW1lPVwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXItLXNwYWNlZFwiIC8+XHJcblxyXG4gICAgICB7dmlzaWJsZUxpbmVzLmxlbmd0aCA9PT0gMCA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveCB0aW1lbGluZS1lbXB0eVwiIGRhdGEtZW1wdHktdGV4dD17aW5kVChcIlRpY2tldHNfRGV0YWlsX05vTGluZXNcIiwgXCJObyBsaW5lcyBmb3IgdGhpcyB0aWNrZXQuXCIpfSAvPlxyXG4gICAgICApIDogKFxyXG4gICAgICAgIDxkaXYgcmVmPXtjb250YWluZXJSZWZ9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveFwiPlxyXG4gICAgICAgICAge3Zpc2libGVMaW5lcy5tYXAoKGxpbmUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYW1vdW50VGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShsaW5lLnRvdGFsQW1vdW50LCBjdXJyZW5jeUNvZGUpO1xuICAgICAgICAgICAgY29uc3QgcXR5VGV4dCA9IGZvcm1hdFF0eVZhbHVlKGxpbmUucXR5KTtcbiAgICAgICAgICAgIGNvbnN0IHByaWNlVGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShsaW5lLnByaWNlLCBjdXJyZW5jeUNvZGUpO1xuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBsaW5lLmRlc2NyaXB0aW9uIHx8IGxpbmUucmVjSWQgfHwgXCItXCI7XG4gICAgICAgICAgICBjb25zdCBwcmltYXJ5U3VidGl0bGVQYXJ0cyA9IFtcbiAgICAgICAgICAgICAgYCR7aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUXR5XCIsIFwiUXVhbnRpdHlcIil9OiAke3F0eVRleHR9YCxcbiAgICAgICAgICAgICAgYCR7aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJpY2VcIiwgXCJQcmljZVwiKX06ICR7cHJpY2VUZXh0fWAsXG4gICAgICAgICAgICBdLmZpbHRlcihCb29sZWFuKTtcbiAgICAgICAgICAgIGNvbnN0IHByaW1hcnlTdWJ0aXRsZSA9IHByaW1hcnlTdWJ0aXRsZVBhcnRzLmpvaW4oXCIgICBcIik7XG4gICAgICAgICAgICBjb25zdCBzdWJ0aXRsZSA9IHByaW1hcnlTdWJ0aXRsZTtcbiAgICAgICAgICAgIGNvbnN0IGxpbmVLZXkgPVxuICAgICAgICAgICAgICBTdHJpbmcobGluZS5yZWNJZCB8fCBcIlwiKS50cmltKCkgfHxcbiAgICAgICAgICAgICAgW2xpbmUuZGVzY3JpcHRpb24sIGxpbmUudG90YWxBbW91bnQsIGxpbmUucHJpY2UsIGxpbmUucXR5XVxuICAgICAgICAgICAgICAgIC5tYXAoKHZhbHVlKSA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpKVxuICAgICAgICAgICAgICAgIC5qb2luKFwifFwiKTtcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtsaW5lS2V5fSBjbGFzc05hbWU9XCJ0aW1lbGluZS1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxyXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e0VNUFRZX0RBVEVfUEFSVFN9XHJcbiAgICAgICAgICAgICAgICAgIGRhdGVQYW5lbENvbnRlbnQ9e1RJQ0tFVF9MSU5FX0RBVEVfUEFORUxfSUNPTn1cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgICAgICAgICAgIHN1YnRpdGxlPXtzdWJ0aXRsZX1cbiAgICAgICAgICAgICAgICAgIHN1YnRpdGxlQ2xhc3NOYW1lPVwiZXhwZW5zZS1zaGVldC1jYXJkX19zdWJ0aXRsZSBleHBlbnNlLWxpbmUtY2FyZF9fbWV0YSB0ZXh0LWxlZnRcIlxuICAgICAgICAgICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cbiAgICAgICAgICAgICAgICAgIG9uT3Blbj17KCkgPT4gb25PcGVuTGluZShsaW5lLnJlY0lkKX1cbiAgICAgICAgICAgICAgICAgIHRpdGxlQ2xhc3NOYW1lPVwidGltZWxpbmUtbmFtZSBleHBlbnNlLWxpbmUtY2FyZF9fdGl0bGUgdGV4dC1sZWZ0XCJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICA8Q29tcGFjdFBhZ2luYXRpb25cclxuICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbExpbmVQYWdlc31cclxuICAgICAgICBjdXJyZW50UGFnZT17bGluZVBhZ2V9XHJcbiAgICAgICAgb25QYWdlQ2hhbmdlPXtvbkxpbmVQYWdlQ2hhbmdlfVxyXG4gICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cclxuICAgICAgLz5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldExpbmVzTGlzdDtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBSZWZPYmplY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tIFwiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybS50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRMaW5lc0xpc3QgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmVzTGlzdC50c3hcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLCBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbCBmcm9tIFwiLi9FeHBlbnNlVGlja2V0UHJldmlld01vZGFsLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXcgZnJvbSBcIi4vRXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXcudHN4XCI7XHJcbmltcG9ydCB0eXBlIHsgVGlja2V0UHJldmlld1BvaW50IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldy50c1wiO1xyXG5cclxudHlwZSBQYWdpbmF0aW9uTGFiZWxzID0ge1xyXG4gIGZpcnN0OiBzdHJpbmc7XHJcbiAgcHJldjogc3RyaW5nO1xyXG4gIG5leHQ6IHN0cmluZztcclxuICBsYXN0OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3UHJvcHMgPSB7XHJcbiAgbW9kYWw6IHtcclxuICAgIG9wZW46IGJvb2xlYW47XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ6IHN0cmluZztcclxuICAgIGNhbmNlbFRleHQ6IHN0cmluZztcclxuICAgIGxvYWRpbmdUZXh0OiBzdHJpbmc7XHJcbiAgICBzaG93Q2FuY2VsOiBib29sZWFuO1xyXG4gICAgc2hvd0NvbmZpcm06IGJvb2xlYW47XHJcbiAgICBidXN5OiBib29sZWFuO1xyXG4gICAgZXJyb3I6IHN0cmluZztcclxuICAgIHN0YXR1czogc3RyaW5nO1xyXG4gICAgb25Db25maXJtOiAoKSA9PiB2b2lkO1xyXG4gICAgb25DYW5jZWw6ICgpID0+IHZvaWQ7XHJcbiAgfTtcclxuICBwcmV2aWV3OiB7XHJcbiAgICBvcGVuOiBib29sZWFuO1xyXG4gICAgYnVzeTogYm9vbGVhbjtcclxuICAgIGVycm9yOiBzdHJpbmc7XHJcbiAgICBpbWFnZVVybDogc3RyaW5nO1xyXG4gICAgaW1hZ2VBbHQ6IHN0cmluZztcclxuICAgIHNjYWxlOiBudW1iZXI7XHJcbiAgICB0cmFuc2xhdGU6IFRpY2tldFByZXZpZXdQb2ludDtcclxuICAgIHN1cmZhY2VSZWY6IFJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gICAgb25DbG9zZTogKCkgPT4gdm9pZDtcclxuICAgIG9uUG9pbnRlckRvd246IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICAgIG9uUG9pbnRlck1vdmU6IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICAgIG9uUG9pbnRlckVuZDogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gICAgb25XaGVlbDogKGV2ZW50OiBSZWFjdC5XaGVlbEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICB9O1xyXG4gIGNvbnRlbnQ6IHtcclxuICAgIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICAgIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbDtcclxuICAgIHNob3dTdGlja3lQcmV2aWV3OiBib29sZWFuO1xyXG4gICAgcHJldmlld0J1c3k6IGJvb2xlYW47XHJcbiAgICBwcmV2aWV3RXJyb3I6IHN0cmluZztcclxuICAgIHByZXZpZXdJbWFnZVVybDogc3RyaW5nO1xyXG4gICAgcHJldmlld0ZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgICBwcmV2aWV3QWx0VGV4dDogc3RyaW5nO1xyXG4gICAgb25PcGVuUHJldmlldzogKCkgPT4gdm9pZDtcclxuICAgIHN0YXR1c0xhYmVsOiBzdHJpbmc7XHJcbiAgICBnYXN0b1R5cGVMYWJlbDogc3RyaW5nO1xuICAgIHRvdGFsQW1vdW50VGV4dDogc3RyaW5nO1xuICAgIHRyYW5zRGF0ZVRleHQ6IHN0cmluZztcbiAgICB0aWNrZXRUaW1lVGV4dDogc3RyaW5nO1xuICAgIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgICBnYXN0b1R5cGVPcHRpb25zOiBBcnJheTx7IHZhbHVlOiBzdHJpbmc7IHRleHQ6IHN0cmluZyB9PjtcclxuICAgIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIGRlc2NyaXB0aW9uSW52YWxpZDogYm9vbGVhbjtcclxuICAgIGRlc2NyaXB0aW9uSW5wdXRSZWY6IFJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgICBkcmFmdEdhc3RvVHlwZTogc3RyaW5nO1xyXG4gICAgZ2FzdG9UeXBlSW52YWxpZDogYm9vbGVhbjtcclxuICAgIGdhc3RvVHlwZUlucHV0UmVmOiBSZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICAgIGN1cnJlbmN5Q29kZUludmFsaWQ6IGJvb2xlYW47XHJcbiAgICBjdXJyZW5jeUlucHV0UmVmOiBSZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xuICAgIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XG4gICAgZHJhZnRUaWNrZXRUaW1lOiBzdHJpbmc7XG4gICAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XG4gICAgZHJhZnRGaWxlTmFtZTogc3RyaW5nO1xyXG4gICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICAgIG9uRHJhZnRHYXN0b1R5cGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgb25EcmFmdFRpY2tldFRpbWVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICAgIG9uT3BlbkZpbGU6ICgpID0+IHZvaWQ7XG4gICAgb25PcGVuRXhwZW5zZVNoZWV0PzogKCkgPT4gdm9pZDtcclxuICAgIHZpc2libGVMaW5lczogRXhwZW5zZVRpY2tldERldGFpbExpbmVbXTtcclxuICAgIHRvdGFsTGluZVBhZ2VzOiBudW1iZXI7XHJcbiAgICBsaW5lUGFnZTogbnVtYmVyO1xyXG4gICAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgICBwYWdpbmF0aW9uTGFiZWxzOiBQYWdpbmF0aW9uTGFiZWxzO1xyXG4gICAgY29udGFpbmVyUmVmOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICAgIG9uTGluZVBhZ2VDaGFuZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XHJcbiAgICBvbk9wZW5MaW5lOiAobGluZVJlY0lkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICBzdGF0dXM6IHN0cmluZztcclxuICB9O1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyB0aGUgdGlja2V0IGRldGFpbCB2aWV3IHdoaWxlIHRoZSBwYWdlIGNvbnRhaW5lciBvd25zIG9yY2hlc3RyYXRpb24uXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3ID0gKHsgbW9kYWwsIHByZXZpZXcsIGNvbnRlbnQgfTogRXhwZW5zZVRpY2tldERldGFpbFZpZXdQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGRldGFpbEJvZHkgPSAoXHJcbiAgICA8PlxyXG4gICAgICA8RXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm1cclxuICAgICAgICBoZWFkZXI9e2NvbnRlbnQuaGVhZGVyfVxyXG4gICAgICAgIHN0YXR1c0xhYmVsPXtjb250ZW50LnN0YXR1c0xhYmVsfVxyXG4gICAgICAgIGdhc3RvVHlwZUxhYmVsPXtjb250ZW50Lmdhc3RvVHlwZUxhYmVsfVxyXG4gICAgICAgIHRvdGFsQW1vdW50VGV4dD17Y29udGVudC50b3RhbEFtb3VudFRleHR9XG4gICAgICAgIHRyYW5zRGF0ZVRleHQ9e2NvbnRlbnQudHJhbnNEYXRlVGV4dH1cbiAgICAgICAgdGlja2V0VGltZVRleHQ9e2NvbnRlbnQudGlja2V0VGltZVRleHR9XG4gICAgICAgIGlzRWRpdGluZz17Y29udGVudC5pc0VkaXRpbmd9XG4gICAgICAgIGdhc3RvVHlwZU9wdGlvbnM9e2NvbnRlbnQuZ2FzdG9UeXBlT3B0aW9uc31cclxuICAgICAgICBkcmFmdERlc2NyaXB0aW9uPXtjb250ZW50LmRyYWZ0RGVzY3JpcHRpb259XHJcbiAgICAgICAgZGVzY3JpcHRpb25JbnZhbGlkPXtjb250ZW50LmRlc2NyaXB0aW9uSW52YWxpZH1cclxuICAgICAgICBkZXNjcmlwdGlvbklucHV0UmVmPXtjb250ZW50LmRlc2NyaXB0aW9uSW5wdXRSZWZ9XHJcbiAgICAgICAgZHJhZnRHYXN0b1R5cGU9e2NvbnRlbnQuZHJhZnRHYXN0b1R5cGV9XHJcbiAgICAgICAgZ2FzdG9UeXBlSW52YWxpZD17Y29udGVudC5nYXN0b1R5cGVJbnZhbGlkfVxyXG4gICAgICAgIGdhc3RvVHlwZUlucHV0UmVmPXtjb250ZW50Lmdhc3RvVHlwZUlucHV0UmVmfVxyXG4gICAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlPXtjb250ZW50LmRyYWZ0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgIGN1cnJlbmN5Q29kZUludmFsaWQ9e2NvbnRlbnQuY3VycmVuY3lDb2RlSW52YWxpZH1cclxuICAgICAgICBjdXJyZW5jeUlucHV0UmVmPXtjb250ZW50LmN1cnJlbmN5SW5wdXRSZWZ9XG4gICAgICAgIGRyYWZ0VHJhbnNEYXRlPXtjb250ZW50LmRyYWZ0VHJhbnNEYXRlfVxuICAgICAgICBkcmFmdFRpY2tldFRpbWU9e2NvbnRlbnQuZHJhZnRUaWNrZXRUaW1lfVxuICAgICAgICBkcmFmdFVybEZpbGU9e2NvbnRlbnQuZHJhZnRVcmxGaWxlfVxuICAgICAgICBkcmFmdEZpbGVOYW1lPXtjb250ZW50LmRyYWZ0RmlsZU5hbWV9XHJcbiAgICAgICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlPXtjb250ZW50Lm9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZX1cclxuICAgICAgICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlPXtjb250ZW50Lm9uRHJhZnRHYXN0b1R5cGVDaGFuZ2V9XHJcbiAgICAgICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZT17Y29udGVudC5vbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlfVxuICAgICAgICBvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlPXtjb250ZW50Lm9uRHJhZnRUcmFuc0RhdGVDaGFuZ2V9XG4gICAgICAgIG9uRHJhZnRUaWNrZXRUaW1lQ2hhbmdlPXtjb250ZW50Lm9uRHJhZnRUaWNrZXRUaW1lQ2hhbmdlfVxuICAgICAgICBvbk9wZW5GaWxlPXtjb250ZW50Lm9uT3BlbkZpbGV9XG4gICAgICAgIG9uT3BlbkV4cGVuc2VTaGVldD17Y29udGVudC5vbk9wZW5FeHBlbnNlU2hlZXR9XHJcbiAgICAgICAgaGlkZU9wZW5GaWxlQWN0aW9uPXtjb250ZW50LnNob3dTdGlja3lQcmV2aWV3fVxyXG4gICAgICAvPlxyXG4gICAgICA8RXhwZW5zZVRpY2tldExpbmVzTGlzdFxyXG4gICAgICAgIHZpc2libGVMaW5lcz17Y29udGVudC52aXNpYmxlTGluZXN9XHJcbiAgICAgICAgdG90YWxMaW5lUGFnZXM9e2NvbnRlbnQudG90YWxMaW5lUGFnZXN9XHJcbiAgICAgICAgbGluZVBhZ2U9e2NvbnRlbnQubGluZVBhZ2V9XHJcbiAgICAgICAgY3VycmVuY3lDb2RlPXtjb250ZW50LmN1cnJlbmN5Q29kZX1cclxuICAgICAgICBwYWdpbmF0aW9uTGFiZWxzPXtjb250ZW50LnBhZ2luYXRpb25MYWJlbHN9XHJcbiAgICAgICAgY29udGFpbmVyUmVmPXtjb250ZW50LmNvbnRhaW5lclJlZn1cclxuICAgICAgICBvbkxpbmVQYWdlQ2hhbmdlPXtjb250ZW50Lm9uTGluZVBhZ2VDaGFuZ2V9XHJcbiAgICAgICAgb25PcGVuTGluZT17Y29udGVudC5vbk9wZW5MaW5lfVxyXG4gICAgICAvPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC16aW5jLTYwMFwiPntjb250ZW50LnN0YXR1c308L2Rpdj5cbiAgICA8Lz5cclxuICApO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cclxuICAgICAgPENvbmZpcm1Nb2RhbFxyXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XHJcbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxyXG4gICAgICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XHJcbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsLmNvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsLmNhbmNlbFRleHR9XHJcbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsLmxvYWRpbmdUZXh0fVxyXG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XHJcbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxyXG4gICAgICAgIGJ1c3k9e21vZGFsLmJ1c3l9XHJcbiAgICAgICAgZXJyb3I9e21vZGFsLmVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17bW9kYWwuc3RhdHVzfVxyXG4gICAgICAgIG9uQ29uZmlybT17bW9kYWwub25Db25maXJtfVxyXG4gICAgICAgIG9uQ2FuY2VsPXttb2RhbC5vbkNhbmNlbH1cclxuICAgICAgLz5cclxuICAgICAgPEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWxcclxuICAgICAgICBvcGVuPXtwcmV2aWV3Lm9wZW59XHJcbiAgICAgICAgYnVzeT17cHJldmlldy5idXN5fVxyXG4gICAgICAgIGVycm9yPXtwcmV2aWV3LmVycm9yfVxyXG4gICAgICAgIGltYWdlVXJsPXtwcmV2aWV3LmltYWdlVXJsfVxyXG4gICAgICAgIGltYWdlQWx0PXtwcmV2aWV3LmltYWdlQWx0fVxyXG4gICAgICAgIHNjYWxlPXtwcmV2aWV3LnNjYWxlfVxyXG4gICAgICAgIHRyYW5zbGF0ZT17cHJldmlldy50cmFuc2xhdGV9XHJcbiAgICAgICAgc3VyZmFjZVJlZj17cHJldmlldy5zdXJmYWNlUmVmfVxyXG4gICAgICAgIG9uQ2xvc2U9e3ByZXZpZXcub25DbG9zZX1cclxuICAgICAgICBvblBvaW50ZXJEb3duPXtwcmV2aWV3Lm9uUG9pbnRlckRvd259XHJcbiAgICAgICAgb25Qb2ludGVyTW92ZT17cHJldmlldy5vblBvaW50ZXJNb3ZlfVxyXG4gICAgICAgIG9uUG9pbnRlckVuZD17cHJldmlldy5vblBvaW50ZXJFbmR9XHJcbiAgICAgICAgb25XaGVlbD17cHJldmlldy5vbldoZWVsfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXppbmMtNzAwXCJcbiAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogY29udGVudC5pc0xvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XHJcbiAgICAgID5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIHNpemUtNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge2NvbnRlbnQuZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntjb250ZW50LmVycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxyXG5cclxuICAgICAgeyFjb250ZW50LmlzTG9hZGluZyAmJiAhY29udGVudC5lcnJvck1lc3NhZ2UgJiYgY29udGVudC5oZWFkZXIgPyAoXHJcbiAgICAgICAgY29udGVudC5zaG93U3RpY2t5UHJldmlldyA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBnYXAteS0yIGxnOmdyaWQtY29scy1bbWlubWF4KDAsMWZyKV8zMjBweF0gbGc6Z2FwLTRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXN0YXJ0LTJcIj5cclxuICAgICAgICAgICAgICA8RXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXdcclxuICAgICAgICAgICAgICAgIGJ1c3k9e2NvbnRlbnQucHJldmlld0J1c3l9XHJcbiAgICAgICAgICAgICAgICBlcnJvcj17Y29udGVudC5wcmV2aWV3RXJyb3J9XHJcbiAgICAgICAgICAgICAgICBpbWFnZVVybD17Y29udGVudC5wcmV2aWV3SW1hZ2VVcmx9XHJcbiAgICAgICAgICAgICAgICBpbWFnZUFsdD17Y29udGVudC5wcmV2aWV3QWx0VGV4dH1cclxuICAgICAgICAgICAgICAgIGZpbGVOYW1lPXtjb250ZW50LnByZXZpZXdGaWxlTmFtZX1cclxuICAgICAgICAgICAgICAgIG9uT3Blbj17Y29udGVudC5vbk9wZW5QcmV2aWV3fVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBsZzpjb2wtc3RhcnQtMSBsZzpyb3ctc3RhcnQtMVwiPntkZXRhaWxCb2R5fTwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIGRldGFpbEJvZHlcclxuICAgICAgICApXHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUgfSBmcm9tIFwiLi4vdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZS50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsLFxyXG4gIGJ1aWxkRXhwZW5zZVNoZWV0TGluZURldGFpbFVybCxcclxuICBidWlsZEV4cGVuc2VUaWNrZXRMaW5rVXJsLFxyXG4gIHR5cGUgRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHRvRXhwZW5zZUlzb0RhdGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb25BcmdzID0ge1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGRldGFpbE9yaWdpbjogc3RyaW5nO1xyXG4gIGhlYWRlclRyYW5zRGF0ZTogdW5rbm93bjtcclxuICBjb250ZXh0TGluZVJlY0lkPzogc3RyaW5nO1xyXG4gIHRpY2tldFJldHVybkNvbnRleHQ/OiBFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCB8IG51bGw7XHJcbiAgcmVhZENhY2hlZFN0YXRlOiAoKSA9PiBFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlIHwgbnVsbDtcclxuICBzYXZlQ2FjaGVkU3RhdGU6IChzdGF0ZTogRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIEtlZXBzIG5hdGl2ZSBiYWNrIG5hdmlnYXRpb24gYWxpZ25lZCB3aXRoIHRoZSB0aWNrZXQgZW50cnkgcG9pbnQgYW5kIHByZXNlcnZlcyBjYWNoZWQgbGluay1tb2RlIHN0YXRlLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uID0gKHtcclxuICBmaWxlSWQsXHJcbiAgZGV0YWlsT3JpZ2luLFxyXG4gIGhlYWRlclRyYW5zRGF0ZSxcclxuICBjb250ZXh0TGluZVJlY0lkLFxyXG4gIHRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgcmVhZENhY2hlZFN0YXRlLFxyXG4gIHNhdmVDYWNoZWRTdGF0ZSxcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uQXJncykgPT4ge1xyXG4gIGNvbnN0IHNob3VsZFJldHVyblRvVGlja2V0TGlzdCA9IHRpY2tldFJldHVybkNvbnRleHQ/Lm9yaWdpbiA9PT0gXCJzaGVldC1saW5rXCIgfHwgIXRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQ7XHJcblxyXG4gIGNvbnN0IG5hdGl2ZUJhY2tVcmwgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGlmICh0aWNrZXRSZXR1cm5Db250ZXh0Py5vcmlnaW4gPT09IFwic2hlZXQtbGlua1wiICYmIHRpY2tldFJldHVybkNvbnRleHQuc2hlZXRJZCkge1xyXG4gICAgICByZXR1cm4gYnVpbGRFeHBlbnNlVGlja2V0TGlua1VybCh0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aWNrZXRSZXR1cm5Db250ZXh0Py5vcmlnaW4gPT09IFwiZXhwZW5zZS1saW5lXCIgJiYgdGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkKSB7XHJcbiAgICAgIHJldHVybiBidWlsZEV4cGVuc2VTaGVldExpbmVEZXRhaWxVcmwodGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkLCB0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0TGluZVJlY0lkIHx8IGNvbnRleHRMaW5lUmVjSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkKSB7XHJcbiAgICAgIHJldHVybiBidWlsZEV4cGVuc2VTaGVldERldGFpbFVybCh0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkZXRhaWxPcmlnaW4gPT09IFwidGlja2V0LWNyZWF0ZVwiKSB7XHJcbiAgICAgIGNvbnN0IHRpY2tldERhdGUgPSB0b0V4cGVuc2VJc29EYXRlKGhlYWRlclRyYW5zRGF0ZSkgfHwgdG9FeHBlbnNlSXNvRGF0ZShuZXcgRGF0ZSgpKTtcclxuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICB0aWNrZXRGaWxlSWQ6IGZpbGVJZCxcclxuICAgICAgICB0aWNrZXREYXRlLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBgL0dhc3Rvcy9UaWNrZXRzPyR7cXVlcnkudG9TdHJpbmcoKX1gO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBcIi9HYXN0b3MvVGlja2V0c1wiO1xyXG4gIH0sIFtjb250ZXh0TGluZVJlY0lkLCBkZXRhaWxPcmlnaW4sIGZpbGVJZCwgaGVhZGVyVHJhbnNEYXRlLCB0aWNrZXRSZXR1cm5Db250ZXh0XSk7XHJcblxyXG4gIGNvbnN0IHJlYXJtRXhwZW5zZVRpY2tldHNSZXR1cm5TdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGNhY2hlZFN0YXRlID0gcmVhZENhY2hlZFN0YXRlKCk7XHJcbiAgICBpZiAoIWNhY2hlZFN0YXRlKSByZXR1cm47XHJcbiAgICBzYXZlQ2FjaGVkU3RhdGUoY2FjaGVkU3RhdGUpO1xyXG4gIH0sIFtyZWFkQ2FjaGVkU3RhdGUsIHNhdmVDYWNoZWRTdGF0ZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFmaWxlSWQpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBiYWNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxCYWNrQnRuXCIpO1xyXG4gICAgaWYgKCFiYWNrQnV0dG9uKSByZXR1cm47XHJcblxyXG4gICAgYmFja0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWJhY2stdXJsXCIsIG5hdGl2ZUJhY2tVcmwpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgYmFja0J1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLWJhY2stdXJsXCIpO1xyXG4gICAgfTtcclxuICB9LCBbZmlsZUlkLCBuYXRpdmVCYWNrVXJsXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZU5hdGl2ZUJhY2sgPSAoZXZlbnQ6IFBvcFN0YXRlRXZlbnQpID0+IHtcclxuICAgICAgaWYgKGV2ZW50Py5zdGF0ZSAmJiBldmVudC5zdGF0ZS5pbmRUcmFwID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBleGVjdXRlQmFja05hdmlnYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHNob3VsZFJldHVyblRvVGlja2V0TGlzdCkge1xyXG4gICAgICAgICAgcmVhcm1FeHBlbnNlVGlja2V0c1JldHVyblN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKG5hdGl2ZUJhY2tVcmwpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24oZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGV4ZWN1dGVCYWNrTmF2aWdhdGlvbigpO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGhhbmRsZU5hdGl2ZUJhY2spO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBoYW5kbGVOYXRpdmVCYWNrKTtcclxuICAgIH07XHJcbiAgfSwgW2ZpbGVJZCwgbmF0aXZlQmFja1VybCwgcmVhcm1FeHBlbnNlVGlja2V0c1JldHVyblN0YXRlLCBzaG91bGRSZXR1cm5Ub1RpY2tldExpc3RdKTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcudHNcIjtcclxuaW1wb3J0IHsgaGFzRXhwZW5zZVRpY2tldEltYWdlUHJldmlld1NvdXJjZSB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRQcmV2aWV3VXRpbHMudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdQYW5lbEFyZ3MgPSB7XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGRyYWZ0VXJsRmlsZTogc3RyaW5nO1xyXG4gIGhlYWRlclVybEZpbGU/OiBzdHJpbmcgfCBudWxsO1xyXG59O1xyXG5cclxuLy8gQ2VudHJhbGl6ZXMgc3RpY2t5LXByZXZpZXcgYXZhaWxhYmlsaXR5IGFuZCBpbWFnZSBsb2FkaW5nIGZvciB0aWNrZXQgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdQYW5lbCA9ICh7XHJcbiAgZmlsZUlkLFxyXG4gIGlzRWRpdGluZyxcclxuICBkcmFmdFVybEZpbGUsXHJcbiAgaGVhZGVyVXJsRmlsZSxcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdQYW5lbEFyZ3MpID0+IHtcclxuICBjb25zdCBwcmV2aWV3U291cmNlVXJsID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChpc0VkaXRpbmcgPyBkcmFmdFVybEZpbGUgOiBoZWFkZXJVcmxGaWxlKSwgW2RyYWZ0VXJsRmlsZSwgaGVhZGVyVXJsRmlsZSwgaXNFZGl0aW5nXSk7XHJcbiAgY29uc3Qgc2hvd1N0aWNreVByZXZpZXcgPSB1c2VNZW1vKCgpID0+IGhhc0V4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdTb3VyY2UocHJldmlld1NvdXJjZVVybCksIFtwcmV2aWV3U291cmNlVXJsXSk7XHJcbiAgY29uc3QgcHJldmlldyA9IHVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcoe1xyXG4gICAgZmlsZUlkLFxyXG4gICAgc291cmNlVXJsOiBwcmV2aWV3U291cmNlVXJsLFxyXG4gICAgZW5hYmxlZDogc2hvd1N0aWNreVByZXZpZXcsXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzaG93U3RpY2t5UHJldmlldyxcclxuICAgIC4uLnByZXZpZXcsXHJcbiAgfTtcclxu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Q0FBQztBQUFBLEVBQzNDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsT0FjTztBQUFBLEVBQ0wsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1AsVUFBVTtBQUFBLEVBQ1YsVUFBVTtBQUFBLEVBQ1YsT0FBTztBQUFBLEVBQ1AsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUFBLEVBQ1osU0FBUztBQUFBLEVBQ1QsZUFBZTtBQUFBLEVBQ2YsZUFBZTtBQUFBLEVBQ2YsY0FBYztBQUFBLEVBQ2QsU0FBUztBQUNYO0FBRUEsSUFBTSxzQ0FBc0MsQ0FBQztBQUFBLEVBQzNDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixPQW1ETztBQUFBLEVBQ0w7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7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QSxJQUNGO0FBQUEsSUFDQSxDQUFDLFVBQVU7QUFBQSxFQUNiO0FBRUEsU0FDRSw4RUFDRTtBQUFBLGlEQUFDLG1DQUF3QixPQUFPLFdBQVcsT0FBTyxTQUFTLFdBQVcsU0FBUyxTQUFTLFdBQVcsU0FBUztBQUFBLElBQzNHLFdBQVcsdUJBQ1Y7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVcsS0FBSyw2QkFBNkIsa0JBQWtCO0FBQUEsUUFDL0QsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsZUFBZSxLQUFLLDZCQUE2QixrQkFBa0I7QUFBQSxRQUNuRSxXQUFXO0FBQUE7QUFBQSxJQUNiLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLDBCQUEwQixNQUFNO0FBQ3BDLFNBQ0UsNkNBQUMsZ0NBQXFCLHlCQUF1QixNQUMzQyx1REFBQyxrQ0FBK0IsR0FDbEM7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLDRCQUE0QjtBQUNuRSxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLDJCQUF3QixDQUFFO0FBQ3REO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxrQ0FBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaG91cnMiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJob3VycyIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
