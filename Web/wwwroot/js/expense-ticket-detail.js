import {
  SingleDatePicker
} from "./chunks/chunk-TQTUWJA7.js";
import {
  getExpenseTicketStatusLabel,
  useExpenseTicketsFilterCache
} from "./chunks/chunk-HD7PRUDB.js";
import {
  mapWindowEnumOptions
} from "./chunks/chunk-YM2TI2W6.js";
import {
  mapExpenseTicketDetailHeader,
  mapExpenseTicketDetailLine
} from "./chunks/chunk-SAJGTI44.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-NJCZVPWB.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-S6U6GZC2.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-C2QA25S4.js";
import "./chunks/chunk-OSBLOXTE.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-LGHRS62I.js";
import "./chunks/chunk-4BE3ZFCK.js";
import {
  appendExpenseTicketReturnQuery,
  buildExpenseSheetDetailUrl,
  buildExpenseTicketLinkUrl,
  isManagingOtherExpenseUser,
  normalizeExpenseTicketReturnContext,
  resolveExpenseTicketReturnContext,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-6VGTOKC7.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-ZHUOZUVW.js";
import "./chunks/chunk-CBDB7NMA.js";
import {
  formatAmountWithCurrency,
  formatExpenseNumber,
  navigateToExpenseUrl
} from "./chunks/chunk-S4F4JMPK.js";
import {
  configureExpenseApiAuth,
  deleteExpenseSheetLine,
  deleteExpenseSheetTicket,
  deleteExpenseSheetTicketFile,
  fetchExpenseSheetDetail,
  fetchExpenseSheetTicket,
  fetchExpenseSheetTicketPreviewBlob,
  formatExpenseDisplayDate,
  parseExpenseDate,
  safeText,
  toIsoDate,
  updateExpenseSheetTicket
} from "./chunks/chunk-IUMLRTMN.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-5DDPA4B2.js";
import {
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  toExpenseApiDdMmYyyy,
  toExpenseIsoDate
} from "./chunks/chunk-7CXSZQJB.js";
import "./chunks/chunk-ZBKHPZJX.js";
import {
  canAccess,
  showPermissionModal
} from "./chunks/chunk-ZHH4AWW7.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunks/chunk-2NKOKBT5.js";
import {
  ApiFetchError,
  indT
} from "./chunks/chunk-5TAE4PEJ.js";
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
  draftComentario,
  draftUrlFile,
  draftFileName,
  linkedExpenseSheetId,
  deleteLinkedExpenseLineContext,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing
}) => {
  const handleUpdate = (0, import_react2.useCallback)(async () => {
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
        setStatus(indT("ExpenseSheets_Detail_Updated", "Expense sheet updated"));
        setIsEditing(false);
        return true;
      }
    });
    return result.ok;
  }, [
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
    setBusy,
    setIsEditing,
    setModalError,
    setStatus
  ]);
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
        return true;
      }
    });
    return result.ok;
  }, [busy, canDeleteTicket, fileId, resolveLinkedExpenseLineContext, setBusy, setModalError, setStatus]);
  return {
    handleUpdate,
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
  const [gastoTypeInvalid, setGastoTypeInvalid] = (0, import_react3.useState)(false);
  const [currencyCodeInvalid, setCurrencyCodeInvalid] = (0, import_react3.useState)(false);
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
    const normalizedCurrencyCode = String(state.draft.currencyCode || "").trim().toUpperCase();
    const gastoTypeIsValid = isValidRequiredGastoType(state.draft.gastoType);
    const currencyIsValid = !!normalizedCurrencyCode;
    setGastoTypeInvalid(!gastoTypeIsValid);
    setCurrencyCodeInvalid(!currencyIsValid);
    if (gastoTypeIsValid && currencyIsValid) {
      return true;
    }
    const message = !gastoTypeIsValid ? indT("Tickets_Validation_CategoryRequired", "Category is required.") : indT("ExpenseSheets_Validation_CurrencyRequired", "Currency is required.");
    dispatch({
      type: "patch_state",
      patch: {
        modalError: message,
        status: message
      }
    });
    window.requestAnimationFrame(() => {
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
  const contextLineRecId = (0, import_react4.useMemo)(() => safeText(routeParams.get("lineRecId")), [routeParams]);
  const explicitReturnContext = (0, import_react4.useMemo)(
    () => normalizeExpenseTicketReturnContext({
      fileId,
      origin: routeOrigin,
      sheetId: routeSheetId
    }),
    [fileId, routeOrigin, routeSheetId]
  );
  (0, import_react4.useEffect)(() => {
    if (!explicitReturnContext) return;
    saveExpenseTicketReturnContext(explicitReturnContext);
  }, [explicitReturnContext]);
  return (0, import_react4.useMemo)(() => {
    const ticketReturnContext = resolveExpenseTicketReturnContext(fileId, explicitReturnContext);
    const detailOrigin = ticketReturnContext?.origin || routeOrigin;
    const contextSheetId = ticketReturnContext?.sheetId || routeSheetId;
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
  }, [autoEditMode, contextLineRecId, explicitReturnContext, fileId, routeOrigin, routeSheetId]);
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
  fileId,
  contextSheetId,
  isFromExpenseLine,
  isFromExpenseSheetCreate,
  isFromSheetLink,
  headerExpenseSheetId,
  isEditing,
  lineContainerRef,
  openPreview,
  ticketReturnContext
}) => {
  const openLineDetail = (0, import_react7.useCallback)(
    (rawLineRecId) => {
      if (isFromExpenseLine || isFromSheetLink) return;
      const lineRecId = safeText(rawLineRecId);
      if (!lineRecId || !fileId) return;
      const query = new URLSearchParams({
        fileId,
        lineRecId
      });
      if (isFromExpenseSheetCreate) {
        query.set("mode", "edit");
      }
      appendExpenseTicketReturnQuery(query, ticketReturnContext);
      navigateToExpenseUrl(`/Gastos/TicketLineDetail?${query.toString()}`, {
        askConfirmation: true,
        bypassGuardOnce: false
      });
    },
    [fileId, isFromExpenseLine, isFromExpenseSheetCreate, isFromSheetLink, ticketReturnContext]
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

// Web/wwwroot/react/src/pages/gastos/tickets/detail/expenseTicketPreviewUtils.ts
var IMAGE_EXTENSIONS = /* @__PURE__ */ new Set(["jpg", "jpeg", "png", "webp", "gif", "bmp", "heic", "heif", "avif"]);
var getFileExtensionFromPath = (value) => {
  const source = safeText(value).toLowerCase();
  if (!source) return "";
  const withoutQuery = source.split("?")[0].split("#")[0];
  const parts = withoutQuery.split(".");
  if (parts.length < 2) return "";
  const rawExt = safeText(parts[parts.length - 1]).replace(/[^a-z0-9]/g, "");
  return rawExt === "jpeg" ? "jpg" : rawExt;
};
var hasExpenseTicketImagePreviewSource = (urlValue) => {
  const normalizedUrl = safeText(urlValue);
  if (!normalizedUrl) return false;
  if (normalizedUrl.toLowerCase().startsWith("data:image/")) return true;
  const extension = getFileExtensionFromPath(normalizedUrl);
  if (extension && IMAGE_EXTENSIONS.has(extension)) return true;
  const normalizedLower = normalizedUrl.toLowerCase();
  if (normalizedLower.includes("blob.core.windows.net") && normalizedLower.includes("image")) return true;
  return false;
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

// Web/wwwroot/react/src/pages/gastos/tickets/detail/ExpenseTicketPreviewModal.tsx
var import_react_dom = __toESM(require_react_dom());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var ExpenseTicketPreviewModal = ({
  open,
  busy,
  error,
  imageUrl,
  imageAlt,
  scale,
  translate,
  surfaceRef,
  onClose,
  onPointerDown,
  onPointerMove,
  onPointerEnd,
  onWheel
}) => {
  if (!open) return null;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center overscroll-contain bg-slate-950/45 px-4 py-6 backdrop-blur-md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "button",
        {
          type: "button",
          "aria-label": indT("Common_Close", "Close"),
          className: "absolute inset-0",
          onClick: onClose
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "button",
        {
          type: "button",
          "aria-label": indT("Common_Close", "Close"),
          className: "fixed right-4 top-[calc(1rem+env(safe-area-inset-top,0px))] z-[600020] inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-xl)] border border-slate-200/60 bg-slate-900/78 text-slate-100 shadow-lg transition hover:bg-slate-900/88 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-200/80",
          onClick: onClose,
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "path",
            {
              d: "M6 6L18 18M18 6L6 18",
              stroke: "currentColor",
              strokeWidth: "1.75",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ) })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "relative flex max-h-[92vh] max-w-[92vw] items-center justify-center overscroll-contain", children: busy ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-2 text-sm text-slate-100", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
        indT("Common_Loading", "Loading")
      ] }) : error ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-sm text-rose-200", children: error }) : imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "div",
        {
          ref: surfaceRef,
          className: "relative max-h-[90vh] max-w-[92vw] overflow-hidden rounded-[var(--radius-xl)] touch-none overscroll-contain",
          role: "presentation",
          style: { touchAction: "none" },
          onPointerDown,
          onPointerMove,
          onPointerUp: onPointerEnd,
          onPointerCancel: onPointerEnd,
          onWheel,
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "img",
            {
              src: imageUrl,
              alt: imageAlt || indT("Tickets_Field_FileId", "Ticket"),
              className: "pointer-events-none max-h-[90vh] w-auto max-w-[92vw] select-none rounded-[var(--radius-xl)] object-contain shadow-2xl",
              style: {
                transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`,
                transformOrigin: "center center",
                transition: scale <= 1 ? "transform 140ms ease-out" : "none"
              },
              draggable: false
            }
          )
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-sm text-slate-100", children: indT("Common_NotAvailable", "N/A") }) })
    ] }),
    document.body
  );
};
var ExpenseTicketPreviewModal_default = ExpenseTicketPreviewModal;

// Web/wwwroot/react/src/pages/gastos/tickets/detail/ExpenseTicketStickyPreview.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var ExpenseTicketStickyPreview = ({
  busy,
  error,
  imageUrl,
  imageAlt,
  fileName,
  onOpen
}) => {
  const previewLabel = indT("Tickets_Detail_ViewAttachment", "Ver adjunto");
  const ticketLabel = indT("Tickets_Field_FileId", "Ticket");
  const safeFileName = safeText(fileName) || safeText(imageAlt) || ticketLabel;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "sticky top-[72px] z-[1800] lg:top-20", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "button",
    {
      type: "button",
      className: "group block w-full touch-manipulation text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2",
      "aria-label": `${previewLabel}: ${safeFileName}`,
      onClick: onOpen,
      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "overflow-hidden rounded-[var(--radius-xl)] border border-slate-200 bg-white shadow-xs transition-[transform,box-shadow,border-color] duration-200 group-hover:-translate-y-[1px] group-hover:border-primary/25 group-hover:shadow-md", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "relative h-36 overflow-hidden bg-linear-to-br from-slate-100 via-white to-slate-200 sm:h-40 lg:h-[380px]", children: [
        imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "img",
          {
            src: imageUrl,
            alt: imageAlt || ticketLabel,
            width: 640,
            height: 960,
            className: "h-full w-full rounded-[var(--radius-xl)] object-cover object-center transition-transform duration-300 group-hover:scale-[1.015] lg:object-contain lg:object-center lg:p-3"
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex h-full items-center justify-center px-4", children: busy ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-2 text-sm text-slate-700", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex min-w-0 items-center gap-3 text-slate-700", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-xl)] bg-primary/8 text-primary", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "path",
              {
                d: "M7 3.75h6.25L18.25 8.75V19.5a.75.75 0 0 1-.75.75H7a.75.75 0 0 1-.75-.75v-15A.75.75 0 0 1 7 3.75Z",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "path",
              {
                d: "M13 3.75V8.5h4.75",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            )
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "min-w-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "truncate text-sm font-semibold text-slate-900", children: safeFileName }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "line-clamp-2 text-xs text-slate-500", children: error || previewLabel })
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-slate-950/26 via-slate-900/8 to-transparent lg:h-20" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-[var(--radius-xl)] bg-primary/92 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { className: "h-3.5 w-3.5", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "path",
            {
              d: "M15 3h6v6M21 3l-7 7M9 21H3v-6M3 21l7-7",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ) }),
          previewLabel
        ] })
      ] }) })
    }
  ) });
};
var ExpenseTicketStickyPreview_default = ExpenseTicketStickyPreview;

// Web/wwwroot/react/src/pages/gastos/tickets/detail/ExpenseTicketDetailView.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var ExpenseTicketDetailView = ({ modal, preview, content }) => {
  const detailBody = /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "text-sm text-slate-600", children: content.status })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
      "div",
      {
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: content.isLoading ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    content.errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "text-danger", children: content.errorMessage }) : null,
    !content.isLoading && !content.errorMessage && content.header ? content.showStickyPreview ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-2 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-4 lg:space-y-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "lg:col-start-2", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "space-y-2 lg:col-start-1 lg:row-start-1", children: detailBody })
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
  ticketReturnContext,
  readCachedState,
  saveCachedState
}) => {
  const shouldReturnToTicketList = ticketReturnContext?.origin === "sheet-link" || !ticketReturnContext?.sheetId;
  const nativeBackUrl = (0, import_react8.useMemo)(() => {
    if (ticketReturnContext?.origin === "sheet-link" && ticketReturnContext.sheetId) {
      return buildExpenseTicketLinkUrl(ticketReturnContext.sheetId);
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
  }, [detailOrigin, fileId, headerTransDate, ticketReturnContext]);
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
var import_react10 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketImagePreview.ts
var import_react9 = __toESM(require_react());
var PREVIEW_MAX_SCALE = 4;
var PREVIEW_SCALE_STEP = 0.25;
var clampPreviewScale = (value) => {
  if (!Number.isFinite(value)) return 1;
  return Math.min(PREVIEW_MAX_SCALE, Math.max(1, value));
};
var getPreviewPointDistance = (left, right) => {
  const deltaX = right.x - left.x;
  const deltaY = right.y - left.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
};
var getPreviewPointCenter = (left, right) => ({
  x: (left.x + right.x) / 2,
  y: (left.y + right.y) / 2
});
var useExpenseTicketImagePreview = ({ fileId, sourceUrl, enabled = true }) => {
  const [previewOpen, setPreviewOpen] = (0, import_react9.useState)(false);
  const [previewBusy, setPreviewBusy] = (0, import_react9.useState)(false);
  const [previewError, setPreviewError] = (0, import_react9.useState)("");
  const [previewImageUrl, setPreviewImageUrl] = (0, import_react9.useState)("");
  const [previewScale, setPreviewScale] = (0, import_react9.useState)(1);
  const [previewTranslate, setPreviewTranslate] = (0, import_react9.useState)({ x: 0, y: 0 });
  const previewScaleRef = (0, import_react9.useRef)(1);
  const previewImageUrlRef = (0, import_react9.useRef)("");
  const previewRequestKeyRef = (0, import_react9.useRef)("");
  const previewLoadPromiseRef = (0, import_react9.useRef)(null);
  const previewSurfaceRef = (0, import_react9.useRef)(null);
  const previewTranslateRef = (0, import_react9.useRef)({ x: 0, y: 0 });
  const previewPointersRef = (0, import_react9.useRef)(/* @__PURE__ */ new Map());
  const previewPanPointerRef = (0, import_react9.useRef)(null);
  const previewPanLastPointRef = (0, import_react9.useRef)(null);
  const previewPinchSnapshotRef = (0, import_react9.useRef)(null);
  const applyPreviewTransform = (0, import_react9.useCallback)((nextScale, nextTranslate) => {
    const normalizedScale = clampPreviewScale(nextScale);
    const normalizedTranslate = normalizedScale <= 1 ? { x: 0, y: 0 } : nextTranslate;
    previewScaleRef.current = normalizedScale;
    previewTranslateRef.current = normalizedTranslate;
    setPreviewScale(normalizedScale);
    setPreviewTranslate(normalizedTranslate);
  }, []);
  const resetPreviewGesture = (0, import_react9.useCallback)(() => {
    previewPointersRef.current.clear();
    previewPanPointerRef.current = null;
    previewPanLastPointRef.current = null;
    previewPinchSnapshotRef.current = null;
    applyPreviewTransform(1, { x: 0, y: 0 });
  }, [applyPreviewTransform]);
  const rebuildPinchSnapshot = (0, import_react9.useCallback)(() => {
    const pointerPoints = Array.from(previewPointersRef.current.values());
    if (pointerPoints.length < 2) {
      previewPinchSnapshotRef.current = null;
      return;
    }
    const [left, right] = pointerPoints;
    previewPinchSnapshotRef.current = {
      distance: Math.max(1, getPreviewPointDistance(left, right)),
      scale: previewScaleRef.current,
      center: getPreviewPointCenter(left, right),
      translate: previewTranslateRef.current
    };
  }, []);
  const replacePreviewImageUrl = (0, import_react9.useCallback)((nextUrl) => {
    setPreviewImageUrl((previous) => {
      if (previous && previous !== nextUrl) {
        URL.revokeObjectURL(previous);
      }
      previewImageUrlRef.current = nextUrl;
      return nextUrl;
    });
  }, []);
  const clearPreviewImage = (0, import_react9.useCallback)(() => {
    previewLoadPromiseRef.current = null;
    setPreviewImageUrl((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }
      previewImageUrlRef.current = "";
      return "";
    });
  }, []);
  const loadPreviewImage = (0, import_react9.useCallback)(async () => {
    const currentFileId = safeText(fileId);
    const currentUrl = safeText(sourceUrl);
    if (!enabled || !currentFileId || !currentUrl) {
      setPreviewBusy(false);
      setPreviewError("");
      return "";
    }
    if (previewImageUrlRef.current) {
      return previewImageUrlRef.current;
    }
    if (previewLoadPromiseRef.current) {
      return previewLoadPromiseRef.current;
    }
    const requestKey = `${currentFileId}__${currentUrl}`;
    previewRequestKeyRef.current = requestKey;
    setPreviewBusy(true);
    setPreviewError("");
    const nextPromise = (async () => {
      try {
        const blob = await fetchExpenseSheetTicketPreviewBlob(currentFileId, currentUrl, {
          suppressPermissionModal: true
        });
        const objectUrl = URL.createObjectURL(blob);
        if (previewRequestKeyRef.current !== requestKey) {
          URL.revokeObjectURL(objectUrl);
          return "";
        }
        replacePreviewImageUrl(objectUrl);
        return objectUrl;
      } catch (error) {
        if (previewRequestKeyRef.current === requestKey) {
          setPreviewError(error instanceof Error ? error.message : indT("Api_RequestFailed", "Request failed."));
        }
        return "";
      } finally {
        if (previewRequestKeyRef.current === requestKey) {
          setPreviewBusy(false);
        }
        previewLoadPromiseRef.current = null;
      }
    })();
    previewLoadPromiseRef.current = nextPromise;
    return nextPromise;
  }, [enabled, fileId, replacePreviewImageUrl, sourceUrl]);
  const closePreview = (0, import_react9.useCallback)(() => {
    setPreviewOpen(false);
    setPreviewBusy(false);
    setPreviewError("");
    resetPreviewGesture();
  }, [resetPreviewGesture]);
  (0, import_react9.useEffect)(() => {
    return () => {
      clearPreviewImage();
    };
  }, [clearPreviewImage]);
  (0, import_react9.useEffect)(() => {
    previewRequestKeyRef.current = `${safeText(fileId)}__${safeText(sourceUrl)}`;
    setPreviewOpen(false);
    setPreviewBusy(false);
    setPreviewError("");
    resetPreviewGesture();
    clearPreviewImage();
    if (enabled && safeText(fileId) && safeText(sourceUrl)) {
      void loadPreviewImage();
    }
  }, [clearPreviewImage, enabled, fileId, loadPreviewImage, resetPreviewGesture, sourceUrl]);
  (0, import_react9.useEffect)(() => {
    if (!previewOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closePreview();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewOpen, closePreview]);
  (0, import_react9.useEffect)(() => {
    if (!previewOpen) return;
    const surface = previewSurfaceRef.current;
    if (!surface) return;
    const preventGestureDefault = (event) => {
      event.preventDefault();
    };
    const preventTouchViewportZoom = (event) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };
    const preventCtrlWheelViewportZoom = (event) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };
    surface.addEventListener("gesturestart", preventGestureDefault, { passive: false });
    surface.addEventListener("gesturechange", preventGestureDefault, { passive: false });
    surface.addEventListener("gestureend", preventGestureDefault, { passive: false });
    surface.addEventListener("touchmove", preventTouchViewportZoom, { passive: false });
    surface.addEventListener("wheel", preventCtrlWheelViewportZoom, { passive: false });
    return () => {
      surface.removeEventListener("gesturestart", preventGestureDefault);
      surface.removeEventListener("gesturechange", preventGestureDefault);
      surface.removeEventListener("gestureend", preventGestureDefault);
      surface.removeEventListener("touchmove", preventTouchViewportZoom);
      surface.removeEventListener("wheel", preventCtrlWheelViewportZoom);
    };
  }, [previewOpen]);
  const handlePreviewPointerDown = (0, import_react9.useCallback)(
    (event) => {
      if (!previewImageUrl || previewBusy) return;
      const point = { x: event.clientX, y: event.clientY };
      previewPointersRef.current.set(event.pointerId, point);
      if (typeof event.currentTarget.setPointerCapture === "function") {
        try {
          event.currentTarget.setPointerCapture(event.pointerId);
        } catch {
        }
      }
      if (previewPointersRef.current.size === 1) {
        previewPanPointerRef.current = event.pointerId;
        previewPanLastPointRef.current = point;
        previewPinchSnapshotRef.current = null;
        return;
      }
      previewPanPointerRef.current = null;
      previewPanLastPointRef.current = null;
      rebuildPinchSnapshot();
    },
    [previewBusy, previewImageUrl, rebuildPinchSnapshot]
  );
  const handlePreviewPointerMove = (0, import_react9.useCallback)(
    (event) => {
      if (!previewPointersRef.current.has(event.pointerId)) return;
      event.preventDefault();
      const point = { x: event.clientX, y: event.clientY };
      previewPointersRef.current.set(event.pointerId, point);
      const pointerEntries = Array.from(previewPointersRef.current.entries());
      const pointerPoints = pointerEntries.map((entry) => entry[1]);
      if (pointerPoints.length >= 2) {
        if (!previewPinchSnapshotRef.current) {
          rebuildPinchSnapshot();
        }
        const snapshot = previewPinchSnapshotRef.current;
        if (!snapshot) return;
        const [left, right] = pointerPoints;
        const distance = Math.max(1, getPreviewPointDistance(left, right));
        const ratio = distance / Math.max(1, snapshot.distance);
        const nextScale = clampPreviewScale(snapshot.scale * ratio);
        const center = getPreviewPointCenter(left, right);
        const nextTranslate2 = {
          x: snapshot.translate.x + (center.x - snapshot.center.x),
          y: snapshot.translate.y + (center.y - snapshot.center.y)
        };
        applyPreviewTransform(nextScale, nextTranslate2);
        return;
      }
      if (pointerPoints.length !== 1 || previewScaleRef.current <= 1 || previewPanPointerRef.current !== event.pointerId) {
        return;
      }
      const lastPoint = previewPanLastPointRef.current;
      previewPanLastPointRef.current = point;
      if (!lastPoint) return;
      const nextTranslate = {
        x: previewTranslateRef.current.x + (point.x - lastPoint.x),
        y: previewTranslateRef.current.y + (point.y - lastPoint.y)
      };
      applyPreviewTransform(previewScaleRef.current, nextTranslate);
    },
    [applyPreviewTransform, rebuildPinchSnapshot]
  );
  const handlePreviewPointerEnd = (0, import_react9.useCallback)(
    (event) => {
      if (!previewPointersRef.current.has(event.pointerId)) return;
      previewPointersRef.current.delete(event.pointerId);
      if (typeof event.currentTarget.hasPointerCapture === "function" && event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      const pointerEntries = Array.from(previewPointersRef.current.entries());
      if (pointerEntries.length >= 2) {
        previewPanPointerRef.current = null;
        previewPanLastPointRef.current = null;
        rebuildPinchSnapshot();
        return;
      }
      if (pointerEntries.length === 1) {
        const [pointerId, pointerPoint] = pointerEntries[0];
        previewPanPointerRef.current = pointerId;
        previewPanLastPointRef.current = pointerPoint;
        previewPinchSnapshotRef.current = null;
        return;
      }
      previewPanPointerRef.current = null;
      previewPanLastPointRef.current = null;
      previewPinchSnapshotRef.current = null;
      if (previewScaleRef.current <= 1) {
        applyPreviewTransform(1, { x: 0, y: 0 });
      }
    },
    [applyPreviewTransform, rebuildPinchSnapshot]
  );
  const handlePreviewWheel = (0, import_react9.useCallback)(
    (event) => {
      if (!previewImageUrl || previewBusy) return;
      event.preventDefault();
      const direction = event.deltaY < 0 ? 1 : -1;
      const nextScale = clampPreviewScale(previewScaleRef.current + direction * PREVIEW_SCALE_STEP);
      applyPreviewTransform(nextScale, previewTranslateRef.current);
    },
    [applyPreviewTransform, previewBusy, previewImageUrl]
  );
  const openPreview = (0, import_react9.useCallback)(async () => {
    const currentFileId = safeText(fileId);
    const currentUrl = safeText(sourceUrl);
    if (!enabled || !currentFileId || !currentUrl) return;
    resetPreviewGesture();
    setPreviewOpen(true);
    setPreviewError("");
    await loadPreviewImage();
  }, [enabled, fileId, loadPreviewImage, resetPreviewGesture, sourceUrl]);
  return {
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
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketDetailPreviewPanel.ts
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
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
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
  ticketReturnContext
}) => {
  const { readCachedState, saveCachedState, markResetFiltersReturn, clearCachedState } = useExpenseTicketsFilterCache();
  useExpenseTicketDetailBackNavigation({
    fileId,
    detailOrigin,
    headerTransDate,
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
  isFromExpenseLine,
  isFromSheetLink,
  isLoading,
  header,
  handleEnableEdit
}) => {
  const autoEditAttemptedRef = (0, import_react11.useRef)(false);
  (0, import_react11.useEffect)(() => {
    if (!autoEditMode || isFromExpenseLine || isFromSheetLink || autoEditAttemptedRef.current) return;
    if (isLoading || !header) return;
    autoEditAttemptedRef.current = true;
    handleEnableEdit();
  }, [autoEditMode, handleEnableEdit, header, isFromExpenseLine, isFromSheetLink, isLoading]);
};
var useExpenseTicketDetailPermissionState = ({
  isFromExpenseSheetCreate
}) => {
  const { canManageOtherUsers, currentAxUserId, selectedManagedUserId, managementBootstrapReady } = useAuthContext();
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
    allowAssignedDraftEdit: isFromExpenseSheetCreate,
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
    allowAssignedDraftEdit,
    isManagingOtherUser,
    managementBootstrapReady
  } = useExpenseTicketDetailPermissionState({
    isFromExpenseSheetCreate
  });
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
  const { markResetFiltersReturn, clearCachedState } = useExpenseTicketDetailNavigationState({
    fileId,
    detailOrigin,
    headerTransDate: header?.transDate,
    ticketReturnContext
  });
  const {
    busy,
    status,
    isEditing,
    modalError,
    linePage,
    draftDescription,
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
    canEditTicket,
    isLoading,
    allowAssignedDraftEdit,
    isFromSheetLink,
    onForbidden: showPermissionModal
  });
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
  const visibleLines = (0, import_react11.useMemo)(() => pagedSlice(lines, linePage, LINES_PAGE_SIZE), [linePage, lines]);
  const totalLinePages = Math.ceil((lines.length || 0) / LINES_PAGE_SIZE);
  useExpenseTicketDetailAutoEdit({
    autoEditMode,
    isFromExpenseLine,
    isFromSheetLink,
    isLoading,
    header,
    handleEnableEdit
  });
  const { handleUpdate, handleDelete } = useExpenseTicketDetailMutations({
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
    linkedExpenseSheetId: contextSheetId,
    deleteLinkedExpenseLineContext: isFromExpenseLine ? {
      sheetId: contextSheetId,
      lineRecId: contextLineRecId
    } : null,
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
  const isAssignedTicket = header?.status === 1;
  const isContextLocked = isAssignedTicket && !allowAssignedDraftEdit;
  const canEditTicketInContext = canEditTicket && !isFromExpenseLine && !isFromSheetLink;
  const canDeleteTicketInContext = canDeleteTicket && !isFromExpenseLine && !isFromSheetLink;
  const ticketTopbarActionMode = isManagingOtherUser || isFromExpenseLine || isFromSheetLink ? "view_only" : "default";
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
    handleEnableEdit,
    handleCancelEdit,
    canOpenSaveConfirm,
    handleUpdate,
    handleDelete,
    onSaveSuccess: () => {
      void reloadDetail();
    },
    onDeleteSuccess: () => {
      if (ticketReturnContext?.sheetId) {
        clearCachedState();
        navigateToExpenseUrl(buildExpenseSheetDetailUrl(ticketReturnContext.sheetId));
        return;
      }
      markResetFiltersReturn();
      navigateToExpenseUrl("/Gastos/Tickets");
    },
    openConfirm,
    closeConfirm
  });
  const { openLineDetail, resolveClickableCard, openFile, handleOpenExpenseSheet } = useExpenseTicketDetailInteractions({
    fileId,
    contextSheetId,
    isFromExpenseLine,
    isFromExpenseSheetCreate,
    isFromSheetLink,
    headerExpenseSheetId: safeText(header?.hojaGastosIdDisplay),
    isEditing,
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ExpenseTicketDetailView_default, { modal: detailView.modal, preview: detailView.preview, content: detailView.content });
};
var ExpenseTicketDetailPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(VisitasPageProviders_default, { enableExpenseManagement: true, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ExpenseTicketDetailPageContent, {}) });
};
var mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-ticket-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ExpenseTicketDetailPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseTicketDetailPage_default = ExpenseTicketDetailPage;
export {
  ExpenseTicketDetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFJvdXRlQ29udGV4dC50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5LnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0UHJldmlld1V0aWxzLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5lc0xpc3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0U3RpY2t5UHJldmlldy50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsVmlldy50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcclxuaW1wb3J0IHsgdXNlQXV0aENvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcclxuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcclxuaW1wb3J0IHsgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBpc01hbmFnaW5nT3RoZXJFeHBlbnNlVXNlciB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTWFuYWdlZFVzZXJTY29wZS50c1wiO1xyXG5pbXBvcnQgeyBtYXBXaW5kb3dFbnVtT3B0aW9ucywgdHlwZSBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB7IGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3IgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXkudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3IGZyb20gXCIuL0V4cGVuc2VUaWNrZXREZXRhaWxWaWV3LnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlIH0gZnJvbSBcIi4uL3VzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWwgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciwgRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuXHJcbmNvbnN0IEFMTE9XRURfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XHJcbmNvbnN0IExJTkVTX1BBR0VfU0laRSA9IDY7XHJcbmNvbnN0IEdBU1RPX1RZUEVfTEFCRUxfS0VZUzogUmVjb3JkPG51bWJlciwgeyBrZXk6IHN0cmluZzsgZmFsbGJhY2s6IHN0cmluZyB9PiA9IHtcclxuICAwOiB7IGtleTogXCJFbnVtX05vbmVcIiwgZmFsbGJhY2s6IFwiTm9uZVwiIH0sXHJcbiAgMTogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfUGVhamVcIiwgZmFsbGJhY2s6IFwiUGVhamVcIiB9LFxyXG4gIDI6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1BhcmtpbmdcIiwgZmFsbGJhY2s6IFwiUGFya2luZ1wiIH0sXHJcbiAgMzogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfS21cIiwgZmFsbGJhY2s6IFwiS21cIiB9LFxyXG4gIDQ6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0Rlc2F5dW5vXCIsIGZhbGxiYWNrOiBcIkRlc2F5dW5vXCIgfSxcclxuICA1OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9Db21pZGFcIiwgZmFsbGJhY2s6IFwiQ29taWRhXCIgfSxcclxuICA2OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9DZW5hXCIsIGZhbGxiYWNrOiBcIkNlbmFcIiB9LFxyXG4gIDc6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0hvdGVsXCIsIGZhbGxiYWNrOiBcIkhvdGVsXCIgfSxcclxuICA4OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9WYXJpb3NcIiwgZmFsbGJhY2s6IFwiVmFyaW9zXCIgfSxcclxuICAxNDogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfVGF4aVwiLCBmYWxsYmFjazogXCJUYXhpXCIgfSxcclxufTtcclxuXHJcbmNvbnN0IHBhZ2VkU2xpY2UgPSA8VCw+KGl0ZW1zOiBUW10sIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcik6IFRbXSA9PiB7XHJcbiAgaWYgKCFpdGVtcy5sZW5ndGgpIHJldHVybiBbXTtcclxuICBjb25zdCBzYWZlUGFnZSA9IE1hdGgubWF4KDEsIHBhZ2UpO1xyXG4gIGNvbnN0IHN0YXJ0ID0gKHNhZmVQYWdlIC0gMSkgKiBwYWdlU2l6ZTtcclxuICByZXR1cm4gaXRlbXMuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgcGFnZVNpemUpO1xyXG59O1xyXG5cclxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxyXG5jb25zdCBib290c3RyYXBFeHBlbnNlQXBpQXV0aCA9ICgpID0+IHtcclxuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCh7XHJcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcclxuICAgIGVudHJhT2lkOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxyXG4gICAgYXBwQ29kZTogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRGYWxsYmFja0dhc3RvVHlwZU9wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcclxuICByZXR1cm4gT2JqZWN0LmVudHJpZXMoR0FTVE9fVFlQRV9MQUJFTF9LRVlTKVxyXG4gICAgLm1hcCgoW2NvZGUsIGNmZ10pID0+ICh7XHJcbiAgICAgIHZhbHVlOiBTdHJpbmcoY29kZSksXHJcbiAgICAgIHRleHQ6IGluZFQoY2ZnLmtleSwgY2ZnLmZhbGxiYWNrKSxcclxuICAgIH0pKVxyXG4gICAgLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiBOdW1iZXIobGVmdC52YWx1ZSkgLSBOdW1iZXIocmlnaHQudmFsdWUpKTtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbE1vZGFsVmlldyA9ICh7XHJcbiAgbW9kYWwsXHJcbiAgbW9kYWxDb25maXJtVGV4dCxcclxuICBtb2RhbENhbmNlbFRleHQsXHJcbiAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICBidXN5LFxyXG4gIG1vZGFsRXJyb3IsXHJcbiAgc3RhdHVzLFxyXG4gIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcclxuICBjbG9zZUNvbmZpcm0sXHJcbn06IHtcclxuICBtb2RhbDoge1xyXG4gICAgb3BlbjogYm9vbGVhbjtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBzaG93Q2FuY2VsOiBib29sZWFuO1xyXG4gICAgc2hvd0NvbmZpcm06IGJvb2xlYW47XHJcbiAgfTtcclxuICBtb2RhbENvbmZpcm1UZXh0OiBzdHJpbmc7XHJcbiAgbW9kYWxDYW5jZWxUZXh0OiBzdHJpbmc7XHJcbiAgbW9kYWxMb2FkaW5nVGV4dDogc3RyaW5nO1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxFcnJvcjogc3RyaW5nO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybTogKCkgPT4gdm9pZDtcclxuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbn0pID0+ICh7XHJcbiAgb3BlbjogbW9kYWwub3BlbixcclxuICB0aXRsZTogbW9kYWwudGl0bGUsXHJcbiAgbWVzc2FnZTogbW9kYWwubWVzc2FnZSxcclxuICBjb25maXJtVGV4dDogbW9kYWxDb25maXJtVGV4dCxcclxuICBjYW5jZWxUZXh0OiBtb2RhbENhbmNlbFRleHQsXHJcbiAgbG9hZGluZ1RleHQ6IG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgc2hvd0NhbmNlbDogbW9kYWwuc2hvd0NhbmNlbCxcclxuICBzaG93Q29uZmlybTogbW9kYWwuc2hvd0NvbmZpcm0sXHJcbiAgYnVzeSxcclxuICBlcnJvcjogbW9kYWxFcnJvcixcclxuICBzdGF0dXMsXHJcbiAgb25Db25maXJtOiBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgb25DYW5jZWw6IGNsb3NlQ29uZmlybSxcclxufSk7XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3VmlldyA9ICh7XHJcbiAgcHJldmlld09wZW4sXHJcbiAgcHJldmlld0J1c3ksXHJcbiAgcHJldmlld0Vycm9yLFxyXG4gIHByZXZpZXdJbWFnZVVybCxcclxuICBwcmV2aWV3QWx0VGV4dCxcclxuICBwcmV2aWV3U2NhbGUsXHJcbiAgcHJldmlld1RyYW5zbGF0ZSxcclxuICBwcmV2aWV3U3VyZmFjZVJlZixcclxuICBjbG9zZVByZXZpZXcsXHJcbiAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcclxuICBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxuICBoYW5kbGVQcmV2aWV3V2hlZWwsXHJcbn06IHtcclxuICBwcmV2aWV3T3BlbjogYm9vbGVhbjtcclxuICBwcmV2aWV3QnVzeTogYm9vbGVhbjtcclxuICBwcmV2aWV3RXJyb3I6IHN0cmluZztcclxuICBwcmV2aWV3SW1hZ2VVcmw6IHN0cmluZztcclxuICBwcmV2aWV3QWx0VGV4dDogc3RyaW5nO1xyXG4gIHByZXZpZXdTY2FsZTogbnVtYmVyO1xyXG4gIHByZXZpZXdUcmFuc2xhdGU6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfTtcclxuICBwcmV2aWV3U3VyZmFjZVJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgY2xvc2VQcmV2aWV3OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bjogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZTogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgaGFuZGxlUHJldmlld1doZWVsOiAoZXZlbnQ6IFJlYWN0LldoZWVsRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG59KSA9PiAoe1xyXG4gIG9wZW46IHByZXZpZXdPcGVuLFxyXG4gIGJ1c3k6IHByZXZpZXdCdXN5LFxyXG4gIGVycm9yOiBwcmV2aWV3RXJyb3IsXHJcbiAgaW1hZ2VVcmw6IHByZXZpZXdJbWFnZVVybCxcclxuICBpbWFnZUFsdDogcHJldmlld0FsdFRleHQsXHJcbiAgc2NhbGU6IHByZXZpZXdTY2FsZSxcclxuICB0cmFuc2xhdGU6IHByZXZpZXdUcmFuc2xhdGUsXHJcbiAgc3VyZmFjZVJlZjogcHJldmlld1N1cmZhY2VSZWYsXHJcbiAgb25DbG9zZTogY2xvc2VQcmV2aWV3LFxyXG4gIG9uUG9pbnRlckRvd246IGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcclxuICBvblBvaW50ZXJNb3ZlOiBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXHJcbiAgb25Qb2ludGVyRW5kOiBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxuICBvbldoZWVsOiBoYW5kbGVQcmV2aWV3V2hlZWwsXHJcbn0pO1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXcgPSAoe1xyXG4gIGlzTG9hZGluZyxcclxuICBlcnJvck1lc3NhZ2UsXHJcbiAgaGVhZGVyLFxyXG4gIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gIHByZXZpZXdCdXN5LFxyXG4gIHByZXZpZXdFcnJvcixcclxuICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgcHJldmlld0FsdFRleHQsXHJcbiAgb3BlbkZpbGUsXHJcbiAgc3RhdHVzTGFiZWwsXHJcbiAgZ2FzdG9UeXBlTGFiZWwsXHJcbiAgdG90YWxBbW91bnRUZXh0LFxyXG4gIHRyYW5zRGF0ZVRleHQsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkcmFmdEdhc3RvVHlwZSxcclxuICBnYXN0b1R5cGVJbnZhbGlkLFxyXG4gIGdhc3RvVHlwZUlucHV0UmVmLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGN1cnJlbmN5Q29kZUludmFsaWQsXHJcbiAgY3VycmVuY3lJbnB1dFJlZixcclxuICBkcmFmdFRyYW5zRGF0ZSxcclxuICBkcmFmdFVybEZpbGUsXHJcbiAgZHJhZnRGaWxlTmFtZSxcclxuICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gIHNldERyYWZ0R2FzdG9UeXBlLFxyXG4gIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIHNldERyYWZ0VHJhbnNEYXRlLFxyXG4gIGlzRnJvbVNoZWV0TGluayxcclxuICBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0LFxyXG4gIHZpc2libGVMaW5lcyxcclxuICB0b3RhbExpbmVQYWdlcyxcclxuICBsaW5lUGFnZSxcclxuICBzYWZlQ3VycmVuY3lDb2RlLFxyXG4gIHBhZ2luYXRpb25MYWJlbHMsXHJcbiAgbGluZUNvbnRhaW5lclJlZixcclxuICBzZXRMaW5lUGFnZSxcclxuICBvcGVuTGluZURldGFpbCxcclxuICBzdGF0dXMsXHJcbn06IHtcclxuICBpc0xvYWRpbmc6IGJvb2xlYW47XHJcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbDtcclxuICBzaG93U3RpY2t5UHJldmlldzogYm9vbGVhbjtcclxuICBwcmV2aWV3QnVzeTogYm9vbGVhbjtcclxuICBwcmV2aWV3RXJyb3I6IHN0cmluZztcclxuICBwcmV2aWV3SW1hZ2VVcmw6IHN0cmluZztcclxuICBwcmV2aWV3QWx0VGV4dDogc3RyaW5nO1xyXG4gIG9wZW5GaWxlOiAoKSA9PiB2b2lkO1xyXG4gIHN0YXR1c0xhYmVsOiBzdHJpbmc7XHJcbiAgZ2FzdG9UeXBlTGFiZWw6IHN0cmluZztcclxuICB0b3RhbEFtb3VudFRleHQ6IHN0cmluZztcclxuICB0cmFuc0RhdGVUZXh0OiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGdhc3RvVHlwZU9wdGlvbnM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXTtcclxuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcclxuICBnYXN0b1R5cGVJbnZhbGlkOiBib29sZWFuO1xyXG4gIGdhc3RvVHlwZUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZDogYm9vbGVhbjtcclxuICBjdXJyZW5jeUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XHJcbiAgZHJhZnRGaWxlTmFtZTogc3RyaW5nO1xyXG4gIHNldERyYWZ0RGVzY3JpcHRpb246ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldERyYWZ0R2FzdG9UeXBlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXREcmFmdEN1cnJlbmN5Q29kZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0RHJhZnRUcmFuc0RhdGU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGlzRnJvbVNoZWV0TGluazogYm9vbGVhbjtcclxuICBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0OiAoKSA9PiB2b2lkO1xyXG4gIHZpc2libGVMaW5lczogRXhwZW5zZVRpY2tldERldGFpbExpbmVbXTtcclxuICB0b3RhbExpbmVQYWdlczogbnVtYmVyO1xyXG4gIGxpbmVQYWdlOiBudW1iZXI7XHJcbiAgc2FmZUN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIHBhZ2luYXRpb25MYWJlbHM6IHtcclxuICAgIGZpcnN0OiBzdHJpbmc7XHJcbiAgICBwcmV2OiBzdHJpbmc7XHJcbiAgICBuZXh0OiBzdHJpbmc7XHJcbiAgICBsYXN0OiBzdHJpbmc7XHJcbiAgfTtcclxuICBsaW5lQ29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBzZXRMaW5lUGFnZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcclxuICBvcGVuTGluZURldGFpbDogKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG59KSA9PiAoe1xyXG4gIGlzTG9hZGluZyxcclxuICBlcnJvck1lc3NhZ2UsXHJcbiAgaGVhZGVyLFxyXG4gIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gIHByZXZpZXdCdXN5LFxyXG4gIHByZXZpZXdFcnJvcixcclxuICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgcHJldmlld0ZpbGVOYW1lOiBwcmV2aWV3QWx0VGV4dCxcclxuICBwcmV2aWV3QWx0VGV4dCxcclxuICBvbk9wZW5QcmV2aWV3OiBvcGVuRmlsZSxcclxuICBzdGF0dXNMYWJlbCxcclxuICBnYXN0b1R5cGVMYWJlbCxcclxuICB0b3RhbEFtb3VudFRleHQsXHJcbiAgdHJhbnNEYXRlVGV4dCxcclxuICBpc0VkaXRpbmcsXHJcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRyYWZ0R2FzdG9UeXBlLFxyXG4gIGdhc3RvVHlwZUludmFsaWQsXHJcbiAgZ2FzdG9UeXBlSW5wdXRSZWYsXHJcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICBjdXJyZW5jeUlucHV0UmVmLFxyXG4gIGRyYWZ0VHJhbnNEYXRlLFxyXG4gIGRyYWZ0VXJsRmlsZSxcclxuICBkcmFmdEZpbGVOYW1lLFxyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlOiBzZXREcmFmdEdhc3RvVHlwZSxcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICBvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlOiBzZXREcmFmdFRyYW5zRGF0ZSxcclxuICBvbk9wZW5GaWxlOiBvcGVuRmlsZSxcclxuICBvbk9wZW5FeHBlbnNlU2hlZXQ6IGlzRnJvbVNoZWV0TGluayA/IHVuZGVmaW5lZCA6IGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQsXHJcbiAgdmlzaWJsZUxpbmVzLFxyXG4gIHRvdGFsTGluZVBhZ2VzLFxyXG4gIGxpbmVQYWdlLFxyXG4gIGN1cnJlbmN5Q29kZTogc2FmZUN1cnJlbmN5Q29kZSxcclxuICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gIGNvbnRhaW5lclJlZjogbGluZUNvbnRhaW5lclJlZixcclxuICBvbkxpbmVQYWdlQ2hhbmdlOiBzZXRMaW5lUGFnZSxcclxuICBvbk9wZW5MaW5lOiBvcGVuTGluZURldGFpbCxcclxuICBzdGF0dXMsXHJcbn0pO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3QXJncyA9IFBhcmFtZXRlcnM8dHlwZW9mIGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbE1vZGFsVmlldz5bMF07XHJcbnR5cGUgRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3QXJncyA9IFBhcmFtZXRlcnM8dHlwZW9mIGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3PlswXTtcclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXdBcmdzID0gUGFyYW1ldGVyczx0eXBlb2YgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXc+WzBdO1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUGFnZVZpZXdNb2RlbCA9ICh7XHJcbiAgbW9kYWxBcmdzLFxyXG4gIHByZXZpZXdBcmdzLFxyXG4gIGNvbnRlbnRBcmdzLFxyXG59OiB7XHJcbiAgbW9kYWxBcmdzOiBFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3QXJncztcclxuICBwcmV2aWV3QXJnczogRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3QXJncztcclxuICBjb250ZW50QXJnczogRXhwZW5zZVRpY2tldERldGFpbENvbnRlbnRWaWV3QXJncztcclxufSkgPT4gKHtcclxuICBtb2RhbDogYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3KG1vZGFsQXJncyksXHJcbiAgcHJldmlldzogYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1ZpZXcocHJldmlld0FyZ3MpLFxyXG4gIGNvbnRlbnQ6IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbENvbnRlbnRWaWV3KGNvbnRlbnRBcmdzKSxcclxufSk7XHJcblxyXG4vLyBLZWVwcyBmaWx0ZXIgY2FjaGUgd2lyaW5nIGFuZCBiYWNrIG5hdmlnYXRpb24gb3V0c2lkZSB0aGUgcGFnZSBjb250YWluZXIgYm9keS5cclxuY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbE5hdmlnYXRpb25TdGF0ZSA9ICh7XHJcbiAgZmlsZUlkLFxyXG4gIGRldGFpbE9yaWdpbixcclxuICBoZWFkZXJUcmFuc0RhdGUsXHJcbiAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxufToge1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGRldGFpbE9yaWdpbjogc3RyaW5nO1xyXG4gIGhlYWRlclRyYW5zRGF0ZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0OiBSZXR1cm5UeXBlPHR5cGVvZiB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0PltcInRpY2tldFJldHVybkNvbnRleHRcIl07XHJcbn0pID0+IHtcclxuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgc2F2ZUNhY2hlZFN0YXRlLCBtYXJrUmVzZXRGaWx0ZXJzUmV0dXJuLCBjbGVhckNhY2hlZFN0YXRlIH0gPSB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlKCk7XHJcblxyXG4gIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxCYWNrTmF2aWdhdGlvbih7XHJcbiAgICBmaWxlSWQsXHJcbiAgICBkZXRhaWxPcmlnaW4sXHJcbiAgICBoZWFkZXJUcmFuc0RhdGUsXHJcbiAgICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gICAgcmVhZENhY2hlZFN0YXRlLFxyXG4gICAgc2F2ZUNhY2hlZFN0YXRlLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbWFya1Jlc2V0RmlsdGVyc1JldHVybixcclxuICAgIGNsZWFyQ2FjaGVkU3RhdGUsXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFJ1bnMgdGhlIG9uZS1zaG90IGF1dG8gZWRpdCB0cmFuc2l0aW9uIGZvciBsaW5rZWQgY29udGV4dHMgYWZ0ZXIgZGV0YWlsIGRhdGEgaXMgcmVhZHkuXHJcbmNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxBdXRvRWRpdCA9ICh7XHJcbiAgYXV0b0VkaXRNb2RlLFxyXG4gIGlzRnJvbUV4cGVuc2VMaW5lLFxyXG4gIGlzRnJvbVNoZWV0TGluayxcclxuICBpc0xvYWRpbmcsXHJcbiAgaGVhZGVyLFxyXG4gIGhhbmRsZUVuYWJsZUVkaXQsXHJcbn06IHtcclxuICBhdXRvRWRpdE1vZGU6IGJvb2xlYW47XHJcbiAgaXNGcm9tRXhwZW5zZUxpbmU6IGJvb2xlYW47XHJcbiAgaXNGcm9tU2hlZXRMaW5rOiBib29sZWFuO1xyXG4gIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xyXG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XHJcbn0pID0+IHtcclxuICBjb25zdCBhdXRvRWRpdEF0dGVtcHRlZFJlZiA9IHVzZVJlZihmYWxzZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWF1dG9FZGl0TW9kZSB8fCBpc0Zyb21FeHBlbnNlTGluZSB8fCBpc0Zyb21TaGVldExpbmsgfHwgYXV0b0VkaXRBdHRlbXB0ZWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgaWYgKGlzTG9hZGluZyB8fCAhaGVhZGVyKSByZXR1cm47XHJcblxyXG4gICAgYXV0b0VkaXRBdHRlbXB0ZWRSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICBoYW5kbGVFbmFibGVFZGl0KCk7XHJcbiAgfSwgW2F1dG9FZGl0TW9kZSwgaGFuZGxlRW5hYmxlRWRpdCwgaGVhZGVyLCBpc0Zyb21FeHBlbnNlTGluZSwgaXNGcm9tU2hlZXRMaW5rLCBpc0xvYWRpbmddKTtcclxufTtcclxuXHJcbi8vIFJlc29sdmVzIHBlcm1pc3Npb24gYW5kIGFjdGluZy11c2VyIHN0YXRlIHNvIHRoZSBwYWdlIGNvbnRhaW5lciBzdGF5cyBmb2N1c2VkIG9uIG9yY2hlc3RyYXRpb24uXHJcbmNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQZXJtaXNzaW9uU3RhdGUgPSAoe1xyXG4gIGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSxcclxufToge1xyXG4gIGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZTogYm9vbGVhbjtcclxufSkgPT4ge1xyXG4gIGNvbnN0IHsgY2FuTWFuYWdlT3RoZXJVc2VycywgY3VycmVudEF4VXNlcklkLCBzZWxlY3RlZE1hbmFnZWRVc2VySWQsIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSB9ID0gdXNlQXV0aENvbnRleHQoKTtcclxuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIlZpZXdcIik7XHJcbiAgY29uc3QgY2FuRWRpdFRpY2tldEJ5TW9kdWxlID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJFZGl0XCIpO1xyXG4gIGNvbnN0IGNhbkRlbGV0ZVRpY2tldEJ5TW9kdWxlID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJGdWxsQWNjZXNzXCIpO1xyXG4gIGNvbnN0IGlzTWFuYWdpbmdPdGhlclVzZXIgPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlVXNlcih7XHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGFzQWNjZXNzLFxyXG4gICAgY2FuRWRpdFRpY2tldDogY2FuRWRpdFRpY2tldEJ5TW9kdWxlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgY2FuRGVsZXRlVGlja2V0OiBjYW5EZWxldGVUaWNrZXRCeU1vZHVsZSAmJiAhaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgIGFsbG93QXNzaWduZWREcmFmdEVkaXQ6IGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSxcclxuICAgIGlzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIE93bnMgdGhlIHRpY2tldCBkZXRhaWwgcGFnZSBvcmNoZXN0cmF0aW9uIHdoaWxlIHRoZSBjb21wb25lbnQgc3RheXMgdGhpbiBmb3IgcmVuZGVyaW5nLlxyXG5jb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUGFnZVZpZXdNb2RlbCA9ICgpID0+IHtcclxuICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1RJQ0tFVF9GSUxFX0lEX18pO1xyXG4gIGNvbnN0IGxpbmVDb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCB7XHJcbiAgICBhdXRvRWRpdE1vZGUsXHJcbiAgICBkZXRhaWxPcmlnaW4sXHJcbiAgICBjb250ZXh0U2hlZXRJZCxcclxuICAgIGNvbnRleHRMaW5lUmVjSWQsXHJcbiAgICBpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUsXHJcbiAgICBpc0Zyb21FeHBlbnNlTGluZSxcclxuICAgIGlzRnJvbVNoZWV0TGluayxcclxuICAgIHRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQoKTtcclxuICBjb25zdCB7XHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBjYW5FZGl0VGlja2V0LFxyXG4gICAgY2FuRGVsZXRlVGlja2V0LFxyXG4gICAgYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCxcclxuICAgIGlzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQZXJtaXNzaW9uU3RhdGUoe1xyXG4gICAgaXNGcm9tRXhwZW5zZVNoZWV0Q3JlYXRlLFxyXG4gIH0pO1xyXG4gIGNvbnN0IGdhc3RvVHlwZU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4ge1xyXG4gICAgY29uc3Qgc291cmNlID0gQXJyYXkuaXNBcnJheSh3aW5kb3cuX19FWFBFTlNFX0dBU1RPX1RZUEVTX18pID8gd2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fIDogW107XHJcbiAgICBjb25zdCBtYXBwZWQgPSBtYXBXaW5kb3dFbnVtT3B0aW9ucyhzb3VyY2UpLmZpbHRlcigoZW50cnkpID0+IHtcclxuICAgICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKGVudHJ5LnZhbHVlKTtcclxuICAgICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIocGFyc2VkKSAmJiBBTExPV0VEX0dBU1RPX1RZUEVTLmhhcyhwYXJzZWQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKG1hcHBlZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBtYXBwZWQuc29ydCgobGVmdCwgcmlnaHQpID0+IE51bWJlcihsZWZ0LnZhbHVlKSAtIE51bWJlcihyaWdodC52YWx1ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBidWlsZEZhbGxiYWNrR2FzdG9UeXBlT3B0aW9ucygpO1xyXG4gIH0sIFtdKTtcclxuICBjb25zdCBnYXN0b1R5cGVMYWJlbE1hcCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcclxuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIGdhc3RvVHlwZU9wdGlvbnMpIHtcclxuICAgICAgbWFwLnNldChTdHJpbmcob3B0aW9uLnZhbHVlKSwgb3B0aW9uLnRleHQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1hcDtcclxuICB9LCBbZ2FzdG9UeXBlT3B0aW9uc10pO1xyXG4gIGNvbnN0IHsgaGVhZGVyLCBsaW5lcywgaXNMb2FkaW5nLCBlcnJvck1lc3NhZ2UsIHJlbG9hZERldGFpbCB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlKHtcclxuICAgIGhhc0FjY2VzcyxcclxuICAgIGZpbGVJZCxcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gIH0pO1xyXG4gIGNvbnN0IHsgbWFya1Jlc2V0RmlsdGVyc1JldHVybiwgY2xlYXJDYWNoZWRTdGF0ZSB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbE5hdmlnYXRpb25TdGF0ZSh7XHJcbiAgICBmaWxlSWQsXHJcbiAgICBkZXRhaWxPcmlnaW4sXHJcbiAgICBoZWFkZXJUcmFuc0RhdGU6IGhlYWRlcj8udHJhbnNEYXRlLFxyXG4gICAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxuICB9KTtcclxuICBjb25zdCB7XHJcbiAgICBidXN5LFxyXG4gICAgc3RhdHVzLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxFcnJvcixcclxuICAgIGxpbmVQYWdlLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0R2FzdG9UeXBlLFxyXG4gICAgZ2FzdG9UeXBlSW52YWxpZCxcclxuICAgIGdhc3RvVHlwZUlucHV0UmVmLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBjdXJyZW5jeUNvZGVJbnZhbGlkLFxyXG4gICAgY3VycmVuY3lJbnB1dFJlZixcclxuICAgIGRyYWZ0VHJhbnNEYXRlLFxyXG4gICAgZHJhZnRDb21lbnRhcmlvLFxyXG4gICAgZHJhZnRVcmxGaWxlLFxyXG4gICAgZHJhZnRGaWxlTmFtZSxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRHYXN0b1R5cGUsXHJcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIHNldERyYWZ0VHJhbnNEYXRlLFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3Ioe1xyXG4gICAgaGVhZGVyLFxyXG4gICAgbGluZUNvdW50OiBsaW5lcy5sZW5ndGgsXHJcbiAgICBwYWdlU2l6ZTogTElORVNfUEFHRV9TSVpFLFxyXG4gICAgY2FuRWRpdFRpY2tldCxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGFsbG93QXNzaWduZWREcmFmdEVkaXQsXHJcbiAgICBpc0Zyb21TaGVldExpbmssXHJcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICB9KTtcclxuICBjb25zdCB7IHBhZ2luYXRpb25MYWJlbHMsIHByZXZpZXdBbHRUZXh0LCBzdGF0dXNMYWJlbCwgZ2FzdG9UeXBlTGFiZWwsIHRvdGFsQW1vdW50VGV4dCwgdHJhbnNEYXRlVGV4dCB9ID1cclxuICAgIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5KHtcclxuICAgICAgaGVhZGVyLFxyXG4gICAgICBkcmFmdEdhc3RvVHlwZSxcclxuICAgICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICAgIGRyYWZ0VHJhbnNEYXRlLFxyXG4gICAgICBkcmFmdEZpbGVOYW1lLFxyXG4gICAgICBpc0VkaXRpbmcsXHJcbiAgICAgIGdhc3RvVHlwZUxhYmVsTWFwLFxyXG4gICAgfSk7XHJcbiAgY29uc3Qge1xyXG4gICAgc2hvd1N0aWNreVByZXZpZXcsXHJcbiAgICBwcmV2aWV3T3BlbixcclxuICAgIHByZXZpZXdCdXN5LFxyXG4gICAgcHJldmlld0Vycm9yLFxyXG4gICAgcHJldmlld0ltYWdlVXJsLFxyXG4gICAgcHJldmlld1NjYWxlLFxyXG4gICAgcHJldmlld1RyYW5zbGF0ZSxcclxuICAgIHByZXZpZXdTdXJmYWNlUmVmLFxyXG4gICAgb3BlblByZXZpZXcsXHJcbiAgICBjbG9zZVByZXZpZXcsXHJcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24sXHJcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXHJcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxuICAgIGhhbmRsZVByZXZpZXdXaGVlbCxcclxuICB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdQYW5lbCh7XHJcbiAgICBmaWxlSWQsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBkcmFmdFVybEZpbGUsXHJcbiAgICBoZWFkZXJVcmxGaWxlOiBoZWFkZXI/LnVybEZpbGUsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHZpc2libGVMaW5lcyA9IHVzZU1lbW8oKCkgPT4gcGFnZWRTbGljZShsaW5lcywgbGluZVBhZ2UsIExJTkVTX1BBR0VfU0laRSksIFtsaW5lUGFnZSwgbGluZXNdKTtcclxuICBjb25zdCB0b3RhbExpbmVQYWdlcyA9IE1hdGguY2VpbCgobGluZXMubGVuZ3RoIHx8IDApIC8gTElORVNfUEFHRV9TSVpFKTtcclxuXHJcbiAgdXNlRXhwZW5zZVRpY2tldERldGFpbEF1dG9FZGl0KHtcclxuICAgIGF1dG9FZGl0TW9kZSxcclxuICAgIGlzRnJvbUV4cGVuc2VMaW5lLFxyXG4gICAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgaGVhZGVyLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBoYW5kbGVVcGRhdGUsIGhhbmRsZURlbGV0ZSB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9ucyh7XHJcbiAgICBidXN5LFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgY2FuRWRpdFRpY2tldCxcclxuICAgIGNhbkRlbGV0ZVRpY2tldCxcclxuICAgIGZpbGVJZCxcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdEdhc3RvVHlwZSxcclxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICBkcmFmdENvbWVudGFyaW8sXHJcbiAgICBkcmFmdFVybEZpbGUsXHJcbiAgICBkcmFmdEZpbGVOYW1lLFxyXG4gICAgbGlua2VkRXhwZW5zZVNoZWV0SWQ6IGNvbnRleHRTaGVldElkLFxyXG4gICAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0OiBpc0Zyb21FeHBlbnNlTGluZVxyXG4gICAgICA/IHtcclxuICAgICAgICAgIHNoZWV0SWQ6IGNvbnRleHRTaGVldElkLFxyXG4gICAgICAgICAgbGluZVJlY0lkOiBjb250ZXh0TGluZVJlY0lkLFxyXG4gICAgICAgIH1cclxuICAgICAgOiBudWxsLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIG1vZGFsTG9hZGluZ1RleHQsIG1vZGFsQ2FuY2VsVGV4dCwgbW9kYWxDb25maXJtVGV4dCwgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtIH0gPVxyXG4gICAgdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZSh7XHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG1vZGFsRXJyb3IsXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgIH0pO1xyXG5cclxuICBjb25zdCBpc0Fzc2lnbmVkVGlja2V0ID0gaGVhZGVyPy5zdGF0dXMgPT09IDE7XHJcbiAgY29uc3QgaXNDb250ZXh0TG9ja2VkID0gaXNBc3NpZ25lZFRpY2tldCAmJiAhYWxsb3dBc3NpZ25lZERyYWZ0RWRpdDtcclxuICBjb25zdCBjYW5FZGl0VGlja2V0SW5Db250ZXh0ID0gY2FuRWRpdFRpY2tldCAmJiAhaXNGcm9tRXhwZW5zZUxpbmUgJiYgIWlzRnJvbVNoZWV0TGluaztcclxuICBjb25zdCBjYW5EZWxldGVUaWNrZXRJbkNvbnRleHQgPSBjYW5EZWxldGVUaWNrZXQgJiYgIWlzRnJvbUV4cGVuc2VMaW5lICYmICFpc0Zyb21TaGVldExpbms7XHJcbiAgY29uc3QgdGlja2V0VG9wYmFyQWN0aW9uTW9kZTogXCJkZWZhdWx0XCIgfCBcInZpZXdfb25seVwiID1cclxuICAgIGlzTWFuYWdpbmdPdGhlclVzZXIgfHwgaXNGcm9tRXhwZW5zZUxpbmUgfHwgaXNGcm9tU2hlZXRMaW5rID8gXCJ2aWV3X29ubHlcIiA6IFwiZGVmYXVsdFwiO1xyXG5cclxuICB1c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucyh7XHJcbiAgICBidXN5LFxyXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNMb2NrZWQ6IGlzQ29udGV4dExvY2tlZCxcclxuICAgIGFjdGlvbk1vZGU6IHRpY2tldFRvcGJhckFjdGlvbk1vZGUsXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5OiBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgICBjYW5FZGl0VGlja2V0OiBjYW5FZGl0VGlja2V0SW5Db250ZXh0LFxyXG4gICAgY2FuRGVsZXRlVGlja2V0OiBjYW5EZWxldGVUaWNrZXRJbkNvbnRleHQsXHJcbiAgICBmaWxlSWQsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBvblNhdmVTdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgIHZvaWQgcmVsb2FkRGV0YWlsKCk7XHJcbiAgICB9LFxyXG4gICAgb25EZWxldGVTdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgIGlmICh0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkKSB7XHJcbiAgICAgICAgY2xlYXJDYWNoZWRTdGF0ZSgpO1xyXG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsKHRpY2tldFJldHVybkNvbnRleHQuc2hlZXRJZCkpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbWFya1Jlc2V0RmlsdGVyc1JldHVybigpO1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvVGlja2V0c1wiKTtcclxuICAgIH0sXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBvcGVuTGluZURldGFpbCwgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsIG9wZW5GaWxlLCBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0IH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsSW50ZXJhY3Rpb25zKHtcclxuICAgIGZpbGVJZCxcclxuICAgIGNvbnRleHRTaGVldElkLFxyXG4gICAgaXNGcm9tRXhwZW5zZUxpbmUsXHJcbiAgICBpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUsXHJcbiAgICBpc0Zyb21TaGVldExpbmssXHJcbiAgICBoZWFkZXJFeHBlbnNlU2hlZXRJZDogc2FmZVRleHQoaGVhZGVyPy5ob2phR2FzdG9zSWREaXNwbGF5KSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGxpbmVDb250YWluZXJSZWYsXHJcbiAgICBvcGVuUHJldmlldyxcclxuICAgIHRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgfSk7XHJcblxyXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoe1xyXG4gICAgY29udGFpbmVyUmVmOiBsaW5lQ29udGFpbmVyUmVmLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgaXRlbXM6IHZpc2libGVMaW5lcyxcclxuICAgIHJlc29sdmVDbGlja2FibGVDYXJkLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBkZXRhaWxWaWV3ID0gYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUGFnZVZpZXdNb2RlbCh7XHJcbiAgICBtb2RhbEFyZ3M6IHtcclxuICAgICAgbW9kYWwsXHJcbiAgICAgIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgICAgIG1vZGFsQ2FuY2VsVGV4dCxcclxuICAgICAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICAgICAgYnVzeSxcclxuICAgICAgbW9kYWxFcnJvcixcclxuICAgICAgc3RhdHVzLFxyXG4gICAgICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgICAgIGNsb3NlQ29uZmlybSxcclxuICAgIH0sXHJcbiAgICBwcmV2aWV3QXJnczoge1xyXG4gICAgICBwcmV2aWV3T3BlbixcclxuICAgICAgcHJldmlld0J1c3ksXHJcbiAgICAgIHByZXZpZXdFcnJvcixcclxuICAgICAgcHJldmlld0ltYWdlVXJsLFxyXG4gICAgICBwcmV2aWV3QWx0VGV4dCxcclxuICAgICAgcHJldmlld1NjYWxlLFxyXG4gICAgICBwcmV2aWV3VHJhbnNsYXRlLFxyXG4gICAgICBwcmV2aWV3U3VyZmFjZVJlZixcclxuICAgICAgY2xvc2VQcmV2aWV3LFxyXG4gICAgICBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24sXHJcbiAgICAgIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcclxuICAgICAgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXHJcbiAgICAgIGhhbmRsZVByZXZpZXdXaGVlbCxcclxuICAgIH0sXHJcbiAgICBjb250ZW50QXJnczoge1xyXG4gICAgICBpc0xvYWRpbmcsXHJcbiAgICAgIGVycm9yTWVzc2FnZSxcclxuICAgICAgaGVhZGVyLFxyXG4gICAgICBzaG93U3RpY2t5UHJldmlldyxcclxuICAgICAgcHJldmlld0J1c3ksXHJcbiAgICAgIHByZXZpZXdFcnJvcixcclxuICAgICAgcHJldmlld0ltYWdlVXJsLFxyXG4gICAgICBwcmV2aWV3QWx0VGV4dCxcclxuICAgICAgb3BlbkZpbGUsXHJcbiAgICAgIHN0YXR1c0xhYmVsLFxyXG4gICAgICBnYXN0b1R5cGVMYWJlbCxcclxuICAgICAgdG90YWxBbW91bnRUZXh0LFxyXG4gICAgICB0cmFuc0RhdGVUZXh0LFxyXG4gICAgICBpc0VkaXRpbmcsXHJcbiAgICAgIGdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICAgIGRyYWZ0R2FzdG9UeXBlLFxyXG4gICAgICBnYXN0b1R5cGVJbnZhbGlkLFxyXG4gICAgICBnYXN0b1R5cGVJbnB1dFJlZixcclxuICAgICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICAgIGN1cnJlbmN5Q29kZUludmFsaWQsXHJcbiAgICAgIGN1cnJlbmN5SW5wdXRSZWYsXHJcbiAgICAgIGRyYWZ0VHJhbnNEYXRlLFxyXG4gICAgICBkcmFmdFVybEZpbGUsXHJcbiAgICAgIGRyYWZ0RmlsZU5hbWUsXHJcbiAgICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICAgIHNldERyYWZ0R2FzdG9UeXBlLFxyXG4gICAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgICAgc2V0RHJhZnRUcmFuc0RhdGUsXHJcbiAgICAgIGlzRnJvbVNoZWV0TGluayxcclxuICAgICAgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCxcclxuICAgICAgdmlzaWJsZUxpbmVzLFxyXG4gICAgICB0b3RhbExpbmVQYWdlcyxcclxuICAgICAgbGluZVBhZ2UsXHJcbiAgICAgIHNhZmVDdXJyZW5jeUNvZGU6IGlzRWRpdGluZyA/IGRyYWZ0Q3VycmVuY3lDb2RlIDogc2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpLFxyXG4gICAgICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gICAgICBsaW5lQ29udGFpbmVyUmVmLFxyXG4gICAgICBzZXRMaW5lUGFnZSxcclxuICAgICAgb3BlbkxpbmVEZXRhaWwsXHJcbiAgICAgIHN0YXR1cyxcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBkZXRhaWxWaWV3O1xyXG59O1xyXG5cclxuY29uc3QgRXhwZW5zZVRpY2tldERldGFpbFBhZ2VDb250ZW50ID0gKCkgPT4ge1xyXG4gIGNvbnN0IGRldGFpbFZpZXcgPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUGFnZVZpZXdNb2RlbCgpO1xyXG5cclxuICByZXR1cm4gPEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3IG1vZGFsPXtkZXRhaWxWaWV3Lm1vZGFsfSBwcmV2aWV3PXtkZXRhaWxWaWV3LnByZXZpZXd9IGNvbnRlbnQ9e2RldGFpbFZpZXcuY29udGVudH0gLz47XHJcbn07XHJcblxyXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2UgdGlja2V0IGRldGFpbC5cclxuY29uc3QgRXhwZW5zZVRpY2tldERldGFpbFBhZ2UgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cclxuICAgICAgPEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlQ29udGVudCAvPlxyXG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cclxuICApO1xyXG59O1xyXG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XHJcbiAgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGgoKTtcclxuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2UtdGlja2V0LWRldGFpbC1yb290XCIpO1xyXG4gIGlmICghcm9vdEVsKSByZXR1cm47XHJcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxFeHBlbnNlVGlja2V0RGV0YWlsUGFnZSAvPik7XHJcbn07XHJcblxyXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlO1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciwgRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgbWFwRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciwgbWFwRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlQXJncyA9IHtcclxuICBoYXNBY2Nlc3M6IGJvb2xlYW47XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBPd25zIHJlYWQgc3RhdGUgYW5kIEFQSSBsb2FkaW5nIGJlaGF2aW9yIGZvciB0aGUgdGlja2V0IGRldGFpbCBwYWdlLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlID0gKHsgaGFzQWNjZXNzLCBmaWxlSWQsIG9uRm9yYmlkZGVuIH06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZUFyZ3MpID0+IHtcclxuICBjb25zdCBbaGVhZGVyLCBzZXRIZWFkZXJdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtsaW5lcywgc2V0TGluZXNdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldERldGFpbExpbmVbXT4oW10pO1xyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCByZWxvYWREZXRhaWwgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoIWhhc0FjY2Vzcykge1xyXG4gICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2FmZUZpbGVJZCA9IHNhZmVUZXh0KGZpbGVJZCk7XHJcbiAgICBpZiAoIXNhZmVGaWxlSWQpIHtcclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJUaWNrZXRzX0RldGFpbF9Ob3RGb3VuZFwiLCBcIlRpY2tldCB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SXNMb2FkaW5nKHRydWUpO1xyXG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXQoc2FmZUZpbGVJZCwge1xyXG4gICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lk1lc3NhZ2UgfHwgaW5kVChcIlRpY2tldHNfRGV0YWlsX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldCBkZXRhaWwuXCIpKTtcclxuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xyXG4gICAgICBjb25zdCBzZWxlY3RlZCA9XHJcbiAgICAgICAgaXRlbXMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5Py5GaWxlSWQpLnRvVXBwZXJDYXNlKCkgPT09IHNhZmVGaWxlSWQudG9VcHBlckNhc2UoKSkgfHwgaXRlbXNbMF0gfHwgbnVsbDtcclxuXHJcbiAgICAgIGlmICghc2VsZWN0ZWQpIHtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIlRpY2tldHNfRGV0YWlsX05vdEZvdW5kXCIsIFwiVGlja2V0IHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbWFwcGVkSGVhZGVyID0gbWFwRXhwZW5zZVRpY2tldERldGFpbEhlYWRlcihzZWxlY3RlZCk7XHJcbiAgICAgIGNvbnN0IG1hcHBlZExpbmVzID0gKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWQuTGluZXMpID8gc2VsZWN0ZWQuTGluZXMgOiBbXSkubWFwKChsaW5lKSA9PlxyXG4gICAgICAgIG1hcEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lKGxpbmUpXHJcbiAgICAgICk7XHJcbiAgICAgIHNldEhlYWRlcihtYXBwZWRIZWFkZXIpO1xyXG4gICAgICBzZXRMaW5lcyhtYXBwZWRMaW5lcyk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldEVycm9yTWVzc2FnZShlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJUaWNrZXRzX0RldGFpbF9Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXQgZGV0YWlsLlwiKSk7XHJcbiAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbZmlsZUlkLCBoYXNBY2Nlc3MsIG9uRm9yYmlkZGVuXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICB2b2lkIHJlbG9hZERldGFpbCgpO1xyXG4gIH0sIFtyZWxvYWREZXRhaWxdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGhlYWRlcixcclxuICAgIGxpbmVzLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgcmVsb2FkRGV0YWlsLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCB9IGZyb20gXCIuLi8uLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbiB9IGZyb20gXCIuLi8uLi9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGRlbGV0ZUV4cGVuc2VTaGVldExpbmUsXHJcbiAgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0LFxyXG4gIGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldEZpbGUsXHJcbiAgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwsXHJcbiAgdXBkYXRlRXhwZW5zZVNoZWV0VGlja2V0LFxyXG59IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UsIHRvRXhwZW5zZUFwaURkTW1ZeXl5IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuXHJcbnR5cGUgRGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0ID0ge1xyXG4gIHNoZWV0SWQ6IHN0cmluZztcclxuICBsaW5lUmVjSWQ6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgY2FuRWRpdFRpY2tldDogYm9vbGVhbjtcclxuICBjYW5EZWxldGVUaWNrZXQ6IGJvb2xlYW47XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGRyYWZ0R2FzdG9UeXBlOiBzdHJpbmc7XHJcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIGRyYWZ0Q29tZW50YXJpbzogc3RyaW5nO1xyXG4gIGRyYWZ0VXJsRmlsZTogc3RyaW5nO1xyXG4gIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcclxuICBsaW5rZWRFeHBlbnNlU2hlZXRJZD86IHN0cmluZztcclxuICBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQ/OiBEZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQgfCBudWxsO1xyXG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxuICBzZXRTdGF0dXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG59O1xyXG5cclxuY29uc3QgUkVRVUlSRURfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XHJcblxyXG5jb25zdCBwYXJzZU9wdGlvbmFsSW50ZWdlciA9IChyYXc6IHN0cmluZyk6IG51bWJlciB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3IHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlci5wYXJzZUludCh2YWx1ZSwgMTApO1xyXG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgPyBwYXJzZWQgOiB1bmRlZmluZWQ7XHJcbn07XHJcblxyXG4vLyBUcmllcyB0byBpbmZlciBhIHNhZmUgZXh0ZW5zaW9uIGZvciB1cGRhdGUgcGF5bG9hZCBmcm9tIGZpbGUgbmFtZSBvciBVUkwuXHJcbmNvbnN0IHJlc29sdmVUaWNrZXRGaWxlRXh0ZW5zaW9uID0gKGZpbGVOYW1lOiBzdHJpbmcsIHVybEZpbGU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgY29uc3Qgc291cmNlID0gU3RyaW5nKGZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSB8fCBTdHJpbmcodXJsRmlsZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgY29uc3QgbWF0Y2ggPSBzb3VyY2UubWF0Y2goL1xcLihbYS16QS1aMC05XXsxLDEwfSkoPzokfFs/I10pLyk7XHJcbiAgaWYgKCFtYXRjaCB8fCAhbWF0Y2hbMV0pIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgcmV0dXJuIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XHJcbn07XHJcblxyXG5jb25zdCBpc05vdEZvdW5kRXJyb3IgPSAoZXJyb3I6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDA0O1xyXG59O1xyXG5cclxuY29uc3QgaXNNaXNzaW5nVGlja2V0RmlsZU1lc3NhZ2UgPSAobWVzc2FnZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcobWVzc2FnZSB8fCBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhcmNoaXZvIGFzb2NpYWRvXCIpIHx8XHJcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXJjaGl2byBhZGp1bnRvXCIpIHx8XHJcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXNzb2NpYXRlZCBmaWxlXCIpIHx8XHJcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXR0YWNoZWQgZmlsZVwiKVxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBFbmNhcHN1bGF0ZXMgdXBkYXRlIGFuZCBkZWxldGUgbXV0YXRpb25zIGZvciB0aWNrZXQgaGVhZGVyIGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGNhbkVkaXRUaWNrZXQsXHJcbiAgY2FuRGVsZXRlVGlja2V0LFxyXG4gIGZpbGVJZCxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRyYWZ0R2FzdG9UeXBlLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0VHJhbnNEYXRlLFxyXG4gIGRyYWZ0Q29tZW50YXJpbyxcclxuICBkcmFmdFVybEZpbGUsXHJcbiAgZHJhZnRGaWxlTmFtZSxcclxuICBsaW5rZWRFeHBlbnNlU2hlZXRJZCxcclxuICBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBzZXRCdXN5LFxyXG4gIHNldFN0YXR1cyxcclxuICBzZXRJc0VkaXRpbmcsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XHJcbiAgY29uc3QgaGFuZGxlVXBkYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kgfHwgIWlzRWRpdGluZykgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5FZGl0VGlja2V0KSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5vcm1hbGl6ZWREZXNjcmlwdGlvbiA9IFN0cmluZyhkcmFmdERlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgIGlmICghbm9ybWFsaXplZERlc2NyaXB0aW9uKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0Rlc2NyaXB0aW9uUmVxdWlyZWRcIiwgXCJEZXNjcmlwdGlvbiBpcyByZXF1aXJlZC5cIik7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW5jeSA9IFN0cmluZyhkcmFmdEN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxuICAgIGlmICghbm9ybWFsaXplZEN1cnJlbmN5KSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0N1cnJlbmN5UmVxdWlyZWRcIiwgXCJDdXJyZW5jeSBpcyByZXF1aXJlZC5cIik7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhcnNlZEdhc3RvVHlwZSA9IHBhcnNlT3B0aW9uYWxJbnRlZ2VyKGRyYWZ0R2FzdG9UeXBlKTtcclxuICAgIGlmIChwYXJzZWRHYXN0b1R5cGUgPT09IHVuZGVmaW5lZCB8fCAhUkVRVUlSRURfR0FTVE9fVFlQRVMuaGFzKHBhcnNlZEdhc3RvVHlwZSkpIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJUaWNrZXRzX1ZhbGlkYXRpb25fQ2F0ZWdvcnlSZXF1aXJlZFwiLCBcIkNhdGVnb3J5IGlzIHJlcXVpcmVkLlwiKTtcclxuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmF3VHJhbnNEYXRlID0gU3RyaW5nKGRyYWZ0VHJhbnNEYXRlIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc0RhdGUgPSByYXdUcmFuc0RhdGUgPyB0b0V4cGVuc2VBcGlEZE1tWXl5eShyYXdUcmFuc0RhdGUpIDogXCJcIjtcclxuICAgIGlmIChyYXdUcmFuc0RhdGUgJiYgIW5vcm1hbGl6ZWRUcmFuc0RhdGUpIHtcclxuICAgICAgc2V0TW9kYWxFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICAgICAgc2V0U3RhdHVzKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCA9IHtcclxuICAgICAgZGVzY3JpcHRpb246IG5vcm1hbGl6ZWREZXNjcmlwdGlvbixcclxuICAgICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVkQ3VycmVuY3ksXHJcbiAgICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplZFRyYW5zRGF0ZSB8fCB1bmRlZmluZWQsXHJcbiAgICAgIGNvbWVudGFyaW86IFN0cmluZyhkcmFmdENvbWVudGFyaW8gfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcclxuICAgICAgdXJsRmlsZTogU3RyaW5nKGRyYWZ0VXJsRmlsZSB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkLFxyXG4gICAgICBmaWxlTmFtZTogU3RyaW5nKGRyYWZ0RmlsZU5hbWUgfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcclxuICAgICAgZmlsZUV4dGVuc2lvbjogcmVzb2x2ZVRpY2tldEZpbGVFeHRlbnNpb24oZHJhZnRGaWxlTmFtZSwgZHJhZnRVcmxGaWxlKSxcclxuICAgICAgZ2FzdG9UeXBlOiBwYXJzZWRHYXN0b1R5cGUgYXMgRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdFtcImdhc3RvVHlwZVwiXSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRpbmdcIiwgXCJVcGRhdGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxyXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKSxcclxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldChmaWxlSWQsIHBheWxvYWQpO1xyXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgdXBkYXRlZFwiKSk7XHJcbiAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQub2s7XHJcbiAgfSwgW1xyXG4gICAgYnVzeSxcclxuICAgIGNhbkVkaXRUaWNrZXQsXHJcbiAgICBkcmFmdENvbWVudGFyaW8sXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdEZpbGVOYW1lLFxyXG4gICAgZHJhZnRHYXN0b1R5cGUsXHJcbiAgICBkcmFmdFRyYW5zRGF0ZSxcclxuICAgIGRyYWZ0VXJsRmlsZSxcclxuICAgIGZpbGVJZCxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCByZXNvbHZlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0ID0gdXNlQ2FsbGJhY2soYXN5bmMgKCk6IFByb21pc2U8RGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0IHwgbnVsbD4gPT4ge1xyXG4gICAgaWYgKGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCkge1xyXG4gICAgICByZXR1cm4gZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQobGlua2VkRXhwZW5zZVNoZWV0SWQpO1xyXG4gICAgaWYgKCFzYWZlU2hlZXRJZCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKHNhZmVTaGVldElkLCB7XHJcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2UuSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICAgIGNvbnN0IGRldGFpbCA9IGl0ZW1zLmZpbmQoKGVudHJ5KSA9PiBlbnRyeSAmJiB0eXBlb2YgZW50cnkgPT09IFwib2JqZWN0XCIpIHx8IG51bGw7XHJcbiAgICBjb25zdCBsaW5lcyA9IEFycmF5LmlzQXJyYXkoZGV0YWlsPy5MaW5lcykgPyBkZXRhaWwuTGluZXMgOiBbXTtcclxuICAgIGNvbnN0IG1hdGNoaW5nTGluZSA9IGxpbmVzLmZpbmQoKGxpbmUpID0+IHNhZmVUZXh0KGxpbmU/LkZpbGVJZCkgPT09IGZpbGVJZCk7XHJcbiAgICBjb25zdCBsaW5lUmVjSWQgPSBzYWZlVGV4dChtYXRjaGluZ0xpbmU/LlJlY0lkKTtcclxuXHJcbiAgICBpZiAoIWxpbmVSZWNJZCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzaGVldElkOiBzYWZlU2hlZXRJZCxcclxuICAgICAgbGluZVJlY0lkLFxyXG4gICAgfTtcclxuICB9LCBbZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0LCBmaWxlSWQsIGxpbmtlZEV4cGVuc2VTaGVldElkXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURlbGV0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWNhbkRlbGV0ZVRpY2tldCkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcclxuICAgICAgc3RhcnRTdGF0dXM6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGV4cGVuc2Ugc2hlZXQuLi5cIiksXHJcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRXJyb3JcIiwgXCJEZWxldGUgZXJyb3IuXCIpLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRCdXN5LFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpbmtlZExpbmVDb250ZXh0ID0gYXdhaXQgcmVzb2x2ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCgpO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgZGVsZXRlRmlsZVJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0RmlsZShmaWxlSWQsIHtcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmICghZGVsZXRlRmlsZVJlc3BvbnNlLlN1Y2Nlc3MgJiYgIWlzTWlzc2luZ1RpY2tldEZpbGVNZXNzYWdlKGRlbGV0ZUZpbGVSZXNwb25zZS5NZXNzYWdlKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGVsZXRlRmlsZVJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgaWYgKCFpc05vdEZvdW5kRXJyb3IoZXJyb3IpKSB7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXQoZmlsZUlkKTtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGlua2VkTGluZUNvbnRleHQpIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmVEZWxldGVSZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldExpbmUoXHJcbiAgICAgICAgICAgICAgbGlua2VkTGluZUNvbnRleHQuc2hlZXRJZCxcclxuICAgICAgICAgICAgICBsaW5rZWRMaW5lQ29udGV4dC5saW5lUmVjSWQsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsaW5lRGVsZXRlUmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihsaW5lRGVsZXRlUmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAvLyBUaGUgbGlua2VkIGxpbmUgY2FuIGJlIGF1dG8tcmVtb3ZlZCBieSBiYWNrZW5kIGNhc2NhZGU7IGtlZXAgZmxvdyBzdWNjZXNzZnVsIGluIHRoYXQgY2FzZS5cclxuICAgICAgICAgICAgaWYgKCFpc05vdEZvdW5kRXJyb3IoZXJyb3IpKSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgZGVsZXRlZFwiKSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xyXG4gIH0sIFtidXN5LCBjYW5EZWxldGVUaWNrZXQsIGZpbGVJZCwgcmVzb2x2ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCwgc2V0QnVzeSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zLnRzXCI7XHJcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XHJcbiAgYWN0aW9uTW9kZT86IFwiZGVmYXVsdFwiIHwgXCJkZWxldGVfb25seVwiIHwgXCJ2aWV3X29ubHlcIjtcclxuICBwZXJtaXNzaW9uc1JlYWR5PzogYm9vbGVhbjtcclxuICBjYW5FZGl0VGlja2V0OiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZVRpY2tldDogYm9vbGVhbjtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUNhbmNlbEVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgY2FuT3BlblNhdmVDb25maXJtPzogKCkgPT4gYm9vbGVhbjtcclxuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgaGFuZGxlRGVsZXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XHJcbiAgb25EZWxldGVTdWNjZXNzPzogKCkgPT4gdm9pZDtcclxuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcclxuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XHJcbiAgfSkgPT4gdm9pZDtcclxuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBDb29yZGluYXRlcyB0b3BiYXIgaWNvbiBzdGF0ZSBhbmQgZGlzcGF0Y2ggYWN0aW9ucyBmb3IgdGlja2V0IGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsT3BlbixcclxuICBpc0VkaXRpbmcsXHJcbiAgaXNMb2NrZWQsXHJcbiAgYWN0aW9uTW9kZSA9IFwiZGVmYXVsdFwiLFxyXG4gIHBlcm1pc3Npb25zUmVhZHkgPSB0cnVlLFxyXG4gIGNhbkVkaXRUaWNrZXQsXHJcbiAgY2FuRGVsZXRlVGlja2V0LFxyXG4gIGZpbGVJZCxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgaGFuZGxlVXBkYXRlLFxyXG4gIGhhbmRsZURlbGV0ZSxcclxuICBvblNhdmVTdWNjZXNzLFxyXG4gIG9uRGVsZXRlU3VjY2VzcyxcclxuICBvcGVuQ29uZmlybSxcclxuICBjbG9zZUNvbmZpcm0sXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncykgPT4ge1xyXG4gIHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25Hcm91cElkOiBcImV4cGVuc2UtdGlja2V0LWRldGFpbC1hY3Rpb25zXCIsXHJcbiAgICBpZHM6IHtcclxuICAgICAgZWRpdEljb25JZDogXCJleHBlbnNlVGlja2V0RWRpdEljb25cIixcclxuICAgICAgc2F2ZUljb25JZDogXCJleHBlbnNlVGlja2V0U2F2ZUljb25cIixcclxuICAgICAgZGVsZXRlQnRuSWQ6IFwiZXhwZW5zZVRpY2tldERlbGV0ZUJ0blwiLFxyXG4gICAgICBjYW5jZWxCdG5JZDogXCJleHBlbnNlVGlja2V0Q2FuY2VsQnRuXCIsXHJcbiAgICB9LFxyXG4gICAgZXZlbnRzOiB7XHJcbiAgICAgIGVkaXRFdmVudDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtZWRpdFwiLFxyXG4gICAgICBkZWxldGVFdmVudDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtZGVsZXRlXCIsXHJcbiAgICAgIGNhbmNlbEV2ZW50OiBcImV4cGVuc2UtdGlja2V0LWRldGFpbC1jYW5jZWwtZWRpdFwiLFxyXG4gICAgfSxcclxuICAgIGJ1c3ksXHJcbiAgICBtb2RhbE9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0NyZWF0ZU1vZGU6IGZhbHNlLFxyXG4gICAgaXNMb2NrZWQsXHJcbiAgICBhY3Rpb25Nb2RlLFxyXG4gICAgcGVybWlzc2lvbnNSZWFkeSxcclxuICAgIGNhbkNyZWF0ZTogZmFsc2UsXHJcbiAgICBjYW5FZGl0OiBjYW5FZGl0VGlja2V0LFxyXG4gICAgY2FuRGVsZXRlOiBjYW5EZWxldGVUaWNrZXQsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgICBoYW5kbGVTYXZlOiBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBzYXZlQ29uZmlybVRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJTYXZlIGNoYW5nZXNcIiksXHJcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gc2F2ZSBjaGFuZ2VzP1wiKSxcclxuICAgIHNhdmVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1UaXRsZTogaW5kVChcIkNvbmZpcm1fRGVsZXRlX1RpdGxlXCIsIFwiRGVsZXRlXCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgaXRlbT9cIiksXHJcbiAgICBkZWxldGVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIiksXHJcbiAgICBvblNhdmVTdWNjZXNzLFxyXG4gICAgb25EZWxldGVTdWNjZXNzOiBvbkRlbGV0ZVN1Y2Nlc3MgfHwgKCgpID0+IG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9UaWNrZXRzXCIpKSxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gIH0pO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVkdWNlciwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IERpc3BhdGNoLCBTZXRTdGF0ZUFjdGlvbiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgcGFyc2VFeHBlbnNlRGF0ZSwgc2FmZVRleHQsIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuXHJcbnR5cGUgRHJhZnRTdGF0ZSA9IHtcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGdhc3RvVHlwZTogc3RyaW5nO1xyXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIGNvbWVudGFyaW86IHN0cmluZztcclxuICB1cmxGaWxlOiBzdHJpbmc7XHJcbiAgZmlsZU5hbWU6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgRWRpdG9yU3RhdGUgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBzdGF0dXM6IHN0cmluZztcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgbW9kYWxFcnJvcjogc3RyaW5nO1xyXG4gIGxpbmVQYWdlOiBudW1iZXI7XHJcbiAgZHJhZnQ6IERyYWZ0U3RhdGU7XHJcbn07XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3JBcmdzID0ge1xyXG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw7XHJcbiAgbGluZUNvdW50OiBudW1iZXI7XHJcbiAgcGFnZVNpemU6IG51bWJlcjtcclxuICBjYW5FZGl0VGlja2V0OiBib29sZWFuO1xyXG4gIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICBhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0OiBib29sZWFuO1xyXG4gIGlzRnJvbVNoZWV0TGluazogYm9vbGVhbjtcclxuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbnR5cGUgRWRpdG9yQWN0aW9uID1cclxuICB8IHsgdHlwZTogXCJoeWRyYXRlX2Zyb21faGVhZGVyXCI7IGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGwgfVxyXG4gIHwge1xyXG4gICAgICB0eXBlOiBcInBhdGNoX3N0YXRlXCI7XHJcbiAgICAgIHBhdGNoOiBQYXJ0aWFsPFBpY2s8RWRpdG9yU3RhdGUsIFwiYnVzeVwiIHwgXCJzdGF0dXNcIiB8IFwiaXNFZGl0aW5nXCIgfCBcIm1vZGFsRXJyb3JcIiB8IFwibGluZVBhZ2VcIj4+O1xyXG4gICAgfVxyXG4gIHwgeyB0eXBlOiBcInNldF9kcmFmdF9maWVsZFwiOyBmaWVsZDoga2V5b2YgRHJhZnRTdGF0ZTsgdmFsdWU6IHN0cmluZyB9O1xyXG5cclxuY29uc3QgY3JlYXRlRW1wdHlEcmFmdCA9ICgpOiBEcmFmdFN0YXRlID0+ICh7XHJcbiAgZGVzY3JpcHRpb246IFwiXCIsXHJcbiAgZ2FzdG9UeXBlOiBcIlwiLFxyXG4gIGN1cnJlbmN5Q29kZTogXCJcIixcclxuICB0cmFuc0RhdGU6IFwiXCIsXHJcbiAgY29tZW50YXJpbzogXCJcIixcclxuICB1cmxGaWxlOiBcIlwiLFxyXG4gIGZpbGVOYW1lOiBcIlwiLFxyXG59KTtcclxuXHJcbmNvbnN0IHRvSW5wdXREYXRlID0gKHJhdz86IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlRGF0ZShyYXcpO1xyXG4gIHJldHVybiBwYXJzZWQgPyB0b0lzb0RhdGUocGFyc2VkKSA6IFwiXCI7XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVEcmFmdEZyb21IZWFkZXIgPSAoaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbCk6IERyYWZ0U3RhdGUgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoaGVhZGVyPy5kZXNjcmlwdGlvbiksXHJcbiAgICBnYXN0b1R5cGU6IGhlYWRlcj8uZ2FzdG9UeXBlID09PSBudWxsIHx8IGhlYWRlcj8uZ2FzdG9UeXBlID09PSB1bmRlZmluZWQgPyBcIlwiIDogU3RyaW5nKGhlYWRlci5nYXN0b1R5cGUpLFxyXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSxcclxuICAgIHRyYW5zRGF0ZTogdG9JbnB1dERhdGUoaGVhZGVyPy50cmFuc0RhdGUpLFxyXG4gICAgY29tZW50YXJpbzogc2FmZVRleHQoaGVhZGVyPy5jb21lbnRhcmlvKSxcclxuICAgIHVybEZpbGU6IHNhZmVUZXh0KGhlYWRlcj8udXJsRmlsZSksXHJcbiAgICBmaWxlTmFtZTogc2FmZVRleHQoaGVhZGVyPy5maWxlTmFtZSksXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IGNyZWF0ZUluaXRpYWxTdGF0ZSA9ICgpOiBFZGl0b3JTdGF0ZSA9PiAoe1xyXG4gIGJ1c3k6IGZhbHNlLFxyXG4gIHN0YXR1czogXCJcIixcclxuICBpc0VkaXRpbmc6IGZhbHNlLFxyXG4gIG1vZGFsRXJyb3I6IFwiXCIsXHJcbiAgbGluZVBhZ2U6IDEsXHJcbiAgZHJhZnQ6IGNyZWF0ZUVtcHR5RHJhZnQoKSxcclxufSk7XHJcblxyXG5jb25zdCBpc1ZhbGlkUmVxdWlyZWRHYXN0b1R5cGUgPSAocmF3VmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IHBhcnNlZFZhbHVlID0gTnVtYmVyLnBhcnNlSW50KFN0cmluZyhyYXdWYWx1ZSB8fCBcIlwiKS50cmltKCksIDEwKTtcclxuICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWRWYWx1ZSkgJiYgcGFyc2VkVmFsdWUgPiAwO1xyXG59O1xyXG5cclxuY29uc3QgZWRpdG9yUmVkdWNlciA9IChzdGF0ZTogRWRpdG9yU3RhdGUsIGFjdGlvbjogRWRpdG9yQWN0aW9uKTogRWRpdG9yU3RhdGUgPT4ge1xyXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgIGNhc2UgXCJoeWRyYXRlX2Zyb21faGVhZGVyXCI6XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgZHJhZnQ6IGNyZWF0ZURyYWZ0RnJvbUhlYWRlcihhY3Rpb24uaGVhZGVyKSxcclxuICAgICAgfTtcclxuICAgIGNhc2UgXCJwYXRjaF9zdGF0ZVwiOlxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIC4uLmFjdGlvbi5wYXRjaCxcclxuICAgICAgfTtcclxuICAgIGNhc2UgXCJzZXRfZHJhZnRfZmllbGRcIjpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICBkcmFmdDoge1xyXG4gICAgICAgICAgLi4uc3RhdGUuZHJhZnQsXHJcbiAgICAgICAgICBbYWN0aW9uLmZpZWxkXTogYWN0aW9uLnZhbHVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gc3RhdGU7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZVNldFN0YXRlVmFsdWUgPSA8VCw+KHZhbHVlOiBTZXRTdGF0ZUFjdGlvbjxUPiwgY3VycmVudDogVCk6IFQgPT4ge1xyXG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiA/ICh2YWx1ZSBhcyAocHJldlN0YXRlOiBUKSA9PiBUKShjdXJyZW50KSA6IHZhbHVlO1xyXG59O1xyXG5cclxuLy8gT3ducyBwYWdlLWxvY2FsIGVkaXQsIGRyYWZ0LCBhbmQgbGluZSBwYWdpbmcgc3RhdGUgZm9yIHRpY2tldCBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yID0gKHtcclxuICBoZWFkZXIsXHJcbiAgbGluZUNvdW50LFxyXG4gIHBhZ2VTaXplLFxyXG4gIGNhbkVkaXRUaWNrZXQsXHJcbiAgaXNMb2FkaW5nLFxyXG4gIGFsbG93QXNzaWduZWREcmFmdEVkaXQsXHJcbiAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gIG9uRm9yYmlkZGVuLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yQXJncykgPT4ge1xyXG4gIGNvbnN0IFtzdGF0ZSwgZGlzcGF0Y2hdID0gdXNlUmVkdWNlcihlZGl0b3JSZWR1Y2VyLCB1bmRlZmluZWQsIGNyZWF0ZUluaXRpYWxTdGF0ZSk7XHJcbiAgY29uc3QgW2dhc3RvVHlwZUludmFsaWQsIHNldEdhc3RvVHlwZUludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtjdXJyZW5jeUNvZGVJbnZhbGlkLCBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBnYXN0b1R5cGVJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgY3VycmVuY3lJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc3RhdGUuaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBkaXNwYXRjaCh7IHR5cGU6IFwiaHlkcmF0ZV9mcm9tX2hlYWRlclwiLCBoZWFkZXIgfSk7XHJcbiAgfSwgW2hlYWRlciwgc3RhdGUuaXNFZGl0aW5nXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBtYXhQYWdlID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKGxpbmVDb3VudCAvIHBhZ2VTaXplKSk7XHJcbiAgICBpZiAoc3RhdGUubGluZVBhZ2UgPiBtYXhQYWdlKSB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBsaW5lUGFnZTogbWF4UGFnZSB9IH0pO1xyXG4gICAgfVxyXG4gIH0sIFtsaW5lQ291bnQsIHBhZ2VTaXplLCBzdGF0ZS5saW5lUGFnZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHN0YXRlLmlzRWRpdGluZykgcmV0dXJuO1xyXG4gICAgc2V0R2FzdG9UeXBlSW52YWxpZChmYWxzZSk7XHJcbiAgICBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkKGZhbHNlKTtcclxuICB9LCBbc3RhdGUuaXNFZGl0aW5nXSk7XHJcblxyXG4gIGNvbnN0IHNldEJ1c3kgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxib29sZWFuPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBidXN5OiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuYnVzeSkgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuYnVzeV1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRTdGF0dXMgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxzdHJpbmc+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IHN0YXR1czogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLnN0YXR1cykgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuc3RhdHVzXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldElzRWRpdGluZyA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPGJvb2xlYW4+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IGlzRWRpdGluZzogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmlzRWRpdGluZykgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuaXNFZGl0aW5nXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldE1vZGFsRXJyb3IgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxzdHJpbmc+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IG1vZGFsRXJyb3I6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5tb2RhbEVycm9yKSB9IH0pO1xyXG4gICAgfSxcclxuICAgIFtzdGF0ZS5tb2RhbEVycm9yXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldExpbmVQYWdlID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248bnVtYmVyPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBsaW5lUGFnZTogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmxpbmVQYWdlKSB9IH0pO1xyXG4gICAgfSxcclxuICAgIFtzdGF0ZS5saW5lUGFnZV1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXREcmFmdERlc2NyaXB0aW9uID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcInNldF9kcmFmdF9maWVsZFwiLFxyXG4gICAgICAgIGZpZWxkOiBcImRlc2NyaXB0aW9uXCIsXHJcbiAgICAgICAgdmFsdWU6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5kZXNjcmlwdGlvbiksXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtzdGF0ZS5kcmFmdC5kZXNjcmlwdGlvbl1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXREcmFmdEdhc3RvVHlwZSA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBzZXRHYXN0b1R5cGVJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwic2V0X2RyYWZ0X2ZpZWxkXCIsXHJcbiAgICAgICAgZmllbGQ6IFwiZ2FzdG9UeXBlXCIsXHJcbiAgICAgICAgdmFsdWU6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5nYXN0b1R5cGUpLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuZHJhZnQuZ2FzdG9UeXBlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldERyYWZ0Q3VycmVuY3lDb2RlID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIHNldEN1cnJlbmN5Q29kZUludmFsaWQoZmFsc2UpO1xyXG4gICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJzZXRfZHJhZnRfZmllbGRcIixcclxuICAgICAgICBmaWVsZDogXCJjdXJyZW5jeUNvZGVcIixcclxuICAgICAgICB2YWx1ZTogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSksXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2V0RHJhZnRUcmFuc0RhdGUgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxzdHJpbmc+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwic2V0X2RyYWZ0X2ZpZWxkXCIsXHJcbiAgICAgICAgZmllbGQ6IFwidHJhbnNEYXRlXCIsXHJcbiAgICAgICAgdmFsdWU6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC50cmFuc0RhdGUpLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuZHJhZnQudHJhbnNEYXRlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWhlYWRlciB8fCBpc0xvYWRpbmcpIHJldHVybjtcclxuICAgIGlmIChpc0Zyb21TaGVldExpbmspIHJldHVybjtcclxuICAgIGlmIChoZWFkZXIuc3RhdHVzID09PSAxICYmICFhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0KSByZXR1cm47XHJcbiAgICBpZiAoIWNhbkVkaXRUaWNrZXQpIHtcclxuICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdhc3RvVHlwZUludmFsaWQoZmFsc2UpO1xyXG4gICAgc2V0Q3VycmVuY3lDb2RlSW52YWxpZChmYWxzZSk7XHJcbiAgICBkaXNwYXRjaCh7IHR5cGU6IFwiaHlkcmF0ZV9mcm9tX2hlYWRlclwiLCBoZWFkZXIgfSk7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFwicGF0Y2hfc3RhdGVcIixcclxuICAgICAgcGF0Y2g6IHtcclxuICAgICAgICBtb2RhbEVycm9yOiBcIlwiLFxyXG4gICAgICAgIGlzRWRpdGluZzogdHJ1ZSxcclxuICAgICAgICBzdGF0dXM6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9FZGl0aW5nRW5hYmxlZFwiLCBcIkVkaXRpbmcgZW5hYmxlZFwiKSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0sIFthbGxvd0Fzc2lnbmVkRHJhZnRFZGl0LCBjYW5FZGl0VGlja2V0LCBoZWFkZXIsIGlzRnJvbVNoZWV0TGluaywgaXNMb2FkaW5nLCBvbkZvcmJpZGRlbl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFzdGF0ZS5pc0VkaXRpbmcpIHJldHVybjtcclxuICAgIGlmICghaGVhZGVyKSB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBpc0VkaXRpbmc6IGZhbHNlIH0gfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRHYXN0b1R5cGVJbnZhbGlkKGZhbHNlKTtcclxuICAgIHNldEN1cnJlbmN5Q29kZUludmFsaWQoZmFsc2UpO1xyXG4gICAgZGlzcGF0Y2goeyB0eXBlOiBcImh5ZHJhdGVfZnJvbV9oZWFkZXJcIiwgaGVhZGVyIH0pO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBcInBhdGNoX3N0YXRlXCIsXHJcbiAgICAgIHBhdGNoOiB7XHJcbiAgICAgICAgaXNFZGl0aW5nOiBmYWxzZSxcclxuICAgICAgICBtb2RhbEVycm9yOiBcIlwiLFxyXG4gICAgICAgIHN0YXR1czogaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LCBbaGVhZGVyLCBzdGF0ZS5pc0VkaXRpbmddKTtcclxuXHJcbiAgY29uc3QgY2FuT3BlblNhdmVDb25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbmN5Q29kZSA9IFN0cmluZyhzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBjb25zdCBnYXN0b1R5cGVJc1ZhbGlkID0gaXNWYWxpZFJlcXVpcmVkR2FzdG9UeXBlKHN0YXRlLmRyYWZ0Lmdhc3RvVHlwZSk7XHJcbiAgICBjb25zdCBjdXJyZW5jeUlzVmFsaWQgPSAhIW5vcm1hbGl6ZWRDdXJyZW5jeUNvZGU7XHJcblxyXG4gICAgc2V0R2FzdG9UeXBlSW52YWxpZCghZ2FzdG9UeXBlSXNWYWxpZCk7XHJcbiAgICBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkKCFjdXJyZW5jeUlzVmFsaWQpO1xyXG5cclxuICAgIGlmIChnYXN0b1R5cGVJc1ZhbGlkICYmIGN1cnJlbmN5SXNWYWxpZCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtZXNzYWdlID0gIWdhc3RvVHlwZUlzVmFsaWRcclxuICAgICAgPyBpbmRUKFwiVGlja2V0c19WYWxpZGF0aW9uX0NhdGVnb3J5UmVxdWlyZWRcIiwgXCJDYXRlZ29yeSBpcyByZXF1aXJlZC5cIilcclxuICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0N1cnJlbmN5UmVxdWlyZWRcIiwgXCJDdXJyZW5jeSBpcyByZXF1aXJlZC5cIik7XHJcblxyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBcInBhdGNoX3N0YXRlXCIsXHJcbiAgICAgIHBhdGNoOiB7XHJcbiAgICAgICAgbW9kYWxFcnJvcjogbWVzc2FnZSxcclxuICAgICAgICBzdGF0dXM6IG1lc3NhZ2UsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgaWYgKCFnYXN0b1R5cGVJc1ZhbGlkKSB7XHJcbiAgICAgICAgZ2FzdG9UeXBlSW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGN1cnJlbmN5SW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LCBbc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlLCBzdGF0ZS5kcmFmdC5nYXN0b1R5cGVdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGJ1c3k6IHN0YXRlLmJ1c3ksXHJcbiAgICBzdGF0dXM6IHN0YXRlLnN0YXR1cyxcclxuICAgIGlzRWRpdGluZzogc3RhdGUuaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxFcnJvcjogc3RhdGUubW9kYWxFcnJvcixcclxuICAgIGxpbmVQYWdlOiBzdGF0ZS5saW5lUGFnZSxcclxuICAgIGRyYWZ0RGVzY3JpcHRpb246IHN0YXRlLmRyYWZ0LmRlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRHYXN0b1R5cGU6IHN0YXRlLmRyYWZ0Lmdhc3RvVHlwZSxcclxuICAgIGdhc3RvVHlwZUludmFsaWQsXHJcbiAgICBnYXN0b1R5cGVJbnB1dFJlZixcclxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUsXHJcbiAgICBjdXJyZW5jeUNvZGVJbnZhbGlkLFxyXG4gICAgY3VycmVuY3lJbnB1dFJlZixcclxuICAgIGRyYWZ0VHJhbnNEYXRlOiBzdGF0ZS5kcmFmdC50cmFuc0RhdGUsXHJcbiAgICBkcmFmdENvbWVudGFyaW86IHN0YXRlLmRyYWZ0LmNvbWVudGFyaW8sXHJcbiAgICBkcmFmdFVybEZpbGU6IHN0YXRlLmRyYWZ0LnVybEZpbGUsXHJcbiAgICBkcmFmdEZpbGVOYW1lOiBzdGF0ZS5kcmFmdC5maWxlTmFtZSxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRHYXN0b1R5cGUsXHJcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIHNldERyYWZ0VHJhbnNEYXRlLFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQge1xyXG4gIG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIHJlc29sdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxuICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG4vLyBQYXJzZXMgcm91dGUgY29udGV4dCBvbmNlIGFuZCBleHBvc2VzIHN0YWJsZSBmbGFncyBmb3IgdGlja2V0IGRldGFpbCBmbG93cy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQgPSAoKSA9PiB7XHJcbiAgY29uc3Qgcm91dGVQYXJhbXMgPSB1c2VNZW1vKCgpID0+IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCksIFtdKTtcclxuICBjb25zdCBmaWxlSWQgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfVElDS0VUX0ZJTEVfSURfXyksIFtdKTtcclxuICBjb25zdCBhdXRvRWRpdE1vZGUgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcIm1vZGVcIikpLnRvTG93ZXJDYXNlKCkgPT09IFwiZWRpdFwiLCBbcm91dGVQYXJhbXNdKTtcclxuICBjb25zdCByb3V0ZU9yaWdpbiA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwib3JpZ2luXCIpKS50b0xvd2VyQ2FzZSgpLCBbcm91dGVQYXJhbXNdKTtcclxuICBjb25zdCByb3V0ZVNoZWV0SWQgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcInNoZWV0SWRcIikpLCBbcm91dGVQYXJhbXNdKTtcclxuICBjb25zdCBjb250ZXh0TGluZVJlY0lkID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChyb3V0ZVBhcmFtcy5nZXQoXCJsaW5lUmVjSWRcIikpLCBbcm91dGVQYXJhbXNdKTtcclxuICBjb25zdCBleHBsaWNpdFJldHVybkNvbnRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT5cclxuICAgICAgbm9ybWFsaXplRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoe1xyXG4gICAgICAgIGZpbGVJZCxcclxuICAgICAgICBvcmlnaW46IHJvdXRlT3JpZ2luLFxyXG4gICAgICAgIHNoZWV0SWQ6IHJvdXRlU2hlZXRJZCxcclxuICAgICAgfSksXHJcbiAgICBbZmlsZUlkLCByb3V0ZU9yaWdpbiwgcm91dGVTaGVldElkXVxyXG4gICk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWV4cGxpY2l0UmV0dXJuQ29udGV4dCkgcmV0dXJuO1xyXG4gICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KGV4cGxpY2l0UmV0dXJuQ29udGV4dCk7XHJcbiAgfSwgW2V4cGxpY2l0UmV0dXJuQ29udGV4dF0pO1xyXG5cclxuICByZXR1cm4gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCB0aWNrZXRSZXR1cm5Db250ZXh0ID0gcmVzb2x2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KGZpbGVJZCwgZXhwbGljaXRSZXR1cm5Db250ZXh0KTtcclxuICAgIGNvbnN0IGRldGFpbE9yaWdpbiA9IHRpY2tldFJldHVybkNvbnRleHQ/Lm9yaWdpbiB8fCByb3V0ZU9yaWdpbjtcclxuICAgIGNvbnN0IGNvbnRleHRTaGVldElkID0gdGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCB8fCByb3V0ZVNoZWV0SWQ7XHJcbiAgICBjb25zdCBpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUgPSBkZXRhaWxPcmlnaW4gPT09IFwic2hlZXQtY3JlYXRlXCI7XHJcbiAgICBjb25zdCBpc0Zyb21FeHBlbnNlTGluZSA9IGRldGFpbE9yaWdpbiA9PT0gXCJleHBlbnNlLWxpbmVcIiAmJiAhIWNvbnRleHRTaGVldElkICYmICEhY29udGV4dExpbmVSZWNJZDtcclxuICAgIGNvbnN0IGlzRnJvbVNoZWV0TGluayA9IGRldGFpbE9yaWdpbiA9PT0gXCJzaGVldC1saW5rXCIgJiYgISFjb250ZXh0U2hlZXRJZDtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhdXRvRWRpdE1vZGUsXHJcbiAgICAgIGRldGFpbE9yaWdpbixcclxuICAgICAgY29udGV4dFNoZWV0SWQsXHJcbiAgICAgIGNvbnRleHRMaW5lUmVjSWQsXHJcbiAgICAgIGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSxcclxuICAgICAgaXNGcm9tRXhwZW5zZUxpbmUsXHJcbiAgICAgIGlzRnJvbVNoZWV0TGluayxcclxuICAgICAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxuICAgIH07XHJcbiAgfSwgW2F1dG9FZGl0TW9kZSwgY29udGV4dExpbmVSZWNJZCwgZXhwbGljaXRSZXR1cm5Db250ZXh0LCBmaWxlSWQsIHJvdXRlT3JpZ2luLCByb3V0ZVNoZWV0SWRdKTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uLy4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbCB9IGZyb20gXCIuLi8uLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5QXJncyA9IHtcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xyXG4gIGRyYWZ0R2FzdG9UeXBlOiBzdHJpbmc7XHJcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgZ2FzdG9UeXBlTGFiZWxNYXA6IE1hcDxzdHJpbmcsIHN0cmluZz47XHJcbn07XHJcblxyXG4vLyBDZW50cmFsaXplcyBkaXNwbGF5LW9ubHkgdmFsdWVzIHNvIHRoZSBwYWdlIGNvbnRhaW5lciBzdGF5cyBmb2N1c2VkIG9uIGZsb3cgd2lyaW5nLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXkgPSAoe1xyXG4gIGhlYWRlcixcclxuICBkcmFmdEdhc3RvVHlwZSxcclxuICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICBkcmFmdFRyYW5zRGF0ZSxcclxuICBkcmFmdEZpbGVOYW1lLFxyXG4gIGlzRWRpdGluZyxcclxuICBnYXN0b1R5cGVMYWJlbE1hcCxcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXlBcmdzKSA9PiB7XHJcbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiAoe1xyXG4gICAgICBmaXJzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9GaXJzdFwiLCBcIkZpcnN0XCIpLFxyXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcclxuICAgICAgbmV4dDogaW5kVChcIkhpc3RvcnlfUGFnZV9OZXh0XCIsIFwiTmV4dFwiKSxcclxuICAgICAgbGFzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKSxcclxuICAgIH0pLFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICBjb25zdCBwcmV2aWV3QWx0VGV4dCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBzYWZlVGV4dChpc0VkaXRpbmcgPyBkcmFmdEZpbGVOYW1lIDogaGVhZGVyPy5maWxlTmFtZSkgfHwgaW5kVChcIlRpY2tldHNfRmllbGRfRmlsZUlkXCIsIFwiVGlja2V0XCIpLFxyXG4gICAgW2RyYWZ0RmlsZU5hbWUsIGhlYWRlcj8uZmlsZU5hbWUsIGlzRWRpdGluZ11cclxuICApO1xyXG5cclxuICBjb25zdCBzdGF0dXNMYWJlbCA9IHVzZU1lbW8oKCkgPT4gZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsKGhlYWRlcj8uc3RhdHVzKSwgW2hlYWRlcj8uc3RhdHVzXSk7XHJcblxyXG4gIGNvbnN0IGdhc3RvVHlwZUxhYmVsID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50R2FzdG9UeXBlID0gaXNFZGl0aW5nID8gZHJhZnRHYXN0b1R5cGUgOiBoZWFkZXI/Lmdhc3RvVHlwZSA9PT0gbnVsbCA/IFwiXCIgOiBTdHJpbmcoaGVhZGVyPy5nYXN0b1R5cGUgPz8gXCJcIik7XHJcbiAgICBpZiAoIWN1cnJlbnRHYXN0b1R5cGUpIHtcclxuICAgICAgcmV0dXJuIGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdhc3RvVHlwZUxhYmVsTWFwLmdldChTdHJpbmcoY3VycmVudEdhc3RvVHlwZSkpIHx8IFN0cmluZyhjdXJyZW50R2FzdG9UeXBlKTtcclxuICB9LCBbZHJhZnRHYXN0b1R5cGUsIGdhc3RvVHlwZUxhYmVsTWFwLCBoZWFkZXI/Lmdhc3RvVHlwZSwgaXNFZGl0aW5nXSk7XHJcblxyXG4gIGNvbnN0IHRvdGFsQW1vdW50VGV4dCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koaGVhZGVyPy50b3RhbEFtb3VudCA/PyBudWxsLCAoaXNFZGl0aW5nID8gZHJhZnRDdXJyZW5jeUNvZGUgOiBoZWFkZXI/LmN1cnJlbmN5Q29kZSkgfHwgaGVhZGVyPy5jdXJyZW5jeUNvZGUpLFxyXG4gICAgW2RyYWZ0Q3VycmVuY3lDb2RlLCBoZWFkZXI/LmN1cnJlbmN5Q29kZSwgaGVhZGVyPy50b3RhbEFtb3VudCwgaXNFZGl0aW5nXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHRyYW5zRGF0ZVRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGlzRWRpdGluZyA/IGRyYWZ0VHJhbnNEYXRlIDogaGVhZGVyPy50cmFuc0RhdGUsIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiKSxcclxuICAgIFtkcmFmdFRyYW5zRGF0ZSwgaGVhZGVyPy50cmFuc0RhdGUsIGlzRWRpdGluZ11cclxuICApO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcGFnaW5hdGlvbkxhYmVscyxcclxuICAgIHByZXZpZXdBbHRUZXh0LFxyXG4gICAgc3RhdHVzTGFiZWwsXHJcbiAgICBnYXN0b1R5cGVMYWJlbCxcclxuICAgIHRvdGFsQW1vdW50VGV4dCxcclxuICAgIHRyYW5zRGF0ZVRleHQsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZUFyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbEVycm9yOiBzdHJpbmc7XHJcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0U3RhdHVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIEVuY2Fwc3VsYXRlcyBjb25maXJtIG1vZGFsIHN0YXRlIHNvIHRoZSBwYWdlIGNvbnRhaW5lciBzdGF5cyBmb2N1c2VkIG9uIGZsb3cgd2lyaW5nLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZSA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbEVycm9yLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgc2V0U3RhdHVzLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsQ29uZmlybVN0YXRlQXJncykgPT4ge1xyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xyXG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcclxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm0sIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1c10pO1xyXG5cclxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcclxuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XHJcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcclxuICAgIDogIWJ1c3kgJiYgbW9kYWxFcnJvclxyXG4gICAgICA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKVxyXG4gICAgICA6IG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdm9pZCBoYW5kbGVNb2RhbENvbmZpcm0oKTtcclxuICB9LCBbYnVzeSwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm0sIG1vZGFsRXJyb3JdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG1vZGFsLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgICBtb2RhbExvYWRpbmdUZXh0LFxyXG4gICAgbW9kYWxDYW5jZWxUZXh0LFxyXG4gICAgbW9kYWxDb25maXJtVGV4dCxcclxuICAgIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBSZWZPYmplY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHtcclxuICBhcHBlbmRFeHBlbnNlVGlja2V0UmV0dXJuUXVlcnksXHJcbiAgYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwsXHJcbiAgdHlwZSBFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9uc0FyZ3MgPSB7XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgY29udGV4dFNoZWV0SWQ6IHN0cmluZztcclxuICBpc0Zyb21FeHBlbnNlTGluZTogYm9vbGVhbjtcclxuICBpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGU6IGJvb2xlYW47XHJcbiAgaXNGcm9tU2hlZXRMaW5rOiBib29sZWFuO1xyXG4gIGhlYWRlckV4cGVuc2VTaGVldElkOiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGxpbmVDb250YWluZXJSZWY6IFJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIG9wZW5QcmV2aWV3OiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xyXG4gIHRpY2tldFJldHVybkNvbnRleHQ/OiBFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCB8IG51bGw7XHJcbn07XHJcblxyXG4vLyBHcm91cHMgdGlja2V0IGRldGFpbCBuYXZpZ2F0aW9uIGFuZCBsaW5lLWNhcmQgaW50ZXJhY3Rpb25zIGJlaGluZCBzdGFibGUgY2FsbGJhY2tzLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9ucyA9ICh7XHJcbiAgZmlsZUlkLFxyXG4gIGNvbnRleHRTaGVldElkLFxyXG4gIGlzRnJvbUV4cGVuc2VMaW5lLFxyXG4gIGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSxcclxuICBpc0Zyb21TaGVldExpbmssXHJcbiAgaGVhZGVyRXhwZW5zZVNoZWV0SWQsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGxpbmVDb250YWluZXJSZWYsXHJcbiAgb3BlblByZXZpZXcsXHJcbiAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9uc0FyZ3MpID0+IHtcclxuICBjb25zdCBvcGVuTGluZURldGFpbCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHJhd0xpbmVSZWNJZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGlmIChpc0Zyb21FeHBlbnNlTGluZSB8fCBpc0Zyb21TaGVldExpbmspIHJldHVybjtcclxuICAgICAgY29uc3QgbGluZVJlY0lkID0gc2FmZVRleHQocmF3TGluZVJlY0lkKTtcclxuICAgICAgaWYgKCFsaW5lUmVjSWQgfHwgIWZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgbGluZVJlY0lkLFxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSkge1xyXG4gICAgICAgIHF1ZXJ5LnNldChcIm1vZGVcIiwgXCJlZGl0XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGFwcGVuZEV4cGVuc2VUaWNrZXRSZXR1cm5RdWVyeShxdWVyeSwgdGlja2V0UmV0dXJuQ29udGV4dCk7XHJcblxyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXRMaW5lRGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiB0cnVlLFxyXG4gICAgICAgIGJ5cGFzc0d1YXJkT25jZTogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtmaWxlSWQsIGlzRnJvbUV4cGVuc2VMaW5lLCBpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUsIGlzRnJvbVNoZWV0TGluaywgdGlja2V0UmV0dXJuQ29udGV4dF1cclxuICApO1xyXG5cclxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcclxuICAgICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xyXG4gICAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xyXG4gICAgICBpZiAoIWxpbmVDb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xyXG4gICAgICByZXR1cm4gY2FyZDtcclxuICAgIH0sXHJcbiAgICBbbGluZUNvbnRhaW5lclJlZl1cclxuICApO1xyXG5cclxuICBjb25zdCBvcGVuRmlsZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHZvaWQgb3BlblByZXZpZXcoKTtcclxuICB9LCBbb3BlblByZXZpZXddKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChpc0Zyb21TaGVldExpbmspIHJldHVybjtcclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQodGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCB8fCBoZWFkZXJFeHBlbnNlU2hlZXRJZCB8fCBjb250ZXh0U2hlZXRJZCk7XHJcbiAgICBpZiAoIXNhZmVTaGVldElkKSByZXR1cm47XHJcblxyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwoc2FmZVNoZWV0SWQpLCB7XHJcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxyXG4gICAgfSk7XHJcbiAgfSwgW2NvbnRleHRTaGVldElkLCBoZWFkZXJFeHBlbnNlU2hlZXRJZCwgaXNFZGl0aW5nLCBpc0Zyb21TaGVldExpbmssIHRpY2tldFJldHVybkNvbnRleHRdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG9wZW5MaW5lRGV0YWlsLFxyXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXHJcbiAgICBvcGVuRmlsZSxcclxuICAgIGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG5jb25zdCBJTUFHRV9FWFRFTlNJT05TID0gbmV3IFNldDxzdHJpbmc+KFtcImpwZ1wiLCBcImpwZWdcIiwgXCJwbmdcIiwgXCJ3ZWJwXCIsIFwiZ2lmXCIsIFwiYm1wXCIsIFwiaGVpY1wiLCBcImhlaWZcIiwgXCJhdmlmXCJdKTtcclxuXHJcbmNvbnN0IGdldEZpbGVFeHRlbnNpb25Gcm9tUGF0aCA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBzb3VyY2UgPSBzYWZlVGV4dCh2YWx1ZSkudG9Mb3dlckNhc2UoKTtcclxuICBpZiAoIXNvdXJjZSkgcmV0dXJuIFwiXCI7XHJcblxyXG4gIGNvbnN0IHdpdGhvdXRRdWVyeSA9IHNvdXJjZS5zcGxpdChcIj9cIilbMF0uc3BsaXQoXCIjXCIpWzBdO1xyXG4gIGNvbnN0IHBhcnRzID0gd2l0aG91dFF1ZXJ5LnNwbGl0KFwiLlwiKTtcclxuICBpZiAocGFydHMubGVuZ3RoIDwgMikgcmV0dXJuIFwiXCI7XHJcblxyXG4gIGNvbnN0IHJhd0V4dCA9IHNhZmVUZXh0KHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdKS5yZXBsYWNlKC9bXmEtejAtOV0vZywgXCJcIik7XHJcbiAgcmV0dXJuIHJhd0V4dCA9PT0gXCJqcGVnXCIgPyBcImpwZ1wiIDogcmF3RXh0O1xyXG59O1xyXG5cclxuLy8gRGV0ZWN0cyB3aGV0aGVyIG9uZSB0aWNrZXQgc291cmNlIGNhbiByZW5kZXIgYXMgYW4gaW5saW5lIGltYWdlIHByZXZpZXcuXHJcbmV4cG9ydCBjb25zdCBoYXNFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3U291cmNlID0gKHVybFZhbHVlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkVXJsID0gc2FmZVRleHQodXJsVmFsdWUpO1xyXG4gIGlmICghbm9ybWFsaXplZFVybCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBpZiAobm9ybWFsaXplZFVybC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoXCJkYXRhOmltYWdlL1wiKSkgcmV0dXJuIHRydWU7XHJcblxyXG4gIGNvbnN0IGV4dGVuc2lvbiA9IGdldEZpbGVFeHRlbnNpb25Gcm9tUGF0aChub3JtYWxpemVkVXJsKTtcclxuICBpZiAoZXh0ZW5zaW9uICYmIElNQUdFX0VYVEVOU0lPTlMuaGFzKGV4dGVuc2lvbikpIHJldHVybiB0cnVlO1xyXG5cclxuICBjb25zdCBub3JtYWxpemVkTG93ZXIgPSBub3JtYWxpemVkVXJsLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKG5vcm1hbGl6ZWRMb3dlci5pbmNsdWRlcyhcImJsb2IuY29yZS53aW5kb3dzLm5ldFwiKSAmJiBub3JtYWxpemVkTG93ZXIuaW5jbHVkZXMoXCJpbWFnZVwiKSkgcmV0dXJuIHRydWU7XHJcblxyXG4gIHJldHVybiBmYWxzZTtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCBTaW5nbGVEYXRlUGlja2VyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2luZ2xlRGF0ZVBpY2tlci50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB9IGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgaGFzRXhwZW5zZVRpY2tldEltYWdlUHJldmlld1NvdXJjZSB9IGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0UHJldmlld1V0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VSZWFkT25seUZpZWxkIGZyb20gXCIuL0V4cGVuc2VSZWFkT25seUZpZWxkLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdC50c3hcIjtcclxuXHJcbmNvbnN0IGhhc1JlYWxFeHBlbnNlU2hlZXRWYWx1ZSA9ICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHNhZmVUZXh0KHZhbHVlKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIGZhbHNlO1xyXG4gIGlmIChub3JtYWxpemVkID09PSBcIi1cIiB8fCBub3JtYWxpemVkID09PSBcIjBcIikgcmV0dXJuIGZhbHNlO1xyXG4gIGlmIChub3JtYWxpemVkID09PSBcIm4vYVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwibmFcIikgcmV0dXJuIGZhbHNlO1xyXG4gIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybVByb3BzID0ge1xyXG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlcjtcclxuICBzdGF0dXNMYWJlbDogc3RyaW5nO1xyXG4gIGdhc3RvVHlwZUxhYmVsOiBzdHJpbmc7XHJcbiAgdG90YWxBbW91bnRUZXh0OiBzdHJpbmc7XHJcbiAgdHJhbnNEYXRlVGV4dDogc3RyaW5nO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBnYXN0b1R5cGVPcHRpb25zOiBBcnJheTx7IHZhbHVlOiBzdHJpbmc7IHRleHQ6IHN0cmluZyB9PjtcclxuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcclxuICBnYXN0b1R5cGVJbnZhbGlkOiBib29sZWFuO1xyXG4gIGdhc3RvVHlwZUlucHV0UmVmOiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBjdXJyZW5jeUNvZGVJbnZhbGlkOiBib29sZWFuO1xyXG4gIGN1cnJlbmN5SW5wdXRSZWY6IFJlYWN0LlJlZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIGRyYWZ0VXJsRmlsZTogc3RyaW5nO1xyXG4gIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcclxuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRHYXN0b1R5cGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uT3BlbkZpbGU6ICgpID0+IHZvaWQ7XHJcbiAgb25PcGVuRXhwZW5zZVNoZWV0PzogKCkgPT4gdm9pZDtcclxuICBoaWRlT3BlbkZpbGVBY3Rpb24/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gUmVhZC1vbmx5IGFuZCBlZGl0YWJsZSBoZWFkZXIgZm9ybSBmb3IgdGlja2V0IGRldGFpbC5cclxuY29uc3QgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm0gPSAoe1xyXG4gIGhlYWRlcixcclxuICBzdGF0dXNMYWJlbCxcclxuICBnYXN0b1R5cGVMYWJlbCxcclxuICB0b3RhbEFtb3VudFRleHQsXHJcbiAgdHJhbnNEYXRlVGV4dCxcclxuICBpc0VkaXRpbmcsXHJcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRyYWZ0R2FzdG9UeXBlLFxyXG4gIGdhc3RvVHlwZUludmFsaWQsXHJcbiAgZ2FzdG9UeXBlSW5wdXRSZWYsXHJcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICBjdXJyZW5jeUlucHV0UmVmLFxyXG4gIGRyYWZ0VHJhbnNEYXRlLFxyXG4gIGRyYWZ0VXJsRmlsZSxcclxuICBkcmFmdEZpbGVOYW1lLFxyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZSxcclxuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlLFxyXG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2UsXHJcbiAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZSxcclxuICBvbk9wZW5GaWxlLFxyXG4gIG9uT3BlbkV4cGVuc2VTaGVldCxcclxuICBoaWRlT3BlbkZpbGVBY3Rpb24gPSBmYWxzZSxcclxufTogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm1Qcm9wcykgPT4ge1xyXG4gIGNvbnN0IHByZXZpZXdVcmwgPSBzYWZlVGV4dChpc0VkaXRpbmcgPyBkcmFmdFVybEZpbGUgOiBoZWFkZXIudXJsRmlsZSk7XHJcbiAgY29uc3QgY2FuT3BlbkZpbGUgPSBoYXNFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3U291cmNlKHByZXZpZXdVcmwpO1xyXG4gIGNvbnN0IHNob3dFeHBlbnNlU2hlZXRGaWVsZCA9IGhhc1JlYWxFeHBlbnNlU2hlZXRWYWx1ZShoZWFkZXIuaG9qYUdhc3Rvc0lkRGlzcGxheSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cclxuICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIil9XHJcbiAgICAgICAgICB2YWx1ZT17aGVhZGVyLmZpbGVJZCB8fCBcIi1cIn1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XHJcbiAgICAgICAgICB2YWx1ZT17c3RhdHVzTGFiZWwgfHwgXCItXCJ9XHJcbiAgICAgICAgLz5cclxuXHJcbiAgICAgICAge2lzRWRpdGluZyA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnREZXNjcmlwdGlvbn1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxyXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17aGVhZGVyLmRlc2NyaXB0aW9uIHx8IFwiLVwifVxyXG4gICAgICAgICAgICBmdWxsV2lkdGhcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKX1cclxuXHJcbiAgICAgICAge2lzRWRpdGluZyA/IChcclxuICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIil9XHJcbiAgICAgICAgICAgIG9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XHJcbiAgICAgICAgICAgIHZhbHVlPXtkcmFmdEdhc3RvVHlwZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRHYXN0b1R5cGVDaGFuZ2V9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cclxuICAgICAgICAgICAgaW5wdXRSZWY9e2dhc3RvVHlwZUlucHV0UmVmfVxyXG4gICAgICAgICAgICBpbnZhbGlkPXtnYXN0b1R5cGVJbnZhbGlkfVxyXG4gICAgICAgICAgICB1c2VQb3J0YWxcclxuICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxyXG4gICAgICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtnYXN0b1R5cGVMYWJlbCB8fCBcIi1cIn1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKX1cclxuXHJcbiAgICAgICAge3Nob3dFeHBlbnNlU2hlZXRGaWVsZCA/IChcclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmllbGRfRXhwZW5zZVNoZWV0RGlzcGxheVwiLCBcIkV4cGVuc2Ugc2hlZXRcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtoZWFkZXIuaG9qYUdhc3Rvc0lkRGlzcGxheSB8fCBcIi1cIn1cclxuICAgICAgICAgICAgb25DbGljaz17b25PcGVuRXhwZW5zZVNoZWV0fVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAge2lzRWRpdGluZyA/IChcclxuICAgICAgICAgIDxFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17ZHJhZnRDdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlfVxyXG4gICAgICAgICAgICBpbnZhbGlkPXtjdXJyZW5jeUNvZGVJbnZhbGlkfVxyXG4gICAgICAgICAgICBpbnB1dFJlZj17Y3VycmVuY3lJbnB1dFJlZn1cclxuICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWN1cnJlbmN5XCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2hlYWRlci5jdXJyZW5jeUNvZGUgfHwgXCItXCJ9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcblxyXG4gICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1RvdGFsQW1vdW50XCIsIFwiVG90YWwgYW1vdW50XCIpfVxyXG4gICAgICAgICAgdmFsdWU9e3RvdGFsQW1vdW50VGV4dCB8fCBcIi1cIn1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpdGEtZmllbGQtdGV4dFwiPlxyXG4gICAgICAgICAgICA8U2luZ2xlRGF0ZVBpY2tlclxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DcmVhdGVkRGF0ZVwiLCBcIkRhdGVcIil9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0VHJhbnNEYXRlfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nfVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0NyZWF0ZWREYXRlXCIsIFwiRGF0ZVwiKX1cclxuICAgICAgICAgICAgICB2YWx1ZT17dHJhbnNEYXRlVGV4dCB8fCBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoaGVhZGVyLnRyYW5zRGF0ZSwgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCIpIHx8IFwiLVwifVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7Y2FuT3BlbkZpbGUgJiYgIWhpZGVPcGVuRmlsZUFjdGlvbiA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1lbmRcIj5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIlxyXG4gICAgICAgICAgICBvbkNsaWNrPXtvbk9wZW5GaWxlfVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7aW5kVChcIlRpY2tldHNfRGV0YWlsX1ZpZXdBdHRhY2htZW50XCIsIFwiVmVyIGFkanVudG9cIil9XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZURhdGVQYXJ0cyB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgfSBmcm9tIFwiLi4vZXhwZW5zZUZvcm1hdHRlcnMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZU51bWJlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgZnJvbSBcIi4vRXhwZW5zZVNlY3Rpb25EaXZpZGVyLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpbWVsaW5lQ2FyZCBmcm9tIFwiLi9FeHBlbnNlVGltZWxpbmVDYXJkLnRzeFwiO1xyXG5cclxudHlwZSBQYWdpbmF0aW9uTGFiZWxzID0ge1xyXG4gIGZpcnN0OiBzdHJpbmc7XHJcbiAgcHJldjogc3RyaW5nO1xyXG4gIG5leHQ6IHN0cmluZztcclxuICBsYXN0OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXRMaW5lc0xpc3RQcm9wcyA9IHtcclxuICB2aXNpYmxlTGluZXM6IEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lW107XHJcbiAgdG90YWxMaW5lUGFnZXM6IG51bWJlcjtcclxuICBsaW5lUGFnZTogbnVtYmVyO1xyXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIHBhZ2luYXRpb25MYWJlbHM6IFBhZ2luYXRpb25MYWJlbHM7XHJcbiAgY29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBvbkxpbmVQYWdlQ2hhbmdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xyXG4gIG9uT3BlbkxpbmU6IChsaW5lUmVjSWQ6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdFF0eVZhbHVlID0gKHZhbHVlOiBudW1iZXIgfCBudWxsKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gZm9ybWF0RXhwZW5zZU51bWJlcih2YWx1ZSwge1xyXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICBmYWxsYmFjazogXCItXCIsXHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBFTVBUWV9EQVRFX1BBUlRTOiBFeHBlbnNlRGF0ZVBhcnRzID0ge1xyXG4gIHllYXI6IFwiLS1cIixcclxuICBtb250aDogXCItLVwiLFxyXG4gIGRheTogXCItLVwiLFxyXG59O1xyXG5cclxuY29uc3QgVElDS0VUX0xJTkVfREFURV9QQU5FTF9JQ09OID0gKFxyXG4gIDxzdmdcclxuICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICBmaWxsPVwibm9uZVwiXHJcbiAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgc3Ryb2tlV2lkdGg9XCIxXCJcclxuICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcclxuICAgIGNsYXNzTmFtZT1cImgtMTAgdy0xMCB0ZXh0LXNsYXRlLTUwMFwiXHJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gID5cclxuICAgIDxwYXRoIHN0cm9rZT1cIm5vbmVcIiBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMTQgM3Y0YTEgMSAwIDAgMCAxIDFoNFwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTE3IDIxaC0xMGEyIDIgMCAwIDEgLTIgLTJ2LTE0YTIgMiAwIDAgMSAyIC0yaDdsNSA1djExYTIgMiAwIDAgMSAtMiAyXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNOSA3bDEgMFwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTkgMTNsNiAwXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMTMgMTdsMiAwXCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbi8vIFRpY2tldCBsaW5lcyBzZWN0aW9uIHJlbmRlcmVkIHdpdGggdGltZWxpbmUgY2FyZHMgYW5kIHBhZ2luZyBjb250cm9scy5cclxuY29uc3QgRXhwZW5zZVRpY2tldExpbmVzTGlzdCA9ICh7XHJcbiAgdmlzaWJsZUxpbmVzLFxyXG4gIHRvdGFsTGluZVBhZ2VzLFxyXG4gIGxpbmVQYWdlLFxyXG4gIGN1cnJlbmN5Q29kZSxcclxuICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gIGNvbnRhaW5lclJlZixcclxuICBvbkxpbmVQYWdlQ2hhbmdlLFxyXG4gIG9uT3BlbkxpbmUsXHJcbn06IEV4cGVuc2VUaWNrZXRMaW5lc0xpc3RQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzcGFjZS15LTBcIj5cclxuICAgICAgPEV4cGVuc2VTZWN0aW9uRGl2aWRlciBsYWJlbD17aW5kVChcIlRpY2tldHNfRGV0YWlsX0xpbmVzXCIsIFwiTGluZXNcIil9IGNsYXNzTmFtZT1cImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyLS1zcGFjZWRcIiAvPlxyXG5cclxuICAgICAge3Zpc2libGVMaW5lcy5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2luZFQoXCJUaWNrZXRzX0RldGFpbF9Ob0xpbmVzXCIsIFwiTm8gbGluZXMgZm9yIHRoaXMgdGlja2V0LlwiKX0gLz5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8ZGl2IHJlZj17Y29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cclxuICAgICAgICAgIHt2aXNpYmxlTGluZXMubWFwKChsaW5lKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFtb3VudFRleHQgPSBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kobGluZS50b3RhbEFtb3VudCwgY3VycmVuY3lDb2RlKTtcclxuICAgICAgICAgICAgY29uc3QgcXR5VGV4dCA9IGZvcm1hdFF0eVZhbHVlKGxpbmUucXR5KTtcclxuICAgICAgICAgICAgY29uc3QgcHJpY2VUZXh0ID0gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGxpbmUucHJpY2UsIGN1cnJlbmN5Q29kZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gbGluZS5kZXNjcmlwdGlvbiB8fCBsaW5lLnJlY0lkIHx8IFwiLVwiO1xyXG4gICAgICAgICAgICBjb25zdCBzdWJ0aXRsZSA9IGAke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfTogJHtxdHlUZXh0fSAgICR7aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJpY2VcIiwgXCJQcmljZVwiKX06ICR7cHJpY2VUZXh0fWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmVLZXkgPVxyXG4gICAgICAgICAgICAgIFN0cmluZyhsaW5lLnJlY0lkIHx8IFwiXCIpLnRyaW0oKSB8fFxyXG4gICAgICAgICAgICAgIFtsaW5lLmRlc2NyaXB0aW9uLCBsaW5lLnRvdGFsQW1vdW50LCBsaW5lLnByaWNlLCBsaW5lLnF0eV0ubWFwKCh2YWx1ZSkgPT4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKSkuam9pbihcInxcIik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtsaW5lS2V5fSBjbGFzc05hbWU9XCJ0aW1lbGluZS1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxyXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e0VNUFRZX0RBVEVfUEFSVFN9XHJcbiAgICAgICAgICAgICAgICAgIGRhdGVQYW5lbENvbnRlbnQ9e1RJQ0tFVF9MSU5FX0RBVEVfUEFORUxfSUNPTn1cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxyXG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZT17c3VidGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgIHN1YnRpdGxlQ2xhc3NOYW1lPVwiZXhwZW5zZS1zaGVldC1jYXJkX19zdWJ0aXRsZSBleHBlbnNlLWxpbmUtY2FyZF9fbWV0YSB0ZXh0LWxlZnRcIlxyXG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxyXG4gICAgICAgICAgICAgICAgICBvbk9wZW49eygpID0+IG9uT3BlbkxpbmUobGluZS5yZWNJZCl9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlQ2xhc3NOYW1lPVwidGltZWxpbmUtbmFtZSBleHBlbnNlLWxpbmUtY2FyZF9fdGl0bGUgdGV4dC1sZWZ0XCJcclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxyXG4gICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsTGluZVBhZ2VzfVxyXG4gICAgICAgIGN1cnJlbnRQYWdlPXtsaW5lUGFnZX1cclxuICAgICAgICBvblBhZ2VDaGFuZ2U9e29uTGluZVBhZ2VDaGFuZ2V9XHJcbiAgICAgICAgbGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxyXG4gICAgICAvPlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0TGluZXNMaXN0O1xyXG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IFRpY2tldFByZXZpZXdQb2ludCB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbFByb3BzID0ge1xyXG4gIG9wZW46IGJvb2xlYW47XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBlcnJvcjogc3RyaW5nO1xyXG4gIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgaW1hZ2VBbHQ6IHN0cmluZztcclxuICBzY2FsZTogbnVtYmVyO1xyXG4gIHRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50O1xyXG4gIHN1cmZhY2VSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XHJcbiAgb25Qb2ludGVyRG93bjogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIG9uUG9pbnRlck1vdmU6IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICBvblBvaW50ZXJFbmQ6IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICBvbldoZWVsOiAoZXZlbnQ6IFJlYWN0LldoZWVsRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyB0aGUgdGlja2V0IGltYWdlIHByZXZpZXcgb3ZlcmxheSB3aXRoIHpvb20gYW5kIHBhbiBnZXN0dXJlcy5cclxuY29uc3QgRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbCA9ICh7XHJcbiAgb3BlbixcclxuICBidXN5LFxyXG4gIGVycm9yLFxyXG4gIGltYWdlVXJsLFxyXG4gIGltYWdlQWx0LFxyXG4gIHNjYWxlLFxyXG4gIHRyYW5zbGF0ZSxcclxuICBzdXJmYWNlUmVmLFxyXG4gIG9uQ2xvc2UsXHJcbiAgb25Qb2ludGVyRG93bixcclxuICBvblBvaW50ZXJNb3ZlLFxyXG4gIG9uUG9pbnRlckVuZCxcclxuICBvbldoZWVsLFxyXG59OiBFeHBlbnNlVGlja2V0UHJldmlld01vZGFsUHJvcHMpID0+IHtcclxuICBpZiAoIW9wZW4pIHJldHVybiBudWxsO1xyXG5cclxuICByZXR1cm4gY3JlYXRlUG9ydGFsKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG92ZXJzY3JvbGwtY29udGFpbiBiZy1zbGF0ZS05NTAvNDUgcHgtNCBweS02IGJhY2tkcm9wLWJsdXItbWRcIj5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fQ2xvc2VcIiwgXCJDbG9zZVwiKX1cclxuICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wXCJcclxuICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxyXG4gICAgICAvPlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9DbG9zZVwiLCBcIkNsb3NlXCIpfVxyXG4gICAgICAgIGNsYXNzTmFtZT1cImZpeGVkIHJpZ2h0LTQgdG9wLVtjYWxjKDFyZW0rZW52KHNhZmUtYXJlYS1pbnNldC10b3AsMHB4KSldIHotWzYwMDAyMF0gaW5saW5lLWZsZXggaC0xMCB3LTEwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMC82MCBiZy1zbGF0ZS05MDAvNzggdGV4dC1zbGF0ZS0xMDAgc2hhZG93LWxnIHRyYW5zaXRpb24gaG92ZXI6Ymctc2xhdGUtOTAwLzg4IGZvY3VzLXZpc2libGU6b3V0bGluZS1oaWRkZW4gZm9jdXMtdmlzaWJsZTpyaW5nLTIgZm9jdXMtdmlzaWJsZTpyaW5nLXNsYXRlLTIwMC84MFwiXG4gICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XHJcbiAgICAgID5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgIGQ9XCJNNiA2TDE4IDE4TTE4IDZMNiAxOFwiXHJcbiAgICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMS43NVwiXHJcbiAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXggbWF4LWgtWzkydmhdIG1heC13LVs5MnZ3XSBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgb3ZlcnNjcm9sbC1jb250YWluXCI+XHJcbiAgICAgICAge2J1c3kgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS0xMDBcIj5cclxuICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cclxuICAgICAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IGVycm9yID8gKFxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXJvc2UtMjAwXCI+e2Vycm9yfTwvcD5cclxuICAgICAgICApIDogaW1hZ2VVcmwgPyAoXHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIHJlZj17c3VyZmFjZVJlZn1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgbWF4LWgtWzkwdmhdIG1heC13LVs5MnZ3XSBvdmVyZmxvdy1oaWRkZW4gcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gdG91Y2gtbm9uZSBvdmVyc2Nyb2xsLWNvbnRhaW5cIlxuICAgICAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7IHRvdWNoQWN0aW9uOiBcIm5vbmVcIiB9fVxyXG4gICAgICAgICAgICBvblBvaW50ZXJEb3duPXtvblBvaW50ZXJEb3dufVxyXG4gICAgICAgICAgICBvblBvaW50ZXJNb3ZlPXtvblBvaW50ZXJNb3ZlfVxyXG4gICAgICAgICAgICBvblBvaW50ZXJVcD17b25Qb2ludGVyRW5kfVxyXG4gICAgICAgICAgICBvblBvaW50ZXJDYW5jZWw9e29uUG9pbnRlckVuZH1cclxuICAgICAgICAgICAgb25XaGVlbD17b25XaGVlbH1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgIHNyYz17aW1hZ2VVcmx9XHJcbiAgICAgICAgICAgICAgYWx0PXtpbWFnZUFsdCB8fCBpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIil9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtbm9uZSBtYXgtaC1bOTB2aF0gdy1hdXRvIG1heC13LVs5MnZ3XSBzZWxlY3Qtbm9uZSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBvYmplY3QtY29udGFpbiBzaGFkb3ctMnhsXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7dHJhbnNsYXRlLnh9cHgsICR7dHJhbnNsYXRlLnl9cHgsIDApIHNjYWxlKCR7c2NhbGV9KWAsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46IFwiY2VudGVyIGNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogc2NhbGUgPD0gMSA/IFwidHJhbnNmb3JtIDE0MG1zIGVhc2Utb3V0XCIgOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIGRyYWdnYWJsZT17ZmFsc2V9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTEwMFwiPntpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKX08L3A+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj4sXHJcbiAgICBkb2N1bWVudC5ib2R5XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWw7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0U3RpY2t5UHJldmlld1Byb3BzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgZXJyb3I6IHN0cmluZztcclxuICBpbWFnZVVybDogc3RyaW5nO1xyXG4gIGltYWdlQWx0OiBzdHJpbmc7XHJcbiAgZmlsZU5hbWU6IHN0cmluZztcclxuICBvbk9wZW46ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIG9uZSBjb21wYWN0IHRpY2tldCBwcmV2aWV3IHRoYXQgc3RheXMgdmlzaWJsZSB3aGlsZSBkZXRhaWwgY29udGVudCBzY3JvbGxzLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0U3RpY2t5UHJldmlldyA9ICh7XHJcbiAgYnVzeSxcclxuICBlcnJvcixcclxuICBpbWFnZVVybCxcclxuICBpbWFnZUFsdCxcclxuICBmaWxlTmFtZSxcclxuICBvbk9wZW4sXHJcbn06IEV4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3UHJvcHMpID0+IHtcclxuICBjb25zdCBwcmV2aWV3TGFiZWwgPSBpbmRUKFwiVGlja2V0c19EZXRhaWxfVmlld0F0dGFjaG1lbnRcIiwgXCJWZXIgYWRqdW50b1wiKTtcclxuICBjb25zdCB0aWNrZXRMYWJlbCA9IGluZFQoXCJUaWNrZXRzX0ZpZWxkX0ZpbGVJZFwiLCBcIlRpY2tldFwiKTtcclxuICBjb25zdCBzYWZlRmlsZU5hbWUgPSBzYWZlVGV4dChmaWxlTmFtZSkgfHwgc2FmZVRleHQoaW1hZ2VBbHQpIHx8IHRpY2tldExhYmVsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzdGlja3kgdG9wLVs3MnB4XSB6LVsxODAwXSBsZzp0b3AtMjBcIj5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImdyb3VwIGJsb2NrIHctZnVsbCB0b3VjaC1tYW5pcHVsYXRpb24gdGV4dC1sZWZ0IGZvY3VzLXZpc2libGU6b3V0bGluZS1oaWRkZW4gZm9jdXMtdmlzaWJsZTpyaW5nLTIgZm9jdXMtdmlzaWJsZTpyaW5nLXByaW1hcnkvMzUgZm9jdXMtdmlzaWJsZTpyaW5nLW9mZnNldC0yXCJcclxuICAgICAgICBhcmlhLWxhYmVsPXtgJHtwcmV2aWV3TGFiZWx9OiAke3NhZmVGaWxlTmFtZX1gfVxyXG4gICAgICAgIG9uQ2xpY2s9e29uT3Blbn1cclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmZsb3ctaGlkZGVuIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHNoYWRvdy14cyB0cmFuc2l0aW9uLVt0cmFuc2Zvcm0sYm94LXNoYWRvdyxib3JkZXItY29sb3JdIGR1cmF0aW9uLTIwMCBncm91cC1ob3ZlcjotdHJhbnNsYXRlLXktWzFweF0gZ3JvdXAtaG92ZXI6Ym9yZGVyLXByaW1hcnkvMjUgZ3JvdXAtaG92ZXI6c2hhZG93LW1kXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBoLTM2IG92ZXJmbG93LWhpZGRlbiBiZy1saW5lYXItdG8tYnIgZnJvbS1zbGF0ZS0xMDAgdmlhLXdoaXRlIHRvLXNsYXRlLTIwMCBzbTpoLTQwIGxnOmgtWzM4MHB4XVwiPlxyXG4gICAgICAgICAgICB7aW1hZ2VVcmwgPyAoXHJcbiAgICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgICAgc3JjPXtpbWFnZVVybH1cclxuICAgICAgICAgICAgICAgIGFsdD17aW1hZ2VBbHQgfHwgdGlja2V0TGFiZWx9XHJcbiAgICAgICAgICAgICAgICB3aWR0aD17NjQwfVxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0PXs5NjB9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLWZ1bGwgdy1mdWxsIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIG9iamVjdC1jb3ZlciBvYmplY3QtY2VudGVyIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTMwMCBncm91cC1ob3ZlcjpzY2FsZS1bMS4wMTVdIGxnOm9iamVjdC1jb250YWluIGxnOm9iamVjdC1jZW50ZXIgbGc6cC0zXCJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaC1mdWxsIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBweC00XCI+XHJcbiAgICAgICAgICAgICAgICB7YnVzeSA/IChcclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBtaW4tdy0wIGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LXNsYXRlLTcwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBoLTExIHctMTEgc2hyaW5rLTAgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJnLXByaW1hcnkvOCB0ZXh0LXByaW1hcnlcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTcgMy43NWg2LjI1TDE4LjI1IDguNzVWMTkuNWEuNzUuNzUgMCAwIDEtLjc1Ljc1SDdhLjc1Ljc1IDAgMCAxLS43NS0uNzV2LTE1QS43NS43NSAwIDAgMSA3IDMuNzVaXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMS41XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNMTMgMy43NVY4LjVoNC43NVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuNVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLXctMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidHJ1bmNhdGUgdGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtOTAwXCI+e3NhZmVGaWxlTmFtZX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJsaW5lLWNsYW1wLTIgdGV4dC14cyB0ZXh0LXNsYXRlLTUwMFwiPntlcnJvciB8fCBwcmV2aWV3TGFiZWx9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvaW50ZXItZXZlbnRzLW5vbmUgYWJzb2x1dGUgaW5zZXQteC0wIHRvcC0wIGgtMTYgYmctbGluZWFyLXRvLWIgZnJvbS1zbGF0ZS05NTAvMjYgdmlhLXNsYXRlLTkwMC84IHRvLXRyYW5zcGFyZW50IGxnOmgtMjBcIiAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvaW50ZXItZXZlbnRzLW5vbmUgYWJzb2x1dGUgcmlnaHQtMyB0b3AtMyBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYmctcHJpbWFyeS85MiBweC0zIHB5LTEuNSB0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaC0zLjUgdy0zLjVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgICAgIGQ9XCJNMTUgM2g2djZNMjEgM2wtNyA3TTkgMjFIM3YtNk0zIDIxbDctN1wiXHJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMS41XCJcclxuICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgIHtwcmV2aWV3TGFiZWx9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldExpbmVzTGlzdCBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGluZXNMaXN0LnRzeFwiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIsIEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0UHJldmlld01vZGFsIGZyb20gXCIuL0V4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWwudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0U3RpY2t5UHJldmlldyBmcm9tIFwiLi9FeHBlbnNlVGlja2V0U3RpY2t5UHJldmlldy50c3hcIjtcclxuaW1wb3J0IHR5cGUgeyBUaWNrZXRQcmV2aWV3UG9pbnQgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzXCI7XHJcblxyXG50eXBlIFBhZ2luYXRpb25MYWJlbHMgPSB7XHJcbiAgZmlyc3Q6IHN0cmluZztcclxuICBwcmV2OiBzdHJpbmc7XHJcbiAgbmV4dDogc3RyaW5nO1xyXG4gIGxhc3Q6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldERldGFpbFZpZXdQcm9wcyA9IHtcclxuICBtb2RhbDoge1xyXG4gICAgb3BlbjogYm9vbGVhbjtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBjb25maXJtVGV4dDogc3RyaW5nO1xyXG4gICAgY2FuY2VsVGV4dDogc3RyaW5nO1xyXG4gICAgbG9hZGluZ1RleHQ6IHN0cmluZztcclxuICAgIHNob3dDYW5jZWw6IGJvb2xlYW47XHJcbiAgICBzaG93Q29uZmlybTogYm9vbGVhbjtcclxuICAgIGJ1c3k6IGJvb2xlYW47XHJcbiAgICBlcnJvcjogc3RyaW5nO1xyXG4gICAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbiAgICBvbkNhbmNlbDogKCkgPT4gdm9pZDtcclxuICB9O1xyXG4gIHByZXZpZXc6IHtcclxuICAgIG9wZW46IGJvb2xlYW47XHJcbiAgICBidXN5OiBib29sZWFuO1xyXG4gICAgZXJyb3I6IHN0cmluZztcclxuICAgIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICBpbWFnZUFsdDogc3RyaW5nO1xyXG4gICAgc2NhbGU6IG51bWJlcjtcclxuICAgIHRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50O1xyXG4gICAgc3VyZmFjZVJlZjogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xyXG4gICAgb25Qb2ludGVyRG93bjogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gICAgb25Qb2ludGVyTW92ZTogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gICAgb25Qb2ludGVyRW5kOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgICBvbldoZWVsOiAoZXZlbnQ6IFJlYWN0LldoZWVsRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIH07XHJcbiAgY29udGVudDoge1xyXG4gICAgaXNMb2FkaW5nOiBib29sZWFuO1xyXG4gICAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xyXG4gICAgc2hvd1N0aWNreVByZXZpZXc6IGJvb2xlYW47XHJcbiAgICBwcmV2aWV3QnVzeTogYm9vbGVhbjtcclxuICAgIHByZXZpZXdFcnJvcjogc3RyaW5nO1xyXG4gICAgcHJldmlld0ltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICBwcmV2aWV3RmlsZU5hbWU6IHN0cmluZztcclxuICAgIHByZXZpZXdBbHRUZXh0OiBzdHJpbmc7XHJcbiAgICBvbk9wZW5QcmV2aWV3OiAoKSA9PiB2b2lkO1xyXG4gICAgc3RhdHVzTGFiZWw6IHN0cmluZztcclxuICAgIGdhc3RvVHlwZUxhYmVsOiBzdHJpbmc7XHJcbiAgICB0b3RhbEFtb3VudFRleHQ6IHN0cmluZztcclxuICAgIHRyYW5zRGF0ZVRleHQ6IHN0cmluZztcclxuICAgIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICAgIGdhc3RvVHlwZU9wdGlvbnM6IEFycmF5PHsgdmFsdWU6IHN0cmluZzsgdGV4dDogc3RyaW5nIH0+O1xyXG4gICAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gICAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcclxuICAgIGdhc3RvVHlwZUludmFsaWQ6IGJvb2xlYW47XHJcbiAgICBnYXN0b1R5cGVJbnB1dFJlZjogUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgICBjdXJyZW5jeUNvZGVJbnZhbGlkOiBib29sZWFuO1xyXG4gICAgY3VycmVuY3lJbnB1dFJlZjogUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICAgIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgICBkcmFmdFVybEZpbGU6IHN0cmluZztcclxuICAgIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcclxuICAgIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICAgIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICBvbk9wZW5GaWxlOiAoKSA9PiB2b2lkO1xyXG4gICAgb25PcGVuRXhwZW5zZVNoZWV0PzogKCkgPT4gdm9pZDtcclxuICAgIHZpc2libGVMaW5lczogRXhwZW5zZVRpY2tldERldGFpbExpbmVbXTtcclxuICAgIHRvdGFsTGluZVBhZ2VzOiBudW1iZXI7XHJcbiAgICBsaW5lUGFnZTogbnVtYmVyO1xyXG4gICAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgICBwYWdpbmF0aW9uTGFiZWxzOiBQYWdpbmF0aW9uTGFiZWxzO1xyXG4gICAgY29udGFpbmVyUmVmOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICAgIG9uTGluZVBhZ2VDaGFuZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XHJcbiAgICBvbk9wZW5MaW5lOiAobGluZVJlY0lkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICBzdGF0dXM6IHN0cmluZztcclxuICB9O1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyB0aGUgdGlja2V0IGRldGFpbCB2aWV3IHdoaWxlIHRoZSBwYWdlIGNvbnRhaW5lciBvd25zIG9yY2hlc3RyYXRpb24uXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3ID0gKHsgbW9kYWwsIHByZXZpZXcsIGNvbnRlbnQgfTogRXhwZW5zZVRpY2tldERldGFpbFZpZXdQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGRldGFpbEJvZHkgPSAoXHJcbiAgICA8PlxyXG4gICAgICA8RXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm1cclxuICAgICAgICBoZWFkZXI9e2NvbnRlbnQuaGVhZGVyfVxyXG4gICAgICAgIHN0YXR1c0xhYmVsPXtjb250ZW50LnN0YXR1c0xhYmVsfVxyXG4gICAgICAgIGdhc3RvVHlwZUxhYmVsPXtjb250ZW50Lmdhc3RvVHlwZUxhYmVsfVxyXG4gICAgICAgIHRvdGFsQW1vdW50VGV4dD17Y29udGVudC50b3RhbEFtb3VudFRleHR9XHJcbiAgICAgICAgdHJhbnNEYXRlVGV4dD17Y29udGVudC50cmFuc0RhdGVUZXh0fVxyXG4gICAgICAgIGlzRWRpdGluZz17Y29udGVudC5pc0VkaXRpbmd9XHJcbiAgICAgICAgZ2FzdG9UeXBlT3B0aW9ucz17Y29udGVudC5nYXN0b1R5cGVPcHRpb25zfVxyXG4gICAgICAgIGRyYWZ0RGVzY3JpcHRpb249e2NvbnRlbnQuZHJhZnREZXNjcmlwdGlvbn1cclxuICAgICAgICBkcmFmdEdhc3RvVHlwZT17Y29udGVudC5kcmFmdEdhc3RvVHlwZX1cclxuICAgICAgICBnYXN0b1R5cGVJbnZhbGlkPXtjb250ZW50Lmdhc3RvVHlwZUludmFsaWR9XHJcbiAgICAgICAgZ2FzdG9UeXBlSW5wdXRSZWY9e2NvbnRlbnQuZ2FzdG9UeXBlSW5wdXRSZWZ9XHJcbiAgICAgICAgZHJhZnRDdXJyZW5jeUNvZGU9e2NvbnRlbnQuZHJhZnRDdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgY3VycmVuY3lDb2RlSW52YWxpZD17Y29udGVudC5jdXJyZW5jeUNvZGVJbnZhbGlkfVxyXG4gICAgICAgIGN1cnJlbmN5SW5wdXRSZWY9e2NvbnRlbnQuY3VycmVuY3lJbnB1dFJlZn1cclxuICAgICAgICBkcmFmdFRyYW5zRGF0ZT17Y29udGVudC5kcmFmdFRyYW5zRGF0ZX1cclxuICAgICAgICBkcmFmdFVybEZpbGU9e2NvbnRlbnQuZHJhZnRVcmxGaWxlfVxyXG4gICAgICAgIGRyYWZ0RmlsZU5hbWU9e2NvbnRlbnQuZHJhZnRGaWxlTmFtZX1cclxuICAgICAgICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U9e2NvbnRlbnQub25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlfVxyXG4gICAgICAgIG9uRHJhZnRHYXN0b1R5cGVDaGFuZ2U9e2NvbnRlbnQub25EcmFmdEdhc3RvVHlwZUNoYW5nZX1cclxuICAgICAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlPXtjb250ZW50Lm9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XHJcbiAgICAgICAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZT17Y29udGVudC5vbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlfVxyXG4gICAgICAgIG9uT3BlbkZpbGU9e2NvbnRlbnQub25PcGVuRmlsZX1cclxuICAgICAgICBvbk9wZW5FeHBlbnNlU2hlZXQ9e2NvbnRlbnQub25PcGVuRXhwZW5zZVNoZWV0fVxyXG4gICAgICAgIGhpZGVPcGVuRmlsZUFjdGlvbj17Y29udGVudC5zaG93U3RpY2t5UHJldmlld31cclxuICAgICAgLz5cclxuICAgICAgPEV4cGVuc2VUaWNrZXRMaW5lc0xpc3RcclxuICAgICAgICB2aXNpYmxlTGluZXM9e2NvbnRlbnQudmlzaWJsZUxpbmVzfVxyXG4gICAgICAgIHRvdGFsTGluZVBhZ2VzPXtjb250ZW50LnRvdGFsTGluZVBhZ2VzfVxyXG4gICAgICAgIGxpbmVQYWdlPXtjb250ZW50LmxpbmVQYWdlfVxyXG4gICAgICAgIGN1cnJlbmN5Q29kZT17Y29udGVudC5jdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgcGFnaW5hdGlvbkxhYmVscz17Y29udGVudC5wYWdpbmF0aW9uTGFiZWxzfVxyXG4gICAgICAgIGNvbnRhaW5lclJlZj17Y29udGVudC5jb250YWluZXJSZWZ9XHJcbiAgICAgICAgb25MaW5lUGFnZUNoYW5nZT17Y29udGVudC5vbkxpbmVQYWdlQ2hhbmdlfVxyXG4gICAgICAgIG9uT3BlbkxpbmU9e2NvbnRlbnQub25PcGVuTGluZX1cclxuICAgICAgLz5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+e2NvbnRlbnQuc3RhdHVzfTwvZGl2PlxyXG4gICAgPC8+XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbC5jb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbC5jYW5jZWxUZXh0fVxyXG4gICAgICAgIGxvYWRpbmdUZXh0PXttb2RhbC5sb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXttb2RhbC5idXN5fVxyXG4gICAgICAgIGVycm9yPXttb2RhbC5lcnJvcn1cclxuICAgICAgICBzdGF0dXM9e21vZGFsLnN0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e21vZGFsLm9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17bW9kYWwub25DYW5jZWx9XHJcbiAgICAgIC8+XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0UHJldmlld01vZGFsXHJcbiAgICAgICAgb3Blbj17cHJldmlldy5vcGVufVxyXG4gICAgICAgIGJ1c3k9e3ByZXZpZXcuYnVzeX1cclxuICAgICAgICBlcnJvcj17cHJldmlldy5lcnJvcn1cclxuICAgICAgICBpbWFnZVVybD17cHJldmlldy5pbWFnZVVybH1cclxuICAgICAgICBpbWFnZUFsdD17cHJldmlldy5pbWFnZUFsdH1cclxuICAgICAgICBzY2FsZT17cHJldmlldy5zY2FsZX1cclxuICAgICAgICB0cmFuc2xhdGU9e3ByZXZpZXcudHJhbnNsYXRlfVxyXG4gICAgICAgIHN1cmZhY2VSZWY9e3ByZXZpZXcuc3VyZmFjZVJlZn1cclxuICAgICAgICBvbkNsb3NlPXtwcmV2aWV3Lm9uQ2xvc2V9XHJcbiAgICAgICAgb25Qb2ludGVyRG93bj17cHJldmlldy5vblBvaW50ZXJEb3dufVxyXG4gICAgICAgIG9uUG9pbnRlck1vdmU9e3ByZXZpZXcub25Qb2ludGVyTW92ZX1cclxuICAgICAgICBvblBvaW50ZXJFbmQ9e3ByZXZpZXcub25Qb2ludGVyRW5kfVxyXG4gICAgICAgIG9uV2hlZWw9e3ByZXZpZXcub25XaGVlbH1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxyXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGNvbnRlbnQuaXNMb2FkaW5nID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cclxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtjb250ZW50LmVycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57Y29udGVudC5lcnJvck1lc3NhZ2V9PC9kaXY+IDogbnVsbH1cclxuXHJcbiAgICAgIHshY29udGVudC5pc0xvYWRpbmcgJiYgIWNvbnRlbnQuZXJyb3JNZXNzYWdlICYmIGNvbnRlbnQuaGVhZGVyID8gKFxyXG4gICAgICAgIGNvbnRlbnQuc2hvd1N0aWNreVByZXZpZXcgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBsZzpncmlkIGxnOmdyaWQtY29scy1bbWlubWF4KDAsMWZyKV8zMjBweF0gbGc6Z2FwLTQgbGc6c3BhY2UteS0wXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXN0YXJ0LTJcIj5cclxuICAgICAgICAgICAgICA8RXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXdcclxuICAgICAgICAgICAgICAgIGJ1c3k9e2NvbnRlbnQucHJldmlld0J1c3l9XHJcbiAgICAgICAgICAgICAgICBlcnJvcj17Y29udGVudC5wcmV2aWV3RXJyb3J9XHJcbiAgICAgICAgICAgICAgICBpbWFnZVVybD17Y29udGVudC5wcmV2aWV3SW1hZ2VVcmx9XHJcbiAgICAgICAgICAgICAgICBpbWFnZUFsdD17Y29udGVudC5wcmV2aWV3QWx0VGV4dH1cclxuICAgICAgICAgICAgICAgIGZpbGVOYW1lPXtjb250ZW50LnByZXZpZXdGaWxlTmFtZX1cclxuICAgICAgICAgICAgICAgIG9uT3Blbj17Y29udGVudC5vbk9wZW5QcmV2aWV3fVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBsZzpjb2wtc3RhcnQtMSBsZzpyb3ctc3RhcnQtMVwiPntkZXRhaWxCb2R5fTwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIGRldGFpbEJvZHlcclxuICAgICAgICApXHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUgfSBmcm9tIFwiLi4vdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZS50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsLFxyXG4gIGJ1aWxkRXhwZW5zZVRpY2tldExpbmtVcmwsXHJcbiAgdHlwZSBFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgdG9FeHBlbnNlSXNvRGF0ZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxCYWNrTmF2aWdhdGlvbkFyZ3MgPSB7XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgZGV0YWlsT3JpZ2luOiBzdHJpbmc7XHJcbiAgaGVhZGVyVHJhbnNEYXRlOiB1bmtub3duO1xyXG4gIHRpY2tldFJldHVybkNvbnRleHQ/OiBFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCB8IG51bGw7XHJcbiAgcmVhZENhY2hlZFN0YXRlOiAoKSA9PiBFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlIHwgbnVsbDtcclxuICBzYXZlQ2FjaGVkU3RhdGU6IChzdGF0ZTogRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIEtlZXBzIG5hdGl2ZSBiYWNrIG5hdmlnYXRpb24gYWxpZ25lZCB3aXRoIHRoZSB0aWNrZXQgZW50cnkgcG9pbnQgYW5kIHByZXNlcnZlcyBjYWNoZWQgbGluay1tb2RlIHN0YXRlLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uID0gKHtcclxuICBmaWxlSWQsXHJcbiAgZGV0YWlsT3JpZ2luLFxyXG4gIGhlYWRlclRyYW5zRGF0ZSxcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIHJlYWRDYWNoZWRTdGF0ZSxcclxuICBzYXZlQ2FjaGVkU3RhdGUsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxCYWNrTmF2aWdhdGlvbkFyZ3MpID0+IHtcclxuICBjb25zdCBzaG91bGRSZXR1cm5Ub1RpY2tldExpc3QgPSB0aWNrZXRSZXR1cm5Db250ZXh0Py5vcmlnaW4gPT09IFwic2hlZXQtbGlua1wiIHx8ICF0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkO1xyXG5cclxuICBjb25zdCBuYXRpdmVCYWNrVXJsID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBpZiAodGlja2V0UmV0dXJuQ29udGV4dD8ub3JpZ2luID09PSBcInNoZWV0LWxpbmtcIiAmJiB0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0SWQpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkRXhwZW5zZVRpY2tldExpbmtVcmwodGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCkge1xyXG4gICAgICByZXR1cm4gYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwodGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGV0YWlsT3JpZ2luID09PSBcInRpY2tldC1jcmVhdGVcIikge1xyXG4gICAgICBjb25zdCB0aWNrZXREYXRlID0gdG9FeHBlbnNlSXNvRGF0ZShoZWFkZXJUcmFuc0RhdGUpIHx8IHRvRXhwZW5zZUlzb0RhdGUobmV3IERhdGUoKSk7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgICAgdGlja2V0RmlsZUlkOiBmaWxlSWQsXHJcbiAgICAgICAgdGlja2V0RGF0ZSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gYC9HYXN0b3MvVGlja2V0cz8ke3F1ZXJ5LnRvU3RyaW5nKCl9YDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gXCIvR2FzdG9zL1RpY2tldHNcIjtcclxuICB9LCBbZGV0YWlsT3JpZ2luLCBmaWxlSWQsIGhlYWRlclRyYW5zRGF0ZSwgdGlja2V0UmV0dXJuQ29udGV4dF0pO1xyXG5cclxuICBjb25zdCByZWFybUV4cGVuc2VUaWNrZXRzUmV0dXJuU3RhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBjYWNoZWRTdGF0ZSA9IHJlYWRDYWNoZWRTdGF0ZSgpO1xyXG4gICAgaWYgKCFjYWNoZWRTdGF0ZSkgcmV0dXJuO1xyXG4gICAgc2F2ZUNhY2hlZFN0YXRlKGNhY2hlZFN0YXRlKTtcclxuICB9LCBbcmVhZENhY2hlZFN0YXRlLCBzYXZlQ2FjaGVkU3RhdGVdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghZmlsZUlkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgYmFja0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsQmFja0J0blwiKTtcclxuICAgIGlmICghYmFja0J1dHRvbikgcmV0dXJuO1xyXG5cclxuICAgIGJhY2tCdXR0b24uc2V0QXR0cmlidXRlKFwiZGF0YS1iYWNrLXVybFwiLCBuYXRpdmVCYWNrVXJsKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGJhY2tCdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1iYWNrLXVybFwiKTtcclxuICAgIH07XHJcbiAgfSwgW2ZpbGVJZCwgbmF0aXZlQmFja1VybF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFmaWxlSWQpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVOYXRpdmVCYWNrID0gKGV2ZW50OiBQb3BTdGF0ZUV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudD8uc3RhdGUgJiYgZXZlbnQuc3RhdGUuaW5kVHJhcCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChzaG91bGRSZXR1cm5Ub1RpY2tldExpc3QpIHtcclxuICAgICAgICAgIHJlYXJtRXhwZW5zZVRpY2tldHNSZXR1cm5TdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShuYXRpdmVCYWNrVXJsKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uKGV4ZWN1dGVCYWNrTmF2aWdhdGlvbik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBleGVjdXRlQmFja05hdmlnYXRpb24oKTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBoYW5kbGVOYXRpdmVCYWNrKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgaGFuZGxlTmF0aXZlQmFjayk7XHJcbiAgICB9O1xyXG4gIH0sIFtmaWxlSWQsIG5hdGl2ZUJhY2tVcmwsIHJlYXJtRXhwZW5zZVRpY2tldHNSZXR1cm5TdGF0ZSwgc2hvdWxkUmV0dXJuVG9UaWNrZXRMaXN0XSk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzXCI7XHJcbmltcG9ydCB7IGhhc0V4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdTb3VyY2UgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0UHJldmlld1V0aWxzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWxBcmdzID0ge1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBkcmFmdFVybEZpbGU6IHN0cmluZztcclxuICBoZWFkZXJVcmxGaWxlPzogc3RyaW5nIHwgbnVsbDtcclxufTtcclxuXHJcbi8vIENlbnRyYWxpemVzIHN0aWNreS1wcmV2aWV3IGF2YWlsYWJpbGl0eSBhbmQgaW1hZ2UgbG9hZGluZyBmb3IgdGlja2V0IGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWwgPSAoe1xyXG4gIGZpbGVJZCxcclxuICBpc0VkaXRpbmcsXHJcbiAgZHJhZnRVcmxGaWxlLFxyXG4gIGhlYWRlclVybEZpbGUsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWxBcmdzKSA9PiB7XHJcbiAgY29uc3QgcHJldmlld1NvdXJjZVVybCA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQoaXNFZGl0aW5nID8gZHJhZnRVcmxGaWxlIDogaGVhZGVyVXJsRmlsZSksIFtkcmFmdFVybEZpbGUsIGhlYWRlclVybEZpbGUsIGlzRWRpdGluZ10pO1xyXG4gIGNvbnN0IHNob3dTdGlja3lQcmV2aWV3ID0gdXNlTWVtbygoKSA9PiBoYXNFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3U291cmNlKHByZXZpZXdTb3VyY2VVcmwpLCBbcHJldmlld1NvdXJjZVVybF0pO1xyXG4gIGNvbnN0IHByZXZpZXcgPSB1c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3KHtcclxuICAgIGZpbGVJZCxcclxuICAgIHNvdXJjZVVybDogcHJldmlld1NvdXJjZVVybCxcclxuICAgIGVuYWJsZWQ6IHNob3dTdGlja3lQcmV2aWV3LFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc2hvd1N0aWNreVByZXZpZXcsXHJcbiAgICAuLi5wcmV2aWV3LFxyXG4gIH07XHJcbn07XHJcbiIsICJcdUZFRkZpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRQcmV2aWV3QmxvYiB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG5jb25zdCBQUkVWSUVXX01BWF9TQ0FMRSA9IDQ7XHJcbmNvbnN0IFBSRVZJRVdfU0NBTEVfU1RFUCA9IDAuMjU7XHJcblxyXG5leHBvcnQgdHlwZSBUaWNrZXRQcmV2aWV3UG9pbnQgPSB7XHJcbiAgeDogbnVtYmVyO1xyXG4gIHk6IG51bWJlcjtcclxufTtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlld0FyZ3MgPSB7XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgc291cmNlVXJsOiBzdHJpbmc7XHJcbiAgZW5hYmxlZD86IGJvb2xlYW47XHJcbn07XHJcblxyXG5jb25zdCBjbGFtcFByZXZpZXdTY2FsZSA9ICh2YWx1ZTogbnVtYmVyKTogbnVtYmVyID0+IHtcclxuICBpZiAoIU51bWJlci5pc0Zpbml0ZSh2YWx1ZSkpIHJldHVybiAxO1xyXG4gIHJldHVybiBNYXRoLm1pbihQUkVWSUVXX01BWF9TQ0FMRSwgTWF0aC5tYXgoMSwgdmFsdWUpKTtcclxufTtcclxuXHJcbmNvbnN0IGdldFByZXZpZXdQb2ludERpc3RhbmNlID0gKGxlZnQ6IFRpY2tldFByZXZpZXdQb2ludCwgcmlnaHQ6IFRpY2tldFByZXZpZXdQb2ludCk6IG51bWJlciA9PiB7XHJcbiAgY29uc3QgZGVsdGFYID0gcmlnaHQueCAtIGxlZnQueDtcclxuICBjb25zdCBkZWx0YVkgPSByaWdodC55IC0gbGVmdC55O1xyXG4gIHJldHVybiBNYXRoLnNxcnQoZGVsdGFYICogZGVsdGFYICsgZGVsdGFZICogZGVsdGFZKTtcclxufTtcclxuXHJcbmNvbnN0IGdldFByZXZpZXdQb2ludENlbnRlciA9IChsZWZ0OiBUaWNrZXRQcmV2aWV3UG9pbnQsIHJpZ2h0OiBUaWNrZXRQcmV2aWV3UG9pbnQpOiBUaWNrZXRQcmV2aWV3UG9pbnQgPT4gKHtcclxuICB4OiAobGVmdC54ICsgcmlnaHQueCkgLyAyLFxyXG4gIHk6IChsZWZ0LnkgKyByaWdodC55KSAvIDIsXHJcbn0pO1xyXG5cclxuLy8gTWFuYWdlcyB0aWNrZXQgaW1hZ2UgcHJldmlldyBzdGF0ZSBhbmQgem9vbS9wYW4gZ2VzdHVyZXMuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3ID0gKHsgZmlsZUlkLCBzb3VyY2VVcmwsIGVuYWJsZWQgPSB0cnVlIH06IFVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdBcmdzKSA9PiB7XHJcbiAgY29uc3QgW3ByZXZpZXdPcGVuLCBzZXRQcmV2aWV3T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3ByZXZpZXdCdXN5LCBzZXRQcmV2aWV3QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3ByZXZpZXdFcnJvciwgc2V0UHJldmlld0Vycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtwcmV2aWV3SW1hZ2VVcmwsIHNldFByZXZpZXdJbWFnZVVybF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbcHJldmlld1NjYWxlLCBzZXRQcmV2aWV3U2NhbGVdID0gdXNlU3RhdGUoMSk7XHJcbiAgY29uc3QgW3ByZXZpZXdUcmFuc2xhdGUsIHNldFByZXZpZXdUcmFuc2xhdGVdID0gdXNlU3RhdGU8VGlja2V0UHJldmlld1BvaW50Pih7IHg6IDAsIHk6IDAgfSk7XHJcblxyXG4gIGNvbnN0IHByZXZpZXdTY2FsZVJlZiA9IHVzZVJlZigxKTtcclxuICBjb25zdCBwcmV2aWV3SW1hZ2VVcmxSZWYgPSB1c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgcHJldmlld1JlcXVlc3RLZXlSZWYgPSB1c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgcHJldmlld0xvYWRQcm9taXNlUmVmID0gdXNlUmVmPFByb21pc2U8c3RyaW5nPiB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHByZXZpZXdTdXJmYWNlUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcHJldmlld1RyYW5zbGF0ZVJlZiA9IHVzZVJlZjxUaWNrZXRQcmV2aWV3UG9pbnQ+KHsgeDogMCwgeTogMCB9KTtcclxuICBjb25zdCBwcmV2aWV3UG9pbnRlcnNSZWYgPSB1c2VSZWY8TWFwPG51bWJlciwgVGlja2V0UHJldmlld1BvaW50Pj4obmV3IE1hcCgpKTtcclxuICBjb25zdCBwcmV2aWV3UGFuUG9pbnRlclJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBwcmV2aWV3UGFuTGFzdFBvaW50UmVmID0gdXNlUmVmPFRpY2tldFByZXZpZXdQb2ludCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHByZXZpZXdQaW5jaFNuYXBzaG90UmVmID0gdXNlUmVmPHtcclxuICAgIGRpc3RhbmNlOiBudW1iZXI7XHJcbiAgICBzY2FsZTogbnVtYmVyO1xyXG4gICAgY2VudGVyOiBUaWNrZXRQcmV2aWV3UG9pbnQ7XHJcbiAgICB0cmFuc2xhdGU6IFRpY2tldFByZXZpZXdQb2ludDtcclxuICB9IHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIGNvbnN0IGFwcGx5UHJldmlld1RyYW5zZm9ybSA9IHVzZUNhbGxiYWNrKChuZXh0U2NhbGU6IG51bWJlciwgbmV4dFRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50KSA9PiB7XHJcbiAgICBjb25zdCBub3JtYWxpemVkU2NhbGUgPSBjbGFtcFByZXZpZXdTY2FsZShuZXh0U2NhbGUpO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZFRyYW5zbGF0ZSA9IG5vcm1hbGl6ZWRTY2FsZSA8PSAxID8geyB4OiAwLCB5OiAwIH0gOiBuZXh0VHJhbnNsYXRlO1xyXG5cclxuICAgIHByZXZpZXdTY2FsZVJlZi5jdXJyZW50ID0gbm9ybWFsaXplZFNjYWxlO1xyXG4gICAgcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50ID0gbm9ybWFsaXplZFRyYW5zbGF0ZTtcclxuICAgIHNldFByZXZpZXdTY2FsZShub3JtYWxpemVkU2NhbGUpO1xyXG4gICAgc2V0UHJldmlld1RyYW5zbGF0ZShub3JtYWxpemVkVHJhbnNsYXRlKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHJlc2V0UHJldmlld0dlc3R1cmUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5jbGVhcigpO1xyXG4gICAgcHJldmlld1BhblBvaW50ZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBhcHBseVByZXZpZXdUcmFuc2Zvcm0oMSwgeyB4OiAwLCB5OiAwIH0pO1xyXG4gIH0sIFthcHBseVByZXZpZXdUcmFuc2Zvcm1dKTtcclxuXHJcbiAgY29uc3QgcmVidWlsZFBpbmNoU25hcHNob3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBwb2ludGVyUG9pbnRzID0gQXJyYXkuZnJvbShwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC52YWx1ZXMoKSk7XHJcbiAgICBpZiAocG9pbnRlclBvaW50cy5sZW5ndGggPCAyKSB7XHJcbiAgICAgIHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgW2xlZnQsIHJpZ2h0XSA9IHBvaW50ZXJQb2ludHM7XHJcbiAgICBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50ID0ge1xyXG4gICAgICBkaXN0YW5jZTogTWF0aC5tYXgoMSwgZ2V0UHJldmlld1BvaW50RGlzdGFuY2UobGVmdCwgcmlnaHQpKSxcclxuICAgICAgc2NhbGU6IHByZXZpZXdTY2FsZVJlZi5jdXJyZW50LFxyXG4gICAgICBjZW50ZXI6IGdldFByZXZpZXdQb2ludENlbnRlcihsZWZ0LCByaWdodCksXHJcbiAgICAgIHRyYW5zbGF0ZTogcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50LFxyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHJlcGxhY2VQcmV2aWV3SW1hZ2VVcmwgPSB1c2VDYWxsYmFjaygobmV4dFVybDogc3RyaW5nKSA9PiB7XHJcbiAgICBzZXRQcmV2aWV3SW1hZ2VVcmwoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgIGlmIChwcmV2aW91cyAmJiBwcmV2aW91cyAhPT0gbmV4dFVybCkge1xyXG4gICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwocHJldmlvdXMpO1xyXG4gICAgICB9XHJcbiAgICAgIHByZXZpZXdJbWFnZVVybFJlZi5jdXJyZW50ID0gbmV4dFVybDtcclxuICAgICAgcmV0dXJuIG5leHRVcmw7XHJcbiAgICB9KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNsZWFyUHJldmlld0ltYWdlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgcHJldmlld0xvYWRQcm9taXNlUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgc2V0UHJldmlld0ltYWdlVXJsKChwcmV2aW91cykgPT4ge1xyXG4gICAgICBpZiAocHJldmlvdXMpIHtcclxuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHByZXZpb3VzKTtcclxuICAgICAgfVxyXG4gICAgICBwcmV2aWV3SW1hZ2VVcmxSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBsb2FkUHJldmlld0ltYWdlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCk6IFByb21pc2U8c3RyaW5nPiA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50RmlsZUlkID0gc2FmZVRleHQoZmlsZUlkKTtcclxuICAgIGNvbnN0IGN1cnJlbnRVcmwgPSBzYWZlVGV4dChzb3VyY2VVcmwpO1xyXG4gICAgaWYgKCFlbmFibGVkIHx8ICFjdXJyZW50RmlsZUlkIHx8ICFjdXJyZW50VXJsKSB7XHJcbiAgICAgIHNldFByZXZpZXdCdXN5KGZhbHNlKTtcclxuICAgICAgc2V0UHJldmlld0Vycm9yKFwiXCIpO1xyXG4gICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJldmlld0ltYWdlVXJsUmVmLmN1cnJlbnQpIHtcclxuICAgICAgcmV0dXJuIHByZXZpZXdJbWFnZVVybFJlZi5jdXJyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcmV2aWV3TG9hZFByb21pc2VSZWYuY3VycmVudCkge1xyXG4gICAgICByZXR1cm4gcHJldmlld0xvYWRQcm9taXNlUmVmLmN1cnJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdEtleSA9IGAke2N1cnJlbnRGaWxlSWR9X18ke2N1cnJlbnRVcmx9YDtcclxuICAgIHByZXZpZXdSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPSByZXF1ZXN0S2V5O1xyXG4gICAgc2V0UHJldmlld0J1c3kodHJ1ZSk7XHJcbiAgICBzZXRQcmV2aWV3RXJyb3IoXCJcIik7XHJcblxyXG4gICAgY29uc3QgbmV4dFByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldFByZXZpZXdCbG9iKGN1cnJlbnRGaWxlSWQsIGN1cnJlbnRVcmwsIHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IG9iamVjdFVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgICAgICAgaWYgKHByZXZpZXdSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgIT09IHJlcXVlc3RLZXkpIHtcclxuICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwob2JqZWN0VXJsKTtcclxuICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVwbGFjZVByZXZpZXdJbWFnZVVybChvYmplY3RVcmwpO1xyXG4gICAgICAgIHJldHVybiBvYmplY3RVcmw7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKHByZXZpZXdSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPT09IHJlcXVlc3RLZXkpIHtcclxuICAgICAgICAgIHNldFByZXZpZXdFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIGlmIChwcmV2aWV3UmVxdWVzdEtleVJlZi5jdXJyZW50ID09PSByZXF1ZXN0S2V5KSB7XHJcbiAgICAgICAgICBzZXRQcmV2aWV3QnVzeShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByZXZpZXdMb2FkUHJvbWlzZVJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICBwcmV2aWV3TG9hZFByb21pc2VSZWYuY3VycmVudCA9IG5leHRQcm9taXNlO1xyXG4gICAgcmV0dXJuIG5leHRQcm9taXNlO1xyXG4gIH0sIFtlbmFibGVkLCBmaWxlSWQsIHJlcGxhY2VQcmV2aWV3SW1hZ2VVcmwsIHNvdXJjZVVybF0pO1xyXG5cclxuICBjb25zdCBjbG9zZVByZXZpZXcgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRQcmV2aWV3T3BlbihmYWxzZSk7XHJcbiAgICBzZXRQcmV2aWV3QnVzeShmYWxzZSk7XHJcbiAgICBzZXRQcmV2aWV3RXJyb3IoXCJcIik7XHJcbiAgICByZXNldFByZXZpZXdHZXN0dXJlKCk7XHJcbiAgfSwgW3Jlc2V0UHJldmlld0dlc3R1cmVdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFyUHJldmlld0ltYWdlKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtjbGVhclByZXZpZXdJbWFnZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgcHJldmlld1JlcXVlc3RLZXlSZWYuY3VycmVudCA9IGAke3NhZmVUZXh0KGZpbGVJZCl9X18ke3NhZmVUZXh0KHNvdXJjZVVybCl9YDtcclxuICAgIHNldFByZXZpZXdPcGVuKGZhbHNlKTtcclxuICAgIHNldFByZXZpZXdCdXN5KGZhbHNlKTtcclxuICAgIHNldFByZXZpZXdFcnJvcihcIlwiKTtcclxuICAgIHJlc2V0UHJldmlld0dlc3R1cmUoKTtcclxuICAgIGNsZWFyUHJldmlld0ltYWdlKCk7XHJcblxyXG4gICAgaWYgKGVuYWJsZWQgJiYgc2FmZVRleHQoZmlsZUlkKSAmJiBzYWZlVGV4dChzb3VyY2VVcmwpKSB7XHJcbiAgICAgIHZvaWQgbG9hZFByZXZpZXdJbWFnZSgpO1xyXG4gICAgfVxyXG4gIH0sIFtjbGVhclByZXZpZXdJbWFnZSwgZW5hYmxlZCwgZmlsZUlkLCBsb2FkUHJldmlld0ltYWdlLCByZXNldFByZXZpZXdHZXN0dXJlLCBzb3VyY2VVcmxdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghcHJldmlld09wZW4pIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBvbktleURvd24gPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG4gICAgICAgIGNsb3NlUHJldmlldygpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xyXG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xyXG4gIH0sIFtwcmV2aWV3T3BlbiwgY2xvc2VQcmV2aWV3XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXByZXZpZXdPcGVuKSByZXR1cm47XHJcbiAgICBjb25zdCBzdXJmYWNlID0gcHJldmlld1N1cmZhY2VSZWYuY3VycmVudDtcclxuICAgIGlmICghc3VyZmFjZSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHByZXZlbnRHZXN0dXJlRGVmYXVsdCA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcHJldmVudFRvdWNoVmlld3BvcnRab29tID0gKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHByZXZlbnRDdHJsV2hlZWxWaWV3cG9ydFpvb20gPSAoZXZlbnQ6IFdoZWVsRXZlbnQpID0+IHtcclxuICAgICAgaWYgKGV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHN1cmZhY2UuYWRkRXZlbnRMaXN0ZW5lcihcImdlc3R1cmVzdGFydFwiLCBwcmV2ZW50R2VzdHVyZURlZmF1bHQsIHsgcGFzc2l2ZTogZmFsc2UgfSk7XHJcbiAgICBzdXJmYWNlLmFkZEV2ZW50TGlzdGVuZXIoXCJnZXN0dXJlY2hhbmdlXCIsIHByZXZlbnRHZXN0dXJlRGVmYXVsdCwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcclxuICAgIHN1cmZhY2UuYWRkRXZlbnRMaXN0ZW5lcihcImdlc3R1cmVlbmRcIiwgcHJldmVudEdlc3R1cmVEZWZhdWx0LCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xyXG4gICAgc3VyZmFjZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHByZXZlbnRUb3VjaFZpZXdwb3J0Wm9vbSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcclxuICAgIHN1cmZhY2UuYWRkRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIHByZXZlbnRDdHJsV2hlZWxWaWV3cG9ydFpvb20sIHsgcGFzc2l2ZTogZmFsc2UgfSk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgc3VyZmFjZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiZ2VzdHVyZXN0YXJ0XCIsIHByZXZlbnRHZXN0dXJlRGVmYXVsdCk7XHJcbiAgICAgIHN1cmZhY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImdlc3R1cmVjaGFuZ2VcIiwgcHJldmVudEdlc3R1cmVEZWZhdWx0KTtcclxuICAgICAgc3VyZmFjZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiZ2VzdHVyZWVuZFwiLCBwcmV2ZW50R2VzdHVyZURlZmF1bHQpO1xyXG4gICAgICBzdXJmYWNlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgcHJldmVudFRvdWNoVmlld3BvcnRab29tKTtcclxuICAgICAgc3VyZmFjZS5yZW1vdmVFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgcHJldmVudEN0cmxXaGVlbFZpZXdwb3J0Wm9vbSk7XHJcbiAgICB9O1xyXG4gIH0sIFtwcmV2aWV3T3Blbl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24gPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xyXG4gICAgICBpZiAoIXByZXZpZXdJbWFnZVVybCB8fCBwcmV2aWV3QnVzeSkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBwb2ludDogVGlja2V0UHJldmlld1BvaW50ID0geyB4OiBldmVudC5jbGllbnRYLCB5OiBldmVudC5jbGllbnRZIH07XHJcbiAgICAgIHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LnNldChldmVudC5wb2ludGVySWQsIHBvaW50KTtcclxuICAgICAgaWYgKHR5cGVvZiBldmVudC5jdXJyZW50VGFyZ2V0LnNldFBvaW50ZXJDYXB0dXJlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5zZXRQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgLy8gSWdub3JlIGNhcHR1cmUgZmFpbHVyZXMgb24gYnJvd3NlcnMgdGhhdCBkbyBub3QgZnVsbHkgc3VwcG9ydCBwb2ludGVyIGNhcHR1cmUuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuc2l6ZSA9PT0gMSkge1xyXG4gICAgICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBldmVudC5wb2ludGVySWQ7XHJcbiAgICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gcG9pbnQ7XHJcbiAgICAgICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcmVidWlsZFBpbmNoU25hcHNob3QoKTtcclxuICAgIH0sXHJcbiAgICBbcHJldmlld0J1c3ksIHByZXZpZXdJbWFnZVVybCwgcmVidWlsZFBpbmNoU25hcHNob3RdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgICAgaWYgKCFwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5oYXMoZXZlbnQucG9pbnRlcklkKSkgcmV0dXJuO1xyXG5cclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgcG9pbnQ6IFRpY2tldFByZXZpZXdQb2ludCA9IHsgeDogZXZlbnQuY2xpZW50WCwgeTogZXZlbnQuY2xpZW50WSB9O1xyXG4gICAgICBwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5zZXQoZXZlbnQucG9pbnRlcklkLCBwb2ludCk7XHJcblxyXG4gICAgICBjb25zdCBwb2ludGVyRW50cmllcyA9IEFycmF5LmZyb20ocHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuZW50cmllcygpKTtcclxuICAgICAgY29uc3QgcG9pbnRlclBvaW50cyA9IHBvaW50ZXJFbnRyaWVzLm1hcCgoZW50cnkpID0+IGVudHJ5WzFdKTtcclxuXHJcbiAgICAgIGlmIChwb2ludGVyUG9pbnRzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgaWYgKCFwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICByZWJ1aWxkUGluY2hTbmFwc2hvdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc25hcHNob3QgPSBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50O1xyXG4gICAgICAgIGlmICghc25hcHNob3QpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgW2xlZnQsIHJpZ2h0XSA9IHBvaW50ZXJQb2ludHM7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLm1heCgxLCBnZXRQcmV2aWV3UG9pbnREaXN0YW5jZShsZWZ0LCByaWdodCkpO1xyXG4gICAgICAgIGNvbnN0IHJhdGlvID0gZGlzdGFuY2UgLyBNYXRoLm1heCgxLCBzbmFwc2hvdC5kaXN0YW5jZSk7XHJcbiAgICAgICAgY29uc3QgbmV4dFNjYWxlID0gY2xhbXBQcmV2aWV3U2NhbGUoc25hcHNob3Quc2NhbGUgKiByYXRpbyk7XHJcbiAgICAgICAgY29uc3QgY2VudGVyID0gZ2V0UHJldmlld1BvaW50Q2VudGVyKGxlZnQsIHJpZ2h0KTtcclxuICAgICAgICBjb25zdCBuZXh0VHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQgPSB7XHJcbiAgICAgICAgICB4OiBzbmFwc2hvdC50cmFuc2xhdGUueCArIChjZW50ZXIueCAtIHNuYXBzaG90LmNlbnRlci54KSxcclxuICAgICAgICAgIHk6IHNuYXBzaG90LnRyYW5zbGF0ZS55ICsgKGNlbnRlci55IC0gc25hcHNob3QuY2VudGVyLnkpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYXBwbHlQcmV2aWV3VHJhbnNmb3JtKG5leHRTY2FsZSwgbmV4dFRyYW5zbGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocG9pbnRlclBvaW50cy5sZW5ndGggIT09IDEgfHwgcHJldmlld1NjYWxlUmVmLmN1cnJlbnQgPD0gMSB8fCBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ICE9PSBldmVudC5wb2ludGVySWQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGxhc3RQb2ludCA9IHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudDtcclxuICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gcG9pbnQ7XHJcbiAgICAgIGlmICghbGFzdFBvaW50KSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBuZXh0VHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQgPSB7XHJcbiAgICAgICAgeDogcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50LnggKyAocG9pbnQueCAtIGxhc3RQb2ludC54KSxcclxuICAgICAgICB5OiBwcmV2aWV3VHJhbnNsYXRlUmVmLmN1cnJlbnQueSArIChwb2ludC55IC0gbGFzdFBvaW50LnkpLFxyXG4gICAgICB9O1xyXG4gICAgICBhcHBseVByZXZpZXdUcmFuc2Zvcm0ocHJldmlld1NjYWxlUmVmLmN1cnJlbnQsIG5leHRUcmFuc2xhdGUpO1xyXG4gICAgfSxcclxuICAgIFthcHBseVByZXZpZXdUcmFuc2Zvcm0sIHJlYnVpbGRQaW5jaFNuYXBzaG90XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVByZXZpZXdQb2ludGVyRW5kID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgICAgaWYgKCFwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5oYXMoZXZlbnQucG9pbnRlcklkKSkgcmV0dXJuO1xyXG4gICAgICBwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5kZWxldGUoZXZlbnQucG9pbnRlcklkKTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHR5cGVvZiBldmVudC5jdXJyZW50VGFyZ2V0Lmhhc1BvaW50ZXJDYXB0dXJlID09PSBcImZ1bmN0aW9uXCIgJiZcclxuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0Lmhhc1BvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZClcclxuICAgICAgKSB7XHJcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5yZWxlYXNlUG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcG9pbnRlckVudHJpZXMgPSBBcnJheS5mcm9tKHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LmVudHJpZXMoKSk7XHJcbiAgICAgIGlmIChwb2ludGVyRW50cmllcy5sZW5ndGggPj0gMikge1xyXG4gICAgICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgcmVidWlsZFBpbmNoU25hcHNob3QoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwb2ludGVyRW50cmllcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICBjb25zdCBbcG9pbnRlcklkLCBwb2ludGVyUG9pbnRdID0gcG9pbnRlckVudHJpZXNbMF07XHJcbiAgICAgICAgcHJldmlld1BhblBvaW50ZXJSZWYuY3VycmVudCA9IHBvaW50ZXJJZDtcclxuICAgICAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBwb2ludGVyUG9pbnQ7XHJcbiAgICAgICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIGlmIChwcmV2aWV3U2NhbGVSZWYuY3VycmVudCA8PSAxKSB7XHJcbiAgICAgICAgYXBwbHlQcmV2aWV3VHJhbnNmb3JtKDEsIHsgeDogMCwgeTogMCB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFthcHBseVByZXZpZXdUcmFuc2Zvcm0sIHJlYnVpbGRQaW5jaFNuYXBzaG90XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVByZXZpZXdXaGVlbCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5XaGVlbEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xyXG4gICAgICBpZiAoIXByZXZpZXdJbWFnZVVybCB8fCBwcmV2aWV3QnVzeSkgcmV0dXJuO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgY29uc3QgZGlyZWN0aW9uID0gZXZlbnQuZGVsdGFZIDwgMCA/IDEgOiAtMTtcclxuICAgICAgY29uc3QgbmV4dFNjYWxlID0gY2xhbXBQcmV2aWV3U2NhbGUocHJldmlld1NjYWxlUmVmLmN1cnJlbnQgKyBkaXJlY3Rpb24gKiBQUkVWSUVXX1NDQUxFX1NURVApO1xyXG4gICAgICBhcHBseVByZXZpZXdUcmFuc2Zvcm0obmV4dFNjYWxlLCBwcmV2aWV3VHJhbnNsYXRlUmVmLmN1cnJlbnQpO1xyXG4gICAgfSxcclxuICAgIFthcHBseVByZXZpZXdUcmFuc2Zvcm0sIHByZXZpZXdCdXN5LCBwcmV2aWV3SW1hZ2VVcmxdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb3BlblByZXZpZXcgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50RmlsZUlkID0gc2FmZVRleHQoZmlsZUlkKTtcclxuICAgIGNvbnN0IGN1cnJlbnRVcmwgPSBzYWZlVGV4dChzb3VyY2VVcmwpO1xyXG4gICAgaWYgKCFlbmFibGVkIHx8ICFjdXJyZW50RmlsZUlkIHx8ICFjdXJyZW50VXJsKSByZXR1cm47XHJcblxyXG4gICAgcmVzZXRQcmV2aWV3R2VzdHVyZSgpO1xyXG4gICAgc2V0UHJldmlld09wZW4odHJ1ZSk7XHJcbiAgICBzZXRQcmV2aWV3RXJyb3IoXCJcIik7XHJcblxyXG4gICAgYXdhaXQgbG9hZFByZXZpZXdJbWFnZSgpO1xyXG4gIH0sIFtlbmFibGVkLCBmaWxlSWQsIGxvYWRQcmV2aWV3SW1hZ2UsIHJlc2V0UHJldmlld0dlc3R1cmUsIHNvdXJjZVVybF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcHJldmlld09wZW4sXHJcbiAgICBwcmV2aWV3QnVzeSxcclxuICAgIHByZXZpZXdFcnJvcixcclxuICAgIHByZXZpZXdJbWFnZVVybCxcclxuICAgIHByZXZpZXdTY2FsZSxcclxuICAgIHByZXZpZXdUcmFuc2xhdGUsXHJcbiAgICBwcmV2aWV3U3VyZmFjZVJlZixcclxuICAgIG9wZW5QcmV2aWV3LFxyXG4gICAgY2xvc2VQcmV2aWV3LFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlLFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXHJcbiAgICBoYW5kbGVQcmV2aWV3V2hlZWwsXHJcbiAgfTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGlCQUErRDs7O0FDQS9ELG1CQUFpRDtBQWUxQyxJQUFNLDhCQUE4QixDQUFDLEVBQUUsV0FBVyxRQUFRLFlBQVksTUFBdUM7QUFDbEgsUUFBTSxDQUFDLFFBQVEsU0FBUyxRQUFJLHVCQUEyQyxJQUFJO0FBQzNFLFFBQU0sQ0FBQyxPQUFPLFFBQVEsUUFBSSx1QkFBb0MsQ0FBQyxDQUFDO0FBQ2hFLFFBQU0sQ0FBQyxXQUFXLFlBQVksUUFBSSx1QkFBUyxLQUFLO0FBQ2hELFFBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx1QkFBUyxFQUFFO0FBRW5ELFFBQU0sbUJBQWUsMEJBQVksWUFBWTtBQUMzQyxRQUFJLENBQUMsV0FBVztBQUNkLGtCQUFZO0FBQ1o7QUFBQSxJQUNGO0FBRUEsVUFBTSxhQUFhLFNBQVMsTUFBTTtB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Q0E7QUFDRixPQWNPO0FBQUEsRUFDTCxNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxVQUFVO0FBQUEsRUFDVixVQUFVO0FBQUEsRUFDVixPQUFPO0FBQUEsRUFDUCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixTQUFTO0FBQUEsRUFDVCxlQUFlO0FBQUEsRUFDZixlQUFlO0FBQUEsRUFDZixjQUFjO0FBQUEsRUFDZCxTQUFTO0FBQ1g7QUFFQSxJQUFNLHNDQUFzQyxDQUFDO0FBQUEsRUFDM0M7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixPQThDTztBQUFBLEVBQ0w7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGlCQUFpQjtBQUFBLEVBQ2pCO0FBQUEsRUFDQSxlQUFlO0FBQUEsRUFDZjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7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QUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxrQkFBa0IsWUFBWSxvQkFBb0IsU0FBUyxRQUFRLFlBQVk7QUFBQSxNQUMvRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBRUQsU0FBTztBQUNUO0FBRUEsSUFBTSxpQ0FBaUMsTUFBTTtBQUMzQyxRQUFNLGFBQWEsb0NBQW9DO0FBRXZELFNBQU8sNkNBQUMsbUNBQXdCLE9BQU8sV0FBVyxPQUFPLFNBQVMsV0FBVyxTQUFTLFNBQVMsV0FBVyxTQUFTO0FBQ3JIO0FBR0EsSUFBTSwwQkFBMEIsTUFBTTtBQUNwQyxTQUNFLDZDQUFDLGdDQUFxQix5QkFBdUIsTUFDM0MsdURBQUMsa0NBQStCLEdBQ2xDO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSw0QkFBNEI7QUFDbkUsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQywyQkFBd0IsQ0FBRTtBQUN0RDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sa0NBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAibmV4dFRyYW5zbGF0ZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
