import {
  SingleDatePicker
} from "./chunks/chunk-AS4EE5L2.js";
import {
  getExpenseTicketStatusLabel,
  useExpenseTicketsFilterCache
} from "./chunks/chunk-5L4ACMZN.js";
import {
  mapWindowEnumOptions
} from "./chunks/chunk-BVPBMOU4.js";
import {
  mapExpenseTicketDetailHeader,
  mapExpenseTicketDetailLine
} from "./chunks/chunk-NC4Q6BKQ.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-TEDCGD4B.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-YGPFKAYG.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-FRQBPU47.js";
import "./chunks/chunk-6YXFJB4W.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  isManagingOtherExpenseUser,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-GWXQMRAV.js";
import "./chunks/chunk-KJ3UA2J6.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-JR3OAOOU.js";
import "./chunks/chunk-K7MECJ5E.js";
import {
  formatAmountWithCurrency,
  formatExpenseDisplayDate,
  formatExpenseNumber,
  navigateToExpenseUrl,
  parseExpenseDate,
  safeText,
  toIsoDate
} from "./chunks/chunk-2VZI2ZK6.js";
import {
  configureExpenseApiAuth,
  deleteExpenseSheetLine,
  deleteExpenseSheetTicket,
  deleteExpenseSheetTicketFile,
  fetchExpenseSheetTicket,
  fetchExpenseSheetTicketPreviewBlob,
  updateExpenseSheetTicket
} from "./chunks/chunk-TDJIA4I6.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-2YFZMKVX.js";
import {
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  toExpenseApiDdMmYyyy
} from "./chunks/chunk-VU42CDR5.js";
import "./chunks/chunk-6G7EOWHU.js";
import {
  canAccess,
  indT,
  showPermissionModal
} from "./chunks/chunk-BYICIYT4.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunks/chunk-BWM3JLWG.js";
import {
  ApiFetchError
} from "./chunks/chunk-IKHTGBEE.js";
import "./chunks/chunk-7SKLSV7K.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/gastos/tickets/detail/ExpenseTicketDetailPage.tsx
var import_react9 = __toESM(require_react());

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
    if (parsedGastoType !== void 0 && ![0, 1, 2, 3, 4, 5, 6, 7, 8, 14].includes(parsedGastoType)) {
      const message = indT("Api_RequestFailed", "Request failed.");
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
        if (deleteLinkedExpenseLineContext) {
          try {
            const lineDeleteResponse = await deleteExpenseSheetLine(
              deleteLinkedExpenseLineContext.sheetId,
              deleteLinkedExpenseLineContext.lineRecId,
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
  }, [busy, canDeleteTicket, deleteLinkedExpenseLineContext, fileId, setBusy, setModalError, setStatus]);
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

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketImagePreview.ts
var import_react3 = __toESM(require_react());
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
var useExpenseTicketImagePreview = ({ fileId, sourceUrl }) => {
  const [previewOpen, setPreviewOpen] = (0, import_react3.useState)(false);
  const [previewBusy, setPreviewBusy] = (0, import_react3.useState)(false);
  const [previewError, setPreviewError] = (0, import_react3.useState)("");
  const [previewImageUrl, setPreviewImageUrl] = (0, import_react3.useState)("");
  const [previewScale, setPreviewScale] = (0, import_react3.useState)(1);
  const [previewTranslate, setPreviewTranslate] = (0, import_react3.useState)({ x: 0, y: 0 });
  const previewScaleRef = (0, import_react3.useRef)(1);
  const previewTranslateRef = (0, import_react3.useRef)({ x: 0, y: 0 });
  const previewPointersRef = (0, import_react3.useRef)(/* @__PURE__ */ new Map());
  const previewPanPointerRef = (0, import_react3.useRef)(null);
  const previewPanLastPointRef = (0, import_react3.useRef)(null);
  const previewPinchSnapshotRef = (0, import_react3.useRef)(null);
  const applyPreviewTransform = (0, import_react3.useCallback)((nextScale, nextTranslate) => {
    const normalizedScale = clampPreviewScale(nextScale);
    const normalizedTranslate = normalizedScale <= 1 ? { x: 0, y: 0 } : nextTranslate;
    previewScaleRef.current = normalizedScale;
    previewTranslateRef.current = normalizedTranslate;
    setPreviewScale(normalizedScale);
    setPreviewTranslate(normalizedTranslate);
  }, []);
  const resetPreviewGesture = (0, import_react3.useCallback)(() => {
    previewPointersRef.current.clear();
    previewPanPointerRef.current = null;
    previewPanLastPointRef.current = null;
    previewPinchSnapshotRef.current = null;
    applyPreviewTransform(1, { x: 0, y: 0 });
  }, [applyPreviewTransform]);
  const rebuildPinchSnapshot = (0, import_react3.useCallback)(() => {
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
  const closePreview = (0, import_react3.useCallback)(() => {
    setPreviewOpen(false);
    setPreviewBusy(false);
    setPreviewError("");
    resetPreviewGesture();
    setPreviewImageUrl((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }
      return "";
    });
  }, [resetPreviewGesture]);
  (0, import_react3.useEffect)(() => {
    return () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);
  (0, import_react3.useEffect)(() => {
    if (!previewOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closePreview();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewOpen, closePreview]);
  const handlePreviewPointerDown = (0, import_react3.useCallback)(
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
  const handlePreviewPointerMove = (0, import_react3.useCallback)(
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
  const handlePreviewPointerEnd = (0, import_react3.useCallback)(
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
  const handlePreviewWheel = (0, import_react3.useCallback)(
    (event) => {
      if (!previewImageUrl || previewBusy) return;
      event.preventDefault();
      const direction = event.deltaY < 0 ? 1 : -1;
      const nextScale = clampPreviewScale(previewScaleRef.current + direction * PREVIEW_SCALE_STEP);
      applyPreviewTransform(nextScale, previewTranslateRef.current);
    },
    [applyPreviewTransform, previewBusy, previewImageUrl]
  );
  const openPreview = (0, import_react3.useCallback)(async () => {
    const currentFileId = safeText(fileId);
    const currentUrl = safeText(sourceUrl);
    if (!currentFileId || !currentUrl) return;
    resetPreviewGesture();
    setPreviewOpen(true);
    setPreviewBusy(true);
    setPreviewError("");
    try {
      const blob = await fetchExpenseSheetTicketPreviewBlob(currentFileId, currentUrl, {
        suppressPermissionModal: true
      });
      const objectUrl = URL.createObjectURL(blob);
      setPreviewImageUrl((previous) => {
        if (previous) {
          URL.revokeObjectURL(previous);
        }
        return objectUrl;
      });
    } catch (error) {
      setPreviewError(error instanceof Error ? error.message : indT("Api_RequestFailed", "Request failed."));
      setPreviewImageUrl("");
    } finally {
      setPreviewBusy(false);
    }
  }, [fileId, resetPreviewGesture, sourceUrl]);
  return {
    previewOpen,
    previewBusy,
    previewError,
    previewImageUrl,
    previewScale,
    previewTranslate,
    openPreview,
    closePreview,
    handlePreviewPointerDown,
    handlePreviewPointerMove,
    handlePreviewPointerEnd,
    handlePreviewWheel
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketDetailEditor.ts
var import_react4 = __toESM(require_react());
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
  const [state, dispatch] = (0, import_react4.useReducer)(editorReducer, void 0, createInitialState);
  (0, import_react4.useEffect)(() => {
    if (state.isEditing) return;
    dispatch({ type: "hydrate_from_header", header });
  }, [header, state.isEditing]);
  (0, import_react4.useEffect)(() => {
    const maxPage = Math.max(1, Math.ceil(lineCount / pageSize));
    if (state.linePage > maxPage) {
      dispatch({ type: "patch_state", patch: { linePage: maxPage } });
    }
  }, [lineCount, pageSize, state.linePage]);
  const setBusy = (0, import_react4.useCallback)(
    (value) => {
      dispatch({ type: "patch_state", patch: { busy: resolveSetStateValue(value, state.busy) } });
    },
    [state.busy]
  );
  const setStatus = (0, import_react4.useCallback)(
    (value) => {
      dispatch({ type: "patch_state", patch: { status: resolveSetStateValue(value, state.status) } });
    },
    [state.status]
  );
  const setIsEditing = (0, import_react4.useCallback)(
    (value) => {
      dispatch({ type: "patch_state", patch: { isEditing: resolveSetStateValue(value, state.isEditing) } });
    },
    [state.isEditing]
  );
  const setModalError = (0, import_react4.useCallback)(
    (value) => {
      dispatch({ type: "patch_state", patch: { modalError: resolveSetStateValue(value, state.modalError) } });
    },
    [state.modalError]
  );
  const setLinePage = (0, import_react4.useCallback)(
    (value) => {
      dispatch({ type: "patch_state", patch: { linePage: resolveSetStateValue(value, state.linePage) } });
    },
    [state.linePage]
  );
  const setDraftDescription = (0, import_react4.useCallback)(
    (value) => {
      dispatch({
        type: "set_draft_field",
        field: "description",
        value: resolveSetStateValue(value, state.draft.description)
      });
    },
    [state.draft.description]
  );
  const setDraftGastoType = (0, import_react4.useCallback)(
    (value) => {
      dispatch({
        type: "set_draft_field",
        field: "gastoType",
        value: resolveSetStateValue(value, state.draft.gastoType)
      });
    },
    [state.draft.gastoType]
  );
  const setDraftCurrencyCode = (0, import_react4.useCallback)(
    (value) => {
      dispatch({
        type: "set_draft_field",
        field: "currencyCode",
        value: resolveSetStateValue(value, state.draft.currencyCode)
      });
    },
    [state.draft.currencyCode]
  );
  const setDraftTransDate = (0, import_react4.useCallback)(
    (value) => {
      dispatch({
        type: "set_draft_field",
        field: "transDate",
        value: resolveSetStateValue(value, state.draft.transDate)
      });
    },
    [state.draft.transDate]
  );
  const handleEnableEdit = (0, import_react4.useCallback)(() => {
    if (!header || isLoading) return;
    if (isFromSheetLink) return;
    if (header.status === 1 && !allowAssignedDraftEdit) return;
    if (!canEditTicket) {
      onForbidden();
      return;
    }
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
  const handleCancelEdit = (0, import_react4.useCallback)(() => {
    if (!state.isEditing) return;
    if (!header) {
      dispatch({ type: "patch_state", patch: { isEditing: false } });
      return;
    }
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
  return {
    busy: state.busy,
    status: state.status,
    isEditing: state.isEditing,
    modalError: state.modalError,
    linePage: state.linePage,
    draftDescription: state.draft.description,
    draftGastoType: state.draft.gastoType,
    draftCurrencyCode: state.draft.currencyCode,
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
    handleEnableEdit,
    handleCancelEdit
  };
};

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketDetailRouteContext.ts
var import_react5 = __toESM(require_react());
var useExpenseTicketDetailRouteContext = () => {
  const routeParams = (0, import_react5.useMemo)(() => new URLSearchParams(window.location.search), []);
  return (0, import_react5.useMemo)(() => {
    const autoEditMode = safeText(routeParams.get("mode")).toLowerCase() === "edit";
    const detailOrigin = safeText(routeParams.get("origin")).toLowerCase();
    const contextSheetId = safeText(routeParams.get("sheetId"));
    const contextLineRecId = safeText(routeParams.get("lineRecId"));
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
      isFromSheetLink
    };
  }, [routeParams]);
};

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketDetailDisplay.ts
var import_react6 = __toESM(require_react());
var useExpenseTicketDetailDisplay = ({
  header,
  draftGastoType,
  draftCurrencyCode,
  draftTransDate,
  draftFileName,
  isEditing,
  gastoTypeLabelMap
}) => {
  const paginationLabels = (0, import_react6.useMemo)(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last")
    }),
    []
  );
  const previewAltText = (0, import_react6.useMemo)(
    () => safeText(isEditing ? draftFileName : header?.fileName) || indT("Tickets_Field_FileId", "Ticket"),
    [draftFileName, header?.fileName, isEditing]
  );
  const statusLabel = (0, import_react6.useMemo)(() => getExpenseTicketStatusLabel(header?.status), [header?.status]);
  const gastoTypeLabel = (0, import_react6.useMemo)(() => {
    const currentGastoType = isEditing ? draftGastoType : header?.gastoType === null ? "" : String(header?.gastoType ?? "");
    if (!currentGastoType) {
      return indT("Common_NotAvailable", "N/A");
    }
    return gastoTypeLabelMap.get(String(currentGastoType)) || String(currentGastoType);
  }, [draftGastoType, gastoTypeLabelMap, header?.gastoType, isEditing]);
  const totalAmountText = (0, import_react6.useMemo)(
    () => formatAmountWithCurrency(header?.totalAmount ?? null, (isEditing ? draftCurrencyCode : header?.currencyCode) || header?.currencyCode),
    [draftCurrencyCode, header?.currencyCode, header?.totalAmount, isEditing]
  );
  const transDateText = (0, import_react6.useMemo)(
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
var import_react7 = __toESM(require_react());
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
  const handleModalConfirm = (0, import_react7.useCallback)(async () => {
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
  const handleModalButtonConfirm = (0, import_react7.useCallback)(() => {
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
var import_react8 = __toESM(require_react());
var useExpenseTicketDetailInteractions = ({
  fileId,
  contextSheetId,
  isFromExpenseLine,
  isFromExpenseSheetCreate,
  isFromSheetLink,
  headerExpenseSheetId,
  isEditing,
  lineContainerRef,
  openPreview
}) => {
  const openLineDetail = (0, import_react8.useCallback)(
    (rawLineRecId) => {
      if (isFromExpenseLine || isFromSheetLink) return;
      const lineRecId = safeText(rawLineRecId);
      if (!lineRecId || !fileId) return;
      const query = new URLSearchParams({
        fileId,
        lineRecId
      });
      if (isFromExpenseSheetCreate) {
        query.set("origin", "sheet-create");
        query.set("mode", "edit");
        if (contextSheetId) {
          query.set("sheetId", contextSheetId);
        }
      }
      navigateToExpenseUrl(`/Gastos/TicketLineDetail?${query.toString()}`, {
        askConfirmation: true,
        bypassGuardOnce: false
      });
    },
    [contextSheetId, fileId, isFromExpenseLine, isFromExpenseSheetCreate, isFromSheetLink]
  );
  const resolveClickableCard = (0, import_react8.useCallback)(
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
  const openFile = (0, import_react8.useCallback)(() => {
    void openPreview();
  }, [openPreview]);
  const handleOpenExpenseSheet = (0, import_react8.useCallback)(() => {
    if (isFromSheetLink) return;
    const safeSheetId = safeText(headerExpenseSheetId);
    if (!safeSheetId) return;
    navigateToExpenseUrl(`/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(safeSheetId)}`, {
      askConfirmation: isEditing
    });
  }, [headerExpenseSheetId, isEditing, isFromSheetLink]);
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
var hasImagePreviewLink = (urlValue) => {
  const normalizedUrl = safeText(urlValue);
  if (!normalizedUrl) return false;
  if (normalizedUrl.toLowerCase().startsWith("data:image/")) return true;
  const extension = getFileExtensionFromPath(normalizedUrl);
  if (extension && IMAGE_EXTENSIONS.has(extension)) return true;
  const normalizedLower = normalizedUrl.toLowerCase();
  if (normalizedLower.includes("blob.core.windows.net") && normalizedLower.includes("image")) return true;
  return false;
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
  draftCurrencyCode,
  draftTransDate,
  draftUrlFile,
  draftFileName,
  onDraftDescriptionChange,
  onDraftGastoTypeChange,
  onDraftCurrencyCodeChange,
  onDraftTransDateChange,
  onOpenFile,
  onOpenExpenseSheet
}) => {
  const previewUrl = safeText(isEditing ? draftUrlFile : header.urlFile);
  const canOpenFile = hasImagePreviewLink(previewUrl);
  const showExpenseSheetField = hasRealExpenseSheetValue(header.hojaGastosIdDisplay);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl", children: [
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
          usePortal: false,
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
    canOpenFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
    visibleLines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "timeline-box timeline-empty", "data-empty-text": indT("Tickets_Detail_NoLines", "No lines for this ticket.") }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { ref: containerRef, className: "timeline-box", children: visibleLines.map((line, index) => {
      const amountText = formatAmountWithCurrency(line.totalAmount, currencyCode);
      const qtyText = formatQtyValue(line.qty);
      const priceText = formatAmountWithCurrency(line.price, currencyCode);
      const title = line.description || line.recId || "-";
      const subtitle = `${indT("ExpenseSheets_Field_Qty", "Quantity")}: ${qtyText}   ${indT("ExpenseSheets_Field_Price", "Price")}: ${priceText}`;
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "timeline-item", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        ExpenseTimelineCard_default,
        {
          dateParts: EMPTY_DATE_PARTS,
          datePanelContent: TICKET_LINE_DATE_PANEL_ICON,
          title,
          subtitle,
          subtitleClassName: "expense-sheet-card__subtitle expense-line-card__meta",
          amountText,
          onOpen: () => onOpenLine(line.recId),
          titleClassName: "timeline-name expense-line-card__title"
        }
      ) }, `${line.recId}-${index}`);
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
  onClose,
  onPointerDown,
  onPointerMove,
  onPointerEnd,
  onWheel
}) => {
  if (!open) return null;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/45 backdrop-blur-md px-4 py-6", onClick: onClose, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "button",
        {
          type: "button",
          "aria-label": indT("Common_Close", "Close"),
          className: "absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/60 bg-slate-900/55 text-slate-100 transition hover:bg-slate-900/70 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-200/80",
          onClick: (event) => {
            event.stopPropagation();
            onClose();
          },
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
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "max-h-[92vh] max-w-[92vw] flex items-center justify-center", onClick: (event) => event.stopPropagation(), children: busy ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-2 text-sm text-slate-100", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
        indT("Common_Loading", "Loading")
      ] }) : error ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-sm text-rose-200", children: error }) : imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "div",
        {
          className: "relative max-h-[90vh] max-w-[92vw] overflow-hidden rounded-lg touch-none",
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
              className: "pointer-events-none max-h-[90vh] w-auto max-w-[92vw] select-none rounded-lg object-contain shadow-2xl",
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

// Web/wwwroot/react/src/pages/gastos/tickets/detail/ExpenseTicketDetailView.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var ExpenseTicketDetailView = ({ modal, preview, content }) => {
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
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: content.isLoading ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    content.errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-danger", children: content.errorMessage }) : null,
    !content.isLoading && !content.errorMessage && content.header ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
          draftCurrencyCode: content.draftCurrencyCode,
          draftTransDate: content.draftTransDate,
          draftUrlFile: content.draftUrlFile,
          draftFileName: content.draftFileName,
          onDraftDescriptionChange: content.onDraftDescriptionChange,
          onDraftGastoTypeChange: content.onDraftGastoTypeChange,
          onDraftCurrencyCodeChange: content.onDraftCurrencyCodeChange,
          onDraftTransDateChange: content.onDraftTransDateChange,
          onOpenFile: content.onOpenFile,
          onOpenExpenseSheet: content.onOpenExpenseSheet
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
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-sm text-slate-600", children: content.status })
    ] }) : null
  ] });
};
var ExpenseTicketDetailView_default = ExpenseTicketDetailView;

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
var ExpenseTicketDetailPageContent = () => {
  const { canManageOtherUsers, currentAxUserId, selectedManagedUserId, managementBootstrapReady } = useAuthContext();
  const hasAccess = canAccess("GASTOS_TICKETS", "View");
  const canEditTicketByModule = canAccess("GASTOS_TICKETS", "Edit");
  const canDeleteTicketByModule = canAccess("GASTOS_TICKETS", "FullAccess");
  const fileId = safeText(window.__EXPENSE_TICKET_FILE_ID__);
  const lineContainerRef = (0, import_react9.useRef)(null);
  const { autoEditMode, contextSheetId, contextLineRecId, isFromExpenseSheetCreate, isFromExpenseLine, isFromSheetLink } = useExpenseTicketDetailRouteContext();
  const isManagingOtherUser = isManagingOtherExpenseUser({
    canManageOtherUsers,
    currentAxUserId,
    selectedManagedUserId
  });
  const canEditTicket = canEditTicketByModule && !isManagingOtherUser;
  const canDeleteTicket = canDeleteTicketByModule && !isManagingOtherUser;
  const allowAssignedDraftEdit = isFromExpenseSheetCreate;
  const autoEditAttemptedRef = (0, import_react9.useRef)(false);
  const gastoTypeOptions = (0, import_react9.useMemo)(() => {
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
  const gastoTypeLabelMap = (0, import_react9.useMemo)(() => {
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
  const {
    busy,
    status,
    isEditing,
    modalError,
    linePage,
    draftDescription,
    draftGastoType,
    draftCurrencyCode,
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
  const previewSourceUrl = (0, import_react9.useMemo)(() => safeText(isEditing ? draftUrlFile : header?.urlFile), [draftUrlFile, header?.urlFile, isEditing]);
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
    previewOpen,
    previewBusy,
    previewError,
    previewImageUrl,
    previewScale,
    previewTranslate,
    openPreview,
    closePreview,
    handlePreviewPointerDown,
    handlePreviewPointerMove,
    handlePreviewPointerEnd,
    handlePreviewWheel
  } = useExpenseTicketImagePreview({
    fileId,
    sourceUrl: previewSourceUrl
  });
  const visibleLines = (0, import_react9.useMemo)(() => pagedSlice(lines, linePage, LINES_PAGE_SIZE), [linePage, lines]);
  const totalLinePages = Math.ceil((lines.length || 0) / LINES_PAGE_SIZE);
  (0, import_react9.useEffect)(() => {
    if (!autoEditMode || isFromExpenseLine || isFromSheetLink || autoEditAttemptedRef.current) return;
    if (isLoading || !header) return;
    autoEditAttemptedRef.current = true;
    handleEnableEdit();
  }, [autoEditMode, handleEnableEdit, header, isFromExpenseLine, isFromSheetLink, isLoading]);
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
  const { invalidateCachedListForRefetch } = useExpenseTicketsFilterCache();
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
    handleUpdate,
    handleDelete,
    onSaveSuccess: () => {
      void reloadDetail();
    },
    onDeleteSuccess: () => {
      invalidateCachedListForRefetch();
      if (isFromExpenseLine) {
        navigateToExpenseUrl(`/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(contextSheetId)}`);
        return;
      }
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
    openPreview
  });
  useTimelineCardEffects({
    containerRef: lineContainerRef,
    errorMessage,
    items: visibleLines,
    resolveClickableCard
  });
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    ExpenseTicketDetailView_default,
    {
      modal: {
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
      },
      preview: {
        open: previewOpen,
        busy: previewBusy,
        error: previewError,
        imageUrl: previewImageUrl,
        imageAlt: previewAltText,
        scale: previewScale,
        translate: previewTranslate,
        onClose: closePreview,
        onPointerDown: handlePreviewPointerDown,
        onPointerMove: handlePreviewPointerMove,
        onPointerEnd: handlePreviewPointerEnd,
        onWheel: handlePreviewWheel
      },
      content: {
        isLoading,
        errorMessage,
        header,
        statusLabel,
        gastoTypeLabel,
        totalAmountText,
        transDateText,
        isEditing,
        gastoTypeOptions,
        draftDescription,
        draftGastoType,
        draftCurrencyCode,
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
        currencyCode: isEditing ? draftCurrencyCode : safeText(header?.currencyCode),
        paginationLabels,
        containerRef: lineContainerRef,
        onLinePageChange: setLinePage,
        onOpenLine: openLineDetail,
        status
      }
    }
  );
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbEVkaXRvci50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsRGlzcGxheS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxDb25maXJtU3RhdGUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsSW50ZXJhY3Rpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5lc0xpc3QudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsVmlldy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IHsgdXNlQXV0aENvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XG5pbXBvcnQgeyBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuaW1wb3J0IHsgaXNNYW5hZ2luZ090aGVyRXhwZW5zZVVzZXIgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZU1hbmFnZWRVc2VyU2NvcGUudHNcIjtcbmltcG9ydCB7IG1hcFdpbmRvd0VudW1PcHRpb25zLCB0eXBlIEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldy50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbEVkaXRvciB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3IudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0LnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsRGlzcGxheSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5LnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQ29uZmlybVN0YXRlIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnMudHNcIjtcbmltcG9ydCBFeHBlbnNlVGlja2V0RGV0YWlsVmlldyBmcm9tIFwiLi9FeHBlbnNlVGlja2V0RGV0YWlsVmlldy50c3hcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRzRmlsdGVyQ2FjaGUgfSBmcm9tIFwiLi4vdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZS50c1wiO1xuXG5jb25zdCBBTExPV0VEX0dBU1RPX1RZUEVTID0gbmV3IFNldDxudW1iZXI+KFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0pO1xuY29uc3QgTElORVNfUEFHRV9TSVpFID0gNjtcbmNvbnN0IEdBU1RPX1RZUEVfTEFCRUxfS0VZUzogUmVjb3JkPG51bWJlciwgeyBrZXk6IHN0cmluZzsgZmFsbGJhY2s6IHN0cmluZyB9PiA9IHtcbiAgMDogeyBrZXk6IFwiRW51bV9Ob25lXCIsIGZhbGxiYWNrOiBcIk5vbmVcIiB9LFxuICAxOiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9QZWFqZVwiLCBmYWxsYmFjazogXCJQZWFqZVwiIH0sXG4gIDI6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1BhcmtpbmdcIiwgZmFsbGJhY2s6IFwiUGFya2luZ1wiIH0sXG4gIDM6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0ttXCIsIGZhbGxiYWNrOiBcIkttXCIgfSxcbiAgNDogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfRGVzYXl1bm9cIiwgZmFsbGJhY2s6IFwiRGVzYXl1bm9cIiB9LFxuICA1OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9Db21pZGFcIiwgZmFsbGJhY2s6IFwiQ29taWRhXCIgfSxcbiAgNjogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfQ2VuYVwiLCBmYWxsYmFjazogXCJDZW5hXCIgfSxcbiAgNzogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfSG90ZWxcIiwgZmFsbGJhY2s6IFwiSG90ZWxcIiB9LFxuICA4OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9WYXJpb3NcIiwgZmFsbGJhY2s6IFwiVmFyaW9zXCIgfSxcbiAgMTQ6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1RheGlcIiwgZmFsbGJhY2s6IFwiVGF4aVwiIH0sXG59O1xuXG5jb25zdCBwYWdlZFNsaWNlID0gPFQsPihpdGVtczogVFtdLCBwYWdlOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIpOiBUW10gPT4ge1xuICBpZiAoIWl0ZW1zLmxlbmd0aCkgcmV0dXJuIFtdO1xuICBjb25zdCBzYWZlUGFnZSA9IE1hdGgubWF4KDEsIHBhZ2UpO1xuICBjb25zdCBzdGFydCA9IChzYWZlUGFnZSAtIDEpICogcGFnZVNpemU7XG4gIHJldHVybiBpdGVtcy5zbGljZShzdGFydCwgc3RhcnQgKyBwYWdlU2l6ZSk7XG59O1xuXG4vLyBJbml0aWFsaXplcyBhdXRoIHNlZWQgZm9yIGV4cGVuc2UgQVBJIGNhbGxzIGJlZm9yZSBpc2xhbmQgZWZmZWN0cyBydW4uXG5jb25zdCBib290c3RyYXBFeHBlbnNlQXBpQXV0aCA9ICgpID0+IHtcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgoe1xuICAgIHRva2VuOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxuICAgIGVudHJhT2lkOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcbiAgfSk7XG59O1xuXG5jb25zdCBidWlsZEZhbGxiYWNrR2FzdG9UeXBlT3B0aW9ucyA9ICgpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xuICByZXR1cm4gT2JqZWN0LmVudHJpZXMoR0FTVE9fVFlQRV9MQUJFTF9LRVlTKVxuICAgIC5tYXAoKFtjb2RlLCBjZmddKSA9PiAoe1xuICAgICAgdmFsdWU6IFN0cmluZyhjb2RlKSxcbiAgICAgIHRleHQ6IGluZFQoY2ZnLmtleSwgY2ZnLmZhbGxiYWNrKSxcbiAgICB9KSlcbiAgICAuc29ydCgobGVmdCwgcmlnaHQpID0+IE51bWJlcihsZWZ0LnZhbHVlKSAtIE51bWJlcihyaWdodC52YWx1ZSkpO1xufTtcblxuY29uc3QgRXhwZW5zZVRpY2tldERldGFpbFBhZ2VDb250ZW50ID0gKCkgPT4ge1xuICBjb25zdCB7IGNhbk1hbmFnZU90aGVyVXNlcnMsIGN1cnJlbnRBeFVzZXJJZCwgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLCBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkgfSA9IHVzZUF1dGhDb250ZXh0KCk7XG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiVmlld1wiKTtcbiAgY29uc3QgY2FuRWRpdFRpY2tldEJ5TW9kdWxlID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJFZGl0XCIpO1xuICBjb25zdCBjYW5EZWxldGVUaWNrZXRCeU1vZHVsZSA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiRnVsbEFjY2Vzc1wiKTtcbiAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQod2luZG93Ll9fRVhQRU5TRV9USUNLRVRfRklMRV9JRF9fKTtcbiAgY29uc3QgbGluZUNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCB7IGF1dG9FZGl0TW9kZSwgY29udGV4dFNoZWV0SWQsIGNvbnRleHRMaW5lUmVjSWQsIGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSwgaXNGcm9tRXhwZW5zZUxpbmUsIGlzRnJvbVNoZWV0TGluayB9ID1cbiAgICB1c2VFeHBlbnNlVGlja2V0RGV0YWlsUm91dGVDb250ZXh0KCk7XG4gIGNvbnN0IGlzTWFuYWdpbmdPdGhlclVzZXIgPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlVXNlcih7XG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcbiAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICB9KTtcbiAgY29uc3QgY2FuRWRpdFRpY2tldCA9IGNhbkVkaXRUaWNrZXRCeU1vZHVsZSAmJiAhaXNNYW5hZ2luZ090aGVyVXNlcjtcbiAgY29uc3QgY2FuRGVsZXRlVGlja2V0ID0gY2FuRGVsZXRlVGlja2V0QnlNb2R1bGUgJiYgIWlzTWFuYWdpbmdPdGhlclVzZXI7XG4gIGNvbnN0IGFsbG93QXNzaWduZWREcmFmdEVkaXQgPSBpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGU7XG4gIGNvbnN0IGF1dG9FZGl0QXR0ZW1wdGVkUmVmID0gdXNlUmVmKGZhbHNlKTtcblxuICBjb25zdCBnYXN0b1R5cGVPcHRpb25zID0gdXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KCgpID0+IHtcbiAgICBjb25zdCBzb3VyY2UgPSBBcnJheS5pc0FycmF5KHdpbmRvdy5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXykgPyB3aW5kb3cuX19FWFBFTlNFX0dBU1RPX1RZUEVTX18gOiBbXTtcbiAgICBjb25zdCBtYXBwZWQgPSBtYXBXaW5kb3dFbnVtT3B0aW9ucyhzb3VyY2UpLmZpbHRlcigoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IE51bWJlcihlbnRyeS52YWx1ZSk7XG4gICAgICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpICYmIEFMTE9XRURfR0FTVE9fVFlQRVMuaGFzKHBhcnNlZCk7XG4gICAgfSk7XG5cbiAgICBpZiAobWFwcGVkLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBtYXBwZWQuc29ydCgobGVmdCwgcmlnaHQpID0+IE51bWJlcihsZWZ0LnZhbHVlKSAtIE51bWJlcihyaWdodC52YWx1ZSkpO1xuICAgIH1cblxuICAgIHJldHVybiBidWlsZEZhbGxiYWNrR2FzdG9UeXBlT3B0aW9ucygpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgZ2FzdG9UeXBlTGFiZWxNYXAgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIGdhc3RvVHlwZU9wdGlvbnMpIHtcbiAgICAgIG1hcC5zZXQoU3RyaW5nKG9wdGlvbi52YWx1ZSksIG9wdGlvbi50ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIG1hcDtcbiAgfSwgW2dhc3RvVHlwZU9wdGlvbnNdKTtcblxuICBjb25zdCB7IGhlYWRlciwgbGluZXMsIGlzTG9hZGluZywgZXJyb3JNZXNzYWdlLCByZWxvYWREZXRhaWwgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZSh7XG4gICAgaGFzQWNjZXNzLFxuICAgIGZpbGVJZCxcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcbiAgfSk7XG5cbiAgY29uc3Qge1xuICAgIGJ1c3ksXG4gICAgc3RhdHVzLFxuICAgIGlzRWRpdGluZyxcbiAgICBtb2RhbEVycm9yLFxuICAgIGxpbmVQYWdlLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRHYXN0b1R5cGUsXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgZHJhZnRUcmFuc0RhdGUsXG4gICAgZHJhZnRDb21lbnRhcmlvLFxuICAgIGRyYWZ0VXJsRmlsZSxcbiAgICBkcmFmdEZpbGVOYW1lLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldExpbmVQYWdlLFxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXG4gICAgc2V0RHJhZnRHYXN0b1R5cGUsXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgc2V0RHJhZnRUcmFuc0RhdGUsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbEVkaXRvcih7XG4gICAgaGVhZGVyLFxuICAgIGxpbmVDb3VudDogbGluZXMubGVuZ3RoLFxuICAgIHBhZ2VTaXplOiBMSU5FU19QQUdFX1NJWkUsXG4gICAgY2FuRWRpdFRpY2tldCxcbiAgICBpc0xvYWRpbmcsXG4gICAgYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCxcbiAgICBpc0Zyb21TaGVldExpbmssXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuXG4gIGNvbnN0IHByZXZpZXdTb3VyY2VVcmwgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KGlzRWRpdGluZyA/IGRyYWZ0VXJsRmlsZSA6IGhlYWRlcj8udXJsRmlsZSksIFtkcmFmdFVybEZpbGUsIGhlYWRlcj8udXJsRmlsZSwgaXNFZGl0aW5nXSk7XG4gIGNvbnN0IHsgcGFnaW5hdGlvbkxhYmVscywgcHJldmlld0FsdFRleHQsIHN0YXR1c0xhYmVsLCBnYXN0b1R5cGVMYWJlbCwgdG90YWxBbW91bnRUZXh0LCB0cmFuc0RhdGVUZXh0IH0gPVxuICAgIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxEaXNwbGF5KHtcbiAgICAgIGhlYWRlcixcbiAgICAgIGRyYWZ0R2FzdG9UeXBlLFxuICAgICAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgICBkcmFmdFRyYW5zRGF0ZSxcbiAgICAgIGRyYWZ0RmlsZU5hbWUsXG4gICAgICBpc0VkaXRpbmcsXG4gICAgICBnYXN0b1R5cGVMYWJlbE1hcCxcbiAgICB9KTtcbiAgY29uc3Qge1xuICAgIHByZXZpZXdPcGVuLFxuICAgIHByZXZpZXdCdXN5LFxuICAgIHByZXZpZXdFcnJvcixcbiAgICBwcmV2aWV3SW1hZ2VVcmwsXG4gICAgcHJldmlld1NjYWxlLFxuICAgIHByZXZpZXdUcmFuc2xhdGUsXG4gICAgb3BlblByZXZpZXcsXG4gICAgY2xvc2VQcmV2aWV3LFxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXG4gICAgaGFuZGxlUHJldmlld1doZWVsLFxuICB9ID0gdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldyh7XG4gICAgZmlsZUlkLFxuICAgIHNvdXJjZVVybDogcHJldmlld1NvdXJjZVVybCxcbiAgfSk7XG5cbiAgY29uc3QgdmlzaWJsZUxpbmVzID0gdXNlTWVtbygoKSA9PiBwYWdlZFNsaWNlKGxpbmVzLCBsaW5lUGFnZSwgTElORVNfUEFHRV9TSVpFKSwgW2xpbmVQYWdlLCBsaW5lc10pO1xuICBjb25zdCB0b3RhbExpbmVQYWdlcyA9IE1hdGguY2VpbCgobGluZXMubGVuZ3RoIHx8IDApIC8gTElORVNfUEFHRV9TSVpFKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghYXV0b0VkaXRNb2RlIHx8IGlzRnJvbUV4cGVuc2VMaW5lIHx8IGlzRnJvbVNoZWV0TGluayB8fCBhdXRvRWRpdEF0dGVtcHRlZFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgaWYgKGlzTG9hZGluZyB8fCAhaGVhZGVyKSByZXR1cm47XG4gICAgYXV0b0VkaXRBdHRlbXB0ZWRSZWYuY3VycmVudCA9IHRydWU7XG4gICAgaGFuZGxlRW5hYmxlRWRpdCgpO1xuICB9LCBbYXV0b0VkaXRNb2RlLCBoYW5kbGVFbmFibGVFZGl0LCBoZWFkZXIsIGlzRnJvbUV4cGVuc2VMaW5lLCBpc0Zyb21TaGVldExpbmssIGlzTG9hZGluZ10pO1xuXG4gIGNvbnN0IHsgaGFuZGxlVXBkYXRlLCBoYW5kbGVEZWxldGUgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnMoe1xuICAgIGJ1c3ksXG4gICAgaXNFZGl0aW5nLFxuICAgIGNhbkVkaXRUaWNrZXQsXG4gICAgY2FuRGVsZXRlVGlja2V0LFxuICAgIGZpbGVJZCxcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0R2FzdG9UeXBlLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0VHJhbnNEYXRlLFxuICAgIGRyYWZ0Q29tZW50YXJpbyxcbiAgICBkcmFmdFVybEZpbGUsXG4gICAgZHJhZnRGaWxlTmFtZSxcbiAgICBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQ6IGlzRnJvbUV4cGVuc2VMaW5lXG4gICAgICA/IHtcbiAgICAgICAgICBzaGVldElkOiBjb250ZXh0U2hlZXRJZCxcbiAgICAgICAgICBsaW5lUmVjSWQ6IGNvbnRleHRMaW5lUmVjSWQsXG4gICAgICAgIH1cbiAgICAgIDogbnVsbCxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgfSk7XG5cbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgbW9kYWxMb2FkaW5nVGV4dCwgbW9kYWxDYW5jZWxUZXh0LCBtb2RhbENvbmZpcm1UZXh0LCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gfSA9XG4gICAgdXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZSh7XG4gICAgICBidXN5LFxuICAgICAgbW9kYWxFcnJvcixcbiAgICAgIHNldE1vZGFsRXJyb3IsXG4gICAgICBzZXRTdGF0dXMsXG4gICAgfSk7XG5cbiAgY29uc3QgaXNBc3NpZ25lZFRpY2tldCA9IGhlYWRlcj8uc3RhdHVzID09PSAxO1xuICBjb25zdCBpc0NvbnRleHRMb2NrZWQgPSBpc0Fzc2lnbmVkVGlja2V0ICYmICFhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0O1xuICBjb25zdCBjYW5FZGl0VGlja2V0SW5Db250ZXh0ID0gY2FuRWRpdFRpY2tldCAmJiAhaXNGcm9tRXhwZW5zZUxpbmUgJiYgIWlzRnJvbVNoZWV0TGluaztcbiAgY29uc3QgY2FuRGVsZXRlVGlja2V0SW5Db250ZXh0ID0gY2FuRGVsZXRlVGlja2V0ICYmICFpc0Zyb21FeHBlbnNlTGluZSAmJiAhaXNGcm9tU2hlZXRMaW5rO1xuICBjb25zdCB0aWNrZXRUb3BiYXJBY3Rpb25Nb2RlOiBcImRlZmF1bHRcIiB8IFwidmlld19vbmx5XCIgPVxuICAgIGlzTWFuYWdpbmdPdGhlclVzZXIgfHwgaXNGcm9tRXhwZW5zZUxpbmUgfHwgaXNGcm9tU2hlZXRMaW5rID8gXCJ2aWV3X29ubHlcIiA6IFwiZGVmYXVsdFwiO1xuICBjb25zdCB7IGludmFsaWRhdGVDYWNoZWRMaXN0Rm9yUmVmZXRjaCB9ID0gdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZSgpO1xuXG4gIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zKHtcbiAgICBidXN5LFxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcbiAgICBpc0VkaXRpbmcsXG4gICAgaXNMb2NrZWQ6IGlzQ29udGV4dExvY2tlZCxcbiAgICBhY3Rpb25Nb2RlOiB0aWNrZXRUb3BiYXJBY3Rpb25Nb2RlLFxuICAgIHBlcm1pc3Npb25zUmVhZHk6IG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcbiAgICBjYW5FZGl0VGlja2V0OiBjYW5FZGl0VGlja2V0SW5Db250ZXh0LFxuICAgIGNhbkRlbGV0ZVRpY2tldDogY2FuRGVsZXRlVGlja2V0SW5Db250ZXh0LFxuICAgIGZpbGVJZCxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgIHZvaWQgcmVsb2FkRGV0YWlsKCk7XG4gICAgfSxcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgIGludmFsaWRhdGVDYWNoZWRMaXN0Rm9yUmVmZXRjaCgpO1xuICAgICAgaWYgKGlzRnJvbUV4cGVuc2VMaW5lKSB7XG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoY29udGV4dFNoZWV0SWQpfWApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvVGlja2V0c1wiKTtcbiAgICB9LFxuICAgIG9wZW5Db25maXJtLFxuICAgIGNsb3NlQ29uZmlybSxcbiAgfSk7XG5cbiAgY29uc3QgeyBvcGVuTGluZURldGFpbCwgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsIG9wZW5GaWxlLCBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0IH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsSW50ZXJhY3Rpb25zKHtcbiAgICBmaWxlSWQsXG4gICAgY29udGV4dFNoZWV0SWQsXG4gICAgaXNGcm9tRXhwZW5zZUxpbmUsXG4gICAgaXNGcm9tRXhwZW5zZVNoZWV0Q3JlYXRlLFxuICAgIGlzRnJvbVNoZWV0TGluayxcbiAgICBoZWFkZXJFeHBlbnNlU2hlZXRJZDogc2FmZVRleHQoaGVhZGVyPy5ob2phR2FzdG9zSWREaXNwbGF5KSxcbiAgICBpc0VkaXRpbmcsXG4gICAgbGluZUNvbnRhaW5lclJlZixcbiAgICBvcGVuUHJldmlldyxcbiAgfSk7XG5cbiAgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyh7XG4gICAgY29udGFpbmVyUmVmOiBsaW5lQ29udGFpbmVyUmVmLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBpdGVtczogdmlzaWJsZUxpbmVzLFxuICAgIHJlc29sdmVDbGlja2FibGVDYXJkLFxuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDxFeHBlbnNlVGlja2V0RGV0YWlsVmlld1xuICAgICAgbW9kYWw9e3tcbiAgICAgICAgb3BlbjogbW9kYWwub3BlbixcbiAgICAgICAgdGl0bGU6IG1vZGFsLnRpdGxlLFxuICAgICAgICBtZXNzYWdlOiBtb2RhbC5tZXNzYWdlLFxuICAgICAgICBjb25maXJtVGV4dDogbW9kYWxDb25maXJtVGV4dCxcbiAgICAgICAgY2FuY2VsVGV4dDogbW9kYWxDYW5jZWxUZXh0LFxuICAgICAgICBsb2FkaW5nVGV4dDogbW9kYWxMb2FkaW5nVGV4dCxcbiAgICAgICAgc2hvd0NhbmNlbDogbW9kYWwuc2hvd0NhbmNlbCxcbiAgICAgICAgc2hvd0NvbmZpcm06IG1vZGFsLnNob3dDb25maXJtLFxuICAgICAgICBidXN5LFxuICAgICAgICBlcnJvcjogbW9kYWxFcnJvcixcbiAgICAgICAgc3RhdHVzLFxuICAgICAgICBvbkNvbmZpcm06IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcbiAgICAgICAgb25DYW5jZWw6IGNsb3NlQ29uZmlybSxcbiAgICAgIH19XG4gICAgICBwcmV2aWV3PXt7XG4gICAgICAgIG9wZW46IHByZXZpZXdPcGVuLFxuICAgICAgICBidXN5OiBwcmV2aWV3QnVzeSxcbiAgICAgICAgZXJyb3I6IHByZXZpZXdFcnJvcixcbiAgICAgICAgaW1hZ2VVcmw6IHByZXZpZXdJbWFnZVVybCxcbiAgICAgICAgaW1hZ2VBbHQ6IHByZXZpZXdBbHRUZXh0LFxuICAgICAgICBzY2FsZTogcHJldmlld1NjYWxlLFxuICAgICAgICB0cmFuc2xhdGU6IHByZXZpZXdUcmFuc2xhdGUsXG4gICAgICAgIG9uQ2xvc2U6IGNsb3NlUHJldmlldyxcbiAgICAgICAgb25Qb2ludGVyRG93bjogaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxuICAgICAgICBvblBvaW50ZXJNb3ZlOiBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXG4gICAgICAgIG9uUG9pbnRlckVuZDogaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXG4gICAgICAgIG9uV2hlZWw6IGhhbmRsZVByZXZpZXdXaGVlbCxcbiAgICAgIH19XG4gICAgICBjb250ZW50PXt7XG4gICAgICAgIGlzTG9hZGluZyxcbiAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICBoZWFkZXIsXG4gICAgICAgIHN0YXR1c0xhYmVsLFxuICAgICAgICBnYXN0b1R5cGVMYWJlbCxcbiAgICAgICAgdG90YWxBbW91bnRUZXh0LFxuICAgICAgICB0cmFuc0RhdGVUZXh0LFxuICAgICAgICBpc0VkaXRpbmcsXG4gICAgICAgIGdhc3RvVHlwZU9wdGlvbnMsXG4gICAgICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgICAgIGRyYWZ0R2FzdG9UeXBlLFxuICAgICAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICAgICAgZHJhZnRUcmFuc0RhdGUsXG4gICAgICAgIGRyYWZ0VXJsRmlsZSxcbiAgICAgICAgZHJhZnRGaWxlTmFtZSxcbiAgICAgICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlOiBzZXREcmFmdERlc2NyaXB0aW9uLFxuICAgICAgICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlOiBzZXREcmFmdEdhc3RvVHlwZSxcbiAgICAgICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogc2V0RHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgICAgIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2U6IHNldERyYWZ0VHJhbnNEYXRlLFxuICAgICAgICBvbk9wZW5GaWxlOiBvcGVuRmlsZSxcbiAgICAgICAgb25PcGVuRXhwZW5zZVNoZWV0OiBpc0Zyb21TaGVldExpbmsgPyB1bmRlZmluZWQgOiBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0LFxuICAgICAgICB2aXNpYmxlTGluZXMsXG4gICAgICAgIHRvdGFsTGluZVBhZ2VzLFxuICAgICAgICBsaW5lUGFnZSxcbiAgICAgICAgY3VycmVuY3lDb2RlOiBpc0VkaXRpbmcgPyBkcmFmdEN1cnJlbmN5Q29kZSA6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcbiAgICAgICAgcGFnaW5hdGlvbkxhYmVscyxcbiAgICAgICAgY29udGFpbmVyUmVmOiBsaW5lQ29udGFpbmVyUmVmLFxuICAgICAgICBvbkxpbmVQYWdlQ2hhbmdlOiBzZXRMaW5lUGFnZSxcbiAgICAgICAgb25PcGVuTGluZTogb3BlbkxpbmVEZXRhaWwsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgIH19XG4gICAgLz5cbiAgKTtcbn07XG5cbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgZXhwZW5zZSB0aWNrZXQgZGV0YWlsLlxuY29uc3QgRXhwZW5zZVRpY2tldERldGFpbFBhZ2UgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzIGVuYWJsZUV4cGVuc2VNYW5hZ2VtZW50PlxuICAgICAgPEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlQ29udGVudCAvPlxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XG4gICk7XG59O1xuXG5jb25zdCBtb3VudCA9ICgpID0+IHtcbiAgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGgoKTtcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtcm9vdFwiKTtcbiAgaWYgKCFyb290RWwpIHJldHVybjtcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxFeHBlbnNlVGlja2V0RGV0YWlsUGFnZSAvPik7XG59O1xuXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldERldGFpbFBhZ2U7XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIsIEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XG5pbXBvcnQgeyBtYXBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLCBtYXBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZUFyZ3MgPSB7XG4gIGhhc0FjY2VzczogYm9vbGVhbjtcbiAgZmlsZUlkOiBzdHJpbmc7XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gT3ducyByZWFkIHN0YXRlIGFuZCBBUEkgbG9hZGluZyBiZWhhdmlvciBmb3IgdGhlIHRpY2tldCBkZXRhaWwgcGFnZS5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUgPSAoeyBoYXNBY2Nlc3MsIGZpbGVJZCwgb25Gb3JiaWRkZW4gfTogVXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlQXJncykgPT4ge1xuICBjb25zdCBbaGVhZGVyLCBzZXRIZWFkZXJdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbGluZXMsIHNldExpbmVzXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lW10+KFtdKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIGNvbnN0IHJlbG9hZERldGFpbCA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoIWhhc0FjY2Vzcykge1xuICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzYWZlRmlsZUlkID0gc2FmZVRleHQoZmlsZUlkKTtcbiAgICBpZiAoIXNhZmVGaWxlSWQpIHtcbiAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiVGlja2V0c19EZXRhaWxfTm90Rm91bmRcIiwgXCJUaWNrZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xuICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgc2V0TGluZXMoW10pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldChzYWZlRmlsZUlkLCB7XG4gICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlPy5NZXNzYWdlIHx8IGluZFQoXCJUaWNrZXRzX0RldGFpbF9Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXQgZGV0YWlsLlwiKSk7XG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgc2V0TGluZXMoW10pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcbiAgICAgIGNvbnN0IHNlbGVjdGVkID1cbiAgICAgICAgaXRlbXMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5Py5GaWxlSWQpLnRvVXBwZXJDYXNlKCkgPT09IHNhZmVGaWxlSWQudG9VcHBlckNhc2UoKSkgfHwgaXRlbXNbMF0gfHwgbnVsbDtcblxuICAgICAgaWYgKCFzZWxlY3RlZCkge1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIlRpY2tldHNfRGV0YWlsX05vdEZvdW5kXCIsIFwiVGlja2V0IHdhcyBub3QgZm91bmQuXCIpKTtcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICBzZXRMaW5lcyhbXSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWFwcGVkSGVhZGVyID0gbWFwRXhwZW5zZVRpY2tldERldGFpbEhlYWRlcihzZWxlY3RlZCk7XG4gICAgICBjb25zdCBtYXBwZWRMaW5lcyA9IChBcnJheS5pc0FycmF5KHNlbGVjdGVkLkxpbmVzKSA/IHNlbGVjdGVkLkxpbmVzIDogW10pLm1hcCgobGluZSkgPT5cbiAgICAgICAgbWFwRXhwZW5zZVRpY2tldERldGFpbExpbmUobGluZSlcbiAgICAgICk7XG4gICAgICBzZXRIZWFkZXIobWFwcGVkSGVhZGVyKTtcbiAgICAgIHNldExpbmVzKG1hcHBlZExpbmVzKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNldEVycm9yTWVzc2FnZShlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJUaWNrZXRzX0RldGFpbF9Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXQgZGV0YWlsLlwiKSk7XG4gICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICBzZXRMaW5lcyhbXSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9LCBbZmlsZUlkLCBoYXNBY2Nlc3MsIG9uRm9yYmlkZGVuXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB2b2lkIHJlbG9hZERldGFpbCgpO1xuICB9LCBbcmVsb2FkRGV0YWlsXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBoZWFkZXIsXG4gICAgbGluZXMsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICByZWxvYWREZXRhaWwsXG4gIH07XG59O1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCB9IGZyb20gXCIuLi8uLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24gfSBmcm9tIFwiLi4vLi4vaG9va3MvZXhwZW5zZU11dGF0aW9uVXRpbHMudHNcIjtcbmltcG9ydCB7XG4gIGRlbGV0ZUV4cGVuc2VTaGVldExpbmUsXG4gIGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldCxcbiAgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0RmlsZSxcbiAgdXBkYXRlRXhwZW5zZVNoZWV0VGlja2V0LFxufSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSwgdG9FeHBlbnNlQXBpRGRNbVl5eXkgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xuXG50eXBlIERlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCA9IHtcbiAgc2hlZXRJZDogc3RyaW5nO1xuICBsaW5lUmVjSWQ6IHN0cmluZztcbn07XG5cbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9uc0FyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgY2FuRWRpdFRpY2tldDogYm9vbGVhbjtcbiAgY2FuRGVsZXRlVGlja2V0OiBib29sZWFuO1xuICBmaWxlSWQ6IHN0cmluZztcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xuICBkcmFmdEdhc3RvVHlwZTogc3RyaW5nO1xuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xuICBkcmFmdENvbWVudGFyaW86IHN0cmluZztcbiAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XG4gIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcbiAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0PzogRGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0IHwgbnVsbDtcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG59O1xuXG5jb25zdCBwYXJzZU9wdGlvbmFsSW50ZWdlciA9IChyYXc6IHN0cmluZyk6IG51bWJlciB8IHVuZGVmaW5lZCA9PiB7XG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKHJhdyB8fCBcIlwiKS50cmltKCk7XG4gIGlmICghdmFsdWUpIHJldHVybiB1bmRlZmluZWQ7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlci5wYXJzZUludCh2YWx1ZSwgMTApO1xuICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpID8gcGFyc2VkIDogdW5kZWZpbmVkO1xufTtcblxuLy8gVHJpZXMgdG8gaW5mZXIgYSBzYWZlIGV4dGVuc2lvbiBmb3IgdXBkYXRlIHBheWxvYWQgZnJvbSBmaWxlIG5hbWUgb3IgVVJMLlxuY29uc3QgcmVzb2x2ZVRpY2tldEZpbGVFeHRlbnNpb24gPSAoZmlsZU5hbWU6IHN0cmluZywgdXJsRmlsZTogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3Qgc291cmNlID0gU3RyaW5nKGZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSB8fCBTdHJpbmcodXJsRmlsZSB8fCBcIlwiKS50cmltKCk7XG4gIGNvbnN0IG1hdGNoID0gc291cmNlLm1hdGNoKC9cXC4oW2EtekEtWjAtOV17MSwxMH0pKD86JHxbPyNdKS8pO1xuICBpZiAoIW1hdGNoIHx8ICFtYXRjaFsxXSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgcmV0dXJuIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG59O1xuXG5jb25zdCBpc05vdEZvdW5kRXJyb3IgPSAoZXJyb3I6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwNDtcbn07XG5cbmNvbnN0IGlzTWlzc2luZ1RpY2tldEZpbGVNZXNzYWdlID0gKG1lc3NhZ2U6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyhtZXNzYWdlIHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBmYWxzZTtcblxuICByZXR1cm4gKFxuICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhcmNoaXZvIGFzb2NpYWRvXCIpIHx8XG4gICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImFyY2hpdm8gYWRqdW50b1wiKSB8fFxuICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhc3NvY2lhdGVkIGZpbGVcIikgfHxcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXR0YWNoZWQgZmlsZVwiKVxuICApO1xufTtcblxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgdGlja2V0IGhlYWRlciBkZXRhaWwuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9ucyA9ICh7XG4gIGJ1c3ksXG4gIGlzRWRpdGluZyxcbiAgY2FuRWRpdFRpY2tldCxcbiAgY2FuRGVsZXRlVGlja2V0LFxuICBmaWxlSWQsXG4gIGRyYWZ0RGVzY3JpcHRpb24sXG4gIGRyYWZ0R2FzdG9UeXBlLFxuICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgZHJhZnRUcmFuc0RhdGUsXG4gIGRyYWZ0Q29tZW50YXJpbyxcbiAgZHJhZnRVcmxGaWxlLFxuICBkcmFmdEZpbGVOYW1lLFxuICBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQsXG4gIHNldE1vZGFsRXJyb3IsXG4gIHNldEJ1c3ksXG4gIHNldFN0YXR1cyxcbiAgc2V0SXNFZGl0aW5nLFxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9uc0FyZ3MpID0+IHtcbiAgY29uc3QgaGFuZGxlVXBkYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChidXN5IHx8ICFpc0VkaXRpbmcpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWNhbkVkaXRUaWNrZXQpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBub3JtYWxpemVkRGVzY3JpcHRpb24gPSBTdHJpbmcoZHJhZnREZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XG4gICAgaWYgKCFub3JtYWxpemVkRGVzY3JpcHRpb24pIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0Rlc2NyaXB0aW9uUmVxdWlyZWRcIiwgXCJEZXNjcmlwdGlvbiBpcyByZXF1aXJlZC5cIik7XG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW5jeSA9IFN0cmluZyhkcmFmdEN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcbiAgICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW5jeSkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fQ3VycmVuY3lSZXF1aXJlZFwiLCBcIkN1cnJlbmN5IGlzIHJlcXVpcmVkLlwiKTtcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgcGFyc2VkR2FzdG9UeXBlID0gcGFyc2VPcHRpb25hbEludGVnZXIoZHJhZnRHYXN0b1R5cGUpO1xuICAgIGlmIChwYXJzZWRHYXN0b1R5cGUgIT09IHVuZGVmaW5lZCAmJiAhWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XS5pbmNsdWRlcyhwYXJzZWRHYXN0b1R5cGUpKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpO1xuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCByYXdUcmFuc0RhdGUgPSBTdHJpbmcoZHJhZnRUcmFuc0RhdGUgfHwgXCJcIikudHJpbSgpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc0RhdGUgPSByYXdUcmFuc0RhdGUgPyB0b0V4cGVuc2VBcGlEZE1tWXl5eShyYXdUcmFuc0RhdGUpIDogXCJcIjtcbiAgICBpZiAocmF3VHJhbnNEYXRlICYmICFub3JtYWxpemVkVHJhbnNEYXRlKSB7XG4gICAgICBzZXRNb2RhbEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xuICAgICAgc2V0U3RhdHVzKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3QgPSB7XG4gICAgICBkZXNjcmlwdGlvbjogbm9ybWFsaXplZERlc2NyaXB0aW9uLFxuICAgICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVkQ3VycmVuY3ksXG4gICAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWRUcmFuc0RhdGUgfHwgdW5kZWZpbmVkLFxuICAgICAgY29tZW50YXJpbzogU3RyaW5nKGRyYWZ0Q29tZW50YXJpbyB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgdXJsRmlsZTogU3RyaW5nKGRyYWZ0VXJsRmlsZSB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgZmlsZU5hbWU6IFN0cmluZyhkcmFmdEZpbGVOYW1lIHx8IFwiXCIpLnRyaW0oKSB8fCB1bmRlZmluZWQsXG4gICAgICBmaWxlRXh0ZW5zaW9uOiByZXNvbHZlVGlja2V0RmlsZUV4dGVuc2lvbihkcmFmdEZpbGVOYW1lLCBkcmFmdFVybEZpbGUpLFxuICAgICAgZ2FzdG9UeXBlOiBwYXJzZWRHYXN0b1R5cGUgYXMgRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdFtcImdhc3RvVHlwZVwiXSxcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XG4gICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpLFxuICAgICAgc2V0TW9kYWxFcnJvcixcbiAgICAgIHNldEJ1c3ksXG4gICAgICBzZXRTdGF0dXMsXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1cGRhdGVFeHBlbnNlU2hlZXRUaWNrZXQoZmlsZUlkLCBwYXlsb2FkKTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgdXBkYXRlZFwiKSk7XG4gICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQub2s7XG4gIH0sIFtcbiAgICBidXN5LFxuICAgIGNhbkVkaXRUaWNrZXQsXG4gICAgZHJhZnRDb21lbnRhcmlvLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRGaWxlTmFtZSxcbiAgICBkcmFmdEdhc3RvVHlwZSxcbiAgICBkcmFmdFRyYW5zRGF0ZSxcbiAgICBkcmFmdFVybEZpbGUsXG4gICAgZmlsZUlkLFxuICAgIGlzRWRpdGluZyxcbiAgICBzZXRCdXN5LFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldFN0YXR1cyxcbiAgXSk7XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjYW5EZWxldGVUaWNrZXQpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcbiAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIiksXG4gICAgICBzZXRNb2RhbEVycm9yLFxuICAgICAgc2V0QnVzeSxcbiAgICAgIHNldFN0YXR1cyxcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGRlbGV0ZUZpbGVSZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldEZpbGUoZmlsZUlkLCB7XG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoIWRlbGV0ZUZpbGVSZXNwb25zZS5TdWNjZXNzICYmICFpc01pc3NpbmdUaWNrZXRGaWxlTWVzc2FnZShkZWxldGVGaWxlUmVzcG9uc2UuTWVzc2FnZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihkZWxldGVGaWxlUmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoIWlzTm90Rm91bmRFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0KGZpbGVJZCk7XG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0KSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmVEZWxldGVSZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldExpbmUoXG4gICAgICAgICAgICAgIGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dC5zaGVldElkLFxuICAgICAgICAgICAgICBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQubGluZVJlY0lkLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmICghbGluZURlbGV0ZVJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGxpbmVEZWxldGVSZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIFRoZSBsaW5rZWQgbGluZSBjYW4gYmUgYXV0by1yZW1vdmVkIGJ5IGJhY2tlbmQgY2FzY2FkZTsga2VlcCBmbG93IHN1Y2Nlc3NmdWwgaW4gdGhhdCBjYXNlLlxuICAgICAgICAgICAgaWYgKCFpc05vdEZvdW5kRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgZGVsZXRlZFwiKSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQub2s7XG4gIH0sIFtidXN5LCBjYW5EZWxldGVUaWNrZXQsIGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCwgZmlsZUlkLCBzZXRCdXN5LCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXNdKTtcblxuICByZXR1cm4ge1xuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50c1wiO1xuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcblxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBpc0xvY2tlZDogYm9vbGVhbjtcbiAgYWN0aW9uTW9kZT86IFwiZGVmYXVsdFwiIHwgXCJkZWxldGVfb25seVwiIHwgXCJ2aWV3X29ubHlcIjtcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XG4gIGNhbkVkaXRUaWNrZXQ6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZVRpY2tldDogYm9vbGVhbjtcbiAgZmlsZUlkOiBzdHJpbmc7XG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcbiAgb25TYXZlU3VjY2VzczogKCkgPT4gdm9pZDtcbiAgb25EZWxldGVTdWNjZXNzPzogKCkgPT4gdm9pZDtcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcbiAgfSkgPT4gdm9pZDtcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gc3RhdGUgYW5kIGRpc3BhdGNoIGFjdGlvbnMgZm9yIHRpY2tldCBkZXRhaWwuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMgPSAoe1xuICBidXN5LFxuICBtb2RhbE9wZW4sXG4gIGlzRWRpdGluZyxcbiAgaXNMb2NrZWQsXG4gIGFjdGlvbk1vZGUgPSBcImRlZmF1bHRcIixcbiAgcGVybWlzc2lvbnNSZWFkeSA9IHRydWUsXG4gIGNhbkVkaXRUaWNrZXQsXG4gIGNhbkRlbGV0ZVRpY2tldCxcbiAgZmlsZUlkLFxuICBzZXRNb2RhbEVycm9yLFxuICBoYW5kbGVFbmFibGVFZGl0LFxuICBoYW5kbGVDYW5jZWxFZGl0LFxuICBoYW5kbGVVcGRhdGUsXG4gIGhhbmRsZURlbGV0ZSxcbiAgb25TYXZlU3VjY2VzcyxcbiAgb25EZWxldGVTdWNjZXNzLFxuICBvcGVuQ29uZmlybSxcbiAgY2xvc2VDb25maXJtLFxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnNBcmdzKSA9PiB7XG4gIHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyh7XG4gICAgYWN0aW9uR3JvdXBJZDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtYWN0aW9uc1wiLFxuICAgIGlkczoge1xuICAgICAgZWRpdEljb25JZDogXCJleHBlbnNlVGlja2V0RWRpdEljb25cIixcbiAgICAgIHNhdmVJY29uSWQ6IFwiZXhwZW5zZVRpY2tldFNhdmVJY29uXCIsXG4gICAgICBkZWxldGVCdG5JZDogXCJleHBlbnNlVGlja2V0RGVsZXRlQnRuXCIsXG4gICAgICBjYW5jZWxCdG5JZDogXCJleHBlbnNlVGlja2V0Q2FuY2VsQnRuXCIsXG4gICAgfSxcbiAgICBldmVudHM6IHtcbiAgICAgIGVkaXRFdmVudDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtZWRpdFwiLFxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWRlbGV0ZVwiLFxuICAgICAgY2FuY2VsRXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWNhbmNlbC1lZGl0XCIsXG4gICAgfSxcbiAgICBidXN5LFxuICAgIG1vZGFsT3BlbixcbiAgICBpc0VkaXRpbmcsXG4gICAgaXNDcmVhdGVNb2RlOiBmYWxzZSxcbiAgICBpc0xvY2tlZCxcbiAgICBhY3Rpb25Nb2RlLFxuICAgIHBlcm1pc3Npb25zUmVhZHksXG4gICAgY2FuQ3JlYXRlOiBmYWxzZSxcbiAgICBjYW5FZGl0OiBjYW5FZGl0VGlja2V0LFxuICAgIGNhbkRlbGV0ZTogY2FuRGVsZXRlVGlja2V0LFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZVNhdmU6IGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gICAgc2F2ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiU2F2ZSBjaGFuZ2VzXCIpLFxuICAgIHNhdmVDb25maXJtTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBzYXZlIGNoYW5nZXM/XCIpLFxuICAgIHNhdmVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSxcbiAgICBkZWxldGVDb25maXJtVGl0bGU6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9UaXRsZVwiLCBcIkRlbGV0ZVwiKSxcbiAgICBkZWxldGVDb25maXJtTWVzc2FnZTogaW5kVChcIkNvbmZpcm1fRGVsZXRlX0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBpdGVtP1wiKSxcbiAgICBkZWxldGVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIiksXG4gICAgb25TYXZlU3VjY2VzcyxcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6IG9uRGVsZXRlU3VjY2VzcyB8fCAoKCkgPT4gbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL1RpY2tldHNcIikpLFxuICAgIG9wZW5Db25maXJtLFxuICAgIGNsb3NlQ29uZmlybSxcbiAgfSk7XG59O1xuIiwgIlx1RkVGRmltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldFByZXZpZXdCbG9iIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5cbmNvbnN0IFBSRVZJRVdfTUFYX1NDQUxFID0gNDtcbmNvbnN0IFBSRVZJRVdfU0NBTEVfU1RFUCA9IDAuMjU7XG5cbmV4cG9ydCB0eXBlIFRpY2tldFByZXZpZXdQb2ludCA9IHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG59O1xuXG50eXBlIFVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdBcmdzID0ge1xuICBmaWxlSWQ6IHN0cmluZztcbiAgc291cmNlVXJsOiBzdHJpbmc7XG59O1xuXG5jb25zdCBjbGFtcFByZXZpZXdTY2FsZSA9ICh2YWx1ZTogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgaWYgKCFOdW1iZXIuaXNGaW5pdGUodmFsdWUpKSByZXR1cm4gMTtcbiAgcmV0dXJuIE1hdGgubWluKFBSRVZJRVdfTUFYX1NDQUxFLCBNYXRoLm1heCgxLCB2YWx1ZSkpO1xufTtcblxuY29uc3QgZ2V0UHJldmlld1BvaW50RGlzdGFuY2UgPSAobGVmdDogVGlja2V0UHJldmlld1BvaW50LCByaWdodDogVGlja2V0UHJldmlld1BvaW50KTogbnVtYmVyID0+IHtcbiAgY29uc3QgZGVsdGFYID0gcmlnaHQueCAtIGxlZnQueDtcbiAgY29uc3QgZGVsdGFZID0gcmlnaHQueSAtIGxlZnQueTtcbiAgcmV0dXJuIE1hdGguc3FydChkZWx0YVggKiBkZWx0YVggKyBkZWx0YVkgKiBkZWx0YVkpO1xufTtcblxuY29uc3QgZ2V0UHJldmlld1BvaW50Q2VudGVyID0gKGxlZnQ6IFRpY2tldFByZXZpZXdQb2ludCwgcmlnaHQ6IFRpY2tldFByZXZpZXdQb2ludCk6IFRpY2tldFByZXZpZXdQb2ludCA9PiAoe1xuICB4OiAobGVmdC54ICsgcmlnaHQueCkgLyAyLFxuICB5OiAobGVmdC55ICsgcmlnaHQueSkgLyAyLFxufSk7XG5cbi8vIE1hbmFnZXMgdGlja2V0IGltYWdlIHByZXZpZXcgc3RhdGUgYW5kIHpvb20vcGFuIGdlc3R1cmVzLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcgPSAoeyBmaWxlSWQsIHNvdXJjZVVybCB9OiBVc2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3QXJncykgPT4ge1xuICBjb25zdCBbcHJldmlld09wZW4sIHNldFByZXZpZXdPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3ByZXZpZXdCdXN5LCBzZXRQcmV2aWV3QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwcmV2aWV3RXJyb3IsIHNldFByZXZpZXdFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3ByZXZpZXdJbWFnZVVybCwgc2V0UHJldmlld0ltYWdlVXJsXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbcHJldmlld1NjYWxlLCBzZXRQcmV2aWV3U2NhbGVdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtwcmV2aWV3VHJhbnNsYXRlLCBzZXRQcmV2aWV3VHJhbnNsYXRlXSA9IHVzZVN0YXRlPFRpY2tldFByZXZpZXdQb2ludD4oeyB4OiAwLCB5OiAwIH0pO1xuXG4gIGNvbnN0IHByZXZpZXdTY2FsZVJlZiA9IHVzZVJlZigxKTtcbiAgY29uc3QgcHJldmlld1RyYW5zbGF0ZVJlZiA9IHVzZVJlZjxUaWNrZXRQcmV2aWV3UG9pbnQ+KHsgeDogMCwgeTogMCB9KTtcbiAgY29uc3QgcHJldmlld1BvaW50ZXJzUmVmID0gdXNlUmVmPE1hcDxudW1iZXIsIFRpY2tldFByZXZpZXdQb2ludD4+KG5ldyBNYXAoKSk7XG4gIGNvbnN0IHByZXZpZXdQYW5Qb2ludGVyUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBwcmV2aWV3UGFuTGFzdFBvaW50UmVmID0gdXNlUmVmPFRpY2tldFByZXZpZXdQb2ludCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZiA9IHVzZVJlZjx7XG4gICAgZGlzdGFuY2U6IG51bWJlcjtcbiAgICBzY2FsZTogbnVtYmVyO1xuICAgIGNlbnRlcjogVGlja2V0UHJldmlld1BvaW50O1xuICAgIHRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50O1xuICB9IHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgYXBwbHlQcmV2aWV3VHJhbnNmb3JtID0gdXNlQ2FsbGJhY2soKG5leHRTY2FsZTogbnVtYmVyLCBuZXh0VHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQpID0+IHtcbiAgICBjb25zdCBub3JtYWxpemVkU2NhbGUgPSBjbGFtcFByZXZpZXdTY2FsZShuZXh0U2NhbGUpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc2xhdGUgPSBub3JtYWxpemVkU2NhbGUgPD0gMSA/IHsgeDogMCwgeTogMCB9IDogbmV4dFRyYW5zbGF0ZTtcblxuICAgIHByZXZpZXdTY2FsZVJlZi5jdXJyZW50ID0gbm9ybWFsaXplZFNjYWxlO1xuICAgIHByZXZpZXdUcmFuc2xhdGVSZWYuY3VycmVudCA9IG5vcm1hbGl6ZWRUcmFuc2xhdGU7XG4gICAgc2V0UHJldmlld1NjYWxlKG5vcm1hbGl6ZWRTY2FsZSk7XG4gICAgc2V0UHJldmlld1RyYW5zbGF0ZShub3JtYWxpemVkVHJhbnNsYXRlKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHJlc2V0UHJldmlld0dlc3R1cmUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgcHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuY2xlYXIoKTtcbiAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIGFwcGx5UHJldmlld1RyYW5zZm9ybSgxLCB7IHg6IDAsIHk6IDAgfSk7XG4gIH0sIFthcHBseVByZXZpZXdUcmFuc2Zvcm1dKTtcblxuICBjb25zdCByZWJ1aWxkUGluY2hTbmFwc2hvdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBwb2ludGVyUG9pbnRzID0gQXJyYXkuZnJvbShwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC52YWx1ZXMoKSk7XG4gICAgaWYgKHBvaW50ZXJQb2ludHMubGVuZ3RoIDwgMikge1xuICAgICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgW2xlZnQsIHJpZ2h0XSA9IHBvaW50ZXJQb2ludHM7XG4gICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IHtcbiAgICAgIGRpc3RhbmNlOiBNYXRoLm1heCgxLCBnZXRQcmV2aWV3UG9pbnREaXN0YW5jZShsZWZ0LCByaWdodCkpLFxuICAgICAgc2NhbGU6IHByZXZpZXdTY2FsZVJlZi5jdXJyZW50LFxuICAgICAgY2VudGVyOiBnZXRQcmV2aWV3UG9pbnRDZW50ZXIobGVmdCwgcmlnaHQpLFxuICAgICAgdHJhbnNsYXRlOiBwcmV2aWV3VHJhbnNsYXRlUmVmLmN1cnJlbnQsXG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNsb3NlUHJldmlldyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRQcmV2aWV3T3BlbihmYWxzZSk7XG4gICAgc2V0UHJldmlld0J1c3koZmFsc2UpO1xuICAgIHNldFByZXZpZXdFcnJvcihcIlwiKTtcbiAgICByZXNldFByZXZpZXdHZXN0dXJlKCk7XG4gICAgc2V0UHJldmlld0ltYWdlVXJsKChwcmV2aW91cykgPT4ge1xuICAgICAgaWYgKHByZXZpb3VzKSB7XG4gICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwocHJldmlvdXMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfSk7XG4gIH0sIFtyZXNldFByZXZpZXdHZXN0dXJlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHByZXZpZXdJbWFnZVVybCkge1xuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHByZXZpZXdJbWFnZVVybCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW3ByZXZpZXdJbWFnZVVybF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFwcmV2aWV3T3BlbikgcmV0dXJuO1xuXG4gICAgY29uc3Qgb25LZXlEb3duID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgIGNsb3NlUHJldmlldygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlEb3duKTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XG4gIH0sIFtwcmV2aWV3T3BlbiwgY2xvc2VQcmV2aWV3XSk7XG5cbiAgY29uc3QgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICBpZiAoIXByZXZpZXdJbWFnZVVybCB8fCBwcmV2aWV3QnVzeSkgcmV0dXJuO1xuICAgICAgY29uc3QgcG9pbnQ6IFRpY2tldFByZXZpZXdQb2ludCA9IHsgeDogZXZlbnQuY2xpZW50WCwgeTogZXZlbnQuY2xpZW50WSB9O1xuICAgICAgcHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuc2V0KGV2ZW50LnBvaW50ZXJJZCwgcG9pbnQpO1xuICAgICAgaWYgKHR5cGVvZiBldmVudC5jdXJyZW50VGFyZ2V0LnNldFBvaW50ZXJDYXB0dXJlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnNldFBvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZCk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIC8vIElnbm9yZSBjYXB0dXJlIGZhaWx1cmVzIG9uIGJyb3dzZXJzIHRoYXQgZG8gbm90IGZ1bGx5IHN1cHBvcnQgcG9pbnRlciBjYXB0dXJlLlxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5zaXplID09PSAxKSB7XG4gICAgICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBldmVudC5wb2ludGVySWQ7XG4gICAgICAgIHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudCA9IHBvaW50O1xuICAgICAgICBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICByZWJ1aWxkUGluY2hTbmFwc2hvdCgpO1xuICAgIH0sXG4gICAgW3ByZXZpZXdCdXN5LCBwcmV2aWV3SW1hZ2VVcmwsIHJlYnVpbGRQaW5jaFNuYXBzaG90XVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgaWYgKCFwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5oYXMoZXZlbnQucG9pbnRlcklkKSkgcmV0dXJuO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgcG9pbnQ6IFRpY2tldFByZXZpZXdQb2ludCA9IHsgeDogZXZlbnQuY2xpZW50WCwgeTogZXZlbnQuY2xpZW50WSB9O1xuICAgICAgcHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuc2V0KGV2ZW50LnBvaW50ZXJJZCwgcG9pbnQpO1xuXG4gICAgICBjb25zdCBwb2ludGVyRW50cmllcyA9IEFycmF5LmZyb20ocHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuZW50cmllcygpKTtcbiAgICAgIGNvbnN0IHBvaW50ZXJQb2ludHMgPSBwb2ludGVyRW50cmllcy5tYXAoKGVudHJ5KSA9PiBlbnRyeVsxXSk7XG5cbiAgICAgIGlmIChwb2ludGVyUG9pbnRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIGlmICghcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCkge1xuICAgICAgICAgIHJlYnVpbGRQaW5jaFNuYXBzaG90KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzbmFwc2hvdCA9IHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQ7XG4gICAgICAgIGlmICghc25hcHNob3QpIHJldHVybjtcblxuICAgICAgICBjb25zdCBbbGVmdCwgcmlnaHRdID0gcG9pbnRlclBvaW50cztcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLm1heCgxLCBnZXRQcmV2aWV3UG9pbnREaXN0YW5jZShsZWZ0LCByaWdodCkpO1xuICAgICAgICBjb25zdCByYXRpbyA9IGRpc3RhbmNlIC8gTWF0aC5tYXgoMSwgc25hcHNob3QuZGlzdGFuY2UpO1xuICAgICAgICBjb25zdCBuZXh0U2NhbGUgPSBjbGFtcFByZXZpZXdTY2FsZShzbmFwc2hvdC5zY2FsZSAqIHJhdGlvKTtcbiAgICAgICAgY29uc3QgY2VudGVyID0gZ2V0UHJldmlld1BvaW50Q2VudGVyKGxlZnQsIHJpZ2h0KTtcbiAgICAgICAgY29uc3QgbmV4dFRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50ID0ge1xuICAgICAgICAgIHg6IHNuYXBzaG90LnRyYW5zbGF0ZS54ICsgKGNlbnRlci54IC0gc25hcHNob3QuY2VudGVyLngpLFxuICAgICAgICAgIHk6IHNuYXBzaG90LnRyYW5zbGF0ZS55ICsgKGNlbnRlci55IC0gc25hcHNob3QuY2VudGVyLnkpLFxuICAgICAgICB9O1xuICAgICAgICBhcHBseVByZXZpZXdUcmFuc2Zvcm0obmV4dFNjYWxlLCBuZXh0VHJhbnNsYXRlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAocG9pbnRlclBvaW50cy5sZW5ndGggIT09IDEgfHwgcHJldmlld1NjYWxlUmVmLmN1cnJlbnQgPD0gMSB8fCBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ICE9PSBldmVudC5wb2ludGVySWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBsYXN0UG9pbnQgPSBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQ7XG4gICAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBwb2ludDtcbiAgICAgIGlmICghbGFzdFBvaW50KSByZXR1cm47XG5cbiAgICAgIGNvbnN0IG5leHRUcmFuc2xhdGU6IFRpY2tldFByZXZpZXdQb2ludCA9IHtcbiAgICAgICAgeDogcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50LnggKyAocG9pbnQueCAtIGxhc3RQb2ludC54KSxcbiAgICAgICAgeTogcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50LnkgKyAocG9pbnQueSAtIGxhc3RQb2ludC55KSxcbiAgICAgIH07XG4gICAgICBhcHBseVByZXZpZXdUcmFuc2Zvcm0ocHJldmlld1NjYWxlUmVmLmN1cnJlbnQsIG5leHRUcmFuc2xhdGUpO1xuICAgIH0sXG4gICAgW2FwcGx5UHJldmlld1RyYW5zZm9ybSwgcmVidWlsZFBpbmNoU25hcHNob3RdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgIGlmICghcHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuaGFzKGV2ZW50LnBvaW50ZXJJZCkpIHJldHVybjtcbiAgICAgIHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LmRlbGV0ZShldmVudC5wb2ludGVySWQpO1xuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgZXZlbnQuY3VycmVudFRhcmdldC5oYXNQb2ludGVyQ2FwdHVyZSA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuaGFzUG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKVxuICAgICAgKSB7XG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQucmVsZWFzZVBvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBvaW50ZXJFbnRyaWVzID0gQXJyYXkuZnJvbShwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5lbnRyaWVzKCkpO1xuICAgICAgaWYgKHBvaW50ZXJFbnRyaWVzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICByZWJ1aWxkUGluY2hTbmFwc2hvdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChwb2ludGVyRW50cmllcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgY29uc3QgW3BvaW50ZXJJZCwgcG9pbnRlclBvaW50XSA9IHBvaW50ZXJFbnRyaWVzWzBdO1xuICAgICAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gcG9pbnRlcklkO1xuICAgICAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBwb2ludGVyUG9pbnQ7XG4gICAgICAgIHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgaWYgKHByZXZpZXdTY2FsZVJlZi5jdXJyZW50IDw9IDEpIHtcbiAgICAgICAgYXBwbHlQcmV2aWV3VHJhbnNmb3JtKDEsIHsgeDogMCwgeTogMCB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFthcHBseVByZXZpZXdUcmFuc2Zvcm0sIHJlYnVpbGRQaW5jaFNuYXBzaG90XVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVByZXZpZXdXaGVlbCA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuV2hlZWxFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgIGlmICghcHJldmlld0ltYWdlVXJsIHx8IHByZXZpZXdCdXN5KSByZXR1cm47XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBjb25zdCBkaXJlY3Rpb24gPSBldmVudC5kZWx0YVkgPCAwID8gMSA6IC0xO1xuICAgICAgY29uc3QgbmV4dFNjYWxlID0gY2xhbXBQcmV2aWV3U2NhbGUocHJldmlld1NjYWxlUmVmLmN1cnJlbnQgKyBkaXJlY3Rpb24gKiBQUkVWSUVXX1NDQUxFX1NURVApO1xuICAgICAgYXBwbHlQcmV2aWV3VHJhbnNmb3JtKG5leHRTY2FsZSwgcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50KTtcbiAgICB9LFxuICAgIFthcHBseVByZXZpZXdUcmFuc2Zvcm0sIHByZXZpZXdCdXN5LCBwcmV2aWV3SW1hZ2VVcmxdXG4gICk7XG5cbiAgY29uc3Qgb3BlblByZXZpZXcgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgY3VycmVudEZpbGVJZCA9IHNhZmVUZXh0KGZpbGVJZCk7XG4gICAgY29uc3QgY3VycmVudFVybCA9IHNhZmVUZXh0KHNvdXJjZVVybCk7XG4gICAgaWYgKCFjdXJyZW50RmlsZUlkIHx8ICFjdXJyZW50VXJsKSByZXR1cm47XG5cbiAgICByZXNldFByZXZpZXdHZXN0dXJlKCk7XG4gICAgc2V0UHJldmlld09wZW4odHJ1ZSk7XG4gICAgc2V0UHJldmlld0J1c3kodHJ1ZSk7XG4gICAgc2V0UHJldmlld0Vycm9yKFwiXCIpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldFByZXZpZXdCbG9iKGN1cnJlbnRGaWxlSWQsIGN1cnJlbnRVcmwsIHtcbiAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IG9iamVjdFVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICBzZXRQcmV2aWV3SW1hZ2VVcmwoKHByZXZpb3VzKSA9PiB7XG4gICAgICAgIGlmIChwcmV2aW91cykge1xuICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwocHJldmlvdXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmplY3RVcmw7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgc2V0UHJldmlld0Vycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgIHNldFByZXZpZXdJbWFnZVVybChcIlwiKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0UHJldmlld0J1c3koZmFsc2UpO1xuICAgIH1cbiAgfSwgW2ZpbGVJZCwgcmVzZXRQcmV2aWV3R2VzdHVyZSwgc291cmNlVXJsXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBwcmV2aWV3T3BlbixcbiAgICBwcmV2aWV3QnVzeSxcbiAgICBwcmV2aWV3RXJyb3IsXG4gICAgcHJldmlld0ltYWdlVXJsLFxuICAgIHByZXZpZXdTY2FsZSxcbiAgICBwcmV2aWV3VHJhbnNsYXRlLFxuICAgIG9wZW5QcmV2aWV3LFxuICAgIGNsb3NlUHJldmlldyxcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24sXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlLFxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kLFxuICAgIGhhbmRsZVByZXZpZXdXaGVlbCxcbiAgfTtcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWR1Y2VyIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7IERpc3BhdGNoLCBTZXRTdGF0ZUFjdGlvbiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBwYXJzZUV4cGVuc2VEYXRlLCBzYWZlVGV4dCwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcblxudHlwZSBEcmFmdFN0YXRlID0ge1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBnYXN0b1R5cGU6IHN0cmluZztcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICBjb21lbnRhcmlvOiBzdHJpbmc7XG4gIHVybEZpbGU6IHN0cmluZztcbiAgZmlsZU5hbWU6IHN0cmluZztcbn07XG5cbnR5cGUgRWRpdG9yU3RhdGUgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIHN0YXR1czogc3RyaW5nO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIG1vZGFsRXJyb3I6IHN0cmluZztcbiAgbGluZVBhZ2U6IG51bWJlcjtcbiAgZHJhZnQ6IERyYWZ0U3RhdGU7XG59O1xuXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxFZGl0b3JBcmdzID0ge1xuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsO1xuICBsaW5lQ291bnQ6IG51bWJlcjtcbiAgcGFnZVNpemU6IG51bWJlcjtcbiAgY2FuRWRpdFRpY2tldDogYm9vbGVhbjtcbiAgaXNMb2FkaW5nOiBib29sZWFuO1xuICBhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0OiBib29sZWFuO1xuICBpc0Zyb21TaGVldExpbms6IGJvb2xlYW47XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xufTtcblxudHlwZSBFZGl0b3JBY3Rpb24gPVxuICB8IHsgdHlwZTogXCJoeWRyYXRlX2Zyb21faGVhZGVyXCI7IGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGwgfVxuICB8IHtcbiAgICAgIHR5cGU6IFwicGF0Y2hfc3RhdGVcIjtcbiAgICAgIHBhdGNoOiBQYXJ0aWFsPFBpY2s8RWRpdG9yU3RhdGUsIFwiYnVzeVwiIHwgXCJzdGF0dXNcIiB8IFwiaXNFZGl0aW5nXCIgfCBcIm1vZGFsRXJyb3JcIiB8IFwibGluZVBhZ2VcIj4+O1xuICAgIH1cbiAgfCB7IHR5cGU6IFwic2V0X2RyYWZ0X2ZpZWxkXCI7IGZpZWxkOiBrZXlvZiBEcmFmdFN0YXRlOyB2YWx1ZTogc3RyaW5nIH07XG5cbmNvbnN0IGNyZWF0ZUVtcHR5RHJhZnQgPSAoKTogRHJhZnRTdGF0ZSA9PiAoe1xuICBkZXNjcmlwdGlvbjogXCJcIixcbiAgZ2FzdG9UeXBlOiBcIlwiLFxuICBjdXJyZW5jeUNvZGU6IFwiXCIsXG4gIHRyYW5zRGF0ZTogXCJcIixcbiAgY29tZW50YXJpbzogXCJcIixcbiAgdXJsRmlsZTogXCJcIixcbiAgZmlsZU5hbWU6IFwiXCIsXG59KTtcblxuY29uc3QgdG9JbnB1dERhdGUgPSAocmF3Pzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlRGF0ZShyYXcpO1xuICByZXR1cm4gcGFyc2VkID8gdG9Jc29EYXRlKHBhcnNlZCkgOiBcIlwiO1xufTtcblxuY29uc3QgY3JlYXRlRHJhZnRGcm9tSGVhZGVyID0gKGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGwpOiBEcmFmdFN0YXRlID0+IHtcbiAgcmV0dXJuIHtcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoaGVhZGVyPy5kZXNjcmlwdGlvbiksXG4gICAgZ2FzdG9UeXBlOiBoZWFkZXI/Lmdhc3RvVHlwZSA9PT0gbnVsbCB8fCBoZWFkZXI/Lmdhc3RvVHlwZSA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IFN0cmluZyhoZWFkZXIuZ2FzdG9UeXBlKSxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpLFxuICAgIHRyYW5zRGF0ZTogdG9JbnB1dERhdGUoaGVhZGVyPy50cmFuc0RhdGUpLFxuICAgIGNvbWVudGFyaW86IHNhZmVUZXh0KGhlYWRlcj8uY29tZW50YXJpbyksXG4gICAgdXJsRmlsZTogc2FmZVRleHQoaGVhZGVyPy51cmxGaWxlKSxcbiAgICBmaWxlTmFtZTogc2FmZVRleHQoaGVhZGVyPy5maWxlTmFtZSksXG4gIH07XG59O1xuXG5jb25zdCBjcmVhdGVJbml0aWFsU3RhdGUgPSAoKTogRWRpdG9yU3RhdGUgPT4gKHtcbiAgYnVzeTogZmFsc2UsXG4gIHN0YXR1czogXCJcIixcbiAgaXNFZGl0aW5nOiBmYWxzZSxcbiAgbW9kYWxFcnJvcjogXCJcIixcbiAgbGluZVBhZ2U6IDEsXG4gIGRyYWZ0OiBjcmVhdGVFbXB0eURyYWZ0KCksXG59KTtcblxuY29uc3QgZWRpdG9yUmVkdWNlciA9IChzdGF0ZTogRWRpdG9yU3RhdGUsIGFjdGlvbjogRWRpdG9yQWN0aW9uKTogRWRpdG9yU3RhdGUgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBcImh5ZHJhdGVfZnJvbV9oZWFkZXJcIjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBkcmFmdDogY3JlYXRlRHJhZnRGcm9tSGVhZGVyKGFjdGlvbi5oZWFkZXIpLFxuICAgICAgfTtcbiAgICBjYXNlIFwicGF0Y2hfc3RhdGVcIjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAuLi5hY3Rpb24ucGF0Y2gsXG4gICAgICB9O1xuICAgIGNhc2UgXCJzZXRfZHJhZnRfZmllbGRcIjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBkcmFmdDoge1xuICAgICAgICAgIC4uLnN0YXRlLmRyYWZ0LFxuICAgICAgICAgIFthY3Rpb24uZmllbGRdOiBhY3Rpb24udmFsdWUsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmNvbnN0IHJlc29sdmVTZXRTdGF0ZVZhbHVlID0gPFQsPih2YWx1ZTogU2V0U3RhdGVBY3Rpb248VD4sIGN1cnJlbnQ6IFQpOiBUID0+IHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gKHZhbHVlIGFzIChwcmV2U3RhdGU6IFQpID0+IFQpKGN1cnJlbnQpIDogdmFsdWU7XG59O1xuXG4vLyBPd25zIHBhZ2UtbG9jYWwgZWRpdCwgZHJhZnQsIGFuZCBsaW5lIHBhZ2luZyBzdGF0ZSBmb3IgdGlja2V0IGRldGFpbC5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yID0gKHtcbiAgaGVhZGVyLFxuICBsaW5lQ291bnQsXG4gIHBhZ2VTaXplLFxuICBjYW5FZGl0VGlja2V0LFxuICBpc0xvYWRpbmcsXG4gIGFsbG93QXNzaWduZWREcmFmdEVkaXQsXG4gIGlzRnJvbVNoZWV0TGluayxcbiAgb25Gb3JiaWRkZW4sXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsRWRpdG9yQXJncykgPT4ge1xuICBjb25zdCBbc3RhdGUsIGRpc3BhdGNoXSA9IHVzZVJlZHVjZXIoZWRpdG9yUmVkdWNlciwgdW5kZWZpbmVkLCBjcmVhdGVJbml0aWFsU3RhdGUpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHN0YXRlLmlzRWRpdGluZykgcmV0dXJuO1xuICAgIGRpc3BhdGNoKHsgdHlwZTogXCJoeWRyYXRlX2Zyb21faGVhZGVyXCIsIGhlYWRlciB9KTtcbiAgfSwgW2hlYWRlciwgc3RhdGUuaXNFZGl0aW5nXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBtYXhQYWdlID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKGxpbmVDb3VudCAvIHBhZ2VTaXplKSk7XG4gICAgaWYgKHN0YXRlLmxpbmVQYWdlID4gbWF4UGFnZSkge1xuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IGxpbmVQYWdlOiBtYXhQYWdlIH0gfSk7XG4gICAgfVxuICB9LCBbbGluZUNvdW50LCBwYWdlU2l6ZSwgc3RhdGUubGluZVBhZ2VdKTtcblxuICBjb25zdCBzZXRCdXN5ID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+PihcbiAgICAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBidXN5OiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuYnVzeSkgfSB9KTtcbiAgICB9LFxuICAgIFtzdGF0ZS5idXN5XVxuICApO1xuXG4gIGNvbnN0IHNldFN0YXR1cyA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPHN0cmluZz4+PihcbiAgICAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogXCJwYXRjaF9zdGF0ZVwiLCBwYXRjaDogeyBzdGF0dXM6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5zdGF0dXMpIH0gfSk7XG4gICAgfSxcbiAgICBbc3RhdGUuc3RhdHVzXVxuICApO1xuXG4gIGNvbnN0IHNldElzRWRpdGluZyA9IHVzZUNhbGxiYWNrPERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPGJvb2xlYW4+Pj4oXG4gICAgKHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwicGF0Y2hfc3RhdGVcIiwgcGF0Y2g6IHsgaXNFZGl0aW5nOiByZXNvbHZlU2V0U3RhdGVWYWx1ZSh2YWx1ZSwgc3RhdGUuaXNFZGl0aW5nKSB9IH0pO1xuICAgIH0sXG4gICAgW3N0YXRlLmlzRWRpdGluZ11cbiAgKTtcblxuICBjb25zdCBzZXRNb2RhbEVycm9yID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxuICAgICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcInBhdGNoX3N0YXRlXCIsIHBhdGNoOiB7IG1vZGFsRXJyb3I6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5tb2RhbEVycm9yKSB9IH0pO1xuICAgIH0sXG4gICAgW3N0YXRlLm1vZGFsRXJyb3JdXG4gICk7XG5cbiAgY29uc3Qgc2V0TGluZVBhZ2UgPSB1c2VDYWxsYmFjazxEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxudW1iZXI+Pj4oXG4gICAgKHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwicGF0Y2hfc3RhdGVcIiwgcGF0Y2g6IHsgbGluZVBhZ2U6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5saW5lUGFnZSkgfSB9KTtcbiAgICB9LFxuICAgIFtzdGF0ZS5saW5lUGFnZV1cbiAgKTtcblxuICBjb25zdCBzZXREcmFmdERlc2NyaXB0aW9uID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxuICAgICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBcInNldF9kcmFmdF9maWVsZFwiLFxuICAgICAgICBmaWVsZDogXCJkZXNjcmlwdGlvblwiLFxuICAgICAgICB2YWx1ZTogcmVzb2x2ZVNldFN0YXRlVmFsdWUodmFsdWUsIHN0YXRlLmRyYWZ0LmRlc2NyaXB0aW9uKSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW3N0YXRlLmRyYWZ0LmRlc2NyaXB0aW9uXVxuICApO1xuXG4gIGNvbnN0IHNldERyYWZ0R2FzdG9UeXBlID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxuICAgICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBcInNldF9kcmFmdF9maWVsZFwiLFxuICAgICAgICBmaWVsZDogXCJnYXN0b1R5cGVcIixcbiAgICAgICAgdmFsdWU6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5nYXN0b1R5cGUpLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbc3RhdGUuZHJhZnQuZ2FzdG9UeXBlXVxuICApO1xuXG4gIGNvbnN0IHNldERyYWZ0Q3VycmVuY3lDb2RlID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxuICAgICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBcInNldF9kcmFmdF9maWVsZFwiLFxuICAgICAgICBmaWVsZDogXCJjdXJyZW5jeUNvZGVcIixcbiAgICAgICAgdmFsdWU6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC5jdXJyZW5jeUNvZGUpLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbc3RhdGUuZHJhZnQuY3VycmVuY3lDb2RlXVxuICApO1xuXG4gIGNvbnN0IHNldERyYWZ0VHJhbnNEYXRlID0gdXNlQ2FsbGJhY2s8RGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248c3RyaW5nPj4+KFxuICAgICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBcInNldF9kcmFmdF9maWVsZFwiLFxuICAgICAgICBmaWVsZDogXCJ0cmFuc0RhdGVcIixcbiAgICAgICAgdmFsdWU6IHJlc29sdmVTZXRTdGF0ZVZhbHVlKHZhbHVlLCBzdGF0ZS5kcmFmdC50cmFuc0RhdGUpLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbc3RhdGUuZHJhZnQudHJhbnNEYXRlXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFoZWFkZXIgfHwgaXNMb2FkaW5nKSByZXR1cm47XG4gICAgaWYgKGlzRnJvbVNoZWV0TGluaykgcmV0dXJuO1xuICAgIGlmIChoZWFkZXIuc3RhdHVzID09PSAxICYmICFhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0KSByZXR1cm47XG4gICAgaWYgKCFjYW5FZGl0VGlja2V0KSB7XG4gICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRpc3BhdGNoKHsgdHlwZTogXCJoeWRyYXRlX2Zyb21faGVhZGVyXCIsIGhlYWRlciB9KTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBcInBhdGNoX3N0YXRlXCIsXG4gICAgICBwYXRjaDoge1xuICAgICAgICBtb2RhbEVycm9yOiBcIlwiLFxuICAgICAgICBpc0VkaXRpbmc6IHRydWUsXG4gICAgICAgIHN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0VkaXRpbmdFbmFibGVkXCIsIFwiRWRpdGluZyBlbmFibGVkXCIpLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSwgW2FsbG93QXNzaWduZWREcmFmdEVkaXQsIGNhbkVkaXRUaWNrZXQsIGhlYWRlciwgaXNGcm9tU2hlZXRMaW5rLCBpc0xvYWRpbmcsIG9uRm9yYmlkZGVuXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIXN0YXRlLmlzRWRpdGluZykgcmV0dXJuO1xuICAgIGlmICghaGVhZGVyKSB7XG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFwicGF0Y2hfc3RhdGVcIiwgcGF0Y2g6IHsgaXNFZGl0aW5nOiBmYWxzZSB9IH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRpc3BhdGNoKHsgdHlwZTogXCJoeWRyYXRlX2Zyb21faGVhZGVyXCIsIGhlYWRlciB9KTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBcInBhdGNoX3N0YXRlXCIsXG4gICAgICBwYXRjaDoge1xuICAgICAgICBpc0VkaXRpbmc6IGZhbHNlLFxuICAgICAgICBtb2RhbEVycm9yOiBcIlwiLFxuICAgICAgICBzdGF0dXM6IGluZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSwgW2hlYWRlciwgc3RhdGUuaXNFZGl0aW5nXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBidXN5OiBzdGF0ZS5idXN5LFxuICAgIHN0YXR1czogc3RhdGUuc3RhdHVzLFxuICAgIGlzRWRpdGluZzogc3RhdGUuaXNFZGl0aW5nLFxuICAgIG1vZGFsRXJyb3I6IHN0YXRlLm1vZGFsRXJyb3IsXG4gICAgbGluZVBhZ2U6IHN0YXRlLmxpbmVQYWdlLFxuICAgIGRyYWZ0RGVzY3JpcHRpb246IHN0YXRlLmRyYWZ0LmRlc2NyaXB0aW9uLFxuICAgIGRyYWZ0R2FzdG9UeXBlOiBzdGF0ZS5kcmFmdC5nYXN0b1R5cGUsXG4gICAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0YXRlLmRyYWZ0LmN1cnJlbmN5Q29kZSxcbiAgICBkcmFmdFRyYW5zRGF0ZTogc3RhdGUuZHJhZnQudHJhbnNEYXRlLFxuICAgIGRyYWZ0Q29tZW50YXJpbzogc3RhdGUuZHJhZnQuY29tZW50YXJpbyxcbiAgICBkcmFmdFVybEZpbGU6IHN0YXRlLmRyYWZ0LnVybEZpbGUsXG4gICAgZHJhZnRGaWxlTmFtZTogc3RhdGUuZHJhZnQuZmlsZU5hbWUsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNFZGl0aW5nLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0TGluZVBhZ2UsXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcbiAgICBzZXREcmFmdEdhc3RvVHlwZSxcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBzZXREcmFmdFRyYW5zRGF0ZSxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5cbi8vIFBhcnNlcyByb3V0ZSBjb250ZXh0IG9uY2UgYW5kIGV4cG9zZXMgc3RhYmxlIGZsYWdzIGZvciB0aWNrZXQgZGV0YWlsIGZsb3dzLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxSb3V0ZUNvbnRleHQgPSAoKSA9PiB7XG4gIGNvbnN0IHJvdXRlUGFyYW1zID0gdXNlTWVtbygoKSA9PiBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpLCBbXSk7XG5cbiAgcmV0dXJuIHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IGF1dG9FZGl0TW9kZSA9IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcIm1vZGVcIikpLnRvTG93ZXJDYXNlKCkgPT09IFwiZWRpdFwiO1xuICAgIGNvbnN0IGRldGFpbE9yaWdpbiA9IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcIm9yaWdpblwiKSkudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBjb250ZXh0U2hlZXRJZCA9IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcInNoZWV0SWRcIikpO1xuICAgIGNvbnN0IGNvbnRleHRMaW5lUmVjSWQgPSBzYWZlVGV4dChyb3V0ZVBhcmFtcy5nZXQoXCJsaW5lUmVjSWRcIikpO1xuICAgIGNvbnN0IGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSA9IGRldGFpbE9yaWdpbiA9PT0gXCJzaGVldC1jcmVhdGVcIjtcbiAgICBjb25zdCBpc0Zyb21FeHBlbnNlTGluZSA9IGRldGFpbE9yaWdpbiA9PT0gXCJleHBlbnNlLWxpbmVcIiAmJiAhIWNvbnRleHRTaGVldElkICYmICEhY29udGV4dExpbmVSZWNJZDtcbiAgICBjb25zdCBpc0Zyb21TaGVldExpbmsgPSBkZXRhaWxPcmlnaW4gPT09IFwic2hlZXQtbGlua1wiICYmICEhY29udGV4dFNoZWV0SWQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgYXV0b0VkaXRNb2RlLFxuICAgICAgZGV0YWlsT3JpZ2luLFxuICAgICAgY29udGV4dFNoZWV0SWQsXG4gICAgICBjb250ZXh0TGluZVJlY0lkLFxuICAgICAgaXNGcm9tRXhwZW5zZVNoZWV0Q3JlYXRlLFxuICAgICAgaXNGcm9tRXhwZW5zZUxpbmUsXG4gICAgICBpc0Zyb21TaGVldExpbmssXG4gICAgfTtcbiAgfSwgW3JvdXRlUGFyYW1zXSk7XG59O1xuIiwgImltcG9ydCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi8uLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50cy9leHBlbnNlVGlja2V0U3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcblxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsRGlzcGxheUFyZ3MgPSB7XG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw7XG4gIGRyYWZ0R2FzdG9UeXBlOiBzdHJpbmc7XG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XG4gIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBnYXN0b1R5cGVMYWJlbE1hcDogTWFwPHN0cmluZywgc3RyaW5nPjtcbn07XG5cbi8vIENlbnRyYWxpemVzIGRpc3BsYXktb25seSB2YWx1ZXMgc28gdGhlIHBhZ2UgY29udGFpbmVyIHN0YXlzIGZvY3VzZWQgb24gZmxvdyB3aXJpbmcuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbERpc3BsYXkgPSAoe1xuICBoZWFkZXIsXG4gIGRyYWZ0R2FzdG9UeXBlLFxuICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgZHJhZnRUcmFuc0RhdGUsXG4gIGRyYWZ0RmlsZU5hbWUsXG4gIGlzRWRpdGluZyxcbiAgZ2FzdG9UeXBlTGFiZWxNYXAsXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsRGlzcGxheUFyZ3MpID0+IHtcbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxuICAgIH0pLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgcHJldmlld0FsdFRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+IHNhZmVUZXh0KGlzRWRpdGluZyA/IGRyYWZ0RmlsZU5hbWUgOiBoZWFkZXI/LmZpbGVOYW1lKSB8fCBpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIiksXG4gICAgW2RyYWZ0RmlsZU5hbWUsIGhlYWRlcj8uZmlsZU5hbWUsIGlzRWRpdGluZ11cbiAgKTtcblxuICBjb25zdCBzdGF0dXNMYWJlbCA9IHVzZU1lbW8oKCkgPT4gZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsKGhlYWRlcj8uc3RhdHVzKSwgW2hlYWRlcj8uc3RhdHVzXSk7XG5cbiAgY29uc3QgZ2FzdG9UeXBlTGFiZWwgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50R2FzdG9UeXBlID0gaXNFZGl0aW5nID8gZHJhZnRHYXN0b1R5cGUgOiBoZWFkZXI/Lmdhc3RvVHlwZSA9PT0gbnVsbCA/IFwiXCIgOiBTdHJpbmcoaGVhZGVyPy5nYXN0b1R5cGUgPz8gXCJcIik7XG4gICAgaWYgKCFjdXJyZW50R2FzdG9UeXBlKSB7XG4gICAgICByZXR1cm4gaW5kVChcIkNvbW1vbl9Ob3RBdmFpbGFibGVcIiwgXCJOL0FcIik7XG4gICAgfVxuICAgIHJldHVybiBnYXN0b1R5cGVMYWJlbE1hcC5nZXQoU3RyaW5nKGN1cnJlbnRHYXN0b1R5cGUpKSB8fCBTdHJpbmcoY3VycmVudEdhc3RvVHlwZSk7XG4gIH0sIFtkcmFmdEdhc3RvVHlwZSwgZ2FzdG9UeXBlTGFiZWxNYXAsIGhlYWRlcj8uZ2FzdG9UeXBlLCBpc0VkaXRpbmddKTtcblxuICBjb25zdCB0b3RhbEFtb3VudFRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShoZWFkZXI/LnRvdGFsQW1vdW50ID8/IG51bGwsIChpc0VkaXRpbmcgPyBkcmFmdEN1cnJlbmN5Q29kZSA6IGhlYWRlcj8uY3VycmVuY3lDb2RlKSB8fCBoZWFkZXI/LmN1cnJlbmN5Q29kZSksXG4gICAgW2RyYWZ0Q3VycmVuY3lDb2RlLCBoZWFkZXI/LmN1cnJlbmN5Q29kZSwgaGVhZGVyPy50b3RhbEFtb3VudCwgaXNFZGl0aW5nXVxuICApO1xuXG4gIGNvbnN0IHRyYW5zRGF0ZVRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShpc0VkaXRpbmcgPyBkcmFmdFRyYW5zRGF0ZSA6IGhlYWRlcj8udHJhbnNEYXRlLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIiksXG4gICAgW2RyYWZ0VHJhbnNEYXRlLCBoZWFkZXI/LnRyYW5zRGF0ZSwgaXNFZGl0aW5nXVxuICApO1xuXG4gIHJldHVybiB7XG4gICAgcGFnaW5hdGlvbkxhYmVscyxcbiAgICBwcmV2aWV3QWx0VGV4dCxcbiAgICBzdGF0dXNMYWJlbCxcbiAgICBnYXN0b1R5cGVMYWJlbCxcbiAgICB0b3RhbEFtb3VudFRleHQsXG4gICAgdHJhbnNEYXRlVGV4dCxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZUFyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIG1vZGFsRXJyb3I6IHN0cmluZztcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldFN0YXR1czogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG59O1xuXG4vLyBFbmNhcHN1bGF0ZXMgY29uZmlybSBtb2RhbCBzdGF0ZSBzbyB0aGUgcGFnZSBjb250YWluZXIgc3RheXMgZm9jdXNlZCBvbiBmbG93IHdpcmluZy5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsQ29uZmlybVN0YXRlID0gKHtcbiAgYnVzeSxcbiAgbW9kYWxFcnJvcixcbiAgc2V0TW9kYWxFcnJvcixcbiAgc2V0U3RhdHVzLFxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbENvbmZpcm1TdGF0ZUFyZ3MpID0+IHtcbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xuICAgICAgYnVzeSxcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xuICAgICAgICBzZXRTdGF0dXMobXNnKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtLCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXNdKTtcblxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcbiAgICA6ICFidXN5ICYmIG1vZGFsRXJyb3JcbiAgICAgID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpXG4gICAgICA6IG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpO1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xuICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZvaWQgaGFuZGxlTW9kYWxDb25maXJtKCk7XG4gIH0sIFtidXN5LCBjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbW9kYWxFcnJvcl0pO1xuXG4gIHJldHVybiB7XG4gICAgbW9kYWwsXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgY2xvc2VDb25maXJtLFxuICAgIG1vZGFsTG9hZGluZ1RleHQsXG4gICAgbW9kYWxDYW5jZWxUZXh0LFxuICAgIG1vZGFsQ29uZmlybVRleHQsXG4gICAgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBSZWZPYmplY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxJbnRlcmFjdGlvbnNBcmdzID0ge1xuICBmaWxlSWQ6IHN0cmluZztcbiAgY29udGV4dFNoZWV0SWQ6IHN0cmluZztcbiAgaXNGcm9tRXhwZW5zZUxpbmU6IGJvb2xlYW47XG4gIGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZTogYm9vbGVhbjtcbiAgaXNGcm9tU2hlZXRMaW5rOiBib29sZWFuO1xuICBoZWFkZXJFeHBlbnNlU2hlZXRJZDogc3RyaW5nO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGxpbmVDb250YWluZXJSZWY6IFJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xuICBvcGVuUHJldmlldzogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbn07XG5cbi8vIEdyb3VwcyB0aWNrZXQgZGV0YWlsIG5hdmlnYXRpb24gYW5kIGxpbmUtY2FyZCBpbnRlcmFjdGlvbnMgYmVoaW5kIHN0YWJsZSBjYWxsYmFja3MuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbEludGVyYWN0aW9ucyA9ICh7XG4gIGZpbGVJZCxcbiAgY29udGV4dFNoZWV0SWQsXG4gIGlzRnJvbUV4cGVuc2VMaW5lLFxuICBpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUsXG4gIGlzRnJvbVNoZWV0TGluayxcbiAgaGVhZGVyRXhwZW5zZVNoZWV0SWQsXG4gIGlzRWRpdGluZyxcbiAgbGluZUNvbnRhaW5lclJlZixcbiAgb3BlblByZXZpZXcsXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsSW50ZXJhY3Rpb25zQXJncykgPT4ge1xuICBjb25zdCBvcGVuTGluZURldGFpbCA9IHVzZUNhbGxiYWNrKFxuICAgIChyYXdMaW5lUmVjSWQ6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKGlzRnJvbUV4cGVuc2VMaW5lIHx8IGlzRnJvbVNoZWV0TGluaykgcmV0dXJuO1xuICAgICAgY29uc3QgbGluZVJlY0lkID0gc2FmZVRleHQocmF3TGluZVJlY0lkKTtcbiAgICAgIGlmICghbGluZVJlY0lkIHx8ICFmaWxlSWQpIHJldHVybjtcblxuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgICAgZmlsZUlkLFxuICAgICAgICBsaW5lUmVjSWQsXG4gICAgICB9KTtcbiAgICAgIGlmIChpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUpIHtcbiAgICAgICAgcXVlcnkuc2V0KFwib3JpZ2luXCIsIFwic2hlZXQtY3JlYXRlXCIpO1xuICAgICAgICBxdWVyeS5zZXQoXCJtb2RlXCIsIFwiZWRpdFwiKTtcbiAgICAgICAgaWYgKGNvbnRleHRTaGVldElkKSB7XG4gICAgICAgICAgcXVlcnkuc2V0KFwic2hlZXRJZFwiLCBjb250ZXh0U2hlZXRJZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0TGluZURldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xuICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXG4gICAgICAgIGJ5cGFzc0d1YXJkT25jZTogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtjb250ZXh0U2hlZXRJZCwgZmlsZUlkLCBpc0Zyb21FeHBlbnNlTGluZSwgaXNGcm9tRXhwZW5zZVNoZWV0Q3JlYXRlLCBpc0Zyb21TaGVldExpbmtdXG4gICk7XG5cbiAgY29uc3QgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgPSB1c2VDYWxsYmFjayhcbiAgICAodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG4gICAgICBjb25zdCBjYXJkID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XG4gICAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xuICAgICAgaWYgKCFsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcbiAgICAgIHJldHVybiBjYXJkO1xuICAgIH0sXG4gICAgW2xpbmVDb250YWluZXJSZWZdXG4gICk7XG5cbiAgY29uc3Qgb3BlbkZpbGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgdm9pZCBvcGVuUHJldmlldygpO1xuICB9LCBbb3BlblByZXZpZXddKTtcblxuICBjb25zdCBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChpc0Zyb21TaGVldExpbmspIHJldHVybjtcbiAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KGhlYWRlckV4cGVuc2VTaGVldElkKTtcbiAgICBpZiAoIXNhZmVTaGVldElkKSByZXR1cm47XG5cbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVTaGVldElkKX1gLCB7XG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcbiAgICB9KTtcbiAgfSwgW2hlYWRlckV4cGVuc2VTaGVldElkLCBpc0VkaXRpbmcsIGlzRnJvbVNoZWV0TGlua10pO1xuXG4gIHJldHVybiB7XG4gICAgb3BlbkxpbmVEZXRhaWwsXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXG4gICAgb3BlbkZpbGUsXG4gICAgaGFuZGxlT3BlbkV4cGVuc2VTaGVldCxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB9IGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0LnRzeFwiO1xuXG5jb25zdCBoYXNSZWFsRXhwZW5zZVNoZWV0VmFsdWUgPSAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIGZhbHNlO1xuICBpZiAobm9ybWFsaXplZCA9PT0gXCItXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIwXCIpIHJldHVybiBmYWxzZTtcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwibi9hXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJuYVwiKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB0cnVlO1xufTtcblxuY29uc3QgSU1BR0VfRVhURU5TSU9OUyA9IG5ldyBTZXQ8c3RyaW5nPihbXCJqcGdcIiwgXCJqcGVnXCIsIFwicG5nXCIsIFwid2VicFwiLCBcImdpZlwiLCBcImJtcFwiLCBcImhlaWNcIiwgXCJoZWlmXCIsIFwiYXZpZlwiXSk7XG5cbmNvbnN0IGdldEZpbGVFeHRlbnNpb25Gcm9tUGF0aCA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgc291cmNlID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghc291cmNlKSByZXR1cm4gXCJcIjtcblxuICBjb25zdCB3aXRob3V0UXVlcnkgPSBzb3VyY2Uuc3BsaXQoXCI/XCIpWzBdLnNwbGl0KFwiI1wiKVswXTtcbiAgY29uc3QgcGFydHMgPSB3aXRob3V0UXVlcnkuc3BsaXQoXCIuXCIpO1xuICBpZiAocGFydHMubGVuZ3RoIDwgMikgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3QgcmF3RXh0ID0gc2FmZVRleHQocGFydHNbcGFydHMubGVuZ3RoIC0gMV0pLnJlcGxhY2UoL1teYS16MC05XS9nLCBcIlwiKTtcbiAgcmV0dXJuIHJhd0V4dCA9PT0gXCJqcGVnXCIgPyBcImpwZ1wiIDogcmF3RXh0O1xufTtcblxuY29uc3QgaGFzSW1hZ2VQcmV2aWV3TGluayA9ICh1cmxWYWx1ZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRVcmwgPSBzYWZlVGV4dCh1cmxWYWx1ZSk7XG4gIGlmICghbm9ybWFsaXplZFVybCkgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChub3JtYWxpemVkVXJsLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChcImRhdGE6aW1hZ2UvXCIpKSByZXR1cm4gdHJ1ZTtcblxuICBjb25zdCBleHRlbnNpb24gPSBnZXRGaWxlRXh0ZW5zaW9uRnJvbVBhdGgobm9ybWFsaXplZFVybCk7XG4gIGlmIChleHRlbnNpb24gJiYgSU1BR0VfRVhURU5TSU9OUy5oYXMoZXh0ZW5zaW9uKSkgcmV0dXJuIHRydWU7XG5cbiAgY29uc3Qgbm9ybWFsaXplZExvd2VyID0gbm9ybWFsaXplZFVybC50b0xvd2VyQ2FzZSgpO1xuICBpZiAobm9ybWFsaXplZExvd2VyLmluY2x1ZGVzKFwiYmxvYi5jb3JlLndpbmRvd3MubmV0XCIpICYmIG5vcm1hbGl6ZWRMb3dlci5pbmNsdWRlcyhcImltYWdlXCIpKSByZXR1cm4gdHJ1ZTtcblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG50eXBlIEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtUHJvcHMgPSB7XG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlcjtcbiAgc3RhdHVzTGFiZWw6IHN0cmluZztcbiAgZ2FzdG9UeXBlTGFiZWw6IHN0cmluZztcbiAgdG90YWxBbW91bnRUZXh0OiBzdHJpbmc7XG4gIHRyYW5zRGF0ZVRleHQ6IHN0cmluZztcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBnYXN0b1R5cGVPcHRpb25zOiBBcnJheTx7IHZhbHVlOiBzdHJpbmc7IHRleHQ6IHN0cmluZyB9PjtcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xuICBkcmFmdEdhc3RvVHlwZTogc3RyaW5nO1xuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xuICBkcmFmdFVybEZpbGU6IHN0cmluZztcbiAgZHJhZnRGaWxlTmFtZTogc3RyaW5nO1xuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbk9wZW5GaWxlOiAoKSA9PiB2b2lkO1xuICBvbk9wZW5FeHBlbnNlU2hlZXQ/OiAoKSA9PiB2b2lkO1xufTtcblxuLy8gUmVhZC1vbmx5IGFuZCBlZGl0YWJsZSBoZWFkZXIgZm9ybSBmb3IgdGlja2V0IGRldGFpbC5cbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtID0gKHtcbiAgaGVhZGVyLFxuICBzdGF0dXNMYWJlbCxcbiAgZ2FzdG9UeXBlTGFiZWwsXG4gIHRvdGFsQW1vdW50VGV4dCxcbiAgdHJhbnNEYXRlVGV4dCxcbiAgaXNFZGl0aW5nLFxuICBnYXN0b1R5cGVPcHRpb25zLFxuICBkcmFmdERlc2NyaXB0aW9uLFxuICBkcmFmdEdhc3RvVHlwZSxcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gIGRyYWZ0VHJhbnNEYXRlLFxuICBkcmFmdFVybEZpbGUsXG4gIGRyYWZ0RmlsZU5hbWUsXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZSxcbiAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZSxcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZSxcbiAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZSxcbiAgb25PcGVuRmlsZSxcbiAgb25PcGVuRXhwZW5zZVNoZWV0LFxufTogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm1Qcm9wcykgPT4ge1xuICBjb25zdCBwcmV2aWV3VXJsID0gc2FmZVRleHQoaXNFZGl0aW5nID8gZHJhZnRVcmxGaWxlIDogaGVhZGVyLnVybEZpbGUpO1xuICBjb25zdCBjYW5PcGVuRmlsZSA9IGhhc0ltYWdlUHJldmlld0xpbmsocHJldmlld1VybCk7XG4gIGNvbnN0IHNob3dFeHBlbnNlU2hlZXRGaWVsZCA9IGhhc1JlYWxFeHBlbnNlU2hlZXRWYWx1ZShoZWFkZXIuaG9qYUdhc3Rvc0lkRGlzcGxheSk7XG5cbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIil9XG4gICAgICAgICAgdmFsdWU9e2hlYWRlci5maWxlSWQgfHwgXCItXCJ9XG4gICAgICAgIC8+XG5cbiAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX1N0YXR1c1wiLCBcIlN0YXR1c1wiKX1cbiAgICAgICAgICB2YWx1ZT17c3RhdHVzTGFiZWwgfHwgXCItXCJ9XG4gICAgICAgIC8+XG5cbiAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtOmNvbC1zcGFuLTIgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX08L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdERlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxuICAgICAgICAgICAgdmFsdWU9e2hlYWRlci5kZXNjcmlwdGlvbiB8fCBcIi1cIn1cbiAgICAgICAgICAgIGZ1bGxXaWR0aFxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG5cbiAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cbiAgICAgICAgICAgIG9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XG4gICAgICAgICAgICB2YWx1ZT17ZHJhZnRHYXN0b1R5cGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEdhc3RvVHlwZUNoYW5nZX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cbiAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XG4gICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxuICAgICAgICAgICAgdmFsdWU9e2dhc3RvVHlwZUxhYmVsIHx8IFwiLVwifVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG5cbiAgICAgICAge3Nob3dFeHBlbnNlU2hlZXRGaWVsZCA/IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9FeHBlbnNlU2hlZXREaXNwbGF5XCIsIFwiRXhwZW5zZSBzaGVldFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtoZWFkZXIuaG9qYUdhc3Rvc0lkRGlzcGxheSB8fCBcIi1cIn1cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uT3BlbkV4cGVuc2VTaGVldH1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgIDxFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XG4gICAgICAgICAgICB2YWx1ZT17ZHJhZnRDdXJyZW5jeUNvZGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cbiAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtdGlja2V0LWRldGFpbC1jdXJyZW5jeVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgdmFsdWU9e2hlYWRlci5jdXJyZW5jeUNvZGUgfHwgXCItXCJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cblxuICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVG90YWxBbW91bnRcIiwgXCJUb3RhbCBhbW91bnRcIil9XG4gICAgICAgICAgdmFsdWU9e3RvdGFsQW1vdW50VGV4dCB8fCBcIi1cIn1cbiAgICAgICAgLz5cblxuICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlzaXRhLWZpZWxkLXRleHRcIj5cbiAgICAgICAgICAgIDxTaW5nbGVEYXRlUGlja2VyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DcmVhdGVkRGF0ZVwiLCBcIkRhdGVcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFRyYW5zRGF0ZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRUcmFuc0RhdGVDaGFuZ2V9XG4gICAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0NyZWF0ZWREYXRlXCIsIFwiRGF0ZVwiKX1cbiAgICAgICAgICAgICAgdmFsdWU9e3RyYW5zRGF0ZVRleHQgfHwgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGhlYWRlci50cmFuc0RhdGUsIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiKSB8fCBcIi1cIn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7Y2FuT3BlbkZpbGUgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWVuZFwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiXG4gICAgICAgICAgICBvbkNsaWNrPXtvbk9wZW5GaWxlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpbmRUKFwiVGlja2V0c19EZXRhaWxfVmlld0F0dGFjaG1lbnRcIiwgXCJWZXIgYWRqdW50b1wiKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBDb21wYWN0UGFnaW5hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VEYXRlUGFydHMgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZU51bWJlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xuaW1wb3J0IEV4cGVuc2VTZWN0aW9uRGl2aWRlciBmcm9tIFwiLi9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpbWVsaW5lQ2FyZCBmcm9tIFwiLi9FeHBlbnNlVGltZWxpbmVDYXJkLnRzeFwiO1xuXG50eXBlIFBhZ2luYXRpb25MYWJlbHMgPSB7XG4gIGZpcnN0OiBzdHJpbmc7XG4gIHByZXY6IHN0cmluZztcbiAgbmV4dDogc3RyaW5nO1xuICBsYXN0OiBzdHJpbmc7XG59O1xuXG50eXBlIEV4cGVuc2VUaWNrZXRMaW5lc0xpc3RQcm9wcyA9IHtcbiAgdmlzaWJsZUxpbmVzOiBFeHBlbnNlVGlja2V0RGV0YWlsTGluZVtdO1xuICB0b3RhbExpbmVQYWdlczogbnVtYmVyO1xuICBsaW5lUGFnZTogbnVtYmVyO1xuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgcGFnaW5hdGlvbkxhYmVsczogUGFnaW5hdGlvbkxhYmVscztcbiAgY29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcbiAgb25MaW5lUGFnZUNoYW5nZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcbiAgb25PcGVuTGluZTogKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxuY29uc3QgZm9ybWF0UXR5VmFsdWUgPSAodmFsdWU6IG51bWJlciB8IG51bGwpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gZm9ybWF0RXhwZW5zZU51bWJlcih2YWx1ZSwge1xuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgZmFsbGJhY2s6IFwiLVwiLFxuICB9KTtcbn07XG5cbmNvbnN0IEVNUFRZX0RBVEVfUEFSVFM6IEV4cGVuc2VEYXRlUGFydHMgPSB7XG4gIHllYXI6IFwiLS1cIixcbiAgbW9udGg6IFwiLS1cIixcbiAgZGF5OiBcIi0tXCIsXG59O1xuXG5jb25zdCBUSUNLRVRfTElORV9EQVRFX1BBTkVMX0lDT04gPSAoXG4gIDxzdmdcbiAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICBmaWxsPVwibm9uZVwiXG4gICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcbiAgICBzdHJva2VXaWR0aD1cIjFcIlxuICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXG4gICAgY2xhc3NOYW1lPVwiaC0xMCB3LTEwIHRleHQtc2xhdGUtNTAwXCJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICA+XG4gICAgPHBhdGggc3Ryb2tlPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIiAvPlxuICAgIDxwYXRoIGQ9XCJNMTQgM3Y0YTEgMSAwIDAgMCAxIDFoNFwiIC8+XG4gICAgPHBhdGggZD1cIk0xNyAyMWgtMTBhMiAyIDAgMCAxIC0yIC0ydi0xNGEyIDIgMCAwIDEgMiAtMmg3bDUgNXYxMWEyIDIgMCAwIDEgLTIgMlwiIC8+XG4gICAgPHBhdGggZD1cIk05IDdsMSAwXCIgLz5cbiAgICA8cGF0aCBkPVwiTTkgMTNsNiAwXCIgLz5cbiAgICA8cGF0aCBkPVwiTTEzIDE3bDIgMFwiIC8+XG4gIDwvc3ZnPlxuKTtcblxuLy8gVGlja2V0IGxpbmVzIHNlY3Rpb24gcmVuZGVyZWQgd2l0aCB0aW1lbGluZSBjYXJkcyBhbmQgcGFnaW5nIGNvbnRyb2xzLlxuY29uc3QgRXhwZW5zZVRpY2tldExpbmVzTGlzdCA9ICh7XG4gIHZpc2libGVMaW5lcyxcbiAgdG90YWxMaW5lUGFnZXMsXG4gIGxpbmVQYWdlLFxuICBjdXJyZW5jeUNvZGUsXG4gIHBhZ2luYXRpb25MYWJlbHMsXG4gIGNvbnRhaW5lclJlZixcbiAgb25MaW5lUGFnZUNoYW5nZSxcbiAgb25PcGVuTGluZSxcbn06IEV4cGVuc2VUaWNrZXRMaW5lc0xpc3RQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNwYWNlLXktMFwiPlxuICAgICAgPEV4cGVuc2VTZWN0aW9uRGl2aWRlciBsYWJlbD17aW5kVChcIlRpY2tldHNfRGV0YWlsX0xpbmVzXCIsIFwiTGluZXNcIil9IGNsYXNzTmFtZT1cImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyLS1zcGFjZWRcIiAvPlxuXG4gICAgICB7dmlzaWJsZUxpbmVzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2luZFQoXCJUaWNrZXRzX0RldGFpbF9Ob0xpbmVzXCIsIFwiTm8gbGluZXMgZm9yIHRoaXMgdGlja2V0LlwiKX0gLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxkaXYgcmVmPXtjb250YWluZXJSZWZ9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveFwiPlxuICAgICAgICAgIHt2aXNpYmxlTGluZXMubWFwKChsaW5lLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYW1vdW50VGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShsaW5lLnRvdGFsQW1vdW50LCBjdXJyZW5jeUNvZGUpO1xuICAgICAgICAgICAgY29uc3QgcXR5VGV4dCA9IGZvcm1hdFF0eVZhbHVlKGxpbmUucXR5KTtcbiAgICAgICAgICAgIGNvbnN0IHByaWNlVGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShsaW5lLnByaWNlLCBjdXJyZW5jeUNvZGUpO1xuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBsaW5lLmRlc2NyaXB0aW9uIHx8IGxpbmUucmVjSWQgfHwgXCItXCI7XG4gICAgICAgICAgICBjb25zdCBzdWJ0aXRsZSA9IGAke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfTogJHtxdHlUZXh0fSAgICR7aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJpY2VcIiwgXCJQcmljZVwiKX06ICR7cHJpY2VUZXh0fWA7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtgJHtsaW5lLnJlY0lkfS0ke2luZGV4fWB9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtFTVBUWV9EQVRFX1BBUlRTfVxuICAgICAgICAgICAgICAgICAgZGF0ZVBhbmVsQ29udGVudD17VElDS0VUX0xJTkVfREFURV9QQU5FTF9JQ09OfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgICAgICAgICAgc3VidGl0bGU9e3N1YnRpdGxlfVxuICAgICAgICAgICAgICAgICAgc3VidGl0bGVDbGFzc05hbWU9XCJleHBlbnNlLXNoZWV0LWNhcmRfX3N1YnRpdGxlIGV4cGVuc2UtbGluZS1jYXJkX19tZXRhXCJcbiAgICAgICAgICAgICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XG4gICAgICAgICAgICAgICAgICBvbk9wZW49eygpID0+IG9uT3BlbkxpbmUobGluZS5yZWNJZCl9XG4gICAgICAgICAgICAgICAgICB0aXRsZUNsYXNzTmFtZT1cInRpbWVsaW5lLW5hbWUgZXhwZW5zZS1saW5lLWNhcmRfX3RpdGxlXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXG4gICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsTGluZVBhZ2VzfVxuICAgICAgICBjdXJyZW50UGFnZT17bGluZVBhZ2V9XG4gICAgICAgIG9uUGFnZUNoYW5nZT17b25MaW5lUGFnZUNoYW5nZX1cbiAgICAgICAgbGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgLz5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0TGluZXNMaXN0O1xyXG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFRpY2tldFByZXZpZXdQb2ludCB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcudHNcIjtcblxudHlwZSBFeHBlbnNlVGlja2V0UHJldmlld01vZGFsUHJvcHMgPSB7XG4gIG9wZW46IGJvb2xlYW47XG4gIGJ1c3k6IGJvb2xlYW47XG4gIGVycm9yOiBzdHJpbmc7XG4gIGltYWdlVXJsOiBzdHJpbmc7XG4gIGltYWdlQWx0OiBzdHJpbmc7XG4gIHNjYWxlOiBudW1iZXI7XG4gIHRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50O1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xuICBvblBvaW50ZXJEb3duOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XG4gIG9uUG9pbnRlck1vdmU6IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcbiAgb25Qb2ludGVyRW5kOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XG4gIG9uV2hlZWw6IChldmVudDogUmVhY3QuV2hlZWxFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XG59O1xuXG4vLyBSZW5kZXJzIHRoZSB0aWNrZXQgaW1hZ2UgcHJldmlldyBvdmVybGF5IHdpdGggem9vbSBhbmQgcGFuIGdlc3R1cmVzLlxuY29uc3QgRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbCA9ICh7XG4gIG9wZW4sXG4gIGJ1c3ksXG4gIGVycm9yLFxuICBpbWFnZVVybCxcbiAgaW1hZ2VBbHQsXG4gIHNjYWxlLFxuICB0cmFuc2xhdGUsXG4gIG9uQ2xvc2UsXG4gIG9uUG9pbnRlckRvd24sXG4gIG9uUG9pbnRlck1vdmUsXG4gIG9uUG9pbnRlckVuZCxcbiAgb25XaGVlbCxcbn06IEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWxQcm9wcykgPT4ge1xuICBpZiAoIW9wZW4pIHJldHVybiBudWxsO1xuXG4gIHJldHVybiBjcmVhdGVQb3J0YWwoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTk1MC80NSBiYWNrZHJvcC1ibHVyLW1kIHB4LTQgcHktNlwiIG9uQ2xpY2s9e29uQ2xvc2V9PlxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9DbG9zZVwiLCBcIkNsb3NlXCIpfVxuICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSByaWdodC00IHRvcC00IGlubGluZS1mbGV4IGgtMTAgdy0xMCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwLzYwIGJnLXNsYXRlLTkwMC81NSB0ZXh0LXNsYXRlLTEwMCB0cmFuc2l0aW9uIGhvdmVyOmJnLXNsYXRlLTkwMC83MCBmb2N1cy12aXNpYmxlOm91dGxpbmUtaGlkZGVuIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy1zbGF0ZS0yMDAvODBcIlxuICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICBkPVwiTTYgNkwxOCAxOE0xOCA2TDYgMThcIlxuICAgICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMS43NVwiXG4gICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICA8L2J1dHRvbj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtaC1bOTJ2aF0gbWF4LXctWzkydnddIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIgb25DbGljaz17KGV2ZW50KSA9PiBldmVudC5zdG9wUHJvcGFnYXRpb24oKX0+XG4gICAgICAgIHtidXN5ID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTEwMFwiPlxuICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cbiAgICAgICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogZXJyb3IgPyAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXJvc2UtMjAwXCI+e2Vycm9yfTwvcD5cbiAgICAgICAgKSA6IGltYWdlVXJsID8gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIG1heC1oLVs5MHZoXSBtYXgtdy1bOTJ2d10gb3ZlcmZsb3ctaGlkZGVuIHJvdW5kZWQtbGcgdG91Y2gtbm9uZVwiXG4gICAgICAgICAgICBvblBvaW50ZXJEb3duPXtvblBvaW50ZXJEb3dufVxuICAgICAgICAgICAgb25Qb2ludGVyTW92ZT17b25Qb2ludGVyTW92ZX1cbiAgICAgICAgICAgIG9uUG9pbnRlclVwPXtvblBvaW50ZXJFbmR9XG4gICAgICAgICAgICBvblBvaW50ZXJDYW5jZWw9e29uUG9pbnRlckVuZH1cbiAgICAgICAgICAgIG9uV2hlZWw9e29uV2hlZWx9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9e2ltYWdlVXJsfVxuICAgICAgICAgICAgICBhbHQ9e2ltYWdlQWx0IHx8IGluZFQoXCJUaWNrZXRzX0ZpZWxkX0ZpbGVJZFwiLCBcIlRpY2tldFwiKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtbm9uZSBtYXgtaC1bOTB2aF0gdy1hdXRvIG1heC13LVs5MnZ3XSBzZWxlY3Qtbm9uZSByb3VuZGVkLWxnIG9iamVjdC1jb250YWluIHNoYWRvdy0yeGxcIlxuICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7dHJhbnNsYXRlLnh9cHgsICR7dHJhbnNsYXRlLnl9cHgsIDApIHNjYWxlKCR7c2NhbGV9KWAsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiBcImNlbnRlciBjZW50ZXJcIixcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBzY2FsZSA8PSAxID8gXCJ0cmFuc2Zvcm0gMTQwbXMgZWFzZS1vdXRcIiA6IFwibm9uZVwiLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBkcmFnZ2FibGU9e2ZhbHNlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtMTAwXCI+e2luZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpfTwvcD5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PixcbiAgICBkb2N1bWVudC5ib2R5XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0UHJldmlld01vZGFsO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBSZWZPYmplY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybS50c3hcIjtcbmltcG9ydCBFeHBlbnNlVGlja2V0TGluZXNMaXN0IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXRMaW5lc0xpc3QudHN4XCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIsIEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XG5pbXBvcnQgRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbCBmcm9tIFwiLi9FeHBlbnNlVGlja2V0UHJldmlld01vZGFsLnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBUaWNrZXRQcmV2aWV3UG9pbnQgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzXCI7XG5cbnR5cGUgUGFnaW5hdGlvbkxhYmVscyA9IHtcbiAgZmlyc3Q6IHN0cmluZztcbiAgcHJldjogc3RyaW5nO1xuICBuZXh0OiBzdHJpbmc7XG4gIGxhc3Q6IHN0cmluZztcbn07XG5cbnR5cGUgRXhwZW5zZVRpY2tldERldGFpbFZpZXdQcm9wcyA9IHtcbiAgbW9kYWw6IHtcbiAgICBvcGVuOiBib29sZWFuO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGNvbmZpcm1UZXh0OiBzdHJpbmc7XG4gICAgY2FuY2VsVGV4dDogc3RyaW5nO1xuICAgIGxvYWRpbmdUZXh0OiBzdHJpbmc7XG4gICAgc2hvd0NhbmNlbDogYm9vbGVhbjtcbiAgICBzaG93Q29uZmlybTogYm9vbGVhbjtcbiAgICBidXN5OiBib29sZWFuO1xuICAgIGVycm9yOiBzdHJpbmc7XG4gICAgc3RhdHVzOiBzdHJpbmc7XG4gICAgb25Db25maXJtOiAoKSA9PiB2b2lkO1xuICAgIG9uQ2FuY2VsOiAoKSA9PiB2b2lkO1xuICB9O1xuICBwcmV2aWV3OiB7XG4gICAgb3BlbjogYm9vbGVhbjtcbiAgICBidXN5OiBib29sZWFuO1xuICAgIGVycm9yOiBzdHJpbmc7XG4gICAgaW1hZ2VVcmw6IHN0cmluZztcbiAgICBpbWFnZUFsdDogc3RyaW5nO1xuICAgIHNjYWxlOiBudW1iZXI7XG4gICAgdHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQ7XG4gICAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgICBvblBvaW50ZXJEb3duOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XG4gICAgb25Qb2ludGVyTW92ZTogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xuICAgIG9uUG9pbnRlckVuZDogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xuICAgIG9uV2hlZWw6IChldmVudDogUmVhY3QuV2hlZWxFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XG4gIH07XG4gIGNvbnRlbnQ6IHtcbiAgICBpc0xvYWRpbmc6IGJvb2xlYW47XG4gICAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG4gICAgaGVhZGVyOiBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbDtcbiAgICBzdGF0dXNMYWJlbDogc3RyaW5nO1xuICAgIGdhc3RvVHlwZUxhYmVsOiBzdHJpbmc7XG4gICAgdG90YWxBbW91bnRUZXh0OiBzdHJpbmc7XG4gICAgdHJhbnNEYXRlVGV4dDogc3RyaW5nO1xuICAgIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgICBnYXN0b1R5cGVPcHRpb25zOiBBcnJheTx7IHZhbHVlOiBzdHJpbmc7IHRleHQ6IHN0cmluZyB9PjtcbiAgICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcbiAgICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICAgIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XG4gICAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XG4gICAgZHJhZnRGaWxlTmFtZTogc3RyaW5nO1xuICAgIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgb25PcGVuRmlsZTogKCkgPT4gdm9pZDtcbiAgICBvbk9wZW5FeHBlbnNlU2hlZXQ/OiAoKSA9PiB2b2lkO1xuICAgIHZpc2libGVMaW5lczogRXhwZW5zZVRpY2tldERldGFpbExpbmVbXTtcbiAgICB0b3RhbExpbmVQYWdlczogbnVtYmVyO1xuICAgIGxpbmVQYWdlOiBudW1iZXI7XG4gICAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gICAgcGFnaW5hdGlvbkxhYmVsczogUGFnaW5hdGlvbkxhYmVscztcbiAgICBjb250YWluZXJSZWY6IFJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xuICAgIG9uTGluZVBhZ2VDaGFuZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XG4gICAgb25PcGVuTGluZTogKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB2b2lkO1xuICAgIHN0YXR1czogc3RyaW5nO1xuICB9O1xufTtcblxuLy8gUmVuZGVycyB0aGUgdGlja2V0IGRldGFpbCB2aWV3IHdoaWxlIHRoZSBwYWdlIGNvbnRhaW5lciBvd25zIG9yY2hlc3RyYXRpb24uXG5jb25zdCBFeHBlbnNlVGlja2V0RGV0YWlsVmlldyA9ICh7IG1vZGFsLCBwcmV2aWV3LCBjb250ZW50IH06IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3UHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgPENvbmZpcm1Nb2RhbFxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XG4gICAgICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbC5jb25maXJtVGV4dH1cbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWwuY2FuY2VsVGV4dH1cbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsLmxvYWRpbmdUZXh0fVxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XG4gICAgICAgIGJ1c3k9e21vZGFsLmJ1c3l9XG4gICAgICAgIGVycm9yPXttb2RhbC5lcnJvcn1cbiAgICAgICAgc3RhdHVzPXttb2RhbC5zdGF0dXN9XG4gICAgICAgIG9uQ29uZmlybT17bW9kYWwub25Db25maXJtfVxuICAgICAgICBvbkNhbmNlbD17bW9kYWwub25DYW5jZWx9XG4gICAgICAvPlxuICAgICAgPEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWxcbiAgICAgICAgb3Blbj17cHJldmlldy5vcGVufVxuICAgICAgICBidXN5PXtwcmV2aWV3LmJ1c3l9XG4gICAgICAgIGVycm9yPXtwcmV2aWV3LmVycm9yfVxuICAgICAgICBpbWFnZVVybD17cHJldmlldy5pbWFnZVVybH1cbiAgICAgICAgaW1hZ2VBbHQ9e3ByZXZpZXcuaW1hZ2VBbHR9XG4gICAgICAgIHNjYWxlPXtwcmV2aWV3LnNjYWxlfVxuICAgICAgICB0cmFuc2xhdGU9e3ByZXZpZXcudHJhbnNsYXRlfVxuICAgICAgICBvbkNsb3NlPXtwcmV2aWV3Lm9uQ2xvc2V9XG4gICAgICAgIG9uUG9pbnRlckRvd249e3ByZXZpZXcub25Qb2ludGVyRG93bn1cbiAgICAgICAgb25Qb2ludGVyTW92ZT17cHJldmlldy5vblBvaW50ZXJNb3ZlfVxuICAgICAgICBvblBvaW50ZXJFbmQ9e3ByZXZpZXcub25Qb2ludGVyRW5kfVxuICAgICAgICBvbldoZWVsPXtwcmV2aWV3Lm9uV2hlZWx9XG4gICAgICAvPlxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGNvbnRlbnQuaXNMb2FkaW5nID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxuICAgICAgPlxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XG4gICAgICA8L2Rpdj5cblxuICAgICAge2NvbnRlbnQuZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntjb250ZW50LmVycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxuXG4gICAgICB7IWNvbnRlbnQuaXNMb2FkaW5nICYmICFjb250ZW50LmVycm9yTWVzc2FnZSAmJiBjb250ZW50LmhlYWRlciA/IChcbiAgICAgICAgPD5cbiAgICAgICAgICA8RXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm1cbiAgICAgICAgICAgIGhlYWRlcj17Y29udGVudC5oZWFkZXJ9XG4gICAgICAgICAgICBzdGF0dXNMYWJlbD17Y29udGVudC5zdGF0dXNMYWJlbH1cbiAgICAgICAgICAgIGdhc3RvVHlwZUxhYmVsPXtjb250ZW50Lmdhc3RvVHlwZUxhYmVsfVxuICAgICAgICAgICAgdG90YWxBbW91bnRUZXh0PXtjb250ZW50LnRvdGFsQW1vdW50VGV4dH1cbiAgICAgICAgICAgIHRyYW5zRGF0ZVRleHQ9e2NvbnRlbnQudHJhbnNEYXRlVGV4dH1cbiAgICAgICAgICAgIGlzRWRpdGluZz17Y29udGVudC5pc0VkaXRpbmd9XG4gICAgICAgICAgICBnYXN0b1R5cGVPcHRpb25zPXtjb250ZW50Lmdhc3RvVHlwZU9wdGlvbnN9XG4gICAgICAgICAgICBkcmFmdERlc2NyaXB0aW9uPXtjb250ZW50LmRyYWZ0RGVzY3JpcHRpb259XG4gICAgICAgICAgICBkcmFmdEdhc3RvVHlwZT17Y29udGVudC5kcmFmdEdhc3RvVHlwZX1cbiAgICAgICAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlPXtjb250ZW50LmRyYWZ0Q3VycmVuY3lDb2RlfVxuICAgICAgICAgICAgZHJhZnRUcmFuc0RhdGU9e2NvbnRlbnQuZHJhZnRUcmFuc0RhdGV9XG4gICAgICAgICAgICBkcmFmdFVybEZpbGU9e2NvbnRlbnQuZHJhZnRVcmxGaWxlfVxuICAgICAgICAgICAgZHJhZnRGaWxlTmFtZT17Y29udGVudC5kcmFmdEZpbGVOYW1lfVxuICAgICAgICAgICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlPXtjb250ZW50Lm9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZX1cbiAgICAgICAgICAgIG9uRHJhZnRHYXN0b1R5cGVDaGFuZ2U9e2NvbnRlbnQub25EcmFmdEdhc3RvVHlwZUNoYW5nZX1cbiAgICAgICAgICAgIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U9e2NvbnRlbnQub25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cbiAgICAgICAgICAgIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2U9e2NvbnRlbnQub25EcmFmdFRyYW5zRGF0ZUNoYW5nZX1cbiAgICAgICAgICAgIG9uT3BlbkZpbGU9e2NvbnRlbnQub25PcGVuRmlsZX1cbiAgICAgICAgICAgIG9uT3BlbkV4cGVuc2VTaGVldD17Y29udGVudC5vbk9wZW5FeHBlbnNlU2hlZXR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8RXhwZW5zZVRpY2tldExpbmVzTGlzdFxuICAgICAgICAgICAgdmlzaWJsZUxpbmVzPXtjb250ZW50LnZpc2libGVMaW5lc31cbiAgICAgICAgICAgIHRvdGFsTGluZVBhZ2VzPXtjb250ZW50LnRvdGFsTGluZVBhZ2VzfVxuICAgICAgICAgICAgbGluZVBhZ2U9e2NvbnRlbnQubGluZVBhZ2V9XG4gICAgICAgICAgICBjdXJyZW5jeUNvZGU9e2NvbnRlbnQuY3VycmVuY3lDb2RlfVxuICAgICAgICAgICAgcGFnaW5hdGlvbkxhYmVscz17Y29udGVudC5wYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgICAgICAgY29udGFpbmVyUmVmPXtjb250ZW50LmNvbnRhaW5lclJlZn1cbiAgICAgICAgICAgIG9uTGluZVBhZ2VDaGFuZ2U9e2NvbnRlbnQub25MaW5lUGFnZUNoYW5nZX1cbiAgICAgICAgICAgIG9uT3BlbkxpbmU9e2NvbnRlbnQub25PcGVuTGluZX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPntjb250ZW50LnN0YXR1c308L2Rpdj5cbiAgICAgICAgPC8+XG4gICAgICApIDogbnVsbH1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXREZXRhaWxWaWV3O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQStEOzs7QUNBL0QsbUJBQWlEO0FBZTFDLElBQU0sOEJBQThCLENBQUMsRUFBRSxXQUFXLFFBQVEsWUFBWSxNQUF1QztBQUNsSCxRQUFNLENBQUMsUUFBUSxTQUFTLFFBQUksdUJBQTJDLElBQUk7QUFDM0UsUUFBTSxDQUFDLE9BQU8sUUFBUSxRQUFJLHVCQUFvQyxDQUFDLENBQUM7QUFDaEUsUUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHVCQUFTLEtBQUs7QUFDaEQsUUFBTSxDQUFDLGNBQWMsZUFBZSxRQUFJLHVCQUFTLEVBQUU7QUFFbkQsUUFBTSxtQkFBZSwwQkFBWSxZQUFZO0FBQzNDLFFBQUksQ0FBQyxXQUFXO0FBQ2Qsa0JBQVk7QUFDWjtBQUFBLElBQ0Y7QUFFQSxVQUFNLGFBQWEsU0FBUyxNQUFNO0FBQ2xDLFFBQUksQ0FBQyxZQUFZO0FBQ2Ysc0JBQWdCLEtBQUssMkJBQTJCLHVCQUF1QixDQUFDO0FBQ3hFLGdCQUFVLElBQUk7QUFDZCxlQUFTLENBQUMsQ0FBQztBQUNYO0FBQUEsSUFDRjtBQUVBLGlCQUFhLElBQUk7QUFDakIsb0JBQWdCLEVBQUU7QUFFbEIsUUFBSTtBQUNGLFlBQU0sV0FBVyxNQUFNLHdCQUF3QixZQUFZO0FBQUEsUUFDekQseUJBQXlCO0FBQUEsTUFDM0IsQ0FBQztB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U0FBUztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsVUFBVTtBQUFBLFFBQ1YsVUFBVTtBQUFBLFFBQ1YsT0FBTztBQUFBLFFBQ1AsV0FBVztBQUFBLFFBQ1gsU0FBUztBQUFBLFFBQ1QsZUFBZTtBQUFBLFFBQ2YsZUFBZTtBQUFBLFFBQ2YsY0FBYztBQUFBLFFBQ2QsU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLDBCQUEwQjtBQUFBLFFBQzFCLHdCQUF3QjtBQUFBLFFBQ3hCLDJCQUEyQjtBQUFBLFFBQzNCLHdCQUF3QjtBQUFBLFFBQ3hCLFlBQVk7QUFBQSxRQUNaLG9CQUFvQixrQkFBa0IsU0FBWTtBQUFBLFFBQ2xEO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLGNBQWMsWUFBWSxvQkFBb0IsU0FBUyxRQUFRLFlBQVk7QUFBQSxRQUMzRTtBQUFBLFFBQ0EsY0FBYztBQUFBLFFBQ2Qsa0JBQWtCO0FBQUEsUUFDbEIsWUFBWTtBQUFBLFFBQ1o7QUFBQSxNQUNGO0FBQUE7QUFBQSxFQUNGO0FBRUo7QUFHQSxJQUFNLDBCQUEwQixNQUFNO0FBQ3BDLFNBQ0UsNkNBQUMsZ0NBQXFCLHlCQUF1QixNQUMzQyx1REFBQyxrQ0FBK0IsR0FDbEM7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLDRCQUE0QjtBQUNuRSxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLDJCQUF3QixDQUFFO0FBQ3REO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxrQ0FBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAibmV4dFRyYW5zbGF0ZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
