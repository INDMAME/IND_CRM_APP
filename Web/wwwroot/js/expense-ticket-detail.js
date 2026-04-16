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
  mapExpenseTicketDetailHeader,
  mapExpenseTicketDetailLine
} from "./chunks/chunk-L2QBQ4WC.js";
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
} from "./chunks/chunk-2LYP2LM4.js";
import "./chunks/chunk-4BE3ZFCK.js";
import {
  appendExpenseTicketReturnQuery,
  buildExpenseSheetDetailUrl,
  buildExpenseTicketLinkUrl,
  isManagingOtherExpenseUser,
  normalizeExpenseTicketReturnContext,
  resolveExpenseTicketReturnContext,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-FMQKLPFH.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-PDB5ASGP.js";
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
  require_react,
  require_react_dom
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFJvdXRlQ29udGV4dC50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5LnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0UHJldmlld1V0aWxzLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5lc0xpc3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0U3RpY2t5UHJldmlldy50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsVmlldy50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcclxuaW1wb3J0IHsgdXNlQXV0aENvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcclxuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcclxuaW1wb3J0IHsgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBpc01hbmFnaW5nT3RoZXJFeHBlbnNlVXNlciB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTWFuYWdlZFVzZXJTY29wZS50c1wiO1xyXG5pbXBvcnQgeyBtYXBXaW5kb3dFbnVtT3B0aW9ucywgdHlwZSBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB7IGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3IgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXkudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3IGZyb20gXCIuL0V4cGVuc2VUaWNrZXREZXRhaWxWaWV3LnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlIH0gZnJvbSBcIi4uL3VzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbEJhY2tOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWwgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciwgRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcclxuXHJcbmNvbnN0IEFMTE9XRURfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XHJcbmNvbnN0IExJTkVTX1BBR0VfU0laRSA9IDY7XHJcbmNvbnN0IEdBU1RPX1RZUEVfTEFCRUxfS0VZUzogUmVjb3JkPG51bWJlciwgeyBrZXk6IHN0cmluZzsgZmFsbGJhY2s6IHN0cmluZyB9PiA9IHtcclxuICAwOiB7IGtleTogXCJFbnVtX05vbmVcIiwgZmFsbGJhY2s6IFwiTm9uZVwiIH0sXHJcbiAgMTogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfUGVhamVcIiwgZmFsbGJhY2s6IFwiUGVhamVcIiB9LFxyXG4gIDI6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1BhcmtpbmdcIiwgZmFsbGJhY2s6IFwiUGFya2luZ1wiIH0sXHJcbiAgMzogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfS21cIiwgZmFsbGJhY2s6IFwiS21cIiB9LFxyXG4gIDQ6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0Rlc2F5dW5vXCIsIGZhbGxiYWNrOiBcIkRlc2F5dW5vXCIgfSxcclxuICA1OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9Db21pZGFcIiwgZmFsbGJhY2s6IFwiQ29taWRhXCIgfSxcclxuICA2OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9DZW5hXCIsIGZhbGxiYWNrOiBcIkNlbmFcIiB9LFxyXG4gIDc6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0hvdGVsXCIsIGZhbGxiYWNrOiBcIkhvdGVsXCIgfSxcclxuICA4OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9WYXJpb3NcIiwgZmFsbGJhY2s6IFwiVmFyaW9zXCIgfSxcclxuICAxNDogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfVGF4aVwiLCBmYWxsYmFjazogXCJUYXhpXCIgfSxcclxufTtcclxuXHJcbmNvbnN0IHBhZ2VkU2xpY2UgPSA8VCw+KGl0ZW1zOiBUW10sIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcik6IFRbXSA9PiB7XHJcbiAgaWYgKCFpdGVtcy5sZW5ndGgpIHJldHVybiBbXTtcclxuICBjb25zdCBzYWZlUGFnZSA9IE1hdGgubWF4KDEsIHBhZ2UpO1xyXG4gIGNvbnN0IHN0YXJ0ID0gKHNhZmVQYWdlIC0gMSkgKiBwYWdlU2l6ZTtcclxuICByZXR1cm4gaXRlbXMuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgcGFnZVNpemUpO1xyXG59O1xyXG5cclxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxyXG5jb25zdCBib290c3RyYXBFeHBlbnNlQXBpQXV0aCA9ICgpID0+IHtcclxuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCh7XHJcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcclxuICAgIGVudHJhT2lkOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxyXG4gICAgYXBwQ29kZTogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRGYWxsYmFja0dhc3RvVHlwZU9wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcclxuICByZXR1cm4gT2JqZWN0LmVudHJpZXMoR0FTVE9fVFlQRV9MQUJFTF9LRVlTKVxyXG4gICAgLm1hcCgoW2NvZGUsIGNmZ10pID0+ICh7XHJcbiAgICAgIHZhbHVlOiBTdHJpbmcoY29kZSksXHJcbiAgICAgIHRleHQ6IGluZFQoY2ZnLmtleSwgY2ZnLmZhbGxiYWNrKSxcclxuICAgIH0pKVxyXG4gICAgLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiBOdW1iZXIobGVmdC52YWx1ZSkgLSBOdW1iZXIocmlnaHQudmFsdWUpKTtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbE1vZGFsVmlldyA9ICh7XHJcbiAgbW9kYWwsXHJcbiAgbW9kYWxDb25maXJtVGV4dCxcclxuICBtb2RhbENhbmNlbFRleHQsXHJcbiAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICBidXN5LFxyXG4gIG1vZGFsRXJyb3IsXHJcbiAgc3RhdHVzLFxyXG4gIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcclxuICBjbG9zZUNvbmZpcm0sXHJcbn06IHtcclxuICBtb2RhbDoge1xyXG4gICAgb3BlbjogYm9vbGVhbjtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBzaG93Q2FuY2VsOiBib29sZWFuO1xyXG4gICAgc2hvd0NvbmZpcm06IGJvb2xlYW47XHJcbiAgfTtcclxuICBtb2RhbENvbmZpcm1UZXh0OiBzdHJpbmc7XHJcbiAgbW9kYWxDYW5jZWxUZXh0OiBzdHJpbmc7XHJcbiAgbW9kYWxMb2FkaW5nVGV4dDogc3RyaW5nO1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxFcnJvcjogc3RyaW5nO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybTogKCkgPT4gdm9pZDtcclxuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbn0pID0+ICh7XHJcbiAgb3BlbjogbW9kYWwub3BlbixcclxuICB0aXRsZTogbW9kYWwudGl0bGUsXHJcbiAgbWVzc2FnZTogbW9kYWwubWVzc2FnZSxcclxuICBjb25maXJtVGV4dDogbW9kYWxDb25maXJtVGV4dCxcclxuICBjYW5jZWxUZXh0OiBtb2RhbENhbmNlbFRleHQsXHJcbiAgbG9hZGluZ1RleHQ6IG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgc2hvd0NhbmNlbDogbW9kYWwuc2hvd0NhbmNlbCxcclxuICBzaG93Q29uZmlybTogbW9kYWwuc2hvd0NvbmZpcm0sXHJcbiAgYnVzeSxcclxuICBlcnJvcjogbW9kYWxFcnJvcixcclxuICBzdGF0dXMsXHJcbiAgb25Db25maXJtOiBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgb25DYW5jZWw6IGNsb3NlQ29uZmlybSxcclxufSk7XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3VmlldyA9ICh7XHJcbiAgcHJldmlld09wZW4sXHJcbiAgcHJldmlld0J1c3ksXHJcbiAgcHJldmlld0Vycm9yLFxyXG4gIHByZXZpZXdJbWFnZVVybCxcclxuICBwcmV2aWV3QWx0VGV4dCxcclxuICBwcmV2aWV3U2NhbGUsXHJcbiAgcHJldmlld1RyYW5zbGF0ZSxcclxuICBwcmV2aWV3U3VyZmFjZVJlZixcclxuICBjbG9zZVByZXZpZXcsXHJcbiAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcclxuICBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxuICBoYW5kbGVQcmV2aWV3V2hlZWwsXHJcbn06IHtcclxuICBwcmV2aWV3T3BlbjogYm9vbGVhbjtcclxuICBwcmV2aWV3QnVzeTogYm9vbGVhbjtcclxuICBwcmV2aWV3RXJyb3I6IHN0cmluZztcclxuICBwcmV2aWV3SW1hZ2VVcmw6IHN0cmluZztcclxuICBwcmV2aWV3QWx0VGV4dDogc3RyaW5nO1xyXG4gIHByZXZpZXdTY2FsZTogbnVtYmVyO1xyXG4gIHByZXZpZXdUcmFuc2xhdGU6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfTtcclxuICBwcmV2aWV3U3VyZmFjZVJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgY2xvc2VQcmV2aWV3OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bjogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZTogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgaGFuZGxlUHJldmlld1doZWVsOiAoZXZlbnQ6IFJlYWN0LldoZWVsRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG59KSA9PiAoe1xyXG4gIG9wZW46IHByZXZpZXdPcGVuLFxyXG4gIGJ1c3k6IHByZXZpZXdCdXN5LFxyXG4gIGVycm9yOiBwcmV2aWV3RXJyb3IsXHJcbiAgaW1hZ2VVcmw6IHByZXZpZXdJbWFnZVVybCxcclxuICBpbWFnZUFsdDogcHJldmlld0FsdFRleHQsXHJcbiAgc2NhbGU6IHByZXZpZXdTY2FsZSxcclxuICB0cmFuc2xhdGU6IHByZXZpZXdUcmFuc2xhdGUsXHJcbiAgc3VyZmFjZVJlZjogcHJldmlld1N1cmZhY2VSZWYsXHJcbiAgb25DbG9zZTogY2xvc2VQcmV2aWV3LFxyXG4gIG9uUG9pbnRlckRvd246IGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcclxuICBvblBvaW50ZXJNb3ZlOiBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXHJcbiAgb25Qb2ludGVyRW5kOiBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxuICBvbldoZWVsOiBoYW5kbGVQcmV2aWV3V2hlZWwsXHJcbn0pO1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXcgPSAoe1xyXG4gIGlzTG9hZGluZyxcclxuICBlcnJvck1lc3NhZ2UsXHJcbiAgaGVhZGVyLFxyXG4gIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gIHByZXZpZXdCdXN5LFxyXG4gIHByZXZpZXdFcnJvcixcclxuICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgcHJldmlld0FsdFRleHQsXHJcbiAgb3BlbkZpbGUsXHJcbiAgc3RhdHVzTGFiZWwsXHJcbiAgZ2FzdG9UeXBlTGFiZWwsXHJcbiAgdG90YWxBbW91bnRUZXh0LFxyXG4gIHRyYW5zRGF0ZVRleHQsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkZXNjcmlwdGlvbkludmFsaWQsXHJcbiAgZGVzY3JpcHRpb25JbnB1dFJlZixcclxuICBkcmFmdEdhc3RvVHlwZSxcclxuICBnYXN0b1R5cGVJbnZhbGlkLFxyXG4gIGdhc3RvVHlwZUlucHV0UmVmLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGN1cnJlbmN5Q29kZUludmFsaWQsXHJcbiAgY3VycmVuY3lJbnB1dFJlZixcclxuICBkcmFmdFRyYW5zRGF0ZSxcclxuICBkcmFmdFVybEZpbGUsXHJcbiAgZHJhZnRGaWxlTmFtZSxcclxuICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gIHNldERyYWZ0R2FzdG9UeXBlLFxyXG4gIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIHNldERyYWZ0VHJhbnNEYXRlLFxyXG4gIGlzRnJvbVNoZWV0TGluayxcclxuICBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0LFxyXG4gIHZpc2libGVMaW5lcyxcclxuICB0b3RhbExpbmVQYWdlcyxcclxuICBsaW5lUGFnZSxcclxuICBzYWZlQ3VycmVuY3lDb2RlLFxyXG4gIHBhZ2luYXRpb25MYWJlbHMsXHJcbiAgbGluZUNvbnRhaW5lclJlZixcclxuICBzZXRMaW5lUGFnZSxcclxuICBvcGVuTGluZURldGFpbCxcclxuICBzdGF0dXMsXHJcbn06IHtcclxuICBpc0xvYWRpbmc6IGJvb2xlYW47XHJcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbDtcclxuICBzaG93U3RpY2t5UHJldmlldzogYm9vbGVhbjtcclxuICBwcmV2aWV3QnVzeTogYm9vbGVhbjtcclxuICBwcmV2aWV3RXJyb3I6IHN0cmluZztcclxuICBwcmV2aWV3SW1hZ2VVcmw6IHN0cmluZztcclxuICBwcmV2aWV3QWx0VGV4dDogc3RyaW5nO1xyXG4gIG9wZW5GaWxlOiAoKSA9PiB2b2lkO1xyXG4gIHN0YXR1c0xhYmVsOiBzdHJpbmc7XHJcbiAgZ2FzdG9UeXBlTGFiZWw6IHN0cmluZztcclxuICB0b3RhbEFtb3VudFRleHQ6IHN0cmluZztcclxuICB0cmFuc0RhdGVUZXh0OiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGdhc3RvVHlwZU9wdGlvbnM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXTtcclxuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb25JbnZhbGlkOiBib29sZWFuO1xyXG4gIGRlc2NyaXB0aW9uSW5wdXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcclxuICBnYXN0b1R5cGVJbnZhbGlkOiBib29sZWFuO1xyXG4gIGdhc3RvVHlwZUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZDogYm9vbGVhbjtcclxuICBjdXJyZW5jeUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XHJcbiAgZHJhZnRGaWxlTmFtZTogc3RyaW5nO1xyXG4gIHNldERyYWZ0RGVzY3JpcHRpb246ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldERyYWZ0R2FzdG9UeXBlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXREcmFmdEN1cnJlbmN5Q29kZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0RHJhZnRUcmFuc0RhdGU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGlzRnJvbVNoZWV0TGluazogYm9vbGVhbjtcclxuICBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0OiAoKSA9PiB2b2lkO1xyXG4gIHZpc2libGVMaW5lczogRXhwZW5zZVRpY2tldERldGFpbExpbmVbXTtcclxuICB0b3RhbExpbmVQYWdlczogbnVtYmVyO1xyXG4gIGxpbmVQYWdlOiBudW1iZXI7XHJcbiAgc2FmZUN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIHBhZ2luYXRpb25MYWJlbHM6IHtcclxuICAgIGZpcnN0OiBzdHJpbmc7XHJcbiAgICBwcmV2OiBzdHJpbmc7XHJcbiAgICBuZXh0OiBzdHJpbmc7XHJcbiAgICBsYXN0OiBzdHJpbmc7XHJcbiAgfTtcclxuICBsaW5lQ29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBzZXRMaW5lUGFnZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcclxuICBvcGVuTGluZURldGFpbDogKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG59KSA9PiAoe1xyXG4gIGlzTG9hZGluZyxcclxuICBlcnJvck1lc3NhZ2UsXHJcbiAgaGVhZGVyLFxyXG4gIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gIHByZXZpZXdCdXN5LFxyXG4gIHByZXZpZXdFcnJvcixcclxuICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgcHJldmlld0ZpbGVOYW1lOiBwcmV2aWV3QWx0VGV4dCxcclxuICBwcmV2aWV3QWx0VGV4dCxcclxuICBvbk9wZW5QcmV2aWV3OiBvcGVuRmlsZSxcclxuICBzdGF0dXNMYWJlbCxcclxuICBnYXN0b1R5cGVMYWJlbCxcclxuICB0b3RhbEFtb3VudFRleHQsXHJcbiAgdHJhbnNEYXRlVGV4dCxcclxuICBpc0VkaXRpbmcsXHJcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICBkZXNjcmlwdGlvbklucHV0UmVmLFxyXG4gIGRyYWZ0R2FzdG9UeXBlLFxyXG4gIGdhc3RvVHlwZUludmFsaWQsXHJcbiAgZ2FzdG9UeXBlSW5wdXRSZWYsXHJcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICBjdXJyZW5jeUlucHV0UmVmLFxyXG4gIGRyYWZ0VHJhbnNEYXRlLFxyXG4gIGRyYWZ0VXJsRmlsZSxcclxuICBkcmFmdEZpbGVOYW1lLFxyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlOiBzZXREcmFmdEdhc3RvVHlwZSxcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICBvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlOiBzZXREcmFmdFRyYW5zRGF0ZSxcclxuICBvbk9wZW5GaWxlOiBvcGVuRmlsZSxcclxuICBvbk9wZW5FeHBlbnNlU2hlZXQ6IGlzRnJvbVNoZWV0TGluayA/IHVuZGVmaW5lZCA6IGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQsXHJcbiAgdmlzaWJsZUxpbmVzLFxyXG4gIHRvdGFsTGluZVBhZ2VzLFxyXG4gIGxpbmVQYWdlLFxyXG4gIGN1cnJlbmN5Q29kZTogc2FmZUN1cnJlbmN5Q29kZSxcclxuICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gIGNvbnRhaW5lclJlZjogbGluZUNvbnRhaW5lclJlZixcclxuICBvbkxpbmVQYWdlQ2hhbmdlOiBzZXRMaW5lUGFnZSxcclxuICBvbk9wZW5MaW5lOiBvcGVuTGluZURldGFpbCxcclxuICBzdGF0dXMsXHJcbn0pO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3QXJncyA9IFBhcmFtZXRlcnM8dHlwZW9mIGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbE1vZGFsVmlldz5bMF07XHJcbnR5cGUgRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3QXJncyA9IFBhcmFtZXRlcnM8dHlwZW9mIGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3PlswXTtcclxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXdBcmdzID0gUGFyYW1ldGVyczx0eXBlb2YgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsQ29udGVudFZpZXc+WzBdO1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUGFnZVZpZXdNb2RlbCA9ICh7XHJcbiAgbW9kYWxBcmdzLFxyXG4gIHByZXZpZXdBcmdzLFxyXG4gIGNvbnRlbnRBcmdzLFxyXG59OiB7XHJcbiAgbW9kYWxBcmdzOiBFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3QXJncztcclxuICBwcmV2aWV3QXJnczogRXhwZW5zZVRpY2tldERldGFpbFByZXZpZXdWaWV3QXJncztcclxuICBjb250ZW50QXJnczogRXhwZW5zZVRpY2tldERldGFpbENvbnRlbnRWaWV3QXJncztcclxufSkgPT4gKHtcclxuICBtb2RhbDogYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsTW9kYWxWaWV3KG1vZGFsQXJncyksXHJcbiAgcHJldmlldzogYnVpbGRFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1ZpZXcocHJldmlld0FyZ3MpLFxyXG4gIGNvbnRlbnQ6IGJ1aWxkRXhwZW5zZVRpY2tldERldGFpbENvbnRlbnRWaWV3KGNvbnRlbnRBcmdzKSxcclxufSk7XHJcblxyXG4vLyBLZWVwcyBmaWx0ZXIgY2FjaGUgd2lyaW5nIGFuZCBiYWNrIG5hdmlnYXRpb24gb3V0c2lkZSB0aGUgcGFnZSBjb250YWluZXIgYm9keS5cclxuY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbE5hdmlnYXRpb25TdGF0ZSA9ICh7XHJcbiAgZmlsZUlkLFxyXG4gIGRldGFpbE9yaWdpbixcclxuICBoZWFkZXJUcmFuc0RhdGUsXHJcbiAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxufToge1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGRldGFpbE9yaWdpbjogc3RyaW5nO1xyXG4gIGhlYWRlclRyYW5zRGF0ZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0OiBSZXR1cm5UeXBlPHR5cGVvZiB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0PltcInRpY2tldFJldHVybkNvbnRleHRcIl07XHJcbn0pID0+IHtcclxuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgc2F2ZUNhY2hlZFN0YXRlLCBtYXJrUmVzZXRGaWx0ZXJzUmV0dXJuLCBjbGVhckNhY2hlZFN0YXRlIH0gPSB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlKCk7XHJcblxyXG4gIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxCYWNrTmF2aWdhdGlvbih7XHJcbiAgICBmaWxlSWQsXHJcbiAgICBkZXRhaWxPcmlnaW4sXHJcbiAgICBoZWFkZXJUcmFuc0RhdGUsXHJcbiAgICB0aWNrZXRSZXR1cm5Db250ZXh0LFxyXG4gICAgcmVhZENhY2hlZFN0YXRlLFxyXG4gICAgc2F2ZUNhY2hlZFN0YXRlLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbWFya1Jlc2V0RmlsdGVyc1JldHVybixcclxuICAgIGNsZWFyQ2FjaGVkU3RhdGUsXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFJ1bnMgdGhlIG9uZS1zaG90IGF1dG8gZWRpdCB0cmFuc2l0aW9uIGZvciBsaW5rZWQgY29udGV4dHMgYWZ0ZXIgZGV0YWlsIGRhdGEgaXMgcmVhZHkuXHJcbmNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxBdXRvRWRpdCA9ICh7XHJcbiAgYXV0b0VkaXRNb2RlLFxyXG4gIGlzRnJvbUV4cGVuc2VMaW5lLFxyXG4gIGlzRnJvbVNoZWV0TGluayxcclxuICBpc0xvYWRpbmcsXHJcbiAgaGVhZGVyLFxyXG4gIGhhbmRsZUVuYWJsZUVkaXQsXHJcbn06IHtcclxuICBhdXRvRWRpdE1vZGU6IGJvb2xlYW47XHJcbiAgaXNGcm9tRXhwZW5zZUxpbmU6IGJvb2xlYW47XHJcbiAgaXNGcm9tU2hlZXRMaW5rOiBib29sZWFuO1xyXG4gIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xyXG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XHJcbn0pID0+IHtcclxuICBjb25zdCBhdXRvRWRpdEF0dGVtcHRlZFJlZiA9IHVzZVJlZihmYWxzZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWF1dG9FZGl0TW9kZSB8fCBpc0Zyb21FeHBlbnNlTGluZSB8fCBpc0Zyb21TaGVldExpbmsgfHwgYXV0b0VkaXRBdHRlbXB0ZWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgaWYgKGlzTG9hZGluZyB8fCAhaGVhZGVyKSByZXR1cm47XHJcblxyXG4gICAgYXV0b0VkaXRBdHRlbXB0ZWRSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICBoYW5kbGVFbmFibGVFZGl0KCk7XHJcbiAgfSwgW2F1dG9FZGl0TW9kZSwgaGFuZGxlRW5hYmxlRWRpdCwgaGVhZGVyLCBpc0Zyb21FeHBlbnNlTGluZSwgaXNGcm9tU2hlZXRMaW5rLCBpc0xvYWRpbmddKTtcclxufTtcclxuXHJcbi8vIFJlc29sdmVzIHBlcm1pc3Npb24gYW5kIGFjdGluZy11c2VyIHN0YXRlIHNvIHRoZSBwYWdlIGNvbnRhaW5lciBzdGF5cyBmb2N1c2VkIG9uIG9yY2hlc3RyYXRpb24uXHJcbmNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQZXJtaXNzaW9uU3RhdGUgPSAoe1xyXG4gIGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSxcclxufToge1xyXG4gIGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZTogYm9vbGVhbjtcclxufSkgPT4ge1xyXG4gIGNvbnN0IHsgY2FuTWFuYWdlT3RoZXJVc2VycywgY3VycmVudEF4VXNlcklkLCBzZWxlY3RlZE1hbmFnZWRVc2VySWQsIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSB9ID0gdXNlQXV0aENvbnRleHQoKTtcclxuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIlZpZXdcIik7XHJcbiAgY29uc3QgY2FuRWRpdFRpY2tldEJ5TW9kdWxlID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJFZGl0XCIpO1xyXG4gIGNvbnN0IGNhbkRlbGV0ZVRpY2tldEJ5TW9kdWxlID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJGdWxsQWNjZXNzXCIpO1xyXG4gIGNvbnN0IGlzTWFuYWdpbmdPdGhlclVzZXIgPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlVXNlcih7XHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGFzQWNjZXNzLFxyXG4gICAgY2FuRWRpdFRpY2tldDogY2FuRWRpdFRpY2tldEJ5TW9kdWxlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgY2FuRGVsZXRlVGlja2V0OiBjYW5EZWxldGVUaWNrZXRCeU1vZHVsZSAmJiAhaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgIGFsbG93QXNzaWduZWREcmFmdEVkaXQ6IGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSxcclxuICAgIGlzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIE93bnMgdGhlIHRpY2tldCBkZXRhaWwgcGFnZSBvcmNoZXN0cmF0aW9uIHdoaWxlIHRoZSBjb21wb25lbnQgc3RheXMgdGhpbiBmb3IgcmVuZGVyaW5nLlxyXG5jb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUGFnZVZpZXdNb2RlbCA9ICgpID0+IHtcclxuICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1RJQ0tFVF9GSUxFX0lEX18pO1xyXG4gIGNvbnN0IGxpbmVDb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCB7XHJcbiAgICBhdXRvRWRpdE1vZGUsXHJcbiAgICBkZXRhaWxPcmlnaW4sXHJcbiAgICBjb250ZXh0U2hlZXRJZCxcclxuICAgIGNvbnRleHRMaW5lUmVjSWQsXHJcbiAgICBpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUsXHJcbiAgICBpc0Zyb21FeHBlbnNlTGluZSxcclxuICAgIGlzRnJvbVNoZWV0TGluayxcclxuICAgIHRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQoKTtcclxuICBjb25zdCB7XHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBjYW5FZGl0VGlja2V0LFxyXG4gICAgY2FuRGVsZXRlVGlja2V0LFxyXG4gICAgYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCxcclxuICAgIGlzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQZXJtaXNzaW9uU3RhdGUoe1xyXG4gICAgaXNGcm9tRXhwZW5zZVNoZWV0Q3JlYXRlLFxyXG4gIH0pO1xyXG4gIGNvbnN0IGdhc3RvVHlwZU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4ge1xyXG4gICAgY29uc3Qgc291cmNlID0gQXJyYXkuaXNBcnJheSh3aW5kb3cuX19FWFBFTlNFX0dBU1RPX1RZUEVTX18pID8gd2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fIDogW107XHJcbiAgICBjb25zdCBtYXBwZWQgPSBtYXBXaW5kb3dFbnVtT3B0aW9ucyhzb3VyY2UpLmZpbHRlcigoZW50cnkpID0+IHtcclxuICAgICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKGVudHJ5LnZhbHVlKTtcclxuICAgICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIocGFyc2VkKSAmJiBBTExPV0VEX0dBU1RPX1RZUEVTLmhhcyhwYXJzZWQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKG1hcHBlZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBtYXBwZWQuc29ydCgobGVmdCwgcmlnaHQpID0+IE51bWJlcihsZWZ0LnZhbHVlKSAtIE51bWJlcihyaWdodC52YWx1ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBidWlsZEZhbGxiYWNrR2FzdG9UeXBlT3B0aW9ucygpO1xyXG4gIH0sIFtdKTtcclxuICBjb25zdCBnYXN0b1R5cGVMYWJlbE1hcCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcclxuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIGdhc3RvVHlwZU9wdGlvbnMpIHtcclxuICAgICAgbWFwLnNldChTdHJpbmcob3B0aW9uLnZhbHVlKSwgb3B0aW9uLnRleHQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1hcDtcclxuICB9LCBbZ2FzdG9UeXBlT3B0aW9uc10pO1xyXG4gIGNvbnN0IHsgaGVhZGVyLCBsaW5lcywgaXNMb2FkaW5nLCBlcnJvck1lc3NhZ2UsIHJlbG9hZERldGFpbCB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlKHtcclxuICAgIGhhc0FjY2VzcyxcclxuICAgIGZpbGVJZCxcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gIH0pO1xyXG4gIGNvbnN0IHsgbWFya1Jlc2V0RmlsdGVyc1JldHVybiwgY2xlYXJDYWNoZWRTdGF0ZSB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbE5hdmlnYXRpb25TdGF0ZSh7XHJcbiAgICBmaWxlSWQsXHJcbiAgICBkZXRhaWxPcmlnaW4sXHJcbiAgICBoZWFkZXJUcmFuc0RhdGU6IGhlYWRlcj8udHJhbnNEYXRlLFxyXG4gICAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxuICB9KTtcclxuICBjb25zdCB7XHJcbiAgICBidXN5LFxyXG4gICAgc3RhdHVzLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxFcnJvcixcclxuICAgIGxpbmVQYWdlLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRlc2NyaXB0aW9uSW52YWxpZCxcclxuICAgIGRlc2NyaXB0aW9uSW5wdXRSZWYsXHJcbiAgICBkcmFmdEdhc3RvVHlwZSxcclxuICAgIGdhc3RvVHlwZUludmFsaWQsXHJcbiAgICBnYXN0b1R5cGVJbnB1dFJlZixcclxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICAgIGN1cnJlbmN5SW5wdXRSZWYsXHJcbiAgICBkcmFmdFRyYW5zRGF0ZSxcclxuICAgIGRyYWZ0Q29tZW50YXJpbyxcclxuICAgIGRyYWZ0VXJsRmlsZSxcclxuICAgIGRyYWZ0RmlsZU5hbWUsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldExpbmVQYWdlLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgIHNldERyYWZ0R2FzdG9UeXBlLFxyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBzZXREcmFmdFRyYW5zRGF0ZSxcclxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yKHtcclxuICAgIGhlYWRlcixcclxuICAgIGxpbmVDb3VudDogbGluZXMubGVuZ3RoLFxyXG4gICAgcGFnZVNpemU6IExJTkVTX1BBR0VfU0laRSxcclxuICAgIGNhbkVkaXRUaWNrZXQsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0LFxyXG4gICAgaXNGcm9tU2hlZXRMaW5rLFxyXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXHJcbiAgfSk7XHJcbiAgY29uc3QgeyBwYWdpbmF0aW9uTGFiZWxzLCBwcmV2aWV3QWx0VGV4dCwgc3RhdHVzTGFiZWwsIGdhc3RvVHlwZUxhYmVsLCB0b3RhbEFtb3VudFRleHQsIHRyYW5zRGF0ZVRleHQgfSA9XHJcbiAgICB1c2VFeHBlbnNlVGlja2V0RGV0YWlsRGlzcGxheSh7XHJcbiAgICAgIGhlYWRlcixcclxuICAgICAgZHJhZnRHYXN0b1R5cGUsXHJcbiAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgICBkcmFmdFRyYW5zRGF0ZSxcclxuICAgICAgZHJhZnRGaWxlTmFtZSxcclxuICAgICAgaXNFZGl0aW5nLFxyXG4gICAgICBnYXN0b1R5cGVMYWJlbE1hcCxcclxuICAgIH0pO1xyXG4gIGNvbnN0IHtcclxuICAgIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gICAgcHJldmlld09wZW4sXHJcbiAgICBwcmV2aWV3QnVzeSxcclxuICAgIHByZXZpZXdFcnJvcixcclxuICAgIHByZXZpZXdJbWFnZVVybCxcclxuICAgIHByZXZpZXdTY2FsZSxcclxuICAgIHByZXZpZXdUcmFuc2xhdGUsXHJcbiAgICBwcmV2aWV3U3VyZmFjZVJlZixcclxuICAgIG9wZW5QcmV2aWV3LFxyXG4gICAgY2xvc2VQcmV2aWV3LFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlLFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXHJcbiAgICBoYW5kbGVQcmV2aWV3V2hlZWwsXHJcbiAgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxQcmV2aWV3UGFuZWwoe1xyXG4gICAgZmlsZUlkLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgZHJhZnRVcmxGaWxlLFxyXG4gICAgaGVhZGVyVXJsRmlsZTogaGVhZGVyPy51cmxGaWxlLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB2aXNpYmxlTGluZXMgPSB1c2VNZW1vKCgpID0+IHBhZ2VkU2xpY2UobGluZXMsIGxpbmVQYWdlLCBMSU5FU19QQUdFX1NJWkUpLCBbbGluZVBhZ2UsIGxpbmVzXSk7XHJcbiAgY29uc3QgdG90YWxMaW5lUGFnZXMgPSBNYXRoLmNlaWwoKGxpbmVzLmxlbmd0aCB8fCAwKSAvIExJTkVTX1BBR0VfU0laRSk7XHJcblxyXG4gIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxBdXRvRWRpdCh7XHJcbiAgICBhdXRvRWRpdE1vZGUsXHJcbiAgICBpc0Zyb21FeHBlbnNlTGluZSxcclxuICAgIGlzRnJvbVNoZWV0TGluayxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGhlYWRlcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHsgaGFuZGxlVXBkYXRlLCBoYW5kbGVEZWxldGUgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnMoe1xyXG4gICAgYnVzeSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGNhbkVkaXRUaWNrZXQsXHJcbiAgICBjYW5EZWxldGVUaWNrZXQsXHJcbiAgICBmaWxlSWQsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRHYXN0b1R5cGUsXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIGRyYWZ0VHJhbnNEYXRlLFxyXG4gICAgZHJhZnRDb21lbnRhcmlvLFxyXG4gICAgZHJhZnRVcmxGaWxlLFxyXG4gICAgZHJhZnRGaWxlTmFtZSxcclxuICAgIGxpbmtlZEV4cGVuc2VTaGVldElkOiBjb250ZXh0U2hlZXRJZCxcclxuICAgIGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dDogaXNGcm9tRXhwZW5zZUxpbmVcclxuICAgICAgPyB7XHJcbiAgICAgICAgICBzaGVldElkOiBjb250ZXh0U2hlZXRJZCxcclxuICAgICAgICAgIGxpbmVSZWNJZDogY29udGV4dExpbmVSZWNJZCxcclxuICAgICAgICB9XHJcbiAgICAgIDogbnVsbCxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBtb2RhbExvYWRpbmdUZXh0LCBtb2RhbENhbmNlbFRleHQsIG1vZGFsQ29uZmlybVRleHQsIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSB9ID1cclxuICAgIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGUoe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBtb2RhbEVycm9yLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICB9KTtcclxuXHJcbiAgY29uc3QgaXNBc3NpZ25lZFRpY2tldCA9IGhlYWRlcj8uc3RhdHVzID09PSAxO1xyXG4gIGNvbnN0IGlzQ29udGV4dExvY2tlZCA9IGlzQXNzaWduZWRUaWNrZXQgJiYgIWFsbG93QXNzaWduZWREcmFmdEVkaXQ7XHJcbiAgY29uc3QgY2FuRWRpdFRpY2tldEluQ29udGV4dCA9IGNhbkVkaXRUaWNrZXQgJiYgIWlzRnJvbUV4cGVuc2VMaW5lICYmICFpc0Zyb21TaGVldExpbms7XHJcbiAgY29uc3QgY2FuRGVsZXRlVGlja2V0SW5Db250ZXh0ID0gY2FuRGVsZXRlVGlja2V0ICYmICFpc0Zyb21FeHBlbnNlTGluZSAmJiAhaXNGcm9tU2hlZXRMaW5rO1xyXG4gIGNvbnN0IHRpY2tldFRvcGJhckFjdGlvbk1vZGU6IFwiZGVmYXVsdFwiIHwgXCJ2aWV3X29ubHlcIiA9XHJcbiAgICBpc01hbmFnaW5nT3RoZXJVc2VyIHx8IGlzRnJvbUV4cGVuc2VMaW5lIHx8IGlzRnJvbVNoZWV0TGluayA/IFwidmlld19vbmx5XCIgOiBcImRlZmF1bHRcIjtcclxuXHJcbiAgdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMoe1xyXG4gICAgYnVzeSxcclxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzTG9ja2VkOiBpc0NvbnRleHRMb2NrZWQsXHJcbiAgICBhY3Rpb25Nb2RlOiB0aWNrZXRUb3BiYXJBY3Rpb25Nb2RlLFxyXG4gICAgcGVybWlzc2lvbnNSZWFkeTogbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gICAgY2FuRWRpdFRpY2tldDogY2FuRWRpdFRpY2tldEluQ29udGV4dCxcclxuICAgIGNhbkRlbGV0ZVRpY2tldDogY2FuRGVsZXRlVGlja2V0SW5Db250ZXh0LFxyXG4gICAgZmlsZUlkLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgb25TYXZlU3VjY2VzczogKCkgPT4ge1xyXG4gICAgICB2b2lkIHJlbG9hZERldGFpbCgpO1xyXG4gICAgfSxcclxuICAgIG9uRGVsZXRlU3VjY2VzczogKCkgPT4ge1xyXG4gICAgICBpZiAodGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZCkge1xyXG4gICAgICAgIGNsZWFyQ2FjaGVkU3RhdGUoKTtcclxuICAgICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChidWlsZEV4cGVuc2VTaGVldERldGFpbFVybCh0aWNrZXRSZXR1cm5Db250ZXh0LnNoZWV0SWQpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG1hcmtSZXNldEZpbHRlcnNSZXR1cm4oKTtcclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL1RpY2tldHNcIik7XHJcbiAgICB9LFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHsgb3BlbkxpbmVEZXRhaWwsIHJlc29sdmVDbGlja2FibGVDYXJkLCBvcGVuRmlsZSwgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9ucyh7XHJcbiAgICBidXN5LFxyXG4gICAgZmlsZUlkLFxyXG4gICAgY29udGV4dFNoZWV0SWQsXHJcbiAgICBpc0Zyb21FeHBlbnNlTGluZSxcclxuICAgIGlzRnJvbVNoZWV0TGluayxcclxuICAgIGhlYWRlckV4cGVuc2VTaGVldElkOiBzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZERpc3BsYXkpLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgbGluZUNvbnRhaW5lclJlZixcclxuICAgIG9wZW5QcmV2aWV3LFxyXG4gICAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxuICB9KTtcclxuXHJcbiAgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyh7XHJcbiAgICBjb250YWluZXJSZWY6IGxpbmVDb250YWluZXJSZWYsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBpdGVtczogdmlzaWJsZUxpbmVzLFxyXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGRldGFpbFZpZXcgPSBidWlsZEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlVmlld01vZGVsKHtcclxuICAgIG1vZGFsQXJnczoge1xyXG4gICAgICBtb2RhbCxcclxuICAgICAgbW9kYWxDb25maXJtVGV4dCxcclxuICAgICAgbW9kYWxDYW5jZWxUZXh0LFxyXG4gICAgICBtb2RhbExvYWRpbmdUZXh0LFxyXG4gICAgICBidXN5LFxyXG4gICAgICBtb2RhbEVycm9yLFxyXG4gICAgICBzdGF0dXMsXHJcbiAgICAgIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcclxuICAgICAgY2xvc2VDb25maXJtLFxyXG4gICAgfSxcclxuICAgIHByZXZpZXdBcmdzOiB7XHJcbiAgICAgIHByZXZpZXdPcGVuLFxyXG4gICAgICBwcmV2aWV3QnVzeSxcclxuICAgICAgcHJldmlld0Vycm9yLFxyXG4gICAgICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgICAgIHByZXZpZXdBbHRUZXh0LFxyXG4gICAgICBwcmV2aWV3U2NhbGUsXHJcbiAgICAgIHByZXZpZXdUcmFuc2xhdGUsXHJcbiAgICAgIHByZXZpZXdTdXJmYWNlUmVmLFxyXG4gICAgICBjbG9zZVByZXZpZXcsXHJcbiAgICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcclxuICAgICAgaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlLFxyXG4gICAgICBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxuICAgICAgaGFuZGxlUHJldmlld1doZWVsLFxyXG4gICAgfSxcclxuICAgIGNvbnRlbnRBcmdzOiB7XHJcbiAgICAgIGlzTG9hZGluZyxcclxuICAgICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgICBoZWFkZXIsXHJcbiAgICAgIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gICAgICBwcmV2aWV3QnVzeSxcclxuICAgICAgcHJldmlld0Vycm9yLFxyXG4gICAgICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgICAgIHByZXZpZXdBbHRUZXh0LFxyXG4gICAgICBvcGVuRmlsZSxcclxuICAgICAgc3RhdHVzTGFiZWwsXHJcbiAgICAgIGdhc3RvVHlwZUxhYmVsLFxyXG4gICAgICB0b3RhbEFtb3VudFRleHQsXHJcbiAgICAgIHRyYW5zRGF0ZVRleHQsXHJcbiAgICAgIGlzRWRpdGluZyxcclxuICAgICAgZ2FzdG9UeXBlT3B0aW9ucyxcclxuICAgICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgICAgZGVzY3JpcHRpb25JbnZhbGlkLFxyXG4gICAgICBkZXNjcmlwdGlvbklucHV0UmVmLFxyXG4gICAgICBkcmFmdEdhc3RvVHlwZSxcclxuICAgICAgZ2FzdG9UeXBlSW52YWxpZCxcclxuICAgICAgZ2FzdG9UeXBlSW5wdXRSZWYsXHJcbiAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgICBjdXJyZW5jeUNvZGVJbnZhbGlkLFxyXG4gICAgICBjdXJyZW5jeUlucHV0UmVmLFxyXG4gICAgICBkcmFmdFRyYW5zRGF0ZSxcclxuICAgICAgZHJhZnRVcmxGaWxlLFxyXG4gICAgICBkcmFmdEZpbGVOYW1lLFxyXG4gICAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgICBzZXREcmFmdEdhc3RvVHlwZSxcclxuICAgICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICAgIHNldERyYWZ0VHJhbnNEYXRlLFxyXG4gICAgICBpc0Zyb21TaGVldExpbmssXHJcbiAgICAgIGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQsXHJcbiAgICAgIHZpc2libGVMaW5lcyxcclxuICAgICAgdG90YWxMaW5lUGFnZXMsXHJcbiAgICAgIGxpbmVQYWdlLFxyXG4gICAgICBzYWZlQ3VycmVuY3lDb2RlOiBpc0VkaXRpbmcgPyBkcmFmdEN1cnJlbmN5Q29kZSA6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcclxuICAgICAgcGFnaW5hdGlvbkxhYmVscyxcclxuICAgICAgbGluZUNvbnRhaW5lclJlZixcclxuICAgICAgc2V0TGluZVBhZ2UsXHJcbiAgICAgIG9wZW5MaW5lRGV0YWlsLFxyXG4gICAgICBzdGF0dXMsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gZGV0YWlsVmlldztcclxufTtcclxuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlQ29udGVudCA9ICgpID0+IHtcclxuICBjb25zdCBkZXRhaWxWaWV3ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbFBhZ2VWaWV3TW9kZWwoKTtcclxuXHJcbiAgcmV0dXJuIDxFeHBlbnNlVGlja2V0RGV0YWlsVmlldyBtb2RhbD17ZGV0YWlsVmlldy5tb2RhbH0gcHJldmlldz17ZGV0YWlsVmlldy5wcmV2aWV3fSBjb250ZW50PXtkZXRhaWxWaWV3LmNvbnRlbnR9IC8+O1xyXG59O1xyXG5cclxuLy8gTWFpbiBwYWdlIGVudHJ5IGZvciBleHBlbnNlIHRpY2tldCBkZXRhaWwuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnMgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQ+XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0RGV0YWlsUGFnZUNvbnRlbnQgLz5cclxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XHJcbiAgKTtcclxufTtcclxuXHJcbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xyXG4gIGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoKCk7XHJcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtcm9vdFwiKTtcclxuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xyXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVRpY2tldERldGFpbFBhZ2UgLz4pO1xyXG59O1xyXG5cclxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0RGV0YWlsUGFnZTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIsIEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IG1hcEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIsIG1hcEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZUFyZ3MgPSB7XHJcbiAgaGFzQWNjZXNzOiBib29sZWFuO1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gT3ducyByZWFkIHN0YXRlIGFuZCBBUEkgbG9hZGluZyBiZWhhdmlvciBmb3IgdGhlIHRpY2tldCBkZXRhaWwgcGFnZS5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZSA9ICh7IGhhc0FjY2VzcywgZmlsZUlkLCBvbkZvcmJpZGRlbiB9OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGVBcmdzKSA9PiB7XHJcbiAgY29uc3QgW2hlYWRlciwgc2V0SGVhZGVyXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbbGluZXMsIHNldExpbmVzXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lW10+KFtdKTtcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgY29uc3QgcmVsb2FkRGV0YWlsID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKCFoYXNBY2Nlc3MpIHtcclxuICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNhZmVGaWxlSWQgPSBzYWZlVGV4dChmaWxlSWQpO1xyXG4gICAgaWYgKCFzYWZlRmlsZUlkKSB7XHJcbiAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiVGlja2V0c19EZXRhaWxfTm90Rm91bmRcIiwgXCJUaWNrZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldElzTG9hZGluZyh0cnVlKTtcclxuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0KHNhZmVGaWxlSWQsIHtcclxuICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlPy5NZXNzYWdlIHx8IGluZFQoXCJUaWNrZXRzX0RldGFpbF9Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXQgZGV0YWlsLlwiKSk7XHJcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWQgPVxyXG4gICAgICAgIGl0ZW1zLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uRmlsZUlkKS50b1VwcGVyQ2FzZSgpID09PSBzYWZlRmlsZUlkLnRvVXBwZXJDYXNlKCkpIHx8IGl0ZW1zWzBdIHx8IG51bGw7XHJcblxyXG4gICAgICBpZiAoIXNlbGVjdGVkKSB7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJUaWNrZXRzX0RldGFpbF9Ob3RGb3VuZFwiLCBcIlRpY2tldCB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG1hcHBlZEhlYWRlciA9IG1hcEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIoc2VsZWN0ZWQpO1xyXG4gICAgICBjb25zdCBtYXBwZWRMaW5lcyA9IChBcnJheS5pc0FycmF5KHNlbGVjdGVkLkxpbmVzKSA/IHNlbGVjdGVkLkxpbmVzIDogW10pLm1hcCgobGluZSkgPT5cclxuICAgICAgICBtYXBFeHBlbnNlVGlja2V0RGV0YWlsTGluZShsaW5lKVxyXG4gICAgICApO1xyXG4gICAgICBzZXRIZWFkZXIobWFwcGVkSGVhZGVyKTtcclxuICAgICAgc2V0TGluZXMobWFwcGVkTGluZXMpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiVGlja2V0c19EZXRhaWxfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0IGRldGFpbC5cIikpO1xyXG4gICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgIHNldExpbmVzKFtdKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW2ZpbGVJZCwgaGFzQWNjZXNzLCBvbkZvcmJpZGRlbl0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgdm9pZCByZWxvYWREZXRhaWwoKTtcclxuICB9LCBbcmVsb2FkRGV0YWlsXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoZWFkZXIsXHJcbiAgICBsaW5lcyxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIHJlbG9hZERldGFpbCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3QgfSBmcm9tIFwiLi4vLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24gfSBmcm9tIFwiLi4vLi4vaG9va3MvZXhwZW5zZU11dGF0aW9uVXRpbHMudHNcIjtcclxuaW1wb3J0IHtcclxuICBkZWxldGVFeHBlbnNlU2hlZXRMaW5lLFxyXG4gIGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldCxcclxuICBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRGaWxlLFxyXG4gIGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsLFxyXG4gIHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldCxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFLCB0b0V4cGVuc2VBcGlEZE1tWXl5eSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIERlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCA9IHtcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgbGluZVJlY0lkOiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnNBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGNhbkVkaXRUaWNrZXQ6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlVGlja2V0OiBib29sZWFuO1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcclxuICBkcmFmdEdhc3RvVHlwZTogc3RyaW5nO1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRUcmFuc0RhdGU6IHN0cmluZztcclxuICBkcmFmdENvbWVudGFyaW86IHN0cmluZztcclxuICBkcmFmdFVybEZpbGU6IHN0cmluZztcclxuICBkcmFmdEZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgbGlua2VkRXhwZW5zZVNoZWV0SWQ/OiBzdHJpbmc7XHJcbiAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0PzogRGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0IHwgbnVsbDtcclxuICBzZXRNb2RhbEVycm9yOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRJc0VkaXRpbmc6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxufTtcclxuXHJcbmNvbnN0IFJFUVVJUkVEX0dBU1RPX1RZUEVTID0gbmV3IFNldDxudW1iZXI+KFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0pO1xyXG5cclxuY29uc3QgcGFyc2VPcHRpb25hbEludGVnZXIgPSAocmF3OiBzdHJpbmcpOiBudW1iZXIgfCB1bmRlZmluZWQgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKHJhdyB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIucGFyc2VJbnQodmFsdWUsIDEwKTtcclxuICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpID8gcGFyc2VkIDogdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuLy8gVHJpZXMgdG8gaW5mZXIgYSBzYWZlIGV4dGVuc2lvbiBmb3IgdXBkYXRlIHBheWxvYWQgZnJvbSBmaWxlIG5hbWUgb3IgVVJMLlxyXG5jb25zdCByZXNvbHZlVGlja2V0RmlsZUV4dGVuc2lvbiA9IChmaWxlTmFtZTogc3RyaW5nLCB1cmxGaWxlOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xyXG4gIGNvbnN0IHNvdXJjZSA9IFN0cmluZyhmaWxlTmFtZSB8fCBcIlwiKS50cmltKCkgfHwgU3RyaW5nKHVybEZpbGUgfHwgXCJcIikudHJpbSgpO1xyXG4gIGNvbnN0IG1hdGNoID0gc291cmNlLm1hdGNoKC9cXC4oW2EtekEtWjAtOV17MSwxMH0pKD86JHxbPyNdKS8pO1xyXG4gIGlmICghbWF0Y2ggfHwgIW1hdGNoWzFdKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIHJldHVybiBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxuY29uc3QgaXNOb3RGb3VuZEVycm9yID0gKGVycm9yOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwNDtcclxufTtcclxuXHJcbmNvbnN0IGlzTWlzc2luZ1RpY2tldEZpbGVNZXNzYWdlID0gKG1lc3NhZ2U6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKG1lc3NhZ2UgfHwgXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXJjaGl2byBhc29jaWFkb1wiKSB8fFxyXG4gICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImFyY2hpdm8gYWRqdW50b1wiKSB8fFxyXG4gICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImFzc29jaWF0ZWQgZmlsZVwiKSB8fFxyXG4gICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImF0dGFjaGVkIGZpbGVcIilcclxuICApO1xyXG59O1xyXG5cclxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgdGlja2V0IGhlYWRlciBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zID0gKHtcclxuICBidXN5LFxyXG4gIGlzRWRpdGluZyxcclxuICBjYW5FZGl0VGlja2V0LFxyXG4gIGNhbkRlbGV0ZVRpY2tldCxcclxuICBmaWxlSWQsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkcmFmdEdhc3RvVHlwZSxcclxuICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICBkcmFmdFRyYW5zRGF0ZSxcclxuICBkcmFmdENvbWVudGFyaW8sXHJcbiAgZHJhZnRVcmxGaWxlLFxyXG4gIGRyYWZ0RmlsZU5hbWUsXHJcbiAgbGlua2VkRXhwZW5zZVNoZWV0SWQsXHJcbiAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0LFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgc2V0QnVzeSxcclxuICBzZXRTdGF0dXMsXHJcbiAgc2V0SXNFZGl0aW5nLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xyXG4gIGNvbnN0IGhhbmRsZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChidXN5IHx8ICFpc0VkaXRpbmcpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICghY2FuRWRpdFRpY2tldCkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBub3JtYWxpemVkRGVzY3JpcHRpb24gPSBTdHJpbmcoZHJhZnREZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XHJcbiAgICBpZiAoIW5vcm1hbGl6ZWREZXNjcmlwdGlvbikge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9EZXNjcmlwdGlvblJlcXVpcmVkXCIsIFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWQuXCIpO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3kgPSBTdHJpbmcoZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW5jeSkge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9DdXJyZW5jeVJlcXVpcmVkXCIsIFwiQ3VycmVuY3kgaXMgcmVxdWlyZWQuXCIpO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXJzZWRHYXN0b1R5cGUgPSBwYXJzZU9wdGlvbmFsSW50ZWdlcihkcmFmdEdhc3RvVHlwZSk7XHJcbiAgICBpZiAocGFyc2VkR2FzdG9UeXBlID09PSB1bmRlZmluZWQgfHwgIVJFUVVJUkVEX0dBU1RPX1RZUEVTLmhhcyhwYXJzZWRHYXN0b1R5cGUpKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiVGlja2V0c19WYWxpZGF0aW9uX0NhdGVnb3J5UmVxdWlyZWRcIiwgXCJDYXRlZ29yeSBpcyByZXF1aXJlZC5cIik7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJhd1RyYW5zRGF0ZSA9IFN0cmluZyhkcmFmdFRyYW5zRGF0ZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgICBjb25zdCBub3JtYWxpemVkVHJhbnNEYXRlID0gcmF3VHJhbnNEYXRlID8gdG9FeHBlbnNlQXBpRGRNbVl5eXkocmF3VHJhbnNEYXRlKSA6IFwiXCI7XHJcbiAgICBpZiAocmF3VHJhbnNEYXRlICYmICFub3JtYWxpemVkVHJhbnNEYXRlKSB7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgICAgIHNldFN0YXR1cyhFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3QgPSB7XHJcbiAgICAgIGRlc2NyaXB0aW9uOiBub3JtYWxpemVkRGVzY3JpcHRpb24sXHJcbiAgICAgIGN1cnJlbmN5Q29kZTogbm9ybWFsaXplZEN1cnJlbmN5LFxyXG4gICAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWRUcmFuc0RhdGUgfHwgdW5kZWZpbmVkLFxyXG4gICAgICBjb21lbnRhcmlvOiBTdHJpbmcoZHJhZnRDb21lbnRhcmlvIHx8IFwiXCIpLnRyaW0oKSB8fCB1bmRlZmluZWQsXHJcbiAgICAgIHVybEZpbGU6IFN0cmluZyhkcmFmdFVybEZpbGUgfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcclxuICAgICAgZmlsZU5hbWU6IFN0cmluZyhkcmFmdEZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSB8fCB1bmRlZmluZWQsXHJcbiAgICAgIGZpbGVFeHRlbnNpb246IHJlc29sdmVUaWNrZXRGaWxlRXh0ZW5zaW9uKGRyYWZ0RmlsZU5hbWUsIGRyYWZ0VXJsRmlsZSksXHJcbiAgICAgIGdhc3RvVHlwZTogcGFyc2VkR2FzdG9UeXBlIGFzIEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3RbXCJnYXN0b1R5cGVcIl0sXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcclxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldEJ1c3ksXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1cGRhdGVFeHBlbnNlU2hlZXRUaWNrZXQoZmlsZUlkLCBwYXlsb2FkKTtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IHVwZGF0ZWRcIikpO1xyXG4gICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xyXG4gIH0sIFtcclxuICAgIGJ1c3ksXHJcbiAgICBjYW5FZGl0VGlja2V0LFxyXG4gICAgZHJhZnRDb21lbnRhcmlvLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRGaWxlTmFtZSxcclxuICAgIGRyYWZ0R2FzdG9UeXBlLFxyXG4gICAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgICBkcmFmdFVybEZpbGUsXHJcbiAgICBmaWxlSWQsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFN0YXR1cyxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgcmVzb2x2ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCA9IHVzZUNhbGxiYWNrKGFzeW5jICgpOiBQcm9taXNlPERlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCB8IG51bGw+ID0+IHtcclxuICAgIGlmIChkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQpIHtcclxuICAgICAgcmV0dXJuIGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KGxpbmtlZEV4cGVuc2VTaGVldElkKTtcclxuICAgIGlmICghc2FmZVNoZWV0SWQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldERldGFpbChzYWZlU2hlZXRJZCwge1xyXG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlLkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XHJcbiAgICBjb25zdCBkZXRhaWwgPSBpdGVtcy5maW5kKChlbnRyeSkgPT4gZW50cnkgJiYgdHlwZW9mIGVudHJ5ID09PSBcIm9iamVjdFwiKSB8fCBudWxsO1xyXG4gICAgY29uc3QgbGluZXMgPSBBcnJheS5pc0FycmF5KGRldGFpbD8uTGluZXMpID8gZGV0YWlsLkxpbmVzIDogW107XHJcbiAgICBjb25zdCBtYXRjaGluZ0xpbmUgPSBsaW5lcy5maW5kKChsaW5lKSA9PiBzYWZlVGV4dChsaW5lPy5GaWxlSWQpID09PSBmaWxlSWQpO1xyXG4gICAgY29uc3QgbGluZVJlY0lkID0gc2FmZVRleHQobWF0Y2hpbmdMaW5lPy5SZWNJZCk7XHJcblxyXG4gICAgaWYgKCFsaW5lUmVjSWQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2hlZXRJZDogc2FmZVNoZWV0SWQsXHJcbiAgICAgIGxpbmVSZWNJZCxcclxuICAgIH07XHJcbiAgfSwgW2RlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCwgZmlsZUlkLCBsaW5rZWRFeHBlbnNlU2hlZXRJZF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5EZWxldGVUaWNrZXQpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxyXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUVycm9yXCIsIFwiRGVsZXRlIGVycm9yLlwiKSxcclxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBsaW5rZWRMaW5lQ29udGV4dCA9IGF3YWl0IHJlc29sdmVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQoKTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGRlbGV0ZUZpbGVSZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldEZpbGUoZmlsZUlkLCB7XHJcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBpZiAoIWRlbGV0ZUZpbGVSZXNwb25zZS5TdWNjZXNzICYmICFpc01pc3NpbmdUaWNrZXRGaWxlTWVzc2FnZShkZWxldGVGaWxlUmVzcG9uc2UuTWVzc2FnZSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRlbGV0ZUZpbGVSZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGlmICghaXNOb3RGb3VuZEVycm9yKGVycm9yKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0KGZpbGVJZCk7XHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxpbmtlZExpbmVDb250ZXh0KSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5lRGVsZXRlUmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRMaW5lKFxyXG4gICAgICAgICAgICAgIGxpbmtlZExpbmVDb250ZXh0LnNoZWV0SWQsXHJcbiAgICAgICAgICAgICAgbGlua2VkTGluZUNvbnRleHQubGluZVJlY0lkLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbGluZURlbGV0ZVJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobGluZURlbGV0ZVJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgLy8gVGhlIGxpbmtlZCBsaW5lIGNhbiBiZSBhdXRvLXJlbW92ZWQgYnkgYmFja2VuZCBjYXNjYWRlOyBrZWVwIGZsb3cgc3VjY2Vzc2Z1bCBpbiB0aGF0IGNhc2UuXHJcbiAgICAgICAgICAgIGlmICghaXNOb3RGb3VuZEVycm9yKGVycm9yKSkge1xyXG4gICAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IGRlbGV0ZWRcIikpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICB9LCBbYnVzeSwgY2FuRGVsZXRlVGlja2V0LCBmaWxlSWQsIHJlc29sdmVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQsIHNldEJ1c3ksIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1c10pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbE9wZW46IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGlzTG9ja2VkOiBib29sZWFuO1xyXG4gIGFjdGlvbk1vZGU/OiBcImRlZmF1bHRcIiB8IFwiZGVsZXRlX29ubHlcIiB8IFwidmlld19vbmx5XCI7XHJcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XHJcbiAgY2FuRWRpdFRpY2tldDogYm9vbGVhbjtcclxuICBjYW5EZWxldGVUaWNrZXQ6IGJvb2xlYW47XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGNhbk9wZW5TYXZlQ29uZmlybT86ICgpID0+IGJvb2xlYW47XHJcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBvblNhdmVTdWNjZXNzOiAoKSA9PiB2b2lkO1xyXG4gIG9uRGVsZXRlU3VjY2Vzcz86ICgpID0+IHZvaWQ7XHJcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xyXG4gIH0pID0+IHZvaWQ7XHJcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gc3RhdGUgYW5kIGRpc3BhdGNoIGFjdGlvbnMgZm9yIHRpY2tldCBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbE9wZW4sXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzTG9ja2VkLFxyXG4gIGFjdGlvbk1vZGUgPSBcImRlZmF1bHRcIixcclxuICBwZXJtaXNzaW9uc1JlYWR5ID0gdHJ1ZSxcclxuICBjYW5FZGl0VGlja2V0LFxyXG4gIGNhbkRlbGV0ZVRpY2tldCxcclxuICBmaWxlSWQsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gIGhhbmRsZVVwZGF0ZSxcclxuICBoYW5kbGVEZWxldGUsXHJcbiAgb25TYXZlU3VjY2VzcyxcclxuICBvbkRlbGV0ZVN1Y2Nlc3MsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcclxuICB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMoe1xyXG4gICAgYWN0aW9uR3JvdXBJZDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtYWN0aW9uc1wiLFxyXG4gICAgaWRzOiB7XHJcbiAgICAgIGVkaXRJY29uSWQ6IFwiZXhwZW5zZVRpY2tldEVkaXRJY29uXCIsXHJcbiAgICAgIHNhdmVJY29uSWQ6IFwiZXhwZW5zZVRpY2tldFNhdmVJY29uXCIsXHJcbiAgICAgIGRlbGV0ZUJ0bklkOiBcImV4cGVuc2VUaWNrZXREZWxldGVCdG5cIixcclxuICAgICAgY2FuY2VsQnRuSWQ6IFwiZXhwZW5zZVRpY2tldENhbmNlbEJ0blwiLFxyXG4gICAgfSxcclxuICAgIGV2ZW50czoge1xyXG4gICAgICBlZGl0RXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWVkaXRcIixcclxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWRlbGV0ZVwiLFxyXG4gICAgICBjYW5jZWxFdmVudDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtY2FuY2VsLWVkaXRcIixcclxuICAgIH0sXHJcbiAgICBidXN5LFxyXG4gICAgbW9kYWxPcGVuLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlOiBmYWxzZSxcclxuICAgIGlzTG9ja2VkLFxyXG4gICAgYWN0aW9uTW9kZSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHksXHJcbiAgICBjYW5DcmVhdGU6IGZhbHNlLFxyXG4gICAgY2FuRWRpdDogY2FuRWRpdFRpY2tldCxcclxuICAgIGNhbkRlbGV0ZTogY2FuRGVsZXRlVGlja2V0LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgaGFuZGxlU2F2ZTogaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgc2F2ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiU2F2ZSBjaGFuZ2VzXCIpLFxyXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXHJcbiAgICBzYXZlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXHJcbiAgICBkZWxldGVDb25maXJtVGl0bGU6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9UaXRsZVwiLCBcIkRlbGV0ZVwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiQ29uZmlybV9EZWxldGVfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/XCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpLFxyXG4gICAgb25TYXZlU3VjY2VzcyxcclxuICAgIG9uRGVsZXRlU3VjY2Vzczogb25EZWxldGVTdWNjZXNzIHx8ICgoKSA9PiBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvVGlja2V0c1wiKSksXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZHVjZXIsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBEaXNwYXRjaCwgU2V0U3RhdGVBY3Rpb24gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHBhcnNlRXhwZW5zZURhdGUsIHNhZmVUZXh0LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcblxyXG50eXBlIERyYWZ0U3RhdGUgPSB7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBnYXN0b1R5cGU6IHN0cmluZztcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICB0cmFuc0RhdGU6IHN0cmluZztcclxuICBjb21lbnRhcmlvOiBzdHJpbmc7XHJcbiAgdXJsRmlsZTogc3RyaW5nO1xyXG4gIGZpbGVOYW1lOiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEVkaXRvclN0YXRlID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIG1vZGFsRXJyb3I6IHN0cmluZztcclxuICBsaW5lUGFnZTogbnVtYmVyO1xyXG4gIGRyYWZ0OiBEcmFmdFN0YXRlO1xyXG59O1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yQXJncyA9IHtcclxuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xyXG4gIGxpbmVDb3VudDogbnVtYmVyO1xyXG4gIHBhZ2VTaXplOiBudW1iZXI7XHJcbiAgY2FuRWRpdFRpY2tldDogYm9vbGVhbjtcclxuICBpc0xvYWRpbmc6IGJvb2xlYW47XHJcbiAgYWxsb3dBc3NpZ25lZERyYWZ0RWRpdDogYm9vbGVhbjtcclxuICBpc0Zyb21TaGVldExpbms6IGJvb2xlYW47XHJcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG50eXBlIEVkaXRvckFjdGlvbiA9XHJcbiAgfCB7IHR5cGU6IFwiaHlkcmF0ZV9mcm9tX2hlYWRlclwiOyBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsIH1cclxuICB8IHtcclxuICAgICAgdHlwZTogXCJwYXRjaF9zdGF0ZVwiO1xyXG4gICAgICBwYXRjaDogUGFydGlhbDxQaWNrPEVkaXRvclN0YXRlLCBcImJ1c3lcIiB8IFwic3RhdHVzXCIgfCBcImlzRWRpdGluZ1wiIHwgXCJtb2RhbEVycm9yXCIgfCBcImxpbmVQYWdlXCI+PjtcclxuICAgIH1cclxuICB8IHsgdHlwZTogXCJzZXRfZHJhZnRfZmllbGRcIjsgZmllbGQ6IGtleW9mIERyYWZ0U3RhdGU7IHZhbHVlOiBzdHJpbmcgfTtcclxuXHJcbmNvbnN0IGNyZWF0ZUVtcHR5RHJhZnQgPSAoKTogRHJhZnRTdGF0ZSA9PiAoe1xyXG4gIGRlc2NyaXB0aW9uOiBcIlwiLFxyXG4gIGdhc3RvVHlwZTogXCJcIixcclxuICBjdXJyZW5jeUNvZGU6IFwiXCIsXHJcbiAgdHJhbnNEYXRlOiBcIlwiLFxyXG4gIGNvbWVudGFyaW86IFwiXCIsXHJcbiAgdXJsRmlsZTogXCJcIixcclxuICBmaWxlTmFtZTogXCJcIixcclxufSk7XHJcblxyXG5jb25zdCB0b0lucHV0RGF0ZSA9IChyYXc/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcclxuICByZXR1cm4gcGFyc2VkID8gdG9Jc29EYXRlKHBhcnNlZCkgOiBcIlwiO1xyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlRHJhZnRGcm9tSGVhZGVyID0gKGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGwpOiBEcmFmdFN0YXRlID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KGhlYWRlcj8uZGVzY3JpcHRpb24pLFxyXG4gICAgZ2FzdG9UeXBlOiBoZWFkZXI/Lmdhc3RvVHlwZSA9PT0gbnVsbCB8fCBoZWFkZXI/Lmdhc3RvVHlwZSA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IFN0cmluZyhoZWFkZXIuZ2FzdG9UeXBlKSxcclxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCksXHJcbiAgICB0cmFuc0RhdGU6IHRvSW5wdXREYXRlKGhlYWRlcj8udHJhbnNEYXRlKSxcclxuICAgIGNvbWVudGFyaW86IHNhZmVUZXh0KGhlYWRlcj8uY29tZW50YXJpbyksXHJcbiAgICB1cmxGaWxlOiBzYWZlVGV4dChoZWFkZXI/LnVybEZpbGUpLFxyXG4gICAgZmlsZU5hbWU6IHNhZmVUZXh0KGhlYWRlcj8uZmlsZU5hbWUpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVJbml0aWFsU3RhdGUgPSAoKTogRWRpdG9yU3RhdGUgPT4gKHtcclxuICBidXN5OiBmYWxzZSxcclxuICBzdGF0dXM6IFwiXCIsXHJcbiAgaXNFZGl0aW5nOiBmYWxzZSxcclxuICBtb2RhbEVycm9yOiBcIlwiLFxyXG4gIGxpbmVQYWdlOiAxLFxyXG4gIGRyYWZ0OiBjcmVhdGVFbXB0eURyYWZ0KCksXHJcbn0pO1xyXG5cclxuY29uc3QgaXNWYWxpZFJlcXVpcmVkR2FzdG9UeXBlID0gKHJhd1ZhbHVlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICBjb25zdCBwYXJzZWRWYWx1ZSA9IE51bWJlci5wYXJzZUludChTdHJpbmcocmF3VmFsdWUgfHwgXCJcIikudHJpbSgpLCAxMCk7XHJcbiAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIocGFyc2VkVmFsdWUpICYmIHBhcnNlZFZhbHVlID4gMDtcclxufTtcclxuXHJcbmNvbnN0IGVkaXRvclJlZHVjZXIgPSAoc3RhdGU6IEVkaXRvclN0YXRlLCBhY3Rpb246IEVkaXRvckFjdGlvbik6IEVkaXRvclN0YXRlID0+IHtcclxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICBjYXNlIFwiaHlkcmF0ZV9mcm9tX2hlYWRlclwiOlxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIGRyYWZ0OiBjcmVhdGVEcmFmdEZyb21IZWFkZXIoYWN0aW9uLmhlYWRlciksXHJcbiAgICAgIH07XHJcbiAgICBjYXNlIFwicGF0Y2hfc3RhdGVcIjpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAuLi5hY3Rpb24ucGF0Y2gsXHJcbiAgICAgIH07XHJcbiAgICBjYXNlIFwic2V0X2RyYWZ0X2ZpZWxkXCI6XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgZHJhZnQ6IHtcclxuICAgICAgICAgIC4uLnN0YXRlLmRyYWZ0LFxyXG4gICAgICAgICAgW2FjdGlvbi5maWVsZF06IGFjdGlvbi52YWx1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVTZXRTdGF0ZVZhbHVlID0gPFQsPih2YWx1ZTogU2V0U3RhdGVBY3Rpb248VD4sIGN1cnJlbnQ6IFQpOiBUID0+IHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgPyAodmFsdWUgYXMgKHByZXZTdGF0ZTogVCkgPT4gVCkoY3VycmVudCkgOiB2YWx1ZTtcclxufTtcclxuXHJcbi8vIE93bnMgcGFnZS1sb2NhbCBlZGl0LCBkcmFmdCwgYW5kIGxpbmUgcGFnaW5nIHN0YXRlIGZvciB0aWNrZXQgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbEVkaXRvciA9ICh7XHJcbiAgaGVhZGVyLFxyXG4gIGxpbmVDb3VudCxcclxuICBwYWdlU2l6ZSxcclxuICBjYW5FZGl0VGlja2V0LFxyXG4gIGlzTG9hZGluZyxcclxuICBhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0LFxyXG4gIGlzRnJvbVNoZWV0TGluayxcclxuICBvbkZvcmJpZGRlbixcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbEVkaXRvckFyZ3MpID0+IHtcclxuICBjb25zdCBbc3RhdGUsIGRpc3BhdGNoXSA9IHVzZVJlZHVjZXIoZWRpdG9yUmVkdWNlciwgdW5kZWZpbmVkLCBjcmVhdGVJbml0aWFsU3RhdGUpO1xyXG4gIGNvbnN0IFtkZXNjcmlwdGlvbkludmFsaWQsIHNldERlc2NyaXB0aW9uSW52YWxpZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2dhc3RvVHlwZUludmFsaWQsIHNldEdhc3RvVHlwZUludmFsaWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtjdXJyZW5jeUNvZGVJbnZhbGlkLCBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBkZXNjcmlwdGlvbklucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBnYXN0b1R5cGVJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgY3VycmVuY3lJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc3RhdGUuaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBkaXNwYXRjaCh7IHR5cGU6IFwiaHlkcmF0ZV9mcm9tX2hlYWRlclwiLCBoZWFkZXIgfSk7XHJcbiAgfSwgW2hlYWRlciwgc3RhdGUuaXNFZGl0aW5nXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBtYXhQYWdlID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKGxpbmVDb3VudCAvIHBhZ2VTaXplKSk7XHJcbiAgICBpZiAoc3RhdGUubGluZVBhZ2UgPiBtYXhQYWdlKSB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBsaW5lUGFnZTogbWF4UGFnZSB9IH0pO1xyXG4gICAgfVxyXG4gIH0sIFtsaW5lQ291bnQsIHBhZ2VTaXplLCBzdGF0ZS5saW5lUGFnZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHN0YXRlLmlzRWRpdGluZykgcmV0dXJuO1xyXG4gICAgc2V0RGVzY3JpcHRpb25JbnZhbGlkKGZhbHNlKTtcclxuICAgIHNldEdhc3RvVHlwZUludmFsaWQoZmFsc2UpO1xyXG4gICAgc2V0Q3VycmVuY3lDb2RlSW52YWxpZChmYWxzZSk7XHJcbiAgfSwgW3N0YXRlLmlzRWRpdGluZ10pO1xyXG5cclxuICBjb25zdCBzZXRCdXN5ID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwicGF0Y2hfc3RhdGVcIiwgcGF0Y2g6IHsgYnVzeTogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmJ1c3kpIH0gfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLmJ1c3ldXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2V0U3RhdHVzID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBzdGF0dXM6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5zdGF0dXMpIH0gfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLnN0YXR1c11cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRJc0VkaXRpbmcgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxib29sZWFuPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBpc0VkaXRpbmc6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5pc0VkaXRpbmcpIH0gfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLmlzRWRpdGluZ11cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRNb2RhbEVycm9yID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBtb2RhbEVycm9yOiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUubW9kYWxFcnJvcikgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUubW9kYWxFcnJvcl1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXRMaW5lUGFnZSA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPG51bWJlcj4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwicGF0Y2hfc3RhdGVcIiwgcGF0Y2g6IHsgbGluZVBhZ2U6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5saW5lUGFnZSkgfSB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUubGluZVBhZ2VdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2V0RHJhZnREZXNjcmlwdGlvbiA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBzZXREZXNjcmlwdGlvbkludmFsaWQoZmFsc2UpO1xyXG4gICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJzZXRfZHJhZnRfZmllbGRcIixcclxuICAgICAgICBmaWVsZDogXCJkZXNjcmlwdGlvblwiLFxyXG4gICAgICAgIHZhbHVlOiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuZHJhZnQuZGVzY3JpcHRpb24pLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuZHJhZnQuZGVzY3JpcHRpb25dXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2V0RHJhZnRHYXN0b1R5cGUgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxzdHJpbmc+Pj4oXHJcbiAgICAodmFsdWUpID0+IHtcclxuICAgICAgc2V0R2FzdG9UeXBlSW52YWxpZChmYWxzZSk7XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcInNldF9kcmFmdF9maWVsZFwiLFxyXG4gICAgICAgIGZpZWxkOiBcImdhc3RvVHlwZVwiLFxyXG4gICAgICAgIHZhbHVlOiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuZHJhZnQuZ2FzdG9UeXBlKSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLmRyYWZ0Lmdhc3RvVHlwZV1cclxuICApO1xyXG5cclxuICBjb25zdCBzZXREcmFmdEN1cnJlbmN5Q29kZSA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcclxuICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkKGZhbHNlKTtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwic2V0X2RyYWZ0X2ZpZWxkXCIsXHJcbiAgICAgICAgZmllbGQ6IFwiY3VycmVuY3lDb2RlXCIsXHJcbiAgICAgICAgdmFsdWU6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUpLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNldERyYWZ0VHJhbnNEYXRlID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxyXG4gICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcInNldF9kcmFmdF9maWVsZFwiLFxyXG4gICAgICAgIGZpZWxkOiBcInRyYW5zRGF0ZVwiLFxyXG4gICAgICAgIHZhbHVlOiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuZHJhZnQudHJhbnNEYXRlKSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW3N0YXRlLmRyYWZ0LnRyYW5zRGF0ZV1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFoZWFkZXIgfHwgaXNMb2FkaW5nKSByZXR1cm47XHJcbiAgICBpZiAoaXNGcm9tU2hlZXRMaW5rKSByZXR1cm47XHJcbiAgICBpZiAoaGVhZGVyLnN0YXR1cyA9PT0gMSAmJiAhYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCkgcmV0dXJuO1xyXG4gICAgaWYgKCFjYW5FZGl0VGlja2V0KSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRHYXN0b1R5cGVJbnZhbGlkKGZhbHNlKTtcclxuICAgIHNldEN1cnJlbmN5Q29kZUludmFsaWQoZmFsc2UpO1xyXG4gICAgZGlzcGF0Y2goeyB0eXBlOiBcImh5ZHJhdGVfZnJvbV9oZWFkZXJcIiwgaGVhZGVyIH0pO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBcInBhdGNoX3N0YXRlXCIsXHJcbiAgICAgIHBhdGNoOiB7XHJcbiAgICAgICAgbW9kYWxFcnJvcjogXCJcIixcclxuICAgICAgICBpc0VkaXRpbmc6IHRydWUsXHJcbiAgICAgICAgc3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LCBbYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCwgY2FuRWRpdFRpY2tldCwgaGVhZGVyLCBpc0Zyb21TaGVldExpbmssIGlzTG9hZGluZywgb25Gb3JiaWRkZW5dKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghc3RhdGUuaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBpZiAoIWhlYWRlcikge1xyXG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwicGF0Y2hfc3RhdGVcIiwgcGF0Y2g6IHsgaXNFZGl0aW5nOiBmYWxzZSB9IH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R2FzdG9UeXBlSW52YWxpZChmYWxzZSk7XHJcbiAgICBzZXRDdXJyZW5jeUNvZGVJbnZhbGlkKGZhbHNlKTtcclxuICAgIGRpc3BhdGNoKHsgdHlwZTogXCJoeWRyYXRlX2Zyb21faGVhZGVyXCIsIGhlYWRlciB9KTtcclxuICAgIGRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLFxyXG4gICAgICBwYXRjaDoge1xyXG4gICAgICAgIGlzRWRpdGluZzogZmFsc2UsXHJcbiAgICAgICAgbW9kYWxFcnJvcjogXCJcIixcclxuICAgICAgICBzdGF0dXM6IGluZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSwgW2hlYWRlciwgc3RhdGUuaXNFZGl0aW5nXSk7XHJcblxyXG4gIGNvbnN0IGNhbk9wZW5TYXZlQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWREZXNjcmlwdGlvbiA9IFN0cmluZyhzdGF0ZS5kcmFmdC5kZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XHJcbiAgICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3lDb2RlID0gU3RyaW5nKHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uSXNWYWxpZCA9ICEhbm9ybWFsaXplZERlc2NyaXB0aW9uO1xyXG4gICAgY29uc3QgZ2FzdG9UeXBlSXNWYWxpZCA9IGlzVmFsaWRSZXF1aXJlZEdhc3RvVHlwZShzdGF0ZS5kcmFmdC5nYXN0b1R5cGUpO1xyXG4gICAgY29uc3QgY3VycmVuY3lJc1ZhbGlkID0gISFub3JtYWxpemVkQ3VycmVuY3lDb2RlO1xyXG5cclxuICAgIHNldERlc2NyaXB0aW9uSW52YWxpZCghZGVzY3JpcHRpb25Jc1ZhbGlkKTtcclxuICAgIHNldEdhc3RvVHlwZUludmFsaWQoIWdhc3RvVHlwZUlzVmFsaWQpO1xyXG4gICAgc2V0Q3VycmVuY3lDb2RlSW52YWxpZCghY3VycmVuY3lJc1ZhbGlkKTtcclxuXHJcbiAgICBpZiAoZGVzY3JpcHRpb25Jc1ZhbGlkICYmIGdhc3RvVHlwZUlzVmFsaWQgJiYgY3VycmVuY3lJc1ZhbGlkKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1lc3NhZ2UgPSAhZGVzY3JpcHRpb25Jc1ZhbGlkXHJcbiAgICAgID8gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9EZXNjcmlwdGlvblJlcXVpcmVkXCIsIFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWQuXCIpXHJcbiAgICAgIDogIWdhc3RvVHlwZUlzVmFsaWRcclxuICAgICAgICA/IGluZFQoXCJUaWNrZXRzX1ZhbGlkYXRpb25fQ2F0ZWdvcnlSZXF1aXJlZFwiLCBcIkNhdGVnb3J5IGlzIHJlcXVpcmVkLlwiKVxyXG4gICAgICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9DdXJyZW5jeVJlcXVpcmVkXCIsIFwiQ3VycmVuY3kgaXMgcmVxdWlyZWQuXCIpO1xyXG5cclxuICAgIGRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLFxyXG4gICAgICBwYXRjaDoge1xyXG4gICAgICAgIG1vZGFsRXJyb3I6IG1lc3NhZ2UsXHJcbiAgICAgICAgc3RhdHVzOiBtZXNzYWdlLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgIGlmICghZGVzY3JpcHRpb25Jc1ZhbGlkKSB7XHJcbiAgICAgICAgZGVzY3JpcHRpb25JbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFnYXN0b1R5cGVJc1ZhbGlkKSB7XHJcbiAgICAgICAgZ2FzdG9UeXBlSW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGN1cnJlbmN5SW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LCBbc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlLCBzdGF0ZS5kcmFmdC5nYXN0b1R5cGVdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGJ1c3k6IHN0YXRlLmJ1c3ksXHJcbiAgICBzdGF0dXM6IHN0YXRlLnN0YXR1cyxcclxuICAgIGlzRWRpdGluZzogc3RhdGUuaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxFcnJvcjogc3RhdGUubW9kYWxFcnJvcixcclxuICAgIGxpbmVQYWdlOiBzdGF0ZS5saW5lUGFnZSxcclxuICAgIGRyYWZ0RGVzY3JpcHRpb246IHN0YXRlLmRyYWZ0LmRlc2NyaXB0aW9uLFxyXG4gICAgZGVzY3JpcHRpb25JbnZhbGlkLFxyXG4gICAgZGVzY3JpcHRpb25JbnB1dFJlZixcclxuICAgIGRyYWZ0R2FzdG9UeXBlOiBzdGF0ZS5kcmFmdC5nYXN0b1R5cGUsXHJcbiAgICBnYXN0b1R5cGVJbnZhbGlkLFxyXG4gICAgZ2FzdG9UeXBlSW5wdXRSZWYsXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZTogc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlLFxyXG4gICAgY3VycmVuY3lDb2RlSW52YWxpZCxcclxuICAgIGN1cnJlbmN5SW5wdXRSZWYsXHJcbiAgICBkcmFmdFRyYW5zRGF0ZTogc3RhdGUuZHJhZnQudHJhbnNEYXRlLFxyXG4gICAgZHJhZnRDb21lbnRhcmlvOiBzdGF0ZS5kcmFmdC5jb21lbnRhcmlvLFxyXG4gICAgZHJhZnRVcmxGaWxlOiBzdGF0ZS5kcmFmdC51cmxGaWxlLFxyXG4gICAgZHJhZnRGaWxlTmFtZTogc3RhdGUuZHJhZnQuZmlsZU5hbWUsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldExpbmVQYWdlLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgIHNldERyYWZ0R2FzdG9UeXBlLFxyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBzZXREcmFmdFRyYW5zRGF0ZSxcclxuICAgIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHtcclxuICBub3JtYWxpemVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCxcclxuICByZXNvbHZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LFxyXG59IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dC50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxuLy8gUGFyc2VzIHJvdXRlIGNvbnRleHQgb25jZSBhbmQgZXhwb3NlcyBzdGFibGUgZmxhZ3MgZm9yIHRpY2tldCBkZXRhaWwgZmxvd3MuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0ID0gKCkgPT4ge1xyXG4gIGNvbnN0IHJvdXRlUGFyYW1zID0gdXNlTWVtbygoKSA9PiBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpLCBbXSk7XHJcbiAgY29uc3QgZmlsZUlkID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1RJQ0tFVF9GSUxFX0lEX18pLCBbXSk7XHJcbiAgY29uc3QgYXV0b0VkaXRNb2RlID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChyb3V0ZVBhcmFtcy5nZXQoXCJtb2RlXCIpKS50b0xvd2VyQ2FzZSgpID09PSBcImVkaXRcIiwgW3JvdXRlUGFyYW1zXSk7XHJcbiAgY29uc3Qgcm91dGVPcmlnaW4gPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcIm9yaWdpblwiKSkudG9Mb3dlckNhc2UoKSwgW3JvdXRlUGFyYW1zXSk7XHJcbiAgY29uc3Qgcm91dGVTaGVldElkID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChyb3V0ZVBhcmFtcy5nZXQoXCJzaGVldElkXCIpKSwgW3JvdXRlUGFyYW1zXSk7XHJcbiAgY29uc3QgY29udGV4dExpbmVSZWNJZCA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwibGluZVJlY0lkXCIpKSwgW3JvdXRlUGFyYW1zXSk7XHJcbiAgY29uc3QgZXhwbGljaXRSZXR1cm5Db250ZXh0ID0gdXNlTWVtbyhcclxuICAgICgpID0+XHJcbiAgICAgIG5vcm1hbGl6ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcclxuICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgb3JpZ2luOiByb3V0ZU9yaWdpbixcclxuICAgICAgICBzaGVldElkOiByb3V0ZVNoZWV0SWQsXHJcbiAgICAgIH0pLFxyXG4gICAgW2ZpbGVJZCwgcm91dGVPcmlnaW4sIHJvdXRlU2hlZXRJZF1cclxuICApO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFleHBsaWNpdFJldHVybkNvbnRleHQpIHJldHVybjtcclxuICAgIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dChleHBsaWNpdFJldHVybkNvbnRleHQpO1xyXG4gIH0sIFtleHBsaWNpdFJldHVybkNvbnRleHRdKTtcclxuXHJcbiAgcmV0dXJuIHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgdGlja2V0UmV0dXJuQ29udGV4dCA9IHJlc29sdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dChmaWxlSWQsIGV4cGxpY2l0UmV0dXJuQ29udGV4dCk7XHJcbiAgICBjb25zdCBkZXRhaWxPcmlnaW4gPSB0aWNrZXRSZXR1cm5Db250ZXh0Py5vcmlnaW4gfHwgcm91dGVPcmlnaW47XHJcbiAgICBjb25zdCBjb250ZXh0U2hlZXRJZCA9IHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQgfHwgcm91dGVTaGVldElkO1xyXG4gICAgY29uc3QgaXNGcm9tRXhwZW5zZVNoZWV0Q3JlYXRlID0gZGV0YWlsT3JpZ2luID09PSBcInNoZWV0LWNyZWF0ZVwiO1xyXG4gICAgY29uc3QgaXNGcm9tRXhwZW5zZUxpbmUgPSBkZXRhaWxPcmlnaW4gPT09IFwiZXhwZW5zZS1saW5lXCIgJiYgISFjb250ZXh0U2hlZXRJZCAmJiAhIWNvbnRleHRMaW5lUmVjSWQ7XHJcbiAgICBjb25zdCBpc0Zyb21TaGVldExpbmsgPSBkZXRhaWxPcmlnaW4gPT09IFwic2hlZXQtbGlua1wiICYmICEhY29udGV4dFNoZWV0SWQ7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYXV0b0VkaXRNb2RlLFxyXG4gICAgICBkZXRhaWxPcmlnaW4sXHJcbiAgICAgIGNvbnRleHRTaGVldElkLFxyXG4gICAgICBjb250ZXh0TGluZVJlY0lkLFxyXG4gICAgICBpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUsXHJcbiAgICAgIGlzRnJvbUV4cGVuc2VMaW5lLFxyXG4gICAgICBpc0Zyb21TaGVldExpbmssXHJcbiAgICAgIHRpY2tldFJldHVybkNvbnRleHQsXHJcbiAgICB9O1xyXG4gIH0sIFthdXRvRWRpdE1vZGUsIGNvbnRleHRMaW5lUmVjSWQsIGV4cGxpY2l0UmV0dXJuQ29udGV4dCwgZmlsZUlkLCByb3V0ZU9yaWdpbiwgcm91dGVTaGVldElkXSk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi8uLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlVGlja2V0U3RhdHVzTGFiZWwgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzL2V4cGVuc2VUaWNrZXRTdGF0dXNDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsRGlzcGxheUFyZ3MgPSB7XHJcbiAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbDtcclxuICBkcmFmdEdhc3RvVHlwZTogc3RyaW5nO1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRUcmFuc0RhdGU6IHN0cmluZztcclxuICBkcmFmdEZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGdhc3RvVHlwZUxhYmVsTWFwOiBNYXA8c3RyaW5nLCBzdHJpbmc+O1xyXG59O1xyXG5cclxuLy8gQ2VudHJhbGl6ZXMgZGlzcGxheS1vbmx5IHZhbHVlcyBzbyB0aGUgcGFnZSBjb250YWluZXIgc3RheXMgZm9jdXNlZCBvbiBmbG93IHdpcmluZy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5ID0gKHtcclxuICBoZWFkZXIsXHJcbiAgZHJhZnRHYXN0b1R5cGUsXHJcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgZHJhZnRUcmFuc0RhdGUsXHJcbiAgZHJhZnRGaWxlTmFtZSxcclxuICBpc0VkaXRpbmcsXHJcbiAgZ2FzdG9UeXBlTGFiZWxNYXAsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5QXJncykgPT4ge1xyXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgZmlyc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKSxcclxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXHJcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXHJcbiAgICAgIGxhc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIiksXHJcbiAgICB9KSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgcHJldmlld0FsdFRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gc2FmZVRleHQoaXNFZGl0aW5nID8gZHJhZnRGaWxlTmFtZSA6IGhlYWRlcj8uZmlsZU5hbWUpIHx8IGluZFQoXCJUaWNrZXRzX0ZpZWxkX0ZpbGVJZFwiLCBcIlRpY2tldFwiKSxcclxuICAgIFtkcmFmdEZpbGVOYW1lLCBoZWFkZXI/LmZpbGVOYW1lLCBpc0VkaXRpbmddXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc3RhdHVzTGFiZWwgPSB1c2VNZW1vKCgpID0+IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbChoZWFkZXI/LnN0YXR1cyksIFtoZWFkZXI/LnN0YXR1c10pO1xyXG5cclxuICBjb25zdCBnYXN0b1R5cGVMYWJlbCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgY3VycmVudEdhc3RvVHlwZSA9IGlzRWRpdGluZyA/IGRyYWZ0R2FzdG9UeXBlIDogaGVhZGVyPy5nYXN0b1R5cGUgPT09IG51bGwgPyBcIlwiIDogU3RyaW5nKGhlYWRlcj8uZ2FzdG9UeXBlID8/IFwiXCIpO1xyXG4gICAgaWYgKCFjdXJyZW50R2FzdG9UeXBlKSB7XHJcbiAgICAgIHJldHVybiBpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBnYXN0b1R5cGVMYWJlbE1hcC5nZXQoU3RyaW5nKGN1cnJlbnRHYXN0b1R5cGUpKSB8fCBTdHJpbmcoY3VycmVudEdhc3RvVHlwZSk7XHJcbiAgfSwgW2RyYWZ0R2FzdG9UeXBlLCBnYXN0b1R5cGVMYWJlbE1hcCwgaGVhZGVyPy5nYXN0b1R5cGUsIGlzRWRpdGluZ10pO1xyXG5cclxuICBjb25zdCB0b3RhbEFtb3VudFRleHQgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGhlYWRlcj8udG90YWxBbW91bnQgPz8gbnVsbCwgKGlzRWRpdGluZyA/IGRyYWZ0Q3VycmVuY3lDb2RlIDogaGVhZGVyPy5jdXJyZW5jeUNvZGUpIHx8IGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcclxuICAgIFtkcmFmdEN1cnJlbmN5Q29kZSwgaGVhZGVyPy5jdXJyZW5jeUNvZGUsIGhlYWRlcj8udG90YWxBbW91bnQsIGlzRWRpdGluZ11cclxuICApO1xyXG5cclxuICBjb25zdCB0cmFuc0RhdGVUZXh0ID0gdXNlTWVtbyhcclxuICAgICgpID0+IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShpc0VkaXRpbmcgPyBkcmFmdFRyYW5zRGF0ZSA6IGhlYWRlcj8udHJhbnNEYXRlLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIiksXHJcbiAgICBbZHJhZnRUcmFuc0RhdGUsIGhlYWRlcj8udHJhbnNEYXRlLCBpc0VkaXRpbmddXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHBhZ2luYXRpb25MYWJlbHMsXHJcbiAgICBwcmV2aWV3QWx0VGV4dCxcclxuICAgIHN0YXR1c0xhYmVsLFxyXG4gICAgZ2FzdG9UeXBlTGFiZWwsXHJcbiAgICB0b3RhbEFtb3VudFRleHQsXHJcbiAgICB0cmFuc0RhdGVUZXh0LFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGVBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxFcnJvcjogc3RyaW5nO1xyXG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldFN0YXR1czogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBFbmNhcHN1bGF0ZXMgY29uZmlybSBtb2RhbCBzdGF0ZSBzbyB0aGUgcGFnZSBjb250YWluZXIgc3RheXMgZm9jdXNlZCBvbiBmbG93IHdpcmluZy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGUgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgbW9kYWxFcnJvcixcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIHNldFN0YXR1cyxcclxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZUFyZ3MpID0+IHtcclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBhd2FpdCBoYW5kbGVDb25maXJtKHtcclxuICAgICAgYnVzeSxcclxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IobXNnKTtcclxuICAgICAgICBzZXRTdGF0dXMobXNnKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtLCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXNdKTtcclxuXHJcbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XHJcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcclxuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxyXG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XHJcbiAgICA6ICFidXN5ICYmIG1vZGFsRXJyb3JcclxuICAgICAgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIilcclxuICAgICAgOiBtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZvaWQgaGFuZGxlTW9kYWxDb25maXJtKCk7XHJcbiAgfSwgW2J1c3ksIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtLCBtb2RhbEVycm9yXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBtb2RhbCxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gICAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICAgIG1vZGFsQ2FuY2VsVGV4dCxcclxuICAgIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgUmVmT2JqZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgYXBwZW5kRXhwZW5zZVRpY2tldFJldHVyblF1ZXJ5LFxyXG4gIGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsLFxyXG4gIHR5cGUgRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnNBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgY29udGV4dFNoZWV0SWQ6IHN0cmluZztcclxuICBpc0Zyb21FeHBlbnNlTGluZTogYm9vbGVhbjtcclxuICBpc0Zyb21TaGVldExpbms6IGJvb2xlYW47XHJcbiAgaGVhZGVyRXhwZW5zZVNoZWV0SWQ6IHN0cmluZztcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgY2FuT3BlblNhdmVDb25maXJtOiAoKSA9PiBib29sZWFuO1xyXG4gIGhhbmRsZVVwZGF0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBsaW5lQ29udGFpbmVyUmVmOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBvcGVuUHJldmlldzogKCkgPT4gUHJvbWlzZTx2b2lkPjtcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0PzogRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQgfCBudWxsO1xyXG59O1xyXG5cclxuLy8gR3JvdXBzIHRpY2tldCBkZXRhaWwgbmF2aWdhdGlvbiBhbmQgbGluZS1jYXJkIGludGVyYWN0aW9ucyBiZWhpbmQgc3RhYmxlIGNhbGxiYWNrcy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgZmlsZUlkLFxyXG4gIGNvbnRleHRTaGVldElkLFxyXG4gIGlzRnJvbUV4cGVuc2VMaW5lLFxyXG4gIGlzRnJvbVNoZWV0TGluayxcclxuICBoZWFkZXJFeHBlbnNlU2hlZXRJZCxcclxuICBpc0VkaXRpbmcsXHJcbiAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gIGhhbmRsZVVwZGF0ZSxcclxuICBsaW5lQ29udGFpbmVyUmVmLFxyXG4gIG9wZW5QcmV2aWV3LFxyXG4gIHRpY2tldFJldHVybkNvbnRleHQsXHJcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnNBcmdzKSA9PiB7XHJcbiAgY29uc3Qgb3BlbkxpbmVEZXRhaWwgPSB1c2VDYWxsYmFjayhcclxuICAgIGFzeW5jIChyYXdMaW5lUmVjSWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICBpZiAoaXNGcm9tRXhwZW5zZUxpbmUgfHwgaXNGcm9tU2hlZXRMaW5rKSByZXR1cm47XHJcbiAgICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICAgIGNvbnN0IGxpbmVSZWNJZCA9IHNhZmVUZXh0KHJhd0xpbmVSZWNJZCk7XHJcbiAgICAgIGlmICghbGluZVJlY0lkIHx8ICFmaWxlSWQpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IHNob3VsZE9wZW5JbkVkaXRNb2RlID0gaXNFZGl0aW5nO1xyXG4gICAgICBpZiAoc2hvdWxkT3BlbkluRWRpdE1vZGUpIHtcclxuICAgICAgICBpZiAoIWNhbk9wZW5TYXZlQ29uZmlybSgpKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cGRhdGVPayA9IGF3YWl0IGhhbmRsZVVwZGF0ZSgpO1xyXG4gICAgICAgIGlmICghdXBkYXRlT2spIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgIGxpbmVSZWNJZCxcclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChzaG91bGRPcGVuSW5FZGl0TW9kZSkge1xyXG4gICAgICAgIHF1ZXJ5LnNldChcIm1vZGVcIiwgXCJlZGl0XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGFwcGVuZEV4cGVuc2VUaWNrZXRSZXR1cm5RdWVyeShxdWVyeSwgdGlja2V0UmV0dXJuQ29udGV4dCk7XHJcblxyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXRMaW5lRGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcclxuICAgICAgICBieXBhc3NHdWFyZE9uY2U6IHNob3VsZE9wZW5JbkVkaXRNb2RlLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbYnVzeSwgY2FuT3BlblNhdmVDb25maXJtLCBmaWxlSWQsIGhhbmRsZVVwZGF0ZSwgaXNFZGl0aW5nLCBpc0Zyb21FeHBlbnNlTGluZSwgaXNGcm9tU2hlZXRMaW5rLCB0aWNrZXRSZXR1cm5Db250ZXh0XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soXHJcbiAgICAodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcclxuICAgICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xyXG4gICAgICBjb25zdCBjYXJkID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XHJcbiAgICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XHJcbiAgICAgIGlmICghbGluZUNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XHJcbiAgICAgIHJldHVybiBjYXJkO1xyXG4gICAgfSxcclxuICAgIFtsaW5lQ29udGFpbmVyUmVmXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG9wZW5GaWxlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgdm9pZCBvcGVuUHJldmlldygpO1xyXG4gIH0sIFtvcGVuUHJldmlld10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGlzRnJvbVNoZWV0TGluaykgcmV0dXJuO1xyXG4gICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dCh0aWNrZXRSZXR1cm5Db250ZXh0Py5zaGVldElkIHx8IGhlYWRlckV4cGVuc2VTaGVldElkIHx8IGNvbnRleHRTaGVldElkKTtcclxuICAgIGlmICghc2FmZVNoZWV0SWQpIHJldHVybjtcclxuXHJcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChidWlsZEV4cGVuc2VTaGVldERldGFpbFVybChzYWZlU2hlZXRJZCksIHtcclxuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXHJcbiAgICB9KTtcclxuICB9LCBbY29udGV4dFNoZWV0SWQsIGhlYWRlckV4cGVuc2VTaGVldElkLCBpc0VkaXRpbmcsIGlzRnJvbVNoZWV0TGluaywgdGlja2V0UmV0dXJuQ29udGV4dF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgb3BlbkxpbmVEZXRhaWwsXHJcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcclxuICAgIG9wZW5GaWxlLFxyXG4gICAgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuXHJcbmNvbnN0IElNQUdFX0VYVEVOU0lPTlMgPSBuZXcgU2V0PHN0cmluZz4oW1wianBnXCIsIFwianBlZ1wiLCBcInBuZ1wiLCBcIndlYnBcIiwgXCJnaWZcIiwgXCJibXBcIiwgXCJoZWljXCIsIFwiaGVpZlwiLCBcImF2aWZcIl0pO1xyXG5cclxuY29uc3QgZ2V0RmlsZUV4dGVuc2lvbkZyb21QYXRoID0gKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHNvdXJjZSA9IHNhZmVUZXh0KHZhbHVlKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGlmICghc291cmNlKSByZXR1cm4gXCJcIjtcclxuXHJcbiAgY29uc3Qgd2l0aG91dFF1ZXJ5ID0gc291cmNlLnNwbGl0KFwiP1wiKVswXS5zcGxpdChcIiNcIilbMF07XHJcbiAgY29uc3QgcGFydHMgPSB3aXRob3V0UXVlcnkuc3BsaXQoXCIuXCIpO1xyXG4gIGlmIChwYXJ0cy5sZW5ndGggPCAyKSByZXR1cm4gXCJcIjtcclxuXHJcbiAgY29uc3QgcmF3RXh0ID0gc2FmZVRleHQocGFydHNbcGFydHMubGVuZ3RoIC0gMV0pLnJlcGxhY2UoL1teYS16MC05XS9nLCBcIlwiKTtcclxuICByZXR1cm4gcmF3RXh0ID09PSBcImpwZWdcIiA/IFwianBnXCIgOiByYXdFeHQ7XHJcbn07XHJcblxyXG4vLyBEZXRlY3RzIHdoZXRoZXIgb25lIHRpY2tldCBzb3VyY2UgY2FuIHJlbmRlciBhcyBhbiBpbmxpbmUgaW1hZ2UgcHJldmlldy5cclxuZXhwb3J0IGNvbnN0IGhhc0V4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdTb3VyY2UgPSAodXJsVmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRVcmwgPSBzYWZlVGV4dCh1cmxWYWx1ZSk7XHJcbiAgaWYgKCFub3JtYWxpemVkVXJsKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmIChub3JtYWxpemVkVXJsLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChcImRhdGE6aW1hZ2UvXCIpKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgY29uc3QgZXh0ZW5zaW9uID0gZ2V0RmlsZUV4dGVuc2lvbkZyb21QYXRoKG5vcm1hbGl6ZWRVcmwpO1xyXG4gIGlmIChleHRlbnNpb24gJiYgSU1BR0VfRVhURU5TSU9OUy5oYXMoZXh0ZW5zaW9uKSkgcmV0dXJuIHRydWU7XHJcblxyXG4gIGNvbnN0IG5vcm1hbGl6ZWRMb3dlciA9IG5vcm1hbGl6ZWRVcmwudG9Mb3dlckNhc2UoKTtcclxuICBpZiAobm9ybWFsaXplZExvd2VyLmluY2x1ZGVzKFwiYmxvYi5jb3JlLndpbmRvd3MubmV0XCIpICYmIG5vcm1hbGl6ZWRMb3dlci5pbmNsdWRlcyhcImltYWdlXCIpKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IFNpbmdsZURhdGVQaWNrZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TaW5nbGVEYXRlUGlja2VyLnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIH0gZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBoYXNFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3U291cmNlIH0gZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL2V4cGVuc2VUaWNrZXRQcmV2aWV3VXRpbHMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVJlYWRPbmx5RmllbGQgZnJvbSBcIi4vRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0LnRzeFwiO1xyXG5cclxuY29uc3QgaGFzUmVhbEV4cGVuc2VTaGVldFZhbHVlID0gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gZmFsc2U7XHJcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwiLVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwiMFwiKSByZXR1cm4gZmFsc2U7XHJcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwibi9hXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJuYVwiKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtUHJvcHMgPSB7XHJcbiAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyO1xyXG4gIHN0YXR1c0xhYmVsOiBzdHJpbmc7XHJcbiAgZ2FzdG9UeXBlTGFiZWw6IHN0cmluZztcclxuICB0b3RhbEFtb3VudFRleHQ6IHN0cmluZztcclxuICB0cmFuc0RhdGVUZXh0OiBzdHJpbmc7XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGdhc3RvVHlwZU9wdGlvbnM6IEFycmF5PHsgdmFsdWU6IHN0cmluZzsgdGV4dDogc3RyaW5nIH0+O1xyXG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcclxuICBkZXNjcmlwdGlvbkludmFsaWQ6IGJvb2xlYW47XHJcbiAgZGVzY3JpcHRpb25JbnB1dFJlZjogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIGRyYWZ0R2FzdG9UeXBlOiBzdHJpbmc7XHJcbiAgZ2FzdG9UeXBlSW52YWxpZDogYm9vbGVhbjtcclxuICBnYXN0b1R5cGVJbnB1dFJlZjogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgY3VycmVuY3lDb2RlSW52YWxpZDogYm9vbGVhbjtcclxuICBjdXJyZW5jeUlucHV0UmVmOiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgZHJhZnRUcmFuc0RhdGU6IHN0cmluZztcclxuICBkcmFmdFVybEZpbGU6IHN0cmluZztcclxuICBkcmFmdEZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbk9wZW5GaWxlOiAoKSA9PiB2b2lkO1xyXG4gIG9uT3BlbkV4cGVuc2VTaGVldD86ICgpID0+IHZvaWQ7XHJcbiAgaGlkZU9wZW5GaWxlQWN0aW9uPzogYm9vbGVhbjtcclxufTtcclxuXHJcbi8vIFJlYWQtb25seSBhbmQgZWRpdGFibGUgaGVhZGVyIGZvcm0gZm9yIHRpY2tldCBkZXRhaWwuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtID0gKHtcclxuICBoZWFkZXIsXHJcbiAgc3RhdHVzTGFiZWwsXHJcbiAgZ2FzdG9UeXBlTGFiZWwsXHJcbiAgdG90YWxBbW91bnRUZXh0LFxyXG4gIHRyYW5zRGF0ZVRleHQsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGdhc3RvVHlwZU9wdGlvbnMsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkZXNjcmlwdGlvbkludmFsaWQsXHJcbiAgZGVzY3JpcHRpb25JbnB1dFJlZixcclxuICBkcmFmdEdhc3RvVHlwZSxcclxuICBnYXN0b1R5cGVJbnZhbGlkLFxyXG4gIGdhc3RvVHlwZUlucHV0UmVmLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGN1cnJlbmN5Q29kZUludmFsaWQsXHJcbiAgY3VycmVuY3lJbnB1dFJlZixcclxuICBkcmFmdFRyYW5zRGF0ZSxcclxuICBkcmFmdFVybEZpbGUsXHJcbiAgZHJhZnRGaWxlTmFtZSxcclxuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UsXHJcbiAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZSxcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlLFxyXG4gIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2UsXHJcbiAgb25PcGVuRmlsZSxcclxuICBvbk9wZW5FeHBlbnNlU2hlZXQsXHJcbiAgaGlkZU9wZW5GaWxlQWN0aW9uID0gZmFsc2UsXHJcbn06IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtUHJvcHMpID0+IHtcclxuICBjb25zdCBwcmV2aWV3VXJsID0gc2FmZVRleHQoaXNFZGl0aW5nID8gZHJhZnRVcmxGaWxlIDogaGVhZGVyLnVybEZpbGUpO1xyXG4gIGNvbnN0IGNhbk9wZW5GaWxlID0gaGFzRXhwZW5zZVRpY2tldEltYWdlUHJldmlld1NvdXJjZShwcmV2aWV3VXJsKTtcclxuICBjb25zdCBzaG93RXhwZW5zZVNoZWV0RmllbGQgPSBoYXNSZWFsRXhwZW5zZVNoZWV0VmFsdWUoaGVhZGVyLmhvamFHYXN0b3NJZERpc3BsYXkpO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicmVsYXRpdmUgc2hhZG93LXhzIGdsYXNzLXBhbmVsIHAtNCBzcGFjZS15LTQgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV1cIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XHJcbiAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmllbGRfRmlsZUlkXCIsIFwiVGlja2V0XCIpfVxyXG4gICAgICAgICAgdmFsdWU9e2hlYWRlci5maWxlSWQgfHwgXCItXCJ9XHJcbiAgICAgICAgLz5cclxuXHJcbiAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmllbGRfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfVxyXG4gICAgICAgICAgdmFsdWU9e3N0YXR1c0xhYmVsIHx8IFwiLVwifVxyXG4gICAgICAgIC8+XHJcblxyXG4gICAgICAgIHtpc0VkaXRpbmcgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtOmNvbC1zcGFuLTIgc3BhY2UteS0xLjVcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIHJlZj17ZGVzY3JpcHRpb25JbnB1dFJlZn1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb3JtLWNvbnRyb2wke2Rlc2NyaXB0aW9uSW52YWxpZCA/IFwiIGJvcmRlci1yb3NlLTQwMCBiZy1yb3NlLTUwIGZvY3VzOmJvcmRlci1yb3NlLTQwMCBmb2N1czpyaW5nLXJvc2UtMjAwXCIgOiBcIlwifWB9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0RGVzY3JpcHRpb259XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cclxuICAgICAgICAgICAgICBhcmlhLWludmFsaWQ9e2Rlc2NyaXB0aW9uSW52YWxpZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwifVxyXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17aGVhZGVyLmRlc2NyaXB0aW9uIHx8IFwiLVwifVxyXG4gICAgICAgICAgICBmdWxsV2lkdGhcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKX1cclxuXHJcbiAgICAgICAge2lzRWRpdGluZyA/IChcclxuICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIil9XHJcbiAgICAgICAgICAgIG9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XHJcbiAgICAgICAgICAgIHZhbHVlPXtkcmFmdEdhc3RvVHlwZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRHYXN0b1R5cGVDaGFuZ2V9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cclxuICAgICAgICAgICAgaW5wdXRSZWY9e2dhc3RvVHlwZUlucHV0UmVmfVxyXG4gICAgICAgICAgICBpbnZhbGlkPXtnYXN0b1R5cGVJbnZhbGlkfVxyXG4gICAgICAgICAgICB1c2VQb3J0YWxcclxuICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxyXG4gICAgICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtnYXN0b1R5cGVMYWJlbCB8fCBcIi1cIn1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKX1cclxuXHJcbiAgICAgICAge3Nob3dFeHBlbnNlU2hlZXRGaWVsZCA/IChcclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmllbGRfRXhwZW5zZVNoZWV0RGlzcGxheVwiLCBcIkV4cGVuc2Ugc2hlZXRcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtoZWFkZXIuaG9qYUdhc3Rvc0lkRGlzcGxheSB8fCBcIi1cIn1cclxuICAgICAgICAgICAgb25DbGljaz17b25PcGVuRXhwZW5zZVNoZWV0fVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAge2lzRWRpdGluZyA/IChcclxuICAgICAgICAgIDxFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17ZHJhZnRDdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlfVxyXG4gICAgICAgICAgICBpbnZhbGlkPXtjdXJyZW5jeUNvZGVJbnZhbGlkfVxyXG4gICAgICAgICAgICBpbnB1dFJlZj17Y3VycmVuY3lJbnB1dFJlZn1cclxuICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWN1cnJlbmN5XCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2hlYWRlci5jdXJyZW5jeUNvZGUgfHwgXCItXCJ9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcblxyXG4gICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1RvdGFsQW1vdW50XCIsIFwiVG90YWwgYW1vdW50XCIpfVxyXG4gICAgICAgICAgdmFsdWU9e3RvdGFsQW1vdW50VGV4dCB8fCBcIi1cIn1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICB7aXNFZGl0aW5nID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpdGEtZmllbGQtdGV4dFwiPlxyXG4gICAgICAgICAgICA8U2luZ2xlRGF0ZVBpY2tlclxyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DcmVhdGVkRGF0ZVwiLCBcIkRhdGVcIil9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0VHJhbnNEYXRlfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nfVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0NyZWF0ZWREYXRlXCIsIFwiRGF0ZVwiKX1cclxuICAgICAgICAgICAgICB2YWx1ZT17dHJhbnNEYXRlVGV4dCB8fCBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoaGVhZGVyLnRyYW5zRGF0ZSwgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCIpIHx8IFwiLVwifVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7Y2FuT3BlbkZpbGUgJiYgIWhpZGVPcGVuRmlsZUFjdGlvbiA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1lbmRcIj5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIlxyXG4gICAgICAgICAgICBvbkNsaWNrPXtvbk9wZW5GaWxlfVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7aW5kVChcIlRpY2tldHNfRGV0YWlsX1ZpZXdBdHRhY2htZW50XCIsIFwiVmVyIGFkanVudG9cIil9XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZURhdGVQYXJ0cyB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgfSBmcm9tIFwiLi4vZXhwZW5zZUZvcm1hdHRlcnMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZU51bWJlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgZnJvbSBcIi4vRXhwZW5zZVNlY3Rpb25EaXZpZGVyLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpbWVsaW5lQ2FyZCBmcm9tIFwiLi9FeHBlbnNlVGltZWxpbmVDYXJkLnRzeFwiO1xyXG5cclxudHlwZSBQYWdpbmF0aW9uTGFiZWxzID0ge1xyXG4gIGZpcnN0OiBzdHJpbmc7XHJcbiAgcHJldjogc3RyaW5nO1xyXG4gIG5leHQ6IHN0cmluZztcclxuICBsYXN0OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXRMaW5lc0xpc3RQcm9wcyA9IHtcclxuICB2aXNpYmxlTGluZXM6IEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lW107XHJcbiAgdG90YWxMaW5lUGFnZXM6IG51bWJlcjtcclxuICBsaW5lUGFnZTogbnVtYmVyO1xyXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIHBhZ2luYXRpb25MYWJlbHM6IFBhZ2luYXRpb25MYWJlbHM7XHJcbiAgY29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBvbkxpbmVQYWdlQ2hhbmdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xyXG4gIG9uT3BlbkxpbmU6IChsaW5lUmVjSWQ6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdFF0eVZhbHVlID0gKHZhbHVlOiBudW1iZXIgfCBudWxsKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gZm9ybWF0RXhwZW5zZU51bWJlcih2YWx1ZSwge1xyXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICBmYWxsYmFjazogXCItXCIsXHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBFTVBUWV9EQVRFX1BBUlRTOiBFeHBlbnNlRGF0ZVBhcnRzID0ge1xyXG4gIHllYXI6IFwiLS1cIixcclxuICBtb250aDogXCItLVwiLFxyXG4gIGRheTogXCItLVwiLFxyXG59O1xyXG5cclxuY29uc3QgVElDS0VUX0xJTkVfREFURV9QQU5FTF9JQ09OID0gKFxyXG4gIDxzdmdcclxuICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICBmaWxsPVwibm9uZVwiXHJcbiAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgc3Ryb2tlV2lkdGg9XCIxXCJcclxuICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcclxuICAgIGNsYXNzTmFtZT1cImgtMTAgdy0xMCB0ZXh0LXNsYXRlLTUwMFwiXHJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gID5cclxuICAgIDxwYXRoIHN0cm9rZT1cIm5vbmVcIiBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMTQgM3Y0YTEgMSAwIDAgMCAxIDFoNFwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTE3IDIxaC0xMGEyIDIgMCAwIDEgLTIgLTJ2LTE0YTIgMiAwIDAgMSAyIC0yaDdsNSA1djExYTIgMiAwIDAgMSAtMiAyXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNOSA3bDEgMFwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTkgMTNsNiAwXCIgLz5cclxuICAgIDxwYXRoIGQ9XCJNMTMgMTdsMiAwXCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbi8vIFRpY2tldCBsaW5lcyBzZWN0aW9uIHJlbmRlcmVkIHdpdGggdGltZWxpbmUgY2FyZHMgYW5kIHBhZ2luZyBjb250cm9scy5cclxuY29uc3QgRXhwZW5zZVRpY2tldExpbmVzTGlzdCA9ICh7XHJcbiAgdmlzaWJsZUxpbmVzLFxyXG4gIHRvdGFsTGluZVBhZ2VzLFxyXG4gIGxpbmVQYWdlLFxyXG4gIGN1cnJlbmN5Q29kZSxcclxuICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gIGNvbnRhaW5lclJlZixcclxuICBvbkxpbmVQYWdlQ2hhbmdlLFxyXG4gIG9uT3BlbkxpbmUsXHJcbn06IEV4cGVuc2VUaWNrZXRMaW5lc0xpc3RQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzcGFjZS15LTBcIj5cclxuICAgICAgPEV4cGVuc2VTZWN0aW9uRGl2aWRlciBsYWJlbD17aW5kVChcIlRpY2tldHNfRGV0YWlsX0xpbmVzXCIsIFwiTGluZXNcIil9IGNsYXNzTmFtZT1cImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyLS1zcGFjZWRcIiAvPlxyXG5cclxuICAgICAge3Zpc2libGVMaW5lcy5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2luZFQoXCJUaWNrZXRzX0RldGFpbF9Ob0xpbmVzXCIsIFwiTm8gbGluZXMgZm9yIHRoaXMgdGlja2V0LlwiKX0gLz5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8ZGl2IHJlZj17Y29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cclxuICAgICAgICAgIHt2aXNpYmxlTGluZXMubWFwKChsaW5lKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFtb3VudFRleHQgPSBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kobGluZS50b3RhbEFtb3VudCwgY3VycmVuY3lDb2RlKTtcclxuICAgICAgICAgICAgY29uc3QgcXR5VGV4dCA9IGZvcm1hdFF0eVZhbHVlKGxpbmUucXR5KTtcclxuICAgICAgICAgICAgY29uc3QgcHJpY2VUZXh0ID0gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGxpbmUucHJpY2UsIGN1cnJlbmN5Q29kZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gbGluZS5kZXNjcmlwdGlvbiB8fCBsaW5lLnJlY0lkIHx8IFwiLVwiO1xyXG4gICAgICAgICAgICBjb25zdCBzdWJ0aXRsZSA9IGAke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfTogJHtxdHlUZXh0fSAgICR7aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJpY2VcIiwgXCJQcmljZVwiKX06ICR7cHJpY2VUZXh0fWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmVLZXkgPVxyXG4gICAgICAgICAgICAgIFN0cmluZyhsaW5lLnJlY0lkIHx8IFwiXCIpLnRyaW0oKSB8fFxyXG4gICAgICAgICAgICAgIFtsaW5lLmRlc2NyaXB0aW9uLCBsaW5lLnRvdGFsQW1vdW50LCBsaW5lLnByaWNlLCBsaW5lLnF0eV0ubWFwKCh2YWx1ZSkgPT4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKSkuam9pbihcInxcIik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtsaW5lS2V5fSBjbGFzc05hbWU9XCJ0aW1lbGluZS1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxyXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e0VNUFRZX0RBVEVfUEFSVFN9XHJcbiAgICAgICAgICAgICAgICAgIGRhdGVQYW5lbENvbnRlbnQ9e1RJQ0tFVF9MSU5FX0RBVEVfUEFORUxfSUNPTn1cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxyXG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZT17c3VidGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgIHN1YnRpdGxlQ2xhc3NOYW1lPVwiZXhwZW5zZS1zaGVldC1jYXJkX19zdWJ0aXRsZSBleHBlbnNlLWxpbmUtY2FyZF9fbWV0YSB0ZXh0LWxlZnRcIlxyXG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxyXG4gICAgICAgICAgICAgICAgICBvbk9wZW49eygpID0+IG9uT3BlbkxpbmUobGluZS5yZWNJZCl9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlQ2xhc3NOYW1lPVwidGltZWxpbmUtbmFtZSBleHBlbnNlLWxpbmUtY2FyZF9fdGl0bGUgdGV4dC1sZWZ0XCJcclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxyXG4gICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsTGluZVBhZ2VzfVxyXG4gICAgICAgIGN1cnJlbnRQYWdlPXtsaW5lUGFnZX1cclxuICAgICAgICBvblBhZ2VDaGFuZ2U9e29uTGluZVBhZ2VDaGFuZ2V9XHJcbiAgICAgICAgbGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxyXG4gICAgICAvPlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0TGluZXNMaXN0O1xyXG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IFRpY2tldFByZXZpZXdQb2ludCB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbFByb3BzID0ge1xyXG4gIG9wZW46IGJvb2xlYW47XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBlcnJvcjogc3RyaW5nO1xyXG4gIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgaW1hZ2VBbHQ6IHN0cmluZztcclxuICBzY2FsZTogbnVtYmVyO1xyXG4gIHRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50O1xyXG4gIHN1cmZhY2VSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XHJcbiAgb25Qb2ludGVyRG93bjogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIG9uUG9pbnRlck1vdmU6IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICBvblBvaW50ZXJFbmQ6IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICBvbldoZWVsOiAoZXZlbnQ6IFJlYWN0LldoZWVsRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyB0aGUgdGlja2V0IGltYWdlIHByZXZpZXcgb3ZlcmxheSB3aXRoIHpvb20gYW5kIHBhbiBnZXN0dXJlcy5cclxuY29uc3QgRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbCA9ICh7XHJcbiAgb3BlbixcclxuICBidXN5LFxyXG4gIGVycm9yLFxyXG4gIGltYWdlVXJsLFxyXG4gIGltYWdlQWx0LFxyXG4gIHNjYWxlLFxyXG4gIHRyYW5zbGF0ZSxcclxuICBzdXJmYWNlUmVmLFxyXG4gIG9uQ2xvc2UsXHJcbiAgb25Qb2ludGVyRG93bixcclxuICBvblBvaW50ZXJNb3ZlLFxyXG4gIG9uUG9pbnRlckVuZCxcclxuICBvbldoZWVsLFxyXG59OiBFeHBlbnNlVGlja2V0UHJldmlld01vZGFsUHJvcHMpID0+IHtcclxuICBpZiAoIW9wZW4pIHJldHVybiBudWxsO1xyXG5cclxuICByZXR1cm4gY3JlYXRlUG9ydGFsKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG92ZXJzY3JvbGwtY29udGFpbiBiZy1zbGF0ZS05NTAvNDUgcHgtNCBweS02IGJhY2tkcm9wLWJsdXItbWRcIj5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fQ2xvc2VcIiwgXCJDbG9zZVwiKX1cclxuICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wXCJcclxuICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxyXG4gICAgICAvPlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9DbG9zZVwiLCBcIkNsb3NlXCIpfVxyXG4gICAgICAgIGNsYXNzTmFtZT1cImZpeGVkIHJpZ2h0LTQgdG9wLVtjYWxjKDFyZW0rZW52KHNhZmUtYXJlYS1pbnNldC10b3AsMHB4KSldIHotWzYwMDAyMF0gaW5saW5lLWZsZXggaC0xMCB3LTEwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMC82MCBiZy1zbGF0ZS05MDAvNzggdGV4dC1zbGF0ZS0xMDAgc2hhZG93LWxnIHRyYW5zaXRpb24gaG92ZXI6Ymctc2xhdGUtOTAwLzg4IGZvY3VzLXZpc2libGU6b3V0bGluZS1oaWRkZW4gZm9jdXMtdmlzaWJsZTpyaW5nLTIgZm9jdXMtdmlzaWJsZTpyaW5nLXNsYXRlLTIwMC84MFwiXG4gICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XHJcbiAgICAgID5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgIGQ9XCJNNiA2TDE4IDE4TTE4IDZMNiAxOFwiXHJcbiAgICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMS43NVwiXHJcbiAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXggbWF4LWgtWzkydmhdIG1heC13LVs5MnZ3XSBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgb3ZlcnNjcm9sbC1jb250YWluXCI+XHJcbiAgICAgICAge2J1c3kgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS0xMDBcIj5cclxuICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cclxuICAgICAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IGVycm9yID8gKFxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXJvc2UtMjAwXCI+e2Vycm9yfTwvcD5cclxuICAgICAgICApIDogaW1hZ2VVcmwgPyAoXHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIHJlZj17c3VyZmFjZVJlZn1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgbWF4LWgtWzkwdmhdIG1heC13LVs5MnZ3XSBvdmVyZmxvdy1oaWRkZW4gcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gdG91Y2gtbm9uZSBvdmVyc2Nyb2xsLWNvbnRhaW5cIlxuICAgICAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7IHRvdWNoQWN0aW9uOiBcIm5vbmVcIiB9fVxyXG4gICAgICAgICAgICBvblBvaW50ZXJEb3duPXtvblBvaW50ZXJEb3dufVxyXG4gICAgICAgICAgICBvblBvaW50ZXJNb3ZlPXtvblBvaW50ZXJNb3ZlfVxyXG4gICAgICAgICAgICBvblBvaW50ZXJVcD17b25Qb2ludGVyRW5kfVxyXG4gICAgICAgICAgICBvblBvaW50ZXJDYW5jZWw9e29uUG9pbnRlckVuZH1cclxuICAgICAgICAgICAgb25XaGVlbD17b25XaGVlbH1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgIHNyYz17aW1hZ2VVcmx9XHJcbiAgICAgICAgICAgICAgYWx0PXtpbWFnZUFsdCB8fCBpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIil9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtbm9uZSBtYXgtaC1bOTB2aF0gdy1hdXRvIG1heC13LVs5MnZ3XSBzZWxlY3Qtbm9uZSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBvYmplY3QtY29udGFpbiBzaGFkb3ctMnhsXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7dHJhbnNsYXRlLnh9cHgsICR7dHJhbnNsYXRlLnl9cHgsIDApIHNjYWxlKCR7c2NhbGV9KWAsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46IFwiY2VudGVyIGNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogc2NhbGUgPD0gMSA/IFwidHJhbnNmb3JtIDE0MG1zIGVhc2Utb3V0XCIgOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIGRyYWdnYWJsZT17ZmFsc2V9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTEwMFwiPntpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKX08L3A+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj4sXHJcbiAgICBkb2N1bWVudC5ib2R5XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWw7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0U3RpY2t5UHJldmlld1Byb3BzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgZXJyb3I6IHN0cmluZztcclxuICBpbWFnZVVybDogc3RyaW5nO1xyXG4gIGltYWdlQWx0OiBzdHJpbmc7XHJcbiAgZmlsZU5hbWU6IHN0cmluZztcclxuICBvbk9wZW46ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIG9uZSBjb21wYWN0IHRpY2tldCBwcmV2aWV3IHRoYXQgc3RheXMgdmlzaWJsZSB3aGlsZSBkZXRhaWwgY29udGVudCBzY3JvbGxzLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0U3RpY2t5UHJldmlldyA9ICh7XHJcbiAgYnVzeSxcclxuICBlcnJvcixcclxuICBpbWFnZVVybCxcclxuICBpbWFnZUFsdCxcclxuICBmaWxlTmFtZSxcclxuICBvbk9wZW4sXHJcbn06IEV4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3UHJvcHMpID0+IHtcclxuICBjb25zdCBwcmV2aWV3TGFiZWwgPSBpbmRUKFwiVGlja2V0c19EZXRhaWxfVmlld0F0dGFjaG1lbnRcIiwgXCJWZXIgYWRqdW50b1wiKTtcclxuICBjb25zdCB0aWNrZXRMYWJlbCA9IGluZFQoXCJUaWNrZXRzX0ZpZWxkX0ZpbGVJZFwiLCBcIlRpY2tldFwiKTtcclxuICBjb25zdCBzYWZlRmlsZU5hbWUgPSBzYWZlVGV4dChmaWxlTmFtZSkgfHwgc2FmZVRleHQoaW1hZ2VBbHQpIHx8IHRpY2tldExhYmVsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzdGlja3kgdG9wLVs3MnB4XSB6LVsxODAwXSBsZzp0b3AtMjBcIj5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImdyb3VwIGJsb2NrIHctZnVsbCB0b3VjaC1tYW5pcHVsYXRpb24gdGV4dC1sZWZ0IGZvY3VzLXZpc2libGU6b3V0bGluZS1oaWRkZW4gZm9jdXMtdmlzaWJsZTpyaW5nLTIgZm9jdXMtdmlzaWJsZTpyaW5nLXByaW1hcnkvMzUgZm9jdXMtdmlzaWJsZTpyaW5nLW9mZnNldC0yXCJcclxuICAgICAgICBhcmlhLWxhYmVsPXtgJHtwcmV2aWV3TGFiZWx9OiAke3NhZmVGaWxlTmFtZX1gfVxyXG4gICAgICAgIG9uQ2xpY2s9e29uT3Blbn1cclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmZsb3ctaGlkZGVuIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHNoYWRvdy14cyB0cmFuc2l0aW9uLVt0cmFuc2Zvcm0sYm94LXNoYWRvdyxib3JkZXItY29sb3JdIGR1cmF0aW9uLTIwMCBncm91cC1ob3ZlcjotdHJhbnNsYXRlLXktWzFweF0gZ3JvdXAtaG92ZXI6Ym9yZGVyLXByaW1hcnkvMjUgZ3JvdXAtaG92ZXI6c2hhZG93LW1kXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBoLTM2IG92ZXJmbG93LWhpZGRlbiBiZy1saW5lYXItdG8tYnIgZnJvbS1zbGF0ZS0xMDAgdmlhLXdoaXRlIHRvLXNsYXRlLTIwMCBzbTpoLTQwIGxnOmgtWzM4MHB4XVwiPlxyXG4gICAgICAgICAgICB7aW1hZ2VVcmwgPyAoXHJcbiAgICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgICAgc3JjPXtpbWFnZVVybH1cclxuICAgICAgICAgICAgICAgIGFsdD17aW1hZ2VBbHQgfHwgdGlja2V0TGFiZWx9XHJcbiAgICAgICAgICAgICAgICB3aWR0aD17NjQwfVxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0PXs5NjB9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLWZ1bGwgdy1mdWxsIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIG9iamVjdC1jb3ZlciBvYmplY3QtY2VudGVyIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTMwMCBncm91cC1ob3ZlcjpzY2FsZS1bMS4wMTVdIGxnOm9iamVjdC1jb250YWluIGxnOm9iamVjdC1jZW50ZXIgbGc6cC0zXCJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaC1mdWxsIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBweC00XCI+XHJcbiAgICAgICAgICAgICAgICB7YnVzeSA/IChcclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBtaW4tdy0wIGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LXNsYXRlLTcwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBoLTExIHctMTEgc2hyaW5rLTAgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJnLXByaW1hcnkvOCB0ZXh0LXByaW1hcnlcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTcgMy43NWg2LjI1TDE4LjI1IDguNzVWMTkuNWEuNzUuNzUgMCAwIDEtLjc1Ljc1SDdhLjc1Ljc1IDAgMCAxLS43NS0uNzV2LTE1QS43NS43NSAwIDAgMSA3IDMuNzVaXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMS41XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNMTMgMy43NVY4LjVoNC43NVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuNVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLXctMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidHJ1bmNhdGUgdGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtOTAwXCI+e3NhZmVGaWxlTmFtZX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJsaW5lLWNsYW1wLTIgdGV4dC14cyB0ZXh0LXNsYXRlLTUwMFwiPntlcnJvciB8fCBwcmV2aWV3TGFiZWx9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvaW50ZXItZXZlbnRzLW5vbmUgYWJzb2x1dGUgaW5zZXQteC0wIHRvcC0wIGgtMTYgYmctbGluZWFyLXRvLWIgZnJvbS1zbGF0ZS05NTAvMjYgdmlhLXNsYXRlLTkwMC84IHRvLXRyYW5zcGFyZW50IGxnOmgtMjBcIiAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvaW50ZXItZXZlbnRzLW5vbmUgYWJzb2x1dGUgcmlnaHQtMyB0b3AtMyBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYmctcHJpbWFyeS85MiBweC0zIHB5LTEuNSB0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaC0zLjUgdy0zLjVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgICAgIGQ9XCJNMTUgM2g2djZNMjEgM2wtNyA3TTkgMjFIM3YtNk0zIDIxbDctN1wiXHJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMS41XCJcclxuICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgIHtwcmV2aWV3TGFiZWx9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpY2tldExpbmVzTGlzdCBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGluZXNMaXN0LnRzeFwiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIsIEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0UHJldmlld01vZGFsIGZyb20gXCIuL0V4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWwudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGlja2V0U3RpY2t5UHJldmlldyBmcm9tIFwiLi9FeHBlbnNlVGlja2V0U3RpY2t5UHJldmlldy50c3hcIjtcclxuaW1wb3J0IHR5cGUgeyBUaWNrZXRQcmV2aWV3UG9pbnQgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzXCI7XHJcblxyXG50eXBlIFBhZ2luYXRpb25MYWJlbHMgPSB7XHJcbiAgZmlyc3Q6IHN0cmluZztcclxuICBwcmV2OiBzdHJpbmc7XHJcbiAgbmV4dDogc3RyaW5nO1xyXG4gIGxhc3Q6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZVRpY2tldERldGFpbFZpZXdQcm9wcyA9IHtcclxuICBtb2RhbDoge1xyXG4gICAgb3BlbjogYm9vbGVhbjtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBjb25maXJtVGV4dDogc3RyaW5nO1xyXG4gICAgY2FuY2VsVGV4dDogc3RyaW5nO1xyXG4gICAgbG9hZGluZ1RleHQ6IHN0cmluZztcclxuICAgIHNob3dDYW5jZWw6IGJvb2xlYW47XHJcbiAgICBzaG93Q29uZmlybTogYm9vbGVhbjtcclxuICAgIGJ1c3k6IGJvb2xlYW47XHJcbiAgICBlcnJvcjogc3RyaW5nO1xyXG4gICAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbiAgICBvbkNhbmNlbDogKCkgPT4gdm9pZDtcclxuICB9O1xyXG4gIHByZXZpZXc6IHtcclxuICAgIG9wZW46IGJvb2xlYW47XHJcbiAgICBidXN5OiBib29sZWFuO1xyXG4gICAgZXJyb3I6IHN0cmluZztcclxuICAgIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICBpbWFnZUFsdDogc3RyaW5nO1xyXG4gICAgc2NhbGU6IG51bWJlcjtcclxuICAgIHRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50O1xyXG4gICAgc3VyZmFjZVJlZjogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xyXG4gICAgb25Qb2ludGVyRG93bjogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gICAgb25Qb2ludGVyTW92ZTogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gICAgb25Qb2ludGVyRW5kOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgICBvbldoZWVsOiAoZXZlbnQ6IFJlYWN0LldoZWVsRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIH07XHJcbiAgY29udGVudDoge1xyXG4gICAgaXNMb2FkaW5nOiBib29sZWFuO1xyXG4gICAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xyXG4gICAgc2hvd1N0aWNreVByZXZpZXc6IGJvb2xlYW47XHJcbiAgICBwcmV2aWV3QnVzeTogYm9vbGVhbjtcclxuICAgIHByZXZpZXdFcnJvcjogc3RyaW5nO1xyXG4gICAgcHJldmlld0ltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICBwcmV2aWV3RmlsZU5hbWU6IHN0cmluZztcclxuICAgIHByZXZpZXdBbHRUZXh0OiBzdHJpbmc7XHJcbiAgICBvbk9wZW5QcmV2aWV3OiAoKSA9PiB2b2lkO1xyXG4gICAgc3RhdHVzTGFiZWw6IHN0cmluZztcclxuICAgIGdhc3RvVHlwZUxhYmVsOiBzdHJpbmc7XHJcbiAgICB0b3RhbEFtb3VudFRleHQ6IHN0cmluZztcclxuICAgIHRyYW5zRGF0ZVRleHQ6IHN0cmluZztcclxuICAgIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICAgIGdhc3RvVHlwZU9wdGlvbnM6IEFycmF5PHsgdmFsdWU6IHN0cmluZzsgdGV4dDogc3RyaW5nIH0+O1xyXG4gICAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gICAgZGVzY3JpcHRpb25JbnZhbGlkOiBib29sZWFuO1xyXG4gICAgZGVzY3JpcHRpb25JbnB1dFJlZjogUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICAgIGRyYWZ0R2FzdG9UeXBlOiBzdHJpbmc7XHJcbiAgICBnYXN0b1R5cGVJbnZhbGlkOiBib29sZWFuO1xyXG4gICAgZ2FzdG9UeXBlSW5wdXRSZWY6IFJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gICAgY3VycmVuY3lDb2RlSW52YWxpZDogYm9vbGVhbjtcclxuICAgIGN1cnJlbmN5SW5wdXRSZWY6IFJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gICAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XHJcbiAgICBkcmFmdEZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICAgIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgb25PcGVuRmlsZTogKCkgPT4gdm9pZDtcclxuICAgIG9uT3BlbkV4cGVuc2VTaGVldD86ICgpID0+IHZvaWQ7XHJcbiAgICB2aXNpYmxlTGluZXM6IEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lW107XHJcbiAgICB0b3RhbExpbmVQYWdlczogbnVtYmVyO1xyXG4gICAgbGluZVBhZ2U6IG51bWJlcjtcclxuICAgIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gICAgcGFnaW5hdGlvbkxhYmVsczogUGFnaW5hdGlvbkxhYmVscztcclxuICAgIGNvbnRhaW5lclJlZjogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgICBvbkxpbmVQYWdlQ2hhbmdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xyXG4gICAgb25PcGVuTGluZTogKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFJlbmRlcnMgdGhlIHRpY2tldCBkZXRhaWwgdmlldyB3aGlsZSB0aGUgcGFnZSBjb250YWluZXIgb3ducyBvcmNoZXN0cmF0aW9uLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0RGV0YWlsVmlldyA9ICh7IG1vZGFsLCBwcmV2aWV3LCBjb250ZW50IH06IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3UHJvcHMpID0+IHtcclxuICBjb25zdCBkZXRhaWxCb2R5ID0gKFxyXG4gICAgPD5cclxuICAgICAgPEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtXHJcbiAgICAgICAgaGVhZGVyPXtjb250ZW50LmhlYWRlcn1cclxuICAgICAgICBzdGF0dXNMYWJlbD17Y29udGVudC5zdGF0dXNMYWJlbH1cclxuICAgICAgICBnYXN0b1R5cGVMYWJlbD17Y29udGVudC5nYXN0b1R5cGVMYWJlbH1cclxuICAgICAgICB0b3RhbEFtb3VudFRleHQ9e2NvbnRlbnQudG90YWxBbW91bnRUZXh0fVxyXG4gICAgICAgIHRyYW5zRGF0ZVRleHQ9e2NvbnRlbnQudHJhbnNEYXRlVGV4dH1cclxuICAgICAgICBpc0VkaXRpbmc9e2NvbnRlbnQuaXNFZGl0aW5nfVxyXG4gICAgICAgIGdhc3RvVHlwZU9wdGlvbnM9e2NvbnRlbnQuZ2FzdG9UeXBlT3B0aW9uc31cclxuICAgICAgICBkcmFmdERlc2NyaXB0aW9uPXtjb250ZW50LmRyYWZ0RGVzY3JpcHRpb259XHJcbiAgICAgICAgZGVzY3JpcHRpb25JbnZhbGlkPXtjb250ZW50LmRlc2NyaXB0aW9uSW52YWxpZH1cclxuICAgICAgICBkZXNjcmlwdGlvbklucHV0UmVmPXtjb250ZW50LmRlc2NyaXB0aW9uSW5wdXRSZWZ9XHJcbiAgICAgICAgZHJhZnRHYXN0b1R5cGU9e2NvbnRlbnQuZHJhZnRHYXN0b1R5cGV9XHJcbiAgICAgICAgZ2FzdG9UeXBlSW52YWxpZD17Y29udGVudC5nYXN0b1R5cGVJbnZhbGlkfVxyXG4gICAgICAgIGdhc3RvVHlwZUlucHV0UmVmPXtjb250ZW50Lmdhc3RvVHlwZUlucHV0UmVmfVxyXG4gICAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlPXtjb250ZW50LmRyYWZ0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgIGN1cnJlbmN5Q29kZUludmFsaWQ9e2NvbnRlbnQuY3VycmVuY3lDb2RlSW52YWxpZH1cclxuICAgICAgICBjdXJyZW5jeUlucHV0UmVmPXtjb250ZW50LmN1cnJlbmN5SW5wdXRSZWZ9XHJcbiAgICAgICAgZHJhZnRUcmFuc0RhdGU9e2NvbnRlbnQuZHJhZnRUcmFuc0RhdGV9XHJcbiAgICAgICAgZHJhZnRVcmxGaWxlPXtjb250ZW50LmRyYWZ0VXJsRmlsZX1cclxuICAgICAgICBkcmFmdEZpbGVOYW1lPXtjb250ZW50LmRyYWZ0RmlsZU5hbWV9XHJcbiAgICAgICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlPXtjb250ZW50Lm9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZX1cclxuICAgICAgICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlPXtjb250ZW50Lm9uRHJhZnRHYXN0b1R5cGVDaGFuZ2V9XHJcbiAgICAgICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZT17Y29udGVudC5vbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlfVxyXG4gICAgICAgIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2U9e2NvbnRlbnQub25EcmFmdFRyYW5zRGF0ZUNoYW5nZX1cclxuICAgICAgICBvbk9wZW5GaWxlPXtjb250ZW50Lm9uT3BlbkZpbGV9XHJcbiAgICAgICAgb25PcGVuRXhwZW5zZVNoZWV0PXtjb250ZW50Lm9uT3BlbkV4cGVuc2VTaGVldH1cclxuICAgICAgICBoaWRlT3BlbkZpbGVBY3Rpb249e2NvbnRlbnQuc2hvd1N0aWNreVByZXZpZXd9XHJcbiAgICAgIC8+XHJcbiAgICAgIDxFeHBlbnNlVGlja2V0TGluZXNMaXN0XHJcbiAgICAgICAgdmlzaWJsZUxpbmVzPXtjb250ZW50LnZpc2libGVMaW5lc31cclxuICAgICAgICB0b3RhbExpbmVQYWdlcz17Y29udGVudC50b3RhbExpbmVQYWdlc31cclxuICAgICAgICBsaW5lUGFnZT17Y29udGVudC5saW5lUGFnZX1cclxuICAgICAgICBjdXJyZW5jeUNvZGU9e2NvbnRlbnQuY3VycmVuY3lDb2RlfVxyXG4gICAgICAgIHBhZ2luYXRpb25MYWJlbHM9e2NvbnRlbnQucGFnaW5hdGlvbkxhYmVsc31cclxuICAgICAgICBjb250YWluZXJSZWY9e2NvbnRlbnQuY29udGFpbmVyUmVmfVxyXG4gICAgICAgIG9uTGluZVBhZ2VDaGFuZ2U9e2NvbnRlbnQub25MaW5lUGFnZUNoYW5nZX1cclxuICAgICAgICBvbk9wZW5MaW5lPXtjb250ZW50Lm9uT3BlbkxpbmV9XHJcbiAgICAgIC8+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPntjb250ZW50LnN0YXR1c308L2Rpdj5cclxuICAgIDwvPlxyXG4gICk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxyXG4gICAgICA8Q29uZmlybU1vZGFsXHJcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cclxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XHJcbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cclxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWwuY29uZmlybVRleHR9XHJcbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWwuY2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWwubG9hZGluZ1RleHR9XHJcbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cclxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XHJcbiAgICAgICAgYnVzeT17bW9kYWwuYnVzeX1cclxuICAgICAgICBlcnJvcj17bW9kYWwuZXJyb3J9XHJcbiAgICAgICAgc3RhdHVzPXttb2RhbC5zdGF0dXN9XHJcbiAgICAgICAgb25Db25maXJtPXttb2RhbC5vbkNvbmZpcm19XHJcbiAgICAgICAgb25DYW5jZWw9e21vZGFsLm9uQ2FuY2VsfVxyXG4gICAgICAvPlxyXG4gICAgICA8RXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbFxyXG4gICAgICAgIG9wZW49e3ByZXZpZXcub3Blbn1cclxuICAgICAgICBidXN5PXtwcmV2aWV3LmJ1c3l9XHJcbiAgICAgICAgZXJyb3I9e3ByZXZpZXcuZXJyb3J9XHJcbiAgICAgICAgaW1hZ2VVcmw9e3ByZXZpZXcuaW1hZ2VVcmx9XHJcbiAgICAgICAgaW1hZ2VBbHQ9e3ByZXZpZXcuaW1hZ2VBbHR9XHJcbiAgICAgICAgc2NhbGU9e3ByZXZpZXcuc2NhbGV9XHJcbiAgICAgICAgdHJhbnNsYXRlPXtwcmV2aWV3LnRyYW5zbGF0ZX1cclxuICAgICAgICBzdXJmYWNlUmVmPXtwcmV2aWV3LnN1cmZhY2VSZWZ9XHJcbiAgICAgICAgb25DbG9zZT17cHJldmlldy5vbkNsb3NlfVxyXG4gICAgICAgIG9uUG9pbnRlckRvd249e3ByZXZpZXcub25Qb2ludGVyRG93bn1cclxuICAgICAgICBvblBvaW50ZXJNb3ZlPXtwcmV2aWV3Lm9uUG9pbnRlck1vdmV9XHJcbiAgICAgICAgb25Qb2ludGVyRW5kPXtwcmV2aWV3Lm9uUG9pbnRlckVuZH1cclxuICAgICAgICBvbldoZWVsPXtwcmV2aWV3Lm9uV2hlZWx9XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCJcclxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBjb250ZW50LmlzTG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XHJcbiAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7Y29udGVudC5lcnJvck1lc3NhZ2UgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2NvbnRlbnQuZXJyb3JNZXNzYWdlfTwvZGl2PiA6IG51bGx9XHJcblxyXG4gICAgICB7IWNvbnRlbnQuaXNMb2FkaW5nICYmICFjb250ZW50LmVycm9yTWVzc2FnZSAmJiBjb250ZW50LmhlYWRlciA/IChcclxuICAgICAgICBjb250ZW50LnNob3dTdGlja3lQcmV2aWV3ID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgbGc6Z3JpZCBsZzpncmlkLWNvbHMtW21pbm1heCgwLDFmcilfMzIwcHhdIGxnOmdhcC00IGxnOnNwYWNlLXktMFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zdGFydC0yXCI+XHJcbiAgICAgICAgICAgICAgPEV4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3XHJcbiAgICAgICAgICAgICAgICBidXN5PXtjb250ZW50LnByZXZpZXdCdXN5fVxyXG4gICAgICAgICAgICAgICAgZXJyb3I9e2NvbnRlbnQucHJldmlld0Vycm9yfVxyXG4gICAgICAgICAgICAgICAgaW1hZ2VVcmw9e2NvbnRlbnQucHJldmlld0ltYWdlVXJsfVxyXG4gICAgICAgICAgICAgICAgaW1hZ2VBbHQ9e2NvbnRlbnQucHJldmlld0FsdFRleHR9XHJcbiAgICAgICAgICAgICAgICBmaWxlTmFtZT17Y29udGVudC5wcmV2aWV3RmlsZU5hbWV9XHJcbiAgICAgICAgICAgICAgICBvbk9wZW49e2NvbnRlbnQub25PcGVuUHJldmlld31cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgbGc6Y29sLXN0YXJ0LTEgbGc6cm93LXN0YXJ0LTFcIj57ZGV0YWlsQm9keX08L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICBkZXRhaWxCb2R5XHJcbiAgICAgICAgKVxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0RGV0YWlsVmlldztcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0c0NhY2hlZFN0YXRlIH0gZnJvbSBcIi4uL3VzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUudHNcIjtcclxuaW1wb3J0IHtcclxuICBidWlsZEV4cGVuc2VTaGVldERldGFpbFVybCxcclxuICBidWlsZEV4cGVuc2VUaWNrZXRMaW5rVXJsLFxyXG4gIHR5cGUgRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHRvRXhwZW5zZUlzb0RhdGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb25BcmdzID0ge1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGRldGFpbE9yaWdpbjogc3RyaW5nO1xyXG4gIGhlYWRlclRyYW5zRGF0ZTogdW5rbm93bjtcclxuICB0aWNrZXRSZXR1cm5Db250ZXh0PzogRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQgfCBudWxsO1xyXG4gIHJlYWRDYWNoZWRTdGF0ZTogKCkgPT4gRXhwZW5zZVRpY2tldHNDYWNoZWRTdGF0ZSB8IG51bGw7XHJcbiAgc2F2ZUNhY2hlZFN0YXRlOiAoc3RhdGU6IEV4cGVuc2VUaWNrZXRzQ2FjaGVkU3RhdGUpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBLZWVwcyBuYXRpdmUgYmFjayBuYXZpZ2F0aW9uIGFsaWduZWQgd2l0aCB0aGUgdGlja2V0IGVudHJ5IHBvaW50IGFuZCBwcmVzZXJ2ZXMgY2FjaGVkIGxpbmstbW9kZSBzdGF0ZS5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxCYWNrTmF2aWdhdGlvbiA9ICh7XHJcbiAgZmlsZUlkLFxyXG4gIGRldGFpbE9yaWdpbixcclxuICBoZWFkZXJUcmFuc0RhdGUsXHJcbiAgdGlja2V0UmV0dXJuQ29udGV4dCxcclxuICByZWFkQ2FjaGVkU3RhdGUsXHJcbiAgc2F2ZUNhY2hlZFN0YXRlLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsQmFja05hdmlnYXRpb25BcmdzKSA9PiB7XHJcbiAgY29uc3Qgc2hvdWxkUmV0dXJuVG9UaWNrZXRMaXN0ID0gdGlja2V0UmV0dXJuQ29udGV4dD8ub3JpZ2luID09PSBcInNoZWV0LWxpbmtcIiB8fCAhdGlja2V0UmV0dXJuQ29udGV4dD8uc2hlZXRJZDtcclxuXHJcbiAgY29uc3QgbmF0aXZlQmFja1VybCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgaWYgKHRpY2tldFJldHVybkNvbnRleHQ/Lm9yaWdpbiA9PT0gXCJzaGVldC1saW5rXCIgJiYgdGlja2V0UmV0dXJuQ29udGV4dC5zaGVldElkKSB7XHJcbiAgICAgIHJldHVybiBidWlsZEV4cGVuc2VUaWNrZXRMaW5rVXJsKHRpY2tldFJldHVybkNvbnRleHQuc2hlZXRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRpY2tldFJldHVybkNvbnRleHQ/LnNoZWV0SWQpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkRXhwZW5zZVNoZWV0RGV0YWlsVXJsKHRpY2tldFJldHVybkNvbnRleHQuc2hlZXRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRldGFpbE9yaWdpbiA9PT0gXCJ0aWNrZXQtY3JlYXRlXCIpIHtcclxuICAgICAgY29uc3QgdGlja2V0RGF0ZSA9IHRvRXhwZW5zZUlzb0RhdGUoaGVhZGVyVHJhbnNEYXRlKSB8fCB0b0V4cGVuc2VJc29EYXRlKG5ldyBEYXRlKCkpO1xyXG4gICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICAgIHRpY2tldEZpbGVJZDogZmlsZUlkLFxyXG4gICAgICAgIHRpY2tldERhdGUsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGAvR2FzdG9zL1RpY2tldHM/JHtxdWVyeS50b1N0cmluZygpfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFwiL0dhc3Rvcy9UaWNrZXRzXCI7XHJcbiAgfSwgW2RldGFpbE9yaWdpbiwgZmlsZUlkLCBoZWFkZXJUcmFuc0RhdGUsIHRpY2tldFJldHVybkNvbnRleHRdKTtcclxuXHJcbiAgY29uc3QgcmVhcm1FeHBlbnNlVGlja2V0c1JldHVyblN0YXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgY2FjaGVkU3RhdGUgPSByZWFkQ2FjaGVkU3RhdGUoKTtcclxuICAgIGlmICghY2FjaGVkU3RhdGUpIHJldHVybjtcclxuICAgIHNhdmVDYWNoZWRTdGF0ZShjYWNoZWRTdGF0ZSk7XHJcbiAgfSwgW3JlYWRDYWNoZWRTdGF0ZSwgc2F2ZUNhY2hlZFN0YXRlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEJhY2tCdG5cIik7XHJcbiAgICBpZiAoIWJhY2tCdXR0b24pIHJldHVybjtcclxuXHJcbiAgICBiYWNrQnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtYmFjay11cmxcIiwgbmF0aXZlQmFja1VybCk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBiYWNrQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtYmFjay11cmxcIik7XHJcbiAgICB9O1xyXG4gIH0sIFtmaWxlSWQsIG5hdGl2ZUJhY2tVcmxdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghZmlsZUlkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaGFuZGxlTmF0aXZlQmFjayA9IChldmVudDogUG9wU3RhdGVFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQ/LnN0YXRlICYmIGV2ZW50LnN0YXRlLmluZFRyYXAgPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGV4ZWN1dGVCYWNrTmF2aWdhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZiAoc2hvdWxkUmV0dXJuVG9UaWNrZXRMaXN0KSB7XHJcbiAgICAgICAgICByZWFybUV4cGVuc2VUaWNrZXRzUmV0dXJuU3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UobmF0aXZlQmFja1VybCk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbihleGVjdXRlQmFja05hdmlnYXRpb24pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgaGFuZGxlTmF0aXZlQmFjayk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGhhbmRsZU5hdGl2ZUJhY2spO1xyXG4gICAgfTtcclxuICB9LCBbZmlsZUlkLCBuYXRpdmVCYWNrVXJsLCByZWFybUV4cGVuc2VUaWNrZXRzUmV0dXJuU3RhdGUsIHNob3VsZFJldHVyblRvVGlja2V0TGlzdF0pO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldy50c1wiO1xyXG5pbXBvcnQgeyBoYXNFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3U291cmNlIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldFByZXZpZXdVdGlscy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsQXJncyA9IHtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XHJcbiAgaGVhZGVyVXJsRmlsZT86IHN0cmluZyB8IG51bGw7XHJcbn07XHJcblxyXG4vLyBDZW50cmFsaXplcyBzdGlja3ktcHJldmlldyBhdmFpbGFiaWxpdHkgYW5kIGltYWdlIGxvYWRpbmcgZm9yIHRpY2tldCBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsID0gKHtcclxuICBmaWxlSWQsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGRyYWZ0VXJsRmlsZSxcclxuICBoZWFkZXJVcmxGaWxlLFxyXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsUHJldmlld1BhbmVsQXJncykgPT4ge1xyXG4gIGNvbnN0IHByZXZpZXdTb3VyY2VVcmwgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KGlzRWRpdGluZyA/IGRyYWZ0VXJsRmlsZSA6IGhlYWRlclVybEZpbGUpLCBbZHJhZnRVcmxGaWxlLCBoZWFkZXJVcmxGaWxlLCBpc0VkaXRpbmddKTtcclxuICBjb25zdCBzaG93U3RpY2t5UHJldmlldyA9IHVzZU1lbW8oKCkgPT4gaGFzRXhwZW5zZVRpY2tldEltYWdlUHJldmlld1NvdXJjZShwcmV2aWV3U291cmNlVXJsKSwgW3ByZXZpZXdTb3VyY2VVcmxdKTtcclxuICBjb25zdCBwcmV2aWV3ID0gdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldyh7XHJcbiAgICBmaWxlSWQsXHJcbiAgICBzb3VyY2VVcmw6IHByZXZpZXdTb3VyY2VVcmwsXHJcbiAgICBlbmFibGVkOiBzaG93U3RpY2t5UHJldmlldyxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNob3dTdGlja3lQcmV2aWV3LFxyXG4gICAgLi4ucHJldmlldyxcclxuICB9O1xyXG59O1xyXG4iLCAiXHVGRUZGaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0UHJldmlld0Jsb2IgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxuY29uc3QgUFJFVklFV19NQVhfU0NBTEUgPSA0O1xyXG5jb25zdCBQUkVWSUVXX1NDQUxFX1NURVAgPSAwLjI1O1xyXG5cclxuZXhwb3J0IHR5cGUgVGlja2V0UHJldmlld1BvaW50ID0ge1xyXG4gIHg6IG51bWJlcjtcclxuICB5OiBudW1iZXI7XHJcbn07XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdBcmdzID0ge1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIHNvdXJjZVVybDogc3RyaW5nO1xyXG4gIGVuYWJsZWQ/OiBib29sZWFuO1xyXG59O1xyXG5cclxuY29uc3QgY2xhbXBQcmV2aWV3U2NhbGUgPSAodmFsdWU6IG51bWJlcik6IG51bWJlciA9PiB7XHJcbiAgaWYgKCFOdW1iZXIuaXNGaW5pdGUodmFsdWUpKSByZXR1cm4gMTtcclxuICByZXR1cm4gTWF0aC5taW4oUFJFVklFV19NQVhfU0NBTEUsIE1hdGgubWF4KDEsIHZhbHVlKSk7XHJcbn07XHJcblxyXG5jb25zdCBnZXRQcmV2aWV3UG9pbnREaXN0YW5jZSA9IChsZWZ0OiBUaWNrZXRQcmV2aWV3UG9pbnQsIHJpZ2h0OiBUaWNrZXRQcmV2aWV3UG9pbnQpOiBudW1iZXIgPT4ge1xyXG4gIGNvbnN0IGRlbHRhWCA9IHJpZ2h0LnggLSBsZWZ0Lng7XHJcbiAgY29uc3QgZGVsdGFZID0gcmlnaHQueSAtIGxlZnQueTtcclxuICByZXR1cm4gTWF0aC5zcXJ0KGRlbHRhWCAqIGRlbHRhWCArIGRlbHRhWSAqIGRlbHRhWSk7XHJcbn07XHJcblxyXG5jb25zdCBnZXRQcmV2aWV3UG9pbnRDZW50ZXIgPSAobGVmdDogVGlja2V0UHJldmlld1BvaW50LCByaWdodDogVGlja2V0UHJldmlld1BvaW50KTogVGlja2V0UHJldmlld1BvaW50ID0+ICh7XHJcbiAgeDogKGxlZnQueCArIHJpZ2h0LngpIC8gMixcclxuICB5OiAobGVmdC55ICsgcmlnaHQueSkgLyAyLFxyXG59KTtcclxuXHJcbi8vIE1hbmFnZXMgdGlja2V0IGltYWdlIHByZXZpZXcgc3RhdGUgYW5kIHpvb20vcGFuIGdlc3R1cmVzLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldyA9ICh7IGZpbGVJZCwgc291cmNlVXJsLCBlbmFibGVkID0gdHJ1ZSB9OiBVc2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3QXJncykgPT4ge1xyXG4gIGNvbnN0IFtwcmV2aWV3T3Blbiwgc2V0UHJldmlld09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtwcmV2aWV3QnVzeSwgc2V0UHJldmlld0J1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtwcmV2aWV3RXJyb3IsIHNldFByZXZpZXdFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbcHJldmlld0ltYWdlVXJsLCBzZXRQcmV2aWV3SW1hZ2VVcmxdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3ByZXZpZXdTY2FsZSwgc2V0UHJldmlld1NjYWxlXSA9IHVzZVN0YXRlKDEpO1xyXG4gIGNvbnN0IFtwcmV2aWV3VHJhbnNsYXRlLCBzZXRQcmV2aWV3VHJhbnNsYXRlXSA9IHVzZVN0YXRlPFRpY2tldFByZXZpZXdQb2ludD4oeyB4OiAwLCB5OiAwIH0pO1xyXG5cclxuICBjb25zdCBwcmV2aWV3U2NhbGVSZWYgPSB1c2VSZWYoMSk7XHJcbiAgY29uc3QgcHJldmlld0ltYWdlVXJsUmVmID0gdXNlUmVmKFwiXCIpO1xyXG4gIGNvbnN0IHByZXZpZXdSZXF1ZXN0S2V5UmVmID0gdXNlUmVmKFwiXCIpO1xyXG4gIGNvbnN0IHByZXZpZXdMb2FkUHJvbWlzZVJlZiA9IHVzZVJlZjxQcm9taXNlPHN0cmluZz4gfCBudWxsPihudWxsKTtcclxuICBjb25zdCBwcmV2aWV3U3VyZmFjZVJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHByZXZpZXdUcmFuc2xhdGVSZWYgPSB1c2VSZWY8VGlja2V0UHJldmlld1BvaW50Pih7IHg6IDAsIHk6IDAgfSk7XHJcbiAgY29uc3QgcHJldmlld1BvaW50ZXJzUmVmID0gdXNlUmVmPE1hcDxudW1iZXIsIFRpY2tldFByZXZpZXdQb2ludD4+KG5ldyBNYXAoKSk7XHJcbiAgY29uc3QgcHJldmlld1BhblBvaW50ZXJSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcHJldmlld1Bhbkxhc3RQb2ludFJlZiA9IHVzZVJlZjxUaWNrZXRQcmV2aWV3UG9pbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZiA9IHVzZVJlZjx7XHJcbiAgICBkaXN0YW5jZTogbnVtYmVyO1xyXG4gICAgc2NhbGU6IG51bWJlcjtcclxuICAgIGNlbnRlcjogVGlja2V0UHJldmlld1BvaW50O1xyXG4gICAgdHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQ7XHJcbiAgfSB8IG51bGw+KG51bGwpO1xyXG5cclxuICBjb25zdCBhcHBseVByZXZpZXdUcmFuc2Zvcm0gPSB1c2VDYWxsYmFjaygobmV4dFNjYWxlOiBudW1iZXIsIG5leHRUcmFuc2xhdGU6IFRpY2tldFByZXZpZXdQb2ludCkgPT4ge1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZFNjYWxlID0gY2xhbXBQcmV2aWV3U2NhbGUobmV4dFNjYWxlKTtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc2xhdGUgPSBub3JtYWxpemVkU2NhbGUgPD0gMSA/IHsgeDogMCwgeTogMCB9IDogbmV4dFRyYW5zbGF0ZTtcclxuXHJcbiAgICBwcmV2aWV3U2NhbGVSZWYuY3VycmVudCA9IG5vcm1hbGl6ZWRTY2FsZTtcclxuICAgIHByZXZpZXdUcmFuc2xhdGVSZWYuY3VycmVudCA9IG5vcm1hbGl6ZWRUcmFuc2xhdGU7XHJcbiAgICBzZXRQcmV2aWV3U2NhbGUobm9ybWFsaXplZFNjYWxlKTtcclxuICAgIHNldFByZXZpZXdUcmFuc2xhdGUobm9ybWFsaXplZFRyYW5zbGF0ZSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCByZXNldFByZXZpZXdHZXN0dXJlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgcHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuY2xlYXIoKTtcclxuICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgYXBwbHlQcmV2aWV3VHJhbnNmb3JtKDEsIHsgeDogMCwgeTogMCB9KTtcclxuICB9LCBbYXBwbHlQcmV2aWV3VHJhbnNmb3JtXSk7XHJcblxyXG4gIGNvbnN0IHJlYnVpbGRQaW5jaFNuYXBzaG90ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgcG9pbnRlclBvaW50cyA9IEFycmF5LmZyb20ocHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQudmFsdWVzKCkpO1xyXG4gICAgaWYgKHBvaW50ZXJQb2ludHMubGVuZ3RoIDwgMikge1xyXG4gICAgICBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IFtsZWZ0LCByaWdodF0gPSBwb2ludGVyUG9pbnRzO1xyXG4gICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IHtcclxuICAgICAgZGlzdGFuY2U6IE1hdGgubWF4KDEsIGdldFByZXZpZXdQb2ludERpc3RhbmNlKGxlZnQsIHJpZ2h0KSksXHJcbiAgICAgIHNjYWxlOiBwcmV2aWV3U2NhbGVSZWYuY3VycmVudCxcclxuICAgICAgY2VudGVyOiBnZXRQcmV2aWV3UG9pbnRDZW50ZXIobGVmdCwgcmlnaHQpLFxyXG4gICAgICB0cmFuc2xhdGU6IHByZXZpZXdUcmFuc2xhdGVSZWYuY3VycmVudCxcclxuICAgIH07XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCByZXBsYWNlUHJldmlld0ltYWdlVXJsID0gdXNlQ2FsbGJhY2soKG5leHRVcmw6IHN0cmluZykgPT4ge1xyXG4gICAgc2V0UHJldmlld0ltYWdlVXJsKChwcmV2aW91cykgPT4ge1xyXG4gICAgICBpZiAocHJldmlvdXMgJiYgcHJldmlvdXMgIT09IG5leHRVcmwpIHtcclxuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHByZXZpb3VzKTtcclxuICAgICAgfVxyXG4gICAgICBwcmV2aWV3SW1hZ2VVcmxSZWYuY3VycmVudCA9IG5leHRVcmw7XHJcbiAgICAgIHJldHVybiBuZXh0VXJsO1xyXG4gICAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjbGVhclByZXZpZXdJbWFnZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHByZXZpZXdMb2FkUHJvbWlzZVJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIHNldFByZXZpZXdJbWFnZVVybCgocHJldmlvdXMpID0+IHtcclxuICAgICAgaWYgKHByZXZpb3VzKSB7XHJcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChwcmV2aW91cyk7XHJcbiAgICAgIH1cclxuICAgICAgcHJldmlld0ltYWdlVXJsUmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgICByZXR1cm4gXCJcIjtcclxuICAgIH0pO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgbG9hZFByZXZpZXdJbWFnZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xyXG4gICAgY29uc3QgY3VycmVudEZpbGVJZCA9IHNhZmVUZXh0KGZpbGVJZCk7XHJcbiAgICBjb25zdCBjdXJyZW50VXJsID0gc2FmZVRleHQoc291cmNlVXJsKTtcclxuICAgIGlmICghZW5hYmxlZCB8fCAhY3VycmVudEZpbGVJZCB8fCAhY3VycmVudFVybCkge1xyXG4gICAgICBzZXRQcmV2aWV3QnVzeShmYWxzZSk7XHJcbiAgICAgIHNldFByZXZpZXdFcnJvcihcIlwiKTtcclxuICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByZXZpZXdJbWFnZVVybFJlZi5jdXJyZW50KSB7XHJcbiAgICAgIHJldHVybiBwcmV2aWV3SW1hZ2VVcmxSZWYuY3VycmVudDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJldmlld0xvYWRQcm9taXNlUmVmLmN1cnJlbnQpIHtcclxuICAgICAgcmV0dXJuIHByZXZpZXdMb2FkUHJvbWlzZVJlZi5jdXJyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlcXVlc3RLZXkgPSBgJHtjdXJyZW50RmlsZUlkfV9fJHtjdXJyZW50VXJsfWA7XHJcbiAgICBwcmV2aWV3UmVxdWVzdEtleVJlZi5jdXJyZW50ID0gcmVxdWVzdEtleTtcclxuICAgIHNldFByZXZpZXdCdXN5KHRydWUpO1xyXG4gICAgc2V0UHJldmlld0Vycm9yKFwiXCIpO1xyXG5cclxuICAgIGNvbnN0IG5leHRQcm9taXNlID0gKGFzeW5jICgpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBibG9iID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRQcmV2aWV3QmxvYihjdXJyZW50RmlsZUlkLCBjdXJyZW50VXJsLCB7XHJcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBvYmplY3RVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG4gICAgICAgIGlmIChwcmV2aWV3UmVxdWVzdEtleVJlZi5jdXJyZW50ICE9PSByZXF1ZXN0S2V5KSB7XHJcbiAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKG9iamVjdFVybCk7XHJcbiAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlcGxhY2VQcmV2aWV3SW1hZ2VVcmwob2JqZWN0VXJsKTtcclxuICAgICAgICByZXR1cm4gb2JqZWN0VXJsO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChwcmV2aWV3UmVxdWVzdEtleVJlZi5jdXJyZW50ID09PSByZXF1ZXN0S2V5KSB7XHJcbiAgICAgICAgICBzZXRQcmV2aWV3RXJyb3IoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBpZiAocHJldmlld1JlcXVlc3RLZXlSZWYuY3VycmVudCA9PT0gcmVxdWVzdEtleSkge1xyXG4gICAgICAgICAgc2V0UHJldmlld0J1c3koZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcmV2aWV3TG9hZFByb21pc2VSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgcHJldmlld0xvYWRQcm9taXNlUmVmLmN1cnJlbnQgPSBuZXh0UHJvbWlzZTtcclxuICAgIHJldHVybiBuZXh0UHJvbWlzZTtcclxuICB9LCBbZW5hYmxlZCwgZmlsZUlkLCByZXBsYWNlUHJldmlld0ltYWdlVXJsLCBzb3VyY2VVcmxdKTtcclxuXHJcbiAgY29uc3QgY2xvc2VQcmV2aWV3ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0UHJldmlld09wZW4oZmFsc2UpO1xyXG4gICAgc2V0UHJldmlld0J1c3koZmFsc2UpO1xyXG4gICAgc2V0UHJldmlld0Vycm9yKFwiXCIpO1xyXG4gICAgcmVzZXRQcmV2aWV3R2VzdHVyZSgpO1xyXG4gIH0sIFtyZXNldFByZXZpZXdHZXN0dXJlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhclByZXZpZXdJbWFnZSgpO1xyXG4gICAgfTtcclxuICB9LCBbY2xlYXJQcmV2aWV3SW1hZ2VdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHByZXZpZXdSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPSBgJHtzYWZlVGV4dChmaWxlSWQpfV9fJHtzYWZlVGV4dChzb3VyY2VVcmwpfWA7XHJcbiAgICBzZXRQcmV2aWV3T3BlbihmYWxzZSk7XHJcbiAgICBzZXRQcmV2aWV3QnVzeShmYWxzZSk7XHJcbiAgICBzZXRQcmV2aWV3RXJyb3IoXCJcIik7XHJcbiAgICByZXNldFByZXZpZXdHZXN0dXJlKCk7XHJcbiAgICBjbGVhclByZXZpZXdJbWFnZSgpO1xyXG5cclxuICAgIGlmIChlbmFibGVkICYmIHNhZmVUZXh0KGZpbGVJZCkgJiYgc2FmZVRleHQoc291cmNlVXJsKSkge1xyXG4gICAgICB2b2lkIGxvYWRQcmV2aWV3SW1hZ2UoKTtcclxuICAgIH1cclxuICB9LCBbY2xlYXJQcmV2aWV3SW1hZ2UsIGVuYWJsZWQsIGZpbGVJZCwgbG9hZFByZXZpZXdJbWFnZSwgcmVzZXRQcmV2aWV3R2VzdHVyZSwgc291cmNlVXJsXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXByZXZpZXdPcGVuKSByZXR1cm47XHJcblxyXG4gICAgY29uc3Qgb25LZXlEb3duID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcclxuICAgICAgICBjbG9zZVByZXZpZXcoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlEb3duKTtcclxuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlEb3duKTtcclxuICB9LCBbcHJldmlld09wZW4sIGNsb3NlUHJldmlld10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFwcmV2aWV3T3BlbikgcmV0dXJuO1xyXG4gICAgY29uc3Qgc3VyZmFjZSA9IHByZXZpZXdTdXJmYWNlUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIXN1cmZhY2UpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBwcmV2ZW50R2VzdHVyZURlZmF1bHQgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHByZXZlbnRUb3VjaFZpZXdwb3J0Wm9vbSA9IChldmVudDogVG91Y2hFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBwcmV2ZW50Q3RybFdoZWVsVmlld3BvcnRab29tID0gKGV2ZW50OiBXaGVlbEV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC5jdHJsS2V5KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBzdXJmYWNlLmFkZEV2ZW50TGlzdGVuZXIoXCJnZXN0dXJlc3RhcnRcIiwgcHJldmVudEdlc3R1cmVEZWZhdWx0LCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xyXG4gICAgc3VyZmFjZS5hZGRFdmVudExpc3RlbmVyKFwiZ2VzdHVyZWNoYW5nZVwiLCBwcmV2ZW50R2VzdHVyZURlZmF1bHQsIHsgcGFzc2l2ZTogZmFsc2UgfSk7XHJcbiAgICBzdXJmYWNlLmFkZEV2ZW50TGlzdGVuZXIoXCJnZXN0dXJlZW5kXCIsIHByZXZlbnRHZXN0dXJlRGVmYXVsdCwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcclxuICAgIHN1cmZhY2UuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBwcmV2ZW50VG91Y2hWaWV3cG9ydFpvb20sIHsgcGFzc2l2ZTogZmFsc2UgfSk7XHJcbiAgICBzdXJmYWNlLmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCBwcmV2ZW50Q3RybFdoZWVsVmlld3BvcnRab29tLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHN1cmZhY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImdlc3R1cmVzdGFydFwiLCBwcmV2ZW50R2VzdHVyZURlZmF1bHQpO1xyXG4gICAgICBzdXJmYWNlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJnZXN0dXJlY2hhbmdlXCIsIHByZXZlbnRHZXN0dXJlRGVmYXVsdCk7XHJcbiAgICAgIHN1cmZhY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImdlc3R1cmVlbmRcIiwgcHJldmVudEdlc3R1cmVEZWZhdWx0KTtcclxuICAgICAgc3VyZmFjZS5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHByZXZlbnRUb3VjaFZpZXdwb3J0Wm9vbSk7XHJcbiAgICAgIHN1cmZhY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIHByZXZlbnRDdHJsV2hlZWxWaWV3cG9ydFpvb20pO1xyXG4gICAgfTtcclxuICB9LCBbcHJldmlld09wZW5dKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgICAgaWYgKCFwcmV2aWV3SW1hZ2VVcmwgfHwgcHJldmlld0J1c3kpIHJldHVybjtcclxuICAgICAgY29uc3QgcG9pbnQ6IFRpY2tldFByZXZpZXdQb2ludCA9IHsgeDogZXZlbnQuY2xpZW50WCwgeTogZXZlbnQuY2xpZW50WSB9O1xyXG4gICAgICBwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5zZXQoZXZlbnQucG9pbnRlcklkLCBwb2ludCk7XHJcbiAgICAgIGlmICh0eXBlb2YgZXZlbnQuY3VycmVudFRhcmdldC5zZXRQb2ludGVyQ2FwdHVyZSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuc2V0UG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKTtcclxuICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgIC8vIElnbm9yZSBjYXB0dXJlIGZhaWx1cmVzIG9uIGJyb3dzZXJzIHRoYXQgZG8gbm90IGZ1bGx5IHN1cHBvcnQgcG9pbnRlciBjYXB0dXJlLlxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LnNpemUgPT09IDEpIHtcclxuICAgICAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gZXZlbnQucG9pbnRlcklkO1xyXG4gICAgICAgIHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudCA9IHBvaW50O1xyXG4gICAgICAgIHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcHJldmlld1BhblBvaW50ZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHJlYnVpbGRQaW5jaFNuYXBzaG90KCk7XHJcbiAgICB9LFxyXG4gICAgW3ByZXZpZXdCdXN5LCBwcmV2aWV3SW1hZ2VVcmwsIHJlYnVpbGRQaW5jaFNuYXBzaG90XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XHJcbiAgICAgIGlmICghcHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuaGFzKGV2ZW50LnBvaW50ZXJJZCkpIHJldHVybjtcclxuXHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnN0IHBvaW50OiBUaWNrZXRQcmV2aWV3UG9pbnQgPSB7IHg6IGV2ZW50LmNsaWVudFgsIHk6IGV2ZW50LmNsaWVudFkgfTtcclxuICAgICAgcHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuc2V0KGV2ZW50LnBvaW50ZXJJZCwgcG9pbnQpO1xyXG5cclxuICAgICAgY29uc3QgcG9pbnRlckVudHJpZXMgPSBBcnJheS5mcm9tKHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LmVudHJpZXMoKSk7XHJcbiAgICAgIGNvbnN0IHBvaW50ZXJQb2ludHMgPSBwb2ludGVyRW50cmllcy5tYXAoKGVudHJ5KSA9PiBlbnRyeVsxXSk7XHJcblxyXG4gICAgICBpZiAocG9pbnRlclBvaW50cy5sZW5ndGggPj0gMikge1xyXG4gICAgICAgIGlmICghcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgcmVidWlsZFBpbmNoU25hcHNob3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNuYXBzaG90ID0gcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudDtcclxuICAgICAgICBpZiAoIXNuYXBzaG90KSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IFtsZWZ0LCByaWdodF0gPSBwb2ludGVyUG9pbnRzO1xyXG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5tYXgoMSwgZ2V0UHJldmlld1BvaW50RGlzdGFuY2UobGVmdCwgcmlnaHQpKTtcclxuICAgICAgICBjb25zdCByYXRpbyA9IGRpc3RhbmNlIC8gTWF0aC5tYXgoMSwgc25hcHNob3QuZGlzdGFuY2UpO1xyXG4gICAgICAgIGNvbnN0IG5leHRTY2FsZSA9IGNsYW1wUHJldmlld1NjYWxlKHNuYXBzaG90LnNjYWxlICogcmF0aW8pO1xyXG4gICAgICAgIGNvbnN0IGNlbnRlciA9IGdldFByZXZpZXdQb2ludENlbnRlcihsZWZ0LCByaWdodCk7XHJcbiAgICAgICAgY29uc3QgbmV4dFRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50ID0ge1xyXG4gICAgICAgICAgeDogc25hcHNob3QudHJhbnNsYXRlLnggKyAoY2VudGVyLnggLSBzbmFwc2hvdC5jZW50ZXIueCksXHJcbiAgICAgICAgICB5OiBzbmFwc2hvdC50cmFuc2xhdGUueSArIChjZW50ZXIueSAtIHNuYXBzaG90LmNlbnRlci55KSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGFwcGx5UHJldmlld1RyYW5zZm9ybShuZXh0U2NhbGUsIG5leHRUcmFuc2xhdGUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBvaW50ZXJQb2ludHMubGVuZ3RoICE9PSAxIHx8IHByZXZpZXdTY2FsZVJlZi5jdXJyZW50IDw9IDEgfHwgcHJldmlld1BhblBvaW50ZXJSZWYuY3VycmVudCAhPT0gZXZlbnQucG9pbnRlcklkKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBsYXN0UG9pbnQgPSBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQ7XHJcbiAgICAgIHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudCA9IHBvaW50O1xyXG4gICAgICBpZiAoIWxhc3RQb2ludCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgbmV4dFRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50ID0ge1xyXG4gICAgICAgIHg6IHByZXZpZXdUcmFuc2xhdGVSZWYuY3VycmVudC54ICsgKHBvaW50LnggLSBsYXN0UG9pbnQueCksXHJcbiAgICAgICAgeTogcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50LnkgKyAocG9pbnQueSAtIGxhc3RQb2ludC55KSxcclxuICAgICAgfTtcclxuICAgICAgYXBwbHlQcmV2aWV3VHJhbnNmb3JtKHByZXZpZXdTY2FsZVJlZi5jdXJyZW50LCBuZXh0VHJhbnNsYXRlKTtcclxuICAgIH0sXHJcbiAgICBbYXBwbHlQcmV2aWV3VHJhbnNmb3JtLCByZWJ1aWxkUGluY2hTbmFwc2hvdF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XHJcbiAgICAgIGlmICghcHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuaGFzKGV2ZW50LnBvaW50ZXJJZCkpIHJldHVybjtcclxuICAgICAgcHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuZGVsZXRlKGV2ZW50LnBvaW50ZXJJZCk7XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0eXBlb2YgZXZlbnQuY3VycmVudFRhcmdldC5oYXNQb2ludGVyQ2FwdHVyZSA9PT0gXCJmdW5jdGlvblwiICYmXHJcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5oYXNQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQucmVsZWFzZVBvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHBvaW50ZXJFbnRyaWVzID0gQXJyYXkuZnJvbShwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5lbnRyaWVzKCkpO1xyXG4gICAgICBpZiAocG9pbnRlckVudHJpZXMubGVuZ3RoID49IDIpIHtcclxuICAgICAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHJlYnVpbGRQaW5jaFNuYXBzaG90KCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocG9pbnRlckVudHJpZXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgY29uc3QgW3BvaW50ZXJJZCwgcG9pbnRlclBvaW50XSA9IHBvaW50ZXJFbnRyaWVzWzBdO1xyXG4gICAgICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBwb2ludGVySWQ7XHJcbiAgICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gcG9pbnRlclBvaW50O1xyXG4gICAgICAgIHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcHJldmlld1BhblBvaW50ZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICBpZiAocHJldmlld1NjYWxlUmVmLmN1cnJlbnQgPD0gMSkge1xyXG4gICAgICAgIGFwcGx5UHJldmlld1RyYW5zZm9ybSgxLCB7IHg6IDAsIHk6IDAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbYXBwbHlQcmV2aWV3VHJhbnNmb3JtLCByZWJ1aWxkUGluY2hTbmFwc2hvdF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVQcmV2aWV3V2hlZWwgPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuV2hlZWxFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgICAgaWYgKCFwcmV2aWV3SW1hZ2VVcmwgfHwgcHJldmlld0J1c3kpIHJldHVybjtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IGV2ZW50LmRlbHRhWSA8IDAgPyAxIDogLTE7XHJcbiAgICAgIGNvbnN0IG5leHRTY2FsZSA9IGNsYW1wUHJldmlld1NjYWxlKHByZXZpZXdTY2FsZVJlZi5jdXJyZW50ICsgZGlyZWN0aW9uICogUFJFVklFV19TQ0FMRV9TVEVQKTtcclxuICAgICAgYXBwbHlQcmV2aWV3VHJhbnNmb3JtKG5leHRTY2FsZSwgcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50KTtcclxuICAgIH0sXHJcbiAgICBbYXBwbHlQcmV2aWV3VHJhbnNmb3JtLCBwcmV2aWV3QnVzeSwgcHJldmlld0ltYWdlVXJsXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG9wZW5QcmV2aWV3ID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgY3VycmVudEZpbGVJZCA9IHNhZmVUZXh0KGZpbGVJZCk7XHJcbiAgICBjb25zdCBjdXJyZW50VXJsID0gc2FmZVRleHQoc291cmNlVXJsKTtcclxuICAgIGlmICghZW5hYmxlZCB8fCAhY3VycmVudEZpbGVJZCB8fCAhY3VycmVudFVybCkgcmV0dXJuO1xyXG5cclxuICAgIHJlc2V0UHJldmlld0dlc3R1cmUoKTtcclxuICAgIHNldFByZXZpZXdPcGVuKHRydWUpO1xyXG4gICAgc2V0UHJldmlld0Vycm9yKFwiXCIpO1xyXG5cclxuICAgIGF3YWl0IGxvYWRQcmV2aWV3SW1hZ2UoKTtcclxuICB9LCBbZW5hYmxlZCwgZmlsZUlkLCBsb2FkUHJldmlld0ltYWdlLCByZXNldFByZXZpZXdHZXN0dXJlLCBzb3VyY2VVcmxdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHByZXZpZXdPcGVuLFxyXG4gICAgcHJldmlld0J1c3ksXHJcbiAgICBwcmV2aWV3RXJyb3IsXHJcbiAgICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgICBwcmV2aWV3U2NhbGUsXHJcbiAgICBwcmV2aWV3VHJhbnNsYXRlLFxyXG4gICAgcHJldmlld1N1cmZhY2VSZWYsXHJcbiAgICBvcGVuUHJldmlldyxcclxuICAgIGNsb3NlUHJldmlldyxcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kLFxyXG4gICAgaGFuZGxlUHJldmlld1doZWVsLFxyXG4gIH07XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxpQkFBK0Q7OztBQ0EvRCxtQkFBaUQ7QUFlMUMs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QUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixPQWNPO0FBQUEsRUFDTCxNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxVQUFVO0FBQUEsRUFDVixVQUFVO0FBQUEsRUFDVixPQUFPO0FBQUEsRUFDUCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixTQUFTO0FBQUEsRUFDVCxlQUFlO0FBQUEsRUFDZixlQUFlO0FBQUEsRUFDZixjQUFjO0FBQUEsRUFDZCxTQUFTO0FBQ1g7QUFFQSxJQUFNLHNDQUFzQyxDQUFDO0FBQUEsRUFDM0M7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE9BZ0RPO0FBQUEsRUFDTDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsaUJBQWlCO0FBQUEsRUFDakI7QUFBQSxFQUNBLGVBQWU7QUFBQSxFQUNmO0FBQUEsRUFDQTtBQUFB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TUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0Esa0JBQWtCLFlBQVksb0JBQW9CLFNBQVMsUUFBUSxZQUFZO0FBQUEsTUFDL0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELFNBQU87QUFDVDtBQUVBLElBQU0saUNBQWlDLE1BQU07QUFDM0MsUUFBTSxhQUFhLG9DQUFvQztBQUV2RCxTQUFPLDZDQUFDLG1DQUF3QixPQUFPLFdBQVcsT0FBTyxTQUFTLFdBQVcsU0FBUyxTQUFTLFdBQVcsU0FBUztBQUNySDtBQUdBLElBQU0sMEJBQTBCLE1BQU07QUFDcEMsU0FDRSw2Q0FBQyxnQ0FBcUIseUJBQXVCLE1BQzNDLHVEQUFDLGtDQUErQixHQUNsQztBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsMEJBQXdCO0FBQ3hCLFFBQU0sU0FBUyxTQUFTLGVBQWUsNEJBQTRCO0FBQ25FLE1BQUksQ0FBQyxPQUFRO0FBQ2IsbUJBQWlCLFFBQVEsNkNBQUMsMkJBQXdCLENBQUU7QUFDdEQ7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLGtDQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIm5leHRUcmFuc2xhdGUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
