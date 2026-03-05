import {
  SingleDatePicker
} from "./chunks/chunk-AS4EE5L2.js";
import {
  getExpenseTicketStatusLabel
} from "./chunks/chunk-HVFEEP5R.js";
import {
  mapWindowEnumOptions
} from "./chunks/chunk-BVPBMOU4.js";
import {
  mapExpenseTicketDetailHeader,
  mapExpenseTicketDetailLine
} from "./chunks/chunk-4G55A37A.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-ZQIQJJOC.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-GIUUNBHM.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-GQ2I6PU5.js";
import "./chunks/chunk-6YXFJB4W.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-XNARBSRN.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-XXAOM63C.js";
import "./chunks/chunk-K7MECJ5E.js";
import {
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  configureExpenseApiAuth,
  deleteExpenseSheetLine,
  deleteExpenseSheetTicket,
  deleteExpenseSheetTicketFile,
  fetchExpenseSheetTicket,
  fetchExpenseSheetTicketPreviewBlob,
  formatAmountWithCurrency,
  formatExpenseDisplayDate,
  formatExpenseNumber,
  navigateToExpenseUrl,
  parseExpenseDate,
  safeText,
  toExpenseApiDdMmYyyy,
  toIsoDate,
  updateExpenseSheetTicket
} from "./chunks/chunk-GGS3XUX2.js";
import {
  VisitasPageProviders_default
} from "./chunks/chunk-EVHUYAZN.js";
import {
  ApiFetchError,
  canAccess,
  indT,
  showPermissionModal
} from "./chunks/chunk-PU3BESI6.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunks/chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/gastos/tickets/detail/ExpenseTicketDetailPage.tsx
var import_react4 = __toESM(require_react());

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
var useExpenseTicketImagePreview = ({ sourceUrl }) => {
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
    const currentUrl = safeText(sourceUrl);
    if (!currentUrl) return;
    resetPreviewGesture();
    setPreviewOpen(true);
    setPreviewBusy(true);
    setPreviewError("");
    try {
      const blob = await fetchExpenseSheetTicketPreviewBlob(currentUrl, {
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
  }, [resetPreviewGesture, sourceUrl]);
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
var toInputDate = (raw) => {
  const parsed = parseExpenseDate(raw);
  return parsed ? toIsoDate(parsed) : "";
};
var ExpenseTicketDetailPageContent = () => {
  const hasAccess = canAccess("GASTOS_TICKETS", "View");
  const canEditTicket = canAccess("GASTOS_TICKETS", "Edit");
  const canDeleteTicket = canAccess("GASTOS_TICKETS", "FullAccess");
  const fileId = safeText(window.__EXPENSE_TICKET_FILE_ID__);
  const lineContainerRef = (0, import_react4.useRef)(null);
  const routeParams = (0, import_react4.useMemo)(() => new URLSearchParams(window.location.search), []);
  const autoEditMode = (0, import_react4.useMemo)(() => {
    const mode = routeParams.get("mode");
    return safeText(mode).toLowerCase() === "edit";
  }, [routeParams]);
  const detailOrigin = (0, import_react4.useMemo)(() => safeText(routeParams.get("origin")).toLowerCase(), [routeParams]);
  const contextSheetId = (0, import_react4.useMemo)(() => safeText(routeParams.get("sheetId")), [routeParams]);
  const contextLineRecId = (0, import_react4.useMemo)(() => safeText(routeParams.get("lineRecId")), [routeParams]);
  const isFromExpenseSheetCreate = detailOrigin === "sheet-create";
  const isFromExpenseLine = detailOrigin === "expense-line" && !!contextSheetId && !!contextLineRecId;
  const allowAssignedDraftEdit = isFromExpenseSheetCreate;
  const autoEditAttemptedRef = (0, import_react4.useRef)(false);
  const [busy, setBusy] = (0, import_react4.useState)(false);
  const [status, setStatus] = (0, import_react4.useState)("");
  const [isEditing, setIsEditing] = (0, import_react4.useState)(false);
  const [modalError, setModalError] = (0, import_react4.useState)("");
  const [linePage, setLinePage] = (0, import_react4.useState)(1);
  const [draftDescription, setDraftDescription] = (0, import_react4.useState)("");
  const [draftGastoType, setDraftGastoType] = (0, import_react4.useState)("");
  const [draftCurrencyCode, setDraftCurrencyCode] = (0, import_react4.useState)("");
  const [draftTransDate, setDraftTransDate] = (0, import_react4.useState)("");
  const [draftComentario, setDraftComentario] = (0, import_react4.useState)("");
  const [draftUrlFile, setDraftUrlFile] = (0, import_react4.useState)("");
  const [draftFileName, setDraftFileName] = (0, import_react4.useState)("");
  const paginationLabels = (0, import_react4.useMemo)(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last")
    }),
    []
  );
  const gastoTypeOptions = (0, import_react4.useMemo)(() => {
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
  const gastoTypeLabelMap = (0, import_react4.useMemo)(() => {
    const map = /* @__PURE__ */ new Map();
    for (const option of gastoTypeOptions) {
      map.set(String(option.value), option.text);
    }
    return map;
  }, [gastoTypeOptions]);
  const { modal, openConfirm, closeConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "OK"),
    defaultCancelText: indT("Confirm_No", "Cancel")
  });
  const { header, lines, isLoading, errorMessage, reloadDetail } = useExpenseTicketDetailState({
    hasAccess,
    fileId,
    onForbidden: showPermissionModal
  });
  const previewSourceUrl = (0, import_react4.useMemo)(() => safeText(isEditing ? draftUrlFile : header?.urlFile), [draftUrlFile, header?.urlFile, isEditing]);
  const previewAltText = (0, import_react4.useMemo)(
    () => safeText(isEditing ? draftFileName : header?.fileName) || indT("Tickets_Field_FileId", "Ticket"),
    [draftFileName, header?.fileName, isEditing]
  );
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
  } = useExpenseTicketImagePreview({ sourceUrl: previewSourceUrl });
  (0, import_react4.useEffect)(() => {
    if (isEditing || !header) return;
    setDraftDescription(safeText(header.description));
    setDraftGastoType(header.gastoType === null ? "" : String(header.gastoType));
    setDraftCurrencyCode(safeText(header.currencyCode).toUpperCase());
    setDraftTransDate(toInputDate(header.transDate));
    setDraftComentario(safeText(header.comentario));
    setDraftUrlFile(safeText(header.urlFile));
    setDraftFileName(safeText(header.fileName));
  }, [header, isEditing]);
  (0, import_react4.useEffect)(() => {
    const maxPage = Math.max(1, Math.ceil(lines.length / LINES_PAGE_SIZE));
    if (linePage > maxPage) {
      setLinePage(maxPage);
    }
  }, [linePage, lines.length]);
  const visibleLines = (0, import_react4.useMemo)(() => pagedSlice(lines, linePage, LINES_PAGE_SIZE), [linePage, lines]);
  const totalLinePages = Math.ceil((lines.length || 0) / LINES_PAGE_SIZE);
  const handleEnableEdit = (0, import_react4.useCallback)(() => {
    if (!header || isLoading) return;
    if (header.status === 1 && !allowAssignedDraftEdit) return;
    if (!canEditTicket) {
      showPermissionModal();
      return;
    }
    setModalError("");
    setIsEditing(true);
    setStatus(indT("ExpenseSheets_Detail_EditingEnabled", "Editing enabled"));
  }, [allowAssignedDraftEdit, canEditTicket, header, isLoading]);
  (0, import_react4.useEffect)(() => {
    if (!autoEditMode || isFromExpenseLine || autoEditAttemptedRef.current) return;
    if (isLoading || !header) return;
    autoEditAttemptedRef.current = true;
    handleEnableEdit();
  }, [autoEditMode, handleEnableEdit, header, isFromExpenseLine, isLoading]);
  const handleCancelEdit = (0, import_react4.useCallback)(() => {
    if (!isEditing) return;
    if (!header) {
      setIsEditing(false);
      return;
    }
    setIsEditing(false);
    setModalError("");
    setDraftDescription(safeText(header.description));
    setDraftGastoType(header.gastoType === null ? "" : String(header.gastoType));
    setDraftCurrencyCode(safeText(header.currencyCode).toUpperCase());
    setDraftTransDate(toInputDate(header.transDate));
    setDraftComentario(safeText(header.comentario));
    setDraftUrlFile(safeText(header.urlFile));
    setDraftFileName(safeText(header.fileName));
    setStatus(indT("Common_Cancel", "Cancel"));
  }, [header, isEditing]);
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
  const handleModalConfirm = (0, import_react4.useCallback)(async () => {
    setModalError("");
    await handleConfirm({
      busy,
      onError: (msg) => {
        setModalError(msg);
        setStatus(msg);
      }
    });
  }, [busy, handleConfirm]);
  const modalLoadingText = indT("Common_Loading", "Loading");
  const modalCancelText = modal.cancelText || indT("Confirm_No", "Cancel");
  const modalConfirmText = busy ? modalLoadingText : !busy && modalError ? indT("Common_OK", "OK") : modal.confirmText || indT("Confirm_Yes", "OK");
  const handleModalButtonConfirm = (0, import_react4.useCallback)(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }
    void handleModalConfirm();
  }, [busy, closeConfirm, handleModalConfirm, modalError]);
  const isAssignedTicket = header?.status === 1;
  const isContextLocked = isAssignedTicket && !allowAssignedDraftEdit;
  const canEditTicketInContext = canEditTicket && !isFromExpenseLine;
  const canDeleteTicketInContext = canDeleteTicket && !isFromExpenseLine;
  const ticketTopbarActionMode = isFromExpenseLine ? "view_only" : "default";
  useExpenseTicketDetailTopbarActions({
    busy,
    modalOpen: modal.open,
    isEditing,
    isLocked: isContextLocked,
    actionMode: ticketTopbarActionMode,
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
    onDeleteSuccess: isFromExpenseLine ? () => {
      navigateToExpenseUrl(`/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(contextSheetId)}`);
    } : void 0,
    openConfirm,
    closeConfirm
  });
  const openLineDetail = (0, import_react4.useCallback)(
    (rawLineRecId) => {
      if (isFromExpenseLine) return;
      const lineRecId = safeText(rawLineRecId);
      if (!lineRecId) return;
      if (!fileId) return;
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
      const targetUrl = `/Gastos/TicketLineDetail?${query.toString()}`;
      navigateToExpenseUrl(targetUrl, {
        askConfirmation: true,
        bypassGuardOnce: false
      });
    },
    [contextSheetId, fileId, isFromExpenseLine, isFromExpenseSheetCreate]
  );
  const resolveClickableCard = (0, import_react4.useCallback)((target) => {
    const node = target;
    if (!node || typeof node.closest !== "function") return null;
    const card = node.closest(".timeline-card--clickable");
    if (!card) return null;
    if (!lineContainerRef.current?.contains(card)) return null;
    return card;
  }, []);
  useTimelineCardEffects({
    containerRef: lineContainerRef,
    errorMessage,
    items: visibleLines,
    resolveClickableCard
  });
  const openFile = (0, import_react4.useCallback)(() => {
    void openPreview();
  }, [openPreview]);
  const handleOpenExpenseSheet = (0, import_react4.useCallback)(() => {
    const safeSheetId = safeText(header?.hojaGastosIdDisplay);
    if (!safeSheetId) return;
    navigateToExpenseUrl(`/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(safeSheetId)}`, {
      askConfirmation: isEditing
    });
  }, [header?.hojaGastosIdDisplay, isEditing]);
  const statusLabel = (0, import_react4.useMemo)(() => getExpenseTicketStatusLabel(header?.status), [header?.status]);
  const gastoTypeLabel = (0, import_react4.useMemo)(() => {
    const currentGastoType = isEditing ? draftGastoType : header?.gastoType === null ? "" : String(header?.gastoType ?? "");
    if (!currentGastoType) {
      return indT("Common_NotAvailable", "N/A");
    }
    return gastoTypeLabelMap.get(String(currentGastoType)) || String(currentGastoType);
  }, [draftGastoType, gastoTypeLabelMap, header?.gastoType, isEditing]);
  const totalAmountText = (0, import_react4.useMemo)(
    () => formatAmountWithCurrency(header?.totalAmount ?? null, (isEditing ? draftCurrencyCode : header?.currencyCode) || header?.currencyCode),
    [draftCurrencyCode, header?.currencyCode, header?.totalAmount, isEditing]
  );
  const transDateText = (0, import_react4.useMemo)(
    () => formatExpenseDisplayDate(isEditing ? draftTransDate : header?.transDate, document?.documentElement?.lang || "es-ES"),
    [draftTransDate, header?.transDate, isEditing]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      ConfirmModal,
      {
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
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      ExpenseTicketPreviewModal_default,
      {
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
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "div",
      {
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: isLoading ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-danger", children: errorMessage }) : null,
    !isLoading && !errorMessage && header ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ExpenseTicketDetailHeaderForm_default,
        {
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
          onOpenExpenseSheet: handleOpenExpenseSheet
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ExpenseTicketLinesList_default,
        {
          visibleLines,
          totalLinePages,
          linePage,
          currencyCode: isEditing ? draftCurrencyCode : safeText(header.currencyCode),
          paginationLabels,
          containerRef: lineContainerRef,
          onLinePageChange: setLinePage,
          onOpenLine: openLineDetail
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-sm text-slate-600", children: status })
    ] }) : null
  ] });
};
var ExpenseTicketDetailPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(VisitasPageProviders_default, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExpenseTicketDetailPageContent, {}) });
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmVzTGlzdC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XG5pbXBvcnQgeyB1c2VUaW1lbGluZUNhcmRFZmZlY3RzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2hvb2tzL3VzZVRpbWVsaW5lQ2FyZEVmZmVjdHMudHNcIjtcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm0udHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpY2tldExpbmVzTGlzdCBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGluZXNMaXN0LnRzeFwiO1xuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uLy4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlVGlja2V0U3RhdHVzTGFiZWwgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzL2V4cGVuc2VUaWNrZXRTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgeyBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuaW1wb3J0IHsgbWFwV2luZG93RW51bU9wdGlvbnMsIHR5cGUgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBwYXJzZUV4cGVuc2VEYXRlLCBzYWZlVGV4dCwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldy50c1wiO1xuaW1wb3J0IEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWwgZnJvbSBcIi4vRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbC50c3hcIjtcblxuY29uc3QgQUxMT1dFRF9HQVNUT19UWVBFUyA9IG5ldyBTZXQ8bnVtYmVyPihbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTRdKTtcbmNvbnN0IExJTkVTX1BBR0VfU0laRSA9IDY7XG5jb25zdCBHQVNUT19UWVBFX0xBQkVMX0tFWVM6IFJlY29yZDxudW1iZXIsIHsga2V5OiBzdHJpbmc7IGZhbGxiYWNrOiBzdHJpbmcgfT4gPSB7XG4gIDA6IHsga2V5OiBcIkVudW1fTm9uZVwiLCBmYWxsYmFjazogXCJOb25lXCIgfSxcbiAgMTogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfUGVhamVcIiwgZmFsbGJhY2s6IFwiUGVhamVcIiB9LFxuICAyOiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9QYXJraW5nXCIsIGZhbGxiYWNrOiBcIlBhcmtpbmdcIiB9LFxuICAzOiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9LbVwiLCBmYWxsYmFjazogXCJLbVwiIH0sXG4gIDQ6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0Rlc2F5dW5vXCIsIGZhbGxiYWNrOiBcIkRlc2F5dW5vXCIgfSxcbiAgNTogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfQ29taWRhXCIsIGZhbGxiYWNrOiBcIkNvbWlkYVwiIH0sXG4gIDY6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0NlbmFcIiwgZmFsbGJhY2s6IFwiQ2VuYVwiIH0sXG4gIDc6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0hvdGVsXCIsIGZhbGxiYWNrOiBcIkhvdGVsXCIgfSxcbiAgODogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfVmFyaW9zXCIsIGZhbGxiYWNrOiBcIlZhcmlvc1wiIH0sXG4gIDE0OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9UYXhpXCIsIGZhbGxiYWNrOiBcIlRheGlcIiB9LFxufTtcblxuY29uc3QgcGFnZWRTbGljZSA9IDxULD4oaXRlbXM6IFRbXSwgcGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKTogVFtdID0+IHtcbiAgaWYgKCFpdGVtcy5sZW5ndGgpIHJldHVybiBbXTtcbiAgY29uc3Qgc2FmZVBhZ2UgPSBNYXRoLm1heCgxLCBwYWdlKTtcbiAgY29uc3Qgc3RhcnQgPSAoc2FmZVBhZ2UgLSAxKSAqIHBhZ2VTaXplO1xuICByZXR1cm4gaXRlbXMuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgcGFnZVNpemUpO1xufTtcblxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxuY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXG4gIH0pO1xufTtcblxuY29uc3QgYnVpbGRGYWxsYmFja0dhc3RvVHlwZU9wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKEdBU1RPX1RZUEVfTEFCRUxfS0VZUylcbiAgICAubWFwKChbY29kZSwgY2ZnXSkgPT4gKHtcbiAgICAgIHZhbHVlOiBTdHJpbmcoY29kZSksXG4gICAgICB0ZXh0OiBpbmRUKGNmZy5rZXksIGNmZy5mYWxsYmFjayksXG4gICAgfSkpXG4gICAgLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiBOdW1iZXIobGVmdC52YWx1ZSkgLSBOdW1iZXIocmlnaHQudmFsdWUpKTtcbn07XG5cbmNvbnN0IHRvSW5wdXREYXRlID0gKHJhdz86IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcbiAgcmV0dXJuIHBhcnNlZCA/IHRvSXNvRGF0ZShwYXJzZWQpIDogXCJcIjtcbn07XG5cbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlQ29udGVudCA9ICgpID0+IHtcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJWaWV3XCIpO1xuICBjb25zdCBjYW5FZGl0VGlja2V0ID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJFZGl0XCIpO1xuICBjb25zdCBjYW5EZWxldGVUaWNrZXQgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIkZ1bGxBY2Nlc3NcIik7XG4gIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfVElDS0VUX0ZJTEVfSURfXyk7XG4gIGNvbnN0IGxpbmVDb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3Qgcm91dGVQYXJhbXMgPSB1c2VNZW1vKCgpID0+IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCksIFtdKTtcbiAgY29uc3QgYXV0b0VkaXRNb2RlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgbW9kZSA9IHJvdXRlUGFyYW1zLmdldChcIm1vZGVcIik7XG4gICAgcmV0dXJuIHNhZmVUZXh0KG1vZGUpLnRvTG93ZXJDYXNlKCkgPT09IFwiZWRpdFwiO1xuICB9LCBbcm91dGVQYXJhbXNdKTtcbiAgY29uc3QgZGV0YWlsT3JpZ2luID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChyb3V0ZVBhcmFtcy5nZXQoXCJvcmlnaW5cIikpLnRvTG93ZXJDYXNlKCksIFtyb3V0ZVBhcmFtc10pO1xuICBjb25zdCBjb250ZXh0U2hlZXRJZCA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwic2hlZXRJZFwiKSksIFtyb3V0ZVBhcmFtc10pO1xuICBjb25zdCBjb250ZXh0TGluZVJlY0lkID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChyb3V0ZVBhcmFtcy5nZXQoXCJsaW5lUmVjSWRcIikpLCBbcm91dGVQYXJhbXNdKTtcbiAgY29uc3QgaXNGcm9tRXhwZW5zZVNoZWV0Q3JlYXRlID0gZGV0YWlsT3JpZ2luID09PSBcInNoZWV0LWNyZWF0ZVwiO1xuICBjb25zdCBpc0Zyb21FeHBlbnNlTGluZSA9IGRldGFpbE9yaWdpbiA9PT0gXCJleHBlbnNlLWxpbmVcIiAmJiAhIWNvbnRleHRTaGVldElkICYmICEhY29udGV4dExpbmVSZWNJZDtcbiAgY29uc3QgYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCA9IGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZTtcbiAgY29uc3QgYXV0b0VkaXRBdHRlbXB0ZWRSZWYgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbaXNFZGl0aW5nLCBzZXRJc0VkaXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbW9kYWxFcnJvciwgc2V0TW9kYWxFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2xpbmVQYWdlLCBzZXRMaW5lUGFnZV0gPSB1c2VTdGF0ZSgxKTtcblxuICBjb25zdCBbZHJhZnREZXNjcmlwdGlvbiwgc2V0RHJhZnREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0R2FzdG9UeXBlLCBzZXREcmFmdEdhc3RvVHlwZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0Q3VycmVuY3lDb2RlLCBzZXREcmFmdEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0VHJhbnNEYXRlLCBzZXREcmFmdFRyYW5zRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0Q29tZW50YXJpbywgc2V0RHJhZnRDb21lbnRhcmlvXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRVcmxGaWxlLCBzZXREcmFmdFVybEZpbGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdEZpbGVOYW1lLCBzZXREcmFmdEZpbGVOYW1lXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxuICAgICgpID0+ICh7XG4gICAgICBmaXJzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9GaXJzdFwiLCBcIkZpcnN0XCIpLFxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXG4gICAgICBuZXh0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpLFxuICAgICAgbGFzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKSxcbiAgICB9KSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IGdhc3RvVHlwZU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4ge1xuICAgIGNvbnN0IHNvdXJjZSA9IEFycmF5LmlzQXJyYXkod2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fKSA/IHdpbmRvdy5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXyA6IFtdO1xuICAgIGNvbnN0IG1hcHBlZCA9IG1hcFdpbmRvd0VudW1PcHRpb25zKHNvdXJjZSkuZmlsdGVyKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKGVudHJ5LnZhbHVlKTtcbiAgICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgQUxMT1dFRF9HQVNUT19UWVBFUy5oYXMocGFyc2VkKTtcbiAgICB9KTtcblxuICAgIGlmIChtYXBwZWQubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIG1hcHBlZC5zb3J0KChsZWZ0LCByaWdodCkgPT4gTnVtYmVyKGxlZnQudmFsdWUpIC0gTnVtYmVyKHJpZ2h0LnZhbHVlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1aWxkRmFsbGJhY2tHYXN0b1R5cGVPcHRpb25zKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBnYXN0b1R5cGVMYWJlbE1hcCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgZ2FzdG9UeXBlT3B0aW9ucykge1xuICAgICAgbWFwLnNldChTdHJpbmcob3B0aW9uLnZhbHVlKSwgb3B0aW9uLnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gbWFwO1xuICB9LCBbZ2FzdG9UeXBlT3B0aW9uc10pO1xuXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxuICB9KTtcblxuICBjb25zdCB7IGhlYWRlciwgbGluZXMsIGlzTG9hZGluZywgZXJyb3JNZXNzYWdlLCByZWxvYWREZXRhaWwgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZSh7XG4gICAgaGFzQWNjZXNzLFxuICAgIGZpbGVJZCxcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcbiAgfSk7XG5cbiAgY29uc3QgcHJldmlld1NvdXJjZVVybCA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQoaXNFZGl0aW5nID8gZHJhZnRVcmxGaWxlIDogaGVhZGVyPy51cmxGaWxlKSwgW2RyYWZ0VXJsRmlsZSwgaGVhZGVyPy51cmxGaWxlLCBpc0VkaXRpbmddKTtcbiAgY29uc3QgcHJldmlld0FsdFRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+IHNhZmVUZXh0KGlzRWRpdGluZyA/IGRyYWZ0RmlsZU5hbWUgOiBoZWFkZXI/LmZpbGVOYW1lKSB8fCBpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIiksXG4gICAgW2RyYWZ0RmlsZU5hbWUsIGhlYWRlcj8uZmlsZU5hbWUsIGlzRWRpdGluZ11cbiAgKTtcbiAgY29uc3Qge1xuICAgIHByZXZpZXdPcGVuLFxuICAgIHByZXZpZXdCdXN5LFxuICAgIHByZXZpZXdFcnJvcixcbiAgICBwcmV2aWV3SW1hZ2VVcmwsXG4gICAgcHJldmlld1NjYWxlLFxuICAgIHByZXZpZXdUcmFuc2xhdGUsXG4gICAgb3BlblByZXZpZXcsXG4gICAgY2xvc2VQcmV2aWV3LFxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXG4gICAgaGFuZGxlUHJldmlld1doZWVsLFxuICB9ID0gdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldyh7IHNvdXJjZVVybDogcHJldmlld1NvdXJjZVVybCB9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0VkaXRpbmcgfHwgIWhlYWRlcikgcmV0dXJuO1xuXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbihzYWZlVGV4dChoZWFkZXIuZGVzY3JpcHRpb24pKTtcbiAgICBzZXREcmFmdEdhc3RvVHlwZShoZWFkZXIuZ2FzdG9UeXBlID09PSBudWxsID8gXCJcIiA6IFN0cmluZyhoZWFkZXIuZ2FzdG9UeXBlKSk7XG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUoc2FmZVRleHQoaGVhZGVyLmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSk7XG4gICAgc2V0RHJhZnRUcmFuc0RhdGUodG9JbnB1dERhdGUoaGVhZGVyLnRyYW5zRGF0ZSkpO1xuICAgIHNldERyYWZ0Q29tZW50YXJpbyhzYWZlVGV4dChoZWFkZXIuY29tZW50YXJpbykpO1xuICAgIHNldERyYWZ0VXJsRmlsZShzYWZlVGV4dChoZWFkZXIudXJsRmlsZSkpO1xuICAgIHNldERyYWZ0RmlsZU5hbWUoc2FmZVRleHQoaGVhZGVyLmZpbGVOYW1lKSk7XG4gIH0sIFtoZWFkZXIsIGlzRWRpdGluZ10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbWF4UGFnZSA9IE1hdGgubWF4KDEsIE1hdGguY2VpbChsaW5lcy5sZW5ndGggLyBMSU5FU19QQUdFX1NJWkUpKTtcbiAgICBpZiAobGluZVBhZ2UgPiBtYXhQYWdlKSB7XG4gICAgICBzZXRMaW5lUGFnZShtYXhQYWdlKTtcbiAgICB9XG4gIH0sIFtsaW5lUGFnZSwgbGluZXMubGVuZ3RoXSk7XG5cbiAgY29uc3QgdmlzaWJsZUxpbmVzID0gdXNlTWVtbygoKSA9PiBwYWdlZFNsaWNlKGxpbmVzLCBsaW5lUGFnZSwgTElORVNfUEFHRV9TSVpFKSwgW2xpbmVQYWdlLCBsaW5lc10pO1xuICBjb25zdCB0b3RhbExpbmVQYWdlcyA9IE1hdGguY2VpbCgobGluZXMubGVuZ3RoIHx8IDApIC8gTElORVNfUEFHRV9TSVpFKTtcblxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghaGVhZGVyIHx8IGlzTG9hZGluZykgcmV0dXJuO1xuICAgIGlmIChoZWFkZXIuc3RhdHVzID09PSAxICYmICFhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0KSByZXR1cm47XG4gICAgaWYgKCFjYW5FZGl0VGlja2V0KSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XG4gICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9FZGl0aW5nRW5hYmxlZFwiLCBcIkVkaXRpbmcgZW5hYmxlZFwiKSk7XG4gIH0sIFthbGxvd0Fzc2lnbmVkRHJhZnRFZGl0LCBjYW5FZGl0VGlja2V0LCBoZWFkZXIsIGlzTG9hZGluZ10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFhdXRvRWRpdE1vZGUgfHwgaXNGcm9tRXhwZW5zZUxpbmUgfHwgYXV0b0VkaXRBdHRlbXB0ZWRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGlmIChpc0xvYWRpbmcgfHwgIWhlYWRlcikgcmV0dXJuO1xuICAgIGF1dG9FZGl0QXR0ZW1wdGVkUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgIGhhbmRsZUVuYWJsZUVkaXQoKTtcbiAgfSwgW2F1dG9FZGl0TW9kZSwgaGFuZGxlRW5hYmxlRWRpdCwgaGVhZGVyLCBpc0Zyb21FeHBlbnNlTGluZSwgaXNMb2FkaW5nXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWlzRWRpdGluZykgcmV0dXJuO1xuICAgIGlmICghaGVhZGVyKSB7XG4gICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uKHNhZmVUZXh0KGhlYWRlci5kZXNjcmlwdGlvbikpO1xuICAgIHNldERyYWZ0R2FzdG9UeXBlKGhlYWRlci5nYXN0b1R5cGUgPT09IG51bGwgPyBcIlwiIDogU3RyaW5nKGhlYWRlci5nYXN0b1R5cGUpKTtcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZShzYWZlVGV4dChoZWFkZXIuY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpKTtcbiAgICBzZXREcmFmdFRyYW5zRGF0ZSh0b0lucHV0RGF0ZShoZWFkZXIudHJhbnNEYXRlKSk7XG4gICAgc2V0RHJhZnRDb21lbnRhcmlvKHNhZmVUZXh0KGhlYWRlci5jb21lbnRhcmlvKSk7XG4gICAgc2V0RHJhZnRVcmxGaWxlKHNhZmVUZXh0KGhlYWRlci51cmxGaWxlKSk7XG4gICAgc2V0RHJhZnRGaWxlTmFtZShzYWZlVGV4dChoZWFkZXIuZmlsZU5hbWUpKTtcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xuICB9LCBbaGVhZGVyLCBpc0VkaXRpbmddKTtcblxuICBjb25zdCB7IGhhbmRsZVVwZGF0ZSwgaGFuZGxlRGVsZXRlIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zKHtcbiAgICBidXN5LFxuICAgIGlzRWRpdGluZyxcbiAgICBjYW5FZGl0VGlja2V0LFxuICAgIGNhbkRlbGV0ZVRpY2tldCxcbiAgICBmaWxlSWQsXG4gICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICBkcmFmdEdhc3RvVHlwZSxcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBkcmFmdFRyYW5zRGF0ZSxcbiAgICBkcmFmdENvbWVudGFyaW8sXG4gICAgZHJhZnRVcmxGaWxlLFxuICAgIGRyYWZ0RmlsZU5hbWUsXG4gICAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0OiBpc0Zyb21FeHBlbnNlTGluZVxuICAgICAgPyB7XG4gICAgICAgICAgc2hlZXRJZDogY29udGV4dFNoZWV0SWQsXG4gICAgICAgICAgbGluZVJlY0lkOiBjb250ZXh0TGluZVJlY0lkLFxuICAgICAgICB9XG4gICAgICA6IG51bGwsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBzZXRCdXN5LFxuICAgIHNldFN0YXR1cyxcbiAgICBzZXRJc0VkaXRpbmcsXG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xuICAgICAgYnVzeSxcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xuICAgICAgICBzZXRTdGF0dXMobXNnKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtXSk7XG5cbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XG4gICAgOiAhYnVzeSAmJiBtb2RhbEVycm9yXG4gICAgICA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKVxuICAgICAgOiBtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKTtcblxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2b2lkIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xuICB9LCBbYnVzeSwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm0sIG1vZGFsRXJyb3JdKTtcblxuICBjb25zdCBpc0Fzc2lnbmVkVGlja2V0ID0gaGVhZGVyPy5zdGF0dXMgPT09IDE7XG4gIGNvbnN0IGlzQ29udGV4dExvY2tlZCA9IGlzQXNzaWduZWRUaWNrZXQgJiYgIWFsbG93QXNzaWduZWREcmFmdEVkaXQ7XG4gIGNvbnN0IGNhbkVkaXRUaWNrZXRJbkNvbnRleHQgPSBjYW5FZGl0VGlja2V0ICYmICFpc0Zyb21FeHBlbnNlTGluZTtcbiAgY29uc3QgY2FuRGVsZXRlVGlja2V0SW5Db250ZXh0ID0gY2FuRGVsZXRlVGlja2V0ICYmICFpc0Zyb21FeHBlbnNlTGluZTtcbiAgY29uc3QgdGlja2V0VG9wYmFyQWN0aW9uTW9kZTogXCJkZWZhdWx0XCIgfCBcInZpZXdfb25seVwiID0gaXNGcm9tRXhwZW5zZUxpbmUgPyBcInZpZXdfb25seVwiIDogXCJkZWZhdWx0XCI7XG5cbiAgdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMoe1xuICAgIGJ1c3ksXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxuICAgIGlzRWRpdGluZyxcbiAgICBpc0xvY2tlZDogaXNDb250ZXh0TG9ja2VkLFxuICAgIGFjdGlvbk1vZGU6IHRpY2tldFRvcGJhckFjdGlvbk1vZGUsXG4gICAgY2FuRWRpdFRpY2tldDogY2FuRWRpdFRpY2tldEluQ29udGV4dCxcbiAgICBjYW5EZWxldGVUaWNrZXQ6IGNhbkRlbGV0ZVRpY2tldEluQ29udGV4dCxcbiAgICBmaWxlSWQsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlVXBkYXRlLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgICBvblNhdmVTdWNjZXNzOiAoKSA9PiB7XG4gICAgICB2b2lkIHJlbG9hZERldGFpbCgpO1xuICAgIH0sXG4gICAgb25EZWxldGVTdWNjZXNzOiBpc0Zyb21FeHBlbnNlTGluZVxuICAgICAgPyAoKSA9PiB7XG4gICAgICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChjb250ZXh0U2hlZXRJZCl9YCk7XG4gICAgICAgIH1cbiAgICAgIDogdW5kZWZpbmVkLFxuICAgIG9wZW5Db25maXJtLFxuICAgIGNsb3NlQ29uZmlybSxcbiAgfSk7XG5cbiAgY29uc3Qgb3BlbkxpbmVEZXRhaWwgPSB1c2VDYWxsYmFjayhcbiAgICAocmF3TGluZVJlY0lkOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChpc0Zyb21FeHBlbnNlTGluZSkgcmV0dXJuO1xuICAgICAgY29uc3QgbGluZVJlY0lkID0gc2FmZVRleHQocmF3TGluZVJlY0lkKTtcbiAgICAgIGlmICghbGluZVJlY0lkKSByZXR1cm47XG4gICAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgICAgICBmaWxlSWQsXG4gICAgICAgIGxpbmVSZWNJZCxcbiAgICAgIH0pO1xuICAgICAgaWYgKGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSkge1xuICAgICAgICBxdWVyeS5zZXQoXCJvcmlnaW5cIiwgXCJzaGVldC1jcmVhdGVcIik7XG4gICAgICAgIHF1ZXJ5LnNldChcIm1vZGVcIiwgXCJlZGl0XCIpO1xuICAgICAgICBpZiAoY29udGV4dFNoZWV0SWQpIHtcbiAgICAgICAgICBxdWVyeS5zZXQoXCJzaGVldElkXCIsIGNvbnRleHRTaGVldElkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9UaWNrZXRMaW5lRGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gO1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsLCB7XG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW2NvbnRleHRTaGVldElkLCBmaWxlSWQsIGlzRnJvbUV4cGVuc2VMaW5lLCBpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGVdXG4gICk7XG5cbiAgY29uc3QgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgPSB1c2VDYWxsYmFjaygodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcbiAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBjYXJkID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XG4gICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIWxpbmVDb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjYXJkO1xuICB9LCBbXSk7XG5cbiAgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyh7XG4gICAgY29udGFpbmVyUmVmOiBsaW5lQ29udGFpbmVyUmVmLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBpdGVtczogdmlzaWJsZUxpbmVzLFxuICAgIHJlc29sdmVDbGlja2FibGVDYXJkLFxuICB9KTtcblxuICBjb25zdCBvcGVuRmlsZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICB2b2lkIG9wZW5QcmV2aWV3KCk7XG4gIH0sIFtvcGVuUHJldmlld10pO1xuXG4gIGNvbnN0IGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZERpc3BsYXkpO1xuICAgIGlmICghc2FmZVNoZWV0SWQpIHJldHVybjtcblxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZVNoZWV0SWQpfWAsIHtcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxuICAgIH0pO1xuICB9LCBbaGVhZGVyPy5ob2phR2FzdG9zSWREaXNwbGF5LCBpc0VkaXRpbmddKTtcblxuICBjb25zdCBzdGF0dXNMYWJlbCA9IHVzZU1lbW8oKCkgPT4gZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsKGhlYWRlcj8uc3RhdHVzKSwgW2hlYWRlcj8uc3RhdHVzXSk7XG4gIGNvbnN0IGdhc3RvVHlwZUxhYmVsID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgY3VycmVudEdhc3RvVHlwZSA9IGlzRWRpdGluZyA/IGRyYWZ0R2FzdG9UeXBlIDogaGVhZGVyPy5nYXN0b1R5cGUgPT09IG51bGwgPyBcIlwiIDogU3RyaW5nKGhlYWRlcj8uZ2FzdG9UeXBlID8/IFwiXCIpO1xuICAgIGlmICghY3VycmVudEdhc3RvVHlwZSkge1xuICAgICAgcmV0dXJuIGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xuICAgIH1cbiAgICByZXR1cm4gZ2FzdG9UeXBlTGFiZWxNYXAuZ2V0KFN0cmluZyhjdXJyZW50R2FzdG9UeXBlKSkgfHwgU3RyaW5nKGN1cnJlbnRHYXN0b1R5cGUpO1xuICB9LCBbZHJhZnRHYXN0b1R5cGUsIGdhc3RvVHlwZUxhYmVsTWFwLCBoZWFkZXI/Lmdhc3RvVHlwZSwgaXNFZGl0aW5nXSk7XG4gIGNvbnN0IHRvdGFsQW1vdW50VGV4dCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGhlYWRlcj8udG90YWxBbW91bnQgPz8gbnVsbCwgKGlzRWRpdGluZyA/IGRyYWZ0Q3VycmVuY3lDb2RlIDogaGVhZGVyPy5jdXJyZW5jeUNvZGUpIHx8IGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcbiAgICBbZHJhZnRDdXJyZW5jeUNvZGUsIGhlYWRlcj8uY3VycmVuY3lDb2RlLCBoZWFkZXI/LnRvdGFsQW1vdW50LCBpc0VkaXRpbmddXG4gICk7XG4gIGNvbnN0IHRyYW5zRGF0ZVRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShpc0VkaXRpbmcgPyBkcmFmdFRyYW5zRGF0ZSA6IGhlYWRlcj8udHJhbnNEYXRlLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIiksXG4gICAgW2RyYWZ0VHJhbnNEYXRlLCBoZWFkZXI/LnRyYW5zRGF0ZSwgaXNFZGl0aW5nXVxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgIDxDb25maXJtTW9kYWxcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWxDYW5jZWxUZXh0fVxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxuICAgICAgICBidXN5PXtidXN5fVxuICAgICAgICBlcnJvcj17bW9kYWxFcnJvcn1cbiAgICAgICAgc3RhdHVzPXtzdGF0dXN9XG4gICAgICAgIG9uQ29uZmlybT17aGFuZGxlTW9kYWxCdXR0b25Db25maXJtfVxuICAgICAgICBvbkNhbmNlbD17Y2xvc2VDb25maXJtfVxuICAgICAgLz5cbiAgICAgIDxFeHBlbnNlVGlja2V0UHJldmlld01vZGFsXG4gICAgICAgIG9wZW49e3ByZXZpZXdPcGVufVxuICAgICAgICBidXN5PXtwcmV2aWV3QnVzeX1cbiAgICAgICAgZXJyb3I9e3ByZXZpZXdFcnJvcn1cbiAgICAgICAgaW1hZ2VVcmw9e3ByZXZpZXdJbWFnZVVybH1cbiAgICAgICAgaW1hZ2VBbHQ9e3ByZXZpZXdBbHRUZXh0fVxuICAgICAgICBzY2FsZT17cHJldmlld1NjYWxlfVxuICAgICAgICB0cmFuc2xhdGU9e3ByZXZpZXdUcmFuc2xhdGV9XG4gICAgICAgIG9uQ2xvc2U9e2Nsb3NlUHJldmlld31cbiAgICAgICAgb25Qb2ludGVyRG93bj17aGFuZGxlUHJldmlld1BvaW50ZXJEb3dufVxuICAgICAgICBvblBvaW50ZXJNb3ZlPXtoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmV9XG4gICAgICAgIG9uUG9pbnRlckVuZD17aGFuZGxlUHJldmlld1BvaW50ZXJFbmR9XG4gICAgICAgIG9uV2hlZWw9e2hhbmRsZVByZXZpZXdXaGVlbH1cbiAgICAgIC8+XG5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCJcbiAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogaXNMb2FkaW5nID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxuICAgICAgPlxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XG4gICAgICA8L2Rpdj5cblxuICAgICAge2Vycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57ZXJyb3JNZXNzYWdlfTwvZGl2PiA6IG51bGx9XG5cbiAgICAgIHshaXNMb2FkaW5nICYmICFlcnJvck1lc3NhZ2UgJiYgaGVhZGVyID8gKFxuICAgICAgICA8PlxuICAgICAgICAgIDxFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybVxuICAgICAgICAgICAgaGVhZGVyPXtoZWFkZXJ9XG4gICAgICAgICAgICBzdGF0dXNMYWJlbD17c3RhdHVzTGFiZWx9XG4gICAgICAgICAgICBnYXN0b1R5cGVMYWJlbD17Z2FzdG9UeXBlTGFiZWx9XG4gICAgICAgICAgICB0b3RhbEFtb3VudFRleHQ9e3RvdGFsQW1vdW50VGV4dH1cbiAgICAgICAgICAgIHRyYW5zRGF0ZVRleHQ9e3RyYW5zRGF0ZVRleHR9XG4gICAgICAgICAgICBpc0VkaXRpbmc9e2lzRWRpdGluZ31cbiAgICAgICAgICAgIGdhc3RvVHlwZU9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XG4gICAgICAgICAgICBkcmFmdERlc2NyaXB0aW9uPXtkcmFmdERlc2NyaXB0aW9ufVxuICAgICAgICAgICAgZHJhZnRHYXN0b1R5cGU9e2RyYWZ0R2FzdG9UeXBlfVxuICAgICAgICAgICAgZHJhZnRDdXJyZW5jeUNvZGU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxuICAgICAgICAgICAgZHJhZnRUcmFuc0RhdGU9e2RyYWZ0VHJhbnNEYXRlfVxuICAgICAgICAgICAgZHJhZnRVcmxGaWxlPXtkcmFmdFVybEZpbGV9XG4gICAgICAgICAgICBkcmFmdEZpbGVOYW1lPXtkcmFmdEZpbGVOYW1lfVxuICAgICAgICAgICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlPXtzZXREcmFmdERlc2NyaXB0aW9ufVxuICAgICAgICAgICAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZT17c2V0RHJhZnRHYXN0b1R5cGV9XG4gICAgICAgICAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlPXtzZXREcmFmdEN1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2U9e3NldERyYWZ0VHJhbnNEYXRlfVxuICAgICAgICAgICAgb25PcGVuRmlsZT17b3BlbkZpbGV9XG4gICAgICAgICAgICBvbk9wZW5FeHBlbnNlU2hlZXQ9e2hhbmRsZU9wZW5FeHBlbnNlU2hlZXR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8RXhwZW5zZVRpY2tldExpbmVzTGlzdFxuICAgICAgICAgICAgdmlzaWJsZUxpbmVzPXt2aXNpYmxlTGluZXN9XG4gICAgICAgICAgICB0b3RhbExpbmVQYWdlcz17dG90YWxMaW5lUGFnZXN9XG4gICAgICAgICAgICBsaW5lUGFnZT17bGluZVBhZ2V9XG4gICAgICAgICAgICBjdXJyZW5jeUNvZGU9e2lzRWRpdGluZyA/IGRyYWZ0Q3VycmVuY3lDb2RlIDogc2FmZVRleHQoaGVhZGVyLmN1cnJlbmN5Q29kZSl9XG4gICAgICAgICAgICBwYWdpbmF0aW9uTGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgICAgICAgY29udGFpbmVyUmVmPXtsaW5lQ29udGFpbmVyUmVmfVxuICAgICAgICAgICAgb25MaW5lUGFnZUNoYW5nZT17c2V0TGluZVBhZ2V9XG4gICAgICAgICAgICBvbk9wZW5MaW5lPXtvcGVuTGluZURldGFpbH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPntzdGF0dXN9PC9kaXY+XG4gICAgICAgIDwvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2UgdGlja2V0IGRldGFpbC5cbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgICAgIDxFeHBlbnNlVGlja2V0RGV0YWlsUGFnZUNvbnRlbnQgLz5cbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICApO1xufTtcblxuY29uc3QgbW91bnQgPSAoKSA9PiB7XG4gIGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoKCk7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLXJvb3RcIik7XG4gIGlmICghcm9vdEVsKSByZXR1cm47XG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVRpY2tldERldGFpbFBhZ2UgLz4pO1xufTtcblxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB9IGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0LnRzeFwiO1xuXG5jb25zdCBoYXNSZWFsRXhwZW5zZVNoZWV0VmFsdWUgPSAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIGZhbHNlO1xuICBpZiAobm9ybWFsaXplZCA9PT0gXCItXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIwXCIpIHJldHVybiBmYWxzZTtcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwibi9hXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJuYVwiKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB0cnVlO1xufTtcblxuY29uc3QgSU1BR0VfRVhURU5TSU9OUyA9IG5ldyBTZXQ8c3RyaW5nPihbXCJqcGdcIiwgXCJqcGVnXCIsIFwicG5nXCIsIFwid2VicFwiLCBcImdpZlwiLCBcImJtcFwiLCBcImhlaWNcIiwgXCJoZWlmXCIsIFwiYXZpZlwiXSk7XG5cbmNvbnN0IGdldEZpbGVFeHRlbnNpb25Gcm9tUGF0aCA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgc291cmNlID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghc291cmNlKSByZXR1cm4gXCJcIjtcblxuICBjb25zdCB3aXRob3V0UXVlcnkgPSBzb3VyY2Uuc3BsaXQoXCI/XCIpWzBdLnNwbGl0KFwiI1wiKVswXTtcbiAgY29uc3QgcGFydHMgPSB3aXRob3V0UXVlcnkuc3BsaXQoXCIuXCIpO1xuICBpZiAocGFydHMubGVuZ3RoIDwgMikgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3QgcmF3RXh0ID0gc2FmZVRleHQocGFydHNbcGFydHMubGVuZ3RoIC0gMV0pLnJlcGxhY2UoL1teYS16MC05XS9nLCBcIlwiKTtcbiAgcmV0dXJuIHJhd0V4dCA9PT0gXCJqcGVnXCIgPyBcImpwZ1wiIDogcmF3RXh0O1xufTtcblxuY29uc3QgaGFzSW1hZ2VQcmV2aWV3TGluayA9ICh1cmxWYWx1ZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRVcmwgPSBzYWZlVGV4dCh1cmxWYWx1ZSk7XG4gIGlmICghbm9ybWFsaXplZFVybCkgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChub3JtYWxpemVkVXJsLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChcImRhdGE6aW1hZ2UvXCIpKSByZXR1cm4gdHJ1ZTtcblxuICBjb25zdCBleHRlbnNpb24gPSBnZXRGaWxlRXh0ZW5zaW9uRnJvbVBhdGgobm9ybWFsaXplZFVybCk7XG4gIGlmIChleHRlbnNpb24gJiYgSU1BR0VfRVhURU5TSU9OUy5oYXMoZXh0ZW5zaW9uKSkgcmV0dXJuIHRydWU7XG5cbiAgY29uc3Qgbm9ybWFsaXplZExvd2VyID0gbm9ybWFsaXplZFVybC50b0xvd2VyQ2FzZSgpO1xuICBpZiAobm9ybWFsaXplZExvd2VyLmluY2x1ZGVzKFwiYmxvYi5jb3JlLndpbmRvd3MubmV0XCIpICYmIG5vcm1hbGl6ZWRMb3dlci5pbmNsdWRlcyhcImltYWdlXCIpKSByZXR1cm4gdHJ1ZTtcblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG50eXBlIEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtUHJvcHMgPSB7XG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlcjtcbiAgc3RhdHVzTGFiZWw6IHN0cmluZztcbiAgZ2FzdG9UeXBlTGFiZWw6IHN0cmluZztcbiAgdG90YWxBbW91bnRUZXh0OiBzdHJpbmc7XG4gIHRyYW5zRGF0ZVRleHQ6IHN0cmluZztcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBnYXN0b1R5cGVPcHRpb25zOiBBcnJheTx7IHZhbHVlOiBzdHJpbmc7IHRleHQ6IHN0cmluZyB9PjtcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xuICBkcmFmdEdhc3RvVHlwZTogc3RyaW5nO1xuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xuICBkcmFmdFVybEZpbGU6IHN0cmluZztcbiAgZHJhZnRGaWxlTmFtZTogc3RyaW5nO1xuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbk9wZW5GaWxlOiAoKSA9PiB2b2lkO1xuICBvbk9wZW5FeHBlbnNlU2hlZXQ/OiAoKSA9PiB2b2lkO1xufTtcblxuLy8gUmVhZC1vbmx5IGFuZCBlZGl0YWJsZSBoZWFkZXIgZm9ybSBmb3IgdGlja2V0IGRldGFpbC5cbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtID0gKHtcbiAgaGVhZGVyLFxuICBzdGF0dXNMYWJlbCxcbiAgZ2FzdG9UeXBlTGFiZWwsXG4gIHRvdGFsQW1vdW50VGV4dCxcbiAgdHJhbnNEYXRlVGV4dCxcbiAgaXNFZGl0aW5nLFxuICBnYXN0b1R5cGVPcHRpb25zLFxuICBkcmFmdERlc2NyaXB0aW9uLFxuICBkcmFmdEdhc3RvVHlwZSxcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gIGRyYWZ0VHJhbnNEYXRlLFxuICBkcmFmdFVybEZpbGUsXG4gIGRyYWZ0RmlsZU5hbWUsXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZSxcbiAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZSxcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZSxcbiAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZSxcbiAgb25PcGVuRmlsZSxcbiAgb25PcGVuRXhwZW5zZVNoZWV0LFxufTogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm1Qcm9wcykgPT4ge1xuICBjb25zdCBwcmV2aWV3VXJsID0gc2FmZVRleHQoaXNFZGl0aW5nID8gZHJhZnRVcmxGaWxlIDogaGVhZGVyLnVybEZpbGUpO1xuICBjb25zdCBjYW5PcGVuRmlsZSA9IGhhc0ltYWdlUHJldmlld0xpbmsocHJldmlld1VybCk7XG4gIGNvbnN0IHNob3dFeHBlbnNlU2hlZXRGaWVsZCA9IGhhc1JlYWxFeHBlbnNlU2hlZXRWYWx1ZShoZWFkZXIuaG9qYUdhc3Rvc0lkRGlzcGxheSk7XG5cbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIil9XG4gICAgICAgICAgdmFsdWU9e2hlYWRlci5maWxlSWQgfHwgXCItXCJ9XG4gICAgICAgIC8+XG5cbiAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX1N0YXR1c1wiLCBcIlN0YXR1c1wiKX1cbiAgICAgICAgICB2YWx1ZT17c3RhdHVzTGFiZWwgfHwgXCItXCJ9XG4gICAgICAgIC8+XG5cbiAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtOmNvbC1zcGFuLTIgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX08L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdERlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxuICAgICAgICAgICAgdmFsdWU9e2hlYWRlci5kZXNjcmlwdGlvbiB8fCBcIi1cIn1cbiAgICAgICAgICAgIGZ1bGxXaWR0aFxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG5cbiAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cbiAgICAgICAgICAgIG9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XG4gICAgICAgICAgICB2YWx1ZT17ZHJhZnRHYXN0b1R5cGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEdhc3RvVHlwZUNoYW5nZX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cbiAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XG4gICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxuICAgICAgICAgICAgdmFsdWU9e2dhc3RvVHlwZUxhYmVsIHx8IFwiLVwifVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG5cbiAgICAgICAge3Nob3dFeHBlbnNlU2hlZXRGaWVsZCA/IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9FeHBlbnNlU2hlZXREaXNwbGF5XCIsIFwiRXhwZW5zZSBzaGVldFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtoZWFkZXIuaG9qYUdhc3Rvc0lkRGlzcGxheSB8fCBcIi1cIn1cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uT3BlbkV4cGVuc2VTaGVldH1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgIDxFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XG4gICAgICAgICAgICB2YWx1ZT17ZHJhZnRDdXJyZW5jeUNvZGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cbiAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtdGlja2V0LWRldGFpbC1jdXJyZW5jeVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgdmFsdWU9e2hlYWRlci5jdXJyZW5jeUNvZGUgfHwgXCItXCJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cblxuICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVG90YWxBbW91bnRcIiwgXCJUb3RhbCBhbW91bnRcIil9XG4gICAgICAgICAgdmFsdWU9e3RvdGFsQW1vdW50VGV4dCB8fCBcIi1cIn1cbiAgICAgICAgLz5cblxuICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlzaXRhLWZpZWxkLXRleHRcIj5cbiAgICAgICAgICAgIDxTaW5nbGVEYXRlUGlja2VyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DcmVhdGVkRGF0ZVwiLCBcIkRhdGVcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFRyYW5zRGF0ZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRUcmFuc0RhdGVDaGFuZ2V9XG4gICAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0NyZWF0ZWREYXRlXCIsIFwiRGF0ZVwiKX1cbiAgICAgICAgICAgICAgdmFsdWU9e3RyYW5zRGF0ZVRleHQgfHwgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGhlYWRlci50cmFuc0RhdGUsIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiKSB8fCBcIi1cIn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7Y2FuT3BlbkZpbGUgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWVuZFwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiXG4gICAgICAgICAgICBvbkNsaWNrPXtvbk9wZW5GaWxlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpbmRUKFwiVGlja2V0c19EZXRhaWxfVmlld0F0dGFjaG1lbnRcIiwgXCJWZXIgYWRqdW50b1wiKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBDb21wYWN0UGFnaW5hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VEYXRlUGFydHMgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZU51bWJlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xuaW1wb3J0IEV4cGVuc2VTZWN0aW9uRGl2aWRlciBmcm9tIFwiLi9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpbWVsaW5lQ2FyZCBmcm9tIFwiLi9FeHBlbnNlVGltZWxpbmVDYXJkLnRzeFwiO1xuXG50eXBlIFBhZ2luYXRpb25MYWJlbHMgPSB7XG4gIGZpcnN0OiBzdHJpbmc7XG4gIHByZXY6IHN0cmluZztcbiAgbmV4dDogc3RyaW5nO1xuICBsYXN0OiBzdHJpbmc7XG59O1xuXG50eXBlIEV4cGVuc2VUaWNrZXRMaW5lc0xpc3RQcm9wcyA9IHtcbiAgdmlzaWJsZUxpbmVzOiBFeHBlbnNlVGlja2V0RGV0YWlsTGluZVtdO1xuICB0b3RhbExpbmVQYWdlczogbnVtYmVyO1xuICBsaW5lUGFnZTogbnVtYmVyO1xuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgcGFnaW5hdGlvbkxhYmVsczogUGFnaW5hdGlvbkxhYmVscztcbiAgY29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcbiAgb25MaW5lUGFnZUNoYW5nZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcbiAgb25PcGVuTGluZTogKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxuY29uc3QgZm9ybWF0UXR5VmFsdWUgPSAodmFsdWU6IG51bWJlciB8IG51bGwpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gZm9ybWF0RXhwZW5zZU51bWJlcih2YWx1ZSwge1xuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgZmFsbGJhY2s6IFwiLVwiLFxuICB9KTtcbn07XG5cbmNvbnN0IEVNUFRZX0RBVEVfUEFSVFM6IEV4cGVuc2VEYXRlUGFydHMgPSB7XG4gIHllYXI6IFwiLS1cIixcbiAgbW9udGg6IFwiLS1cIixcbiAgZGF5OiBcIi0tXCIsXG59O1xuXG5jb25zdCBUSUNLRVRfTElORV9EQVRFX1BBTkVMX0lDT04gPSAoXG4gIDxzdmdcbiAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICBmaWxsPVwibm9uZVwiXG4gICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcbiAgICBzdHJva2VXaWR0aD1cIjFcIlxuICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXG4gICAgY2xhc3NOYW1lPVwiaC0xMCB3LTEwIHRleHQtc2xhdGUtNTAwXCJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICA+XG4gICAgPHBhdGggc3Ryb2tlPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIiAvPlxuICAgIDxwYXRoIGQ9XCJNMTQgM3Y0YTEgMSAwIDAgMCAxIDFoNFwiIC8+XG4gICAgPHBhdGggZD1cIk0xNyAyMWgtMTBhMiAyIDAgMCAxIC0yIC0ydi0xNGEyIDIgMCAwIDEgMiAtMmg3bDUgNXYxMWEyIDIgMCAwIDEgLTIgMlwiIC8+XG4gICAgPHBhdGggZD1cIk05IDdsMSAwXCIgLz5cbiAgICA8cGF0aCBkPVwiTTkgMTNsNiAwXCIgLz5cbiAgICA8cGF0aCBkPVwiTTEzIDE3bDIgMFwiIC8+XG4gIDwvc3ZnPlxuKTtcblxuLy8gVGlja2V0IGxpbmVzIHNlY3Rpb24gcmVuZGVyZWQgd2l0aCB0aW1lbGluZSBjYXJkcyBhbmQgcGFnaW5nIGNvbnRyb2xzLlxuY29uc3QgRXhwZW5zZVRpY2tldExpbmVzTGlzdCA9ICh7XG4gIHZpc2libGVMaW5lcyxcbiAgdG90YWxMaW5lUGFnZXMsXG4gIGxpbmVQYWdlLFxuICBjdXJyZW5jeUNvZGUsXG4gIHBhZ2luYXRpb25MYWJlbHMsXG4gIGNvbnRhaW5lclJlZixcbiAgb25MaW5lUGFnZUNoYW5nZSxcbiAgb25PcGVuTGluZSxcbn06IEV4cGVuc2VUaWNrZXRMaW5lc0xpc3RQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNwYWNlLXktMFwiPlxuICAgICAgPEV4cGVuc2VTZWN0aW9uRGl2aWRlciBsYWJlbD17aW5kVChcIlRpY2tldHNfRGV0YWlsX0xpbmVzXCIsIFwiTGluZXNcIil9IGNsYXNzTmFtZT1cImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyLS1zcGFjZWRcIiAvPlxuXG4gICAgICB7dmlzaWJsZUxpbmVzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2luZFQoXCJUaWNrZXRzX0RldGFpbF9Ob0xpbmVzXCIsIFwiTm8gbGluZXMgZm9yIHRoaXMgdGlja2V0LlwiKX0gLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxkaXYgcmVmPXtjb250YWluZXJSZWZ9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveFwiPlxuICAgICAgICAgIHt2aXNpYmxlTGluZXMubWFwKChsaW5lLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYW1vdW50VGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShsaW5lLnRvdGFsQW1vdW50LCBjdXJyZW5jeUNvZGUpO1xuICAgICAgICAgICAgY29uc3QgcXR5VGV4dCA9IGZvcm1hdFF0eVZhbHVlKGxpbmUucXR5KTtcbiAgICAgICAgICAgIGNvbnN0IHByaWNlVGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShsaW5lLnByaWNlLCBjdXJyZW5jeUNvZGUpO1xuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBsaW5lLmRlc2NyaXB0aW9uIHx8IGxpbmUucmVjSWQgfHwgXCItXCI7XG4gICAgICAgICAgICBjb25zdCBzdWJ0aXRsZSA9IGAke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfTogJHtxdHlUZXh0fSAgICR7aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJpY2VcIiwgXCJQcmljZVwiKX06ICR7cHJpY2VUZXh0fWA7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtgJHtsaW5lLnJlY0lkfS0ke2luZGV4fWB9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtFTVBUWV9EQVRFX1BBUlRTfVxuICAgICAgICAgICAgICAgICAgZGF0ZVBhbmVsQ29udGVudD17VElDS0VUX0xJTkVfREFURV9QQU5FTF9JQ09OfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgICAgICAgICAgc3VidGl0bGU9e3N1YnRpdGxlfVxuICAgICAgICAgICAgICAgICAgc3VidGl0bGVDbGFzc05hbWU9XCJleHBlbnNlLXNoZWV0LWNhcmRfX3N1YnRpdGxlIGV4cGVuc2UtbGluZS1jYXJkX19tZXRhXCJcbiAgICAgICAgICAgICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XG4gICAgICAgICAgICAgICAgICBvbk9wZW49eygpID0+IG9uT3BlbkxpbmUobGluZS5yZWNJZCl9XG4gICAgICAgICAgICAgICAgICB0aXRsZUNsYXNzTmFtZT1cInRpbWVsaW5lLW5hbWUgZXhwZW5zZS1saW5lLWNhcmRfX3RpdGxlXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXG4gICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsTGluZVBhZ2VzfVxuICAgICAgICBjdXJyZW50UGFnZT17bGluZVBhZ2V9XG4gICAgICAgIG9uUGFnZUNoYW5nZT17b25MaW5lUGFnZUNoYW5nZX1cbiAgICAgICAgbGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgLz5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0TGluZXNMaXN0O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLCBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xuaW1wb3J0IHsgbWFwRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciwgbWFwRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcblxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGVBcmdzID0ge1xuICBoYXNBY2Nlc3M6IGJvb2xlYW47XG4gIGZpbGVJZDogc3RyaW5nO1xuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcbn07XG5cbi8vIE93bnMgcmVhZCBzdGF0ZSBhbmQgQVBJIGxvYWRpbmcgYmVoYXZpb3IgZm9yIHRoZSB0aWNrZXQgZGV0YWlsIHBhZ2UuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlID0gKHsgaGFzQWNjZXNzLCBmaWxlSWQsIG9uRm9yYmlkZGVuIH06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZUFyZ3MpID0+IHtcbiAgY29uc3QgW2hlYWRlciwgc2V0SGVhZGVyXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2xpbmVzLCBzZXRMaW5lc10gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0RGV0YWlsTGluZVtdPihbXSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICBjb25zdCByZWxvYWREZXRhaWwgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFoYXNBY2Nlc3MpIHtcbiAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2FmZUZpbGVJZCA9IHNhZmVUZXh0KGZpbGVJZCk7XG4gICAgaWYgKCFzYWZlRmlsZUlkKSB7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIlRpY2tldHNfRGV0YWlsX05vdEZvdW5kXCIsIFwiVGlja2V0IHdhcyBub3QgZm91bmQuXCIpKTtcbiAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgIHNldExpbmVzKFtdKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXQoc2FmZUZpbGVJZCwge1xuICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZT8uTWVzc2FnZSB8fCBpbmRUKFwiVGlja2V0c19EZXRhaWxfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0IGRldGFpbC5cIikpO1xuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgIHNldExpbmVzKFtdKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gICAgICBjb25zdCBzZWxlY3RlZCA9XG4gICAgICAgIGl0ZW1zLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uRmlsZUlkKS50b1VwcGVyQ2FzZSgpID09PSBzYWZlRmlsZUlkLnRvVXBwZXJDYXNlKCkpIHx8IGl0ZW1zWzBdIHx8IG51bGw7XG5cbiAgICAgIGlmICghc2VsZWN0ZWQpIHtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJUaWNrZXRzX0RldGFpbF9Ob3RGb3VuZFwiLCBcIlRpY2tldCB3YXMgbm90IGZvdW5kLlwiKSk7XG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgc2V0TGluZXMoW10pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hcHBlZEhlYWRlciA9IG1hcEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIoc2VsZWN0ZWQpO1xuICAgICAgY29uc3QgbWFwcGVkTGluZXMgPSAoQXJyYXkuaXNBcnJheShzZWxlY3RlZC5MaW5lcykgPyBzZWxlY3RlZC5MaW5lcyA6IFtdKS5tYXAoKGxpbmUpID0+XG4gICAgICAgIG1hcEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lKGxpbmUpXG4gICAgICApO1xuICAgICAgc2V0SGVhZGVyKG1hcHBlZEhlYWRlcik7XG4gICAgICBzZXRMaW5lcyhtYXBwZWRMaW5lcyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiVGlja2V0c19EZXRhaWxfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0IGRldGFpbC5cIikpO1xuICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgc2V0TGluZXMoW10pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfSwgW2ZpbGVJZCwgaGFzQWNjZXNzLCBvbkZvcmJpZGRlbl0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgdm9pZCByZWxvYWREZXRhaWwoKTtcbiAgfSwgW3JlbG9hZERldGFpbF0pO1xuXG4gIHJldHVybiB7XG4gICAgaGVhZGVyLFxuICAgIGxpbmVzLFxuICAgIGlzTG9hZGluZyxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgcmVsb2FkRGV0YWlsLFxuICB9O1xufTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3QgfSBmcm9tIFwiLi4vLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBleGVjdXRlRXhwZW5zZU11dGF0aW9uIH0gZnJvbSBcIi4uLy4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XG5pbXBvcnQge1xuICBkZWxldGVFeHBlbnNlU2hlZXRMaW5lLFxuICBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXQsXG4gIGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldEZpbGUsXG4gIHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldCxcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UsIHRvRXhwZW5zZUFwaURkTW1ZeXl5IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcblxudHlwZSBEZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQgPSB7XG4gIHNoZWV0SWQ6IHN0cmluZztcbiAgbGluZVJlY0lkOiBzdHJpbmc7XG59O1xuXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnNBcmdzID0ge1xuICBidXN5OiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGNhbkVkaXRUaWNrZXQ6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZVRpY2tldDogYm9vbGVhbjtcbiAgZmlsZUlkOiBzdHJpbmc7XG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcbiAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgZHJhZnRUcmFuc0RhdGU6IHN0cmluZztcbiAgZHJhZnRDb21lbnRhcmlvOiBzdHJpbmc7XG4gIGRyYWZ0VXJsRmlsZTogc3RyaW5nO1xuICBkcmFmdEZpbGVOYW1lOiBzdHJpbmc7XG4gIGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dD86IERlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCB8IG51bGw7XG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xufTtcblxuY29uc3QgcGFyc2VPcHRpb25hbEludGVnZXIgPSAocmF3OiBzdHJpbmcpOiBudW1iZXIgfCB1bmRlZmluZWQgPT4ge1xuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcgfHwgXCJcIikudHJpbSgpO1xuICBpZiAoIXZhbHVlKSByZXR1cm4gdW5kZWZpbmVkO1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIucGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIocGFyc2VkKSA/IHBhcnNlZCA6IHVuZGVmaW5lZDtcbn07XG5cbi8vIFRyaWVzIHRvIGluZmVyIGEgc2FmZSBleHRlbnNpb24gZm9yIHVwZGF0ZSBwYXlsb2FkIGZyb20gZmlsZSBuYW1lIG9yIFVSTC5cbmNvbnN0IHJlc29sdmVUaWNrZXRGaWxlRXh0ZW5zaW9uID0gKGZpbGVOYW1lOiBzdHJpbmcsIHVybEZpbGU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG4gIGNvbnN0IHNvdXJjZSA9IFN0cmluZyhmaWxlTmFtZSB8fCBcIlwiKS50cmltKCkgfHwgU3RyaW5nKHVybEZpbGUgfHwgXCJcIikudHJpbSgpO1xuICBjb25zdCBtYXRjaCA9IHNvdXJjZS5tYXRjaCgvXFwuKFthLXpBLVowLTldezEsMTB9KSg/OiR8Wz8jXSkvKTtcbiAgaWYgKCFtYXRjaCB8fCAhbWF0Y2hbMV0pIHJldHVybiB1bmRlZmluZWQ7XG4gIHJldHVybiBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xufTtcblxuY29uc3QgaXNOb3RGb3VuZEVycm9yID0gKGVycm9yOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDQ7XG59O1xuXG5jb25zdCBpc01pc3NpbmdUaWNrZXRGaWxlTWVzc2FnZSA9IChtZXNzYWdlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcobWVzc2FnZSB8fCBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gZmFsc2U7XG5cbiAgcmV0dXJuIChcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXJjaGl2byBhc29jaWFkb1wiKSB8fFxuICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhcmNoaXZvIGFkanVudG9cIikgfHxcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXNzb2NpYXRlZCBmaWxlXCIpIHx8XG4gICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImF0dGFjaGVkIGZpbGVcIilcbiAgKTtcbn07XG5cbi8vIEVuY2Fwc3VsYXRlcyB1cGRhdGUgYW5kIGRlbGV0ZSBtdXRhdGlvbnMgZm9yIHRpY2tldCBoZWFkZXIgZGV0YWlsLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnMgPSAoe1xuICBidXN5LFxuICBpc0VkaXRpbmcsXG4gIGNhbkVkaXRUaWNrZXQsXG4gIGNhbkRlbGV0ZVRpY2tldCxcbiAgZmlsZUlkLFxuICBkcmFmdERlc2NyaXB0aW9uLFxuICBkcmFmdEdhc3RvVHlwZSxcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gIGRyYWZ0VHJhbnNEYXRlLFxuICBkcmFmdENvbWVudGFyaW8sXG4gIGRyYWZ0VXJsRmlsZSxcbiAgZHJhZnRGaWxlTmFtZSxcbiAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0LFxuICBzZXRNb2RhbEVycm9yLFxuICBzZXRCdXN5LFxuICBzZXRTdGF0dXMsXG4gIHNldElzRWRpdGluZyxcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XG4gIGNvbnN0IGhhbmRsZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjYW5FZGl0VGlja2V0KSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9ybWFsaXplZERlc2NyaXB0aW9uID0gU3RyaW5nKGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpO1xuICAgIGlmICghbm9ybWFsaXplZERlc2NyaXB0aW9uKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9EZXNjcmlwdGlvblJlcXVpcmVkXCIsIFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWQuXCIpO1xuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3kgPSBTdHJpbmcoZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG4gICAgaWYgKCFub3JtYWxpemVkQ3VycmVuY3kpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0N1cnJlbmN5UmVxdWlyZWRcIiwgXCJDdXJyZW5jeSBpcyByZXF1aXJlZC5cIik7XG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcnNlZEdhc3RvVHlwZSA9IHBhcnNlT3B0aW9uYWxJbnRlZ2VyKGRyYWZ0R2FzdG9UeXBlKTtcbiAgICBpZiAocGFyc2VkR2FzdG9UeXBlICE9PSB1bmRlZmluZWQgJiYgIVswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0uaW5jbHVkZXMocGFyc2VkR2FzdG9UeXBlKSkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgcmF3VHJhbnNEYXRlID0gU3RyaW5nKGRyYWZ0VHJhbnNEYXRlIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBjb25zdCBub3JtYWxpemVkVHJhbnNEYXRlID0gcmF3VHJhbnNEYXRlID8gdG9FeHBlbnNlQXBpRGRNbVl5eXkocmF3VHJhbnNEYXRlKSA6IFwiXCI7XG4gICAgaWYgKHJhd1RyYW5zRGF0ZSAmJiAhbm9ybWFsaXplZFRyYW5zRGF0ZSkge1xuICAgICAgc2V0TW9kYWxFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgICAgIHNldFN0YXR1cyhFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0ID0ge1xuICAgICAgZGVzY3JpcHRpb246IG5vcm1hbGl6ZWREZXNjcmlwdGlvbixcbiAgICAgIGN1cnJlbmN5Q29kZTogbm9ybWFsaXplZEN1cnJlbmN5LFxuICAgICAgdHJhbnNEYXRlOiBub3JtYWxpemVkVHJhbnNEYXRlIHx8IHVuZGVmaW5lZCxcbiAgICAgIGNvbWVudGFyaW86IFN0cmluZyhkcmFmdENvbWVudGFyaW8gfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcbiAgICAgIHVybEZpbGU6IFN0cmluZyhkcmFmdFVybEZpbGUgfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcbiAgICAgIGZpbGVOYW1lOiBTdHJpbmcoZHJhZnRGaWxlTmFtZSB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgZmlsZUV4dGVuc2lvbjogcmVzb2x2ZVRpY2tldEZpbGVFeHRlbnNpb24oZHJhZnRGaWxlTmFtZSwgZHJhZnRVcmxGaWxlKSxcbiAgICAgIGdhc3RvVHlwZTogcGFyc2VkR2FzdG9UeXBlIGFzIEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3RbXCJnYXN0b1R5cGVcIl0sXG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xuICAgICAgc3RhcnRTdGF0dXM6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGluZ1wiLCBcIlVwZGF0aW5nIGV4cGVuc2Ugc2hlZXQuLi5cIiksXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKSxcbiAgICAgIHNldE1vZGFsRXJyb3IsXG4gICAgICBzZXRCdXN5LFxuICAgICAgc2V0U3RhdHVzLFxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdXBkYXRlRXhwZW5zZVNoZWV0VGlja2V0KGZpbGVJZCwgcGF5bG9hZCk7XG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IHVwZGF0ZWRcIikpO1xuICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xuICB9LCBbXG4gICAgYnVzeSxcbiAgICBjYW5FZGl0VGlja2V0LFxuICAgIGRyYWZ0Q29tZW50YXJpbyxcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0RmlsZU5hbWUsXG4gICAgZHJhZnRHYXN0b1R5cGUsXG4gICAgZHJhZnRUcmFuc0RhdGUsXG4gICAgZHJhZnRVcmxGaWxlLFxuICAgIGZpbGVJZCxcbiAgICBpc0VkaXRpbmcsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRJc0VkaXRpbmcsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBzZXRTdGF0dXMsXG4gIF0pO1xuXG4gIGNvbnN0IGhhbmRsZURlbGV0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY2FuRGVsZXRlVGlja2V0KSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XG4gICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0aW5nXCIsIFwiRGVsZXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRXJyb3JcIiwgXCJEZWxldGUgZXJyb3IuXCIpLFxuICAgICAgc2V0TW9kYWxFcnJvcixcbiAgICAgIHNldEJ1c3ksXG4gICAgICBzZXRTdGF0dXMsXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBkZWxldGVGaWxlUmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRGaWxlKGZpbGVJZCwge1xuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKCFkZWxldGVGaWxlUmVzcG9uc2UuU3VjY2VzcyAmJiAhaXNNaXNzaW5nVGlja2V0RmlsZU1lc3NhZ2UoZGVsZXRlRmlsZVJlc3BvbnNlLk1lc3NhZ2UpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGVsZXRlRmlsZVJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKCFpc05vdEZvdW5kRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldChmaWxlSWQpO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBsaW5lRGVsZXRlUmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRMaW5lKFxuICAgICAgICAgICAgICBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQuc2hlZXRJZCxcbiAgICAgICAgICAgICAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0LmxpbmVSZWNJZCxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoIWxpbmVEZWxldGVSZXNwb25zZS5TdWNjZXNzKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihsaW5lRGVsZXRlUmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyBUaGUgbGlua2VkIGxpbmUgY2FuIGJlIGF1dG8tcmVtb3ZlZCBieSBiYWNrZW5kIGNhc2NhZGU7IGtlZXAgZmxvdyBzdWNjZXNzZnVsIGluIHRoYXQgY2FzZS5cbiAgICAgICAgICAgIGlmICghaXNOb3RGb3VuZEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IGRlbGV0ZWRcIikpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xuICB9LCBbYnVzeSwgY2FuRGVsZXRlVGlja2V0LCBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQsIGZpbGVJZCwgc2V0QnVzeSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlRGVsZXRlLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMudHNcIjtcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnNBcmdzID0ge1xuICBidXN5OiBib29sZWFuO1xuICBtb2RhbE9wZW46IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XG4gIGFjdGlvbk1vZGU/OiBcImRlZmF1bHRcIiB8IFwiZGVsZXRlX29ubHlcIiB8IFwidmlld19vbmx5XCI7XG4gIGNhbkVkaXRUaWNrZXQ6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZVRpY2tldDogYm9vbGVhbjtcbiAgZmlsZUlkOiBzdHJpbmc7XG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcbiAgb25TYXZlU3VjY2VzczogKCkgPT4gdm9pZDtcbiAgb25EZWxldGVTdWNjZXNzPzogKCkgPT4gdm9pZDtcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcbiAgfSkgPT4gdm9pZDtcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gc3RhdGUgYW5kIGRpc3BhdGNoIGFjdGlvbnMgZm9yIHRpY2tldCBkZXRhaWwuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMgPSAoe1xuICBidXN5LFxuICBtb2RhbE9wZW4sXG4gIGlzRWRpdGluZyxcbiAgaXNMb2NrZWQsXG4gIGFjdGlvbk1vZGUgPSBcImRlZmF1bHRcIixcbiAgY2FuRWRpdFRpY2tldCxcbiAgY2FuRGVsZXRlVGlja2V0LFxuICBmaWxlSWQsXG4gIHNldE1vZGFsRXJyb3IsXG4gIGhhbmRsZUVuYWJsZUVkaXQsXG4gIGhhbmRsZUNhbmNlbEVkaXQsXG4gIGhhbmRsZVVwZGF0ZSxcbiAgaGFuZGxlRGVsZXRlLFxuICBvblNhdmVTdWNjZXNzLFxuICBvbkRlbGV0ZVN1Y2Nlc3MsXG4gIG9wZW5Db25maXJtLFxuICBjbG9zZUNvbmZpcm0sXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcbiAgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zKHtcbiAgICBpZHM6IHtcbiAgICAgIGVkaXRJY29uSWQ6IFwiZXhwZW5zZVRpY2tldEVkaXRJY29uXCIsXG4gICAgICBzYXZlSWNvbklkOiBcImV4cGVuc2VUaWNrZXRTYXZlSWNvblwiLFxuICAgICAgZGVsZXRlQnRuSWQ6IFwiZXhwZW5zZVRpY2tldERlbGV0ZUJ0blwiLFxuICAgICAgY2FuY2VsQnRuSWQ6IFwiZXhwZW5zZVRpY2tldENhbmNlbEJ0blwiLFxuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICBlZGl0RXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWVkaXRcIixcbiAgICAgIGRlbGV0ZUV2ZW50OiBcImV4cGVuc2UtdGlja2V0LWRldGFpbC1kZWxldGVcIixcbiAgICAgIGNhbmNlbEV2ZW50OiBcImV4cGVuc2UtdGlja2V0LWRldGFpbC1jYW5jZWwtZWRpdFwiLFxuICAgIH0sXG4gICAgYnVzeSxcbiAgICBtb2RhbE9wZW4sXG4gICAgaXNFZGl0aW5nLFxuICAgIGlzQ3JlYXRlTW9kZTogZmFsc2UsXG4gICAgaXNMb2NrZWQsXG4gICAgYWN0aW9uTW9kZSxcbiAgICBjYW5DcmVhdGU6IGZhbHNlLFxuICAgIGNhbkVkaXQ6IGNhbkVkaXRUaWNrZXQsXG4gICAgY2FuRGVsZXRlOiBjYW5EZWxldGVUaWNrZXQsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlU2F2ZTogaGFuZGxlVXBkYXRlLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgICBzYXZlQ29uZmlybVRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJTYXZlIGNoYW5nZXNcIiksXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXG4gICAgc2F2ZUNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX1NhdmVcIiwgXCJTYXZlXCIpLFxuICAgIGRlbGV0ZUNvbmZpcm1UaXRsZTogaW5kVChcIkNvbmZpcm1fRGVsZXRlX1RpdGxlXCIsIFwiRGVsZXRlXCIpLFxuICAgIGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiQ29uZmlybV9EZWxldGVfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/XCIpLFxuICAgIGRlbGV0ZUNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKSxcbiAgICBvblNhdmVTdWNjZXNzLFxuICAgIG9uRGVsZXRlU3VjY2Vzczogb25EZWxldGVTdWNjZXNzIHx8ICgoKSA9PiBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvVGlja2V0c1wiKSksXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgY2xvc2VDb25maXJtLFxuICB9KTtcbn07XG4iLCAiXHVGRUZGaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0UHJldmlld0Jsb2IgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcblxuY29uc3QgUFJFVklFV19NQVhfU0NBTEUgPSA0O1xuY29uc3QgUFJFVklFV19TQ0FMRV9TVEVQID0gMC4yNTtcblxuZXhwb3J0IHR5cGUgVGlja2V0UHJldmlld1BvaW50ID0ge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbn07XG5cbnR5cGUgVXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlld0FyZ3MgPSB7XG4gIHNvdXJjZVVybDogc3RyaW5nO1xufTtcblxuY29uc3QgY2xhbXBQcmV2aWV3U2NhbGUgPSAodmFsdWU6IG51bWJlcik6IG51bWJlciA9PiB7XG4gIGlmICghTnVtYmVyLmlzRmluaXRlKHZhbHVlKSkgcmV0dXJuIDE7XG4gIHJldHVybiBNYXRoLm1pbihQUkVWSUVXX01BWF9TQ0FMRSwgTWF0aC5tYXgoMSwgdmFsdWUpKTtcbn07XG5cbmNvbnN0IGdldFByZXZpZXdQb2ludERpc3RhbmNlID0gKGxlZnQ6IFRpY2tldFByZXZpZXdQb2ludCwgcmlnaHQ6IFRpY2tldFByZXZpZXdQb2ludCk6IG51bWJlciA9PiB7XG4gIGNvbnN0IGRlbHRhWCA9IHJpZ2h0LnggLSBsZWZ0Lng7XG4gIGNvbnN0IGRlbHRhWSA9IHJpZ2h0LnkgLSBsZWZ0Lnk7XG4gIHJldHVybiBNYXRoLnNxcnQoZGVsdGFYICogZGVsdGFYICsgZGVsdGFZICogZGVsdGFZKTtcbn07XG5cbmNvbnN0IGdldFByZXZpZXdQb2ludENlbnRlciA9IChsZWZ0OiBUaWNrZXRQcmV2aWV3UG9pbnQsIHJpZ2h0OiBUaWNrZXRQcmV2aWV3UG9pbnQpOiBUaWNrZXRQcmV2aWV3UG9pbnQgPT4gKHtcbiAgeDogKGxlZnQueCArIHJpZ2h0LngpIC8gMixcbiAgeTogKGxlZnQueSArIHJpZ2h0LnkpIC8gMixcbn0pO1xuXG4vLyBNYW5hZ2VzIHRpY2tldCBpbWFnZSBwcmV2aWV3IHN0YXRlIGFuZCB6b29tL3BhbiBnZXN0dXJlcy5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3ID0gKHsgc291cmNlVXJsIH06IFVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdBcmdzKSA9PiB7XG4gIGNvbnN0IFtwcmV2aWV3T3Blbiwgc2V0UHJldmlld09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcHJldmlld0J1c3ksIHNldFByZXZpZXdCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3ByZXZpZXdFcnJvciwgc2V0UHJldmlld0Vycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbcHJldmlld0ltYWdlVXJsLCBzZXRQcmV2aWV3SW1hZ2VVcmxdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtwcmV2aWV3U2NhbGUsIHNldFByZXZpZXdTY2FsZV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW3ByZXZpZXdUcmFuc2xhdGUsIHNldFByZXZpZXdUcmFuc2xhdGVdID0gdXNlU3RhdGU8VGlja2V0UHJldmlld1BvaW50Pih7IHg6IDAsIHk6IDAgfSk7XG5cbiAgY29uc3QgcHJldmlld1NjYWxlUmVmID0gdXNlUmVmKDEpO1xuICBjb25zdCBwcmV2aWV3VHJhbnNsYXRlUmVmID0gdXNlUmVmPFRpY2tldFByZXZpZXdQb2ludD4oeyB4OiAwLCB5OiAwIH0pO1xuICBjb25zdCBwcmV2aWV3UG9pbnRlcnNSZWYgPSB1c2VSZWY8TWFwPG51bWJlciwgVGlja2V0UHJldmlld1BvaW50Pj4obmV3IE1hcCgpKTtcbiAgY29uc3QgcHJldmlld1BhblBvaW50ZXJSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHByZXZpZXdQYW5MYXN0UG9pbnRSZWYgPSB1c2VSZWY8VGlja2V0UHJldmlld1BvaW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHByZXZpZXdQaW5jaFNuYXBzaG90UmVmID0gdXNlUmVmPHtcbiAgICBkaXN0YW5jZTogbnVtYmVyO1xuICAgIHNjYWxlOiBudW1iZXI7XG4gICAgY2VudGVyOiBUaWNrZXRQcmV2aWV3UG9pbnQ7XG4gICAgdHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQ7XG4gIH0gfCBudWxsPihudWxsKTtcblxuICBjb25zdCBhcHBseVByZXZpZXdUcmFuc2Zvcm0gPSB1c2VDYWxsYmFjaygobmV4dFNjYWxlOiBudW1iZXIsIG5leHRUcmFuc2xhdGU6IFRpY2tldFByZXZpZXdQb2ludCkgPT4ge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRTY2FsZSA9IGNsYW1wUHJldmlld1NjYWxlKG5leHRTY2FsZSk7XG4gICAgY29uc3Qgbm9ybWFsaXplZFRyYW5zbGF0ZSA9IG5vcm1hbGl6ZWRTY2FsZSA8PSAxID8geyB4OiAwLCB5OiAwIH0gOiBuZXh0VHJhbnNsYXRlO1xuXG4gICAgcHJldmlld1NjYWxlUmVmLmN1cnJlbnQgPSBub3JtYWxpemVkU2NhbGU7XG4gICAgcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50ID0gbm9ybWFsaXplZFRyYW5zbGF0ZTtcbiAgICBzZXRQcmV2aWV3U2NhbGUobm9ybWFsaXplZFNjYWxlKTtcbiAgICBzZXRQcmV2aWV3VHJhbnNsYXRlKG5vcm1hbGl6ZWRUcmFuc2xhdGUpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgcmVzZXRQcmV2aWV3R2VzdHVyZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5jbGVhcigpO1xuICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XG4gICAgYXBwbHlQcmV2aWV3VHJhbnNmb3JtKDEsIHsgeDogMCwgeTogMCB9KTtcbiAgfSwgW2FwcGx5UHJldmlld1RyYW5zZm9ybV0pO1xuXG4gIGNvbnN0IHJlYnVpbGRQaW5jaFNuYXBzaG90ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IHBvaW50ZXJQb2ludHMgPSBBcnJheS5mcm9tKHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LnZhbHVlcygpKTtcbiAgICBpZiAocG9pbnRlclBvaW50cy5sZW5ndGggPCAyKSB7XG4gICAgICBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBbbGVmdCwgcmlnaHRdID0gcG9pbnRlclBvaW50cztcbiAgICBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50ID0ge1xuICAgICAgZGlzdGFuY2U6IE1hdGgubWF4KDEsIGdldFByZXZpZXdQb2ludERpc3RhbmNlKGxlZnQsIHJpZ2h0KSksXG4gICAgICBzY2FsZTogcHJldmlld1NjYWxlUmVmLmN1cnJlbnQsXG4gICAgICBjZW50ZXI6IGdldFByZXZpZXdQb2ludENlbnRlcihsZWZ0LCByaWdodCksXG4gICAgICB0cmFuc2xhdGU6IHByZXZpZXdUcmFuc2xhdGVSZWYuY3VycmVudCxcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY2xvc2VQcmV2aWV3ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFByZXZpZXdPcGVuKGZhbHNlKTtcbiAgICBzZXRQcmV2aWV3QnVzeShmYWxzZSk7XG4gICAgc2V0UHJldmlld0Vycm9yKFwiXCIpO1xuICAgIHJlc2V0UHJldmlld0dlc3R1cmUoKTtcbiAgICBzZXRQcmV2aWV3SW1hZ2VVcmwoKHByZXZpb3VzKSA9PiB7XG4gICAgICBpZiAocHJldmlvdXMpIHtcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChwcmV2aW91cyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9KTtcbiAgfSwgW3Jlc2V0UHJldmlld0dlc3R1cmVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAocHJldmlld0ltYWdlVXJsKSB7XG4gICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwocHJldmlld0ltYWdlVXJsKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBbcHJldmlld0ltYWdlVXJsXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXByZXZpZXdPcGVuKSByZXR1cm47XG5cbiAgICBjb25zdCBvbktleURvd24gPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgICAgY2xvc2VQcmV2aWV3KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlEb3duKTtcbiAgfSwgW3ByZXZpZXdPcGVuLCBjbG9zZVByZXZpZXddKTtcblxuICBjb25zdCBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24gPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgIGlmICghcHJldmlld0ltYWdlVXJsIHx8IHByZXZpZXdCdXN5KSByZXR1cm47XG4gICAgICBjb25zdCBwb2ludDogVGlja2V0UHJldmlld1BvaW50ID0geyB4OiBldmVudC5jbGllbnRYLCB5OiBldmVudC5jbGllbnRZIH07XG4gICAgICBwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5zZXQoZXZlbnQucG9pbnRlcklkLCBwb2ludCk7XG4gICAgICBpZiAodHlwZW9mIGV2ZW50LmN1cnJlbnRUYXJnZXQuc2V0UG9pbnRlckNhcHR1cmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuc2V0UG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgLy8gSWdub3JlIGNhcHR1cmUgZmFpbHVyZXMgb24gYnJvd3NlcnMgdGhhdCBkbyBub3QgZnVsbHkgc3VwcG9ydCBwb2ludGVyIGNhcHR1cmUuXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LnNpemUgPT09IDEpIHtcbiAgICAgICAgcHJldmlld1BhblBvaW50ZXJSZWYuY3VycmVudCA9IGV2ZW50LnBvaW50ZXJJZDtcbiAgICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gcG9pbnQ7XG4gICAgICAgIHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIHJlYnVpbGRQaW5jaFNuYXBzaG90KCk7XG4gICAgfSxcbiAgICBbcHJldmlld0J1c3ksIHByZXZpZXdJbWFnZVVybCwgcmVidWlsZFBpbmNoU25hcHNob3RdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICBpZiAoIXByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LmhhcyhldmVudC5wb2ludGVySWQpKSByZXR1cm47XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCBwb2ludDogVGlja2V0UHJldmlld1BvaW50ID0geyB4OiBldmVudC5jbGllbnRYLCB5OiBldmVudC5jbGllbnRZIH07XG4gICAgICBwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5zZXQoZXZlbnQucG9pbnRlcklkLCBwb2ludCk7XG5cbiAgICAgIGNvbnN0IHBvaW50ZXJFbnRyaWVzID0gQXJyYXkuZnJvbShwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5lbnRyaWVzKCkpO1xuICAgICAgY29uc3QgcG9pbnRlclBvaW50cyA9IHBvaW50ZXJFbnRyaWVzLm1hcCgoZW50cnkpID0+IGVudHJ5WzFdKTtcblxuICAgICAgaWYgKHBvaW50ZXJQb2ludHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgaWYgKCFwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgcmVidWlsZFBpbmNoU25hcHNob3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNuYXBzaG90ID0gcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudDtcbiAgICAgICAgaWYgKCFzbmFwc2hvdCkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IFtsZWZ0LCByaWdodF0gPSBwb2ludGVyUG9pbnRzO1xuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGgubWF4KDEsIGdldFByZXZpZXdQb2ludERpc3RhbmNlKGxlZnQsIHJpZ2h0KSk7XG4gICAgICAgIGNvbnN0IHJhdGlvID0gZGlzdGFuY2UgLyBNYXRoLm1heCgxLCBzbmFwc2hvdC5kaXN0YW5jZSk7XG4gICAgICAgIGNvbnN0IG5leHRTY2FsZSA9IGNsYW1wUHJldmlld1NjYWxlKHNuYXBzaG90LnNjYWxlICogcmF0aW8pO1xuICAgICAgICBjb25zdCBjZW50ZXIgPSBnZXRQcmV2aWV3UG9pbnRDZW50ZXIobGVmdCwgcmlnaHQpO1xuICAgICAgICBjb25zdCBuZXh0VHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQgPSB7XG4gICAgICAgICAgeDogc25hcHNob3QudHJhbnNsYXRlLnggKyAoY2VudGVyLnggLSBzbmFwc2hvdC5jZW50ZXIueCksXG4gICAgICAgICAgeTogc25hcHNob3QudHJhbnNsYXRlLnkgKyAoY2VudGVyLnkgLSBzbmFwc2hvdC5jZW50ZXIueSksXG4gICAgICAgIH07XG4gICAgICAgIGFwcGx5UHJldmlld1RyYW5zZm9ybShuZXh0U2NhbGUsIG5leHRUcmFuc2xhdGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChwb2ludGVyUG9pbnRzLmxlbmd0aCAhPT0gMSB8fCBwcmV2aWV3U2NhbGVSZWYuY3VycmVudCA8PSAxIHx8IHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgIT09IGV2ZW50LnBvaW50ZXJJZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxhc3RQb2ludCA9IHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudDtcbiAgICAgIHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudCA9IHBvaW50O1xuICAgICAgaWYgKCFsYXN0UG9pbnQpIHJldHVybjtcblxuICAgICAgY29uc3QgbmV4dFRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50ID0ge1xuICAgICAgICB4OiBwcmV2aWV3VHJhbnNsYXRlUmVmLmN1cnJlbnQueCArIChwb2ludC54IC0gbGFzdFBvaW50LngpLFxuICAgICAgICB5OiBwcmV2aWV3VHJhbnNsYXRlUmVmLmN1cnJlbnQueSArIChwb2ludC55IC0gbGFzdFBvaW50LnkpLFxuICAgICAgfTtcbiAgICAgIGFwcGx5UHJldmlld1RyYW5zZm9ybShwcmV2aWV3U2NhbGVSZWYuY3VycmVudCwgbmV4dFRyYW5zbGF0ZSk7XG4gICAgfSxcbiAgICBbYXBwbHlQcmV2aWV3VHJhbnNmb3JtLCByZWJ1aWxkUGluY2hTbmFwc2hvdF1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgaWYgKCFwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5oYXMoZXZlbnQucG9pbnRlcklkKSkgcmV0dXJuO1xuICAgICAgcHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuZGVsZXRlKGV2ZW50LnBvaW50ZXJJZCk7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBldmVudC5jdXJyZW50VGFyZ2V0Lmhhc1BvaW50ZXJDYXB0dXJlID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5oYXNQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpXG4gICAgICApIHtcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5yZWxlYXNlUG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcG9pbnRlckVudHJpZXMgPSBBcnJheS5mcm9tKHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LmVudHJpZXMoKSk7XG4gICAgICBpZiAocG9pbnRlckVudHJpZXMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgcHJldmlld1BhblBvaW50ZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgIHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgIHJlYnVpbGRQaW5jaFNuYXBzaG90KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHBvaW50ZXJFbnRyaWVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBjb25zdCBbcG9pbnRlcklkLCBwb2ludGVyUG9pbnRdID0gcG9pbnRlckVudHJpZXNbMF07XG4gICAgICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBwb2ludGVySWQ7XG4gICAgICAgIHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudCA9IHBvaW50ZXJQb2ludDtcbiAgICAgICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcHJldmlld1BhblBvaW50ZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICBpZiAocHJldmlld1NjYWxlUmVmLmN1cnJlbnQgPD0gMSkge1xuICAgICAgICBhcHBseVByZXZpZXdUcmFuc2Zvcm0oMSwgeyB4OiAwLCB5OiAwIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2FwcGx5UHJldmlld1RyYW5zZm9ybSwgcmVidWlsZFBpbmNoU25hcHNob3RdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlUHJldmlld1doZWVsID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5XaGVlbEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgaWYgKCFwcmV2aWV3SW1hZ2VVcmwgfHwgcHJldmlld0J1c3kpIHJldHVybjtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IGV2ZW50LmRlbHRhWSA8IDAgPyAxIDogLTE7XG4gICAgICBjb25zdCBuZXh0U2NhbGUgPSBjbGFtcFByZXZpZXdTY2FsZShwcmV2aWV3U2NhbGVSZWYuY3VycmVudCArIGRpcmVjdGlvbiAqIFBSRVZJRVdfU0NBTEVfU1RFUCk7XG4gICAgICBhcHBseVByZXZpZXdUcmFuc2Zvcm0obmV4dFNjYWxlLCBwcmV2aWV3VHJhbnNsYXRlUmVmLmN1cnJlbnQpO1xuICAgIH0sXG4gICAgW2FwcGx5UHJldmlld1RyYW5zZm9ybSwgcHJldmlld0J1c3ksIHByZXZpZXdJbWFnZVVybF1cbiAgKTtcblxuICBjb25zdCBvcGVuUHJldmlldyA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50VXJsID0gc2FmZVRleHQoc291cmNlVXJsKTtcbiAgICBpZiAoIWN1cnJlbnRVcmwpIHJldHVybjtcblxuICAgIHJlc2V0UHJldmlld0dlc3R1cmUoKTtcbiAgICBzZXRQcmV2aWV3T3Blbih0cnVlKTtcbiAgICBzZXRQcmV2aWV3QnVzeSh0cnVlKTtcbiAgICBzZXRQcmV2aWV3RXJyb3IoXCJcIik7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0UHJldmlld0Jsb2IoY3VycmVudFVybCwge1xuICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgY29uc3Qgb2JqZWN0VXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIHNldFByZXZpZXdJbWFnZVVybCgocHJldmlvdXMpID0+IHtcbiAgICAgICAgaWYgKHByZXZpb3VzKSB7XG4gICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChwcmV2aW91cyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iamVjdFVybDtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBzZXRQcmV2aWV3RXJyb3IoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgICAgc2V0UHJldmlld0ltYWdlVXJsKFwiXCIpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRQcmV2aWV3QnVzeShmYWxzZSk7XG4gICAgfVxuICB9LCBbcmVzZXRQcmV2aWV3R2VzdHVyZSwgc291cmNlVXJsXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBwcmV2aWV3T3BlbixcbiAgICBwcmV2aWV3QnVzeSxcbiAgICBwcmV2aWV3RXJyb3IsXG4gICAgcHJldmlld0ltYWdlVXJsLFxuICAgIHByZXZpZXdTY2FsZSxcbiAgICBwcmV2aWV3VHJhbnNsYXRlLFxuICAgIG9wZW5QcmV2aWV3LFxuICAgIGNsb3NlUHJldmlldyxcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24sXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlLFxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kLFxuICAgIGhhbmRsZVByZXZpZXdXaGVlbCxcbiAgfTtcbn07XHJcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgVGlja2V0UHJldmlld1BvaW50IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldy50c1wiO1xuXG50eXBlIEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWxQcm9wcyA9IHtcbiAgb3BlbjogYm9vbGVhbjtcbiAgYnVzeTogYm9vbGVhbjtcbiAgZXJyb3I6IHN0cmluZztcbiAgaW1hZ2VVcmw6IHN0cmluZztcbiAgaW1hZ2VBbHQ6IHN0cmluZztcbiAgc2NhbGU6IG51bWJlcjtcbiAgdHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQ7XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIG9uUG9pbnRlckRvd246IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcbiAgb25Qb2ludGVyTW92ZTogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xuICBvblBvaW50ZXJFbmQ6IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcbiAgb25XaGVlbDogKGV2ZW50OiBSZWFjdC5XaGVlbEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcbn07XG5cbi8vIFJlbmRlcnMgdGhlIHRpY2tldCBpbWFnZSBwcmV2aWV3IG92ZXJsYXkgd2l0aCB6b29tIGFuZCBwYW4gZ2VzdHVyZXMuXG5jb25zdCBFeHBlbnNlVGlja2V0UHJldmlld01vZGFsID0gKHtcbiAgb3BlbixcbiAgYnVzeSxcbiAgZXJyb3IsXG4gIGltYWdlVXJsLFxuICBpbWFnZUFsdCxcbiAgc2NhbGUsXG4gIHRyYW5zbGF0ZSxcbiAgb25DbG9zZSxcbiAgb25Qb2ludGVyRG93bixcbiAgb25Qb2ludGVyTW92ZSxcbiAgb25Qb2ludGVyRW5kLFxuICBvbldoZWVsLFxufTogRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbFByb3BzKSA9PiB7XG4gIGlmICghb3BlbikgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIGNyZWF0ZVBvcnRhbChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzQ1IGJhY2tkcm9wLWJsdXItbWQgcHgtNCBweS02XCIgb25DbGljaz17b25DbG9zZX0+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0Nsb3NlXCIsIFwiQ2xvc2VcIil9XG4gICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHJpZ2h0LTQgdG9wLTQgaW5saW5lLWZsZXggaC0xMCB3LTEwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLWZ1bGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAvNjAgYmctc2xhdGUtOTAwLzU1IHRleHQtc2xhdGUtMTAwIHRyYW5zaXRpb24gaG92ZXI6Ymctc2xhdGUtOTAwLzcwIGZvY3VzLXZpc2libGU6b3V0bGluZS1oaWRkZW4gZm9jdXMtdmlzaWJsZTpyaW5nLTIgZm9jdXMtdmlzaWJsZTpyaW5nLXNsYXRlLTIwMC84MFwiXG4gICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgIGQ9XCJNNiA2TDE4IDE4TTE4IDZMNiAxOFwiXG4gICAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjc1XCJcbiAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC1oLVs5MnZoXSBtYXgtdy1bOTJ2d10gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIiBvbkNsaWNrPXsoZXZlbnQpID0+IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpfT5cbiAgICAgICAge2J1c3kgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtMTAwXCI+XG4gICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxuICAgICAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBlcnJvciA/IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtcm9zZS0yMDBcIj57ZXJyb3J9PC9wPlxuICAgICAgICApIDogaW1hZ2VVcmwgPyAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgbWF4LWgtWzkwdmhdIG1heC13LVs5MnZ3XSBvdmVyZmxvdy1oaWRkZW4gcm91bmRlZC1sZyB0b3VjaC1ub25lXCJcbiAgICAgICAgICAgIG9uUG9pbnRlckRvd249e29uUG9pbnRlckRvd259XG4gICAgICAgICAgICBvblBvaW50ZXJNb3ZlPXtvblBvaW50ZXJNb3ZlfVxuICAgICAgICAgICAgb25Qb2ludGVyVXA9e29uUG9pbnRlckVuZH1cbiAgICAgICAgICAgIG9uUG9pbnRlckNhbmNlbD17b25Qb2ludGVyRW5kfVxuICAgICAgICAgICAgb25XaGVlbD17b25XaGVlbH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz17aW1hZ2VVcmx9XG4gICAgICAgICAgICAgIGFsdD17aW1hZ2VBbHQgfHwgaW5kVChcIlRpY2tldHNfRmllbGRfRmlsZUlkXCIsIFwiVGlja2V0XCIpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwb2ludGVyLWV2ZW50cy1ub25lIG1heC1oLVs5MHZoXSB3LWF1dG8gbWF4LXctWzkydnddIHNlbGVjdC1ub25lIHJvdW5kZWQtbGcgb2JqZWN0LWNvbnRhaW4gc2hhZG93LTJ4bFwiXG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHt0cmFuc2xhdGUueH1weCwgJHt0cmFuc2xhdGUueX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pYCxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46IFwiY2VudGVyIGNlbnRlclwiLFxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IHNjYWxlIDw9IDEgPyBcInRyYW5zZm9ybSAxNDBtcyBlYXNlLW91dFwiIDogXCJub25lXCIsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGRyYWdnYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1zbGF0ZS0xMDBcIj57aW5kVChcIkNvbW1vbl9Ob3RBdmFpbGFibGVcIiwgXCJOL0FcIil9PC9wPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+LFxuICAgIGRvY3VtZW50LmJvZHlcbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWw7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUF5RTs7O0FDaUdqRTtBQXhGUixJQUFNLDJCQUEyQixDQUFDLFVBQTJCO0FBQzNELFFBQU0sYUFBYSxTQUFTLEtBQUssRUFBRSxZQUFZO0FBQy9DLE1BQUksQ0FBQyxXQUFZLFFBQU87QUFDeEIsTUFBSSxlQUFlLE9BQU8sZUFBZSxJQUFLLFFBQU87QUFDckQsTUFBSSxlQUFlLFNBQVMsZUFBZSxLQUFNLFFBQU87QUFDeEQsU0FBTztBQUNUO0FBRUEsSUFBTSxtQkFBbUIsb0JBQUksSUFB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VUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsMEJBQTBCO0FBQUEsVUFDMUIsd0JBQXdCO0FBQUEsVUFDeEIsMkJBQTJCO0FBQUEsVUFDM0Isd0JBQXdCO0FBQUEsVUFDeEIsWUFBWTtBQUFBLFVBQ1osb0JBQW9CO0FBQUE7QUFBQSxNQUN0QjtBQUFBLE1BQ0E7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBLGNBQWMsWUFBWSxvQkFBb0IsU0FBUyxPQUFPLFlBQVk7QUFBQSxVQUMxRTtBQUFBLFVBQ0EsY0FBYztBQUFBLFVBQ2Qsa0JBQWtCO0FBQUEsVUFDbEIsWUFBWTtBQUFBO0FBQUEsTUFDZDtBQUFBLE1BQ0EsNkNBQUMsU0FBSSxXQUFVLDBCQUEwQixrQkFBTztBQUFBLE9BQ2xELElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLDBCQUEwQixNQUFNO0FBQ3BDLFNBQ0UsNkNBQUMsZ0NBQ0MsdURBQUMsa0NBQStCLEdBQ2xDO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSw0QkFBNEI7QUFDbkUsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQywyQkFBd0IsQ0FBRTtBQUN0RDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sa0NBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJuZXh0VHJhbnNsYXRlIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
