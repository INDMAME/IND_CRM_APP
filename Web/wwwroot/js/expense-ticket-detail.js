import {
  ExpenseTicketPreviewModal_default,
  ExpenseTicketStickyPreview_default,
  hasExpenseTicketImagePreviewSource,
  useExpenseTicketImagePreview
} from "./chunks/chunk-RQQHQZGV.js";
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
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-WWMKLEZS.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-VJQ4AT5D.js";
import "./chunks/chunk-HFIH26AP.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-WNGAZ2I2.js";
import {
  CompactPagination_default,
  FloatingActionButton_default,
  useTimelineCardEffects
} from "./chunks/chunk-2YXSM2RQ.js";
import "./chunks/chunk-YMDESVRK.js";
import "./chunks/chunk-XB6OXILH.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-FRTU3UIU.js";
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
} from "./chunks/chunk-PNQZXR4W.js";
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
} from "./chunks/chunk-FJXF5IDK.js";
import {
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
} from "./chunks/chunk-UNKHH33H.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-FZJKOUY3.js";
import {
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  toExpenseApiDdMmYyyy,
  toExpenseIsoDate
} from "./chunks/chunk-SRZDJTMJ.js";
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
      draftTicketTime,
      draftTransDate,
      draftUrlFile,
      fileId,
      isEditing,
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
        draftTransDate: content.draftTransDate,
        draftTicketTime: content.draftTicketTime,
        draftUrlFile: content.draftUrlFile,
        draftFileName: content.draftFileName,
        onDraftDescriptionChange: content.onDraftDescriptionChange,
        onDraftGastoTypeChange: content.onDraftGastoTypeChange,
        onDraftCurrencyCodeChange: content.onDraftCurrencyCodeChange,
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
  draftTransDate,
  draftTicketTime,
  draftUrlFile,
  draftFileName,
  onDraftDescriptionChange: setDraftDescription,
  onDraftGastoTypeChange: setDraftGastoType,
  onDraftCurrencyCodeChange: setDraftCurrencyCode,
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
  const gastoTypeOptions = (0, import_react11.useMemo)(() => {
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
      draftTransDate,
      draftTicketTime,
      draftUrlFile,
      draftFileName,
      setDraftDescription,
      setDraftGastoType,
      setDraftCurrencyCode,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFJvdXRlQ29udGV4dC50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5LnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZVNlY3Rpb24udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGluZXNMaXN0LnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL0V4cGVuc2VUaWNrZXREZXRhaWxWaWV3LnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24sIHsgdHlwZSBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCB7IHVzZUF1dGhDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XHJcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xyXG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XHJcbmltcG9ydCB7IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLCBuYXZpZ2F0ZVRvRXhwZW5zZVVybCwgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBpc01hbmFnaW5nT3RoZXJFeHBlbnNlVXNlciB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTWFuYWdlZFVzZXJTY29wZS50c1wiO1xyXG5pbXBvcnQgeyBtYXBXaW5kb3dFbnVtT3B0aW9ucywgdHlwZSBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB7IGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHJlYWRFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlIH0gZnJvbSBcIi4uL3VzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3IgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXkudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3IGZyb20gXCIuL0V4cGVuc2VUaWNrZXREZXRhaWxWaWV3LnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldExpbmtlZFNoZWV0TGluZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlIH0gZnJvbSBcIi4uL3VzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWwgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciwgRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuXHJcbmNvbnN0IEFMTE9XRURfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XHJcbmNvbnN0IExJTkVTX1BBR0VfU0laRSA9IDY7XHJcbmNvbnN0IEdBU1RPX1RZUEVfTEFCRUxfS0VZUzogUmVjb3JkPG51bWJlciwgeyBrZXk6IHN0cmluZzsgZmFsbGJhY2s6IHN0cmluZyB9PiA9IHtcclxuICAwOiB7IGtleTogXCJFbnVtX05vbmVcIiwgZmFsbGJhY2s6IFwiTm9uZVwiIH0sXHJcbiAgMTogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfUGVhamVcIiwgZmFsbGJhY2s6IFwiUGVhamVcIiB9LFxyXG4gIDI6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1BhcmtpbmdcIiwgZmFsbGJhY2s6IFwiUGFya2luZ1wiIH0sXHJcbiAgMzogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfS21cIiwgZmFsbGJhY2s6IFwiS21cIiB9LFxyXG4gIDQ6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0Rlc2F5dW5vXCIsIGZhbGxiYWNrOiBcIkRlc2F5dW5vXCIgfSxcclxuICA1OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9Db21pZGFcIiwgZmFsbGJhY2s6IFwiQ29taWRhXCIgfSxcclxuICA2OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9DZW5hXCIsIGZhbGxiYWNrOiBcIkNlbmFcIiB9LFxyXG4gIDc6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0hvdGVsXCIsIGZhbGxiYWNrOiBcIkhvdGVsXCIgfSxcclxuICA4OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9WYXJpb3NcIiwgZmFsbGJhY2s6IFwiVmFyaW9zXCIgfSxcclxuICAxNDogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfVGF4aVwiLCBmYWxsYmFjazogXCJUYXhpXCIgfSxcclxufTtcclxuXHJcbmNvbnN0IE5ld0xpbmVJY29uID0gKCkgPT4gKFxyXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwic2l6ZS01XCI+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0zIDE5YzMuMzMzIC0yIDUgLTQgNSAtNmMwIC0zIC0xIC0zIC0yIC0zcy0yLjAzMiAxLjA4NSAtMiAzYy4wMzQgMi4wNDggMS42NTggMi44NzcgMi41IDRjMS41IDIgMi41IDIuNSAzLjUgMWMuNjY3IC0xIDEuMTY3IC0xLjgzMyAxLjUgLTIuNWMxIDIuMzMzIDIuMzMzIDMuNSA0IDMuNWgyLjVcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMjAgMTd2LTEyYzAgLTEuMTIxIC0uODc5IC0yIC0yIC0ycy0yIC44NzkgLTIgMnYxMmwyIDJsMiAtMlwiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNiA3aDRcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgcGFnZWRTbGljZSA9IDxULD4oaXRlbXM6IFRbXSwgcGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKTogVFtdID0+IHtcclxuICBpZiAoIWl0ZW1zLmxlbmd0aCkgcmV0dXJuIFtdO1xyXG4gIGNvbnN0IHNhZmVQYWdlID0gTWF0aC5tYXgoMSwgcGFnZSk7XHJcbiAgY29uc3Qgc3RhcnQgPSAoc2FmZVBhZ2UgLSAxKSAqIHBhZ2VTaXplO1xyXG4gIHJldHVybiBpdGVtcy5zbGljZShzdGFydCwgc3RhcnQgKyBwYWdlU2l6ZSk7XHJcbn07XHJcblxyXG4vLyBJbml0aWFsaXplcyBhdXRoIHNlZWQgZm9yIGV4cGVuc2UgQVBJIGNhbGxzIGJlZm9yZSBpc2xhbmQgZWZmZWN0cyBydW4uXHJcbmNvbnN0IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoID0gKCkgPT4ge1xyXG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcclxuICAgIHRva2VuOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxyXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXHJcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEZhbGxiYWNrR2FzdG9UeXBlT3B0aW9ucyA9ICgpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xyXG4gIHJldHVybiBPYmplY3QuZW50cmllcyhHQVNUT19UWVBFX0xBQkVMX0tFWVMpXHJcbiAgICAubWFwKChbY29kZSwgY2ZnXSkgPT4gKHtcclxuICAgICAgdmFsdWU6IFN0cmluZyhjb2RlKSxcclxuICAgICAgdGV4dDogaW5kVChjZmcua2V5LCBjZmcuZmFsbGJhY2spLFxyXG4gICAgfSkpXHJcbiAgICAuc29ydCgobGVmdCwgcmlnaHQpID0+IE51bWJlcihsZWZ0LnZhbHVlKSAtIE51bWJlcihyaWdodC52YWx1ZSkpO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZUxpbmtlZFRpY2tldEJsb2NrZWRNZXNzYWdlID0gKGlzUGFpZDogYm9vbGVhbik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKGlzUGFpZCkge1xyXG4gICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9QYWlkUmVhZE9ubHlcIiwgXCJMYXMgaG9qYXMgZGUgZ2FzdG8gcGFnYWRhcyBzb24gZGUgc29sbyBsZWN0dXJhLlwiKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUmVhZE9ubHlCeVN0YXR1c1wiLCBcIk5vIHNlIHB1ZWRlIGVkaXRhciBlc3RhIGhvamEgZGUgZ2FzdG9zIGVuIGVsIGVzdGFkbyBhY3R1YWwuXCIpO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3ID0gKHtcclxuICBtb2RhbCxcclxuICBtb2RhbENvbmZpcm1UZXh0LFxyXG4gIG1vZGFsQ2FuY2VsVGV4dCxcclxuICBtb2RhbExvYWRpbmdUZXh0LFxyXG4gIGJ1c3ksXHJcbiAgbW9kYWxFcnJvcixcclxuICBzdGF0dXMsXHJcbiAgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtLFxyXG4gIGNsb3NlQ29uZmlybSxcclxufToge1xyXG4gIG1vZGFsOiB7XHJcbiAgICBvcGVuOiBib29sZWFuO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIHNob3dDYW5jZWw6IGJvb2xlYW47XHJcbiAgICBzaG93Q29uZmlybTogYm9vbGVhbjtcclxuICB9O1xyXG4gIG1vZGFsQ29uZmlybVRleHQ6IHN0cmluZztcclxuICBtb2RhbENhbmNlbFRleHQ6IHN0cmluZztcclxuICBtb2RhbExvYWRpbmdUZXh0OiBzdHJpbmc7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbEVycm9yOiBzdHJpbmc7XHJcbiAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtOiAoKSA9PiB2b2lkO1xyXG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcclxufSkgPT4gKHtcclxuICBvcGVuOiBtb2RhbC5vcGVuLFxyXG4gIHRpdGxlOiBtb2RhbC50aXRsZSxcclxuICBtZXNzYWdlOiBtb2RhbC5tZXNzYWdlLFxyXG4gIGNvbmZpcm1UZXh0OiBtb2RhbENvbmZpcm1UZXh0LFxyXG4gIGNhbmNlbFRleHQ6IG1vZGFsQ2FuY2VsVGV4dCxcclxuICBsb2FkaW5nVGV4dDogbW9kYWxMb2FkaW5nVGV4dCxcclxuICBzaG93Q2FuY2VsOiBtb2RhbC5zaG93Q2FuY2VsLFxyXG4gIHNob3dDb25maXJtOiBtb2RhbC5zaG93Q29uZmlybSxcclxuICBidXN5LFxyXG4gIGVycm9yOiBtb2RhbEVycm9yLFxyXG4gIHN0YXR1cyxcclxuICBvbkNvbmZpcm06IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcclxuICBvbkNhbmNlbDogY2xvc2VDb25maXJtLFxyXG59KTtcclxuXHJcbmNvbnN0IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3ID0gKHtcclxuICBwcmV2aWV3T3BlbixcclxuICBwcmV2aWV3QnVzeSxcclxuICBwcmV2aWV3RXJyb3IsXHJcbiAgcHJldmlld0ltYWdlVXJsLFxyXG4gIHByZXZpZXdBbHRUZXh0LFxyXG4gIHByZXZpZXdTY2FsZSxcclxuICBwcmV2aWV3VHJhbnNsYXRlLFxyXG4gIHByZXZpZXdTdXJmYWNlUmVmLFxyXG4gIGNsb3NlUHJldmlldyxcclxuICBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24sXHJcbiAgaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlLFxyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kLFxyXG4gIGhhbmRsZVByZXZpZXdXaGVlbCxcclxufToge1xyXG4gIHByZXZpZXdPcGVuOiBib29sZWFuO1xyXG4gIHByZXZpZXdCdXN5OiBib29sZWFuO1xyXG4gIHByZXZpZXdFcnJvcjogc3RyaW5nO1xyXG4gIHByZXZpZXdJbWFnZVVybDogc3RyaW5nO1xyXG4gIHByZXZpZXdBbHRUZXh0OiBzdHJpbmc7XHJcbiAgcHJldmlld1NjYWxlOiBudW1iZXI7XHJcbiAgcHJldmlld1RyYW5zbGF0ZTogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9O1xyXG4gIHByZXZpZXdTdXJmYWNlUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBjbG9zZVByZXZpZXc6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQ6IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICBoYW5kbGVQcmV2aWV3V2hlZWw6IChldmVudDogUmVhY3QuV2hlZWxFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbn0pID0+ICh7XHJcbiAgb3BlbjogcHJldmlld09wZW4sXHJcbiAgYnVzeTogcHJldmlld0J1c3ksXHJcbiAgZXJyb3I6IHByZXZpZXdFcnJvcixcclxuICBpbWFnZVVybDogcHJldmlld0ltYWdlVXJsLFxyXG4gIGltYWdlQWx0OiBwcmV2aWV3QWx0VGV4dCxcclxuICBzY2FsZTogcHJldmlld1NjYWxlLFxyXG4gIHRyYW5zbGF0ZTogcHJldmlld1RyYW5zbGF0ZSxcclxuICBzdXJmYWNlUmVmOiBwcmV2aWV3U3VyZmFjZVJlZixcclxuICBvbkNsb3NlOiBjbG9zZVByZXZpZXcsXHJcbiAgb25Qb2ludGVyRG93bjogaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gIG9uUG9pbnRlck1vdmU6IGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcclxuICBvblBvaW50ZXJFbmQ6IGhhbmRsZVByZXZpZXdQb2ludGVyRW5kLFxyXG4gIG9uV2hlZWw6IGhhbmRsZVByZXZpZXdXaGVlbCxcclxufSk7XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVWaWV3ID0ge1xyXG4gIHZpc2libGU6IGJvb2xlYW47XHJcbiAgcHJvamVjdElkOiBzdHJpbmc7XHJcbiAgaXNMb2FkaW5nOiBib29sZWFuO1xyXG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gIGRpc2FibGVkOiBib29sZWFuO1xyXG4gIG9uUHJvamVjdElkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbENvbnRlbnRWaWV3ID0gKHtcclxuICBpc0xvYWRpbmcsXHJcbiAgZXJyb3JNZXNzYWdlLFxyXG4gIGhlYWRlcixcclxuICBzaG93U3RpY2t5UHJldmlldyxcclxuICBwcmV2aWV3QnVzeSxcclxuICBwcmV2aWV3RXJyb3IsXHJcbiAgcHJldmlld0ltYWdlVXJsLFxyXG4gIHByZXZpZXdBbHRUZXh0LFxyXG4gIG9wZW5GaWxlLFxyXG4gIHN0YXR1c0xhYmVsLFxyXG4gIGdhc3RvVHlwZUxhYmVsLFxyXG4gIHRvdGFsQW1vdW50VGV4dCxcclxuICB0cmFuc0RhdGVUZXh0LFxyXG4gIHRpY2tldFRpbWVUZXh0LFxyXG4gIGlzRWRpdGluZyxcclxuICBnYXN0b1R5cGVPcHRpb25zLFxyXG4gIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgZGVzY3JpcHRpb25JbnZhbGlkLFxyXG4gIGRlc2NyaXB0aW9uSW5wdXRSZWYsXHJcbiAgZHJhZnRHYXN0b1R5cGUsXG4gIGdhc3RvVHlwZUludmFsaWQsXG4gIGdhc3RvVHlwZUlucHV0UmVmLFxuICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgY3VycmVuY3lDb2RlSW52YWxpZCxcbiAgY3VycmVuY3lJbnB1dFJlZixcbiAgZHJhZnRUcmFuc0RhdGUsXG4gIGRyYWZ0VGlja2V0VGltZSxcbiAgZHJhZnRVcmxGaWxlLFxuICBkcmFmdEZpbGVOYW1lLFxuICBzZXREcmFmdERlc2NyaXB0aW9uLFxuICBzZXREcmFmdEdhc3RvVHlwZSxcbiAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXG4gIGlzRnJvbVNoZWV0TGluayxcbiAgbGlua2VkTGluZSxcbiAgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCxcbiAgdmlzaWJsZUxpbmVzLFxyXG4gIHRvdGFsTGluZVBhZ2VzLFxyXG4gIGxpbmVQYWdlLFxyXG4gIHNhZmVDdXJyZW5jeUNvZGUsXHJcbiAgcGFnaW5hdGlvbkxhYmVscyxcclxuICBsaW5lQ29udGFpbmVyUmVmLFxyXG4gIHNldExpbmVQYWdlLFxyXG4gIG9wZW5MaW5lRGV0YWlsLFxyXG4gIHN0YXR1cyxcclxufToge1xyXG4gIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xyXG4gIHNob3dTdGlja3lQcmV2aWV3OiBib29sZWFuO1xyXG4gIHByZXZpZXdCdXN5OiBib29sZWFuO1xyXG4gIHByZXZpZXdFcnJvcjogc3RyaW5nO1xyXG4gIHByZXZpZXdJbWFnZVVybDogc3RyaW5nO1xyXG4gIHByZXZpZXdBbHRUZXh0OiBzdHJpbmc7XHJcbiAgb3BlbkZpbGU6ICgpID0+IHZvaWQ7XHJcbiAgc3RhdHVzTGFiZWw6IHN0cmluZztcclxuICBnYXN0b1R5cGVMYWJlbDogc3RyaW5nO1xyXG4gIHRvdGFsQW1vdW50VGV4dDogc3RyaW5nO1xyXG4gIHRyYW5zRGF0ZVRleHQ6IHN0cmluZztcclxuICB0aWNrZXRUaW1lVGV4dDogc3RyaW5nO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBnYXN0b1R5cGVPcHRpb25zOiBFeHBlbnNlU2VsZWN0T3B0aW9uW107XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uSW52YWxpZDogYm9vbGVhbjtcclxuICBkZXNjcmlwdGlvbklucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIGRyYWZ0R2FzdG9UeXBlOiBzdHJpbmc7XG4gIGdhc3RvVHlwZUludmFsaWQ6IGJvb2xlYW47XG4gIGdhc3RvVHlwZUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBjdXJyZW5jeUNvZGVJbnZhbGlkOiBib29sZWFuO1xuICBjdXJyZW5jeUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xuICBkcmFmdFRpY2tldFRpbWU6IHN0cmluZztcbiAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XG4gIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcbiAgc2V0RHJhZnREZXNjcmlwdGlvbjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldERyYWZ0R2FzdG9UeXBlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0RHJhZnRDdXJyZW5jeUNvZGU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBpc0Zyb21TaGVldExpbms6IGJvb2xlYW47XG4gIGxpbmtlZExpbmU6IEV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVWaWV3O1xuICBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0OiAoKSA9PiB2b2lkO1xuICB2aXNpYmxlTGluZXM6IEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lW107XHJcbiAgdG90YWxMaW5lUGFnZXM6IG51bWJlcjtcclxuICBsaW5lUGFnZTogbnVtYmVyO1xyXG4gIHNhZmVDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBwYWdpbmF0aW9uTGFiZWxzOiB7XHJcbiAgICBmaXJzdDogc3RyaW5nO1xyXG4gICAgcHJldjogc3RyaW5nO1xyXG4gICAgbmV4dDogc3RyaW5nO1xyXG4gICAgbGFzdDogc3RyaW5nO1xyXG4gIH07XHJcbiAgbGluZUNvbnRhaW5lclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgc2V0TGluZVBhZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XHJcbiAgb3BlbkxpbmVEZXRhaWw6IChsaW5lUmVjSWQ6IHN0cmluZykgPT4gdm9pZDtcclxuICBzdGF0dXM6IHN0cmluZztcclxufSkgPT4gKHtcclxuICBpc0xvYWRpbmcsXHJcbiAgZXJyb3JNZXNzYWdlLFxyXG4gIGhlYWRlcixcclxuICBzaG93U3RpY2t5UHJldmlldyxcclxuICBwcmV2aWV3QnVzeSxcclxuICBwcmV2aWV3RXJyb3IsXHJcbiAgcHJldmlld0ltYWdlVXJsLFxyXG4gIHByZXZpZXdGaWxlTmFtZTogcHJldmlld0FsdFRleHQsXHJcbiAgcHJldmlld0FsdFRleHQsXHJcbiAgb25PcGVuUHJldmlldzogb3BlbkZpbGUsXHJcbiAgc3RhdHVzTGFiZWwsXHJcbiAgZ2FzdG9UeXBlTGFiZWwsXHJcbiAgdG90YWxBbW91bnRUZXh0LFxyXG4gIHRyYW5zRGF0ZVRleHQsXHJcbiAgdGlja2V0VGltZVRleHQsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkZXNjcmlwdGlvbkludmFsaWQsXHJcbiAgZGVzY3JpcHRpb25JbnB1dFJlZixcclxuICBkcmFmdEdhc3RvVHlwZSxcbiAgZ2FzdG9UeXBlSW52YWxpZCxcbiAgZ2FzdG9UeXBlSW5wdXRSZWYsXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICBjdXJyZW5jeUNvZGVJbnZhbGlkLFxuICBjdXJyZW5jeUlucHV0UmVmLFxuICBkcmFmdFRyYW5zRGF0ZSxcbiAgZHJhZnRUaWNrZXRUaW1lLFxuICBkcmFmdFVybEZpbGUsXG4gIGRyYWZ0RmlsZU5hbWUsXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogc2V0RHJhZnREZXNjcmlwdGlvbixcbiAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZTogc2V0RHJhZnRHYXN0b1R5cGUsXG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6IHNldERyYWZ0Q3VycmVuY3lDb2RlLFxuICBvbk9wZW5GaWxlOiBvcGVuRmlsZSxcbiAgb25PcGVuRXhwZW5zZVNoZWV0OiBpc0Zyb21TaGVldExpbmsgPyB1bmRlZmluZWQgOiBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0LFxyXG4gIGxpbmtlZExpbmUsXHJcbiAgdmlzaWJsZUxpbmVzLFxyXG4gIHRvdGFsTGluZVBhZ2VzLFxyXG4gIGxpbmVQYWdlLFxyXG4gIGN1cnJlbmN5Q29kZTogc2FmZUN1cnJlbmN5Q29kZSxcclxuICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gIGNvbnRhaW5lclJlZjogbGluZUNvbnRhaW5lclJlZixcclxuICBvbkxpbmVQYWdlQ2hhbmdlOiBzZXRMaW5lUGFnZSxcclxuICBvbk9wZW5MaW5lOiBvcGVuTGluZURldGFpbCxcclxuICBzdGF0dXMsXHJcbn0pO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3QXJncyA9IFBhcmFtZXRlcnM8dHlwZW9mIGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbE1vZGFsVmlldz5bMF07XHJcbnR5cGUgRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3QXJncyA9IFBhcmFtZXRlcnM8dHlwZW9mIGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3PlswXTtcclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXdBcmdzID0gUGFyYW1ldGVyczx0eXBlb2YgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXc+WzBdO1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUGFnZVZpZXdNb2RlbCA9ICh7XHJcbiAgbW9kYWxBcmdzLFxyXG4gIHByZXZpZXdBcmdzLFxyXG4gIGNvbnRlbnRBcmdzLFxyXG59OiB7XHJcbiAgbW9kYWxBcmdzOiBFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3QXJncztcclxuICBwcmV2aWV3QXJnczogRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3QXJncztcclxuICBjb250ZW50QXJnczogRXhwZW5zZVRpY2tldERldGFpbENvbnRlbnRWaWV3QXJncztcclxufSkgPT4gKHtcclxuICBtb2RhbDogYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3KG1vZGFsQXJncyksXHJcbiAgcHJldmlldzogYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1ZpZXcocHJldmlld0FyZ3MpLFxyXG4gIGNvbnRlbnQ6IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbENvbnRlbnRWaWV3KGNvbnRlbnRBcmdzKSxcclxufSk7XHJcblxyXG4vLyBLZWVwcyBmaWx0ZXIgY2FjaGUgd2lyaW5nIGFuZCBiYWNrIG5hdmlnYXRpb24gb3V0c2lkZSB0aGUgcGFnZSBjb250YWluZXIgYm9keS5cclxuY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbE5hdmlnYXRpb25TdGF0ZSA9ICh7XHJcbiAgZmlsZUlkLFxyXG4gIGRldGFpbE9yaWdpbixcclxuICBoZWFkZXJUcmFuc0RhdGUsXHJcbiAgY29udGV4dExpbmVSZWNJZCxcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG59OiB7XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgZGV0YWlsT3JpZ2luOiBzdHJpbmc7XHJcbiAgaGVhZGVyVHJhbnNEYXRlOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xyXG4gIGNvbnRleHRMaW5lUmVjSWQ6IHN0cmluZztcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0OiBSZXR1cm5UeXBlPHR5cGVvZiB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0PltcInRpY2tldFJldHVybkNvbnRleHRcIl07XHJcbn0pID0+IHtcclxuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgc2F2ZUNhY2hlZFN0YXRlLCBtYXJrUmVzZXRGaWx0ZXJzUmV0dXJuLCBjbGVhckNhY2hlZFN0YXRlIH0gPSB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlKCk7XHJcblxyXG4gIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxCYWNrTmF2aWdhdGlvbih7XHJcbiAgICBmaWxlSWQsXHJcbiAgICBkZXRhaWxPcmlnaW4sXHJcbiAgICBoZWFkZXJUcmFuc0RhdGUsXHJcbiAgICBjb250ZXh0TGluZVJlY0lkLFxyXG4gICAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxuICAgIHJlYWRDYWNoZWRTdGF0ZSxcclxuICAgIHNhdmVDYWNoZWRTdGF0ZSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG1hcmtSZXNldEZpbHRlcnNSZXR1cm4sXHJcbiAgICBjbGVhckNhY2hlZFN0YXRlLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBSdW5zIHRoZSBvbmUtc2hvdCBhdXRvIGVkaXQgdHJhbnNpdGlvbiBmb3IgbGlua2VkIGNvbnRleHRzIGFmdGVyIGRldGFpbCBkYXRhIGlzIHJlYWR5LlxyXG5jb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQXV0b0VkaXQgPSAoe1xyXG4gIGF1dG9FZGl0TW9kZSxcclxuICBpc0Zyb21TaGVldExpbmssXHJcbiAgaXNMb2FkaW5nLFxyXG4gIGhlYWRlcixcclxuICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gIGNhbkF0dGVtcHRBdXRvRWRpdCxcclxufToge1xyXG4gIGF1dG9FZGl0TW9kZTogYm9vbGVhbjtcclxuICBpc0Zyb21TaGVldExpbms6IGJvb2xlYW47XHJcbiAgaXNMb2FkaW5nOiBib29sZWFuO1xyXG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw7XHJcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcclxuICBjYW5BdHRlbXB0QXV0b0VkaXQ6IGJvb2xlYW47XHJcbn0pID0+IHtcclxuICBjb25zdCBhdXRvRWRpdEF0dGVtcHRlZFJlZiA9IHVzZVJlZihmYWxzZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWF1dG9FZGl0TW9kZSB8fCBpc0Zyb21TaGVldExpbmsgfHwgYXV0b0VkaXRBdHRlbXB0ZWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgaWYgKGlzTG9hZGluZyB8fCAhaGVhZGVyIHx8ICFjYW5BdHRlbXB0QXV0b0VkaXQpIHJldHVybjtcclxuXHJcbiAgICBhdXRvRWRpdEF0dGVtcHRlZFJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQoKTtcclxuICB9LCBbYXV0b0VkaXRNb2RlLCBjYW5BdHRlbXB0QXV0b0VkaXQsIGhhbmRsZUVuYWJsZUVkaXQsIGhlYWRlciwgaXNGcm9tU2hlZXRMaW5rLCBpc0xvYWRpbmddKTtcclxufTtcclxuXHJcbi8vIFJlc29sdmVzIHBlcm1pc3Npb24gYW5kIGFjdGluZy11c2VyIHN0YXRlIHNvIHRoZSBwYWdlIGNvbnRhaW5lciBzdGF5cyBmb2N1c2VkIG9uIG9yY2hlc3RyYXRpb24uXHJcbmNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQZXJtaXNzaW9uU3RhdGUgPSAoKSA9PiB7XHJcbiAgY29uc3Qge1xyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gIH0gPSB1c2VBdXRoQ29udGV4dCgpO1xyXG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiVmlld1wiKTtcclxuICBjb25zdCBjYW5FZGl0VGlja2V0QnlNb2R1bGUgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIkVkaXRcIik7XHJcbiAgY29uc3QgY2FuRGVsZXRlVGlja2V0QnlNb2R1bGUgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIkZ1bGxBY2Nlc3NcIik7XHJcbiAgY29uc3QgaXNNYW5hZ2luZ090aGVyVXNlciA9IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VVc2VyKHtcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBjYW5FZGl0VGlja2V0OiBjYW5FZGl0VGlja2V0QnlNb2R1bGUgJiYgIWlzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICBjYW5EZWxldGVUaWNrZXQ6IGNhbkRlbGV0ZVRpY2tldEJ5TW9kdWxlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gT3ducyB0aGUgdGlja2V0IGRldGFpbCBwYWdlIG9yY2hlc3RyYXRpb24gd2hpbGUgdGhlIGNvbXBvbmVudCBzdGF5cyB0aGluIGZvciByZW5kZXJpbmcuXHJcbmNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQYWdlVmlld01vZGVsID0gKCkgPT4ge1xyXG4gIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfVElDS0VUX0ZJTEVfSURfXyk7XHJcbiAgY29uc3QgbGluZUNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHtcclxuICAgIGF1dG9FZGl0TW9kZSxcclxuICAgIGRldGFpbE9yaWdpbixcclxuICAgIGNvbnRleHRTaGVldElkLFxyXG4gICAgY29udGV4dExpbmVSZWNJZCxcclxuICAgIGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSxcclxuICAgIGlzRnJvbUV4cGVuc2VMaW5lLFxyXG4gICAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gICAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxuICB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbFJvdXRlQ29udGV4dCgpO1xyXG4gIGNvbnN0IHtcclxuICAgIGhhc0FjY2VzcyxcclxuICAgIGNhbkVkaXRUaWNrZXQsXHJcbiAgICBjYW5EZWxldGVUaWNrZXQsXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQZXJtaXNzaW9uU3RhdGUoKTtcclxuICBjb25zdCBnYXN0b1R5cGVPcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KCgpID0+IHtcclxuICAgIGNvbnN0IHNvdXJjZSA9IEFycmF5LmlzQXJyYXkod2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fKSA/IHdpbmRvdy5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXyA6IFtdO1xyXG4gICAgY29uc3QgbWFwcGVkID0gbWFwV2luZG93RW51bU9wdGlvbnMoc291cmNlKS5maWx0ZXIoKGVudHJ5KSA9PiB7XHJcbiAgICAgIGNvbnN0IHBhcnNlZCA9IE51bWJlcihlbnRyeS52YWx1ZSk7XHJcbiAgICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgQUxMT1dFRF9HQVNUT19UWVBFUy5oYXMocGFyc2VkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChtYXBwZWQubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gbWFwcGVkLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiBOdW1iZXIobGVmdC52YWx1ZSkgLSBOdW1iZXIocmlnaHQudmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYnVpbGRGYWxsYmFja0dhc3RvVHlwZU9wdGlvbnMoKTtcclxuICB9LCBbXSk7XHJcbiAgY29uc3QgZ2FzdG9UeXBlTGFiZWxNYXAgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XHJcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBnYXN0b1R5cGVPcHRpb25zKSB7XHJcbiAgICAgIG1hcC5zZXQoU3RyaW5nKG9wdGlvbi52YWx1ZSksIG9wdGlvbi50ZXh0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBtYXA7XHJcbiAgfSwgW2dhc3RvVHlwZU9wdGlvbnNdKTtcclxuICBjb25zdCB7IGhlYWRlciwgbGluZXMsIGlzTG9hZGluZywgZXJyb3JNZXNzYWdlLCByZWxvYWREZXRhaWwgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZSh7XHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBmaWxlSWQsXHJcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICB9KTtcclxuICBjb25zdCBsaW5rZWRFeHBlbnNlU2hlZXRJZCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBzYWZlVGV4dCh0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkIHx8IGNvbnRleHRTaGVldElkIHx8IGhlYWRlcj8uaG9qYUdhc3Rvc0lkRGlzcGxheSksXHJcbiAgICBbY29udGV4dFNoZWV0SWQsIGhlYWRlcj8uaG9qYUdhc3Rvc0lkRGlzcGxheSwgdGlja2V0UmV0dXJuQ29udGV4dF1cclxuICApO1xyXG4gIGNvbnN0IGxpbmtlZFNoZWV0TGluZSA9IHVzZUV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmUoe1xyXG4gICAgZW5hYmxlZDogaXNGcm9tRXhwZW5zZUxpbmUsXHJcbiAgICBzaGVldElkOiBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICAgIGxpbmVSZWNJZDogY29udGV4dExpbmVSZWNJZCxcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gIH0pO1xyXG4gIGNvbnN0IHtcclxuICAgIGxpbmtTaGVldExvY2tlZCxcclxuICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlLFxyXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0TGlua1NoZWV0R2F0ZSh7XHJcbiAgICBpc0xpbmtNb2RlOiAhIWxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gICAgbGlua1NoZWV0SWQ6IGxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gICAgY2FuUHJvY2Vzc0xpbmtNb2RlOiB0cnVlLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgcmVzb2x2ZUJsb2NrZWRNZXNzYWdlOiByZXNvbHZlTGlua2VkVGlja2V0QmxvY2tlZE1lc3NhZ2UsXHJcbiAgfSk7XHJcbiAgY29uc3QgW3NoZWV0U3luY0Jsb2NrZWQsIHNldFNoZWV0U3luY0Jsb2NrZWRdID0gdXNlU3RhdGUoKCkgPT4gISFyZWFkRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKGZpbGVJZCkpO1xyXG4gIGNvbnN0IFtzaGVldFN5bmNCbG9ja2VkTWVzc2FnZSwgc2V0U2hlZXRTeW5jQmxvY2tlZE1lc3NhZ2VdID0gdXNlU3RhdGUoKCkgPT5cclxuICAgIHNhZmVUZXh0KHJlYWRFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoZmlsZUlkKT8ubWVzc2FnZSlcclxuICApO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgc3luY1N0YXRlID0gcmVhZEV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZShmaWxlSWQpO1xyXG4gICAgc2V0U2hlZXRTeW5jQmxvY2tlZCghIXN5bmNTdGF0ZSk7XHJcbiAgICBzZXRTaGVldFN5bmNCbG9ja2VkTWVzc2FnZShzYWZlVGV4dChzeW5jU3RhdGU/Lm1lc3NhZ2UpKTtcclxuICB9LCBbZmlsZUlkXSk7XHJcblxyXG4gIGNvbnN0IHBlbmRpbmdGaXJzdExpbmsgPVxyXG4gICAgZGV0YWlsT3JpZ2luID09PSBcInNoZWV0LWNyZWF0ZVwiICYmICEhc2FmZVRleHQodGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCB8fCBjb250ZXh0U2hlZXRJZCkgJiYgIXNhZmVUZXh0KGhlYWRlcj8uaG9qYUdhc3Rvc0lkRGlzcGxheSk7XHJcbiAgY29uc3Qgc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSA9IHBlbmRpbmdGaXJzdExpbmtcclxuICAgID8gaW5kVChcIkV4cGVuc2VUaWNrZXRzX1NoZWV0U3luY19QZW5kaW5nU2F2ZVJlcXVpcmVkXCIsIFwiU2F2ZSB0aGUgdGlja2V0IGJlZm9yZSBsZWF2aW5nIHRoaXMgZmxvdy5cIilcclxuICAgIDogc2hlZXRTeW5jQmxvY2tlZE1lc3NhZ2UgfHxcclxuICAgICAgaW5kVChcclxuICAgICAgICBcIkV4cGVuc2VUaWNrZXRzX1NoZWV0U3luY19SZXRyeVJlcXVpcmVkXCIsXHJcbiAgICAgICAgXCJUaWNrZXQgZGF0YSBjaGFuZ2VkLCBidXQgd2UgY291bGQgbm90IHN5bmMgdGhlIGV4cGVuc2UgbGluZS4gU2F2ZSBhZ2FpbiBiZWZvcmUgbGVhdmluZy5cIlxyXG4gICAgICApO1xyXG4gIGNvbnN0IHNob3VsZEJsb2NrV29ya2Zsb3dFeGl0ID0gcGVuZGluZ0ZpcnN0TGluayB8fCBzaGVldFN5bmNCbG9ja2VkO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFzaG91bGRCbG9ja1dvcmtmbG93RXhpdCkge1xyXG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoe1xyXG4gICAgICBhY3RpdmU6IHRydWUsXHJcbiAgICAgIG1lc3NhZ2U6IHNoZWV0V29ya2Zsb3dCbG9ja01lc3NhZ2UsXHJcbiAgICAgIGJsb2NrOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcclxuICAgIH07XHJcbiAgfSwgW3NoZWV0V29ya2Zsb3dCbG9ja01lc3NhZ2UsIHNob3VsZEJsb2NrV29ya2Zsb3dFeGl0XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBiYWNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxCYWNrQnRuXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcclxuICAgIGlmICghYmFja0J1dHRvbikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHByZXZpb3VzRGlzYWJsZWQgPSBiYWNrQnV0dG9uLmRpc2FibGVkO1xyXG4gICAgaWYgKHBlbmRpbmdGaXJzdExpbmspIHtcclxuICAgICAgYmFja0J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgIGJhY2tCdXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCBcInRydWVcIik7XHJcbiAgICB9IGVsc2UgaWYgKCFwcmV2aW91c0Rpc2FibGVkKSB7XHJcbiAgICAgIGJhY2tCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgYmFja0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIFwiZmFsc2VcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgYmFja0J1dHRvbi5kaXNhYmxlZCA9IHByZXZpb3VzRGlzYWJsZWQ7XHJcbiAgICAgIGJhY2tCdXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCBwcmV2aW91c0Rpc2FibGVkID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIpO1xyXG4gICAgfTtcclxuICB9LCBbcGVuZGluZ0ZpcnN0TGlua10pO1xyXG5cclxuICBjb25zdCB7IG1hcmtSZXNldEZpbHRlcnNSZXR1cm4sIGNsZWFyQ2FjaGVkU3RhdGUgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxOYXZpZ2F0aW9uU3RhdGUoe1xyXG4gICAgZmlsZUlkLFxyXG4gICAgZGV0YWlsT3JpZ2luLFxyXG4gICAgaGVhZGVyVHJhbnNEYXRlOiBoZWFkZXI/LnRyYW5zRGF0ZSxcclxuICAgIGNvbnRleHRMaW5lUmVjSWQsXHJcbiAgICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIH0pO1xyXG4gIGNvbnN0IGNhbkVkaXRMaW5rZWRUaWNrZXQgPSAhbGlua2VkRXhwZW5zZVNoZWV0SWQgfHwgKCFsaW5rU2hlZXRDaGVja0J1c3kgJiYgIWxpbmtTaGVldExvY2tlZCk7XHJcbiAgY29uc3QgYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCA9IGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSB8fCAoISFsaW5rZWRFeHBlbnNlU2hlZXRJZCAmJiBjYW5FZGl0TGlua2VkVGlja2V0KTtcclxuICBjb25zdCB7XHJcbiAgICBidXN5LFxyXG4gICAgc3RhdHVzLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxFcnJvcixcclxuICAgIGxpbmVQYWdlLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICAgIGRlc2NyaXB0aW9uSW5wdXRSZWYsXHJcbiAgICBkcmFmdEdhc3RvVHlwZSxcbiAgICBnYXN0b1R5cGVJbnZhbGlkLFxuICAgIGdhc3RvVHlwZUlucHV0UmVmLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGN1cnJlbmN5Q29kZUludmFsaWQsXG4gICAgY3VycmVuY3lJbnB1dFJlZixcbiAgICBkcmFmdFRyYW5zRGF0ZSxcbiAgICBkcmFmdFRpY2tldFRpbWUsXG4gICAgZHJhZnRDb21lbnRhcmlvLFxuICAgIGRyYWZ0VXJsRmlsZSxcbiAgICBkcmFmdEZpbGVOYW1lLFxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxuICAgIHNldERyYWZ0R2FzdG9UeXBlLFxuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbEVkaXRvcih7XHJcbiAgICBoZWFkZXIsXHJcbiAgICBsaW5lQ291bnQ6IGxpbmVzLmxlbmd0aCxcclxuICAgIHBhZ2VTaXplOiBMSU5FU19QQUdFX1NJWkUsXHJcbiAgICBjYW5FZGl0VGlja2V0OiBjYW5FZGl0VGlja2V0ICYmIGNhbkVkaXRMaW5rZWRUaWNrZXQsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0LFxyXG4gICAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXHJcbiAgfSk7XHJcbiAgY29uc3QgaGFuZGxlRW5hYmxlRWRpdEluQ29udGV4dCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChsaW5rU2hlZXRDaGVja0J1c3kpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsaW5rZWRFeHBlbnNlU2hlZXRJZCAmJiBsaW5rU2hlZXRMb2NrZWQpIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9XHJcbiAgICAgICAgc2FmZVRleHQobGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UpIHx8XHJcbiAgICAgICAgcmVzb2x2ZUxpbmtlZFRpY2tldEJsb2NrZWRNZXNzYWdlKGZhbHNlKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCgpO1xyXG4gIH0sIFtcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBsaW5rU2hlZXRCbG9ja2VkTWVzc2FnZSxcclxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcclxuICAgIGxpbmtTaGVldExvY2tlZCxcclxuICAgIGxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFN0YXR1cyxcclxuICBdKTtcclxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0SW5Db250ZXh0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCgpO1xyXG4gICAgbGlua2VkU2hlZXRMaW5lLnJlc2V0RHJhZnRQcm9qZWN0SWQoKTtcclxuICB9LCBbaGFuZGxlQ2FuY2VsRWRpdCwgbGlua2VkU2hlZXRMaW5lLnJlc2V0RHJhZnRQcm9qZWN0SWRdKTtcclxuICBjb25zdCB7IHBhZ2luYXRpb25MYWJlbHMsIHByZXZpZXdBbHRUZXh0LCBzdGF0dXNMYWJlbCwgZ2FzdG9UeXBlTGFiZWwsIHRvdGFsQW1vdW50VGV4dCwgdHJhbnNEYXRlVGV4dCwgdGlja2V0VGltZVRleHQgfSA9XHJcbiAgICB1c2VFeHBlbnNlVGlja2V0RGV0YWlsRGlzcGxheSh7XHJcbiAgICAgIGhlYWRlcixcbiAgICAgIGRyYWZ0R2FzdG9UeXBlLFxuICAgICAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgICBkcmFmdFRyYW5zRGF0ZSxcbiAgICAgIGRyYWZ0VGlja2V0VGltZSxcbiAgICAgIGRyYWZ0RmlsZU5hbWUsXG4gICAgICBpc0VkaXRpbmcsXG4gICAgICBnYXN0b1R5cGVMYWJlbE1hcCxcbiAgICB9KTtcclxuICBjb25zdCB7XHJcbiAgICBzaG93U3RpY2t5UHJldmlldyxcclxuICAgIHByZXZpZXdPcGVuLFxyXG4gICAgcHJldmlld0J1c3ksXHJcbiAgICBwcmV2aWV3RXJyb3IsXHJcbiAgICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgICBwcmV2aWV3U2NhbGUsXHJcbiAgICBwcmV2aWV3VHJhbnNsYXRlLFxyXG4gICAgcHJldmlld1N1cmZhY2VSZWYsXHJcbiAgICBvcGVuUHJldmlldyxcclxuICAgIGNsb3NlUHJldmlldyxcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kLFxyXG4gICAgaGFuZGxlUHJldmlld1doZWVsLFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsKHtcclxuICAgIGZpbGVJZCxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGRyYWZ0VXJsRmlsZSxcclxuICAgIGhlYWRlclVybEZpbGU6IGhlYWRlcj8udXJsRmlsZSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgdmlzaWJsZUxpbmVzID0gdXNlTWVtbygoKSA9PiBwYWdlZFNsaWNlKGxpbmVzLCBsaW5lUGFnZSwgTElORVNfUEFHRV9TSVpFKSwgW2xpbmVQYWdlLCBsaW5lc10pO1xyXG4gIGNvbnN0IHRvdGFsTGluZVBhZ2VzID0gTWF0aC5jZWlsKChsaW5lcy5sZW5ndGggfHwgMCkgLyBMSU5FU19QQUdFX1NJWkUpO1xyXG5cclxuICB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQXV0b0VkaXQoe1xyXG4gICAgYXV0b0VkaXRNb2RlLFxyXG4gICAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgaGVhZGVyLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdDogaGFuZGxlRW5hYmxlRWRpdEluQ29udGV4dCxcclxuICAgIGNhbkF0dGVtcHRBdXRvRWRpdDogIWxpbmtTaGVldENoZWNrQnVzeSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBoYW5kbGVVcGRhdGUsIGhhbmRsZVBlcnNpc3RIZWFkZXJEcmFmdCwgaGFuZGxlRGVsZXRlIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zKHtcclxuICAgIGJ1c3ksXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBjYW5FZGl0VGlja2V0OiBjYW5FZGl0VGlja2V0ICYmIGNhbkVkaXRMaW5rZWRUaWNrZXQsXHJcbiAgICBjYW5EZWxldGVUaWNrZXQ6IGNhbkRlbGV0ZVRpY2tldCAmJiBjYW5FZGl0TGlua2VkVGlja2V0LFxyXG4gICAgZmlsZUlkLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICBkcmFmdEdhc3RvVHlwZSxcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBkcmFmdFRyYW5zRGF0ZSxcbiAgICBkcmFmdFRpY2tldFRpbWUsXG4gICAgZHJhZnRDb21lbnRhcmlvLFxuICAgIGRyYWZ0VXJsRmlsZSxcbiAgICBkcmFmdEZpbGVOYW1lLFxyXG4gICAgbGlua2VkRXhwZW5zZVNoZWV0SWQsXHJcbiAgICBsaW5rZWRFeHBlbnNlTGluZVJlY0lkOiBpc0Zyb21FeHBlbnNlTGluZSA/IGNvbnRleHRMaW5lUmVjSWQgOiBcIlwiLFxyXG4gICAgbGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWQ6IGxpbmtlZFNoZWV0TGluZS5kcmFmdFByb2plY3RJZCxcclxuICAgIGxpbmtlZEV4cGVuc2VMaW5lUHJvamVjdElkQ2hhbmdlZDogaXNGcm9tRXhwZW5zZUxpbmUgJiYgbGlua2VkU2hlZXRMaW5lLnByb2plY3RJZENoYW5nZWQsXHJcbiAgICBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQ6IGlzRnJvbUV4cGVuc2VMaW5lICYmIGxpbmtlZEV4cGVuc2VTaGVldElkICYmIGNvbnRleHRMaW5lUmVjSWRcclxuICAgICAgPyB7XHJcbiAgICAgICAgICBzaGVldElkOiBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICAgICAgICAgIGxpbmVSZWNJZDogY29udGV4dExpbmVSZWNJZCxcclxuICAgICAgICB9XHJcbiAgICAgIDogbnVsbCxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIG9uTGlua2VkU2hlZXRTeW5jRmFpbHVyZTogKG1lc3NhZ2UpID0+IHtcclxuICAgICAgc2V0U2hlZXRTeW5jQmxvY2tlZCh0cnVlKTtcclxuICAgICAgc2V0U2hlZXRTeW5jQmxvY2tlZE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgIH0sXHJcbiAgICBvbkxpbmtlZFNoZWV0U3luY1N1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgc2V0U2hlZXRTeW5jQmxvY2tlZChmYWxzZSk7XHJcbiAgICAgIHNldFNoZWV0U3luY0Jsb2NrZWRNZXNzYWdlKFwiXCIpO1xyXG4gICAgICBsaW5rZWRTaGVldExpbmUuYWNjZXB0RHJhZnRQcm9qZWN0SWQoKTtcclxuICAgIH0sXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgbW9kYWxMb2FkaW5nVGV4dCwgbW9kYWxDYW5jZWxUZXh0LCBtb2RhbENvbmZpcm1UZXh0LCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gfSA9XHJcbiAgICB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQ29uZmlybVN0YXRlKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgbW9kYWxFcnJvcixcclxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgfSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXNoZWV0U3luY0Jsb2NrZWQgfHwgYnVzeSkgcmV0dXJuO1xyXG4gICAgaWYgKCFzaGVldFdvcmtmbG93QmxvY2tNZXNzYWdlKSByZXR1cm47XHJcbiAgICBpZiAoc3RhdHVzID09PSBzaGVldFdvcmtmbG93QmxvY2tNZXNzYWdlKSByZXR1cm47XHJcbiAgICBzZXRTdGF0dXMoc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSk7XHJcbiAgfSwgW2J1c3ksIHNldFN0YXR1cywgc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSwgc2hlZXRTeW5jQmxvY2tlZCwgc3RhdHVzXSk7XHJcblxyXG4gIGNvbnN0IGlzQXNzaWduZWRUaWNrZXQgPSBoZWFkZXI/LnN0YXR1cyA9PT0gMTtcclxuICBjb25zdCBpc0NvbnRleHRMb2NrZWQgPSAoaXNBc3NpZ25lZFRpY2tldCAmJiAhYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCkgfHwgKCEhbGlua2VkRXhwZW5zZVNoZWV0SWQgJiYgbGlua1NoZWV0TG9ja2VkKTtcclxuICBjb25zdCBjYW5FZGl0VGlja2V0SW5Db250ZXh0ID0gY2FuRWRpdFRpY2tldCAmJiBjYW5FZGl0TGlua2VkVGlja2V0ICYmICFpc0Zyb21TaGVldExpbms7XHJcbiAgY29uc3QgY2FuQ3JlYXRlVGlja2V0TGluZUluQ29udGV4dCA9IGNhbkVkaXRUaWNrZXRJbkNvbnRleHQgJiYgIWlzQ29udGV4dExvY2tlZCAmJiAhc2hlZXRTeW5jQmxvY2tlZDtcclxuICBjb25zdCBjYW5EZWxldGVUaWNrZXRJbkNvbnRleHQgPSBjYW5EZWxldGVUaWNrZXQgJiYgY2FuRWRpdExpbmtlZFRpY2tldCAmJiAhaXNGcm9tU2hlZXRMaW5rO1xyXG4gIGNvbnN0IHRpY2tldFRvcGJhckFjdGlvbk1vZGU6IFwiZGVmYXVsdFwiIHwgXCJzYXZlX29ubHlcIiB8IFwidmlld19vbmx5XCIgPVxyXG4gICAgcGVuZGluZ0ZpcnN0TGluayAmJiBpc0VkaXRpbmdcclxuICAgICAgPyBcInNhdmVfb25seVwiXHJcbiAgICAgIDogIWNhbkVkaXRUaWNrZXRJbkNvbnRleHQgJiYgIWNhbkRlbGV0ZVRpY2tldEluQ29udGV4dFxyXG4gICAgICAgID8gXCJ2aWV3X29ubHlcIlxyXG4gICAgICAgIDogXCJkZWZhdWx0XCI7XHJcblxyXG4gIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zKHtcclxuICAgIGJ1c3ksXHJcbiAgICBtb2RhbE9wZW46IG1vZGFsLm9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0xvY2tlZDogaXNDb250ZXh0TG9ja2VkLFxyXG4gICAgYWN0aW9uTW9kZTogdGlja2V0VG9wYmFyQWN0aW9uTW9kZSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHk6IG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICAgIGNhbkVkaXRUaWNrZXQ6IGNhbkVkaXRUaWNrZXRJbkNvbnRleHQsXHJcbiAgICBjYW5EZWxldGVUaWNrZXQ6IGNhbkRlbGV0ZVRpY2tldEluQ29udGV4dCxcclxuICAgIGZpbGVJZCxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0OiBoYW5kbGVFbmFibGVFZGl0SW5Db250ZXh0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdDogaGFuZGxlQ2FuY2VsRWRpdEluQ29udGV4dCxcclxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICAgIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgaWYgKChpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUgfHwgaXNGcm9tRXhwZW5zZUxpbmUpICYmIGxpbmtlZEV4cGVuc2VTaGVldElkKSB7XHJcbiAgICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xyXG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsKGxpbmtlZEV4cGVuc2VTaGVldElkKSwge1xyXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdm9pZCByZWxvYWREZXRhaWwoKTtcclxuICAgIH0sXHJcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgaWYgKHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQpIHtcclxuICAgICAgICBjbGVhckNhY2hlZFN0YXRlKCk7XHJcbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwodGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkKSwge1xyXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbWFya1Jlc2V0RmlsdGVyc1JldHVybigpO1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvVGlja2V0c1wiLCB7XHJcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBvcGVuQ3JlYXRlTGluZURldGFpbCwgb3BlbkxpbmVEZXRhaWwsIHJlc29sdmVDbGlja2FibGVDYXJkLCBvcGVuRmlsZSwgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCB9ID1cclxuICAgIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMoe1xyXG4gICAgYnVzeSxcclxuICAgIGZpbGVJZCxcclxuICAgIGNvbnRleHRTaGVldElkOiBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICAgIGlzRnJvbVNoZWV0TGluayxcclxuICAgIGhlYWRlckV4cGVuc2VTaGVldElkOiBzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZERpc3BsYXkpLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlUGVyc2lzdEhlYWRlckRyYWZ0LFxyXG4gICAgYnlwYXNzV29ya2Zsb3dHdWFyZDogc2hvdWxkQmxvY2tXb3JrZmxvd0V4aXQsXHJcbiAgICBsaW5lQ29udGFpbmVyUmVmLFxyXG4gICAgb3BlblByZXZpZXcsXHJcbiAgICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIH0pO1xyXG5cclxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcclxuICAgIGNvbnRhaW5lclJlZjogbGluZUNvbnRhaW5lclJlZixcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGl0ZW1zOiB2aXNpYmxlTGluZXMsXHJcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZGV0YWlsVmlldyA9IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbFBhZ2VWaWV3TW9kZWwoe1xyXG4gICAgbW9kYWxBcmdzOiB7XHJcbiAgICAgIG1vZGFsLFxyXG4gICAgICBtb2RhbENvbmZpcm1UZXh0LFxyXG4gICAgICBtb2RhbENhbmNlbFRleHQsXHJcbiAgICAgIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG1vZGFsRXJyb3IsXHJcbiAgICAgIHN0YXR1cyxcclxuICAgICAgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtLFxyXG4gICAgICBjbG9zZUNvbmZpcm0sXHJcbiAgICB9LFxyXG4gICAgcHJldmlld0FyZ3M6IHtcclxuICAgICAgcHJldmlld09wZW4sXHJcbiAgICAgIHByZXZpZXdCdXN5LFxyXG4gICAgICBwcmV2aWV3RXJyb3IsXHJcbiAgICAgIHByZXZpZXdJbWFnZVVybCxcclxuICAgICAgcHJldmlld0FsdFRleHQsXHJcbiAgICAgIHByZXZpZXdTY2FsZSxcclxuICAgICAgcHJldmlld1RyYW5zbGF0ZSxcclxuICAgICAgcHJldmlld1N1cmZhY2VSZWYsXHJcbiAgICAgIGNsb3NlUHJldmlldyxcclxuICAgICAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gICAgICBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXHJcbiAgICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kLFxyXG4gICAgICBoYW5kbGVQcmV2aWV3V2hlZWwsXHJcbiAgICB9LFxyXG4gICAgY29udGVudEFyZ3M6IHtcclxuICAgICAgaXNMb2FkaW5nLFxyXG4gICAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICAgIGhlYWRlcixcclxuICAgICAgc2hvd1N0aWNreVByZXZpZXcsXHJcbiAgICAgIHByZXZpZXdCdXN5LFxyXG4gICAgICBwcmV2aWV3RXJyb3IsXHJcbiAgICAgIHByZXZpZXdJbWFnZVVybCxcclxuICAgICAgcHJldmlld0FsdFRleHQsXHJcbiAgICAgIG9wZW5GaWxlLFxyXG4gICAgICBzdGF0dXNMYWJlbCxcclxuICAgICAgZ2FzdG9UeXBlTGFiZWwsXHJcbiAgICAgIHRvdGFsQW1vdW50VGV4dCxcclxuICAgICAgdHJhbnNEYXRlVGV4dCxcclxuICAgICAgdGlja2V0VGltZVRleHQsXHJcbiAgICAgIGlzRWRpdGluZyxcclxuICAgICAgZ2FzdG9UeXBlT3B0aW9ucyxcclxuICAgICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgICAgZGVzY3JpcHRpb25JbnZhbGlkLFxyXG4gICAgICBkZXNjcmlwdGlvbklucHV0UmVmLFxyXG4gICAgICBkcmFmdEdhc3RvVHlwZSxcbiAgICAgIGdhc3RvVHlwZUludmFsaWQsXG4gICAgICBnYXN0b1R5cGVJbnB1dFJlZixcbiAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgICAgY3VycmVuY3lDb2RlSW52YWxpZCxcbiAgICAgIGN1cnJlbmN5SW5wdXRSZWYsXG4gICAgICBkcmFmdFRyYW5zRGF0ZSxcbiAgICAgIGRyYWZ0VGlja2V0VGltZSxcbiAgICAgIGRyYWZ0VXJsRmlsZSxcbiAgICAgIGRyYWZ0RmlsZU5hbWUsXG4gICAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxuICAgICAgc2V0RHJhZnRHYXN0b1R5cGUsXG4gICAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcbiAgICAgIGlzRnJvbVNoZWV0TGluayxcbiAgICAgIGxpbmtlZExpbmU6IHtcclxuICAgICAgICB2aXNpYmxlOiBpc0Zyb21FeHBlbnNlTGluZSxcclxuICAgICAgICBwcm9qZWN0SWQ6IGxpbmtlZFNoZWV0TGluZS5kcmFmdFByb2plY3RJZCxcclxuICAgICAgICBpc0xvYWRpbmc6IGxpbmtlZFNoZWV0TGluZS5pc0xvYWRpbmcsXHJcbiAgICAgICAgZXJyb3JNZXNzYWdlOiBsaW5rZWRTaGVldExpbmUuZXJyb3JNZXNzYWdlLFxyXG4gICAgICAgIGRpc2FibGVkOiBidXN5IHx8IGlzQ29udGV4dExvY2tlZCB8fCBsaW5rZWRTaGVldExpbmUuaXNMb2FkaW5nLFxyXG4gICAgICAgIG9uUHJvamVjdElkQ2hhbmdlOiBsaW5rZWRTaGVldExpbmUuc2V0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICAgIH0sXHJcbiAgICAgIGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQsXHJcbiAgICAgIHZpc2libGVMaW5lcyxcclxuICAgICAgdG90YWxMaW5lUGFnZXMsXHJcbiAgICAgIGxpbmVQYWdlLFxyXG4gICAgICBzYWZlQ3VycmVuY3lDb2RlOiBpc0VkaXRpbmcgPyBkcmFmdEN1cnJlbmN5Q29kZSA6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcclxuICAgICAgcGFnaW5hdGlvbkxhYmVscyxcclxuICAgICAgbGluZUNvbnRhaW5lclJlZixcclxuICAgICAgc2V0TGluZVBhZ2UsXHJcbiAgICAgIG9wZW5MaW5lRGV0YWlsLFxyXG4gICAgICBzdGF0dXMsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgLi4uZGV0YWlsVmlldyxcclxuICAgIGNhblNob3dDcmVhdGVMaW5lRmFiOiBjYW5DcmVhdGVUaWNrZXRMaW5lSW5Db250ZXh0ICYmICFpc0xvYWRpbmcgJiYgIWVycm9yTWVzc2FnZSAmJiAhIXNhZmVUZXh0KGZpbGVJZCkgJiYgISFoZWFkZXIsXHJcbiAgICBpc0NyZWF0ZUxpbmVGYWJEaXNhYmxlZDogYnVzeSB8fCAhaGVhZGVyLFxyXG4gICAgb3BlbkNyZWF0ZUxpbmVEZXRhaWwsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlQ29udGVudCA9ICgpID0+IHtcclxuICBjb25zdCBkZXRhaWxWaWV3ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbFBhZ2VWaWV3TW9kZWwoKTtcclxuICBjb25zdCBmYWJNZW51SXRlbXMgPSB1c2VNZW1vPEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW1bXT4oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogXCJuZXctdGlja2V0LWxpbmVcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX05ld0xpbmVcIiwgXCJOdWV2YSBMaW5lYVwiKSxcclxuICAgICAgICBpY29uOiA8TmV3TGluZUljb24gLz4sXHJcbiAgICAgICAgb25DbGljazogKCkgPT4ge1xyXG4gICAgICAgICAgdm9pZCBkZXRhaWxWaWV3Lm9wZW5DcmVhdGVMaW5lRGV0YWlsKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkaXNhYmxlZDogZGV0YWlsVmlldy5pc0NyZWF0ZUxpbmVGYWJEaXNhYmxlZCxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgICBbZGV0YWlsVmlld11cclxuICApO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3IG1vZGFsPXtkZXRhaWxWaWV3Lm1vZGFsfSBwcmV2aWV3PXtkZXRhaWxWaWV3LnByZXZpZXd9IGNvbnRlbnQ9e2RldGFpbFZpZXcuY29udGVudH0gLz5cclxuICAgICAge2RldGFpbFZpZXcuY2FuU2hvd0NyZWF0ZUxpbmVGYWIgPyAoXHJcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXHJcbiAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgcmFwaWRhc1wiKX1cclxuICAgICAgICAgIHNpemU9ezc2fVxyXG4gICAgICAgICAgcmlnaHQ9ezE2fVxyXG4gICAgICAgICAgYm90dG9tPXsyNH1cclxuICAgICAgICAgIG1lbnVBcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgcmFwaWRhc1wiKX1cclxuICAgICAgICAgIG1lbnVJdGVtcz17ZmFiTWVudUl0ZW1zfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC8+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgZXhwZW5zZSB0aWNrZXQgZGV0YWlsLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0RGV0YWlsUGFnZSA9ICgpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzIGVuYWJsZUV4cGVuc2VNYW5hZ2VtZW50PlxyXG4gICAgICA8RXhwZW5zZVRpY2tldERldGFpbFBhZ2VDb250ZW50IC8+XHJcbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlIC8+KTtcclxufTtcclxuXHJcbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldERldGFpbFBhZ2U7XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLCBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBtYXBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLCBtYXBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGVBcmdzID0ge1xyXG4gIGhhc0FjY2VzczogYm9vbGVhbjtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIE93bnMgcmVhZCBzdGF0ZSBhbmQgQVBJIGxvYWRpbmcgYmVoYXZpb3IgZm9yIHRoZSB0aWNrZXQgZGV0YWlsIHBhZ2UuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUgPSAoeyBoYXNBY2Nlc3MsIGZpbGVJZCwgb25Gb3JiaWRkZW4gfTogVXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlQXJncykgPT4ge1xyXG4gIGNvbnN0IFtoZWFkZXIsIHNldEhlYWRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2xpbmVzLCBzZXRMaW5lc10gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0RGV0YWlsTGluZVtdPihbXSk7XHJcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIGNvbnN0IHJlbG9hZERldGFpbCA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmICghaGFzQWNjZXNzKSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzYWZlRmlsZUlkID0gc2FmZVRleHQoZmlsZUlkKTtcclxuICAgIGlmICghc2FmZUZpbGVJZCkge1xyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIlRpY2tldHNfRGV0YWlsX05vdEZvdW5kXCIsIFwiVGlja2V0IHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XHJcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldChzYWZlRmlsZUlkLCB7XHJcbiAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZT8uTWVzc2FnZSB8fCBpbmRUKFwiVGlja2V0c19EZXRhaWxfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0IGRldGFpbC5cIikpO1xyXG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkID1cclxuICAgICAgICBpdGVtcy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnk/LkZpbGVJZCkudG9VcHBlckNhc2UoKSA9PT0gc2FmZUZpbGVJZC50b1VwcGVyQ2FzZSgpKSB8fCBpdGVtc1swXSB8fCBudWxsO1xyXG5cclxuICAgICAgaWYgKCFzZWxlY3RlZCkge1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiVGlja2V0c19EZXRhaWxfTm90Rm91bmRcIiwgXCJUaWNrZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBtYXBwZWRIZWFkZXIgPSBtYXBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyKHNlbGVjdGVkKTtcclxuICAgICAgY29uc3QgbWFwcGVkTGluZXMgPSAoQXJyYXkuaXNBcnJheShzZWxlY3RlZC5MaW5lcykgPyBzZWxlY3RlZC5MaW5lcyA6IFtdKS5tYXAoKGxpbmUpID0+XHJcbiAgICAgICAgbWFwRXhwZW5zZVRpY2tldERldGFpbExpbmUobGluZSlcclxuICAgICAgKTtcclxuICAgICAgc2V0SGVhZGVyKG1hcHBlZEhlYWRlcik7XHJcbiAgICAgIHNldExpbmVzKG1hcHBlZExpbmVzKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIlRpY2tldHNfRGV0YWlsX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldCBkZXRhaWwuXCIpKTtcclxuICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtmaWxlSWQsIGhhc0FjY2Vzcywgb25Gb3JiaWRkZW5dKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHZvaWQgcmVsb2FkRGV0YWlsKCk7XHJcbiAgfSwgW3JlbG9hZERldGFpbF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGVhZGVyLFxyXG4gICAgbGluZXMsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICByZWxvYWREZXRhaWwsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0IH0gZnJvbSBcIi4uLy4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBleGVjdXRlRXhwZW5zZU11dGF0aW9uIH0gZnJvbSBcIi4uLy4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XHJcbmltcG9ydCB7XG4gIGRlbGV0ZUV4cGVuc2VTaGVldExpbmUsXG4gIGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldCxcbiAgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0RmlsZSxcbiAgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwsXG4gIHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldCxcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UsIHRvRXhwZW5zZUFwaURkTW1ZeXl5IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcbmltcG9ydCB7IHN5bmNFeHBlbnNlTGlua2VkVGlja2V0U2hlZXRMaW5lIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VMaW5rZWRUaWNrZXRTaGVldFN5bmMudHNcIjtcbmltcG9ydCB7IHJlc29sdmVFeHBlbnNlU2hlZXRFZGl0QWNjZXNzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VTaGVldEVkaXRBY2Nlc3MudHNcIjtcbmltcG9ydCB7IGNsZWFyRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlLCBzYXZlRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZS50c1wiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuXHJcbnR5cGUgRGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0ID0ge1xyXG4gIHNoZWV0SWQ6IHN0cmluZztcclxuICBsaW5lUmVjSWQ6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgY2FuRWRpdFRpY2tldDogYm9vbGVhbjtcclxuICBjYW5EZWxldGVUaWNrZXQ6IGJvb2xlYW47XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xuICBkcmFmdEdhc3RvVHlwZTogc3RyaW5nO1xuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xuICBkcmFmdFRpY2tldFRpbWU6IHN0cmluZztcbiAgZHJhZnRDb21lbnRhcmlvOiBzdHJpbmc7XG4gIGRyYWZ0VXJsRmlsZTogc3RyaW5nO1xuICBkcmFmdEZpbGVOYW1lOiBzdHJpbmc7XG4gIGxpbmtlZEV4cGVuc2VTaGVldElkPzogc3RyaW5nO1xyXG4gIGxpbmtlZEV4cGVuc2VMaW5lUmVjSWQ/OiBzdHJpbmc7XHJcbiAgbGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWQ/OiBzdHJpbmc7XHJcbiAgbGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWRDaGFuZ2VkPzogYm9vbGVhbjtcclxuICBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQ/OiBEZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQgfCBudWxsO1xyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGJvb2xlYW47XHJcbiAgY2FuTWFuYWdlT3RoZXJVc2VyczogYm9vbGVhbjtcclxuICBjdXJyZW50QXhVc2VySWQ6IHN0cmluZztcclxuICBjdXJyZW50Q3JtVXNlcklkOiBzdHJpbmc7XHJcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkOiBzdHJpbmc7XHJcbiAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlPzogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkxpbmtlZFNoZWV0U3luY1N1Y2Nlc3M/OiAoKSA9PiB2b2lkO1xyXG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxuICBzZXRTdGF0dXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG59O1xyXG5cclxuY29uc3QgUkVRVUlSRURfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XHJcblxyXG5jb25zdCBwYXJzZU9wdGlvbmFsSW50ZWdlciA9IChyYXc6IHN0cmluZyk6IG51bWJlciB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3IHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlci5wYXJzZUludCh2YWx1ZSwgMTApO1xyXG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgPyBwYXJzZWQgOiB1bmRlZmluZWQ7XHJcbn07XHJcblxyXG4vLyBUcmllcyB0byBpbmZlciBhIHNhZmUgZXh0ZW5zaW9uIGZvciB1cGRhdGUgcGF5bG9hZCBmcm9tIGZpbGUgbmFtZSBvciBVUkwuXHJcbmNvbnN0IHJlc29sdmVUaWNrZXRGaWxlRXh0ZW5zaW9uID0gKGZpbGVOYW1lOiBzdHJpbmcsIHVybEZpbGU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgY29uc3Qgc291cmNlID0gU3RyaW5nKGZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSB8fCBTdHJpbmcodXJsRmlsZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgY29uc3QgbWF0Y2ggPSBzb3VyY2UubWF0Y2goL1xcLihbYS16QS1aMC05XXsxLDEwfSkoPzokfFs/I10pLyk7XHJcbiAgaWYgKCFtYXRjaCB8fCAhbWF0Y2hbMV0pIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgcmV0dXJuIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XHJcbn07XHJcblxyXG5jb25zdCBpc05vdEZvdW5kRXJyb3IgPSAoZXJyb3I6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDA0O1xyXG59O1xyXG5cclxuY29uc3QgaXNNaXNzaW5nVGlja2V0RmlsZU1lc3NhZ2UgPSAobWVzc2FnZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcobWVzc2FnZSB8fCBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhcmNoaXZvIGFzb2NpYWRvXCIpIHx8XHJcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXJjaGl2byBhZGp1bnRvXCIpIHx8XHJcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXNzb2NpYXRlZCBmaWxlXCIpIHx8XHJcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXR0YWNoZWQgZmlsZVwiKVxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBFbmNhcHN1bGF0ZXMgdXBkYXRlIGFuZCBkZWxldGUgbXV0YXRpb25zIGZvciB0aWNrZXQgaGVhZGVyIGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGNhbkVkaXRUaWNrZXQsXHJcbiAgY2FuRGVsZXRlVGlja2V0LFxyXG4gIGZpbGVJZCxcbiAgZHJhZnREZXNjcmlwdGlvbixcbiAgZHJhZnRHYXN0b1R5cGUsXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICBkcmFmdFRyYW5zRGF0ZSxcbiAgZHJhZnRUaWNrZXRUaW1lLFxuICBkcmFmdENvbWVudGFyaW8sXG4gIGRyYWZ0VXJsRmlsZSxcbiAgZHJhZnRGaWxlTmFtZSxcbiAgbGlua2VkRXhwZW5zZVNoZWV0SWQsXHJcbiAgbGlua2VkRXhwZW5zZUxpbmVSZWNJZCxcclxuICBsaW5rZWRFeHBlbnNlTGluZVByb2plY3RJZCxcclxuICBsaW5rZWRFeHBlbnNlTGluZVByb2plY3RJZENoYW5nZWQgPSBmYWxzZSxcclxuICBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQsXHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gIGN1cnJlbnRBeFVzZXJJZCxcclxuICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICBvbkxpbmtlZFNoZWV0U3luY0ZhaWx1cmUsXHJcbiAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgc2V0QnVzeSxcclxuICBzZXRTdGF0dXMsXHJcbiAgc2V0SXNFZGl0aW5nLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xyXG4gIGNvbnN0IHZhbGlkYXRlTGlua2VkU2hlZXRCZWZvcmVNdXRhdGlvbiA9IHVzZUNhbGxiYWNrKGFzeW5jICgpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+ID0+IHtcclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQobGlua2VkRXhwZW5zZVNoZWV0SWQpO1xyXG4gICAgaWYgKCFzYWZlU2hlZXRJZCkge1xyXG4gICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhY2Nlc3NSZXN1bHQgPSBhd2FpdCByZXNvbHZlRXhwZW5zZVNoZWV0RWRpdEFjY2Vzcyh7XHJcbiAgICAgIHNoZWV0SWQ6IHNhZmVTaGVldElkLFxyXG4gICAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIGlmICghYWNjZXNzUmVzdWx0LmlzTG9ja2VkKSB7XHJcbiAgICAgIHJldHVybiBzYWZlU2hlZXRJZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtZXNzYWdlID1cclxuICAgICAgc2FmZVRleHQoYWNjZXNzUmVzdWx0LmJsb2NrZWRNZXNzYWdlKSB8fFxyXG4gICAgICBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfUmVhZE9ubHlCeVN0YXR1c1wiLCBcIk5vIHNlIHB1ZWRlIGVkaXRhciBlc3RhIGhvamEgZGUgZ2FzdG9zIGVuIGVsIGVzdGFkbyBhY3R1YWwuXCIpO1xyXG4gICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0sIFtcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIGxpbmtlZEV4cGVuc2VTaGVldElkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFN0YXR1cyxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgcnVuSGVhZGVyVXBkYXRlID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAoeyBzeW5jU2hlZXRMaW5lIH06IHsgc3luY1NoZWV0TGluZTogYm9vbGVhbiB9KTogUHJvbWlzZTxib29sZWFuPiA9PiB7XHJcbiAgICAgIGlmIChidXN5IHx8ICFpc0VkaXRpbmcpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKCFjYW5FZGl0VGlja2V0KSB7XHJcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgbm9ybWFsaXplZERlc2NyaXB0aW9uID0gU3RyaW5nKGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpO1xyXG4gICAgICBpZiAoIW5vcm1hbGl6ZWREZXNjcmlwdGlvbikge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0Rlc2NyaXB0aW9uUmVxdWlyZWRcIiwgXCJEZXNjcmlwdGlvbiBpcyByZXF1aXJlZC5cIik7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3kgPSBTdHJpbmcoZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgIGlmICghbm9ybWFsaXplZEN1cnJlbmN5KSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fQ3VycmVuY3lSZXF1aXJlZFwiLCBcIkN1cnJlbmN5IGlzIHJlcXVpcmVkLlwiKTtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHBhcnNlZEdhc3RvVHlwZSA9IHBhcnNlT3B0aW9uYWxJbnRlZ2VyKGRyYWZ0R2FzdG9UeXBlKTtcclxuICAgICAgaWYgKHBhcnNlZEdhc3RvVHlwZSA9PT0gdW5kZWZpbmVkIHx8ICFSRVFVSVJFRF9HQVNUT19UWVBFUy5oYXMocGFyc2VkR2FzdG9UeXBlKSkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIlRpY2tldHNfVmFsaWRhdGlvbl9DYXRlZ29yeVJlcXVpcmVkXCIsIFwiQ2F0ZWdvcnkgaXMgcmVxdWlyZWQuXCIpO1xuICAgICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xuICAgICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmF3VHJhbnNEYXRlID0gU3RyaW5nKGRyYWZ0VHJhbnNEYXRlIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc0RhdGUgPSByYXdUcmFuc0RhdGUgPyB0b0V4cGVuc2VBcGlEZE1tWXl5eShyYXdUcmFuc0RhdGUpIDogXCJcIjtcbiAgICAgIGlmIChyYXdUcmFuc0RhdGUgJiYgIW5vcm1hbGl6ZWRUcmFuc0RhdGUpIHtcbiAgICAgICAgc2V0TW9kYWxFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgICAgICAgc2V0U3RhdHVzKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZhbGlkYXRlZFNoZWV0SWQgPSBhd2FpdCB2YWxpZGF0ZUxpbmtlZFNoZWV0QmVmb3JlTXV0YXRpb24oKTtcbiAgICAgIGlmICh2YWxpZGF0ZWRTaGVldElkID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxyXG4gICAgICBjb25zdCBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0ID0ge1xuICAgICAgICBkZXNjcmlwdGlvbjogbm9ybWFsaXplZERlc2NyaXB0aW9uLFxuICAgICAgICBjdXJyZW5jeUNvZGU6IG5vcm1hbGl6ZWRDdXJyZW5jeSxcbiAgICAgICAgdHJhbnNEYXRlOiBub3JtYWxpemVkVHJhbnNEYXRlIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgdGlja2V0RGF0ZTogbm9ybWFsaXplZFRyYW5zRGF0ZSB8fCB1bmRlZmluZWQsXG4gICAgICAgIHRpY2tldFRpbWU6IHNhZmVUZXh0KGRyYWZ0VGlja2V0VGltZSkgfHwgdW5kZWZpbmVkLFxuICAgICAgICBjb21lbnRhcmlvOiBTdHJpbmcoZHJhZnRDb21lbnRhcmlvIHx8IFwiXCIpLnRyaW0oKSB8fCB1bmRlZmluZWQsXG4gICAgICAgIHVybEZpbGU6IFN0cmluZyhkcmFmdFVybEZpbGUgfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgZmlsZU5hbWU6IFN0cmluZyhkcmFmdEZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSB8fCB1bmRlZmluZWQsXG4gICAgICAgIGZpbGVFeHRlbnNpb246IHJlc29sdmVUaWNrZXRGaWxlRXh0ZW5zaW9uKGRyYWZ0RmlsZU5hbWUsIGRyYWZ0VXJsRmlsZSksXHJcbiAgICAgICAgZ2FzdG9UeXBlOiBwYXJzZWRHYXN0b1R5cGUgYXMgRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdFtcImdhc3RvVHlwZVwiXSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRpbmdcIiwgXCJVcGRhdGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxyXG4gICAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpLFxyXG4gICAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgICAgc2V0QnVzeSxcclxuICAgICAgICBzZXRTdGF0dXMsXHJcbiAgICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldChmaWxlSWQsIHBheWxvYWQpO1xyXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHN5bmNTaGVldExpbmUgJiYgdmFsaWRhdGVkU2hlZXRJZCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHN5bmNQYXlsb2FkID0ge1xyXG4gICAgICAgICAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgICAgICAgICAgc2hlZXRJZDogdmFsaWRhdGVkU2hlZXRJZCxcclxuICAgICAgICAgICAgICAgIGxpbmVSZWNJZDogc2FmZVRleHQobGlua2VkRXhwZW5zZUxpbmVSZWNJZCkgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgLi4uKGxpbmtlZEV4cGVuc2VMaW5lUHJvamVjdElkQ2hhbmdlZFxyXG4gICAgICAgICAgICAgICAgICA/IHsgcHJvamVjdElkT3ZlcnJpZGU6IHNhZmVUZXh0KGxpbmtlZEV4cGVuc2VMaW5lUHJvamVjdElkKSB9XHJcbiAgICAgICAgICAgICAgICAgIDoge30pLFxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgYXdhaXQgc3luY0V4cGVuc2VMaW5rZWRUaWNrZXRTaGVldExpbmUoc3luY1BheWxvYWQpO1xyXG4gICAgICAgICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKCk7XHJcbiAgICAgICAgICAgICAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzPy4oKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID1cclxuICAgICAgICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3JcclxuICAgICAgICAgICAgICAgICAgPyBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgIDogaW5kVChcclxuICAgICAgICAgICAgICAgICAgICAgIFwiRXhwZW5zZVRpY2tldHNfU2hlZXRTeW5jX1JldHJ5UmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgIFwiVGlja2V0IGRhdGEgY2hhbmdlZCwgYnV0IHdlIGNvdWxkIG5vdCBzeW5jIHRoZSBleHBlbnNlIGxpbmUuIFNhdmUgYWdhaW4gYmVmb3JlIGxlYXZpbmcuXCJcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIHNhdmVFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgICAgICAgICAgc2hlZXRJZDogdmFsaWRhdGVkU2hlZXRJZCxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlPy4obWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBzaGVldCB1cGRhdGVkXCIpKTtcclxuICAgICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQub2s7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBidXN5LFxyXG4gICAgICBjYW5FZGl0VGlja2V0LFxyXG4gICAgICBkcmFmdENvbWVudGFyaW8sXHJcbiAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICAgIGRyYWZ0RmlsZU5hbWUsXG4gICAgICBkcmFmdEdhc3RvVHlwZSxcbiAgICAgIGRyYWZ0VGlja2V0VGltZSxcbiAgICAgIGRyYWZ0VHJhbnNEYXRlLFxuICAgICAgZHJhZnRVcmxGaWxlLFxuICAgICAgZmlsZUlkLFxyXG4gICAgICBpc0VkaXRpbmcsXHJcbiAgICAgIGxpbmtlZEV4cGVuc2VMaW5lUHJvamVjdElkLFxyXG4gICAgICBsaW5rZWRFeHBlbnNlTGluZVByb2plY3RJZENoYW5nZWQsXHJcbiAgICAgIGxpbmtlZEV4cGVuc2VMaW5lUmVjSWQsXHJcbiAgICAgIG9uTGlua2VkU2hlZXRTeW5jRmFpbHVyZSxcclxuICAgICAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzLFxyXG4gICAgICBzZXRCdXN5LFxyXG4gICAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgdmFsaWRhdGVMaW5rZWRTaGVldEJlZm9yZU11dGF0aW9uLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIHJldHVybiBydW5IZWFkZXJVcGRhdGUoe1xyXG4gICAgICBzeW5jU2hlZXRMaW5lOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgfSwgW3J1bkhlYWRlclVwZGF0ZV0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICByZXR1cm4gcnVuSGVhZGVyVXBkYXRlKHtcclxuICAgICAgc3luY1NoZWV0TGluZTogbGlua2VkRXhwZW5zZUxpbmVQcm9qZWN0SWRDaGFuZ2VkLFxyXG4gICAgfSk7XHJcbiAgfSwgW2xpbmtlZEV4cGVuc2VMaW5lUHJvamVjdElkQ2hhbmdlZCwgcnVuSGVhZGVyVXBkYXRlXSk7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQgPSB1c2VDYWxsYmFjayhhc3luYyAoKTogUHJvbWlzZTxEZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQgfCBudWxsPiA9PiB7XHJcbiAgICBpZiAoZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0KSB7XHJcbiAgICAgIHJldHVybiBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChsaW5rZWRFeHBlbnNlU2hlZXRJZCk7XHJcbiAgICBpZiAoIXNhZmVTaGVldElkKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwoc2FmZVNoZWV0SWQsIHtcclxuICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZS5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xyXG4gICAgY29uc3QgZGV0YWlsID0gaXRlbXMuZmluZCgoZW50cnkpID0+IGVudHJ5ICYmIHR5cGVvZiBlbnRyeSA9PT0gXCJvYmplY3RcIikgfHwgbnVsbDtcclxuICAgIGNvbnN0IGxpbmVzID0gQXJyYXkuaXNBcnJheShkZXRhaWw/LkxpbmVzKSA/IGRldGFpbC5MaW5lcyA6IFtdO1xyXG4gICAgY29uc3QgbWF0Y2hpbmdMaW5lID0gbGluZXMuZmluZCgobGluZSkgPT4gc2FmZVRleHQobGluZT8uRmlsZUlkKSA9PT0gZmlsZUlkKTtcclxuICAgIGNvbnN0IGxpbmVSZWNJZCA9IHNhZmVUZXh0KG1hdGNoaW5nTGluZT8uUmVjSWQpO1xyXG5cclxuICAgIGlmICghbGluZVJlY0lkKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNoZWV0SWQ6IHNhZmVTaGVldElkLFxyXG4gICAgICBsaW5lUmVjSWQsXHJcbiAgICB9O1xyXG4gIH0sIFtkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQsIGZpbGVJZCwgbGlua2VkRXhwZW5zZVNoZWV0SWRdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICghY2FuRGVsZXRlVGlja2V0KSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZhbGlkYXRlZFNoZWV0SWQgPSBhd2FpdCB2YWxpZGF0ZUxpbmtlZFNoZWV0QmVmb3JlTXV0YXRpb24oKTtcclxuICAgIGlmICh2YWxpZGF0ZWRTaGVldElkID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcclxuICAgICAgc3RhcnRTdGF0dXM6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGV4cGVuc2Ugc2hlZXQuLi5cIiksXHJcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRXJyb3JcIiwgXCJEZWxldGUgZXJyb3IuXCIpLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRCdXN5LFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpbmtlZExpbmVDb250ZXh0ID0gYXdhaXQgcmVzb2x2ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCgpO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgZGVsZXRlRmlsZVJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0RmlsZShmaWxlSWQsIHtcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmICghZGVsZXRlRmlsZVJlc3BvbnNlLlN1Y2Nlc3MgJiYgIWlzTWlzc2luZ1RpY2tldEZpbGVNZXNzYWdlKGRlbGV0ZUZpbGVSZXNwb25zZS5NZXNzYWdlKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGVsZXRlRmlsZVJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgaWYgKCFpc05vdEZvdW5kRXJyb3IoZXJyb3IpKSB7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXQoZmlsZUlkKTtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGlua2VkTGluZUNvbnRleHQpIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmVEZWxldGVSZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldExpbmUoXHJcbiAgICAgICAgICAgICAgbGlua2VkTGluZUNvbnRleHQuc2hlZXRJZCxcclxuICAgICAgICAgICAgICBsaW5rZWRMaW5lQ29udGV4dC5saW5lUmVjSWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsaW5lRGVsZXRlUmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihsaW5lRGVsZXRlUmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAvLyBUaGUgbGlua2VkIGxpbmUgY2FuIGJlIGF1dG8tcmVtb3ZlZCBieSBiYWNrZW5kIGNhc2NhZGU7IGtlZXAgZmxvdyBzdWNjZXNzZnVsIGluIHRoYXQgY2FzZS5cclxuICAgICAgICAgICAgaWYgKCFpc05vdEZvdW5kRXJyb3IoZXJyb3IpKSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgZGVsZXRlZFwiKSk7XHJcbiAgICAgICAgaWYgKHZhbGlkYXRlZFNoZWV0SWQpIHtcclxuICAgICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKCk7XHJcbiAgICAgICAgICBvbkxpbmtlZFNoZWV0U3luY1N1Y2Nlc3M/LigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQub2s7XHJcbiAgfSwgW1xyXG4gICAgYnVzeSxcclxuICAgIGNhbkRlbGV0ZVRpY2tldCxcclxuICAgIGZpbGVJZCxcclxuICAgIG9uTGlua2VkU2hlZXRTeW5jU3VjY2VzcyxcclxuICAgIHJlc29sdmVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHZhbGlkYXRlTGlua2VkU2hlZXRCZWZvcmVNdXRhdGlvbixcclxuICBdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZVBlcnNpc3RIZWFkZXJEcmFmdCxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnNBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBpc0xvY2tlZDogYm9vbGVhbjtcclxuICBhY3Rpb25Nb2RlPzogXCJkZWZhdWx0XCIgfCBcImRlbGV0ZV9vbmx5XCIgfCBcInNhdmVfb25seVwiIHwgXCJ2aWV3X29ubHlcIjtcclxuICBwZXJtaXNzaW9uc1JlYWR5PzogYm9vbGVhbjtcclxuICBjYW5FZGl0VGlja2V0OiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZVRpY2tldDogYm9vbGVhbjtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUNhbmNlbEVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgY2FuT3BlblNhdmVDb25maXJtPzogKCkgPT4gYm9vbGVhbjtcclxuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgaGFuZGxlRGVsZXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XHJcbiAgb25EZWxldGVTdWNjZXNzPzogKCkgPT4gdm9pZDtcclxuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcclxuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XHJcbiAgfSkgPT4gdm9pZDtcclxuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBDb29yZGluYXRlcyB0b3BiYXIgaWNvbiBzdGF0ZSBhbmQgZGlzcGF0Y2ggYWN0aW9ucyBmb3IgdGlja2V0IGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsT3BlbixcclxuICBpc0VkaXRpbmcsXHJcbiAgaXNMb2NrZWQsXHJcbiAgYWN0aW9uTW9kZSA9IFwiZGVmYXVsdFwiLFxyXG4gIHBlcm1pc3Npb25zUmVhZHkgPSB0cnVlLFxyXG4gIGNhbkVkaXRUaWNrZXQsXHJcbiAgY2FuRGVsZXRlVGlja2V0LFxyXG4gIGZpbGVJZCxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgaGFuZGxlVXBkYXRlLFxyXG4gIGhhbmRsZURlbGV0ZSxcclxuICBvblNhdmVTdWNjZXNzLFxyXG4gIG9uRGVsZXRlU3VjY2VzcyxcclxuICBvcGVuQ29uZmlybSxcclxuICBjbG9zZUNvbmZpcm0sXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncykgPT4ge1xyXG4gIHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25Hcm91cElkOiBcImV4cGVuc2UtdGlja2V0LWRldGFpbC1hY3Rpb25zXCIsXHJcbiAgICBpZHM6IHtcclxuICAgICAgZWRpdEljb25JZDogXCJleHBlbnNlVGlja2V0RWRpdEljb25cIixcclxuICAgICAgc2F2ZUljb25JZDogXCJleHBlbnNlVGlja2V0U2F2ZUljb25cIixcclxuICAgICAgZGVsZXRlQnRuSWQ6IFwiZXhwZW5zZVRpY2tldERlbGV0ZUJ0blwiLFxyXG4gICAgICBjYW5jZWxCdG5JZDogXCJleHBlbnNlVGlja2V0Q2FuY2VsQnRuXCIsXHJcbiAgICB9LFxyXG4gICAgZXZlbnRzOiB7XHJcbiAgICAgIGVkaXRFdmVudDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtZWRpdFwiLFxyXG4gICAgICBkZWxldGVFdmVudDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtZGVsZXRlXCIsXHJcbiAgICAgIGNhbmNlbEV2ZW50OiBcImV4cGVuc2UtdGlja2V0LWRldGFpbC1jYW5jZWwtZWRpdFwiLFxyXG4gICAgfSxcclxuICAgIGJ1c3ksXHJcbiAgICBtb2RhbE9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0NyZWF0ZU1vZGU6IGZhbHNlLFxyXG4gICAgaXNMb2NrZWQsXHJcbiAgICBhY3Rpb25Nb2RlLFxyXG4gICAgcGVybWlzc2lvbnNSZWFkeSxcclxuICAgIGNhbkNyZWF0ZTogZmFsc2UsXHJcbiAgICBjYW5FZGl0OiBjYW5FZGl0VGlja2V0LFxyXG4gICAgY2FuRGVsZXRlOiBjYW5EZWxldGVUaWNrZXQsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgICBoYW5kbGVTYXZlOiBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBzYXZlQ29uZmlybVRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJTYXZlIGNoYW5nZXNcIiksXHJcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gc2F2ZSBjaGFuZ2VzP1wiKSxcclxuICAgIHNhdmVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1UaXRsZTogaW5kVChcIkNvbmZpcm1fRGVsZXRlX1RpdGxlXCIsIFwiRGVsZXRlXCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgaXRlbT9cIiksXHJcbiAgICBkZWxldGVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIiksXHJcbiAgICBvblNhdmVTdWNjZXNzLFxyXG4gICAgb25EZWxldGVTdWNjZXNzOiBvbkRlbGV0ZVN1Y2Nlc3MgfHwgKCgpID0+IG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9UaWNrZXRzXCIpKSxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gIH0pO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVkdWNlciwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IERpc3BhdGNoLCBTZXRTdGF0ZUFjdGlvbiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgcGFyc2VFeHBlbnNlRGF0ZSwgc2FmZVRleHQsIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuXHJcbnR5cGUgRHJhZnRTdGF0ZSA9IHtcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGdhc3RvVHlwZTogc3RyaW5nO1xuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIHRpY2tldFRpbWU6IHN0cmluZztcbiAgY29tZW50YXJpbzogc3RyaW5nO1xuICB1cmxGaWxlOiBzdHJpbmc7XG4gIGZpbGVOYW1lOiBzdHJpbmc7XG59O1xyXG5cclxudHlwZSBFZGl0b3JTdGF0ZSA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBtb2RhbEVycm9yOiBzdHJpbmc7XHJcbiAgbGluZVBhZ2U6IG51bWJlcjtcclxuICBkcmFmdDogRHJhZnRTdGF0ZTtcclxufTtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbEVkaXRvckFyZ3MgPSB7XHJcbiAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbDtcclxuICBsaW5lQ291bnQ6IG51bWJlcjtcclxuICBwYWdlU2l6ZTogbnVtYmVyO1xyXG4gIGNhbkVkaXRUaWNrZXQ6IGJvb2xlYW47XHJcbiAgaXNMb2FkaW5nOiBib29sZWFuO1xyXG4gIGFsbG93QXNzaWduZWREcmFmdEVkaXQ6IGJvb2xlYW47XHJcbiAgaXNGcm9tU2hlZXRMaW5rOiBib29sZWFuO1xyXG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxudHlwZSBFZGl0b3JBY3Rpb24gPVxyXG4gIHwgeyB0eXBlOiBcImh5ZHJhdGVfZnJvbV9oZWFkZXJcIjsgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbCB9XHJcbiAgfCB7XHJcbiAgICAgIHR5cGU6IFwicGF0Y2hfc3RhdGVcIjtcclxuICAgICAgcGF0Y2g6IFBhcnRpYWw8UGljazxFZGl0b3JTdGF0ZSwgXCJidXN5XCIgfCBcInN0YXR1c1wiIHwgXCJpc0VkaXRpbmdcIiB8IFwibW9kYWxFcnJvclwiIHwgXCJsaW5lUGFnZVwiPj47XHJcbiAgICB9XHJcbiAgfCB7IHR5cGU6IFwic2V0X2RyYWZ0X2ZpZWxkXCI7IGZpZWxkOiBrZXlvZiBEcmFmdFN0YXRlOyB2YWx1ZTogc3RyaW5nIH07XHJcblxyXG5jb25zdCBjcmVhdGVFbXB0eURyYWZ0ID0gKCk6IERyYWZ0U3RhdGUgPT4gKHtcclxuICBkZXNjcmlwdGlvbjogXCJcIixcclxuICBnYXN0b1R5cGU6IFwiXCIsXG4gIGN1cnJlbmN5Q29kZTogXCJcIixcbiAgdHJhbnNEYXRlOiBcIlwiLFxuICB0aWNrZXRUaW1lOiBcIlwiLFxuICBjb21lbnRhcmlvOiBcIlwiLFxuICB1cmxGaWxlOiBcIlwiLFxuICBmaWxlTmFtZTogXCJcIixcbn0pO1xyXG5cclxuY29uc3QgdG9JbnB1dERhdGUgPSAocmF3Pzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlRGF0ZShyYXcpO1xuICByZXR1cm4gcGFyc2VkID8gdG9Jc29EYXRlKHBhcnNlZCkgOiBcIlwiO1xufTtcblxuY29uc3QgdG9JbnB1dFRpbWUgPSAocmF3Pzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgdmFsdWUgPSBzYWZlVGV4dChyYXcpO1xuICBpZiAoIXZhbHVlIHx8IHZhbHVlID09PSBcIjBcIikgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3Qgc2Vjb25kc1ZhbHVlID0gTnVtYmVyKHZhbHVlKTtcbiAgaWYgKE51bWJlci5pc0ludGVnZXIoc2Vjb25kc1ZhbHVlKSAmJiBzZWNvbmRzVmFsdWUgPj0gMCAmJiBzZWNvbmRzVmFsdWUgPD0gODYzOTkpIHtcbiAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3Ioc2Vjb25kc1ZhbHVlIC8gMzYwMCk7XG4gICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY29uZHNWYWx1ZSAlIDM2MDApIC8gNjApO1xuICAgIGNvbnN0IHNlY29uZHMgPSBzZWNvbmRzVmFsdWUgJSA2MDtcbiAgICByZXR1cm4gW2hvdXJzLCBtaW51dGVzLCBzZWNvbmRzXS5tYXAoKGVudHJ5KSA9PiBTdHJpbmcoZW50cnkpLnBhZFN0YXJ0KDIsIFwiMFwiKSkuam9pbihcIjpcIik7XG4gIH1cblxuICBjb25zdCBtYXRjaCA9IHZhbHVlLm1hdGNoKC9eKFxcZHsxLDJ9KTooWzAtNV1cXGQpKD86OihbMC01XVxcZCkpPyQvKTtcbiAgaWYgKCFtYXRjaCkgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3QgaG91cnMgPSBOdW1iZXIucGFyc2VJbnQobWF0Y2hbMV0gfHwgXCJcIiwgMTApO1xuICBpZiAoIU51bWJlci5pc0ludGVnZXIoaG91cnMpIHx8IGhvdXJzIDwgMCB8fCBob3VycyA+IDIzKSByZXR1cm4gXCJcIjtcblxuICByZXR1cm4gYCR7U3RyaW5nKGhvdXJzKS5wYWRTdGFydCgyLCBcIjBcIil9OiR7bWF0Y2hbMl19OiR7bWF0Y2hbM10gfHwgXCIwMFwifWA7XG59O1xuXG5jb25zdCBjcmVhdGVEcmFmdEZyb21IZWFkZXIgPSAoaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbCk6IERyYWZ0U3RhdGUgPT4ge1xuICByZXR1cm4ge1xuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChoZWFkZXI/LmRlc2NyaXB0aW9uKSxcbiAgICBnYXN0b1R5cGU6IGhlYWRlcj8uZ2FzdG9UeXBlID09PSBudWxsIHx8IGhlYWRlcj8uZ2FzdG9UeXBlID09PSB1bmRlZmluZWQgPyBcIlwiIDogU3RyaW5nKGhlYWRlci5nYXN0b1R5cGUpLFxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCksXG4gICAgdHJhbnNEYXRlOiB0b0lucHV0RGF0ZShoZWFkZXI/LnRpY2tldERhdGUgfHwgaGVhZGVyPy50cmFuc0RhdGUpLFxuICAgIHRpY2tldFRpbWU6IHRvSW5wdXRUaW1lKGhlYWRlcj8udGlja2V0VGltZSksXG4gICAgY29tZW50YXJpbzogc2FmZVRleHQoaGVhZGVyPy5jb21lbnRhcmlvKSxcbiAgICB1cmxGaWxlOiBzYWZlVGV4dChoZWFkZXI/LnVybEZpbGUpLFxuICAgIGZpbGVOYW1lOiBzYWZlVGV4dChoZWFkZXI/LmZpbGVOYW1lKSxcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IGNyZWF0ZUluaXRpYWxTdGF0ZSA9ICgpOiBFZGl0b3JTdGF0ZSA9PiAoe1xyXG4gIGJ1c3k6IGZhbHNlLFxyXG4gIHN0YXR1czogXCJcIixcclxuICBpc0VkaXRpbmc6IGZhbHNlLFxyXG4gIG1vZGFsRXJyb3I6IFwiXCIsXHJcbiAgbGluZVBhZ2U6IDEsXHJcbiAgZHJhZnQ6IGNyZWF0ZUVtcHR5RHJhZnQoKSxcclxufSk7XHJcblxyXG5jb25zdCBpc1ZhbGlkUmVxdWlyZWRHYXN0b1R5cGUgPSAocmF3VmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IHBhcnNlZFZhbHVlID0gTnVtYmVyLnBhcnNlSW50KFN0cmluZyhyYXdWYWx1ZSB8fCBcIlwiKS50cmltKCksIDEwKTtcclxuICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWRWYWx1ZSkgJiYgcGFyc2VkVmFsdWUgPiAwO1xyXG59O1xyXG5cclxuY29uc3QgZWRpdG9yUmVkdWNlciA9IChzdGF0ZTogRWRpdG9yU3RhdGUsIGFjdGlvbjogRWRpdG9yQWN0aW9uKTogRWRpdG9yU3RhdGUgPT4ge1xyXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgIGNhc2UgXCJoeWRyYXRlX2Zyb21faGVhZGVyXCI6XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgZHJhZnQ6IGNyZWF0ZURyYWZ0RnJvbUhlYWRlcihhY3Rpb24uaGVhZGVyKSxcclxuICAgICAgfTtcclxuICAgIGNhc2UgXCJwYXRjaF9zdGF0ZVwiOlxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIC4uLmFjdGlvbi5wYXRjaCxcclxuICAgICAgfTtcclxuICAgIGNhc2UgXCJzZXRfZHJhZnRfZmllbGRcIjpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICBkcmFmdDoge1xyXG4gICAgICAgICAgLi4uc3RhdGUuZHJhZnQsXHJcbiAgICAgICAgICBbYWN0aW9uLmZpZWxkXTogYWN0aW9uLnZhbHVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gc3RhdGU7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZVNldFN0YXRlVmFsdWUgPSA8VCw+KHZhbHVlOiBTZXRTdGF0ZUFjdGlvbjxUPiwgY3VycmVudDogVCk6IFQgPT4ge1xyXG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiA/ICh2YWx1ZSBhcyAocHJldlN0YXRlOiBUKSA9PiBUKShjdXJyZW50KSA6IHZhbHVlO1xyXG59O1xyXG5cclxuLy8gT3ducyBwYWdlLWxvY2FsIGVkaXQsIGRyYWZ0LCBhbmQgbGluZSBwYWdpbmcgc3RhdGUgZm9yIHRpY2tldCBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yID0gKHtcclxuICBoZWFkZXIsXHJcbiAgbGluZUNvdW50LFxyXG4gIHBhZ2VTaXplLFxyXG4gIGNhbkVkaXRUaWNrZXQsXHJcbiAgaXNMb2FkaW5nLFxyXG4gIGFsbG93QXNzaWduZWREcmFmdEVkaXQsXHJcbiAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gIG9uRm9yYmlkZGVuLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yQXJncykgPT4ge1xyXG4gIGNvbnN0IFtzdGF0ZSwgZGlzcGF0Y2hdID0gdXNlUmVkdWNlcihlZGl0b3JSZWR1Y2VyLCB1bmRlZmluZWQsIGNyZWF0ZUluaXRpYWxTdGF0ZSk7XHJcbiAgY29uc3QgW2Rlc2NyaXB0aW9uSW52YWxpZCwgc2V0RGVzY3JpcHRpb25JbnZhbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZ2FzdG9UeXBlSW52YWxpZCwgc2V0R2FzdG9UeXBlSW52YWxpZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2N1cnJlbmN5Q29kZUludmFsaWQsIHNldEN1cnJlbmN5Q29kZUludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGdhc3RvVHlwZUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBjdXJyZW5jeUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChzdGF0ZS5pc0VkaXRpbmcpIHJldHVybjtcclxuICAgIGRpc3BhdGNoKHsgdHlwZTogXCJoeWRyYXRlX2Zyb21faGVhZGVyXCIsIGhlYWRlciB9KTtcclxuICB9LCBbaGVhZGVyLCBzdGF0ZS5pc0VkaXRpbmddKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IG1heFBhZ2UgPSBNYXRoLm1heCgxLCBNYXRoLmNlaWwobGluZUNvdW50IC8gcGFnZVNpemUpKTtcclxuICAgIGlmIChzdGF0ZS5saW5lUGFnZSA+IG1heFBhZ2UpIHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IGxpbmVQYWdlOiBtYXhQYWdlIH0gfSk7XHJcbiAgICB9XHJcbiAgfSwgW2xpbmVDb3VudCwgcGFnZVNpemUsIHN0YXRlLmxpbmVQYWdlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc3RhdGUuaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBzZXREZXNjcmlwdGlvbkludmFsaWQoZmFsc2UpO1xyXG4gICAgc2V0R2FzdG9UeXBlSW52YWxpZChmYWxzZSk7XHJcbiAgICBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkKGZhbHNlKTtcclxuICB9LCBbc3RhdGUuaXNFZGl0aW5nXSk7XHJcblxyXG4gIGNvbnN0IHNldEJ1c3kgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxib29sZWFuPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBidXN5OiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuYnVzeSkgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuYnVzeV1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRTdGF0dXMgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxzdHJpbmc+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IHN0YXR1czogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLnN0YXR1cykgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuc3RhdHVzXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldElzRWRpdGluZyA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPGJvb2xlYW4+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IGlzRWRpdGluZzogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmlzRWRpdGluZykgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuaXNFZGl0aW5nXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldE1vZGFsRXJyb3IgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxzdHJpbmc+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IG1vZGFsRXJyb3I6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5tb2RhbEVycm9yKSB9IH0pO1xyXG4gICAgfSxcclxuICAgIFtzdGF0ZS5tb2RhbEVycm9yXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldExpbmVQYWdlID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248bnVtYmVyPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBsaW5lUGFnZTogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmxpbmVQYWdlKSB9IH0pO1xyXG4gICAgfSxcclxuICAgIFtzdGF0ZS5saW5lUGFnZV1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXREcmFmdERlc2NyaXB0aW9uID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIHNldERlc2NyaXB0aW9uSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcInNldF9kcmFmdF9maWVsZFwiLFxyXG4gICAgICAgIGZpZWxkOiBcImRlc2NyaXB0aW9uXCIsXHJcbiAgICAgICAgdmFsdWU6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5kZXNjcmlwdGlvbiksXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtzdGF0ZS5kcmFmdC5kZXNjcmlwdGlvbl1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXREcmFmdEdhc3RvVHlwZSA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBzZXRHYXN0b1R5cGVJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwic2V0X2RyYWZ0X2ZpZWxkXCIsXHJcbiAgICAgICAgZmllbGQ6IFwiZ2FzdG9UeXBlXCIsXHJcbiAgICAgICAgdmFsdWU6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5nYXN0b1R5cGUpLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuZHJhZnQuZ2FzdG9UeXBlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldERyYWZ0Q3VycmVuY3lDb2RlID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIHNldEN1cnJlbmN5Q29kZUludmFsaWQoZmFsc2UpO1xyXG4gICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJzZXRfZHJhZnRfZmllbGRcIixcclxuICAgICAgICBmaWVsZDogXCJjdXJyZW5jeUNvZGVcIixcclxuICAgICAgICB2YWx1ZTogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSksXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRW5hYmxlRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghaGVhZGVyIHx8IGlzTG9hZGluZykgcmV0dXJuO1xyXG4gICAgaWYgKGlzRnJvbVNoZWV0TGluaykgcmV0dXJuO1xyXG4gICAgaWYgKGhlYWRlci5zdGF0dXMgPT09IDEgJiYgIWFsbG93QXNzaWduZWREcmFmdEVkaXQpIHJldHVybjtcclxuICAgIGlmICghY2FuRWRpdFRpY2tldCkge1xyXG4gICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R2FzdG9UeXBlSW52YWxpZChmYWxzZSk7XHJcbiAgICBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkKGZhbHNlKTtcclxuICAgIGRpc3BhdGNoKHsgdHlwZTogXCJoeWRyYXRlX2Zyb21faGVhZGVyXCIsIGhlYWRlciB9KTtcclxuICAgIGRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLFxyXG4gICAgICBwYXRjaDoge1xyXG4gICAgICAgIG1vZGFsRXJyb3I6IFwiXCIsXHJcbiAgICAgICAgaXNFZGl0aW5nOiB0cnVlLFxyXG4gICAgICAgIHN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0VkaXRpbmdFbmFibGVkXCIsIFwiRWRpdGluZyBlbmFibGVkXCIpLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSwgW2FsbG93QXNzaWduZWREcmFmdEVkaXQsIGNhbkVkaXRUaWNrZXQsIGhlYWRlciwgaXNGcm9tU2hlZXRMaW5rLCBpc0xvYWRpbmcsIG9uRm9yYmlkZGVuXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNhbmNlbEVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIXN0YXRlLmlzRWRpdGluZykgcmV0dXJuO1xyXG4gICAgaWYgKCFoZWFkZXIpIHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IGlzRWRpdGluZzogZmFsc2UgfSB9KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdhc3RvVHlwZUludmFsaWQoZmFsc2UpO1xyXG4gICAgc2V0Q3VycmVuY3lDb2RlSW52YWxpZChmYWxzZSk7XHJcbiAgICBkaXNwYXRjaCh7IHR5cGU6IFwiaHlkcmF0ZV9mcm9tX2hlYWRlclwiLCBoZWFkZXIgfSk7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFwicGF0Y2hfc3RhdGVcIixcclxuICAgICAgcGF0Y2g6IHtcclxuICAgICAgICBpc0VkaXRpbmc6IGZhbHNlLFxyXG4gICAgICAgIG1vZGFsRXJyb3I6IFwiXCIsXHJcbiAgICAgICAgc3RhdHVzOiBpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0sIFtoZWFkZXIsIHN0YXRlLmlzRWRpdGluZ10pO1xyXG5cclxuICBjb25zdCBjYW5PcGVuU2F2ZUNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBub3JtYWxpemVkRGVzY3JpcHRpb24gPSBTdHJpbmcoc3RhdGUuZHJhZnQuZGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbmN5Q29kZSA9IFN0cmluZyhzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbklzVmFsaWQgPSAhIW5vcm1hbGl6ZWREZXNjcmlwdGlvbjtcclxuICAgIGNvbnN0IGdhc3RvVHlwZUlzVmFsaWQgPSBpc1ZhbGlkUmVxdWlyZWRHYXN0b1R5cGUoc3RhdGUuZHJhZnQuZ2FzdG9UeXBlKTtcclxuICAgIGNvbnN0IGN1cnJlbmN5SXNWYWxpZCA9ICEhbm9ybWFsaXplZEN1cnJlbmN5Q29kZTtcclxuXHJcbiAgICBzZXREZXNjcmlwdGlvbkludmFsaWQoIWRlc2NyaXB0aW9uSXNWYWxpZCk7XHJcbiAgICBzZXRHYXN0b1R5cGVJbnZhbGlkKCFnYXN0b1R5cGVJc1ZhbGlkKTtcclxuICAgIHNldEN1cnJlbmN5Q29kZUludmFsaWQoIWN1cnJlbmN5SXNWYWxpZCk7XHJcblxyXG4gICAgaWYgKGRlc2NyaXB0aW9uSXNWYWxpZCAmJiBnYXN0b1R5cGVJc1ZhbGlkICYmIGN1cnJlbmN5SXNWYWxpZCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtZXNzYWdlID0gIWRlc2NyaXB0aW9uSXNWYWxpZFxyXG4gICAgICA/IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fRGVzY3JpcHRpb25SZXF1aXJlZFwiLCBcIkRlc2NyaXB0aW9uIGlzIHJlcXVpcmVkLlwiKVxyXG4gICAgICA6ICFnYXN0b1R5cGVJc1ZhbGlkXHJcbiAgICAgICAgPyBpbmRUKFwiVGlja2V0c19WYWxpZGF0aW9uX0NhdGVnb3J5UmVxdWlyZWRcIiwgXCJDYXRlZ29yeSBpcyByZXF1aXJlZC5cIilcclxuICAgICAgICA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fQ3VycmVuY3lSZXF1aXJlZFwiLCBcIkN1cnJlbmN5IGlzIHJlcXVpcmVkLlwiKTtcclxuXHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFwicGF0Y2hfc3RhdGVcIixcclxuICAgICAgcGF0Y2g6IHtcclxuICAgICAgICBtb2RhbEVycm9yOiBtZXNzYWdlLFxyXG4gICAgICAgIHN0YXR1czogbWVzc2FnZSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICBpZiAoIWRlc2NyaXB0aW9uSXNWYWxpZCkge1xyXG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghZ2FzdG9UeXBlSXNWYWxpZCkge1xyXG4gICAgICAgIGdhc3RvVHlwZUlucHV0UmVmLmN1cnJlbnQ/LmZvY3VzKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjdXJyZW5jeUlucHV0UmVmLmN1cnJlbnQ/LmZvY3VzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSwgW3N0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSwgc3RhdGUuZHJhZnQuZ2FzdG9UeXBlXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBidXN5OiBzdGF0ZS5idXN5LFxyXG4gICAgc3RhdHVzOiBzdGF0ZS5zdGF0dXMsXHJcbiAgICBpc0VkaXRpbmc6IHN0YXRlLmlzRWRpdGluZyxcclxuICAgIG1vZGFsRXJyb3I6IHN0YXRlLm1vZGFsRXJyb3IsXHJcbiAgICBsaW5lUGFnZTogc3RhdGUubGluZVBhZ2UsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uOiBzdGF0ZS5kcmFmdC5kZXNjcmlwdGlvbixcclxuICAgIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICAgIGRlc2NyaXB0aW9uSW5wdXRSZWYsXHJcbiAgICBkcmFmdEdhc3RvVHlwZTogc3RhdGUuZHJhZnQuZ2FzdG9UeXBlLFxyXG4gICAgZ2FzdG9UeXBlSW52YWxpZCxcclxuICAgIGdhc3RvVHlwZUlucHV0UmVmLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSxcbiAgICBjdXJyZW5jeUNvZGVJbnZhbGlkLFxuICAgIGN1cnJlbmN5SW5wdXRSZWYsXG4gICAgZHJhZnRUcmFuc0RhdGU6IHN0YXRlLmRyYWZ0LnRyYW5zRGF0ZSxcbiAgICBkcmFmdFRpY2tldFRpbWU6IHN0YXRlLmRyYWZ0LnRpY2tldFRpbWUsXG4gICAgZHJhZnRDb21lbnRhcmlvOiBzdGF0ZS5kcmFmdC5jb21lbnRhcmlvLFxuICAgIGRyYWZ0VXJsRmlsZTogc3RhdGUuZHJhZnQudXJsRmlsZSxcbiAgICBkcmFmdEZpbGVOYW1lOiBzdGF0ZS5kcmFmdC5maWxlTmFtZSxcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldExpbmVQYWdlLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcbiAgICBzZXREcmFmdEdhc3RvVHlwZSxcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBjYW5PcGVuU2F2ZUNvbmZpcm0sXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQge1xyXG4gIG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIHJlc29sdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxuICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG4vLyBQYXJzZXMgcm91dGUgY29udGV4dCBvbmNlIGFuZCBleHBvc2VzIHN0YWJsZSBmbGFncyBmb3IgdGlja2V0IGRldGFpbCBmbG93cy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQgPSAoKSA9PiB7XHJcbiAgY29uc3Qgcm91dGVQYXJhbXMgPSB1c2VNZW1vKCgpID0+IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCksIFtdKTtcclxuICBjb25zdCBmaWxlSWQgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfVElDS0VUX0ZJTEVfSURfXyksIFtdKTtcclxuICBjb25zdCBhdXRvRWRpdE1vZGUgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcIm1vZGVcIikpLnRvTG93ZXJDYXNlKCkgPT09IFwiZWRpdFwiLCBbcm91dGVQYXJhbXNdKTtcclxuICBjb25zdCByb3V0ZU9yaWdpbiA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwib3JpZ2luXCIpKS50b0xvd2VyQ2FzZSgpLCBbcm91dGVQYXJhbXNdKTtcclxuICBjb25zdCByb3V0ZVNoZWV0SWQgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcInNoZWV0SWRcIikpLCBbcm91dGVQYXJhbXNdKTtcclxuICBjb25zdCByb3V0ZVNoZWV0TGluZVJlY0lkID0gdXNlTWVtbyhcclxuICAgICgpID0+IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcInNoZWV0TGluZVJlY0lkXCIpIHx8IHJvdXRlUGFyYW1zLmdldChcImxpbmVSZWNJZFwiKSksXHJcbiAgICBbcm91dGVQYXJhbXNdXHJcbiAgKTtcclxuICBjb25zdCBleHBsaWNpdFJldHVybkNvbnRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT5cclxuICAgICAgbm9ybWFsaXplRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoe1xyXG4gICAgICAgIGZpbGVJZCxcclxuICAgICAgICBvcmlnaW46IHJvdXRlT3JpZ2luLFxyXG4gICAgICAgIHNoZWV0SWQ6IHJvdXRlU2hlZXRJZCxcclxuICAgICAgICBzaGVldExpbmVSZWNJZDogcm91dGVTaGVldExpbmVSZWNJZCxcclxuICAgICAgfSksXHJcbiAgICBbZmlsZUlkLCByb3V0ZU9yaWdpbiwgcm91dGVTaGVldElkLCByb3V0ZVNoZWV0TGluZVJlY0lkXVxyXG4gICk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWV4cGxpY2l0UmV0dXJuQ29udGV4dCkgcmV0dXJuO1xyXG4gICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KGV4cGxpY2l0UmV0dXJuQ29udGV4dCk7XHJcbiAgfSwgW2V4cGxpY2l0UmV0dXJuQ29udGV4dF0pO1xyXG5cclxuICByZXR1cm4gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCB0aWNrZXRSZXR1cm5Db250ZXh0ID0gcmVzb2x2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KGZpbGVJZCwgZXhwbGljaXRSZXR1cm5Db250ZXh0KTtcclxuICAgIGNvbnN0IGRldGFpbE9yaWdpbiA9IHRpY2tldFJldHVybkNvbnRleHQ/Lm9yaWdpbiB8fCByb3V0ZU9yaWdpbjtcclxuICAgIGNvbnN0IGNvbnRleHRTaGVldElkID0gdGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCB8fCByb3V0ZVNoZWV0SWQ7XHJcbiAgICBjb25zdCBjb250ZXh0TGluZVJlY0lkID0gdGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRMaW5lUmVjSWQgfHwgcm91dGVTaGVldExpbmVSZWNJZDtcclxuICAgIGNvbnN0IGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSA9IGRldGFpbE9yaWdpbiA9PT0gXCJzaGVldC1jcmVhdGVcIjtcclxuICAgIGNvbnN0IGlzRnJvbUV4cGVuc2VMaW5lID0gZGV0YWlsT3JpZ2luID09PSBcImV4cGVuc2UtbGluZVwiICYmICEhY29udGV4dFNoZWV0SWQgJiYgISFjb250ZXh0TGluZVJlY0lkO1xyXG4gICAgY29uc3QgaXNGcm9tU2hlZXRMaW5rID0gZGV0YWlsT3JpZ2luID09PSBcInNoZWV0LWxpbmtcIiAmJiAhIWNvbnRleHRTaGVldElkO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGF1dG9FZGl0TW9kZSxcclxuICAgICAgZGV0YWlsT3JpZ2luLFxyXG4gICAgICBjb250ZXh0U2hlZXRJZCxcclxuICAgICAgY29udGV4dExpbmVSZWNJZCxcclxuICAgICAgaXNGcm9tRXhwZW5zZVNoZWV0Q3JlYXRlLFxyXG4gICAgICBpc0Zyb21FeHBlbnNlTGluZSxcclxuICAgICAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gICAgICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gICAgfTtcclxuICB9LCBbYXV0b0VkaXRNb2RlLCBleHBsaWNpdFJldHVybkNvbnRleHQsIGZpbGVJZCwgcm91dGVPcmlnaW4sIHJvdXRlU2hlZXRJZCwgcm91dGVTaGVldExpbmVSZWNJZF0pO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgfSBmcm9tIFwiLi4vLi4vZXhwZW5zZUZvcm1hdHRlcnMudHNcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50cy9leHBlbnNlVGlja2V0U3RhdHVzQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXlBcmdzID0ge1xyXG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw7XG4gIGRyYWZ0R2FzdG9UeXBlOiBzdHJpbmc7XG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XG4gIGRyYWZ0VGlja2V0VGltZTogc3RyaW5nO1xuICBkcmFmdEZpbGVOYW1lOiBzdHJpbmc7XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgZ2FzdG9UeXBlTGFiZWxNYXA6IE1hcDxzdHJpbmcsIHN0cmluZz47XG59O1xuXG5jb25zdCBmb3JtYXRFeHBlbnNlRGlzcGxheVRpbWUgPSAocmF3Pzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgdmFsdWUgPSBzYWZlVGV4dChyYXcpO1xuICBpZiAoIXZhbHVlIHx8IHZhbHVlID09PSBcIjBcIikgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3Qgc2Vjb25kc1ZhbHVlID0gTnVtYmVyKHZhbHVlKTtcbiAgaWYgKE51bWJlci5pc0ludGVnZXIoc2Vjb25kc1ZhbHVlKSAmJiBzZWNvbmRzVmFsdWUgPj0gMCAmJiBzZWNvbmRzVmFsdWUgPD0gODYzOTkpIHtcbiAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3Ioc2Vjb25kc1ZhbHVlIC8gMzYwMCk7XG4gICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY29uZHNWYWx1ZSAlIDM2MDApIC8gNjApO1xuICAgIGNvbnN0IHNlY29uZHMgPSBzZWNvbmRzVmFsdWUgJSA2MDtcbiAgICByZXR1cm4gW2hvdXJzLCBtaW51dGVzLCBzZWNvbmRzXS5tYXAoKGVudHJ5KSA9PiBTdHJpbmcoZW50cnkpLnBhZFN0YXJ0KDIsIFwiMFwiKSkuam9pbihcIjpcIik7XG4gIH1cblxuICBjb25zdCBtYXRjaCA9IHZhbHVlLm1hdGNoKC9eKFxcZHsxLDJ9KTooWzAtNV1cXGQpKD86OihbMC01XVxcZCkpPyQvKTtcbiAgaWYgKCFtYXRjaCkgcmV0dXJuIHZhbHVlO1xuXG4gIGNvbnN0IGhvdXJzID0gTnVtYmVyLnBhcnNlSW50KG1hdGNoWzFdIHx8IFwiXCIsIDEwKTtcbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGhvdXJzKSB8fCBob3VycyA8IDAgfHwgaG91cnMgPiAyMykgcmV0dXJuIHZhbHVlO1xuXG4gIHJldHVybiBgJHtTdHJpbmcoaG91cnMpLnBhZFN0YXJ0KDIsIFwiMFwiKX06JHttYXRjaFsyXX06JHttYXRjaFszXSB8fCBcIjAwXCJ9YDtcbn07XG5cbi8vIENlbnRyYWxpemVzIGRpc3BsYXktb25seSB2YWx1ZXMgc28gdGhlIHBhZ2UgY29udGFpbmVyIHN0YXlzIGZvY3VzZWQgb24gZmxvdyB3aXJpbmcuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXkgPSAoe1xuICBoZWFkZXIsXG4gIGRyYWZ0R2FzdG9UeXBlLFxuICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgZHJhZnRUcmFuc0RhdGUsXG4gIGRyYWZ0VGlja2V0VGltZSxcbiAgZHJhZnRGaWxlTmFtZSxcbiAgaXNFZGl0aW5nLFxuICBnYXN0b1R5cGVMYWJlbE1hcCxcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5QXJncykgPT4ge1xuICBjb25zdCBwYWdpbmF0aW9uTGFiZWxzID0gdXNlTWVtbyhcclxuICAgICgpID0+ICh7XHJcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXHJcbiAgICAgIHByZXY6IGluZFQoXCJIaXN0b3J5X1BhZ2VfUHJldlwiLCBcIlByZXZpb3VzXCIpLFxyXG4gICAgICBuZXh0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpLFxyXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxyXG4gICAgfSksXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHByZXZpZXdBbHRUZXh0ID0gdXNlTWVtbyhcclxuICAgICgpID0+IHNhZmVUZXh0KGlzRWRpdGluZyA/IGRyYWZ0RmlsZU5hbWUgOiBoZWFkZXI/LmZpbGVOYW1lKSB8fCBpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIiksXHJcbiAgICBbZHJhZnRGaWxlTmFtZSwgaGVhZGVyPy5maWxlTmFtZSwgaXNFZGl0aW5nXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHN0YXR1c0xhYmVsID0gdXNlTWVtbygoKSA9PiBnZXRFeHBlbnNlVGlja2V0U3RhdHVzTGFiZWwoaGVhZGVyPy5zdGF0dXMpLCBbaGVhZGVyPy5zdGF0dXNdKTtcclxuXHJcbiAgY29uc3QgZ2FzdG9UeXBlTGFiZWwgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IGN1cnJlbnRHYXN0b1R5cGUgPSBpc0VkaXRpbmcgPyBkcmFmdEdhc3RvVHlwZSA6IGhlYWRlcj8uZ2FzdG9UeXBlID09PSBudWxsID8gXCJcIiA6IFN0cmluZyhoZWFkZXI/Lmdhc3RvVHlwZSA/PyBcIlwiKTtcclxuICAgIGlmICghY3VycmVudEdhc3RvVHlwZSkge1xyXG4gICAgICByZXR1cm4gaW5kVChcIkNvbW1vbl9Ob3RBdmFpbGFibGVcIiwgXCJOL0FcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2FzdG9UeXBlTGFiZWxNYXAuZ2V0KFN0cmluZyhjdXJyZW50R2FzdG9UeXBlKSkgfHwgU3RyaW5nKGN1cnJlbnRHYXN0b1R5cGUpO1xyXG4gIH0sIFtkcmFmdEdhc3RvVHlwZSwgZ2FzdG9UeXBlTGFiZWxNYXAsIGhlYWRlcj8uZ2FzdG9UeXBlLCBpc0VkaXRpbmddKTtcclxuXHJcbiAgY29uc3QgdG90YWxBbW91bnRUZXh0ID0gdXNlTWVtbyhcclxuICAgICgpID0+IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShoZWFkZXI/LnRvdGFsQW1vdW50ID8/IG51bGwsIChpc0VkaXRpbmcgPyBkcmFmdEN1cnJlbmN5Q29kZSA6IGhlYWRlcj8uY3VycmVuY3lDb2RlKSB8fCBoZWFkZXI/LmN1cnJlbmN5Q29kZSksXHJcbiAgICBbZHJhZnRDdXJyZW5jeUNvZGUsIGhlYWRlcj8uY3VycmVuY3lDb2RlLCBoZWFkZXI/LnRvdGFsQW1vdW50LCBpc0VkaXRpbmddXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgdHJhbnNEYXRlVGV4dCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGlzRWRpdGluZyA/IGRyYWZ0VHJhbnNEYXRlIDogaGVhZGVyPy50aWNrZXREYXRlIHx8IGhlYWRlcj8udHJhbnNEYXRlLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIiksXG4gICAgW2RyYWZ0VHJhbnNEYXRlLCBoZWFkZXI/LnRpY2tldERhdGUsIGhlYWRlcj8udHJhbnNEYXRlLCBpc0VkaXRpbmddXG4gICk7XG5cbiAgY29uc3QgdGlja2V0VGltZVRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+IGZvcm1hdEV4cGVuc2VEaXNwbGF5VGltZShpc0VkaXRpbmcgPyBkcmFmdFRpY2tldFRpbWUgOiBoZWFkZXI/LnRpY2tldFRpbWUpLFxuICAgIFtkcmFmdFRpY2tldFRpbWUsIGhlYWRlcj8udGlja2V0VGltZSwgaXNFZGl0aW5nXVxuICApO1xuXG4gIHJldHVybiB7XG4gICAgcGFnaW5hdGlvbkxhYmVscyxcclxuICAgIHByZXZpZXdBbHRUZXh0LFxyXG4gICAgc3RhdHVzTGFiZWwsXHJcbiAgICBnYXN0b1R5cGVMYWJlbCxcbiAgICB0b3RhbEFtb3VudFRleHQsXG4gICAgdHJhbnNEYXRlVGV4dCxcbiAgICB0aWNrZXRUaW1lVGV4dCxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsQ29uZmlybVN0YXRlQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsRXJyb3I6IHN0cmluZztcclxuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRTdGF0dXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gRW5jYXBzdWxhdGVzIGNvbmZpcm0gbW9kYWwgc3RhdGUgc28gdGhlIHBhZ2UgY29udGFpbmVyIHN0YXlzIGZvY3VzZWQgb24gZmxvdyB3aXJpbmcuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQ29uZmlybVN0YXRlID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsRXJyb3IsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBzZXRTdGF0dXMsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGVBcmdzKSA9PiB7XHJcbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XHJcbiAgICBkZWZhdWx0Q29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpLFxyXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XHJcbiAgICAgICAgc2V0U3RhdHVzKG1zZyk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LCBbYnVzeSwgaGFuZGxlQ29uZmlybSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzXSk7XHJcblxyXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XHJcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcclxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxyXG4gICAgOiAhYnVzeSAmJiBtb2RhbEVycm9yXHJcbiAgICAgID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpXHJcbiAgICAgIDogbW9kYWwuY29uZmlybVRleHQgfHwgaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIik7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghYnVzeSAmJiBtb2RhbEVycm9yKSB7XHJcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2b2lkIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xyXG4gIH0sIFtidXN5LCBjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbW9kYWxFcnJvcl0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbW9kYWwsXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICAgIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgICBtb2RhbENhbmNlbFRleHQsXHJcbiAgICBtb2RhbENvbmZpcm1UZXh0LFxyXG4gICAgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGFwcGVuZEV4cGVuc2VUaWNrZXRSZXR1cm5RdWVyeSxcclxuICBidWlsZEV4cGVuc2VTaGVldERldGFpbFVybCxcclxuICB0eXBlIEV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG59IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dC50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsSW50ZXJhY3Rpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGNvbnRleHRTaGVldElkOiBzdHJpbmc7XHJcbiAgaXNGcm9tU2hlZXRMaW5rOiBib29sZWFuO1xyXG4gIGhlYWRlckV4cGVuc2VTaGVldElkOiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGNhbk9wZW5TYXZlQ29uZmlybTogKCkgPT4gYm9vbGVhbjtcclxuICBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQ6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgYnlwYXNzV29ya2Zsb3dHdWFyZDogYm9vbGVhbjtcclxuICBsaW5lQ29udGFpbmVyUmVmOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBvcGVuUHJldmlldzogKCkgPT4gUHJvbWlzZTx2b2lkPjtcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0PzogRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQgfCBudWxsO1xyXG59O1xyXG5cclxuLy8gR3JvdXBzIHRpY2tldCBkZXRhaWwgbmF2aWdhdGlvbiBhbmQgbGluZS1jYXJkIGludGVyYWN0aW9ucyBiZWhpbmQgc3RhYmxlIGNhbGxiYWNrcy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgZmlsZUlkLFxyXG4gIGNvbnRleHRTaGVldElkLFxyXG4gIGlzRnJvbVNoZWV0TGluayxcclxuICBoZWFkZXJFeHBlbnNlU2hlZXRJZCxcclxuICBpc0VkaXRpbmcsXHJcbiAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gIGhhbmRsZVBlcnNpc3RIZWFkZXJEcmFmdCxcclxuICBieXBhc3NXb3JrZmxvd0d1YXJkLFxyXG4gIGxpbmVDb250YWluZXJSZWYsXHJcbiAgb3BlblByZXZpZXcsXHJcbiAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9uc0FyZ3MpID0+IHtcclxuICBjb25zdCBwZXJzaXN0SGVhZGVyRHJhZnRJZk5lZWRlZCA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmICghaXNFZGl0aW5nKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY2FuT3BlblNhdmVDb25maXJtKCkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQoKTtcclxuICB9LCBbY2FuT3BlblNhdmVDb25maXJtLCBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQsIGlzRWRpdGluZ10pO1xyXG5cclxuICBjb25zdCBvcGVuTGluZURldGFpbCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKHJhd0xpbmVSZWNJZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGlmIChpc0Zyb21TaGVldExpbmspIHJldHVybjtcclxuICAgICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgICAgY29uc3QgbGluZVJlY0lkID0gc2FmZVRleHQocmF3TGluZVJlY0lkKTtcclxuICAgICAgaWYgKCFsaW5lUmVjSWQgfHwgIWZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3Qgc2hvdWxkT3BlbkluRWRpdE1vZGUgPSBpc0VkaXRpbmc7XHJcbiAgICAgIGlmIChzaG91bGRPcGVuSW5FZGl0TW9kZSkge1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZU9rID0gYXdhaXQgcGVyc2lzdEhlYWRlckRyYWZ0SWZOZWVkZWQoKTtcclxuICAgICAgICBpZiAoIXVwZGF0ZU9rKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICAgIGZpbGVJZCxcclxuICAgICAgICBsaW5lUmVjSWQsXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoc2hvdWxkT3BlbkluRWRpdE1vZGUpIHtcclxuICAgICAgICBxdWVyeS5zZXQoXCJtb2RlXCIsIFwiZWRpdFwiKTtcclxuICAgICAgfVxyXG4gICAgICBhcHBlbmRFeHBlbnNlVGlja2V0UmV0dXJuUXVlcnkocXVlcnksIHRpY2tldFJldHVybkNvbnRleHQpO1xyXG5cclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0TGluZURldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiBzaG91bGRPcGVuSW5FZGl0TW9kZSB8fCBieXBhc3NXb3JrZmxvd0d1YXJkLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIGJ5cGFzc1dvcmtmbG93R3VhcmQsXHJcbiAgICAgIGZpbGVJZCxcclxuICAgICAgaXNFZGl0aW5nLFxyXG4gICAgICBpc0Zyb21TaGVldExpbmssXHJcbiAgICAgIHBlcnNpc3RIZWFkZXJEcmFmdElmTmVlZGVkLFxyXG4gICAgICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG9wZW5DcmVhdGVMaW5lRGV0YWlsID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGlzRnJvbVNoZWV0TGluaykgcmV0dXJuO1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgIGlmICghZmlsZUlkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgdXBkYXRlT2sgPSBhd2FpdCBwZXJzaXN0SGVhZGVyRHJhZnRJZk5lZWRlZCgpO1xyXG4gICAgaWYgKCF1cGRhdGVPaykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgZmlsZUlkLFxyXG4gICAgICBtb2RlOiBcImNyZWF0ZVwiLFxyXG4gICAgfSk7XHJcbiAgICBhcHBlbmRFeHBlbnNlVGlja2V0UmV0dXJuUXVlcnkocXVlcnksIHRpY2tldFJldHVybkNvbnRleHQpO1xyXG5cclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldExpbmVEZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcclxuICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcclxuICAgICAgYnlwYXNzR3VhcmRPbmNlOiBpc0VkaXRpbmcgfHwgYnlwYXNzV29ya2Zsb3dHdWFyZCxcclxuICAgIH0pO1xyXG4gIH0sIFtidXN5LCBieXBhc3NXb3JrZmxvd0d1YXJkLCBmaWxlSWQsIGlzRWRpdGluZywgaXNGcm9tU2hlZXRMaW5rLCBwZXJzaXN0SGVhZGVyRHJhZnRJZk5lZWRlZCwgdGlja2V0UmV0dXJuQ29udGV4dF0pO1xyXG5cclxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcclxuICAgICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xyXG4gICAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xyXG4gICAgICBpZiAoIWxpbmVDb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xyXG4gICAgICByZXR1cm4gY2FyZDtcclxuICAgIH0sXHJcbiAgICBbbGluZUNvbnRhaW5lclJlZl1cclxuICApO1xyXG5cclxuICBjb25zdCBvcGVuRmlsZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHZvaWQgb3BlblByZXZpZXcoKTtcclxuICB9LCBbb3BlblByZXZpZXddKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChpc0Zyb21TaGVldExpbmspIHJldHVybjtcclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQodGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCB8fCBoZWFkZXJFeHBlbnNlU2hlZXRJZCB8fCBjb250ZXh0U2hlZXRJZCk7XHJcbiAgICBpZiAoIXNhZmVTaGVldElkKSByZXR1cm47XHJcblxyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwoc2FmZVNoZWV0SWQpLCB7XHJcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxyXG4gICAgfSk7XHJcbiAgfSwgW2NvbnRleHRTaGVldElkLCBoZWFkZXJFeHBlbnNlU2hlZXRJZCwgaXNFZGl0aW5nLCBpc0Zyb21TaGVldExpbmssIHRpY2tldFJldHVybkNvbnRleHRdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG9wZW5DcmVhdGVMaW5lRGV0YWlsLFxyXG4gICAgb3BlbkxpbmVEZXRhaWwsXHJcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcclxuICAgIG9wZW5GaWxlLFxyXG4gICAgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB9IGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcbmltcG9ydCB7IGhhc0V4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdTb3VyY2UgfSBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvZXhwZW5zZVRpY2tldFByZXZpZXdVdGlscy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IEV4cGVuc2VSZWFkT25seUZpZWxkIGZyb20gXCIuL0V4cGVuc2VSZWFkT25seUZpZWxkLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XG5cclxuY29uc3QgaGFzUmVhbEV4cGVuc2VTaGVldFZhbHVlID0gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gZmFsc2U7XHJcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwiLVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwiMFwiKSByZXR1cm4gZmFsc2U7XHJcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwibi9hXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJuYVwiKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtUHJvcHMgPSB7XHJcbiAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyO1xyXG4gIHN0YXR1c0xhYmVsOiBzdHJpbmc7XHJcbiAgZ2FzdG9UeXBlTGFiZWw6IHN0cmluZztcbiAgdG90YWxBbW91bnRUZXh0OiBzdHJpbmc7XG4gIHRyYW5zRGF0ZVRleHQ6IHN0cmluZztcbiAgdGlja2V0VGltZVRleHQ6IHN0cmluZztcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBnYXN0b1R5cGVPcHRpb25zOiBBcnJheTx7IHZhbHVlOiBzdHJpbmc7IHRleHQ6IHN0cmluZyB9PjtcclxuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb25JbnZhbGlkOiBib29sZWFuO1xyXG4gIGRlc2NyaXB0aW9uSW5wdXRSZWY6IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICBkcmFmdEdhc3RvVHlwZTogc3RyaW5nO1xuICBnYXN0b1R5cGVJbnZhbGlkOiBib29sZWFuO1xuICBnYXN0b1R5cGVJbnB1dFJlZjogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBjdXJyZW5jeUNvZGVJbnZhbGlkOiBib29sZWFuO1xuICBjdXJyZW5jeUlucHV0UmVmOiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XG4gIGRyYWZ0VGlja2V0VGltZTogc3RyaW5nO1xuICBkcmFmdFVybEZpbGU6IHN0cmluZztcbiAgZHJhZnRGaWxlTmFtZTogc3RyaW5nO1xuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uT3BlbkZpbGU6ICgpID0+IHZvaWQ7XG4gIG9uT3BlbkV4cGVuc2VTaGVldD86ICgpID0+IHZvaWQ7XG4gIGhpZGVPcGVuRmlsZUFjdGlvbj86IGJvb2xlYW47XG59O1xuXHJcbi8vIFJlYWQtb25seSBhbmQgZWRpdGFibGUgaGVhZGVyIGZvcm0gZm9yIHRpY2tldCBkZXRhaWwuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtID0gKHtcclxuICBoZWFkZXIsXHJcbiAgc3RhdHVzTGFiZWwsXHJcbiAgZ2FzdG9UeXBlTGFiZWwsXG4gIHRvdGFsQW1vdW50VGV4dCxcbiAgdHJhbnNEYXRlVGV4dCxcbiAgdGlja2V0VGltZVRleHQsXG4gIGlzRWRpdGluZyxcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICBkZXNjcmlwdGlvbklucHV0UmVmLFxyXG4gIGRyYWZ0R2FzdG9UeXBlLFxuICBnYXN0b1R5cGVJbnZhbGlkLFxuICBnYXN0b1R5cGVJbnB1dFJlZixcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gIGN1cnJlbmN5Q29kZUludmFsaWQsXG4gIGN1cnJlbmN5SW5wdXRSZWYsXG4gIGRyYWZ0VHJhbnNEYXRlLFxuICBkcmFmdFRpY2tldFRpbWUsXG4gIGRyYWZ0VXJsRmlsZSxcbiAgZHJhZnRGaWxlTmFtZSxcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlLFxuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlLFxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlLFxuICBvbk9wZW5GaWxlLFxuICBvbk9wZW5FeHBlbnNlU2hlZXQsXG4gIGhpZGVPcGVuRmlsZUFjdGlvbiA9IGZhbHNlLFxufTogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm1Qcm9wcykgPT4ge1xuICBjb25zdCBwcmV2aWV3VXJsID0gc2FmZVRleHQoaXNFZGl0aW5nID8gZHJhZnRVcmxGaWxlIDogaGVhZGVyLnVybEZpbGUpO1xuICBjb25zdCBjYW5PcGVuRmlsZSA9IGhhc0V4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdTb3VyY2UocHJldmlld1VybCk7XG4gIGNvbnN0IHNob3dFeHBlbnNlU2hlZXRGaWVsZCA9IGhhc1JlYWxFeHBlbnNlU2hlZXRWYWx1ZShoZWFkZXIuaG9qYUdhc3Rvc0lkRGlzcGxheSk7XG4gIGNvbnN0IGxvY2FsZSA9IGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiO1xuICBjb25zdCBkaXNwbGF5RGF0ZVRleHQgPVxuICAgIHRyYW5zRGF0ZVRleHQgfHxcbiAgICBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoaGVhZGVyLnRpY2tldERhdGUgfHwgaGVhZGVyLnRyYW5zRGF0ZSwgbG9jYWxlKSB8fFxuICAgIFwiLVwiO1xuICBjb25zdCBsb2NrZWREcmFmdERhdGVUZXh0ID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGRyYWZ0VHJhbnNEYXRlLCBsb2NhbGUpIHx8IGRpc3BsYXlEYXRlVGV4dDtcblxuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInJlbGF0aXZlIHNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItemluYy0yMDAgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV1cIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX0ZpbGVJZFwiLCBcIlRpY2tldFwiKX1cclxuICAgICAgICAgIHZhbHVlPXtoZWFkZXIuZmlsZUlkIHx8IFwiLVwifVxyXG4gICAgICAgIC8+XHJcblxyXG4gICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX1N0YXR1c1wiLCBcIlN0YXR1c1wiKX1cclxuICAgICAgICAgIHZhbHVlPXtzdGF0dXNMYWJlbCB8fCBcIi1cIn1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX08L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICByZWY9e2Rlc2NyaXB0aW9uSW5wdXRSZWZ9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sJHtkZXNjcmlwdGlvbkludmFsaWQgPyBcIiBib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpib3JkZXItcm9zZS00MDAgZm9jdXM6cmluZy1yb3NlLTIwMFwiIDogXCJcIn1gfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XHJcbiAgICAgICAgICAgICAgYXJpYS1pbnZhbGlkPXtkZXNjcmlwdGlvbkludmFsaWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIn1cclxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2hlYWRlci5kZXNjcmlwdGlvbiB8fCBcIi1cIn1cclxuICAgICAgICAgICAgZnVsbFdpZHRoXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcblxyXG4gICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxyXG4gICAgICAgICAgICBvcHRpb25zPXtnYXN0b1R5cGVPcHRpb25zfVxyXG4gICAgICAgICAgICB2YWx1ZT17ZHJhZnRHYXN0b1R5cGV9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIil9XHJcbiAgICAgICAgICAgIGlucHV0UmVmPXtnYXN0b1R5cGVJbnB1dFJlZn1cclxuICAgICAgICAgICAgaW52YWxpZD17Z2FzdG9UeXBlSW52YWxpZH1cclxuICAgICAgICAgICAgdXNlUG9ydGFsXHJcbiAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cclxuICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17Z2FzdG9UeXBlTGFiZWwgfHwgXCItXCJ9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcblxyXG4gICAgICAgIHtzaG93RXhwZW5zZVNoZWV0RmllbGQgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX0V4cGVuc2VTaGVldERpc3BsYXlcIiwgXCJFeHBlbnNlIHNoZWV0XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17aGVhZGVyLmhvamFHYXN0b3NJZERpc3BsYXkgfHwgXCItXCJ9XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uT3BlbkV4cGVuc2VTaGVldH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cclxuICAgICAgICAgICAgaW52YWxpZD17Y3VycmVuY3lDb2RlSW52YWxpZH1cclxuICAgICAgICAgICAgaW5wdXRSZWY9e2N1cnJlbmN5SW5wdXRSZWZ9XHJcbiAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtdGlja2V0LWRldGFpbC1jdXJyZW5jeVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtoZWFkZXIuY3VycmVuY3lDb2RlIHx8IFwiLVwifVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApfVxyXG5cclxuICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Ub3RhbEFtb3VudFwiLCBcIlRvdGFsIGFtb3VudFwiKX1cclxuICAgICAgICAgIHZhbHVlPXt0b3RhbEFtb3VudFRleHQgfHwgXCItXCJ9XHJcbiAgICAgICAgLz5cclxuXHJcbiAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX1RpY2tldERhdGVcIiwgXCJUaWNrZXQgZGF0ZVwiKX1cbiAgICAgICAgICB2YWx1ZT17aXNFZGl0aW5nID8gbG9ja2VkRHJhZnREYXRlVGV4dCA6IGRpc3BsYXlEYXRlVGV4dH1cbiAgICAgICAgLz5cblxuICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmllbGRfVGlja2V0VGltZVwiLCBcIlRpY2tldCB0aW1lXCIpfVxuICAgICAgICAgIHZhbHVlPXtpc0VkaXRpbmcgPyBkcmFmdFRpY2tldFRpbWUgfHwgdGlja2V0VGltZVRleHQgfHwgXCItXCIgOiB0aWNrZXRUaW1lVGV4dCB8fCBcIi1cIn1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuXHJcbiAgICAgIHtjYW5PcGVuRmlsZSAmJiAhaGlkZU9wZW5GaWxlQWN0aW9uID8gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWVuZFwiPlxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiXHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uT3BlbkZpbGV9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtpbmRUKFwiVGlja2V0c19EZXRhaWxfVmlld0F0dGFjaG1lbnRcIiwgXCJWZXIgYWRqdW50b1wiKX1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dCBmcm9tIFwiLi9FeHBlbnNlUHJvamVjdEZpbHRlcklucHV0LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVJlYWRPbmx5RmllbGQgZnJvbSBcIi4vRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgZnJvbSBcIi4vRXhwZW5zZVNlY3Rpb25EaXZpZGVyLnRzeFwiO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lU2VjdGlvblByb3BzID0ge1xyXG4gIHByb2plY3RJZDogc3RyaW5nO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBpc0xvYWRpbmc6IGJvb2xlYW47XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIGVycm9yTWVzc2FnZT86IHN0cmluZztcclxuICBvblByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIGV4cGVuc2Utc2hlZXQgbGluZSBmaWVsZHMgdGhhdCBhcmUgZWRpdGVkIGZyb20gdGhlIGxpbmtlZCB0aWNrZXQgZGV0YWlsIGZsb3cuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVTZWN0aW9uID0gKHtcclxuICBwcm9qZWN0SWQsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzTG9hZGluZyxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIGVycm9yTWVzc2FnZSA9IFwiXCIsXHJcbiAgb25Qcm9qZWN0SWRDaGFuZ2UsXHJcbn06IEV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVTZWN0aW9uUHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNwYWNlLXktMFwiPlxuICAgICAgPEV4cGVuc2VTZWN0aW9uRGl2aWRlciBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfTGluZV9FeHBlbnNlXCIsIFwiRXhwZW5zZSBsaW5lXCIpfSBjbGFzc05hbWU9XCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlci0tc3BhY2VkXCIgLz5cblxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXppbmMtMjAwIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCI+XHJcbiAgICAgICAge2lzTG9hZGluZyA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXppbmMtNzAwXCI+XHJcbiAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgc2l6ZS01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cclxuICAgICAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IGVycm9yTWVzc2FnZSA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXIgdGV4dC1zbVwiPntlcnJvck1lc3NhZ2V9PC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgICAgIDxFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0XHJcbiAgICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9XHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1Byb2plY3RfUGxhY2Vob2xkZXJcIiwgXCJQcm9qZWN0IGlkXCIpfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e3Byb2plY3RJZH1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvblByb2plY3RJZENoYW5nZX1cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXtkaXNhYmxlZH1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e3Byb2plY3RJZCB8fCBcIi1cIn1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9zZWN0aW9uPlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lU2VjdGlvbjtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VEYXRlUGFydHMgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VOdW1iZXIgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVNlY3Rpb25EaXZpZGVyIGZyb20gXCIuL0V4cGVuc2VTZWN0aW9uRGl2aWRlci50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4vRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcclxuXHJcbnR5cGUgUGFnaW5hdGlvbkxhYmVscyA9IHtcclxuICBmaXJzdDogc3RyaW5nO1xyXG4gIHByZXY6IHN0cmluZztcclxuICBuZXh0OiBzdHJpbmc7XHJcbiAgbGFzdDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0TGluZXNMaXN0UHJvcHMgPSB7XHJcbiAgdmlzaWJsZUxpbmVzOiBFeHBlbnNlVGlja2V0RGV0YWlsTGluZVtdO1xyXG4gIHRvdGFsTGluZVBhZ2VzOiBudW1iZXI7XHJcbiAgbGluZVBhZ2U6IG51bWJlcjtcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBwYWdpbmF0aW9uTGFiZWxzOiBQYWdpbmF0aW9uTGFiZWxzO1xyXG4gIGNvbnRhaW5lclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgb25MaW5lUGFnZUNoYW5nZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcclxuICBvbk9wZW5MaW5lOiAobGluZVJlY0lkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXRRdHlWYWx1ZSA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBmb3JtYXRFeHBlbnNlTnVtYmVyKHZhbHVlLCB7XG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICBmYWxsYmFjazogXCItXCIsXG4gIH0pO1xufTtcblxuY29uc3QgRU1QVFlfREFURV9QQVJUUzogRXhwZW5zZURhdGVQYXJ0cyA9IHtcbiAgeWVhcjogXCItLVwiLFxuICBtb250aDogXCItLVwiLFxuICBkYXk6IFwiLS1cIixcbn07XHJcblxyXG5jb25zdCBUSUNLRVRfTElORV9EQVRFX1BBTkVMX0lDT04gPSAoXHJcbiAgPHN2Z1xyXG4gICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgIGZpbGw9XCJub25lXCJcclxuICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICBzdHJva2VXaWR0aD1cIjFcIlxyXG4gICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcclxuICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgY2xhc3NOYW1lPVwic2l6ZS0xMCB0ZXh0LVsjMDAyOTZiZTBdXCJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gID5cclxuICAgIDxwYXRoIHN0cm9rZT1cIm5vbmVcIiBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMTQgM3Y0YTEgMSAwIDAgMCAxIDFoNFwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTE3IDIxaC0xMGEyIDIgMCAwIDEgLTIgLTJ2LTE0YTIgMiAwIDAgMSAyIC0yaDdsNSA1djExYTIgMiAwIDAgMSAtMiAyXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNOSA3bDEgMFwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTkgMTNsNiAwXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMTMgMTdsMiAwXCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbi8vIFRpY2tldCBsaW5lcyBzZWN0aW9uIHJlbmRlcmVkIHdpdGggdGltZWxpbmUgY2FyZHMgYW5kIHBhZ2luZyBjb250cm9scy5cclxuY29uc3QgRXhwZW5zZVRpY2tldExpbmVzTGlzdCA9ICh7XHJcbiAgdmlzaWJsZUxpbmVzLFxyXG4gIHRvdGFsTGluZVBhZ2VzLFxyXG4gIGxpbmVQYWdlLFxyXG4gIGN1cnJlbmN5Q29kZSxcclxuICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gIGNvbnRhaW5lclJlZixcclxuICBvbkxpbmVQYWdlQ2hhbmdlLFxyXG4gIG9uT3BlbkxpbmUsXHJcbn06IEV4cGVuc2VUaWNrZXRMaW5lc0xpc3RQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzcGFjZS15LTBcIj5cclxuICAgICAgPEV4cGVuc2VTZWN0aW9uRGl2aWRlciBsYWJlbD17aW5kVChcIlRpY2tldHNfRGV0YWlsX0xpbmVzXCIsIFwiTGluZXNcIil9IGNsYXNzTmFtZT1cImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyLS1zcGFjZWRcIiAvPlxyXG5cclxuICAgICAge3Zpc2libGVMaW5lcy5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2luZFQoXCJUaWNrZXRzX0RldGFpbF9Ob0xpbmVzXCIsIFwiTm8gbGluZXMgZm9yIHRoaXMgdGlja2V0LlwiKX0gLz5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8ZGl2IHJlZj17Y29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cclxuICAgICAgICAgIHt2aXNpYmxlTGluZXMubWFwKChsaW5lKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFtb3VudFRleHQgPSBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kobGluZS50b3RhbEFtb3VudCwgY3VycmVuY3lDb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IHF0eVRleHQgPSBmb3JtYXRRdHlWYWx1ZShsaW5lLnF0eSk7XG4gICAgICAgICAgICBjb25zdCBwcmljZVRleHQgPSBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kobGluZS5wcmljZSwgY3VycmVuY3lDb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gbGluZS5kZXNjcmlwdGlvbiB8fCBsaW5lLnJlY0lkIHx8IFwiLVwiO1xuICAgICAgICAgICAgY29uc3QgcHJpbWFyeVN1YnRpdGxlUGFydHMgPSBbXG4gICAgICAgICAgICAgIGAke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfTogJHtxdHlUZXh0fWAsXG4gICAgICAgICAgICAgIGAke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1ByaWNlXCIsIFwiUHJpY2VcIil9OiAke3ByaWNlVGV4dH1gLFxuICAgICAgICAgICAgXS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgICAgICBjb25zdCBwcmltYXJ5U3VidGl0bGUgPSBwcmltYXJ5U3VidGl0bGVQYXJ0cy5qb2luKFwiICAgXCIpO1xuICAgICAgICAgICAgY29uc3Qgc3VidGl0bGUgPSBwcmltYXJ5U3VidGl0bGU7XG4gICAgICAgICAgICBjb25zdCBsaW5lS2V5ID1cbiAgICAgICAgICAgICAgU3RyaW5nKGxpbmUucmVjSWQgfHwgXCJcIikudHJpbSgpIHx8XG4gICAgICAgICAgICAgIFtsaW5lLmRlc2NyaXB0aW9uLCBsaW5lLnRvdGFsQW1vdW50LCBsaW5lLnByaWNlLCBsaW5lLnF0eV1cbiAgICAgICAgICAgICAgICAubWFwKCh2YWx1ZSkgPT4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKSlcbiAgICAgICAgICAgICAgICAuam9pbihcInxcIik7XG5cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8ZGl2IGtleT17bGluZUtleX0gY2xhc3NOYW1lPVwidGltZWxpbmUtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgPEV4cGVuc2VUaW1lbGluZUNhcmRcclxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtFTVBUWV9EQVRFX1BBUlRTfVxyXG4gICAgICAgICAgICAgICAgICBkYXRlUGFuZWxDb250ZW50PXtUSUNLRVRfTElORV9EQVRFX1BBTkVMX0lDT059XG4gICAgICAgICAgICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZT17c3VidGl0bGV9XG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZUNsYXNzTmFtZT1cImV4cGVuc2Utc2hlZXQtY2FyZF9fc3VidGl0bGUgZXhwZW5zZS1saW5lLWNhcmRfX21ldGEgdGV4dC1sZWZ0XCJcbiAgICAgICAgICAgICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XG4gICAgICAgICAgICAgICAgICBvbk9wZW49eygpID0+IG9uT3BlbkxpbmUobGluZS5yZWNJZCl9XG4gICAgICAgICAgICAgICAgICB0aXRsZUNsYXNzTmFtZT1cInRpbWVsaW5lLW5hbWUgZXhwZW5zZS1saW5lLWNhcmRfX3RpdGxlIHRleHQtbGVmdFwiXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG5cclxuICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXHJcbiAgICAgICAgdG90YWxQYWdlcz17dG90YWxMaW5lUGFnZXN9XHJcbiAgICAgICAgY3VycmVudFBhZ2U9e2xpbmVQYWdlfVxyXG4gICAgICAgIG9uUGFnZUNoYW5nZT17b25MaW5lUGFnZUNoYW5nZX1cclxuICAgICAgICBsYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XHJcbiAgICAgIC8+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRMaW5lc0xpc3Q7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgUmVmT2JqZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm0udHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lU2VjdGlvbiBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lU2VjdGlvbi50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRMaW5lc0xpc3QgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmVzTGlzdC50c3hcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLCBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbCBmcm9tIFwiLi9FeHBlbnNlVGlja2V0UHJldmlld01vZGFsLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXcgZnJvbSBcIi4vRXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXcudHN4XCI7XHJcbmltcG9ydCB0eXBlIHsgVGlja2V0UHJldmlld1BvaW50IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldy50c1wiO1xyXG5cclxudHlwZSBQYWdpbmF0aW9uTGFiZWxzID0ge1xyXG4gIGZpcnN0OiBzdHJpbmc7XHJcbiAgcHJldjogc3RyaW5nO1xyXG4gIG5leHQ6IHN0cmluZztcclxuICBsYXN0OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3UHJvcHMgPSB7XHJcbiAgbW9kYWw6IHtcclxuICAgIG9wZW46IGJvb2xlYW47XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ6IHN0cmluZztcclxuICAgIGNhbmNlbFRleHQ6IHN0cmluZztcclxuICAgIGxvYWRpbmdUZXh0OiBzdHJpbmc7XHJcbiAgICBzaG93Q2FuY2VsOiBib29sZWFuO1xyXG4gICAgc2hvd0NvbmZpcm06IGJvb2xlYW47XHJcbiAgICBidXN5OiBib29sZWFuO1xyXG4gICAgZXJyb3I6IHN0cmluZztcclxuICAgIHN0YXR1czogc3RyaW5nO1xyXG4gICAgb25Db25maXJtOiAoKSA9PiB2b2lkO1xyXG4gICAgb25DYW5jZWw6ICgpID0+IHZvaWQ7XHJcbiAgfTtcclxuICBwcmV2aWV3OiB7XHJcbiAgICBvcGVuOiBib29sZWFuO1xyXG4gICAgYnVzeTogYm9vbGVhbjtcclxuICAgIGVycm9yOiBzdHJpbmc7XHJcbiAgICBpbWFnZVVybDogc3RyaW5nO1xyXG4gICAgaW1hZ2VBbHQ6IHN0cmluZztcclxuICAgIHNjYWxlOiBudW1iZXI7XHJcbiAgICB0cmFuc2xhdGU6IFRpY2tldFByZXZpZXdQb2ludDtcclxuICAgIHN1cmZhY2VSZWY6IFJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gICAgb25DbG9zZTogKCkgPT4gdm9pZDtcclxuICAgIG9uUG9pbnRlckRvd246IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICAgIG9uUG9pbnRlck1vdmU6IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICAgIG9uUG9pbnRlckVuZDogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gICAgb25XaGVlbDogKGV2ZW50OiBSZWFjdC5XaGVlbEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICB9O1xyXG4gIGNvbnRlbnQ6IHtcclxuICAgIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICAgIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbDtcclxuICAgIHNob3dTdGlja3lQcmV2aWV3OiBib29sZWFuO1xyXG4gICAgcHJldmlld0J1c3k6IGJvb2xlYW47XHJcbiAgICBwcmV2aWV3RXJyb3I6IHN0cmluZztcclxuICAgIHByZXZpZXdJbWFnZVVybDogc3RyaW5nO1xyXG4gICAgcHJldmlld0ZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgICBwcmV2aWV3QWx0VGV4dDogc3RyaW5nO1xyXG4gICAgb25PcGVuUHJldmlldzogKCkgPT4gdm9pZDtcclxuICAgIHN0YXR1c0xhYmVsOiBzdHJpbmc7XHJcbiAgICBnYXN0b1R5cGVMYWJlbDogc3RyaW5nO1xyXG4gICAgdG90YWxBbW91bnRUZXh0OiBzdHJpbmc7XHJcbiAgICB0cmFuc0RhdGVUZXh0OiBzdHJpbmc7XHJcbiAgICB0aWNrZXRUaW1lVGV4dDogc3RyaW5nO1xyXG4gICAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gICAgZ2FzdG9UeXBlT3B0aW9uczogQXJyYXk8eyB2YWx1ZTogc3RyaW5nOyB0ZXh0OiBzdHJpbmcgfT47XHJcbiAgICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICBkZXNjcmlwdGlvbkludmFsaWQ6IGJvb2xlYW47XHJcbiAgICBkZXNjcmlwdGlvbklucHV0UmVmOiBSZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gICAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcbiAgICBnYXN0b1R5cGVJbnZhbGlkOiBib29sZWFuO1xuICAgIGdhc3RvVHlwZUlucHV0UmVmOiBSZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xuICAgIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gICAgY3VycmVuY3lDb2RlSW52YWxpZDogYm9vbGVhbjtcbiAgICBjdXJyZW5jeUlucHV0UmVmOiBSZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xuICAgIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XG4gICAgZHJhZnRUaWNrZXRUaW1lOiBzdHJpbmc7XG4gICAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XG4gICAgZHJhZnRGaWxlTmFtZTogc3RyaW5nO1xuICAgIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgb25PcGVuRmlsZTogKCkgPT4gdm9pZDtcbiAgICBvbk9wZW5FeHBlbnNlU2hlZXQ/OiAoKSA9PiB2b2lkO1xuICAgIGxpbmtlZExpbmU6IHtcclxuICAgICAgdmlzaWJsZTogYm9vbGVhbjtcclxuICAgICAgcHJvamVjdElkOiBzdHJpbmc7XHJcbiAgICAgIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICAgICAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICAgIGRpc2FibGVkOiBib29sZWFuO1xyXG4gICAgICBvblByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICB9O1xyXG4gICAgdmlzaWJsZUxpbmVzOiBFeHBlbnNlVGlja2V0RGV0YWlsTGluZVtdO1xyXG4gICAgdG90YWxMaW5lUGFnZXM6IG51bWJlcjtcclxuICAgIGxpbmVQYWdlOiBudW1iZXI7XHJcbiAgICBjdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICAgIHBhZ2luYXRpb25MYWJlbHM6IFBhZ2luYXRpb25MYWJlbHM7XHJcbiAgICBjb250YWluZXJSZWY6IFJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gICAgb25MaW5lUGFnZUNoYW5nZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcclxuICAgIG9uT3BlbkxpbmU6IChsaW5lUmVjSWQ6IHN0cmluZykgPT4gdm9pZDtcclxuICAgIHN0YXR1czogc3RyaW5nO1xyXG4gIH07XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIHRoZSB0aWNrZXQgZGV0YWlsIHZpZXcgd2hpbGUgdGhlIHBhZ2UgY29udGFpbmVyIG93bnMgb3JjaGVzdHJhdGlvbi5cclxuY29uc3QgRXhwZW5zZVRpY2tldERldGFpbFZpZXcgPSAoeyBtb2RhbCwgcHJldmlldywgY29udGVudCB9OiBFeHBlbnNlVGlja2V0RGV0YWlsVmlld1Byb3BzKSA9PiB7XHJcbiAgY29uc3QgZGV0YWlsQm9keSA9IChcclxuICAgIDw+XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybVxyXG4gICAgICAgIGhlYWRlcj17Y29udGVudC5oZWFkZXJ9XHJcbiAgICAgICAgc3RhdHVzTGFiZWw9e2NvbnRlbnQuc3RhdHVzTGFiZWx9XHJcbiAgICAgICAgZ2FzdG9UeXBlTGFiZWw9e2NvbnRlbnQuZ2FzdG9UeXBlTGFiZWx9XHJcbiAgICAgICAgdG90YWxBbW91bnRUZXh0PXtjb250ZW50LnRvdGFsQW1vdW50VGV4dH1cclxuICAgICAgICB0cmFuc0RhdGVUZXh0PXtjb250ZW50LnRyYW5zRGF0ZVRleHR9XHJcbiAgICAgICAgdGlja2V0VGltZVRleHQ9e2NvbnRlbnQudGlja2V0VGltZVRleHR9XHJcbiAgICAgICAgaXNFZGl0aW5nPXtjb250ZW50LmlzRWRpdGluZ31cclxuICAgICAgICBnYXN0b1R5cGVPcHRpb25zPXtjb250ZW50Lmdhc3RvVHlwZU9wdGlvbnN9XHJcbiAgICAgICAgZHJhZnREZXNjcmlwdGlvbj17Y29udGVudC5kcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgIGRlc2NyaXB0aW9uSW52YWxpZD17Y29udGVudC5kZXNjcmlwdGlvbkludmFsaWR9XHJcbiAgICAgICAgZGVzY3JpcHRpb25JbnB1dFJlZj17Y29udGVudC5kZXNjcmlwdGlvbklucHV0UmVmfVxyXG4gICAgICAgIGRyYWZ0R2FzdG9UeXBlPXtjb250ZW50LmRyYWZ0R2FzdG9UeXBlfVxyXG4gICAgICAgIGdhc3RvVHlwZUludmFsaWQ9e2NvbnRlbnQuZ2FzdG9UeXBlSW52YWxpZH1cclxuICAgICAgICBnYXN0b1R5cGVJbnB1dFJlZj17Y29udGVudC5nYXN0b1R5cGVJbnB1dFJlZn1cclxuICAgICAgICBkcmFmdEN1cnJlbmN5Q29kZT17Y29udGVudC5kcmFmdEN1cnJlbmN5Q29kZX1cbiAgICAgICAgY3VycmVuY3lDb2RlSW52YWxpZD17Y29udGVudC5jdXJyZW5jeUNvZGVJbnZhbGlkfVxuICAgICAgICBjdXJyZW5jeUlucHV0UmVmPXtjb250ZW50LmN1cnJlbmN5SW5wdXRSZWZ9XG4gICAgICAgIGRyYWZ0VHJhbnNEYXRlPXtjb250ZW50LmRyYWZ0VHJhbnNEYXRlfVxuICAgICAgICBkcmFmdFRpY2tldFRpbWU9e2NvbnRlbnQuZHJhZnRUaWNrZXRUaW1lfVxuICAgICAgICBkcmFmdFVybEZpbGU9e2NvbnRlbnQuZHJhZnRVcmxGaWxlfVxuICAgICAgICBkcmFmdEZpbGVOYW1lPXtjb250ZW50LmRyYWZ0RmlsZU5hbWV9XG4gICAgICAgIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZT17Y29udGVudC5vbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2V9XG4gICAgICAgIG9uRHJhZnRHYXN0b1R5cGVDaGFuZ2U9e2NvbnRlbnQub25EcmFmdEdhc3RvVHlwZUNoYW5nZX1cbiAgICAgICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZT17Y29udGVudC5vbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlfVxuICAgICAgICBvbk9wZW5GaWxlPXtjb250ZW50Lm9uT3BlbkZpbGV9XG4gICAgICAgIG9uT3BlbkV4cGVuc2VTaGVldD17Y29udGVudC5vbk9wZW5FeHBlbnNlU2hlZXR9XG4gICAgICAgIGhpZGVPcGVuRmlsZUFjdGlvbj17Y29udGVudC5zaG93U3RpY2t5UHJldmlld31cclxuICAgICAgLz5cclxuICAgICAge2NvbnRlbnQubGlua2VkTGluZS52aXNpYmxlID8gKFxyXG4gICAgICAgIDxFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lU2VjdGlvblxyXG4gICAgICAgICAgcHJvamVjdElkPXtjb250ZW50LmxpbmtlZExpbmUucHJvamVjdElkfVxyXG4gICAgICAgICAgaXNFZGl0aW5nPXtjb250ZW50LmlzRWRpdGluZ31cclxuICAgICAgICAgIGlzTG9hZGluZz17Y29udGVudC5saW5rZWRMaW5lLmlzTG9hZGluZ31cclxuICAgICAgICAgIGRpc2FibGVkPXtjb250ZW50LmxpbmtlZExpbmUuZGlzYWJsZWR9XHJcbiAgICAgICAgICBlcnJvck1lc3NhZ2U9e2NvbnRlbnQubGlua2VkTGluZS5lcnJvck1lc3NhZ2V9XHJcbiAgICAgICAgICBvblByb2plY3RJZENoYW5nZT17Y29udGVudC5saW5rZWRMaW5lLm9uUHJvamVjdElkQ2hhbmdlfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgICA8RXhwZW5zZVRpY2tldExpbmVzTGlzdFxyXG4gICAgICAgIHZpc2libGVMaW5lcz17Y29udGVudC52aXNpYmxlTGluZXN9XHJcbiAgICAgICAgdG90YWxMaW5lUGFnZXM9e2NvbnRlbnQudG90YWxMaW5lUGFnZXN9XHJcbiAgICAgICAgbGluZVBhZ2U9e2NvbnRlbnQubGluZVBhZ2V9XHJcbiAgICAgICAgY3VycmVuY3lDb2RlPXtjb250ZW50LmN1cnJlbmN5Q29kZX1cclxuICAgICAgICBwYWdpbmF0aW9uTGFiZWxzPXtjb250ZW50LnBhZ2luYXRpb25MYWJlbHN9XHJcbiAgICAgICAgY29udGFpbmVyUmVmPXtjb250ZW50LmNvbnRhaW5lclJlZn1cclxuICAgICAgICBvbkxpbmVQYWdlQ2hhbmdlPXtjb250ZW50Lm9uTGluZVBhZ2VDaGFuZ2V9XHJcbiAgICAgICAgb25PcGVuTGluZT17Y29udGVudC5vbk9wZW5MaW5lfVxyXG4gICAgICAvPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC16aW5jLTYwMFwiPntjb250ZW50LnN0YXR1c308L2Rpdj5cclxuICAgIDwvPlxyXG4gICk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxyXG4gICAgICA8Q29uZmlybU1vZGFsXHJcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cclxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XHJcbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cclxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWwuY29uZmlybVRleHR9XHJcbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWwuY2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWwubG9hZGluZ1RleHR9XHJcbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cclxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XHJcbiAgICAgICAgYnVzeT17bW9kYWwuYnVzeX1cclxuICAgICAgICBlcnJvcj17bW9kYWwuZXJyb3J9XHJcbiAgICAgICAgc3RhdHVzPXttb2RhbC5zdGF0dXN9XHJcbiAgICAgICAgb25Db25maXJtPXttb2RhbC5vbkNvbmZpcm19XHJcbiAgICAgICAgb25DYW5jZWw9e21vZGFsLm9uQ2FuY2VsfVxyXG4gICAgICAvPlxyXG4gICAgICA8RXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbFxyXG4gICAgICAgIG9wZW49e3ByZXZpZXcub3Blbn1cclxuICAgICAgICBidXN5PXtwcmV2aWV3LmJ1c3l9XHJcbiAgICAgICAgZXJyb3I9e3ByZXZpZXcuZXJyb3J9XHJcbiAgICAgICAgaW1hZ2VVcmw9e3ByZXZpZXcuaW1hZ2VVcmx9XHJcbiAgICAgICAgaW1hZ2VBbHQ9e3ByZXZpZXcuaW1hZ2VBbHR9XHJcbiAgICAgICAgc2NhbGU9e3ByZXZpZXcuc2NhbGV9XHJcbiAgICAgICAgdHJhbnNsYXRlPXtwcmV2aWV3LnRyYW5zbGF0ZX1cclxuICAgICAgICBzdXJmYWNlUmVmPXtwcmV2aWV3LnN1cmZhY2VSZWZ9XHJcbiAgICAgICAgb25DbG9zZT17cHJldmlldy5vbkNsb3NlfVxyXG4gICAgICAgIG9uUG9pbnRlckRvd249e3ByZXZpZXcub25Qb2ludGVyRG93bn1cclxuICAgICAgICBvblBvaW50ZXJNb3ZlPXtwcmV2aWV3Lm9uUG9pbnRlck1vdmV9XHJcbiAgICAgICAgb25Qb2ludGVyRW5kPXtwcmV2aWV3Lm9uUG9pbnRlckVuZH1cclxuICAgICAgICBvbldoZWVsPXtwcmV2aWV3Lm9uV2hlZWx9XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtemluYy03MDBcIlxyXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGNvbnRlbnQuaXNMb2FkaW5nID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBzaXplLTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxyXG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge2NvbnRlbnQuZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntjb250ZW50LmVycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxyXG5cclxuICAgICAgeyFjb250ZW50LmlzTG9hZGluZyAmJiAhY29udGVudC5lcnJvck1lc3NhZ2UgJiYgY29udGVudC5oZWFkZXIgPyAoXHJcbiAgICAgICAgY29udGVudC5zaG93U3RpY2t5UHJldmlldyA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBnYXAteS0yIGxnOmdyaWQtY29scy1bbWlubWF4KDAsMWZyKV8zMjBweF0gbGc6Z2FwLTRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3RhcnQtMlwiPlxyXG4gICAgICAgICAgICAgIDxFeHBlbnNlVGlja2V0U3RpY2t5UHJldmlld1xyXG4gICAgICAgICAgICAgICAgYnVzeT17Y29udGVudC5wcmV2aWV3QnVzeX1cclxuICAgICAgICAgICAgICAgIGVycm9yPXtjb250ZW50LnByZXZpZXdFcnJvcn1cclxuICAgICAgICAgICAgICAgIGltYWdlVXJsPXtjb250ZW50LnByZXZpZXdJbWFnZVVybH1cclxuICAgICAgICAgICAgICAgIGltYWdlQWx0PXtjb250ZW50LnByZXZpZXdBbHRUZXh0fVxyXG4gICAgICAgICAgICAgICAgZmlsZU5hbWU9e2NvbnRlbnQucHJldmlld0ZpbGVOYW1lfVxyXG4gICAgICAgICAgICAgICAgb25PcGVuPXtjb250ZW50Lm9uT3BlblByZXZpZXd9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIGxnOmNvbC1zdGFydC0xIGxnOnJvdy1zdGFydC0xXCI+e2RldGFpbEJvZHl9PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgZGV0YWlsQm9keVxyXG4gICAgICAgIClcclxuICAgICAgKSA6IG51bGx9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldERldGFpbFZpZXc7XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0RGV0YWlsRHRvLCBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uLy4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldERldGFpbCwgbWFwRXhwZW5zZVNoZWV0TGluZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXRMaW5rZWRTaGVldExpbmVBcmdzID0ge1xyXG4gIGVuYWJsZWQ6IGJvb2xlYW47XHJcbiAgc2hlZXRJZDogc3RyaW5nO1xyXG4gIGxpbmVSZWNJZDogc3RyaW5nO1xyXG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuY29uc3Qgc2VsZWN0U2hlZXQgPSAoaXRlbXM6IEV4cGVuc2VTaGVldERldGFpbER0b1tdLCBzaGVldElkOiBzdHJpbmcpOiBFeHBlbnNlU2hlZXREZXRhaWxEdG8gfCBudWxsID0+IHtcclxuICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHNoZWV0SWQpLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KGl0ZW1zKSB8fCBpdGVtcy5sZW5ndGggPCAxKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICBpdGVtcy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnk/LkhvamFHYXN0b3NJZCA/PyBlbnRyeT8uaG9qYUdhc3Rvc0lkKS50b1VwcGVyQ2FzZSgpID09PSBzYWZlU2hlZXRJZCkgfHxcclxuICAgIGl0ZW1zWzBdIHx8XHJcbiAgICBudWxsXHJcbiAgKTtcclxufTtcclxuXHJcbmNvbnN0IHNlbGVjdExpbmUgPSAoc2hlZXQ6IEV4cGVuc2VTaGVldERldGFpbER0bywgbGluZVJlY0lkOiBzdHJpbmcpOiBFeHBlbnNlU2hlZXRMaW5lIHwgbnVsbCA9PiB7XHJcbiAgY29uc3Qgc2FmZUxpbmVSZWNJZCA9IHNhZmVUZXh0KGxpbmVSZWNJZCkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBzb3VyY2VMaW5lcyA9IHNoZWV0LkxpbmVzID8/IHNoZWV0LmxpbmVzID8/IFtdO1xyXG4gIGNvbnN0IG1hcHBlZExpbmVzID0gQXJyYXkuaXNBcnJheShzb3VyY2VMaW5lcykgPyBzb3VyY2VMaW5lcy5tYXAoKGVudHJ5KSA9PiBtYXBFeHBlbnNlU2hlZXRMaW5lKGVudHJ5KSkgOiBbXTtcclxuXHJcbiAgcmV0dXJuIG1hcHBlZExpbmVzLmZpbmQoKGxpbmUpID0+IHNhZmVUZXh0KGxpbmUubGluZVJlY0lkKS50b1VwcGVyQ2FzZSgpID09PSBzYWZlTGluZVJlY0lkKSB8fCBudWxsO1xyXG59O1xyXG5cclxuLy8gTG9hZHMgdGhlIGV4cGVuc2Utc2hlZXQgbGluZSB0aGF0IGdpdmVzIGNvbnRleHR1YWwgZmllbGRzIHRvIGEgbGlua2VkIHRpY2tldCBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lID0gKHtcclxuICBlbmFibGVkLFxyXG4gIHNoZWV0SWQsXHJcbiAgbGluZVJlY0lkLFxyXG4gIG9uRm9yYmlkZGVuLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0TGlua2VkU2hlZXRMaW5lQXJncykgPT4ge1xyXG4gIGNvbnN0IFtsaW5lLCBzZXRMaW5lXSA9IHVzZVN0YXRlPEV4cGVuc2VTaGVldExpbmUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbb3JpZ2luYWxQcm9qZWN0SWQsIHNldE9yaWdpbmFsUHJvamVjdElkXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdFByb2plY3RJZCwgc2V0RHJhZnRQcm9qZWN0SWRdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIGNvbnN0IHJlbG9hZExpbmUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHNoZWV0SWQpO1xyXG4gICAgY29uc3Qgc2FmZUxpbmVSZWNJZCA9IHNhZmVUZXh0KGxpbmVSZWNJZCk7XHJcbiAgICBpZiAoIWVuYWJsZWQgfHwgIXNhZmVTaGVldElkIHx8ICFzYWZlTGluZVJlY0lkKSB7XHJcbiAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgIHNldE9yaWdpbmFsUHJvamVjdElkKFwiXCIpO1xyXG4gICAgICBzZXREcmFmdFByb2plY3RJZChcIlwiKTtcclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SXNMb2FkaW5nKHRydWUpO1xyXG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwoc2FmZVNoZWV0SWQsIHtcclxuICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgc2V0TGluZShudWxsKTtcclxuICAgICAgICBzZXRPcmlnaW5hbFByb2plY3RJZChcIlwiKTtcclxuICAgICAgICBzZXREcmFmdFByb2plY3RJZChcIlwiKTtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHNoZWV0ID0gc2VsZWN0U2hlZXQocmVzcG9uc2U/Lkl0ZW1zIHx8IFtdLCBzYWZlU2hlZXRJZCk7XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkTGluZSA9IHNoZWV0ID8gc2VsZWN0TGluZShzaGVldCwgc2FmZUxpbmVSZWNJZCkgOiBudWxsO1xyXG4gICAgICBpZiAoIXNlbGVjdGVkTGluZSkge1xyXG4gICAgICAgIHNldExpbmUobnVsbCk7XHJcbiAgICAgICAgc2V0T3JpZ2luYWxQcm9qZWN0SWQoXCJcIik7XHJcbiAgICAgICAgc2V0RHJhZnRQcm9qZWN0SWQoXCJcIik7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwcm9qZWN0SWQgPSBzYWZlVGV4dChzZWxlY3RlZExpbmUucHJvaklkKTtcclxuICAgICAgc2V0TGluZShzZWxlY3RlZExpbmUpO1xyXG4gICAgICBzZXRPcmlnaW5hbFByb2plY3RJZChwcm9qZWN0SWQpO1xyXG4gICAgICBzZXREcmFmdFByb2plY3RJZChwcm9qZWN0SWQpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRMaW5lKG51bGwpO1xyXG4gICAgICBzZXRPcmlnaW5hbFByb2plY3RJZChcIlwiKTtcclxuICAgICAgc2V0RHJhZnRQcm9qZWN0SWQoXCJcIik7XHJcbiAgICAgIHNldEVycm9yTWVzc2FnZShlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlwiKSk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtlbmFibGVkLCBsaW5lUmVjSWQsIG9uRm9yYmlkZGVuLCBzaGVldElkXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICB2b2lkIHJlbG9hZExpbmUoKTtcclxuICB9LCBbcmVsb2FkTGluZV0pO1xyXG5cclxuICBjb25zdCBwcm9qZWN0SWRDaGFuZ2VkID0gdXNlTWVtbyhcclxuICAgICgpID0+IHNhZmVUZXh0KGRyYWZ0UHJvamVjdElkKSAhPT0gc2FmZVRleHQob3JpZ2luYWxQcm9qZWN0SWQpLFxyXG4gICAgW2RyYWZ0UHJvamVjdElkLCBvcmlnaW5hbFByb2plY3RJZF1cclxuICApO1xyXG4gIGNvbnN0IHJlc2V0RHJhZnRQcm9qZWN0SWQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXREcmFmdFByb2plY3RJZChvcmlnaW5hbFByb2plY3RJZCk7XHJcbiAgfSwgW29yaWdpbmFsUHJvamVjdElkXSk7XHJcbiAgY29uc3QgYWNjZXB0RHJhZnRQcm9qZWN0SWQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBzYWZlUHJvamVjdElkID0gc2FmZVRleHQoZHJhZnRQcm9qZWN0SWQpO1xyXG4gICAgc2V0T3JpZ2luYWxQcm9qZWN0SWQoc2FmZVByb2plY3RJZCk7XHJcbiAgICBzZXREcmFmdFByb2plY3RJZChzYWZlUHJvamVjdElkKTtcclxuICB9LCBbZHJhZnRQcm9qZWN0SWRdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGxpbmUsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBvcmlnaW5hbFByb2plY3RJZCxcclxuICAgIGRyYWZ0UHJvamVjdElkLFxyXG4gICAgcHJvamVjdElkQ2hhbmdlZCxcclxuICAgIHNldERyYWZ0UHJvamVjdElkLFxyXG4gICAgcmVzZXREcmFmdFByb2plY3RJZCxcclxuICAgIGFjY2VwdERyYWZ0UHJvamVjdElkLFxyXG4gICAgcmVsb2FkTGluZSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUgfSBmcm9tIFwiLi4vdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZS50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsLFxyXG4gIGJ1aWxkRXhwZW5zZVNoZWV0TGluZURldGFpbFVybCxcclxuICBidWlsZEV4cGVuc2VUaWNrZXRMaW5rVXJsLFxyXG4gIHR5cGUgRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHRvRXhwZW5zZUlzb0RhdGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb25BcmdzID0ge1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGRldGFpbE9yaWdpbjogc3RyaW5nO1xyXG4gIGhlYWRlclRyYW5zRGF0ZTogdW5rbm93bjtcclxuICBjb250ZXh0TGluZVJlY0lkPzogc3RyaW5nO1xyXG4gIHRpY2tldFJldHVybkNvbnRleHQ/OiBFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCB8IG51bGw7XHJcbiAgcmVhZENhY2hlZFN0YXRlOiAoKSA9PiBFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlIHwgbnVsbDtcclxuICBzYXZlQ2FjaGVkU3RhdGU6IChzdGF0ZTogRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIEtlZXBzIG5hdGl2ZSBiYWNrIG5hdmlnYXRpb24gYWxpZ25lZCB3aXRoIHRoZSB0aWNrZXQgZW50cnkgcG9pbnQgYW5kIHByZXNlcnZlcyBjYWNoZWQgbGluay1tb2RlIHN0YXRlLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uID0gKHtcclxuICBmaWxlSWQsXHJcbiAgZGV0YWlsT3JpZ2luLFxyXG4gIGhlYWRlclRyYW5zRGF0ZSxcclxuICBjb250ZXh0TGluZVJlY0lkLFxyXG4gIHRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgcmVhZENhY2hlZFN0YXRlLFxyXG4gIHNhdmVDYWNoZWRTdGF0ZSxcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uQXJncykgPT4ge1xyXG4gIGNvbnN0IHNob3VsZFJldHVyblRvVGlja2V0TGlzdCA9IHRpY2tldFJldHVybkNvbnRleHQ/Lm9yaWdpbiA9PT0gXCJzaGVldC1saW5rXCIgfHwgIXRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQ7XHJcblxyXG4gIGNvbnN0IG5hdGl2ZUJhY2tVcmwgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGlmICh0aWNrZXRSZXR1cm5Db250ZXh0Py5vcmlnaW4gPT09IFwic2hlZXQtbGlua1wiICYmIHRpY2tldFJldHVybkNvbnRleHQuc2hlZXRJZCkge1xyXG4gICAgICByZXR1cm4gYnVpbGRFeHBlbnNlVGlja2V0TGlua1VybCh0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aWNrZXRSZXR1cm5Db250ZXh0Py5vcmlnaW4gPT09IFwiZXhwZW5zZS1saW5lXCIgJiYgdGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkKSB7XHJcbiAgICAgIHJldHVybiBidWlsZEV4cGVuc2VTaGVldExpbmVEZXRhaWxVcmwodGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkLCB0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0TGluZVJlY0lkIHx8IGNvbnRleHRMaW5lUmVjSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkKSB7XHJcbiAgICAgIHJldHVybiBidWlsZEV4cGVuc2VTaGVldERldGFpbFVybCh0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkZXRhaWxPcmlnaW4gPT09IFwidGlja2V0LWNyZWF0ZVwiKSB7XHJcbiAgICAgIGNvbnN0IHRpY2tldERhdGUgPSB0b0V4cGVuc2VJc29EYXRlKGhlYWRlclRyYW5zRGF0ZSkgfHwgdG9FeHBlbnNlSXNvRGF0ZShuZXcgRGF0ZSgpKTtcclxuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICB0aWNrZXRGaWxlSWQ6IGZpbGVJZCxcclxuICAgICAgICB0aWNrZXREYXRlLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBgL0dhc3Rvcy9UaWNrZXRzPyR7cXVlcnkudG9TdHJpbmcoKX1gO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBcIi9HYXN0b3MvVGlja2V0c1wiO1xyXG4gIH0sIFtjb250ZXh0TGluZVJlY0lkLCBkZXRhaWxPcmlnaW4sIGZpbGVJZCwgaGVhZGVyVHJhbnNEYXRlLCB0aWNrZXRSZXR1cm5Db250ZXh0XSk7XHJcblxyXG4gIGNvbnN0IHJlYXJtRXhwZW5zZVRpY2tldHNSZXR1cm5TdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGNhY2hlZFN0YXRlID0gcmVhZENhY2hlZFN0YXRlKCk7XHJcbiAgICBpZiAoIWNhY2hlZFN0YXRlKSByZXR1cm47XHJcbiAgICBzYXZlQ2FjaGVkU3RhdGUoY2FjaGVkU3RhdGUpO1xyXG4gIH0sIFtyZWFkQ2FjaGVkU3RhdGUsIHNhdmVDYWNoZWRTdGF0ZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFmaWxlSWQpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBiYWNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxCYWNrQnRuXCIpO1xyXG4gICAgaWYgKCFiYWNrQnV0dG9uKSByZXR1cm47XHJcblxyXG4gICAgYmFja0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWJhY2stdXJsXCIsIG5hdGl2ZUJhY2tVcmwpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgYmFja0J1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLWJhY2stdXJsXCIpO1xyXG4gICAgfTtcclxuICB9LCBbZmlsZUlkLCBuYXRpdmVCYWNrVXJsXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZU5hdGl2ZUJhY2sgPSAoZXZlbnQ6IFBvcFN0YXRlRXZlbnQpID0+IHtcclxuICAgICAgaWYgKGV2ZW50Py5zdGF0ZSAmJiBldmVudC5zdGF0ZS5pbmRUcmFwID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBleGVjdXRlQmFja05hdmlnYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHNob3VsZFJldHVyblRvVGlja2V0TGlzdCkge1xyXG4gICAgICAgICAgcmVhcm1FeHBlbnNlVGlja2V0c1JldHVyblN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKG5hdGl2ZUJhY2tVcmwpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24oZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGV4ZWN1dGVCYWNrTmF2aWdhdGlvbigpO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGhhbmRsZU5hdGl2ZUJhY2spO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBoYW5kbGVOYXRpdmVCYWNrKTtcclxuICAgIH07XHJcbiAgfSwgW2ZpbGVJZCwgbmF0aXZlQmFja1VybCwgcmVhcm1FeHBlbnNlVGlja2V0c1JldHVyblN0YXRlLCBzaG91bGRSZXR1cm5Ub1RpY2tldExpc3RdKTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcudHNcIjtcclxuaW1wb3J0IHsgaGFzRXhwZW5zZVRpY2tldEltYWdlUHJldmlld1NvdXJjZSB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRQcmV2aWV3VXRpbHMudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdQYW5lbEFyZ3MgPSB7XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGRyYWZ0VXJsRmlsZTogc3RyaW5nO1xyXG4gIGhlYWRlclVybEZpbGU/OiBzdHJpbmcgfCBudWxsO1xyXG59O1xyXG5cclxuLy8gQ2VudHJhbGl6ZXMgc3RpY2t5LXByZXZpZXcgYXZhaWxhYmlsaXR5IGFuZCBpbWFnZSBsb2FkaW5nIGZvciB0aWNrZXQgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdQYW5lbCA9ICh7XHJcbiAgZmlsZUlkLFxyXG4gIGlzRWRpdGluZyxcclxuICBkcmFmdFVybEZpbGUsXHJcbiAgaGVhZGVyVXJsRmlsZSxcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdQYW5lbEFyZ3MpID0+IHtcclxuICBjb25zdCBwcmV2aWV3U291cmNlVXJsID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChpc0VkaXRpbmcgPyBkcmFmdFVybEZpbGUgOiBoZWFkZXJVcmxGaWxlKSwgW2RyYWZ0VXJsRmlsZSwgaGVhZGVyVXJsRmlsZSwgaXNFZGl0aW5nXSk7XHJcbiAgY29uc3Qgc2hvd1N0aWNreVByZXZpZXcgPSB1c2VNZW1vKCgpID0+IGhhc0V4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdTb3VyY2UocHJldmlld1NvdXJjZVVybCksIFtwcmV2aWV3U291cmNlVXJsXSk7XHJcbiAgY29uc3QgcHJldmlldyA9IHVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcoe1xyXG4gICAgZmlsZUlkLFxyXG4gICAgc291cmNlVXJsOiBwcmV2aWV3U291cmNlVXJsLFxyXG4gICAgZW5hYmxlZDogc2hvd1N0aWNreVByZXZpZXcsXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzaG93U3RpY2t5UHJldmlldyxcclxuICAgIC4uLnByZXZpZXcsXHJcbiAgfTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsaUJBQXlFOzs7QUNBekUsbUJBQWlEO0FBZTFDLElBQU0sOEJBQThCLENBQUMsRUFBRSxXQUFXLFFBQVEsWUFBWSxNQUF1QztBQUNsSCxRQUFNLENBQUMsUUFBUSxTQUFTLFFBQUksdUJBQTJDLElBQUk7QUFDM0UsUUFBTSxDQUFDLE9BQU8sUUFBUSxRQUFJLHVCQUFvQyxDQUFDLENBQUM7QUFDaEUsUUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHVCQUFTLEtBQUs7QUFDaEQsUUFBTSxDQUFDLGNBQWMsZUFBZSxRQUFJLHVCQUFTLEVBQUU7QUFFbkQsUUFBTSxtQkFBZSwwQkFBWSxZQUFZO0FBQzNDLFFBQUksQ0FBQyxXQUFXO0FBQ2Qsa0JBQVk7QUFDWjtBQUFBLElBQ0Y7QUFFQSxVQUFNLGFBQWEsU0FBUyxNQUFNO0FBQ2xDLFFBQUksQ0FBQyxZQUFZO0FBQ2Ysc0JBQWdCLEtBQUssMkJBQTJCLHVCQUF1QixDQUFDO0FBQ3hFLGdCQUFVLElBQUk7QUFDZCxlQUFTLENBQUMsQ0FBQztBQUNYO0FBQUEsSUFDRjtBQUVBLGlCQUFhLElBQUk7QUFDakIsb0JBQWdCLEVBQUU7QUFFbEIsUUFBSTtBQUNGLFlBQU0sV0FBVyxNQUFNLHdCQUF3QixZQUFZO0FBQUEsUUFDekQseUJBQXlCO0FBQUEsTUFDM0IsQ0FBQztBQUVELFVBQUksVUFBVSxZQUFZLE9BQU87QUFDL0Isd0JBQWdCLFVBQVUsV0FBVyxL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Syw2QkFBNkIsa0JBQWtCO0FBQUEsUUFDbkUsV0FBVztBQUFBO0FBQUEsSUFDYixJQUNFO0FBQUEsS0FDTjtBQUVKO0FBR0EsSUFBTSwwQkFBMEIsTUFBTTtBQUNwQyxTQUNFLDZDQUFDLGdDQUFxQix5QkFBdUIsTUFDM0MsdURBQUMsa0NBQStCLEdBQ2xDO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSw0QkFBNEI7QUFDbkUsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQywyQkFBd0IsQ0FBRTtBQUN0RDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sa0NBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImhvdXJzIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaG91cnMiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
