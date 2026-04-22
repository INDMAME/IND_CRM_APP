import {
  ExpenseTicketPreviewModal_default,
  ExpenseTicketStickyPreview_default,
  hasExpenseTicketImagePreviewSource,
  useExpenseTicketImagePreview
} from "./chunks/chunk-NJTJMEK7.js";
import {
  SingleDatePicker
} from "./chunks/chunk-TQTUWJA7.js";
import {
  getExpenseTicketStatusLabel,
  useExpenseTicketsFilterCache
} from "./chunks/chunk-HAEPWTGP.js";
import {
  mapWindowEnumOptions
} from "./chunks/chunk-YM2TI2W6.js";
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
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-SV2WY3SH.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-QKSAMRAN.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-EJOK676V.js";
import "./chunks/chunk-OSBLOXTE.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-54VKJ5RM.js";
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
} from "./chunks/chunk-EA3W6EVI.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-PDB5ASGP.js";
import "./chunks/chunk-CBDB7NMA.js";
import {
  clearExpenseNavigationGuard,
  formatAmountWithCurrency,
  formatExpenseNumber,
  navigateToExpenseUrl,
  setExpenseNavigationGuard
} from "./chunks/chunk-FFNIMRB6.js";
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
} from "./chunks/chunk-TC2T4EQZ.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-YWX6VBOY.js";
import {
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  toExpenseApiDdMmYyyy,
  toExpenseIsoDate
} from "./chunks/chunk-KUDPX4K4.js";
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
  comentario: "",
  urlFile: "",
  fileName: ""
});
var toInputDate = (raw) => {
  const parsed = parseExpenseDate(raw);
  return parsed ? toIsoDate(parsed) : "";
};
var createDraftFromHeader = (header) => {
  return {
    description: safeText(header?.description),
    gastoType: header?.gastoType === null || header?.gastoType === void 0 ? "" : String(header.gastoType),
    currencyCode: safeText(header?.currencyCode).toUpperCase(),
    transDate: toInputDate(header?.transDate),
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
var useExpenseTicketDetailDisplay = ({
  header,
  draftGastoType,
  draftCurrencyCode,
  draftTransDate,
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
    () => formatExpenseDisplayDate(isEditing ? draftTransDate : header?.transDate, document?.documentElement?.lang || "es-ES"),
    [draftTransDate, header?.transDate, isEditing]
  );
  return {
    paginationLabels,
    previewAltText,
    statusLabel,
    gastoTypeLabel,
    totalAmountText,
    transDateText
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
  const openLineDetail = (0, import_react7.useCallback)(
    async (rawLineRecId) => {
      if (isFromSheetLink) return;
      if (busy) return;
      const lineRecId = safeText(rawLineRecId);
      if (!lineRecId || !fileId) return;
      const shouldOpenInEditMode = isEditing;
      if (shouldOpenInEditMode) {
        if (!canOpenSaveConfirm()) {
          return;
        }
        const updateOk = await handlePersistHeaderDraft();
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
      canOpenSaveConfirm,
      fileId,
      handlePersistHeaderDraft,
      isEditing,
      isFromSheetLink,
      ticketReturnContext
    ]
  );
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
  draftUrlFile,
  draftFileName,
  onDraftDescriptionChange,
  onDraftGastoTypeChange,
  onDraftCurrencyCodeChange,
  onDraftTransDateChange,
  onOpenFile,
  onOpenExpenseSheet,
  hideOpenFileAction = false
}) => {
  const previewUrl = safeText(isEditing ? draftUrlFile : header.urlFile);
  const canOpenFile = hasExpenseTicketImagePreviewSource(previewUrl);
  const showExpenseSheetField = hasRealExpenseSheetValue(header.hojaGastosIdDisplay);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-[var(--radius-xl)]", children: [
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
          label: indT("ExpenseSheets_Field_CreatedDate", "Date"),
          value: draftTransDate,
          onChange: onDraftTransDateChange,
          readOnly: !isEditing,
          disabled: !isEditing
        }
      ) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ExpenseReadOnlyField_default,
        {
          label: indT("ExpenseSheets_Field_CreatedDate", "Date"),
          value: transDateText || formatExpenseDisplayDate(header.transDate, document?.documentElement?.lang || "es-ES") || "-"
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
    className: "h-10 w-10 text-slate-500",
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
      const subtitle = `${indT("ExpenseSheets_Field_Qty", "Quantity")}: ${qtyText}   ${indT("ExpenseSheets_Field_Price", "Price")}: ${priceText}`;
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
        draftUrlFile: content.draftUrlFile,
        draftFileName: content.draftFileName,
        onDraftDescriptionChange: content.onDraftDescriptionChange,
        onDraftGastoTypeChange: content.onDraftGastoTypeChange,
        onDraftCurrencyCodeChange: content.onDraftCurrencyCodeChange,
        onDraftTransDateChange: content.onDraftTransDateChange,
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
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-sm text-slate-600", children: content.status })
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
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: content.isLoading ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    content.errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-danger", children: content.errorMessage }) : null,
    !content.isLoading && !content.errorMessage && content.header ? content.showStickyPreview ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "space-y-2 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-4 lg:space-y-0", children: [
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
  draftUrlFile,
  draftFileName,
  setDraftDescription,
  setDraftGastoType,
  setDraftCurrencyCode,
  setDraftTransDate,
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
  draftUrlFile,
  draftFileName,
  onDraftDescriptionChange: setDraftDescription,
  onDraftGastoTypeChange: setDraftGastoType,
  onDraftCurrencyCodeChange: setDraftCurrencyCode,
  onDraftTransDateChange: setDraftTransDate,
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
  const { paginationLabels, previewAltText, statusLabel, gastoTypeLabel, totalAmountText, transDateText } = useExpenseTicketDetailDisplay({
    header,
    draftGastoType,
    draftCurrencyCode,
    draftTransDate,
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
    if (!shouldBlockWorkflowExit || busy) return;
    if (!sheetWorkflowBlockMessage) return;
    if (status === sheetWorkflowBlockMessage) return;
    setStatus(sheetWorkflowBlockMessage);
  }, [busy, setStatus, sheetWorkflowBlockMessage, shouldBlockWorkflowExit, status]);
  const isAssignedTicket = header?.status === 1;
  const isContextLocked = isAssignedTicket && !allowAssignedDraftEdit || !!linkedExpenseSheetId && linkSheetLocked;
  const canEditTicketInContext = canEditTicket && canEditLinkedTicket && !isFromSheetLink;
  const canDeleteTicketInContext = canDeleteTicket && canEditLinkedTicket && !isFromSheetLink;
  const ticketTopbarActionMode = !canEditTicketInContext && !canDeleteTicketInContext ? "view_only" : "default";
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
  const { openLineDetail, resolveClickableCard, openFile, handleOpenExpenseSheet } = useExpenseTicketDetailInteractions({
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
      draftUrlFile,
      draftFileName,
      setDraftDescription,
      setDraftGastoType,
      setDraftCurrencyCode,
      setDraftTransDate,
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
  return detailView;
};
var ExpenseTicketDetailPageContent = () => {
  const detailView = useExpenseTicketDetailPageViewModel();
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExpenseTicketDetailView_default, { modal: detailView.modal, preview: detailView.preview, content: detailView.content });
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFJvdXRlQ29udGV4dC50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5LnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmVzTGlzdC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsVmlldy50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCB7IHVzZUF1dGhDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XHJcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xyXG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuaW1wb3J0IHsgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLCBuYXZpZ2F0ZVRvRXhwZW5zZVVybCwgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuaW1wb3J0IHsgaXNNYW5hZ2luZ090aGVyRXhwZW5zZVVzZXIgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZU1hbmFnZWRVc2VyU2NvcGUudHNcIjtcbmltcG9ydCB7IG1hcFdpbmRvd0VudW1PcHRpb25zLCB0eXBlIEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB7IGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XG5pbXBvcnQgeyByZWFkRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZS50c1wiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlIH0gZnJvbSBcIi4uL3VzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3IgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXkudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3IGZyb20gXCIuL0V4cGVuc2VUaWNrZXREZXRhaWxWaWV3LnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlIH0gZnJvbSBcIi4uL3VzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWwgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciwgRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuXHJcbmNvbnN0IEFMTE9XRURfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XHJcbmNvbnN0IExJTkVTX1BBR0VfU0laRSA9IDY7XHJcbmNvbnN0IEdBU1RPX1RZUEVfTEFCRUxfS0VZUzogUmVjb3JkPG51bWJlciwgeyBrZXk6IHN0cmluZzsgZmFsbGJhY2s6IHN0cmluZyB9PiA9IHtcclxuICAwOiB7IGtleTogXCJFbnVtX05vbmVcIiwgZmFsbGJhY2s6IFwiTm9uZVwiIH0sXHJcbiAgMTogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfUGVhamVcIiwgZmFsbGJhY2s6IFwiUGVhamVcIiB9LFxyXG4gIDI6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1BhcmtpbmdcIiwgZmFsbGJhY2s6IFwiUGFya2luZ1wiIH0sXHJcbiAgMzogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfS21cIiwgZmFsbGJhY2s6IFwiS21cIiB9LFxyXG4gIDQ6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0Rlc2F5dW5vXCIsIGZhbGxiYWNrOiBcIkRlc2F5dW5vXCIgfSxcclxuICA1OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9Db21pZGFcIiwgZmFsbGJhY2s6IFwiQ29taWRhXCIgfSxcclxuICA2OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9DZW5hXCIsIGZhbGxiYWNrOiBcIkNlbmFcIiB9LFxyXG4gIDc6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0hvdGVsXCIsIGZhbGxiYWNrOiBcIkhvdGVsXCIgfSxcclxuICA4OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9WYXJpb3NcIiwgZmFsbGJhY2s6IFwiVmFyaW9zXCIgfSxcclxuICAxNDogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfVGF4aVwiLCBmYWxsYmFjazogXCJUYXhpXCIgfSxcclxufTtcclxuXHJcbmNvbnN0IHBhZ2VkU2xpY2UgPSA8VCw+KGl0ZW1zOiBUW10sIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcik6IFRbXSA9PiB7XHJcbiAgaWYgKCFpdGVtcy5sZW5ndGgpIHJldHVybiBbXTtcclxuICBjb25zdCBzYWZlUGFnZSA9IE1hdGgubWF4KDEsIHBhZ2UpO1xyXG4gIGNvbnN0IHN0YXJ0ID0gKHNhZmVQYWdlIC0gMSkgKiBwYWdlU2l6ZTtcclxuICByZXR1cm4gaXRlbXMuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgcGFnZVNpemUpO1xyXG59O1xyXG5cclxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxyXG5jb25zdCBib290c3RyYXBFeHBlbnNlQXBpQXV0aCA9ICgpID0+IHtcclxuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCh7XHJcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcclxuICAgIGVudHJhT2lkOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxyXG4gICAgYXBwQ29kZTogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRGYWxsYmFja0dhc3RvVHlwZU9wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKEdBU1RPX1RZUEVfTEFCRUxfS0VZUylcbiAgICAubWFwKChbY29kZSwgY2ZnXSkgPT4gKHtcbiAgICAgIHZhbHVlOiBTdHJpbmcoY29kZSksXG4gICAgICB0ZXh0OiBpbmRUKGNmZy5rZXksIGNmZy5mYWxsYmFjayksXG4gICAgfSkpXHJcbiAgICAuc29ydCgobGVmdCwgcmlnaHQpID0+IE51bWJlcihsZWZ0LnZhbHVlKSAtIE51bWJlcihyaWdodC52YWx1ZSkpO1xufTtcblxuY29uc3QgcmVzb2x2ZUxpbmtlZFRpY2tldEJsb2NrZWRNZXNzYWdlID0gKGlzUGFpZDogYm9vbGVhbik6IHN0cmluZyA9PiB7XG4gIGlmIChpc1BhaWQpIHtcbiAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1BhaWRSZWFkT25seVwiLCBcIkxhcyBob2phcyBkZSBnYXN0byBwYWdhZGFzIHNvbiBkZSBzb2xvIGxlY3R1cmEuXCIpO1xuICB9XG5cbiAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9SZWFkT25seUJ5U3RhdHVzXCIsIFwiTm8gc2UgcHVlZGUgZWRpdGFyIGVzdGEgaG9qYSBkZSBnYXN0b3MgZW4gZWwgZXN0YWRvIGFjdHVhbC5cIik7XG59O1xuXHJcbmNvbnN0IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbE1vZGFsVmlldyA9ICh7XHJcbiAgbW9kYWwsXHJcbiAgbW9kYWxDb25maXJtVGV4dCxcclxuICBtb2RhbENhbmNlbFRleHQsXHJcbiAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICBidXN5LFxyXG4gIG1vZGFsRXJyb3IsXHJcbiAgc3RhdHVzLFxyXG4gIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcclxuICBjbG9zZUNvbmZpcm0sXHJcbn06IHtcclxuICBtb2RhbDoge1xyXG4gICAgb3BlbjogYm9vbGVhbjtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBzaG93Q2FuY2VsOiBib29sZWFuO1xyXG4gICAgc2hvd0NvbmZpcm06IGJvb2xlYW47XHJcbiAgfTtcclxuICBtb2RhbENvbmZpcm1UZXh0OiBzdHJpbmc7XHJcbiAgbW9kYWxDYW5jZWxUZXh0OiBzdHJpbmc7XHJcbiAgbW9kYWxMb2FkaW5nVGV4dDogc3RyaW5nO1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxFcnJvcjogc3RyaW5nO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybTogKCkgPT4gdm9pZDtcclxuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbn0pID0+ICh7XHJcbiAgb3BlbjogbW9kYWwub3BlbixcclxuICB0aXRsZTogbW9kYWwudGl0bGUsXHJcbiAgbWVzc2FnZTogbW9kYWwubWVzc2FnZSxcclxuICBjb25maXJtVGV4dDogbW9kYWxDb25maXJtVGV4dCxcclxuICBjYW5jZWxUZXh0OiBtb2RhbENhbmNlbFRleHQsXHJcbiAgbG9hZGluZ1RleHQ6IG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgc2hvd0NhbmNlbDogbW9kYWwuc2hvd0NhbmNlbCxcclxuICBzaG93Q29uZmlybTogbW9kYWwuc2hvd0NvbmZpcm0sXHJcbiAgYnVzeSxcclxuICBlcnJvcjogbW9kYWxFcnJvcixcclxuICBzdGF0dXMsXHJcbiAgb25Db25maXJtOiBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgb25DYW5jZWw6IGNsb3NlQ29uZmlybSxcclxufSk7XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3VmlldyA9ICh7XHJcbiAgcHJldmlld09wZW4sXHJcbiAgcHJldmlld0J1c3ksXHJcbiAgcHJldmlld0Vycm9yLFxyXG4gIHByZXZpZXdJbWFnZVVybCxcclxuICBwcmV2aWV3QWx0VGV4dCxcclxuICBwcmV2aWV3U2NhbGUsXHJcbiAgcHJldmlld1RyYW5zbGF0ZSxcclxuICBwcmV2aWV3U3VyZmFjZVJlZixcclxuICBjbG9zZVByZXZpZXcsXHJcbiAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcclxuICBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxuICBoYW5kbGVQcmV2aWV3V2hlZWwsXHJcbn06IHtcclxuICBwcmV2aWV3T3BlbjogYm9vbGVhbjtcclxuICBwcmV2aWV3QnVzeTogYm9vbGVhbjtcclxuICBwcmV2aWV3RXJyb3I6IHN0cmluZztcclxuICBwcmV2aWV3SW1hZ2VVcmw6IHN0cmluZztcclxuICBwcmV2aWV3QWx0VGV4dDogc3RyaW5nO1xyXG4gIHByZXZpZXdTY2FsZTogbnVtYmVyO1xyXG4gIHByZXZpZXdUcmFuc2xhdGU6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfTtcclxuICBwcmV2aWV3U3VyZmFjZVJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgY2xvc2VQcmV2aWV3OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bjogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZTogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgaGFuZGxlUHJldmlld1doZWVsOiAoZXZlbnQ6IFJlYWN0LldoZWVsRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG59KSA9PiAoe1xyXG4gIG9wZW46IHByZXZpZXdPcGVuLFxyXG4gIGJ1c3k6IHByZXZpZXdCdXN5LFxyXG4gIGVycm9yOiBwcmV2aWV3RXJyb3IsXHJcbiAgaW1hZ2VVcmw6IHByZXZpZXdJbWFnZVVybCxcclxuICBpbWFnZUFsdDogcHJldmlld0FsdFRleHQsXHJcbiAgc2NhbGU6IHByZXZpZXdTY2FsZSxcclxuICB0cmFuc2xhdGU6IHByZXZpZXdUcmFuc2xhdGUsXHJcbiAgc3VyZmFjZVJlZjogcHJldmlld1N1cmZhY2VSZWYsXHJcbiAgb25DbG9zZTogY2xvc2VQcmV2aWV3LFxyXG4gIG9uUG9pbnRlckRvd246IGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcclxuICBvblBvaW50ZXJNb3ZlOiBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXHJcbiAgb25Qb2ludGVyRW5kOiBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxuICBvbldoZWVsOiBoYW5kbGVQcmV2aWV3V2hlZWwsXHJcbn0pO1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXcgPSAoe1xyXG4gIGlzTG9hZGluZyxcclxuICBlcnJvck1lc3NhZ2UsXHJcbiAgaGVhZGVyLFxyXG4gIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gIHByZXZpZXdCdXN5LFxyXG4gIHByZXZpZXdFcnJvcixcclxuICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgcHJldmlld0FsdFRleHQsXHJcbiAgb3BlbkZpbGUsXHJcbiAgc3RhdHVzTGFiZWwsXHJcbiAgZ2FzdG9UeXBlTGFiZWwsXHJcbiAgdG90YWxBbW91bnRUZXh0LFxyXG4gIHRyYW5zRGF0ZVRleHQsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkZXNjcmlwdGlvbkludmFsaWQsXHJcbiAgZGVzY3JpcHRpb25JbnB1dFJlZixcclxuICBkcmFmdEdhc3RvVHlwZSxcclxuICBnYXN0b1R5cGVJbnZhbGlkLFxyXG4gIGdhc3RvVHlwZUlucHV0UmVmLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGN1cnJlbmN5Q29kZUludmFsaWQsXHJcbiAgY3VycmVuY3lJbnB1dFJlZixcclxuICBkcmFmdFRyYW5zRGF0ZSxcclxuICBkcmFmdFVybEZpbGUsXHJcbiAgZHJhZnRGaWxlTmFtZSxcclxuICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gIHNldERyYWZ0R2FzdG9UeXBlLFxyXG4gIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIHNldERyYWZ0VHJhbnNEYXRlLFxyXG4gIGlzRnJvbVNoZWV0TGluayxcclxuICBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0LFxyXG4gIHZpc2libGVMaW5lcyxcclxuICB0b3RhbExpbmVQYWdlcyxcclxuICBsaW5lUGFnZSxcclxuICBzYWZlQ3VycmVuY3lDb2RlLFxyXG4gIHBhZ2luYXRpb25MYWJlbHMsXHJcbiAgbGluZUNvbnRhaW5lclJlZixcclxuICBzZXRMaW5lUGFnZSxcclxuICBvcGVuTGluZURldGFpbCxcclxuICBzdGF0dXMsXHJcbn06IHtcclxuICBpc0xvYWRpbmc6IGJvb2xlYW47XHJcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbDtcclxuICBzaG93U3RpY2t5UHJldmlldzogYm9vbGVhbjtcclxuICBwcmV2aWV3QnVzeTogYm9vbGVhbjtcclxuICBwcmV2aWV3RXJyb3I6IHN0cmluZztcclxuICBwcmV2aWV3SW1hZ2VVcmw6IHN0cmluZztcclxuICBwcmV2aWV3QWx0VGV4dDogc3RyaW5nO1xyXG4gIG9wZW5GaWxlOiAoKSA9PiB2b2lkO1xyXG4gIHN0YXR1c0xhYmVsOiBzdHJpbmc7XHJcbiAgZ2FzdG9UeXBlTGFiZWw6IHN0cmluZztcclxuICB0b3RhbEFtb3VudFRleHQ6IHN0cmluZztcclxuICB0cmFuc0RhdGVUZXh0OiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGdhc3RvVHlwZU9wdGlvbnM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXTtcclxuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb25JbnZhbGlkOiBib29sZWFuO1xyXG4gIGRlc2NyaXB0aW9uSW5wdXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcclxuICBnYXN0b1R5cGVJbnZhbGlkOiBib29sZWFuO1xyXG4gIGdhc3RvVHlwZUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZDogYm9vbGVhbjtcclxuICBjdXJyZW5jeUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XHJcbiAgZHJhZnRGaWxlTmFtZTogc3RyaW5nO1xyXG4gIHNldERyYWZ0RGVzY3JpcHRpb246ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldERyYWZ0R2FzdG9UeXBlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXREcmFmdEN1cnJlbmN5Q29kZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0RHJhZnRUcmFuc0RhdGU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGlzRnJvbVNoZWV0TGluazogYm9vbGVhbjtcclxuICBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0OiAoKSA9PiB2b2lkO1xyXG4gIHZpc2libGVMaW5lczogRXhwZW5zZVRpY2tldERldGFpbExpbmVbXTtcclxuICB0b3RhbExpbmVQYWdlczogbnVtYmVyO1xyXG4gIGxpbmVQYWdlOiBudW1iZXI7XHJcbiAgc2FmZUN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIHBhZ2luYXRpb25MYWJlbHM6IHtcclxuICAgIGZpcnN0OiBzdHJpbmc7XHJcbiAgICBwcmV2OiBzdHJpbmc7XHJcbiAgICBuZXh0OiBzdHJpbmc7XHJcbiAgICBsYXN0OiBzdHJpbmc7XHJcbiAgfTtcclxuICBsaW5lQ29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBzZXRMaW5lUGFnZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcclxuICBvcGVuTGluZURldGFpbDogKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG59KSA9PiAoe1xyXG4gIGlzTG9hZGluZyxcclxuICBlcnJvck1lc3NhZ2UsXHJcbiAgaGVhZGVyLFxyXG4gIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gIHByZXZpZXdCdXN5LFxyXG4gIHByZXZpZXdFcnJvcixcclxuICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgcHJldmlld0ZpbGVOYW1lOiBwcmV2aWV3QWx0VGV4dCxcclxuICBwcmV2aWV3QWx0VGV4dCxcclxuICBvbk9wZW5QcmV2aWV3OiBvcGVuRmlsZSxcclxuICBzdGF0dXNMYWJlbCxcclxuICBnYXN0b1R5cGVMYWJlbCxcclxuICB0b3RhbEFtb3VudFRleHQsXHJcbiAgdHJhbnNEYXRlVGV4dCxcclxuICBpc0VkaXRpbmcsXHJcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICBkZXNjcmlwdGlvbklucHV0UmVmLFxyXG4gIGRyYWZ0R2FzdG9UeXBlLFxyXG4gIGdhc3RvVHlwZUludmFsaWQsXHJcbiAgZ2FzdG9UeXBlSW5wdXRSZWYsXHJcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICBjdXJyZW5jeUlucHV0UmVmLFxyXG4gIGRyYWZ0VHJhbnNEYXRlLFxyXG4gIGRyYWZ0VXJsRmlsZSxcclxuICBkcmFmdEZpbGVOYW1lLFxyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlOiBzZXREcmFmdEdhc3RvVHlwZSxcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICBvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlOiBzZXREcmFmdFRyYW5zRGF0ZSxcclxuICBvbk9wZW5GaWxlOiBvcGVuRmlsZSxcclxuICBvbk9wZW5FeHBlbnNlU2hlZXQ6IGlzRnJvbVNoZWV0TGluayA/IHVuZGVmaW5lZCA6IGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQsXHJcbiAgdmlzaWJsZUxpbmVzLFxyXG4gIHRvdGFsTGluZVBhZ2VzLFxyXG4gIGxpbmVQYWdlLFxyXG4gIGN1cnJlbmN5Q29kZTogc2FmZUN1cnJlbmN5Q29kZSxcclxuICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gIGNvbnRhaW5lclJlZjogbGluZUNvbnRhaW5lclJlZixcclxuICBvbkxpbmVQYWdlQ2hhbmdlOiBzZXRMaW5lUGFnZSxcclxuICBvbk9wZW5MaW5lOiBvcGVuTGluZURldGFpbCxcclxuICBzdGF0dXMsXHJcbn0pO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3QXJncyA9IFBhcmFtZXRlcnM8dHlwZW9mIGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbE1vZGFsVmlldz5bMF07XHJcbnR5cGUgRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3QXJncyA9IFBhcmFtZXRlcnM8dHlwZW9mIGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3PlswXTtcclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXdBcmdzID0gUGFyYW1ldGVyczx0eXBlb2YgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXc+WzBdO1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUGFnZVZpZXdNb2RlbCA9ICh7XHJcbiAgbW9kYWxBcmdzLFxyXG4gIHByZXZpZXdBcmdzLFxyXG4gIGNvbnRlbnRBcmdzLFxyXG59OiB7XHJcbiAgbW9kYWxBcmdzOiBFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3QXJncztcclxuICBwcmV2aWV3QXJnczogRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3QXJncztcclxuICBjb250ZW50QXJnczogRXhwZW5zZVRpY2tldERldGFpbENvbnRlbnRWaWV3QXJncztcclxufSkgPT4gKHtcclxuICBtb2RhbDogYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3KG1vZGFsQXJncyksXHJcbiAgcHJldmlldzogYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1ZpZXcocHJldmlld0FyZ3MpLFxyXG4gIGNvbnRlbnQ6IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbENvbnRlbnRWaWV3KGNvbnRlbnRBcmdzKSxcclxufSk7XHJcblxyXG4vLyBLZWVwcyBmaWx0ZXIgY2FjaGUgd2lyaW5nIGFuZCBiYWNrIG5hdmlnYXRpb24gb3V0c2lkZSB0aGUgcGFnZSBjb250YWluZXIgYm9keS5cclxuY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbE5hdmlnYXRpb25TdGF0ZSA9ICh7XG4gIGZpbGVJZCxcbiAgZGV0YWlsT3JpZ2luLFxuICBoZWFkZXJUcmFuc0RhdGUsXG4gIGNvbnRleHRMaW5lUmVjSWQsXG4gIHRpY2tldFJldHVybkNvbnRleHQsXG59OiB7XG4gIGZpbGVJZDogc3RyaW5nO1xuICBkZXRhaWxPcmlnaW46IHN0cmluZztcbiAgaGVhZGVyVHJhbnNEYXRlOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xuICBjb250ZXh0TGluZVJlY0lkOiBzdHJpbmc7XG4gIHRpY2tldFJldHVybkNvbnRleHQ6IFJldHVyblR5cGU8dHlwZW9mIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQ+W1widGlja2V0UmV0dXJuQ29udGV4dFwiXTtcbn0pID0+IHtcbiAgY29uc3QgeyByZWFkQ2FjaGVkU3RhdGUsIHNhdmVDYWNoZWRTdGF0ZSwgbWFya1Jlc2V0RmlsdGVyc1JldHVybiwgY2xlYXJDYWNoZWRTdGF0ZSB9ID0gdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZSgpO1xuXG4gIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxCYWNrTmF2aWdhdGlvbih7XG4gICAgZmlsZUlkLFxuICAgIGRldGFpbE9yaWdpbixcbiAgICBoZWFkZXJUcmFuc0RhdGUsXG4gICAgY29udGV4dExpbmVSZWNJZCxcbiAgICB0aWNrZXRSZXR1cm5Db250ZXh0LFxuICAgIHJlYWRDYWNoZWRTdGF0ZSxcbiAgICBzYXZlQ2FjaGVkU3RhdGUsXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbWFya1Jlc2V0RmlsdGVyc1JldHVybixcclxuICAgIGNsZWFyQ2FjaGVkU3RhdGUsXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFJ1bnMgdGhlIG9uZS1zaG90IGF1dG8gZWRpdCB0cmFuc2l0aW9uIGZvciBsaW5rZWQgY29udGV4dHMgYWZ0ZXIgZGV0YWlsIGRhdGEgaXMgcmVhZHkuXHJcbmNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxBdXRvRWRpdCA9ICh7XG4gIGF1dG9FZGl0TW9kZSxcbiAgaXNGcm9tU2hlZXRMaW5rLFxuICBpc0xvYWRpbmcsXG4gIGhlYWRlcixcbiAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgY2FuQXR0ZW1wdEF1dG9FZGl0LFxufToge1xuICBhdXRvRWRpdE1vZGU6IGJvb2xlYW47XG4gIGlzRnJvbVNoZWV0TGluazogYm9vbGVhbjtcbiAgaXNMb2FkaW5nOiBib29sZWFuO1xuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xuICBjYW5BdHRlbXB0QXV0b0VkaXQ6IGJvb2xlYW47XG59KSA9PiB7XG4gIGNvbnN0IGF1dG9FZGl0QXR0ZW1wdGVkUmVmID0gdXNlUmVmKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghYXV0b0VkaXRNb2RlIHx8IGlzRnJvbVNoZWV0TGluayB8fCBhdXRvRWRpdEF0dGVtcHRlZFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgaWYgKGlzTG9hZGluZyB8fCAhaGVhZGVyIHx8ICFjYW5BdHRlbXB0QXV0b0VkaXQpIHJldHVybjtcblxuICAgIGF1dG9FZGl0QXR0ZW1wdGVkUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgIGhhbmRsZUVuYWJsZUVkaXQoKTtcbiAgfSwgW2F1dG9FZGl0TW9kZSwgY2FuQXR0ZW1wdEF1dG9FZGl0LCBoYW5kbGVFbmFibGVFZGl0LCBoZWFkZXIsIGlzRnJvbVNoZWV0TGluaywgaXNMb2FkaW5nXSk7XG59O1xuXG4vLyBSZXNvbHZlcyBwZXJtaXNzaW9uIGFuZCBhY3RpbmctdXNlciBzdGF0ZSBzbyB0aGUgcGFnZSBjb250YWluZXIgc3RheXMgZm9jdXNlZCBvbiBvcmNoZXN0cmF0aW9uLlxuY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbFBlcm1pc3Npb25TdGF0ZSA9ICgpID0+IHtcbiAgY29uc3Qge1xuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcbiAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgY3VycmVudENybVVzZXJJZCxcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXG4gICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxuICB9ID0gdXNlQXV0aENvbnRleHQoKTtcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJWaWV3XCIpO1xuICBjb25zdCBjYW5FZGl0VGlja2V0QnlNb2R1bGUgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIkVkaXRcIik7XG4gIGNvbnN0IGNhbkRlbGV0ZVRpY2tldEJ5TW9kdWxlID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJGdWxsQWNjZXNzXCIpO1xuICBjb25zdCBpc01hbmFnaW5nT3RoZXJVc2VyID0gaXNNYW5hZ2luZ090aGVyRXhwZW5zZVVzZXIoe1xuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7XG4gICAgaGFzQWNjZXNzLFxuICAgIGNhbkVkaXRUaWNrZXQ6IGNhbkVkaXRUaWNrZXRCeU1vZHVsZSAmJiAhaXNNYW5hZ2luZ090aGVyVXNlcixcbiAgICBjYW5EZWxldGVUaWNrZXQ6IGNhbkRlbGV0ZVRpY2tldEJ5TW9kdWxlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyLFxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcbiAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgY3VycmVudENybVVzZXJJZCxcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXG4gICAgaXNNYW5hZ2luZ090aGVyVXNlcixcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXG4gIH07XG59O1xuXHJcbi8vIE93bnMgdGhlIHRpY2tldCBkZXRhaWwgcGFnZSBvcmNoZXN0cmF0aW9uIHdoaWxlIHRoZSBjb21wb25lbnQgc3RheXMgdGhpbiBmb3IgcmVuZGVyaW5nLlxyXG5jb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUGFnZVZpZXdNb2RlbCA9ICgpID0+IHtcclxuICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1RJQ0tFVF9GSUxFX0lEX18pO1xyXG4gIGNvbnN0IGxpbmVDb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCB7XG4gICAgYXV0b0VkaXRNb2RlLFxuICAgIGRldGFpbE9yaWdpbixcbiAgICBjb250ZXh0U2hlZXRJZCxcbiAgICBjb250ZXh0TGluZVJlY0lkLFxuICAgIGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSxcbiAgICBpc0Zyb21FeHBlbnNlTGluZSxcbiAgICBpc0Zyb21TaGVldExpbmssXG4gICAgdGlja2V0UmV0dXJuQ29udGV4dCxcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQoKTtcbiAgY29uc3Qge1xuICAgIGhhc0FjY2VzcyxcbiAgICBjYW5FZGl0VGlja2V0LFxuICAgIGNhbkRlbGV0ZVRpY2tldCxcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQZXJtaXNzaW9uU3RhdGUoKTtcbiAgY29uc3QgZ2FzdG9UeXBlT3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiB7XHJcbiAgICBjb25zdCBzb3VyY2UgPSBBcnJheS5pc0FycmF5KHdpbmRvdy5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXykgPyB3aW5kb3cuX19FWFBFTlNFX0dBU1RPX1RZUEVTX18gOiBbXTtcclxuICAgIGNvbnN0IG1hcHBlZCA9IG1hcFdpbmRvd0VudW1PcHRpb25zKHNvdXJjZSkuZmlsdGVyKChlbnRyeSkgPT4ge1xyXG4gICAgICBjb25zdCBwYXJzZWQgPSBOdW1iZXIoZW50cnkudmFsdWUpO1xyXG4gICAgICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpICYmIEFMTE9XRURfR0FTVE9fVFlQRVMuaGFzKHBhcnNlZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAobWFwcGVkLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIG1hcHBlZC5zb3J0KChsZWZ0LCByaWdodCkgPT4gTnVtYmVyKGxlZnQudmFsdWUpIC0gTnVtYmVyKHJpZ2h0LnZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGJ1aWxkRmFsbGJhY2tHYXN0b1R5cGVPcHRpb25zKCk7XHJcbiAgfSwgW10pO1xyXG4gIGNvbnN0IGdhc3RvVHlwZUxhYmVsTWFwID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xyXG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgZ2FzdG9UeXBlT3B0aW9ucykge1xyXG4gICAgICBtYXAuc2V0KFN0cmluZyhvcHRpb24udmFsdWUpLCBvcHRpb24udGV4dCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWFwO1xyXG4gIH0sIFtnYXN0b1R5cGVPcHRpb25zXSk7XHJcbiAgY29uc3QgeyBoZWFkZXIsIGxpbmVzLCBpc0xvYWRpbmcsIGVycm9yTWVzc2FnZSwgcmVsb2FkRGV0YWlsIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUoe1xuICAgIGhhc0FjY2VzcyxcbiAgICBmaWxlSWQsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuICBjb25zdCBsaW5rZWRFeHBlbnNlU2hlZXRJZCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gc2FmZVRleHQodGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCB8fCBjb250ZXh0U2hlZXRJZCB8fCBoZWFkZXI/LmhvamFHYXN0b3NJZERpc3BsYXkpLFxuICAgIFtjb250ZXh0U2hlZXRJZCwgaGVhZGVyPy5ob2phR2FzdG9zSWREaXNwbGF5LCB0aWNrZXRSZXR1cm5Db250ZXh0XVxuICApO1xuICBjb25zdCB7XG4gICAgbGlua1NoZWV0TG9ja2VkLFxuICAgIGxpbmtTaGVldEJsb2NrZWRNZXNzYWdlLFxuICAgIGxpbmtTaGVldENoZWNrQnVzeSxcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXRMaW5rU2hlZXRHYXRlKHtcbiAgICBpc0xpbmtNb2RlOiAhIWxpbmtlZEV4cGVuc2VTaGVldElkLFxuICAgIGxpbmtTaGVldElkOiBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcbiAgICBjYW5Qcm9jZXNzTGlua01vZGU6IHRydWUsXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcbiAgICByZXNvbHZlQmxvY2tlZE1lc3NhZ2U6IHJlc29sdmVMaW5rZWRUaWNrZXRCbG9ja2VkTWVzc2FnZSxcbiAgfSk7XG4gIGNvbnN0IFtzaGVldFN5bmNCbG9ja2VkLCBzZXRTaGVldFN5bmNCbG9ja2VkXSA9IHVzZVN0YXRlKCgpID0+ICEhcmVhZEV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZShmaWxlSWQpKTtcbiAgY29uc3QgW3NoZWV0U3luY0Jsb2NrZWRNZXNzYWdlLCBzZXRTaGVldFN5bmNCbG9ja2VkTWVzc2FnZV0gPSB1c2VTdGF0ZSgoKSA9PlxuICAgIHNhZmVUZXh0KHJlYWRFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoZmlsZUlkKT8ubWVzc2FnZSlcbiAgKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHN5bmNTdGF0ZSA9IHJlYWRFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoZmlsZUlkKTtcbiAgICBzZXRTaGVldFN5bmNCbG9ja2VkKCEhc3luY1N0YXRlKTtcbiAgICBzZXRTaGVldFN5bmNCbG9ja2VkTWVzc2FnZShzYWZlVGV4dChzeW5jU3RhdGU/Lm1lc3NhZ2UpKTtcbiAgfSwgW2ZpbGVJZF0pO1xuXG4gIGNvbnN0IHBlbmRpbmdGaXJzdExpbmsgPVxuICAgIGRldGFpbE9yaWdpbiA9PT0gXCJzaGVldC1jcmVhdGVcIiAmJiAhIXNhZmVUZXh0KHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQgfHwgY29udGV4dFNoZWV0SWQpICYmICFzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZERpc3BsYXkpO1xuICBjb25zdCBzaGVldFdvcmtmbG93QmxvY2tNZXNzYWdlID0gcGVuZGluZ0ZpcnN0TGlua1xuICAgID8gaW5kVChcIkV4cGVuc2VUaWNrZXRzX1NoZWV0U3luY19QZW5kaW5nU2F2ZVJlcXVpcmVkXCIsIFwiU2F2ZSB0aGUgdGlja2V0IGJlZm9yZSBsZWF2aW5nIHRoaXMgZmxvdy5cIilcbiAgICA6IHNoZWV0U3luY0Jsb2NrZWRNZXNzYWdlIHx8XG4gICAgICBpbmRUKFxuICAgICAgICBcIkV4cGVuc2VUaWNrZXRzX1NoZWV0U3luY19SZXRyeVJlcXVpcmVkXCIsXG4gICAgICAgIFwiVGlja2V0IGRhdGEgY2hhbmdlZCwgYnV0IHdlIGNvdWxkIG5vdCBzeW5jIHRoZSBleHBlbnNlIGxpbmUuIFNhdmUgYWdhaW4gYmVmb3JlIGxlYXZpbmcuXCJcbiAgICAgICk7XG4gIGNvbnN0IHNob3VsZEJsb2NrV29ya2Zsb3dFeGl0ID0gcGVuZGluZ0ZpcnN0TGluayB8fCBzaGVldFN5bmNCbG9ja2VkO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFzaG91bGRCbG9ja1dvcmtmbG93RXhpdCkge1xuICAgICAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCh7XG4gICAgICBhY3RpdmU6IHRydWUsXG4gICAgICBtZXNzYWdlOiBzaGVldFdvcmtmbG93QmxvY2tNZXNzYWdlLFxuICAgICAgYmxvY2s6IHRydWUsXG4gICAgfSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCgpO1xuICAgIH07XG4gIH0sIFtzaGVldFdvcmtmbG93QmxvY2tNZXNzYWdlLCBzaG91bGRCbG9ja1dvcmtmbG93RXhpdF0pO1xuXG4gIGNvbnN0IHsgbWFya1Jlc2V0RmlsdGVyc1JldHVybiwgY2xlYXJDYWNoZWRTdGF0ZSB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbE5hdmlnYXRpb25TdGF0ZSh7XG4gICAgZmlsZUlkLFxuICAgIGRldGFpbE9yaWdpbixcbiAgICBoZWFkZXJUcmFuc0RhdGU6IGhlYWRlcj8udHJhbnNEYXRlLFxuICAgIGNvbnRleHRMaW5lUmVjSWQsXG4gICAgdGlja2V0UmV0dXJuQ29udGV4dCxcbiAgfSk7XG4gIGNvbnN0IGNhbkVkaXRMaW5rZWRUaWNrZXQgPSAhbGlua2VkRXhwZW5zZVNoZWV0SWQgfHwgKCFsaW5rU2hlZXRDaGVja0J1c3kgJiYgIWxpbmtTaGVldExvY2tlZCk7XG4gIGNvbnN0IGFsbG93QXNzaWduZWREcmFmdEVkaXQgPSBpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUgfHwgKCEhbGlua2VkRXhwZW5zZVNoZWV0SWQgJiYgY2FuRWRpdExpbmtlZFRpY2tldCk7XG4gIGNvbnN0IHtcbiAgICBidXN5LFxuICAgIHN0YXR1cyxcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtb2RhbEVycm9yLFxyXG4gICAgbGluZVBhZ2UsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZGVzY3JpcHRpb25JbnZhbGlkLFxyXG4gICAgZGVzY3JpcHRpb25JbnB1dFJlZixcclxuICAgIGRyYWZ0R2FzdG9UeXBlLFxyXG4gICAgZ2FzdG9UeXBlSW52YWxpZCxcclxuICAgIGdhc3RvVHlwZUlucHV0UmVmLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBjdXJyZW5jeUNvZGVJbnZhbGlkLFxyXG4gICAgY3VycmVuY3lJbnB1dFJlZixcclxuICAgIGRyYWZ0VHJhbnNEYXRlLFxyXG4gICAgZHJhZnRDb21lbnRhcmlvLFxyXG4gICAgZHJhZnRVcmxGaWxlLFxyXG4gICAgZHJhZnRGaWxlTmFtZSxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRHYXN0b1R5cGUsXHJcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIHNldERyYWZ0VHJhbnNEYXRlLFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3Ioe1xuICAgIGhlYWRlcixcbiAgICBsaW5lQ291bnQ6IGxpbmVzLmxlbmd0aCxcbiAgICBwYWdlU2l6ZTogTElORVNfUEFHRV9TSVpFLFxuICAgIGNhbkVkaXRUaWNrZXQ6IGNhbkVkaXRUaWNrZXQgJiYgY2FuRWRpdExpbmtlZFRpY2tldCxcbiAgICBpc0xvYWRpbmcsXG4gICAgYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCxcbiAgICBpc0Zyb21TaGVldExpbmssXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0SW5Db250ZXh0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChsaW5rU2hlZXRDaGVja0J1c3kpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobGlua2VkRXhwZW5zZVNoZWV0SWQgJiYgbGlua1NoZWV0TG9ja2VkKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICAgc2FmZVRleHQobGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UpIHx8XG4gICAgICAgIHJlc29sdmVMaW5rZWRUaWNrZXRCbG9ja2VkTWVzc2FnZShmYWxzZSk7XG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGhhbmRsZUVuYWJsZUVkaXQoKTtcbiAgfSwgW1xuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgbGlua1NoZWV0QmxvY2tlZE1lc3NhZ2UsXG4gICAgbGlua1NoZWV0Q2hlY2tCdXN5LFxuICAgIGxpbmtTaGVldExvY2tlZCxcbiAgICBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldFN0YXR1cyxcbiAgXSk7XG4gIGNvbnN0IHsgcGFnaW5hdGlvbkxhYmVscywgcHJldmlld0FsdFRleHQsIHN0YXR1c0xhYmVsLCBnYXN0b1R5cGVMYWJlbCwgdG90YWxBbW91bnRUZXh0LCB0cmFuc0RhdGVUZXh0IH0gPVxuICAgIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5KHtcbiAgICAgIGhlYWRlcixcbiAgICAgIGRyYWZ0R2FzdG9UeXBlLFxyXG4gICAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICAgIGRyYWZ0RmlsZU5hbWUsXHJcbiAgICAgIGlzRWRpdGluZyxcclxuICAgICAgZ2FzdG9UeXBlTGFiZWxNYXAsXHJcbiAgICB9KTtcclxuICBjb25zdCB7XHJcbiAgICBzaG93U3RpY2t5UHJldmlldyxcclxuICAgIHByZXZpZXdPcGVuLFxyXG4gICAgcHJldmlld0J1c3ksXHJcbiAgICBwcmV2aWV3RXJyb3IsXHJcbiAgICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgICBwcmV2aWV3U2NhbGUsXHJcbiAgICBwcmV2aWV3VHJhbnNsYXRlLFxyXG4gICAgcHJldmlld1N1cmZhY2VSZWYsXHJcbiAgICBvcGVuUHJldmlldyxcclxuICAgIGNsb3NlUHJldmlldyxcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kLFxyXG4gICAgaGFuZGxlUHJldmlld1doZWVsLFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsKHtcclxuICAgIGZpbGVJZCxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGRyYWZ0VXJsRmlsZSxcclxuICAgIGhlYWRlclVybEZpbGU6IGhlYWRlcj8udXJsRmlsZSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgdmlzaWJsZUxpbmVzID0gdXNlTWVtbygoKSA9PiBwYWdlZFNsaWNlKGxpbmVzLCBsaW5lUGFnZSwgTElORVNfUEFHRV9TSVpFKSwgW2xpbmVQYWdlLCBsaW5lc10pO1xyXG4gIGNvbnN0IHRvdGFsTGluZVBhZ2VzID0gTWF0aC5jZWlsKChsaW5lcy5sZW5ndGggfHwgMCkgLyBMSU5FU19QQUdFX1NJWkUpO1xyXG5cclxuICB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQXV0b0VkaXQoe1xuICAgIGF1dG9FZGl0TW9kZSxcbiAgICBpc0Zyb21TaGVldExpbmssXG4gICAgaXNMb2FkaW5nLFxuICAgIGhlYWRlcixcbiAgICBoYW5kbGVFbmFibGVFZGl0OiBoYW5kbGVFbmFibGVFZGl0SW5Db250ZXh0LFxuICAgIGNhbkF0dGVtcHRBdXRvRWRpdDogIWxpbmtTaGVldENoZWNrQnVzeSxcbiAgfSk7XG5cbiAgY29uc3QgeyBoYW5kbGVVcGRhdGUsIGhhbmRsZVBlcnNpc3RIZWFkZXJEcmFmdCwgaGFuZGxlRGVsZXRlIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zKHtcbiAgICBidXN5LFxuICAgIGlzRWRpdGluZyxcbiAgICBjYW5FZGl0VGlja2V0OiBjYW5FZGl0VGlja2V0ICYmIGNhbkVkaXRMaW5rZWRUaWNrZXQsXG4gICAgY2FuRGVsZXRlVGlja2V0OiBjYW5EZWxldGVUaWNrZXQgJiYgY2FuRWRpdExpbmtlZFRpY2tldCxcbiAgICBmaWxlSWQsXG4gICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICBkcmFmdEdhc3RvVHlwZSxcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBkcmFmdFRyYW5zRGF0ZSxcbiAgICBkcmFmdENvbWVudGFyaW8sXG4gICAgZHJhZnRVcmxGaWxlLFxuICAgIGRyYWZ0RmlsZU5hbWUsXG4gICAgbGlua2VkRXhwZW5zZVNoZWV0SWQsXG4gICAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0OiBpc0Zyb21FeHBlbnNlTGluZSAmJiBsaW5rZWRFeHBlbnNlU2hlZXRJZCAmJiBjb250ZXh0TGluZVJlY0lkXG4gICAgICA/IHtcbiAgICAgICAgICBzaGVldElkOiBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcbiAgICAgICAgICBsaW5lUmVjSWQ6IGNvbnRleHRMaW5lUmVjSWQsXG4gICAgICAgIH1cbiAgICAgIDogbnVsbCxcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgIG9uTGlua2VkU2hlZXRTeW5jRmFpbHVyZTogKG1lc3NhZ2UpID0+IHtcbiAgICAgIHNldFNoZWV0U3luY0Jsb2NrZWQodHJ1ZSk7XG4gICAgICBzZXRTaGVldFN5bmNCbG9ja2VkTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcbiAgICB9LFxuICAgIG9uTGlua2VkU2hlZXRTeW5jU3VjY2VzczogKCkgPT4ge1xuICAgICAgc2V0U2hlZXRTeW5jQmxvY2tlZChmYWxzZSk7XG4gICAgICBzZXRTaGVldFN5bmNCbG9ja2VkTWVzc2FnZShcIlwiKTtcbiAgICB9LFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNFZGl0aW5nLFxuICB9KTtcblxyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIG1vZGFsTG9hZGluZ1RleHQsIG1vZGFsQ2FuY2VsVGV4dCwgbW9kYWxDb25maXJtVGV4dCwgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtIH0gPVxuICAgIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGUoe1xuICAgICAgYnVzeSxcbiAgICAgIG1vZGFsRXJyb3IsXG4gICAgICBzZXRNb2RhbEVycm9yLFxuICAgICAgc2V0U3RhdHVzLFxuICAgIH0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFzaG91bGRCbG9ja1dvcmtmbG93RXhpdCB8fCBidXN5KSByZXR1cm47XG4gICAgaWYgKCFzaGVldFdvcmtmbG93QmxvY2tNZXNzYWdlKSByZXR1cm47XG4gICAgaWYgKHN0YXR1cyA9PT0gc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSkgcmV0dXJuO1xuICAgIHNldFN0YXR1cyhzaGVldFdvcmtmbG93QmxvY2tNZXNzYWdlKTtcbiAgfSwgW2J1c3ksIHNldFN0YXR1cywgc2hlZXRXb3JrZmxvd0Jsb2NrTWVzc2FnZSwgc2hvdWxkQmxvY2tXb3JrZmxvd0V4aXQsIHN0YXR1c10pO1xuXG4gIGNvbnN0IGlzQXNzaWduZWRUaWNrZXQgPSBoZWFkZXI/LnN0YXR1cyA9PT0gMTtcbiAgY29uc3QgaXNDb250ZXh0TG9ja2VkID0gKGlzQXNzaWduZWRUaWNrZXQgJiYgIWFsbG93QXNzaWduZWREcmFmdEVkaXQpIHx8ICghIWxpbmtlZEV4cGVuc2VTaGVldElkICYmIGxpbmtTaGVldExvY2tlZCk7XG4gIGNvbnN0IGNhbkVkaXRUaWNrZXRJbkNvbnRleHQgPSBjYW5FZGl0VGlja2V0ICYmIGNhbkVkaXRMaW5rZWRUaWNrZXQgJiYgIWlzRnJvbVNoZWV0TGluaztcbiAgY29uc3QgY2FuRGVsZXRlVGlja2V0SW5Db250ZXh0ID0gY2FuRGVsZXRlVGlja2V0ICYmIGNhbkVkaXRMaW5rZWRUaWNrZXQgJiYgIWlzRnJvbVNoZWV0TGluaztcbiAgY29uc3QgdGlja2V0VG9wYmFyQWN0aW9uTW9kZTogXCJkZWZhdWx0XCIgfCBcInZpZXdfb25seVwiID1cbiAgICAhY2FuRWRpdFRpY2tldEluQ29udGV4dCAmJiAhY2FuRGVsZXRlVGlja2V0SW5Db250ZXh0ID8gXCJ2aWV3X29ubHlcIiA6IFwiZGVmYXVsdFwiO1xuXG4gIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zKHtcbiAgICBidXN5LFxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0xvY2tlZDogaXNDb250ZXh0TG9ja2VkLFxyXG4gICAgYWN0aW9uTW9kZTogdGlja2V0VG9wYmFyQWN0aW9uTW9kZSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHk6IG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcbiAgICBjYW5FZGl0VGlja2V0OiBjYW5FZGl0VGlja2V0SW5Db250ZXh0LFxuICAgIGNhbkRlbGV0ZVRpY2tldDogY2FuRGVsZXRlVGlja2V0SW5Db250ZXh0LFxuICAgIGZpbGVJZCxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQ6IGhhbmRsZUVuYWJsZUVkaXRJbkNvbnRleHQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBjYW5PcGVuU2F2ZUNvbmZpcm0sXG4gICAgaGFuZGxlVXBkYXRlLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgICBvblNhdmVTdWNjZXNzOiAoKSA9PiB7XG4gICAgICBpZiAoKGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSB8fCBpc0Zyb21FeHBlbnNlTGluZSkgJiYgbGlua2VkRXhwZW5zZVNoZWV0SWQpIHtcbiAgICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xuICAgICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChidWlsZEV4cGVuc2VTaGVldERldGFpbFVybChsaW5rZWRFeHBlbnNlU2hlZXRJZCksIHtcbiAgICAgICAgICBieXBhc3NHdWFyZE9uY2U6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZvaWQgcmVsb2FkRGV0YWlsKCk7XG4gICAgfSxcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgIGlmICh0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkKSB7XG4gICAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcbiAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwodGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkKSwge1xuICAgICAgICAgIGJ5cGFzc0d1YXJkT25jZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbWFya1Jlc2V0RmlsdGVyc1JldHVybigpO1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL1RpY2tldHNcIiwge1xuICAgICAgICBieXBhc3NHdWFyZE9uY2U6IHRydWUsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB7IG9wZW5MaW5lRGV0YWlsLCByZXNvbHZlQ2xpY2thYmxlQ2FyZCwgb3BlbkZpbGUsIGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMoe1xuICAgIGJ1c3ksXG4gICAgZmlsZUlkLFxuICAgIGNvbnRleHRTaGVldElkOiBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcbiAgICBpc0Zyb21TaGVldExpbmssXG4gICAgaGVhZGVyRXhwZW5zZVNoZWV0SWQ6IHNhZmVUZXh0KGhlYWRlcj8uaG9qYUdhc3Rvc0lkRGlzcGxheSksXG4gICAgaXNFZGl0aW5nLFxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcbiAgICBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQsXG4gICAgYnlwYXNzV29ya2Zsb3dHdWFyZDogc2hvdWxkQmxvY2tXb3JrZmxvd0V4aXQsXG4gICAgbGluZUNvbnRhaW5lclJlZixcbiAgICBvcGVuUHJldmlldyxcbiAgICB0aWNrZXRSZXR1cm5Db250ZXh0LFxuICB9KTtcblxyXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoe1xyXG4gICAgY29udGFpbmVyUmVmOiBsaW5lQ29udGFpbmVyUmVmLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgaXRlbXM6IHZpc2libGVMaW5lcyxcclxuICAgIHJlc29sdmVDbGlja2FibGVDYXJkLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBkZXRhaWxWaWV3ID0gYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUGFnZVZpZXdNb2RlbCh7XHJcbiAgICBtb2RhbEFyZ3M6IHtcclxuICAgICAgbW9kYWwsXHJcbiAgICAgIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgICAgIG1vZGFsQ2FuY2VsVGV4dCxcclxuICAgICAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICAgICAgYnVzeSxcclxuICAgICAgbW9kYWxFcnJvcixcclxuICAgICAgc3RhdHVzLFxyXG4gICAgICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgICAgIGNsb3NlQ29uZmlybSxcclxuICAgIH0sXHJcbiAgICBwcmV2aWV3QXJnczoge1xyXG4gICAgICBwcmV2aWV3T3BlbixcclxuICAgICAgcHJldmlld0J1c3ksXHJcbiAgICAgIHByZXZpZXdFcnJvcixcclxuICAgICAgcHJldmlld0ltYWdlVXJsLFxyXG4gICAgICBwcmV2aWV3QWx0VGV4dCxcclxuICAgICAgcHJldmlld1NjYWxlLFxyXG4gICAgICBwcmV2aWV3VHJhbnNsYXRlLFxyXG4gICAgICBwcmV2aWV3U3VyZmFjZVJlZixcclxuICAgICAgY2xvc2VQcmV2aWV3LFxyXG4gICAgICBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24sXHJcbiAgICAgIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcclxuICAgICAgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXHJcbiAgICAgIGhhbmRsZVByZXZpZXdXaGVlbCxcclxuICAgIH0sXHJcbiAgICBjb250ZW50QXJnczoge1xyXG4gICAgICBpc0xvYWRpbmcsXHJcbiAgICAgIGVycm9yTWVzc2FnZSxcclxuICAgICAgaGVhZGVyLFxyXG4gICAgICBzaG93U3RpY2t5UHJldmlldyxcclxuICAgICAgcHJldmlld0J1c3ksXHJcbiAgICAgIHByZXZpZXdFcnJvcixcclxuICAgICAgcHJldmlld0ltYWdlVXJsLFxyXG4gICAgICBwcmV2aWV3QWx0VGV4dCxcclxuICAgICAgb3BlbkZpbGUsXHJcbiAgICAgIHN0YXR1c0xhYmVsLFxyXG4gICAgICBnYXN0b1R5cGVMYWJlbCxcclxuICAgICAgdG90YWxBbW91bnRUZXh0LFxyXG4gICAgICB0cmFuc0RhdGVUZXh0LFxyXG4gICAgICBpc0VkaXRpbmcsXHJcbiAgICAgIGdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICAgIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICAgICAgZGVzY3JpcHRpb25JbnB1dFJlZixcclxuICAgICAgZHJhZnRHYXN0b1R5cGUsXHJcbiAgICAgIGdhc3RvVHlwZUludmFsaWQsXHJcbiAgICAgIGdhc3RvVHlwZUlucHV0UmVmLFxyXG4gICAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgICAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICAgICAgY3VycmVuY3lJbnB1dFJlZixcclxuICAgICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICAgIGRyYWZ0VXJsRmlsZSxcclxuICAgICAgZHJhZnRGaWxlTmFtZSxcclxuICAgICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgICAgc2V0RHJhZnRHYXN0b1R5cGUsXHJcbiAgICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgICBzZXREcmFmdFRyYW5zRGF0ZSxcclxuICAgICAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gICAgICBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0LFxyXG4gICAgICB2aXNpYmxlTGluZXMsXHJcbiAgICAgIHRvdGFsTGluZVBhZ2VzLFxyXG4gICAgICBsaW5lUGFnZSxcclxuICAgICAgc2FmZUN1cnJlbmN5Q29kZTogaXNFZGl0aW5nID8gZHJhZnRDdXJyZW5jeUNvZGUgOiBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSksXHJcbiAgICAgIHBhZ2luYXRpb25MYWJlbHMsXHJcbiAgICAgIGxpbmVDb250YWluZXJSZWYsXHJcbiAgICAgIHNldExpbmVQYWdlLFxyXG4gICAgICBvcGVuTGluZURldGFpbCxcclxuICAgICAgc3RhdHVzLFxyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGRldGFpbFZpZXc7XHJcbn07XHJcblxyXG5jb25zdCBFeHBlbnNlVGlja2V0RGV0YWlsUGFnZUNvbnRlbnQgPSAoKSA9PiB7XHJcbiAgY29uc3QgZGV0YWlsVmlldyA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQYWdlVmlld01vZGVsKCk7XHJcblxyXG4gIHJldHVybiA8RXhwZW5zZVRpY2tldERldGFpbFZpZXcgbW9kYWw9e2RldGFpbFZpZXcubW9kYWx9IHByZXZpZXc9e2RldGFpbFZpZXcucHJldmlld30gY29udGVudD17ZGV0YWlsVmlldy5jb250ZW50fSAvPjtcclxufTtcclxuXHJcbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgZXhwZW5zZSB0aWNrZXQgZGV0YWlsLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0RGV0YWlsUGFnZSA9ICgpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzIGVuYWJsZUV4cGVuc2VNYW5hZ2VtZW50PlxyXG4gICAgICA8RXhwZW5zZVRpY2tldERldGFpbFBhZ2VDb250ZW50IC8+XHJcbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlIC8+KTtcclxufTtcclxuXHJcbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldERldGFpbFBhZ2U7XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLCBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBtYXBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLCBtYXBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGVBcmdzID0ge1xyXG4gIGhhc0FjY2VzczogYm9vbGVhbjtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIE93bnMgcmVhZCBzdGF0ZSBhbmQgQVBJIGxvYWRpbmcgYmVoYXZpb3IgZm9yIHRoZSB0aWNrZXQgZGV0YWlsIHBhZ2UuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUgPSAoeyBoYXNBY2Nlc3MsIGZpbGVJZCwgb25Gb3JiaWRkZW4gfTogVXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlQXJncykgPT4ge1xyXG4gIGNvbnN0IFtoZWFkZXIsIHNldEhlYWRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2xpbmVzLCBzZXRMaW5lc10gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0RGV0YWlsTGluZVtdPihbXSk7XHJcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIGNvbnN0IHJlbG9hZERldGFpbCA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmICghaGFzQWNjZXNzKSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzYWZlRmlsZUlkID0gc2FmZVRleHQoZmlsZUlkKTtcclxuICAgIGlmICghc2FmZUZpbGVJZCkge1xyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIlRpY2tldHNfRGV0YWlsX05vdEZvdW5kXCIsIFwiVGlja2V0IHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XHJcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldChzYWZlRmlsZUlkLCB7XHJcbiAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZT8uTWVzc2FnZSB8fCBpbmRUKFwiVGlja2V0c19EZXRhaWxfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0IGRldGFpbC5cIikpO1xyXG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkID1cclxuICAgICAgICBpdGVtcy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnk/LkZpbGVJZCkudG9VcHBlckNhc2UoKSA9PT0gc2FmZUZpbGVJZC50b1VwcGVyQ2FzZSgpKSB8fCBpdGVtc1swXSB8fCBudWxsO1xyXG5cclxuICAgICAgaWYgKCFzZWxlY3RlZCkge1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiVGlja2V0c19EZXRhaWxfTm90Rm91bmRcIiwgXCJUaWNrZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBtYXBwZWRIZWFkZXIgPSBtYXBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyKHNlbGVjdGVkKTtcclxuICAgICAgY29uc3QgbWFwcGVkTGluZXMgPSAoQXJyYXkuaXNBcnJheShzZWxlY3RlZC5MaW5lcykgPyBzZWxlY3RlZC5MaW5lcyA6IFtdKS5tYXAoKGxpbmUpID0+XHJcbiAgICAgICAgbWFwRXhwZW5zZVRpY2tldERldGFpbExpbmUobGluZSlcclxuICAgICAgKTtcclxuICAgICAgc2V0SGVhZGVyKG1hcHBlZEhlYWRlcik7XHJcbiAgICAgIHNldExpbmVzKG1hcHBlZExpbmVzKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIlRpY2tldHNfRGV0YWlsX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldCBkZXRhaWwuXCIpKTtcclxuICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtmaWxlSWQsIGhhc0FjY2Vzcywgb25Gb3JiaWRkZW5dKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHZvaWQgcmVsb2FkRGV0YWlsKCk7XHJcbiAgfSwgW3JlbG9hZERldGFpbF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGVhZGVyLFxyXG4gICAgbGluZXMsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICByZWxvYWREZXRhaWwsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0IH0gZnJvbSBcIi4uLy4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbiB9IGZyb20gXCIuLi8uLi9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50c1wiO1xuaW1wb3J0IHtcclxuICBkZWxldGVFeHBlbnNlU2hlZXRMaW5lLFxyXG4gIGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldCxcclxuICBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRGaWxlLFxyXG4gIGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsLFxuICB1cGRhdGVFeHBlbnNlU2hlZXRUaWNrZXQsXG59IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFLCB0b0V4cGVuc2VBcGlEZE1tWXl5eSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBzeW5jRXhwZW5zZUxpbmtlZFRpY2tldFNoZWV0TGluZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTGlua2VkVGlja2V0U2hlZXRTeW5jLnRzXCI7XG5pbXBvcnQgeyByZXNvbHZlRXhwZW5zZVNoZWV0RWRpdEFjY2VzcyB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlU2hlZXRFZGl0QWNjZXNzLnRzXCI7XG5pbXBvcnQgeyBjbGVhckV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZSwgc2F2ZUV4cGVuc2VUaWNrZXRTaGVldFN5bmNTdGF0ZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUudHNcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5cclxudHlwZSBEZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQgPSB7XHJcbiAgc2hlZXRJZDogc3RyaW5nO1xyXG4gIGxpbmVSZWNJZDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBjYW5FZGl0VGlja2V0OiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZVRpY2tldDogYm9vbGVhbjtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcclxuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgZHJhZnRDb21lbnRhcmlvOiBzdHJpbmc7XG4gIGRyYWZ0VXJsRmlsZTogc3RyaW5nO1xuICBkcmFmdEZpbGVOYW1lOiBzdHJpbmc7XG4gIGxpbmtlZEV4cGVuc2VTaGVldElkPzogc3RyaW5nO1xuICBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQ/OiBEZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQgfCBudWxsO1xuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xuICBjYW5NYW5hZ2VPdGhlclVzZXJzOiBib29sZWFuO1xuICBjdXJyZW50QXhVc2VySWQ6IHN0cmluZztcbiAgY3VycmVudENybVVzZXJJZDogc3RyaW5nO1xuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQ6IHN0cmluZztcbiAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlPzogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZDtcbiAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzPzogKCkgPT4gdm9pZDtcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG59O1xuXHJcbmNvbnN0IFJFUVVJUkVEX0dBU1RPX1RZUEVTID0gbmV3IFNldDxudW1iZXI+KFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0pO1xyXG5cclxuY29uc3QgcGFyc2VPcHRpb25hbEludGVnZXIgPSAocmF3OiBzdHJpbmcpOiBudW1iZXIgfCB1bmRlZmluZWQgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKHJhdyB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIucGFyc2VJbnQodmFsdWUsIDEwKTtcclxuICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpID8gcGFyc2VkIDogdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuLy8gVHJpZXMgdG8gaW5mZXIgYSBzYWZlIGV4dGVuc2lvbiBmb3IgdXBkYXRlIHBheWxvYWQgZnJvbSBmaWxlIG5hbWUgb3IgVVJMLlxyXG5jb25zdCByZXNvbHZlVGlja2V0RmlsZUV4dGVuc2lvbiA9IChmaWxlTmFtZTogc3RyaW5nLCB1cmxGaWxlOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xyXG4gIGNvbnN0IHNvdXJjZSA9IFN0cmluZyhmaWxlTmFtZSB8fCBcIlwiKS50cmltKCkgfHwgU3RyaW5nKHVybEZpbGUgfHwgXCJcIikudHJpbSgpO1xyXG4gIGNvbnN0IG1hdGNoID0gc291cmNlLm1hdGNoKC9cXC4oW2EtekEtWjAtOV17MSwxMH0pKD86JHxbPyNdKS8pO1xyXG4gIGlmICghbWF0Y2ggfHwgIW1hdGNoWzFdKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIHJldHVybiBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxuY29uc3QgaXNOb3RGb3VuZEVycm9yID0gKGVycm9yOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwNDtcclxufTtcclxuXHJcbmNvbnN0IGlzTWlzc2luZ1RpY2tldEZpbGVNZXNzYWdlID0gKG1lc3NhZ2U6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKG1lc3NhZ2UgfHwgXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXJjaGl2byBhc29jaWFkb1wiKSB8fFxyXG4gICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImFyY2hpdm8gYWRqdW50b1wiKSB8fFxyXG4gICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImFzc29jaWF0ZWQgZmlsZVwiKSB8fFxyXG4gICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImF0dGFjaGVkIGZpbGVcIilcclxuICApO1xyXG59O1xyXG5cclxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgdGlja2V0IGhlYWRlciBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zID0gKHtcclxuICBidXN5LFxyXG4gIGlzRWRpdGluZyxcclxuICBjYW5FZGl0VGlja2V0LFxyXG4gIGNhbkRlbGV0ZVRpY2tldCxcclxuICBmaWxlSWQsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkcmFmdEdhc3RvVHlwZSxcclxuICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICBkcmFmdFRyYW5zRGF0ZSxcclxuICBkcmFmdENvbWVudGFyaW8sXHJcbiAgZHJhZnRVcmxGaWxlLFxuICBkcmFmdEZpbGVOYW1lLFxuICBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcbiAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0LFxuICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxuICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICBjdXJyZW50QXhVc2VySWQsXG4gIGN1cnJlbnRDcm1Vc2VySWQsXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcbiAgb25MaW5rZWRTaGVldFN5bmNGYWlsdXJlLFxuICBvbkxpbmtlZFNoZWV0U3luY1N1Y2Nlc3MsXG4gIHNldE1vZGFsRXJyb3IsXG4gIHNldEJ1c3ksXG4gIHNldFN0YXR1cyxcbiAgc2V0SXNFZGl0aW5nLFxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9uc0FyZ3MpID0+IHtcbiAgY29uc3QgdmFsaWRhdGVMaW5rZWRTaGVldEJlZm9yZU11dGF0aW9uID0gdXNlQ2FsbGJhY2soYXN5bmMgKCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4gPT4ge1xuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQobGlua2VkRXhwZW5zZVNoZWV0SWQpO1xuICAgIGlmICghc2FmZVNoZWV0SWQpIHtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIGNvbnN0IGFjY2Vzc1Jlc3VsdCA9IGF3YWl0IHJlc29sdmVFeHBlbnNlU2hlZXRFZGl0QWNjZXNzKHtcbiAgICAgIHNoZWV0SWQ6IHNhZmVTaGVldElkLFxuICAgICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcbiAgICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gICAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgICBjdXJyZW50Q3JtVXNlcklkLFxuICAgICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgfSk7XG4gICAgaWYgKCFhY2Nlc3NSZXN1bHQuaXNMb2NrZWQpIHtcbiAgICAgIHJldHVybiBzYWZlU2hlZXRJZDtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgIHNhZmVUZXh0KGFjY2Vzc1Jlc3VsdC5ibG9ja2VkTWVzc2FnZSkgfHxcbiAgICAgIGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9SZWFkT25seUJ5U3RhdHVzXCIsIFwiTm8gc2UgcHVlZGUgZWRpdGFyIGVzdGEgaG9qYSBkZSBnYXN0b3MgZW4gZWwgZXN0YWRvIGFjdHVhbC5cIik7XG4gICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcbiAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sIFtcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgbGlua2VkRXhwZW5zZVNoZWV0SWQsXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0U3RhdHVzLFxuICBdKTtcblxuICBjb25zdCBydW5IZWFkZXJVcGRhdGUgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAoeyBzeW5jU2hlZXRMaW5lIH06IHsgc3luY1NoZWV0TGluZTogYm9vbGVhbiB9KTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gICAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoIWNhbkVkaXRUaWNrZXQpIHtcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWREZXNjcmlwdGlvbiA9IFN0cmluZyhkcmFmdERlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGlmICghbm9ybWFsaXplZERlc2NyaXB0aW9uKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0Rlc2NyaXB0aW9uUmVxdWlyZWRcIiwgXCJEZXNjcmlwdGlvbiBpcyByZXF1aXJlZC5cIik7XG4gICAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XG4gICAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3kgPSBTdHJpbmcoZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG4gICAgICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW5jeSkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9DdXJyZW5jeVJlcXVpcmVkXCIsIFwiQ3VycmVuY3kgaXMgcmVxdWlyZWQuXCIpO1xuICAgICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xuICAgICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyc2VkR2FzdG9UeXBlID0gcGFyc2VPcHRpb25hbEludGVnZXIoZHJhZnRHYXN0b1R5cGUpO1xuICAgICAgaWYgKHBhcnNlZEdhc3RvVHlwZSA9PT0gdW5kZWZpbmVkIHx8ICFSRVFVSVJFRF9HQVNUT19UWVBFUy5oYXMocGFyc2VkR2FzdG9UeXBlKSkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIlRpY2tldHNfVmFsaWRhdGlvbl9DYXRlZ29yeVJlcXVpcmVkXCIsIFwiQ2F0ZWdvcnkgaXMgcmVxdWlyZWQuXCIpO1xuICAgICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xuICAgICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmF3VHJhbnNEYXRlID0gU3RyaW5nKGRyYWZ0VHJhbnNEYXRlIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc0RhdGUgPSByYXdUcmFuc0RhdGUgPyB0b0V4cGVuc2VBcGlEZE1tWXl5eShyYXdUcmFuc0RhdGUpIDogXCJcIjtcbiAgICAgIGlmIChyYXdUcmFuc0RhdGUgJiYgIW5vcm1hbGl6ZWRUcmFuc0RhdGUpIHtcbiAgICAgICAgc2V0TW9kYWxFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgICAgICAgc2V0U3RhdHVzKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZhbGlkYXRlZFNoZWV0SWQgPSBhd2FpdCB2YWxpZGF0ZUxpbmtlZFNoZWV0QmVmb3JlTXV0YXRpb24oKTtcbiAgICAgIGlmICh2YWxpZGF0ZWRTaGVldElkID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCA9IHtcbiAgICAgICAgZGVzY3JpcHRpb246IG5vcm1hbGl6ZWREZXNjcmlwdGlvbixcbiAgICAgICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVkQ3VycmVuY3ksXG4gICAgICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplZFRyYW5zRGF0ZSB8fCB1bmRlZmluZWQsXG4gICAgICAgIGNvbWVudGFyaW86IFN0cmluZyhkcmFmdENvbWVudGFyaW8gfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgdXJsRmlsZTogU3RyaW5nKGRyYWZ0VXJsRmlsZSB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgICBmaWxlTmFtZTogU3RyaW5nKGRyYWZ0RmlsZU5hbWUgfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgZmlsZUV4dGVuc2lvbjogcmVzb2x2ZVRpY2tldEZpbGVFeHRlbnNpb24oZHJhZnRGaWxlTmFtZSwgZHJhZnRVcmxGaWxlKSxcbiAgICAgICAgZ2FzdG9UeXBlOiBwYXJzZWRHYXN0b1R5cGUgYXMgRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdFtcImdhc3RvVHlwZVwiXSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xuICAgICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcbiAgICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXG4gICAgICAgIHNldE1vZGFsRXJyb3IsXG4gICAgICAgIHNldEJ1c3ksXG4gICAgICAgIHNldFN0YXR1cyxcbiAgICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1cGRhdGVFeHBlbnNlU2hlZXRUaWNrZXQoZmlsZUlkLCBwYXlsb2FkKTtcbiAgICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHN5bmNTaGVldExpbmUgJiYgdmFsaWRhdGVkU2hlZXRJZCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgYXdhaXQgc3luY0V4cGVuc2VMaW5rZWRUaWNrZXRTaGVldExpbmUoe1xuICAgICAgICAgICAgICAgIGZpbGVJZCxcbiAgICAgICAgICAgICAgICBzaGVldElkOiB2YWxpZGF0ZWRTaGVldElkLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgY2xlYXJFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoKTtcbiAgICAgICAgICAgICAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzPy4oKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3JcbiAgICAgICAgICAgICAgICAgID8gZXJyb3IubWVzc2FnZVxuICAgICAgICAgICAgICAgICAgOiBpbmRUKFxuICAgICAgICAgICAgICAgICAgICAgIFwiRXhwZW5zZVRpY2tldHNfU2hlZXRTeW5jX1JldHJ5UmVxdWlyZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIlRpY2tldCBkYXRhIGNoYW5nZWQsIGJ1dCB3ZSBjb3VsZCBub3Qgc3luYyB0aGUgZXhwZW5zZSBsaW5lLiBTYXZlIGFnYWluIGJlZm9yZSBsZWF2aW5nLlwiXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHNhdmVFeHBlbnNlVGlja2V0U2hlZXRTeW5jU3RhdGUoe1xuICAgICAgICAgICAgICAgIGZpbGVJZCxcbiAgICAgICAgICAgICAgICBzaGVldElkOiB2YWxpZGF0ZWRTaGVldElkLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBvbkxpbmtlZFNoZWV0U3luY0ZhaWx1cmU/LihtZXNzYWdlKTtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgdXBkYXRlZFwiKSk7XG4gICAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVzdWx0Lm9rO1xuICAgIH0sXG4gICAgW1xuICAgICAgYnVzeSxcbiAgICAgIGNhbkVkaXRUaWNrZXQsXG4gICAgICBkcmFmdENvbWVudGFyaW8sXG4gICAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgICBkcmFmdEZpbGVOYW1lLFxuICAgICAgZHJhZnRHYXN0b1R5cGUsXG4gICAgICBkcmFmdFRyYW5zRGF0ZSxcbiAgICAgIGRyYWZ0VXJsRmlsZSxcbiAgICAgIGZpbGVJZCxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIG9uTGlua2VkU2hlZXRTeW5jRmFpbHVyZSxcbiAgICAgIG9uTGlua2VkU2hlZXRTeW5jU3VjY2VzcyxcbiAgICAgIHNldEJ1c3ksXG4gICAgICBzZXRJc0VkaXRpbmcsXG4gICAgICBzZXRNb2RhbEVycm9yLFxuICAgICAgc2V0U3RhdHVzLFxuICAgICAgdmFsaWRhdGVMaW5rZWRTaGVldEJlZm9yZU11dGF0aW9uLFxuICAgIF1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgcmV0dXJuIHJ1bkhlYWRlclVwZGF0ZSh7XG4gICAgICBzeW5jU2hlZXRMaW5lOiB0cnVlLFxuICAgIH0pO1xuICB9LCBbcnVuSGVhZGVyVXBkYXRlXSk7XG5cbiAgY29uc3QgaGFuZGxlUGVyc2lzdEhlYWRlckRyYWZ0ID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIHJldHVybiBydW5IZWFkZXJVcGRhdGUoe1xuICAgICAgc3luY1NoZWV0TGluZTogZmFsc2UsXG4gICAgfSk7XG4gIH0sIFtydW5IZWFkZXJVcGRhdGVdKTtcblxyXG4gIGNvbnN0IHJlc29sdmVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQgPSB1c2VDYWxsYmFjayhhc3luYyAoKTogUHJvbWlzZTxEZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQgfCBudWxsPiA9PiB7XHJcbiAgICBpZiAoZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0KSB7XHJcbiAgICAgIHJldHVybiBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChsaW5rZWRFeHBlbnNlU2hlZXRJZCk7XHJcbiAgICBpZiAoIXNhZmVTaGVldElkKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwoc2FmZVNoZWV0SWQsIHtcclxuICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZS5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xyXG4gICAgY29uc3QgZGV0YWlsID0gaXRlbXMuZmluZCgoZW50cnkpID0+IGVudHJ5ICYmIHR5cGVvZiBlbnRyeSA9PT0gXCJvYmplY3RcIikgfHwgbnVsbDtcclxuICAgIGNvbnN0IGxpbmVzID0gQXJyYXkuaXNBcnJheShkZXRhaWw/LkxpbmVzKSA/IGRldGFpbC5MaW5lcyA6IFtdO1xyXG4gICAgY29uc3QgbWF0Y2hpbmdMaW5lID0gbGluZXMuZmluZCgobGluZSkgPT4gc2FmZVRleHQobGluZT8uRmlsZUlkKSA9PT0gZmlsZUlkKTtcclxuICAgIGNvbnN0IGxpbmVSZWNJZCA9IHNhZmVUZXh0KG1hdGNoaW5nTGluZT8uUmVjSWQpO1xyXG5cclxuICAgIGlmICghbGluZVJlY0lkKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNoZWV0SWQ6IHNhZmVTaGVldElkLFxyXG4gICAgICBsaW5lUmVjSWQsXHJcbiAgICB9O1xyXG4gIH0sIFtkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQsIGZpbGVJZCwgbGlua2VkRXhwZW5zZVNoZWV0SWRdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjYW5EZWxldGVUaWNrZXQpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB2YWxpZGF0ZWRTaGVldElkID0gYXdhaXQgdmFsaWRhdGVMaW5rZWRTaGVldEJlZm9yZU11dGF0aW9uKCk7XG4gICAgaWYgKHZhbGlkYXRlZFNoZWV0SWQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcbiAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIiksXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRCdXN5LFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpbmtlZExpbmVDb250ZXh0ID0gYXdhaXQgcmVzb2x2ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCgpO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgZGVsZXRlRmlsZVJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0RmlsZShmaWxlSWQsIHtcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmICghZGVsZXRlRmlsZVJlc3BvbnNlLlN1Y2Nlc3MgJiYgIWlzTWlzc2luZ1RpY2tldEZpbGVNZXNzYWdlKGRlbGV0ZUZpbGVSZXNwb25zZS5NZXNzYWdlKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGVsZXRlRmlsZVJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgaWYgKCFpc05vdEZvdW5kRXJyb3IoZXJyb3IpKSB7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXQoZmlsZUlkKTtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGlua2VkTGluZUNvbnRleHQpIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmVEZWxldGVSZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldExpbmUoXHJcbiAgICAgICAgICAgICAgbGlua2VkTGluZUNvbnRleHQuc2hlZXRJZCxcclxuICAgICAgICAgICAgICBsaW5rZWRMaW5lQ29udGV4dC5saW5lUmVjSWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsaW5lRGVsZXRlUmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihsaW5lRGVsZXRlUmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAvLyBUaGUgbGlua2VkIGxpbmUgY2FuIGJlIGF1dG8tcmVtb3ZlZCBieSBiYWNrZW5kIGNhc2NhZGU7IGtlZXAgZmxvdyBzdWNjZXNzZnVsIGluIHRoYXQgY2FzZS5cclxuICAgICAgICAgICAgaWYgKCFpc05vdEZvdW5kRXJyb3IoZXJyb3IpKSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IGRlbGV0ZWRcIikpO1xuICAgICAgICBpZiAodmFsaWRhdGVkU2hlZXRJZCkge1xuICAgICAgICAgIGNsZWFyRXhwZW5zZVRpY2tldFNoZWV0U3luY1N0YXRlKCk7XG4gICAgICAgICAgb25MaW5rZWRTaGVldFN5bmNTdWNjZXNzPy4oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xuICB9LCBbXG4gICAgYnVzeSxcbiAgICBjYW5EZWxldGVUaWNrZXQsXG4gICAgZmlsZUlkLFxuICAgIG9uTGlua2VkU2hlZXRTeW5jU3VjY2VzcyxcbiAgICByZXNvbHZlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0LFxuICAgIHNldEJ1c3ksXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBzZXRTdGF0dXMsXG4gICAgdmFsaWRhdGVMaW5rZWRTaGVldEJlZm9yZU11dGF0aW9uLFxuICBdKTtcblxuICByZXR1cm4ge1xuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQsXG4gICAgaGFuZGxlRGVsZXRlLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbE9wZW46IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGlzTG9ja2VkOiBib29sZWFuO1xyXG4gIGFjdGlvbk1vZGU/OiBcImRlZmF1bHRcIiB8IFwiZGVsZXRlX29ubHlcIiB8IFwidmlld19vbmx5XCI7XHJcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XHJcbiAgY2FuRWRpdFRpY2tldDogYm9vbGVhbjtcclxuICBjYW5EZWxldGVUaWNrZXQ6IGJvb2xlYW47XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGNhbk9wZW5TYXZlQ29uZmlybT86ICgpID0+IGJvb2xlYW47XHJcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBvblNhdmVTdWNjZXNzOiAoKSA9PiB2b2lkO1xyXG4gIG9uRGVsZXRlU3VjY2Vzcz86ICgpID0+IHZvaWQ7XHJcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xyXG4gIH0pID0+IHZvaWQ7XHJcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gc3RhdGUgYW5kIGRpc3BhdGNoIGFjdGlvbnMgZm9yIHRpY2tldCBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbE9wZW4sXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzTG9ja2VkLFxyXG4gIGFjdGlvbk1vZGUgPSBcImRlZmF1bHRcIixcclxuICBwZXJtaXNzaW9uc1JlYWR5ID0gdHJ1ZSxcclxuICBjYW5FZGl0VGlja2V0LFxyXG4gIGNhbkRlbGV0ZVRpY2tldCxcclxuICBmaWxlSWQsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gIGhhbmRsZVVwZGF0ZSxcclxuICBoYW5kbGVEZWxldGUsXHJcbiAgb25TYXZlU3VjY2VzcyxcclxuICBvbkRlbGV0ZVN1Y2Nlc3MsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcclxuICB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMoe1xyXG4gICAgYWN0aW9uR3JvdXBJZDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtYWN0aW9uc1wiLFxyXG4gICAgaWRzOiB7XHJcbiAgICAgIGVkaXRJY29uSWQ6IFwiZXhwZW5zZVRpY2tldEVkaXRJY29uXCIsXHJcbiAgICAgIHNhdmVJY29uSWQ6IFwiZXhwZW5zZVRpY2tldFNhdmVJY29uXCIsXHJcbiAgICAgIGRlbGV0ZUJ0bklkOiBcImV4cGVuc2VUaWNrZXREZWxldGVCdG5cIixcclxuICAgICAgY2FuY2VsQnRuSWQ6IFwiZXhwZW5zZVRpY2tldENhbmNlbEJ0blwiLFxyXG4gICAgfSxcclxuICAgIGV2ZW50czoge1xyXG4gICAgICBlZGl0RXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWVkaXRcIixcclxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWRlbGV0ZVwiLFxyXG4gICAgICBjYW5jZWxFdmVudDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtY2FuY2VsLWVkaXRcIixcclxuICAgIH0sXHJcbiAgICBidXN5LFxyXG4gICAgbW9kYWxPcGVuLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlOiBmYWxzZSxcclxuICAgIGlzTG9ja2VkLFxyXG4gICAgYWN0aW9uTW9kZSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHksXHJcbiAgICBjYW5DcmVhdGU6IGZhbHNlLFxyXG4gICAgY2FuRWRpdDogY2FuRWRpdFRpY2tldCxcclxuICAgIGNhbkRlbGV0ZTogY2FuRGVsZXRlVGlja2V0LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlU2F2ZTogaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgc2F2ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiU2F2ZSBjaGFuZ2VzXCIpLFxyXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXHJcbiAgICBzYXZlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXHJcbiAgICBkZWxldGVDb25maXJtVGl0bGU6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9UaXRsZVwiLCBcIkRlbGV0ZVwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiQ29uZmlybV9EZWxldGVfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/XCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpLFxyXG4gICAgb25TYXZlU3VjY2VzcyxcclxuICAgIG9uRGVsZXRlU3VjY2Vzczogb25EZWxldGVTdWNjZXNzIHx8ICgoKSA9PiBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvVGlja2V0c1wiKSksXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZHVjZXIsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBEaXNwYXRjaCwgU2V0U3RhdGVBY3Rpb24gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHBhcnNlRXhwZW5zZURhdGUsIHNhZmVUZXh0LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcblxyXG50eXBlIERyYWZ0U3RhdGUgPSB7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBnYXN0b1R5cGU6IHN0cmluZztcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICB0cmFuc0RhdGU6IHN0cmluZztcclxuICBjb21lbnRhcmlvOiBzdHJpbmc7XHJcbiAgdXJsRmlsZTogc3RyaW5nO1xyXG4gIGZpbGVOYW1lOiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEVkaXRvclN0YXRlID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIG1vZGFsRXJyb3I6IHN0cmluZztcclxuICBsaW5lUGFnZTogbnVtYmVyO1xyXG4gIGRyYWZ0OiBEcmFmdFN0YXRlO1xyXG59O1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yQXJncyA9IHtcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xyXG4gIGxpbmVDb3VudDogbnVtYmVyO1xyXG4gIHBhZ2VTaXplOiBudW1iZXI7XHJcbiAgY2FuRWRpdFRpY2tldDogYm9vbGVhbjtcclxuICBpc0xvYWRpbmc6IGJvb2xlYW47XHJcbiAgYWxsb3dBc3NpZ25lZERyYWZ0RWRpdDogYm9vbGVhbjtcclxuICBpc0Zyb21TaGVldExpbms6IGJvb2xlYW47XHJcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG50eXBlIEVkaXRvckFjdGlvbiA9XHJcbiAgfCB7IHR5cGU6IFwiaHlkcmF0ZV9mcm9tX2hlYWRlclwiOyBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsIH1cclxuICB8IHtcclxuICAgICAgdHlwZTogXCJwYXRjaF9zdGF0ZVwiO1xyXG4gICAgICBwYXRjaDogUGFydGlhbDxQaWNrPEVkaXRvclN0YXRlLCBcImJ1c3lcIiB8IFwic3RhdHVzXCIgfCBcImlzRWRpdGluZ1wiIHwgXCJtb2RhbEVycm9yXCIgfCBcImxpbmVQYWdlXCI+PjtcclxuICAgIH1cclxuICB8IHsgdHlwZTogXCJzZXRfZHJhZnRfZmllbGRcIjsgZmllbGQ6IGtleW9mIERyYWZ0U3RhdGU7IHZhbHVlOiBzdHJpbmcgfTtcclxuXHJcbmNvbnN0IGNyZWF0ZUVtcHR5RHJhZnQgPSAoKTogRHJhZnRTdGF0ZSA9PiAoe1xyXG4gIGRlc2NyaXB0aW9uOiBcIlwiLFxyXG4gIGdhc3RvVHlwZTogXCJcIixcclxuICBjdXJyZW5jeUNvZGU6IFwiXCIsXHJcbiAgdHJhbnNEYXRlOiBcIlwiLFxyXG4gIGNvbWVudGFyaW86IFwiXCIsXHJcbiAgdXJsRmlsZTogXCJcIixcclxuICBmaWxlTmFtZTogXCJcIixcclxufSk7XHJcblxyXG5jb25zdCB0b0lucHV0RGF0ZSA9IChyYXc/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcclxuICByZXR1cm4gcGFyc2VkID8gdG9Jc29EYXRlKHBhcnNlZCkgOiBcIlwiO1xyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlRHJhZnRGcm9tSGVhZGVyID0gKGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGwpOiBEcmFmdFN0YXRlID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KGhlYWRlcj8uZGVzY3JpcHRpb24pLFxyXG4gICAgZ2FzdG9UeXBlOiBoZWFkZXI/Lmdhc3RvVHlwZSA9PT0gbnVsbCB8fCBoZWFkZXI/Lmdhc3RvVHlwZSA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IFN0cmluZyhoZWFkZXIuZ2FzdG9UeXBlKSxcclxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCksXHJcbiAgICB0cmFuc0RhdGU6IHRvSW5wdXREYXRlKGhlYWRlcj8udHJhbnNEYXRlKSxcclxuICAgIGNvbWVudGFyaW86IHNhZmVUZXh0KGhlYWRlcj8uY29tZW50YXJpbyksXHJcbiAgICB1cmxGaWxlOiBzYWZlVGV4dChoZWFkZXI/LnVybEZpbGUpLFxyXG4gICAgZmlsZU5hbWU6IHNhZmVUZXh0KGhlYWRlcj8uZmlsZU5hbWUpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVJbml0aWFsU3RhdGUgPSAoKTogRWRpdG9yU3RhdGUgPT4gKHtcclxuICBidXN5OiBmYWxzZSxcclxuICBzdGF0dXM6IFwiXCIsXHJcbiAgaXNFZGl0aW5nOiBmYWxzZSxcclxuICBtb2RhbEVycm9yOiBcIlwiLFxyXG4gIGxpbmVQYWdlOiAxLFxyXG4gIGRyYWZ0OiBjcmVhdGVFbXB0eURyYWZ0KCksXHJcbn0pO1xyXG5cclxuY29uc3QgaXNWYWxpZFJlcXVpcmVkR2FzdG9UeXBlID0gKHJhd1ZhbHVlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICBjb25zdCBwYXJzZWRWYWx1ZSA9IE51bWJlci5wYXJzZUludChTdHJpbmcocmF3VmFsdWUgfHwgXCJcIikudHJpbSgpLCAxMCk7XHJcbiAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIocGFyc2VkVmFsdWUpICYmIHBhcnNlZFZhbHVlID4gMDtcclxufTtcclxuXHJcbmNvbnN0IGVkaXRvclJlZHVjZXIgPSAoc3RhdGU6IEVkaXRvclN0YXRlLCBhY3Rpb246IEVkaXRvckFjdGlvbik6IEVkaXRvclN0YXRlID0+IHtcclxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICBjYXNlIFwiaHlkcmF0ZV9mcm9tX2hlYWRlclwiOlxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIGRyYWZ0OiBjcmVhdGVEcmFmdEZyb21IZWFkZXIoYWN0aW9uLmhlYWRlciksXHJcbiAgICAgIH07XHJcbiAgICBjYXNlIFwicGF0Y2hfc3RhdGVcIjpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAuLi5hY3Rpb24ucGF0Y2gsXHJcbiAgICAgIH07XHJcbiAgICBjYXNlIFwic2V0X2RyYWZ0X2ZpZWxkXCI6XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgZHJhZnQ6IHtcclxuICAgICAgICAgIC4uLnN0YXRlLmRyYWZ0LFxyXG4gICAgICAgICAgW2FjdGlvbi5maWVsZF06IGFjdGlvbi52YWx1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVTZXRTdGF0ZVZhbHVlID0gPFQsPih2YWx1ZTogU2V0U3RhdGVBY3Rpb248VD4sIGN1cnJlbnQ6IFQpOiBUID0+IHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgPyAodmFsdWUgYXMgKHByZXZTdGF0ZTogVCkgPT4gVCkoY3VycmVudCkgOiB2YWx1ZTtcclxufTtcclxuXHJcbi8vIE93bnMgcGFnZS1sb2NhbCBlZGl0LCBkcmFmdCwgYW5kIGxpbmUgcGFnaW5nIHN0YXRlIGZvciB0aWNrZXQgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbEVkaXRvciA9ICh7XHJcbiAgaGVhZGVyLFxyXG4gIGxpbmVDb3VudCxcclxuICBwYWdlU2l6ZSxcclxuICBjYW5FZGl0VGlja2V0LFxyXG4gIGlzTG9hZGluZyxcclxuICBhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0LFxyXG4gIGlzRnJvbVNoZWV0TGluayxcclxuICBvbkZvcmJpZGRlbixcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbEVkaXRvckFyZ3MpID0+IHtcclxuICBjb25zdCBbc3RhdGUsIGRpc3BhdGNoXSA9IHVzZVJlZHVjZXIoZWRpdG9yUmVkdWNlciwgdW5kZWZpbmVkLCBjcmVhdGVJbml0aWFsU3RhdGUpO1xyXG4gIGNvbnN0IFtkZXNjcmlwdGlvbkludmFsaWQsIHNldERlc2NyaXB0aW9uSW52YWxpZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2dhc3RvVHlwZUludmFsaWQsIHNldEdhc3RvVHlwZUludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtjdXJyZW5jeUNvZGVJbnZhbGlkLCBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBkZXNjcmlwdGlvbklucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBnYXN0b1R5cGVJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgY3VycmVuY3lJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc3RhdGUuaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBkaXNwYXRjaCh7IHR5cGU6IFwiaHlkcmF0ZV9mcm9tX2hlYWRlclwiLCBoZWFkZXIgfSk7XHJcbiAgfSwgW2hlYWRlciwgc3RhdGUuaXNFZGl0aW5nXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBtYXhQYWdlID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKGxpbmVDb3VudCAvIHBhZ2VTaXplKSk7XHJcbiAgICBpZiAoc3RhdGUubGluZVBhZ2UgPiBtYXhQYWdlKSB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBsaW5lUGFnZTogbWF4UGFnZSB9IH0pO1xyXG4gICAgfVxyXG4gIH0sIFtsaW5lQ291bnQsIHBhZ2VTaXplLCBzdGF0ZS5saW5lUGFnZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHN0YXRlLmlzRWRpdGluZykgcmV0dXJuO1xyXG4gICAgc2V0RGVzY3JpcHRpb25JbnZhbGlkKGZhbHNlKTtcclxuICAgIHNldEdhc3RvVHlwZUludmFsaWQoZmFsc2UpO1xyXG4gICAgc2V0Q3VycmVuY3lDb2RlSW52YWxpZChmYWxzZSk7XHJcbiAgfSwgW3N0YXRlLmlzRWRpdGluZ10pO1xyXG5cclxuICBjb25zdCBzZXRCdXN5ID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwicGF0Y2hfc3RhdGVcIiwgcGF0Y2g6IHsgYnVzeTogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmJ1c3kpIH0gfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLmJ1c3ldXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2V0U3RhdHVzID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBzdGF0dXM6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5zdGF0dXMpIH0gfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLnN0YXR1c11cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRJc0VkaXRpbmcgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxib29sZWFuPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBpc0VkaXRpbmc6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5pc0VkaXRpbmcpIH0gfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLmlzRWRpdGluZ11cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRNb2RhbEVycm9yID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBtb2RhbEVycm9yOiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUubW9kYWxFcnJvcikgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUubW9kYWxFcnJvcl1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRMaW5lUGFnZSA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPG51bWJlcj4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwicGF0Y2hfc3RhdGVcIiwgcGF0Y2g6IHsgbGluZVBhZ2U6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5saW5lUGFnZSkgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUubGluZVBhZ2VdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2V0RHJhZnREZXNjcmlwdGlvbiA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBzZXREZXNjcmlwdGlvbkludmFsaWQoZmFsc2UpO1xyXG4gICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJzZXRfZHJhZnRfZmllbGRcIixcclxuICAgICAgICBmaWVsZDogXCJkZXNjcmlwdGlvblwiLFxyXG4gICAgICAgIHZhbHVlOiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuZHJhZnQuZGVzY3JpcHRpb24pLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuZHJhZnQuZGVzY3JpcHRpb25dXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2V0RHJhZnRHYXN0b1R5cGUgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxzdHJpbmc+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgc2V0R2FzdG9UeXBlSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcInNldF9kcmFmdF9maWVsZFwiLFxyXG4gICAgICAgIGZpZWxkOiBcImdhc3RvVHlwZVwiLFxyXG4gICAgICAgIHZhbHVlOiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuZHJhZnQuZ2FzdG9UeXBlKSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLmRyYWZ0Lmdhc3RvVHlwZV1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXREcmFmdEN1cnJlbmN5Q29kZSA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwic2V0X2RyYWZ0X2ZpZWxkXCIsXHJcbiAgICAgICAgZmllbGQ6IFwiY3VycmVuY3lDb2RlXCIsXHJcbiAgICAgICAgdmFsdWU6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUpLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldERyYWZ0VHJhbnNEYXRlID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcInNldF9kcmFmdF9maWVsZFwiLFxyXG4gICAgICAgIGZpZWxkOiBcInRyYW5zRGF0ZVwiLFxyXG4gICAgICAgIHZhbHVlOiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuZHJhZnQudHJhbnNEYXRlKSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLmRyYWZ0LnRyYW5zRGF0ZV1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFoZWFkZXIgfHwgaXNMb2FkaW5nKSByZXR1cm47XHJcbiAgICBpZiAoaXNGcm9tU2hlZXRMaW5rKSByZXR1cm47XHJcbiAgICBpZiAoaGVhZGVyLnN0YXR1cyA9PT0gMSAmJiAhYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCkgcmV0dXJuO1xyXG4gICAgaWYgKCFjYW5FZGl0VGlja2V0KSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRHYXN0b1R5cGVJbnZhbGlkKGZhbHNlKTtcclxuICAgIHNldEN1cnJlbmN5Q29kZUludmFsaWQoZmFsc2UpO1xyXG4gICAgZGlzcGF0Y2goeyB0eXBlOiBcImh5ZHJhdGVfZnJvbV9oZWFkZXJcIiwgaGVhZGVyIH0pO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBcInBhdGNoX3N0YXRlXCIsXHJcbiAgICAgIHBhdGNoOiB7XHJcbiAgICAgICAgbW9kYWxFcnJvcjogXCJcIixcclxuICAgICAgICBpc0VkaXRpbmc6IHRydWUsXHJcbiAgICAgICAgc3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LCBbYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCwgY2FuRWRpdFRpY2tldCwgaGVhZGVyLCBpc0Zyb21TaGVldExpbmssIGlzTG9hZGluZywgb25Gb3JiaWRkZW5dKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghc3RhdGUuaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBpZiAoIWhlYWRlcikge1xyXG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwicGF0Y2hfc3RhdGVcIiwgcGF0Y2g6IHsgaXNFZGl0aW5nOiBmYWxzZSB9IH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R2FzdG9UeXBlSW52YWxpZChmYWxzZSk7XHJcbiAgICBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkKGZhbHNlKTtcclxuICAgIGRpc3BhdGNoKHsgdHlwZTogXCJoeWRyYXRlX2Zyb21faGVhZGVyXCIsIGhlYWRlciB9KTtcclxuICAgIGRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLFxyXG4gICAgICBwYXRjaDoge1xyXG4gICAgICAgIGlzRWRpdGluZzogZmFsc2UsXHJcbiAgICAgICAgbW9kYWxFcnJvcjogXCJcIixcclxuICAgICAgICBzdGF0dXM6IGluZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSwgW2hlYWRlciwgc3RhdGUuaXNFZGl0aW5nXSk7XHJcblxyXG4gIGNvbnN0IGNhbk9wZW5TYXZlQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWREZXNjcmlwdGlvbiA9IFN0cmluZyhzdGF0ZS5kcmFmdC5kZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XHJcbiAgICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3lDb2RlID0gU3RyaW5nKHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uSXNWYWxpZCA9ICEhbm9ybWFsaXplZERlc2NyaXB0aW9uO1xyXG4gICAgY29uc3QgZ2FzdG9UeXBlSXNWYWxpZCA9IGlzVmFsaWRSZXF1aXJlZEdhc3RvVHlwZShzdGF0ZS5kcmFmdC5nYXN0b1R5cGUpO1xyXG4gICAgY29uc3QgY3VycmVuY3lJc1ZhbGlkID0gISFub3JtYWxpemVkQ3VycmVuY3lDb2RlO1xyXG5cclxuICAgIHNldERlc2NyaXB0aW9uSW52YWxpZCghZGVzY3JpcHRpb25Jc1ZhbGlkKTtcclxuICAgIHNldEdhc3RvVHlwZUludmFsaWQoIWdhc3RvVHlwZUlzVmFsaWQpO1xyXG4gICAgc2V0Q3VycmVuY3lDb2RlSW52YWxpZCghY3VycmVuY3lJc1ZhbGlkKTtcclxuXHJcbiAgICBpZiAoZGVzY3JpcHRpb25Jc1ZhbGlkICYmIGdhc3RvVHlwZUlzVmFsaWQgJiYgY3VycmVuY3lJc1ZhbGlkKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1lc3NhZ2UgPSAhZGVzY3JpcHRpb25Jc1ZhbGlkXHJcbiAgICAgID8gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9EZXNjcmlwdGlvblJlcXVpcmVkXCIsIFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWQuXCIpXHJcbiAgICAgIDogIWdhc3RvVHlwZUlzVmFsaWRcclxuICAgICAgICA/IGluZFQoXCJUaWNrZXRzX1ZhbGlkYXRpb25fQ2F0ZWdvcnlSZXF1aXJlZFwiLCBcIkNhdGVnb3J5IGlzIHJlcXVpcmVkLlwiKVxyXG4gICAgICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9DdXJyZW5jeVJlcXVpcmVkXCIsIFwiQ3VycmVuY3kgaXMgcmVxdWlyZWQuXCIpO1xyXG5cclxuICAgIGRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLFxyXG4gICAgICBwYXRjaDoge1xyXG4gICAgICAgIG1vZGFsRXJyb3I6IG1lc3NhZ2UsXHJcbiAgICAgICAgc3RhdHVzOiBtZXNzYWdlLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgIGlmICghZGVzY3JpcHRpb25Jc1ZhbGlkKSB7XHJcbiAgICAgICAgZGVzY3JpcHRpb25JbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFnYXN0b1R5cGVJc1ZhbGlkKSB7XHJcbiAgICAgICAgZ2FzdG9UeXBlSW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGN1cnJlbmN5SW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LCBbc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlLCBzdGF0ZS5kcmFmdC5nYXN0b1R5cGVdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGJ1c3k6IHN0YXRlLmJ1c3ksXHJcbiAgICBzdGF0dXM6IHN0YXRlLnN0YXR1cyxcclxuICAgIGlzRWRpdGluZzogc3RhdGUuaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxFcnJvcjogc3RhdGUubW9kYWxFcnJvcixcclxuICAgIGxpbmVQYWdlOiBzdGF0ZS5saW5lUGFnZSxcclxuICAgIGRyYWZ0RGVzY3JpcHRpb246IHN0YXRlLmRyYWZ0LmRlc2NyaXB0aW9uLFxyXG4gICAgZGVzY3JpcHRpb25JbnZhbGlkLFxyXG4gICAgZGVzY3JpcHRpb25JbnB1dFJlZixcclxuICAgIGRyYWZ0R2FzdG9UeXBlOiBzdGF0ZS5kcmFmdC5nYXN0b1R5cGUsXHJcbiAgICBnYXN0b1R5cGVJbnZhbGlkLFxyXG4gICAgZ2FzdG9UeXBlSW5wdXRSZWYsXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZTogc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlLFxyXG4gICAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICAgIGN1cnJlbmN5SW5wdXRSZWYsXHJcbiAgICBkcmFmdFRyYW5zRGF0ZTogc3RhdGUuZHJhZnQudHJhbnNEYXRlLFxyXG4gICAgZHJhZnRDb21lbnRhcmlvOiBzdGF0ZS5kcmFmdC5jb21lbnRhcmlvLFxyXG4gICAgZHJhZnRVcmxGaWxlOiBzdGF0ZS5kcmFmdC51cmxGaWxlLFxyXG4gICAgZHJhZnRGaWxlTmFtZTogc3RhdGUuZHJhZnQuZmlsZU5hbWUsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldExpbmVQYWdlLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgIHNldERyYWZ0R2FzdG9UeXBlLFxyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBzZXREcmFmdFRyYW5zRGF0ZSxcclxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHtcclxuICBub3JtYWxpemVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxuICByZXNvbHZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG59IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dC50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxuLy8gUGFyc2VzIHJvdXRlIGNvbnRleHQgb25jZSBhbmQgZXhwb3NlcyBzdGFibGUgZmxhZ3MgZm9yIHRpY2tldCBkZXRhaWwgZmxvd3MuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0ID0gKCkgPT4ge1xyXG4gIGNvbnN0IHJvdXRlUGFyYW1zID0gdXNlTWVtbygoKSA9PiBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpLCBbXSk7XHJcbiAgY29uc3QgZmlsZUlkID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1RJQ0tFVF9GSUxFX0lEX18pLCBbXSk7XG4gIGNvbnN0IGF1dG9FZGl0TW9kZSA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwibW9kZVwiKSkudG9Mb3dlckNhc2UoKSA9PT0gXCJlZGl0XCIsIFtyb3V0ZVBhcmFtc10pO1xuICBjb25zdCByb3V0ZU9yaWdpbiA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwib3JpZ2luXCIpKS50b0xvd2VyQ2FzZSgpLCBbcm91dGVQYXJhbXNdKTtcbiAgY29uc3Qgcm91dGVTaGVldElkID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChyb3V0ZVBhcmFtcy5nZXQoXCJzaGVldElkXCIpKSwgW3JvdXRlUGFyYW1zXSk7XG4gIGNvbnN0IHJvdXRlU2hlZXRMaW5lUmVjSWQgPSB1c2VNZW1vKFxuICAgICgpID0+IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcInNoZWV0TGluZVJlY0lkXCIpIHx8IHJvdXRlUGFyYW1zLmdldChcImxpbmVSZWNJZFwiKSksXG4gICAgW3JvdXRlUGFyYW1zXVxuICApO1xuICBjb25zdCBleHBsaWNpdFJldHVybkNvbnRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+XG4gICAgICBub3JtYWxpemVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCh7XG4gICAgICAgIGZpbGVJZCxcbiAgICAgICAgb3JpZ2luOiByb3V0ZU9yaWdpbixcbiAgICAgICAgc2hlZXRJZDogcm91dGVTaGVldElkLFxuICAgICAgICBzaGVldExpbmVSZWNJZDogcm91dGVTaGVldExpbmVSZWNJZCxcbiAgICAgIH0pLFxuICAgIFtmaWxlSWQsIHJvdXRlT3JpZ2luLCByb3V0ZVNoZWV0SWQsIHJvdXRlU2hlZXRMaW5lUmVjSWRdXG4gICk7XG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFleHBsaWNpdFJldHVybkNvbnRleHQpIHJldHVybjtcclxuICAgIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dChleHBsaWNpdFJldHVybkNvbnRleHQpO1xyXG4gIH0sIFtleHBsaWNpdFJldHVybkNvbnRleHRdKTtcclxuXHJcbiAgcmV0dXJuIHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IHRpY2tldFJldHVybkNvbnRleHQgPSByZXNvbHZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoZmlsZUlkLCBleHBsaWNpdFJldHVybkNvbnRleHQpO1xuICAgIGNvbnN0IGRldGFpbE9yaWdpbiA9IHRpY2tldFJldHVybkNvbnRleHQ/Lm9yaWdpbiB8fCByb3V0ZU9yaWdpbjtcbiAgICBjb25zdCBjb250ZXh0U2hlZXRJZCA9IHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQgfHwgcm91dGVTaGVldElkO1xuICAgIGNvbnN0IGNvbnRleHRMaW5lUmVjSWQgPSB0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldExpbmVSZWNJZCB8fCByb3V0ZVNoZWV0TGluZVJlY0lkO1xuICAgIGNvbnN0IGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSA9IGRldGFpbE9yaWdpbiA9PT0gXCJzaGVldC1jcmVhdGVcIjtcbiAgICBjb25zdCBpc0Zyb21FeHBlbnNlTGluZSA9IGRldGFpbE9yaWdpbiA9PT0gXCJleHBlbnNlLWxpbmVcIiAmJiAhIWNvbnRleHRTaGVldElkICYmICEhY29udGV4dExpbmVSZWNJZDtcbiAgICBjb25zdCBpc0Zyb21TaGVldExpbmsgPSBkZXRhaWxPcmlnaW4gPT09IFwic2hlZXQtbGlua1wiICYmICEhY29udGV4dFNoZWV0SWQ7XG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGF1dG9FZGl0TW9kZSxcclxuICAgICAgZGV0YWlsT3JpZ2luLFxyXG4gICAgICBjb250ZXh0U2hlZXRJZCxcclxuICAgICAgY29udGV4dExpbmVSZWNJZCxcclxuICAgICAgaXNGcm9tRXhwZW5zZVNoZWV0Q3JlYXRlLFxyXG4gICAgICBpc0Zyb21FeHBlbnNlTGluZSxcbiAgICAgIGlzRnJvbVNoZWV0TGluayxcbiAgICAgIHRpY2tldFJldHVybkNvbnRleHQsXG4gICAgfTtcbiAgfSwgW2F1dG9FZGl0TW9kZSwgZXhwbGljaXRSZXR1cm5Db250ZXh0LCBmaWxlSWQsIHJvdXRlT3JpZ2luLCByb3V0ZVNoZWV0SWQsIHJvdXRlU2hlZXRMaW5lUmVjSWRdKTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgfSBmcm9tIFwiLi4vLi4vZXhwZW5zZUZvcm1hdHRlcnMudHNcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50cy9leHBlbnNlVGlja2V0U3RhdHVzQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXlBcmdzID0ge1xyXG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw7XHJcbiAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcclxuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgZHJhZnRGaWxlTmFtZTogc3RyaW5nO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBnYXN0b1R5cGVMYWJlbE1hcDogTWFwPHN0cmluZywgc3RyaW5nPjtcclxufTtcclxuXHJcbi8vIENlbnRyYWxpemVzIGRpc3BsYXktb25seSB2YWx1ZXMgc28gdGhlIHBhZ2UgY29udGFpbmVyIHN0YXlzIGZvY3VzZWQgb24gZmxvdyB3aXJpbmcuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsRGlzcGxheSA9ICh7XHJcbiAgaGVhZGVyLFxyXG4gIGRyYWZ0R2FzdG9UeXBlLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0VHJhbnNEYXRlLFxyXG4gIGRyYWZ0RmlsZU5hbWUsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGdhc3RvVHlwZUxhYmVsTWFwLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsRGlzcGxheUFyZ3MpID0+IHtcclxuICBjb25zdCBwYWdpbmF0aW9uTGFiZWxzID0gdXNlTWVtbyhcclxuICAgICgpID0+ICh7XHJcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXHJcbiAgICAgIHByZXY6IGluZFQoXCJIaXN0b3J5X1BhZ2VfUHJldlwiLCBcIlByZXZpb3VzXCIpLFxyXG4gICAgICBuZXh0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpLFxyXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxyXG4gICAgfSksXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHByZXZpZXdBbHRUZXh0ID0gdXNlTWVtbyhcclxuICAgICgpID0+IHNhZmVUZXh0KGlzRWRpdGluZyA/IGRyYWZ0RmlsZU5hbWUgOiBoZWFkZXI/LmZpbGVOYW1lKSB8fCBpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIiksXHJcbiAgICBbZHJhZnRGaWxlTmFtZSwgaGVhZGVyPy5maWxlTmFtZSwgaXNFZGl0aW5nXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHN0YXR1c0xhYmVsID0gdXNlTWVtbygoKSA9PiBnZXRFeHBlbnNlVGlja2V0U3RhdHVzTGFiZWwoaGVhZGVyPy5zdGF0dXMpLCBbaGVhZGVyPy5zdGF0dXNdKTtcclxuXHJcbiAgY29uc3QgZ2FzdG9UeXBlTGFiZWwgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IGN1cnJlbnRHYXN0b1R5cGUgPSBpc0VkaXRpbmcgPyBkcmFmdEdhc3RvVHlwZSA6IGhlYWRlcj8uZ2FzdG9UeXBlID09PSBudWxsID8gXCJcIiA6IFN0cmluZyhoZWFkZXI/Lmdhc3RvVHlwZSA/PyBcIlwiKTtcclxuICAgIGlmICghY3VycmVudEdhc3RvVHlwZSkge1xyXG4gICAgICByZXR1cm4gaW5kVChcIkNvbW1vbl9Ob3RBdmFpbGFibGVcIiwgXCJOL0FcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2FzdG9UeXBlTGFiZWxNYXAuZ2V0KFN0cmluZyhjdXJyZW50R2FzdG9UeXBlKSkgfHwgU3RyaW5nKGN1cnJlbnRHYXN0b1R5cGUpO1xyXG4gIH0sIFtkcmFmdEdhc3RvVHlwZSwgZ2FzdG9UeXBlTGFiZWxNYXAsIGhlYWRlcj8uZ2FzdG9UeXBlLCBpc0VkaXRpbmddKTtcclxuXHJcbiAgY29uc3QgdG90YWxBbW91bnRUZXh0ID0gdXNlTWVtbyhcclxuICAgICgpID0+IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShoZWFkZXI/LnRvdGFsQW1vdW50ID8/IG51bGwsIChpc0VkaXRpbmcgPyBkcmFmdEN1cnJlbmN5Q29kZSA6IGhlYWRlcj8uY3VycmVuY3lDb2RlKSB8fCBoZWFkZXI/LmN1cnJlbmN5Q29kZSksXHJcbiAgICBbZHJhZnRDdXJyZW5jeUNvZGUsIGhlYWRlcj8uY3VycmVuY3lDb2RlLCBoZWFkZXI/LnRvdGFsQW1vdW50LCBpc0VkaXRpbmddXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgdHJhbnNEYXRlVGV4dCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoaXNFZGl0aW5nID8gZHJhZnRUcmFuc0RhdGUgOiBoZWFkZXI/LnRyYW5zRGF0ZSwgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCIpLFxyXG4gICAgW2RyYWZ0VHJhbnNEYXRlLCBoZWFkZXI/LnRyYW5zRGF0ZSwgaXNFZGl0aW5nXVxyXG4gICk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gICAgcHJldmlld0FsdFRleHQsXHJcbiAgICBzdGF0dXNMYWJlbCxcclxuICAgIGdhc3RvVHlwZUxhYmVsLFxyXG4gICAgdG90YWxBbW91bnRUZXh0LFxyXG4gICAgdHJhbnNEYXRlVGV4dCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsQ29uZmlybVN0YXRlQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsRXJyb3I6IHN0cmluZztcclxuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRTdGF0dXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gRW5jYXBzdWxhdGVzIGNvbmZpcm0gbW9kYWwgc3RhdGUgc28gdGhlIHBhZ2UgY29udGFpbmVyIHN0YXlzIGZvY3VzZWQgb24gZmxvdyB3aXJpbmcuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQ29uZmlybVN0YXRlID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsRXJyb3IsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBzZXRTdGF0dXMsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGVBcmdzKSA9PiB7XHJcbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XHJcbiAgICBkZWZhdWx0Q29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpLFxyXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XHJcbiAgICAgICAgc2V0U3RhdHVzKG1zZyk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LCBbYnVzeSwgaGFuZGxlQ29uZmlybSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzXSk7XHJcblxyXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XHJcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcclxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxyXG4gICAgOiAhYnVzeSAmJiBtb2RhbEVycm9yXHJcbiAgICAgID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpXHJcbiAgICAgIDogbW9kYWwuY29uZmlybVRleHQgfHwgaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIik7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghYnVzeSAmJiBtb2RhbEVycm9yKSB7XHJcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2b2lkIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xyXG4gIH0sIFtidXN5LCBjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbW9kYWxFcnJvcl0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbW9kYWwsXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICAgIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgICBtb2RhbENhbmNlbFRleHQsXHJcbiAgICBtb2RhbENvbmZpcm1UZXh0LFxyXG4gICAgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGFwcGVuZEV4cGVuc2VUaWNrZXRSZXR1cm5RdWVyeSxcclxuICBidWlsZEV4cGVuc2VTaGVldERldGFpbFVybCxcclxuICB0eXBlIEV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG59IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dC50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsSW50ZXJhY3Rpb25zQXJncyA9IHtcbiAgYnVzeTogYm9vbGVhbjtcbiAgZmlsZUlkOiBzdHJpbmc7XG4gIGNvbnRleHRTaGVldElkOiBzdHJpbmc7XG4gIGlzRnJvbVNoZWV0TGluazogYm9vbGVhbjtcbiAgaGVhZGVyRXhwZW5zZVNoZWV0SWQ6IHN0cmluZztcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBjYW5PcGVuU2F2ZUNvbmZpcm06ICgpID0+IGJvb2xlYW47XG4gIGhhbmRsZVBlcnNpc3RIZWFkZXJEcmFmdDogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcbiAgYnlwYXNzV29ya2Zsb3dHdWFyZDogYm9vbGVhbjtcbiAgbGluZUNvbnRhaW5lclJlZjogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG4gIG9wZW5QcmV2aWV3OiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xuICB0aWNrZXRSZXR1cm5Db250ZXh0PzogRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQgfCBudWxsO1xufTtcblxyXG4vLyBHcm91cHMgdGlja2V0IGRldGFpbCBuYXZpZ2F0aW9uIGFuZCBsaW5lLWNhcmQgaW50ZXJhY3Rpb25zIGJlaGluZCBzdGFibGUgY2FsbGJhY2tzLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9ucyA9ICh7XG4gIGJ1c3ksXG4gIGZpbGVJZCxcbiAgY29udGV4dFNoZWV0SWQsXG4gIGlzRnJvbVNoZWV0TGluayxcbiAgaGVhZGVyRXhwZW5zZVNoZWV0SWQsXG4gIGlzRWRpdGluZyxcbiAgY2FuT3BlblNhdmVDb25maXJtLFxuICBoYW5kbGVQZXJzaXN0SGVhZGVyRHJhZnQsXG4gIGJ5cGFzc1dvcmtmbG93R3VhcmQsXG4gIGxpbmVDb250YWluZXJSZWYsXG4gIG9wZW5QcmV2aWV3LFxuICB0aWNrZXRSZXR1cm5Db250ZXh0LFxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9uc0FyZ3MpID0+IHtcbiAgY29uc3Qgb3BlbkxpbmVEZXRhaWwgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAocmF3TGluZVJlY0lkOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChpc0Zyb21TaGVldExpbmspIHJldHVybjtcbiAgICAgIGlmIChidXN5KSByZXR1cm47XG4gICAgICBjb25zdCBsaW5lUmVjSWQgPSBzYWZlVGV4dChyYXdMaW5lUmVjSWQpO1xuICAgICAgaWYgKCFsaW5lUmVjSWQgfHwgIWZpbGVJZCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBzaG91bGRPcGVuSW5FZGl0TW9kZSA9IGlzRWRpdGluZztcbiAgICAgIGlmIChzaG91bGRPcGVuSW5FZGl0TW9kZSkge1xyXG4gICAgICAgIGlmICghY2FuT3BlblNhdmVDb25maXJtKCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1cGRhdGVPayA9IGF3YWl0IGhhbmRsZVBlcnNpc3RIZWFkZXJEcmFmdCgpO1xuICAgICAgICBpZiAoIXVwZGF0ZU9rKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cclxuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgbGluZVJlY0lkLFxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKHNob3VsZE9wZW5JbkVkaXRNb2RlKSB7XHJcbiAgICAgICAgcXVlcnkuc2V0KFwibW9kZVwiLCBcImVkaXRcIik7XHJcbiAgICAgIH1cclxuICAgICAgYXBwZW5kRXhwZW5zZVRpY2tldFJldHVyblF1ZXJ5KHF1ZXJ5LCB0aWNrZXRSZXR1cm5Db250ZXh0KTtcclxuXHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldExpbmVEZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiBzaG91bGRPcGVuSW5FZGl0TW9kZSB8fCBieXBhc3NXb3JrZmxvd0d1YXJkLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbXG4gICAgICBidXN5LFxuICAgICAgYnlwYXNzV29ya2Zsb3dHdWFyZCxcbiAgICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcbiAgICAgIGZpbGVJZCxcbiAgICAgIGhhbmRsZVBlcnNpc3RIZWFkZXJEcmFmdCxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIGlzRnJvbVNoZWV0TGluayxcbiAgICAgIHRpY2tldFJldHVybkNvbnRleHQsXG4gICAgXVxuICApO1xuXHJcbiAgY29uc3QgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgPSB1c2VDYWxsYmFjayhcclxuICAgICh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xyXG4gICAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICAgICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XHJcbiAgICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcclxuICAgICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcclxuICAgICAgaWYgKCFsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcclxuICAgICAgcmV0dXJuIGNhcmQ7XHJcbiAgICB9LFxyXG4gICAgW2xpbmVDb250YWluZXJSZWZdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb3BlbkZpbGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICB2b2lkIG9wZW5QcmV2aWV3KCk7XHJcbiAgfSwgW29wZW5QcmV2aWV3XSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoaXNGcm9tU2hlZXRMaW5rKSByZXR1cm47XHJcbiAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQgfHwgaGVhZGVyRXhwZW5zZVNoZWV0SWQgfHwgY29udGV4dFNoZWV0SWQpO1xyXG4gICAgaWYgKCFzYWZlU2hlZXRJZCkgcmV0dXJuO1xyXG5cclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsKHNhZmVTaGVldElkKSwge1xyXG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcclxuICAgIH0pO1xyXG4gIH0sIFtjb250ZXh0U2hlZXRJZCwgaGVhZGVyRXhwZW5zZVNoZWV0SWQsIGlzRWRpdGluZywgaXNGcm9tU2hlZXRMaW5rLCB0aWNrZXRSZXR1cm5Db250ZXh0XSk7XHJcblxyXG4gIHJldHVybiB7XG4gICAgb3BlbkxpbmVEZXRhaWwsXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXG4gICAgb3BlbkZpbGUsXHJcbiAgICBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0LFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfSBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGhhc0V4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdTb3VyY2UgfSBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvZXhwZW5zZVRpY2tldFByZXZpZXdVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XHJcblxyXG5jb25zdCBoYXNSZWFsRXhwZW5zZVNoZWV0VmFsdWUgPSAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBzYWZlVGV4dCh2YWx1ZSkudG9Mb3dlckNhc2UoKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBmYWxzZTtcclxuICBpZiAobm9ybWFsaXplZCA9PT0gXCItXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIwXCIpIHJldHVybiBmYWxzZTtcclxuICBpZiAobm9ybWFsaXplZCA9PT0gXCJuL2FcIiB8fCBub3JtYWxpemVkID09PSBcIm5hXCIpIHJldHVybiBmYWxzZTtcclxuICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm1Qcm9wcyA9IHtcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXI7XHJcbiAgc3RhdHVzTGFiZWw6IHN0cmluZztcclxuICBnYXN0b1R5cGVMYWJlbDogc3RyaW5nO1xyXG4gIHRvdGFsQW1vdW50VGV4dDogc3RyaW5nO1xyXG4gIHRyYW5zRGF0ZVRleHQ6IHN0cmluZztcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgZ2FzdG9UeXBlT3B0aW9uczogQXJyYXk8eyB2YWx1ZTogc3RyaW5nOyB0ZXh0OiBzdHJpbmcgfT47XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uSW52YWxpZDogYm9vbGVhbjtcclxuICBkZXNjcmlwdGlvbklucHV0UmVmOiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcclxuICBnYXN0b1R5cGVJbnZhbGlkOiBib29sZWFuO1xyXG4gIGdhc3RvVHlwZUlucHV0UmVmOiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBjdXJyZW5jeUNvZGVJbnZhbGlkOiBib29sZWFuO1xyXG4gIGN1cnJlbmN5SW5wdXRSZWY6IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIGRyYWZ0VXJsRmlsZTogc3RyaW5nO1xyXG4gIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcclxuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRHYXN0b1R5cGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uT3BlbkZpbGU6ICgpID0+IHZvaWQ7XHJcbiAgb25PcGVuRXhwZW5zZVNoZWV0PzogKCkgPT4gdm9pZDtcclxuICBoaWRlT3BlbkZpbGVBY3Rpb24/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gUmVhZC1vbmx5IGFuZCBlZGl0YWJsZSBoZWFkZXIgZm9ybSBmb3IgdGlja2V0IGRldGFpbC5cclxuY29uc3QgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm0gPSAoe1xyXG4gIGhlYWRlcixcclxuICBzdGF0dXNMYWJlbCxcclxuICBnYXN0b1R5cGVMYWJlbCxcclxuICB0b3RhbEFtb3VudFRleHQsXHJcbiAgdHJhbnNEYXRlVGV4dCxcclxuICBpc0VkaXRpbmcsXHJcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICBkZXNjcmlwdGlvbklucHV0UmVmLFxyXG4gIGRyYWZ0R2FzdG9UeXBlLFxyXG4gIGdhc3RvVHlwZUludmFsaWQsXHJcbiAgZ2FzdG9UeXBlSW5wdXRSZWYsXHJcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICBjdXJyZW5jeUlucHV0UmVmLFxyXG4gIGRyYWZ0VHJhbnNEYXRlLFxyXG4gIGRyYWZ0VXJsRmlsZSxcclxuICBkcmFmdEZpbGVOYW1lLFxyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZSxcclxuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlLFxyXG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2UsXHJcbiAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZSxcclxuICBvbk9wZW5GaWxlLFxyXG4gIG9uT3BlbkV4cGVuc2VTaGVldCxcclxuICBoaWRlT3BlbkZpbGVBY3Rpb24gPSBmYWxzZSxcclxufTogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm1Qcm9wcykgPT4ge1xyXG4gIGNvbnN0IHByZXZpZXdVcmwgPSBzYWZlVGV4dChpc0VkaXRpbmcgPyBkcmFmdFVybEZpbGUgOiBoZWFkZXIudXJsRmlsZSk7XHJcbiAgY29uc3QgY2FuT3BlbkZpbGUgPSBoYXNFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3U291cmNlKHByZXZpZXdVcmwpO1xyXG4gIGNvbnN0IHNob3dFeHBlbnNlU2hlZXRGaWVsZCA9IGhhc1JlYWxFeHBlbnNlU2hlZXRWYWx1ZShoZWFkZXIuaG9qYUdhc3Rvc0lkRGlzcGxheSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cclxuICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIil9XHJcbiAgICAgICAgICB2YWx1ZT17aGVhZGVyLmZpbGVJZCB8fCBcIi1cIn1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XHJcbiAgICAgICAgICB2YWx1ZT17c3RhdHVzTGFiZWwgfHwgXCItXCJ9XHJcbiAgICAgICAgLz5cclxuXHJcbiAgICAgICAge2lzRWRpdGluZyA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgcmVmPXtkZXNjcmlwdGlvbklucHV0UmVmfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCR7ZGVzY3JpcHRpb25JbnZhbGlkID8gXCIgYm9yZGVyLXJvc2UtNDAwIGJnLXJvc2UtNTAgZm9jdXM6Ym9yZGVyLXJvc2UtNDAwIGZvY3VzOnJpbmctcm9zZS0yMDBcIiA6IFwiXCJ9YH1cclxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnREZXNjcmlwdGlvbn1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxyXG4gICAgICAgICAgICAgIGFyaWEtaW52YWxpZD17ZGVzY3JpcHRpb25JbnZhbGlkID8gXCJ0cnVlXCIgOiBcImZhbHNlXCJ9XHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtoZWFkZXIuZGVzY3JpcHRpb24gfHwgXCItXCJ9XHJcbiAgICAgICAgICAgIGZ1bGxXaWR0aFxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApfVxyXG5cclxuICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cclxuICAgICAgICAgICAgb3B0aW9ucz17Z2FzdG9UeXBlT3B0aW9uc31cclxuICAgICAgICAgICAgdmFsdWU9e2RyYWZ0R2FzdG9UeXBlfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEdhc3RvVHlwZUNoYW5nZX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxyXG4gICAgICAgICAgICBpbnB1dFJlZj17Z2FzdG9UeXBlSW5wdXRSZWZ9XHJcbiAgICAgICAgICAgIGludmFsaWQ9e2dhc3RvVHlwZUludmFsaWR9XHJcbiAgICAgICAgICAgIHVzZVBvcnRhbFxyXG4gICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XHJcbiAgICAgICAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2dhc3RvVHlwZUxhYmVsIHx8IFwiLVwifVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApfVxyXG5cclxuICAgICAgICB7c2hvd0V4cGVuc2VTaGVldEZpZWxkID8gKFxyXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9FeHBlbnNlU2hlZXREaXNwbGF5XCIsIFwiRXhwZW5zZSBzaGVldFwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2hlYWRlci5ob2phR2FzdG9zSWREaXNwbGF5IHx8IFwiLVwifVxyXG4gICAgICAgICAgICBvbkNsaWNrPXtvbk9wZW5FeHBlbnNlU2hlZXR9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgPEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtkcmFmdEN1cnJlbmN5Q29kZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XHJcbiAgICAgICAgICAgIGludmFsaWQ9e2N1cnJlbmN5Q29kZUludmFsaWR9XHJcbiAgICAgICAgICAgIGlucHV0UmVmPXtjdXJyZW5jeUlucHV0UmVmfVxyXG4gICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLXRpY2tldC1kZXRhaWwtY3VycmVuY3lcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17aGVhZGVyLmN1cnJlbmN5Q29kZSB8fCBcIi1cIn1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKX1cclxuXHJcbiAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVG90YWxBbW91bnRcIiwgXCJUb3RhbCBhbW91bnRcIil9XHJcbiAgICAgICAgICB2YWx1ZT17dG90YWxBbW91bnRUZXh0IHx8IFwiLVwifVxyXG4gICAgICAgIC8+XHJcblxyXG4gICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpc2l0YS1maWVsZC10ZXh0XCI+XHJcbiAgICAgICAgICAgIDxTaW5nbGVEYXRlUGlja2VyXHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0NyZWF0ZWREYXRlXCIsIFwiRGF0ZVwiKX1cclxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRUcmFuc0RhdGV9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRUcmFuc0RhdGVDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmd9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmd9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3JlYXRlZERhdGVcIiwgXCJEYXRlXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXt0cmFuc0RhdGVUZXh0IHx8IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShoZWFkZXIudHJhbnNEYXRlLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIikgfHwgXCItXCJ9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtjYW5PcGVuRmlsZSAmJiAhaGlkZU9wZW5GaWxlQWN0aW9uID8gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWVuZFwiPlxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiXHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uT3BlbkZpbGV9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtpbmRUKFwiVGlja2V0c19EZXRhaWxfVmlld0F0dGFjaG1lbnRcIiwgXCJWZXIgYWRqdW50b1wiKX1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBDb21wYWN0UGFnaW5hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlRGF0ZVBhcnRzIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlTnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VTZWN0aW9uRGl2aWRlciBmcm9tIFwiLi9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGltZWxpbmVDYXJkIGZyb20gXCIuL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4XCI7XHJcblxyXG50eXBlIFBhZ2luYXRpb25MYWJlbHMgPSB7XHJcbiAgZmlyc3Q6IHN0cmluZztcclxuICBwcmV2OiBzdHJpbmc7XHJcbiAgbmV4dDogc3RyaW5nO1xyXG4gIGxhc3Q6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldExpbmVzTGlzdFByb3BzID0ge1xyXG4gIHZpc2libGVMaW5lczogRXhwZW5zZVRpY2tldERldGFpbExpbmVbXTtcclxuICB0b3RhbExpbmVQYWdlczogbnVtYmVyO1xyXG4gIGxpbmVQYWdlOiBudW1iZXI7XHJcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgcGFnaW5hdGlvbkxhYmVsczogUGFnaW5hdGlvbkxhYmVscztcclxuICBjb250YWluZXJSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIG9uTGluZVBhZ2VDaGFuZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XHJcbiAgb25PcGVuTGluZTogKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0UXR5VmFsdWUgPSAodmFsdWU6IG51bWJlciB8IG51bGwpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBmb3JtYXRFeHBlbnNlTnVtYmVyKHZhbHVlLCB7XHJcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgIGZhbGxiYWNrOiBcIi1cIixcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IEVNUFRZX0RBVEVfUEFSVFM6IEV4cGVuc2VEYXRlUGFydHMgPSB7XHJcbiAgeWVhcjogXCItLVwiLFxyXG4gIG1vbnRoOiBcIi0tXCIsXHJcbiAgZGF5OiBcIi0tXCIsXHJcbn07XHJcblxyXG5jb25zdCBUSUNLRVRfTElORV9EQVRFX1BBTkVMX0lDT04gPSAoXHJcbiAgPHN2Z1xyXG4gICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgIGZpbGw9XCJub25lXCJcclxuICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICBzdHJva2VXaWR0aD1cIjFcIlxyXG4gICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcclxuICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgY2xhc3NOYW1lPVwiaC0xMCB3LTEwIHRleHQtc2xhdGUtNTAwXCJcclxuICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgPlxyXG4gICAgPHBhdGggc3Ryb2tlPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIiAvPlxyXG4gICAgPHBhdGggZD1cIk0xNCAzdjRhMSAxIDAgMCAwIDEgMWg0XCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMTcgMjFoLTEwYTIgMiAwIDAgMSAtMiAtMnYtMTRhMiAyIDAgMCAxIDIgLTJoN2w1IDV2MTFhMiAyIDAgMCAxIC0yIDJcIiAvPlxyXG4gICAgPHBhdGggZD1cIk05IDdsMSAwXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNOSAxM2w2IDBcIiAvPlxyXG4gICAgPHBhdGggZD1cIk0xMyAxN2wyIDBcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuLy8gVGlja2V0IGxpbmVzIHNlY3Rpb24gcmVuZGVyZWQgd2l0aCB0aW1lbGluZSBjYXJkcyBhbmQgcGFnaW5nIGNvbnRyb2xzLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0TGluZXNMaXN0ID0gKHtcclxuICB2aXNpYmxlTGluZXMsXHJcbiAgdG90YWxMaW5lUGFnZXMsXHJcbiAgbGluZVBhZ2UsXHJcbiAgY3VycmVuY3lDb2RlLFxyXG4gIHBhZ2luYXRpb25MYWJlbHMsXHJcbiAgY29udGFpbmVyUmVmLFxyXG4gIG9uTGluZVBhZ2VDaGFuZ2UsXHJcbiAgb25PcGVuTGluZSxcclxufTogRXhwZW5zZVRpY2tldExpbmVzTGlzdFByb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNwYWNlLXktMFwiPlxyXG4gICAgICA8RXhwZW5zZVNlY3Rpb25EaXZpZGVyIGxhYmVsPXtpbmRUKFwiVGlja2V0c19EZXRhaWxfTGluZXNcIiwgXCJMaW5lc1wiKX0gY2xhc3NOYW1lPVwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXItLXNwYWNlZFwiIC8+XHJcblxyXG4gICAgICB7dmlzaWJsZUxpbmVzLmxlbmd0aCA9PT0gMCA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveCB0aW1lbGluZS1lbXB0eVwiIGRhdGEtZW1wdHktdGV4dD17aW5kVChcIlRpY2tldHNfRGV0YWlsX05vTGluZXNcIiwgXCJObyBsaW5lcyBmb3IgdGhpcyB0aWNrZXQuXCIpfSAvPlxyXG4gICAgICApIDogKFxyXG4gICAgICAgIDxkaXYgcmVmPXtjb250YWluZXJSZWZ9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveFwiPlxyXG4gICAgICAgICAge3Zpc2libGVMaW5lcy5tYXAoKGxpbmUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYW1vdW50VGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShsaW5lLnRvdGFsQW1vdW50LCBjdXJyZW5jeUNvZGUpO1xyXG4gICAgICAgICAgICBjb25zdCBxdHlUZXh0ID0gZm9ybWF0UXR5VmFsdWUobGluZS5xdHkpO1xyXG4gICAgICAgICAgICBjb25zdCBwcmljZVRleHQgPSBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kobGluZS5wcmljZSwgY3VycmVuY3lDb2RlKTtcclxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBsaW5lLmRlc2NyaXB0aW9uIHx8IGxpbmUucmVjSWQgfHwgXCItXCI7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YnRpdGxlID0gYCR7aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUXR5XCIsIFwiUXVhbnRpdHlcIil9OiAke3F0eVRleHR9ICAgJHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9QcmljZVwiLCBcIlByaWNlXCIpfTogJHtwcmljZVRleHR9YDtcclxuICAgICAgICAgICAgY29uc3QgbGluZUtleSA9XHJcbiAgICAgICAgICAgICAgU3RyaW5nKGxpbmUucmVjSWQgfHwgXCJcIikudHJpbSgpIHx8XHJcbiAgICAgICAgICAgICAgW2xpbmUuZGVzY3JpcHRpb24sIGxpbmUudG90YWxBbW91bnQsIGxpbmUucHJpY2UsIGxpbmUucXR5XS5tYXAoKHZhbHVlKSA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpKS5qb2luKFwifFwiKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2xpbmVLZXl9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgIDxFeHBlbnNlVGltZWxpbmVDYXJkXHJcbiAgICAgICAgICAgICAgICAgIGRhdGVQYXJ0cz17RU1QVFlfREFURV9QQVJUU31cclxuICAgICAgICAgICAgICAgICAgZGF0ZVBhbmVsQ29udGVudD17VElDS0VUX0xJTkVfREFURV9QQU5FTF9JQ09OfVxyXG4gICAgICAgICAgICAgICAgICB0aXRsZT17dGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgIHN1YnRpdGxlPXtzdWJ0aXRsZX1cclxuICAgICAgICAgICAgICAgICAgc3VidGl0bGVDbGFzc05hbWU9XCJleHBlbnNlLXNoZWV0LWNhcmRfX3N1YnRpdGxlIGV4cGVuc2UtbGluZS1jYXJkX19tZXRhIHRleHQtbGVmdFwiXHJcbiAgICAgICAgICAgICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XHJcbiAgICAgICAgICAgICAgICAgIG9uT3Blbj17KCkgPT4gb25PcGVuTGluZShsaW5lLnJlY0lkKX1cclxuICAgICAgICAgICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJ0aW1lbGluZS1uYW1lIGV4cGVuc2UtbGluZS1jYXJkX190aXRsZSB0ZXh0LWxlZnRcIlxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG5cclxuICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXHJcbiAgICAgICAgdG90YWxQYWdlcz17dG90YWxMaW5lUGFnZXN9XHJcbiAgICAgICAgY3VycmVudFBhZ2U9e2xpbmVQYWdlfVxyXG4gICAgICAgIG9uUGFnZUNoYW5nZT17b25MaW5lUGFnZUNoYW5nZX1cclxuICAgICAgICBsYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XHJcbiAgICAgIC8+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRMaW5lc0xpc3Q7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgUmVmT2JqZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm0udHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0TGluZXNMaXN0IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5lc0xpc3QudHN4XCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciwgRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWwgZnJvbSBcIi4vRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3IGZyb20gXCIuL0V4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3LnRzeFwiO1xyXG5pbXBvcnQgdHlwZSB7IFRpY2tldFByZXZpZXdQb2ludCB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcudHNcIjtcclxuXHJcbnR5cGUgUGFnaW5hdGlvbkxhYmVscyA9IHtcclxuICBmaXJzdDogc3RyaW5nO1xyXG4gIHByZXY6IHN0cmluZztcclxuICBuZXh0OiBzdHJpbmc7XHJcbiAgbGFzdDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsVmlld1Byb3BzID0ge1xyXG4gIG1vZGFsOiB7XHJcbiAgICBvcGVuOiBib29sZWFuO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0OiBzdHJpbmc7XHJcbiAgICBjYW5jZWxUZXh0OiBzdHJpbmc7XHJcbiAgICBsb2FkaW5nVGV4dDogc3RyaW5nO1xyXG4gICAgc2hvd0NhbmNlbDogYm9vbGVhbjtcclxuICAgIHNob3dDb25maXJtOiBib29sZWFuO1xyXG4gICAgYnVzeTogYm9vbGVhbjtcclxuICAgIGVycm9yOiBzdHJpbmc7XHJcbiAgICBzdGF0dXM6IHN0cmluZztcclxuICAgIG9uQ29uZmlybTogKCkgPT4gdm9pZDtcclxuICAgIG9uQ2FuY2VsOiAoKSA9PiB2b2lkO1xyXG4gIH07XHJcbiAgcHJldmlldzoge1xyXG4gICAgb3BlbjogYm9vbGVhbjtcclxuICAgIGJ1c3k6IGJvb2xlYW47XHJcbiAgICBlcnJvcjogc3RyaW5nO1xyXG4gICAgaW1hZ2VVcmw6IHN0cmluZztcclxuICAgIGltYWdlQWx0OiBzdHJpbmc7XHJcbiAgICBzY2FsZTogbnVtYmVyO1xyXG4gICAgdHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQ7XHJcbiAgICBzdXJmYWNlUmVmOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICAgIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XHJcbiAgICBvblBvaW50ZXJEb3duOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgICBvblBvaW50ZXJNb3ZlOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgICBvblBvaW50ZXJFbmQ6IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICAgIG9uV2hlZWw6IChldmVudDogUmVhY3QuV2hlZWxFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgfTtcclxuICBjb250ZW50OiB7XHJcbiAgICBpc0xvYWRpbmc6IGJvb2xlYW47XHJcbiAgICBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICAgIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw7XHJcbiAgICBzaG93U3RpY2t5UHJldmlldzogYm9vbGVhbjtcclxuICAgIHByZXZpZXdCdXN5OiBib29sZWFuO1xyXG4gICAgcHJldmlld0Vycm9yOiBzdHJpbmc7XHJcbiAgICBwcmV2aWV3SW1hZ2VVcmw6IHN0cmluZztcclxuICAgIHByZXZpZXdGaWxlTmFtZTogc3RyaW5nO1xyXG4gICAgcHJldmlld0FsdFRleHQ6IHN0cmluZztcclxuICAgIG9uT3BlblByZXZpZXc6ICgpID0+IHZvaWQ7XHJcbiAgICBzdGF0dXNMYWJlbDogc3RyaW5nO1xyXG4gICAgZ2FzdG9UeXBlTGFiZWw6IHN0cmluZztcclxuICAgIHRvdGFsQW1vdW50VGV4dDogc3RyaW5nO1xyXG4gICAgdHJhbnNEYXRlVGV4dDogc3RyaW5nO1xyXG4gICAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gICAgZ2FzdG9UeXBlT3B0aW9uczogQXJyYXk8eyB2YWx1ZTogc3RyaW5nOyB0ZXh0OiBzdHJpbmcgfT47XHJcbiAgICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICBkZXNjcmlwdGlvbkludmFsaWQ6IGJvb2xlYW47XHJcbiAgICBkZXNjcmlwdGlvbklucHV0UmVmOiBSZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gICAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcclxuICAgIGdhc3RvVHlwZUludmFsaWQ6IGJvb2xlYW47XHJcbiAgICBnYXN0b1R5cGVJbnB1dFJlZjogUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgICBjdXJyZW5jeUNvZGVJbnZhbGlkOiBib29sZWFuO1xyXG4gICAgY3VycmVuY3lJbnB1dFJlZjogUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICAgIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgICBkcmFmdFVybEZpbGU6IHN0cmluZztcclxuICAgIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcclxuICAgIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICAgIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICBvbk9wZW5GaWxlOiAoKSA9PiB2b2lkO1xyXG4gICAgb25PcGVuRXhwZW5zZVNoZWV0PzogKCkgPT4gdm9pZDtcclxuICAgIHZpc2libGVMaW5lczogRXhwZW5zZVRpY2tldERldGFpbExpbmVbXTtcclxuICAgIHRvdGFsTGluZVBhZ2VzOiBudW1iZXI7XHJcbiAgICBsaW5lUGFnZTogbnVtYmVyO1xyXG4gICAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgICBwYWdpbmF0aW9uTGFiZWxzOiBQYWdpbmF0aW9uTGFiZWxzO1xyXG4gICAgY29udGFpbmVyUmVmOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICAgIG9uTGluZVBhZ2VDaGFuZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XHJcbiAgICBvbk9wZW5MaW5lOiAobGluZVJlY0lkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICBzdGF0dXM6IHN0cmluZztcclxuICB9O1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyB0aGUgdGlja2V0IGRldGFpbCB2aWV3IHdoaWxlIHRoZSBwYWdlIGNvbnRhaW5lciBvd25zIG9yY2hlc3RyYXRpb24uXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3ID0gKHsgbW9kYWwsIHByZXZpZXcsIGNvbnRlbnQgfTogRXhwZW5zZVRpY2tldERldGFpbFZpZXdQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGRldGFpbEJvZHkgPSAoXHJcbiAgICA8PlxyXG4gICAgICA8RXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm1cclxuICAgICAgICBoZWFkZXI9e2NvbnRlbnQuaGVhZGVyfVxyXG4gICAgICAgIHN0YXR1c0xhYmVsPXtjb250ZW50LnN0YXR1c0xhYmVsfVxyXG4gICAgICAgIGdhc3RvVHlwZUxhYmVsPXtjb250ZW50Lmdhc3RvVHlwZUxhYmVsfVxyXG4gICAgICAgIHRvdGFsQW1vdW50VGV4dD17Y29udGVudC50b3RhbEFtb3VudFRleHR9XHJcbiAgICAgICAgdHJhbnNEYXRlVGV4dD17Y29udGVudC50cmFuc0RhdGVUZXh0fVxyXG4gICAgICAgIGlzRWRpdGluZz17Y29udGVudC5pc0VkaXRpbmd9XHJcbiAgICAgICAgZ2FzdG9UeXBlT3B0aW9ucz17Y29udGVudC5nYXN0b1R5cGVPcHRpb25zfVxyXG4gICAgICAgIGRyYWZ0RGVzY3JpcHRpb249e2NvbnRlbnQuZHJhZnREZXNjcmlwdGlvbn1cclxuICAgICAgICBkZXNjcmlwdGlvbkludmFsaWQ9e2NvbnRlbnQuZGVzY3JpcHRpb25JbnZhbGlkfVxyXG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXRSZWY9e2NvbnRlbnQuZGVzY3JpcHRpb25JbnB1dFJlZn1cclxuICAgICAgICBkcmFmdEdhc3RvVHlwZT17Y29udGVudC5kcmFmdEdhc3RvVHlwZX1cclxuICAgICAgICBnYXN0b1R5cGVJbnZhbGlkPXtjb250ZW50Lmdhc3RvVHlwZUludmFsaWR9XHJcbiAgICAgICAgZ2FzdG9UeXBlSW5wdXRSZWY9e2NvbnRlbnQuZ2FzdG9UeXBlSW5wdXRSZWZ9XHJcbiAgICAgICAgZHJhZnRDdXJyZW5jeUNvZGU9e2NvbnRlbnQuZHJhZnRDdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgY3VycmVuY3lDb2RlSW52YWxpZD17Y29udGVudC5jdXJyZW5jeUNvZGVJbnZhbGlkfVxyXG4gICAgICAgIGN1cnJlbmN5SW5wdXRSZWY9e2NvbnRlbnQuY3VycmVuY3lJbnB1dFJlZn1cclxuICAgICAgICBkcmFmdFRyYW5zRGF0ZT17Y29udGVudC5kcmFmdFRyYW5zRGF0ZX1cclxuICAgICAgICBkcmFmdFVybEZpbGU9e2NvbnRlbnQuZHJhZnRVcmxGaWxlfVxyXG4gICAgICAgIGRyYWZ0RmlsZU5hbWU9e2NvbnRlbnQuZHJhZnRGaWxlTmFtZX1cclxuICAgICAgICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U9e2NvbnRlbnQub25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlfVxyXG4gICAgICAgIG9uRHJhZnRHYXN0b1R5cGVDaGFuZ2U9e2NvbnRlbnQub25EcmFmdEdhc3RvVHlwZUNoYW5nZX1cclxuICAgICAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlPXtjb250ZW50Lm9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XHJcbiAgICAgICAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZT17Y29udGVudC5vbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlfVxyXG4gICAgICAgIG9uT3BlbkZpbGU9e2NvbnRlbnQub25PcGVuRmlsZX1cclxuICAgICAgICBvbk9wZW5FeHBlbnNlU2hlZXQ9e2NvbnRlbnQub25PcGVuRXhwZW5zZVNoZWV0fVxyXG4gICAgICAgIGhpZGVPcGVuRmlsZUFjdGlvbj17Y29udGVudC5zaG93U3RpY2t5UHJldmlld31cclxuICAgICAgLz5cclxuICAgICAgPEV4cGVuc2VUaWNrZXRMaW5lc0xpc3RcclxuICAgICAgICB2aXNpYmxlTGluZXM9e2NvbnRlbnQudmlzaWJsZUxpbmVzfVxyXG4gICAgICAgIHRvdGFsTGluZVBhZ2VzPXtjb250ZW50LnRvdGFsTGluZVBhZ2VzfVxyXG4gICAgICAgIGxpbmVQYWdlPXtjb250ZW50LmxpbmVQYWdlfVxyXG4gICAgICAgIGN1cnJlbmN5Q29kZT17Y29udGVudC5jdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgcGFnaW5hdGlvbkxhYmVscz17Y29udGVudC5wYWdpbmF0aW9uTGFiZWxzfVxyXG4gICAgICAgIGNvbnRhaW5lclJlZj17Y29udGVudC5jb250YWluZXJSZWZ9XHJcbiAgICAgICAgb25MaW5lUGFnZUNoYW5nZT17Y29udGVudC5vbkxpbmVQYWdlQ2hhbmdlfVxyXG4gICAgICAgIG9uT3BlbkxpbmU9e2NvbnRlbnQub25PcGVuTGluZX1cclxuICAgICAgLz5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+e2NvbnRlbnQuc3RhdHVzfTwvZGl2PlxyXG4gICAgPC8+XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbC5jb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbC5jYW5jZWxUZXh0fVxyXG4gICAgICAgIGxvYWRpbmdUZXh0PXttb2RhbC5sb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXttb2RhbC5idXN5fVxyXG4gICAgICAgIGVycm9yPXttb2RhbC5lcnJvcn1cclxuICAgICAgICBzdGF0dXM9e21vZGFsLnN0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e21vZGFsLm9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17bW9kYWwub25DYW5jZWx9XHJcbiAgICAgIC8+XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0UHJldmlld01vZGFsXHJcbiAgICAgICAgb3Blbj17cHJldmlldy5vcGVufVxyXG4gICAgICAgIGJ1c3k9e3ByZXZpZXcuYnVzeX1cclxuICAgICAgICBlcnJvcj17cHJldmlldy5lcnJvcn1cclxuICAgICAgICBpbWFnZVVybD17cHJldmlldy5pbWFnZVVybH1cclxuICAgICAgICBpbWFnZUFsdD17cHJldmlldy5pbWFnZUFsdH1cclxuICAgICAgICBzY2FsZT17cHJldmlldy5zY2FsZX1cclxuICAgICAgICB0cmFuc2xhdGU9e3ByZXZpZXcudHJhbnNsYXRlfVxyXG4gICAgICAgIHN1cmZhY2VSZWY9e3ByZXZpZXcuc3VyZmFjZVJlZn1cclxuICAgICAgICBvbkNsb3NlPXtwcmV2aWV3Lm9uQ2xvc2V9XHJcbiAgICAgICAgb25Qb2ludGVyRG93bj17cHJldmlldy5vblBvaW50ZXJEb3dufVxyXG4gICAgICAgIG9uUG9pbnRlck1vdmU9e3ByZXZpZXcub25Qb2ludGVyTW92ZX1cclxuICAgICAgICBvblBvaW50ZXJFbmQ9e3ByZXZpZXcub25Qb2ludGVyRW5kfVxyXG4gICAgICAgIG9uV2hlZWw9e3ByZXZpZXcub25XaGVlbH1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxyXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGNvbnRlbnQuaXNMb2FkaW5nID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cclxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtjb250ZW50LmVycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57Y29udGVudC5lcnJvck1lc3NhZ2V9PC9kaXY+IDogbnVsbH1cclxuXHJcbiAgICAgIHshY29udGVudC5pc0xvYWRpbmcgJiYgIWNvbnRlbnQuZXJyb3JNZXNzYWdlICYmIGNvbnRlbnQuaGVhZGVyID8gKFxyXG4gICAgICAgIGNvbnRlbnQuc2hvd1N0aWNreVByZXZpZXcgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBsZzpncmlkIGxnOmdyaWQtY29scy1bbWlubWF4KDAsMWZyKV8zMjBweF0gbGc6Z2FwLTQgbGc6c3BhY2UteS0wXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXN0YXJ0LTJcIj5cclxuICAgICAgICAgICAgICA8RXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXdcclxuICAgICAgICAgICAgICAgIGJ1c3k9e2NvbnRlbnQucHJldmlld0J1c3l9XHJcbiAgICAgICAgICAgICAgICBlcnJvcj17Y29udGVudC5wcmV2aWV3RXJyb3J9XHJcbiAgICAgICAgICAgICAgICBpbWFnZVVybD17Y29udGVudC5wcmV2aWV3SW1hZ2VVcmx9XHJcbiAgICAgICAgICAgICAgICBpbWFnZUFsdD17Y29udGVudC5wcmV2aWV3QWx0VGV4dH1cclxuICAgICAgICAgICAgICAgIGZpbGVOYW1lPXtjb250ZW50LnByZXZpZXdGaWxlTmFtZX1cclxuICAgICAgICAgICAgICAgIG9uT3Blbj17Y29udGVudC5vbk9wZW5QcmV2aWV3fVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBsZzpjb2wtc3RhcnQtMSBsZzpyb3ctc3RhcnQtMVwiPntkZXRhaWxCb2R5fTwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIGRldGFpbEJvZHlcclxuICAgICAgICApXHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlIH0gZnJvbSBcIi4uL3VzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUudHNcIjtcbmltcG9ydCB7XG4gIGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsLFxuICBidWlsZEV4cGVuc2VTaGVldExpbmVEZXRhaWxVcmwsXG4gIGJ1aWxkRXhwZW5zZVRpY2tldExpbmtVcmwsXG4gIHR5cGUgRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXG59IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dC50c1wiO1xuaW1wb3J0IHsgdG9FeHBlbnNlSXNvRGF0ZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb25BcmdzID0ge1xyXG4gIGZpbGVJZDogc3RyaW5nO1xuICBkZXRhaWxPcmlnaW46IHN0cmluZztcbiAgaGVhZGVyVHJhbnNEYXRlOiB1bmtub3duO1xuICBjb250ZXh0TGluZVJlY0lkPzogc3RyaW5nO1xuICB0aWNrZXRSZXR1cm5Db250ZXh0PzogRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQgfCBudWxsO1xuICByZWFkQ2FjaGVkU3RhdGU6ICgpID0+IEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUgfCBudWxsO1xuICBzYXZlQ2FjaGVkU3RhdGU6IChzdGF0ZTogRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSkgPT4gdm9pZDtcbn07XG5cclxuLy8gS2VlcHMgbmF0aXZlIGJhY2sgbmF2aWdhdGlvbiBhbGlnbmVkIHdpdGggdGhlIHRpY2tldCBlbnRyeSBwb2ludCBhbmQgcHJlc2VydmVzIGNhY2hlZCBsaW5rLW1vZGUgc3RhdGUuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb24gPSAoe1xyXG4gIGZpbGVJZCxcbiAgZGV0YWlsT3JpZ2luLFxuICBoZWFkZXJUcmFuc0RhdGUsXG4gIGNvbnRleHRMaW5lUmVjSWQsXG4gIHRpY2tldFJldHVybkNvbnRleHQsXG4gIHJlYWRDYWNoZWRTdGF0ZSxcbiAgc2F2ZUNhY2hlZFN0YXRlLFxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uQXJncykgPT4ge1xuICBjb25zdCBzaG91bGRSZXR1cm5Ub1RpY2tldExpc3QgPSB0aWNrZXRSZXR1cm5Db250ZXh0Py5vcmlnaW4gPT09IFwic2hlZXQtbGlua1wiIHx8ICF0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkO1xyXG5cclxuICBjb25zdCBuYXRpdmVCYWNrVXJsID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBpZiAodGlja2V0UmV0dXJuQ29udGV4dD8ub3JpZ2luID09PSBcInNoZWV0LWxpbmtcIiAmJiB0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0SWQpIHtcbiAgICAgIHJldHVybiBidWlsZEV4cGVuc2VUaWNrZXRMaW5rVXJsKHRpY2tldFJldHVybkNvbnRleHQuc2hlZXRJZCk7XG4gICAgfVxuXG4gICAgaWYgKHRpY2tldFJldHVybkNvbnRleHQ/Lm9yaWdpbiA9PT0gXCJleHBlbnNlLWxpbmVcIiAmJiB0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0SWQpIHtcbiAgICAgIHJldHVybiBidWlsZEV4cGVuc2VTaGVldExpbmVEZXRhaWxVcmwodGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkLCB0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0TGluZVJlY0lkIHx8IGNvbnRleHRMaW5lUmVjSWQpO1xuICAgIH1cblxuICAgIGlmICh0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkKSB7XG4gICAgICByZXR1cm4gYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwodGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkKTtcbiAgICB9XG5cclxuICAgIGlmIChkZXRhaWxPcmlnaW4gPT09IFwidGlja2V0LWNyZWF0ZVwiKSB7XHJcbiAgICAgIGNvbnN0IHRpY2tldERhdGUgPSB0b0V4cGVuc2VJc29EYXRlKGhlYWRlclRyYW5zRGF0ZSkgfHwgdG9FeHBlbnNlSXNvRGF0ZShuZXcgRGF0ZSgpKTtcclxuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICB0aWNrZXRGaWxlSWQ6IGZpbGVJZCxcclxuICAgICAgICB0aWNrZXREYXRlLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBgL0dhc3Rvcy9UaWNrZXRzPyR7cXVlcnkudG9TdHJpbmcoKX1gO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBcIi9HYXN0b3MvVGlja2V0c1wiO1xyXG4gIH0sIFtjb250ZXh0TGluZVJlY0lkLCBkZXRhaWxPcmlnaW4sIGZpbGVJZCwgaGVhZGVyVHJhbnNEYXRlLCB0aWNrZXRSZXR1cm5Db250ZXh0XSk7XG5cclxuICBjb25zdCByZWFybUV4cGVuc2VUaWNrZXRzUmV0dXJuU3RhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBjYWNoZWRTdGF0ZSA9IHJlYWRDYWNoZWRTdGF0ZSgpO1xyXG4gICAgaWYgKCFjYWNoZWRTdGF0ZSkgcmV0dXJuO1xyXG4gICAgc2F2ZUNhY2hlZFN0YXRlKGNhY2hlZFN0YXRlKTtcclxuICB9LCBbcmVhZENhY2hlZFN0YXRlLCBzYXZlQ2FjaGVkU3RhdGVdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghZmlsZUlkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgYmFja0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsQmFja0J0blwiKTtcclxuICAgIGlmICghYmFja0J1dHRvbikgcmV0dXJuO1xyXG5cclxuICAgIGJhY2tCdXR0b24uc2V0QXR0cmlidXRlKFwiZGF0YS1iYWNrLXVybFwiLCBuYXRpdmVCYWNrVXJsKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGJhY2tCdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1iYWNrLXVybFwiKTtcclxuICAgIH07XHJcbiAgfSwgW2ZpbGVJZCwgbmF0aXZlQmFja1VybF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFmaWxlSWQpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVOYXRpdmVCYWNrID0gKGV2ZW50OiBQb3BTdGF0ZUV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudD8uc3RhdGUgJiYgZXZlbnQuc3RhdGUuaW5kVHJhcCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChzaG91bGRSZXR1cm5Ub1RpY2tldExpc3QpIHtcclxuICAgICAgICAgIHJlYXJtRXhwZW5zZVRpY2tldHNSZXR1cm5TdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShuYXRpdmVCYWNrVXJsKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uKGV4ZWN1dGVCYWNrTmF2aWdhdGlvbik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBleGVjdXRlQmFja05hdmlnYXRpb24oKTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBoYW5kbGVOYXRpdmVCYWNrKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgaGFuZGxlTmF0aXZlQmFjayk7XHJcbiAgICB9O1xyXG4gIH0sIFtmaWxlSWQsIG5hdGl2ZUJhY2tVcmwsIHJlYXJtRXhwZW5zZVRpY2tldHNSZXR1cm5TdGF0ZSwgc2hvdWxkUmV0dXJuVG9UaWNrZXRMaXN0XSk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzXCI7XHJcbmltcG9ydCB7IGhhc0V4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdTb3VyY2UgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0UHJldmlld1V0aWxzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWxBcmdzID0ge1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBkcmFmdFVybEZpbGU6IHN0cmluZztcclxuICBoZWFkZXJVcmxGaWxlPzogc3RyaW5nIHwgbnVsbDtcclxufTtcclxuXHJcbi8vIENlbnRyYWxpemVzIHN0aWNreS1wcmV2aWV3IGF2YWlsYWJpbGl0eSBhbmQgaW1hZ2UgbG9hZGluZyBmb3IgdGlja2V0IGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWwgPSAoe1xyXG4gIGZpbGVJZCxcclxuICBpc0VkaXRpbmcsXHJcbiAgZHJhZnRVcmxGaWxlLFxyXG4gIGhlYWRlclVybEZpbGUsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWxBcmdzKSA9PiB7XHJcbiAgY29uc3QgcHJldmlld1NvdXJjZVVybCA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQoaXNFZGl0aW5nID8gZHJhZnRVcmxGaWxlIDogaGVhZGVyVXJsRmlsZSksIFtkcmFmdFVybEZpbGUsIGhlYWRlclVybEZpbGUsIGlzRWRpdGluZ10pO1xyXG4gIGNvbnN0IHNob3dTdGlja3lQcmV2aWV3ID0gdXNlTWVtbygoKSA9PiBoYXNFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3U291cmNlKHByZXZpZXdTb3VyY2VVcmwpLCBbcHJldmlld1NvdXJjZVVybF0pO1xyXG4gIGNvbnN0IHByZXZpZXcgPSB1c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3KHtcclxuICAgIGZpbGVJZCxcclxuICAgIHNvdXJjZVVybDogcHJldmlld1NvdXJjZVVybCxcclxuICAgIGVuYWJsZWQ6IHNob3dTdGlja3lQcmV2aWV3LFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc2hvd1N0aWNreVByZXZpZXcsXHJcbiAgICAuLi5wcmV2aWV3LFxyXG4gIH07XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxpQkFBeUU7OztBQ0F6RSxtQkFBaUQ7QUFlMUMsSUFBTSw4QkFBOEIsQ0FBQyxFQUFFLFdBQVcsUUFBUSxZQUFZLE1BQXVDO0FBQ2xILFFBQU0sQ0FBQyxRQUFRLFNBQVMsUUFBSSx1QkFBMkMsSUFBSTtBQUMzRSxRQUFNLENBQUMsT0FBTyxRQUFRLFFBQUksdUJBQW9DLENBQUMsQ0FBQztBQUNoRSxRQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksdUJBQVMsS0FBSztBQUNoRCxRQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksdUJBQVMsRUFBRTtBQUVuRCxRQUFNLG1CQUFlLDBCQUFZLFlBQVk7QUFDM0MsUUFB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VyxTQUFTLFNBQVMsV0FBVyxTQUFTO0FBQ3JIO0FBR0EsSUFBTSwwQkFBMEIsTUFBTTtBQUNwQyxTQUNFLDZDQUFDLGdDQUFxQix5QkFBdUIsTUFDM0MsdURBQUMsa0NBQStCLEdBQ2xDO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSw0QkFBNEI7QUFDbkUsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQywyQkFBd0IsQ0FBRTtBQUN0RDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sa0NBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
