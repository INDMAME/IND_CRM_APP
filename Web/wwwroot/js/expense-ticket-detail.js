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
} from "./chunks/chunk-ZYC7ZVE3.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-MAT2B2KQ.js";
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
} from "./chunks/chunk-VGALJWLD.js";
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
} from "./chunks/chunk-4VP3QYLY.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-JI5QGMWG.js";
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
  busy,
  fileId,
  contextSheetId,
  isFromExpenseLine,
  isFromSheetLink,
  headerExpenseSheetId,
  isEditing,
  canOpenSaveConfirm,
  handleUpdate,
  lineContainerRef,
  openPreview,
  ticketReturnContext
}) => {
  const openLineDetail = (0, import_react7.useCallback)(
    async (rawLineRecId) => {
      if (isFromExpenseLine || isFromSheetLink) return;
      if (busy) return;
      const lineRecId = safeText(rawLineRecId);
      if (!lineRecId || !fileId) return;
      const shouldOpenInEditMode = isEditing;
      if (shouldOpenInEditMode) {
        if (!canOpenSaveConfirm()) {
          return;
        }
        const updateOk = await handleUpdate();
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
        bypassGuardOnce: shouldOpenInEditMode
      });
    },
    [busy, canOpenSaveConfirm, fileId, handleUpdate, isEditing, isFromExpenseLine, isFromSheetLink, ticketReturnContext]
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
    busy,
    fileId,
    contextSheetId,
    isFromExpenseLine,
    isFromSheetLink,
    headerExpenseSheetId: safeText(header?.hojaGastosIdDisplay),
    isEditing,
    canOpenSaveConfirm,
    handleUpdate,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFJvdXRlQ29udGV4dC50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5LnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0UHJldmlld1V0aWxzLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5lc0xpc3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0U3RpY2t5UHJldmlldy50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsVmlldy50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcclxuaW1wb3J0IHsgdXNlQXV0aENvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcclxuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcclxuaW1wb3J0IHsgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBpc01hbmFnaW5nT3RoZXJFeHBlbnNlVXNlciB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTWFuYWdlZFVzZXJTY29wZS50c1wiO1xyXG5pbXBvcnQgeyBtYXBXaW5kb3dFbnVtT3B0aW9ucywgdHlwZSBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB7IGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3IgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXkudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3IGZyb20gXCIuL0V4cGVuc2VUaWNrZXREZXRhaWxWaWV3LnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlIH0gZnJvbSBcIi4uL3VzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWwgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciwgRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuXHJcbmNvbnN0IEFMTE9XRURfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XHJcbmNvbnN0IExJTkVTX1BBR0VfU0laRSA9IDY7XHJcbmNvbnN0IEdBU1RPX1RZUEVfTEFCRUxfS0VZUzogUmVjb3JkPG51bWJlciwgeyBrZXk6IHN0cmluZzsgZmFsbGJhY2s6IHN0cmluZyB9PiA9IHtcclxuICAwOiB7IGtleTogXCJFbnVtX05vbmVcIiwgZmFsbGJhY2s6IFwiTm9uZVwiIH0sXHJcbiAgMTogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfUGVhamVcIiwgZmFsbGJhY2s6IFwiUGVhamVcIiB9LFxyXG4gIDI6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1BhcmtpbmdcIiwgZmFsbGJhY2s6IFwiUGFya2luZ1wiIH0sXHJcbiAgMzogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfS21cIiwgZmFsbGJhY2s6IFwiS21cIiB9LFxyXG4gIDQ6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0Rlc2F5dW5vXCIsIGZhbGxiYWNrOiBcIkRlc2F5dW5vXCIgfSxcclxuICA1OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9Db21pZGFcIiwgZmFsbGJhY2s6IFwiQ29taWRhXCIgfSxcclxuICA2OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9DZW5hXCIsIGZhbGxiYWNrOiBcIkNlbmFcIiB9LFxyXG4gIDc6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0hvdGVsXCIsIGZhbGxiYWNrOiBcIkhvdGVsXCIgfSxcclxuICA4OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9WYXJpb3NcIiwgZmFsbGJhY2s6IFwiVmFyaW9zXCIgfSxcclxuICAxNDogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfVGF4aVwiLCBmYWxsYmFjazogXCJUYXhpXCIgfSxcclxufTtcclxuXHJcbmNvbnN0IHBhZ2VkU2xpY2UgPSA8VCw+KGl0ZW1zOiBUW10sIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcik6IFRbXSA9PiB7XHJcbiAgaWYgKCFpdGVtcy5sZW5ndGgpIHJldHVybiBbXTtcclxuICBjb25zdCBzYWZlUGFnZSA9IE1hdGgubWF4KDEsIHBhZ2UpO1xyXG4gIGNvbnN0IHN0YXJ0ID0gKHNhZmVQYWdlIC0gMSkgKiBwYWdlU2l6ZTtcclxuICByZXR1cm4gaXRlbXMuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgcGFnZVNpemUpO1xyXG59O1xyXG5cclxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxyXG5jb25zdCBib290c3RyYXBFeHBlbnNlQXBpQXV0aCA9ICgpID0+IHtcclxuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCh7XHJcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcclxuICAgIGVudHJhT2lkOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxyXG4gICAgYXBwQ29kZTogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRGYWxsYmFja0dhc3RvVHlwZU9wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcclxuICByZXR1cm4gT2JqZWN0LmVudHJpZXMoR0FTVE9fVFlQRV9MQUJFTF9LRVlTKVxyXG4gICAgLm1hcCgoW2NvZGUsIGNmZ10pID0+ICh7XHJcbiAgICAgIHZhbHVlOiBTdHJpbmcoY29kZSksXHJcbiAgICAgIHRleHQ6IGluZFQoY2ZnLmtleSwgY2ZnLmZhbGxiYWNrKSxcclxuICAgIH0pKVxyXG4gICAgLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiBOdW1iZXIobGVmdC52YWx1ZSkgLSBOdW1iZXIocmlnaHQudmFsdWUpKTtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbE1vZGFsVmlldyA9ICh7XHJcbiAgbW9kYWwsXHJcbiAgbW9kYWxDb25maXJtVGV4dCxcclxuICBtb2RhbENhbmNlbFRleHQsXHJcbiAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICBidXN5LFxyXG4gIG1vZGFsRXJyb3IsXHJcbiAgc3RhdHVzLFxyXG4gIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcclxuICBjbG9zZUNvbmZpcm0sXHJcbn06IHtcclxuICBtb2RhbDoge1xyXG4gICAgb3BlbjogYm9vbGVhbjtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBzaG93Q2FuY2VsOiBib29sZWFuO1xyXG4gICAgc2hvd0NvbmZpcm06IGJvb2xlYW47XHJcbiAgfTtcclxuICBtb2RhbENvbmZpcm1UZXh0OiBzdHJpbmc7XHJcbiAgbW9kYWxDYW5jZWxUZXh0OiBzdHJpbmc7XHJcbiAgbW9kYWxMb2FkaW5nVGV4dDogc3RyaW5nO1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxFcnJvcjogc3RyaW5nO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybTogKCkgPT4gdm9pZDtcclxuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbn0pID0+ICh7XHJcbiAgb3BlbjogbW9kYWwub3BlbixcclxuICB0aXRsZTogbW9kYWwudGl0bGUsXHJcbiAgbWVzc2FnZTogbW9kYWwubWVzc2FnZSxcclxuICBjb25maXJtVGV4dDogbW9kYWxDb25maXJtVGV4dCxcclxuICBjYW5jZWxUZXh0OiBtb2RhbENhbmNlbFRleHQsXHJcbiAgbG9hZGluZ1RleHQ6IG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgc2hvd0NhbmNlbDogbW9kYWwuc2hvd0NhbmNlbCxcclxuICBzaG93Q29uZmlybTogbW9kYWwuc2hvd0NvbmZpcm0sXHJcbiAgYnVzeSxcclxuICBlcnJvcjogbW9kYWxFcnJvcixcclxuICBzdGF0dXMsXHJcbiAgb25Db25maXJtOiBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgb25DYW5jZWw6IGNsb3NlQ29uZmlybSxcclxufSk7XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3VmlldyA9ICh7XHJcbiAgcHJldmlld09wZW4sXHJcbiAgcHJldmlld0J1c3ksXHJcbiAgcHJldmlld0Vycm9yLFxyXG4gIHByZXZpZXdJbWFnZVVybCxcclxuICBwcmV2aWV3QWx0VGV4dCxcclxuICBwcmV2aWV3U2NhbGUsXHJcbiAgcHJldmlld1RyYW5zbGF0ZSxcclxuICBwcmV2aWV3U3VyZmFjZVJlZixcclxuICBjbG9zZVByZXZpZXcsXHJcbiAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcclxuICBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxuICBoYW5kbGVQcmV2aWV3V2hlZWwsXHJcbn06IHtcclxuICBwcmV2aWV3T3BlbjogYm9vbGVhbjtcclxuICBwcmV2aWV3QnVzeTogYm9vbGVhbjtcclxuICBwcmV2aWV3RXJyb3I6IHN0cmluZztcclxuICBwcmV2aWV3SW1hZ2VVcmw6IHN0cmluZztcclxuICBwcmV2aWV3QWx0VGV4dDogc3RyaW5nO1xyXG4gIHByZXZpZXdTY2FsZTogbnVtYmVyO1xyXG4gIHByZXZpZXdUcmFuc2xhdGU6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfTtcclxuICBwcmV2aWV3U3VyZmFjZVJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgY2xvc2VQcmV2aWV3OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bjogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZTogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgaGFuZGxlUHJldmlld1doZWVsOiAoZXZlbnQ6IFJlYWN0LldoZWVsRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG59KSA9PiAoe1xyXG4gIG9wZW46IHByZXZpZXdPcGVuLFxyXG4gIGJ1c3k6IHByZXZpZXdCdXN5LFxyXG4gIGVycm9yOiBwcmV2aWV3RXJyb3IsXHJcbiAgaW1hZ2VVcmw6IHByZXZpZXdJbWFnZVVybCxcclxuICBpbWFnZUFsdDogcHJldmlld0FsdFRleHQsXHJcbiAgc2NhbGU6IHByZXZpZXdTY2FsZSxcclxuICB0cmFuc2xhdGU6IHByZXZpZXdUcmFuc2xhdGUsXHJcbiAgc3VyZmFjZVJlZjogcHJldmlld1N1cmZhY2VSZWYsXHJcbiAgb25DbG9zZTogY2xvc2VQcmV2aWV3LFxyXG4gIG9uUG9pbnRlckRvd246IGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcclxuICBvblBvaW50ZXJNb3ZlOiBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXHJcbiAgb25Qb2ludGVyRW5kOiBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxuICBvbldoZWVsOiBoYW5kbGVQcmV2aWV3V2hlZWwsXHJcbn0pO1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXcgPSAoe1xyXG4gIGlzTG9hZGluZyxcclxuICBlcnJvck1lc3NhZ2UsXHJcbiAgaGVhZGVyLFxyXG4gIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gIHByZXZpZXdCdXN5LFxyXG4gIHByZXZpZXdFcnJvcixcclxuICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgcHJldmlld0FsdFRleHQsXHJcbiAgb3BlbkZpbGUsXHJcbiAgc3RhdHVzTGFiZWwsXHJcbiAgZ2FzdG9UeXBlTGFiZWwsXHJcbiAgdG90YWxBbW91bnRUZXh0LFxyXG4gIHRyYW5zRGF0ZVRleHQsXHJcbiAgaXNFZGl0aW5nLFxuICBnYXN0b1R5cGVPcHRpb25zLFxuICBkcmFmdERlc2NyaXB0aW9uLFxuICBkZXNjcmlwdGlvbkludmFsaWQsXG4gIGRlc2NyaXB0aW9uSW5wdXRSZWYsXG4gIGRyYWZ0R2FzdG9UeXBlLFxuICBnYXN0b1R5cGVJbnZhbGlkLFxuICBnYXN0b1R5cGVJbnB1dFJlZixcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICBjdXJyZW5jeUlucHV0UmVmLFxyXG4gIGRyYWZ0VHJhbnNEYXRlLFxyXG4gIGRyYWZ0VXJsRmlsZSxcclxuICBkcmFmdEZpbGVOYW1lLFxyXG4gIHNldERyYWZ0RGVzY3JpcHRpb24sXHJcbiAgc2V0RHJhZnRHYXN0b1R5cGUsXHJcbiAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgc2V0RHJhZnRUcmFuc0RhdGUsXHJcbiAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gIGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQsXHJcbiAgdmlzaWJsZUxpbmVzLFxyXG4gIHRvdGFsTGluZVBhZ2VzLFxyXG4gIGxpbmVQYWdlLFxyXG4gIHNhZmVDdXJyZW5jeUNvZGUsXHJcbiAgcGFnaW5hdGlvbkxhYmVscyxcclxuICBsaW5lQ29udGFpbmVyUmVmLFxyXG4gIHNldExpbmVQYWdlLFxyXG4gIG9wZW5MaW5lRGV0YWlsLFxyXG4gIHN0YXR1cyxcclxufToge1xyXG4gIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xyXG4gIHNob3dTdGlja3lQcmV2aWV3OiBib29sZWFuO1xyXG4gIHByZXZpZXdCdXN5OiBib29sZWFuO1xyXG4gIHByZXZpZXdFcnJvcjogc3RyaW5nO1xyXG4gIHByZXZpZXdJbWFnZVVybDogc3RyaW5nO1xyXG4gIHByZXZpZXdBbHRUZXh0OiBzdHJpbmc7XHJcbiAgb3BlbkZpbGU6ICgpID0+IHZvaWQ7XHJcbiAgc3RhdHVzTGFiZWw6IHN0cmluZztcclxuICBnYXN0b1R5cGVMYWJlbDogc3RyaW5nO1xyXG4gIHRvdGFsQW1vdW50VGV4dDogc3RyaW5nO1xyXG4gIHRyYW5zRGF0ZVRleHQ6IHN0cmluZztcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGdhc3RvVHlwZU9wdGlvbnM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXTtcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xuICBkZXNjcmlwdGlvbkludmFsaWQ6IGJvb2xlYW47XG4gIGRlc2NyaXB0aW9uSW5wdXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XG4gIGRyYWZ0R2FzdG9UeXBlOiBzdHJpbmc7XG4gIGdhc3RvVHlwZUludmFsaWQ6IGJvb2xlYW47XG4gIGdhc3RvVHlwZUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGN1cnJlbmN5Q29kZUludmFsaWQ6IGJvb2xlYW47XHJcbiAgY3VycmVuY3lJbnB1dFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIGRyYWZ0VXJsRmlsZTogc3RyaW5nO1xyXG4gIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcclxuICBzZXREcmFmdERlc2NyaXB0aW9uOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXREcmFmdEdhc3RvVHlwZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0RHJhZnRDdXJyZW5jeUNvZGU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldERyYWZ0VHJhbnNEYXRlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBpc0Zyb21TaGVldExpbms6IGJvb2xlYW47XHJcbiAgaGFuZGxlT3BlbkV4cGVuc2VTaGVldDogKCkgPT4gdm9pZDtcclxuICB2aXNpYmxlTGluZXM6IEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lW107XHJcbiAgdG90YWxMaW5lUGFnZXM6IG51bWJlcjtcclxuICBsaW5lUGFnZTogbnVtYmVyO1xyXG4gIHNhZmVDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBwYWdpbmF0aW9uTGFiZWxzOiB7XHJcbiAgICBmaXJzdDogc3RyaW5nO1xyXG4gICAgcHJldjogc3RyaW5nO1xyXG4gICAgbmV4dDogc3RyaW5nO1xyXG4gICAgbGFzdDogc3RyaW5nO1xyXG4gIH07XHJcbiAgbGluZUNvbnRhaW5lclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgc2V0TGluZVBhZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XHJcbiAgb3BlbkxpbmVEZXRhaWw6IChsaW5lUmVjSWQ6IHN0cmluZykgPT4gdm9pZDtcclxuICBzdGF0dXM6IHN0cmluZztcclxufSkgPT4gKHtcclxuICBpc0xvYWRpbmcsXHJcbiAgZXJyb3JNZXNzYWdlLFxyXG4gIGhlYWRlcixcclxuICBzaG93U3RpY2t5UHJldmlldyxcclxuICBwcmV2aWV3QnVzeSxcclxuICBwcmV2aWV3RXJyb3IsXHJcbiAgcHJldmlld0ltYWdlVXJsLFxyXG4gIHByZXZpZXdGaWxlTmFtZTogcHJldmlld0FsdFRleHQsXHJcbiAgcHJldmlld0FsdFRleHQsXHJcbiAgb25PcGVuUHJldmlldzogb3BlbkZpbGUsXHJcbiAgc3RhdHVzTGFiZWwsXHJcbiAgZ2FzdG9UeXBlTGFiZWwsXHJcbiAgdG90YWxBbW91bnRUZXh0LFxyXG4gIHRyYW5zRGF0ZVRleHQsXHJcbiAgaXNFZGl0aW5nLFxuICBnYXN0b1R5cGVPcHRpb25zLFxuICBkcmFmdERlc2NyaXB0aW9uLFxuICBkZXNjcmlwdGlvbkludmFsaWQsXG4gIGRlc2NyaXB0aW9uSW5wdXRSZWYsXG4gIGRyYWZ0R2FzdG9UeXBlLFxuICBnYXN0b1R5cGVJbnZhbGlkLFxuICBnYXN0b1R5cGVJbnB1dFJlZixcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICBjdXJyZW5jeUlucHV0UmVmLFxyXG4gIGRyYWZ0VHJhbnNEYXRlLFxyXG4gIGRyYWZ0VXJsRmlsZSxcclxuICBkcmFmdEZpbGVOYW1lLFxyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlOiBzZXREcmFmdEdhc3RvVHlwZSxcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICBvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlOiBzZXREcmFmdFRyYW5zRGF0ZSxcclxuICBvbk9wZW5GaWxlOiBvcGVuRmlsZSxcclxuICBvbk9wZW5FeHBlbnNlU2hlZXQ6IGlzRnJvbVNoZWV0TGluayA/IHVuZGVmaW5lZCA6IGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQsXHJcbiAgdmlzaWJsZUxpbmVzLFxyXG4gIHRvdGFsTGluZVBhZ2VzLFxyXG4gIGxpbmVQYWdlLFxyXG4gIGN1cnJlbmN5Q29kZTogc2FmZUN1cnJlbmN5Q29kZSxcclxuICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gIGNvbnRhaW5lclJlZjogbGluZUNvbnRhaW5lclJlZixcclxuICBvbkxpbmVQYWdlQ2hhbmdlOiBzZXRMaW5lUGFnZSxcclxuICBvbk9wZW5MaW5lOiBvcGVuTGluZURldGFpbCxcclxuICBzdGF0dXMsXHJcbn0pO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3QXJncyA9IFBhcmFtZXRlcnM8dHlwZW9mIGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbE1vZGFsVmlldz5bMF07XHJcbnR5cGUgRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3QXJncyA9IFBhcmFtZXRlcnM8dHlwZW9mIGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3PlswXTtcclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXdBcmdzID0gUGFyYW1ldGVyczx0eXBlb2YgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXc+WzBdO1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUGFnZVZpZXdNb2RlbCA9ICh7XHJcbiAgbW9kYWxBcmdzLFxyXG4gIHByZXZpZXdBcmdzLFxyXG4gIGNvbnRlbnRBcmdzLFxyXG59OiB7XHJcbiAgbW9kYWxBcmdzOiBFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3QXJncztcclxuICBwcmV2aWV3QXJnczogRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3QXJncztcclxuICBjb250ZW50QXJnczogRXhwZW5zZVRpY2tldERldGFpbENvbnRlbnRWaWV3QXJncztcclxufSkgPT4gKHtcclxuICBtb2RhbDogYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3KG1vZGFsQXJncyksXHJcbiAgcHJldmlldzogYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1ZpZXcocHJldmlld0FyZ3MpLFxyXG4gIGNvbnRlbnQ6IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbENvbnRlbnRWaWV3KGNvbnRlbnRBcmdzKSxcclxufSk7XHJcblxyXG4vLyBLZWVwcyBmaWx0ZXIgY2FjaGUgd2lyaW5nIGFuZCBiYWNrIG5hdmlnYXRpb24gb3V0c2lkZSB0aGUgcGFnZSBjb250YWluZXIgYm9keS5cclxuY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbE5hdmlnYXRpb25TdGF0ZSA9ICh7XHJcbiAgZmlsZUlkLFxyXG4gIGRldGFpbE9yaWdpbixcclxuICBoZWFkZXJUcmFuc0RhdGUsXHJcbiAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxufToge1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGRldGFpbE9yaWdpbjogc3RyaW5nO1xyXG4gIGhlYWRlclRyYW5zRGF0ZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0OiBSZXR1cm5UeXBlPHR5cGVvZiB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0PltcInRpY2tldFJldHVybkNvbnRleHRcIl07XHJcbn0pID0+IHtcclxuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgc2F2ZUNhY2hlZFN0YXRlLCBtYXJrUmVzZXRGaWx0ZXJzUmV0dXJuLCBjbGVhckNhY2hlZFN0YXRlIH0gPSB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlKCk7XHJcblxyXG4gIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxCYWNrTmF2aWdhdGlvbih7XHJcbiAgICBmaWxlSWQsXHJcbiAgICBkZXRhaWxPcmlnaW4sXHJcbiAgICBoZWFkZXJUcmFuc0RhdGUsXHJcbiAgICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gICAgcmVhZENhY2hlZFN0YXRlLFxyXG4gICAgc2F2ZUNhY2hlZFN0YXRlLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbWFya1Jlc2V0RmlsdGVyc1JldHVybixcclxuICAgIGNsZWFyQ2FjaGVkU3RhdGUsXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFJ1bnMgdGhlIG9uZS1zaG90IGF1dG8gZWRpdCB0cmFuc2l0aW9uIGZvciBsaW5rZWQgY29udGV4dHMgYWZ0ZXIgZGV0YWlsIGRhdGEgaXMgcmVhZHkuXHJcbmNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxBdXRvRWRpdCA9ICh7XHJcbiAgYXV0b0VkaXRNb2RlLFxyXG4gIGlzRnJvbUV4cGVuc2VMaW5lLFxyXG4gIGlzRnJvbVNoZWV0TGluayxcclxuICBpc0xvYWRpbmcsXHJcbiAgaGVhZGVyLFxyXG4gIGhhbmRsZUVuYWJsZUVkaXQsXHJcbn06IHtcclxuICBhdXRvRWRpdE1vZGU6IGJvb2xlYW47XHJcbiAgaXNGcm9tRXhwZW5zZUxpbmU6IGJvb2xlYW47XHJcbiAgaXNGcm9tU2hlZXRMaW5rOiBib29sZWFuO1xyXG4gIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xyXG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XHJcbn0pID0+IHtcclxuICBjb25zdCBhdXRvRWRpdEF0dGVtcHRlZFJlZiA9IHVzZVJlZihmYWxzZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWF1dG9FZGl0TW9kZSB8fCBpc0Zyb21FeHBlbnNlTGluZSB8fCBpc0Zyb21TaGVldExpbmsgfHwgYXV0b0VkaXRBdHRlbXB0ZWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgaWYgKGlzTG9hZGluZyB8fCAhaGVhZGVyKSByZXR1cm47XHJcblxyXG4gICAgYXV0b0VkaXRBdHRlbXB0ZWRSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICBoYW5kbGVFbmFibGVFZGl0KCk7XHJcbiAgfSwgW2F1dG9FZGl0TW9kZSwgaGFuZGxlRW5hYmxlRWRpdCwgaGVhZGVyLCBpc0Zyb21FeHBlbnNlTGluZSwgaXNGcm9tU2hlZXRMaW5rLCBpc0xvYWRpbmddKTtcclxufTtcclxuXHJcbi8vIFJlc29sdmVzIHBlcm1pc3Npb24gYW5kIGFjdGluZy11c2VyIHN0YXRlIHNvIHRoZSBwYWdlIGNvbnRhaW5lciBzdGF5cyBmb2N1c2VkIG9uIG9yY2hlc3RyYXRpb24uXHJcbmNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQZXJtaXNzaW9uU3RhdGUgPSAoe1xyXG4gIGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSxcclxufToge1xyXG4gIGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZTogYm9vbGVhbjtcclxufSkgPT4ge1xyXG4gIGNvbnN0IHsgY2FuTWFuYWdlT3RoZXJVc2VycywgY3VycmVudEF4VXNlcklkLCBzZWxlY3RlZE1hbmFnZWRVc2VySWQsIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSB9ID0gdXNlQXV0aENvbnRleHQoKTtcclxuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIlZpZXdcIik7XHJcbiAgY29uc3QgY2FuRWRpdFRpY2tldEJ5TW9kdWxlID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJFZGl0XCIpO1xyXG4gIGNvbnN0IGNhbkRlbGV0ZVRpY2tldEJ5TW9kdWxlID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJGdWxsQWNjZXNzXCIpO1xyXG4gIGNvbnN0IGlzTWFuYWdpbmdPdGhlclVzZXIgPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlVXNlcih7XHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGFzQWNjZXNzLFxyXG4gICAgY2FuRWRpdFRpY2tldDogY2FuRWRpdFRpY2tldEJ5TW9kdWxlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgY2FuRGVsZXRlVGlja2V0OiBjYW5EZWxldGVUaWNrZXRCeU1vZHVsZSAmJiAhaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgIGFsbG93QXNzaWduZWREcmFmdEVkaXQ6IGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSxcclxuICAgIGlzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIE93bnMgdGhlIHRpY2tldCBkZXRhaWwgcGFnZSBvcmNoZXN0cmF0aW9uIHdoaWxlIHRoZSBjb21wb25lbnQgc3RheXMgdGhpbiBmb3IgcmVuZGVyaW5nLlxyXG5jb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUGFnZVZpZXdNb2RlbCA9ICgpID0+IHtcclxuICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1RJQ0tFVF9GSUxFX0lEX18pO1xyXG4gIGNvbnN0IGxpbmVDb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCB7XHJcbiAgICBhdXRvRWRpdE1vZGUsXHJcbiAgICBkZXRhaWxPcmlnaW4sXHJcbiAgICBjb250ZXh0U2hlZXRJZCxcclxuICAgIGNvbnRleHRMaW5lUmVjSWQsXHJcbiAgICBpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUsXHJcbiAgICBpc0Zyb21FeHBlbnNlTGluZSxcclxuICAgIGlzRnJvbVNoZWV0TGluayxcclxuICAgIHRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQoKTtcclxuICBjb25zdCB7XHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBjYW5FZGl0VGlja2V0LFxyXG4gICAgY2FuRGVsZXRlVGlja2V0LFxyXG4gICAgYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCxcclxuICAgIGlzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQZXJtaXNzaW9uU3RhdGUoe1xyXG4gICAgaXNGcm9tRXhwZW5zZVNoZWV0Q3JlYXRlLFxyXG4gIH0pO1xyXG4gIGNvbnN0IGdhc3RvVHlwZU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4ge1xyXG4gICAgY29uc3Qgc291cmNlID0gQXJyYXkuaXNBcnJheSh3aW5kb3cuX19FWFBFTlNFX0dBU1RPX1RZUEVTX18pID8gd2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fIDogW107XHJcbiAgICBjb25zdCBtYXBwZWQgPSBtYXBXaW5kb3dFbnVtT3B0aW9ucyhzb3VyY2UpLmZpbHRlcigoZW50cnkpID0+IHtcclxuICAgICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKGVudHJ5LnZhbHVlKTtcclxuICAgICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIocGFyc2VkKSAmJiBBTExPV0VEX0dBU1RPX1RZUEVTLmhhcyhwYXJzZWQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKG1hcHBlZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBtYXBwZWQuc29ydCgobGVmdCwgcmlnaHQpID0+IE51bWJlcihsZWZ0LnZhbHVlKSAtIE51bWJlcihyaWdodC52YWx1ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBidWlsZEZhbGxiYWNrR2FzdG9UeXBlT3B0aW9ucygpO1xyXG4gIH0sIFtdKTtcclxuICBjb25zdCBnYXN0b1R5cGVMYWJlbE1hcCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcclxuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIGdhc3RvVHlwZU9wdGlvbnMpIHtcclxuICAgICAgbWFwLnNldChTdHJpbmcob3B0aW9uLnZhbHVlKSwgb3B0aW9uLnRleHQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1hcDtcclxuICB9LCBbZ2FzdG9UeXBlT3B0aW9uc10pO1xyXG4gIGNvbnN0IHsgaGVhZGVyLCBsaW5lcywgaXNMb2FkaW5nLCBlcnJvck1lc3NhZ2UsIHJlbG9hZERldGFpbCB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlKHtcclxuICAgIGhhc0FjY2VzcyxcclxuICAgIGZpbGVJZCxcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gIH0pO1xyXG4gIGNvbnN0IHsgbWFya1Jlc2V0RmlsdGVyc1JldHVybiwgY2xlYXJDYWNoZWRTdGF0ZSB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbE5hdmlnYXRpb25TdGF0ZSh7XHJcbiAgICBmaWxlSWQsXHJcbiAgICBkZXRhaWxPcmlnaW4sXHJcbiAgICBoZWFkZXJUcmFuc0RhdGU6IGhlYWRlcj8udHJhbnNEYXRlLFxyXG4gICAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxuICB9KTtcclxuICBjb25zdCB7XG4gICAgYnVzeSxcbiAgICBzdGF0dXMsXG4gICAgaXNFZGl0aW5nLFxuICAgIG1vZGFsRXJyb3IsXG4gICAgbGluZVBhZ2UsXG4gICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICBkZXNjcmlwdGlvbkludmFsaWQsXG4gICAgZGVzY3JpcHRpb25JbnB1dFJlZixcbiAgICBkcmFmdEdhc3RvVHlwZSxcbiAgICBnYXN0b1R5cGVJbnZhbGlkLFxuICAgIGdhc3RvVHlwZUlucHV0UmVmLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICAgIGN1cnJlbmN5SW5wdXRSZWYsXHJcbiAgICBkcmFmdFRyYW5zRGF0ZSxcclxuICAgIGRyYWZ0Q29tZW50YXJpbyxcclxuICAgIGRyYWZ0VXJsRmlsZSxcclxuICAgIGRyYWZ0RmlsZU5hbWUsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldExpbmVQYWdlLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgIHNldERyYWZ0R2FzdG9UeXBlLFxyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBzZXREcmFmdFRyYW5zRGF0ZSxcclxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yKHtcclxuICAgIGhlYWRlcixcclxuICAgIGxpbmVDb3VudDogbGluZXMubGVuZ3RoLFxyXG4gICAgcGFnZVNpemU6IExJTkVTX1BBR0VfU0laRSxcclxuICAgIGNhbkVkaXRUaWNrZXQsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0LFxyXG4gICAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXHJcbiAgfSk7XHJcbiAgY29uc3QgeyBwYWdpbmF0aW9uTGFiZWxzLCBwcmV2aWV3QWx0VGV4dCwgc3RhdHVzTGFiZWwsIGdhc3RvVHlwZUxhYmVsLCB0b3RhbEFtb3VudFRleHQsIHRyYW5zRGF0ZVRleHQgfSA9XHJcbiAgICB1c2VFeHBlbnNlVGlja2V0RGV0YWlsRGlzcGxheSh7XHJcbiAgICAgIGhlYWRlcixcclxuICAgICAgZHJhZnRHYXN0b1R5cGUsXHJcbiAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgICBkcmFmdFRyYW5zRGF0ZSxcclxuICAgICAgZHJhZnRGaWxlTmFtZSxcclxuICAgICAgaXNFZGl0aW5nLFxyXG4gICAgICBnYXN0b1R5cGVMYWJlbE1hcCxcclxuICAgIH0pO1xyXG4gIGNvbnN0IHtcclxuICAgIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gICAgcHJldmlld09wZW4sXHJcbiAgICBwcmV2aWV3QnVzeSxcclxuICAgIHByZXZpZXdFcnJvcixcclxuICAgIHByZXZpZXdJbWFnZVVybCxcclxuICAgIHByZXZpZXdTY2FsZSxcclxuICAgIHByZXZpZXdUcmFuc2xhdGUsXHJcbiAgICBwcmV2aWV3U3VyZmFjZVJlZixcclxuICAgIG9wZW5QcmV2aWV3LFxyXG4gICAgY2xvc2VQcmV2aWV3LFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlLFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXHJcbiAgICBoYW5kbGVQcmV2aWV3V2hlZWwsXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWwoe1xyXG4gICAgZmlsZUlkLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgZHJhZnRVcmxGaWxlLFxyXG4gICAgaGVhZGVyVXJsRmlsZTogaGVhZGVyPy51cmxGaWxlLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB2aXNpYmxlTGluZXMgPSB1c2VNZW1vKCgpID0+IHBhZ2VkU2xpY2UobGluZXMsIGxpbmVQYWdlLCBMSU5FU19QQUdFX1NJWkUpLCBbbGluZVBhZ2UsIGxpbmVzXSk7XHJcbiAgY29uc3QgdG90YWxMaW5lUGFnZXMgPSBNYXRoLmNlaWwoKGxpbmVzLmxlbmd0aCB8fCAwKSAvIExJTkVTX1BBR0VfU0laRSk7XHJcblxyXG4gIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxBdXRvRWRpdCh7XHJcbiAgICBhdXRvRWRpdE1vZGUsXHJcbiAgICBpc0Zyb21FeHBlbnNlTGluZSxcclxuICAgIGlzRnJvbVNoZWV0TGluayxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGhlYWRlcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHsgaGFuZGxlVXBkYXRlLCBoYW5kbGVEZWxldGUgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnMoe1xyXG4gICAgYnVzeSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGNhbkVkaXRUaWNrZXQsXHJcbiAgICBjYW5EZWxldGVUaWNrZXQsXHJcbiAgICBmaWxlSWQsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRHYXN0b1R5cGUsXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIGRyYWZ0VHJhbnNEYXRlLFxyXG4gICAgZHJhZnRDb21lbnRhcmlvLFxyXG4gICAgZHJhZnRVcmxGaWxlLFxyXG4gICAgZHJhZnRGaWxlTmFtZSxcclxuICAgIGxpbmtlZEV4cGVuc2VTaGVldElkOiBjb250ZXh0U2hlZXRJZCxcclxuICAgIGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dDogaXNGcm9tRXhwZW5zZUxpbmVcclxuICAgICAgPyB7XHJcbiAgICAgICAgICBzaGVldElkOiBjb250ZXh0U2hlZXRJZCxcclxuICAgICAgICAgIGxpbmVSZWNJZDogY29udGV4dExpbmVSZWNJZCxcclxuICAgICAgICB9XHJcbiAgICAgIDogbnVsbCxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBtb2RhbExvYWRpbmdUZXh0LCBtb2RhbENhbmNlbFRleHQsIG1vZGFsQ29uZmlybVRleHQsIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSB9ID1cclxuICAgIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGUoe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBtb2RhbEVycm9yLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICB9KTtcclxuXHJcbiAgY29uc3QgaXNBc3NpZ25lZFRpY2tldCA9IGhlYWRlcj8uc3RhdHVzID09PSAxO1xyXG4gIGNvbnN0IGlzQ29udGV4dExvY2tlZCA9IGlzQXNzaWduZWRUaWNrZXQgJiYgIWFsbG93QXNzaWduZWREcmFmdEVkaXQ7XHJcbiAgY29uc3QgY2FuRWRpdFRpY2tldEluQ29udGV4dCA9IGNhbkVkaXRUaWNrZXQgJiYgIWlzRnJvbUV4cGVuc2VMaW5lICYmICFpc0Zyb21TaGVldExpbms7XHJcbiAgY29uc3QgY2FuRGVsZXRlVGlja2V0SW5Db250ZXh0ID0gY2FuRGVsZXRlVGlja2V0ICYmICFpc0Zyb21FeHBlbnNlTGluZSAmJiAhaXNGcm9tU2hlZXRMaW5rO1xyXG4gIGNvbnN0IHRpY2tldFRvcGJhckFjdGlvbk1vZGU6IFwiZGVmYXVsdFwiIHwgXCJ2aWV3X29ubHlcIiA9XHJcbiAgICBpc01hbmFnaW5nT3RoZXJVc2VyIHx8IGlzRnJvbUV4cGVuc2VMaW5lIHx8IGlzRnJvbVNoZWV0TGluayA/IFwidmlld19vbmx5XCIgOiBcImRlZmF1bHRcIjtcclxuXHJcbiAgdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMoe1xyXG4gICAgYnVzeSxcclxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzTG9ja2VkOiBpc0NvbnRleHRMb2NrZWQsXHJcbiAgICBhY3Rpb25Nb2RlOiB0aWNrZXRUb3BiYXJBY3Rpb25Nb2RlLFxyXG4gICAgcGVybWlzc2lvbnNSZWFkeTogbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gICAgY2FuRWRpdFRpY2tldDogY2FuRWRpdFRpY2tldEluQ29udGV4dCxcclxuICAgIGNhbkRlbGV0ZVRpY2tldDogY2FuRGVsZXRlVGlja2V0SW5Db250ZXh0LFxyXG4gICAgZmlsZUlkLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgb25TYXZlU3VjY2VzczogKCkgPT4ge1xyXG4gICAgICB2b2lkIHJlbG9hZERldGFpbCgpO1xyXG4gICAgfSxcclxuICAgIG9uRGVsZXRlU3VjY2VzczogKCkgPT4ge1xyXG4gICAgICBpZiAodGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCkge1xyXG4gICAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcclxuICAgICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChidWlsZEV4cGVuc2VTaGVldERldGFpbFVybCh0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0SWQpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG1hcmtSZXNldEZpbHRlcnNSZXR1cm4oKTtcclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL1RpY2tldHNcIik7XHJcbiAgICB9LFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHsgb3BlbkxpbmVEZXRhaWwsIHJlc29sdmVDbGlja2FibGVDYXJkLCBvcGVuRmlsZSwgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9ucyh7XG4gICAgYnVzeSxcbiAgICBmaWxlSWQsXG4gICAgY29udGV4dFNoZWV0SWQsXG4gICAgaXNGcm9tRXhwZW5zZUxpbmUsXG4gICAgaXNGcm9tU2hlZXRMaW5rLFxuICAgIGhlYWRlckV4cGVuc2VTaGVldElkOiBzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZERpc3BsYXkpLFxuICAgIGlzRWRpdGluZyxcbiAgICBjYW5PcGVuU2F2ZUNvbmZpcm0sXG4gICAgaGFuZGxlVXBkYXRlLFxuICAgIGxpbmVDb250YWluZXJSZWYsXG4gICAgb3BlblByZXZpZXcsXG4gICAgdGlja2V0UmV0dXJuQ29udGV4dCxcbiAgfSk7XHJcblxyXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoe1xyXG4gICAgY29udGFpbmVyUmVmOiBsaW5lQ29udGFpbmVyUmVmLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgaXRlbXM6IHZpc2libGVMaW5lcyxcclxuICAgIHJlc29sdmVDbGlja2FibGVDYXJkLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBkZXRhaWxWaWV3ID0gYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUGFnZVZpZXdNb2RlbCh7XHJcbiAgICBtb2RhbEFyZ3M6IHtcclxuICAgICAgbW9kYWwsXHJcbiAgICAgIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgICAgIG1vZGFsQ2FuY2VsVGV4dCxcclxuICAgICAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICAgICAgYnVzeSxcclxuICAgICAgbW9kYWxFcnJvcixcclxuICAgICAgc3RhdHVzLFxyXG4gICAgICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgICAgIGNsb3NlQ29uZmlybSxcclxuICAgIH0sXHJcbiAgICBwcmV2aWV3QXJnczoge1xyXG4gICAgICBwcmV2aWV3T3BlbixcclxuICAgICAgcHJldmlld0J1c3ksXHJcbiAgICAgIHByZXZpZXdFcnJvcixcclxuICAgICAgcHJldmlld0ltYWdlVXJsLFxyXG4gICAgICBwcmV2aWV3QWx0VGV4dCxcclxuICAgICAgcHJldmlld1NjYWxlLFxyXG4gICAgICBwcmV2aWV3VHJhbnNsYXRlLFxyXG4gICAgICBwcmV2aWV3U3VyZmFjZVJlZixcclxuICAgICAgY2xvc2VQcmV2aWV3LFxyXG4gICAgICBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24sXHJcbiAgICAgIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcclxuICAgICAgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXHJcbiAgICAgIGhhbmRsZVByZXZpZXdXaGVlbCxcclxuICAgIH0sXHJcbiAgICBjb250ZW50QXJnczoge1xyXG4gICAgICBpc0xvYWRpbmcsXHJcbiAgICAgIGVycm9yTWVzc2FnZSxcclxuICAgICAgaGVhZGVyLFxyXG4gICAgICBzaG93U3RpY2t5UHJldmlldyxcclxuICAgICAgcHJldmlld0J1c3ksXHJcbiAgICAgIHByZXZpZXdFcnJvcixcclxuICAgICAgcHJldmlld0ltYWdlVXJsLFxyXG4gICAgICBwcmV2aWV3QWx0VGV4dCxcclxuICAgICAgb3BlbkZpbGUsXHJcbiAgICAgIHN0YXR1c0xhYmVsLFxyXG4gICAgICBnYXN0b1R5cGVMYWJlbCxcclxuICAgICAgdG90YWxBbW91bnRUZXh0LFxyXG4gICAgICB0cmFuc0RhdGVUZXh0LFxyXG4gICAgICBpc0VkaXRpbmcsXG4gICAgICBnYXN0b1R5cGVPcHRpb25zLFxuICAgICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICAgIGRlc2NyaXB0aW9uSW52YWxpZCxcbiAgICAgIGRlc2NyaXB0aW9uSW5wdXRSZWYsXG4gICAgICBkcmFmdEdhc3RvVHlwZSxcbiAgICAgIGdhc3RvVHlwZUludmFsaWQsXG4gICAgICBnYXN0b1R5cGVJbnB1dFJlZixcbiAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgICBjdXJyZW5jeUNvZGVJbnZhbGlkLFxyXG4gICAgICBjdXJyZW5jeUlucHV0UmVmLFxyXG4gICAgICBkcmFmdFRyYW5zRGF0ZSxcclxuICAgICAgZHJhZnRVcmxGaWxlLFxyXG4gICAgICBkcmFmdEZpbGVOYW1lLFxyXG4gICAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgICBzZXREcmFmdEdhc3RvVHlwZSxcclxuICAgICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICAgIHNldERyYWZ0VHJhbnNEYXRlLFxyXG4gICAgICBpc0Zyb21TaGVldExpbmssXHJcbiAgICAgIGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQsXHJcbiAgICAgIHZpc2libGVMaW5lcyxcclxuICAgICAgdG90YWxMaW5lUGFnZXMsXHJcbiAgICAgIGxpbmVQYWdlLFxyXG4gICAgICBzYWZlQ3VycmVuY3lDb2RlOiBpc0VkaXRpbmcgPyBkcmFmdEN1cnJlbmN5Q29kZSA6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcclxuICAgICAgcGFnaW5hdGlvbkxhYmVscyxcclxuICAgICAgbGluZUNvbnRhaW5lclJlZixcclxuICAgICAgc2V0TGluZVBhZ2UsXHJcbiAgICAgIG9wZW5MaW5lRGV0YWlsLFxyXG4gICAgICBzdGF0dXMsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gZGV0YWlsVmlldztcclxufTtcclxuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlQ29udGVudCA9ICgpID0+IHtcclxuICBjb25zdCBkZXRhaWxWaWV3ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbFBhZ2VWaWV3TW9kZWwoKTtcclxuXHJcbiAgcmV0dXJuIDxFeHBlbnNlVGlja2V0RGV0YWlsVmlldyBtb2RhbD17ZGV0YWlsVmlldy5tb2RhbH0gcHJldmlldz17ZGV0YWlsVmlldy5wcmV2aWV3fSBjb250ZW50PXtkZXRhaWxWaWV3LmNvbnRlbnR9IC8+O1xyXG59O1xyXG5cclxuLy8gTWFpbiBwYWdlIGVudHJ5IGZvciBleHBlbnNlIHRpY2tldCBkZXRhaWwuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnMgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQ+XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0RGV0YWlsUGFnZUNvbnRlbnQgLz5cclxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XHJcbiAgKTtcclxufTtcclxuXHJcbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xyXG4gIGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoKCk7XHJcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtcm9vdFwiKTtcclxuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xyXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVRpY2tldERldGFpbFBhZ2UgLz4pO1xyXG59O1xyXG5cclxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0RGV0YWlsUGFnZTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIsIEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IG1hcEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIsIG1hcEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZUFyZ3MgPSB7XHJcbiAgaGFzQWNjZXNzOiBib29sZWFuO1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gT3ducyByZWFkIHN0YXRlIGFuZCBBUEkgbG9hZGluZyBiZWhhdmlvciBmb3IgdGhlIHRpY2tldCBkZXRhaWwgcGFnZS5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZSA9ICh7IGhhc0FjY2VzcywgZmlsZUlkLCBvbkZvcmJpZGRlbiB9OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGVBcmdzKSA9PiB7XHJcbiAgY29uc3QgW2hlYWRlciwgc2V0SGVhZGVyXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbbGluZXMsIHNldExpbmVzXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lW10+KFtdKTtcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgY29uc3QgcmVsb2FkRGV0YWlsID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKCFoYXNBY2Nlc3MpIHtcclxuICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNhZmVGaWxlSWQgPSBzYWZlVGV4dChmaWxlSWQpO1xyXG4gICAgaWYgKCFzYWZlRmlsZUlkKSB7XHJcbiAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiVGlja2V0c19EZXRhaWxfTm90Rm91bmRcIiwgXCJUaWNrZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldElzTG9hZGluZyh0cnVlKTtcclxuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0KHNhZmVGaWxlSWQsIHtcclxuICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlPy5NZXNzYWdlIHx8IGluZFQoXCJUaWNrZXRzX0RldGFpbF9Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXQgZGV0YWlsLlwiKSk7XHJcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWQgPVxyXG4gICAgICAgIGl0ZW1zLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uRmlsZUlkKS50b1VwcGVyQ2FzZSgpID09PSBzYWZlRmlsZUlkLnRvVXBwZXJDYXNlKCkpIHx8IGl0ZW1zWzBdIHx8IG51bGw7XHJcblxyXG4gICAgICBpZiAoIXNlbGVjdGVkKSB7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJUaWNrZXRzX0RldGFpbF9Ob3RGb3VuZFwiLCBcIlRpY2tldCB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG1hcHBlZEhlYWRlciA9IG1hcEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIoc2VsZWN0ZWQpO1xyXG4gICAgICBjb25zdCBtYXBwZWRMaW5lcyA9IChBcnJheS5pc0FycmF5KHNlbGVjdGVkLkxpbmVzKSA/IHNlbGVjdGVkLkxpbmVzIDogW10pLm1hcCgobGluZSkgPT5cclxuICAgICAgICBtYXBFeHBlbnNlVGlja2V0RGV0YWlsTGluZShsaW5lKVxyXG4gICAgICApO1xyXG4gICAgICBzZXRIZWFkZXIobWFwcGVkSGVhZGVyKTtcclxuICAgICAgc2V0TGluZXMobWFwcGVkTGluZXMpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiVGlja2V0c19EZXRhaWxfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0IGRldGFpbC5cIikpO1xyXG4gICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgIHNldExpbmVzKFtdKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW2ZpbGVJZCwgaGFzQWNjZXNzLCBvbkZvcmJpZGRlbl0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgdm9pZCByZWxvYWREZXRhaWwoKTtcclxuICB9LCBbcmVsb2FkRGV0YWlsXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoZWFkZXIsXHJcbiAgICBsaW5lcyxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIHJlbG9hZERldGFpbCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3QgfSBmcm9tIFwiLi4vLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24gfSBmcm9tIFwiLi4vLi4vaG9va3MvZXhwZW5zZU11dGF0aW9uVXRpbHMudHNcIjtcclxuaW1wb3J0IHtcclxuICBkZWxldGVFeHBlbnNlU2hlZXRMaW5lLFxyXG4gIGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldCxcclxuICBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRGaWxlLFxyXG4gIGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsLFxyXG4gIHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldCxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFLCB0b0V4cGVuc2VBcGlEZE1tWXl5eSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIERlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCA9IHtcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgbGluZVJlY0lkOiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnNBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGNhbkVkaXRUaWNrZXQ6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlVGlja2V0OiBib29sZWFuO1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcclxuICBkcmFmdEdhc3RvVHlwZTogc3RyaW5nO1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRUcmFuc0RhdGU6IHN0cmluZztcclxuICBkcmFmdENvbWVudGFyaW86IHN0cmluZztcclxuICBkcmFmdFVybEZpbGU6IHN0cmluZztcclxuICBkcmFmdEZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgbGlua2VkRXhwZW5zZVNoZWV0SWQ/OiBzdHJpbmc7XHJcbiAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0PzogRGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0IHwgbnVsbDtcclxuICBzZXRNb2RhbEVycm9yOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRJc0VkaXRpbmc6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxufTtcclxuXHJcbmNvbnN0IFJFUVVJUkVEX0dBU1RPX1RZUEVTID0gbmV3IFNldDxudW1iZXI+KFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0pO1xyXG5cclxuY29uc3QgcGFyc2VPcHRpb25hbEludGVnZXIgPSAocmF3OiBzdHJpbmcpOiBudW1iZXIgfCB1bmRlZmluZWQgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKHJhdyB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIucGFyc2VJbnQodmFsdWUsIDEwKTtcclxuICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpID8gcGFyc2VkIDogdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuLy8gVHJpZXMgdG8gaW5mZXIgYSBzYWZlIGV4dGVuc2lvbiBmb3IgdXBkYXRlIHBheWxvYWQgZnJvbSBmaWxlIG5hbWUgb3IgVVJMLlxyXG5jb25zdCByZXNvbHZlVGlja2V0RmlsZUV4dGVuc2lvbiA9IChmaWxlTmFtZTogc3RyaW5nLCB1cmxGaWxlOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xyXG4gIGNvbnN0IHNvdXJjZSA9IFN0cmluZyhmaWxlTmFtZSB8fCBcIlwiKS50cmltKCkgfHwgU3RyaW5nKHVybEZpbGUgfHwgXCJcIikudHJpbSgpO1xyXG4gIGNvbnN0IG1hdGNoID0gc291cmNlLm1hdGNoKC9cXC4oW2EtekEtWjAtOV17MSwxMH0pKD86JHxbPyNdKS8pO1xyXG4gIGlmICghbWF0Y2ggfHwgIW1hdGNoWzFdKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIHJldHVybiBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxuY29uc3QgaXNOb3RGb3VuZEVycm9yID0gKGVycm9yOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwNDtcclxufTtcclxuXHJcbmNvbnN0IGlzTWlzc2luZ1RpY2tldEZpbGVNZXNzYWdlID0gKG1lc3NhZ2U6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKG1lc3NhZ2UgfHwgXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXJjaGl2byBhc29jaWFkb1wiKSB8fFxyXG4gICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImFyY2hpdm8gYWRqdW50b1wiKSB8fFxyXG4gICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImFzc29jaWF0ZWQgZmlsZVwiKSB8fFxyXG4gICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImF0dGFjaGVkIGZpbGVcIilcclxuICApO1xyXG59O1xyXG5cclxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgdGlja2V0IGhlYWRlciBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zID0gKHtcclxuICBidXN5LFxyXG4gIGlzRWRpdGluZyxcclxuICBjYW5FZGl0VGlja2V0LFxyXG4gIGNhbkRlbGV0ZVRpY2tldCxcclxuICBmaWxlSWQsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkcmFmdEdhc3RvVHlwZSxcclxuICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICBkcmFmdFRyYW5zRGF0ZSxcclxuICBkcmFmdENvbWVudGFyaW8sXHJcbiAgZHJhZnRVcmxGaWxlLFxyXG4gIGRyYWZ0RmlsZU5hbWUsXHJcbiAgbGlua2VkRXhwZW5zZVNoZWV0SWQsXHJcbiAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0LFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgc2V0QnVzeSxcclxuICBzZXRTdGF0dXMsXHJcbiAgc2V0SXNFZGl0aW5nLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xyXG4gIGNvbnN0IGhhbmRsZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChidXN5IHx8ICFpc0VkaXRpbmcpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICghY2FuRWRpdFRpY2tldCkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBub3JtYWxpemVkRGVzY3JpcHRpb24gPSBTdHJpbmcoZHJhZnREZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XHJcbiAgICBpZiAoIW5vcm1hbGl6ZWREZXNjcmlwdGlvbikge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9EZXNjcmlwdGlvblJlcXVpcmVkXCIsIFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWQuXCIpO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3kgPSBTdHJpbmcoZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW5jeSkge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9DdXJyZW5jeVJlcXVpcmVkXCIsIFwiQ3VycmVuY3kgaXMgcmVxdWlyZWQuXCIpO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXJzZWRHYXN0b1R5cGUgPSBwYXJzZU9wdGlvbmFsSW50ZWdlcihkcmFmdEdhc3RvVHlwZSk7XHJcbiAgICBpZiAocGFyc2VkR2FzdG9UeXBlID09PSB1bmRlZmluZWQgfHwgIVJFUVVJUkVEX0dBU1RPX1RZUEVTLmhhcyhwYXJzZWRHYXN0b1R5cGUpKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiVGlja2V0c19WYWxpZGF0aW9uX0NhdGVnb3J5UmVxdWlyZWRcIiwgXCJDYXRlZ29yeSBpcyByZXF1aXJlZC5cIik7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJhd1RyYW5zRGF0ZSA9IFN0cmluZyhkcmFmdFRyYW5zRGF0ZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgICBjb25zdCBub3JtYWxpemVkVHJhbnNEYXRlID0gcmF3VHJhbnNEYXRlID8gdG9FeHBlbnNlQXBpRGRNbVl5eXkocmF3VHJhbnNEYXRlKSA6IFwiXCI7XHJcbiAgICBpZiAocmF3VHJhbnNEYXRlICYmICFub3JtYWxpemVkVHJhbnNEYXRlKSB7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgICAgIHNldFN0YXR1cyhFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3QgPSB7XHJcbiAgICAgIGRlc2NyaXB0aW9uOiBub3JtYWxpemVkRGVzY3JpcHRpb24sXHJcbiAgICAgIGN1cnJlbmN5Q29kZTogbm9ybWFsaXplZEN1cnJlbmN5LFxyXG4gICAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWRUcmFuc0RhdGUgfHwgdW5kZWZpbmVkLFxyXG4gICAgICBjb21lbnRhcmlvOiBTdHJpbmcoZHJhZnRDb21lbnRhcmlvIHx8IFwiXCIpLnRyaW0oKSB8fCB1bmRlZmluZWQsXHJcbiAgICAgIHVybEZpbGU6IFN0cmluZyhkcmFmdFVybEZpbGUgfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcclxuICAgICAgZmlsZU5hbWU6IFN0cmluZyhkcmFmdEZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSB8fCB1bmRlZmluZWQsXHJcbiAgICAgIGZpbGVFeHRlbnNpb246IHJlc29sdmVUaWNrZXRGaWxlRXh0ZW5zaW9uKGRyYWZ0RmlsZU5hbWUsIGRyYWZ0VXJsRmlsZSksXHJcbiAgICAgIGdhc3RvVHlwZTogcGFyc2VkR2FzdG9UeXBlIGFzIEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3RbXCJnYXN0b1R5cGVcIl0sXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcclxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldEJ1c3ksXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1cGRhdGVFeHBlbnNlU2hlZXRUaWNrZXQoZmlsZUlkLCBwYXlsb2FkKTtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IHVwZGF0ZWRcIikpO1xyXG4gICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xyXG4gIH0sIFtcclxuICAgIGJ1c3ksXHJcbiAgICBjYW5FZGl0VGlja2V0LFxyXG4gICAgZHJhZnRDb21lbnRhcmlvLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRGaWxlTmFtZSxcclxuICAgIGRyYWZ0R2FzdG9UeXBlLFxyXG4gICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICBkcmFmdFVybEZpbGUsXHJcbiAgICBmaWxlSWQsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFN0YXR1cyxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgcmVzb2x2ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCA9IHVzZUNhbGxiYWNrKGFzeW5jICgpOiBQcm9taXNlPERlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCB8IG51bGw+ID0+IHtcclxuICAgIGlmIChkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQpIHtcclxuICAgICAgcmV0dXJuIGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KGxpbmtlZEV4cGVuc2VTaGVldElkKTtcclxuICAgIGlmICghc2FmZVNoZWV0SWQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldERldGFpbChzYWZlU2hlZXRJZCwge1xyXG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlLkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XHJcbiAgICBjb25zdCBkZXRhaWwgPSBpdGVtcy5maW5kKChlbnRyeSkgPT4gZW50cnkgJiYgdHlwZW9mIGVudHJ5ID09PSBcIm9iamVjdFwiKSB8fCBudWxsO1xyXG4gICAgY29uc3QgbGluZXMgPSBBcnJheS5pc0FycmF5KGRldGFpbD8uTGluZXMpID8gZGV0YWlsLkxpbmVzIDogW107XHJcbiAgICBjb25zdCBtYXRjaGluZ0xpbmUgPSBsaW5lcy5maW5kKChsaW5lKSA9PiBzYWZlVGV4dChsaW5lPy5GaWxlSWQpID09PSBmaWxlSWQpO1xyXG4gICAgY29uc3QgbGluZVJlY0lkID0gc2FmZVRleHQobWF0Y2hpbmdMaW5lPy5SZWNJZCk7XHJcblxyXG4gICAgaWYgKCFsaW5lUmVjSWQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2hlZXRJZDogc2FmZVNoZWV0SWQsXHJcbiAgICAgIGxpbmVSZWNJZCxcclxuICAgIH07XHJcbiAgfSwgW2RlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCwgZmlsZUlkLCBsaW5rZWRFeHBlbnNlU2hlZXRJZF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5EZWxldGVUaWNrZXQpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxyXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUVycm9yXCIsIFwiRGVsZXRlIGVycm9yLlwiKSxcclxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBsaW5rZWRMaW5lQ29udGV4dCA9IGF3YWl0IHJlc29sdmVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQoKTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGRlbGV0ZUZpbGVSZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldEZpbGUoZmlsZUlkLCB7XHJcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBpZiAoIWRlbGV0ZUZpbGVSZXNwb25zZS5TdWNjZXNzICYmICFpc01pc3NpbmdUaWNrZXRGaWxlTWVzc2FnZShkZWxldGVGaWxlUmVzcG9uc2UuTWVzc2FnZSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRlbGV0ZUZpbGVSZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGlmICghaXNOb3RGb3VuZEVycm9yKGVycm9yKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0KGZpbGVJZCk7XHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxpbmtlZExpbmVDb250ZXh0KSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5lRGVsZXRlUmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRMaW5lKFxyXG4gICAgICAgICAgICAgIGxpbmtlZExpbmVDb250ZXh0LnNoZWV0SWQsXHJcbiAgICAgICAgICAgICAgbGlua2VkTGluZUNvbnRleHQubGluZVJlY0lkLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbGluZURlbGV0ZVJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobGluZURlbGV0ZVJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgLy8gVGhlIGxpbmtlZCBsaW5lIGNhbiBiZSBhdXRvLXJlbW92ZWQgYnkgYmFja2VuZCBjYXNjYWRlOyBrZWVwIGZsb3cgc3VjY2Vzc2Z1bCBpbiB0aGF0IGNhc2UuXHJcbiAgICAgICAgICAgIGlmICghaXNOb3RGb3VuZEVycm9yKGVycm9yKSkge1xyXG4gICAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IGRlbGV0ZWRcIikpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICB9LCBbYnVzeSwgY2FuRGVsZXRlVGlja2V0LCBmaWxlSWQsIHJlc29sdmVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQsIHNldEJ1c3ksIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1c10pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbE9wZW46IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGlzTG9ja2VkOiBib29sZWFuO1xyXG4gIGFjdGlvbk1vZGU/OiBcImRlZmF1bHRcIiB8IFwiZGVsZXRlX29ubHlcIiB8IFwidmlld19vbmx5XCI7XHJcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XHJcbiAgY2FuRWRpdFRpY2tldDogYm9vbGVhbjtcclxuICBjYW5EZWxldGVUaWNrZXQ6IGJvb2xlYW47XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGNhbk9wZW5TYXZlQ29uZmlybT86ICgpID0+IGJvb2xlYW47XHJcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBvblNhdmVTdWNjZXNzOiAoKSA9PiB2b2lkO1xyXG4gIG9uRGVsZXRlU3VjY2Vzcz86ICgpID0+IHZvaWQ7XHJcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xyXG4gIH0pID0+IHZvaWQ7XHJcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gc3RhdGUgYW5kIGRpc3BhdGNoIGFjdGlvbnMgZm9yIHRpY2tldCBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbE9wZW4sXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzTG9ja2VkLFxyXG4gIGFjdGlvbk1vZGUgPSBcImRlZmF1bHRcIixcclxuICBwZXJtaXNzaW9uc1JlYWR5ID0gdHJ1ZSxcclxuICBjYW5FZGl0VGlja2V0LFxyXG4gIGNhbkRlbGV0ZVRpY2tldCxcclxuICBmaWxlSWQsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gIGhhbmRsZVVwZGF0ZSxcclxuICBoYW5kbGVEZWxldGUsXHJcbiAgb25TYXZlU3VjY2VzcyxcclxuICBvbkRlbGV0ZVN1Y2Nlc3MsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcclxuICB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMoe1xyXG4gICAgYWN0aW9uR3JvdXBJZDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtYWN0aW9uc1wiLFxyXG4gICAgaWRzOiB7XHJcbiAgICAgIGVkaXRJY29uSWQ6IFwiZXhwZW5zZVRpY2tldEVkaXRJY29uXCIsXHJcbiAgICAgIHNhdmVJY29uSWQ6IFwiZXhwZW5zZVRpY2tldFNhdmVJY29uXCIsXHJcbiAgICAgIGRlbGV0ZUJ0bklkOiBcImV4cGVuc2VUaWNrZXREZWxldGVCdG5cIixcclxuICAgICAgY2FuY2VsQnRuSWQ6IFwiZXhwZW5zZVRpY2tldENhbmNlbEJ0blwiLFxyXG4gICAgfSxcclxuICAgIGV2ZW50czoge1xyXG4gICAgICBlZGl0RXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWVkaXRcIixcclxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWRlbGV0ZVwiLFxyXG4gICAgICBjYW5jZWxFdmVudDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtY2FuY2VsLWVkaXRcIixcclxuICAgIH0sXHJcbiAgICBidXN5LFxyXG4gICAgbW9kYWxPcGVuLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlOiBmYWxzZSxcclxuICAgIGlzTG9ja2VkLFxyXG4gICAgYWN0aW9uTW9kZSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHksXHJcbiAgICBjYW5DcmVhdGU6IGZhbHNlLFxyXG4gICAgY2FuRWRpdDogY2FuRWRpdFRpY2tldCxcclxuICAgIGNhbkRlbGV0ZTogY2FuRGVsZXRlVGlja2V0LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlU2F2ZTogaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgc2F2ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiU2F2ZSBjaGFuZ2VzXCIpLFxyXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXHJcbiAgICBzYXZlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXHJcbiAgICBkZWxldGVDb25maXJtVGl0bGU6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9UaXRsZVwiLCBcIkRlbGV0ZVwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiQ29uZmlybV9EZWxldGVfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/XCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpLFxyXG4gICAgb25TYXZlU3VjY2VzcyxcclxuICAgIG9uRGVsZXRlU3VjY2Vzczogb25EZWxldGVTdWNjZXNzIHx8ICgoKSA9PiBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvVGlja2V0c1wiKSksXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZHVjZXIsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBEaXNwYXRjaCwgU2V0U3RhdGVBY3Rpb24gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHBhcnNlRXhwZW5zZURhdGUsIHNhZmVUZXh0LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcblxyXG50eXBlIERyYWZ0U3RhdGUgPSB7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBnYXN0b1R5cGU6IHN0cmluZztcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICB0cmFuc0RhdGU6IHN0cmluZztcclxuICBjb21lbnRhcmlvOiBzdHJpbmc7XHJcbiAgdXJsRmlsZTogc3RyaW5nO1xyXG4gIGZpbGVOYW1lOiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEVkaXRvclN0YXRlID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIG1vZGFsRXJyb3I6IHN0cmluZztcclxuICBsaW5lUGFnZTogbnVtYmVyO1xyXG4gIGRyYWZ0OiBEcmFmdFN0YXRlO1xyXG59O1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yQXJncyA9IHtcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xyXG4gIGxpbmVDb3VudDogbnVtYmVyO1xyXG4gIHBhZ2VTaXplOiBudW1iZXI7XHJcbiAgY2FuRWRpdFRpY2tldDogYm9vbGVhbjtcclxuICBpc0xvYWRpbmc6IGJvb2xlYW47XHJcbiAgYWxsb3dBc3NpZ25lZERyYWZ0RWRpdDogYm9vbGVhbjtcclxuICBpc0Zyb21TaGVldExpbms6IGJvb2xlYW47XHJcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG50eXBlIEVkaXRvckFjdGlvbiA9XHJcbiAgfCB7IHR5cGU6IFwiaHlkcmF0ZV9mcm9tX2hlYWRlclwiOyBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsIH1cclxuICB8IHtcclxuICAgICAgdHlwZTogXCJwYXRjaF9zdGF0ZVwiO1xyXG4gICAgICBwYXRjaDogUGFydGlhbDxQaWNrPEVkaXRvclN0YXRlLCBcImJ1c3lcIiB8IFwic3RhdHVzXCIgfCBcImlzRWRpdGluZ1wiIHwgXCJtb2RhbEVycm9yXCIgfCBcImxpbmVQYWdlXCI+PjtcclxuICAgIH1cclxuICB8IHsgdHlwZTogXCJzZXRfZHJhZnRfZmllbGRcIjsgZmllbGQ6IGtleW9mIERyYWZ0U3RhdGU7IHZhbHVlOiBzdHJpbmcgfTtcclxuXHJcbmNvbnN0IGNyZWF0ZUVtcHR5RHJhZnQgPSAoKTogRHJhZnRTdGF0ZSA9PiAoe1xyXG4gIGRlc2NyaXB0aW9uOiBcIlwiLFxyXG4gIGdhc3RvVHlwZTogXCJcIixcclxuICBjdXJyZW5jeUNvZGU6IFwiXCIsXHJcbiAgdHJhbnNEYXRlOiBcIlwiLFxyXG4gIGNvbWVudGFyaW86IFwiXCIsXHJcbiAgdXJsRmlsZTogXCJcIixcclxuICBmaWxlTmFtZTogXCJcIixcclxufSk7XHJcblxyXG5jb25zdCB0b0lucHV0RGF0ZSA9IChyYXc/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcclxuICByZXR1cm4gcGFyc2VkID8gdG9Jc29EYXRlKHBhcnNlZCkgOiBcIlwiO1xyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlRHJhZnRGcm9tSGVhZGVyID0gKGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGwpOiBEcmFmdFN0YXRlID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KGhlYWRlcj8uZGVzY3JpcHRpb24pLFxyXG4gICAgZ2FzdG9UeXBlOiBoZWFkZXI/Lmdhc3RvVHlwZSA9PT0gbnVsbCB8fCBoZWFkZXI/Lmdhc3RvVHlwZSA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IFN0cmluZyhoZWFkZXIuZ2FzdG9UeXBlKSxcclxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCksXHJcbiAgICB0cmFuc0RhdGU6IHRvSW5wdXREYXRlKGhlYWRlcj8udHJhbnNEYXRlKSxcclxuICAgIGNvbWVudGFyaW86IHNhZmVUZXh0KGhlYWRlcj8uY29tZW50YXJpbyksXHJcbiAgICB1cmxGaWxlOiBzYWZlVGV4dChoZWFkZXI/LnVybEZpbGUpLFxyXG4gICAgZmlsZU5hbWU6IHNhZmVUZXh0KGhlYWRlcj8uZmlsZU5hbWUpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVJbml0aWFsU3RhdGUgPSAoKTogRWRpdG9yU3RhdGUgPT4gKHtcclxuICBidXN5OiBmYWxzZSxcclxuICBzdGF0dXM6IFwiXCIsXHJcbiAgaXNFZGl0aW5nOiBmYWxzZSxcclxuICBtb2RhbEVycm9yOiBcIlwiLFxyXG4gIGxpbmVQYWdlOiAxLFxyXG4gIGRyYWZ0OiBjcmVhdGVFbXB0eURyYWZ0KCksXHJcbn0pO1xyXG5cclxuY29uc3QgaXNWYWxpZFJlcXVpcmVkR2FzdG9UeXBlID0gKHJhd1ZhbHVlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICBjb25zdCBwYXJzZWRWYWx1ZSA9IE51bWJlci5wYXJzZUludChTdHJpbmcocmF3VmFsdWUgfHwgXCJcIikudHJpbSgpLCAxMCk7XHJcbiAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIocGFyc2VkVmFsdWUpICYmIHBhcnNlZFZhbHVlID4gMDtcclxufTtcclxuXHJcbmNvbnN0IGVkaXRvclJlZHVjZXIgPSAoc3RhdGU6IEVkaXRvclN0YXRlLCBhY3Rpb246IEVkaXRvckFjdGlvbik6IEVkaXRvclN0YXRlID0+IHtcclxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICBjYXNlIFwiaHlkcmF0ZV9mcm9tX2hlYWRlclwiOlxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIGRyYWZ0OiBjcmVhdGVEcmFmdEZyb21IZWFkZXIoYWN0aW9uLmhlYWRlciksXHJcbiAgICAgIH07XHJcbiAgICBjYXNlIFwicGF0Y2hfc3RhdGVcIjpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAuLi5hY3Rpb24ucGF0Y2gsXHJcbiAgICAgIH07XHJcbiAgICBjYXNlIFwic2V0X2RyYWZ0X2ZpZWxkXCI6XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgZHJhZnQ6IHtcclxuICAgICAgICAgIC4uLnN0YXRlLmRyYWZ0LFxyXG4gICAgICAgICAgW2FjdGlvbi5maWVsZF06IGFjdGlvbi52YWx1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVTZXRTdGF0ZVZhbHVlID0gPFQsPih2YWx1ZTogU2V0U3RhdGVBY3Rpb248VD4sIGN1cnJlbnQ6IFQpOiBUID0+IHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgPyAodmFsdWUgYXMgKHByZXZTdGF0ZTogVCkgPT4gVCkoY3VycmVudCkgOiB2YWx1ZTtcclxufTtcclxuXHJcbi8vIE93bnMgcGFnZS1sb2NhbCBlZGl0LCBkcmFmdCwgYW5kIGxpbmUgcGFnaW5nIHN0YXRlIGZvciB0aWNrZXQgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbEVkaXRvciA9ICh7XG4gIGhlYWRlcixcbiAgbGluZUNvdW50LFxuICBwYWdlU2l6ZSxcbiAgY2FuRWRpdFRpY2tldCxcclxuICBpc0xvYWRpbmcsXHJcbiAgYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCxcclxuICBpc0Zyb21TaGVldExpbmssXHJcbiAgb25Gb3JiaWRkZW4sXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3JBcmdzKSA9PiB7XG4gIGNvbnN0IFtzdGF0ZSwgZGlzcGF0Y2hdID0gdXNlUmVkdWNlcihlZGl0b3JSZWR1Y2VyLCB1bmRlZmluZWQsIGNyZWF0ZUluaXRpYWxTdGF0ZSk7XG4gIGNvbnN0IFtkZXNjcmlwdGlvbkludmFsaWQsIHNldERlc2NyaXB0aW9uSW52YWxpZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtnYXN0b1R5cGVJbnZhbGlkLCBzZXRHYXN0b1R5cGVJbnZhbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2N1cnJlbmN5Q29kZUludmFsaWQsIHNldEN1cnJlbmN5Q29kZUludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBkZXNjcmlwdGlvbklucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgZ2FzdG9UeXBlSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBjdXJyZW5jeUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc3RhdGUuaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBkaXNwYXRjaCh7IHR5cGU6IFwiaHlkcmF0ZV9mcm9tX2hlYWRlclwiLCBoZWFkZXIgfSk7XHJcbiAgfSwgW2hlYWRlciwgc3RhdGUuaXNFZGl0aW5nXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBtYXhQYWdlID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKGxpbmVDb3VudCAvIHBhZ2VTaXplKSk7XHJcbiAgICBpZiAoc3RhdGUubGluZVBhZ2UgPiBtYXhQYWdlKSB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBsaW5lUGFnZTogbWF4UGFnZSB9IH0pO1xyXG4gICAgfVxyXG4gIH0sIFtsaW5lQ291bnQsIHBhZ2VTaXplLCBzdGF0ZS5saW5lUGFnZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChzdGF0ZS5pc0VkaXRpbmcpIHJldHVybjtcbiAgICBzZXREZXNjcmlwdGlvbkludmFsaWQoZmFsc2UpO1xuICAgIHNldEdhc3RvVHlwZUludmFsaWQoZmFsc2UpO1xuICAgIHNldEN1cnJlbmN5Q29kZUludmFsaWQoZmFsc2UpO1xuICB9LCBbc3RhdGUuaXNFZGl0aW5nXSk7XG5cclxuICBjb25zdCBzZXRCdXN5ID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwicGF0Y2hfc3RhdGVcIiwgcGF0Y2g6IHsgYnVzeTogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmJ1c3kpIH0gfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLmJ1c3ldXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2V0U3RhdHVzID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBzdGF0dXM6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5zdGF0dXMpIH0gfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLnN0YXR1c11cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRJc0VkaXRpbmcgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxib29sZWFuPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBpc0VkaXRpbmc6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5pc0VkaXRpbmcpIH0gfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLmlzRWRpdGluZ11cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRNb2RhbEVycm9yID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBtb2RhbEVycm9yOiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUubW9kYWxFcnJvcikgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUubW9kYWxFcnJvcl1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRMaW5lUGFnZSA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPG51bWJlcj4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwicGF0Y2hfc3RhdGVcIiwgcGF0Y2g6IHsgbGluZVBhZ2U6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5saW5lUGFnZSkgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUubGluZVBhZ2VdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2V0RHJhZnREZXNjcmlwdGlvbiA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcbiAgICAodmFsdWUpID0+IHtcbiAgICAgIHNldERlc2NyaXB0aW9uSW52YWxpZChmYWxzZSk7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFwic2V0X2RyYWZ0X2ZpZWxkXCIsXG4gICAgICAgIGZpZWxkOiBcImRlc2NyaXB0aW9uXCIsXG4gICAgICAgIHZhbHVlOiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuZHJhZnQuZGVzY3JpcHRpb24pLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuZHJhZnQuZGVzY3JpcHRpb25dXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2V0RHJhZnRHYXN0b1R5cGUgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxzdHJpbmc+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgc2V0R2FzdG9UeXBlSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcInNldF9kcmFmdF9maWVsZFwiLFxyXG4gICAgICAgIGZpZWxkOiBcImdhc3RvVHlwZVwiLFxyXG4gICAgICAgIHZhbHVlOiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuZHJhZnQuZ2FzdG9UeXBlKSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLmRyYWZ0Lmdhc3RvVHlwZV1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXREcmFmdEN1cnJlbmN5Q29kZSA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwic2V0X2RyYWZ0X2ZpZWxkXCIsXHJcbiAgICAgICAgZmllbGQ6IFwiY3VycmVuY3lDb2RlXCIsXHJcbiAgICAgICAgdmFsdWU6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUpLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldERyYWZ0VHJhbnNEYXRlID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcInNldF9kcmFmdF9maWVsZFwiLFxyXG4gICAgICAgIGZpZWxkOiBcInRyYW5zRGF0ZVwiLFxyXG4gICAgICAgIHZhbHVlOiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuZHJhZnQudHJhbnNEYXRlKSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLmRyYWZ0LnRyYW5zRGF0ZV1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFoZWFkZXIgfHwgaXNMb2FkaW5nKSByZXR1cm47XHJcbiAgICBpZiAoaXNGcm9tU2hlZXRMaW5rKSByZXR1cm47XHJcbiAgICBpZiAoaGVhZGVyLnN0YXR1cyA9PT0gMSAmJiAhYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCkgcmV0dXJuO1xyXG4gICAgaWYgKCFjYW5FZGl0VGlja2V0KSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRHYXN0b1R5cGVJbnZhbGlkKGZhbHNlKTtcclxuICAgIHNldEN1cnJlbmN5Q29kZUludmFsaWQoZmFsc2UpO1xyXG4gICAgZGlzcGF0Y2goeyB0eXBlOiBcImh5ZHJhdGVfZnJvbV9oZWFkZXJcIiwgaGVhZGVyIH0pO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBcInBhdGNoX3N0YXRlXCIsXHJcbiAgICAgIHBhdGNoOiB7XHJcbiAgICAgICAgbW9kYWxFcnJvcjogXCJcIixcclxuICAgICAgICBpc0VkaXRpbmc6IHRydWUsXHJcbiAgICAgICAgc3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LCBbYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCwgY2FuRWRpdFRpY2tldCwgaGVhZGVyLCBpc0Zyb21TaGVldExpbmssIGlzTG9hZGluZywgb25Gb3JiaWRkZW5dKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghc3RhdGUuaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBpZiAoIWhlYWRlcikge1xyXG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwicGF0Y2hfc3RhdGVcIiwgcGF0Y2g6IHsgaXNFZGl0aW5nOiBmYWxzZSB9IH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R2FzdG9UeXBlSW52YWxpZChmYWxzZSk7XHJcbiAgICBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkKGZhbHNlKTtcclxuICAgIGRpc3BhdGNoKHsgdHlwZTogXCJoeWRyYXRlX2Zyb21faGVhZGVyXCIsIGhlYWRlciB9KTtcclxuICAgIGRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLFxyXG4gICAgICBwYXRjaDoge1xyXG4gICAgICAgIGlzRWRpdGluZzogZmFsc2UsXHJcbiAgICAgICAgbW9kYWxFcnJvcjogXCJcIixcclxuICAgICAgICBzdGF0dXM6IGluZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSwgW2hlYWRlciwgc3RhdGUuaXNFZGl0aW5nXSk7XHJcblxuICBjb25zdCBjYW5PcGVuU2F2ZUNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3Qgbm9ybWFsaXplZERlc2NyaXB0aW9uID0gU3RyaW5nKHN0YXRlLmRyYWZ0LmRlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3lDb2RlID0gU3RyaW5nKHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbklzVmFsaWQgPSAhIW5vcm1hbGl6ZWREZXNjcmlwdGlvbjtcbiAgICBjb25zdCBnYXN0b1R5cGVJc1ZhbGlkID0gaXNWYWxpZFJlcXVpcmVkR2FzdG9UeXBlKHN0YXRlLmRyYWZ0Lmdhc3RvVHlwZSk7XG4gICAgY29uc3QgY3VycmVuY3lJc1ZhbGlkID0gISFub3JtYWxpemVkQ3VycmVuY3lDb2RlO1xuXG4gICAgc2V0RGVzY3JpcHRpb25JbnZhbGlkKCFkZXNjcmlwdGlvbklzVmFsaWQpO1xuICAgIHNldEdhc3RvVHlwZUludmFsaWQoIWdhc3RvVHlwZUlzVmFsaWQpO1xuICAgIHNldEN1cnJlbmN5Q29kZUludmFsaWQoIWN1cnJlbmN5SXNWYWxpZCk7XG5cbiAgICBpZiAoZGVzY3JpcHRpb25Jc1ZhbGlkICYmIGdhc3RvVHlwZUlzVmFsaWQgJiYgY3VycmVuY3lJc1ZhbGlkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlID0gIWRlc2NyaXB0aW9uSXNWYWxpZFxuICAgICAgPyBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0Rlc2NyaXB0aW9uUmVxdWlyZWRcIiwgXCJEZXNjcmlwdGlvbiBpcyByZXF1aXJlZC5cIilcbiAgICAgIDogIWdhc3RvVHlwZUlzVmFsaWRcbiAgICAgICAgPyBpbmRUKFwiVGlja2V0c19WYWxpZGF0aW9uX0NhdGVnb3J5UmVxdWlyZWRcIiwgXCJDYXRlZ29yeSBpcyByZXF1aXJlZC5cIilcbiAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0N1cnJlbmN5UmVxdWlyZWRcIiwgXCJDdXJyZW5jeSBpcyByZXF1aXJlZC5cIik7XG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBcInBhdGNoX3N0YXRlXCIsXG4gICAgICBwYXRjaDoge1xyXG4gICAgICAgIG1vZGFsRXJyb3I6IG1lc3NhZ2UsXHJcbiAgICAgICAgc3RhdHVzOiBtZXNzYWdlLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmICghZGVzY3JpcHRpb25Jc1ZhbGlkKSB7XG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWdhc3RvVHlwZUlzVmFsaWQpIHtcbiAgICAgICAgZ2FzdG9UeXBlSW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxyXG5cclxuICAgICAgY3VycmVuY3lJbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sIFtzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUsIHN0YXRlLmRyYWZ0Lmdhc3RvVHlwZV0pO1xyXG5cclxuICByZXR1cm4ge1xuICAgIGJ1c3k6IHN0YXRlLmJ1c3ksXG4gICAgc3RhdHVzOiBzdGF0ZS5zdGF0dXMsXG4gICAgaXNFZGl0aW5nOiBzdGF0ZS5pc0VkaXRpbmcsXG4gICAgbW9kYWxFcnJvcjogc3RhdGUubW9kYWxFcnJvcixcbiAgICBsaW5lUGFnZTogc3RhdGUubGluZVBhZ2UsXG4gICAgZHJhZnREZXNjcmlwdGlvbjogc3RhdGUuZHJhZnQuZGVzY3JpcHRpb24sXG4gICAgZGVzY3JpcHRpb25JbnZhbGlkLFxuICAgIGRlc2NyaXB0aW9uSW5wdXRSZWYsXG4gICAgZHJhZnRHYXN0b1R5cGU6IHN0YXRlLmRyYWZ0Lmdhc3RvVHlwZSxcbiAgICBnYXN0b1R5cGVJbnZhbGlkLFxuICAgIGdhc3RvVHlwZUlucHV0UmVmLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUsXHJcbiAgICBjdXJyZW5jeUNvZGVJbnZhbGlkLFxyXG4gICAgY3VycmVuY3lJbnB1dFJlZixcclxuICAgIGRyYWZ0VHJhbnNEYXRlOiBzdGF0ZS5kcmFmdC50cmFuc0RhdGUsXHJcbiAgICBkcmFmdENvbWVudGFyaW86IHN0YXRlLmRyYWZ0LmNvbWVudGFyaW8sXHJcbiAgICBkcmFmdFVybEZpbGU6IHN0YXRlLmRyYWZ0LnVybEZpbGUsXHJcbiAgICBkcmFmdEZpbGVOYW1lOiBzdGF0ZS5kcmFmdC5maWxlTmFtZSxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRHYXN0b1R5cGUsXHJcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIHNldERyYWZ0VHJhbnNEYXRlLFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQge1xyXG4gIG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIHJlc29sdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxuICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG4vLyBQYXJzZXMgcm91dGUgY29udGV4dCBvbmNlIGFuZCBleHBvc2VzIHN0YWJsZSBmbGFncyBmb3IgdGlja2V0IGRldGFpbCBmbG93cy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQgPSAoKSA9PiB7XHJcbiAgY29uc3Qgcm91dGVQYXJhbXMgPSB1c2VNZW1vKCgpID0+IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCksIFtdKTtcclxuICBjb25zdCBmaWxlSWQgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfVElDS0VUX0ZJTEVfSURfXyksIFtdKTtcclxuICBjb25zdCBhdXRvRWRpdE1vZGUgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcIm1vZGVcIikpLnRvTG93ZXJDYXNlKCkgPT09IFwiZWRpdFwiLCBbcm91dGVQYXJhbXNdKTtcclxuICBjb25zdCByb3V0ZU9yaWdpbiA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwib3JpZ2luXCIpKS50b0xvd2VyQ2FzZSgpLCBbcm91dGVQYXJhbXNdKTtcclxuICBjb25zdCByb3V0ZVNoZWV0SWQgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcInNoZWV0SWRcIikpLCBbcm91dGVQYXJhbXNdKTtcclxuICBjb25zdCBjb250ZXh0TGluZVJlY0lkID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChyb3V0ZVBhcmFtcy5nZXQoXCJsaW5lUmVjSWRcIikpLCBbcm91dGVQYXJhbXNdKTtcclxuICBjb25zdCBleHBsaWNpdFJldHVybkNvbnRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT5cclxuICAgICAgbm9ybWFsaXplRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoe1xyXG4gICAgICAgIGZpbGVJZCxcclxuICAgICAgICBvcmlnaW46IHJvdXRlT3JpZ2luLFxyXG4gICAgICAgIHNoZWV0SWQ6IHJvdXRlU2hlZXRJZCxcclxuICAgICAgfSksXHJcbiAgICBbZmlsZUlkLCByb3V0ZU9yaWdpbiwgcm91dGVTaGVldElkXVxyXG4gICk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWV4cGxpY2l0UmV0dXJuQ29udGV4dCkgcmV0dXJuO1xyXG4gICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KGV4cGxpY2l0UmV0dXJuQ29udGV4dCk7XHJcbiAgfSwgW2V4cGxpY2l0UmV0dXJuQ29udGV4dF0pO1xyXG5cclxuICByZXR1cm4gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCB0aWNrZXRSZXR1cm5Db250ZXh0ID0gcmVzb2x2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KGZpbGVJZCwgZXhwbGljaXRSZXR1cm5Db250ZXh0KTtcclxuICAgIGNvbnN0IGRldGFpbE9yaWdpbiA9IHRpY2tldFJldHVybkNvbnRleHQ/Lm9yaWdpbiB8fCByb3V0ZU9yaWdpbjtcclxuICAgIGNvbnN0IGNvbnRleHRTaGVldElkID0gdGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCB8fCByb3V0ZVNoZWV0SWQ7XHJcbiAgICBjb25zdCBpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUgPSBkZXRhaWxPcmlnaW4gPT09IFwic2hlZXQtY3JlYXRlXCI7XHJcbiAgICBjb25zdCBpc0Zyb21FeHBlbnNlTGluZSA9IGRldGFpbE9yaWdpbiA9PT0gXCJleHBlbnNlLWxpbmVcIiAmJiAhIWNvbnRleHRTaGVldElkICYmICEhY29udGV4dExpbmVSZWNJZDtcclxuICAgIGNvbnN0IGlzRnJvbVNoZWV0TGluayA9IGRldGFpbE9yaWdpbiA9PT0gXCJzaGVldC1saW5rXCIgJiYgISFjb250ZXh0U2hlZXRJZDtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhdXRvRWRpdE1vZGUsXHJcbiAgICAgIGRldGFpbE9yaWdpbixcclxuICAgICAgY29udGV4dFNoZWV0SWQsXHJcbiAgICAgIGNvbnRleHRMaW5lUmVjSWQsXHJcbiAgICAgIGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSxcclxuICAgICAgaXNGcm9tRXhwZW5zZUxpbmUsXHJcbiAgICAgIGlzRnJvbVNoZWV0TGluayxcclxuICAgICAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxuICAgIH07XHJcbiAgfSwgW2F1dG9FZGl0TW9kZSwgY29udGV4dExpbmVSZWNJZCwgZXhwbGljaXRSZXR1cm5Db250ZXh0LCBmaWxlSWQsIHJvdXRlT3JpZ2luLCByb3V0ZVNoZWV0SWRdKTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uLy4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbCB9IGZyb20gXCIuLi8uLi9jb25zdGFudHMvZXhwZW5zZVRpY2tldFN0YXR1c0NhdGFsb2cudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5QXJncyA9IHtcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xyXG4gIGRyYWZ0R2FzdG9UeXBlOiBzdHJpbmc7XHJcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgZ2FzdG9UeXBlTGFiZWxNYXA6IE1hcDxzdHJpbmcsIHN0cmluZz47XHJcbn07XHJcblxyXG4vLyBDZW50cmFsaXplcyBkaXNwbGF5LW9ubHkgdmFsdWVzIHNvIHRoZSBwYWdlIGNvbnRhaW5lciBzdGF5cyBmb2N1c2VkIG9uIGZsb3cgd2lyaW5nLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXkgPSAoe1xyXG4gIGhlYWRlcixcclxuICBkcmFmdEdhc3RvVHlwZSxcclxuICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICBkcmFmdFRyYW5zRGF0ZSxcclxuICBkcmFmdEZpbGVOYW1lLFxyXG4gIGlzRWRpdGluZyxcclxuICBnYXN0b1R5cGVMYWJlbE1hcCxcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXlBcmdzKSA9PiB7XHJcbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiAoe1xyXG4gICAgICBmaXJzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9GaXJzdFwiLCBcIkZpcnN0XCIpLFxyXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcclxuICAgICAgbmV4dDogaW5kVChcIkhpc3RvcnlfUGFnZV9OZXh0XCIsIFwiTmV4dFwiKSxcclxuICAgICAgbGFzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKSxcclxuICAgIH0pLFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICBjb25zdCBwcmV2aWV3QWx0VGV4dCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBzYWZlVGV4dChpc0VkaXRpbmcgPyBkcmFmdEZpbGVOYW1lIDogaGVhZGVyPy5maWxlTmFtZSkgfHwgaW5kVChcIlRpY2tldHNfRmllbGRfRmlsZUlkXCIsIFwiVGlja2V0XCIpLFxyXG4gICAgW2RyYWZ0RmlsZU5hbWUsIGhlYWRlcj8uZmlsZU5hbWUsIGlzRWRpdGluZ11cclxuICApO1xyXG5cclxuICBjb25zdCBzdGF0dXNMYWJlbCA9IHVzZU1lbW8oKCkgPT4gZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsKGhlYWRlcj8uc3RhdHVzKSwgW2hlYWRlcj8uc3RhdHVzXSk7XHJcblxyXG4gIGNvbnN0IGdhc3RvVHlwZUxhYmVsID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50R2FzdG9UeXBlID0gaXNFZGl0aW5nID8gZHJhZnRHYXN0b1R5cGUgOiBoZWFkZXI/Lmdhc3RvVHlwZSA9PT0gbnVsbCA/IFwiXCIgOiBTdHJpbmcoaGVhZGVyPy5nYXN0b1R5cGUgPz8gXCJcIik7XHJcbiAgICBpZiAoIWN1cnJlbnRHYXN0b1R5cGUpIHtcclxuICAgICAgcmV0dXJuIGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdhc3RvVHlwZUxhYmVsTWFwLmdldChTdHJpbmcoY3VycmVudEdhc3RvVHlwZSkpIHx8IFN0cmluZyhjdXJyZW50R2FzdG9UeXBlKTtcclxuICB9LCBbZHJhZnRHYXN0b1R5cGUsIGdhc3RvVHlwZUxhYmVsTWFwLCBoZWFkZXI/Lmdhc3RvVHlwZSwgaXNFZGl0aW5nXSk7XHJcblxyXG4gIGNvbnN0IHRvdGFsQW1vdW50VGV4dCA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koaGVhZGVyPy50b3RhbEFtb3VudCA/PyBudWxsLCAoaXNFZGl0aW5nID8gZHJhZnRDdXJyZW5jeUNvZGUgOiBoZWFkZXI/LmN1cnJlbmN5Q29kZSkgfHwgaGVhZGVyPy5jdXJyZW5jeUNvZGUpLFxyXG4gICAgW2RyYWZ0Q3VycmVuY3lDb2RlLCBoZWFkZXI/LmN1cnJlbmN5Q29kZSwgaGVhZGVyPy50b3RhbEFtb3VudCwgaXNFZGl0aW5nXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHRyYW5zRGF0ZVRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGlzRWRpdGluZyA/IGRyYWZ0VHJhbnNEYXRlIDogaGVhZGVyPy50cmFuc0RhdGUsIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiKSxcclxuICAgIFtkcmFmdFRyYW5zRGF0ZSwgaGVhZGVyPy50cmFuc0RhdGUsIGlzRWRpdGluZ11cclxuICApO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcGFnaW5hdGlvbkxhYmVscyxcclxuICAgIHByZXZpZXdBbHRUZXh0LFxyXG4gICAgc3RhdHVzTGFiZWwsXHJcbiAgICBnYXN0b1R5cGVMYWJlbCxcclxuICAgIHRvdGFsQW1vdW50VGV4dCxcclxuICAgIHRyYW5zRGF0ZVRleHQsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZUFyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbEVycm9yOiBzdHJpbmc7XHJcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0U3RhdHVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIEVuY2Fwc3VsYXRlcyBjb25maXJtIG1vZGFsIHN0YXRlIHNvIHRoZSBwYWdlIGNvbnRhaW5lciBzdGF5cyBmb2N1c2VkIG9uIGZsb3cgd2lyaW5nLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZSA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbEVycm9yLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgc2V0U3RhdHVzLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsQ29uZmlybVN0YXRlQXJncykgPT4ge1xyXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xyXG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcclxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm0sIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1c10pO1xyXG5cclxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcclxuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XHJcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcclxuICAgIDogIWJ1c3kgJiYgbW9kYWxFcnJvclxyXG4gICAgICA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKVxyXG4gICAgICA6IG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xyXG4gICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdm9pZCBoYW5kbGVNb2RhbENvbmZpcm0oKTtcclxuICB9LCBbYnVzeSwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm0sIG1vZGFsRXJyb3JdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG1vZGFsLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgICBtb2RhbExvYWRpbmdUZXh0LFxyXG4gICAgbW9kYWxDYW5jZWxUZXh0LFxyXG4gICAgbW9kYWxDb25maXJtVGV4dCxcclxuICAgIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBSZWZPYmplY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHtcclxuICBhcHBlbmRFeHBlbnNlVGlja2V0UmV0dXJuUXVlcnksXHJcbiAgYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwsXHJcbiAgdHlwZSBFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9uc0FyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIGZpbGVJZDogc3RyaW5nO1xuICBjb250ZXh0U2hlZXRJZDogc3RyaW5nO1xuICBpc0Zyb21FeHBlbnNlTGluZTogYm9vbGVhbjtcbiAgaXNGcm9tU2hlZXRMaW5rOiBib29sZWFuO1xuICBoZWFkZXJFeHBlbnNlU2hlZXRJZDogc3RyaW5nO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGNhbk9wZW5TYXZlQ29uZmlybTogKCkgPT4gYm9vbGVhbjtcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICBsaW5lQ29udGFpbmVyUmVmOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcbiAgb3BlblByZXZpZXc6ICgpID0+IFByb21pc2U8dm9pZD47XG4gIHRpY2tldFJldHVybkNvbnRleHQ/OiBFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCB8IG51bGw7XG59O1xyXG5cclxuLy8gR3JvdXBzIHRpY2tldCBkZXRhaWwgbmF2aWdhdGlvbiBhbmQgbGluZS1jYXJkIGludGVyYWN0aW9ucyBiZWhpbmQgc3RhYmxlIGNhbGxiYWNrcy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMgPSAoe1xuICBidXN5LFxuICBmaWxlSWQsXG4gIGNvbnRleHRTaGVldElkLFxuICBpc0Zyb21FeHBlbnNlTGluZSxcbiAgaXNGcm9tU2hlZXRMaW5rLFxuICBoZWFkZXJFeHBlbnNlU2hlZXRJZCxcbiAgaXNFZGl0aW5nLFxuICBjYW5PcGVuU2F2ZUNvbmZpcm0sXG4gIGhhbmRsZVVwZGF0ZSxcbiAgbGluZUNvbnRhaW5lclJlZixcbiAgb3BlblByZXZpZXcsXG4gIHRpY2tldFJldHVybkNvbnRleHQsXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsSW50ZXJhY3Rpb25zQXJncykgPT4ge1xuICBjb25zdCBvcGVuTGluZURldGFpbCA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChyYXdMaW5lUmVjSWQ6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKGlzRnJvbUV4cGVuc2VMaW5lIHx8IGlzRnJvbVNoZWV0TGluaykgcmV0dXJuO1xuICAgICAgaWYgKGJ1c3kpIHJldHVybjtcbiAgICAgIGNvbnN0IGxpbmVSZWNJZCA9IHNhZmVUZXh0KHJhd0xpbmVSZWNJZCk7XG4gICAgICBpZiAoIWxpbmVSZWNJZCB8fCAhZmlsZUlkKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHNob3VsZE9wZW5JbkVkaXRNb2RlID0gaXNFZGl0aW5nO1xuICAgICAgaWYgKHNob3VsZE9wZW5JbkVkaXRNb2RlKSB7XG4gICAgICAgIGlmICghY2FuT3BlblNhdmVDb25maXJtKCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1cGRhdGVPayA9IGF3YWl0IGhhbmRsZVVwZGF0ZSgpO1xuICAgICAgICBpZiAoIXVwZGF0ZU9rKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XG4gICAgICAgIGZpbGVJZCxcbiAgICAgICAgbGluZVJlY0lkLFxuICAgICAgfSk7XG4gICAgICBpZiAoc2hvdWxkT3BlbkluRWRpdE1vZGUpIHtcbiAgICAgICAgcXVlcnkuc2V0KFwibW9kZVwiLCBcImVkaXRcIik7XG4gICAgICB9XG4gICAgICBhcHBlbmRFeHBlbnNlVGlja2V0UmV0dXJuUXVlcnkocXVlcnksIHRpY2tldFJldHVybkNvbnRleHQpO1xuXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXRMaW5lRGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgICAgIGJ5cGFzc0d1YXJkT25jZTogc2hvdWxkT3BlbkluRWRpdE1vZGUsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtidXN5LCBjYW5PcGVuU2F2ZUNvbmZpcm0sIGZpbGVJZCwgaGFuZGxlVXBkYXRlLCBpc0VkaXRpbmcsIGlzRnJvbUV4cGVuc2VMaW5lLCBpc0Zyb21TaGVldExpbmssIHRpY2tldFJldHVybkNvbnRleHRdXG4gICk7XG5cclxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcclxuICAgICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xyXG4gICAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xyXG4gICAgICBpZiAoIWxpbmVDb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xyXG4gICAgICByZXR1cm4gY2FyZDtcclxuICAgIH0sXHJcbiAgICBbbGluZUNvbnRhaW5lclJlZl1cclxuICApO1xyXG5cclxuICBjb25zdCBvcGVuRmlsZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHZvaWQgb3BlblByZXZpZXcoKTtcclxuICB9LCBbb3BlblByZXZpZXddKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChpc0Zyb21TaGVldExpbmspIHJldHVybjtcclxuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQodGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCB8fCBoZWFkZXJFeHBlbnNlU2hlZXRJZCB8fCBjb250ZXh0U2hlZXRJZCk7XHJcbiAgICBpZiAoIXNhZmVTaGVldElkKSByZXR1cm47XHJcblxyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwoc2FmZVNoZWV0SWQpLCB7XHJcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxyXG4gICAgfSk7XHJcbiAgfSwgW2NvbnRleHRTaGVldElkLCBoZWFkZXJFeHBlbnNlU2hlZXRJZCwgaXNFZGl0aW5nLCBpc0Zyb21TaGVldExpbmssIHRpY2tldFJldHVybkNvbnRleHRdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG9wZW5MaW5lRGV0YWlsLFxyXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXHJcbiAgICBvcGVuRmlsZSxcclxuICAgIGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG5jb25zdCBJTUFHRV9FWFRFTlNJT05TID0gbmV3IFNldDxzdHJpbmc+KFtcImpwZ1wiLCBcImpwZWdcIiwgXCJwbmdcIiwgXCJ3ZWJwXCIsIFwiZ2lmXCIsIFwiYm1wXCIsIFwiaGVpY1wiLCBcImhlaWZcIiwgXCJhdmlmXCJdKTtcclxuXHJcbmNvbnN0IGdldEZpbGVFeHRlbnNpb25Gcm9tUGF0aCA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBzb3VyY2UgPSBzYWZlVGV4dCh2YWx1ZSkudG9Mb3dlckNhc2UoKTtcclxuICBpZiAoIXNvdXJjZSkgcmV0dXJuIFwiXCI7XHJcblxyXG4gIGNvbnN0IHdpdGhvdXRRdWVyeSA9IHNvdXJjZS5zcGxpdChcIj9cIilbMF0uc3BsaXQoXCIjXCIpWzBdO1xyXG4gIGNvbnN0IHBhcnRzID0gd2l0aG91dFF1ZXJ5LnNwbGl0KFwiLlwiKTtcclxuICBpZiAocGFydHMubGVuZ3RoIDwgMikgcmV0dXJuIFwiXCI7XHJcblxyXG4gIGNvbnN0IHJhd0V4dCA9IHNhZmVUZXh0KHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdKS5yZXBsYWNlKC9bXmEtejAtOV0vZywgXCJcIik7XHJcbiAgcmV0dXJuIHJhd0V4dCA9PT0gXCJqcGVnXCIgPyBcImpwZ1wiIDogcmF3RXh0O1xyXG59O1xyXG5cclxuLy8gRGV0ZWN0cyB3aGV0aGVyIG9uZSB0aWNrZXQgc291cmNlIGNhbiByZW5kZXIgYXMgYW4gaW5saW5lIGltYWdlIHByZXZpZXcuXHJcbmV4cG9ydCBjb25zdCBoYXNFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3U291cmNlID0gKHVybFZhbHVlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkVXJsID0gc2FmZVRleHQodXJsVmFsdWUpO1xyXG4gIGlmICghbm9ybWFsaXplZFVybCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBpZiAobm9ybWFsaXplZFVybC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoXCJkYXRhOmltYWdlL1wiKSkgcmV0dXJuIHRydWU7XHJcblxyXG4gIGNvbnN0IGV4dGVuc2lvbiA9IGdldEZpbGVFeHRlbnNpb25Gcm9tUGF0aChub3JtYWxpemVkVXJsKTtcclxuICBpZiAoZXh0ZW5zaW9uICYmIElNQUdFX0VYVEVOU0lPTlMuaGFzKGV4dGVuc2lvbikpIHJldHVybiB0cnVlO1xyXG5cclxuICBjb25zdCBub3JtYWxpemVkTG93ZXIgPSBub3JtYWxpemVkVXJsLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKG5vcm1hbGl6ZWRMb3dlci5pbmNsdWRlcyhcImJsb2IuY29yZS53aW5kb3dzLm5ldFwiKSAmJiBub3JtYWxpemVkTG93ZXIuaW5jbHVkZXMoXCJpbWFnZVwiKSkgcmV0dXJuIHRydWU7XHJcblxyXG4gIHJldHVybiBmYWxzZTtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCBTaW5nbGVEYXRlUGlja2VyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2luZ2xlRGF0ZVBpY2tlci50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB9IGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgaGFzRXhwZW5zZVRpY2tldEltYWdlUHJldmlld1NvdXJjZSB9IGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0UHJldmlld1V0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VSZWFkT25seUZpZWxkIGZyb20gXCIuL0V4cGVuc2VSZWFkT25seUZpZWxkLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdC50c3hcIjtcclxuXHJcbmNvbnN0IGhhc1JlYWxFeHBlbnNlU2hlZXRWYWx1ZSA9ICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHNhZmVUZXh0KHZhbHVlKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIGZhbHNlO1xyXG4gIGlmIChub3JtYWxpemVkID09PSBcIi1cIiB8fCBub3JtYWxpemVkID09PSBcIjBcIikgcmV0dXJuIGZhbHNlO1xyXG4gIGlmIChub3JtYWxpemVkID09PSBcIm4vYVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwibmFcIikgcmV0dXJuIGZhbHNlO1xyXG4gIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybVByb3BzID0ge1xyXG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlcjtcclxuICBzdGF0dXNMYWJlbDogc3RyaW5nO1xyXG4gIGdhc3RvVHlwZUxhYmVsOiBzdHJpbmc7XHJcbiAgdG90YWxBbW91bnRUZXh0OiBzdHJpbmc7XHJcbiAgdHJhbnNEYXRlVGV4dDogc3RyaW5nO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgZ2FzdG9UeXBlT3B0aW9uczogQXJyYXk8eyB2YWx1ZTogc3RyaW5nOyB0ZXh0OiBzdHJpbmcgfT47XG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcbiAgZGVzY3JpcHRpb25JbnZhbGlkOiBib29sZWFuO1xuICBkZXNjcmlwdGlvbklucHV0UmVmOiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XG4gIGRyYWZ0R2FzdG9UeXBlOiBzdHJpbmc7XG4gIGdhc3RvVHlwZUludmFsaWQ6IGJvb2xlYW47XG4gIGdhc3RvVHlwZUlucHV0UmVmOiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZDogYm9vbGVhbjtcclxuICBjdXJyZW5jeUlucHV0UmVmOiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgZHJhZnRUcmFuc0RhdGU6IHN0cmluZztcclxuICBkcmFmdFVybEZpbGU6IHN0cmluZztcclxuICBkcmFmdEZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbk9wZW5GaWxlOiAoKSA9PiB2b2lkO1xyXG4gIG9uT3BlbkV4cGVuc2VTaGVldD86ICgpID0+IHZvaWQ7XHJcbiAgaGlkZU9wZW5GaWxlQWN0aW9uPzogYm9vbGVhbjtcclxufTtcclxuXHJcbi8vIFJlYWQtb25seSBhbmQgZWRpdGFibGUgaGVhZGVyIGZvcm0gZm9yIHRpY2tldCBkZXRhaWwuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtID0gKHtcclxuICBoZWFkZXIsXHJcbiAgc3RhdHVzTGFiZWwsXHJcbiAgZ2FzdG9UeXBlTGFiZWwsXHJcbiAgdG90YWxBbW91bnRUZXh0LFxyXG4gIHRyYW5zRGF0ZVRleHQsXHJcbiAgaXNFZGl0aW5nLFxuICBnYXN0b1R5cGVPcHRpb25zLFxuICBkcmFmdERlc2NyaXB0aW9uLFxuICBkZXNjcmlwdGlvbkludmFsaWQsXG4gIGRlc2NyaXB0aW9uSW5wdXRSZWYsXG4gIGRyYWZ0R2FzdG9UeXBlLFxuICBnYXN0b1R5cGVJbnZhbGlkLFxuICBnYXN0b1R5cGVJbnB1dFJlZixcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICBjdXJyZW5jeUlucHV0UmVmLFxyXG4gIGRyYWZ0VHJhbnNEYXRlLFxyXG4gIGRyYWZ0VXJsRmlsZSxcclxuICBkcmFmdEZpbGVOYW1lLFxyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZSxcclxuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlLFxyXG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2UsXHJcbiAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZSxcclxuICBvbk9wZW5GaWxlLFxyXG4gIG9uT3BlbkV4cGVuc2VTaGVldCxcclxuICBoaWRlT3BlbkZpbGVBY3Rpb24gPSBmYWxzZSxcclxufTogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm1Qcm9wcykgPT4ge1xyXG4gIGNvbnN0IHByZXZpZXdVcmwgPSBzYWZlVGV4dChpc0VkaXRpbmcgPyBkcmFmdFVybEZpbGUgOiBoZWFkZXIudXJsRmlsZSk7XHJcbiAgY29uc3QgY2FuT3BlbkZpbGUgPSBoYXNFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3U291cmNlKHByZXZpZXdVcmwpO1xyXG4gIGNvbnN0IHNob3dFeHBlbnNlU2hlZXRGaWVsZCA9IGhhc1JlYWxFeHBlbnNlU2hlZXRWYWx1ZShoZWFkZXIuaG9qYUdhc3Rvc0lkRGlzcGxheSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cclxuICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIil9XHJcbiAgICAgICAgICB2YWx1ZT17aGVhZGVyLmZpbGVJZCB8fCBcIi1cIn1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XHJcbiAgICAgICAgICB2YWx1ZT17c3RhdHVzTGFiZWwgfHwgXCItXCJ9XHJcbiAgICAgICAgLz5cclxuXHJcbiAgICAgICAge2lzRWRpdGluZyA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfTwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgcmVmPXtkZXNjcmlwdGlvbklucHV0UmVmfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb3JtLWNvbnRyb2wke2Rlc2NyaXB0aW9uSW52YWxpZCA/IFwiIGJvcmRlci1yb3NlLTQwMCBiZy1yb3NlLTUwIGZvY3VzOmJvcmRlci1yb3NlLTQwMCBmb2N1czpyaW5nLXJvc2UtMjAwXCIgOiBcIlwifWB9XG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdERlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxuICAgICAgICAgICAgICBhcmlhLWludmFsaWQ9e2Rlc2NyaXB0aW9uSW52YWxpZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwifVxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2hlYWRlci5kZXNjcmlwdGlvbiB8fCBcIi1cIn1cclxuICAgICAgICAgICAgZnVsbFdpZHRoXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcblxyXG4gICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxyXG4gICAgICAgICAgICBvcHRpb25zPXtnYXN0b1R5cGVPcHRpb25zfVxyXG4gICAgICAgICAgICB2YWx1ZT17ZHJhZnRHYXN0b1R5cGV9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIil9XHJcbiAgICAgICAgICAgIGlucHV0UmVmPXtnYXN0b1R5cGVJbnB1dFJlZn1cclxuICAgICAgICAgICAgaW52YWxpZD17Z2FzdG9UeXBlSW52YWxpZH1cclxuICAgICAgICAgICAgdXNlUG9ydGFsXHJcbiAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cclxuICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17Z2FzdG9UeXBlTGFiZWwgfHwgXCItXCJ9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcblxyXG4gICAgICAgIHtzaG93RXhwZW5zZVNoZWV0RmllbGQgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX0V4cGVuc2VTaGVldERpc3BsYXlcIiwgXCJFeHBlbnNlIHNoZWV0XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17aGVhZGVyLmhvamFHYXN0b3NJZERpc3BsYXkgfHwgXCItXCJ9XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uT3BlbkV4cGVuc2VTaGVldH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cclxuICAgICAgICAgICAgaW52YWxpZD17Y3VycmVuY3lDb2RlSW52YWxpZH1cclxuICAgICAgICAgICAgaW5wdXRSZWY9e2N1cnJlbmN5SW5wdXRSZWZ9XHJcbiAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtdGlja2V0LWRldGFpbC1jdXJyZW5jeVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtoZWFkZXIuY3VycmVuY3lDb2RlIHx8IFwiLVwifVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApfVxyXG5cclxuICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Ub3RhbEFtb3VudFwiLCBcIlRvdGFsIGFtb3VudFwiKX1cclxuICAgICAgICAgIHZhbHVlPXt0b3RhbEFtb3VudFRleHQgfHwgXCItXCJ9XHJcbiAgICAgICAgLz5cclxuXHJcbiAgICAgICAge2lzRWRpdGluZyA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlzaXRhLWZpZWxkLXRleHRcIj5cclxuICAgICAgICAgICAgPFNpbmdsZURhdGVQaWNrZXJcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3JlYXRlZERhdGVcIiwgXCJEYXRlXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFRyYW5zRGF0ZX1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdFRyYW5zRGF0ZUNoYW5nZX1cclxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DcmVhdGVkRGF0ZVwiLCBcIkRhdGVcIil9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e3RyYW5zRGF0ZVRleHQgfHwgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGhlYWRlci50cmFuc0RhdGUsIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiKSB8fCBcIi1cIn1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge2Nhbk9wZW5GaWxlICYmICFoaWRlT3BlbkZpbGVBY3Rpb24gPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktZW5kXCI+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCJcclxuICAgICAgICAgICAgb25DbGljaz17b25PcGVuRmlsZX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge2luZFQoXCJUaWNrZXRzX0RldGFpbF9WaWV3QXR0YWNobWVudFwiLCBcIlZlciBhZGp1bnRvXCIpfVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VEYXRlUGFydHMgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VOdW1iZXIgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVNlY3Rpb25EaXZpZGVyIGZyb20gXCIuL0V4cGVuc2VTZWN0aW9uRGl2aWRlci50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4vRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcclxuXHJcbnR5cGUgUGFnaW5hdGlvbkxhYmVscyA9IHtcclxuICBmaXJzdDogc3RyaW5nO1xyXG4gIHByZXY6IHN0cmluZztcclxuICBuZXh0OiBzdHJpbmc7XHJcbiAgbGFzdDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0TGluZXNMaXN0UHJvcHMgPSB7XHJcbiAgdmlzaWJsZUxpbmVzOiBFeHBlbnNlVGlja2V0RGV0YWlsTGluZVtdO1xyXG4gIHRvdGFsTGluZVBhZ2VzOiBudW1iZXI7XHJcbiAgbGluZVBhZ2U6IG51bWJlcjtcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBwYWdpbmF0aW9uTGFiZWxzOiBQYWdpbmF0aW9uTGFiZWxzO1xyXG4gIGNvbnRhaW5lclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgb25MaW5lUGFnZUNoYW5nZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcclxuICBvbk9wZW5MaW5lOiAobGluZVJlY0lkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXRRdHlWYWx1ZSA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VOdW1iZXIodmFsdWUsIHtcclxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgZmFsbGJhY2s6IFwiLVwiLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgRU1QVFlfREFURV9QQVJUUzogRXhwZW5zZURhdGVQYXJ0cyA9IHtcclxuICB5ZWFyOiBcIi0tXCIsXHJcbiAgbW9udGg6IFwiLS1cIixcclxuICBkYXk6IFwiLS1cIixcclxufTtcclxuXHJcbmNvbnN0IFRJQ0tFVF9MSU5FX0RBVEVfUEFORUxfSUNPTiA9IChcclxuICA8c3ZnXHJcbiAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxyXG4gICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgIHN0cm9rZVdpZHRoPVwiMVwiXHJcbiAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxyXG4gICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXHJcbiAgICBjbGFzc05hbWU9XCJoLTEwIHctMTAgdGV4dC1zbGF0ZS01MDBcIlxyXG4gICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICA+XHJcbiAgICA8cGF0aCBzdHJva2U9XCJub25lXCIgZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTE0IDN2NGExIDEgMCAwIDAgMSAxaDRcIiAvPlxyXG4gICAgPHBhdGggZD1cIk0xNyAyMWgtMTBhMiAyIDAgMCAxIC0yIC0ydi0xNGEyIDIgMCAwIDEgMiAtMmg3bDUgNXYxMWEyIDIgMCAwIDEgLTIgMlwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTkgN2wxIDBcIiAvPlxyXG4gICAgPHBhdGggZD1cIk05IDEzbDYgMFwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTEzIDE3bDIgMFwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG4vLyBUaWNrZXQgbGluZXMgc2VjdGlvbiByZW5kZXJlZCB3aXRoIHRpbWVsaW5lIGNhcmRzIGFuZCBwYWdpbmcgY29udHJvbHMuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5lc0xpc3QgPSAoe1xyXG4gIHZpc2libGVMaW5lcyxcclxuICB0b3RhbExpbmVQYWdlcyxcclxuICBsaW5lUGFnZSxcclxuICBjdXJyZW5jeUNvZGUsXHJcbiAgcGFnaW5hdGlvbkxhYmVscyxcclxuICBjb250YWluZXJSZWYsXHJcbiAgb25MaW5lUGFnZUNoYW5nZSxcclxuICBvbk9wZW5MaW5lLFxyXG59OiBFeHBlbnNlVGlja2V0TGluZXNMaXN0UHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic3BhY2UteS0wXCI+XHJcbiAgICAgIDxFeHBlbnNlU2VjdGlvbkRpdmlkZXIgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0RldGFpbF9MaW5lc1wiLCBcIkxpbmVzXCIpfSBjbGFzc05hbWU9XCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlci0tc3BhY2VkXCIgLz5cclxuXHJcbiAgICAgIHt2aXNpYmxlTGluZXMubGVuZ3RoID09PSAwID8gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtYm94IHRpbWVsaW5lLWVtcHR5XCIgZGF0YS1lbXB0eS10ZXh0PXtpbmRUKFwiVGlja2V0c19EZXRhaWxfTm9MaW5lc1wiLCBcIk5vIGxpbmVzIGZvciB0aGlzIHRpY2tldC5cIil9IC8+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgPGRpdiByZWY9e2NvbnRhaW5lclJlZn0gY2xhc3NOYW1lPVwidGltZWxpbmUtYm94XCI+XHJcbiAgICAgICAgICB7dmlzaWJsZUxpbmVzLm1hcCgobGluZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBhbW91bnRUZXh0ID0gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGxpbmUudG90YWxBbW91bnQsIGN1cnJlbmN5Q29kZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHF0eVRleHQgPSBmb3JtYXRRdHlWYWx1ZShsaW5lLnF0eSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHByaWNlVGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShsaW5lLnByaWNlLCBjdXJyZW5jeUNvZGUpO1xyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGxpbmUuZGVzY3JpcHRpb24gfHwgbGluZS5yZWNJZCB8fCBcIi1cIjtcclxuICAgICAgICAgICAgY29uc3Qgc3VidGl0bGUgPSBgJHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9RdHlcIiwgXCJRdWFudGl0eVwiKX06ICR7cXR5VGV4dH0gICAke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1ByaWNlXCIsIFwiUHJpY2VcIil9OiAke3ByaWNlVGV4dH1gO1xyXG4gICAgICAgICAgICBjb25zdCBsaW5lS2V5ID1cclxuICAgICAgICAgICAgICBTdHJpbmcobGluZS5yZWNJZCB8fCBcIlwiKS50cmltKCkgfHxcclxuICAgICAgICAgICAgICBbbGluZS5kZXNjcmlwdGlvbiwgbGluZS50b3RhbEFtb3VudCwgbGluZS5wcmljZSwgbGluZS5xdHldLm1hcCgodmFsdWUpID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkpLmpvaW4oXCJ8XCIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8ZGl2IGtleT17bGluZUtleX0gY2xhc3NOYW1lPVwidGltZWxpbmUtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgPEV4cGVuc2VUaW1lbGluZUNhcmRcclxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtFTVBUWV9EQVRFX1BBUlRTfVxyXG4gICAgICAgICAgICAgICAgICBkYXRlUGFuZWxDb250ZW50PXtUSUNLRVRfTElORV9EQVRFX1BBTkVMX0lDT059XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cclxuICAgICAgICAgICAgICAgICAgc3VidGl0bGU9e3N1YnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZUNsYXNzTmFtZT1cImV4cGVuc2Utc2hlZXQtY2FyZF9fc3VidGl0bGUgZXhwZW5zZS1saW5lLWNhcmRfX21ldGEgdGV4dC1sZWZ0XCJcclxuICAgICAgICAgICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cclxuICAgICAgICAgICAgICAgICAgb25PcGVuPXsoKSA9PiBvbk9wZW5MaW5lKGxpbmUucmVjSWQpfVxyXG4gICAgICAgICAgICAgICAgICB0aXRsZUNsYXNzTmFtZT1cInRpbWVsaW5lLW5hbWUgZXhwZW5zZS1saW5lLWNhcmRfX3RpdGxlIHRleHQtbGVmdFwiXHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICA8Q29tcGFjdFBhZ2luYXRpb25cclxuICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbExpbmVQYWdlc31cclxuICAgICAgICBjdXJyZW50UGFnZT17bGluZVBhZ2V9XHJcbiAgICAgICAgb25QYWdlQ2hhbmdlPXtvbkxpbmVQYWdlQ2hhbmdlfVxyXG4gICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cclxuICAgICAgLz5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldExpbmVzTGlzdDtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBUaWNrZXRQcmV2aWV3UG9pbnQgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWxQcm9wcyA9IHtcclxuICBvcGVuOiBib29sZWFuO1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgZXJyb3I6IHN0cmluZztcclxuICBpbWFnZVVybDogc3RyaW5nO1xyXG4gIGltYWdlQWx0OiBzdHJpbmc7XHJcbiAgc2NhbGU6IG51bWJlcjtcclxuICB0cmFuc2xhdGU6IFRpY2tldFByZXZpZXdQb2ludDtcclxuICBzdXJmYWNlUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xyXG4gIG9uUG9pbnRlckRvd246IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICBvblBvaW50ZXJNb3ZlOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgb25Qb2ludGVyRW5kOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgb25XaGVlbDogKGV2ZW50OiBSZWFjdC5XaGVlbEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIFJlbmRlcnMgdGhlIHRpY2tldCBpbWFnZSBwcmV2aWV3IG92ZXJsYXkgd2l0aCB6b29tIGFuZCBwYW4gZ2VzdHVyZXMuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWwgPSAoe1xyXG4gIG9wZW4sXHJcbiAgYnVzeSxcclxuICBlcnJvcixcclxuICBpbWFnZVVybCxcclxuICBpbWFnZUFsdCxcclxuICBzY2FsZSxcclxuICB0cmFuc2xhdGUsXHJcbiAgc3VyZmFjZVJlZixcclxuICBvbkNsb3NlLFxyXG4gIG9uUG9pbnRlckRvd24sXHJcbiAgb25Qb2ludGVyTW92ZSxcclxuICBvblBvaW50ZXJFbmQsXHJcbiAgb25XaGVlbCxcclxufTogRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbFByb3BzKSA9PiB7XHJcbiAgaWYgKCFvcGVuKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgcmV0dXJuIGNyZWF0ZVBvcnRhbChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTYwMDAwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBvdmVyc2Nyb2xsLWNvbnRhaW4gYmctc2xhdGUtOTUwLzQ1IHB4LTQgcHktNiBiYWNrZHJvcC1ibHVyLW1kXCI+XHJcbiAgICAgIDxidXR0b25cclxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0Nsb3NlXCIsIFwiQ2xvc2VcIil9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMFwiXHJcbiAgICAgICAgb25DbGljaz17b25DbG9zZX1cclxuICAgICAgLz5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fQ2xvc2VcIiwgXCJDbG9zZVwiKX1cclxuICAgICAgICBjbGFzc05hbWU9XCJmaXhlZCByaWdodC00IHRvcC1bY2FsYygxcmVtK2VudihzYWZlLWFyZWEtaW5zZXQtdG9wLDBweCkpXSB6LVs2MDAwMjBdIGlubGluZS1mbGV4IGgtMTAgdy0xMCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAvNjAgYmctc2xhdGUtOTAwLzc4IHRleHQtc2xhdGUtMTAwIHNoYWRvdy1sZyB0cmFuc2l0aW9uIGhvdmVyOmJnLXNsYXRlLTkwMC84OCBmb2N1cy12aXNpYmxlOm91dGxpbmUtaGlkZGVuIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy1zbGF0ZS0yMDAvODBcIlxuICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxyXG4gICAgICA+XHJcbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICBkPVwiTTYgNkwxOCAxOE0xOCA2TDYgMThcIlxyXG4gICAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuNzVcIlxyXG4gICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxyXG4gICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IG1heC1oLVs5MnZoXSBtYXgtdy1bOTJ2d10gaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG92ZXJzY3JvbGwtY29udGFpblwiPlxyXG4gICAgICAgIHtidXN5ID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtMTAwXCI+XHJcbiAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XHJcbiAgICAgICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiBlcnJvciA/IChcclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1yb3NlLTIwMFwiPntlcnJvcn08L3A+XHJcbiAgICAgICAgKSA6IGltYWdlVXJsID8gKFxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICByZWY9e3N1cmZhY2VSZWZ9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIG1heC1oLVs5MHZoXSBtYXgtdy1bOTJ2d10gb3ZlcmZsb3ctaGlkZGVuIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIHRvdWNoLW5vbmUgb3ZlcnNjcm9sbC1jb250YWluXCJcbiAgICAgICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxyXG4gICAgICAgICAgICBzdHlsZT17eyB0b3VjaEFjdGlvbjogXCJub25lXCIgfX1cclxuICAgICAgICAgICAgb25Qb2ludGVyRG93bj17b25Qb2ludGVyRG93bn1cclxuICAgICAgICAgICAgb25Qb2ludGVyTW92ZT17b25Qb2ludGVyTW92ZX1cclxuICAgICAgICAgICAgb25Qb2ludGVyVXA9e29uUG9pbnRlckVuZH1cclxuICAgICAgICAgICAgb25Qb2ludGVyQ2FuY2VsPXtvblBvaW50ZXJFbmR9XHJcbiAgICAgICAgICAgIG9uV2hlZWw9e29uV2hlZWx9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICBzcmM9e2ltYWdlVXJsfVxyXG4gICAgICAgICAgICAgIGFsdD17aW1hZ2VBbHQgfHwgaW5kVChcIlRpY2tldHNfRmllbGRfRmlsZUlkXCIsIFwiVGlja2V0XCIpfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInBvaW50ZXItZXZlbnRzLW5vbmUgbWF4LWgtWzkwdmhdIHctYXV0byBtYXgtdy1bOTJ2d10gc2VsZWN0LW5vbmUgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gb2JqZWN0LWNvbnRhaW4gc2hhZG93LTJ4bFwiXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgke3RyYW5zbGF0ZS54fXB4LCAke3RyYW5zbGF0ZS55fXB4LCAwKSBzY2FsZSgke3NjYWxlfSlgLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiBcImNlbnRlciBjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IHNjYWxlIDw9IDEgPyBcInRyYW5zZm9ybSAxNDBtcyBlYXNlLW91dFwiIDogXCJub25lXCIsXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICBkcmFnZ2FibGU9e2ZhbHNlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1zbGF0ZS0xMDBcIj57aW5kVChcIkNvbW1vbl9Ob3RBdmFpbGFibGVcIiwgXCJOL0FcIil9PC9wPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+LFxyXG4gICAgZG9jdW1lbnQuYm9keVxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0UHJldmlld01vZGFsO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXdQcm9wcyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIGVycm9yOiBzdHJpbmc7XHJcbiAgaW1hZ2VVcmw6IHN0cmluZztcclxuICBpbWFnZUFsdDogc3RyaW5nO1xyXG4gIGZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgb25PcGVuOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyBvbmUgY29tcGFjdCB0aWNrZXQgcHJldmlldyB0aGF0IHN0YXlzIHZpc2libGUgd2hpbGUgZGV0YWlsIGNvbnRlbnQgc2Nyb2xscy5cclxuY29uc3QgRXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXcgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgZXJyb3IsXHJcbiAgaW1hZ2VVcmwsXHJcbiAgaW1hZ2VBbHQsXHJcbiAgZmlsZU5hbWUsXHJcbiAgb25PcGVuLFxyXG59OiBFeHBlbnNlVGlja2V0U3RpY2t5UHJldmlld1Byb3BzKSA9PiB7XHJcbiAgY29uc3QgcHJldmlld0xhYmVsID0gaW5kVChcIlRpY2tldHNfRGV0YWlsX1ZpZXdBdHRhY2htZW50XCIsIFwiVmVyIGFkanVudG9cIik7XHJcbiAgY29uc3QgdGlja2V0TGFiZWwgPSBpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIik7XHJcbiAgY29uc3Qgc2FmZUZpbGVOYW1lID0gc2FmZVRleHQoZmlsZU5hbWUpIHx8IHNhZmVUZXh0KGltYWdlQWx0KSB8fCB0aWNrZXRMYWJlbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3RpY2t5IHRvcC1bNzJweF0gei1bMTgwMF0gbGc6dG9wLTIwXCI+XHJcbiAgICAgIDxidXR0b25cclxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICBjbGFzc05hbWU9XCJncm91cCBibG9jayB3LWZ1bGwgdG91Y2gtbWFuaXB1bGF0aW9uIHRleHQtbGVmdCBmb2N1cy12aXNpYmxlOm91dGxpbmUtaGlkZGVuIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy1wcmltYXJ5LzM1IGZvY3VzLXZpc2libGU6cmluZy1vZmZzZXQtMlwiXHJcbiAgICAgICAgYXJpYS1sYWJlbD17YCR7cHJldmlld0xhYmVsfTogJHtzYWZlRmlsZU5hbWV9YH1cclxuICAgICAgICBvbkNsaWNrPXtvbk9wZW59XHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm92ZXJmbG93LWhpZGRlbiByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZSBzaGFkb3cteHMgdHJhbnNpdGlvbi1bdHJhbnNmb3JtLGJveC1zaGFkb3csYm9yZGVyLWNvbG9yXSBkdXJhdGlvbi0yMDAgZ3JvdXAtaG92ZXI6LXRyYW5zbGF0ZS15LVsxcHhdIGdyb3VwLWhvdmVyOmJvcmRlci1wcmltYXJ5LzI1IGdyb3VwLWhvdmVyOnNoYWRvdy1tZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgaC0zNiBvdmVyZmxvdy1oaWRkZW4gYmctbGluZWFyLXRvLWJyIGZyb20tc2xhdGUtMTAwIHZpYS13aGl0ZSB0by1zbGF0ZS0yMDAgc206aC00MCBsZzpoLVszODBweF1cIj5cclxuICAgICAgICAgICAge2ltYWdlVXJsID8gKFxyXG4gICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgIHNyYz17aW1hZ2VVcmx9XHJcbiAgICAgICAgICAgICAgICBhbHQ9e2ltYWdlQWx0IHx8IHRpY2tldExhYmVsfVxyXG4gICAgICAgICAgICAgICAgd2lkdGg9ezY0MH1cclxuICAgICAgICAgICAgICAgIGhlaWdodD17OTYwfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC1mdWxsIHctZnVsbCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBvYmplY3QtY292ZXIgb2JqZWN0LWNlbnRlciB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0zMDAgZ3JvdXAtaG92ZXI6c2NhbGUtWzEuMDE1XSBsZzpvYmplY3QtY29udGFpbiBsZzpvYmplY3QtY2VudGVyIGxnOnAtM1wiXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGgtZnVsbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcHgtNFwiPlxyXG4gICAgICAgICAgICAgICAge2J1c3kgPyAoXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggbWluLXctMCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1zbGF0ZS03MDBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaC0xMSB3LTExIHNocmluay0wIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBiZy1wcmltYXJ5LzggdGV4dC1wcmltYXJ5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk03IDMuNzVoNi4yNUwxOC4yNSA4Ljc1VjE5LjVhLjc1Ljc1IDAgMCAxLS43NS43NUg3YS43NS43NSAwIDAgMS0uNzUtLjc1di0xNUEuNzUuNzUgMCAwIDEgNyAzLjc1WlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuNVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTEzIDMuNzVWOC41aDQuNzVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi13LTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRydW5jYXRlIHRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTkwMFwiPntzYWZlRmlsZU5hbWV9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibGluZS1jbGFtcC0yIHRleHQteHMgdGV4dC1zbGF0ZS01MDBcIj57ZXJyb3IgfHwgcHJldmlld0xhYmVsfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb2ludGVyLWV2ZW50cy1ub25lIGFic29sdXRlIGluc2V0LXgtMCB0b3AtMCBoLTE2IGJnLWxpbmVhci10by1iIGZyb20tc2xhdGUtOTUwLzI2IHZpYS1zbGF0ZS05MDAvOCB0by10cmFuc3BhcmVudCBsZzpoLTIwXCIgLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb2ludGVyLWV2ZW50cy1ub25lIGFic29sdXRlIHJpZ2h0LTMgdG9wLTMgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJnLXByaW1hcnkvOTIgcHgtMyBweS0xLjUgdGV4dC1bMTFweF0gZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImgtMy41IHctMy41XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgICAgICBkPVwiTTE1IDNoNnY2TTIxIDNsLTcgN005IDIxSDN2LTZNMyAyMWw3LTdcIlxyXG4gICAgICAgICAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuNVwiXHJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICB7cHJldmlld0xhYmVsfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0U3RpY2t5UHJldmlldztcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBSZWZPYmplY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tIFwiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybS50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXRMaW5lc0xpc3QgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmVzTGlzdC50c3hcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLCBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbCBmcm9tIFwiLi9FeHBlbnNlVGlja2V0UHJldmlld01vZGFsLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXcgZnJvbSBcIi4vRXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXcudHN4XCI7XHJcbmltcG9ydCB0eXBlIHsgVGlja2V0UHJldmlld1BvaW50IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldy50c1wiO1xyXG5cclxudHlwZSBQYWdpbmF0aW9uTGFiZWxzID0ge1xyXG4gIGZpcnN0OiBzdHJpbmc7XHJcbiAgcHJldjogc3RyaW5nO1xyXG4gIG5leHQ6IHN0cmluZztcclxuICBsYXN0OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3UHJvcHMgPSB7XHJcbiAgbW9kYWw6IHtcclxuICAgIG9wZW46IGJvb2xlYW47XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ6IHN0cmluZztcclxuICAgIGNhbmNlbFRleHQ6IHN0cmluZztcclxuICAgIGxvYWRpbmdUZXh0OiBzdHJpbmc7XHJcbiAgICBzaG93Q2FuY2VsOiBib29sZWFuO1xyXG4gICAgc2hvd0NvbmZpcm06IGJvb2xlYW47XHJcbiAgICBidXN5OiBib29sZWFuO1xyXG4gICAgZXJyb3I6IHN0cmluZztcclxuICAgIHN0YXR1czogc3RyaW5nO1xyXG4gICAgb25Db25maXJtOiAoKSA9PiB2b2lkO1xyXG4gICAgb25DYW5jZWw6ICgpID0+IHZvaWQ7XHJcbiAgfTtcclxuICBwcmV2aWV3OiB7XHJcbiAgICBvcGVuOiBib29sZWFuO1xyXG4gICAgYnVzeTogYm9vbGVhbjtcclxuICAgIGVycm9yOiBzdHJpbmc7XHJcbiAgICBpbWFnZVVybDogc3RyaW5nO1xyXG4gICAgaW1hZ2VBbHQ6IHN0cmluZztcclxuICAgIHNjYWxlOiBudW1iZXI7XHJcbiAgICB0cmFuc2xhdGU6IFRpY2tldFByZXZpZXdQb2ludDtcclxuICAgIHN1cmZhY2VSZWY6IFJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gICAgb25DbG9zZTogKCkgPT4gdm9pZDtcclxuICAgIG9uUG9pbnRlckRvd246IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICAgIG9uUG9pbnRlck1vdmU6IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICAgIG9uUG9pbnRlckVuZDogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gICAgb25XaGVlbDogKGV2ZW50OiBSZWFjdC5XaGVlbEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICB9O1xyXG4gIGNvbnRlbnQ6IHtcclxuICAgIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICAgIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbDtcclxuICAgIHNob3dTdGlja3lQcmV2aWV3OiBib29sZWFuO1xyXG4gICAgcHJldmlld0J1c3k6IGJvb2xlYW47XHJcbiAgICBwcmV2aWV3RXJyb3I6IHN0cmluZztcclxuICAgIHByZXZpZXdJbWFnZVVybDogc3RyaW5nO1xyXG4gICAgcHJldmlld0ZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgICBwcmV2aWV3QWx0VGV4dDogc3RyaW5nO1xyXG4gICAgb25PcGVuUHJldmlldzogKCkgPT4gdm9pZDtcclxuICAgIHN0YXR1c0xhYmVsOiBzdHJpbmc7XHJcbiAgICBnYXN0b1R5cGVMYWJlbDogc3RyaW5nO1xyXG4gICAgdG90YWxBbW91bnRUZXh0OiBzdHJpbmc7XHJcbiAgICB0cmFuc0RhdGVUZXh0OiBzdHJpbmc7XHJcbiAgICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gICAgZ2FzdG9UeXBlT3B0aW9uczogQXJyYXk8eyB2YWx1ZTogc3RyaW5nOyB0ZXh0OiBzdHJpbmcgfT47XG4gICAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uSW52YWxpZDogYm9vbGVhbjtcbiAgICBkZXNjcmlwdGlvbklucHV0UmVmOiBSZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xuICAgIGRyYWZ0R2FzdG9UeXBlOiBzdHJpbmc7XG4gICAgZ2FzdG9UeXBlSW52YWxpZDogYm9vbGVhbjtcbiAgICBnYXN0b1R5cGVJbnB1dFJlZjogUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcbiAgICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gICAgY3VycmVuY3lDb2RlSW52YWxpZDogYm9vbGVhbjtcclxuICAgIGN1cnJlbmN5SW5wdXRSZWY6IFJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gICAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XHJcbiAgICBkcmFmdEZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICAgIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgb25PcGVuRmlsZTogKCkgPT4gdm9pZDtcclxuICAgIG9uT3BlbkV4cGVuc2VTaGVldD86ICgpID0+IHZvaWQ7XHJcbiAgICB2aXNpYmxlTGluZXM6IEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lW107XHJcbiAgICB0b3RhbExpbmVQYWdlczogbnVtYmVyO1xyXG4gICAgbGluZVBhZ2U6IG51bWJlcjtcclxuICAgIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gICAgcGFnaW5hdGlvbkxhYmVsczogUGFnaW5hdGlvbkxhYmVscztcclxuICAgIGNvbnRhaW5lclJlZjogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgICBvbkxpbmVQYWdlQ2hhbmdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xyXG4gICAgb25PcGVuTGluZTogKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFJlbmRlcnMgdGhlIHRpY2tldCBkZXRhaWwgdmlldyB3aGlsZSB0aGUgcGFnZSBjb250YWluZXIgb3ducyBvcmNoZXN0cmF0aW9uLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0RGV0YWlsVmlldyA9ICh7IG1vZGFsLCBwcmV2aWV3LCBjb250ZW50IH06IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3UHJvcHMpID0+IHtcclxuICBjb25zdCBkZXRhaWxCb2R5ID0gKFxyXG4gICAgPD5cclxuICAgICAgPEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtXHJcbiAgICAgICAgaGVhZGVyPXtjb250ZW50LmhlYWRlcn1cclxuICAgICAgICBzdGF0dXNMYWJlbD17Y29udGVudC5zdGF0dXNMYWJlbH1cclxuICAgICAgICBnYXN0b1R5cGVMYWJlbD17Y29udGVudC5nYXN0b1R5cGVMYWJlbH1cclxuICAgICAgICB0b3RhbEFtb3VudFRleHQ9e2NvbnRlbnQudG90YWxBbW91bnRUZXh0fVxyXG4gICAgICAgIHRyYW5zRGF0ZVRleHQ9e2NvbnRlbnQudHJhbnNEYXRlVGV4dH1cclxuICAgICAgICBpc0VkaXRpbmc9e2NvbnRlbnQuaXNFZGl0aW5nfVxuICAgICAgICBnYXN0b1R5cGVPcHRpb25zPXtjb250ZW50Lmdhc3RvVHlwZU9wdGlvbnN9XG4gICAgICAgIGRyYWZ0RGVzY3JpcHRpb249e2NvbnRlbnQuZHJhZnREZXNjcmlwdGlvbn1cbiAgICAgICAgZGVzY3JpcHRpb25JbnZhbGlkPXtjb250ZW50LmRlc2NyaXB0aW9uSW52YWxpZH1cbiAgICAgICAgZGVzY3JpcHRpb25JbnB1dFJlZj17Y29udGVudC5kZXNjcmlwdGlvbklucHV0UmVmfVxuICAgICAgICBkcmFmdEdhc3RvVHlwZT17Y29udGVudC5kcmFmdEdhc3RvVHlwZX1cbiAgICAgICAgZ2FzdG9UeXBlSW52YWxpZD17Y29udGVudC5nYXN0b1R5cGVJbnZhbGlkfVxuICAgICAgICBnYXN0b1R5cGVJbnB1dFJlZj17Y29udGVudC5nYXN0b1R5cGVJbnB1dFJlZn1cbiAgICAgICAgZHJhZnRDdXJyZW5jeUNvZGU9e2NvbnRlbnQuZHJhZnRDdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgY3VycmVuY3lDb2RlSW52YWxpZD17Y29udGVudC5jdXJyZW5jeUNvZGVJbnZhbGlkfVxyXG4gICAgICAgIGN1cnJlbmN5SW5wdXRSZWY9e2NvbnRlbnQuY3VycmVuY3lJbnB1dFJlZn1cclxuICAgICAgICBkcmFmdFRyYW5zRGF0ZT17Y29udGVudC5kcmFmdFRyYW5zRGF0ZX1cclxuICAgICAgICBkcmFmdFVybEZpbGU9e2NvbnRlbnQuZHJhZnRVcmxGaWxlfVxyXG4gICAgICAgIGRyYWZ0RmlsZU5hbWU9e2NvbnRlbnQuZHJhZnRGaWxlTmFtZX1cclxuICAgICAgICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U9e2NvbnRlbnQub25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlfVxyXG4gICAgICAgIG9uRHJhZnRHYXN0b1R5cGVDaGFuZ2U9e2NvbnRlbnQub25EcmFmdEdhc3RvVHlwZUNoYW5nZX1cclxuICAgICAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlPXtjb250ZW50Lm9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XHJcbiAgICAgICAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZT17Y29udGVudC5vbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlfVxyXG4gICAgICAgIG9uT3BlbkZpbGU9e2NvbnRlbnQub25PcGVuRmlsZX1cclxuICAgICAgICBvbk9wZW5FeHBlbnNlU2hlZXQ9e2NvbnRlbnQub25PcGVuRXhwZW5zZVNoZWV0fVxyXG4gICAgICAgIGhpZGVPcGVuRmlsZUFjdGlvbj17Y29udGVudC5zaG93U3RpY2t5UHJldmlld31cclxuICAgICAgLz5cclxuICAgICAgPEV4cGVuc2VUaWNrZXRMaW5lc0xpc3RcclxuICAgICAgICB2aXNpYmxlTGluZXM9e2NvbnRlbnQudmlzaWJsZUxpbmVzfVxyXG4gICAgICAgIHRvdGFsTGluZVBhZ2VzPXtjb250ZW50LnRvdGFsTGluZVBhZ2VzfVxyXG4gICAgICAgIGxpbmVQYWdlPXtjb250ZW50LmxpbmVQYWdlfVxyXG4gICAgICAgIGN1cnJlbmN5Q29kZT17Y29udGVudC5jdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgcGFnaW5hdGlvbkxhYmVscz17Y29udGVudC5wYWdpbmF0aW9uTGFiZWxzfVxyXG4gICAgICAgIGNvbnRhaW5lclJlZj17Y29udGVudC5jb250YWluZXJSZWZ9XHJcbiAgICAgICAgb25MaW5lUGFnZUNoYW5nZT17Y29udGVudC5vbkxpbmVQYWdlQ2hhbmdlfVxyXG4gICAgICAgIG9uT3BlbkxpbmU9e2NvbnRlbnQub25PcGVuTGluZX1cclxuICAgICAgLz5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+e2NvbnRlbnQuc3RhdHVzfTwvZGl2PlxyXG4gICAgPC8+XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbC5jb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbC5jYW5jZWxUZXh0fVxyXG4gICAgICAgIGxvYWRpbmdUZXh0PXttb2RhbC5sb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXttb2RhbC5idXN5fVxyXG4gICAgICAgIGVycm9yPXttb2RhbC5lcnJvcn1cclxuICAgICAgICBzdGF0dXM9e21vZGFsLnN0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e21vZGFsLm9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17bW9kYWwub25DYW5jZWx9XHJcbiAgICAgIC8+XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0UHJldmlld01vZGFsXHJcbiAgICAgICAgb3Blbj17cHJldmlldy5vcGVufVxyXG4gICAgICAgIGJ1c3k9e3ByZXZpZXcuYnVzeX1cclxuICAgICAgICBlcnJvcj17cHJldmlldy5lcnJvcn1cclxuICAgICAgICBpbWFnZVVybD17cHJldmlldy5pbWFnZVVybH1cclxuICAgICAgICBpbWFnZUFsdD17cHJldmlldy5pbWFnZUFsdH1cclxuICAgICAgICBzY2FsZT17cHJldmlldy5zY2FsZX1cclxuICAgICAgICB0cmFuc2xhdGU9e3ByZXZpZXcudHJhbnNsYXRlfVxyXG4gICAgICAgIHN1cmZhY2VSZWY9e3ByZXZpZXcuc3VyZmFjZVJlZn1cclxuICAgICAgICBvbkNsb3NlPXtwcmV2aWV3Lm9uQ2xvc2V9XHJcbiAgICAgICAgb25Qb2ludGVyRG93bj17cHJldmlldy5vblBvaW50ZXJEb3dufVxyXG4gICAgICAgIG9uUG9pbnRlck1vdmU9e3ByZXZpZXcub25Qb2ludGVyTW92ZX1cclxuICAgICAgICBvblBvaW50ZXJFbmQ9e3ByZXZpZXcub25Qb2ludGVyRW5kfVxyXG4gICAgICAgIG9uV2hlZWw9e3ByZXZpZXcub25XaGVlbH1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxyXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGNvbnRlbnQuaXNMb2FkaW5nID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cclxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtjb250ZW50LmVycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57Y29udGVudC5lcnJvck1lc3NhZ2V9PC9kaXY+IDogbnVsbH1cclxuXHJcbiAgICAgIHshY29udGVudC5pc0xvYWRpbmcgJiYgIWNvbnRlbnQuZXJyb3JNZXNzYWdlICYmIGNvbnRlbnQuaGVhZGVyID8gKFxyXG4gICAgICAgIGNvbnRlbnQuc2hvd1N0aWNreVByZXZpZXcgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBsZzpncmlkIGxnOmdyaWQtY29scy1bbWlubWF4KDAsMWZyKV8zMjBweF0gbGc6Z2FwLTQgbGc6c3BhY2UteS0wXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXN0YXJ0LTJcIj5cclxuICAgICAgICAgICAgICA8RXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXdcclxuICAgICAgICAgICAgICAgIGJ1c3k9e2NvbnRlbnQucHJldmlld0J1c3l9XHJcbiAgICAgICAgICAgICAgICBlcnJvcj17Y29udGVudC5wcmV2aWV3RXJyb3J9XHJcbiAgICAgICAgICAgICAgICBpbWFnZVVybD17Y29udGVudC5wcmV2aWV3SW1hZ2VVcmx9XHJcbiAgICAgICAgICAgICAgICBpbWFnZUFsdD17Y29udGVudC5wcmV2aWV3QWx0VGV4dH1cclxuICAgICAgICAgICAgICAgIGZpbGVOYW1lPXtjb250ZW50LnByZXZpZXdGaWxlTmFtZX1cclxuICAgICAgICAgICAgICAgIG9uT3Blbj17Y29udGVudC5vbk9wZW5QcmV2aWV3fVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBsZzpjb2wtc3RhcnQtMSBsZzpyb3ctc3RhcnQtMVwiPntkZXRhaWxCb2R5fTwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIGRldGFpbEJvZHlcclxuICAgICAgICApXHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUgfSBmcm9tIFwiLi4vdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZS50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsLFxyXG4gIGJ1aWxkRXhwZW5zZVRpY2tldExpbmtVcmwsXHJcbiAgdHlwZSBFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgdG9FeHBlbnNlSXNvRGF0ZSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxCYWNrTmF2aWdhdGlvbkFyZ3MgPSB7XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgZGV0YWlsT3JpZ2luOiBzdHJpbmc7XHJcbiAgaGVhZGVyVHJhbnNEYXRlOiB1bmtub3duO1xyXG4gIHRpY2tldFJldHVybkNvbnRleHQ/OiBFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCB8IG51bGw7XHJcbiAgcmVhZENhY2hlZFN0YXRlOiAoKSA9PiBFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlIHwgbnVsbDtcclxuICBzYXZlQ2FjaGVkU3RhdGU6IChzdGF0ZTogRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIEtlZXBzIG5hdGl2ZSBiYWNrIG5hdmlnYXRpb24gYWxpZ25lZCB3aXRoIHRoZSB0aWNrZXQgZW50cnkgcG9pbnQgYW5kIHByZXNlcnZlcyBjYWNoZWQgbGluay1tb2RlIHN0YXRlLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uID0gKHtcclxuICBmaWxlSWQsXHJcbiAgZGV0YWlsT3JpZ2luLFxyXG4gIGhlYWRlclRyYW5zRGF0ZSxcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gIHJlYWRDYWNoZWRTdGF0ZSxcclxuICBzYXZlQ2FjaGVkU3RhdGUsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxCYWNrTmF2aWdhdGlvbkFyZ3MpID0+IHtcclxuICBjb25zdCBzaG91bGRSZXR1cm5Ub1RpY2tldExpc3QgPSB0aWNrZXRSZXR1cm5Db250ZXh0Py5vcmlnaW4gPT09IFwic2hlZXQtbGlua1wiIHx8ICF0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkO1xyXG5cclxuICBjb25zdCBuYXRpdmVCYWNrVXJsID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBpZiAodGlja2V0UmV0dXJuQ29udGV4dD8ub3JpZ2luID09PSBcInNoZWV0LWxpbmtcIiAmJiB0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0SWQpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkRXhwZW5zZVRpY2tldExpbmtVcmwodGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCkge1xyXG4gICAgICByZXR1cm4gYnVpbGRFeHBlbnNlU2hlZXREZXRhaWxVcmwodGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGV0YWlsT3JpZ2luID09PSBcInRpY2tldC1jcmVhdGVcIikge1xyXG4gICAgICBjb25zdCB0aWNrZXREYXRlID0gdG9FeHBlbnNlSXNvRGF0ZShoZWFkZXJUcmFuc0RhdGUpIHx8IHRvRXhwZW5zZUlzb0RhdGUobmV3IERhdGUoKSk7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgICAgdGlja2V0RmlsZUlkOiBmaWxlSWQsXHJcbiAgICAgICAgdGlja2V0RGF0ZSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gYC9HYXN0b3MvVGlja2V0cz8ke3F1ZXJ5LnRvU3RyaW5nKCl9YDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gXCIvR2FzdG9zL1RpY2tldHNcIjtcclxuICB9LCBbZGV0YWlsT3JpZ2luLCBmaWxlSWQsIGhlYWRlclRyYW5zRGF0ZSwgdGlja2V0UmV0dXJuQ29udGV4dF0pO1xyXG5cclxuICBjb25zdCByZWFybUV4cGVuc2VUaWNrZXRzUmV0dXJuU3RhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBjYWNoZWRTdGF0ZSA9IHJlYWRDYWNoZWRTdGF0ZSgpO1xyXG4gICAgaWYgKCFjYWNoZWRTdGF0ZSkgcmV0dXJuO1xyXG4gICAgc2F2ZUNhY2hlZFN0YXRlKGNhY2hlZFN0YXRlKTtcclxuICB9LCBbcmVhZENhY2hlZFN0YXRlLCBzYXZlQ2FjaGVkU3RhdGVdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghZmlsZUlkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgYmFja0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsQmFja0J0blwiKTtcclxuICAgIGlmICghYmFja0J1dHRvbikgcmV0dXJuO1xyXG5cclxuICAgIGJhY2tCdXR0b24uc2V0QXR0cmlidXRlKFwiZGF0YS1iYWNrLXVybFwiLCBuYXRpdmVCYWNrVXJsKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGJhY2tCdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1iYWNrLXVybFwiKTtcclxuICAgIH07XHJcbiAgfSwgW2ZpbGVJZCwgbmF0aXZlQmFja1VybF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFmaWxlSWQpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVOYXRpdmVCYWNrID0gKGV2ZW50OiBQb3BTdGF0ZUV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudD8uc3RhdGUgJiYgZXZlbnQuc3RhdGUuaW5kVHJhcCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChzaG91bGRSZXR1cm5Ub1RpY2tldExpc3QpIHtcclxuICAgICAgICAgIHJlYXJtRXhwZW5zZVRpY2tldHNSZXR1cm5TdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShuYXRpdmVCYWNrVXJsKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uKGV4ZWN1dGVCYWNrTmF2aWdhdGlvbik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBleGVjdXRlQmFja05hdmlnYXRpb24oKTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBoYW5kbGVOYXRpdmVCYWNrKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgaGFuZGxlTmF0aXZlQmFjayk7XHJcbiAgICB9O1xyXG4gIH0sIFtmaWxlSWQsIG5hdGl2ZUJhY2tVcmwsIHJlYXJtRXhwZW5zZVRpY2tldHNSZXR1cm5TdGF0ZSwgc2hvdWxkUmV0dXJuVG9UaWNrZXRMaXN0XSk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzXCI7XHJcbmltcG9ydCB7IGhhc0V4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdTb3VyY2UgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0UHJldmlld1V0aWxzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWxBcmdzID0ge1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBkcmFmdFVybEZpbGU6IHN0cmluZztcclxuICBoZWFkZXJVcmxGaWxlPzogc3RyaW5nIHwgbnVsbDtcclxufTtcclxuXHJcbi8vIENlbnRyYWxpemVzIHN0aWNreS1wcmV2aWV3IGF2YWlsYWJpbGl0eSBhbmQgaW1hZ2UgbG9hZGluZyBmb3IgdGlja2V0IGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWwgPSAoe1xyXG4gIGZpbGVJZCxcclxuICBpc0VkaXRpbmcsXHJcbiAgZHJhZnRVcmxGaWxlLFxyXG4gIGhlYWRlclVybEZpbGUsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWxBcmdzKSA9PiB7XHJcbiAgY29uc3QgcHJldmlld1NvdXJjZVVybCA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQoaXNFZGl0aW5nID8gZHJhZnRVcmxGaWxlIDogaGVhZGVyVXJsRmlsZSksIFtkcmFmdFVybEZpbGUsIGhlYWRlclVybEZpbGUsIGlzRWRpdGluZ10pO1xyXG4gIGNvbnN0IHNob3dTdGlja3lQcmV2aWV3ID0gdXNlTWVtbygoKSA9PiBoYXNFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3U291cmNlKHByZXZpZXdTb3VyY2VVcmwpLCBbcHJldmlld1NvdXJjZVVybF0pO1xyXG4gIGNvbnN0IHByZXZpZXcgPSB1c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3KHtcclxuICAgIGZpbGVJZCxcclxuICAgIHNvdXJjZVVybDogcHJldmlld1NvdXJjZVVybCxcclxuICAgIGVuYWJsZWQ6IHNob3dTdGlja3lQcmV2aWV3LFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc2hvd1N0aWNreVByZXZpZXcsXHJcbiAgICAuLi5wcmV2aWV3LFxyXG4gIH07XHJcbn07XHJcbiIsICJcdUZFRkZpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRQcmV2aWV3QmxvYiB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG5jb25zdCBQUkVWSUVXX01BWF9TQ0FMRSA9IDQ7XHJcbmNvbnN0IFBSRVZJRVdfU0NBTEVfU1RFUCA9IDAuMjU7XHJcblxyXG5leHBvcnQgdHlwZSBUaWNrZXRQcmV2aWV3UG9pbnQgPSB7XHJcbiAgeDogbnVtYmVyO1xyXG4gIHk6IG51bWJlcjtcclxufTtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlld0FyZ3MgPSB7XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgc291cmNlVXJsOiBzdHJpbmc7XHJcbiAgZW5hYmxlZD86IGJvb2xlYW47XHJcbn07XHJcblxyXG5jb25zdCBjbGFtcFByZXZpZXdTY2FsZSA9ICh2YWx1ZTogbnVtYmVyKTogbnVtYmVyID0+IHtcclxuICBpZiAoIU51bWJlci5pc0Zpbml0ZSh2YWx1ZSkpIHJldHVybiAxO1xyXG4gIHJldHVybiBNYXRoLm1pbihQUkVWSUVXX01BWF9TQ0FMRSwgTWF0aC5tYXgoMSwgdmFsdWUpKTtcclxufTtcclxuXHJcbmNvbnN0IGdldFByZXZpZXdQb2ludERpc3RhbmNlID0gKGxlZnQ6IFRpY2tldFByZXZpZXdQb2ludCwgcmlnaHQ6IFRpY2tldFByZXZpZXdQb2ludCk6IG51bWJlciA9PiB7XHJcbiAgY29uc3QgZGVsdGFYID0gcmlnaHQueCAtIGxlZnQueDtcclxuICBjb25zdCBkZWx0YVkgPSByaWdodC55IC0gbGVmdC55O1xyXG4gIHJldHVybiBNYXRoLnNxcnQoZGVsdGFYICogZGVsdGFYICsgZGVsdGFZICogZGVsdGFZKTtcclxufTtcclxuXHJcbmNvbnN0IGdldFByZXZpZXdQb2ludENlbnRlciA9IChsZWZ0OiBUaWNrZXRQcmV2aWV3UG9pbnQsIHJpZ2h0OiBUaWNrZXRQcmV2aWV3UG9pbnQpOiBUaWNrZXRQcmV2aWV3UG9pbnQgPT4gKHtcclxuICB4OiAobGVmdC54ICsgcmlnaHQueCkgLyAyLFxyXG4gIHk6IChsZWZ0LnkgKyByaWdodC55KSAvIDIsXHJcbn0pO1xyXG5cclxuLy8gTWFuYWdlcyB0aWNrZXQgaW1hZ2UgcHJldmlldyBzdGF0ZSBhbmQgem9vbS9wYW4gZ2VzdHVyZXMuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3ID0gKHsgZmlsZUlkLCBzb3VyY2VVcmwsIGVuYWJsZWQgPSB0cnVlIH06IFVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdBcmdzKSA9PiB7XHJcbiAgY29uc3QgW3ByZXZpZXdPcGVuLCBzZXRQcmV2aWV3T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3ByZXZpZXdCdXN5LCBzZXRQcmV2aWV3QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3ByZXZpZXdFcnJvciwgc2V0UHJldmlld0Vycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtwcmV2aWV3SW1hZ2VVcmwsIHNldFByZXZpZXdJbWFnZVVybF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbcHJldmlld1NjYWxlLCBzZXRQcmV2aWV3U2NhbGVdID0gdXNlU3RhdGUoMSk7XHJcbiAgY29uc3QgW3ByZXZpZXdUcmFuc2xhdGUsIHNldFByZXZpZXdUcmFuc2xhdGVdID0gdXNlU3RhdGU8VGlja2V0UHJldmlld1BvaW50Pih7IHg6IDAsIHk6IDAgfSk7XHJcblxyXG4gIGNvbnN0IHByZXZpZXdTY2FsZVJlZiA9IHVzZVJlZigxKTtcclxuICBjb25zdCBwcmV2aWV3SW1hZ2VVcmxSZWYgPSB1c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgcHJldmlld1JlcXVlc3RLZXlSZWYgPSB1c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgcHJldmlld0xvYWRQcm9taXNlUmVmID0gdXNlUmVmPFByb21pc2U8c3RyaW5nPiB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHByZXZpZXdTdXJmYWNlUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcHJldmlld1RyYW5zbGF0ZVJlZiA9IHVzZVJlZjxUaWNrZXRQcmV2aWV3UG9pbnQ+KHsgeDogMCwgeTogMCB9KTtcclxuICBjb25zdCBwcmV2aWV3UG9pbnRlcnNSZWYgPSB1c2VSZWY8TWFwPG51bWJlciwgVGlja2V0UHJldmlld1BvaW50Pj4obmV3IE1hcCgpKTtcclxuICBjb25zdCBwcmV2aWV3UGFuUG9pbnRlclJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBwcmV2aWV3UGFuTGFzdFBvaW50UmVmID0gdXNlUmVmPFRpY2tldFByZXZpZXdQb2ludCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHByZXZpZXdQaW5jaFNuYXBzaG90UmVmID0gdXNlUmVmPHtcclxuICAgIGRpc3RhbmNlOiBudW1iZXI7XHJcbiAgICBzY2FsZTogbnVtYmVyO1xyXG4gICAgY2VudGVyOiBUaWNrZXRQcmV2aWV3UG9pbnQ7XHJcbiAgICB0cmFuc2xhdGU6IFRpY2tldFByZXZpZXdQb2ludDtcclxuICB9IHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIGNvbnN0IGFwcGx5UHJldmlld1RyYW5zZm9ybSA9IHVzZUNhbGxiYWNrKChuZXh0U2NhbGU6IG51bWJlciwgbmV4dFRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50KSA9PiB7XHJcbiAgICBjb25zdCBub3JtYWxpemVkU2NhbGUgPSBjbGFtcFByZXZpZXdTY2FsZShuZXh0U2NhbGUpO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZFRyYW5zbGF0ZSA9IG5vcm1hbGl6ZWRTY2FsZSA8PSAxID8geyB4OiAwLCB5OiAwIH0gOiBuZXh0VHJhbnNsYXRlO1xyXG5cclxuICAgIHByZXZpZXdTY2FsZVJlZi5jdXJyZW50ID0gbm9ybWFsaXplZFNjYWxlO1xyXG4gICAgcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50ID0gbm9ybWFsaXplZFRyYW5zbGF0ZTtcclxuICAgIHNldFByZXZpZXdTY2FsZShub3JtYWxpemVkU2NhbGUpO1xyXG4gICAgc2V0UHJldmlld1RyYW5zbGF0ZShub3JtYWxpemVkVHJhbnNsYXRlKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHJlc2V0UHJldmlld0dlc3R1cmUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5jbGVhcigpO1xyXG4gICAgcHJldmlld1BhblBvaW50ZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBhcHBseVByZXZpZXdUcmFuc2Zvcm0oMSwgeyB4OiAwLCB5OiAwIH0pO1xyXG4gIH0sIFthcHBseVByZXZpZXdUcmFuc2Zvcm1dKTtcclxuXHJcbiAgY29uc3QgcmVidWlsZFBpbmNoU25hcHNob3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBwb2ludGVyUG9pbnRzID0gQXJyYXkuZnJvbShwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC52YWx1ZXMoKSk7XHJcbiAgICBpZiAocG9pbnRlclBvaW50cy5sZW5ndGggPCAyKSB7XHJcbiAgICAgIHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgW2xlZnQsIHJpZ2h0XSA9IHBvaW50ZXJQb2ludHM7XHJcbiAgICBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50ID0ge1xyXG4gICAgICBkaXN0YW5jZTogTWF0aC5tYXgoMSwgZ2V0UHJldmlld1BvaW50RGlzdGFuY2UobGVmdCwgcmlnaHQpKSxcclxuICAgICAgc2NhbGU6IHByZXZpZXdTY2FsZVJlZi5jdXJyZW50LFxyXG4gICAgICBjZW50ZXI6IGdldFByZXZpZXdQb2ludENlbnRlcihsZWZ0LCByaWdodCksXHJcbiAgICAgIHRyYW5zbGF0ZTogcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50LFxyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHJlcGxhY2VQcmV2aWV3SW1hZ2VVcmwgPSB1c2VDYWxsYmFjaygobmV4dFVybDogc3RyaW5nKSA9PiB7XHJcbiAgICBzZXRQcmV2aWV3SW1hZ2VVcmwoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgIGlmIChwcmV2aW91cyAmJiBwcmV2aW91cyAhPT0gbmV4dFVybCkge1xyXG4gICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwocHJldmlvdXMpO1xyXG4gICAgICB9XHJcbiAgICAgIHByZXZpZXdJbWFnZVVybFJlZi5jdXJyZW50ID0gbmV4dFVybDtcclxuICAgICAgcmV0dXJuIG5leHRVcmw7XHJcbiAgICB9KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNsZWFyUHJldmlld0ltYWdlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgcHJldmlld0xvYWRQcm9taXNlUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgc2V0UHJldmlld0ltYWdlVXJsKChwcmV2aW91cykgPT4ge1xyXG4gICAgICBpZiAocHJldmlvdXMpIHtcclxuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHByZXZpb3VzKTtcclxuICAgICAgfVxyXG4gICAgICBwcmV2aWV3SW1hZ2VVcmxSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBsb2FkUHJldmlld0ltYWdlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCk6IFByb21pc2U8c3RyaW5nPiA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50RmlsZUlkID0gc2FmZVRleHQoZmlsZUlkKTtcclxuICAgIGNvbnN0IGN1cnJlbnRVcmwgPSBzYWZlVGV4dChzb3VyY2VVcmwpO1xyXG4gICAgaWYgKCFlbmFibGVkIHx8ICFjdXJyZW50RmlsZUlkIHx8ICFjdXJyZW50VXJsKSB7XHJcbiAgICAgIHNldFByZXZpZXdCdXN5KGZhbHNlKTtcclxuICAgICAgc2V0UHJldmlld0Vycm9yKFwiXCIpO1xyXG4gICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJldmlld0ltYWdlVXJsUmVmLmN1cnJlbnQpIHtcclxuICAgICAgcmV0dXJuIHByZXZpZXdJbWFnZVVybFJlZi5jdXJyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcmV2aWV3TG9hZFByb21pc2VSZWYuY3VycmVudCkge1xyXG4gICAgICByZXR1cm4gcHJldmlld0xvYWRQcm9taXNlUmVmLmN1cnJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdEtleSA9IGAke2N1cnJlbnRGaWxlSWR9X18ke2N1cnJlbnRVcmx9YDtcclxuICAgIHByZXZpZXdSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPSByZXF1ZXN0S2V5O1xyXG4gICAgc2V0UHJldmlld0J1c3kodHJ1ZSk7XHJcbiAgICBzZXRQcmV2aWV3RXJyb3IoXCJcIik7XHJcblxyXG4gICAgY29uc3QgbmV4dFByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldFByZXZpZXdCbG9iKGN1cnJlbnRGaWxlSWQsIGN1cnJlbnRVcmwsIHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IG9iamVjdFVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgICAgICAgaWYgKHByZXZpZXdSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgIT09IHJlcXVlc3RLZXkpIHtcclxuICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwob2JqZWN0VXJsKTtcclxuICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVwbGFjZVByZXZpZXdJbWFnZVVybChvYmplY3RVcmwpO1xyXG4gICAgICAgIHJldHVybiBvYmplY3RVcmw7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKHByZXZpZXdSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPT09IHJlcXVlc3RLZXkpIHtcclxuICAgICAgICAgIHNldFByZXZpZXdFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIGlmIChwcmV2aWV3UmVxdWVzdEtleVJlZi5jdXJyZW50ID09PSByZXF1ZXN0S2V5KSB7XHJcbiAgICAgICAgICBzZXRQcmV2aWV3QnVzeShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByZXZpZXdMb2FkUHJvbWlzZVJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICBwcmV2aWV3TG9hZFByb21pc2VSZWYuY3VycmVudCA9IG5leHRQcm9taXNlO1xyXG4gICAgcmV0dXJuIG5leHRQcm9taXNlO1xyXG4gIH0sIFtlbmFibGVkLCBmaWxlSWQsIHJlcGxhY2VQcmV2aWV3SW1hZ2VVcmwsIHNvdXJjZVVybF0pO1xyXG5cclxuICBjb25zdCBjbG9zZVByZXZpZXcgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRQcmV2aWV3T3BlbihmYWxzZSk7XHJcbiAgICBzZXRQcmV2aWV3QnVzeShmYWxzZSk7XHJcbiAgICBzZXRQcmV2aWV3RXJyb3IoXCJcIik7XHJcbiAgICByZXNldFByZXZpZXdHZXN0dXJlKCk7XHJcbiAgfSwgW3Jlc2V0UHJldmlld0dlc3R1cmVdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFyUHJldmlld0ltYWdlKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtjbGVhclByZXZpZXdJbWFnZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgcHJldmlld1JlcXVlc3RLZXlSZWYuY3VycmVudCA9IGAke3NhZmVUZXh0KGZpbGVJZCl9X18ke3NhZmVUZXh0KHNvdXJjZVVybCl9YDtcclxuICAgIHNldFByZXZpZXdPcGVuKGZhbHNlKTtcclxuICAgIHNldFByZXZpZXdCdXN5KGZhbHNlKTtcclxuICAgIHNldFByZXZpZXdFcnJvcihcIlwiKTtcclxuICAgIHJlc2V0UHJldmlld0dlc3R1cmUoKTtcclxuICAgIGNsZWFyUHJldmlld0ltYWdlKCk7XHJcblxyXG4gICAgaWYgKGVuYWJsZWQgJiYgc2FmZVRleHQoZmlsZUlkKSAmJiBzYWZlVGV4dChzb3VyY2VVcmwpKSB7XHJcbiAgICAgIHZvaWQgbG9hZFByZXZpZXdJbWFnZSgpO1xyXG4gICAgfVxyXG4gIH0sIFtjbGVhclByZXZpZXdJbWFnZSwgZW5hYmxlZCwgZmlsZUlkLCBsb2FkUHJldmlld0ltYWdlLCByZXNldFByZXZpZXdHZXN0dXJlLCBzb3VyY2VVcmxdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghcHJldmlld09wZW4pIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBvbktleURvd24gPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG4gICAgICAgIGNsb3NlUHJldmlldygpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xyXG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xyXG4gIH0sIFtwcmV2aWV3T3BlbiwgY2xvc2VQcmV2aWV3XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXByZXZpZXdPcGVuKSByZXR1cm47XHJcbiAgICBjb25zdCBzdXJmYWNlID0gcHJldmlld1N1cmZhY2VSZWYuY3VycmVudDtcclxuICAgIGlmICghc3VyZmFjZSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHByZXZlbnRHZXN0dXJlRGVmYXVsdCA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcHJldmVudFRvdWNoVmlld3BvcnRab29tID0gKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHByZXZlbnRDdHJsV2hlZWxWaWV3cG9ydFpvb20gPSAoZXZlbnQ6IFdoZWVsRXZlbnQpID0+IHtcclxuICAgICAgaWYgKGV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHN1cmZhY2UuYWRkRXZlbnRMaXN0ZW5lcihcImdlc3R1cmVzdGFydFwiLCBwcmV2ZW50R2VzdHVyZURlZmF1bHQsIHsgcGFzc2l2ZTogZmFsc2UgfSk7XHJcbiAgICBzdXJmYWNlLmFkZEV2ZW50TGlzdGVuZXIoXCJnZXN0dXJlY2hhbmdlXCIsIHByZXZlbnRHZXN0dXJlRGVmYXVsdCwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcclxuICAgIHN1cmZhY2UuYWRkRXZlbnRMaXN0ZW5lcihcImdlc3R1cmVlbmRcIiwgcHJldmVudEdlc3R1cmVEZWZhdWx0LCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xyXG4gICAgc3VyZmFjZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHByZXZlbnRUb3VjaFZpZXdwb3J0Wm9vbSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcclxuICAgIHN1cmZhY2UuYWRkRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIHByZXZlbnRDdHJsV2hlZWxWaWV3cG9ydFpvb20sIHsgcGFzc2l2ZTogZmFsc2UgfSk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgc3VyZmFjZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiZ2VzdHVyZXN0YXJ0XCIsIHByZXZlbnRHZXN0dXJlRGVmYXVsdCk7XHJcbiAgICAgIHN1cmZhY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImdlc3R1cmVjaGFuZ2VcIiwgcHJldmVudEdlc3R1cmVEZWZhdWx0KTtcclxuICAgICAgc3VyZmFjZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiZ2VzdHVyZWVuZFwiLCBwcmV2ZW50R2VzdHVyZURlZmF1bHQpO1xyXG4gICAgICBzdXJmYWNlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgcHJldmVudFRvdWNoVmlld3BvcnRab29tKTtcclxuICAgICAgc3VyZmFjZS5yZW1vdmVFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgcHJldmVudEN0cmxXaGVlbFZpZXdwb3J0Wm9vbSk7XHJcbiAgICB9O1xyXG4gIH0sIFtwcmV2aWV3T3Blbl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24gPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xyXG4gICAgICBpZiAoIXByZXZpZXdJbWFnZVVybCB8fCBwcmV2aWV3QnVzeSkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBwb2ludDogVGlja2V0UHJldmlld1BvaW50ID0geyB4OiBldmVudC5jbGllbnRYLCB5OiBldmVudC5jbGllbnRZIH07XHJcbiAgICAgIHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LnNldChldmVudC5wb2ludGVySWQsIHBvaW50KTtcclxuICAgICAgaWYgKHR5cGVvZiBldmVudC5jdXJyZW50VGFyZ2V0LnNldFBvaW50ZXJDYXB0dXJlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5zZXRQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgLy8gSWdub3JlIGNhcHR1cmUgZmFpbHVyZXMgb24gYnJvd3NlcnMgdGhhdCBkbyBub3QgZnVsbHkgc3VwcG9ydCBwb2ludGVyIGNhcHR1cmUuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuc2l6ZSA9PT0gMSkge1xyXG4gICAgICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBldmVudC5wb2ludGVySWQ7XHJcbiAgICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gcG9pbnQ7XHJcbiAgICAgICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcmVidWlsZFBpbmNoU25hcHNob3QoKTtcclxuICAgIH0sXHJcbiAgICBbcHJldmlld0J1c3ksIHByZXZpZXdJbWFnZVVybCwgcmVidWlsZFBpbmNoU25hcHNob3RdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgICAgaWYgKCFwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5oYXMoZXZlbnQucG9pbnRlcklkKSkgcmV0dXJuO1xyXG5cclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgcG9pbnQ6IFRpY2tldFByZXZpZXdQb2ludCA9IHsgeDogZXZlbnQuY2xpZW50WCwgeTogZXZlbnQuY2xpZW50WSB9O1xyXG4gICAgICBwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5zZXQoZXZlbnQucG9pbnRlcklkLCBwb2ludCk7XHJcblxyXG4gICAgICBjb25zdCBwb2ludGVyRW50cmllcyA9IEFycmF5LmZyb20ocHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuZW50cmllcygpKTtcclxuICAgICAgY29uc3QgcG9pbnRlclBvaW50cyA9IHBvaW50ZXJFbnRyaWVzLm1hcCgoZW50cnkpID0+IGVudHJ5WzFdKTtcclxuXHJcbiAgICAgIGlmIChwb2ludGVyUG9pbnRzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgaWYgKCFwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICByZWJ1aWxkUGluY2hTbmFwc2hvdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc25hcHNob3QgPSBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50O1xyXG4gICAgICAgIGlmICghc25hcHNob3QpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgW2xlZnQsIHJpZ2h0XSA9IHBvaW50ZXJQb2ludHM7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLm1heCgxLCBnZXRQcmV2aWV3UG9pbnREaXN0YW5jZShsZWZ0LCByaWdodCkpO1xyXG4gICAgICAgIGNvbnN0IHJhdGlvID0gZGlzdGFuY2UgLyBNYXRoLm1heCgxLCBzbmFwc2hvdC5kaXN0YW5jZSk7XHJcbiAgICAgICAgY29uc3QgbmV4dFNjYWxlID0gY2xhbXBQcmV2aWV3U2NhbGUoc25hcHNob3Quc2NhbGUgKiByYXRpbyk7XHJcbiAgICAgICAgY29uc3QgY2VudGVyID0gZ2V0UHJldmlld1BvaW50Q2VudGVyKGxlZnQsIHJpZ2h0KTtcclxuICAgICAgICBjb25zdCBuZXh0VHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQgPSB7XHJcbiAgICAgICAgICB4OiBzbmFwc2hvdC50cmFuc2xhdGUueCArIChjZW50ZXIueCAtIHNuYXBzaG90LmNlbnRlci54KSxcclxuICAgICAgICAgIHk6IHNuYXBzaG90LnRyYW5zbGF0ZS55ICsgKGNlbnRlci55IC0gc25hcHNob3QuY2VudGVyLnkpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYXBwbHlQcmV2aWV3VHJhbnNmb3JtKG5leHRTY2FsZSwgbmV4dFRyYW5zbGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocG9pbnRlclBvaW50cy5sZW5ndGggIT09IDEgfHwgcHJldmlld1NjYWxlUmVmLmN1cnJlbnQgPD0gMSB8fCBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ICE9PSBldmVudC5wb2ludGVySWQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGxhc3RQb2ludCA9IHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudDtcclxuICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gcG9pbnQ7XHJcbiAgICAgIGlmICghbGFzdFBvaW50KSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBuZXh0VHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQgPSB7XHJcbiAgICAgICAgeDogcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50LnggKyAocG9pbnQueCAtIGxhc3RQb2ludC54KSxcclxuICAgICAgICB5OiBwcmV2aWV3VHJhbnNsYXRlUmVmLmN1cnJlbnQueSArIChwb2ludC55IC0gbGFzdFBvaW50LnkpLFxyXG4gICAgICB9O1xyXG4gICAgICBhcHBseVByZXZpZXdUcmFuc2Zvcm0ocHJldmlld1NjYWxlUmVmLmN1cnJlbnQsIG5leHRUcmFuc2xhdGUpO1xyXG4gICAgfSxcclxuICAgIFthcHBseVByZXZpZXdUcmFuc2Zvcm0sIHJlYnVpbGRQaW5jaFNuYXBzaG90XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVByZXZpZXdQb2ludGVyRW5kID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgICAgaWYgKCFwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5oYXMoZXZlbnQucG9pbnRlcklkKSkgcmV0dXJuO1xyXG4gICAgICBwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5kZWxldGUoZXZlbnQucG9pbnRlcklkKTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHR5cGVvZiBldmVudC5jdXJyZW50VGFyZ2V0Lmhhc1BvaW50ZXJDYXB0dXJlID09PSBcImZ1bmN0aW9uXCIgJiZcclxuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0Lmhhc1BvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZClcclxuICAgICAgKSB7XHJcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5yZWxlYXNlUG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcG9pbnRlckVudHJpZXMgPSBBcnJheS5mcm9tKHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LmVudHJpZXMoKSk7XHJcbiAgICAgIGlmIChwb2ludGVyRW50cmllcy5sZW5ndGggPj0gMikge1xyXG4gICAgICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgcmVidWlsZFBpbmNoU25hcHNob3QoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwb2ludGVyRW50cmllcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICBjb25zdCBbcG9pbnRlcklkLCBwb2ludGVyUG9pbnRdID0gcG9pbnRlckVudHJpZXNbMF07XHJcbiAgICAgICAgcHJldmlld1BhblBvaW50ZXJSZWYuY3VycmVudCA9IHBvaW50ZXJJZDtcclxuICAgICAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBwb2ludGVyUG9pbnQ7XHJcbiAgICAgICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIGlmIChwcmV2aWV3U2NhbGVSZWYuY3VycmVudCA8PSAxKSB7XHJcbiAgICAgICAgYXBwbHlQcmV2aWV3VHJhbnNmb3JtKDEsIHsgeDogMCwgeTogMCB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFthcHBseVByZXZpZXdUcmFuc2Zvcm0sIHJlYnVpbGRQaW5jaFNuYXBzaG90XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVByZXZpZXdXaGVlbCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5XaGVlbEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xyXG4gICAgICBpZiAoIXByZXZpZXdJbWFnZVVybCB8fCBwcmV2aWV3QnVzeSkgcmV0dXJuO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgY29uc3QgZGlyZWN0aW9uID0gZXZlbnQuZGVsdGFZIDwgMCA/IDEgOiAtMTtcclxuICAgICAgY29uc3QgbmV4dFNjYWxlID0gY2xhbXBQcmV2aWV3U2NhbGUocHJldmlld1NjYWxlUmVmLmN1cnJlbnQgKyBkaXJlY3Rpb24gKiBQUkVWSUVXX1NDQUxFX1NURVApO1xyXG4gICAgICBhcHBseVByZXZpZXdUcmFuc2Zvcm0obmV4dFNjYWxlLCBwcmV2aWV3VHJhbnNsYXRlUmVmLmN1cnJlbnQpO1xyXG4gICAgfSxcclxuICAgIFthcHBseVByZXZpZXdUcmFuc2Zvcm0sIHByZXZpZXdCdXN5LCBwcmV2aWV3SW1hZ2VVcmxdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb3BlblByZXZpZXcgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50RmlsZUlkID0gc2FmZVRleHQoZmlsZUlkKTtcclxuICAgIGNvbnN0IGN1cnJlbnRVcmwgPSBzYWZlVGV4dChzb3VyY2VVcmwpO1xyXG4gICAgaWYgKCFlbmFibGVkIHx8ICFjdXJyZW50RmlsZUlkIHx8ICFjdXJyZW50VXJsKSByZXR1cm47XHJcblxyXG4gICAgcmVzZXRQcmV2aWV3R2VzdHVyZSgpO1xyXG4gICAgc2V0UHJldmlld09wZW4odHJ1ZSk7XHJcbiAgICBzZXRQcmV2aWV3RXJyb3IoXCJcIik7XHJcblxyXG4gICAgYXdhaXQgbG9hZFByZXZpZXdJbWFnZSgpO1xyXG4gIH0sIFtlbmFibGVkLCBmaWxlSWQsIGxvYWRQcmV2aWV3SW1hZ2UsIHJlc2V0UHJldmlld0dlc3R1cmUsIHNvdXJjZVVybF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcHJldmlld09wZW4sXHJcbiAgICBwcmV2aWV3QnVzeSxcclxuICAgIHByZXZpZXdFcnJvcixcclxuICAgIHByZXZpZXdJbWFnZVVybCxcclxuICAgIHByZXZpZXdTY2FsZSxcclxuICAgIHByZXZpZXdUcmFuc2xhdGUsXHJcbiAgICBwcmV2aWV3U3VyZmFjZVJlZixcclxuICAgIG9wZW5QcmV2aWV3LFxyXG4gICAgY2xvc2VQcmV2aWV3LFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlLFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXHJcbiAgICBoYW5kbGVQcmV2aWV3V2hlZWwsXHJcbiAgfTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGlCQUErRDs7O0FDQS9ELG1CQUFpRDtBQWUxQyxJQUFNLDhCQUE4QixDQUFDLEVBQUUsV0FBVyxRQUFRLFlBQVksTUFBdUM7QUFDbEgsUUFBTSxDQUFDLFFBQVEsU0FBUyxRQUFJLHVCQUEyQyxJQUFJO0FBQzNFLFFBQU0sQ0FBQyxPQUFPLFFBQVEsUUFBSSx1QkFBb0MsQ0FBQyxDQUFDO0FBQ2hFLFFBQU0sQ0FBQyxXQUFXLFlBQVksUUFBSSx1QkFBUyxLQUFLO0FBQ2hELFFBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx1QkFBUyxFQUFFO0FBRW5ELFFBQU0sbUJBQWUsMEJBQVksWUFBWTtBQUMzQyxRQUFJLENBQUMsV0FBVztBQUNkLGtCQUFZO0FBQ1o7QUFBQSxJQUNGO0FBRUEsVUFBTSxhQUFhLFNBQVMsTUFBTTtBQUNsQyxRQUFJLENBQUMsWUFBWTtBQUNmLHNCQUFnQixLQUFLLDJCQUEyQix1QkFBdUIsQ0FBQztBQUN4RSxnQkFBVSxJQUFJO0FBQ2QsZUFBUyxDQUFDLENBQUM7QUFDWDtBQUFBLElBQ0Y7QUFFQSxpQkFBYSxJQUFJO0FBQ2pCLG9CQUFnQixFQUFFO0FBRWxC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NkNBQUMsbUNBQXdCLE9BQU8sV0FBVyxPQUFPLFNBQVMsV0FBVyxTQUFTLFNBQVMsV0FBVyxTQUFTO0FBQ3JIO0FBR0EsSUFBTSwwQkFBMEIsTUFBTTtBQUNwQyxTQUNFLDZDQUFDLGdDQUFxQix5QkFBdUIsTUFDM0MsdURBQUMsa0NBQStCLEdBQ2xDO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSw0QkFBNEI7QUFDbkUsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQywyQkFBd0IsQ0FBRTtBQUN0RDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sa0NBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAibmV4dFRyYW5zbGF0ZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
